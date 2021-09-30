---
emoji: 🤦‍♂️
title: "[DOCKER] - CONTAINER"
date: "2021-06-26 00:07:25"
author: nasa1515
tags: DOCKER
categories: DOCKER
---

머리말  

이전 포스트에서는 도커의 이론적이 내용에 대해서 간단하게 정리한 포스팅을 했었습니다.  
이번 포스트에서는 이미지를 이용해서 실제 도커의 컨테이너 생성 관리 방법과 그와 관련된 명령어들을 포스트 했습니다.


---

## ✔ 도커 컨테이너

드디어 컨테이너를 실행해 보려고 합니다.  
컨테이너의 위대함을 보기위해 여러개의 프로그램을 마구잡이로 띄워보겠습니다.

* 컨테이너를 실행하는 명령어는 다음과 같습니다.

    ```cs
    docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
    ```

    <br/>

* 다음은 자주 사용하는 옵션들입니다.

    ```cs
    [옵션]	[설명]
    -d	    detached mode 흔히 말하는 백그라운드 모드
    -p	    호스트와 컨테이너의 포트를 연결 (포워딩)
    -v	    호스트와 컨테이너의 디렉토리를 연결 (마운트)
    -e	    컨테이너 내에서 사용할 환경변수 설정
    –name	컨테이너 이름 설정
    –rm	    프로세스 종료시 컨테이너 자동 제거
    -it	    -i와 -t를 동시에 사용한 것으로 터미널 입력을 위한 옵션
    –link	컨테이너 연결 [컨테이너명:별칭]
    ```

    <br/>

* Ubuntu OS 기반의 컨테이너를 생성해보겠습니다.

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

    ``run``명령어를 사용하면 사용할 이미지가 저장되어 있는지 확인하고 없다면  
    다운로드``(pull)``를 한 후 컨테이너를 ``생성(create)``하고 ``시작(start)`` 합니다.

    위 예제는 ``ubuntu:16.04`` 이미지를 다운받은 적이 없기 때문에 이미지를 다운로드 한 후 컨테이너가 실행되었습니다.  
    컨테이너는 정상적으로 실행됐지만 실행에 대한 명령어를 전달하지 않았기 때문에 컨테이너는 생성되자마자 종료됩니다.  
    컨테이너는 프로세스이기 때문에 실행중인 프로세스가 없으면 컨테이너는 종료됩니다.

    <br/>

* 이번에는 BASH 쉘 실행 명령을 넣어 생성해보겠습니다.


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
    컨테이너 내부에 들어가기 위해 ``bash 쉘``을 실행하고 키보드 입력을 위해 ``-it 옵션``을 줍니다.  
    추가적으로 프로세스가 종료되면 컨테이너가 자동으로 삭제되도록 ``--rm`` 옵션도 추가하였습니다.

    바로 전 이미지를 다운 받았기 때문에 다운로드 없이 바로 실행되었습니다.   
    cat /etc/*-release 명령어를 실행해보면 ubuntu 리눅스인걸 알 수 있습니다.  

    ----


* ### redis container

    2번째로 redis를 사용해 컨테이너를 생성해보겠습니다. redis는 메모리기반의 다양한 기능을 가진 스토리지입니다.  
    6379 포트로 통신하며 telnet 명령어로 테스트해 볼 수 있습니다.  
    redis 컨테이너는 백그라운드 모드로 실행하기 위해 ``-d 옵션``을 추가하고 ``-p 옵션``을 추가하여  
    컨테이너의 포트를 호스트의 포트로 연결해보겠습니다.

    ``-d 옵션``이 없다면 프로세스가 ``foreground``로 실행되어 아무키도 입력할 수 없게 됩니다.  
컨테이너를 종료하려면 ctrl + c를 입력해 주세요.


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

    ``-d 옵션``을 주었기 때문에 컨테이너를 실행하자마자 컨테이너의 ID(e0a9121…)를 보여주고 바로 쉘로 돌아왔습니다.  
    컨테이너는 종료된 것이 아니라 백그라운드 모드로 동작하고 있고 컨테이너 ID를 이용하여 컨테이너를 제어할 수 있습니다.  
    ``-p 옵션``을 이용하여 호스트의 1234포트를 컨테이너의 6379포트로 연결하였고 localhost의 1234포트로 접속하면 하면 redis를 사용할 수 있습니다.

* 테스트 결과  
    redis에 접속하여 새로운 키를 저장하고 불러오는데 성공했습니다. 실행이 간단한건 물론이고 호스트의 포트만 다르게 하면  
    하나의 서버에 여러개의 redis 서버를 띄우는 것도 매우 간단합니다.


<br/>

----

* ### MySQL 5.7 container  

    이번에 실행할 컨테이너는 MySQL 서버입니다.  
    흔히 사용되는 데이터베이스인데 이번에는 ``-e 옵션``을 이용하여 환경변수를 설정하고 ``--name 옵션``을 이용해  
    컨테이너에 읽기 어려운 ID 대신 쉬운 이름을 부여할 예정입니다.

    ``--name옵션``을 생략하면 도커가 자동으로 이름을 지어 줍니다.  
    이름은 유명한 과학자나 해커의 이름과 수식어를 조합하여 랜덤으로 생성합니다.  
    (ex - boring_wozniak) 우리나라 과학자 장영실도 등록되어 있습니다.

    MySQL Docker hub 페이지에 접속하면 간단한 사용법과 환경변수에 대한 설명이 있습니다.  
    여러가지 설정값이 있는데 패스워드 없이 root계정을 만들기 위해 ``MYSQL_ALLOW_EMPTY_PASSWORD`` 환경변수를 설정합니다.  
    그리고 컨테이너의 이름은 nasa-mysql로 할당하고 백그라운드 모드로 띄우기 위해 ``-d 옵션``을 줍니다.  
    포트는 ``3306포트``를 호스트에서 그대로 사용하겠습니다.

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

* CPU, MEMORY 제한  

  이번에는 컨테이너를 생성할때 ``메모리와 CPU 사용률``을 제한 하는 것입니다.  
    DOCKER는 호스트의 자원을 사용하기 때문에 여러대의 컨테이너를 생성하기 위해선 필수 적인 옵션입니다.  

    <br/>

*   CPU 제한 CENTOS  생성

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
    생성한 ``nasa-cpu`` 컨테이너에 dd 명령으로 부하를 발생시키고 확인해보았다.  
    설정한 ``0.3 (30%)`` 값 이상으로 cpu를 사용하고 있지 않음을 확인.

    <br/>

*   MEMORY 제한 CENTOS  생성

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

    nasa-momory 컨테이너를 ``1024(1G)``의 메모리만 부여한 뒤 생생해보았다.  
    ``docker stats --no-stream`` 명령어를 통해 확인한 결과  
    적용한 메모리만큼만 부여되어 컨테이너가 생성됨을 확인하였다.
    
    <br/>

*   ``update`` 명령어로 컨테이너 제한 업데이트  
    update 명령어를 이용하면 이미 실행중인 컨테이너의 설정을 변경 할 수 있다.  
    위에 생성한 nasa-memory 컨테이너의 메모리를 ``2G``로 변경해보겠다.

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

##  ✌ 도커 기본 명령어 
앞에서 도커의 run 명령어를 이용하여 여러개의 컨테이너를 실행했습니다.  
이제 컨테이너의 상태를 살펴보고 어떤 이미지가 설치되어 있는지 확인하는 명령어를 알아봅니다.

* 컨테이너 목록 확인하기 ``(ps)``  
컨테이너 목록을 확인하는 명령어는 다음과 같습니다

    ```cs
    $ docker ps --help

    Usage: docker ps [OPTIONS]
    ```

    ```cs
    nasa1515@nasa:/$ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
    64e17595fca8        mysql:5.7           "docker-entrypoint.s…"   7 minutes ago       Up 7 minutes        0.0.0.0:3306->3306/tcp, 33060/tcp   nasa-mysql
    e0a912150d3e        redis               "docker-entrypoint.s…"   18 minutes ago      Up 18 minutes       0.0.0.0:1234->6379/tcp              jovial_wing
    nasa1515@nasa:/$ 

    ```

    출력된 필드에 대한 설명은 다음과 같습니다. 

    *   ``CONTAINER ID`` : 컨테이너의 고유 ID
    *   ``IMAGE`` : 컨테이너가 사용하는 이미지
    *   ``COMMAND`` : 컨테이너에서 실행중인 애플리케이션
    *   ``CREATED`` : 컨테이너가 생성된 날짜
    *   ``STATUS`` : 컨테이너의 상태
    *   ``PORTS``: 컨테이너에서 사용 중인 포트
    *   ``NAMES`` : 컨테이너의 이름

    <br/>

* ``-a 옵션``을 넣어 실행해보겠습니다

    ```cs
    nasa1515@nasa:/$ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                               NAMES
    64e17595fca8        mysql:5.7           "docker-entrypoint.s…"   11 minutes ago      Up 11 minutes               0.0.0.0:3306->3306/tcp, 33060/tcp   nasa-mysql
    e0a912150d3e        redis               "docker-entrypoint.s…"   21 minutes ago      Up 21 minutes               0.0.0.0:1234->6379/tcp              jovial_wing
    f481493bd3b2        ubuntu:16.04        "/bin/bash"              46 minutes ago      Exited (0) 46 minutes ago                                       nifty_chatterjee
    nasa1515@nasa:/$ 
    ```

    이전에 실행했다가 종료된 컨테이너(Exited (0))가 추가로 보입니다. 컨테이너는 종료되어도 삭제되지 않고 남아있습니다.  
    종료된 건 다시 시작할 수 있고 컨테이너의 읽기/쓰기 레이어는 그대로 존재합니다.  
    명시적으로 삭제를 하면 깔끔하게 컨테이너가 제거됩니다.


    <br/>

* 컨테이너 중지하기 ``(stop)``  
실행중인 컨테이너를 중지하는 명령어는 다음과 같습니다.

    ```cs
    docker stop [OPTIONS] CONTAINER [CONTAINER...]
    ```

    옵션은 특별한게 없고 실행중인 컨테이너를 하나 또는 여러개 (띄어쓰기로 구분) 중지할 수 있습니다.

    앞에서 실행한 mysql 컨테이너는 더이상 필요가 없으니 중지해 보겠습니다.  
    중지하려면 컨테이너의 ID 또는 이름을 입력하면 됩니다. mysql 컨테이너의 ID를 ps명령을 통해 확인하고 중지해 봅니다.

    <br/>

* 실행 중인 MYSQL 컨테이너 확인

    ```cs
    nasa1515@nasa:/$ docker ps 
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
    64e17595fca8        mysql:5.7           "docker-entrypoint.s…"   15 minutes ago      Up 15 minutes       0.0.0.0:3306->3306/tcp, 33060/tcp   nasa-mysql
    e0a912150d3e        redis               "docker-entrypoint.s…"   25 minutes ago      Up 25 minutes       0.0.0.0:1234->6379/tcp              jovial_wing
    ```

    <br/>

* 중지 후 확인

    ```cs
    nasa1515@nasa:/$ docker stop nasa-mysql
    nasa-mysql
    nasa1515@nasa:/$ 
    nasa1515@nasa:/$ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    e0a912150d3e        redis               "docker-entrypoint.s…"   26 minutes ago      Up 26 minutes       0.0.0.0:1234->6379/tcp   jovial_wing
    ```

    <br/>

* 컨테이너 제거하기 ``(rm)``  
종료된 컨테이너를 완전히 제거하는 명령어는 다음과 같습니다.
    
    ```cs
    docker rm [OPTIONS] CONTAINER [CONTAINER...]
    ```

    종료 명령어도 옵션은 특별한게 없습니다.  
    종료된 컨테이너를 하나 또는 여러개 삭제할 수 있습니다.  
    종료된 ``ubuntu`` 컨테이너와 ``mysql`` 컨테이너를 삭제해보겠습니다.

    <br/>

* ``-a`` 옵션에서 보이는 것을 확인

    ```cs
    nasa1515@nasa:/$ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                    NAMES
    64e17595fca8        mysql:5.7           "docker-entrypoint.s…"   18 minutes ago      Exited (0) 2 minutes ago                             nasa-mysql
    e0a912150d3e        redis               "docker-entrypoint.s…"   28 minutes ago      Up 28 minutes               0.0.0.0:1234->6379/tcp   jovial_wing
    f481493bd3b2        ubuntu:16.04        "/bin/bash"              53 minutes ago      Exited (0) 53 minutes ago                            nifty_chatterjee
    ```

    <br/>

* 삭제 후 확인

    ```cs
    nasa1515@nasa:/$ docker rm nasa-mysql
    nasa-mysql
    nasa1515@nasa:/$ docker rm nifty_chatterjee
    nifty_chatterjee
    nasa1515@nasa:/$ 
    nasa1515@nasa:/$ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    e0a912150d3e        redis               "docker-entrypoint.s…"   29 minutes ago      Up 29 minutes       0.0.0.0:1234->6379/tcp   jovial_wing
    nasa1515@nasa:/$ 
    ```

    컨테이너가 말끔히 삭제되었습니다.  
    호스트 OS는 아무런 흔적도 남아있지 않고 컨테이너만 격리된 상태로 실행되었다가 삭제되었습니다.  
    시스템이 꼬일 걱정이 전혀 없습니다.

    중지된 컨테이너를 일일이 삭제 하는 건 귀찮은 일입니다.  
    ``docker rm -v $(docker ps -a -q -f status=exited)`` 명령어를 입력하면  
    중지된 컨테이너 ID를 가져와서 한번에 삭제합니다.

<br/>

----

## 👌 컨테이너 관리 명령어

위에서 도커에 대한 아주아주아주 기본적인 명령어를 살펴보았습니다.  
사실 저 명령어들과 이번에 살펴볼 log, exec 명령어를 익히면  
도커에서 사용하는 명령어는 거의 다 익혔다고 할 수 있습니다. 다른 명령어는 필요에 따라 하나하나 살펴보면 됩니다.


* 컨테이너 로그 보기 ``(logs)``  
컨테이너가 정상적으로 동작하는지 확인하는 좋은 방법은 로그를 확인하는 것 입니다.   
로그를 확인하는 방법은 다음과 같습니다.

    ```cs
    docker logs [OPTIONS] CONTAINER
    ```

    기본 옵션과, ``-f``, ``--tail`` 옵션을 살펴봅시다.

    기존에 생성해 놓은 ``redis 컨테이너`` 로그를 확인해 보겠습니다.

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

    아무 옵션을 주지 않았을 때는 전체 로그를 무식하게 전부 다 출력합니다.  
    너무 많으니 ``--tail옵션``으로 마지막 3줄만 출력해 보겠습니다.

*   OUTPUT  

    ```cs
    nasa1515@nasa:/$ docker logs --tail 3 e0a912150d3e
    1:M 17 Aug 2020 05:09:58.872 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
    1:M 17 Aug 2020 05:09:58.872 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
    1:M 17 Aug 2020 05:09:58.873 * Ready to accept connections
    ```

<br/>

----

* 컨테이너 명령어 실행하기 ``(exec)``  
컨테이너를 관리하다 보면 컨테이너에 접속하거나 파일을 실행하고 싶을 때가 있습니다.  
SSH를 통해 연결하면 되지 않을까? 라고 생각할 수 있지만 SSH는 권장하지 않습니다.  
예전에는 ``nsenter``라는 프로그램을 이용하였는데 docker에 ``exec``라는 명령어로 흡수되었습니다.


    컨테이너 명령어를 실행하는 방법은 다음과 같습니다.

    ```cs
    docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
    ```

    run 명령어와 유사해 보입니다.  
    차이는 run은 새로 컨테이너를 만들어서 실행하고  
    exec는 실행중인 컨테이너에 명령어를 내리는 정도입니다.

    가볍게 실행중인 centos 컨테이너에 root 디렉토리 목록을 뽑아보겠습니다.  

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

 * 컨테이너 명령어 실행하기 ``(attach)``  
    ``attach`` 옵션은 분리 모드로 실행중인 컨테이너에 접근하는 명령어이다.  

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

    다음과 같이 백그라운드에서 실행중인 nasa-memory 컨테이너에 접속이 가능하다.

----

```toc
```