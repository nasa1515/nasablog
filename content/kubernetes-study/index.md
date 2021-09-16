---
emoji: 🤦‍♂️
title: 작성 중... [Kubernetes]
date: "2021-08-16 00:50:25"
author: nasa1515
tags: Kubernetes
categories: Kubernetes
---



## Kubernetes 정리


### yaml 정의하여 생성해서 사용하기.  

실제 Test 환경에서는 vimd으로 metadate며 container며 문법을 지키기는 쉽지 않습니다.    
그렇기에 기본 문법을 제공하는 pod, svc 등의 선언 명령을 통해 yaml을 작성하는게 좋습니다.  


* ``--dry-run=client`` : --dry-run의 경우 명령을 선언하면 바로 리소스가 생성됩니다.  
    그래서 생성되지 않고 정확한 실행 여부 판단을 위해 ``=client`` 옵션을 붙여줍니다.  

* ``-o yaml`` : 해당 옵션을 사용하면 실행 결과가 yaml 형식으로 출력됩니다.  


* ``--dry-run=client -o yaml`` : 리소스는 생성하지 않고, yaml로 출력  



<br/>

---


#### --dry-run=client -o yaml 사용 예  

<br/>


#### POD 


* 기본 생성 명령어

    ```cs
    # kubectl run nginx --image=nginx
    ```

    <br/>

* yaml 형식으로 뽑아내기  

    ```cs
    # kubectl run nginx --image=nginx --dry-run=client -o yaml >> nasa.yaml
    ```

<br/>


#### Deployment

* 기본 생성 명령어  

    ```cs
    # kubectl create deployment --image=nginx nginx
    ```

    <br/>


* yaml 형식으로 뽑아내기  

    ```cs
    # kubectl create deployment --image=nginx nginx --dry-run=client -o yaml >> nasa-dp.yaml
    ```

    <br/>



* Repicas 설정하며 생성하기  

    ```cs
    # kubectl create deployment nginx --image=nginx --replicas=4
    ```

    <br/>



* 배포 되어있는 Deployment replicas 수정하기  

    ```cs
    # kubectl scale deployment ningx --replicas=3 
    ```

    <br/>


#### Service

* ClusterIP Type으로 생성 명령어 [create 사용]  

    ```cs
    # kubectl create svc clusterip redis --tcp=6379:6379
    ```

<br/>

* ClusterIP Type으로 생성 명령어 [expose 사용]  

    ```cs
    ## expose 명령은 이미 생성되어 있는 pod에 직접 연결해 생성됩니다.

    # kubectl expose pod redis --port=6379 --targetport=6379  --name redis-service
    ```

    #### 두 방식의 차이점은 label의 생성 여부 입니다.  
    #### expose는 자동으로 label을 연결해주지만 create는 그렇지 않습니다.  


<br/>

* nodePort Type으로 생성 명령어 [create 사용]  

    ```cs
    # kubectl create service nodeport nginx --tcp=80:80 --node-port=30077
    ```

    <br/>

* nodePort Type으로 생성 명령어 [expose 사용]  

    ```cs
    # kubectl expose pod nginx --name nginx-service --port=80 --targetport=80 --type=NodePort
    ```

    #### 여기서 두 방식의 차이점은 label의 생성 여부, NodePort 지정 여부 입니다.  
    #### expose는 자동으로 label을 연결해주지만 NodePort를 지정하지 못하고
    #### create는 label을 자동 연결해주지 않지만 NodePort를 지정할 수 있습니다.  
    #### 저는 대부분 expose로 yaml을 생성한 뒤 NodePort 구문을 추가해 사용합니다.  


<br/>


## 작성 중 포스트...


```toc
```