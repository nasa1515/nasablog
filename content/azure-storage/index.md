---
emoji: 🤦‍♂️
title: "[AZURE] STORAGE"
date: "2021-07-30 00:20:25"
author: nasa1515
tags: CLOUD
categories: CLOUD
---



머리말  
 
이번 포스트에서는 Azure 스토리지 서비스에 대한 내용을 다뤘습니다.  
GCP를 사용했었던 경험으론 스토리지를 가장 많이 썼던 것 같은데 AZURE도 그럴지 봐야할 것 같습니다.

 
---

## ✔ Azure Storage 

*ON-PREMISE에 있는 모든 파일을 클라우드로 마이그레이션 하는 경우에 가장 많이 사용하는 서비스가 아닐까 싶습니다.  
Azure Storage는 IaaS 가상 머신 및 Paas 클라우드에도 사용됩니다.*  

Azure Storage에서 사용 가능 한 Storage의 종류는 아래와 같습니다.

* Azure Blob Storage
* Azure Disk Storage
* Azure Files Storage
* Azure Blob 액세스 계층


<br/>

---

## ✌ Azure Storage Account

Azure Storage를 사용하려면 데이터 개체를 저장할 Storage 계정을 만들어야합니다.  


![create-storage-account-expanded](https://user-images.githubusercontent.com/69498804/105789118-365a0f80-5fc5-11eb-93ae-0d93fa983b45.png)

스토리지 계정에는 Blob, 파일, 디스크 등 모든 Azure Storage 데이터 개체가 포함됩니다.

 * Azure VM은 Azure Disk Storage를 사용하여 가상 디스크를 저장합니다    
    그러나 Azure Disk Storage를 사용하여 가상 머신 외부에 디스크를 저장할 수는 없습니다.

<br/>

스토리지 계정은 HTTP, HTTPS를 통해 Azure Storage 데이터에 고유한 네임스페이스를 제공합니다.  

![account-container-blob](https://user-images.githubusercontent.com/69498804/105789701-3dcde880-5fc6-11eb-9116-e56a222909ef.png)


<br/>

---

## 👍 Storage 종류

<br/>

### Disk Storage

Disk Storage는 VM에 말 그대로 Disk를 제공합니다.  
Disk Storage를 통해 연결된 가상 HDD에서 데이터를 영구적으로 저장, 엑세스 할 수 있습니다.  

<br/>

사용 할 수 있는 Disk의 종류는 아래와 같습니다.

* Ultra Disks
* premium SSD
* SSD
* HDD

별도의 디스크를 사용해 아래와 같은 가상머신을 설계할 수 있습니다.  

![azure-disks](https://user-images.githubusercontent.com/69498804/105790339-7e7a3180-5fc7-11eb-8362-5eaccf9ed2a3.png)



<br/>

### Azure Blob Storage

*Blob Storage는 클라우드용 개체 스토리지 솔루션 입니다.  
방대한 양의 데이터를 저장할 수 있습니다.  
또한 비정형이므로 포함될 수 있는 데이터 종류에 대한 제한이 없습니다.   
Blob Storage는 수천 개의 동시 업로드, 대용량 비디오 데이터, 끊임없이 증가하는  
로그 파일을 관리할 수 있으며, 어디서나 인터넷을 통해 연결할 수 있습니다.*

*Blob은 일반적인 파일 형식으로 제한되지 않습니다.   
즉, Blob Storage 한개에 스트리밍 데이터, 암호화 메시지, 사용자 지정 데이터가 중복 포함될 수 있습니다.  
데이터는 blob으로 업로드되고 Azure에서 실제 스토리지 요구 사항을 관리하기 때문입니다.  
결국 개발자가 디스크를 살피거나 관리할 필요가 없습니다.*


* Blob Storage는 보통 다음과 같은 상황에 적절합니다.

    * 직접 브라우저에 이미지 또는 문서 제공
    * 분산 액세스용 파일 저장.
    * 비디오 및 오디오 스트리밍.
    * 백업/복원, 재해 복구 및 보관용 데이터 저장
    * 온-프레미스 또는 Azure 호스팅 서비스에서 분석하기 위한 데이터 저장.
    * 가상 머신에 대해 최대 8TB의 데이터를 저장합니다.  


<br/>

### Azure Files

*클라우드에서 SMB 및 NFS Protocol을 통해 액세스할 수 있는 완전 관리형 파일 공유를 제공합니다.  
Azure File Share는 Windows, Linux 등 Cloud or ON-premise 배포를 통해 동시에 탑재될 수 있습니다.  
Azure File은 일반적인 SMB Share와 동일하게 File Storage Share를 사용해 액세스 할 수 있습니다.  
즉 제한 없는 수의 Azure VM 또는 역할이 파일 스토리지 공유를 동시에 탑재하고 액세스할 수 있습니다.*




* Azure Files는 보통 다음과 같은 상황에 적절합니다.


    * 여러 온-프레미스 애플리케이션에서 File share를 사용합니다.  
     Azure Files를 사용해 데이터를 공유하는 App을 Azure로 쉽게 마이그레이션할 수 있습니다.

    * 구성 파일을 File share에 저장하고 여러 VM에서 액세스합니다.  
    그룹의 여러 개발자가 사용하는 도구 및 유틸리티를 파일 공유에 저장할 수 있으며,  
    이렇게 모든 사람이 동일한 버전을 사용할 수 있습니다.

    * 데이터를 File share에 쓰고 이 데이터를 나중에 처리하거나 분석합니다.  
    예를 들어 diagnostic logs, metrics, crash dumps 에 이런 작업을 수행할 수 있습니다.


<br/>

* 아래 그림은 상이한 Regions 간 Azure File을 통해 데이터를 공유하는 내용입니다.

    ![azure-files](https://user-images.githubusercontent.com/69498804/105799742-98704000-5fd8-11eb-953d-1407882ada92.png)

    Azure Files는 미사용 데이터가 암호화되도록 하고 SMB 프로토콜은 데이터가 전송 중에 암호화되도록 합니다.


<br/>

---

## 🤞 Blob access tiers

Cloud 환경 뿐만 아니라 Storage를 사용하다보면 데이터가 기하급수적으로 늘어 날 수 있습니다.  
그러나 데이터의 엑세스 빈도가 초반에는 빈번했다가 급격히 떨어지는 경우가 대부분입니다.     
그럼 결국에 안쓰는 데이터들로 인해 비효율적인 운영이 될 수 밖에 없습니다.  
Blob 에서는 이러한 상황을 위해 3가지의 access tiers 를 제공합니다.
  

  * Hot access tier : 자주 엑세스하는 데이터 (웹 이미지 등)을 저장하는데 최적
  * Cool access tier : 자주 엑세스하지 않고 30일 이상 저장하는 데이터에 최적
  * Archive access tier : 거의 엑세스하지 않고 180일 ~ 유연하게 보관에 최적

<br/>

위 3가지 Access tier에는 다음과 같은 고려 사항이 적용됩니다.


* HOT, COOL Access tier만 계정 수준에서 설정할 수 있습니다.  
Archive tier는 계정 수준에서 사용할 수 없습니다.

* Access tier는 업로드 중, 업로드 후에 Blob 수준에서 설정할 수 있습니다.

* Archive tier는 데이터를 오프라인으로 저장하여 스토리지 비용이 가장 적지만  
    rehydrate, Access 하는데 비용이 가장 많이 듭니다.


<br/>

* Hot, Cool access tier는 다음과 같은 Acount 설정에서 변경가능합니다.

    ![account-tier](https://user-images.githubusercontent.com/69498804/105800845-0f0e3d00-5fdb-11eb-9eba-0b3db6acd051.png)

<br/>

---

## 마치며…  


이번 포스트는 Storage에 대한 이론적인 내용을 알아봤습니다.  
사실 Storage의 개념은 AWS,GCP에도 존재하고 있던거라  
다 알고 있었지만 Azure의 경우 AD, Active AD 개념을 이해해야해서 복습하는 느낌으로 포스트를 작성해봤습니다.


---

```toc
```