---
emoji: ๐คฆโโ๏ธ
title: "[DEVOPS] - Private ์ด๋ฏธ์ง ์ ์ฅ์ Harbor ๋์"
date: "2021-08-10 00:39:25"
author: nasa1515
tags: DevOps
categories: DevOps
---



๋จธ๋ฆฌ๋ง  

๊ทธ๋์ ๋น๋๋ ์ด๋ฏธ์ง๋ฅผ ๊ด๋ฆฌํ๊ฑฐ๋ ์ ์ ๋ถ์ ํ  ๋ Docker hub๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ๊ตฌ์ฑํ์ผ๋  
์ด๋ฒ ํ๋ก์ ํธ์์๋ ์ด๋ป๊ฒ ํ๋ฉด ๋ณด์์ ์กฐ๊ธ ๋ ์ค์ ์ ๋ ์ ์์๊น๋ฅผ ์๊ฐํ๋ค  
Harbor๋ฅผ ์ฌ์ฉํ์ฌ ๋๋ฆฝ์ ์ธ ์ ์ฅ์๋ก ์ด๋ฏธ์ง๋ฅผ ๊ด๋ฆฌํ๊ธฐ๋ก ๊ฒฐ์ ํ์์ต๋๋ค.


---


* ์ฌ์ฉ ํ  ํด์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.  

    - Jenkins
    * OWASP ZAP

---


## โ Harbor ์ค์น (Docker)

Harbor ์ค์น์ ๊ฒฝ์ฐ ์ด๋ฏธ ๋ง์ ๋ถ๋ค์ด ๋ ์ฝ๊ฒ ์ค๋ชํด๋์ผ์์ ๊ฐ๋จํ ๋์ด๊ฐ๊ฒ ์ต๋๋ค.  

![img](https://user-images.githubusercontent.com/51220344/102866432-99163380-447a-11eb-8d9f-ded27807e327.jpg)

* ์ฐ์  Harbor๋ ํน์  OS์ ๋ง๋ docker, docker-compose๊ฐ ์๊ตฌ๋ฉ๋๋ค [Centos 7์ ๊ธฐ๋ฐ์ผ๋ก ์งํํ์์ต๋๋ค.]

<br/>

* #### docker-compose

    ```cs
    sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    docker-compose -v
    ```

<br/>

* #### Harbor [๊ด๋ จ ๋งํฌ](https://github.com/goharbor/harbor/releases)

    ```cs
    wget https://github.com/goharbor/harbor/releases/download/v1.9.4/harbor-online-installer-v1.9.4.tgz
    tar xvfz harbor-online-installer-v1.9.4.tgz
    cd harbor
    vi harbor.yml // port ๋ณ๊ฒฝ๊ฐ๋ฅ
    ./install.sh
    ```

<br/>

* #### ์์ ๊ฐ๋จํ ๋ช๋ น์ด๋ก ์ค์น๊ฐ ์๋ฃ๋๋ฉด ์ค์ ํ Public IP๋ก ์ ๊ทผ๋ฉ๋๋ค.  

    ![img1](https://user-images.githubusercontent.com/51220344/102866526-c19e2d80-447a-11eb-9e5c-ded42c1df7fc.png)

    > ID : admin / Pass : Harbor12345


<br/>


* ์ฌ์ฉ ๋ฐ ์์ ํ Harvor.xml์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.


* ### Harbor conf

    ```cs
    vi harbor.xml
    # hostname
    # https ์ฃผ์(๋ฏธ์ฌ์ฉ์)
    ./prepare
    #docker-compose reset
    docker-compose down -v
    docker-compose up -d
    ```

<br/>

---

### โ ๊ทธ๋ฌ๋ Harbor๋ HTTPS๊ฐ ๊ธฐ๋ณธ์๋๋ค.

<br/>

* ์ ํฌ๋ SSL ์ธ์ฆ์์ ๋ง์ ์๊ฐ์ ์ฐ๊ณ  ์ถ์ง ์์ ์๋์ ๊ฐ์ ๋ฐฉ๋ฒ์ผ๋ก HTTP๋ก Harbor๋ฅผ ์ฌ์ฉํ์ต๋๋ค.

    * Harbor๋ฅผ ์ค์นํ ์๋ฒ์ ์ฐ๊ฒฐํ  node๋ค์ ํด๋น ๋ช๋ น์ด๋ฅผ ์ผ์ผํ ๊ธฐ์ํด์ผํฉ๋๋ค.

    ```cs
    ke-c-dcn6h-default-0-41c99d2b-zkp7 ~ # vim /etc/default/docker 
    gke-c-dcn6h-default-0-41c99d2b-zkp7 ~ # 
    gke-c-dcn6h-default-0-41c99d2b-zkp7 ~ # systemctl restart docker
    gke-c-dcn6h-default-0-41c99d2b-zkp7 ~ # 
    gke-c-dcn6h-default-0-41c99d2b-zkp7 ~ # 
    gke-c-dcn6h-default-0-41c99d2b-zkp7 ~ # cat /etc/default/docker 
    DOCKER_OPTS="-p /var/run/docker.pid --iptables=false --ip-masq=false --log-level=warn --bip=
    169.254.123.1/24 --registry-mirror=https://mirror.gcr.io --log-driver=json-file --log-opt=ma
    x-size=10m --log-opt=max-file=5 --insecure-registry 34.64.237.112"


    gke-c-dcn6h-default-0-41c99d2b-zkp7 ~ # docker info | grep Insecure -A2
    Insecure Registries:
    34.64.237.112
    127.0.0.0/8
    ```


    * /etc/default/docker ํ์ผ์ --insecure-registry ๊ตฌ๋ฌธ์ ์์ ํ ๋ค Docker๋ฅผ ์ฌ์์ ์์ผ์ฃผ๋ฉด ๋๋ ๊ฐ๋จํ ์์์๋๋ค.

<br/>


---

### ๐ ๋ก๊ทธ์ธ์ด ์๋๋ ๋ฌธ์ ๊ฐ ๋ฐ์ํ์ต๋๋ค.
  

<br/>

* ์๋์ ๊ฐ์ด Harbor ์ ์ฅ์๋ฅผ HTTP๋ก ์ฐ๊ฒฐํ๋ คํ๋๋ฐ ์คํจํ์ต๋๋ค.  

    ```cs
    gke-c-dcn6h-default-0-41c99d2b-zkp7 ~ # docker login http://34.64.237.112
    Username: admin
    Password: 
    Error response from daemon: Get http://34.64.237.112/v2/: Get http://jenkins/service/token?a
    ccount=admin&client_id=docker&offline_token=true&service=harbor-registry: dial tcp: lookup j
    enkins on 169.254.169.254:53: no such host
    ```

    *   lookup jenkins on 169.254.169.254:53: no such host ๋ก๊ทธ๋ด์ฉ์ ๋ณด๋ DNS or HOSTS์ ๋ฌธ์ ์ธ ๊ฒ์ผ๋ก ํ๋จ๋ฉ๋๋ค.


<br/>

* ๋ค์๊ณผ ๊ฐ์ด hosts์ ์ถ๊ฐํด์ค๋ด์๋ค.

    ```cs
    gke-c-dcn6h-default-0-41c99d2b-zkp7 ~ # cat /etc/hosts | grep jenkins
    34.64.237.112   jenkins
    ```

<br/>

* ๊ทธ๋ผ ์๋์ ๊ฐ์ด ์ ์์ ์ผ๋ก ์ ์ฅ์์ ๋ก๊ทธ์ธ์ด ๊ฐ๋ฅํด์ง๋๋ค.

    ```cs
    gke-c-dcn6h-default-0-41c99d2b-b3hf ~ # docker login http://34.64.237.112
    Username: admin
    Password: 
    WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
    Configure a credential helper to remove this warning. See
    https://docs.docker.com/engine/reference/commandline/login/#credentials-store
    Error saving credentials: mkdir /root/.docker: read-only file system
    ```

<br/>

* ๋ฌผ๋ก  ์ด๋ฏธ์ง๋ฅผ ๊ฐ์ ธ์ค๋ ๊ฒ๋ ์์ ๋กญ์ต๋๋ค.

    ```cs
    [root@rancher ~]# docker pull 34.64.237.112/cccr/centos:latest
    latest: Pulling from cccr/centos
    e4c3d3e4f7b0: Pull complete 
    101c41d0463b: Pull complete 
    8275efcd805f: Pull complete 
    751620502a7a: Pull complete 
    a59da3a7d0e7: Pull complete 
    5ad32ac1e527: Pull complete 
    50f250ce9768: Pull complete 
    3dd70b2a7b06: Pull complete 
    8c2eed4e2f48: Pull complete 
    724b4bfec817: Pull complete 
    61ae8c03d512: Pull complete 
    9a94fab24995: Pull complete 
    da240281d421: Pull complete 
    a3770e71565d: Pull complete 
    e1c790c868f5: Pull complete 
    70b50f1bf238: Pull complete 
    Digest: sha256:cc72b06299df2ca6ed89a93190f062cb918185742afe270a5e179b2ab52c1d17
    Status: Downloaded newer image for 34.64.237.112/cccr/centos:latest
    34.64.237.112/cccr/centos:latest
    [root@rancher ~]# docker images
    REPOSITORY                  TAG                 IMAGE ID            CREATED             SIZE
    34.64.237.112/cccr/centos   latest              d35d713b85e5        12 days ago         892M
    B
    ```

<br/>


---

### Argcod ์ธ์ฆ

* ์ฟ ๋ฒ๋คํฐ์ค ํด๋ฌ์คํฐ์ ์๋์ ๊ฐ์ด ์ํฌ๋ฆฟ์ ์ถ๊ฐํด์ค์ผ ์ ์์ ์ผ๋ก ์ฐ๋์ด ๋ฉ๋๋ค..

    ```cs
    kubectl get secret regcred --output=yaml
    apiVersion: v1
    data:
    .dockerconfigjson: eyJhdXRocyI6eyJodHRwOi8vMzQuNjQuMjM3LjExMiI6eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJIYXJib3IxMjM0NSIsImF1dGgiOiJZV1J0YVc0NlNHRnlZbTl5TVRJek5EVT0ifX19
    kind: Secret
    metadata:
    creationTimestamp: "2020-11-12T09:29:40Z"
    name: regcred
    namespace: default
    resourceVersion: "13089794"
    selfLink: /api/v1/namespaces/default/secrets/regcred
    uid: 50cc6a2d-0f39-4fed-96e7-d5edde4e0f37
    type: kubernetes.io/dockerconfigjson
    > 
    > 
    > kubectl get secret regcred --output="jsonpath={.data.\.dockerconfigjson}" | base64 --decode
    base64: unrecognized option: decode
    BusyBox v1.31.1 () multi-call binary.

    Usage: base64 [-d] [FILE]

    Base64 encode or decode FILE to standard output
            -d      Decode data
    > 
    > 
    > kubectl get secret regcred --output="jsonpath={.data.\.dockerconfigjson}" | base64 -d
    {"auths":{"http://34.64.237.112":{"username":"admin","password":"Harbor12345","auth":"YWRtaW46SGFyYm9yMTIzNDU="}}}>
    ```


<br/>

--- 

### Jenkins์์ ๋ค์๊ณผ ๊ฐ์ด ์ฐ๊ฒฐํฉ๋๋ค.

<br/>

Harbor์ ๊ฒฝ์ฐ ๋ณ ๋ค๋ฅธ APP ์ค์น ์์ด ํ์ดํ๋ผ์ธ ์คํฌ๋ฆฝํธ์์ ๋ฐ๋ก ์ฐ๊ฒฐ์ด ๊ฐ๋ฅํฉ๋๋ค.


* ์ ์ ๊ฒฝ์ฐ ์คํฌ๋ฆฝํธ ํ๊ฒฝ๋ณ์์ ๋ค์๊ณผ ๊ฐ์ด ํ ๋นํ์ต๋๋ค.

    ```cs
    pipeline {
        environment {
            slack_channel = '#studying'
            REGISTRY = 'cccr/jisun'
            REGISTRY_IP = '34.64.237.112'       <<-- Harbor IP
            REGISTRYCREDENTIAL = 'harbor'       <<-- Credential
            DOCKER_IMAGE = ''
            TAG_NUM = ''
        }
    ...
    ...(์ค๋ต)

            stage('Docker image push to Harbor') {    <<-- ๋ค์๊ณผ ๊ฐ์ด ํธ์ํ๋๋ก.
                steps{
                    script {
                        docker.withRegistry('http://$REGISTRY_IP', REGISTRYCREDENTIAL) {
                            DOCKER_IMAGE.push('${BUILD_NUMBER}')
                            DOCKER_IMAGE.push("latest")
                        }
                    }
                    sh 'docker rmi $REGISTRY:latest'
                    sh 'docker rmi $REGISTRY_IP/$REGISTRY:$BUILD_NUMBER'
                    sh 'docker rmi $REGISTRY_IP/$REGISTRY:latest'
                }
    ```

<br/>

* ๊ทธ๋ผ ์ต์ข์ ์ผ๋ก ์๋์ ๊ฐ์ด Harbor๋ฅผ ํตํด์ ์ด๋ฏธ์ง๋ฅผ ๊ด๋ฆฌํ  ์ ์๊ฒ ๋ฉ๋๋ค.

    ![gg](https://user-images.githubusercontent.com/69498804/102946406-eee2ee00-4503-11eb-87d6-fad094b4187f.PNG)

<br/>


---

## ๋ง์น๋ฉฐโฆ  

์ด๋ฒ ํ๋ก์ ํธ์์๋ ์ฒ์ ๋ค๋ค๋ณธ ํด์ด ๋๋ฌด ๋ง์์ต๋๋ค. ๊ทธ๋์ ๋์ฑ ๋ง์ ๋ถ๋ค์ ํฌ์คํธ๋ฅผ ๋ณด๊ณ , ๊ณต์๋ฌธ์๋ฅผ ๋ณด๋ค๋ณด๋  
์ฒ์ ๋ค๋ค๋ณด๊ฑฐ๋, ์ ํด๋ณด๋ ํด๋ค์ ๋ํ ์ดํด๋์ ์๋ จ๋๋ฅผ ์ฌ๋ฆฌ๋ ๋ฐฉ๋ฒ์ ์๊ฒ ๋์๋ ๊ฒ ๊ฐ์ต๋๋ค.  
Harbor๋ฅผ ์ค์นํ๋ฉด์ ๋๋๊ฑด ์ฟ ๋ฒ๋คํฐ์ค ๊ธฐ๋ฐ์ผ๋ก ์คํ์์ค ํด๋ค์ ์ ์ ๋ฆฌํ ๋ธ๋ก๊ทธ๋ค์ ๋ง์ด ์๋ค๋ ๊ฒ์๋๋ค.   
ํนํ ํด๋ฌ์คํฐ๋ฅผ ์ฐ๊ฒฐํ๋ ๋ถ๋ถ์์...  
์์ผ๋ก ๋ ๋ง์ ์คํ์์ค๋ค์ด ๋์ฌํํ ์ ๋ ๊ทธ๊ฒ๋ค์ ๋ค๋ค๋ณด๋ ๊ฒ์ ์ทจ๋ฏธ๋ก ๊ฐ์ ธ๋ด์ผ ๊ฒ ์ต๋๋ค.

---

```toc
```