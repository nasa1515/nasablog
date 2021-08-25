---
emoji: 🤦‍♂️
title: SMB [LINUX]
date: "2021-06-23 00:01:00"
author: nasa1515
tags: LINUX
categories: LINUX
---

머리말  

SMB에 대해서는 몇번 들어보긴 했지만 정확히는 모르는 상태였습니다.  
실제로 실습을 해본 적도 없고 그냥 공유 디렉토리 설정이라고만 알고있었는데 로직등, 실습을 해보면서 대충은 알 것 같습니다. 


----

## ✔ SMB (Server Message Block)이란 ?
SMB는 Linux 시스템과 Window 시스템의 로컬 디렉토리를 공유할 때 사용합니다.  
Window 시스템에서 구성 후 Linux 시스템에 연결이 가능하고    
반대로 Linux 시스템에서 구성 후 Window 시스템에서도 연결이 가능합니다.

<br/>

* SMB/CIFS   
SMB 프로토콜은 TCP/IP 위에서 동작하며 본래 로컬 네트워크가 아닌 다른 네트워크에  
존재하는 시스템에서 공유하는 디렉토리에는 접근할 수 없습니다. 이후 추가적으로 CIFS 프로토콜을 결합하여  
다른 시스템에서 공유하는 디렉토리에도 접근이 가능해져 ``SMB/CIFS``로 분류되었습니다.  

<br/>

* SAMBA  
사용자는 삼바를 사용하여 SMB 스토리지를 공유하거나 SMB 공유를 사용한다.  

* SAMBA와 관련된 데몬  
      1. smbd : 파일과 프린트 서비스 제공.  
      2. NetBIOS 이름 서비스 요청 인식 및 응답.  
      3. winbindd : 사용자와 그룹 정보 OS 별 변환

------

## ✌ SMB 스토리지 구축 

### SAMBA 패키지 설치

```cs
[root@centos aaa]$  yum -y install samba samba-client
Loaded plugins: fastestmirror, langpacks
Loading mirror speeds from cached hostfile
* base: mirror.kakao.com
* extras: mirror.kakao.com
* updates: mirror.kakao.com
Package samba-client-4.10.4-11.el7_8.x86_64 already installed and latest  version
Resolving Dependencies
--> Running transaction check
---> Package samba.x86_64 0:4.10.4-11.el7_8 will be installed
--> Processing Dependency: samba-common-tools = 4.10.4-11.el7_8 for package: samba-4.10.4-11.el7_8.x86_64
--> Running transaction check
---> Package samba-common-tools.x86_64 0:4.10.4-11.el7_8 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

=====================================================================================================
Package                       Arch              Version                    Repository          Size
=====================================================================================================
Installing:
samba                         x86_64            4.10.4-11.el7_8            updates            708 k
Installing for dependencies:
samba-common-tools            x86_64            4.10.4-11.el7_8            updates            463 k

Transaction Summary
=====================================================================================================
Install  1 Package (+1 Dependent package)

Total download size: 1.1 M
Installed size: 3.2 M
Downloading packages:
(1/2): samba-common-tools-4.10.4-11.el7_8.x86_64.rpm                          | 463 kB  00:00:00     
(2/2): samba-4.10.4-11.el7_8.x86_64.    rpm                                       | 708 kB  00:00:00     
-----------------------------------------------------------------------------------------------------
Total                                                                3.7 MB/s | 1.1 MB  00:00:00     
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
Installing : samba-common-tools-4.10.4-11.el7_8.x86_64                                         1/2 
Installing : samba-4.10.4-11.el7_8.x86_64                                                      2/2 
Verifying  : samba-4.10.4-11.el7_8.x86_64                                                      1/2 
Verifying  : samba-common-tools-4.10.4-11.el7_8.x86_64                                         2/2 

Installed:
samba.x86_64 0:4.10.4-11.el7_8                                                                     

Dependency Installed:
samba-common-tools.x86_64 0:4.10.4-11.el7_8                                                        

Complete!
```


<br/>
 

### Cofig 확인 /etc/samba/smb.conf
    

```cs
[root@centos aaa]$  cat /etc/samba/smb.conf
# See smb.conf.example for a more detailed config file or
# read the smb.conf manpage.
# Run 'testparm' to verify the config is correct after
# you modified it.

[global]                 // SAMBA 서버에 대한 인증 방법, 사용자 저장방법 정의
workgroup = SAMBA       // 작업 그룹의 이름              
security = user            // 서버의 보안 모드

passdb backend = tdbsam      // 사용자의 정보를 저장하는 방법 설정

printing = cups
printcap name = cups
load printers = yes
cups options = raw

[homes]                      // SMB 사용자의 홈 디렉토리 설정
comment = Home Directories   
valid users = %S, %D%w%S
browseable = No
read only = No
inherit acls = Yes

[printers]                   // 프린터 공유를 설정하는 섹션
comment = All Printers
path = /var/tmp
printable = Yes
create mask = 0600
browseable = No

[print$]                     // 프린터 공유를 설정하는 섹션
comment = Printer Drivers
path = /var/lib/samba/drivers
write list = @printadmin root
force group = @printadmin
create mask = 0664
directory mask = 0775
```

<br/>

### SAMBA TEST를 위한 USER 및 그룹 생성


```cs
[root@centos /]$  useradd -s /sbin/nologin smuser
[root@centos /]$  smbpasswd -a smuser       //a 옵션으로 SMB 등록
New SMB password:
Retype new SMB password:
Added user smuser.


[root@centos won]$  cat /etc/passwd | grep smuser
smuser:x:1006:1007::/home/smuser:/sbin/nologin

[root@centos won]$  cat /etc/group | grep samba
sambatest:x:1007:smuser


## SMB 사용자 확인

해당 경로에 TDB파일로 유저정보가 저장된다.

[root@centos /]$  file /var/lib/samba/private/passdb.tdb 
/var/lib/samba/private/passdb.tdb: TDB database version 6, little-endian
    hash size 131 bytes

아래 명령어로 확인 가능

[root@centos /]$  
[root@centos /]$  pdbedit --list
smuser:1006:
```


<br/>



### 공유 디렉토리 생성 및 설정  

```css
[root@centos /]$  mkdir -p /samba/won
[root@centos /]$  chown smuser:sambatest /samba/*
[root@centos /]$  
[root@centos /]$  ls -al /samba/*
합계 0
drwxr-xr-x. 2 smuser sambatest  6  7월  8 21:08 .
drwxr-xr-x. 3 root      root      17  7월  8 21:08 ..
```

<br/>

### SELinux 컨택스트 설정  

```cs
[root@centos /]$  semanage fcontext -a -t samba_share_t '/samba/won(/.*)?'
[root@centos /]$  restorecon -RFv /samba/won/
restorecon reset /samba/won context unconfined_u:object_r:default_t:s0->system_u:object_r:samba_share_t:s0
```

### 설정 파일에 유저 등록

```css
[share]
comment = Samba test
path = /samba/won
write list = smuser, @smbgroup
valid users = smuser, @smbgroup, @wheel
hosts allow = 192.168.56.0/24
browseable = yes              -- 공유 디렉토리 검색 설정

/// 설정에 문제가 없는지 확인
      
[root@centos /]$  testparm
Load smb config files from /etc/samba/smb.conf
Loaded services file OK.
Server role: ROLE_STANDALONE
...
...
  
Press enter to see a dump of your sevice definitions
Enter 입력
...
...


[data]
browseable = yes
comment = won testing
hosts allow = 192.168.56.0/24
path = /samba/won
valid users = smuser @smbgroup @wheel
write list = smuser @smbgroup
```

<br/>


### 서비스 시작 및 방화벽 설정

```css
[root@centos /]$  systemctl start smb nmb
[root@centos /]$  systemctl enable smb nmb
Created symlink from /etc/systemd/system/multi-user.target.wants/smb.service to /usr/lib/systemd/system/smb.service.
Created symlink from /etc/systemd/system/multi-user.target.wants/nmb.service to /usr/lib/systemd/system/nmb.service.


[root@centos /]$  firewall-cmd --permanent --add-service=samba
success
[root@centos /]$  firewall-cmd --reload
success
```

<br/>

----

## 👏 SMB Client 연결
이번 포스트에서는 LINUX <-> LINUX 연결로 작성하였음.

### Client 패키지 설치 cifs.utils, samba-client

```css          
이미 설치되어있음.
          
[root@user01 /]# yum -y install cifs-utils
Loaded plugins: fastestmirror, langpacks
Loading mirror speeds from cached hostfile
 * base: mirror.kakao.com
 * extras: mirror.kakao.com
 * updates: ftp.iij.ad.jp
base                                                                          | 3.6 kB  00:00:00     
 extras                                                                        | 2.9 kB  00:00:00     
 updates                                                                       | 2.9 kB  00:00:00     
 updates/7/x86_64/primary_db                                                   | 3.0 MB  00:00:02     
 Package cifs-utils-6.2-10.el7.x86_64 already installed and latest version
 Nothing to do

------------------------

[root@user01 /]# yum -y install samba-client
Loaded plugins: fastestmirror, langpacks
Loading mirror speeds from cached hostfile
 * base: mirror.kakao.com
 * extras: mirror.kakao.com
 * updates: ftp.iij.ad.jp
 Package samba-client-4.10.4-11.el7_8.x86_64 already installed and latest version
 Nothing to do
```

<br/>

### 공유 영역 탐색

```css
smb.conf의 
browseable = yes 설정이 no로 되어있다면 탐색이 되지 않는다.

root@user01 /]# smbclient -L 192.168.56.101 -U smuser
Enter SAMBA\smuser's password: 

Sharename       Type      Comment
---------       ----      -------
print$          Disk      Printer Drivers
data            Disk      won testing                 ----- 확인.
IPC$            IPC       IPC Service (Samba 4.10.4)
smuser          Disk      Home Directories
Reconnecting with SMB1 for workgroup listing.

Server               Comment
---------            -------

Workgroup            Master
---------            -------
SAMBA                CENTOS
```

<br/>


### 마운트 포인트 생성

```css
[root@user01 /]# mkdir -p /samba/sambatest
[root@user01 /]# ls -alrt samba/sambatest/
합계 0
drwxr-xr-x. 3 root root 23  7월 17 14:59 ..
drwxr-xr-x. 2 root root  6  7월 17 14:59 .
```

<br/>

### 수동마운트  

```css
SMB 공유 스토리지에 연결하기 위한 mount 명령 형식은 다음과 같습니다.

# mount -o auth-infomation //server-addr/smb-share-name mount-poing

1. auth-infomation : 인증정보를 지정합니다.
   따로 username=smbuser,password=123 으로 명령어를 입력해도 된다.
          
# 인증파일 내용
[root@user01 ~]# cat /root/smb-auth 
username=smuser
password=123
domain=SAMBA

2. //server-addr/section-name : 삼바서버의 IP 혹은 DOMAIN을 지정.
   //를 두개 붙여주는 이유 : 리눅스와 윈도우의 \ / 특수기호 처리 때문.

3. smb-share-name : 공유 디렉토리 이름
 --------------------------------------------
```

<br/>

### 공유 디렉토리가 마운트 됨을 확인.

```css
[root@user01 /]# mount -t cifs //192.168.56.101/data /samba -o user=smuser,vers=1.0
Password for smuser@//192.168.56.101/data:  *
[root@user01 /]# df -h
Filesystem               Size  Used Avail Use% Mounted on
devtmpfs                 479M     0  479M   0% /dev
tmpfs                    496M     0  496M   0% /dev/shm
tmpfs                    496M  7.5M  489M   2% /run
tmpfs                    496M     0  496M   0% /sys/fs/cgroup
/dev/mapper/centos-root   41G  4.4G   37G  11% /
/dev/sda1               1014M  171M  844M  17% /boot
tmpfs                    100M   12K  100M   1% /run/user/42
tmpfs                    100M     0  100M   0% /run/user/0
//192.168.56.101/data     17G  4.3G   13G  25% /samba
[root@user01 /]# cd /samba/
[root@user01 samba]# ls -l
합계 4
-rw-r--r--. 1 1006 1009 16  7월 20 11:17 111  
-> // test 용으로 만든 111파일 동기화 확인
```


```toc
```



