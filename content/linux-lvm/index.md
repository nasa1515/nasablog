---
emoji: 🤦‍♂️
title: 리눅스 LVM
date: "2021-06-23 00:01:10"
author: nasa1515
tags: LINUX
categories: LINUX
---

머리말  


안녕하세요 NASA 입니다. 이번 포스트는 LVM에서 다뤄보겠습니다.

---


## ✔ LVM(Logical Volume Manager) 이란? 
Logical Volume을 효율적이고 유연하게 관리하기 위한 커널의 한 부분이자 프로그램입니다.  
기존에는 파일시스템이 블록 장치에 직접 접근해서 읽고/쓰기를 했다면  
LVM을 사용하면 파일 시스템이 가상의 블록 장치에 읽고/쓰기를 하게 됩니다.  
  
<br/>

### LVM의 장점
1. 유연한 용량  
2. 크기 조정 가능한 스토리지 풀(Pool)  
3. 온라인 데이터 재배치  
4. 편의에 따라 장치 이름 지정  
5. 디스크 스트라이핑  
6. 미러 볼륨  
7. 볼륨 스냅샷   

<br/>

* 아래 이미지 처럼 LVM은 물리적 스토리지 이상의 추상적 레이어를 생성해서  
	논리적 스토리지(가상의 블록 장치)를 생성할 수 있게 해줍니다.  
 

	![](https://t1.daumcdn.net/cfile/tistory/2503D43D54B95EA712)

----

## ✌ LVM 로직

LVM은 아래 3개의 로직을 가지고 구성이 가능합니다.  

### PV(Physical Volume)  

```cs
LVM에서 블록 장치를 사용하려면 PV로 초기화를 해야한다. 
즉, 블록 장치 전체 또는 그 블록 장치를 이루고 있는 파티션들을 LVM에서 사용할 수있게 변환한것이다.
예를 들어 /dev/sda1, /dev/sda2들을 LVM으로 쓰기 위해 
PV라는 형식으로 변환한 것이다. 
PV는 일정한 크기의 PE(Pysyical Extent)들로 구성이 된다.
	  
* 블록 장치 : 블록 단위로 접근하는 스토리지. 예를 들어 대용량 하드 디스크_  
```

<br/>

### PE(Physical Extent)

```cs
PV를 구성하는 일정한 크기의 블록으로 LVM2에서의 기본크기는 4MB이다. 
LV(Logical Volume)의 LE(Logical Extent)들과 1:1로 맵핑된다.
그렇기에 항상 PE와 LE의 크기는 동일하다. 
즉, 아래 그림과 같은 모습이다. 
블록 장치(물리적 디스크)의 파티션들을 PV들로 초기화 시킨 모습이다. 
각각의 PV들은 동일한 크기의 PE들로 구성이된다.
```

![](https://t1.daumcdn.net/cfile/tistory/241D5F4154B78E5E21)


<br/>

### VG(Volume Group)

```cs
PV들의 집합으로 LV를 할당할 수 있는 공간이다. 
즉, PV들로 VG를 생성하는 과정은 LV로 할당할 수 있는 디스크 공간의 풀(Pool)을 생성하는 것으로 보면 된다. 
사용자는 VG 안에서 원하는 대로 공간을 쪼개서 LV로 만들 수 있다. 
아래 그림과 같이 위에서 만든 PV들을 하나의 VG1로 묶었다.
```

![](https://t1.daumcdn.net/cfile/tistory/2710804154B78E5E30)

<br/>

### LV(Logical Volume)

```cs
사용자가 최종적으로 다루게 되는 논리적인 스토리지이다. 
위에서도 언급했지만, LV를 구성하는 LE들이 PV의 PE들과 맵핑 하면서 존재하게 된다.
```

<br/>

### LE(Logical Extent)

```cs
LV를 구성하는 일정한 크기의 블록으로 LVM2에서 기본크기는 4MB이다.
위에서 언급했지만, 항상 PE와 LE의 크기는 동일하다.
위의 그림은 위에서 만든 VG1에서 사용자가 원하는 크기대로 분할해서 LV1과 LV2를 만든 모습이다.
꼭 VG의 모든 공간을 다 써야 되는건 아니다. 
각각의 LV들은 동일한 크기의 LE로 구성이 되며 그림에는 표시 안됐지만 PE들과 맵핑된다.
```

<br/>

----
 
## 👍 LVM의 기본 개념  

<br/>

1. PV로 초기화된 장치들을 VG(Volume Group)으로 통합된다.  

2. PV들을 VG로 통합하는 과정은 LV를 생성할 수 있는 디스크 공간의 풀(Pool)을 생성 하는 것과 같다.    

3. VG는 일정한 크기의 PE(Physical Extent)로 분할된다.

	![](https://t1.daumcdn.net/cfile/tistory/2710804154B78E5E30)

<br/>

* 4. VG는 LE들을 PE로 맵핑함을 통해 LV를 생성한다.

	![](https://t1.daumcdn.net/cfile/tistory/22308C4154B78E5E0C)

<br>

* 5. 생성된 LV는 파일 시스템 및 어플리케이션 (예를 들어 Database)로 사용된다.  
	즉, 사용자가 최종적으로 다루게 되는 것은 LV라는 뜻이다.  

<br/>

----

## 👏 LVM 생성 방법


생성 순서

* Step 1. fdisk를 이용해 저장장치에 파티션을 설정한다(파티션 타입을 LVM 타입으로)  
* Step 2. pvcreate을 이용해 1.에서 설정한 파티션으로 PV를 생성한다.  
* Step 3. vgcreate으로 2.에서 만든 PV들을 묶어 VG를 생성한다.  
* Step 4. vgdisplay로 VG가 제대로 생성됬는지 확인한다.  
* Step 5. lvcreate로 LV를 사용자가 원하는대로 생성한다.  
* Step 6. mkfs를 이용해 5.에서 생성한 LV에 파일시스템 포멧을 한다.  
* Step 7. 부팅시 자동으로 저장장치를 읽도록 /etc/fstab에 기술


<br/>

* ### 1.  파티션 생성하기  

	(disk 1개당 1개 파티션, systemtype(ID)이 linux lvm(8e) 변경 (fdisk/parted)


<br/>

* ### 2. pvcreate 생성 (pvcreate 파티션번호입력)
	
	```cs
    # pvcreate /dev/sdb1 /dev/sdc1 /dev/sdd1

    # 확인 pvs 또는 pvdisplay

    [admin@localhost ~]$ sudo lvmdiskscan
    /dev/sdb1 [ <8.00 GiB] LVM physical volume
    /dev/sdc1 [ <8.00 GiB] LVM physical volume
    /dev/sdd1 [ <8.00 GiB] LVM physical volume

    0 disks
    1 partition
    0 LVM physical volume whole disks
    3 LVM physical volumes
	```
  
<br/>

* ### 3. vg(볼륨그룹) 생성  
	[형식 : vgcreate 볼륨그룹이름 pv나열]
	
	```cs
	# vgcreate lee /dev/sdb1 /dev/sdc1 /dev/sdd1

	# 확인 vgs 또는 vgdisplay
	  
	[admin@localhost ~]$  vgs
	VG     #PV #LV #SN Attr   VSize   VFree 
	centos   1   2   0 wz--n- <19.00g     0 
	lee      3   0   0 wz--n- <60.00g     0g
	```
  
<br/>

* ### 4.  lv(로지컬 볼륨) 생성  
	[형식 : lvcreate -n 논리볼륨이름 -l PE개수 볼륨그룹명]
	
	```cs
    # lvcreate -n 논리볼륨이름 또는 -L 디스크사이즈 볼륨그룹명
	# lvcreate -n lee.lv -L 10G lee

	# 확인 lvs 또는 lvdisplay

    [admin@localhost ~]$ sudo lvs

	LV VG Attr LSize Pool Origin Data% Meta% Move Log Cpy%Sync Convert
	root centos -wi-ao---- 26.99g
	swap centos -wi-ao---- 2.00g
	lee_lv lee -wi-ao---- 1000.00m
	```

  
<br/>

* ### 5. 볼륨그룹을 생성하면 /dev 내에 동일한 디렉토리 생성, lvm 링크 생성됨.
	
	```cs
	[lvm 경로 : /dev/볼륨그룹명/논리볼륨명]
	
	[admin@localhost ~]$ ls -ld /dev/lee
  	drwxr-xr-x. 2 root root 80 Jul 3 14:20 /dev/lee

	[admin@localhost ~]$ ls -l /dev/vg_test/
	total 0
	lrwxrwxrwx. 1 root root 7 Jul 3 14:33 lee.lv -> ../dm-1
	```

<br/>

* ### 6. 파일 시스템 생성 후(ext4) 수동마운트  

	(마운트포인트: /mnt/lvm1)

	```cs
	# mkfs.ext4 /dev/lee/lee_lv
	# blkid 또는 lsblk -f 로 파일시스템 ext4 확인

	# mkdir /mnt/lvm1
	# mount -t ext4 /dev/lee/lee_lv /mnt/lvm1
	```

<br/>

* ### 7. 마운트확인
	    
	```cs	
	# df -h
	# mount | grep "lvm1"
	```

<br/>

----

<br/>

## 🤣 VG 축소하기 : 소속된 pv을 제거

* ### 1.  vg 사이즈 축소  
	
	[형식 : vgreduce vg이름 제거 pv지정]
        
	```cs	
	[admin@localhost ~]$ sudo vgreduce vg_test /dev/sdg1
	Removed "/dev/sdg1" from volume group "vg_test"
	[admin@localhost ~]$ sudo vgs
	VG #PV #LV #SN Attr VSize VFree
	centos 1 2 0 wz--n- <29.00g 4.00m
	vg_test 5 2 0 wz--n- 39.98g 38.22g

	#	pvs 명령어로 확인
	[admin@localhost ~]$ sudo pvs
	PV VG Fmt Attr PSize PFree

	/dev/sdb1 lee lvm2 a-- <8.00g <6.24g
	/dev/sdc1 lee lvm2 a-- <8.00g <8.00g
	/dev/sdd1 lvm2 --- <8.00g <8.00g     <- VG에 소속되어 있지 않음.
	```
<br/>

* ### 2.  pv 제거   

	[형식 : remove pv명]

	```cs    
	# 제거 전 디스크 사용 여부 확인
	[admin@localhost ~]$ sudo lvmdiskscan

    /dev/sdb1 [ <8.00 GiB] LVM physical volume
	/dev/sdc1 [ <8.00 GiB] LVM physical volume
	/dev/sdd1 [ <8.00 GiB] LVM physical volume  
	```
	
<br/>

----

<br/>

## 😢 VG 확장하기

[방식 : 1. 디스크 추가장착, 2. 파티셔닝, 3.pv생성, 4.vg확장]

* ### 1. 디스크 추가 장착 확인

	```cs
	[admin@localhost ~]$ sudo lvmdiskscan
	   
	/dev/sdb1 [ <8.00 GiB] LVM physical volume
	/dev/sdc1 [ <8.00 GiB] LVM physical volume
	/dev/sdd1 [ <8.00 GiB] LVM physical volume
	/dev/sde1 [ <8.00 GiB]
	   
	0 disks
	2 partitions
	0 LVM physical volume whole disks
	3 LVM physical volumes
	```
  
<br/>

* ### 2. PV 추가 생성

	```cs
    [admin@localhost ~]$ sudo pvcreate /dev/sde1
    Physical volume "/dev/sdg1" successfully created.
	

    # 추가 생성 확인
    [admin@localhost ~]$ sudo pvs
    PV VG Fmt Attr PSize PFree

    /dev/sdb1 vg_test lvm2 a-- <8.00g <6.24g
    /dev/sdc1 vg_test lvm2 a-- <8.00g <8.00g
    /dev/sdd1 vg_test lvm2 a-- <8.00g <8.00g
    /dev/sde1 lvm2 -- <8.00g <8.00g
	```

<br/> 

* ### 3. VG 에 PV추가  

	[형식 : vgextend vg그룹 추가 할 PV]

	```cs
    [admin@localhost ~]$ sudo vgextend lee /dev/sdg1
     Volume group "vg_test" successfully extended


     [admin@localhost ~]$ sudo pvs

	 PV VG Fmt Attr PSize PFree
	 /dev/sdb1 lee2 a-- <8.00g <8.00g
	 /dev/sdc1 lee2 a-- <8.00g <8.00g
	 /dev/sdd1 lee2 a-- <8.00g <8.00g
	 /dev/sde1 lee2 a-- <8.00g <8.00g

	 [admin@localhost ~]$ sudo vgs
	   
	 VG #PV #LV #SN Attr VSize VFree

	 centos 1 2 0 wz--n- <29.00g 4.00m
	 lee 4 2 0 wz--n- <47.98g <46.22g
	```

<br/>

---

* ### (xfs) lee.lv 1G 확장하기  

	[형식 : lvextend -L 1G lv 절대경로]

	```cs
	[admin@localhost ~]$ sudo lvextend -L +1G /dev/leet/lee_lv
	Size of logical volume lee/lee.lv changed from 1000.00 MiB (250 extents) to <1.98 GiB (506 extents).

	Logical volume lee/lee_lv successfully resized.

	#용량 확장 확인
	[admin@localhost ~]$ sudo lvs

	LV VG Attr LSize Pool Origin Data% Meta% Move Log Cpy%Sync Convert

	lee.lv lee -wi-ao---- 1.98g
	```

<br/>
  

* 파일시스템은 늘어나지 않음. 파일시스템은 별도 처리 필요

  
	```cs
	[admin@localhost ~]$ sudo xfs_growfs /mnt/lvm2

	meta-data=/dev/mapper/lee-lee.lv isize=512 agcount=4, agsize=64000 blks= sectsz=512 attr=2, 
	projid32bit=1 = crc=1 finobt=0 spinodes=0 data = bsize=4096 blocks=256000, imaxpct=25= sunit=0 
	swidth=0 blks naming =version 2 bsize=4096 ascii-ci=0 ftype=1 log =internal bsize=4096 blocks=855,
	version=2 = sectsz=512 sunit=0 blks, lazy-count=1 realtime =none extsz=4096 blocks=0, rtextents=0

	data blocks changed from 256000 to 518144
	```

<br/>

* (ext4) lee.lv 1G 확장하기 

	```cs
	# LV 확장의 경우 위의 작업과 동일함
	resize2fs /dev/lee/lee.vg

	df -h 파일시스템 확장 확인
	```

```toc
```

  



 

