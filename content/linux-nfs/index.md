---
emoji: 🤦‍♂️
title: NFS [LINUX]
date: "2021-06-23 00:00:59"
author: nasa1515
tags: LINUX
categories: LINUX
---



머리말  
DNS에 대해서 이론적인 내용도 대충 알고 있었다. 이번 포스트를 작성하면서 이론적인 내용과 함께  
실제로 구축 실습을 해보면서 정확한 개념을 얻을 수 있었다. 

----



## ✔ NFS (Network File system)이란 ?

- RPC를 이용하여 리모트 호스트 사용자가 원격지 컴퓨터에 있는 파일을  
마치 로컬 파일에 access 하듯이 사용 할 수 있도록 하는 클라이언트 / 서버형 파일 시스템 공유 프로토콜

- 네트워크 파일 시스템의 일종이며 유닉스 환경에서 네트워크를 통해 파일과 응용 프로그램을 호스트간 공유하게 해주는 서비스

- 대형 서비스 환경 구축 시 공유 파일 서버를 사용하여 데이터의 일관성을 유지 하는 경우가 많은데 이때 사용하는 기술.  



    ![](https://t1.daumcdn.net/cfile/tistory/996BE94C5B24B2A929)



    RPC ( Remote Procedure Call )  
    별도의 원격 제어를 위한 코딩 없이 다른 주소 공간에서 리모트의 함수나 프로시저  
    를 실행 할 수 있게 해주는 프로세스간 통신입니다. 즉, RPC를 통해 개발자는 위치에 상관없이 원하는 함수를 사용할 수 있습니다.

----

## 👍 NFS서버 설정 파일


  * /etc/exports - 실제 설정 파일 (NFS 서버 설정 파일)  
    NFS 서버에서 파일 공유를 위해 사용되는 모든 파일과 디렉토리를 정의

<br/>

  * /etc/fstab  
    NFS 서버에서 설정한 공유 디렉토리를 NFS 클라이언트에서 사용하기 위해  
    사용되는 파일, 설정 후 부팅시 자동 마운트를 위한 설정파일

<br/>

  * /etc/sysconfig/nfs  
    NFS 서버에서 제공하는 NFS 서비스를 위해 사용되는  
    모든 포트에 대한 정보를 설정하는 파일  

---


## ✌ 서버 구축


  - 실습 버츄얼 박스 환경  
    SERVER : 192.168.56.101 (Minimal centos 7.8)  
    CLIENT : 192.168.56.105 (Minimal centos 7.8)


<br/>


### 1. NFS패키지 설치 및 파일 설정  


* SERVER 설정


    yum install nfs-utils  (NFS 패키지 설치)  


      ```cs 
      이미 설치되어 있다.

        [root@centos ~]$  yum -y install nfs-utils
        Loaded plugins: fastestmirror, langpacks
        Loading mirror speeds from cached hostfile
        * base: mirror.kakao.com
        * extras: mirror.kakao.com
        * updates: mirror.kakao.com
        base                                                                          | 3.6 kB  00:00:00     
        extras                                                                        | 2.9 kB  00:00:00     
        updates                                                                       | 2.9 kB  00:00:00     
        updates/7/x86_64/primary_db                                                   | 3.0 MB  00:00:00     
        Package 1:nfs-utils-1.3.0-0.66.el7.x86_64 already installed and latest version
        Nothing to do
      ```   
      
  <br/>

    rpm -qa |grep nfs    (설치가 되었는지 확인)  

    ```css
    [root@centos ~]$  rpm -qa | grep nfs-utile*
     nfs-utils-1.3.0-0.66.el7.x86_64
    ```


  <br/>

    mkdir -p /NFS_TEST/A (N공유를 허용 할 디렉토리 생성)

      ```cs
      [root@centos ~]$  mkdir -p /NFS_TEST/A
      [root@centos ~]$  
      [root@centos ~]$  
      [root@centos ~]$  
      [root@centos ~]$  ls -l /NFS_TEST/
      합계 0
      drwxr-xr-x. 2 root root 6  7월  8 16:51 A
      ```

  <br/>

    chmod -R 777 /NFS_TEST/* Client가 디렉토리에 접속해 파일을 읽고 쓸수 있게  퍼미션을 777로 설정했다.

    ```cs
    [root@centos ~]$  chmod -R 777 /NFS_TEST/*
    [root@centos ~]$  ls -al /NFS_TEST/
    합계 0
    drwxr-xr-x.  3 root root  15  7월  8 16:51 .
    dr-xr-xr-x. 19 root root 273  7월  8 16:51 ..
    drwxrwxrwx.  2 root root   6  7월  8 16:51 A
    ```

    <br/>

    vim /etc/exports  
   
    ```cs
    //// NFS 설정파일을 열어 공유 디렉토리 및 옵션 설정
    /NFS_TEST	192.168.56.*(sync,rw,no_root_squash)
    ```

    <br/>

    EXPORT 파일 설정 설명  


    ```cs
    /NFS_TEST : 클라이언트에게 공유를 허용 할 디렉토리명


    192.168.56.* : 공유된 디렉토리에 접속 가능한 클라이언트 ip 범위
    ( 도메인도 설정 가능  ex : www.won.co.kr)
    ( *를 이용한 설정도 가능 ex : 192.168.56.*)
    ------------------------------------------------------

    ## NFS 설정 옵션 ##

    ro : 서버의 공유 디렉토리를 읽기 전용(read only) 모드로 마운트
    rw : 서버의 공유 디렉토리를 읽기 쓰기 가능(read Write)모드로 마운트
    sync : 마운트 디렉토리에 쓰기와 같은 연산이 발생할 경우  
           공유 디렉토리와 마운트 디렉토리를 즉시 동기화
           만약, 즉시 동기화를 수행 하지 않고자 할 경우 async 옵션을 사용


    no_subtree_check
    공유 디렉토리는 서브디렉토리를 가질 수 있음
    클라이언트가 특정 파일을 요청하면 서버는 subtree checking이라는 루틴을 실행해 서브디렉토리까지 탐색하여 클라이언트가 요청한 파일의 위치를 확인
    이 옵션을 사용하면 서브디렉토리를 조사하는 루틴을 실행하지 않음 
    만약, 서브 디렉토리까지 검색하고자 할 경우 subtree_check 옵션을 사용


    no_root_squash
    사용자가 클라이언트 시스템의 root계정으로 접근했을 경우 
    서버에서도 root 권한을 가지게 함
    만약, 서버에서 nobody 권한으로 지정하고자 할 경우 root_squash 옵션을 지정


    wdelay 
    디스크 쓰기속도를 지연시켜 데이터가 디스크에 저장되는 회수를 줄여 성능향상 목적으로 사용. 모든 요청에 지연을 발생시켜 오히려성능이 떨어질 수도 있음


    no_wdelay
    NFS에서 사용하는 데이터의 크기가 작거나 자주사용한다면 가능한 빨리 디스크에 기록하도록 하는 옵션
    ```

    <br/>

    NFSD 서비스 실행 및 방화벽 설정

    ```cs
    # 서비스 실행
    [root@centos ~]$  systemctl start nfs-server
    [root@centos ~]$  systemctl enable nfs-server
    Created symlink from /etc/systemd/system/multi-user.target.wants/nfs-server.service to /usr/lib/systemd/system/nfs-server.service.

    # 방화벽 오픈
    [root@centos ~]$  firewall-cmd --permanent --add-service=nfs
    success
    [root@centos ~]$  firewall-cmd --reload
    success
    [root@centos ~]$  
    [root@centos ~]$  firewall-cmd --list-all | grep nfs
    services: dhcpv6-client nfs ssh


    # 추가적으로 Client에서 접근 디렉토리 목록을 확인하려면 아래 규칙도 추가.
    [root@centos ~]$  firewall-cmd --permanent --add-service=rpc-bind
    success
    [root@centos ~]$  firewall-cmd --permanent --add-service=mountd
    success
    [root@centos ~]$  firewall-cmd --reload
    success
    ```

<br/>

---


## 😃 CLIENT 설정


  접근 Mount Point 확인
    
  ```css
  [root@user01 named]# showmount -e 192.168.56.101
  Export list for 192.168.56.101:
  /NFS_TEST 192.168.56.*
  ```

<br/>

  Mount 할 로컬 디렉토리 생성
  
  ```css
  [root@user01 named]# mkdir /client_nfs
  [root@user01 named]# 
  [root@user01 named]# ls -al /client_nfs/
  합계 0
  drwxr-xr-x. 3 root root 15  7월 17 10:47 .
  drwxr-xr-x. 5 root root 50  7월 17 10:47 ..
  ```  


<br/>

  MOUNT

  * 수동마운트
    
  ```css
  수동 마운트 명령어
  # mount [option] server-address(domain):path mount-point
  -------------------------------------------------------

  [Option] -o 를 사용하여 마운트 옵션을 지정
  [server-address:path] NFS SERVER 의 주소와 공유 디렉토리 경로
  [mount-point] 로컬 마운트 포인트
  --------------------------------------------------------
  [root@user01 named]# mount -o rw,sync 192.168.56.101:/NFS_TEST /client_nfs
  [root@user01 named]# 
  [root@user01 named]# df -h | grep 192
  192.168.56.101:/NFS_TEST   17G  4.3G   13G  25% /client_nfs
  [root@user01 named]# 
  [root@user01 named]# ls -alrt /client_nfs/

  합계 0
  drwxrwxrwx. 2 root root  6  7월  8 16:51 A       // 디렉토리 동기화 확인.
  -rw-r--r--. 1 root root  0  7월  8 17:28 test   // test 파일 동기화 확인.
  ```

---
        
## 🌹 자동마운트 : autofs

CD/DVD 를 드라이브에 넣으면 마운트를 하지 않아도  
마운트되는 마운트 위치로 접근하면 자동 마운트 되는 기능이다.  
   
<br/>

- automount?  
  
    ```css
    자동 마운트 데몬(autofs)에 의해 어느 특정 파티션이 필요한 경우에  
    자동으로 마운트와 언마운트가 이뤄지도록 하는 동적 마운트 방식
    ```

<br/>

* autofs  

    ```css
    master map 설정 파일(/etc/autofs/auto.master)를 참고해  
    이미 정의된 마운트 지점을 알아내고 마운트 지점 아래로 마운트되도록  
    정의된(/etc/autofs/auto.misc 파일의 설정을 읽어들여  
    특정 파티션의 파일시스템을 마운트시키고, 언마운트시키게 합니다.
    ```
 

* /etc/autofs/auto.master 구조

    ```cs
    마운트 지점  마운트 포인트 설정 파일   옵션

    마운트지점 : 마운트 상위디렉토리 (주의점) 마운트지점 디렉토리 하위에 디렉토리생성금지

    예) /media  /etc/autofs/auto.misc --timeout=60

    해당 맵 파일을 읽어 맵파일정보대로 
    /media 아래에 자동마운트 미사용시 60초후 자동 언마운트
    ```

<br/>

---

### 자동마운트 설정  

<br/>  

MASTER MAP 파일 설정


<br/>

* /etc/auto.master.d/101.autofs

    ```cs   
    [root@user01 auto.master.d]# cat 101.autofs 
    /client_nfs	    /etc/auto.indirect     
               
    // 직접맵을 사용하기 위해 /- 절대경로 설정
    // 직접맵 파일의 경로를 지정함.
    ```
    

    <br/>

* indirect 맵 파일 생성 (/etc/auto.indirect)


    ```cs
    [root@user01 auto.master.d]# cat /etc/auto.indirect 
     *	-rw,sync,sec=sys,no_root_squash		192.168.56.101:/NFS_TEST/&
    ```

    <br/>

* aufofs 서비스 시작

    ```css
    [root@user01 /]# systemctl start autofs
    [root@user01 /]# systemctl enable autofs
    [root@user01 /]# 
    [root@user01 /]# systemctl status autofs
    ● autofs.service - Automounts filesystems on demand
      Loaded: loaded (/usr/lib/systemd/system/autofs.service; enabled; vendor preset: disabled)
      Active: active (running) since 금 2020-07-17 10:12:27 KST; 1h 2min ago
      Main PID: 1490 (automount)
    CGroup: /system.slice/autofs.service
      └─1490 /usr/sbin/automount --systemd-service --dont-check-daemon

    7월 17 10:12:26 user01 systemd[1]: Starting Automounts filesystems on demand...
    7월 17 10:12:27 user01 automount[1490]: setautomntent: lookup(sss): setautomntent: No such fi...ory
    7월 17 10:12:27 user01 systemd[1]: Started Automounts filesystems on demand.
    Hint: Some lines were ellipsized, use -l to show in full.
    ```

    <br/>

* autofs 동작 확인
       

    ```cs
    [root@user01 /]# ls -alrt /client_nfs/
    합계 4
    dr-xr-xr-x. 22 root root 4096  7월 17 11:46 ..
    drwxr-xr-x.  2 root root    0  7월 17 12:04 .
    [root@user01 /]# 
    [root@user01 /]# cd client_nfs/
    [root@user01 client_nfs]# ls -alrt 
    합계 4
    dr-xr-xr-x. 22 root root 4096  7월 17 11:46 ..
    drwxr-xr-x.  2 root root    0  7월 17 12:04 .
    [root@user01 client_nfs]# cd A
    [root@user01 A]# ls -alrt
    합계 0
    drwxr-xr-x. 2 root root 18  7월  8 18:40 .
    -rw-r--r--. 1 root root  0  7월  8 18:40 test
    drwxr-xr-x. 3 root root  0  7월 17 12:05 ..

    디렉토리가 없었으나, cd 명령어로 접속하자 파일이 동기화.
    --------------------------------------------------------------

     mount 명령어로 디렉토리가 자동 마운트 됨을 확인.

    [root@user01 A]# mount | grep 192
    192.168.56.101:/NFS_TEST/A on /client_nfs/A type nfs4 (rw,relatime,sync,vers=4.1,rsize=262144,wsize=262144,namlen=255,hard,proto=tcp,timeo=600,retrsec=sys,clientaddr=192.168.56.105,local_lock=none,addr=192.168.56.101)
    ```


```toc
```