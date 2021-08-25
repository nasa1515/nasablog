---
emoji: 🤦‍♂️
title: Install [DOCKER]
date: "2021-06-26 00:01:25"
author: nasa1515
tags: DOCKER
categories: DOCKER
---


머리말  

 이전 포스트에서는 도커에 대해서, 도커와 VM과의 차이 에서 포스팅 했었다.  
 이번 포스트에서는 실제 도커의 설치방법 및 확인 방법등에 대해 간단하게 포스트 했다.


---



## ✔ 도커 설치

도커는 리눅스 컨테이너 기술이므로 macOS나 windows에 설치할 경우 가상머신에 설치가 됩니다.  
리눅스 컨테이너 말고 윈도우즈 컨테이너라는 것도 존재하지만 이 포스트는 리눅스를 전제로 합니다.  

* Linux  
    리눅스에 도커를 설치하는 방법은 자동 설치 스크립트를 이용하는 것이 가장 쉽습니다.  
    다음 명령어를 입력하면 root 권한을 요구하고 잠시 기다리면 설치가 완료됩니다.

    ```cs
    curl -fsSL https://get.docker.com/ | sudo sh
    ```


---
    
스크립트를 사용하는 방법 외에도 패키지 저장소에 연결하여 설치도 가능합니다.  

* 패키지 저장소 연결

    * 사전 패키지 설치  
    
    ```cs
    # sudo yum install -y yum-utils \
    > device-mapper-persistent-data \
    > lvm2
    ```

    <br/>

    * Yum 저장소 설정
    ``yum-config-manager``로 docker-ce 패키지 저장소에 연결한다.

    ```cs
    # sudo yum-coinfig-manager \
    > --add-repo \
    > https://download.docker.com/linux/centos/docker-ce.repo
    ```

    <br/>

    * docker-ce 설치
    
    ```cs
    # sudo yum install -y docker-ce docker-ce-cli containerd.io
    ```


    <br/>

    * 서비스 실행 및 활성화
    
    ```cs
    # sudo systemctl start docker
    # sudo systemctl enable docker
    ```


    <br/>

    * sudo 없이 DOCKER 사용하기

    ``docker`는 기본적으로 ``root``권한이 필요합니다.  
    root가 아닌 사용자가 sudo없이 사용하려면 해당 사용자를 docker그룹에 추가합니다.
    
    ```cs
    sudo usermod -aG docker $USER # 현재 접속중인 사용자에게 권한주기
    sudo usermod -aG docker your-user # your-user 사용자에게 권한주기
    ```

    사용자가 로그인 중이라면 다시 로그인 후 권한이 적용됩니다.


    <br/>

    * DOCKER VERSION 확인
    docker 설치 완료 후 설정이 끝났으면 version을 확인해본다.

    ```cs
    nasa1515@nasa:~$ docker version
    Client: Docker Engine - Community
    Version:           19.03.12
    API version:       1.40
    Go version:        go1.13.10
    Git commit:        48a66213fe
    Built:             Mon Jun 22 15:45:36 2020
    OS/Arch:           linux/amd64
    Experimental:      false

    Server: Docker Engine - Community
    Engine:
    Version:          19.03.12
    API version:      1.40 (minimum version 1.12)
    Go version:       go1.13.10
    Git commit:       48a66213fe
    Built:            Mon Jun 22 15:44:07 2020
    OS/Arch:          linux/amd64
    Experimental:     false
    containerd:
    Version:          1.2.13
    GitCommit:        7ad184331fa3e55e52b890ea95e65ba581ae3429
    runc:
    Version:          1.0.0-rc10
    GitCommit:        dc9208a3303feef5b3839f4323d9beb36df0a9dd
    docker-init:
    Version:          0.18.0
    GitCommit:        fec3683
    ```

    ``Client``와 ``Server``정보가 정상적으로 출력되었다면 설치가 완료된 것 입니다.

    Server 정보가 정상적으로 나오지 않고  
    ``Error response from daemon: Bad response from Docker engine`` 메시지가 출력되는 경우는  
    보통 docker daemon이 정상적으로 실행되지 않았거나 sudo를 입력하지 않은 경우입니다.




    * 간단한 컨테이너 구동 테스트  
    어떤 언어를 배우더라도 가장 처음해보는 실습은 HELLO WORLD 메세지 출력일 것이다.  
    이번 포스트에서도 설치 기념으로 ``Hello World`` 컨테이너를 실행해본다.
    
    ```cs
    student@cccr:~$ docker run hello-world
    Unable to find image 'hello-world:latest' locally
    latest: Pulling from library/hello-world
    0e03bdcc26d7: Pull complete 
    Digest: sha256:7f0a9f93b4aa3022c3a4c147a449bf11e0941a1fd0bf4a8e6c9408b2600777c5
    Status: Downloaded newer image for hello-world:latest

    Hello from Docker!
    This message shows that your installation appears to be working correctly.

    To generate this message, Docker took the following steps:
    1. The Docker client contacted the Docker daemon.
    2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
        (amd64)
    3. The Docker daemon created a new container from that image which runs the
        executable that produces the output you are currently reading.
    4. The Docker daemon streamed that output to the Docker client, which sent it
        to your terminal.

    To try something more ambitious, you can run an Ubuntu container with:
    $ docker run -it ubuntu bash

    Share images, automate workflows, and more with a free Docker ID:
    https://hub.docker.com/

    For more examples and ideas, visit:
    https://docs.docker.com/get-started/

    ```


* 주의사항

    도커가 지원되는 kernel 버전은 ``3.10.x`` 이상입니다.  
    ubuntu 14.04 이상을 사용하면 큰 문제가 없고 kernel의 버전이 낮을 경우 제대로 동작을 안하거나 문제가 생길 수 있습니다.  
    가급적 최신버전으로 업데이트 해주세요. ubuntu나 centos가 아닌 경우는 다른 방법이 필요합니다.  
    다른 OS를 기반으로 DOCKER를 설치하기 위해선 아래 메뉴얼을 확인해보세요.  
    https://docs.docker.com/engine/install/

---


```toc
```