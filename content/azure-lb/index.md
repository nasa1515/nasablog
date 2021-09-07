---
emoji: 🤦‍♂️
title: Application GateWay, LoadBalancer [AZURE]
date: "2021-08-01 00:34:25"
author: nasa1515
tags: AZURE
categories: AZURE
---



머리말  
  

아마 클라우드나 IDC나 어떠한 서비스를 운영하는데 가장 중요한건 부하분산이라고 생각합니다.  
어떤 서비스든 전체적인 서비스에 대한 안정성이 가져야 하는 가장 중요한 것이기 때문이죠   
그래서 이번 포스트에서는 AZURE에서 제공하는 L7 LB Application GateWay에 대해서 포스트 했습니다.  


 
---


## ✔ Application GateWay 


Application GateWay는 웹 트래픽 부하 분산 장치, 즉 L7 LB 입니다.   
요청 URL이나 호스트 헤더등의 HTTP 특성을 기반으로 트래픽을 웹 서버 풀로 보내 부하 분산합니다.  

<br/>


### 구성요소  

APPlication GateWay의 구성요소는 다음과 같습니다.  


![how-application-gateway-works](https://user-images.githubusercontent.com/69498804/107314961-1ce2b880-6ad9-11eb-9909-88b48e5f4627.png)



* Front-end IP Address : 공용 IP(필수), 개인 IP(선택)모두 할당 가능합니다. AG위치와 Vnet,PIP의 위치는 같아야 합니다.  

* HTTP/HTTPS 수신기 : 들어오는 요청을 받기 위해 하나 이상을 추가합니다.  

* Routing rules : Rules을 사용해 허용 트래픽을 다른위치로 리디렉션 합니다.  

* HTTP 설정 :AG와 Back-end pool 간의 암호화 여부를 설정합니다.  

* 상태 프로브 :Back-end pool에서 부하를 받아 줄 서버를 결정합니다. (정상 반환 코드 : 200~399)    

* Back-end Pool : NIC, PIP,INP,FQDN,VM set을 포함해 요청을 백 엔드 서버로 라우팅합니다.  

* WAF(Web Application Firewall) : 수신기가 요청을 받기 전 공격을 감지합니다. 

<br/>

이론적으로 나열해봤자 이해하는 시간만 길어지니깐 일단 만들어봅시다

<br/>

---

## ✌ Application GateWay 생성 

<br/>

[Create a Resoure] -> [Network] -> [Application Gateway] Tab 으로 이동해 생성합니다.

![캡처3](https://user-images.githubusercontent.com/69498804/107316549-320d1680-6adc-11eb-9903-bec6f8ba89f0.JPG)

<br/>
<br/>

AG에서는 2개의 Subnet이 필요합니다. 저는 아래처럼 SubNet을 새로 생성했습니다. 
 
![캡처4](https://user-images.githubusercontent.com/69498804/107316957-122a2280-6add-11eb-954d-6489f59367c6.JPG)

* 1.AG01-Subnet-nasa1515 : AG 용 Subnet
* 2.BE-Subnet-nasa1q515 : Back-end Server 용 Subnet

<br/>
<br/>


🤳 SubNet 설정까지 완료되었으면 Front-end 설정을 진행합니다.

<br/>
<br/>

Front-end Tab에서 새로운 PIP를 생성, 설정 후 Back-end 설정으로 넘어갑니다.

![캡처5](https://user-images.githubusercontent.com/69498804/107317214-9381b500-6add-11eb-92fe-c26ff8e8ac39.JPG)

<br/>
<br/>


### Back-end PooL 설정

<br/>


Back-end Pool 설정에서 아래와 같이 새로운 PooL을 생성합니다.

![캡처6](https://user-images.githubusercontent.com/69498804/107317506-23276380-6ade-11eb-85cc-59e25319d952.JPG)

* Add backend pool without targets : AG를 생성 후에 타겟을 추가 합니다.

<br/>
<br/>


### Configuration Tab

<br/>


Configuration Tab에서 Routing Rules을 추가 합니다.

![캡처22](https://user-images.githubusercontent.com/69498804/107317722-8c0edb80-6ade-11eb-9c1c-1ae01682d9e8.JPG)

<br/>
<br/>

Listener (수신기) 설정에서 Frontend IP 설정을 Public으로 설정합니다.

![캡처33](https://user-images.githubusercontent.com/69498804/107317928-f162cc80-6ade-11eb-9c1b-a53fb6d2668d.JPG)


<br/>
<br/>

Backend Targets 설정에서 이전에 설정했던 Backend 설정을 추가하고, HTTP 설정을 추가합니다.

![캡처44](https://user-images.githubusercontent.com/69498804/107318067-3ab31c00-6adf-11eb-9393-8827126b2011.JPG)


<br/>
<br/>

다음과 같이 HTTP 설정을 추가하고 Routing Rules을 저장합니다.

![캡처444](https://user-images.githubusercontent.com/69498804/107318128-66360680-6adf-11eb-9717-e2ca76d16ec4.JPG)

<br/>
<br/>

다음과 같이 ReView Tab을 확인하고 AG를 생성합니다.

![캡처3](https://user-images.githubusercontent.com/69498804/107318410-0f7cfc80-6ae0-11eb-8cc6-7b0d67d60823.JPG)


<br/>
<br/>

🤳 AGW는 생성하는데 5~8분정도 소요됩니다. 


<br/>


---


### AG 생성 후 Back-end Target 생성 및 추가  


아까 Back-end를 생성할때 Target이 없이 생성했기에 Target을 만들어 추가해줍시다.  

<br/>


1. VM2개 생성, (VM 생성 시 Networking Tab의 SubNet이 AG와 겹치지 않게 해야함)

![캡처4](https://user-images.githubusercontent.com/69498804/107318926-25d78800-6ae1-11eb-8509-f26dcc6fe2e5.JPG)

<br/>
<br/>

2. 테스트를 위한 IIS 설치하기 위해 Power Shell을 엽니다.

![캡처6](https://user-images.githubusercontent.com/69498804/107319469-3dfbd700-6ae2-11eb-83a5-a893e8e42b09.JPG)

<br/>
<br/>


다음 스크립트를 실행하여 VM에 IIS를 설치합니다.

```
Set-AzVMExtension `
-ResourceGroupName AG01-NASA1515 `
-ExtensionName IIS `
-VMName VM01-NASA1515 `
-Publisher Microsoft.Compute `
-ExtensionType CustomScriptExtension `
-TypeHandlerVersion 1.4 `
-SettingString '{"commandToExecute":"powershell Add-WindowsFeature Web-Server; powershell Add-Content -Path \"C:\\inetpub\\wwwroot\\Default.htm\" -Value ($env:computername)"}' `
-Location EastUS
```

<br/>
<br/>

설치가 완료되었습니다. (두 개의 VM에 모두 진행해야 합니다.)

![캡처5](https://user-images.githubusercontent.com/69498804/107320011-35f06700-6ae3-11eb-904e-beb6f3c2b38b.JPG)


<br/>
<br/>

3. AG의 Blade를 접속 후 생성한 백 엔드 서버 Pool에 접속합니다.

![캡처444324](https://user-images.githubusercontent.com/69498804/107320567-4b19c580-6ae4-11eb-99aa-d3ae437cf3a3.JPG)


<br/>
<br/>

다음과 같이 VM 2개를 추가하고 저장합니다.

![캡처44434343](https://user-images.githubusercontent.com/69498804/107320518-2e7d8d80-6ae4-11eb-929a-dd40490068af.JPG)

<br/>
<br/>


---

## 👏 AG TEST!!

AG가 제대로 구성되었는지 확인하기 위해 VM내에 IIS를 설치했으니 이제 테스트 해봅시다.  

<br/>


설정한 AG의 OverView Tab에서 PIP 정보를 확인하고 해당 PIP로 접속해봅시다.

![캡처5544554](https://user-images.githubusercontent.com/69498804/107320724-9fbd4080-6ae4-11eb-99af-3e54455d822b.JPG)

<br/>
<br/>

다음과 같이 IIS 페이지가 정상적으로 구동되고 있습니다.

![vm1](https://user-images.githubusercontent.com/69498804/107320859-e14deb80-6ae4-11eb-92fd-481735c929b5.JPG)

<br/>
<br/>

물론 AG이기 때문에 F5(새로고침)을 여러번 하면 다음과 같이 VM2로 트래픽이 분산됩니다.

![vm2](https://user-images.githubusercontent.com/69498804/107320906-fa569c80-6ae4-11eb-9d1d-18f5e57417e2.JPG)

<br/>

### 테스트 완료!

---

## ✔ LoadBalancer 

기본적으로 Front-end로 들어오는 Inbound Traffic을 Backend-PooL로 분산하는 동작방식은  
이전 포스트에서 다뤘던 L7 LB인 Application Gateway와 동일합니다.  

다만 LoadBalancer의 알고리즘은 배포 모드에 따라 결정됩니다. 기본 값은 아래 그림처럼 튜플 해시로 동작합니다  

<br/>

Azure LoadBalancer의 동작

![load-balancer-distribution](https://user-images.githubusercontent.com/69498804/107323107-0cd2d500-6ae9-11eb-8513-8a934c22f6f0.png)


<br/>
<br/>

L4 LB는 아래와 같이 Public, Internal 두가지로 설정 할 수 있습니다.    

![캡처2](https://user-images.githubusercontent.com/69498804/107323867-64257500-6aea-11eb-9891-5232c5802636.JPG)


Public LB : 외부의 트래픽을 내부로 분산시키는 역할  
Internal LB : 대표 Private IP를 가지고 내부 VM의 트래픽을 분산시키는 역할  

* 예를 들면 Public LB단에 연결된 VM은 Web으로만 사용하고
* Internal LB단은 DB 연결로만 사용해서 Private하게 설정이 가능합니다.  


<br/>
<br/>

이제 LB를 생성해보면서 자세한 Option들에 대해서 설명하겠습니다!!.

<br/>

---

## 🤞 LoadBalancer 생성

<br/>


Create a Resource Tab에서 LoadBalancer를 만들어 줍니다.
    
![캡처3333](https://user-images.githubusercontent.com/69498804/107325659-7ce35a00-6aed-11eb-87e6-d11e40c90b46.JPG)


* TYPE : 위에서 설명한 Internal, Public 두가지를 선택할 수 있습니다.

* SKU (가격 계층) : Basic, Standard 두가지를 선택 할 수 있습니다. 
    * Basic : SLA를 지원하지 않습니다
    * Standard : SLA : 99.99%, 만약 AZ를 사용한다면 사용해야함.

* PIP의 경우 새롭게 만들었습니다.

<br/>
<br/>

### Back-end PooL 생성하기  

<br/>


LB의 설정 Tab에서 Back-end PooL을 생성합니다.

![캡처555](https://user-images.githubusercontent.com/69498804/107451079-e31dba80-6b89-11eb-8dda-0d27e4c7f556.JPG)

* 저는 미리 생성해놨던 VM 3를 PooL에 추가했습니다.

<br/>
<br/>

추가된 backend-PooL 확인

![캡처2](https://user-images.githubusercontent.com/69498804/107325960-0004b000-6aee-11eb-9e72-d27855a22a1c.JPG)

<br/>
<br/>

---

### HealthProbe [상태 프로브] 생성하기  

HealthProbe는 Back-end PooL의 VM 상태를 모니터링 하는 기능입니다.  

<br/>

동일하게 LB의 Configure Tab에서 HealthProbe 설정을 추가합니다.

![캡처3](https://user-images.githubusercontent.com/69498804/107326110-40fcc480-6aee-11eb-9539-7c9f93c3e3f6.JPG)

* 해당 설정은 VM에게 2번 (Interbal 15초)간 응답이 없으면 Traffic을 분산하지 않습니다.


<br/>

---

### load balancer rule [부하 분산 규칙] 생성

Back-end PooL의 VM에 Traffice을 분산 시키는 방법을 정의합니다.

<br/>

동일하게 LB의 Configure Tab에서 load balancer rule 설정을 추가합니다.

![캡처](https://user-images.githubusercontent.com/69498804/107452641-ed8d8380-6b8c-11eb-8493-a504ddd28f25.JPG)


* Port : LB에서 Traffic을 받을 Port
* Backend Port : Backend-PooL에 연결된 VM들이 사용할 Port
* Session persitence : 부하분산 하는 규칙을 3가지 정할 수 있음

<br/>


---

## 🙌 LB TEST 

위에서 LB에 필요한 Backend-Pool, HealthProbe, LB Rule을 모두 설정했으니 테스트를 해보겠습니다.  
간단하게 TEST를 하기 위해 VM들에 IIS를 설치를 진행하겠습니다.

<br/>


VM 1,2,3에 Bastion으로 접속해 Windows PowerShell을 실행합니다.


![캡처333](https://user-images.githubusercontent.com/69498804/107330024-5ffe5500-6af4-11eb-8282-411e322441b2.JPG)


<br/>
<br/>


PowerShell 창에서 아래 명령을 실행하여 다음을 수행합니다.

* IIS 서버를 설치합니다.
* 기본 iisstart.htm 파일을 제거합니다.
* VM 이름을 표시하는 새 iisstart.htm 파일을 추가합니다.

```css
# install IIS server role
Install-WindowsFeature -name Web-Server -IncludeManagementTools

# remove default htm file
remove-item  C:\inetpub\wwwroot\iisstart.htm

# Add a new htm file that displays server name
Add-Content -Path "C:\inetpub\wwwroot\iisstart.htm" -Value $("Hello World from " + $env:computername)
```

![4444](https://user-images.githubusercontent.com/69498804/107333027-3fd09500-6af8-11eb-886e-30d324850e10.JPG)

<br/>
<br/>

이후 LB의 PIP로 접속하면 정상적으로 WEB Page가 접속됩니다!

![캡처333444](https://user-images.githubusercontent.com/69498804/107337984-609be900-6afe-11eb-9855-82cc54be5673.JPG)


<br/>

---

### 추가 : Inbound NAT 설정

<br/>


LB에서 Inbound NAT를 설정하면 PIP를 통해 특정 VM에 접속이 가능합니다.


![캡처2](https://user-images.githubusercontent.com/69498804/107454011-8b824d80-6b8f-11eb-83ea-45d7fa71554d.JPG)

SSH 연결을 위한 Inbound NAT를 설정했습니다.

* Port : Port Mapping을 위해 임의의 포트로 지정합니다.
* Target VM : 연결할 VM을 설정합니다.  
* Target Port : VM과 연결할 Port를 지정합니다.

<br/>
<br/>


### 추가 정보 사항 

Azure의 L4 LoadBalancer는 RR(Round-robin) 방식의 Routing이 지원되지 않습니다.  
기본 방식이 HASH 이고 ClientIP, ClientIP & Protocol로 총 3가지 방식이 있습니다.   
위의 3가지 방식에서 HASH를 제외하고는 Client <-> Server 매칭의 방식이기 때문에   
제대로된 LoadBalancing이 되지 않을 수 있습니다.   
따라서 RR 방식의 Routing 방식을 사용하고 싶으면 Application Gateway나 Traffic Manager를 사용해야합니다.

<br/>

---

## 마치며…  


사실 모든 기능들이 줄줄이 이론을 써놓으니깐 어려워보이는 거지  
실제로 동작원리와 설정방법은 그렇게 어렵지 않다는 것을 계속 깨닫고 있습니다.

---

```toc
```