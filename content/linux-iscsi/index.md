---
emoji: ๐คฆโโ๏ธ
title: "[LINUX] - ISCSI"
date: "2021-06-23 00:01:25"
author: nasa1515
tags: LINUX
categories: LINUX
---


๋จธ๋ฆฌ๋ง  

ISCSI์ ๊ฒฝ์ฐ ์ค๋ฌด์์ ์จ๋ณธ ๊ธฐ์ต์ ์ ๋์ง ์์ง๋ง  
๊ฐ์ธ์ ์ผ๋ก ์ธํ๋ผ๊ณต๋ถ๋, ๊ฐ์๋จธ์ ์ ๊ตฌ์ถํ์๋ ๋ช๋ฒ ๋ง์ ธ ๋ณธ ์ ์ ์์์ต๋๋ค.  
์ด๋ฒ ํฌ์คํธ๋ฅผ ์ ์ผ๋ฉด์ ์ด๋ก ์ ์ธ ๋ด์ฉ์ ๋ํด ๋ค์ ๋ฐฐ์ ์ต๋๋ค.


----

## โ ISCSI ์ด๋ ?

  iSCSI(Internet Small Computer System Interface)๋ ์ ๋ ดํ ๋น์ฉ์ผ๋ก ๋ฐ์ดํฐ ์ ์ฅ์๋ฅผ ์ฐ๊ฒฐํ๋๋ฐ ์ฌ์ฉ๋๋  
  IP ๊ธฐ๋ฐ์ Storage ๋คํธ์ํน ํ์ค์๋๋ค. ์ฆ, IP ๋คํธ์ ์์์ SCSI ๋ช๋ น์ ์ํํจ์ผ๋ก์จ iSCSI๊ฐ ๋ก์ปฌ ์์ญ ๋คํธ์ํฌ (LAN), ๊ด์ญ ๋คํธ์ (WAN) ๋๋ ์ธํฐ๋ท ์์์ ๋ณด๋ค ์์ฝ๊ฒ ๋ฐ์ดํฐ๋ฅผ ์ ์กํ๋ ๊ฒ์ด ๊ฐ๋ฅํฉ๋๋ค.  
  ๋ฐ๋ผ์ iSCSI๋ฅผ ํตํด ์ ์ฅ์ ์๋ฒ์ Storage๋ Local Disk์ฒ๋ผ ์ฌ์ฉ๋  ์ ์์ต๋๋ค.  
  ๋ฌผ๋ก  ์ค์ ๋ก๋ Local์์ ๋ฑ๋ก๋ Disk๋ Storage ์๋ฒ์ ์กด์ฌํ๊ธฐ์  
  Disk๋ก ์ ์ก๋๋ ๋ชจ๋  ๋ฐ์ดํฐ๋ ๋คํธ์์ ํตํด์ Storage ์๋ฒ๋ก ์ ์ก๋ฉ๋๋ค.  

  ๋ํ ์ด๋ ๊ฒ Local Disk๋ก ๋ฑ๋ก๋ Storage๋ ์๋ก ๋ค๋ฅธ ์๋ฒ์์ Storage๋ฅผ ๊ณต์ ํด์  ์ฌ์ฉ ํ  ์ ์๊ธฐ์ ํ์ฉ๋๊ฐ ๋งค์ฐ ๋์ต๋๋ค.  

<br/>

  ์ฐ์  ISCSI๋ฅผ ๋ณด๊ธฐ ์ ์ ๋ฆฌ๋์ค ์๋ฒ์์  
  ๊ธฐ๋ณธ์ ์ผ๋ก ์ฌ์ฉํ๋ ์คํ ๋ฆฌ์ง๋ฅผ ์์์ผ ํฉ๋๋ค.  


-----
## โ ์คํ ๋ฆฌ์ง


* #### DAS (Direct Attached Storage)  

  - ์คํ ๋ฆฌ์ง์ ํ ์ข๋ฅ๋ก์จ ์๋ฒ์ ์ง์  ์ฐ๊ฒฐ๋๋ ํ๋์จ์ด.  
  - ์๋ฒ์ ํ๋์จ์ด๋ฅผ 1:1๋ก ์ฐ๊ฒฐ.
  - ์๋ฒ์ ์ธ์ฅํ๋๋ผ๊ณ  ์๊ฐํ๋ฉด ์ฝ๊ฒ ์ดํด๋ฉ๋๋ค.  

  ์ฅ์ 

  - ํ์ฅ์ด ์ฉ์ด (๊ณ์ ์ฆ์ค ํ  ์ ์์).  

  ๋จ์ 

  - ๊ณ์ ํ์ฅํ๋ค ๋ณด๋ฉด ์๋ฒํจ์จ ์ ํ

  - ์๋ฒ๊ฐ ๋ค์ด๋๋ ๊ฒฝ์ฐ DAS๋ ์ฌ์ฉํ์ง ๋ชปํ๋ค.


    ![](https://t1.daumcdn.net/cfile/tistory/998F97445E60AB7919)


---

* #### NAS (Network Attacehed Storage)  

  -  ๋คํธ์ํฌ๊ฐ ์ฐ๊ฒฐ๋ DAS. (ํ์ผ ๋จ์)

  - ๋ชจ๋  ์ด์์ฒด์  ์ง์ ๊ฐ๋ฅ.  

  ์ฅ์ 

  - ๋ง์ ์ดํ๋ฆฌ์ผ์ด์ ์ฌ์ฉ ๊ฐ๋ฅ.

  - ๋ค์ค ํธ์คํธ ํ์ผ์์คํ ์ก์ธ์ค ์ ๊ณต.

  - ์ ์ง๋ณด์ ์ฌ์.

  - ๋น์ฉ์ด ์๋์ ์ผ๋ก ์ ๋ ด.  

  ๋จ์  

  - ๋ฐฑ์์ด ์ด๋ ค์.

  - ์ด๋ฏธ์ง ๋ ๋ฒจ์ ๋ฐฑ์ ๋ถ๊ฐ (ํ์ผ๋จ์๋ก ๋ฐฑ์).

  - SAN๋ณด๋ค ์ํ์ ์ด ๋ฎ๋ค.  

      ![](https://t1.daumcdn.net/cfile/tistory/99CE524F5E60AB7A0A)

---


* #### SAN (Storage Area Network)  

  - ๋ธ๋ก ์์ค(NAS๋ ํ์ผ๋จ์) ์คํ ๋ฆฌ์ง์ ์ ์ํ  ์ ์๋๋ก ์ง์ํ๋  
    ํน์  ์์คํ ์ ์ฉ์ ๊ณ ์ ๋คํธ์ํฌ.

  - ์คํ ๋ฆฌ์ง ํธ๋ํฝ์ LAN๊ณผ ๋ถ๋ฆฌํด์ ๋ฐ๋ก ๋คํธ์ํฌ๋ฅผ ๊ตฌ์ฑ.
 
  - ๋ฐ๋ผ์ LAN๊ณผ๋ ๊ตฌ๋ณ๋๋ฏ๋ก SAN์ ํ์ฉํ ์ฑ์ ๊ฐ์ฉ์ฑ๊ณผ ์ฑ๋ฅ์ด ํฅ์.

  - NAS์๋ ๋ค๋ฅด๊ฒ ํ์ด๋ฒ ์ฑ๋ ์ฐ๊ฒฐ์ ์ด์ฉ (NAS๋ ํ์ค ์ด๋๋ท ์ฐ๊ฒฐ).

  ์ฅ์ 

  - ๋ก์ฐ ๋๋ฐ์ด์ค ์ฒ๋ฆฌ ๊ฐ๋ฅ.

  - NAS๋ณด๋ค ์ฑ๋ฅ์ด ๋น ๋ฆ

  - ๋๊ท๋ชจ ๋ฐฑ์๊ณผ ๋ณต๊ตฌ ์ฌ์.

  - ๋ฐ์ดํฐ๋ฒ ์ด์ค ์ด์คํ ์ ์ฌ์ฉ.

  ๋จ์ 

  - ๊ฐ๊ฒฉ์ด ๋น์.

  - ๊ด๋ฆฌ ๋ฐ ์ ์ง๋ณด์๊ฐ ๋ณต์ก.


    ![](https://t1.daumcdn.net/cfile/tistory/990D75335E60AB7A20)

<br/>

* ### DAS VS NAS VS SAN

   ![์คํฌ๋ฆฐ์ท, 2020-07-20 14-50-47](https://user-images.githubusercontent.com/64260883/87904066-77aeb700-ca98-11ea-85c5-5a196a0f2541.png)



   ---



## ๐ iSCSI ์ด๋ก   

  *  ISCSI๋ ์๋ฒ ์ญํ ์ iSCSI Target๊ณผ, ํด๋ผ์ด์ธํธ ์ญํ ์ iSCSI Initiator๋ก ๊ตฌ๋ถ๋ฉ๋๋ค.
  
      ![](https://t1.daumcdn.net/cfile/tistory/9928ED33598CEBA63A)


<br/>

### 1. LIO (Linux I/O)  

- LIO๋ iSCSI Target ๊ด๋ฆฌ ๋ฐ๋ชฌ์๋๋ค.
- ์ฌ์ฉ์ (๊ด๋ฆฌ์)๋ 'targetcli'๋ฅผ ํตํด LIO๋ฅผ ์ค์ ํ  ์ ์์ต๋๋ค.


    ![](https://t1.daumcdn.net/cfile/tistory/99B6BC33598CF0860C)

<br/>

### 2. Backstores  

- FILEIO - Target์ ๋์คํฌ ์ด๋ฏธ์ง ํ์ผ์ ์์ฑ.  
            Initiator๋ ํด๋น ํ์ผ์ ๋์คํฌ ์ฒ๋ผ ์ฌ์ฉ.


* BLOCK - ๋ฌผ๋ฆฌ/๋ผ๋ฆฌ ๋ณผ๋ฅจ ์์ฒด๋ฅผ ๊ณต์ .  
  Initiator ์์ฅ์์๋ FILEIO์ IBLOCK์ด ๋์ผ.

<br/>

### 3. IQN (iSCSI Qaulified Name)  

- iSCSI Target๊ณผ Initiator ๊ฐ๊ฐ์ ๊ณ ์  ์ด๋ฆ ํฌ๋งท ์ค ํ๋, ์ด๋ฆ ํฌ๋งท์๋ IQN ์ด์ธ์  

  EUI : Extended Unique Identifier  
  NAA : Network Address Authority ๋ฑ์ด ์์  

<br/>

- ํฌ๋งท ํํ

  [Type.Date.Naming_Auth:String_defined_by_example.com_Naming_authority]


  - Type : 'iqn' ์ผ๋ก ๊ณ ์ 


   - Date : 'YYYY-MM' ์ ํํ


   - Naming_Auth : ๋๋ฉ์ธ์ ์ญ์ ํํ (ex - org.kernel)


   - String_defined_by_example.com_Naming_authority (์ต์) : ์ค๋ช ๋ฑ)


  *  Type ๊ณผ Date, Date์ Naming_Auth๋ '.' ์ผ๋ก ์ฐ๊ฒฐ  
    Naming_Auth์ ์ค๋ช์ ์ฝ๋ก  (':')์ผ๋ก ์ฐ๊ฒฐ  
  

          iqn.YYYY-MM.Naming_Auth:String_defined_by_example.com_Naming_authority

          ```cs
          ex 1) iqn.2017-08.com.example:storage.raid

          ex 2) iqn.2017-08.com.example
          ```
----

## ๐ ISCSI ์๋ฒ ๊ตฌ์ถ 

*  Linux์์์ iSCSI Target

    ์ ๊ณตํ๋ Storage entity๋ฅผ ``target``์ด๋ผ ํ๊ณ  ์ด๋ ๊ฒ ์ ๊ณต๋ entity๋ฅผ ๊ฐ์ ธ๋ค๊ฐ ์ฌ์ฉํ๋ ๊ฒ์ ``initiator``๋ผ๊ณ  ์ ์ํ๋ค.  
    ์ฆ, target์ iSCSI์ ์๋ฒ๊ฐ ๋๋ฉฐ, ๊ณต์ ๋ ์ ์ฅ ๊ณต๊ฐ์ด ์กด์ฌํ๋ ๊ณณ์ด๋ค. ๊ทธ๋ฆฌ๊ณ  ์ ๊ณต๋๋ Storage๋ฅผ ๊ฐ์ ธ๋ค๊ฐ ์ฌ์ฉํ๊ธฐ ์ํด์  
    Server์ ์ ๊ทผํ๋ ๊ฒ์ Initiator๋ผ๊ณ  ํ๋ฉฐ iSCSI์ Client๋ผ๊ณ  ํ๋ค.  

    
<br/>

*    iSCSI Target๊ณผ LUN  

      SCSI ์ฉ์ด์์ LUN์ ๋ผ๋ฆฌ ๋จ์ ์ฅ์น ๋ฒํธ (Logical Unit Number)๋ผ๊ณ  ํ๋ค.  
      ์ด LUN์ ๋ฌผ๋ฆฌ์  SCSI ์ฅ์น("Target"๋ฅผ ์๋ฏธํจ)์ ์ผ๋ถ์ธ ๊ฐ๋ณ์ ์ผ๋ก ์ฃผ์ ์ง์ ์ด ๊ฐ๋ฅํ (๋ผ๋ฆฌ์ ) SCSI ์ฅ์น๋ฅผ ๋ํ๋ธ๋ค.   
      iSCSI ํ๊ฒฝ์์๋ ๊ฐ์ํ ๋ฐฉ์์ผ๋ก SCSI Disk๋ก์ ์ฐ๊ฒฐ์ด ๊ตฌํ๋๋ค. iSCSI Target์ ์ฐ๊ฒฐ ์ธํฐํ์ด์ค์ ์ ์ฌํ๋ฉฐ  
      LUN์ ๋ณธ์ง์ ์ผ๋ก ๋ฒํธ๊ฐ ๋งค๊ฒจ์ง Disk Drive์ ํด๋นํ๋ค๊ณ  ๋ณผ ์ ์๋ค. Client์ธ iSCSI Initiator์ ์ํด iSCSI Target์ด ์ฐ๊ฒฐ๋๋ฉด ํด๋น iSCSI Target์ ๋งคํ๋ ๋ชจ๋  LUN์ด Client์ ์ด์ ์ฒด์ ์ ๊ฐ์์ผ๋ก ์ฐ๊ฒฐ๋๋ค.  
      ๋ฐ๋ผ์ Initiator๊ฐ ๋ง์น ์์ ์ Local์ ์กด์ฌํ๋ SCSI ๋๋ IDE Disk์ฒ๋ผ iSCSI LUN์์ ํ์ผ ์์คํ์ ์ค์ ,๊ด๋ฆฌํ  ์ ์๋ค.


<br/>

### ๊ธฐ๋ณธ ์ฉ์ด ์์ฝ  

  * Target : SERVER , ์คํ ๋ฆฌ์ง ์ฅ์น๋ฅผ ์ ๊ณตํ๋ ์์คํ
  * Initiator : CLIENT, ์คํ ๋ฆฌ์ง ์ฅ์น๋ฅผ ์ ๊ณต๋ฐ๋ ์์คํ
  * IQN : Target๊ณผ Initiator์ ์ด๋ฆ

<br/>

  ### Target์ ์ฉ์ด
    
  * TPG : Target Portal Gourp : ACL,RUN,Potal ํญ๋ชฉ์ ๊ทธ๋ฃน์ผ๋ก ๋ง๋ฆ
  * ACL : ์คํ ๋ฆฌ์ง์ ์ ๊ทผ ๊ฐ๋ฅํ ์ด๊ธฐ์ ์ง์ 
  * LUN : ์ ๊ณต ํ  ์คํ ๋ฆฌ์ง ์ฅ์น์ ๋ถ์ฌ๋ ๋ผ๋ฆฌ ์ฅ์น ๋ฒํธ
  * PORTAL : Client๊ฐ Server์ ์ฐ๊ฒฐํ  ๋ ์ฌ์ฉํ๋ IP์ฃผ์์ ํฌํธ  

<br/>

  ### Initiator ์ฉ์ด

  * DISCOVERY : Client ์์ ์ฐ๊ฒฐํ๋ ค๋ ๋์์ ๊ฒ์ํ๊ธฐ ์ํ ๋จ๊ณ
  * LOGIN : Discovery ์์ ๋ฐ๊ฒฌํ ๋์์ผ๋ก ์ฐ๊ฒฐํ๋ ๋จ๊ณ

<br/>

----

## ๐ CentOS์ iSCSI Target ์ค์น ๋ฐ ํ๊ฒฝ ์ค์   

  * ์ฐ๊ฒฐ ํ  Divice๋ LVM์ผ๋ก ๊ตฌ์ฑํด 20G์ ์ฉ๋์ ํ ๋นํ์๋ค.

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

* ### TGT ํจํค์ง ์ค์น  :  targetcli ํจํค์ง๋ฅผ ์ค์นํ๋ค.

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

  * ### TGT ์๋น์ค ์คํ  

    ```cs
    [root@centos won]$  systemctl start target
    [root@centos won]$  systemctl enable target
    Created symlink from /etc/systemd/system/multi-user.target.wants/target.service to /usr/lib/systemd/system/target.service.
    ```

<br/>

* ### targetcli ์ค์ 

    ```cs
    [root@centos won]$  targetcli
    Warning: Could not load preferences file /root/.targetcli/prefs.bin.
    targetcli shell version 2.1.fb49
    Copyright 2011-2013 by Datera, Inc and others.
    For help on commands, type 'help'.

    /> ls            ///// ์์์ ํ์ธ.
    o- / .......................................................................................... [...]
      o- backstores ............................................................................... [...]
      | o- block ................................................................... [Storage Objects: 0]
      | o- fileio .................................................................. [Storage Objects: 0]
      | o- pscsi ................................................................... [Storage Objects: 0]
      | o- ramdisk ................................................................. [Storage Objects: 0]
      o- iscsi ............................................................................. [Targets: 0]
      o- loopback .......................................................................... [Targets: 0]
    /> 



    block : ์๋ฒ์ ์ ์๋ ๋ธ๋ก ๋๋ฐ์ด์ค ํญ๋ชฉ.
    fileio : ํ์ฌ ์์คํ์์ ์ฌ์ฉ์ค์ธ ํ์ผ์์คํ์ ์ผ๋ถ ๊ณต๊ฐ์ ์ ๊ณต
    pscsi : ๋ชจ๋  ์ ํ์ ๋ก์ปฌ SCSI์ฅ์น๋ฅผ ๊ณต์  ํ  ์ ์๊ฒ ์ค์ 
    ramdisk : ์์คํ ๋ฉ๋ชจ๋ฆฌ์ ๋จ๋์คํฌ ์ฅ์น๋ฅผ ๋ง๋ค์ด ์ ์ฅ / ์ฌ๋ถํ ์ ์ฌ๋ผ์ง
  ```

  <br/>

* ### backstore ์์ฑ // ๋๋ฐ์ด์ค ์์ฒด๋ฅผ ๊ณต์  ํ  ๊ฒ  
 
 
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

* ### ISCSI ์ฐ๊ฒฐ (IQN ์ฃผ์ ์ค์ )
  
  ```cs
    /> /iscsi create wwn=iqn.2020-07.192.168.56.101:server  // ๋๋ฉ์ธ์ผ๋ก๋ ์ค์  ๊ฐ๋ฅ
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

* ### ISCSI ์ฐ๊ฒฐ (ACL ์ค์ )
  
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

* ### ISCSI ์ฐ๊ฒฐ (LUN ์ค์ )
  
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

 * ### ISCSI ์ฐ๊ฒฐ (PORTAR ์ค์ )

    ```cs
    /> /iscsi/iqn.2020-07.192.168.56.101:server/tpg1/portals delete ip_address=0.0.0.0 ip_port=3260
    Deleted network portal 0.0.0.0:3260    // ๊ธฐ๋ณธ์ผ๋ก ์ค์ ๋์ด์๋ target ์ญ์ 
    /> 
    /> /iscsi/iqn.2020-07.192.168.56.101:server/tpg1/portals create 192.168.56.101
    Using default IP port 3260
    Created network portal 192.168.56.101:3260.    // ์๋ก์ด target ์ถ๊ฐ
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

 * ### ๋ฐฉํ๋ฒฝ ์ค์ 

    ```cs
    [root@centos won]$  firewall-cmd --add-port=3260/tcp --permanent 
    success
    [root@centos won]$  firewall-cmd --reload
    success
    ```


<br/>

----


## ๐ฑโ๐ CentOS์ iSCSI Initiator ์ค์น ๋ฐ ํ๊ฒฝ ์ค์  


* ### Initiator ํจํค์ง ์ค์น  :  Initiator ํจํค์ง๋ฅผ ์ค์นํ๋ค.

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

* ### IQN ์ค์ 

    ```cs
    [root@user01 samba]# vim /etc/iscsi/initiatorname.iscsi 
    [root@user01 samba]# cat /etc/iscsi/initiatorname.iscsi 
    InitiatorName=iqn.2020-07.192.168.56.105:client
    ```

<br/>


* ### ์๋น์ค ํ์ฑํ

    ```cs
    [root@user01 samba]# systemctl start iscsi
    [root@user01 samba]# systemctl enable iscsi
    ```

<br/>


* ### TARGET ์ฐ๊ฒฐ

  ```cs
  [root@user01 iscsi]# iscsiadm -m discovery -t st -p 192.168.56.101
  192.168.56.101:3260,1 iqn.2020-07.192.168.56.101:server



  -m : ๋์๋ชจ๋๋ฅผ ์ง์  ํ๊ฒ ๊ฒ์์ ์ํด discovery ์ค์ 
  -t : sendtarget์ ์ฝ์๋ก ๋์ iqn ์ด๋ฆ์ ํ์ธํ๊ธฐ ์ํด st๋ก ์ง์ 

  ```


<br/>

* ### LOGIN

  ```cs
  [root@user01 iscsi]# iscsiadm -m node -T iqn.2020-07.192.168.56.101:server -l
  Logging in to [iface: default, target: iqn.2020-07.192.168.56.101:server, portal: 192.168.56.101,3260] (multiple)
  Login to [iface: default, target: iqn.2020-07.192.168.56.101:server, portal: 192.168.56.101,3260] successful.

  -m : ๋์๋ชจ๋๋ฅผ node ๋ก ์ง์ ํ๋ฉด ์ฐ๊ฒฐ์ ์๋
  -l : ๋ก๊ทธ์ธ์ ์ํ ์ต์
  ```


  <br/>


* ### Session ํ์ธ

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
          Attached scsi disk sdb		State: running   -- sdb๋ก ๋ฐ์์๋ค๋ ๋ก๊ทธ




  -m : session ์ ์ ๊ณต๋ฐ๋ ์ฅ์น์ ๋ํ ์ ๋ณด๋ฅผ ํ์ธ ํ  ์ ์๋ค.
  -P : ์ธ์ ํ์ธ ์ ์ง์ ํ๋ ๋ฑ๊ธ์ผ๋ก 0~3 ๊น์ง์ ์ง์  ๊ฐ๋ฅ 3์ผ๋ก ์ง์ ์ ์ฅ์น ์ด๋ฆ ํ์ธ ๊ฐ๋ฅ

  ```


<br/>


* ### ์ฅ์น ํ์ธ ๋ฐ ์ฌ์ฉ

  ```cs
    [root@user01 iscsi]# fdisk -l /dev/sdb


    ํํฐ์๋ ์  ์ฅ์น ํ์ธ
    Disk /dev/sdb: 21.5 GB, 21474836480 bytes, 41943040 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 33550336 bytes

    --------------------------------------
    ํํฐ์๋ ํ ์ฅ์น ํ์ธ

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
    ํ์ผ ์์คํ ์์ฑ ๋ฐ ๋ง์ดํธ ํ์ธ.

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

* ### fstab ๋ฑ๋ก ์ฌ์ฉ  
  ISCSI๋ฅผ ์ฌ์ฉํด ์ ๊ณต๋ฐ๋ ์ฅ์น๋ฅผ fstab์ ๋ฑ๋กํ ๋  
  ``_netdev``๋ฅผ ์ง์ ํด์ค์ผ ์ ์ ๋ถํ ๊ฐ๋ฅ.

  ```cs
    [root@user01 iscsi]# cat /etc/fstab  | grep sdb1
    /dev/sdb1 /mnt/iscsi                       xfs     _netdev        0 0


    ----------------------------------
    fstab ์ ์ ๋ฑ๋ก ํ์ธ.

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