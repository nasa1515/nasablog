---
emoji: π€¦ββοΈ
title: "[DOCKER] - Network"
date: "2021-06-26 00:10:25"
author: nasa1515
tags: DevOps
categories: DevOps
---

λ¨Έλ¦¬λ§  

 μ΄λ² ν¬μ€νΈμμλ μ»¨νμ΄λλ€μ μλΉμ€μ μ€μνκ² μ°κ΄λμ΄μλ λμ»€μ λ€νΈμν¬μ λν΄μ ν¬μ€νΈ νμ΅λλ€.  


---
## β [DOCKER] - λ€νΈμν¬ μ ν

* λμ»€μλ λ€μν λ€νΈμν¬κ° μ‘΄μ¬ν΄ μ©λμ λ§κ² λ€νΈμν¬λ₯Ό μ ν ν  μ μμ΅λλ€.   

    κΈ°λ³ΈμΌλ‘ μ¬μ©νλ λ€νΈμν¬λ `bridge`,`host`,`null`μ΄ μ‘΄μ¬νκ³   
    `docker network ls` λͺλ Ήμ΄λ‘ λ€νΈμν¬ λͺ©λ‘μ νμΈ ν  μ μμ΅λλ€.

    ```cs

    $ docker network ls
    -----------------------------------------------------------------
    NETWORK ID          NAME                DRIVER              SCOPE
    e2d1889f7327        bridge              bridge              local
    29d9e0411d39        host                host                local
    054fbf919b85        none                null                local

    -----------------------------------------------------------------
    $ ifconfig docker0
      
    docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
    inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
    inet6 fe80::42:2dff:fe83:d3b5  prefixlen 64  scopeid 0x20<link>
    ether 02:42:2d:83:d3:b5  txqueuelen 0  (Ethernet)
    RX packets 14503  bytes 798314 (798.3 KB)
    RX errors 0  dropped 0  overruns 0  frame 0
    TX packets 17644  bytes 118869139 (118.8 MB)
    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    ```

<br/>

---

## β BRIDGE NETWORK

* Bridgeλ μ»¨νμ΄λκ° μ¬μ©νλ νλΌμ΄λΉ λ€νΈμν¬μλλ€.  
κ°μ Bridgeλ‘ μ°κ²°λμ΄ μμΌλ©΄ μ»¨νμ΄λμ IP μ£Όμλ‘ ν΅μ ν  μ μμ΅λλ€. μΈλΆλ‘ ν΅μ  ν  λμλ `NAPT` ν΅μ μ μ¬μ©νλ©°  
μΈλΆμμ Bridgeλ‘ ν΅μ μ μν΄μ  `ν¬νΈν¬μλ©`μ μ¬μ©ν΄μΌ ν©λλ€.  

    λμ»€λ₯Ό μ€μΉνλ©΄ μ΄λ¦μ΄ `docker0` μΈ λ¦¬λμ€ λΈλ¦Ώμ§κ° μμ±λ©λλ€.  
    μ΄λ₯Ό νμΈ νκΈ° μν΄μ  `inspect` λͺλ Ήμ μ΄μ©ν΄ λ€μκ³Ό κ°μ΄ νμΈκ°λ₯ν©λλ€. 

    ```cs
    $ docker inspect bridge 
    --------------------------------------------------------------
    ...
    ...
            "Options": {
            ...
            ...
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
    ...
    ...
    ...    # inspect λ΄μ©μ docker0 λΈλ¦Ώμ§λ₯Ό μ¬μ©νλ€λ λ΄μ©μ νμΈ κ°λ₯ν©λλ€.
    ```

<br/>

---



* DOCKER BRIDGE NETWORK  

    docker0 λΈλ¦¬μ§λ μ»¨νμ΄λκ° ν΅μ νκΈ° μν΄ μ¬μ©λ©λλ€.  
    μ»¨νμ΄λλ₯Ό μμ±νλ©΄ μλμΌλ‘ λΈλ¦¬μ§λ₯Ό νμ©νλλ‘ μ€μ λμ΄  
    docker0 μΈν°νμ΄μ€λ `172.17.0.0/16` μλΈλ·μ κ°κΈ° λλ¬Έμ  
    μ»¨νμ΄λκ° μμ±λλ©΄ λμ­ μμμ IPλ₯Ό ν λΉλ°κ² λ©λλ€. (μ: `172.17.0.2`, `172.17.0.3`)

    `$ docker network inspect bridge` λͺλ Ήμ΄λ₯Ό μ΄μ©νλ©΄  
    BRIDGE λ€νΈμν¬μ μμΈν μ λ³΄λ₯Ό μ μ μμ΅λλ€.

    ```cs
    [
      {
          "Name": "bridge",
          // μ€κ° μλ΅
          "Driver": "bridge",
          "IPAM": {
              "Driver": "default",
              "Options": null,
              "Config": [
                  {
                      "Subnet": "172.17.0.0/16"
                  }
              ]
          },
          // μ€κ° μλ΅
          "ConfigOnly": false,
          "Containers": {
              "14b9779c990fe7557d60f2605ff4224e5f85f26bd99807c71f78df45133314be": {
                  "Name": "busybox1",
                  "EndpointID": "3ea17b0de094890abb1cccdb15b9144035d64bdc07777b97ddf9427b27563f51",
                  "MacAddress": "02:42:ac:11:00:02",
                  "IPv4Address": "172.17.0.2/16",
                  "IPv6Address": ""
              }
          }
          // μ΄ν μλ΅
      }
    ]
    ```

<br/>

---

* μ»¨νμ΄λλ₯Ό μμ±νλ©΄? (κ·Έλ¦Όμ°Έμ‘°)  

    μ»¨νμ΄λλ Linux Namespace κΈ°μ λ‘ κ²©λ¦¬λ λ€νΈμν¬ κ³΅κ°μ ν λΉλ°κ² λ©λλ€.  
    μ¦ μΈκΈν λλ‘ 172.17.0.0/16 λμ­μ IPλ₯Ό μμ°¨μ μΌλ‘ ν λΉ λ°μ΅λλ€.  
    `μ΄ IPλ μ»¨νμ΄λκ° μ¬μμν  λλ§λ€ λ³κ²½λ  μ μμ΅λλ€.`

    μ»¨νμ΄λλ μΈλΆ ν΅μ μ μν 2κ°μ λ€νΈμν¬ μΈν°νμ΄μ€λ₯Ό ν¨κ» μμ±νλ€.  
    νλλ μ»¨νμ΄λ λ΄λΆ `Namespace`μ ν λΉλλ `eth0` μ΄λ¦μ μΈν°νμ΄μ€  
    νλλ νΈμ€νΈ λ€νΈμν¬ λΈλ¦¬μ§ `docker0`μ λ°μΈλ© λλ `vethXXXXXXX`  
    μ΄λ¦ νμμ `veth` μΈν°νμ΄μ€λ€. (βvethβλ βvirtual ethβλΌλ μλ―Έ)  
    μ»¨νμ΄λμ `eth0` μΈν°νμ΄μ€μ νΈμ€νΈμ `veth` μΈν°νμ΄μ€λ μλ‘ μ°κ²°λμ΄ μμ΅λλ€.

    κ²°κ΅­ `docker0 λΈλ¦¬μ§`λ κ°μ μΈν°νμ΄μ€μ νΈμ€νΈμ μΈν°νμ΄μ€λ₯Ό μ΄μ΄μ£Όλ `μ€κ° λ€λ¦¬ μ­ν `μ νλ€.  
    κ·Έλ¦¬κ³  μ»¨νμ΄λμ `eth0` μΈν°νμ΄μ€λ `veth` κ°μ μΈν°νμ΄μ€λ₯Ό ν΅ν΄ μΈλΆμ ν΅μ ν  μ μκ² λλ κ²μλλ€.

    ![](https://jonnung.dev/images/docker_network.png)  
    

<br/>


* BRIDGE λ `docker network create` λͺλ Ήμ μ¬μ©ν΄ μ¬λ¬ κ° μμ±ν  μ μμ΅λλ€.

    ```cs
    $ docker network create --subnet 172.18.0.0/16 --gateway 172.18.0.1 nasanet
    ---------------------------------------------------------------------------
    ddad85781d7f86533869b5d91beb7439194601d05dee28f23d4e2e45719cead6 - κ²°κ³Ό κ°
    ```

    <br/>

* μμ±ν λ€νΈμν¬λ‘ `--network` μ¬μ©ν΄ μ»¨νμ΄λλ₯Ό μ°κ²° ν  μ μμ΅λλ€.

    ```cs
    $ docker run -itd --name nasa --network nasanet centos:latest 
    58f360a0ca8bc409ce9a5ab4f891bf2d7df8821cda533b48cf713f1bfbd23401
    ---------------------------------------------------------------------------
    $ docker inspect nasa | grep -i ipaddress
               "SecondaryIPAddresses": null,
                "IPAddress": "",
                        "IPAddress": "172.18.0.2", ---- ν΄λΉ λ€νΈμμ μ¬μ©μ€
    ```

<br/>

----

## π HOST NETWORK

* HOST NETWORKλ μ»¨νμ΄λμ λ€νΈμν¬ κ²©λ¦¬λ₯Ό ν΄μ νμ¬ νΈμ€νΈ λ€νΈμν¬μ μ λ³΄λ₯Ό `κ³΅μ `ν΄μ μ¬μ©νλ λ°©λ²μλλ€.  
μ»¨νμ΄λλ νΈμ€νΈ μμ₯μμ νλμ νλ‘μΈμ€μ΄κΈ° λλ¬Έμ κ°μλ¨Έμ κ³Ό λ€λ₯΄κ² λ€νΈμν¬ μ λ³΄λ₯Ό κ³΅μ ν  μ μμ΅λλ€.  
μ»¨νμ΄λκ° μ΄ λ€νΈμν¬λ₯Ό μ¬μ©ν  λ μ»¨νμ΄λμ ν¬νΈκ° νΈμ€νΈμμ μ¬μ©νλ ν¬νΈμ  
μΆ©λνλ©΄ λ¬Έμ κ° μκΈ°κ² λ©λλ€. `(λ€νΈμν¬ μΈ λ€λ₯Έ νκ²½μ κΈ°μ‘΄κ³Ό λμΌν©λλ€)`

<br/>


* HOST NETWORKλ `--network host` λͺλ Ήμ μ¬μ©ν΄ μμ±ν  μ μμ΅λλ€.

    ```cs
    docker run -idt --name hostos --network host centos:latest 
    88bf0bb7ab73c651bb2a0c9fc9ee553b973e9e7dfac8e8f7127ef9a0ac8c7d24

    docker inspect hostos | grep -i NetworkMode
              "NetworkMode": "host",
    docker inspect hostos | grep -i ipaddress
              "SecondaryIPAddresses": null,
              "IPAddress": "",
                      "IPAddress": "",
    ```

    <br/>

* μ»¨νμ΄λ IPμ Interfaceλ₯Ό νμΈν΄λ³΄λ©΄ HOSTμ λμΌν©λλ€.

    ```cs
    $ docker exec hostos ip addr show
    --------------------------------------------------------------------------
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
        inet 127.0.0.1/8 scope host lo
        valid_lft forever preferred_lft forever
        inet6 ::1/128 scope host 
        valid_lft forever preferred_lft forever
    2: eno1: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
        link/ether b0:5c:da:ad:d1:25 brd ff:ff:ff:ff:ff:ff
    3: wlp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
        link/ether d8:12:65:cf:77:53 brd ff:ff:ff:ff:ff:ff
        inet 192.168.100.9/24 brd 192.168.100.255 scope global dynamic noprefixroute wlp3s0
        valid_lft 5755sec preferred_lft 5755sec
        inet6 fe80::c52a:605:275a:a9f4/64 scope link noprefixroute 
        valid_lft forever preferred_lft forever
    4: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
        link/ether 02:42:2d:83:d3:b5 brd ff:ff:ff:ff:ff:ff
        inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
        valid_lft forever preferred_lft forever
        inet6 fe80::42:2dff:fe83:d3b5/64 scope link 
        valid_lft forever preferred_lft forever
    ```


    <br/>

* HOSTλ₯Ό μ¬μ©νκΈ°μ DOCKER0μ λ°μΈλ© λμ΄μμ§ μμ΅λλ€.

    ```cs
    $ brctl show
    ----------------------------------------------------------------------
      bridge name	bridge id		STP enabled	interfaces
      br-ddad85781d7f		8000.024257497375	no		veth476053c
      docker0		8000.02422d83d3b5	no		veth26ee67a
                                  veth66ac69f
                                  veth7ab4f7a
    ```cs

<br/>

* INSPECT λͺλ Ήμ΄λ‘ νμΈν΄λ³΄λ©΄ λ€μκ³Ό κ°μ΅λλ€

    ```cs
    nasa1515@nasa:~$ docker network inspect host
    [
        {
            "Name": "host",
            "Id": "29d9e0411d39d339a44fb9c8567926771c0e095f5ea51f41d0064c67b863fb0c",
            "Created": "2020-08-10T17:54:41.031173097+09:00",
            "Scope": "local",
            "Driver": "host",
            "EnableIPv6": false,
            "IPAM": {
                "Driver": "default",
                "Options": null,
                "Config": []
            },
            "Internal": false,
            "Attachable": false,
            "Ingress": false,
            "ConfigFrom": {
                "Network": ""
            },
            "ConfigOnly": false,
            "Containers": {
                "b5663b01cf570dd3960cee1471547d0feb6c3b6681a9afa6bdaf68f5fdb9f510": {
                    "Name": "host",
                    "EndpointID": "1cb2f03508e9eab23c7510d10c31c4b763a7abe84d6b4d33630c55d52b620e45",
                    "MacAddress": "",
                    "IPv4Address": "",
                    "IPv6Address": ""
                }
            },
            "Options": {},
            "Labels": {}
        }
    ]
    ```

    Containers μ μμλ‘ μμ±ν ``HOST`` μ λ³΄κ° μμ§λ§  
    λ€νΈμν¬ νκ²½μ λ°λ‘ κ°μ§κ³  μμ§ μκΈ° λλ¬Έμ IP μ λ³΄λ μμ΅λλ€. 

<br/>

---

## π€NULL(NONE) NETWORK

* ``--net=none μ΅μ``μΌλ‘ μ»¨νμ΄λλ₯Ό μμ±νλ©΄ κ²©λ¦¬λ λ€νΈμν¬ μμ­μ κ°μ΅λλ€  
νμ§λ§ μΈν°νμ΄μ€κ° μλ μνλ‘ μ»¨νμ΄λλ₯Ό μμ±νκ² λ©λλ€.


*   ``net=none`` μΌλ‘ μ§μ νμ¬ μ»¨νμ΄λλ₯Ό μμ± ν΄λ³΄κ² μ΅λλ€.

    ```cs
    nasa1515@nasa:~$ docker run -itd --name none-nasa --net=none centos:latest
    6625654470dde0311bd730d1e8a784908995c3d1e8cc7e2b5bf052ffdf24550f
    ```

    <br/>

* ``exec`` λͺλ Ήμ μ¬μ©ν΄ λ€νΈμν¬λ₯Ό νμΈ κ²°κ³Ό
    ```cs
    nasa1515@nasa:~$ docker exec none-nasa ip a
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
        inet 127.0.0.1/8 scope host lo
        valid_lft forever preferred_lft forever
    ```

    μμ²λΌ loopback μΈν°νμ΄μ€λ§ μκ³ , ν΅μ μ μν eth0 μΈν°νμ΄μ€λ μμ΅λλ€.  
    λΉμ°ν bridgeμλ μ°κ²°λμ§ μμ μνμ΄λ©°, μ΄ μνλ‘λ μΈλΆ ν΅μ μ΄ λΆκ°ν©λλ€. 


    μ΄ μ΅μμ λ§λ  μ΄μ λ, μλ§λ μΈν°νμ΄μ€λ₯Ό μ§μ  μ»€μ€ν°λ§μ΄μ§ ν  μ μλλ‘  
    λ€νΈμν¬ νκ²½μ΄ clear ν μνλ‘ λ§λ€κΈ° μν΄μ μΈ κ²μΌλ‘ μμμ΄λ©λλ€. 

----

## π±βπ CONTAINER - CONTAINER

* μ΄ λ°©μμΌλ‘ μμ±λ μ»¨νμ΄λλ κΈ°μ‘΄μ μ‘΄μ¬νλ λ€λ₯Έ μ»¨νμ΄λμ network νκ²½μ κ³΅μ ν©λλ€. 


    μ΄ν΄λ₯Ό μ½κ²νκΈ° μν΄ μλ μ€μ΅μ μ§ν ν΄λ³΄μμ΅λλ€. 


    <br/>

* λ¨Όμ  ``nasa-master`` λΌλ μ΄λ¦μΌλ‘ μ»¨νμ΄λλ₯Ό μμ± νμ΅λλ€. 

    ```cs
    nasa1515@nasa:~$ docker run -idt --name nasa-master centos:latest
    f91ea38db58198c540916d9e697931a77af312a3e6e7f63f6e9f031e33701ba9
    ```

    <br/>

*  μ΄μ  ``nasa-slave`` μ»¨νμ΄λλ₯Ό μμ±ν λ ``nasa-master``μ network νκ²½μ κ³΅μ νκ² λ§λ€μ΄ λ³΄κ³ . 

    ```cs
    μ΅μ : --net=container:CONTAINER_ID
    ```

    <br/>

    ```cs
    nasa1515@nasa:~$ docker run -itd --name nasa-slave --net=container:f91ea38db58198 centos:latest
    e904d45bc36ac6ad16925cc2cef9fbb80e0ac0f858dec129828463ab570a2476
    ------------------------------------------------------------------------------------
    nasa1515@nasa:~$ docker ps
    CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS               NAMES
    e904d45bc36a        centos:latest       "/bin/bash"         About a minute ago   Up About a minute                       nasa-slave
    f91ea38db581        centos:latest       "/bin/bash"         8 minutes ago        Up 8 minutes                            nasa-master

    ```
    μμ κ°μ΄ ``nasa-master`` μ»¨νμ΄λμ ``nasa-slave`` μ»¨νμ΄λκ° μμ±λμμ΅λλ€.

    <br/>

* νμ§λ§ ``nasa-slave`` μ»¨νμ΄λλ λ°λ‘ IPλ₯Ό κ°μ§ μμΌλ©° ``master``μ κ°μ IPμ MAC μ£Όμλ₯Ό νμΈ ν  μ μμ΅λλ€.

    ```cs
    nasa1515@nasa:~$ docker exec nasa-master ip a
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
        inet 127.0.0.1/8 scope host lo
        valid_lft forever preferred_lft forever
    39: eth0@if40: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
        link/ether 02:42:ac:11:00:07 brd ff:ff:ff:ff:ff:ff link-netnsid 0
        inet 172.17.0.7/16 brd 172.17.255.255 scope global eth0
        valid_lft forever preferred_lft forever
    
    ---------------------------------------------------------------------------------

    nasa1515@nasa:~$ docker exec nasa-slave ip a
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
        inet 127.0.0.1/8 scope host lo
        valid_lft forever preferred_lft forever
    39: eth0@if40: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
        link/ether 02:42:ac:11:00:07 brd ff:ff:ff:ff:ff:ff link-netnsid 0
        inet 172.17.0.7/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
    ```

    <br/>

* ``bridge insptec``λ₯Ό λ΄λ ``slave`` μλ²μ μ λ³΄λ νμΈ ν  μ μμ΅λλ€.

    ```cs
    [
        {
            "Name": "bridge",
            "Id": "c4031fa4ad4b778e12280591052b52b82d97fdaf64bb0e3e45343f5501aa39aa",
            "Created": "2020-08-14T14:31:29.774610308+09:00",
            "Scope": "local",
            "Driver": "bridge",
            "EnableIPv6": false,
            "IPAM": {
                "Driver": "default",
                "Options": null,
                "Config": [
                    {
                        "Subnet": "172.17.0.0/16",
                        "Gateway": "172.17.0.1"
                    }
                ]
            },
            "Internal": false,
            "Attachable": false,
            "Ingress": false,
            "ConfigFrom": {
                "Network": ""
            },
            "ConfigOnly": false,
            "Containers": {
                "f91ea38db58198c540916d9e697931a77af312a3e6e7f63f6e9f031e33701ba9": {
                    "Name": "nasa-master",
                    "EndpointID": "77c63905bc98fe21a3b80ddc676ac4d495e79f66e96b75f2c6f5ab0ae4ccfdfc",
                    "MacAddress": "02:42:ac:11:00:07",
                    "IPv4Address": "172.17.0.7/16",
                    "IPv6Address": ""
                }
            },
            "Options": {
                "com.docker.network.bridge.default_bridge": "true",
                "com.docker.network.bridge.enable_icc": "true",
                "com.docker.network.bridge.enable_ip_masquerade": "true",
                "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
                "com.docker.network.bridge.name": "docker0",
                "com.docker.network.driver.mtu": "1500"
            },
            "Labels": {}
        }
    ]
    ```
-----

```toc
```