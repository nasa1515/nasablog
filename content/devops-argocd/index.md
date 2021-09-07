---
emoji: 🤦‍♂️
title: Argo-CD를 이용한 배포 자동화 [DevOps]
date: "2021-08-07 00:04:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


머리말  

안녕하세요 NASA입니다!!.  
이번 포스트에서는 Open Source인 Gitops기반의 Argo-CD 를 이용한 배포에 대해서 포스트했습니다  
앞서 다룬 포스트에서 기본적인 환경구성은 모두 완료되었고 이제부터 진정한 파이프라인 구성입니다!!

---

* 사용 할 툴을 다음과 같습니다.  

- Rancher (GKE)
- Argo-cd

---

## ✔ 환경구성 

* 환경구성의 경우 이전 포스트에서 모두 완료했습니다!!
* 다만 클러스터 내부에 직접 들어가 Argo-CD를 설치하는게 아닌 Rancher의 카탈로그를 사용해서 자동 Helm 배포를 진행합니다


---

## ✔ Rancher Argo-CD Plugin을 설치


구축중인 파이프라인의 전제적인 Service Flow는 다음과 같습니다

* ``CI : Jenkins -> DockerHUB / CD : Gitlab -> Argo-CD -> Rancher Cluseter``   \
Api를 통한 이미지 배포 (Rolling update) 진행 및 히스토리 관리 예정.

<br/>

----

### 작업 시작 전 정보! 
-- > Docker Containor Restart

도커의 경우 VM과는 다르다 컨테이너란 프로세스의 개념으로 생각하면된다  
GCP 인스턴스의 Docker로 실행한 Jenkins가 이로 인해 문제를 발생시켰다

```cs
[root@jenkins ~]# docker ps -a
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                      PORTS               NAMES
d8cbbb69e267        jenkins/jenkins:latest   "/sbin/tini -- /usr/…"   18 hours ago        Exited (143) 17 hours ago                       jenkins
[root@jenkins ~]# 
```
이렇게 인스턴스를 재부팅하면 컨테이너가 죽는다...

그럼 위의 명령어로 해당 컨테이너 아이디를 확인 후 Container restart 명령어로 되살리면 된다.

```cs
[root@jenkins ~]# docker container restart d8cbbb69e267
d8cbbb69e267
```

<br/>


* Rancher 대쉬보드 -> APP -> Launch 탭에 접속

    ![aaaa](https://user-images.githubusercontent.com/69498804/95819968-285be800-0d62-11eb-810c-34a4666edeac.png)



<br/>

* Argo-CD Plugin 검색 후 각 노드에 배포

   ![스크린샷, 2020-10-13 14-42-08](https://user-images.githubusercontent.com/69498804/95820019-47f31080-0d62-11eb-8b41-3952f785acac.png)


<br/>

* 이런 설정들은 기본으로 두어도 됩니다.

    ![스크린샷, 2020-10-13 14-42-46](https://user-images.githubusercontent.com/69498804/95820058-5e00d100-0d62-11eb-8110-10b3149c4826.png)


<br/>

* 그럼 아래와 같이 Rancher 대쉬보드에서 배포된 Apps에 대해서 확인 할 수 있습니다

    ![스크린샷, 2020-10-13 14-43-49](https://user-images.githubusercontent.com/69498804/95820133-838dda80-0d62-11eb-84d2-7ee6115b69cf.png)



<br/>

* 배포가 모두 완료된 후 ARGO-CD APPS에 들어가면 아래와 같이 Endpoint 주소를 띄웁니다.
    해당 주소로 접속!!
    ![스크린샷, 2020-10-13 14-45-13](https://user-images.githubusercontent.com/69498804/95820242-b6d06980-0d62-11eb-8bc9-5f0705adeb23.png)



<br/>

* 그럼 다음과 같은 Argo-CD의 대쉬보드에 접속이 가능합니다.


    ![스크린샷, 2020-10-13 14-46-16](https://user-images.githubusercontent.com/69498804/95820317-db2c4600-0d62-11eb-8789-ef49d07cc6c6.png)


<br/>

* 하지만 관리자 PASSWORD는 서버명으로 설정되기 때문에 아래 POD에 접속합니다

    ![스크린샷, 2020-10-13 14-47-33](https://user-images.githubusercontent.com/69498804/95820435-0a42b780-0d63-11eb-8bb3-9c73de758bbd.png)


<br/>

* 아래 POD의 전체 ID가 현재 관리자(ADMIN) 계정의 패스워드입니다. 입력 후 접속!!

    ![스크린샷, 2020-10-13 14-48-38](https://user-images.githubusercontent.com/69498804/95820534-3100ee00-0d63-11eb-8460-26824e97e779.png)


<br/>

* 정상적으로 접속이 되었다면 아래와 같이 배포 파이프라인을 설정 할 수 있는 창이 나오게 됩니다.

    ![스크린샷, 2020-10-13 14-49-49](https://user-images.githubusercontent.com/69498804/95820622-5aba1500-0d63-11eb-9f27-1ac1fdc3b5d4.png)



<br/>

* 설정 -> 저장소 탭에서 연동할 GITALB의 주소를 등록해줍니다


    ![스크린샷, 2020-10-13 15-17-13](https://user-images.githubusercontent.com/69498804/95822592-2d6f6600-0d67-11eb-8e0f-da14e9b434dd.png)



<br/>

* New APP을 눌러 새로운 파이프라인을 설정해줍니다


    ![스크린샷, 2020-10-13 14-54-35](https://user-images.githubusercontent.com/69498804/95820959-0499a180-0d64-11eb-832f-bf6a4f4fb2a8.png)



<br/>

* 그럼 아래와 같은 PipeLINE App이 하나 만들어집니다!!

    ![스크린샷, 2020-10-13 14-56-40](https://user-images.githubusercontent.com/69498804/95821114-4fb3b480-0d64-11eb-94a1-eaa4df36079a.png)


<br/>

* GITLAB 저장소에는 아래와 같은 두 파일이 존재하고 내용을 다음과 같다

    ![스크린샷, 2020-10-13 14-57-33](https://user-images.githubusercontent.com/69498804/95821188-6fe37380-0d64-11eb-9d94-76b0837a8d56.png)


<br/>

* deploy.yaml 예제.

    ```cs
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: nasa1515-deploy
    labels:
        app: nasa1515-deploy
    spec:
    replicas: 2
    selector:
        matchLabels:
        app: nasa1515-deploy
    template:
        metadata:
        labels:
            app: nasa1515-deploy
        spec:
        containers:
        - image: nasa1415/devops:latest
            name: nasa1515-app
            ports:
            - containerPort: 8000
    ```

<br/>

* service.yaml 예제.

    ```cs
    apiVersion: v1
    kind: Service
    metadata:
    name: nasa1515-svc
    spec:
    type: NodePort
    ports:
    - port: 8080
        targetPort: 8000
        nodePort: 31111
    selector:
        app: nasa1515-deploy
    ```

<br/>

<br/>

* 이제 만들어둔 App에서 SYNC를 누르게 되면


    ![스크린샷, 2020-10-13 14-59-49](https://user-images.githubusercontent.com/69498804/95821383-c0f36780-0d64-11eb-8691-2538c3b7bc85.png)



<br/>

* 다음과 같이 배포파일을 읽어와 노드에 배포합니다!!

    ![스크린샷, 2020-10-13 15-32-08](https://user-images.githubusercontent.com/69498804/95823833-4547e980-0d69-11eb-842b-ea9e04341594.png)


<br/>


* 실제 Rancher에서의 로그를 보면 다음과 같이 Argo-cd에서의 배포 로그를 확인가능합니다

    ![스크린샷, 2020-10-13 15-33-22](https://user-images.githubusercontent.com/69498804/95823941-72949780-0d69-11eb-8e65-d016680a0a4e.png)


<br/>

* 추가적으로 Rancher에서 확인해보면 배포가 정상적이고 서비스 중임을 확인 가능합니다.

    ![스크린샷, 2020-10-13 15-34-33](https://user-images.githubusercontent.com/69498804/95824040-9b1c9180-0d69-11eb-9c5b-4b09b626218a.png)

----

### 마치며…  

이번 포스트에서는 Argo-CD를 설치하고 툴을 통해서 배포하는 법을 알아봤습니다.  
직접 설치한 것이 아니라 Rancher의 기능을 이용해서 다른 불필요한 트러블 슈팅을 줄여서 그나마 짧게 끝난 것 같습니다.    
 이렇게 메니페스트 파일을 통해서 자동으로 컨테이너를 올리고 오케스트레이션 하는 것들을 직접해보니  
 이제서야 DevOps 엔지니어에 대해서 쌀알 만큼 알아가고 있는 것 같은 느낌입니다. 

다음 포스트에는 실제 취약점 검사 툴 들을 올리고 서비스, DB 연동들까지 진행하겠습니다.

---

```toc
```