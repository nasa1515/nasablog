---
emoji: 🤦‍♂️
title: Storage Account, Azure BLOG! [AZURE]
date: "2021-07-30 00:34:25"
author: nasa1515
tags: AZURE
categories: AZURE
---


머리말  
  
스토리지에 대한 내용은 앞에서 간단하게 다뤘지만
세부적인 내용들이 많이 부족합니다, 더 구체화 한 포스트를 이번에 작성했습니다. 



--- 


## ✔ 스토리지(STORAGE) 

<br/>

모든 데이터는 비정형데이터, 반정형데이터, 정형 데이터라는 3가지 유형으로 나눌 수 있습니다.

<br/>

데이터 유형

|유형|설명|예|
|:---|:---|:---|
|비정형 데이터|데이터가 개체로 존재, 구조화 되지 않아 연산이 불가능|문서, 동영상, 이미지 등 이진 파일|
|반정형 데이터|스키마에 해당하는 메타데이터가 데이터 내부에 있으며 연산 불가능|HTML, XML, JSON, YAML 형식 데이터|
|정형 데이터|고정된 칼럼에 저장되거나 행과 열에 의해 데이터 속성이 구분 되는 데이터, 연산가능|RDBMS 테이블, 스프레드시트|


<br/>

<br/>

Azure 스토리지는 위 3가지 유형 뿐 아니라 빅데이터 등의 시나리오도 지원합니다.

* 가상 컴퓨터의 디스크와 공유 폴더용 스토리지
* 정의된 데이터 모델을 가지고 있지 않은 비정형 데이터(Blob 데이터)용 스토리지
* 관계형 DB 데이터, 스트레드시트처럼 스키마 구조를 따르는 구조화 데이터 스토리지
* 반 구조화된 데이터 (반정형)용 스토리지


<br/>

---

## ✌ 스토리지 계정(Storage Account)

Azure 스토리지 서비스는 Storage Account를 통해 관리합니다.  
즉 스토리지 계정이 Storage 서비스의 최상위 NameSpace이며 하위의 스토리지를 사용할 수 있게 권한을 부여합니다.  
그래서 스토리지 서비스를 사용하기 위한 첫 번째 작업이 Storage Account를 만드는 것입니다.  
이제 스토리지 계정을 생성하며 세부 옵션들에 대해 알아봅시다



<br/>

* 스토리지 계정 생성 Tab

    ![캡처4444](https://user-images.githubusercontent.com/69498804/107182135-8acaa980-6a1f-11eb-9cc4-a74f1e67bb5f.JPG)

<br/>

* Storage Account Name : 아래 3가지 조건을 만족해야 합니다.

    * Azure 전체에서 고유한 이름
    * 이름의 길이는 3~24자
    * 소문자 및 숫자(소문자로 시작해야 함)  

    <br>



* Performance : Perfomance는 생성 후 변경 할 수 없습니다.   

    Performance에 따라 선택할 수 있는 Account Kind가 달라 집니다.

    * Storage(범용 v1) : Blob 및 파일, 큐, 테이블을 지원하는 레거시 계정
    * StorageV2(범용 v2) : 기본 스토리지 계정 v1과 동일 기능 지원
    * BlobStorage : Blob 전용 레거시 스토리지 계정
    * FileStorage : 프리미엄 성능 계층에서 사용, 파일 공유 전용 스토리지 계정입니다. (SQL 등)
    * BlockblobStorage : 프리미엄 계층에서 사용, 개체 데이터를 저장하는 Blob과 추가 Blob 전용 스토리지 계정

 
 <br/>

 * Replication : 일시적인 하드웨어 오류, 네트워크 이슈에 데이터를 보호하기 위한 복제 옵션

     ![캡처66666](https://user-images.githubusercontent.com/69498804/107182831-d3369700-6a20-11eb-9842-f450e61e6689.JPG)


<br/>

### 기본 지역 내 Redundancy 옵션

<br/>

Azure Storage 계정은 기본 지역으로 설정한 곳에서(예: 한국 중부) 항상 세 차례 복제됩니다.  
기본 지역에서 데이터가 복제되는 옵션은 두 가지 중에서 선택이 가능합니다.

<br/>

* ### LRS(Locally Redundant Storage)

    -> 물리적으로 동일한 지역 내에 데이터를 세 번 복제하는 방식
    저렴한 방법이지만 해당 데이터센터에 장애가 발생한 경우에는 데이터를 복구할 수 없어 가용성이 떨어집니다

    ![다운로드](https://user-images.githubusercontent.com/69498804/107183136-8dc69980-6a21-11eb-8ea3-f63e76ad1eee.png)


    data가 세개의 복제본에 완전히 동기화되어야 하기 때문에 쓰기 작업의 경우 세 개의 복제본에 작업이 마쳐야 완료 됩니다.


<br/>


* ### ZRS(Zone Redundant Storage)

    -> 기본 지역 내의 세 개의 다른 가용성 영역에 데이터를 복제하는 방식입니다. (LRS 방식보다 높은 가용성을 제공합니다.)    
    한 장소에 세 개의 복제를 모두 저장하는 LRS 방식에 비해서는 더 안전할 수 있지만  
    Region 자체에 문제가 발생하게 되는 경우에는 복구할 수 없습니다.

    ![다운로드](https://user-images.githubusercontent.com/69498804/107183291-e5fd9b80-6a21-11eb-8f55-1a43bf7765f5.png)

    * 현재 한국 Region에서는 사용할 수 없는 옵션입니다

<br/>


<br/>

### 보조 지역 내 Redundancy 옵션

<br/>

고가용성을 필요로 하는 프로그램의 경우 기본 지역 이외에 보조 지역에 복제해서 보관이 가능합니다.  
단 보조 지역을 선택할 수 없고, 주 지역의 리전 쌍(Paired Region)으로 자동 지정됩니다.  
주의 사항은 보조 지역에 저장되어 있는 데이터는 동기화 되어 있지 않아, 주 지역과 싱크가 정확히 맞지 않을 수 있습니다.  

<br/>

* ### GRS(Geo Redundant Storage) 

    -> LRS 방식으로 기본 지역내에 데이터를 동기화해 보조 지역에 싱크

    ![다운로드 (2)](https://user-images.githubusercontent.com/69498804/107183700-9ec3da80-6a22-11eb-917b-85b79f88b697.png)

<br/>

* ### GZRS(Geo Zone Redundant Storage)

    -> ZRS 방식으로 기본 지역 내 세곳의 가용성 영역에 동기화,복사.

    ![다운로드 (3)](https://user-images.githubusercontent.com/69498804/107183813-cb77f200-6a22-11eb-9b32-a73b5f92a697.png)

    * 스토리지 계정 종류가 범용 v2의 경우에만 GZRS 혹은 RA-GZRS를 설정할 수 있습니다. 단, 현재 한국 지역에는 지원되지 않습니다.


<br>

* 위의 Storage Account 별 Redundancy 방식을 정리하면 아래와 같습니다. 

    ![캡처11221122](https://user-images.githubusercontent.com/69498804/107184065-388b8780-6a23-11eb-8cbd-aa13e27d47de.JPG)

    * GRS,GZRS의 경우 보조 지역의 데이터의 복제 데이터에 대한 읽기/쓰기 접근이 안됩니다.
    * 읽기 접근이 가능하기 위해선 표에 있는 RA-GRS,RA-GZRS를 사용해야 합니다.


<br/>

* 더 간단하게 스토리지 별 Account 기능 비교를 정리해봤습니다.

    |계정종류|지원 서비스|성능|엑세스 계층|복제 옵션|
    |---|---|---|---|---|
    |Storage|Blob,File Storage,큐,Table,Disk|표준 프리미엄|N/A|LRS,ZRS,RA-GRS|
    |StorageV2|Blob,File Storage,큐,Table,Disk|표준 프리미엄|HOT,COLL|LRS,ZRS,GRS,RA-GRS,RA-GZRS|
    |BlobStorage|블록 Blob,추가 Blob|표준|HOT,COLL|LRS,ZRS,RA-GRS|
    |BlockBlobStarage|블록 Blob,추가 Blob|프리미엄|N/A|LRS,ZRS|
    |FileStorage|파일 공유|프리미엄|N/A|LRS,ZRS|


<br/>
<br/>

 * Networking : 네트워크 연결 방법과 네트워크 라우팅 기본 설정이 있습니다.


    ![캡처666666](https://user-images.githubusercontent.com/69498804/107185013-f82d0900-6a24-11eb-91ba-21acaec8d43a.JPG)

    * Public Endpoint(All Network) : 기본적인 공용 공유입니다.
    * Public Endpoint (Selected Network) : 특정 네트워크에만 엑세스
    * Pricate Endpoint : Vnet에서 사설 IP를 할당해 프라이빗 하게 엑세스


<br>

<br>


* 엑세스 계층

    ![캡처777676](https://user-images.githubusercontent.com/69498804/107185211-5b1ea000-6a25-11eb-8564-bed7c94fdd1e.JPG)

    스토리지 계정을 생성할때 Blob 데이터의 엑세스 계층을 지정합니다.  

    * HOT : 일반적인 시나리오, 자주 엑세스해야 하는 데이터에 적합
    * Cool : HOT에 비해 저장소 비용은 낮고 엑세스 비용은 높다, 30일 동안 저장하는 데이터에 적합
    * 보관(Archive) : 저장소 비용은 가장 낮으나 검색 비용은 높습니다, 최소 180일 장기 보관 용입니다.

<br/>

---

## 👍 스토리지 계정(Storage Account) 생성


위에 설명한 세부 설정 Tab들을 모두 Default로 놓고 간단하게 생성해보겠습니다.  

* 배포가 정상적으로 이뤄지면 다음과 같이 생성됩니다.

    ![캡처988989898](https://user-images.githubusercontent.com/69498804/107186139-0ed45f80-6a27-11eb-9f9a-fb62b1eafa1d.JPG)

<br/>

* Access Key Tab에서 발급된 Access Key를 확인 할 수 있습니다.

    ![캡처6656656565](https://user-images.githubusercontent.com/69498804/107186271-46430c00-6a27-11eb-898c-645317dcdb56.JPG)


<br/>

---

## 🌹 스토리지 Service 
<br/>

위에서 StorageV2 범용 계정을 생성했다면 기본적으로 모든 스토리지 서비스를 제공합니다.  
각 스토리지 서비스는 HTTP/HTTPS를 통해 어디서나 엑세스 할 수 있습니다.  
따라서 스토리지 서비스 마다 고유한 엑세스 URL을 제공합니다. 

* 컨테이너(Blob)스토리지 : http://(스토리지 계정).blob.core.windows.net/
* 파일 공유 스토리지 : http://(스토리지 계정).file.core.windows.net/
* 큐 스토리지 : http://(스토리지 계정).queue.core.windows.net/
* 테이블 스토리지 : http://(스토리지 계정).table.core.windows.net/

<br/>

이제 각 스토리지 서비스에 대해 살펴보겠습니다.


<br/>

### Blob (컨테이너) Storage Service 

<br/>

구조화되지 않은 대량의 비정형 데이터를 저장하기 위한 개체 스토리지 솔루션입니다.  
원래는 Blob이란 이름을 사용했으나 최근에 컨테이너로 변경되었습니다.  
컨테이너 스토리지는 브라우저를 통해 이미지, 문서 파일에 직접 엑세스 하거나 저장할 경우  
동영상, 오디오 스트리밍, 로그파일 등을 분석하기 위한 데이터 저장 시나리오에 적합합니다.

<br/>

* 컨테이너 스토리지의 리소스 관계

    ![blob1](https://user-images.githubusercontent.com/69498804/107189039-06325800-6a2c-11eb-9105-45da19b6f7fc.png)


<br/>

---

## 🙌 컨테이너(Blob) 스토리지 생성

<br/>

컨테이너 스토리지에 Blob 데이터를 저장하기 위해선 우선 컨테이너를 만들어야 합니다.  


![캡처767676767](https://user-images.githubusercontent.com/69498804/107189266-717c2a00-6a2c-11eb-806c-7f633f01bf7c.JPG)


<br/>

여기서 컨테이너는 Blob들을 그룹화 하는 논리적인 개념입니다.  
간단히 Blob 집합을 모아 놓은 논리적 개념으로 생각해야 합니다.  

<br/>

컨테이너 생성 Option 설명

![캡처89797898798798](https://user-images.githubusercontent.com/69498804/107189434-b902b600-6a2c-11eb-9fd6-f2ae73e54ff5.JPG)

* Name : 소문자, 문자와 "-"만 포함, 길이는 3~64자

* Public access level : 컨테이너와 Blob에 익명 엑세스를 관리

    * Private : 기본, 익명 엑세스 제공 X
    * Blob : 인증 없이 읽을 수 있지만, Blob 목록 나열 x
    * Container : Blob을 읽을 수 있습니다.

<br/>

컨테이너를 생성하더라도 스토리지 계정의 다음 부분이 허용되어야 합니다.

![캡처89898898989](https://user-images.githubusercontent.com/69498804/107189964-84432e80-6a2d-11eb-96da-9b43345a8440.JPG)

<br/>


Blob 데이터 관리  

컨테이너를 만들고 나면 2가지 방법으로 데이터를 관리 할 수 있습니다.

* 루트에 파일을 저장
* 폴더를 생성해 폴더 내에 파일을 저장


<br/>
<br/>

Blob 업로드 Blade의 Option을 살펴봅시다.

![캡처899898989898989](https://user-images.githubusercontent.com/69498804/107190238-eac84c80-6a2d-11eb-9c19-91ce0b488720.JPG)

* File : 하나 이상의 파일 선택 가능
* Authentication Type : Azure AD, Account Key 방식 제공  
* Blob Type : 3가지 유형 존재, 변경 불가능
    * 블록 blob : 텍스트나 이진 데이터 최대 4.75TiB
    * 페이지 blob : 임의 엑세스 파일 VHD 파일, 최대 8TiB
    * 추가 blob : 로그 파일 처럼 데이터를 추가


* Block Size : 최대 50,000개의 블록을 지원, 기본 값은 4MB

    ![987978987987978978](https://user-images.githubusercontent.com/69498804/107190749-8d80cb00-6a2e-11eb-8688-a816293b477c.JPG)
 
    <br/>

* Access tier : HOT,CooL을 선택 가능
* Upload to folder : 폴더에 업로드
* Encryption scope : Blob을 만들때 암호화 범위 지정


<br/>
<br/>

이제 컨테이너를 생성하고 임의의 텍스트 파일을 컨테이너에 업로드 해보겠습니다. 

![캡처](https://user-images.githubusercontent.com/69498804/107191268-434c1980-6a2f-11eb-8e47-bba9999d3e2e.JPG)

<br/>
<br/>

저는 NASA1515라는 폴더 안에 업로드 했습니다.

![캡처2](https://user-images.githubusercontent.com/69498804/107191330-57901680-6a2f-11eb-9dbe-f471f683fa89.JPG)

<br/>
<br/>

업로드 한 파일의 Overview Tab에서 정보들과, URL을 확인 가능 합니다.

![캡처3](https://user-images.githubusercontent.com/69498804/107191414-78f10280-6a2f-11eb-8f21-04048ff63ff8.JPG)

<br/>
<br/>

URL로 접속 해보면 다음과 같이 임시 내용이 표시 됩니다.

![44](https://user-images.githubusercontent.com/69498804/107191640-cbcaba00-6a2f-11eb-98fe-69e526bbfcb8.JPG)



<br/>


----



## 👏 File Share 스토리지 생성

File Share는 아주 간단합니다. 이름, 할당량만 지정하면 됩니다.  
File Share는 윈도우, 리눅스, 맥OS에서 연결 할 수 있습니다. 기본적으로 SMB 445 Port를 사용합니다.!!

<br/>

* 저는 간단하게 Linux용 Windows Server용 2개를 만들었습니다.

    ![캡처4444](https://user-images.githubusercontent.com/69498804/107192630-33cdd000-6a31-11eb-8b9f-fd7df573eb41.JPG)


<br/>

## 🤳 Windows Server 연결

<br/>

그럼 만들어져 있는 Windows Server에 연결 한뒤 Windows PowerShell ISE를 실행합니다.

![캡처222](https://user-images.githubusercontent.com/69498804/107193671-6cba7480-6a32-11eb-9f8a-a0d8ab32dd69.JPG)


<br/>
<br/>

이제 연결 할 Fileshare의 Overview에서 Connect tab의 스크립트를 복사합니다.

![캡처22313](https://user-images.githubusercontent.com/69498804/107193807-983d5f00-6a32-11eb-8d57-78def2a4eb43.JPG)

<br/>
<br/>

Windows Service PowerShell에 스크립트를 입력하면 다음과 같이 연결됩니다.

![캡처4444](https://user-images.githubusercontent.com/69498804/107194037-e3f00880-6a32-11eb-812c-b906e847e461.JPG)

<br/>
<br/>

정상적으로 연결이 되었다면 다음과 같이 탐색기에서 확인이 가능합니다.

![캡처55555](https://user-images.githubusercontent.com/69498804/107194195-139f1080-6a33-11eb-8393-1a3b781d9856.JPG)

<br/>

---

```toc
```