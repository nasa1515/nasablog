---
emoji: ๐คฆโโ๏ธ
title: "[DOCKER] - Install"
date: "2021-06-26 00:01:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


๋จธ๋ฆฌ๋ง  

 ์ด์  ํฌ์คํธ์์๋ ๋์ปค์ ๋ํด์, ๋์ปค์ VM๊ณผ์ ์ฐจ์ด ์์ ํฌ์คํ ํ์๋ค.  
 ์ด๋ฒ ํฌ์คํธ์์๋ ์ค์  ๋์ปค์ ์ค์น๋ฐฉ๋ฒ ๋ฐ ํ์ธ ๋ฐฉ๋ฒ๋ฑ์ ๋ํด ๊ฐ๋จํ๊ฒ ํฌ์คํธ ํ๋ค.


---



## โ ๋์ปค ์ค์น

๋์ปค๋ ๋ฆฌ๋์ค ์ปจํ์ด๋ ๊ธฐ์ ์ด๋ฏ๋ก macOS๋ windows์ ์ค์นํ  ๊ฒฝ์ฐ ๊ฐ์๋จธ์ ์ ์ค์น๊ฐ ๋ฉ๋๋ค.  
๋ฆฌ๋์ค ์ปจํ์ด๋ ๋ง๊ณ  ์๋์ฐ์ฆ ์ปจํ์ด๋๋ผ๋ ๊ฒ๋ ์กด์ฌํ์ง๋ง ์ด ํฌ์คํธ๋ ๋ฆฌ๋์ค๋ฅผ ์ ์ ๋ก ํฉ๋๋ค.  

* Linux  
    ๋ฆฌ๋์ค์ ๋์ปค๋ฅผ ์ค์นํ๋ ๋ฐฉ๋ฒ์ ์๋ ์ค์น ์คํฌ๋ฆฝํธ๋ฅผ ์ด์ฉํ๋ ๊ฒ์ด ๊ฐ์ฅ ์ฝ์ต๋๋ค.  
    ๋ค์ ๋ช๋ น์ด๋ฅผ ์๋ ฅํ๋ฉด root ๊ถํ์ ์๊ตฌํ๊ณ  ์ ์ ๊ธฐ๋ค๋ฆฌ๋ฉด ์ค์น๊ฐ ์๋ฃ๋ฉ๋๋ค.

    ```cs
    curl -fsSL https://get.docker.com/ | sudo sh
    ```


---
    
์คํฌ๋ฆฝํธ๋ฅผ ์ฌ์ฉํ๋ ๋ฐฉ๋ฒ ์ธ์๋ ํจํค์ง ์ ์ฅ์์ ์ฐ๊ฒฐํ์ฌ ์ค์น๋ ๊ฐ๋ฅํฉ๋๋ค.  

* ํจํค์ง ์ ์ฅ์ ์ฐ๊ฒฐ

    * ์ฌ์  ํจํค์ง ์ค์น  
    
    ```cs
    # sudo yum install -y yum-utils \
    > device-mapper-persistent-data \
    > lvm2
    ```

    <br/>

    * Yum ์ ์ฅ์ ์ค์ 
    ``yum-config-manager``๋ก docker-ce ํจํค์ง ์ ์ฅ์์ ์ฐ๊ฒฐํ๋ค.

    ```cs
    # sudo yum-coinfig-manager \
    > --add-repo \
    > https://download.docker.com/linux/centos/docker-ce.repo
    ```

    <br/>

    * docker-ce ์ค์น
    
    ```cs
    # sudo yum install -y docker-ce docker-ce-cli containerd.io
    ```


    <br/>

    * ์๋น์ค ์คํ ๋ฐ ํ์ฑํ
    
    ```cs
    # sudo systemctl start docker
    # sudo systemctl enable docker
    ```


    <br/>

    * sudo ์์ด DOCKER ์ฌ์ฉํ๊ธฐ

    ``docker`๋ ๊ธฐ๋ณธ์ ์ผ๋ก ``root``๊ถํ์ด ํ์ํฉ๋๋ค.  
    root๊ฐ ์๋ ์ฌ์ฉ์๊ฐ sudo์์ด ์ฌ์ฉํ๋ ค๋ฉด ํด๋น ์ฌ์ฉ์๋ฅผ docker๊ทธ๋ฃน์ ์ถ๊ฐํฉ๋๋ค.
    
    ```cs
    sudo usermod -aG docker $USER # ํ์ฌ ์ ์์ค์ธ ์ฌ์ฉ์์๊ฒ ๊ถํ์ฃผ๊ธฐ
    sudo usermod -aG docker your-user # your-user ์ฌ์ฉ์์๊ฒ ๊ถํ์ฃผ๊ธฐ
    ```

    ์ฌ์ฉ์๊ฐ ๋ก๊ทธ์ธ ์ค์ด๋ผ๋ฉด ๋ค์ ๋ก๊ทธ์ธ ํ ๊ถํ์ด ์ ์ฉ๋ฉ๋๋ค.


    <br/>

    * DOCKER VERSION ํ์ธ
    docker ์ค์น ์๋ฃ ํ ์ค์ ์ด ๋๋ฌ์ผ๋ฉด version์ ํ์ธํด๋ณธ๋ค.

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

    ``Client``์ ``Server``์ ๋ณด๊ฐ ์ ์์ ์ผ๋ก ์ถ๋ ฅ๋์๋ค๋ฉด ์ค์น๊ฐ ์๋ฃ๋ ๊ฒ ์๋๋ค.

    Server ์ ๋ณด๊ฐ ์ ์์ ์ผ๋ก ๋์ค์ง ์๊ณ   
    ``Error response from daemon: Bad response from Docker engine`` ๋ฉ์์ง๊ฐ ์ถ๋ ฅ๋๋ ๊ฒฝ์ฐ๋  
    ๋ณดํต docker daemon์ด ์ ์์ ์ผ๋ก ์คํ๋์ง ์์๊ฑฐ๋ sudo๋ฅผ ์๋ ฅํ์ง ์์ ๊ฒฝ์ฐ์๋๋ค.




    * ๊ฐ๋จํ ์ปจํ์ด๋ ๊ตฌ๋ ํ์คํธ  
    ์ด๋ค ์ธ์ด๋ฅผ ๋ฐฐ์ฐ๋๋ผ๋ ๊ฐ์ฅ ์ฒ์ํด๋ณด๋ ์ค์ต์ HELLO WORLD ๋ฉ์ธ์ง ์ถ๋ ฅ์ผ ๊ฒ์ด๋ค.  
    ์ด๋ฒ ํฌ์คํธ์์๋ ์ค์น ๊ธฐ๋์ผ๋ก ``Hello World`` ์ปจํ์ด๋๋ฅผ ์คํํด๋ณธ๋ค.
    
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


* ์ฃผ์์ฌํญ

    ๋์ปค๊ฐ ์ง์๋๋ kernel ๋ฒ์ ์ ``3.10.x`` ์ด์์๋๋ค.  
    ubuntu 14.04 ์ด์์ ์ฌ์ฉํ๋ฉด ํฐ ๋ฌธ์ ๊ฐ ์๊ณ  kernel์ ๋ฒ์ ์ด ๋ฎ์ ๊ฒฝ์ฐ ์ ๋๋ก ๋์์ ์ํ๊ฑฐ๋ ๋ฌธ์ ๊ฐ ์๊ธธ ์ ์์ต๋๋ค.  
    ๊ฐ๊ธ์  ์ต์ ๋ฒ์ ์ผ๋ก ์๋ฐ์ดํธ ํด์ฃผ์ธ์. ubuntu๋ centos๊ฐ ์๋ ๊ฒฝ์ฐ๋ ๋ค๋ฅธ ๋ฐฉ๋ฒ์ด ํ์ํฉ๋๋ค.  
    ๋ค๋ฅธ OS๋ฅผ ๊ธฐ๋ฐ์ผ๋ก DOCKER๋ฅผ ์ค์นํ๊ธฐ ์ํด์  ์๋ ๋ฉ๋ด์ผ์ ํ์ธํด๋ณด์ธ์.  
    https://docs.docker.com/engine/install/

---


```toc
```