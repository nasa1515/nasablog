---
emoji: 🤦‍♂️
title: 인스턴스 생성 [GCP]
date: "2021-06-23 00:03:25"
author: nasa1515
tags: GCP
categories: GCP
---

머리말  

새롭게 클라우드 지식을 쌓기 위해서 GCP에 대해서 포스팅 하려고 합니다.  


---


## ✔ GCP/COMPUTE INSTANCE 이란 ? 

구글 플랫폼 기반에서 사용할 수 있는 가상의 컴퓨터. ``VM (virtual machine)`` 이라고 생각하면 됩니다.

- IaaS(인프라스트럭처인 cpu, mem, disks등의 인프라를 만들어주는 서비스)
- PaaS(내가 필요한 코드만 짜서 올려서 사용하는 서비스)
 - Saas(내가 코드를 사용하는 것도 필요없고 서비스를 가져와서 사용하게 된다) 까지 다양하게 서비스를 제공하고 있다


<br/>

## ✌ GUI 기반 VM 인스턴스 생성 

  GCP 웹페이지로 가서 인스턴스를 생성해보겠습니다.   


* Compute Engine - VM 인스턴스 만들기 를 클릭합니다.
ㅤ

     ![11](https://user-images.githubusercontent.com/64260883/89374251-cf4e5300-d725-11ea-9d43-de47831756cb.png)


* 다음과 같이 이름, 지역, 영역 등 VM 설정을 입력합니다.  
  
  머신 유형은 Default 옵션만 사용 할 수도 있고  
  CPU, OS 등등 맞춤 생성을 할 수도 있습니다.  

<br/>

* 저는 OS를 Debian으로 설정하여 VM을 생성해보겠습니다.
    

    ![22](https://user-images.githubusercontent.com/64260883/89374366-2522fb00-d726-11ea-8f8f-1c0edc9e2bcd.png)


  
    
    ![33](https://user-images.githubusercontent.com/64260883/89374463-6c10f080-d726-11ea-86d6-a93719868d45.png)




- 추가적으로 GCP 내에서 제공하는 API를 사용할 경우  
  ``"모든 Cloud API에 대한 전체 엑세스 허용"`` 체크가 필요합니다.


<br/>

- 웹 서버로 운용 할 것이라면 http 트래픽 허용에 체크가 필요합니다.  
    
     


    ![44](https://user-images.githubusercontent.com/64260883/89374572-bbefb780-d726-11ea-8cb8-87e121068c1a.png)
ㅤ
ㅤ
    
* 만들기 완료 후 VM은 자동적으로 Startup 됩니다.  
    
    때문에 [관리 - 자동화 스크립트 항목] 에 스크립트를 추가해주면 패키지 설치 작업등을 조금 더 간편화 할 수 있습니다.
ㅤ
    ![55](https://user-images.githubusercontent.com/64260883/89374908-8a2b2080-d727-11ea-8574-122fc39cafa2.png)

---

## 👍 CLI 기반 VM 인스턴스 생성


* 오른쪽 상단에 있는 아이콘을 클릭해 CLI 환경으로 접속 합니다.  


    ![66](https://user-images.githubusercontent.com/64260883/89375616-ffe3bc00-d728-11ea-955b-0041bab2f27b.png)


<br/>

* 명령어로 생성 할 영역의 상태를 확인 후 ``Defaul 영역``을 변경합니다.

    
    
    ![gcpcm2](https://user-images.githubusercontent.com/64260883/89375804-6ff24200-d729-11ea-8d3b-b509b5566b92.png)

  ```cs
    # gcloud compute zones list | grep us-central1
    # gcloud config set compute/zone us-central1-b
    # gcloud config list
  ```

<br/>

* 인스턴트들의 기본 설정을 적용하여 인스턴스를 생성합니다.

    ![gcpcm3](https://user-images.githubusercontent.com/64260883/89375914-b0ea5680-d729-11ea-8462-2e79975118aa.png)

  ```cs
    # gcloud computer instances create "my-vm-lee2" \
    --machine-type "n1-standard-1" \
    --image-project "debian-cloud" \
    --image "debian-9-stretch-v20190312" \
    --subnet "default"
  ```

<br/>

* 명령어로 정상적으로 인스턴트가 생성되었음을 확인.

    ![gcpcm4](https://user-images.githubusercontent.com/64260883/89376060-058dd180-d72a-11ea-8b42-ace1d11b3352.png)

  ```cs
  # gcloud compute instances list
  ```

  
---

```toc
```
