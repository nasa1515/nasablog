---
emoji: ๐คฆโโ๏ธ
title: "[DATA] - Azure VM์ Apache Spark v3.0 Standalone ์ค์น With Zeppelin"
date: "2021-08-14 00:39:25"
author: nasa1515
tags: DATA
categories: DATA
---



๋จธ๋ฆฌ๋ง  

์ ๋ฒ ํฌ์คํธ์์ Apache Spark๊ฐ ์ด๋ค ์์ผ๋ก ๋์ํ๋์ง? ์ด๋ค ํจ์๊ฐ ์๋์ง? ๊ฐ๋จํ๊ฒ ์ด๋ก ์ ์ผ๋ก๋ง ์์๋ดค์ต๋๋ค.  
์์ง Spark์ ๋ํ ๋ด์ฉ์ด ์ ๋๋ก ์ดํด๊ฐ ๋์ง ์์ ์ผ๋จ ๊ตฌ์ฑ๋ถํฐ ํด๋ณด๊ณ  ์ค์ต์ ํ๋ฉด์ ๋ค์ ์ดํด๋ฅผ ํด๋ณด๊ฒ ์ต๋๋ค.  






  


 
---

## โ Azure VM์ Spark StandAlone ๊ตฌ์ฑ 
* Spark StandAlone Cluster๋ก ๊ตฌ์ฑํ๋ ํฌ์คํธ์๋๋ค. 

<br/>

### ํ๊ฒฝ๊ตฌ์ฑ

  * OS : CentOS Linux release 8.2.2004 (Core)  
  * cpu : 4 core  
  * RAM : 14GB  
  * JDK : 1.8.0
  * python : 3.8.8
  * Spark 3.0.2
  * zeppelin : 0.9.0

<br/> 


---


### 1. Open JDK ์ค์น (root ๊ณ์  ๊ธฐ๋ฐ)

Spark๋ JVM ๊ธฐ๋ฐ์ด๊ธฐ ๋๋ฌธ์ JDK๋ฅผ ๋ฏธ๋ฆฌ ์ค์นํด์ฃผ์ด์ผ ํฉ๋๋ค.  

```cs
[root@Spark-Standalone ~]# yum install -y java-1.8.0-openjdk-devel.x86_64
Last metadata expiration check: 0:28:13 ago on Thu 04 Mar 2021 07:30:20 AM UTC.
...
...
(์ค๋ต)
Complete!
```

<br/>

java version์ ํ์ธํด๋ณด์ฃ   

```cs
[root@Spark-Standalone ~]# java -version
openjdk version "1.8.0_275"
OpenJDK Runtime Environment (build 1.8.0_275-b01)
OpenJDK 64-Bit Server VM (build 25.275-b01, mixed mode)
```

<br/>

---

### 2. Apache Spark ์ค์น (root ๊ณ์  ๊ธฐ๋ฐ)

<br/> 


Spark 3.0.2 ๋ค์ด๋ก๋  

```cs
[root@Spark-Standalone ~]# wget https://downloads.apache.org/spark/spark-3.0.2/spark-3.0.2-bin-hadoop2.7.tgz
```

<br/>


์์ถํด์  ๋ฐ ๊ถํ ์ค์   

```cs
[root@Standalone home]# useradd spark
[root@Standalone home]# cd /home/spark/
[root@Standalone spark]# tar xvfz spark-3.0.2-bin-hadoop2.7.tgz
[root@Standalone spark]# mv spark-3.0.2-bin-hadoop2.7 spark
[root@Standalone spark]# chown -R spark:spark spark
[root@Standalone spark]# chmod -R 777  spark
```

<br/>

Spark ํ๊ฒฝ๋ณ์ ๋ฑ๋ก (spark ๊ณ์ ์ผ๋ก ์ ํ ํ ์งํ)  


```cs
[spark@Spark-Standalone ~]$ echo export PATH='$PATH':/home/spark/spark/bin > ~/.bashrc
[spark@Spark-Standalone ~]$ source ~/.bashrc
```


<br/>

Spark ์ค์น ํ์ธ 

```cs
[spark@Spark-Standalone ~]$ spark-shell
21/03/04 08:37:37 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
Using Spark's default log4j profile: org/apache/spark/log4j-defaults.properties
Setting default log level to "WARN".
To adjust logging level use sc.setLogLevel(newLevel). For SparkR, use setLogLevel(newLevel).
Spark context Web UI available at http://spark-standalone.internal.cloudapp.net:4040
Spark context available as 'sc' (master = local[*], app id = local-1614847063399).
Spark session available as 'spark'.
Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /___/ .__/\_,_/_/ /_/\_\   version 3.0.2
      /_/

Using Scala version 2.12.10 (OpenJDK 64-Bit Server VM, Java 1.8.0_275)
Type in expressions to have them evaluated.
Type :help for more information.

scala>
```


<br/>

Spark Config ์ค์  

```cs
## Spark_HOME์ conf ๋๋ ํ ๋ฆฌ์์ ์ํ

[root@Standalone conf]# cp spark-env.sh.template spark-env.sh
[root@Standalone conf]# vim spark-env.sh


## nasa setting

export SPARK_WORKER_INSTANCES=3 [worker node์ ๋ํ ์ค์ ]
```


Spark Master ํ๋ก์ธ์ค ์คํ

```cs
[root@Standalone sbin]# sh start-master.sh
starting org.apache.spark.deploy.master.Master, logging to /home/spark/spark/logs/spark-root-org.apache.spark.deploy.master.Master-1-Standalone.out
```

<br/>

MASTER WEB ํ์ธ (Cloud๋ผ๋ฉด Inbound ์ค์  ํ์)

![์บก์ฒ3121](https://user-images.githubusercontent.com/69498804/110070522-86df3c80-7dbd-11eb-82cd-85a45eb4eeb2.JPG)

* Worker Node ์ค์ ์ ํ์ํ url์ ๋ฏธ๋ฆฌ ๋ณต์ฌ  
    spark://Standalone.44p1qlnthrou1ezmysbcbmontc.syx.internal.cloudapp.net:7077


<br/>

Worker Node ํ๋ก์ธ์ค ์คํ

์๊น env.sh ์ค์ ์ ๋ง๊ฒ 3๊ฐ์ Worker ๊ฐ ์์ฑ๋ฉ๋๋ค. 

```cs
[root@Standalone sbin]# sh start-slave.sh spark://Standalone.44p1qlnthrou1ezmysbcbmontc.syx.internal.cloudapp.net:7077 -m 2g -c 1
starting org.apache.spark.deploy.worker.Worker, logging to /home/spark/spark/logs/spark-root-org.apache.spark.deploy.worker.Worker-1-Standalone.out
starting org.apache.spark.deploy.worker.Worker, logging to /home/spark/spark/logs/spark-root-org.apache.spark.deploy.worker.Worker-2-Standalone.out
starting org.apache.spark.deploy.worker.Worker, logging to /home/spark/spark/logs/spark-root-org.apache.spark.deploy.worker.Worker-3-Standalone.out
```

<br/>

Master WEB์์ Worker ๋ฑ๋ก ํ์ธ

![44444](https://user-images.githubusercontent.com/69498804/110070820-23a1da00-7dbe-11eb-8014-304fd2583ef8.JPG)


<br/>

---


### 3. Zeppelin ์ค์น (root ๊ณ์  ๊ธฐ๋ฐ)

<br/> 


Zeppelin ๋ค์ด๋ก๋  

```cs
[root@Spark-Standalone zeppelin]# wget https://downloads.apache.org/zeppelin/zeppelin-0.9.0-preview2/zeppelin-0.9.0-preview2-bin-all.tgz
```

<br/>


์์ถํด์  ๋ฐ ๊ถํ ๋ณ๊ฒฝ

```cs
[root@Standalone home]# useradd zeppelin
[root@Standalone home]# cd /home/zeppelin/
[root@Standalone zeppelin]# tar xvfz zeppelin-0.9.0-preview2-bin-all.tgz
[root@Standalone zeppelin]# mv zeppelin-0.9.0-preview2-bin-all zeppelin
[root@Standalone zeppelin]# chown -R zeppelin:zeppelin /home/zeppelin
[root@Standalone zeppelin]# chmod -R 777 /home/zeppelin
```

<br/>

ํ๊ฒฝ ๋ณ์ ๋ฑ๋ก (zeppelin ๊ณ์ ์ผ๋ก ์ ํ ํ ์งํ)  

```cs
[zeppelin@Spark-Standalone ~]$ echo export PATH='$PATH':/home/zeppelin/zeppelin/bin > ~/.bashrc
[zeppelin@Spark-Standalone ~]$ source ~/.bashrc
```

<br/>

Zeppelin ํ๊ฒฝ ์ค์   


```cs
### /home/zeppelin/zeppelin/conf ์์น์์ Conf ํ์ผ ์ค์ 

[root@Spark-Standalone conf]# pwd
/home/zeppelin/zeppelin/conf
[root@Spark-Standalone conf]# cp zeppelin-env.sh.template zeppelin-env.sh

### ์ค์  ์ถ๊ฐ

[root@Spark-Standalone conf]# echo export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk > zeppelin-env.sh
[root@Spark-Standalone conf]# echo export SPARK_HOME=/home/spark/spark >> zeppelin-env.sh


### Web ์ ์์ ์ํ ์ค์ 

[root@Spark-Standalone conf]# cp zeppelin-site.xml.template zeppelin-site.xml
```

<br/>


#### Config ์์ 


zeppelin-site.xml

```cs
...
...
<property>
  <name>zeppelin.server.addr</name>
  <value>127.0.0.1</value> -> Client IP๋ก ๋ณ๊ฒฝ
  <description>Server binding address</description>
</property>

<property>
  <name>zeppelin.server.port</name>
  <value>7777</value>  -> 8080์ Spark๊ฐ ์ฐ๊ณ ์๊ธฐ์ 7777๋ก ์ค์ 
  <description>Server port.</description>
</property>

...
...
```

<br/>


zeppelin-env.sh

์๋ ์ค์  ์ถ๊ฐ  

```cs
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
export SPARK_HOME=/home/spark/spark
export PYSPARK_PYTHON=/home/spark/spark/python
export PYTHONPATH=/home/spark/spark/python
export MASTER=spark://Standalone.44p1qlnthrou1ezmysbcbmontc.syx.internal.cloudapp.net:7077
```


<br/>

Zeppelin Daemon ๊ธฐ๋  

```cs
[root@Spark-Standalone conf]# /home/zeppelin/zeppelin/bin/zeppelin-daemon.sh start
Log dir doesn't exist, create /home/zeppelin/zeppelin/logs
Pid dir doesn't exist, create /home/zeppelin/zeppelin/run
Zeppelin start                                             [  OK  ]


### ์ ์ ๊ธฐ๋ ํ์ธ

[root@Standalone conf]# /home/zeppelin/zeppelin/bin/zeppelin-daemon.sh start
Zeppelin start                                             [  OK  ]
[root@Standalone conf]# jps
3779 ZeppelinServer
3575 Worker
3512 Worker
3449 Worker
3295 Master
3807 Jps
```

<br/>

Zeppelin Web page ํ์ธ [Port 7777]

![์บก์ฒ3333](https://user-images.githubusercontent.com/69498804/109940335-47f5ac00-7d15-11eb-9c86-04ded7a40090.JPG)

<br/>


Notebook์ ํ๋ ๋ง๋ค์ด์ ์ฐ๋ ํ์คํธ๋ฅผ ์งํํฉ๋๋ค. 

![์บก์ฒ4444](https://user-images.githubusercontent.com/69498804/110071856-24d40680-7dc0-11eb-9320-04d58c12ea12.JPG)

์๋ฃ์ธ์ค ์์์ผ๋...  

<br/>

----

#### ERROR ๋ฐ์

python, pyspark๋ฅผ ์ฌ์ฉํ๋ ค๋๋ฐ python interpreter๋ฅผ ๋ชป์ฐพ๋๋ค..  

```cs
org.apache.zeppelin.interpreter.InterpreterException: org.apache.zeppelin.interpreter.InterpreterException: Fail to open PythonInterpreter
	at org.apache.zeppelin.interpreter.LazyOpenInterpreter.open(LazyOpenInterpreter.java:76)
	at org.apache.zeppelin.interpreter.remote.RemoteInterpreterServer$InterpretJob.jobRun(RemoteInterpreterServer.java:760)
	at org.apache.zeppelin.interpreter.remote.RemoteInterpreterServer$InterpretJob.jobRun(RemoteInterpreterServer.java:668)
	at org.apache.zeppelin.scheduler.Job.run(Job.java:172)
	at org.apache.zeppelin.scheduler.AbstractScheduler.runJob(AbstractScheduler.java:130)
	at org.apache.zeppelin.scheduler.FIFOScheduler.lambda$runJobInScheduler$0(FIFOScheduler.java:39)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
Caused by: org.apache.zeppelin.interpreter.InterpreterException: Fail to open PythonInterpreter
	at org.apache.zeppelin.python.PythonInterpreter.open(PythonInterpreter.java:115)
	at org.apache.zeppelin.interpreter.LazyOpenInterpreter.open(LazyOpenInterpreter.java:70)
	... 8 more
Caused by: java.io.IOException: Fail to launch python process.
org.apache.commons.exec.ExecuteException: Execution failed (Exit value: -559038737. Caused by java.io.IOException: Cannot run program "python" (in directory "."): error=2, No such file or directory)
	at org.apache.commons.exec.DefaultExecutor$1.run(DefaultExecutor.java:205)
	at java.lang.Thread.run(Thread.java:748)
Caused by: java.io.IOException: Cannot run program "python" (in directory "."): error=2, No such file or directory
	at java.lang.ProcessBuilder.start(ProcessBuilder.java:1048)
	at java.lang.Runtime.exec(Runtime.java:621)
	at org.apache.commons.exec.launcher.Java13CommandLauncher.exec(Java13CommandLauncher.java:61)
	at org.apache.commons.exec.DefaultExecutor.launch(DefaultExecutor.java:279)
	at org.apache.commons.exec.DefaultExecutor.executeInternal(DefaultExecutor.java:336)
	at org.apache.commons.exec.DefaultExecutor.access$200(DefaultExecutor.java:48)
	at org.apache.commons.exec.DefaultExecutor$1.run(DefaultExecutor.java:200)
	... 1 more
Caused by: java.io.IOException: error=2, No such file or directory
	at java.lang.UNIXProcess.forkAndExec(Native Method)
	at java.lang.UNIXProcess.<init>(UNIXProcess.java:247)
	at java.lang.ProcessImpl.start(ProcessImpl.java:134)
	at java.lang.ProcessBuilder.start(ProcessBuilder.java:1029)
	... 7 more

	at org.apache.zeppelin.python.PythonInterpreter.createGatewayServerAndStartScript(PythonInterpreter.java:160)
	at org.apache.zeppelin.python.PythonInterpreter.open(PythonInterpreter.java:112)
	... 9 more
```

<br/>

ํน์ ๋ชฐ๋ผ python 3.8.8 ๋ฒ์ ์ผ๋ก ์๋ก ์ค์นํด๋ด์๋ค.


์ฌ์  ํ์ผ ์ค์น
```cs
[root@Standalone conf]# yum -y install gcc openssl-devel bzip2-devel libffi-devel
```

<br/> 


ํ์ด์ฌ ์ค์น
```cs
[root@Standalone nasa1515]# wget https://www.python.org/ftp/python/3.8.8/Python-3.8.8.tgz

[root@Standalone nasa1515]# tar xvfz Python-3.8.8.tgz
[root@Standalone nasa1515]# chmod -R 777 Python-3.8.8
[root@Standalone nasa1515]#
[root@Standalone nasa1515]# cd Python-3.8.8
[root@Standalone Python-3.8.8]# ./configure --enable-optimizations
[root@Standalone Python-3.8.8]# make altinstall
[root@Standalone Python-3.8.8]# echo alias python="/usr/local/bin/python3.8" >> /root/.bashrc
[root@Standalone Python-3.8.8]# source /root/.bashrc
[root@Standalone Python-3.8.8]# python -V
Python 3.8.8
```

๊ฒฐ๋ก  : ํ์ด์ฌ์ ๊น๊ณ  ๋ญ ํด๋ด๋ ์๋๋ค...  

<br/>

์ฝ 4์๊ฐ๋์ StackOverFlow๋ฅผ ์ฐพ์๋ค๋ ๊ฒฐ๊ณผ..์๋ ๊ธ์ ๋ฐ๊ฒฌํ๋ค..

* [STACK OverFlow](https://stackoverflow.com/questions/32959723/set-python-path-for-spark-worker)

<br/>


#### ๋ฌธ์  ํด๊ฒฐ  

spark - pyspark๊ฐ python์ ๊ฒฝ๋ก๋ฅผ ๋ชป์ฝ๊ณ  ์๋ค!!  
๊ฐ์ ๋ก env ํ์ผ์ ํ๊ฒฝ๋ณ์๋ก python์ ๊ฒฝ๋ก๋ฅผ ๋ฃ์ด์ฃผ์! 

```cs
### ํ์ด์ฌ ๊ฒฝ๋ก ํ์ธ

[root@Standalone ~]# which python3
/usr/bin/python3


### env.sh ํ์ผ์ ํ๊ฒฝ๋ณ์ ์ค์ 

export PYSPARK_PYTHON="/usr/bin/python3"

```

<br/>

์ ์์ ์ผ๋ก ์ฐ๊ฒฐ!!  

![์บก์ฒ331212](https://user-images.githubusercontent.com/69498804/110093218-cddd2a00-7ddd-11eb-8259-aa1bdfd93880.JPG)


<br/>

Zeppelin์์๋ ์ ์์ ์ผ๋ก ๊ตฌ๋๋๋ค์...

![123123](https://user-images.githubusercontent.com/69498804/110093881-8c994a00-7dde-11eb-8e41-81568de26954.JPG)

<br/>

---

#### Blob Storage์ csv ํ์ผ Upload

๊ธฐ๋ณธ์ ์ผ๋ก Azure์์ Storage๋ Storage Account๋ก ๊ด๋ฆฌ๋ฉ๋๋ค.  
๋๋ฌธ์ ์ฐ์ ์ ์ผ๋ก Storage Account๋ฅผ ์์ฑํ๊ณ  blob container๋ฅผ ์์ฑํด์ผ ํฉ๋๋ค.  

* Storage Account ๋ฐ blob์ ์์ฑ์ [์ด์ ํฌ์คํธ](https://nasa1515.github.io/azure/2021/02/08/AZURE-Storageservice.html#a2)๋ฅผ ํ์ธํ์๋ฉด ๋ฉ๋๋ค.  

<br/>

#### ์ ๋ ๋ค์๊ณผ ๊ฐ์ด TESTDATA.csv ํ์ผ์ blob์ upload ํ์ต๋๋ค.  

![13123123](https://user-images.githubusercontent.com/69498804/110274941-64466100-8013-11eb-8357-ca245d5c6d2f.JPG)


<br/>

#### ERROR ๋ฐ์!


* #### ์๋์ ๋ชฉํ : hadoop(yarn) - Cluster Manager ์์ด Standalone ๊ตฌ์ฑ์ blob storage data read.


* ํด๋น ๊ตฌ์ฑ์ ํ์คํธ ํด๋ณด๋ ค๊ณ  ํ์ผ๋ ๋ค์๊ณผ ๊ฐ์ ERROR ๋ฐ์  

    ![1232313](https://user-images.githubusercontent.com/69498804/110295613-a8962900-8034-11eb-8639-d665dc057275.JPG)


    ํด๋น ์ด์๋ blob(data lake gen2)์์ wasb[s] ํ์์ผ๋ก ํ์ผ์ ๋ฐ์์ค๋ ค ํ์ผ๋  
    Spark ๊ฐ ์ค์น๋์ด์๋ VM์๋ Hadoop์ด ์ค์น ๋ฐ ์ฐ๋์ด ๋์ด์์ง ์๊ธฐ์ DF์ ๋ฃ์ ์ ์๋ ์ด์ ์์ต๋๋ค.  
    ์ฌ์ค pyspark๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ์๋ํด์ Azure blob api๋ฅผ ์ง์  ์ ์ธํด์ https ์ฐ๋์ ํ  ์๋ ์์ง๋ง  
    ๊ทธ๋ ๊ฒ ์ฌ์ฉํ๋ ๋ก์ง์ ์ค์ต์ด๋ ์ค๋ฌด์์๋ ์ ํฉํ์ง ์๋ค๊ณ  ์๊ฐํด์ Hadoop์ ๊น๊ธฐ๋ก ํ์ต๋๋ค.  

<br/>

---

## ๋ง์น๋ฉฐโฆ  

  
๋ง์ง๋ง pyspark ๋ฌธ์ ๋ก ๊ฑฐ์ 4์๊ฐ, hdhfs ๋ฌธ์ ๋ก 4์๊ฐ ๊ฑฐ์ ํ๋ฃจ๋ฅผ ๋ ๋ ธ์ต๋๋ค.  
์๊ฐ์ด ์กฐ๊ธ ์ง๋๋ Spark์ ๋ํ ๋ก์ง์ ์ ๋๋ก ์ดํด ๋ชปํ ๋ถ๋ถ์ด ํฐ ๊ฒ ๊ฐ์ต๋๋ค.  
๊ทธ๋์ ๋ค์ ํฌ์คํธ์์ hadoop์ ์ค์นํ๊ณ  ์ฌ๋์ ํด๋ด์๋ค..  


---

```toc
```


