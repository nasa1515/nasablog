---
emoji: 🤦‍♂️
title: Jenkins Pipeline에 OWASP ZAP 도입기 [DevOps]
date: "2021-08-09 00:39:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


머리말  

이번 포스트에서는 구축된 DevSecOps 파이프라인에서 보안쪽을 강화하기 위해서 OWASP ZAP을 도입한 도입기 포스트입니다.  
보통 외부 서버로 두고 서비스의 Port나 IP등을 스캔하지만 저희는 k8s 클러스터에 직접 올려 pod들을 스캐닝 하려고 했습니다.



---

* 사용 할 툴을 다음과 같습니다.  

    - Jenkins
    * OWASP ZAP


<br/>

---




## ✔ GCP의 LB IP를 고정



* 저는 gcloud-sdk를 이용하여 Cloud Shell에서 작업을 진행했습니다

    아래와 같이 CLoud Shell에 원격 접속 후 GKE 클러스터에 대한 권한을 받아옵니다


    ```cs
    h43254@cloudshell:/etc (cccr-nov2)$ gcloud config set compute/zone us-central1-f
    Updated property [compute/zone].
    h43254@cloudshell:/etc (cccr-nov2)$ 
    h43254@cloudshell:/etc (cccr-nov2)$ gcloud container clusters get-credentials c-dcn6h
    Fetching cluster endpoint and auth data.
    kubeconfig entry generated for c-dcn6h.
    h43254@cloudshell:/etc (cccr-nov2)$ kubectl get nodes
    NAME                                  STATUS   ROLES    AGE     VERSION
    gke-c-dcn6h-default-0-41c99d2b-b3hf   Ready    <none>   2d21h   v1.17.12-gke.1501
    gke-c-dcn6h-default-0-41c99d2b-zkp7   Ready    <none>   2d21h   v1.17.12-gke.1501
    ```

<br/>

* 그 후 아래 명령어로 외부 고정 IP를 생성해줍니다

    ```cs
    h43254@cloudshell:~ (cccr-nov2)$ gcloud compute addresses create app-lb
    For the following address:
    - [test-lb-ip]
    choose a region or global:
    [1] global
    [2] region: asia-east1
    [3] region: asia-east2
    [4] region: asia-northeast1
    [5] region: asia-northeast2
    [6] region: asia-northeast3
    [7] region: asia-south1
    [8] region: asia-southeast1
    [9] region: asia-southeast2
    [10] region: australia-southeast1
    [11] region: europe-north1
    [12] region: europe-west1
    [13] region: europe-west2
    [14] region: europe-west3
    [15] region: europe-west4
    [16] region: europe-west6
    [17] region: northamerica-northeast1
    [18] region: southamerica-east1
    [19] region: us-central1
    [20] region: us-east1
    [21] region: us-east4
    [22] region: us-west1
    [23] region: us-west2
    [24] region: us-west3
    [25] region: us-west4
    Please enter your numeric choice:  19         

    Created [https://www.googleapis.com/compute/v1/projects/cccr-nov2/regions/us-central1/addresses/app-lb].
    h43254@cloudshell:~ (cccr-nov2)$ gcloud compute addresses list
    NAME                 ADDRESS/RANGE   TYPE      PURPOSE  NETWORK  REGION           SUBNET  STATUS
    app-lb               35.223.27.28    EXTERNAL                    us-central1              RESERVED
    jenkins-external-ip  34.64.237.112   EXTERNAL                    asia-northeast3          IN_USE
    rancher              34.64.228.193   EXTERNAL                    asia-northeast3          IN_USE
    ```

<br/>

* 이후에 배포 할 서비스의 메니페스트 파일에 ``spec.loadBalancerIP``항목을 정의하여 LB IP를 고정하여 넣어주어야 합니다.

    GCP의 경우 LoadBalancerIP 항목을 명시해주면 자동으로 매칭되어 서비스가 올라옵니다!


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
    loadBalancerIP: 35.223.27.28    <<<<이부분>>>>
    ```

<br/>



* Service의 배포가 완료되면 아래와 같이 ``App-lb``가 ``IN_USE``로 바뀐 것을 확인할 수 있습니다.

    ```cs
    h43254@cloudshell:~ (cccr-nov2)$ gcloud compute addresses list
    NAME                 ADDRESS/RANGE  TYPE      PURPOSE  NETWORK  REGION           SUBNET  STATUS
    app-lb               35.223.27.28   EXTERNAL                    us-central1              IN_USE
    jenkins-external-ip  34.64.237.112  EXTERNAL                    asia-northeast3          IN_USE
    rancher              34.64.228.193  EXTERNAL                    asia-northeast3          IN_USE
    ```
<br/>

* 또한 k8s 클러스터에서도 해당 LB IP로 서비스가 정상적으로 생성됨을 확인!

    ```cs
    h43254@cloudshell:~ (cccr-nov2)$ kubectl get svc -n cd-test
    NAME     TYPE           CLUSTER-IP    EXTERNAL-IP    PORT(S)          AGE
    app-lb   LoadBalancer   10.0.30.127   35.223.27.28   8080:32530/TCP   9m2s
    mysql    ClusterIP      10.0.24.243   <none>         3306/TCP         18h
    ```

<br/>

----



## ✌ Jenkins에 OWASP ZAP 설치


처음에는 Kubernetes의 Helm으로 ZAP을 배포하려고 했었지만  
URL을 읽어오는 SPIDER등의 설정 가이드가 많이 부족해서 Jnekins와 연동하기로 했습니다

<br/>

* 제일 처음으로 가장 최신 릴리즈 버전의 ZAPPROXY를 다운받습니다.
    * [링크](https://github.com/zaproxy/zaproxy/releases)

    ![스크린샷, 2020-10-30 18-12-23](https://user-images.githubusercontent.com/69498804/97682414-78b1a480-1adb-11eb-958b-0e649ab8c4b3.png)

    <br/>

    * 이후 다운받은 Zip파일을 Jenkins 인스턴스에 ``복사``합니다.

    ```cs
    [root@jenkins bin]# pwd
    /usr/local/bin
    [root@jenkins bin]# ls -alrt ZAP_D-2020-10-26/
    total 5472
    -rwxr-xr-x. 1 jenkins jenkins    4187 Feb  1  1980 zap.sh
    -rw-r--r--. 1 jenkins jenkins  123778 Feb  1  1980 zap.ico
    -rw-r--r--. 1 jenkins jenkins 5440213 Feb  1  1980 zap-D-2020-10-26.jar
    -rw-r--r--. 1 jenkins jenkins     206 Feb  1  1980 zap.bat
    drwxr-xr-x. 2 jenkins jenkins     161 Feb  1  1980 xml
    drwxr-xr-x. 3 jenkins jenkins      23 Feb  1  1980 scripts
    -rw-r--r--. 1 jenkins jenkins    2157 Feb  1  1980 README
    drwxr-xr-x. 2 jenkins jenkins    4096 Feb  1  1980 plugin
    drwxr-xr-x. 2 jenkins jenkins     265 Feb  1  1980 license
    drwxr-xr-x. 2 jenkins jenkins    4096 Feb  1  1980 lib
    drwxr-xr-x. 2 jenkins jenkins    4096 Feb  1  1980 lang
    drwxr-xr-x. 2 jenkins jenkins     140 Feb  1  1980 db
    drwxr-xr-x. 3 root    root         86 Oct 28 07:09 ..
    drwxr-xr-x. 9 jenkins jenkins     180 Oct 29 10:40 .
    ```


<br/>



* 복사가 끝났다면 Jenkins에 OWASP ZAP 관련 Plugin 들을 모두 설치합니다.  


    ![스크린샷, 2020-10-30 16-58-32](https://user-images.githubusercontent.com/69498804/97674610-279cb300-1ad1-11eb-9494-067695600318.png)

    * Official OWASP ZAP Jenkins Plugin
    * OWASP Dependency-Check Plugin
    * OWASP Dependency-Track Plugin
    * OWASP Markup Formatter Plugin
    * JDK

<br/>

* 플러그인이 설치가 완료되었다면 ZAP의 환경변수 설정을 합니다.

    * Manage Jenkins -> configure System 탭에서 설정


<br/>

* 미리 Jenkins 인스턴스 내에 Clone 해놓았던 zap.sh 스크립트가 존재하는 위치 지정  

    ![스크린샷, 2020-10-30 17-39-16](https://user-images.githubusercontent.com/69498804/97678244-d7c0ea80-1ad6-11eb-8024-da31b3d943ee.png)

    * Environment variables : 체크
    * List of variables.name : ZAPROXY_HOME -> 나중에 프로젝트에서 설정할 위치
    * List of variables.Value : 실제 Jenkins 서버의 zap.sh 스크립트 위치.

<br/>

* ZAP PROXY 설정  

    ![스크린샷, 2020-10-30 17-38-45](https://user-images.githubusercontent.com/69498804/97678185-c4ae1a80-1ad6-11eb-8db4-eda98456b84b.png)

    * Default Host : Jenkins 서버의 로컬로 돌리기 위한 값.
    * Default Port : Jenkins 서버에서 동작할 Port 번호


<br/>

* 환경변수 설정 후 freestyle의 프로젝트를 생성합니다.  


    ![스크린샷, 2020-10-30 16-57-15](https://user-images.githubusercontent.com/69498804/97674823-83673c00-1ad1-11eb-99ed-53a6f5531b41.png)


<br/>

* 이후 Build tab에서 ``Excute ZAP``을 추가해 Zap PROXY의 설정을 해줍니다.


    ![스크린샷, 2020-10-30 17-03-11](https://user-images.githubusercontent.com/69498804/97674988-ccb78b80-1ad1-11eb-9f85-b09ca675f922.png)

    * localhost : Jenkins 서버의 로컬에서 동작.
    * override Port : Jenkins 서버에서 동작할 Zap의 사용포트
    * JAVA : OWASP ZAP은 JAVA기반으로 돌기때문에 JDK 플러그인의 추가 설치가 필요합니다



<br/>


* 이제 ZAP의 실행 Method의 관련 설정을 해줍니다.

    ![스크린샷, 2020-10-30 17-04-54](https://user-images.githubusercontent.com/69498804/97675101-0ab4af80-1ad2-11eb-8ca4-a1d424602fb4.png)


    * Environment Variable : 이전에 설정했던 OWASP ZAP의 환경변수 값 기입
    * ZAP Home Directory : Jenkins 서버에 미리 Clone 해놓은 Zap.sh 파일의 위치 기입
    * Filename : job-seesion으로 default 잡아주면 됩니다


<br/>

* 이제 Session Properties 설정을 해줍니다.


    ![스크린샷, 2020-10-30 17-07-17](https://user-images.githubusercontent.com/69498804/97675273-5ebf9400-1ad2-11eb-962e-d710a3dc9968.png)


    * Context Name : default로 컨택스트를 잡아주면 됩니다.
    * Include in Context : 검사할 URL의 주소를 넣어주면 됩니다
    * Username : 실제 사이트에 들어가기 위한 Account User 정보
    * Password : Account User의 PASSWORD 정보
    * Logged in Indicator	: 스캔을 마치고 나올 메세지를 적으면 됩니다 ``\QLogout\E``


<br/>

* 바로 아래에 있는 Form-based Authentication 설정도 추가해줍니다.

    ![스크린샷, 2020-10-30 17-28-05](https://user-images.githubusercontent.com/69498804/97677213-469d4400-1ad5-11eb-93c7-7c2bdd55344c.png)

    * Login Form Target URL : 로그인 Parameter를 기입할 URL 주소를 기입
    * Username Parameter : Username Parameter 값을 기입해줍니다.
    * Password Parameter : Password Parameter 값을 기입해줍니다.  
    * Attack Mode.Starting Point	: 스캔할 URL의 가장 초기 URL을 적어줍니다.


<br/>

* 바로 아래에 있는 Spider Scan 설정도 추가해줍니다.


    ![스크린샷, 2020-10-30 17-30-26](https://user-images.githubusercontent.com/69498804/97677451-9b40bf00-1ad5-11eb-93a2-87d01ae6fe77.png)


    * Spider Scan : 체크
    * Recurse : 체크
    * Subtree Only : 체크
    * Active Scan : 체크
    * Policy : default Policy 로 설정
    * Recurse : 체크

* 스캔 결과의 리포트 파일을 남기기 위해서 Generate Reports 설정을 추가합니다.

    * Generate Reports : 체크
    * Clean Workspace Reports : 체크
    * Filename : ~ {BUILD_ID} 빌드 넘버로 남기기 위한 설정

<br/>

* Report 파일의 형식이 다음과 같음을 확인합니다.

    ![스크린샷, 2020-10-30 17-33-45](https://user-images.githubusercontent.com/69498804/97677724-11452600-1ad6-11eb-9a15-0b11ac43f947.png)

    * Generate Report : xml, html 설정 확인


<br/>

* POST Build ACTION을 설정해줍니다.

    ![스크린샷, 2020-10-30 17-34-32](https://user-images.githubusercontent.com/69498804/97677797-2de15e00-1ad6-11eb-9611-b0d58fd7988c.png)


    * Files to archive : 결과 파일로 띄워줄 로그와 리포트 파일의 위치.
    * HTML directory to archive : Report 파일의 디렉토리 기입
    * Index page[s] : 위에서 생성해줬던 ``[REPORT 파일명].html`` 기입.
    * Report title : html로 띄워줄 리포트 결과의 제목


<br/>

---

## 🙌 빌드 테스트!

* Jenkins의 OWASP ZAP 프로젝트에서 빌드!

    ![스크린샷, 2020-10-30 18-14-55](https://user-images.githubusercontent.com/69498804/97683734-d34b0080-1adb-11eb-9785-af9b9eb6d381.png)

    * 빌드가 완료되면 위의 그림과 같이 html,xml 로그가 생성됩니다.

<br/>


* 실제 해당 Report 파일에 접속하면 아래와 같은 형식으로 리포트 해주는 것을 확인가능합니다.

    ![스크린샷, 2020-10-30 18-15-54](https://user-images.githubusercontent.com/69498804/97684035-f5dd1980-1adb-11eb-8207-790e2b143e8b.png)


<br/>

* 리포트 파일을 확인해보면 홈페이지의 A1,A2등의 취약점 검사를 자동으로 한 것이 확인가능합니다.

    ![스크린샷, 2020-10-30 18-16-51](https://user-images.githubusercontent.com/69498804/97684390-17d69c00-1adc-11eb-8c1e-9c0dd0cd26c2.png)


<br/>

* 실제 동작은 해당 웹페이지에 user, password를 자동으로 기입해주고

    ![스크린샷, 2020-10-30 18-17-57](https://user-images.githubusercontent.com/69498804/97684956-3fc5ff80-1adc-11eb-8c9f-be7222b8a14b.png)


<br/>

* 메인 페이지에 연결되어있는 1~10까지의 보안취약점에 대해 자동으로 스캔을 해줍니다.

    ![스크린샷, 2020-10-30 18-18-39](https://user-images.githubusercontent.com/69498804/97685276-58361a00-1adc-11eb-8b96-c86e60d393e4.png)


<br/>

----


## 마치며…  

사실 보안툴의 자동화는 물론이고 보안툴을 올려보는 것 조차 이번이 처음이었습니다.  
처음엔 Helm으로 k8s 클러스터에 배포하려는 시행착오를 3일정도 겪고, 실패하고, Docker 컨테이너 기반으로 올리고, 실패하고를 반복하면서 5일정도를 날렸던 것 같습니다.  
결국 Jenkins로 파이프라인에 자동적으로 스캔하도록 설정함으로 마무리를 지었지만 아직 미련은 조금 남아있는 상태입니다.  
프로젝트가 끝나고 개인적으로 Helm을 이용해 클러스터에 직접 배포하는 것도 성공해봐야겠습니다  
이번 OWASP ZAP 도입기를 작성하면서 DevSecOps 파이프라인의 보안에 대해서 조금의 감은 잡은 것 같습니다.  
실제로 OWASP ZAP 관련해서 한글문서나 정확한 설정 가이드가 미흡하다 보니  
이번 포스트가 많은 사람들에게 도움이 되었으면 좋겠습니다.

---

```toc
```