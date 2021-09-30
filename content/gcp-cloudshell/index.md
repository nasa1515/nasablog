---
emoji: 🤦‍♂️
title: "[GCP] - GCP Cloud shell 원격 접속 하기"
date: "2021-08-07 00:30:25"
author: nasa1515
tags: GCP
categories: GCP
---


머리말  

가급적이면 모든 업무를 코드화 하고 싶었습니다.  
그러기위해서 가장 기초가 되어야 하는 부분은 원격접속이라고 생각해서 포스팅합니다.

---


## ✔ Google Cloud SDK를 설치

[공식 DOC](https://cloud.google.com/sdk/docs/downloads-apt-get?hl=ko)

<br/>

Google Cloud SDK 설치 : 이 포스트는 ``Ubuntu 18.04 OS`` 환경에서 진행하였습니다


<br/>

패키지 소스로 Cloud SDK 배포 URI를 추가합니다.


```cs
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```

<br/>
<br/>

설치 전 apt-transport-https 의 설치 유무를 확인합니다.



```cs
root@cccr:/# sudo apt-get install apt-transport-https ca-certificates gnupg
패키지 목록을 읽는 중입니다... 완료
의존성 트리를 만드는 중입니다       
상태 정보를 읽는 중입니다... 완료
패키지 ca-certificates는 이미 최신 버전입니다 (20190110~18.04.1).
패키지 gnupg는 이미 최신 버전입니다 (2.2.4-1ubuntu1.3).
gnupg 패키지는 수동설치로 지정합니다.
패키지 apt-transport-https는 이미 최신 버전입니다 (1.6.12ubuntu0.1).
다음 패키지가 자동으로 설치되었지만 더 이상 필요하지 않습니다:
amd64-microcode fonts-lato intel-microcode iucode-tool javascript-common libfwup1libgmp-dev
libgmpxx4ldbl libgsoap-2.8.60 libjs-jquery libllvm9 libvncserver1linux-headers-generic-hwe-18.04
linux-hwe-5.4-headers-5.4.0-42 ruby-did-you-mean ruby-minitest ruby-net-telnetruby-power-assert
ruby2.5-doc rubygems-integration thermald ubuntu-fan
Use 'sudo apt autoremove' to remove them.
0개 업그레이드, 0개 새로 설치, 0개 제거 및 34개 업그레이드 안 함.
```

<br/>
<br/>

Google Cloud 공개 키를 가져옵니다.


```cs
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring/usr/share/keyrings/cloud.google.gpg add -
root@cccr:/# curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudoapt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
 % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                Dload  Upload   Total   Spent    Left  Speed
100   653  100   653    0     0   1653      0 --:--:-- --:--:-- --:--:--  1653
OK
```

<br/>
<br/>

Cloud SDK를 업데이트하고 설치합니다.  


```cs
root@cccr:/# sudo apt-get update && sudo apt-get install google-cloud-sdk
```

<br/>
<br/>

gcloud init 명령을 통해 사용합니다!

```cs
root@cccr:/# gcloud init
Welcome! This command will take you through the configuration of gcloud.
Your current configuration has been set to: [default]
You can skip diagnostics next time by using the following flag:
gcloud init --skip-diagnostics
Network diagnostic detects and fixes local network connection issues.
Checking network connection..done.                                                                 
Reachability Check passed.
Network diagnostic passed (1/1 checks passed).
You must log in to continue. Would you like to log in (Y/n)?  Y
....
...(중략)
```

<br/>
<br/>

그럼 특정 계정 접속을 선택할 수 있는데 알맞게 선택합니다  


계정 선택!  

![스크린샷, 2020-10-15 15-38-30](https://user-images.githubusercontent.com/69498804/96085929-7c9acf80-0efc-11eb-9f5d-0e592ecf1ba9.png)

<br/>
<br/>

``엑세스 권환 확인``

![스크린샷, 2020-10-15 15-39-21](https://user-images.githubusercontent.com/69498804/96086021-9b00cb00-0efc-11eb-95fa-10e2dea32d93.png)    
    ``모두 허용해주시구요``

<br/>
<br/>


gcloud init 명령어를 통해 기본적인 설정을 해줍니다.

```cs
root@cccr:/# gcloud init
Welcome! This command will take you through the configuration of gcloud.
Settings from your current configuration [default] are:
compute:
region: asia-northeast3
zone: asia-northeast3-b
core:
account: [] <--- 개인정보 암호화!
disable_usage_reporting: 'True'
project: [] <--- 개인정보 암호화!
Pick configuration to use:
[1] Re-initialize this configuration [default] with new settings 
[2] Create a new configuration
Please enter your numeric choice:  1
```

<br/>
<br/>

이제 Cloud Shell로 ssh 대화형 접속이 가능해집니다!

```cs
root@cccr:/# gcloud alpha cloud-shell ssh
'Automatic authentication with GCP CLI tools in Cloud Shell is disabled. To enable,please rerun command with `--authorize-session` flag.
WARNING: The private SSH key file for gcloud does not exist.
WARNING: The public SSH key file for gcloud does not exist.
WARNING: You do not have an SSH key for gcloud.
WARNING: SSH keygen will be executed to generate a key.
Generating public/private rsa key pair.
...
...(중략)
Your Cloud Platform project in this session is set to cccr-nov2.
Use “gcloud config set project [PROJECT_ID]” to change to a different project.
h43254@cloudshell:~ (cccr-nov2)$ 
```

<br/>

---

### 마치며…  

이제 3대 Public Cloud 중 하나인 GCP에 대한 개념을 어느 정도 잡고 있는 것 같습니다.  
이번 포스트에서는 아직 운영전의 사전 설정 단계라 공식문서에도 친절하게 나와있는 부분이지만 실습과 이론은 다르다는걸 알았습니다.  
공식문서에 모두 제시되어있지만 똑같이 따라한다고 해서 전부 되는건 아니였죠...  

다음 포스트에는 DevSecOPs CI/CD 파이프 라인을 적용해보고 정리하는 시간을 갖도록 하겠습니다.


---

```toc
```