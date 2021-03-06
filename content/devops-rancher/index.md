---
emoji: ๐คฆโโ๏ธ
title: "[DEVOPS] - Rancher๋ฅผ ์ฌ์ฉํ Kubernetes Cluster ๊ตฌ์ถ"
date: "2021-08-05 00:41:25"
author: nasa1515
tags: DevOps
categories: DevOps
---



๋จธ๋ฆฌ๋ง  

์๋ํ์ธ์ NASA์๋๋ค!!.  
์ด๋ฒ ํฌ์คํธ์์๋ Open Source์ธ Rancher๋ฅผ ์ด์ฉํ k8s ํด๋ฌ์คํฐ ๊ตฌ์ถ์ ๋ํ ํฌ์คํธ์๋๋ค  

---


* ์ฌ์ฉ ํ  ํด์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.  

- Rancher (GCP INSTANCE)
- k8s (GKE), ON-PRE๋ก ๊ตฌ์ฑ๋ ํด๋ฌ์คํฐ
- ARgoCD

---

<br/>

## โ RANCHE ํ๊ฒฝ์ผ๋ก ์๋น์ค ๊ตฌ์ถ์ ํด๋ด์๋ค.

Rancher๋ Rancher Labs์์ ๊ฐ๋ฐํ ์คํ ์์ค์ปจํ์ด๋ ์ค์ผ์คํธ๋ ์ด์ ํ๋ซํผ  
Rancher 2.0(ํ์ฌ ๋ฒ์ )์ Kubernetes ๊ธฐ๋ฐ์ผ๋ก ๊ฐ๋ฐ๋์์ผ๋ฉฐ ๊ธฐ์กด ์จํ๋ ๋ฏธ์ค ํ๊ฒฝ์   
๋น๋กฏํ ๋ฉํฐ ํด๋ผ์ฐ๋ ํ๊ฒฝ์ ํตํฉ ๊ด์ ํ  ์ ์๋๋ก ์ง์ํฉ๋๋ค. 

![์คํฌ๋ฆฐ์ท, 2020-10-22 15-52-21](https://user-images.githubusercontent.com/69498804/96835487-99944d00-147e-11eb-883d-602a97991ed7.png)


<br/>

-----

### RANCHER๋ก K8S ํด๋ฌ์คํฐ ๊ตฌ์ฑ


<br/>

* DOCKER ์ค์น [์  ๋ธ๋ ๋์ผํ๊ฒ ์งํ]

    ```cs
    yum repository ์ค์  ์ถ๊ฐ
    $ sudo yum install -y yum-utils device-mapper-persistent-data lvm2
    $ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    ```

<br/>

* ๋์ปค ์ค์น

  ```cs
  sudo yum -y install docker-ce docker-ce-cli containerd.io
  ```

<br/>

* ๋์ปค ์ค์น ํ์ธ

    ```cs
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo docker version
    Client: Docker Engine - Community
    Version:           19.03.13
    API version:       1.40
    Go version:        go1.13.15
    Git commit:        4484c46d9d
    Built:             Wed Sep 16 17:03:45 2020
    OS/Arch:           linux/amd64
    Experimental:      false

    Server: Docker Engine - Community
    Engine:
    Version:          19.03.13
    API version:      1.40 (minimum version 1.12)
    Go version:       go1.13.15
    Git commit:       4484c46d9d
    Built:            Wed Sep 16 17:02:21 2020
    OS/Arch:          linux/amd64
    Experimental:     false
    containerd:
    Version:          1.3.7
    GitCommit:        8fba4e9a7d01810a393d5d25a3621dc101981175
    runc:
    Version:          1.0.0-rc10
    GitCommit:        dc9208a3303feef5b3839f4323d9beb36df0a9dd
    docker-init:
    Version:          0.18.0
    GitCommit:        fec3683
    ```

<br/>

---

### Docker in RANCHER


๋ค๋ง!!! ๊ทธ์ ์ ์ฌ์ ์ค๋น๊ฐ ์์ต๋๋ค

WDI ํ๊ฒฝ์์ rancher๋ฅผ ํตํด k8s ํด๋ฌ์คํฐ๋ฅผ ๊ด๋ฆฌํ๊ธฐ ์ํด์, ๋ณด์์ ์ฑ์ ์ถ๊ฐ port ์คํ์ด ํ์ํฉ๋๋ค.   

RANCHER์ ์ฌ์ฉ๋๋ ํฌํธ๋ [๊ณต์ ๋ฌธ์](https://rancher.com/docs/rancher/v2.x/en/installation/references/)์์ ํ์ธ ๊ฐ๋ฅํฉ๋๋ค.


๋ณด์ ์ ์ฑ์์ inbound ํฌํธ๋ฅผ ํ์ฉํ๋๋ก ๋ฑ๋กํฉ๋๋ค.  
๊ทธ๋ฌ๋ ์ ์ ๊ฒฝ์ฐ Firewall์ ์ข๋ฃํ๋ ๊ฒ์ผ๋ก ๋ง๋ฌด๋ฆฌ ํ์ต๋๋ค..  
๋ค๋ง GCP์ ํ๊ฒฝ์ผ ๊ฒฝ์ฐ GCP์ ๋ฐฉํ๋ฒฝ์์๋ ์ด์ฌ์ค์ผ ํฉ๋๋ค! 

```cs
2376 TCP
2379-2380 TCP
8472 UDP
9099 TCP
6783 TCP
6783-6784 UDP
10250 TCP
10254 TCP
30000-32767 TCP/UDP
```

<br/>

---


### ์ค์น    

[๊ณต์๋ฌธ์](https://rancher.com/docs/rancher/v2.x/en/installation/single-node/)  

์ ์ ๊ฒฝ์ฐ nasa-master : rancher ๋ฉ์ธ ์๋ฒ๋ฅผ ํ๋๋ง ์ฌ์ฉํ๊ณ   
๋๋จธ์ง nasa-node1-2 : agent๋ก ์ ์ฒด ์๋ฒ์ ์ฌ์ฉํ๋ ๊ตฌ์กฐ๋ก ์งํํ  ์์ ํ์ต๋๋ค.  

<br/>

* MASTER ์๋ฒ Rancher Server ์ค์น

    ```cs
    docker run -d --restart=unless-stopped \
    --privileged -p 80:80 -p 443:443 \
    -v /host/certs:/container/certs \
    -e SSL_CERT_DIR="/container/certs" \
    rancher/rancher:latest
    ```

<br/>

* ๊ฐ๋จํ๊ฒ ์ค์น๋ฅผ ํ๋ฉด GCP์ External Ip๋ก ๋์ฌ๋ณด๋ ์ ๊ทผ์ด ๊ฐ๋ฅํฉ๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-09-24 11-22-26](https://user-images.githubusercontent.com/69498804/94093474-3f40a600-fe58-11ea-96a4-f39b52a40e5c.png)
    ์ดํ ๊ด๋ฆฌ์ PWD ์ค์ ๋ฑ์ ๋ง๋ฌด๋ฆฌ ํด์ค์๋ค

<br/>

---

### ์ด์  K8S ํด๋ฌ์คํฐ๋ฅผ ์์ฑ ํ ๋ธ๋๋ฅผ ์ฐ๊ฒฐ ํด๋ด์๋ค


<br/>

* Clusters > Add Cluster  
ํด๋ฌ์คํฐ ์ ํ Custom, Cluster ์ ๊ณต์ Custom ๋๋จธ์ง ์ต์์ ๊ธฐ๋ณธ ๊ฐ์ผ๋ก ์งํํฉ๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-09-24 14-01-52](https://user-images.githubusercontent.com/69498804/94103036-80dc4b80-fe6e-11ea-97a0-8e337e937af2.png)
    
<br/>

* ๊ธฐ๋ณธ ๊ตฌ์ฑ์ ๋ง์น๋ฉด Cluster์ Node๋ฅผ ์ถ๊ฐ ํ  ์ ์์ต๋๋ค.
    ![์คํฌ๋ฆฐ์ท, 2020-09-24 13-55-47](https://user-images.githubusercontent.com/69498804/94102680-a9177a80-fe6d-11ea-8817-c3ce799320ec.png)
    ์์์ ๊ฐ Node์ ์ญํ  ๋ณ ์ฒดํฌ๋ฐ์ค์ ์ฒดํฌ ํ ์๋์ ์คํฌ๋ฆฝํธ๋ฅผ ๋ถํ๋ฃ์ผ๋ฉด ๋ฉ๋๋ค.  
    ์ถ๊ฐ๋ก ``Show Advance options`` tab์์ Node์ IP, ์ด๋ฆ์ ์ถ๊ฐ๋ก ์ค์  ๊ฐ๋ฅํฉ๋๋ค


<br/>

* ์ ์ ๊ฒฝ์ฐ Master๋ ALL, Node1-2๋ Worker๋ก ์ฌ์ฉํ  ๊ฒ๋๋ค 

    ```cs
    [root@rancher-node2 ~]# sudo docker run -d --privileged --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run rancher/rancher-agent:v2.4.8 --server https://34.64.79.179 --token rpkc8zzs7mvzq4ng8lszpp5ncpfvfl6tm7c2bkmlcvfjb9ncgtzq49 --ca-checksum e9f82b3c16848a400fa3c5839dd1f7e23dbfbd1a2912dace1cbfca72366581f0 --node-name rancher-node2 --address 34.64.144.38 --internal-address 34.64.144.38 --worker
    Unable to find image 'rancher/rancher-agent:v2.4.8' locally
    v2.4.8: Pulling from rancher/rancher-agent
    f08d8e2a3ba1: Pull complete 
    3baa9cb2483b: Pull complete 
    94e5ff4c0b15: Pull complete 
    1860925334f9: Pull complete 
    e5d12d0f9a84: Pull complete 
    5116e686c448: Pull complete 
    d4f72327bfd0: Pull complete 
    61bcbcce7861: Pull complete 
    fca783017521: Pull complete 
    29ab00ed6801: Pull complete 
    Digest: sha256:c8a111e6250a313f1dd5d34696ddbef9068f70ddf4b15ab4c9cefd0ea39b76c1
    Status: Downloaded newer image for rancher/rancher-agent:v2.4.8
    db357cd36dc9c2fda9cfce9e42177b560e0e5d25faae743747541bba4b0b92b5
    ```

<br/>

* ๊ฐ ๋ธ๋์ ์คํฌ๋ฆฝํธ๋ฅผ ์๋ ฅ ํ 5~8๋ถ์ ๋ ์ง๋๋ฉด ์๋์ ๊ฐ์ด ํด๋ฌ์คํฐ๊ฐ ์์ฑ๋ฉ๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-09-24 14-18-44](https://user-images.githubusercontent.com/69498804/94103986-dd406a80-fe70-11ea-858e-3b27ef50a871.png)

<br/>

* ์ ์์ ์ผ๋ก k8s์ ๋ฐฐํฌ๊ฐ ์๋ฃ ๋์๋์ง Rancher์์ ์ง์ํ๋ CLI๋ก ํ์ธํด๋ด์๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-09-24 14-21-40](https://user-images.githubusercontent.com/69498804/94104127-458f4c00-fe71-11ea-8e6b-6d21402da47c.png)


<br/>

* ์ ์์ ์ผ๋ก ๋ธ๋ ์ ๋ณด๋ฅผ ๋ฐ์์ต๋๋ค

    ![์คํฌ๋ฆฐ์ท, 2020-09-24 14-22-27](https://user-images.githubusercontent.com/69498804/94104178-6192ed80-fe71-11ea-911a-7f8350316725.png)


<br/>

* ์ถ๊ฐ์ ์ผ๋ก ๋์ฌ๋ณด๋์ Cluster ํญ์ ํ์ธํด๋ณด๋ฉด Cluster๋ค์ ์ํ๋ฅผ ๋ชจ๋ํฐ๋ง ํ  ์ ์์ต๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-09-24 14-24-29](https://user-images.githubusercontent.com/69498804/94104307-aae33d00-fe71-11ea-938e-da9101a39fef.png)

### ์ ์ด์  Rancher๋ก ๊ธฐ๋ณธ์ ์ธ ํด๋ฌ์คํฐ ๊ตฌ์ฑ์ด ์๋ฃ๋์์ต๋๋ค.!


---

### ๋ง์น๋ฉฐโฆ  

์ด๋ฒ ํฌ์คํธ์์๋ Rancher๋ฅผ ์ฌ์ฉํด์ k8s ํด๋ฌ์คํฐ๋ฅผ ์์ฑํ๋ ๋ฒ์ ์์๋ดค์ต๋๋ค.  
์ฌ์ค ์ด์ ๊น์ง๋ ํด๋ฌ์คํฐ๋ฅผ ๊ตฌ์ถํ ๋ kubeadm์ผ๋ก ํ๋ํ๋ ์ค์ ์ ์ก์์ฃผ๋ฉด์ ๊ตฌ์ถํ์๋๋ฐ   
์ฐ์ฐํ Rancher๋ผ๋ ํด์ ์๊ฒ๋์ด ์ฌ์ฉํด๋ดค๋๋ฐ ๋ง์กฑํฉ๋๋ค   
Rancher์ ๋ํ ์ถ๊ฐํฌ์คํธ๋ก ๋ชจ๋ํฐ๋ง์ด๋ ํด๋ฑ์ ์ฐ๋ํ๋ ํฌ์คํธ๋ ์ถํ์ ์ฌ๋ฆด ์์ ์ด๊ตฌ์!   
๋ค์ ํฌ์คํธ์๋ GKE ๊ธฐ๋ฐ์ ํด๋ฌ์คํฐ๋ฅผ Rancher๋ก ์์ฑ, ์ฐ๋ํ๋ ํฌ์คํธ์๋๋ค!!.



---

```toc
```

