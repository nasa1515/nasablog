---
emoji: 🤦‍♂️
title:  Hadoop EcoSystem Sub Project [DATA]
date: "2021-08-13 00:41:25"
author: nasa1515
tags: DATA
categories: DATA
---



머리말  

이전 포스트에서 Hadoop EcoSystem 중 Core Project에 대해서 다뤘었습니다.   
이번 포스트에서는 데이터를 수집하거나 DB화 하는 오픈소스들의 모음인 SUB Project들에 대해서 다룹니다.  
모든 프로젝트를 다루지는 않고 앞으로 사용하게 될 것 같은 프로젝트 위주로 정리했습니다.    


---




## ✔ Hadoop EcoSystem Sub Project 

<br/>

![123123123](https://user-images.githubusercontent.com/69498804/110749647-be9a2880-8284-11eb-81ba-ab6f7a2e6dc1.png)





[이전포스트](https://nasa1515.tech/data-hadoop/)에서는 Hadoop EcoSystem의 Core Project 부분에 대해서 다뤘습니다.  
Core Project는 다 설명했고 이제 Hadoop Sub Project의 차례 입니다. 

* Hadoop Core Project : HDFS(분산 데이터 저장), MapReduce(분산 처리)
* ``Hadoop Sub Project : 나머지 프로젝트 -> 데이터 마이닝, 수집, 분석 등을 수행한다.``



<br/>

---

### Zookeeper(주키퍼) - 분산 코디네이터


![111231](https://user-images.githubusercontent.com/69498804/111092196-b984f400-8578-11eb-9c77-727e7c82d5ae.jpg)


위의 Hadoop EcoSystem을 보면 Hadoop(코끼리)부터 꿀벌 등 배부분 동물들의 이름을 딴 것들이 많습니다.  
각 동물은 하나의 FramWork으로 이루어져있는데 Zookeeper는 이름으로도 그 역할이 짐작이 가능합니다.  
Zookeeper는 분산 시스템 간의 ``정보 공유`` 및 ``상태 체크``, ``동기화``를 처리하는 프레임워크입니다.  
이러한 시스템을 코디네이션 서비스 시스템이라고 부르는데.  
Zookeeper를 많이 사용하는 이유는 기능에 비해 시스템이 단순하기 때문입니다.  
분산 큐, 락, 피어 그룹 대표 산출 등의 기능을 가지는데 몇 개의 기본 기능만으로도 사용이 가능합니다.  
즉 간단하게 요약하면 분산 환경에서 서버들간 상호 조정이 필요한 서비스를 제공합니다.  

*   하나의 서버에만 서비스가 집중되지 않도록 서비스를 분산하여 조정  
* 하나의 서버에서 처리한 결과를 다른 서버와 동기화
* 운영(Active)서버에서 문제가 발생하면 다른 서버로 바꿔 서비스 중지 없이 제공  
* 분산 환경을 구성하는 서버들의 환경설정을 통합적으로 관리한다.  


<br/>

---

### Oozie(우지)  

![1_uoVl2GcziNS1uEHIt9wlOg](https://user-images.githubusercontent.com/69498804/111094519-cf95b300-857e-11eb-8c6e-7c31ab91b513.png)


Hadoop ecosystem에서 사용하는 Workflow Scheduler(혹은 orchestration) 프레임워크입니단.

즉 하둡의 워크플로우를 관리하며,  
일정한 시간이 경과하거나 또는 주기적으로 반복해서 실행될 수 있는 잡들에 대하여 관리하고,  
MapReduce job, pig 잡 등의 시작과 완료 그리고 실행 중 에러등의 이벤트를 Call Back 할 수 있습니다.

Oozie에서 제공하는 기능은 크게 아래의 3가지 입니다.

Scheduling

* 특정 시간에 액션 수행
* 주기적인 간격 이후에 액션 수행
* 이벤트가 발생하면 액션 수행

Coordinating

* 이전 액션이 성공적으로 끝나면 다음 액션 시작

Managing

* 액션이 성공하거나 실패했을 때 이메일 발송
* 액션 수행시간이나 액션의 단계를 저장

<br/>

---

### Pig (피그)  

![Apache-Pig-Architecture-24](https://user-images.githubusercontent.com/69498804/111102796-4c7d5880-8590-11eb-8283-6c0f34676d58.png)


하둡에 저장된 데이터를 MapReduce 코딩을 하지 않고 SQL과 유사한 스크립트를 이용해서  
데이터를 처리하고, API를 단순화한 형태로 사용할 수 있습니다.  
간단히 Hadoop의 MapReduce API를 단순화 시킨 FrameWork으로 Join 기능등을 쉽게 처리 가능하다.  



<br/>

---

### HIVE (하이브)

![11123](https://user-images.githubusercontent.com/69498804/111102972-abdb6880-8590-11eb-8cb7-34bf542bf564.jpg)

가장 Hive를 쉽게 설명할 수 있는 용어는 Hadoop의 SQL 이라 표현하는게 좋을 것 같다  
즉 HIVE는 Hadoop에서 SQL로 편하게 질의하며 데이터를 가져올 수 있는 툴 정도? 이다   
HIVEQL이라는 자체 쿼리는 제공해서 실행되면 Mapreduce의 Job으로 변환 된다.  
그래서 SQL은 익숙하지만 JAVA에 익숙하지 않은 사람들이 많이 사용한다.

<br/>

---

### HBase 

![Architecture-of-Apache-HBase](https://user-images.githubusercontent.com/69498804/111104978-34f49e80-8595-11eb-8446-93ecceb45fd6.jpg)
출처: [thirdeyedata 사이트](https://thirdeyedata.io/apache-hbase/))

HDFS, MapReduce로 분산하여 처리한 데이터를 저장하는 컬럼기반 DB 역할을 담당한다.  
HDFS위에서 Bigtable과 같은 기능을 제공하며 실시간 랜덤 조회, 업데이트가 가능하다.   
NoSQL로 분류되어, 스키마 변경없이 자유롭게 저장이 가능합니다.  


<br/>

---

### Yarn (Yet Another Resource Negotiator)

![111111123123](https://user-images.githubusercontent.com/69498804/111107613-87848980-859a-11eb-945f-f635052488ce.png)


모든 사이트에서 공통적으로 Yarn을 표현하는 단어는 ``Resource Managemnet``이빈다.  
제 개인적으로도 이게 Yarn의 ``핵심기능``인 것 같습니다.  

Yarn은 기존 Hadoop 1.X Version 에서의 문제점을 해결하기 위해서 등장했습니다.  
이전에는 MapReduce의 JopTracker에 의해서 Resource가 관리가 되고 있었어서  
속도 측면이나 여러 클러스터끼리 연동하기 어려운 문제가 있었습니다.    
그러나 이후 Hadoop 2.X Version 에서부터는 MapReduce의 클러스터 구성 기능이 Yarn으로 정의되며  
MapReduce는 컴퓨팅을 위한 프로그램만 제공하는 것으로 하고  
클러스터의 Resourece 관리, 장애 관리등은 Yarn을 통해 진행됩니다.  

Yarn의 핵심 구성 요소는 ``ResourceManager``와 ``NodeManager`` 입니다. 

![112112](https://user-images.githubusercontent.com/69498804/111108321-fadacb00-859b-11eb-9a3a-1e1ea1cabbe6.png)


* #### Resource Manager  

    * Yarn 클러스터의 Master 1개나 이중화 용 두개의 서버에만 실행.   
    * 클러스터 전체의 리소스를 관리  
    * Yarn 클러스터의 Resource를 사용하고자 하는 다른 요청을 받아 리소스 할당  
    * MapReduce의 JopTraker의 기능을 물려받았다


<br/>

* #### Node Manager  

    * Yarn 클러스터의 Worker 서버, ResourceManager를 제외한 모든 서버 실행  
    * 사용자가 요청한 프로그램을 실행하는 Container를 Fork 시키고 모니터링  
    Container 장애상황이나 리소스 사용량을 모니터링 한다.  
    * MapReduce의 TaskTraker의 기능을 물려받았다.  


<br>

### Yarn의 Running Process/ApplicationMaster 

[내용출처](https://ggoals.tistory.com/76)

YARN 클러스터에 job 을 요청한 경우 어떠한 방식으로 실행이 되는지 정리해보자  

![다운로드 (3)](https://user-images.githubusercontent.com/69498804/111110273-915cbb80-859f-11eb-9acf-297a865f8c39.png)

* RM(Resource Manager) : 글로벌 스케줄러  
* NM(Node Manager) : Task Tracker 
* AM(Application Master) : 한 개의 app을 관리하는 Master 

<br/>

* #### 1. Client가 App을 실행하고 Cluster의 RM에게 알려준다.  

    ![다운로드](https://user-images.githubusercontent.com/69498804/111109067-5ce80000-859d-11eb-9ce6-3be34d99f6bd.png)

<br/>

* #### 2. RM은 Worker 중 하나에 Container를 생성한다  
    그 후 Container 안에서는 Application Master가 실행된다.  

    ![다운로드 (1)](https://user-images.githubusercontent.com/69498804/111109363-f31c2600-859d-11eb-8333-6e0738df5952.png)

<br/>

* #### 3. AM은 Task를 싱핸할 컨테이너를 RM에 요청한다.
    그럼 RM은 남은 자원을 소유한 Work 호스트의 Node Manager를 통해서   
    Task를 실행 할 Container를 생성하고 AM에게 알려준다. 

    ![다운로드 (2)](https://user-images.githubusercontent.com/69498804/111109497-34143a80-859e-11eb-8391-62af97606600.png)


<br/>

* #### 4. 모든 task가 종료된다.  
    AM도 종료되고 클러스터에 할당된 컨테이너의 자원도 모두 de-allocated 된다.  
    그리고 Application client 도 종료된다

<br/>

Yarn의 결론 

결국 Yarn은 app의 job을 분산처리된 환경에서 처리할 수 있도록 도와주는 서비스 이다.  
위에서 설명한 RM(Resource Manager),AM(Application Manager),NM(Node..)가  
주요 컴포넌트이고 하나의 JOB을 처리하기 위해 여러 TASK를 나누고  
이를 분산환경에서 처리하기 위해 Container라는 개념이 존재한다.  
즉 기존 Hadoop 1.X Version에서의 분산처리 MapReduce의 문제를  
Yarn으로 프로세싱을 나누어 적합하게 처리하는 목적이다. 
  
<br/>

---

## 마치며…  

  
이번 포스트에서도 자세하게 EcoSystem에 대해서 설명하고 싶었지만  
이론적인 내용들만 다루다보니 또 주제에서 약간 벗어난 것 같습니다  
추후 Sub Project tools을 각각 사용해보면서 자세하게 다시 리뷰 해야 할 것 같습니다.  
 

<br/>

---

```toc
```