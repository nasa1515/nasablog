---
emoji: 🤦‍♂️
title: "[LINUX] - SYSLOGD"
date: "2021-06-23 00:00:57"
author: nasa1515
tags: LINUX
categories: LINUX
---



머리말  

Centos Version이 7로 올라감에 따라 새롭게 기능이 추가된 것 중 하나 입니다.  
실제로 바이너리 로그등을 확인하고, 분석하는데 불편함이 많았었는데 JOUNALCTL은 사용자의 편리함을 제공하는 것 같습니다.  



-----

## ✔ SYSLOG 란? 

기존의 SYSLOG에서는 운영로그, 설치로그, 보안로그 등을 (바이너리,텍스트) 파일의 형태로 남겼었습니다.  
그렇지만 RSYSLOG는 journalD이 추가되며 원시적 로그 파일도 남기게 되면서  
시스템 동작, 운영 로그들을 메모리에 Journal 로그(바이너리)로 생성합니다.  

커널 및 응용 프로그램이 syslog API를 통해 로그 생성시 (r)syslogd 프로세스가 ``(r)syslog.conf`` 설정 파일을 참조하여   
지정한 로그 파일을 콘솔 또는 외부 서버 등에 로그를 기록하게 됩니다.

<br/>

* 로그 관리 데몬

    - systemd-journald : 부팅이 시작 되는 순간부터 로그 수집

    - 이후 rsyslogd로 syslog를 전달하여 각 파일 별로 로그를 저장함


<br/>

* 리눅스 로그파일 종류

    - /var/log/messages : 리눅스 시스템의 전반적인 메세지를 저장

    - /var/log/dmesg : 리눅스가 부팅될 때 출력되는 메세지를 저장  
    [dmesg 명령어로 확인 가능]

    - /var/log/secure : 사용자들의 원격 접속 정보들 저장함
    - 그 외 로그파일 : /var/log/ 경로에 존재. 

<br/>

----


## 👌 rsyslogd 


<br/>

- syslog를 사용하여 로그를 저장하는 프로세스

    - /etc/rsyslog.conf 파일을 사용하여 로그의 종류 및 우선순위 설정  
    수신한 로그를 /var/log로 전달함

    - rsyslog.conf 변경 후 명령어    
    logger –p authpriv.emerg “hello” 와 같은 형태로 확인 가능


<br/>

* 설정 파일

    /etc/(r)syslog.conf 파일은 시스템 로그 데몬이 실행될 때 참조되는  
    로그 설정 파일로서 어떤 로그를 어디에 남길지 로그 저장 규칙이 정의되어 있다.  

<br/>

*   포맷

    ```cs
    facility.priority; facility.priority; facility.priority; ··· ···   action(logfile-location)
         A   .   B          A   .   B         A   .   B                     C
    ```

    * A : 서비스(데몬) 설정
    * B : 로그 레벨 이상의 상황이 발생한 경우를 설정
    * C : (파일, 콘솔, 외부서버 등)으로 로그를 남기라는 의미
	 

<br/>

* ### facility : 로그 생성 서비스

    ```cs
    ㆍ * :  모든 서비스
    ㆍauthpriv : 인증 및 보안 관련 메시지  
    ㆍcron : cron 데몬과 atd데몬에 의해 발생되는 메시지
    ㆍdaemon : telnet, ftp 등과 같은 데몬에 의한 메시지
    ㆍkern : kernel에 의한 메시지
    ㆍlpr : 프린터 데몬인 lpd에 의해 발생되는 메시지
    ㆍmail : sendmail, pop, qmail 등의 메일 시스템에서 발생되는 메시지
    ㆍnews : USENET 등과 같은 뉴스시스템에 의해 발생되는 메시지
    ㆍuser : 사용자에 의해 생성된 프로세스
    ㆍsyslog : syslogd에 의해 발생되는 메시지
    ㆍlocal0 ~ local7 : 시스템 부팅 메시지 기록, 기타 여분 서비스에 사용하기 위함
    ```

<br/>

*  ### priority : 로그 수준(Level)

    ```cs
        높음    
         ㆍ         emerg : 시스템이 전면 중단되는 패닉상태 전체 공지가 필요한 상황 (system is unusable)
         ㆍ         alert : 즉각적인 조치가 필요한 상황 (action must be taken immediately)
         ㆍ         crit  : 하드웨어 등의 심각한 오류가 발생한 상황 (critical condition)
        중간        err   : 일반적인 에러/오류가 발생한 상황
         ㆍ         warning  : 경고 메시지
         ㆍ         notice : 에러/오류는 아니지만 관리자의 조치가 필요한 상황
         ㆍ         info  : 의미 있는 정보 관련 메시지
         ㆍ         debug : 디버깅용 메시지
        낮음          
    ```

    * facility에 로그 수준을 지정하게 되면 해당 수준이상의 상황이 발생했을 때 로그가 남게 된다.  

    * (r)syslog.conf에 로그 수준을 " * " 로 지정하면  모든 로그 수준의 로그를 남기겠다는 의미이며  
    "none"으로 설정하면 어떠한 경우라도 로그를 남기지 않겠다는 의미이다.  

<br/>

* ### action  

    로그를 어디에 남길 것인지를 결정한다. 로그 파일, 콘솔, 원격 로그 서버, 특정 사용자 등에 로그를 남길 수 있다.

    ```cs
    ㆍ로그 파일 : 파일명(경로) 지정 ex) /var/log/messages
    ㆍ콘솔 : /dev/console로 지정 시 콘솔 출력
    ㆍ원격 로그 서버 : "@호스트 주소"를 통해 지정한 호스트로 로그를 보낸다 ex) @192.168.56.3
    ㆍuser : 지정된 사용자의 스크린으로 메시지를 보낸다
    ㆍ* : 현재 로그인 되어있는 모든 사용자의 스크린으로 메시지를 보낸다 
    ```

<br/>

* ### resys.conf 설정 예시

    ```cs
    보안 및 승인에 관한 메세지 중에서 모든 경우를 /var/log/secure 에 보낸다.
    authpriv.*    /var/log/secure

    모든 상황에서 발생하는 메세지 중 info 수준(통계 및 기본정보) 이상인 경우를 
    /var/log/messages에 보낸다. 단, mail 관련 메세지는 제외한다.
    *.info;mail.none    /var/log/messages

    모든 상황에서 발생하는 메세지 중에서 info 수준(통계 및 기본정보) 인 경우를
    /var/log/hihi에 보낸다.
    *.=info    /var/log/hihi                                                 

    mail 관련된 메세지 중에서 info 수준의 메세지를 제외하여 /var/log/maillog에 기록한다.
    mail.*;mail.!=info    /var/log/maillog
    ```

<br/>

---


## 🐱‍🏍 logroate 

리눅스를 운용 할 때 로그를 보고 서버의 상태 혹은 장애를 대비합니다. 대부분의 모든 로그를 남기도록 설정하면 로그 파일의 양은   
시간이 지남에 따라 엄청난 크기로 커져 엄청난 크기로 커지기 전 로그들을 관리하도록 설정하는 기능이 logrotate 입니다.

* Config file path

    ```cs
    - /etc/logrotate.conf
    ```
	
* config 파일 설명

    ```cs
    see "man logrotate" for details
    rotate log files weekly
    weekly               ---[로그파일 순환 기간 설정 (daily, weekly....)

    # keep 4 weeks worth of backlogs
    rotate 4             ---[순환된 로그파일 보관 기간, 순환기간]
    # create new (empty) log files after rotating old ones
    create               ---[순환 후 새 로그파일 생성 여부]

    # use date as a suffix of the rotated file
    dateext            ---[순환된 파일의 파일명 변경 옵션]
    # uncomment this if you want your log files compressed
    #compress          ---[파일의 압축 옵션]
    # RPM packages drop log rotation information into this directory
    include /etc/logrotate.d   ---[로그 순환에 대한 추가 설정 파일]
    # no packages own wtmp and btmp -- we'll rotate them here
    /var/log/wtmp {
        monthly
    create 0664 root utmp
    minsize 1M
    rotate 1
    }                       ---[사용자의 로그인/로그아웃 정보를 저장하는wtmp
    
    로그 설정]
    /var/log/btmp {
        	 missingok
    	monthly
    	create 0600 root utmp
    	rotate 1
    }                       ---[로그인 실패 기록을 저장하는 btmp 로그설정]
    # system-specific logs may be also be configured here.
    ```

<br/>


* ### Cron등록  
    
    - syslog의 순환로그는 /etc/cron.daily/logrotate 파일에 정의되어  
    crontab에서 실행되고 있다.  
    
        - 로테이션을 위해 생성한 /data/logs/won_logrotate 파일을 /etc/logrotate.d/ 하위에 두면 같이 로테이션 됩니다.

        - 또는 해당 원하는 시간에  crontab에 추가하여 별도 관리하여도 된다.


<br/>

* ### 예시  

    1일치 로그로 관리하기 위하여 0시에 순환되도록 아래와 같이 설정한다.

    ```cs
    $ sudo crontab -e

    0 0 * * * /usr/sbin/logrotate -f /data/logs/test_logrotate
    ```


<br/>

* won_logrotate 파일

    ```cs
    ex) /data/logs/won_logrotate

    /data/logs/test.log
    /data/logs/app.log

    # 또는 /data/logs/*.log 로 사용

    {
    rotate 7
    daily
    missingok
    notifempty
    date
    dateyesterday
    }
    ```

<br/>

* logroate 실행 순서
	![](https://t1.daumcdn.net/cfile/tistory/99FEF73E5C986CD310)

<br/>

---

## ✌ systemd-journald 프로세스

- 시스템 부팅 시부터 발생하는 모든 이벤트를 수집해서 바이너리 형태의 저널 데이터로 저장

- 바이너리 파일이라서 cat으로 읽을 수 없고*journalctl 명령을 이용함

- 저널 데이터는 /run/log/journal에 위치하여 재부팅 시 데이터가 삭제됨

- journal을 영구적으로 저장하는 방법


    ① 저장할 디렉토리 만들기 (보통은 /var/log/journal)

    ② chown root:systemd-journal /var/log/journal ← 사용자와 그룹 권한을 설정

    ③ chmod g+s /var/log/journal/ ← setgid 권한 설정

    ④ systemctl restart systemd-journald ← 재시작

<br/>

- journalctl 명령어

    ![스크린샷, 2020-07-16 10-48-21](https://user-images.githubusercontent.com/64260883/87617267-0eeed400-c752-11ea-9f4a-0030897b19fa.png)

<br/>


* SYSLOG VS Journal  

    ![스크린샷, 2020-07-16 14-57-56](https://user-images.githubusercontent.com/64260883/87632698-e1ffe880-c774-11ea-96c0-51865855e540.png)



<br/>

* 로그 관련 디렉토리들의 역할  
    대부분의 리눅스 사용자들은 /var/ 경로는 로그의 저장용도로만 사용하는 줄 알고있다.  
    /var/ 디렉토리는 로그 저장을 기본으로 하되 SPOOL 기능의 역할도 같이 수행한다.

    * /var 역할
		1. 로그 저장
		2. SPOOL 

        ```cs
        /var/spool/mail/

        각 계정사용자들의 메일파일이 저장되는 디렉토리.
        /var/spool/lpd/

        프린트를 하기 위한 임시 디렉토리(스풀링 디렉토리).
        /var/spool/mqueue/

        발송을 위한 메일 일시저장 디렉토리.
        /var/spool/cron/

        각 사용자들의 cron 설정파일들이 저장된 디렉토리.
        /var/spool/at/

        atd 즉, 예약작업에 관한 파일들이 저장되는 디렉토리.
        ```

```toc
```