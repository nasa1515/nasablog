---
emoji: 🤦‍♂️
title: 리눅스 ISCSI
date: "2021-06-23 00:01:25"
author: nasa1515
tags: LINUX
categories: LINUX
---


머리말  

ISCSI의 경우 실무에서 써본 기억은 잘 나지 않지만  
개인적으로 인프라공부나, 가상머신을 구축했을때 몇번 만져 본 적은 있었습니다.  
이번 포스트를 적으면서 이론적인 내용에 대해 다시 배웠습니다.


----

## ✔ ISCSI 이란 ?

  iSCSI(Internet Small Computer System Interface)는 저렴한 비용으로 데이터 저장소를 연결하는데 사용되는  
  IP 기반의 Storage 네트워킹 표준입니다. 즉, IP 네트웍 상에서 SCSI 명령을 수행함으로써 iSCSI가 로컬 영역 네트워크 (LAN), 광역 네트웍 (WAN) 또는 인터넷 상에서 보다 손쉽게 데이터를 전송하는 것이 가능합니다.  
  따라서 iSCSI를 통해 저장소 서버의 Storage는 Local Disk처럼 사용될 수 있습니다.  
  물론 실제로는 Local에서 등록된 Disk는 Storage 서버에 존재하기에  
  Disk로 전송되는 모든 데이터는 네트웍을 통해서 Storage 서버로 전송됩니다.  

  또한 이렇게 Local Disk로 등록된 Storage는 서로 다른 서버에서 Storage를 공유해서  사용 할 수 있기에 활용도가 매우 높습니다.  

<br/>

  우선 ISCSI를 보기 전에 리눅스 서버에서  
  기본적으로 사용하는 스토리지를 알아야 합니다.  


-----
## ✌ 스토리지


* #### DAS (Direct Attached Storage)  

  - 스토리지의 한 종류로써 서버와 직접 연결되는 하드웨어.  
  - 서버와 하드웨어를 1:1로 연결.
  - 서버의 외장하드라고 생각하면 쉽게 이해됩니다.  

  장점

  - 확장이 용이 (계속 증설 할 수 있음).  

  단점

  - 계속 확장하다 보면 서버효율 저하

  - 서버가 다운되는 경우 DAS도 사용하지 못한다.


    ![](https://t1.daumcdn.net/cfile/tistory/998F97445E60AB7919)


---

* #### NAS (Network Attacehed Storage)  

  -  네트워크가 연결된 DAS. (파일 단위)

  - 모든 운영체제 지원 가능.  

  장점

  - 많은 어플리케이션 사용 가능.

  - 다중 호스트 파일시스템 액세스 제공.

  - 유지보수 쉬움.

  - 비용이 상대적으로 저렴.  

  단점 

  - 백업이 어려움.

  - 이미지 레벨의 백업 불가 (파일단위로 백업).

  - SAN보다 상한선이 낮다.  

      ![](https://t1.daumcdn.net/cfile/tistory/99CE524F5E60AB7A0A)

---


* #### SAN (Storage Area Network)  

  - 블록 수준(NAS는 파일단위) 스토리지에 접속할 수 있도록 지원하는  
    특정 시스템 전용의 고속 네트워크.

  - 스토리지 트래픽을 LAN과 분리해서 따로 네트워크를 구성.
 
  - 따라서 LAN과는 구별되므로 SAN을 활용한 앱의 가용성과 성능이 향상.

  - NAS와는 다르게 파이버 채널 연결을 이용 (NAS는 표준 이더넷 연결).

  장점

  - 로우 디바이스 처리 가능.

  - NAS보다 성능이 빠름

  - 대규모 백업과 복구 쉬움.

  - 데이터베이스 이중화 시 사용.

  단점

  - 가격이 비쌈.

  - 관리 및 유지보수가 복잡.


    ![](https://t1.daumcdn.net/cfile/tistory/990D75335E60AB7A20)

<br/>

* ### DAS VS NAS VS SAN

   ![스크린샷, 2020-07-20 14-50-47](https://user-images.githubusercontent.com/64260883/87904066-77aeb700-ca98-11ea-85c5-5a196a0f2541.png)



   ---



## 👍 iSCSI 이론  

  *  ISCSI는 서버 역할의 iSCSI Target과, 클라이언트 역할의 iSCSI Initiator로 구분됩니다.
  
      ![](https://t1.daumcdn.net/cfile/tistory/9928ED33598CEBA63A)


<br/>

### 1. LIO (Linux I/O)  

- LIO는 iSCSI Target 관리 데몬입니다.
- 사용자 (관리자)는 'targetcli'를 통해 LIO를 설정할 수 있습니다.


    ![](https://t1.daumcdn.net/cfile/tistory/99B6BC33598CF0860C)

<br/>

### 2. Backstores  

- FILEIO - Target은 디스크 이미지 파일을 생성.  
            Initiator는 해당 파일을 디스크 처럼 사용.


* BLOCK - 물리/논리 볼륨 자체를 공유.  
  Initiator 입장에서는 FILEIO와 IBLOCK이 동일.

<br/>

### 3. IQN (iSCSI Qaulified Name)  

- iSCSI Target과 Initiator 각각의 고유 이름 포맷 중 하나, 이름 포맷에는 IQN 이외에  

  EUI : Extended Unique Identifier  
  NAA : Network Address Authority 등이 있음  

<br/>

- 포맷 형태

  [Type.Date.Naming_Auth:String_defined_by_example.com_Naming_authority]


  - Type : 'iqn' 으로 고정


   - Date : 'YYYY-MM' 의 형태


   - Naming_Auth : 도메인의 역순 형태 (ex - org.kernel)


   - String_defined_by_example.com_Naming_authority (옵션) : 설명 등)


  *  Type 과 Date, Date와 Naming_Auth는 '.' 으로 연결  
    Naming_Auth와 설명은 콜론 (':')으로 연결  
  

          iqn.YYYY-MM.Naming_Auth:String_defined_by_example.com_Naming_authority

          ```cs
          ex 1) iqn.2017-08.com.example:storage.raid

          ex 2) iqn.2017-08.com.example
          ```
----

## 👏 ISCSI 서버 구축 

*  Linux에서의 iSCSI Target

    제공하는 Storage entity를 ``target``이라 하고 이렇게 제공된 entity를 가져다가 사용하는 것을 ``initiator``라고 정의한다.  
    즉, target은 iSCSI의 서버가 되며, 공유된 저장 공간이 존재하는 곳이다. 그리고 제공되는 Storage를 가져다가 사용하기 위해서  
    Server에 접근하는 것을 Initiator라고 하며 iSCSI의 Client라고 한다.  

    
<br/>

*    iSCSI Target과 LUN  

      SCSI 용어에서 LUN은 논리 단위 장치 번호 (Logical Unit Number)라고 한다.  
      이 LUN은 물리적 SCSI 장치("Target"를 의미함)의 일부인 개별적으로 주소 지정이 가능한 (논리적) SCSI 장치를 나타낸다.   
      iSCSI 환경에서는 가상화 방식으로 SCSI Disk로의 연결이 구현된다. iSCSI Target은 연결 인터페이스와 유사하며  
      LUN은 본질적으로 번호가 매겨진 Disk Drive에 해당한다고 볼 수 있다. Client인 iSCSI Initiator에 의해 iSCSI Target이 연결되면 해당 iSCSI Target에 매핑된 모든 LUN이 Client의 운영 체제에 가상으로 연결된다.  
      따라서 Initiator가 마치 자신의 Local에 존재하는 SCSI 또는 IDE Disk처럼 iSCSI LUN에서 파일 시스템을 설정,관리할 수 있다.


<br/>

### 기본 용어 요약  

  * Target : SERVER , 스토리지 장치를 제공하는 시스템
  * Initiator : CLIENT, 스토리지 장치를 제공받는 시스템
  * IQN : Target과 Initiator의 이름

<br/>

  ### Target의 용어
    
  * TPG : Target Portal Gourp : ACL,RUN,Potal 항목을 그룹으로 만듦
  * ACL : 스토리지에 접근 가능한 초기자 지정
  * LUN : 제공 할 스토리지 장치에 부여된 논리 장치 번호
  * PORTAL : Client가 Server에 연결할 때 사용하는 IP주소와 포트  

<br/>

  ### Initiator 용어

  * DISCOVERY : Client 에서 연결하려는 대상을 검색하기 위한 단계
  * LOGIN : Discovery 에서 발견한 대상으로 연결하는 단계

<br/>

----

## 🙌 CentOS에 iSCSI Target 설치 및 환경 설정  

  * 연결 할 Divice는 LVM으로 구성해 20G의 용량을 할당하였다.

      ```cs
      [root@centos won]$  lvs
       LV     VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
       root   centos -wi-ao---- <17.00g                                                    
       swap   centos -wi-ao----   2.00g                                                    
       lee.lv lee    -wi-a-----  20.00g       

      [root@centos won]$  fdisk -l /dev/mapper/lee-lee.lv
      Disk /dev/mapper/lee-lee.lv: 21.5 GB, 21474836480 bytes, 41943040 sectors
      Units = sectors of 1 * 512 = 512 bytes
      Sector size (logical/physical): 512 bytes / 512 bytes
      I/O size (minimum/optimal): 512 bytes / 512 bytes
      ```

<br/>

* ### TGT 패키지 설치  :  targetcli 패키지를 설치한다.

    ```cs
      [root@centos won]$  yum -y install targetcli
      Loaded plugins: fastestmirror, langpacks
      Loading mirror speeds from cached hostfile
      * base: mirror.kakao.com
      * extras: mirror.kakao.com
      * updates: mirror.kakao.com
      Resolving Dependencies
      --> Running transaction check
      ---> Package targetcli.noarch 0:2.1.fb49-1.el7 will be installed
      --> Processing Dependency: python-rtslib >= 2.1.fb41 for package: targetcli-2.1.fb49-1.el7.noarch
      --> Processing Dependency: python-configshell for package: targetcli-2.1.fb49-1.el7.noarch
      --> Running transaction check
      ---> Package python-configshell.noarch 1:1.1.fb25-1.el7 will be installed
      --> Processing Dependency: python-urwid for package: 1:python-configshell-1.1.fb25-1.el7.noarch
      --> Processing Dependency: pyparsing for package: 1:python-configshell-1.1. fb25-1.el7.noarch
      ---> Package python-rtslib.noarch 0:2.1.fb69-3.el7 will be installed
      --> Processing Dependency: python-kmod for package: python-rtslib-2.1.fb69-3.el7.  noarch
      --> Running transaction check
      ---> Package pyparsing.noarch 0:1.5.6-9.el7 will be installed
      ---> Package python-kmod.x86_64 0:0.9-4.el7 will be installed
      ---> Package python-urwid.x86_64 0:1.1.1-3.el7 will be installed
       --> Finished Dependency Resolution

      Dependencies Resolved

      =====================================================================================================
      Package                       Arch              Version                       Repository       Size
      =====================================================================================================
      Installing:
      targetcli                     noarch            2.1.fb49-1.el7                base             68 k
      Installing for dependencies:
      pyparsing                     noarch            1.5.6-9.el7                   base             94 k
      python-configshell            noarch            1:1.1.fb25-1.el7              base             68 k
      python-kmod                   x86_64            0.9-4.el7                     base             57 k
      python-rtslib                 noarch            2.1.fb69-3.el7                base            102 k
      python-urwid                  x86_64            1.1.1-3.el7                   base            654 k

      Transaction Summary
      =====================================================================================================
      Install  1 Package (+5 Dependent packages)

      Total download size: 1.0 M
      Installed size: 4.6 M
      Downloading packages:
      (1/6): pyparsing-1.5.6-9.el7.noarch.rpm                                       |  94 kB  00:00:00     
      (2/6): python-configshell-1.1.fb25-1.el7.noarch.rpm                           |  68 kB  00:00:00     
      (3/6): python-kmod-0.9-4.el7.x86_64.rpm                                       |  57 kB  00:00:00     
      (4/6): python-rtslib-2.1.fb69-3.el7.noarch.rpm                                | 102 kB  00:00:00     
      (5/6): python-urwid-1.1.1-3.el7.x86_64.rpm                                    | 654 kB  00:00:00     
      (6/6): targetcli-2.1.fb49-1.el7.noarch.rpm                                    |  68 kB  00:00:00     
      -----------------------------------------------------------------------------------------------------
      Total                                                                1.7 MB/s | 1.0 MB  00:00:00     
      Running transaction check
      Running transaction test
      Transaction test succeeded
      Running transaction
        Installing : python-kmod-0.9-4.el7.x86_64                                                      1/6 
      Installing : python-rtslib-2.1.fb69-3.el7.noarch                                               2/6 
      Installing : pyparsing-1.5.6-9.el7.noarch                                                      3/6 
      Installing : python-urwid-1.1.1-3.el7.x86_64                                                   4/6 
      Installing : 1:python-configshell-1.1.fb25-1.el7.noarch                                        5/6 
      Installing : targetcli-2.1.fb49-1.el7.noarch                                                   6/6 
      Verifying  : python-urwid-1.1.1-3.el7.x86_64                                                   1/6 
      Verifying  : targetcli-2.1.fb49-1.el7.noarch                                                   2/6 
      Verifying  : 1:python-configshell-1.1.fb25-1.el7.noarch                                        3/6 
      Verifying  : python-rtslib-2.1.fb69-3.el7.noarch                                               4/6 
      Verifying  : pyparsing-1.5.6-9.el7.noarch                                                      5/6 
      Verifying  : python-kmod-0.9-4.el7.x86_64                                                      6/6 

      Installed:
      targetcli.noarch 0:2.1.fb49-1.el7                                                                  

      Dependency Installed:
      pyparsing.noarch 0:1.5.6-9.el7               python-configshell.noarch 1:1.1.fb25-1.el7           
      python-kmod.x86_64 0:0.9-4.el7               python-rtslib.noarch 0:2.1.fb69-3.el7                
      python-urwid.x86_64 0:1.1.1-3.el7           

      Complete!
    ```

<br/>

  * ### TGT 서비스 실행  

    ```cs
    [root@centos won]$  systemctl start target
    [root@centos won]$  systemctl enable target
    Created symlink from /etc/systemd/system/multi-user.target.wants/target.service to /usr/lib/systemd/system/target.service.
    ```

<br/>

* ### targetcli 설정

    ```cs
    [root@centos won]$  targetcli
    Warning: Could not load preferences file /root/.targetcli/prefs.bin.
    targetcli shell version 2.1.fb49
    Copyright 2011-2013 by Datera, Inc and others.
    For help on commands, type 'help'.

    /> ls            ///// 없음을 확인.
    o- / .......................................................................................... [...]
      o- backstores ............................................................................... [...]
      | o- block ................................................................... [Storage Objects: 0]
      | o- fileio .................................................................. [Storage Objects: 0]
      | o- pscsi ................................................................... [Storage Objects: 0]
      | o- ramdisk ................................................................. [Storage Objects: 0]
      o- iscsi ............................................................................. [Targets: 0]
      o- loopback .......................................................................... [Targets: 0]
    /> 



    block : 서버에 정의된 블록 디바이스 항목.
    fileio : 현재 시스템에서 사용중인 파일시스템의 일부 공간을 제공
    pscsi : 모든 유형의 로컬 SCSI장치를 공유 할 수 있게 설정
    ramdisk : 시스템 메모리에 램디스크 장치를 만들어 저장 / 재부팅 시 사라짐
  ```

  <br/>

* ### backstore 생성 // 디바이스 자체를 공유 할 것  
 
 
  ```cs
    /> /backstores/block create name=lee_block dev=/dev/mapper/lee-lee.lv 
    Created block storage object lee_block using /dev/mapper/lee-lee.lv.
    /> ls
    o- / .......................................................................................... [...]
      o- backstores ............................................................................... [...]
      | o- block ................................................................... [Storage Objects: 1]
      | | o- lee_block ........................ [/dev/mapper/lee-lee.lv (20.0GiB) write-thru deactivated]
      | |   o- alua .................................................................... [ALUA Groups: 1]
      | |     o- default_tg_pt_gp ........................................ [ALUA state: Active/optimized]
      | o- fileio .................................................................. [Storage Objects: 0]
      | o- pscsi ................................................................... [Storage Objects: 0]
      | o- ramdisk ................................................................. [Storage Objects: 0]
      o- iscsi ............................................................................. [Targets: 0]
      o- loopback .......................................................................... [Targets: 0]
    /> 
    ```


<br/>

* ### ISCSI 연결 (IQN 주소 설정)
  
  ```cs
    /> /iscsi create wwn=iqn.2020-07.192.168.56.101:server  // 도메인으로도 설정 가능
    Created target iqn.2020-07.192.168.56.101:server.
    Created TPG 1.
    Global pref auto_add_default_portal=true
    Created default portal listening on all IPs (0.0.0.0), port 3260.
    /> 
    /> ls
    o- / .......................................................................................... [...]
      o- backstores ............................................................................... [...]
      | o- block ................................................................... [Storage Objects: 1]
      | | o- lee_block ........................ [/dev/mapper/lee-lee.lv (20.0GiB) write-thru deactivated]
      | |   o- alua .................................................................... [ALUA Groups: 1]
      | |     o- default_tg_pt_gp ........................................ [ALUA state: Active/optimized]
      | o- fileio .................................................................. [Storage Objects: 0]
      | o- pscsi ................................................................... [Storage Objects: 0]
      | o- ramdisk ................................................................. [Storage Objects: 0]
      o- iscsi ............................................................................. [Targets: 1]
      | o- iqn.2020-07.192.168.56.101:server .................................................. [TPGs: 1]
      |   o- tpg1 ................................................................ [no-gen-acls, no-auth]
      |     o- acls ........................................................................... [ACLs: 0]
      |     o- luns ........................................................................... [LUNs: 0]
      |     o- portals ..................................................................... [Portals: 1]
      |       o- 0.0.0.0:3260 ...................................................................... [OK]
      o- loopback .......................................................................... [Targets: 0]
    
    ```

<br/>

* ### ISCSI 연결 (ACL 설정)
  
  ```cs
    /> /iscsi/iqn.2020-07.192.168.56.101:server/tpg1/acls create wwn=iqn.2020-07.192.168.56.105:client
    Created Node ACL for iqn.2020-07.192.168.56.105:client
    /> 
    /> ls
    o- / .......................................................................................... [...]
      o- backstores ............................................................................... [...]
      | o- block ................................................................... [Storage Objects: 1]
      | | o- lee_block ........................ [/dev/mapper/lee-lee.lv (20.0GiB) write-thru deactivated]
      | |   o- alua .................................................................... [ALUA Groups: 1]
      | |     o- default_tg_pt_gp ........................................ [ALUA state: Active/optimized]
      | o- fileio .................................................................. [Storage Objects: 0]
      | o- pscsi ................................................................... [Storage Objects: 0]
      | o- ramdisk ................................................................. [Storage Objects: 0]
      o- iscsi ............................................................................. [Targets: 1]
      | o- iqn.2020-07.192.168.56.101:server .................................................. [TPGs: 1]
      |   o- tpg1 ................................................................ [no-gen-acls, no-auth]
      |     o- acls ........................................................................... [ACLs: 1]
      |     | o- iqn.2020-07.192.168.56.105:client ..................................... [Mapped LUNs: 0]
      |     o- luns ........................................................................... [LUNs: 0]
      |     o- portals ..................................................................... [Portals: 1]
      |       o- 0.0.0.0:3260 ...................................................................... [OK]
      o- loopback .......................................................................... [Targets: 0]
    /> 
    ```

<br/>

* ### ISCSI 연결 (LUN 설정)
  
  ```cs
    /> /iscsi/iqn.2020-07.192.168.56.101:server/tpg1/luns create storage_object=/backstores/block/lee_block lun=lun0
    Created LUN 0.
    Created LUN 0->0 mapping in node ACL iqn.2020-07.192.168.56.105:client
    /> ls
    o- / .......................................................................................... [...]
      o- backstores ............................................................................... [...]
      | o- block ................................................................... [Storage Objects: 1]
      | | o- lee_block .......................... [/dev/mapper/lee-lee.lv (20.0GiB) write-thru activated]
      | |   o- alua .................................................................... [ALUA Groups: 1]
      | |     o- default_tg_pt_gp ........................................ [ALUA state: Active/optimized]
      | o- fileio .................................................................. [Storage Objects: 0]
      | o- pscsi ................................................................... [Storage Objects: 0]
      | o- ramdisk ................................................................. [Storage Objects: 0]
      o- iscsi ............................................................................. [Targets: 1]
      | o- iqn.2020-07.192.168.56.101:server .................................................. [TPGs: 1]
      |   o- tpg1 ................................................................ [no-gen-acls, no-auth]
      |     o- acls ........................................................................... [ACLs: 1]
      |     | o- iqn.2020-07.192.168.56.105:client ..................................... [Mapped LUNs: 1]
      |     |   o- mapped_lun0 .............................................. [lun0 block/lee_block (rw)]
      |     o- luns ........................................................................... [LUNs: 1]
      |     | o- lun0 ..................... [block/lee_block (/dev/mapper/lee-lee.lv) (default_tg_pt_gp)]
      |     o- portals ..................................................................... [Portals: 1]
      |       o- 0.0.0.0:3260 ...................................................................... [OK]
      o- loopback .......................................................................... [Targets: 0]
    /> 
    ```

<br/>

 * ### ISCSI 연결 (PORTAR 설정)

    ```cs
    /> /iscsi/iqn.2020-07.192.168.56.101:server/tpg1/portals delete ip_address=0.0.0.0 ip_port=3260
    Deleted network portal 0.0.0.0:3260    // 기본으로 설정되어있는 target 삭제
    /> 
    /> /iscsi/iqn.2020-07.192.168.56.101:server/tpg1/portals create 192.168.56.101
    Using default IP port 3260
    Created network portal 192.168.56.101:3260.    // 새로운 target 추가
    /> ls
    o- / .......................................................................................... [...]
      o- backstores ............................................................................... [...]
      | o- block ................................................................... [Storage Objects: 1]
      | | o- lee_block .......................... [/dev/mapper/lee-lee.lv (20.0GiB) write-thru activated]
      | |   o- alua .................................................................... [ALUA Groups: 1]
      | |     o- default_tg_pt_gp ........................................ [ALUA state: Active/optimized]
      | o- fileio .................................................................. [Storage Objects: 0]
      | o- pscsi ................................................................... [Storage Objects: 0]
      | o- ramdisk ................................................................. [Storage Objects: 0]
      o- iscsi ............................................................................. [Targets: 1]
      | o- iqn.2020-07.192.168.56.101:server .................................................. [TPGs: 1]
      |   o- tpg1 ................................................................ [no-gen-acls, no-auth]
      |     o- acls ........................................................................... [ACLs: 1]
      |     | o- iqn.2020-07.192.168.56.105:client ..................................... [Mapped LUNs: 1]
      |     |   o- mapped_lun0 .............................................. [lun0 block/lee_block (rw)]
      |     o- luns ........................................................................... [LUNs: 1]
      |     | o- lun0 ..................... [block/lee_block (/dev/mapper/lee-lee.lv) (default_tg_pt_gp)]
      |     o- portals ..................................................................... [Portals: 1]
      |       o- 192.168.56.101:3260 ............................................................... [OK]
      o- loopback .......................................................................... [Targets: 0]
    /> 

    ```

<br/>

 * ### 방화벽 설정

    ```cs
    [root@centos won]$  firewall-cmd --add-port=3260/tcp --permanent 
    success
    [root@centos won]$  firewall-cmd --reload
    success
    ```


<br/>

----


## 🐱‍🏍 CentOS에 iSCSI Initiator 설치 및 환경 설정 


* ### Initiator 패키지 설치  :  Initiator 패키지를 설치한다.

    ```cs
    [root@user01 samba]# yum -y install iscsi-initiator-utils
    Loaded plugins: fastestmirror, langpacks
    Loading mirror speeds from cached hostfile
    * base: mirror.kakao.com
    * extras: mirror.kakao.com
    * updates: mirror.kakao.com
    Resolving Dependencies
    --> Running transaction check
    ---> Package iscsi-initiator-utils.x86_64 0:6.2.0.874-17.el7 will be installed
    --> Processing Dependency: iscsi-initiator-utils-iscsiuio >= 6.2.0.874-17.el7 for package: iscsi-initiator-utils-6.2.0.874-17.el7.x86_64
    --> Running transaction check
    ---> Package iscsi-initiator-utils-iscsiuio.x86_64 0:6.2.0.874-17.el7 will be installed
    --> Finished Dependency Resolution

    Dependencies Resolved

    =====================================================================================================
    Package                                Arch           Version                    Repository    Size
    =====================================================================================================
    Installing:
    iscsi-initiator-utils                  x86_64         6.2.0.874-17.el7           base         423 k
    Installing for dependencies:
    iscsi-initiator-utils-iscsiuio         x86_64         6.2.0.874-17.el7           base          93 k

    Transaction Summary
    =====================================================================================================
    Install  1 Package (+1 Dependent package)

    Total download size: 517 k
    Installed size: 2.6 M
    Downloading packages:
    (1/2): iscsi-initiator-utils-iscsiuio-6.2.0.874-17.el7.x86_64.rpm             |  93 kB  00:00:00     
    (2/2): iscsi-initiator-utils-6.2.0.874-17.el7.x86_64.rpm                      | 423 kB  00:00:00     
    -----------------------------------------------------------------------------------------------------
    Total                                                                707 kB/s | 517 kB  00:00:00     
    Running transaction check
    Running transaction test
    Transaction test succeeded
    Running transaction
      Installing : iscsi-initiator-utils-6.2.0.874-17.el7.x86_64                                     1/2 
      Installing : iscsi-initiator-utils-iscsiuio-6.2.0.874-17.el7.x86_64                            2/2 
      Verifying  : iscsi-initiator-utils-iscsiuio-6.2.0.874-17.el7.x86_64                            1/2 
      Verifying  : iscsi-initiator-utils-6.2.0.874-17.el7.x86_64                                     2/2 

    Installed:
      iscsi-initiator-utils.x86_64 0:6.2.0.874-17.el7                                                    

    Dependency Installed:
      iscsi-initiator-utils-iscsiuio.x86_64 0:6.2.0.874-17.el7                                           

    Complete!

  ```


<br/>

* ### IQN 설정

    ```cs
    [root@user01 samba]# vim /etc/iscsi/initiatorname.iscsi 
    [root@user01 samba]# cat /etc/iscsi/initiatorname.iscsi 
    InitiatorName=iqn.2020-07.192.168.56.105:client
    ```

<br/>


* ### 서비스 활성화

    ```cs
    [root@user01 samba]# systemctl start iscsi
    [root@user01 samba]# systemctl enable iscsi
    ```

<br/>


* ### TARGET 연결

  ```cs
  [root@user01 iscsi]# iscsiadm -m discovery -t st -p 192.168.56.101
  192.168.56.101:3260,1 iqn.2020-07.192.168.56.101:server



  -m : 동작모드를 지정 타겟 검색을 위해 discovery 설정
  -t : sendtarget의 약자로 대상 iqn 이름을 확인하기 위해 st로 지정

  ```


<br/>

* ### LOGIN

  ```cs
  [root@user01 iscsi]# iscsiadm -m node -T iqn.2020-07.192.168.56.101:server -l
  Logging in to [iface: default, target: iqn.2020-07.192.168.56.101:server, portal: 192.168.56.101,3260] (multiple)
  Login to [iface: default, target: iqn.2020-07.192.168.56.101:server, portal: 192.168.56.101,3260] successful.

  -m : 동작모드를 node 로 지정하면 연결을 시도
  -l : 로그인을 위한 옵션
  ```


  <br/>


* ### Session 확인

  ```cs
    [root@user01 iscsi]# iscsiadm -m session -P 3
    iSCSI Transport Class version 2.0-870
    version 6.2.0.874-17
    Target: iqn.2020-07.192.168.56.101:server (non-flash)
      Current Portal: 192.168.56.101:3260,1
      Persistent Portal: 192.168.56.101:3260,1
        **********
        Interface:
        **********
        Iface Name: default
        Iface Transport: tcp
        Iface Initiatorname: iqn.2020-07.192.168.56.105:client
        Iface IPaddress: 192.168.56.105
        Iface HWaddress: <empty>
        Iface Netdev: <empty>
        SID: 2
        iSCSI Connection State: LOGGED IN
        iSCSI Session State: LOGGED_IN
        Internal iscsid Session State: NO CHANGE
        *********
        Timeouts:
        *********
        Recovery Timeout: 120
        Target Reset Timeout: 30
        LUN Reset Timeout: 30
        Abort Timeout: 15
        *****
        CHAP:
        *****
        username: <empty>
        password: ********
        username_in: <empty>
        password_in: ********
        ************************
        Negotiated iSCSI params:
        ************************
        HeaderDigest: None
        DataDigest: None
        MaxRecvDataSegmentLength: 262144
        MaxXmitDataSegmentLength: 262144
        FirstBurstLength: 65536
        MaxBurstLength: 262144
        ImmediateData: Yes
        InitialR2T: Yes
        MaxOutstandingR2T: 1
        ************************
        Attached SCSI devices:
        ************************
        Host Number: 4	State: running
        scsi4 Channel 00 Id 0 Lun: 0
          Attached scsi disk sdb		State: running   -- sdb로 받아왔다는 로그




  -m : session 은 제공받는 장치의 대한 정보를 확인 할 수 있다.
  -P : 세션 확인 시 지정하는 등급으로 0~3 까지의 지정 가능 3으로 지정시 장치 이름 확인 가능

  ```


<br/>


* ### 장치 확인 및 사용

  ```cs
    [root@user01 iscsi]# fdisk -l /dev/sdb


    파티셔닝 전 장치 확인
    Disk /dev/sdb: 21.5 GB, 21474836480 bytes, 41943040 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 33550336 bytes

    --------------------------------------
    파티셔닝 후 장치 확인

    [root@user01 iscsi]# fdisk -l /dev/sdb

    Disk /dev/sdb: 21.5 GB, 21474836480 bytes, 41943040 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 33550336 bytes
    Disk label type: dos
    Disk identifier: 0xea17a284

      Device Boot      Start         End      Blocks   Id  System
    /dev/sdb1           65528    41943039    20938756   83  Linux

    -------------------------------
    파일 시스템 생성 및 마운트 확인.

    [root@user01 iscsi]# mkfs.xfs /dev/sdb1
    meta-data=/dev/sdb1              isize=512    agcount=4, agsize=1308673 blks
            =                       sectsz=512   attr=2, projid32bit=1
            =                       crc=1        finobt=0, sparse=0
    data     =                       bsize=4096   blocks=5234689, imaxpct=25
            =                       sunit=0      swidth=0 blks
    naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
    log      =internal log           bsize=4096   blocks=2560, version=2
            =                       sectsz=512   sunit=0 blks, lazy-count=1
    realtime =none                   extsz=4096   blocks=0, rtextents=0
    [root@user01 iscsi]# 
    [root@user01 iscsi]# 
    [root@user01 iscsi]# 
    [root@user01 iscsi]# df -h
    Filesystem               Size  Used Avail Use% Mounted on
    devtmpfs                 479M     0  479M   0% /dev
    tmpfs                    496M     0  496M   0% /dev/shm
    tmpfs                    496M  7.5M  489M   2% /run
    tmpfs                    496M     0  496M   0% /sys/fs/cgroup
    /dev/mapper/centos-root   41G  4.3G   37G  11% /
    /dev/sda1               1014M  171M  844M  17% /boot
    tmpfs                    100M   12K  100M   1% /run/user/42
    tmpfs                    100M     0  100M   0% /run/user/0
    //192.168.56.101/data     17G  4.3G   13G  25% /samba
    [root@user01 iscsi]# 
    [root@user01 iscsi]# mount /dev/sdb1 /mnt/iscsi
    [root@user01 iscsi]# 
    [root@user01 iscsi]# df -h
    Filesystem               Size  Used Avail Use% Mounted on
    devtmpfs                 479M     0  479M   0% /dev
    tmpfs                    496M     0  496M   0% /dev/shm
    tmpfs                    496M  7.5M  489M   2% /run
    tmpfs                    496M     0  496M   0% /sys/fs/cgroup
    /dev/mapper/centos-root   41G  4.3G   37G  11% /
    /dev/sda1               1014M  171M  844M  17% /boot
    tmpfs                    100M   12K  100M   1% /run/user/42
    tmpfs                    100M     0  100M   0% /run/user/0
    //192.168.56.101/data     17G  4.3G   13G  25% /samba
    /dev/sdb1                 20G   33M   20G   1% /mnt/iscsi
  ```


<br/>

* ### fstab 등록 사용  
  ISCSI를 사용해 제공받는 장치를 fstab에 등록할때  
  ``_netdev``를 지정해줘야 정상 부팅 가능.

  ```cs
    [root@user01 iscsi]# cat /etc/fstab  | grep sdb1
    /dev/sdb1 /mnt/iscsi                       xfs     _netdev        0 0


    ----------------------------------
    fstab 정상 등록 확인.

    [root@user01 etc]# mount -a
    [root@user01 etc]# df -h
    Filesystem               Size  Used Avail Use% Mounted on
    devtmpfs                 479M     0  479M   0% /dev
    tmpfs                    496M     0  496M   0% /dev/shm
    tmpfs                    496M  7.5M  489M   2% /run
    tmpfs                    496M     0  496M   0% /sys/fs/cgroup
    /dev/mapper/centos-root   41G  4.3G   37G  11% /
    /dev/sda1               1014M  171M  844M  17% /boot
    tmpfs                    100M   12K  100M   1% /run/user/42
    tmpfs                    100M     0  100M   0% /run/user/0
    //192.168.56.101/data     17G  4.3G   13G  25% /samba
    /dev/sdb1                 20G   33M   20G   1% /mnt/iscsi
  ```


```toc
```