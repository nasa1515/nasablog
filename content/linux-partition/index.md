---
emoji: π€¦ββοΈ
title: "[LINUX] - Partition"
date: "2021-06-23 00:00:51"
author: nasa1515
tags: LINUX
categories: LINUX
---

λ¨Έλ¦¬λ§  

μ΄λ² ν¬μ€νΈμμλ λ¦¬λμ€ νν°μμ λν΄μ ν¬μ€νΈνμ΅λλ€.  
μλ§ λ¦¬λμ€λΏλ§ μλλΌ λ€λ₯Έ μͺ½μΌλ‘λ μ μ©νκ² μ¬μ©ν  μ μλ μ§μμΌ κ²μλλ€.

---

## β λ¦¬λμ€ νν°μ
	
λ¦¬λμ€μμ μ¬μ©νλ νν°μμ μ’λ₯λ μΈ κ°μ§κ° μμ΅λλ€.

<br/>

* μ²«μ§Έ [Primary Partition] ``μ£Ό μμ­`` νν°μμ΄ μμ΅λλ€.
	

	- Maximum 4κ°κΉμ§ μμ± κ°λ₯ ν©λλ€. (μ¬μ©νλ μ©λμ λ§κ² 1κ°~4κ° κΉμ§ μ‘°μ ν΄μ μ¬μ©)

<br/>

* λμ§Έ [Extend Partition] ``νμ₯ μμ­`` νν°μμ΄ μμ΅λλ€.

	- Maximum 1κ°κΉμ§ λ§λ€ μ μμ΅λλ€. (μ΅λκ° 1κ°μ΄κΈ° λλ¬Έμ μ‘°μ ν΄μ μ¬μ©ν©λλ€.)

	<br/>
	
* μμ§Έ [Ligical Partition] ``λΌλ¦¬ μμ­`` νν°μμ΄ μμ΅λλ€.

	- Extend Patition μμ λ§λ€ μ μλ νν°μ. SCSI ν κ°, μ΄ 15κ°λ§ λμ§ μλ λ²μμμ μμ λ‘­κ² λ§λ€ μ μμ΅λλ€.  
	 κ·Έλ¬λ 12κ° μ΄μμ νν°μμ λ§λλ κ²μ μμ€νμ μ’μ§ μμ΅λλ€.
	

<br/>


---

## π νν°μ μμ±


### fdisk λͺλ Ήμ΄λ‘ νν°μ μ€μ 


* 1. fdisk -l ( λ¬Όλ¦¬μ μΌλ‘ μ₯μ°©λ λμ€ν¬ μ λ³΄ νμΈ )

	![](https://k.kakaocdn.net/dn/dzx1fC/btqve5Y0jEK/Ym8BGQ4C8enE6yYzkePl51/img.png)

<br/>

* 2. fdisk [λμ€ν¬ μ₯μΉλͺ] ( νν°μ μ€μ  λͺ¨λλ‘ μ§μν©λλ€. )

	![](https://k.kakaocdn.net/dn/B91Zs/btqvehexIkG/5ykfzKgx7hck6RVaKmKKr0/img.png)

<br/>

* 3. μ²« λ²μ§Έ Primary Partition 256MBλ₯Ό μμ±ν©λλ€.

	![](https://k.kakaocdn.net/dn/sAxvA/btqvhuKmkRj/mI7mIOggg8ATNpEQSCQEp1/img.png)

<br/>

* 4. λ λ²μ§Έ Primary partition 256MBλ₯Ό μμ±ν©λλ€.

	![](https://k.kakaocdn.net/dn/boicL6/btqvgFyCLUC/KIgFBjjDNgzj75TeMCPcP0/img.png)

<br/>

* 5. μΈ λ²μ§Έ Extend Partition 512MBλ₯Ό μμ±ν©λλ€.

	![](https://k.kakaocdn.net/dn/chdcZh/btqvgF6vaa5/PPSlKCzb9KGHZiol7nZl1k/img.png)



	<br/>

	pλ₯Ό λλ¬μ μΈ λ²μ§Έ νν°μλ νμΈν΄ μ€λλ€.  

	![](https://k.kakaocdn.net/dn/KtaKT/btqvb6dNF4C/EDU4NkiNRJznqDOMj9qPk1/img.png)

<br/>

* 6. λ€ λ²μ§Έ, λ€μ― λ²μ§Έ Logical Partition 256MB, 256MBμ μμ±ν©λλ€.

	![](https://k.kakaocdn.net/dn/nHHCO/btqvcfPdO3i/KDK9rXghMdlkHCepj93nIk/img.png)

<br/>

* 7. νμ¬κΉμ§ μ€μ ν νν°μ μ μ₯

	![](https://k.kakaocdn.net/dn/KAxKB/btqvf37E4R1/54BMjrJQr5TWMKgU4La47K/img.png)

<br/>

* 8. νμΌ μμ€ν μ€μ   

	λ¦¬λμ€ νκ²½μ μμ€νμ λ§κ² νμΌ μμ€ν μ€μ μ΄ νμν©λλ€. λ¦¬λμ€ νμΌ μμ€νμλ μ¬λ¬ κ°μ§κ° μμ§λ§  
	μ΅κ·Ό μ£Όλ‘ μ¬μ©νλ νμΌ μμ€νμΌλ‘ μ€μ μ ν΄λ³΄κ² μ΅λλ€.


	* 1. ``FAT32`` : μλμ°μ λ¦¬λμ€ λλ€ μμ©ν  μ μλ νμΌ μμ€ν    
			λμ©λ NTFS νμΌ μμ€ν μ΄νμ νκ²½μμ λμν  μ μλ μ ν μ¬ν­μ κ°κ³  μμ΅λλ€.  

	<br/>

	* 2. ``ext3`` : λ³΄μ λΆλΆμ΄ μ‘°κΈ ν₯μλ κΈ°λ³Έ νμΌ μμ€νμΌλ‘ μ λλ§ νμΌ μμ€ν κΈ°λ°  

	<br/>

	* 3. ``ext4`` : λν νμΌ μμ€νμ μ§ν₯νλ λͺ©μ μΌλ‘ κ°λ°λμμΌλ©° μ΅λ 1μμ¬ λ°μ΄νΈμ λ³Όλ₯¨κ³Ό 16TB νμΌμ μ§μν©λλ€.  
	ext3 λ¨μ μ λ§μ΄ λ³΄μν νμΌ μμ€νμΌλ‘ νμ¬κΉμ§ κ°λ° μ€μ μλ νμΌ μμ€νμλλ€.

<br/>


* ext4 μμ€νμΌλ‘ νμΌμμ€ν μ€μ 

    ``mkfs`` λͺλ Ήμ΄λ₯Ό μ¬μ©ν΄μ νμΌμμ€νμ λ³κ²½ ν  μ μμ΅λλ€.

    ![](https://k.kakaocdn.net/dn/zTAL0/btqveiq9XB2/TbA6hI64uZbB3dd7lz7lD0/img.png)


<br/>

---


### parted λͺλ Ήμ΄λ‘ νν°μ κ΅¬μ±  

``/dev/sdb 3TB`` λμ€ν¬λ₯Ό μ΄μ©νμ¬ μμμ μ§ννμ΅λλ€.


<br/>

* 1. νν°μ μ§μ  ``[parted λλ°μ΄μ€, mklebel]``

	 ``parted /dev/sdb`` νμμΌλ‘ μ€μ ν  λμ€ν¬λ₯Ό μ§μ  ν  μ μμ΅λλ€.
	

<br/>

* (parted) print all  
    νν°μμ μ§μ νλ©΄ ``(parted)`` μ€μ  λͺ¨λλ‘ μ μνκ² λ©λλ€.  
    μ€μ  λͺ¨λμμ ``print all`` μ μλ ₯νλ©΄ νμ¬ λμ€ν¬μ νν°μμ λν μ λ³΄λ₯Ό νμΈν  μ μμ΅λλ€.

    ```cs
    (parted) print all Error: /dev/sdb: unrecognised disk label Model: HP LOGICAL VOLUME (scsi)
    Disk /dev/sdb: 3001GB Sector size (logical/physical): 512B/512B Partition Table: unknown Disk
    Flags: Model: HP LOGICAL VOLUME (scsi) Disk /dev/sda: 300GB Sector size (logical/physical):
    512B/512B Partition Table: msdos Disk Flags: Number Start End Size Type File system Flags 1
    1049kB 1075MB 1074MB primary ext4 boot 2 1075MB 11.8GB 10.7GB primary linux-swap(v1)
    3 11.8GB 300GB 288GB primary ext4 Model: HP LOGICAL VOLUME (scsi) Disk /dev/sdc:
    73.4GB Sector size (logical/physical): 512B/512B Partition Table: msdos Disk Flags: Number
    Start End Size Type File system Flags 1 1049kB 73.4GB 73.4GB primary xf
	```

<br/>

* ``3001GB`` μ©λμΌλ‘ λ³΄μ΄λ ``/dev/sdb`` λμ€ν¬κ° μλ κ²μ νμΈ ν  μ μμ΅λλ€.
	
	```cs
	(parted) select /dev/sdb
	/dev/sdb λμ€ν¬μ μ€μ μ νκΈ° μν΄ select λ₯Ό μ΄μ©νμ¬ /dev/sdb  λμ€ν¬λ₯Ό μ§μ νκ² μ΅λλ€.
	   
	(parted) help mklabel mklabel,mktable LABEL-TYPE create a new disklabel (partition table)
	LABEL-TYPE is one of: aix, amiga, bsd, dvh, gpt, mac, msdos, pc98, sun, loop
	```

<br/>

* νν°μμ μμ±νκΈ° μ μ ``λμ€ν¬ λΌλ²¨``μ λ³κ²½νκ² μ΅λλ€.  
	``help mklabe`` λ₯Ό μλ ₯νλ©΄ λ³κ²½ κ°λ₯ν λΌλ²¨ λͺ©λ‘λ€μ νμΈν  μ μμ΅λλ€.

	```cs
	(parted) mklabel gpt

	mklabel λ₯Ό μ΄μ©νμ¬ /dev/sdb μ λμ€ν¬ λΌλ²¨μ GPT λ‘ λ³κ²½νκ² μ΅λλ€.
	  
	(parted) p Model: HP LOGICAL VOLUME (scsi) Disk /dev/sdb: 3001GB Sector size 	
	(logical/physical): 512B/512B Partition Table: gpt Disk Flags: Number Start End Size File system Name Flags  
	```

<br/>

* 2. νν°μ μμ± ``[parted mkpart]``

	``mkpart`` λ‘ νν°μ μμ±μ μ§ννκ² μ΅λλ€.  

	```cs      
	(parted) mkpart Partition name? []? File system type? [ext2]? Start? 1 End? 3001GB

	mkpart λ₯Ό μλ ₯ν ν Partition name κ³Ό File system type λΆλΆμ μν°λ₯Ό λλ¬ λμ΄κ° μ μμ΅λλ€.
	(μ΄λ¦ μ§μ μ μ νμλλ€.)

	κ·Έ λ€μ, Start μ End μ μ©λ λ²μλ₯Ό μ§μ ν΄ μ£Όμλ©΄ λ©λλ€. 
	μ μ²΄ λμ€ν¬ μ©λμ print λ‘ νμΈν  μ μμ΅λλ€.

	(parted) print Model: HP LOGICAL VOLUME (scsi) Disk /dev/sdb: 3001GB Sector size 
	(logical/physical): 512B/512B Partition Table: gpt Disk Flags: Number Start End Size File system 	
	Name Flags 1 1049kB 3001GB 3001GB
	```
	 
    νν°μ μ€μ μ΄ μλ£λλ©΄ ``print`` λ₯Ό μλ ₯νμ¬ νν°μμ΄ μλ‘ μμ±λ κ²μ νμΈν  μ μμ΅λλ€.  
	λ§μ§λ§μΌλ‘ ``quit`` μ μ΄μ©νμ¬ μ μ₯ ν μ€μ  λͺ¨λμμ λΉ μ Έλκ°λλ€.

<br/>


```toc
```