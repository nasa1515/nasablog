---
emoji: 🤦‍♂️
title: SYSTEMD [LINUX]
date: "2021-06-23 00:00:53"
author: nasa1515
tags: LINUX
categories: LINUX
---



머리말  

기존 CentOS Version 5.x , 6.x 만 경험 해본 저로써는 CentOS 7버전 부터는 
다시 리눅스를 배우고 있다고 생각하게 됩니다.  
이번 포스트에서는 기존 버전에서 사용하던 init 에서 바뀐 systemd에 대해 포스트 합니다.  

---

 
## ✔ SYSTEMD 란?

기존 INIT이 사라지고 새롭게 사용하는 프로세스 관리 Demon  
역할 : [시스템, 로그, 서비스, 초기화 스크립트 관리 기능 수행]


👌 간단 요약  
SYSTEMD를 요약하면 부팅 중 시작하는 서비스(혹 데몬)들을 관리하는 것이라고 볼 수 있습니다.    
     
      
* 부팅 시점에 정의한 서비스들을 병렬적으로 실행 할 수 있습니다. (init의 경우 직렬 스크립트 실행)
* 특정 서비스 동작 후에 원하는 서비스가 동작하도록 정의 할 수 있습니다.
* init은 서비스 실행,중지를 ``service service.name start | stop | restart`` 으로 제어 합니다.    
      
* systemd는 ``systemctl start | stop | restart unit.name`` 으로 제어합니다.    
    init은 데몬들에 ``service`` 라는 네이밍을 붙여 사용했고 systemd은 ``unit`` 이라는 이름을 붙여 사용합니다.    
      
* systemd는 ``unit.name.service`` 파일을 ``systemctl enable unit.name.service or unit.name`` 명령으로 설치합니다.  
    ``systemctl enable unit.name`` 명령어를 실행하면 관련 서비스를 ``/etc/systemd/system/.target`` 경로에 링크 파일을 생성하게 됩니다.  
    추가로 ``systemctl disable.unit.name`` 명령어를 실행하면 링크 파일을 삭제한다.  


*  systemd는 최소한의 서비스를 실행시키고 병렬화해서 실행시키는데 목표를 두고 있기에 이전보다 부팅 속도가 빠른 편 입니다.  		
  
 ---

## ✌ 기능 및 특징  
  
  개인적으로 중요하다고 생각 하는 기능만 요약했습니다.  
  
- init 프로세스에 대한 호환성 제공 [legacy방식의 Run level 사용 X]

- 부팅 시 서비스 병렬 실행 [기존 init 의 직렬 방식 대비 효율성 UP]

- Service 대신 유닛 사용 [etc/systemd/system/ 아래 유닛의 링크 존재] .Target의 경우 기존의 Run level들의 대체 파일

	``ex) multi-user.target``

-	Time Out [약 5분정도의 유예기간 존재]



<br/>



### 주요 유닛파일 위치

<br/>

1. /etc/systemd/system  
2. /run/systemd/system  
3. */usr/lib/sys-temd/system
    
```cs
$ ls /etc/systemd
bootchart.conf journald.conf  logind.conf  system  system.conf  user  user.conf
```


<br/>

### 유닛의 개념
5.X, 6.X Version의 ``Service 와 동일``합니다.  
  
  
  - 유닛목록

	```cs
	service
	socket
	busname
	target
	snapshot
	device
	mount
	automount
	swap
	timer
	path
	slice
	scope
	```	

<br/>


### 서브커맨더
[systemctl subcommand [option]

```cs
1) systemctl list-units [-t, -a 옵션 사용]
2) systemctl list-units-files [활성화 확인]
3) systemctl list-sockets [소켓확인]
4) systemctl is-active [demon name] [특정 유닛 실행 확인]
5) systemctl is-enabled [demon name] [특정 유닛 활성화 확인]
6) systemctl list-dependencies [demon name] [의존성 확인]
	
ex) systemctl status sshd
	systemctl restart sshd...
```

<br/>

### sshd.service UNIT File 내용

cat /usr/lib/systemd/system/sshd.service [서비스 유닛 파일 내용]  
 ``Unit``, ``Service``, ``Install`` 3개의 필드로 나눠져있습니다.	
	
```cs
[Unit]
Description=OpenSSH server daemon
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target sshd-keygen.service
Wants=sshd-keygen.service
[Service]
Type=notify
EnvironmentFile=/etc/sysconfig/sshd
ExecStart=/usr/sbin/sshd -D $OPTIONS
ExecReload=/bin/kill -HUP $MAINPID	
KillMode=process
Restart=on-failure
RestartSec=42s
[Install]
WantedBy=multi-user.target
```

-----

## 😁 부트 프로세스

기존의 regacy 방식에서 부팅 시 사용되던 ``init``이 ``Systemd``로 변경습니다.  
다만 BIOS/UEFI -> BOOT LOADER -> Kernel 메모리 적재까지는 동일합니다.  
    
<br/>

### 최상위 PID - 1 [init] -> SYSTEMD  

![](https://image.slidesharecdn.com/rhel7newfeaturesystemdbooting-160327092549/95/enterprise-linux-7-new-featuresystemdbooting-28-1024.jpg?cb=1459070873)


<br/>

### 리눅스 부팅 과정 설명

![](https://image.slidesharecdn.com/rhel7newfeaturesystemdbooting-160327092549/95/enterprise-linux-7-new-featuresystemdbooting-29-1024.jpg?cb=1459070873)

![](https://image.slidesharecdn.com/rhel7newfeaturesystemdbooting-160327092549/95/enterprise-linux-7-new-featuresystemdbooting-30-1024.jpg?cb=1459070873)


<br/>

## 👏 Run Level 변경 

기존 init 커맨드와 달리 숫자 기반이 아닌 런 레벨에 대한 설정 세트를 통해서 런 레벨을 변경합니다.


### 싱글모드(기존 런레벨1)

```cs
$ systemctl rescue
```

### 멀티유저모드(기존 런레벨3)  
 
```cs		
$ systemctl isolate multi-user.target
$ systemctl isolate runlevel3.target
```

* 과거 init 시스템에 익숙한 사용자를 위해서 runlevel3 라는 이름으로  
    multi-user.target 파일을 링크를 걸어두어 두가지 명령이 모두 사용가능 합니다.

	```cs
	$ ls -l /lib/systemd/system/runlevel3.target
	lrwxrwxrwx. 1 root root 17 Oct 21 00:28 /lib/systemd/system/runlevel3.target -> multi-user.target
	```	


### 그래픽모드(기존 런레벨5)

```cs
$ systemctl isolate graphical.target
$ systemctl isolate runlevel5.target
```

* 멀티유저모드와 마찬가지로 2가지 명령으로 전환이 가능 합니다   
	실제 기존 형태의 런레벨+숫자 형태의 Target파일은 아래 링크로 연결되어 있습니다.

	```cs
	lrwxrwxrwx. 1 root root 15 Oct 21 00:28 runlevel0.target -> poweroff.target
	lrwxrwxrwx. 1 root root 13 Oct 21 00:28 runlevel1.target -> rescue.target
	lrwxrwxrwx. 1 root root 17 Oct 21 00:28 runlevel2.target -> multi-user.target
	lrwxrwxrwx. 1 root root 17 Oct 21 00:28 runlevel3.target -> multi-user.target
	lrwxrwxrwx. 1 root root 17 Oct 21 00:28 runlevel4.target -> multi-user.target
	lrwxrwxrwx. 1 root root 16 Oct 21 00:28 runlevel5.target -> graphical.target
	lrwxrwxrwx. 1 root root 13 Oct 21 00:28 runlevel6.target -> reboot.target
	```

	즉, 시스템 종료/재부팅을 위한 런레벨도 여전히 사용가능합니다.!!


<br/>

---


## 🙌 런레벨 기본 값 설정  

상기에서 전환하는 런레벨 Target을 아래와 같은 명령을 통해서 기본 값으로 설정 할 수 있습니다.   
또한, 현재 설정된 기본 값을 확인 할 수도 있습니다.  
	
```cs
$ systemctl set-default multi-user.target
$ systemctl get-default
multi-user.target
```

<br/>

## 🎉 시스템 명령  

앞서 각각의 런레벨 파일이 poweroff.target 등 으로 연결되어있는 것을 확인하였는데  
isolate 명령이 아닌 시스템 명령을 통해서 해당 Target을 바로 적용하는게 가능합니다. 


* 아래 몇가지 예시를 보겠습니다.

	```cs
	$ systemctl poweroff (Shutdown처리 후 Power-Off처리)
	$ systemctl emergency (Rescue와 유사하지만 root 파일시스템만 읽기전용으로 마운트한다)
	$ systemctl halt (Shutdown처리 후 Halt처리)
	$ systemctl reboot (Shutdown처리 후 리부팅처리)
	$ systemctl kexec (kexec를 통해서 리부팅한다)
	$ systemctl suspend (시스템 정지)
	$ systemctl hibernate (시스템 Hibernate)
	$ systemctl hybrid-sleep (시스템을 Hibernate하고 정지시킨다)

	--------------------------------------------------------------------------
		
	% System suspend 상태와 System hibernate 의 차이점.
		
	Suspend : 컴퓨터를 끄지 않습니다. 
	컴퓨터와 모든 주변 장치를 저전력 모드로 설정합니다. 
	어떤 이유로 든 배터리가 방전되거나 컴퓨터가 꺼지면 
	현재 세션 및 저장되지 않은 변경 내용이 손실됩니다
		
	Hibernate : 컴퓨터의 상태를 하드 디스크에 저장하고 완전히 전원을 끕니다. 
	다시 시작하면 저장된 상태가 RAM으로 복원됩니다.
	```

<br/>

## ✨ SYSTEMD vs SYSV Run level
	
- level 2,3의 차이 : NFS 파일 시스템 사용 가능 여부 

	![](https://image.slidesharecdn.com/rhel7newfeaturesystemdbooting-160327092549/95/enterprise-linux-7-new-featuresystemdbooting-13-1024.jpg?cb=1459070873)
	

	  
* ### Run level 접속 변경
	
	```cs
	1) Bios 커널 화면에서 (e) 커맨드로 편집모드 진입.  
	2) LINUX16으로 시작하는 커널의 설정 마지막에 runlevel 구문 추가
	% : systemd.unit=rescure.target
	3) recure 모드로 접속 확인
	```

* ### Root Password 복구 방법


	```cs
	1) Bios 커널 화면에서 (e) 커맨드로 편집모드 진입.
	2) LINUX16으로 시작하는 커널설정의 마지막 rc.break 구문 추가
	3) /sysroot 리마운트
		  - mount | grep -w "/sysroot" - [루트 마운트 확인]
		  - mount -o remount,rw /sysroot - [루트 마운트 권한 수정 - 현재는 권한이 없음]
		  - chroot /sysroot - [root 디렉토리 권한 변경]
		  - 패스워드 재 설정 [ROOT Shell 접속 후 passwd]
		  - touch /.autorerabel - [selinux 정책 상 다시 리라벨 설정을 해줘야 적용됨 안만들면 리로드]
		  - 재부팅 후 변경된 ROOT 패스워드 확인.
	```

<br/>


```toc
```