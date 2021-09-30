---
emoji: 🤦‍♂️
title: "[Kubernetes] - 쿠버네티스의 레이블 및 셀렉터
date: "2021-06-29 00:07:17"
author: nasa1515
tags: Kubernetes
categories: Kubernetes
---


머리말  

이전 포스트에서는 기본적인 POD의 정의 및 생성에 대해서 알아봤다   
이번 포스트에서는 POD를 더 효율적으로 관리하기 위한 레이블과 셀렉터에 대해서 알아보자

---

## ✔ 레이블

레이블 은 파드와 같은 오브젝트에 첨부된 키와 값의 쌍이다.  
레이블은 오브젝트의 특성을 식별하는 데 사용되어 사용자에게 중요하지만, 코어 시스템에 직접적인 의미는 없다.  
레이블로 오브젝트의 하위 집합을 선택하고, 구성하는데 사용할 수 있다.  
레이블은 오브젝트를 생성할 때에 붙이거나 생성 이후에 붙이거나 언제든지 수정이 가능하다.  
오브젝트마다 키와 값으로 레이블을 정의할 수 있다. 오브젝트의 키는 고유한 값이어야 한다.

```cs
"metadata": {
  "labels": {
    "key1" : "value1",
    "key2" : "value2"
  }
}
```
<br/>

레이블은 UI와 CLI에서 효율적인 쿼리를 사용하고 검색에 사용하기에 적합하다.  
식별되지 않는 정보는 ``어노테이션``으로 기록해야 한다.


* 사용 동기  

    레이블을 이용하면 사용자가 느슨하게 결합한 방식으로 조직 구조와 시스템 오브젝트를 매핑할 수 있으며,  
    클라이언트에 매핑 정보를 저장할 필요가 없다.

* 레이블 예시 :

    ```cs
    - "release" : "stable", "release" : "canary"
    - "environment" : "dev", "environment" : "qa", "environment" : "production"
    - "tier" : "frontend", "tier" : "backend", "tier" : "cache"
    - "partition" : "customerA", "partition" : "customerB"
    - "track" : "daily", "track" : "weekly"
    ```

    일반적으로 사용하는 예시들의 종류이다.  
    사용자가 원하는 규약에 따라 자유롭게 사용 할 수 있지만, 오브젝트에 붙여진 레이블 키는 고유해야 한다.


<br/>


### 레이블을 이용한 파드 정의


<br/>

nasa-label.yml 작성

```cs
apiVersion: v1
kind: Pod
metadata:
name: nasa-pod-label
labels:
    env: dev
    tier: frontend
spec:
containers:
- image: nginx:latest
    name: nasa
    ports:
    - containerPort: 8080
    protocol: TCP
```

<br/>
<br/>


yml 파일 기반의 파드 생성 및 확인

```cs
[root@nasa-master nasa]# kubectl apply -f nasa-lebel.yml 
pod/nasa-pod-label created
[root@nasa-master nasa]# kubectl get po
NAME             READY   STATUS    RESTARTS   AGE
nasa-pod-label   1/1     Running   0          7s
```

<br/>
<br/>

레이블 확인

```cs
[root@nasa-master nasa]# kubectl get pod --show-labels
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          68s   env=dev,tier=frontend
```

<br/>
<br/>

```cs
[root@nasa-master nasa]# kubectl describe pods nasa-pod-label 
Name:         nasa-pod-label
Namespace:    default
Priority:     0
Node:         nasa-node3/10.146.0.9
Start Time:   Wed, 16 Sep 2020 08:11:15 +0000
Labels:       env=dev
            tier=frontend
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"labels":{"env":"d
ev","tier":"frontend"},"name":"nasa-pod-label","namespace":...
...
```

<br/>
<br/>

``-L 옵션``을 사용해 특정 label을 지정하여 표시 할 수 있다.

```cs
[root@nasa-master nasa]# kubectl get pods -L env,tier
NAME             READY   STATUS    RESTARTS   AGE   ENV   TIER
nasa-pod-label   1/1     Running   0          15m   dev   frontend
```

<br/>

---

### 파드 레이블 수정  
    
현재 존재하는 POD에 레이블을 추가하거나, 이미 존재하는 레이블을 수정 할 수 있다.  
이미 레이블을 가지고 있는 POD에 레이블을 추가하면 아래와 같은 이슈가 발생한다

```cs
[root@nasa-master nasa]# kubectl label pods nasa-pod-label env=test
error: 'env' already has a value (dev), and --overwrite is false
```

<br/>
<br/>

이 경우 ``-overwrite`` 옵션을 추가로 정의하면 된다  

```cs
[root@nasa-master nasa]# kubectl label pods nasa-pod-label env=test --overwrite
pod/nasa-pod-label labeled
[root@nasa-master nasa]# kubectl get pods --show-labels
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          20m   env=test,tier=frontend
```
다음과 같이 ``env=test`` 값이 변경 됨을 확인!

<br/>

---

## ✌ 레이블 셀렉터
    
특별한 개념은 아니고, 오브젝트에 부여된 레이블을 기반으로 검색할 수 있는 개념이다.  
레이블은 고유하지 않다. 많은 오브젝트에 다양한 레이블을 부여할 수 있다.  
사용자는 레이블 셀렉터를 이용하여 오브젝트를 식별할 수 있으며 레이블 셀렉터는 쿠버네티스 코어 그룹에 속한다.

모든 컨트롤러가 같은 특징을 가지는데  
예를 들어 레플리케이션 컨트롤러가 따로 존재하고 컨트롤러는 replica=3을 만들어달라고 요청받는다.  
이 때 a=123이라는 label을 파드에 지정하면 마찬가지로 컨트롤러는 a=123 레이블셀렉터를 갖게된다.  
그리고 컨트롤러는 이 레이블이 달린 파드를 자신이 관리한다는 사실을 인지한다.


* 레이블 셀렉터를 이용해서 검색하는 방법은 두 가지가 있다.
    - 특정 키의 유무로 레이블 검색
    - 특정 키와 값의 유무로 레이블 검색

<br/>

### 균등 기반 레이블 셀렉터(=, !, !=)


```cs
## tier키가 포함된 레이블

[root@nasa-master nasa]# kubectl get pods --show-labels -l tier
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          26m   env=test,tier=frontend

## tier키를 제외한 레이블
[root@nasa-master nasa]# kubectl get pods --show-labels -l '!tier'
NAME         READY   STATUS    RESTARTS   AGE    LABELS
nasa-pod   1/1     Running   0          101m   env=dev

## env키에 test값이 있는 레이블
[root@nasa-master nasa]# kubectl get pods --show-labels -l env=test
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          28m   env=test,tier=frontend

## env키는 있지만 dev값은 제외한 레이블
[root@nasa-master nasa]# kubectl get pods --show-labels -l env!=dev
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          29m   env=test,tier=frontend
```

<br/>

### 집합성 기반 레이블 셀렉터(in, notin)

```cs
## env키에 debug나 dev값이 포함된 레이블

[root@nasa-master nasa]# kubectl get pods --show-labels -l 'env in (test,dev)'
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          31m   env=test,tier=frontend

## tier키에 frontend값은 제외한 레이블
[root@nasa-master nasa]# kubectl get pods --show-labels -l 'tier notin (frontend)'
NAME         READY   STATUS    RESTARTS   AGE    LABELS
nasa-pod   1/1     Running   0          103m   env=dev
```

<br/>

---

## 👏 어노테이션


어노테이션이란?

오브젝트에 메타데이터를 할당할 수 있는 주석과 같은 개념이다.  
레이블과 같이 key-value 구조를 띄지만 차이가 있다. 레이블은 레이블 셀렉터를 이용해서 검색과 식별이 가능하나,  
어노테이션은 메타데이터의 입력만 가능할 뿐 주석과 같으므로 검색이 되지 않는다.  
쿠버네티스 클러스터의 API 서버가 어노테이션에 지정된 메타데이터를 참조해서  
동작한다는 점에서 우리가 기존에 알고 있는 주석처럼 완전 투명한 상태는 아니다.

<br/>​

어노테이션은 다음과 같은 메타데이터를 기록할 수 있다.

- 필드
- 이미지 정보(타임 스탬프, 릴리즈 ID, 빌드 버전, git 브랜치, 이미지 해시, 레지스트리 주소 등)
- 로깅, 모니터링 정보
- 디버깅에 필요한 정보(이름,버전,빌드정보)
- 책임자 연락처
- 사용자 지시 사항

​<br/>

파일을 만들어 예시를 들어보자

```cs
apiVersion: v1
kind: Pod
metadata:
name: annotations-nasa
annotations:
    imageregistry: "https://hub.docker.com/"
spec:
containers:
- name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

<br/>
<br/>

해당 파일로 POD 생성!

```cs
[root@nasa-master nasa]# kubectl apply -f ano.yml 
pod/annotations-nasa created
[root@nasa-master nasa]# 
[root@nasa-master nasa]# kubectl get po
NAME               READY   STATUS    RESTARTS   AGE
annotations-nasa   1/1     Running   0          5s
nasa-pod-label     1/1     Running   0          38m
```

<br/>
<br/>

어노테이션은 ``describe ``옵션으로 확인이 가능하다!

```cs
[root@nasa-master nasa]# kubectl describe pods annot
Name:         annotations-nasa
Namespace:    default
Priority:     0
Node:         nasa-node3/10.146.0.9
Start Time:   Wed, 16 Sep 2020 08:49:37 +0000
Labels:       <none>
Annotations:  imageregistry: https://hub.docker.com/         <<<######>>>
            kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{"imageregistry":"htt
ps://hub.docker.com/"},"name":"annotations-nasa","namespace...
Status:       Running
IP:           10.32.0.3
...
```

<br/>
<br/>

이 외에 ``annotate`` 명령을 이용해 변경도 가능하다!

```cs
[root@nasa-master nasa]# kubectl annotate pods annotations-nasa mynameis="John Smith"
pod/annotations-nasa annotated
[root@nasa-master nasa]# kubectl describe pods annot
Name:         annotations-nasa
Namespace:    default
Priority:     0
Node:         nasa-node3/10.146.0.9
Start Time:   Wed, 16 Sep 2020 08:49:37 +0000
Labels:       <none>
Annotations:  imageregistry: https://hub.docker.com/
            kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{"imageregistry":"htt
ps://hub.docker.com/"},"name":"annotations-nasa","namespace...
            mynameis: John Smith         <<<<----#######
```

<br/>

---

## 👍 네임스페이스

네임스페이스란?

쿠버네티스는 동일한 물리 클러스터를 기반으로 하는 여러 개의 가상 클러스터를 지원한다.  
이러한 가상 클러스터 단위를 네임스페이스라고 한다.  
네임스페이스는 여러 개의 팀이나 프로젝트에 걸쳐 다수의 사용자가 존재하는 경우에  
사용하도록 고안된 개념이다. 공식 문서에서는 사용자가 수 십명 정도에 불과한 경우는   
네임스페이스를 고려할 필요가 ``'전혀'``없다고 하고 있다.


네임스페이스는 이름의 범위를 제공한다.  
이게 무슨 말이냐 하면, 리소스의 이름은 네임스페이스 내에서 유일해야 하지만  
서로 다른 네임스페이스 안에서는 같은 이름을 가진 리소스가 존재할 수도 있다는 뜻이다.  
단, ``kube-`` 로 시작하는 네임스페이스는 이미 쿠버네티스 시스템 네임스페이스로 예약되어있으므로 사용하지 않는다.


<br/>

네임스페이스 확인

```cs
[root@nasa-master nasa]# kubectl get namespaces 
NAME              STATUS   AGE
default           Active   23d
kube-node-lease   Active   23d
kube-public       Active   23d
kube-system       Active   23d
```

<br/>

* ``default`` :  오브젝트 생성 시 따로 지정하지 않으면 default 네임스페이스를 사용하게 되어있다.  
    
* ``kube-system`` : 쿠버네티스 시스템에서 생성한 오브젝트를 위한 네임스페이스  

* ``kube-public`` : 전체 클러스터에서 공개되어 예약된 네임스페이스. 모든 사용자가 읽기 권한으로 접근 가능하다.  

* ``kube-node-lease`` : 클러스터가 스케일링될 때 노드 health check 성능을 향상시키는 lease 오브젝트에 대한 네임스페이스  

<br/>
<br/>

네임스페이스 상의 오브젝트 확인

```cs
[root@nasa-master nasa]# kubectl get pods -n kube-system
NAME                                    READY   STATUS    RESTARTS   AGE
coredns-5c98db65d4-8cg79                1/1     Running   2          23d
coredns-5c98db65d4-zbvbn                1/1     Running   1          23d
etcd-nasa-master                        1/1     Running   1          23d
kube-apiserver-nasa-master              1/1     Running   1          23d
kube-controller-manager-nasa-master     1/1     Running   1          23d
kube-proxy-6w9dk                        1/1     Running   1          23d
kube-proxy-jqks7                        1/1     Running   1          23d
kube-proxy-kr9sb                        1/1     Running   1          23d
kube-proxy-lxn6d                        1/1     Running   1          23d
kube-scheduler-nasa-master              1/1     Running   1          23d
kubernetes-dashboard-6b8c96cf8c-g985n   1/1     Running   1          23d
weave-net-dd6f2                         2/2     Running   3          23d
weave-net-k2jc9                         2/2     Running   3          23d
weave-net-k2tcb                         2/2     Running   3          23d
weave-net-v7bff                         2/2     Running   3          23d
```
네임스페이스를 지정할 때는 -n 또는 --namespace 옵션을 사용하며 지정하지 않으면 default 네임스페이스 기준이다.

<br/>
<br/>

네임스페이스 생성 및 조회
    
yaml 파일로도 가능하지만 커맨드로도 간단히 생성할 수 있다.

```cs
[root@nasa-master nasa]# kubectl create namespace nasa
namespace/nasa created
[root@nasa-master nasa]# kubectl get namespace nasa
NAME   STATUS   AGE
nasa   Active   28s
```

<br/>
<br/>

yaml파일로 네임스페이스 생성

```cs
apiVersion: v1
kind: Namespace
metadata:
name: nasa-namespace
```

<br/>

```cs
[root@nasa-master nasa]# kubectl apply -f name.yml 
namespace/nasa-namespace created
[root@nasa-master nasa]# 
[root@nasa-master nasa]# kubectl get namespace nasa-namespace
NAME             STATUS   AGE
nasa-namespace   Active   19s
```

<br/>
<br/>

특정 네임스페이스에 파드 오브젝트 생성

```cs
[root@nasa-master nasa]# kubectl apply -f nasa.yml -n nasa-namespace
pod/nasa-nginx-pod created
[root@nasa-master nasa]# kubectl get po -n nasa-namespace
NAME             READY   STATUS              RESTARTS   AGE
nasa-nginx-pod   0/2     ContainerCreating   0          17s
```

<br/>
<br/>

이 작업도 yaml 파일로 작성해보자!

```cs
apiVersion: v1
kind: Pod
metadata:
name: nasa-pod
namespace: nasa
spec:
containers:
- image: nginx:latest
    name: nasa-pod
    ports:
    - containerPort: 8080
        protocol: TCP
```

<br/>

```cs
[root@nasa-master nasa]# kubectl apply -f nasaname.yml 
pod/nasa-pod created
[root@nasa-master nasa]# kubectl get po -n nasa
NAME       READY   STATUS    RESTARTS   AGE
nasa-pod   1/1     Running   0          12s
```

<br/>
<br/>

리소스 삭제 : 리소스는 세 가지 방법으로 가능하다.

오브젝트 이름으로 삭제

```cs
[root@nasa-master nasa]# kubectl delete pod nasa-pod -n nasa 
pod "nasa-pod" deleted
[root@nasa-master nasa]# kubectl get po -n nasa
No resources found.
```

<br/>
<br/>

오브젝트 정의파일(yaml 및 json파일)로 삭제

```cs
[root@nasa-master nasa]# kubectl get pod -n nasa-namespace
NAME             READY   STATUS             RESTARTS   AGE
nasa-nginx-pod   1/2     CrashLoopBackOff   6          9m57s
[root@nasa-master nasa]# 
[root@nasa-master nasa]# kubectl delete -f name.yml 
namespace "nasa-namespace" deleted
[root@nasa-master nasa]# kubectl get pod -n nasa-namespace
No resources found.
```

<br/>
<br/>

오브젝트 레이블로 삭제

```cs
[root@nasa-master nasa]# kubectl get pods -l env=test
NAME             READY   STATUS    RESTARTS   AGE
nasa-pod-label   1/1     Running   0          68m
[root@nasa-master nasa]# 
[root@nasa-master nasa]# kubectl delete pods -l env=test
pod "nasa-pod-label" deleted
[root@nasa-master nasa]# kubectl get pods -l env=test
No resources found.
```

파드에 이어 네임스페이스도 제거한다.


```toc
```
---