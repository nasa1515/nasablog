---
emoji: ๐คฆโโ๏ธ
title: "[AZURE] Azure Cloud Shell From vscode"
date: "2021-08-01 00:39:25"
author: nasa1515
tags: CLOUD
categories: CLOUD
---


๋จธ๋ฆฌ๋ง  
  

์ง๊ธ๊น์ง๋ Azure Portal์์๋ง PowerShell์ ์ด์ฉ ํ์์ต๋๋ค.  
๊ทธ๋ฌ๋ ์ผ์ผํ VM์ ๋ค์ด๊ฐ๊ณ  ์ธ์ฆํ๊ณ  ํ๋ ๊ณผ์ ๋ค์ด ๋๋ฌด ๋ถํ์ํ๊ฒ ๋๊ปด์ก๊ณ   
์์ผ๋ก IAC๋ฑ์ ์ฌ์ฉํ  ์์ ์ด๊ธฐ์ VSCODE์ ์ฐ๋์ด ํ์ํ๋ค๊ณ  ๋๊ผ์ต๋๋ค. ๊ทธ๋์ ์ด๋ฒ ํฌ์คํธ๋ VSCODE์ ์ฐ๋์๋๋ค.  


๋ณธ ํฌ์คํธ๋ ``Windows 10 Pro`` ๊ธฐ๋ฐ์์ ์ํ๋์์ต๋๋ค.
 
---


## โ 1. Visual Studio(VS) Code ์ค์น



[VSCODE ํ์ด์ง](https://code.visualstudio.com/download)๋ก ์ด๋ํ์ฌ VS ์ฝ๋๋ฅผ ์ค์นํฉ๋๋ค.

![์บก์ฒ33](https://user-images.githubusercontent.com/69498804/107454972-52e37380-6b91-11eb-9bed-ca4ccdc70e9c.JPG)


<br/>
<br/>


## ๐ 2. Node.js ์ค์น


[Nodejs ํ์ด์ง](https://nodejs.org/en/)๋ก ์ด๋ํ์ฌ Node.js๋ฅผ ์ค์นํฉ๋๋ค.

![์บก์ฒ](https://user-images.githubusercontent.com/69498804/107476689-b2ee1000-6bb9-11eb-96c5-35c821aab95f.JPG)


<br/>
<br/>

## โ 3. VSCODE Azure Account extension ์ค์น

* VSCODE์ Extension Tab์์ Azure Account๋ฅผ ์ค์นํฉ๋๋ค!

    ![์บก์ฒ3](https://user-images.githubusercontent.com/69498804/107476968-3f98ce00-6bba-11eb-89a1-62c4f9f51d5a.JPG)


<br/>


---

## ๐ 4. ์ค์น๊ฐ ์๋ฃ๋์์ผ๋ฉด ๋ช๋ น ๋จ์ถ์ผ๋ก ์ด๋ํฉ๋๋ค.  


<br>

shift + Ctrl + P ๋จ์ถํค๋ก ์ ์ํด Azure:Sign In์ ์ ํ

![์บก์ฒ444](https://user-images.githubusercontent.com/69498804/107477160-9d2d1a80-6bba-11eb-891a-7ea787f34218.JPG)


<br>
<br>

๊ทธ ํ Azure ๋ก๊ทธ์ธ ํ์ ์ฐฝ์ด ๋ฐ์ํ๋ฉด ๋ก๊ทธ์ธํฉ๋๋ค.

![555](https://user-images.githubusercontent.com/69498804/107477294-d6658a80-6bba-11eb-9ce7-41b4f80949b4.JPG)


<br>
<br>

์ ์์ ์ผ๋ก ๋ก๊ทธ์ธ์ด ๋์๋ค๋ฉด ํ๋ฉด ์ผ์ชฝ ํ๋จ์ ๋ก๊ทธ์ธ ID๊ฐ ๋ณด์๋๋ค.

![์บก์ฒ4444](https://user-images.githubusercontent.com/69498804/107477389-feed8480-6bba-11eb-9f97-ecb0e49b55c0.JPG)


<br/>
<br>

## ๐ฑโ๐ Cloud Shell์ ์ ์ํฉ๋๋ค.

<br>

๋ก๊ทธ์ธ ์๋ฃ ํ shift + Ctrl + P์ผ๋ก Azure:Open PowerShell in Cloud Shell์ ์ ํ

![์บก์ฒ777](https://user-images.githubusercontent.com/69498804/107477565-4b38c480-6bbb-11eb-9c77-18e53bbde690.JPG)


<br/>
<br>

์ดํ ํฐ๋ฏธ๋์ด ์คํ๋๊ณ  Cloud Shell์ ์ ์๋ฉ๋๋ค.

![์บก์ฒ5555](https://user-images.githubusercontent.com/69498804/107477612-673c6600-6bbb-11eb-9045-49d9f19764b4.JPG)


<br/>

---

## ๋ง์น๋ฉฐโฆ  


์ด์  ์ง์ ํ Azure์ ์์์๋๋ค.  
VSCODE ์ฐ๋๋ ์๋ฃ๋์์ผ๋ ์์ผ๋ก ๊ฑฐ์ ๋๋ถ๋ถ์ ์ค์ต์ CLI๋ก ์งํํฉ๋๋ค.  


---

```toc
```