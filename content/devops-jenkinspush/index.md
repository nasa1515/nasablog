---
emoji: 🤦‍♂️
title: "[DEVOPS] - Jenkins로 Dvmn 앱 이미지 자동 빌드 및 푸시하기"
date: "2021-08-08 00:39:25"
author: nasa1515
tags: DevOps
categories: DevOps
---


머리말  

이전 포스트에서 간단하게 이미지를 빌드한 뒤 ArgoCD와 SYNC를 맞춰 배포를 자동화한 파이프 라인을 완성했습니다.  
이번 포스트에서는 Jenkins에서 해당 이미지를 빌드하는 부분에 대해서 포스트 했습니다.

---

* 사용 할 툴을 다음과 같습니다.  

    - Jenkins
    - maven
    - github
    - ArgoCD

---

## ✔ 전체 Jenkins 파이프라인


* 파이프라인 스크립트

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

### 파이프라인의 프로세스

1. 소스코드를 Clone 해온 뒤 Build 테스트  
2. Dependency-Check Analysis 로 코드 정적분석  
3. Sonarqube and Quality gate 정적분석  
4. 위의 검사에서 에러가 없으면 Docker image build  
5. 빌드한 도커이미지를 HARBOR 저장소에 PUSH  
6. HARBOR에 저장된 이미지의 에러 검사  
7. 새로운 빌드 넘버로 메니페스트 수정 후 GITOPS 저장소로 푸시  
8. ArgoCD로 Sync 요청


<br/>

---



### DVWA! 빌드 소스 저장소!

<br/>

* DVWA 빌드소스 저장소는 아래와 같이 구성했습니다.  
[저장소링크](https://github.com/nasa1515/cccr-dvwa) 

    ![스크린샷, 2020-11-12 15-36-51](https://user-images.githubusercontent.com/69498804/98904414-e3f86f00-24fc-11eb-8576-c3088ed9babd.png)
    
    Jenkins 에서는 해당 저장소를 Clone 후 이미지를 빌드 할 예정입니다.


<br/>

---


### MAVEN 빌드 전 사전작업

<br/>

아래 두 설정을 모두 만족해야 정상적인 빌드가 됩니다.


1. Jenkins에서 JDK 설정  

    ![캡처](https://user-images.githubusercontent.com/69498804/102846942-b506de80-4454-11eb-8bb9-90cd582d3447.PNG)


<br/>


2. Jenkins에서 MAVEN 설정

    ![캡처2](https://user-images.githubusercontent.com/69498804/102846986-cc45cc00-4454-11eb-89e4-28471be55ba7.PNG)


<br/>

---

### 빌드 파이프라인 스크립트

<br/>

* 전체적인 파이프라인 스크립트에서 MAVEN 빌드 부분만 떼어냈습니다.  


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

* 스크립트에 대한 설명없이도 아마 대부분은 이해가 될 것입니다.  
간단하게 설명하자면 Agent any로 jdk, mvn들의 툴을 선언해준 뒤  
빌드 소스의 저장소를 clone 한 뒤 해당 소스들을 MVN으로 빌드하는 간단한 구문입니다  
문법이 궁금하신분들은 [참고링크](https://jojoldu.tistory.com/355)를 읽어보시면 빠르게 이해 될 것입니다.  
다음 포스트 부터는 전체적인 정적분석 툴의 스크립트에 대해서 간단하게 설명하겠습니다.

<br/>


---


## 마치며…  

Jenkins를 만져본게 이번이 처음이었습니다.  
문법부터 하나씩 차근차근 배워가며 하다보니 오히려 이 부분에서 시간이 많이 낭비된 것 같았습니다.    
그렇지만 초반에 계획했던 프로젝트의 성격과 점점 맞아 떨어져가고 있다는 것에 너무 기쁩니다.  

---

```toc
```