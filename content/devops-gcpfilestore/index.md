---
emoji: 🤦‍♂️
title: GCP의 FileStore (NFS) 를 PV로 사용해보자 [DevOps]
date: "2021-08-07 00:39:25"
author: nasa1515
tags: DevOps GCP
categories: DevOps GCP
---


머리말  

이번 포스트에서는 앱 구동을 위한 MYSQL 이중화입니다 이전 포스트에서 앱 배포를 완료했지만  
MYSQL pod의 경우 볼륨의 문제로 하나밖에 뜨지 않아 DB 데이터를 어떻게 저장할지에 대한 고민이 있었습니다.  
고민해본 결과 NFS를 만들어서 그쪽에 데이터를 저장해놓고 POD가 실행될때마다 NFS를 읽어오자! 라는 결론이 나왔습니다  
그래서 NFS 서버를 구축하려고 하려는 찰나 GCP에서 API 서비스로 제공한다는 소식을 듣고 바로 사용해 보았습니다

---

* 사용 할 툴을 다음과 같습니다.  

    - GCP FileStore
    - k8s PV,PVC
    - ArgoCD

---




## ✔ 발생 이슈


* MYSQL Pod를 두개 이상 띄우려고 할때 아래와 같은 문제가 발생했다.  

    ![스크린샷, 2020-10-22 16-45-58](https://user-images.githubusercontent.com/69498804/96840929-11b24100-1486-11eb-9157-145a7d03bf00.png)

    ```cs
    FailedAttachVolume
    Multi-Attach error for volume "pvc-73526617-313f-46f4-be6f-0776dcf151d3" Volume is already used by pod(s) mysql-6749799856-kb9mp	6 minutes ago
    ```

<br/>

* 이유는 Google Persistent Disk의 경우 Block 스토리지의 Access Mode인 ``ReadWriteMany`` 옵션을 지원하지 않았습니다.

    ![스크린샷, 2020-10-22 16-52-21](https://user-images.githubusercontent.com/69498804/96841616-f6940100-1486-11eb-8b22-406d019bcf8b.png)

    그래서 GKE를 만들때 자동 생성되는 스토리지 클래스를 사용하지 않고 PV를 직접 만들어 연결해줘야 하는 상황이 되었습니다


<br/>

* 다행히 공식문서를 보니 GCP에서 NFS(Filestore)를 PV로 지원한다는 문서를 확인해서 NFS를 사용하기로 했습니다

    ![스크린샷, 2020-10-22 16-54-43](https://user-images.githubusercontent.com/69498804/96841887-4f639980-1487-11eb-9578-307b7b86267d.png)


<br/>


* GCP에서는 기본적으로 Standard 형의 스토리지 클래스를 지원합니다

    ![스크린샷, 2020-10-22 17-00-52](https://user-images.githubusercontent.com/69498804/96842565-268fd400-1488-11eb-9d64-66a4b1fd41db.png)

<br/>


* [쿠버네티스 공식문서](https://kubernetes.io/ko/docs/concepts/storage/storage-classes/)

    ```cs
    스토리지클래스는 관리자가 제공하는 스토리지의 "classes"를 설명할 수 있는 방법을 제공한다. 
    다른 클래스는 서비스의 품질 수준 또는 백업 정책, 클러스터 관리자가 정한 임의의 정책에 매핑될 수 있다. 
    쿠버네티스 자체는 클래스가 무엇을 나타내는지에 대해 상관하지 않는다. 
    다른 스토리지 시스템에서는 이 개념을 "프로파일"이라고도 한다.
    ```
    ```cs
    스토리지클래스 리소스 
    각 스토리지클래스에는 해당 스토리지클래스에 속하는 퍼시스턴트볼륨을 동적으로 프로비저닝 할 때 사용되는 provisioner, parameters 와 reclaimPolicy 필드가 포함된다.

    스토리지클래스 오브젝트의 이름은 중요하며, 사용자가 특정 클래스를 요청할 수 있는 방법이다. 
    관리자는 스토리지클래스 오브젝트를 처음 생성할 때 클래스의 이름과 기타 파라미터를 설정하며, 일단 생성된 오브젝트는 업데이트할 수 없다.

    관리자는 특정 클래스에 바인딩을 요청하지 않는 PVC에 대해서만 기본 스토리지클래스를 지정할 수 있다. 
    ```

    <br/>

    * 쿠버네티스에서는 아래와 같이 정의 할 수 있다

    ```cs
    apiVersion: storage.k8s.io/v1
    kind: StorageClass
      metadata:
      name: standard
        provisioner: kubernetes.io/aws-ebs
      parameters:
      type: gp2
      reclaimPolicy: Retain
      allowVolumeExpansion: true
      mountOptions:
       - debug
      volumeBindingMode: Immediate
    ```

    * 즉 간단하게 말해서 PV를 미리 선언해주는 것이라고 이해하는게 편하다.
    * 보통 PV 선언 -> PVC 선언의 과정을 거쳐야 하지만 스토리지 클래스를 미리 정의해놓으면 PV선언 과정을 생략할 수 있다.


<br/>

---

## ✌ 이제 GCP의 NFS(Filestore)를 구성해보죠

<br/>

### GCP NFS 설정

<br/>


* 우선 GCP Console에서 FILEStore API를 설치해줍니다

    ![스크린샷, 2020-10-22 18-39-50](https://user-images.githubusercontent.com/69498804/96854037-0404b780-1496-11eb-81c4-922d294a441d.png)

<br/>

* 그 후 Console TAP의 Filestore 메뉴에서 인스턴스를 생성해줍니다

    ![스크린샷, 2020-10-22 18-45-28](https://user-images.githubusercontent.com/69498804/96854705-c3f20480-1496-11eb-89dc-3a46f4b99df6.png)


<br/>

* 생성이 완료되었다면 자동으로 NFS가 연동됩니다. 임시로 Jenkins 인스턴스에서 Showmount 명령으로 확인해봅시다

     ```cs
    [root@jenkins ~]# 
    [root@jenkins ~]# showmount -e 10.254.194.122
    Export list for 10.254.194.122:
    /nfs_share 192.168.0.0/16,172.16.0.0/12,10.0.0.0/8
    [root@jenkins ~]# 
    [root@jenkins ~]# 
    ```
    NFS끼리 잘 연결되어있는걸 확인했습니다!!

<br/>


``FileStore를 이용한 NFS 구성은 정말 간단합니다. 비용만아니면 매일 쓰고 싶네요``

<br/>

---

### NFS를 GKE의 볼륨으로 사용

[공식 문서](https://cloud.google.com/filestore/docs/accessing-fileshares?hl=ko)

<br/>
<br/>


### PV 생성

* NFS를 볼륨으로 이용하기 위해서 아래와 같은 메니페스트 파일을 작성했습니다.


    ```cs
    apiVersion: v1
    kind: PersistentVolume
    metadata:
        name: dbserver
        namespace: cd-test
    spec:
        capacity:
        storage: 10Gi
    volumeMode: Filesystem
    accessModes:
    - ReadWriteMany
    persistentVolumeReclaimPolicy: Retain
    storageClassName: ""
    nfs:
        path: /nfs_share
        server: 10.254.194.122
    ```

    PV를 생성할때 NFS서버의 IP와 path를 제대로 설정해주지 않으면  
    아래와 같은 ``NFS MOUNT ERROR``가 발생합니다


    ```cs
    Search
    Warning	FailedMount	Unable to attach or mount volumes: unmounted volumes=[mysql-vol], unattached volumes=[default-token-6778k mysql-vol]: timed out waiting for the condition	2 minutes ago
    Warning	FailedMount	MountVolume.SetUp failed for volume "dbserver" : mount failed: exit status 1 Mounting command: systemd-run Mounting arguments: --description=Kubernetes transient mount for /var/lib/kubelet/pods/d28155b1-9c27-4f6e-b1b7-9169c926f784/volumes/kubernetes.io~nfs/dbserver --scope -- /home/kubernetes/containerized_mounter/mounter mount -t nfs -o hard,nfsvers=3 10.254.194.120:/file-share /var/lib/kubelet/pods/d28155b1-9c27-4f6e-b1b7-9169c926f784/volumes/kubernetes.io~nfs/dbserver Output: Running scope as unit: run-r3af88159402a4b1ab6bc70512f1cbc1d.scope Mount failed: mount failed: exit status 32 Mounting command: chroot Mounting arguments: [/home/kubernetes/containerized_mounter/rootfs mount -t nfs -o hard,nfsvers=3 10.254.194.120:/file-share /var/lib/kubelet/pods/d28155b1-9c27-4f6e-b1b7-9169c926f784/volumes/kubernetes.io~nfs/dbserver] Output: mount.nfs: Connection timed out	2 minutes ago
    ```

    <br/>

* 추가적으로 storageClassName: "" 항목을 None으로 둬야만 합니다.  
그래야 GKE 기본 스토리지 클래스인 GCP-PD 형식의 PV를 생성하지 않기 때문에  
NONE이 필수적입니다! 이 항목도 NONE이 아닐 경우 위와 같은 에러가 발생합니다.

<br/>

---


### PVC 생성

* NFS를 볼륨으로 이용하기 위해서 아래와 같은 메니페스트 파일을 작성했습니다.

    ```cs
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
        creationTimestamp: null
        labels:
            io.kompose.service: mysql
        name: mysql-pvc
        namespace: cd-test
    spec:
      accessModes:
      - ReadWriteMany
      storageClassName: ""
      volumeName: dbserver
      resources:
        requests:
          storage: 5Gi
    status: {}
    ```

    PVC의 경우 별로 바꿔줄 것이 없습니다. 다만 ``storageClassName = NONE``이기 때문에  
      ``volumeName: dbserver`` 항목으로 PV를 잡아주어야 원할하게 바운딩 됩니다!

<br/>


* 그럼 PVC를 생성했으니 PV <-> PVC가 바운딩되었는지 확인해봅시다

    ```cs
    > kubectl get pv -n cd-test
    NAME       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM               STORAGECLASS   REASON   AGE
    dbserver   10Gi       RWX            Retain           Bound    cd-test/mysql-pvc                           28m
    > kubectl get pvc -n cd-test
    NAME        STATUS   VOLUME     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    mysql-pvc   Bound    dbserver   10Gi       RWX                           28m
    ```

    너무 정상적입니다~ 이제 MYSQL POD를 배포해봅시다!

<br/>

---




### MYSQL POD 배포

<br/>

* MYSQL 배포를 위해 아래와 같은 메니페스트 파일을 작성했습니다.




    ```cs
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    annotations:
        kompose.cmd: kompose convert
        kompose.version: 1.21.0 (992df58d8)
    creationTimestamp: null
    labels:
        io.kompose.service: mysql
    name: mysql
    spec:
    replicas: 1
    selector:
        matchLabels:
        io.kompose.service: mysql
    strategy:
        type: Recreate
    template:
        metadata:
        annotations:
            kompose.cmd: kompose convert
            kompose.version: 1.21.0 (992df58d8)
        creationTimestamp: null
        labels:
            io.kompose.service: mysql
        spec:
        containers:
        - env:
            - name: MYSQL_ROOT_PASSWORD
            value: [비번은 안댑니다]
            image: mysql:5.5
            imagePullPolicy: ""
            name: mysql
            resources: {}
            volumeMounts:
            - mountPath: /var/lib/mysql
            name: mysql-vol
        restartPolicy: Always
        serviceAccountName: ""
        volumes:
        - name: mysql-vol
            persistentVolumeClaim:
            claimName: mysql-pvc
        status: {}
    ```

<br/>

* 다음과 같은 배포 메니페스트로 배포를 하면! 아래와 같이 정상적으로 구동이 됩니다!!


    ![스크린샷, 2020-10-23 15-15-52](https://user-images.githubusercontent.com/69498804/96962891-a7aba180-1542-11eb-9d2d-3eb34c814aed.png)


<br/>


----



### 에러 발생..ㅠ

``MYSQL Unable to lock ./ib_logfile0, error: 11``


<br/>

* MYSQL Deployment에 Replicas 를 2로 설정 후 이중화를 하려니깐 아래와 같은 ERROR가 발생하였다.

    ```cs
    201023  5:30:32 [Note] --secure-file-priv is set to NULL. Operations related to importing and exporting data are disabled
    201023  5:30:32 [Note] mysqld (mysqld 5.5.62) starting as process 1 ...
    201023  5:30:32 [Note] Plugin 'FEDERATED' is disabled.
    201023  5:30:32 InnoDB: The InnoDB memory heap is disabled
    201023  5:30:32 InnoDB: Mutexes and rw_locks use GCC atomic builtins
    201023  5:30:32 InnoDB: Compressed tables use zlib 1.2.11
    201023  5:30:32 InnoDB: Using Linux native AIO
    201023  5:30:32 InnoDB: Initializing buffer pool, size = 128.0M
    201023  5:30:32 InnoDB: Completed initialization of buffer pool
    InnoDB: Unable to lock ./ib_logfile0, error: 11
    InnoDB: Check that you do not already have another mysqld process
    InnoDB: using the same InnoDB data or log files.
    InnoDB: Error in opening ./ib_logfile0
    201023  5:30:32 [ERROR] Plugin 'InnoDB' init function returned error.
    201023  5:30:32 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
    201023  5:30:32 [ERROR] Unknown/unsupported storage engine: InnoDB
    201023  5:30:32 [ERROR] Aborting
    201023  5:30:32 [Note] mysqld: Shutdown complete
    ```

<br/>

* 검색을 쫌 해보니 내 환경은 NFS로 data파일을 받아오는 구조이다 보니 한쪽의 MYSQL Pod가 mysql을 실행시키면서   
해당 데이터파일을 사용하고 있으면 다른쪽에서는 사용하지 못하는 이슈였다.


<br/>

* Rancher UI에서 확인해보니 컨테이너가 계속 재시작 되고 있다 ㅠㅠ

    ![스크린샷, 2020-10-23 14-15-19](https://user-images.githubusercontent.com/69498804/96963063-f35e4b00-1542-11eb-8671-2c25c1f6236d.png)

<br/>

* 머리말에서도 언급했듯이 이중화보다는 NFS로 DB 데이터를 받아오는 것과 별 차이가 없다고 생각을 했습니다.  
그래서 위의 Mysql 배포 메니페스트 파일의 replicas를 1로 두는 것으로 마무리 했습니다



---


### NFS <-> Mysql Data 연동 확인


replicas를 1로 두어 NFS와 데이터파일을 연동한 POD에서 확인해봅시다!


* 우선 MYSQL과 연동한 취약점 검사 WEB에서 아이디를 하나 만들어보죠 해당 ID 데이터는 MYSQL DB에 저장됩니다

    ![스크린샷, 2020-10-23 15-22-18](https://user-images.githubusercontent.com/69498804/96963398-8c8d6180-1543-11eb-8cb1-52c331066848.png)

    test2라는 User를 만들었습니다

    ![스크린샷, 2020-10-23 15-25-06](https://user-images.githubusercontent.com/69498804/96963649-f148bc00-1543-11eb-9ff7-25c533985471.png)


<br/>


* MYSQL POD로 가서 데이터를 확인해봅시다.

    아래와 같이 DB Table에 Account 정보가 잘 들어와 있네요
    ```cs
    mysql> 
    mysql> select * from users;
    +----+-------+-------+-----------------+----------------------------------+---------------------+---------------------+------+
    | id | name  | login | email           | password                         | created_at          | updated_at          | role |
    +----+-------+-------+-----------------+----------------------------------+---------------------+---------------------+------+
    | 18 | test  | test  | test@gmail.com  | 098f6bcd4621d373cade4e832627b4f6 | 2020-10-23 05:46:19 | 2020-10-23 05:46:19 | NULL |
    | 19 | test2 | test2 | test2@naver.com | ad0234829205b9033196ba818f7a872b | 2020-10-23 06:24:54 | 2020-10-23 06:24:54 | NULL |
    +----+-------+-------+-----------------+----------------------------------+---------------------+---------------------+------+
    2 rows in set (0.00 sec)
    ```

<br/>

---


### 이제 MYSQL POD를 강제로 죽인 뒤 다시 가동시켜서 DB DATA를 확인해보겠습니다


<br/>

* Rancher에서는 POD를 다음과 같이 간단하게 종료 시킬 수 있습니다.

    ![스크린샷, 2020-10-23 15-29-29](https://user-images.githubusercontent.com/69498804/96963953-8ea3f000-1544-11eb-9963-c488299be958.png)

<br/>

* Deployement가 POD를 재시작 시켜 이전과 다른 이름으로 컨테이너가 가동 됐습니다.

    ![스크린샷, 2020-10-23 15-30-20](https://user-images.githubusercontent.com/69498804/96964025-ad09eb80-1544-11eb-9bd6-0f30336e6e03.png)


<br/>

* 새로 생성된 컨테이너에 접속해서 DB 데이터를 보면 기존에 추가했던 test2 user 정보가 남아있습니다

    ```cs
    mysql> use dvja
    Reading table information for completion of table and column names
    You can turn off this feature to get a quicker startup with -A

    Database changed
    mysql> show tables;
    +----------------+
    | Tables_in_dvja |
    +----------------+
    | products       |
    | users          |
    +----------------+
    2 rows in set (0.00 sec)

    mysql> 
    mysql> select * from users;
    +----+-------+-------+-----------------+----------------------------------+---------------------+---------------------+------+
    | id | name  | login | email           | password                         | created_at          | updated_at          | role |
    +----+-------+-------+-----------------+----------------------------------+---------------------+---------------------+------+
    | 18 | test  | test  | test@gmail.com  | 098f6bcd4621d373cade4e832627b4f6 | 2020-10-23 05:46:19 | 2020-10-23 05:46:19 | NULL |
    | 19 | test2 | test2 | test2@naver.com | ad0234829205b9033196ba818f7a872b | 2020-10-23 06:24:54 | 2020-10-23 06:24:54 | NULL |
    +----+-------+-------+-----------------+----------------------------------+---------------------+---------------------+------+
    2 rows in set (0.00 sec)

    mysql> 
    ```

<br/>

* 물론 웹페이지에서도 접속이 원활합니다

    ![스크린샷, 2020-10-23 15-33-20](https://user-images.githubusercontent.com/69498804/96964242-17229080-1545-11eb-8632-0a6251fc34d8.png)

<br/>

----


## 마치며…  

이번에 새롭게 FileStore라는 GCP의 기능을 사용해봤습니다.  
진짜 이전에 노가다식으로 했었던 NFS 서버 구성이 너무 무의미해지는 서비스입니다  
이번 실습은 왜 클라우드 서비스 하는지 알 것같은 실습이었습니다  
비록 기존에 생각하던 MYSQL POD의 Active/slave,Heartbeat 방식의 이중화는 못했지만 nfs에서 데이터를 받아오는 것도 만족한 서비스 인 것 같습니다.
이번 포스트까지 이제 전반적인 서비스 구성을 마무리 지은 것 같습니다.  
이제는 보안툴과 취약점 검사, ARgo-cd 자동화 등을 진행해야겠죠...


---

```toc
```