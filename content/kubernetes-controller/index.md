---
emoji: π€¦ββοΈ
title: "[Kubernetes] - μΏ λ²λ€ν°μ€μ μ»¨νΈλ‘€λ¬"
date: "2021-06-29 00:07:18"
author: nasa1515
tags: DevOps
categories: DevOps
---

  

λ¨Έλ¦¬λ§  

μ΄λ² ν¬μ€νΈμμλ μλμ μΌλ‘ POD λ° μμ€νμ κ΄λ¦¬ ν  μ μλ μ»¨νΈλ‘€λ¬μ λν΄μ μμλ³΄κ² μ΅λλ€

---

## β λΌμ΄λΈλμ€ νλ‘λΈ


λΌμ΄λΈλμ€ νλ‘λΈ κ°λ

μ¬μ©μκ° λͺ¨λ  μ€λΈμ νΈλ₯Ό μΌμΌμ΄ κ΄λ¦¬ν  μλ μλ€.  
κ΄λ¦¬νκ³ μ νλλΌλ μ¬μ©μμ μ¬κ°μ§λμ μλ μ€λΈμ νΈλ₯Ό μ€μ  νλ‘λμ νκ²½μμ κ΄λ¦¬νκΈ° μν΄μλ μλ μμμ κΆμ₯λμ§ μλλ€.

μ€μ  νκ²½μμλ μλμ μΌλ‘ μ μμ μ΄κ³  μμ μ μΈ μνκ° μ μ§λμ΄μΌ νλ€.  
μΏ λ²λ€ν°μ€κ° μ΄λ¬ν μκ΅¬λ₯Ό μΆ©μ‘±μν€κΈ° μν΄μ μ¬μ©νλ κ²μ΄ ``λΌμ΄λΈλμ€ νλ‘λΈ``μ΄λ€.


λΌμ΄λΈλμ€ νλ‘λΈλ νλμ μν΄ μ»¨νμ΄λλ₯Ό λμμν€κ³  λμμ€μΈ μ»¨νμ΄λμ μνλ₯Ό μ£ΌκΈ°μ μΌλ‘ λͺ¨λν°λ§νλ€.  
νλμμ μ€λ₯κ° λ°μνλ©΄ ν΄λΉ μ»¨νμ΄λλ₯Ό μ¬μμμν¨λ€.  
μΏ λ²λ€ν°μ€μ ν΅μ¬μ΄λΌκ³  ν  μ μλ λμμ΄ λ°λ‘ μ΄ λΌμ΄λΈλμ€ νλ‘λΈ λλΆμ κ°λ₯ν κ²μ΄λ€.

β
<br/>


λΌμ΄λΈλμ€ νλ‘λΈλ μΈ κ°μ§ λ°©μμΌλ‘ μ»¨νμ΄λμ μνλ₯Ό λͺ¨λν°λ§νλ€.

- ``HTTP GET νλ‘λΈ`` : HTTP μμ²­ / μλ΅μΌλ‘ νμΈ

- ``TCP μμΌ νλ‘λΈ`` : ν¬νΈ μ°κ²° μλν΄μ νμΈ

- ``Exec νλ‘λΈ`` : μ»¨νμ΄λ λ΄λΆμ λ°μ΄λλ¦¬λ₯Ό μ€ννκ³  μ’λ£ μ½λ νμΈ  
    
    
    
λΌμ΄λΈλμ€ νλ‘λΈλ νμ¬ λμμ€μΈ νλμ μνλ₯Ό κ°μ§νκ³  μ¬μμ νλλ°μ κ·Έ μ­ν μ λ€ νμ§λ§  
μ¬λ¬ μ¬μ λ‘ μΈν΄ νλκ° μ­μ λκ±°λ λΈλ μμ²΄μ μ₯μ κ° λ°μνλ κ²½μ°μλ νλλ₯Ό μ¬ μμ ν  μ μλ€.  
μ΄λ¬ν μν©μ λλΉν΄ κ°μ©μ±μ λμ΄κΈ° μν΄μλ RC, RS, DS λ±μ μ»¨νΈλ‘€λ¬λ₯Ό μ¬μ©ν΄μΌ νλ€.

<br/>
<br/>

### λΌμ΄λΈλμ€ νλ‘λΈ μμ±

λΌμ΄λΈλμ€ νλ‘λΈ μμ± - ``μ μ μν``


```cs
apiVersion: v1
kind: Pod
metadata:
name: nasa-pod-liveness
spec:
containers:
- image: nginx:latest
    name: nasa
    ports:
    - containerPort: 8080
    protocol: TCP
    livenessProbe:
    httpGet:
        path: /
        port: 8080
```

HTTP GET νλ‘λΈλ₯Ό μ¬μ©νμμΌλ©°, κ²½λ‘λ / ν¬νΈλ 8080μ΄λ€.

<br/>


* μ»¨νΌκ·Έ μ€λͺ

    * ``livenessProbe``: λΌμ΄λΈλμ€ νλ‘λΈ μ μ 
    * ``httpGet`` : HTTP GET νλ‘λΈ μ μ
    * ``tcpSocket`` : TCP μμΌ νλ‘λΈ μ μ 
    * ``Exec``: Exec νλ‘λΈ μ μ


<br/>
<br/>

μμ±ν YAML νμΌλ‘ PODλ₯Ό μμ±νλ€

```cs
[root@nasa-master nasa]# kubectl apply -f nasa-pod-liveness.yml 
pod/nasa-pod-liveness created
[root@nasa-master nasa]# kubectl get pods --watch
NAME                READY   STATUS    RESTARTS   AGE
nasa-pod-liveness   1/1     Running   0          19s
```


λΌμ΄λΈλμ€μ νμΈμ μν΄ ``--watch`` μ΅μμ μ¬μ©ν΄ μ§μμ μΌλ‘ λͺ¨λν°λ§!

<br/>
<br/>

μ μμ μΈ μνλ₯Ό νμΈνμΌλ λΉμ μ μνλ₯Ό λ§λ€μ΄ λ³΄κ² μ΅λλ€.


```
apiVersion: v1
kind: Pod
metadata:
name: nasa-pod-liveness-error
spec:
containers:
- image: nginx:latest
    name: nasa
    ports:
    - containerPort: 8081
    protocol: TCP
    livenessProbe:
    httpGet:
        path: /
        port: 8082
```
μμ YAMLνμΌκ³Ό λͺ¨λ λμΌνμ§λ§ ``PORT``λ₯Ό μμλ‘ λ€λ₯΄κ² μ£Όμ΄ ``error``μν λ°μ

<br/>
<br/>

POD λ₯Ό μμ± ν λͺ¨λν°λ§ ν΄λ³΄κ² μ΅λλ€

```cs
[root@nasa-master nasa]# kubectl apply -f nasa-pod-livness-error.yml 
pod/nasa-pod-liveness-error created
```

<br/>

```cs
[root@nasa-master nasa]# kubectl get pods --watch
NAME                  READY   STATUS    RESTARTS   AGE
nasa-pod-liveness   1/1     Running   0          30s
nasa-pod-liveness-error   0/1     Pending   0          0s
nasa-pod-liveness-error   0/1     Pending   0          0s
nasa-pod-liveness-error   0/1     ContainerCreating   0          0s
nasa-pod-liveness-error   1/1     Running             0          5s
nasa-pod-liveness-error   1/1     Running             1          62s
nasa-pod-liveness-error   1/1     Running             2          2m1s
nasa-pod-liveness-error   1/1     Running             3          3m1s
```

<br/>
<br/>

WATCHλ‘ λͺ¨λν°λ§μ€μ΄λ ν°λ―Έλμ νμΈν΄λ³΄λ©΄ λ³νκ° μκ²Όλ€.  
RESTARTS νλκ° 0 μμ μμλ‘ λ³κ²½λ κ²μ λΌμ΄λΈλμ€ νλ‘λΈκ° ν΄λΉ νλλ₯Ό μ΄μμ΄ μλ κ²μΌλ‘ νλ¨νκ³   
μ¬ μμ μλμ€μμ μλ―Ένλ€.


```cs
nasa-pod-liveness-error   1/1     Running             4          4m2s
nasa-pod-liveness-error   1/1     Running             5          5m1s
nasa-pod-liveness-error   0/1     CrashLoopBackOff    5          5m58s
```
μ μ νμ λ€μ νμΈν΄λ³΄λ©΄ μνκ° CrashLoopBackOff μΈ κ²μ νμΈν  μ μλ€.


<br/>
<br/>

PODμ Describeλ₯Ό νμΈν΄λ³΄μ

```cs
[root@nasa-master nasa]# kubectl describe pods nasa-pod-liveness-error
    ...
    ...
    State:          Running
    Started:      Fri, 17 Aug 2020 05:12:20 +0000
    Last State:     Terminated
    Reason:       Error
    Exit Code:    137
    Started:      Fri, 17 Aug 2020 05:11:20 +0000
    Finished:     Fri, 17 Aug 2020 05:12:16 +0000
    Ready:          True
    Restart Count:  3
```

<br/>
<br/>

Exit Codeλ νλ‘μΈμ€λ₯Ό μ’λ£νκΈ° μν μ½λμ΄λ€(137=128+9 , 9λ² μκ·Έλ : SIGKILL)  

``μ’λ₯``

* delay
* timeout
* period κ° μΆκ°λ‘ μ‘΄μ¬ νλ€.  
        
μ»¨νμ΄λ μ€ν νλ‘λΆν° λͺ¨λν°λ§μ μμνκΈ°κΉμ§ μκ°μ delay  
λͺ¨λν°λ§μ¬μ΄μ μκ° κ°κ²©μ timeoutμΌλ‘ νκΈ°νλ€.  
νλκ° μ€νλκ³  μ΄νλ¦¬μΌμ΄μμ΄ μ λλ‘ λμνκΈ°κΉμ§ μκ°μ΄ κ±Έλ¦¬λ―λ‘ μ΄κΈ° μ§μ° μκ°μ initialDlaySecond λ‘ μ μν  μ μλ€.  
Event νλλ νλμ μνλ₯Ό μκ°λλ³λ‘ νμΈν  μ μμΌλ©° μ΄ κ²½μ° λΌμ΄λΈλμ€ νλ‘λΈμ λ¬Έμ κ° μλ€λ μ¬μ€μ νμΈν  μ μλ€.  
 μ΄λ€μ λͺ¨λ yamlνμΌμ μ μν  μ μλ λ΄μ©λ€μ΄λ€.

<br/>

---

## β λ νλ¦¬μΉ΄μ

μΏ λ²λ€ν°μ€κ° μ²μ λμμ λλ νλλ₯Ό λ³΅μ νκ³  ν­μμ±μ μ μ§μν€κΈ° μν μλ¨μ ``λ νλ¦¬μΌμ΄μ μ»¨νΈλ‘€λ¬``κ° μ μΌνμ΅λλ€  

κ·Έλ¬λ λ νλ¦¬μΌμ΄μ μ»¨νΈλ‘€λ¬μ λͺλͺ λ¬Έμ μ κ³Ό κΈ°λ₯ κ°μ μ μν΄ λ νλ¦¬μΉ΄μμ΄λΌλ μ»¨νΈλ‘€λ¬κ° μΆκ°λμμ΅λλ€.  
μ΅κ·Όμλ λ νλ¦¬μΌμ΄μ μ»¨νΈλ‘€λ¬λ₯Ό μ¬μ©νμ§ μκ³  λλΆλΆ λ νλ¦¬μΉ΄μμ μ¬μ©νκΈ°μ  
μ΄λ² ν¬μ€νΈμμλ λ νλ¦¬μΌμ΄μ μ»¨νΈλ‘€λ¬μ λν΄μ λ€λ£¨μ§ μκ² μ΅λλ€. λ­ μ΄μ§νΌ λμ΄ κ±°μ λΉμ·ν©λλ€!

β

λ νλ¦¬μΌμ΄μ μ»¨νΈλ‘€λ¬μ λ νλ¦¬μΉ΄μμ λΉκ΅


- ``νλμ λ€μ€ λ μ΄λΈ μ§μ``

- ``νλμ μ€μ λ λ μ΄λΈμ ν€λ§ μ ν κ°λ₯``

λ νλ¦¬μΌμ΄μ μ»¨νΈλ‘€λ¬μμλ νλμ μ¬λ¬ λ μ΄λΈ μ€ νλμ λ μ΄λΈμ λν΄μλ§ λ μ΄λΈ μλ ν°λ‘ κ΄λ¦¬ νλλ₯Ό μ§μ ν  μ μμκ³    
λ°λμ λ μ΄λΈμ key=valueκ° λͺ¨λ μΌμΉν΄μΌλ§ νλλ₯Ό μ§μ ν  μ μμμ΅λλ€.   
κ·Έλ¬λ λ νλ¦¬μΉ΄μμ λ€μ€ λ μ΄λΈμ μ§μ ν  μ μκ³  keyλ§ κ°μ§κ³ λ λ μ΄λΈμ μ§μ ν  μ μμ΅λλ€.

<br/>
<br/>

### λ νλ¦¬μΉ΄μ μμ±

```cs
apiVersion: apps/v1 
kind: ReplicaSet 
metadata: 
name: replicaset-nasa 
spec: 
replicas: 3 
selector: 
    matchLabels: 
    app: nasa-nginx-pods-label 
template: 
    metadata: 
    name: nasa-nginx-pod 
    labels: 
        app: nasa-nginx-pods-label 
    spec: 
    containers: 
    - name: replicaset-nasa 
        image: nginx:latest 
        ports: 
        - containerPort: 80
```

λ νλ¦¬μΌμ΄μ μ»¨νΈλ‘€λ¬μμλ λ μ΄λΈ μλ ν° ν­λͺ©μ λ μ΄λΈμ μ§μ  μ§μ νμ§λ§   
λ νλ¦¬μΉ΄μμ ``matchLabels`` λ° ``matchExpressions`` νλλ‘ ``λ μ΄λΈμ μ ν``νλ€.  
λ νλ¦¬μΉ΄μμ λ μ΄λΈ μλ ν°λ kubectl explain replicaset.spec.selectorλ‘ μ§μ ν  μ μλ€.


podμ λ€λ₯΄κ² μΆκ°λ λ΄μ©λ§ μμ΅λλ€. replicasλ μμ±ν  podμ κ°μλ₯Ό μ€μ ν©λλ€.  
κ·Έλ¦¬κ³  λ νλ¦¬μΉ΄κ° ν¬λλ₯Ό μμ±ν  λ μ¬μ©ν  ννλ¦Ώμ μ μν©λλ€. 

<br/>
<br/>

μμ± ν RSνμΈ

```cs
[root@nasa-master nasa]# kubectl apply -f nasa-rs.yml 
replicaset.apps/replicaset-nasa created
```

<br/>
<br/>

λ νλ¦¬μΉ΄μ λμ νμΈ
    
```cs
[root@nasa-master nasa]# kubectl get replicasets.apps
NAME              DESIRED   CURRENT   READY   AGE
replicaset-nasa   3         3         3       3m9s
```


<br/>
<br/>

POD νμΈ

```cs
[root@nasa-master nasa]# kubectl get po
NAME                    READY   STATUS    RESTARTS   AGE
replicaset-nasa-7fvdx   1/1     Running   0          2m21s
replicaset-nasa-gbft4   1/1     Running   0          2m21s
replicaset-nasa-r84dt   1/1     Running   0          2m21s
```

λͺ¨λ μ μμ μ λμ νλ€!! νμ§λ§ RSμ κΈ°λ₯ μ€μ νλλ₯Ό λ μμ λ΄μλ€!

<br/>
<br/>

λ νλ¦¬μΉ΄μ ``λ μ΄λΈ μλ ν°`` μ¬μ©

* ``matchLabels`` λ μ΄λΈ μλ ν°

matLabels λ μ΄λΈ μλ ν°λ μ€λΈμ νΈ νμΌμμ λ€μκ³Ό κ°μ νμμΌλ‘ μ μνλ€.

```cs
...
spec:
selector:
    matchLabels:
    key: value
...
```

matchLabelsλ‘ λ μ΄λΈ μλ ν°λ₯Ό μ¬μ©νλ κ²½μ°  
λ νλ¦¬μΌμ΄μ μ»¨νΈλ‘€λ¬μ λ νλ¦¬μΉ΄μμ΄ λμΌνκ² λμνλ€.

<br/>
<br/>

matchExpressions λ μ΄λΈ μλ ν°

```cs
spec:
selector:
    matchExpressions:
    - key: <stirng>
    operator: <In | NotIn | Exists | DoesNotExist>
    values:
    - <string>
```
    
μμ λ§€μΉλ μ΄λΈκ³Ό λ€λ₯Έ μ μ ``key``μ ``values``λ₯Ό λ°λ‘ μ§μ νλ€λ μ μ΄λ€.  
operator νλλ keyμ value μ¬μ΄μ μ°μ°μ λ΄λΉνλ λΆλΆμΌλ‘ μλ λ€ κ°μ§ μ€ νλλ₯Ό μ νν΄μ λ§€μΉ­μν¬ μ μλ€.

```cs
In : λ μ΄λΈμ ν€μ κ°μ΄ μ§μ λ κ°μΌλ‘ μΌμΉν΄μΌ ν¨
NotIn: λ μ΄λΈμ ν€μ κ°μ΄ μ§μ λ κ°κ³Ό μΌμΉνμ§ μμμΌ ν¨
Exists: λ μ΄λΈμ ν€κ° ν¬ν¨λμ΄μΌ ν¨
DoesNotExists: λ μ΄λΈμ ν€κ° ν¬ν¨λμ§ μμμΌ ν¨
```

<br/>
<br/>

μ΄λ²μλ κ°μ labelμ κ°κ³ μλ replicasμ μλ₯Ό μ¦κ°μμΌλ³΄κ² μ΅λλ€.  
yaml νμΌμ replicasλ₯Ό 4λ‘ λ³κ²½νκ³  λ€μ μ€ννλ©΄ λ³κ²½λ κ²μ νμΈ ν  μ μμ΅λλ€. 


```cs
replicas: 4 
```

<br/>

```cs
[root@nasa-master nasa]# vim nasa-rs.yml 
[root@nasa-master nasa]# 
[root@nasa-master nasa]# kubectl apply -f nasa-rs.yml 
replicaset.apps/replicaset-nasa configured
```

<br/>

μ΄μ μλ ``created``λΌλ μΆλ ₯μ΄ λμλλ°  
μ΄λ²μλ ``configured``λΌλ μΆλ ₯μ΄ λμμ΅λλ€.


```cs
[root@nasa-master nasa]# kubectl get po
NAME                    READY   STATUS    RESTARTS   AGE
replicaset-nasa-bpmbg   1/1     Running   0          52s
replicaset-nasa-lkv4h   1/1     Running   0          32s
replicaset-nasa-s2tlp   1/1     Running   0          52s
replicaset-nasa-wxhq6   1/1     Running   0          52s
```
PODλ νμΈν΄λ³΄λ©΄ μ΄μ μ μμ±λμλ PODλ μ’λ£λμ§ μκ³   
μλ‘μ΄ PODλ§ μΆκ° μ€ν λ κ²μ νμΈ ν  μ μμ΅λλ€.

<br/>
<br/>

### λμ μλ¦¬  

λ νλ¦¬μΉ΄μμ μλμΌλ‘ λ³΅κ΅¬ν΄μ£Όκ³  μμ±μ νμΈνλ κ²μ λ³΄λ©΄ ``tracking`` νκ³  μλ κ² κ°μ΅λλ€.

μ΄λ¬ν κ²μ μ΄λ»κ² μ΄λ£¨μ΄ μ§λ κ²μΌκΉμ??

μ΄λ λ νλ¦¬μΉ΄μμ΄ λΌλ²¨μλ ν°λ‘ κ°μ λΌλ²¨μ κ°κ³  μλ ν¬λλ€μ κ³μ νμΈν©λλ€.  
μ€μ λ‘ λμΌν λΌλ²¨μ΄ μ€μ ν λΌνλ¦¬μΉ΄ κ°μλ§νΌ λ€μ λ³΅κ΅¬ν΄μ€λλ€.  
κ·Έλ¦¬κ³  λμΌν ν¬λμ κ°μκ° λ νλ¦¬μΉ΄μ μ€μ ν κ°μμ κ°λ€λ©΄ νΉλ³ν μμμ μ§ννμ§ μμ΅λλ€. 

κ²°λ‘ μ μΌλ‘ λ νλ¦¬μΉ΄μμ ν¬λμ κ°μλ₯Ό μΌμ ν κ°μλ₯Ό μ μ§νλ κΈ°λ₯μ ν©λλ€.

<br/>
<br/>

κ·Έλ¦¬κ³  μΆκ°λ‘ podμ metadata λ³κ²½λ κ°λ₯ν©λλ€. 

``edit`` μ΅μμ μ¬μ©ν΄ νΉμ  PODμ λΌλ²¨μ edit-testλ‘ λ°κΎΈμ΄ λ³΄μμ΅λλ€

```cs
[root@nasa-master nasa]# kubectl edit pod replicaset-nasa-bpmbg
pod/replicaset-nasa-bpmbg edited
[root@nasa-master nasa]# 
[root@nasa-master nasa]# kubectl get po
NAME                    READY   STATUS              RESTARTS   AGE
replicaset-nasa-72hgn   0/1     ContainerCreating   0          4s
replicaset-nasa-bpmbg   1/1     Running             0          6m5s
replicaset-nasa-lkv4h   1/1     Running             0          5m45s
replicaset-nasa-s2tlp   1/1     Running             0          6m5s
replicaset-nasa-wxhq6   1/1     Running             0          6m5s
[root@nasa-master nasa]#
[root@nasa-master nasa]#
[root@nasa-master nasa]#
[root@nasa-master nasa]# kubectl get po --show-labels
NAME                    READY   STATUS    RESTARTS   AGE     LABELS
replicaset-nasa-72hgn   1/1     Running   0          66s     app=nasa-nginx-pods-label
replicaset-nasa-bpmbg   1/1     Running   0          7m7s    app=edit-test
replicaset-nasa-lkv4h   1/1     Running   0          6m47s   app=nasa-nginx-pods-label
replicaset-nasa-s2tlp   1/1     Running   0          7m7s    app=nasa-nginx-pods-label
replicaset-nasa-wxhq6   1/1     Running   0          7m7s    app=nasa-nginx-pods-label
```

<br/>

---

## π λ°λͺ¬μ 

λ°λͺ¬μμ λͺ¨λ  λΈλκ° νλμ μ¬λ³Έμ μ€ννλλ‘ νλ μ­ν μ νλ€.  
μΏ λ²λ€ν°μ€ ν΄λ¬μ€ν°μμ λΈλκ° μΆκ°λλ©΄ νλλ μΆκ°λλ€.  
λΈλκ° ν΄λ¬μ€ν°μμ μ κ±°λλ©΄ ν΄λΉ νλλ κ°λΉμ§(garbage)λ‘ λμ΄κ°λ€.  
λ°λͺ¬μμ μ­μ νλ©΄ λ°λͺ¬μμ΄ μμ±ν νλλ€λ μ λ¦¬λλ€.  

λλͺ¬μμ μ νν μ©λλ λ€μκ³Ό κ°λ€.

β

- λͺ¨λ  λΈλμμ ν΄λ¬μ€ν° μ€ν λ¦¬μ§ λ°λͺ¬ μ€ν

- λͺ¨λ  λΈλμμ λ‘κ·Έ μμ§ λ°λͺ¬ μ€ν

- λͺ¨λ  λΈλμμ λΈλ λͺ¨λν°λ§ λ°λͺ¬ μ€ν

β

μ΄λ¬ν μμμ μ²λ¦¬λ₯Ό μν΄μ λͺ¨λ  λΈλ λ¨μλ‘ μ»€λ²νλ λ°λͺ¬μμ΄ μ¬μ©λλ€.

```cs
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: nasa-ds
spec:
  selector:
    matchLabels:
      app: nasa-ds
  template:
    metadata:
      labels:
        app: nasa-ds
    spec:
      nodeSelector:
        node: nasa  
      containers:
      - name: nasa
        image: nginx:latest
        ports:
          - containerPort: 80
```

* apiVersion apps/v1 β μΏ λ²λ€ν°μ€μ apps/v1 APIλ₯Ό μ¬μ© ν©λλ€.

* kind: DaemonSet β DaemonSetμ μμμΌλ‘ λͺμ ν©λλ€.

* metadata.name β DaemonSetμ μ΄λ¦μ μ€μ  ν©λλ€.

* metadata.namespace β λ€μμ€νμ΄μ€λ₯Ό μ§μ  ν©λλ€.

* metadata.labels β DaemonSetλ₯Ό μλ³ν  μ μλ λ μ΄λΈμ μ§μ  ν©λλ€.

* spec.selector.matchLabels β μ΄λ€ λ μ΄λΈμ νλλ₯Ό μ ννμ¬ κ΄λ¦¬ν  μ§ μ€μ  ν©λλ€.

* spec.template.metadata.labels.name β μμ±ν  νλμ λ μ΄λΈμ νλλͺ: " " μΌλ‘ μ§μ  ν©λλ€.

* spec.template.spec.containers β νμ μ΅μλ€μ μ»¨νμ΄λμ μ€μ μ μ μν©λλ€.



<br/>
<br/>

λ°λͺ¬ μ μμ±

```cs
[root@nasa-master nasa]# kubectl apply -f nasa-ds.yml 
daemonset.apps/nasa-ds created

[root@nasa-master nasa]# kubectl get ds
NAME      DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
nasa-ds   0         0         0       0            0           node=nasa       32s
```

μκ°μ΄ μΆ©λΆμ΄ μ§λ νμλ ``DESIRED, CURRENT, READY`` ν­μ κ°μ΄ λͺ¨λ 0μ΄λ€. νλκ° μμ μμ±λμ§ μλλ€.  
μ΄μ λ μ μν  λ λΈλ μλ ν°λ‘ node=nasa λ μ΄λΈμ μ ννλλ‘ νκΈ°μ λ§€μΉ­λλ λΈλκ° μμΌλ―λ‘ μλ¬΄ PODλ μμ±λμ§ μμ κ²μ΄λ€.

<br/>
<br/>

λ°λͺ¬ μ λμμ μν΄ λΈλλ₯Ό μ§μ ν΄λ³΄μ

```cs
[root@nasa-master nasa]# kubectl label nodes nasa-node1 node=nasa
node/nasa-node1 labeled
```

<br/>
<br/>

λ€μ νλ² λ°λͺ¬ μμ νμΈν΄λ³΄μ

```cs
[root@nasa-master nasa]# kubectl get nodes nasa-node1 --show-labels
NAME         STATUS   ROLES    AGE   VERSION   LABELS
nasa-node1   Ready    <none>   24d   v1.15.5   ... .... ,node=nasa
```
```cs
[root@nasa-master nasa]# kubectl get daemonsets.apps 
NAME      DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
nasa-ds   1         1         1       1            1           node=nasa       6m1s
```

<br/>
<br/>

λ°λͺ¬ μμ΄ λμν¨μ μν΄ PODκ° 1κ° μμ± λμλ€

```cs
[root@nasa-master nasa]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
nasa-ds-7jsgd           1/1     Running   0          106s
```

<br/>
<br/>

νμ€νΈλ₯Ό λͺ¨λ μλ£νμΌλ NODEμ DSλ₯Ό μ­μ νλ€!

```cs
[root@nasa-master nasa]# kubectl label nodes nasa-node1 node-
node/nasa-node1 labeled
```

<br/>

---


## π±βπ μ‘

JOB μ»¨νΈλ‘€λ¬λ νλμ(μ»¨νμ΄λ)μ μ΄νλ¦¬μΌμ΄μ(JOB) μ€νμ΄ μλ£λλ κ²μ μ΄μ μ λ§μΆ μ»¨νΈλ‘€λ¬μ΄λ€.  
μ¦, λμ΄ μ ν΄μ§ μμμ νλ μ΄νλ¦¬μΌμ΄μμ μ‘ μ»¨νΈλ‘€λ¬κ° κ΄λ¦¬νλ€.  
νλκ° μμμ λ§μΉκ³  μ±κ³΅μ μΌλ‘ μ’λ£λλ©΄ μ‘ μ»¨νΈλ‘€λ¬λ μ±κ³΅μ μΌλ‘ μλ£λ μ‘μ μΆμ νλ€.  
μ‘μ μ­μ νλ©΄ μ‘μ΄ μμ±ν νλλ μ λ¦¬λλ€.  
λ¬Όλ‘  νλκ° μ€κ°μ μ€ν¨νλ κ²½μ° μ‘ μ€λΈμ νΈλ μλ‘μ΄ νλλ₯Ό κ°λμν¨λ€.  
μ‘μ μμ μμ, λ°°μΉ μμμ μ μ©νκ² μ¬μ©λ  μ  μλ€.

βμ‘ μ»¨νΈλ‘€λ¬λ RC, RS, DSμ²λΌ κ³μ λμνλ λ°©μμ΄ μλλΌ  
μ¬μμ μ μ±(restartPolicy)μ κΈ°λ³Έκ°μ΄ Alwaysκ° μλ Onfailuerλ Neverλ‘ μ μΈν΄μΌ νλ€.  
μ΄λ κ² νλ©΄ μ‘ μ»¨νΈλ‘€λ¬μ νλλ μ¬μ€νλμ§ μλλ€.

* job.spec.template.spec.restartPolicy 

    - Always : μ’λ£/μ€ν¨μ ν­μ μ¬μμ(default)

    - Onfailure: μ€ν¨μ μ¬μμ (μ μ μ’λ£μ μ¬μμνμ§ μμ)

    - Never : μ’λ£ λλ μ€λ₯ λ°μμ μ¬μμνμ§ μμ

<br/>
<br/>

μ‘ μ»¨νΈλ‘€λ¬ μμ±

```cs
apiVersion: batch/v1
kind: Job
metadata:
name: nasa-job
spec:
template:
    metadata:
    labels:
        app: nasa-job
    spec:
    restartPolicy: OnFailure
    containers:
    - name: nasa
        image: busybox
        command: ["sleep", "60"]
```

<br/>

```cs
[root@nasa-master nasa]# kubectl apply -f nasa-jop.yml 
job.batch/nasa-job created
```

<br/>
<br/>

μ‘ μ»¨νΈλ‘€λ¬λ₯Ό νμΈν΄λ³΄μ

```cs
[root@nasa-master nasa]# kubectl get job.batch
NAME       COMPLETIONS   DURATION   AGE
nasa-job   0/1           33s        33s


[root@nasa-master nasa]# kubectl get pods
NAME             READY   STATUS    RESTARTS   AGE
nasa-job-84s8x   1/1     Running   0          40s
```

<br/>
<br/>

νλμ νλκ° μκ³  μμ§ μ‘μ΄ μλ£λμ§ μμμ COMPLETIONSμ 0/1μ΄λΌκ³  νκΈ°λλ€.  
νλλ μ μ λμμ€μ΄λ€.

```cs
[root@nasa-master nasa]# kubectl get job.batch
NAME       COMPLETIONS   DURATION   AGE
nasa-job   1/1           64s        104s
[root@nasa-master nasa]# 


[root@nasa-master nasa]# kubectl get pods
NAME             READY   STATUS      RESTARTS   AGE
nasa-job-84s8x   0/1     Completed   0          107s
```

μ μ νμ νλλ₯Ό λ€μ νμΈ ν΄λ³΄λ STATUSκ° Completedλ‘ νκΈ°λκ³   

μ‘ μ»¨νΈλ‘€λ¬μμλ νμΈν΄λ³΄λ COMPLETIONSκ° 1/1λ‘ λ°λμλ€.  
μ‘μ΄ μλ£λμμμ μ μ μλ€.

<br/>
<br/>

λ€μ€ μ‘ μ»¨νΈλ‘€λ¬

```cs
spec:
completions: 3
```
``completions: 3`` μ€μ λ§ YAML νμΌμ μΆκ°ν΄μ£Όλ©΄ μ¬λ¬ λ²μ μμμ κ°λ§ νΌ μμ°¨μ μΌλ‘ μ€ννλ€.  
νλμ νλκ° μμ±λμ΄ μ‘μ΄ μ€νλκ³  μλ£λλ©΄ λ λ²μ§Έ νλκ° μμ±λκ³  μλ£λκ³  ,  
κ·Έ λ€μ νλκ° μμ±λκ³  μλ£λκΈ°λ₯Ό μ§μ λ νμλ§νΌ λ°λ³΅νλ κ²μ΄λ€.


<br/>
<br/>

λ³λ ¬ λ€μ€ μ‘ μ»¨νΈλ‘€λ¬

```cs
spec:
completions: 3
parallelism: 3
```
λ³λ ¬λ‘ μ²λ¦¬νκΈ° μν΄μλ `` parallelism: 3`` μ€μ μ μΆκ°ν΄μ£Όλ©΄ λλ€  
κ·ΈλΌ 3κ°μ 3μ΄ λμμ 3λ²μ μμμ μ§ννλ€!!


<br/>

---

## πΆ ν¬λ‘ μ‘


μ‘ μ»¨νΈλ‘€λ¬μμ μ‘μ μ€ννλ λͺ©μ μ λμ΄ μλ μμμ νλ μ΄νλ¦¬μΌμ΄μ λλ¬Έμ΄λ€.  
 ν¬λ‘ μ‘μ μ΄λ¦μμ μ μ μλ―μ΄ μ£ΌκΈ°μ μΌλ‘ λ°λ³΅λ μμμ νλ©°,  
 κ·Έ μμμ΄ μμκ³Ό λμ΄ μλ μμμΌ λ μ¬μ©νλ€. ``λ¦¬λμ€μ crontabκ³Ό κ°λ€.``  

<br/>
<br/>

μ΄λ‘  λ³΄λ€λ μ€μ΅!! λ°λ‘ ν¬λ‘ μ‘μ μμ±ν΄λ³΄μ

```cs
apiVersion: batch/v1beta1
kind: CronJob
metadata:
name: hello World
spec:
schedule: "*/1 * * * *"
jobTemplate:
    spec:
    template:
        spec:
        containers:
        - name: hello World
            image: busybox
            args:
            - /bin/sh
            - -c
            - date; echo Hello NASA! from the Kubernetes cluster
        restartPolicy: OnFailure
```
    
<br/>

κ°μ₯ μ€μν λΆλΆμ μ€μΌμ€ νλλ‘, cronjob.spec.schedule νλλ₯Ό μ¬μ©ν΄ μ£ΌκΈ°μ μΈ μκ°μ κ΅¬μ±νλ€.  
μ€μΌμ€μ κ΅¬μ±νλ κ°μ λ€μ― κ°μ νλλ‘ κ΅¬λΆλμ΄ λ€μκ³Ό κ°μ μμμ΄λ€.

``κ·Έλ₯ λ¦¬λμ€λ λκ°λ€!``
    
- λΆ

 - μ

- μΌ

- μ

- μμΌ(0 : μΌμμΌ, 1: μμμΌ, 6: ν μμΌ)


```cs
[root@nasa-master nasa]# kubectl apply -f nasa-cron.yml 
cronjob.batch/hello created
```

<br/>
<br/>

μμ± ν ν¬λ‘  μ‘ μ»¨νΈλ‘€λ¬ λ° νλ νμΈ

```cs
[root@nasa-master nasa]# kubectl get cronjobs.batch
NAME    SCHEDULE      SUSPEND   ACTIVE   LAST SCHEDULE   AGE
hello   */1 * * * *   False     0        <none>          28s
```

<br/>
<br/>

μ΅μ΄ μμ±λ μ§ν ACTIVE μνμ μ‘μ μλ€.  λ§μ§λ§μΌλ‘ λμν LAST SCHEDULEλ μλ€.   
μ μ κΈ°λ€λ¦° νμ λ€μ μ‘°νν΄λ³΄λ©΄ λ€μκ³Ό κ°μ΄ λ³νλ€.

```cs
[root@nasa-master nasa]# kubectl get cronjobs.batch
NAME    SCHEDULE      SUSPEND   ACTIVE   LAST SCHEDULE   AGE
hello   */1 * * * *   False     1        10s             4m
```

<br/>
<br/>

νλλ₯Ό μ‘°νν΄λ³΄λ©΄ λ€μκ³Ό κ°λ€

```cs
[root@nasa-master nasa]# kubectl get po
\NAME                     READY   STATUS      RESTARTS   AGE
hello-1600331820-5jmd4   0/1     Completed   0          2m36s
hello-1600331880-jhs6s   0/1     Completed   0          96s
hello-1600331940-kkzwh   0/1     Completed   0          36s
```

<br/>

----

### ν¬λ‘ μ‘ μ»¨νΈλ‘€λ¬μ μ νμ¬ν­

ν¬λ‘ μ‘ μ»¨νΈλ‘€λ¬λ μΌμ  μ€νμκ°λ§λ€ νλμ μ‘ μ€λΈμ νΈλ₯Ό μμ±νλ€.  
νΉμ ν μν©μμλ νλκ° μλ μ¬λ¬ κ°μ μ‘μ΄ μμ±λλ κ²½μ°λ μλ€.  
μ΄λ¬ν μν©μ μ μ΄νκΈ° μν΄μ ν¬λ‘ μ‘ μ»¨νΈλ‘€λ¬μμλ μ‘μ μ νμ¬ν­μ μ§μ ν  μ μλ€.

β

* ``cronjob.spec.startingDeadlineSeconds`` : μμ λ°λλΌμΈ μκ°  
μ΄λ€ μ΄μ λ  μμ λ μκ°μ μ‘μ μμν΄μΌ νλ λ°λλΌμΈ.  
μ΄λ¨μλ‘ μλ ₯ν΄μ νμ¬λ‘λΆν° nμ΄ μμ μΌμ μ λμΉ μ‘μ΄ μλμ§ νμΈ.

β

* ``cronjob.spec.concurrrencyPolicy`` : λμ μ€ν μ μ±  

    - Allow: μ‘μ΄ λμ μ€νλ  μ μμ(default)

    - Forbid: λμ μ€ν κΈμ§. μ‘μ΄ μμ§ μλ£λμ§ μμ κ²½μ° λ€μ μ‘μ κ±΄λ λ.

    - Replace: νμ¬ μ€νμ€μΈ μ‘μ μ·¨μνκ³  μ μ‘μΌλ‘ κ΅μ²΄  
    
    μ μ€μ λ€μ μ½κ² μλ₯Ό λ€μ΄λ³΄μλ©΄  
    startingDeadlineSecondsκ° 100μ΄μ΄κ³ , concurrencyPolicyκ° Allowμ΄λ©΄  
    μ΄μ μ λμΉ μ‘μ΄ μμΌλ©΄ ν΄λΉ μ‘μ μ€ννκ² λλ€.

    ```cs
    spec:
    schedule: "*/1 * * * *"
    startingDeadlineSeconds: 10
    concurrencyPolicy: Forbid
    ```

---

```toc
```
