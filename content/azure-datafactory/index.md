---
emoji: ๐คฆโโ๏ธ
title: "[DATA, AZURE] Azure DataFactory๋ก Oracle Data ์์งํ๊ธฐ"
date: "2021-09-05 00:34:25"
author: nasa1515
tags: CLOUD DATA
categories: CLOUD DATA
---

  

๋จธ๋ฆฌ๋ง  
  

์ ๊ทผ๋ ๋ธ๋ก๊ทธ Rebuild, ์๋ฌด ๋ฑ๋ฑ๋ฑ...๋๋ฌด ๋ฐ์ ํ๋ฃจ์์ต๋๋ค. (๐คฆโโ๏ธ ์์ง๋ ๋ฐ์๊ธด ํ์ง๋ง;;)   
๊ทธ๋๋ ์ฃผ๋ง, ํด๊ทผ ์ดํ์ ๊ธฐ์ ๊ณต๋ถ ํ๋ ์๊ฐ ์ค์ ์ชผ๋์ด๋๋ง ์งฌ์๋ด ๋ธ๋ก๊ทธ ์๋ฐ์ดํธ๋ฅผ ํ๋ ค๊ณ  ๋ธ๋ ฅ์ค์๋๋ค!!  
์ด๋ฒ ํฌ์คํธ์์๋ Azure์ DataFactory์ ์ด๋ก ์ ์ธ ๋ด์ฉ๊ณผ ์ค์  Oracle DB์ ๋ฐ์ดํฐ๋ฅผ ์์งํ๋ ๋ด์ฉ์๋๋ค.

 
---


## โ Azure DataFactory?

![image](https://user-images.githubusercontent.com/69498804/136335857-f2cd40c3-07b9-4991-b3c4-116438c1fe11.png)
๋ฐ์ดํฐ ์ด๋์ ์ค์ผ์คํธ๋ ์ด์ํ๊ณ  ๋ฐ์ดํฐ๋ฅผ ๋ณํํ๋ ๋ฐ์ดํฐ ์ํฌํ๋ก๋ฅผ ๋ง๋ค ์ ์๋ ํด๋ผ์ฐ๋ ๊ธฐ๋ฐ ETL ๋ฐ ๋ฐ์ดํฐ ํตํฉ ์๋น์ค    
์๋ก ๋ค๋ฅธ ๋ฐ์ดํฐ ์ ์ฅ์์ ๋ฐ์ดํฐ๋ฅผ ์์งํ  ์ ์๋ ๋ฐ์ดํฐ ๊ธฐ๋ฐ ์ํฌํ๋ก(ํ์ดํ๋ผ์ธ์ด๋ผ๊ณ  ํจ)๋ฅผ ๋ง๋ค๊ณ  ์์ฝํ  ์ ์์ต๋๋ค.  
๋ฐ์ดํฐ ํ๋ฆ์ ์ฌ์ฉํ๊ฑฐ๋ ์ปดํจํ ์๋น์ค(์: Azure HDInsight Hadoop, Azure Databricks ๋ฐ Azure SQL Database)๋ฅผ ์ฌ์ฉํด  
๋ฐ์ดํฐ๋ฅผ ์๊ฐ์ ์ผ๋ก ๋ณํํ๋ ๋ณต์กํ ETL ํ๋ก์ธ์ค๋ฅผ ์์ฑํ  ์ ์์ต๋๋ค.


๋ผ๊ณ  ์ด๋ก ์ ์ผ๋ก๋ ์จ์๋๋ฐ ๊ทธ๋ฅ GCP์ DataFusion๊ณผ ๋น์ทํ ์์ด ๊ฐ์ต๋๋ค.  
๋ณต์กํ๊ฒ ์ด๋ก ๋ณด๋ค๋ ์ค์ต์ ํด๋ณด๋ฉด์ ๊นจ๋ซ๋๊ฒ ์ข์ ๊ฒ ๊ฐ์ต๋๋ค.  

<br/>

---

## ๐ ๊ตฌ์ถ ์์  Architecture

![image](https://user-images.githubusercontent.com/69498804/136305623-de2ac3d2-18b7-4284-a976-e1413686acde.png)

On-Premise ๊ฐ์ด ๋คํธ์ํฌ๊ฐ ๊ฒฉ๋ฆฌ๋์ด์๋ ํ๊ฒฝ์ ๋ง๋ค๊ณ  ์ถ์์ต๋๋ค.   
๋๋ฌธ์ Azure์์๋ Subnet์ผ๋ก ๋น์ทํ ํ๊ฒฝ์ ๊ตฌ์ฑํด์ Private ํ๊ฒฝ์ผ๋ก DataFactory๋ฅผ ๊ตฌ์ฑํฉ๋๋ค.  
์ด ์๋ธ๋ท ์ข๋ฅ ๋ฐ ์ฉ๋๋ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.

* Subnet 01 [Private] (Oracle VM) - On-premise์ ์ญํ 
* Subnet 02 [Private] (DataFactory) - Private ํ๊ฒฝ์ ์์ง
* Subnet 03 [Private] (Jump Server) - Pirvate ํ๊ฒฝ์ ์ ์ํ๊ธฐ ์ํ Jump

<br/>

---


## โ DataFactory ์์ฑ.

DataFactory ์์ฑ์ [๊ณต์DOCS](https://docs.microsoft.com/ko-kr/azure/data-factory/quickstart-create-data-factory-portal)๋ฅผ ๋ณด๊ณ  ์งํํฉ๋๋ค.

<br/>


* DataFactory๋ฅผ ๋์ผ RG๋ฑ์ ๊ฐ์ธ์ค์ ์ ๋ง์ถฐ์ ์์ฑํฉ๋๋ค.

    ![image](https://user-images.githubusercontent.com/69498804/135404274-8671e65e-26c3-4ffa-b589-9ab418aba4a9.png)


    <br/>

* ๋ค๋ง Private ํ๊ฒ DataFactory Resource๊ฐ ๋์ํ  ์ ์๋๋ก Network ๋ถ๋ถ์ Private EndPoint๋ก ์ง์ ํด์ผ ํฉ๋๋ค.

    ![image](https://user-images.githubusercontent.com/69498804/136308452-5bb43348-50bb-4486-bffb-8ef401507385.png)


์ด ์ธ์ ์ค์ ์ ๊ฑด๋์ค ํ์ ์์ต๋๋ค.


<br/>

---

## ๐ Oracle DB ๊ตฌ์ถ (Azure VM)

* Oracle DB ๊ตฌ์ถ๋ฐฉ๋ฒ์ ๊ฒฝ์ฐ [๊ณต์ DOCS](https://docs.microsoft.com/ko-kr/azure/virtual-machines/workloads/oracle/oracle-database-quick-create)๋ฅผ ๋ณด์๊ณ  ์ค์นํ์๋ฉด ๋ฉ๋๋ค.


<br/>

Azrue VM ์์ฑ (Azure์์ ์ ๊ณตํด์ฃผ๋ Oracle DB Image๋ฅผ ์ฌ์ฉํฉ๋๋ค.

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

Oracle Data FILE์ฉ ๋์คํฌ ์์ฑ

```cs
az vm disk attach --name disk01 --new --resource-group nasatest --size-gb 64 --sku StandardSSD_LRS --vm-name nasa-oracle
```

<br/>


์ฐ๊ฒฐ์ ์ํ Port ๋ฐฉํ๋ฒฝ ์์ 

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

์ด์  ๊ธฐ๋ณธ์ ์ธ ์ค์ ์ ์๋ฃ๋์์ผ๋ VM์ ์ ์ ํ ๋ค ๋ช๊ฐ์ง ์ฌํญ์ ํ์ธํฉ๋๋ค.

```cs
# sudo su -
# ls -alt /dev/sd*|head -1
[root@nasa-oracle ~]# ls -alt /dev/sd*|head -1
brw-rw----. 1 root disk 8, 32 Sep 29 07:31 /dev/sdc
```

<br/>


์ถ๊ฐํ Disk๋ฅผ ํฉ์น๊ธฐ ์ํด ๋์คํฌ ์ค์  ์์์ ์งํํฉ๋๋ค.

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

fstab ๋ฐ hosts ํ์ผ ์์ ํด์ค๋๋ค

```cs
# echo "/dev/sdc1               /u02                    ext4    defaults        0 0" >> /etc/fstab
# echo "<Public IP> <VMname>.eastus.cloudapp.azure.com <VMname>" >> /etc/hosts
```


<br/>

VM ๋ด์ ๋ฐฉํ๋ฒฝ Port๋ฅผ ์ด์ด์ค๋๋ค.

```cs
# firewall-cmd --zone=public --add-port=1521/tcp --permanent
# firewall-cmd --zone=public --add-port=5502/tcp --permanent
# firewall-cmd --reload
```

<br/>

Database ๋ง๋ค๊ธฐ

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


DB ์์ฑ๋์ฐ๋ฏธ๋ก Database ์์ฑ.

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

์ค๋ผํด ํ๊ฒฝ ๋ณ์ ์ค์ 

```CS
# ORACLE_SID=nasatest; export ORACLE_SID
# echo "export ORACLE_SID=nasatest" >> ~/.bashrc
```

<br/>

Oracle db init ๋ฑ๋ก

```cs
# sed -i 's/:N/:Y/' /etc/oratab
```

<br/>

/etc/init.d/dbora ํ์ผ ์์ฑ ํ ์๋ ๋ด์ฉ ์ถ๊ฐ

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

๊ถํ ๋ณ๊ฒฝ ๋ฐ Link ์์ฑ

```cs
# chgrp dba /etc/init.d/dbora
# chmod 750 /etc/init.d/dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc0.d/K01dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc3.d/S99dbora
# ln -s /etc/init.d/dbora /etc/rc.d/rc5.d/S99dbora
```

<br/>

Oracle Develop ์ฐ๊ฒฐ์ ์ํ DB User ์์ฑ. (DataFactory์์๋ sys user๋ก ๋ฐ๋ก ์ฐ๊ฒฐ์ด ๋์ง ์์ต๋๋ค.)

```cs
# sqlplus sys as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on Thu Sep 30 05:44:51 2021
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.

Enter password:

Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SQL> CREATE USER nasa1515 IDENTIFIED BY qwer1234;
User created.

SQL> grant all privileges to nasa1515;
Grant succeeded.

SQL> exit
```

<br/>

์์ฑํ DB USER๋ก ์ ์ํด Test ๋ฐ์ดํฐ ์์ฑ

```cs
# sqlplus nasa1515

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

์ฐ๊ฒฐ ์ฉ Oracle ์๋ฃ

<br/>

---

## ๐คฆโโ๏ธ Azure Infra (Network) ๊ตฌ์ฑ


<br/>

### Azure Network Logic

![image](https://user-images.githubusercontent.com/69498804/136329888-548f3328-886d-47f5-a6a5-e803e6584096.png)

* DataFactory์์ Privateํ Self-hoted VM์ ์ฌ์ฉํ๊ธฐ ์ํด์  ๋ ๊ฐ์ Private Endpoint ์ค์ ์ด ํ์ํฉ๋๋ค.


<br/>
<br/>

์๋ฅผ ์ฌํํ๊ธฐ ์ํ ์ฐ๊ฒฐ์ ์ํ VPC์ Subnet์ ๊ฒฝ์ฐ ๋ค์๊ณผ ๊ฐ์ด ๋๋  ๋ถ๋ฆฌํ์์ต๋๋ค.

![image](https://user-images.githubusercontent.com/69498804/136308851-a864141d-2dde-48dc-8f31-b1d328f2ebc1.png)
* pub-01 : jumpserver๊ฐ Public IP๋ฅผ ํ ๋น ๋ฐ์ Subnet
* Pri-01 : DataFactory์ ์ฐ๊ฒฐ๋ self-hosted VM์ด ์ฌ์ฉ ํ  Subnet

<br/>
<br/>

### VPC Endpoint ์์ฑ

์์ธํ ์ค์ ์ ๊ฒฝ์ฐ [๊ณต์ DOC]() ํ์ธ ํ์๋ฉด ๋ฉ๋๋ค.  
์ ๋ Private ์ฐ๊ฒฐ ์ ํ์ํ ๊ตฌ์ฑ์ ๋ํด์๋ง ์ค๋ชํ๊ฒ ์ต๋๋ค.

<br/>

Azure Potal์์ Private link Service๋ก ์ ์ํ ๋ค Private endpoint Tab์ผ๋ก ์ด๋ ํ ADD ํฉ๋๋ค.

![image](https://user-images.githubusercontent.com/69498804/136330216-b9d5e688-101b-4972-a4c2-2fc98701f420.png)

<br/>
<br/>


Basics Tab์์๋ ๊ธฐ๋ณธ ์ ๋ณด๋ฅผ ์๋ ฅํ๊ณ , Resource Tab์์ ์๋์ ๊ฐ์ด ์ค์ ํฉ๋๋ค.
![image](https://user-images.githubusercontent.com/69498804/136331315-4813eae8-90fa-4a91-8685-90cdd8a0b4e7.png)
* Subscription
* Resource Type
* Resource
* Target sub-resource (ํด๋น ์ค์ ์ ๊ฒฝ์ฐ Self-Hosted VM์ ์ฌ์ฉํ๋ ค๋ฉด datafactory๋ก ๊ณ ์ ์๋๋ค.)

<br/>
<br/>

Configuration Tab์์๋ ์๋์ ๊ฐ์ด ์ค์ ํฉ๋๋ค.
![image](https://user-images.githubusercontent.com/69498804/136331788-54a9972d-b228-4930-9410-1781d796882e.png)
* subnet : self-hosted VM์ Subnet์ ์ ํ
* Resource Group : Self-hoted VM์ด ์์นํ๊ณ  ์๋ RG ์ ํ

<br/>
<br/>

๊ทธ๋ผ ๋ค์๊ณผ ๊ฐ์ด ์์ฑ๋ Endpoint๋ฅผ ํ์ธ ํ  ์ ์์ต๋๋ค.
![image](https://user-images.githubusercontent.com/69498804/136331888-f721eb44-1850-402a-a24c-b9d85ec7dfc1.png)


<br/>
<br/>

์ถ๊ฐ์ ์ผ๋ก DataFactory Instance -> Network Tab์์๋ endpoint ์ฐ๊ฒฐ์ ํ์ธํ  ์ ์์ต๋๋ค.
![image](https://user-images.githubusercontent.com/69498804/136331932-4a19e1a3-cf21-43b1-b170-7d35bc33fd40.png)

<br/>

---

## ๐ DataBricks Self-hosted VM ์ฐ๋

<br/>

์ ์ ๋ฃจํธ : Azure Data Factory Studio โ ๊ด๋ฆฌ โ ํตํฉ๋ฐํ์ โ ์๋ก๋ง๋ค๊ธฐ โ Azure, ์์ฒด ํธ์คํ โ ์์ฒด ํธ์คํ โ ์์ฑ
![image](https://user-images.githubusercontent.com/69498804/136332154-3d59c2fd-55fd-4d40-8de9-4715078d8fd0.png)


<br/>
<br/>


์์ฑ๋๋ฉด ์์ง ์ฐ๊ฒฐ์ด ๋์ง ์์ ์์ฒด ํธ์คํ ๋ฐํ์์ด ์์ฑ๋๋๋ฐ ์ ์ํ์ฌ  
ํตํฉ ๋ฐํ์ ํ์ผ์ ๋ค์ดํ ๋ค ์ค์  Tab์ Key ๊ฐ์ ์ ์ฅํด๋ก๋๋ค.

![image](https://user-images.githubusercontent.com/69498804/136332397-1e076bef-c666-4551-8eae-cee4986fccee.png)


<br/>
<br/>

์ด์  JumpServer -> Self-hosted VM์ผ๋ก RDP ์ ์ ํ Self-Hosted์ ๋ค์ด๋ก๋ ๋ฐ์ ๋ฐํ์ ํ์ผ์ ์ค์น ํฉ๋๋ค.  
์ค์น๊ฐ ์๋ฃ๋๋ฉด ์๋์ ๊ฐ์ intergration Runtime manager๊ฐ ์คํ๋๋๋ฐ ์๊น ์ ์ฅํด๋ Key ๊ฐ์ ์๋ ฅํ์ฌ ์ฐ๊ฒฐํฉ๋๋ค.

![image](https://user-images.githubusercontent.com/69498804/136332713-79287322-d5bf-42c6-b09d-8f297dc4a318.png)


<br/>
<br/>

์ ์์ ์ผ๋ก Private endpoint ์ค์ ์ ํ๋ค๋ฉด ์๋์ ๊ฐ์ด Runtime์ด ์ถ๊ฐ๋ฉ๋๋ค.

![image](https://user-images.githubusercontent.com/69498804/136332894-38051fbd-717f-443e-8352-3631d0b4cebe.png)

<br/>


---

## ๐ Oracle Data Ingestion 

<br/>

DataFactory -> Factory Resource -> Data Set -> create -> Oracle ๊ฒ์!

![image](https://user-images.githubusercontent.com/69498804/136333296-1259339c-afc3-4a61-9a67-fa1ed1b6a87e.png)


<br/>
<br/>

์ดํ ์ฐ๊ฒฐ์ ๋ณด์ ๋ํ ๊ฐ์ ์์์ ์์ฑํ Oracle์ SID ๊ฐ์ด๋ DB ์ ์ ์ ๋ณด๋ฅผ ์๋ ฅํฉ๋๋ค.

![image](https://user-images.githubusercontent.com/69498804/136334629-2d3c334d-2ed4-4fae-b603-7f97d9679ac1.png)

* ์ฐ๊ฒฐํ์คํธ ๊ฒฐ๊ณผ : ์ ์!

<br/>
<br/>

์ถ๊ฐ ์์ฑ์ค์  ๋ถ๋ถ์์๋ ์์์ ์์ฑํ Table ๊ฐ์ ๋ฃ์ด์ค๋๋ค.

![image](https://user-images.githubusercontent.com/69498804/136334743-9d7b839b-3214-4b1c-911d-80fedf9f2fcb.png)


<br/>
<br/>

์ฐ๊ฒฐ์ ๋ง์น๊ฒ ๋๋ฉด Oracle DataSet์ด ์์ฑ์ด ๋๊ณ , ํด๋น ๋ฐ์ดํฐ๋ฅผ ํ์ธ ํ  ์ ์์ต๋๋ค.
![image](https://user-images.githubusercontent.com/69498804/136335374-af3c07bd-b888-4618-beb8-1f740877625b.png)


<br/>

์ด์  DataFactory์ ํ์ดํ๋ผ์ธ์์ Flow (ETL), Data Migration ๋ฑ ๋ค์ํ ์์์ ์งํํ  ์ ์์ต๋๋ค.
![image](https://user-images.githubusercontent.com/69498804/136335528-cf52026c-c431-4186-ad6b-bb509b0b2c90.png)

-> ํด๋น ๋ถ๋ถ์ ๋ค์ ํฌ์คํธ์์ ๋ ์์ธํ ์ ๋ฆฌํ๋๋ก ํ๊ฒ ์ต๋๋ค.

<br/>

---

## ๋ง์น๋ฉฐโฆ  

GCP์ ๊ฒฝ์ฐ DataFlow, Proc ๋ฑ ๋ง์ Resource ๋ค์ ์ฌ์ฉํด๋ดค์ง๋ง ์ด์  Azure ์ชฝ์ Data Rosouce๋ฅผ ์ฌ์ฉํด๋ณด๋ ค๊ณ  ํฉ๋๋ค.  
๋ค์ ํฌ์คํธ์์ ๋ต๊ฒ ์ต๋๋ค.

 
---

```toc
```
