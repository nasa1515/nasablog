---
emoji: ๐คฆโโ๏ธ
title: "[DOCKER] - MACVLAN, LINK"
date: "2021-06-26 00:11:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


๋จธ๋ฆฌ๋ง  

 ์ด์  ํฌ์คํธ์์๋ ๋์ปค์ ๋คํธ์ํฌ์ ๋ํด์ ํฌ์คํํ์ต๋๋ค.  
 ์ด๋ฒ ํฌ์คํธ์์๋ ์ด์  ํฌ์คํธ์์ ํฌ์คํํ ๋คํธ์ํฌ์ ์ข๋ฅ๊ฐ ์๋๋ผ  
 ์ค์  ์ปจํ์ด๋์ ์ฌ์ฉ์๊ฐ ๋คํธ์ํฌ ๋์ญ๋๋ฅผ ์ง์  ์ค์ ํ  ์ ์๋ MACVLAN๊ณผ LINK์ ๋ํด์ ํฌ์คํํฉ๋๋ค.

---

## โ MACVLAN

* MacVLan์ ๋ธ๋ฆฟ์ง๊ฐ ์์ต๋๋ค. ๋์  ์๋ธ ์ธํฐํ์ด์ค๋ผ๋ ๊ฐ๋์ด ๋ฑ์ฅํด์ ์ฌ์ฉํฉ๋๋ค.  


* ๋ฌผ๋ฆฌ์ ์ธ NIC eth0์ ์กด์ฌํ๋ฉฐ ``eh0``์์ ์ฌ๋ฌ ํ์ ์ธํฐํ์ด์ค๋ฅผ ๋ง๋ฌ์ผ๋ก์จ ์ฌ๋ฌ๊ฐ์ mac ์ฃผ์๋ฅผ ๊ฐ์ง ์ ์๋๋ก ํฉ๋๋ค.  
    ๊ทธ๋ ๊ฒ ๋๋ฉด ์์ฑ๋ ํ์ ์ธํฐํ์ด์ค๋ค์ ์ฌ๋ฌ๊ฐ์ ์ปจํ์ด๋๋ค์ด ์ฐ๊ฒฐ๋๋ฉด์ VLAN์ ๊ตฌ์ฑํ  ์ ์์ต๋๋ค.  

* ์ฆ ํ๋์ NIC๋ฅผ ๊ฐ์ํํจ์ผ๋ก์จ ์ฌ๋ฌ๊ฐ์ MAC์ฃผ์๋ฅผ ์์ฑํ๋ ๊ฒ์ด๋ผ๊ณ  ํ  ์ ์์ต๋๋ค


<br/>

### MACVLAN Driver ๊ตฌ์กฐ

![](https://lh3.googleusercontent.com/k6U4fO2FWI-lA5f_G7bO1w88OtgIki7azKcXbdpcCClhW79M4cRBOgIWYX3KhYKLRYpyE40lqX41MWj4m_6mLuUPbahQFh76CYQwU9lde7jqPmc4ClZwZJ_YF8XNJvOVF9eBRCyu)  



* macvlan์ ๋ถ๋ชจ ์ธํฐํ์ด์ค(parent)์ ์๋ธ ์ธํฐํ์ด์ค(slave)๋ก ๋๋๋ค.    
* ๋ถ๋ชจ ์ธํฐํ์ด์ค๋ ๊ฐ์ํ๋  ์ฃผ์ฒด, ์ฆ ์ค์  ๋ฌผ๋ฆฌ์ ์ธ NIC์ธ eth0์ด ๋ฉ๋๋ค.  
* ๊ฑฐ๊ธฐ์ ์์ฑ๋ ์๋ธ ์ธํฐํ์ด์ค๋ค์ mac0, mac1, mac2๊ฐ ๋ฉ๋๋ค.  
* macvlan์ผ๋ก ์์ฑ๋ ์ธํฐํ์ด์ค๋ฅผ ์ง์นญํ  ๋๋ mac0@eth0๊ณผ ๊ฐ์ด ํํํฉ๋๋ค. ``(mac0์ ์๋ธ ์ธํฐํ์ด์ค, eth0์ด ๋ถ๋ชจ ์ธํฐํ์ด์ค)``


<br/>

### MACVLAN ๊ตฌ๋ ๋ฐฉ์


* ํธ์คํธ(eth0)์๋ ํต์ ์ด ์๋์ง๋ง ๋ค๋ฅธ ์๋ธ ์ธํฐํ์ด์ค๊ฐ ํต์ ์ ๋๋ ๋ฐฉ์  
* ํธ์คํธ์ ํต์ ์ด ์๋๋ ๊ฒ์ ์๋ macvlan์์ ์๋๋ ๊ฒ์ด๊ณ   
๋ค๋ฅธ ์๋ธ ์ธํฐํ์ด์ค๊ฐ์ ํต์ ์ด ๋๋ ๊ฒ์ bridge ๋ฑ ๋ค๊ณผ ์ฐจ์ด๋ฅผ ๊ฐ์ง๋ค

* macvlan ๋ฐฉ์์ ๋ถ๋ชจ ์ธํฐํ์ด์ค์ ๊ฐ๋จํ ๋ธ๋ฆฟ์ง๋ฅผ ๋์ด์  
๋ค๋ฅธ ์๋ธ ์ธํฐํ์ด์ค๋ก ํฅํ๋ ํธ๋ํฝ์ ๋ฐ์ผ๋ก ๋ด๋ณด๋ด์ง ์๊ณ  ๋ฐ๋ก ์ ๋ฌํ๋ ๋ฐฉ์์ด๋ค  
(๋ด๋ถ ์ปจํ์ด๋๋ผ๋ฆฌ ํต์ ์ ํ๋ ๊ฒฝ์ฐ)  

* ๋ชจ๋  ์๋ธ ์ธํฐํ์ด์ค์ ๋งฅ ์ฃผ์๋ฅผ ์๊ณ  ์๋ ์ํ์ด๋ฏ๋ก  
๋ธ๋ฆฟ์ง์์ Mac Learning(๋งฅ ์ถ๊ฐ) ์์๋ ํ์์๊ณ  ๋ฃจํ์ ๋ฐฉ์งํ๊ธฐ ์ํ STP์๊ณ ๋ฆฌ์ฆ๋ ํ์ ์๋ค.

<br/>

---

## โ MACVLAN ์ค์ 

* LINUX NIC์ promisc ๋ชจ๋๋ฅผ ํ์ฑํ  
    MacVlan์ ์ฌ์ฉํ๊ธฐ ์ํด์๋ ``Promiscuous mode``๋ฅผ ํ์ฑํ ํด์ผ ํฉ๋๋ค.

    * LINUX์์๋ ํ๋์ NIC์ ํ๋์ MAC ์ฃผ์๋ฅผ ํ์ตํ๋๋ก ๊ตฌ์ฑ๋์ด์์ต๋๋ค.  
    * MacVlan์ ์ฌ์ฉํ  ๊ฒฝ์ฐ ์๋ธ ์ธํฐํ์ด์ค ํ๋จ์ MAC์ ๋ค์ค์ผ๋ก ARP TABLE์์ ํ์ธ ๊ฐ๋ฅ

    ```cs
    nasa1515@nasa:~$ ip a | grep wlp3s0
    3: wlp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    inet 192.168.100.9/24 brd 192.168.100.255 scope global dynamic noprefixroute wlp3s0
    nasa1515@nasa:~$ sudo ip link set wlp3s0 promisc on
    ```


    <br/>

* NIC์ PROMISC๊ฐ ์ถ๊ฐ๋ ๊ฒ์ ํ์ธ

    ```cs
    nasa1515@nasa:~$ ip a | grep wlp3s0
    3: wlp3s0: <BROADCAST,MULTICAST,PROMISC,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
        inet 192.168.100.9/24 brd 192.168.100.255 scope global dynamic noprefixroute wlp3s0
    ```

    <br/>

* MacVlan ๋คํธ์ํฌ ์์ฑ  
    ๋ถ๋ชจ ์ธํฐํ์ด์ค ์นด๋๋ฅผ ์ง์ ํ์ฌ ์๋ก์ด MacVlan ๋คํธ์ํฌ๋ฅผ ์์ฑํฉ๋๋ค.  

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
    ``wlp3s0``์ ์ฌ์ฉํด ``macvlan1``์ ์์ฑํ ๊ฒ์ ํ์ธ ํ  ์ ์์ต๋๋ค.

    <br/>

* ``macvlan1``์ ์ฌ์ฉํ๋ ์ปจํ์ด๋ ์์ฑ

    ```cs
    nasa1515@nasa:~$ docker run -itd --name mac-nasa --network macvlan1 centos:latest
    b63a1b3bc91faea7893991e1ed4407e23fd179d82ec8456925bd22740da21833
    --------------------------------------------------------------------------------
    nasa1515@nasa:~$ docker ps
    CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
    b63a1b3bc91f        centos:latest       "/bin/bash"         21 seconds ago      Up 20 seconds                           mac-nasa

    ```


    <br/>

* ``mac-nasa`` ์ปจํ์ด๋์ ๋คํธ์ํฌ ํ์ธ

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

* ์ถ๊ฐ์ ์ผ๋ก ``mac-nasa2``๋ผ๋ ์ปจํ์ด๋๋ฅผ ๋์ผํ๊ฒ ์์ฑํ์์

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

* ``mac-nasa`` <-> ``mac-nasa2`` ์ ํต์ ์ด ์ ์์ ์์ ํ์ธํฉ๋๋ค.  
    MacVlan ๋คํธ์ํน ๊ธฐ๋ฐ์ ํต์ ์ด ์ ์์ ์ธ ๊ฒ์ ํ์ธํ  ์ ์์ต๋๋ค.


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

## ๐ค LINK

* ์ปจํ์ด๋๋ผ๋ฆฌ ์๋ก ํต์ ํ๊ธฐ ์ํด์  ๊ธฐ๋ณธ์ ์ผ๋ก ``bridge``๋ฅผ ์ฌ์ฉํฉ๋๋ค.
* ํ์ง๋ง web ์๋ฒ ์ญํ ์ ์ปจํ์ด๋์ DB ์๋ฒ ์ญํ ์ ์ปจํ์ด๋๊ฐ ์์ต๋๋ค๊ณ  ๊ฐ์ ํด๋ณด๊ณ ,  
๋ง์ฝ, ์ด ๋ container ์ฌ์ด๋ฅผ ์ฐ๋ํด์ผ ํฉ๋๋ค๊ณ  ํ๋ฉด LINK๋ฅผ ์ฌ์ฉํด์ผ ํฉ๋๋ค.

<br/>

### LINK๋ฅผ ์ฐ๋ ์ ํํ ์ด์ 

๋์ผ host ์์ ๋ฐฐํฌ๋ container๋ ์ฌ์ค Private IP ๋ฅผ ์ด์ฉํด ํต์ ์ด ๊ฐ๋ฅํฉ๋๋ค. 

 
 * ์๋ ๋๊ฐ์ ์ปจํ์ด๋๋ฅผ ์์ฑํด๋์์ต๋๋ค

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
    ๊ฐ๊ฐ ``172.17.0.2`` , ``172.17.0.3`` Private IP๋ฅผ ๊ฐ์ง๊ณ  ์์ต๋๋ค

    <br/>

*   ๋ ์ปจํ์ด๋์ ํ ํ์คํธ ๊ฒฐ๊ณผ ์ ์์ ์๋๋ค

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


์์ ์ค์ต ๊ฐ์ด ์ปจํ์ด๋๋ ์ด๋ฏธ ์๋ก๊ฐ์ ํต์ ์ด ๊ฐ๋ฅํ๋ฐ ๊ตณ์ด LINK๋ฅผ ์จ์ผ ํ๋ ์ด์ ๋ ๋ฌด์์ผ๊น?  

์ด๋ ์ปจํ์ด๋ ์ฌ์ด์ IP ๊ธฐ๋ฐ ์ฐ๋์ ๋ฌธ์ ์  ๋๋ฌธ์๋๋ค  
Container ์ IP ๋ ์ ๋์ ์ธ ์ฑ๊ฒฉ์ ๋๊ณ  ์๊ธฐ ๋๋ฌธ์ ์ธ์ ๋  ๋ณํ  ์ ์์ต๋๋ค.  
Container ๋ ์ผ์ข์ ``Process`` ์ด๋ฏ๋ก, ์ธ์ ๋  ์์ฑ/์๋ฉธ ๋  ์ ์๊ธฐ์   
๋ง์ฝ ์ปจํ์ด๋๊ฐ ์ค์ง ๋์๋ค๊ฐ ์์ํ๋ฉด, Process๊ฐ ๋ค์ ์๋กญ๊ฒ ์์ฑ๋๋ ๊ฒ๊ณผ ๊ฐ์ต๋๋ค   
์ฆ, ์ด๋ ์ปจํ์ด๋์๊ฒ ๋ถ์ฌ๋๋ ``Private IP``๋ ๋ณํ  ์ ์์ต๋๋ค๋ ๊ฒ์๋๋ค.  
๊ทธ๋์ ์ปจํ์ด๋์ ์ฐ๋์ ์ํ ๋ฐฉ๋ฒ์ผ๋ก IP ๊ธฐ๋ฐ์ ์ฐ๋์ ๊ถ๊ณ ๋์ง ์์ต๋๋ค.  
๋ฐ๋ผ์ ์ฐ๋์ผ๋ก ๊ถ๊ณ  ๋๊ณ  ์๋ ๋ฐฉ๋ฒ์ด ๋ฐ๋ก LINK ๊ธฐ๋ฅ์ธ ๊ฒ์๋๋ค.

<br/>

---

## ๐ LINK ์ค์ 

link๋ฅผ ์ด์ฉํ ์ปจํ์ด๋ ์ฐ๋

* ๋งํฌ๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด ``httpd`` ๊ธฐ๋ฐ์ ์ปจํ์ด๋๋ฅผ ํ๋ ์์ฑํ์ต๋๋ค๋ค.

    ```cs
    nasa1515@nasa:~$ docker run -itd --name web-nasa httpd:latest
    7881267cb8e1abc34ba13fe4783759ea1ca285ca5e01de56d252206f0bbd0e5b
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker ps | grep web-nasa
    7881267cb8e1        httpd:latest        "httpd-foreground"   11 seconds ago      Up 10 seconds       80/tcp              web-nasa
    ```

    <br/>

* ๋งํฌ๋ฅผ ์ฌ์ฉํด์ ``centos`` ๊ธฐ๋ฐ์ ์ปจํ์ด๋๋ฅผ ํ๋ ์์ฑํ์ต๋๋ค.

    ```cs
    nasa1515@nasa:~$ docker run -itd --name  link-nasa --link web-nasa centos:latest
    9e8f15588f0fcd8920720af6446adfa59f21cd1c15c057518b874b89b077db4d
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker ps | grep link
    9e8f15588f0f        centos:latest       "/bin/bash"          6 seconds ago       Up 5 seconds                            link-nasa
    ```

    <br/>

* ``curl`` ๋ช๋ น์ ์ด์ฉํด ๋ ์ปจํ์ด๋์ ํต์ ์ด ์ ์์์ ํ์ธ

    ```cs
    nasa1515@nasa:~$ docker exec link-nasa curl web-nasa
    % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
    100    45  100    45    0     0  45000      0 --:--:-- --:--:-- --:--:-- 45000
    <html><body><h1>It works!</h1></body></html>
    ```

    <br/>

* ``link-nasa`` ์๋ฒ๊ฐ ``web-nasa``๋ผ๋ ์ด๋ฆ์ผ๋ก ํต์ ํ  ์ ์๋ ์ด์ ๋

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
    ๋ค์๊ณผ ๊ฐ์ด ``/etc/hosts`` ํ์ผ์ ๋ณ์นญ์ด ์ ์๋์ด ์๊ธฐ ๋๋ฌธ์ด๋ค.

    <br/>

* ์ถ๊ฐ์ ์ผ๋ก ํน์  ``๋ณ์นญ``์ผ๋ก ์ ์ํ์ฌ ์ปจํ์ด๋์ ``๋งํฌ``๋ฅผ ๋ง๋ค ์๋ ์์ต๋๋ค.

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

    ์์ ๊ฐ์ด ``link-alias``๋ผ๋ ์ด๋ฆ์ ์ปจํ์ด๋๋ฅผ ์์ฑํ ๋  
    ``web-nasa``์๋ฒ์ ๋ณ์นญ์ ``nasa1515``๋ก ์ค์ ํด์ฃผ์์๋ ์ ์์ ์ผ๋ก ๋์ํจ์ ํ์ธ ํ  ์ ์์ต๋๋ค.    
    ๋งํฌ๋ฅผ ๊ฑธ ๊ฒฝ์ฐ ์๋์ ์ผ๋ก hosts์ ๋ฑ๋ก์ด ๋ฉ๋๋ค.

<br/>

---

### LINK ๋ฐฉ์์ ํ๊ณ  
    
๋์  IP์ ๋ฐ๋ฅธ ์ด์๋ฅผ ํผํ๊ธฐ ์ํด์  LINK ๊ธฐ๋ฅ์ ์ด์ฉํด์ผ ํฉ๋๋ค.  
ํ์ง๋ง LINK ๋ฐฉ์๋ง์ผ๋ก๋ ์ฌ์ ํ ํ๊ณ๊ฐ ์์ต๋๋ค.   

๋์ผ docker host ์ ์กด์ฌํ๋ ์ปจํ์ด๋๋ค ์ฌ์ด์์๋ง ์ ํจํ๋ค.  
(๋ง์ฝ ๋ค์์ docker host๋ฅผ ์ด์ํ  ๊ฒฝ์ฐ์ ํ host์ ์์ฃผํ๋ ์ปจํ์ด๋ ์ฌ์ด์๋ link ์ต์ ์ด์ฉ์ด ๋ถ๊ฐํ๋ค.)

์ด์ ๋ ์ปจํ์ด๋์ hosts ํ์ผ์ ๊ด๋ฆฌ๋ฅผ docker host๊ฐ ์ง์  ์ํํ๊ธฐ ๋๋ฌธ์ด๋ค. 

์ด๋ฌํ ์ด์๋ฅผ ํด๊ฒฐํ๊ณ  ์ถ์ ๊ฒฝ์ฐ์๋  
docker swarm ๊ฐ์ orchestration ํด์ ๋์ํ๊ฑฐ๋ dynamic DNS ๋ฅผ ๊ตฌ์ถํด ์ฌ์ฉํด์ผ ํฉ๋๋ค


<br/>

---

## ๐ PORT FORWARDING

* Container Port ์ธ๋ถ expose(Port Forwarding)  
     ๋ธ๋ฆฟ์ง ๋คํธ์ํฌ๋ฅผ ์ฌ์ฉํ๋ ์ปจํ์ด๋๋ฅผ ์์ฑํ๋ฉด ๊ธฐ๋ณธ์ ์ผ๋ก ์ธ๋ถ์ ํต์ ์ด ๋ถ๊ฐ๋ฅํ ์ํ๋ก ์์ฑ๋ฉ๋๋ค.  
     ๋ฐ๋ผ์ ์ธ๋ถ์ ํต์ ์ ์ํด์๋ ``Port Forwarding``์ด ํ์ํ๋ค. ๋ฐฉ๋ฒ์ container ๋ฅผ ์์ฑํ ๋ ``-p option``์ ์ด์ฉํ๋ฉด ๋ฉ๋๋ค. 

* ``pf-nasa-web``์ด๋ผ๋ ์ปจํ์ด๋์ 80ํฌํธ๋ฅผ ํฌ๋ํฌ์๋ฉํ์ฌ ์์ฑํด๋ณด๊ฒ ์ต๋๋ค.

    ```cs
   nasa1515@nasa:~$ docker run -itd --name pf-nasa-web -p 8080:80 httpd:latest
    2411f635aaef7a70caa0a09ee14289c48de71187ef375dda84d29219c5b56737
    nasa1515@nasa:~$ 
    nasa1515@nasa:~$ docker ps -a | grep pf
    2411f635aaef        httpd:latest        "httpd-foreground"   7 seconds ago       Up 6 seconds                0.0.0.0:8080->80/tcp   pf-nasa-web

    ```
    ํธ์คํธ์ 8080ํฌํธ์ ์ ์ํ์๋ 80ํฌํธ๋ก ์ ์ํ  ์ ์๋๋ก ํฌํธํฌ์๋ฉ์ด ๋จ์ ํ์ธํ  ์ ์์ต๋๋ค

    <br/>

* HOST ์๋ฒ์ 8080ํฌํธ๋ก ``curl`` ๋ช๋ น์ ์ฌ์ฉํ๋ฉด ์ ์์ ์ผ๋ก ๋ฐ์์จ๋ค

    ```cs
    nasa1515@nasa:~$ curl localhost:8080
    <html><body><h1>It works!</h1></body></html>
    ```

    <br/>

* HOST ์๋ฒ์ 8080ํฌํธ์ ์ฐ๊ฒฐ์ ํ์ธํด๋ณด๋ฉด ``docker-proxy``๋ผ๋ ์ด๋ฆ์ ํ๋ก์ธ์ค๋ก ๋งค์นญ๋์ด์์ต๋๋ค.

    ```cs
    nasa1515@nasa:~$ sudo netstat -anp | grep 8080
    tcp6       0      0 :::8080                 :::*                    LISTEN      13380/docker-proxy
    ```

<br/>

---

## ๐คณ Docker-Proxy

 ์์์ ํ์ธํ ๊ฒ์ฒ๋ผ ํฌํธํฌ์๋ฉ์ ํ๊ฒ๋๋ฉด ``docker-proxy``๋ผ๋ ํ๋ก์ธ์ค๊ฐ ๋งค์นญ๋ฉ๋๋ค.  
 ์ด ํ๋ก์ธ์ค์ ๋ชฉ์ ์ ๊ทธ ์ด๋ฆ์ฒ๋ผ docker host ๋ก ๋ค์ด์จ ์์ฒญ์ container ๋ก ๋๊ธฐ๋ ๊ฒ ๋ฟ์๋๋ค.  
 docker-proxy ๋ kernel์ด ์๋ userland ์์ ์ํ๋๊ธฐ ๋๋ฌธ์ kernel ๊ณผ ์๊ด์์ด host๊ฐ ๋ฐ์ ํจํท์ ๊ทธ๋๋ก container์ port๋ก ๋๊ฒจ์ค๋๋ค. 

<br/>

 * container ๋ฅผ ์์ํ ๋ port๋ฅผ ์ธ๋ถ๋ก ๋ธ์ถํ๋๋ก ์ค์ ํ๊ฒ ๋๋ฉด,  
 docker host์๋ docker-proxy ๋ผ๋ ํ๋ก์ธ์ค๊ฐ ์์ฑ๋๊ฒ ๋ฉ๋๋ค. 

    ```cs
    nasa1515@nasa:~$ ps -ef | grep docker-proxy
    root     13380  1985  0 12:03 ?        00:00:00 /usr/bin/docker-proxy -proto tcp -host-ip 0.0.0.0 -host-port 8080 -container-ip 172.17.0.2 -container-port 80
    student  13856 26014  0 12:13 pts/2    00:00:00 grep docker-proxy
    ```

    * proxy ํ๋ก์ธ์ค๋ container์ port๋ฅผ ๋ธ์ถํ๋๋ก ์ค์ ํ ์ ๋งํผ ์ถ๊ฐ๋ก ํ๋ก์ธ์ค๊ฐ ์์ฑ๋ฉ๋๋ค (run process per port).  

    * ๋ง์ฝ ํ๋์ Port๋ฅผ ์คํํ๋ ๋๊ฐ์ Container๋ฅผ ์์ฑํฉ๋๋ค๋ฉด docker-proxy๋ ๋๊ฐ๊ฐ ์์ฑ๋ฉ๋๋ค.  
    
    * ๋ํ, ํ๊ฐ์ container ์ ๋๊ฐ์ port ์ ๋ํด ์ธ๋ถ๋ก ๋ธ์ถํ๋๋ก ์ค์ ํฉ๋๋ค๋ฉด, ๋ง์ฐฌ๊ฐ์ง๋ก docker-proxy ํ๋ก์ธ์ค๋ ``๋๊ฐ``๊ฐ ์์ฑ๋ฉ๋๋ค.


    <br/>

* docker-proxy ๋ฅผ ์ฌ์ฉํ๋ ์ด์   

     ``docker-proxy``๊ฐ ์กด์ฌํ๋ ๊ฐ์ฅ ํฐ ์ด์ ๋  
     docker host๊ฐ iptables ์ NAT๋ฅผ ์ฌ์ฉํ์ง ๋ชปํ๋ ์ํฉ์ ๋ํ ์ฒ๋ฆฌ์ด๋ค.  
     ๋ง์ฝ ์ ์ฑ์์ ์ด์ ๋ก docker host์ iptables ๋ ip_forward ๋ฅผ enable ํ์ง ๋ชปํ๋ ๊ฒฝ์ฐ์๋  
     docker-proxy ํ๋ก์ธ์ค๊ฐ ํจํท์ ํฌ์๋ฉํ๋ ์ญํ ์ ๋์ ํ๊ฒ ๋ฉ๋๋ค. 

    ๊ทธ๋์ ์ค์ ๋ก docker host๋ก ์์ฒญ์ด ๋ค์ด์จ ํจํท์ด container ๋ก ์ ๋ฌ๋๋ ๊ฒ์  
    docker-proxy ์ ๋ฌด๊ดํ๊ฒ docker host์ iptables ์ ์ํด ๋์๋ฉ๋๋ค. 

     ์ฆ, docker-proxy ํ๋ก์ธ์ค๋ฅผ kill ํด๋ ์ธ๋ถ์์ ๋ค์ด์ค๋ ์์ฒญ์ด  
     container๋ก ์ ๋ฌ๋๋๋ฐ ๋ฌธ์ ๊ฐ ์๋ค๋ ์๋ฏธ์๋๋ค.

---

```toc
```