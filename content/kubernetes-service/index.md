---
emoji: π€¦ββοΈ
title: "[Kubernetes] - μΏ λ²λ€ν°μ€μ Service"
date: "2021-06-29 00:07:19"
author: nasa1515
tags: DevOps
categories: DevOps
---

  
λ¨Έλ¦¬λ§  

μ΄λ² ν¬μ€νΈμμλ μΏ λ²λ€ν°μ€μ λ€νΈμν¬ λ° λ΄λΆ μλΉμ€λ€μ λν΄μ μμλ³΄κ² μ΅λλ€.
 

---

## β Service


μ΄μ  ν¬μ€νΈλ€μμ μΏ λ²λ€ν°μ€ ν΄λ¬μ€ν°μμ μ»¨νΈλ‘€λ¬λ€μ μ΄μ©ν΄μ PODλ₯Ό μ μνμ΅λλ€.     

* POD νΉμ±μ μμ± λ° μ μ λ λ μ§μ λλ IPκ° λλ€νκ³  

* λν λ¦¬μ€ννΈ λλ§λ€ IPκ° λ³λλ©λλ€.  

μ λκ°μ μ΄μ λ‘ PODλ ``κ³ μ λ μλν¬μΈνΈ``λ‘ νΈμΆμ΄ μ΄λ ΅μ΅λλ€. λν μ¬λ¬ PODμ κ°μ μ νλ¦¬μΌμ΄μμ μ΄μ©ν  κ²½μ°  
μ΄ POD κ°μ λ‘λλ°Έλ°μ±μ μ§μν΄μ€μΌ νλλ° μ΄λ¬ν κΈ°λ₯λ€μ μννλκ² ``Service(μλΉμ€)`` μλλ€.  

κ°λ΅ν μλΉμ€λ€μ κΈ°λ₯μ μμ½ν΄λ³΄λ©΄ μλ 4κ°μ§ μ λμλλ€.

* μλΉμ€λ₯Ό μ¬μ©νκ² λλ©΄ κ³ μ λ μ£Όμλ₯Ό μ΄μ©ν΄μ μ κ·Όμ΄ κ°λ₯ν΄ μ§λλ€.  
* μλΉμ€λ₯Ό ν΅ν΄ ν΄λ¬μ€ν° μΈλΆμμ PODμ μ κ·Όνλκ²λ κ°λ₯ν©λλ€.  
* μ¬λ¬ PODλ₯Ό λ¬Άμ΄ λ‘λ λ°Έλ°μ±μ΄ κ°λ₯ν©λλ€.
* κ³ μ ν DNS μ΄λ¦μ κ°μ§ μ μμ΅λλ€.

<br/>
<br/>

μλΉμ€λ ``get service`` λͺλ Ήμ ν΅ν΄ λͺ©λ‘μ λ°μ μ¬ μ μμ΅λλ€

```cs
[root@nasa-master nasa]# kubectl get service
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   24d
```
λͺλ Ήμ μλ ₯νλ©΄ default λ€μμ€νμ΄μ€μ ν­μ μ‘΄μ¬νλ μλΉμ€κ° λ³΄μ΄λ€μ  
μ΄μ  μν€νμ³ ν¬μ€νΈμμλ μ€λͺνμ§λ§ Master Nodeμ APIλ‘ μ κ·ΌνκΈ° μν μλΉμ€μλλ€!!

<br/>
<br/>

### μλΉμ€ ννλ¦Ώ  
μλΉμ€λ λ€μκ³Ό κ°μ΄ κ΅¬μ±μ΄ κ°λ₯νλ©°, λΌλ²¨ μλ ν° (label selector)λ₯Ό μ΄μ©νμ¬ κ΄λ¦¬νκ³ μ νλ Pod λ€μ μ μν  μ μμ΅λλ€.

μλΉμ€ ννλ¦Ώ κΈ°λ³Έ κ΅¬μ‘°λ λ€μκ³Ό κ°μ΅λλ€.


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
    
λ€λ₯Έ λΆλΆμ μΌλ°μ μΈ ννμλλ€  
* ``spec.type`` : μλΉμ€ νμμ μ§μ ν μ μμ΅λλ€. spec.typeμ μ§μ νμ§ μμΌλ©΄ κΈ°λ³Έ νμμ ClusterIPμλλ€.  
* ``spec.clusterIP`` : μ¬μ©νλ €λ ν΄λ¬μ€ν°IPλ₯Ό μ§μ  μ§μ νλκ²λ κ°λ₯ν©λλ€.  
* ``spec.selector`` : μλΉμ€μ μ°κ²°ν  PODμ μ§μ λ λΌλ²¨μ μ§μ ν©λλ€.   
* ``spec.ports`` :  λ°°μ΄ ννμ κ°μλλ€.  
μλΉμ€κ° ν¬νΈλ₯Ό μΈλΆμ μ κ³΅ν λ νλκ° μλλΌ μ¬λ¬κ°λ₯Ό νκΊΌλ²μ μ κ³΅κ°λ₯νλ° spec.ports νμμ κ°μ λ£μ΄μ£Όλ©΄ λ©λλ€.

<br/>
<br/>

μ΄λ° ννμ λ©ν° ν¬νΈ μλΉμ€κ° κ°λ₯ν©λλ€  

μλ₯Ό λ€μ΄ μΉμλ²μ HTTPμ HTTPS ν¬νΈκ° λνμ μΈ μμΈλ°  
μλμ κ°μ΄ ports λΆλΆμ λκ°μ ν¬νΈ μ λ³΄λ₯Ό μ μν΄μ£Όλ©΄ λ©λλ€.

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

μμ ννλ¦ΏμΌλ‘ μμ±μ ν΄λ³΄λ©΄ μλμ κ°μ΄ λ©ν° ν¬νΈλ‘ μμ±μ΄ λ©λλ€

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

### μλν¬μΈνΈ  

μνΈν¬μΈνΈλ μλΉμ€μ ``λ μ΄λΈ μλ ν°``μ μν΄ μ°κ²°λ PODμ IP λͺ©λ‘μλλ€. ``kube get endpoints`` λͺλ Ήμ΄λ‘ νμΈ ν  μ μμ΅λλ€

```cs
[root@nasa-master nasa]# kubectl get endpoints
NAME            ENDPOINTS         AGE
kubernetes      10.146.0.6:6443   24d
nasa-node-svc   <none>            7m30s
```
λ°©κΈ λ§λ  μλΉμ€μ κ²½μ° μ°κ²°λμ΄μλ PODκ° μκΈ°μ ``none``μΌλ‘ μ μ λμ΄μλ€

<br/>
<br/>

``label``μ λ§μΆ°μ€ PODλ₯Ό νλ μμ±ν΄λ΄μλ€!

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

μ΄λ κ² ``label``μ μ°κ²°ν΄μ€ PODκ° μμ±λλ©΄ ``ENDPOINT``κ° μμ±λλ€!

```cs
[root@nasa-master nasa]# kubectl get endpoints
NAME            ENDPOINTS                       AGE
kubernetes      10.146.0.6:6443                 24d
nasa-node-svc   10.32.0.2:8082,10.32.0.2:8080   17m
```

<br/>
<br/>

νμ€νΈ PODλ₯Ό νλ λλ €μ ν΄λ¬μ€ν°λΌλ¦¬μ ν΅μ μ νμΈν΄λ΄μλ€!

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
ν΅μ μ΄ λλ¬΄ μ λλλ€!

<br/>

---

## π μλΉμ€ μΈμ μ΄νΌλν°?

μΈμ μ΄νΌλν°λ????  


μμ νμ€νΈμ²λΌ 1κ°μ PODκ° μλ RS,RC,DS μ²λΌ μ¬λ¬κ°μ PODκ° μμ±λλ©΄  
λΉμ°ν LBλ‘ PODλ₯Ό λ¬Άμ΄ μ¬λ¬κ°μ ENDPOINTλ₯Ό κ°μ§κ³  μκ² λ  κ²μ΄λ€  
κ·Έλ° κ²½μ° ν΄λΌμ΄μΈνΈμμ μμ²­μ λ³΄λ΄λ©΄ λ‘λλ°Έλ°μ±λμ΄ λ§€λ² λ€λ₯Έ νλλ‘ μ°κ²°λλ€.  
κ·Έλ¬λ λ§μ½ νΉμ  ν΄λΌμ΄μΈνΈμμ μμ²­μ΄ λ€μ΄μ€λ©΄ λ§€λ² νΉμ  νλλ‘ μ°κ²°νκ³  μΆμ κ²½μ° μ¬μ©νλ κ²μ΄ μΈμ μ΄νΌλν°μλλ€  
    
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

μΈμ μ΄νΌλν° κ΅¬μ±μ Noneκ³Ό ClientIPκ° μμΌλ©° λν΄νΈλ Noneμ΄λ€.  
ClientIPλ₯Ό μ€μ νλ©΄ μΏ λ²λ€ν°μ€ ν΄λ¬μ€ν°μ νλ‘μ(kube-proxy)λ ν΄λΌμ΄μΈνΈμ IPλ₯Ό λ³΄κ³  λ§€λ² κ°μ νλλ‘ μ°κ²°ν΄μ€λλ€

``sessionAffinity`` λ‘ μ μ ν  μ μλ€

* none : (κΈ°λ³Έ) μΈμ μ΄νΌλν° μμ
* ClientIP : ν΄λΌμ΄μΈνΈμ IPλ₯Ό νμΈν΄ κ°μ νλλ‘ μ°κ²°λ¨ 

<br/>
<br/>

## π±βπ Service Type
μλΉμ€λ IP μ£Όμ ν λΉ λ°©μκ³Ό μ°λ μλΉμ€λ±μ λ°λΌ ν¬κ² 4κ°μ§λ‘ κ΅¬λ³ν  μ μλ€.


* ``Cluster IP``  
λν΄νΈ μ€μ μΌλ‘, μλΉμ€μ ν΄λ¬μ€ν° IP (λ΄λΆ IP)λ₯Ό ν λΉνλ€. μΏ λ²λ€ν°μ€ ν΄λ¬μ€ν° λ΄μμλ μ΄ μλΉμ€μ μ κ·Όμ΄ κ°λ₯νμ§λ§  
ν΄λ¬μ€ν° μΈλΆμμλ μΈλΆ IP λ₯Ό ν λΉ λ°μ§ λͺ»νκΈ° λλ¬Έμ, μ κ·Όμ΄ λΆκ°λ₯νλ€.

<br/>

* ``Load Balancer``  
λ³΄ν΅ ν΄λΌμ°λ λ²€λμμ μ κ³΅νλ μ€μ  λ°©μμΌλ‘ μΈλΆ IP λ₯Ό κ°μ§κ³  μλ λ‘λλ°Έλ°μλ₯Ό ν λΉνλ€  
μΈλΆ IPλ₯Ό κ°μ§κ³  μκΈ°  λλ¬Έμ, ν΄λ¬μ€ν° μΈλΆμμ μ κ·Όμ΄ κ°λ₯νλ€.

<br/>

* ``Node IP``  
ν΄λ¬μ€ν° IPλ‘λ§ μ κ·Όμ΄ κ°λ₯νκ²μ΄ μλλΌ λͺ¨λ  λΈλμ IPμ ν¬νΈλ₯Ό ν΅ν΄μλ μ κ·Όμ΄ κ°λ₯νκ² λλ€.  
μλ₯Ό λ€μ΄ μλμ κ°μ΄ ``hello-node-svc`` λΌλ μλΉμ€λ₯Ό NodePort νμμΌλ‘ μ μΈμ νκ³   
nodePortλ₯Ό 30036μΌλ‘ μ€μ νλ©΄ μλ μ€μ μ λ°λΌ ν΄λ¬μ€ν° IPμ 80ν¬νΈλ‘λ μ κ·Όμ΄ κ°λ₯νμ§λ§  
λͺ¨λ  λΈλμ 30036 ν¬νΈλ‘λ μλΉμ€λ₯Ό μ κ·Όν  μ μλ€. 

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

κ·Έλ¦Όμ λ‘μ§μ λ³΄λ©΄ μ΄ν΄κ° μ¬μΈ κ²μ΄λ€.  

![μ€ν¬λ¦°μ·, 2020-09-18 13-43-43](https://user-images.githubusercontent.com/69498804/93557027-fbabef00-f9b4-11ea-80b6-c03f9a26892f.png)


<br/>
<br/>


### External name 
ExternalNameμ μΈλΆ μλΉμ€λ₯Ό μΏ λ²λ€ν°μ€ λ΄λΆμμ νΈμΆνκ³ μν λ μ¬μ©ν  μ μλ€.   
ν΄λ¬μ€ν°λ΄μ Podλ€μ ν΄λ¬μ€ν° IPλ₯Ό κ°μ§κ³  μκΈ° λλ¬Έμ IP λμ­ λ°μ μλΉμ€λ₯Ό νΈμΆνλ €λ©΄ NAT μ€μ λ± λ³΅μ‘ν μ€μ μ΄ νμνλ€.  
νΉν ν΄λΌμ°λ νκ²½μ μ¬μ©ν  κ²½μ° λ°μ΄ν λ² μ΄μ€ λλ ν΄λΌμ°λμμ μ κ³΅λλ λ§€μ§λλ μλΉμ€ (RDS, CloudSQL)λ±μ μ¬μ© ν  κ²½μ°  
μΏ λ²λ€ν°μ€ ν΄λ¬μ€ν° λ°μ΄κΈ° λλ¬Έμ, νΈμΆμ΄ μ΄λ €μ΄ κ²½μ°κ° μλλ° μ΄λ₯Ό μ½κ² ν΄κ²°ν  μ μλ λ°©λ²μ΄ ``ExternalName`` νμμ΄λ€.

μλμ κ°μ΄ μλΉμ€λ₯Ό ExternalName νμμΌλ‘ μ€μ νκ³   
μ£Όμλ₯Ό DNSλ‘  my.database.example.comμΌλ‘ μ€μ ν΄μ£Όλ©΄  
μ΄ my-serviceλ λ€μ΄μ€λ λͺ¨λ  μμ²­μ my.database.example.com μΌλ‘ ν¬μλ© ν΄μ€λ€.  
(μΌμ’μ νλ‘μμ κ°μ μ­ν ) 

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

λ€μκ³Ό κ°μ κ΅¬μ‘°λ‘ μλΉμ€κ° λ°°ν¬λλ€.  


![μ€ν¬λ¦°μ·, 2020-09-18 14-06-37](https://user-images.githubusercontent.com/69498804/93558324-2e0b1b80-f9b8-11ea-876a-231e2d4e533c.png)


<br/>
<br/>

DNSκ° μλ μ§μ  IPλ₯Ό μ΄μ©νλ λ°©μ 

μμ κ²½μ° DNSλ₯Ό μ΄μ©νμλλ°, DNSκ° μλλΌ μ§μ  IP μ£Όμλ₯Ό μ΄μ©νλ λ°©λ²λ μλ€.

<br/>
<br/>

μλΉμ€ ClusterIP μλΉμ€λ‘ μμ±μ ν ν μλΉμ€ λ€μλ§ μ μνκ³  μλΉμ€μ μν΄μλ Podλ₯Ό μ§μ νμ§ μλλ€.

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


λ€μμΌλ‘, μλμ κ°μ΄ μλΉμ€μ EndPointλ₯Ό λ³λλ‘ μ§μ ν΄μ£Όλ©΄ λλ€.

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


μ΄ λ ``μλΉμ€λͺ``κ³Ό μλΉμ€ ``EndPointsμ μ΄λ¦``μ΄ λμΌν΄μΌ νλ€.  
μμ κ²½μ°μλ ``nasa-svc-ext``λ‘ κ°μ μλΉμ€λͺμ μ¬μ©νμκ³  μ΄ μλΉμ€λ 35.225.75.124:80 μλΉμ€λ₯Ό κ°λ₯΄ν€λλ‘ λμ΄ μλ€.

<br/>

---

### ν€λλ¦¬μ€ μλΉμ€

Headless Service

μλΉμ€λ μ κ·Όμ μν΄μ Cluster IP λλ External IP λ₯Ό μ§μ λ°λλ€.

μ¦ μλΉμ€λ₯Ό ν΅ν΄μ μ κ³΅λλ κΈ°λ₯λ€μ λν μλν¬μΈνΈλ₯Ό μΏ λ²λ€ν°μ€ μλΉμ€λ₯Ό ν΅ν΄μ ν΅μ νλ κ°λμΈλ°  
MSA μμλ κΈ°λ₯ μ»΄ν¬λνΈμ λν μλν¬μΈνΈ (IP μ£Όμ)λ₯Ό μ°Ύλ κΈ°λ₯μ μλΉμ€ λμ€μ»€λ²λ¦¬ (Service Discovery) λΌκ³  νκ³   
μλΉμ€μ μμΉλ₯Ό λ±λ‘ν΄λλ μλΉμ€ λμ€μ»€λ²λ¦¬ μλ£¨μμ μ κ³΅νλ€.  
``Etcd`` λ ``hashcorp``μ consul (https://www.consul.io/)κ³Ό κ°μ μλ£¨μ  
μ΄ κ²½μ° μΏ λ²λ€ν°μ€ μλΉμ€λ₯Ό ν΅ν΄μ λ§μ΄ν¬λ‘ μλΉμ€ μ»΄ν¬λνΈλ₯Ό κ΄λ¦¬νλ κ²μ΄ μλλΌ  
μλΉμ€ λμ€μ»€λ²λ¦¬ μλ£¨μμ μ΄μ©νκΈ° λλ¬Έμ μλΉμ€μ λν IP μ£Όμκ° νμμλ€.

μ΄λ° μλλ¦¬μ€λ₯Ό μ§μνκΈ° μν μΏ λ²λ€ν°μ€μ μλΉμ€λ₯Ό ν€λλ¦¬μ€λΌκ³  νλλ°  
μ΄λ¬ν ν€λλ¦¬μ€ μλΉμ€λ Cluster IP λ±μ μ£Όμλ₯Ό κ°μ§μ§ μλλ€.  
λ¨ DNSμ΄λ¦μ κ°μ§κ² λλλ° μ΄ DNS μ΄λ¦μ lookup ν΄λ³΄λ©΄ μλΉμ€ (λ‘λλ°Έλ°μ)μ IP λ₯Ό λ¦¬ν΄νμ§ μκ³   
μ΄ μλΉμ€μ μ°κ²°λ Pod λ€μ IP μ£Όμλ€μ λ¦¬ν΄νκ² λλ€.

<br/>
<br/>

κ°λ¨νκ² νμ€νΈλ₯Ό ν΄λ³΄μ

RSλ‘ μ¬λ¬κ°μ PODλ₯Ό μ μν΄λμ μνμ΄λ€!

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

μ¬κΈ°μ λ€μκ³Ό κ°μ ν€λλ¦¬μ€ μλΉμ€λ₯Ό νλ κ°λμμΌλ³΄μ

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
PODλ€μ λ μ΄λΈμ λ¬Άμ΄μ€ λ€ μλΉμ€λ₯Ό μ μνκ²λλ©΄

<br/>
<br/>

μλμ κ°μ΄ ClusterIPκ° ν λΉλμ§ μλ κ²μ νμΈ ν  μ μλ€.

```cs
[root@nasa-master nasa]# kubectl get svc
NAME                     TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes               ClusterIP   10.96.0.1    <none>        443/TCP   31m
nasa-node-svc-headless   ClusterIP   None         <none>        80/TCP    6m12s
```

<br/>
<br/>

κ·Έλ¬λ λ€λ₯Έ PODλ₯Ό μμ±ν΄μ ``NSLOOKUP``μ λ λ € DNSλ₯Ό μ‘°νν΄λ³΄λ©΄

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
μκ³Ό κ°μ΄ μλΉμ€μ μν΄ μ κ³΅λλ pod λ€μ IP μ£Όμ λͺ©λ‘μ΄ λμ€λ κ²μ νμΈν  μ μλ€.

<br/>

---

### λ‘λλ°Έλ°μ 

* Loabbalancer  

νμ¬ ν΄λ¬μ€ν° νκ²½μ GCPμ μΈμ€ν΄μ€μ KUBEADMμΌλ‘ κ΅¬μ±ν μνμ΄λ€  
νμ¬ νκ²½μμ GCPμ μΈλΆ IPλ‘ LBλ₯Ό μ΄μ©ν΄ URLμ λ°μμ λ³΄μ!  
μΈλΆ IPλ₯Ό κ°μ§κ³  μκΈ°  λλ¬Έμ, ν΄λ¬μ€ν° μΈλΆμμ μ κ·Όμ΄ κ°λ₯νλ€. λ°©νλ²½ λ¬Έμ λ§ μλ€λ©΄....;;;


<br/>
<br/>

μ°μ  λ€μκ³Ό κ°μ RSλ₯Ό νλ μ μνλ€  

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

κ·Έλ¦¬κ³  μλμ κ°μ LB μλΉμ€λ₯Ό νλ μ μνλ€!!

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

``externalIPs``μ κ²½μ° GCP μΈμ€ν΄μ€μμ κ³ μ μΌλ‘ ν λΉν IPμλλ€
![μ€ν¬λ¦°μ·, 2020-09-18 16-01-07](https://user-images.githubusercontent.com/69498804/93566536-2c495400-f9c8-11ea-98d6-3ffefa470af0.png)

<br/>
<br/>


μμ μ μλ ννλ¦Ώλ€μ μμ±νλ©΄ μλμ κ°μ΄ μ μμ μΌλ‘ μμ±λ©λλ€!!

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
POS μ μκΈ°λ, μλΉμ€ μ μκΈ°λ, EndPointμ μ μμ μΌλ‘ Podκ° λκΈ°ν λ¨μ νμΈ


<br/>
<br/>

μ κ·ΈλΌ μ΄μ  μλΉμ€λ₯Ό μν μ μλ λͺ¨λ λλ¬μ΅λλ€!!


νμ€νΈλ₯Ό νκΈ°μ  GCP λ°©νλ²½μμ HTTPμ λν PORTλ₯Ό νμ©ν΄μ€λλ€!

![μ€ν¬λ¦°μ·, 2020-09-18 16-04-43](https://user-images.githubusercontent.com/69498804/93566868-ac6fb980-f9c8-11ea-87b7-828996360064.png)

<br/>
<br/>


λͺ¨λ νμΈμ΄ μλ£ λμμΌλ©΄ μΈλΆ ubuntu osμμ curlλ‘ μμ²­ν΄λ΄μλ€!

```cs
curl 34.84.172.31:30850
```

<br/>

LB SVCμμ μΈλΆ PORTκ° 30850μΌλ‘ μ€μ λμ΄μμ΄ ν΄λΉ ν¬νΈλ‘ μμ²­ν΄μΌν©λλ€!!

![μ€ν¬λ¦°μ·, 2020-09-18 16-06-31](https://user-images.githubusercontent.com/69498804/93567090-15573180-f9c9-11ea-9163-e5023b1dc46f.png)

μ μμ μΌλ‘ LB SVCμ μΈλΆIPλ‘ URLμ λ°μμ€λ€μ!! μ±κ³΅!!

---

```toc
```