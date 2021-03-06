---
emoji: ๐คฆโโ๏ธ
title: "[DEVOPS] - Jenkins๋ก Dvmn ์ฑ ์ด๋ฏธ์ง ์๋ ๋น๋ ๋ฐ ํธ์ํ๊ธฐ"
date: "2021-08-08 00:39:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


๋จธ๋ฆฌ๋ง  

์ด์  ํฌ์คํธ์์ ๊ฐ๋จํ๊ฒ ์ด๋ฏธ์ง๋ฅผ ๋น๋ํ ๋ค ArgoCD์ SYNC๋ฅผ ๋ง์ถฐ ๋ฐฐํฌ๋ฅผ ์๋ํํ ํ์ดํ ๋ผ์ธ์ ์์ฑํ์ต๋๋ค.  
์ด๋ฒ ํฌ์คํธ์์๋ Jenkins์์ ํด๋น ์ด๋ฏธ์ง๋ฅผ ๋น๋ํ๋ ๋ถ๋ถ์ ๋ํด์ ํฌ์คํธ ํ์ต๋๋ค.

---

* ์ฌ์ฉ ํ  ํด์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.  

    - Jenkins
    - maven
    - github
    - ArgoCD

---

## โ ์ ์ฒด Jenkins ํ์ดํ๋ผ์ธ


* ํ์ดํ๋ผ์ธ ์คํฌ๋ฆฝํธ

    ```cs
    properties([
    parameters([
        string(name: 'sonar.projectKey', defaultValue: 'com.appsecco:dvja'),
        string(name: 'sonar.host.url', defaultValue: 'http://34.64.237.112:9000'),
        string(name: 'sonar.login', defaultValue: '608cacd6bb83c50712ebb34c4cba377c841cdebb'),
        string(name: 'ARGOCD_DOMAIN', defaultValue: '34.67.162.44:30357'),
        string(name: 'ARGOCD_PW', defaultValue: 'argo-cd-argocd-server-6d5f98cf57-wmf46'),
        string(name: 'ARGOCD_APP_NAME', defaultValue: 'test'),
        string(name: 'tag_num', defaultValue: ''),
    ]) 
    ])
    pipeline {
        environment {
            slack_channel = '#studying'
            REGISTRY = 'cccr/jisun'
            REGISTRY_IP = '34.64.237.112'
            REGISTRYCREDENTIAL = 'harbor' 
            DOCKER_IMAGE = ''
            TAG_NUM = ''
        }
        agent any
        tools { 
            maven 'mvn' 
        }
        stages {
            stage('Git clone') {
                steps {
                    git 'https://github.com/JisunParkRea/cccr-dvwa.git'
                }
            }
            stage('Build Test') {
                steps {
                    sh 'mvn clean package -Dcheckstyle.skip -Dspotbugs.skip -Dpmd.skip'
                }
            }
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
            stage('Docker image build') { 
                steps{
                    script {
                        DOCKER_IMAGE = docker.build registry
                    
                    }
                }
            } 
            stage('Docker image push to Harbor') {
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
            }
            stage('Anchore analyse') {  
                steps {  
                    catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                    writeFile file: 'anchore_images', text: '34.64.237.112/cccr/jisun'  
                    anchore name: 'anchore_images'  
                    }
                }
            }

            stage('Push Yaml'){
                steps {
                    script{
                        try {
                            git url: "https://github.com/JisunParkRea/cccr-dvwa-helm", branch: "main", credentialsId: "github"
                            sh "rm -rf /var/lib/jenkins/workspace/${env.JOB_NAME}/helm-service/values.yaml"
                            sh """
                            cd helm-service
                            #!/bin/bash
                            cat>values.yaml<<-EOF
    # Default values for ghost.
    # This is a YAML-formatted file.
    # Declare variables to be passed into your templates.

    replicaCount: 3

    image:
    repository: jisunpark/cccr-dvwa-java-web
    tag: $BUILD_NUMBER
    pullPolicy: ""


    value: ec95c258266b8e985848cae688effa2b

    namespace: cd-test

    name: 
    app: app
    EOF"""
                            sh "cat /var/lib/jenkins/workspace/${env.JOB_NAME}/helm-service/values.yaml"
                            withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                                sh """
                                git add --all .
                                git commit -m "Deploy ${env.JOB_NAME} ${env.BUILD_NUMBER}"
                                git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/JisunParkRea/cccr-dvwa-helm
                                """
                            }                      
                            env.pushYamlResult=true
                        } catch (error) {
                            print(error)
                            echo 'Remove Deploy Files'
                            withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                                sh """
                                git reset --hard HEAD^
                                git push --force https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/JisunParkRea/cccr-dvwa-helm
                                """
                            }
                            env.pushYamlResult=false
                            currentBuild.result = 'FAILURE'
                        }
                    }
                }
            }

            stage('Argo Deploy'){
                steps {
                    script{
                        try {
                            withEnv(["PATH=/usr/local/bin:$PATH"]) {
                                sh"""
    #!/bin/bash
    expect << EOF
    spawn argocd login --grpc-web $ARGOCD_DOMAIN

    expect "WARNING: server certificate had error: x509: cannot validate certificate for 34.67.162.44 because it doesn't contain any IP SANs. Proceed insecurely (y/n)?"
    send "y\r";

    expect "Username:"
    send "admin\r";    

    expect "Password:"
    send "$ARGOCD_PW\r";    
                                    
    expect eof
    EOF
                                    argocd app get $ARGOCD_APP_NAME
                                    argocd app sync $ARGOCD_APP_NAME
                                """
                            }
                        } catch (error) {
                            print(error)
                            currentBuild.result = 'FAILURE'
                        }
                    }
                }
            }

        }
        post { 
        success { 
            slackSend (channel: SLACK_CHANNEL, color: 'good', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})") 
        }
        failure {
            slackSend (channel: SLACK_CHANNEL, color: 'bad', message: "FAILURE: '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")	
        }
        }
    }
    ```

<br/>

### ํ์ดํ๋ผ์ธ์ ํ๋ก์ธ์ค

1. ์์ค์ฝ๋๋ฅผ Clone ํด์จ ๋ค Build ํ์คํธ  
2. Dependency-Check Analysis ๋ก ์ฝ๋ ์ ์ ๋ถ์  
3. Sonarqube and Quality gate ์ ์ ๋ถ์  
4. ์์ ๊ฒ์ฌ์์ ์๋ฌ๊ฐ ์์ผ๋ฉด Docker image build  
5. ๋น๋ํ ๋์ปค์ด๋ฏธ์ง๋ฅผ HARBOR ์ ์ฅ์์ PUSH  
6. HARBOR์ ์ ์ฅ๋ ์ด๋ฏธ์ง์ ์๋ฌ ๊ฒ์ฌ  
7. ์๋ก์ด ๋น๋ ๋๋ฒ๋ก ๋ฉ๋ํ์คํธ ์์  ํ GITOPS ์ ์ฅ์๋ก ํธ์  
8. ArgoCD๋ก Sync ์์ฒญ


<br/>

---



### DVWA! ๋น๋ ์์ค ์ ์ฅ์!

<br/>

* DVWA ๋น๋์์ค ์ ์ฅ์๋ ์๋์ ๊ฐ์ด ๊ตฌ์ฑํ์ต๋๋ค.  
[์ ์ฅ์๋งํฌ](https://github.com/nasa1515/cccr-dvwa) 

    ![์คํฌ๋ฆฐ์ท, 2020-11-12 15-36-51](https://user-images.githubusercontent.com/69498804/98904414-e3f86f00-24fc-11eb-8576-c3088ed9babd.png)
    
    Jenkins ์์๋ ํด๋น ์ ์ฅ์๋ฅผ Clone ํ ์ด๋ฏธ์ง๋ฅผ ๋น๋ ํ  ์์ ์๋๋ค.


<br/>

---


### MAVEN ๋น๋ ์  ์ฌ์ ์์

<br/>

์๋ ๋ ์ค์ ์ ๋ชจ๋ ๋ง์กฑํด์ผ ์ ์์ ์ธ ๋น๋๊ฐ ๋ฉ๋๋ค.


1. Jenkins์์ JDK ์ค์   

    ![์บก์ฒ](https://user-images.githubusercontent.com/69498804/102846942-b506de80-4454-11eb-8bb9-90cd582d3447.PNG)


<br/>


2. Jenkins์์ MAVEN ์ค์ 

    ![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/102846986-cc45cc00-4454-11eb-89e4-28471be55ba7.PNG)


<br/>

---

### ๋น๋ ํ์ดํ๋ผ์ธ ์คํฌ๋ฆฝํธ

<br/>

* ์ ์ฒด์ ์ธ ํ์ดํ๋ผ์ธ ์คํฌ๋ฆฝํธ์์ MAVEN ๋น๋ ๋ถ๋ถ๋ง ๋ผ์ด๋์ต๋๋ค.  


    ```cs
    pipeline {
        agent any
        tools { 
            maven 'mvn' 
        }
        stages {
            stage('Git clone') {
                steps {
                    git 'https://github.com/JisunParkRea/cccr-dvwa.git'
                }
            }
            stage('Build Test') {
                steps {
                   sh 'mvn clean package -Dcheckstyle.skip -Dspotbugs.skip -Dpmd.skip'
                }
            }
        }
    }
    ```

<br/>

* ์คํฌ๋ฆฝํธ์ ๋ํ ์ค๋ช์์ด๋ ์๋ง ๋๋ถ๋ถ์ ์ดํด๊ฐ ๋  ๊ฒ์๋๋ค.  
๊ฐ๋จํ๊ฒ ์ค๋ชํ์๋ฉด Agent any๋ก jdk, mvn๋ค์ ํด์ ์ ์ธํด์ค ๋ค  
๋น๋ ์์ค์ ์ ์ฅ์๋ฅผ clone ํ ๋ค ํด๋น ์์ค๋ค์ MVN์ผ๋ก ๋น๋ํ๋ ๊ฐ๋จํ ๊ตฌ๋ฌธ์๋๋ค  
๋ฌธ๋ฒ์ด ๊ถ๊ธํ์ ๋ถ๋ค์ [์ฐธ๊ณ ๋งํฌ](https://jojoldu.tistory.com/355)๋ฅผ ์ฝ์ด๋ณด์๋ฉด ๋น ๋ฅด๊ฒ ์ดํด ๋  ๊ฒ์๋๋ค.  
๋ค์ ํฌ์คํธ ๋ถํฐ๋ ์ ์ฒด์ ์ธ ์ ์ ๋ถ์ ํด์ ์คํฌ๋ฆฝํธ์ ๋ํด์ ๊ฐ๋จํ๊ฒ ์ค๋ชํ๊ฒ ์ต๋๋ค.

<br/>


---


## ๋ง์น๋ฉฐโฆ  

Jenkins๋ฅผ ๋ง์ ธ๋ณธ๊ฒ ์ด๋ฒ์ด ์ฒ์์ด์์ต๋๋ค.  
๋ฌธ๋ฒ๋ถํฐ ํ๋์ฉ ์ฐจ๊ทผ์ฐจ๊ทผ ๋ฐฐ์๊ฐ๋ฉฐ ํ๋ค๋ณด๋ ์คํ๋ ค ์ด ๋ถ๋ถ์์ ์๊ฐ์ด ๋ง์ด ๋ญ๋น๋ ๊ฒ ๊ฐ์์ต๋๋ค.    
๊ทธ๋ ์ง๋ง ์ด๋ฐ์ ๊ณํํ๋ ํ๋ก์ ํธ์ ์ฑ๊ฒฉ๊ณผ ์ ์  ๋ง์ ๋จ์ด์ ธ๊ฐ๊ณ  ์๋ค๋ ๊ฒ์ ๋๋ฌด ๊ธฐ์ฉ๋๋ค.  

---

```toc
```