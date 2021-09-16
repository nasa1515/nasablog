---
emoji: 🤦‍♂️
title: Hadoop 3.3.0 Full Distribute mode infra 구축 [DATA]
date: "2021-08-15 00:39:25"
author: nasa1515
tags: DATA
categories: DATA
---



머리말  

앞이 막막합니다. 저번 포스트에서 이미 인프라 구성을 끝냈어야 했는데... 이번 포스트에서라도 마무리 지어보죠  

--- 

## ✔ 설치 환경 

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

## ✌ Hadoop 설치 전 사전 작업


<br/>

* #### 각 서버별 HOSTNAME 설정 및 hosts 설정 [전 서버 동일]  

    ```cs
    [root@hadoop-master ~]# cat /etc/hosts
    10.0.0.5        hadoop-master
    10.0.0.6        hadoop-worker
    10.0.0.7        hadoop-worker2
    ```

<br/>

* #### hadoop 사용자 생성

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

### SSH 설정 [hadoop 계정에서]  

* #### Master <-> Worker 간의 ssh 설정을 위해 다음 작업을 진행한다.  

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

    RHA 공개키는 사용자 계정의 홈 디렉터리에 있는 .ssh 폴더에 생성됩니다.  
    생성된 공개키를 ssh-copy-id 명령으로 전서버에 [master도] 복사합니다. 

    ```cs
    [hadoop@hadoop-master ~]$ ssh-copy-id -i /home/hadoop/.ssh/id_rsa.pub hadoop@hadoop-worker
    [hadoop@hadoop-master ~]$ ssh-copy-id -i /home/hadoop/.ssh/id_rsa.pub hadoop@hadoop-worker2
     [hadoop@hadoop-master ~]$ ssh-copy-id -i /home/hadoop/.ssh/id_rsa.pub hadoop@hadoop-master
    ```
    그럼 다음과 같이 암호입력 없이 ssh 접속이 가능합니다.   
    동일하게 Worker2,Master에도 진행합니다.  

<br/>


* #### JAVA 설치 [root 계정으로]  

    ```cs
    [root@hadoop-master ~]# yum install -y java-1.8.0-openjdk-devel.x86_64
    [root@hadoop-master ~]#
    [root@hadoop-master ~]# javac -version
    javac 1.8.0_275
    ```

<br/>

---

## 👀 Hadoop 설치 [Hadoop 계정으로]

* 미러 사이트 : apache.mirror.cdnetworks.com/hadoop/common
* Version : 3.3.0 / 추후에 HBase를 설치하려면 3.1.1 Version 이상을 사용해야함.  

* Download
    * Download 서버 : master
    * Download 위치 : /usr/local


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

* #### 환경 변수 설정 [전체 서버] 

    지정해준 JAVA_HOME, HADOOP_HOME을 PATH로 묶어 사용합니다.  
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


## 😂 Hadoop 구성 [Hadoop 계정으로]

* 진행 노드 : master
* 파일 위치 : /usr/local/hadoop/etc/hadoop

* 설정 파일 목록 

    * core.site.xml : HDFS, Map Reduce 환경 정보 
    * hdfs.site.xml : HDFS 환경 정보
    * yarn-site.xml : yarn 환경 정보
    * mapred-site.xml : Map Reduce 환경 정보
    * hadoop-env.sh : Hadoop 실행 시 필요한 shell script 환경 변수  


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
          <value>3</value> -> 기본 1, 3이어야 full distribute
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

    JAVA_HOME의 경우 필수적이나 나머지는 선택사항입니다. 


    ```cs
    export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64"
    export HADOOP_HOME="/usr/local/hadoop"
    export HADOOP_CONF_DIR="$HADOOP_HOME/etc/hadoop"
    export HADOOP_LOG_DIR="$HADOOP_HOME/logs"
    export HADOOP_PID_DIR="$HADOOP_HOME/pids"
    ```

<br/>


* #### Hadoop forder 생성 

    * 진행 노드 : master
    * 위치 : /usr/local/hadoop

    ```cs
    [root@hadoop-master hadoop]# cd /usr/local/hadoop; \
    > mkdir namenode; \
    > mkdir datanode
    ```

<br/>


* #### Hadoop 배포 

    master에서 worker1,2에 전송합니다.

    ```cs
    # worker 1로 전송
    scp -r /usr/local/hadoop hadoop-worker:/usr/local

    # slave2 /usr/local로 전송
    
    [hadoop@hadoop-master root]$ scp -r /usr/local/hadoop hadoop@hadoop-worker:/usr/local

    [hadoop@hadoop-master root]$ scp -r /usr/local/hadoop hadoop@hadoop-worker2:/usr/local
    ```

<br/>

* #### Worker 설정  

    slaves file에 등록된 host들은 datanode로 실행되게 됩니다.

    * 진행 노드 : master
    * 파일 : /usr/local/hadoop/etc/hadoop/workers

    ```cs
    hadoop-master
    hadoop-worker
    hadoop-worker2
    ```

<br/>

* #### Master 설정  


    원래는 masters file이 있었으나 v2.7.0 이후로 사라졌음.  
    그러나 그냥 vi로 생성해서 넣으면 됩니다.   

    * 진행 노드 : master
    * 파일 : /usr/local/hadoop/etc/hadoop/masters

    ```cs
    hadoop-master
    ```

<br/>


---

## 👍 Hadoop 시작

* 진행 노드 : master 

이제 기본적인 설정은 모두 완료되었으니 테스트 해볼 겸 Hadoop을 띄워봅시다.  


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
    ...(생략)
    ```

<br/>

* #### Hadoop 시작 

   만약 이부분에서 ERROR가 발생하면 대부분 "권한"문제입니다. 

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

* #### Hadoop Cluster 확인 

    각 Server 별로 jps 명령을 통해 확인 

    * Master 

        ![1111](https://user-images.githubusercontent.com/69498804/110431800-9cbc6c80-80f1-11eb-8eee-6cadabd4f9e4.JPG)


    <br/>

    * Worker1

        ![2222](https://user-images.githubusercontent.com/69498804/110431803-9d550300-80f1-11eb-8134-5768dacf8535.JPG)


    <br/>

    * Worker2 

        ![3333](https://user-images.githubusercontent.com/69498804/110431808-9ded9980-80f1-11eb-93cb-41eef4e33f42.JPG)


<br/>


* #### Hadoop Cluster 종료 

    * 진행노드 : master 

    start-all.sh 실행 중 특정 오류가 발생했을때는 아래 명령을 통해 Hadoop을 종료  


    ```cs
    # stop-all.sh
    ```

    <br/>
    

### Access Hadoop Namenode and Resource Manager

필자는 Azure VM에서 구성했기 때문에 VM의 nsg에서 아래 Port들을 허용해줬다.

* 8088
* 9000
* 9870
* 50070
* 8030
* 8031
* 8032


<br/>

<br/>

* #### nsg 허용이 끝난 뒤 MasterIP:9870 으로 접속하면 아래와 같은 화면이 보인다 

    ![캡처333333](https://user-images.githubusercontent.com/69498804/110434636-684aaf80-80f5-11eb-97bb-61821c8e3d01.JPG)


<br/>

* #### Full Distribute Mode로 정상 설정되었다면 Datanodes이 다음과 같이 전체 노드가 나와야한다. 

    ![123123123](https://user-images.githubusercontent.com/69498804/110437348-a09fbd00-80f8-11eb-8340-7ab214923ad6.JPG)

<br/>

* #### 추가로 MasterIP:8088로 접속하면 Resource Manager ui를 확인 할 수 있다. 

    ![캡처31231232131321](https://user-images.githubusercontent.com/69498804/110437648-f2e0de00-80f8-11eb-9476-3860fee79f49.JPG)


---

### hdfs에 파일 업로드


이전포스트에서 spark에 미처 올리지 못한 data.cvs 를 올려보도록 하겠습니다.  


* #### 첫번째로 hdfs에서 읽을 기본경로를 생성해줍니다. 

    ```cs
    ## 이렇게 디렉토리를 만들어서 넣어도 됩니다.
    [hadoop@hadoop-master ~]$ hdfs dfs -mkdir /user
    [hadoop@hadoop-master ~]$ hdfs dfs -mkdir /user/nasa
    ```

<br/>

* #### 이 후 put 명령어로 생성한 user dir에 파일을 업로드 및 확인 합니다. 

    ```cs
    ## 위에서 디렉토리를 만들었지만 저는 그냥 / 에 넣을게요
    [hadoop@hadoop-master ~]$ hdfs dfs -put /home/hadoop/nasa.csv /

    ## ls로 확인하면 hdfs에 파일이 들어간 것을 확인가능합니다.
    [hadoop@hadoop-master ~]$ hdfs dfs -ls /
    Found 1 items
    -rw-r--r--   3 hadoop supergroup  500253789 2021-03-09 08:47 /nasa.csv
    [hadoop@hadoop-master ~]$

    ```

<br/>

* #### Resource Manager 웹에서도 아래와 같이 확인이 가능합니다. 

    정상적으로 Replication도 되었네요!!
    ![12123221312](https://user-images.githubusercontent.com/69498804/110443845-b664b080-80ff-11eb-8922-762399bb3b59.JPG)

 
<br/>

* #### Data Node가 올라오지 않는 ERROR가 발생 할 경우
 
    필자의 경우 권한문제로 hadoop precess를 강제로 껐다 켰다를 반복했었다.  

* 그랬더니 다음과 같은 ERROR가 발생하며 Datanode가 올라오지 않았다

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


* 다음과 같은 경우에는 모든 서버에 namenode, datanode를 삭제한 뒤 재생성 후 Hadoop 시작한다.

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

    * #### Hadoop format & 시작

    ```cs
    # hadoop namenode -format
    # start-all.sh
    ```

<br/>

---

## 마치며…  

  
이번 포스트는 그나마 수월하게 성공했습니다.  
바로 다음포스트에서 환경구성에 대한 막바지를 진행 할 예정입니다.  
다음 포스트인 Spark on yarn에서 뵙겠습니다.  


<br/>

---

```toc
```