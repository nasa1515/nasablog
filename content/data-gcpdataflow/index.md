---
emoji: 🤦‍♂️
title: "[DATA] - GCP DataFlow, csv from GCS to BigQuery With Python"
date: "2021-09-02 00:39:25"
author: nasa1515
tags: DATA GCP
categories: DATA GCP
---



머리말  

요즘 포스트를 작성 할 시간이 부족했습니다...(일...) 그래서 오랜만에 포스트를 올린 기념으로 이번 내용을 더욱 알차게 준비했습니다.  
이번 포스트에서는 GCP의 DataFlow를 사용해 GCS에 있는 CSV 파일을 간단한 Parsing 작업을 한 뒤   
BigQuery Table에 적재하는 부분을 다뤘습니다. 물론 파이썬을 첨가해서  

<br/>

---


## ✔ DataFlow에 대해서..


DataFlow는 GCP에서 DataPipeline(ETL, MR 등)을 Apache Beam 기반으로 동작하도록 만든 Runtime Service 입니다.  
음 간단하게 말하면 Spark Streming이나 Batch 처리를 Cloud를 사용해 PaaS로 사용 가능합니다.  
단 Apache beam에 종속되어 있어서 beam SDK를 봐야하는 불편한 부분은 있습니다..   

<br/>

* 일단 이번 포스트에서 간단하게 구성하려고 하는 아키텍쳐는 다음과 같습니다. 

    ![캡처](https://user-images.githubusercontent.com/69498804/116188577-9bf39e80-a762-11eb-8d0a-ad2989bbaa14.JPG)

    * Batch 형태의 Data [CSV]를 GCS에 Upload하면 해당 File Parsing 후 DW에 적재. 

    <br/>


<br/>

---

## ✌ DataFlow 사용을 위한 환경 구성

저는 Local의 VScode에서 Code를 사용 할 것이기 때문에   
DataFlow 사용하기 위한 환경을 구성하는 것부터 진행하도록 하겠습니다. 

<br/>

* #### DataFlow를 사용하기 위해서는 아래 API들이 필요합니다. [추가해줍니다.]  

    ![캡처2](https://user-images.githubusercontent.com/69498804/113811074-806e2700-97a6-11eb-9e4b-384907be0558.JPG)


    설치 API 목록

    * Cloud Dataflow
    * Stackdriver
    * Cloud Storage
    * Cloud Storage JSON
    * BigQuery
    * Cloud Pub/Sub
    * Cloud Datastore
    * Cloud Resource Manager APIs


    <br/>
<br/>

* #### 이후 새로운 Service Account를 생성합니다.

    ![캡처3](https://user-images.githubusercontent.com/69498804/113811448-30439480-97a7-11eb-9a42-4e8425375130.JPG)

    * 권한 : 소유자  
    * KeyFile : Json  
        * KeyFilw을 Local로 받아놔야 합니다!

    <br/> 
<br/>

* #### 이제 GCS(Google Cloud Storage)를 생성합니다. 

    ![캡처4](https://user-images.githubusercontent.com/69498804/113811803-d68f9a00-97a7-11eb-8cc0-0d6463f8a42b.JPG)


    * Storage Class : Standard
    * Single Region 
        * 가급적이면 비용적으로라도 BigQuery를 사용 할 Region과 맞춰주세요!


    <br/>
<br/>

* #### 최종적으로 Data를 적재 할 Bigquery DataSet을 생성합니다.  

    ![캡처2](https://user-images.githubusercontent.com/69498804/116189103-6dc28e80-a763-11eb-88f6-1a8e49ea32b8.JPG)

    * BigQuery Project : lws-cloocus
    * BigQuery DataSet : Test 



자 여기까지 간단한 환경설정은 완료되었고 Code를 설명하면서 추가적으로 보겠습니다.  

<br/>

---

## 👍 python code <a name="a1"></a> 


* 최종적인 DataPipeline의 Python Code 입니다.

    ```python
    from __future__ import absolute_import
    import argparse
    import logging
    import re
    import apache_beam as beam
    import json
    import os

    from apache_beam.io import ReadFromText
    from apache_beam.io import WriteToText
    from apache_beam.metrics import Metrics
    from apache_beam.options.pipeline_options import PipelineOptions
    from apache_beam.options.pipeline_options import SetupOptions
    from apache_beam.options.pipeline_options import StandardOptions
    from apache_beam.options.pipeline_options import GoogleCloudOptions
    from apache_beam.pipeline import PipelineOptions
    from google.cloud import storage
    from google.oauth2 import service_account
    import pandas as pd


    # GCP Service Account Key env 윈도우에서는 환경변수로 설정가능
    storage_client = storage.Client.                            from_service_account_json                                                   ('C:\GCP\lws-cloocus-d4fde98375c7.json')
        

    # for linux "service account key" 

    #GOOGLE_APPLICATION_CREDENTIALS('/home/nasa1515/dataflow/lwskey.json')
    
    # word length code

    class WordExtractingDoFn(beam.DoFn):
    def process(self, element):
        
        splited = element.split(',')
        writestring = ({'id': splited[0], 'price': splited[1], 'manufacturer': splited[2], 'condition': splited[3]})
        #writestring = {'splited[0], splited[1], splited[2], splited[3]'}
        return [writestring]

    # parser option code
    def run(argv=None, save_main_session=True):
 
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--input',dest='input',required=False,help='default'
        ,default='gs://storage_nasa1515/data/batch2.csv')
    parser.add_argument(
        '--output',dest='output',required=False,help='default'
        ,default='lws-cloocus:nasa1515.batchtest')
 
    known_args, pipeline_args = parser.parse_known_args(argv)
    pipeline_options = PipelineOptions(pipeline_args)

    # pipline option

    google_cloud_options = pipeline_options.view_as(GoogleCloudOptions)
    google_cloud_options.project = 'lws-cloocus'
    google_cloud_options.job_name = 'test-to-big'
    google_cloud_options.staging_location = 'gs://storage_nasa1515/staging'
    google_cloud_options.temp_location = 'gs://storage_nasa1515/temp'
    google_cloud_options.region = 'asia-northeast3'
    pipeline_options.view_as(StandardOptions).runner = 'DataflowRunner'
    
  
    # # test1

    p = beam.Pipeline(options = PipelineOptions(pipeline_args))

    with beam.Pipeline(options=pipeline_options) as p:
 
        table_schema = {
            'fields': [
                {"name": "id", "type": "STRING", "mode": "NULLABLE"}, 
                {"name": "price", "type": "INTEGER", "mode": "NULLABLE"},
                {"name": "manufacturer", "type": "STRING", "mode": "NULLABLE"},
                {"name": "condition", "type": "STRING", "mode": "NULLABLE"}
            ]
        }
        
        (p 
            | 'Read Data' >> ReadFromText(known_args.input)

            | beam.ParDo(WordExtractingDoFn(WordExtractingDoFn))
            | 'write to BigQuery' >> beam.io.WriteToBigQuery(
                known_args.output,
                schema = table_schema,
                method=beam.io.WriteToBigQuery.Method.FILE_LOADS,
                create_disposition = beam.io.BigQueryDisposition.CREATE_IF_NEEDED,
                write_disposition = beam.io.BigQueryDisposition.WRITE_TRUNCATE
            )
        )

    result = p.run()
    result.wait_until_finish()

    if __name__ == '__main__':
        logging.getLogger().setLevel(logging.INFO)
        run()
    ```

<br/>
<br/>

* 기본적으로 GCP DataFlow에서 beam SDK를 사용하기 위해선 아래 SDK의 설치가 필요합니다. 

    ```cs
    pip install apache-beam[gcp]
    ```

<br/>
<br/>


* SDK 선언 코드 

    ```python
    from __future__ import absolute_import
    import argparse
    import logging
    import re
    import apache_beam as beam
    import json
    import os
    import pandas as pd

    from apache_beam.io import ReadFromText
    from apache_beam.io import WriteToText
    from apache_beam.metrics import Metrics
    from apache_beam.options.pipeline_options import PipelineOptions
    from apache_beam.options.pipeline_options import SetupOptions
    from apache_beam.options.pipeline_options import StandardOptions
    from apache_beam.options.pipeline_options import GoogleCloudOptions
    from apache_beam.pipeline import PipelineOptions
    from google.cloud import storage
    from google.oauth2 import service_account
    ```
    
<br/>
<br/>

* 권한을 얻기 위한 코드 

    아까 Service Account를 생성하며 발급 받았던 Key의 위치를 선언해줍니다.  
    Window/Linux 모두 환경변수로 GOOGLE_APPLICATION_CREDENTIALS 설정하면 됩니다.

    ```python
    # GCP Service Account Key env
    storage_client = storage.Client.from_service_account_json('C:\GCP\lws-cloocus-d4fde98375c7.json')
        

    # for linux/window "service account key" 

    #GOOGLE_APPLICATION_CREDENTIALS('/home/nasa1515/dataflow/lwskey.json')
    ```

<br/>
<br/>

* 파이프라인 설정 코드

    ```python
    ## ,으로 구분된 CSV File을 Bigquery가 인식하는 ,으로 구분된 Json File로 변환하는 코드

    class WordExtractingDoFn(beam.DoFn):
    def process(self, element):
        
        splited = element.split(',')
        writestring = ({'id': splited[0], 'price': splited[1], 'manufacturer': splited[2], 'condition': splited[3]})
        #writestring = {'splited[0], splited[1], splited[2], splited[3]'}
        return [writestring]


    ## pasing 할 데이터를 가져오고 write 할 Bigquery에 대한 정보들을 입력

    # parser option code
    def run(argv=None, save_main_session=True):
 
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--input',dest='input',required=False,help='default'
        ,default='gs://storage_nasa1515/data/batch2.csv')
    parser.add_argument(
        '--output',dest='output',required=False,help='default'
        ,default='lws-cloocus:nasa1515.batchtest')
 
    known_args, pipeline_args = parser.parse_known_args(argv)
    pipeline_options = PipelineOptions(pipeline_args)

    # pipline option

    google_cloud_options = pipeline_options.view_as(GoogleCloudOptions)
    google_cloud_options.project = 'lws-cloocus'
    google_cloud_options.job_name = 'test-to-big'
    google_cloud_options.staging_location = 'gs://storage_nasa1515/staging'
    google_cloud_options.temp_location = 'gs://storage_nasa1515/temp'
    google_cloud_options.region = 'asia-northeast3'
    pipeline_options.view_as(StandardOptions).runner = 'DataflowRunner'
    ```

    * 이부분에서 주요하게 봐야 할 점을 Bigquery가 받아 들일 수 있는 파일의 형식입니다.  

<br/>
<br/>

* 제가 Pasing 하려고 하는 Batch 성 데이터는 다음과 같습니다.

    ![캡처](https://user-images.githubusercontent.com/69498804/116191285-06a6d900-a767-11eb-8860-ad389d2b7e0f.JPG)

<br/>
<br/>

* 그러나 Bigquery에서는 미리 정의한 Schema 형태의 ,JSON으로만 Data를 Load 할 수 있습니다. 

    ![캡처2](https://user-images.githubusercontent.com/69498804/116191459-4cfc3800-a767-11eb-9b76-9717d755dfca.JPG)

<br/>
<br/>

* 만약 해당 Data 형태로 Parsing이 되지 않으면 아래와 같은 Error가 발생하며 Job이 멈춥니다.. 

    ![MicrosoftTeams-image](https://user-images.githubusercontent.com/69498804/116191628-9ea4c280-a767-11eb-8c0c-f78ab7588ad3.png)

    * 때문에 위의 자료형대로 형식을 맞춰주는 건 매우 중요합니다..[여기서 뻘짓을 너무 많이했어요..]


<br/>
<br/>

* 또한 google_cloud_options에 GCS의 경로들은 전부 미리 생성되어있어야 합니다. 

    ![캡처3](https://user-images.githubusercontent.com/69498804/116192136-6487f080-a768-11eb-9054-337c87a348be.JPG)

    * staging
    * temp 

<br/>
<br/>

---


## 👀 이제 코드에 대한 설명을 이어서 하겠습니다.


* 파이프라인 실행 코드 

    ```python
    p = beam.Pipeline(options = PipelineOptions(pipeline_args))

    with beam.Pipeline(options=pipeline_options) as p:
 
        table_schema = {
            'fields': [
                {"name": "id", "type": "STRING", "mode": "NULLABLE"}, 
                {"name": "price", "type": "INTEGER", "mode": "NULLABLE"},
                {"name": "manufacturer", "type": "STRING", "mode": "NULLABLE"},
                {"name": "condition", "type": "STRING", "mode": "NULLABLE"}
            ]
        }
        
        (p 
            | 'Read Data' >> ReadFromText(known_args.input)

            | beam.ParDo(WordExtractingDoFn(WordExtractingDoFn))
            | 'write to BigQuery' >> beam.io.WriteToBigQuery(
                known_args.output,
                schema = table_schema,
                method=beam.io.WriteToBigQuery.Method.FILE_LOADS,
                create_disposition = beam.io.BigQueryDisposition.CREATE_IF_NEEDED,
                write_disposition = beam.io.BigQueryDisposition.WRITE_TRUNCATE
            )
        )

    result = p.run()
    result.wait_until_finish()

    if __name__ == '__main__':
        logging.getLogger().setLevel(logging.INFO)
        run()

    ```

    * 저는 위처럼 table_schema로 JSON 형태의 Schema를 미리 정의해서 사용했습니다.  
    * create_disposition = beam.io.BigQueryDisposition.CREATE_IF_NEEDED
        * 해당 구문은 BigQuery DataSet에 Table이 없으면 만들어 주는 옵션입니다.  


<br/>
<br/>

---

## 🙌 실행 결과

코드가 모두 짜여졌으니 코드를 실행시켜보죠.  


<br/>

* 실행하면 다음과 같으 DataFlow Tab에서 결과를 확인 할 수 있습니다.

    ![캡처4](https://user-images.githubusercontent.com/69498804/116193716-bcbff200-a76a-11eb-887a-6bf57009c06c.JPG)

    * 항목마다 어떤 부분을 성공했는지 자세하게 볼 수 있습니다.  

<br/>

* DataFlow Job이 성공이니 BigQuery Table을 확인 해 볼까요?  

    ![캡처5](https://user-images.githubusercontent.com/69498804/116193951-20e2b600-a76b-11eb-8827-666ff168be00.JPG)

    * 다음과 같이 간단한 쿼리문을 BigQuery에 날려보니 Data가 제대로 들어갔네요!  


<br/>

---

## 마치며…  

  
한 2~3일정도 삽질을 경험한 것 같습니다.  
이번에는 Batch 형태의 데이터만 DataFlow를 이용했지만 사실 Streming의 역할이 더 중요합니다.  
그래서 추후에 Pub/Sub과 연동하여 Streming Data를 적재하는 부분도 포스트 하겠습니다.   
 
---

```toc
```