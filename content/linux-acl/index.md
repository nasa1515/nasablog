---
emoji: 🤦‍♂️
title: "[LINUX] - Access Control List (ACL)"
date: "2021-06-23 00:00:40"
author: nasa1515
tags: LINUX
categories: LINUX
---

머리말  

이번 포스트에서는 리눅스에서 설정하는 ACL (Access Control List) 대해서 포스트 했습니다.   

---

## ✌ ACL (Access Controll List)

<br/>

### setfacl 과 getfacl  
	
UMASK로는 특정 파일에 alice 사용자에게 읽기 권한만 주고 Eve와 Frank는 읽기/쓰기 권한을 주는 등의 세밀한 권한 조정은 불가능합니다.  
이 문제를 해결하기 위해 ACL을 구현하면 cp, mv 같은 파일을 다루는 유틸리티의 권한도 수정 할 수 있게 됩니다.  

<br/>

### ACL 설정 (Link to ACL 설정)  
	
ACL에는 access ACL 과 Default ACL 두 가지 형식이 존재합니다..  
	
* access ACL 은 지정한 파일이나 디렉터리에 대해 설정한 접근 제어 목록이며  
* Default ACL 은 디렉터리에만 지정할 수 있고 필수 사항은 아닙니다.

<br/>

디렉토리에 들어있는 파일에 access ACL 이 설정되 있지 않으면  디렉토리에 지정된 기본 ACL 을 사용하게 되는데     
ACL은 사용자별, 그룹별, 유효 접근 권리 마스크(effective rights mask) 별 그리고 다른 사용자(other)에 대해 설정할 수 있습니다. 
	

<br/>

### ACL 추가/변경Link to ACL 추가/변경  

``-m 옵션``을 사용하면 파일이나 디렉터리의 ACL 을 추가 또는 변경할 수 있습니다. ``setfacl -m rules files`` 같은 형식으로 사용하면 됩니다.  
rule 은 필수 항목이며 아래와 같이 설정할 수 있습니다.

```md
u:uid:perms
특정 사용자를 대상으로 ACL 을 설정합니다.
대상 사용자는 사용자 ID나 UID(숫자)로 지정하면 되며 유효한 사용자여야 합니다.
  
g:gid:perms
그룹을 대상으로 권한을 지정합니다
대상 그룹은 그룹 명이나 GID(숫자) 로 지정하며 유효한 그룹이여야 합니다.
  
o:perms
다른 사용자(other)에 대해 ACL 을 지정합니다.
perms 에 지정하는 권한은 r(읽기), w(쓰기), x(실행) 세 가지로 나눠지며
여러 권한을 지정할 경우 권한 문자를 이어서 써주면 됩니다.
예를 들어 읽기, 쓰기를 허용할 경우 rw 를 지정하면 됩니다.
```

<br/>

### ACL 삭제Link to ACL 삭제  

``-x, --remove 옵션``을 사용하면 ACL 을 삭제할 수 있습니다.  
	
-m 과 마찬가지로 rules 과 파일명을 주게 되어 있으나 권한 항목은 지정할 수 없으며, 지정된 사용자와 그룹의 모든 권한을 삭제합니다.  


<br/>

#### 실행 예


* 일반 사용자는 ``/etc/sysconfig/iptables`` 파일의 내용을 볼 수가 없습니다.  
    따라서 won 이라는 사용자에게만 /etc/sysconfig/iptables 권한을 부여해보겠습니다.

    ```md
    # setfacl -m u:won:r /etc/sysconfig/iptables
    ```

<br/>

* won 사용자에게 부여한 /etc/sysconfig/iptables 의 모든 권한을 삭제 해보겠습니다. 

    ```md
	# setfacl -x u:won /etc/sysconfig/iptables
    ```

* 이제 won 사용자가  /etc/sysconfig/iptables 을 읽으려고 할 경우 `Permission denied` 에러가 발생하게 됩니다.

<br/>

#### 실행 예 (2)

* ``/project/config`` 파일은 wonseok 그룹은 읽고 쓸 수 있고 won 사용자는 읽을 수만 있도록 설정해 보죠.

	```md
	# setfacl -m g:wonseok:rw /project/config
	# setfacl -m u:won:r /project/config
	```

<br/>


<br/>

### 기본(Default) ACL 설정   

rules 항목 앞에 ``d``를 붙이면 됩니다. 디렉토리에만 가능하므로 파일에 지정할 경우 에러가 발생합니다.  

* 기본 ACL을 특정 디렉토리에 설정 할 경우 이후에 해당 디렉토리에서 생성되는 모든 파일, 디렉토리는 설정한 ACL을 가지게 됩니다.

<br/>

* ``getfacl`` 명령어로 파일이나 디렉터리에 설정된 ACL 을 확인할 수 있습니다. 시스템 로그가 쌓이는 /var/log 의 ACL 을 확인해 보겠습니다.

	```md
	# getfacl /var/log
 
	getfacl: Removing leading '/' from absolute path names
	# file: var/log
	# owner: root
	# group: root
	user::rwx
	group::r-x
	other::r-x
	```

	/var/log 의 소유자는 root 이고 그룹도 root 이다. 소유자는 읽기(r), 쓰기(w), 실행(x) 권한을 갖고 있고  
	그룹과 다른 사용자에게는 읽기(r), 실행(x) 권한이 있음을 확인할 수 있습니다.


```toc
```