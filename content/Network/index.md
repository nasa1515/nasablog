---
emoji: :🤦‍♂️
title: 네트워크 기초 Part - 1
date: "2021-06-23 00:00:10"
author: 나사
tags: NETWORK
categories: NETWORK
---

**머리말**  

**스위치, 라우터등을 직접만지고 설정해보면서 기초지식아 충분하다고 생각했었지만 역시도 많이 희미해져있는 상태였습니다.**   
**그래도 이 포스트를 작성하며 많이 리와인드 한 것 같아서 기분이 좋습니다.**  

---


## **1. OSI 7 계층**
         
**OSI 7 계층이란?**  
**ISO(국제표준화기구)에서 개발한 모델 컴퓨터 네트워크 프로토콜 디자인과 통신을 계층을 나누어 설명한 것** 
 <br/>

* **(사진 참고)**    

  ![](https://steemitimages.com/DQmbtZtUqfyuKQ1HadcpZqLXr39EFt2kAzEz9GXi43QguVg/image.png)  

    ```              
    OSI 4 Layer (Transport layer) - 트랜스포트 계층
    device : X (Protocol)
    protocol : TCP/UDP, TCP/IP

    OSI 3 Layer (Network layer) - 네트워크 계층
    device : ROUTER , L3 SWITCH (IP routing table 정보)
    protocol : IP, IPX, Apple talk, arp, rarp, icmp, igmp.....등
      
    OSI 2 Layer (data link layer) - 데이터링크 계층
    device: SWITCH
    protocol : ehernet(CSMA/CD 방식),(LAN) - Src / Dst mac Address

    OSI 1 Layer (Physical layer) - 물리계층
    device : hub
    ```
		      
<br/>

* ### **계층 별 프로토콜 및 서비스**

  ```              
  - 서비스 : 웹 , DNS, 원격접속(telnel, ssh), 메일 송수신(pop3, snmp) .... 
  - 전송방식 : 정확 TCP/ 신속 UDP(QOS)
  - 주소방식 : IP, IPX, Apple talk ....
  - 스위칭방식 : LAN - Ethernert, tokenring
  - Wan - SLIP, Frame-realy, PPP.... (사설망) -> VPN(공인망)  
  ```

<br/>

* ### **CSMA/CD** (arrier Sense Multiple Access/Collision Detection) 반송파 감지 다중 엑세스/ 충돌검출  

    ```  
    유선 LAN 중 반이중 방식의 이더넷에서 단말이 전송을 위해 공유매체에 규칙있게 접근하기 위한 기능
    (매체 엑세스 제어 방식) ex)충돌방지
    ```

<br/>

* ### **PDU** (Protocol Data Unit)

  ```
  동일 통신계층(즉, Peer-to-Peer) 간에 운반(교환)되는 전체 데이터량 또는 그의 운반체
  ```
<br/>

* ### **SDU** (Service Data Unit)

  ```    
  상향/하향 두 통신 계층 간에 전달되는 실제 정보 (실제 교환되는 데이터 단위량)
  ```

<br/>

---------------------  

## **2. MAC Address/IP Address** 
                             
  * **MAC : 2계층에서 사용하는 네트워크 인터페이스에 할당된 고유 식별 주소**  
  * **IP : 네트워크 통신에 있어 각각의 통신기기(컴퓨터,스마트폰 등)에 할당된 식별번호를 나타낸다.**  

<br/>

  * **IP Header** 
    ![](https://mblogthumb-phinf.pstatic.net/20150330_184/sujunghan726_1427695807924ArlQA_PNG/2015-03-30_15%3B09%3B50.PNG?type=w2)  
           
      
---------------------  

           
## **3. IPv4 : 주소체계(Class)**

* **IP주소의 기본구성은 아래 그림과 같습니다**  

   ![](https://t1.daumcdn.net/cfile/tistory/245A434A534F708E0B)
  
* **Class 별 네트워크 영역**

   ![](https://t1.daumcdn.net/cfile/tistory/2103334A534F708E34)

<br/>

* **사설 IP 영역 : 기업 내 인트라넷 등  내부망에 쓰기 위한 예약주소**  

  ```
  A Class : 10.0.0.0 ~ 10.255.255.255  
  B Class : 172.16.0.0 ~ 172.31.255.255    
  C Class : 192.168.0.0 ~ 192.168.255.255  
  ```
   
----    

<br/>
    
## **4. 캡슐화**

 **캡슐화 (Encapsulation) <-> 역 캡슐화 (de-encapsulation)**
  
  - **캡슐화 -  송신 데이터에 필요한 정보(헤더)를 붙여 다음 계층에 보내는 기술**

	  **: 상위 –> 통신 프로토콜 정보 추가 –> 하위**
	  
    
  - **역 캡슐화 -  캡슐화의 반대 개념, 헤더를 제거하는 것을 역캡슐화라고 한다**  

	  **: 하위 –> 헤더 제거 –> 상위**  
  
       ![](https://t1.daumcdn.net/cfile/tistory/993FCD4D5B7A45AB07)
	  
		
---
  
          
<br/>

## **5. TCP/UDP 프로토콜**>  

**TCP(Transmission Control Protocol)**  
	 **인터넷상에서 데이터를 메세지의 형태로 보내기 위해 IP와 함께 사용하는 프로토콜**
            

  * **연결형 서비스로 가상 회선 방식을 제공한다.**
  * **3-way handshaking과정을 통해 연결 설정, 4-way handshaking으로 해제.**
  * **흐름 제어 및 혼잡 제어.**
  * **높은 신뢰성을 보장한다.**
  * **UDP보다 속도가 느리다.**
  * **전이중(Full-Duplex), 점대점(Point to Point) 방식.**  


<br/>

   * **TCP Protocol Header**
     
     ![](https://t1.daumcdn.net/cfile/tistory/272C9F49575F41D408)
            
---

<br/>

## **TCP 3, 4-WAY HANDSHAKING 로직**

* **사진 참고**

    ![enter image description here](https://t1.daumcdn.net/cfile/tistory/9910A8345BB0B75F2A)


 
-  ### **연결 생성** (Connection establishment) -> **(3-WAY)** 

    **1. SYN : 클라이언트가 서버에게 SYN 메시지를 보낸다.**   
		**이 메시지에 포함된 시퀀스 번호는 클라이언트가 임의로 설정한 값.**    
			
    **2.SYN-ACK : 서버가 클라이언트에게 SYN-ACK 메시지 응답.**   
			**이 메시지에 포함된 시퀀스 번호는 서버가 임의로 설정한 값 B** 
			**응답 번호는 (A + 1)**
	
	**3.ACK : 클라이언트가 서버에게 ACK 메시지를 보낸다.**  
      **이 메시지에 포함된 응답 번호는 (B + 1)**

<br/>

- **데이터 전송** (Data transfer)

<br/>

- **데이터 전송 완료**

<br/>


- **연결 종료 (Connection termination) -> (4-WAY)**
		
	**1.A -> B: FIN : 프로세스 A가 연결 종료FIN 플래그를 전송**  
		  **프로세스 B가 FIN 플래그로 응답하기 전까지 **연결을 계속 유지**	
		
	**2.B -> A: ACK : 프로세스 B는 일단 확인 메시지를 보내고 자신의 통신이 끝날 때까지 기다린다. (TIME_WAIT 상태)**  
		**수신자는 Acknowledgement Number 필드를 (Sequence Number + 1)로 지정**  
		**ACK 플래그 비트를 1로 설정한 세그먼트를 전송한다.**  
		**그리고 자신이 전송할 데이터가 남아있다면 이어서 계속 전송한다.**  


	**3.B -> A: FIN : 프로세스 B가 통신이 끝났으면 연결 종료 요청에 합의한다는 의미로 프로세스 A에게 FIN 플래그를 전송**


	**4.A -> B: ACK : 프로세스 A는 확인했다는 메시지를 전송**  

---

          
## **6. OS Port Number**  
  
    ```
    * SysTem Port Num : 0 ~ 1023 (ex ssh, http 등 프로토콜 전용 포트번호)
    * User Port Num : 1024 ~ 49151 (유저 연결 포트번호)
    * Private Port Num : 49152 ~ 65535

    # 자주 사용하는 대표적인 Protocol 및 Port 번호
          
    * UDP Service protocol - TFTP(69), HTTP(80), NTP(123) 등
    * TCP Service protocol - FTP(20,21), SSH(22), Telnet(23), DNS(53), HTTP(80)
    ```

---

<br/>

## **7. 서브 네트워킹** 


 **서브넷팅 (Sub Network)**
  
*  **네트워크 세분화를 위한 IP 주소의 구성을 변경** 
   - **IP 주소 체계는 [2단계 (네트워크 ID - 호스트 ID)] 에서**
   - **[다시 3단계(네트워크 - 서브네트 - 호스트] 로 네트워크 세분화 과정**  

 <br/>

* **호스트 구분 ID에 할당된 비트들을 추가적으로 네트워크 구분 ID로 사용 가능**

	![enter image description here](https://download.huawei.com/mdl/imgDownload?uuid=e610a78d32ad441992f33bf736c3311f.png)

<br/>
            
### **Subnet Mask (서브넷 마스크)**

* **서브 네트워크를 만들기 위해 AND 비트 연산에 의해 씌우는 마스크**

	* **TCP/IP 에서 IP 주소 체계로 네트워크를 분할하는 논리적인 수단** 
	  **(Mask는 차폐의 의미를 갖음)**
	
		![enter image description here](https://www.trance-cat.com/electrical-circuit-calculators/subnet-mask.jpg)
           

<br/>

* ### **서브넷팅 문제 )**

  ```
	문제 1) 
	공인 IP주소 210.100.1.0 (서브넷 마스크 255.255.255.0) 네트워크를 PC 30대인 네트워크로 최소 4개 이상 만들어라

	IP : 210.100.1.0/24
	서브넷팅 조건 : PC30대 이상, 서브넷 4개 이상

	1) 호스트 기준 : PC 30대 이상
	IP 30개 + 대표주소 1개 + 브로드 캐스트 1개 + 라우터 주소 1개 = 33개 -> 64(2의 6승)

	서브넷 마스크는 255.255.255.1100 0000 -> bit 2개로 네트워크 설정
	그러므로 255.255.255.192의 서브넷 마스크를 만들 수 있다. 
	"네트워크 4개, 호스트 64개"

	2) 네트워크 기준 : 네트워크 4개 이상
	- 255.255.255.1100 0000 -> 네트워크 4개, 호스트 64개	
	- 255.255.255.1110 0000 -> 네트워크 8개, 호스트 32개
  ```


---


### **슈퍼넷팅 (SUPERNETTING) - (CIDR)** 

* **여러 주소들을 마치 하나의 큰 주소 (Supernet) 처럼 크게 그룹화**  
      **(Address Aggregation/Supernetting) 이라고 함.**

* **CIDR(Classless Inter-Domain Routing)**   
	- **슈퍼네팅 기술이며 RFC 4632에 정의되어 있다.**
	- **Classless한 주소 할당 방식과 라우팅 경로 정보의 요약**
	- **라우팅 테이블이나 라우팅 정보 교환 시 데이터량을 절약 할 수 있음**


<br/>

### **슈퍼넷팅  예)**

  ```
  192.168.0.0/24 ~ 192.168.15.0/25 (N 16) - 2^4
  SUMMARY = 192.168.0.0 /20   = (-4)

  192.168.0.0               192.168.00000000.0
  192.168.0.1               192.168.00000001.0
  192.168.0.2               192.168.00000010.0
  192.168.0.3               192.168.00000011.0
  192.168.0.14              192.168.00001110.0
  192.168.0.15              192.168.00001111.0

  다음과 같이 CLASS의 IP대역을 넘어서 SUMMARY 하면 SUPERNETTING이라 한다
  ```

<br/>
          
          
### **VLSM (Variable Length Subnet Mask) - 가변길이 서브넷 마스크**
   
-  **각 서브넷 마다 가변 길이의 서브네트 마스크를 적용하는 기법**
-  **각 서브넷이 각기 다른 크기(호스트 수 또는 주소 배정 수)를 갖을 수 있음**  
  
---

## **8. 용어 정리**

  - **HUB - Flooding(플러딩)**  
	**수신되는 링크를 제외한 나머지 모든 링크로 패킷을 단순하게 복사 전송하는 일종의 무제어 포트 배정** 

  -  **SWITCH  (FORWARDING) 포워딩 <--> SWITCHING**  
     **거의 같은 의미이나, 포워딩 보다 광의이며 더 많이 쓰이는 용어**  
	   **회선교환(Circuit Switching), 패킷교환(Packet Switching) 처럼 상시적 또는 일시적으로 필요시 마다 연결 통로를 형성하는 것**  


----  

### **TCP/IP 용어 및 내용 정리**

  *  **ICMP**  
    **TCP/IP에서 IP 패킷을 처리할 때 발생되는 문제(신뢰정)를 알리거나**  
    **진단 등과 같이 IP 계층에서 필요한 기타 기능들을 수행하기 위해 사용되는       프로토콜, IP(Internet Protocol)와 하나의 쌍을 이루며 동작**  
    
  * **ICMP 용도 및 기능**

    ```
    일반적인 PING등 통신  
    (echo req or rep, timestamp, address mask, router solicitation)
  
	IP 통신중 에러 메세지 송/수신 
	00x03 - (Dst unreachable)
	00x04 - Source Quench (GW 과부화) .....등    
    ```

* ### **SLIP ( serial Line internet protocol )**  

  **IP에 대한 기본 프레이밍만 제공하는 매우 간단한 2계층 프로토콜, 전송을 위한 데이터 프레이밍만 수행.** 

 * **2계층 프로토콜**   
   **LLC : 상위계층인 3계층 프로토콜과의 통신 연결**  
   **MAC : 하위계층인 1계층과의 연결**    

  *  **ARP 프로토콜의 간단한 Process**  

  ```
	1.SERVER > Clinet > SERVER 통신을 위한 ICMP 메세지 전송  
	2.DST 정보 미기입으로 ARP 요청 (GW)  
	3.Broadcast Arp Request  
	4.Unicast Arp Reply  
  ```

```toc
```