---
emoji: 🤦‍♂️
title: LAPM 서비스 구축하기 [AZURE]
date: "2021-08-01 00:41:25"
author: nasa1515
tags: AZURE
categories: AZURE
---


머리말  

이전에 GCP에서 진행한 것 처럼,  
간단하게 AZURE VM을 사용해 LAMP (Linux, Apache, Mariadb, PHP)를 구성해봤습니다.  
이번 포스트에서는 방법에 대해 자세히 설명하지 않고 구성중에 일어난 이슈(Error)를 주로 다뤘습니다.  



--- 


## ✔ Azure LAPM Architecture

저는 LAPM의 구성에 목적을 두고 있기에 따로 WEB/WAS를 분리해서 구성하지 않았습니다.   
구성끼리 성능차이는 별로 없겠지만, 고가용성을 높이기 위해서는 WEB/WAS를 분리하는 것이 맞습니다.

<br/>

### Architecture  

![123123](https://user-images.githubusercontent.com/69498804/109083598-8efa0500-7749-11eb-84a0-d3133f7366cd.JPG)

* L4 LoadBalancer (Basic) 1대
* WEB/WAS VM : 2대, DB VM : 1대 = 총 3대


<br/>

---


## ✌ VM - PHP, Apache, MariaDB install

<br/>

보통 WEB/WAS를 구성하는데 필요한 패키지들은 여러가지가 있습니다.  
대체로 Tomcat <-> Apache 구성 or PHP<->Apache 구성이 대표적입니다.  
저는 이번에 사용해보지 못했던 php를 기반으로 구성해봤습니다.  


<br/>

### php 설치 

```cs
[root@test ~]# yum -y install php*
CentOS-8 - AppStream (OpenLogic)                                                                                                                             9.7 MB/s |6.1 MB     00:00
CentOS-8 - Base (OpenLogic)                                                                                                                                  3.0 MB/s |2.2 MB     00:00
CentOS-8 - Extras (OpenLogic)                                                                                                                                 55 kB/s |8.9 kB     00:00
CentOS-8 - AppStream                                                                                                                                       676 kB/s | 63 MB     00:09
CentOS-8 - Base                                                                                                                                              6.8 kB/s |2.3 MB     05:44
CentOS-8 - Extras                                                                                                                                            9.1 kB/s |9.0 kB     00:00
CentOS-8 - OpenLogic packages for x86_64                                                                                                                      15 kB/s |3.0 kB     00:00
Dependencies resolved.
============================================================================================================================================================================================
Package                                          Architecture                 Version                                                      Repository                                 Size
============================================================================================================================================================================================
Installing:
php                                              x86_64                       7.2.24-1.module_el8.2.0+313+b04d0a66                          
...
...(중략)

 
--------------------------------------------------------------------------------------

## 설치 확인

[root@test ~]# php -v
PHP 7.2.24 (cli) (built: Oct 22 2019 08:28:36) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.2.24, Copyright (c) 1999-2018, by Zend Technologies
[root@test ~]# php-fpm -v
PHP 7.2.24 (fpm-fcgi) (built: Oct 22 2019 08:28:36)
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.2.24, Copyright (c) 1999-2018, by Zend Technologies



## 서비스 등록
[root@test ~]# systemctl enable php-fpm.service
Created symlink /etc/systemd/system/multi-user.target.wants/php-fpm.service → /usr/lib/systemd/system/php-fpm.service.  

```
Apache와 php를 연동하기 위해서는 php-fpm이 필요하기에 제대로 설치되었는지 확인합니다.  


<br/>
<br/>

### Apache 설치 

```cs
[root@test ~]# yum -y install httpd
Last metadata expiration check: 0:03:41 ago on Thu 25 Feb 2021 01:25:36 AM UTC.
Package httpd-2.4.37-30.module_el8.3.0+561+97fdbbcc.x86_64 is already installed.
Dependencies resolved.
Nothing to do.
Complete!
[root@test ~]#
[root@test ~]#


--------------------------------------------------------------------------------------

## 설치 확인
[root@test ~]# httpd -v
Server version: Apache/2.4.37 (centos)
Server built:   Nov  4 2020 03:20:37
    
    

## 서비스 등록
[root@test ~]# systemctl enable httpd
Created symlink /etc/systemd/system/multi-user.target.wants/httpd.service → /usr/lib/systemd/system/httpd.service.
```


<br/>
<br/>


### MariaDB 설치


```cs
[root@test ~]# yum -y install mariadb mariadb-server
Last metadata expiration check: 0:04:42 ago on Thu 25 Feb 2021 01:25:36 AM UTC.
Package mariadb-connector-c-3.1.11-2.el8_3.x86_64 is already installed.
Package mariadb-connector-c-config-3.1.11-2.el8_3.noarch is already installed.
Dependencies resolved.
============================================================================================================================================================================================
Package                                           Architecture                Version                                                       Repository                                Size
============================================================================================================================================================================================
Installing:
mariadb                                           x86_64                      3:10.3.27-3.module_el8.3.0+599+c587b2e7                       AppStream-openlogic                      6.0 M
mariadb-backup                                    x86_64                      3:10.3.27-3.module_el8.3.0+599+c587b2e7                       AppStream-openlogic                      6.0 M
mariadb-common                                    x86_64                      3:10.3.27-3.module_el8.3.0+599+c587b2e7                       AppStream-openlogic                       63 k
...
...(생략)

--------------------------------------------------------------------------------------


## 서비스 등록

[root@test ~]# systemctl enable mariadb
Created symlink /etc/systemd/system/mysql.service → /usr/lib/systemd/system/mariadb.service.
Created symlink /etc/systemd/system/mysqld.service → /usr/lib/systemd/system/mariadb.service.
Created symlink /etc/systemd/system/multi-user.target.wants/mariadb.service → /usr/lib/systemd/system/mariadb.service.
```

<br/>


---

## 👍 Blog Source 

<br/>

그냥 간단하게 php Test 파일을 만들어서 페이지를 띄울 수도 있지만,  
저는 Blog 오픈소스를 사용해서 페이지를 띄웠습니다.  

<br/>

[Blog Open Source](https://github.com/Nerdmind/Blog)

![캡처2](https://user-images.githubusercontent.com/69498804/109090026-ab03a380-7755-11eb-8847-47dde0cd23db.JPG)

위와 같이 간단하게 php 설정을 할 수 있는 오픈소스로 이루어져 있습니다.  

<br/>

---


## 😉 APM 연동

TOMCAT과 다르게 apache, php를 처음 설치한 초기에는 fpm 기본 연동이 되질 않습니다.  
그래서 다음과 같이 Config 들을 수정해줘야 합니다.  

<br/>

### Apache Config 수정 : /etc/httpd/conf/httpd.conf

```cs
## Config 파일안의 내용들을 수정해줘야 합니다.

DirectoryIndex index.html index.html.var index.php index.php3


AddType application/x-httpd-php .php .html .htm .inc
AddType application/x-httpd-php-source .phps

```

<br/>
<br/>

### php-fpm config 수정 : /etc/php-fpm.d/www.conf

```cs
security.limit_extensions = .php .html .htm .php3 .php4 .php5 .php7
```

<br/>
<br/>

### DB 서버 MariaDB config 수정 : /etc/my.cnf

```cs
## 해당 항목들 추가.

[mysqld]
max_allowed_packet=32M

bind-address        = 0.0.0.0
```
    

<br/>
<br/>

### Blog Source 받아오기 

```cs
## git으로 받아올거기 떄문에 git 부터 설치해줍니다.

[root@test html]# yum -y install git
(생략)
Verifying        : perl-Git-2.27.0-1.el8noarch                                                                                                                                        5/6
Verifying        : perl-TermReadKey-2.37-7.el8x86_64                                                                                                                                  6/6

Installed:
git-2.27.0-1.el8.x86_64 git-core-2.27.0-1.el8.x86_64 git-core-doc-2.27.0-1.el8.noarch perl-Error-1:0.17025-2.el8.noarch perl-Git-2.27.0-1.el8.noarch perl-TermReadKey-237-7.el8.x86_64

Complete!


## git clone

[root@test html]# git clone https://github.com/Nerdmind/Blog.git
Cloning into 'Blog'...
remote: Enumerating objects: 1983, done.
remote: Total 1983 (delta 0), reused 0 (delta 0), pack-reused 1983
Receiving objects: 100% (1983/1983), 450.50 KiB | 576.00 KiB/s, done.
Resolving deltas: 100% (1278/1278), done.

## clone 해온 파일들의 권한 설정 [Apache]

[root@test Blog]# chown -R apache:apache *
[root@test Blog]# chown -R 707 *
```

<br/>
<br/>
    
### Blog Source config 연동 (core/configuration.php) 


```cs
## 파일 이름 변경

[root@test core]# mv configuration-example.php configuration.php


## Config 수정
    
Application::set('CORE.LANGUAGE', 'en');
Application::set('BLOGMETA.NAME', 'My Techblog');
Application::set('BLOGMETA.DESC', '[a creative description]');
Application::set('BLOGMETA.HOME', 'Home');
Application::set('BLOGMETA.MAIL', 'mail@example.org');
Application::set('BLOGMETA.LANG', 'en');
Application::set('DATABASE.HOSTNAME', 'DB Server의 IP');
Application::set('DATABASE.BASENAME', 'DB 이름');
Application::set('DATABASE.USERNAME', 'DB 유저 네임');
Application::set('DATABASE.PASSWORD', 'DB 유저 패스워드');
Application::set('TEMPLATE.NAME', 'default');
Application::set('TEMPLATE.LANG', Application::get('CORE.LANGUAGE'));
Application::set('ADMIN.LANGUAGE', Application::get('CORE.LANGUAGE'));
```


<br/>
<br/>

### DB 설정 


```cs
## DB 패스워드 변경

$ mysql -u root
- 패스워드가 설정되어 있지 않은 상태이므로 그냥 접속할 수 있다.

[root@test core]# mysql -u root
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 8
Server version: 10.3.27-MariaDB MariaDB Server

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.


-------------------------------------------------------------------------------------------


$ use mysql;
- mysql DB 접속

MariaDB [(none)]> use mysql;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [mysql]>

-------------------------------------------------------------------------------------------

$ update user set password=password('123123') where user='root';
$ flush privileges;

- root 계정 패스워드 초기화

MariaDB [mysql]> update user set password=password('123123') where user='root';
Query OK, 4 rows affected (0.000 sec)
Rows matched: 4  Changed: 4  Warnings: 0
MariaDB [mysql]> flush privileges;
Query OK, 0 rows affected (0.000 sec)

```

<br/>
<br/>

### 다른 WEB Server 용 ID 생성 및 권한 할당

```cs
MariaDB [(none)]> SELECT host FROM mysql.user WHERE User = 'root';
+-----------+
| host      |
+-----------+
| %         |
| 127.0.0.1 |
| ::1       |
| db01      |
| localhost |
+-----------+
5 rows in set (0.000 sec)

MariaDB [(none)]> CREATE USER 'root'@'web01' IDENTIFIED BY 'some_pass';
Query OK, 0 rows affected (0.000 sec)

MariaDB [(none)]> CREATE USER 'root'@'web02' IDENTIFIED BY 'some_pass';
Query OK, 0 rows affected (0.000 sec)

MariaDB [(none)]> CREATE USER 'root'@'ip_address' IDENTIFIED BY 'some_pass';
ERROR 1396 (HY000): Operation CREATE USER failed for 'root'@'ip_address'
MariaDB [(none)]> SELECT host FROM mysql.user WHERE User = 'root';
+------------+
| host       |
+------------+
| %          |
| 127.0.0.1  |
| ::1        |
| db01       |
| localhost  |
| web01      |
| web02      |
+------------+
8 rows in set (0.000 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON *.* TO 'root'@'web01';
Query OK, 0 rows affected (0.000 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON *.* TO 'root'@'web02';
Query OK, 0 rows affected (0.000 sec)
```

<br/>
<br/>

### DB data 삽입 : Blog/database.sql

```cs
[root@test Blog]# mysql -u root -p test < database.sql
Enter password:
[root@test Blog]# mysql -u root -p
Enter password:
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 18
Server version: 10.3.27-MariaDB MariaDB Server

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> use test
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [test]> show tables;
+----------------+
| Tables_in_test |
+----------------+
| page           |
| post           |
| user           |
+----------------+
3 rows in set (0.000 sec)

MariaDB [test]>
```


<br/>


---

## 🤣 연동 확인 (페이지 확인)


<br/>

LB IP로 페이지 접속 확인 

![캡처](https://user-images.githubusercontent.com/69498804/109092854-b0172180-775a-11eb-9c3a-eb3baa65609b.JPG)

<br/>


---

## 👀 발생 에러 정리

<br/>


1.Selinux, php 파일의 권한으로 인한 에러 발생

![mysql-php 처음 퍼미션 에러](https://user-images.githubusercontent.com/69498804/109093027-fcfaf800-775a-11eb-9efe-f172e7a0e4c0.JPG)

<br/>

해결방법 

```cs
selinux 종료
$ setenforce 0  

selinux 재시작 방지

$ vim /etc/selinux/config

SELINUX=enforcing -> disabled 로 변경


## 파일 권한은 위에 나와있음 chown, chmod
```

<br/>
<br/>

2.Connection refused ERROR (DB 연동 실패)

![selinux 수정 후 에러](https://user-images.githubusercontent.com/69498804/109093346-8c081000-775b-11eb-9ef1-2dc36c0dfd94.JPG)

<br/>

해결방법 

```cs
1. 위의 DATA USER (root or webserver) 설정 부분을 다시 설정한다.
2. 블로그 소스의 core/configuration.php 파일의 설정을 확인한다.

Application::set('DATABASE.BASENAME', 'blog');
Application::set('DATABASE.USERNAME', '');
Application::set('DATABASE.PASSWORD', '');
Application::set('TEMPLATE.NAME', 'default');

```

<br/>



3.Error Code: 2006 - MySQL server has gone away (DB 패킷 크기 설정)

<br/>

MySQL이나 MariaDB를 사용하다보면 위 오류는 자주 만난다.  
Error 2006의 경우는 대부분 접속이 끊어지거나 Packet의 크기와 관련이 있다.  
해당 에러는 너무 빈번하기 때문에 [mysql 공식 DOC](https://dev.mysql.com/doc/refman/5.7/
en/gone-away.html)에도 해결방법이 설명 되어있다.

<br/>


해결방법 

```cs
## 위의 my.cfg 를 설정 할 때 넣어줬던 설정을 넣으면 됩니다.

[mysqld]
max_allowed_packet=16M 
```

<br/>

---


## 마치며…  


사실 이전에 tomcat 과의 연동으로 web/was를 많이 구성해봤기에 별다른 어려움은 없었습니다.  
약간의 삽질이라면 php를 처음 써봐서 php-fpm 설정을 몰랐다는 것들?  
당연히 모든 ERROR는 GOD stackoverflow를 참고해서 해결했다.


---

```toc
```