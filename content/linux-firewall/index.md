---
emoji: ๐คฆโโ๏ธ
title: "[LINUX] - Firewall"
date: "2021-06-23 00:00:54"
author: nasa1515
tags: LINUX
categories: LINUX
---


## โ FIREWALL (์นจ์์ฐจ๋จ์์คํ) ๋?

๋ฆฌ๋์ค ๋ฐฉํ๋ฒฝ์ ์ธ๋ถ์ ๋คํธ์ํฌ์์ ๋ด๋ถ์ ์์คํ์ผ๋ก ์ ๊ทผํ๋ ๋คํธ์ํฌ ํจํท์ ์ฐจ๋จํฉ๋๋ค.  
๋ฆฌ๋์ค ๋ฐฉํ๋ฒฝ์ ๊ฒฝ์ฐ Netfilter์ ์ํด ์ ์ฉ๋๋ฉฐ ์์คํ ๋ด๋ถ๋ก ์ ๋ฌ, ํ๊ธฐ๋ฅผ ๊ฒฐ์ ํ๋ ๋ชจ๋์๋๋ค.


- RHEL7๋ถํฐ๋ ๋ฐฉํ๋ฒฝ์ ๊ด๋ฆฌํ๋ ๋ฐ๋ชฌ์ด firewalld๋ก ๋ณ๊ฒฝ๋์ด ๋ฐฉํ๋ฒฝ ์ค์ ์  
	iptables ๋ช๋ น์ด ๋์  ์๋ ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํด์ผ ํฉ๋๋ค.

	- firewall-cmd (์ฝ์  
	- firewall-config (X-Windows)  

<br/>

- ๊ธฐ์กด์ ์ฌ์ฉํ๋ ``iptables``์ด ์์ ์ด ์ฌ๋ผ์ง ๊ฒ์ ์๋๋๋ค. firewalld์ด iptables๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ๋์ํ๊ณ  ์์ ๋ฟ ์๋๋ค.  
	(firewalld์ iptables๋ฅผ ์์กด ํจํค์ง๋ก ๋๊ณ  ์์)

<br/>

- ๋ฐฉํ๋ฒฝ์๋ ``zone``(์์ญ)์ด๋ผ๋ ๊ฒ์ด ์กด์ฌํ๋๋ฐ ๊ฐ๋ฐฉ๋ ๋คํธ์ํฌ์ ์ฐ๊ฒฐ๋์ด ์๋ค๋ฉด public zone(๊ณต๊ฐ ์์ญ)์ ๋ฃฐ์ด ์ ์ฉ๋๊ณ ,   
	๊ฐ์ธ ๋คํธ์ํฌ์ ์๋ค๋ฉด ๋ค๋ฅธ zone์ ๋ฃฐ์ ์ ์ฉํ  ์ ์์ต๋๋ค. ๋คํธ์ํฌ ํํ์ ๋ฐ๋ผ ์ ์ฉํ๋ ๋ฐฉํ๋ฒฝ ๋ฃฐ์ ๋ค๋ฅด๊ฒ ํ  ์ ์์ต๋๋ค.  
	(์๋ฒ ์ฉ๋๋ก ๋ฆฌ๋์ค๋ฅผ ์ฌ์ฉํ๋ค๋ฉด ๊ฐ๋ฐฉ๋ ๋คํธ์ํฌ public zone๋ง ํ์)  
    

<br/>

- 	iptables์ ๋ฃฐ ๋ณ๊ฒฝ์ ์๋น์ค ์ค์ง ๋ฐ ์ค์  ๋ณ๊ฒฝ์ ํ์ฌ์ผ ํ์ง๋ง firewall์ ๊ฒฝ์ฐ KVM, openstack๊ณผ ๊ฐ์ ๊ฐ์ํ, ํด๋ผ์ฐ๋ ํ๊ฒฝํ์์์ ํํฐ๋ง ์ ์ฑ์ ๋์ ์ผ๋ก ์ถ๊ฐ ๊ฐ๋ฅํฉ๋๋ค.  
	(๋์ ์ด๊ธฐ๋๋ฌธ์ ์ธ์ ๋ ์ง ์ค์ ์ ๋ณ๊ฒฝํ  ์ ์๊ณ  ๋ฐ๋ก ์คํ๋๋ฉฐ ๋ฐฉํ๋ฒฝ์ ๋ค์ ๋ก๋ฉํ  ํ์๊ฐ ์์ผ๋ฏ๋ก ๊ธฐ์กด ๋คํธ์ํฌ ์ฐ๊ฒฐ์์ ์๋ํ์ง ์์ ์ค๋จ์ด ๋ฐ์ํ์ง ์์ต๋๋ค.)  


<br/>

- iptables์ ๊ฒฝ์ฐ ์์ฉํ๋ก๊ทธ๋จ ์์ฒด์์ ํํฐ๋ง ์ ์ฑ์ ๊ตฌ์ฑํ๋ ๊ฒฝ์ฐ iptables ์ ์ฑ๊ณผ ์ถฉ๋๋๋ ๋ฑ์ ๋ฌธ์ ๊ฐ ๋ฐ์ํ์์ผ๋  
	firewalld๋ DBUS API๋ฅผ ํตํ ์ ๋ณด ๊ณต์ ๋ฅผ ํตํด ์ ์ฑ ์ถฉ๋ ๋ฌธ์ ๋ฅผ ํด๊ฒฐํฉ๋๋ค.  

<br/>

---



## โจ firewall ๊ตฌ๋๋ฐฉ์  

- ์ค์ ํ์ผ์ /etc/firewalld/zones/public.xml ํ์ผ๋ก xml ํ์์ผ๋ก ์กด์ฌํฉ๋๋ค.  
	ํด๋น ํ์ผ์๋ ``firewall-cmd --permanent --zone=public`` ๋ช๋ น์ผ๋ก ์ถ๊ฐํ๋ ๋ฃฐ๋ค์ด ์ ์ฅ๋์ด ์์ผ๋ฉฐ  
    zone์ ์ค์  ํ์ผ์ ๋ณ๊ฒฝํ  ๊ฒฝ์ฐ ๋ฐฉํ๋ฒฝ์ reload ํด์ผ ๋ฐ์์ด ๋ฉ๋๋ค.  

<br/>

- firewall-cmd ์์ ``--permanent`` ์ต์์ด ๋ค์ด๊ฐ๋ค๋ฉด ๋ฐ๋ก ๋ฐ์์ด ๋์ง์๊ณ  zone์ ์ค์ ํ์ผ์์ ๋ฃฐ์ ๋ํ ์ถ๊ฐ/์์ ๋ง ์ด๋ฃจ์ด์ง๋๋ค.  
	๋ฐ๋ผ์ --permanet ์ต์์ ๋ฃ์๋ค๋ฉด ๋ฐฉํ๋ฒฝ์ reload ํด์ผํฉ๋๋ค (์ค์ ํ์ผ์ ์ถ๊ฐ๋ ๋ฃฐ์ ์๊ตฌ๋ฐ์)  
	๋ง์ฝ --permanet ์ต์์ ๋ฃ์ง์์ผ๋ฉด ์ผ์์ ์ผ๋ก ์ฆ์ ๋ฐ์๋์ง๋ง ์ฌ๋ถํ์ ํ  ๊ฒฝ์ฐ zone์ ์ค์ ํ์ผ์ ์ถ๊ฐ๋์ง ์์ ๋ฃฐ์ด๋ฏ๋ก ์ ๋ถ ์ญ์ ๊ฐ ๋ฉ๋๋ค.  


* ํน์ง  

	1.  XML ํ์ผ ํํ๋ก ์ ์ฑ ๋ณด๊ด ๊ฐ๋ฅ  
	2. Runtime(์คํ์ค) ๋ฐ Permanent(์๊ตฌ) ์ค์  ๊ฐ๋ฅ

<br/>

-----

 
## ๐ ๊ด๋ จ ๋ณด์ ์์คํ   


### ์นจ์์ฐจ๋จ์์คํ(FW) 
   
- packet filter : ํจํท์ ๋ชฉ์ ์ง ์์ค ๋ฑ์ ๋ฃฐ์ด ๋ง์ผ๋ฉด ํต๊ณผ. (3๊ณ์ธต๊น์ง๋ง ํ์ธ)

- application g/w :  ๋ชจ๋  ๊ณ์ธต์ ๋ํ ํจํท์ ํ์ธ  (์ต์์ ๊ณ์ธต๊น์ง) (๋๋ฆฌ๋ค - proxy) - ๊ฐ์ฅ ๊ฐ๋ ฅํ ๋ณด์ 

- stateful inspection : ๋ฐฉํ๋ฒฝ์ ํตํด ์ ๋ฌ๋ ํจํท์ ์๋ตํจํท์ ๋ฃฐ์ ๋ณด์ง์๊ณ  ํ์ฉํ๋ค. (๋ฃฐ์ด ๋ง์์ง๊ธฐ ๋๋ฌธ)

<br/>

### ์นจ์ํ์ง์์คํ(IDS)  
์ด๋ฏธ ์นจ์์ ํ๊ณ  ๋์์ ํ์ ๋ ๋ฐ์์ ํ๋ ๋ฌธ์ ์ ์ด ์์. (out of path)
	
- ์๊ทธ๋์ณ ๋ฐฉ์ (ํจํด์ ์ ์ฅํ๊ณ  ํจํด์ ํ์ธ)
- anomaly ๋ฐฉ์
	
<br/>

### ์นจ์๋ฐฉ์ง์์คํ(IPS) - ๋์ ์ ์ ํ์ง ์ฆ์ ๋ฐ์ , (inline) 

- bastion host : ๊ณต์ธ/์ฌ์ค ๋ง์ ์ฐ๊ฒฐ๋ ํธ์คํธ (์ฆ ์ธ๋ถ์์ ๋ดค์๋ ๊ฐ๋ ค์ ธ์๋ ํธ์คํธ๋ค)  
- dual homed g/w : ์ธ๋ถ/๋ด๋ถ 2๊ฐ๋ก ๋๋ ์ ธ ์๋ ๋ฐฉํ๋ฒฝ์ ๊ฒฝ์ฐ ๋ค์ด์ค๋, ๋๊ฐ๋ ๋ชจ๋์ ๋ฃฐ์ ์ ํด์ฃผ๋ ๋ฐฉ์  
- screend subnet : NIC 3๊ฐ ์ด์,  ์ธ๋ถ, ๋ด๋ถ, DMA(server farm) ์ผ๋ก ๋๋๋ค. ์ฆ ์ฌ๋ด/๊ณต๊ฐ๋ก ์์ญ์ ๋๋  ๊ด๋ฆฌ.


![์คํฌ๋ฆฐ์ท, 2020-07-23 09-59-24](https://user-images.githubusercontent.com/64260883/88243392-3c47fe80-cccb-11ea-87d3-34c9157876cf.png)

<br/>

---

## ๐ FireWall ์์คํ ํ์ธ   



### /usr/lib/firewalld : ๊ธฐ๋ณธ ๊ตฌ์ฑ ๊ด๋ จ ํ์ผ

```cs
[root@centos /]$  ls -alrt /usr/lib/firewalld/
ํฉ๊ณ 20
drwxr-xr-x.  7 root root   81  4์  7 23:37 .
drwxr-xr-x.  2 root root  224  6์ 29 09:39 helpers
drwxr-xr-x.  2 root root 4096  6์ 29 09:39 icmptypes
drwxr-xr-x.  2 root root   20  6์ 29 09:39 ipsets
drwxr-xr-x.  2 root root 8192  6์ 29 09:39 services
drwxr-xr-x.  2 root root  163  6์ 29 09:39 zones
dr-xr-xr-x. 42 root root 4096  6์ 29 10:23 ..
```

### /etc/firewalld : ์ค์  ํ์ผ, ๊ท์น ํ์ผ

```cs
[root@centos /]$  ls -alrt /etc/firewalld/
ํฉ๊ณ 20
drwxr-x---.   2 root root   46  4์  7 23:37 zones
drwxr-x---.   2 root root    6  4์  7 23:37 services
-rw-r--r--.   1 root root  272  4์  7 23:37 lockdown-whitelist.xml
drwxr-x---.   2 root root    6  4์  7 23:37 ipsets
drwxr-x---.   2 root root    6  4์  7 23:37 icmptypes
drwxr-x---.   2 root root    6  4์  7 23:37 helpers
-rw-r--r--.   1 root root 2706  4์  7 23:37 firewalld.conf
drwxr-x---.   7 root root  133  6์ 29 09:39 .
drwxr-xr-x. 147 root root 8192  7์  7 18:44 ..
```

----
 
## ๐ FireWall ์ฌ์ฉ ๋ฐฉ๋ฒ

ํฌ์คํธ์์๋ ์์ฃผ ์ฌ์ฉํ๋ ๋ช๋ น ์์ฃผ๋ง ์ ๋ฆฌํ๋ค.  



### ํฌํธ

- ํฌํธ์ถ๊ฐ

```cs
# firewall-cmd --permanent --zone=public --add-port=ํฌํธ
ex) firewall-cmd --permanent --zone=public --add-port=80/tcp
# firewall-cmd --reload   -- ์ ์ฑ ๋ณ๊ฒฝ ํ reload ํ์!!
```

<br/>

- ํฌํธ ์ ๊ฑฐ

```cs
# firewall-cmd --permanent --zone=public --remove-port=ํฌํธ
ex) firewall-cmd --permanent --zone=public --remove-port=80/tcp
# firewall-cmd --reload
```


<br/>

### ์๋น์ค  

์๋น์ค์์ ์ฌ์ฉํ๋ ๋ฃฐ์ ์ ์ฉํ๋ ค๋ฉด ์๋์ ๊ฐ์ด ์๋น์ค๋ฅผ ์ถ๊ฐํ๋ฉด ๋๋ค.   
๋จ, ํด๋น ์๋น์ค xml ๋ฃฐ ํ์ผ์ด ``/usr/lib/firewalld/services`` ์ ์์ด์ผ ํ๋ค.  
๊ทธ๋ฆฌ๊ณ  ``/usr/lib/firewalld/services`` ๋๋ ํ ๋ฆฌ์ ์๋ ์๋น์ค ํ์ผ๋ค์ ์์ ํ๋ ค๋ฉด  /etc/firewalld/services์ ๋ณต์ฌ ํ ์์ ํด์ผ ํ๋ค.  
(/etc/firewalld/services์ ์๋ ์๋น์ค ํ์ผ๋ค์ด ์ฐ์  ์ ์ฉ๋๊ธฐ์ ๊ด๋ฆฌ์ ํธ๋ฆฌ)    

* ์๋น์ค ์ถ๊ฐ

```cs
firewall-cmd --permanent --zone=public --add-service=์๋น์ค
ex) firewall-cmd --permanent --zone=public --add-service=http
# firewall-cmd --reload
```

* ์๋น์ค ์ ๊ฑฐ

```cs
firewall-cmd --permanent --zone=public --remove-service=์๋น์ค
ex) firewall-cmd --permanent --zone=public --remove-service=http
# firewall-cmd --reload
```

<br/>

### ์์์ ๋ฃฐ (Rich rule)  

ํฌํธ, ์๋น์ค ๋ฃฐ ์ด์ธ์ ์ํ๋ ๋ฃฐ์ ์์๋ก ์ ์ฉํ  ์ ์๋ค. ์๋ฅผ ๋ค๋ฉด ip์ฐจ๋จ์ด๋ค.


* ๋ฃฐ ์ถ๊ฐ

```cs
# firewall-cmd --permanent --zone=public --add-rich-rule="์์์ ๋ฃฐ"
ex) firewall-cmd --permanent --zone=public --add-rich-rule="rulefamily=ipv4 source address=192.168.0.4/24 service name=http accept"
# firewall-cmd --reload
```

* ๋ฃฐ ์ ๊ฑฐ

```cs
# firewall-cmd --permanent --zone=public --remove-rich-rule="์์์ ๋ฃฐ"
ex) firewall-cmd --permanent --zone=public --remove-rich-rule="rulefamily=ipv4 source address=192.168.0.4/24 service name=http accept"
# firewall-cmd --reload
```

<br/>

#### ์์ฉ ์์ - http(80๋ฒ ํฌํธ) ์๋น์ค์์ ํน์  ip ์ฐจ๋จ  
์น์๋ฒ๋ฅผ ์ด์ํ๋ค๋ณด๋ฉด ํน์ ip(์คํธ๊ฐ์)๋ฅผ ์ฐจ๋จ์ํค๊ณ  ์ถ์ ๋๊ฐ ์๋ค.  
๊ทธ๋ด๊ฒฝ์ฐ ์๋์ ๊ฐ์ด ์์์ ๋ฃฐ์ ํ์ฉํ๋ฉด ๋๋ค.  

```cs
์ฐจ๋จ์)
# firewall-cmd --permanent --zone=public --add-rich-rule="rule family=ipv4 source address=์ฐจ๋จip service name=http reject"
์ฐจ๋จํด์ ์)
# firewall-cmd --permanent --zone=public --remove-rich-rule="rule family=ipv4 source address=์ฐจ๋จip service name=http reject"
# firewall-cmd --reload
์ ๋ช๋ น์ ์คํํ๋ฉด ์ฆ์ ์๊ตฌ์ ์ผ๋ก ํด๋น ip๋ฅผ ์น์ฌ์ดํธ์ ์ ์ํ์ง๋ชปํ๊ฒ ์ฐจ๋จ์ํฌ ์ ์๋ค.
์ด ๋ฐฉ๋ฒ์ ์น์๋ฒ ์์ฒด์์ ip๋ฅผ ์ฐจ๋จ์ํค๋ ๊ฒ๋ณด๋ค ํจ๊ณผ์ ์ด๋ค.
```

<br/>

#### ๋ฐฉํ๋ฒฝ ๊ธฐํ ๋ช๋ น์ด

```cs
- zone -
* ์ฌ์  ์ ์๋ ์กด ๋ชฉ๋ก ์ถ๋ ฅ
# firewall-cmd --get-zone
* ์ ์ฒด ์กด ๋ชฉ๋ก์ ์์ธํ๊ฒ ์ถ๋ ฅ
# firewall-cmd --list-all-zone
* ๊ธฐ์กด ์กด ์ถ๋ ฅ
# firewall-cmd --get-default-zon
* ํ์ฑํ๋ ์กด ์ถ๋ ฅ
# firewall-cmd --get-active-zon
* public zone์ ์๋ ์๋น์ค ๋ชฉ๋ก
# firewall-cmd --zone=public --list-service
-------------------------------------------
- service 
* ํ์ฌ ์กด์ฌํ๋ ์๋น์ค ๋ชฉ๋ก
# firewall-cmd --get-servic
* permanent ๋ก ๋ฑ๋ก๋ ์๋น์ค ๋ชฉ๋ก
# firewall-cmd --permanent --list-al
-------------------------------------------
- port 
* ํ์ฉํ ํฌํธ ๋ชฉ๋ก
# firewall-cmd --list-ports
-------------------------------------------
- other 
* ๋ฐฉํ๋ฒฝ ์ํ ํ์ธ
# firewall-cmd --stat
```

```toc
```