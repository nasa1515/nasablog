---
emoji: ๐คฆโโ๏ธ
title: "[Kubernetes] - ์ฟ ๋ฒ๋คํฐ์ค์ POD?"
date: "2021-06-29 00:07:16"
author: nasa1515
tags: DevOps
categories: DevOps
---

๋จธ๋ฆฌ๋ง  

์ด์  ๊ธฐ๋ณธ์ ์ธ ๊ฐ๋๊ณผ kubectl ๋ช๋ น์ด๊น์ง ๋ชจ๋ ์์๋ดค๋ค!! ์ด๋ฒ ํฌ์คํธ๋ถํฐ๋ ์ง์ง ์ค์ต์ ๋ค์ด๊ฐ๋ณด์!!  
์ฐ์  ์ปจํฌ๋ํธ ํฌ์คํธ์์ ์ค๋ชํ๋ ๊ฒ๋ค๋ถํฐ ์์ํ๊ฒ ์ต๋๋ค!!

---


## โ POD?!

``Pod``์ ์ฟ ๋ฒ๋คํฐ์ค APP์ ๊ธฐ๋ณธ ์คํ ๋จ์์ธ๋ฐ ์ฝ๊ฒ ๋งํด ์ฟ ๋ฒ๋คํฐ์ค ์ํฌ๋ก๋์์ ๊ด๋ฆฌํ  ์ ์๋ ๊ฐ์ฅ ์์ ๋จ์๊ฐ ํ๋์๋๋ค.  
๋ํ ๋ฐฐํฌ ์ ๋ฐฐํฌ์ ๋จ์๊ฐ ๋๊ธฐ๋ ํฉ๋๋ค. ํ๋๋ ํ๋ ์ด์์ '๋์์ค์ธ' ์ปจํ์ด๋๋ฅผ ํฌํจํ๊ณ  ์๋ ์ค๋ธ์ ํธ์ด๊ณ   
ํ๋์ ํ๋์๋ ํ๋์ ์ปจํ์ด๋๋ฅผ ๋ฐฐ์นํ๋ ๊ฒ์ด ๊ธฐ๋ณธ์๋๋ค. ์ฟ ๋ฒ๋คํฐ์ค ํด๋ฌ์คํฐ ๋ด์์ ํ๋๋ ์ฃผ๋ก ๋ ๊ฐ์ง ๋ฐฉ๋ฒ์ผ๋ก ์ฌ์ฉ๋์ฃ .

![์คํฌ๋ฆฐ์ท, 2020-09-16 15-29-48](https://user-images.githubusercontent.com/69498804/93300290-78ae5b80-f831-11ea-8075-020c2856cdec.png)



### Pod ๋ชจ๋ธ ์ข๋ฅ



1. ``1๊ฐ ์ปจํ์ด๋`` - 1๊ฐ POD ๋ชจ๋ธ  
"one-container-per-Pod"์ ์ฟ ๋ฒ๋คํฐ์ค์์ ๊ฐ์ฅ ๋๋ฆฌ ์ฐ์ด๋ ์ผ์ด์ค.  
ํ๊ฐ์ pod์ด 1๊ฐ์ container์ ๊ฐ์ธ๊ณ  ์์ผ๋ฉฐ, ์ฟ ๋ฒ๋คํฐ์ค๊ฐ pod์ ๊ด๋ฆฌ.

<br/>


2. ``2๊ฐ ์ด์ ์ปจํ์ด๋`` - 1๊ฐ POD ๋ชจ๋ธ

    2๊ฐ ์ด์์ container๊ฐ ๋ฆฌ์์ค๋ฅผ ๋ฐ์ ํ๊ฒ ๊ณต์ ํด์ผํ๋ ์ํฉ์ ์ฐ์ธ๋ค.  
    ํ๋์ ์ปจํ์ด๋๊ฐ file์ ์ ๊ณตํด์ฃผ๋ฉด "sidecar" ์ญํ ์ ํ๋ ์ปจํ์ด๋๊ฐ ํด๋น file์ ์ ๊ทผํ๋ ๊ฐ๋์ด๋ค.  
    ์ด๋ฌํ ๋ฐฉ์์ผ๋ก ์ถ์ํ, ์บก์ํ ๋ pod์ reliableํ application๋์์ผ๋ก ์ด๋๊ฑฐ๋  
    robust system์ผ๋ก ๋ง๋๋ ๋ฑ ์ฅ์ ์ผ๋ก ์นํ์ํจ๋ค.  
    ์ฆ ์ฝ๊ฒ ๋งํด ์๋ก ์์กด์ฑ์ด ์๋ ๋ค์ค ์ปจํ์ด๋๊ฐ ๋์์ค์ธ ํ๋. ๋ฆฌ์์ค ๊ณต์ ๊ฐ ํ์ํ ๊ฒฐํฉ ์๋น์ค ๋จ์์ธ ๊ฒฝ์ฐ์ผ ๊ฒ์ด๋ค.

<br/>


๋ถ๊ฐ ์ค๋ช
    
๊ธฐ๋ณธ์ ์ผ๋ก ํ๋์ ์ปจํ์ด๋์๋ ์ต์ํ์ ํ์ํ ๊ธฐ๋ฅ ์ฆ ํ๋์ ์ปจํ์ด๋๋ ํ๋์ ๊ธฐ๋ฅ๋ง ํ๋ ๊ฒ์ด ๊ธฐ๋ณธ์ด๋ค.  
๊ทธ๋ฐ๋ฐ VM์ ์ต์ํด์ง๋ฉด ์ฐฉ๊ฐํ๋ ๊ฒ์ด ํ๋์ ์ปจํ์ด๋์ ์ฌ๋ฌ ๊ฐ์ ์ดํ๋ฆฌ์ผ์ด์์ ๋๋ฆฌ๋ฉด ํจ์จ์ ์ด์ง ์๊ฒ ๋๋ ์๋ฌธ์ด ์์ ์ ์๋ค.  
ํ์ง๋ง Dockerfile์ ๋ฉ์ปค๋์ฆ ์์ฒด๊ฐ ๊ทธ๋ ๋ฏ ํ๋์ ์ปจํ์ด๋๋ ํ๋์ ์ดํ๋ฆฌ์ผ์ด์๋ง ๋์ธ ์ ์๋๋ก ์ค๊ณ๋์ด ์๋ค.  
์ ์คํฌ๋ฆฝํธ๋ docker-compose๋ฅผ ์ด์ฉํด์ ๋์์ ์ฌ๋ฌ ๋์์ ์ ๋ฐํ  ์๋ ์์ง๋ง ์์น์ ๊ทธ๋ ๋ค  
์ปจํ์ด๋๋ ์ ์ฐํ๊ฒ ํ์ฅ/์ถ์๊ฐ ๊ฐ๋ฅํ๋ค๋ ๊ฒ์ด ์ฅ์ ์ด๋ค.  
๋ง์ฝ ํ๋์ ์ปจํ์ด๋์ ์น, DB, APP์ ๋ค ๋ฐ์๋๋ ๊ฒ์ ์ปจํ์ด๋๋ฅผ ์ฐ๋ ๊ฐ์ฅ ๊ธฐ๋ณธ์ ์ธ ๋ชฉ์ ์ธ ``'APP ๊ฒฉ๋ฆฌ'``๋ฅผ ์ ธ๋ฒ๋ฆฌ๋ ๊ฒ์ด๋ค.  
์ฝ๊ฒ ์ค๋ชํ๋ฉด, ํ๋๊ฐ ์ฌ์ฉ๋๋ ๋ฐฉ์ ์ค ํ๋์ธ ``'๋ค์ค ์ปจํ์ด๋์ ๋์'``์ ``'๋ฉํฐ ์ปจํ์ด๋'``์ด์ง ๋ง๊ตฌ์ก์ด๋ก ์ฌ๋ฌ๊ฐ๋ฅผ ๋๋ฆฌ๋ ๊ฒ๊ณผ๋ ๋ค๋ฅด๋ค.

๋ํ ํํธ์ ํ๋ ์ด์์ ์ปจํ์ด๋๊ฐ ์๋ค๊ณ  ํ๋๋ผ๋, ํ๋์ ์ปจํ์ด๋๋ ๊ฐ์ ๋ธ๋์์๋ง ๋์ํ๊ณ ,  
ํ๋์ ํ๋์ ์๋ ๋ค์ค ์ปจํ์ด๋๋ ์ ์ฅ์, ๋คํธ์ํฌ IP ๋ฑ์ ๊ณต์ ํ๋ค!!

<br/>

---

 ### ํ๋๋ ์ด๋ป๊ฒ ๋ค์ค ์ปจํ์ด๋๋ฅผ ๊ด๋ฆฌํ ๊น?


ํ๋๋ ์ ์ด์ ๊ฒฐํฉ์ฑ์ด ์๋ ์๋น์ค๋ฅผ ์ํด ๋ค์ค ์ปจํ์ด๋๋ฅผ ์ง์ํ๋๋ก ๋์์ธ ๋์๋ค.  
์๋ฅผ ๋ค์ด, ๊ณต์  ๋ณผ๋ฅจ ๋ด๋ถ ํ์ผ์ ์น ์๋ฒ ์ญํ ์ ํ๋ ์ปจํ์ด๋์  
์๊ฒฉ ์์ค๋ก๋ถํฐ ๊ทธ ํ์ผ๋ค์ ์๋ฐ์ดํธํ๋ ๋ถ๋ฆฌ๋ "์ฌ์ด๋์นด" ์ปจํ์ด๋๊ฐ ์๋ ๊ฒฝ์ฐ ์๋ ๋ค์ด์ด๊ทธ๋จ์ ๋ชจ์ต์ผ ๊ฒ์ด๋ค.  

![์คํฌ๋ฆฐ์ท, 2020-09-16 15-49-34](https://user-images.githubusercontent.com/69498804/93302001-3a666b80-f834-11ea-9021-efe70f1ac329.png)  

์์ ๊ทธ๋ฆผ์์ web server๊ฐ ์ถ๊ฐ๋ก ํ์ํ๊ฒ ๋๋ฉด file puller๋ ๊ฐ์ด ํ๋๊ฐ ํ๋๋จ์๋ก ์ฆ๊ฐํ๊ฒ ๋๋ค.  
์ด๋ฌํ ํจํด์ ``'์ฌ์ด๋ ์นด'`` ํจํด์ด๋ผ๊ณ  ํ๋ค.  
๋จ, ์ฟ ๋ฒ๋คํฐ์ค ๊ณต์๋ฌธ์์์๋ ๊ฒฐํฉ์ฑ์ด ๊ฐํด ์ด์ฉ ์ ์๋ ๊ฒฝ์ฐ๋ง ์ฌ์ฉํ๋๋ก ๊ถ๊ณ ํ๊ณ  ์๋ค.  
์ด ๋, ํ๋๋ ํ๋ ์์ ์ํด ์๋ ์ปจํ์ด๋๋ค ์ฌ์ด์ ๋ ๊ฐ์ง์ ๊ณต์  ๋ฆฌ์์ค๋ฅผ ์ ๊ณตํ๋ค.  

๋ฐ๋ก ``๋คํธ์ํน``๊ณผ ``์ ์ฅ์``์ด๋ค.

โ

### ๋คํธ์ํน  

๊ฐ ํ๋๋ ๊ณ ์ ํ IP๋ฅผ ํ ๋น๋ฐ๋๋ค.  
ํ ํ๋ ์์ ์๋ ๋ชจ๋  ์ปจํ์ด๋๋ ๋คํธ์ํฌ ๋ค์์คํ์ด์ค์ IP์ฃผ์์ ํฌํธ๋ฅผ ๊ณต์ ํ๋ค.  
 ํ๋ ์์ ์ปจํ์ด๋๋ผ๋ฆฌ๋ localhost๋ฅผ ์ด์ฉํด์ ํต์ ํ  ์ ์๋ค.  
 ํ๋ ๋ฐ์ ์์์ ํ๋ ์์ ์ปจํ์ด๋๊ฐ ํต์ ํ๊ธฐ ์ํด์๋ ํฌํธ ์ ๋ณด์ ๊ฐ์ ๋คํธ์ํฌ ๋ฆฌ์์ค ์ฌ์ฉ ์ํ๋ฅผ ์๋ก ๊ณต์ ํ๊ณ  ์์ด์ผ ํ๋ค.

โ

### ์ ์ฅ์

ํ๋ ๋ด๋ถ์ ๋ชจ๋  ์ปจํ์ด๋๋ ๊ณต์  ๋ณผ๋ฅจ์ ์ ๊ทผํ  ์ ์๊ณ   
๊ทธ ์ปจํ์ด๋๋ผ๋ฆฌ ๋ฐ์ดํฐ๋ฅผ ๊ณต์ ํ  ์ ์๋ค. ๋ํ ๋ณผ๋ฅจ์ ์ปจํ์ด๋๊ฐ ์ฌ์์ ๋๋๋ผ๋ ํ๋ ์์ ๋ฐ์ดํฐ๋ฅผ ์๊ตฌ์ ์ผ๋ก ์ ์งํ  ์ ์๊ฒ ํ๋ค.

โ

### ํ๋์ Lifecycle

์ผ๋จ ํ๋๊ฐ ์์ฑ๋๋ฉด ํ๋์๋ ๊ณ ์ ํ ID๊ฐ ํ ๋น๋๊ณ , ๋ธ๋์ ์ค์ผ์ค๋ง ๋๋ค.  
ํด๋น ๋ธ๋๊ฐ ์ข๋ฃ๋๋ฉด ํด๋น ๋ธ๋์ ์ค์ผ์ค๋ง ๋์ด์๋ ํ๋๋ ์ผ์  ์๊ฐ์ด ์ง๋ ํ ์ญ์ ๋๋ค.  
๋ธ๋๊ฐ ์ญ์ ๋๋ค๊ณ  ํด์ ์์๋์ด์๋ ํ๋๊ฐ ๋ฆฌ์ค์ผ์ค๋ง ๋์ง ์์ผ๋ฉฐ ํ์์ ์์ ํ ์๋ก์ด ํ๋๋ฅผ ๋ค์ ์์ฑํ๋ ๋ฐฉ์์ด๋ค.  
    
๊ฐ์ ์ด์ ๋ก ํ๋๋ ๋ฌธ์ ๊ฐ ๋ฐ์ํ๋๋ผ๋ ์๊ฐ ๋ณต๊ตฌํ์ง ์๋๋ค. ๋ง์ฝ ํ๋์ ๋์์ด ์คํจํ๋ ๊ฒฝ์ฐ, ํ๋๋ ์ญ์ ๋์ด๋ฒ๋ฆฐ๋ค.  
์ด์ ๊ฐ์ ํ๋ ์ธ์คํด์ค๋ฅผ ๊ด๋ฆฌํ๋ ๋์์ ์ปจํธ๋กค๋ฌ๊ฐ ํ๋ค.

    
์ฆ, ํ๋๋ ์ฌ์ฉ์๋ ์ปจํธ๋กค๋ฌ๊ฐ ๋ช์์ ์ผ๋ก ์ญ์ ํ๊ธฐ ์ ๊น์ง๋ ๋จ์ ์๊ฒ ๋๋ค.

โ

### ํ๋์ ์๋ฏธ  

ํ๋๋ ์์ง๋ ฅ ์๋ ์๋น์ค ๋จ์๋ฅผ ํ์ฑํ๋ ์ฌ๋ฌ ๊ฐ์ ํ๋ ฅ ํ๋ก์ธ์ค๋ฅผ ๋ชจ๋ธ๋ก ํ๋ค.  
ํ๋๋ ๊ทธ ๊ตฌ์ฑ ์์ ์งํฉ๋ณด๋ค ๋์ ์์ค์ ์ถ์ํ๋ฅผ ์ ๊ณตํจ์ผ๋ก์จ ์ ํ๋ฆฌ์ผ์ด์ ๋ฐฐํฌ ๋ฐ ๊ด๋ฆฌ๋ฅผ ๋จ์ํํ๋ค.  
ํ๋๋ ์ ๊ฐ ๋จ์, ์ํ ํ์ฅ ๋ฐ ๋ณต์ ๋ฅผ ํ๋ค. ๊ณต๋ ์ค์ผ์ค๋ง, ๊ณต์ ๋ ์์ ์ฃผ๊ธฐ (์: ์ข๋ฃ), ์กฐ์ ๋ ๋ณต์ , ์์ ๊ณต์  ๋ฐ ์ข์์ฑ ๊ด๋ฆฌ๋ ํ๋์ ์ปจํ์ด๋์ ๋ํด ์๋์ผ๋ก ์ฒ๋ฆฌ๋๋ค.

โ

### ํ๋์ ์ข๋ฃ

* ์ ์ฐจ

    ํ๋๋ ์ฟ ๋ฒ๋คํฐ์ค ํด๋ฌ์คํฐ์ ๋ธ๋์์ ์คํ ์ค์ธ ํ๋ก์ธ์ค์ด๋ค.  
    ์ด๋ฌํ ํ๋ก์ธ์ค๊ฐ ๋์ด์ ํ์ํ์ง ์์ ๋๋ ์ ์ ์ข๋ฃ์์ผ์ผ ํ๋ค. ์ฌ์ฉ์๊ฐ ์ญ์ ๋ฅผ ์์ฒญํ  ์ ์์ด์ผ ํ๊ณ ,  
    ํ๋ก์ธ์ค๊ฐ ์ข๋ฃ๋๋ ๊ฒ์ ์ ์ ์์ด์ผ ํ๋ฉฐ, ์ญ์ ๊ฐ ์๋ฃ๋ ๊ฒ์ ํ์ธํ  ์ ์์ด์ผ ํ๋ค.  
    ์ฌ์ฉ์๊ฐ ํ๋ ์ญ์  ์์ฒญ์ ํ๋ฉด ์์คํ์ ํ๋๊ฐ ์ข๋ฃ๋๊ธฐ ์ ์ ์ ๋ฆฌ๋ฅผ ์ํ ์ ์ ๊ธฐ๊ฐ์ ๋์๋ค๊ฐ,  
    KILL ์๊ทธ๋์ด ํด๋น ํ๋ก์ธ์ค๋ก ์ ์ก๋๋ฉด ํ๋๊ฐ API ์๋ฒ์์ ์ญ์ ๋๋ค.

    ```cs
    - ์ฌ์ฉ์์ ์ญ์  ๋ช๋ น(default ์ ์๊ธฐ๊ฐ: 30์ด)
    - ์ ์๊ธฐ๊ฐ์ด ์ง๋ ํ๋ ์ ๋ณด๊ฐ ๊ฐฑ์ 
    - ์ด ํ๋๋ ์กฐํ์ Terminating์ด๋ผ๋ ๋ฌธ๊ตฌ ์ถ๋ ฅ
    - Terminating์ผ๋ก ํ์๋๋ ๊ฒ์ ํ์ธํ๋ฉด kubelet์ ์ข๋ฃ ์์ ์์
    - ์ข๋ฃํ ํ๋๋ ์๋ํฌ์ธํธ ๋ฆฌ์คํธ์์ ์ ๊ฑฐ๋๋ฉฐ, ๋ ํ๋ฆฌ์ผ์ด์ ์ปจํธ๋กค๋ฌ์ ๊ด๋ฆฌ ๋์์์ ์ ์ธ
    - ๋ง์ฝ ๋์ค์ ์ ์ ๊ธฐ๊ฐ์ด ๋ง๋ฃ๋๋ฉด ํ๋์์ ์คํ์ค์ด๋ ๋ชจ๋  ํ๋ก์ธ์ค์ SIGKILL์ด ๋จ์ด์ง
    - kubelet์ ์ ์๊ธฐ๊ฐ์ 0์ผ๋ก ์ธํํด์ API ์๋ฒ๋ก๋ถํฐ ํ๋๋ฅผ ์ฆ์ ์ญ์ ํ  ์ ์์. ์ด์  ํ๋๋ ๋์ด์ ๋ณด์ด์ง ์์.
    ```

<br/>

* ๊ฐ์  ์ญ์ 

    ๊ธฐ๋ณธ์ ์ผ๋ก ์ญ์  ์์์ 30์ด ์ด๋ด์ ๋์ด ๋๋ค. kubectl delete ๋ช๋ น์ --grace-period={second} ์ต์์ ์ง์ํ๋๋ฐ,  
    ์ด ์ต์์ ๊ธฐ๋ณธ ์ค์ ๋ ๊ฐ์ ์ฌ์ฉ์๊ฐ ์ ์ํ  ์ ์๋๋ก ํ๋ ์ต์์ผ๋ก, 0์ด ๋๋ฉด ํ๋๋ ์ฆ์ ์ญ์ ๋๋ค.  
    kubectl 1.5๋ฒ์  ์ด์์์๋ ๊ฐ์  ์ญ์ ๋ฅผ ์ํด์ ๋ฐ๋์ ``--grace-period=<second>``์ ํจ๊ป ``--force``๋ฅผ ๊ฐ์ด ์ฌ์ฉํด์ผ ํ๋ค.  
        
    ํ๋๋ฅผ ๊ฐ์  ์ญ์ ํ๋ฉด API์๋ฒ๋ kubelet์ผ๋ก๋ถํฐ ์คํ์ค์ด๋ ํ๋๊ฐ ์ข๋ฃ๋์๋ค๋ ํต์ง๋ฅผ ๊ธฐ๋ค๋ฆฌ์ง ์๋๋ค.  
    API๋จ์์ ํ๋๋ฅผ ์ฆ์ ์ ๊ฑฐํด๋ฒ๋ฆฌ๊ธฐ ๋๋ฌธ์ ๋์ผํ ์ด๋ฆ์ผ๋ก ์ ํ๋๋ฅผ ๋ง๋ค ์๋ ์๋ค.

<br/>

---

## โ ํ๋ ์์ฑ ์ค์ต

<br/>


 ``kubectl explain`` ๋ช๋ น์ผ๋ก ํ๋ ๋ฆฌ์์ค์ ํ๋๋ฅผ ํ์ธ ํด๋ณด์!.

```cs
[root@nasa-master ~]# kubectl explain pod.spec.containers
KIND:     Pod
VERSION:  v1

RESOURCE: containers <[]Object>

DESCRIPTION:
    List of containers belonging to the pod. Containers cannot currently be
    added or removed. There must be at least one container in a Pod. Cannot be
    updated.

    A single application container that you want to run within a pod.

FIELDS:
image	<string>
    Docker image name. More info:
    https://kubernetes.io/docs/concepts/containers/images This field is
    optional to allow higher level config management to default or override
    container images in workload controllers like Deployments and StatefulSets.
...
```

<br/>
<br/>

์ด์  ์ฐ์ต์ผ์ POD๋ฅผ ์ ์ํ๋ ``yaml``ํ์ผ์ ๋ง๋ค์ด๋ณด์!

```cs
apiVersion: v1 
kind: Pod 
metadata: 
name: nasa-nginx-pod 
spec: 
containers: 
- name: nasa-nginx-container 
    image: nginx:latest 
    ports: 
    - containerPort: 80 
        protocol: TCP
```

<br/>


์ yaml ํ์ผ์ ์ธ๋ถ์ ์ผ๋ก ์ค๋ชํด๋ด์๋ค!

* ``apiVersion`` : YAML ํ์ผ์์ ์ ์ํ ์ค๋ธ์ ํธ์ API ๋ฒ์ ์ ๋ํ๋๋๋ค.

* ``kind`` : ์ด ๋ฆฌ์์ค์ ์ข๋ฅ๋ฅผ ๋ํ๋๋๋ค. ์์์  pod๋ก ์์ฑํ๊ธฐ ๋๋ฌธ์ pod  
๋ค๋ฅธ ์ค๋ธ์ ํธ์ ์ข๋ฅ๋ kubectl api-resources ๋ช๋ น์ด๋ฅผ ํตํด ํ์ธํ  ์ ์์ต๋๋ค.

* ``metadata``: ๋ผ๋ฒจ, ์ฃผ์, ์ด๋ฆ๊ณผ ๊ฐ์ ๋ฆฌ์์ค์ ๋ถ๊ฐ ์ ๋ณด๋ค์ ์๋ ฅํฉ๋๋ค. 

* ``spec``: ๋ฆฌ์์ค๋ฅผ ์์ฑํ๊ธฐ ์ํ ์์ธํ ์ ๋ณด๋ฅผ ์๋ ฅํฉ๋๋ค. ์์ฑ๋๋ container์ ์ด๋ฆ, ์ด๋ฏธ์ง, ํฌํธ ๋ฑ์ ์ค์ ํ  ์ ์์ต๋๋ค. 

```cs
pod.spec.containers : ์ปจํ์ด๋ ์ ์
pod.spec.containers.image: ์ปจํ์ด๋์ ์ฌ์ฉํ  ์ด๋ฏธ์ง
pod.spec.containers.name: ์ปจํ์ด๋ ์ด๋ฆ
pod.spec.containers.ports: ๋ธ์ถํ  ํฌํธ ์ ์
pod.spec.containers.ports.containerPort: ๋ธ์ถํ  ์ปจํ์ด๋ ํฌํธ๋ฒํธ
pod.spec.containers.ports.protocol: ๋ธ์ถํ  ์ปจํ์ด๋ ํฌํธ์ ๊ธฐ๋ณธ ํ๋กํ ์ฝ
```

<br/>
<br/>

์์ฑํ ``YAML``ํ์ผ์ ๊ธฐ๋ฐ์ผ๋ก POD๋ฅผ ์์ฑํด๋ณด๊ฒ ์ต๋๋ค

```cs
kubectl apply -f yaml ํ์ผ์ด๋ฆ
```

<br/>

```cs
[root@nasa-master nasa]# kubectl apply -f nasa.yml 
pod/nasa-nginx-pod created
```

<br/>
<br/>

ํ๋ ๋์์ํ ํ์ธ

```cs
[root@nasa-master nasa]# kubectl get po
NAME             READY   STATUS    RESTARTS   AGE
nasa-nginx-pod   1/1     Running   0          64s
```

<br/>
<br/>

์คํ์ค์ธ ํ๋ ์ ์ ํ์ธ   

``-o ``์ต์์๋ yaml๊ณผ json ์ค ํ๋๋ฅผ ์ ํํ  ์ ์๋ค


```cs
[root@nasa-master nasa]# kubectl get pods nasa-nginx-pod -o yaml
apiVersion: v1
kind: Pod
metadata:
annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
    {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"name":"nasa-nginx-pod","nam
espace":"default"},"spec":{"containers":[{"image":"nginx:latest","name":"nasa-nginx-container",
"ports":[{"containerPort":80,"protocol":"TCP"}]}]}}
creationTimestamp: "2020-09-16T07:26:45Z"
name: nasa-nginx-pod
namespace: default
resourceVersion: "39554"
selfLink: /api/v1/namespaces/default/pods/nasa-nginx-pod
uid: 148bfb1a-73ad-4c44-805d-300cb5be8af8
spec:
containers:
- image: nginx:latest
    imagePullPolicy: Always
    name: nasa-nginx-container
    ports:
    - containerPort: 80
    protocol: TCP
    resources: {}
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
    name: default-token-556xc
    readOnly: true
dnsPolicy: ClusterFirst
enableServiceLinks: true
nodeName: nasa-node3
priority: 0
restartPolicy: Always
schedulerName: default-scheduler
securityContext: {}
serviceAccount: default
serviceAccountName: default
terminationGracePeriodSeconds: 30
tolerations:
- effect: NoExecute
    key: node.kubernetes.io/not-ready
    operator: Exists
    tolerationSeconds: 300
``` 


<br/>
<br/>

ํ๋์ describe ํ์ธ

```cs
[root@nasa-master nasa]# kubectl describe pods nasa-nginx-pod
Name:         nasa-nginx-pod
Namespace:    default
Priority:     0
Node:         nasa-node3/10.146.0.9
Start Time:   Wed, 16 Sep 2020 07:26:45 +0000
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"name":"nasa-nginx
-pod","namespace":"default"},"spec":{"containers":[{"image"...
Status:       Running
...
```

<br/>
<br/>
pod๋ container์ ๊ฐ์ด ``kubectl exec``๋ฅผ ํตํด ๋ช๋ น์ด๋ฅผ ์คํ์ํฌ ์ ์์ต๋๋ค. 

```cs
kubectl exec -it nasa-nginx-pod bash
```

<br/>

```cs
[root@nasa-master nasa]# kubectl exec -it nasa-nginx-pod bash
root@nasa-nginx-pod:/# 
root@nasa-nginx-pod:/# ls     
bin   dev                  docker-entrypoint.sh  home  lib64  mnt  proc  run   srv  tmp  var
boot  docker-entrypoint.d  etc                   lib   media  opt  root  sbin  sys  usr
```

<br/>
<br/>

๋ ๋์ปค์ ๊ฐ์ด ``kubectl logs``๋ฅผ ํตํด ํฌ๋์ ๋ก๊ทธ๋ฅผ ํ์ธํ  ์ ์์ต๋๋ค. 

```cs
kubectl logs nasa-nginx-pod
```

<br/>


```cs
[root@nasa-master nasa]#  kubectl logs nasa-nginx-pod
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuratio
n
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
```

<br/>
<br/>

์ค๋ธ์ ํธ๋ ``kubectl delete -f`` ๋ช๋ น์ด๋ก ์ญ์ ํ  ์ ์์ต๋๋ค.

```cs
[root@nasa-master nasa]# kubectl delete -f nasa.yml 
pod "nasa-nginx-pod" deleted
[root@nasa-master nasa]# 
[root@nasa-master nasa]# kubectl get po
No resources found.
```

<br/>

---

## ๐คฆโโ๏ธ ์ปจํ์ด๋ ๋๊ฐ ์ด์์ ํฌํจํ pod ๋ง๋ค๊ธฐ

<br/>

YAML ํ์ผ

```cs
apiVersion: v1
kind: Pod 
metadata: 
name: nasa-nginx-pod 
spec: 
containers: 
    - name: nasa-nginx-container 
    image: nginx:latest 
    ports: 
        - containerPort: 80 
        protocol: TCP 
    - name: sidecar 
    image: ubuntu:14.04 
    command: ["echo", "hello"] 
    args: ["ubuntu"]
```

<br/>
<br/>

 
๋ค์๊ณผ ๊ฐ์ด ๋๊ฐ๊ฐ ์์ฑ๋์๊ณ  ํ๊ฐ๋ง ์คํํ๊ณ  ์๋ ๊ฒ์ ํ์ธํ  ์ ์์ต๋๋ค. 

```cs
[root@nasa-master nasa]# kubectl get po
NAME             READY   STATUS             RESTARTS   AGE
nasa-nginx-pod   1/2     CrashLoopBackOff   1          32s
```

<br/>
<br/>

``-c`` ์ต์์ ์ฌ์ฉํด ์ด๋ค ์ปจํ์ด๋์ ์ ์ ํ ์ง ํ์ธ ๊ฐ๋ฅํฉ๋๋ค  

```cs
kubectl exec -it nasa-nginx-pod -c sidecar bash
```

<br/>

```cs
[root@nasa-master nasa]# kubectl exec -it nasa-nginx-pod -c nasa-nginx-container bash
root@nasa-nginx-pod:/# ls
bin   dev                  docker-entrypoint.sh  home  lib64  mnt  proc  run   srv  tmp  var
boot  docker-entrypoint.d  etc                   lib   media  opt  root  sbin  sys  usr
```

---


```toc
```