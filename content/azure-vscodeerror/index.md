---
emoji: 🤦‍♂️
title: AZURE Cloud Shell 'Select Directory...' Error From VSCODE [AZURE]
date: "2021-08-01 00:40:25"
author: nasa1515
tags: AZURE Error-Report
categories: AZURE Error-Report
---

머리말  
  

이전 포스트인 [Azure Cloud Shell from VSCODE 포스트](https://nasa1515.tech/azure-vscode/)에서  
디렉토리를 연동하는 과정에서 발생했던 에러의 리뷰입니다.  

--- 

## ✔ AZURE Cloud Shell "Select Directory..." Error From VSCODE

<br/>

vscode에서 Sing-in을 마치고 Cloud Shell에 연결하려고 할때 다음과 같은 Error가 발생합니다.


![캡처](https://user-images.githubusercontent.com/69498804/107478491-e41c0f80-6bbc-11eb-8dd2-c2a5cefc6827.JPG)


<br>

#### 해당 Error가 발생하는 이유는 크게 두가지입니다.  



1. 특정 Tanant에 사용자가 많거나, 여러가지 Tanant가 존재 할 경우
2. Azure Account extension의 버전이 너무 높거나

<br/>

몇가지 테스트를 실행해봐서 해결방법을 발견해 포스트합니다. 


<br/>

---

## ✌ Error 해결


### Azure Tanant ID를 수동 할당해준다.  

<br/>



Azure Account의 Extension Settings으로 접속합니다.

![캡처4444](https://user-images.githubusercontent.com/69498804/107478914-9bb12180-6bbd-11eb-8486-9a597e274bf9.JPG)


<br/>
<br/>

그 후 Tanant 설정에 Portal에서 복사해온 Tanant ID를 직접 입력 후 Sync를 맞춰줍니다.

![캡처3333](https://user-images.githubusercontent.com/69498804/107479103-f8144100-6bbd-11eb-88ae-a27fc2a58b70.JPG)


<br/>
<br/>

---


### 이제 다시 Sign in 뒤 Cloud Shell에 접속하면 정상적으로 연동됩니다.


![캡처22222](https://user-images.githubusercontent.com/69498804/107479240-30b41a80-6bbe-11eb-917f-3f2b771540bc.JPG)


<br/>

---

## 마치며…  

이번 포스트의 이슈로 약 3~4시간 정도의 허무한 시간을 소비했습니다...  
결국 이것 저것 설정을 만져보고, StackOverFlow를 뒤지며 같은 이슈를 확인해 해결했습니다.  


---


```toc