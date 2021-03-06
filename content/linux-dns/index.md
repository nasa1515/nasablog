---
emoji: ๐คฆโโ๏ธ
title: "[LINUX] - DNS"
date: "2021-06-23 00:00:58"
author: nasa1515
tags: LINUX
categories: LINUX
---


๋จธ๋ฆฌ๋ง 

DNS์ ๋ํด์ ์ด๋ก ์ ์ธ ๋ด์ฉ๋ ๋์ถฉ ์๊ณ  ์์์ต๋๋ค๋ง ์ด๋ฒ ํฌ์คํธ๋ฅผ ์์ฑํ๋ฉด์ ์ด๋ก ์ ์ธ ๋ด์ฉ๊ณผ ํจ๊ป  
์ค์ ๋ก ๊ตฌ์ถ ์ค์ต์ ํด๋ณด๋ฉด์ ์ ํํ ๊ฐ๋์ ์ป์ ์ ์์์ต๋๋ค. 

---


## โ DNS (Domain Name Server) ๋?

 DNS๋ ๋๋ฉ์ธ ๋ค์ ์๋ฒ๋ฅผ ์ผ์ปซ์ต๋๋ค.  
 ์ธํฐ๋ท์ ์๋ฒ๋ค์ ์ ์ผํ๊ฒ ๊ตฌ๋ถํ  ์ ์๋ IP์ฃผ์๋ฅผ ๊ธฐ๋ณธ์ฒด๊ณ๋ก ์ด์ฉํ๋๋ฐ  
 ์ซ์๋ก ์ด๋ฃจ์ด์ง ์กฐํฉ์ด๋ผ ์ธ๊ฐ์ด ๊ธฐ์ตํ๊ธฐ์๋ ๋ฌด๋ฆฌ๊ฐ ๋ฐ๋ฆ๋๋ค.  
 ๋ฐ๋ผ์ DNS๋ฅผ ์ด์ฉํด IP์ฃผ์๋ฅผ ์ธ๊ฐ์ด ๊ธฐ์ตํ๊ธฐ ํธํ ์ธ์ด ์ฒด๊ณ๋ก ๋ณํํ๋ ์์์ด ํ์ํ๋ฐ  
 ์ด ์ญํ ์ DNS๊ฐ ํ๋ ๊ฒ์๋๋ค.  
  

<br/>

### ํน์ง
  
-   PORT : 53
-   PROTOCOL : TCP/UDP
-   ๋๋ ํ ๋ฆฌ ์๋น์ค [ํธ๋ฆฌ ํ ๊ตฌ์กฐ๋ฅผ ๊ฐ์ง๊ณ  ์๋ค.] - BIND ์๋น์ค ๊ธฐ์ค์ผ๋ก ๋ง๋ค์ด์ก์.
-   ๋ฐ์ดํฐ๋ฒ ์ด์ค์์ "๋ ์ฝ๋" ํ์์ ๋จ์๋ฅผ ์ฌ์ฉ

![5-3. DNS ์ค์น ๋ฐ ๊ตฌ์ฑ](https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfs15.tistory.com%2Fimage%2F27%2Ftistory%2F2008%2F11%2F16%2F21%2F49%2F492016d564daa)

<br/>

### ์๋ฒ์ ๊ตฌ์ฑ

1.  master server
2.  slave server (Zone data DB๋ฅผ ๊ฐ์ง๊ณ  ์๋ค.)
3.  cache (only) server (Zone data DB๋ฅผ ๊ฐ์ง๊ณ  ์์ง ์๋ค.)

<br/>

---

## โ ๋๋ฉ์ธ์ด๋ฆ์ ์ฒด๊ณ์ DNS ์ง์ ๊ณผ์  

์ธํฐ๋ท ๋๋ฉ์ธ์ ์๋ ๊ทธ๋ฆผ๊ฐ์ด ํ๋์ ์ญํธ๋ฆฌ ๊ตฌ์กฐ๋ฅผ ํ๊ณ  ์์ต๋๋ค. [๋๋ ํ ๋ฆฌ ๊ตฌ์กฐ]

![](https://t1.daumcdn.net/cfile/tistory/2316A93F51C462940C)

์ธํฐ๋ท ๋๋ฉ์ธ์ ์ฒด๊ณ์์ ์ต์์๋ ``๋ฃจํธ(root)``๋ก ์ธํฐ๋ท๋๋ฉ์ธ์ ์์์ ์ด ๋ฉ๋๋ค.  
๋ฃจํธ๋๋ฉ์ธ ๋ฐ๋ก ์๋๋จ๊ณ๋ ``1๋จ๊ณ`` ๋๋ฉ์ธ์ด๋ผ๊ณ  ํ๋ฉฐ ์ด๋ฅผ ``์ต์์ ๋๋ฉ์ธ``์ด๋ผ๊ณ  ํ๊ณ .  
์ต์์ ๋๋ฉ์ธ์ ๊ตญ๊ฐ๋ช์ ๋ํ๋ด๋ ๊ตญ๊ฐ ์ต์์ ๋๋ฉ์ธ์ด ์ผ๋ฐ ์ต์์ ๋๋ฉ์ธ์ผ๋ก ๊ตฌ๋ถ๋ฉ๋๋ค.

<br/>

---

## โจ ๋๋ฉ์ธ ์ง์ ๊ณผ์     

๋๋ฉ์ธ ์ง์๋ /etc/resolv.conf ์ ์ง์ ๋ ๋ค์์๋ฒ๋ก ์ ์ํ์ฌ ์๋ ๊ทธ๋ฆผ๊ณผ ๊ฐ์ ์ง์ ๊ณผ์ ์ ๊ฑฐ์น๊ฒ ๋ฉ๋๋ค.

![](https://t1.daumcdn.net/cfile/tistory/026CF23451C465CE34)

1. Client์์ ์ง์ ๋ NS๋ก www.yahoo.com์ ๋ํ ์์ฒญ์ ์ ๋ฌํ๋ค.  

<br/>

2. ์ผ๋ฐ NS์๋ฒ๋ ๋ฃจํธNS์๋ฒ์ IP์ฃผ์๋ฅผ ๊ธฐ๋กํ 'hint ํ์ผ'์ ๊ฐ์ง๊ณ  ์๋ค.  
	์ด๊ฒ์ ์ฐธ์กฐํ์ฌ ๋ฃจํธ์ www.yahoo.com์ ๋ํ ์์ฒญ์ ์ ๋ฌํฉ๋๋ค.   
	๋ฃจํธ๋ ์ต์์๋ค์์๋ฒ๋ค์ ๋ค์์๋ฒ๋ช(NS๋ ์ฝ๋)๊ณผ IP์ฃผ์(A๋ ์ฝ๋)๋ฅผ ๊ฐ์ง๊ณ  ์๋ค.  
	์ด๋ฅผ ``๊ธ๋ฃจ๋ ์ฝ๋/glue record``๋ผ๊ณ  ํฉ๋๋ค.  
	์ด ๊ธ๋ฃจ๋ ์ฝ๋๋ฅผ ์ฐธ์กฐํ์ฌ .com ๋ค์์๋ฒ๋ฅผ ์ฐธ์กฐํ๋ผ๊ณ  ์๋ตํฉ๋๋ค  
	(๋ฃจํธ ๋ค์์๋ฒ๋ ์ ์ธ๊ณ์ 13๊ฐ๋ฟ์๋๋ค).

<br/>

3. .com ๋ค์์๋ฒ์๋ .com์ ์ต์์๋๋ฉ์ธ์ผ๋ก ์ฌ์ฉํ๋ ๋๋ฉ์ธ๋ค์ ๊ธ๋ฃจ๋ ์ฝ๋๋ฅผ ๊ฐ์ง๊ณ  ์๊ธฐ์  
	์ด๋ฅผ ์ฐธ์กฐํ์ฌ www.yahoo.com์ ๋ค์์๋ฒ๋ฅผ ์ฐธ์กฐํ๋ผ๊ณ  ์๋ตํ๋ค.

<br/>

4. yahoo.com์ ๋ค์์๋ฒ๋ yahoo.com ๋๋ฉ์ธ์ ๋ํ ์กด(zone)ํ์ผ์ ์ฐธ์กฐํ์ฌ  
	www.yahoo.com์ IP์ฃผ์(A๋ ์ฝ๋)๋ฅผ ํด๋ผ์ด์ธํธ๊ฐ ์ต์ด ์์ฒญ์ ํ ๋ค์์๋ฒ๋ก ๋๋๋ ค ์ค๋ค.

<br/>

5. ์ต์ด ์์ฒญ์ ๋ฐ์ ๋ค์์๋ฒ๋ ํด๋ผ์ด์ธํธ์๊ฒ www.yahoo.com์ IP์ฃผ์๋ฅผ ์ ์กํ๋ค.

	DNS์๋ฒ๋ ํ ๋ฒ ๊ฒ์ํ ๊ฒฐ๊ณผ๋ ๋ฉ๋ชจ๋ฆฌ์ ์บ์์ ๊ธฐ๋กํ๋ฉฐ  
	๊ฐ์ ์ ๋ณด๊ฐ ์์ฒญ๋๋ฉด ์บ์์ ์๋ ์ ๋ณด๋ฅผ ์ ์กํ๋ค.  
	์บ์์๋ ์ ํจ๊ธฐ๊ฐ(TTL:Time To Live)์ด ์ ํด์ ธ ์์ผ๋ฏ๋ก ์ ํจ๊ธฐ๊ฐ์ด ์ง๋ ์ ๋ณด๋ ์บ์์์ ์ญ์ ๋๋ค.

<br/>

 ----


## ๐ DNS ์ง์ ์ฟผ๋ฆฌ 

### 1. ์ฌ๊ท์  ๋ณํ/ ์ฌ๊ท ์ฟผ๋ฆฌ RECURSIVE

- ์ผ๋ฐ์ ์ธ ๋ค์์๋ฒ
- ํด๋ผ์ด์ธํธ์ ์ต์ข ๊ฒฐ๊ณผ๊ฐ์ ๋ฐํ
- ํด๋ผ์ด์ธํธ(Sub Resolver)๋ก๋ถํฐ ๋๋ฉ์ธ ๋ค์ ์ง์ ์์ฒญ์ด ๋ค์ด์ฌ ๊ฒฝ์ฐ  
	๋ค์์๋ฒ๊ฐ ์ง์  Name space๋ฅผ ํ์ํ์ฌ ๊ฒฐ๊ณผ ๊ฐ์ ๋ฐํํ๋ ๋ฐฉ์.



![์คํฌ๋ฆฐ์ท, 2020-08-13 19-32-45](https://user-images.githubusercontent.com/69498804/90124690-c69bf380-dd9b-11ea-90d7-db937e9b7d00.png)

  
  
์์ ๊ทธ๋ฆผ๊ฐ์ด ์ฌ๊ท์ฟผ๋ฆฌ๋ ์ปดํจํฐ๊ฐ ๋ฆฌ์กธ๋ฒ์๊ฒ kr.yahoo.com์ ๋ฌผ์ด๋ณด๋ฉด resolver๋ DNS์๋ฒ์ ๋ฌผ์ด๋ณธ๋ค.  
DNS์๋ฒ๊ฐ ์ฌ๊ท์ ๋ณํ์ด๋ฉด (Root์ ๋ค์์๋ฒ๋ ๋ฌด์กฐ๊ฑด ์ํ์ฟผ๋ฆฌ)  
resolver๋ ๋ ์ด์ ์ฐพ์ง์๊ณ  ์ฌ๊ท์ ๋ฐฉ์์ธ DNS์๋ฒ (์ด ๊ทธ๋ฆผ์์  Root๋ค์์๋ฒ)๊ฐ ์ฐพ์์  
resolver์๊ฒ ์ ๋ฌํด์ค๋ค, ๊ทธ๋ผ resolver๋ ๋ค์ ์ปดํจํฐ์๊ฒ ์ด ๊ฐ์ ์๋ ค์ค๋ค.

<br/>

---

### 2. ๋ฐ๋ณต์  ๋ณํ/ ์ํ ์ฟผ๋ฆฌ TERATIVE

- Root ์๋ฒ๋ ๋ฌด์กฐ๊ฑด ์ํ์ฟผ๋ฆฌ, TLD๋ค์์๋ฒ๋ ์ผ๋ถ๋ง ์ํ์ฟผ๋ฆฌ์ด๋ค.
- ๋ฐ๋ณต์  ๋ณํ - ์์ ์ด ์ง์  ๊ด๋ฆฌํ์ง ์๋ ์ง์ ์์ฒญ์ ๊ฒฝ์ฐ ์ง์์ ์๋ต ๊ฐ๋ฅํ NS๋ชฉ๋ก์ ์๋ต.  
(์ง์์ ์๋ต๊ฐ๋ฅํ NS๋? ๋ง์ฝ ์ปดํจํฐ๊ฐ ์ง์ํ ๊ฒ์ด kr.yahoo.com.์ด๊ณ  ์์ ์ com.๋๋ฉ์ธ์ด๊ณ   
์์ ์ ํ์๋๋ฉ์ธ์ yahoo.com.์ด ์์ ๋, ์ปดํจํฐ์๊ฒ yahoo.com.์ ์๋ ค์ค๋ค.)


![์คํฌ๋ฆฐ์ท, 2020-08-13 19-33-32](https://user-images.githubusercontent.com/69498804/90124758-e206fe80-dd9b-11ea-9be4-c7d1039c0315.png)


  

์ด๋ ๊ฒ ๋ฐ๋ณต์  ๋ณํ์ ์ปดํจํฐ๊ฐ ๋ฆฌ์กธ๋ฒ์๊ฒ kr.yahoo.com์ ๋ฌผ์ด๋ณธ๋ค๋ฉด  
๋ฆฌ์กธ๋ฒ๋ DNS์๊ฒ kr.yahoo.com.์ IP๋ก ๋ฐ๊ฟ๋ฌ๋ผ๊ณ  ์์ฒญํ๋ค(kr.yahoo.com.์ ๋ํด ์ง์ํ๋ค)  
์ด๋ ๋ฆฌ์กธ๋ฒ๊ฐ ๋ฌผ์ด๋ณธ DNS์๋ฒ๊ฐ ๋ฐ๋ณต์  ๋ณํ๋ฐฉ์์ธ ์ดํฐ๋ ์ดํฐ๋ธ๋ผ๋ฉด  
์ฌ๊ท์  ๋ณํ์ฒ๋ผ ์ฐพ์์ฃผ์ง์๊ณ  ์ง์์ ์๋ต์ด ๊ฐ๋ฅํ NS๋ชฉ๋ก์ ์๋ตํ๋ค.  
์ด ๊ทธ๋ฆผ์์  ๋ฆฌ์กธ๋ฒ๊ฐ ์ฒ์์ .(root) DNS์ ๋ฌผ์ด๋ดค๊ธฐ ๋๋ฌธ์  
DNS๋ ์์ ํ์์์๋ TLDs์ค yahoo.com.์ ๊ด๋ฆฌํ๊ณ ์๋ com.DNS๋ฅผ ์๋ ค์ฃผ๊ฒ ๋๋ค.  
์ด๋ ๊ฒ ๋ฐ๋ณตํ๋ค ๋ณด๋ฉด kr.yahoo.com.๊น์ง ๋๋ฌํ๋ค.
	
<br/>


 ---

    
## ๐ถ DNS ๊ตฌ์ถ ๋ฐฉ๋ฒ



### ์ค์  CONFIG   
	
* 1. /etc/named.conf 

	```cs
	NS ๋ฐ์ดํฐ๋ฒ ์ด์ค ๋ฐ zone ํ์ผ์ ์์น, ์ ๊ทผ์ ์ด๋ฑ์  
	๋ณด์์ค์ ์ ํ  ์ ์๋ ๋ฉ์ธ ์ค์ ํ์ผ.
	```

* 2. /var/named  

	```cs
	๋ค์์๋ฒ์ zone ํ์ผ ๋๋ ํ ๋ฆฌ์ ๊ฒฝ๋ก  
	chroot ์ค์ ์ /var/named/ ๋๋ ํ ๋ฆฌ์ ์ค์ ๋ ๋ด์ฉ์  
	/var/named/chroot/var/named๋ก ์ฌ๋ณผ๋ฆญ ๋งํฌ๋ฅผ ๊ฑธ์ด์ค๋ค.
	```
  
* 3. /etc/named.rfc1912.zones 

	```cs
	๋ค์์๋ฒ์ ์ฟผ๋ฆฌ ์์ฒญ ์ ์ฌ์ฉํ  ๋๋ฉ์ธ ์ ๋ณด(์ ๋ฐฉํฅ ์์ญ๊ณผ ์ญ๋ฐฉํฅ์์ญ)์ ์ค์ ํด์ผ ๋  ๋ถ๋ถ์๋๋ค.
	```

* 4. /var/named/[๋๋ฉ์ธ].zone 

	```cs
	๋ค์์๋ฒ ์ค์  ์ ๊ฐ์ฅ ์ค์ํ ๋๋ฉ์ธ ์ ๋ณด ํ์ผ์ด๋ฉฐ  
	๋ค์์๋ฒ๋ฅผ ๊ฐ๋์์ zone ํ์ผ์ ์ฝ์ด ๋ค์์๋ฒ ์๋น์ค๊ฐ ๊ฐ๋๋๋ฉฐ  
	zone ํ์ผ์ ๋๋ฉ์ธ์ IP ์ฃผ์๋ก ๋ณํํด ์ฃผ๋ ์ญํ ์ ํฉ๋๋ค.  
    ```

* 5.  resolv.conf ์ค์ 

	```cs
	์๋ฒ๊ฐ ๋ฐ๋ผ๋ณด๊ณ  ์๋ Domain Server์ ์ฃผ์ ์ค์  ํ์ผ์๋๋ค.
	```

<br/>
<br/>

**1. BIND ์ค์น**

```cs
[root@centos ~]$  yum -y install bind
```

<br/>


**2. /etc/named.conf ์ค์ **

```cs
 options {
listen-on port 53 { 127.0.0.1; };
listen-on-v6 port 53 { ::1; };
directory 	"/var/named";
dump-file 	"/var/named/data/cache_dump.db";
statistics-file "/var/named/data/named_stats.txt";
memstatistics-file "/var/named/data/named_mem_stats.txt";
recursing-file  "/var/named/data/named.recursing";
secroots-file   "/var/named/data/named.secroots";
allow-query     { localhost; };

/* 
 - If you are building an AUTHORITATIVE DNS server, do NOT enable recursion.
 - If you are building a RECURSIVE (caching) DNS server, you need to enable 
   recursion. 
 - If your recursive DNS server has a public IP address, you MUST enable access 
   control to limit queries to your legitimate users. Failing to do so will
   cause your server to become part of large scale DNS amplification 
   attacks. Implementing BCP38 within your network would greatly
   reduce such attack surface 
*/
recursion yes;

dnssec-enable yes;
dnssec-validation yes;

/* Path to ISC DLV key */
bindkeys-file "/etc/named.root.key";

managed-keys-directory "/var/named/dynamic";

pid-file "/run/named/named.pid";
session-keyfile "/run/named/session.key";
};
logging {
    channel default_debug {
            file "data/named.run";
            severity dynamic;
    };
};
zone "." IN {
type hint;
file "named.ca";
};
include "/etc/named.rfc1912.zones";
include "/etc/named.root.key";
```

<br/>


#### ๋ณ๊ฒฝ ์ฌํญ

```cs
๋ณ๊ฒฝ ์  - listen-on port 53 { 127.0.0.1; };
๋ณ๊ฒฝ ํ - listen-on port 53 { any; };
๊ธฐ๋ณธ์ค์ ์ 127.0.0.1์ ๋ฆฌ์ค๋๋ํ๊ธฐ ๋๋ฌธ์, ์ธ๋ถ์์ ์ ์์ด ๋ถ๊ฐ๋ฅํฉ๋๋ค ์๋ฒ์ ์ค์ ๋ ๋ชจ๋  IP์ ๋ํด ๋ฆฌ์ค๋ํ๋๋ก any๋ก ๋ณ๊ฒฝํฉ๋๋ค

๋ณ๊ฒฝ ์  - allow-query { localhost;};
๋ณ๊ฒฝ ํ - allow-query { any;};
๋ค์์๋ฒ์ ์ค์ ๋ ๋๋ฉ์ธ๋ง ์๋ตํ๋๋ก ์ค์ ํ๋๋ถ๋ถ์๋๋ค.

๋ณ๊ฒฝ์์ - recursion no;

yes๋ก ์ค์ ํ๋ฉด ๋ค์์๋ฒ์ ์ค์ ๋์ง ์์ ๋๋ฉ์ธ์ ๋ํ ์ง์๊ฐ ์์์ ์บ์ฑ ๋ค์์๋ฒ์ ์ญํ ์ ํ์ฌ DNS ์ง์๊ณผ์ ์ ๊ฑฐ์น๊ฒ ๋๋ฉฐ, ์ฃผ ๋ค์์๋ฒ๋ ์บ์ฑ ๋ค์์๋ฒ ์ญํ ์ด ํ์ํ์ง ์์ผ๋ฏ๋กno๋ก ์ค์ ํฉ๋๋ค.
```

<br/>

**3. named.rfc1912.zones ์ค์ **

```cs
zone "won.co.kr" IN {
    type master;
    file "won.co.kr.zone";
    allow-update { none; };
};
zone "56.168.192.in-addr.arpa" IN {
    type master;
    file "db.192.168.56";
    allow-update { none; };
};
```

named.rfc1912.zones์ ๋งจํ๋จ๋ถ๋ถ์ ์ถ๊ฐํ  ๋๋ฉ์ธ์ ๋ณด/ํ์ผ(test.com, test.com.zone)์ ์๋ ฅ.  
won.co.kr ๋๋ฉ์ธ์ ์ฌ์ฉํ๋ ค๋ฉด won.co.k.rzone([๋๋ฉ์ธ].zone)ํ์ผ์ ๋ง๋ค์ด์ผ ๋ฉ๋๋ค


<br/>

**4. ZONE ํ์ผ ์ค์ ํ๊ธฐ**  

```cs
[root@server named]# cp named.localhost won.co.kr.zone
```

/var/named์ ๋๋ ํ ๋ฆฌ๋ก ์ด๋ํ๋ฉด named.localhost ํ์ผ์ด ์์ต๋๋ค   
named.localhost์ ํ์ผ์ ์ฌ์ฉํ  ๋๋ฉ์ธ์ zoneํ์ผ์ ํ์ผ๋ช์ผ๋ก ๋ณต์ฌํฉ๋๋ค.  

<br/>

**์ค์  ๋ด์ฉ ํ์ธ**

<br/>

์ ๋ฐฉํฅ ํ์ผ
	
```cs
[root@centos named]$  cat won.co.kr.zone 
$TTL 1D
@	IN SOA	ns.won.co.kr root.won.co.kr. (
				0	; serial 	//์๋ฆฌ์ผ๊ฐ
				1D	; refresh 	//๋ณด์กฐ ๋ค์์๋ฒ๊ฐ ์ฃผ ๋ค์์๋ฒ์ ์ ์ํ๋ ์๊ฐ
				1H	; retry 	//์ ์ ์คํจ์ ๋ค์ ์๋ํ  ์๋ ๊ฐ๊ฒฉ
				1W	; expire 	//์ฃผ๋ค์์๋ฒ์์ ๋ฐ์ดํฐ๊ฐ ์๋ค๋ฉด 1์ฃผ ์ดํ์ ์ง์์ง
				3H )	; minimum 	//TTL ์ค์ ๊ณผ ๊ฐ์ ์๋ฏธ
@	IN	NS	ns.won.co.kr.		 	//๋๋ฉ์ธ์ ์์ฐํ ์ฃผ DNS์ ๋๋ฉ์ธ
IN	A	192.168.56.101 				//๋๋ฉ์ธ์ด ์ฐพ์๊ฐ IP์ฃผ์
ns	IN	A	192.168.56.101 			//์ฃผ ๋ค์์๋ฒ ์์ดํผ
www	IN	A	192.168.56.101    		//www.๋๋ฉ์ธ์ด ์ฐพ์๊ฐ IP์ฃผ์
```

<br/>

์ญ๋ฐฉํฅ ํ์ผ
	
```cs
$TTL 1D
@	IN SOA	ns.won.co.kr root.won.co.kr. (
				0	; serial
				1D	; refresh
				1H	; retry
				1W	; expire
				3H )	; minimum
@	IN	NS	ns.won.co.kr.
101	IN	PTR	ns.won.co.kr.
101	IN	PTR	www.won.co.kr.
```


<br>

  

**5. ZONE ํ์ผ ํ์ผ์ ์์ ๊ถ ๋ณ๊ฒฝ**



๋ณ๊ฒฝ ์ 

```cs
[root@centos named]$  ls -alrt *
-rw-r-----. 1 root  root   227  7์  8 19:28 won.co.kr.zone
-rw-r-----. 1 root  root   209  7์  8 19:36 db.192.168.56
```

๋ณ๊ฒฝ ํ

```cs
[root@centos named]$  chown named:root won.co.kr.zone db.192.168.56
[root@centos named]$  ls -alrt *
-rw-r-----. 1 named root   227  7์  8 19:28 won.co.kr.zone
-rw-r-----. 1 named root   209  7์  8 19:36 db.192.168.56
ํ์ผ์ ์์ฑ ํ ํ์ผ์ ์์ ๊ถ์ ๋ณ๊ฒฝํด ์ค๋๋ค.
```


<br/>
  

**6. ์ค์ ํ์ผ ๊ฒ์ฆ**


named.conf ํ์ผ ๊ฒ์ฆ

```cs
[root@centos named]$  named-checkconf /etc/named.conf 
[root@centos named]$  
```

named.conf ํ์ผ์ ๊ฒ์ฆํ๋ ๊ณผ์ ์ด๋ฉฐ, ์ ์์ ์ผ๋ก ์ค์ ์ ์ํ์๋ค๋ฉด ์๋ฌด๋ฐ ๋ฉ์์ง๊ฐ ๋์ค์ง ์์ต๋๋ค

  

<br/>

**zone ํ์ผ ๊ฒ์ฆ**

  

1) ์ ์์ ์ธ ์ค์  ๋ฉ์์ง

	```cs
	[root@centos named]# named-checkzone won.co.kr.zone  db.192.168.56
	zone test.com/IN: loaded serial 0
	OK
	```

	์์ ๊ฐ์ด OK ๋ฉ์์ง๋ฅผ ๋ณด์ฌ์ฃผ๋ฉด ์ค์ ์ ๋ฌธ์ ๊ฐ ์๋ ๊ฒ์๋๋ค.
  

	<br/>
 
2) ์๋ชป๋ ์ค์  ๋ฉ์์ง

	```cs
	[root@server named]# named-checkzone won.co.kr.zone
	zone won.co.kr.zone/IN: NS 'ns.won.co.kr.zone won.co.kr' has no address records (A or AAAA)
	zone won.co.kr.zone/IN: not loaded due to errors.
	```


<br/>

**7. resolv.conf ์ค์  ๋ณ๊ฒฝ**  

ํ์ผ์ ์ง์ ํ  ๋๋ฉ์ธ ์๋ฒ์ ์ฃผ์, GW์ค์ 

```cs
[root@centos named]$  cat /etc/resolv.conf 
# Generated by NetworkManager
#nameserver 8.8.8.8
nameserver 192.168.56.101		
nameserver 192.168.56.1
```


NMCLI ๋ช๋ น์ด๋ก ์์ ํ๋ ๋ฐฉ๋ฒ์ ๊ถ์ฅ.

```cs	
[๋ณ๊ฒฝ์ ]
	
[root@centos named]$  nmcli connection show enp0s8 | grep DNS
IP4.DNS[1]:                             8.8.8.8
[๋ณ๊ฒฝ ํ]
[root@centos named]$  nmcli connection modify enp0s8 ipv4.dns 192.168.56.101
[root@centos named]$  nmcli connection show enp0s8 | grep DNS
ipv4.dns:                               192.168.56.101
```	


<br/>

**8. DNS ๋ฐฉํ๋ฒฝ ์ค์ **

```cs
[root@centos named]$  firewall-cmd --add-service=dns --permanent 
success
[root@centos named]$  
[root@centos named]$  firewall-cmd --reload
success
[root@centos named]$  
[root@centos named]$  firewall-cmd --list-all | grep services
services: dhcpv6-client dns http ssh
```

<br/>

**9. NAMED ์ฌ์์ ๋ฐ ๋์ ํ์ธ**


```cs
[root@centos named]$  systemctl restart named
[root@centos named]$  
[root@centos named]$  nslookup www.won.co.kr
Server:		192.168.56.101
Address:	192.168.56.101#53
Name:	www.won.co.kr
Address: 192.168.56.101
[root@centos named]$  
[root@centos named]$  nslookup 192.168.56.101
101.56.168.192.in-addr.arpa	name = www.won.co.kr.
101.56.168.192.in-addr.arpa	name = ns.won.co.kr.
```


<br/>

**์ถ๊ฐ์ ์ผ๋ก VM์ผ๋ก ์ฐ๊ฒฐ๋ ๋ค๋ฅธ Client๋ก ํ์ธ**

```cs
[root@lee123 share]# nslookup 192.168.56.101
101.56.168.192.in-addr.arpa	name = ns.won.co.kr.
101.56.168.192.in-addr.arpa	name = www.won.co.kr.
[root@lee123 share]# 
[root@lee123 share]# nslookup www.won.co.kr
Server:		192.168.56.101
Address:	192.168.56.101#53
Name:	www.won.co.kr
Address: 192.168.56.101
```

<br/>

----

## ๐ MASTER/SLAVE ์ค์ 

DNS Master & Salve ๊ฐ๋
    
๋จ์ํ Master์ Slave๋ ์ฃผ-๋ณด์กฐ ๊ด๊ณ์ด๋ฉฐ DNS ์๋ฒ๋ฅผ ์ด์คํ ์ํจ๋ค๊ณ ๋ง ์๊ณ  ๊ณ์๋ ๋ฉ๋๋ค.  
(Slave๋ฅผ ์ฌ๋ฌ๋ ์ฌ์ฉํ ์๋ ์์ต๋๋ค)  

Master-Slave๋ ๋๊ธฐํ ๊ณผ์ ์ ํตํด zone ํ์ผ์ ๊ด๋ฆฌํ๊ฒ ๋๋๋ฐ  
zone ํ์ผ์ SOA ํ๋์ ์๋ serial์ ํ์ธํ์ฌ ์ด ํ์ผ์ด ์๋ฐ์ดํธ๊ฐ ๋์๋์ง ํ๋จ ํฉ๋๋ค.  
serial์ด ์ฆ๊ฐ ํ์ ๊ฒฝ์ฐ ํ์ผ์ด ์๋ฐ์ดํธ๋๊ฒ์ผ๋ก ํ๋จํ๊ณ  ๋๊ธฐํ ๊ณผ์ ์ ํตํด  
Slave ์๋ฒ๋ก zone ํ์ผ์ด ์ ์ก ๋ฉ๋๋ค.  

์ด๋ฌํ ๋๊ธฐํ ๊ณผ์ ์ zone transfer ๋ผ๊ณ  ํ๋๋ฐ ํฌํธ TCP 53๋ฒ์ด ๋ฐ๋ก ์ฌ๊ธฐ์ ์ฌ์ฉ ๋ฉ๋๋ค.  
(์ผ๋ฐ ๋ฐ๋ณต ์ฟผ๋ฆฌ ์ UDP 53๋ฒ ์ฌ์ฉ)  

๋ง์ฝ, Master ์๋ฒ์ ์ฅ์ ๊ฐ ๋ฐ์ํ  ๊ฒฝ์ฐ Slave ์๋ฒ์์ ์๋น์ค๋ฅผ ์ค๋จ ์์ด ์ง์์ ์ผ๋ก ์ ๊ณต ํฉ๋๋ค.

![](https://k.kakaocdn.net/dn/WGIQ2/btqBWqWTyu2/UhuJc8CgA8PZYPg2EKc0UK/img.png)



### Master ์๋ฒ ์ค์ 
    
<br/>

1. named.rfc1912.zones ํ์ผ ์ค์  ์ถ๊ฐ  

	```cs
	allow-update { [slave์๋ฒ IP]; }; ๊ตฌ๋ฌธ ์ถ๊ฐ

	zone "won.co.kr" IN {
		type master;
		file "won.co.kr.zone";
		allow-update { 192.168.56.102; };
    allow-transfer { 192.168.56.102; };
	};
	```

	
	<br/>


2. zone ํ์ผ ์์ 

	```cs
	[root@centos named]$  cat /var/named/won.co.kr.zone 	
	$TTL 1D
	@	IN SOA	ns.won.co.kr root.won.co.kr. (
				0	; serial
				1D	; refresh
				1H	; retry
				1W	; expire
				3H )	; minimum
					
	@	IN	NS	ns.won.co.kr.
		IN	NS	ns2.won.co.kr.			//slave ์๋ฒ ์ค์ 
	IN	A	192.168.56.101

	ns	IN	A	192.168.56.101
	ns2	IN	A	192.168.56.102			//slave ์๋ฒ ์ค์ 
	www	IN	A	192.168.56.101
	```

	ํด๋ผ์ด์ธํธ์์ ์ ๊ทผํ  ์ ์๋๋ก ์ค์ ์ ์งํ ํฉ๋๋ค.

	<br/>

### SLAVE ์๋ฒ ์ค์ 

	
1. /etc/named.rfc1912.zones ํ์ผ ์ค์ 

	```cs
	zone "won.co.kr" IN {
	type slave;
	file "slave/won.co.kr.zone";
	masters { 192.168.56.101; };
	};
	```

```toc
```