---
emoji: 🤦‍♂️
title: 쿠버네티스의 Volume [Kubernetes]
date: "2021-06-29 00:07:20"
author: nasa1515
tags: Kubernetes
categories: Kubernetes
---



머리말  

 이번 포스트에서는 쿠버네틱스의 볼륨에 대해서 알아보자.



---

## ✔ 쿠버네티스의 볼륨

파드의 컨테이너는 이미지로부터 파일시스템을 제공받는다.  
그러나 파드가 종료되면 파드 내의 ``데이터(파일)``은 더 이상 사용 할 수 없게 된다.  

컨트롤러에 의해 새로운 파드가 생성이 되면 이미지로 부터 새로운 파일 시스템을 제공받는다.  
즉 컨테이너는 기본적으로 데이터를 유지하지 않으며, 이런 형태를 ``상태가 없다(Stateless)`` 라고 한다.
 
파드는 새로 생성된 데이터를 보존하기 위해 ``외부 저장소 볼륨``을 생성하고 이런 볼륨을 컨테이너에 ``마운트``해서 사용한다.  
볼륨은 여러 파드에서 ``동시``에 접근이 가능하다.

기본적인 볼륨의 ``라이프사이클``은 파드의 ``라이프사이클``과 같다. 파드가 생성되고 삭제됨에 따라 볼륨도 같이 생성되고 삭제된다.  
그러나 파드가 재 시작되면 볼륨의 데이터는 삭제되지 않고 유지되며, 재시작 된 파드에게 해당 볼륨의 데이터를 다시 제공해준다.  

그러나 새로 도입된 ``PersistentVolume``, ``PersistentVloumeClaim``을 사용하며 볼륨만의 라이프 사이클은 분리 할 수 있게 되어  
파드의 로직과 별도로 ``볼륨(스토리지)``을 사용 할 수 있게 되었다.


<br/>

---

## ✌ PV, PVC


### (PersistentVolume, PV)  
    
쿠버네티스에서 볼륨을 사용하는 구조는 2개로 분리되어 있습니다. PV는 볼륨 자체를 의미합니다.  
클러스터내에서 리소스로 다뤄집니다. POD 하고는 별개로 관리되고 별도의 생명주기를 가지고 있습니다.  

<br/>


### (PersistentVolumeClaim, PVC)

PVC는 사용자가 PV에 하는 요청입니다.  
사용하고 싶은 용량은 얼마인지 읽기/쓰기는 어떤 모드로 설정하고 싶은지 등을 정해서 요청합니다.  

<br/>

### 내용  

쿠버네티스는 볼륨을 포드에 직접할당하는 방식이 아니라 이렇게 중간에 PVC를 둠으로써 POD와 스토리지를 분리했습니다.  
이런 구조는 각자의 상황에 맞게 다양한 스토리지를 사용할 수 있게 해줍니다.  
클라우드 서비스를 사용하는 경우에는 본인이 사용하는 클라우드 서비스에서 제공해주는 볼륨 서비스를 사용할 수도 있고,  
사설로 직접 구축해서 사용중인 스토리지가 있다면 그걸 사용할 수도 있습니다.  
이렇게 다양한 스토리지를 PV로 사용할 수 있지만 포드에 직접 연결하는게 아니라  
PVC를 통해서 사용하기 때문에 포드는 자신이 어떤 스토리지를 사용하는지 신경쓰지 않아도 됩니다.

<br/>

----

## 👍 PV, PVC 생명주기

PV-PVC의 로직은 다음 그림에서 보이는 것 같은 로직입니다.  
![스크린샷, 2020-08-14 17-30-59](https://user-images.githubusercontent.com/69498804/90230067-f4447380-de53-11ea-8205-814fa67be805.png)


<br/>

PV와 PVC는 다음 그림에서 보이는 것 같은 생명주기를 가집니다.


![스크린샷, 2020-08-14 12-11-40](https://user-images.githubusercontent.com/69498804/90209833-5470f080-de27-11ea-813a-45442d6dd942.png)



### 프로비저닝(Provisioning)  
    
PV를 사용하기 위해선 먼저 PV가 만들어져 있어야 합니다.  
이 PV를 만드는 단계를 ``프로비저닝``이라고 합니다.  
    
    
PV 프로비저닝 방법에는 2가지가 있습니다.
    
* ``정적(static)`` : PV를 미리 만들어두고 사용한다.  

    정적으로 PV를 준비한다는건 클러스터 관리자가 미리 적정용량의 PV를 만들어 두고  
    사용자들의 요청이 있으면 미리 만들어둔 PV를 할당해 주는 방식입니다.  
    사용할 수 있는 스토리지 용량에 제한이 있을 때 유용하게 사용할 수 있는 방법입니다.  
    사용자들에게 미리 만들어둔 PV의 용량이 100기가라면 150기가를 사용요청들은 실패하게 됩니다.  
    큰 용량 스토리지를 사용한다고 해도 만들어둔 PV의 용량이 150기가이상 되는 것이 없다면 요청이 실패하게 됩니다.  

* ``동적(dynamic)`` : 요청이 있을때마다 PV를 만드는 방법.
    
    동적으로 PV를 준비하는건 미리 PV를 준비해두는 것이 아니고  
    사용자가 PVC를 통해서 요청을 했을때 PV를 생성해서 제공해 주는 방식입니다.  
    쿠버네티스 클러스터를 위해 1테라짜리 스토리지를 준비해 뒀다고 하면  
    사용자가 필요할 때 원하는 용량만큼을 생성해서 사용할 수 있습니다.  
    정적 PV생성과 달리 한번에 200기가 짜리도 필요하면 만들어 쓸 수 있습니다.  
    동적 프로비저닝을 위해서 PVC는 ``스토리지클래스(StorageClasses)``를 사용합니다.  
    스토리지클래스를 이용해서 원하는 스토리지에 PV를 생성합니다.


<br/>
<br/>

###  바인딩(Binding)  

* PV를 PVC에 연결시키는 단계 입니다.  
    
* PVC는 사용자가 요청하는 볼륨을 PV에 요청하고 PV는 그에 맞는 볼륨이 있으면 할당해주게 됩니다.  

* 만약 PVC가 요청하는 볼륨이 PV에 없다면 해당 요청은 무한정 남아있게 되고,  
    PVC가 요청하는 볼륨이 PV에 생성되면 그 요청은 받아들여져 할당해주게 됩니다.

* PVC와 PV는 ClaimRef를 사용하는 1:1 관계이며 바인딩이 정상적으로 완료될 경우 bound 상태가 됩니다.

<br/>
<br/>

### 사용 (using)  

* Pod는 PVC를 볼륨으로 사용 합니다.  
    클러스터는 PVC를 확인하여 바인딩된 PV를 찾고 해당 볼륨을 Pod에서 사용할 수 있도록 해줍니다.

* 만약 Pod가 사용중인 PVC를 삭제하려고 하면 Storage Object in Use Protection에 의해 삭제되지 않습니다.  
    만약 삭제 요청을 하였다면 Pod가 PVC를 사용하지 않을때까지 삭제 요청은 연기 됩니다.

<br/>
<br/>

### 회수 (Reclamiming)  

* PV는 기존에 사용했던 PVC가 아니더라도 다른 PVC로 재활용이 가능 합니다.  
    때문에 사용이 종료된 PVC를 삭제할 때, 사용했던 PV의 데이터를 어떻게 처리할지에 대한 설정을 하게 됩니다.

    * ``Retain`` : PV의 데이터를 그대로 보존 합니다.
    * ``Recycle`` : 재사용하게될 경우 기존의 PV 데이터들을 모두 삭제 후 재사용 합니다.
    * ``Delete`` : 사용이 종료되면 해당 볼륨을 삭제 합니다.


<br/>

----

## 🐱‍🏍 PV, PVC 생성



### PV 생성

```cs
apiVersion: v1
kind: PersistentVolume
metadata:
name: dev-pv
spec:
capacity:
    storage: 2Gi
volumeMode: Filesystem
accessModes:
- ReadWriteOnce
storageClassName: manual
persistentVolumeReclaimPolicy: Delete
hostPath:
    path: /tmp/log_backup
```

* ``path``: /tmp/log_backup
* ``spec.capacity.storage`` → 사용할 용량을 2GB로 설정 합니다.
* ``spec.volumeMode`` → 볼륨을 Filesystem으로 사용 합니다.
* ``spec.accessModes`` → Pod의 접근 제어를 합니다.
* ``ReadWriteOnce`` : 하나의 Pod에서만 읽고 쓸 수 있습니다.
* ``ReadOnlyMany`` : 여러개의 Pod에서 읽을 수 있습니다.
* ``ReadWriteMany`` : 여러개의 Pod에서 읽고 쓸 수 있습니다.
* ``spec.storageClassName`` → 스토리지 클래스를 지정, 클래스에 맞는 PVC와 연결
* ``spec.persistentVolumeReclaimPolicy`` → Delete는 볼륨의 사용이 종료되면 볼륨을 삭제 합니다. 회수 단계에서 설명한 필드
* ``hostPath`` → 노드에 저장되는 디렉토리를 설정 합니다.

<br/>

``accessModes``는 볼륨의 읽기/쓰기에 관한 옵션을 지정합니다.  
볼륨은 한번에 하나의 accessModes만 설정할 수 있고 다음 3가지중 하나를 지정할 수 있습니다.  

- ``ReadWriteOnce`` : 하나의 노드가 볼륨을 읽기/쓰기 가능하게 마운트할 수 있음.
- ``ReadOnlyMany`` : 여러개의 노드가 읽기 전용으로 마운트할 수 있음.
- ``ReadWriteMany`` : 여러개의 노드가 읽기/쓰기 가능할게 마운트할 수 있음

<br/>
<br/>


해당 파일로 생성 후 정상 PV 확인  - 아직 PVC가 생성이 되지 않아 ``STATUS``가 ``Available``임.  

![스크린샷, 2020-08-14 16-02-05](https://user-images.githubusercontent.com/69498804/90222701-914cdf80-de47-11ea-9243-f774920b9047.png)



``pv``의 상태는 ``Available``을 포함해서 다음 4가지가 있습니다.  

- Available : PVC에서 사용할 수 있게 준비된 상태
- Bound : 특정 PVC에 연결된 상태
- Released : PVC는 삭제된 상태이고 PV는 아직 초기화되지 않은 상태
- Failed : 자동 초기화가 실패한 상태

<br/>
<br/>

### PVC 생성 

```cs
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
name: dev-pvc
spec:
accessModes:
- ReadWriteOnce
volumeMode: Filesystem
resources:
    requests:
    storage: 1Gi
storageClassName: manual
```

* ``accessModes``: (PV와 동일) 어떤 모드로 연결할지 지정합니다. [ReadWriteOnce, ReadOnlyMany, ReadWriteMany] 등
    
* ``volumeMode``: PV와 동일) 파일시스템인지 블록 디바이스인지를 filesystem, raw등을 통해 설정할 수 있습니다.  
    
* ``resources``: 얼만큼의 자원을 사용할 것인지에 대한 요청(request)을 입력합니다. (여기서는 1기가를 요청했습니다)  
    앞에서 만들어둔 PV의 용량이 2기가였기 때문에 현재 PVC에서 사용할 수 있습니다.  
    만약에 PVC가 requests의 storage에 2기가 이상의 용량을 입력했다면 거기에 맞는 PV가 없어 PVC는 Pending상태로 남습니다. 

* ``storageClassName``: 사용할 스토리지클래스를 명시해 줍니다.


<br/>
<br/>

*해당 파일로 생성 후 정상 PV,PVC 확인  
    PV <-> PVC가 연결되어 ``STATUS``가 ``BOUND``로 바뀐 것을 확인.  

![스크린샷, 2020-08-14 16-05-48](https://user-images.githubusercontent.com/69498804/90222946-07e9dd00-de48-11ea-8191-1df12fc5beae.png)


<br/>
<br/>

``PVC 를 사용할 DEP 생성 후 확인``

```cs
apiVersion: apps/v1
kind: Deployment
metadata:
name: test-deployment
labels:
    app: test-deployment
spec:
replicas: 1
selector:
    matchLabels:
    app: test-deployment
template:
    metadata:
    labels:
        app: test-deployment
    spec:
    containers:
    - name: test-deployment
        image: nginx
        ports:
        - containerPort: 8080
        volumeMounts:
        - mountPath: "/var/log/test.log"
        name: dev-volume
    volumes:
    - name: dev-volume
        persistentVolumeClaim:
        claimName: dev-pvc    ----------pvc 의 이름을 입력
```


* ``spec.template.spec.containers.volumeMounts``: 볼륨 마운트할 컨테이너 안의 경로를 작성하고  
    이 경로를 저장한 볼륨 마운트 정보를 dev-volume 이라는 이름으로 지정합니다.  

* ``spec.template.spec.volumes``: 위에 작성한 컨테이너에서 사용할 볼륨 마운트 이름(dev-volume)을 가져오고  
    이 정보와 연결 요청을 보낼 pvc를 2번에서 생성한 ``dev-pvc``로 지정 합니다.

<br/>
<br/>

### 파일 생성 테스트

``MASTER`` 서버의 PV-PATH 경로에 다음과 같은 파일을 만들었었다.

```cs
vagrant@kube-master1:~/wonseok$ ls -alrt /pv-pvc/pv-pvc-test.txt
-rw-r--r-- 1 root root 12 Aug 14 07:35 /pv-pvc/pv-pvc-test.txt
vagrant@kube-master1:~/wonseok$ cat /pv-pvc/pv-pvc-test.txt 
PV-PVC-TEST
vagrant@kube-master1:~/wonseok$ 
```

<br/>
<br/>
 
새로 만들어진 PODS에 ``/home/pv-pvs`` 디렉토리가 자동 생성되었고  
    ``pv-pvc-txt`` 파일의 내용도 들어있는 것을 확인.

```cs
vagrant@kube-master1:~/wonseok$ kubectl exec -it pod/nasa1515-deployment-b664c7ff5-jh677 bas

root@nasa1515-deployment-b664c7ff5-jh677:/# ls -lart /home/pv-pvs
total 12
drwxr-xr-x 2 root root 4096 Aug 14 07:33 .
-rw-r--r-- 1 root root   12 Aug 14 07:33 pv-pvc.txt
drwxr-xr-x 1 root root 4096 Aug 14 07:43 ..
root@nasa1515-deployment-b664c7ff5-jh677:/# 
root@nasa1515-deployment-b664c7ff5-jh677:/# cat /home/pv-pvs/pv-pvc.txt
PV-PVC TEST
```

<br/>
<br/>

PV와 PVC는 파드와 서비스를 연결할 때처럼 레이블 / 셀렉터를 사용할 수도 있다.

PV
    
```cs
apiVersion: v1
kind: PersistentVolume
metadata:
name: pv-hostpath-label
labels:
    location: local             -----------local
spec:
capacity:
    storage: 2Gi
volumeMode: Filesystem
accessModes:
- ReadWriteOnce
storageClassName: manual
persistentVolumeReclaimPolicy: Delete
hostPath:
    path: /home/nasa1515
```

<br/>
<br/>

PVC
        
```cs
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
name: pvc-hostpath-label
spec:
accessModes:
- ReadWriteOnce
volumeMode: Filesystem
resources:
    requests:
    storage: 1Gi
storageClassName: manual
selector:
    matchLabels:
    location: local            ---------------local
```

<br/>

---

## 🌹 볼륨 플러그인

쿠버네티스 에서 사용할 수 있는 볼륨 플러그인은 무수히 많다. 

[몇가지 예시]  

![스크린샷, 2020-08-14 14-04-52](https://user-images.githubusercontent.com/69498804/90215628-25627b00-de37-11ea-8d8e-98d0b2dfcfd2.png)


<br/>
<br/>


대표적인 3가지는 아래 가지가 있다.

empty : 임시로 데이터를 저장하는 빈 볼륨  
    
* 호스트의 디스크를 임시로 컨테이너 볼륨에 할당해서 사용한다.  
* 파드가 사라지면 emprtDir 에 할당했던 컨테이너 볼륨의 데이터도 사라진다.
* 단순히 컨테이너를 재시작 했을 때 데이터를 보존하는 역할이다.
* 메모리와 디스크를 함께쓰는 대용량 데이터 계산을 하는 경우와 연산 결과를 중간 저장용 필요할 때 사용한다.

<br/>
<br/>

[아래의 예시는 두 개의 컨테이너가 하나의 Pod에서 emptyDir을 공유하는 것을 보여준다]

```cs
1 apiVersion: v1
2 kind: Pod
3 metadata:
4 name: test-pod
5 spec:
6 containers:
7    - image: ubuntu:14.04
8    name: ubuntu-container              --- 우분투라는 이름의 pods
9    command: ["tail","-f", "/dev/null"]
10    volumeMounts:
11        - mountPath: /data
12        name: my-empty-volume
13
14    - image: nginx                     --- nginx라는 이름의 pods
15    name: nginx-containe
16    volumeMounts:
17        - mountPath: /data
18        name: my-empty-volume
19
20 volumes:
21    - name: my-empty-volume
22    emptyDir: {}                 ----empty에 대한 설정
```

<br/>

* ``spec.containers.volumeMounts.mountPath``: 실행될 컨테이너 안에 마운트할 경로 입니다.  
컨테이너 안에 해당 디렉토리가 없더라도 자동으로 생성 해줍니다

* ``spec.containers.volumeMounts.mountPath``: 마운트할 볼륨의 이름 입니다.  

* ``spec.voluems``: 위에 작성한 my-empty-volume을 사용하도록 지정 해줍니다.

<br/>
<br/>


PODS 생성 후 정상 구동 확인

```cs
[root@nasa1515]# kubectl create -f emp.yaml
pod/emp-pod created
--------------------------------------------------------------------------
[root@nasa1515]# kubectl get po
NAME                                   READY     STATUS    RESTARTS   AGE
emp-pod                                 2/2       Running   0          39s
```

<br/>
<br/>

한 컨테이너에서 /data에 파일을 생성할 경우 다른 컨테이너에서도 해당 파일에서 접근할 수 있다.

```cs
[root@nasa1515]# docker ps | grep ubuntu
78a266359307        ubuntu@nasa1515:885bb6705b0... 
--------------------------------------------------------------------------
[root@nasa1515]# docker exec -it 78 bash
root@emp-pod:/# ls
bin  boot  data  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@emp-pod:/# cd data/
root@emp-pod:/data# echo test >> Test
root@emp-pod:/data# exit
exit

--------------------------------------------------------------------------
[root@nasa1515# docker ps | grep nginx
7c72d8409845        nginx@nasa1515:d85914d547a6...
[root@nasa1515]# docker exec -it 7c bash
root@test-pod:/# ls data/
Test
```

<br/>
<br/>

### hostPath : 파드가 실행된 호스트의 파일이나 디렉토리를 파드에 마운트한다.

* hostpath는 호스트의 디렉터리를 Pod와 공유해 사용하는 방식이다.
* 컨테이너 재시작시 데이터를 보존하는 역할이다.
* 도커 스웜 모드의 호스트 볼륨 마운트와 비슷한 방식이라고 생각하면 쉽다.  
* Pod가 삭제되어도 hostpath에 저장된 파일들은 호스트에 저장되어 남아있게 된다. 

* 그러나 당연하게도 컨테이너가 할당될 특정 호스트를 nodeSelector를 통해 지정해주지 않으면  
매번 컨테이너가 다른 호스트에 할당되므로 이 방식은 persistent storage와는 거리가 있다고 볼 수 있다.


<br/>
<br/>

hostpath는 아래와 같이 정의해 사용할 수 있다.

```cs
apiVersion: v1
kind: Pod
metadata:
name: nasa1515-hostpath-pod
spec:
containers:
- name: nasa1515-hostpath-pod
    image: arisu1000/simple-container-app:latest
    volumeMounts:
    - mountPath: /test-volume
    name: hostpath-vol
    ports:
    - containerPort: 8080
volumes:
- name: hostpath-vol
    hostPath:
    path: /tmp
    type: Directory
```

* ``spec.containers.volumeMounts.mountPath``: 실행된 컨테이너 안에 마운트할 경로 입니다.  
컨테이너 안에 해당 디렉토리가 없더라도 자동으로 생성 해줍니다. 
* ``spec.containers.volumeMounts.name``: 마운트할 볼륨의 이름 입니다.
* ``spec.voluems.name``: 위에 작성한 hostpath-volume을 사용하도록 지정 해줍니다.
* ``spec.voluems.hostPath``: 노드에 마운트할 경로를 정해주고 해당 경로는 Directory 라는것을 명시 합니다.  
해당 디렉토리는 노드에 생성되어 있어야 하며, DirectoryOrCreate를 사용하면 디렉토리를 생성 해줍니다.

<br/>
<br/>


### NFS 서버
호스트에 설정한 NFS 디렉토리를 공유하는 네트워크 볼륨 공유이다.

* NFS 볼륨은 기존에 사용하는 NFS 서버를 파드에 마운트한다.

* ``.spec.containers[].securityContext`` 는 컨테이너의 보안 설정을 한다.

<br/>
<br/>


컨테이너가 실행중인 호스트 장치의 접근권한을 설정하는 priviledged 필드값으로  
     모든 호스트 장치에 접근할 수 있도록 할 수 있다.
     
```cs
apiVersion: apps/v1
kind: Deployment
metadata:
name: nfs-server
labels:
    app: nfs-server
spec:
replicas: 1
selector:
    matchLabels:
    app: nfs-server
template:
    metadata:
    labels:
        app: nfs-server
    spec:
    containers:
    - name: nfs-server
        image: arisu1000/nfs-server:latest
        ports:
        - name: nfs
        containerPort: 2049             --nfs 연결 Port
        - name: mountd
        containerPort: 20048
        - name: rpcbind
        containerPort: 111
        securityContext:
        privileged: true
        volumeMounts:
        - mountPath: /exports
        name: hostpath-vol
    volumes:
    - name: hostpath-vol
        hostPath:
        path: /tmp
        type: Directory
```

---


```toc
```