---
emoji: π€¦ββοΈ
title: "[LINUX] - SMB"
date: "2021-06-23 00:01:00"
author: nasa1515
tags: LINUX
categories: LINUX
---

λ¨Έλ¦¬λ§  

SMBμ λν΄μλ λͺλ² λ€μ΄λ³΄κΈ΄ νμ§λ§ μ ννλ λͺ¨λ₯΄λ μνμμ΅λλ€.  
μ€μ λ‘ μ€μ΅μ ν΄λ³Έ μ λ μκ³  κ·Έλ₯ κ³΅μ  λλ ν λ¦¬ μ€μ μ΄λΌκ³ λ§ μκ³ μμλλ° λ‘μ§λ±, μ€μ΅μ ν΄λ³΄λ©΄μ λμΆ©μ μ κ² κ°μ΅λλ€. 


----

## β SMB (Server Message Block)μ΄λ ?
SMBλ Linux μμ€νκ³Ό Window μμ€νμ λ‘μ»¬ λλ ν λ¦¬λ₯Ό κ³΅μ ν  λ μ¬μ©ν©λλ€.  
Window μμ€νμμ κ΅¬μ± ν Linux μμ€νμ μ°κ²°μ΄ κ°λ₯νκ³     
λ°λλ‘ Linux μμ€νμμ κ΅¬μ± ν Window μμ€νμμλ μ°κ²°μ΄ κ°λ₯ν©λλ€.

<br/>

* SMB/CIFS   
SMB νλ‘ν μ½μ TCP/IP μμμ λμνλ©° λ³Έλ λ‘μ»¬ λ€νΈμν¬κ° μλ λ€λ₯Έ λ€νΈμν¬μ  
μ‘΄μ¬νλ μμ€νμμ κ³΅μ νλ λλ ν λ¦¬μλ μ κ·Όν  μ μμ΅λλ€. μ΄ν μΆκ°μ μΌλ‘ CIFS νλ‘ν μ½μ κ²°ν©νμ¬  
λ€λ₯Έ μμ€νμμ κ³΅μ νλ λλ ν λ¦¬μλ μ κ·Όμ΄ κ°λ₯ν΄μ Έ ``SMB/CIFS``λ‘ λΆλ₯λμμ΅λλ€.  

<br/>

* SAMBA  
μ¬μ©μλ μΌλ°λ₯Ό μ¬μ©νμ¬ SMB μ€ν λ¦¬μ§λ₯Ό κ³΅μ νκ±°λ SMB κ³΅μ λ₯Ό μ¬μ©νλ€.  

* SAMBAμ κ΄λ ¨λ λ°λͺ¬  
      1. smbd : νμΌκ³Ό νλ¦°νΈ μλΉμ€ μ κ³΅.  
      2. NetBIOS μ΄λ¦ μλΉμ€ μμ²­ μΈμ λ° μλ΅.  
      3. winbindd : μ¬μ©μμ κ·Έλ£Ή μ λ³΄ OS λ³ λ³ν

------

## β SMB μ€ν λ¦¬μ§ κ΅¬μΆ 

### SAMBA ν¨ν€μ§ μ€μΉ

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
 

### Cofig νμΈ /etc/samba/smb.conf
    

```cs
[root@centos aaa]$  cat /etc/samba/smb.conf
# See smb.conf.example for a more detailed config file or
# read the smb.conf manpage.
# Run 'testparm' to verify the config is correct after
# you modified it.

[global]                 // SAMBA μλ²μ λν μΈμ¦ λ°©λ², μ¬μ©μ μ μ₯λ°©λ² μ μ
workgroup = SAMBA       // μμ κ·Έλ£Ήμ μ΄λ¦              
security = user            // μλ²μ λ³΄μ λͺ¨λ

passdb backend = tdbsam      // μ¬μ©μμ μ λ³΄λ₯Ό μ μ₯νλ λ°©λ² μ€μ 

printing = cups
printcap name = cups
load printers = yes
cups options = raw

[homes]                      // SMB μ¬μ©μμ ν λλ ν λ¦¬ μ€μ 
comment = Home Directories   
valid users = %S, %D%w%S
browseable = No
read only = No
inherit acls = Yes

[printers]                   // νλ¦°ν° κ³΅μ λ₯Ό μ€μ νλ μΉμ
comment = All Printers
path = /var/tmp
printable = Yes
create mask = 0600
browseable = No

[print$]                     // νλ¦°ν° κ³΅μ λ₯Ό μ€μ νλ μΉμ
comment = Printer Drivers
path = /var/lib/samba/drivers
write list = @printadmin root
force group = @printadmin
create mask = 0664
directory mask = 0775
```

<br/>

### SAMBA TESTλ₯Ό μν USER λ° κ·Έλ£Ή μμ±


```cs
[root@centos /]$  useradd -s /sbin/nologin smuser
[root@centos /]$  smbpasswd -a smuser       //a μ΅μμΌλ‘ SMB λ±λ‘
New SMB password:
Retype new SMB password:
Added user smuser.


[root@centos won]$  cat /etc/passwd | grep smuser
smuser:x:1006:1007::/home/smuser:/sbin/nologin

[root@centos won]$  cat /etc/group | grep samba
sambatest:x:1007:smuser


## SMB μ¬μ©μ νμΈ

ν΄λΉ κ²½λ‘μ TDBνμΌλ‘ μ μ μ λ³΄κ° μ μ₯λλ€.

[root@centos /]$  file /var/lib/samba/private/passdb.tdb 
/var/lib/samba/private/passdb.tdb: TDB database version 6, little-endian
    hash size 131 bytes

μλ λͺλ Ήμ΄λ‘ νμΈ κ°λ₯

[root@centos /]$  
[root@centos /]$  pdbedit --list
smuser:1006:
```


<br/>



### κ³΅μ  λλ ν λ¦¬ μμ± λ° μ€μ   

```css
[root@centos /]$  mkdir -p /samba/won
[root@centos /]$  chown smuser:sambatest /samba/*
[root@centos /]$  
[root@centos /]$  ls -al /samba/*
ν©κ³ 0
drwxr-xr-x. 2 smuser sambatest  6  7μ  8 21:08 .
drwxr-xr-x. 3 root      root      17  7μ  8 21:08 ..
```

<br/>

### SELinux μ»¨νμ€νΈ μ€μ   

```cs
[root@centos /]$  semanage fcontext -a -t samba_share_t '/samba/won(/.*)?'
[root@centos /]$  restorecon -RFv /samba/won/
restorecon reset /samba/won context unconfined_u:object_r:default_t:s0->system_u:object_r:samba_share_t:s0
```

### μ€μ  νμΌμ μ μ  λ±λ‘

```css
[share]
comment = Samba test
path = /samba/won
write list = smuser, @smbgroup
valid users = smuser, @smbgroup, @wheel
hosts allow = 192.168.56.0/24
browseable = yes              -- κ³΅μ  λλ ν λ¦¬ κ²μ μ€μ 

/// μ€μ μ λ¬Έμ κ° μλμ§ νμΈ
      
[root@centos /]$  testparm
Load smb config files from /etc/samba/smb.conf
Loaded services file OK.
Server role: ROLE_STANDALONE
...
...
  
Press enter to see a dump of your sevice definitions
Enter μλ ₯
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


### μλΉμ€ μμ λ° λ°©νλ²½ μ€μ 

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

## π SMB Client μ°κ²°
μ΄λ² ν¬μ€νΈμμλ LINUX <-> LINUX μ°κ²°λ‘ μμ±νμμ.

### Client ν¨ν€μ§ μ€μΉ cifs.utils, samba-client

```css          
μ΄λ―Έ μ€μΉλμ΄μμ.
          
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

### κ³΅μ  μμ­ νμ

```css
smb.confμ 
browseable = yes μ€μ μ΄ noλ‘ λμ΄μλ€λ©΄ νμμ΄ λμ§ μλλ€.

root@user01 /]# smbclient -L 192.168.56.101 -U smuser
Enter SAMBA\smuser's password: 

Sharename       Type      Comment
---------       ----      -------
print$          Disk      Printer Drivers
data            Disk      won testing                 ----- νμΈ.
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


### λ§μ΄νΈ ν¬μΈνΈ μμ±

```css
[root@user01 /]# mkdir -p /samba/sambatest
[root@user01 /]# ls -alrt samba/sambatest/
ν©κ³ 0
drwxr-xr-x. 3 root root 23  7μ 17 14:59 ..
drwxr-xr-x. 2 root root  6  7μ 17 14:59 .
```

<br/>

### μλλ§μ΄νΈ  

```css
SMB κ³΅μ  μ€ν λ¦¬μ§μ μ°κ²°νκΈ° μν mount λͺλ Ή νμμ λ€μκ³Ό κ°μ΅λλ€.

# mount -o auth-infomation //server-addr/smb-share-name mount-poing

1. auth-infomation : μΈμ¦μ λ³΄λ₯Ό μ§μ ν©λλ€.
   λ°λ‘ username=smbuser,password=123 μΌλ‘ λͺλ Ήμ΄λ₯Ό μλ ₯ν΄λ λλ€.
          
# μΈμ¦νμΌ λ΄μ©
[root@user01 ~]# cat /root/smb-auth 
username=smuser
password=123
domain=SAMBA

2. //server-addr/section-name : μΌλ°μλ²μ IP νΉμ DOMAINμ μ§μ .
   //λ₯Ό λκ° λΆμ¬μ£Όλ μ΄μ  : λ¦¬λμ€μ μλμ°μ \ / νΉμκΈ°νΈ μ²λ¦¬ λλ¬Έ.

3. smb-share-name : κ³΅μ  λλ ν λ¦¬ μ΄λ¦
 --------------------------------------------
```

<br/>

### κ³΅μ  λλ ν λ¦¬κ° λ§μ΄νΈ λ¨μ νμΈ.

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
ν©κ³ 4
-rw-r--r--. 1 1006 1009 16  7μ 20 11:17 111  
-> // test μ©μΌλ‘ λ§λ  111νμΌ λκΈ°ν νμΈ
```


```toc
```



