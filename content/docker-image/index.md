---
emoji: ๐คฆโโ๏ธ
title: "[DOCKER] - IMAGE"
date: "2021-06-26 00:09:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


๋จธ๋ฆฌ๋ง  

 ์ด์  ํฌ์คํธ์์๋ ๋์ปค์ ์ค์น๋ฐฉ๋ฒ์ ๋ํด์ ๊ฐ๋จํ๊ฒ ํฌ์คํ ํ์์ต๋๋ค.  
 ์ด๋ฒ ํฌ์คํธ์์๋ ์ค์  ๋์ปค์ ์ปจํ์ด๋์ ์์ฑ ๊ด๋ฆฌ ๋ฐฉ๋ฒ ๋ฐ ๋ช๋ น์ด๋ค์ ํฌ์คํธ ํ๋ค.


---

## โ ๋์ปค ์ด๋ฏธ์ง

๋์ปค๋ ๊ธฐ๋ณธ์ ์ผ๋ก ``๋์ปค ํ๋ธ``๋ผ๊ณ  ํ๋ ์ค์ ์ด๋ฏธ์ง ์ ์ฅ์์์ ์ด๋ฏธ์ง๋ฅผ ๋ด๋ ค๋ฐ์ต๋๋ค.  
๋์ปค ํ๋ธ๋ ๋์ปค๊ฐ ๊ณต์์ ์ผ๋ก ์ ๊ณตํ๊ณ  ์๋ ์ด๋ฏธ์ง ์ ์ฅ์๋ก ์ฝ๊ฒ ์ฌ๋ฆฌ๊ณ  ๋ด๋ ค๋ฐ์ ์ ์์ต๋๋ค.


![](https://miro.medium.com/max/1104/1*ttU6oMoZztKk2kjJid6PuQ.png)


* Docker Hub  
    ๋์ปค ํ๋ธ๋ ๋์ปค์์ ์ ๊ณตํ๋ ๊ธฐ๋ณธ ์ด๋ฏธ์ง ์ ์ฅ์๋ก ubuntu, centos, debian๋ฑ์ ๋ฒ ์ด์ค ์ด๋ฏธ์ง์  
    ruby, golang, java, python ๋ฑ์ ๊ณต์ ์ด๋ฏธ์ง๊ฐ ์ ์ฅ๋์ด ์์ต๋๋ค.  
    ์ผ๋ฐ ์ฌ์ฉ์๋ค์ด ๋ง๋  ์ด๋ฏธ์ง๋ 50๋ง ๊ฐ๊ฐ ๋๊ฒ ์ ์ฅ๋์ด ์๊ณ  ๋ค์ด๋ก๋ ํ์๋ 80์ต ํ๋ฅผ ๋์ต๋๋ค.

    ํ์๊ฐ์๋งํ๋ฉด ๋์ฉ๋์ ์ด๋ฏธ์ง๋ฅผ ๋ฌด๋ฃ๋ก ์ ์ฅํ  ์ ์๊ณ  ๋ค์ด๋ก๋ ํธ๋ํฝ ๋ํ ๋ฌด๋ฃ์๋๋ค.  
    ๋จ, ๊ธฐ๋ณธ์ ์ผ๋ก ๋ชจ๋  ์ด๋ฏธ์ง๋ ๊ณต๊ฐ๋์ด ๋๊ตฌ๋ ์ ๊ทผ ๊ฐ๋ฅํ๋ฏ๋ก ๋น๊ณต๊ฐ๋ก ์ฌ์ฉํ๋ ค๋ฉด ์ ๋ฃ ์๋น์ค๋ฅผ ์ด์ฉํด์ผ ํฉ๋๋ค.

    <br/>

* ํ์๊ฐ์  
    ์๋ ๋งํฌ์์ Dokcer hub ํ์ ๊ฐ์ ํ ํฌ์คํธ๋ฅผ ์ฝ๋ ๊ฒ์ ์ถ์ฒ๋๋ฆฝ๋๋ค!!.  
   https://hub.docker.com/  

![](https://subicura.com/assets/article_images/2017-02-10-docker-guide-for-beginners-create-image-and-deploy/docker-hub.png)

---

## โ ๋์ปค ์ด๋ฏธ์ง ๋ช๋ น์ด

* ``docker images`` ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํด ํ์ฌ HOST๊ฐ ๊ฐ์ง๊ณ  ์๋ ์ด๋ฏธ์ง๋ฅผ ํ์ธ ํ  ์ ์์ต๋๋ค. 

    ```cs
    nasa1515@nasa:~$ docker images
    REPOSITORY          TAG                 IMAGE ID            CREATED                 SIZE
    hello-world         latest              bf756fb1ae65        7 months ago            13.3kB
    ```

    ์ด์  ํฌ์คํธ์์ ``hello-world`` ์ปจํ์ด๋๋ฅผ ์คํํ์ฌ ๋จ์ ์๋ ๊ฒ์ ํ์ธ.

<br/>

* ``docker search`` ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํด docker hub์ ์กด์ฌํ๋ ์ด๋ฏธ์ง๋ฅผ ๊ฒ์ ํ  ์ ์์ต๋๋ค.  
    ์ฐ์  centos os๋ฅผ ํ๋ฒ ๊ฒ์ํด๋ณด๊ฒ ์ต๋๋ค.  

    ```cs
    nasa1515@nasa:~$ docker search centos
    NAME                               DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
    centos                             The official build of CentOS.                   6134                [OK]                
    ansible/centos7-ansible            Ansible on Centos7                              132                                     [OK]
    consol/centos-xfce-vnc             Centos container with "headless" VNC sessionโฆ   119                                     [OK]
    jdeathe/centos-ssh                 OpenSSH / Supervisor / EPEL/IUS/SCL Repos - โฆ   115                                     [OK]
    centos/systemd                     systemd enabled base container.                 87                                      [OK]
    centos/mysql-57-centos7            MySQL 5.7 SQL database server                   80                                      
    imagine10255/centos6-lnmp-php56    centos6-lnmp-php56                              58                                      [OK]
    ...... (์ค๋ต)    
    ```

    * ์ด๋ฏธ์ง ํ๋์ ๋ํ ์ค๋ช์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.
        *  ``NAME`` : ์ด๋ฏธ์ง ์ ์ฅ์์ ์ด๋ฆ
        *  ``DESCRIPTION`` : ์ด๋ฏธ์ง์ ๋ํ ์ค๋ช
        *  ``STATS`` : ์ด๋ฏธ์ง์ ๋ํ ํ๊ฐ์ ์
        *  ``OFFICIAL`` : ๊ณต์ ์ด๋ฏธ์ง ์ฌ๋ถ
        *  ``AUTOMATED`` : ์๋ํ ๋น๋ ์ฌ๋ถ


<br/>

* ``docker pull`` ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํด docker hub์ ์กด์ฌํ๋ ์ด๋ฏธ์ง๋ฅผ ๋ค์ด๋ก๋ ํ  ์ ์์ต๋๋ค.  
    ๋ช๋ น์ด์ ์ฌ์ฉ๋ฒ์ ์๋์ ๊ฐ์ต๋๋ค.

    ```cs
    $ docker pull --help


    Usage: docker pull [OPTION] NAME[:TAG|@DIGEST]
    ```

    *  NAME: search ๋ช๋ น์ ๊ฒฐ๊ณผ์ name๊ณผ ๋์ผํฉ๋๋ค.  
    *  ์ถ๊ฐ๋ก ``TAG``, ``@DIGEST``๋ฅผ ์ฌ์ฉํ๋๋ฐ ์ด๋ ์ ์ฅ์์ ์ค์  ์ด๋ฏธ์ง๋ฅผ ๊ตฌ๋ถํ๋ ๊ฒ์๋๋ค.  
    *  ``TAG`` : ๋ณดํต ๋ฒ์ ์ ๋ํ๋ด๊ฑฐ๋ ํน์ฑ์ ๋ํ๋๋๋ค.
    *  ``@DIGEST`` : ํด์์ฒ๋ผ ์ด๋ฏธ์ง์ ๋ฌด๊ฒฐ์ฑ์ ๊ฒ์ฆํ๋๋ฐ ์ฌ์ฉํฉ๋๋ค.  
    *  ๋๊ฐ์ ์ต์์ ๋ชจ๋ ์๋ตํ๋ค๋ฉด ์๋์ผ๋ก TAG์ ``latest``๊ฐ ๋ถ์ฌ๋์ด ๋ค์ด๋ก๋ ๋ฉ๋๋ค.

    <br/>


* ์ฐ์  centos os๋ฅผ TAG์์ด ํ๋ฒ ๋ฐ์์ค๊ฒ ์ต๋๋ค.  
    
    ```cs
    nasa1515@nasa:~$ docker pull centos
    Using default tag: latest
    latest: Pulling from library/centos
    3c72a8ed6814: Pull complete 
    Digest: sha256:76d24f3ba3317fa945743bb3746fbaf3a0b752f10b10376960de01da70685fbd
    Status: Downloaded newer image for centos:latest
    docker.io/library/centos:latest

    nasa1515@nasa:~$ docker images
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    centos              latest              0d120b6ccaa8        6 days ago          215MB
    hello-world         latest              bf756fb1ae65        7 months ago        13.3kB
    ```

    <br/>

* ์ด๋ฒ์๋ TAG๋ฅผ ``mysql:5.7``๋ก ๋ถ์ฌ ํ mysql์ ๋ฐ์์ ๋ณด๊ฒ ์ต๋๋ค.  

    ```cs
    nasa1515@nasa:~$ docker pull mysql:5.7
    5.7: Pulling from library/mysql
    bf5952930446: Pull complete 
    8254623a9871: Pull complete 
    938e3e06dac4: Pull complete 
    ea28ebf28884: Pull complete 
    f3cef38785c2: Pull complete 
    894f9792565a: Pull complete 
    1d8a57523420: Pull complete 
    5f09bf1d31c1: Pull complete 
    1b6ff254abe7: Pull complete 
    74310a0bf42d: Pull complete 
    d398726627fd: Pull complete 
    Digest: sha256:da58f943b94721d46e87d5de208dc07302a8b13e638cd1d24285d222376d6d84
    Status: Downloaded newer image for mysql:5.7
    docker.io/library/mysql:5.7
    student@cccr:~$ 
    nasa1515@nasa:~$ docker images
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    centos              latest              0d120b6ccaa8        6 days ago          215MB
    mysql               5.7                 718a6da099d8        12 days ago         448MB
    hello-world         latest              bf756fb1ae65        7 months ago        13.3kB
    ```

<br/>

----

* ``docker rmi`` ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํด Host ์ ์ฅ์์ ์กด์ฌํ๋ ์ด๋ฏธ์ง๋ฅผ ์ญ์  ํ  ์ ์์ต๋๋ค.  
    ๋ช๋ น์ด์ ์ฌ์ฉ๋ฒ์ ์๋์ ๊ฐ์ต๋๋ค.

    ```cs
    $ docker rmi --help

    Usage:  docker rmi [OPTIONS] IMAGE  [IMAGE...]
    ...
    ```

    <br/>

* ๋ฐฉ๊ธ ๋ค์ด๋ก๋ ๋ฐ์๋ mysql ์ด๋ฏธ์ง๋ฅผ ์ญ์  ํด๋ณด๊ฒ ์ต๋๋ค.  

    ```cs
    nasa1515@nasa:~$ docker rmi mysql:5.7
    Untagged: mysql:5.7
    Untagged: mysql@sha256:da58f943b94721d46e87d5de208dc07302a8b13e638cd1d24285d222376d6d84
    Deleted: sha256:718a6da099d82183c064a964523c0deca80619cb033aadd15854771fe592a480
    Deleted: sha256:058d93ef2bfb943ba6a19d8b679c702be96e34337901da9e1a07ad62b772bf3d
    Deleted: sha256:7bca77783fcf15499a0386127dd7d5c679328a21b6566c8be861ba424ac13e49
    Deleted: sha256:183d05512fa88dfa8c17abb9b6f09a79922d9e9ee001a33ef34d1bc094bf8f9f
    Deleted: sha256:165805124136fdee738ed19021a522bb53de75c2ca9b6ca87076f51c27385fd7
    Deleted: sha256:904abdc2d0bea0edbb1a8171d1a1353fa6de22150a9c5d81358799a5b6c38c8d
    Deleted: sha256:d26f7649f78cf789267fbbca8aeb234932e230109c728632c6b9fbc60ca5591b
    Deleted: sha256:7fcf7796e23ea5b42eb3bbd5bec160ba5f5f47ecb239053762f9cf766c143942
    Deleted: sha256:826130797a5760bcd2bb19a6c6d92b5f4860bbffbfa954f5d3fc627904a76e9d
    Deleted: sha256:53e0181c63e41fb85bce681ec8aadfa323cd00f70509107f7001a1d0614e5adf
    Deleted: sha256:d6854b83e83d7eb48fb0ef778c58a8b839adb932dd036a085d94a7c2db98f890
    Deleted: sha256:d0f104dc0a1f9c744b65b23b3fd4d4d3236b4656e67f776fe13f8ad8423b955c
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker images
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    centos              latest              0d120b6ccaa8        6 days ago          215MB
    hello-world         latest              bf756fb1ae65        7 months ago        13.3kB
    ```
    MYSQL ์ด๋ฏธ์ง์ ๊ด๋ จ๋ ``๋ ์ด์ด``๋ ์ ๋ถ ์ญ์ ํ๋ฉฐ  
    ํด๋น ๋ ์ด์ด๋ฅผ ๋ค๋ฅธ ์ปจํ์ด๋ ๋๋ ์ด๋ฏธ์ง๊ฐ ``์ฌ์ฉํ๊ณ  ์๋ค๋ฉด`` ์ญ์ ํ์ง ์๋๋ค.


    <br/>

* test๋ฅผ ์ํด rmitest๋ผ๋ ์ด๋ฆ์ hello-world ์ด๋ฏธ์ง๋ฅผ ์ฌ์ฉํ ์ปจํ์ด๋๋ฅผ ํ๋ ์์ฑํฉ๋๋ค.
    
    ```cs
    nasa1515@nasa:~$ docker run -itd --name rmitest hello-world
    701ad267fbc8aca292b033d424e6a295f06f410ae80807d8b124e15efa021685
    --------------------------------------------------------------------------------------------
    nasa1515@nasa:~$ docker ps -a
    CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS                          PORTS               NAMES
    701ad267fbc8        hello-world         "/hello"            About a minute ago   Exited (0) About a minute ago                       rmitest
    --------------------------------------------------------------------------------------------
    nasa1515@nasa:~$ docker rmi hello-world
    Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container 701ad267fbc8 is using its referenced image bf756fb1ae65
    ```
    ๋ค์๊ณผ ๊ฐ์ด ์ฌ์ฉ์ค์ธ ์ด๋ฏธ์ง์ ๊ฒฝ์ฐ ์ญ์ ๊ฐ ๋์ง ์๋๋ค.  
    ์ด ๊ฒฝ์ฐ์๋ ``-f ์ต์``์ ์ฌ์ฉํ๋ฉด ์ญ์  ํ  ์ ์์ง๋ง ์คํ์ค์ธ ์ปจํ์ด๋์๊ฒ ์ํฅ์ ๋ฏธ์น๊ธฐ์ ๊ถ์ฅํ์ง๋ ์๋๋ค.

    <br/>

----

* ``docker inspect`` ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํด docker ์ค๋ธ์ ํธ์ ์ ๋ณด๋ฅผ ์์ธํ ํ์ธ ํ  ์ ์์ต๋๋ค.  
    ๋ช๋ น์ด์ ์ฌ์ฉ๋ฒ์ ์๋์ ๊ฐ์ต๋๋ค.

    ```cs
    $ docker inspect --help

    Usage: docker inspect [OPTIONS] NAME|ID [NAME|ID...]
    ...
    ```

    <br/>

* inspect ๋ช๋ น์ด๋ก centos ์ด๋ฏธ์ง์ ์ ๋ณด๋ฅผ ํ์ธํด๋ณด์.

    ```cs
    nasa1515@nasa:~$ docker inspect centos:latest
    ...
            "Config" : {
                ...
                "CMD" : [
                    "/bin/bash"
                ],
                ...
                "Volumes": null,
                "WorkinDir": "",
                "Entrypoint" : null,
            ...
            "RootFS" : {
                "Type" : "layers",
                "Layers" : [
                
            "sha256:0d120b6ccaa8c5e149176798b3501d4dd1885f961922497cd0abef155c869566"
    ...
    ```
    ์ถ๋ ฅ๋ ๋ถ๋ถ ์ค ์ดํ ํฌ์คํธ์์ ํ์ํ ๋ถ๋ถ๋ง ๋์ดํ์๋ค.  

    - ``Config`` : ์น์์ cmd๋ ์ด๋ฏธ์ง๋ฅผ ์ปจํ์ด๋๋ก ์์ฑํ  ๋ ์คํํ๋ ์ ํ๋ฆฌ์ผ์ด์์ด๋ค.
    - ``Volumes``: ๋์ปค ๋ณผ๋ฅจ๊ณผ ๊ด๋ จ๋ ๋ด์ฉ์ด๋ค. 
    - ``WorkingDir`` : ์ปจํ์ด๋์ ์ ๊ทผํ์ ๋์ ๋๋ ํ ๋ฆฌ
    - ``Entrypoint`` : cmd์ ๋ง์ฐฌ๊ฐ์ง๊ณ  ์คํ ํ  ์ ํ๋ฆฌ์ผ์ด์์ด๋ค cmd์ Entry๊ฐ ํจ๊ป ์์ผ๋ฉด  
    Entry๋ ``๋ช๋ น``, cmd๋ ``์ธ์``์ฒ๋ผ ๋์ํ๋ค.
    - ``RootFS`` : ๋ ์ด์ด๋ฅผ ๋ํ๋ธ๋ค. 

    <br/>

---

* ``docker save/load``  ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํด ํธ์คํธ์ ์ ์ฅ๋ ์ด๋ฏธ์ง๋ฅผ ๋ณต์ฌ, ๋ถ๋ฌ์ฌ ์ ์์ต๋๋ค.  
    ๋ช๋ น์ด์ ์ฌ์ฉ๋ฒ์ ์๋์ ๊ฐ์ต๋๋ค.

    ```cs
    # docker save --help

    Usage: docker save [OPTIONS] IMAGE [IMAGE...]
    ...

    # docker load --help

    Usage: docker load [OPTIONS]
    ...
    ```

    <br/>


* docker save ๋ช๋ น์ ``-o ์ต์``์ ์ฌ์ฉํด ํ์ผ์ ๊ฒฝ๋ก๋ฅผ ์ง์ ํด์ผํ๋ค.

    centos ์ด๋ฏธ์ง๋ฅผ ์์นด์ด๋ธ ํ์ผ๋ก ๋ณต์ฌํ๊ณ  ๋ด์ฉ์ ํ์ธํด๋ณด์๋ค.
    ```cs
    nasa1515@nasa:~$ docker save -o img.tar centos:latest
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ tar tf img.tar
    0d120b6ccaa8c5e149176798b3501d4dd1885f961922497cd0abef155c869566.json
    42f3938b740e458a1d119b6af08468e05a60bce967245f990cf205b99d7b2eee/
    42f3938b740e458a1d119b6af08468e05a60bce967245f990cf205b99d7b2eee/VERSION
    42f3938b740e458a1d119b6af08468e05a60bce967245f990cf205b99d7b2eee/json
    42f3938b740e458a1d119b6af08468e05a60bce967245f990cf205b99d7b2eee/layer.tar
    manifest.json
    repositories
    ```

    <br/>

* saveํ ์ด๋ฏธ์ง๋ฅผ ํ์คํธ ํ๊ธฐ ์ํด ๊ธฐ์กด์ ์ค์น๋์ด ์๋ ์ด๋ฏธ์ง๋ฅผ ์ญ์ ํ๋ค

    ```cs
    nasa1515@nasa:~$ docker rmi hello-world httpd centos
    Untagged: centos:latest
    Untagged: centos@sha256:76d24f3ba3317fa945743bb3746fbaf3a0b752f10b10376960de01da70685fbd
    Deleted: sha256:0d120b6ccaa8c5e149176798b3501d4dd1885f961922497cd0abef155c869566
    Deleted: sha256:291f6e44771a7b4399b0c6fb40ab4fe0331ddf76eda11080f052b003d96c7726

    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker images
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    ```

    <br/>

* ์์นด์ด๋ธ ํ์ผ๋ก ์ด๋ฏธ์ง๋ฅผ ๋ก๋ ํ ํ์ธ

    ```cs
    nasa1515@nasa:~$ docker load -i img.tar 
    291f6e44771a: Loading layer [==================================================>]  222.4MB/222.4MB
    Loaded image: centos:latest
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker images
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    centos              latest              0d120b6ccaa8        6 days ago          215MB
    ```

    <br/>

----

## ๐ ๋์ปค ํ๋ธ๋ฅผ ํตํ ์ด๋ฏธ์ง ์๋ก๋, ๋ค์ด๋ก๋

* ๋์ปค ์ด๋ฏธ์ง ์์ฑ  
๋จผ์  commit_nasa๋ผ๋ centos ์ปจํ์ด๋๋ฅผ ํ๋ ๋ง๋ค๋๋ก ํ๊ฒ ์ต๋๋ค.

    ```cs
    student@cccr:~$ docker run -itd --name commit_nasa centos:latest
    c4ce10edca0febaddc49c07b31290f542ff2c49751cb16ce0666bc1eac12d6c2
    ```

* ๊ธฐ์กด์ ์๋ ์ด๋ฏธ์ง๋ก ์๋ก์ด ์ด๋ฏธ์ง๋ฅผ ๋ง๋ค๊ธฐ ์ํด์๋ ``docker commit`` ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํ๋ฉด ๋ฉ๋๋ค.

    [๋ฐฐํฌ ํ์คํธ๋ฅผ ์ํ ์ด๋ฏธ์ง๋ฅผ ํ๋ ์์ฑํ๊ฒ ์ต๋๋ค.]
    ```cs
    nasa1515@nasa:~$ docker commit \
    > -a "nasa1515" \                   # -a: author, ์ด๋ฏธ์ง์ ์์ฑ์
    > -m "commit nasa1515" \            # -m: messages, ์ปค๋ฐ ๋ฉ์์ง
    > commit_nasa \                     # ๋ณต์ฌํ๊ณ ์ ํ๋ ์ด๋ฏธ์ง
    > nasa1415/centos:nasa1515          # ์ด๋ฏธ์ง:[ํ๊ทธ], ํ๊ทธ ์๋ต์ 'latest'๋ก ๋ถ์
    sha256:7f1b0822d1522842d953acb5bea0e4d1481f68d690fe5fc5d6255e58a976c447
    ------------------------------------------------------------------------------
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker images
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    nasa1415/centos     nasa1515            1fec0eefcf65        4 minutes ago       215MB
    centos              latest              0d120b6ccaa8        6 days ago          215MB
    ```

    <br/>

### ์ด๋ฏธ์ง ๋ฐฐํฌ  
๋ง๋ค์ด์ง ์ด๋ฏธ์ง๋ฅผ ๋ฐฐํฌํ๊ธฐ ์ํด ๋์ปค ํ๋ธ ์ด๋ฏธ์ง ์ ์ฅ์๋ฅผ ์ฌ์ฉํฉ๋๋ค.

์ผ๋จ https://hub.docker.com๋ก ๋ค์ด๊ฐ์ ๋ก๊ทธ์ธ์ ํฉ๋๋ค.  
[ํ์๊ฐ์์ ์๋ฃ ํ๋ค๋ฉด ์๋์ ๊ฐ์ด ์ ์ฅ์๊ฐ ์์ฑ๋์์ ๊ฒ๋๋ค]
![์คํฌ๋ฆฐ์ท, 2020-08-17 12-06-53](https://user-images.githubusercontent.com/69498804/90353781-26d3b380-e082-11ea-95ed-7172e61c65fb.png)

<br/>


* ๋ฐฐํฌ ์  ``docker login`` ๋ช๋ น์ ์ฌ์ฉํด ๋ก๊ทธ์ธํด์ค๋๋ค.  

    ```cs
    nasa1515@nasa:~$ docker login
    Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
    Username: nasa1415
    Password: 
    WARNING! Your password will be stored unencrypted in /home/student/.docker/config.json.
    Configure a credential helper to remove this warning. See
    https://docs.docker.com/engine/reference/commandline/login/#credentials-store

    Login Succeeded
    ```

    <br/>

* ``docker push`` ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํด ์๋ก๋ ํด์ค๋๋ค.  

    ```cs
    $ docker push [์ด๋ฏธ์ง ์ด๋ฆ]
    
    
    nasa1515@nasa:~$ docker push nasa1415/centos:nasa1515
    The push refers to repository [docker.io/nasa1415/centos]
    291f6e44771a: Pushed 
    nasa1515: digest: sha256:77e7c29b5f9a493a64b981ab17d6d8b0efe5352da325f7f8f78f9101b1d5439b size: 529
    
    ```
    

    <br/>

* ๋ง์ฝ github์ ์์ฑํ ์ ์ฅ์ ์ด๋ฆ๊ณผ ์ด๋ฏธ์ง์ ํ๊ทธ๊ฐ ๋ค๋ฅด๋ฉด ์๋ก๋๊ฐ ๋ถ๊ฐํฉ๋๋ค.

    ```cs
    student@cccr:~$ docker push nasa1515/centos
    The push refers to repository [docker.io/nasa1515/centos]
    291f6e44771a: Preparing 
    denied: requested access to the resource is denied
    ```

    <br/>

* ``push`` ์ดํ ์ ์์ ์ผ๋ก gibhub ์ ์ฅ์์ ์ฌ๋ผ๊ฐ์์ ํ์ธ ํ  ์ ์์ต๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-08-17 12-27-51](https://user-images.githubusercontent.com/69498804/90354728-153fdb00-e085-11ea-8bee-7b5aa925e77c.png)

    <br/>

----

### ์ด๋ฏธ์ง ๋ค์ด๋ก๋  

* ์ฌ๋ ค๋์ ์ด๋ฏธ์ง๋ฅผ ํ์ธํ๊ธฐ ์ํด ๊ธฐ์กด host์ ์ด๋ฏธ์ง๋ฅผ ์ ๋ถ ์ญ์   

    ```cs
    nasa1515@nasa:~$ docker images
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    ```

    <br/>

* ``docker pull`` ๋ช๋ น์ด๋ฅผ ์ด์ฉํด ์ ์ฅ์์ ์ด๋ฏธ์ง๋ฅผ ๋ค์ด๋ก๋

    ```cs
    nasa1515@nasa:~$ docker pull nasa1415/centos:nasa1515
    nasa1515: Pulling from nasa1415/centos
    3c72a8ed6814: Pull complete 
    Digest: sha256:77e7c29b5f9a493a64b981ab17d6d8b0efe5352da325f7f8f78f9101b1d5439b
    Status: Downloaded newer image for nasa1415/centos:nasa1515
    docker.io/nasa1415/centos:nasa1515
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker images
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    nasa1415/centos     nasa1515            1fec0eefcf65        About an hour ago   215MB
    ```

---

```toc
```