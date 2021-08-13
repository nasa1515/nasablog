---
emoji: 🤦‍♂️
title: 리눅스 Partition
date: "2021-06-23 00:00:51"
author: nasa1515
tags: LINUX
categories: LINUX
---

머리말  

이번 포스트에서는 리눅스 파티션에 대해서 포스트했습니다.  
아마 리눅스뿐만 아니라 다른 쪽으로도 유용하게 사용할 수 있는 지식일 것입니다.

---

## ✔ 리눅스 파티션
	
리눅스에서 사용하는 파티션의 종류는 세 가지가 있습니다.

<br/>

* 첫째 [Primary Partition] ``주 영역`` 파티션이 있습니다.
	

	- Maximum 4개까지 생성 가능 합니다. (사용하는 용도에 맞게 1개~4개 까지 조절해서 사용)

<br/>

* 둘째 [Extend Partition] ``확장 영역`` 파티션이 있습니다.

	- Maximum 1개까지 만들 수 있습니다. (최대가 1개이기 때문에 조절해서 사용합니다.)

	<br/>
	
* 셋째 [Ligical Partition] ``논리 영역`` 파티션이 있습니다.

	- Extend Patition 안에 만들 수 있는 파티션. SCSI 한 개, 총 15개만 넘지 않는 범위에서 자유롭게 만들 수 있습니다.  
	 그러나 12개 이상의 파티션을 만드는 것은 시스템에 좋지 않습니다.
	

<br/>


---

## 👌 파티션 생성


### fdisk 명령어로 파티션 설정


* 1. fdisk -l ( 물리적으로 장착된 디스크 정보 확인 )

	![](https://k.kakaocdn.net/dn/dzx1fC/btqve5Y0jEK/Ym8BGQ4C8enE6yYzkePl51/img.png)

<br/>

* 2. fdisk [디스크 장치명] ( 파티션 설정 모드로 진입합니다. )

	![](https://k.kakaocdn.net/dn/B91Zs/btqvehexIkG/5ykfzKgx7hck6RVaKmKKr0/img.png)

<br/>

* 3. 첫 번째 Primary Partition 256MB를 생성합니다.

	![](https://k.kakaocdn.net/dn/sAxvA/btqvhuKmkRj/mI7mIOggg8ATNpEQSCQEp1/img.png)

<br/>

* 4. 두 번째 Primary partition 256MB를 생성합니다.

	![](https://k.kakaocdn.net/dn/boicL6/btqvgFyCLUC/KIgFBjjDNgzj75TeMCPcP0/img.png)

<br/>

* 5. 세 번째 Extend Partition 512MB를 생성합니다.

	![](https://k.kakaocdn.net/dn/chdcZh/btqvgF6vaa5/PPSlKCzb9KGHZiol7nZl1k/img.png)



	<br/>

	p를 눌러서 세 번째 파티션도 확인해 줍니다.  

	![](https://k.kakaocdn.net/dn/KtaKT/btqvb6dNF4C/EDU4NkiNRJznqDOMj9qPk1/img.png)

<br/>

* 6. 네 번째, 다섯 번째 Logical Partition 256MB, 256MB을 생성합니다.

	![](https://k.kakaocdn.net/dn/nHHCO/btqvcfPdO3i/KDK9rXghMdlkHCepj93nIk/img.png)

<br/>

* 7. 현재까지 설정한 파티션 저장

	![](https://k.kakaocdn.net/dn/KAxKB/btqvf37E4R1/54BMjrJQr5TWMKgU4La47K/img.png)

<br/>

* 8. 파일 시스템 설정  

	리눅스 환경은 시스템에 맞게 파일 시스템 설정이 필요합니다. 리눅스 파일 시스템에는 여러 가지가 있지만  
	최근 주로 사용하는 파일 시스템으로 설정을 해보겠습니다.


	* 1. ``FAT32`` : 윈도우와 리눅스 둘다 상용할 수 있는 파일 시스템    
			대용량 NTFS 파일 시스템 이하의 환경에서 동작할 수 있는 제한 사항을 갖고 있습니다.  

	<br/>

	* 2. ``ext3`` : 보안 부분이 조금 향상된 기본 파일 시스템으로 저널링 파일 시스템 기반  

	<br/>

	* 3. ``ext4`` : 대형 파일 시스템을 지향하는 목적으로 개발되었으며 최대 1엑사 바이트의 볼륨과 16TB 파일을 지원합니다.  
	ext3 단점을 많이 보안한 파일 시스템으로 현재까지 개발 중에 있는 파일 시스템입니다.

<br/>


* ext4 시스템으로 파일시스템 설정

    ``mkfs`` 명령어를 사용해서 파일시스템을 변경 할 수 있습니다.

    ![](https://k.kakaocdn.net/dn/zTAL0/btqveiq9XB2/TbA6hI64uZbB3dd7lz7lD0/img.png)


<br/>

---


### parted 명령어로 파티션 구성  

``/dev/sdb 3TB`` 디스크를 이용하여 작업을 진행했습니다.


<br/>

* 1. 파티션 지정 ``[parted 디바이스, mklebel]``

	 ``parted /dev/sdb`` 형식으로 설정할 디스크를 지정 할 수 있습니다.
	

<br/>

* (parted) print all  
    파티션을 지정하면 ``(parted)`` 설정 모드로 접속하게 됩니다.  
    설정 모드에서 ``print all`` 을 입력하면 현재 디스크와 파티션에 대한 정보를 확인할 수 있습니다.

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

* ``3001GB`` 용량으로 보이는 ``/dev/sdb`` 디스크가 있는 것을 확인 할 수 있습니다.
	
	```cs
	(parted) select /dev/sdb
	/dev/sdb 디스크에 설정을 하기 위해 select 를 이용하여 /dev/sdb  디스크를 지정하겠습니다.
	   
	(parted) help mklabel mklabel,mktable LABEL-TYPE create a new disklabel (partition table)
	LABEL-TYPE is one of: aix, amiga, bsd, dvh, gpt, mac, msdos, pc98, sun, loop
	```

<br/>

* 파티션을 생성하기 전에 ``디스크 라벨``을 변경하겠습니다.  
	``help mklabe`` 를 입력하면 변경 가능한 라벨 목록들을 확인할 수 있습니다.

	```cs
	(parted) mklabel gpt

	mklabel 를 이용하여 /dev/sdb 의 디스크 라벨을 GPT 로 변경하겠습니다.
	  
	(parted) p Model: HP LOGICAL VOLUME (scsi) Disk /dev/sdb: 3001GB Sector size 	
	(logical/physical): 512B/512B Partition Table: gpt Disk Flags: Number Start End Size File system Name Flags  
	```

<br/>

* 2. 파티션 생성 ``[parted mkpart]``

	``mkpart`` 로 파티션 생성을 진행하겠습니다.  

	```cs      
	(parted) mkpart Partition name? []? File system type? [ext2]? Start? 1 End? 3001GB

	mkpart 를 입력한 후 Partition name 과 File system type 부분은 엔터를 눌러 넘어갈 수 있습니다.
	(이름 지정은 선택입니다.)

	그 뒤에, Start 와 End 의 용량 범위를 지정해 주시면 됩니다. 
	전체 디스크 용량은 print 로 확인할 수 있습니다.

	(parted) print Model: HP LOGICAL VOLUME (scsi) Disk /dev/sdb: 3001GB Sector size 
	(logical/physical): 512B/512B Partition Table: gpt Disk Flags: Number Start End Size File system 	
	Name Flags 1 1049kB 3001GB 3001GB
	```
	 
    파티션 설정이 완료되면 ``print`` 를 입력하여 파티션이 새로 생성된 것을 확인할 수 있습니다.  
	마지막으로 ``quit`` 을 이용하여 저장 후 설정 모드에서 빠져나갑니다.

<br/>


```toc
```