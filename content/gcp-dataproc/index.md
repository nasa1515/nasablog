---
emoji: ๐คฆโโ๏ธ
title: "[DATA, GCP] - GCP DataProc spark Cluster๋ก ETL ํ BigQuery์ ์ ์ฌ"
date: "2021-09-08 00:34:25"
author: nasa1515
tags: CLOUD DATA
categories: CLOUD DATA
---

  


๋จธ๋ฆฌ๋ง  

์ด๋ฒ์๋ DataProc(Hadoop/Spark)๋ฅผ ์ฌ์ฉํ์ฌ 
๋์ฉ๋์ ๋ฐ์ดํฐ๋ฅผ ์ฒ๋ฆฌํ๋ ๋ฐฉ๋ฒ์ ๋ํด์ ๋ค๋ฃน๋๋ค. ๋ฌผ๋ก  ํ์ด์ฌ์ ์ฒจ๊ฐํด์  



--- 

## โ DataProc์ ๋ํด์..

*Dataproc์ ์ผ๊ด ์ฒ๋ฆฌ, ์ฟผ๋ฆฌ, ์คํธ๋ฆฌ๋ฐ, ๋จธ์  ๋ฌ๋์ ์คํ์์ค ๋ฐ์ดํฐ ๋๊ตฌ๋ฅผ ํ์ฉํ  ์ ์๋ ๊ด๋ฆฌํ Spark ๋ฐ Hadoop ์๋น์ค์๋๋ค.*  
์ฆ ์ง๊ธ๊น์ง ๊ท์ฐฎ๊ฒ Spark, Hadoop์ ์ฐ๋ํ๋ ๊ณผ์ ์ ์์ ๊ณ  ์ฌ์ฉ๋งํ๋ฉด ๋๋ ์๋น์ค๋ผ๊ณ  ๋ณผ ์ ์์ต๋๋ค.  

์ฌ๊ธฐ์ DataFlow์ DataProc์ ์ฐจ์ด์ ๋ํด์ ๊ถ๊ธ์ฆ์ด ์๊ฒผ๋๋ฐ  
๋ ํด ๋ชจ๋ ETL์ ํ๋ ํด์ ๋ํด์๋ ๊ณตํต์ ์ ๊ฐ์ง๊ณ  ์์ง๋ง  
DataFlow๋ Serverless ์๋น์ค๋ก Streaming, Batch Flow๋ฅผ Code๋ก ๊ด๋ฆฌํ๊ณ  ์ถ์ผ๋ฉด ์ฌ์ฉํ๊ณ   
DataProc์ ๊ธฐ์กด์ HDFS ๊ฐ์ Hadoop EcoSystem์ ์ข์๋์ด ์๋ ์์คํ์ ๊ฐ์ง๊ณ  ์๋ค๋ฉด ์ฌ์ฉํ๊ธฐ ์ข๋ค๊ณ  ํฉ๋๋ค.


<br/>

---

## โ DataProc Cluster ์์ฑ

<br/>

* GCP ํ์ ๋ฉ๋ด > Dataproc > ํด๋ฌ์คํฐ ์ ํ > ํด๋ฌ์คํฐ ๋ง๋ค๊ธฐ

    ![๋ค์ด๋ก๋](https://user-images.githubusercontent.com/69498804/116354676-b8134080-a833-11eb-8b5a-249126ff2798.png)


<br/>

* ํด๋ฌ์คํฐ ํ๋ ์ค์  (์ด๋ฆ์ ์ ์ธํ ๋๋จธ์ง ๋ถ๋ถ์ ๊ธฐ๋ณธ๊ฐ)

    ![์บก์ฒ](https://user-images.githubusercontent.com/69498804/116355090-4f789380-a834-11eb-8880-311c70b982b2.JPG)

    <br/>

* ํ๋ก๋น์ ๋ ๊ณผ์ ์ 3๋ถ์ ๋ ๊ฑฐ์น๊ณ  ๋ค์๊ณผ ๊ฐ์ด ์์ฑ์ด ์๋ฃ๋ฉ๋๋ค.

    ![2](https://user-images.githubusercontent.com/69498804/116356531-5b655500-a836-11eb-873e-f5701fbc4d9a.JPG)

<br/>

---

## ๐ Data ์ค๋นํ๊ธฐ

์ด๋ฒ ํฌ์คํธ์์๋ BigQuery์์ ๊ณต๊ฐ์ ์ผ๋ก ์ ๊ณตํ๋ DataSet์ ์ด์ฉํฉ๋๋ค.  

Dataproc Cluster๋ GCS Connector๋ฅผ ๊ธฐ๋ณธ์ผ๋ก ์ ๊ณตํ์ฌ  
๋ค๋ฅธ ์ค์ ์์ด GCS์ ์๋ ๋ฐ์ดํฐ์ ๋ฐ๋ก ์ก์ธ์ค๊ฐ ๊ฐ๋ฅํฉ๋๋ค.  
์ ๋ ์ด๋ฅผ ์ด์ฉํด์ BigQuery์ ๊ณต๊ฐ DataSet์ ํน์  ํ์ด๋ธ์ Cloud Storage๋ก Exportํ์ฌ  
Exportํ ๋ฐ์ดํฐ์ ๋ฐ๋ก ์ ๊ทผํ์ฌ ์ฌ์ฉ, ํผํฌ๋จผ์ค ํ์คํธ๋ฅผ ํด๋ณด๊ฒ ์ต๋๋ค.  

<br/>


* ๋ฐ์ดํฐ ์ ๋ณด  

    ![์บก์ฒ3](https://user-images.githubusercontent.com/69498804/116357157-24437380-a837-11eb-9047-048e8e5a018d.JPG)

    * Table ID : bigquery-public-data:covid19_weathersource_com.postal_code_day_history
    * Table ํฌ๊ธฐ : ์ฝ 300 

    <br/>

* ๋ฐ์ดํฐ ํ์ 

    ![์บก์ฒ4](https://user-images.githubusercontent.com/69498804/116357277-476e2300-a837-11eb-920c-682f3e9dfa19.JPG)

    ๋ฐ์ดํฐ์ ๋ด์ฉ์ ๋๋ผ ๋ณ COVID-19์ ๊ธฐ์์ํ ๋ฐ์ดํฐ์๋๋ค.  

<br/>

* Cloude Storage ์์ฑ (GCS) - ์ฟผ๋ฆฌ ๊ฒฐ๊ณผ ๋ฐ์ด๋ฌ(CSV)ํ ์๋ ๊ณณ  

    ![์บก์ฒ5](https://user-images.githubusercontent.com/69498804/116358291-720cab80-a838-11eb-8d31-a13169891652.JPG)

    * Region์ Bigquery์ ๋ง์ถฐ์ฃผ์ด์ผ ํฉ๋๋ค. 

<br/>

* BigQuery DataSet, Table ์์ฑ (์ฟผ๋ฆฌ ๊ฒฐ๊ณผ ๋ฐ์ดํฐ๋ฅผ ์๋ ๊ณณ)

    ![์บก์ฒ6](https://user-images.githubusercontent.com/69498804/116358650-d7609c80-a838-11eb-8791-4acddef9cb46.JPG)

<br/>


* ์ ๋ Python์ผ๋ก ๊ฐ๋จํ ์ฝ๋๋ฅผ ์์ฑํด์ ๋ค์๊ณผ ๊ฐ์ด ๋ฐ์ดํฐ๋ฅผ ๋ถ๋ฅํ์ต๋๋ค.  

    ๊ณต๊ฐ DataSet์์ ์ฟผ๋ฆฌ ๊ฒฐ๊ณผ๋ฅผ ๋ค๋ฅธ ํ์ด๋ธ์ ์ ์ฅํ๋ ์ฝ๋ 

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
    * ์์์ผ ํ๋ ๊ฑด Table์ ๋ณต์ฌํ๋ ๊ฒ๊ณผ ๋ฐ์ดํฐ๋ง(์ฟผ๋ฆฌ๊ฒฐ๊ณผ)๋ณต์ฌํ๋ ๊ฒ์ ๋ค๋ฆ๋๋ค.  
    Table์ ๊ทธ๋๋ก ๋ณต์ฌํ๊ฒ๋๋ฉด Table์ ์ ๋ณด๊น์ง ์ ์ฅ๋ฉ๋๋ค..


<br/>

* ํด๋น Code๋ฅผ ์คํ์ํค๊ฒ ๋๋ฉด ๋ค์๊ณผ ๊ฐ์ด ํน์  Table์ ์ฟผ๋ฆฌ๊ฒฐ๊ณผ๊ฐ ์ ์ฅ๋ฉ๋๋ค.  


    ![์บก์ฒ](https://user-images.githubusercontent.com/69498804/116361301-c9f8e180-a83b-11eb-90fb-a61cfbbd8fc9.JPG)

<br>

* ์ฟผ๋ฆฌ๊ฒฐ๊ณผ๊ฐ ์ ์ฅ๋์ด์๋ Table์ ๋ฐ์ดํฐ๋ฅผ csv๋ก ๋ณํํด์ GCS๋ก ์ ์ฅ  

    ```python
    # Source option
    project = "lws-cloocus"
    dataset_id = "ustest"
    table_id = "ustable"


    # ์ฉ๋ ๋ง์ Table (1G์ด์)์ * ์ ๊ทํํ์์ผ๋ก Table ์ฝ์ด์ csvํ ์์ผ์ผ ํจ.
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

    * BigQeury์์ Data๋ฅผ export ํ  ๋ ํ๋ฒ์ 1GB ๋จ์๊น์ง ๋ฐ์ ์ง์๋์ง ์์ต๋๋ค.  
    ๋๋ฌธ์ * ์์ผ๋์นด๋๋ฅผ ์ฌ์ฉํด์ CSV File์ ๋ถ๋ฆฌํด์ค์ผ ํฉ๋๋ค.  

    <br/>

* ํด๋น ์ฝ๋๋ฅผ ์คํ์ํค๋ฉด ๋ค์๊ณผ ๊ฐ์ด GCS์ Data๊ฐ ์ ์ฅ๋ฉ๋๋ค.  


    ![์บก์ฒ3](https://user-images.githubusercontent.com/69498804/116361977-8783d480-a83c-11eb-8d1e-5d447ce71323.JPG)

    * ๋ค์๊ณผ ๊ฐ์ด ์ฉ๋์ด ์ผ์ ํ๊ฒ ๋๋ ์ ์ ์ฅ๋ฉ๋๋ค.  

<br/>

* ์ ์ฅ๋ CSV File์ Local๋ก ๋ค์ด๋ฐ์์ NotePad๋ก ํ์ธํด๋ณด์ฃ   

    ![23](https://user-images.githubusercontent.com/69498804/116362297-ddf11300-a83c-11eb-8944-4694fb94bd4e.JPG)

    * ๋ค์๊ณผ ๊ฐ์ด ๋งจ ์์ค์ ํค๋ ์ ๋ณด, ๋๋จธ์ง๋ ๋ฐ์ดํฐ ๊ฐ๋ง ์ ์ฅ๋ฉ๋๋ค.  

<br/>

---

## ๐ Jupyter Notebook ์ฐ๊ฒฐ

์ด์  ๊ฐ๋จํ ์ฟผ๋ฆฌ ํ์คํธ๋ฅผ ์งํํ๊ธฐ ์ํด Jupyter Notebook์ ์ฐ๊ฒฐ ํ๋ ค๊ณ  ํ๋๋ฐ...  
๋ณด๋๊น Cluster๋ฅผ ์๋ชป ์์ฑํ๋ค์ ์๋ ๊ตฌ์ฑ์์ GW๋ฅผ ์ฌ์ฉํ๋ ์ต์์ ์ฒดํฌํด์ผํฉ๋๋ค.  

* ๊ตฌ์ฑ์์ ๊ฒ์ดํธ์จ์ด 

    ![์บก์ฒ](https://user-images.githubusercontent.com/69498804/116366348-2a3e5200-a841-11eb-81c1-c83a9f629154.JPG)

    * ๊ฒ์ดํธ์จ์ด ์ต์ ์ฒดํฌ
    * ๊ตฌ์ฑ์์์์ Jupyter Notebook ์ฒดํฌ 

<br/>

* ํด๋ฌ์คํฐ๊ฐ ์๋กญ๊ฒ ๋ง๋ค์ด์ก๋ค๋ฉด ํด๋ฌ์คํฐ ์ ๋ณด-> ์น ์ธํฐํ์ด์ค๋ก ์ ์ํฉ๋๋ค.  

    ![์บก์ฒ3](https://user-images.githubusercontent.com/69498804/116367440-527a8080-a842-11eb-9843-2fdb4cfdecfa.JPG)

    * ๊ทธ๋ผ ๋ค์๊ณผ ๊ฐ์ด JupyterLab GW link๊ฐ ์๊ธฐ๊ณ  ์ ์ํฉ๋๋ค.  

    <br/>

* ๊ทธ๋ผ ๋ค์๊ณผ ๊ฐ์ด DataProc Cluster์ ์ฐ๊ฒฐ๋ Jupyter Page์ ์ ์์ด ๊ฐ๋ฅํฉ๋๋ค. 

    ![์บก์ฒ4](https://user-images.githubusercontent.com/69498804/116367646-85bd0f80-a842-11eb-8005-406031f0ca44.JPG)


<br/>

* ์ด ํ์ GCS์ ์ ์ฅ๋ csv๋ฅผ ์ฝ๋ ๊ฒ๋ ๊ฐ๋ฅํฉ๋๋ค.  

    ![33333](https://user-images.githubusercontent.com/69498804/116504392-21a65400-a8f3-11eb-9e7e-8295718c17e2.JPG)

    <br/>

* ์ ๋ ์ฟผ๋ฆฌ ๊ฒฐ๊ณผ ์๊ฐ์ด๋, table ํํ๋ก ๊ฒฐ๊ณผ๋ฅผ ๋ณด๊ณ  ์ถ์ด์ extension์ ์ถ๊ฐ ์ค์น ํ์ต๋๋ค. 


    <br/>


    * Jupyter์์ Terminal ์ฐฝ์ ์ฐ ๋ค ์๋ ๋ช๋ น์ด๋ก ์ค์นํฉ๋๋ค.

        ```cs
        # pip install jupyterlab_execute_time

        ```

    <br/>

    * ์ค์น๊ฐ ์๋ฃ ๋ ๋ค ์ฐ๊ฒฐ๋ WEB์ ์๋ก๊ณ ์นจ ํ๋ฉด execure-time ์ด ์ค์น๋์ด ์์ต๋๋ค.  

        ![์บก์ฒ444](https://user-images.githubusercontent.com/69498804/116510416-d5154580-a8ff-11eb-86ff-8ea55e585217.JPG)

    <br/>

    * ๊ทธ ํ Settings - Advanced Settings editor - Notebook์ ์๋ ์ฝ๋๋ฅผ ์ถ๊ฐํฉ๋๋ค.  

        ![22222222](https://user-images.githubusercontent.com/69498804/116514663-4b1cab00-a906-11eb-9071-34c3d15fc616.JPG)
 

    <br/>

    * ๊ทธ๋ผ ๋ค์๊ณผ ๊ฐ์ด ์ฟผ๋ฆฌ ์คํ ์๊ฐ์ด ์ถ๋ ฅ๋ฉ๋๋ค.!

        ![3213121](https://user-images.githubusercontent.com/69498804/116514759-6be50080-a906-11eb-9860-534243a6388f.JPG)


<br/>


* ์ ๋ ํ์ํด๋ณด์ด๋ ์ถ๊ฐ Extention์ ๋ ์ค์นํด์คฌ์ต๋๋ค.  

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

## ๐ Pyspark Test

์์์๋ Test๋ฅผ ํด๋ดค์ง๋ง ๊ทธ๋๋ ๋ช๊ฐ์ง pyspark ํจ์๋ฅผ ์ฌ์ฉํด๋ณด๊ฒ ์ต๋๋ค.  

<br/>

* CSV File ์ฝ์ด์ค๊ธฐ (GCS์ ์๋)  

    ```python
    # df = spark.read.csv("gs://nasa_us/", header=True, inferSchema=True)
    ```
    * gs://nasa_us/ ๊ฒฝ๋ก์ ์๋ ๋ชจ๋  ํ์ผ์ ์ฝ์ต๋๋ค.  
    * read.csv ์ต์์ธ header, inferSchema๋ฅผ ์ฌ์ฉํ์ต๋๋ค.  

    ![2221313](https://user-images.githubusercontent.com/69498804/116836339-17d96500-ac01-11eb-9ab5-707e5ae65e2c.JPG)

    * ์ฝ 45.96s ๊ฐ ์์ ๋์์ต๋๋ค.  


<br/>

* ํด๋น DataFrame์ Row ๋ฐํ 

    ```python
    # df.show(10)    -- Row 10๊ฐ ๋ฐํ
    # df.count()     -- Row ๊ฐฏ์ ๋ฐํ
    ```

    ![11111](https://user-images.githubusercontent.com/69498804/116836737-ac909280-ac02-11eb-8dcc-dac053327581.JPG)

    * show์๋ 546ms ๊ฐ ์์ ๋์์ต๋๋ค.
    * count์๋ 13.81s ๊ฐ ์์ ๋์์ต๋๋ค.  

<br/>

* ํด๋น DataFrame์ Summary ๊ฐ ๋ฐํ

    ```python
    # df.summary().show()
    ```

    ![222222](https://user-images.githubusercontent.com/69498804/116841196-68f25480-ac13-11eb-872b-1fc2019bdc29.JPG)

    * Summary์๋ 4m 16.06s ๊ฐ ์์ ๋์์ต๋๋ค.


<br/>


---

## ๋ง์น๋ฉฐโฆ  

  
DataProc์ ์ฌ์ฉํด๋ณด๋ฉด์ Spark์ ๋ํด์๋ ๋ค์ ์์ ๊ฐ ์๊ฐ์๋๋ค.  
๊ทธ๋์ ๋ค์ ํฌ์คํธ์์๋ Pyspark์ ๋ฌธ๋ฒ์ ๋ํด์ ํฌ์คํ ์์ ์๋๋ค.  


---

```toc
```
