---
emoji: ๐คฆโโ๏ธ
title: "[LINUX] - SYSTEMD"
date: "2021-06-23 00:00:53"
author: nasa1515
tags: LINUX
categories: LINUX
---



๋จธ๋ฆฌ๋ง  

๊ธฐ์กด CentOS Version 5.x , 6.x ๋ง ๊ฒฝํ ํด๋ณธ ์ ๋ก์จ๋ CentOS 7๋ฒ์  ๋ถํฐ๋ 
๋ค์ ๋ฆฌ๋์ค๋ฅผ ๋ฐฐ์ฐ๊ณ  ์๋ค๊ณ  ์๊ฐํ๊ฒ ๋ฉ๋๋ค.  
์ด๋ฒ ํฌ์คํธ์์๋ ๊ธฐ์กด ๋ฒ์ ์์ ์ฌ์ฉํ๋ init ์์ ๋ฐ๋ systemd์ ๋ํด ํฌ์คํธ ํฉ๋๋ค.  

---

 
## โ SYSTEMD ๋?

๊ธฐ์กด INIT์ด ์ฌ๋ผ์ง๊ณ  ์๋กญ๊ฒ ์ฌ์ฉํ๋ ํ๋ก์ธ์ค ๊ด๋ฆฌ Demon  
์ญํ  : [์์คํ, ๋ก๊ทธ, ์๋น์ค, ์ด๊ธฐํ ์คํฌ๋ฆฝํธ ๊ด๋ฆฌ ๊ธฐ๋ฅ ์ํ]


๐ ๊ฐ๋จ ์์ฝ  
SYSTEMD๋ฅผ ์์ฝํ๋ฉด ๋ถํ ์ค ์์ํ๋ ์๋น์ค(ํน ๋ฐ๋ชฌ)๋ค์ ๊ด๋ฆฌํ๋ ๊ฒ์ด๋ผ๊ณ  ๋ณผ ์ ์์ต๋๋ค.    
     
      
* ๋ถํ ์์ ์ ์ ์ํ ์๋น์ค๋ค์ ๋ณ๋ ฌ์ ์ผ๋ก ์คํ ํ  ์ ์์ต๋๋ค. (init์ ๊ฒฝ์ฐ ์ง๋ ฌ ์คํฌ๋ฆฝํธ ์คํ)
* ํน์  ์๋น์ค ๋์ ํ์ ์ํ๋ ์๋น์ค๊ฐ ๋์ํ๋๋ก ์ ์ ํ  ์ ์์ต๋๋ค.
* init์ ์๋น์ค ์คํ,์ค์ง๋ฅผ ``service service.name start | stop | restart`` ์ผ๋ก ์ ์ด ํฉ๋๋ค.    
      
* systemd๋ ``systemctl start | stop | restart unit.name`` ์ผ๋ก ์ ์ดํฉ๋๋ค.    
    init์ ๋ฐ๋ชฌ๋ค์ ``service`` ๋ผ๋ ๋ค์ด๋ฐ์ ๋ถ์ฌ ์ฌ์ฉํ๊ณ  systemd์ ``unit`` ์ด๋ผ๋ ์ด๋ฆ์ ๋ถ์ฌ ์ฌ์ฉํฉ๋๋ค.    
      
* systemd๋ ``unit.name.service`` ํ์ผ์ ``systemctl enable unit.name.service or unit.name`` ๋ช๋ น์ผ๋ก ์ค์นํฉ๋๋ค.  
    ``systemctl enable unit.name`` ๋ช๋ น์ด๋ฅผ ์คํํ๋ฉด ๊ด๋ จ ์๋น์ค๋ฅผ ``/etc/systemd/system/.target`` ๊ฒฝ๋ก์ ๋งํฌ ํ์ผ์ ์์ฑํ๊ฒ ๋ฉ๋๋ค.  
    ์ถ๊ฐ๋ก ``systemctl disable.unit.name`` ๋ช๋ น์ด๋ฅผ ์คํํ๋ฉด ๋งํฌ ํ์ผ์ ์ญ์ ํ๋ค.  


*  systemd๋ ์ต์ํ์ ์๋น์ค๋ฅผ ์คํ์ํค๊ณ  ๋ณ๋ ฌํํด์ ์คํ์ํค๋๋ฐ ๋ชฉํ๋ฅผ ๋๊ณ  ์๊ธฐ์ ์ด์ ๋ณด๋ค ๋ถํ ์๋๊ฐ ๋น ๋ฅธ ํธ ์๋๋ค.  		
  
 ---

## โ ๊ธฐ๋ฅ ๋ฐ ํน์ง  
  
  ๊ฐ์ธ์ ์ผ๋ก ์ค์ํ๋ค๊ณ  ์๊ฐ ํ๋ ๊ธฐ๋ฅ๋ง ์์ฝํ์ต๋๋ค.  
  
- init ํ๋ก์ธ์ค์ ๋ํ ํธํ์ฑ ์ ๊ณต [legacy๋ฐฉ์์ Run level ์ฌ์ฉ X]

- ๋ถํ ์ ์๋น์ค ๋ณ๋ ฌ ์คํ [๊ธฐ์กด init ์ ์ง๋ ฌ ๋ฐฉ์ ๋๋น ํจ์จ์ฑ UP]

- Service ๋์  ์ ๋ ์ฌ์ฉ [etc/systemd/system/ ์๋ ์ ๋์ ๋งํฌ ์กด์ฌ] .Target์ ๊ฒฝ์ฐ ๊ธฐ์กด์ Run level๋ค์ ๋์ฒด ํ์ผ

	``ex) multi-user.target``

-	Time Out [์ฝ 5๋ถ์ ๋์ ์ ์๊ธฐ๊ฐ ์กด์ฌ]



<br/>



### ์ฃผ์ ์ ๋ํ์ผ ์์น

<br/>

1. /etc/systemd/system  
2. /run/systemd/system  
3. */usr/lib/sys-temd/system
    
```cs
$ ls /etc/systemd
bootchart.conf journald.conf  logind.conf  system  system.conf  user  user.conf
```


<br/>

### ์ ๋์ ๊ฐ๋
5.X, 6.X Version์ ``Service ์ ๋์ผ``ํฉ๋๋ค.  
  
  
  - ์ ๋๋ชฉ๋ก

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


### ์๋ธ์ปค๋งจ๋
[systemctl subcommand [option]

```cs
1) systemctl list-units [-t, -a ์ต์ ์ฌ์ฉ]
2) systemctl list-units-files [ํ์ฑํ ํ์ธ]
3) systemctl list-sockets [์์ผํ์ธ]
4) systemctl is-active [demon name] [ํน์  ์ ๋ ์คํ ํ์ธ]
5) systemctl is-enabled [demon name] [ํน์  ์ ๋ ํ์ฑํ ํ์ธ]
6) systemctl list-dependencies [demon name] [์์กด์ฑ ํ์ธ]
	
ex) systemctl status sshd
	systemctl restart sshd...
```

<br/>

### sshd.service UNIT File ๋ด์ฉ

cat /usr/lib/systemd/system/sshd.service [์๋น์ค ์ ๋ ํ์ผ ๋ด์ฉ]  
 ``Unit``, ``Service``, ``Install`` 3๊ฐ์ ํ๋๋ก ๋๋ ์ ธ์์ต๋๋ค.	
	
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

## ๐ ๋ถํธ ํ๋ก์ธ์ค

๊ธฐ์กด์ regacy ๋ฐฉ์์์ ๋ถํ ์ ์ฌ์ฉ๋๋ ``init``์ด ``Systemd``๋ก ๋ณ๊ฒฝ์ต๋๋ค.  
๋ค๋ง BIOS/UEFI -> BOOT LOADER -> Kernel ๋ฉ๋ชจ๋ฆฌ ์ ์ฌ๊น์ง๋ ๋์ผํฉ๋๋ค.  
    
<br/>

### ์ต์์ PID - 1 [init] -> SYSTEMD  

![](https://image.slidesharecdn.com/rhel7newfeaturesystemdbooting-160327092549/95/enterprise-linux-7-new-featuresystemdbooting-28-1024.jpg?cb=1459070873)


<br/>

### ๋ฆฌ๋์ค ๋ถํ ๊ณผ์  ์ค๋ช

![](https://image.slidesharecdn.com/rhel7newfeaturesystemdbooting-160327092549/95/enterprise-linux-7-new-featuresystemdbooting-29-1024.jpg?cb=1459070873)

![](https://image.slidesharecdn.com/rhel7newfeaturesystemdbooting-160327092549/95/enterprise-linux-7-new-featuresystemdbooting-30-1024.jpg?cb=1459070873)


<br/>

## ๐ Run Level ๋ณ๊ฒฝ 

๊ธฐ์กด init ์ปค๋งจ๋์ ๋ฌ๋ฆฌ ์ซ์ ๊ธฐ๋ฐ์ด ์๋ ๋ฐ ๋ ๋ฒจ์ ๋ํ ์ค์  ์ธํธ๋ฅผ ํตํด์ ๋ฐ ๋ ๋ฒจ์ ๋ณ๊ฒฝํฉ๋๋ค.


### ์ฑ๊ธ๋ชจ๋(๊ธฐ์กด ๋ฐ๋ ๋ฒจ1)

```cs
$ systemctl rescue
```

### ๋ฉํฐ์ ์ ๋ชจ๋(๊ธฐ์กด ๋ฐ๋ ๋ฒจ3)  
 
```cs		
$ systemctl isolate multi-user.target
$ systemctl isolate runlevel3.target
```

* ๊ณผ๊ฑฐ init ์์คํ์ ์ต์ํ ์ฌ์ฉ์๋ฅผ ์ํด์ runlevel3 ๋ผ๋ ์ด๋ฆ์ผ๋ก  
    multi-user.target ํ์ผ์ ๋งํฌ๋ฅผ ๊ฑธ์ด๋์ด ๋๊ฐ์ง ๋ช๋ น์ด ๋ชจ๋ ์ฌ์ฉ๊ฐ๋ฅ ํฉ๋๋ค.

	```cs
	$ ls -l /lib/systemd/system/runlevel3.target
	lrwxrwxrwx. 1 root root 17 Oct 21 00:28 /lib/systemd/system/runlevel3.target -> multi-user.target
	```	


### ๊ทธ๋ํฝ๋ชจ๋(๊ธฐ์กด ๋ฐ๋ ๋ฒจ5)

```cs
$ systemctl isolate graphical.target
$ systemctl isolate runlevel5.target
```

* ๋ฉํฐ์ ์ ๋ชจ๋์ ๋ง์ฐฌ๊ฐ์ง๋ก 2๊ฐ์ง ๋ช๋ น์ผ๋ก ์ ํ์ด ๊ฐ๋ฅ ํฉ๋๋ค   
	์ค์  ๊ธฐ์กด ํํ์ ๋ฐ๋ ๋ฒจ+์ซ์ ํํ์ Targetํ์ผ์ ์๋ ๋งํฌ๋ก ์ฐ๊ฒฐ๋์ด ์์ต๋๋ค.

	```cs
	lrwxrwxrwx. 1 root root 15 Oct 21 00:28 runlevel0.target -> poweroff.target
	lrwxrwxrwx. 1 root root 13 Oct 21 00:28 runlevel1.target -> rescue.target
	lrwxrwxrwx. 1 root root 17 Oct 21 00:28 runlevel2.target -> multi-user.target
	lrwxrwxrwx. 1 root root 17 Oct 21 00:28 runlevel3.target -> multi-user.target
	lrwxrwxrwx. 1 root root 17 Oct 21 00:28 runlevel4.target -> multi-user.target
	lrwxrwxrwx. 1 root root 16 Oct 21 00:28 runlevel5.target -> graphical.target
	lrwxrwxrwx. 1 root root 13 Oct 21 00:28 runlevel6.target -> reboot.target
	```

	์ฆ, ์์คํ ์ข๋ฃ/์ฌ๋ถํ์ ์ํ ๋ฐ๋ ๋ฒจ๋ ์ฌ์ ํ ์ฌ์ฉ๊ฐ๋ฅํฉ๋๋ค.!!


<br/>

---


## ๐ ๋ฐ๋ ๋ฒจ ๊ธฐ๋ณธ ๊ฐ ์ค์   

์๊ธฐ์์ ์ ํํ๋ ๋ฐ๋ ๋ฒจ Target์ ์๋์ ๊ฐ์ ๋ช๋ น์ ํตํด์ ๊ธฐ๋ณธ ๊ฐ์ผ๋ก ์ค์  ํ  ์ ์์ต๋๋ค.   
๋ํ, ํ์ฌ ์ค์ ๋ ๊ธฐ๋ณธ ๊ฐ์ ํ์ธ ํ  ์๋ ์์ต๋๋ค.  
	
```cs
$ systemctl set-default multi-user.target
$ systemctl get-default
multi-user.target
```

<br/>

## ๐ ์์คํ ๋ช๋ น  

์์ ๊ฐ๊ฐ์ ๋ฐ๋ ๋ฒจ ํ์ผ์ด poweroff.target ๋ฑ ์ผ๋ก ์ฐ๊ฒฐ๋์ด์๋ ๊ฒ์ ํ์ธํ์๋๋ฐ  
isolate ๋ช๋ น์ด ์๋ ์์คํ ๋ช๋ น์ ํตํด์ ํด๋น Target์ ๋ฐ๋ก ์ ์ฉํ๋๊ฒ ๊ฐ๋ฅํฉ๋๋ค. 


* ์๋ ๋ช๊ฐ์ง ์์๋ฅผ ๋ณด๊ฒ ์ต๋๋ค.

	```cs
	$ systemctl poweroff (Shutdown์ฒ๋ฆฌ ํ Power-Off์ฒ๋ฆฌ)
	$ systemctl emergency (Rescue์ ์ ์ฌํ์ง๋ง root ํ์ผ์์คํ๋ง ์ฝ๊ธฐ์ ์ฉ์ผ๋ก ๋ง์ดํธํ๋ค)
	$ systemctl halt (Shutdown์ฒ๋ฆฌ ํ Halt์ฒ๋ฆฌ)
	$ systemctl reboot (Shutdown์ฒ๋ฆฌ ํ ๋ฆฌ๋ถํ์ฒ๋ฆฌ)
	$ systemctl kexec (kexec๋ฅผ ํตํด์ ๋ฆฌ๋ถํํ๋ค)
	$ systemctl suspend (์์คํ ์ ์ง)
	$ systemctl hibernate (์์คํ Hibernate)
	$ systemctl hybrid-sleep (์์คํ์ Hibernateํ๊ณ  ์ ์ง์ํจ๋ค)

	--------------------------------------------------------------------------
		
	% System suspend ์ํ์ System hibernate ์ ์ฐจ์ด์ .
		
	Suspend : ์ปดํจํฐ๋ฅผ ๋์ง ์์ต๋๋ค. 
	์ปดํจํฐ์ ๋ชจ๋  ์ฃผ๋ณ ์ฅ์น๋ฅผ ์ ์ ๋ ฅ ๋ชจ๋๋ก ์ค์ ํฉ๋๋ค. 
	์ด๋ค ์ด์ ๋ก ๋  ๋ฐฐํฐ๋ฆฌ๊ฐ ๋ฐฉ์ ๋๊ฑฐ๋ ์ปดํจํฐ๊ฐ ๊บผ์ง๋ฉด 
	ํ์ฌ ์ธ์ ๋ฐ ์ ์ฅ๋์ง ์์ ๋ณ๊ฒฝ ๋ด์ฉ์ด ์์ค๋ฉ๋๋ค
		
	Hibernate : ์ปดํจํฐ์ ์ํ๋ฅผ ํ๋ ๋์คํฌ์ ์ ์ฅํ๊ณ  ์์ ํ ์ ์์ ๋๋๋ค. 
	๋ค์ ์์ํ๋ฉด ์ ์ฅ๋ ์ํ๊ฐ RAM์ผ๋ก ๋ณต์๋ฉ๋๋ค.
	```

<br/>

## โจ SYSTEMD vs SYSV Run level
	
- level 2,3์ ์ฐจ์ด : NFS ํ์ผ ์์คํ ์ฌ์ฉ ๊ฐ๋ฅ ์ฌ๋ถ 

	![](https://image.slidesharecdn.com/rhel7newfeaturesystemdbooting-160327092549/95/enterprise-linux-7-new-featuresystemdbooting-13-1024.jpg?cb=1459070873)
	

	  
* ### Run level ์ ์ ๋ณ๊ฒฝ
	
	```cs
	1) Bios ์ปค๋ ํ๋ฉด์์ (e) ์ปค๋งจ๋๋ก ํธ์ง๋ชจ๋ ์ง์.  
	2) LINUX16์ผ๋ก ์์ํ๋ ์ปค๋์ ์ค์  ๋ง์ง๋ง์ runlevel ๊ตฌ๋ฌธ ์ถ๊ฐ
	% : systemd.unit=rescure.target
	3) recure ๋ชจ๋๋ก ์ ์ ํ์ธ
	```

* ### Root Password ๋ณต๊ตฌ ๋ฐฉ๋ฒ


	```cs
	1) Bios ์ปค๋ ํ๋ฉด์์ (e) ์ปค๋งจ๋๋ก ํธ์ง๋ชจ๋ ์ง์.
	2) LINUX16์ผ๋ก ์์ํ๋ ์ปค๋์ค์ ์ ๋ง์ง๋ง rc.break ๊ตฌ๋ฌธ ์ถ๊ฐ
	3) /sysroot ๋ฆฌ๋ง์ดํธ
		  - mount | grep -w "/sysroot" - [๋ฃจํธ ๋ง์ดํธ ํ์ธ]
		  - mount -o remount,rw /sysroot - [๋ฃจํธ ๋ง์ดํธ ๊ถํ ์์  - ํ์ฌ๋ ๊ถํ์ด ์์]
		  - chroot /sysroot - [root ๋๋ ํ ๋ฆฌ ๊ถํ ๋ณ๊ฒฝ]
		  - ํจ์ค์๋ ์ฌ ์ค์  [ROOT Shell ์ ์ ํ passwd]
		  - touch /.autorerabel - [selinux ์ ์ฑ ์ ๋ค์ ๋ฆฌ๋ผ๋ฒจ ์ค์ ์ ํด์ค์ผ ์ ์ฉ๋จ ์๋ง๋ค๋ฉด ๋ฆฌ๋ก๋]
		  - ์ฌ๋ถํ ํ ๋ณ๊ฒฝ๋ ROOT ํจ์ค์๋ ํ์ธ.
	```

<br/>


```toc
```