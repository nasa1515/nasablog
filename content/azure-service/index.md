---
emoji: 🤦‍♂️
title: "[AZURE] SERVICE, COMPUTING, NETWORK"
date: "2021-07-27 00:06:25"
author: nasa1515
tags: AZURE
categories: AZURE
---


머리말  
 
이번 포스트부터 본격적인 이론 내용에 대해서 알아보겠습니다.  
개인적으로 AZURE 사용하면서 많이 사용하게 될 서비스들에 대해서 정리해보았습니다.

<br/>

---

## ✔ Azure Service

인스턴스, 네트워크 등 3사 퍼블릭 클라우드가 제공하는 기능은 거의 동일 합니다.  


<br/>

* AZURE 전체 서비스

    ![azure-services](https://user-images.githubusercontent.com/69498804/104278532-19fda380-54ec-11eb-97fc-24f612788848.png)


<br/>


가장 일반적으로 사용량이 많은 것들만 정리 해봤습니다.

* 컴퓨팅
* 네트워킹
* 스토리지
* 데이터베이스
* 웹
* DevOps

<br/>


---

## ✌ 컴퓨팅(Computing)

컴퓨팅 서비스는 회사가 Azure 플랫폼으로 이전하는 주된 이유 중 하나입니다.  
Azure에서는 애플리케이션 및 서비스를 호스팅하는 다양한 옵션을 제공합니다.  
다음은 Azure의 컴퓨팅 서비스 예제입니다.

간단히 요약 : VM(인스턴스) SERVICE

<br/>


Azure 컴퓨팅 서비스 예제  

|서비스 이름|서비스 기능|
|:---|---------|
|Azure Virtual Machines|Azure에서 호스트된 Windows 또는 Linux VM(가상 머신)|
|Azure Virtual Machine Scale Sets|Azure에서 호스트된 Windows 또는 Linux VM의 스케일링|
|Azure Kubernetes Service|컨테이너화된 서비스를 실행하는 VM을 위한 클러스터 관리|
|Azure Service Fabric|Azure 또는 온-프레미스에서 실행되는 분산 시스템 플랫폼|
|Azure Batch|병렬 및 고성능 컴퓨팅 애플리케이션을 위한 관리 서비스|
|Azure Container Instances|서버 또는 VM을 프로비저닝하지 않고 Azure에서 실행되는 컨테이너화된 앱|
|Azure Functions|이벤트 기반의 서버리스 컴퓨팅 서비스|


<br/>

---

## 🐱‍🏍 네트워킹(Networking) 

*컴퓨팅 리소스를 연결하고 애플리케이션에 대한 액세스를 제공하는 것이 Azure 네트워킹의 주요 기능입니다.  
Azure의 네트워킹 기능에는 글로벌 Azure 데이터 센터의 서비스 및 기능을 외부 환경에 연결하는 다양한 옵션이 포함되어 있습니다.*

<br/>

Azure 네트워크 서비스 예제  

|서비스 이름|서비스 기능|
|:---|---------|
|Azure Virtual Network|수신 VPN(가상 사설망) 연결에 VM을 연결합니다.|
|Azure Load Balancer|애플리케이션 또는 서비스 엔드포인트에 대한 인바운드 및 아웃바운드 연결의 균형을 맞춥니다.|
|Azure Application Gateway|애플리케이션 보안을 강화하는 동시에 앱 서버 팜 제공을 최적화합니다.|
|Azure VPN Gateway|고성능 VPN 게이트웨이를 통해 Azure 가상 네트워크에 액세스합니다.|
|Azure DNS|매우 빠른 DNS 응답과 매우 높은 도메인 가용성을 제공합니다.|
|Azure CDN|전 세계 고객에게 고대역폭 콘텐츠를 제공합니다.|
|Azure DDoS Protection|Azure에서 호스트되는 애플리케이션을 DDoS(배포된 서비스 거부) 공격으로부터 보호합니다.|
|Azure Traffic Manager|전 세계 Azure 지역에 네트워크 트래픽을 분산합니다.|
|Azure ExpressRoute|고대역폭 전용 보안 연결을 통해 Azure에 연결합니다.|
|Azure Network Watcher|시나리오 기반 분석을 사용하여 네트워크 문제를 모니터링하고 진단합니다.|
|Azure Firewall|스케일링 성능에 제한이 없고 보안 수준이 높은 고가용성 방화벽을 구현합니다.|
|Azure Virtual WAN|로컬 사이트와 원격 사이트를 연결하는 통합 WAN(광역 네트워크)을 구축합니다.|


<br/>

---

## 🌹 스토리지

Azure는 네 가지 기본 유형의 스토리지 서비스를 제공합니다.

|서비스 이름|서비스 기능|
|:---|---------|
|Azure Blob Storage|비디오 파일이나 비트맵 같은 대규모 개체를 위한 스토리지 서비스|
|Azure File 스토리지|파일 서버처럼 액세스하고 관리할 수 있는 파일 공유|
|Azure Queue 스토리지|애플리케이션 간 메시지를 큐에 넣고 안정적으로 전달하기 위한 데이터 저장소|
|Azure Table Storage|스키마와 관계없이 비정형 데이터를 호스트하는 NoSQL 스토리지|

<br/>


위의 스토리지 서비스는 모두 몇 가지 공통적인 특성을 가지고 있습니다.
* 중복 및 복제 기능을 갖추고 있어 내구성 과 가용성이 뛰어납니다.  
* 자동 암호화와 역할 기반 액세스 제어를 통해 보안을 유지 합니다.
* 사실상 스토리지에 제한이 없으므로 확장성 이 뛰어납니다.
* 유지 관리 및 사용자에 대한 중요한 문제를 관리 하고 처리합니다.
* HTTP 또는 HTTPS를 통해 전 세계 어디에서든 액세스 할 수 있습니다.

<br/>

---

## 👍 데이터베이스


*Azure에서는 다양한 형식과 볼륨의 데이터를 저장하도록 여러 데이터베이스 서비스를 제공합니다.  
글로벌 연결을 통해 사용자는 이 데이터를 바로 사용할 수 있습니다.*

|서비스 이름|서비스 기능|
|:---|---------|
|Azure Cosmos DB|NoSQL 옵션을 지원하는 글로벌 분산형 데이터베이스|
|Azure SQL Database|자동 스케일링과 필수 인텔리전스, 강력한 보안을 통해 완벽하게 관리되는 관계형 데이터베이스|
|Azure Database for MySQL|고가용성과 보안이 포함되어 완벽하게 관리되고 스케일링 가능한 MySQL 관계형 데이터베이스|
|Azure Database for PostgreSQL|고가용성과 보안을 제공하며 완벽하게 관리되고 스케일링 가능한 PostgreSQL 관계형 데이터베이스|
|Azure Virtual Machines의 SQL Server|클라우드에서 엔터프라이즈 SQL Server 앱을 호스트하는 서비스|
|Azure Synapse Analytics|추가 비용 없이 모든 스케일링 수준에서 필수 보안을 제공하며 완벽하게 관리되는 데이터 웨어하우스|
|Azure Database Migration Service|애플리케이션 코드 변경 없이 데이터베이스를 클라우드로 마이그레이션하는 서비스|
|Azure Cache for Redis|자주 사용하는 정적 데이터를 캐시하여 데이터 및 애플리케이션 대기 시간을 줄이는 완전 관리형 서비스|
|Azure Database for MariaDB|고가용성과 보안이 포함된 완벽하게 관리되고 스케일링 가능한 MariaDB 관계형 데이터베이스|

<br/>

---

## 웹

*오늘날의 비즈니스 환경에는 훌륭한 웹 환경을 구축하는 것이 중요합니다.  
Azure에는 웹앱 및 HTTP 기반 웹 서비스의 빌드 및 호스트에 대한 최고 수준의 지원이 포함되어 있습니다. 다음 Azure 서비스는 웹 호스팅에 초점을 맞추고 있습니다.*

|서비스 이름|서비스 기능|
|:---|---------|
|Azure App Service|강력한 클라우드 웹 기반 앱을 신속하게 만듭니다.|
|Azure Notification Hubs|원하는 백 엔드에서 원하는 플랫폼으로 푸시 알림을 전송할 수 있습니다.|
|Azure API Management|개발자, 파트너 및 직원에게 API를 안전하게 대규모로 게시할 수 있습니다.|
|Azure Cognitive Search|이 완전 관리형 SaaS(Search as a Service)를 배포할 수 있습니다.|
|Azure App Service의 Web Apps 기능|중요 업무용 웹앱을 대규모로 만들고 배포할 수 있습니다.|
|Azure SignalR Service|실시간 웹 기능을 쉽게 추가할 수 있습니다.|

<br/>

---

## DevOps

*DevOps는 사람, 프로세스 및 기술 통합을 통해 소프트웨어 제공을 자동화하여 사용자에게 지속적인 가치를 제공합니다.  
Azure DevOps를 사용하여 애플리케이션에 연속 통합, 제공 및 배포를 제공하는 빌드 및 릴리스 파이프라인을 만들 수 있습니다. 리포지토리 및 애플리케이션 테스트를 통합하고, 애플리케이션 모니터링을 수행하고, 빌드 아티팩트로 작업할 수 있습니다.  
또한 추적 용 백로그 항목으로 작업, 인프라 배포를 자동화, Jenkins 및 Chef와 같은 타사 도구 및 서비스를 통합할 수 있습니다.  
이런 여러 기능은 Azure와 통합되므로 애플리케이션의 반복적인 배포가 가능하여 빌드 및 릴리스 프로세스가 간소화됩니다.*


|서비스 이름|서비스 기능|
|:---|---------|
|Azure DevOps|고성능 파이프라인, 무료 개인 Git 리포지토리, 구성 가능한 Kanban 보드, 광범위한 자동화 및 클라우드 기반 부하 테스트와 같은 개발 공동 작업 도구를 사용할 수 있습니다. 이전에는 Visual Studio Team Services로 알려져 있습니다.|
|Azure DevTest Labs|배포 파이프라인에서 바로 애플리케이션을 테스트하거나 시연하기 위해 주문형 Windows 및 Linux 환경을 신속하게 만들 수 있습니다.|

<br/>

---

## 마치며…  

이번 포스트에서는 제가 앞으로 사용 할 것 같은 서비스들을 정리해봤습니다.      
AWS, GCP와 용어들이 대부분 상이하다보니 용어를 익히는 것 부터가 시작입니다.  
다음 포스트에서 뵙겠습니다.



```toc
```