---
emoji: 🤦‍♂️
title: "[DATA] - Azure VM에 Apache Spark v3.0 Standalone 설치 With Zeppelin"
date: "2021-08-14 00:39:25"
author: nasa1515
tags: DATA
categories: DATA
---



머리말  

저번 포스트에서 Apache Spark가 어떤 식으로 동작하는지? 어떤 함수가 있는지? 간단하게 이론적으로만 알아봤습니다.  
아직 Spark에 대한 내용이 제대로 이해가 되지 않아 일단 구성부터 해보고 실습을 하면서 다시 이해를 해보겠습니다.  






  


 
---

## ✔ Azure VM에 Spark StandAlone 구성 
* Spark StandAlone Cluster로 구성하는 포스트입니다. 

<br/>

### 환경구성

  * OS : CentOS Linux release 8.2.2004 (Core)  
  * cpu : 4 core  
  * RAM : 14GB  
  * JDK : 1.8.0
  * python : 3.8.8
  * Spark 3.0.2
  * zeppelin : 0.9.0

<br/> 


---


### 1. Open JDK 설치 (root 계정 기반)

Spark는 JVM 기반이기 때문에 JDK를 미리 설치해주어야 합니다.  

```cs
[root@Spark-Standalone ~]# yum install -y java-1.8.0-openjdk-devel.x86_64
Last metadata expiration check: 0:28:13 ago on Thu 04 Mar 2021 07:30:20 AM UTC.
...
...
(중략)
Complete!
```

<br/>

java version을 확인해보죠  

```cs
[root@Spark-Standalone ~]# java -version
openjdk version "1.8.0_275"
OpenJDK Runtime Environment (build 1.8.0_275-b01)
OpenJDK 64-Bit Server VM (build 25.275-b01, mixed mode)
```

<br/>

---

### 2. Apache Spark 설치 (root 계정 기반)

<br/> 


Spark 3.0.2 다운로드  

```cs
[root@Spark-Standalone ~]# wget https://downloads.apache.org/spark/spark-3.0.2/spark-3.0.2-bin-hadoop2.7.tgz
```

<br/>


압축해제 및 권한 설정  

```cs
[root@Standalone home]# useradd spark
[root@Standalone home]# cd /home/spark/
[root@Standalone spark]# tar xvfz spark-3.0.2-bin-hadoop2.7.tgz
[root@Standalone spark]# mv spark-3.0.2-bin-hadoop2.7 spark
[root@Standalone spark]# chown -R spark:spark spark
[root@Standalone spark]# chmod -R 777  spark
```

<br/>

Spark 환경변수 등록 (spark 계정으로 전환 후 진행)  


```cs
[spark@Spark-Standalone ~]$ echo export PATH='$PATH':/home/spark/spark/bin > ~/.bashrc
[spark@Spark-Standalone ~]$ source ~/.bashrc
```


<br/>

Spark 설치 확인 

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

Spark Config 설정 

```cs
## Spark_HOME의 conf 디렉토리에서 수행

[root@Standalone conf]# cp spark-env.sh.template spark-env.sh
[root@Standalone conf]# vim spark-env.sh


## nasa setting

export SPARK_WORKER_INSTANCES=3 [worker node에 대한 설정]
```


Spark Master 프로세스 실행

```cs
[root@Standalone sbin]# sh start-master.sh
starting org.apache.spark.deploy.master.Master, logging to /home/spark/spark/logs/spark-root-org.apache.spark.deploy.master.Master-1-Standalone.out
```

<br/>

MASTER WEB 확인 (Cloud라면 Inbound 설정 필요)

![캡처3121](https://user-images.githubusercontent.com/69498804/110070522-86df3c80-7dbd-11eb-82cd-85a45eb4eeb2.JPG)

* Worker Node 설정에 필요한 url을 미리 복사  
    spark://Standalone.44p1qlnthrou1ezmysbcbmontc.syx.internal.cloudapp.net:7077


<br/>

Worker Node 프로세스 실행

아까 env.sh 설정에 맞게 3개의 Worker 가 생성됩니다. 

```cs
[root@Standalone sbin]# sh start-slave.sh spark://Standalone.44p1qlnthrou1ezmysbcbmontc.syx.internal.cloudapp.net:7077 -m 2g -c 1
starting org.apache.spark.deploy.worker.Worker, logging to /home/spark/spark/logs/spark-root-org.apache.spark.deploy.worker.Worker-1-Standalone.out
starting org.apache.spark.deploy.worker.Worker, logging to /home/spark/spark/logs/spark-root-org.apache.spark.deploy.worker.Worker-2-Standalone.out
starting org.apache.spark.deploy.worker.Worker, logging to /home/spark/spark/logs/spark-root-org.apache.spark.deploy.worker.Worker-3-Standalone.out
```

<br/>

Master WEB에서 Worker 등록 확인

![44444](https://user-images.githubusercontent.com/69498804/110070820-23a1da00-7dbe-11eb-8014-304fd2583ef8.JPG)


<br/>

---


### 3. Zeppelin 설치 (root 계정 기반)

<br/> 


Zeppelin 다운로드  

```cs
[root@Spark-Standalone zeppelin]# wget https://downloads.apache.org/zeppelin/zeppelin-0.9.0-preview2/zeppelin-0.9.0-preview2-bin-all.tgz
```

<br/>


압축해제 및 권한 변경

```cs
[root@Standalone home]# useradd zeppelin
[root@Standalone home]# cd /home/zeppelin/
[root@Standalone zeppelin]# tar xvfz zeppelin-0.9.0-preview2-bin-all.tgz
[root@Standalone zeppelin]# mv zeppelin-0.9.0-preview2-bin-all zeppelin
[root@Standalone zeppelin]# chown -R zeppelin:zeppelin /home/zeppelin
[root@Standalone zeppelin]# chmod -R 777 /home/zeppelin
```

<br/>

환경 변수 등록 (zeppelin 계정으로 전환 후 진행)  

```cs
[zeppelin@Spark-Standalone ~]$ echo export PATH='$PATH':/home/zeppelin/zeppelin/bin > ~/.bashrc
[zeppelin@Spark-Standalone ~]$ source ~/.bashrc
```

<br/>

Zeppelin 환경 설정  


```cs
### /home/zeppelin/zeppelin/conf 위치에서 Conf 파일 설정

[root@Spark-Standalone conf]# pwd
/home/zeppelin/zeppelin/conf
[root@Spark-Standalone conf]# cp zeppelin-env.sh.template zeppelin-env.sh

### 설정 추가

[root@Spark-Standalone conf]# echo export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk > zeppelin-env.sh
[root@Spark-Standalone conf]# echo export SPARK_HOME=/home/spark/spark >> zeppelin-env.sh


### Web 접속을 위한 설정

[root@Spark-Standalone conf]# cp zeppelin-site.xml.template zeppelin-site.xml
```

<br/>


#### Config 수정


zeppelin-site.xml

```cs
...
...
<property>
  <name>zeppelin.server.addr</name>
  <value>127.0.0.1</value> -> Client IP로 변경
  <description>Server binding address</description>
</property>

<property>
  <name>zeppelin.server.port</name>
  <value>7777</value>  -> 8080은 Spark가 쓰고있기에 7777로 설정
  <description>Server port.</description>
</property>

...
...
```

<br/>


zeppelin-env.sh

아래 설정 추가  

```cs
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
export SPARK_HOME=/home/spark/spark
export PYSPARK_PYTHON=/home/spark/spark/python
export PYTHONPATH=/home/spark/spark/python
export MASTER=spark://Standalone.44p1qlnthrou1ezmysbcbmontc.syx.internal.cloudapp.net:7077
```


<br/>

Zeppelin Daemon 기동  

```cs
[root@Spark-Standalone conf]# /home/zeppelin/zeppelin/bin/zeppelin-daemon.sh start
Log dir doesn't exist, create /home/zeppelin/zeppelin/logs
Pid dir doesn't exist, create /home/zeppelin/zeppelin/run
Zeppelin start                                             [  OK  ]


### 정상 기동 확인

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

Zeppelin Web page 확인 [Port 7777]

![캡처3333](https://user-images.githubusercontent.com/69498804/109940335-47f5ac00-7d15-11eb-9c86-04ded7a40090.JPG)

<br/>


Notebook을 하나 만들어서 연동 테스트를 진행합니다. 

![캡처4444](https://user-images.githubusercontent.com/69498804/110071856-24d40680-7dc0-11eb-9320-04d58c12ea12.JPG)

완료인줄 알았으나...  

<br/>

----

#### ERROR 발생

python, pyspark를 사용하려는데 python interpreter를 못찾는다..  

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

혹시 몰라 python 3.8.8 버전으로 새로 설치해봅시다.


사전 파일 설치
```cs
[root@Standalone conf]# yum -y install gcc openssl-devel bzip2-devel libffi-devel
```

<br/> 


파이썬 설치
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

결론 : 파이썬을 깔고 뭐 해봐도 안된다...  

<br/>

약 4시간동안 StackOverFlow를 찾아다닌 결과..아래 글을 발견했다..

* [STACK OverFlow](https://stackoverflow.com/questions/32959723/set-python-path-for-spark-worker)

<br/>


#### 문제 해결  

spark - pyspark가 python의 경로를 못읽고 있다!!  
강제로 env 파일에 환경변수로 python의 경로를 넣어주자! 

```cs
### 파이썬 경로 확인

[root@Standalone ~]# which python3
/usr/bin/python3


### env.sh 파일에 환경변수 설정

export PYSPARK_PYTHON="/usr/bin/python3"

```

<br/>

정상적으로 연결!!  

![캡처331212](https://user-images.githubusercontent.com/69498804/110093218-cddd2a00-7ddd-11eb-8259-aa1bdfd93880.JPG)


<br/>

Zeppelin에서도 정상적으로 구동되네요...

![123123](https://user-images.githubusercontent.com/69498804/110093881-8c994a00-7dde-11eb-8e41-81568de26954.JPG)

<br/>

---

#### Blob Storage에 csv 파일 Upload

기본적으로 Azure에서 Storage는 Storage Account로 관리됩니다.  
때문에 우선적으로 Storage Account를 생성하고 blob container를 생성해야 합니다.  

* Storage Account 및 blob의 생성은 [이전포스트](https://nasa1515.github.io/azure/2021/02/08/AZURE-Storageservice.html#a2)를 확인하시면 됩니다.  

<br/>

#### 저는 다음과 같이 TESTDATA.csv 파일을 blob에 upload 했습니다.  

![13123123](https://user-images.githubusercontent.com/69498804/110274941-64466100-8013-11eb-8357-ca245d5c6d2f.JPG)


<br/>

#### ERROR 발생!


* #### 원래의 목표 : hadoop(yarn) - Cluster Manager 없이 Standalone 구성에 blob storage data read.


* 해당 구성을 테스트 해보려고 했으나 다음과 같은 ERROR 발생  

    ![1232313](https://user-images.githubusercontent.com/69498804/110295613-a8962900-8034-11eb-8639-d665dc057275.JPG)


    해당 이슈는 blob(data lake gen2)에서 wasb[s] 형식으로 파일을 받아오려 했으나  
    Spark 가 설치되어있는 VM에는 Hadoop이 설치 및 연동이 되어있지 않기에 DF에 넣을 수 없는 이슈 였습니다.  
    사실 pyspark를 기반으로 작동해서 Azure blob api를 직접 선언해서 https 연동을 할 수는 있지만  
    그렇게 사용하는 로직은 실습이나 실무에서도 적합하지 않다고 생각해서 Hadoop을 깔기로 했습니다.  

<br/>

---

## 마치며…  

  
마지막 pyspark 문제로 거의 4시간, hdhfs 문제로 4시간 거의 하루를 날렸습니다.  
시간이 조금 지나니 Spark에 대한 로직을 제대로 이해 못한 부분이 큰 것 같습니다.  
그래서 다음 포스트에서 hadoop을 설치하고 재도전해봅시다..  


---

```toc
```


