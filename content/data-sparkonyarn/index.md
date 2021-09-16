---
emoji: 🤦‍♂️
title:  Apache Spark v3.0 on yarn 설치 With Zeppelin [DATA]
date: "2021-08-16 00:39:25"
author: nasa1515
tags: DATA
categories: DATA
---





머리말  

이전에 한번 Standalone Cluster로 Spark를 설치하는 방법을 알아봤습니다.  
그러나 Azure와 연동하는 과정에서 여러가지 문제가 발생했고  
결국 이전 포스트인 Hadoop Cluster를 구성해서 Spark를 구동시키기로 했습니다.  
이번 포스트에서는 설치한 Hadoop Cluster의 yarn에 Spark를 구동시키는 과정입니다.  






  
--- 

## ✔ Spark 설치 

JDK 등의 기본적인 환경설정은 [이전포스트](https://nasa1515.tech/data-sparkinstall/)를 확인해주세요.  
이번 포스트에서는 Spark의 설치보다는 yarn과의 연동부분을 중점으로 둡니다.  


<br/>

* #### Python 설치 (pyspark를 위함)  

    ```cs
    ### 사전 파일 설치
    [root@hadoop-master hadoop]# yum -y install gcc openssl-devel bzip2-devel libffi-devel make


    ### 파이썬 설치 및 환경 설정

    [root@hadoop-master home]# wget https://www.python.org/ftp/python/3.8.8/Python-3.8.8.tgz
    [root@hadoop-master home]# tar xvfz Python-3.8.8.tgz
    [root@hadoop-master home]# rm -rf Python-3.8.8.tgz
    [root@hadoop-master home]# chmod -R 777 Python-3.8.8/
    [root@hadoop-master Python-3.8.8]# ./configure --enable-optimizations
    [root@hadoop-master Python-3.8.8]# make altinstall
    [root@hadoop-master Python-3.8.8]# echo alias python="/usr/local/bin/python3.8" >> /root/.bashrc
    [root@hadoop-master Python-3.8.8]# source /root/.bashrc
    [root@hadoop-master Python-3.8.8]# python -V
    Python 3.8.8
    [root@hadoop-master Python-3.8.8]# which python
    alias python='/usr/local/bin/python3.8'
            /usr/local/bin/python3.8
    ```

<br/>

* #### Spark 계정 설정  

    ```cs
    [root@hadoop-master ~]# useradd spark
    [root@hadoop-master ~]# passwd spark
    [root@hadoop-master ~]# usermod -G wheel spark
    ```

<br/>

* #### Spark 다운로드 및 설치  

    ```cs
    ### Spark 계정 생성 및 설정

    [root@hadoop-master ~]# useradd spark
    [root@hadoop-master ~]# passwd spark
    [root@hadoop-master ~]# usermod -G wheel spark

    ### Spark 3.0.2 Version 다운로드

    [root@hadoop-master spark]# wget https://downloads.apache.org/spark/spark-3.0.2/spark-3.0.2-bin-hadoop2.7.tgz
    --2021-03-10 01:27:27--  https://downloads.apache.org/spark/spark-3.0.2/spark-3.0.2-bin-hadoop2.7.tgz

    ### 압축 해제 및 권한 설정
    [root@hadoop-master spark]# tar xvfz spark-3.0.2-bin-hadoop2.7.tgz
    [root@hadoop-master spark]# mv spark-3.0.2-bin-hadoop2.7 spar
    [root@hadoop-master spark]# chown -R spark:spark spark
    [root@hadoop-master spark]# chmod -R 777 spark
    ```

<br/>

* #### Spark 환경변수 등록 (Spark 계정, Hadoop 계정 진행)  


    ```cs
    [spark@hadoop-master ~]$ echo export PATH='$PATH':/home/spark/spark/bin >> ~/.bashrc
    [spark@hadoop-master ~]$ echo export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64" >> ~/.bashrc
    [spark@hadoop-master ~]$ tail -1 ~/.bashrc
    export PATH=$PATH:/home/spark/spark/bin
    [spark@hadoop-master ~]$ soruce ~/.bashrc
    bash: soruce: command not found
    [spark@hadoop-master ~]$ source ~/.bashrc
    [spark@hadoop-master ~]$ echo $PATH
    /home/spark/.local/bin:/home/spark/bin:/home/spark/.local/bin:/home/spark/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64/bin:/usr/local/hadoop/bin:/usr/local/hadoop/sbin::/root/bin:/home/spark/spark/bin
    ```

    <br/>

* #### Spark Config 설정 

    ```cs
    #### spark-env.sh 에 다음 설정 추가

    ## nasa settin

    ## nasa settin

    export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64"
    export SPARK_WORKER_INSTANCES=2
    export PYSPARK_PYTHON="/usr/bin/python3"
    export HADOOP_HOME="/usr/local/hadoop"
    export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
    export YARN_CONF_DIR=$HADOOP_HOME/etc/hadoop    


    #### spark-defaults.conf 설정

    [spark@hadoop-master conf]$ cp spark-defaults.conf.template spark-defaults.conf
    [spark@hadoop-master conf]$ vim spark-defaults.conf

    ## 설정 추가    
    spark.master                    yarn
    spark.deploy.mode               client
    ```

<br/>


* #### Spark, pyspark 동작 확인 

    ```cs
    ### Spark-shell 동작확인

    [spark@hadoop-master root]$ spark-shell
    21/03/10 01:56:03 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
    Using Spark's default log4j profile: org/apache/spark/log4j-defaults.properties
    Setting default log level to "WARN".
    To adjust logging level use sc.setLogLevel(newLevel). For SparkR, use setLogLevel(newLevel).
    Spark context Web UI available at http://hadoop-master:4040
    Spark context available as 'sc' (master = local[*], app id = local-1615341369333).
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




    ### pyspark 동작 확인

    [spark@hadoop-master conf]$ pyspark
    Python 3.6.8 (default, Apr 16 2020, 01:36:27)
    [GCC 8.3.1 20191121 (Red Hat 8.3.1-5)] on linux
    Type "help", "copyright", "credits" or "license" for more information.
    21/03/10 01:59:44 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
    Using Spark's default log4j profile: org/apache/spark/log4j-defaults.properties
    Setting default log level to "WARN".
    To adjust logging level use sc.setLogLevel(newLevel). For SparkR, use setLogLevel(newLevel).
    Welcome to
        ____              __
        / __/__  ___ _____/ /__
        _\ \/ _ \/ _ `/ __/  '_/
    /__ / .__/\_,_/_/ /_/\_\   version 3.0.2
        /_/

    Using Python version 3.6.8 (default, Apr 16 2020 01:36:27)
    SparkSession available as 'spark'.
    >>> 1+2
    3
    ```

<br/>

* #### YARN 에서 SPARK APP이 제대로 구동되는지 확인 겸 스크립트를 만들어보죠 


    어제 hdfs에 올려논 test data의 session수를 얻는 간단한 스크립트 

    ```cs
    [hadoop@hadoop-master nasa1515]$ hdfs dfs -ls /
    Found 1 items
    -rw-r--r--   3 hadoop supergroup  500253789 2021-03-09 08:47 /nasa.csv
    ```

    ```cs
    from pyspark.sql import SparkSession

    spark = SparkSession \
        .builder \
        .appName("Python Spark SQL basic example") \
        .getOrCreate()

    df = spark.read.option("header","true").csv('hdfs:/nasa.csv').cache()

    df.show()
    ```

<br/>

* #### 해당 스크립트를 돌려봅시다 

    ```cs
    [spark@hadoop-master conf]$ spark-submit --master yarn --deploy-mode client --executor-memory 1g /home/spark/test.py
    2021-03-10 02:20:10,493 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
    2021-03-10 02:20:11,137 INFO spark.SparkContext: Running Spark version 3.0.2
    2021-03-10 02:20:11,177 INFO resource.ResourceUtils: ==============================================================
    2021-03-10 02:20:11,185 INFO resource.ResourceUtils: Resources for spark.driver:
    ...
    ...(중략)

    2021-03-10 02:20:40,402 INFO spark.SparkContext: Invoking stop() from shutdown hook
    2021-03-10 02:20:40,410 INFO server.AbstractConnector: Stopped Spark@6f05fe89{HTTP/1.1, (http/1.1)}{0.0.0.0:4040}
    2021-03-10 02:20:40,412 INFO ui.SparkUI: Stopped Spark web UI at http://hadoop-master:4040
    2021-03-10 02:20:40,416 INFO cluster.YarnClientSchedulerBackend: Interrupting monitor thread
    2021-03-10 02:20:40,438 INFO cluster.YarnClientSchedulerBackend: Shutting down all executors
    2021-03-10 02:20:40,438 INFO cluster.YarnSchedulerBackend$YarnDriverEndpoint: Asking each executor to shut down
    2021-03-10 02:20:40,443 INFO cluster.YarnClientSchedulerBackend: YARN client scheduler backend Stopped
    2021-03-10 02:20:40,452 INFO spark.MapOutputTrackerMasterEndpoint: MapOutputTrackerMasterEndpoint stopped!
    2021-03-10 02:20:40,463 INFO memory.MemoryStore: MemoryStore cleared
    2021-03-10 02:20:40,464 INFO storage.BlockManager: BlockManager stopped
    2021-03-10 02:20:40,469 INFO storage.BlockManagerMaster: BlockManagerMaster stopped
    2021-03-10 02:20:40,475 INFO scheduler.OutputCommitCoordinator$OutputCommitCoordinatorEndpoint: OutputCommitCoordinator stopped!
    2021-03-10 02:20:40,497 INFO spark.SparkContext: Successfully stopped SparkContext
    2021-03-10 02:20:40,498 INFO util.ShutdownHookManager: Shutdown hook called
    2021-03-10 02:20:40,498 INFO util.ShutdownHookManager: Deleting directory /tmp/spark-b04d174a-0be5-44ee-87ad-8915e64b3d51
    2021-03-10 02:20:40,501 INFO util.ShutdownHookManager: Deleting directory /tmp/spark-b04d174a-0be5-44ee-87ad-8915e64b3d51/pyspark-5cf80ddf-89c1-4330-93c8-28e2f93b6c08
    2021-03-10 02:20:40,510 INFO util.ShutdownHookManager: Deleting directory /tmp/spark-dd89ea67-71be-4e21-ba16-ee7623fea72a
    ```

<br/>

* #### 이제 Hadoop의 Manager WEB에서 확인이 가능합니다.  

    ![123123123123](https://user-images.githubusercontent.com/69498804/110577703-858b8680-81a6-11eb-879b-2ad3f739c549.JPG)


<br/>

* #### 그럼 spark를 가동시켜주고

    ```cs
    [spark@hadoop-master sbin]$ start-master.sh
    starting org.apache.spark.deploy.master.Master, logging to /home/spark/spark/logs/spark-spark-org.apache.spark.deploy.master.Master-1-hadoop-master.out

    [spark@hadoop-master sbin]$ start-slave.sh spark://hadoop-master:7077
    starting org.apache.spark.deploy.worker.Worker, logging to /home/spark/spark/logs/spark-spark-org.apache.spark.deploy.worker.Worker-1-hadoop-master.out
    starting org.apache.spark.deploy.worker.Worker, logging to /home/spark/spark/logs/spark-spark-org.apache.spark.deploy.worker.Worker-2-hadoop-master.out
    ```

<br/>

---

## ✌ Zeppelin 설치 후 연동을 확인해봅시다.

* #### Zepplein 설치 및 권한 설정

    ```cs
    [root@hadoop-master ~]# useradd zeppelin
    [root@hadoop-master ~]# passwd zeppelin
    [root@hadoop-master ~]# cd /home/zeppelin/
    [root@hadoop-master zeppelin]# wget https://downloads.apachewget https://downloads.apache.org/zeppelin/zeppelin-0.9.0-preview2/zeppelin-0.9.0-preview2-bin-all.tgz
    [root@hadoop-master zeppelin]# tar xvfz zeppelin-0.9.0-preview2-bin-all.tgz
    [root@hadoop-master zeppelin]# mv zeppelin-0.9.0-preview2-bin-all zeppelin
    [root@hadoop-master zeppelin]# chown -R zeppelin:zeppelin zeppelin
    [root@hadoop-master zeppelin]# chmod -R 777 zeppelin
    ```

    <br/>

* #### 환경변수 설정 [zeppelin 계정]


    ```cs
    [zeppelin@hadoop-master ~]$ echo export PATH="$PATH:/home/zeppelin/zeppelin/bin" >> ~/.bashrc
    [zeppelin@hadoop-master ~]$ source ~/.bashrc

    ### 총 내용 

    export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64"
    export HADOOP_HOME="/usr/local/hadoop"
    export SPARK_HOME="/home/spark/spark"
    export PATH="$PATH:$JAVA_HOME/bin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:"
    export LD_LIBRARY_PATH=$HADOOP_HOME/lib/native:$LD_LIBRARY_PATH
    export PATH=$PATH:$SPARK_HOME/bin:$HADDOP_HOME/bin:$HADOOP_HOME/sbin
    ```

    <br/>

* #### Zeppelin 환경 설정 

    ```cs
    [zeppelin@hadoop-master ~]$ cd /home/zeppelin/zeppelin/conf
    [zeppelin@hadoop-master conf]$ cp zeppelin-env.sh.template zeppelin-env.sh


    ### 설정 추가


   
    export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64"
    export SPARK_HOME="/home/spark/spark"
    export MASTER=yarn-client
    export HADOOP_HOME="/usr/local/hadoop"
    export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
    export YARN_CONF_DIR=$HADOOP_HOME/etc/hadoop


    ### zeppelin-site.xml 수정

    zeppelin-site.xml
    ...
    ...
    <property>
    <name>zeppelin.server.addr</name>
    <value>10.0.0.5</value> -> Client IP로 변경
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


* #### Zeppelin 기동 테스트 

    ```cs
    [zeppelin@hadoop-master conf]$ zeppelin-daemon.sh start
    ```


    ![12313231](https://user-images.githubusercontent.com/69498804/110597015-651df500-81c3-11eb-8cb1-371a512f7b8b.JPG)

    <br/>


* #### 아참! zeppelin-env 설정이 적용이 안되는 이슈가 있었습니다 ㅠㅠ 
    그래서 저는 직접 zeppelin web의 Interpreter 설정을 수정했습니다.  
    ![캡처1231321](https://user-images.githubusercontent.com/69498804/110597241-9e566500-81c3-11eb-980d-43b03fa5d704.JPG)

    <br/>

    다음과 같이 Spark.matser, deploymode를 수정해줍니다. 

    ![12312313231](https://user-images.githubusercontent.com/69498804/110597343-c645c880-81c3-11eb-9c6c-06b1ce953c44.JPG)

<br/>


* #### 그럼 아까 test로 작성했던 코드가 동작하는지 확인해보죠 

    ![12312312312312312321312](https://user-images.githubusercontent.com/69498804/110597530-060cb000-81c4-11eb-933f-6b914cabd5b4.JPG)

    아주 잘 돌아갑니다. 


<br/>


* #### 그럼 yarn manager에서도 확인이 가능한지 봅시다

    ![1111111](https://user-images.githubusercontent.com/69498804/110597695-3c4a2f80-81c4-11eb-9c1a-365dc2c8d727.JPG)

    다음과 같이 zeppelin app의 동작을 확인 할 수 있습니다!! 

<br/>

---

## 마치며…  

  
여러가지 문제가 있었지만 그래도 하루만에 성공했습니다.  
이제 드디어 pyspark 문법이나 data를 다루는 방법들에 대해서 실습하겠네요.  
추가적으로 ambari 설치해서 클러스터도 모니터링 해보겠습니다.  


<br/>

---


```toc
```