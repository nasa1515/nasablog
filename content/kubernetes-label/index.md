---
emoji: π€¦ββοΈ
title: "[Kubernetes] - μΏ λ²λ€ν°μ€μ λ μ΄λΈ λ° μλ ν°"
date: "2021-06-29 00:07:17"
author: nasa1515
tags: DevOps
categories: DevOps
---


λ¨Έλ¦¬λ§  

μ΄μ  ν¬μ€νΈμμλ κΈ°λ³Έμ μΈ PODμ μ μ λ° μμ±μ λν΄μ μμλ΄€λ€   
μ΄λ² ν¬μ€νΈμμλ PODλ₯Ό λ ν¨μ¨μ μΌλ‘ κ΄λ¦¬νκΈ° μν λ μ΄λΈκ³Ό μλ ν°μ λν΄μ μμλ³΄μ

---

## β λ μ΄λΈ

λ μ΄λΈ μ νλμ κ°μ μ€λΈμ νΈμ μ²¨λΆλ ν€μ κ°μ μμ΄λ€.  
λ μ΄λΈμ μ€λΈμ νΈμ νΉμ±μ μλ³νλ λ° μ¬μ©λμ΄ μ¬μ©μμκ² μ€μνμ§λ§, μ½μ΄ μμ€νμ μ§μ μ μΈ μλ―Έλ μλ€.  
λ μ΄λΈλ‘ μ€λΈμ νΈμ νμ μ§ν©μ μ ννκ³ , κ΅¬μ±νλλ° μ¬μ©ν  μ μλ€.  
λ μ΄λΈμ μ€λΈμ νΈλ₯Ό μμ±ν  λμ λΆμ΄κ±°λ μμ± μ΄νμ λΆμ΄κ±°λ μΈμ λ μ§ μμ μ΄ κ°λ₯νλ€.  
μ€λΈμ νΈλ§λ€ ν€μ κ°μΌλ‘ λ μ΄λΈμ μ μν  μ μλ€. μ€λΈμ νΈμ ν€λ κ³ μ ν κ°μ΄μ΄μΌ νλ€.

```cs
"metadata": {
  "labels": {
    "key1" : "value1",
    "key2" : "value2"
  }
}
```
<br/>

λ μ΄λΈμ UIμ CLIμμ ν¨μ¨μ μΈ μΏΌλ¦¬λ₯Ό μ¬μ©νκ³  κ²μμ μ¬μ©νκΈ°μ μ ν©νλ€.  
μλ³λμ§ μλ μ λ³΄λ ``μ΄λΈνμ΄μ``μΌλ‘ κΈ°λ‘ν΄μΌ νλ€.


* μ¬μ© λκΈ°  

    λ μ΄λΈμ μ΄μ©νλ©΄ μ¬μ©μκ° λμ¨νκ² κ²°ν©ν λ°©μμΌλ‘ μ‘°μ§ κ΅¬μ‘°μ μμ€ν μ€λΈμ νΈλ₯Ό λ§€νν  μ μμΌλ©°,  
    ν΄λΌμ΄μΈνΈμ λ§€ν μ λ³΄λ₯Ό μ μ₯ν  νμκ° μλ€.

* λ μ΄λΈ μμ :

    ```cs
    - "release" : "stable", "release" : "canary"
    - "environment" : "dev", "environment" : "qa", "environment" : "production"
    - "tier" : "frontend", "tier" : "backend", "tier" : "cache"
    - "partition" : "customerA", "partition" : "customerB"
    - "track" : "daily", "track" : "weekly"
    ```

    μΌλ°μ μΌλ‘ μ¬μ©νλ μμλ€μ μ’λ₯μ΄λ€.  
    μ¬μ©μκ° μνλ κ·μ½μ λ°λΌ μμ λ‘­κ² μ¬μ© ν  μ μμ§λ§, μ€λΈμ νΈμ λΆμ¬μ§ λ μ΄λΈ ν€λ κ³ μ ν΄μΌ νλ€.


<br/>


### λ μ΄λΈμ μ΄μ©ν νλ μ μ


<br/>

nasa-label.yml μμ±

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


yml νμΌ κΈ°λ°μ νλ μμ± λ° νμΈ

```cs
[root@nasa-master nasa]# kubectl apply -f nasa-lebel.yml 
pod/nasa-pod-label created
[root@nasa-master nasa]# kubectl get po
NAME             READY   STATUS    RESTARTS   AGE
nasa-pod-label   1/1     Running   0          7s
```

<br/>
<br/>

λ μ΄λΈ νμΈ

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

``-L μ΅μ``μ μ¬μ©ν΄ νΉμ  labelμ μ§μ νμ¬ νμ ν  μ μλ€.

```cs
[root@nasa-master nasa]# kubectl get pods -L env,tier
NAME             READY   STATUS    RESTARTS   AGE   ENV   TIER
nasa-pod-label   1/1     Running   0          15m   dev   frontend
```

<br/>

---

### νλ λ μ΄λΈ μμ   
    
νμ¬ μ‘΄μ¬νλ PODμ λ μ΄λΈμ μΆκ°νκ±°λ, μ΄λ―Έ μ‘΄μ¬νλ λ μ΄λΈμ μμ  ν  μ μλ€.  
μ΄λ―Έ λ μ΄λΈμ κ°μ§κ³  μλ PODμ λ μ΄λΈμ μΆκ°νλ©΄ μλμ κ°μ μ΄μκ° λ°μνλ€

```cs
[root@nasa-master nasa]# kubectl label pods nasa-pod-label env=test
error: 'env' already has a value (dev), and --overwrite is false
```

<br/>
<br/>

μ΄ κ²½μ° ``-overwrite`` μ΅μμ μΆκ°λ‘ μ μνλ©΄ λλ€  

```cs
[root@nasa-master nasa]# kubectl label pods nasa-pod-label env=test --overwrite
pod/nasa-pod-label labeled
[root@nasa-master nasa]# kubectl get pods --show-labels
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          20m   env=test,tier=frontend
```
λ€μκ³Ό κ°μ΄ ``env=test`` κ°μ΄ λ³κ²½ λ¨μ νμΈ!

<br/>

---

## β λ μ΄λΈ μλ ν°
    
νΉλ³ν κ°λμ μλκ³ , μ€λΈμ νΈμ λΆμ¬λ λ μ΄λΈμ κΈ°λ°μΌλ‘ κ²μν  μ μλ κ°λμ΄λ€.  
λ μ΄λΈμ κ³ μ νμ§ μλ€. λ§μ μ€λΈμ νΈμ λ€μν λ μ΄λΈμ λΆμ¬ν  μ μλ€.  
μ¬μ©μλ λ μ΄λΈ μλ ν°λ₯Ό μ΄μ©νμ¬ μ€λΈμ νΈλ₯Ό μλ³ν  μ μμΌλ©° λ μ΄λΈ μλ ν°λ μΏ λ²λ€ν°μ€ μ½μ΄ κ·Έλ£Ήμ μνλ€.

λͺ¨λ  μ»¨νΈλ‘€λ¬κ° κ°μ νΉμ§μ κ°μ§λλ°  
μλ₯Ό λ€μ΄ λ νλ¦¬μΌμ΄μ μ»¨νΈλ‘€λ¬κ° λ°λ‘ μ‘΄μ¬νκ³  μ»¨νΈλ‘€λ¬λ replica=3μ λ§λ€μ΄λ¬λΌκ³  μμ²­λ°λλ€.  
μ΄ λ a=123μ΄λΌλ labelμ νλμ μ§μ νλ©΄ λ§μ°¬κ°μ§λ‘ μ»¨νΈλ‘€λ¬λ a=123 λ μ΄λΈμλ ν°λ₯Ό κ°κ²λλ€.  
κ·Έλ¦¬κ³  μ»¨νΈλ‘€λ¬λ μ΄ λ μ΄λΈμ΄ λ¬λ¦° νλλ₯Ό μμ μ΄ κ΄λ¦¬νλ€λ μ¬μ€μ μΈμ§νλ€.


* λ μ΄λΈ μλ ν°λ₯Ό μ΄μ©ν΄μ κ²μνλ λ°©λ²μ λ κ°μ§κ° μλ€.
    - νΉμ  ν€μ μ λ¬΄λ‘ λ μ΄λΈ κ²μ
    - νΉμ  ν€μ κ°μ μ λ¬΄λ‘ λ μ΄λΈ κ²μ

<br/>

### κ· λ± κΈ°λ° λ μ΄λΈ μλ ν°(=, !, !=)


```cs
## tierν€κ° ν¬ν¨λ λ μ΄λΈ

[root@nasa-master nasa]# kubectl get pods --show-labels -l tier
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          26m   env=test,tier=frontend

## tierν€λ₯Ό μ μΈν λ μ΄λΈ
[root@nasa-master nasa]# kubectl get pods --show-labels -l '!tier'
NAME         READY   STATUS    RESTARTS   AGE    LABELS
nasa-pod   1/1     Running   0          101m   env=dev

## envν€μ testκ°μ΄ μλ λ μ΄λΈ
[root@nasa-master nasa]# kubectl get pods --show-labels -l env=test
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          28m   env=test,tier=frontend

## envν€λ μμ§λ§ devκ°μ μ μΈν λ μ΄λΈ
[root@nasa-master nasa]# kubectl get pods --show-labels -l env!=dev
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          29m   env=test,tier=frontend
```

<br/>

### μ§ν©μ± κΈ°λ° λ μ΄λΈ μλ ν°(in, notin)

```cs
## envν€μ debugλ devκ°μ΄ ν¬ν¨λ λ μ΄λΈ

[root@nasa-master nasa]# kubectl get pods --show-labels -l 'env in (test,dev)'
NAME             READY   STATUS    RESTARTS   AGE   LABELS
nasa-pod-label   1/1     Running   0          31m   env=test,tier=frontend

## tierν€μ frontendκ°μ μ μΈν λ μ΄λΈ
[root@nasa-master nasa]# kubectl get pods --show-labels -l 'tier notin (frontend)'
NAME         READY   STATUS    RESTARTS   AGE    LABELS
nasa-pod   1/1     Running   0          103m   env=dev
```

<br/>

---

## π μ΄λΈνμ΄μ


μ΄λΈνμ΄μμ΄λ?

μ€λΈμ νΈμ λ©νλ°μ΄ν°λ₯Ό ν λΉν  μ μλ μ£Όμκ³Ό κ°μ κ°λμ΄λ€.  
λ μ΄λΈκ³Ό κ°μ΄ key-value κ΅¬μ‘°λ₯Ό λμ§λ§ μ°¨μ΄κ° μλ€. λ μ΄λΈμ λ μ΄λΈ μλ ν°λ₯Ό μ΄μ©ν΄μ κ²μκ³Ό μλ³μ΄ κ°λ₯νλ,  
μ΄λΈνμ΄μμ λ©νλ°μ΄ν°μ μλ ₯λ§ κ°λ₯ν  λΏ μ£Όμκ³Ό κ°μΌλ―λ‘ κ²μμ΄ λμ§ μλλ€.  
μΏ λ²λ€ν°μ€ ν΄λ¬μ€ν°μ API μλ²κ° μ΄λΈνμ΄μμ μ§μ λ λ©νλ°μ΄ν°λ₯Ό μ°Έμ‘°ν΄μ  
λμνλ€λ μ μμ μ°λ¦¬κ° κΈ°μ‘΄μ μκ³  μλ μ£Όμμ²λΌ μμ  ν¬λͺν μνλ μλλ€.

<br/>β

μ΄λΈνμ΄μμ λ€μκ³Ό κ°μ λ©νλ°μ΄ν°λ₯Ό κΈ°λ‘ν  μ μλ€.

- νλ
- μ΄λ―Έμ§ μ λ³΄(νμ μ€ν¬ν, λ¦΄λ¦¬μ¦ ID, λΉλ λ²μ , git λΈλμΉ, μ΄λ―Έμ§ ν΄μ, λ μ§μ€νΈλ¦¬ μ£Όμ λ±)
- λ‘κΉ, λͺ¨λν°λ§ μ λ³΄
- λλ²κΉμ νμν μ λ³΄(μ΄λ¦,λ²μ ,λΉλμ λ³΄)
- μ±μμ μ°λ½μ²
- μ¬μ©μ μ§μ μ¬ν­

β<br/>

νμΌμ λ§λ€μ΄ μμλ₯Ό λ€μ΄λ³΄μ

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

ν΄λΉ νμΌλ‘ POD μμ±!

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

μ΄λΈνμ΄μμ ``describe ``μ΅μμΌλ‘ νμΈμ΄ κ°λ₯νλ€!

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

μ΄ μΈμ ``annotate`` λͺλ Ήμ μ΄μ©ν΄ λ³κ²½λ κ°λ₯νλ€!

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

## π λ€μμ€νμ΄μ€

λ€μμ€νμ΄μ€λ?

μΏ λ²λ€ν°μ€λ λμΌν λ¬Όλ¦¬ ν΄λ¬μ€ν°λ₯Ό κΈ°λ°μΌλ‘ νλ μ¬λ¬ κ°μ κ°μ ν΄λ¬μ€ν°λ₯Ό μ§μνλ€.  
μ΄λ¬ν κ°μ ν΄λ¬μ€ν° λ¨μλ₯Ό λ€μμ€νμ΄μ€λΌκ³  νλ€.  
λ€μμ€νμ΄μ€λ μ¬λ¬ κ°μ νμ΄λ νλ‘μ νΈμ κ±Έμ³ λ€μμ μ¬μ©μκ° μ‘΄μ¬νλ κ²½μ°μ  
μ¬μ©νλλ‘ κ³ μλ κ°λμ΄λ€. κ³΅μ λ¬Έμμμλ μ¬μ©μκ° μ μ­λͺ μ λμ λΆκ³Όν κ²½μ°λ   
λ€μμ€νμ΄μ€λ₯Ό κ³ λ €ν  νμκ° ``'μ ν'``μλ€κ³  νκ³  μλ€.


λ€μμ€νμ΄μ€λ μ΄λ¦μ λ²μλ₯Ό μ κ³΅νλ€.  
μ΄κ² λ¬΄μ¨ λ§μ΄λ νλ©΄, λ¦¬μμ€μ μ΄λ¦μ λ€μμ€νμ΄μ€ λ΄μμ μ μΌν΄μΌ νμ§λ§  
μλ‘ λ€λ₯Έ λ€μμ€νμ΄μ€ μμμλ κ°μ μ΄λ¦μ κ°μ§ λ¦¬μμ€κ° μ‘΄μ¬ν  μλ μλ€λ λ»μ΄λ€.  
λ¨, ``kube-`` λ‘ μμνλ λ€μμ€νμ΄μ€λ μ΄λ―Έ μΏ λ²λ€ν°μ€ μμ€ν λ€μμ€νμ΄μ€λ‘ μμ½λμ΄μμΌλ―λ‘ μ¬μ©νμ§ μλλ€.


<br/>

λ€μμ€νμ΄μ€ νμΈ

```cs
[root@nasa-master nasa]# kubectl get namespaces 
NAME              STATUS   AGE
default           Active   23d
kube-node-lease   Active   23d
kube-public       Active   23d
kube-system       Active   23d
```

<br/>

* ``default`` :  μ€λΈμ νΈ μμ± μ λ°λ‘ μ§μ νμ§ μμΌλ©΄ default λ€μμ€νμ΄μ€λ₯Ό μ¬μ©νκ² λμ΄μλ€.  
    
* ``kube-system`` : μΏ λ²λ€ν°μ€ μμ€νμμ μμ±ν μ€λΈμ νΈλ₯Ό μν λ€μμ€νμ΄μ€  

* ``kube-public`` : μ μ²΄ ν΄λ¬μ€ν°μμ κ³΅κ°λμ΄ μμ½λ λ€μμ€νμ΄μ€. λͺ¨λ  μ¬μ©μκ° μ½κΈ° κΆνμΌλ‘ μ κ·Ό κ°λ₯νλ€.  

* ``kube-node-lease`` : ν΄λ¬μ€ν°κ° μ€μΌμΌλ§λ  λ λΈλ health check μ±λ₯μ ν₯μμν€λ lease μ€λΈμ νΈμ λν λ€μμ€νμ΄μ€  

<br/>
<br/>

λ€μμ€νμ΄μ€ μμ μ€λΈμ νΈ νμΈ

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
λ€μμ€νμ΄μ€λ₯Ό μ§μ ν  λλ -n λλ --namespace μ΅μμ μ¬μ©νλ©° μ§μ νμ§ μμΌλ©΄ default λ€μμ€νμ΄μ€ κΈ°μ€μ΄λ€.

<br/>
<br/>

λ€μμ€νμ΄μ€ μμ± λ° μ‘°ν
    
yaml νμΌλ‘λ κ°λ₯νμ§λ§ μ»€λ§¨λλ‘λ κ°λ¨ν μμ±ν  μ μλ€.

```cs
[root@nasa-master nasa]# kubectl create namespace nasa
namespace/nasa created
[root@nasa-master nasa]# kubectl get namespace nasa
NAME   STATUS   AGE
nasa   Active   28s
```

<br/>
<br/>

yamlνμΌλ‘ λ€μμ€νμ΄μ€ μμ±

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

νΉμ  λ€μμ€νμ΄μ€μ νλ μ€λΈμ νΈ μμ±

```cs
[root@nasa-master nasa]# kubectl apply -f nasa.yml -n nasa-namespace
pod/nasa-nginx-pod created
[root@nasa-master nasa]# kubectl get po -n nasa-namespace
NAME             READY   STATUS              RESTARTS   AGE
nasa-nginx-pod   0/2     ContainerCreating   0          17s
```

<br/>
<br/>

μ΄ μμλ yaml νμΌλ‘ μμ±ν΄λ³΄μ!

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

λ¦¬μμ€ μ­μ  : λ¦¬μμ€λ μΈ κ°μ§ λ°©λ²μΌλ‘ κ°λ₯νλ€.

μ€λΈμ νΈ μ΄λ¦μΌλ‘ μ­μ 

```cs
[root@nasa-master nasa]# kubectl delete pod nasa-pod -n nasa 
pod "nasa-pod" deleted
[root@nasa-master nasa]# kubectl get po -n nasa
No resources found.
```

<br/>
<br/>

μ€λΈμ νΈ μ μνμΌ(yaml λ° jsonνμΌ)λ‘ μ­μ 

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

μ€λΈμ νΈ λ μ΄λΈλ‘ μ­μ 

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

νλμ μ΄μ΄ λ€μμ€νμ΄μ€λ μ κ±°νλ€.


```toc
```
---