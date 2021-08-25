---
emoji: 🤦‍♂️
title: 쿠버네티스의 Service [Kubernetes]
date: "2021-06-29 00:07:19"
author: nasa1515
tags: Kubernetes
categories: Kubernetes
---

  
머리말  

이번 포스트에서는 쿠버네티스의 네트워크 및 내부 서비스들에 대해서 알아보겠습니다.
 

---

## ✔ Service


이전 포스트들에서 쿠버네티스 클러스터안에 컨트롤러들을 이용해서 POD를 정의했습니다.     

* POD 특성상 생성 및 정의 될때 지정되는 IP가 랜덤하고 

* 또한 리스타트 때마다 IP가 변동됩니다.  

위 두개의 이유로 POD는 ``고정된 엔드포인트``로 호출이 어렵습니다. 또한 여러 POD에 같은 애플리케이션을 운용할 경우  
이 POD 간의 로드밸런싱을 지원해줘야 하는데 이러한 기능들을 수행하는게 ``Service(서비스)`` 입니다.  

간략한 서비스들의 기능을 요약해보면 아래 4가지 정도입니다.

* 서비스를 사용하게 되면 고정된 주소를 이용해서 접근이 가능해 집니다.  
* 서비스를 통해 클러스터 외부에서 POD에 접근하는것도 가능합니다.  
* 여러 POD를 묶어 로드 밸런싱이 가능합니다.
* 고유한 DNS 이름을 가질 수 있습니다.

<br/>
<br/>

서비스는 ``get service`` 명령을 통해 목록을 받아 올 수 있습니다

```cs
[root@nasa-master nasa]# kubectl get service
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   24d
```
명령을 입력하면 default 네임스페이스에 항상 존재하는 서비스가 보이네요  
이전 아키텍쳐 포스트에서도 설명했지만 Master Node의 API로 접근하기 위한 서비스입니다!!

<br/>
<br/>

### 서비스 템플릿  
서비스는 다음과 같이 구성이 가능하며, 라벨 셀렉터 (label selector)를 이용하여 관리하고자 하는 Pod 들을 정의할 수 있습니다.

서비스 템플릿 기본 구조는 다음과 같습니다.


```cs
apiVersion: v1
kind: Service
metadata:
  name: hello-nasa-svc
spec:
  type: ClusterIP (LoadBalancer)
  clusterIP: 10.0.10.10
  selector:
    app: hello-nasa
  ports:
    - port: 80
    protocol: TCP
    targetPort: 8080
```
    
다른 부분은 일반적인 형태입니다  
* ``spec.type`` : 서비스 타입을 지정할수 있습니다. spec.type을 지정하지 않으면 기본 타입은 ClusterIP입니다.  
* ``spec.clusterIP`` : 사용하려는 클러스터IP를 직접 지정하는것도 가능합니다.  
* ``spec.selector`` : 서비스와 연결할 POD에 지정된 라벨을 지정합니다.   
* ``spec.ports`` :  배열 형태의 값입니다.  
서비스가 포트를 외부에 제공할때 하나가 아니라 여러개를 한꺼번에 제공가능한데 spec.ports 하위에 값을 넣어주면 됩니다.

<br/>
<br/>

이런 형태의 멀티 포트 서비스가 가능합니다  

예를 들어 웹서버의 HTTP와 HTTPS 포트가 대표적인 예인데  
아래와 같이 ports 부분에 두개의 포트 정보를 정의해주면 됩니다.

```cs
apiVersion: v1
kind: Service
metadata:
  name: nasa-node-svc
spec:
  selector:
     app: nasa-node
  ports:
     - name: http
     port: 80
     protocol: TCP
     targetPort: 8080
     - name: https
     port: 443
     protocol: TCP
     targetPort: 8082
```

<br/>
<br/>

위의 템플릿으로 생성을 해보면 아래와 같이 멀티 포트로 생성이 됩니다

```cs
[root@nasa-master nasa]# kubectl apply -f nasa-svcm.yml 
service/nasa-node-svc created
[root@nasa-master nasa]# 
[root@nasa-master nasa]# kubectl get svc
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
kubernetes      ClusterIP   10.96.0.1       <none>        443/TCP          24d
nasa-node-svc   ClusterIP   10.96.147.197   <none>        80/TCP,443/TCP   8s
```

<br/>
<br/>

### 엔드포인트  

엔트포인트란 서비스의 ``레이블 셀렉터``에 의해 연결된 POD의 IP 목록입니다. ``kube get endpoints`` 명령어로 확인 할 수 있습니다

```cs
[root@nasa-master nasa]# kubectl get endpoints
NAME            ENDPOINTS         AGE
kubernetes      10.146.0.6:6443   24d
nasa-node-svc   <none>            7m30s
```
방금 만든 서비스의 경우 연결되어있는 POD가 없기에 ``none``으로 정의 되어있다

<br/>
<br/>

``label``을 맞춰준 POD를 하나 생성해봅시다!

```cs
apiVersion: v1
kind: Pod
metadata:
name: nasa
labels: 
    app: nasa-node
spec:
containers:
    - name: nasa
    image: nginx:latest
    ports:
        - containerPort: 8080
        protocol: TCP
```

<br/>

```cs
[root@nasa-master nasa]# kubectl apply -f nasa.pod-s.yml 
pod/nasa created
[root@nasa-master nasa]# kubectl get po -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP          NODE         NOMINATED NODE   READINESS G
ATES
nasa   1/1     Running   0          97s   10.32.0.2   nasa-node3   <none>           <none>
```

<br/>
<br/>

이렇게 ``label``을 연결해준 POD가 생성되면 ``ENDPOINT``가 생성된다!

```cs
[root@nasa-master nasa]# kubectl get endpoints
NAME            ENDPOINTS                       AGE
kubernetes      10.146.0.6:6443                 24d
nasa-node-svc   10.32.0.2:8082,10.32.0.2:8080   17m
```

<br/>
<br/>

테스트 POD를 하나 돌려서 클러스터끼리의 통신을 확인해봅시다!

```cs
[root@nasa-master nasa]# kubectl run nasatest -it --image=c1t1d0s7/network-multitool --generator=run-pod/v1 --rm=true bash
If you don't see a command prompt, try pressing enter.
bash-5.0# 
bash-5.0# curl http://10.32.0.2
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>
<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>
<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```
통신이 너무 잘 댑니다!

<br/>

---

## 👍 서비스 세션 어피니티?

세션 어피니티란????  


위의 테스트처럼 1개의 POD가 아닌 RS,RC,DS 처럼 여러개의 POD가 생성되면  
당연히 LB로 POD를 묶어 여러개의 ENDPOINT를 가지고 있게 될 것이다  
그런 경우 클라이언트에서 요청을 보내면 로드밸런싱되어 매번 다른 파드로 연결된다.  
그러나 만약 특정 클라이언트에서 요청이 들어오면 매번 특정 파드로 연결하고 싶은 경우 사용하는 것이 세션 어피니티입니다  
    
```cs
apiVersion: v1
kind: Service
metadata:
name: mynapp-svc-ses-aff
spec:
sessionAffinity: ClientIP
ports:
- port: 80
    targetPort: 8080
selector:
    app: mynapp-rs
```

세션 어피니티 구성은 None과 ClientIP가 있으며 디폴트는 None이다.  
ClientIP를 설정하면 쿠버네티스 클러스터의 프록시(kube-proxy)는 클라이언트의 IP를 보고 매번 같은 파드로 연결해줍니다

``sessionAffinity`` 로 정의 할 수 있다

* none : (기본) 세션 어피니티 없음
* ClientIP : 클라이언트의 IP를 확인해 같은 파드로 연결됨 

<br/>
<br/>

## 🐱‍🏍 Service Type
서비스는 IP 주소 할당 방식과 연동 서비스등에 따라 크게 4가지로 구별할 수 있다.


* ``Cluster IP``  
디폴트 설정으로, 서비스에 클러스터 IP (내부 IP)를 할당한다. 쿠버네티스 클러스터 내에서는 이 서비스에 접근이 가능하지만  
클러스터 외부에서는 외부 IP 를 할당 받지 못했기 때문에, 접근이 불가능하다.

<br/>

* ``Load Balancer``  
보통 클라우드 벤더에서 제공하는 설정 방식으로 외부 IP 를 가지고 있는 로드밸런서를 할당한다  
외부 IP를 가지고 있기  때문에, 클러스터 외부에서 접근이 가능하다.

<br/>

* ``Node IP``  
클러스터 IP로만 접근이 가능한것이 아니라 모든 노드의 IP와 포트를 통해서도 접근이 가능하게 된다.  
예를 들어 아래와 같이 ``hello-node-svc`` 라는 서비스를 NodePort 타입으로 선언을 하고  
nodePort를 30036으로 설정하면 아래 설정에 따라 클러스터 IP의 80포트로도 접근이 가능하지만  
모든 노드의 30036 포트로도 서비스를 접근할 수 있다. 

<br/>
<br/>

hello-node-svc-nodeport.yaml

```cs
apiVersion: v1
kind: Service
metadata:
name: hello-node-svc
spec:
selector:
    app: hello-node
type: NodePort
ports:
    - name: http
    port: 80
    protocol: TCP
    targetPort: 8080
    nodePort: 30036
```

그림의 로직을 보면 이해가 쉬울 것이다.  

![스크린샷, 2020-09-18 13-43-43](https://user-images.githubusercontent.com/69498804/93557027-fbabef00-f9b4-11ea-80b6-c03f9a26892f.png)


<br/>
<br/>


### External name 
ExternalName은 외부 서비스를 쿠버네티스 내부에서 호출하고자할때 사용할 수 있다.   
클러스터내의 Pod들은 클러스터 IP를 가지고 있기 때문에 IP 대역 밖의 서비스를 호출하려면 NAT 설정등 복잡한 설정이 필요하다.  
특히 클라우드 환경을 사용할 경우 데이타 베이스 또는 클라우드에서 제공되는 매지니드 서비스 (RDS, CloudSQL)등을 사용 할 경우  
쿠버네티스 클러스터 밖이기 때문에, 호출이 어려운 경우가 있는데 이를 쉽게 해결할 수 있는 방법이 ``ExternalName`` 타입이다.

아래와 같이 서비스를 ExternalName 타입으로 설정하고  
주소를 DNS로  my.database.example.com으로 설정해주면  
이 my-service는 들어오는 모든 요청을 my.database.example.com 으로 포워딩 해준다.  
(일종의 프록시와 같은 역할) 

```cs
kind: Service
apiVersion: v1
metadata:
name: my-service
namespace: prod
spec:
type: ExternalName
externalName: my.database.example.com
```

<br/>
<br/>

다음과 같은 구조로 서비스가 배포된다.  


![스크린샷, 2020-09-18 14-06-37](https://user-images.githubusercontent.com/69498804/93558324-2e0b1b80-f9b8-11ea-876a-231e2d4e533c.png)


<br/>
<br/>

DNS가 아닌 직접 IP를 이용하는 방식 

위의 경우 DNS를 이용하였는데, DNS가 아니라 직접 IP 주소를 이용하는 방법도 있다.

<br/>
<br/>

서비스 ClusterIP 서비스로 생성을 한 후 서비스 네임만 정의하고 서비스에 속해있는 Pod를 지정하지 않는다.

```cs
apiVersion: v1
kind: Service
metadata:
name: nasa-svc-ext
spec:
ports:
- port: 80
```

<br/>
<br/>


다음으로, 아래와 같이 서비스의 EndPoint를 별도로 지정해주면 된다.

```cs
apiVersion: v1
kind: Endpoints
metadata:
name: nasa-svc-ext
subsets:
- addresses:
    - ip: 35.225.75.124
    ports:
    - port: 80
```


이 때 ``서비스명``과 서비스 ``EndPoints의 이름``이 동일해야 한다.  
위의 경우에는 ``nasa-svc-ext``로 같은 서비스명을 사용하였고 이 서비스는 35.225.75.124:80 서비스를 가르키도록 되어 있다.

<br/>

---

### 헤드리스 서비스

Headless Service

서비스는 접근을 위해서 Cluster IP 또는 External IP 를 지정받는다.

즉 서비스를 통해서 제공되는 기능들에 대한 엔드포인트를 쿠버네티스 서비스를 통해서 통제하는 개념인데  
MSA 에서는 기능 컴포넌트에 대한 엔드포인트 (IP 주소)를 찾는 기능을 서비스 디스커버리 (Service Discovery) 라고 하고  
서비스의 위치를 등록해놓는 서비스 디스커버리 솔루션을 제공한다.  
``Etcd`` 나 ``hashcorp``의 consul (https://www.consul.io/)과 같은 솔루션  
이 경우 쿠버네티스 서비스를 통해서 마이크로 서비스 컴포넌트를 관리하는 것이 아니라  
서비스 디스커버리 솔루션을 이용하기 때문에 서비스에 대한 IP 주소가 필요없다.

이런 시나리오를 지원하기 위한 쿠버네티스의 서비스를 헤드리스라고 하는데  
이러한 헤드리스 서비스는 Cluster IP 등의 주소를 가지지 않는다.  
단 DNS이름을 가지게 되는데 이 DNS 이름을 lookup 해보면 서비스 (로드밸런서)의 IP 를 리턴하지 않고  
이 서비스에 연결된 Pod 들의 IP 주소들을 리턴하게 된다.

<br/>
<br/>

간단하게 테스트를 해보자

RS로 여러개의 POD를 정의해놓은 상태이다!

```cs
[root@nasa-master nasa]# kubectl get po -o wide
NAME                       READY   STATUS    RESTARTS   AGE    IP          NODE         NOMINATED NODE   READINESS GATES
nasatest-5bdd7d57f-s8b7d   1/1     Running   0          27m    10.32.0.4   nasa-node3   <none>           <none>
replicaset-nasa-47skg      1/1     Running   0          5m6s   10.46.0.2   nasa-node1   <none>           <none>
replicaset-nasa-7j58x      1/1     Running   0          5m6s   10.32.0.2   nasa-node3   <none>           <none>
replicaset-nasa-8ncc5      1/1     Running   0          5m6s   10.42.0.3   nasa-node2   <none>           <none>
replicaset-nasa-ktzpq      1/1     Running   0          5m6s   10.32.0.3   nasa-node3   <none>           <none>
```

<br/>
<br/>

여기에 다음과 같은 헤드리스 서비스를 하나 가동시켜보자

```cs
apiVersion: v1
kind: Service
metadata:
name: nasa-node-svc-headless
spec:
clusterIP: None
selector:
    app: nasa-nginx-pods-label
ports:
    - name: http
    port: 80
    protocol: TCP
    targetPort: 8080
```
POD들의 레이블을 묶어준 뒤 서비스를 정의하게되면

<br/>
<br/>

아래와 같이 ClusterIP가 할당되지 않는 것을 확인 할 수 있다.

```cs
[root@nasa-master nasa]# kubectl get svc
NAME                     TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes               ClusterIP   10.96.0.1    <none>        443/TCP   31m
nasa-node-svc-headless   ClusterIP   None         <none>        80/TCP    6m12s
```

<br/>
<br/>

그러나 다른 POD를 생성해서 ``NSLOOKUP``을 날려 DNS를 조회해보면

```cs
[root@nasa-master nasa]# kubectl run nasatest -it --image=c1t1d0s7/network-multitool --generator=run-pod/v1 --rm=true bash
If you don't see a command prompt, try pressing enter.
bash-5.0# nslookup nasa-node-svc-headless
Server:         10.96.0.10
Address:        10.96.0.10#53
Name:   nasa-node-svc-headless.default.svc.cluster.local
Address: 10.46.0.2
Name:   nasa-node-svc-headless.default.svc.cluster.local
Address: 10.32.0.2
Name:   nasa-node-svc-headless.default.svc.cluster.local
Address: 10.32.0.3
Name:   nasa-node-svc-headless.default.svc.cluster.local
Address: 10.42.0.3
```
위과 같이 서비스에 의해 제공되는 pod 들의 IP 주소 목록이 나오는 것을 확인할 수 있다.

<br/>

---

### 로드밸런서 

* Loabbalancer  

현재 클러스터 환경은 GCP의 인스턴스에 KUBEADM으로 구성한 상태이다  
현재 환경에서 GCP의 외부 IP로 LB를 이용해 URL을 받아와 보자!  
외부 IP를 가지고 있기  때문에, 클러스터 외부에서 접근이 가능하다. 방화벽 문제만 없다면....;;;


<br/>
<br/>

우선 다음과 같은 RS를 하나 정의한다  

```cs
apiVersion: apps/v1 
kind: ReplicaSet 
metadata: 
name: rs-nasa 
spec: 
replicas: 4 
selector: 
    matchLabels: 
    app: nasa-rs-pod
template: 
    metadata: 
    name: nasa-rs
    labels: 
        app: nasa-rs-pod
    spec: 
    containers: 
    - name: rs-nasa 
        image: nginx:latest 
        ports: 
        - containerPort: 80
```

<br/>
<br/>

그리고 아래와 같은 LB 서비스를 하나 정의한다!!

```cs
apiVersion: v1
kind: Service
metadata:
name: nasa-node-lb
spec:
selector:
    app: nasa-rs-pod
ports:
    - name: http
    port: 80
    protocol: TCP
    targetPort: 80
type: LoadBalancer
externalIPs:
- 34.84.172.31
```

<br/>

``externalIPs``의 경우 GCP 인스턴스에서 고정으로 할당한 IP입니다
![스크린샷, 2020-09-18 16-01-07](https://user-images.githubusercontent.com/69498804/93566536-2c495400-f9c8-11ea-98d6-3ffefa470af0.png)

<br/>
<br/>


위의 정의된 템플릿들을 생성하면 아래와 같이 정상적으로 생성됩니다!!

```cs
[root@nasa-master nasa]# kubectl get po -o wide
NAME                       READY   STATUS    RESTARTS   AGE   IP          NODE         NOMINATE
D NODE   READINESS GATES
rs-nasa-fvzm6              1/1     Running   0          64m   10.46.0.3   nasa-node1   <none>  
        <none>
rs-nasa-hqhjs              1/1     Running   0          64m   10.42.0.3   nasa-node2   <none>  
        <none>
rs-nasa-jn6jz              1/1     Running   0          64m   10.32.0.2   nasa-node3   <none>  
        <none>
rs-nasa-zfh2n              1/1     Running   0          64m   10.46.0.2   nasa-node1   <none>  
        <none>
[root@nasa-master nasa]# kubectl get svc -o wide
NAME                     TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)        AGE    SEL
ECTOR
kubernetes               ClusterIP      10.96.0.1      <none>         443/TCP        119m   <no
ne>
nasa-node-lb             LoadBalancer   10.101.13.59   34.84.172.31   80:30850/TCP   36m    app
=nasa-rs-pod
[root@nasa-master nasa]# 
[root@nasa-master nasa]# kubectl get endpoints
NAME                     ENDPOINTS                                            AGE
kubernetes               10.146.0.6:6443                                      120m
nasa-node-lb             10.32.0.2:80,10.42.0.3:80,10.46.0.2:80 + 1 more...   36m
```
POS 정상기동, 서비스 정상기동, EndPoint에 정상적으로 Pod가 동기화 됨을 확인


<br/>
<br/>

자 그럼 이제 서비스를 위한 정의는 모두 끝났습니다!!


테스트를 하기전 GCP 방화벽에서 HTTP에 대한 PORT를 허용해줍니다!

![스크린샷, 2020-09-18 16-04-43](https://user-images.githubusercontent.com/69498804/93566868-ac6fb980-f9c8-11ea-87b7-828996360064.png)

<br/>
<br/>


모두 확인이 완료 되었으면 외부 ubuntu os에서 curl로 요청해봅시다!

```cs
curl 34.84.172.31:30850
```

<br/>

LB SVC에서 외부 PORT가 30850으로 설정되어있어 해당 포트로 요청해야합니다!!

![스크린샷, 2020-09-18 16-06-31](https://user-images.githubusercontent.com/69498804/93567090-15573180-f9c9-11ea-9163-e5023b1dc46f.png)

정상적으로 LB SVC의 외부IP로 URL을 받아오네요!! 성공!!

---

```toc
```