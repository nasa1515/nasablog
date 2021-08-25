---
emoji: 🤦‍♂️
title: SQL/BUCKET 생성 [GCP]
date: "2021-06-25 00:04:25"
author: nasa1515
tags: GCP
categories: GCP
---


머리말  

GCP를 공부를 시작하면서 기존의 IDC 지식들이 너무 과거의 것이라는 것을 알 수 있었다.  
새로운 것들을 받아드리는 것이 빠르지 못하면 뒤쳐질 수 있다는 걸 깨달은 포스트이다.

---

## ✔ "GCP SQL/BUCKET" 이란 ?

* GCP SQL  
평소에 서버내에서 설치/구성해서 사용해왔었던 MYSQL/MARIA 등을 구글 플랫폼 자체에서 활용/적용 할 수 있는 기능.  
즉 원격으로 사용 할 수 있는 RDB 라고 생각하면 된다.  

<br/>

* GCP BUCKET  
보통 스토리지는 서버/PC에 다이렉트하게 붙여서 이용해왔다. NFS/ISCSI 등으로 원격지에서 접속이 가능한 기능도 있지만  
GCP에서는 BUCKET이라는 형태의 스토리지로 다이렉트하게도, 원격스럽게도 연결 할 수 있는 스토리지 기능을 제공한다.  

----

## ✌ GCP API 설치

* CLOUD API 설치  
API의 경우 GCP내에서 제공하는 API로 따로 설정이 필요없이 다운로드 받아서 손쉽게 서비스들을 이용 할 수 있다.

<br/>

* API 및 서비스 - 라이브러리 탭으로 이동하여 API를 설치합니다.

    ![ap](https://user-images.githubusercontent.com/64260883/89507826-04cb6d00-d808-11ea-944d-5804796afe1b.png)

<br/>

* 설치 후 구동을 시켜주고 정상 구동 중인지 확인.

    ![adddddd](https://user-images.githubusercontent.com/64260883/89508151-760b2000-d808-11ea-8f77-3fb4e97f4000.png)

---
## 👍 GCP SQL 생성 및 VPC 연결

웹페이지로 가서 SQL을 생성해보겠습니다.

* "저장소 - SQL" 을 클릭합니다.

    ![99](https://user-images.githubusercontent.com/64260883/89395022-c0789800-d747-11ea-9407-bd20664c288f.png)

<br/>

* ``"인스턴스 만들기"`` 선택 후 DB를 생성합니다. DB 종류의 경우 MYSQL,POSTGRE 등 선택이 가능합니다.  
    ``"구성 옵션 표시"`` 탭에서 세부적인 설정도 가능합니다.

    ![4343](https://user-images.githubusercontent.com/64260883/89395485-57ddeb00-d748-11ea-8e06-ccea22afba62.png)


<br/>

* 생성이 완료된 SQL는 웹에서 유저나, DB생성이 가능하다.


    ![232](https://user-images.githubusercontent.com/64260883/89395401-3bda4980-d748-11ea-855c-21e9bd055e33.png)


<br/>

* 인스턴스와 직접적인 연결을 원한다면 인스턴트의 공인 IP를 SQL의 공개 네트워크에 추가해주면 ``VPC로 연결``이 가능합니다.  


    ![44444](https://user-images.githubusercontent.com/64260883/89395730-adb29300-d748-11ea-840a-adc8e80c6fa6.png)


<br/>

* 실제 인스턴스와 VPC로 TEST 해 본 결과 다음과 같이 정상구동 확인.  

    DB IP : 	34.64.187.52
    ![443332](https://user-images.githubusercontent.com/64260883/89396359-6c6eb300-d749-11ea-8dbe-dc481fb7ecec.png)
    

<br/>

* 인스턴트 내에서 연결 시 정상적으로 접속이 됨을 확인

    ![db](https://user-images.githubusercontent.com/64260883/89396657-ca02ff80-d749-11ea-84f2-68df5cb47b2d.png)

----

## 👏 GCP Proxy로 DB 연결


사전 준비 사항  

    
1. 새로운 인스턴스 생성 (Centos, API 허용, HTTP 허용)
    ![VM](https://user-images.githubusercontent.com/64260883/89511268-a5239080-d80c-11ea-8b22-9b3e6340e6e6.png)
    
<br/>

2. 새로운 SQL DB 생성 (VPC IP 제외)
    ![DBBBB](https://user-images.githubusercontent.com/64260883/89511271-a654bd80-d80c-11ea-8496-9ac51f8b8e6a.png)



    <br/>

    * 프록시 연결을 위한 프록시 툴 다운

        ![capthe](https://user-images.githubusercontent.com/64260883/89512680-858d6780-d80e-11ea-9f46-c461c80f3112.png)

        <br/>

        새로 생성된 Vm에는 Wget Tool이 설치가 안되어있습니다.
    
        ```cs
        # yum install wget
        ```
        <br/>

        구글에서 제공하는 해당 주소에서 툴 다운
    
        ```cs
        # wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
        ```

        <br/>

        다운로드 받은 툴을 실행 가능하도록 실행 권한 설정, 프록시를 실행 가능하도록 합니다.
    
        ```cs
        # chmod +x cloud_sql_proxy  
        ```

<br/>

3. 서비스 계정 생성 (필수 아님)

      프록시를 사용하여 연결할 때는 프록시가 Google Cloud Platform으로 인증해야 합니다.   
      Cloud SDK 사용자 인증 정보를 사용하거나, 생성한 서비스 계정의 로컬 키 파일 경로를 프록시에 제공 가능한데 (프로덕션 인스턴스의 경우 권장됨)
      Cloud SDK 사용자 인증 정보를 사용하는 경우에는 이 단계를 건너뛸 수 있습니다.

      필요한 권한이 있는 서비스 계정을 만들려면 resourcemanager.projects.setIamPolicy 권한이 있어야 합니다.  
      권한 설정은 [프로젝트 소유자, 프로젝트 IAM 관리자, 조직 관리자] 역할에 포함되어 설정 할 수 있습니다.
          
      서비스 계정을 사용하여 프록시 사용자 인증 정보를 제공하는 경우 충분한 권한을 부여해야 합니다.  
      세분화된 Identity Access and Management(IAM) 역할을 사용하여 Cloud SQL 권한을 관리하는 경우  
      서비스 계정에 cloudsql.instances.connect 권한이 있는 역할을 부여해야 합니다.  
      이 권한이 포함된 사전 정의된 Cloud SQL의 역할은 아래 세가지 입니다.

      
      * Cloud SQL 클라이언트 - 보통 특정 계정에 해당 권한 설정 후 사용
      * Cloud SQL 편집자
      * Cloud SQL 관리자

      하지만 현재 실습은 관리자 계정으로 진행하기 때문에 서비스 계정은 따로 만들어서 진행하지 않겠습니다.


<br/>


4. 인스턴스 - DB 연결    
    

    * 인스턴스 세부정보 페이지에서 인스턴스 연결 이름을 복사합니다.

        ![23232323322](https://user-images.githubusercontent.com/64260883/89513324-604d2900-d80f-11ea-9244-ff0c131a6b32.png)


    <br/>
    
    * 프록시를 시작/연결  
    일반 실행 시 Ready for new connections 로그로 정상을 확인. 그 후 상태 확인을 위해 백그라운드로 실행시켰습니다.
            
        ![88888888](https://user-images.githubusercontent.com/64260883/89514017-44965280-d810-11ea-813f-e3a3d5c8d709.png)  
        

        <br/>

        사용할 수 있는 프록시 호출 문자열은 다음과 같습니다.

      Cloud SDK 인증 사용: ./cloud_sql_proxy -instances=<인스턴스 연결이름>=tcp:3306
          
      지정된 포트는 로컬 데이터베이스 서버 등에서 이미 사용하지 않는 포트여야 합니다.  
      서비스 계정 사용 및 명시적으로 인스턴스 연결 이름 포함 (프로덕션 환경에 권장)

        ```cs
        # ./cloud_sql_proxy -instances=<인스턴스 연결이름>=tcp:3306 \
        -credential_file=<PATH_TO_KEY_FILE> &
        ```

        서비스 계정을 사용하여 프록시를 인증하는 경우 서비스 계정을 만들 때 생성된 비공개 키 파일의 클라이언트 머신 내 위치를 기록해 둡니다.

        <br/>

    * 연결 및 확인  

         DB는 루프백으로 직접 연결되며 해당 명령어로 접속이 가능합니다.  
         임의로 GUI에서 생성한 nasaproxy db가 정상적으로 보임을 확인.

        ![dbmasda](https://user-images.githubusercontent.com/64260883/89514736-2f6df380-d811-11ea-8b3e-1087afd7ae58.png)






----

## 🤣 GCP BUCKET생성

웹페이지로 가서 BUCKET을 생성해보겠습니다.


* "저장소 - STORAGE - 버킷생성"을 클릭합니다.
![bb](https://user-images.githubusercontent.com/64260883/89480838-586e9400-d7d1-11ea-9a79-60bb56656cce.png)

<br/>

* ``버킷이름``, ``리전``, ``엑세스 방식``등 커스텀하게 설정 후 생성합니다.
![adas](https://user-images.githubusercontent.com/64260883/89483582-61fafa80-d7d7-11ea-96fb-f385852519da.png)

<br/>

* 생성된 버킷을 확인 합니다.
![ㅁㄴㅁㅁㅁㅁ](https://user-images.githubusercontent.com/64260883/89483705-a9818680-d7d7-11ea-95b9-d73a4de72c5e.png)

<br/>

* 연결 테스트를 위해서 ``NASA1415``라는 폴더를 하나 생성했습니다.
![aaaa](https://user-images.githubusercontent.com/64260883/89484368-5ad4ec00-d7d9-11ea-8bd1-2725aaec72d4.png)

<br/>

* 인스턴스에 접속해서 해당 버킷에 데이터를 전송합니다.  
(인스턴스의 bktest라는 파일에 버킷에 업로드해서 테스트)  

    ![asda](https://user-images.githubusercontent.com/64260883/89487231-e9e50280-d7df-11ea-8ead-b3f73903b65e.png)

    ```cs
    # gsutil cp bktest gs://nasabucket//NASA1415/
    ```

<br/>

*   CLI 명령어로 버킷을 생성 

    ![12112121](https://user-images.githubusercontent.com/64260883/89487449-6f68b280-d7e0-11ea-8640-e465edb9e137.png)

    ```cs
    # gsutil mb -b on -l asia-northeast3 gs://nasa1415-bucket2/
    ```

<br/>

* gsutil 명령어를 통해서 버킷을 컨트롤 할 수 있다

    gsutil을 사용하기 위해선 컴포넌트만 설치하면 사용 준비가 끝납니다.

    ```cs
    # gcloud components install gsutil
    ```

    <br/>


* gsutil 명령어 모음

    ```python
    $ gsutil list                           # 나의 버킷 리스트 보기  
    $ gsutil ls -r gs://버킷이름             # 버킷 안에 들어있는 파일 확인  
    $ gsutil du -s gs://버킷이름             # 버킷 용량 확인  
    $ gsutil mb gs://버킷이름                # 버킷 생성
    $ gsutil rb gs://버킷이름                # 버킷 삭제
    $ gsutil cp 로컬 파일 위치 gs://버킷이름   # 로컬 -> 버킷 복사
    $ gsutil cp gs://버킷이름 로컬 파일 위치   # 버킷 -> 로컬 복사
    $ gsutil mv 로컬 파일 위치 gs://버킷이름   # 로컬 -> 버킷 이동
    $ gsutil mv gs://버킷이름 로컬 파일 위치   # 버킷 -> 로컬 이동
    $ gsutil rm gs://버킷이름/파일이름        # 파일 삭제
    $ gsutil ls -L gs://버킷이름/파일이름     # 파일 정보 보기
    ```

<br/>

* 버킷관련 명령어

    ```python
    $ gsutil -m acl ch [해당 명령어 관련 설정]      # Access Control List 변경
    $ gsutil -m acl set [해당 명령어 관련 설정]     # Access Control List 세팅
    $ gsutil -m cp [해당 명령어 관련 설정]          # 복사
    $ gsutil -m mv [해당 명령어 관련 설정]          # 이동
    $ gsutil -m rm [해당 명령어 관련 설정]          # 삭제
    $ gsutil -m rsync [해당 명령어 관련 설정]       # 원본과 버킷 사이에 동기화
    $ gsutil -m setmeta [해당 명령어 관련 설정]     # 메타데이터 셋
    ```


```toc
```