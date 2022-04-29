---
emoji: 🤦‍♂️
title: "[DATA, GCP] - GCP DataProc spark Cluster로 ETL 후 BigQuery에 적재"
date: "2021-09-08 00:34:25"
author: nasa1515
tags: CLOUD DATA
categories: CLOUD DATA
---

  


머리말  

이번에는 DataProc(Hadoop/Spark)를 사용하여 
대용량의 데이터를 처리하는 방법에 대해서 다룹니다. 물론 파이썬을 첨가해서  



--- 

## ✔ DataProc에 대해서..

*Dataproc은 일괄 처리, 쿼리, 스트리밍, 머신 러닝에 오픈소스 데이터 도구를 활용할 수 있는 관리형 Spark 및 Hadoop 서비스입니다.*  
즉 지금까지 귀찮게 Spark, Hadoop을 연동하는 과정을 없애고 사용만하면 되는 서비스라고 볼 수 있습니다.  

여기서 DataFlow와 DataProc의 차이에 대해서 궁금증이 생겼는데  
두 툴 모두 ETL을 하는 툴에 대해서는 공통점을 가지고 있지만  
DataFlow는 Serverless 서비스로 Streaming, Batch Flow를 Code로 관리하고 싶으면 사용하고  
DataProc은 기존에 HDFS 같은 Hadoop EcoSystem에 종속되어 있는 시스템을 가지고 있다면 사용하기 좋다고 합니다.


<br/>

---

## ✌ DataProc Cluster 생성

<br/>

* GCP 탐색 메뉴 > Dataproc > 클러스터 선택 > 클러스터 만들기

    ![다운로드](https://user-images.githubusercontent.com/69498804/116354676-b8134080-a833-11eb-8b5a-249126ff2798.png)


<br/>

* 클러스터 필드 설정 (이름을 제외한 나머지 부분은 기본값)

    ![캡처](https://user-images.githubusercontent.com/69498804/116355090-4f789380-a834-11eb-8880-311c70b982b2.JPG)

    <br/>

* 프로비저닝 과정을 3분정도 거치고 다음과 같이 생성이 완료됩니다.

    ![2](https://user-images.githubusercontent.com/69498804/116356531-5b655500-a836-11eb-873e-f5701fbc4d9a.JPG)

<br/>

---

## 🙌 Data 준비하기

이번 포스트에서는 BigQuery에서 공개적으로 제공하는 DataSet을 이용합니다.  

Dataproc Cluster는 GCS Connector를 기본으로 제공하여  
다른 설정없이 GCS에 있는 데이터에 바로 액세스가 가능합니다.  
저는 이를 이용해서 BigQuery의 공개 DataSet의 특정 테이블을 Cloud Storage로 Export하여  
Export한 데이터에 바로 접근하여 사용, 퍼포먼스 테스트를 해보겠습니다.  

<br/>


* 데이터 정보  

    ![캡처3](https://user-images.githubusercontent.com/69498804/116357157-24437380-a837-11eb-9047-048e8e5a018d.JPG)

    * Table ID : bigquery-public-data:covid19_weathersource_com.postal_code_day_history
    * Table 크기 : 약 300 

    <br/>

* 데이터 형식 

    ![캡처4](https://user-images.githubusercontent.com/69498804/116357277-476e2300-a837-11eb-920c-682f3e9dfa19.JPG)

    데이터의 내용은 나라 별 COVID-19의 기상상태 데이터입니다.  

<br/>

* Cloude Storage 생성 (GCS) - 쿼리 결과 데이러(CSV)틑 쌓는 곳  

    ![캡처5](https://user-images.githubusercontent.com/69498804/116358291-720cab80-a838-11eb-8d31-a13169891652.JPG)

    * Region을 Bigquery와 맞춰주어야 합니다. 

<br/>

* BigQuery DataSet, Table 생성 (쿼리 결과 데이터를 쌓는 곳)

    ![캡처6](https://user-images.githubusercontent.com/69498804/116358650-d7609c80-a838-11eb-8791-4acddef9cb46.JPG)

<br/>


* 저는 Python으로 간단한 코드를 작성해서 다음과 같이 데이터를 분류했습니다.  

    공개 DataSet에서 쿼리 결과를 다른 테이블에 저장하는 코드 

    ```python
    from google.cloud import bigquery

    # Construct a BigQuery client object.
    client = bigquery.Client()

    # TODO(developer): Set table_id to the ID of the destination table.
    table_id = "lws-cloocus.ustest.ustable"

    job_config = bigquery.QueryJobConfig(destination=table_id)

    sql = 'SELECT * FROM `bigquery-public-data.covid19_weathersource_com.postal_code_day_history` LIMIT 34230421'

    # Start the query, passing in the extra configuration.
    query_job = client.query(sql, job_config=job_config)  # Make an API request.
    query_job.result()  # Wait for the job to complete.

    print("Query results loaded to the table {}".format(table_id))
    ```
    * 아셔야 하는 건 Table을 복사하는 것과 데이터만(쿼리결과)복사하는 것은 다릅니다.  
    Table을 그대로 복사하게되면 Table의 정보까지 저장됩니다..


<br/>

* 해당 Code를 실행시키게 되면 다음과 같이 특정 Table에 쿼리결과가 저장됩니다.  


    ![캡처](https://user-images.githubusercontent.com/69498804/116361301-c9f8e180-a83b-11eb-90fb-a61cfbbd8fc9.JPG)

<br>

* 쿼리결과가 저장되어있는 Table의 데이터를 csv로 변환해서 GCS로 저장  

    ```python
    # Source option
    project = "lws-cloocus"
    dataset_id = "ustest"
    table_id = "ustable"


    # 용량 많은 Table (1G이상)은 * 정규표현식으로 Table 읽어서 csv화 시켜야 함.
    destination_uri = "gs://{}/{}".format(bucket_name, "result*.csv")
    dataset_ref = bigquery.DatasetReference(project, dataset_id)
    table_ref = dataset_ref.table(table_id)

    extract_job = client.extract_table(
        table_ref,
        destination_uri,
        # Location must match that of the source table.
        location="US",
    )  # API request
    extract_job.result()  # Waits for job to complete.

    print(
        "Exported {}:{}.{} to {}".format(project, dataset_id, table_id, destination_uri)
    )
    ```

    * BigQeury에서 Data를 export 할 때 한번에 1GB 단위까지 밖에 지원되지 않습니다.  
    때문에 * 와일드카드를 사용해서 CSV File을 분리해줘야 합니다.  

    <br/>

* 해당 코드를 실행시키면 다음과 같이 GCS에 Data가 저장됩니다.  


    ![캡처3](https://user-images.githubusercontent.com/69498804/116361977-8783d480-a83c-11eb-8d1e-5d447ce71323.JPG)

    * 다음과 같이 용량이 일정하게 나눠서 저장됩니다.  

<br/>

* 저장된 CSV File을 Local로 다운받아서 NotePad로 확인해보죠  

    ![23](https://user-images.githubusercontent.com/69498804/116362297-ddf11300-a83c-11eb-8944-4694fb94bd4e.JPG)

    * 다음과 같이 맨 윗줄은 헤더 정보, 나머지는 데이터 값만 저장됩니다.  

<br/>

---

## 👍 Jupyter Notebook 연결

이제 간단한 쿼리 테스트를 진행하기 위해 Jupyter Notebook을 연결 하려고 했는데...  
보니깐 Cluster를 잘못 생성했네요 아래 구성요소 GW를 사용하는 옵션을 체크해야합니다.  

* 구성요소 게이트웨이 

    ![캡처](https://user-images.githubusercontent.com/69498804/116366348-2a3e5200-a841-11eb-81c1-c83a9f629154.JPG)

    * 게이트웨이 옵션 체크
    * 구성요소에서 Jupyter Notebook 체크 

<br/>

* 클러스터가 새롭게 만들어졌다면 클러스터 정보-> 웹 인터페이스로 접속합니다.  

    ![캡처3](https://user-images.githubusercontent.com/69498804/116367440-527a8080-a842-11eb-9843-2fdb4cfdecfa.JPG)

    * 그럼 다음과 같이 JupyterLab GW link가 생기고 접속합니다.  

    <br/>

* 그럼 다음과 같이 DataProc Cluster와 연결된 Jupyter Page에 접속이 가능합니다. 

    ![캡처4](https://user-images.githubusercontent.com/69498804/116367646-85bd0f80-a842-11eb-8005-406031f0ca44.JPG)


<br/>

* 이 후에 GCS에 저장된 csv를 읽는 것도 가능합니다.  

    ![33333](https://user-images.githubusercontent.com/69498804/116504392-21a65400-a8f3-11eb-9e7e-8295718c17e2.JPG)

    <br/>

* 저는 쿼리 결과 시간이나, table 형태로 결과를 보고 싶어서 extension을 추가 설치 했습니다. 


    <br/>


    * Jupyter에서 Terminal 창을 연 뒤 아래 명령어로 설치합니다.

        ```cs
        # pip install jupyterlab_execute_time

        ```

    <br/>

    * 설치가 완료 된 뒤 연결된 WEB을 새로고침 하면 execure-time 이 설치되어 있습니다.  

        ![캡처444](https://user-images.githubusercontent.com/69498804/116510416-d5154580-a8ff-11eb-86ff-8ea55e585217.JPG)

    <br/>

    * 그 후 Settings - Advanced Settings editor - Notebook에 아래 코드를 추가합니다.  

        ![22222222](https://user-images.githubusercontent.com/69498804/116514663-4b1cab00-a906-11eb-9071-34c3d15fc616.JPG)
 

    <br/>

    * 그럼 다음과 같이 쿼리 실행 시간이 출력됩니다.!

        ![3213121](https://user-images.githubusercontent.com/69498804/116514759-6be50080-a906-11eb-9860-534243a6388f.JPG)


<br/>


* 저는 필요해보이는 추가 Extention을 더 설치해줬습니다.  

    <br/>

    * variableinspector

    ```cs
    # pip install lckr-jupyterlab-variableinspector

    ```

    <br/>

    * TOC

    ```cs
    # jupyter nbextension enable toc2/main
    ```

<br/>


---

## 👏 Pyspark Test

위에서도 Test를 해봤지만 그래도 몇가지 pyspark 함수를 사용해보겠습니다.  

<br/>

* CSV File 읽어오기 (GCS에 있는)  

    ```python
    # df = spark.read.csv("gs://nasa_us/", header=True, inferSchema=True)
    ```
    * gs://nasa_us/ 경로에 있는 모든 파일을 읽습니다.  
    * read.csv 옵션인 header, inferSchema를 사용했습니다.  

    ![2221313](https://user-images.githubusercontent.com/69498804/116836339-17d96500-ac01-11eb-9ab5-707e5ae65e2c.JPG)

    * 약 45.96s 가 소요 되었습니다.  


<br/>

* 해당 DataFrame의 Row 반환 

    ```python
    # df.show(10)    -- Row 10개 반환
    # df.count()     -- Row 갯수 반환
    ```

    ![11111](https://user-images.githubusercontent.com/69498804/116836737-ac909280-ac02-11eb-8dcc-dac053327581.JPG)

    * show에는 546ms 가 소요 되었습니다.
    * count에는 13.81s 가 소요 되었습니다.  

<br/>

* 해당 DataFrame의 Summary 값 반환

    ```python
    # df.summary().show()
    ```

    ![222222](https://user-images.githubusercontent.com/69498804/116841196-68f25480-ac13-11eb-872b-1fc2019bdc29.JPG)

    * Summary에는 4m 16.06s 가 소요 되었습니다.


<br/>


---

## 마치며…  

  
DataProc을 사용해보면서 Spark에 대해서도 다시 알아 갈 생각입니다.  
그래서 다음 포스트에서는 Pyspark의 문법에 대해서 포스팅 예정입니다.  


---

```toc
```
