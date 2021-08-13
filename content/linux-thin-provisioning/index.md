---
emoji: 🤦‍♂️
title: 리눅스 This-Provisioning
date: "2021-06-23 00:01:15"
author: nasa1515
tags: LINUX
categories: LINUX
---


머리말  
Thin provisioning은 경험해본 적도 들어본 적도 한번도 없는 기술입니다.  
어디서 쓸까? 생각해보면 메일이나, 클라우드를 제공하는 회사들에서 많이 쓸 것 같은 느낌입니다.

----
	
## ✔ Thin provisioning이란?

Thin provisioning 이란 쉽게 얘기하면 사용한 만큼만의 용량을 할당하는 방식입니다.  
10G를 할당 받았지만 3G의 공간만을 사용한다면 실제 사용분만큼의 용량을 제공하는 방식입니다.  
용량을 더 사용한다면 용량을 확보해주고 줄일 경우 사용했던 공간을 회수해 가는 방식으로.  
잉여 자원을 최대한 억제 할 수 있게 됩니다.  

<br/>


* 그림을 보면 이해가 쉽습니다!!  
![스크린샷, 2020-08-13 18-30-30](https://user-images.githubusercontent.com/69498804/90118378-1cb86900-dd93-11ea-93f4-09740a93bd5e.png)

<br/>

### Thin provisioning 의 장점

1. 사용되지 않는 많은 양의 스토리지를 절약할 수 있습니다.  
2. 필요 스토리지 용량이 줄어들게 되므로 직접 자본 비용(capex)이 절감.  
3. 데이터 센터에서 스토리지 운영 비용(opex)이 절감됩니다.  
4.  단일 여유 스토리지 풀을 관리할 수 있기 때문에 용량 계획이 단순하다. 여러 사용자가 동일한 여유 공간 풀에서 스토리지를 할당하므로 일부 볼륨에서는 용량이 제한되거나 용량이 남는 상황이 발생하지 않습니다    
5. 스토리지 환경이 더욱 민첩해지며 변화에 더 쉽게 대응할 수 있게 됩니다.
  
  
<br/>  

---

## ✌ 구성방법

구성의 경우 OS 설치시 GUI를 사용하면 매우 쉽게 구축이 가능하나 이번 포스트에서는 명령어를 이용해서 구성 해보았습니다.  

<br/>

### 구축 순서  

  1. 물리 볼륨 생성  
  2. 볼륨 그룹 생성 씬 풀/thin pool  
  3. 논리 볼륨 생성/씬프로비저닝    

<br/>

[이전 LVM 포스트로 PV, VG 구성 방법은 설명하였기에 이번 포스트는 씬풀부터 설명]  
미리 설정해놓은 wonseok VG로 진행하겠습니다.
	
```cs
[root@centos ~]$  vgs
VG      #PV #LV #SN Attr   VSize   VFree 
centos    1   2   0 wz--n- <19.00g     0 
lee       6   1   0 wz--n- <47.98g <7.98g
wonseok   2   0   0 wz--n-  19.99g 19.99g
```

<br/>

* ### 씬 풀/thin pool 생성
		        
	
	  명령어 : ``lvcreate -T -L 15G wonseok/thinpool`` (씬 풀 생성) 프로비저닝을 위한 영역설정

	  [옵션] -T 씬프로비저닝 형태, -L 사이즈

	```cs
	[root@centos ~]$  lvcreate -T -L 15G wonseok/thinpool 
	Thin pool volume with chunk size 64.00 KiB can address at most 15.81 TiB of data.
	Logical volume "thinpool" created.
	```

	<br/>

	thinpool LV 확인
	  
	```cs
	[root@centos ~]$  lvs
	LV       VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
	root     centos  -wi-ao---- <17.00g                                                    
	swap     centos  -wi-ao----   2.00g                                                    
	lee.lv   lee     -wi-ao----  40.00g                                                    
	thinpool wonseok twi-a-tz--  15.00g             0.00   10.57 
	```

	<br/>

* ### Thin provisioning LV 설정
	
	  명령어 : ``lvcreate -T -V 1T -n won_thin wonseok/thinpool``
	  씬풀 wonseok/thinpool에서 1T 사이즈로(-T : thin,-V : 가상 사이즈 ) lvm 생성(이름 lv_thin)

	  [옵션] -T 씬프로비저닝, -V 사이즈, 가상으로 큰 사이즈 지정, -n 이름, 생성할 논리볼륨 이름 지정

	```cs
	[root@centos ~]$  lvcreate -T -V 1T -n won_thin wonseok/thinpool
	WARNING: Sum of all thin volume sizes (1.00 TiB) exceeds the size of thin pool wonseok/thinpool and the size of whole volume group (19.99 GiB).
	WARNING: You have not turned on protection against thin pools running out of space.
	WARNING: Set activation/thin_pool_autoextend_threshold below 100 to trigger automatic extension of thin pools before they get full.
	Logical volume "won_thin" created.
	```

<br/>

* ### won_thin LV 생성 및 용량 확인

	```cs
	[root@centos ~]$  lvs
	LV       VG      Attr       LSize   Pool     Origin Data%  Meta%  Move Log Cpy%Sync Convert
	root     centos  -wi-ao---- <17.00g                                                        
	swap     centos  -wi-ao----   2.00g                                                        
	lee.lv   lee     -wi-ao----  40.00g                                                        
	thinpool wonseok twi-aotz--  15.00g                 0.00   10.60                           
	won_thin wonseok Vwi-a-tz--   1.00t thinpool        0.00                
	```

* ### fdisk -l 명령어로 사용가능 영역 확인

	```cs
	[root@centos ~]$  fdisk -l /dev/mapper/wonseok-won_thi	
	Disk /dev/mapper/wonseok-won_thin: 1099.5 GB, 1099511627776 bytes, 2147483648 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 65536 bytes / 65536 bytes
	```

```toc
```
  

  



 

