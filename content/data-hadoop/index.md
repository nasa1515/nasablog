---
emoji: 🤦‍♂️
title:  "[DATA] - Apache Hadoop, HDFS, MapReduce"
date: "2021-08-13 00:40:25"
author: nasa1515
tags: DATA
categories: DATA
---


머리말  

이번 내용은 이전에 Spark의 이론적인 설명을 이어서 더 대표적인 Hadoop에 대해서 이론적인 내용들을 정리해보는 포스트입니다.   
저는 여러 포스트로 실제 Cluster를 구축하긴 했지만 HDFS가 데이터를 어떻게 저장하는지, ecosystem이 뭐지? 라는  
의문이 많이 남았기에 궁금한 내용들을 정리할 필요를 느꼈습니다.  

--- 


## ✔ Apache Hadoop?

![1111123123](https://user-images.githubusercontent.com/69498804/110746690-8395f600-8280-11eb-867b-616f6c82b8fb.JPG)

Hadoop : *하둡 소프트웨어 라이브러리는 간단한 프로그래밍 모델을 사용하여  
여러대의 컴퓨터 클러스터에서 대규모 데이터 세트를 분산 처리 할 수있게 해주는 프레임워크 이다.*

라고 모든 글에서 설명을 하는데 나는 그냥 데이터를 분산 저장하는 파일시스템이라고 이해했다.  
솔직히 아직 많이 다뤄보지 못해서 정확한 의미는 잘 모르겠고  
가장 주력으로 두고 있는 HDFS와 MapReduce 방식을 이해하면 프레임 워크라는게 어떤 말인지 대충 이해는 가고  
나아가서는 EcoSystem에 대해 이해를 한다면 어떤 느낌인지 감이 올 것같다.  

하둡의 초기에 HDFS, MapReduce 프레임워크로 시작되었으나  
현재에는 여러 데이터저장, 실행엔진, 프로그래밍 및 데이터처리 같이  
하둡 생태계 (Hadoop Ecosystem)을 포함하는 의미로 확장 발전 되었다고 한다.

<br/>

* ### Hadoop Ecosystem  

    위에서 Hadoop을 분산 FrameWork이라고 설명했었는데  
    Hadoop Ecosystem이 그 FrameWork을 이루는 프로젝트의 모임이라고 생각하면 된다.  

    ![123123123](https://user-images.githubusercontent.com/69498804/110749647-be9a2880-8284-11eb-81ba-ab6f7a2e6dc1.png)


    <br/>


    이 많은 Service 들을 정리하면 다음과 같다. 

    * Hadoop Core Project : HDFS(분산 데이터 저장), MapReduce(분산 처리)
    * Hadoop Sub Project : 나머지 프로젝트 -> 데이터 마이닝, 수집, 분석 등을 수행한다.

    너무 많은 서비스에 저도 이해가 잘 안되서 간단하게 정리를 해봤습니다.

    ![11111123233](https://user-images.githubusercontent.com/69498804/110750345-ad055080-8285-11eb-88f1-822e3be5c029.JPG)


    <br/>

    다른 분들이 각 프로젝트 들에 대해서 잘 정리해놓은 것도 있네요

    ![33333333](https://user-images.githubusercontent.com/69498804/110750466-db832b80-8285-11eb-8361-c32461fc97b8.JPG)


<br/>

---

## ✌ Hadoop EcoSystem Core 구성 요소

<br/>

* ### HDFS (Hadoop Distributed File System)

    Hadoop Ecosystem의 환경에서 데이터를 저장하는 분산형 파일 시스템  
    HDFS는 Hadoop Framework을 위해 JAVA로 작성된 분산 확장 파일 시스템입니다.  
    HDFS는 대용량 파일을 여러 서버에 나누고, 중복 저장함으로써 안정성을 높힙니다. 

    <br/>

* #### 특징   

    1. HDFS는 다수의 노드에 복제 데이터도 함께 저장해 데이터 유실을 방지한다.  
    2. HDFS에 저장된 파일을 조회하려면 스트리밍 방식으로 데이터에 접근해야한다  
    3. 한번 저장한 데이터는 수정할 수 없고, 읽기만 가능해서 데이터 무결성을 유지한다.  
    4.데이터 수정은 불가능하지만 파일 이동, 삭제, 복사할 수 있는 인터페이스를 제공한다.


    <br/>

* #### Architecture   

    ![222211312](https://user-images.githubusercontent.com/69498804/110756535-aed31200-828d-11eb-8d1e-e2bd0843713f.JPG)

    HDFS는 마스터/슬레이브(master/slave)구조를 가집니다. 

    <br/>

* #### HDFS의 특징

    ```cs
    1. Block 구조의 FileSystem, 저장파일은 특정 사이즈의 Block으로 나눠져 분산된 서버에 저장된다.

    2. 하나의 Block은 3개(수정 가능)로 복제되며, 각각 다른 HDFS의 DataNode에 분산저장된다.

    3. HDFS에는 NameNode 서버 한 대, Slave 역할을 하는 DataNode 서버가 여러 대로 구성된다.

    4. NameNode는 HDFS의 모든 Metadata(블록들이 저장되는 디렉토리의 이름, 파일명등..)를 관리하고  
       Client가 이를 이용하여 HDFS에 저장된 파일에 접근할 수 있다.

    5. 하둡 어플리케이션은 HDFS에 파일을 저장하거나, 저장된 파일을 읽기 위해 HDFS Client를 사용하며 API형태로 사용자에게 제공된다.

    6. DataNode는 주기적으로  HeartBeat 전송한다 
       (NameNode에서 Block Report : 노드에 저장되어 있는 블록의 정보 = Metadata)
       이를 통해 NameNode는 DataNode가 정상 동작하는지 확인한다.

    7. Clients는 NameNode에 접속해서 원하는 파일이 저장된 블록의 위치를 확인하고,  
       해당 Block이 저장된 DataNode에서 직접 데이터를 조회한다.  
    ```

<br/>

* #### HDFS File 저장 Flow

    ![다운로드11](https://user-images.githubusercontent.com/69498804/110758607-0bcfc780-8290-11eb-91ad-1b1e234128d2.png)

    ```cs
    1. APP이 Client에게 파일 저장을 요청  

    2. Client는 NameNode에게 Block이 저장될 경로 생성을 요청한다. 

    3. NameNode는 해당 경로가 존재하지 않으면 생성한 뒤  

    4. NameNode는 그 경로에 수정하지 못하게 LOCKING을 걸어둡니다.

    5. 그 후 Client에게 Block을 저장할 DataNode 목록을 반환하고  

    6. Client는 첫번째 DataNode에 Data Block을 전송 

    7. 첫번째 DataNode는 Local에 저장한 뒤 두번째 DataNode로 전송 

    8. 두번째 DataNode는 동일하게 저장한 뒤 세번째로 전송 

    9. 세번째 DataNode부터 Local에 저장완료 후 넘겨준 DataNode에게 완료 Return을 준다 

    10. 최종적으로는 첫번째 DataNode가 Client에게 저장완료를 Return
    ```

<br/>


* #### HDFS File 읽기 Flow

    ![64982211](https://user-images.githubusercontent.com/69498804/110759735-471ec600-8291-11eb-9e63-5e5164a004d1.png)

    ```cs
    1. APP이 Client에게 파일 읽기를 요청

    2. Client는 NameNode에게 파일이 어느 DataNode의 어떤 블록에 저장되어 있는지 정보를 요청

    3. MetaData를 통해 파일이 저장된 블록 리스트를 Client에게 반환

    4. Client는 해당 DataNode에 접근해 Block 조회 요청

    5. DataNode는 Client에게 요청된 Block을 전송

    6. Client는 App에 데이터를 전달
    ```

    <br/>

---

* ### MapReduce <a name="a4"></a>

    대용량의 데이터 처리를 위한 분산 프로그래밍 Model, 소프트웨어 FrameWork라고 불린다.  
    대규모 분산 컴퓨팅 환경에서 MapReduce를 이용해 대량의 데이터를 병렬로 분석이 가능하고  
    직접 작성하는 Map과 Reduce 라는 두 개의 메소드로 구성된다.  
    요새는 HIVE등 SQL과 유사한 구문으로 MapReduce Code를 만들어 사용한다.

    MapReduce는 Hadoop 클러스터의 데이터를 처리하기 위한 시스템으로,  
    총 2개 Map , Reduce의 phase로 구성되어 있다.

    Map과 Reduce사이에는 Shuffle과 Sort라는 스테이지가 존재한다.  
    각 Map Task는 전체 데이터 세트에 대한 별개의 부분에 대한 작업을 수행하게 되는데  
    기본적으로 하나의 HDFS Block을 대상으로 수행하게 된다.   
    모든 Map Task가 종료되면 MapReduce 시스템은 intermediate  
    데이터를 Reduce phase를 수행할 노드로 분산하여 전송한다.

    <br/>



* #### MAP & REDUCE 

    똑똑한 1명이 다량의 일을 처리하는 것  
    평범한 100명이 다량의 일을 처리하는 것  
    상식적으로 둘 중에 100명 진행하는 것이 훨씬 더 빠를 것이다.  
    위의 예가 분산처리의 핵심이지만 100명 각각의 결과를 취합하고 정리하는 시간의 소모도 크다.  
    또한 탐색할 데이터가 비정형이라서 갯수가 101개라거나, 길이가 서로 다르다거나 하면  
    이를 동일한 업무크기로 나누는 일도 쉽지가 않다.


    ### MapReduce는 이러한 처리를 도와주는 역할을 한다.  

    <br>

* #### 분산형 파일시스템에서는?

    ① MapReduce 작업이 끝나면 HDFS에 파일이 써지고(write)  
    ② MapReduce 작업이 시작될 때는 HDFS로 부터 파일을 가져오는(Read) 작업이 수행된다.

    MapReduce는 명칭 그대로 Map단계 & Reduce단계로 이루어진다.



<br/>

* ### MAP 

    <br/>

    ![111111](https://user-images.githubusercontent.com/69498804/110880244-aa583900-8321-11eb-8a05-de07fbfd261d.png)

    * 위의 그림처럼 흩어져 있는 분산 클러스터에서 각각의 데이터를 ``(key, value의 형태)``로 분류합니다.  

    * MapReduce의 Job의 입력 크기를 ``스플릿``이라고 합니다  
     -> 각 스플릿마다 하나의 Map Task를 생성하게되고  
     -> 만들어진 Map Task는 스플릿의 레코드를 Map 함수로 처리  
    -> (key, value) 구조를 가지는 중간 산출물이 생성!



<br/>

* ### Reduce 

    <br/>

    ![11123323](https://user-images.githubusercontent.com/69498804/110882149-d88b4800-8324-11eb-9370-ba6df69a549d.png)

    위의 그림은 문자열 데이터를 포함된 단어의 빈도 별로 나눠 출력해주는 Reduce 과정입니다.  
    MapReduce는 다음과 같은 과정으로 데이터를 다룹니다.


    * Splitting : 문자열 데이터를 라인별로 나누는 과정

    * Mapping : 라인별로 문자열을 입력 -> (key, value) 형태로 출력

    * Shuffling : 같은 key를 가지는 데이터끼리 분류

    * Reducing : 각 key 별로 빈도수를 합산해서 출력

    * Final Result : 리듀스 메소드의 출력 데이터를 합쳐서 하둡 파일시스템에 저장

    <br/>


* 간단하게 Map, Reduce 영역을 분리한 그림 

    ![33333](https://user-images.githubusercontent.com/69498804/110893271-fa8ec580-8338-11eb-883a-a4b715313a3d.png)

<br>


* ### MapReduce Jop  

    Job은 'Full Program' 즉, 전체 프로그램을 의미합니다.  
    데이터 집합을 통해 Mapper와 Reducer를 전체 실행하고  
    Task는 데이터 Block을 통해 하나의 Mapper 또는 Reducer를 실행하게 됩니다.

    * Client가 수행하려는 작업단위  
    입력데이터, 맵리듀스 프로그램, 설정 정보로 구성.

    * Hadoop은 Job을 Map Task와 Reduce Task로 작업을 나누어서 실행

    * Job이 실행되는 과정을 제어 해주는 노드


    <br/>


* ### MapReduce 시스템 구성  


    ![image44444](https://user-images.githubusercontent.com/69498804/110894214-cfa57100-833a-11eb-9a91-388e8d72ce48.png)

    MapReduce System은 Client, JobTracker, TaskTracker로 구성된다.

    * JobTracker 는 NameNode(Master)에 위치
    * TaskTracker 는 DataNode(Slave)에 위치

    <br/>


* ### Client

    분석하고자 하는 데이터를 Job의 형태로 JobTracker에게 전달한다.

    <br/>

* ### JobTracker

    * NameNode에 위치  
    * Hadoop Cluster의 전체 Job들을 스케줄링하고 모니터링

    맵 리듀스 Job들은 JobTracker라는 소프트웨어 데몬에 의해 제어된다.  
    JobTracker들은 다음과 같은 역할을 수행한다.


    * 1. Client는 MapReduce의 Job을 JobTracker에게 보낸다  
    * 2. JobTracker는 Clsuter의 다른 노드들에게 맵과 리듀스 Task를 할당한다.  
    * 3. 해당 노드들은 TaskTracker라는 데몬에 의해 각각 실행되고  
    * 4. TaskTracker는 Map,Reduce Task를 인스턴스화 한 뒤 진행 상황을 JobTracker에게 보고한다.

    <br/>

* ### TaskTracker  

    * DataNode에서 실행되는 데몬 (DataNode에 위치)
    * 사용자가 설정한 맵리듀스 프로그램을 실행해 JobTracker로부터 작업을 요청받은뒤  
    * Map과 Reduce 요청 개수만큼 Map,Reduce Task를 생성한 뒤 JobTracker에게 보고한다.

<br/>

---

## 마치며…  

  
이번 포스트에서는 Hadoop에 대한 간단한 설명들과 EcoSyetem의 Core Preeject 부분을 자세히 살펴봤습니다.  
원래 Sub까지 한 포스트에서 다루려고 했지만 포스트가 너무 길어져서 다음포스트에서 이어서 설명하겠습니다.    

<br/>

---

```toc
```
