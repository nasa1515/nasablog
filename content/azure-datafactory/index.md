---
emoji: 🤦‍♂️
title: "[작성중] .........[DATA, AZURE] Azure DataFactory로 Oracle Data 수집하기"
date: "2021-09-05 00:34:25"
author: nasa1515
tags: AZURE DATA
categories: AZURE DATA
---

  

머리말  
  

요 근래 블로그 Rebuild, 업무 등등등...너무 바쁜 하루였습니다. (🤦‍♂️ 아직도 바쁘긴 하지만;;)   
그래도 주말, 퇴근 이후에 기술공부 하는 시간 중에 쪼끔이나마 짬을내 블로그 업데이트를 하려고 노력중입니다!!  
이번 포스트에서는 Azure의 DataFactory의 이론적인 내용과 실제 Oracle DB의 데이터를 수집하는 내용입니다.

 
---


## ✔ Azure DataFactory?

이론내용




---

## Oracle DB 구축 (Azure VM)

* Oracle DB 구축방법의 경우 [공식 DOCS](https://docs.microsoft.com/ko-kr/azure/virtual-machines/workloads/oracle/oracle-database-quick-create)를 보시고 설치하시면 됩니다.


<br/>

Azrue VM 생성 (Azure에서 제공해주는 Oracle DB Image를 사용합니다.

```cs
az vm create \
    --resource-group DPRG \
    --name nasa-oracle \
    --image Oracle:oracle-database-Ee:12.1.0.2:latest \
    --size Standard_DS2_v2 \
    --admin-username nasa1515 \
    --admin-password @dldnjstjr123
```

<br/>

Oracle Data FILE용 디스크 생성

```cs
az vm disk attach --name oradata01 --new --resource-group DPRG --size-gb 64 --sku StandardSSD_LRS --vm-name nasa-oracle
```

<br/>


연결을 위한 Port 방화벽 수정

```cs
az network nsg rule create \
    --resource-group DPRG \
    --nsg-name nasa-oracleNSG \
    --name nasa-oracle \
    --protocol tcp \
    --priority 1001 \
    --destination-port-range 1521
```

<br/>

저는 Oracle EM Express도 사용하기 때문에 해당 방화벽도 수정해줍니다.

```cs
az network nsg rule create \
    --resource-group DPRG \
    --nsg-name nasa-oracleNSG \
    --name nasa-oracle \
    --protocol tcp \
    --priority 1002 \
    --destination-port-range 5502
```


<br/>

이제 기본적인 설정은 완료되었으니 VM에 접속 한 뒤 몇가지 사항을 확인합니다.

```cs
# sudo su -
# ls -alt /dev/sd*|head -1
# [root@nasa-oracle ~]# ls -alt /dev/sd*|head -1
brw-rw----. 1 root disk 8, 32 Sep 29 07:31 /dev/sdc
```

<br/>


추가한 Disk를 합치기 위해 디스크 설정 작업을 진행합니다.

```cs
# parted /dev/sdc mklabel gpt
# parted -a optimal /dev/sdc mkpart primary 0GB 64GB   
# parted /dev/sdc print

Model: Msft Virtual Disk (scsi)
Disk /dev/sdc: 68.7GB
Sector size (logical/physical): 512B/4096B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name     Flags
 1      1049kB  64.0GB  64.0GB               primary


# mkfs -t ext4 /dev/sdc1
# mkdir /u02
# mount /dev/sdc1 /u02
# chmod 777 /u02
```


<br/>

fstab 및 hosts 파일 수정해줍니다

```cs
# echo "/dev/sdc1               /u02                    ext4    defaults        0 0" >> /etc/fstab
# echo "<Public IP> <VMname>.eastus.cloudapp.azure.com <VMname>" >> /etc/hosts
# sed -i 's/$/\.eastus\.cloudapp\.azure\.com &/' /etc/hostname
# sed -i 's/$/\.Korea Central\.cloudapp\.azure\.com &/' /etc/hostname
```


<br/>

VM 내의 방화벽 Port를 열어줍니다.

```cs
firewall-cmd --zone=public --add-port=1521/tcp --permanent
firewall-cmd --zone=public --add-port=5502/tcp --permanent
firewall-cmd --reload
```

<br/>

Database 만들기

```cs
# sudo su - oracle
# lsnrctl start
LSNRCTL for Linux: Version 19.0.0.0.0 - Production on 20-OCT-2020 01:58:18

Copyright (c) 1991, 2019, Oracle.  All rights reserved.

Starting /u01/app/oracle/product/19.0.0/dbhome_1/bin/tnslsnr: please wait...

TNSLSNR for Linux: Version 19.0.0.0.0 - Production
Log messages written to /u01/app/oracle/diag/tnslsnr/vmoracle19c/listener/alert/log.xml
Listening on: (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=vmoracle19c.eastus.cloudapp.azure.com)(PORT=1521)))

Connecting to (ADDRESS=(PROTOCOL=tcp)(HOST=)(PORT=1521))
STATUS of the LISTENER
------------------------
Alias                     LISTENER
Version                   TNSLSNR for Linux: Version 19.0.0.0.0 - Production
Start Date                20-OCT-2020 01:58:18
Uptime                    0 days 0 hr. 0 min. 0 sec
Trace Level               off
Security                  ON: Local OS Authentication
SNMP                      OFF
Listener Log File         /u01/app/oracle/diag/tnslsnr/vmoracle19c/listener/alert/log.xml
Listening Endpoints Summary...
  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=vmoracle19c.eastus.cloudapp.azure.com)(PORT=1521)))
The listener supports no services
The command completed successfully

# mkdir /u02/oradata

```

<br/>


DB 생성도우미 실행

```cs
dbca -silent \
   -createDatabase \
   -templateName General_Purpose.dbc \
   -gdbname cdb1 \
   -sid cdb1 \
   -responseFile NO_VALUE \
   -characterSet AL32UTF8 \
   -sysPassword Dldnjstjr123 \
   -systemPassword Dldnjstjr123 \
   -createAsContainerDatabase true \
   -numberOfPDBs 1 \
   -pdbAdminPassword Dldnjstjr123 \
   -databaseType MULTIPURPOSE \
   -automaticMemoryManagement false \
   -storageType FS \
   -datafileDestination "/u01/app/oracle/oradata"



dbca -ignorePrereqFailure -silent -createDatabase -templateName General_Purpose.dbc -gdbName ORCL -nodeinfo node1,node2 -characterset AL32UTF8

Prepare for db operation
10% complete
Copying database files
40% complete
Creating and starting Oracle instance
42% complete
46% complete
50% complete
54% complete
60% complete
Completing Database Creation
66% complete
69% complete
70% complete
Executing Post Configuration Actions
100% complete
Database creation complete. For details check the logfiles at:
 /u01/app/oracle/cfgtoollogs/dbca/oratest1.
Database Information:
Global Database Name:oratest1
System Identifier(SID):oratest1
Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/oratest1/oratest1.log" for further details.
[oracle@nasa-oracle ~]$
```

오라클 환경 변수 설정

```CS
# ORACLE_SID=oratest1; export ORACLE_SID
# echo "export ORACLE_SID=oratest1" >> ~/.bashrc
```


Oracle EM Express 연결 

```
# sqlplus sys as sysdba
# exec DBMS_XDB_CONFIG.SETHTTPSPORT(5502);


<br/>

---


## DataFactory 생성

DataFactory 생성 부분은 [다음링크]()를 참고해서 생성하시면 됩니다!.

* 저는 아래와 같이 Private link 전용 DataFactory를 하나 생성했습니다.

    ![image](https://user-images.githubusercontent.com/69498804/135217439-ee31ed66-0ed8-4892-8b5b-048663f4674d.png)



---

```toc
```
