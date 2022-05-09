---
emoji: 🤦‍♂️
title: "[DATA] - WSL2 Ubuntu에 Kafka Broker 구성하기"
date: "2022-05-09 00:39:25"
author: nasa1515
tags: DATA CLOUD
categories: DATA CLOUD
---



머리말  

이번 포스트에서는 Local WSL2 Ubuntu에 Kafka Brocker를 구성한 뒤 무작위 데이터를 생성하여 각 Cloud의 Steraming Tools  
(aws : kinesis, gcp : pub/sub, azure : eventhub)에서 Consume하는 과정을 정리해보았습니다.   
아무래도 금액적인 부분의 이슈가 발생하기에 최대한 egress Traffic이 발생되지 않게 Local에서 진행하게되었습니다.   

--- 

## ✔ Docker, Docker-compose 설치

Docker와 Docker-compose의 경우 아래의 공식문서를 확인하시면 자세한 설치 방법을 확인할 수 있습니다.  
[Docker 설치](https://docs.docker.com/engine/install/ubuntu/)  
[Docker-Compose 설치](https://docs.docker.com/compose/install/)
<br/>

 

* Docker 설치부터 진행합니다, 우선적으로 WSL 남겨져있는 잔재를 지워줍니다. 

    ```js
    삭제
    $ sudo apt-get remove docker docker-engine docker.io containerd runc
    
    ```
<br/>


* 이 후 Pakage index를 Update 한 뒤 관련 패키지를 설치합니다.

    ```js
    $ sudo apt-get update
    
    $ sudo apt-get install \
      ca-certificates \
      curl \
      gnupg \
      lsb-release


<br/>

* 설치가 완료되었으면, Docker의 공식 GPG Key를 추가합니다.

    ```js
    $  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    ```

<br/>

* 아래 명령어를 사용하여 Pakage Repo를 추가해줍니다.

    ```js
    $ echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```


<br/>

* Docker Engine을 설치합니다. 

    ```js
    $ sudo apt-get update
    $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ```


<br/>

* 현재 Repo에서 사용 가능한 버전을 확인합니다.

    ```js
    $ apt-cache madison docker-ce
    docker-ce | 5:20.10.15~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
    docker-ce | 5:20.10.14~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
    docker-ce | 5:20.10.13~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
    docker-ce | 5:20.10.12~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
    docker-ce | 5:20.10.11~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
    docker-ce | 5:20.10.10~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
    ```

<br/>

* Version을 확인했다면 아래 명령어에 설치하고 싶은 Version을 넣어서 UPDATE 해줍니다.

    ```js
    $ sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io docker-compose-plugin
    ```

<br/>


* 시험삼아 Hello-world Pod를 띄워보려 했지만 아래와 같은 error Message에 직면했습니다. 

    ```js
    $ root@L-wslee:~# docker run hello-world
      docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?.
      See 'docker run --help'.
    
    $ root@L-wslee:~# 
      root@L-wslee:~# systemctl start docker
      System has not been booted with systemd as init system (PID 1). Can't operate.
      Failed to connect to bus: Host is down
    ```

<br/>


* 확인해보니 WSL에서는 기존 Linux의 INIT과는 다르게 따로 설정을 진행해야 합니다.

    ```js
    $ sudo apt-get install cgroupfs-mount
    $ sudo cgroupfs-mount
    $ sudo service docker start
    ```

<br/>

* 이제 정상적으로 Hello World Pod가 실행됨을 확인했습니다.

    ```js
    $ root@L-wslee:~# docker run hello-world
      Unable to find image 'hello-world:latest' locally


      latest: Pulling from library/hello-world
      2db29710123e: Pull complete 
      Digest: sha256:10d7d58d5ebd2a652f4d93fdd86da8f265f5318c6a73cc5b6a9798ff6d2b2e67
      Status: Downloaded newer image for hello-world:latest

      Hello from Docker!
    ```
<br/>

* 추가적으로 Compose도 설치합니다.

    ```js
    $ curl -SL https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
    $ sudo chmod +x /usr/local/bin/docker-compose
    $ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

    # Version 확인
    $ docker-compose --version

    root@L-wslee:/home/nasa1515/docker# docker-compose --version
    Docker Compose version v2.5.0
    ```

<br/>

---

## 👍 Kafka 설치

### PS

Kafka는 Broker에서 Topic의 Metadata를 저장하기 위해 Zookeeper를 사용합니다.  
일반적으로 Zookeeper를 Standalone으로 구성할 수도 있지만, 일반적인 Hadoop과 동일하게 실제 운영에서는 잘 찾아보기 힘듭니다.   
때문에 Zookeeper를 Cluster로 구성하고, HA를 확보한 것을 Zookeeper Ensemble 이라고 합니다.

저도 하나의 OS (WSL)에서 3개의 Pod를 띄워 Ensemble 형태로 구성합니다.


<br/>

1. Docker File 작업을 진행할 폴더를 하나 생성합니다. 

    ```js
    $ mkdir docker
    ```

<br/>

2. 아래와 같은 내용으로 DockerFile을 작성합니다.

    ```js
    FROM ubuntu:20.04
    RUN mkdir -p /root/install 
    RUN apt-get update 
    
    WORKDIR /root/install 
    
    # java 설치 
    ENV DEBIAN_FRONTEND noninteractive 
    ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 
    RUN apt-get install openjdk-8-jdk -y 
    RUN apt-get install wget -y 
    RUN apt-get install vim -y 
    
    # zookeeper 설치 
    
    RUN wget downloads.apache.org/zookeeper/zookeeper-3.7.0/apache-zookeeper-3.7.0-bin.tar.gz 
    RUN tar -zxvf apache-zookeeper-3.7.0-bin.tar.gz 
    RUN mv apache-zookeeper-3.7.0-bin /usr/local/zookeeper 
    
    # 설정파일 및 초기화 파일 복사
    
    COPY config/zoo.cfg /usr/local/zookeeper/conf/zoo.cfg 
    COPY config/init.sh init.sh 
    
    # windows에서 작업 시 CRLF와 LF 처리 방식 문제 방지 
    RUN sed -i 's/\r//g' init.sh 
    RUN sed -i 's/\r//g' /usr/local/zookeeper/conf/zoo.cfg 
    
    CMD bash init.sh
    ```

<br/>

3. Docker File에서 명시한 config Folder를 생성합니다.

    ```js
    $ mkdir config
    ```

<br/>

4. config Folder에 아래 내용의 init.sh File을 생성합니다.  

    ```js
    mkdir -p /data 

    # 주키퍼는 myid 파일로 클러스터를 구분한다. 1~255까지 번호를 지정할 수 있다. 
    echo $MY_ID > /data/myid 

    # 주키퍼 서버를 실행한다. 
    /usr/local/zookeeper/bin/zkServer.sh start 

    # 자동으로 종료되지 않도록 방지한다. 
    tail -f /dev/null
    ```

<br/>

5. config Folder에 아래 내용의 zoo.cfg 파일을 생성합니다.

    ```js
    # 팔로워가 리더에 접속할 수 있는 시간 
    # initLimit * tickTime = 40초 로 설정된다. 
    initLimit=10 
    tickTime=2000 
    
    # 리더가 될 수 있는 팔로워의 최대 갯수를 나타낸다. 
    syncLimit=5 

    # myid가 저장될 디렉토리 위치이다. 
    dataDir=/data 

    # 클라이언트가 접속할 포트 번호이다. 
    clientPort=2181 

    # 앙상블을 이루는 서버 정보이다. 
    # server.X=hostname:peerPort:leaderPort
    # peerPort는 앙상블 서버들이 상호 통신하는 데 사용되는 포트 번호이다. 
    # leaderPort는 리더를 선출하는 데 사용되는 포트 번호이다. 

    # -- 3888뒤에 공백 조심!
    server.1=nasa1515-zookeeper-1:2888:3888
    server.2=nasa1515-zookeeper-2:2888:3888
    server.3=nasa1515-zookeeper-3:2888:3888

    # 자동으로 생성되는 스냅샷을 24시간마다 최대 3개를 유지하고 나머지는 제거한다. 
    autopurge.snapRetainCount=3 
    autopurge.purgeInterval=24
    ```

<br/>

6. Zookeeper Pod가 원활하게 통신할 수 있도록 Docker Network를 생성합니다.

    ```js
    $ docker network create zoo
    ebf8d2ee0ebbac5acce268f5935e5bd80b29ef2b3f29931054b347f8d7c27e8a

    root@L-wslee:/home/nasa1515/docker# docker network list
    NETWORK ID     NAME      DRIVER    SCOPE
    f10c3aaa8146   bridge    bridge    local
    c5b41392b3bd   host      host      local
    36f1ffafa37e   none      null      local
    ebf8d2ee0ebb   zoo       bridge    local
    ```

<br/>

7. 위 과정을 모두 완료하였으면 최종적으로는 아래와 같이 구성되어야 합니다.

    ```js
    root@L-wslee:/home/nasa1515/docker# ls -alrt *
    -rwxrwxrwx 1 root root  836 May  9 14:24 Dockerfile

    config:
    total 16
    -rw-r--r-- 1 root root  315 May  9 14:20 init.sh
    -rwxrwxrwx 1 root root  913 May  9 14:21 zoo.cfg
    drwxr-xr-x 3 root root 4096 May  9 14:30 ..
    drwxr-xr-x 2 root root 4096 May  9 14:30 .
    ```
<br/>

8. 구성이 위와 같다면DockerFile을 생성한 경로에서 이미지를 Build합니다. 

    ```
    $ docker build --tag nasa1515-zookeeper .
    ...
    ...
    ...
    Removing intermediate container bb88073c3b9a
    ---> 6e4b73214693
    Step 16/17 : RUN sed -i 's/\r//g' /usr/local/zookeeper/conf/zoo.cfg
     ---> Running in e19594c509af
    Removing intermediate container e19594c509af
     ---> 57ab1963d806
    Step 17/17 : CMD bash init.sh
     ---> Running in 46a08706b3a4
    Removing intermediate container 46a08706b3a4
     ---> ade37e220c72
    Successfully built ade37e220c72
    Successfully tagged nasa1515-zookeeper:latest
    ```

<br/>

9. 이미지를 확인해봅니다.

    ```
    $ docker image ls
    REPOSITORY           TAG       IMAGE ID       CREATED          SIZE
    nasa1515-zookeeper   latest    ade37e220c72   42 seconds ago   733MB
    ubuntu               20.04     53df61775e88   9 days ago       72.8MB
    hello-world          latest    feb5d9fea6a5   7 months ago     13.3kB
    ```
    

<br/>

10. 이제 Docker Compose File을 생성합니다. (docker-compose.yml)

    ```js
    version: '3.8'
    volumes: 
      nasa1515-zookeeper-1-volume:
        name: nasa1515-zookeeper-1-volume 
      nasa1515-zookeeper-2-volume: 
        name: nasa1515-zookeeper-2-volume 
      nasa1515-zookeeper-3-volume: 
        name: nasa1515-zookeeper-3-volume 
          
    services: 
      nasa1515-zookeeper-1: 
        image: nasa1515-zookeeper 
        container_name: nasa1515-zookeeper-1 
        restart: always 
        hostname: nasa1515-zookeeper-1
        environment: 
          MY_ID: 1 
        volumes: 
          - nasa1515-zookeeper-1-volume:/data 
        
      nasa1515-zookeeper-2: 
        image: nasa1515-zookeeper 
        container_name: nasa1515-zookeeper-2
        restart: always 
        hostname: nasa1515-zookeeper-2
        environment: 
          MY_ID: 2 
        volumes: 
          - nasa1515-zookeeper-2-volume:/data 
        
      nasa1515-zookeeper-3: 
        image: nasa1515-zookeeper 
        container_name: nasa1515-zookeeper-3
        restart: always 
        hostname: nasa1515-zookeeper-3
        environment: 
          MY_ID: 3 
        volumes: 
          - nasa1515-zookeeper-3-volume:/data 
      
    networks: 
      default: 
        name: zoo
    ```


<br/>


11. 생성한 compose로 Container를 실행합니다.

    ```js
    $ docker-compose up -d; 

    root@L-wslee:/home/nasa1515/docker# docker-compose up -d;
    [+] Running 4/4
     ⠿ Network zoo                     Created                                                                                                                                                                0.0s
     ⠿ Container nasa1515-zookeeper-3  Started                                                                                                                                                                0.6s
    ⠿ Container nasa1515-zookeeper-1  Started                                                                                                                                                                0.8s
    ⠿ Container nasa1515-zookeeper-2  Started           
    ```

<br/>


* 정상적으로 구동이되었다면 아래 명령어로 확인합니다.

    ```js
    $ docker exec nasa1515-zookeeper-1 /usr/local/zookeeper/bin/zkServer.sh status
    $ docker exec nasa1515-zookeeper-2 /usr/local/zookeeper/bin/zkServer.sh status
    $ docker exec nasa1515-zookeeper-3 /usr/local/zookeeper/bin/zkServer.sh status

    # 확인해보면 한개의 Zookeeper는 Leader로 선출되었고, 나머지 2개는 follwer로 설정되어있는 것을 확인 할 수 있다.

    root@L-wslee:/home/nasa1515/docker# docker exec nasa1515-zookeeper-1 /usr/local/zookeeper/bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /usr/local/zookeeper/bin/../conf/zoo.cfg
    Client port found: 2181. Client address: localhost. Client SSL: false.
    Mode: follower
    root@L-wslee:/home/nasa1515/docker# docker exec nasa1515-zookeeper-2 /usr/local/zookeeper/bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /usr/local/zookeeper/bin/../conf/zoo.cfg
    Client port found: 2181. Client address: localhost. Client SSL: false.
    Mode: follower
    root@L-wslee:/home/nasa1515/docker# docker exec nasa1515-zookeeper-3 /usr/local/zookeeper/bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /usr/local/zookeeper/bin/../conf/zoo.cfg
    Client port found: 2181. Client address: localhost. Client SSL: false.
    Mode: leader
    ```

## 1일차 끝


<br/>


## 마치며…  

  
이번 포스트는 그나마 수월하게 성공했습니다.  .  


<br/>

---

```toc
```