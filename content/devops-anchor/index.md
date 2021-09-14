---
emoji: 🤦‍♂️
title: 이미지 분석 툴 Anchore With Jenkins [DevOps]
date: "2021-08-11 00:39:25"
author: nasa1515
tags: DevOps
categories: DevOps
---




머리말  

지난 포스트에서 간단하게 전체적인 파이프라인에 대해서 포스트를 했습니다.  
이번 포스트는 Harbor에 배포 될 Container Image 분석 오픈소스 Anchore를 도입했던 포스트를 작성했습니다.


---


* 사용 할 툴을 다음과 같습니다.  

    - Jenkins
    * Anchore

---

## ✔ Anchore ??

정말 간단히 설명해서 Docker Image의 취약점을 스캔하는 스캐너라고 생각하면 됩니다.

Anchore 오픈 소스 버전은 다음에서 참고할 수 있습니다.

https://anchore.com/opensource/

<br/>


1. 이미지 분석  
    컨테이너 이미지의 심층 검사를 수행하여 모든 OS의 패키지, 파일 및 소프트웨어 아티팩트  
    (Ruby GEMs, JARs, Node Modules) Cataloging화 한다.  

<br/>

2. 정책 관리  
    보안 모범 사례를 기반으로 정책을 정의하고 적용하여 위험한 빌드가 완료되지 않고 문제가 있는 이미지가 배포되지 않도록 한다.  

<br/>

3. Continuous Monitoring  
    이미지가 업데이트되거나 CVE가 추가 또는 제거되거나 새로운 모범 사례가 설정 될 때  
    생성 된 문제를 파악하기 위해 정책을 지속적으로 관리한다.

<br/>

4. CI / CD 통합  
    Anchore Engine을 CI/CD 파이프 라인에 통합하여  
    이미지가 사용자 지정 보안 및 요구 사항을 충족할 때만 성공적으로 빌드되도록한다.


<br/>

5. 커스터마이징  
    이미지 내부 Package, Whitelists, Blacklists, 설정파일, 보안, Manifest, 포트 등에   
    대한 취약점을 점검하기 정책을 유연하게 정의할 수 있다.

<br/>

---


### Anchore 설치 (Docker)

<br/>

Anchore 설치와 Jenkins와 연동은 이미 많은 분들이 포스트하셨습니다.    
따라서 제 포스트에서는 간단하게 명령어, 이미 설치되어있다는 가정하에 정리하였습니다.

* 설치 명령어

    ```cs
    $ curl https://docs.anchore.com/current/docs/engine/quickstart/docker-compose.yaml > docker-compose.yaml
    $ docker-compose up -d

    $ yum install epel-release
    $ yum install python-pip
    $ pip install anchorecli
    ```
---


추가적으로 anchore를 jenkins에서 사용하기 위해서는 plugin을 설치해야 합니다.  

* 설치될 plugin은 다음과 같습니다.

    * http://plugins.jenkins.io/anchore-container-scanner/  

plugin설치가 완료된후 jenkins의 configuration system 메뉴에서  
Anchore Container Image Scanner 설정을 추가합니다.  (아래사진)

* Jenkins에서 동작하는 Anchore는 다음과 같은 WorkFlow를 가집니다.

    ![3332112](https://user-images.githubusercontent.com/69498804/103251164-e59dc980-49ba-11eb-871f-ecfb62bdad91.PNG)


<br/>

---


### GCP 방화벽 설정

GCP 기반의 인프라이기 때문에 GCP의 VPN에서 설치 할 때 설정해줬던  
Anchore의 Service Port를 허용해줘야만 Jenkins에서 연동이 가능합니다.


* 다음과 같이 Jenkins-환경설정에서 Anchore Container Image Scanner  
    설정의 Servic Port를 Anchore와 GCP에서 Allow 해준 Port를 기입하면 됩니다.

    ![캡처22](https://user-images.githubusercontent.com/69498804/103250454-3b707280-49b7-11eb-95ce-220663b7dc54.PNG)


<br/>

---



### Jenkins Pipeline Script 수정

위에 있는 연동을 위한 환경설정들이 모두 마무리 되었으면  
아래처럼 파이프라인 스크립트내에 Anchore의 Analyse부분을 추가해줍니다.


* 스크립트  

    ```cs
            stage('Anchore analyse') {  
                steps {  
                    catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                    writeFile file: 'anchore_images', text: '34.64.237.112/cccr/jisun'  
                    anchore name: 'anchore_images'  
                    }
                }
            }
    ```

<br/>


---



### 파이프라인 실행 결과 

제대로 연동되었다면 파이프라인이 종료된 뒤 가시적인 로그를 볼 수 있습니다.

* Anchore 스캐닝 리포트

    ![33](https://user-images.githubusercontent.com/69498804/103250671-5f808380-49b8-11eb-8ef1-c939886fde60.PNG)


<br/>

---

### 정상 스캐닝 여부 확인

Anchore의 가시적인 리포트는 확인 할 수 있지만 정말 정확한 스캐닝을 하는 건지는 잘 모르겠습니다.  
그래서 나온 ERROR 중 일부를 수정해서 결과가 반영되는지를 확인해보죠



* Anchore의 리포트를 보니 아래와 같은 이슈가 있었습니다.  

    ![44](https://user-images.githubusercontent.com/69498804/103250811-1c72e000-49b9-11eb-9b27-ab7849ec81c5.PNG)


    로그확인을 해보니 - Oracle MySQL 5.7.14 이상으로 버전 업그레이드 필요하다는 로그였네요


<br/>


* 바로 관련된 소스를 수정합니다!

    ![aaaa](https://user-images.githubusercontent.com/69498804/103250871-6fe52e00-49b9-11eb-9716-7c3fb7eaff84.PNG)

    간단하게 연결되어있는 DVWA 앱의 pom.xml의 소스를 수정해서 반영시켜봤습니다.


<br/>

수정해서 파이프라인을 동작시키니 정상적으로 스캐닝 하고있음을 확인했습니다.


* 1. Anchore 리포트 로그의 MYSQL 항목을 더 이상 찾을 수 없습니다.

    ![dds](https://user-images.githubusercontent.com/69498804/103250938-cb172080-49b9-11eb-8909-3c27a7901c58.PNG)


<br/>

* 2. 가시적인 그래프가 줄어 들었음을 확인 할 수 있습니다.

    ![ssssss](https://user-images.githubusercontent.com/69498804/103250982-fe59af80-49b9-11eb-8f6c-6ae4a33c9ece.PNG)

    다음과 같이 마지막 Build에서 그래프가 꺾여 내려갑니다.

<br/>

---

## 마치며…  

조금씩 프로젝트 포스트에서 막바지가 다가와 갑니다.      
Anchore는 비교적 쉽게 구현했던 오픈소스입니다.   
그나마 조금 시간을 잡아먹거나, 불편했던 점이라고 한다면
Anchore는 기본적으로 파이프라인의 성공/실패 여부에 따라  
Build를 멈추거나 무시하도록 설정 할 수 있게 되어있는데 이 부분을 모르고 있었습니다.  
계속해서 Anchore가 실행 될 때마다 Build가 멈추는 현상이 일어나 원인분석에 2일정도를 썼던 것 같습니다..     
정리를 해가면서 다시 한번 배우고 있는 것 같습니다.  
한국은 아직 Anchore 툴의 여부를 모르는 사람들도 많은 것 같은데 하루 빨리 많은 오픈소스들이 산업에 도입되었으면..


다음글은 Sornaqube 포스트로 돌아 오겠습니다.


---

```toc
```