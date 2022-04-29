---
emoji: 🤦‍♂️
title: "[AZURE] [DATA] Azure Synapse Analytics"
date: "2021-08-02 00:41:25"
author: nasa1515
tags: CLOUD DATA
categories: CLOUD DATA
---


머리말  

블로그에도 매번 인프라나 Devops 관련 글들만 올라와서 최근에 공부하고 있는 Data쪽도 포스트를 늘리려고 합니다.  
아직 초급자 수준이라서 틀린 내용이 많을 것 같지만, 복습하는 느낌으로...  
본 포스트에서 내용들은 모드 MS Doc를 기준으로 정리해 작성했습니다.


---


## ✔ Azure Synapse Analytics 

Synapse Analytics는 엔터프라이즈 데이터 웨어하우징과 빅 데이터 분석을 결합한 SaaS 입니다.  
Synapse의 용어 중의 SQL Pool (SQL DW)이란??  
Synapse Analytics에서 사용할 수 있는 ``엔터프라이즈 데이터 웨어하우징 기능``을 나타냅니다. 

<br/>

* #### Enter Prise Data WareHousing

    *엔터프라이즈 영역에서 정적 Data (ex. 영업 데이터, 매출 데이터, 개발 데이터 등)을*  
    *ETL (extract, transform, load), 전처리(가공) 전 중앙에 모아 관리하는 논리 로직*

<br/>

* #### SQL 전용 풀(Dedicated-leading SQL), (전 SQL DW)  

    *Synapse SQL을 사용할 때 프로비저닝되는 분석 리소스의 컬렉션을 표현합니다.*  
    *(SQL POOL의 크기와 가격은 DWU(Data WareHouse Unit)에 의해 결정됩니다.* 

<br/>

* #### Dedicated SQL은 다음과 같은 Synapse Architecture에 포함됩니다. 

    ![dedicated-sql-pool (1)](https://user-images.githubusercontent.com/69498804/109120531-6abe1880-7789-11eb-8b03-7e3a301f9f3b.png)

    Synapse analytics에서 사용가능한 서비스 아키텍쳐  
    각 서비스의 설명은 차후 포스트로 나눠서 진행 예정입니다.

    * Deficated SQL Pools
    * Serverless SQL Pool
    * Apache Spark Pools
    * Pipelines (Data 통합)
    * Shared metadata system
    * Connected Service

<br/>

---


## ✌ Azure Portal 에서 Synapse Analystics 영역 생성

<br/>

* #### Porter에서 Create resource Tab에서 Azure Synapse analystics 검색 후 설치

    ![캡처2](https://user-images.githubusercontent.com/69498804/109130587-40725800-7795-11eb-871b-24912db54ae1.JPG)

<br/>


* #### Basic 옵션 설정

    ![캡처3](https://user-images.githubusercontent.com/69498804/109235009-29bd1700-7810-11eb-9521-8cfa1ca9db1d.JPG)

    * RG
    * Workspace name
    * Region
    * Account name
    * File System name

<br/>
<br/>

* #### 생성된 Synapse workspace에 접속합니다.

    ![캡처4](https://user-images.githubusercontent.com/69498804/109237068-40fe0380-7814-11eb-92c3-17f4af65a87c.JPG)


<br/>

* #### Work Space Web URL에 접속합니다.

    ![캡처6](https://user-images.githubusercontent.com/69498804/109237187-6c80ee00-7814-11eb-8783-9ceee0ed2c19.JPG)


<br/>

* #### 다음과 같은 Web URL에 접속됩니다!

    ![캡처7](https://user-images.githubusercontent.com/69498804/109237303-a651f480-7814-11eb-8432-cd1bdb399f61.JPG)

    WEB URL에서는 다음과 같은 Blade로 나뉩니다.
    * HOME : 홈 화면 UI
    * DATA : DB or Linked 되어있는 Lake Storage 등
    * Develop : SQL Scirpt, Data flow등 쿼리에 대한 작업
    * Integrate : Develop 과정을 통합하는 파이프라인 작업
    * Monitor : Develop, Integrate 작업에 대한 모니터링
    * Manage : SQL Pools, Spark Pools, 파이프라인 등 관리

<br/>

---

## 👏 Synapse SQL Pools을 이용한 간단한 쿼리 테스트

<br/>

* #### TEST를 위한 SQL Pools을 생성해봅시다.

    ![캡처11](https://user-images.githubusercontent.com/69498804/109242652-d900ea80-781e-11eb-9651-f63c35cc4f96.JPG)

    * 다음과 같은 Manage tab -> SQL Pools -> NEW로 생성가능   
    * Built-in으로 Serverless를 주긴하지만 사용하지 않을 겁니다.

<br/>


* 생성 된 SQL Pools은 Data Tab에서 다음과 같이 확인이 가능합니다.

    ![캡처22](https://user-images.githubusercontent.com/69498804/109244981-064f9780-7823-11eb-9c00-47998f326b06.JPG)

<br/>

* #### 이 후 데이터를 넣어보겠습니다.

    Develop Tab에서 + 단추로 새로 리소스 추가 -> SQL 스크립트를 생성  
    아래 스크립트 삽입 후 실행 (Azure에서 제공하는 200만개 행 데이터)

    ```cs
    CREATE TABLE [dbo].[nasa1515]
    (
        [DateID] int NOT NULL,
        [MedallionID] int NOT NULL,
        [HackneyLicenseID] int NOT NULL,
        [PickupTimeID] int NOT NULL,
        [DropoffTimeID] int NOT NULL,
        [PickupGeographyID] int NULL,
        [DropoffGeographyID] int NULL,
        [PickupLatitude] float NULL,
        [PickupLongitude] float NULL,
        [PickupLatLong] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
        [DropoffLatitude] float NULL,
        [DropoffLongitude] float NULL,
        [DropoffLatLong] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
        [PassengerCount] int NULL,
        [TripDurationSeconds] int NULL,
        [TripDistanceMiles] float NULL,
        [PaymentType] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
        [FareAmount] money NULL,
        [SurchargeAmount] money NULL,
        [TaxAmount] money NULL,
        [TipAmount] money NULL,
        [TollsAmount] money NULL,
        [TotalAmount] money NULL
    )
    WITH
    (
        DISTRIBUTION = ROUND_ROBIN,
        CLUSTERED COLUMNSTORE INDEX
    );

    COPY INTO [dbo].[nasa1515]
    FROM 'https://nytaxiblob.blob.core.windows.net/2013/Trip2013/QID6392_20171107_05910_0.txt.gz'
    WITH
    (
        FILE_TYPE = 'CSV',
        FIELDTERMINATOR = '|',
        FIELDQUOTE = '',
        ROWTERMINATOR='0X0A',
        COMPRESSION = 'GZIP'
    )
    OPTION (LABEL = 'COPY : Load [nasa1515].[Trip] - Taxi dataset');
    ```

    * 간단하게 dbo.nasa1515라는 테이블을 만들고 데이터를 Load 하는 작업입니다. 

<br/>


* #### 스크립트를 실행하기 전 연결되어 있는 SQL Pools을 확인해주세요 

    ![캡처444](https://user-images.githubusercontent.com/69498804/109246549-d1910f80-7825-11eb-99ad-071d07d7229e.JPG)

    * 저는 조금 전 만든 SQL Pools을 선택해서 RUN 했습니다. 




<br/>

* #### 방법2. 미리 만든 Data를 업로드 가능   

    Data Tab -> Lake Storage의 파일시스템에 데이터 UPload 가능

    ![캡처8](https://user-images.githubusercontent.com/69498804/109240640-309d5700-781b-11eb-973f-2825baafa97a.JPG)



<br/>



* #### 스크립트 실행 후 DB에 테이블과 데이터를 확인합니다.

    ![캡처22211](https://user-images.githubusercontent.com/69498804/109254859-36546600-7836-11eb-8a94-113c77c54c3b.JPG)


<br/>

---


## 👌 이제 DB에서 데이터를 뽑아서 시각화 해보죠  


* #### 생성했던 Table에서 New SQL script -> Select TOP 100 rows 창을 접속   

    ![캡처11](https://user-images.githubusercontent.com/69498804/109255127-b5499e80-7836-11eb-8d7a-4e82169c906c.JPG)



<br/>

* #### 그럼 다음과 같은 Select 문이 나오는데 지우고 아래 스크립트를 입력 후 RUN

    ![캡처33333](https://user-images.githubusercontent.com/69498804/109255293-0c4f7380-7837-11eb-831e-a5237dbc0dfd.JPG)


    ```cs
    SELECT PassengerCount,
        SUM(TripDistanceMiles) as SumTripDistance,
        AVG(TripDistanceMiles) as AvgTripDistance
    FROM  dbo.nasa1515
    WHERE TripDistanceMiles > 0 AND PassengerCount > 0
    GROUP BY PassengerCount
    ORDER BY PassengerCount;
    ```
    * 넣었던 DB는 뉴욕 택시기사의 데이터입니다.
    * 위 스크립트는 총 주행거리,평균 주행거리, 승객 수 데이터를 뽑습니다.  

<br/>

* #### 다음과 같이 SQL DB에서 해당 데이터가 호출되게 됩니다.

    ![캡처2](https://user-images.githubusercontent.com/69498804/109255651-c5ae4900-7837-11eb-9a7e-2a0bfd960e10.JPG)



<br/>

* #### 또한 호출해낸 결과를 다음과 같이 쉽게 시각화가 가능합니다.  

    ![캡처222222](https://user-images.githubusercontent.com/69498804/109255782-027a4000-7838-11eb-8b9c-0467ef957ec6.JPG)

    * View Tab을 Chart로만 변경하면 된다.


<br/>


* #### 추가적으로 Monitor Tab에서 쿼리에 대한 모니터링도 가능합니다. 

    ![ttest](https://user-images.githubusercontent.com/69498804/109260684-f0050400-7841-11eb-819e-e86e57090c4c.JPG)

    * 기본적으로 파이프라인, 트리거, Pools들의 상태를 확인 가능  

<br/>


* #### 상단의 Publish all을 하게 되면 방금전에 사용했던 쿼리가 저장 및 등록됩니다.

    ![222131](https://user-images.githubusercontent.com/69498804/109261400-0f506100-7843-11eb-8cde-9caafb85f3e7.JPG)

<br/>


* #### 그럼 Develop Tab에 Script가 자동으로 생성됩니다.

    ![캡처33341](https://user-images.githubusercontent.com/69498804/109261495-3b6be200-7843-11eb-99f8-a7ef61007724.JPG)

    * 해당 스크립트를 integrate 파이프라인에 넣어 자동화도 가능합니다.

<br/>


이번 포스트에서는 SQL Pools로 진행하는 방법만 다뤄봤습니다. 
Serverless, Apache Spark 등의 방법은 추후에 포스트 예정입니다. 


<br/>

---

## 마치며…  


Data쪽은 아직 아무것도 모르겠습니다.  
조금 조금씩 기초 이론부터 시작해서 실습까지 인프라처럼 늘 수 있다고 생각합니다.  

---

```toc
```