---
emoji: 🤦‍♂️
title: "[DEVOPS] - GKE Cluster를 Rancher에 연동하기"
date: "2021-08-06 00:04:25"
author: nasa1515
tags: DevOps CLOUD
categories: DevOps CLOUD
---


머리말  

안녕하세요 NASA입니다!!.  
이번 포스트에서는 Open Source인 Rancher를 이용한 k8s 클러스터 구축에 대한 포스트입니다   
이전 포스트와 다른점은 이전에는 이미 구성되어있는 클러스터를 사용했다면 이번 포스트에서는 GKE를 사용했다는 점입니다!!

---

* 사용 할 툴을 다음과 같습니다.  

- docker, Rancher (GKE)
- k8s

---


## ✔ 환경구성


환경구성은 다음과 같습니다.


![스크린샷, 2020-10-13 17-18-15](https://user-images.githubusercontent.com/69498804/95834575-1c7b2080-0d78-11eb-8aad-5a7ea4701c4a.png)

Rancher : Rancher master가 띄워져있는 Cluster 관리 서버  
Jenkins : 이전 포스트에서 설정한 CI 작동 서버  
gke : GKE 클러스터 노드

<br/>

---

### GKE SERVICE - Rancher 서비스 구축.

* Rancher로 클러스터를 생성하는 방법은 두가지가 있습니다.

* 이번 포스트의 경우 GCP 무료 계정이다보니 Rancher로 클러스터를 생성하기에 어려움이 있습니다.  
 할당량 제한...ㅠㅠ 그래서 최소한으로 구축한 클러스터를 연동하겠습니다.

<br/>

### 1. Rancher로 GKE 생성


* GCP -> GKE에서 클러스터를 생성합니다

    ![스크린샷, 2020-10-13 15-46-04](https://user-images.githubusercontent.com/69498804/95825037-3d894480-0d6b-11eb-954b-0e5212ac4db8.png)


<br/>

* 다음과 같이 기본사양으로 GKE 클러스터를 구성했습니다.


    ![스크린샷, 2020-10-13 15-57-33](https://user-images.githubusercontent.com/69498804/95826118-cfde1800-0d6c-11eb-8bc6-40113f29bdb6.png)


<br/>

* 다음과 같이 생성한 노드 정보를 Cloud Shell에서 확인 가능합니다

    ![스크린샷, 2020-10-13 15-58-43](https://user-images.githubusercontent.com/69498804/95826246-f9973f00-0d6c-11eb-9661-14600ea38666.png)

<br/>

* 이제 Rancher 인스턴스와 연동해보겠습니다.

<br/>

* Rancher 대쉬보드에서 Cluster -> ADD Cluster 선택!

    ![스크린샷, 2020-10-13 17-28-35](https://user-images.githubusercontent.com/69498804/95835703-88aa5400-0d79-11eb-82ed-f61e8d0dea45.png)

<br/>

* 저희가 추가 할 것은 GKE이기 떄문에 GKE를 선택

    ![스크린샷, 2020-10-13 17-29-41](https://user-images.githubusercontent.com/69498804/95838368-a6c58380-0d7c-11eb-8344-e9a58e49bc86.png)


<br/>

* 그럼 다음과 같은 설정 탭이 나옵니다.

    ![스크린샷, 2020-10-13 17-55-29](https://user-images.githubusercontent.com/69498804/95838892-4a169880-0d7d-11eb-84fe-2a8387557a44.png)

    해당 설정파일에서 이름은 상관없고, Service Account만 신경쓰면 됩니다.  
    Service Account를 등록하기 위해서 아래 작업을 진행합니다.

<br/>

<br/>

* GCP에서 JSON파일 형태의 인증키를 생성해줍니다

    ![스크린샷, 2020-10-13 17-33-04](https://user-images.githubusercontent.com/69498804/95836229-2867e200-0d7a-11eb-9ce2-7f1371e9fe11.png)

<br/>

* 그럼 아래와 같은 식의 JSON 파일 형식의 키가 LOCAL에 다운받아집니다!!


    ![스크린샷, 2020-10-13 17-33-40](https://user-images.githubusercontent.com/69498804/95836300-3f0e3900-0d7a-11eb-9b66-7b7e505ad580.png)


<br/>

* 해당 파일을 업로드 해주게 되면 아래와 같이 클러스터 환경 설정 탭이 나옵니다!!

    ![스크린샷, 2020-10-13 17-34-49](https://user-images.githubusercontent.com/69498804/95836441-66fd9c80-0d7a-11eb-807e-66cc75f0095a.png)

<br/>

* 세부 설정들을 설정 후 CREATE를 누르면 아래와 같이 클러스터가 생성 됩니다.!

    ![스크린샷, 2020-10-13 18-02-50](https://user-images.githubusercontent.com/69498804/95839731-50f1db00-0d7e-11eb-9562-b5e45eefe3e7.png)


<br/>

----

### 2. 구성되어있는 GKE 연동 
<br/>

* 이미 생성되어 있는 GKE 클러스터를 추가해줍니다

    ![스크린샷, 2020-10-13 17-42-11](https://user-images.githubusercontent.com/69498804/95843414-a4febe80-0d82-11eb-879b-6850a7bf361c.png)

<br/>

* 위 메뉴로 들어가 기본설정을 마치면 아래와 같이 노드로 연결하는 명령어가 나옵니다.
    
    ![스크린샷, 2020-10-13 18-34-37](https://user-images.githubusercontent.com/69498804/95843898-353d0380-0d83-11eb-8f8d-a5f020473aca.png)

<br/>

* GCLOU Shell에서 해당 명령어를 입력!

    ```cs
    h43254@cloudshell:~ (nasa1515)$ curl --insecure -sfL https://34.64.79.179/v3/import/qw6zts2kzgshvwr5bl62bxn5vpghcdmxwmdskp5xgmfjhc6596v7bx.yaml | kubectl apply -f -
    clusterrole.rbac.authorization.k8s.io/proxy-clusterrole-kubeapiserver created
    clusterrolebinding.rbac.authorization.k8s.io/proxy-role-binding-kubernetes-master created
    namespace/cattle-system created
    serviceaccount/cattle created
    clusterrolebinding.rbac.authorization.k8s.io/cattle-admin-binding created
    secret/cattle-credentials-61fa6cb created
    clusterrole.rbac.authorization.k8s.io/cattle-admin created
    deployment.apps/cattle-cluster-agent created
    ```

<br/>

* 잠시 API가 연동되는 시간을 기다리면 아래와 같이 클러스터가 연동 됩니다


    ![스크린샷, 2020-10-13 18-45-48](https://user-images.githubusercontent.com/69498804/95844827-54886080-0d84-11eb-8106-b48eccb53ef7.png)


<br/>

``이제 기본적인 Rancher 클러스터 환경 구성이 완료되었습니다.``

<br/>

---


### 마치며…  

이번 포스트에서는 Rancher를 사용해서 GKE k8s 클러스터를 생성하는 법을 알아봤습니다.  
쓰면 쓸수록 멀티클라우드의 쿠버네티스 환경에 아주 적합한 툴인 것을 느끼고 있으나  
한국에서는 많이 사용하지 않는 이유를 잘 모르겠습니다.  
해외 스택을 들어가보면 SPINNAKER vs Rancher의 구도로 사람들이 많이 사용하고 있는데  
 한국에서는 SPINNAKER가 주를 이루고 있네요...아쉽습니다   

다음 포스트에는 Rancher 위에 Argo-CD를 올려서 배포를 자동화 해봅시다!

---

```toc
```