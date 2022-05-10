---
emoji: 🤦‍♂️
title: "[DATA] - Zookeeper & Kafka 구성 with WSL2, Docker"
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

## 👍 Zookeeper 설치

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
    ```

<br/>

* 결과를 확인하면, 한개의 Zookeeper는 Leader로 선출되었고, 나머지 2개는 follwer로 설정되어있는 것을 확인 할 수 있다.

    ```js
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

<br/>

---

## 🐱‍🏍 Kafka Configuration

### PS

Zookeeper Cluster의 구성을 완료했다면,  
이번에는 Kafka를 Docker로 구성한 뒤 Zookeeper Cluster와 연동하는 작업을 진행합니다.  
간단하게 Kafka Broker는 Zookeeper와 동일하게 3개로 구성하고 크기를 자유롭게 변경 가능하도록 하려고 합니다.


<br/>



* 위에서 Zookeeper를 다룰 때 DockerFile을 다뤘으니, 이번에도 바로 DockerFile을 구성하겠습니다.

    [1] 우선 작업할 폴더를 생성합니다

    ```js
    $ mkdir kafka-broker
    ```

    <br/>

    [2] 아래와 같은 내용이 담긴 Dockerfile을 생성합니다.
    
    ```js
    FROM ubuntu:20.04
    RUN mkdir -p /root/install
    RUN apt-get update

    WORKDIR /root/install
    ENV DEBIAN_FRONTEND noninteractive
    ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
    RUN apt-get install openjdk-8-jdk -y
    RUN apt-get install wget -y
    RUN apt-get install vim -y

    RUN wget https://downloads.apache.org/kafka/3.1.0/kafka_2.12-3.1.0.tgz
    RUN tar -zxvf kafka_2.12-3.1.0.tgz
    RUN mv kafka_2.12-3.1.0 /usr/local/kafka
    RUN mkdir /data 

    COPY config/init.sh init.sh
    RUN sed -i 's/\r//g' init.sh

    COPY config/server.properties /usr/local/kafka/config/server.properties
    RUN sed -i 's/\r//g' /usr/local/kafka/config/server.properties

    CMD bash init.sh
    ```

    <br/>

    [3] 마찬가지로 config 폴더를 생성합니다.

    ```js
    $ mkdir config
    ```

    <br/>

    [4] config Folder 안에 init.sh 파일을 생성하고 아래와 같이 내용을 추가합니다.
    
    ```js
    #!/bin/bash

    $ sed -i "s/{{broker_id}}/$BROKER_ID/" /usr/local/kafka/config/server.properties

    /usr/local/kafka/bin/kafka-server-start.sh /usr/local/kafka/config/server.properties
    ```

    <br/>

    [5] config Folder 안에 server.properties 파일을 생성하고 아래와 같이 내용을 추가합니다.  
    원래라면 broker_id에 값을 추가해야하지만, 위의 init.sh에서 넣어주기 때문에 괜찮습니다.

    ```js
    num.network.threads=3
    num.io.threads=8
    socket.send.buffer.bytes=102400
    socket.receive.buffer.bytes=102400
    socket.request.max.bytes=104857600
    log.dirs=/data
    num.partitions=1
    num.recovery.threads.per.data.dir=1
    offsets.topic.replication.factor=1
    transaction.state.log.replication.factor=1
    transaction.state.log.min.isr=1
    log.retention.hours=168
    log.segment.bytes=1073741824
    log.retention.bytes=5368709120
    log.retention.check.interval.ms=300000
    zookeeper.connect=nasa1515-zookeeper-1:2181,nasa1515-zookeeper-2:2181,nasa1515-zookeeper-3:2181/default-kafka
    zookeeper.connection.timeout.ms=18000
    group.initial.rebalance.delay.ms=0
    auto.create.topics.enable=true
    broker.id={{broker_id}}
    ```

    <br/>

    [6] docker-compose.yml을 아래와 같은 내용으로 작성합니다.

    ```js
    version: '3.8'
    volumes:
      nasa1515-kafka-1-volume:
        name: nasa1515-kafka-1-volume 
      nasa1515-kafka-2-volume:
        name: nasa1515-kafka-2-volume
      nasa1515-kafka-3-volume:
        name: nasa1515-kafka-3-volume
    networks:
     default:
         name: zoo
    
    services:
      nasa1515-kafka-1:
        container_name: nasa1515-kafka-1
        environment:
          BROKER_ID: 1
        hostname: nasa1515-kafka-1
        image: nasa1515-kafka
        restart: always
        volumes:
          - nasa1515-kafka-1-volume:/data

      nasa1515-kafka-2:
        container_name: nasa1515-kafka-2
        environment:
          BROKER_ID: 2
        hostname: nasa1515-kafka-2
        image: nasa1515-kafka
        restart: always
        volumes:
          - nasa1515-kafka-2-volume:/data

      nasa1515-kafka-3:
        container_name: nasa1515-kafka-3
        environment:
          BROKER_ID: 3
        hostname: nasa1515-kafka-3
        image: nasa1515-kafka
        restart: always
        volumes:
          - nasa1515-kafka-3-volume:/data
    ```

    <br/>

    [7] 여기까지 완료했다면 아래와 같은 형태로 구성이 되어야 합니다.

    ```js
    root@L-wslee:/home/nasa1515/docker/kafka-broker# ls -alrt *
    -rwxrwxrwx 1 root root  639 May 10 11:11 Dockerfile
    -rwxrwxrwx 1 root root  919 May 10 11:14 docker-compose.yml

    config:
    total 16
    -rw-r--r-- 1 root root  178 May 10 11:12 init.sh
    -rw-r--r-- 1 root root  681 May 10 11:13 server.properties
    drwxrwxrwx 2 root root 4096 May 10 11:13 .
    drwxr-xr-x 3 root root 4096 May 10 11:14 ..
    ```

    <br/>

    [8] 자 이제 Dockerfile을 Build 합니다.

    ```js
    $ docker build --tag nasa1515-kafka .
    ...
    ...
    ...
    Step 17/18 : RUN sed -i 's/\r//g' /usr/local/kafka/config/server.properties
     ---> Running in c653a7573fc3
    Removing intermediate container c653a7573fc3
     ---> 598ea0a00be3
    Step 18/18 : CMD bash init.sh
     ---> Running in f8a3710be663
    Removing intermediate container f8a3710be663
     ---> 5581d8201d8b
    Successfully built 5581d8201d8b
    Successfully tagged nasa1515-kafka:latest
    ```
    
    <br/>

    [9] Image가 정상적으로 Build 된 것을 확인합니다.

    ```js
    root@L-wslee:/home/nasa1515/docker/kafka-broker# docker image ls
    REPOSITORY           TAG       IMAGE ID       CREATED              SIZE
    nasa1515-kafka       latest    5581d8201d8b   About a minute ago   920MB
    nasa1515-zookeeper   latest    e71e36444916   19 hours ago         737MB
    ubuntu               20.04     53df61775e88   10 days ago          72.8MB
    hello-world          latest    feb5d9fea6a5   7 months ago         13.3kB
    ```

    <br/>

    [10] Compose.yml 파일로 Container를 동작시킵니다.

    ```js
    $ docker-compose up -d;
    ...
    ...
    root@L-wslee:/home/nasa1515/docker/kafka-broker# docker-compose up -d;
    [+] Running 7/7
     ⠿ Network zoo                       Created                                                                                                                                               0.0s
     ⠿ Volume "nasa1515-kafka-1-volume"  Created                                                                                                                                               0.0s
     ⠿ Volume "nasa1515-kafka-2-volume"  Created                                                                                                                                               0.0s
     ⠿ Volume "nasa1515-kafka-3-volume"  Created                                                                                                                                               0.0s
     ⠿ Container nasa1515-kafka-1        Started                                                                                                                                               1.1s
     ⠿ Container nasa1515-kafka-3        Started                                                                                                                                               1.1s
     ⠿ Container nasa1515-kafka-2        Started                                                                                                                                               1.2s
    ```

    <br/>

    [11] Kafka Container가 잘 실행되었는지 확인합니다.

    ```js
    $ docker ps
    ...
    ...
    root@L-wslee:/home/nasa1515/docker/kafka-broker#  docker ps
    CONTAINER ID   IMAGE            COMMAND                  CREATED              STATUS          PORTS     NAMES
    5aed89a22bec   nasa1515-kafka   "/bin/sh -c 'bash in…"   About a minute ago   Up 19 seconds             nasa1515-kafka-1
    2bea2dcd9062   nasa1515-kafka   "/bin/sh -c 'bash in…"   About a minute ago   Up 18 seconds             nasa1515-kafka-3
    8ff56e284749   nasa1515-kafka   "/bin/sh -c 'bash in…"   About a minute ago   Up 18 seconds             nasa1515-kafka-2
    ```

    <br/>

    [12] 실제 Container의 Kafka도 정상적으로 동작하는지 로그를 확인해봅시다.

    ```js
    $ docker logs nasa1515-kafka-1
    ...
    ...
    ...
    # BrokerToControllerChannelManager broker=3 브로커 3개가 정상적으로 연결되었습니다!

    [2022-05-10 02:26:33,654] INFO [KafkaServer id=3] started (kafka.server.KafkaServer)
    [2022-05-10 02:26:33,928] INFO [BrokerToControllerChannelManager broker=3 name=alterIsr]: Recorded new controller, from now on will use broker nasa1515-kafka-3:9092 (id: 3 rack: null) (kafka.server.BrokerToControllerRequestThread)
    [2022-05-10 02:26:33,930] INFO [BrokerToControllerChannelManager broker=3 name=forwarding]: Recorded new controller, from now on will use broker nasa1515-kafka-3:9092 (id: 3 rack: null) (kafka.server.BrokerToControllerRequestThread)
    ```



<br/>

---

## 🎉 Kafka Client 설정 With Confluent

위에 내용에서 구축했던 Kafka Cluster는 Docker Container에서 각자 다른 host를 가지고 있습니다.  
때문에 Producer가 Kafka Broker 쪽으로 요청을 보낼 때 구성한 3개의 Host 중 어느 Host로 보내야 할 지 모르게 됩니다.  
또한 운영적으로 보았을 때, Producer에서 하나의 Broker로 메세지를 보낸다면, 해당 Broker가 알 수 없는 문제로 종료되게 된다면, 이슈가 발생한다.  
그래서 일반적인 WEB/WAS의 LoadBalancer 역할을 하는 하나의 End-Point 가 필요합니다.  
지금부터 진행 할 내용은, End-Point에 요청을 보내, 여러 대의 Broker로 구성된 Cluster에서 고가용성을 확보하는 방법입니다.  


<br/>

Confluent Kafka REST 설치  

* 동일하게 Docker로 진행합니다.  



    [1] 작업 할 폴더를 동일하게 생성합니다.

    ```js
    $ mkdir confluent
    ```

    <br/>

    [2] 아래 내용을 담은 Dockerfile을 생성합니다.

    ```js
    FROM ubuntu:20.04
    RUN mkdir -p /root/install
    RUN apt-get update
    
    WORKDIR /root/install

    ENV DEBIAN_FRONTEND noninteractive
    ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64

    RUN apt-get install openjdk-8-jdk -y
    RUN apt-get install wget -y
    RUN apt-get install vim -y

    # confluent-community 설치
    RUN wget http://packages.confluent.io/archive/7.1/confluent-community-7.1.1.tar.gz
    RUN tar -zxvf confluent-community-7.1.1.tar.gz
    RUN mv confluent-7.1.1 /usr/local/confluent

    # kafka-rest 설정파일 복사
    COPY config/kafka-rest.properties /usr/local/confluent/etc/kafka-rest/kafka-rest.properties
    RUN sed -i 's/\r//g' /usr/local/confluent/etc/kafka-rest/kafka-rest.properties
    
    # kakfa-rest 실행
    CMD /usr/local/confluent/bin/kafka-rest-start /usr/local/confluent/etc/kafka-rest/kafka-rest.properties
    ```

    <br/>

    [3] config 폴더를 생성합니다.

    ```js
    $ mkdir config
    ```

    <br/>

    [4] config 폴더에 아래 내용을 넣은 kafka-rest.properties 생성합니다. 

    ```js
    # kakfa ID
    id=default

    # schema.registry.url=http://localhost:8081 
    zookeeper.connect=nasa1515-zookeeper-1:2181,nasa1515-zookeeper-2:2181,nasa1515-zookeeper-3:2181 
    bootstrap.servers=PLAINTEXT://nasa1515-kafka-1:9092,PLAINTEXT://nasa1515-kafka-2:9092,PLAINTEXT://nasa1515-kafka-3:9092
    ```

    <br/>

    [5] 이제 아래 내용을 담은 docker-compose.yml 파일을 생성합니다.

    ```js
    version: '3.8'
    networks:
      default:
        name: zoo
    
    services:
      pipeline-confluent-kafka-rest:
        container_name: pipeline-confluent-kafka-rest
        hostname: pipeline-confluent-kafka-rest
        image: pipeline-confluent-kafka-rest
        restart: always
        ports:
          - 8082:8082
    ```

    <br/>

    [6] 여기까지 완료되었으면 아래와 같은 형식의 파일이 존재해야 합니다.

    ```js
    root@L-wslee:/home/nasa1515/docker/Confluent# ls -alrt *
    -rwxrwxrwx 1 root root  798 May 10 13:44 Dockerfile
    -rwxrwxrwx 1 root root  258 May 10 13:45 docker-compose.yml

    config:
    total 12
    -rw-r--r-- 1 root root  285 May 10 13:44 kafka-rest.properties
    drwxrwxrwx 2 root root 4096 May 10 13:44 .
    drwxr-xr-x 3 root root 4096 May 10 13:44 ..
    ```
    
    <br/>

    [7] Docker Image를 Build 합니다.

    ```js
    $ docker build --tag nasa1515-confluent-kafka .
    ...
    ...
    Step 15/15 : CMD /usr/local/confluent/bin/kafka-rest-start /usr/local/confluent/etc/kafka-rest/kafka-rest.properties
     ---> Running in 65ca3e623728
    Removing intermediate container 65ca3e623728
     ---> 661f80b47926
    Successfully built 661f80b47926
    Successfully tagged nasa1515-confluent-kafka:latest
    ```

    <br/>

    [8] 이미지를 확인해봅시다.

    ```js
    root@L-wslee:/home/nasa1515/docker/Confluent# docker image ls
    REPOSITORY                 TAG       IMAGE ID       CREATED          SIZE
    nasa1515-confluent-kafka   latest    661f80b47926   22 seconds ago   1.99GB
    nasa1515-zookeeper         latest    b2b8ec726801   2 hours ago      737MB
    nasa1515-kafka             latest    5581d8201d8b   3 hours ago      920MBz
    ubuntu                     20.04     53df61775e88   10 days ago      72.8MB
    hello-world                latest    feb5d9fea6a5   7 months ago     13.3kB
    ```

    <br/>

    [9] Docker-compose로 Container를 동작합니다.

    ```js
    $ docker-compose up -d
    ...
    ...
    [+] Running 1/1
    ⠿ Container nasa1515-confluent-kafka  Started                                                                                                                                             0.6s
    ```

    <br/>

    [10] 정상적으로 실행되고 있는지 확인합니다.

    ```js
    $ docker ps
    ...
    ...
    root@L-wslee:/home/nasa1515/docker/Confluent# docker ps
    CONTAINER ID   IMAGE                      COMMAND                  CREATED          STATUS          PORTS                                       NAMES
    d1f069f93aca   nasa1515-confluent-kafka   "/bin/sh -c '/usr/lo…"   34 seconds ago   Up 33 seconds   0.0.0.0:8082->8082/tcp, :::8082->8082/tcp   nasa1515-confluent-kafka
    685b2f6adc7f   nasa1515-kafka             "/bin/sh -c 'bash in…"   2 hours ago      Up 2 hours                                                  nasa1515-kafka-3
    86ee421b76a8   nasa1515-kafka             "/bin/sh -c 'bash in…"   2 hours ago      Up 2 hours                                                  nasa1515-kafka-1
    10c8c2384fed   nasa1515-kafka             "/bin/sh -c 'bash in…"   2 hours ago      Up 2 hours                                                  nasa1515-kafka-2
    d3fe193618f7   nasa1515-zookeeper         "/bin/sh -c 'bash in…"   2 hours ago      Up 2 hours                                                  nasa1515-zookeeper-1
    021037ca8443   nasa1515-zookeeper         "/bin/sh -c 'bash in…"   2 hours ago      Up 2 hours                                                  nasa1515-zookeeper-3
    6f9cd8cdd917   nasa1515-zookeeper         "/bin/sh -c 'bash in…"   2 hours ago      Up 2 hours                                                  nasa1515-zookeeper-2
    ```

    <br/>

    [11] 이제 Kafka Broker 쪽에 Topic을 생성하겠습니다.
    저는 Python을 사용하서 요청을 보내겠습니다.  

    ```js
    import requests import json 
    
    headers = { 'Content-Type': 'application/vnd.kafka.json.v2+json', } 
    
    data = '{"records":[{"value":{"id":"probiotics"}}]}' 
    response = requests.post('http://localhost:8082/topics/nasa1515', headers=headers, data=data) 
    print(response)
    print(json.dumps(response.json(), indent=4))
    ```

    <br/>

    토픽 생성 결과

    ```js
    <Response [200]>
    {
        "offsets": [
            {
                "partition": 0,
                "offset": 0,
                "error_code": null,
                "error": null
            }
        ],
        "key_schema_id": null,
        "value_schema_id": null
    }
    ```

    <br/>

    파이썬 get request로 Topic 정보 확인하기

    ```js
    import requests 
    import json 

    response = requests.get('http://localhost:8082/topics/nasa1515/   ') 

    print(response) 
    print(json.dumps(response.json(), indent=4))
    ```

    <br/>

    결과

    ```js
    <Response [200]>
    {
        "name": "nasa1515",
        "configs": {
            "compression.type": "producer",
            "leader.replication.throttled.replicas": "",
            "message.downconversion.enable": "true",
            "min.insync.replicas": "1",
            "segment.jitter.ms": "0",
            "cleanup.policy": "delete",
            "flush.ms": "9223372036854775807",
            "follower.replication.throttled.replicas": "",
            "segment.bytes": "1073741824",
            "retention.ms": "604800000",
            "flush.messages": "9223372036854775807",
            "message.format.version": "3.0-IV1",
            "file.delete.delay.ms": "60000",
            "max.compaction.lag.ms": "9223372036854775807",
            "max.message.bytes": "1048588",
            "min.compaction.lag.ms": "0",
            "message.timestamp.type": "CreateTime",
            "preallocate": "false",
            "min.cleanable.dirty.ratio": "0.5",
            "index.interval.bytes": "4096",
            "unclean.leader.election.enable": "false",
            "retention.bytes": "5368709120",
            "delete.retention.ms": "86400000",
            "segment.ms": "604800000",
            "message.timestamp.difference.max.ms": "9223372036854775807",
            "segment.index.bytes": "10485760"
        },
        "partitions": [
            {
                "partition": 0,
                "leader": 3,
                "replicas": [
                    {
                        "broker": 3,
                        "leader": true,
                        "in_sync": true
                    }
                ]
            }
        ]
    }
    ```


    
<br/>

<br/>

<br/>

<br/>

<br/>

<br/>

<br/>

<br/>

<br/>



## 마치며…  


<br/>

---

```toc
```