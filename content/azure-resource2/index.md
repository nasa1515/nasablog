---
emoji: 🤦‍♂️
title: "[AZURE] RG 생성, Resource 생성, TAGING, Resoureces 이동하기"
date: "2021-07-30 00:30:25"
author: nasa1515
tags: AZURE
categories: AZURE
---



머리말  
 
사실 이론적인 내용을 모두 다루고 난 다음에 실습으로 넘어가려고 했지만  
빠른 이해를 위해서는 실습과 이론이 병행되어야 할 것 같아서  
Azure Potal 실습과 병행하여 포스트 하겠습니다.  
이번 포스트는 리소스 태그, 리소스 이동하기 등 리소스에 관련된 실습 내용입니다.  

 
---


## ✔ Azure Resoureces Group 생성 

<br/>

Azure의 모든 리소스를 생성한거나 사용하기 위해서는 리소스를 관리하는 RG가 먼저 필요합니다.  
이론적인 내용은 Azure 시리즈의 [Resource, Resource Manager](https://nasa1515.tech/azure-subscriptions) 포스트를 확인해주세요  



<br/>

* Azure Portal에서 아래 보이는 Resources Group 메뉴로 접속합니다!

    ![RERR](https://user-images.githubusercontent.com/69498804/106970420-23e39100-6790-11eb-962e-9d2fabc5b02c.JPG)


<br/>

* Resources Group Tab에서 만들기를 선택합니다.

    ![2](https://user-images.githubusercontent.com/69498804/106970741-e16e8400-6790-11eb-80a0-076406482b89.JPG)

<br/>

* 아래와 같이 RG Create TAB에서 구독, 그룹명, Regions 을 선택해줍니다.


    ![3](https://user-images.githubusercontent.com/69498804/106970860-1da1e480-6791-11eb-8167-cbc96b2aeb54.JPG)

    저는 NASA-RG01 이라는 그룹명으로 RG를 생성하겠습니다.


<br/>

* 정상적으로 NASA-RG01이라는 이름으로 미국동부지역에 생성이 되었습니다.

    ![44](https://user-images.githubusercontent.com/69498804/106971109-93a64b80-6791-11eb-8e6e-060377bf8228.JPG)

<br/>

---

## ✌ Resource 생성

<br/>

이제 Resource를 관리하기 위한 RG의 생성이 완료되었으니 Resource를 생성해보겠습니다.  
간단하게 Public IP Address 를 하나 생성해보겠습니다.  


<br/>

* Azure의 왼쪽 메뉴 페이지에서 리소스 만들기 탭을 선택합니다.

    ![5](https://user-images.githubusercontent.com/69498804/106971581-8a69ae80-6792-11eb-96bc-516c83e1a560.JPG)

<br/>



* 해당 탭으로 이동하면 Azure Market Place로 이동되고 필요한 리소스를 검색해서 만들 수 있습니다.

    ![6](https://user-images.githubusercontent.com/69498804/106971953-3c08df80-6793-11eb-8a30-6e593350c237.JPG)



<br/>

* Public IP Address를 검색해서 생성해보겠습니다.

    ![7](https://user-images.githubusercontent.com/69498804/106972085-85592f00-6793-11eb-8075-ff5e120abd46.JPG)


<br/>

* Create Tab에서 이름, 구독, RG를 선택해서 만들어 줍시다! 방금전에 생성한 RG : NASA-RG01에 속하게 만듭니다.

    ![41](https://user-images.githubusercontent.com/69498804/106973288-ef72d380-6795-11eb-85b0-01f08d29b614.JPG)


<br/>

* 정상적으로 NASA-RG01 RG에 배포가 완료 되었습니다!

    ![22](https://user-images.githubusercontent.com/69498804/106973511-50021080-6796-11eb-8c06-514dc7f03dbf.JPG)

<br/>


---

## 🤞 Resource TAG 생성

지금은 하나의 리소스만 존재하지만 실제로 서비스 중인 리소스들은 무수히 많은 것이 보통입니다.  
그래서 리소스 그룹을 계획할때 어떤 접근 방식을 사용하던 논리적으로 분류 체계를 구성해야합니다.   
예를 들면 리소스 이름만으로는 확인 할 수 없는 메타데이터들  
* 워크로드
* 어플리케이션
* 기능
* 환경(TEST) 등  

효과적인 분류를 위해 Azure는 TAGS라는 Metadata 요소를 제공합니다.  

<br/>

태그는 이름과 값의 문자열 쌍으로 구성되고, 몇가지 제한사항이 있습니다.  

* 태그 이름/값의 쌍은 최대 50개
* 태그 이름의 길이는 최대 512자, 값은 256자
* 특수 문자 포함 불가 - , . 등은 가능

<br/>

### 이제 방금전에 생성했던 PIP에 TAGS를 부여해보겠습니다.

<br/>

* RG 관리 탭에서 옆의 MENU Bar에서 TAGS를 선택해줍니다. 

    ![4444](https://user-images.githubusercontent.com/69498804/106974792-a53f2180-6798-11eb-8b25-f4010588f8bd.JPG)

<br/>

* 다음과 같이 2가지 TAGS를 이름/값을 입력한 뒤 저장합니다.

    ![5555](https://user-images.githubusercontent.com/69498804/106975075-2f878580-6799-11eb-9548-7df1b053fb5c.JPG)

    * 이름 : ApplicationName, 값 : NASAPIP
    * 이름 : Owner , 값 : NASA1515


<br/>

* RG 개요 TAB으로 이동 한 뒤 새로 추가된 TAGS를 확인 후 PIP에 지정해줍니다.

    ![123123](https://user-images.githubusercontent.com/69498804/106975315-a9b80a00-6799-11eb-86c9-50d7b8647a92.JPG)

<br/>

* 이후 ``태그지정`` 블레이드에서 PIP에 부여 할 새로운 TAGS를 생성합니다.

    ![444342423423](https://user-images.githubusercontent.com/69498804/106975656-41b5f380-679a-11eb-9ed2-829d95836f3c.JPG)

    * ApplicationName/NASAPIP
    * Env/Production


<br/>


* TAGS 생성이 완료되었으면, TAGS 메뉴에서 확인이 가능합니다.

    ![4444443214332423423432](https://user-images.githubusercontent.com/69498804/106975942-d882b000-679a-11eb-864b-b326090642c6.JPG)

    * 제가 생성했던 3개의 태그가 정리되어있습니다. 

<br/>

* Env/Production TAGS를 선택하면 다음과 같이 연결된 Resources가 보여집니다.

    ![DFDFDSFSDFDS](https://user-images.githubusercontent.com/69498804/106976065-14b61080-679b-11eb-86b0-d89576d8ed5d.JPG)

<br/>

---


## 👌 Resoures 이동

리소스 그룹의 리소스는 필요에 따라 다른 리소스 그룹, 다른 구독, 다른 지역으로 이동할 수 있습니다.  
가장 빈번한 예로는 리소스 그룹의 이름을 변경해야 할 때 이름을 변경할 수 없으므로  
원하는 이름의 리소스 그룹을 새로 생성해 기존 리소스를 이동해야 합니다.  
또는 특정 구독에서 더 이상 비용을 지불할 수 없는 경우에도 이동이 불가피 합니다.  

<br/>

### 리소스 이동 시 주의사항

<br/>

* 구독 간 이동은 양쪽 구독이 동일한 AAD(Azure Active Directory) Tenant에 연결된 경우만 가능

* 리소스 이동 중에는 원본 RG, 대상 RG는 잠금 상태가 되어 해당 리소스의 Read & Write는 차단됩니다.  
* 이동하는 리소스와 종속성이 있는 리소스가 있다면 함께 이동해야합니다. EX) VM - DISK - Vnet
* 다른 구독으로 이동하려는 리소스와 종속 리소스의 RG가 다르면 하나의 RG로 모은 뒤 이동합니다.  
* AAD(Azure Active Directory), ExpressRoute 같이 이동할 수 없는 리소스도 존재합니다.  
* 이동하는 리소스에 대한 Resources provider를 다른 구독에서도 사용할 수 있어야 합니다.
* 이동 대상 리소스를 배포했던 위치는 바꿀 수 없습니다.  


<br/>

### 리소스 이동 실습 

<br/>

리소스를 이동하는 실습을 위해서 NASA-RG02라는 RG를 하나 더 생성했습니다.  

![2222](https://user-images.githubusercontent.com/69498804/106978582-db33d400-679f-11eb-989f-884dc7b63d2b.JPG)

<br/>

* 기존 RG 페이지의 명령 바의 ``이동`` 버튼을 사용합니다.

    ![111111](https://user-images.githubusercontent.com/69498804/106978756-3ebe0180-67a0-11eb-80a6-f10dd1f7d8f2.JPG)


<br/>

* ``리소스 이동`` 블레이드에서 이동할 RG를 선택하고 이동합니다. 

    ![333333](https://user-images.githubusercontent.com/69498804/106978880-83499d00-67a0-11eb-802f-37cd3ae1ca82.JPG)

    * 저처럼 미리 이동 할 RG를 만들어도 되지만 해당 블레이드에서 생성해도 됩니다.


<br/>

* 이동 시 약간의 시간이 소요되고 다음과 같은 NOTI를 띄워줍니다.

    ![캡처](https://user-images.githubusercontent.com/69498804/106979232-44681700-67a1-11eb-9171-788ba9a9a5ef.JPG)

<br/>

* 이동이 완료되고, 다음과 같이 NASA-RG02 RG에서 PIP를 확인 할 수 있습니다.


    ![캡처](https://user-images.githubusercontent.com/69498804/106979590-ff90b000-67a1-11eb-9a4c-7fad79dbe6d8.JPG)



<br/>



---

## 마치며…  


이번 포스트에서는 Azure Portal로 기본적인 RG ~ 이동 까지의 실습을 진행했습니다.  
지금은 초보자이기 때문에 Portal로 진행하지만 전체적인 프로세스를 한번 훑고 난 다음에는  
본격적으로 CLI, PowerShell로 진행 할 예정입니다.  

```toc