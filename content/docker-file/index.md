---
emoji: 🤦‍♂️
title: Dockerfile [DOCKER]
date: "2021-06-27 00:12:25"
author: nasa1515
tags: DOCKER
categories: DOCKER
---


머리말  
 이번 포스트에서는 Docker에서 조금도 간편화된 방법으로 이미지를 제작할 수 있는 Dockerfile에 대해서 포스팅합니다.


---

## ✔ DOCKERFILE

``Dockerfile``은 컨테이너를 만들고 해야하는 일련의 작업들을 미리 선언함으로써 매번 해당 작업을 하지않고도,  
컨테이너 생성시 자동으로 등록된 작업이 실행된 후 컨테이너를 생성할 수 있는 파일입니다.

Dockerfile은 어플리케이션 개발 외에도 도커 허브에 배포할때,이미지가 아닌, Dockerfile을 이용하여 배포할 수도 있습니다.

* Dockerfile은 COMMAND-VALUE 쌍으로 구성된 지시어로 이루어진 도커 이미지 설정 파일입니다.

 
* 베이스 이미지를 지정, 컨테이너에서 실행되는 명령을 정의, 환경 변수 설정 등 컨테이너에서 실행되는 데몬을 지정할 수 있습니다.

* Dockerfile에서 파일 시스템에 변경 요청하는 지시어는 베이스 이미지 레이어의 상위 레이어가 생성되어 변경사항이 적용됩니다.

<br/>

---

## ✌ DOCKER FILE 지시어



* ``FROM``  
FROM 지시어로 베이스 이미지를 지정하여 레이어를 생성합니다.

    지정된 이미지가 도커 호스트로 자동으로 ``pull down`` 됩니다.  
    도커 호스트 또는 Docker Registry(DockerHub, Private Docker Registry, ..)에 있는 이미지만 지정이 가능합니다.

 

    ``FROM``지시어는 세가지 형식으로 사용됩니다.

    ```cs
    FROM IMAGE

    FROM IMAGE:TAG

    FROM IMAGE@DIGEST
    ```

<br/>

---

* ``RUN``  
    베이스 이미지를 기반으로 패키지를 설치하거나 환경을 구성할 때 사용합니다.

    두가지 사용 형식이 있지만, 결과적으로 보면 큰 차이는 없습니다.

 
    * 쉘 명령  
    /bin/sh -c 으로 실행하는 것과 동일하게 작동합니다.

    ```cs
    RUN yum -y install httpd
    ```

    자동으로 /bin/sh -c yum -y install httpd 로 변환됩니다.

    * Exec 명령  
    쉘을 거치지 않고 바로 실행합니다.  
    따라서 환경 변수를 입력할 수 없고, JSON 형식으로 입력해야만 합니다.

    ```cs
    RUN [ "/bin/bash", "-c", "yum -y install httpd" ]   
    ```

<br/>

---

* ``CMD``  
    빌드한 이미지로부터 컨테이너가 실행될 때 특정 프로세스나 데몬을 실행하기 위해 사용됩니다.

    CMD 지시어를 여러번 사용할 경우, 마지막 지시어만 적용되므로 한번만 사용해야 합니다.

    RUN과 마찬가지로 쉘 명령과 Exec 명령 두가지 형식으로 사용할 수 있습니다.

 
    * 쉘 명령  

    ```cs
    FROM centos
    RUN yum -y install httpd
    CMD /usr/sbin/httpd -D FOREGROUND
    ```

    ```cs
    $ docker build -t centos:cmd .
    $ docker inspect centos-web:cmd
    [
        {
            ...
            "ContainerConfig": {
                ...
                "Cmd": [
                    "/bin/sh",
                    "-c",
                    "#(nop) ",
                    "CMD [\"/bin/sh\" \"-c\" \"/usr/sbin/httpd -D FOREGROUND\"]"
                ],
                "Entrypoint": null
            },
            "Config": {
                ...
                "Cmd": [
                    "/bin/sh",
                    "-c",
                    "/usr/sbin/httpd -D FOREGROUND"
                ],
                "Entrypoint": null
            }
            ...
    ```

    만일 docker run 시 명령어를 지정하면 CMD는 무시되고 지정된 명령어가 수행됩니다.

<br/>

---

* ``ENTRYPOINT``  
    빌드한 이미지로부터 컨테이너가 실행될 때 특정 프로세스나 데몬을 실행하기 위해 사용됩니다.

    docker run 명령을 실행할 때 실행되므로 CMD 지시어보다 우선순위가 높습니다. 


    RUN 지시어와 동일하게 쉘 명령과 Exec  명령 두가지 형식으로 사용할 수 있습니다.

     * 쉘 명령  

    ```cs
    ./Dockerfile

    FROM centos:latest
    RUN yum -y install httpd
    ENTRYPOINT /usr/sbin/httpd -D FOREGROUND
    ```

    ```cs
    $ docker build -t centos:entrypoint .

    $ docker inspect centos-web:entrypoint
    [
        {
            ...
            "ContainerConfig": {
                ...
                "Cmd": [
                    "/bin/sh",
                    "-c",
                    "#(nop) ",
                    "ENTRYPOINT [\"/bin/sh\" \"-c\" \"/usr/sbin/httpd -D FOREGROUND\"]"
                ],
                "Entrypoint": [
                    "/bin/sh",
                    "-c",
                    "/usr/sbin/httpd -D FOREGROUND"
                ]
            },
            "Config": {
                ...
                "Cmd": null,
                "Entrypoint": [
                    "/bin/sh",
                    "-c",
                    "/usr/sbin/httpd -D FOREGROUND"
                ]
            },
            ...
    ```


    ``Entrypoint`` 설정이 추가된 것을 확인할 수 있습니다. 

    CMD 지시어와는 달리 docker run 시 지정한 명령어는 무시되고 ENTRYPOINT 지시어가 실행됩니다.  
    쉘로 접속하려면 docker exec 명령을 사용해야 합니다.

    mysql 이미지의 경우 ENTRYPOINT docker-entrypoint.sh 지시어가 포함되어있습니다.  
    이 스크립트에서 특정 환경변수를 검사하여 컨테이너를 실행합니다.

<br/>

---

* ``ONBUILD``  
베이스 이미지를 생성할 때 사용하는 지시어로서,  
이미지를 빌드한 후 해당 이미지를 기반으로 다른 이미지를 빌드할 때 적용되는 지시어다.

 

    ONBUILD 명령어가 적용된 이미지로 컨테이너를 생성해도 컨테이너는 해당 명령어를 실행하지 않습니다.  
    해당 이미지를 베이스 이미지로 해서 다른 이미지를 빌드할때 명령어가 실행됩니다.

 

    ``ONBUILD ADD`` 명령어는 도커 호스트의 파일을 컨테이너의 특정 디렉토리에 적용할 때 사용합니다.

    ```cs
    FROM centos
    RUN yum -y install httpd
    ONBUILD ADD index.html /var/www/html
    CMD /usr/sbin/httpd -D FOREGROUND
    ```

* 이미지를 빌드합니다.  
    FROM 지시어로 생성된 centos 레이어와 RUN 지시어로 생성된 레이어 두개만 나타납니다.  
    ONBUILD로 지정된 ADD index.html /var/www/html 명령은 실행되지 않고  
    OnBuild 필드로 업데이트 된 것을 확인할 수 있습니다.

    ```cs
    $ docker build -t centos:pre-onbuild .

    $ docker inspect centos-web:pre-onbuild
    [
        {
            ...
            "ContainerConfig": {
                ...
                "Cmd": [
                    "/bin/sh",
                    "-c",
                    "#(nop) ",
                    "CMD [\"/bin/sh\" \"-c\" \"/usr/sbin/httpd -D FOREGROUND\"]"
                ],
                "OnBuild": [
                    "ADD index.html /var/www/html"
                ]
            },
            "Config": {
                ...
                "Cmd": [
                    "/bin/sh",
                    "-c",
                    "/usr/sbin/httpd -D FOREGROUND"
                ],
                "OnBuild": [
                    "ADD index.html /var/www/html"
                ]
            },
            "RootFS": {
                "Type": "layers",
                "Layers": [
                    "sha256:d69483a6face4499acb974449d1303591fcbb5cdce5420f36f8a6607bda11854",
                    "sha256:f58e0e778d84a914c02385be57b7f0247b181f37b299579dd4d2e2fac9d9fa07"
                ]
            },
            ...
        }
    ]
    ```

    <br/>

* OnBuild가 적용된 이미지를 기반으로 또 다른 이미지를 생성합니다.  
    이번엔 ADD 명령어가 수행되어야 하므로 도커 호스트에 index.html 파일이 존재하여야 합니다.  
    OnBuild 필드가 null로 생성되고, ADD index.html /var/www/html 지시어가 적용된 레이어가 추가되었기 때문에  
    총 3개의 레이어가 나타나게 됩니다.

    ```cs
    FROM centos:pre-onbuild
    RUN echo Test
    CMD /usr/sbin/httpd -D FOREGROUND
    ```

    ```cs
    $ docker build -t centos-web:onbuild .

    $ docker inspect centos-web:onbuild
    [
        {
            ...
            "ContainerConfig": {
                ...
                "Cmd": [
                    "/bin/sh",
                    "-c",
                    "#(nop) ",
                    "CMD [\"/bin/sh\" \"-c\" \"/usr/sbin/httpd -D FOREGROUND\"]"
                ],
                "OnBuild": null,
                ...
            },
            "Config": {
                ...
                "Cmd": [
                    "/bin/sh",
                    "-c",
                    "/usr/sbin/httpd -D FOREGROUND"
                ],
                "OnBuild": null,
                ...
            },
            "RootFS": {
                "Type": "layers",
                "Layers": [
                    "sha256:d69483a6face4499acb974449d1303591fcbb5cdce5420f36f8a6607bda11854",
                    "sha256:f58e0e778d84a914c02385be57b7f0247b181f37b299579dd4d2e2fac9d9fa07",
                    "sha256:d44e7018ea29cc14dedaf309240f573ae182c7141827478b0ab806e99697d339"
                ]
            },
            ...
        }
    ]
    ```

<br/>

---

* ``VOLUME``  
    도커 볼륨을 생성합니다.

 

    ``VOLUME`` 지시어를 설정하면 해당 컨테이너 패스에 연결되는 디렉토리를 생성하고 마운트합니다.

    ```cs
    FROM centos
    RUN mkdir -p /tmp/share
    VOLUME /tmp/share
    ```

    ```cs
    $ docker build -t centos:volume .

    $ docker inspect centos:volume
    [
        {
            ...
            "ContainerConfig": {
                ...
                "Volumes": {
                    "/tmp/share": {}
                }
            },
            "Config": {
                ...
                "Volumes": {
                    "/tmp/share": {}
                }
            },
            ...
        }
    ]
    ```

<br/>

* 생성된 이미지로 컨테이너를 실행합니다.

    ```cs
    $ docker run -itd --name centos-volume centos:volume
    ```

    ```cs
    $ docker inspect centos-volume
    [
        {
            ...
            "Mounts": [
                {
                    "Type": "volume",
                    "Name": "8fadb85943d78e953a16e643bc6ae1e5733419c8f8bb2d178cd0d45ba39f5217",
                    "Source": "/var/lib/docker/volumes/8fadb85943d78e953a16e643bc6ae1e5733419c8f8bb2d178cd0d45ba39f5217/_data",
                    "Destination": "/tmp/share",
                    "Driver": "local",
                    "Mode": "",
                    "RW": true,
                    "Propagation": ""
                }
            ],
            "Config": {
                ...
                "Volumes": {
                    "/tmp/share": {}
                }
            },
            ...
        }
    ]
    ```

    <br/>

* 도커 볼륨이 자동으로 생성된 것을 확인할 수 있습니다. 

    ```cs
    $ docker volume ls
    DRIVER              VOLUME NAME
    local               8fadb85943d78e953a16e643bc6ae1e5733419c8f8bb2d178cd0d45ba39f5217
    ```

<br/>


---

* ``EXPOSE``  
    EXPOSE 지시어를 사용하여 컨테이너가 사용할 포트를 지정합니다.  

    컨테이너를 실행할 때 반드시 포트 매핑 설정을 넣어주어야 합니다.  
    만일 호스트 네트워크 드라이버를 사용합니다면 포트 매핑을 설정하지 않고 자동으로 호스트 포트로 노출됩니다.

    ```cs
    FROM centos
    RUN yum -y install httpd
    RUN echo 'Hello nasa1515!' > /var/www/html/index.html
    CMD /usr/sbin/httpd -D FOREGROUND
    EXPOSE 80
    ```

    ```cs
    $ docker build -t centos:expose .

    $ docker run -itd --name centos-expose -p 80:80 centos:expose
    

    이미지 정보에서 포트 노출을 확인할 수 있습니다.

    $ docker inspect centos:expose
    [
        {
            ...
            "ContainerConfig": {
                ...
                "ExposedPorts": {
                    "80/tcp": {}
                },
                ...
            },
            "Config": {
                ...
                "ExposedPorts": {
                    "80/tcp": {}
                },
                ...
            },
            ...
    ```

    <br/>

    docker run 시 포트 매핑 옵션을 적용하여 호스트에서 해당 포트가 LISTEN 상태임을 확인할 수 있어야 합니다.

    ```cs
    $ netstat -nltp
    Active Internet connections (only servers)
    Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
    ...
    tcp6       0      0 :::80                   :::*                    LISTEN      -                   
    ```
    
<br/>

---


- ``MAINTAINER``  
    MAINTAINER 지시어는 이미지의 관리자 정보를 기록합니다.

    ```cs
    MAINTAINER nasa1515
    ```

    이미지 정보를 조회하면 Author 필드에 추가된 것을 확인할 수 있습니다.

    ```cs
    [
        {
            ...
            "Author": "nasa1515",
            ...
    ```

<br/>

---

## 👍ENTRYPOINT 와 CMD의 차이


*   ``ENTRYPOINT와`` ``CMD``는 둘다 어플리케이션을 지정하는 지시어인데  
 ENTRYPOINT 와 CMD 의 차이점은 바로 컨테이너 시작시 실행 명령에 대한 Default 지정 여부입니다.

 
* 만약 ``ENTRYPOINT`` 를 사용하여 컨테이너 수행 명령을 정의한 경우  
  해당 컨테이너가 수행될 때 반드시 ENTRYPOINT 에서 지정한 명령을 수행되도록 지정 됩니다.

 

* ``CMD``를 사용하여 수행 명령을 경우는  
    컨테이너를 실행할때 인자값을 주게 되면 Dockerfile 에 지정된 CMD 값을 대신 하여 지정한 인자값으로 변경하여 실행되게 됩니다.

 
    이해가 쉽게 Dockerfile 예제 써보겠습니다

    ```cs
    # Dockerfile

    FROM ubuntu
    CMD ["/bin/df", "-h"]
    ```

    위에서 Dockerfile 은 CMD 를 사용하여 df -h 명령을 한번 수행하고 종료되는 이미지를 만드는 것입니다.

    <br/>

* 테스트를 위해 위 Dockerfile 을 사용해 nasa/df 라는 이름을 가진 이미지를 빌드해보죠. 

    ```cs
    $ docker build -t nasa/df .

    Sending build context to Docker daemon  2.048kB
    Step 1/2 : FROM ubuntu
    ---> 94e814e2efa8
    Step 2/2 : CMD ["/bin/df", "-h"]
    ---> Running in c5f57fca1068
    Removing intermediate container c5f57fca1068
    ---> 80eeec0ef7c0
    Successfully built 80eeec0ef7c0
    Successfully tagged nasa/df:latest
    ```

    <br/>

    빌드된 nasa/df 이미지를 컨테이너로 동작시켜 보면  
    Dockerfile 에서 정의된 대로 df -h 명령을 실행하고 종료되게 됩니다. 

    ```cs
    $ docker run --name nasa-df nasa/df

    Filesystem      Size  Used Avail Use% Mounted on
    overlay          59G  5.6G   50G  11% /
    tmpfs            64M     0   64M   0% /dev
    tmpfs          1000M     0 1000M   0% /sys/fs/cgroup
    /dev/sda1        59G  5.6G   50G  11% /etc/hosts
    shm              64M     0   64M   0% /dev/shm
    tmpfs          1000M     0 1000M   0% /proc/acpi
    tmpfs          1000M     0 1000M   0% /sys/firmware
    ```

    <br/>

* 이번에는, 컨테이너 실행시 추가 인자 값을 줘서 수행할 명령을 바꿔보죠.  
    docker run 으로 컨테이너 실행시 마지막에 ps 명령을 추가 인자를 주고  
    실행해 보면 아래와 같은 결과를 볼 수 있습니다.

    ```cs
    $ docker run --name nasa-df nasa/df ps -aef

    UID        PID  PPID  C STIME TTY          TIME CMD
    root         1     0  0 15:19 ?        00:00:00 ps -aef
    ```
    CMD 로 지정한 내용 대신 컨테이너 실행시 받은 인자로 대체하여 실행됨을 볼 수 있습니다.

    <br/>

* ``docker inspect`` 명령을 통해 컨테이너 설정 내용을 자세히 보겠습니다.

    ```cs
    $ docker inspect nasa-df
    ...
                "Cmd": [
                    "ps",
                    "-aef"
                ],
    ...
    ```

    컨테이너 설정에 Cmd 값이 인자 값으로 대체된 것이 확인 가능합니다.

<br/>

 ---

 * 이번에는 ENTRYPOINT 를 사용하여 컨테이너 이미지를 만들어 보겠습니다.

    단지 CMD를 ENTRYPOINT 로 대신한 것 뿐입니다.

    ```cs
    # Dockerfile

    FROM ubuntu
    ENTRYPOINT ["/bin/df", "-h"]
    ```

    <br/>

* 이번엔 nasa/df:entry 라는 태그를 추가하여 이미지를 빌드

    ```cs
    $ docker build -t nasa/df:entry .

    Sending build context to Docker daemon  2.048kB
    Step 1/2 : FROM ubuntu
    ---> 94e814e2efa8
    Step 2/2 : ENTRYPOINT ["/bin/df", "-h"]
    ---> Running in 61f6f8ad4f61
    Removing intermediate container 61f6f8ad4f61
    ---> cc23a8719b6e
    Successfully built cc23a8719b6e
    Successfully tagged nasa/df:entry
    ```

    <br/>

* 빌드된 nasa/df:entry 이미지로 컨테이너를 실행

    ```cs
    $ docker run --name nasa-df nasa/df:entry

    Filesystem      Size  Used Avail Use% Mounted on
    overlay          59G  5.6G   50G  11% /
    tmpfs            64M     0   64M   0% /dev
    tmpfs          1000M     0 1000M   0% /sys/fs/cgroup
    /dev/sda1        59G  5.6G   50G  11% /etc/hosts
    shm              64M     0   64M   0% /dev/shm
    tmpfs          1000M     0 1000M   0% /proc/acpi
    tmpfs          1000M     0 1000M   0% /sys/firmware
    ```

    실행된 결과는 CMD 와는 다른게 없다.


    <br/>

* docker inspect 로 자세히 살펴보면 약간의 다른점을 볼 수 있습니다.

    ```cs
    $ docker inspect nasa-df
    ...
                "Cmd": null,
    ...

                "Entrypoint": [
                    "/bin/df",
                    "-h"
                ],
    ...
    ```
    ``Entrypoint`` 항목에 실행된 명령 정보가 있고  
    CMD는 null 로 비워져 있는것을 볼 수 있습니다.

 
    <br/>

* CMD 테스트와 동일하게 인자를 추가로 넣어 컨테이너를 실행 

    ENTRYPOINT 와 CMD의 확실한 차이를 볼 수 있습니다.

    ```cs
    $ docker run --name nasa-df nasa/df:entry ps -aef

    /bin/df: invalid option -- 'e'
    Try '/bin/df --help' for more information.
    ```

    에러를 출력하며 원하는 동작이 실행되지 않았음을 볼 수 있습니다.

    <br/>

* ``docker inspect`` 를 사용해 살펴보죠.

    ```cs
    $ docker inspect nasa-df
    ...
                "Cmd": [
                    "ps",
                    "-aef"
                ],
    ...
                "Image": "nasa/df:entry",
                "Volumes": null,
                "WorkingDir": "",
                "Entrypoint": [
                    "/bin/df",
                    "-h"
                ],
    ...
    ```

    컨테이너 실행시 /bin/df 명령은 유지하고  
    추가 인자를 CMD로 받아 처리한 것을 볼 수 있습니다.

    컨테이너 시작시 아래와 같은 명령어를 수행한 것과 같은 것이며  
    이는 적절한 명령이 아니었으므로 에러로 끝난 것임을 알 수 있습니다.

    ```cs
    > df -h ps -aef     
    
    # ENTRYPOINT : df -h  
    # CMD : ps -aef

    df: invalid option -- 'e'
    Try 'df --help' for more information.
    ```

<br/>

---

### ENTRYPOINT 와 CMD의 사용 방법
 

  같은 것 같으면서 다른 두 지시어의 차이를 위에 실습으로 알아봤습니다.  
  그렇다면 ENTRYPOINT와 CMD 는 어떻게 사용하는게 좋을까.

 
1. 컨테이너가 수행될 때 변경되지 않을 실행 명령은 CMD 보다는 ENTRYPOINT 로 정의하는게 좋다.

    컨테이너를 만들때 아마 대부분은 해당 컨테이너가 실행될 목적이 분명할 것입니다.  
  웹서버(nginx)가 될 수도 있고, App서버(node)가 될 수도 있으며 DB(mysql) 가 될 수도 있습니다.

    즉, 이미지를 만들때는 실행 목적이 분명하므로 nginx / node / mysql 같은  
    메인 프로세스가 될 명령의 경우는 ``ENTRYPOINT`` 로 정의하는게 명확할 것입니다.


<br/>
 

2. 메인 명령어가 실행시 default option 인자 값은 CMD로 정의합니다

    ``CMD`` 는 ``ENTRYPOINT`` 와 함께 사용시 추가 인자 값으로 활용 됩니다.   
    그러므로,  메인 프로세스에 대한 default 옵션값을 CMD 로 정의해주면 좋을 것입니다. 


<br/>

3. ``ENTRYPOINT`` 와 ``CMD``는 ``리스트 포맷`` ( ["args1", "args2",...] )으로 정의해 주는게 좋다. 

    ENTRYPOINT 와 CMD 를 작성할때는 대부분 List 형태로 작성하지만,  
    아래와 같이 일반적인 shell 형태로도 작성 가능합니다.

    ```cs
    # Dockerfile 
    FROM ubuntu 
    Add loop.sh /usr/local/bin/nasa.sh 
    ENTRYPOINT /usr/local/bin/nasa.sh 1 # Shell format
    ```

    ```cs
    #!/bin/bash
    INTERVAL=$1 
    
    while true;
    do
        ps x;
        sleep $INTERVAL;
    done
    ```

<br/>

----

## 🤳docker file 예제

* 아래와 같은 Docker File을 작성해보았습니다

    ```cs
    FROM ubuntu:14.04                   # FROM : 생성할 이미지
    MAINTAINER nasa1515                 # MAINTAINER : 이미지를 생성한 개발자의 정보
    LABEL "purpose"="practice"          # LABEL : 이미지에 메타데이터를 추가
    RUN apt-get update                  # RUN : 내부에서 실행하는 명령
    RUN apt-get install apache2 -y      # RUN : 내부에서 실행하는 명령
    ADD test.html /var/www/html         # ADD : 파일을 추가, 
    WORKDIR /var/www/html               # WORKDIR : 디렉토리 이동
    RUN ["/bin/bash", "-c", "echo hello >> test2.html"]  
    # RUN : 내부에서 실행하는 명령, test2.html 파일 생성
    EXPOSE 80                                           
    # EXPOSE : Dockefile의 빌드로 생성된 이미지에서 열어줄 포트
    CMD apachectl -DFOREGROUND                          
    # CMD : 컨테이너가 시작될 때마다 실행한 명령어, apache를 매번 실행
    ```

    <br/>

* Dockerfile 빌드  

    ```cs
    $ docker build -t [이미지 이름:이미지 버전] [Dockerfile의 경로]
    ```

    ``-t``는 생성될 이미지의 이름을 설정
    생략시 16진수 형태로 자동 생성되므로 사용하는 걸 추천


    <br/>

    ```cs
    $ docker build -t mybuild:0.0 ./
    Sending build context to Docker daemon  3.072kB
    Step 1/10 : FROM ubuntu:14.04
    ---> 7e4b16ae8b23
    Step 2/10 : MAINTAINER nasa1515
    ---> Using cache
    ---> 3a109c0fbc9c
    Step 3/10 : LABEL "purpose"="practice"
    ---> Using cache
    ---> eb4fc9a7f0c0
    Step 4/10 : RUN apt-get update
    ---> Using cache
    ---> 310c61072f92
    Step 5/10 : RUN apt-get install apache2 -y
    ---> Using cache
    ---> 351f441a52e6
    Step 6/10 : ADD test.html /var/www/html
    ---> Using cache
    ---> fabdb41b1d4a
    Step 7/10 : WORKDIR /var/www/html
    ---> Using cache
    ---> aade10f6b4bd
    Step 8/10 : RUN ["/bin/bash", "-c", "echo hello >> test2.html"]
    ---> Running in 1e831fca765c
    Removing intermediate container 1e831fca765c
    ---> 6e80dc20b1d2
    Step 9/10 : EXPOSE 80
    ---> Running in b2062df70dda
    Removing intermediate container b2062df70dda
    ---> a94a15199cc6
    Step 10/10 : CMD apachectl -DFOREGROUND
    ---> Running in bbc99d44fc10
    Removing intermediate container bbc99d44fc10
    ---> 83ef57094ad5
    Successfully built 83ef57094ad5
    Successfully tagged mybuild:0.0
    ```

<br/>


* ``.dockerignore``

    git에서 가져오게끔 만드는 경우  
    repository의 모든 파일과 모듈들을 가져오기 때문에 이미지 빌드에 필요한 파일만 있도록 해야합니다.  
    특정 파일들을 제외하고 싶으면 .gitignore과 같은 .dockerignore을 사용할 수 있습니다.

    <br/>

* dockerignore 파일 생성시 Docker 이미지 생성 시 이미지안에 들어가지 않을 파일을 지정 할 수 있습니다.

    ```cs
    $ vim dockerignore

    node_modules
    npm-debug.log
    Dockerfile*
    docker-compose*
    .dockerignore
    .git
    .gitignore
    README.md
    LICENSE
    .vscode

    :wq!
    ```
---

```toc
```