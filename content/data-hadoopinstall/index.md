---
emoji: π€¦ββοΈ
title: "[DATA] - Hadoop 3.3.0 Full Distribute mode infra κ΅¬μΆ"
date: "2021-08-15 00:39:25"
author: nasa1515
tags: DATA
categories: DATA
---



λ¨Έλ¦¬λ§  

μμ΄ λ§λ§ν©λλ€. μ λ² ν¬μ€νΈμμ μ΄λ―Έ μΈνλΌ κ΅¬μ±μ λλμ΄μΌ νλλ°... μ΄λ² ν¬μ€νΈμμλΌλ λ§λ¬΄λ¦¬ μ§μ΄λ³΄μ£   

--- 

## β μ€μΉ νκ²½ 

* #### Hadoop 3.3.0 (Full-Distribute Mode)

    |Server|Master|Worker1|Worker2|
    |---|:---:|:---:|:---:|
    |OS|CentOS 8.2|CentOS 8.2|CentOS 8.2|
    |Disk|30G|30G|30G|
    |MEM|14G|14G|14G|
    |CPU|4.Core|4.Core|4.Core|

<br/>

* VM (Azure)

    * Hadoop Master IP : 10.0.0.5 
    * Hadoop Worker1 IP : 10.0.0.6 
    * Hadoop Worker2 IP : 10.0.0.7 

<br/>

---

## β Hadoop μ€μΉ μ  μ¬μ  μμ


<br/>

* #### κ° μλ²λ³ HOSTNAME μ€μ  λ° hosts μ€μ  [μ  μλ² λμΌ]  

    ```cs
    [root@hadoop-master ~]# cat /etc/hosts
    10.0.0.5        hadoop-master
    10.0.0.6        hadoop-worker
    10.0.0.7        hadoop-worker2
    ```

<br/>

* #### hadoop μ¬μ©μ μμ±

    ```cs
    [root@hadoop-master ~]# useradd -m hadoop
    [root@hadoop-master ~]# passwd hadoop
    Changing password for user hadoop.
    New password:
    BAD PASSWORD: The password is shorter than 8 characters
    Retype new password:
    passwd: all authentication tokens updated successfully.
    [root@hadoop-master ~]# usermod -G wheel hadoop
    ```

<br/>

### SSH μ€μ  [hadoop κ³μ μμ]  

* #### Master <-> Worker κ°μ ssh μ€μ μ μν΄ λ€μ μμμ μ§ννλ€.  

    ```cs
    [hadoop@hadoop-master ~]$ ssh-keygen -t rsa
    Generating public/private rsa key pair.
    Enter file in which to save the key (/home/hadoop/.ssh/id_rsa):
    Created directory '/home/hadoop/.ssh'.
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /home/hadoop/.ssh/id_rsa.
    Your public key has been saved in /home/hadoop/.ssh/id_rsa.pub.
    ```

    
    <br/>

    RHA κ³΅κ°ν€λ μ¬μ©μ κ³μ μ ν λλ ν°λ¦¬μ μλ .ssh ν΄λμ μμ±λ©λλ€.  
    μμ±λ κ³΅κ°ν€λ₯Ό ssh-copy-id λͺλ ΉμΌλ‘ μ μλ²μ [masterλ] λ³΅μ¬ν©λλ€. 

    ```cs
    [hadoop@hadoop-master ~]$ ssh-copy-id -i /home/hadoop/.ssh/id_rsa.pub hadoop@hadoop-worker
    [hadoop@hadoop-master ~]$ ssh-copy-id -i /home/hadoop/.ssh/id_rsa.pub hadoop@hadoop-worker2
     [hadoop@hadoop-master ~]$ ssh-copy-id -i /home/hadoop/.ssh/id_rsa.pub hadoop@hadoop-master
    ```
    κ·ΈλΌ λ€μκ³Ό κ°μ΄ μνΈμλ ₯ μμ΄ ssh μ μμ΄ κ°λ₯ν©λλ€.   
    λμΌνκ² Worker2,Masterμλ μ§νν©λλ€.  

<br/>


* #### JAVA μ€μΉ [root κ³μ μΌλ‘]  

    ```cs
    [root@hadoop-master ~]# yum install -y java-1.8.0-openjdk-devel.x86_64
    [root@hadoop-master ~]#
    [root@hadoop-master ~]# javac -version
    javac 1.8.0_275
    ```

<br/>

---

## π Hadoop μ€μΉ [Hadoop κ³μ μΌλ‘]

* λ―Έλ¬ μ¬μ΄νΈ : apache.mirror.cdnetworks.com/hadoop/common
* Version : 3.3.0 / μΆνμ HBaseλ₯Ό μ€μΉνλ €λ©΄ 3.1.1 Version μ΄μμ μ¬μ©ν΄μΌν¨.  

* Download
    * Download μλ² : master
    * Download μμΉ : /usr/local


    ```cs
    cd /usr/local; \
    sudo wget http://apache.mirror.cdnetworks.com/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz; \
    sudo tar xzvf hadoop-3.3.0.tar.gz; \
    sudo rm -rf hadoop-3.3.0.tar.gz; \
    sudo mv hadoop-3.3.0 hadoop
    [hadoop@hadoop-master local]$ ls
    bin  etc  games  hadoop  include  lib  lib64  libexec  sbin  share  src
    ```

<br/>

* #### νκ²½ λ³μ μ€μ  [μ μ²΄ μλ²] 

    μ§μ ν΄μ€ JAVA_HOME, HADOOP_HOMEμ PATHλ‘ λ¬Άμ΄ μ¬μ©ν©λλ€.  
    ```cs
    [root@hadoop-master ~]# vim /etc/profile

    export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64"
    export HADOOP_HOME="/usr/local/hadoop"
    export PATH="$PATH:$JAVA_HOME/bin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:"

    
    [root@hadoop-master ~]# source /etc/profile
    [root@hadoop-master ~]#
    [root@hadoop-master ~]# echo $JAVA_HOME
    /usr/bin/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64
    [root@hadoop-master ~]# echo $HADOOP_HOME
    /usr/local/hadoop
    [root@hadoop-master ~]# echo $PATH
    /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/usr/bin/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64/bin:/usr/local/hadoop/bin:/usr/local/hadoop/sbin:
    ```

<br/>

---


## π Hadoop κ΅¬μ± [Hadoop κ³μ μΌλ‘]

* μ§ν λΈλ : master
* νμΌ μμΉ : /usr/local/hadoop/etc/hadoop

* μ€μ  νμΌ λͺ©λ‘ 

    * core.site.xml : HDFS, Map Reduce νκ²½ μ λ³΄ 
    * hdfs.site.xml : HDFS νκ²½ μ λ³΄
    * yarn-site.xml : yarn νκ²½ μ λ³΄
    * mapred-site.xml : Map Reduce νκ²½ μ λ³΄
    * hadoop-env.sh : Hadoop μ€ν μ νμν shell script νκ²½ λ³μ  


<br/>

* #### core.site.xml

    ```cs
    <configuration>
       <property>
           <name>fs.defaultFS</name>
           <value>hdfs://hadoop-master:9000</value>
       </property>
       <property>
           <name>hadoop.tmp.dir</name>
           <value>/usr/local/hadoop/tmp</value>
       </property>
    </configuration>
    ```

<br/>

* #### hdfs.site.xml

    ```cs
    <configuration>
       <property>
          <name>dfs.replication</name>
          <value>3</value> -> κΈ°λ³Έ 1, 3μ΄μ΄μΌ full distribute
       </property>
       <property>
          <name>dfs.namenode.name.dir</name>
          <value>file:/usr/local/hadoop/namenode</value>
       </property>
       <property>
          <name>dfs.datanode.data.dir</name>
          <value>file:/usr/local/hadoop/datanode</value>
       </property>
       <property>
          <name>dfs.permissions.enabled</name>
          <value>false</value>
       </property>
       <property>
          <name>dfs.webhdfs.enabled</name>
          <value>true</value>
       </property>
       <property>
          <name>dfs.namenode.http.address</name>
          <value>hadoop-master:50070</value>
       </property>
       <property>
          <name>dfs.namenode.secondary.http-address</name>
          <value>hadoop-worker:50090</value>
       </property>
    </configuration>

    ```

<br/>

* #### yarn-site.xml

    ```cs
    <configuration>
       <property>
          <name>yarn.nodemanager.aux-services</name>
          <value>mapreduce_shuffle</value>
       </property>
       <property>
          <name>yarn.resourcemanager.hostname</name>
          <value>hadoop-master</value>
       </property>
       <property>
          <name>yarn.nodemanager.vmem-check-enabled</name>
          <value>false</value>
       </property>
       <property>
          <name>yarn.resourcemanager.address</name>
          <value>hadoop-master:8032</value>
       </property>
       <property>
          <name>yarn.resourcemanager.scheduler.address</name>
          <value>hadoop-master:8030</value>
       </property>
       <property>
          <name>yarn.resourcemanager.resource-tracker.address</name>
          <value>hadoop-master:8031</value>
       </property>
       </configuration>

    ```

<br/>

* #### mapred-siter.xml

    ```cs
    <configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    </configuration>
    ```

<br/>

* #### hadoop-env.sh 

    JAVA_HOMEμ κ²½μ° νμμ μ΄λ λλ¨Έμ§λ μ νμ¬ν­μλλ€. 


    ```cs
    export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64"
    export HADOOP_HOME="/usr/local/hadoop"
    export HADOOP_CONF_DIR="$HADOOP_HOME/etc/hadoop"
    export HADOOP_LOG_DIR="$HADOOP_HOME/logs"
    export HADOOP_PID_DIR="$HADOOP_HOME/pids"
    ```

<br/>


* #### Hadoop forder μμ± 

    * μ§ν λΈλ : master
    * μμΉ : /usr/local/hadoop

    ```cs
    [root@hadoop-master hadoop]# cd /usr/local/hadoop; \
    > mkdir namenode; \
    > mkdir datanode
    ```

<br/>


* #### Hadoop λ°°ν¬ 

    masterμμ worker1,2μ μ μ‘ν©λλ€.

    ```cs
    # worker 1λ‘ μ μ‘
    scp -r /usr/local/hadoop hadoop-worker:/usr/local

    # slave2 /usr/localλ‘ μ μ‘
    
    [hadoop@hadoop-master root]$ scp -r /usr/local/hadoop hadoop@hadoop-worker:/usr/local

    [hadoop@hadoop-master root]$ scp -r /usr/local/hadoop hadoop@hadoop-worker2:/usr/local
    ```

<br/>

* #### Worker μ€μ   

    slaves fileμ λ±λ‘λ hostλ€μ datanodeλ‘ μ€νλκ² λ©λλ€.

    * μ§ν λΈλ : master
    * νμΌ : /usr/local/hadoop/etc/hadoop/workers

    ```cs
    hadoop-master
    hadoop-worker
    hadoop-worker2
    ```

<br/>

* #### Master μ€μ   


    μλλ masters fileμ΄ μμμΌλ v2.7.0 μ΄νλ‘ μ¬λΌμ‘μ.  
    κ·Έλ¬λ κ·Έλ₯ viλ‘ μμ±ν΄μ λ£μΌλ©΄ λ©λλ€.   

    * μ§ν λΈλ : master
    * νμΌ : /usr/local/hadoop/etc/hadoop/masters

    ```cs
    hadoop-master
    ```

<br/>


---

## π Hadoop μμ

* μ§ν λΈλ : master 

μ΄μ  κΈ°λ³Έμ μΈ μ€μ μ λͺ¨λ μλ£λμμΌλ νμ€νΈ ν΄λ³Ό κ²Έ Hadoopμ λμλ΄μλ€.  


* #### Filesystem format  

    ```cs
    [root@hadoop-master hadoop]# hadoop namenode -format
    WARNING: Use of this script to execute namenode is deprecated.
    WARNING: Attempting to execute replacement "hdfs namenode" instead.

    WARNING: /usr/local/hadoop/pids does not exist. Creating.
    WARNING: /usr/local/hadoop/logs does not exist. Creating.
    2021-03-09 04:37:15,754 INFO namenode.NameNode: STARTUP_MSG:
    /
    STARTUP_MSG: Starting NameNode
    STARTUP_MSG:   host = hadoop-master/10.0.0.5
    STARTUP_MSG:   args = [-format]
    STARTUP_MSG:   version = 3.3.0
    ...
    ...(μλ΅)
    ```

<br/>

* #### Hadoop μμ 

   λ§μ½ μ΄λΆλΆμμ ERRORκ° λ°μνλ©΄ λλΆλΆ "κΆν"λ¬Έμ μλλ€. 

    ```cs
    [hadoop@hadoop-master logs]$ start-all.sh
    WARNING: Attempting to start all Apache Hadoop daemons as hadoop in 10 seconds.
    WARNING: This is not a recommended production deployment configuration.
    WARNING: Use CTRL-C to abort.
    Starting namenodes on [hadoop-master]
    Starting datanodes
    Starting secondary namenodes [hadoop-master]
    Starting resourcemanager
    Starting nodemanagers
    ```

<br/>

* #### Hadoop Cluster νμΈ 

    κ° Server λ³λ‘ jps λͺλ Ήμ ν΅ν΄ νμΈ 

    * Master 

        ![1111](https://user-images.githubusercontent.com/69498804/110431800-9cbc6c80-80f1-11eb-8eee-6cadabd4f9e4.JPG)


    <br/>

    * Worker1

        ![2222](https://user-images.githubusercontent.com/69498804/110431803-9d550300-80f1-11eb-8134-5768dacf8535.JPG)


    <br/>

    * Worker2 

        ![3333](https://user-images.githubusercontent.com/69498804/110431808-9ded9980-80f1-11eb-93cb-41eef4e33f42.JPG)


<br/>


* #### Hadoop Cluster μ’λ£ 

    * μ§νλΈλ : master 

    start-all.sh μ€ν μ€ νΉμ  μ€λ₯κ° λ°μνμλλ μλ λͺλ Ήμ ν΅ν΄ Hadoopμ μ’λ£  


    ```cs
    # stop-all.sh
    ```

    <br/>
    

### Access Hadoop Namenode and Resource Manager

νμλ Azure VMμμ κ΅¬μ±νκΈ° λλ¬Έμ VMμ nsgμμ μλ Portλ€μ νμ©ν΄μ€¬λ€.

* 8088
* 9000
* 9870
* 50070
* 8030
* 8031
* 8032


<br/>

<br/>

* #### nsg νμ©μ΄ λλ λ€ MasterIP:9870 μΌλ‘ μ μνλ©΄ μλμ κ°μ νλ©΄μ΄ λ³΄μΈλ€ 

    ![μΊ‘μ²333333](https://user-images.githubusercontent.com/69498804/110434636-684aaf80-80f5-11eb-97bb-61821c8e3d01.JPG)


<br/>

* #### Full Distribute Modeλ‘ μ μ μ€μ λμλ€λ©΄ Datanodesμ΄ λ€μκ³Ό κ°μ΄ μ μ²΄ λΈλκ° λμμΌνλ€. 

    ![123123123](https://user-images.githubusercontent.com/69498804/110437348-a09fbd00-80f8-11eb-8340-7ab214923ad6.JPG)

<br/>

* #### μΆκ°λ‘ MasterIP:8088λ‘ μ μνλ©΄ Resource Manager uiλ₯Ό νμΈ ν  μ μλ€. 

    ![μΊ‘μ²31231232131321](https://user-images.githubusercontent.com/69498804/110437648-f2e0de00-80f8-11eb-9476-3860fee79f49.JPG)


---

### hdfsμ νμΌ μλ‘λ


μ΄μ ν¬μ€νΈμμ sparkμ λ―Έμ² μ¬λ¦¬μ§ λͺ»ν data.cvs λ₯Ό μ¬λ €λ³΄λλ‘ νκ² μ΅λλ€.  


* #### μ²«λ²μ§Έλ‘ hdfsμμ μ½μ κΈ°λ³Έκ²½λ‘λ₯Ό μμ±ν΄μ€λλ€. 

    ```cs
    ## μ΄λ κ² λλ ν λ¦¬λ₯Ό λ§λ€μ΄μ λ£μ΄λ λ©λλ€.
    [hadoop@hadoop-master ~]$ hdfs dfs -mkdir /user
    [hadoop@hadoop-master ~]$ hdfs dfs -mkdir /user/nasa
    ```

<br/>

* #### μ΄ ν put λͺλ Ήμ΄λ‘ μμ±ν user dirμ νμΌμ μλ‘λ λ° νμΈ ν©λλ€. 

    ```cs
    ## μμμ λλ ν λ¦¬λ₯Ό λ§λ€μμ§λ§ μ λ κ·Έλ₯ / μ λ£μκ²μ
    [hadoop@hadoop-master ~]$ hdfs dfs -put /home/hadoop/nasa.csv /

    ## lsλ‘ νμΈνλ©΄ hdfsμ νμΌμ΄ λ€μ΄κ° κ²μ νμΈκ°λ₯ν©λλ€.
    [hadoop@hadoop-master ~]$ hdfs dfs -ls /
    Found 1 items
    -rw-r--r--   3 hadoop supergroup  500253789 2021-03-09 08:47 /nasa.csv
    [hadoop@hadoop-master ~]$

    ```

<br/>

* #### Resource Manager μΉμμλ μλμ κ°μ΄ νμΈμ΄ κ°λ₯ν©λλ€. 

    μ μμ μΌλ‘ Replicationλ λμλ€μ!!
    ![12123221312](https://user-images.githubusercontent.com/69498804/110443845-b664b080-80ff-11eb-8922-762399bb3b59.JPG)

 
<br/>

* #### Data Nodeκ° μ¬λΌμ€μ§ μλ ERRORκ° λ°μ ν  κ²½μ°
 
    νμμ κ²½μ° κΆνλ¬Έμ λ‘ hadoop precessλ₯Ό κ°μ λ‘ κ»λ€ μΌ°λ€λ₯Ό λ°λ³΅νμλ€.  

* κ·Έλ¬λλ λ€μκ³Ό κ°μ ERRORκ° λ°μνλ©° Datanodeκ° μ¬λΌμ€μ§ μμλ€

    ```cs
    2021-03-09 05:41:31,778 WARN org.apache.hadoop.hdfs.server.common.Storage: Failed to add storage directory [DISK]file:/usr/local/hadoop/datanode
    java.io.IOException: Incompatible clusterIDs in /usr/local/hadoop/datanode: namenode clusterID = CID-774db0d8-08a2-49e3-bc7f-b804c7bfb204; datanode clusterID = CID-9de845d9-b117-40c6-a996-d4bd471dbbfd
            at org.apache.hadoop.hdfs.server.datanode.DataStorage.doTransition(DataStorage.java:746)
            at org.apache.hadoop.hdfs.server.datanode.DataStorage.loadStorageDirectory(DataStorage.java:296)
            at org.apache.hadoop.hdfs.server.datanode.DataStorage.loadDataStorage(DataStorage.java:409)
            at org.apache.hadoop.hdfs.server.datanode.DataStorage.addStorageLocations(DataStorage.java:389)
            at org.apache.hadoop.hdfs.server.datanode.DataStorage.recoverTransitionRead(DataStorage.java:561)
            at org.apache.hadoop.hdfs.server.datanode.DataNode.initStorage(DataNode.java:1766)
            at org.apache.hadoop.hdfs.server.datanode.DataNode.initBlockPool(DataNode.java:1702)
            at org.apache.hadoop.hdfs.server.datanode.BPOfferService.verifyAndSetNamespaceInfo(BPOfferService.java:392)
            at org.apache.hadoop.hdfs.server.datanode.BPServiceActor.connectToNNAndHandshake(BPServiceActor.java:295)
            at org.apache.hadoop.hdfs.server.datanode.BPServiceActor.run(BPServiceActor.java:853)
            at java.lang.Thread.run(Thread.java:748)
    2021-03-09 05:41:31,780 ERROR org.apache.hadoop.hdfs.server.datanode.DataNode: Initialization failed for Block pool <registering> (Datanode Uuid d1475497-b53d-4126-b87b-615120dc89c9) service to hadoop-master/10.0.0.5:9000. Exiting.
    java.io.IOException: All specified directories have failed to load.
            at org.apache.hadoop.hdfs.server.datanode.DataStorage.recoverTransitionRead(DataStorage.java:562)
            at org.apache.hadoop.hdfs.server.datanode.DataNode.initStorage(DataNode.java:1766)
            at org.apache.hadoop.hdfs.server.datanode.DataNode.initBlockPool(DataNode.java:1702)
            at org.apache.hadoop.hdfs.server.datanode.BPOfferService.verifyAndSetNamespaceInfo(BPOfferService.java:392)
            at org.apache.hadoop.hdfs.server.datanode.BPServiceActor.connectToNNAndHandshake(BPServiceActor.java:295)
            at org.apache.hadoop.hdfs.server.datanode.BPServiceActor.run(BPServiceActor.java:853)
            at java.lang.Thread.run(Thread.java:748)
    2021-03-09 05:41:31,780 WARN org.apache.hadoop.hdfs.server.datanode.DataNode: Ending block pool service for: Block pool <registering> (Datanode Uuid d1475497-b53d-4126-b87b-615120dc89c9) service to hadoop-master/10.0.0.5:9000
    ```


* λ€μκ³Ό κ°μ κ²½μ°μλ λͺ¨λ  μλ²μ namenode, datanodeλ₯Ό μ­μ ν λ€ μ¬μμ± ν Hadoop μμνλ€.

    * #### master

    ```cs
    # cd /usr/local/hadoop
    # rm -rf namenode datanode;\
    # mkdir namenode; mkdir datanode
    ```

    * #### worker1, worker2

    ```cs
    # cd /usr/local/hadoop
    # rm -rf datanode;\
    # mkdir datanode
    ```

    * #### Hadoop format & μμ

    ```cs
    # hadoop namenode -format
    # start-all.sh
    ```

<br/>

---

## λ§μΉλ©°β¦  

  
μ΄λ² ν¬μ€νΈλ κ·Έλλ§ μμνκ² μ±κ³΅νμ΅λλ€.  
λ°λ‘ λ€μν¬μ€νΈμμ νκ²½κ΅¬μ±μ λν λ§λ°μ§λ₯Ό μ§ν ν  μμ μλλ€.  
λ€μ ν¬μ€νΈμΈ Spark on yarnμμ λ΅κ² μ΅λλ€.  


<br/>

---

```toc
```