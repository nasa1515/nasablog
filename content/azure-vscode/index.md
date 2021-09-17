---
emoji: 🤦‍♂️
title: "[AZURE] Azure Cloud Shell From vscode"
date: "2021-08-01 00:39:25"
author: nasa1515
tags: AZURE
categories: AZURE
---


머리말  
  

지금까지는 Azure Portal에서만 PowerShell을 이용 했었습니다.  
그러나 일일히 VM에 들어가고 인증하고 하는 과정들이 너무 불필요하게 느껴졌고  
앞으로 IAC등을 사용할 예정이기에 VSCODE의 연동이 필요하다고 느꼈습니다. 그래서 이번 포스트는 VSCODE의 연동입니다.  


본 포스트는 ``Windows 10 Pro`` 기반에서 시행되었습니다.
 
---


## ✔ 1. Visual Studio(VS) Code 설치



[VSCODE 페이지](https://code.visualstudio.com/download)로 이동하여 VS 코드를 설치합니다.

![캡처33](https://user-images.githubusercontent.com/69498804/107454972-52e37380-6b91-11eb-9bed-ca4ccdc70e9c.JPG)


<br/>
<br/>


## 👍 2. Node.js 설치


[Nodejs 페이지](https://nodejs.org/en/)로 이동하여 Node.js를 설치합니다.

![캡처](https://user-images.githubusercontent.com/69498804/107476689-b2ee1000-6bb9-11eb-96c5-35c821aab95f.JPG)


<br/>
<br/>

## ✌ 3. VSCODE Azure Account extension 설치

* VSCODE의 Extension Tab에서 Azure Account를 설치합니다!

    ![캡처3](https://user-images.githubusercontent.com/69498804/107476968-3f98ce00-6bba-11eb-89a1-62c4f9f51d5a.JPG)


<br/>


---

## 😉 4. 설치가 완료되었으면 명령 단축으로 이동합니다.  


<br>

shift + Ctrl + P 단축키로 접속해 Azure:Sign In을 선택

![캡처444](https://user-images.githubusercontent.com/69498804/107477160-9d2d1a80-6bba-11eb-891a-7ea787f34218.JPG)


<br>
<br>

그 후 Azure 로그인 팝업 창이 발생하면 로그인합니다.

![555](https://user-images.githubusercontent.com/69498804/107477294-d6658a80-6bba-11eb-9ce7-41b4f80949b4.JPG)


<br>
<br>

정상적으로 로그인이 되었다면 화면 왼쪽 하단에 로그인 ID가 보입니다.

![캡처4444](https://user-images.githubusercontent.com/69498804/107477389-feed8480-6bba-11eb-9f97-ecb0e49b55c0.JPG)


<br/>
<br>

## 🐱‍🏍 Cloud Shell에 접속합니다.

<br>

로그인 완료 후 shift + Ctrl + P으로 Azure:Open PowerShell in Cloud Shell을 선택

![캡처777](https://user-images.githubusercontent.com/69498804/107477565-4b38c480-6bbb-11eb-9c77-18e53bbde690.JPG)


<br/>
<br>

이후 터미널이 실행되고 Cloud Shell에 접속됩니다.

![캡처5555](https://user-images.githubusercontent.com/69498804/107477612-673c6600-6bbb-11eb-9045-49d9f19764b4.JPG)


<br/>

---

## 마치며…  


이제 진정한 Azure의 시작입니다.  
VSCODE 연동도 완료되었으니 앞으로 거의 대부분의 실습은 CLI로 진행합니다.  


---

```toc
```