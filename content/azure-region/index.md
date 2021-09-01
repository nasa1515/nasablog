---
emoji: 🤦‍♂️
title: Region, availability zones [AZURE]
date: "2021-07-30 00:10:25"
author: nasa1515
tags: AZURE
categories: AZURE
---



<br/>

머리말  
 
이전 포스트에서 AZURE의 기초 이론 내용들을 설명했습니다.  
퍼블릭 클라우드를 한번이라도 경험해본 분이라면 region, availability의 개념은 어느정도 알고 있겠죠?...

 
--- 

## ✔ Azure Region

Azure만이 아니라 모든 Public Cloud는 데이터 센터를 포함하는   
전 세계 여러 위치인 Region에 리소스가 생성됩니다.  

* 간단하게 요약해 서비스를 사용 할 때 전세계 중 특정한 나라의 물리적 장비를 사용한다는 말입니다.

* 즉 Region이란 리소스를 생성 할 수 있는 지리적 영역을 의미합니다.

<br/>

2020년 6월 기준 AZURE의 Region 배포 상황
![regions-small](https://user-images.githubusercontent.com/69498804/105326382-08657b80-5c11-11eb-8cec-276832287132.png)


<br/>


### Special Azure regions

Azure에는 특수한 목적에 알맞게 APP을 빌드하려 사용하는 region이 있습니다.


* US DoD Central, US Gov Virginia, US Gov Iowa and more  
    미국 정부 기관, 파트너를 위한 격리되어있는 AZURE 리전


<br/>

* China East, China North, and more  
    Microsoft 및 21Vianet의 파트너 쉽 전용, MS가 센터를 관리하지 않음


---

## ✔ availability zones (AZ)

Azure Region 내에서 물리적으로 분리된 데이터 센터 입니다.  
Region과 AZ의 차이를 간단하게 설명하자면

* 전제조건 : 한국에 AZURE 데이터 센터는 총 3개이다.

    * Region : 한국 (국가)
    * AZ : Seoul IDC, Busan IDC, Daegu IDC (한 국가 내부의 가용성 영역)

<br/>


아쉽에도 2021년 1월 22일 기준 아직 한국에는 AZ가 없습니다..ㅠㅠ

<br/>

AZ를 지원하는 서비스는 두가지로 나눌 수 있습니다.  

* 영역 서비스 (Zonal Service)

    - 특정 영역에 서비스 (vm,ip,disk 등) 를 고정한다.

* 영역 중복 서비스 (Zone-redundant service)


    * 영역 내에서 자동 복제를 지원한다 (영역 스토리지, sql 등) 

<br/>


![az-graphic-two](https://user-images.githubusercontent.com/69498804/105436520-b705cc80-5ca2-11eb-8517-c10bd740da42.png)


<br/>


---

## 👍 availability Set (AS)


Availability Set은 <u>가용성 집합</u> 을 말합니다.  
<u>가용성 집합</u>이란 고가용성을 보장하기 위해 논리적인 그룹을 만드는 개념입니다.

고가용성이라는 말은 약간 생소하죠? 간단히 정리해보면 

```css
기본적으로 Cloud도 다수의 하드웨어에서 운영되는 서비스이기 때문에
하드웨어의 장애가 발생한다면 해당 하드웨어에서 구동중이던 
리소스는 다른 하드웨어로 이동되어 다시 부팅됩니다.  
이 과정동안 서비스는 중단되고 심하면 데이터 손실이 일어납니다.
이런 현상 때문에 필요한 것이 고가용성입니다.
고가용성은 하드웨어 이슈가 생겨도 App 또는 Service가
지연이나 장애 없이 정상적인 상태를 유지하는 것입니다.
```

MS의 AS는 아래 두가지로 나뉘어서 서비스됩니다.  

* ### Fault Domain (장애도메인)

    * 동일한 전원, 네트워크 스위치를 사용하는 도메인
    * 간단하게 말하면 물리적인 랙의 개념입니다.
    * 최대 3개까지 생성 가능

* ### Update Domain (업데이트 도메인)

    * 가상머신의 개념이라고 생각하면됩니다.
    * APP, Service의 업데이트 목적으로만 사용되는 도메인입니다.
    * 최대 20개까지 생성 가능

보통 AS는 LB와 같이 묶어서 사용하게 되는데 AS의 개념도 비슷합니다.

<br/>

두 도메인의 개념을 쉽게 이해 할 수 있는 영상입니다. - [출처](https://tikus.tistory.com/1)

![2222](https://user-images.githubusercontent.com/69498804/105452626-fb549500-5cc1-11eb-9b09-17cb3ce5adfc.gif)

그림과 같이 2개의 FD, 8개의 UD를 가지게 된다면 UD는 FD에 순서대로 나뉘어서 배포되게 됩니다.  
그리고 두개의 FD에 배포되어있는 UD는 모든 데이터를 공유하고 있어 하드웨어 이슈로 인한 장애를 방지합니다.  
이렇게 정리하고 보니 Bonding의 개념과 매우 비슷하네요

<br/>

---

### 추가적으로 Bespin Global에서 강의했던 영상이 있네요

<iframe width="560" height="315" src="https://www.youtube.com/embed/fWWucPeVX58" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>
<br/>

---

## ✌ 집합(AS)과 영역(AZ)의 차이 <a name="a4"></a>

<br/>

Availability Sets 과 Availability Zones의 차이점을 보자면  
우선 <u>집합</u>보다는 <u>영역</u>이 더 큰 단위의 개념이다.

* AS는 하드웨어 장애를 방지하기 위한 방식이다. 즉 단일 데이터 센터 안에서 여러 서버 랙 단위를 묶는 것이다.

* 그러나 AZ는 단일 데이터 센터 전체에 장애가 발생하는 경우를 방지하기 위해 여러 데이터 센터를 묶어 분산 구성하는 방식이다.


---

## 마치며…  


이번 포스트는 Region과 AZ,AS 에 대한 이론적인 내용을 알아봤습니다.  
사실 이미 Region에 대한 개념은 AWS,GCP에도 존재하고 있던거라  
다 알고 있었지만 AS의 경우 AZURE에만 존재하는 개념이다보니  
AS를 빼고는 복습하는 느낌으로 포스트를 작성해봤습니다.

---


```toc
```