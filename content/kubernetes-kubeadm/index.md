---
emoji: ๐คฆโโ๏ธ
title: "[Kubernetes] - Kubernetes ํ๊ฒฝ๊ตฌ์ฑ on GCP Using kubeadm"
date: "2021-06-29 00:07:11"
author: nasa1515
tags: DevOps CLOUD
categories: DevOps CLOUD
---

๋จธ๋ฆฌ๋ง  

์ด์  ํฌ์คํธ์์๋ kubespay ์๋ํ ํด์ ์ฌ์ฉํด์ K8S ํด๋ฌ์คํฐ๋ฅผ ๊ตฌ์ถ ํ์์ต๋๋ค.  
์ด๋ฒ ํฌ์คํธ์์๋ kubeadm์ ์ด์ฉํด์ K8S ํด๋ฌ์คํฐ๋ฅผ ๊ตฌ์ถํ๋ ๋ฐฉ๋ฒ์ ๋ํด์ ํฌ์คํธํ์ต๋๋ค.  



---

## โ ์ฌ์ ์ค๋น

์ฌ์  ์ค๋น์ ๊ฒฝ์ฐ kubespray์ ๋์ผํ๊ฒ GCP VM Instance์์ ๊ตฌ์ฑํ๊ธฐ ๋๋ฌธ์ ๋ฐฉ๋ฒ์ด ๋์ผํฉ๋๋ค.  
์ฌ์  ์ค๋น๋ [์ด์  ํฌ์คํธ](https://nasa1515.tech/kubetnetes-kubespary/)์ธ kubespray๋ฅผ ํ์ธํด์ฃผ์ธ์.

<br/>

---

## โ ์ฟ ๋ฒ๋คํฐ์ค  ์ค์นํ๊ธฐ [kubeadm]


๋ณธ๊ฒฉ์ ์ธ ์ค์น ๊ณผ์ ์๋๋ค.
``Kubeadm``์ ``Kubelet`` ๊ณผ ``Kubectl`` ์ ``์ค์นํ์ง ์๊ธฐ`` ๋๋ฌธ์ ์ง์  ์ค์นํด์ผ ํฉ๋๋ค.  

<br/>

์ ์ฒด Server์ ์๋ ``Repo``๋ฅผ ์ถ๊ฐํฉ๋๋ค.  


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

๋์ปค ์ค์น ์  ์ฌ์  ์ธํ 

```cs
$ yum install -y yum-utils device-mapper-persistent-data lvm2 
```

<br/>
<br/>

๋์ปค ์ ์ฅ์ ์ค์ 

```cs
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

<br/>
<br/>

๋์ปค ํจํค์ง ์ค์น

```cs
yum update && yum install docker-ce-18.06.2.ce
```

<br/>
<br/>

์ฟ ๋ฒ๋คํฐ์ค ์ค์น  

 
```cs
yum install -y --disableexcludes=kubernetes kubeadm-1.15.5-0.x86_64 kubectl-1.15.5-0.x86_64 kubelet-1.15.5-0.x86_64
```

1.15 ๋ฒ์ ์ผ๋ก ์ค์นํ๋ ์ด์  : ํฌ์ค์ฒดํฌ ์ด์, ๋์ฌ๋ณด๋ ํธํ์ฑ


<br/>
<br/>

``Master ๋ธ๋``์ ``์ปจํธ๋กค ๊ตฌ์ฑ ์์๋ฅผ ์ค์น``ํฉ๋๋ค. ํด๋น ์์์ ``master`` ์์๋ง ์คํํฉ๋๋ค.  
์ค์น ์ ์ฌ์ฉํ  ์ด๋ฏธ์ง๋ฅผ ๋จผ์  ๋ค์ด๋ก๋ ํฉ๋๋ค.

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

๋ง์คํฐ ๋ธ๋๋ฅผ ``์ด๊ธฐํ``ํฉ๋๋ค.

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
...(์ค๋ต)
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

์ฌ๊ธฐ์ ``์ผ๋ฐ ์ฌ์ฉ์``๊ฐ ``kubectl`` ์ ``์ฌ์ฉ``ํ  ์ ์๋๋ก ํ๊ฒฝ๋ณ์๋ฅผ ์ค์ ํฉ๋๋ค.

```cs
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

<br/>


---

### WORKER ๋ธ๋ ์ค์ 

๋์ปค ์คํ

```cs
systemctl daemon-reload
systemctl enable --now docker
```

<br/>
<br/>

kubelet ์คํ  

 
```cs
systemctl enable --now kubelet
```

<br/>
<br/>

๋ก๊ทธ์ ``๋ง์ง๋ง ๋ผ์ธ์ ๋ช๋ น์ด``๋ ``์์ปค ๋ธ๋``๋ฅผ ํด๋น ``ํด๋ฌ์คํฐ์ ์ถ๊ฐ``ํ๋ ๋ช๋ น์ด์๋๋ค.  
ํด๋น ๋ช๋ น์ด๋ฅผ ๋ณต์ฌํด์ ``nasa-node1``, ``nasa-node2``, ``nasa-node3`` ๋ธ๋์์ ์ํํฉ๋๋ค.

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

### Pod network add-on ์ค์นํ๊ธฐ
``Pod`` ์ ์ค์ ๋ก ์ฌ๋ฌ ๋ธ๋์ ๊ฑธ์ณ ๋ฐฐํฌ๋๋๋ฐ, Pod ๋ผ๋ฆฌ ํ๋์ ๋คํธ์ํฌ์ ์๋ ๊ฒ์ฒ๋ผ ํต์ ํ  ์ ์์ต๋๋ค.  
์ด๋ฅผ ``์ค๋ฒ๋ ์ด ๋คํธ์ํฌ(Overlay Network)``๋ผ๊ณ  ํฉ๋๋ค.

์ค๋ฒ๋ ์ด ๋คํธ์ํฌ๋ฅผ ์ง์ํ๋ ``CNI(Container Network Interface) ํ๋ฌ๊ทธ์ธ``์ ์ค์นํด๋ณด๊ฒ ์ต๋๋ค.  
CNI ์๋ ์ฌ๋ฌ ์ข๋ฅ๊ฐ ์๋๋ฐ, ์ด๋ฒ ํฌ์คํธ๋ ``Weave`` ๋ฅผ ์ด์ฉํฉ๋๋ค.

<br/>

``Master`` ๋ธ๋์์ ``weave``๋ฅผ ์ค์นํฉ๋๋ค


```cs
[root@nasa-master ~]# kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
serviceaccount/weave-net created
clusterrole.rbac.authorization.k8s.io/weave-net created
clusterrolebinding.rbac.authorization.k8s.io/weave-net created
role.rbac.authorization.k8s.io/weave-net created
rolebinding.rbac.authorization.k8s.io/weave-net created
daemonset.apps/weave-net created
```

``CNI``๋ฅผ ์ค์นํ๋ฉด ``CoreDNS Pod`` ์ด ``์ ์์ ์ผ๋ก ๋์``ํ๊ฒ ๋ฉ๋๋ค.

<br/>

๊ฐ ๋ธ๋์ ์ํ๋ฅผ ํ์ธํด๋ณด๊ฒ ์ต๋๋ค 

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

์ต์ข์ ์ผ๋ก ๊ตฌ์ฑ API, ๋ฐ ์์๊ฐ ์ ์์ ์ผ๋ก ์คํ์ค์ธ์ง ํ์ธํฉ๋๋ค

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

### ๊ฐ๋จํ pods ๋ฐฐํฌ TEST


๊ฐ๋จํ Pod ์ ๋ฐฐํฌํด์ ๋์์ ํ์ธํด๋ด์๋ค. ์๋ pod-test.yaml ํ์ผ์ ์์ฑํฉ๋๋ค.
    
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
ํด๋น Pod ์ด ์คํ๋๋ฉด ``busybox`` ๋ผ๋ ๊ฒฝ๋ ๋ฆฌ๋์ค ์ด๋ฏธ์ง์ ``Hello Kubernetes!`` ๋ผ๋ ๋ก๊ทธ๊ฐ ์ ์ ๋์ ์ถ๋ ฅ๋๊ณ  Pod ์ ์ข๋ฃ๋ฉ๋๋ค.

<br/>
<br/>

PODS ๋ฐฐํฌ

```cs
[root@nasa-master kube]# kubectl apply -f pod-test.yaml
pod/nasa-pod created
```

<br/>
<br/>

๋์ ๋ฐ ๋ก๊ทธ ํ์ธ

```cs
[root@nasa-master kube]# kubectl get po
NAME       READY   STATUS    RESTARTS   AGE
nasa-pod   1/1     Running   0          10s
[root@nasa-master kube]# 
[root@nasa-master kube]# kubectl logs nasa-pod
Hello Kubernetes!
```

์ด๋ก์จ ๊ธฐ๋ณธ์ ์ธ k8s ํด๋ฌ์คํฐ ๊ตฌ์ฑ์ด ์๋ฃ๋์์ต๋๋ค

----

```toc
```