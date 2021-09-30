---
emoji: 🤦‍♂️
title: "[LINUX] - Shell Script - 특수,위치,아규먼트 매개 변수"
date: "2021-06-28 00:16:25"
author: nasa1515
tags: LINUX
categories: LINUX
---



머리말  

이전 포스트에서는 정규표현식에 대한 내용을 포스팅 했었습니다.  
이번 포스트에서부터는 이제 실제 스크립트를 작성하는데 많은 도움이 되는 매개변수등에 대해서 설명 할 예정입니다.

---

## ✔ 특수 매개변수

* 특수매개변수 (Special Parameters)   

* 매개변수를 설명하기 전 알고가야 할 사항은 ``위치매개 변수``인지, ``특수매개 변수``인지  사실 별로 중요하지 않습니다.  
그저 미리 내장된 특수한 변수들이 있고, 해당 코드들이 무슨 의미인지만 알면 됩니다.

    매개변수들의 상관관계  
    ![스크린샷, 2020-08-19 15-35-50](https://user-images.githubusercontent.com/69498804/90600521-ac499600-e231-11ea-8f23-30d9cfdbbae2.png)

<br/>

### 특수 매개 변수 사용 예

* 간단하게 스크립트를 하나 짜봤습니다.
    
    ```cs
    #!/bin/bash
    if [ $# -ne 3 ] 
        then echo "plz check arguments again" 
    else 
        echo "$0 script is running" 
    fi
    ```

    코드에 보이는 ``'$#'``과 ``'$0'``와 같이 달러 표시로  
    시작되는 것들이 내부적으로 지정되어 있는 변수입니다.

    * ``'$#'``은 넘겨진 ``아규먼트 개수``를
    * ``'$0'``은 실행된 ``셸 스크립트명``을 의미해요

    스크립트의 내용은 넘겨진 아규먼트의 개수가 3개가 아니라면 ``"plz check arguments again"``을 출력하고  
    3개가 맞다면 ``"00 script is running"`` 을 출력하라는 간단한 코드입니다 :)

    <br/>

*  스크립트를 실행시켜봅시다

    ```cs
    student@cccr:/home/won/script$ ./nasa.sh a b          ### 아규먼트 갯수를 2개로 지정
    plz check arguments again
    student@cccr:/home/won/script$ 
    student@cccr:/home/won/script$ ./nasa.sh a b c        ### 아규먼트 갯수를 3개로 지정
    ./nasa.sh script is running
    ```
    
* 위의 예제와 같이 ``아규먼트의 개수``를 담고 있는 ``'$#'``처럼  
    내부적으로 편의성을 위해 정의되어 있는 변수들을 ``특수변수``라고 합니다.
     

<br/>

---

## ✌ 아규먼트 변수 , 위치매개변수

* 변수들의 종류  

    ![스크린샷, 2020-08-19 15-47-49](https://user-images.githubusercontent.com/69498804/90601547-583fb100-e233-11ea-93ab-bbc26a14fe06.png)

    이전 포스트인 정규표현식과 동일합니다.  
    각 숫자들은 우리가 어떤 명령을 내릴 때, ``띄어쓰기`` 기준으로 그 위치에 해당하는 값들을 가져옵니다.

    그래서 ``$숫자`` 형태를 ``위치매개변수``라고 합니다.  
    추가적인 팁으로 10번째부터는 "{}"로 감싸줘야 합니다. ex) ${10}

    ![스크린샷, 2020-08-19 15-50-40](https://user-images.githubusercontent.com/69498804/90601817-bd93a200-e233-11ea-9647-0409b949173d.png)


<br/>

### 매개변수 값 확인

* 실습을 위해서 아래와 같이 스크립트를 작성했습니다.

    ```cs
    #!/bin/bash

    echo '$0' value : $0
    echo '$1' value : $1
    echo '$2' value : $2
    echo '$3' value : $3
    echo '$#' value : $#
    echo '$*' value : $*
    echo '$@' value : $@
    ```

    <br/>

* 스크립트를 실행해보겠습니다.

    ```cs
    student@cccr:/home/won/script$ ./nasa1515.sh int1 int2 int3
    $0 value : ./nasa1515.sh
    $1 value : int1
    $2 value : int2
    $3 value : int3
    $# value : 3
    $* value : int1 int2 int3
    $@ value : int1 int2 int3
    ```
    ``$*``와 ``$0``는 결과처럼 동일한 것처럼 보입니다.  
    보통 ``쌍따옴표``로 묶어주지 않으면 동일한 기능을 수행합니다.

    <br/>

* 간단하게 두 변수 모두 쌍따옴표로 묶어서 테스트 해볼까요?  

    ```cs
    # 아래와 같이 간단한 스크립트를 하나 만들었습니다.
    #!/bin/bash

    echo '1."$@"GO---------------------------------------'
    for i in "$@"
    do
    echo $i
    done

    echo ""

    echo '2."$*"GO---------------------------------------'
    for i in "$*"
    do
    echo $i
    done

    ```

    <br/>

* 쌍따옴표로 묶은 결과는 다음과 같습니다.

    ```cs
    student@cccr:/home/won/script$ ./test.sh aaa bbb ccc ddd fff
    1."$@"GO---------------------------------------
    aaa
    bbb
    ccc
    ddd
    fff

    2."$*"GO---------------------------------------
    aaa bbb ccc ddd fff
    ```
    결과로 보이듯이 ``"" ""``로 변수가 묶인 경우 저장되어있는 개개의 값이 전개되는 것이 다릅니다.

    더 쉽게 예를들어 받는 값이 ``"aaa" "bbb" "ccc"``(※ set "aaa" "bbb" "ccc") 일 때


    * "$@"

        "aaa" "bbb" "ccc" 처럼 전개됩니다.
 
    * "$*"

        "aaa bbb ccc" 처럼 전개됩니다.

<br/>

---

### 특수매개변수

특수매개변수가 꼭 아규먼트와 관련된 변수만 있는 것은 아닙니다.  
아규먼트 변수 외에도 아래와 같은 다양한 정보를 알 수 있는 변수들이 있습니다


![스크린샷, 2020-08-19 16-23-10](https://user-images.githubusercontent.com/69498804/90604746-49a7c880-e238-11ea-9a63-b436c18f0721.png)


* ### ``$$``  
보통 pid는 유일한 값이기 때문에 유니크한 구분코드를 만들때 날짜시분초와 함께 명명규칙에 잘 포함되어 사용됩니다.

    ```cs
    uniq_id=$$`date +%Y%m%d%H%M%S` 
    echo ${uniq_id}
    ```

    ```cs
    student@cccr:/home/won/script$ uniq_id=$$`date +%Y%m%d%H%M%S`
    student@cccr:/home/won/script$ echo ${uniq_id}
    395820200819162509
    student@cccr:/home/won/script$ echo $$
    3958
    ```

<br/>

* ### ``$?``  
명령을 정상적으로 수행하면 0을 실패했다면 그 외의 값을 반환합니다.

    ```cs
    student@cccr:/home/won/script$ echo "test"
    test
    student@cccr:/home/won/script$ echo $?
    0
    student@cccr:/home/won/script$ 
    student@cccr:/home/won/script$ llls
    llls: 명령을 찾을 수 없습니다
    student@cccr:/home/won/script$ echo $?
    127
    ```
    보통 if문의 결과값을 확인하기위해 많이 사용됩니다.  

<br/>

* ### ``$!``  
백그라운드로 실행된 명령의 pid 입니다

* 실습을 위해 아래같은 스크립트를 하나 만들었습니다.

    ```cs
    #!/bin/bash
    echo value: $$
    sleep 10
    echo finish
    ```

    ```cs
    student@cccr:/home/won/script$ ./aa.sh &
    [1] 9007
    student@cccr:/home/won/script$ value: 9007
    finish

    [1]+  완료                  ./aa.sh
    ```
    
    다음과 같이 정상적으로 백그라운드로 실행된 PID를 출력합니다

    이후에 다시 ``$!``을 출력해보더라도 동일한 PID 출력됩니다.

    ```cs
    student@cccr:/home/won/script$ echo $!
    9007
    ```

<br/>

* ### ``$_``  
지난 명령의 마지막 인자로 전달된 값 출력

    ```cs
    $ echo AA BB 
    AA BB 
    $ echo $_ 
    BB
    ```

<br/>

```toc
```