---
emoji: ๐คฆโโ๏ธ
title: "[Kubernetes] - 1.17๋ฒ์  ์ด์ ํฌ์ค ์ฒดํฌ ์๋ฌ ๋ฆฌํฌํธ"
date: "2021-06-29 00:07:25"
author: nasa1515
tags: DevOps Error-Report
categories: DevOps Error-Report
---



์ด๋ฒ ํฌ์คํธ๋ ์ด์  K8S ์ค์น ๋ฐ ๊ตฌ์ฑ ํฌ์คํธ์์ ์ ์์ ์ผ๋ก ์ค์น ๋ค์ ๋ฐ๊ฒฌ๋ ์ด์์ ๋ํ ๋ฆฌํฌํธ ์๋๋ค.  
github, ์๋ฌธ ๋ฆฌํฌํธ ์ฌ์ดํธ์์ ์ฌ๋ฌ๊ฐ์ง ๊ธ์ด ์์ง๋ง ์ ํํ ์์ธ๊ณผ ํด๊ฒฐ๋ฐฉ๋ฒ์ ๋ํ ๋๊ธ์ด ์์ด ๋ฆฌํฌํธ ํฉ๋๋ค.

---

## โ ํด๊ฒฐ๋ฐฉ๋ฒ

* ``ํด๋น์ด์๋ 1.17๋ฒ์ `` ์ดํ์์๋ง ๋ฐ์ํ๋ ์ด์์๋๋ค. ๋ฒ์ ์ ๋ฎ์ถฐ ์ค์น๋ฅผ ์งํ, ํน์ ๋ฒ๊ทธ๊ฐ ๋ฆด๋ฆฌ์ฆ ๋  ๋๊น์ง ๊ธฐ๋ค๋ฆฌ๋ ์ ๋ฐ์ ์์ ๊ฒ ๊ฐ์ต๋๋ค.  

* ์ ๋ 1.16 ๋ฒ์ ์ผ๋ก ์ค์น ํ ์ ์ ๊ตฌ๋์ ํ์ธ ํ์ต๋๋ค.

* ์ถ๊ฐ์ ์ผ๋ก GCP๊ฐ์ ํผ๋ธ๋ฆญ ํด๋ผ์ฐ๋์ ํ๊ฒฝ์์๋ง ๋ฐ์ํ๋๊ฑด์ง   
๊ธฐ์กด์ ๋ ๊ฑฐ์ ์ค์น ํ๊ฒฝ์์๋ ๋ฐ์ํ๋ ๊ฑด์ง๋ ํ์คํธ๊ฐ ํ์ํฉ๋๋ค.

---

## โ ์ด์ ๋ด์ฉ


``K8S 1.17 ์ด์์ ๋ฒ์ ``์์ ํฌ์ค์ฒดํฌ ์ด์ 
``kubespray , adm``์ผ๋ก ๊ธฐ๋ณธ ์ค์น ์ดํ ์๋์ ๊ฐ์ด ํฌ์ค์ฒดํฌ์ ``Unhealthy``์๋ฌ ํ์ธ

```cs
kubectrl get cs
```

![์คํฌ๋ฆฐ์ท, 2020-08-24 09-52-12](https://user-images.githubusercontent.com/69498804/90993355-88020680-e5ef-11ea-8b59-6102415fec3f.png)


<br/>

### ์๋ฌ

```cs
$ kubectl get componentstatus
NAME                 STATUS      MESSAGE                                                                                        ERROR
controller-manager   Unhealthy   Get http://127.0.0.1:10252/healthz: dial tcp 127.0.0.1:10252: getsockopt: connection refused
scheduler            Unhealthy   Get http://127.0.0.1:10251/healthz: dial tcp 127.0.0.1:10251: getsockopt: connection refused
etcd-0               Healthy     {"health": "true"}
---
```

<br/>

### ๋ถ์ ๊ฒฐ๊ณผ  

* ํด๋น์ด์๋ ์๋์ ๊ฐ์ด ``GoRang`` ์ฝ๋ ์์ฒด์ ``Port๊ฐ ํ๋์ฝ๋ฉ`` ๋์ด ์์ด   
``ํฌ์ค์ฒดํฌ๋ง`` ๋์ง ์์ ๋ฟ ์ค์  Pods, Replicaset๋ฑ์ ``๋์์๋ ์ํฅ์ด ์์ต๋๋ค``  

    ![์คํฌ๋ฆฐ์ท, 2020-08-24 09-51-58](https://user-images.githubusercontent.com/69498804/90993350-859fac80-e5ef-11ea-9bf9-8d42a5cb7978.png)  

    ์ค์  ์๋น์ค ํฌํธ๋ ``10259``์ด์ง๋ง ``ํฌ์ค์ฒดํฌ๋ 10251,2 ํฌํธ``๋ก ์ฐ๊ฒฐํ๋ ค๊ณ  ํจ

<br/>

### github ์์ ์ฝ๋ ํ์ธ  


``ํ๋์ฝ๋ฉ ์ฝ๋ ํ์ธ``

test/e2e/framework/ports.go  

![์คํฌ๋ฆฐ์ท, 2020-08-24 10-09-04](https://user-images.githubusercontent.com/69498804/90993931-da442700-e5f1-11ea-9804-ddc3bf45a233.png)
![์คํฌ๋ฆฐ์ท, 2020-08-24 10-09-34](https://user-images.githubusercontent.com/69498804/90993943-eaf49d00-e5f1-11ea-870f-16e0652ab6a9.png)


https://github.com/kubernetes/kubernetes/search?q=InsecureKubeControllerManagerPort&unscoped_q=InsecureKubeControllerManagerPort


<br/>
<br/>

``insecure`` ์ผ๋๋ ํฌํธ๊ฐ ๋ค๋ฅด๊ฒ ์ฐ์ด๋ ์ฝ๋๋ก ๋ณด์ธ๋ค
    

```cs
/*
Copyright 2014 The Kubernetes Authors.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package ports

import (
    "k8s.io/cloud-provider"
)

const (
    // ProxyStatusPort is the default port for the proxy metrics server.
    // May be overridden by a flag at startup.
    ProxyStatusPort = 10249
    // KubeletPort is the default port for the kubelet server on each host machine.
    // May be overridden by a flag at startup.
    KubeletPort = 10250
    // InsecureKubeControllerManagerPort is the default port for the controller manager status server.
    // May be overridden by a flag at startup.
    // Deprecated: use the secure KubeControllerManagerPort instead.
    InsecureKubeControllerManagerPort = 10252
    // KubeletReadOnlyPort exposes basic read-only services from the kubelet.
    // May be overridden by a flag at startup.
    // This is necessary for heapster to collect monitoring stats from the kubelet
    // until heapster can transition to using the SSL endpoint.
    // TODO(roberthbailey): Remove this once we have a better solution for heapster.
    KubeletReadOnlyPort = 10255
    // ProxyHealthzPort is the default port for the proxy healthz server.
    // May be overridden by a flag at startup.
    ProxyHealthzPort = 10256
    // KubeControllerManagerPort is the default port for the controller manager status server.
    // May be overridden by a flag at startup.
    KubeControllerManagerPort = 10257
    // CloudControllerManagerPort is the default port for the cloud controller manager server.
    // This value may be overridden by a flag at startup.
    CloudControllerManagerPort = cloudprovider.CloudControllerManagerPort
)

```
https://github.com/kubernetes/kubernetes/blob/462742fcf6732abf0c630422320b3972575bae59/pkg/master/ports/ports.go


<br/>

### ์ถ๊ฐ์ ์ผ๋ก ``aks``๋ช๋ น์ผ๋ก ํด๊ฒฐํ๋ค๋ ๋ฆฌํฌํธ๋ฅผ ๋ณด์ ์๋ํด๋ดค์ง๋ง ํด๊ฒฐ๋์ง ์์์


* ๋ด์ฉ์ ๋ค์๊ณผ ๊ฐ๋ค
![์คํฌ๋ฆฐ์ท, 2020-08-24 10-11-24](https://user-images.githubusercontent.com/69498804/90994011-2becb180-e5f2-11ea-9e7e-169a7a3cef4a.png)


    https://github.com/Azure/AKS/issues/173


```toc
```