---
emoji: ๐คฆโโ๏ธ
title: "[DEVOPS] - Jenkins Pipeline์ OWASP ZAP ๋์๊ธฐ"
date: "2021-08-09 00:39:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


๋จธ๋ฆฌ๋ง  

์ด๋ฒ ํฌ์คํธ์์๋ ๊ตฌ์ถ๋ DevSecOps ํ์ดํ๋ผ์ธ์์ ๋ณด์์ชฝ์ ๊ฐํํ๊ธฐ ์ํด์ OWASP ZAP์ ๋์ํ ๋์๊ธฐ ํฌ์คํธ์๋๋ค.  
๋ณดํต ์ธ๋ถ ์๋ฒ๋ก ๋๊ณ  ์๋น์ค์ Port๋ IP๋ฑ์ ์ค์บํ์ง๋ง ์ ํฌ๋ k8s ํด๋ฌ์คํฐ์ ์ง์  ์ฌ๋ ค pod๋ค์ ์ค์บ๋ ํ๋ ค๊ณ  ํ์ต๋๋ค.



---

* ์ฌ์ฉ ํ  ํด์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.  

    - Jenkins
    * OWASP ZAP


<br/>

---




## โ GCP์ LB IP๋ฅผ ๊ณ ์ 



* ์ ๋ gcloud-sdk๋ฅผ ์ด์ฉํ์ฌ Cloud Shell์์ ์์์ ์งํํ์ต๋๋ค

    ์๋์ ๊ฐ์ด CLoud Shell์ ์๊ฒฉ ์ ์ ํ GKE ํด๋ฌ์คํฐ์ ๋ํ ๊ถํ์ ๋ฐ์์ต๋๋ค


    ```cs
    h43254@cloudshell:/etc (cccr-nov2)$ gcloud config set compute/zone us-central1-f
    Updated property [compute/zone].
    h43254@cloudshell:/etc (cccr-nov2)$ 
    h43254@cloudshell:/etc (cccr-nov2)$ gcloud container clusters get-credentials c-dcn6h
    Fetching cluster endpoint and auth data.
    kubeconfig entry generated for c-dcn6h.
    h43254@cloudshell:/etc (cccr-nov2)$ kubectl get nodes
    NAME                                  STATUS   ROLES    AGE     VERSION
    gke-c-dcn6h-default-0-41c99d2b-b3hf   Ready    <none>   2d21h   v1.17.12-gke.1501
    gke-c-dcn6h-default-0-41c99d2b-zkp7   Ready    <none>   2d21h   v1.17.12-gke.1501
    ```

<br/>

* ๊ทธ ํ ์๋ ๋ช๋ น์ด๋ก ์ธ๋ถ ๊ณ ์  IP๋ฅผ ์์ฑํด์ค๋๋ค

    ```cs
    h43254@cloudshell:~ (cccr-nov2)$ gcloud compute addresses create app-lb
    For the following address:
    - [test-lb-ip]
    choose a region or global:
    [1] global
    [2] region: asia-east1
    [3] region: asia-east2
    [4] region: asia-northeast1
    [5] region: asia-northeast2
    [6] region: asia-northeast3
    [7] region: asia-south1
    [8] region: asia-southeast1
    [9] region: asia-southeast2
    [10] region: australia-southeast1
    [11] region: europe-north1
    [12] region: europe-west1
    [13] region: europe-west2
    [14] region: europe-west3
    [15] region: europe-west4
    [16] region: europe-west6
    [17] region: northamerica-northeast1
    [18] region: southamerica-east1
    [19] region: us-central1
    [20] region: us-east1
    [21] region: us-east4
    [22] region: us-west1
    [23] region: us-west2
    [24] region: us-west3
    [25] region: us-west4
    Please enter your numeric choice:  19         

    Created [https://www.googleapis.com/compute/v1/projects/cccr-nov2/regions/us-central1/addresses/app-lb].
    h43254@cloudshell:~ (cccr-nov2)$ gcloud compute addresses list
    NAME                 ADDRESS/RANGE   TYPE      PURPOSE  NETWORK  REGION           SUBNET  STATUS
    app-lb               35.223.27.28    EXTERNAL                    us-central1              RESERVED
    jenkins-external-ip  34.64.237.112   EXTERNAL                    asia-northeast3          IN_USE
    rancher              34.64.228.193   EXTERNAL                    asia-northeast3          IN_USE
    ```

<br/>

* ์ดํ์ ๋ฐฐํฌ ํ  ์๋น์ค์ ๋ฉ๋ํ์คํธ ํ์ผ์ ``spec.loadBalancerIP``ํญ๋ชฉ์ ์ ์ํ์ฌ LB IP๋ฅผ ๊ณ ์ ํ์ฌ ๋ฃ์ด์ฃผ์ด์ผ ํฉ๋๋ค.

    GCP์ ๊ฒฝ์ฐ LoadBalancerIP ํญ๋ชฉ์ ๋ช์ํด์ฃผ๋ฉด ์๋์ผ๋ก ๋งค์นญ๋์ด ์๋น์ค๊ฐ ์ฌ๋ผ์ต๋๋ค!


    ```cs
    apiVersion: v1
    kind: Service
    metadata:
    annotations:
        cloud.google.com/neg: '{"ingress":true}'
        field.cattle.io/publicEndpoints: '[{"addresses":["35.223.27.28"],"port":8080,"protocol":"TCP","serviceName":"cd-test:app","allNodes":true}]'
        kompose.cmd: kompose convert
        kompose.version: 1.21.0 (992df58d8)
    labels:
        io.kompose.service: {{ .Values.name.app }}
    name: app-lb
    namespace: {{ .Values.namespace }}
    spec:
    externalTrafficPolicy: Cluster
    ports:
    - name: "8080"
        port: 8080
        protocol: TCP
        targetPort: 8080
    selector:
        io.kompose.service: {{ .Values.name.app }}
    sessionAffinity: ClientIP
    type: LoadBalancer
    loadBalancerIP: 35.223.27.28    <<<<์ด๋ถ๋ถ>>>>
    ```

<br/>



* Service์ ๋ฐฐํฌ๊ฐ ์๋ฃ๋๋ฉด ์๋์ ๊ฐ์ด ``App-lb``๊ฐ ``IN_USE``๋ก ๋ฐ๋ ๊ฒ์ ํ์ธํ  ์ ์์ต๋๋ค.

    ```cs
    h43254@cloudshell:~ (cccr-nov2)$ gcloud compute addresses list
    NAME                 ADDRESS/RANGE  TYPE      PURPOSE  NETWORK  REGION           SUBNET  STATUS
    app-lb               35.223.27.28   EXTERNAL                    us-central1              IN_USE
    jenkins-external-ip  34.64.237.112  EXTERNAL                    asia-northeast3          IN_USE
    rancher              34.64.228.193  EXTERNAL                    asia-northeast3          IN_USE
    ```
<br/>

* ๋ํ k8s ํด๋ฌ์คํฐ์์๋ ํด๋น LB IP๋ก ์๋น์ค๊ฐ ์ ์์ ์ผ๋ก ์์ฑ๋จ์ ํ์ธ!

    ```cs
    h43254@cloudshell:~ (cccr-nov2)$ kubectl get svc -n cd-test
    NAME     TYPE           CLUSTER-IP    EXTERNAL-IP    PORT(S)          AGE
    app-lb   LoadBalancer   10.0.30.127   35.223.27.28   8080:32530/TCP   9m2s
    mysql    ClusterIP      10.0.24.243   <none>         3306/TCP         18h
    ```

<br/>

----



## โ Jenkins์ OWASP ZAP ์ค์น


์ฒ์์๋ Kubernetes์ Helm์ผ๋ก ZAP์ ๋ฐฐํฌํ๋ ค๊ณ  ํ์์ง๋ง  
URL์ ์ฝ์ด์ค๋ SPIDER๋ฑ์ ์ค์  ๊ฐ์ด๋๊ฐ ๋ง์ด ๋ถ์กฑํด์ Jnekins์ ์ฐ๋ํ๊ธฐ๋ก ํ์ต๋๋ค

<br/>

* ์ ์ผ ์ฒ์์ผ๋ก ๊ฐ์ฅ ์ต์  ๋ฆด๋ฆฌ์ฆ ๋ฒ์ ์ ZAPPROXY๋ฅผ ๋ค์ด๋ฐ์ต๋๋ค.
    * [๋งํฌ](https://github.com/zaproxy/zaproxy/releases)

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 18-12-23](https://user-images.githubusercontent.com/69498804/97682414-78b1a480-1adb-11eb-958b-0e649ab8c4b3.png)

    <br/>

    * ์ดํ ๋ค์ด๋ฐ์ Zipํ์ผ์ Jenkins ์ธ์คํด์ค์ ``๋ณต์ฌ``ํฉ๋๋ค.

    ```cs
    [root@jenkins bin]# pwd
    /usr/local/bin
    [root@jenkins bin]# ls -alrt ZAP_D-2020-10-26/
    total 5472
    -rwxr-xr-x. 1 jenkins jenkins    4187 Feb  1  1980 zap.sh
    -rw-r--r--. 1 jenkins jenkins  123778 Feb  1  1980 zap.ico
    -rw-r--r--. 1 jenkins jenkins 5440213 Feb  1  1980 zap-D-2020-10-26.jar
    -rw-r--r--. 1 jenkins jenkins     206 Feb  1  1980 zap.bat
    drwxr-xr-x. 2 jenkins jenkins     161 Feb  1  1980 xml
    drwxr-xr-x. 3 jenkins jenkins      23 Feb  1  1980 scripts
    -rw-r--r--. 1 jenkins jenkins    2157 Feb  1  1980 README
    drwxr-xr-x. 2 jenkins jenkins    4096 Feb  1  1980 plugin
    drwxr-xr-x. 2 jenkins jenkins     265 Feb  1  1980 license
    drwxr-xr-x. 2 jenkins jenkins    4096 Feb  1  1980 lib
    drwxr-xr-x. 2 jenkins jenkins    4096 Feb  1  1980 lang
    drwxr-xr-x. 2 jenkins jenkins     140 Feb  1  1980 db
    drwxr-xr-x. 3 root    root         86 Oct 28 07:09 ..
    drwxr-xr-x. 9 jenkins jenkins     180 Oct 29 10:40 .
    ```


<br/>



* ๋ณต์ฌ๊ฐ ๋๋ฌ๋ค๋ฉด Jenkins์ OWASP ZAP ๊ด๋ จ Plugin ๋ค์ ๋ชจ๋ ์ค์นํฉ๋๋ค.  


    ![์คํฌ๋ฆฐ์ท, 2020-10-30 16-58-32](https://user-images.githubusercontent.com/69498804/97674610-279cb300-1ad1-11eb-9494-067695600318.png)

    * Official OWASP ZAP Jenkins Plugin
    * OWASP Dependency-Check Plugin
    * OWASP Dependency-Track Plugin
    * OWASP Markup Formatter Plugin
    * JDK

<br/>

* ํ๋ฌ๊ทธ์ธ์ด ์ค์น๊ฐ ์๋ฃ๋์๋ค๋ฉด ZAP์ ํ๊ฒฝ๋ณ์ ์ค์ ์ ํฉ๋๋ค.

    * Manage Jenkins -> configure System ํญ์์ ์ค์ 


<br/>

* ๋ฏธ๋ฆฌ Jenkins ์ธ์คํด์ค ๋ด์ Clone ํด๋์๋ zap.sh ์คํฌ๋ฆฝํธ๊ฐ ์กด์ฌํ๋ ์์น ์ง์   

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 17-39-16](https://user-images.githubusercontent.com/69498804/97678244-d7c0ea80-1ad6-11eb-8024-da31b3d943ee.png)

    * Environment variables : ์ฒดํฌ
    * List of variables.name : ZAPROXY_HOME -> ๋์ค์ ํ๋ก์ ํธ์์ ์ค์ ํ  ์์น
    * List of variables.Value : ์ค์  Jenkins ์๋ฒ์ zap.sh ์คํฌ๋ฆฝํธ ์์น.

<br/>

* ZAP PROXY ์ค์   

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 17-38-45](https://user-images.githubusercontent.com/69498804/97678185-c4ae1a80-1ad6-11eb-8db4-eda98456b84b.png)

    * Default Host : Jenkins ์๋ฒ์ ๋ก์ปฌ๋ก ๋๋ฆฌ๊ธฐ ์ํ ๊ฐ.
    * Default Port : Jenkins ์๋ฒ์์ ๋์ํ  Port ๋ฒํธ


<br/>

* ํ๊ฒฝ๋ณ์ ์ค์  ํ freestyle์ ํ๋ก์ ํธ๋ฅผ ์์ฑํฉ๋๋ค.  


    ![์คํฌ๋ฆฐ์ท, 2020-10-30 16-57-15](https://user-images.githubusercontent.com/69498804/97674823-83673c00-1ad1-11eb-99ed-53a6f5531b41.png)


<br/>

* ์ดํ Build tab์์ ``Excute ZAP``์ ์ถ๊ฐํด Zap PROXY์ ์ค์ ์ ํด์ค๋๋ค.


    ![์คํฌ๋ฆฐ์ท, 2020-10-30 17-03-11](https://user-images.githubusercontent.com/69498804/97674988-ccb78b80-1ad1-11eb-9f85-b09ca675f922.png)

    * localhost : Jenkins ์๋ฒ์ ๋ก์ปฌ์์ ๋์.
    * override Port : Jenkins ์๋ฒ์์ ๋์ํ  Zap์ ์ฌ์ฉํฌํธ
    * JAVA : OWASP ZAP์ JAVA๊ธฐ๋ฐ์ผ๋ก ๋๊ธฐ๋๋ฌธ์ JDK ํ๋ฌ๊ทธ์ธ์ ์ถ๊ฐ ์ค์น๊ฐ ํ์ํฉ๋๋ค



<br/>


* ์ด์  ZAP์ ์คํ Method์ ๊ด๋ จ ์ค์ ์ ํด์ค๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 17-04-54](https://user-images.githubusercontent.com/69498804/97675101-0ab4af80-1ad2-11eb-8ca4-a1d424602fb4.png)


    * Environment Variable : ์ด์ ์ ์ค์ ํ๋ OWASP ZAP์ ํ๊ฒฝ๋ณ์ ๊ฐ ๊ธฐ์
    * ZAP Home Directory : Jenkins ์๋ฒ์ ๋ฏธ๋ฆฌ Clone ํด๋์ Zap.sh ํ์ผ์ ์์น ๊ธฐ์
    * Filename : job-seesion์ผ๋ก default ์ก์์ฃผ๋ฉด ๋ฉ๋๋ค


<br/>

* ์ด์  Session Properties ์ค์ ์ ํด์ค๋๋ค.


    ![์คํฌ๋ฆฐ์ท, 2020-10-30 17-07-17](https://user-images.githubusercontent.com/69498804/97675273-5ebf9400-1ad2-11eb-962e-d710a3dc9968.png)


    * Context Name : default๋ก ์ปจํ์คํธ๋ฅผ ์ก์์ฃผ๋ฉด ๋ฉ๋๋ค.
    * Include in Context : ๊ฒ์ฌํ  URL์ ์ฃผ์๋ฅผ ๋ฃ์ด์ฃผ๋ฉด ๋ฉ๋๋ค
    * Username : ์ค์  ์ฌ์ดํธ์ ๋ค์ด๊ฐ๊ธฐ ์ํ Account User ์ ๋ณด
    * Password : Account User์ PASSWORD ์ ๋ณด
    * Logged in Indicator	: ์ค์บ์ ๋ง์น๊ณ  ๋์ฌ ๋ฉ์ธ์ง๋ฅผ ์ ์ผ๋ฉด ๋ฉ๋๋ค ``\QLogout\E``


<br/>

* ๋ฐ๋ก ์๋์ ์๋ Form-based Authentication ์ค์ ๋ ์ถ๊ฐํด์ค๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 17-28-05](https://user-images.githubusercontent.com/69498804/97677213-469d4400-1ad5-11eb-93c7-7c2bdd55344c.png)

    * Login Form Target URL : ๋ก๊ทธ์ธ Parameter๋ฅผ ๊ธฐ์ํ  URL ์ฃผ์๋ฅผ ๊ธฐ์
    * Username Parameter : Username Parameter ๊ฐ์ ๊ธฐ์ํด์ค๋๋ค.
    * Password Parameter : Password Parameter ๊ฐ์ ๊ธฐ์ํด์ค๋๋ค.  
    * Attack Mode.Starting Point	: ์ค์บํ  URL์ ๊ฐ์ฅ ์ด๊ธฐ URL์ ์ ์ด์ค๋๋ค.


<br/>

* ๋ฐ๋ก ์๋์ ์๋ Spider Scan ์ค์ ๋ ์ถ๊ฐํด์ค๋๋ค.


    ![์คํฌ๋ฆฐ์ท, 2020-10-30 17-30-26](https://user-images.githubusercontent.com/69498804/97677451-9b40bf00-1ad5-11eb-93a2-87d01ae6fe77.png)


    * Spider Scan : ์ฒดํฌ
    * Recurse : ์ฒดํฌ
    * Subtree Only : ์ฒดํฌ
    * Active Scan : ์ฒดํฌ
    * Policy : default Policy ๋ก ์ค์ 
    * Recurse : ์ฒดํฌ

* ์ค์บ ๊ฒฐ๊ณผ์ ๋ฆฌํฌํธ ํ์ผ์ ๋จ๊ธฐ๊ธฐ ์ํด์ Generate Reports ์ค์ ์ ์ถ๊ฐํฉ๋๋ค.

    * Generate Reports : ์ฒดํฌ
    * Clean Workspace Reports : ์ฒดํฌ
    * Filename : ~ {BUILD_ID} ๋น๋ ๋๋ฒ๋ก ๋จ๊ธฐ๊ธฐ ์ํ ์ค์ 

<br/>

* Report ํ์ผ์ ํ์์ด ๋ค์๊ณผ ๊ฐ์์ ํ์ธํฉ๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 17-33-45](https://user-images.githubusercontent.com/69498804/97677724-11452600-1ad6-11eb-9a15-0b11ac43f947.png)

    * Generate Report : xml, html ์ค์  ํ์ธ


<br/>

* POST Build ACTION์ ์ค์ ํด์ค๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 17-34-32](https://user-images.githubusercontent.com/69498804/97677797-2de15e00-1ad6-11eb-9611-b0d58fd7988c.png)


    * Files to archive : ๊ฒฐ๊ณผ ํ์ผ๋ก ๋์์ค ๋ก๊ทธ์ ๋ฆฌํฌํธ ํ์ผ์ ์์น.
    * HTML directory to archive : Report ํ์ผ์ ๋๋ ํ ๋ฆฌ ๊ธฐ์
    * Index page[s] : ์์์ ์์ฑํด์คฌ๋ ``[REPORT ํ์ผ๋ช].html`` ๊ธฐ์.
    * Report title : html๋ก ๋์์ค ๋ฆฌํฌํธ ๊ฒฐ๊ณผ์ ์ ๋ชฉ


<br/>

---

## ๐ ๋น๋ ํ์คํธ!

* Jenkins์ OWASP ZAP ํ๋ก์ ํธ์์ ๋น๋!

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 18-14-55](https://user-images.githubusercontent.com/69498804/97683734-d34b0080-1adb-11eb-9785-af9b9eb6d381.png)

    * ๋น๋๊ฐ ์๋ฃ๋๋ฉด ์์ ๊ทธ๋ฆผ๊ณผ ๊ฐ์ด html,xml ๋ก๊ทธ๊ฐ ์์ฑ๋ฉ๋๋ค.

<br/>


* ์ค์  ํด๋น Report ํ์ผ์ ์ ์ํ๋ฉด ์๋์ ๊ฐ์ ํ์์ผ๋ก ๋ฆฌํฌํธ ํด์ฃผ๋ ๊ฒ์ ํ์ธ๊ฐ๋ฅํฉ๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 18-15-54](https://user-images.githubusercontent.com/69498804/97684035-f5dd1980-1adb-11eb-8207-790e2b143e8b.png)


<br/>

* ๋ฆฌํฌํธ ํ์ผ์ ํ์ธํด๋ณด๋ฉด ํํ์ด์ง์ A1,A2๋ฑ์ ์ทจ์ฝ์  ๊ฒ์ฌ๋ฅผ ์๋์ผ๋ก ํ ๊ฒ์ด ํ์ธ๊ฐ๋ฅํฉ๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 18-16-51](https://user-images.githubusercontent.com/69498804/97684390-17d69c00-1adc-11eb-8c1e-9c0dd0cd26c2.png)


<br/>

* ์ค์  ๋์์ ํด๋น ์นํ์ด์ง์ user, password๋ฅผ ์๋์ผ๋ก ๊ธฐ์ํด์ฃผ๊ณ 

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 18-17-57](https://user-images.githubusercontent.com/69498804/97684956-3fc5ff80-1adc-11eb-8c9f-be7222b8a14b.png)


<br/>

* ๋ฉ์ธ ํ์ด์ง์ ์ฐ๊ฒฐ๋์ด์๋ 1~10๊น์ง์ ๋ณด์์ทจ์ฝ์ ์ ๋ํด ์๋์ผ๋ก ์ค์บ์ ํด์ค๋๋ค.

    ![์คํฌ๋ฆฐ์ท, 2020-10-30 18-18-39](https://user-images.githubusercontent.com/69498804/97685276-58361a00-1adc-11eb-8b96-c86e60d393e4.png)


<br/>

----


## ๋ง์น๋ฉฐโฆ  

์ฌ์ค ๋ณด์ํด์ ์๋ํ๋ ๋ฌผ๋ก ์ด๊ณ  ๋ณด์ํด์ ์ฌ๋ ค๋ณด๋ ๊ฒ ์กฐ์ฐจ ์ด๋ฒ์ด ์ฒ์์ด์์ต๋๋ค.  
์ฒ์์ Helm์ผ๋ก k8s ํด๋ฌ์คํฐ์ ๋ฐฐํฌํ๋ ค๋ ์ํ์ฐฉ์ค๋ฅผ 3์ผ์ ๋ ๊ฒช๊ณ , ์คํจํ๊ณ , Docker ์ปจํ์ด๋ ๊ธฐ๋ฐ์ผ๋ก ์ฌ๋ฆฌ๊ณ , ์คํจํ๊ณ ๋ฅผ ๋ฐ๋ณตํ๋ฉด์ 5์ผ์ ๋๋ฅผ ๋ ๋ ธ๋ ๊ฒ ๊ฐ์ต๋๋ค.  
๊ฒฐ๊ตญ Jenkins๋ก ํ์ดํ๋ผ์ธ์ ์๋์ ์ผ๋ก ์ค์บํ๋๋ก ์ค์ ํจ์ผ๋ก ๋ง๋ฌด๋ฆฌ๋ฅผ ์ง์์ง๋ง ์์ง ๋ฏธ๋ จ์ ์กฐ๊ธ ๋จ์์๋ ์ํ์๋๋ค.  
ํ๋ก์ ํธ๊ฐ ๋๋๊ณ  ๊ฐ์ธ์ ์ผ๋ก Helm์ ์ด์ฉํด ํด๋ฌ์คํฐ์ ์ง์  ๋ฐฐํฌํ๋ ๊ฒ๋ ์ฑ๊ณตํด๋ด์ผ๊ฒ ์ต๋๋ค  
์ด๋ฒ OWASP ZAP ๋์๊ธฐ๋ฅผ ์์ฑํ๋ฉด์ DevSecOps ํ์ดํ๋ผ์ธ์ ๋ณด์์ ๋ํด์ ์กฐ๊ธ์ ๊ฐ์ ์ก์ ๊ฒ ๊ฐ์ต๋๋ค.  
์ค์ ๋ก OWASP ZAP ๊ด๋ จํด์ ํ๊ธ๋ฌธ์๋ ์ ํํ ์ค์  ๊ฐ์ด๋๊ฐ ๋ฏธํกํ๋ค ๋ณด๋  
์ด๋ฒ ํฌ์คํธ๊ฐ ๋ง์ ์ฌ๋๋ค์๊ฒ ๋์์ด ๋์์ผ๋ฉด ์ข๊ฒ ์ต๋๋ค.

---

```toc
```