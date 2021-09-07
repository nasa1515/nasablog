---
emoji: 🤦‍♂️
title: Availability (가용성) VMSS, SCALE [AZURE]
date: "2021-08-01 00:36:25"
author: nasa1515
tags: AZURE
categories: AZURE
---



머리말  
  

지금까지 단일로 만든 VM은 장애가 일어나면 워크로드 대응이 쉽지 않습니다.  
이번 포스트에서는 Azure에서 생성한 VM에 대한 크기 조정과 가용성 구현에 대해서 알아보겠습니다.  
가용성을 구현하는 방법은 여러가지가 있는데 이번 포스트는 Scail-up,down과 가용성에 대해 다룹니다.    
이미 이전 Region & availability zones 포스트에서 가용성에 대한 설명은 했었지만 부족한 부분이 많아서 다시 설명합니다.  

 
---


## ✔ VM Scail-Up & Scail-Down

Scail-Up & Down 은 이미 배포된 VM의 CPU,MEM,DISK 등을 높거나, 낮게 변경하는 작업입니다.  
가장 간단한 방법으로 가용성을 유지하는 방법이라 아래와 같은 시나리오에 사용합니다.  

* 서비스를 제공하는 VM의 사용률이 전반적으로 낮은 경우 (크기 감소로 비용 감소)  
* VM의 갯수를 늘리지 않고 Scail-Up으로도 트래픽을 충분히 소화할 수 있는 경우  

<br/>

VM을 Scail-Up & Down 등 크기를 조정하는 일반적인 프로세스는 아래 3단계입니다.  

* VM 할당 해제
* VM 크기 조정
* VM 재시작

<br/>


VM을 실행 중일 때 크기를 조정하면 현재 HOST-Cluster가 지원하는 시리즈로만 변경 가능합니다.  
때문에 할당을 해제해야 현재 Region에서 사용 가능한 모든 옵션을 볼수 있습니다.  

---

### 그럼 바로 Scail-Up 실습을 진행해봅시다.  

이전 포스트에서 생성한 VM01-linus-nasa1515 VM을 크기 조정 해보겠습니다.


<br/>
<br/>

첫번째로 VM 서버의 할당을 해제합니다. (중지)

![캡처1](https://user-images.githubusercontent.com/69498804/107300405-cf585280-6abc-11eb-9e1d-ed44c79292a8.JPG)

<br/>
<br/>

이제 VM의 Size Blade에서 여러가지의 Size를 설정 할 수 있습니다.

![캡처2](https://user-images.githubusercontent.com/69498804/107300577-252cfa80-6abd-11eb-8ab9-c196ea7f20a7.JPG)

<br/>
<br/>

원하는 Size로 Resize하면 아래와 같이 VM의 Size가 변경됩니다.

![캡처3](https://user-images.githubusercontent.com/69498804/107300792-881e9180-6abd-11eb-93d8-f808494796c9.JPG)


<br/>

---

## 🤞 VM Availability [가용성 구현]

가용성(Availability)는 서버와 네트워크, 프로그램 등 시스템이 정상적으로 사용 가능한 정도를 뜻합니다.  
즉 이상없이 서비스가 가동되는 것이 목적입니다.  
이를 위해 Azure에서는 VM의 가용성이 영향받을 수 잇는 3가지 시나리오를 정리했습니다.  

* 계획되지 않은 하드웨어 유지 보수
* 계획된 유지보수 (MS의 정기적인 업데이트, 보안패치)
* 예측하지 못한 서버다운  

<br/>

Single VM, Availability set, Availability zone, Region Pairs의 SLA 비교

![azure-availability-zones_0](https://user-images.githubusercontent.com/69498804/107301292-915c2e00-6abe-11eb-856d-c721dff85eff.jpg)

* SLA = Service-level agreements (서비스 레벨 수준)


<br/>

<br/>

---

## 👌 Availability Set [가용성 집합]

Availability Set [가용성 집합]은 단일 데이터센터에서 가상 머신의 중복성과 가용성을 제공하는 서비스 입니다.    
즉 특정 물리서버에 호스팅, 특정 랙에 수납되어있으면 각각 단일 실패 지점이 됩니다.  
Azure에서는 이를 보완하고자 AS를 제공합니다.  
AS는 VM을 Provision 할때만 사용가능 하며, AZ 없이 만든 VM은 다시 생성해야합니다.

MS의 AS는 아래 두가지로 나뉘어서 서비스됩니다.  

<br/>


### Fault Domain (장애도메인)

* 동일한 전원, 네트워크 스위치를 사용하는 도메인
* 간단하게 말하면 물리적인 랙의 개념입니다.
* 최대 3개까지 생성 가능

<br/>
<br/>

### Update Domain (업데이트 도메인)

* 가상머신의 개념이라고 생각하면됩니다.
* APP, Service의 업데이트 목적으로만 사용되는 도메인입니다.
* 최대 20개까지 생성 가능

보통 AS는 LB와 같이 묶어서 사용하게 되는데 AS의 개념도 비슷합니다.

<br/>
<br/>

두 도메인의 개념을 쉽게 이해 할 수 있는 영상입니다. - [출처](https://tikus.tistory.com/1)

![2222](https://user-images.githubusercontent.com/69498804/105452626-fb549500-5cc1-11eb-9b09-17cb3ce5adfc.gif)

그림과 같이 2개의 FD, 8개의 UD를 가지게 된다면 UD는 FD에 순서대로 나뉘어서 배포되게 됩니다.  
그리고 두개의 FD에 배포되어있는 UD는 모든 데이터를 공유하고 있어 하드웨어 이슈로 인한 장애를 방지합니다.   
이렇게 정리하고 보니 Bonding의 개념과 매우 비슷하네요

<br/>


---

### 그럼 이제 AS를 생성해봅시다


<br/>

우선은 AS에 필요한 Vnet과 Subnet들을 추가로 생성해주겠습니다.

![캡처4](https://user-images.githubusercontent.com/69498804/107302522-db461380-6ac0-11eb-974e-8438e18e0502.JPG)

* IP1개에 Subnet2개를 생성해줍니다!


<br/>
<br/>

이후 새로운 VM을 AS 세팅 후 배포 합니다. (이후 동일한 VM1개를 추가로 배포)

![캡처1](https://user-images.githubusercontent.com/69498804/107303576-aaff7480-6ac2-11eb-83aa-c5e3e53f8008.JPG)

<br/>
<br/>

새로 만들 AS 세팅을 다음과 같이 설정합니다.

![캡처2](https://user-images.githubusercontent.com/69498804/107303631-cb2f3380-6ac2-11eb-98ec-63534707eec2.JPG)


<br/>
<br/>

배포가 완료된 VM의 Availability + Scaling Tab에서 설정을 확인합니다.

![캡처3](https://user-images.githubusercontent.com/69498804/107304063-aedfc680-6ac3-11eb-8c47-8499832a401b.JPG)

* FD/UD의 Index 번호는 0번부터 시작됩니다.


<br/>
<br/>

새로 생성한 AS의 Overview에서 다음과 같이 배포된 VM의 배치 상태를 확인 할 수 있습니다.

![캡처4](https://user-images.githubusercontent.com/69498804/107304195-f1a19e80-6ac3-11eb-9f58-73b7b61ea274.JPG)


<br/>

----

## 👍 Availability Zone [가용성 영역]

Availability Zone 은 하나 이상의 IDC로 구성된 3개 이상의 영역(Zone)에 걸쳐 FD/UD를 "자동" 배포 합니다.  
가용성 영역을 통해 영역간의 APP 데이터를 복제해 IDC의 장애가 발생해도 가용성을 유지 할 수 있습니다.  

예를 들어 정상 서비스를 위해 VM이 2대 필요하다고 가정합시다.   
그러면 AZ를 2곳 사용한다면 각 영역에 2개씩 총 4대를 배포해야합니다. 3곳이면 6개겠죠?  

* 쉽게 생각하면 각 지역마다 AS가 존재하는데 해당 렉에 나눠서 배포한다고 이해가 가능합니다.

    ![az-graphic-two](https://user-images.githubusercontent.com/69498804/105436520-b705cc80-5ca2-11eb-8517-c10bd740da42.png)


<br/>
<br/>


### 이론적인 개념은 위의 그림으로 쉽게 이해가 가능하니 바로 만들어보죠  


Vnet의 경우 AS를 만들때 사용했던 Vnet을 그대로 사용하겠습니다.  

<br/>

VM을 2대 배포합니다. (AZ를 사용하는 설정으로!)  

![캡처5](https://user-images.githubusercontent.com/69498804/107305088-a1c3d700-6ac5-11eb-9c05-1a0bd8d0c6fc.JPG)

<br/>
<br/>

VM 설정 옵션은 AS와 동일합니다, 정상 배포가 되면 VM에서 아래처럼 확인 가능합니다.

![캡처2](https://user-images.githubusercontent.com/69498804/107306207-d5076580-6ac7-11eb-92c8-158629fe49f7.JPG)

<br/>

---

```toc
```