---
emoji: 🤦‍♂️
title: Kubernetes 환경구성 on GCP Using kubeadm    [Kubernetes] [GCP]
date: "2021-06-29 00:07:11"
author: nasa1515
tags: Kubernetes GCP
categories: Kubernetes GCP
---

머리말  

이전 포스트에서는 kubespay 자동화 툴을 사용해서 K8S 클러스터를 구축 했었습니다.  
이번 포스트에서는 kubeadm을 이용해서 K8S 클러스터를 구축하는 방법에 대해서 포스트했습니다.  



---

## ✔ 사전준비

사전 준비의 경우 kubespray와 동일하게 GCP VM Instance에서 구성했기 때문에 방법이 동일합니다.  
사전 준비는 [이전 포스트](https://nasa1515.tech/kubetnetes-kubespary/)인 kubespray를 확인해주세요.

<br/>

---

## ✌ 쿠버네티스  설치하기 [kubeadm]


본격적인 설치 과정입니다.
``Kubeadm``은 ``Kubelet`` 과 ``Kubectl`` 을 ``설치하지 않기`` 때문에 직접 설치해야 합니다.  

<br/>

전체 Server에 아래 ``Repo``를 추가합니다.  


```cs
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
exclude=kube*
EOF
```

<br/>
<br/>

CENSOS yum update

```cs
$ yum -y update
```

<br/>
<br/>

도커 설치 전 사전 세팅 

```cs
$ yum install -y yum-utils device-mapper-persistent-data lvm2 
```

<br/>
<br/>

도커 저장소 설정

```cs
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

<br/>
<br/>

도커 패키지 설치

```cs
yum update && yum install docker-ce-18.06.2.ce
```

<br/>
<br/>

쿠버네티스 설치  

 
```cs
yum install -y --disableexcludes=kubernetes kubeadm-1.15.5-0.x86_64 kubectl-1.15.5-0.x86_64 kubelet-1.15.5-0.x86_64
```

1.15 버전으로 설치하는 이유 : 헬스체크 이슈, 대쉬보드 호환성


<br/>
<br/>

``Master 노드``에 ``컨트롤 구성 요소를 설치``합니다. 해당 작업은 ``master`` 에서만 실행합니다.  
설치 시 사용할 이미지를 먼저 다운로드 합니다.

```cs
[root@nasa-master ~]# kubeadm config images pull
I0824 02:21:37.374466   13234 version.go:248] remote version is much newer: v1.18.8; falling back to: stable-1.15
[config/images] Pulled k8s.gcr.io/kube-apiserver:v1.15.12
[config/images] Pulled k8s.gcr.io/kube-controller-manager:v1.15.12
[config/images] Pulled k8s.gcr.io/kube-scheduler:v1.15.12
[config/images] Pulled k8s.gcr.io/kube-proxy:v1.15.12
[config/images] Pulled k8s.gcr.io/pause:3.1
[config/images] Pulled k8s.gcr.io/etcd:3.3.10
[config/images] Pulled k8s.gcr.io/coredns:1.3.1
```

<br/>
<br/>

마스터 노드를 ``초기화``합니다.

```cs
[root@nasa-master ~]# kubeadm init
I0824 02:22:23.982576   13371 version.go:248] remote version is much newer: v1.18.8; falling back to: stable-1.15
[init] Using Kubernetes version: v1.15.12
[preflight] Running pre-flight checks
        [WARNING Service-Kubelet]: kubelet service is not enabled, please run 'systemctl enable kubelet.service'
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Activating the kubelet service
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver-kubelet-client" certificate and key
...
...(중략)
-----
Your Kubernetes control-plane has initialized successfully!
To start using your cluster, you need to run the following as a regular user:
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
https://kubernetes.io/docs/concepts/cluster-administration/addons/
Then you can join any number of worker nodes by running the following on each as root:
kubeadm join 10.146.0.6:6443 --token ofhrxu.dgsn2pc08glnfj06 \
    --discovery-token-ca-cert-hash sha256:00f7773eea1e619ea4c5698417679475cb07774b26cd7f738fb82a315f643b5a
```

<br/>
<br/>

여기서 ``일반 사용자``가 ``kubectl`` 을 ``사용``할 수 있도록 환경변수를 설정합니다.

```cs
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

<br/>


---

### WORKER 노드 설정

도커 실행

```cs
systemctl daemon-reload
systemctl enable --now docker
```

<br/>
<br/>

kubelet 실행  

 
```cs
systemctl enable --now kubelet
```

<br/>
<br/>

로그의 ``마지막 라인의 명령어``는 ``워커 노드``를 해당 ``클러스터에 추가``하는 명령어입니다.  
해당 명령어를 복사해서 ``nasa-node1``, ``nasa-node2``, ``nasa-node3`` 노드에서 수행합니다.

```cs
[root@nasa-node1 ~]# kubeadm join 10.146.0.6:6443 --token ofhrxu.dgsn2pc08glnfj06 \--discove
ry-token-ca-cert-hash sha256:00f7773eea1e619ea4c5698417679475cb07774b26cd7f738fb82a315f643b5
a 
[preflight] Running pre-flight checks
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubead
m-config -oyaml'
[kubelet-start] Downloading configuration for the kubelet from the "kubelet-config-1.15" Con
figMap in the kube-system namespace
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubead
m-flags.env"
[kubelet-start] Activating the kubelet service
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...
This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.
Run 'kubectl get nodes' on the control-plane to see this node join the cluster.
```

<br>

### Pod network add-on 설치하기
``Pod`` 은 실제로 여러 노드에 걸쳐 배포되는데, Pod 끼리 하나의 네트워크에 있는 것처럼 통신할 수 있습니다.  
이를 ``오버레이 네트워크(Overlay Network)``라고 합니다.

오버레이 네트워크를 지원하는 ``CNI(Container Network Interface) 플러그인``을 설치해보겠습니다.  
CNI 에는 여러 종류가 있는데, 이번 포스트는 ``Weave`` 를 이용합니다.

<br/>

``Master`` 노드에서 ``weave``를 설치합니다


```cs
[root@nasa-master ~]# kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
serviceaccount/weave-net created
clusterrole.rbac.authorization.k8s.io/weave-net created
clusterrolebinding.rbac.authorization.k8s.io/weave-net created
role.rbac.authorization.k8s.io/weave-net created
rolebinding.rbac.authorization.k8s.io/weave-net created
daemonset.apps/weave-net created
```

``CNI``를 설치하면 ``CoreDNS Pod`` 이 ``정상적으로 동작``하게 됩니다.

<br/>

각 노드와 상태를 확인해보겠습니다 

```cs
[root@nasa-master ~]# kubectl get nodes
NAME          STATUS   ROLES    AGE     VERSION
nasa-master   Ready    master   10m     v1.15.5
nasa-node1    Ready    <none>   3m48s   v1.15.5
nasa-node2    Ready    <none>   4m15s   v1.15.5
nasa-node3    Ready    <none>   3m48s   v1.15.5
```

<br/>

```cs
[root@nasa-master ~]# kubectl get cs
NAME                 STATUS    MESSAGE             ERROR
controller-manager   Healthy   ok                  
scheduler            Healthy   ok                  
etcd-0               Healthy   {"health":"true"}   
```

<br/>
<br/>

최종적으로 구성 API, 및 요소가 정상적으로 실행중인지 확인합니다

```cs
[root@nasa-master ~]# kubectl get po -o custom-columns=POD:metadata.name,NODE:spec.nodeName --sort-by spec.nodeName 
-n kube-system
POD                                   NODE
kube-scheduler-nasa-master            nasa-master
weave-net-v7bff                       nasa-master
etcd-nasa-master                      nasa-master
kube-apiserver-nasa-master            nasa-master
kube-controller-manager-nasa-master   nasa-master
kube-proxy-6w9dk                      nasa-master
kube-proxy-lxn6d                      nasa-node1
weave-net-k2tcb                       nasa-node1
coredns-5c98db65d4-8cg79              nasa-node1
kube-proxy-jqks7                      nasa-node2
weave-net-dd6f2                       nasa-node2
coredns-5c98db65d4-zbvbn              nasa-node2
weave-net-k2jc9                       nasa-node3
kube-proxy-kr9sb                      nasa-node3
```

---

### 간단한 pods 배포 TEST


간단한 Pod 을 배포해서 동작을 확인해봅시다. 아래 pod-test.yaml 파일을 생성합니다.
    
```cs
apiVersion: v1
kind: Pod
metadata:
name: myapp-pod
labels:
    app: myapp
spec:
containers:
- name: myapp-container
    image: busybox
    command: ['sh', '-c', 'echo Hello Kubernetes! && sleep 3600']
```
해당 Pod 이 실행되면 ``busybox`` 라는 경량 리눅스 이미지에 ``Hello Kubernetes!`` 라는 로그가 잠시 동안 출력되고 Pod 은 종료됩니다.

<br/>
<br/>

PODS 배포

```cs
[root@nasa-master kube]# kubectl apply -f pod-test.yaml
pod/nasa-pod created
```

<br/>
<br/>

동작 및 로그 확인

```cs
[root@nasa-master kube]# kubectl get po
NAME       READY   STATUS    RESTARTS   AGE
nasa-pod   1/1     Running   0          10s
[root@nasa-master kube]# 
[root@nasa-master kube]# kubectl logs nasa-pod
Hello Kubernetes!
```

이로써 기본적인 k8s 클러스터 구성이 완료되었습니다

----

```toc
```