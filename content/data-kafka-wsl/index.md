---
emoji: ๐คฆโโ๏ธ
title: "[DATA] - Zookeeper & Kafka ๊ตฌ์ฑ with WSL2, Docker"
date: "2022-05-09 00:39:25"
author: nasa1515
tags: DATA CLOUD
categories: DATA CLOUD
---



๋จธ๋ฆฌ๋ง  

์ด๋ฒ ํฌ์คํธ์์๋ Local WSL2 Ubuntu์ Kafka Brocker๋ฅผ ๊ตฌ์ฑํ ๋ค ๋ฌด์์ ๋ฐ์ดํฐ๋ฅผ ์์ฑํ์ฌ ๊ฐ Cloud์ Steraming Tools  
(aws : kinesis, gcp : pub/sub, azure : eventhub)์์ Consumeํ๋ ๊ณผ์ ์ ์ ๋ฆฌํด๋ณด์์ต๋๋ค.   
์๋ฌด๋๋ ๊ธ์ก์ ์ธ ๋ถ๋ถ์ ์ด์๊ฐ ๋ฐ์ํ๊ธฐ์ ์ต๋ํ egress Traffic์ด ๋ฐ์๋์ง ์๊ฒ Local์์ ์งํํ๊ฒ๋์์ต๋๋ค.   

--- 

## โ Docker, Docker-compose ์ค์น

Docker์ Docker-compose์ ๊ฒฝ์ฐ ์๋์ ๊ณต์๋ฌธ์๋ฅผ ํ์ธํ์๋ฉด ์์ธํ ์ค์น ๋ฐฉ๋ฒ์ ํ์ธํ  ์ ์์ต๋๋ค.  
[Docker ์ค์น](https://docs.docker.com/engine/install/ubuntu/)  
[Docker-Compose ์ค์น](https://docs.docker.com/compose/install/)
<br/>

 

* Docker ์ค์น๋ถํฐ ์งํํฉ๋๋ค, ์ฐ์ ์ ์ผ๋ก WSL ๋จ๊ฒจ์ ธ์๋ ์์ฌ๋ฅผ ์ง์์ค๋๋ค. 

    ```js
    ์ญ์ 
    $ sudo apt-get remove docker docker-engine docker.io containerd runc
    
    ```
<br/>


* ์ด ํ Pakage index๋ฅผ Update ํ ๋ค ๊ด๋ จ ํจํค์ง๋ฅผ ์ค์นํฉ๋๋ค.

    ```js
    $ sudo apt-get update
    
    $ sudo apt-get install \
      ca-certificates \
      curl \
      gnupg \
      lsb-release


<br/>

* ์ค์น๊ฐ ์๋ฃ๋์์ผ๋ฉด, Docker์ ๊ณต์ GPG Key๋ฅผ ์ถ๊ฐํฉ๋๋ค.

    ```js
    $  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    ```

<br/>

* ์๋ ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํ์ฌ Pakage Repo๋ฅผ ์ถ๊ฐํด์ค๋๋ค.

    ```js
    $ echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```


<br/>

* Docker Engine์ ์ค์นํฉ๋๋ค. 

    ```js
    $ sudo apt-get update
    $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ```


<br/>

* ํ์ฌ Repo์์ ์ฌ์ฉ ๊ฐ๋ฅํ ๋ฒ์ ์ ํ์ธํฉ๋๋ค.

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

* Version์ ํ์ธํ๋ค๋ฉด ์๋ ๋ช๋ น์ด์ ์ค์นํ๊ณ  ์ถ์ Version์ ๋ฃ์ด์ UPDATE ํด์ค๋๋ค.

    ```js
    $ sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io docker-compose-plugin
    ```

<br/>


* ์ํ์ผ์ Hello-world Pod๋ฅผ ๋์๋ณด๋ ค ํ์ง๋ง ์๋์ ๊ฐ์ error Message์ ์ง๋ฉดํ์ต๋๋ค. 

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


* ํ์ธํด๋ณด๋ WSL์์๋ ๊ธฐ์กด Linux์ INIT๊ณผ๋ ๋ค๋ฅด๊ฒ ๋ฐ๋ก ์ค์ ์ ์งํํด์ผ ํฉ๋๋ค.

    ```js
    $ sudo apt-get install cgroupfs-mount
    $ sudo cgroupfs-mount
    $ sudo service docker start
    ```

<br/>

* ์ด์  ์ ์์ ์ผ๋ก Hello World Pod๊ฐ ์คํ๋จ์ ํ์ธํ์ต๋๋ค.

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

* ์ถ๊ฐ์ ์ผ๋ก Compose๋ ์ค์นํฉ๋๋ค.

    ```js
    $ curl -SL https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
    $ sudo chmod +x /usr/local/bin/docker-compose
    $ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

    # Version ํ์ธ
    $ docker-compose --version

    root@L-wslee:/home/nasa1515/docker# docker-compose --version
    Docker Compose version v2.5.0
    ```

<br/>

---

## ๐ Zookeeper ์ค์น

### PS

Kafka๋ Broker์์ Topic์ Metadata๋ฅผ ์ ์ฅํ๊ธฐ ์ํด Zookeeper๋ฅผ ์ฌ์ฉํฉ๋๋ค.  
์ผ๋ฐ์ ์ผ๋ก Zookeeper๋ฅผ Standalone์ผ๋ก ๊ตฌ์ฑํ  ์๋ ์์ง๋ง, ์ผ๋ฐ์ ์ธ Hadoop๊ณผ ๋์ผํ๊ฒ ์ค์  ์ด์์์๋ ์ ์ฐพ์๋ณด๊ธฐ ํ๋ญ๋๋ค.   
๋๋ฌธ์ Zookeeper๋ฅผ Cluster๋ก ๊ตฌ์ฑํ๊ณ , HA๋ฅผ ํ๋ณดํ ๊ฒ์ Zookeeper Ensemble ์ด๋ผ๊ณ  ํฉ๋๋ค.

์ ๋ ํ๋์ OS (WSL)์์ 3๊ฐ์ Pod๋ฅผ ๋์ Ensemble ํํ๋ก ๊ตฌ์ฑํฉ๋๋ค.


<br/>

1. Docker File ์์์ ์งํํ  ํด๋๋ฅผ ํ๋ ์์ฑํฉ๋๋ค. 

    ```js
    $ mkdir docker
    ```

<br/>

2. ์๋์ ๊ฐ์ ๋ด์ฉ์ผ๋ก DockerFile์ ์์ฑํฉ๋๋ค.

    ```js
    FROM ubuntu:20.04
    RUN mkdir -p /root/install 
    RUN apt-get update 
    
    WORKDIR /root/install 
    
    # java ์ค์น 
    ENV DEBIAN_FRONTEND noninteractive 
    ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 
    RUN apt-get install openjdk-8-jdk -y 
    RUN apt-get install wget -y 
    RUN apt-get install vim -y 
    
    # zookeeper ์ค์น 
    
    RUN wget downloads.apache.org/zookeeper/zookeeper-3.7.0/apache-zookeeper-3.7.0-bin.tar.gz 
    RUN tar -zxvf apache-zookeeper-3.7.0-bin.tar.gz 
    RUN mv apache-zookeeper-3.7.0-bin /usr/local/zookeeper 
    
    # ์ค์ ํ์ผ ๋ฐ ์ด๊ธฐํ ํ์ผ ๋ณต์ฌ
    
    COPY config/zoo.cfg /usr/local/zookeeper/conf/zoo.cfg 
    COPY config/init.sh init.sh 
    
    # windows์์ ์์ ์ CRLF์ LF ์ฒ๋ฆฌ ๋ฐฉ์ ๋ฌธ์  ๋ฐฉ์ง 
    RUN sed -i 's/\r//g' init.sh 
    RUN sed -i 's/\r//g' /usr/local/zookeeper/conf/zoo.cfg 
    
    CMD bash init.sh
    ```

<br/>

3. Docker File์์ ๋ช์ํ config Folder๋ฅผ ์์ฑํฉ๋๋ค.

    ```js
    $ mkdir config
    ```

<br/>

4. config Folder์ ์๋ ๋ด์ฉ์ init.sh File์ ์์ฑํฉ๋๋ค.  

    ```js
    mkdir -p /data 

    # ์ฃผํคํผ๋ myid ํ์ผ๋ก ํด๋ฌ์คํฐ๋ฅผ ๊ตฌ๋ถํ๋ค. 1~255๊น์ง ๋ฒํธ๋ฅผ ์ง์ ํ  ์ ์๋ค. 
    echo $MY_ID > /data/myid 

    # ์ฃผํคํผ ์๋ฒ๋ฅผ ์คํํ๋ค. 
    /usr/local/zookeeper/bin/zkServer.sh start 

    # ์๋์ผ๋ก ์ข๋ฃ๋์ง ์๋๋ก ๋ฐฉ์งํ๋ค. 
    tail -f /dev/null
    ```

<br/>

5. config Folder์ ์๋ ๋ด์ฉ์ zoo.cfg ํ์ผ์ ์์ฑํฉ๋๋ค.

    ```js
    # ํ๋ก์๊ฐ ๋ฆฌ๋์ ์ ์ํ  ์ ์๋ ์๊ฐ 
    # initLimit * tickTime = 40์ด ๋ก ์ค์ ๋๋ค. 
    initLimit=10 
    tickTime=2000 
    
    # ๋ฆฌ๋๊ฐ ๋  ์ ์๋ ํ๋ก์์ ์ต๋ ๊ฐฏ์๋ฅผ ๋ํ๋ธ๋ค. 
    syncLimit=5 

    # myid๊ฐ ์ ์ฅ๋  ๋๋ ํ ๋ฆฌ ์์น์ด๋ค. 
    dataDir=/data 

    # ํด๋ผ์ด์ธํธ๊ฐ ์ ์ํ  ํฌํธ ๋ฒํธ์ด๋ค. 
    clientPort=2181 

    # ์์๋ธ์ ์ด๋ฃจ๋ ์๋ฒ ์ ๋ณด์ด๋ค. 
    # server.X=hostname:peerPort:leaderPort
    # peerPort๋ ์์๋ธ ์๋ฒ๋ค์ด ์ํธ ํต์ ํ๋ ๋ฐ ์ฌ์ฉ๋๋ ํฌํธ ๋ฒํธ์ด๋ค. 
    # leaderPort๋ ๋ฆฌ๋๋ฅผ ์ ์ถํ๋ ๋ฐ ์ฌ์ฉ๋๋ ํฌํธ ๋ฒํธ์ด๋ค. 

    # -- 3888๋ค์ ๊ณต๋ฐฑ ์กฐ์ฌ!
    server.1=nasa1515-zookeeper-1:2888:3888
    server.2=nasa1515-zookeeper-2:2888:3888
    server.3=nasa1515-zookeeper-3:2888:3888

    # ์๋์ผ๋ก ์์ฑ๋๋ ์ค๋์ท์ 24์๊ฐ๋ง๋ค ์ต๋ 3๊ฐ๋ฅผ ์ ์งํ๊ณ  ๋๋จธ์ง๋ ์ ๊ฑฐํ๋ค. 
    autopurge.snapRetainCount=3 
    autopurge.purgeInterval=24
    ```

<br/>

6. Zookeeper Pod๊ฐ ์ํํ๊ฒ ํต์ ํ  ์ ์๋๋ก Docker Network๋ฅผ ์์ฑํฉ๋๋ค.

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

7. ์ ๊ณผ์ ์ ๋ชจ๋ ์๋ฃํ์์ผ๋ฉด ์ต์ข์ ์ผ๋ก๋ ์๋์ ๊ฐ์ด ๊ตฌ์ฑ๋์ด์ผ ํฉ๋๋ค.

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

8. ๊ตฌ์ฑ์ด ์์ ๊ฐ๋ค๋ฉดDockerFile์ ์์ฑํ ๊ฒฝ๋ก์์ ์ด๋ฏธ์ง๋ฅผ Buildํฉ๋๋ค. 

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

9. ์ด๋ฏธ์ง๋ฅผ ํ์ธํด๋ด๋๋ค.

    ```
    $ docker image ls
    REPOSITORY           TAG       IMAGE ID       CREATED          SIZE
    nasa1515-zookeeper   latest    ade37e220c72   42 seconds ago   733MB
    ubuntu               20.04     53df61775e88   9 days ago       72.8MB
    hello-world          latest    feb5d9fea6a5   7 months ago     13.3kB
    ```
    

<br/>

10. ์ด์  Docker Compose File์ ์์ฑํฉ๋๋ค. (docker-compose.yml)

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


11. ์์ฑํ compose๋ก Container๋ฅผ ์คํํฉ๋๋ค.

    ```js
    $ docker-compose up -d; 

    root@L-wslee:/home/nasa1515/docker# docker-compose up -d;
    [+] Running 4/4
     โ ฟ Network zoo                     Created                                                                                                                                                                0.0s
     โ ฟ Container nasa1515-zookeeper-3  Started                                                                                                                                                                0.6s
    โ ฟ Container nasa1515-zookeeper-1  Started                                                                                                                                                                0.8s
    โ ฟ Container nasa1515-zookeeper-2  Started           
    ```

<br/>


* ์ ์์ ์ผ๋ก ๊ตฌ๋์ด๋์๋ค๋ฉด ์๋ ๋ช๋ น์ด๋ก ํ์ธํฉ๋๋ค.

    ```js
    $ docker exec nasa1515-zookeeper-1 /usr/local/zookeeper/bin/zkServer.sh status
    $ docker exec nasa1515-zookeeper-2 /usr/local/zookeeper/bin/zkServer.sh status
    $ docker exec nasa1515-zookeeper-3 /usr/local/zookeeper/bin/zkServer.sh status
    ```

<br/>

* ๊ฒฐ๊ณผ๋ฅผ ํ์ธํ๋ฉด, ํ๊ฐ์ Zookeeper๋ Leader๋ก ์ ์ถ๋์๊ณ , ๋๋จธ์ง 2๊ฐ๋ follwer๋ก ์ค์ ๋์ด์๋ ๊ฒ์ ํ์ธ ํ  ์ ์๋ค.

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

## ๐ฑโ๐ Kafka Configuration

### PS

Zookeeper Cluster์ ๊ตฌ์ฑ์ ์๋ฃํ๋ค๋ฉด,  
์ด๋ฒ์๋ Kafka๋ฅผ Docker๋ก ๊ตฌ์ฑํ ๋ค Zookeeper Cluster์ ์ฐ๋ํ๋ ์์์ ์งํํฉ๋๋ค.  
๊ฐ๋จํ๊ฒ Kafka Broker๋ Zookeeper์ ๋์ผํ๊ฒ 3๊ฐ๋ก ๊ตฌ์ฑํ๊ณ  ํฌ๊ธฐ๋ฅผ ์์ ๋กญ๊ฒ ๋ณ๊ฒฝ ๊ฐ๋ฅํ๋๋ก ํ๋ ค๊ณ  ํฉ๋๋ค.


<br/>



* ์์์ Zookeeper๋ฅผ ๋ค๋ฃฐ ๋ DockerFile์ ๋ค๋ค์ผ๋, ์ด๋ฒ์๋ ๋ฐ๋ก DockerFile์ ๊ตฌ์ฑํ๊ฒ ์ต๋๋ค.

    [1] ์ฐ์  ์์ํ  ํด๋๋ฅผ ์์ฑํฉ๋๋ค

    ```js
    $ mkdir kafka-broker
    ```

    <br/>

    [2] ์๋์ ๊ฐ์ ๋ด์ฉ์ด ๋ด๊ธด Dockerfile์ ์์ฑํฉ๋๋ค.
    
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

    [3] ๋ง์ฐฌ๊ฐ์ง๋ก config ํด๋๋ฅผ ์์ฑํฉ๋๋ค.

    ```js
    $ mkdir config
    ```

    <br/>

    [4] config Folder ์์ init.sh ํ์ผ์ ์์ฑํ๊ณ  ์๋์ ๊ฐ์ด ๋ด์ฉ์ ์ถ๊ฐํฉ๋๋ค.
    
    ```js
    #!/bin/bash

    $ sed -i "s/{{broker_id}}/$BROKER_ID/" /usr/local/kafka/config/server.properties

    /usr/local/kafka/bin/kafka-server-start.sh /usr/local/kafka/config/server.properties
    ```

    <br/>

    [5] config Folder ์์ server.properties ํ์ผ์ ์์ฑํ๊ณ  ์๋์ ๊ฐ์ด ๋ด์ฉ์ ์ถ๊ฐํฉ๋๋ค.  
    ์๋๋ผ๋ฉด broker_id์ ๊ฐ์ ์ถ๊ฐํด์ผํ์ง๋ง, ์์ init.sh์์ ๋ฃ์ด์ฃผ๊ธฐ ๋๋ฌธ์ ๊ด์ฐฎ์ต๋๋ค.

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

    [6] docker-compose.yml์ ์๋์ ๊ฐ์ ๋ด์ฉ์ผ๋ก ์์ฑํฉ๋๋ค.

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

    [7] ์ฌ๊ธฐ๊น์ง ์๋ฃํ๋ค๋ฉด ์๋์ ๊ฐ์ ํํ๋ก ๊ตฌ์ฑ์ด ๋์ด์ผ ํฉ๋๋ค.

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

    [8] ์ ์ด์  Dockerfile์ Build ํฉ๋๋ค.

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

    [9] Image๊ฐ ์ ์์ ์ผ๋ก Build ๋ ๊ฒ์ ํ์ธํฉ๋๋ค.

    ```js
    root@L-wslee:/home/nasa1515/docker/kafka-broker# docker image ls
    REPOSITORY           TAG       IMAGE ID       CREATED              SIZE
    nasa1515-kafka       latest    5581d8201d8b   About a minute ago   920MB
    nasa1515-zookeeper   latest    e71e36444916   19 hours ago         737MB
    ubuntu               20.04     53df61775e88   10 days ago          72.8MB
    hello-world          latest    feb5d9fea6a5   7 months ago         13.3kB
    ```

    <br/>

    [10] Compose.yml ํ์ผ๋ก Container๋ฅผ ๋์์ํต๋๋ค.

    ```js
    $ docker-compose up -d;
    ...
    ...
    root@L-wslee:/home/nasa1515/docker/kafka-broker# docker-compose up -d;
    [+] Running 7/7
     โ ฟ Network zoo                       Created                                                                                                                                               0.0s
     โ ฟ Volume "nasa1515-kafka-1-volume"  Created                                                                                                                                               0.0s
     โ ฟ Volume "nasa1515-kafka-2-volume"  Created                                                                                                                                               0.0s
     โ ฟ Volume "nasa1515-kafka-3-volume"  Created                                                                                                                                               0.0s
     โ ฟ Container nasa1515-kafka-1        Started                                                                                                                                               1.1s
     โ ฟ Container nasa1515-kafka-3        Started                                                                                                                                               1.1s
     โ ฟ Container nasa1515-kafka-2        Started                                                                                                                                               1.2s
    ```

    <br/>

    [11] Kafka Container๊ฐ ์ ์คํ๋์๋์ง ํ์ธํฉ๋๋ค.

    ```js
    $ docker ps
    ...
    ...
    root@L-wslee:/home/nasa1515/docker/kafka-broker#  docker ps
    CONTAINER ID   IMAGE            COMMAND                  CREATED              STATUS          PORTS     NAMES
    5aed89a22bec   nasa1515-kafka   "/bin/sh -c 'bash inโฆ"   About a minute ago   Up 19 seconds             nasa1515-kafka-1
    2bea2dcd9062   nasa1515-kafka   "/bin/sh -c 'bash inโฆ"   About a minute ago   Up 18 seconds             nasa1515-kafka-3
    8ff56e284749   nasa1515-kafka   "/bin/sh -c 'bash inโฆ"   About a minute ago   Up 18 seconds             nasa1515-kafka-2
    ```

    <br/>

    [12] ์ค์  Container์ Kafka๋ ์ ์์ ์ผ๋ก ๋์ํ๋์ง ๋ก๊ทธ๋ฅผ ํ์ธํด๋ด์๋ค.

    ```js
    $ docker logs nasa1515-kafka-1
    ...
    ...
    ...
    # BrokerToControllerChannelManager broker=3 ๋ธ๋ก์ปค 3๊ฐ๊ฐ ์ ์์ ์ผ๋ก ์ฐ๊ฒฐ๋์์ต๋๋ค!

    [2022-05-10 02:26:33,654] INFO [KafkaServer id=3] started (kafka.server.KafkaServer)
    [2022-05-10 02:26:33,928] INFO [BrokerToControllerChannelManager broker=3 name=alterIsr]: Recorded new controller, from now on will use broker nasa1515-kafka-3:9092 (id: 3 rack: null) (kafka.server.BrokerToControllerRequestThread)
    [2022-05-10 02:26:33,930] INFO [BrokerToControllerChannelManager broker=3 name=forwarding]: Recorded new controller, from now on will use broker nasa1515-kafka-3:9092 (id: 3 rack: null) (kafka.server.BrokerToControllerRequestThread)
    ```



<br/>

---

## ๐ Kafka Client ์ค์  With Confluent

์์ ๋ด์ฉ์์ ๊ตฌ์ถํ๋ Kafka Cluster๋ Docker Container์์ ๊ฐ์ ๋ค๋ฅธ host๋ฅผ ๊ฐ์ง๊ณ  ์์ต๋๋ค.  
๋๋ฌธ์ Producer๊ฐ Kafka Broker ์ชฝ์ผ๋ก ์์ฒญ์ ๋ณด๋ผ ๋ ๊ตฌ์ฑํ 3๊ฐ์ Host ์ค ์ด๋ Host๋ก ๋ณด๋ด์ผ ํ  ์ง ๋ชจ๋ฅด๊ฒ ๋ฉ๋๋ค.  
๋ํ ์ด์์ ์ผ๋ก ๋ณด์์ ๋, Producer์์ ํ๋์ Broker๋ก ๋ฉ์ธ์ง๋ฅผ ๋ณด๋ธ๋ค๋ฉด, ํด๋น Broker๊ฐ ์ ์ ์๋ ๋ฌธ์ ๋ก ์ข๋ฃ๋๊ฒ ๋๋ค๋ฉด, ์ด์๊ฐ ๋ฐ์ํ๋ค.  
๊ทธ๋์ ์ผ๋ฐ์ ์ธ WEB/WAS์ LoadBalancer ์ญํ ์ ํ๋ ํ๋์ End-Point ๊ฐ ํ์ํฉ๋๋ค.  
์ง๊ธ๋ถํฐ ์งํ ํ  ๋ด์ฉ์, End-Point์ ์์ฒญ์ ๋ณด๋ด, ์ฌ๋ฌ ๋์ Broker๋ก ๊ตฌ์ฑ๋ Cluster์์ ๊ณ ๊ฐ์ฉ์ฑ์ ํ๋ณดํ๋ ๋ฐฉ๋ฒ์๋๋ค.  


<br/>

Confluent Kafka REST ์ค์น  

* ๋์ผํ๊ฒ Docker๋ก ์งํํฉ๋๋ค.  



    [1] ์์ ํ  ํด๋๋ฅผ ๋์ผํ๊ฒ ์์ฑํฉ๋๋ค.

    ```js
    $ mkdir confluent
    ```

    <br/>

    [2] ์๋ ๋ด์ฉ์ ๋ด์ Dockerfile์ ์์ฑํฉ๋๋ค.

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

    # confluent-community ์ค์น
    RUN wget http://packages.confluent.io/archive/7.1/confluent-community-7.1.1.tar.gz
    RUN tar -zxvf confluent-community-7.1.1.tar.gz
    RUN mv confluent-7.1.1 /usr/local/confluent

    # kafka-rest ์ค์ ํ์ผ ๋ณต์ฌ
    COPY config/kafka-rest.properties /usr/local/confluent/etc/kafka-rest/kafka-rest.properties
    RUN sed -i 's/\r//g' /usr/local/confluent/etc/kafka-rest/kafka-rest.properties
    
    # kakfa-rest ์คํ
    CMD /usr/local/confluent/bin/kafka-rest-start /usr/local/confluent/etc/kafka-rest/kafka-rest.properties
    ```

    <br/>

    [3] config ํด๋๋ฅผ ์์ฑํฉ๋๋ค.

    ```js
    $ mkdir config
    ```

    <br/>

    [4] config ํด๋์ ์๋ ๋ด์ฉ์ ๋ฃ์ kafka-rest.properties ์์ฑํฉ๋๋ค. 

    ```js
    # kakfa ID
    id=default

    # schema.registry.url=http://localhost:8081 
    zookeeper.connect=nasa1515-zookeeper-1:2181,nasa1515-zookeeper-2:2181,nasa1515-zookeeper-3:2181 
    bootstrap.servers=PLAINTEXT://nasa1515-kafka-1:9092,PLAINTEXT://nasa1515-kafka-2:9092,PLAINTEXT://nasa1515-kafka-3:9092
    ```

    <br/>

    [5] ์ด์  ์๋ ๋ด์ฉ์ ๋ด์ docker-compose.yml ํ์ผ์ ์์ฑํฉ๋๋ค.

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

    [6] ์ฌ๊ธฐ๊น์ง ์๋ฃ๋์์ผ๋ฉด ์๋์ ๊ฐ์ ํ์์ ํ์ผ์ด ์กด์ฌํด์ผ ํฉ๋๋ค.

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

    [7] Docker Image๋ฅผ Build ํฉ๋๋ค.

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

    [8] ์ด๋ฏธ์ง๋ฅผ ํ์ธํด๋ด์๋ค.

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

    [9] Docker-compose๋ก Container๋ฅผ ๋์ํฉ๋๋ค.

    ```js
    $ docker-compose up -d
    ...
    ...
    [+] Running 1/1
    โ ฟ Container nasa1515-confluent-kafka  Started                                                                                                                                             0.6s
    ```

    <br/>

    [10] ์ ์์ ์ผ๋ก ์คํ๋๊ณ  ์๋์ง ํ์ธํฉ๋๋ค.

    ```js
    $ docker ps
    ...
    ...
    root@L-wslee:/home/nasa1515/docker/Confluent# docker ps
    CONTAINER ID   IMAGE                      COMMAND                  CREATED          STATUS          PORTS                                       NAMES
    d1f069f93aca   nasa1515-confluent-kafka   "/bin/sh -c '/usr/loโฆ"   34 seconds ago   Up 33 seconds   0.0.0.0:8082->8082/tcp, :::8082->8082/tcp   nasa1515-confluent-kafka
    685b2f6adc7f   nasa1515-kafka             "/bin/sh -c 'bash inโฆ"   2 hours ago      Up 2 hours                                                  nasa1515-kafka-3
    86ee421b76a8   nasa1515-kafka             "/bin/sh -c 'bash inโฆ"   2 hours ago      Up 2 hours                                                  nasa1515-kafka-1
    10c8c2384fed   nasa1515-kafka             "/bin/sh -c 'bash inโฆ"   2 hours ago      Up 2 hours                                                  nasa1515-kafka-2
    d3fe193618f7   nasa1515-zookeeper         "/bin/sh -c 'bash inโฆ"   2 hours ago      Up 2 hours                                                  nasa1515-zookeeper-1
    021037ca8443   nasa1515-zookeeper         "/bin/sh -c 'bash inโฆ"   2 hours ago      Up 2 hours                                                  nasa1515-zookeeper-3
    6f9cd8cdd917   nasa1515-zookeeper         "/bin/sh -c 'bash inโฆ"   2 hours ago      Up 2 hours                                                  nasa1515-zookeeper-2
    ```

    <br/>

    [11] ์ด์  Kafka Broker ์ชฝ์ Topic์ ์์ฑํ๊ฒ ์ต๋๋ค.
    ์ ๋ Python์ ์ฌ์ฉํ์ ์์ฒญ์ ๋ณด๋ด๊ฒ ์ต๋๋ค.  

    ```js
    import requests import json 
    
    headers = { 'Content-Type': 'application/vnd.kafka.json.v2+json', } 
    
    data = '{"records":[{"value":{"id":"probiotics"}}]}' 
    response = requests.post('http://localhost:8082/topics/nasa1515', headers=headers, data=data) 
    print(response)
    print(json.dumps(response.json(), indent=4))
    ```

    <br/>

    ํ ํฝ ์์ฑ ๊ฒฐ๊ณผ

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

    ํ์ด์ฌ get request๋ก Topic ์ ๋ณด ํ์ธํ๊ธฐ

    ```js
    import requests 
    import json 

    response = requests.get('http://localhost:8082/topics/nasa1515/   ') 

    print(response) 
    print(json.dumps(response.json(), indent=4))
    ```

    <br/>

    ๊ฒฐ๊ณผ

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


---

## ๐น Kafka Gui Tools - kafdrop

### PS

์๋ฌด๋๋ ๋ชจ๋  Cluster๋ค์ Docker Container๋ก ๊ตฌ๋ํ๋ค๋ณด๋๊น ๋ญ๊ฐ ์ผ์ผํ ํ์ธํ๊ธฐ๊ฐ ๋๋ฌด ํ๋ค๋ค.  
๊ทธ๋์ ๊ตฌ๊ธ๋ง์ ํ๋ค๋ณด๋ ํตํฉ GUI๋ฅผ ์ง์ํด์ฃผ๋ ํด์ ๋ฐ๊ฒฌํ๋ค. ๋ฌผ๋ก  ์๋ ๋์ปค๋ก ๋์ด๋ค..  


<br/>

* ์ด ์์ด๋ ์ง์ํ๋ Docker ์ด๋ฏธ์ง๊ฐ ์์ต๋๋ค!!. 

  [1] ์์ ๋๋ ํ ๋ฆฌ ํ๋ ์์ฑํฉ๋๋ค.  

  ```js
  $ mkdir kafdrop 
  ```

  <br/>

  [2] docker-compose.yml ํ๋ ๊ฐ๋จํ๊ฒ ๋นจ๋ฆฌ ๋ง๋ค์ด์ค์๋ค.

  ```js
  version: "3.8"
  services:
    kafdrop:
      image: obsidiandynamics/kafdrop
      restart: "always"
      ports:
        - "9000:9000" 
      environment:
        KAFKA_BROKERCONNECT: "nasa1515-kafka-1:9092,nasa1515-kafka-2:9092,nasa1515-kafka-3:9092"
        JVM_OPTS: "-Xms32M -Xmx64M" 

  networks:
    default:
      name: zoo
  ```

  <br/>

  [3] compose ์คํํด์ค๋๋ค.

  ```js
  $ docker-compose up -d;
  ```

  <br/>

  [4] ์ ์์ ์ผ๋ก ์ค์น๋์๋ค๋ฉด Localhost:9000 web์ผ๋ก ์๋์ ๊ฐ์ด ์ ์์ด ๊ฐ๋ฅํฉ๋๋ค.  
  ํ์ธํด๋ณด๋ฉด ์ฐ๊ฒฐ๋์ด์๋ Broker์ ์์ฑ๋์ด์๋ Topic๋ฑ์ ํ์ธ์ด ๊ฐ๋ฅํฉ๋๋ค.

  ![image](https://user-images.githubusercontent.com/69498804/167564283-6c6bccc9-fa6e-4f79-be20-2dc0488e4829.png)

<br/>

---

## ๋ง์น๋ฉฐโฆ  

์ฌ์ค ์ด๋ฒ ํฌ์คํธ์์ ๊ตฌ์ถํ Kafka Broker Cluster์ ๋ชฉ์ ์  
Public Cloud ๋ณ๋ก ์กด์ฌํ๋ Streaming Tools์ ํ์ธํด๋ณด๊ธฐ ์ํจ์๋๋ค.  
์๊ฐ๋ณด๋ค ๊ตฌ์ถ ํฌ์คํธ๊ฐ ๊ธธ์ด์ ธ์ ๋ถ๋์ดํ๊ฒ ํฌ์คํธ๋ฅผ ์ฌ๋ฌ๊ฐ๋ก ๋๋ ์ผ ํ  ๊ฒ ๊ฐ์ต๋๋ค.  
๋ค์ ํฌ์คํธ์์๋ Ptyhon์ ์ฌ์ฉํด Kafka Producer Application์ ์์ฑํ๊ณ   
Event Message๋ฅผ Cloud๋ก ๋ณด๋ด๋ ๋ฐฉ๋ฒ์ ๋ํด์ ์ ๋ฆฌํ๊ฒ ์ต๋๋ค.  

---

```toc
```