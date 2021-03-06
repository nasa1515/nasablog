---
emoji: ๐คฆโโ๏ธ
title: "[DATA] - GCP DataFlow, csv from GCS to BigQuery With Python"
date: "2021-09-02 00:39:25"
author: nasa1515
tags: DATA CLOUD
categories: DATA CLOUD
---



๋จธ๋ฆฌ๋ง  

์์ฆ ํฌ์คํธ๋ฅผ ์์ฑ ํ  ์๊ฐ์ด ๋ถ์กฑํ์ต๋๋ค...(์ผ...) ๊ทธ๋์ ์ค๋๋ง์ ํฌ์คํธ๋ฅผ ์ฌ๋ฆฐ ๊ธฐ๋์ผ๋ก ์ด๋ฒ ๋ด์ฉ์ ๋์ฑ ์์ฐจ๊ฒ ์ค๋นํ์ต๋๋ค.  
์ด๋ฒ ํฌ์คํธ์์๋ GCP์ DataFlow๋ฅผ ์ฌ์ฉํด GCS์ ์๋ CSV ํ์ผ์ ๊ฐ๋จํ Parsing ์์์ ํ ๋ค   
BigQuery Table์ ์ ์ฌํ๋ ๋ถ๋ถ์ ๋ค๋ค์ต๋๋ค. ๋ฌผ๋ก  ํ์ด์ฌ์ ์ฒจ๊ฐํด์  

<br/>

---


## โ DataFlow์ ๋ํด์..


DataFlow๋ GCP์์ DataPipeline(ETL, MR ๋ฑ)์ Apache Beam ๊ธฐ๋ฐ์ผ๋ก ๋์ํ๋๋ก ๋ง๋  Runtime Service ์๋๋ค.  
์ ๊ฐ๋จํ๊ฒ ๋งํ๋ฉด Spark Streming์ด๋ Batch ์ฒ๋ฆฌ๋ฅผ Cloud๋ฅผ ์ฌ์ฉํด PaaS๋ก ์ฌ์ฉ ๊ฐ๋ฅํฉ๋๋ค.  
๋จ Apache beam์ ์ข์๋์ด ์์ด์ beam SDK๋ฅผ ๋ด์ผํ๋ ๋ถํธํ ๋ถ๋ถ์ ์์ต๋๋ค..   

<br/>

* ์ผ๋จ ์ด๋ฒ ํฌ์คํธ์์ ๊ฐ๋จํ๊ฒ ๊ตฌ์ฑํ๋ ค๊ณ  ํ๋ ์ํคํ์ณ๋ ๋ค์๊ณผ ๊ฐ์ต๋๋ค. 

    ![์บก์ฒ](https://user-images.githubusercontent.com/69498804/116188577-9bf39e80-a762-11eb-8d0a-ad2989bbaa14.JPG)

    * Batch ํํ์ Data [CSV]๋ฅผ GCS์ Uploadํ๋ฉด ํด๋น File Parsing ํ DW์ ์ ์ฌ. 

    <br/>


<br/>

---

## โ DataFlow ์ฌ์ฉ์ ์ํ ํ๊ฒฝ ๊ตฌ์ฑ

์ ๋ Local์ VScode์์ Code๋ฅผ ์ฌ์ฉ ํ  ๊ฒ์ด๊ธฐ ๋๋ฌธ์   
DataFlow ์ฌ์ฉํ๊ธฐ ์ํ ํ๊ฒฝ์ ๊ตฌ์ฑํ๋ ๊ฒ๋ถํฐ ์งํํ๋๋ก ํ๊ฒ ์ต๋๋ค. 

<br/>

* #### DataFlow๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด์๋ ์๋ API๋ค์ด ํ์ํฉ๋๋ค. [์ถ๊ฐํด์ค๋๋ค.]  

    ![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/113811074-806e2700-97a6-11eb-9e4b-384907be0558.JPG)


    ์ค์น API ๋ชฉ๋ก

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

* #### ์ดํ ์๋ก์ด Service Account๋ฅผ ์์ฑํฉ๋๋ค.

    ![์บก์ฒ3](https://user-images.githubusercontent.com/69498804/113811448-30439480-97a7-11eb-9a42-4e8425375130.JPG)

    * ๊ถํ : ์์ ์  
    * KeyFile : Json  
        * KeyFilw์ Local๋ก ๋ฐ์๋์ผ ํฉ๋๋ค!

    <br/> 
<br/>

* #### ์ด์  GCS(Google Cloud Storage)๋ฅผ ์์ฑํฉ๋๋ค. 

    ![์บก์ฒ4](https://user-images.githubusercontent.com/69498804/113811803-d68f9a00-97a7-11eb-8cc0-0d6463f8a42b.JPG)


    * Storage Class : Standard
    * Single Region 
        * ๊ฐ๊ธ์ ์ด๋ฉด ๋น์ฉ์ ์ผ๋ก๋ผ๋ BigQuery๋ฅผ ์ฌ์ฉ ํ  Region๊ณผ ๋ง์ถฐ์ฃผ์ธ์!


    <br/>
<br/>

* #### ์ต์ข์ ์ผ๋ก Data๋ฅผ ์ ์ฌ ํ  Bigquery DataSet์ ์์ฑํฉ๋๋ค.  

    ![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/116189103-6dc28e80-a763-11eb-88f6-1a8e49ea32b8.JPG)

    * BigQuery Project : lws-cloocus
    * BigQuery DataSet : Test 



์ ์ฌ๊ธฐ๊น์ง ๊ฐ๋จํ ํ๊ฒฝ์ค์ ์ ์๋ฃ๋์๊ณ  Code๋ฅผ ์ค๋ชํ๋ฉด์ ์ถ๊ฐ์ ์ผ๋ก ๋ณด๊ฒ ์ต๋๋ค.  

<br/>

---

## ๐ python code <a name="a1"></a> 


* ์ต์ข์ ์ธ DataPipeline์ Python Code ์๋๋ค.

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


    # GCP Service Account Key env ์๋์ฐ์์๋ ํ๊ฒฝ๋ณ์๋ก ์ค์ ๊ฐ๋ฅ
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

* ๊ธฐ๋ณธ์ ์ผ๋ก GCP DataFlow์์ beam SDK๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด์  ์๋ SDK์ ์ค์น๊ฐ ํ์ํฉ๋๋ค. 

    ```cs
    pip install apache-beam[gcp]
    ```

<br/>
<br/>


* SDK ์ ์ธ ์ฝ๋ 

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

* ๊ถํ์ ์ป๊ธฐ ์ํ ์ฝ๋ 

    ์๊น Service Account๋ฅผ ์์ฑํ๋ฉฐ ๋ฐ๊ธ ๋ฐ์๋ Key์ ์์น๋ฅผ ์ ์ธํด์ค๋๋ค.  
    Window/Linux ๋ชจ๋ ํ๊ฒฝ๋ณ์๋ก GOOGLE_APPLICATION_CREDENTIALS ์ค์ ํ๋ฉด ๋ฉ๋๋ค.

    ```python
    # GCP Service Account Key env
    storage_client = storage.Client.from_service_account_json('C:\GCP\lws-cloocus-d4fde98375c7.json')
        

    # for linux/window "service account key" 

    #GOOGLE_APPLICATION_CREDENTIALS('/home/nasa1515/dataflow/lwskey.json')
    ```

<br/>
<br/>

* ํ์ดํ๋ผ์ธ ์ค์  ์ฝ๋

    ```python
    ## ,์ผ๋ก ๊ตฌ๋ถ๋ CSV File์ Bigquery๊ฐ ์ธ์ํ๋ ,์ผ๋ก ๊ตฌ๋ถ๋ Json File๋ก ๋ณํํ๋ ์ฝ๋

    class WordExtractingDoFn(beam.DoFn):
    def process(self, element):
        
        splited = element.split(',')
        writestring = ({'id': splited[0], 'price': splited[1], 'manufacturer': splited[2], 'condition': splited[3]})
        #writestring = {'splited[0], splited[1], splited[2], splited[3]'}
        return [writestring]


    ## pasing ํ  ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ค๊ณ  write ํ  Bigquery์ ๋ํ ์ ๋ณด๋ค์ ์๋ ฅ

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

    * ์ด๋ถ๋ถ์์ ์ฃผ์ํ๊ฒ ๋ด์ผ ํ  ์ ์ Bigquery๊ฐ ๋ฐ์ ๋ค์ผ ์ ์๋ ํ์ผ์ ํ์์๋๋ค.  

<br/>
<br/>

* ์ ๊ฐ Pasing ํ๋ ค๊ณ  ํ๋ Batch ์ฑ ๋ฐ์ดํฐ๋ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.

    ![์บก์ฒ](https://user-images.githubusercontent.com/69498804/116191285-06a6d900-a767-11eb-8860-ad389d2b7e0f.JPG)

<br/>
<br/>

* ๊ทธ๋ฌ๋ Bigquery์์๋ ๋ฏธ๋ฆฌ ์ ์ํ Schema ํํ์ ,JSON์ผ๋ก๋ง Data๋ฅผ Load ํ  ์ ์์ต๋๋ค. 

    ![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/116191459-4cfc3800-a767-11eb-9b76-9717d755dfca.JPG)

<br/>
<br/>

* ๋ง์ฝ ํด๋น Data ํํ๋ก Parsing์ด ๋์ง ์์ผ๋ฉด ์๋์ ๊ฐ์ Error๊ฐ ๋ฐ์ํ๋ฉฐ Job์ด ๋ฉ์ถฅ๋๋ค.. 

    ![MicrosoftTeams-image](https://user-images.githubusercontent.com/69498804/116191628-9ea4c280-a767-11eb-8c0c-f78ab7588ad3.png)

    * ๋๋ฌธ์ ์์ ์๋ฃํ๋๋ก ํ์์ ๋ง์ถฐ์ฃผ๋ ๊ฑด ๋งค์ฐ ์ค์ํฉ๋๋ค..[์ฌ๊ธฐ์ ๋ป์ง์ ๋๋ฌด ๋ง์ดํ์ด์..]


<br/>
<br/>

* ๋ํ google_cloud_options์ GCS์ ๊ฒฝ๋ก๋ค์ ์ ๋ถ ๋ฏธ๋ฆฌ ์์ฑ๋์ด์์ด์ผ ํฉ๋๋ค. 

    ![์บก์ฒ3](https://user-images.githubusercontent.com/69498804/116192136-6487f080-a768-11eb-9054-337c87a348be.JPG)

    * staging
    * temp 

<br/>
<br/>

---


## ๐ ์ด์  ์ฝ๋์ ๋ํ ์ค๋ช์ ์ด์ด์ ํ๊ฒ ์ต๋๋ค.


* ํ์ดํ๋ผ์ธ ์คํ ์ฝ๋ 

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

    * ์ ๋ ์์ฒ๋ผ table_schema๋ก JSON ํํ์ Schema๋ฅผ ๋ฏธ๋ฆฌ ์ ์ํด์ ์ฌ์ฉํ์ต๋๋ค.  
    * create_disposition = beam.io.BigQueryDisposition.CREATE_IF_NEEDED
        * ํด๋น ๊ตฌ๋ฌธ์ BigQuery DataSet์ Table์ด ์์ผ๋ฉด ๋ง๋ค์ด ์ฃผ๋ ์ต์์๋๋ค.  


<br/>
<br/>

---

## ๐ ์คํ ๊ฒฐ๊ณผ

์ฝ๋๊ฐ ๋ชจ๋ ์ง์ฌ์ก์ผ๋ ์ฝ๋๋ฅผ ์คํ์์ผ๋ณด์ฃ .  


<br/>

* ์คํํ๋ฉด ๋ค์๊ณผ ๊ฐ์ผ DataFlow Tab์์ ๊ฒฐ๊ณผ๋ฅผ ํ์ธ ํ  ์ ์์ต๋๋ค.

    ![์บก์ฒ4](https://user-images.githubusercontent.com/69498804/116193716-bcbff200-a76a-11eb-887a-6bf57009c06c.JPG)

    * ํญ๋ชฉ๋ง๋ค ์ด๋ค ๋ถ๋ถ์ ์ฑ๊ณตํ๋์ง ์์ธํ๊ฒ ๋ณผ ์ ์์ต๋๋ค.  

<br/>

* DataFlow Job์ด ์ฑ๊ณต์ด๋ BigQuery Table์ ํ์ธ ํด ๋ณผ๊น์?  

    ![์บก์ฒ5](https://user-images.githubusercontent.com/69498804/116193951-20e2b600-a76b-11eb-8827-666ff168be00.JPG)

    * ๋ค์๊ณผ ๊ฐ์ด ๊ฐ๋จํ ์ฟผ๋ฆฌ๋ฌธ์ BigQuery์ ๋ ๋ ค๋ณด๋ Data๊ฐ ์ ๋๋ก ๋ค์ด๊ฐ๋ค์!  


<br/>

---

## ๋ง์น๋ฉฐโฆ  

  
ํ 2~3์ผ์ ๋ ์ฝ์ง์ ๊ฒฝํํ ๊ฒ ๊ฐ์ต๋๋ค.  
์ด๋ฒ์๋ Batch ํํ์ ๋ฐ์ดํฐ๋ง DataFlow๋ฅผ ์ด์ฉํ์ง๋ง ์ฌ์ค Streming์ ์ญํ ์ด ๋ ์ค์ํฉ๋๋ค.  
๊ทธ๋์ ์ถํ์ Pub/Sub๊ณผ ์ฐ๋ํ์ฌ Streming Data๋ฅผ ์ ์ฌํ๋ ๋ถ๋ถ๋ ํฌ์คํธ ํ๊ฒ ์ต๋๋ค.   
 
---

```toc
```