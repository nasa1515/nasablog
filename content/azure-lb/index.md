---
emoji: ๐คฆโโ๏ธ
title: "[AZURE] Application GateWay, LoadBalancer"
date: "2021-08-01 00:34:25"
author: nasa1515
tags: CLOUD
categories: CLOUD
---



๋จธ๋ฆฌ๋ง  
  

์๋ง ํด๋ผ์ฐ๋๋ IDC๋ ์ด๋ ํ ์๋น์ค๋ฅผ ์ด์ํ๋๋ฐ ๊ฐ์ฅ ์ค์ํ๊ฑด ๋ถํ๋ถ์ฐ์ด๋ผ๊ณ  ์๊ฐํฉ๋๋ค.  
์ด๋ค ์๋น์ค๋  ์ ์ฒด์ ์ธ ์๋น์ค์ ๋ํ ์์ ์ฑ์ด ๊ฐ์ ธ์ผ ํ๋ ๊ฐ์ฅ ์ค์ํ ๊ฒ์ด๊ธฐ ๋๋ฌธ์ด์ฃ    
๊ทธ๋์ ์ด๋ฒ ํฌ์คํธ์์๋ AZURE์์ ์ ๊ณตํ๋ L7 LB Application GateWay์ ๋ํด์ ํฌ์คํธ ํ์ต๋๋ค.  


 
---


## โ Application GateWay 


Application GateWay๋ ์น ํธ๋ํฝ ๋ถํ ๋ถ์ฐ ์ฅ์น, ์ฆ L7 LB ์๋๋ค.   
์์ฒญ URL์ด๋ ํธ์คํธ ํค๋๋ฑ์ HTTP ํน์ฑ์ ๊ธฐ๋ฐ์ผ๋ก ํธ๋ํฝ์ ์น ์๋ฒ ํ๋ก ๋ณด๋ด ๋ถํ ๋ถ์ฐํฉ๋๋ค.  

<br/>


### ๊ตฌ์ฑ์์  

APPlication GateWay์ ๊ตฌ์ฑ์์๋ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.  


![how-application-gateway-works](https://user-images.githubusercontent.com/69498804/107314961-1ce2b880-6ad9-11eb-9909-88b48e5f4627.png)



* Front-end IP Address : ๊ณต์ฉ IP(ํ์), ๊ฐ์ธ IP(์ ํ)๋ชจ๋ ํ ๋น ๊ฐ๋ฅํฉ๋๋ค. AG์์น์ Vnet,PIP์ ์์น๋ ๊ฐ์์ผ ํฉ๋๋ค.  

* HTTP/HTTPS ์์ ๊ธฐ : ๋ค์ด์ค๋ ์์ฒญ์ ๋ฐ๊ธฐ ์ํด ํ๋ ์ด์์ ์ถ๊ฐํฉ๋๋ค.  

* Routing rules : Rules์ ์ฌ์ฉํด ํ์ฉ ํธ๋ํฝ์ ๋ค๋ฅธ์์น๋ก ๋ฆฌ๋๋ ์ ํฉ๋๋ค.  

* HTTP ์ค์  :AG์ Back-end pool ๊ฐ์ ์ํธํ ์ฌ๋ถ๋ฅผ ์ค์ ํฉ๋๋ค.  

* ์ํ ํ๋ก๋ธ :Back-end pool์์ ๋ถํ๋ฅผ ๋ฐ์ ์ค ์๋ฒ๋ฅผ ๊ฒฐ์ ํฉ๋๋ค. (์ ์ ๋ฐํ ์ฝ๋ : 200~399)    

* Back-end Pool : NIC, PIP,INP,FQDN,VM set์ ํฌํจํด ์์ฒญ์ ๋ฐฑ ์๋ ์๋ฒ๋ก ๋ผ์ฐํํฉ๋๋ค.  

* WAF(Web Application Firewall) : ์์ ๊ธฐ๊ฐ ์์ฒญ์ ๋ฐ๊ธฐ ์  ๊ณต๊ฒฉ์ ๊ฐ์งํฉ๋๋ค. 

<br/>

์ด๋ก ์ ์ผ๋ก ๋์ดํด๋ดค์ ์ดํดํ๋ ์๊ฐ๋ง ๊ธธ์ด์ง๋๊น ์ผ๋จ ๋ง๋ค์ด๋ด์๋ค

<br/>

---

## โ Application GateWay ์์ฑ 

<br/>

[Create a Resoure] -> [Network] -> [Application Gateway] Tab ์ผ๋ก ์ด๋ํด ์์ฑํฉ๋๋ค.

![์บก์ฒ3](https://user-images.githubusercontent.com/69498804/107316549-320d1680-6adc-11eb-9903-bec6f8ba89f0.JPG)

<br/>
<br/>

AG์์๋ 2๊ฐ์ Subnet์ด ํ์ํฉ๋๋ค. ์ ๋ ์๋์ฒ๋ผ SubNet์ ์๋ก ์์ฑํ์ต๋๋ค. 
 
![์บก์ฒ4](https://user-images.githubusercontent.com/69498804/107316957-122a2280-6add-11eb-954d-6489f59367c6.JPG)

* 1.AG01-Subnet-nasa1515 : AG ์ฉ Subnet
* 2.BE-Subnet-nasa1q515 : Back-end Server ์ฉ Subnet

<br/>
<br/>


๐คณ SubNet ์ค์ ๊น์ง ์๋ฃ๋์์ผ๋ฉด Front-end ์ค์ ์ ์งํํฉ๋๋ค.

<br/>
<br/>

Front-end Tab์์ ์๋ก์ด PIP๋ฅผ ์์ฑ, ์ค์  ํ Back-end ์ค์ ์ผ๋ก ๋์ด๊ฐ๋๋ค.

![์บก์ฒ5](https://user-images.githubusercontent.com/69498804/107317214-9381b500-6add-11eb-92fe-c26ff8e8ac39.JPG)

<br/>
<br/>


### Back-end PooL ์ค์ 

<br/>


Back-end Pool ์ค์ ์์ ์๋์ ๊ฐ์ด ์๋ก์ด PooL์ ์์ฑํฉ๋๋ค.

![์บก์ฒ6](https://user-images.githubusercontent.com/69498804/107317506-23276380-6ade-11eb-85cc-59e25319d952.JPG)

* Add backend pool without targets : AG๋ฅผ ์์ฑ ํ์ ํ๊ฒ์ ์ถ๊ฐ ํฉ๋๋ค.

<br/>
<br/>


### Configuration Tab

<br/>


Configuration Tab์์ Routing Rules์ ์ถ๊ฐ ํฉ๋๋ค.

![์บก์ฒ22](https://user-images.githubusercontent.com/69498804/107317722-8c0edb80-6ade-11eb-9c1c-1ae01682d9e8.JPG)

<br/>
<br/>

Listener (์์ ๊ธฐ) ์ค์ ์์ Frontend IP ์ค์ ์ Public์ผ๋ก ์ค์ ํฉ๋๋ค.

![์บก์ฒ33](https://user-images.githubusercontent.com/69498804/107317928-f162cc80-6ade-11eb-9c1b-a53fb6d2668d.JPG)


<br/>
<br/>

Backend Targets ์ค์ ์์ ์ด์ ์ ์ค์ ํ๋ Backend ์ค์ ์ ์ถ๊ฐํ๊ณ , HTTP ์ค์ ์ ์ถ๊ฐํฉ๋๋ค.

![์บก์ฒ44](https://user-images.githubusercontent.com/69498804/107318067-3ab31c00-6adf-11eb-9393-8827126b2011.JPG)


<br/>
<br/>

๋ค์๊ณผ ๊ฐ์ด HTTP ์ค์ ์ ์ถ๊ฐํ๊ณ  Routing Rules์ ์ ์ฅํฉ๋๋ค.

![์บก์ฒ444](https://user-images.githubusercontent.com/69498804/107318128-66360680-6adf-11eb-9717-e2ca76d16ec4.JPG)

<br/>
<br/>

๋ค์๊ณผ ๊ฐ์ด ReView Tab์ ํ์ธํ๊ณ  AG๋ฅผ ์์ฑํฉ๋๋ค.

![์บก์ฒ3](https://user-images.githubusercontent.com/69498804/107318410-0f7cfc80-6ae0-11eb-8cc6-7b0d67d60823.JPG)


<br/>
<br/>

๐คณ AGW๋ ์์ฑํ๋๋ฐ 5~8๋ถ์ ๋ ์์๋ฉ๋๋ค. 


<br/>


---


### AG ์์ฑ ํ Back-end Target ์์ฑ ๋ฐ ์ถ๊ฐ  


์๊น Back-end๋ฅผ ์์ฑํ ๋ Target์ด ์์ด ์์ฑํ๊ธฐ์ Target์ ๋ง๋ค์ด ์ถ๊ฐํด์ค์๋ค.  

<br/>


1. VM2๊ฐ ์์ฑ, (VM ์์ฑ ์ Networking Tab์ SubNet์ด AG์ ๊ฒน์น์ง ์๊ฒ ํด์ผํจ)

![์บก์ฒ4](https://user-images.githubusercontent.com/69498804/107318926-25d78800-6ae1-11eb-8509-f26dcc6fe2e5.JPG)

<br/>
<br/>

2. ํ์คํธ๋ฅผ ์ํ IIS ์ค์นํ๊ธฐ ์ํด Power Shell์ ์ฝ๋๋ค.

![์บก์ฒ6](https://user-images.githubusercontent.com/69498804/107319469-3dfbd700-6ae2-11eb-83a5-a893e8e42b09.JPG)

<br/>
<br/>


๋ค์ ์คํฌ๋ฆฝํธ๋ฅผ ์คํํ์ฌ VM์ IIS๋ฅผ ์ค์นํฉ๋๋ค.

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

์ค์น๊ฐ ์๋ฃ๋์์ต๋๋ค. (๋ ๊ฐ์ VM์ ๋ชจ๋ ์งํํด์ผ ํฉ๋๋ค.)

![์บก์ฒ5](https://user-images.githubusercontent.com/69498804/107320011-35f06700-6ae3-11eb-904e-beb6f3c2b38b.JPG)


<br/>
<br/>

3. AG์ Blade๋ฅผ ์ ์ ํ ์์ฑํ ๋ฐฑ ์๋ ์๋ฒ Pool์ ์ ์ํฉ๋๋ค.

![์บก์ฒ444324](https://user-images.githubusercontent.com/69498804/107320567-4b19c580-6ae4-11eb-99aa-d3ae437cf3a3.JPG)


<br/>
<br/>

๋ค์๊ณผ ๊ฐ์ด VM 2๊ฐ๋ฅผ ์ถ๊ฐํ๊ณ  ์ ์ฅํฉ๋๋ค.

![์บก์ฒ44434343](https://user-images.githubusercontent.com/69498804/107320518-2e7d8d80-6ae4-11eb-929a-dd40490068af.JPG)

<br/>
<br/>


---

## ๐ AG TEST!!

AG๊ฐ ์ ๋๋ก ๊ตฌ์ฑ๋์๋์ง ํ์ธํ๊ธฐ ์ํด VM๋ด์ IIS๋ฅผ ์ค์นํ์ผ๋ ์ด์  ํ์คํธ ํด๋ด์๋ค.  

<br/>


์ค์ ํ AG์ OverView Tab์์ PIP ์ ๋ณด๋ฅผ ํ์ธํ๊ณ  ํด๋น PIP๋ก ์ ์ํด๋ด์๋ค.

![์บก์ฒ5544554](https://user-images.githubusercontent.com/69498804/107320724-9fbd4080-6ae4-11eb-99af-3e54455d822b.JPG)

<br/>
<br/>

๋ค์๊ณผ ๊ฐ์ด IIS ํ์ด์ง๊ฐ ์ ์์ ์ผ๋ก ๊ตฌ๋๋๊ณ  ์์ต๋๋ค.

![vm1](https://user-images.githubusercontent.com/69498804/107320859-e14deb80-6ae4-11eb-92fd-481735c929b5.JPG)

<br/>
<br/>

๋ฌผ๋ก  AG์ด๊ธฐ ๋๋ฌธ์ F5(์๋ก๊ณ ์นจ)์ ์ฌ๋ฌ๋ฒ ํ๋ฉด ๋ค์๊ณผ ๊ฐ์ด VM2๋ก ํธ๋ํฝ์ด ๋ถ์ฐ๋ฉ๋๋ค.

![vm2](https://user-images.githubusercontent.com/69498804/107320906-fa569c80-6ae4-11eb-9d1d-18f5e57417e2.JPG)

<br/>

### ํ์คํธ ์๋ฃ!

---

## โ LoadBalancer 

๊ธฐ๋ณธ์ ์ผ๋ก Front-end๋ก ๋ค์ด์ค๋ Inbound Traffic์ Backend-PooL๋ก ๋ถ์ฐํ๋ ๋์๋ฐฉ์์  
์ด์  ํฌ์คํธ์์ ๋ค๋ค๋ L7 LB์ธ Application Gateway์ ๋์ผํฉ๋๋ค.  

๋ค๋ง LoadBalancer์ ์๊ณ ๋ฆฌ์ฆ์ ๋ฐฐํฌ ๋ชจ๋์ ๋ฐ๋ผ ๊ฒฐ์ ๋ฉ๋๋ค. ๊ธฐ๋ณธ ๊ฐ์ ์๋ ๊ทธ๋ฆผ์ฒ๋ผ ํํ ํด์๋ก ๋์ํฉ๋๋ค  

<br/>

Azure LoadBalancer์ ๋์

![load-balancer-distribution](https://user-images.githubusercontent.com/69498804/107323107-0cd2d500-6ae9-11eb-8513-8a934c22f6f0.png)


<br/>
<br/>

L4 LB๋ ์๋์ ๊ฐ์ด Public, Internal ๋๊ฐ์ง๋ก ์ค์  ํ  ์ ์์ต๋๋ค.    

![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/107323867-64257500-6aea-11eb-9891-5232c5802636.JPG)


Public LB : ์ธ๋ถ์ ํธ๋ํฝ์ ๋ด๋ถ๋ก ๋ถ์ฐ์ํค๋ ์ญํ   
Internal LB : ๋ํ Private IP๋ฅผ ๊ฐ์ง๊ณ  ๋ด๋ถ VM์ ํธ๋ํฝ์ ๋ถ์ฐ์ํค๋ ์ญํ   

* ์๋ฅผ ๋ค๋ฉด Public LB๋จ์ ์ฐ๊ฒฐ๋ VM์ Web์ผ๋ก๋ง ์ฌ์ฉํ๊ณ 
* Internal LB๋จ์ DB ์ฐ๊ฒฐ๋ก๋ง ์ฌ์ฉํด์ Privateํ๊ฒ ์ค์ ์ด ๊ฐ๋ฅํฉ๋๋ค.  


<br/>
<br/>

์ด์  LB๋ฅผ ์์ฑํด๋ณด๋ฉด์ ์์ธํ Option๋ค์ ๋ํด์ ์ค๋ชํ๊ฒ ์ต๋๋ค!!.

<br/>

---

## ๐ค LoadBalancer ์์ฑ

<br/>


Create a Resource Tab์์ LoadBalancer๋ฅผ ๋ง๋ค์ด ์ค๋๋ค.
    
![์บก์ฒ3333](https://user-images.githubusercontent.com/69498804/107325659-7ce35a00-6aed-11eb-87e6-d11e40c90b46.JPG)


* TYPE : ์์์ ์ค๋ชํ Internal, Public ๋๊ฐ์ง๋ฅผ ์ ํํ  ์ ์์ต๋๋ค.

* SKU (๊ฐ๊ฒฉ ๊ณ์ธต) : Basic, Standard ๋๊ฐ์ง๋ฅผ ์ ํ ํ  ์ ์์ต๋๋ค. 
    * Basic : SLA๋ฅผ ์ง์ํ์ง ์์ต๋๋ค
    * Standard : SLA : 99.99%, ๋ง์ฝ AZ๋ฅผ ์ฌ์ฉํ๋ค๋ฉด ์ฌ์ฉํด์ผํจ.

* PIP์ ๊ฒฝ์ฐ ์๋กญ๊ฒ ๋ง๋ค์์ต๋๋ค.

<br/>
<br/>

### Back-end PooL ์์ฑํ๊ธฐ  

<br/>


LB์ ์ค์  Tab์์ Back-end PooL์ ์์ฑํฉ๋๋ค.

![์บก์ฒ555](https://user-images.githubusercontent.com/69498804/107451079-e31dba80-6b89-11eb-8dda-0d27e4c7f556.JPG)

* ์ ๋ ๋ฏธ๋ฆฌ ์์ฑํด๋จ๋ VM 3๋ฅผ PooL์ ์ถ๊ฐํ์ต๋๋ค.

<br/>
<br/>

์ถ๊ฐ๋ backend-PooL ํ์ธ

![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/107325960-0004b000-6aee-11eb-9e72-d27855a22a1c.JPG)

<br/>
<br/>

---

### HealthProbe [์ํ ํ๋ก๋ธ] ์์ฑํ๊ธฐ  

HealthProbe๋ Back-end PooL์ VM ์ํ๋ฅผ ๋ชจ๋ํฐ๋ง ํ๋ ๊ธฐ๋ฅ์๋๋ค.  

<br/>

๋์ผํ๊ฒ LB์ Configure Tab์์ HealthProbe ์ค์ ์ ์ถ๊ฐํฉ๋๋ค.

![์บก์ฒ3](https://user-images.githubusercontent.com/69498804/107326110-40fcc480-6aee-11eb-9539-7c9f93c3e3f6.JPG)

* ํด๋น ์ค์ ์ VM์๊ฒ 2๋ฒ (Interbal 15์ด)๊ฐ ์๋ต์ด ์์ผ๋ฉด Traffic์ ๋ถ์ฐํ์ง ์์ต๋๋ค.


<br/>

---

### load balancer rule [๋ถํ ๋ถ์ฐ ๊ท์น] ์์ฑ

Back-end PooL์ VM์ Traffice์ ๋ถ์ฐ ์ํค๋ ๋ฐฉ๋ฒ์ ์ ์ํฉ๋๋ค.

<br/>

๋์ผํ๊ฒ LB์ Configure Tab์์ load balancer rule ์ค์ ์ ์ถ๊ฐํฉ๋๋ค.

![์บก์ฒ](https://user-images.githubusercontent.com/69498804/107452641-ed8d8380-6b8c-11eb-8493-a504ddd28f25.JPG)


* Port : LB์์ Traffic์ ๋ฐ์ Port
* Backend Port : Backend-PooL์ ์ฐ๊ฒฐ๋ VM๋ค์ด ์ฌ์ฉํ  Port
* Session persitence : ๋ถํ๋ถ์ฐ ํ๋ ๊ท์น์ 3๊ฐ์ง ์ ํ  ์ ์์

<br/>


---

## ๐ LB TEST 

์์์ LB์ ํ์ํ Backend-Pool, HealthProbe, LB Rule์ ๋ชจ๋ ์ค์ ํ์ผ๋ ํ์คํธ๋ฅผ ํด๋ณด๊ฒ ์ต๋๋ค.  
๊ฐ๋จํ๊ฒ TEST๋ฅผ ํ๊ธฐ ์ํด VM๋ค์ IIS๋ฅผ ์ค์น๋ฅผ ์งํํ๊ฒ ์ต๋๋ค.

<br/>


VM 1,2,3์ Bastion์ผ๋ก ์ ์ํด Windows PowerShell์ ์คํํฉ๋๋ค.


![์บก์ฒ333](https://user-images.githubusercontent.com/69498804/107330024-5ffe5500-6af4-11eb-8282-411e322441b2.JPG)


<br/>
<br/>


PowerShell ์ฐฝ์์ ์๋ ๋ช๋ น์ ์คํํ์ฌ ๋ค์์ ์ํํฉ๋๋ค.

* IIS ์๋ฒ๋ฅผ ์ค์นํฉ๋๋ค.
* ๊ธฐ๋ณธ iisstart.htm ํ์ผ์ ์ ๊ฑฐํฉ๋๋ค.
* VM ์ด๋ฆ์ ํ์ํ๋ ์ iisstart.htm ํ์ผ์ ์ถ๊ฐํฉ๋๋ค.

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

์ดํ LB์ PIP๋ก ์ ์ํ๋ฉด ์ ์์ ์ผ๋ก WEB Page๊ฐ ์ ์๋ฉ๋๋ค!

![์บก์ฒ333444](https://user-images.githubusercontent.com/69498804/107337984-609be900-6afe-11eb-9855-82cc54be5673.JPG)


<br/>

---

### ์ถ๊ฐ : Inbound NAT ์ค์ 

<br/>


LB์์ Inbound NAT๋ฅผ ์ค์ ํ๋ฉด PIP๋ฅผ ํตํด ํน์  VM์ ์ ์์ด ๊ฐ๋ฅํฉ๋๋ค.


![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/107454011-8b824d80-6b8f-11eb-83ea-45d7fa71554d.JPG)

SSH ์ฐ๊ฒฐ์ ์ํ Inbound NAT๋ฅผ ์ค์ ํ์ต๋๋ค.

* Port : Port Mapping์ ์ํด ์์์ ํฌํธ๋ก ์ง์ ํฉ๋๋ค.
* Target VM : ์ฐ๊ฒฐํ  VM์ ์ค์ ํฉ๋๋ค.  
* Target Port : VM๊ณผ ์ฐ๊ฒฐํ  Port๋ฅผ ์ง์ ํฉ๋๋ค.

<br/>
<br/>


### ์ถ๊ฐ ์ ๋ณด ์ฌํญ 

Azure์ L4 LoadBalancer๋ RR(Round-robin) ๋ฐฉ์์ Routing์ด ์ง์๋์ง ์์ต๋๋ค.  
๊ธฐ๋ณธ ๋ฐฉ์์ด HASH ์ด๊ณ  ClientIP, ClientIP & Protocol๋ก ์ด 3๊ฐ์ง ๋ฐฉ์์ด ์์ต๋๋ค.   
์์ 3๊ฐ์ง ๋ฐฉ์์์ HASH๋ฅผ ์ ์ธํ๊ณ ๋ Client <-> Server ๋งค์นญ์ ๋ฐฉ์์ด๊ธฐ ๋๋ฌธ์   
์ ๋๋ก๋ LoadBalancing์ด ๋์ง ์์ ์ ์์ต๋๋ค.   
๋ฐ๋ผ์ RR ๋ฐฉ์์ Routing ๋ฐฉ์์ ์ฌ์ฉํ๊ณ  ์ถ์ผ๋ฉด Application Gateway๋ Traffic Manager๋ฅผ ์ฌ์ฉํด์ผํฉ๋๋ค.

<br/>

---

## ๋ง์น๋ฉฐโฆ  


์ฌ์ค ๋ชจ๋  ๊ธฐ๋ฅ๋ค์ด ์ค์ค์ด ์ด๋ก ์ ์จ๋์ผ๋๊น ์ด๋ ค์๋ณด์ด๋ ๊ฑฐ์ง  
์ค์ ๋ก ๋์์๋ฆฌ์ ์ค์ ๋ฐฉ๋ฒ์ ๊ทธ๋ ๊ฒ ์ด๋ ต์ง ์๋ค๋ ๊ฒ์ ๊ณ์ ๊นจ๋ซ๊ณ  ์์ต๋๋ค.

---

```toc
```