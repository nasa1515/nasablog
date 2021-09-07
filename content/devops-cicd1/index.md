---
emoji: 🤦‍♂️
title: Jenkins를 이용한 CI 자동화 구축 [DevOps]
date: "2021-08-04 00:41:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


머리말  

안녕하세요 NASA입니다!!.  
이번 포스트에서는 Open Source를 이용한 DevSecOps CI/CD PIPELINE 구축에 대한 포스트입니다.   
다만 포스트의 양이 매우 많아 질 것 같아. CI, CD 별 그리고 툴 별로 포스트를 나눌 예정입니다.  
이번 포스트에서는 Jenkins를 이용한 CI 구성 부분을 포스트 했습니다!..

---

사용 할 툴을 다음과 같습니다.  

- gitlab
- Jenkins
- Docker, dockerhub

---


## ✔ 환경구성

우선 환경 구성은 아래와 같습니다
![캡처](https://user-images.githubusercontent.com/69498804/94150900-b2780580-feb4-11ea-963e-6f7968e47d92.PNG)


* jenkins : 젠킨스 서버의 역할을 하는 서버 (Docker in Docker)
* Rancher-master : Rancher 기반의 k8s Master
* nasa-node1~2 : Rancher 기반의 K8s Worker

<br/>

----

## ✔ CI

### JENKINS 설치  

GCP 인스턴스 생성 방법의 경우 블로그의 [GCP 인스턴트 생성 방법](https://nasa1515.tech/gcp-first/) 포스트에 정리되어 있습니다.

<br/>

### Jenkins
Jenkins의 경우 Docker in Docker 방식으로 구성했습니다.  
현재는 어쩔수 없이 Docker 기반의 서비스를 사용해보기 위해 실습을 해서 그렇지만  
실제 최종 결과물은 Jenkins 툴을 인스턴스에 설치하는 것으로 서비스 예정입니다.

<br/>

Docker in Docker (DinD)  

```cs
도커 안에 도커는 도커 바이너리를 설정하고 컨테이너 내부의 격리된 Docker 데몬을실행하는 작업을 의미한다. 즉, 도커데몬이 2개가 뜨는 것이다. CI측면에서 접근한다면Task를 수행하는 Agent가 Docker Client와 Docker Daemon역할까지 하게되어 도커명령들을 수행하는데 문제가 없어진다. 이렇게 말로만 들으면 아름답고 문제가없어보이지만 이 접근에는 큰 단점이 존재한다.
```

<br/>
<br/>

호스트 도커 컨테이너가 privilieged mode로 실행되어야 한다.

```cs
$ docker run --privileged --name dind1 -d docker:1.8-dind
```

```cs
privilieged 플래그를 사용한다면 호스트컨테이너가 호스트머신에서 할 수 있는 거의 모든 작업을 할 수 있게 된다.
이는 컨테이너를 실행하는데 큰 ""보안 위험""을 초래할 수 있다.
```

[DinD 사용법과 원리에 대해 잘 정리된 포스트](https://sreeninet.wordpress.com/2016/12/23/docker-in-docker-and-play-with-docker/)


<br/>
<br/>

우선 jenkins 설치 시 사용할 Home Directory 생성해줍니다

```cs
# mkdir -p /docker/jenkins
# chmod 666 /docker/jenkins
```

<br/>
<br/>

Docker로 젠킨스를 옵려줍시다!

```cs
# docker run -itd --name jenkins -p 8080:8080 -p 50000:50000 -v /docker/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -e TZ=Asia/Seoul -u rootjenkins/jenkins:latest
```

<br/>
<br/>

주요 옵션 설명

```cs
-v /docker/jenkins:/var/jenkins_home
    

local volume의 /docker/jenkins 디렉토리와 container volume의 /var/jenkins_home 디렉토리 매핑

-v /var/run/docker.sock:/var/run/docker.sock
제일 중요한 옵션
docker in docker를 구현하기 위해 사용하는 옵션

-u root
Docker 사용자를 root로 설정

-p 8080:8080 -p 50000:50000
local port와 container port 연결
8080은 Jenkins 기본 port
50000dms Jenkins slave port

-e TZ=Asia/Seoul
jenkins 내의 timezone 설정
```

<br/>
<br/>

Jenkins 컨테이너가 제대로 생성된 것을 확인!

```cs
[root@jenkins devops-pipeline]# docker ps
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS              PORTS                                              NAMES
d8cbbb69e267        jenkins/jenkins:latest   "/sbin/tini -- /usr/…"   2 minutes ago       Up 2 minutes        0.0.0.0:8080->8080/tcp, 0.0.0.0:50000->50000/tcp   jenkins
```

<br/>

---

### GCP 방화벽(Firewall) 설정

<br/>

기본적으로 Jenkins는 8080포트를 사용하기에 GCP에서의 외부 통신을 위해선 방화벽 설정이 필요합니다.


<br/>

그림과 같이 인스턴스의 [네트워크 세부정보 보기] 탭으로 접속합니다

![스크린샷, 2020-09-22 12-11-43](https://user-images.githubusercontent.com/69498804/93840857-cbbe5d80-fccc-11ea-8204-63775025051c.png)

<br/>
<br/>

[방화벽 규칙] - [방화벽 규칙 만들기] 탭을 이용해 아래와 같이 규칙을 생성합니다.

![스크린샷, 2020-09-22 12-14-37](https://user-images.githubusercontent.com/69498804/93841021-48513c00-fccd-11ea-9080-277cc08722b3.png)  
``0.0.0.0/0은 모든 IP 대역에 대한 허용입니다.``  
현재는 기능테스트를 위해서 모든 대역으로 잡아놨지만 후에 특정 인스턴스의 IP로만 허용 할 예정입니다

<br/>
<br/>

그럼 아래 같은 방화벽이 추가된 것을 GCP에서 확인 할 수 있습니다.

![스크린샷, 2020-09-22 12-16-29](https://user-images.githubusercontent.com/69498804/93841074-73d42680-fccd-11ea-9994-508de3ab13ca.png)

<br/>
<br/>

``이제 브라우저로 젠킨스에 접속 해봅시다``  

* 접속 주소는 http://인스턴스 외부 IP:8080 입니다.  
    

<br/>

즉 GCP에서 인스턴스에 외부 IP 설정이 필요합니다!!

![스크린샷, 2020-09-22 13-28-43](https://user-images.githubusercontent.com/69498804/93844259-8c493e80-fcd7-11ea-8587-52b03347f155.png)

<br/>
<br/>

해당 인스턴스의 외부 IP : 34.64.93.209로 접속!!

![스크린샷, 2020-09-22 13-29-55](https://user-images.githubusercontent.com/69498804/93844315-b69afc00-fcd7-11ea-8e8d-2b661d0b1729.png)
이렇게 Jenkins가 지원하는 웹페이지가 정상 구동됩니다

<br/>
<br/>

Administrator password에는 다음의 명령어로 확인되는 코드를 입력해줍니다.


```cs
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

<br/>
<br/>

해당 어드민 키를 입력 후 기본적인 정보들을 입력하면 아래와 같이 페이지를 볼 수 있습니다  

![스크린샷, 2020-09-22 13-43-21](https://user-images.githubusercontent.com/69498804/93844873-9e2be100-fcd9-11ea-9dec-621d09789744.png)

<br/>

---

### 자 이제 gitlab과 연동해봅시다.

<br/>

주로 외부 저장소로 GITLAB, GITHUB를 많이 이용하는데  
이번 포스트에서는 ``gitlab``을 사용해보겠습니다.  

<br/>

[gitlab](https://gitlab.com/) Gitlab 로그인 후 Settings 메뉴에 접속합니다   

![스크린샷, 2020-09-22 14-04-02](https://user-images.githubusercontent.com/69498804/93845625-7be79280-fcdc-11ea-85d9-7b0f1fc27f62.png)

<br/>
<br/>

아래와 같은 설정으로 토큰을 생성 해줍니다  

![스크린샷, 2020-09-22 14-06-58](https://user-images.githubusercontent.com/69498804/93845725-e39ddd80-fcdc-11ea-8784-bcd98b5f15b8.png)

<br/>
<br/>

생성 후 토큰 값이 나올텐데 기록해두세요!!  

![스크린샷, 2020-09-22 14-08-04](https://user-images.githubusercontent.com/69498804/93845764-0b8d4100-fcdd-11ea-8c06-3aec0f404540.png)

<br/>

---


### Docker in Docker (DinD) 작업


<br/>

우선 Docker를 이용해 이미지 Build 및 Push를 위해 플러그인을 설치해줍니다
    
![123](https://user-images.githubusercontent.com/69498804/94152453-8a89a180-feb6-11ea-9bd9-64c85abc085f.PNG)

<br/>
<br/>

Jenkins에서 GitLab과 연동을 위한 Credential 추가  
우선 Jenkins에서 GitLab token을 사용하는 Credential을 생성합니다.

![스크린샷, 2020-09-22 14-54-54](https://user-images.githubusercontent.com/69498804/93848039-95d8a380-fce3-11ea-9862-f21c1b40f4b4.png)
    docker-build-step, Docker, Docker-pipeline 세가지!

<br/>
<br/>


### Docker in Docker 구성

<br/>

Docker Container 접속
    
```cs
$ docker exec -it jenkins bash
```

<br/>
<br/>

Docker설치를 위한 Shell 다운로드
    
```cs
$ curl -fsSL get.docker.com -o get-docker.sh
```

<br/>
<br/>

Docker install shell script 실행
    
```cs
$ sh get-docker.sh
```

<br/>
<br/>

 docker 실행 가능 여부 확인
    
```cs
$ docker ps
CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                                              NAMES
094c32442200        nasa1415/devops:0.1   "/sbin/tini -- /usr/??   About an hour ago   Up About an hour    0.0.0.0:8080->8080/tcp, 0.0.0.0:50000->50000/tcp   jenkins
```

<br/>

---

### 여기까지 CI를 설정 끝

<br/>


Build 할 Docker 이미지를 준비합시다

```cs
FROM ubuntu:18.04
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN apt upgrade -y
RUN apt-get update -y
RUN apt-get install nginx -y
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

CMD ["nginx"]
```
위와 같이 간단한 우분투 생성 DockerFile을 만들어서 배포해보죠

<br/>
<br/>

## ✌ (CI) 이미지 Build & push 

<br/>

그전에 배포를 위해 Docker-Hub의 인증키를 생성합니다  
Jenkins->Credentials->global->Add Credentials

![스크린샷, 2020-09-25 11-39-43](https://user-images.githubusercontent.com/69498804/94220408-d292dd80-ff23-11ea-84a2-c636709c2986.png)
위의 캡쳐와 같이 DOCKERHUB의 ID와 PASSWORD를 적어서 인증키를 생성합니다

<br/>
<br/>

생성된 인증키를 확인합니다

![스크린샷, 2020-09-25 11-42-25](https://user-images.githubusercontent.com/69498804/94220566-31585700-ff24-11ea-8f0e-2e5593ed3dfb.png)

<br/>
<br/>

이제 배포를 위해 Jenkins에서 새로운 item을 누르고, pipeline 선택 후 item의 이름을 입력해주세요.

![스크린샷, 2020-09-25 11-43-31](https://user-images.githubusercontent.com/69498804/94220622-577df700-ff24-11ea-9463-eb744535a220.png)

<br/>
<br/>

Pipeline 메뉴에서 Definition을 Pipeline script from SCM을 선택하여 주세요.  
이제 Script path를 물어보게 되는데, jenkinsfile-build에 각 단계를 규정해서 액션을 지정하면 됩니다.

![스크린샷, 2020-09-25 11-44-12](https://user-images.githubusercontent.com/69498804/94220652-7086a800-ff24-11ea-83f2-33f5617892ae.png)
레포지토리 항목에는 연동 할 레포지토리 주소를 적어줍니다. 저의 경우 gitlab

<br/>
<br/>

모든 설정을 마무리하고 SAVE를 누르면 아래와 같이 아이템이 생성됩니다.

![스크린샷, 2020-09-25 11-46-02](https://user-images.githubusercontent.com/69498804/94220781-b2175300-ff24-11ea-9c8b-7a43cb818ab7.png)

<br/>

---

<br/>

빌드와 푸시를 해봅시다

git 저장소에 DockerFile과 Jenkinsfile-nasa를 넣어줍니다 

저의 경우 GITLAB과 사용하는 노트북저장소를 연결시켜 놨습니다
  
```cs
root@cccr:/gitlab/devops-pipeline# ls -alrt 
합계 24
drwxr-xr-x 3 student student 4096  9월 22 15:55 ..
-rw-r--r-- 1 root    root      45  9월 22 16:00 README.md
-rwxrwxrwx 1 root    root     208  9월 24 17:56 Dockerfile
-rwxrwxrwx 1 root    root     355  9월 24 18:10 Jenkinsfile-nasa
drwxr-xr-x 8 root    root    4096  9월 24 18:11 .git
drwxr-xr-x 3 root    root    4096  9월 25 11:50 .
```

<br/>
<br/>


Jenkinsfile-nasa

```cs
node {
    stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        app = docker.build("nasa1415/devops")
    }
    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'nasa1415') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}

```

<br/>
<br/>

이제 생성한 아이템에서 Build Now 버튼을 눌러 빌드해봅시다

![스크린샷, 2020-09-25 11-52-26](https://user-images.githubusercontent.com/69498804/94221213-96f91300-ff25-11ea-9f24-6db24689479e.png)

<br/>
<br/>

그럼 빌드가 실행되고, 로직을 보여줍니다

![스크린샷, 2020-09-25 11-53-38](https://user-images.githubusercontent.com/69498804/94221282-c14ad080-ff25-11ea-8f22-7639fa1aa509.png)

<br/>
<br/>

이제 Docker Hub에도 빌드 Numver : 10으로 이미지가 업로드가 된 것을 확인 할 수 있죠.

![스크린샷, 2020-09-25 11-54-43](https://user-images.githubusercontent.com/69498804/94221366-e93a3400-ff25-11ea-964a-b9b6c88f21e9.png)


<br/>
<br/>


---


### CI 자동화

일일히 Build 버튼을 누르면 너무 귀찮으니 GITLAB 저장소에 Push Event 발생시 자동 빌드되도록 설정합시다

<br/>

우선 GITLAB에서 Access Token을 발급해줍니다

![스크린샷, 2020-09-25 12-04-21](https://user-images.githubusercontent.com/69498804/94222018-41256a80-ff27-11ea-9c6c-ddccd1000d8b.png)
USER - SETTING - ACCESS TOKEN 메뉴로 들어가 아래와 같이 입력 후 발급된 키를 기억해 두세요

<br/>
<br/>

jenkins에서 발급한 키로 아래와 같이 인증키를 생성합니다!
![스크린샷, 2020-09-25 12-04-21](https://user-images.githubusercontent.com/69498804/94222018-41256a80-ff27-11ea-9c6c-ddccd1000d8b.png)

<br/>
<br/>

이제 Jenkins에서 Credential을 Global Settings에 Gitlab으로 추가해줍니다  
실제 Jenkins와 Gitlab 연동을 위한 Jenkins의 Manage Jenkins 상에 Configure System 에서  
아래와 같은 설정을 추가합니다. credential은 앞서 생성한 credential을 선택합니다.

![스크린샷, 2020-09-25 12-07-17](https://user-images.githubusercontent.com/69498804/94222189-aaa57900-ff27-11ea-9677-b46edb066a18.png)

참고할것은 URL내에 http:// 를 필히 입력해야 합니다.  
URL은 생성해둔 GITLAB의 프로젝트 URL 입니다!!

<br/>

---


### Jenkins에서 자동 Build trigger 설정

<br/>

아까 생성해둔 아이템에서 설정에 들어가 아래 메뉴에서 웹훅 URL을 확인합니다
    
![스크린샷, 2020-09-25 12-11-49](https://user-images.githubusercontent.com/69498804/94222435-4cc56100-ff28-11ea-94fc-475ed1bd211a.png)

해당 설정 적용 시 build가 push시 자동으로 이루어지도록 합니다.  
여기서 webhook URL정보가 출력되니 기억 해 두어야 합니다.

저의 경우 URL: http://34.64.94.209:8080/project/image 입니다.

<br/>

----

## 🙌 GitLab에서 integration webhook 등록   

이제 GitLab에서 Push Event가 발생되면 Jenkin의 Job을 build 하는 webhook을 생성하도록 해보겠습니다.

<br/>

아래와 같이 GitLab의 해당 project에 settings→ integration 으로 이동하여 webhook을 생성합니다.
![스크린샷, 2020-09-22 15-22-54](https://user-images.githubusercontent.com/69498804/93849625-7e9bb500-fce7-11ea-9a13-f4575810667e.png)
방금 전 확인했던 URL을 입력하면 됩니다!!

<br/>
<br/>

다음과 같은 에러가 발생했습니다

![스크린샷, 2020-09-22 15-28-46](https://user-images.githubusercontent.com/69498804/93850069-51033b80-fce8-11ea-8ea8-285c5abd8f7d.png)
검색 결과 WebHook 생성 시 URL만 기입하고 Secret 토큰을 기입하지 않아서였다...

<br/>
<br/>

Jenkins 에서 만든 프로젝트에서 설정에 들어가면 아래와 같이 genarator로 발급받을 수 있다.
![스크린샷, 2020-09-22 15-44-06](https://user-images.githubusercontent.com/69498804/93851083-75601780-fcea-11ea-9820-d35eeb742a25.png)

<br/>
<br/>

웹훅이 제대로 생성되었다면 테스트 해봅시다

![스크린샷, 2020-09-25 12-19-33](https://user-images.githubusercontent.com/69498804/94222822-61eebf80-ff29-11ea-8640-8b0dc65846dd.png)
아래 생성된 웹훅에서 Push Events를 클릭하여 테스트 진행해보죠

<br/>
<br/>

그럼 아래처럼 정상적으로 푸시 이벤트를 전송했음을 확인 할 수 있습니다

![스크린샷, 2020-09-25 12-20-30](https://user-images.githubusercontent.com/69498804/94222874-82b71500-ff29-11ea-9a83-efcbb8e1e512.png)

<br/>
<br/>

자 그럼 이제 모든 설정이 완료되었습니다 git push를 날렸을때 테스트 해보죠

```cs
root@cccr:/gitlab/devops-pipeline# ls -lart 
합계 28
drwxr-xr-x 3 student student 4096  9월 22 15:55 ..
-rw-r--r-- 1 root    root      45  9월 22 16:00 README.md
-rwxrwxrwx 1 root    root     208  9월 24 17:56 Dockerfile
-rwxrwxrwx 1 root    root     355  9월 24 18:10 Jenkinsfile-nasa
drwxr-xr-x 8 root    root    4096  9월 25 11:57 .git
-rw-r--r-- 1 root    root       5  9월 25 12:22 gitlab-push-test
drwxr-xr-x 3 root    root    4096  9월 25 12:22 .
root@cccr:/gitlab/devops-pipeline# git add -A
root@cccr:/gitlab/devops-pipeline# git commit -m "event test"
[master 51f5052] event test
1 file changed, 1 insertion(+)
create mode 100644 gitlab-push-test
root@cccr:/gitlab/devops-pipeline# git push gitlab
Username for 'https://gitlab.com': nasa1515
Password for 'https://nasa1515@gitlab.com': 
오브젝트 개수 세는 중: 5, 완료.
Delta compression using up to 8 threads.
오브젝트 압축하는 중: 100% (4/4), 완료.
오브젝트 쓰는 중: 100% (5/5), 450 bytes | 450.00 KiB/s, 완료.
Total 5 (delta 2), reused 0 (delta 0)
To https://gitlab.com/nasa1515/devops-pipeline.git
e901329..51f5052  master -> master
```
저는 다음과 같이 gitlab-push-test라는 파일을 생성해서 PUSH 했습니다

<br/>
<br/>

그럼 Jenkins 에서는 Push Event를 읽어와 다름과 같이 자동 빌드합니다

![스크린샷, 2020-09-25 12-23-53](https://user-images.githubusercontent.com/69498804/94223072-fbb66c80-ff29-11ea-94f5-2b7e440ca6e7.png)

<br/>

---

### 마치며…  

이번 포스트에서는 Jenkins를 사용해서 CI 부분을 자동화 해봤습니다.  
사실 이전까지는 DevOps라는 개념에 대해서 추상적으로만 알고있었을 뿐이지 어떤 작업들을 하는지는 정확히 몰랐었습니다.  
아직 파이프라인의 통합 전 사전 설정 단계이지만 이미지는 어떤식으로 빌드를 수행하는지  
그리고 배포는 어떤식으로 하는지 등등을 알게 되었습니다.

특히 추상적이던 DevOps의 추세에 맞추어서 CI 자연스럽게 연결을 지었고  
추가적으로 결과에 대한 Noti를 Slack등으로 전달받는 기능도 추가할 예정입니다.  
다음 포스트에는 Rancher를 이용한 클러스터 구축에 대해서 적용해보고 정리하는 시간을 갖도록 하겠습니다.


---


```toc
```