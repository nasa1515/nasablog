---
emoji: ๐คฆโโ๏ธ
title: "[AZURE] Virtual Network Gateway - VPN"
date: "2021-08-01 00:38:25"
author: nasa1515
tags: CLOUD
categories: CLOUD
---


๋จธ๋ฆฌ๋ง  
  

์์์ Azure์ ๋ง์ ๊ธฐ๋ฅ๋ค์ ์ค๋ชํ์ง๋ง ์ฃผ๊ด์ ์ผ๋ก ์ธํ๋ผ ์์ง๋์ด์๊ฒ ์ ์ผ ์ค์ํ ๋ถ๋ถ์  
์ด๋ฒ ํฌ์คํธ์์ ์งํํ  Gateway ๋ถ๋ถ์ธ ๊ฒ ๊ฐ์ต๋๋ค.!  


 
---



## โ Virtual Network Gateway - VPN

Azure์์ VPN(Virtual Private Network)๋ฅผ ์ฌ์ฉํ๋ ๊ฒฝ์ฐ๋ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.


* S2S (Site-to-Site) : ๊ฐ์๋คํธ์ํฌ์ On-Premise ๋คํธ์ํฌ๋ฅผ ์ฐ๊ฒฐํ๋ VPN, VPNgw์ LocalGW๊ฐ ํ์  

* P2S (Point-to-Site) : ๊ฐ์๋คํธ์ํฌ์ ๊ฐ๋ณ ๋๋ฐ์ด์ค๋ฅผ ์ฐ๊ฒฐํ๋ VPN, VPNgw์ ClientVpn ํ์.

* Vnet-Vnet : ์๋ก ๋ค๋ฅธ ์ง์ญ์ด๋, ๊ตฌ๋์ ์๋ Azure Vnet์ ์ฐ๊ฒฐ, Peering, VpnGW๋ฅผ ์ด์ฉ  


<br/>

* #### ์๋ ๊ทธ๋ฆผ์ ๋ณด๋ฉด ์ฝ๊ฒ ์์์ ์ค๋ชํ VPN ์ข๋ฅ์ ์ฐจ์ด๋ฅผ ํ์ ํ  ์ ์์ต๋๋ค.


    ![22222](https://user-images.githubusercontent.com/69498804/107910006-dd1a4600-6f9c-11eb-9865-fcaebda388bb.jpg)

<br/>

---

## โ VNET-VNET VpnGW ์์ฑ ์ค์ต   

์ด๋ฒ ์ค์ต์์๋ ๋ค๋ฅธ RG์ ๋ค๋ฅธ Resource๋ฅผ ๊ฐ์ง๊ณ  ์๋ VM์ VpnGW๋ก ํต์ ์ ํด๋ณด๊ฒ ์ต๋๋ค.  


### ๊ฐ RG์ ์์ฑ Resource ์ ๋ณด

<br/>

* RG-VPN01 

    * VM01
    * Vnet01 (East US) - IP : 10.1.0.0/16 / Subnet : 10.1.0.0/24
    * VnetGW01 - IP : 10.1.255.0/27 / PIP -(PIP-VnetGW01)



* RG-VPN99 

    * VM99
    * Vnet99 (East Asia) - IP : 10.41.0.0/16 / Subnet : 10.41.0.0/24
    * VnetGW99 - IP : 10.41.255.0/27 / PIP -(PIP-VnetGW99)


<br/>

---

### Vnet ์์ฑ 

๊ฐ๊ฐ์ RG ๊ทธ๋ฃน์ ์์ ์ ๋ณด์ ๋ง๊ฒ Vnet Resource๋ฅผ ์์ฑํฉ๋๋ค.  

<br/>

VM01์ Vnet

![์บก์ฒ555](https://user-images.githubusercontent.com/69498804/107916501-b9113180-6fa9-11eb-8ea6-4e5bfe2386ca.JPG)


<br/>
<br/>

VM99์ Vnet

![์บก์ฒ666](https://user-images.githubusercontent.com/69498804/107916575-d8a85a00-6fa9-11eb-9b64-9861a43c21cd.JPG)

<br/>

---


### Virtual Network Gateway ์์ฑ  


Vnet๊ณผ ๋์ผํ๊ฒ ๊ฐ๊ฐ์ RG ๊ทธ๋ฃน์ ์์ ์ ๋ณด์ ๋ง๊ฒ Gateway ๋ฅผ ์์ฑํฉ๋๋ค.  


<br/>

VM01์ Gateway 

![์บก์ฒ777](https://user-images.githubusercontent.com/69498804/107916831-4a80a380-6faa-11eb-84e4-2a5150e35b32.JPG)

<br/>
<br/>

VM99์ Gateway 

![์บก์ฒ888](https://user-images.githubusercontent.com/69498804/107916889-66844500-6faa-11eb-94cf-ad2a420f1f26.JPG)


<br/>

---

### Vnet <-> VnetGW ์ฐ๊ฒฐ ๊ตฌ์ฑ   

์์ ์งํํ๋๋ก VNet, VnetGW๋ฅผ ๋ชจ๋ ์์ฑํ์ผ๋ฉด ์ด์  connection์ ๋ง๋ค ์ ์์ต๋๋ค.  
์ง๊ธ ์งํํ๋ ๊ณผ์ ์ ๋์ผํ ๊ตฌ๋์ ์๋ Vnet Resource ์ ๋ํด์๋ง ์๋ํ๊ธฐ ๋๋ฌธ์.  
๋ง์ฝ ์์ฑํ Vnet์ด ๋ค๋ฅธ ๊ตฌ๋์ ์๋ ๊ฒฝ์ฐ์ PowerShell ์ ์ด์ฉํด ์ฐ๊ฒฐ ํด์ผ ํฉ๋๋ค.  
๊ทธ๋ฌ๋ ์ง๊ธ ๊ฐ์ด VNet์ด ๋์ผํ ๊ตฌ๋์ ๋ค๋ฅธ RG์ธ ๊ฒฝ์ฐ ํฌํธ์ ์ฌ์ฉํ์ฌ ์ฐ๊ฒฐํ  ์ ์์ต๋๋ค.   
๊ทธ๋ผ ์ด์  VNet1๊ณผ VNet2์ connection ๋ง๋ค๊ฒ ์ต๋๋ค.  


<br/>

Connection ์์ฑ [์์ฑํ GW01์ Connections Blade์ Add] 

![์บก์ฒ44](https://user-images.githubusercontent.com/69498804/107913101-1c4b9580-6fa3-11eb-845f-f556f6c449aa.JPG)


<br/>  
<br/>

Connection Create Blade์์ Second VnetGW ์ค์  
    
![์บก์ฒ89999](https://user-images.githubusercontent.com/69498804/107917614-8d8f4680-6fab-11eb-9ac8-b072666ab650.JPG)

* Second Virtual network gateway : ์ฐ๊ฒฐ ํ  VnetGW 
* PSK : ์ฐ๊ฒฐ์ ์ฌ์ฉํ  ๊ณต์  ํค


<br/>  
<br/>


Second Virtual Network gateway tab์์ ๋ค์๊ณผ ๊ฐ์ด VM99๋ฅผ ์ ํํด ์ถ๊ฐํฉ๋๋ค.

![์บก์ฒ9999](https://user-images.githubusercontent.com/69498804/107917758-cc250100-6fab-11eb-92ec-e04ef6c6eb15.JPG)



<br/>  
<br/>

* ### ์์ ๋์ผํ ๋ฐฉ๋ฒ์ผ๋ก VM99์ VnetGW์๋ Connection์ ์ถ๊ฐํด์ค๋๋ค. 


<br/>  
<br/>


๋ชจ๋  Connection ์ ์ถ๊ฐ ํ ๋ค Status๋ฅผ ํ์ธํด๋ณด๋ฉด ๋ค์๊ณผ ๊ฐ์ด Connected๋ก ์ฐ๊ฒฐ๋ฉ๋๋ค.

![์บก์ฒ99879897](https://user-images.githubusercontent.com/69498804/107918407-f3300280-6fac-11eb-806a-5266f5628f45.JPG)

<br/>  
<br/>

Connection 1์ ๋ค์ด๊ฐ ์์ธํ ์ ๋ณด๋ฅผ ํ์ธํด๋ด์๋ค.

![์บก์ฒ222](https://user-images.githubusercontent.com/69498804/107918531-325e5380-6fad-11eb-9ac0-00c560701e6e.JPG)

* Virtual network gateway 1์๋ VM01์ ํด๋นํ๋ VnetGW๊ฐ ์ฐ๊ฒฐ ๋์ด์๊ณ 
* Virtual network gateway 2์๋ VM99์ ํด๋นํ๋ VnetGW๊ฐ ์ฐ๊ฒฐ ๋์ด ์์ต๋๋ค.
* Data in : ๋ค์ด์จ Data๊ฐ ์์ด 0์ผ๋ก ํ์๋ฉ๋๋ค. 



<br/>

---

### ๊ฐ๋จํ๊ฒ VM01 -> VM99๋ก Ping(IGMP) TEST๋ฅผ ํด๋ด์๋ค.!!

<br/>  


VM01 (10.1.0.4)์ ์ ์ํ ๋ค VM99์ IP์ธ 10.41.0.4์ผ๋ก Ping!

![์บก์ฒ232323](https://user-images.githubusercontent.com/69498804/107920087-b0bbf500-6faf-11eb-9b63-d2099dc0b17a.JPG)

์ ์์ ์ผ๋ก ๋ค๋ฅธ RG, Region, IP ๋์ญ๊ณผ ํต์ ์ด ๋๋ ๊ฒ์ ํ์ธํฉ๋๋ค!! 

<br/>  
<br/>

์ถ๊ฐ์ ์ผ๋ก VnetGW01์์ Data in, Out์๋ IGMP Packet ๋งํผ์ ๋ก๊ทธ๊ฐ ์ฐํ๊ฒ ๋ฉ๋๋ค.  

![์บก์ฒ2222](https://user-images.githubusercontent.com/69498804/107920205-e82aa180-6faf-11eb-92ff-99e3582a0b28.JPG)

<br/>

---

## ๋ง์น๋ฉฐโฆ  


๊ฐ๋จํ๊ฒ VNET-VNET ์ฐ๊ฒฐ์ ๋ํด์๋ง ์ค์ต์ ์งํํด๋ดค์ต๋๋ค.  
์๋ง on-premise ํ๋ก์ ํธ๋ฅผ ํ๊ฒ ๋๋ค๋ฉด S2S๋ ๋ง์ด ์ฌ์ฉ ํ  ๊ฒ ๊ฐ์ง๋ง  
ํ์ฌ๋ก์๋ ๊ทธ๋ ๊ฒ ํ์์ฑ์ ๋๋ผ์ง ๋ชปํด์ ์ค์ต์ ์ ๋ฆฌํ์ง ์์์ต๋๋ค!

---

```toc
```