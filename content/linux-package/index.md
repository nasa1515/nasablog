---
emoji: 🤦‍♂️
title: 리눅스 패키지 관리자 RPM, YUM
date: "2021-06-23 00:00:56"
author: nasa1515
tags: LINUX
categories: LINUX
---


머리말  

저의 경우에는 LINUX라고는 CENTOS 와 REDHAT의 경험밖에 없다보니 데비안, 우분투, 등등의 여러 리눅스에서 사용하는 패키지 관리자에 대한 배경지식이 없어서 이 포스트 작성이 큰 도움이 되었습니다.  


---

  

## ✔ 패키지 관리자란? 

윈도우로 서버를 운영하면 IIS의 가장 장점은 바로 웹 플랫폼 설치관리자 입니다.  
그 이유중에 하나는 복잡한 설치과정을 간단하게 클릭 몇번만으로 설치 및 설정까지 자동으로 해주기 때문에 편리하다고 하였는데  
사실 리눅스에도 이와 비슷한 기능을 가지고 있는 패키지 저장소가 있습니디.  

리눅스에서의 패키지 관리 시스템은 터미널 명령어로 진행해야 하기 때문에 GUI 방식인  
웹 플랫폼 설치관리자보다 불편했고 처음 사용하는 사용자 입장에서 불편하고 숙달하기 어려웠습니다.  

대신 장점이라면, 웹 플랫폼 설치 관리자는 IIS 및 서버 구축에만 카테고리들이  
준비되어 있는 반면, 리눅스 저장소에는 서버 관련 항목뿐 아니라,  
각종 유지 및 시스템 전반에 걸쳐서 필요한 프로그램들을 준비해 놓고 있습니다.  


<br/>

## 👍 RPM과 YUM

RPM,YUM은 리눅스 패키지 인스톨 프로그램이자 인스톨 파일이라고 생각하면 됩니다.


### RPM(Redhat Package Manager)  
패키지 관리자로, Windows의 setup.exe와 비슷한 설치파일 입니다.  
이러한 설치 파일의 확장자명은 .rpm이며, 이를 패키지라고 부릅니다.  
RPM은 Redhat계열인 CentOS, Redhat, Fedora 에서 호환됩니다. 


  * 장점  
    
      * 바이너리 파일로 구성되어 컴파일이 필요없음  
      * 패키지 설치상태 및 정보 제공.  
      * 기존파일 삭제없이 바로 업그레이드 가능
 
  * 단점  
    
      - 패키지 의존성에 따라 관련 패키지가 먼저 설치되어있지 않으면 설치가 안된다.   
        즉, 패키지 설치를 위해서 그 패키지의 필요요소를 사전에 전부 다운로드 해야 한다. (패키지 디펜던시).


      - 그런데 RPM에서는 YUM과 달리 이러한 의존관계를 같이 다운받아주지 않는다는 단점이 있다.  
        국내 배포된 리눅스들이 레드햇을 기반으로 하고 있어 사용 범위가 넓다.

<br/>

### RPM의 파일 구조  

[패키지이름-버전-릴리즈번호.소스여부.시스템.확장자]  

```cs
Ex) gcc-2.96-98.i386.rpm

* gcc : 패키지 이름

* 2.96 : 패키지 버전

* 98 : 패키지의 릴리즈 번호  
    패키지가 몇 번째로 만들어진 것인지를 나타낸다.  
    똑같은 프로그램으로 다시 패키지 하여도 릴리즈는 올라간다.  

* i386 - 시스템, 어떤 시스템에서 쓰이는 것인지를 나타내는 것이다.  
    'i386', 'i686'등은 인텔계열의 시스템에서  
    'sparc' SUN의 스팍 시스템용이고  
    'alpha' 라면 알파 시스템용이다.  


*  혹 네 번째 필드에 src라고 적혀있으면 그것은 소스 RPM이다.  
    바이너리 패키지를 만들기 위해서 필요하다.  
    일반적으로 많이 사용하는 편은 아니다.
```

<br/>

### RPM의 사용법

* 설치 :  rpm -Uvh [*.rpm]

      U: 파일을 설치하되, 설치되어 있는 파일은 업그레이드  
      v : 설치과정을 확인  
      h : 설치 진행과정을 "#" 마크로 화면에 출력  

<br/>

* 삭제  : rpm -e [패키지 이름]

      <br/>

* 설치되어 있는 패키지 정보 확인

      ```cs
      설치된 패키지 확인 : rpm -qa [패키지 이름]

      설치된 패키지의 상세 정보 확인 : rpm -qi [패키지 이름]

      설치된 패키지에 포함된 파일 목록 확인 : rpm -ql [패키지 이름]

      설치된 파일이 어느 패키지에 포함되어 있는지 확인 : rpm -qf [절대경로+파일]
      ```

* 설치되어 있지 않은 패키지 정보 확인

      ```cs
      패키지에 포함되는 파일 목록 확인 : rpm -qlp [패키지 이름]

      설치할 패키지의 상세 정보 확인 : rpm -qip [패키지 이름]
      ```

<br/>

-----

### ✨ YUM(Yellodog Updater Modified)

- rpm과 다르게, 필요한 패키지만 설치 하면, 의존성이 있는 다른 패키지 또한 함께 설치해주는 툴이다.  

- YUM은 외부 레파지토리 서버랑 통신이 가능해야 한다. 즉, 네트워크가 단절되면 yum 명령어 사용이 불가능하다.

- repo 파일의 경우 /etc/yum.repo/ 디렉토리 안에 x.repo 파일로 저장되어있다.

<br/>

### YUM의 사용법


* 기본 설치
    
      ```cs
      yum install [패키지 이름]
      주로 yum -y install [패키지 이름] 으로 사용
      -y : 설치유무를 모두 yes로 응답
      ```

* RPM 설치
    
      ```cs
      yum install [*.rpm 파일 이름]
      ```

* 업데이트 가능 목록 확인
    
      ```cs
      yum check-update
      ```

* 업데이트 
    
      ```cs
      yum update [패키지 이름] // 패키지 이름을 입력하지 않으면 전부 업데이트
      ```

* 삭제하기
    
      ```cs
      yum remove [패키지 이름]
      removeauto : 사용하지않는 의존성파일까지 모두 삭제
      -y : 삭제유무를 모두 yes로 응답
      ```

* 패키지 그룹 설치 
    
      ```cs
      yum groupinstall "[패키지 그룹 이름]"
      ```

* 특정 파일이 속한 패키지 이름 확인
    
      ```cs
      yum provides [파일 이름]
      ```

* GPG 키 검사 생략 
    
      ```cs
      yum install --nogpgcheck [*.rpm]
      인증되지 않은 rpm 파일을 yum으로 설치시,
      설치가 불가능하다. 그럴 때 인증을 생략하는 방식이다.
      ```

<br/>

----

## 👌 웹 다운로드 명령어


### wget  

  'Web Get'의 약어로 웹 상의 파일을 다운로드 받을 때 사용하는 명령어, wget은 ``비상호작용 네트워크 다운로더`` 이다.  
즉, 네트워크 상에서 데이터를 다운로드하는 기능을 수행한다  
HTTP, HTTPS, FTP 프로토콜을 지원하며, HTTP proxy에서 데이터를 가져올 수도 있다  

  wget이 상호작용을 필요로 하지 않는다(non-interactive)는 것은  
사용자가 로그인하지 않은 상태 동안에도 백그라운드 상태에서 동작할 수 있음을  의미한다.

<br/>

* 사용법

```cs
$ wget [옵션]... [URL]...
옵션 #
-O filename DOWNLOAD-URL : wget을 통해 다운로드 할 경우 저장되는 파일명은 URL의 마지막 '/' 뒤에 오는 단어를 파일명으로 저장한다.
--limit-rate=N DOWNLOAD-URL : wget은 기본 값으로 최대 대역폭을 사용한다. 필요할 경우 '--limit-rate' 옵션을 이용하여 다운로드 속도를 조절할 수 있다.
-b DOWNLOAD-URL : 다운로드 작업을 백그라운드에서 실행한다. 로그는 wget-log에 기록된다. 로그를 실시간으로 확인하려면 tail -f wget-log를 이용하여 볼 수 있다.
--user-agent="User-info" DOWNLOAD-URL : 웹브라우저를 이용하지 않을 경우 일부 사이트에서는 다운로드를 제한하는데, 이 경우 '--user-agent' 옵션을 이용하여 사이트에 정보를전송한다.
-V, --version : Wget의 버전을 보여준다.
-h, --help : Wgwt의 명령 옵션의 전부에 대한 도움말을 출력한다.
-b, --background : 시작한 후 즉시 백그라운드에서 작동한다. 결과 파일이 없음이 –o를 통해 지정되었다면, 결과는 wget-log로 다시 보내진다.
-e command, --execute command : .wgetrc를 읽어서 명령을 실행한다.
-d, --debug : 디버그 내용을 출력한다.
-i file, --input-file=file : 다운받을 URL 주소를 로컬이나 파일에서 찾는다. 
만약 file에 ‘-’를 입력하면 표준 입력으로 URL를 받는다.
-F, --force-html : 파일에서 input을 읽어올 때, HTML 파일로 처리한다.
-i FILE-WHICH-HAS-URLS : 한 번에 여러개의 파일을 다운로드 한다. URL은 개행으로 구분되어 입력된 파일을 통해 입력한다.
--reject=FILE-EXTENSION DOWNLOAD-URL : 특정 파일 확장자를 제외하고 다운로드 한다.
-r -A.FILE-EXTENSION DOWNLOAD-URL : 특정 파일 확장자만 다운로드 한다. '-r'은 재귀적 탐색을, '-A'는 accept할 파일 타입을 지정한다.
```


<br/>

### 예제


* 단일 파일 받기  

다음의 예는 인터넷에서 단일 파일을 받아 현재 디렉토리에 저장하는 방법입니다.

```cs
$ wget DOWNLOAD-URL

다운로드 하는 동안 진행 경과와 함께 다음의 정보를 보여줍니다
현재 몇 퍼센트 받았는지에 대한 정보 (2%)
현재까지 다운로드 받은 바이트 수 (112,550)
현재 다운로드 속도 (3.64KB/s)
다운로드 완료까지 남은 시간 (35s
$ wget http://www.openss7.org/repos/tarballs/strx25-0.9.2.1.tar.bz2
HTTP request sent, awaiting response... 200 OK
Length: 3852374 (3.7M) [application/x-bzip2]
Saving to: ‘strx25-0.9.2.1.tar.bz2
2% [=>                             ] 112,550     3.64KB/s   in 35s
```

<br/>

* 다른이름으로 저장하기  

파일을 저장할 때 wget은 기본적으로 다운로드 경로의 마지막 슬래쉬('/') 다음에 오는 단어를 파일이름으로 사용합니다.  
그런데 이 방법으로는 올바른 파일이름이 아닌 이상한 이름을 뽑아내는 경우도 있습니다.

```cs
$ wget http://www.vim.org/scripts/download_script.php?src_id=7701
위의 경우 다운받은 파일 이름은 'download_script.php?src_id=7701'이 됩니다. 이런 상황을 해결하기 위해 '-O' 옵션을 사용합니다. 
$ wget -O taglist.zip http://www.vim.org/scripts/download_script.php?src_id=7701
```

-------

### curl

서버와 통신할 수 있는 커맨드 명령어 툴입니다. 웹개발에 매우 많이 사용되고 있는 무료 오픈소스입니다.  
      curl의 특징으로는 다음과 같은 수 많은 프로토콜을 지원한다는 장점이 있습니다.

```cs
프로토콜
DICT, FILE, FTP, FTPS, Gopher, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, POP3, POP3S, RTMP, RTSP, SCP, SFTP, SMB, SMBS, SMTP, SMTPS, Telnet, TFTP
```

<br/>

* 옵션

curl에 설정 가능한 옵션보기아래는 사용 가능한 다양한 옵션들입니다.

```cs
-X : 사용할 방식 메소드 선택하기
-d : 함께 전달할 파라미터값 설정하기
-G : 전송할 사이트 url 및 ip 주소
-H : 헤더 정보를 전달하기
-i : 사이트의 Header 정보만 가져오기
-I : 사이트의 Header와 바디 정보를 함께 가져오기
-u : 사용자 정보
```

<br/>

### 예제

* header 값 설정하기, -H

```cs
-H값을 사용히야 헤더에 전달할 값들을 설정합니다.
- Content-Type을 application/json으로 설정하기
curl -H "Content-Type: application/json"
- Content-Length를 0으로 설정하기
curl -H "Content-Length: 0"
```

<br/>

* curl을 사용하여 파라미터를 전달하기 

```cs
전달할 파라미터가 있는 경우의 방법입니다. 파라미터값을 전달하는 경우 아래와 같이 url 뒤에 붙이는 get 방식이나 -d 옵션을 사용하여 전달할 수 있습니다.
curl -G http://webisfree.com/action/?test=ok
또 다른 방법으로 -d 옵션을 사용하면 아래처럼 전달합니다. 만약 전달할 값이 아래와 같다면 다음과 같이 수행합니다.
@ Method / 전달할 값
POST / test=ok
curl -X PUT -G http://webisfree.com/action -d test=ok
```

<br/>

* POST 메소드를 사용한 예제

```cs
기본값으로 메소드는 POST이므로 -X 설정이 없이 사용할 수 있습니다.
@ Method / 전달할 값
POST / test=ok, test2=ok
curl http://webisfree.com/action -d test=ok -d test2=ok
아래와 같이 따옴표를 사용하여 하나로 묶어 사용할 수도 있습니다.
curl http://webisfree.com/action -d 'test=ok&test2=ok'
! DELETE 메소드를 사용한 예제아래는 DELETE 메소드로 요청하는 방법입니다.
curl -X "DELETE" http://webisfree.com/action/
예를들어 아래처럼 사용할 수 있습니다.
curl -X DELETE -H "Accept: application/xml" -H "Content-type: application/xml" -u [USER:PASS] -X
-u를 사용하여 계정 정보를 입력시 아이디만 넘길 수 있습니다. 이 경우 패스워드 입력창이 나타나며 여기에 패스워드를 입력하면 됩니다.
```

<br/>

* url이 긴 경우 역슬러쉬 사용하기 

```cs
리눅스 쉘 환경에서 입력시 명령어 줄이 긴 경우 다음 줄에 나타나기 위해서 역슬러쉬 \ 기호를 많이 사용합니다. 아래 예제를 봐주세요.
curl -G http://webisfree.com/action \
-X DELETE \
-d id=123
이처럼 사용할 수 있죠.
cs

<br/>

* 여러개의 파라미터를 전달하는 경우

```cs
하나가 아닌 데이터 값이 여러개인 경우 어떻게 할까요? 이 경우 두 가지 방법으로 사용할 수 있습니다. 
-d id=123 -d name=webisfree -d number=1004
--data "id=123&name=webisfree&number=1004"
```

 <br/>

-----

## 🐱‍🏍 wget vs. CURL  

  wget 과 curl 은 둘 다 웹 서버로부터 컨텐츠를 가져오는 Linux 커맨드입니다.  
  wget 과 curl 은 거의 유사하지만 조금 다른 부분이 있습니다.  

  우선 둘의 공통된 내용은 아래와 같습니다.

```cs
- HTTP, HTTPS, FTP 프로토콜을 통해 컨텐츠를 다운로드 하는 커맨트 라인 툴입니다.
- HTTP POST request 를 지원합니다. (즉, 웹사이트로 데이터를 전송할 수 있습니다.)
- HTTP 쿠키를 지원합니다.
- 스크립트처럼 사용자 인터렉션없이 수행될 수 있도록 설계되었습니다.
- 오픈소스이며 무료입니다.
- 90년대에 시작한 프로젝트입니다. (wget 은 1995년, curl 은 1996년에 시작했습니다.)
- metalink 를 지원합니다.
```

<br/>

  wget 과 curl 은 아래와 같은 다른 점이 있습니다.  

* wget

      간단하고 직관적입니다. 별도의 라이브러리를 지원하지 않습니다. 재귀적으로 다운로드합니다.  
      (즉, 페이지에 있는 모든 내용이나 FTP 디렉터리에 있는 모든 파일들을 한 번에 그대로 복사해 옵니다.)  
      curl 에 비하여 더 오래되었습니다. GNU 프로젝트입니다.

* curl

      libcurl 라이브러리로 더 강력한 기능들을 추가/사용할 수 있습니다.  
      stdin 또는 stdout 의 pipe 를 이용하는 전통적인 unix 스타일의 방식도 지원합니다.  
      LDAP 이나 Samba 공유도 지원합니다.  
      양방향입니다. (wget 은 일반 HTTP POST request 만 지원합니다.)  
      SSL 을 지원합니다.  
      gzip 압축 및 해지를 지원합니다.  
      MIT 라이센스입니다.  


```toc
```