---
emoji: π€¦ββοΈ
title: "[LINUX] - This-Provisioning"
date: "2021-06-23 00:01:15"
author: nasa1515
tags: LINUX
categories: LINUX
---


λ¨Έλ¦¬λ§  

Thin provisioningμ κ²½νν΄λ³Έ μ λ λ€μ΄λ³Έ μ λ νλ²λ μλ κΈ°μ μλλ€.  
μ΄λμ μΈκΉ? μκ°ν΄λ³΄λ©΄ λ©μΌμ΄λ, ν΄λΌμ°λλ₯Ό μ κ³΅νλ νμ¬λ€μμ λ§μ΄ μΈ κ² κ°μ λλμλλ€.

----
	
## β Thin provisioningμ΄λ?

Thin provisioning μ΄λ μ½κ² μκΈ°νλ©΄ μ¬μ©ν λ§νΌλ§μ μ©λμ ν λΉνλ λ°©μμλλ€.  
10Gλ₯Ό ν λΉ λ°μμ§λ§ 3Gμ κ³΅κ°λ§μ μ¬μ©νλ€λ©΄ μ€μ  μ¬μ©λΆλ§νΌμ μ©λμ μ κ³΅νλ λ°©μμλλ€.  
μ©λμ λ μ¬μ©νλ€λ©΄ μ©λμ νλ³΄ν΄μ£Όκ³  μ€μΌ κ²½μ° μ¬μ©νλ κ³΅κ°μ νμν΄ κ°λ λ°©μμΌλ‘.  
μμ¬ μμμ μ΅λν μ΅μ  ν  μ μκ² λ©λλ€.  

<br/>


* κ·Έλ¦Όμ λ³΄λ©΄ μ΄ν΄κ° μ½μ΅λλ€!!  
![μ€ν¬λ¦°μ·, 2020-08-13 18-30-30](https://user-images.githubusercontent.com/69498804/90118378-1cb86900-dd93-11ea-93f4-09740a93bd5e.png)

<br/>

### Thin provisioning μ μ₯μ 

1. μ¬μ©λμ§ μλ λ§μ μμ μ€ν λ¦¬μ§λ₯Ό μ μ½ν  μ μμ΅λλ€.  
2. νμ μ€ν λ¦¬μ§ μ©λμ΄ μ€μ΄λ€κ² λλ―λ‘ μ§μ  μλ³Έ λΉμ©(capex)μ΄ μ κ°.  
3. λ°μ΄ν° μΌν°μμ μ€ν λ¦¬μ§ μ΄μ λΉμ©(opex)μ΄ μ κ°λ©λλ€.  
4.  λ¨μΌ μ¬μ  μ€ν λ¦¬μ§ νμ κ΄λ¦¬ν  μ μκΈ° λλ¬Έμ μ©λ κ³νμ΄ λ¨μνλ€. μ¬λ¬ μ¬μ©μκ° λμΌν μ¬μ  κ³΅κ° νμμ μ€ν λ¦¬μ§λ₯Ό ν λΉνλ―λ‘ μΌλΆ λ³Όλ₯¨μμλ μ©λμ΄ μ νλκ±°λ μ©λμ΄ λ¨λ μν©μ΄ λ°μνμ§ μμ΅λλ€    
5. μ€ν λ¦¬μ§ νκ²½μ΄ λμ± λ―Όμ²©ν΄μ§λ©° λ³νμ λ μ½κ² λμν  μ μκ² λ©λλ€.
  
  
<br/>  

---

## β κ΅¬μ±λ°©λ²

κ΅¬μ±μ κ²½μ° OS μ€μΉμ GUIλ₯Ό μ¬μ©νλ©΄ λ§€μ° μ½κ² κ΅¬μΆμ΄ κ°λ₯νλ μ΄λ² ν¬μ€νΈμμλ λͺλ Ήμ΄λ₯Ό μ΄μ©ν΄μ κ΅¬μ± ν΄λ³΄μμ΅λλ€.  

<br/>

### κ΅¬μΆ μμ  

  1. λ¬Όλ¦¬ λ³Όλ₯¨ μμ±  
  2. λ³Όλ₯¨ κ·Έλ£Ή μμ± μ¬ ν/thin pool  
  3. λΌλ¦¬ λ³Όλ₯¨ μμ±/μ¬νλ‘λΉμ λ    

<br/>

[μ΄μ  LVM ν¬μ€νΈλ‘ PV, VG κ΅¬μ± λ°©λ²μ μ€λͺνμκΈ°μ μ΄λ² ν¬μ€νΈλ μ¬νλΆν° μ€λͺ]  
λ―Έλ¦¬ μ€μ ν΄λμ wonseok VGλ‘ μ§ννκ² μ΅λλ€.
	
```cs
[root@centos ~]$  vgs
VG      #PV #LV #SN Attr   VSize   VFree 
centos    1   2   0 wz--n- <19.00g     0 
lee       6   1   0 wz--n- <47.98g <7.98g
wonseok   2   0   0 wz--n-  19.99g 19.99g
```

<br/>

* ### μ¬ ν/thin pool μμ±
		        
	
	  λͺλ Ήμ΄ : ``lvcreate -T -L 15G wonseok/thinpool`` (μ¬ ν μμ±) νλ‘λΉμ λμ μν μμ­μ€μ 

	  [μ΅μ] -T μ¬νλ‘λΉμ λ νν, -L μ¬μ΄μ¦

	```cs
	[root@centos ~]$  lvcreate -T -L 15G wonseok/thinpool 
	Thin pool volume with chunk size 64.00 KiB can address at most 15.81 TiB of data.
	Logical volume "thinpool" created.
	```

	<br/>

	thinpool LV νμΈ
	  
	```cs
	[root@centos ~]$  lvs
	LV       VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
	root     centos  -wi-ao---- <17.00g                                                    
	swap     centos  -wi-ao----   2.00g                                                    
	lee.lv   lee     -wi-ao----  40.00g                                                    
	thinpool wonseok twi-a-tz--  15.00g             0.00   10.57 
	```

	<br/>

* ### Thin provisioning LV μ€μ 
	
	  λͺλ Ήμ΄ : ``lvcreate -T -V 1T -n won_thin wonseok/thinpool``
	  μ¬ν wonseok/thinpoolμμ 1T μ¬μ΄μ¦λ‘(-T : thin,-V : κ°μ μ¬μ΄μ¦ ) lvm μμ±(μ΄λ¦ lv_thin)

	  [μ΅μ] -T μ¬νλ‘λΉμ λ, -V μ¬μ΄μ¦, κ°μμΌλ‘ ν° μ¬μ΄μ¦ μ§μ , -n μ΄λ¦, μμ±ν  λΌλ¦¬λ³Όλ₯¨ μ΄λ¦ μ§μ 

	```cs
	[root@centos ~]$  lvcreate -T -V 1T -n won_thin wonseok/thinpool
	WARNING: Sum of all thin volume sizes (1.00 TiB) exceeds the size of thin pool wonseok/thinpool and the size of whole volume group (19.99 GiB).
	WARNING: You have not turned on protection against thin pools running out of space.
	WARNING: Set activation/thin_pool_autoextend_threshold below 100 to trigger automatic extension of thin pools before they get full.
	Logical volume "won_thin" created.
	```

<br/>

* ### won_thin LV μμ± λ° μ©λ νμΈ

	```cs
	[root@centos ~]$  lvs
	LV       VG      Attr       LSize   Pool     Origin Data%  Meta%  Move Log Cpy%Sync Convert
	root     centos  -wi-ao---- <17.00g                                                        
	swap     centos  -wi-ao----   2.00g                                                        
	lee.lv   lee     -wi-ao----  40.00g                                                        
	thinpool wonseok twi-aotz--  15.00g                 0.00   10.60                           
	won_thin wonseok Vwi-a-tz--   1.00t thinpool        0.00                
	```

* ### fdisk -l λͺλ Ήμ΄λ‘ μ¬μ©κ°λ₯ μμ­ νμΈ

	```cs
	[root@centos ~]$  fdisk -l /dev/mapper/wonseok-won_thi	
	Disk /dev/mapper/wonseok-won_thin: 1099.5 GB, 1099511627776 bytes, 2147483648 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 65536 bytes / 65536 bytes
	```

```toc
```
  

  



 

