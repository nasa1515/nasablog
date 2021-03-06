---
emoji: ๐คฆโโ๏ธ
title: "[DEVOPS] - GCP์ FileStore (NFS) ๋ฅผ PV๋ก ์ฌ์ฉํด๋ณด์"
date: "2021-08-07 00:39:25"
author: nasa1515
tags: DevOps CLOUD
categories: DevOps CLOUD
---


๋จธ๋ฆฌ๋ง  

์ด๋ฒ ํฌ์คํธ์์๋ ์ฑ ๊ตฌ๋์ ์ํ MYSQL ์ด์คํ์๋๋ค ์ด์  ํฌ์คํธ์์ ์ฑ ๋ฐฐํฌ๋ฅผ ์๋ฃํ์ง๋ง  
MYSQL pod์ ๊ฒฝ์ฐ ๋ณผ๋ฅจ์ ๋ฌธ์ ๋ก ํ๋๋ฐ์ ๋จ์ง ์์ DB ๋ฐ์ดํฐ๋ฅผ ์ด๋ป๊ฒ ์ ์ฅํ ์ง์ ๋ํ ๊ณ ๋ฏผ์ด ์์์ต๋๋ค.  
๊ณ ๋ฏผํด๋ณธ ๊ฒฐ๊ณผ NFS๋ฅผ ๋ง๋ค์ด์ ๊ทธ์ชฝ์ ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํด๋๊ณ  POD๊ฐ ์คํ๋ ๋๋ง๋ค NFS๋ฅผ ์ฝ์ด์ค์! ๋ผ๋ ๊ฒฐ๋ก ์ด ๋์์ต๋๋ค  
๊ทธ๋์ NFS ์๋ฒ๋ฅผ ๊ตฌ์ถํ๋ ค๊ณ  ํ๋ ค๋ ์ฐฐ๋ GCP์์ API ์๋น์ค๋ก ์ ๊ณตํ๋ค๋ ์์์ ๋ฃ๊ณ  ๋ฐ๋ก ์ฌ์ฉํด ๋ณด์์ต๋๋ค

---

* ์ฌ์ฉ ํ  ํด์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.  

    - GCP FileStore
    - k8s PV,PVC
    - ArgoCD

---




## โ ๋ฐ์ ์ด์


* MYSQL Pod๋ฅผ ๋๊ฐ ์ด์ ๋์ฐ๋ ค๊ณ  ํ ๋ ์๋์ ๊ฐ์ ๋ฌธ์ ๊ฐ ๋ฐ์ํ๋ค.  

    ![์คํฌ๋ฆฐ์ท, 2020-10-22 16-45-58](https://user-images.githubusercontent.com/69498804/96840929-11b24100-1486-11eb-9157-145a7d03bf00.png)

    ```cs
    FailedAttachVolume
    Multi-Attach error for volume "pvc-73526617-313f-46f4-be6f-0776dcf151d3" Volume is already used by pod(s) mysql-6749799856-kb9mp	6 minutes ago
    ```

<br/>

* ์ด์ ๋ Google Persistent Disk์ ๊ฒฝ์ฐ Block ์คํ ๋ฆฌ์ง์ Access Mode์ธ ``ReadWriteMany`` ์ต์์ ์ง์ํ์ง ์์์ต๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-10-22 16-52-21](https://user-images.githubusercontent.com/69498804/96841616-f6940100-1486-11eb-8b22-406d019bcf8b.png)

    ๊ทธ๋์ GKE๋ฅผ ๋ง๋ค๋ ์๋ ์์ฑ๋๋ ์คํ ๋ฆฌ์ง ํด๋์ค๋ฅผ ์ฌ์ฉํ์ง ์๊ณ  PV๋ฅผ ์ง์  ๋ง๋ค์ด ์ฐ๊ฒฐํด์ค์ผ ํ๋ ์ํฉ์ด ๋์์ต๋๋ค


<br/>

* ๋คํํ ๊ณต์๋ฌธ์๋ฅผ ๋ณด๋ GCP์์ NFS(Filestore)๋ฅผ PV๋ก ์ง์ํ๋ค๋ ๋ฌธ์๋ฅผ ํ์ธํด์ NFS๋ฅผ ์ฌ์ฉํ๊ธฐ๋ก ํ์ต๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-10-22 16-54-43](https://user-images.githubusercontent.com/69498804/96841887-4f639980-1487-11eb-9578-307b7b86267d.png)


<br/>


* GCP์์๋ ๊ธฐ๋ณธ์ ์ผ๋ก Standard ํ์ ์คํ ๋ฆฌ์ง ํด๋์ค๋ฅผ ์ง์ํฉ๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-10-22 17-00-52](https://user-images.githubusercontent.com/69498804/96842565-268fd400-1488-11eb-9d64-66a4b1fd41db.png)

<br/>


* [์ฟ ๋ฒ๋คํฐ์ค ๊ณต์๋ฌธ์](https://kubernetes.io/ko/docs/concepts/storage/storage-classes/)

    ```cs
    ์คํ ๋ฆฌ์งํด๋์ค๋ ๊ด๋ฆฌ์๊ฐ ์ ๊ณตํ๋ ์คํ ๋ฆฌ์ง์ "classes"๋ฅผ ์ค๋ชํ  ์ ์๋ ๋ฐฉ๋ฒ์ ์ ๊ณตํ๋ค. 
    ๋ค๋ฅธ ํด๋์ค๋ ์๋น์ค์ ํ์ง ์์ค ๋๋ ๋ฐฑ์ ์ ์ฑ, ํด๋ฌ์คํฐ ๊ด๋ฆฌ์๊ฐ ์ ํ ์์์ ์ ์ฑ์ ๋งคํ๋  ์ ์๋ค. 
    ์ฟ ๋ฒ๋คํฐ์ค ์์ฒด๋ ํด๋์ค๊ฐ ๋ฌด์์ ๋ํ๋ด๋์ง์ ๋ํด ์๊ดํ์ง ์๋๋ค. 
    ๋ค๋ฅธ ์คํ ๋ฆฌ์ง ์์คํ์์๋ ์ด ๊ฐ๋์ "ํ๋กํ์ผ"์ด๋ผ๊ณ ๋ ํ๋ค.
    ```
    ```cs
    ์คํ ๋ฆฌ์งํด๋์ค ๋ฆฌ์์ค 
    ๊ฐ ์คํ ๋ฆฌ์งํด๋์ค์๋ ํด๋น ์คํ ๋ฆฌ์งํด๋์ค์ ์ํ๋ ํผ์์คํดํธ๋ณผ๋ฅจ์ ๋์ ์ผ๋ก ํ๋ก๋น์ ๋ ํ  ๋ ์ฌ์ฉ๋๋ provisioner, parameters ์ reclaimPolicy ํ๋๊ฐ ํฌํจ๋๋ค.

    ์คํ ๋ฆฌ์งํด๋์ค ์ค๋ธ์ ํธ์ ์ด๋ฆ์ ์ค์ํ๋ฉฐ, ์ฌ์ฉ์๊ฐ ํน์  ํด๋์ค๋ฅผ ์์ฒญํ  ์ ์๋ ๋ฐฉ๋ฒ์ด๋ค. 
    ๊ด๋ฆฌ์๋ ์คํ ๋ฆฌ์งํด๋์ค ์ค๋ธ์ ํธ๋ฅผ ์ฒ์ ์์ฑํ  ๋ ํด๋์ค์ ์ด๋ฆ๊ณผ ๊ธฐํ ํ๋ผ๋ฏธํฐ๋ฅผ ์ค์ ํ๋ฉฐ, ์ผ๋จ ์์ฑ๋ ์ค๋ธ์ ํธ๋ ์๋ฐ์ดํธํ  ์ ์๋ค.

    ๊ด๋ฆฌ์๋ ํน์  ํด๋์ค์ ๋ฐ์ธ๋ฉ์ ์์ฒญํ์ง ์๋ PVC์ ๋ํด์๋ง ๊ธฐ๋ณธ ์คํ ๋ฆฌ์งํด๋์ค๋ฅผ ์ง์ ํ  ์ ์๋ค. 
    ```

    <br/>

    * ์ฟ ๋ฒ๋คํฐ์ค์์๋ ์๋์ ๊ฐ์ด ์ ์ ํ  ์ ์๋ค

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

    * ์ฆ ๊ฐ๋จํ๊ฒ ๋งํด์ PV๋ฅผ ๋ฏธ๋ฆฌ ์ ์ธํด์ฃผ๋ ๊ฒ์ด๋ผ๊ณ  ์ดํดํ๋๊ฒ ํธํ๋ค.
    * ๋ณดํต PV ์ ์ธ -> PVC ์ ์ธ์ ๊ณผ์ ์ ๊ฑฐ์ณ์ผ ํ์ง๋ง ์คํ ๋ฆฌ์ง ํด๋์ค๋ฅผ ๋ฏธ๋ฆฌ ์ ์ํด๋์ผ๋ฉด PV์ ์ธ ๊ณผ์ ์ ์๋ตํ  ์ ์๋ค.


<br/>

---

## โ ์ด์  GCP์ NFS(Filestore)๋ฅผ ๊ตฌ์ฑํด๋ณด์ฃ 

<br/>

### GCP NFS ์ค์ 

<br/>


* ์ฐ์  GCP Console์์ FILEStore API๋ฅผ ์ค์นํด์ค๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-10-22 18-39-50](https://user-images.githubusercontent.com/69498804/96854037-0404b780-1496-11eb-81c4-922d294a441d.png)

<br/>

* ๊ทธ ํ Console TAP์ Filestore ๋ฉ๋ด์์ ์ธ์คํด์ค๋ฅผ ์์ฑํด์ค๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-10-22 18-45-28](https://user-images.githubusercontent.com/69498804/96854705-c3f20480-1496-11eb-89dc-3a46f4b99df6.png)


<br/>

* ์์ฑ์ด ์๋ฃ๋์๋ค๋ฉด ์๋์ผ๋ก NFS๊ฐ ์ฐ๋๋ฉ๋๋ค. ์์๋ก Jenkins ์ธ์คํด์ค์์ Showmount ๋ช๋ น์ผ๋ก ํ์ธํด๋ด์๋ค

     ```cs
    [root@jenkins ~]# 
    [root@jenkins ~]# showmount -e 10.254.194.122
    Export list for 10.254.194.122:
    /nfs_share 192.168.0.0/16,172.16.0.0/12,10.0.0.0/8
    [root@jenkins ~]# 
    [root@jenkins ~]# 
    ```
    NFS๋ผ๋ฆฌ ์ ์ฐ๊ฒฐ๋์ด์๋๊ฑธ ํ์ธํ์ต๋๋ค!!

<br/>


``FileStore๋ฅผ ์ด์ฉํ NFS ๊ตฌ์ฑ์ ์ ๋ง ๊ฐ๋จํฉ๋๋ค. ๋น์ฉ๋ง์๋๋ฉด ๋งค์ผ ์ฐ๊ณ  ์ถ๋ค์``

<br/>

---

### NFS๋ฅผ GKE์ ๋ณผ๋ฅจ์ผ๋ก ์ฌ์ฉ

[๊ณต์ ๋ฌธ์](https://cloud.google.com/filestore/docs/accessing-fileshares?hl=ko)

<br/>
<br/>


### PV ์์ฑ

* NFS๋ฅผ ๋ณผ๋ฅจ์ผ๋ก ์ด์ฉํ๊ธฐ ์ํด์ ์๋์ ๊ฐ์ ๋ฉ๋ํ์คํธ ํ์ผ์ ์์ฑํ์ต๋๋ค.


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

    PV๋ฅผ ์์ฑํ ๋ NFS์๋ฒ์ IP์ path๋ฅผ ์ ๋๋ก ์ค์ ํด์ฃผ์ง ์์ผ๋ฉด  
    ์๋์ ๊ฐ์ ``NFS MOUNT ERROR``๊ฐ ๋ฐ์ํฉ๋๋ค


    ```cs
    Search
    Warning	FailedMount	Unable to attach or mount volumes: unmounted volumes=[mysql-vol], unattached volumes=[default-token-6778k mysql-vol]: timed out waiting for the condition	2 minutes ago
    Warning	FailedMount	MountVolume.SetUp failed for volume "dbserver" : mount failed: exit status 1 Mounting command: systemd-run Mounting arguments: --description=Kubernetes transient mount for /var/lib/kubelet/pods/d28155b1-9c27-4f6e-b1b7-9169c926f784/volumes/kubernetes.io~nfs/dbserver --scope -- /home/kubernetes/containerized_mounter/mounter mount -t nfs -o hard,nfsvers=3 10.254.194.120:/file-share /var/lib/kubelet/pods/d28155b1-9c27-4f6e-b1b7-9169c926f784/volumes/kubernetes.io~nfs/dbserver Output: Running scope as unit: run-r3af88159402a4b1ab6bc70512f1cbc1d.scope Mount failed: mount failed: exit status 32 Mounting command: chroot Mounting arguments: [/home/kubernetes/containerized_mounter/rootfs mount -t nfs -o hard,nfsvers=3 10.254.194.120:/file-share /var/lib/kubelet/pods/d28155b1-9c27-4f6e-b1b7-9169c926f784/volumes/kubernetes.io~nfs/dbserver] Output: mount.nfs: Connection timed out	2 minutes ago
    ```

    <br/>

* ์ถ๊ฐ์ ์ผ๋ก storageClassName: "" ํญ๋ชฉ์ None์ผ๋ก ๋ฌ์ผ๋ง ํฉ๋๋ค.  
๊ทธ๋์ผ GKE ๊ธฐ๋ณธ ์คํ ๋ฆฌ์ง ํด๋์ค์ธ GCP-PD ํ์์ PV๋ฅผ ์์ฑํ์ง ์๊ธฐ ๋๋ฌธ์  
NONE์ด ํ์์ ์๋๋ค! ์ด ํญ๋ชฉ๋ NONE์ด ์๋ ๊ฒฝ์ฐ ์์ ๊ฐ์ ์๋ฌ๊ฐ ๋ฐ์ํฉ๋๋ค.

<br/>

---


### PVC ์์ฑ

* NFS๋ฅผ ๋ณผ๋ฅจ์ผ๋ก ์ด์ฉํ๊ธฐ ์ํด์ ์๋์ ๊ฐ์ ๋ฉ๋ํ์คํธ ํ์ผ์ ์์ฑํ์ต๋๋ค.

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

    PVC์ ๊ฒฝ์ฐ ๋ณ๋ก ๋ฐ๊ฟ์ค ๊ฒ์ด ์์ต๋๋ค. ๋ค๋ง ``storageClassName = NONE``์ด๊ธฐ ๋๋ฌธ์  
      ``volumeName: dbserver`` ํญ๋ชฉ์ผ๋ก PV๋ฅผ ์ก์์ฃผ์ด์ผ ์ํ ํ๊ฒ ๋ฐ์ด๋ฉ ๋ฉ๋๋ค!

<br/>


* ๊ทธ๋ผ PVC๋ฅผ ์์ฑํ์ผ๋ PV <-> PVC๊ฐ ๋ฐ์ด๋ฉ๋์๋์ง ํ์ธํด๋ด์๋ค

    ```cs
    > kubectl get pv -n cd-test
    NAME       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM               STORAGECLASS   REASON   AGE
    dbserver   10Gi       RWX            Retain           Bound    cd-test/mysql-pvc                           28m
    > kubectl get pvc -n cd-test
    NAME        STATUS   VOLUME     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    mysql-pvc   Bound    dbserver   10Gi       RWX                           28m
    ```

    ๋๋ฌด ์ ์์ ์๋๋ค~ ์ด์  MYSQL POD๋ฅผ ๋ฐฐํฌํด๋ด์๋ค!

<br/>

---




### MYSQL POD ๋ฐฐํฌ

<br/>

* MYSQL ๋ฐฐํฌ๋ฅผ ์ํด ์๋์ ๊ฐ์ ๋ฉ๋ํ์คํธ ํ์ผ์ ์์ฑํ์ต๋๋ค.




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
            value: [๋น๋ฒ์ ์๋๋๋ค]
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

* ๋ค์๊ณผ ๊ฐ์ ๋ฐฐํฌ ๋ฉ๋ํ์คํธ๋ก ๋ฐฐํฌ๋ฅผ ํ๋ฉด! ์๋์ ๊ฐ์ด ์ ์์ ์ผ๋ก ๊ตฌ๋์ด ๋ฉ๋๋ค!!


    ![์คํฌ๋ฆฐ์ท, 2020-10-23 15-15-52](https://user-images.githubusercontent.com/69498804/96962891-a7aba180-1542-11eb-9d2d-3eb34c814aed.png)


<br/>


----



### ์๋ฌ ๋ฐ์..ใ 

``MYSQL Unable to lock ./ib_logfile0, error: 11``


<br/>

* MYSQL Deployment์ Replicas ๋ฅผ 2๋ก ์ค์  ํ ์ด์คํ๋ฅผ ํ๋ ค๋๊น ์๋์ ๊ฐ์ ERROR๊ฐ ๋ฐ์ํ์๋ค.

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

* ๊ฒ์์ ์ซ ํด๋ณด๋ ๋ด ํ๊ฒฝ์ NFS๋ก dataํ์ผ์ ๋ฐ์์ค๋ ๊ตฌ์กฐ์ด๋ค ๋ณด๋ ํ์ชฝ์ MYSQL Pod๊ฐ mysql์ ์คํ์ํค๋ฉด์   
ํด๋น ๋ฐ์ดํฐํ์ผ์ ์ฌ์ฉํ๊ณ  ์์ผ๋ฉด ๋ค๋ฅธ์ชฝ์์๋ ์ฌ์ฉํ์ง ๋ชปํ๋ ์ด์์๋ค.


<br/>

* Rancher UI์์ ํ์ธํด๋ณด๋ ์ปจํ์ด๋๊ฐ ๊ณ์ ์ฌ์์ ๋๊ณ  ์๋ค ใ ใ 

    ![์คํฌ๋ฆฐ์ท, 2020-10-23 14-15-19](https://user-images.githubusercontent.com/69498804/96963063-f35e4b00-1542-11eb-8671-2c25c1f6236d.png)

<br/>

* ๋จธ๋ฆฌ๋ง์์๋ ์ธ๊ธํ๋ฏ์ด ์ด์คํ๋ณด๋ค๋ NFS๋ก DB ๋ฐ์ดํฐ๋ฅผ ๋ฐ์์ค๋ ๊ฒ๊ณผ ๋ณ ์ฐจ์ด๊ฐ ์๋ค๊ณ  ์๊ฐ์ ํ์ต๋๋ค.  
๊ทธ๋์ ์์ Mysql ๋ฐฐํฌ ๋ฉ๋ํ์คํธ ํ์ผ์ replicas๋ฅผ 1๋ก ๋๋ ๊ฒ์ผ๋ก ๋ง๋ฌด๋ฆฌ ํ์ต๋๋ค



---


### NFS <-> Mysql Data ์ฐ๋ ํ์ธ


replicas๋ฅผ 1๋ก ๋์ด NFS์ ๋ฐ์ดํฐํ์ผ์ ์ฐ๋ํ POD์์ ํ์ธํด๋ด์๋ค!


* ์ฐ์  MYSQL๊ณผ ์ฐ๋ํ ์ทจ์ฝ์  ๊ฒ์ฌ WEB์์ ์์ด๋๋ฅผ ํ๋ ๋ง๋ค์ด๋ณด์ฃ  ํด๋น ID ๋ฐ์ดํฐ๋ MYSQL DB์ ์ ์ฅ๋ฉ๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-10-23 15-22-18](https://user-images.githubusercontent.com/69498804/96963398-8c8d6180-1543-11eb-8cb1-52c331066848.png)

    test2๋ผ๋ User๋ฅผ ๋ง๋ค์์ต๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-10-23 15-25-06](https://user-images.githubusercontent.com/69498804/96963649-f148bc00-1543-11eb-9ff7-25c533985471.png)


<br/>


* MYSQL POD๋ก ๊ฐ์ ๋ฐ์ดํฐ๋ฅผ ํ์ธํด๋ด์๋ค.

    ์๋์ ๊ฐ์ด DB Table์ Account ์ ๋ณด๊ฐ ์ ๋ค์ด์ ์๋ค์
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


### ์ด์  MYSQL POD๋ฅผ ๊ฐ์ ๋ก ์ฃฝ์ธ ๋ค ๋ค์ ๊ฐ๋์์ผ์ DB DATA๋ฅผ ํ์ธํด๋ณด๊ฒ ์ต๋๋ค


<br/>

* Rancher์์๋ POD๋ฅผ ๋ค์๊ณผ ๊ฐ์ด ๊ฐ๋จํ๊ฒ ์ข๋ฃ ์ํฌ ์ ์์ต๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-10-23 15-29-29](https://user-images.githubusercontent.com/69498804/96963953-8ea3f000-1544-11eb-9963-c488299be958.png)

<br/>

* Deployement๊ฐ POD๋ฅผ ์ฌ์์ ์์ผ ์ด์ ๊ณผ ๋ค๋ฅธ ์ด๋ฆ์ผ๋ก ์ปจํ์ด๋๊ฐ ๊ฐ๋ ๋์ต๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-10-23 15-30-20](https://user-images.githubusercontent.com/69498804/96964025-ad09eb80-1544-11eb-9bd6-0f30336e6e03.png)


<br/>

* ์๋ก ์์ฑ๋ ์ปจํ์ด๋์ ์ ์ํด์ DB ๋ฐ์ดํฐ๋ฅผ ๋ณด๋ฉด ๊ธฐ์กด์ ์ถ๊ฐํ๋ test2 user ์ ๋ณด๊ฐ ๋จ์์์ต๋๋ค

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

* ๋ฌผ๋ก  ์นํ์ด์ง์์๋ ์ ์์ด ์ํํฉ๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-10-23 15-33-20](https://user-images.githubusercontent.com/69498804/96964242-17229080-1545-11eb-8632-0a6251fc34d8.png)

<br/>

----


## ๋ง์น๋ฉฐโฆ  

์ด๋ฒ์ ์๋กญ๊ฒ FileStore๋ผ๋ GCP์ ๊ธฐ๋ฅ์ ์ฌ์ฉํด๋ดค์ต๋๋ค.  
์ง์ง ์ด์ ์ ๋ธ๊ฐ๋ค์์ผ๋ก ํ์๋ NFS ์๋ฒ ๊ตฌ์ฑ์ด ๋๋ฌด ๋ฌด์๋ฏธํด์ง๋ ์๋น์ค์๋๋ค  
์ด๋ฒ ์ค์ต์ ์ ํด๋ผ์ฐ๋ ์๋น์ค ํ๋์ง ์ ๊ฒ๊ฐ์ ์ค์ต์ด์์ต๋๋ค  
๋น๋ก ๊ธฐ์กด์ ์๊ฐํ๋ MYSQL POD์ Active/slave,Heartbeat ๋ฐฉ์์ ์ด์คํ๋ ๋ชปํ์ง๋ง nfs์์ ๋ฐ์ดํฐ๋ฅผ ๋ฐ์์ค๋ ๊ฒ๋ ๋ง์กฑํ ์๋น์ค ์ธ ๊ฒ ๊ฐ์ต๋๋ค.
์ด๋ฒ ํฌ์คํธ๊น์ง ์ด์  ์ ๋ฐ์ ์ธ ์๋น์ค ๊ตฌ์ฑ์ ๋ง๋ฌด๋ฆฌ ์ง์ ๊ฒ ๊ฐ์ต๋๋ค.  
์ด์ ๋ ๋ณด์ํด๊ณผ ์ทจ์ฝ์  ๊ฒ์ฌ, ARgo-cd ์๋ํ ๋ฑ์ ์งํํด์ผ๊ฒ ์ฃ ...


---

```toc
```