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

## DataFactory 생성.

[공식DOCS](https://docs.microsoft.com/ko-kr/azure/data-factory/quickstart-create-data-factory-portal)

<br/>

DataFactory를 동일 RG등의 개인설정에 맞춰서 생성합니다.

![image](https://user-images.githubusercontent.com/69498804/135404274-8671e65e-26c3-4ffa-b589-9ab418aba4a9.png)




---

## Oracle DB 구축 (Azure VM)

* Oracle DB 구축방법의 경우 [공식 DOCS](https://docs.microsoft.com/ko-kr/azure/virtual-machines/workloads/oracle/oracle-database-quick-create)를 보시고 설치하시면 됩니다.


<br/>

Azrue VM 생성 (Azure에서 제공해주는 Oracle DB Image를 사용합니다.

```cs
az vm create \
    --resource-group nasatest \
    --name nasa-oracle \
    --image Oracle:oracle-database-19-3:oracle-database-19-0904:latest \
    --size Standard_DS2_v2 \
    --admin-username nasa1515 \
    --admin-password @dldnjstjr123 \
    --public-ip-address-allocation static \
    --public-ip-address-dns-name nasa-dns
```

<br/>

Oracle Data FILE용 디스크 생성

```cs
az vm disk attach --name disk01 --new --resource-group nasatest --size-gb 64 --sku StandardSSD_LRS --vm-name nasa-oracle
```

<br/>


연결을 위한 Port 방화벽 수정

```cs
az network nsg rule create \
    --resource-group nasatest \
    --nsg-name nasa-oracleNSG \
    --name nasa-oracle \
    --protocol tcp \
    --priority 1001 \
    --destination-port-range 1521
```


<br/>

이제 기본적인 설정은 완료되었으니 VM에 접속 한 뒤 몇가지 사항을 확인합니다.

```cs
# sudo su -
# ls -alt /dev/sd*|head -1
[root@nasa-oracle ~]# ls -alt /dev/sd*|head -1
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
```


<br/>

VM 내의 방화벽 Port를 열어줍니다.

```cs
# firewall-cmd --zone=public --add-port=1521/tcp --permanent
# firewall-cmd --zone=public --add-port=5502/tcp --permanent
# firewall-cmd --reload
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


DB 생성도우미로 Database 생성.

```cs
dbca -silent \
   -createDatabase \
   -templateName General_Purpose.dbc \
   -gdbname nasatest \
   -sid nasatest \
   -responseFile NO_VALUE \
   -characterSet AL32UTF8 \
   -sysPassword @dldnjstjr123 \
   -systemPassword @dldnjstjr123 \
   -createAsContainerDatabase false \
   -databaseType MULTIPURPOSE \
   -automaticMemoryManagement false \
   -storageType FS \
   -datafileDestination "/u02/oradata/" \
   -ignorePreReqs



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


<br/>

오라클 환경 변수 설정

```CS
# ORACLE_SID=nasatest; export ORACLE_SID
# echo "export ORACLE_SID=nasatest" >> ~/.bashrc
```

<br/>

Oracle db init 등록

```cs
# sed -i 's/:N/:Y/' /etc/oratab
```

<br/>

/etc/init.d/dbora 파일 생성 후 아래 내용 추가

```cs
#!/bin/sh
# chkconfig: 345 99 10
# Description: Oracle auto start-stop script.
#
# Set ORA_HOME to be equivalent to $ORACLE_HOME.
ORA_HOME=/u01/app/oracle/product/19.0.0/dbhome_1
ORA_OWNER=oracle

case "$1" in
'start')
    # Start the Oracle databases:
    # The following command assumes that the Oracle sign-in
    # will not prompt the user for any values.
    # Remove "&" if you don't want startup as a background process.
    su - $ORA_OWNER -c "$ORA_HOME/bin/dbstart $ORA_HOME" &
    touch /var/lock/subsys/dbora
    ;;

'stop')
    # Stop the Oracle databases:
    # The following command assumes that the Oracle sign-in
    # will not prompt the user for any values.
    su - $ORA_OWNER -c "$ORA_HOME/bin/dbshut $ORA_HOME" &
    rm -f /var/lock/subsys/dbora
    ;;
esac
```

<br/>

권한 변경 및 Link 생성

```cs
# chgrp dba /etc/init.d/dbora
# chmod 750 /etc/init.d/dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc0.d/K01dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc3.d/S99dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc5.d/S99dbora
```


Oracle Develop 연결을 위한 DB User 생성. (DataFactory에서는 sys user로 바로 연결이 되지 않습니다.)

```cs
# sqlplus sys as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on Thu Sep 30 05:44:51 2021
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.

Enter password:

Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SQL> CREATE USER tester1 IDENTIFIED BY qwer1234;
User created.

SQL> grant all privileges to tester1;
Grant succeeded.

SQL> exit
```

<br/>

생성한 DB USER로 접속해 Test 데이터 생성

```cs
# sqlplus tester1

SQL*Plus: Release 19.0.0.0.0 - Production on Thu Sep 30 05:42:44 2021
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.

Enter password:

Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SQL> CREATE TABLE test ( seq NUMBER(4)  NOT NULL );
Table created.

SQL> insert into test values (1) ;
1 row created.

SQL> insert into test values (2) ;
1 row created.

SQL> insert into test values (3) ;
1 row created.

SQL> select * from test;

       SEQ
----------
         1
         2
         3
```

<br/>



---

```toc
```
