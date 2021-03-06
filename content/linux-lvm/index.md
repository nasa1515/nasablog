---
emoji: ๐คฆโโ๏ธ
title: "[LINUX] - LVM"
date: "2021-06-23 00:01:10"
author: nasa1515
tags: LINUX
categories: LINUX
---

๋จธ๋ฆฌ๋ง  


์๋ํ์ธ์ NASA ์๋๋ค. ์ด๋ฒ ํฌ์คํธ๋ LVM์์ ๋ค๋ค๋ณด๊ฒ ์ต๋๋ค.

---


## โ LVM(Logical Volume Manager) ์ด๋? 
Logical Volume์ ํจ์จ์ ์ด๊ณ  ์ ์ฐํ๊ฒ ๊ด๋ฆฌํ๊ธฐ ์ํ ์ปค๋์ ํ ๋ถ๋ถ์ด์ ํ๋ก๊ทธ๋จ์๋๋ค.  
๊ธฐ์กด์๋ ํ์ผ์์คํ์ด ๋ธ๋ก ์ฅ์น์ ์ง์  ์ ๊ทผํด์ ์ฝ๊ณ /์ฐ๊ธฐ๋ฅผ ํ๋ค๋ฉด  
LVM์ ์ฌ์ฉํ๋ฉด ํ์ผ ์์คํ์ด ๊ฐ์์ ๋ธ๋ก ์ฅ์น์ ์ฝ๊ณ /์ฐ๊ธฐ๋ฅผ ํ๊ฒ ๋ฉ๋๋ค.  
  
<br/>

### LVM์ ์ฅ์ 
1. ์ ์ฐํ ์ฉ๋  
2. ํฌ๊ธฐ ์กฐ์  ๊ฐ๋ฅํ ์คํ ๋ฆฌ์ง ํ(Pool)  
3. ์จ๋ผ์ธ ๋ฐ์ดํฐ ์ฌ๋ฐฐ์น  
4. ํธ์์ ๋ฐ๋ผ ์ฅ์น ์ด๋ฆ ์ง์   
5. ๋์คํฌ ์คํธ๋ผ์ดํ  
6. ๋ฏธ๋ฌ ๋ณผ๋ฅจ  
7. ๋ณผ๋ฅจ ์ค๋์ท   

<br/>

* ์๋ ์ด๋ฏธ์ง ์ฒ๋ผ LVM์ ๋ฌผ๋ฆฌ์  ์คํ ๋ฆฌ์ง ์ด์์ ์ถ์์  ๋ ์ด์ด๋ฅผ ์์ฑํด์  
	๋ผ๋ฆฌ์  ์คํ ๋ฆฌ์ง(๊ฐ์์ ๋ธ๋ก ์ฅ์น)๋ฅผ ์์ฑํ  ์ ์๊ฒ ํด์ค๋๋ค.  
 

	![](https://t1.daumcdn.net/cfile/tistory/2503D43D54B95EA712)

----

## โ LVM ๋ก์ง

LVM์ ์๋ 3๊ฐ์ ๋ก์ง์ ๊ฐ์ง๊ณ  ๊ตฌ์ฑ์ด ๊ฐ๋ฅํฉ๋๋ค.  

### PV(Physical Volume)  

```cs
LVM์์ ๋ธ๋ก ์ฅ์น๋ฅผ ์ฌ์ฉํ๋ ค๋ฉด PV๋ก ์ด๊ธฐํ๋ฅผ ํด์ผํ๋ค. 
์ฆ, ๋ธ๋ก ์ฅ์น ์ ์ฒด ๋๋ ๊ทธ ๋ธ๋ก ์ฅ์น๋ฅผ ์ด๋ฃจ๊ณ  ์๋ ํํฐ์๋ค์ LVM์์ ์ฌ์ฉํ  ์์๊ฒ ๋ณํํ๊ฒ์ด๋ค.
์๋ฅผ ๋ค์ด /dev/sda1, /dev/sda2๋ค์ LVM์ผ๋ก ์ฐ๊ธฐ ์ํด 
PV๋ผ๋ ํ์์ผ๋ก ๋ณํํ ๊ฒ์ด๋ค. 
PV๋ ์ผ์ ํ ํฌ๊ธฐ์ PE(Pysyical Extent)๋ค๋ก ๊ตฌ์ฑ์ด ๋๋ค.
	  
* ๋ธ๋ก ์ฅ์น : ๋ธ๋ก ๋จ์๋ก ์ ๊ทผํ๋ ์คํ ๋ฆฌ์ง. ์๋ฅผ ๋ค์ด ๋์ฉ๋ ํ๋ ๋์คํฌ_  
```

<br/>

### PE(Physical Extent)

```cs
PV๋ฅผ ๊ตฌ์ฑํ๋ ์ผ์ ํ ํฌ๊ธฐ์ ๋ธ๋ก์ผ๋ก LVM2์์์ ๊ธฐ๋ณธํฌ๊ธฐ๋ 4MB์ด๋ค. 
LV(Logical Volume)์ LE(Logical Extent)๋ค๊ณผ 1:1๋ก ๋งตํ๋๋ค.
๊ทธ๋ ๊ธฐ์ ํญ์ PE์ LE์ ํฌ๊ธฐ๋ ๋์ผํ๋ค. 
์ฆ, ์๋ ๊ทธ๋ฆผ๊ณผ ๊ฐ์ ๋ชจ์ต์ด๋ค. 
๋ธ๋ก ์ฅ์น(๋ฌผ๋ฆฌ์  ๋์คํฌ)์ ํํฐ์๋ค์ PV๋ค๋ก ์ด๊ธฐํ ์ํจ ๋ชจ์ต์ด๋ค. 
๊ฐ๊ฐ์ PV๋ค์ ๋์ผํ ํฌ๊ธฐ์ PE๋ค๋ก ๊ตฌ์ฑ์ด๋๋ค.
```

![](https://t1.daumcdn.net/cfile/tistory/241D5F4154B78E5E21)


<br/>

### VG(Volume Group)

```cs
PV๋ค์ ์งํฉ์ผ๋ก LV๋ฅผ ํ ๋นํ  ์ ์๋ ๊ณต๊ฐ์ด๋ค. 
์ฆ, PV๋ค๋ก VG๋ฅผ ์์ฑํ๋ ๊ณผ์ ์ LV๋ก ํ ๋นํ  ์ ์๋ ๋์คํฌ ๊ณต๊ฐ์ ํ(Pool)์ ์์ฑํ๋ ๊ฒ์ผ๋ก ๋ณด๋ฉด ๋๋ค. 
์ฌ์ฉ์๋ VG ์์์ ์ํ๋ ๋๋ก ๊ณต๊ฐ์ ์ชผ๊ฐ์ LV๋ก ๋ง๋ค ์ ์๋ค. 
์๋ ๊ทธ๋ฆผ๊ณผ ๊ฐ์ด ์์์ ๋ง๋  PV๋ค์ ํ๋์ VG1๋ก ๋ฌถ์๋ค.
```

![](https://t1.daumcdn.net/cfile/tistory/2710804154B78E5E30)

<br/>

### LV(Logical Volume)

```cs
์ฌ์ฉ์๊ฐ ์ต์ข์ ์ผ๋ก ๋ค๋ฃจ๊ฒ ๋๋ ๋ผ๋ฆฌ์ ์ธ ์คํ ๋ฆฌ์ง์ด๋ค. 
์์์๋ ์ธ๊ธํ์ง๋ง, LV๋ฅผ ๊ตฌ์ฑํ๋ LE๋ค์ด PV์ PE๋ค๊ณผ ๋งตํ ํ๋ฉด์ ์กด์ฌํ๊ฒ ๋๋ค.
```

<br/>

### LE(Logical Extent)

```cs
LV๋ฅผ ๊ตฌ์ฑํ๋ ์ผ์ ํ ํฌ๊ธฐ์ ๋ธ๋ก์ผ๋ก LVM2์์ ๊ธฐ๋ณธํฌ๊ธฐ๋ 4MB์ด๋ค.
์์์ ์ธ๊ธํ์ง๋ง, ํญ์ PE์ LE์ ํฌ๊ธฐ๋ ๋์ผํ๋ค.
์์ ๊ทธ๋ฆผ์ ์์์ ๋ง๋  VG1์์ ์ฌ์ฉ์๊ฐ ์ํ๋ ํฌ๊ธฐ๋๋ก ๋ถํ ํด์ LV1๊ณผ LV2๋ฅผ ๋ง๋  ๋ชจ์ต์ด๋ค.
๊ผญ VG์ ๋ชจ๋  ๊ณต๊ฐ์ ๋ค ์จ์ผ ๋๋๊ฑด ์๋๋ค. 
๊ฐ๊ฐ์ LV๋ค์ ๋์ผํ ํฌ๊ธฐ์ LE๋ก ๊ตฌ์ฑ์ด ๋๋ฉฐ ๊ทธ๋ฆผ์๋ ํ์ ์๋์ง๋ง PE๋ค๊ณผ ๋งตํ๋๋ค.
```

<br/>

----
 
## ๐ LVM์ ๊ธฐ๋ณธ ๊ฐ๋  

<br/>

1. PV๋ก ์ด๊ธฐํ๋ ์ฅ์น๋ค์ VG(Volume Group)์ผ๋ก ํตํฉ๋๋ค.  

2. PV๋ค์ VG๋ก ํตํฉํ๋ ๊ณผ์ ์ LV๋ฅผ ์์ฑํ  ์ ์๋ ๋์คํฌ ๊ณต๊ฐ์ ํ(Pool)์ ์์ฑ ํ๋ ๊ฒ๊ณผ ๊ฐ๋ค.    

3. VG๋ ์ผ์ ํ ํฌ๊ธฐ์ PE(Physical Extent)๋ก ๋ถํ ๋๋ค.

	![](https://t1.daumcdn.net/cfile/tistory/2710804154B78E5E30)

<br/>

* 4. VG๋ LE๋ค์ PE๋ก ๋งตํํจ์ ํตํด LV๋ฅผ ์์ฑํ๋ค.

	![](https://t1.daumcdn.net/cfile/tistory/22308C4154B78E5E0C)

<br>

* 5. ์์ฑ๋ LV๋ ํ์ผ ์์คํ ๋ฐ ์ดํ๋ฆฌ์ผ์ด์ (์๋ฅผ ๋ค์ด Database)๋ก ์ฌ์ฉ๋๋ค.  
	์ฆ, ์ฌ์ฉ์๊ฐ ์ต์ข์ ์ผ๋ก ๋ค๋ฃจ๊ฒ ๋๋ ๊ฒ์ LV๋ผ๋ ๋ป์ด๋ค.  

<br/>

----

## ๐ LVM ์์ฑ ๋ฐฉ๋ฒ


์์ฑ ์์

* Step 1. fdisk๋ฅผ ์ด์ฉํด ์ ์ฅ์ฅ์น์ ํํฐ์์ ์ค์ ํ๋ค(ํํฐ์ ํ์์ LVM ํ์์ผ๋ก)  
* Step 2. pvcreate์ ์ด์ฉํด 1.์์ ์ค์ ํ ํํฐ์์ผ๋ก PV๋ฅผ ์์ฑํ๋ค.  
* Step 3. vgcreate์ผ๋ก 2.์์ ๋ง๋  PV๋ค์ ๋ฌถ์ด VG๋ฅผ ์์ฑํ๋ค.  
* Step 4. vgdisplay๋ก VG๊ฐ ์ ๋๋ก ์์ฑ๋ฌ๋์ง ํ์ธํ๋ค.  
* Step 5. lvcreate๋ก LV๋ฅผ ์ฌ์ฉ์๊ฐ ์ํ๋๋๋ก ์์ฑํ๋ค.  
* Step 6. mkfs๋ฅผ ์ด์ฉํด 5.์์ ์์ฑํ LV์ ํ์ผ์์คํ ํฌ๋ฉง์ ํ๋ค.  
* Step 7. ๋ถํ์ ์๋์ผ๋ก ์ ์ฅ์ฅ์น๋ฅผ ์ฝ๋๋ก /etc/fstab์ ๊ธฐ์ 


<br/>

* ### 1.  ํํฐ์ ์์ฑํ๊ธฐ  

	(disk 1๊ฐ๋น 1๊ฐ ํํฐ์, systemtype(ID)์ด linux lvm(8e) ๋ณ๊ฒฝ (fdisk/parted)


<br/>

* ### 2. pvcreate ์์ฑ (pvcreate ํํฐ์๋ฒํธ์๋ ฅ)
	
	```cs
    # pvcreate /dev/sdb1 /dev/sdc1 /dev/sdd1

    # ํ์ธ pvs ๋๋ pvdisplay

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

* ### 3. vg(๋ณผ๋ฅจ๊ทธ๋ฃน) ์์ฑ  
	[ํ์ : vgcreate ๋ณผ๋ฅจ๊ทธ๋ฃน์ด๋ฆ pv๋์ด]
	
	```cs
	# vgcreate lee /dev/sdb1 /dev/sdc1 /dev/sdd1

	# ํ์ธ vgs ๋๋ vgdisplay
	  
	[admin@localhost ~]$  vgs
	VG     #PV #LV #SN Attr   VSize   VFree 
	centos   1   2   0 wz--n- <19.00g     0 
	lee      3   0   0 wz--n- <60.00g     0g
	```
  
<br/>

* ### 4.  lv(๋ก์ง์ปฌ ๋ณผ๋ฅจ) ์์ฑ  
	[ํ์ : lvcreate -n ๋ผ๋ฆฌ๋ณผ๋ฅจ์ด๋ฆ -l PE๊ฐ์ ๋ณผ๋ฅจ๊ทธ๋ฃน๋ช]
	
	```cs
    # lvcreate -n ๋ผ๋ฆฌ๋ณผ๋ฅจ์ด๋ฆ ๋๋ -L ๋์คํฌ์ฌ์ด์ฆ ๋ณผ๋ฅจ๊ทธ๋ฃน๋ช
	# lvcreate -n lee.lv -L 10G lee

	# ํ์ธ lvs ๋๋ lvdisplay

    [admin@localhost ~]$ sudo lvs

	LV VG Attr LSize Pool Origin Data% Meta% Move Log Cpy%Sync Convert
	root centos -wi-ao---- 26.99g
	swap centos -wi-ao---- 2.00g
	lee_lv lee -wi-ao---- 1000.00m
	```

  
<br/>

* ### 5. ๋ณผ๋ฅจ๊ทธ๋ฃน์ ์์ฑํ๋ฉด /dev ๋ด์ ๋์ผํ ๋๋ ํ ๋ฆฌ ์์ฑ, lvm ๋งํฌ ์์ฑ๋จ.
	
	```cs
	[lvm ๊ฒฝ๋ก : /dev/๋ณผ๋ฅจ๊ทธ๋ฃน๋ช/๋ผ๋ฆฌ๋ณผ๋ฅจ๋ช]
	
	[admin@localhost ~]$ ls -ld /dev/lee
  	drwxr-xr-x. 2 root root 80 Jul 3 14:20 /dev/lee

	[admin@localhost ~]$ ls -l /dev/vg_test/
	total 0
	lrwxrwxrwx. 1 root root 7 Jul 3 14:33 lee.lv -> ../dm-1
	```

<br/>

* ### 6. ํ์ผ ์์คํ ์์ฑ ํ(ext4) ์๋๋ง์ดํธ  

	(๋ง์ดํธํฌ์ธํธ: /mnt/lvm1)

	```cs
	# mkfs.ext4 /dev/lee/lee_lv
	# blkid ๋๋ lsblk -f ๋ก ํ์ผ์์คํ ext4 ํ์ธ

	# mkdir /mnt/lvm1
	# mount -t ext4 /dev/lee/lee_lv /mnt/lvm1
	```

<br/>

* ### 7. ๋ง์ดํธํ์ธ
	    
	```cs	
	# df -h
	# mount | grep "lvm1"
	```

<br/>

----

<br/>

## ๐คฃ VG ์ถ์ํ๊ธฐ : ์์๋ pv์ ์ ๊ฑฐ

* ### 1.  vg ์ฌ์ด์ฆ ์ถ์  
	
	[ํ์ : vgreduce vg์ด๋ฆ ์ ๊ฑฐ pv์ง์ ]
        
	```cs	
	[admin@localhost ~]$ sudo vgreduce vg_test /dev/sdg1
	Removed "/dev/sdg1" from volume group "vg_test"
	[admin@localhost ~]$ sudo vgs
	VG #PV #LV #SN Attr VSize VFree
	centos 1 2 0 wz--n- <29.00g 4.00m
	vg_test 5 2 0 wz--n- 39.98g 38.22g

	#	pvs ๋ช๋ น์ด๋ก ํ์ธ
	[admin@localhost ~]$ sudo pvs
	PV VG Fmt Attr PSize PFree

	/dev/sdb1 lee lvm2 a-- <8.00g <6.24g
	/dev/sdc1 lee lvm2 a-- <8.00g <8.00g
	/dev/sdd1 lvm2 --- <8.00g <8.00g     <- VG์ ์์๋์ด ์์ง ์์.
	```
<br/>

* ### 2.  pv ์ ๊ฑฐ   

	[ํ์ : remove pv๋ช]

	```cs    
	# ์ ๊ฑฐ ์  ๋์คํฌ ์ฌ์ฉ ์ฌ๋ถ ํ์ธ
	[admin@localhost ~]$ sudo lvmdiskscan

    /dev/sdb1 [ <8.00 GiB] LVM physical volume
	/dev/sdc1 [ <8.00 GiB] LVM physical volume
	/dev/sdd1 [ <8.00 GiB] LVM physical volume  
	```
	
<br/>

----

<br/>

## ๐ข VG ํ์ฅํ๊ธฐ

[๋ฐฉ์ : 1. ๋์คํฌ ์ถ๊ฐ์ฅ์ฐฉ, 2. ํํฐ์๋, 3.pv์์ฑ, 4.vgํ์ฅ]

* ### 1. ๋์คํฌ ์ถ๊ฐ ์ฅ์ฐฉ ํ์ธ

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

* ### 2. PV ์ถ๊ฐ ์์ฑ

	```cs
    [admin@localhost ~]$ sudo pvcreate /dev/sde1
    Physical volume "/dev/sdg1" successfully created.
	

    # ์ถ๊ฐ ์์ฑ ํ์ธ
    [admin@localhost ~]$ sudo pvs
    PV VG Fmt Attr PSize PFree

    /dev/sdb1 vg_test lvm2 a-- <8.00g <6.24g
    /dev/sdc1 vg_test lvm2 a-- <8.00g <8.00g
    /dev/sdd1 vg_test lvm2 a-- <8.00g <8.00g
    /dev/sde1 lvm2 -- <8.00g <8.00g
	```

<br/> 

* ### 3. VG ์ PV์ถ๊ฐ  

	[ํ์ : vgextend vg๊ทธ๋ฃน ์ถ๊ฐ ํ  PV]

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

* ### (xfs) lee.lv 1G ํ์ฅํ๊ธฐ  

	[ํ์ : lvextend -L 1G lv ์ ๋๊ฒฝ๋ก]

	```cs
	[admin@localhost ~]$ sudo lvextend -L +1G /dev/leet/lee_lv
	Size of logical volume lee/lee.lv changed from 1000.00 MiB (250 extents) to <1.98 GiB (506 extents).

	Logical volume lee/lee_lv successfully resized.

	#์ฉ๋ ํ์ฅ ํ์ธ
	[admin@localhost ~]$ sudo lvs

	LV VG Attr LSize Pool Origin Data% Meta% Move Log Cpy%Sync Convert

	lee.lv lee -wi-ao---- 1.98g
	```

<br/>
  

* ํ์ผ์์คํ์ ๋์ด๋์ง ์์. ํ์ผ์์คํ์ ๋ณ๋ ์ฒ๋ฆฌ ํ์

  
	```cs
	[admin@localhost ~]$ sudo xfs_growfs /mnt/lvm2

	meta-data=/dev/mapper/lee-lee.lv isize=512 agcount=4, agsize=64000 blks= sectsz=512 attr=2, 
	projid32bit=1 = crc=1 finobt=0 spinodes=0 data = bsize=4096 blocks=256000, imaxpct=25= sunit=0 
	swidth=0 blks naming =version 2 bsize=4096 ascii-ci=0 ftype=1 log =internal bsize=4096 blocks=855,
	version=2 = sectsz=512 sunit=0 blks, lazy-count=1 realtime =none extsz=4096 blocks=0, rtextents=0

	data blocks changed from 256000 to 518144
	```

<br/>

* (ext4) lee.lv 1G ํ์ฅํ๊ธฐ 

	```cs
	# LV ํ์ฅ์ ๊ฒฝ์ฐ ์์ ์์๊ณผ ๋์ผํจ
	resize2fs /dev/lee/lee.vg

	df -h ํ์ผ์์คํ ํ์ฅ ํ์ธ
	```

```toc
```

  



 

