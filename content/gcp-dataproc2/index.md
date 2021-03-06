---
emoji: ๐คฆโโ๏ธ
title: "[DATA, GCP] - GCP DataProc 2ํ Pyspark JOB Access"
date: "2021-09-10 00:34:25"
author: nasa1515
tags: CLOUD DATA
categories: CLOUD DATA
---

  

๋จธ๋ฆฌ๋ง  

์ ๋ฒ ํฌ์คํธ์์ DataProc์ ๋ํ ์ค๋ช๊ณผ ๊ฐ๋จํ ์ฌ์ฉ๋ฒ์ ๋ค๋ค๋ดค์์ต๋๋ค.  
์ด๋ฒ์๋ DataProc Cluster์ Pyspark Script๋ฅผ ์ฌ์ฉํด์ 
์๋ํ JOB์ ๋ง๋ค์ด ๋ณด๊ฒ ์ต๋๋ค. ํ์ด์ฌ์ ์ฒจ๊ฐํด์  

---

## โ Data

Data์ ๊ฒฝ์ฐ์๋ ์ด์  ํฌ์คํธ์์ ๋ค๋ค์๋ Covid-19์ ๊ธฐ์ ๋ฐ์ดํฐ๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ์งํํฉ๋๋ค.  

![12312312](https://user-images.githubusercontent.com/69498804/116961186-9e637480-acdd-11eb-906f-9e340165dee1.JPG)

* ์ฉ๋ : ์ฝ 51GB
* ํ : 542,304,210

<br/>


![2222](https://user-images.githubusercontent.com/69498804/116961225-bfc46080-acdd-11eb-930e-ec68574417e5.JPG)

* ๋ฐ์ดํฐ ํ์ ์์ฝ

<br/>


---

## ๐ Python Script

์์ ๋ฐ์ดํฐ์์ ํน์  ๊ทธ๋ฃน(๋๋ผ, ๋ ์ง) ๋ณ๋ก MAX,MIN,AVG ๊ฐ๋ค์ ํ๊ท  ๊ฐ์ ๊ตฌํ๋ ์คํฌ๋ฆฝํธ 

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

* ๊ฐ๋จ ์ค๋ช : GCS์์ CSV Format์ Data๋ฅผ ์ฝ๊ณ  ETL ์์ ํ ๊ฒฐ๊ณผ๋ฅผ GCS์ ์ ์ฅ  
* Bigquery Table Data๋ฅผ csvํ ์ํค๊ณ  GCS์ ์ ์ฅํ๋ ๋ฐฉ๋ฒ์ [์ด์ ํฌ์คํธ](https://nasa1515.tech/gcp_dataproc/)๋ฅผ ํ์ธํ์ธ์


<br/>

---

## ๐ DataProc Job ์์ฑ


![333](https://user-images.githubusercontent.com/69498804/116962299-91945000-ace0-11eb-8e8f-20ea0f9f5b15.JPG)

* ์์ ๊ฐ์ด DataProc - JOB -> ์์ ์ ์ถ๋ก JOB์ ์์ฑํฉ๋๋ค.  

<br/>

![44444](https://user-images.githubusercontent.com/69498804/116962386-c6a0a280-ace0-11eb-96f5-aaaad00c4588.JPG)

* Cluster๋ ์คํ ํ  Cluster๋ฅผ ์ง์ ํฉ๋๋ค.
* ์์ ์ ํ์ Pyspark๋ฅผ ์ ํํฉ๋๋ค. 
* Python File์ ๊ฒฝ์ฐ ๋ฏธ๋ฆฌ GCS์ ์ฌ๋ ค๋๊ณ  ์ง์ ํ๋ฉด ๋ฉ๋๋ค.  

<br/>


![์บก์ฒ55555](https://user-images.githubusercontent.com/69498804/116962498-12ebe280-ace1-11eb-835a-2b85ed26c91c.JPG)

* ์์ ๊ฐ์ด ํด๋น ์์์ด ์์ฑ๋๋ฉด์ ์คํ๋๊ฒ ๋๊ณ   
    JOB์ ์๋ฃ ๋ ํ์๋ ๊ฒฐ๊ณผ ๋ฐ ๋ก๊ทธ๊ฐ ์ถ๋ ฅ๋๊ฒ ๋ฉ๋๋ค.  

<br/>

---

## ๐ฑโ๐ ๊ฒฐ๊ณผ ํ์ธ

Script ์คํ๋๋ก GCS์ ETL ๊ฒฐ๊ณผ ํ์ผ์ด ๋ค์๊ณผ ๊ฐ์ด ์ ์ฅ๋์์ต๋๋ค.  

![66666666](https://user-images.githubusercontent.com/69498804/116962590-5c3c3200-ace1-11eb-8614-8e54e3664677.JPG)


<br/>

๊ทธ๋ผ ํด๋น CSV ํ์ผ์ ๊ธฐ๋ฐ์ผ๋ก BigQuery์ Table์ ๋ง๋ค์ด ๋ณด๊ฒ ์ต๋๋ค.  

![65446565464](https://user-images.githubusercontent.com/69498804/116962680-a0c7cd80-ace1-11eb-84fa-c3e8ca5a092b.JPG)

<br/>

๋ฐ์ดํฐ๋ฅผ ํ์ธํด๋ณด๋ฉด Script์์ ์คํ ๋ ETL ๊ฒฐ๊ณผ๋ง ๋จ์์๋ ๊ฒ์ ํ์ธ ๊ฐ๋ฅํฉ๋๋ค.

* ์คํค๋ง ๋ฐ์ดํฐ

    ![77777](https://user-images.githubusercontent.com/69498804/116963266-59424100-ace3-11eb-9d2a-e3549f04bcae.JPG)

    <br/>

* ๊ฒฐ๊ณผ ๋ฐ์ดํฐ

    ![์บก์ฒ332131](https://user-images.githubusercontent.com/69498804/116963305-76770f80-ace3-11eb-800d-7cb6f0762ef5.JPG)


    <br/>

## ๋!



---

## ๋ง์น๋ฉฐโฆ  

  
DataProc์ ๋ํด์๋ ์ด๋ป๊ฒ ์ฌ์ฉํ๋์ง ๋์ถฉ ์์ ๋ณธ ๊ฒ ๊ฐ์ต๋๋ค.  
๊ทธ๋์ ๋ค์ ํฌ์คํธ์์๋ Proc๊ณผ ๋์ผํ ์๋น์ค๋ฅผ ์ ๊ณตํ๋ DataBricks๋ฅผ ์ฌ์ฉํด๋ณด๊ฒ ์ต๋๋ค.  


---

```toc
```