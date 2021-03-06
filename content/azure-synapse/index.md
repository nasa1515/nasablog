---
emoji: ๐คฆโโ๏ธ
title: "[AZURE] [DATA] Azure Synapse Analytics"
date: "2021-08-02 00:41:25"
author: nasa1515
tags: CLOUD DATA
categories: CLOUD DATA
---


๋จธ๋ฆฌ๋ง  

๋ธ๋ก๊ทธ์๋ ๋งค๋ฒ ์ธํ๋ผ๋ Devops ๊ด๋ จ ๊ธ๋ค๋ง ์ฌ๋ผ์์ ์ต๊ทผ์ ๊ณต๋ถํ๊ณ  ์๋ Data์ชฝ๋ ํฌ์คํธ๋ฅผ ๋๋ฆฌ๋ ค๊ณ  ํฉ๋๋ค.  
์์ง ์ด๊ธ์ ์์ค์ด๋ผ์ ํ๋ฆฐ ๋ด์ฉ์ด ๋ง์ ๊ฒ ๊ฐ์ง๋ง, ๋ณต์ตํ๋ ๋๋์ผ๋ก...  
๋ณธ ํฌ์คํธ์์ ๋ด์ฉ๋ค์ ๋ชจ๋ MS Doc๋ฅผ ๊ธฐ์ค์ผ๋ก ์ ๋ฆฌํด ์์ฑํ์ต๋๋ค.


---


## โ Azure Synapse Analytics 

Synapse Analytics๋ ์ํฐํ๋ผ์ด์ฆ ๋ฐ์ดํฐ ์จ์ดํ์ฐ์ง๊ณผ ๋น ๋ฐ์ดํฐ ๋ถ์์ ๊ฒฐํฉํ SaaS ์๋๋ค.  
Synapse์ ์ฉ์ด ์ค์ SQL Pool (SQL DW)์ด๋??  
Synapse Analytics์์ ์ฌ์ฉํ  ์ ์๋ ``์ํฐํ๋ผ์ด์ฆ ๋ฐ์ดํฐ ์จ์ดํ์ฐ์ง ๊ธฐ๋ฅ``์ ๋ํ๋๋๋ค. 

<br/>

* #### Enter Prise Data WareHousing

    *์ํฐํ๋ผ์ด์ฆ ์์ญ์์ ์ ์  Data (ex. ์์ ๋ฐ์ดํฐ, ๋งค์ถ ๋ฐ์ดํฐ, ๊ฐ๋ฐ ๋ฐ์ดํฐ ๋ฑ)์*  
    *ETL (extract, transform, load), ์ ์ฒ๋ฆฌ(๊ฐ๊ณต) ์  ์ค์์ ๋ชจ์ ๊ด๋ฆฌํ๋ ๋ผ๋ฆฌ ๋ก์ง*

<br/>

* #### SQL ์ ์ฉ ํ(Dedicated-leading SQL), (์  SQL DW)  

    *Synapse SQL์ ์ฌ์ฉํ  ๋ ํ๋ก๋น์ ๋๋๋ ๋ถ์ ๋ฆฌ์์ค์ ์ปฌ๋ ์์ ํํํฉ๋๋ค.*  
    *(SQL POOL์ ํฌ๊ธฐ์ ๊ฐ๊ฒฉ์ DWU(Data WareHouse Unit)์ ์ํด ๊ฒฐ์ ๋ฉ๋๋ค.* 

<br/>

* #### Dedicated SQL์ ๋ค์๊ณผ ๊ฐ์ Synapse Architecture์ ํฌํจ๋ฉ๋๋ค. 

    ![dedicated-sql-pool (1)](https://user-images.githubusercontent.com/69498804/109120531-6abe1880-7789-11eb-8b03-7e3a301f9f3b.png)

    Synapse analytics์์ ์ฌ์ฉ๊ฐ๋ฅํ ์๋น์ค ์ํคํ์ณ  
    ๊ฐ ์๋น์ค์ ์ค๋ช์ ์ฐจํ ํฌ์คํธ๋ก ๋๋ ์ ์งํ ์์ ์๋๋ค.

    * Deficated SQL Pools
    * Serverless SQL Pool
    * Apache Spark Pools
    * Pipelines (Data ํตํฉ)
    * Shared metadata system
    * Connected Service

<br/>

---


## โ Azure Portal ์์ Synapse Analystics ์์ญ ์์ฑ

<br/>

* #### Porter์์ Create resource Tab์์ Azure Synapse analystics ๊ฒ์ ํ ์ค์น

    ![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/109130587-40725800-7795-11eb-871b-24912db54ae1.JPG)

<br/>


* #### Basic ์ต์ ์ค์ 

    ![์บก์ฒ3](https://user-images.githubusercontent.com/69498804/109235009-29bd1700-7810-11eb-9521-8cfa1ca9db1d.JPG)

    * RG
    * Workspace name
    * Region
    * Account name
    * File System name

<br/>
<br/>

* #### ์์ฑ๋ Synapse workspace์ ์ ์ํฉ๋๋ค.

    ![์บก์ฒ4](https://user-images.githubusercontent.com/69498804/109237068-40fe0380-7814-11eb-92c3-17f4af65a87c.JPG)


<br/>

* #### Work Space Web URL์ ์ ์ํฉ๋๋ค.

    ![์บก์ฒ6](https://user-images.githubusercontent.com/69498804/109237187-6c80ee00-7814-11eb-8783-9ceee0ed2c19.JPG)


<br/>

* #### ๋ค์๊ณผ ๊ฐ์ Web URL์ ์ ์๋ฉ๋๋ค!

    ![์บก์ฒ7](https://user-images.githubusercontent.com/69498804/109237303-a651f480-7814-11eb-8432-cd1bdb399f61.JPG)

    WEB URL์์๋ ๋ค์๊ณผ ๊ฐ์ Blade๋ก ๋๋ฉ๋๋ค.
    * HOME : ํ ํ๋ฉด UI
    * DATA : DB or Linked ๋์ด์๋ Lake Storage ๋ฑ
    * Develop : SQL Scirpt, Data flow๋ฑ ์ฟผ๋ฆฌ์ ๋ํ ์์
    * Integrate : Develop ๊ณผ์ ์ ํตํฉํ๋ ํ์ดํ๋ผ์ธ ์์
    * Monitor : Develop, Integrate ์์์ ๋ํ ๋ชจ๋ํฐ๋ง
    * Manage : SQL Pools, Spark Pools, ํ์ดํ๋ผ์ธ ๋ฑ ๊ด๋ฆฌ

<br/>

---

## ๐ Synapse SQL Pools์ ์ด์ฉํ ๊ฐ๋จํ ์ฟผ๋ฆฌ ํ์คํธ

<br/>

* #### TEST๋ฅผ ์ํ SQL Pools์ ์์ฑํด๋ด์๋ค.

    ![์บก์ฒ11](https://user-images.githubusercontent.com/69498804/109242652-d900ea80-781e-11eb-9651-f63c35cc4f96.JPG)

    * ๋ค์๊ณผ ๊ฐ์ Manage tab -> SQL Pools -> NEW๋ก ์์ฑ๊ฐ๋ฅ   
    * Built-in์ผ๋ก Serverless๋ฅผ ์ฃผ๊ธดํ์ง๋ง ์ฌ์ฉํ์ง ์์ ๊ฒ๋๋ค.

<br/>


* ์์ฑ ๋ SQL Pools์ Data Tab์์ ๋ค์๊ณผ ๊ฐ์ด ํ์ธ์ด ๊ฐ๋ฅํฉ๋๋ค.

    ![์บก์ฒ22](https://user-images.githubusercontent.com/69498804/109244981-064f9780-7823-11eb-9c00-47998f326b06.JPG)

<br/>

* #### ์ด ํ ๋ฐ์ดํฐ๋ฅผ ๋ฃ์ด๋ณด๊ฒ ์ต๋๋ค.

    Develop Tab์์ + ๋จ์ถ๋ก ์๋ก ๋ฆฌ์์ค ์ถ๊ฐ -> SQL ์คํฌ๋ฆฝํธ๋ฅผ ์์ฑ  
    ์๋ ์คํฌ๋ฆฝํธ ์ฝ์ ํ ์คํ (Azure์์ ์ ๊ณตํ๋ 200๋ง๊ฐ ํ ๋ฐ์ดํฐ)

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

    * ๊ฐ๋จํ๊ฒ dbo.nasa1515๋ผ๋ ํ์ด๋ธ์ ๋ง๋ค๊ณ  ๋ฐ์ดํฐ๋ฅผ Load ํ๋ ์์์๋๋ค. 

<br/>


* #### ์คํฌ๋ฆฝํธ๋ฅผ ์คํํ๊ธฐ ์  ์ฐ๊ฒฐ๋์ด ์๋ SQL Pools์ ํ์ธํด์ฃผ์ธ์ 

    ![์บก์ฒ444](https://user-images.githubusercontent.com/69498804/109246549-d1910f80-7825-11eb-99ad-071d07d7229e.JPG)

    * ์ ๋ ์กฐ๊ธ ์  ๋ง๋  SQL Pools์ ์ ํํด์ RUN ํ์ต๋๋ค. 




<br/>

* #### ๋ฐฉ๋ฒ2. ๋ฏธ๋ฆฌ ๋ง๋  Data๋ฅผ ์๋ก๋ ๊ฐ๋ฅ   

    Data Tab -> Lake Storage์ ํ์ผ์์คํ์ ๋ฐ์ดํฐ UPload ๊ฐ๋ฅ

    ![์บก์ฒ8](https://user-images.githubusercontent.com/69498804/109240640-309d5700-781b-11eb-973f-2825baafa97a.JPG)



<br/>



* #### ์คํฌ๋ฆฝํธ ์คํ ํ DB์ ํ์ด๋ธ๊ณผ ๋ฐ์ดํฐ๋ฅผ ํ์ธํฉ๋๋ค.

    ![์บก์ฒ22211](https://user-images.githubusercontent.com/69498804/109254859-36546600-7836-11eb-8a94-113c77c54c3b.JPG)


<br/>

---


## ๐ ์ด์  DB์์ ๋ฐ์ดํฐ๋ฅผ ๋ฝ์์ ์๊ฐํ ํด๋ณด์ฃ   


* #### ์์ฑํ๋ Table์์ New SQL script -> Select TOP 100 rows ์ฐฝ์ ์ ์   

    ![์บก์ฒ11](https://user-images.githubusercontent.com/69498804/109255127-b5499e80-7836-11eb-8d7a-4e82169c906c.JPG)



<br/>

* #### ๊ทธ๋ผ ๋ค์๊ณผ ๊ฐ์ Select ๋ฌธ์ด ๋์ค๋๋ฐ ์ง์ฐ๊ณ  ์๋ ์คํฌ๋ฆฝํธ๋ฅผ ์๋ ฅ ํ RUN

    ![์บก์ฒ33333](https://user-images.githubusercontent.com/69498804/109255293-0c4f7380-7837-11eb-831e-a5237dbc0dfd.JPG)


    ```cs
    SELECT PassengerCount,
        SUM(TripDistanceMiles) as SumTripDistance,
        AVG(TripDistanceMiles) as AvgTripDistance
    FROM  dbo.nasa1515
    WHERE TripDistanceMiles > 0 AND PassengerCount > 0
    GROUP BY PassengerCount
    ORDER BY PassengerCount;
    ```
    * ๋ฃ์๋ DB๋ ๋ด์ ํ์๊ธฐ์ฌ์ ๋ฐ์ดํฐ์๋๋ค.
    * ์ ์คํฌ๋ฆฝํธ๋ ์ด ์ฃผํ๊ฑฐ๋ฆฌ,ํ๊ท  ์ฃผํ๊ฑฐ๋ฆฌ, ์น๊ฐ ์ ๋ฐ์ดํฐ๋ฅผ ๋ฝ์ต๋๋ค.  

<br/>

* #### ๋ค์๊ณผ ๊ฐ์ด SQL DB์์ ํด๋น ๋ฐ์ดํฐ๊ฐ ํธ์ถ๋๊ฒ ๋ฉ๋๋ค.

    ![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/109255651-c5ae4900-7837-11eb-9a7e-2a0bfd960e10.JPG)



<br/>

* #### ๋ํ ํธ์ถํด๋ธ ๊ฒฐ๊ณผ๋ฅผ ๋ค์๊ณผ ๊ฐ์ด ์ฝ๊ฒ ์๊ฐํ๊ฐ ๊ฐ๋ฅํฉ๋๋ค.  

    ![์บก์ฒ222222](https://user-images.githubusercontent.com/69498804/109255782-027a4000-7838-11eb-8b9c-0467ef957ec6.JPG)

    * View Tab์ Chart๋ก๋ง ๋ณ๊ฒฝํ๋ฉด ๋๋ค.


<br/>


* #### ์ถ๊ฐ์ ์ผ๋ก Monitor Tab์์ ์ฟผ๋ฆฌ์ ๋ํ ๋ชจ๋ํฐ๋ง๋ ๊ฐ๋ฅํฉ๋๋ค. 

    ![ttest](https://user-images.githubusercontent.com/69498804/109260684-f0050400-7841-11eb-819e-e86e57090c4c.JPG)

    * ๊ธฐ๋ณธ์ ์ผ๋ก ํ์ดํ๋ผ์ธ, ํธ๋ฆฌ๊ฑฐ, Pools๋ค์ ์ํ๋ฅผ ํ์ธ ๊ฐ๋ฅ  

<br/>


* #### ์๋จ์ Publish all์ ํ๊ฒ ๋๋ฉด ๋ฐฉ๊ธ์ ์ ์ฌ์ฉํ๋ ์ฟผ๋ฆฌ๊ฐ ์ ์ฅ ๋ฐ ๋ฑ๋ก๋ฉ๋๋ค.

    ![222131](https://user-images.githubusercontent.com/69498804/109261400-0f506100-7843-11eb-8cde-9caafb85f3e7.JPG)

<br/>


* #### ๊ทธ๋ผ Develop Tab์ Script๊ฐ ์๋์ผ๋ก ์์ฑ๋ฉ๋๋ค.

    ![์บก์ฒ33341](https://user-images.githubusercontent.com/69498804/109261495-3b6be200-7843-11eb-99f8-a7ef61007724.JPG)

    * ํด๋น ์คํฌ๋ฆฝํธ๋ฅผ integrate ํ์ดํ๋ผ์ธ์ ๋ฃ์ด ์๋ํ๋ ๊ฐ๋ฅํฉ๋๋ค.

<br/>


์ด๋ฒ ํฌ์คํธ์์๋ SQL Pools๋ก ์งํํ๋ ๋ฐฉ๋ฒ๋ง ๋ค๋ค๋ดค์ต๋๋ค. 
Serverless, Apache Spark ๋ฑ์ ๋ฐฉ๋ฒ์ ์ถํ์ ํฌ์คํธ ์์ ์๋๋ค. 


<br/>

---

## ๋ง์น๋ฉฐโฆ  


Data์ชฝ์ ์์ง ์๋ฌด๊ฒ๋ ๋ชจ๋ฅด๊ฒ ์ต๋๋ค.  
์กฐ๊ธ ์กฐ๊ธ์ฉ ๊ธฐ์ด ์ด๋ก ๋ถํฐ ์์ํด์ ์ค์ต๊น์ง ์ธํ๋ผ์ฒ๋ผ ๋ ์ ์๋ค๊ณ  ์๊ฐํฉ๋๋ค.  

---

```toc
```