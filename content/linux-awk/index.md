---
emoji: 🤦‍♂️
title: Shell Script - awk [LINUX]
date: "2021-06-28 00:13:25"
author: nasa1515
tags: LINUX
categories: LINUX
---


머리말 

이전 포스트에서는 스크립트나 리눅스를 운영하면서 자주 사용하게 되는 sed 명령어에 대해서 포스트 했습니다.  
이번 포스트에서는 동일하게 자주 사용되는 awk 에 대해서 설명해보았습니다.  
 
---

## ✔ awk ?

* ``AWK``란?  

    awk는 텍스트 파일을 처리하는 라인 지향 프로그램 입니다.  
    아래 이미지와 같이 필드와 레코드로 구분하여 데이터를 처리하게 되는데 구분자를 사용하여 표와 같은 모양이 됩니다.

    * ``레코드 구분자`` : 엔터(개행)

    * ``필드 구분자`` : 탭, 스페이스

    ![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FubTEw%2FbtqFGypLfhQ%2FTpRPJkzMkxQYrZEard652K%2Fimg.png)


- 데이터를 조작하고 리포트를 생성하기 위해 사용하는 언어입니다.

- 간단한 연산자를 명령라인에서 사용할 수 있으며, 큰 프로그램을 위해 사용될 수 있습니다.  
    ```awk```는 데이터를 조작할 수 있기 때문에 쉘 스크립트에서 사용되는 필수 툴이며 작은 데이터베이스를 관리하기 위해서도 필수입니다

<br/>

---

## ✌ awk 형식
- 명령어를 입력한 다음, ``작은따옴표``로 둘러싸인 패턴이나 ``액션``을 입력하고  
마지막엔 ``입력 파일 이름``. 파일 이름을 지정하지 않으면 키보드 입력에 의한 ``표준 입력``을 받습니다. 

* awk는 입력된 라인들의 데이터들을 ``공백`` 또는 ``탭``을 기준으로 분리해  ```$1```부터 시작하는 각각의 필드 변수로 분리해 인식합니다.


    awk 형식

    ```cs
    awk [OPTION...] [awk program] [ARGUMENT...]
      OPTION
        -F        : 필드 구분 문자 지정.
        -f        : awk program 파일 경로 지정.
        -v        : awk program에서 사용될 특정 variable값 지정.
      awk program
        -f 옵션이 사용되지 않은 경우, awk가 실행할 awk program 코드 지정.
      ARGUMENT
        입력 파일 지정 또는 variable 값 지정.
    ```

    <br/>

* 첫번째 필드는 ``$1``, 두번째 필드는 ``$2``와 같이 표현되며 ``$0``은 전체 필드를 가르킵니다.  
아래 리스트에서는 -rw-r--r-- 은 ``$1`` 그 다음의 1로 표시된것(Link Count)은 ``$2``가 됩니다

    ![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcKJqcO%2FbtqFFTOrwd6%2FTPsiT7Fkl5RUzQQipYBuG1%2Fimg.png)


    <br/>

* 필드의 구분자는 탭 또는 스페이스이니 touch "spa ce"를 입력하여  
파일명에 띄어쓰기를 주고나서 awk print를 사용하여 실제로 필드를 탭 또는 스페이스로 구분하는지 확인해볼 수 있습니다.

    ```cs
    student@cccr:/home/won/script/awktest$ ls -l
    합계 0
    -rw-r--r-- 1 student student 0  8월 19 11:34  nasa
    -rw-r--r-- 1 student student 0  8월 19 11:34 'spa ce'
    -rw-r--r-- 1 student student 0  8월 19 11:33  test
    -rw-r--r-- 1 student student 0  8월 19 11:34  wonseok
    student@cccr:/home/won/script/awktest$ ls -l | awk '{print $10}'


    ce
    ```

     실제로 ``$10``을 사용하여 ``10번째 필드값``을 출력할 경우  
    다른 필드들은 10번째 필드가 없기 때문에 공백으로 출력되고 ce라는 필드만 출력하게 됩니다



    <br/>

* 추가적으로 탭이나 띄어쓰기가 여러번 입력되어 있더라도  그 사이에 문자가 없다면 1개의 필드로 처리 됩니다.  
이러한 특성으로 인해 데이터를 처리할때는 데이터의 내용에 일관성이 있어야  
생각했던 결과와 다른 값이 나오는 현상을 방지할 수 있습니다.

<br/>

---

## 🙌 awk 사용법

* awk 는 아래와 같은 형식으로 사용할 수 있습니다 

    ```cs
    command | awk 'pattern'

    command | awk '{action}'

    command | awk 'pattern' '{action}'

    awk [OPTION...] [pattern {action} ...] [ARGUMENT...]
    
    ```

<br/>

* 표


    |awk 사용 예|	명령어 옵션|
    |:---|:---
    |파일의 전체 내용 출력|	awk '{ print }' [FILE]
    |필드 값 출력	|awk '{ print $1 }' [FILE]
    |필드 값에 임의 문자열을 같이 출력	|awk '{print "STR"$1, "STR"$2}' [FILE]
    |지정된 문자열을 포함하는 레코드만 출력	|awk '/STR/' [FILE]
    |특정 필드 값 비교를 통해 선택된 레코드만 출력|	awk '$1 == 10 { print $2 }' [FILE]
    |특정 필드들의 합 구하기	|awk '{sum += $3} END { print sum }' [FILE]
    |여러 필드들의 합 구하기	|awk '{ for (i=2; i<=NF; i++) total += $i }; END { print "TOTAL : "total }' [FILE]
    |레코드 단위로 필드 합 및 평균 값 구하기	|awk '{ sum = 0 } {sum += ($3+$4+$5) } { print $0, sum, sum/3 }' [FILE]
    |필드에 연산을 수행한 결과 출력하기	|awk '{print $1, $2, $3+2, $4, $5}' [FILE]
    |레코드 또는 필드의 문자열 길이 검사	|awk ' length($0) > 20' [FILE]
    |파일에 저장된 awk program 실행	|awk -f [AWK FILE] [FILE]
    |필드 구분 문자 변경하기	|awk -F ':' '{ print $1 }' [FILE]
    |awk 실행 결과 레코드 정렬하기	|awk '{ print $0 }' [FILE]
    |특정 레코드만 출력하기	|awk 'NR == 2 { print $0; exit }' [FILE]
    |출력 필드 너비 지정하기	|awk '{ printf "%-3s %-8s %-4s %-4s %-4s\n", $1, $2, $3, $4, $5}' [FILE]
    |필드 중 최대 값 출력	|awk '{max = 0; for (i=3; i<NF; i++) max = ($i > max) ? $i : max ; print max}' [FILE]

<br/>

---

## 👍 awk 사용 예

* 예를 들기 위해 아래와 같은 파일을 하나 만들었다
    ```cs
    $ vi awkfile  
    홍 길동 3324    5/11/96 50354  
    임 꺽정 5246    15/9/66 287650  
    이 성계 7654    6/20/58 60000  
    정 약용 8683    9/40/48 365000 
    ```
    <br/>

* $0은 전체 필드를 출력한다
	```cs
    $ awk '{print $0}' awkfile
    > 
    홍 길동 3324    5/11/96 50354  
    임 꺽정 5246    15/9/66 287650  
    이 성계 7654    6/20/58 60000  
    정 약용 8683    9/40/48 365000 
    ```

    <br/>

* $1은 공백을 기준으로 첫번째 필드를 출력한다
	```cs
    $ awk '{print $1}' awkfile
    > 
    홍
    임
    이
    정
    ```

    <br/>

* sed와 동일하게 특정 패턴을 가진 행을 출력할 수도 있다.
	```cs
    $ awk '/길동/' awkfile
    > 홍 길동	3324	5/11/96	50354
    ```

    <br/>
	
* 다음과 같이 특정 패턴을 찾아 출력하는데 앞,뒤로 문자를 붙이기도 가능하다
    ```cs
    $ awk '/정/{print "\t안녕하세요? " $1, $2 "님!"}' awkfile
    > 
        안녕하세요? 임 꺽정님!  
        안녕하세요? 정 약용님!
    ```

<br/>

---

###  ``awk program`` 에는 아래와 같은 키워드가 제공됩니다.

* 목록

    ```cs
    BEGIN   delete  END     function    in      printf
    break   do      exit    getline     next    return
    continue        else    for         if      print      while
    ```

    <br/>

* ``awk program``은 새로운 변수를 선언하고 값을 할당하거나 참조할 수 있습니다.  
그리고 아래와 같이 특수 목적으로 미리 정의된 변수들을 사용할 수 있습니다

    ```cs
    ARGC        : ARGV 배열 요소의 갯수.
    ARGV        : command line argument에 대한 배열.
    CONVFMT     : 문자열을 숫자로 변경할 때 사용할 형식. (ex, "%.6g")
    ENVIRON     : 환경변수에 대한 배열.
    FILENAME    : 경로를 포함한 입력 파일 이름.
    FNR         : 현재 파일에서 현재 레코드의 순서 값.
    FS          : 필드 구분 문자. (기본 값 = space)
    NF          : 현재 레코드에 있는 필드의 갯수.
    NR          : 입력 시작 점에서 현재 레코드의 순서 값.
    OFMT        : 문자열을 출력할 때 사용할 형식.
    OFS         : 결과 출력 시 필드 구분 문자. (기본 값 = space)
    ORS         : 결과 출력 시 레코드 구분 문자. (기본 값 = newline)
    RLENGTH     : match 함수에 의해 매칭된 문자열의 길이.
    RS          : 레코드 구분 문자. (기본 값 = newline)
    RSTART      : match 함수에 의해 매칭된 문자열의 시작 위치.
    ```


<br/>

---

### ``awk program`` 에서 사용 가능한 ``함수``는 아래와 같습니다.

* 목록

    ```cs
    Arithmetic Functions :
    atan2(y,x),     cos(x),     sin(x),     exp(x),     log(x),     sqrt(x),
    int(x),         rand(),     srand([expr])

    String Functions :
        gsub(ere, repl[, in]),      index(s, t),            length[([s])],
        match(s, ere),              split(s, a[, fs ]),     sprintf(fmt, expr, expr, ...),
        sub(ere, repl[, in ]),      substr(s, m[, n ]),     tolower(s),
        toupper(s)

    Input/Output and General Functions :
        close(expression),          getline                 getline var
        system(expression)
	```

<br/>

### 계속해서 사용 예제를 확인해보겠습니다.

- ```OFMT``` 변수 

	- 숫자를 출력할 때 숫자 포맷 제어할 경우 사용. 간단히 ```printf```를 사용할 수도 있지만, ```OFMT```를 지정할 수 있음.

	- default는 ```%.6g```로 소수점 6자리

	```cs
    $ awk 'BEGIN{OFMT="%.2f"; print 1.23412, 15E-3}'
    > 1.23 0.01
    ``` 	

    <br/>

- ```printf``` 함수 

	- 포매팅된 깔끔한 출력을 할 경우 사용
	- newline을 제공하지 않기 때문에 newline이 요구되면 ```\n```을 사용해야함 
	- ``c : 문자``, ``d : 10진수``, ``f : 실수``, ``x : 16진수``
	- ```-```이 붙으면 좌측에서 시작되고 기본형이면 우측에서 시작
	```cs
    $ awk '{printf "The name is %-20s Number is %4d\n", $1" "$2, $3}' awkfile  
    > 
    The name is 홍 길동           Number is 3324
    The name is 임 꺽정           Number is 5246
    The name is 이 성계           Number is 7654
    The name is 정 약용           Number is 8683
    ```

    <br/>

- `awk -f` 옵션
	- `awk` 액션과 명령이 파일에 작성되어 있다면 `-f` 옵션을 사용

	```cs
	awk -f [awk 명령파일] [awk 명령을 적용할 텍스트 파일]
	```
	
	```cs
	$ vi awkcommand 
	{print "안녕하세요 " $1, $2"님"}
	{print $1, $2, $3, $4, $5}
	```
 	
	```cs
	$ awk -f awkcommand awkfile
	> 
	안녕하세요 홍 길동님
	홍 길동 3324 5/11/96 50354
	안녕하세요 임 꺽정님
	임 꺽정 5246 15/9/66 287650
	안녕하세요 이 성계님
	이 성계 7654 6/20/58 60000
	안녕하세요 정 약용님
	정 약용 8683 9/40/48 365000
	```


    <br/>

- 레코드와 필드

	- 레코드
		- 레코드라고 불리는 각 라인은 newline으로 분리된다
		- NR 변수 : 각 레코드들의 번호는 awk의 빌트인 변수 NR에 저장된다. 레코드가 저장된 다음 NR의 값은 하나씩 증가한다
		
            ```cs
            $ awk '{print NR, $0}' awkfile
            > 
            1 홍 길동	3324	5/11/96	50354
            2 임 꺽정	5246	15/9/66	287650
            3 이 성계	7654	6/20/58	60000
            4 정 약용	8683	9/40/48	365000
            ```

        <br/>

	- 필드
		- NF에 필드의 수를 유지하며 라인당 100개의 필드를 가질 수 있다
		
            ```cs
            $ awk '{print $1, $2, $5,  NF}' awkfile
            > 
            홍 길동 50354 5
            임 꺽정 287650 5
            이 성계 60000 5
            정 약용 365000 5
            ```
		
        <br/>

	- 필드 분리자
		- 빌트인 변수 ```FS```는 입력 필드 분리자의 값을 가지고 있다.  
        default는 공백과 탭. ```FS``` 값을 변경하기 위해선 ```-F```을 사용하며 ```-F``` 다음에 오는 문자가 새로운 필드 분리자가 된다

            테스트를위해 아래와 같은 파일을 생성	
			```cs
            $ vi awkfile_FS
            홍 길동 :3324   :5/11/96        :50354
            임 꺽정 :5246   :15/9/66        :283502
            ```

            ``:``을 분리자로 ``홍``이라는 문자를 기준으로 분리해 1,2 행을 출력

			```cs
            $ awk -F: '/홍/{print $1, $2}' awkfile_FS
            > 홍 길동	 3324
            ```

<br/>

---

### awk와 정규표현식  

- 정규표현식은 슬래시로 둘러싸인 문자들로 구성된 패턴 
	

    * ``정``으로 시작하는 문자열의 1,2,3행 출력

        ```cs
        $ awk '/^정/{print $1, $2, $3}' awkfile
        > 정 약용 8683
        ```

    <br/>

- ```match``` 연산자(~) : 표현식과 매칭되는 것이 있는지 검사하는 연산자  
 

    * 2번 필드가 g로 끝나지 않는 라인 출력
        ```cs
        $ awk '$2 !~ /g$/' awkfile2
        > Lee Seongkye	7654	6/20/58	60000
        ```

    <br/>

###  비교 표현식

- 어떤 상태가 ``참``일때만 액션이 수행	

    * 3번째 필드가 ``7000`` 크다면 1,2행을 출력
	    ```cs
        $ awk '$3 > 7000{print $1, $2}' awkfile
        > 
        이 성계
        정 약용
	    ```	

        <br/>

- 논리 연산자

	- ```&&``` : AND 연산
	- ```||``` : OR 연산
	- ```!``` : NOT 연산
        
        앞의 수식과 뒤의 수식 모두 맞아야 출력이 된다.
        ```cs
        $ awk '$3 > $5 && $3 <= 100' filename
        ```  	
---

## 👏 명령어들의 실습

1. 파일의 전체 내용 출력. 
``"print"`` 액션만 지정한 경우, 입력으로 지정된 파일의 내용을 출력합니다.


    ```cs
    $ awk '{ print }' ./file.txt            > file.txt의 전체 파일 내용 출력.
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    --------------------------------------------------------------------
    $ awk '{ print }' ./file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    ```

<br/>



2. 필드 값 출력. 
    ``"print $n"`` 액션을 통해 ``n번째 필드 값``을 출력할 수 있습니다.  
    참고로, "$0"은 전체 레코드를 나타내는 변수입니다.


    ```cs
    $ awk '{ print $2 }' ./file.txt           > 두 번째 필드 값 출력.
    $ awk '{ print $1,$2 }' ./file.txt        > 첫 번째, 두 번째 필드 값 출력.
    $ awk '{ print $0}' ./file.txt            > 전체 레코드 출력.
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20

    $ awk '{ print $1, $2}' ./file.txt
    1 ppotta
    2 soft
    3 prog
    ```

<br/>

3. 필드 값에 임의 문자열을 같이 출력. 
    ``$1`` 필드 앞에 ``"no:"`` 라는 문자
    ``$2`` 필드 앞에 ``"user:"`` 라는 문자를 붙였다

    ```cs
    awk '{print "no:"$1, "user:"$2}' ./file.txt
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    $ awk '{print "no:"$1, "user:"$2}' ./file.txt
    no:1 user:ppotta
    no:2 user:soft
    no:3 user:prog
    ```

<br/>

4. 지정된 문자열을 포함하는 레코드만 출력.   
    awk의 패턴에 ``정규 표현식``을 사용하여 문자열 패턴을 검사할 수 있습니다.  
    이 때, 정규 표현식은 ``"/regex/"`` 형태로 지정할 수 있습니다.


    ```cs
    awk '/pp/' ./file.txt                   # "pp" 가 포함된 레코드만 유효.
    awk '/[2-3]0/' ./file.txt               # 20, 30 이 포함된 레코드만 유효.
    ```
    
    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    --------------------------------------------------------------------
    $ awk '/pp/' ./file.txt
    1 ppotta 30 40 50                      ## "pp" 문자가 포함된 레코드만 출력
    $ awk '/[2-3]0/' ./file.txt
    1 ppotta 30 40 50                      ## "20,30"이 포함된 레코드 출력
    3 prog   90 10 20
    ```

<br/>

5. 특정 필드 값 비교를 통해 선택된 레코드만 출력.   
``awk program language의 표현식``을 사용해 유효한 레코드를 위한 필드 값을 비교할 수 있습니다.


    ```cs
    awk '$1 == 2 { print $2 }' ./file.txt   # 첫 번째 필드가 2인 레코드의 두 번째 필드 출력.
    awk '$3 > 70 { print $0 }' ./file.txt   # 세 번째 필드가 70보다 큰 레코드 출력.
    awk '$3 == 30 && $4 ==40 { print $2 }' file.txt   
    # 세 번째 필드가 30이고 네 번째 필드가 40인 레코드의 두 번째 필드 출력.
    # &&의 경우 두개의 조건의 모두 참일때만 참
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    $ awk '$1 == 2 { print $2 }' ./file.txt
    soft
    $ awk '$3 > 70 { print $0 }' ./file.txt
    3 prog   90 10 20
    $ awk '$3 == 30 && $4 ==40 { print $2 }' file.txt
    ppotta
    ```


<br/>

6. 지정된 필드의 값을 더한 값 출력. (특정 필드에 대한 합 구하기)   
    ``awk program``에서 변수의 사용을 통해 특정 필드의 값을 더하고, 더해진 총 합을 출력할 수 있습니다.  
    이 때, 총합은 모든 레코드 탐색이 끝난 시점인, ``"END"``패턴의 액션에서 실행합니다.

    ```cs
    awk '{sum += $3} END { print sum }' ./file.txt # 3번째 필드의 값을 더한다.
    ```
    
    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    -----------------------------------------------------------------------
    $ awk '{sum += $3} END { print "SUM : "sum }' ./file.txt
    SUM : 180                             ## 3번째 필드의 30,60,90의 총합 출력
    ```


<br/>

7. 여러 필드의 값을 더한 값 출력. (여러 필드에 대한 합 구하기)   
    ``for 루프``를 수행하여 여러 필드의 값을 연산에 포함시킬 수 있습니다.  
    참고로 아래 예제에서 ``"NF"``는 현재 레코드의 필드 갯수를 뜻하며  
    ``"$i"``는 변수 i가 매핑된 필드를 뜻합니다. ``(i=2일 때 $2)``


    ```cs
    awk '{ for (i=2; i<=NF; i++) total += $i }; END { print "TOTAL : "total }' ./file.txt
    
    조건 : i=2 이고. 레코드의 필드 개수와 같아질때까지 total의 값이 증가한다.
    조건2 : 변수 i의 값이 NF와 동일해지면 total의 값을 출력한다.
    
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    -----------------------------------------------------------------------------
    $ awk '{ for (i=2; i<=NF; i++) total += $i }; END { print "TOTAL : "total }' ./file.txt
    TOTAL : 450

    i = 3 일때는 3필드 (30+60+90) = 180
    i = 4 일때는 4필드 (40+70+10) = 180+120
    i = 5 일때는 5필드 (50+80+20) = 300+150
    ```


<br/>


8. 레코드 단위로 필드 합 및 평균 값 구하기.   
    변수 및 액션을 조합하여 레코드 단위로 필드들의 값 및 평균을 계산하여 출력할 수 있습니다.


    ```cs
    awk '{ sum = 0 } {sum += ($3+$4+$5) } { print $0, sum, sum/3 }' ./file.txt

    조건 : sum에 0의 값을 넣어 초기화
    조건 : sum에 3,4,5필드의 값을 모두 더한다
    조건 : 출력할때 전체 필드, 총합 값, 평균 값을 출력
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    ---------------------------------------------------------------------------
    $ awk '{ sum = 0 } {sum += ($3+$4+$5) } { print $0, sum, sum/3 }' ./file.txt
    1 ppotta 30 40 50 120 40
    2 soft   60 70 80 210 70
    3 prog   90 10 20 120 40
    ```

<br/>

9. 필드에 연산을 수행한 결과 출력하기.   
    awk program 표현식을 사용하여, 필드에 연산을 수행한 결과를 출력할 수 있습니다.

    ```cs
    awk '{print $1, $2, $3+2, $4, $5}' ./file.txt     # 세 번째 필드에 2를 더한 값을 출력.
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    ---------------------------------------------------------------------------
    $ awk '{print $1, $2, $3+2, $4, $5}' ./file.txt
    1 ppotta 32 40 50
    2 soft 62 70 80
    3 prog 92 10 20
    ```


<br/>

10. 레코드 또는 필드의 문자열 길이 검사.   
    ``length() 함수``를 사용해 레코드 또는 필드의 문자열 길이를 확인할 수 있습니다.


    ```cs
    awk ' length($0) > 20' ./file.txt               # 레코드의 길이가 20보다 큰 경우.
    awk ' length($2) > 4 { print $0 } ' ./file.txt  # 두 번째 필드의 길이가 4보다 큰 레코드 출력.
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    ------------------------------------------------------------------------------
    $ awk ' length($2) > 4 { print $0 } ' ./file.txt
    1 ppotta 30 40 50               ## ppotta -> 6의 길이이니깐 출력
    ```

<br/>

11. 파일에 저장된 awk program 실행.   
    awk 실행 시, "-f" 옵션을 사용하여 파일로부터 awk program을 실행할 수 있습니다.


    ```cs
    awk -f awkp.script ./file.txt           # awkp.script에 저장된 awk program 실행
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    -----------------------------------------------------------------------------
    $ cat awkp.script
    # 스크립트 내용
    {
        for (i=2; i<=NF; i++)
            total += $i
    }

    END {
        print "TOTAL : "total
    }

    # 내용은 위의 전체 필드의 합과 같다.
    -----------------------------------------------------------------------------
    $ awk -f awkp.script ./file.txt
    TOTAL : 450
    ```

<br/>

12. 필드 구분 문자 변경하기.   
    기본적으로 레코드의 필드를 구분하는 문자는 space(공백) 입니다.  
    이를 ``"-F"`` 사용하여 변경할 수 있습니다.


    ```cs
    awk -F ':' '{ print $1 }' ./file.txt         # 필드 구분 문자를 : 로 변경.
    awk -F ',' '{ print $1 }' ./file.txt         # 필드 구분 문자를 , 로 변경.
    ```

    ```cs
    $ cat file2.txt
    1, ppotta, 30, 40, 50
    2, soft,   60, 70, 80
    3, prog,   90, 10, 20
    -------------------------------------------------------------------------
    $ awk -F ',' '{ print $1 }' ./file2.txt
    1
    2
    3
    ```


<br/>

13. awk 실행 결과 레코드 정렬하기.   
    ``sort`` 명령을 조합하여 awk 실행 결과로 출력되는 레코드를 정렬할 수 있습니다. 


    ```cs
    awk '{ print $0 }' file.txt | sort      # 출력 레코드를 오름차순으로 정렬.
    awk '{ print $0 }' file.txt | sort -r   # 출력 레코드를 역순으로 정렬.
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    -------------------------------------------------------------------------
    $ awk '{ print $0 }' file.txt | sort -r     # 결과 값을 내림차순으로 정렬
    3 prog   90 10 20
    2 soft   60 70 80
    1 ppotta 30 40 50
    ```

<br/>

14. 특정 레코드만 출력하기.   
    ``exit`` 키워드를 사용하여 조건에 따라 awk 실행을 중지시킬 수 있습니다.


    ```cs
    awk '{ print $0; exit }' file.txt                 # 첫 번째 레코드만 출력하고 실행 중지.
    awk 'NR == 2 { print $0; exit }' file.txt         # 두 번째 레코드만 출력하고 실행 중지.
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    -----------------------------------------------------------------------
    $ awk 'NR == 2 { print $0; exit }' file.txt
    2 soft   60 70 80
    ```

<br/>

15. 출력 필드 너비 지정하기.   
    ``printf`` 함수를 사용하여 필드 값 출력 포맷을 지정할 수 있습니다.  
    printf 함수에 사용하는 출력 포맷은 C 언어와 동일합니다.


    ```cs
    awk '{ printf "%-3s %-8s %-4s %-4s %-4s\n", $1, $2, $3, $4, $5}' file.txt
    ```

    ```cs
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    ---------------------------------------------------------------------------
    $ awk '{ printf "%-3s %-8s %-4s %-4s %-4s\n", $1, $2, $3, $4, $5}' file.txt
    1   ppotta   30   40   50  
    2   soft     60   70   80  
    3   prog     90   10   20

    # %-3 같은 형식은 스페이스(공간)을 사용하겠다는 의미이다.
    # -는 왼쪽부터 시작한다는 뜻.
    ```

<br/>

16. 필드 중 최대 값 출력.   
    아래와 같은 코드를 통해 레코드 내 필드의 최대 값을 구하여 출력할 수 있습니다.


    ```cs
    awk '{max = 0; for (i=3; i<NF; i++) max = ($i > max) ? $i : max ; print max}' ./

    조건 : max의 값을 0으로 초기화
    조건 : i는 레코드의 값만큼 증가
    조건 : max에는 i의 값을 순차적으로 저장
    조건 : ? 조건으로 크거나 같게되면 max 값 출력
    ```

    ```cs
    file.txt
    $ cat file.txt
    1 ppotta 30 40 50
    2 soft   60 70 80
    3 prog   90 10 20
    -------------------------------------------------------------------------------
    $ awk '{max = 0; for (i=3; i<NF; i++) max = ($i > max) ? $i : max ; print max}' ./file.txt
    40                 # 첫번째 레코드의 가장 큰 값
    70                 # 두번째 레코드의 가장 큰 값
    90                 # 세번째 레코드의 가장 큰 값
    ```


---


```toc
```