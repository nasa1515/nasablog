---
emoji: 🤦‍♂️
title: "[AZURE] 가상 머신 확장 집합 (VMSS)"
date: "2021-08-01 00:37:25"
author: nasa1515
tags: AZURE
categories: AZURE
---



머리말  
  

VMSS는 제가 기존에 하던 IDC 업무를 그만두고 Cloud를 하게 만든 기술입니다.  
VMSS는 앞 포스트에서 진행했던 scale-Up & Down 처럼 미리 프로비전할 필요없이  
자동적으로 프로비전되어 고가용성을 제공합니다.  


--- 


## ✔ 가상 머신 확장 집합 (VMSS)


<br/>

### VMSS를 사용하는 이유?  

예를 들어 같은 역할을 하는 VM이 적게는 수십에서 많게는 수백대가 필요한 상황이 있을 수 있습니다.  
규모가 큰 인프라를 운영하거나, 평소에는 적은 수의 VM 이었다, 갑자기 많은 수의 VM으로 확장해  
사용해야 하는 애플리케이션도 있구요. (명절의 KTX, 블랙 프라이데이의 Amazon 등등)  
이렇게 VM 갯수가 많아지게 된다면 당연히 관리의 문제가 생기게 되는데  
한번에 만드는건 PowerShell이나 Cli, Terraform등을 이용해서 가능하기도 하지만  
결국 그 IAC를 짜는 것도 사람이기에...
VM의 Update, (Auto scale) 등 관리요소가 많아지고 스크립트의 갯수도 늘어납니다.  
이런 상황에 사용하는 것이 Azure Virtual Machine scale Set (VMSS)입니다.  

<br/>

### 주로 어떤 때 VMSS를 사용하게 될까?  

대표적으로 많이 쓰이는 두가지 예를 들어보자


1. 여러 VM을 손쉽게 생성하고 관리할 때  

    VMSS는 최대 1,000개의 VM 인스턴스를 지원합니다. (Custom Image의 경우 600개)  

<br/>

2. 리소스(트래픽) 변화에 따라 자동으로 애플리케이션 크기 조정이 필요할 때  

    Auto scale 기능을 지원하여 인스턴스의 성능 메트릭 기반으로 자동 조정됩니다.  

<br/>

### VMSS의 대표적 특징 요약 

- 최대 1000개의 VM 생성
- Custom VM을 이용하여 생성 가능 (Custom VM 이미지의 경우 600대가 최대)
- 서비스 중지 없이 업데이트 가능(Rolling Update)
- 동적으로 VM 인스턴스 갯수를 관리하여 비용 절감
- Auto Scale: 특정 조건에서 VM 개수를 자동으로 증가/감소
- Azure Load Balancer와 통합 (100대 이하)
- VMSS 전체 VM을 대상으로 Auto Scale, 업데이트가 가능하다.  
    개별 VM을 새로운 이미지로 업데이트하거나 자동 크기조정을 할 수는 없다.
- Managed Disk를 사용하는 것이 유리하다.

<br/>

---

## ✌ 오버프로비전(OverProvision)


VMSS에서 Auto-Scale의 크기 조정의 개념과 같이 익혀야 할 게 오버프로비전입니다.  

간단히 VM을 만들어 내는 걸 Provisioning이라고 합니다.  
앞에서 배운 개념대로 보면 SSD를 가진 하나의 VM은 SLA 99.5%를 가지게 됩니다.  
이걸 10대 생성한다면 (99.5)^10 = 95%, 100대면 (99.5)^100 = 60% 입니다.  
이론적으로 VM 생성이 실패 할 확률이 높아지는 것이고 실제로 큰 문제가 발생하진 않습니다.  
하지만 실제로 일어날 가능성 조차 배제해야 하기에 OverProvision을 합니다.  
단어 그대로 100를 만든다면 120대를 생성 요청하고 먼저 생성된 100의 VM만 남기는 식 입니다.  
그러나 여기서 추가로 만들기 요청된 20대에 대해서는 비용이 청구되지 않습니다.  

OverProvision은 기본값이 True이고 끌 수도 있습니다.  
그럼 OverProvision을 사용하지 않을 때는 어떤 상황일까?  

* 구독의 Core 제약이 걸렸을때
* Vnet의 Subnet 갯수가 적을때

<br/>

---

### VMSS의 Vnet


VMSS가 VM을 자동적으로 생성하지만 VM의 갯수가 많아지게 되면 네트워크에 문제가 있을 수도 있다.  
이유는 VMSS가 생성한 VM들은 Vnet 하나의 Subnet안에 모두 생성 되기 때문이다.  
문제란? 예를 들면, 실제로 300대를 생성해야 하는데 Subnet 설정이 10.0.0.0/24 (256개 영역)이라면?  
당연히 host의 수가 부족하기 때문에 오류가 발생한다.  
따라서 미리 가용범위 안의 Vnet과 Subnet을 계산하여 설계해놓고 VMSS에 할당 해야 합니다..  

<br>

더 자세한 내용은 만들면서 확인해봅시다!


---

## 🎉 VMSS 생성하기


<br/>


* ### LoadBalancer 생성하기 

    VMSS를 사용하기 위해서는 LB는 Default로 필요합니다. (메트릭 분산 용)

    ![캡처2222](https://user-images.githubusercontent.com/69498804/107487934-0d8f6800-6bca-11eb-88c1-194f4a322495.JPG)

<br/>
<br/>

* ### VMSS (집합) 생성하기   

    Create a Resource -> Scale Set 검색 후 생성

    ![캡처4444](https://user-images.githubusercontent.com/69498804/107488742-1f253f80-6bcb-11eb-95f5-aa1cb3a6c2f7.JPG)


    * Image : Market Place에 올려져 있는 이미지와 Custom한 이미지 모두 사용 가능


<br/>
<br/>

* #### Network 설정에서 LB Tab에서 YES를 선택해 부하분산 장치 뒤에 위치하게 합니다.

    ![캡처6565](https://user-images.githubusercontent.com/69498804/107490107-c656a680-6bcc-11eb-8ebc-9e8870171f93.JPG)

    * Backend PooL : BackendPool-NASA1515 이름으로 새로 생성  

<br/>
<br/>

* #### VMSS Scale 설정에서 Scale 설정을 진행합니다.

    ![캡처332322](https://user-images.githubusercontent.com/69498804/107490327-17669a80-6bcd-11eb-8b4b-0ab955139f09.JPG)

    * Initial instance Count : 최소 생성 VM의 갯수 
    * Scaling policy : Manual (기본), Custom은 매트릭 값들을 설정할 수 있습니다.  


<br/>
<br/>

* #### VMSS가 만들어졌다면 다음과 같이 관리 되는 VM 2대를 확인 할 수 있습니다.

    ![캡처111111](https://user-images.githubusercontent.com/69498804/107490885-d0c57000-6bcd-11eb-867a-4bcc5a530fbd.JPG)

<br/>


---

## 마치며…  


기존에 AWS,GCP의 Auto scale 기능은 알고 있었지만 Azure의 VMSS는 조금 더 개념이 확고합니다.  
기능 자체도 Auto scale만 가지고 있는게 아니라 VM을 묶어서 관리를 지원해준다는 개념이  
조금 더 좋게 느껴집니다. VMSS는 계속 사용해보면서 고급 Option 설정이나 구성을 포스트 할 것 같습니다. 

---

```toc
```