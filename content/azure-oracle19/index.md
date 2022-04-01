---
emoji: 🤦‍♂️
title: "[AZURE] Oracle 19c 설치, LogMiner, CDC 설정하기 From Azure VM"
date: "2022-04-01 00:34:25"
author: nasa1515
tags: AZURE
categories: AZURE
---



머리말  
  

안녕하세요 NASA1515입니다. 굉장히 오랜만에 글을 씁니다. (회사 일, 개인사정 등등 바쁜일이 참 많았습니다..)  
아무튼...2022년 4월부터 그래도 주당 하나의 포스트는 작성해보자의 마인드로 블로그를 운영해보려고 합니다.  
사실 추가 글을 작성하지 않아도, adsence 수익을 쌓이니깐 나태해진 이유가 크긴합니다..   


 
---

<br/>

## ✔ ORACLE Install

서론 없이 바로 Oracle을 설치해보도록 하죠   
Oracle은 기본 Linux에 깔게되면 파라메터 등등 귀찮아 지는 작업들이 많기 때문데  
Azure에서 제공해주는 DataBase Image를 사용하도록 하겠습니다.  

```js
az vm create \
    --resource-group nasatest \
    --name oracle19c-wonseok-01 \
    --image Oracle:oracle-database-19-3:oracle-database-19-0904:latest \
    --size Standard_DS2_v2 \
    --admin-username nasa1515 \
    --admin-password @dldnjstjr123 \
    --public-ip-address-allocation static \
    --public-ip-address-dns-name nasa-dns
```

<br/>
<br/>

Disk 증설! 

Azure VM의 Spec을 낮춰서 작업중이기 때문에(비용...) Oracle Data File용 디스크를 하나 증설해주겠습니다.  

```js
az vm disk attach --name disk01 --new --resource-group nasatest --size-gb 64 --sku StandardSSD_LRS --vm-name nasa-oracle
```


<br/>
<br/>

외부 연결을 위한 Virtual Machine Firewall 추가.


```js
az network nsg rule create \
    --resource-group nasatest \
    --nsg-name nasa-oracleNSG \
    --name nasa-oracle \
    --protocol tcp \
    --priority 1001 \
    --destination-port-range 1521
```
<br/>
<br/>


이제 VM에 접속해서 증설한 Disk Partition을 나눠줍시다.

```js
# parted /dev/sdc 
# mklabel gpt
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
<br/>



fstab에 Mount Point 등록 및 hosts 파일을 수정해줍니다.

```js
# echo "/dev/sdb1               /u02                    ext4    defaults        0 0" >> /etc/fstab
# echo "<Public IP> <VMname>.eastus.cloudapp.azure.com <VMname>" >> /etc/hosts
```


<br/>
<br/>

마지막으로 VM 내부의 Firewall Port를 설정해줍니다.

```js
# firewall-cmd --zone=public --add-port=1521/tcp --permanent
# firewall-cmd --zone=public --add-port=5502/tcp --permanent
# firewall-cmd --reload
```

---


<br/>

## ✌ DataBase 생성


원래는 Oracle을 기본 Linux에 설치하려면 아래와 같은 프로세스를 거쳐야 하는게 정석입니다.  
![image](https://user-images.githubusercontent.com/69498804/161206125-21c2cccd-bf7d-435c-8b1a-895d348b8f12.png)
그러나 Azure에서는 DataBase 이미지에서 이미 /u01/ 경로에 엔진과 리스너가 생성 및 설치 진행된 상태로 제공을 해줍니다!

<br/>
그래서 Oracle User의 환경변수 파일으 살펴보면 아래와 같이 이미 엔진과 리스너의 경로가 설정되어있습니다!

![image](https://user-images.githubusercontent.com/69498804/161206420-448edba4-787e-471c-96d7-09f026430edf.png)

<br/>
<br/>

자 이제 Oracle Database를 생성하기 위해서 USER를 변경하고 아래 Command를 입력합니다.

```js
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
<br/>

위에서 말한 것처럼 저희는 이제 DBCA로 DataBase만 생성해주면 간편하게 사용할 수 있습니다. (20분 정도 소요됩니다)

```js
dbca -silent \
   -createDatabase \
   -templateName General_Purpose.dbc \
   -gdbname wonseokdb \
   -sid wonseokdb \
   -responseFile NO_VALUE \
   -characterSet AL32UTF8 \
   -sysPassword @qlalfqjsgh123 \
   -systemPassword @qlalfqjsgh123 \
   -createAsContainerDatabase false \
   -databaseType MULTIPURPOSE \
   -automaticMemoryManagement false \
   -storageType FS \
   -datafileDestination "/u02/oradata/" \
   -ignorePreReqs
```

<br/>
<br/>

자 데이터베이스가 생성이 완료되었으면 오라클 환경변수를 설정해줍니다.

```js
# ORACLE_SID=wonseokdb; export ORACLE_SID
# echo "export ORACLE_SID=wonseokdb" >> ~/.bashrc
```

<br/>
<br/>

Oracle DataBase Init Script 등록

```js
# sed -i 's/:N/:Y/' /etc/oratab
```

<br/>
<br/>

/etc/init.d/dbora 파일을 생성한 후 아래 내용을 추가합니다.

```js
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
<br/>

권한 변경 및 Link 생성

```js
# chgrp dba /etc/init.d/dbora
# chmod 750 /etc/init.d/dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc0.d/K01dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc3.d/S99dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc5.d/S99dbora
```

<br/>
<br/>

이제 기본적인 설치는 완료되었습니다. (Reboot 한번 하구 계속 이어서 진행하겠습니다.)

```js
# reboot
```

<br/>
<br/>

이제 Oracle의 새로운 유저를 생성합니다.

```js
# sqlplus / as sysdba
```


<br/>
<br/>
Log 모드를 변환하기 위해서는 Shutdown이 필요합니다.   

일반적으로 DB는 다음과 같은 Stage로 동작을 하는데 Log Mode 변환은 Mount 단계에서 가능합니다.   

![image](https://user-images.githubusercontent.com/69498804/161213428-c0783fac-2aba-4951-9d35-02870df3a63f.png)

<br/>
<br/>

때문에 현재 실행 DB를 shutdown -> Mount Mode 변환 -> Archivelog Mode 변환을 진행하면 됩니다. 

```js
SQL> shutdown immediate
;

Database closed.
Database dismounted.


ORACLE instance shut down.
SQL
SQL>
SQL>
SQL> startup mount
ORACLE instance started.

Total System Global Area 2432695144 bytes
Fixed Size                  8899432 bytes
Variable Size             536870912 bytes
Database Buffers         1879048192 bytes
Redo Buffers                7876608 bytes
Database mounted.
SQL>
SQL>
SQL> alter database archivelog;

Database altered.

SQL>
SQL> alter database open;

Database altered.

```

<br/>
<br/>

아카이브 로그 모드가 정상적으로 설정되었는지 확인해보면

```js
SQL> archive log list;
Database log mode              Archive Mode
Automatic archival             Enabled
Archive destination            /u01/app/oracle/product/19.0.0/dbhome_1/dbs/arch
Oldest online log sequence     4
Next log sequence to archive   6
Current log sequence           6
SQL>
```

<br/>
<br/>

이제 사용할 유저와 권한을 설정하고, Logminer에 필요한 supplemental을 설정합니다.

```js
SQL>
SQL> create user wonseok identified by test;

User created.

SQL> grant connect, resource, dba to wonseok;

Grant succeeded.

SQL> alter database add supplemental log data;

Database altered.

SQL> ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (all) COLUMNS;   << -- Supplemental이 감지하는 DataBase or Table 설정.

Database altered.

SQL> GRANT EXECUTE_CATALOG_ROLE TO wonseok;
GRANT CONNECT TO wonseok;
GRANT CREATE SESSION TO wonseok;
GRANT SELECT ON SYS.V_$DATABASE TO wonseok;
GRANT SELECT ON SYS.V_$ARCHIVED_LOG TO wonseok;
GRANT SELECT ON SYS.V_$LOGMNR_CONTENTS TO wonseok;
GRANT SELECT ON SYS.V_$LOGMNR_LOGS TO wonseok;
GRANT EXECUTE ON DBMS_LOGMNR TO wonseok;
GRANT EXECUTE ON DBMS_LOGMNR_D TO wonseok;
GRANT SELECT ANY TRANSACTION TO wonseok;
GRANT SELECT ANY TABLE TO wonseok;
GRANT LOGMINING TO wonseok;
Grant succeeded.
```

<br/>
<br/>

권한까지 정상적으로 선언했으면 이제 User를 바꿔줍니다.

```js
SQL> conn wonseok;
Enter password:
Connected.
```

<br/>
<br/>

각자 TABLE을 생성하시면 됩니다. 저는 간단하게 테이블을 하나 만들고 데이터를 넣겠습니다.

```js
CREATE TABLE regions
  (
    region_id NUMBER GENERATED BY DEFAULT AS IDENTITY
    START WITH 5 PRIMARY KEY,
    region_name VARCHAR2( 50 ) NOT NULL
  );

REM INSERTING into REGIONS
SET DEFINE OFF;
Insert into REGIONS (REGION_ID,REGION_NAME) values (1,'Europe');
Insert into REGIONS (REGION_ID,REGION_NAME) values (2,'Americas');
Insert into REGIONS (REGION_ID,REGION_NAME) values (3,'Asia');
Insert into REGIONS (REGION_ID,REGION_NAME) values (4,'Middle East and Africa');
```

<br/>
<br/>

자 이제 로그가 쌓였는지 확인을 해보면 ARCH 파일이 없습니다.

```js

[root@oracle19c-wonseok-01 ~]# ls -alrt /u01/app/oracle/product/19.0.0/dbhome_1/dbs/
total 24
-rw-r--r--. 1 oracle oinstall 3079 May 14  2015 init.ora
-rw-r-----. 1 oracle oinstall   24 Apr  1 06:23 lkWONSEOKDB
-rw-r-----. 1 oracle oinstall   24 Apr  1 06:24 lkWONSEOKD
-rw-r-----. 1 oracle oinstall 2048 Apr  1 06:25 orapwwonseokdb
drwxr-xr-x. 1 oracle oinstall  972 Apr  1 07:13 ..
drwxr-xr-x. 1 oracle oinstall  156 Apr  1 07:16 .
-rw-r-----. 1 oracle oinstall 3584 Apr  1 07:17 spfilewonseokdb.ora
-rw-rw----. 1 oracle oinstall 1544 Apr  1 07:17 hc_wonseokdb.dat
```

<br/>
<br/>

왜냐하면 기본적으로 LogMiner는 리두로그가 가득차지 않는 이상은 아카이브 로그를 사용하지 않기 때문입니다.  
그럼 아카이브 로그를 쌓기 위해서는 아카이브 로그로 쌓도록 로그 스위칭을 시켜주어야 합니다.  

```js
SQL> ALTER SYSTEM SWITCH LOGFILE;

System altered.
```

<br/>
<br/>

이제 로그파일의 경로를 다시 확인해보면, 정상적으로 ARCH로그가 쌓여 있는것을 확인 할 수 있습니다.

```js

[root@oracle19c-wonseok-01 ~]# ls -alrt /u01/app/oracle/product/19.0.0/dbhome_1/dbs/
total 10608
-rw-r--r--. 1 oracle oinstall     3079 May 14  2015 init.ora
-rw-r-----. 1 oracle oinstall       24 Apr  1 06:23 lkWONSEOKDB
-rw-r-----. 1 oracle oinstall       24 Apr  1 06:24 lkWONSEOKD
-rw-r-----. 1 oracle oinstall     2048 Apr  1 06:25 orapwwonseokdb
drwxr-xr-x. 1 oracle oinstall      972 Apr  1 07:13 ..
-rw-r-----. 1 oracle oinstall     3584 Apr  1 07:17 spfilewonseokdb.ora
-rw-rw----. 1 oracle oinstall     1544 Apr  1 07:17 hc_wonseokdb.dat
drwxr-xr-x. 1 oracle oinstall      200 Apr  1 07:29 .
-rw-r-----. 1 oracle oinstall 10835456 Apr  1 07:29 arch1_6_1100845537.dbf <<----
```



# 작성중....




---
---

```toc
```