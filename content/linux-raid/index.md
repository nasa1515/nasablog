---
emoji: 🤦‍♂️
title: RAID [LINUX]
date: "2021-06-23 00:01:05"
author: nasa1515
tags: LINUX
categories: LINUX
---


## ✔ RAID란?

 RAID는 Redundant Array of Inexpensive Disks의 약자입니다.  
 여러 개의 디스크를 배열해 속도의 증대, 안정성의 증대, 효율성, 가용성의 증대를  하는데 쓰이는 ``기술``  
 즉 쉽게 말해 ``여러 개의 하드디스크를 하나의 하드디스크처럼 사용하는 방식``입니다.  

<br/>


* RAID의 사용 목적    
서버 운영에 있어 가장 크리티컬 이슈는 하드디스크의 장애로 인한 DATA 손실일 것 입니다.  
하드디스크는 사실상 소모품으로 분류되며 I/O가 많은 서버에는 고장이 잦은 것은 당연하죠.  
하지만 서버에 저장되는 데이터의 경우 손실 또는 유출 되었을 때 치명적인 것이 대부분일 것으로  
대표적으로 은행과 같은 금융, 군사적 목적의 데이터가 있을 것입니다.  
이로 인해 백업이 절대적으로 필요한 경우가 있고 또한 여분의 디스크가 있어 용량을 증설하려고 할 때   
데이터 손실 없이 증설이 필요한 경우가 있습니다. 그래서 RAID 구성을 통해 하드디스크의 가용성을 높이거나 서버 데이터의 안정성을 확보해야 합니다.

<br/>


* RAID 의 장점   

	* 운용 가용성, 데이터 안정성 증대
	* 디스크 용량 증설의 용이성
	* 디스크 I/O 성능 향상

---

## ✌ RAID의 종류와 특징  

### 1. RAID 0

RAID 0 에는 ``Concatenate`` 방식과 ``Stripe`` 방식 두가지 방식이 있습니다.  
  


최소 필요한 하드디스크 개수 : 2개 이상 

* 방식.1) Concatenate 방식 (두개 이상의 디스크에 데이터를 순차적으로 쓰는 방법)

 
	![](https://t1.daumcdn.net/cfile/tistory/99AB91495A36096E02)



	장점 : 디스크 기본 공간이 부족할 때 데이터는 보존하며  
	여분의 디스크를 볼륨에 포함하여 용량 증설이 가능하게 됩니다.

	단점 : RAID 0의 특성상 디스크 중 하나의 디스크라도 장애가 발생하면 복구가 어렵고  
	패리티(오류검출기능)를 지원하지 않습니다.

	용량 : 모든 디스크의 용량을 합친 용량 (300GB disk * 2ea = 600GB)
 
 <br/> 



* 방식.2) Stripe 방식 (흔히 RAID 0라고 하면 Stripe 방식을 말합니다)  
두개 이상의 디스크에 데이터를 랜덤하게 쓰는 방법입니다.

	![](https://t1.daumcdn.net/cfile/tistory/995949475A3609B223)

  

    장점 : 데이터를 사용할 때 I/O를 디스크 수만큼 분할하여 쓰기 때문에 I/O 속도가 향상되고  
	I/O Controller나 I/O board 등 I/O를 담당하는 장치가 별도로 장착된 경우 더 큰 I/O 속도 향상 효과를 볼 수 있습니다.

    단점 : Stripe를 구성할 시 기존 데이터는 모두 삭제 되어야 합니다. 그외의 단점은 위의 Concat 방식과 같습니다.

    용량 : 위의 Concat 방식과 같습니다.

  
---


### 2. RAID 1(Mirror)  

Mirror 볼륨 내의 패리티를 사용하지 않고  
디스크에 같은 데이터를 중복 기록하여 데이터를 보존합니다.  

최소 필요한 하드디스크 개수 : 2개 이상​
  

![](https://t1.daumcdn.net/cfile/tistory/99557F3E5A360AAE2E)

장점 : 볼륨 내 디스크 중 하나의 디스크만 정상이어도  
데이터는 보존되어 운영이 가능하기 때문에 가용성이 높고, 복원이 비교적 매우 간단합니다.

단점 : 용량이 절반으로 줄고, 쓰기 속도가 조금 느려집니다.

용량 : 모든 디스크의 절반의 용량 (300GB x 2ea = 300GB)

---

### 3. RAID 5  

RAID 5는 RAID 3,4에서 별도의 패리티 정보 디스크를 사용함으로써 발생하는 문제점을 	보완하는 방식으로  
패리티 정보를 stripe로 구성된 디스크 내에서 처리하게 만들었습니다.   
만약 1개의 하드가 고장나더라도 남은 하드들을 통해 데이터를 복구할 수 있다는 	장점이 있습니다. 
 
최소 필요한 하드디스크 개수 : 3개 이상
  

![](https://t1.daumcdn.net/cfile/tistory/9948F8355A360D9735)

용량 : 만약 하드디스크 1G x 3 총 3개의 하드디스크가 있으면 `Total 2G`를 사용할 수 있다.  
``하드디스크 개수 N-1``만큼의 공간을 사용할 수 있다. - 1개의 패리티를 사용해서)

``RAID 5``는 대개 5개 이상의 하드디스크로 구성한다.  
또한 하드디스크 1개가 고장나면 패리티를 이용하여 데이터를 복구할 수 있다.  (결함 허용을 제공한다.)

하지만 하드디스크가 2개 이상 고장나면 데이터가 손상된다.
  
---
  

### 4. RAID 6  

RAID 6은 RAID 5와 같은 개념이지만 다른 드라이브들 간에 분포되어 있는 2차 패리티 	정보를 넣어  
2개의 하드에 문제가 생겨도 복구할 수 있게 설계 되었습니다. RAID 5보다 더욱 데이터의 안전성을 고려하는 시스템에서 사용됩니다. 

최소 필요한 하드디스크 개수 : 4개 이상
  

![](https://t1.daumcdn.net/cfile/tistory/9910E23B5A360DE80E)

용량 : 만약 하드디스크 1G x 4 총 4개의 하드디스크가 있으면  Total 2G를 사용할 수 있다.  
(``하드디스크 개수 N-2``만큼의 공간을 사용할 수 있다. - ``2개의 패리티``를 사용해서)  
하드디스크 2개가 고장나도 패리티를 이용하여 데이터를 복구할 수 있다. (결함 허용을 제공한다.)


---

### 5. RAID 1+0  

RAID1을 구성한 Disk가 양쪽에 1개씩 고장나도 데이터는 보존합니다. (RAID1)  
구성한 RAID 1을 스트라이핑 방식으로 데이터를 사용(RAID0)하여 높은 성능을 	제공합니다.  

최소 4개의 Disk를 필요로 하며, 전체 용량의 50%만 사용이 가능합니다.

<br/>

RAID+Spare  

- 디스크에 고장이 발생할 경우 데이터를 바로 동기화할 수 있는 "핫 스페어" 기능을 통해    
볼륨의 하드 디스크에 고장이 발생하면 데이터가 예비 디스크와 동기화한다.  

- 예비 디스크가 있는 RAID 구성 대체 디스크 추가를 기다릴 필요가 없다

	![](https://t1.daumcdn.net/cfile/tistory/262AEE43590051A81C)
  
<br/>

----
  
## 👍 RAID 구축하기

* 기본 설정

	1. 하드디스크 2개를 추가 한다.  
	2. fdisk or parted 명령어로 파티션을 생성한다.
	3. LV,VG 구성
	

<br/>

### ​1. RAID 0 구축하기

```cs
#wonseok 이라는 VG를 사용해 설정
[root@centos ~]$  vgs
  VG      #PV #LV #SN Attr   VSize   VFree 
  centos    1   2   0 wz--n- <19.00g     0 
  lee       6   1   0 wz--n- <47.98g <7.98g
  wonseok   4   0   0 wz--n-  39.98g 39.98g
```

<br/>

명령어 : lvcreate -n won_stripe -L 6G -i 2 wonseok

```cs
[옵션] -i : 스트라이프 디스크 갯수
 
[root@centos home]$  lvcreate -n won_stripe -L 6G -i 2 wonseok
  Using default stripesize 64.00 KiB.
  Logical volume "won_stripe" created.
[root@centos home]$  
[root@centos home]$  lvs
  LV         VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  root       centos  -wi-ao---- <17.00g                                                    
  swap       centos  -wi-ao----   2.00g                                                    
  lee.lv     lee     -wi-ao----  40.00g                                                    
  won_stripe wonseok -wi-a-----   6.00g 
  
```


<br/>

RAID 0 설정 확인

```cs
[root@centos ~]$  lvdisplay  -m /dev/wonseok/won_stripe 
  --- Logical volume ---
  LV Path                /dev/wonseok/won_stripe
  LV Name                won_stripe
  VG Name                wonseok
  LV UUID                m59Vi4-AnPT-GAAV-18AN-BK9T-JlHH-1Xtz5u
  LV Write Access        read/write
  LV Creation host, time centos, 2020-07-08 16:39:55 +0900
  LV Status              available
  # open                 0
  LV Size                6.00 GiB
  Current LE             1536
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     512
  Block device           253:2

  --- Segments ---
  Logical extents 0 to 1535:
Type		striped
Stripes		2
Stripe size		64.00 KiB
Stripe 0:
  Physical volume	/dev/sdb1
  Physical extents	0 to 767
Stripe 1:
  Physical volume	/dev/sdc1
  Physical extents	0 to 767
 ```


----

<br/>

### 2. ​RAID 1 구축하기
	
```cs
#wonseok 이라는 VG를 사용해 설정
[root@centos ~]$  vgs
  VG      #PV #LV #SN Attr   VSize   VFree 
  centos    1   2   0 wz--n- <19.00g     0 
  lee       6   1   0 wz--n- <47.98g <7.98g
  wonseok   4   0   0 wz--n-  39.98g 39.98g
```

<br/>

명령어 : lvcreate -n won_mirror -L 1G -m 2 wonseok

```cs
[root@centos home]$  lvcreate -n won_mirror -L 1G -m 2 wonseok
  Logical volume "won_mirror" created.
  
[root@centos home]$  lvs
  LV         VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  root       centos  -wi-ao---- <17.00g                                                    
  swap       centos  -wi-ao----   2.00g                                                    
  lee.lv     lee     -wi-ao----  40.00g                                                    
  won_mirror wonseok rwi-a-r---   1.00g                                    25.02
```

<br/>

RAID 1 설정 확인

```cs
[root@centos ~]$  lvdisplay -m /dev/wonseok/won_mirror 
  --- Logical volume ---
  LV Path                /dev/wonseok/won_mirror
  LV Name                won_mirror
  VG Name                wonseok
  LV UUID                0OUcsy-FtvN-KP6R-ZqqM-Bl1d-yRFE-Nm16b4
  LV Write Access        read/write
  LV Creation host, time centos, 2020-07-08 16:38:31 +0900
  LV Status              available
  # open                 0
  LV Size                1.00 GiB
  Current LE             256
  Mirrored volumes       3
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:8

  --- Segments ---
  Logical extents 0 to 255:
Type		raid1
Monitoring		monitored
Raid Data LV 0
  Logical volume	won_mirror_rimage_0
  Logical extents	0 to 255
Raid Data LV 1
  Logical volume	won_mirror_rimage_1
  Logical extents	0 to 255
Raid Data LV 2
  Logical volume	won_mirror_rimage_2
  Logical extents	0 to 255
Raid Metadata LV 0	won_mirror_rmeta_0
Raid Metadata LV 1	won_mirror_rmeta_1
Raid Metadata LV 2	won_mirror_rmeta_2
```

----

<br/>

### 3. ​RAID 5 구축하기

```cs
#wonseok 이라는 VG를 사용해 설정
[root@centos ~]$  vgs
  VG      #PV #LV #SN Attr   VSize   VFree 
  centos    1   2   0 wz--n- <19.00g     0 
  lee       6   1   0 wz--n- <47.98g <7.98g
  wonseok   4   0   0 wz--n-  39.98g 39.98g
```

<br/>

명령어 : lvcreate --type raid5 -n won_raid5 -L 1G -i 2 wonseok
	
```cs
[root@centos home]$  lvcreate --type raid5 -n won_raid5 -L 1G -i 2 wonseok
  Using default stripesize 64.00 KiB.
  Logical volume "won_raid5" created.
[root@centos home]$  
[root@centos ~]$  lvs
  LV        VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  root      centos  -wi-ao---- <17.00g                                                    
  swap      centos  -wi-ao----   2.00g                                                    
  won_raid5 wonseok rwi-a-r---   1.00g                                    37.50 
  won_raid5 wonseok rwi-a-r---   1.00g                                    25.00 
```

<br/>

RAID 5 설정 확인
	
```cs
[root@centos ~]$  lvdisplay -m /dev/wonseok/won_raid5 
  --- Logical volume ---
  LV Path                /dev/wonseok/won_raid5
  LV Name                won_raid5
  VG Name                wonseok
  LV UUID                VUqUEV-vtix-3Nze-GcDs-TfXd-SnoW-cuu3cH
  LV Write Access        read/write
  LV Creation host, time centos, 2020-07-08 16:36:46 +0900
  LV Status              available
  # open                 0
  LV Size                1.00 GiB
  Current LE             256
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     768
  Block device           253:8

  --- Segments ---
  Logical extents 0 to 255:
Type		raid5
Monitoring		monitored
Raid Data LV 0
  Logical volume	won_raid5_rimage_0
  Logical extents	0 to 127
Raid Data LV 1
  Logical volume	won_raid5_rimage_1
  Logical extents	0 to 127
Raid Data LV 2
  Logical volume	won_raid5_rimage_2
  Logical extents	0 to 127
Raid Metadata LV 0	won_raid5_rmeta_0
Raid Metadata LV 1	won_raid5_rmeta_1
Raid Metadata LV 2	won_raid5_rmeta_2
```

---

<br/>

### 4. ​RAID 6 구축하기
	
```cs
#wonseok 이라는 VG를 사용해 설정
[root@centos ~]$  vgs
  VG      #PV #LV #SN Attr   VSize   VFree  
  centos    1   2   0 wz--n- <19.00g      0 
  wonseok   6   0   0 wz--n- <47.98g <47.98g
```

<br/>

명령어 : lvcreate --type raid6 -n won_raid6 -L 4G -i 4 wonseok

```cs
[root@centos ~]$  lvcreate --type raid6 -i 4 -L 4G -n won_raid6 wonseok
  Using default stripesize 64.00 KiB.
  Logical volume "won_raid6" created.
[root@centos ~]$  
[root@centos ~]$  
[root@centos ~]$  lvs
  LV        VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  root      centos  -wi-ao---- <17.00g                                                    
  swap      centos  -wi-ao----   2.00g                                                    
  won_raid6 wonseok rwi-a-r---   4.00g                                    6.25   
```

<br/>

RAID 6 설정 확인

```cs
[root@centos ~]$  lvdisplay -m /dev/wonseok/won_raid6 
  --- Logical volume ---
  LV Path                /dev/wonseok/won_raid6
  LV Name                won_raid6
  VG Name                wonseok
  LV UUID                xeOz4d-2LFO-Q1gH-WQQN-bw6D-lban-WWgEMe
  LV Write Access        read/write
  LV Creation host, time centos, 2020-07-08 16:34:29 +0900
  LV Status              available
  # open                 0
  LV Size                4.00 GiB
  Current LE             1024
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     1536
  Block device           253:14

  --- Segments ---
  Logical extents 0 to 1023:
    Type		raid6
Monitoring		monitored
Raid Data LV 0
  Logical volume	won_raid6_rimage_0
  Logical extents	0 to 255
Raid Data LV 1
  Logical volume	won_raid6_rimage_1
  Logical extents	0 to 255
Raid Data LV 2
  Logical volume	won_raid6_rimage_2
  Logical extents	0 to 255
Raid Data LV 3
  Logical volume	won_raid6_rimage_3
  Logical extents	0 to 255
Raid Data LV 4
  Logical volume	won_raid6_rimage_4
  Logical extents	0 to 255
Raid Data LV 5
  Logical volume	won_raid6_rimage_5
  Logical extents	0 to 255
Raid Metadata LV 0	won_raid6_rmeta_0
Raid Metadata LV 1	won_raid6_rmeta_1
Raid Metadata LV 2	won_raid6_rmeta_2
Raid Metadata LV 3	won_raid6_rmeta_3
Raid Metadata LV 4	won_raid6_rmeta_4
Raid Metadata LV 5	won_raid6_rmeta_5
```

---

<br/>

### 4. ​RAID 1+0 구축하기
	
```cs
#wonseok 이라는 VG를 사용해 설정
[root@centos ~]$  vgs
  VG      #PV #LV #SN Attr   VSize   VFree  
  centos    1   2   0 wz--n- <19.00g      0 
  wonseok   6   0   0 wz--n- <47.98g <47.98g
```

<br/>

명령어 : lvcreate --type raid10 -i3 -m1 -L 3G -n won_raid10 wonseok
	
```cs
[root@centos ~]$  lvcreate --type raid10 -i3 -m1 -L 3G -n won_raid10 wonseok
  Using default stripesize 64.00 KiB.
  Logical volume "won_raid10" created.
[root@centos ~]$  
[root@centos ~]$  
[root@centos ~]$  lvs
LV         VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
root       centos  -wi-ao---- <17.00g                                                    
swap       centos  -wi-ao----   2.00g                                                    
won_raid10 wonseok rwi-a-r---   3.00g                                    6.25            
```

<br/>

RAID 10 설정 확인
	
```cs
[root@centos ~]$  lvdisplay -m /dev/wonseok/won_raid10 
  --- Logical volume ---
  LV Path                /dev/wonseok/won_raid10
  LV Name                won_raid10
  VG Name                wonseok
  LV UUID                WfOkSA-CgUC-sGNS-tn14-GYcE-coNK-V3No15
  LV Write Access        read/write
  LV Creation host, time centos, 2020-07-08 16:42:04 +0900
  LV Status              available
  # open                 0
  LV Size                3.00 GiB
  Current LE             768
  Mirrored volumes       6
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     1536
  Block device           253:14

  --- Segments ---
  Logical extents 0 to 767:
Type		raid10
Monitoring		monitored
Raid Data LV 0
  Logical volume	won_raid10_rimage_0
  Logical extents	0 to 767
Raid Data LV 1
  Logical volume	won_raid10_rimage_1
  Logical extents	0 to 767
Raid Data LV 2
  Logical volume	won_raid10_rimage_2
  Logical extents	0 to 767
Raid Data LV 3
  Logical volume	won_raid10_rimage_3
  Logical extents	0 to 767
Raid Data LV 4
  Logical volume	won_raid10_rimage_4
  Logical extents	0 to 767
Raid Data LV 5
  Logical volume	won_raid10_rimage_5
  Logical extents	0 to 767
Raid Metadata LV 0	won_raid10_rmeta_0
Raid Metadata LV 1	won_raid10_rmeta_1
Raid Metadata LV 2	won_raid10_rmeta_2
Raid Metadata LV 3	won_raid10_rmeta_3
Raid Metadata LV 4	won_raid10_rmeta_4
Raid Metadata LV 5	won_raid10_rmeta_5
```


```toc
```