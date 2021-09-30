---
emoji: 🤦‍♂️
title: "[DEVOPS] - SonarQube With Jenkins"
date: "2021-08-12 00:39:25"
author: nasa1515
tags: DevOps
categories: DevOps
---



머리말  

이번 포스트로 이제 파이프라인에서 동작하는 전체적인 보안툴에 대한 포스트는 끝났습니다.  
최종적으로는   

1. SonarQube로 Build 될 이미지의 소스코드에 대한 전략적 정적분석을   
2. Anchore로 빌드된 이미지에 대한 분석을  
3. OWASP ZAP으로 배포 된 서비스에 대한 동적분석  

위 세가지 보안 항복을 Jenkins를 이용해 자동화 하였습니다.


---


* 사용 할 툴을 다음과 같습니다.  

    - Jenkins
    * Sonarqube

---

## ✔ SonarQube ??

위키백과 왈

*소나큐브(SonarQube, 이전 이름: 소나/Sonar)는 20개 이상의 프로그래밍 언어에서 버그, 코드 스멜, 보안 취약점을 발견할 목적으로 정적 코드 분석으로 자동 리뷰를 수행하기 위한 지속적인 코드 품질 검사용 오픈 소스 플랫폼이다.  
소나큐브는 중복 코드, 코딩 표준, 유닛 테스트, 코드 커버리지, 코드 복잡도, 주석, 버그 및 보안 취약점의 보고서를 제공한다.*

음 읽어보니 개발자들에게 유용한 정적분석 툴입니다.

<br/>

---



### SonarQube 설치

* 이번 포스트에서 SonarQube의 설치과정은 다루지 않습니다.  
  즉 이미 SonarQube 서버와, Jenkins 서버가 설치되었다는 가정하에 진행하였습니다.

<br/>


* 설치에 관련된 포스트는 [여기](https://www.lesstif.com/software-architect/sonarqube-39126262.html)를 참고해주세요

<br/>



---



### Jenkins 설정 <a name="a2"></a>

<br/>

* Jenkins 내에서 SonarQube를 사용하기 위해서는 아래 플러그인 설치가 필요합니다.

    ![AAAAAA](https://user-images.githubusercontent.com/69498804/103322025-cf0d7600-4a7f-11eb-8081-02b118e9b30c.PNG)


    * 자세한 플러그인 정보는 [링크](https://plugins.jenkins.io/sonar/) 확인해주세요



<br/>

* 플러그인 설치가 완료되었다면 Jenkins 환경설정에서 Sonarqube 서버의 설정이 필요합니다.

    ![222222](https://user-images.githubusercontent.com/69498804/103322080-09771300-4a80-11eb-8022-2f2b6e12fd14.PNG)

    * 설치한 SonarQube 서버의 정보를 기입해줍니다


<br/>


* Jenkins Global tool configuration 탭에서 Scanner에 대한 설정을 합니다.

    ![3332131](https://user-images.githubusercontent.com/69498804/103322135-54912600-4a80-11eb-8b21-23d6f51e0fea.PNG)

    * 별다르게 상이하는 부분은 없이 동일하게 설정하면 동작됩니다.

<br/>

* 파이프라인 프로젝트에서 SonarQube의 변수들을 선언 해줍니다(스크립트의 편의성을 위함)  

    ![KakaoTalk_20201228_200226180](https://user-images.githubusercontent.com/69498804/103388784-54f7f280-4b4e-11eb-8547-d643c8756523.png)

    ![KakaoTalk_20201228_200226346](https://user-images.githubusercontent.com/69498804/103388805-6fca6700-4b4e-11eb-8064-e7896067a891.png)


<br/>


* 이제 SonarQube 서버에서 Jenkins 서버에 대한 Webhook을 설정합니다.

    ![3333333333](https://user-images.githubusercontent.com/69498804/103322208-97eb9480-4a80-11eb-8848-bd3142e2bb53.PNG)

    * Jenkins 서버의 IP와 Port로 웹훅을 걸어주시면 됩니다.


<br/>

* 정상적으로 설정이 되었다면 다음과 같이 웹훅이 생성됩니다.

    ![AAAAAAAAAAADDDDD](https://user-images.githubusercontent.com/69498804/103322240-b6ea2680-4a80-11eb-9bfe-eb624f8054b9.PNG)


이제 Jenkins에서 SonarQube를 사용 할 수 있습니다!!

<br/>

---


### Jenkins Pipeline Script 수정


그럼 파이프라인 스크립트 내에 SonarQube와 관련된 내용을 삽입해보겠습니다.


* 파이프라인 내용

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

    우선 간단하게 파이프라인을 작성하기위해 변수 설정을 했습니다.

<br/>

* 그리고 SonarQube와 SonarQube 내에있는 Dependency-Check를 작성해줍니다.

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

여기까지만 하면 파이프라인 내에서는 SonarQube는 정상동작합니다.

---


### 파이프라인 실행 결과



* 이제 모든 파이프라인 구성이 완료되었습니다.


    ![캡처](https://user-images.githubusercontent.com/69498804/103388929-262e4c00-4b4f-11eb-8ff4-ac9d873625eb.PNG)


    * 파이프라인 스크립트의 STAGE별 순서 진행도를 위와같이 확인 할 수 있습니다.
    * 또한 SonarQube의 분석 결과 그래프도 위와 같이 확인 할 수 있습니다.



<br/>

* SonarQube의 Check-style 등의 경우 다른 리포트를 생성합니다.  

    ![KakaoTalk_20201228_200227145](https://user-images.githubusercontent.com/69498804/103388989-91781e00-4b4f-11eb-8614-1ebeac419ec4.png)

    * PASSED의 경우 사용자가 ERROR Level을 임의로 설정 할 수 있습니다.

<br/>

----

## 마치며…  

진행한 프로젝트의 보안툴은 모두 마무리 되었습니다.      
미리 미리 정리해놓았던 문서들을 다시 보면서 정리하려고 힘들을 느끼고 있습니다.  
사실 문서화가 가장 중요하다고 생각하지만 업무를 진행하면서 실시간으로 문서화하기는 정말 쉽지 않습니다.   
그래도 블로그 글을 꾸준히 포스트하고 공부하려면 필요 한 일들이니 노력해보겠습니다.  

---

```toc
```



