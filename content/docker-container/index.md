---
emoji: π€¦ββοΈ
title: "[DOCKER] - CONTAINER"
date: "2021-06-26 00:07:25"
author: nasa1515
tags: DevOps
categories: DevOps
---

λ¨Έλ¦¬λ§  

μ΄μ  ν¬μ€νΈμμλ λμ»€μ μ΄λ‘ μ μ΄ λ΄μ©μ λν΄μ κ°λ¨νκ² μ λ¦¬ν ν¬μ€νμ νμμ΅λλ€.  
μ΄λ² ν¬μ€νΈμμλ μ΄λ―Έμ§λ₯Ό μ΄μ©ν΄μ μ€μ  λμ»€μ μ»¨νμ΄λ μμ± κ΄λ¦¬ λ°©λ²κ³Ό κ·Έμ κ΄λ ¨λ λͺλ Ήμ΄λ€μ ν¬μ€νΈ νμ΅λλ€.


---

## β λμ»€ μ»¨νμ΄λ

λλμ΄ μ»¨νμ΄λλ₯Ό μ€νν΄ λ³΄λ €κ³  ν©λλ€.  
μ»¨νμ΄λμ μλν¨μ λ³΄κΈ°μν΄ μ¬λ¬κ°μ νλ‘κ·Έλ¨μ λ§κ΅¬μ‘μ΄λ‘ λμλ³΄κ² μ΅λλ€.

* μ»¨νμ΄λλ₯Ό μ€ννλ λͺλ Ήμ΄λ λ€μκ³Ό κ°μ΅λλ€.

    ```cs
    docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
    ```

    <br/>

* λ€μμ μμ£Ό μ¬μ©νλ μ΅μλ€μλλ€.

    ```cs
    [μ΅μ]	[μ€λͺ]
    -d	    detached mode νν λ§νλ λ°±κ·ΈλΌμ΄λ λͺ¨λ
    -p	    νΈμ€νΈμ μ»¨νμ΄λμ ν¬νΈλ₯Ό μ°κ²° (ν¬μλ©)
    -v	    νΈμ€νΈμ μ»¨νμ΄λμ λλ ν λ¦¬λ₯Ό μ°κ²° (λ§μ΄νΈ)
    -e	    μ»¨νμ΄λ λ΄μμ μ¬μ©ν  νκ²½λ³μ μ€μ 
    βname	μ»¨νμ΄λ μ΄λ¦ μ€μ 
    βrm	    νλ‘μΈμ€ μ’λ£μ μ»¨νμ΄λ μλ μ κ±°
    -it	    -iμ -tλ₯Ό λμμ μ¬μ©ν κ²μΌλ‘ ν°λ―Έλ μλ ₯μ μν μ΅μ
    βlink	μ»¨νμ΄λ μ°κ²° [μ»¨νμ΄λλͺ:λ³μΉ­]
    ```

    <br/>

* Ubuntu OS κΈ°λ°μ μ»¨νμ΄λλ₯Ό μμ±ν΄λ³΄κ² μ΅λλ€.

    ```cs
    nasa1515@nasa:/$ docker run ubuntu:16.04
    Unable to find image 'ubuntu:16.04' locally
    16.04: Pulling from library/ubuntu
    7b378fa0f908: Pull complete 
    4d77b1b29f2e: Pull complete 
    7c793be88bae: Pull complete 
    ecc05c8a19c0: Pull complete 
    Digest: sha256:0eb024b1147ab61246cfdbdf05c128550ede262790b25a8a6fd93dd3385ab1c8
    Status: Downloaded newer image for ubuntu:16.04
    ```

    ``run``λͺλ Ήμ΄λ₯Ό μ¬μ©νλ©΄ μ¬μ©ν  μ΄λ―Έμ§κ° μ μ₯λμ΄ μλμ§ νμΈνκ³  μλ€λ©΄  
    λ€μ΄λ‘λ``(pull)``λ₯Ό ν ν μ»¨νμ΄λλ₯Ό ``μμ±(create)``νκ³  ``μμ(start)`` ν©λλ€.

    μ μμ λ ``ubuntu:16.04`` μ΄λ―Έμ§λ₯Ό λ€μ΄λ°μ μ μ΄ μκΈ° λλ¬Έμ μ΄λ―Έμ§λ₯Ό λ€μ΄λ‘λ ν ν μ»¨νμ΄λκ° μ€νλμμ΅λλ€.  
    μ»¨νμ΄λλ μ μμ μΌλ‘ μ€νλμ§λ§ μ€νμ λν λͺλ Ήμ΄λ₯Ό μ λ¬νμ§ μμκΈ° λλ¬Έμ μ»¨νμ΄λλ μμ±λμλ§μ μ’λ£λ©λλ€.  
    μ»¨νμ΄λλ νλ‘μΈμ€μ΄κΈ° λλ¬Έμ μ€νμ€μΈ νλ‘μΈμ€κ° μμΌλ©΄ μ»¨νμ΄λλ μ’λ£λ©λλ€.

    <br/>

* μ΄λ²μλ BASH μ μ€ν λͺλ Ήμ λ£μ΄ μμ±ν΄λ³΄κ² μ΅λλ€.


    ```cs
    nasa1515@nasa:/$ 
    nasa1515@nasa:/$ docker run --rm -it ubuntu:16.04 /bin/bash
    root@ddc99f1734ab:/# 
    root@ddc99f1734ab:/# cat /etc/*-release | grep -i version
    VERSION="16.04.6 LTS (Xenial Xerus)"
    VERSION_ID="16.04"
    VERSION_CODENAME=xenial
    root@ddc99f1734ab:/# 
    root@ddc99f1734ab:/# exit
    exit
    ```
    μ»¨νμ΄λ λ΄λΆμ λ€μ΄κ°κΈ° μν΄ ``bash μ``μ μ€ννκ³  ν€λ³΄λ μλ ₯μ μν΄ ``-it μ΅μ``μ μ€λλ€.  
    μΆκ°μ μΌλ‘ νλ‘μΈμ€κ° μ’λ£λλ©΄ μ»¨νμ΄λκ° μλμΌλ‘ μ­μ λλλ‘ ``--rm`` μ΅μλ μΆκ°νμμ΅λλ€.

    λ°λ‘ μ  μ΄λ―Έμ§λ₯Ό λ€μ΄ λ°μκΈ° λλ¬Έμ λ€μ΄λ‘λ μμ΄ λ°λ‘ μ€νλμμ΅λλ€.   
    cat /etc/*-release λͺλ Ήμ΄λ₯Ό μ€νν΄λ³΄λ©΄ ubuntu λ¦¬λμ€μΈκ±Έ μ μ μμ΅λλ€.  

    ----


* ### redis container

    2λ²μ§Έλ‘ redisλ₯Ό μ¬μ©ν΄ μ»¨νμ΄λλ₯Ό μμ±ν΄λ³΄κ² μ΅λλ€. redisλ λ©λͺ¨λ¦¬κΈ°λ°μ λ€μν κΈ°λ₯μ κ°μ§ μ€ν λ¦¬μ§μλλ€.  
    6379 ν¬νΈλ‘ ν΅μ νλ©° telnet λͺλ Ήμ΄λ‘ νμ€νΈν΄ λ³Ό μ μμ΅λλ€.  
    redis μ»¨νμ΄λλ λ°±κ·ΈλΌμ΄λ λͺ¨λλ‘ μ€ννκΈ° μν΄ ``-d μ΅μ``μ μΆκ°νκ³  ``-p μ΅μ``μ μΆκ°νμ¬  
    μ»¨νμ΄λμ ν¬νΈλ₯Ό νΈμ€νΈμ ν¬νΈλ‘ μ°κ²°ν΄λ³΄κ² μ΅λλ€.

    ``-d μ΅μ``μ΄ μλ€λ©΄ νλ‘μΈμ€κ° ``foreground``λ‘ μ€νλμ΄ μλ¬΄ν€λ μλ ₯ν  μ μκ² λ©λλ€.  
μ»¨νμ΄λλ₯Ό μ’λ£νλ €λ©΄ ctrl + cλ₯Ό μλ ₯ν΄ μ£ΌμΈμ.


    ```cs
    nasa1515@nasa:/$ docker run -d -p 1234:6379 redis
    Unable to find image 'redis:latest' locally
    latest: Pulling from library/redis
    bf5952930446: Pull complete 
    911b8422b695: Pull complete 
    093b947e0ade: Pull complete 
    5b1d5f59e382: Pull complete 
    7a5f59580c0b: Pull complete 
    f9c63997c980: Pull complete 
    Digest: sha256:09c33840ec47815dc0351f1eca3befe741d7105b3e95bc8fdb9a7e4985b9e1e5
    Status: Downloaded newer image for redis:latest
    e0a912150d3eb6cdaeda5a643c3969775adf2d2d2e64862e9053dc99d936a1b4
    nasa1515@nasa:/$ 
    nasa1515@nasa:/$ telnet localhost 1234
    Trying 127.0.0.1...
    Connected to localhost.
    Escape character is '^]'.

    set mykey nasa
    +OK
    get mykey
    $4
    nasa
    quit
    +OK
    Connection closed by foreign host.
    ```

    ``-d μ΅μ``μ μ£ΌμκΈ° λλ¬Έμ μ»¨νμ΄λλ₯Ό μ€ννμλ§μ μ»¨νμ΄λμ ID(e0a9121β¦)λ₯Ό λ³΄μ¬μ£Όκ³  λ°λ‘ μλ‘ λμμμ΅λλ€.  
    μ»¨νμ΄λλ μ’λ£λ κ²μ΄ μλλΌ λ°±κ·ΈλΌμ΄λ λͺ¨λλ‘ λμνκ³  μκ³  μ»¨νμ΄λ IDλ₯Ό μ΄μ©νμ¬ μ»¨νμ΄λλ₯Ό μ μ΄ν  μ μμ΅λλ€.  
    ``-p μ΅μ``μ μ΄μ©νμ¬ νΈμ€νΈμ 1234ν¬νΈλ₯Ό μ»¨νμ΄λμ 6379ν¬νΈλ‘ μ°κ²°νμκ³  localhostμ 1234ν¬νΈλ‘ μ μνλ©΄ νλ©΄ redisλ₯Ό μ¬μ©ν  μ μμ΅λλ€.

* νμ€νΈ κ²°κ³Ό  
    redisμ μ μνμ¬ μλ‘μ΄ ν€λ₯Ό μ μ₯νκ³  λΆλ¬μ€λλ° μ±κ³΅νμ΅λλ€. μ€νμ΄ κ°λ¨νκ±΄ λ¬Όλ‘ μ΄κ³  νΈμ€νΈμ ν¬νΈλ§ λ€λ₯΄κ² νλ©΄  
    νλμ μλ²μ μ¬λ¬κ°μ redis μλ²λ₯Ό λμ°λ κ²λ λ§€μ° κ°λ¨ν©λλ€.


<br/>

----

* ### MySQL 5.7 container  

    μ΄λ²μ μ€νν  μ»¨νμ΄λλ MySQL μλ²μλλ€.  
    νν μ¬μ©λλ λ°μ΄ν°λ² μ΄μ€μΈλ° μ΄λ²μλ ``-e μ΅μ``μ μ΄μ©νμ¬ νκ²½λ³μλ₯Ό μ€μ νκ³  ``--name μ΅μ``μ μ΄μ©ν΄  
    μ»¨νμ΄λμ μ½κΈ° μ΄λ €μ΄ ID λμ  μ¬μ΄ μ΄λ¦μ λΆμ¬ν  μμ μλλ€.

    ``--nameμ΅μ``μ μλ΅νλ©΄ λμ»€κ° μλμΌλ‘ μ΄λ¦μ μ§μ΄ μ€λλ€.  
    μ΄λ¦μ μ λͺν κ³Όνμλ ν΄μ»€μ μ΄λ¦κ³Ό μμμ΄λ₯Ό μ‘°ν©νμ¬ λλ€μΌλ‘ μμ±ν©λλ€.  
    (ex - boring_wozniak) μ°λ¦¬λλΌ κ³Όνμ μ₯μμ€λ λ±λ‘λμ΄ μμ΅λλ€.

    MySQL Docker hub νμ΄μ§μ μ μνλ©΄ κ°λ¨ν μ¬μ©λ²κ³Ό νκ²½λ³μμ λν μ€λͺμ΄ μμ΅λλ€.  
    μ¬λ¬κ°μ§ μ€μ κ°μ΄ μλλ° ν¨μ€μλ μμ΄ rootκ³μ μ λ§λ€κΈ° μν΄ ``MYSQL_ALLOW_EMPTY_PASSWORD`` νκ²½λ³μλ₯Ό μ€μ ν©λλ€.  
    κ·Έλ¦¬κ³  μ»¨νμ΄λμ μ΄λ¦μ nasa-mysqlλ‘ ν λΉνκ³  λ°±κ·ΈλΌμ΄λ λͺ¨λλ‘ λμ°κΈ° μν΄ ``-d μ΅μ``μ μ€λλ€.  
    ν¬νΈλ ``3306ν¬νΈ``λ₯Ό νΈμ€νΈμμ κ·Έλλ‘ μ¬μ©νκ² μ΅λλ€.

    ```cs
    nasa1515@nasa:/$ docker run -d -p 3306:3306 \
    > -e MYSQL_ALLOW_EMPTY_PASSWORD=true \
    > --name nasa-mysql \
    > mysql:5.7
    Unable to find image 'mysql:5.7' locally
    5.7: Pulling from library/mysql
    bf5952930446: Already exists 
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
    64e17595fca839d513c7c5bab4d6c624cc5fa729dec66881ca66aa61e2bee571
    nasa1515@nasa:/$ 
    nasa1515@nasa:/$ mysql -h 127.0.0.1 -uroot
    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 2
    Server version: 5.7.31 MySQL Community Server (GPL)

    Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    mysql> show databases;
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | mysql              |
    | performance_schema |
    | sys                |
    +--------------------+
    4 rows in set (0.00 sec)

    mysql>
    ```

    <br/>

* CPU, MEMORY μ ν  

  μ΄λ²μλ μ»¨νμ΄λλ₯Ό μμ±ν λ ``λ©λͺ¨λ¦¬μ CPU μ¬μ©λ₯ ``μ μ ν νλ κ²μλλ€.  
    DOCKERλ νΈμ€νΈμ μμμ μ¬μ©νκΈ° λλ¬Έμ μ¬λ¬λμ μ»¨νμ΄λλ₯Ό μμ±νκΈ° μν΄μ  νμ μ μΈ μ΅μμλλ€.  

    <br/>

*   CPU μ ν CENTOS  μμ±

    ```cs
    nasa1515@cccr:/$ docker run -it --name nasa-cpu --cpus 0.3 centos:latest
    [root@0c9cc5567f06 /]# dd if=/dev/zero of=/dev/null &

    ------------------------------------------------------------------------
    nasa1515@cccr:~$ docker stats
    CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS
    0c9cc5567f06        nasa-cpu            29.93%              3.555MiB / 9.709GiB   0.04%               4.72kB / 0B         0B / 0B             2
    fa06266704bc        nasa-centos         0.00%               3.066MiB / 9.709GiB   0.03%               13.3kB / 0B         0B / 0B             1
    e0a912150d3e        jovial_wing         0.13%               4.059MiB / 9.709GiB   0.04%               36.6kB / 772B       0B / 0B             5
    ```
    μμ±ν ``nasa-cpu`` μ»¨νμ΄λμ dd λͺλ ΉμΌλ‘ λΆνλ₯Ό λ°μμν€κ³  νμΈν΄λ³΄μλ€.  
    μ€μ ν ``0.3 (30%)`` κ° μ΄μμΌλ‘ cpuλ₯Ό μ¬μ©νκ³  μμ§ μμμ νμΈ.

    <br/>

*   MEMORY μ ν CENTOS  μμ±

    ```cs
    nasa1515@cccr:/$ docker run -itd --name nasa-memory --memory 1024m centos:latest
    WARNING: Your kernel does not support swap limit capabilities or the cgroup is not mounted. Memory limited without swap.
    d387c47fa6b81d23871656d52448c465ad51abae02e2115f865890321ae2b82c

    nasa1515@cccr:~$ docker stats --no-stream
    CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS
    d387c47fa6b8        nasa-memory         0.00%               3.164MiB / 1GiB       0.31%               4.44kB / 0B         0B / 0B             1
    fa06266704bc        nasa-centos         0.00%               3.066MiB / 9.709GiB   0.03%               16.8kB / 0B         0B / 0B             1
    e0a912150d3e        jovial_wing         0.15%               4.059MiB / 9.709GiB   0.04%               40.2kB / 772B       0B / 0B             5

    ```

    nasa-momory μ»¨νμ΄λλ₯Ό ``1024(1G)``μ λ©λͺ¨λ¦¬λ§ λΆμ¬ν λ€ μμν΄λ³΄μλ€.  
    ``docker stats --no-stream`` λͺλ Ήμ΄λ₯Ό ν΅ν΄ νμΈν κ²°κ³Ό  
    μ μ©ν λ©λͺ¨λ¦¬λ§νΌλ§ λΆμ¬λμ΄ μ»¨νμ΄λκ° μμ±λ¨μ νμΈνμλ€.
    
    <br/>

*   ``update`` λͺλ Ήμ΄λ‘ μ»¨νμ΄λ μ ν μλ°μ΄νΈ  
    update λͺλ Ήμ΄λ₯Ό μ΄μ©νλ©΄ μ΄λ―Έ μ€νμ€μΈ μ»¨νμ΄λμ μ€μ μ λ³κ²½ ν  μ μλ€.  
    μμ μμ±ν nasa-memory μ»¨νμ΄λμ λ©λͺ¨λ¦¬λ₯Ό ``2G``λ‘ λ³κ²½ν΄λ³΄κ² λ€.

    ```cs
    nasa1515@nasa:~$ docker update --memory 2048m nasa-memory
    nasa-memory
    Your kernel does not support swap limit capabilities or the cgroup is not mounted. Memory limited without swap.
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker stats --no-stream
    CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS
    d387c47fa6b8        nasa-memory         0.00%               3.164MiB / 2GiB       0.15%               8.96kB / 0B         0B / 0B             1
    fa06266704bc        nasa-centos         0.00%               3.066MiB / 9.709GiB   0.03%               20.5kB / 0B         0B / 0B             1
    e0a912150d3e        jovial_wing         0.13%               4.285MiB / 9.709GiB   0.04%               43.6kB / 772B       0B / 4.1kB          5
    ```

<br/>

---

##  β λμ»€ κΈ°λ³Έ λͺλ Ήμ΄ 
μμμ λμ»€μ run λͺλ Ήμ΄λ₯Ό μ΄μ©νμ¬ μ¬λ¬κ°μ μ»¨νμ΄λλ₯Ό μ€ννμ΅λλ€.  
μ΄μ  μ»¨νμ΄λμ μνλ₯Ό μ΄ν΄λ³΄κ³  μ΄λ€ μ΄λ―Έμ§κ° μ€μΉλμ΄ μλμ§ νμΈνλ λͺλ Ήμ΄λ₯Ό μμλ΄λλ€.

* μ»¨νμ΄λ λͺ©λ‘ νμΈνκΈ° ``(ps)``  
μ»¨νμ΄λ λͺ©λ‘μ νμΈνλ λͺλ Ήμ΄λ λ€μκ³Ό κ°μ΅λλ€

    ```cs
    $ docker ps --help

    Usage: docker ps [OPTIONS]
    ```

    ```cs
    nasa1515@nasa:/$ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
    64e17595fca8        mysql:5.7           "docker-entrypoint.sβ¦"   7 minutes ago       Up 7 minutes        0.0.0.0:3306->3306/tcp, 33060/tcp   nasa-mysql
    e0a912150d3e        redis               "docker-entrypoint.sβ¦"   18 minutes ago      Up 18 minutes       0.0.0.0:1234->6379/tcp              jovial_wing
    nasa1515@nasa:/$ 

    ```

    μΆλ ₯λ νλμ λν μ€λͺμ λ€μκ³Ό κ°μ΅λλ€. 

    *   ``CONTAINER ID`` : μ»¨νμ΄λμ κ³ μ  ID
    *   ``IMAGE`` : μ»¨νμ΄λκ° μ¬μ©νλ μ΄λ―Έμ§
    *   ``COMMAND`` : μ»¨νμ΄λμμ μ€νμ€μΈ μ νλ¦¬μΌμ΄μ
    *   ``CREATED`` : μ»¨νμ΄λκ° μμ±λ λ μ§
    *   ``STATUS`` : μ»¨νμ΄λμ μν
    *   ``PORTS``: μ»¨νμ΄λμμ μ¬μ© μ€μΈ ν¬νΈ
    *   ``NAMES`` : μ»¨νμ΄λμ μ΄λ¦

    <br/>

* ``-a μ΅μ``μ λ£μ΄ μ€νν΄λ³΄κ² μ΅λλ€

    ```cs
    nasa1515@nasa:/$ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                               NAMES
    64e17595fca8        mysql:5.7           "docker-entrypoint.sβ¦"   11 minutes ago      Up 11 minutes               0.0.0.0:3306->3306/tcp, 33060/tcp   nasa-mysql
    e0a912150d3e        redis               "docker-entrypoint.sβ¦"   21 minutes ago      Up 21 minutes               0.0.0.0:1234->6379/tcp              jovial_wing
    f481493bd3b2        ubuntu:16.04        "/bin/bash"              46 minutes ago      Exited (0) 46 minutes ago                                       nifty_chatterjee
    nasa1515@nasa:/$ 
    ```

    μ΄μ μ μ€ννλ€κ° μ’λ£λ μ»¨νμ΄λ(Exited (0))κ° μΆκ°λ‘ λ³΄μλλ€. μ»¨νμ΄λλ μ’λ£λμ΄λ μ­μ λμ§ μκ³  λ¨μμμ΅λλ€.  
    μ’λ£λ κ±΄ λ€μ μμν  μ μκ³  μ»¨νμ΄λμ μ½κΈ°/μ°κΈ° λ μ΄μ΄λ κ·Έλλ‘ μ‘΄μ¬ν©λλ€.  
    λͺμμ μΌλ‘ μ­μ λ₯Ό νλ©΄ κΉλνκ² μ»¨νμ΄λκ° μ κ±°λ©λλ€.


    <br/>

* μ»¨νμ΄λ μ€μ§νκΈ° ``(stop)``  
μ€νμ€μΈ μ»¨νμ΄λλ₯Ό μ€μ§νλ λͺλ Ήμ΄λ λ€μκ³Ό κ°μ΅λλ€.

    ```cs
    docker stop [OPTIONS] CONTAINER [CONTAINER...]
    ```

    μ΅μμ νΉλ³νκ² μκ³  μ€νμ€μΈ μ»¨νμ΄λλ₯Ό νλ λλ μ¬λ¬κ° (λμ΄μ°κΈ°λ‘ κ΅¬λΆ) μ€μ§ν  μ μμ΅λλ€.

    μμμ μ€νν mysql μ»¨νμ΄λλ λμ΄μ νμκ° μμΌλ μ€μ§ν΄ λ³΄κ² μ΅λλ€.  
    μ€μ§νλ €λ©΄ μ»¨νμ΄λμ ID λλ μ΄λ¦μ μλ ₯νλ©΄ λ©λλ€. mysql μ»¨νμ΄λμ IDλ₯Ό psλͺλ Ήμ ν΅ν΄ νμΈνκ³  μ€μ§ν΄ λ΄λλ€.

    <br/>

* μ€ν μ€μΈ MYSQL μ»¨νμ΄λ νμΈ

    ```cs
    nasa1515@nasa:/$ docker ps 
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
    64e17595fca8        mysql:5.7           "docker-entrypoint.sβ¦"   15 minutes ago      Up 15 minutes       0.0.0.0:3306->3306/tcp, 33060/tcp   nasa-mysql
    e0a912150d3e        redis               "docker-entrypoint.sβ¦"   25 minutes ago      Up 25 minutes       0.0.0.0:1234->6379/tcp              jovial_wing
    ```

    <br/>

* μ€μ§ ν νμΈ

    ```cs
    nasa1515@nasa:/$ docker stop nasa-mysql
    nasa-mysql
    nasa1515@nasa:/$ 
    nasa1515@nasa:/$ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    e0a912150d3e        redis               "docker-entrypoint.sβ¦"   26 minutes ago      Up 26 minutes       0.0.0.0:1234->6379/tcp   jovial_wing
    ```

    <br/>

* μ»¨νμ΄λ μ κ±°νκΈ° ``(rm)``  
μ’λ£λ μ»¨νμ΄λλ₯Ό μμ ν μ κ±°νλ λͺλ Ήμ΄λ λ€μκ³Ό κ°μ΅λλ€.
    
    ```cs
    docker rm [OPTIONS] CONTAINER [CONTAINER...]
    ```

    μ’λ£ λͺλ Ήμ΄λ μ΅μμ νΉλ³νκ² μμ΅λλ€.  
    μ’λ£λ μ»¨νμ΄λλ₯Ό νλ λλ μ¬λ¬κ° μ­μ ν  μ μμ΅λλ€.  
    μ’λ£λ ``ubuntu`` μ»¨νμ΄λμ ``mysql`` μ»¨νμ΄λλ₯Ό μ­μ ν΄λ³΄κ² μ΅λλ€.

    <br/>

* ``-a`` μ΅μμμ λ³΄μ΄λ κ²μ νμΈ

    ```cs
    nasa1515@nasa:/$ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                    NAMES
    64e17595fca8        mysql:5.7           "docker-entrypoint.sβ¦"   18 minutes ago      Exited (0) 2 minutes ago                             nasa-mysql
    e0a912150d3e        redis               "docker-entrypoint.sβ¦"   28 minutes ago      Up 28 minutes               0.0.0.0:1234->6379/tcp   jovial_wing
    f481493bd3b2        ubuntu:16.04        "/bin/bash"              53 minutes ago      Exited (0) 53 minutes ago                            nifty_chatterjee
    ```

    <br/>

* μ­μ  ν νμΈ

    ```cs
    nasa1515@nasa:/$ docker rm nasa-mysql
    nasa-mysql
    nasa1515@nasa:/$ docker rm nifty_chatterjee
    nifty_chatterjee
    nasa1515@nasa:/$ 
    nasa1515@nasa:/$ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    e0a912150d3e        redis               "docker-entrypoint.sβ¦"   29 minutes ago      Up 29 minutes       0.0.0.0:1234->6379/tcp   jovial_wing
    nasa1515@nasa:/$ 
    ```

    μ»¨νμ΄λκ° λ§λν μ­μ λμμ΅λλ€.  
    νΈμ€νΈ OSλ μλ¬΄λ° νμ λ λ¨μμμ§ μκ³  μ»¨νμ΄λλ§ κ²©λ¦¬λ μνλ‘ μ€νλμλ€κ° μ­μ λμμ΅λλ€.  
    μμ€νμ΄ κΌ¬μΌ κ±±μ μ΄ μ ν μμ΅λλ€.

    μ€μ§λ μ»¨νμ΄λλ₯Ό μΌμΌμ΄ μ­μ  νλ κ±΄ κ·μ°?μ μΌμλλ€.  
    ``docker rm -v $(docker ps -a -q -f status=exited)`` λͺλ Ήμ΄λ₯Ό μλ ₯νλ©΄  
    μ€μ§λ μ»¨νμ΄λ IDλ₯Ό κ°μ Έμμ νλ²μ μ­μ ν©λλ€.

<br/>

----

## π μ»¨νμ΄λ κ΄λ¦¬ λͺλ Ήμ΄

μμμ λμ»€μ λν μμ£Όμμ£Όμμ£Ό κΈ°λ³Έμ μΈ λͺλ Ήμ΄λ₯Ό μ΄ν΄λ³΄μμ΅λλ€.  
μ¬μ€ μ  λͺλ Ήμ΄λ€κ³Ό μ΄λ²μ μ΄ν΄λ³Ό log, exec λͺλ Ήμ΄λ₯Ό μ΅νλ©΄  
λμ»€μμ μ¬μ©νλ λͺλ Ήμ΄λ κ±°μ λ€ μ΅νλ€κ³  ν  μ μμ΅λλ€. λ€λ₯Έ λͺλ Ήμ΄λ νμμ λ°λΌ νλνλ μ΄ν΄λ³΄λ©΄ λ©λλ€.


* μ»¨νμ΄λ λ‘κ·Έ λ³΄κΈ° ``(logs)``  
μ»¨νμ΄λκ° μ μμ μΌλ‘ λμνλμ§ νμΈνλ μ’μ λ°©λ²μ λ‘κ·Έλ₯Ό νμΈνλ κ² μλλ€.   
λ‘κ·Έλ₯Ό νμΈνλ λ°©λ²μ λ€μκ³Ό κ°μ΅λλ€.

    ```cs
    docker logs [OPTIONS] CONTAINER
    ```

    κΈ°λ³Έ μ΅μκ³Ό, ``-f``, ``--tail`` μ΅μμ μ΄ν΄λ΄μλ€.

    κΈ°μ‘΄μ μμ±ν΄ λμ ``redis μ»¨νμ΄λ`` λ‘κ·Έλ₯Ό νμΈν΄ λ³΄κ² μ΅λλ€.

    ```cs
    docker ps
    docker logs ${redis containerid}
    ```



*   OUTPUT  

    ```cs
    nasa1515@nasa:/$ docker logs e0a912150d3e
    1:C 17 Aug 2020 05:09:58.870 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
    1:C 17 Aug 2020 05:09:58.870 # Redis version=6.0.6, bits=64, commit=00000000, modified=0, pid=1, just started
    1:C 17 Aug 2020 05:09:58.870 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
    1:M 17 Aug 2020 05:09:58.872 * Running mode=standalone, port=6379.
    1:M 17 Aug 2020 05:09:58.872 # Server initialized
    1:M 17 Aug 2020 05:09:58.872 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
    1:M 17 Aug 2020 05:09:58.872 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
    1:M 17 Aug 2020 05:09:58.873 * Ready to accept connections
    ```

    μλ¬΄ μ΅μμ μ£Όμ§ μμμ λλ μ μ²΄ λ‘κ·Έλ₯Ό λ¬΄μνκ² μ λΆ λ€ μΆλ ₯ν©λλ€.  
    λλ¬΄ λ§μΌλ ``--tailμ΅μ``μΌλ‘ λ§μ§λ§ 3μ€λ§ μΆλ ₯ν΄ λ³΄κ² μ΅λλ€.

*   OUTPUT  

    ```cs
    nasa1515@nasa:/$ docker logs --tail 3 e0a912150d3e
    1:M 17 Aug 2020 05:09:58.872 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
    1:M 17 Aug 2020 05:09:58.872 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
    1:M 17 Aug 2020 05:09:58.873 * Ready to accept connections
    ```

<br/>

----

* μ»¨νμ΄λ λͺλ Ήμ΄ μ€ννκΈ° ``(exec)``  
μ»¨νμ΄λλ₯Ό κ΄λ¦¬νλ€ λ³΄λ©΄ μ»¨νμ΄λμ μ μνκ±°λ νμΌμ μ€ννκ³  μΆμ λκ° μμ΅λλ€.  
SSHλ₯Ό ν΅ν΄ μ°κ²°νλ©΄ λμ§ μμκΉ? λΌκ³  μκ°ν  μ μμ§λ§ SSHλ κΆμ₯νμ§ μμ΅λλ€.  
μμ μλ ``nsenter``λΌλ νλ‘κ·Έλ¨μ μ΄μ©νμλλ° dockerμ ``exec``λΌλ λͺλ Ήμ΄λ‘ ν‘μλμμ΅λλ€.


    μ»¨νμ΄λ λͺλ Ήμ΄λ₯Ό μ€ννλ λ°©λ²μ λ€μκ³Ό κ°μ΅λλ€.

    ```cs
    docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
    ```

    run λͺλ Ήμ΄μ μ μ¬ν΄ λ³΄μλλ€.  
    μ°¨μ΄λ runμ μλ‘ μ»¨νμ΄λλ₯Ό λ§λ€μ΄μ μ€ννκ³   
    execλ μ€νμ€μΈ μ»¨νμ΄λμ λͺλ Ήμ΄λ₯Ό λ΄λ¦¬λ μ λμλλ€.

    κ°λ³κ² μ€νμ€μΈ centos μ»¨νμ΄λμ root λλ ν λ¦¬ λͺ©λ‘μ λ½μλ³΄κ² μ΅λλ€.  

    ```cs
    nasa1515@cccr:/$ docker exec  nasa-centos ls -lart /
    total 56
    drwxr-xr-x   2 root root 4096 May 11  2019 srv
    lrwxrwxrwx   1 root root    8 May 11  2019 sbin -> usr/sbin
    drwxr-xr-x   2 root root 4096 May 11  2019 opt
    drwxr-xr-x   2 root root 4096 May 11  2019 mnt
    drwxr-xr-x   2 root root 4096 May 11  2019 media
    lrwxrwxrwx   1 root root    9 May 11  2019 lib64 -> usr/lib64
    lrwxrwxrwx   1 root root    7 May 11  2019 lib -> usr/lib
    drwxr-xr-x   2 root root 4096 May 11  2019 home
    lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
    drwx------   2 root root 4096 Aug  9 21:40 lost+found
    drwxr-xr-x  12 root root 4096 Aug  9 21:40 usr
    drwxr-xr-x  20 root root 4096 Aug  9 21:40 var
    drwxr-xr-x  11 root root 4096 Aug  9 21:40 run
    drwxrwxrwt   7 root root 4096 Aug  9 21:40 tmp
    dr-xr-x---   2 root root 4096 Aug  9 21:40 root
    drwxr-xr-x   1 root root 4096 Aug 17 05:51 etc
    -rwxr-xr-x   1 root root    0 Aug 17 05:51 .dockerenv
    drwxr-xr-x   1 root root 4096 Aug 17 05:51 ..
    drwxr-xr-x   1 root root 4096 Aug 17 05:51 .
    dr-xr-xr-x 348 root root    0 Aug 17 05:51 proc
    dr-xr-xr-x  13 root root    0 Aug 17 05:51 sys
    drwxr-xr-x   5 root root  360 Aug 17 05:51 dev
    ```

<br/>

---

 * μ»¨νμ΄λ λͺλ Ήμ΄ μ€ννκΈ° ``(attach)``  
    ``attach`` μ΅μμ λΆλ¦¬ λͺ¨λλ‘ μ€νμ€μΈ μ»¨νμ΄λμ μ κ·Όνλ λͺλ Ήμ΄μ΄λ€.  

    ```cs
   nasa1515@nasa:/$ docker attach nasa-memory
    [root@d387c47fa6b8 /]# 
    [root@d387c47fa6b8 /]# ip a
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
        inet 127.0.0.1/8 scope host lo
        valid_lft forever preferred_lft forever
    31: eth0@if32: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
        link/ether 02:42:ac:11:00:04 brd ff:ff:ff:ff:ff:ff link-netnsid 0
        inet 172.17.0.4/16 brd 172.17.255.255 scope global eth0
        valid_lft forever preferred_lft forever
    ```

    λ€μκ³Ό κ°μ΄ λ°±κ·ΈλΌμ΄λμμ μ€νμ€μΈ nasa-memory μ»¨νμ΄λμ μ μμ΄ κ°λ₯νλ€.

----

```toc
```