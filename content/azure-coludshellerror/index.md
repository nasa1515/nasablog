---
emoji: ๐คฆโโ๏ธ
title: "[AZURE] Cloudshell error = Error creating Azure Storage Account - code : 409"
date: "2021-08-20 00:39:25"
author: nasa1515
tags: CLOUD Error-Report 
categories: CLOUD Error-Report
---


๋จธ๋ฆฌ๋ง  
  

์ด๋ฒ์ ์๋กญ๊ฒ Azure PASS๋ฅผ ์ ๋ฌ๋ฐ์์ ํด๋น ๊ตฌ๋์ผ๋ก Cloud Shell์ ์ฌ์ฉํ๋ ค๊ณ  ํ์ผ๋  
Cloudshell error = Error creating Azure Storage Account - code : 409 error   
๋ฐ์์ผ๋ก Storage๊ฐ ์์ฑ๋์ง ์์ ๊ด๋ จ ํฌ์คํธ๋ฅผ ์์ฑํฉ๋๋ค.  



--- 

## โ Error!

#### Cloud Shell์ ์ฐ๊ฒฐ์ ์ํ Storage๋ฅผ ์์ฑํ๋ ค๋๋ฐ ๋ค์๊ณผ ๊ฐ์ Error ๋ฐ์  
![11111](https://user-images.githubusercontent.com/69498804/112244518-cb5e4980-8c92-11eb-9688-bddeb6457fbf.JPG)

* ํด๋น Error Code : 409๊ฐ ๋ฐ์์ ์ 403 Error๋ ๋ฐ์ํ์ผ๋ ํด๊ฒฐํ์ต๋๋ค.  


<br/>


* #### 403 ERROR ํด๊ฒฐ : [StackOverFlow](https://stackoverflow.com/questions/44107943/unable-to-create-storage-for-persisting-account-files-in-azure-cloud-shell-cli)์์ ๊ตฌ๋์ Resource providers์ Microsoft.Storage ๊ถํ ์ค์   

    ![ehMUs](https://user-images.githubusercontent.com/69498804/112245160-b504bd80-8c93-11eb-96cc-11449ff92060.png)


    * ํด๋น ERROR๋ ๊ตฌ๋์์ providers์ ๊ถํ์ด ์์ด์ ๋ฐ์ํ ๋ฌธ์ ์์  

<br/>

* #### 409 ERROR ํด๊ฒฐ : [StackOverFlow](https://stackoverflow.com/questions/60620035/unable-to-open-cloud-shell-because-of-storage-account-error)์์ Customํ๊ฒ Storage ์์ฑ    

    ![KKoo7](https://user-images.githubusercontent.com/69498804/112245280-e4b3c580-8c93-11eb-9514-14be46875521.png)

    * ๋ค์๊ณผ ๊ฐ์ด ``show advanced settings`` tab์ ์ ํํด Customํ๊ฒ ์์ฑ   

    StorageAccountAlreadyTaken error๋ ์คํ ๋ฆฌ์ง ๊ณ์  ์์ฑ ๋ฌธ์ ์๋๋ค.    
    ์ด๋ ์๋ก์ด ์คํ ๋ฆฌ์ง ๊ณ์ ์ ๋ง๋ค๊ณ  ์์ง๋ง ๋์ผํ ์ด๋ฆ์ ์คํ ๋ฆฌ์ง ๊ณ์ ์ด ์  ์ธ๊ณ์ ์ด๋ฏธ ์กด์ฌํจ์ ๋ํ๋๋๋ค.  
    (์๋ํ๋ฉด ์คํ ๋ฆฌ์ง ๊ณ์  ์ด๋ฆ์ ๋ชจ๋  Azure ๊ณ์ ์์ ๊ณ ์ ํด์ผ ํ๊ธฐ ๋๋ฌธ).  
    ๋ํ ๊ตฌ๋์ ์์๋์ด์๋ Default Region์ ๋ฌธ์ ์ผ ์๋ ์์ด ํด๋น Region๋ ์ง์ ํด์ฃผ์์ต๋๋ค.  


<br/>

---

```toc
```