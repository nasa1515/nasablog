---
emoji: 🤦‍♂️
title: SWAP [LINUX]
date: "2021-06-23 00:00:52"
author: nasa1515
tags: LINUX
categories: LINUX
---

머리말  

안녕하세요 NASA 입니다!  
이번 포스트에서는 리눅스 가상메모리 즉 SWAP에 대해서 포스트 했습니다.  

---


## ✔ 가상메모리

<br/>

### 가상메모리 (SWAP)  

swap 은 물리 메모리가 부족할 경우를 대비해 만든 영역입니다.   
간단히 말해서 메모리 부족으로 인한 이슈를 막기위해 HDD로 확보해놓은 메모리 공간입니다.

<br/>

### SWAP을 쓰는 이유? 

* 1. 메모리 부족
* 2. 멀티태스킹(스와핑, 페이징등 우선순위 프로그램의 리사이클을 위해)
* 3. 메모리(full) 덤핑


<br/>

* 스와핑 : 전체 프로세스 주소 공간 또는 공유 할 수 없는 텍스트 데이터  
 세그먼트를 스왑 장치에 복사하거나 ``한번에`` (일반적으로 디스크) 복사하는 것을 말합니다
	
	* swap in : 하드디스크의 프로세스를 메모리에 보내는 행위  
	* swap out : 메모리에서 프로세스는 내보내는 행위  
	
    * 페이징 : 주소 공간의 하나 이상의 페이지를 복사하는 것을 말합니다.   

<br/>

---

## 👌 스왑 명령어

<br/>

다음 명령어로 스왑 메모리에 관련된 작업을 수행 할 수 있습니다.


* 스왑메모리 생성 : ``mkswap``  
* 스왑메모리 활성화 : ``swapon``  
* 스왑메모리 비활성화 : ``swapoff``
    

<br/>

스왑 파티션 생성 방법

스왑 파티션 생성 전 아래 명령어로 스왑 영역을 확인 할 수 있습니다.

* swapon -s   
* free
* df 


<br/>

### 파티셔닝을 통한 스왑 영역 활성화  

```cs
1. 디스크 추가 (fdisk -l /dev/sdc) or parted 명령어 사용
2. 파티셔닝 (fstype : linux swap [82]) 파티션 타입을 LINUX SWAP으로 변경
3. 스왑 영역 생성 (mkswap /dev/sdc3) 
4. 스왑 영역 활성화 (swapon /dev/sdc3 마운트)
5. 활성화 시킨 SWAP을 fstab에 등록
blkid 또는 lsblk -f 로 /dev/sdc3의 UUID 확인 - UUID로 하지 않으면 스왑이 풀림
  
# vim /etc/fstab
구문추가) 파티션 경로 (/dev/sdc6)또는 UUID
# UUID swap swap defaults 0 0
  
6. swapon -a (/etc/fstab의 파일을 현재 메모리에 활성화 해서 오류 확인)

----------------------------------------------------------------------------
swap 을 비활성화

(swapoff /dev/sdc3)   
```


<br/>

### 정말 간단한 swap 메모리 증설 방법  

```cs
1. sudo dd if=/dev/zero of=/root/fileA count=4000 bs=1024k  
dd : 블록단위로 파일을 복사,저장 하는 명령어

2. sudo chmod 600 /root/fileA 
권한 설정
     
3. sudo mkswap /root/fileA                                  
// 해당 파일로 스왑 생성
4. sudo swapon /root/fileA
5. fatab 등록
```
 

 ```toc
 ```