---
emoji: ๐คฆโโ๏ธ
title: "[DEVOPS] - ๋ณด์ ์ทจ์ฝ์  ๊ฒ์ฌ๋ฅผ ์ํ Dvmn ์ฑ ์๋ ๋ฐฐํฌํ๊ธฐ"
date: "2021-08-07 00:36:25"
author: nasa1515
tags: DevOps
categories: DevOps
---



๋จธ๋ฆฌ๋ง  

์ด์ ์ ๊ตฌ์ฑํ ํ์ดํ๋ผ์ธ์ ์ ์ฒด์ ์ธ ์๋ํ๋ ์์ง ๊ตฌ์ฑ์ด ์๋์ง๋ง CI, CD ๊ฐ๊ฐ์ ์๋ํ๋ ๋ง์ณค์ต๋๋ค.  
๊ทธ๋ ๊ธฐ์ ์ด๋ฒ์๋ ์ค์  ๋ณด์ ์ทจ์ฝ์  ๊ฒ์ฌ๋ฅผ ์ํ ์คํ์์ค ํด์ Rancher ํด๋ฌ์คํฐ ํ๊ฒฝ์ ๋ฐฐํฌํด๋ดค์ต๋๋ค.!!  
์ฌ์ฉํ  ํด์ DVMN์ธ๋ฐ ๊ธฐ๋ณธ์ ์ผ๋ก PHP ๋ฐฐํฌํ์ด ๋๋ถ๋ถ์ด์ง๋ง  
์ ๋ Jenkins์์ Junit๋ฑ์ ์ทจ์ฝ์  ๋ถ์์ ์กฐ๊ธ ๋ ์ฝ๊ฒ ํ๊ธฐ ์ํด์ JAVA ๊ธฐ๋ฐ์ ๋ฐฐํฌํ์ผ๋ก MSA๋ฅผ ๋ง๋ค์ด ๋ฐฐํฌํ์ต๋๋ค.



---

์ฌ์ฉ ํ  ํด์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.  

- GITHUB
- ArgoCD
- Helm
- kompose

<br/>

---


## โ DVWA MSA ์์ฑ

[DVMN JAVA ๋งํฌ](https://github.com/appsecco/dvja) ํด๋น ์ฃผ์์์ JAVA๊ธฐ๋ฐ์ DVWA์ฑ์ ํ์ธํ์ต๋๋ค!!

๊ทธ๋ฌ๋ ๊ธฐ๋ณธ JAVA ๋ฐฐํฌํ์ Docker.compose.yaml๋ง ์กด์ฌํ๊ธฐ ๋๋ฌธ์   
์ฟ ๋ฒ๋คํฐ์ค์ MSP๋ก ๊ฐ๊ฐ ๋ฐฐํฌํ  ์ ์๋ ๋ฉ๋ํ์คํธ๋ฅผ ์ง์  ๋ง๋ค์ด์ค์ผ ํ์ต๋๋ค.

<br/>

* kompose ํด ์ฌ์ฉ๊ธฐ  

    GOOGLE ์์นญ์ ํด๋ณด๋ค๊ฐ docker.compose๋ฅผ yaml ํ์ผ๋ก ๋ณํํด์ฃผ๋ ํด์ ๋ฐ๊ฒฌํด์ ์ฌ์ฉํด๋ดค๋ค.  
    ์์ธํ ์ฌํญ์ [๊ณต์ GITHUB ํ์ธ!](https://github.com/kubernetes/kompose/blob/master/docs/installation.md#centos)

<br/>


* kompose ์ค์น

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

* DWWA์ docker.compose.yml ํ์ผ์ ์๋์ ๊ฐ๋ค.

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

* ์์ docker.compose.yml ํ์ผ์ kompose ๋ณํ๊ธฐ๋ก ๋ณํํด๋ณด์!

    ```cs
    root@cccr:/home/kompose# kompose convert -f docker-compose.yaml
    WARN Unsupported root level volumes key - ignoring 
    WARN Unsupported depends_on key - ignoring        
    INFO Kubernetes file "app-service.yaml" created   
    INFO Kubernetes file "app-deployment.yaml" created 
    INFO Kubernetes file "mysql-deployment.yaml" created 
    INFO Kubernetes file "mysql-persistentvolumeclaim.yaml" created 
    ```

    ์ด 4๊ฐ์ ํ์ผ์ด yaml ํ์ผ์ด ์์ฑ๋์๋ค!

<br/>
<br/>

* ๊ฐ๋จํ๊ฒ app์ ๋ฐฐํฌํ๋ deployement yaml์ ํ๋๋ง ์ด์ด๋ณด์

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

    ์์ ๊ฐ์ด ๋งค๋ํ์คํธ ํ์ผ๋ค์ด ์์ฑ๋์ด MSA๋ฅผ ๋ง๋๋๋ฐ ์กฐ๊ธ ๋ ์๊ฐ์ ์ ์ฝ ํ  ์ ์์๋ค.



<br/>
<br/>

* ์ด์  k8s ํด๋ฌ์คํฐ์ ์๋ง๊ฒ ๋ฐฐํฌํ๊ธฐ ์ํด์ ๋ฉ๋ํ์คํธ ํ์ผ๋ค์ ์์ , ์์ฑํ๋ค.

    ArgoCD์์ github ์นํ์ผ๋ก ๋ฐฐํฌํ๊ธฐ ์ํด github์ ๊ด๋ จ ๋ฉ๋ํ์คํธ ํ์ผ๋ค์ ๋ชจ๋ ์ฌ๋ ค๋์๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-11-12 15-09-11](https://user-images.githubusercontent.com/69498804/98902408-0ab4a680-24f9-11eb-9e8c-aff3237409c9.png)


<br/>

---

### โ ๋ฉ๋ํ์คํธ ํ๋์ฉ ๋ด์ฉ์ ์ดํด๋ณด์.

์ฐ์  ๋ฉ๋ํ์คํธ๋ค์ ๊ฐ๋ณ์ ์ผ๋ก ๋ฐ๋๋ ์ค์ ๋ค์ ์ผ์ผํ ๋ฐ๊พธ๋ ์์์ ๊ฐ์ํ ํ๊ธฐ ์ํด์  
ํฌ๋ฆ์ฐจํธ ๊ธฐ๋ฐ์ผ๋ก ๋ฉ๋ํ์คํธ๋ฅผ ๋ฐฐํฌํ๊ธฐ๋ก ํ๋ค.  
์ฆ Jenkins ์๋ฒ์์๋ values.yaml ํ์ผ์ ์ด๋ฏธ์ง tag๊ฐ์ ๋น๋ ๋๋ฒ๋ก ๋ฐ๊พธ์ด ๋ฐฐํฌ๊ฐ ๋๊ฒ ๋ง๋  ์ํคํ์ฒ์ด๋ค.

<br/>

* values.yaml 

    ```cs
    # Default values for ghost.
    # This is a YAML-formatted file.
    # Declare variables to be passed into your templates.

    replicaCount: 3

    image:
    repository: jisunpark/cccr-dvwa-java-web
    tag: 13     <<--ํด๋น ๊ฐ์ด ๋ฐ๋๋ฉด ๋ฐฐํฌ๊ฐ ์ด๋ฃจ์ด์ง๋ค.
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
    ๊ฐ๋จํ๊ฒ ์ค๋ชํ๋ฉด Jenkins ์์ ์์ ํ๊ณ  ๋น๋ํ DVWA ์ด๋ฏธ์ง์ ๋น๋๋๋ฒ๋ฅผ ๋ฐ์์ ๋ฐฐํฌํ๋ค.


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
    GCP์์ ์๋น์ค ํ๋ค๋ณด๋ LBIP๋ฅผ ์์๋ก ์ง์ ํด์ฃผ์ด์ ์๋น์ค๋ฅผ ์ค์ ํ๋ค.  
    ์ด ๋ถ๋ถ์ ์ดํ์ ํฌ์คํธ์์ ์์ธํ๊ฒ ์ค๋ชํ๋ค.


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
    GCP์ FILE STORE๋ฅผ ์ฌ์ฉํด์ PVC๋ฅผ ๋ง๋ค์๋ค  
    ์ด ๋ถ๋ถ์์๋ ๋ค์ ํฌ์คํธ์์ ์์ธํ๊ฒ ์ค๋ช๋์ด์๋ค.


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
PV์ ์์ฑ ๋ํ ๋ค์ํฌ์คํธ์์ ๋ค๋ฃฌ๋ค.


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
    ๊ฐ๋จํ ์ฑ ๋ฐฐํฌ๋ฅผ ์ํ ๋ค์์คํ์ด์ค๋ฅผ ์์ฑํ๋ ๋งค๋ํ์คํธ ํ์ผ์ด๋ค.


<br/>

---


๊ฒฐ๋ก ์ ์ผ๋ก GITHUB์ ํฌ๋ฆ ์ ์ฅ์๋ฅผ ๋ฃ์ด๋ ๋ค ํด๋น ์ ์ฅ์์ ๊ฐ์ด ๋ฐ๋๋ฉด  
Argo-CD ๊ฐ SYNC๋ฅผ ๋ง์ถฐ์ฃผ๋ฉด์ ๋ฐฐํฌ๋ฅผ ํ๋ ํ๋ก์ธ์ค์๋๋ค..



![์คํฌ๋ฆฐ์ท, 2020-11-12 15-22-57](https://user-images.githubusercontent.com/69498804/98903444-f376b880-24fa-11eb-9042-094db9247577.png)

* [์ ์ฅ์ ๋งํฌ](https://github.com/nasa1515/cccr-dvwa-helm)


<br/>

---

### ๋ง์น๋ฉฐโฆ  

์ค์ ๋ก ๋งค๋ํ์คํธ๋ฅผ ์ผ์ผํ ์์ ํ๊ณ  ์์ฑํ๋ฉด k8s์ ๋ํ ๊ฐ๋๋ค์ ๋ค์ ์ก์ ๊ฒ ๊ฐ์ต๋๋ค.  
์ด๋ฒ ํฌ์คํธ์์ ๋๋์ด ๊ฐ๋จํ ํ์ดํ๋ผ์ธ ์๋ํ๋ฅผ ๋ง์น  ์ ์์๊ณ  ๋ณด๋์ฐฌ ํฌ์คํธ์์ต๋๋ค.  
์ฝ๊ฐ์ ์์ฌ์์ด ๋๋ ๊ฒ์ GCP๊ฐ ์๋ AWS, AZURE๋ก ํ์ผ๋ฉด ์ด๋ ์๊น ํ๋ ์์ฌ์์ด ๋จ์ต๋๋ค.  
์๊ฐ๋ณด๋ค GCP์์ ์ง์ํด์ฃผ๋ ๊ธฐ๋ฅ๋ค์ด ์๋งํ๊ฒ ์ฌ์ฉ๋์ง ์๋ ๊ฒฝ์ฐ๊ฐ ๋ง์์...


---

```toc
```