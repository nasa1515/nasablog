---
emoji: ๐คฆโโ๏ธ
title: "[DATA, GCP] - GCP DataBricks ์ฌ์ฉ๊ธฐ"
date: "2021-09-12 00:34:25"
author: nasa1515
tags: CLOUD DATA
categories: CLOUD DATA
---

  
<br/>

๋จธ๋ฆฌ๋ง  

์ ๋ฒ ํฌ์คํธ์์ DataProc์ ๋ํ ์ค๋ช๊ณผ ๊ฐ๋จํ ์ฌ์ฉ๋ฒ์ ๋ค๋ค๋ดค์์ต๋๋ค.  
์ด๋ฒ์๋ GCP์์ ํํธ๋ SaaSํํ๋ก ์ ๊ณตํด์ฃผ๋ DataBricks๋ฅผ ์ฌ์ฉํด์  
์ง๋๋ฒ๊ณผ ๋์ผํ ๋ฐ์ดํฐ, ์คํธ๋ฆฝํธ๋ฅผ ์ด์ฉํด์ ์ฑ๋ฅ์ด๋, ์ฌ์ฉ๋ฒ์ ๋ํ ํ์คํธ๋ฅผ ํด๋ดค์ต๋๋ค.  
๋ฌผ๋ผ ์ด๋ฒ์๋ ํ์ด์ฌ์ ์ฒจ๊ฐํด์  


--- 

## โ DataBricks?

![og-databricks](https://user-images.githubusercontent.com/69498804/117228331-cf65b580-ae53-11eb-9b9d-81bd0a524677.png)

Databricks๋?  
๊ฐ๋จ ์์ฝํด์ Spark,Hadoop ๋ฑ ๋น๋ฐ์ดํฐ ๊ด๋ จ ์๋ฃจ์ ์คํํ๊ฒฝ์ ์ ๊ณตํ๋ ํด๋ผ์ฐ๋ ์๋น์ค์๋๋ค.  
ํตํฉ ๋ถ์ ํ๋ซํผ์ผ๋ก, ํ WorkSpace๋ด์์ ์ฌ๋ฌ ์๋น์ค๋ฅผ ์ฌ์ฉํด ๋ชจ๋  ๋ถ์์ด ๊ฐ๋ฅํฉ๋๋ค.  
์ด์ ์ Spark, Hadoop์ ON-Premise ํ๊ฒฝ์ ์ค์นํ ํฌ์คํธ๋ฅผ ํ์ธํด๋ณด์๋ฉด ์๊ฒ ์ง๋ง  
JDK๋ถํฐ ์ฐ๋ํด์ผ ํ๋ ๋ถ๋ถ์ด ๋งค์ฐ ๊ท์ฐฎ๊ณ  ์ค๋ ์๊ฐ์ด ๊ฑธ๋ฆฌ๊ฒ ๋ฉ๋๋ค.  
DataBricks๋ฅผ ์ฌ์ฉํ๋ฉด ์ค์น, ์ค์  ๋ถ๋ถ ์์ด ๋ฐ๋ก ์ฌ์ฉ์ด ๊ฐ๋ฅํ๋ค๋ ์ฅ์ ์ด ์์ต๋๋ค.  

DataBricks๋ ์๋ ์์๋ค์ ํ WorkSpace์์ ์ง์ํฉ๋๋ค.  

- reports
- dashboards
- ETL ์์ ์คํ (Extract, Transform, Load)
- ๋จธ์ ๋ฌ๋, ์คํธ๋ฆผ ์์
- ์ํ์น Spark๋ณด๋ค ๋ optimized.
- Databricks ์๋ฒ์ ์ค์๊ฐ์ผ๋ก interaction

<br/>

---

## ๐ GCP DataBricks?

GCP, Azure, AWS ๋ฑ 3์ฌ Public Cloud๋ ์ด๋ฏธ DataBricks๋ฅผ SaaS, PaaS ํํ๋ก ์ง์ํ๊ณ  ์์ต๋๋ค.  
GCP์ ๊ฒฝ์ฐ ์์ง ๋์๋์ง 1๋์ด ์ฑ ์๋์ ๋ถ์์ ํ ๋ถ๋ถ๋ ์๊ณ  Korea Region๋ ์ง์ํ์ง ์์ต๋๋ค.  
์์ง GA์ผ์ ๋ ๋์ค์ง ์์ ์ํ๊ตฌ์...(AWS,AZURE๋ ๋ค ์๋๋ฐ...)   
๊ทธ๋์ ์ด๋ฒ ํฌ์คํธ์์๋ ์ด์ฉ ์ ์์ด US Region์์์ ํ์คํธ๋ฅผ ์งํํ๊ฒ ์ต๋๋ค.  


<br/>

* #### DataBricks ์ฌ์ฉํ๊ธฐ(๊ตฌ๋)

    GCP์์ DataBricks๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด์๋ ๋ค์๊ณผ ๊ฐ์ด ๊ตฌ๋์ ๋จผ์  ์งํํด์ผ ํฉ๋๋ค.  

    ![da](https://user-images.githubusercontent.com/69498804/117228743-a0037880-ae54-11eb-9362-11dd61314007.JPG)

    * ๊ตฌ๋ ์ดํ์ DataBricks์ ๊ตฌ๋งค ์คํ์ ์ ํ๊ณ  DataBricks Dashborad๋ก ์ด๋ํ๋ฉด ๋ฉ๋๋ค.  


    <br/>

* #### WorkSpace ์์ฑ  

    Dashborad์์ ์๋์ ๊ฐ์ด ์ฌ์ฉ ํ  WorkSpace๋ฅผ ์์ฑํ๋ฉด ๋ฉ๋๋ค.


    ![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/117228897-025c7900-ae55-11eb-941b-597f74ec3f45.JPG)


    <br/>

* #### WorkSpace ์ ์  


    WorkSpace๋ฅผ ์์ฑ ํ URL์ ์ ์ํ๋ฉด ๋๋์ด ๋ฐ์ดํฐ ์์์ ํ  ์ ์์ต๋๋ค.  

    ![123123123](https://user-images.githubusercontent.com/69498804/117229354-d42b6900-ae55-11eb-839c-bc1f7979ed4b.JPG)

<br/>


* #### DataBricks Cluster ์์ฑ  

    WorkSpace์ Cluster Tab์์ Create Cluster๋ฅผ ํด๋ฆญํด ์์ฑํฉ๋๋ค.  

    ![33333333333333](https://user-images.githubusercontent.com/69498804/117230334-d68ec280-ae57-11eb-939d-295ed700acea.JPG)


<br>

* #### ์ ๋ ๋ค์๊ณผ ๊ฐ์ Spec์ผ๋ก Cluster๋ฅผ ์์ฑํ์ต๋๋ค.  

    ![2222](https://user-images.githubusercontent.com/69498804/117380571-f20bd300-af14-11eb-9cae-69720f7c2043.JPG)
    
    * Nmae : Cluster01 
    * Runtime Version : 8.1  
    * Worker Type : n2-standard-8 
    * Advanced Option Tab์ ์ด์ด Google Service Account ์๋ ฅ 
        ์ฃผ์ : Service Account๋ GCS์ ๊ถํ์ด ์์ด์ผ ํฉ๋๋ค.

<br/>

* ์ด์  Notebook์ ์์ฑํ๊ณ  GCS๋ฅผ DBFS์ Mountํด์ ์ฌ์ฉํ์๋ฉด ๋ฉ๋๋ค.  


    ```python
    bucket_name = "nasagcp"
    mount_name = "gcpdata"
    dbutils.fs.mount("gs://%s" % bucket_name, "/mnt/%s" % mount_name)
    ```
    * ๋ค์๊ณผ ๊ฐ์ ํ์์ผ๋ก ์ฌ์ฉํ์๋ฉด ๋ฉ๋๋ค.

<br/>

* ์ ๋ ์ด์ ์ ์ง๋จ์๋ ์คํฌ๋ฆฝํธ๋ฅผ ๋ค์๊ณผ ๊ฐ์ ํ์์ผ๋ก ์ฌ์ฉํ์ต๋๋ค. 

    ```python
    bucket_name = "nasagcp"
    mount_name = "gcpdat11"
    dbutils.fs.mount("gs://%s" % bucket_name, "/mnt/%s" % mount_name)


    from pyspark.context import SparkContext
    from pyspark.sql.session import SparkSession


    # ------------------------------------------------------------------
    def renameCols(df1, old_columns, new_columns):
        for old_col,new_col in zip(old_columns,new_columns):
            d1f = df1.withColumnRenamed(old_col,new_col)
        return df1


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
    df_lee = spark.read.csv("/mnt/gcpdat11/", header=True, inferSchema=True)

    # data transform
    df_lee = df_lee.groupBy('country', 'date').agg({'min_temperature_air_2m_f' : 'avg', 'max_temperature_air_2m_f' : 'avg', 'avg_temperature_air_2m_f' : 'avg'}).sort(desc('country')).orderBy('date')

    df_result = renameCols(df_lee, old_columns, new_columns)

    country1 = df_result.select("country")
    country_dis10 = df_result.select("country").distinct()
    print("country_count =",country_dis10.count())


    # Write CSV to GCS
    df_result.coalesce(1).write.option("header", "true").mode("overwrite").csv("/mnt/gcpdat11/dbfsre/")
    ```

    * ์ด์ ์ ๋ฐ์๋จ๋ Covid-19 ๊ธฐ์ ๋ฐ์ดํฐ๋ฅผ ์ ๋ ฌํ๋ Code ์๋๋ค.  

<br/> 


---

## ๋ง์น๋ฉฐโฆ  

  
์ฌ์ค DataBricks๋ ์ฌ์ฉ๋ฒ์ ๋ํ ๊ฐ์ด๋๋ฅผ ๋จ๊ธฐ๊ธฐ์๋ ๋๋ฌด ๊ฐํธํฉ๋๋ค..  
๊ทธ๋์ ๊ทธ๋๋ง ์ด๋ ค์์ด ์์ ๊ฒ ๊ฐ์ DBFS Mount ๋ถ๋ถ๋ง ์ค๋ชํ์ต๋๋ค.  



---

```toc
```
