---
emoji: ๐คฆโโ๏ธ
title: "[DEVOPS] - Jenkins๋ฅผ ์ด์ฉํ CI ์๋ํ ๊ตฌ์ถ"
date: "2021-08-04 00:41:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


๋จธ๋ฆฌ๋ง  

์๋ํ์ธ์ NASA์๋๋ค!!.  
์ด๋ฒ ํฌ์คํธ์์๋ Open Source๋ฅผ ์ด์ฉํ DevSecOps CI/CD PIPELINE ๊ตฌ์ถ์ ๋ํ ํฌ์คํธ์๋๋ค.   
๋ค๋ง ํฌ์คํธ์ ์์ด ๋งค์ฐ ๋ง์ ์ง ๊ฒ ๊ฐ์. CI, CD ๋ณ ๊ทธ๋ฆฌ๊ณ  ํด ๋ณ๋ก ํฌ์คํธ๋ฅผ ๋๋ ์์ ์๋๋ค.  
์ด๋ฒ ํฌ์คํธ์์๋ Jenkins๋ฅผ ์ด์ฉํ CI ๊ตฌ์ฑ ๋ถ๋ถ์ ํฌ์คํธ ํ์ต๋๋ค!..

---

์ฌ์ฉ ํ  ํด์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.  

- gitlab
- Jenkins
- Docker, dockerhub

---


## โ ํ๊ฒฝ๊ตฌ์ฑ

์ฐ์  ํ๊ฒฝ ๊ตฌ์ฑ์ ์๋์ ๊ฐ์ต๋๋ค
![์บก์ฒ](https://user-images.githubusercontent.com/69498804/94150900-b2780580-feb4-11ea-963e-6f7968e47d92.PNG)


* jenkins : ์  ํจ์ค ์๋ฒ์ ์ญํ ์ ํ๋ ์๋ฒ (Docker in Docker)
* Rancher-master : Rancher ๊ธฐ๋ฐ์ k8s Master
* nasa-node1~2 : Rancher ๊ธฐ๋ฐ์ K8s Worker

<br/>

----

## โ CI

### JENKINS ์ค์น  

GCP ์ธ์คํด์ค ์์ฑ ๋ฐฉ๋ฒ์ ๊ฒฝ์ฐ ๋ธ๋ก๊ทธ์ [GCP ์ธ์คํดํธ ์์ฑ ๋ฐฉ๋ฒ](https://nasa1515.tech/gcp-first/) ํฌ์คํธ์ ์ ๋ฆฌ๋์ด ์์ต๋๋ค.

<br/>

### Jenkins
Jenkins์ ๊ฒฝ์ฐ Docker in Docker ๋ฐฉ์์ผ๋ก ๊ตฌ์ฑํ์ต๋๋ค.  
ํ์ฌ๋ ์ด์ฉ์ ์์ด Docker ๊ธฐ๋ฐ์ ์๋น์ค๋ฅผ ์ฌ์ฉํด๋ณด๊ธฐ ์ํด ์ค์ต์ ํด์ ๊ทธ๋ ์ง๋ง  
์ค์  ์ต์ข ๊ฒฐ๊ณผ๋ฌผ์ Jenkins ํด์ ์ธ์คํด์ค์ ์ค์นํ๋ ๊ฒ์ผ๋ก ์๋น์ค ์์ ์๋๋ค.

<br/>

Docker in Docker (DinD)  

```cs
๋์ปค ์์ ๋์ปค๋ ๋์ปค ๋ฐ์ด๋๋ฆฌ๋ฅผ ์ค์ ํ๊ณ  ์ปจํ์ด๋ ๋ด๋ถ์ ๊ฒฉ๋ฆฌ๋ Docker ๋ฐ๋ชฌ์์คํํ๋ ์์์ ์๋ฏธํ๋ค. ์ฆ, ๋์ปค๋ฐ๋ชฌ์ด 2๊ฐ๊ฐ ๋จ๋ ๊ฒ์ด๋ค. CI์ธก๋ฉด์์ ์ ๊ทผํ๋ค๋ฉดTask๋ฅผ ์ํํ๋ Agent๊ฐ Docker Client์ Docker Daemon์ญํ ๊น์ง ํ๊ฒ๋์ด ๋์ปค๋ช๋ น๋ค์ ์ํํ๋๋ฐ ๋ฌธ์ ๊ฐ ์์ด์ง๋ค. ์ด๋ ๊ฒ ๋ง๋ก๋ง ๋ค์ผ๋ฉด ์๋ฆ๋ต๊ณ  ๋ฌธ์ ๊ฐ์์ด๋ณด์ด์ง๋ง ์ด ์ ๊ทผ์๋ ํฐ ๋จ์ ์ด ์กด์ฌํ๋ค.
```

<br/>
<br/>

ํธ์คํธ ๋์ปค ์ปจํ์ด๋๊ฐ privilieged mode๋ก ์คํ๋์ด์ผ ํ๋ค.

```cs
$ docker run --privileged --name dind1 -d docker:1.8-dind
```

```cs
privilieged ํ๋๊ทธ๋ฅผ ์ฌ์ฉํ๋ค๋ฉด ํธ์คํธ์ปจํ์ด๋๊ฐ ํธ์คํธ๋จธ์ ์์ ํ  ์ ์๋ ๊ฑฐ์ ๋ชจ๋  ์์์ ํ  ์ ์๊ฒ ๋๋ค.
์ด๋ ์ปจํ์ด๋๋ฅผ ์คํํ๋๋ฐ ํฐ ""๋ณด์ ์ํ""์ ์ด๋ํ  ์ ์๋ค.
```

[DinD ์ฌ์ฉ๋ฒ๊ณผ ์๋ฆฌ์ ๋ํด ์ ์ ๋ฆฌ๋ ํฌ์คํธ](https://sreeninet.wordpress.com/2016/12/23/docker-in-docker-and-play-with-docker/)


<br/>
<br/>

์ฐ์  jenkins ์ค์น ์ ์ฌ์ฉํ  Home Directory ์์ฑํด์ค๋๋ค

```cs
# mkdir -p /docker/jenkins
# chmod 666 /docker/jenkins
```

<br/>
<br/>

Docker๋ก ์  ํจ์ค๋ฅผ ์ต๋ ค์ค์๋ค!

```cs
# docker run -itd --name jenkins -p 8080:8080 -p 50000:50000 -v /docker/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -e TZ=Asia/Seoul -u rootjenkins/jenkins:latest
```

<br/>
<br/>

์ฃผ์ ์ต์ ์ค๋ช

```cs
-v /docker/jenkins:/var/jenkins_home
    

local volume์ /docker/jenkins ๋๋ ํ ๋ฆฌ์ container volume์ /var/jenkins_home ๋๋ ํ ๋ฆฌ ๋งคํ

-v /var/run/docker.sock:/var/run/docker.sock
์ ์ผ ์ค์ํ ์ต์
docker in docker๋ฅผ ๊ตฌํํ๊ธฐ ์ํด ์ฌ์ฉํ๋ ์ต์

-u root
Docker ์ฌ์ฉ์๋ฅผ root๋ก ์ค์ 

-p 8080:8080 -p 50000:50000
local port์ container port ์ฐ๊ฒฐ
8080์ Jenkins ๊ธฐ๋ณธ port
50000dms Jenkins slave port

-e TZ=Asia/Seoul
jenkins ๋ด์ timezone ์ค์ 
```

<br/>
<br/>

Jenkins ์ปจํ์ด๋๊ฐ ์ ๋๋ก ์์ฑ๋ ๊ฒ์ ํ์ธ!

```cs
[root@jenkins devops-pipeline]# docker ps
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS              PORTS                                              NAMES
d8cbbb69e267        jenkins/jenkins:latest   "/sbin/tini -- /usr/โฆ"   2 minutes ago       Up 2 minutes        0.0.0.0:8080->8080/tcp, 0.0.0.0:50000->50000/tcp   jenkins
```

<br/>

---

### GCP ๋ฐฉํ๋ฒฝ(Firewall) ์ค์ 

<br/>

๊ธฐ๋ณธ์ ์ผ๋ก Jenkins๋ 8080ํฌํธ๋ฅผ ์ฌ์ฉํ๊ธฐ์ GCP์์์ ์ธ๋ถ ํต์ ์ ์ํด์  ๋ฐฉํ๋ฒฝ ์ค์ ์ด ํ์ํฉ๋๋ค.


<br/>

๊ทธ๋ฆผ๊ณผ ๊ฐ์ด ์ธ์คํด์ค์ [๋คํธ์ํฌ ์ธ๋ถ์ ๋ณด ๋ณด๊ธฐ] ํญ์ผ๋ก ์ ์ํฉ๋๋ค

![์คํฌ๋ฆฐ์ท, 2020-09-22 12-11-43](https://user-images.githubusercontent.com/69498804/93840857-cbbe5d80-fccc-11ea-8204-63775025051c.png)

<br/>
<br/>

[๋ฐฉํ๋ฒฝ ๊ท์น] - [๋ฐฉํ๋ฒฝ ๊ท์น ๋ง๋ค๊ธฐ] ํญ์ ์ด์ฉํด ์๋์ ๊ฐ์ด ๊ท์น์ ์์ฑํฉ๋๋ค.

![์คํฌ๋ฆฐ์ท, 2020-09-22 12-14-37](https://user-images.githubusercontent.com/69498804/93841021-48513c00-fccd-11ea-9080-277cc08722b3.png)  
``0.0.0.0/0์ ๋ชจ๋  IP ๋์ญ์ ๋ํ ํ์ฉ์๋๋ค.``  
ํ์ฌ๋ ๊ธฐ๋ฅํ์คํธ๋ฅผ ์ํด์ ๋ชจ๋  ๋์ญ์ผ๋ก ์ก์๋จ์ง๋ง ํ์ ํน์  ์ธ์คํด์ค์ IP๋ก๋ง ํ์ฉ ํ  ์์ ์๋๋ค

<br/>
<br/>

๊ทธ๋ผ ์๋ ๊ฐ์ ๋ฐฉํ๋ฒฝ์ด ์ถ๊ฐ๋ ๊ฒ์ GCP์์ ํ์ธ ํ  ์ ์์ต๋๋ค.

![์คํฌ๋ฆฐ์ท, 2020-09-22 12-16-29](https://user-images.githubusercontent.com/69498804/93841074-73d42680-fccd-11ea-9994-508de3ab13ca.png)

<br/>
<br/>

``์ด์  ๋ธ๋ผ์ฐ์ ๋ก ์  ํจ์ค์ ์ ์ ํด๋ด์๋ค``  

* ์ ์ ์ฃผ์๋ http://์ธ์คํด์ค ์ธ๋ถ IP:8080 ์๋๋ค.  
    

<br/>

์ฆ GCP์์ ์ธ์คํด์ค์ ์ธ๋ถ IP ์ค์ ์ด ํ์ํฉ๋๋ค!!

![์คํฌ๋ฆฐ์ท, 2020-09-22 13-28-43](https://user-images.githubusercontent.com/69498804/93844259-8c493e80-fcd7-11ea-8587-52b03347f155.png)

<br/>
<br/>

ํด๋น ์ธ์คํด์ค์ ์ธ๋ถ IP : 34.64.93.209๋ก ์ ์!!

![์คํฌ๋ฆฐ์ท, 2020-09-22 13-29-55](https://user-images.githubusercontent.com/69498804/93844315-b69afc00-fcd7-11ea-8e8d-2b661d0b1729.png)
์ด๋ ๊ฒ Jenkins๊ฐ ์ง์ํ๋ ์นํ์ด์ง๊ฐ ์ ์ ๊ตฌ๋๋ฉ๋๋ค

<br/>
<br/>

Administrator password์๋ ๋ค์์ ๋ช๋ น์ด๋ก ํ์ธ๋๋ ์ฝ๋๋ฅผ ์๋ ฅํด์ค๋๋ค.


```cs
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

<br/>
<br/>

ํด๋น ์ด๋๋ฏผ ํค๋ฅผ ์๋ ฅ ํ ๊ธฐ๋ณธ์ ์ธ ์ ๋ณด๋ค์ ์๋ ฅํ๋ฉด ์๋์ ๊ฐ์ด ํ์ด์ง๋ฅผ ๋ณผ ์ ์์ต๋๋ค  

![์คํฌ๋ฆฐ์ท, 2020-09-22 13-43-21](https://user-images.githubusercontent.com/69498804/93844873-9e2be100-fcd9-11ea-9dec-621d09789744.png)

<br/>

---

### ์ ์ด์  gitlab๊ณผ ์ฐ๋ํด๋ด์๋ค.

<br/>

์ฃผ๋ก ์ธ๋ถ ์ ์ฅ์๋ก GITLAB, GITHUB๋ฅผ ๋ง์ด ์ด์ฉํ๋๋ฐ  
์ด๋ฒ ํฌ์คํธ์์๋ ``gitlab``์ ์ฌ์ฉํด๋ณด๊ฒ ์ต๋๋ค.  

<br/>

[gitlab](https://gitlab.com/) Gitlab ๋ก๊ทธ์ธ ํ Settings ๋ฉ๋ด์ ์ ์ํฉ๋๋ค   

![์คํฌ๋ฆฐ์ท, 2020-09-22 14-04-02](https://user-images.githubusercontent.com/69498804/93845625-7be79280-fcdc-11ea-85d9-7b0f1fc27f62.png)

<br/>
<br/>

์๋์ ๊ฐ์ ์ค์ ์ผ๋ก ํ ํฐ์ ์์ฑ ํด์ค๋๋ค  

![์คํฌ๋ฆฐ์ท, 2020-09-22 14-06-58](https://user-images.githubusercontent.com/69498804/93845725-e39ddd80-fcdc-11ea-8784-bcd98b5f15b8.png)

<br/>
<br/>

์์ฑ ํ ํ ํฐ ๊ฐ์ด ๋์ฌํ๋ฐ ๊ธฐ๋กํด๋์ธ์!!  

![์คํฌ๋ฆฐ์ท, 2020-09-22 14-08-04](https://user-images.githubusercontent.com/69498804/93845764-0b8d4100-fcdd-11ea-8c06-3aec0f404540.png)

<br/>

---


### Docker in Docker (DinD) ์์


<br/>

์ฐ์  Docker๋ฅผ ์ด์ฉํด ์ด๋ฏธ์ง Build ๋ฐ Push๋ฅผ ์ํด ํ๋ฌ๊ทธ์ธ์ ์ค์นํด์ค๋๋ค
    
![123](https://user-images.githubusercontent.com/69498804/94152453-8a89a180-feb6-11ea-9bd9-64c85abc085f.PNG)

<br/>
<br/>

Jenkins์์ GitLab๊ณผ ์ฐ๋์ ์ํ Credential ์ถ๊ฐ  
์ฐ์  Jenkins์์ GitLab token์ ์ฌ์ฉํ๋ Credential์ ์์ฑํฉ๋๋ค.

![์คํฌ๋ฆฐ์ท, 2020-09-22 14-54-54](https://user-images.githubusercontent.com/69498804/93848039-95d8a380-fce3-11ea-9862-f21c1b40f4b4.png)
    docker-build-step, Docker, Docker-pipeline ์ธ๊ฐ์ง!

<br/>
<br/>


### Docker in Docker ๊ตฌ์ฑ

<br/>

Docker Container ์ ์
    
```cs
$ docker exec -it jenkins bash
```

<br/>
<br/>

Docker์ค์น๋ฅผ ์ํ Shell ๋ค์ด๋ก๋
    
```cs
$ curl -fsSL get.docker.com -o get-docker.sh
```

<br/>
<br/>

Docker install shell script ์คํ
    
```cs
$ sh get-docker.sh
```

<br/>
<br/>

 docker ์คํ ๊ฐ๋ฅ ์ฌ๋ถ ํ์ธ
    
```cs
$ docker ps
CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                                              NAMES
094c32442200        nasa1415/devops:0.1   "/sbin/tini -- /usr/??   About an hour ago   Up About an hour    0.0.0.0:8080->8080/tcp, 0.0.0.0:50000->50000/tcp   jenkins
```

<br/>

---

### ์ฌ๊ธฐ๊น์ง CI๋ฅผ ์ค์  ๋

<br/>


Build ํ  Docker ์ด๋ฏธ์ง๋ฅผ ์ค๋นํฉ์๋ค

```cs
FROM ubuntu:18.04
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN apt upgrade -y
RUN apt-get update -y
RUN apt-get install nginx -y
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

CMD ["nginx"]
```
์์ ๊ฐ์ด ๊ฐ๋จํ ์ฐ๋ถํฌ ์์ฑ DockerFile์ ๋ง๋ค์ด์ ๋ฐฐํฌํด๋ณด์ฃ 

<br/>
<br/>

## โ (CI) ์ด๋ฏธ์ง Build & push 

<br/>

๊ทธ์ ์ ๋ฐฐํฌ๋ฅผ ์ํด Docker-Hub์ ์ธ์ฆํค๋ฅผ ์์ฑํฉ๋๋ค  
Jenkins->Credentials->global->Add Credentials

![์คํฌ๋ฆฐ์ท, 2020-09-25 11-39-43](https://user-images.githubusercontent.com/69498804/94220408-d292dd80-ff23-11ea-84a2-c636709c2986.png)
์์ ์บก์ณ์ ๊ฐ์ด DOCKERHUB์ ID์ PASSWORD๋ฅผ ์ ์ด์ ์ธ์ฆํค๋ฅผ ์์ฑํฉ๋๋ค

<br/>
<br/>

์์ฑ๋ ์ธ์ฆํค๋ฅผ ํ์ธํฉ๋๋ค

![์คํฌ๋ฆฐ์ท, 2020-09-25 11-42-25](https://user-images.githubusercontent.com/69498804/94220566-31585700-ff24-11ea-8f0e-2e5593ed3dfb.png)

<br/>
<br/>

์ด์  ๋ฐฐํฌ๋ฅผ ์ํด Jenkins์์ ์๋ก์ด item์ ๋๋ฅด๊ณ , pipeline ์ ํ ํ item์ ์ด๋ฆ์ ์๋ ฅํด์ฃผ์ธ์.

![์คํฌ๋ฆฐ์ท, 2020-09-25 11-43-31](https://user-images.githubusercontent.com/69498804/94220622-577df700-ff24-11ea-9463-eb744535a220.png)

<br/>
<br/>

Pipeline ๋ฉ๋ด์์ Definition์ Pipeline script from SCM์ ์ ํํ์ฌ ์ฃผ์ธ์.  
์ด์  Script path๋ฅผ ๋ฌผ์ด๋ณด๊ฒ ๋๋๋ฐ, jenkinsfile-build์ ๊ฐ ๋จ๊ณ๋ฅผ ๊ท์ ํด์ ์ก์์ ์ง์ ํ๋ฉด ๋ฉ๋๋ค.

![์คํฌ๋ฆฐ์ท, 2020-09-25 11-44-12](https://user-images.githubusercontent.com/69498804/94220652-7086a800-ff24-11ea-83f2-33f5617892ae.png)
๋ ํฌ์งํ ๋ฆฌ ํญ๋ชฉ์๋ ์ฐ๋ ํ  ๋ ํฌ์งํ ๋ฆฌ ์ฃผ์๋ฅผ ์ ์ด์ค๋๋ค. ์ ์ ๊ฒฝ์ฐ gitlab

<br/>
<br/>

๋ชจ๋  ์ค์ ์ ๋ง๋ฌด๋ฆฌํ๊ณ  SAVE๋ฅผ ๋๋ฅด๋ฉด ์๋์ ๊ฐ์ด ์์ดํ์ด ์์ฑ๋ฉ๋๋ค.

![์คํฌ๋ฆฐ์ท, 2020-09-25 11-46-02](https://user-images.githubusercontent.com/69498804/94220781-b2175300-ff24-11ea-9c8b-7a43cb818ab7.png)

<br/>

---

<br/>

๋น๋์ ํธ์๋ฅผ ํด๋ด์๋ค

git ์ ์ฅ์์ DockerFile๊ณผ Jenkinsfile-nasa๋ฅผ ๋ฃ์ด์ค๋๋ค 

์ ์ ๊ฒฝ์ฐ GITLAB๊ณผ ์ฌ์ฉํ๋ ๋ธํธ๋ถ์ ์ฅ์๋ฅผ ์ฐ๊ฒฐ์์ผ ๋จ์ต๋๋ค
  
```cs
root@cccr:/gitlab/devops-pipeline# ls -alrt 
ํฉ๊ณ 24
drwxr-xr-x 3 student student 4096  9์ 22 15:55 ..
-rw-r--r-- 1 root    root      45  9์ 22 16:00 README.md
-rwxrwxrwx 1 root    root     208  9์ 24 17:56 Dockerfile
-rwxrwxrwx 1 root    root     355  9์ 24 18:10 Jenkinsfile-nasa
drwxr-xr-x 8 root    root    4096  9์ 24 18:11 .git
drwxr-xr-x 3 root    root    4096  9์ 25 11:50 .
```

<br/>
<br/>


Jenkinsfile-nasa

```cs
node {
    stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        app = docker.build("nasa1415/devops")
    }
    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'nasa1415') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}

```

<br/>
<br/>

์ด์  ์์ฑํ ์์ดํ์์ Build Now ๋ฒํผ์ ๋๋ฌ ๋น๋ํด๋ด์๋ค

![์คํฌ๋ฆฐ์ท, 2020-09-25 11-52-26](https://user-images.githubusercontent.com/69498804/94221213-96f91300-ff25-11ea-9f24-6db24689479e.png)

<br/>
<br/>

๊ทธ๋ผ ๋น๋๊ฐ ์คํ๋๊ณ , ๋ก์ง์ ๋ณด์ฌ์ค๋๋ค

![์คํฌ๋ฆฐ์ท, 2020-09-25 11-53-38](https://user-images.githubusercontent.com/69498804/94221282-c14ad080-ff25-11ea-8f22-7639fa1aa509.png)

<br/>
<br/>

์ด์  Docker Hub์๋ ๋น๋ Numver : 10์ผ๋ก ์ด๋ฏธ์ง๊ฐ ์๋ก๋๊ฐ ๋ ๊ฒ์ ํ์ธ ํ  ์ ์์ฃ .

![์คํฌ๋ฆฐ์ท, 2020-09-25 11-54-43](https://user-images.githubusercontent.com/69498804/94221366-e93a3400-ff25-11ea-964a-b9b6c88f21e9.png)


<br/>
<br/>


---


### CI ์๋ํ

์ผ์ผํ Build ๋ฒํผ์ ๋๋ฅด๋ฉด ๋๋ฌด ๊ท์ฐฎ์ผ๋ GITLAB ์ ์ฅ์์ Push Event ๋ฐ์์ ์๋ ๋น๋๋๋๋ก ์ค์ ํฉ์๋ค

<br/>

์ฐ์  GITLAB์์ Access Token์ ๋ฐ๊ธํด์ค๋๋ค

![์คํฌ๋ฆฐ์ท, 2020-09-25 12-04-21](https://user-images.githubusercontent.com/69498804/94222018-41256a80-ff27-11ea-9c6c-ddccd1000d8b.png)
USER - SETTING - ACCESS TOKEN ๋ฉ๋ด๋ก ๋ค์ด๊ฐ ์๋์ ๊ฐ์ด ์๋ ฅ ํ ๋ฐ๊ธ๋ ํค๋ฅผ ๊ธฐ์ตํด ๋์ธ์

<br/>
<br/>

jenkins์์ ๋ฐ๊ธํ ํค๋ก ์๋์ ๊ฐ์ด ์ธ์ฆํค๋ฅผ ์์ฑํฉ๋๋ค!
![์คํฌ๋ฆฐ์ท, 2020-09-25 12-04-21](https://user-images.githubusercontent.com/69498804/94222018-41256a80-ff27-11ea-9c6c-ddccd1000d8b.png)

<br/>
<br/>

์ด์  Jenkins์์ Credential์ Global Settings์ Gitlab์ผ๋ก ์ถ๊ฐํด์ค๋๋ค  
์ค์  Jenkins์ Gitlab ์ฐ๋์ ์ํ Jenkins์ Manage Jenkins ์์ Configure System ์์  
์๋์ ๊ฐ์ ์ค์ ์ ์ถ๊ฐํฉ๋๋ค. credential์ ์์ ์์ฑํ credential์ ์ ํํฉ๋๋ค.

![์คํฌ๋ฆฐ์ท, 2020-09-25 12-07-17](https://user-images.githubusercontent.com/69498804/94222189-aaa57900-ff27-11ea-9677-b46edb066a18.png)

์ฐธ๊ณ ํ ๊ฒ์ URL๋ด์ http:// ๋ฅผ ํํ ์๋ ฅํด์ผ ํฉ๋๋ค.  
URL์ ์์ฑํด๋ GITLAB์ ํ๋ก์ ํธ URL ์๋๋ค!!

<br/>

---


### Jenkins์์ ์๋ Build trigger ์ค์ 

<br/>

์๊น ์์ฑํด๋ ์์ดํ์์ ์ค์ ์ ๋ค์ด๊ฐ ์๋ ๋ฉ๋ด์์ ์นํ URL์ ํ์ธํฉ๋๋ค
    
![์คํฌ๋ฆฐ์ท, 2020-09-25 12-11-49](https://user-images.githubusercontent.com/69498804/94222435-4cc56100-ff28-11ea-94fc-475ed1bd211a.png)

ํด๋น ์ค์  ์ ์ฉ ์ build๊ฐ push์ ์๋์ผ๋ก ์ด๋ฃจ์ด์ง๋๋ก ํฉ๋๋ค.  
์ฌ๊ธฐ์ webhook URL์ ๋ณด๊ฐ ์ถ๋ ฅ๋๋ ๊ธฐ์ต ํด ๋์ด์ผ ํฉ๋๋ค.

์ ์ ๊ฒฝ์ฐ URL: http://34.64.94.209:8080/project/image ์๋๋ค.

<br/>

----

## ๐ GitLab์์ integration webhook ๋ฑ๋ก   

์ด์  GitLab์์ Push Event๊ฐ ๋ฐ์๋๋ฉด Jenkin์ Job์ build ํ๋ webhook์ ์์ฑํ๋๋ก ํด๋ณด๊ฒ ์ต๋๋ค.

<br/>

์๋์ ๊ฐ์ด GitLab์ ํด๋น project์ settingsโ integration ์ผ๋ก ์ด๋ํ์ฌ webhook์ ์์ฑํฉ๋๋ค.
![์คํฌ๋ฆฐ์ท, 2020-09-22 15-22-54](https://user-images.githubusercontent.com/69498804/93849625-7e9bb500-fce7-11ea-9a13-f4575810667e.png)
๋ฐฉ๊ธ ์  ํ์ธํ๋ URL์ ์๋ ฅํ๋ฉด ๋ฉ๋๋ค!!

<br/>
<br/>

๋ค์๊ณผ ๊ฐ์ ์๋ฌ๊ฐ ๋ฐ์ํ์ต๋๋ค

![์คํฌ๋ฆฐ์ท, 2020-09-22 15-28-46](https://user-images.githubusercontent.com/69498804/93850069-51033b80-fce8-11ea-8ea8-285c5abd8f7d.png)
๊ฒ์ ๊ฒฐ๊ณผ WebHook ์์ฑ ์ URL๋ง ๊ธฐ์ํ๊ณ  Secret ํ ํฐ์ ๊ธฐ์ํ์ง ์์์์๋ค...

<br/>
<br/>

Jenkins ์์ ๋ง๋  ํ๋ก์ ํธ์์ ์ค์ ์ ๋ค์ด๊ฐ๋ฉด ์๋์ ๊ฐ์ด genarator๋ก ๋ฐ๊ธ๋ฐ์ ์ ์๋ค.
![์คํฌ๋ฆฐ์ท, 2020-09-22 15-44-06](https://user-images.githubusercontent.com/69498804/93851083-75601780-fcea-11ea-9820-d35eeb742a25.png)

<br/>
<br/>

์นํ์ด ์ ๋๋ก ์์ฑ๋์๋ค๋ฉด ํ์คํธ ํด๋ด์๋ค

![์คํฌ๋ฆฐ์ท, 2020-09-25 12-19-33](https://user-images.githubusercontent.com/69498804/94222822-61eebf80-ff29-11ea-8640-8b0dc65846dd.png)
์๋ ์์ฑ๋ ์นํ์์ Push Events๋ฅผ ํด๋ฆญํ์ฌ ํ์คํธ ์งํํด๋ณด์ฃ 

<br/>
<br/>

๊ทธ๋ผ ์๋์ฒ๋ผ ์ ์์ ์ผ๋ก ํธ์ ์ด๋ฒคํธ๋ฅผ ์ ์กํ์์ ํ์ธ ํ  ์ ์์ต๋๋ค

![์คํฌ๋ฆฐ์ท, 2020-09-25 12-20-30](https://user-images.githubusercontent.com/69498804/94222874-82b71500-ff29-11ea-9a83-efcbb8e1e512.png)

<br/>
<br/>

์ ๊ทธ๋ผ ์ด์  ๋ชจ๋  ์ค์ ์ด ์๋ฃ๋์์ต๋๋ค git push๋ฅผ ๋ ๋ ธ์๋ ํ์คํธ ํด๋ณด์ฃ 

```cs
root@cccr:/gitlab/devops-pipeline# ls -lart 
ํฉ๊ณ 28
drwxr-xr-x 3 student student 4096  9์ 22 15:55 ..
-rw-r--r-- 1 root    root      45  9์ 22 16:00 README.md
-rwxrwxrwx 1 root    root     208  9์ 24 17:56 Dockerfile
-rwxrwxrwx 1 root    root     355  9์ 24 18:10 Jenkinsfile-nasa
drwxr-xr-x 8 root    root    4096  9์ 25 11:57 .git
-rw-r--r-- 1 root    root       5  9์ 25 12:22 gitlab-push-test
drwxr-xr-x 3 root    root    4096  9์ 25 12:22 .
root@cccr:/gitlab/devops-pipeline# git add -A
root@cccr:/gitlab/devops-pipeline# git commit -m "event test"
[master 51f5052] event test
1 file changed, 1 insertion(+)
create mode 100644 gitlab-push-test
root@cccr:/gitlab/devops-pipeline# git push gitlab
Username for 'https://gitlab.com': nasa1515
Password for 'https://nasa1515@gitlab.com': 
์ค๋ธ์ ํธ ๊ฐ์ ์ธ๋ ์ค: 5, ์๋ฃ.
Delta compression using up to 8 threads.
์ค๋ธ์ ํธ ์์ถํ๋ ์ค: 100% (4/4), ์๋ฃ.
์ค๋ธ์ ํธ ์ฐ๋ ์ค: 100% (5/5), 450 bytes | 450.00 KiB/s, ์๋ฃ.
Total 5 (delta 2), reused 0 (delta 0)
To https://gitlab.com/nasa1515/devops-pipeline.git
e901329..51f5052  master -> master
```
์ ๋ ๋ค์๊ณผ ๊ฐ์ด gitlab-push-test๋ผ๋ ํ์ผ์ ์์ฑํด์ PUSH ํ์ต๋๋ค

<br/>
<br/>

๊ทธ๋ผ Jenkins ์์๋ Push Event๋ฅผ ์ฝ์ด์ ๋ค๋ฆ๊ณผ ๊ฐ์ด ์๋ ๋น๋ํฉ๋๋ค

![์คํฌ๋ฆฐ์ท, 2020-09-25 12-23-53](https://user-images.githubusercontent.com/69498804/94223072-fbb66c80-ff29-11ea-94f5-2b7e440ca6e7.png)

<br/>

---

### ๋ง์น๋ฉฐโฆ  

์ด๋ฒ ํฌ์คํธ์์๋ Jenkins๋ฅผ ์ฌ์ฉํด์ CI ๋ถ๋ถ์ ์๋ํ ํด๋ดค์ต๋๋ค.  
์ฌ์ค ์ด์ ๊น์ง๋ DevOps๋ผ๋ ๊ฐ๋์ ๋ํด์ ์ถ์์ ์ผ๋ก๋ง ์๊ณ ์์์ ๋ฟ์ด์ง ์ด๋ค ์์๋ค์ ํ๋์ง๋ ์ ํํ ๋ชฐ๋์์ต๋๋ค.  
์์ง ํ์ดํ๋ผ์ธ์ ํตํฉ ์  ์ฌ์  ์ค์  ๋จ๊ณ์ด์ง๋ง ์ด๋ฏธ์ง๋ ์ด๋ค์์ผ๋ก ๋น๋๋ฅผ ์ํํ๋์ง  
๊ทธ๋ฆฌ๊ณ  ๋ฐฐํฌ๋ ์ด๋ค์์ผ๋ก ํ๋์ง ๋ฑ๋ฑ์ ์๊ฒ ๋์์ต๋๋ค.

ํนํ ์ถ์์ ์ด๋ DevOps์ ์ถ์ธ์ ๋ง์ถ์ด์ CI ์์ฐ์ค๋ฝ๊ฒ ์ฐ๊ฒฐ์ ์ง์๊ณ   
์ถ๊ฐ์ ์ผ๋ก ๊ฒฐ๊ณผ์ ๋ํ Noti๋ฅผ Slack๋ฑ์ผ๋ก ์ ๋ฌ๋ฐ๋ ๊ธฐ๋ฅ๋ ์ถ๊ฐํ  ์์ ์๋๋ค.  
๋ค์ ํฌ์คํธ์๋ Rancher๋ฅผ ์ด์ฉํ ํด๋ฌ์คํฐ ๊ตฌ์ถ์ ๋ํด์ ์ ์ฉํด๋ณด๊ณ  ์ ๋ฆฌํ๋ ์๊ฐ์ ๊ฐ๋๋ก ํ๊ฒ ์ต๋๋ค.


---


```toc
```