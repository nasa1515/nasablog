---
emoji: ๐คฆโโ๏ธ
title: "[AZURE] LAPM ์๋น์ค ๊ตฌ์ถํ๊ธฐ"
date: "2021-08-01 00:41:25"
author: nasa1515
tags: CLOUD
categories: CLOUD
---


๋จธ๋ฆฌ๋ง  

์ด์ ์ GCP์์ ์งํํ ๊ฒ ์ฒ๋ผ,  
๊ฐ๋จํ๊ฒ AZURE VM์ ์ฌ์ฉํด LAMP (Linux, Apache, Mariadb, PHP)๋ฅผ ๊ตฌ์ฑํด๋ดค์ต๋๋ค.  
์ด๋ฒ ํฌ์คํธ์์๋ ๋ฐฉ๋ฒ์ ๋ํด ์์ธํ ์ค๋ชํ์ง ์๊ณ  ๊ตฌ์ฑ์ค์ ์ผ์ด๋ ์ด์(Error)๋ฅผ ์ฃผ๋ก ๋ค๋ค์ต๋๋ค.  



--- 


## โ Azure LAPM Architecture

์ ๋ LAPM์ ๊ตฌ์ฑ์ ๋ชฉ์ ์ ๋๊ณ  ์๊ธฐ์ ๋ฐ๋ก WEB/WAS๋ฅผ ๋ถ๋ฆฌํด์ ๊ตฌ์ฑํ์ง ์์์ต๋๋ค.   
๊ตฌ์ฑ๋ผ๋ฆฌ ์ฑ๋ฅ์ฐจ์ด๋ ๋ณ๋ก ์๊ฒ ์ง๋ง, ๊ณ ๊ฐ์ฉ์ฑ์ ๋์ด๊ธฐ ์ํด์๋ WEB/WAS๋ฅผ ๋ถ๋ฆฌํ๋ ๊ฒ์ด ๋ง์ต๋๋ค.

<br/>

### Architecture  

![123123](https://user-images.githubusercontent.com/69498804/109083598-8efa0500-7749-11eb-84a0-d3133f7366cd.JPG)

* L4 LoadBalancer (Basic) 1๋
* WEB/WAS VM : 2๋, DB VM : 1๋ = ์ด 3๋


<br/>

---


## โ VM - PHP, Apache, MariaDB install

<br/>

๋ณดํต WEB/WAS๋ฅผ ๊ตฌ์ฑํ๋๋ฐ ํ์ํ ํจํค์ง๋ค์ ์ฌ๋ฌ๊ฐ์ง๊ฐ ์์ต๋๋ค.  
๋์ฒด๋ก Tomcat <-> Apache ๊ตฌ์ฑ or PHP<->Apache ๊ตฌ์ฑ์ด ๋ํ์ ์๋๋ค.  
์ ๋ ์ด๋ฒ์ ์ฌ์ฉํด๋ณด์ง ๋ชปํ๋ php๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ๊ตฌ์ฑํด๋ดค์ต๋๋ค.  


<br/>

### php ์ค์น 

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
...(์ค๋ต)

 
--------------------------------------------------------------------------------------

## ์ค์น ํ์ธ

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



## ์๋น์ค ๋ฑ๋ก
[root@test ~]# systemctl enable php-fpm.service
Created symlink /etc/systemd/system/multi-user.target.wants/php-fpm.service โ /usr/lib/systemd/system/php-fpm.service.  

```
Apache์ php๋ฅผ ์ฐ๋ํ๊ธฐ ์ํด์๋ php-fpm์ด ํ์ํ๊ธฐ์ ์ ๋๋ก ์ค์น๋์๋์ง ํ์ธํฉ๋๋ค.  


<br/>
<br/>

### Apache ์ค์น 

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

## ์ค์น ํ์ธ
[root@test ~]# httpd -v
Server version: Apache/2.4.37 (centos)
Server built:   Nov  4 2020 03:20:37
    
    

## ์๋น์ค ๋ฑ๋ก
[root@test ~]# systemctl enable httpd
Created symlink /etc/systemd/system/multi-user.target.wants/httpd.service โ /usr/lib/systemd/system/httpd.service.
```


<br/>
<br/>


### MariaDB ์ค์น


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
...(์๋ต)

--------------------------------------------------------------------------------------


## ์๋น์ค ๋ฑ๋ก

[root@test ~]# systemctl enable mariadb
Created symlink /etc/systemd/system/mysql.service โ /usr/lib/systemd/system/mariadb.service.
Created symlink /etc/systemd/system/mysqld.service โ /usr/lib/systemd/system/mariadb.service.
Created symlink /etc/systemd/system/multi-user.target.wants/mariadb.service โ /usr/lib/systemd/system/mariadb.service.
```

<br/>


---

## ๐ Blog Source 

<br/>

๊ทธ๋ฅ ๊ฐ๋จํ๊ฒ php Test ํ์ผ์ ๋ง๋ค์ด์ ํ์ด์ง๋ฅผ ๋์ธ ์๋ ์์ง๋ง,  
์ ๋ Blog ์คํ์์ค๋ฅผ ์ฌ์ฉํด์ ํ์ด์ง๋ฅผ ๋์ ์ต๋๋ค.  

<br/>

[Blog Open Source](https://github.com/Nerdmind/Blog)

![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/109090026-ab03a380-7755-11eb-8847-47dde0cd23db.JPG)

์์ ๊ฐ์ด ๊ฐ๋จํ๊ฒ php ์ค์ ์ ํ  ์ ์๋ ์คํ์์ค๋ก ์ด๋ฃจ์ด์ ธ ์์ต๋๋ค.  

<br/>

---


## ๐ APM ์ฐ๋

TOMCAT๊ณผ ๋ค๋ฅด๊ฒ apache, php๋ฅผ ์ฒ์ ์ค์นํ ์ด๊ธฐ์๋ fpm ๊ธฐ๋ณธ ์ฐ๋์ด ๋์ง ์์ต๋๋ค.  
๊ทธ๋์ ๋ค์๊ณผ ๊ฐ์ด Config ๋ค์ ์์ ํด์ค์ผ ํฉ๋๋ค.  

<br/>

### Apache Config ์์  : /etc/httpd/conf/httpd.conf

```cs
## Config ํ์ผ์์ ๋ด์ฉ๋ค์ ์์ ํด์ค์ผ ํฉ๋๋ค.

DirectoryIndex index.html index.html.var index.php index.php3


AddType application/x-httpd-php .php .html .htm .inc
AddType application/x-httpd-php-source .phps

```

<br/>
<br/>

### php-fpm config ์์  : /etc/php-fpm.d/www.conf

```cs
security.limit_extensions = .php .html .htm .php3 .php4 .php5 .php7
```

<br/>
<br/>

### DB ์๋ฒ MariaDB config ์์  : /etc/my.cnf

```cs
## ํด๋น ํญ๋ชฉ๋ค ์ถ๊ฐ.

[mysqld]
max_allowed_packet=32M

bind-address        = 0.0.0.0
```
    

<br/>
<br/>

### Blog Source ๋ฐ์์ค๊ธฐ 

```cs
## git์ผ๋ก ๋ฐ์์ฌ๊ฑฐ๊ธฐ ๋๋ฌธ์ git ๋ถํฐ ์ค์นํด์ค๋๋ค.

[root@test html]# yum -y install git
(์๋ต)
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

## clone ํด์จ ํ์ผ๋ค์ ๊ถํ ์ค์  [Apache]

[root@test Blog]# chown -R apache:apache *
[root@test Blog]# chown -R 707 *
```

<br/>
<br/>
    
### Blog Source config ์ฐ๋ (core/configuration.php) 


```cs
## ํ์ผ ์ด๋ฆ ๋ณ๊ฒฝ

[root@test core]# mv configuration-example.php configuration.php


## Config ์์ 
    
Application::set('CORE.LANGUAGE', 'en');
Application::set('BLOGMETA.NAME', 'My Techblog');
Application::set('BLOGMETA.DESC', '[a creative description]');
Application::set('BLOGMETA.HOME', 'Home');
Application::set('BLOGMETA.MAIL', 'mail@example.org');
Application::set('BLOGMETA.LANG', 'en');
Application::set('DATABASE.HOSTNAME', 'DB Server์ IP');
Application::set('DATABASE.BASENAME', 'DB ์ด๋ฆ');
Application::set('DATABASE.USERNAME', 'DB ์ ์  ๋ค์');
Application::set('DATABASE.PASSWORD', 'DB ์ ์  ํจ์ค์๋');
Application::set('TEMPLATE.NAME', 'default');
Application::set('TEMPLATE.LANG', Application::get('CORE.LANGUAGE'));
Application::set('ADMIN.LANGUAGE', Application::get('CORE.LANGUAGE'));
```


<br/>
<br/>

### DB ์ค์  


```cs
## DB ํจ์ค์๋ ๋ณ๊ฒฝ

$ mysql -u root
- ํจ์ค์๋๊ฐ ์ค์ ๋์ด ์์ง ์์ ์ํ์ด๋ฏ๋ก ๊ทธ๋ฅ ์ ์ํ  ์ ์๋ค.

[root@test core]# mysql -u root
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 8
Server version: 10.3.27-MariaDB MariaDB Server

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.


-------------------------------------------------------------------------------------------


$ use mysql;
- mysql DB ์ ์

MariaDB [(none)]> use mysql;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [mysql]>

-------------------------------------------------------------------------------------------

$ update user set password=password('123123') where user='root';
$ flush privileges;

- root ๊ณ์  ํจ์ค์๋ ์ด๊ธฐํ

MariaDB [mysql]> update user set password=password('123123') where user='root';
Query OK, 4 rows affected (0.000 sec)
Rows matched: 4  Changed: 4  Warnings: 0
MariaDB [mysql]> flush privileges;
Query OK, 0 rows affected (0.000 sec)

```

<br/>
<br/>

### ๋ค๋ฅธ WEB Server ์ฉ ID ์์ฑ ๋ฐ ๊ถํ ํ ๋น

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

### DB data ์ฝ์ : Blog/database.sql

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

## ๐คฃ ์ฐ๋ ํ์ธ (ํ์ด์ง ํ์ธ)


<br/>

LB IP๋ก ํ์ด์ง ์ ์ ํ์ธ 

![์บก์ฒ](https://user-images.githubusercontent.com/69498804/109092854-b0172180-775a-11eb-9c3a-eb3baa65609b.JPG)

<br/>


---

## ๐ ๋ฐ์ ์๋ฌ ์ ๋ฆฌ

<br/>


1.Selinux, php ํ์ผ์ ๊ถํ์ผ๋ก ์ธํ ์๋ฌ ๋ฐ์

![mysql-php ์ฒ์ ํผ๋ฏธ์ ์๋ฌ](https://user-images.githubusercontent.com/69498804/109093027-fcfaf800-775a-11eb-9efe-f172e7a0e4c0.JPG)

<br/>

ํด๊ฒฐ๋ฐฉ๋ฒ 

```cs
selinux ์ข๋ฃ
$ setenforce 0  

selinux ์ฌ์์ ๋ฐฉ์ง

$ vim /etc/selinux/config

SELINUX=enforcing -> disabled ๋ก ๋ณ๊ฒฝ


## ํ์ผ ๊ถํ์ ์์ ๋์์์ chown, chmod
```

<br/>
<br/>

2.Connection refused ERROR (DB ์ฐ๋ ์คํจ)

![selinux ์์  ํ ์๋ฌ](https://user-images.githubusercontent.com/69498804/109093346-8c081000-775b-11eb-9ef1-2dc36c0dfd94.JPG)

<br/>

ํด๊ฒฐ๋ฐฉ๋ฒ 

```cs
1. ์์ DATA USER (root or webserver) ์ค์  ๋ถ๋ถ์ ๋ค์ ์ค์ ํ๋ค.
2. ๋ธ๋ก๊ทธ ์์ค์ core/configuration.php ํ์ผ์ ์ค์ ์ ํ์ธํ๋ค.

Application::set('DATABASE.BASENAME', 'blog');
Application::set('DATABASE.USERNAME', '');
Application::set('DATABASE.PASSWORD', '');
Application::set('TEMPLATE.NAME', 'default');

```

<br/>



3.Error Code: 2006 - MySQL server has gone away (DB ํจํท ํฌ๊ธฐ ์ค์ )

<br/>

MySQL์ด๋ MariaDB๋ฅผ ์ฌ์ฉํ๋ค๋ณด๋ฉด ์ ์ค๋ฅ๋ ์์ฃผ ๋ง๋๋ค.  
Error 2006์ ๊ฒฝ์ฐ๋ ๋๋ถ๋ถ ์ ์์ด ๋์ด์ง๊ฑฐ๋ Packet์ ํฌ๊ธฐ์ ๊ด๋ จ์ด ์๋ค.  
ํด๋น ์๋ฌ๋ ๋๋ฌด ๋น๋ฒํ๊ธฐ ๋๋ฌธ์ [mysql ๊ณต์ DOC](https://dev.mysql.com/doc/refman/5.7/
en/gone-away.html)์๋ ํด๊ฒฐ๋ฐฉ๋ฒ์ด ์ค๋ช ๋์ด์๋ค.

<br/>


ํด๊ฒฐ๋ฐฉ๋ฒ 

```cs
## ์์ my.cfg ๋ฅผ ์ค์  ํ  ๋ ๋ฃ์ด์คฌ๋ ์ค์ ์ ๋ฃ์ผ๋ฉด ๋ฉ๋๋ค.

[mysqld]
max_allowed_packet=16M 
```

<br/>

---


## ๋ง์น๋ฉฐโฆ  


์ฌ์ค ์ด์ ์ tomcat ๊ณผ์ ์ฐ๋์ผ๋ก web/was๋ฅผ ๋ง์ด ๊ตฌ์ฑํด๋ดค๊ธฐ์ ๋ณ๋ค๋ฅธ ์ด๋ ค์์ ์์์ต๋๋ค.  
์ฝ๊ฐ์ ์ฝ์ง์ด๋ผ๋ฉด php๋ฅผ ์ฒ์ ์จ๋ด์ php-fpm ์ค์ ์ ๋ชฐ๋๋ค๋ ๊ฒ๋ค?  
๋น์ฐํ ๋ชจ๋  ERROR๋ GOD stackoverflow๋ฅผ ์ฐธ๊ณ ํด์ ํด๊ฒฐํ๋ค.


---

```toc
```