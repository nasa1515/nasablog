---
emoji: π€¦ββοΈ
title: "[Kubernetes] - μΏ λ²λ€ν°μ€μ λͺλ Ήμ΄ μ λ¦¬"
date: "2021-06-29 00:07:15"
author: nasa1515
tags: DevOps
categories: DevOps
---


λ¨Έλ¦¬λ§  

μ΄μ  μ€μ΅μ  μμμΌ ν  μ΄λ‘ μ μΈ λΆλΆλ€μ λͺ¨λ ν¬μ€ν νμ΅λλ€.  
μ΄λ² ν¬μ€νΈ λΆν° μ΄ν ν¬μ€νΈκΉμ§λ μ€μ΅μ λν λ΄μ©λ€μ λ€λ£° κ²μλλ€.    

---

## β kubectl λͺλ Ήμ΄ 


μΏ λ²λ€ν°μ€λ ``kubectl`` μ΄λΌλ CLI λͺλ Ήμ΄λ₯Ό ν΅ν΄μ μΏ λ²λ€ν°μ€ λ° ν΄λ¬μ€ν° κ΄λ¦¬, λλ²κ·Έ λ° νΈλ¬λΈ μνλ€μ ν  μ μμ΅λλ€.  
μμΈν λ΄μ©μ μκ³  μΆμΌλ©΄ [kubectl μΉνΈ μνΈ](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)λ₯Ό μ°Έκ³ νμΈμ

<br/>

``kubectl λͺλ Ήμ΄``λ κΈ°λ³Έμ μΌλ‘ μλμ κ°μ ννλ‘ μ»€λ§¨λ λΌμΈμ μλ ₯νμ¬ μ¬μ©ν  μ μμ΅λλ€.

```cs
$ kubectl [command] [type] [name] [flags]
```

* ``command`` : μμμ μ€ννλ €λ λμ
    * create : μμ±
    * ge` : μ λ³΄ κ°μ Έμ€κΈ°
    * describe : μμΈν μν μ λ³΄
    * delete : μ­μ   

* ``type`` : μμ νμ
    * pod : Pod
    * service : μλΉμ€


* ``name`` : μμ μ΄λ¦


* ``flag`` : μ΅μ

<br/>

---

### λͺλ Ήμ΄ μ€μ΅ μ  μ¬μ  μμ

μλ§ μ²μ kubectlμ μ¬μ©νκ² λλ€λ©΄ μλμ κ°μ μλ¬ λ©μΈμ§λ₯Ό λμΈ κ²μλλ€.

```cs
[root@nasa-master ~]# kubectl get pod
The connection to the server 10.146.0.6:6443 was refused - did you specify the right host or port?
```

<br/>
<br/>


μμ κ°μ κ²½μ°λ νμ¬ μ€ν κΆνμ΄ μλ κ²½μ°λ‘ μλμ λͺλ Ήμ΄λ₯Ό μ§ννλ©΄ μλ κ°λ₯ν©λλ€.

```cs
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

<br/>
<br/>

μΌλ° μ¬μ©μ κΆνμ μΆκ°

```cs
export KUBECONFIG=/etc/kubernetes/admin.conf
```
rootκΆνμμ νκ²½λ³μ λ±λ‘

<br/>
<br/>

kubelet μ¬μμ

```cs    
[root@nasa-master ~]# systemctl restart kubelet
[root@nasa-master ~]# 
```

<br/>
<br/>

μ΄μ  μ μμ μΌλ‘ λͺλ Ήμ΄ μ¬μ©μ΄ κ°λ₯ν©λλ€!!!

```cs
[root@nasa-master ~]# kubectl get node
NAME          STATUS   ROLES    AGE   VERSION
nasa-master   Ready    master   23d   v1.15.5
nasa-node1    Ready    <none>   23d   v1.15.5
nasa-node2    Ready    <none>   23d   v1.15.5
nasa-node3    Ready    <none>   23d   v1.15.5
```

<br/>

---

### kubectl κΈ°λ³Έ μ¬μ©λ²

κ°λ¨ν μμ½ μλ²(=ν΄λΌμ΄μΈνΈκ° μ μ‘ν΄μ£Όλ λ°μ΄ν°λ₯Ό κ·Έλλ‘ λλλ € μ μ‘νλ μλ²)λ₯Ό λμμμΌλ³΄μ£ 

λ¨Όμ  μλ λͺλ Ήμ΄λ₯Ό ν΅ν΄μ nasaehcoλΌλ podλ₯Ό νλ μμ±νκ² μ΅λλ€.

```cs
$ kubectl run nasaecho --generator=run-pod/v1 --image="k8s.gcr.io/echoserver:1.10" --port=8080
```

<br/>

```cs
[root@nasa-master ~]# kubectl run nasaecho --generator=run-pod/v1 --image="k8s.gcr.io/echoserve
r:1.10" --port=8080
pod/nasaecho created
[root@nasa-master ~]# 
```

<br/>
<br/>

κ°λ¨ν μ€λͺνλ©΄ ``run λͺλ Ήμ΄``λ ν΄λ¬μ€ν°μ νΉμ  μ΄λ―Έμ§λ₯Ό κ°μ§κ³  ``podλ₯Ό μμ±``νλ λͺλ Ήμ΄ μλλ€.

```cs
$ kubectl run [μμ±ν  POD μ΄λ¦] --generator=[Repolication Controller μ§μ ] --image=[μ¬μ©ν  μ΄λ―Έμ§] --port=[ν¬νΈμ λ³΄]
```
k8s.gcr.ioλ κ΅¬κΈμ Container Registryμμ κ°μ Έμ€κ² λ€λ μλ―Έμλλ€. βgenerator : Replication Controllerλ₯Ό μ§μ ν©λλ€.

<br/>

μλ λͺλ Ήμ΄λ₯Ό μλ ₯νλ©΄ pod λ€μ μ λ³΄λ₯Ό λ³Ό μ μμ΅λλ€.

```cs
$ kubectl get pods
```

<br/>


```cs
[root@nasa-master ~]# kubectl get pod
NAME       READY   STATUS    RESTARTS   AGE
nasaecho   1/1     Running   0          4m12s
[root@nasa-master ~]# 
```

<br/>

κ°κ°μ μλ―Έλ

* ``NAME`` : Pod μ΄λ¦
* ``READY`` : 0/1(μμ±λμμ§λ§ μ¬μ© μ€λΉ X) / 1/1(μμ±λμμ§λ§ μ¬μ© μ€λΉ O)
* ``STATUS`` : Running (μ€ν) / Terminating / ContainerCreating
* ``RESTARTS`` : μ¬μμ νμ
* ``AGE`` : μμ± ν μ§λ μκ°

<br/>
<br/>

μ΄μ  λͺλ Ήμ΄λ₯Ό ν΅ν΄μ λ§λ€μ΄μ§ nasaecho podμ ``μλΉμ€``λ₯Ό μμ±νλλ‘ νκ² μ΅λλ€.

```cs
$ kubectl expose pod nasaecho --type=NodePort
```

<br/>

```cs
[root@nasa-master ~]# kubectl expose pod nasaecho --type=NodePort
service/nasaecho exposed
```

<br/>
<br/>

μλ λͺλ Ήμ΄λ‘ νμ¬ λ§λ€μ΄μ§ μλΉμ€ μ λ³΄λ€μ νμΈν  μ μμ΅λλ€.

```cs
$ kubectl get services
```

<br/>

```cs
[root@nasa-master ~]# kubectl get service
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes   ClusterIP   10.96.0.1        <none>        443/TCP          23d
nasaecho     NodePort    10.109.171.229   <none>        8080:30880/TCP   5m3s
```

<br/>

κ°κ°μ μλ―Έλ

* ``NAME`` : μλΉμ€ μ΄λ¦
* ``TYPE`` : μλΉμ€ νμ
* ``Cluster IP`` : μλΉμ€μ ν΄λ¬μ€ν° IP (λ΄λΆ IP)λ₯Ό ν λΉν©λλ€.
* ``Load Balancer`` : μΈλΆ IPλ₯Ό κ°μ§ λ‘λλ°Έλ°μλ₯Ό ν λΉν©λλ€.
* ``Node Port`` : ν΄λ¬μ€ν° IP λΏλ§ μλλΌ λΈλμ IP λ° ν¬νΈλ₯Ό ν΅ν΄μ μ κ·Όμ ν  μ μμ΅λλ€.
* ``External Name`` : μΈλΆ μλΉμ€λ₯Ό μΏ λ²λ€ν°μ€ λ΄λΆμμ νΈμΆνκ³ μ ν  λ μ¬μ©ν  μ μμ΅λλ€.
* ``CLUSTER-IP`` : ν΄λ¬μ€ν° μμμ μ¬μ©νλ IP
* ``EXTERNAL-IP`` : μΈλΆ IP
* ``PORT(S)`` : μλΉμ€μ μ μνλ ν¬νΈ
* ``AGE`` : μμ± ν μ§λ μκ°


<br/>


λ‘μ»¬μλ²μ 8080 ν¬νΈλ₯Ό μμ½ μλ²μ 8080ν¬νΈλ‘ ``ν¬νΈ ν¬μλ©`` ν΄μ£ΌκΈ° μν λͺλ Ήμ΄

```cs
$ kubectl port-forward svc/nasaecho 8080:8080
```

<br/>

```cs
[root@nasa-master ~]# kubectl port-forward svc/nasaecho 8080:8080
Forwarding from 127.0.0.1:8080 -> 8080
Forwarding from [::1]:8080 -> 8080
```

<br/>

curl http://localhost:8080 μΌλ‘ λ°μ΄ν°λ₯Ό λ‘κ²¨μ€λ©΄ μ μμ μ΄λ€!

![μ€ν¬λ¦°μ·, 2020-09-16 13-59-00](https://user-images.githubusercontent.com/69498804/93294177-ca041e00-f824-11ea-91e7-02ca68d9225a.png)

<br/>
<br/>

μμ½ μλ²μ μ€ν μ€ λ‘κ·Έλ₯Ό μμ§νλ €λ©΄ μλ λͺλ Ήμ΄λ₯Ό μλ ₯νλ©΄ νμΈν  μ μμ΅λλ€.

```cs
$ kubectl logs -f echoserver
```

<br/>

```cs
[root@nasa-master ~]# kubectl logs -f nasaecho
Generating self-signed cert
Generating a 2048 bit RSA private key
.......+++
..+++
writing new private key to '/certs/privateKey.key'
-----
Starting nginx
127.0.0.1 - - [16/Sep/2020:04:57:55 +0000] "GET / HTTP/1.1" 200 414 "-" "curl/7.29.0"
127.0.0.1 - - [16/Sep/2020:04:58:27 +0000] "GET / HTTP/1.1" 200 414 "-" "curl/7.29.0"
127.0.0.1 - - [16/Sep/2020:04:58:40 +0000] "GET / HTTP/1.1" 200 414 "-" "curl/7.29.0"
```

<br/>
<br/>

λ§λ€μ΄μ§ nasaecho podλ₯Ό μ§μλ³΄λλ‘ νκ² μ΅λλ€.

```cs
$ kubectl delete pod echoserver
```

<br/>

```cs
[root@nasa-master ~]# kubectl delete pod nasaecho
pod "nasaecho" deleted
[root@nasa-master ~]# kubectl get pod
No resources found.
```
μ μμ μΌλ‘ μ­μ  λμκ³  ``get``λͺλ ΉμΌλ‘ νμΈκ²°κ³Ό podκ° μμ΄μ‘μ΅λλ€!!

<br/>
<br/>

podκ° μ­μ λμμΌλ μ΄λ²μλ μλΉμ€ λν μ­μ ν΄λ³΄κ² μ΅λλ€

```cs
[root@nasa-master ~]# kubectl delete svc nasaecho
service "nasaecho" deleted
[root@nasa-master ~]# 
[root@nasa-master ~]# kubectl get svc
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   23d
```

μ΄μ κ°μ΄ κ°λ¨ν μ€μ΅μΌλ‘ κ°λ¨ν μ¬μ©λ²μ λν΄μ μμλ³΄μμ΅λλ€.

<br/>

---

### μΉνΈμνΈ λ΄μ© μ λ¦¬

## β λͺλ Ήμ΄[COMMAND] μ’λ₯

kubectlμ λͺλ Ήμ΄ μ’λ₯μ λ¬Έλ²μ κ°λ΅ν μ€λͺν©λλ€.


|λͺλ Ήμ΄ |  λ¬Έλ² |μ€λͺ |
|-----|-------|-----|
|annotate|	kubectl annotate (-f FILENAME \| TYPE NAME \| TYPE/NAME) KEY_1=VAL_1 ... KEY_N=VAL_N [--overwrite] [--all] [--resource-version=version] [flags]|νλ νΉμ μ¬λ¬ λ¦¬μμ€μ μ£Όμμ μΆκ°μλ°μ΄νΈ|
|api-versions|	kubectl api-versions [flags]|μ¬μ©κ°λ₯ν API version μ‘°ν
|apply	|kubectl apply -f FILENAME [flags]|	λ³κ²½λ λ¦¬μμ€ μμ  μ μ©νκΈ°
|attach|	kubectl attach POD -c CONTAINER [-i] [-t] [flags]|	νμ¬ μ€νμ€μΈ μ»¨νμ΄λμ μ μ νΉμ output stream νμΈ
|autoscale	|kubectl autoscale (-f FILENAME \| TYPE NAME \| TYPE/NAME) [--min=MINPODS] --max=MAXPODS [--cpu-percent=CPU] [flags]|	RC(replication controller)μ νμ©νμ¬ pod auto scale κΈ°λ₯νμ±ν
|cluster-info	|kubectl cluster-info [flags]|	μΏ λ²λ€ν°μ€ ν΄λ¬μ€ν°μ μ λ³΄μ‘°ν
|config	|kubectl config SUBCOMMAND [flags]|	kubeconfig νμΌ μμ 
|create	|kubectl create -f FILENAME [flags]	|λ¦¬μμ€ file μμ±
|delete	|kubectl delete (-f FILENAME \| TYPE [NAME \| /NAME \| -l label \| --all]) [flags]	|μμ±(νμ±νλ) λ¦¬μμ€ μ κ±°
|describe	|kubectl describe (-f FILENAME \| TYPE [NAME_PREFIX \| /NAME \| -l label]) [flags]|	λ¦¬μμ€ μν μ‘°ν
|edit	|kubectl edit (-f FILENAME \| TYPE NAME \| TYPE/NAME) [flags]	|λ¦¬μμ€μ λν΄ μμ  λ° μ μ©
|exec	|kubectl exec POD [-c CONTAINER] [-i] [-t] [flags] [-- COMMAND [args...]]	|pod λ΄λΆμ μ»¨νμ΄λμ λͺλ Ήμ΄ λ λ¦¬κΈ°
|explain	|kubectl explain [--include-extended-apis=true] [--recursive=false] [flags]	|λ¦¬μμ€(pod, node, service) μ λν documentation νμΈ
|expose	|kubectl expose (-f FILENAME \| TYPE NAME \| TYPE/NAME) [--port=port] [--protocol=TCP\|UDP] [--target-port=number-or-name] [--name=name] [----external-ip=external-ip-of-service][--type=type] [flags]	|rc, service, pod μ‘°ν(?)
|get	|kubectl get (-f FILENAME \| TYPE [NAME \| /NAME \| -l label]) [--watch] [--sort-by=FIELD] [[-o \| --output]=OUTPUT_FORMAT] [flags]	|λ¦¬μμ€ λ¦¬μ€νΈ μ‘°ν
|label	|kubectl label (-f FILENAME \| TYPE NAME \| TYPE/NAME) KEY_1=VAL_1 ... KEY_N=VAL_N [--overwrite] [--all] [--resource-version=version] [flags]	|λ¦¬μμ€ label μλ°μ΄νΈ νΉμ μΆκ°κΈ°λ₯
|logs	|kubectl logs POD [-c CONTAINER] [--follow] [flags]|pod λ΄λΆ container λ‘κ·ΈνμΈ
|patch	|kubectl patch (-f FILENAME \| TYPE NAME \| TYPE/NAME) --patch PATCH [flags]|	λ¦¬μμ€μ μΌλΆ attributeλ₯Ό μμ , μ μ©          
|port-forward	|kubectl port-forward POD [LOCAL_PORT:]REMOTE_PORT [...[LOCAL_PORT_N:]REMOTE_PORT_N] [flags]	|ν¬νΈν¬μλ© κΈ°λ₯
|proxy|	kubectl proxy [--port=PORT] [--www=static-dir] [--www-prefix=prefix] [--api-prefix=prefix] [flags]	|μΏ λ²λ€ν°μ€μ νλ‘μ μ€μ 
|replace	|kubectl replace -f FILENAME	λ¦¬μμ€ μ¬κ΅¬μ±(μλ‘ μ μ©)
|rolling-update|	kubectl rolling-update OLD_CONTROLLER_NAME ([NEW_CONTROLLER_NAME] --image=NEW_CONTAINER_IMAGE \| -f NEW_CONTROLLER_SPEC) [flags]|λ‘€λ§ μλ°μ΄νΈ μν κΈ°λ₯
|run|kubectl run NAME --image=image [--env="key=value"] [--port=port] [--replicas=replicas] [--dry-run=bool] [--overrides=inline-json] [flags]	|ν΄λ¬μ€ν°μ νΉμ  μ΄λ―Έμ§ run
|scale|	kubectl scale (-f FILENAME \| TYPE NAME \| TYPE/NAME) --replicas=COUNT [--resource-version=version] [--current-replicas=count] [flags]|	RCμ replication κ°―μ μλ°μ΄νΈ
|stop	|kubectl stop	|λ μ΄μ μ¬μ©νμ§ μμ kubectl delete μ¬μ©!.
|version	|kubectl version [--client] [flags]	| μΏ λ²λ€ν°μ€ λ²μ Ό νμΈ|


<br/>


## π λ¦¬μμ€[RESOURCE] μ’λ₯ 
kubectlμ μ μ© κ°λ₯ν μΏ λ²λ€ν°μ€ λ¦¬μμ€ μ’λ₯μ λ¨μΆμ΄ λ¦¬μ€νΈ μλλ€.


|λ¦¬μμ€ μ’λ₯|	λ¨μΆμ΄|
|-----|---------|
|apiservices	| 
|certificatesigningrequests|	csr
|clusters	 |
|clusterrolebindings	| 
|clusterroles	| 
|componentstatuses|	cs
|configmaps|	cm
|controllerrevisions	 |
|cronjobs	 |
|customresourcedefinition	|crd
|daemonsets	|ds
|deployments|	deploy
|endpoints|	ep
|events|	ev
|horizontalpodautoscalers	|hpa
|ingresses	|ing
|jobs	 |
|limitranges	|limits
|namespaces	|ns
|networkpolicies	|netpol
|nodes	|no
|persistentvolumeclaims|	pvc
|persistentvolumes	|pv
|poddisruptionbudget	|pdb
|podpreset	 |
|pods|	po
|podsecuritypolicies	|psp
|podtemplates	| 
|replicasets|	rs
|replicationcontrollers	|rc
|resourcequotas	|quota
|rolebindings	| 
|roles	 |
|secrets|	 
|serviceaccounts	|sa
|services	|svc
|statefulsets	 |
|storageclasses	 |


<br/>
 

## Output μ΅μ

kubectlμΌλ‘ μ»μ μ λ³΄λ€μ fileλ‘ μ μ₯νκΈ°λ₯Ό μν  μ μμ£ . μ΄λ μλμ κ°μ μ΅μμΌλ‘ μΆμΆ κ°λ₯ν©λλ€.

 
```cs
kubectl [command] [TYPE] [NAME] -o=<output_format>
```

<br/>

output_formatμΌλ‘ μλμ κ°μ formatλ€μ μ§μ.

|Output| ν¬λ§·μ€λͺ|
|-----|-------|
| -o=custom-columns=(spec)	| commaλ‘ κ΅¬λΆκ°λ₯ν customνμμ tableμ μ‘°ν|
| -o=custom-columns-file=(filename)	| commaλ‘ κ΅¬λΆκ°λ₯ν customνμμ tableμ fileλ‘ μ μ₯|
| -o=json	| json νμμ API obejctλ‘ μ μ₯ |
| -o=jsonpath=(template) |jsonpath νμμΌλ‘ μ‘°ν|
|-o=jsonpath-file=(filename)	|jsonpath νμμΌλ‘ fileλ‘ μ μ₯
|-o=name|	λ¦¬μμ€ μ΄λ¦λ§ μ‘°ν
|-o=wide	|pod, node μ΄λ¦ λ± μΆκ°μ μΈ μ λ³΄ λͺ¨λ μ‘°ν
|-o=yaml	|yaml νμμ API objectλ‘ μ μ₯

<br/>

* output μ΅μ μμ 

    ```cs
    $ kubectl get pod web-pod-13je7 -o=yaml
    ```
    λ€μμ λͺλ Ήμ λ¨μΌ νλμ λν μΈλΆ μ λ³΄λ₯Ό YAML νμμ μ€λΈμ νΈλ‘ μΆλ ₯νλ€.

<br/>

---


## kubectl μμ 


<br/>

* kubectl create

    ```cs
    // example-service.yaml νμΌμ΄λ¦μ μλΉμ€λ₯Ό μμ±ν©λλ€.
    $ kubectl create -f example-service.yaml
    
    // example-controller.yaml νμΌμ΄λ¦μ RCλ₯Ό μμ±ν©λλ€.
    $ kubectl create -f example-controller.yaml
    ```

<br/>

* kubectl get

    ```cs
    // pod listλ₯Ό μΆλ ₯
    $ kubectl get pods

    // pod list(+ μΆκ°μ μΈ μ λ³΄ node μ΄λ¦ λ±)λ₯Ό μΆλ ₯
    $ kubectl get pods -o wide

    // νΉμ  <rc-name>μ μ λ³΄λ₯Ό μΆλ ₯
    $ kubectl get replicationcontroller <rc-name>

    // λͺ¨λ  rc, serviceλ€ μ λ³΄λ₯Ό μΆλ ₯
    $ kubectl get rc,services

    // λͺ¨λ  ds(daemon sets)μ λν μ λ³΄λ₯Ό μΆλ ₯(uninitialized dsλ ν¬ν¨)
    $ kubectl get ds --include-uninitialized

    // νΉμ  node(server01)μ λ°°ν¬λ pod μ λ³΄λ₯Ό μΆλ ₯
    $ kubectl get pods --field-selector=spec.nodeName=server01
    ```

<br/>

* kubectl describe

    ```cs
    // νΉμ  <node-name>μ node μ λ³΄ μΆλ ₯
    $ kubectl describe nodes <node-name>

    // νΉμ  <pod-name>μ pod μ λ³΄ μΆλ ₯
    $ kubectl describe pods/<pod-name>

    // νΉμ  <rc-name>μ rcκ° μ μ΄νλ podλ€ μ λ³΄ μΆλ ₯
    $ kubectl describe pods <rc-name>

    // λͺ¨λ  pod μ λ³΄ μΆλ ₯(uninitialized podμ μ μΈ)
    $ kubectl describe pods --include-uninitialized=false
    ```

 <br/>

* kubectl delete

    ```cs
    // pod.yamlλ‘ μ μΈλ podλ€μ μ κ±°
    $ kubectl delete -f pod.yaml

    // νΉμ  <label-name>μ΄ μ μλ pod, serviceλ€ μ κ±°
    $ kubectl delete pods,services -l name=<label-name>

    // νΉμ  <label-name>μ΄ μ μλ pod, serviceλ€ μ κ±°(uninitialized pod, service ν¬ν¨)
    $ kubectl delete pods,services -l name=<label-name> --include-uninitialized

    // λͺ¨λ  pod 
    $ kubectl delete pods --all
    ```

<br/>

* kubectl exec

    ```cs
    // νΉμ  <pod-name>μ κ°μ§ podμ μ²«λ²μ§Έ containerμ 'date' λΌλ λͺλ Ήμ΄ νΈμΆ
    $ kubectl exec <pod-name> date

    // νΉμ  <pod-name>μ κ°μ§ podμ νΉμ  <container-name>μ΄λΌλ μ΄λ¦μ containerμ 'date' λΌλ λͺλ Ήμ΄ νΈμΆ
    $ kubectl exec <pod-name> -c <container-name> date

    // νΉμ  <pod-name>μ κ°μ§ podμ μ²«λ²μ§Έ containerμ bash shellμ€ν 
    $ kubectl exec -ti <pod-name> /bin/bash
    ```

<br/>    


* kubectl logs

    ```cs
    // νΉμ  <pod-name> μ΄λ¦μ κ°μ§ podμ λ‘κ·Έ μ‘°ν
    $ kubectl logs <pod-name>

    // νΉμ  <pod-name> μ΄λ¦μ κ°μ§ podμ λ‘κ·Έ tail -f μ‘°ν
    $ kubectl logs -f <pod-name>
    ```
---


```toc
```