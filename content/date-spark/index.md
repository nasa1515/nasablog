---
emoji: 🤦‍♂️
title: Apache Spark에 대해서 [DATA]
date: "2021-08-13 00:39:25"
author: nasa1515
tags: DATA
categories: DATA
---



머리말  

이번에는 데이터의 가장 기초적인 오픈소스인 Apache Spark에 대한 내용 정리입니다.  
아무것도 모르는 생짜 초보이기 때문에 틀린 부분이 많을 수 있습니다.  

---


## ✔ Apache Spark? Hadoop?

![캡처1](https://user-images.githubusercontent.com/69498804/109732527-b3018e80-7c00-11eb-8fc9-53e9618bfac5.JPG)

주워들은 말로는 데이터 시장은 오픈소스인 Hadoop과 Apache가 경쟁하며 성장하고 있다고 알고 있다  
그런데 또 다른 글들을 보니 이미 업계에서는 두 오픈소스를 동시에 사용한다고도 한다.   
경쟁하는 관계인데 또 상생을 하고 있다는게 무슨소리지?   
다시 한번 찾아보니 각각의 툴의 용도에 대해서 알지 못했던 나의 오착이었다.  

<br/>

내가 이해한 두 앱의 용도를 간단하게 설명해보면  
우선 두 툴은 빅데이터 처리 플랫폼, 프레임워크라는 공통점을 가지고 있지만 

* ### Hadoop  
    분산 데이터 Infrastructure를 주로 하며,  
    대량의 데이터를 Server Cluster 내 복수 노드들에 분산시키는 역할을 한다.  
    이를 통해 데이터 처리를 위한 필요한 하드웨어의 비용부담을 줄여준다.   

반면에 Spark는 분산 데이터 컬렉션 상부에서 동작하는 ``데이터 프로세싱 툴``로  
분산형 스토리지의 역할은 수행하지 않는다고 한다.    
대충 이 대목에서 왜 두 오픈소스를 상생하면서 쓰는지 감이오기 시작했다.  
 
Hadoop은 HDFS(Hadoop Database filesystem)을 사용하며 맵리듀스를 핵심 구성 요소로 제공한다.  따라서 Spark가 없어도 된다.     
반대로 Spark도 HDFS가 아닌 AWS,GCP,Azure 등과 융합될 수 있기에 Hadoop이 없어도 된다.  
그러나 Hadoop과 Spark를 같이 사용할때가 가장 적합하다고 한다.  


<br/>

두 툴의 확실한 차이는 속도에서 확인이 가능하다. 

일반적인 상황에서 Hadoop보다 스파크의 속도가 월등히 빠르다고 한다.  
이유는 데이터 프로세싱 절차의 차이 때문인데  
Hadoop은 MapReduce를 사용하기 때문이고, Spark는 DataSet 전체를 한번에 다루기 때문에....  
또한 아래에서 다시 설명하겠지만 Hadoop은 HW에서, Spark는 메모리에서 동작하기 때문이다..  


<br/>

* Hadoop의 Mapreduce WorkFlow  

    Input -> Splitting -> Mapping -> Shuffling -> Reducing -> Final Result

    ![99F6AA445B5975A320](https://user-images.githubusercontent.com/69498804/109735558-4ee1c900-7c06-11eb-85aa-5fd05dc011f1.jpg)


    *INPUT : 먼저 클러스터에서 데이터를 읽고*  
    *클라이언트->네임노드->클라이언트->데이터 노드-> 마스터(Job Tracker)*  
    *태스크 단위로 쪼개어 Tasketracker(worker)에 배정하고*  
    *Map 단계를 수행한 후, 중간 결과물을 로컬 디스크에 저장을 한다.*  
    *그리고 그 결과물을 다시 combine, partioning을 거쳐 나온 2차 중간 결과물을 디스크에 분할 저장한다.*  
    *그리고 최종적으로 shuffling을 통해 reduce 작업에 할당된 후*  
    *reduce 작업을 거쳐 최종적으로 나온 결과물이 HDFS에 저장된다".*

<br/>


이에 반해, 스파크는 모든 데이터 운영을 메모리 내에서 실시간에 가깝게 처리할 수 있다(인메모리).  
데이터를 읽고, 처리 분석을 거친 결과물을 클러스터에 입력하는 전 과정이 동시에 진행되는 것이다.  
배치 프로세싱 경우에 스파크가 10배 빠르고, 인 메모리 Analytics의 경우, 100배 빠르다고 알려져있다.   

<br/>

나는 여기서 왜 Spark가 더 좋은데 Hadoop을 쓰지? 라는 의문이 들었다.  
그러나 대부분의 Data 운영, 리포팅 요구의 대부분이 정적인 것들이고 시간의 여유가 있다면 Mapreduce의 방식을 채택한다고 한다.   
다만 Spark가 필수적으로 필요할 때가 있는데 이는 비즈니스 공장의 센서 등 실시간으로 수집되는 스트리밍 데이터를 처리하거나, ML 알고리즘과 같이 APP의 복합적인 운영을 할때라고 한다.    
그리고 애초에 Hadoop만 사용하다가 위와 같이 실시간 적인 데이터 처리를 위해서 도입한 것이  
Spark라서 그냥 두 툴을 같이 쓰는게 최적이라고 한다.  

<br/>

---



## ✌ Apache Spark 

그럼 간단하게 데이터 플랫폼 2개의 툴에 대해서 설명했으니  
오늘 포스트의 주제인 Spark에 대한 내용으로 돌아와보자 

* ### Spark의 구성 요소

    ![components_of_spark](https://user-images.githubusercontent.com/69498804/109738566-61aacc80-7c0b-11eb-9c66-5f50dff0e63b.jpg)


    Spark는 다음 그림과 같은 구성 요소를 가지고 있습니다.

### Apache Spark Core

* Spark job과 다른 Spark 컴포넌트에 필요한 기본 기능을 제공합니다.  
* 주로 분산 데이터 컬렉션(DataSet)을 추상화한 객체 RDD로 다양한 연산, 변환 메소드를 제공합니다.
* HDFS, GlusterFS, S3등 여러 Filsystem에 접근이 가능합니다.  
* 공유 변수, 누적 변수를 사용해 컴퓨팅 노드 간 정보를 공유합니다.  
* Spark core에는 네트워킹, 보안, 스케쥴링 및 데이터 셔플링 등 기본 기능을 제공합니다.  



### Spark SQL

* Spark와 하이브 SQL이 지원하는 SQL을 사용해 대규모 분산 정형 데이터를 다룰 수 있습니다.  
* JSON File, Parquet 파일, RDB 테이블, 하이브 테이블 등 여러 정형 데이터를 읽고 쓸 수 있습니다.  
* DataFrame 과 DataSet의 연산을 RDD 연산으로 변환해 일반 Spark job으로 실행.  


### Spark Streaming

* 실시간 스트리밍 데이터를 처리하는 프레임 워크.  
* HDFS, Kafka, Flume, 트위터 등 커스텀 리소스도 사용 가능합니다.
* 다른 Spark 컴포넌트 겸용, 실시간 데이터 처리를 ML, SQL, Graph와 통합 연산이 가능.  

### Spark MLlib

* 머신 러닝 알고리즘 라이브러리.
* RDD, DataFrame의 DataSet을 변환하는 머신 러닝 모델을 구현 가능.  


### Spark GraphX

* 그래프 RDD 형태의 그래프 구조를 만들 수 있는 기능을 제공.

<br/>

### Spark Cluster의 구조와 실행과정  

![다운로드](https://user-images.githubusercontent.com/69498804/109743000-5491db80-7c13-11eb-9d18-516463788a2a.png)

* Spark Application은 실제 작업을 수행하는 역할이고  
* Cluster Manager는 Application 사이에 자원을 중계해주는 역할을 담당합니다.  

<br/>

### Spark Application

![다운로드](https://user-images.githubusercontent.com/69498804/109753108-ff5ec580-7c24-11eb-989a-fd120dee21ad.png)

Spark Application은 Driver 프로세스와 Excutors 두개로 구성됩니다.  

* Spark Driver (Master) : 한개의 노드에서만 실행되고, Spark 전체의 main()함수를 실행합니다.  
    Application 내 정보의 유지관리, Excutors의 실행 및 실행 분석, 배포 등 Master의 역할을 수행합니다.  
    즉 간단하게 사용자가 구성한 JOB을 TASK 단위로 변환해 Executor로 전달합니다.  


<br/>

* Executer (Worker Node) : 다수의 Worker Node에서 실행되는 프로세스  
    Master(Spark Driver)가 할당한 작업(TASK)를 수행한 결과를 반환.  
    추가로 블록매니저를 통해서 Cache하는 RDD를 저장합니다.  


<br/>


### Cluster Manager

이름 그대로 Spark Application의 Resource를 효율적으로 분배하는 역할을 담당합니다.  
바로 위에서 Driver에서 Executors로 task를 할당하고 관리한다고 설명했는데  
그 작업을 진행하기 위해 Clouster Mananger에 의존하고 있습니다.(없어선안됨...)   
즉 TASK의 할당 및 관리는 Driver -> Executors 구조가 아니라  
Driver <-> Cluster Manager <-> Executors 구조 입니다.  



![222](https://user-images.githubusercontent.com/69498804/109754173-e820d780-7c26-11eb-99e7-05e46796c3d8.JPG)

현재 Spark 3.0 기준 대표적인 Cluster Manager의 종류는 위 3가지 +  Spark StandAlone 입니다.  
근데 대부분 YARN,k8s 두 종류만 사용하는 듯...?  

다른 Manager는 이해가 되는데 StandAlone은 무슨말일까..?  

* StandAlone 
    Spark StandAlone은 Cluster로 구성하지 않고 단일 컴퓨터에서 동작시키는 거였다.  
    원래라면 나눠져야 할 Driver와 Executor는 각각 Thread로 동작한다고 한다.  
    Cluster로 구성한다면 Worker Node에 여러개의 Executor를 실행 시킬 수 있지만 StandAlone의 경우 1개씩만 동작한다.  



<br/>

---

### Spark APIs

![3rF6p](https://user-images.githubusercontent.com/69498804/109767953-9c2c5d80-7c3b-11eb-914f-00aee9d23e95.png)


Spark Application은 v1 ~ v3를 거쳐 다음과 같이 3가지의 APIs를 사용합니다.  

#### RDD (Resillient Distributed DataSet)  

RDD는 이름을 그대로 풀어쓰면 이해하기가 쉽습니다.  
* Resillient : Mem 내 데이터 손실 시 다시 생성이 가능하다
* Distributed : Cluster를 통해 메모리에 분산되어서 저장된다 (분산) 
* DataSet : 파일을 통해 가져 올 수 있다. 변경되지 않는다.  


정리하면 여러 분산 노드에 걸쳐서 저장되는 변경이 불가능한 데이터의 집합입니다.   

RDD의 생성은 2가지 방법으로서 생성됩니다.  

* 외부로 부터 Data를 로딩할때 (Disk)
* 코드에서 생성된 Data를 저장할 때

추가적으로 RDD에서 제공하는 Operations(function) 역시 2가지만 존재합니다.  

* #### Transformation (변환) : 존재하는 RDD에서 새로운 RDD를 생성하는 함수

    * 예를 들어 {1,2,3,3} 의 값을 가진 RDD에 Transformation을 사용하면  

    ![캡처222](https://user-images.githubusercontent.com/69498804/109771135-d0a21880-7c3f-11eb-841a-287b875cb201.JPG)


    * 추가적으로 {1,2,3},{3,4,5} 두 값을 가진 RDD의 경우 

    ![캡처333](https://user-images.githubusercontent.com/69498804/109771264-f4655e80-7c3f-11eb-80d5-0ee52f6f90dc.JPG)


    그림을 보면 이해가 쉬울 것이다. 대충 RDD의 데이터를 가지고 사용하는 작업이니... 


<br/>

* #### Action (액션) : 실제로 JOB을 실행하는 함수, 값을 받아오거나 저장한다.

    * 예를 들어 {1,2,3,3} RDD에서 Action 함수를 사용하면  

    ![캡처4444](https://user-images.githubusercontent.com/69498804/109771572-502fe780-7c40-11eb-8c9c-8cd33e05c808.JPG)

    reduce 함수를 예로 들면 rdd.reduce(x,y: x+y) 이다.   
    그럼 RDD {1,2,3,3}의 값들이 각각 x,y가 되어 합한 1+2+3+3 = 9가 연산 후 반환된다.  


<br/>

* 간단하게 위의 Flow를 요악한 그림

    ![다운로드33333](https://user-images.githubusercontent.com/69498804/109773128-2d063780-7c42-11eb-9872-47784860e468.png)


추가적인 함수의 경우 다른 포스트에서 정리 할 예정입니다.!!


<br/>


#### DataFrame  

Spark v1.3 이후 부터 RDD에서 발전한 개념?  
기존의 RDD의 단점들 속도, 최적화 등을 보완하였다고 합니다.  
여기저기서 찾아본 것으로는 scala에서 다음과 같이 사용이 가능하다고 한다.  

val df = spark.sql("실행 Query")  

대충 이해하자면 스키마의 최적화부분? 비정형 dataset으로 이해했던 RDD와 다르게 정형 데이터 (테이블)식으로 처리하는 듯 하다.(SQL 사용가능)  
근데 DataSet이 있어서 DataFrame은 완벽히 이해하고 넘어가지 않아도 될 듯??  

<br/>


#### DataSet  

 
Spark v1.6에서 추가되었다고 합니다.  
데이터 타입체크, 직렬화를 위한 인코더, 카탈리스트 옵티마이저를 지원하고  
데이터 처리 속도를 더욱 증가시켰다고 하는데;;; 잘모르겠다..  
Spark v2.0에서 DataFrame + Dataset = Dataset으로 통합되었다고 하고 따로 DataFrame을 선언하는 느낌인듯 합니다.  

<br/>

---

## 마치며…  

  
Spark의 기본 개념의 50%정도는 이해한 것 같습니다.  
다음 포스트에서는 마저 정리 못한 APIs와 JOB, STAGE, TASK에 대해서 정리 예정입니다. 


```toc
```



