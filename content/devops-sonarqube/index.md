---
emoji: ๐คฆโโ๏ธ
title: "[DEVOPS] - SonarQube With Jenkins"
date: "2021-08-12 00:39:25"
author: nasa1515
tags: DevOps
categories: DevOps
---



๋จธ๋ฆฌ๋ง  

์ด๋ฒ ํฌ์คํธ๋ก ์ด์  ํ์ดํ๋ผ์ธ์์ ๋์ํ๋ ์ ์ฒด์ ์ธ ๋ณด์ํด์ ๋ํ ํฌ์คํธ๋ ๋๋ฌ์ต๋๋ค.  
์ต์ข์ ์ผ๋ก๋   

1. SonarQube๋ก Build ๋  ์ด๋ฏธ์ง์ ์์ค์ฝ๋์ ๋ํ ์ ๋ต์  ์ ์ ๋ถ์์   
2. Anchore๋ก ๋น๋๋ ์ด๋ฏธ์ง์ ๋ํ ๋ถ์์  
3. OWASP ZAP์ผ๋ก ๋ฐฐํฌ ๋ ์๋น์ค์ ๋ํ ๋์ ๋ถ์  

์ ์ธ๊ฐ์ง ๋ณด์ ํญ๋ณต์ Jenkins๋ฅผ ์ด์ฉํด ์๋ํ ํ์์ต๋๋ค.


---


* ์ฌ์ฉ ํ  ํด์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.  

    - Jenkins
    * Sonarqube

---

## โ SonarQube ??

์ํค๋ฐฑ๊ณผ ์

*์๋ํ๋ธ(SonarQube, ์ด์  ์ด๋ฆ: ์๋/Sonar)๋ 20๊ฐ ์ด์์ ํ๋ก๊ทธ๋๋ฐ ์ธ์ด์์ ๋ฒ๊ทธ, ์ฝ๋ ์ค๋ฉ, ๋ณด์ ์ทจ์ฝ์ ์ ๋ฐ๊ฒฌํ  ๋ชฉ์ ์ผ๋ก ์ ์  ์ฝ๋ ๋ถ์์ผ๋ก ์๋ ๋ฆฌ๋ทฐ๋ฅผ ์ํํ๊ธฐ ์ํ ์ง์์ ์ธ ์ฝ๋ ํ์ง ๊ฒ์ฌ์ฉ ์คํ ์์ค ํ๋ซํผ์ด๋ค.  
์๋ํ๋ธ๋ ์ค๋ณต ์ฝ๋, ์ฝ๋ฉ ํ์ค, ์ ๋ ํ์คํธ, ์ฝ๋ ์ปค๋ฒ๋ฆฌ์ง, ์ฝ๋ ๋ณต์ก๋, ์ฃผ์, ๋ฒ๊ทธ ๋ฐ ๋ณด์ ์ทจ์ฝ์ ์ ๋ณด๊ณ ์๋ฅผ ์ ๊ณตํ๋ค.*

์ ์ฝ์ด๋ณด๋ ๊ฐ๋ฐ์๋ค์๊ฒ ์ ์ฉํ ์ ์ ๋ถ์ ํด์๋๋ค.

<br/>

---



### SonarQube ์ค์น

* ์ด๋ฒ ํฌ์คํธ์์ SonarQube์ ์ค์น๊ณผ์ ์ ๋ค๋ฃจ์ง ์์ต๋๋ค.  
  ์ฆ ์ด๋ฏธ SonarQube ์๋ฒ์, Jenkins ์๋ฒ๊ฐ ์ค์น๋์๋ค๋ ๊ฐ์ ํ์ ์งํํ์์ต๋๋ค.

<br/>


* ์ค์น์ ๊ด๋ จ๋ ํฌ์คํธ๋ [์ฌ๊ธฐ](https://www.lesstif.com/software-architect/sonarqube-39126262.html)๋ฅผ ์ฐธ๊ณ ํด์ฃผ์ธ์

<br/>



---



### Jenkins ์ค์  <a name="a2"></a>

<br/>

* Jenkins ๋ด์์ SonarQube๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด์๋ ์๋ ํ๋ฌ๊ทธ์ธ ์ค์น๊ฐ ํ์ํฉ๋๋ค.

    ![AAAAAA](https://user-images.githubusercontent.com/69498804/103322025-cf0d7600-4a7f-11eb-8081-02b118e9b30c.PNG)


    * ์์ธํ ํ๋ฌ๊ทธ์ธ ์ ๋ณด๋ [๋งํฌ](https://plugins.jenkins.io/sonar/) ํ์ธํด์ฃผ์ธ์



<br/>

* ํ๋ฌ๊ทธ์ธ ์ค์น๊ฐ ์๋ฃ๋์๋ค๋ฉด Jenkins ํ๊ฒฝ์ค์ ์์ Sonarqube ์๋ฒ์ ์ค์ ์ด ํ์ํฉ๋๋ค.

    ![222222](https://user-images.githubusercontent.com/69498804/103322080-09771300-4a80-11eb-8022-2f2b6e12fd14.PNG)

    * ์ค์นํ SonarQube ์๋ฒ์ ์ ๋ณด๋ฅผ ๊ธฐ์ํด์ค๋๋ค


<br/>


* Jenkins Global tool configuration ํญ์์ Scanner์ ๋ํ ์ค์ ์ ํฉ๋๋ค.

    ![3332131](https://user-images.githubusercontent.com/69498804/103322135-54912600-4a80-11eb-8b21-23d6f51e0fea.PNG)

    * ๋ณ๋ค๋ฅด๊ฒ ์์ดํ๋ ๋ถ๋ถ์ ์์ด ๋์ผํ๊ฒ ์ค์ ํ๋ฉด ๋์๋ฉ๋๋ค.

<br/>

* ํ์ดํ๋ผ์ธ ํ๋ก์ ํธ์์ SonarQube์ ๋ณ์๋ค์ ์ ์ธ ํด์ค๋๋ค(์คํฌ๋ฆฝํธ์ ํธ์์ฑ์ ์ํจ)  

    ![KakaoTalk_20201228_200226180](https://user-images.githubusercontent.com/69498804/103388784-54f7f280-4b4e-11eb-8547-d643c8756523.png)

    ![KakaoTalk_20201228_200226346](https://user-images.githubusercontent.com/69498804/103388805-6fca6700-4b4e-11eb-8064-e7896067a891.png)


<br/>


* ์ด์  SonarQube ์๋ฒ์์ Jenkins ์๋ฒ์ ๋ํ Webhook์ ์ค์ ํฉ๋๋ค.

    ![3333333333](https://user-images.githubusercontent.com/69498804/103322208-97eb9480-4a80-11eb-8848-bd3142e2bb53.PNG)

    * Jenkins ์๋ฒ์ IP์ Port๋ก ์นํ์ ๊ฑธ์ด์ฃผ์๋ฉด ๋ฉ๋๋ค.


<br/>

* ์ ์์ ์ผ๋ก ์ค์ ์ด ๋์๋ค๋ฉด ๋ค์๊ณผ ๊ฐ์ด ์นํ์ด ์์ฑ๋ฉ๋๋ค.

    ![AAAAAAAAAAADDDDD](https://user-images.githubusercontent.com/69498804/103322240-b6ea2680-4a80-11eb-9bfe-eb624f8054b9.PNG)


์ด์  Jenkins์์ SonarQube๋ฅผ ์ฌ์ฉ ํ  ์ ์์ต๋๋ค!!

<br/>

---


### Jenkins Pipeline Script ์์ 


๊ทธ๋ผ ํ์ดํ๋ผ์ธ ์คํฌ๋ฆฝํธ ๋ด์ SonarQube์ ๊ด๋ จ๋ ๋ด์ฉ์ ์ฝ์ํด๋ณด๊ฒ ์ต๋๋ค.


* ํ์ดํ๋ผ์ธ ๋ด์ฉ

    ```cs
    properties([
    parameters([
        string(name: 'sonar.projectKey', defaultValue: 'com.appsecco:dvja'),
        string(name: 'sonar.host.url', defaultValue: 'http://34.64.237.112:9000'),
        string(name: 'sonar.login', defaultValue: '608cacd6bb83c50712ebb34c4cba377c841cdebb')
    ]) 
    ])
    ...
    ```

    ์ฐ์  ๊ฐ๋จํ๊ฒ ํ์ดํ๋ผ์ธ์ ์์ฑํ๊ธฐ์ํด ๋ณ์ ์ค์ ์ ํ์ต๋๋ค.

<br/>

* ๊ทธ๋ฆฌ๊ณ  SonarQube์ SonarQube ๋ด์์๋ Dependency-Check๋ฅผ ์์ฑํด์ค๋๋ค.

    ```cs
            stage ('Dependency-Check Analysis') {
                steps {
                    sh '/var/lib/jenkins/dependency-check/bin/dependency-check.sh --scan `pwd` --format XML --out /var/lib/jenkins/workspace/ci-build-pipeline/dependency-check-report --prettyPrint'
                    
                    dependencyCheckPublisher pattern: 'dependency-check-report/dependency-check-report.xml'
                }
            }
            stage('Sonarqube and Quality gate') {
                options {
                    timeout(time: 5, unit: 'MINUTES')
                    retry(2)
                }
                steps {
                    withSonarQubeEnv('SonarQube Server') {
                        sh "mvn sonar:sonar"
                    }
                    script {
                        qualitygate = waitForQualityGate()
                        if (qualitygate.status != "OK") {
                            currentBuild.result = "FAILURE"
                        }
                    }
                }
            }
    ```
<br/>

์ฌ๊ธฐ๊น์ง๋ง ํ๋ฉด ํ์ดํ๋ผ์ธ ๋ด์์๋ SonarQube๋ ์ ์๋์ํฉ๋๋ค.

---


### ํ์ดํ๋ผ์ธ ์คํ ๊ฒฐ๊ณผ



* ์ด์  ๋ชจ๋  ํ์ดํ๋ผ์ธ ๊ตฌ์ฑ์ด ์๋ฃ๋์์ต๋๋ค.


    ![์บก์ฒ](https://user-images.githubusercontent.com/69498804/103388929-262e4c00-4b4f-11eb-8ff4-ac9d873625eb.PNG)


    * ํ์ดํ๋ผ์ธ ์คํฌ๋ฆฝํธ์ STAGE๋ณ ์์ ์งํ๋๋ฅผ ์์๊ฐ์ด ํ์ธ ํ  ์ ์์ต๋๋ค.
    * ๋ํ SonarQube์ ๋ถ์ ๊ฒฐ๊ณผ ๊ทธ๋ํ๋ ์์ ๊ฐ์ด ํ์ธ ํ  ์ ์์ต๋๋ค.



<br/>

* SonarQube์ Check-style ๋ฑ์ ๊ฒฝ์ฐ ๋ค๋ฅธ ๋ฆฌํฌํธ๋ฅผ ์์ฑํฉ๋๋ค.  

    ![KakaoTalk_20201228_200227145](https://user-images.githubusercontent.com/69498804/103388989-91781e00-4b4f-11eb-8614-1ebeac419ec4.png)

    * PASSED์ ๊ฒฝ์ฐ ์ฌ์ฉ์๊ฐ ERROR Level์ ์์๋ก ์ค์  ํ  ์ ์์ต๋๋ค.

<br/>

----

## ๋ง์น๋ฉฐโฆ  

์งํํ ํ๋ก์ ํธ์ ๋ณด์ํด์ ๋ชจ๋ ๋ง๋ฌด๋ฆฌ ๋์์ต๋๋ค.      
๋ฏธ๋ฆฌ ๋ฏธ๋ฆฌ ์ ๋ฆฌํด๋์๋ ๋ฌธ์๋ค์ ๋ค์ ๋ณด๋ฉด์ ์ ๋ฆฌํ๋ ค๊ณ  ํ๋ค์ ๋๋ผ๊ณ  ์์ต๋๋ค.  
์ฌ์ค ๋ฌธ์ํ๊ฐ ๊ฐ์ฅ ์ค์ํ๋ค๊ณ  ์๊ฐํ์ง๋ง ์๋ฌด๋ฅผ ์งํํ๋ฉด์ ์ค์๊ฐ์ผ๋ก ๋ฌธ์ํํ๊ธฐ๋ ์ ๋ง ์ฝ์ง ์์ต๋๋ค.   
๊ทธ๋๋ ๋ธ๋ก๊ทธ ๊ธ์ ๊พธ์คํ ํฌ์คํธํ๊ณ  ๊ณต๋ถํ๋ ค๋ฉด ํ์ ํ ์ผ๋ค์ด๋ ๋ธ๋ ฅํด๋ณด๊ฒ ์ต๋๋ค.  

---

```toc
```



