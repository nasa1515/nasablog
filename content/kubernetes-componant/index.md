---
emoji: 🤦‍♂️
title: 쿠버네티스의 컴포넌트 [Kubernetes]
date: "2021-06-29 00:07:13"
author: nasa1515
tags: Kubernetes
categories: Kubernetes
---


머리말  

이전 포스트에서 드디어 GCP 인스턴스 기반의 k8s 클러스터 환경을 구축했습니다.  
이번 포스트에서는 이번에 간단하게 포스트해서 정리했지만 실제 실습을 들어가기전 전체적인 개념에 대해서 다시 한번 정리하고  
실습에 들어가야 할 것 같아서 조대협님의 블로그 글을 참고하여 내 식대로 다시 정리해보았다.  


---

참고  :  [조대협님 블로그](https://bcho.tistory.com/1256)
 
---

## ✔ 개념정리 


### 오브젝트  

쿠버네티스를 이해하기 위해 가장 중요한 부분이 ``오브젝트``이다.  
가장 ``기본적인 구성단위``가 되는 ``기본 오브젝트(Basic object)`` 를 ``생성``하고 ``관리``하는 추가적인 기능을 가진 ``컨트롤러(Controller)``  
이러한 오브젝트의 ``스펙(설정)``이외에 추가정보인 ``메타 정보``들로 구성이 된다고 보면 된다. 

<br/>

### 오브젝트 스펙 (Object Spec)   

오브젝트들은 모두 오브젝트의 특성 (설정정보)을 기술한 오브젝트 스펙 (Object Spec)으로 정의가 되고,  
커맨드 라인을 통해서 오브젝트 생성 시 인자로 전달하여 정의를 하거나 또는 ``yaml``이나 ``json`` 파일로 ``스펙을 정의``할 수 있다. 

<br/>

### 기본 오브젝트 (Basic Object) 

쿠버네티스에 의해서 배포 및 관리되는 가장 기본적인 오브젝트는  
컨테이너화되어 배포되는 애플리케이션의 워크로드를 기술하는 오브젝트로 4가지가 있다.   
    
* Pod : 컨테이너화된 애플리케이션
* Service : 로드밸런서
* Volume : 디스크
* Namespace : 패키지

<br/>

---


## ✌ Pod

Pod 는 쿠버네티스에서 ``가장 기본적인 배포 단위``로, 컨테이너를 포함하는 단위이다.

k8s의 특징중의 하나는 컨테이너를 하나씩 배포하는 것이 아니라  
Pod 라는 단위로 배포하는데, Pod는 하나 이상의 컨테이너를 포함한다.



간단한 Pod를 정의한 오브젝트 스펙이다

```cs
apiVersion: v1
kind: Pod
metadata:
name: nginx
spec:
containers:
- name: nginx
    image: nginx:1.7.9
    ports:
    - containerPort: 8090
```

<br/>

* ``apiVersion`` :  이 스크립트를 실행하기 위한 쿠버네티스 API 버전 (보통 v1을 사용한다)
* ``kind`` : 리소스의 종류를 정의, (Pod)
* ``metadata`` : 리소스의 각종 메타 데이타 정의 ``라벨``이나 ``리소스의 이름`` 등 각종 메타데이타를 넣는다.  
* ``spec`` : 리소스에 대한 ``상세한 스펙``을 정의한다.
    * Pod는 컨테이너를 가지고 있기 때문에, container 를 정의  
    * 이름은 ``nginx`` 
    * ``도커 이미지 nginx:1.7.9`` 를 사용  
    * ``컨테이너 포트 8090을 오픈``한다.

<br/>
<br/>


여기서 의문 하나!!!  
도대체 왜 Pod 안에 한개 이상의 컨테이너를 가지고 있음에도  
개별적으로 하나씩 컨테이너를 배포하지 않고 여러개의 컨테이너를 Pod 단위로 묶어서 배포할까?


Pod는 다음과 두가지 특징을 가지고 있기 때문이다.  

* ``Pod 내의 컨테이너는 IP와 Port를 공유한다.``   
    
    ``두 개의 컨테이너``가 ``하나의 Pod를 통해서 배포``되었을때 localhost를 통해서 통신이 가능하다.  
    
    컨테이너 ``A가 8080``, 컨테이너 ``B가 7001``로 배포가 되었을 때  
    ``B -> A``를 호출 할 때 ``localhost:8080 으로 호출``하면 되고  
    ``A -> B``를 호출 할 때는 ``localhost:7001로 호출``이 가능하다. 

<br/>

* ``Pod 내에 배포된 컨테이너간에는 디스크 볼륨을 공유할 수 있다.``   
    
    요즘 APP은 실행할때 APP만 올라가는것이 아니라 ``Reverse proxy``, ``로그 수집기``등 다양한 주변 솔루션이 같이 배포 된다.    

    ``APP(Tomcat, node.js)``와 로그 수집기를 다른 컨테이너로 배포하면 일반적인 경우 컨테이너에 의해서 ``파일 시스템이 분리``되기 때문에  
    로그 수집기가 APP 컨테이너의 로그파일을 읽는 것이 불가능 하다.  
    하지만 k8s는 하나의 Pod 내에서 컨테이너들끼리 볼륨을 공유할 수 있기 때문에 다른 컨테이너의 파일을 읽어올 수 있다.

<br/>

---

## 👍 Volume 

간단하게 요약해서 볼륨은 외장디스크라고 이해하면 된다.

자세한 내용은 -> [볼륨 정리](https://nasa1515.tech/kubernetes-volume/) 에 정리된 포스트를 올려놓았다.

<br/>

---

## 👌 Service 

``Pod``와 ``볼륨``을 이용하여, 컨테이너들을 정의하고, Pod를 서비스로 제공할 때 분산환경에서는 하나의 Pod로 서비스 하는 경우는 드물고  
여러 Pod를 ``로드밸런서를 이용해서 하나의 IP와 포트``로 묶어 서비스를 제공한다.

Pod의 경우에는 동적으로 생성 되고, 장애가 생기면 자동으로 재시작 되며 IP가 바뀌기 때문에  
``로드밸런서``에서 Pod의 목록을 지정할 때는 IP주소를 이용하는 것은 어렵다. 또 ``오토 스케일링``으로 인하여 ``Pod 가 동적으로 추가 또는 삭제``되기 때문에 이렇게 추가/삭제된 Pod 목록을 로드밸런서가 유연하게 선택해 줘야 한다.
     
<br/>

그래서 사용하는 것이 ``라벨(label)``과 ``라벨 셀렉터(label selector)`` 라는 개념이다.

* ``라벨 셀렉터(label selector)`` : 어떤 Pod를 서비스로 묶을 것인지 정의  
     
각 Pod를 생성할때 ``메타데이타 정보 부분``에 ``라벨을 정의``할 수 있다.  
서비스는 라벨 셀렉터에서 특정 라벨을 가지고 있는 Pod만 선택하여 서비스에 묶게 된다.


![스크린샷, 2020-08-25 12-28-23](https://user-images.githubusercontent.com/69498804/91119584-7d6a6e80-e6ce-11ea-805b-199d8c7e1e24.png)

그림설명 : 라벨이 ``“myapp”``인 서비스만 분류해 서비스에 넣는다. 분류된 Pod 간 ``로드밸런싱``을 통하여 외부로 서비스를 제공

<br/>

위 서비스를 스펙으로 정의해보자


```cs
kind: Service
apiVersion: v1
metadata:
name: my-service
spec:
selector:
    app: myapp
ports:
- protocol: TCP
    port: 80
    targetPort: 9376
```

<br/>

* ``kind`` : Service로 지정
* ``apiVersion`` : v1으로 정의
* ``metadate-name`` : my-service (서비스의 이름)
* ``spec`` : 서비스에 대한 스펙을 정의
* ``selector`` : 라벨 = ``app:myapp``인 Pod 만을 선택해서 분류

* ``ports``  
    ``protocol`` : TCP  
    ``port`` : 80 포트로 서비스 
    ``targetPort`` : 80 포트 요청을 컨테이너의 9376 포트로 연결해 제공한다 

<br/>

---

## 👏 Name space  

하나의 쿠버네티스 클러스터내의 ``논리적인 분리 단위``라고 보면 된다.

``Pod,Service`` 등은 ``네임 스페이스 별``로 생성이나 관리가 되고 사용자의 권한 역시 네임 스페이스 별로 나눠서 부여할 수 있다.

즉 하나의 클러스터 내에 ``개발/운영/테스트 환경``이 있으면  클러스터를 ``개발/운영/테스트`` 3개의 네임 스페이스로 나눠 운영이 가능하다. 
    
<br/>

``네임스페이스 동작``
    
*  사용자 별로 네임스페이스 별 접근 권한을 다르게 운영할 수 있다.

* 네임스페이스별로 리소스의 할당량을 지정할 수 있다 즉 사용 가능한 리소스의 수를 지정할 수 있다.  
(ex : 개발팀 CPU 100, 운영팀 CPU 200) 

* 네임 스페이스별로 리소스를 나눠서 관리할 수 있다. (Pod, Service 등)

<br/>

하지만 네임 스페이스는 ``논리적인 분리 단위``일뿐 물리적이나 장치를 통해서 환경을 분리(Isolation)한 것이 아니다.  
즉 다른 네임 스페이스간의 pod 라도 통신은 가능하다.   

![스크린샷, 2020-08-25 12-46-31](https://user-images.githubusercontent.com/69498804/91120605-04204b00-e6d1-11ea-8f6c-20393369c6d7.png)
그림과 같이 네임스페이스를 분리하여 운영이 가능하다!!!


[네임스페이스 참고 글](https://cloud.google.com/blog/products/gcp/kubernetes-best-practices-organizing-with-namespaces)


<br/>

---

## 🐱‍🏍 라벨(label)

라벨은 쿠버네티스의 ``리소스를 선택``하는데 사용이 된다.  
각 리소스는 라벨을 가질 수 있고 라벨 검색 조건에 따라서 특정 라벨을 가지고 있는 리소스만을 선택할 수 있다.

라벨을 선택하여 특정 리소스만 배포, 업데이트 할 수 있고 또는 라벨로 선택된 리소스만 Service에 연결하거나  
특정 라벨로 선택된 리소스에만 네트워크 접근 권한을 부여하는 등이 가능하다.

라벨은 metadata 섹션에 키/값 쌍으로 정의가 가능하며 하나의 리소스에는 하나의 라벨이 아니라 여러 라벨을 동시에 적용할 수 있다.


<br/>

이해가 가장 빠른건 역시 정의!
    
```cs
"metadata": {
"labels": {
    "key1" : "value1",
    "key2" : "value2"
 }
}
```


``셀렉터``를 사용하려면 오브젝트 스펙에서 selector 라고 정의하고 라벨 조건을 적어 놓으면 된다. 

<br/>

k8s는 두 가지 셀렉터를 제공한다. 기본적으로 ``Equaility based selector``와 ``Set based selector`` 이다.

<br/>

* ``Equality based selector`` : 같냐, 다르냐와 같은 조건을 이용하여, 리소스를 선택하는 방법

    ```cs
    environment = dev

    tier != frontend
    ```

    같이 등가 조건에 따라서 리소스를 선택한다.

<br/>

* ``set based selector`` : Equality based 보다 향상된 셀렉터로 집합의 개념을 사용한다.

    * environment in (production,qa) 는 environment가 production 또는 qa 인 경우 

    * tier notin (frontend,backend)는 frontend도 아니고 backend도 아닌 리소스를 선택.

    아래 nasa-service 라는 이름의 서비스를 정의했다.   
    셀렉터에서 app: myapp 정의해서 Pod의 라벨 app이 myapp 것만 골라 이 서비스에 바인딩해서 9376 포트로 서비스 한다.


    ```cs
    kind: Service
    apiVersion: v1
    metadata:
    name: my-service
    spec:
    selector:
        app: myapp
    ports:
    - protocol: TCP
        port: 80
        targetPort: 9376
    ```

<br/>

---

## 🎶 컨트롤러

앞에 있는 4개의 기본 오브젝트로, 애플리케이션을 설정하고 배포하는 것이 가능하다.  
이를 조금 더 편리하게 관리하기 위해서 컨트롤러라는 개념을 사용한다.

컨트롤러는 기본 오브젝트들을 생성하고 이를 관리하는 역할을 해준다. 컨트롤러의 종류는 아래와 같다.

<br/>

* ``Replication Controller`` : Pod를 관리해주는 역할, 지정된 숫자로 Pod를 기동, 관리하는 역할을 한다. 

    Replication Controller (RC)는 크게 3가지 파트로 구성되는데 아래와 같다.  

    * Replica의 수
    * Pod Selector
    * Pod Template

<br/>

* Selector : 먼저 Pod selector는 라벨 기반이며, RC가 관리한 Pod를 가지고 오는데 사용한다.
* Replica 수 :  RC에 의해서 관리되는 Pod의 수, 그 숫자만큼 Pod 의 수를 유지하도록 한다.  
* Pod template : Pod에 대한 정보 (도커 이미지, 포트,라벨등)에 대한 정보를 정의 한다.


<br/>

* 아래 예를 보자.

    ![스크린샷, 2020-09-16 10-00-43](https://user-images.githubusercontent.com/69498804/93280269-299e0180-f804-11ea-91ff-a8648eca6c19.png)




    ngnix라는 이름의 RC를 정의한 것으로  
    label이 “app:ngnix”인 Pod들을 관리하고 3개의 Pod가 항상 운영되도록 설정한다.

    Pod는 app:ngnix 라는 라벨을 가지며, 이름이 ngnix이고 nginx 이미지를 사용해서 생성하고  
    컨테이너의 포트는 80 번 포트를 이용해서 서비스를 제공한다.

<br/>


* ### ReplicaSet  
    
    Replication Controller 의 업데이트 버전으로 생각하면 된다.   
    ReplicaSet이 나옴으로 써 RC는 거의 사용하지 않는다.
    두 서비스의 큰 차이는 없고  
    Replication Controller 는 Equality 기반 Selector를 이용하고  
    Replica Set은 Set 기반의 Selector를 이용한다. 

<br/>

* ### Deployment  

    Replication controller와 Replica Set의 좀더 상위 추상화 개념이다.  
    실제 운영에서는 RS 나 RC를 바로 사용하는 것보다,  좀 더 추상화된 Deployment를 사용하게 된다.


---

## 😃 쿠버네티스 배포에 대한 이해  

쿠버네티스의 Deployment 리소스를 이해하기 위해서  
쿠버네티스에서 Deployment 없이 어떻게 배포를 하는지에 대해서 이해를 해야 한다.  


<br/>

다음과 같은 Pod와 RC가 있다

![스크린샷, 2020-09-16 10-12-28](https://user-images.githubusercontent.com/69498804/93280666-26574580-f805-11ea-9f51-8bd65e77f541.png)


이제 애플리케이션이 업데이트되서 새로운 버전으로 컨테이너를 굽고 이 컨테이너를 배포하는 시나리오에 대해서 알아보자.  
여러가지 배포 전략이 있겠지만, 두가지 방법에 대해서만 설명해보자.
    

<br/>

* ``블루/그린 배포``  
블루(예전)버전으로 서비스 하고 있던 시스템을 그린(새로운)버전을 배포한 후 트래픽을 블루에서 그린으로 한번에 돌리는 방식이다.  
여러 방법이 있지만 손쉬운 방법은 새로운 RC을 만들어 새로운 템플릿으로 Pod를 생성한 뒤  
Pod 생성이 끝나면, 서비스를 새로운 Pod로 옮기는 방식이다.


    ![스크린샷, 2020-09-16 10-46-55](https://user-images.githubusercontent.com/69498804/93282744-08401400-f80a-11ea-8300-956f40553998.png)
    후에, 배포가 완료되고 문제가 없으면 예전 버전의 RC 와 Pod를 지워준다.

<br/>


* ``롤링 업데이트 방식``   
 Pod를 하나씩 업그레이드 해가는 방식이다.  

    [1] 이 배포를 위해선 먼저 새로운 RC를 만든 뒤 기존 RC에서 replica 수를 하나 줄이고, 새로운 RC에는 replica 수를 하나만 준다.
    ![스크린샷, 2020-09-16 10-51-30](https://user-images.githubusercontent.com/69498804/93283005-96b49580-f80a-11ea-94b1-0bd5e70cee5e.png)
    라벨이 동일하면 서비스는 자연히 새로운 RC에 의해 생성된 Pod를 서비스에 포함 시킨다.

    <br/>

    [2] 다음으로 기존 RC의 replica를 하나 더 줄이고, 새로운 RC의  replica를 하나 더 늘린다.

    ![스크린샷, 2020-09-16 10-53-50](https://user-images.githubusercontent.com/69498804/93283148-ea26e380-f80a-11ea-8df7-0fbed12ab227.png)

    <br/>

    [3]이후 기존 Pod가 하나더 서비스에서 빠지게 되고 새로운 버전의 Pod가 서비스에 추가된다.

    위의 작업을 반복하게 되면 아래 그림과 같이 예전 버전의 Pod가 모두 빠지고 새 버전의 Pod만 서비스 되게 된다. 
    
    ![스크린샷, 2020-09-16 10-55-11](https://user-images.githubusercontent.com/69498804/93283242-193d5500-f80b-11ea-820d-83b9e1408570.png)

    만약 배포가 잘못되었을 경우에는 기존 RC의 replica 수를 원래대로 올리고  
    새버전의 replicat 수를 0으로 만들어서 예전 버전의 Pod로 롤백이 가능하다.

    이 과정은 kubectl rolling-update라는 명령으로 RC 단위로 컨트롤이 가능하지만  
     그래도 여전히 작업이 필요하고, 배포 과정을 모니터링 해야 한다.  
     그리고 가장 큰 문제는 kubectl rolling-update 명령은 클라이언트에서 실행 하는 명령으로  
     명령어 실행중에 클라이언트의 연결이 끊어 지면 배포작업이 비정상적으로 끊어질 수 있는 문제가 있다. 

    추가적으로, 롤백과정 역시 수동 컨트롤이 필요할 수 있다. 그래서 이러한 과정을 자동화하고 추상화한 개념을 Deployment라고 보면 된다.

    Deployment는 Pod 배포를 위해서 RC를 생성하고 관리하는 역할을 하며  
    특히 롤백을 위한 기존 버전의 RC 관리등 여러가지 기능을 포괄적으로 포함하고 있다. 
    ![스크린샷, 2020-09-16 11-00-23](https://user-images.githubusercontent.com/69498804/93283605-d3cd5780-f80b-11ea-8f30-080ffd0b8735.png)

<br/>

---

## ✨ 고급 컨트롤러  

RC,RS,Deployment는 웹서버와 같은 일반적인 워크로드에 대해 Pod를 관리하기 위한 컨트롤러이다.  
실제 운영환경에서는 웹서버 이외의 데이타베이스 ,배치 작업, 데몬 서버등과 같이  
다양한 형태의 워크로드 모델이 존재하는데 이를 지원하기 위해 k8s는 다양한 컨트롤러를 제공한다. 

<br/>

* ### ``DaemonSet``  
    DaemonSet(DS)는 Pod가 각각의 노드에서 하나씩만 돌게 하는 형태로 Pod를 관리하는 컨트롤러이다. 
    ![스크린샷, 2020-09-16 11-04-50](https://user-images.githubusercontent.com/69498804/93283921-74237c00-f80c-11ea-85b4-3fa482f66c84.png)


    RC나 RS에 의해서 관리되는 Pod 는 노드의 상황에 따라서 일반적으로 비균등적으로 배포가 되지만  
    DS에 의해 관리되는 Pod는 모든 노드에 균등하게 ``하나씩``만 배포 된다.

    이런 형태의 워크로드는 서버의 모니터링이나 로그 수집 용도로 많이 사용되는데  
    DS의 다른 특징중 하나는, ``특정 Node들에만 Pod가 하나씩``만 배포 되도록 설정이 가능하다.

    로그나 모니터링 시나리오에서 특정 장비에 대한 모니터링을 하고자 할 때 이런 시나리오가 유효하다.  
    예를 들어 특정 장비(노드)에만 Nvme SSD를 사용하거나 GPU를 사용할 경우 그 장비가 설치된 노드만을 모니터링하면 된다.

    ![스크린샷, 2020-09-16 11-07-18](https://user-images.githubusercontent.com/69498804/93284066-cbc1e780-f80c-11ea-8908-ae3a5fdb5551.png)

    DS는 특정 노드에만 Pod를 배포할 수 있도록 Pod의 ``“node selector”``를 이용해서 특정 노드만을 선택할 수 있게 지원한다. 

<br/>

---

## 🤦‍♂️ Job  

워크로드 모델중에서 배치나 한번 실행되고 끝나는 형태의 작업이 있을 수 있다.  
예를 들어 원타임으로 파일 변환 작업을 하거나, 또는 주기적으로 ETL 배치 작업을 하는 경우에는 웹서버 처럼 계속 Pod가 떠 있을 필요없이 작업을 할때만 Pod 를 띄우면 된다. 
이러한 형태의 워크로드 모델을 지원하는 컨트롤러를 Job이라고 한다

![스크린샷, 2020-09-16 11-10-43](https://user-images.githubusercontent.com/69498804/93284286-47239900-f80d-11ea-87f1-309f3ebefac2.png)


Job에 의해서 관리되는 Pod는 Job이 종료되면, Pod 를 같이 종료한다.

Job을 정의할때는 보통 아래와 같이 컨테이너 스펙 부분에 image 뿐만 아니라  
컨테이너에서 Job을 수행하기 위한 커맨드(command) 를 같이 입력한다.

```cs
apiVersion: batch/v1
kind: Job
metadata:
name: pi
spec:
template:
    spec:
    containers:
    - name: pi
        image: perl
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"] <<<----#####
    restartPolicy: Never
backoffLimit: 4
```

<br/>

Job 컨트롤러에 의해서 실행된 Pod 는 이 command의 실행 결과에 따라서 Job이 실패한지 성공한지를 판단한다.  
(프로세스의 exit 코드로 판단)  
Job이 종료되었는데, 결과가 실패라면,이 Job을 재실행할지 또는 끝낼지를 설정에 따라서 결정한다.


``하지만 만약 Job이 끝나기 전에 비정상적으로 종료된다면 어떻게 될것인가?`` 

쿠버네티스 클러스터에서 특정 노드가 장애가 났다고 가정하자  
RC/RS에 의해서 관리되고 있는 Pod 는 자동으로 다른 노드에서 다시 자동으로 생성되서 시작될것이고  
컨트롤러에 의해 관리되고 있지 않은 Pod 는 다시 다른 노드에서 기동되지 않고 사라질것이다.

그렇다면 Job 에 의해서 관리되는 Pod는 어떻게 될것인가?
![스크린샷, 2020-09-16 11-14-31](https://user-images.githubusercontent.com/69498804/93284493-cd3fdf80-f80d-11ea-83f6-2288a32ecf66.png)

두가지 방법이 있다.  

1. 장애시 다시 시작하게 하거나  
2. 장애시 다시 시작하지 않게 할 수 있다. 

다시 시작의 개념은 작업의 상태가 보장되는것이 아닌  
다시 처음부터 작업이 재 시작되는 것이기 때문에 resume이 아닌 restart의 개념이다.  
다시 시작 처음부터 작업을 시작하더라도 데이타가 겹치거나 문제가 없는 형태여야 한다. 


배치 작업의 경우 작업을 한번만 실행할 수 도 있지만  
같은 작업을 연속해서 여러번 수행하는 경우가 있다. (데이타가 클 경우 범위를 나눠서 작업하는 경우)  
이런 경우를 위해서 Job 컨트롤러는 같은 Pod를 순차적으로, 여러번 실행할 수 있도록 설정이 가능하다.  
Job 설정에서 ``completion``에 횟수를 주면, 같은 작업을 completion 횟수만큼 순차적으로 반복한다.

![스크린샷, 2020-09-16 11-17-47](https://user-images.githubusercontent.com/69498804/93284745-417a8300-f80e-11ea-80d6-a46f2fc77297.png)

<br/>

만약 여러 작업을 처리해야 하지만 순차성이 필요없고 병렬로 처리를 하고 싶다면  
Job설정에서 ``parallelism`` 에 동시 실행할 수 있는 Pod의 수를 주면  
지정된 수 만큼 Pod를 실행하여 completion 횟수를 병렬로 처리한다.  
아래 그림은 completion이 5, parallelism이 2일 경우  
하나의 노드에서 모든 Pod가 실행된다고 가정했을때, 실행 순서를 보여주는 그림이다. 

![스크린샷, 2020-09-16 11-19-14](https://user-images.githubusercontent.com/69498804/93284830-7686d580-f80e-11ea-8764-1b9c6fafd424.png)

요약 : 총 2개의 POD 에서 병렬 실행, 5번 반복!!

<br/>

---

## 🌹 Cron jobs  

Job 컨트롤러에 의해서 실행되는 배치성 작업들에 대해서 고려할 점 중 하나는  
이런 배치성 작업을 메뉴얼로 실행하는 것이 아닌 주기적으로 자동화해서 실행할 필요가 있다는 것이다.  
이렇게 주기적으로 정해진 스케쥴에 따라 Job 컨트롤러에 의해 작업을 실행해주는 역할이다. 

아래는 cron jobs 컨트롤러의 예제인데, job 컨트롤러와 설정이 다르지 않다. 

```cs
apiVersion: batch/v1beta1
kind: CronJob
metadata:
name: hello
spec:
schedule: "*/1 * * * *"
jobTemplate:
    spec:
    template:
        spec:
        containers:
        - name: hello
            image: busybox
            args:
            - /bin/sh
            - -c
            - date; echo Hello from the Kubernetes cluster
        restartPolicy: OnFailure
```


다른 점은 CronJob 스펙 설정 부분에 ``“schedule”``이라는 항목이 있고 반복 조건을 unix cron과 같이 설정하면 된다. 

---

```toc
```