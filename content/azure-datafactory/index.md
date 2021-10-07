---
emoji: 🤦‍♂️
title: "[DATA, AZURE] Azure DataFactory로 Oracle Data 수집하기"
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

![image](https://user-images.githubusercontent.com/69498804/136335857-f2cd40c3-07b9-4991-b3c4-116438c1fe11.png)
데이터 이동을 오케스트레이션하고 데이터를 변환하는 데이터 워크플로를 만들 수 있는 클라우드 기반 ETL 및 데이터 통합 서비스    
서로 다른 데이터 저장소의 데이터를 수집할 수 있는 데이터 기반 워크플로(파이프라인이라고 함)를 만들고 예약할 수 있습니다.  
데이터 흐름을 사용하거나 컴퓨팅 서비스(예: Azure HDInsight Hadoop, Azure Databricks 및 Azure SQL Database)를 사용해  
데이터를 시각적으로 변환하는 복잡한 ETL 프로세스를 작성할 수 있습니다.


라고 이론적으로는 써있는데 그냥 GCP의 DataFusion과 비슷한 아이 같습니다.  
복잡하게 이론보다는 실습을 해보면서 깨닫는게 좋을 것 같습니다.  

<br/>

---

## 👌 구축 예정 Architecture

![image](https://user-images.githubusercontent.com/69498804/136305623-de2ac3d2-18b7-4284-a976-e1413686acde.png)

On-Premise 같이 네트워크가 격리되어있는 환경을 만들고 싶었습니다.   
때문에 Azure에서는 Subnet으로 비슷한 환경을 구성해서 Private 환경으로 DataFactory를 구성합니다.  
총 서브넷 종류 및 용도는 다음과 같습니다.

* Subnet 01 [Private] (Oracle VM) - On-premise의 역할
* Subnet 02 [Private] (DataFactory) - Private 환경의 수집
* Subnet 03 [Private] (Jump Server) - Pirvate 환경에 접속하기 위한 Jump

<br/>

---


## ✌ DataFactory 생성.

DataFactory 생성은 [공식DOCS](https://docs.microsoft.com/ko-kr/azure/data-factory/quickstart-create-data-factory-portal)를 보고 진행합니다.

<br/>


* DataFactory를 동일 RG등의 개인설정에 맞춰서 생성합니다.

    ![image](https://user-images.githubusercontent.com/69498804/135404274-8671e65e-26c3-4ffa-b589-9ab418aba4a9.png)


    <br/>

* 다만 Private 하게 DataFactory Resource가 동작할 수 있도록 Network 부분은 Private EndPoint로 지정해야 합니다.

    ![image](https://user-images.githubusercontent.com/69498804/136308452-5bb43348-50bb-4486-bffb-8ef401507385.png)


이 외의 설정은 건드실 필요 없습니다.


<br/>

---

## 👍 Oracle DB 구축 (Azure VM)

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

<br/>

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

SQL> CREATE USER nasa1515 IDENTIFIED BY qwer1234;
User created.

SQL> grant all privileges to nasa1515;
Grant succeeded.

SQL> exit
```

<br/>

생성한 DB USER로 접속해 Test 데이터 생성

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

연결 용 Oracle 완료

<br/>

---

## 🤦‍♂️ Azure Infra (Network) 구성


<br/>

### Azure Network Logic

![image](https://user-images.githubusercontent.com/69498804/136329888-548f3328-886d-47f5-a6a5-e803e6584096.png)

* DataFactory에서 Private한 Self-hoted VM을 사용하기 위해선 둘 간의 Private Endpoint 설정이 필요합니다.


<br/>
<br/>

위를 재현하기 위한 연결을 위한 VPC의 Subnet의 경우 다음과 같이 나눠 분리하였습니다.

![image](https://user-images.githubusercontent.com/69498804/136308851-a864141d-2dde-48dc-8f31-b1d328f2ebc1.png)
* pub-01 : jumpserver가 Public IP를 할당 받을 Subnet
* Pri-01 : DataFactory와 연결된 self-hosted VM이 사용 할 Subnet

<br/>
<br/>

### VPC Endpoint 생성

자세한 설정의 경우 [공식 DOC]() 확인 하시면 됩니다.  
저는 Private 연결 시 필요한 구성에 대해서만 설명하겠습니다.

<br/>

Azure Potal에서 Private link Service로 접속한 뒤 Private endpoint Tab으로 이동 후 ADD 합니다.

![image](https://user-images.githubusercontent.com/69498804/136330216-b9d5e688-101b-4972-a4c2-2fc98701f420.png)

<br/>
<br/>


Basics Tab에서는 기본 정보를 입력하고, Resource Tab에서 아래와 같이 설정합니다.
![image](https://user-images.githubusercontent.com/69498804/136331315-4813eae8-90fa-4a91-8685-90cdd8a0b4e7.png)
* Subscription
* Resource Type
* Resource
* Target sub-resource (해당 설정의 경우 Self-Hosted VM을 사용하려면 datafactory로 고정입니다.)

<br/>
<br/>

Configuration Tab에서는 아래와 같이 설정합니다.
![image](https://user-images.githubusercontent.com/69498804/136331788-54a9972d-b228-4930-9410-1781d796882e.png)
* subnet : self-hosted VM의 Subnet을 선택
* Resource Group : Self-hoted VM이 위치하고 있는 RG 선택

<br/>
<br/>

그럼 다음과 같이 생성된 Endpoint를 확인 할 수 있습니다.
![image](https://user-images.githubusercontent.com/69498804/136331888-f721eb44-1850-402a-a24c-b9d85ec7dfc1.png)


<br/>
<br/>

추가적으로 DataFactory Instance -> Network Tab에서도 endpoint 연결을 확인할 수 있습니다.
![image](https://user-images.githubusercontent.com/69498804/136331932-4a19e1a3-cf21-43b1-b170-7d35bc33fd40.png)

<br/>

---

## 😂 DataBricks Self-hosted VM 연동

<br/>

접속 루트 : Azure Data Factory Studio → 관리 → 통합런타임 → 새로만들기 → Azure, 자체 호스팅 → 자체 호스팅 → 생성
![image](https://user-images.githubusercontent.com/69498804/136332154-3d59c2fd-55fd-4d40-8de9-4715078d8fd0.png)


<br/>
<br/>


생성되면 아직 연결이 되지 않은 자체 호스팅 런타임이 생성되는데 접속하여  
통합 런타임 파일은 다운한 뒤 설정 Tab의 Key 값을 저장해둡니다.

![image](https://user-images.githubusercontent.com/69498804/136332397-1e076bef-c666-4551-8eae-cee4986fccee.png)


<br/>
<br/>

이제 JumpServer -> Self-hosted VM으로 RDP 접속 후 Self-Hosted에 다운로드 받은 런타임 파일을 설치 합니다.  
설치가 완료되면 아래와 같은 intergration Runtime manager가 실행되는데 아까 저장해둔 Key 값을 입력하여 연결합니다.

![image](https://user-images.githubusercontent.com/69498804/136332713-79287322-d5bf-42c6-b09d-8f297dc4a318.png)


<br/>
<br/>

정상적으로 Private endpoint 설정을 했다면 아래와 같이 Runtime이 추가됩니다.

![image](https://user-images.githubusercontent.com/69498804/136332894-38051fbd-717f-443e-8352-3631d0b4cebe.png)

<br/>


---

## 😜 Oracle Data Ingestion 

<br/>

DataFactory -> Factory Resource -> Data Set -> create -> Oracle 검색!

![image](https://user-images.githubusercontent.com/69498804/136333296-1259339c-afc3-4a61-9a67-fa1ed1b6a87e.png)


<br/>
<br/>

이후 연결정보에 대한 값은 위에서 생성한 Oracle의 SID 값이나 DB 접속 정보를 입력합니다.

![image](https://user-images.githubusercontent.com/69498804/136334629-2d3c334d-2ed4-4fae-b603-7f97d9679ac1.png)

* 연결테스트 결과 : 정상!

<br/>
<br/>

추가 속성설정 부분에서는 위에서 생성한 Table 값을 넣어줍니다.

![image](https://user-images.githubusercontent.com/69498804/136334743-9d7b839b-3214-4b1c-911d-80fedf9f2fcb.png)


<br/>
<br/>

연결을 마치게 되면 Oracle DataSet이 생성이 되고, 해당 데이터를 확인 할 수 있습니다.
![image](https://user-images.githubusercontent.com/69498804/136335374-af3c07bd-b888-4618-beb8-1f740877625b.png)


<br/>

이제 DataFactory의 파이프라인에서 Flow (ETL), Data Migration 등 다양한 작업을 진행할 수 있습니다.
![image](https://user-images.githubusercontent.com/69498804/136335528-cf52026c-c431-4186-ad6b-bb509b0b2c90.png)

-> 해당 부분은 다음 포스트에서 더 자세히 정리하도록 하겠습니다.

<br/>

---

## 마치며…  

GCP의 경우 DataFlow, Proc 등 많은 Resource 들을 사용해봤지만 이제 Azure 쪽의 Data Rosouce를 사용해보려고 합니다.  
다음 포스트에서 뵙겠습니다.

 
---

```toc
```
