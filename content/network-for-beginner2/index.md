---
emoji: 🤦‍♂️
title: "[Routing, Switching] 네트워크 기초 Part - 2"
date: "2021-06-23 00:00:20"
author: nasa1515
tags: NETWORK
categories: NETWORK
---

머리말  

이전 포스트인 네트워크 기초 Part - 1에서 미처 정리하지 못한 부분까지 정리한 포스트입니다!. 

---

## 👍 1. 네트워크 장비  

<br/>

  * ### 라우터 : 네트워크 사이에 데이터 전송을 수행  

    - 라우터에 의해 네트워크를 상호 연결할 수 있다.
    - 라우터는 IP 주소를 사용, 네트워크 간의 데이터 전송을 수행하며 이를  'Routing' 이라고 한다.
    - 라우팅을 위해서는 미리 라우팅 테이블에 네트워크 정보를 등록해야한다.
    - 테이블에 등록되지 않은 주소가 목적지인 데이터는 라우터에 의해 파기된다.  
  

    ![](https://t1.daumcdn.net/cfile/tistory/99EF13365BC6464F1D)

    
  
<br/>

  * ### 스위치 :  같은 네트워크 내부에서 데이터 전송을 수행
  
    - 스위치는 PC나 서버에 있어 네트워크 입구에 해당하는 
	네트워크 기기이다.
    - 스위치는 MAC 주소를 사용해 같은 네트워크의 포트 간 데이터 전송을 수행한다
    - MAC 주소는 48비트의 LAN 포트 주소이다.
    - L3 SWITCH의 경우 ROUTER와 동일 동작을 실행한다.  
  
	![](https://t1.daumcdn.net/cfile/tistory/99F5EE3A5BC6CB230D)

<br/>

* ### 리피터 : 상위계층에서 사용하는 MAC, IP주소를 이해 못함, 단순히 전기적인 신호만 증폭시킨다.

   - 전기적인 신호를 증폭시켜 먼거리 까지 도달 할 수 있도록 하는 장비
   - 전체 LAN에 접속할 수 있는 장비의 수 증가

<br/>

* ### 허브 : 전기적인 신호를 증폭, LAN의 전송거리를 연장
   
    - 여러대의 장비를 LAN에 접속할 수 있음
    - UTP 케이블을 사용하는 환경에서 장비들을 상호 
	연결시키는 콘센트레이터 역할
    - 한 장비에서 전송된 데이터 프레임을 허브로 연결된 모든 장비에게 전부 전송하는 `플러딩`이 발생   
   [ 플러딩 발생 -> 프레임 충돌 발생 증가, 네트워크 성능저하로 이어짐 ]
          
        ![허브, 스위치 및 라우터 차이 : 네이버 블로그](https://mblogthumb-phinf.pstatic.net/20160624_129/chlalsdud61_1466752756894ycuh8_PNG/2e2e2.png?type=w2)	
  

<br/>

----

## 👏 2. ROUTING  

네트워크 안에서 통신 데이터를 보낼 때 최적의 경로를 선택하는 것

* ### Routing 방식 

  * #### 정적 라우팅(Static routing)  

      멀리 떨어져 있는 네트워크를 지정할 때 사용  
      관리자가 명령어로 직접 설정함. (고정적), (트래픽 사용X)


  * #### 동적 라우팅(dynamic routing)  
  
      라우터가 자동으로 라우팅 테이블을 입력한다.  
      사용자는 프로토콜 설정만 해주면 된다.  
	    네트워크망 변화 자동업데이트(가변적)  
      라우터 사이에 교환을 위한 트래픽이 발생한다.
	
  * #### 물리적 연결(Connected) : 물리적으로 연결되어있음

<br/>

* ### Routing Protocol  
	라우팅 프로토콜은 우선 AS에 따라 두가지로 나뉜다.

  AS : 하나의 토폴로지 덩어리, 쉽게 말해 하나로 소속된 라우터들의 장비

	* IGP - AS 내부에서 사용하는 라우팅 프로토콜  
	* EGP - AS 외부에서 사용하는 라우팅 프로토콜


  ![](https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F240EDB3853CF87FB15)

<br/>

  
  프로토콜이 최적의 경로를 선출하는 기준 - ``METRIC`` 당연히 ~ METRIC값은 프로토콜 별로 상이하다.

<br/>	


* ### 프로토콜 별 경로 결정 값  

	![라우팅 개요 1. 라우팅이란? 서로 다른 네트워크 영역의 통신을 가능 ...](https://slidesplayer.org/slide/14113982/86/images/7/%EA%B2%BD%EB%A1%9C%EA%B2%B0%EC%A0%95+%EB%B0%A9%EB%B2%95%EA%B3%BC+%EB%9D%BC%EC%9A%B0%ED%8C%85+%ED%85%8C%EC%9D%B4%EB%B8%94+%EB%9D%BC%EC%9A%B0%ED%8C%85+%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C%EB%B3%84+AD%EA%B0%92+%EB%A9%94%ED%8A%B8%EB%A6%AD+%EB%9D%BC%EC%9A%B0%ED%8C%85+%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C+%EB%A9%94%ED%8A%B8%EB%A6%AD+RIP+EIGRP+OSPF+BGP.jpg)

<br/>

---

## 🤞 3. ACL (Access Control List)

  네트워크가 구분이 되어있는 구간에 대해서 사용이 가능하다. 특정 포트 또는 구간주소, 포트번호, 옵션, 프로토콜 등을 구분해  
  허가하거나 거부하는 리스트를 생성해 일종의 방화벽 역할을 수행한다.	


* ### ACL의 종류  
  
  
  * Standard 방식  
  출발지 주소만 확인하며 3계층 정보까지만 확인한다 (1~99)   

  <br/>

  *  Extended 방식  
  출발지&목적지 주소, 포트번호, 프로토콜,옵션 등을 확인  
  4계층 정보까지 확인하여 구성 가능 (99~199) 
   
<br/>

---

## ✌ 4. VLAN(Virtual Local Area Network) 

논리적으로 나뉘어져있는 네트워크 - 가상의 네트워크망  
아래의 그림처럼 하나의 스위치를 갖고 여러대의 스위치를 가진 듯 구성 가능

* 네트워크의 보안성 강화  
* SWITCH 네트워크 내에서 LoadBalcing이 가능  
* 네트워크 구성 및 설정이 용이하다.    



![VLAN 이란? :: 가나다](https://t1.daumcdn.net/cfile/tistory/2135244D5426FD4E06)	


    
<br/>

---

## ✔ 5. VTP (VLAN Trunking Protocol)    
  
  복수개의 스위치들이 VLAN 설정 정보를 교환할 때 사용하는 프로토콜
  
  * Trunking(트렁킹)  
    다른 VLAN이 데이터를 주고 받을 수 있게 하는 한 라인으로 된 통로.  
    VLAN 이 N개 일때 스위치 간 링크는 N개여야 한다.  
    
    <br/>

  * Tagging  
    VLAN ID는 트렁킹 프로토콜에서 VLAN을 구분하는 용도로 사용한다.  
    그러나 트렁킹은 통합 통로를 사용해 VLAN에 ID를 붙여서 구분한다.

  
---

<br/>

## 😉 6. STP (Spanning tree protocol)

두 노드 사이 활성경로가 두 개 이상 존재하면 브리지 루프가 발생하기 때문에 ethernet frame 의 이중화 링크를 차단하여 루프 발생 방지 한다.  
[ L3 or Router 에서는 TTL 기능으로 루프 방지 ]


* ### STP의 동작원리  

  1. 네트워크당 하나의 루트 브리지(Root Bridge)를 갖는다.  
  2. 루트 브리지가 아닌 나머지 브리지는 하나씩의 (Root Port)를 갖는다.  
  3. 세그먼트(Segment)당 하나씩의 (Designated Port)를 갖는다.    
       
<br/>

* ### 스패닝 트리의 프로토콜의 5가지 상태 변화.

	* [1] Disabled – 포트 다운상태이거나,포트를 Shutdown시켜놓은 상태
       * 데이터 전송 X
       * 맥 어드레스 못 배움
       * BPDU 역시 못주고 못받음.

      <br/>      

	* [2] Blocking – 스위치를 처음으로 켜거나, 포트셧다운을 풀었을 때

      * 데이터 전송 X
      * 맥 어드레스 못 배움
      * BPDU 주고 받음


      <br/>      

	* [3] Listening – 블로킹 상태에 있던 스위치의 포트가 루트or디사이네이티드 포트로 선정되면 해당 포트는 리스닝상태로 바뀜.

      * 데이터 전송 X
      * 맥 어드레스 못 배움
      * BPDU 주고 받음
  
      <br/>      

	* [4] Learning , 리스닝 상태 -> 스위치 포트가 포워딩 딜레이 시간동안 현상태를 유지하게 된다면 러닝상태로 전환. 

      * 데이터 전송 X
      * 맥 어드레스 배움
      * BPDU 주고 받음

      <br/>      

	* [5] Forwarding : 스위치 포트가 러닝에서 다른 상태로 넘어가지 않고 다시 포워딩 딜레이(디폴트 시간인 15초) 동안 상태를 유지  
      러닝 상태에서 포워딩 상태로 넘어가게 된다 포워딩 상태가 되어야 스위치는 데이터 프레임을 주고 받을 수 있게 된다.

      * 데이터 전송 O
      * 맥 어드레스 배움
      * BPDU 주고 받음  
     
<br/> 

---

## ✌ 7. HSRP(Hot standby router protocol)
	
* 시스코전용 게이트웨이 이중화 프로토콜  
  복수의 게이트웨이 사용시, ACTIVCE 게이트웨이에 장애가 발생, SLAVE 게이트웨이가 메인 게이트웨이로서 동작  


	![S2700, S3700, S5700, S6700, S7700, and S9700 Series Switches ...](https://download.huawei.com/mdl/imgDownload?uuid=cd6b18230b604589aa173b1424d9c719.png)



```toc
```