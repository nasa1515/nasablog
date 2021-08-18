---
emoji: 🤦‍♂️
title: 권한 설정 chmod, Setuid... [LINUX]
date: "2021-06-23 00:00:30"
author: nasa1515
tags: LINUX
categories: LINUX
---


머리말  

이번 포스트에서는 리눅스 권할 설정에 대해서 정리했습니다. 정말! 정말! 많이 사용하는 것들이기 때문에 머리에 박아 둬야 합니다. 

---

## ✔ 권한 설정

* 파일, 디렉토리 권한 설정   

	 ``ls -l`` 명령을 사용하여 파일, 디렉토리 리스트를 출력하면 ``권한(퍼미션, 허가권)``을 확인 할 수 있습니다.

    ```md
	-rwxr-xr-x 1 pi pi 5720 Jul 3 20:06 a.out
	-rw-r--r-- 1 pi pi 722 Jul 2 21:12 crontab.bak
	-rw-r--r-- 1 pi pi 52 Jul 2 21:10 test.c
    ```

<br/>

* 출력 결과는 각각 다음을 나타냅니다

    * 파일 종류 및 권한(퍼미션)
    * 링크수
    * 사용자(소유자)
    * 그룹
    * 파일크기
    * 수정시간
    * 파일이름

<br/>


### 권한 설정 명령어  

* chmod
* chown
* chgrp

<br/>

* ``chmod`` - 개별적으로 파일 권한 변경하기, 알파벳 (rwx), 숫자 (umask) 로 권한을 설정 할 수 있습니다.

    ```md
	chmod g+w test.c : 그룹에 쓰기 권한을 추가합니다.

	chmod o-r test.c : 다른 사용자에게 읽기 권한을 빼았습니다.
	 
	chmod 777 test.c : 사용자, 그룹, 다른사용자의 모든 권한을 추가합니다.

	chmod 700 test.c :사용자에게만 모든 권한을 추가합니다.

	chmod 744 test.c :사용자에게는 모든 권한을 주고, 그룹, 다른 사용자에게는 읽기 권한만 줍니다.
    ```

<br/>


* ``chown`` - 파일의 소유자 변경

    ```md
	sudo chown user01 a.out : chown 명령으로 파일을 사용자(소유자)를 user01로 변경합니다.

	sudo chgrp user01 test.c : chgrp 명령으로 파일의 그룹을 user01로 변경합니다.

	그룹만 변경할 때 chgrp 명령어를 사용합니다. 일반 사용자는 자신이 속한 그룹으로만 변경이 가능합니다.

	sudo chown user02.user02 crontab.bak : chown 명령으로 파일의 사용자와 그룹을 동시에 변경합니다.

	sudo chown -R user01 tmp/ : -R 옵션을 사용하면 디렉토리와 그 안에 들어있는 모든 파일의 사용자를 변경합니다.
    ```

<br/>

### 특수권한


<br/>

#### [1] SetUID  
	
- 소유자만 접근 가능한 파일에 일반 유저로 접근이 필요할 때 사용합니다. 권한을 잠시 빌려오는 개념입니다.
- User 권한의 접근 권한(x)자리에 x대신 ``s``가 들어가면 이를 SetUID라 칭합니다.
- 만약 s 대신 ``S(대문자)``가 들어가면 이는 일반 권한의 -(접근 권한 없음) 과 같은 의미입니다.
- 권한을 읽을 때 맨 앞에 숫자 4를 붙여서 읽습니다.  

<br/>

* 명령어 형식

	* chmod u+s 파일이름
	* chmod 4755 파일이름  
    

    ```md
    ex) rws rwx rwx = 4777
    chmod u+s test.sh
    chmod 4775 text,sh
    ```


<br/>
  


#### [2] SetGID

- 소유 그룹만 접근 가능한 파일에 일반유저로 접근이 필요할 때 사용합니다.
- Group 권한의 접근 권한(x)자리에 x대신 s가 들어가면 이를 SetGID라 칭합니다.
- 만약 s 대신 S(대문자)가 들어가면 이는 일반 권한의  -(접근 권한 없음) 과 같은 의미입니다.
- 권한을 읽을 때 맨 앞에 숫자 2를 붙여서 읽습니다.


<br/>

*	명령어 형식 

    * chmod g+s 파일이름  
    * chmod 2755 파일이름  
      
    ```md
    ex) rwx rws rwx = 2777
    chmod g+s test.sh
    chmod 2775 text,sh  
    ```

<br/>


#### [3] Sticky bit

- 특정 디렉토리를 누구나 자유롭게 사용할 수 있도록한다.
- 파일 및 디렉토리 생성은 누구나 가능지만, 삭제는 생성한 유저와 디렉토리 소유자만 가능합니다.  
	(커뮤니티 게시판의 개념으로 생각하면 이해가 쉽습니다)


- Other 권한의 접근 권한(x)자리에 x대신 t가 들어가면 이를 Sticky bit라 칭합니다.
- 만약 t 대신 T(대문자)가 들어가면 이는 일반 권한의 -(접근 권한 없음) 과 같은 의미입니다.
- 권한을 읽을 때 맨 앞에 숫자 1을 붙여서 읽습니다.
	
<br/>

* 명령어 형식  
    	
	* chmod o+t 파일이름
    * chmod 1755 파일이름

    ```md
    ex) rwx rwx rwt = 1777
    chmod o+t test.sh
    chmod 1775 text,sh
    ```



```toc
```