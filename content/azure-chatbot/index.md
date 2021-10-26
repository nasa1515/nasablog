---
emoji: 🤦‍♂️
title: "[DATA, AZURE] - MicroSoft BotFrameWork with Python to Azure"
date: "2021-10-24 00:35:25"
author: nasa1515
tags: AZURE DATA
categories: AZURE DATA
---

  

머리말  

이번 포스트도 역시 파이썬을 첨가했습니다.  
MicroSoft에서 제공하는 BotFramework을 사용해서 간단한 질답을 하는 ChatBot을 생성한 뒤 Azure Web에 배포하고  
Teams App에 연동 해보겠습니다.  

--- 

## ✔ BotFrameWork 

MicroSoft에서 제공하고 있는 Chatbot SDK OpenSource 입니다.  
C#, JS, Python, Java 등 여러 언어를 사용해서 SDK를 사용 할 수 있고  
제작한 템플릿을 쉽게 Azure의 Service와 연동 할 수 있습니다.  


* [GITHUB](https://github.com/microsoft/botframework-sdk)  

<br/>

---

## ✌ 1. Bot 생성

바로 Bot 생성에 앞서 진행 전 선행조건을 만족해야합니다. 

<br/>

```cs
### 선행 조건  

- github 계정
- Azure 계정

### 사용 프레임워크

- Bot Framework
- Azure Cognitive Service API

### 개발 언어

- Python

Python lib

- microsoftbotframework 
```

<br/>

---



### 👍 FrameWork Bot 생성 with VSCODE


MS에서 Python용 Sample을 이미 제공해서 수정해 쓰는걸로!!


* [Sample link](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python)  


<br/>

우선 Resource Group을 생성하고, Bot을 배포 할 App Service를 생성하겠습니다.

* 다음과 같이 CLI로 Resource Group을 생성합니다.  

    ```cs
    명령어 : #  az group create -l koreaCentral -n pynasa
    ```

    ![2221111](https://user-images.githubusercontent.com/69498804/118922561-3f585d80-b975-11eb-9e69-4ed3010b1be1.JPG)


<br/>


저는 VSCODE를 주 IDE로 사용하기 때문에 VSCODE를 기반으로 App Service를 생성하겠습니다.  
VSCODE에서 아래 extension을 추가 설치가 필요합니다.  
아래 두개의 Extension을 쓰면 Azure로 Web Bot을 손쉽게 배포가 가능합니다.  

<br/>


* Azure Account 

    ![123123](https://user-images.githubusercontent.com/69498804/118920309-28b00780-b971-11eb-8aa7-964e271d1411.JPG)

<br/>

* Azure App Service 

    ![33322](https://user-images.githubusercontent.com/69498804/118920367-49785d00-b971-11eb-8df4-cfa27e1e1965.JPG)



<br/>

Azure Account로 Azure 계정에 로그인 뒤 App Service를 생성합니다.  

* Azure Account에 정상적으로 등록되면 아래와 같이 Azure에서 구독이 보입니다.  

    ![123123123](https://user-images.githubusercontent.com/69498804/118921566-5c8c2c80-b973-11eb-82a6-e4f748f03ba2.JPG)

    * 구독에서 우클릭 -> Create New Web App(Advanced) 선택해 생성!  


<br/>

* 저는 pynasa 라는 이름으로 App Service를 하나 생성했습니다.  

    * Spce 

        * Resouce Group : pynasa
        * Python 3.7 
        * App Service Plan : 신규 생성   
        * Pricing tier : S2 
        * Application Insitghts : Skip 
        * Region : Korea Central


<br/>


* 정상적으로 생성이 되면 다음과 같이 구독 아래 App Service가 보입니다. 

    ![323332323232332](https://user-images.githubusercontent.com/69498804/118924058-81829e80-b977-11eb-9e52-881bb1590266.JPG)

<br/>


* 실제 Azure Potal 에서도 생성 확인이 가능합니다. 

    ![111111](https://user-images.githubusercontent.com/69498804/118924933-c8bd5f00-b978-11eb-980b-37de32ed61aa.JPG)



<br/>

---

### 👌 이제 Bot Message를 주고 받을 Channels을 생성합니다.



<br/>

* bot Service - Bot Channels Registration
![22222](https://user-images.githubusercontent.com/69498804/117908514-7c887400-b313-11eb-94a4-dc8109c6eb67.JPG)


<br/>

* Channels 설정 

    ![2222222](https://user-images.githubusercontent.com/69498804/118925207-4aad8800-b979-11eb-941f-b4196d08b0cc.JPG)

    * Bot handle : nasapy
    * Resource Group : pynasa 
    * Location : KoreaCentral
    * Messaging endpoint : App Service url
        * App Service의 URL에 + api/massages 를 넣으면 됩니다.  
        * ex : https://test.azurewebsites.net/api/massages


    * Microsoft App ID and password : 자동생성  

<br/>


* Channels Resource 가 생성되었으면 Microsoft AppID를 확인합니다. 

    ![44444](https://user-images.githubusercontent.com/69498804/118925790-42098180-b97a-11eb-9733-f0df9ec5de27.JPG)

    APP ID는 나중에 Code, App 연동에 필요하니 복사해놓으세요!!  

<br/>

* Manage URL 클릭 -> Client secrets을 삭제 후 새로 생성

    ![5555555](https://user-images.githubusercontent.com/69498804/118925961-8c8afe00-b97a-11eb-873f-136e3b9d6538.JPG)

    처음 생성된 Value는 보이지가 않아서 삭제 후 새로 생성해서 복사해놓아야 합니다.  


<br/>


복사해놓은 App ID, Password 를 App Service에 등록해줍니다.  

* App Service - Configuration - Appliation setting

    ![666666666666](https://user-images.githubusercontent.com/69498804/118926168-da076b00-b97a-11eb-8781-2d696fa20ce4.JPG)

    * MicrosoftAppId : 봇채널에서 복사한 ID
    * MicrosoftAppPassword : 봇채널의 Value 값  
    * WEBSITE_HTTPLOGGING_RETENTION_DAYS : 7
    * WEBSITES_CONTAINER_START_TIME_LIMIT : 1400  


<br/>


* App Service의 Configuration - general setting

    ![777777](https://user-images.githubusercontent.com/69498804/118926448-500bd200-b97b-11eb-8bcf-cb82f44475fc.JPG)

    * Startup command  
    python3.7 -m aiohttp.web -H 0.0.0.0 -P 8000 app:init_func  


        * 해당 Stratup command가 없으면 정상적으로 동작하지 않습니다.  

        * 웹 소켓도 열어주세요

<br/>

---

### 🐱‍🏍 환경세팅은 끝!

드디어 코드를 볼 수 있습니다.  
일단 VSCODE로 작업을 위해서 위의 Sample Code를 Clone 해옵니다.  

[echo bot link](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/02.echo-bot)

* 저는 Echo Bot Sample로 다음과 같은 환경으로 만들었습니다 

    ![999999](https://user-images.githubusercontent.com/69498804/118927047-3323ce80-b97c-11eb-823c-dce116edb9c0.JPG)


<br/>

### 😉 소스 수정

<br/>

* #### app.py의 Code 원본  

    ```python
    import sys
    import traceback
    from datetime import datetime
    from http import HTTPStatus

    from aiohttp import web
    from aiohttp.web import Request, Response, json_response
    from botbuilder.core import (
        BotFrameworkAdapterSettings,
        TurnContext,
        BotFrameworkAdapter,
    )
    from botbuilder.core.integration import aiohttp_error_middleware
    from botbuilder.schema import Activity, ActivityTypes

    from bots import EchoBot
    from config import DefaultConfig

    CONFIG = DefaultConfig()

    # Create adapter.
    # See https://aka.ms/about-bot-adapter to learn more about how bots work.
    SETTINGS = BotFrameworkAdapterSettings(CONFIG.APP_ID, CONFIG.APP_PASSWORD)
    ADAPTER = BotFrameworkAdapter(SETTINGS)


    # Catch-all for errors.
    async def on_error(context: TurnContext, error: Exception):
        # This check writes out errors to console log .vs. app insights.
        # NOTE: In production environment, you should consider logging this to Azure
        #       application insights.
        print(f"\n [on_turn_error] unhandled error: {error}", file=sys.stderr)
        traceback.print_exc()

        # Send a message to the user
        await context.send_activity("The bot encountered an error or bug.")
        await context.send_activity(
            "To continue to run this bot, please fix the bot source code."
        )
        # Send a trace activity if we're talking to the Bot Framework Emulator
        if context.activity.channel_id == "emulator":
            # Create a trace activity that contains the error object
            trace_activity = Activity(
                label="TurnError",
                name="on_turn_error Trace",
                timestamp=datetime.utcnow(),
                type=ActivityTypes.trace,
                value=f"{error}",
                value_type="https://www.botframework.com/schemas/error",
            )
            # Send a trace activity, which will be displayed in Bot Framework Emulator
            await context.send_activity(trace_activity)


    ADAPTER.on_turn_error = on_error

    # Create the Bot
    BOT = EchoBot()


    # Listen for incoming requests on /api/messages
    async def messages(req: Request) -> Response:
        # Main bot message handler.
        if "application/json" in req.headers["Content-Type"]:
            body = await req.json()
        else:
            return Response(status=HTTPStatus.UNSUPPORTED_MEDIA_TYPE)

        activity = Activity().deserialize(body)
        auth_header = req.headers["Authorization"] if "Authorization" in req.headers else ""

        response = await ADAPTER.process_activity(activity, auth_header, BOT.on_turn)
        if response:
            return json_response(data=response.body, status=response.status)
        return Response(status=HTTPStatus.OK)


    APP = web.Application(middlewares=[aiohttp_error_middleware])
    APP.router.add_post("/api/messages", messages)

    if __name__ == "__main__":
        try:
            web.run_app(APP, host="localhost", port=CONFIG.PORT)
        except Exception as error:
            raise error
    ```

<br/>

* #### 참고 사항

    app.py는 코드 그대로 Azure에 배포하면 정상 동작하지 않습니다.    
    Python은 Flask기반의 Code로 Azure App Service에서는 바로 실행이 안되고


    ![캡처](https://user-images.githubusercontent.com/69498804/119086038-d7227e00-ba3f-11eb-93ee-8d106c8d60f4.JPG)   

    There was an error sending this message to your bot: HTTP status code GatewayTimeout    
    에러가 발생합니다.
    Python은 js, C# 같이 Templetes 형태와 다르게 APP 실행 구문 수정이 필요합니다.  
    즉 아래처럼 init_func의 실행 구문을 APP 변수에 넣어준 뒤 실행해야 합니다.    


<br/>


* 다음과 같은 식으로 맨 아래의 코드를 수정합니다.  

    ```python
    def init_func(argv):             << -- 해당 부분 함수 처리
        APP = web.Application(middlewares=[aiohttp_error_middleware])
        APP.router.add_post("/api/messages", messages)
        return APP
        
    if __name__ == "__main__":
        APP = init_func(None)             << --- 해당 부분 추가
        try:
            web.run_app(APP, host="localhost", port=CONFIG.PORT)
        except Exception as error:
            raise error
    ```

<br/>

---

### 👏 onfig.py를 수정


<br/>

* config.py 원본 code 

    ```python
    import os

    """ Bot Configuration """


    class DefaultConfig:
        """ Bot Configuration """

        PORT = 3978
        APP_ID = os.environ.get("MicrosoftAppId", "")
        APP_PASSWORD = os.environ.get("MicrosoftAppPassword", "")
    ```
    * Port , App_ID, APP_Password 값 들을 모두 수정해줍니다.  
    * Port : 8080 
    * APP_ID : 아까 Channel에 넣은 ID 값
    * APP_PASSWORD : Value 값  

<br/>

---

### 👀 bot.py 수정


* bot.py 원본 Code 

    ```python
    from botbuilder.core import ActivityHandler, MessageFactory, TurnContext
    from botbuilder.schema import ChannelAccount


    class EchoBot(ActivityHandler):
        async def on_members_added_activity(
            self, members_added: [ChannelAccount], turn_context: TurnContext
        ):
            for member in members_added:
                if member.id != turn_context.activity.recipient.id:
                    await turn_context.send_activity("Hello and welcome!")

        async def on_message_activity(self, turn_context: TurnContext):
            return await turn_context.send_activity(
                MessageFactory.text(f"Echo: {turn_context.activity.text}")
            )
    ```
    해당 코드는 Open Message와 사용자의 Massage를 Return 하는 구문입니다.  


<br/>

* 여기서 정상동작이 가능하게 Open Message 부분만 바꾸겠습니다.  


    ```python
    for member_added in members_added:
    if member_added.id != turn_context.activity.recipient.id:
        await turn_context.send_activity("Hello I'm NaSa!")
    ```

<br/>

---

## 🤞 Bot 배포

이제 모든 수정사항들은 다 반영이 되었기 때문에 Azure Web Service에 Code 배포 후 결과를 확인해보죠

Azure Web Service로 Python Code Bot을 배포하는 방법은 매우 다양합니다.  
Azure Cli를 이용 할 수도 있고...그러나 js, C#처럼 자체 Templetes으로 생성하는 UI를 제공하지 않아서  
CLI를 사용하기에는 여러가지 불편한점들이 많습니다...  
그래서 저는 Cli보다는 VSCODE의 배포 기능을 사용했습니다..

* [cli 방법이 궁금하시면 링크](https://docs.microsoft.com/ko-kr/azure/bot-service/bot-builder-tutorial-deploy-basic-bot?view=azure-bot-service-4.0&tabs=python)

<br/>


저는 VSCODE로 배포 합니다!  




* VSCODE Bot DeployMent  

    ![캡처2](https://user-images.githubusercontent.com/69498804/119091073-7bf48980-ba47-11eb-881e-92c3ad1ce58b.JPG)

    * Extension의 App Service 우클릭 - Deploy to Web App...  

<br/>

* 배포 중에는 다음과 같이 App Service에 톱니바퀴가 돌아갑니다. 

    ![32332121](https://user-images.githubusercontent.com/69498804/119091815-91b67e80-ba48-11eb-978b-7df6a3a47c05.JPG)

<br/>

* 추가로 배포 Output log도 확인 할 수 있구요  

    ![5455454](https://user-images.githubusercontent.com/69498804/119091874-aabf2f80-ba48-11eb-9324-61d1c89190a6.JPG)

<br/>

* 1~2분만에 배포가 완료되고 성공 로그를 뿜습니다!!

    ![566565656565656565](https://user-images.githubusercontent.com/69498804/119092649-a5aeb000-ba49-11eb-9928-628c6b457423.JPG)

<br/>

* 그럼 App Service의 Diagnose and solve problems에서 APP log를 확인해보면

    ![32323323](https://user-images.githubusercontent.com/69498804/119095126-da703680-ba4c-11eb-9f82-1a4da549e36c.JPG)

    * 다음과 같이 Web Code가 제대로 배포되서 Success Code를 출력했습니다!!  


<br/>

* 생성해서 연결했던 Bot Channels을 확인해보면 다음과 같이 Running 상태를 확인합니다.  

    ![캡처44444](https://user-images.githubusercontent.com/69498804/119095372-28853a00-ba4d-11eb-92cd-d67bbf7cee85.JPG)


<br/>

* Web Chat Test 메뉴에서 기능에 대한 테스트를 진행해봅시다  

    ![434343434343](https://user-images.githubusercontent.com/69498804/119095514-55d1e800-ba4d-11eb-83cb-74d9108ad7c1.JPG)

    * Bot.py에서 수정했던 Open Message와 제가 적은 Return 값이 정확히 반환되네요!!  


<br/>


---

## 🤣 Teams에 Bot 연결

그럼 간단하게 만들어서 배포해본 봇을 MS의 Messaging App인 Teams에 연동해서 사용해보죠  


* Bot Channel의 Teams Icon 선택 

    ![3333333](https://user-images.githubusercontent.com/69498804/119100242-b44d9500-ba52-11eb-8c7e-946b914dcd11.JPG)

<br/>

* 그럼 다음과 같이 Access 여부를 묻는데 Save를 선택합니다.  

    ![444444](https://user-images.githubusercontent.com/69498804/119100295-c29bb100-ba52-11eb-81da-2537c0ea3a30.JPG)

<br/>

* 그 이후 Get Bot Embed Codes 선택 후 url을 복사하고 접속합니다.

    ![54545454545](https://user-images.githubusercontent.com/69498804/119100469-f1198c00-ba52-11eb-8ebe-68c02cd52b25.JPG)

    * 해당 코드에서 첫번째 줄의 Teams 접속 url만 복사 후 웹페이지 접속 하면 됩니다.  

<br/>


* 해당 웹페이지에 접속하면 다음과 같이 인증 탭이 발생합니다. - 열기로 열어주세요

    ![캡처](https://user-images.githubusercontent.com/69498804/119100817-4d7cab80-ba53-11eb-95e7-d3389e4cd795.JPG)

<br/>

* 그럼 자동으로 Teams <-> Bot이 연동되면서 아래와 같이 메세지를 수신 가능합니다. 

    ![2](https://user-images.githubusercontent.com/69498804/119101122-9df40900-ba53-11eb-8f08-13ef8389e16f.JPG)


<br/>
<br/>
<br/>

소스가 궁금하신 분들은 아래 제 GITHUB Source를 확인해주세요  

<br/>

* [NASA GITHUB](https://github.com/nasa1515/Azure-Chatbot)


---

## 마치며…  

  
포스트는 그렇게 길게 나오지 않았지만 GateWay 이슈를 해결하는데 약 2~3일 정도 걸렸습니다.   
Azure에서 기본제공해주는 Code에 문제가 있을 거라고 생각하지 않았기 때문이죠...  
이번 포스트에서는 간단하게 Echo Bot의 기능만 테스트 진행하여 리뷰 했지만  
다음 포스트에서는 LUIS, Q&A를 사용해서 특정 질문에 대한 답을 DB에서 가져오게 해보겠습니다.    


---

```toc
```