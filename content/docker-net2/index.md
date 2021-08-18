---
emoji: 🤦‍♂️
title: MACVLAN, LINK [DOCKER]
date: "2021-06-26 00:11:25"
author: nasa1515
tags: DOCKER
categories: DOCKER
---


머리말  
 이전 포스트에서는 도커의 네트워크에 대해서 포스팅했습니다.  
 이번 포스트에서는 이전 포스트에서 포스팅한 네트워크의 종류가 아니라  
 실제 컨테이너에 사용자가 네트워크 대역대를 직접 설정할 수 있는 MACVLAN과 LINK에 대해서 포스팅합니다.

---

## ✔ MACVLAN

* MacVLan은 브릿지가 없습니다. 대신 서브 인터페이스라는 개념이 등장해서 사용합니다.  


* 물리적인 NIC eth0은 존재하며 ``eh0``에서 여러 하위 인터페이스를 만듬으로써 여러개의 mac 주소를 가질 수 있도록 합니다.  
    그렇게 되면 생성된 하위 인터페이스들에 여러개의 컨테이너들이 연결되면서 VLAN을 구성할 수 있습니다.  

* 즉 하나의 NIC를 가상화함으로써 여러개의 MAC주소를 생성하는 것이라고 할 수 있습니다


<br/>

### MACVLAN Driver 구조

![](https://lh3.googleusercontent.com/k6U4fO2FWI-lA5f_G7bO1w88OtgIki7azKcXbdpcCClhW79M4cRBOgIWYX3KhYKLRYpyE40lqX41MWj4m_6mLuUPbahQFh76CYQwU9lde7jqPmc4ClZwZJ_YF8XNJvOVF9eBRCyu)  



* macvlan은 부모 인터페이스(parent)와 서브 인터페이스(slave)로 나눈다.    
* 부모 인터페이스는 가상화될 주체, 즉 실제 물리적인 NIC인 eth0이 됩니다.  
* 거기서 생성된 서브 인터페이스들은 mac0, mac1, mac2가 됩니다.  
* macvlan으로 생성된 인터페이스를 지칭할 때는 mac0@eth0과 같이 표현합니다. ``(mac0은 서브 인터페이스, eth0이 부모 인터페이스)``


<br/>

### MACVLAN 구동 방식


* 호스트(eth0)와는 통신이 안되지만 다른 서브 인터페이스간 통신은 되는 방식  
* 호스트와 통신이 안되는 것은 원래 macvlan에서 안되는 것이고  
다른 서브 인터페이스간의 통신이 되는 것은 bridge 등 들과 차이를 가진다

* macvlan 방식은 부모 인터페이스에 간단한 브릿지를 두어서  
다른 서브 인터페이스로 향하는 트래픽을 밖으로 내보내지 않고 바로 전달하는 방식이다  
(내부 컨테이너끼리 통신을 하는 경우)  

* 모든 서브 인터페이스의 맥 주소를 알고 있는 상태이므로  
브릿지에서 Mac Learning(맥 추가) 작업도 필요없고 루핑을 방지하기 위한 STP알고리즘도 필요 없다.

<br/>

---

## ✌ MACVLAN 설정

* LINUX NIC의 promisc 모드를 활성화  
    MacVlan을 사용하기 위해서는 ``Promiscuous mode``를 활성화 해야 합니다.

    * LINUX에서는 하나의 NIC에 하나의 MAC 주소를 학습하도록 구성되어있습니다.  
    * MacVlan을 사용할 경우 서브 인터페이스 하단의 MAC을 다중으로 ARP TABLE에서 확인 가능

    ```cs
    nasa1515@nasa:~$ ip a | grep wlp3s0
    3: wlp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    inet 192.168.100.9/24 brd 192.168.100.255 scope global dynamic noprefixroute wlp3s0
    nasa1515@nasa:~$ sudo ip link set wlp3s0 promisc on
    ```


    <br/>

* NIC에 PROMISC가 추가된 것을 확인

    ```cs
    nasa1515@nasa:~$ ip a | grep wlp3s0
    3: wlp3s0: <BROADCAST,MULTICAST,PROMISC,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
        inet 192.168.100.9/24 brd 192.168.100.255 scope global dynamic noprefixroute wlp3s0
    ```

    <br/>

* MacVlan 네트워크 생성  
    부모 인터페이스 카드를 지정하여 새로운 MacVlan 네트워크를 생성합니다.  

    ```cs
    nasa1515@nasa:~$ docker network create -d macvlan --subnet=192.168.57.0/24 --gateway=192.168.57.1 --ip-range=192.168.57.0/24 -o parent=wlp3s0 macvlan1 
    14ae59d5fa0446094d77fe0233270d0c68643636181991f5f9c6333b0d2792df
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker network ls
    NETWORK ID          NAME                DRIVER              SCOPE
    c4031fa4ad4b        bridge              bridge              local
    29d9e0411d39        host                host                local
    14ae59d5fa04        macvlan1            macvlan             local
    ddad85781d7f        nasanet             bridge              local
    054fbf919b85        none                null                local
    ```
    ``wlp3s0``을 사용해 ``macvlan1``을 생성한 것을 확인 할 수 있습니다.

    <br/>

* ``macvlan1``을 사용하는 컨테이너 생성

    ```cs
    nasa1515@nasa:~$ docker run -itd --name mac-nasa --network macvlan1 centos:latest
    b63a1b3bc91faea7893991e1ed4407e23fd179d82ec8456925bd22740da21833
    --------------------------------------------------------------------------------
    nasa1515@nasa:~$ docker ps
    CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
    b63a1b3bc91f        centos:latest       "/bin/bash"         21 seconds ago      Up 20 seconds                           mac-nasa

    ```


    <br/>

* ``mac-nasa`` 컨테이너의 네트워크 확인

    ```cs
    nasa1515@nasa:~$ docker exec mac-nasa ip a
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
        inet 127.0.0.1/8 scope host lo
        valid_lft forever preferred_lft forever
    41: eth0@if3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
        link/ether 02:42:c0:a8:39:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
        inet 192.168.57.2/24 brd 192.168.57.255 scope global eth0
        valid_lft forever preferred_lft forever
    ```

    <br/>

* 추가적으로 ``mac-nasa2``라는 컨테이너를 동일하게 생성하였음

    ```cs
    nasa1515@nasa:~$ docker run -itd --name mac-nasa2 --network macvlan1 centos:latest
    528f559bfdca2a7fb5ea47a259cfba69f7efdc9368e94f4ebe86ac7302b77168
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker exec mac-nasa2 ip a
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
        inet 127.0.0.1/8 scope host lo
        valid_lft forever preferred_lft forever
    42: eth0@if3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
        link/ether 02:42:c0:a8:39:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
        inet 192.168.57.3/24 brd 192.168.57.255 scope global eth0
        valid_lft forever preferred_lft forever
    ```

    <br/>

* ``mac-nasa`` <-> ``mac-nasa2`` 의 통신이 정상적임을 확인합니다.  
    MacVlan 네트워킹 기반의 통신이 정상적인 것을 확인할 수 있습니다.


    ```cs
    nasa1515@nasa:~$ docker exec mac-nasa ping -c5 192.168.57.3
    PING 192.168.57.3 (192.168.57.3) 56(84) bytes of data.
    64 bytes from 192.168.57.3: icmp_seq=1 ttl=64 time=0.051 ms
    64 bytes from 192.168.57.3: icmp_seq=2 ttl=64 time=0.096 ms
    64 bytes from 192.168.57.3: icmp_seq=3 ttl=64 time=0.089 ms
    64 bytes from 192.168.57.3: icmp_seq=4 ttl=64 time=0.085 ms
    64 bytes from 192.168.57.3: icmp_seq=5 ttl=64 time=0.086 ms

    --- 192.168.57.3 ping statistics ---
    5 packets transmitted, 5 received, 0% packet loss, time 38ms
    rtt min/avg/max/mdev = 0.051/0.081/0.096/0.017 ms
    ```

<br/>

----

## 🤞 LINK

* 컨테이너끼리 서로 통신하기 위해선 기본적으로 ``bridge``를 사용합니다.
* 하지만 web 서버 역할의 컨테이너와 DB 서버 역할의 컨테이너가 있습니다고 가정해보고,  
만약, 이 두 container 사이를 연동해야 합니다고 하면 LINK를 사용해야 합니다.

<br/>

### LINK를 쓰는 정확한 이유

동일 host 상에 배포된 container는 사실 Private IP 를 이용해 통신이 가능합니다. 

 
 * 아래 두개의 컨테이너를 생성해놓았습니다

    ```cs
    nasa1515@nasa:~$ docker ps
    CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
    aa342876ff52        centos:latest       "/bin/bash"         25 seconds ago      Up 23 seconds                           nasa2
    32d0528aa4e4        centos:latest       "/bin/bash"         27 seconds ago      Up 26 seconds                           nasa1
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker inspect nasa2 | grep -i IPA
                "SecondaryIPAddresses": null,
                "IPAddress": "172.17.0.3",
                        "IPAMConfig": null,
                        "IPAddress": "172.17.0.3",
    nasa1515@nasa:~$ docker inspect nasa1 | grep -i IPA
                "SecondaryIPAddresses": null,
                "IPAddress": "172.17.0.2",
                        "IPAMConfig": null,
                        "IPAddress": "172.17.0.2",
    ```
    각각 ``172.17.0.2`` , ``172.17.0.3`` Private IP를 가지고 있습니다

    <br/>

*   두 컨테이너의 핑 테스트 결과 정상적입니다

    ```cs
    nasa1515@nasa:~$ docker exec nasa1 ping -c3 172.17.0.3
    PING 172.17.0.3 (172.17.0.3) 56(84) bytes of data.
    64 bytes from 172.17.0.3: icmp_seq=1 ttl=64 time=0.134 ms
    64 bytes from 172.17.0.3: icmp_seq=2 ttl=64 time=0.105 ms
    64 bytes from 172.17.0.3: icmp_seq=3 ttl=64 time=0.089 ms

    --- 172.17.0.3 ping statistics ---
    3 packets transmitted, 3 received, 0% packet loss, time 43ms
    rtt min/avg/max/mdev = 0.089/0.109/0.134/0.020 ms
    ```


위의 실습 같이 컨테이너는 이미 서로간의 통신이 가능한데 굳이 LINK를 써야 하는 이유는 무엇일까?  

이는 컨테이너 사이의 IP 기반 연동의 문제점 때문입니다  
Container 의 IP 는 유동적인 성격을 띄고 있기 때문에 언제든 변할 수 있습니다.  
Container 는 일종의 ``Process`` 이므로, 언제든 생성/소멸 될 수 있기에   
만약 컨테이너가 중지 되었다가 시작하면, Process가 다시 새롭게 생성되는 것과 같습니다   
즉, 이때 컨테이너에게 부여되는 ``Private IP``는 변할 수 있습니다는 것입니다.  
그래서 컨테이너의 연동을 위한 방법으로 IP 기반의 연동은 권고되지 않습니다.  
따라서 연동으로 권고 되고 있는 방법이 바로 LINK 기능인 것입니다.

<br/>

---

## 👍 LINK 설정

link를 이용한 컨테이너 연동

* 링크를 사용하기 위해 ``httpd`` 기반의 컨테이너를 하나 생성했습니다다.

    ```cs
    nasa1515@nasa:~$ docker run -itd --name web-nasa httpd:latest
    7881267cb8e1abc34ba13fe4783759ea1ca285ca5e01de56d252206f0bbd0e5b
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker ps | grep web-nasa
    7881267cb8e1        httpd:latest        "httpd-foreground"   11 seconds ago      Up 10 seconds       80/tcp              web-nasa
    ```

    <br/>

* 링크를 사용해서 ``centos`` 기반의 컨테이너를 하나 생성했습니다.

    ```cs
    nasa1515@nasa:~$ docker run -itd --name  link-nasa --link web-nasa centos:latest
    9e8f15588f0fcd8920720af6446adfa59f21cd1c15c057518b874b89b077db4d
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker ps | grep link
    9e8f15588f0f        centos:latest       "/bin/bash"          6 seconds ago       Up 5 seconds                            link-nasa
    ```

    <br/>

* ``curl`` 명령을 이용해 두 컨테이너의 통신이 정상임을 확인

    ```cs
    nasa1515@nasa:~$ docker exec link-nasa curl web-nasa
    % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
    100    45  100    45    0     0  45000      0 --:--:-- --:--:-- --:--:-- 45000
    <html><body><h1>It works!</h1></body></html>
    ```

    <br/>

* ``link-nasa`` 서버가 ``web-nasa``라는 이름으로 통신할 수 있는 이유는

    ```cs
    nasa1515@nasa:~$ docker exec link-nasa cat /etc/hosts
    127.0.0.1	localhost
    ::1	localhost ip6-localhost ip6-loopback
    fe00::0	ip6-localnet
    ff00::0	ip6-mcastprefix
    ff02::1	ip6-allnodes
    ff02::2	ip6-allrouters
    172.17.0.2	web-nasa 7881267cb8e1
    172.17.0.3	9e8f15588f0f
    ```
    다음과 같이 ``/etc/hosts`` 파일에 별칭이 정의되어 있기 때문이다.

    <br/>

* 추가적으로 특정 ``별칭``으로 정의하여 컨테이너의 ``링크``를 만들 수도 있습니다.

    ```cs
    nasa1515@nasa:~$ docker run -itd --name link-alias --link web-nasa:nasa1515 centos:latest
    ee50a1bd8ce3ac947c04cec526f3f5b7950e5ecd67fa99e211cc0b155def7fb7
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker ps | grep link-alias
    ee50a1bd8ce3        centos:latest       "/bin/bash"          9 seconds ago       Up 8 seconds                            link-alias
    nasa1515@nasa:~$ 
    ------------------------------------------------------------------------------

    nasa1515@nasa:~$ docker exec link-alias curl nasa1515
    % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
    100    45  100    45    0     0  45000      0 --:--:-- --:--:-- --:--:-- 45000
    <html><body><h1>It works!</h1></body></html>
    
    ------------------------------------------------------------------------------
    nasa1515@nasa:~$ docker exec link-alias cat /etc/hosts
    127.0.0.1	localhost
    ::1	localhost ip6-localhost ip6-loopback
    fe00::0	ip6-localnet
    ff00::0	ip6-mcastprefix
    ff02::1	ip6-allnodes
    ff02::2	ip6-allrouters
    172.17.0.2	nasa1515 7881267cb8e1 web-nasa
    172.17.0.4	ee50a1bd8ce3
    ```

    위와 같이 ``link-alias``라는 이름의 컨테이너를 생성할때  
    ``web-nasa``서버의 별칭을 ``nasa1515``로 설정해주었을때 정상적으로 동작함을 확인 할 수 있습니다.    
    링크를 걸 경우 자동적으로 hosts에 등록이 됩니다.

<br/>

---

### LINK 방식의 한계  
    
동적 IP에 따른 이슈를 피하기 위해선 LINK 기능을 이용해야 합니다.  
하지만 LINK 방식만으로는 여전히 한계가 있습니다.   

동일 docker host 에 존재하는 컨테이너들 사이에서만 유효하다.  
(만약 다수의 docker host를 운영할 경우에 타 host에 상주하는 컨테이너 사이에는 link 옵션 이용이 불가하다.)

이유는 컨테이너의 hosts 파일의 관리를 docker host가 직접 수행하기 때문이다. 

이러한 이슈를 해결하고 싶은 경우에는  
docker swarm 같은 orchestration 툴을 도입하거나 dynamic DNS 를 구축해 사용해야 합니다


<br/>

---

## 🎉 PORT FORWARDING

* Container Port 외부 expose(Port Forwarding)  
     브릿지 네트워크를 사용하는 컨테이너를 생성하면 기본적으로 외부와 통신이 불가능한 상태로 생성됩니다.  
     따라서 외부와 통신을 위해서는 ``Port Forwarding``이 필요하다. 방법은 container 를 생성할때 ``-p option``을 이용하면 됩니다. 

* ``pf-nasa-web``이라는 컨테이너의 80포트를 포드포워딩하여 생성해보겠습니다.

    ```cs
   nasa1515@nasa:~$ docker run -itd --name pf-nasa-web -p 8080:80 httpd:latest
    2411f635aaef7a70caa0a09ee14289c48de71187ef375dda84d29219c5b56737
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker ps -a | grep pf
    2411f635aaef        httpd:latest        "httpd-foreground"   7 seconds ago       Up 6 seconds                0.0.0.0:8080->80/tcp   pf-nasa-web

    ```
    호스트의 8080포트에 접속했을때 80포트로 접속할 수 있도록 포트포워딩이 됨을 확인할 수 있습니다

    <br/>

* HOST 서버의 8080포트로 ``curl`` 명령을 사용하면 정상적으로 받아온다

    ```cs
    nasa1515@nasa:~$ curl localhost:8080
    <html><body><h1>It works!</h1></body></html>
    ```

    <br/>

* HOST 서버의 8080포트의 연결을 확인해보면 ``docker-proxy``라는 이름의 프로세스로 매칭되어있습니다.

    ```cs
    nasa1515@nasa:~$ sudo netstat -anp | grep 8080
    tcp6       0      0 :::8080                 :::*                    LISTEN      13380/docker-proxy
    ```

<br/>

---

## 🤳 Docker-Proxy

 위에서 확인한 것처럼 포트포워딩을 하게되면 ``docker-proxy``라는 프로세스가 매칭됩니다.  
 이 프로세스의 목적은 그 이름처럼 docker host 로 들어온 요청을 container 로 넘기는 것 뿐입니다.  
 docker-proxy 는 kernel이 아닌 userland 에서 수행되기 때문에 kernel 과 상관없이 host가 받은 패킷을 그대로 container의 port로 넘겨줍니다. 

<br/>

 * container 를 시작할때 port를 외부로 노출하도록 설정하게 되면,  
 docker host에는 docker-proxy 라는 프로세스가 생성되게 됩니다. 

    ```cs
    nasa1515@nasa:~$ ps -ef | grep docker-proxy
    root     13380  1985  0 12:03 ?        00:00:00 /usr/bin/docker-proxy -proto tcp -host-ip 0.0.0.0 -host-port 8080 -container-ip 172.17.0.2 -container-port 80
    student  13856 26014  0 12:13 pts/2    00:00:00 grep docker-proxy
    ```

    * proxy 프로세스는 container의 port를 노출하도록 설정한 수 만큼 추가로 프로세스가 생성됩니다 (run process per port).  

    * 만약 하나의 Port를 오픈하는 두개의 Container를 생성합니다면 docker-proxy는 두개가 생성됩니다.  
    
    * 또한, 한개의 container 에 두개의 port 에 대해 외부로 노출하도록 설정합니다면, 마찬가지로 docker-proxy 프로세스는 ``두개``가 생성됩니다.


    <br/>

* docker-proxy 를 사용하는 이유  

     ``docker-proxy``가 존재하는 가장 큰 이유는  
     docker host가 iptables 의 NAT를 사용하지 못하는 상황에 대한 처리이다.  
     만약 정책상의 이유로 docker host의 iptables 나 ip_forward 를 enable 하지 못하는 경우에는  
     docker-proxy 프로세스가 패킷을 포워딩하는 역할을 대신하게 됩니다. 

    그래서 실제로 docker host로 요청이 들어온 패킷이 container 로 전달되는 것은  
    docker-proxy 와 무관하게 docker host의 iptables 에 의해 동작됩니다. 

     즉, docker-proxy 프로세스를 kill 해도 외부에서 들어오는 요청이  
     container로 전달되는데 문제가 없다는 의미입니다.

---

```toc
```