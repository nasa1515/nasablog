---
emoji: 🤦‍♂️
title: "[DATA, GCP] - GCP DataProc 2탄 Pyspark JOB Access"
date: "2021-09-10 00:34:25"
author: nasa1515
tags: GCP DATA
categories: GCP DATA
---

  

머리말  

저번 포스트에서 DataProc에 대한 설명과 간단한 사용법을 다뤄봤었습니다.  
이번에는 DataProc Cluster에 Pyspark Script를 사용해서 
자동화 JOB을 만들어 보겠습니다. 파이썬을 첨가해서  

---

## ✔ Data

Data의 경우에는 이전 포스트에서 다뤘었던 Covid-19의 기상 데이터를 기반으로 진행합니다.  

![12312312](https://user-images.githubusercontent.com/69498804/116961186-9e637480-acdd-11eb-906f-9e340165dee1.JPG)

* 용량 : 약 51GB
* 행 : 542,304,210

<br/>


![2222](https://user-images.githubusercontent.com/69498804/116961225-bfc46080-acdd-11eb-930e-ec68574417e5.JPG)

* 데이터 형식 요약

<br/>


---

## 👍 Python Script

위의 데이터에서 특정 그룹(나라, 날짜) 별로 MAX,MIN,AVG 값들의 평균 값을 구하는 스크립트 

```python
from pyspark.context import SparkContext
from pyspark.sql.session import SparkSession
sc = SparkContext('local')
spark = SparkSession(sc)
print(type(spark))



read_path = "gs://nasa_us/"
write_path = 'gs://proc_result/result/'


# def for columns cheange

# ------------------------------------------------------------------
def renameCols(df, old_columns, new_columns):
    for old_col,new_col in zip(old_columns,new_columns):
        df = df.withColumnRenamed(old_col,new_col)
    return df


# Old_columns
old_columns = ['avg(min_temperature_air_2m_f)',
                'avg(max_temperature_air_2m_f)',
                'avg(avg_temperature_air_2m_f)'
                ]

# New_columns
new_columns = ['temperature_air_min_avg',
                'temperature_air_max_avg',
                'temperature_air_avg_avg'
                ]
# --------------------------------------------
# ----------------------

# Read CSV from GCS
df = spark.read.csv(read_path, header=True, inferSchema=True)

# data transform
df = df.groupBy('country', 'date').agg({'min_temperature_air_2m_f' : 'avg', 'max_temperature_air_2m_f' : 'avg', 'avg_temperature_air_2m_f' : 'avg'})

df2 = renameCols(df, old_columns, new_columns)

# Write CSV to GCS
df2.coalesce(1).write.option("header", "true").mode("overwrite").csv(write_path)
```

* 간단 설명 : GCS에서 CSV Format의 Data를 읽고 ETL 작업 후 결과를 GCS에 저장  
* Bigquery Table Data를 csv화 시키고 GCS에 저장하는 방법은 [이전포스트](https://nasa1515.tech/gcp_dataproc/)를 확인하세요


<br/>

---

## 👌 DataProc Job 생성


![333](https://user-images.githubusercontent.com/69498804/116962299-91945000-ace0-11eb-8e8f-20ea0f9f5b15.JPG)

* 위와 같이 DataProc - JOB -> 작업 제출로 JOB을 생성합니다.  

<br/>

![44444](https://user-images.githubusercontent.com/69498804/116962386-c6a0a280-ace0-11eb-96f5-aaaad00c4588.JPG)

* Cluster는 실행 할 Cluster를 지정합니다.
* 작업 유형은 Pyspark를 선택합니다. 
* Python File의 경우 미리 GCS에 올려놓고 지정하면 됩니다.  

<br/>


![캡처55555](https://user-images.githubusercontent.com/69498804/116962498-12ebe280-ace1-11eb-835a-2b85ed26c91c.JPG)

* 위와 같이 해당 작업이 생성되면서 실행되게 되고  
    JOB의 완료 된 후에는 결과 및 로그가 출력되게 됩니다.  

<br/>

---

## 🐱‍🏍 결과 확인

Script 실행대로 GCS에 ETL 결과 파일이 다음과 같이 저장되었습니다.  

![66666666](https://user-images.githubusercontent.com/69498804/116962590-5c3c3200-ace1-11eb-8614-8e54e3664677.JPG)


<br/>

그럼 해당 CSV 파일을 기반으로 BigQuery에 Table을 만들어 보겠습니다.  

![65446565464](https://user-images.githubusercontent.com/69498804/116962680-a0c7cd80-ace1-11eb-84fa-c3e8ca5a092b.JPG)

<br/>

데이터를 확인해보면 Script에서 실행 된 ETL 결과만 남아있는 것을 확인 가능합니다.

* 스키마 데이터

    ![77777](https://user-images.githubusercontent.com/69498804/116963266-59424100-ace3-11eb-9d2a-e3549f04bcae.JPG)

    <br/>

* 결과 데이터

    ![캡처332131](https://user-images.githubusercontent.com/69498804/116963305-76770f80-ace3-11eb-800d-7cb6f0762ef5.JPG)


    <br/>

## 끝!



---

## 마치며…  

  
DataProc에 대해서는 어떻게 사용하는지 대충 알아 본 것 같습니다.  
그래서 다음 포스트에서는 Proc과 동일한 서비스를 제공하는 DataBricks를 사용해보겠습니다.  


---

```toc
```