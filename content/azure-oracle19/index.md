---
emoji: ๐คฆโโ๏ธ
title: "[AZURE] Oracle 19c ์ค์น, LogMiner, CDC ์ค์ ํ๊ธฐ From Azure VM"
date: "2022-04-01 00:34:25"
author: nasa1515
tags: CLOUD
categories: CLOUD
---



๋จธ๋ฆฌ๋ง  
  

์๋ํ์ธ์ NASA1515์๋๋ค. ๊ต์ฅํ ์ค๋๋ง์ ๊ธ์ ์๋๋ค. (ํ์ฌ ์ผ, ๊ฐ์ธ์ฌ์  ๋ฑ๋ฑ ๋ฐ์์ผ์ด ์ฐธ ๋ง์์ต๋๋ค..)  
์๋ฌดํผ...2022๋ 4์๋ถํฐ ๊ทธ๋๋ ์ฃผ๋น ํ๋์ ํฌ์คํธ๋ ์์ฑํด๋ณด์์ ๋ง์ธ๋๋ก ๋ธ๋ก๊ทธ๋ฅผ ์ด์ํด๋ณด๋ ค๊ณ  ํฉ๋๋ค.  
์ฌ์ค ์ถ๊ฐ ๊ธ์ ์์ฑํ์ง ์์๋, adsence ์์ต์ ์์ด๋๊น ๋ํํด์ง ์ด์ ๊ฐ ํฌ๊ธดํฉ๋๋ค..   


 
---

<br/>

## โ ORACLE Install

์๋ก  ์์ด ๋ฐ๋ก Oracle์ ์ค์นํด๋ณด๋๋ก ํ์ฃ    
Oracle์ ๊ธฐ๋ณธ Linux์ ๊น๊ฒ๋๋ฉด ํ๋ผ๋ฉํฐ ๋ฑ๋ฑ ๊ท์ฐฎ์ ์ง๋ ์์๋ค์ด ๋ง๊ธฐ ๋๋ฌธ๋ฐ  
Azure์์ ์ ๊ณตํด์ฃผ๋ DataBase Image๋ฅผ ์ฌ์ฉํ๋๋ก ํ๊ฒ ์ต๋๋ค.  

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

Disk ์ฆ์ค! 

Azure VM์ Spec์ ๋ฎ์ถฐ์ ์์์ค์ด๊ธฐ ๋๋ฌธ์(๋น์ฉ...) Oracle Data File์ฉ ๋์คํฌ๋ฅผ ํ๋ ์ฆ์คํด์ฃผ๊ฒ ์ต๋๋ค.  

```js
az vm disk attach --name disk01 --new --resource-group nasatest --size-gb 64 --sku StandardSSD_LRS --vm-name nasa-oracle
```


<br/>
<br/>

์ธ๋ถ ์ฐ๊ฒฐ์ ์ํ Virtual Machine Firewall ์ถ๊ฐ.


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


์ด์  VM์ ์ ์ํด์ ์ฆ์คํ Disk Partition์ ๋๋ ์ค์๋ค.

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



fstab์ Mount Point ๋ฑ๋ก ๋ฐ hosts ํ์ผ์ ์์ ํด์ค๋๋ค.

```js
# echo "/dev/sdb1               /u02                    ext4    defaults        0 0" >> /etc/fstab
# echo "<Public IP> <VMname>.eastus.cloudapp.azure.com <VMname>" >> /etc/hosts
```


<br/>
<br/>

๋ง์ง๋ง์ผ๋ก VM ๋ด๋ถ์ Firewall Port๋ฅผ ์ค์ ํด์ค๋๋ค.

```js
# firewall-cmd --zone=public --add-port=1521/tcp --permanent
# firewall-cmd --zone=public --add-port=5502/tcp --permanent
# firewall-cmd --reload
```

---


<br/>

## โ DataBase ์์ฑ


์๋๋ Oracle์ ๊ธฐ๋ณธ Linux์ ์ค์นํ๋ ค๋ฉด ์๋์ ๊ฐ์ ํ๋ก์ธ์ค๋ฅผ ๊ฑฐ์ณ์ผ ํ๋๊ฒ ์ ์์๋๋ค.  
![image](https://user-images.githubusercontent.com/69498804/161206125-21c2cccd-bf7d-435c-8b1a-895d348b8f12.png)
๊ทธ๋ฌ๋ Azure์์๋ DataBase ์ด๋ฏธ์ง์์ ์ด๋ฏธ /u01/ ๊ฒฝ๋ก์ ์์ง๊ณผ ๋ฆฌ์ค๋๊ฐ ์์ฑ ๋ฐ ์ค์น ์งํ๋ ์ํ๋ก ์ ๊ณต์ ํด์ค๋๋ค!

<br/>
๊ทธ๋์ Oracle User์ ํ๊ฒฝ๋ณ์ ํ์ผ์ผ ์ดํด๋ณด๋ฉด ์๋์ ๊ฐ์ด ์ด๋ฏธ ์์ง๊ณผ ๋ฆฌ์ค๋์ ๊ฒฝ๋ก๊ฐ ์ค์ ๋์ด์์ต๋๋ค!

![image](https://user-images.githubusercontent.com/69498804/161206420-448edba4-787e-471c-96d7-09f026430edf.png)

<br/>
<br/>

์ ์ด์  Oracle Database๋ฅผ ์์ฑํ๊ธฐ ์ํด์ USER๋ฅผ ๋ณ๊ฒฝํ๊ณ  ์๋ Command๋ฅผ ์๋ ฅํฉ๋๋ค.

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

์์์ ๋งํ ๊ฒ์ฒ๋ผ ์ ํฌ๋ ์ด์  DBCA๋ก DataBase๋ง ์์ฑํด์ฃผ๋ฉด ๊ฐํธํ๊ฒ ์ฌ์ฉํ  ์ ์์ต๋๋ค. (20๋ถ ์ ๋ ์์๋ฉ๋๋ค)

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

์ ๋ฐ์ดํฐ๋ฒ ์ด์ค๊ฐ ์์ฑ์ด ์๋ฃ๋์์ผ๋ฉด ์ค๋ผํด ํ๊ฒฝ๋ณ์๋ฅผ ์ค์ ํด์ค๋๋ค.

```js
# ORACLE_SID=wonseokdb; export ORACLE_SID
# echo "export ORACLE_SID=wonseokdb" >> ~/.bashrc
```

<br/>
<br/>

Oracle DataBase Init Script ๋ฑ๋ก

```js
# sed -i 's/:N/:Y/' /etc/oratab
```

<br/>
<br/>

/etc/init.d/dbora ํ์ผ์ ์์ฑํ ํ ์๋ ๋ด์ฉ์ ์ถ๊ฐํฉ๋๋ค.

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

๊ถํ ๋ณ๊ฒฝ ๋ฐ Link ์์ฑ

```js
# chgrp dba /etc/init.d/dbora
# chmod 750 /etc/init.d/dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc0.d/K01dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc3.d/S99dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc5.d/S99dbora
```

<br/>
<br/>

์ด์  ๊ธฐ๋ณธ์ ์ธ ์ค์น๋ ์๋ฃ๋์์ต๋๋ค. (Reboot ํ๋ฒ ํ๊ตฌ ๊ณ์ ์ด์ด์ ์งํํ๊ฒ ์ต๋๋ค.)

```js
# reboot
```

<br/>
<br/>

์ด์  Oracle์ ์๋ก์ด ์ ์ ๋ฅผ ์์ฑํฉ๋๋ค.

```js
# sqlplus / as sysdba
```


<br/>
<br/>
Log ๋ชจ๋๋ฅผ ๋ณํํ๊ธฐ ์ํด์๋ Shutdown์ด ํ์ํฉ๋๋ค.   

์ผ๋ฐ์ ์ผ๋ก DB๋ ๋ค์๊ณผ ๊ฐ์ Stage๋ก ๋์์ ํ๋๋ฐ Log Mode ๋ณํ์ Mount ๋จ๊ณ์์ ๊ฐ๋ฅํฉ๋๋ค.   

![image](https://user-images.githubusercontent.com/69498804/161213428-c0783fac-2aba-4951-9d35-02870df3a63f.png)

<br/>
<br/>

๋๋ฌธ์ ํ์ฌ ์คํ DB๋ฅผ shutdown -> Mount Mode ๋ณํ -> Archivelog Mode ๋ณํ์ ์งํํ๋ฉด ๋ฉ๋๋ค. 

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

์์นด์ด๋ธ ๋ก๊ทธ ๋ชจ๋๊ฐ ์ ์์ ์ผ๋ก ์ค์ ๋์๋์ง ํ์ธํด๋ณด๋ฉด

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

์ด์  ์ฌ์ฉํ  ์ ์ ์ ๊ถํ์ ์ค์ ํ๊ณ , Logminer์ ํ์ํ supplemental์ ์ค์ ํฉ๋๋ค.

```js
SQL>
SQL> create user wonseok identified by test;

User created.

SQL> grant connect, resource, dba to wonseok;

Grant succeeded.

SQL> alter database add supplemental log data;

Database altered.

SQL> ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (all) COLUMNS;   << -- Supplemental์ด ๊ฐ์งํ๋ DataBase or Table ์ค์ .

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

๊ถํ๊น์ง ์ ์์ ์ผ๋ก ์ ์ธํ์ผ๋ฉด ์ด์  User๋ฅผ ๋ฐ๊ฟ์ค๋๋ค.

```js
SQL> conn wonseok;
Enter password:
Connected.
```

<br/>
<br/>

๊ฐ์ TABLE์ ์์ฑํ์๋ฉด ๋ฉ๋๋ค. ์ ๋ ๊ฐ๋จํ๊ฒ ํ์ด๋ธ์ ํ๋ ๋ง๋ค๊ณ  ๋ฐ์ดํฐ๋ฅผ ๋ฃ๊ฒ ์ต๋๋ค.

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

์ ์ด์  ๋ก๊ทธ๊ฐ ์์๋์ง ํ์ธ์ ํด๋ณด๋ฉด ARCH ํ์ผ์ด ์์ต๋๋ค.

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

์๋ํ๋ฉด ๊ธฐ๋ณธ์ ์ผ๋ก LogMiner๋ ๋ฆฌ๋๋ก๊ทธ๊ฐ ๊ฐ๋์ฐจ์ง ์๋ ์ด์์ ์์นด์ด๋ธ ๋ก๊ทธ๋ฅผ ์ฌ์ฉํ์ง ์๊ธฐ ๋๋ฌธ์๋๋ค.  
๊ทธ๋ผ ์์นด์ด๋ธ ๋ก๊ทธ๋ฅผ ์๊ธฐ ์ํด์๋ ์์นด์ด๋ธ ๋ก๊ทธ๋ก ์๋๋ก ๋ก๊ทธ ์ค์์นญ์ ์์ผ์ฃผ์ด์ผ ํฉ๋๋ค.  

```js
SQL> ALTER SYSTEM SWITCH LOGFILE;

System altered.
```

<br/>
<br/>

์ด์  ๋ก๊ทธํ์ผ์ ๊ฒฝ๋ก๋ฅผ ๋ค์ ํ์ธํด๋ณด๋ฉด, ์ ์์ ์ผ๋ก ARCH๋ก๊ทธ๊ฐ ์์ฌ ์๋๊ฒ์ ํ์ธ ํ  ์ ์์ต๋๋ค.

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



# ์์ฑ์ค....




---
---

```toc
```