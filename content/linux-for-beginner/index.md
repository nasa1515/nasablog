---
emoji: 🤦‍♂️
title: 리눅스 기초 [LINUX]
date: "2021-06-23 00:00:00"
author: nasa1515
tags: LINUX
categories: LINUX
---

## 머리말 

저는 2016년? 정도부터 IDC Infra와 Backend FrameWork을 다루는 엔지니어로 약 2년정도 일을 했었지만  
군대의 공백 때문에 실무에서 쌓아놨었던 지식들이 희미해지기 시작했습니다.  
그렇기 때문에 첫 블로그 글은 개발이나 인프라 모든 분야에서 필요한 리눅스를 다루며  
다시 리와인드하는 포스트로 시작해보겠습니다. 

---

## ✔ 리눅스(LINUX) OS의 기본 구성 요소

<br/>

### 커널 (Kernel)  

파일 입출력, 프로세스 관리 등과 같이 운영체제의 기능을 담당

* 프로세스 관리 : 프로세스 및 스레드 생성과 삭제, 스케줄링 등    
* 파일 관리 : 디스크 상의 파일을 관리  
* 메모리 관리 : 메인 메모리를 효과적으로 사용하기 위해 관리    
* 통신 관리 : 네트워크를 통해 정보를 주고받을 수 있도록 관리    
* 주변장치 관리 : 입출력 장치를 사용할 수 있도록 관리     


![](https://www.fun-coding.org/00_Images/os_arch.png)
        
<br/>
<br/>
    

### 쉘 (Shell) 

 OS와 사용자 사이의 인터페이스를 제공하는 소프트웨어로 시스템 콜의 일종, 명령어를 입력받아 이를 처리하는 명령어 처리기  

![](https://mblogthumb-phinf.pstatic.net/MjAxODExMjhfMTEw/MDAxNTQzMzcwMTM0MDYw.G0jp7Gtcwwgt6OxrKpNBLQD-KnxpCl0HjJMbgjg9JX0g.C8rEjP7rStId6U9wcY6LPG1JsqUGAQ2W2gKlsWNJS-sg.PNG.qbxlvnf11/20181128_105346.png?type=w800)
   
<br/>
<br/>

### 파일시스템 (File System)  
파일이나 자료를 쉽게 발견 및 접근할 수 있도록 보관 / 조직하는 체제  

* 저장장치 내에서 데이터를 읽고 쓰기 위해 미리 정해진 약속
* 파일 저장 및 검색을 용이하도록 유지/관리하는 방법
* 파일을 어떻게 관리할 것인가에 대한 메커니즘과 정책  
     
<br/>
<br/>
     

#### 파일 + 디렉토리 구조 

: EXT2, EXT3, FAT, FAT32, NTFS, JFFS, JFFS, JFFS2, ISO 9660 ...  
: Journaling File System - 파일 시스템의 변화를 기록, 문제가 발생할 경우 파일 시스템 복구  

![](https://t1.daumcdn.net/cfile/tistory/2657C75056A9C44A27)
      
<br/>
		

* 리눅스 디렉토리 별 정리

	```css	

	/boot: 부팅에 필요한 리눅스 커널 및 여타 패키지를 보관
	/bin: GUI를 실행하는 파일들과 같은 운영체제 관련 바이너리 파일들을 보관	
	/dev: 저장장치, 사운드카드, 그래픽카드, USB장치 등의 연결된 모든 장치들의 연결점
	/etc: 사용자 계정과 암호화된 패스워드를 비롯한 여러가지 설정파일들을 보관
	/home: 각 계정의 홈 디렉토리 관리
	/lib: 수 많은 어플리케이션들에 의해 공유되는 라이브러리들을 보관
	/media: USB메모리, 외장형 CD 드라이브등 분리 저장장치가 자동으로 마운팅 되는 지점
	/mnt: 외부 저장장치를 수동으로 마운팅 하는데 사용되는 디렉토리
	/opt: 운영체제의 일부가 아닌 소프트웨어를 설치 및 보관하는 디렉토리
	/proc: 리눅스에서 실행되고 있는 프로그램, 즉 프로세스 정보를 제공하는 디렉토리
	/sbin: 슈퍼유저에 의해 사용되는 시스템 관리 유틸리티 바이너리 파일들을 보관
	/sys: 특별한 운영체제 파일들이 있는 디렉토리
	/tmp: 임시 파일들이 자동으로 보관 되는 곳
	/usr: 사용자가 접근할 수 있는 프로그램들을 보관하기 위한 디렉토리
	/var: 프로그램들이 값이 변하는 자료나 변수들을 저장하기 위한 가상 디렉토리
	```


---

## ✔ 리눅스 명령어 정리


<br/>


### 간단한 명령어 리스트

* Show File, Directory 명령어 : ls, cat, more, head, tail, wc  

* Copy, Move,Remove 명령어 : cp, mv ,rm ,mkdir


<br/>

### 링크생성 : ln (hard link, symbolic link)
	
- 하드 링크 (hard link) - 명령어 : ln [원본파일][링크 파일명]  
	원본 파일과 동일한 inode를 가진다.  
	원본 파일이 삭제 되더라도 원본 파일의 inode를 갖고 있는 링크 파일은 여전히 사용 가능

<br/>

- 심볼릭 링크 (symbolic link) - 명령어 : ln -s [원본파일][링크 파일명]  
	원본 파일의 이름을 가르키는 링크. 그러므로 원본 파일이 사라지게되면 역할을 수행 할 수 없다  

<br/>

*  명령어

	```md
	조건 : ln [Source] [Target]
		    
	$ ln /home/test /home/home.ln
	: /home/test 파일의 내용이 /home/home.ln에 하드링크로 구성
		      
	$ ln -s /home/test /home/home.so
	: /home/test 파일의 내용이 /home/home.ln에 심볼릭링크로 구성

	```

<br/>

---


## ✔ USER 설정


<br/>

### 사용자 및 그룹 정보 파일 

* /etc/passwd : 시스템에 등록된 사용자 정보
* /etc/shadow : 시스템에 등록된 사용자의 PWD 및 PWD 설정
* /etc/group : 시스템에 등록된 그룹 정보
* /etc/gshadow  : 시스템에 등록된 그룹의 PWD 및 PWD 설정

<br/>

### 사용자(그룹) 생성 및 수정,삭제 명령어
		
* useradd (유저 생성) [grouppadd]
* usermod (유저 정보 수정) [groupmod]
* userdel (유저 삭제, -r 옵션으로 홈디렉토리까지 삭제가 기본) [groupdel]

		
<br/>

### 명령어 형식 [add와 mod 거의 동일]


*  useradd 옵션 계정명  
  
	```md  
	-d 홈디렉토리 : 홈디렉토리의 경로를 지정해줍니다. 홈디렉토리를 생성할려면 -m옵션을 같이 사용합니다.  
	-u uid : uid 를 지정합니다.  
	-g gid : gid 그룹을 지정합니다.  
	-G groups : 보조그룹을 지정합니다.  
	-s shell : 쉘을 지정합니다.  
	-c 주석 : 계정에 설명을 붙여 줍니다.  
	-D : useradd 의 기본 설정 값을 확인합니다. 기본 설정은 /etc/default/useradd 에있습니다.  
	```

---

```toc
```