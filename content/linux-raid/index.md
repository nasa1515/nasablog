---
emoji: π€¦ββοΈ
title: "[LINUX] - RAID"
date: "2021-06-23 00:01:05"
author: nasa1515
tags: LINUX
categories: LINUX
---


## β RAIDλ?

 RAIDλ Redundant Array of Inexpensive Disksμ μ½μμλλ€.  
 μ¬λ¬ κ°μ λμ€ν¬λ₯Ό λ°°μ΄ν΄ μλμ μ¦λ, μμ μ±μ μ¦λ, ν¨μ¨μ±, κ°μ©μ±μ μ¦λλ₯Ό  νλλ° μ°μ΄λ ``κΈ°μ ``  
 μ¦ μ½κ² λ§ν΄ ``μ¬λ¬ κ°μ νλλμ€ν¬λ₯Ό νλμ νλλμ€ν¬μ²λΌ μ¬μ©νλ λ°©μ``μλλ€.  

<br/>


* RAIDμ μ¬μ© λͺ©μ     
μλ² μ΄μμ μμ΄ κ°μ₯ ν¬λ¦¬ν°μ»¬ μ΄μλ νλλμ€ν¬μ μ₯μ λ‘ μΈν DATA μμ€μΌ κ² μλλ€.  
νλλμ€ν¬λ μ¬μ€μ μλͺ¨νμΌλ‘ λΆλ₯λλ©° I/Oκ° λ§μ μλ²μλ κ³ μ₯μ΄ μ¦μ κ²μ λΉμ°νμ£ .  
νμ§λ§ μλ²μ μ μ₯λλ λ°μ΄ν°μ κ²½μ° μμ€ λλ μ μΆ λμμ λ μΉλͺμ μΈ κ²μ΄ λλΆλΆμΌ κ²μΌλ‘  
λνμ μΌλ‘ μνκ³Ό κ°μ κΈμ΅, κ΅°μ¬μ  λͺ©μ μ λ°μ΄ν°κ° μμ κ²μλλ€.  
μ΄λ‘ μΈν΄ λ°±μμ΄ μ λμ μΌλ‘ νμν κ²½μ°κ° μκ³  λν μ¬λΆμ λμ€ν¬κ° μμ΄ μ©λμ μ¦μ€νλ €κ³  ν  λ   
λ°μ΄ν° μμ€ μμ΄ μ¦μ€μ΄ νμν κ²½μ°κ° μμ΅λλ€. κ·Έλμ RAID κ΅¬μ±μ ν΅ν΄ νλλμ€ν¬μ κ°μ©μ±μ λμ΄κ±°λ μλ² λ°μ΄ν°μ μμ μ±μ νλ³΄ν΄μΌ ν©λλ€.

<br/>


* RAID μ μ₯μ    

	* μ΄μ© κ°μ©μ±, λ°μ΄ν° μμ μ± μ¦λ
	* λμ€ν¬ μ©λ μ¦μ€μ μ©μ΄μ±
	* λμ€ν¬ I/O μ±λ₯ ν₯μ

---

## β RAIDμ μ’λ₯μ νΉμ§  

### 1. RAID 0

RAID 0 μλ ``Concatenate`` λ°©μκ³Ό ``Stripe`` λ°©μ λκ°μ§ λ°©μμ΄ μμ΅λλ€.  
  


μ΅μ νμν νλλμ€ν¬ κ°μ : 2κ° μ΄μ 

* λ°©μ.1) Concatenate λ°©μ (λκ° μ΄μμ λμ€ν¬μ λ°μ΄ν°λ₯Ό μμ°¨μ μΌλ‘ μ°λ λ°©λ²)

 
	![](https://t1.daumcdn.net/cfile/tistory/99AB91495A36096E02)



	μ₯μ  : λμ€ν¬ κΈ°λ³Έ κ³΅κ°μ΄ λΆμ‘±ν  λ λ°μ΄ν°λ λ³΄μ‘΄νλ©°  
	μ¬λΆμ λμ€ν¬λ₯Ό λ³Όλ₯¨μ ν¬ν¨νμ¬ μ©λ μ¦μ€μ΄ κ°λ₯νκ² λ©λλ€.

	λ¨μ  : RAID 0μ νΉμ±μ λμ€ν¬ μ€ νλμ λμ€ν¬λΌλ μ₯μ κ° λ°μνλ©΄ λ³΅κ΅¬κ° μ΄λ ΅κ³   
	ν¨λ¦¬ν°(μ€λ₯κ²μΆκΈ°λ₯)λ₯Ό μ§μνμ§ μμ΅λλ€.

	μ©λ : λͺ¨λ  λμ€ν¬μ μ©λμ ν©μΉ μ©λ (300GB disk * 2ea = 600GB)
 
 <br/> 



* λ°©μ.2) Stripe λ°©μ (νν RAID 0λΌκ³  νλ©΄ Stripe λ°©μμ λ§ν©λλ€)  
λκ° μ΄μμ λμ€ν¬μ λ°μ΄ν°λ₯Ό λλ€νκ² μ°λ λ°©λ²μλλ€.

	![](https://t1.daumcdn.net/cfile/tistory/995949475A3609B223)

  

    μ₯μ  : λ°μ΄ν°λ₯Ό μ¬μ©ν  λ I/Oλ₯Ό λμ€ν¬ μλ§νΌ λΆν νμ¬ μ°κΈ° λλ¬Έμ I/O μλκ° ν₯μλκ³   
	I/O Controllerλ I/O board λ± I/Oλ₯Ό λ΄λΉνλ μ₯μΉκ° λ³λλ‘ μ₯μ°©λ κ²½μ° λ ν° I/O μλ ν₯μ ν¨κ³Όλ₯Ό λ³Ό μ μμ΅λλ€.

    λ¨μ  : Stripeλ₯Ό κ΅¬μ±ν  μ κΈ°μ‘΄ λ°μ΄ν°λ λͺ¨λ μ­μ  λμ΄μΌ ν©λλ€. κ·ΈμΈμ λ¨μ μ μμ Concat λ°©μκ³Ό κ°μ΅λλ€.

    μ©λ : μμ Concat λ°©μκ³Ό κ°μ΅λλ€.

  
---


### 2. RAID 1(Mirror)  

Mirror λ³Όλ₯¨ λ΄μ ν¨λ¦¬ν°λ₯Ό μ¬μ©νμ§ μκ³   
λμ€ν¬μ κ°μ λ°μ΄ν°λ₯Ό μ€λ³΅ κΈ°λ‘νμ¬ λ°μ΄ν°λ₯Ό λ³΄μ‘΄ν©λλ€.  

μ΅μ νμν νλλμ€ν¬ κ°μ : 2κ° μ΄μβ
  

![](https://t1.daumcdn.net/cfile/tistory/99557F3E5A360AAE2E)

μ₯μ  : λ³Όλ₯¨ λ΄ λμ€ν¬ μ€ νλμ λμ€ν¬λ§ μ μμ΄μ΄λ  
λ°μ΄ν°λ λ³΄μ‘΄λμ΄ μ΄μμ΄ κ°λ₯νκΈ° λλ¬Έμ κ°μ©μ±μ΄ λκ³ , λ³΅μμ΄ λΉκ΅μ  λ§€μ° κ°λ¨ν©λλ€.

λ¨μ  : μ©λμ΄ μ λ°μΌλ‘ μ€κ³ , μ°κΈ° μλκ° μ‘°κΈ λλ €μ§λλ€.

μ©λ : λͺ¨λ  λμ€ν¬μ μ λ°μ μ©λ (300GB x 2ea = 300GB)

---

### 3. RAID 5  

RAID 5λ RAID 3,4μμ λ³λμ ν¨λ¦¬ν° μ λ³΄ λμ€ν¬λ₯Ό μ¬μ©ν¨μΌλ‘μ¨ λ°μνλ λ¬Έμ μ μ 	λ³΄μνλ λ°©μμΌλ‘  
ν¨λ¦¬ν° μ λ³΄λ₯Ό stripeλ‘ κ΅¬μ±λ λμ€ν¬ λ΄μμ μ²λ¦¬νκ² λ§λ€μμ΅λλ€.   
λ§μ½ 1κ°μ νλκ° κ³ μ₯λλλΌλ λ¨μ νλλ€μ ν΅ν΄ λ°μ΄ν°λ₯Ό λ³΅κ΅¬ν  μ μλ€λ 	μ₯μ μ΄ μμ΅λλ€. 
 
μ΅μ νμν νλλμ€ν¬ κ°μ : 3κ° μ΄μ
  

![](https://t1.daumcdn.net/cfile/tistory/9948F8355A360D9735)

μ©λ : λ§μ½ νλλμ€ν¬ 1G x 3 μ΄ 3κ°μ νλλμ€ν¬κ° μμΌλ©΄ `Total 2G`λ₯Ό μ¬μ©ν  μ μλ€.  
``νλλμ€ν¬ κ°μ N-1``λ§νΌμ κ³΅κ°μ μ¬μ©ν  μ μλ€. - 1κ°μ ν¨λ¦¬ν°λ₯Ό μ¬μ©ν΄μ)

``RAID 5``λ λκ° 5κ° μ΄μμ νλλμ€ν¬λ‘ κ΅¬μ±νλ€.  
λν νλλμ€ν¬ 1κ°κ° κ³ μ₯λλ©΄ ν¨λ¦¬ν°λ₯Ό μ΄μ©νμ¬ λ°μ΄ν°λ₯Ό λ³΅κ΅¬ν  μ μλ€.  (κ²°ν¨ νμ©μ μ κ³΅νλ€.)

νμ§λ§ νλλμ€ν¬κ° 2κ° μ΄μ κ³ μ₯λλ©΄ λ°μ΄ν°κ° μμλλ€.
  
---
  

### 4. RAID 6  

RAID 6μ RAID 5μ κ°μ κ°λμ΄μ§λ§ λ€λ₯Έ λλΌμ΄λΈλ€ κ°μ λΆν¬λμ΄ μλ 2μ°¨ ν¨λ¦¬ν° 	μ λ³΄λ₯Ό λ£μ΄  
2κ°μ νλμ λ¬Έμ κ° μκ²¨λ λ³΅κ΅¬ν  μ μκ² μ€κ³ λμμ΅λλ€. RAID 5λ³΄λ€ λμ± λ°μ΄ν°μ μμ μ±μ κ³ λ €νλ μμ€νμμ μ¬μ©λ©λλ€. 

μ΅μ νμν νλλμ€ν¬ κ°μ : 4κ° μ΄μ
  

![](https://t1.daumcdn.net/cfile/tistory/9910E23B5A360DE80E)

μ©λ : λ§μ½ νλλμ€ν¬ 1G x 4 μ΄ 4κ°μ νλλμ€ν¬κ° μμΌλ©΄  Total 2Gλ₯Ό μ¬μ©ν  μ μλ€.  
(``νλλμ€ν¬ κ°μ N-2``λ§νΌμ κ³΅κ°μ μ¬μ©ν  μ μλ€. - ``2κ°μ ν¨λ¦¬ν°``λ₯Ό μ¬μ©ν΄μ)  
νλλμ€ν¬ 2κ°κ° κ³ μ₯λλ ν¨λ¦¬ν°λ₯Ό μ΄μ©νμ¬ λ°μ΄ν°λ₯Ό λ³΅κ΅¬ν  μ μλ€. (κ²°ν¨ νμ©μ μ κ³΅νλ€.)


---

### 5. RAID 1+0  

RAID1μ κ΅¬μ±ν Diskκ° μμͺ½μ 1κ°μ© κ³ μ₯λλ λ°μ΄ν°λ λ³΄μ‘΄ν©λλ€. (RAID1)  
κ΅¬μ±ν RAID 1μ μ€νΈλΌμ΄ν λ°©μμΌλ‘ λ°μ΄ν°λ₯Ό μ¬μ©(RAID0)νμ¬ λμ μ±λ₯μ 	μ κ³΅ν©λλ€.  

μ΅μ 4κ°μ Diskλ₯Ό νμλ‘ νλ©°, μ μ²΄ μ©λμ 50%λ§ μ¬μ©μ΄ κ°λ₯ν©λλ€.

<br/>

RAID+Spare  

- λμ€ν¬μ κ³ μ₯μ΄ λ°μν  κ²½μ° λ°μ΄ν°λ₯Ό λ°λ‘ λκΈ°νν  μ μλ "ν« μ€νμ΄" κΈ°λ₯μ ν΅ν΄    
λ³Όλ₯¨μ νλ λμ€ν¬μ κ³ μ₯μ΄ λ°μνλ©΄ λ°μ΄ν°κ° μλΉ λμ€ν¬μ λκΈ°ννλ€.  

- μλΉ λμ€ν¬κ° μλ RAID κ΅¬μ± λμ²΄ λμ€ν¬ μΆκ°λ₯Ό κΈ°λ€λ¦΄ νμκ° μλ€

	![](https://t1.daumcdn.net/cfile/tistory/262AEE43590051A81C)
  
<br/>

----
  
## π RAID κ΅¬μΆνκΈ°

* κΈ°λ³Έ μ€μ 

	1. νλλμ€ν¬ 2κ°λ₯Ό μΆκ° νλ€.  
	2. fdisk or parted λͺλ Ήμ΄λ‘ νν°μμ μμ±νλ€.
	3. LV,VG κ΅¬μ±
	

<br/>

### β1. RAID 0 κ΅¬μΆνκΈ°

```cs
#wonseok μ΄λΌλ VGλ₯Ό μ¬μ©ν΄ μ€μ 
[root@centos ~]$  vgs
  VG      #PV #LV #SN Attr   VSize   VFree 
  centos    1   2   0 wz--n- <19.00g     0 
  lee       6   1   0 wz--n- <47.98g <7.98g
  wonseok   4   0   0 wz--n-  39.98g 39.98g
```

<br/>

λͺλ Ήμ΄ : lvcreate -n won_stripe -L 6G -i 2 wonseok

```cs
[μ΅μ] -i : μ€νΈλΌμ΄ν λμ€ν¬ κ°―μ
 
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

RAID 0 μ€μ  νμΈ

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

### 2. βRAID 1 κ΅¬μΆνκΈ°
	
```cs
#wonseok μ΄λΌλ VGλ₯Ό μ¬μ©ν΄ μ€μ 
[root@centos ~]$  vgs
  VG      #PV #LV #SN Attr   VSize   VFree 
  centos    1   2   0 wz--n- <19.00g     0 
  lee       6   1   0 wz--n- <47.98g <7.98g
  wonseok   4   0   0 wz--n-  39.98g 39.98g
```

<br/>

λͺλ Ήμ΄ : lvcreate -n won_mirror -L 1G -m 2 wonseok

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

RAID 1 μ€μ  νμΈ

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

### 3. βRAID 5 κ΅¬μΆνκΈ°

```cs
#wonseok μ΄λΌλ VGλ₯Ό μ¬μ©ν΄ μ€μ 
[root@centos ~]$  vgs
  VG      #PV #LV #SN Attr   VSize   VFree 
  centos    1   2   0 wz--n- <19.00g     0 
  lee       6   1   0 wz--n- <47.98g <7.98g
  wonseok   4   0   0 wz--n-  39.98g 39.98g
```

<br/>

λͺλ Ήμ΄ : lvcreate --type raid5 -n won_raid5 -L 1G -i 2 wonseok
	
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

RAID 5 μ€μ  νμΈ
	
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

### 4. βRAID 6 κ΅¬μΆνκΈ°
	
```cs
#wonseok μ΄λΌλ VGλ₯Ό μ¬μ©ν΄ μ€μ 
[root@centos ~]$  vgs
  VG      #PV #LV #SN Attr   VSize   VFree  
  centos    1   2   0 wz--n- <19.00g      0 
  wonseok   6   0   0 wz--n- <47.98g <47.98g
```

<br/>

λͺλ Ήμ΄ : lvcreate --type raid6 -n won_raid6 -L 4G -i 4 wonseok

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

RAID 6 μ€μ  νμΈ

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

### 4. βRAID 1+0 κ΅¬μΆνκΈ°
	
```cs
#wonseok μ΄λΌλ VGλ₯Ό μ¬μ©ν΄ μ€μ 
[root@centos ~]$  vgs
  VG      #PV #LV #SN Attr   VSize   VFree  
  centos    1   2   0 wz--n- <19.00g      0 
  wonseok   6   0   0 wz--n- <47.98g <47.98g
```

<br/>

λͺλ Ήμ΄ : lvcreate --type raid10 -i3 -m1 -L 3G -n won_raid10 wonseok
	
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

RAID 10 μ€μ  νμΈ
	
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