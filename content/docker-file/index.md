---
emoji: ๐คฆโโ๏ธ
title: "[DOCKER] - Dockerfile"
date: "2021-06-27 00:12:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


๋จธ๋ฆฌ๋ง  

 ์ด๋ฒ ํฌ์คํธ์์๋ Docker์์ ์กฐ๊ธ๋ ๊ฐํธํ๋ ๋ฐฉ๋ฒ์ผ๋ก ์ด๋ฏธ์ง๋ฅผ ์ ์ํ  ์ ์๋ Dockerfile์ ๋ํด์ ํฌ์คํํฉ๋๋ค.


---

## โ DOCKERFILE

``Dockerfile``์ ์ปจํ์ด๋๋ฅผ ๋ง๋ค๊ณ  ํด์ผํ๋ ์ผ๋ จ์ ์์๋ค์ ๋ฏธ๋ฆฌ ์ ์ธํจ์ผ๋ก์จ ๋งค๋ฒ ํด๋น ์์์ ํ์ง์๊ณ ๋,  
์ปจํ์ด๋ ์์ฑ์ ์๋์ผ๋ก ๋ฑ๋ก๋ ์์์ด ์คํ๋ ํ ์ปจํ์ด๋๋ฅผ ์์ฑํ  ์ ์๋ ํ์ผ์๋๋ค.

Dockerfile์ ์ดํ๋ฆฌ์ผ์ด์ ๊ฐ๋ฐ ์ธ์๋ ๋์ปค ํ๋ธ์ ๋ฐฐํฌํ ๋,์ด๋ฏธ์ง๊ฐ ์๋, Dockerfile์ ์ด์ฉํ์ฌ ๋ฐฐํฌํ  ์๋ ์์ต๋๋ค.

* Dockerfile์ COMMAND-VALUE ์์ผ๋ก ๊ตฌ์ฑ๋ ์ง์์ด๋ก ์ด๋ฃจ์ด์ง ๋์ปค ์ด๋ฏธ์ง ์ค์  ํ์ผ์๋๋ค.

 
* ๋ฒ ์ด์ค ์ด๋ฏธ์ง๋ฅผ ์ง์ , ์ปจํ์ด๋์์ ์คํ๋๋ ๋ช๋ น์ ์ ์, ํ๊ฒฝ ๋ณ์ ์ค์  ๋ฑ ์ปจํ์ด๋์์ ์คํ๋๋ ๋ฐ๋ชฌ์ ์ง์ ํ  ์ ์์ต๋๋ค.

* Dockerfile์์ ํ์ผ ์์คํ์ ๋ณ๊ฒฝ ์์ฒญํ๋ ์ง์์ด๋ ๋ฒ ์ด์ค ์ด๋ฏธ์ง ๋ ์ด์ด์ ์์ ๋ ์ด์ด๊ฐ ์์ฑ๋์ด ๋ณ๊ฒฝ์ฌํญ์ด ์ ์ฉ๋ฉ๋๋ค.

<br/>

---

## โ DOCKER FILE ์ง์์ด



* ``FROM``  
FROM ์ง์์ด๋ก ๋ฒ ์ด์ค ์ด๋ฏธ์ง๋ฅผ ์ง์ ํ์ฌ ๋ ์ด์ด๋ฅผ ์์ฑํฉ๋๋ค.

    ์ง์ ๋ ์ด๋ฏธ์ง๊ฐ ๋์ปค ํธ์คํธ๋ก ์๋์ผ๋ก ``pull down`` ๋ฉ๋๋ค.  
    ๋์ปค ํธ์คํธ ๋๋ Docker Registry(DockerHub, Private Docker Registry, ..)์ ์๋ ์ด๋ฏธ์ง๋ง ์ง์ ์ด ๊ฐ๋ฅํฉ๋๋ค.

 

    ``FROM``์ง์์ด๋ ์ธ๊ฐ์ง ํ์์ผ๋ก ์ฌ์ฉ๋ฉ๋๋ค.

    ```cs
    FROM IMAGE

    FROM IMAGE:TAG

    FROM IMAGE@DIGEST
    ```

<br/>

---

* ``RUN``  
    ๋ฒ ์ด์ค ์ด๋ฏธ์ง๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ํจํค์ง๋ฅผ ์ค์นํ๊ฑฐ๋ ํ๊ฒฝ์ ๊ตฌ์ฑํ  ๋ ์ฌ์ฉํฉ๋๋ค.

    ๋๊ฐ์ง ์ฌ์ฉ ํ์์ด ์์ง๋ง, ๊ฒฐ๊ณผ์ ์ผ๋ก ๋ณด๋ฉด ํฐ ์ฐจ์ด๋ ์์ต๋๋ค.

 
    * ์ ๋ช๋ น  
    /bin/sh -c ์ผ๋ก ์คํํ๋ ๊ฒ๊ณผ ๋์ผํ๊ฒ ์๋ํฉ๋๋ค.

    ```cs
    RUN yum -y install httpd
    ```

    ์๋์ผ๋ก /bin/sh -c yum -y install httpd ๋ก ๋ณํ๋ฉ๋๋ค.

    * Exec ๋ช๋ น  
    ์์ ๊ฑฐ์น์ง ์๊ณ  ๋ฐ๋ก ์คํํฉ๋๋ค.  
    ๋ฐ๋ผ์ ํ๊ฒฝ ๋ณ์๋ฅผ ์๋ ฅํ  ์ ์๊ณ , JSON ํ์์ผ๋ก ์๋ ฅํด์ผ๋ง ํฉ๋๋ค.

    ```cs
    RUN [ "/bin/bash", "-c", "yum -y install httpd" ]   
    ```

<br/>

---

* ``CMD``  
    ๋น๋ํ ์ด๋ฏธ์ง๋ก๋ถํฐ ์ปจํ์ด๋๊ฐ ์คํ๋  ๋ ํน์  ํ๋ก์ธ์ค๋ ๋ฐ๋ชฌ์ ์คํํ๊ธฐ ์ํด ์ฌ์ฉ๋ฉ๋๋ค.

    CMD ์ง์์ด๋ฅผ ์ฌ๋ฌ๋ฒ ์ฌ์ฉํ  ๊ฒฝ์ฐ, ๋ง์ง๋ง ์ง์์ด๋ง ์ ์ฉ๋๋ฏ๋ก ํ๋ฒ๋ง ์ฌ์ฉํด์ผ ํฉ๋๋ค.

    RUN๊ณผ ๋ง์ฐฌ๊ฐ์ง๋ก ์ ๋ช๋ น๊ณผ Exec ๋ช๋ น ๋๊ฐ์ง ํ์์ผ๋ก ์ฌ์ฉํ  ์ ์์ต๋๋ค.

 
    * ์ ๋ช๋ น  

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

    ๋ง์ผ docker run ์ ๋ช๋ น์ด๋ฅผ ์ง์ ํ๋ฉด CMD๋ ๋ฌด์๋๊ณ  ์ง์ ๋ ๋ช๋ น์ด๊ฐ ์ํ๋ฉ๋๋ค.

<br/>

---

* ``ENTRYPOINT``  
    ๋น๋ํ ์ด๋ฏธ์ง๋ก๋ถํฐ ์ปจํ์ด๋๊ฐ ์คํ๋  ๋ ํน์  ํ๋ก์ธ์ค๋ ๋ฐ๋ชฌ์ ์คํํ๊ธฐ ์ํด ์ฌ์ฉ๋ฉ๋๋ค.

    docker run ๋ช๋ น์ ์คํํ  ๋ ์คํ๋๋ฏ๋ก CMD ์ง์์ด๋ณด๋ค ์ฐ์ ์์๊ฐ ๋์ต๋๋ค. 


    RUN ์ง์์ด์ ๋์ผํ๊ฒ ์ ๋ช๋ น๊ณผ Exec  ๋ช๋ น ๋๊ฐ์ง ํ์์ผ๋ก ์ฌ์ฉํ  ์ ์์ต๋๋ค.

     * ์ ๋ช๋ น  

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


    ``Entrypoint`` ์ค์ ์ด ์ถ๊ฐ๋ ๊ฒ์ ํ์ธํ  ์ ์์ต๋๋ค. 

    CMD ์ง์์ด์๋ ๋ฌ๋ฆฌ docker run ์ ์ง์ ํ ๋ช๋ น์ด๋ ๋ฌด์๋๊ณ  ENTRYPOINT ์ง์์ด๊ฐ ์คํ๋ฉ๋๋ค.  
    ์๋ก ์ ์ํ๋ ค๋ฉด docker exec ๋ช๋ น์ ์ฌ์ฉํด์ผ ํฉ๋๋ค.

    mysql ์ด๋ฏธ์ง์ ๊ฒฝ์ฐ ENTRYPOINT docker-entrypoint.sh ์ง์์ด๊ฐ ํฌํจ๋์ด์์ต๋๋ค.  
    ์ด ์คํฌ๋ฆฝํธ์์ ํน์  ํ๊ฒฝ๋ณ์๋ฅผ ๊ฒ์ฌํ์ฌ ์ปจํ์ด๋๋ฅผ ์คํํฉ๋๋ค.

<br/>

---

* ``ONBUILD``  
๋ฒ ์ด์ค ์ด๋ฏธ์ง๋ฅผ ์์ฑํ  ๋ ์ฌ์ฉํ๋ ์ง์์ด๋ก์,  
์ด๋ฏธ์ง๋ฅผ ๋น๋ํ ํ ํด๋น ์ด๋ฏธ์ง๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ๋ค๋ฅธ ์ด๋ฏธ์ง๋ฅผ ๋น๋ํ  ๋ ์ ์ฉ๋๋ ์ง์์ด๋ค.

 

    ONBUILD ๋ช๋ น์ด๊ฐ ์ ์ฉ๋ ์ด๋ฏธ์ง๋ก ์ปจํ์ด๋๋ฅผ ์์ฑํด๋ ์ปจํ์ด๋๋ ํด๋น ๋ช๋ น์ด๋ฅผ ์คํํ์ง ์์ต๋๋ค.  
    ํด๋น ์ด๋ฏธ์ง๋ฅผ ๋ฒ ์ด์ค ์ด๋ฏธ์ง๋ก ํด์ ๋ค๋ฅธ ์ด๋ฏธ์ง๋ฅผ ๋น๋ํ ๋ ๋ช๋ น์ด๊ฐ ์คํ๋ฉ๋๋ค.

 

    ``ONBUILD ADD`` ๋ช๋ น์ด๋ ๋์ปค ํธ์คํธ์ ํ์ผ์ ์ปจํ์ด๋์ ํน์  ๋๋ ํ ๋ฆฌ์ ์ ์ฉํ  ๋ ์ฌ์ฉํฉ๋๋ค.

    ```cs
    FROM centos
    RUN yum -y install httpd
    ONBUILD ADD index.html /var/www/html
    CMD /usr/sbin/httpd -D FOREGROUND
    ```

* ์ด๋ฏธ์ง๋ฅผ ๋น๋ํฉ๋๋ค.  
    FROM ์ง์์ด๋ก ์์ฑ๋ centos ๋ ์ด์ด์ RUN ์ง์์ด๋ก ์์ฑ๋ ๋ ์ด์ด ๋๊ฐ๋ง ๋ํ๋ฉ๋๋ค.  
    ONBUILD๋ก ์ง์ ๋ ADD index.html /var/www/html ๋ช๋ น์ ์คํ๋์ง ์๊ณ   
    OnBuild ํ๋๋ก ์๋ฐ์ดํธ ๋ ๊ฒ์ ํ์ธํ  ์ ์์ต๋๋ค.

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

* OnBuild๊ฐ ์ ์ฉ๋ ์ด๋ฏธ์ง๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ๋ ๋ค๋ฅธ ์ด๋ฏธ์ง๋ฅผ ์์ฑํฉ๋๋ค.  
    ์ด๋ฒ์ ADD ๋ช๋ น์ด๊ฐ ์ํ๋์ด์ผ ํ๋ฏ๋ก ๋์ปค ํธ์คํธ์ index.html ํ์ผ์ด ์กด์ฌํ์ฌ์ผ ํฉ๋๋ค.  
    OnBuild ํ๋๊ฐ null๋ก ์์ฑ๋๊ณ , ADD index.html /var/www/html ์ง์์ด๊ฐ ์ ์ฉ๋ ๋ ์ด์ด๊ฐ ์ถ๊ฐ๋์๊ธฐ ๋๋ฌธ์  
    ์ด 3๊ฐ์ ๋ ์ด์ด๊ฐ ๋ํ๋๊ฒ ๋ฉ๋๋ค.

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
    ๋์ปค ๋ณผ๋ฅจ์ ์์ฑํฉ๋๋ค.

 

    ``VOLUME`` ์ง์์ด๋ฅผ ์ค์ ํ๋ฉด ํด๋น ์ปจํ์ด๋ ํจ์ค์ ์ฐ๊ฒฐ๋๋ ๋๋ ํ ๋ฆฌ๋ฅผ ์์ฑํ๊ณ  ๋ง์ดํธํฉ๋๋ค.

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

* ์์ฑ๋ ์ด๋ฏธ์ง๋ก ์ปจํ์ด๋๋ฅผ ์คํํฉ๋๋ค.

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

* ๋์ปค ๋ณผ๋ฅจ์ด ์๋์ผ๋ก ์์ฑ๋ ๊ฒ์ ํ์ธํ  ์ ์์ต๋๋ค. 

    ```cs
    $ docker volume ls
    DRIVER              VOLUME NAME
    local               8fadb85943d78e953a16e643bc6ae1e5733419c8f8bb2d178cd0d45ba39f5217
    ```

<br/>


---

* ``EXPOSE``  
    EXPOSE ์ง์์ด๋ฅผ ์ฌ์ฉํ์ฌ ์ปจํ์ด๋๊ฐ ์ฌ์ฉํ  ํฌํธ๋ฅผ ์ง์ ํฉ๋๋ค.  

    ์ปจํ์ด๋๋ฅผ ์คํํ  ๋ ๋ฐ๋์ ํฌํธ ๋งคํ ์ค์ ์ ๋ฃ์ด์ฃผ์ด์ผ ํฉ๋๋ค.  
    ๋ง์ผ ํธ์คํธ ๋คํธ์ํฌ ๋๋ผ์ด๋ฒ๋ฅผ ์ฌ์ฉํฉ๋๋ค๋ฉด ํฌํธ ๋งคํ์ ์ค์ ํ์ง ์๊ณ  ์๋์ผ๋ก ํธ์คํธ ํฌํธ๋ก ๋ธ์ถ๋ฉ๋๋ค.

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
    

    ์ด๋ฏธ์ง ์ ๋ณด์์ ํฌํธ ๋ธ์ถ์ ํ์ธํ  ์ ์์ต๋๋ค.

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

    docker run ์ ํฌํธ ๋งคํ ์ต์์ ์ ์ฉํ์ฌ ํธ์คํธ์์ ํด๋น ํฌํธ๊ฐ LISTEN ์ํ์์ ํ์ธํ  ์ ์์ด์ผ ํฉ๋๋ค.

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
    MAINTAINER ์ง์์ด๋ ์ด๋ฏธ์ง์ ๊ด๋ฆฌ์ ์ ๋ณด๋ฅผ ๊ธฐ๋กํฉ๋๋ค.

    ```cs
    MAINTAINER nasa1515
    ```

    ์ด๋ฏธ์ง ์ ๋ณด๋ฅผ ์กฐํํ๋ฉด Author ํ๋์ ์ถ๊ฐ๋ ๊ฒ์ ํ์ธํ  ์ ์์ต๋๋ค.

    ```cs
    [
        {
            ...
            "Author": "nasa1515",
            ...
    ```

<br/>

---

## ๐ENTRYPOINT ์ CMD์ ์ฐจ์ด


*   ``ENTRYPOINT์`` ``CMD``๋ ๋๋ค ์ดํ๋ฆฌ์ผ์ด์์ ์ง์ ํ๋ ์ง์์ด์ธ๋ฐ  
 ENTRYPOINT ์ CMD ์ ์ฐจ์ด์ ์ ๋ฐ๋ก ์ปจํ์ด๋ ์์์ ์คํ ๋ช๋ น์ ๋ํ Default ์ง์  ์ฌ๋ถ์๋๋ค.

 
* ๋ง์ฝ ``ENTRYPOINT`` ๋ฅผ ์ฌ์ฉํ์ฌ ์ปจํ์ด๋ ์ํ ๋ช๋ น์ ์ ์ํ ๊ฒฝ์ฐ  
  ํด๋น ์ปจํ์ด๋๊ฐ ์ํ๋  ๋ ๋ฐ๋์ ENTRYPOINT ์์ ์ง์ ํ ๋ช๋ น์ ์ํ๋๋๋ก ์ง์  ๋ฉ๋๋ค.

 

* ``CMD``๋ฅผ ์ฌ์ฉํ์ฌ ์ํ ๋ช๋ น์ ๊ฒฝ์ฐ๋  
    ์ปจํ์ด๋๋ฅผ ์คํํ ๋ ์ธ์๊ฐ์ ์ฃผ๊ฒ ๋๋ฉด Dockerfile ์ ์ง์ ๋ CMD ๊ฐ์ ๋์  ํ์ฌ ์ง์ ํ ์ธ์๊ฐ์ผ๋ก ๋ณ๊ฒฝํ์ฌ ์คํ๋๊ฒ ๋ฉ๋๋ค.

 
    ์ดํด๊ฐ ์ฝ๊ฒ Dockerfile ์์  ์จ๋ณด๊ฒ ์ต๋๋ค

    ```cs
    # Dockerfile

    FROM ubuntu
    CMD ["/bin/df", "-h"]
    ```

    ์์์ Dockerfile ์ CMD ๋ฅผ ์ฌ์ฉํ์ฌ df -h ๋ช๋ น์ ํ๋ฒ ์ํํ๊ณ  ์ข๋ฃ๋๋ ์ด๋ฏธ์ง๋ฅผ ๋ง๋๋ ๊ฒ์๋๋ค.

    <br/>

* ํ์คํธ๋ฅผ ์ํด ์ Dockerfile ์ ์ฌ์ฉํด nasa/df ๋ผ๋ ์ด๋ฆ์ ๊ฐ์ง ์ด๋ฏธ์ง๋ฅผ ๋น๋ํด๋ณด์ฃ . 

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

    ๋น๋๋ nasa/df ์ด๋ฏธ์ง๋ฅผ ์ปจํ์ด๋๋ก ๋์์์ผ ๋ณด๋ฉด  
    Dockerfile ์์ ์ ์๋ ๋๋ก df -h ๋ช๋ น์ ์คํํ๊ณ  ์ข๋ฃ๋๊ฒ ๋ฉ๋๋ค. 

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

* ์ด๋ฒ์๋, ์ปจํ์ด๋ ์คํ์ ์ถ๊ฐ ์ธ์ ๊ฐ์ ์ค์ ์ํํ  ๋ช๋ น์ ๋ฐ๊ฟ๋ณด์ฃ .  
    docker run ์ผ๋ก ์ปจํ์ด๋ ์คํ์ ๋ง์ง๋ง์ ps ๋ช๋ น์ ์ถ๊ฐ ์ธ์๋ฅผ ์ฃผ๊ณ   
    ์คํํด ๋ณด๋ฉด ์๋์ ๊ฐ์ ๊ฒฐ๊ณผ๋ฅผ ๋ณผ ์ ์์ต๋๋ค.

    ```cs
    $ docker run --name nasa-df nasa/df ps -aef

    UID        PID  PPID  C STIME TTY          TIME CMD
    root         1     0  0 15:19 ?        00:00:00 ps -aef
    ```
    CMD ๋ก ์ง์ ํ ๋ด์ฉ ๋์  ์ปจํ์ด๋ ์คํ์ ๋ฐ์ ์ธ์๋ก ๋์ฒดํ์ฌ ์คํ๋จ์ ๋ณผ ์ ์์ต๋๋ค.

    <br/>

* ``docker inspect`` ๋ช๋ น์ ํตํด ์ปจํ์ด๋ ์ค์  ๋ด์ฉ์ ์์ธํ ๋ณด๊ฒ ์ต๋๋ค.

    ```cs
    $ docker inspect nasa-df
    ...
                "Cmd": [
                    "ps",
                    "-aef"
                ],
    ...
    ```

    ์ปจํ์ด๋ ์ค์ ์ Cmd ๊ฐ์ด ์ธ์ ๊ฐ์ผ๋ก ๋์ฒด๋ ๊ฒ์ด ํ์ธ ๊ฐ๋ฅํฉ๋๋ค.

<br/>

 ---

 * ์ด๋ฒ์๋ ENTRYPOINT ๋ฅผ ์ฌ์ฉํ์ฌ ์ปจํ์ด๋ ์ด๋ฏธ์ง๋ฅผ ๋ง๋ค์ด ๋ณด๊ฒ ์ต๋๋ค.

    ๋จ์ง CMD๋ฅผ ENTRYPOINT ๋ก ๋์ ํ ๊ฒ ๋ฟ์๋๋ค.

    ```cs
    # Dockerfile

    FROM ubuntu
    ENTRYPOINT ["/bin/df", "-h"]
    ```

    <br/>

* ์ด๋ฒ์ nasa/df:entry ๋ผ๋ ํ๊ทธ๋ฅผ ์ถ๊ฐํ์ฌ ์ด๋ฏธ์ง๋ฅผ ๋น๋

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

* ๋น๋๋ nasa/df:entry ์ด๋ฏธ์ง๋ก ์ปจํ์ด๋๋ฅผ ์คํ

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

    ์คํ๋ ๊ฒฐ๊ณผ๋ CMD ์๋ ๋ค๋ฅธ๊ฒ ์๋ค.


    <br/>

* docker inspect ๋ก ์์ธํ ์ดํด๋ณด๋ฉด ์ฝ๊ฐ์ ๋ค๋ฅธ์ ์ ๋ณผ ์ ์์ต๋๋ค.

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
    ``Entrypoint`` ํญ๋ชฉ์ ์คํ๋ ๋ช๋ น ์ ๋ณด๊ฐ ์๊ณ   
    CMD๋ null ๋ก ๋น์์ ธ ์๋๊ฒ์ ๋ณผ ์ ์์ต๋๋ค.

 
    <br/>

* CMD ํ์คํธ์ ๋์ผํ๊ฒ ์ธ์๋ฅผ ์ถ๊ฐ๋ก ๋ฃ์ด ์ปจํ์ด๋๋ฅผ ์คํ 

    ENTRYPOINT ์ CMD์ ํ์คํ ์ฐจ์ด๋ฅผ ๋ณผ ์ ์์ต๋๋ค.

    ```cs
    $ docker run --name nasa-df nasa/df:entry ps -aef

    /bin/df: invalid option -- 'e'
    Try '/bin/df --help' for more information.
    ```

    ์๋ฌ๋ฅผ ์ถ๋ ฅํ๋ฉฐ ์ํ๋ ๋์์ด ์คํ๋์ง ์์์์ ๋ณผ ์ ์์ต๋๋ค.

    <br/>

* ``docker inspect`` ๋ฅผ ์ฌ์ฉํด ์ดํด๋ณด์ฃ .

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

    ์ปจํ์ด๋ ์คํ์ /bin/df ๋ช๋ น์ ์ ์งํ๊ณ   
    ์ถ๊ฐ ์ธ์๋ฅผ CMD๋ก ๋ฐ์ ์ฒ๋ฆฌํ ๊ฒ์ ๋ณผ ์ ์์ต๋๋ค.

    ์ปจํ์ด๋ ์์์ ์๋์ ๊ฐ์ ๋ช๋ น์ด๋ฅผ ์ํํ ๊ฒ๊ณผ ๊ฐ์ ๊ฒ์ด๋ฉฐ  
    ์ด๋ ์ ์ ํ ๋ช๋ น์ด ์๋์์ผ๋ฏ๋ก ์๋ฌ๋ก ๋๋ ๊ฒ์์ ์ ์ ์์ต๋๋ค.

    ```cs
    > df -h ps -aef     
    
    # ENTRYPOINT : df -h  
    # CMD : ps -aef

    df: invalid option -- 'e'
    Try 'df --help' for more information.
    ```

<br/>

---

### ENTRYPOINT ์ CMD์ ์ฌ์ฉ ๋ฐฉ๋ฒ
 

  ๊ฐ์ ๊ฒ ๊ฐ์ผ๋ฉด์ ๋ค๋ฅธ ๋ ์ง์์ด์ ์ฐจ์ด๋ฅผ ์์ ์ค์ต์ผ๋ก ์์๋ดค์ต๋๋ค.  
  ๊ทธ๋ ๋ค๋ฉด ENTRYPOINT์ CMD ๋ ์ด๋ป๊ฒ ์ฌ์ฉํ๋๊ฒ ์ข์๊น.

 
1. ์ปจํ์ด๋๊ฐ ์ํ๋  ๋ ๋ณ๊ฒฝ๋์ง ์์ ์คํ ๋ช๋ น์ CMD ๋ณด๋ค๋ ENTRYPOINT ๋ก ์ ์ํ๋๊ฒ ์ข๋ค.

    ์ปจํ์ด๋๋ฅผ ๋ง๋ค๋ ์๋ง ๋๋ถ๋ถ์ ํด๋น ์ปจํ์ด๋๊ฐ ์คํ๋  ๋ชฉ์ ์ด ๋ถ๋ชํ  ๊ฒ์๋๋ค.  
  ์น์๋ฒ(nginx)๊ฐ ๋  ์๋ ์๊ณ , App์๋ฒ(node)๊ฐ ๋  ์๋ ์์ผ๋ฉฐ DB(mysql) ๊ฐ ๋  ์๋ ์์ต๋๋ค.

    ์ฆ, ์ด๋ฏธ์ง๋ฅผ ๋ง๋ค๋๋ ์คํ ๋ชฉ์ ์ด ๋ถ๋ชํ๋ฏ๋ก nginx / node / mysql ๊ฐ์  
    ๋ฉ์ธ ํ๋ก์ธ์ค๊ฐ ๋  ๋ช๋ น์ ๊ฒฝ์ฐ๋ ``ENTRYPOINT`` ๋ก ์ ์ํ๋๊ฒ ๋ชํํ  ๊ฒ์๋๋ค.


<br/>
 

2. ๋ฉ์ธ ๋ช๋ น์ด๊ฐ ์คํ์ default option ์ธ์ ๊ฐ์ CMD๋ก ์ ์ํฉ๋๋ค

    ``CMD`` ๋ ``ENTRYPOINT`` ์ ํจ๊ป ์ฌ์ฉ์ ์ถ๊ฐ ์ธ์ ๊ฐ์ผ๋ก ํ์ฉ ๋ฉ๋๋ค.   
    ๊ทธ๋ฌ๋ฏ๋ก,  ๋ฉ์ธ ํ๋ก์ธ์ค์ ๋ํ default ์ต์๊ฐ์ CMD ๋ก ์ ์ํด์ฃผ๋ฉด ์ข์ ๊ฒ์๋๋ค. 


<br/>

3. ``ENTRYPOINT`` ์ ``CMD``๋ ``๋ฆฌ์คํธ ํฌ๋งท`` ( ["args1", "args2",...] )์ผ๋ก ์ ์ํด ์ฃผ๋๊ฒ ์ข๋ค. 

    ENTRYPOINT ์ CMD ๋ฅผ ์์ฑํ ๋๋ ๋๋ถ๋ถ List ํํ๋ก ์์ฑํ์ง๋ง,  
    ์๋์ ๊ฐ์ด ์ผ๋ฐ์ ์ธ shell ํํ๋ก๋ ์์ฑ ๊ฐ๋ฅํฉ๋๋ค.

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

## ๐คณdocker file ์์ 

* ์๋์ ๊ฐ์ Docker File์ ์์ฑํด๋ณด์์ต๋๋ค

    ```cs
    FROM ubuntu:14.04                   # FROM : ์์ฑํ  ์ด๋ฏธ์ง
    MAINTAINER nasa1515                 # MAINTAINER : ์ด๋ฏธ์ง๋ฅผ ์์ฑํ ๊ฐ๋ฐ์์ ์ ๋ณด
    LABEL "purpose"="practice"          # LABEL : ์ด๋ฏธ์ง์ ๋ฉํ๋ฐ์ดํฐ๋ฅผ ์ถ๊ฐ
    RUN apt-get update                  # RUN : ๋ด๋ถ์์ ์คํํ๋ ๋ช๋ น
    RUN apt-get install apache2 -y      # RUN : ๋ด๋ถ์์ ์คํํ๋ ๋ช๋ น
    ADD test.html /var/www/html         # ADD : ํ์ผ์ ์ถ๊ฐ, 
    WORKDIR /var/www/html               # WORKDIR : ๋๋ ํ ๋ฆฌ ์ด๋
    RUN ["/bin/bash", "-c", "echo hello >> test2.html"]  
    # RUN : ๋ด๋ถ์์ ์คํํ๋ ๋ช๋ น, test2.html ํ์ผ ์์ฑ
    EXPOSE 80                                           
    # EXPOSE : Dockefile์ ๋น๋๋ก ์์ฑ๋ ์ด๋ฏธ์ง์์ ์ด์ด์ค ํฌํธ
    CMD apachectl -DFOREGROUND                          
    # CMD : ์ปจํ์ด๋๊ฐ ์์๋  ๋๋ง๋ค ์คํํ ๋ช๋ น์ด, apache๋ฅผ ๋งค๋ฒ ์คํ
    ```

    <br/>

* Dockerfile ๋น๋  

    ```cs
    $ docker build -t [์ด๋ฏธ์ง ์ด๋ฆ:์ด๋ฏธ์ง ๋ฒ์ ] [Dockerfile์ ๊ฒฝ๋ก]
    ```

    ``-t``๋ ์์ฑ๋  ์ด๋ฏธ์ง์ ์ด๋ฆ์ ์ค์ 
    ์๋ต์ 16์ง์ ํํ๋ก ์๋ ์์ฑ๋๋ฏ๋ก ์ฌ์ฉํ๋ ๊ฑธ ์ถ์ฒ


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

    git์์ ๊ฐ์ ธ์ค๊ฒ๋ ๋ง๋๋ ๊ฒฝ์ฐ  
    repository์ ๋ชจ๋  ํ์ผ๊ณผ ๋ชจ๋๋ค์ ๊ฐ์ ธ์ค๊ธฐ ๋๋ฌธ์ ์ด๋ฏธ์ง ๋น๋์ ํ์ํ ํ์ผ๋ง ์๋๋ก ํด์ผํฉ๋๋ค.  
    ํน์  ํ์ผ๋ค์ ์ ์ธํ๊ณ  ์ถ์ผ๋ฉด .gitignore๊ณผ ๊ฐ์ .dockerignore์ ์ฌ์ฉํ  ์ ์์ต๋๋ค.

    <br/>

* dockerignore ํ์ผ ์์ฑ์ Docker ์ด๋ฏธ์ง ์์ฑ ์ ์ด๋ฏธ์ง์์ ๋ค์ด๊ฐ์ง ์์ ํ์ผ์ ์ง์  ํ  ์ ์์ต๋๋ค.

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