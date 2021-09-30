---
emoji: 🤦‍♂️
title: "[DEVOPS] - 보안 취약점 검사를 위한 Dvmn 앱 자동 배포하기"
date: "2021-08-07 00:36:25"
author: nasa1515
tags: DevOps
categories: DevOps
---



머리말  

이전에 구성한 파이프라인의 전체적인 자동화는 아직 구성이 안됐지만 CI, CD 각각의 자동화는 마쳤습니다.  
그렇기에 이번에는 실제 보안 취약점 검사를 위한 오픈소스 툴을 Rancher 클러스터 환경에 배포해봤습니다.!!  
사용할 툴은 DVMN인데 기본적으로 PHP 배포판이 대부분이지만  
저는 Jenkins에서 Junit등의 취약점 분석을 조금 더 쉽게 하기 위해서 JAVA 기반의 배포판으로 MSA를 만들어 배포했습니다.



---

사용 할 툴을 다음과 같습니다.  

- GITHUB
- ArgoCD
- Helm
- kompose

<br/>

---


## ✔ DVWA MSA 생성

[DVMN JAVA 링크](https://github.com/appsecco/dvja) 해당 주소에서 JAVA기반의 DVWA앱을 확인했습니다!!

그러나 기본 JAVA 배포판은 Docker.compose.yaml만 존재하기 때문에   
쿠버네티스에 MSP로 각각 배포할 수 있는 메니페스트를 직접 만들어줘야 했습니다.

<br/>

* kompose 툴 사용기  

    GOOGLE 서칭을 해보다가 docker.compose를 yaml 파일로 변환해주는 툴을 발견해서 사용해봤다.  
    자세한 사항은 [공식 GITHUB 확인!](https://github.com/kubernetes/kompose/blob/master/docs/installation.md#centos)

<br/>


* kompose 설치

    ```cs
   root@cccr:/home/kompose# curl -L https://github.com/kubernetes/kompose/releases/download/v1.22.0/kompose-linux-amd64 -o kompose
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
    100   643  100   643    0     0   1391      0 --:--:-- --:--:-- --:--:--  1388
    100 23.8M  100 23.8M    0     0  3411k      0  0:00:07  0:00:07 --:--:-- 4968k
    root@cccr:/home/kompose# ls 
    kompose

    root@cccr:/home/kompose# chmod +x kompose
    root@cccr:/home/kompose# sudo mv ./kompose /usr/local/bin/kompose
    ```

<br/>
<br/>

* DWWA의 docker.compose.yml 파일은 아래와 같다.

    ```cs
    version: '2'
    services:
    mysql:
        image: mysql:5.5
        volumes:
        - mysql:/var/lib/mysql
        environment:
        MYSQL_ROOT_PASSWORD: ec95c258266b8e985848cae688effa2b
    app:
        build: .
        depends_on:
        - mysql
        ports:
        - "8080:8080"
        environment:
        MYSQL_USER: root
        MYSQL_PASSWORD: ec95c258266b8e985848cae688effa2b
    volumes:
    mysql:
  ```

<br/>
<br/>

* 위의 docker.compose.yml 파일을 kompose 변환기로 변환해보자!

    ```cs
    root@cccr:/home/kompose# kompose convert -f docker-compose.yaml
    WARN Unsupported root level volumes key - ignoring 
    WARN Unsupported depends_on key - ignoring        
    INFO Kubernetes file "app-service.yaml" created   
    INFO Kubernetes file "app-deployment.yaml" created 
    INFO Kubernetes file "mysql-deployment.yaml" created 
    INFO Kubernetes file "mysql-persistentvolumeclaim.yaml" created 
    ```

    총 4개의 파일이 yaml 파일이 생성되었다!

<br/>
<br/>

* 간단하게 app을 배포하는 deployement yaml을 하나만 열어보자

    ```cs
    apiVersion: apps/v1
    kind: Deployment
    metadata:
        annotations:
            kompose.cmd: kompose convert -f docker-compose.yaml
            kompose.version: 1.22.0 (955b78124)
    creationTimestamp: null
    labels:
         io.kompose.service: app
     name: app
    spec:
        replicas: 1
         selector:
                matchLabels:
                io.kompose.service: app
     strategy: {}
     template:
        metadata:
         annotations:
            kompose.cmd: kompose convert -f docker-compose.yaml
            kompose.version: 1.22.0 (955b78124)
         creationTimestamp: null
         labels:
          io.kompose.service: app
        spec:
          containers:
             - env:
                  - name: MYSQL_PASSWORD
                    value: ec95c258266b8e985848cae688effa2b
                  - name: MYSQL_USER
                    value: root
             image: app
             name: app
            ports:
                - containerPort: 8080
             resources: {}
        restartPolicy: Always
    status: {}
    ```

    위와 같이 매니페스트 파일들이 생성되어 MSA를 만드는데 조금 더 시간을 절약 할 수 있었다.



<br/>
<br/>

* 이제 k8s 클러스터에 알맞게 배포하기 위해서 메니페스트 파일들을 수정, 생성했다.

    ArgoCD에서 github 웹훅으로 배포하기 위해 github에 관련 메니페스트 파일들을 모두 올려놓았다.

    ![스크린샷, 2020-11-12 15-09-11](https://user-images.githubusercontent.com/69498804/98902408-0ab4a680-24f9-11eb-9e8c-aff3237409c9.png)


<br/>

---

### ✌ 메니페스트 하나씩 내용을 살펴보자.

우선 메니페스트들의 가변적으로 바뀌는 설정들을 일일히 바꾸는 작업을 간소화 하기 위해서  
헬름차트 기반으로 메니페스트를 배포하기로 했다.  
즉 Jenkins 서버에서는 values.yaml 파일의 이미지 tag값을 빌드 넘버로 바꾸어 배포가 되게 만든 아키텍처이다.

<br/>

* values.yaml 

    ```cs
    # Default values for ghost.
    # This is a YAML-formatted file.
    # Declare variables to be passed into your templates.

    replicaCount: 3

    image:
    repository: jisunpark/cccr-dvwa-java-web
    tag: 13     <<--해당 값이 바뀌면 배포가 이루어진다.
    pullPolicy: ""


    value: ec95c258266b8e985848cae688effa2b

    namespace: cd-test

    name: 
    app: app
    ```

<br/>
<br/>

* app-deployment.yaml

    ```cs
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    annotations:
        kompose.cmd: kompose convert
        kompose.version: 1.21.0 (992df58d8)
    creationTimestamp: null
    labels:
        io.kompose.service: {{ .Values.name.app }}
    name: {{ .Values.name.app }}
    spec:
    replicas: {{ .Values.replicaCount }}
    selector:
        matchLabels:
        io.kompose.service: {{ .Values.name.app }}
    strategy: {}
    template:
        metadata:
        annotations:
            kompose.cmd: kompose convert
            kompose.version: 1.21.0 (992df58d8)
        creationTimestamp: null
        labels:
            io.kompose.service: {{ .Values.name.app }}
        spec:
        containers:
        - env:
            - name: MYSQL_PASSWORD
            value: {{ .Values.value }}
            - name: MYSQL_USER
            value: root
            image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
            imagePullPolicy: {{ .Values.image.pullPolicy }}
            name: {{ .Values.name.app }}
            ports:
            - containerPort: 8080
            resources: {}
        restartPolicy: Always
        serviceAccountName: ""
        volumes: null
    status: {}
    ```
    간단하게 설명하면 Jenkins 에서 수정하고 빌드한 DVWA 이미지의 빌드넘버를 받아와 배포한다.


<br/>
<br/>

* app-service.yaml

    ```cs
    apiVersion: v1
    kind: Service
    metadata:
    annotations:
        cloud.google.com/neg: '{"ingress":true}'
        field.cattle.io/publicEndpoints: '[{"addresses":["35.223.27.28"],"port":8080,"protocol":"TCP","serviceName":"cd-test:app","allNodes":true}]'
        kompose.cmd: kompose convert
        kompose.version: 1.21.0 (992df58d8)
    labels:
        io.kompose.service: {{ .Values.name.app }}
    name: app-lb
    namespace: {{ .Values.namespace }}
    spec:
    externalTrafficPolicy: Cluster
    ports:
    - name: "8080"
        port: 8080
        protocol: TCP
        targetPort: 8080
    selector:
        io.kompose.service: {{ .Values.name.app }}
    sessionAffinity: ClientIP
    type: LoadBalancer
    loadBalancerIP: 35.223.27.28
    ```
    GCP에서 서비스 하다보니 LBIP를 임의로 지정해주어서 서비스를 설정했다.  
    이 부분은 이후의 포스트에서 자세하게 설명한다.


<br/>
<br/>

* mysql-deployment.yaml

    ```cs
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    annotations:
        kompose.cmd: kompose convert
        kompose.version: 1.21.0 (992df58d8)
    creationTimestamp: null
    labels:
        io.kompose.service: mysql
    name: mysql
    spec:
    replicas: 1
    selector:
        matchLabels:
        io.kompose.service: mysql
    strategy:
        type: Recreate
    template:
        metadata:
        annotations:
            kompose.cmd: kompose convert
            kompose.version: 1.21.0 (992df58d8)
        creationTimestamp: null
        labels:
            io.kompose.service: mysql
        spec:
        containers:
        - env:
            - name: MYSQL_ROOT_PASSWORD
            value: ec95c258266b8e985848cae688effa2b
            image: mysql:5.5
            imagePullPolicy: IfNotPresent
            name: mysql
            resources: {}
            volumeMounts:
            - mountPath: /var/lib/mysql
            name: mysql-vol
        restartPolicy: Always
        serviceAccountName: ""
        volumes:
        - name: mysql-vol
            persistentVolumeClaim:
            claimName: mysql-pvc
    status: {}
    ```

<br/>
<br/>

* mysql-service.yaml

    ```cs
    apiVersion: v1
    kind: Service
    metadata:
    annotations:
        kompose.cmd: kompose convert
        kompose.version: 1.21.0 (992df58d8)
    creationTimestamp: null
    labels:
        io.kompose.service: mysql
    name: mysql
    spec:
    ports:
    - name: "3306"
        port: 3306
        targetPort: 3306
    selector:
        io.kompose.service: mysql
    ```


<br/>
<br/>


* mysql-pvc.yaml

    ```cs
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
    creationTimestamp: null
    labels:
        io.kompose.service: mysql
    name: mysql-pvc
    namespace: cd-test
    spec:
    accessModes:
    - ReadWriteMany
    storageClassName: ""
    volumeName: dbserver
    resources:
        requests:
        storage: 5Gi
    status: {}
    ```
    GCP의 FILE STORE를 사용해서 PVC를 만들었다  
    이 부분에서는 다음 포스트에서 자세하게 설명되어있다.


<br/>
<br/>


  * mysql-pv-nfscreate.yaml

    ```cs
    apiVersion: v1
    kind: PersistentVolume
    metadata:
    name: dbserver
    namespace: cd-test
    spec:
    capacity:
        storage: 10Gi
    volumeMode: Filesystem
    accessModes:
        - ReadWriteMany
    persistentVolumeReclaimPolicy: Retain
    storageClassName: ""
    nfs:
        path: /nfs_share
        server: 10.254.194.122
    ```
PV의 생성 또한 다음포스트에서 다룬다.


<br/>
<br/>

* namespace.yaml

    ```cs
    kind: Namespace
    apiVersion: v1
    metadata:
    annotations:
        field.cattle.io/projectId: c-dcn6h:p-8scft
    name: {{ .Values.namespace }}
    labels:
        name: {{ .Values.namespace }}
        field.cattle.io/projectId: p-8scft
    ```
    간단한 앱 배포를 위한 네임스페이스를 생성하는 매니페스트 파일이다.


<br/>

---


결론적으로 GITHUB에 헬름 저장소를 넣어둔 뒤 해당 저장소의 값이 바뀌면  
Argo-CD 가 SYNC를 맞춰주면서 배포를 하는 프로세스입니다..



![스크린샷, 2020-11-12 15-22-57](https://user-images.githubusercontent.com/69498804/98903444-f376b880-24fa-11eb-9042-094db9247577.png)

* [저장소 링크](https://github.com/nasa1515/cccr-dvwa-helm)


<br/>

---

### 마치며…  

실제로 매니페스트를 일일히 수정하고 생성하면 k8s에 대한 개념들을 다시 잡은 것 같습니다.  
이번 포스트에서 드디어 간단한 파이프라인 자동화를 마칠 수 있었고 보람찬 포스트였습니다.  
약간의 아쉬움이 드는 것은 GCP가 아닌 AWS, AZURE로 했으면 어땠을까 하는 아쉬움이 남습니다.  
생각보다 GCP에서 지원해주는 기능들이 원만하게 사용되지 않는 경우가 많아서...


---

```toc
```