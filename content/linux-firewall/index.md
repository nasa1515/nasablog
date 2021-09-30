---
emoji: 🤦‍♂️
title: "[LINUX] - Firewall"
date: "2021-06-23 00:00:54"
author: nasa1515
tags: LINUX
categories: LINUX
---


## ✔ FIREWALL (침입차단시스템) 란?

리눅스 방화벽은 외부의 네트워크에서 내부의 시스템으로 접근하는 네트워크 패킷을 차단합니다.  
리눅스 방화벽의 경우 Netfilter에 의해 적용되며 시스템 내부로 전달, 폐기를 결정하는 모듈입니다.


- RHEL7부터는 방화벽을 관리하는 데몬이 firewalld로 변경되어 방화벽 설정은  
	iptables 명령어 대신 아래 명령어를 사용해야 합니다.

	- firewall-cmd (콘솔  
	- firewall-config (X-Windows)  

<br/>

- 기존에 사용했던 ``iptables``이 완전이 사라진 것은 아닙니다. firewalld이 iptables를 기반으로 동작하고 있을 뿐 입니다.  
	(firewalld은 iptables를 의존 패키지로 두고 있음)

<br/>

- 방화벽에는 ``zone``(영역)이라는 것이 존재하는데 개방된 네트워크와 연결되어 있다면 public zone(공개 영역)의 룰이 적용되고,   
	개인 네트워크에 있다면 다른 zone의 룰을 적용할 수 있습니다. 네트워크 형태에 따라 적용하는 방화벽 룰을 다르게 할 수 있습니다.  
	(서버 용도로 리눅스를 사용한다면 개방된 네트워크 public zone만 필요)  
    

<br/>

- 	iptables의 룰 변경시 서비스 중지 및 설정 변경을 하여야 했지만 firewall의 경우 KVM, openstack과 같은 가상화, 클라우드 환경하에서의 필터링 정책을 동적으로 추가 가능합니다.  
	(동적이기때문에 언제든지 설정을 변경할 수 있고 바로 실행되며 방화벽을 다시 로딩할 필요가 없으므로 기존 네트워크 연결에서 의도하지 않은 중단이 발생하지 않습니다.)  


<br/>

- iptables의 경우 응용프로그램 자체에서 필터링 정책을 구성하는 경우 iptables 정책과 충돌되는 등의 문제가 발생하였으나  
	firewalld는 DBUS API를 통한 정보 공유를 통해 정책 충돌 문제를 해결합니다.  

<br/>

---



## ✨ firewall 구동방식  

- 설정파일은 /etc/firewalld/zones/public.xml 파일로 xml 형식으로 존재합니다.  
	해당 파일에는 ``firewall-cmd --permanent --zone=public`` 명령으로 추가했던 룰들이 저장되어 있으며  
    zone의 설정 파일을 변경할 경우 방화벽을 reload 해야 반영이 됩니다.  

<br/>

- firewall-cmd 에서 ``--permanent`` 옵션이 들어간다면 바로 반영이 되지않고 zone의 설정파일에서 룰에 대한 추가/수정만 이루어집니다.  
	따라서 --permanet 옵션을 넣었다면 방화벽을 reload 해야합니다 (설정파일에 추가된 룰은 영구반영)  
	만약 --permanet 옵션을 넣지않으면 일시적으로 즉시 반영되지만 재부팅을 할 경우 zone의 설정파일에 추가되지 않은 룰이므로 전부 삭제가 됩니다.  


* 특징  

	1.  XML 파일 형태로 정책 보관 가능  
	2. Runtime(실행중) 및 Permanent(영구) 설정 가능

<br/>

-----

 
## 😂 관련 보안 시스템   


### 침입차단시스템(FW) 
   
- packet filter : 패킷의 목적지 소스 등의 룰이 맞으면 통과. (3계층까지만 확인)

- application g/w :  모든 계층의 대한 패킷을 확인  (최상위 계층까지) (느리다 - proxy) - 가장 강력한 보안 

- stateful inspection : 방화벽을 통해 전달된 패킷의 응답패킷은 룰을 보지않고 허용한다. (룰이 많아지기 떄문)

<br/>

### 침입탐지시스템(IDS)  
이미 침입을 하고 동작을 했을 때 반응을 하는 문제점이 있음. (out of path)
	
- 시그니쳐 방식 (패턴을 저장하고 패턴을 확인)
- anomaly 방식
	
<br/>

### 침입방지시스템(IPS) - 동작 전에 탐지 즉시 반응 , (inline) 

- bastion host : 공인/사설 망에 연결된 호스트 (즉 외부에서 봤을때 가려져있는 호스트들)  
- dual homed g/w : 외부/내부 2개로 나눠져 있는 방화벽의 경우 들어오는, 나가는 모두의 룰을 정해주는 방식  
- screend subnet : NIC 3개 이상,  외부, 내부, DMA(server farm) 으로 나눈다. 즉 사내/공개로 영역을 나눠 관리.


![스크린샷, 2020-07-23 09-59-24](https://user-images.githubusercontent.com/64260883/88243392-3c47fe80-cccb-11ea-87d3-34c9157876cf.png)

<br/>

---

## 👏 FireWall 시스템 확인   



### /usr/lib/firewalld : 기본 구성 관련 파일

```cs
[root@centos /]$  ls -alrt /usr/lib/firewalld/
합계 20
drwxr-xr-x.  7 root root   81  4월  7 23:37 .
drwxr-xr-x.  2 root root  224  6월 29 09:39 helpers
drwxr-xr-x.  2 root root 4096  6월 29 09:39 icmptypes
drwxr-xr-x.  2 root root   20  6월 29 09:39 ipsets
drwxr-xr-x.  2 root root 8192  6월 29 09:39 services
drwxr-xr-x.  2 root root  163  6월 29 09:39 zones
dr-xr-xr-x. 42 root root 4096  6월 29 10:23 ..
```

### /etc/firewalld : 설정 파일, 규칙 파일

```cs
[root@centos /]$  ls -alrt /etc/firewalld/
합계 20
drwxr-x---.   2 root root   46  4월  7 23:37 zones
drwxr-x---.   2 root root    6  4월  7 23:37 services
-rw-r--r--.   1 root root  272  4월  7 23:37 lockdown-whitelist.xml
drwxr-x---.   2 root root    6  4월  7 23:37 ipsets
drwxr-x---.   2 root root    6  4월  7 23:37 icmptypes
drwxr-x---.   2 root root    6  4월  7 23:37 helpers
-rw-r--r--.   1 root root 2706  4월  7 23:37 firewalld.conf
drwxr-x---.   7 root root  133  6월 29 09:39 .
drwxr-xr-x. 147 root root 8192  7월  7 18:44 ..
```

----
 
## 👍 FireWall 사용 방법

포스트에서는 자주 사용하는 명령 위주만 정리했다.  



### 포트

- 포트추가

```cs
# firewall-cmd --permanent --zone=public --add-port=포트
ex) firewall-cmd --permanent --zone=public --add-port=80/tcp
# firewall-cmd --reload   -- 정책 변경 후 reload 필수!!
```

<br/>

- 포트 제거

```cs
# firewall-cmd --permanent --zone=public --remove-port=포트
ex) firewall-cmd --permanent --zone=public --remove-port=80/tcp
# firewall-cmd --reload
```


<br/>

### 서비스  

서비스에서 사용하는 룰을 적용하려면 아래와 같이 서비스를 추가하면 된다.   
단, 해당 서비스 xml 룰 파일이 ``/usr/lib/firewalld/services`` 에 있어야 한다.  
그리고 ``/usr/lib/firewalld/services`` 디렉토리에 있는 서비스 파일들을 수정하려면  /etc/firewalld/services에 복사 후 수정해야 한다.  
(/etc/firewalld/services에 있는 서비스 파일들이 우선 적용되기에 관리상 편리)    

* 서비스 추가

```cs
firewall-cmd --permanent --zone=public --add-service=서비스
ex) firewall-cmd --permanent --zone=public --add-service=http
# firewall-cmd --reload
```

* 서비스 제거

```cs
firewall-cmd --permanent --zone=public --remove-service=서비스
ex) firewall-cmd --permanent --zone=public --remove-service=http
# firewall-cmd --reload
```

<br/>

### 임의의 룰 (Rich rule)  

포트, 서비스 룰 이외에 원하는 룰을 임의로 적용할 수 있다. 예를 들면 ip차단이다.


* 룰 추가

```cs
# firewall-cmd --permanent --zone=public --add-rich-rule="임의의 룰"
ex) firewall-cmd --permanent --zone=public --add-rich-rule="rulefamily=ipv4 source address=192.168.0.4/24 service name=http accept"
# firewall-cmd --reload
```

* 룰 제거

```cs
# firewall-cmd --permanent --zone=public --remove-rich-rule="임의의 룰"
ex) firewall-cmd --permanent --zone=public --remove-rich-rule="rulefamily=ipv4 source address=192.168.0.4/24 service name=http accept"
# firewall-cmd --reload
```

<br/>

#### 응용 예시 - http(80번 포트) 서비스에서 특정 ip 차단  
웹서버를 운영하다보면 특정ip(스팸같은)를 차단시키고 싶을 때가 있다.  
그럴경우 아래와 같이 임의의 룰을 활용하면 된다.  

```cs
차단시)
# firewall-cmd --permanent --zone=public --add-rich-rule="rule family=ipv4 source address=차단ip service name=http reject"
차단해제시)
# firewall-cmd --permanent --zone=public --remove-rich-rule="rule family=ipv4 source address=차단ip service name=http reject"
# firewall-cmd --reload
위 명령을 실행하면 즉시 영구적으로 해당 ip를 웹사이트에 접속하지못하게 차단시킬 수 있다.
이 방법은 웹서버 자체에서 ip를 차단시키는 것보다 효과적이다.
```

<br/>

#### 방화벽 기타 명령어

```cs
- zone -
* 사전 정의된 존 목록 출력
# firewall-cmd --get-zone
* 전체 존 목록을 상세하게 출력
# firewall-cmd --list-all-zone
* 기존 존 출력
# firewall-cmd --get-default-zon
* 활성화된 존 출력
# firewall-cmd --get-active-zon
* public zone에 있는 서비스 목록
# firewall-cmd --zone=public --list-service
-------------------------------------------
- service 
* 현재 존재하는 서비스 목록
# firewall-cmd --get-servic
* permanent 로 등록된 서비스 목록
# firewall-cmd --permanent --list-al
-------------------------------------------
- port 
* 허용한 포트 목록
# firewall-cmd --list-ports
-------------------------------------------
- other 
* 방화벽 상태 확인
# firewall-cmd --stat
```

```toc
```