---
emoji: ๐คฆโโ๏ธ
title: "[GCP] - GCP Cloud shell ์๊ฒฉ ์ ์ ํ๊ธฐ"
date: "2021-08-07 00:30:25"
author: nasa1515
tags: CLOUD
categories: CLOUD
---


๋จธ๋ฆฌ๋ง  

๊ฐ๊ธ์ ์ด๋ฉด ๋ชจ๋  ์๋ฌด๋ฅผ ์ฝ๋ํ ํ๊ณ  ์ถ์์ต๋๋ค.  
๊ทธ๋ฌ๊ธฐ์ํด์ ๊ฐ์ฅ ๊ธฐ์ด๊ฐ ๋์ด์ผ ํ๋ ๋ถ๋ถ์ ์๊ฒฉ์ ์์ด๋ผ๊ณ  ์๊ฐํด์ ํฌ์คํํฉ๋๋ค.

---


## โ Google Cloud SDK๋ฅผ ์ค์น

[๊ณต์ DOC](https://cloud.google.com/sdk/docs/downloads-apt-get?hl=ko)

<br/>

Google Cloud SDK ์ค์น : ์ด ํฌ์คํธ๋ ``Ubuntu 18.04 OS`` ํ๊ฒฝ์์ ์งํํ์์ต๋๋ค


<br/>

ํจํค์ง ์์ค๋ก Cloud SDK ๋ฐฐํฌ URI๋ฅผ ์ถ๊ฐํฉ๋๋ค.


```cs
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```

<br/>
<br/>

์ค์น ์  apt-transport-https ์ ์ค์น ์ ๋ฌด๋ฅผ ํ์ธํฉ๋๋ค.



```cs
root@cccr:/# sudo apt-get install apt-transport-https ca-certificates gnupg
ํจํค์ง ๋ชฉ๋ก์ ์ฝ๋ ์ค์๋๋ค... ์๋ฃ
์์กด์ฑ ํธ๋ฆฌ๋ฅผ ๋ง๋๋ ์ค์๋๋ค       
์ํ ์ ๋ณด๋ฅผ ์ฝ๋ ์ค์๋๋ค... ์๋ฃ
ํจํค์ง ca-certificates๋ ์ด๋ฏธ ์ต์  ๋ฒ์ ์๋๋ค (20190110~18.04.1).
ํจํค์ง gnupg๋ ์ด๋ฏธ ์ต์  ๋ฒ์ ์๋๋ค (2.2.4-1ubuntu1.3).
gnupg ํจํค์ง๋ ์๋์ค์น๋ก ์ง์ ํฉ๋๋ค.
ํจํค์ง apt-transport-https๋ ์ด๋ฏธ ์ต์  ๋ฒ์ ์๋๋ค (1.6.12ubuntu0.1).
๋ค์ ํจํค์ง๊ฐ ์๋์ผ๋ก ์ค์น๋์์ง๋ง ๋ ์ด์ ํ์ํ์ง ์์ต๋๋ค:
amd64-microcode fonts-lato intel-microcode iucode-tool javascript-common libfwup1libgmp-dev
libgmpxx4ldbl libgsoap-2.8.60 libjs-jquery libllvm9 libvncserver1linux-headers-generic-hwe-18.04
linux-hwe-5.4-headers-5.4.0-42 ruby-did-you-mean ruby-minitest ruby-net-telnetruby-power-assert
ruby2.5-doc rubygems-integration thermald ubuntu-fan
Use 'sudo apt autoremove' to remove them.
0๊ฐ ์๊ทธ๋ ์ด๋, 0๊ฐ ์๋ก ์ค์น, 0๊ฐ ์ ๊ฑฐ ๋ฐ 34๊ฐ ์๊ทธ๋ ์ด๋ ์ ํจ.
```

<br/>
<br/>

Google Cloud ๊ณต๊ฐ ํค๋ฅผ ๊ฐ์ ธ์ต๋๋ค.


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

Cloud SDK๋ฅผ ์๋ฐ์ดํธํ๊ณ  ์ค์นํฉ๋๋ค.  


```cs
root@cccr:/# sudo apt-get update && sudo apt-get install google-cloud-sdk
```

<br/>
<br/>

gcloud init ๋ช๋ น์ ํตํด ์ฌ์ฉํฉ๋๋ค!

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
...(์ค๋ต)
```

<br/>
<br/>

๊ทธ๋ผ ํน์  ๊ณ์  ์ ์์ ์ ํํ  ์ ์๋๋ฐ ์๋ง๊ฒ ์ ํํฉ๋๋ค  


๊ณ์  ์ ํ!  

![์คํฌ๋ฆฐ์ท, 2020-10-15 15-38-30](https://user-images.githubusercontent.com/69498804/96085929-7c9acf80-0efc-11eb-9f5d-0e592ecf1ba9.png)

<br/>
<br/>

``์์ธ์ค ๊ถํ ํ์ธ``

![์คํฌ๋ฆฐ์ท, 2020-10-15 15-39-21](https://user-images.githubusercontent.com/69498804/96086021-9b00cb00-0efc-11eb-95fa-10e2dea32d93.png)    
    ``๋ชจ๋ ํ์ฉํด์ฃผ์๊ตฌ์``

<br/>
<br/>


gcloud init ๋ช๋ น์ด๋ฅผ ํตํด ๊ธฐ๋ณธ์ ์ธ ์ค์ ์ ํด์ค๋๋ค.

```cs
root@cccr:/# gcloud init
Welcome! This command will take you through the configuration of gcloud.
Settings from your current configuration [default] are:
compute:
region: asia-northeast3
zone: asia-northeast3-b
core:
account: [] <--- ๊ฐ์ธ์ ๋ณด ์ํธํ!
disable_usage_reporting: 'True'
project: [] <--- ๊ฐ์ธ์ ๋ณด ์ํธํ!
Pick configuration to use:
[1] Re-initialize this configuration [default] with new settings 
[2] Create a new configuration
Please enter your numeric choice:  1
```

<br/>
<br/>

์ด์  Cloud Shell๋ก ssh ๋ํํ ์ ์์ด ๊ฐ๋ฅํด์ง๋๋ค!

```cs
root@cccr:/# gcloud alpha cloud-shell ssh
'Automatic authentication with GCP CLI tools in Cloud Shell is disabled. To enable,please rerun command with `--authorize-session` flag.
WARNING: The private SSH key file for gcloud does not exist.
WARNING: The public SSH key file for gcloud does not exist.
WARNING: You do not have an SSH key for gcloud.
WARNING: SSH keygen will be executed to generate a key.
Generating public/private rsa key pair.
...
...(์ค๋ต)
Your Cloud Platform project in this session is set to cccr-nov2.
Use โgcloud config set project [PROJECT_ID]โ to change to a different project.
h43254@cloudshell:~ (cccr-nov2)$ 
```

<br/>

---

### ๋ง์น๋ฉฐโฆ  

์ด์  3๋ Public Cloud ์ค ํ๋์ธ GCP์ ๋ํ ๊ฐ๋์ ์ด๋ ์ ๋ ์ก๊ณ  ์๋ ๊ฒ ๊ฐ์ต๋๋ค.  
์ด๋ฒ ํฌ์คํธ์์๋ ์์ง ์ด์์ ์ ์ฌ์  ์ค์  ๋จ๊ณ๋ผ ๊ณต์๋ฌธ์์๋ ์น์ ํ๊ฒ ๋์์๋ ๋ถ๋ถ์ด์ง๋ง ์ค์ต๊ณผ ์ด๋ก ์ ๋ค๋ฅด๋ค๋๊ฑธ ์์์ต๋๋ค.  
๊ณต์๋ฌธ์์ ๋ชจ๋ ์ ์๋์ด์์ง๋ง ๋๊ฐ์ด ๋ฐ๋ผํ๋ค๊ณ  ํด์ ์ ๋ถ ๋๋๊ฑด ์๋์์ฃ ...  

๋ค์ ํฌ์คํธ์๋ DevSecOPs CI/CD ํ์ดํ ๋ผ์ธ์ ์ ์ฉํด๋ณด๊ณ  ์ ๋ฆฌํ๋ ์๊ฐ์ ๊ฐ๋๋ก ํ๊ฒ ์ต๋๋ค.


---

```toc
```