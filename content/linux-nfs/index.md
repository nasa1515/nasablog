---
emoji: π€¦ββοΈ
title: "[LINUX] - NFS"
date: "2021-06-23 00:00:59"
author: nasa1515
tags: LINUX
categories: LINUX
---



λ¨Έλ¦¬λ§  

DNSμ λν΄μ μ΄λ‘ μ μΈ λ΄μ©λ λμΆ© μκ³  μμλ€. μ΄λ² ν¬μ€νΈλ₯Ό μμ±νλ©΄μ μ΄λ‘ μ μΈ λ΄μ©κ³Ό ν¨κ»  
μ€μ λ‘ κ΅¬μΆ μ€μ΅μ ν΄λ³΄λ©΄μ μ νν κ°λμ μ»μ μ μμλ€. 

----



## β NFS (Network File system)μ΄λ ?

- RPCλ₯Ό μ΄μ©νμ¬ λ¦¬λͺ¨νΈ νΈμ€νΈ μ¬μ©μκ° μκ²©μ§ μ»΄ν¨ν°μ μλ νμΌμ  
λ§μΉ λ‘μ»¬ νμΌμ access νλ―μ΄ μ¬μ© ν  μ μλλ‘ νλ ν΄λΌμ΄μΈνΈ / μλ²ν νμΌ μμ€ν κ³΅μ  νλ‘ν μ½

- λ€νΈμν¬ νμΌ μμ€νμ μΌμ’μ΄λ©° μ λμ€ νκ²½μμ λ€νΈμν¬λ₯Ό ν΅ν΄ νμΌκ³Ό μμ© νλ‘κ·Έλ¨μ νΈμ€νΈκ° κ³΅μ νκ² ν΄μ£Όλ μλΉμ€

- λν μλΉμ€ νκ²½ κ΅¬μΆ μ κ³΅μ  νμΌ μλ²λ₯Ό μ¬μ©νμ¬ λ°μ΄ν°μ μΌκ΄μ±μ μ μ§ νλ κ²½μ°κ° λ§μλ° μ΄λ μ¬μ©νλ κΈ°μ .  



    ![](https://t1.daumcdn.net/cfile/tistory/996BE94C5B24B2A929)



    RPC ( Remote Procedure Call )  
    λ³λμ μκ²© μ μ΄λ₯Ό μν μ½λ© μμ΄ λ€λ₯Έ μ£Όμ κ³΅κ°μμ λ¦¬λͺ¨νΈμ ν¨μλ νλ‘μμ   
    λ₯Ό μ€ν ν  μ μκ² ν΄μ£Όλ νλ‘μΈμ€κ° ν΅μ μλλ€. μ¦, RPCλ₯Ό ν΅ν΄ κ°λ°μλ μμΉμ μκ΄μμ΄ μνλ ν¨μλ₯Ό μ¬μ©ν  μ μμ΅λλ€.

----

## π NFSμλ² μ€μ  νμΌ


  * /etc/exports - μ€μ  μ€μ  νμΌ (NFS μλ² μ€μ  νμΌ)  
    NFS μλ²μμ νμΌ κ³΅μ λ₯Ό μν΄ μ¬μ©λλ λͺ¨λ  νμΌκ³Ό λλ ν λ¦¬λ₯Ό μ μ

<br/>

  * /etc/fstab  
    NFS μλ²μμ μ€μ ν κ³΅μ  λλ ν λ¦¬λ₯Ό NFS ν΄λΌμ΄μΈνΈμμ μ¬μ©νκΈ° μν΄  
    μ¬μ©λλ νμΌ, μ€μ  ν λΆνμ μλ λ§μ΄νΈλ₯Ό μν μ€μ νμΌ

<br/>

  * /etc/sysconfig/nfs  
    NFS μλ²μμ μ κ³΅νλ NFS μλΉμ€λ₯Ό μν΄ μ¬μ©λλ  
    λͺ¨λ  ν¬νΈμ λν μ λ³΄λ₯Ό μ€μ νλ νμΌ  

---


## β μλ² κ΅¬μΆ


  - μ€μ΅ λ²μΈμΌ λ°μ€ νκ²½  
    SERVER : 192.168.56.101 (Minimal centos 7.8)  
    CLIENT : 192.168.56.105 (Minimal centos 7.8)


<br/>


### 1. NFSν¨ν€μ§ μ€μΉ λ° νμΌ μ€μ   


* SERVER μ€μ 


    yum install nfs-utils  (NFS ν¨ν€μ§ μ€μΉ)  


      ```cs 
      μ΄λ―Έ μ€μΉλμ΄ μλ€.

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

    rpm -qa |grep nfs    (μ€μΉκ° λμλμ§ νμΈ)  

    ```css
    [root@centos ~]$  rpm -qa | grep nfs-utile*
     nfs-utils-1.3.0-0.66.el7.x86_64
    ```


  <br/>

    mkdir -p /NFS_TEST/A (Nκ³΅μ λ₯Ό νμ© ν  λλ ν λ¦¬ μμ±)

      ```cs
      [root@centos ~]$  mkdir -p /NFS_TEST/A
      [root@centos ~]$  
      [root@centos ~]$  
      [root@centos ~]$  
      [root@centos ~]$  ls -l /NFS_TEST/
      ν©κ³ 0
      drwxr-xr-x. 2 root root 6  7μ  8 16:51 A
      ```

  <br/>

    chmod -R 777 /NFS_TEST/* Clientκ° λλ ν λ¦¬μ μ μν΄ νμΌμ μ½κ³  μΈμ μκ²  νΌλ―Έμμ 777λ‘ μ€μ νλ€.

    ```cs
    [root@centos ~]$  chmod -R 777 /NFS_TEST/*
    [root@centos ~]$  ls -al /NFS_TEST/
    ν©κ³ 0
    drwxr-xr-x.  3 root root  15  7μ  8 16:51 .
    dr-xr-xr-x. 19 root root 273  7μ  8 16:51 ..
    drwxrwxrwx.  2 root root   6  7μ  8 16:51 A
    ```

    <br/>

    vim /etc/exports  
   
    ```cs
    //// NFS μ€μ νμΌμ μ΄μ΄ κ³΅μ  λλ ν λ¦¬ λ° μ΅μ μ€μ 
    /NFS_TEST	192.168.56.*(sync,rw,no_root_squash)
    ```

    <br/>

    EXPORT νμΌ μ€μ  μ€λͺ  


    ```cs
    /NFS_TEST : ν΄λΌμ΄μΈνΈμκ² κ³΅μ λ₯Ό νμ© ν  λλ ν λ¦¬λͺ


    192.168.56.* : κ³΅μ λ λλ ν λ¦¬μ μ μ κ°λ₯ν ν΄λΌμ΄μΈνΈ ip λ²μ
    ( λλ©μΈλ μ€μ  κ°λ₯  ex : www.won.co.kr)
    ( *λ₯Ό μ΄μ©ν μ€μ λ κ°λ₯ ex : 192.168.56.*)
    ------------------------------------------------------

    ## NFS μ€μ  μ΅μ ##

    ro : μλ²μ κ³΅μ  λλ ν λ¦¬λ₯Ό μ½κΈ° μ μ©(read only) λͺ¨λλ‘ λ§μ΄νΈ
    rw : μλ²μ κ³΅μ  λλ ν λ¦¬λ₯Ό μ½κΈ° μ°κΈ° κ°λ₯(read Write)λͺ¨λλ‘ λ§μ΄νΈ
    sync : λ§μ΄νΈ λλ ν λ¦¬μ μ°κΈ°μ κ°μ μ°μ°μ΄ λ°μν  κ²½μ°  
           κ³΅μ  λλ ν λ¦¬μ λ§μ΄νΈ λλ ν λ¦¬λ₯Ό μ¦μ λκΈ°ν
           λ§μ½, μ¦μ λκΈ°νλ₯Ό μν νμ§ μκ³ μ ν  κ²½μ° async μ΅μμ μ¬μ©


    no_subtree_check
    κ³΅μ  λλ ν λ¦¬λ μλΈλλ ν λ¦¬λ₯Ό κ°μ§ μ μμ
    ν΄λΌμ΄μΈνΈκ° νΉμ  νμΌμ μμ²­νλ©΄ μλ²λ subtree checkingμ΄λΌλ λ£¨ν΄μ μ€νν΄ μλΈλλ ν λ¦¬κΉμ§ νμνμ¬ ν΄λΌμ΄μΈνΈκ° μμ²­ν νμΌμ μμΉλ₯Ό νμΈ
    μ΄ μ΅μμ μ¬μ©νλ©΄ μλΈλλ ν λ¦¬λ₯Ό μ‘°μ¬νλ λ£¨ν΄μ μ€ννμ§ μμ 
    λ§μ½, μλΈ λλ ν λ¦¬κΉμ§ κ²μνκ³ μ ν  κ²½μ° subtree_check μ΅μμ μ¬μ©


    no_root_squash
    μ¬μ©μκ° ν΄λΌμ΄μΈνΈ μμ€νμ rootκ³μ μΌλ‘ μ κ·Όνμ κ²½μ° 
    μλ²μμλ root κΆνμ κ°μ§κ² ν¨
    λ§μ½, μλ²μμ nobody κΆνμΌλ‘ μ§μ νκ³ μ ν  κ²½μ° root_squash μ΅μμ μ§μ 


    wdelay 
    λμ€ν¬ μ°κΈ°μλλ₯Ό μ§μ°μμΌ λ°μ΄ν°κ° λμ€ν¬μ μ μ₯λλ νμλ₯Ό μ€μ¬ μ±λ₯ν₯μ λͺ©μ μΌλ‘ μ¬μ©. λͺ¨λ  μμ²­μ μ§μ°μ λ°μμμΌ μ€νλ €μ±λ₯μ΄ λ¨μ΄μ§ μλ μμ


    no_wdelay
    NFSμμ μ¬μ©νλ λ°μ΄ν°μ ν¬κΈ°κ° μκ±°λ μμ£Όμ¬μ©νλ€λ©΄ κ°λ₯ν λΉ¨λ¦¬ λμ€ν¬μ κΈ°λ‘νλλ‘ νλ μ΅μ
    ```

    <br/>

    NFSD μλΉμ€ μ€ν λ° λ°©νλ²½ μ€μ 

    ```cs
    # μλΉμ€ μ€ν
    [root@centos ~]$  systemctl start nfs-server
    [root@centos ~]$  systemctl enable nfs-server
    Created symlink from /etc/systemd/system/multi-user.target.wants/nfs-server.service to /usr/lib/systemd/system/nfs-server.service.

    # λ°©νλ²½ μ€ν
    [root@centos ~]$  firewall-cmd --permanent --add-service=nfs
    success
    [root@centos ~]$  firewall-cmd --reload
    success
    [root@centos ~]$  
    [root@centos ~]$  firewall-cmd --list-all | grep nfs
    services: dhcpv6-client nfs ssh


    # μΆκ°μ μΌλ‘ Clientμμ μ κ·Ό λλ ν λ¦¬ λͺ©λ‘μ νμΈνλ €λ©΄ μλ κ·μΉλ μΆκ°.
    [root@centos ~]$  firewall-cmd --permanent --add-service=rpc-bind
    success
    [root@centos ~]$  firewall-cmd --permanent --add-service=mountd
    success
    [root@centos ~]$  firewall-cmd --reload
    success
    ```

<br/>

---


## π CLIENT μ€μ 


  μ κ·Ό Mount Point νμΈ
    
  ```css
  [root@user01 named]# showmount -e 192.168.56.101
  Export list for 192.168.56.101:
  /NFS_TEST 192.168.56.*
  ```

<br/>

  Mount ν  λ‘μ»¬ λλ ν λ¦¬ μμ±
  
  ```css
  [root@user01 named]# mkdir /client_nfs
  [root@user01 named]# 
  [root@user01 named]# ls -al /client_nfs/
  ν©κ³ 0
  drwxr-xr-x. 3 root root 15  7μ 17 10:47 .
  drwxr-xr-x. 5 root root 50  7μ 17 10:47 ..
  ```  


<br/>

  MOUNT

  * μλλ§μ΄νΈ
    
  ```css
  μλ λ§μ΄νΈ λͺλ Ήμ΄
  # mount [option] server-address(domain):path mount-point
  -------------------------------------------------------

  [Option] -o λ₯Ό μ¬μ©νμ¬ λ§μ΄νΈ μ΅μμ μ§μ 
  [server-address:path] NFS SERVER μ μ£Όμμ κ³΅μ  λλ ν λ¦¬ κ²½λ‘
  [mount-point] λ‘μ»¬ λ§μ΄νΈ ν¬μΈνΈ
  --------------------------------------------------------
  [root@user01 named]# mount -o rw,sync 192.168.56.101:/NFS_TEST /client_nfs
  [root@user01 named]# 
  [root@user01 named]# df -h | grep 192
  192.168.56.101:/NFS_TEST   17G  4.3G   13G  25% /client_nfs
  [root@user01 named]# 
  [root@user01 named]# ls -alrt /client_nfs/

  ν©κ³ 0
  drwxrwxrwx. 2 root root  6  7μ  8 16:51 A       // λλ ν λ¦¬ λκΈ°ν νμΈ.
  -rw-r--r--. 1 root root  0  7μ  8 17:28 test   // test νμΌ λκΈ°ν νμΈ.
  ```

---
        
## πΉ μλλ§μ΄νΈ : autofs

CD/DVD λ₯Ό λλΌμ΄λΈμ λ£μΌλ©΄ λ§μ΄νΈλ₯Ό νμ§ μμλ  
λ§μ΄νΈλλ λ§μ΄νΈ μμΉλ‘ μ κ·Όνλ©΄ μλ λ§μ΄νΈ λλ κΈ°λ₯μ΄λ€.  
   
<br/>

- automount?  
  
    ```css
    μλ λ§μ΄νΈ λ°λͺ¬(autofs)μ μν΄ μ΄λ νΉμ  νν°μμ΄ νμν κ²½μ°μ  
    μλμΌλ‘ λ§μ΄νΈμ μΈλ§μ΄νΈκ° μ΄λ€μ§λλ‘ νλ λμ  λ§μ΄νΈ λ°©μ
    ```

<br/>

* autofs  

    ```css
    master map μ€μ  νμΌ(/etc/autofs/auto.master)λ₯Ό μ°Έκ³ ν΄  
    μ΄λ―Έ μ μλ λ§μ΄νΈ μ§μ μ μμλ΄κ³  λ§μ΄νΈ μ§μ  μλλ‘ λ§μ΄νΈλλλ‘  
    μ μλ(/etc/autofs/auto.misc νμΌμ μ€μ μ μ½μ΄λ€μ¬  
    νΉμ  νν°μμ νμΌμμ€νμ λ§μ΄νΈμν€κ³ , μΈλ§μ΄νΈμν€κ² ν©λλ€.
    ```
 

* /etc/autofs/auto.master κ΅¬μ‘°

    ```cs
    λ§μ΄νΈ μ§μ   λ§μ΄νΈ ν¬μΈνΈ μ€μ  νμΌ   μ΅μ

    λ§μ΄νΈμ§μ  : λ§μ΄νΈ μμλλ ν λ¦¬ (μ£Όμμ ) λ§μ΄νΈμ§μ  λλ ν λ¦¬ νμμ λλ ν λ¦¬μμ±κΈμ§

    μ) /media  /etc/autofs/auto.misc --timeout=60

    ν΄λΉ λ§΅ νμΌμ μ½μ΄ λ§΅νμΌμ λ³΄λλ‘ 
    /media μλμ μλλ§μ΄νΈ λ―Έμ¬μ©μ 60μ΄ν μλ μΈλ§μ΄νΈ
    ```

<br/>

---

### μλλ§μ΄νΈ μ€μ   

<br/>  

MASTER MAP νμΌ μ€μ 


<br/>

* /etc/auto.master.d/101.autofs

    ```cs   
    [root@user01 auto.master.d]# cat 101.autofs 
    /client_nfs	    /etc/auto.indirect     
               
    // μ§μ λ§΅μ μ¬μ©νκΈ° μν΄ /- μ λκ²½λ‘ μ€μ 
    // μ§μ λ§΅ νμΌμ κ²½λ‘λ₯Ό μ§μ ν¨.
    ```
    

    <br/>

* indirect λ§΅ νμΌ μμ± (/etc/auto.indirect)


    ```cs
    [root@user01 auto.master.d]# cat /etc/auto.indirect 
     *	-rw,sync,sec=sys,no_root_squash		192.168.56.101:/NFS_TEST/&
    ```

    <br/>

* aufofs μλΉμ€ μμ

    ```css
    [root@user01 /]# systemctl start autofs
    [root@user01 /]# systemctl enable autofs
    [root@user01 /]# 
    [root@user01 /]# systemctl status autofs
    β autofs.service - Automounts filesystems on demand
      Loaded: loaded (/usr/lib/systemd/system/autofs.service; enabled; vendor preset: disabled)
      Active: active (running) since κΈ 2020-07-17 10:12:27 KST; 1h 2min ago
      Main PID: 1490 (automount)
    CGroup: /system.slice/autofs.service
      ββ1490 /usr/sbin/automount --systemd-service --dont-check-daemon

    7μ 17 10:12:26 user01 systemd[1]: Starting Automounts filesystems on demand...
    7μ 17 10:12:27 user01 automount[1490]: setautomntent: lookup(sss): setautomntent: No such fi...ory
    7μ 17 10:12:27 user01 systemd[1]: Started Automounts filesystems on demand.
    Hint: Some lines were ellipsized, use -l to show in full.
    ```

    <br/>

* autofs λμ νμΈ
       

    ```cs
    [root@user01 /]# ls -alrt /client_nfs/
    ν©κ³ 4
    dr-xr-xr-x. 22 root root 4096  7μ 17 11:46 ..
    drwxr-xr-x.  2 root root    0  7μ 17 12:04 .
    [root@user01 /]# 
    [root@user01 /]# cd client_nfs/
    [root@user01 client_nfs]# ls -alrt 
    ν©κ³ 4
    dr-xr-xr-x. 22 root root 4096  7μ 17 11:46 ..
    drwxr-xr-x.  2 root root    0  7μ 17 12:04 .
    [root@user01 client_nfs]# cd A
    [root@user01 A]# ls -alrt
    ν©κ³ 0
    drwxr-xr-x. 2 root root 18  7μ  8 18:40 .
    -rw-r--r--. 1 root root  0  7μ  8 18:40 test
    drwxr-xr-x. 3 root root  0  7μ 17 12:05 ..

    λλ ν λ¦¬κ° μμμΌλ, cd λͺλ Ήμ΄λ‘ μ μνμ νμΌμ΄ λκΈ°ν.
    --------------------------------------------------------------

     mount λͺλ Ήμ΄λ‘ λλ ν λ¦¬κ° μλ λ§μ΄νΈ λ¨μ νμΈ.

    [root@user01 A]# mount | grep 192
    192.168.56.101:/NFS_TEST/A on /client_nfs/A type nfs4 (rw,relatime,sync,vers=4.1,rsize=262144,wsize=262144,namlen=255,hard,proto=tcp,timeo=600,retrsec=sys,clientaddr=192.168.56.105,local_lock=none,addr=192.168.56.101)
    ```


```toc
```