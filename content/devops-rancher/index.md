---
emoji: 🤦‍♂️
title: Rancher를 사용한 Kubernetes Cluster 구축 [DevOps]
date: "2021-08-05 00:41:25"
author: nasa1515
tags: DevOps
categories: DevOps
---



머리말  

안녕하세요 NASA입니다!!.  
이번 포스트에서는 Open Source인 Rancher를 이용한 k8s 클러스터 구축에 대한 포스트입니다  

---


* 사용 할 툴을 다음과 같습니다.  

- Rancher (GCP INSTANCE)
- k8s (GKE), ON-PRE로 구성된 클러스터
- ARgoCD

---

<br/>

## ✔ RANCHE 환경으로 서비스 구축을 해봅시다.

Rancher는 Rancher Labs에서 개발한 오픈 소스컨테이너 오케스트레이션 플랫폼  
Rancher 2.0(현재 버전)은 Kubernetes 기반으로 개발되었으며 기존 온프레미스 환경을   
비롯한 멀티 클라우드 환경을 통합 관제할 수 있도록 지원합니다. 

![스크린샷, 2020-10-22 15-52-21](https://user-images.githubusercontent.com/69498804/96835487-99944d00-147e-11eb-883d-602a97991ed7.png)


<br/>

-----

### RANCHER로 K8S 클러스터 구성


<br/>

* DOCKER 설치 [전 노드 동일하게 진행]

    ```cs
    yum repository 설정 추가
    $ sudo yum install -y yum-utils device-mapper-persistent-data lvm2
    $ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    ```

<br/>

* 도커 설치

  ```cs
  sudo yum -y install docker-ce docker-ce-cli containerd.io
  ```

<br/>

* 도커 설치 확인

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


다만!!! 그전에 사전준비가 있습니다

WDI 환경에서 rancher를 통해 k8s 클러스터를 관리하기 위해서, 보안정책에 추가 port 오픈이 필요합니다.   

RANCHER에 사용되는 포트는 [공식 문서](https://rancher.com/docs/rancher/v2.x/en/installation/references/)에서 확인 가능합니다.


보안 정책에서 inbound 포트를 허용하도록 등록합니다.  
그러나 저의 경우 Firewall을 종료하는 것으로 마무리 했습니다..  
다만 GCP의 환경일 경우 GCP의 방화벽에서는 열여줘야 합니다! 

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


### 설치    

[공식문서](https://rancher.com/docs/rancher/v2.x/en/installation/single-node/)  

저의 경우 nasa-master : rancher 메인 서버를 한대만 사용하고  
나머지 nasa-node1-2 : agent로 전체 서버에 사용하는 구조로 진행할 예정했습니다.  

<br/>

* MASTER 서버 Rancher Server 설치

    ```cs
    docker run -d --restart=unless-stopped \
    --privileged -p 80:80 -p 443:443 \
    -v /host/certs:/container/certs \
    -e SSL_CERT_DIR="/container/certs" \
    rancher/rancher:latest
    ```

<br/>

* 간단하게 설치를 하면 GCP의 External Ip로 대쉬보드 접근이 가능합니다

    ![스크린샷, 2020-09-24 11-22-26](https://user-images.githubusercontent.com/69498804/94093474-3f40a600-fe58-11ea-96a4-f39b52a40e5c.png)
    이후 관리자 PWD 설정등을 마무리 해줍시다

<br/>

---

### 이제 K8S 클러스터를 생성 후 노드를 연결 해봅시다


<br/>

* Clusters > Add Cluster  
클러스터 유형 Custom, Cluster 제공자 Custom 나머지 옵션은 기본 값으로 진행합니다

    ![스크린샷, 2020-09-24 14-01-52](https://user-images.githubusercontent.com/69498804/94103036-80dc4b80-fe6e-11ea-97a0-8e337e937af2.png)
    
<br/>

* 기본 구성을 마치면 Cluster의 Node를 추가 할 수 있습니다.
    ![스크린샷, 2020-09-24 13-55-47](https://user-images.githubusercontent.com/69498804/94102680-a9177a80-fe6d-11ea-8817-c3ce799320ec.png)
    위에서 각 Node의 역할 별 체크박스에 체크 후 아래의 스크립트를 붙혀넣으면 됩니다.  
    추가로 ``Show Advance options`` tab에서 Node의 IP, 이름을 추가로 설정 가능합니다


<br/>

* 저의 경우 Master는 ALL, Node1-2는 Worker로 사용할 겁니다 

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

* 각 노드에 스크립트를 입력 후 5~8분정도 지나면 아래와 같이 클러스터가 생성됩니다

    ![스크린샷, 2020-09-24 14-18-44](https://user-images.githubusercontent.com/69498804/94103986-dd406a80-fe70-11ea-858e-3b27ef50a871.png)

<br/>

* 정상적으로 k8s의 배포가 완료 되었는지 Rancher에서 지원하는 CLI로 확인해봅시다

    ![스크린샷, 2020-09-24 14-21-40](https://user-images.githubusercontent.com/69498804/94104127-458f4c00-fe71-11ea-8e6b-6d21402da47c.png)


<br/>

* 정상적으로 노드 정보를 받아옵니다

    ![스크린샷, 2020-09-24 14-22-27](https://user-images.githubusercontent.com/69498804/94104178-6192ed80-fe71-11ea-911a-7f8350316725.png)


<br/>

* 추가적으로 대쉬보드의 Cluster 탭을 확인해보면 Cluster들의 상태를 모니터링 할 수 있습니다.

    ![스크린샷, 2020-09-24 14-24-29](https://user-images.githubusercontent.com/69498804/94104307-aae33d00-fe71-11ea-938e-da9101a39fef.png)

### 자 이제 Rancher로 기본적인 클러스터 구성이 완료되었습니다.!


---

### 마치며…  

이번 포스트에서는 Rancher를 사용해서 k8s 클러스터를 생성하는 법을 알아봤습니다.  
사실 이전까지는 클러스터를 구축할때 kubeadm으로 하나하나 설정을 잡아주면서 구축했었는데   
우연히 Rancher라는 툴을 알게되어 사용해봤는데 만족합니다   
Rancher에 대한 추가포스트로 모니터링이나 툴등을 연동하는 포스트도 추후에 올릴 예정이구요!   
다음 포스트에는 GKE 기반의 클러스터를 Rancher로 생성, 연동하는 포스트입니다!!.



---

```toc
```

