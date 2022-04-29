---
emoji: 🤦‍♂️
title: "[AZURE] Subscriptions, management Group, Resoucre Group"
date: "2021-07-29 00:06:25"
author: nasa1515
tags: CLOUD
categories: CLOUD
---




머리말  
 
AZURE를 차근차근 알아가고 있습니다.  
아직 AZURE의 기초단계라 그런지 가장 생소한 것은 구독(Subscriptions)입니다.  
AWS,GCP의 경우 크레딧이라고하는 것들의 리소스단위가  
AZURE에서는 구독(Subscriptions)으로 표현된다고 합니다.

---

## ✔ AZURE의 리소스 관리

구독이라는 개념을 완벽히 이해해야 앞으로의 지식을 받아 드리기 편할 것 같습니다.

<br/>

* Overview : *Subscriptions, Management group, resources, region image*  

    ![hierarchy](https://user-images.githubusercontent.com/69498804/105148728-0da9c400-5b46-11eb-98b1-4ece69e21a3e.png)

    각 기능들은 위 그림과 같이 하향식 계층 구조를 띄고 있습니다.  
    관리 그룹, 구독, 리소스 그룹, 리소스의 순서로 말이죠  

<br/>


### 간단한 설명!

<br/>

* ### 관리 그룹 (Management Group)    

    *여러개의 구독(Subscriptions)의 연결(ACCESS), 정책(policy)을 관리합니다.  
    관리 그룹에 속한 구독(Subscriptions)은 적용 조건을 자동으로 상속합니다.*

<br/>

* ### 구독 (Subscriptions)

    *사용자 그룹 + 사용자 계정에서 만든 리소스를 그룹화 합니다.  
    각 구독에 대한 리소스는 양에 대한 제한, 할당량이 있습니다.  
    조직에서는 구독을 사용해 팀, 프로젝트에서 만든 리소스와 비용을 관리합니다.*

<br/>

* ### 리소스 그룹 (Resource Group)  

    *리소스(Resources)는 리소스 그룹으로 결합됩니다.  
webapp, DB, storage account 같은 Azure 리소스가  
배포되고 관리되는 logical container 역할을 합니다.*

<br/>

* ### 리소스 (Resources)  

    *VM, Storage, SQL DB 같이 사용자가 생성하는 서비스 인스턴스 입니다.*

<br/>

----

## 👌 SUBSCRIPTIONS (구독)

<br/>


* 당연하게도 Azure를 사용하려면 구독(Subscriptions)이 필요합니다. 

* AZURE 제품, 서비스에 인증되고 권한이 부여된 엑세스를 제공합니다.  

* 리소스를 프로비전 할 수 있습니다. 

* Azure AD (Azure Active Diretory) or [Azure AD trusts Diretory] 안에 있는 Account와 연결된 서비스의 논리적 단위 입니다. 

<br/>

![subscriptions (1)](https://user-images.githubusercontent.com/69498804/105281929-82d1d380-5bf0-11eb-9ad9-ddce8bf85961.png)


계정에는 서로 다른 청구 모델, 엑세스 관리 정책을 적용하는 구독이 여러개 있습니다.   
이러한 상황에 두가지 유형의 구독 경계를 사용 할 수 있습니다.

<br/>

* 청구 경계 (Billing boundary)  

    *Azure 사용에 따른 Azure 계정 청구 방식을 결정합니다.*  
    *다양한 유형의 청구 요구 사항에 맞춰 여러개의 구독 생성이 가능합니다.*   
    *즉 각 구독의 대해 별도의 ``청구 보고``를 생성 및 전달 할 수 있습니다.*  

<br/>

* 엑세스 제어 경계 (Access control boundary)  

    *구독 수준에서 엑세스 관리 정책을 적용합니다.*  
    *다른 조직 구조를 위해 개별 구독을 만들 수 있습니다.*  
    *EX) 프로젝트 내에 고유한 구독 정책을 사용하는 두 부서가 있다면,   
    특정 구독으로 유저가 프로비전하는 ``리소스``의 엑세스를 제어할 수 있습니다.*  


---

### 추가 구독 생성하기

<br/>

아래와 같이 구별되는 리소스, 청구 관리를 위한 추가 구독을 만들 수 있습니다.  


* ### 환경 (Environments)   
    리소스를 관리할 때 [개발],[테스트], [보안]을 위해  
    별도의 환경을 설정하거나 데이터를 격리할 수 있습니다.   
    환경 단위는 리소스 제어가 구독 수준에서 발생합니다.

<br/>

* ### 조직 구조 (Organizational structures)   

    여러 organizational 구조로 구독을 생성 할 수 있습니다.   

    예를 들어 영업팀에는 저렴한 리소스로 제한하고  
        개발팀에는 전체 리소스를 허용 할 수 있습니다.


<br/>

* ### 청구 (Billing)  

    청구에 대한 추가 구독을 생성 할 수 있습니다.  

    비용은 구독 수준에서 우선적으로 집계되기에  
    요구에 따라 비용을 관리하고 추적하는 구독을 만들 수 있습니다.  
    예를 들어 상용화 제품용 구독과 개발, 테스트 용 구독을 나눌 수 있습니다.

<br/>

 구독의 한계치 설정 때문에 추가 구독이 필요할 수도 있습니다.


* ### 구독 제한 (Subscription limits)  

    구독은 몇가지 어려운 한계치를 가지고 있습니다.  
    특정 예로 Azure ExpressRoute의 구독 당 limit은 10개 라는 부분입니다.

<br/>



### 요구 사항에 따라 청구 사용자 지정  


여러 구독을 가지고 있는 경우 청구서 섹션을 구성할 수 있습니다.  

![billing-structure-overview](https://user-images.githubusercontent.com/69498804/105292291-2e345580-5bfc-11eb-887c-0f8ba3c1b8cf.png)


예를 들면 조직, 부서, 팀 , 프로젝트 별로 비용을 정리하고 하고 싶다면  
위 그림처럼 청구 계정 하나에서 여러 개의 청구서를 설정 할 수 있습니다.  
단 각각 청구 프로필을 생성해주어야 합니다.

<br/>

---


## ✌ Management Group (관리 그룹)

<br/>

많은 구독이 존재하는 경우 엑세스, 정책 등을 효율적으로 관리하기가 어렵습니다.  
따라서 관리그룹은 구독 이상의 범위 수준을 제공합니다. 

구독을 관리 그룹 컨테이너에 구성하고, governance 조건을 적용하면  
관리 그룹에 속해있는 모든 구독은 적용 된 조건을 자동으로 상속합니다.  
즉 일일히 설정 할 필요가 없다는 것이죠   
또한 관리 그룹내에 모든 구독은 하나의 Azure AD Tanant를 가져야 합니다.


<br/>





* 관리 그룹 과 구독의 계층 구조

    ![management-groups-and-subscriptions](https://user-images.githubusercontent.com/69498804/105300356-237ac000-5bfe-11eb-9979-dd9a291f7abb.png)

    관리 그룹을 사용 하는 가장 쉬운 방법을 예로 설명하겠습니다.  
    프로덕션 그룹에서 VM 생성 위치를 (한국)으로 제한하는 정책을 만들면  
    이후엔 자동적으로 프로덕션 그룹 하위에 있는 구독, VM에 상속 됩니다.  
    당연히도 리소스, 구독 소유자는 보안 정책을 변경 할 수 없게되죠. 


<br/>

### 관리 그룹에 대한 중요한 사실

* 단일 디렉토리에서 지원 가능 한 관리 그룹 수는 10,000개 입니다.  

* 관리 그룹 트리에서 지원하는 최대 깊이 수준은 6입니다.  
* 각 관리 그룹 및 구독은 하나의 부모만 가질 수 있습니다.  
* 각 관리 그룹에는 여러개의 자식을 가질 수 있습니다.  
* 모든 구독, 관리 그룹은 단일 디렉토리의 범위 안에 위치합니다.

<br/>


---

## 😢 Azure Resources

<br/>

리소스 (Resources)는 간단하게 AZURE의 "단일 서비스들" 이라고 이해 하면 됩니다.  
Azure로 사용, 관리 가능한 VM, Storage acconut, DB, VNET 모두 리소스입니다.


<br/>

## ✔ Azure Resources Group

리소스 그룹은 AZURE를 사용하기 위한 필수 요소 입니다.  

리소스 그룹을 간단히 말하면 리소스의 논리 컨테이너? 입니다  
즉 구독을 통해 만든 리소스의 모든 것을 묶었다고 보면 됩니다.  

Resource Group과 Resources에는 아래와 같은 특성을 갖습니다.

* 모든 리소스는 리소스 그룹에 있어야합니다.  
* 리소스는 하나의 리소스 그룹에만 존재해야 합니다. (단일) 
* 동일한 구독 안에서 리소스 그룹의 이름은 고유해야 합니다. 
* 리소스 그룹과 리소스의 Region이 다를 수도 있습니다.
* 리소스 그룹의 수명이 곧 리소스의 수명입니다.
* 한 리소스 그룹의 리소스가 다른 리소스 그룹의 리소스와 상호작용할 수 있습니다.
* 한 리소스 그룹의 리소스를 다른 리소스 그룹으로 이동할 수 있습니다.
* 리소스 구룹과 리소스의 관리를 위임할 수 있고, 관리 수준을 정의할 수 있습니다.

<br/>

* NOTE : Resource Group을 만들 때 Regions 지정이 필요한 이유

    ```css
    Resource Group은 단지 논리적인 개념일 뿐이고 리소스와 위치가 달라도 된다면
    왜 Resource Group을 생성할때 Region을 지정해야 할까요?

    해답 : 우리가 Resource Group에서 확인하는 Resource list는 실제 Metadata 입니다.
    즉 Resource Group은 Resoure의 Metadata를 저장하는 것이며
    Resource Group의 Regions이 그 Metadata가 저장되는 위치입니다. 
    ```

<br/>


* Logical grouping  

    리소스 그룹의 용도는 리소스를 간편하게 관리하고 구성하는 것입니다.  
    그러나 무수히 많은 리소스를 질서있고 체계적으로 관리하기 위해서는 Logical grouping (논리 그룹화)가 필요합니다.

    ![resource-group](https://user-images.githubusercontent.com/69498804/105316667-8bcca000-5c04-11eb-8cde-9c33a2757c5c.png)



<br/>

* Life cycle

    리소스 그룹을 삭제하면 그룹에 속해 있던 리소스들도 모두 삭제됩니다  
    때문에 Life Cycle로 관리하면 TESTING 환경에서 유용하게 사용됩니다.

<br/>


* Authorization

    리소스 그룹은 RBAC의 권한을 적용하는 범위 입니다.  
    RBAC를 통해 필요한 리소스만 사용하도록 엑세스를 제한 할 수 있습니다.  

<br/>

---

## 🎉 Azure Resource Manager

Azure Resource Manager는 배포 및 관리 서비스 입니다.  
계정에서 리소스를 만들고, 업데이트하고, 삭제할 수 있는 관리 계층을 제공합니다.  

Azure 도구, API, SDK에서 요청을 보내면 Resource Manager에서 요청을 받습니다.   
Resource Manager가 요청을 인증하고, 권한을 부여합니다.  


아래 그림을 보면 이해가 쉽습니다.


![consistent-management-layer](https://user-images.githubusercontent.com/69498804/105319055-a6ecdf00-5c07-11eb-8d36-5579fe1ddf6d.png)

* 그림과 같이 Portal에서 사용할 수 있는 모든 기능은 Powershell, Cli, rest client, SDK를 통해 사용할 수 있습니다.


<br/>

### 장점

* 스크립트가 아닌 template을 통해 인프라를 관리 합니다. (Resource Manager template)은 배포 정의 JSON 파일입니다)

* 모든 리소스를 개별적이 아닌 그룹으로 배포, 관리, 모니터링 합니다.

* 리소스가 일관된 상태를 유지하기 위해 Life cycle 내내 재 배포합니다.

* 리소스의 배포순서를 위해 리소스 사이의 종속성을 정의합니다.

* 리소스에 태그를 적용해 구독의 모든 리소스를 논리적으로 구성합니다.

* 동일한 태그를 가진 리소스 그룹의 비용을 확인, 청구를 명확히 구분합니다.

<br/>

---

## 마치며…  


이번 포스트에서는 Azure의 구독, 관리그룹의 개념에 대해서 설명해봤습니다.  
포스트를 작성했지만 실습전인 지금은 아직도 생소한게 사실입니다.  
다음 포스트에서는 이번 포스트에서 설명하지 못한  
리소스와 리소스 매니저에 대한 포스트입니다.

---

```toc
```