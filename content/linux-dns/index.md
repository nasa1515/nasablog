---
emoji: 🤦‍♂️
title: DNS [LINUX]
date: "2021-06-23 00:00:58"
author: nasa1515
tags: LINUX
categories: LINUX
---


머리말 

DNS에 대해서 이론적인 내용도 대충 알고 있었습니다만 이번 포스트를 작성하면서 이론적인 내용과 함께  
실제로 구축 실습을 해보면서 정확한 개념을 얻을 수 있었습니다. 

---


## ✔ DNS (Domain Name Server) 란?

 DNS는 도메인 네임 서버를 일컫습니다.  
 인터넷은 서버들을 유일하게 구분할 수 있는 IP주소를 기본체계로 이용하는데  
 숫자로 이루어진 조합이라 인간이 기억하기에는 무리가 따릅니다.  
 따라서 DNS를 이용해 IP주소를 인간이 기억하기 편한 언어 체계로 변환하는 작업이 필요한데  
 이 역할을 DNS가 하는 것입니다.  
  

<br/>

### 특징
  
-   PORT : 53
-   PROTOCOL : TCP/UDP
-   디렉토리 서비스 [트리 형 구조를 가지고 있다.] - BIND 서비스 기준으로 만들어졌음.
-   데이터베이스에서 "레코드" 형식의 단위를 사용

![5-3. DNS 설치 및 구성](https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfs15.tistory.com%2Fimage%2F27%2Ftistory%2F2008%2F11%2F16%2F21%2F49%2F492016d564daa)

<br/>

### 서버의 구성

1.  master server
2.  slave server (Zone data DB를 가지고 있다.)
3.  cache (only) server (Zone data DB를 가지고 있지 않다.)

<br/>

---

## ✌ 도메인이름의 체계와 DNS 질의 과정 

인터넷 도메인은 아래 그림같이 하나의 역트리 구조를 하고 있습니다. [디렉토리 구조]

![](https://t1.daumcdn.net/cfile/tistory/2316A93F51C462940C)

인터넷 도메인의 체계에서 최상위는 ``루트(root)``로 인터넷도메인의 시작점이 됩니다.  
루트도메인 바로 아래단계는 ``1단계`` 도메인이라고 하며 이를 ``최상위 도메인``이라고 하고.  
최상위 도메인은 국가명을 나타내는 국가 최상위 도메인이 일반 최상위 도메인으로 구분됩니다.

<br/>

---

## ✨ 도메인 질의 과정    

도메인 질의는 /etc/resolv.conf 에 지정된 네임서버로 접속하여 아래 그림과 같은 질의 과정을 거치게 됩니다.

![](https://t1.daumcdn.net/cfile/tistory/026CF23451C465CE34)

1. Client에서 지정된 NS로 www.yahoo.com에 대한 요청을 전달한다.  

<br/>

2. 일반 NS서버는 루트NS서버의 IP주소를 기록한 'hint 파일'을 가지고 있다.  
	이것을 참조하여 루트에 www.yahoo.com에 대한 요청을 전달합니다.   
	루트는 최상위네임서버들의 네임서버명(NS레코드)과 IP주소(A레코드)를 가지고 있다.  
	이를 ``글루레코드/glue record``라고 합니다.  
	이 글루레코드를 참조하여 .com 네임서버를 참조하라고 응답합니다  
	(루트 네임서버는 전세계에 13개뿐입니다).

<br/>

3. .com 네임서버에는 .com을 최상위도메인으로 사용하는 도메인들의 글루레코드를 가지고 있기에  
	이를 참조하여 www.yahoo.com의 네임서버를 참조하라고 응답한다.

<br/>

4. yahoo.com의 네임서버는 yahoo.com 도메인에 대한 존(zone)파일을 참조하여  
	www.yahoo.com의 IP주소(A레코드)를 클라이언트가 최초 요청을 한 네임서버로 되돌려 준다.

<br/>

5. 최초 요청을 받은 네임서버는 클라이언트에게 www.yahoo.com의 IP주소를 전송한다.

	DNS서버는 한 번 검색한 결과는 메모리의 캐시에 기록하며  
	같은 정보가 요청되면 캐시에 있는 정보를 전송한다.  
	캐시에는 유효기간(TTL:Time To Live)이 정해져 있으므로 유효기간이 지난 정보는 캐시에서 삭제된다.

<br/>

 ----


## 👍 DNS 질의 쿼리 

### 1. 재귀적 변환/ 재귀 쿼리 RECURSIVE

- 일반적인 네임서버
- 클라이언트에 최종 결과값을 반환
- 클라이언트(Sub Resolver)로부터 도메인 네임 질의 요청이 들어올 경우  
	네임서버가 직접 Name space를 탐색하여 결과 값을 반환하는 방식.



![스크린샷, 2020-08-13 19-32-45](https://user-images.githubusercontent.com/69498804/90124690-c69bf380-dd9b-11ea-90d7-db937e9b7d00.png)

  
  
위의 그림같이 재귀쿼리는 컴퓨터가 리졸버에게 kr.yahoo.com을 물어보면 resolver는 DNS서버에 물어본다.  
DNS서버가 재귀적변환이면 (Root의 네임서버는 무조건 순환쿼리)  
resolver는 더 이상 찾지않고 재귀적방식인 DNS서버 (이 그림에선 Root네임서버)가 찾아서  
resolver에게 전달해준다, 그럼 resolver는 다시 컴퓨터에게 이 값을 알려준다.

<br/>

---

### 2. 반복적 변환/ 순환 쿼리 TERATIVE

- Root 서버는 무조건 순환쿼리, TLD네임서버는 일부만 순환쿼리이다.
- 반복적 변환 - 자신이 직접 관리하지 않는 질의 요청의 경우 질의에 응답 가능한 NS목록을 응답.  
(질의에 응답가능한 NS란? 만약 컴퓨터가 질의한 것이 kr.yahoo.com.이고 자신은 com.도메인이고  
자신의 하위도메인에 yahoo.com.이 있을 때, 컴퓨터에게 yahoo.com.을 알려준다.)


![스크린샷, 2020-08-13 19-33-32](https://user-images.githubusercontent.com/69498804/90124758-e206fe80-dd9b-11ea-9be4-c7d1039c0315.png)


  

이렇게 반복적 변환은 컴퓨터가 리졸버에게 kr.yahoo.com을 물어본다면  
리졸버는 DNS에게 kr.yahoo.com.을 IP로 바꿔달라고 요청한다(kr.yahoo.com.에 대해 질의한다)  
이때 리졸버가 물어본 DNS서버가 반복적 변환방식인 이터레이티브라면  
재귀적 변환처럼 찾아주지않고 질의에 응답이 가능한 NS목록을 응답한다.  
이 그림에선 리졸버가 처음에 .(root) DNS에 물어봤기 때문에  
DNS는 자신하위에있는 TLDs중 yahoo.com.을 관리하고있는 com.DNS를 알려주게 된다.  
이렇게 반복하다 보면 kr.yahoo.com.까지 도달한다.
	
<br/>


 ---

    
## 🎶 DNS 구축 방법



### 설정 CONFIG   
	
* 1. /etc/named.conf 

	```cs
	NS 데이터베이스 및 zone 파일의 위치, 접근제어등의  
	보안설정을 할 수 있는 메인 설정파일.
	```

* 2. /var/named  

	```cs
	네임서버의 zone 파일 디렉토리의 경로  
	chroot 설정시 /var/named/ 디렉토리에 설정된 내용을  
	/var/named/chroot/var/named로 심볼릭 링크를 걸어준다.
	```
  
* 3. /etc/named.rfc1912.zones 

	```cs
	네임서버에 쿼리 요청 시 사용할 도메인 정보(정방향 영역과 역방향영역)을 설정해야 될 부분입니다.
	```

* 4. /var/named/[도메인].zone 

	```cs
	네임서버 설정 시 가장 중요한 도메인 정보 파일이며  
	네임서버를 가동시에 zone 파일을 읽어 네임서버 서비스가 가동되며  
	zone 파일은 도메인을 IP 주소로 변환해 주는 역할을 합니다.  
    ```

* 5.  resolv.conf 설정

	```cs
	서버가 바라보고 있는 Domain Server의 주소 설정 파일입니다.
	```

<br/>
<br/>

**1. BIND 설치**

```cs
[root@centos ~]$  yum -y install bind
```

<br/>


**2. /etc/named.conf 설정**

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


#### 변경 사항

```cs
변경 전 - listen-on port 53 { 127.0.0.1; };
변경 후 - listen-on port 53 { any; };
기본설정은 127.0.0.1에 리스닝닝하기 때문에, 외부에서 접속이 불가능합니다 서버에 설정된 모든 IP에 대해 리스닝하도록 any로 변경합니다

변경 전 - allow-query { localhost;};
변경 후 - allow-query { any;};
네임서버에 설정된 도메인만 응답하도록 설정하는부분입니다.

변경없음 - recursion no;

yes로 설정하면 네임서버에 설정되지 않은 도메인에 대한 질의가 있을시 캐싱 네임서버의 역할을 하여 DNS 질의과정을 거치게 되며, 주 네임서버는 캐싱 네임서버 역할이 필요하지 않으므로no로 설정합니다.
```

<br/>

**3. named.rfc1912.zones 설정**

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

named.rfc1912.zones의 맨하단부분의 추가할 도메인정보/파일(test.com, test.com.zone)을 입력.  
won.co.kr 도메인을 사용하려면 won.co.k.rzone([도메인].zone)파일을 만들어야 됩니다


<br/>

**4. ZONE 파일 설정하기**  

```cs
[root@server named]# cp named.localhost won.co.kr.zone
```

/var/named의 디렉토리로 이동하면 named.localhost 파일이 있습니다   
named.localhost의 파일을 사용할 도메인의 zone파일의 파일명으로 복사합니다.  

<br/>

**설정 내용 확인**

<br/>

정방향 파일
	
```cs
[root@centos named]$  cat won.co.kr.zone 
$TTL 1D
@	IN SOA	ns.won.co.kr root.won.co.kr. (
				0	; serial 	//시리얼값
				1D	; refresh 	//보조 네임서버가 주 네임서버에 접속하는 시간
				1H	; retry 	//접속 실패시 다시 시도할 시도 간격
				1W	; expire 	//주네임서버에서 데이터가 없다면 1주 이후에 지워짐
				3H )	; minimum 	//TTL 설정과 같은 의미
@	IN	NS	ns.won.co.kr.		 	//도메인을 소우한 주 DNS의 도메인
IN	A	192.168.56.101 				//도메인이 찾아갈 IP주소
ns	IN	A	192.168.56.101 			//주 네임서버 아이피
www	IN	A	192.168.56.101    		//www.도메인이 찾아갈 IP주소
```

<br/>

역방향 파일
	
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

  

**5. ZONE 파일 파일의 소유권 변경**



변경 전

```cs
[root@centos named]$  ls -alrt *
-rw-r-----. 1 root  root   227  7월  8 19:28 won.co.kr.zone
-rw-r-----. 1 root  root   209  7월  8 19:36 db.192.168.56
```

변경 후

```cs
[root@centos named]$  chown named:root won.co.kr.zone db.192.168.56
[root@centos named]$  ls -alrt *
-rw-r-----. 1 named root   227  7월  8 19:28 won.co.kr.zone
-rw-r-----. 1 named root   209  7월  8 19:36 db.192.168.56
파일을 작성 후 파일의 소유권을 변경해 줍니다.
```


<br/>
  

**6. 설정파일 검증**


named.conf 파일 검증

```cs
[root@centos named]$  named-checkconf /etc/named.conf 
[root@centos named]$  
```

named.conf 파일을 검증하는 과정이며, 정상적으로 설정을 잘하였다면 아무런 메시지가 나오지 않습니다

  

<br/>

**zone 파일 검증**

  

1) 정상적인 설정 메시지

	```cs
	[root@centos named]# named-checkzone won.co.kr.zone  db.192.168.56
	zone test.com/IN: loaded serial 0
	OK
	```

	위와 같이 OK 메시지를 보여주면 설정에 문제가 없는 것입니다.
  

	<br/>
 
2) 잘못된 설정 메시지

	```cs
	[root@server named]# named-checkzone won.co.kr.zone
	zone won.co.kr.zone/IN: NS 'ns.won.co.kr.zone won.co.kr' has no address records (A or AAAA)
	zone won.co.kr.zone/IN: not loaded due to errors.
	```


<br/>

**7. resolv.conf 설정 변경**  

파일에 지정할 도메인 서버의 주소, GW설정

```cs
[root@centos named]$  cat /etc/resolv.conf 
# Generated by NetworkManager
#nameserver 8.8.8.8
nameserver 192.168.56.101		
nameserver 192.168.56.1
```


NMCLI 명령어로 수정하는 방법을 권장.

```cs	
[변경전]
	
[root@centos named]$  nmcli connection show enp0s8 | grep DNS
IP4.DNS[1]:                             8.8.8.8
[변경 후]
[root@centos named]$  nmcli connection modify enp0s8 ipv4.dns 192.168.56.101
[root@centos named]$  nmcli connection show enp0s8 | grep DNS
ipv4.dns:                               192.168.56.101
```	


<br/>

**8. DNS 방화벽 설정**

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

**9. NAMED 재시작 및 동작 확인**


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

**추가적으로 VM으로 연결된 다른 Client로 확인**

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

## 💋 MASTER/SLAVE 설정

DNS Master & Salve 개념
    
단순히 Master와 Slave는 주-보조 관계이며 DNS 서버를 이중화 시킨다고만 알고 계셔도 됩니다.  
(Slave를 여러대 사용할수도 있습니다)  

Master-Slave는 동기화 과정을 통해 zone 파일을 관리하게 되는데  
zone 파일의 SOA 필드에 있는 serial을 확인하여 이 파일이 업데이트가 되었는지 판단 합니다.  
serial이 증가 했을 경우 파일이 업데이트된것으로 판단하고 동기화 과정을 통해  
Slave 서버로 zone 파일이 전송 됩니다.  

이러한 동기화 과정을 zone transfer 라고 하는데 포트 TCP 53번이 바로 여기서 사용 됩니다.  
(일반 반복 쿼리 시 UDP 53번 사용)  

만약, Master 서버에 장애가 발생할 경우 Slave 서버에서 서비스를 중단 없이 지속적으로 제공 합니다.

![](https://k.kakaocdn.net/dn/WGIQ2/btqBWqWTyu2/UhuJc8CgA8PZYPg2EKc0UK/img.png)



### Master 서버 설정
    
<br/>

1. named.rfc1912.zones 파일 설정 추가  

	```cs
	allow-update { [slave서버 IP]; }; 구문 추가

	zone "won.co.kr" IN {
		type master;
		file "won.co.kr.zone";
		allow-update { 192.168.56.102; };
    allow-transfer { 192.168.56.102; };
	};
	```

	
	<br/>


2. zone 파일 수정

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
		IN	NS	ns2.won.co.kr.			//slave 서버 설정
	IN	A	192.168.56.101

	ns	IN	A	192.168.56.101
	ns2	IN	A	192.168.56.102			//slave 서버 설정
	www	IN	A	192.168.56.101
	```

	클라이언트에서 접근할 수 있도록 설정을 진행 합니다.

	<br/>

### SLAVE 서버 설정

	
1. /etc/named.rfc1912.zones 파일 설정

	```cs
	zone "won.co.kr" IN {
	type slave;
	file "slave/won.co.kr.zone";
	masters { 192.168.56.101; };
	};
	```

```toc
```