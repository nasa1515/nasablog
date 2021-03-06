---
emoji: ๐คฆโโ๏ธ
title: "[DATA, AZURE] - MicroSoft BotFrameWork with Python to Azure"
date: "2021-10-24 00:35:25"
author: nasa1515
tags: CLOUD DATA
categories: CLOUD DATA
---

  

๋จธ๋ฆฌ๋ง  

์ด๋ฒ ํฌ์คํธ๋ ์ญ์ ํ์ด์ฌ์ ์ฒจ๊ฐํ์ต๋๋ค.  
MicroSoft์์ ์ ๊ณตํ๋ BotFramework์ ์ฌ์ฉํด์ ๊ฐ๋จํ ์ง๋ต์ ํ๋ ChatBot์ ์์ฑํ ๋ค Azure Web์ ๋ฐฐํฌํ๊ณ   
Teams App์ ์ฐ๋ ํด๋ณด๊ฒ ์ต๋๋ค.  

--- 

## โ BotFrameWork 

MicroSoft์์ ์ ๊ณตํ๊ณ  ์๋ Chatbot SDK OpenSource ์๋๋ค.  
C#, JS, Python, Java ๋ฑ ์ฌ๋ฌ ์ธ์ด๋ฅผ ์ฌ์ฉํด์ SDK๋ฅผ ์ฌ์ฉ ํ  ์ ์๊ณ   
์ ์ํ ํํ๋ฆฟ์ ์ฝ๊ฒ Azure์ Service์ ์ฐ๋ ํ  ์ ์์ต๋๋ค.  


* [GITHUB](https://github.com/microsoft/botframework-sdk)  

<br/>

---

## โ 1. Bot ์์ฑ

๋ฐ๋ก Bot ์์ฑ์ ์์ ์งํ ์  ์ ํ์กฐ๊ฑด์ ๋ง์กฑํด์ผํฉ๋๋ค. 

<br/>

```cs
### ์ ํ ์กฐ๊ฑด  

- github ๊ณ์ 
- Azure ๊ณ์ 

### ์ฌ์ฉ ํ๋ ์์ํฌ

- Bot Framework
- Azure Cognitive Service API

### ๊ฐ๋ฐ ์ธ์ด

- Python

Python lib

- microsoftbotframework 
```

<br/>

---



### ๐ FrameWork Bot ์์ฑ with VSCODE


MS์์ Python์ฉ Sample์ ์ด๋ฏธ ์ ๊ณตํด์ ์์ ํด ์ฐ๋๊ฑธ๋ก!!


* [Sample link](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python)  


<br/>

์ฐ์  Resource Group์ ์์ฑํ๊ณ , Bot์ ๋ฐฐํฌ ํ  App Service๋ฅผ ์์ฑํ๊ฒ ์ต๋๋ค.

* ๋ค์๊ณผ ๊ฐ์ด CLI๋ก Resource Group์ ์์ฑํฉ๋๋ค.  

    ```cs
    ๋ช๋ น์ด : #  az group create -l koreaCentral -n pynasa
    ```

    ![2221111](https://user-images.githubusercontent.com/69498804/118922561-3f585d80-b975-11eb-9e69-4ed3010b1be1.JPG)


<br/>


์ ๋ VSCODE๋ฅผ ์ฃผ IDE๋ก ์ฌ์ฉํ๊ธฐ ๋๋ฌธ์ VSCODE๋ฅผ ๊ธฐ๋ฐ์ผ๋ก App Service๋ฅผ ์์ฑํ๊ฒ ์ต๋๋ค.  
VSCODE์์ ์๋ extension์ ์ถ๊ฐ ์ค์น๊ฐ ํ์ํฉ๋๋ค.  
์๋ ๋๊ฐ์ Extension์ ์ฐ๋ฉด Azure๋ก Web Bot์ ์์ฝ๊ฒ ๋ฐฐํฌ๊ฐ ๊ฐ๋ฅํฉ๋๋ค.  

<br/>


* Azure Account 

    ![123123](https://user-images.githubusercontent.com/69498804/118920309-28b00780-b971-11eb-8aa7-964e271d1411.JPG)

<br/>

* Azure App Service 

    ![33322](https://user-images.githubusercontent.com/69498804/118920367-49785d00-b971-11eb-8df4-cfa27e1e1965.JPG)



<br/>

Azure Account๋ก Azure ๊ณ์ ์ ๋ก๊ทธ์ธ ๋ค App Service๋ฅผ ์์ฑํฉ๋๋ค.  

* Azure Account์ ์ ์์ ์ผ๋ก ๋ฑ๋ก๋๋ฉด ์๋์ ๊ฐ์ด Azure์์ ๊ตฌ๋์ด ๋ณด์๋๋ค.  

    ![123123123](https://user-images.githubusercontent.com/69498804/118921566-5c8c2c80-b973-11eb-82a6-e4f748f03ba2.JPG)

    * ๊ตฌ๋์์ ์ฐํด๋ฆญ -> Create New Web App(Advanced) ์ ํํด ์์ฑ!  


<br/>

* ์ ๋ pynasa ๋ผ๋ ์ด๋ฆ์ผ๋ก App Service๋ฅผ ํ๋ ์์ฑํ์ต๋๋ค.  

    * Spce 

        * Resouce Group : pynasa
        * Python 3.7 
        * App Service Plan : ์ ๊ท ์์ฑ   
        * Pricing tier : S2 
        * Application Insitghts : Skip 
        * Region : Korea Central


<br/>


* ์ ์์ ์ผ๋ก ์์ฑ์ด ๋๋ฉด ๋ค์๊ณผ ๊ฐ์ด ๊ตฌ๋ ์๋ App Service๊ฐ ๋ณด์๋๋ค. 

    ![323332323232332](https://user-images.githubusercontent.com/69498804/118924058-81829e80-b977-11eb-9e52-881bb1590266.JPG)

<br/>


* ์ค์  Azure Potal ์์๋ ์์ฑ ํ์ธ์ด ๊ฐ๋ฅํฉ๋๋ค. 

    ![111111](https://user-images.githubusercontent.com/69498804/118924933-c8bd5f00-b978-11eb-980b-37de32ed61aa.JPG)



<br/>

---

### ๐ ์ด์  Bot Message๋ฅผ ์ฃผ๊ณ  ๋ฐ์ Channels์ ์์ฑํฉ๋๋ค.



<br/>

* bot Service - Bot Channels Registration
![22222](https://user-images.githubusercontent.com/69498804/117908514-7c887400-b313-11eb-94a4-dc8109c6eb67.JPG)


<br/>

* Channels ์ค์  

    ![2222222](https://user-images.githubusercontent.com/69498804/118925207-4aad8800-b979-11eb-941f-b4196d08b0cc.JPG)

    * Bot handle : nasapy
    * Resource Group : pynasa 
    * Location : KoreaCentral
    * Messaging endpoint : App Service url
        * App Service์ URL์ + api/massages ๋ฅผ ๋ฃ์ผ๋ฉด ๋ฉ๋๋ค.  
        * ex : https://test.azurewebsites.net/api/massages


    * Microsoft App ID and password : ์๋์์ฑ  

<br/>


* Channels Resource ๊ฐ ์์ฑ๋์์ผ๋ฉด Microsoft AppID๋ฅผ ํ์ธํฉ๋๋ค. 

    ![44444](https://user-images.githubusercontent.com/69498804/118925790-42098180-b97a-11eb-9733-f0df9ec5de27.JPG)

    APP ID๋ ๋์ค์ Code, App ์ฐ๋์ ํ์ํ๋ ๋ณต์ฌํด๋์ผ์ธ์!!  

<br/>

* Manage URL ํด๋ฆญ -> Client secrets์ ์ญ์  ํ ์๋ก ์์ฑ

    ![5555555](https://user-images.githubusercontent.com/69498804/118925961-8c8afe00-b97a-11eb-873f-136e3b9d6538.JPG)

    ์ฒ์ ์์ฑ๋ Value๋ ๋ณด์ด์ง๊ฐ ์์์ ์ญ์  ํ ์๋ก ์์ฑํด์ ๋ณต์ฌํด๋์์ผ ํฉ๋๋ค.  


<br/>


๋ณต์ฌํด๋์ App ID, Password ๋ฅผ App Service์ ๋ฑ๋กํด์ค๋๋ค.  

* App Service - Configuration - Appliation setting

    ![666666666666](https://user-images.githubusercontent.com/69498804/118926168-da076b00-b97a-11eb-8781-2d696fa20ce4.JPG)

    * MicrosoftAppId : ๋ด์ฑ๋์์ ๋ณต์ฌํ ID
    * MicrosoftAppPassword : ๋ด์ฑ๋์ Value ๊ฐ  
    * WEBSITE_HTTPLOGGING_RETENTION_DAYS : 7
    * WEBSITES_CONTAINER_START_TIME_LIMIT : 1400  


<br/>


* App Service์ Configuration - general setting

    ![777777](https://user-images.githubusercontent.com/69498804/118926448-500bd200-b97b-11eb-8bcf-cb82f44475fc.JPG)

    * Startup command  
    python3.7 -m aiohttp.web -H 0.0.0.0 -P 8000 app:init_func  


        * ํด๋น Stratup command๊ฐ ์์ผ๋ฉด ์ ์์ ์ผ๋ก ๋์ํ์ง ์์ต๋๋ค.  

        * ์น ์์ผ๋ ์ด์ด์ฃผ์ธ์

<br/>

---

### ๐ฑโ๐ ํ๊ฒฝ์ธํ์ ๋!

๋๋์ด ์ฝ๋๋ฅผ ๋ณผ ์ ์์ต๋๋ค.  
์ผ๋จ VSCODE๋ก ์์์ ์ํด์ ์์ Sample Code๋ฅผ Clone ํด์ต๋๋ค.  

[echo bot link](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/02.echo-bot)

* ์ ๋ Echo Bot Sample๋ก ๋ค์๊ณผ ๊ฐ์ ํ๊ฒฝ์ผ๋ก ๋ง๋ค์์ต๋๋ค 

    ![999999](https://user-images.githubusercontent.com/69498804/118927047-3323ce80-b97c-11eb-823c-dce116edb9c0.JPG)


<br/>

### ๐ ์์ค ์์ 

<br/>

* #### app.py์ Code ์๋ณธ  

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

* #### ์ฐธ๊ณ  ์ฌํญ

    app.py๋ ์ฝ๋ ๊ทธ๋๋ก Azure์ ๋ฐฐํฌํ๋ฉด ์ ์ ๋์ํ์ง ์์ต๋๋ค.    
    Python์ Flask๊ธฐ๋ฐ์ Code๋ก Azure App Service์์๋ ๋ฐ๋ก ์คํ์ด ์๋๊ณ 


    ![์บก์ฒ](https://user-images.githubusercontent.com/69498804/119086038-d7227e00-ba3f-11eb-93ee-8d106c8d60f4.JPG)   

    There was an error sending this message to your bot: HTTP status code GatewayTimeout    
    ์๋ฌ๊ฐ ๋ฐ์ํฉ๋๋ค.
    Python์ js, C# ๊ฐ์ด Templetes ํํ์ ๋ค๋ฅด๊ฒ APP ์คํ ๊ตฌ๋ฌธ ์์ ์ด ํ์ํฉ๋๋ค.  
    ์ฆ ์๋์ฒ๋ผ init_func์ ์คํ ๊ตฌ๋ฌธ์ APP ๋ณ์์ ๋ฃ์ด์ค ๋ค ์คํํด์ผ ํฉ๋๋ค.    


<br/>


* ๋ค์๊ณผ ๊ฐ์ ์์ผ๋ก ๋งจ ์๋์ ์ฝ๋๋ฅผ ์์ ํฉ๋๋ค.  

    ```python
    def init_func(argv):             << -- ํด๋น ๋ถ๋ถ ํจ์ ์ฒ๋ฆฌ
        APP = web.Application(middlewares=[aiohttp_error_middleware])
        APP.router.add_post("/api/messages", messages)
        return APP
        
    if __name__ == "__main__":
        APP = init_func(None)             << --- ํด๋น ๋ถ๋ถ ์ถ๊ฐ
        try:
            web.run_app(APP, host="localhost", port=CONFIG.PORT)
        except Exception as error:
            raise error
    ```

<br/>

---

### ๐ onfig.py๋ฅผ ์์ 


<br/>

* config.py ์๋ณธ code 

    ```python
    import os

    """ Bot Configuration """


    class DefaultConfig:
        """ Bot Configuration """

        PORT = 3978
        APP_ID = os.environ.get("MicrosoftAppId", "")
        APP_PASSWORD = os.environ.get("MicrosoftAppPassword", "")
    ```
    * Port , App_ID, APP_Password ๊ฐ ๋ค์ ๋ชจ๋ ์์ ํด์ค๋๋ค.  
    * Port : 8080 
    * APP_ID : ์๊น Channel์ ๋ฃ์ ID ๊ฐ
    * APP_PASSWORD : Value ๊ฐ  

<br/>

---

### ๐ bot.py ์์ 


* bot.py ์๋ณธ Code 

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
    ํด๋น ์ฝ๋๋ Open Message์ ์ฌ์ฉ์์ Massage๋ฅผ Return ํ๋ ๊ตฌ๋ฌธ์๋๋ค.  


<br/>

* ์ฌ๊ธฐ์ ์ ์๋์์ด ๊ฐ๋ฅํ๊ฒ Open Message ๋ถ๋ถ๋ง ๋ฐ๊พธ๊ฒ ์ต๋๋ค.  


    ```python
    for member_added in members_added:
    if member_added.id != turn_context.activity.recipient.id:
        await turn_context.send_activity("Hello I'm NaSa!")
    ```

<br/>

---

## ๐ค Bot ๋ฐฐํฌ

์ด์  ๋ชจ๋  ์์ ์ฌํญ๋ค์ ๋ค ๋ฐ์์ด ๋์๊ธฐ ๋๋ฌธ์ Azure Web Service์ Code ๋ฐฐํฌ ํ ๊ฒฐ๊ณผ๋ฅผ ํ์ธํด๋ณด์ฃ 

Azure Web Service๋ก Python Code Bot์ ๋ฐฐํฌํ๋ ๋ฐฉ๋ฒ์ ๋งค์ฐ ๋ค์ํฉ๋๋ค.  
Azure Cli๋ฅผ ์ด์ฉ ํ  ์๋ ์๊ณ ...๊ทธ๋ฌ๋ js, C#์ฒ๋ผ ์์ฒด Templetes์ผ๋ก ์์ฑํ๋ UI๋ฅผ ์ ๊ณตํ์ง ์์์  
CLI๋ฅผ ์ฌ์ฉํ๊ธฐ์๋ ์ฌ๋ฌ๊ฐ์ง ๋ถํธํ์ ๋ค์ด ๋ง์ต๋๋ค...  
๊ทธ๋์ ์ ๋ Cli๋ณด๋ค๋ VSCODE์ ๋ฐฐํฌ ๊ธฐ๋ฅ์ ์ฌ์ฉํ์ต๋๋ค..

* [cli ๋ฐฉ๋ฒ์ด ๊ถ๊ธํ์๋ฉด ๋งํฌ](https://docs.microsoft.com/ko-kr/azure/bot-service/bot-builder-tutorial-deploy-basic-bot?view=azure-bot-service-4.0&tabs=python)

<br/>


์ ๋ VSCODE๋ก ๋ฐฐํฌ ํฉ๋๋ค!  




* VSCODE Bot DeployMent  

    ![์บก์ฒ2](https://user-images.githubusercontent.com/69498804/119091073-7bf48980-ba47-11eb-881e-92c3ad1ce58b.JPG)

    * Extension์ App Service ์ฐํด๋ฆญ - Deploy to Web App...  

<br/>

* ๋ฐฐํฌ ์ค์๋ ๋ค์๊ณผ ๊ฐ์ด App Service์ ํฑ๋๋ฐํด๊ฐ ๋์๊ฐ๋๋ค. 

    ![32332121](https://user-images.githubusercontent.com/69498804/119091815-91b67e80-ba48-11eb-978b-7df6a3a47c05.JPG)

<br/>

* ์ถ๊ฐ๋ก ๋ฐฐํฌ Output log๋ ํ์ธ ํ  ์ ์๊ตฌ์  

    ![5455454](https://user-images.githubusercontent.com/69498804/119091874-aabf2f80-ba48-11eb-9324-61d1c89190a6.JPG)

<br/>

* 1~2๋ถ๋ง์ ๋ฐฐํฌ๊ฐ ์๋ฃ๋๊ณ  ์ฑ๊ณต ๋ก๊ทธ๋ฅผ ๋ฟ์ต๋๋ค!!

    ![566565656565656565](https://user-images.githubusercontent.com/69498804/119092649-a5aeb000-ba49-11eb-9928-628c6b457423.JPG)

<br/>

* ๊ทธ๋ผ App Service์ Diagnose and solve problems์์ APP log๋ฅผ ํ์ธํด๋ณด๋ฉด

    ![32323323](https://user-images.githubusercontent.com/69498804/119095126-da703680-ba4c-11eb-9f82-1a4da549e36c.JPG)

    * ๋ค์๊ณผ ๊ฐ์ด Web Code๊ฐ ์ ๋๋ก ๋ฐฐํฌ๋์ Success Code๋ฅผ ์ถ๋ ฅํ์ต๋๋ค!!  


<br/>

* ์์ฑํด์ ์ฐ๊ฒฐํ๋ Bot Channels์ ํ์ธํด๋ณด๋ฉด ๋ค์๊ณผ ๊ฐ์ด Running ์ํ๋ฅผ ํ์ธํฉ๋๋ค.  

    ![์บก์ฒ44444](https://user-images.githubusercontent.com/69498804/119095372-28853a00-ba4d-11eb-92cd-d67bbf7cee85.JPG)


<br/>

* Web Chat Test ๋ฉ๋ด์์ ๊ธฐ๋ฅ์ ๋ํ ํ์คํธ๋ฅผ ์งํํด๋ด์๋ค  

    ![434343434343](https://user-images.githubusercontent.com/69498804/119095514-55d1e800-ba4d-11eb-83cb-74d9108ad7c1.JPG)

    * Bot.py์์ ์์ ํ๋ Open Message์ ์ ๊ฐ ์ ์ Return ๊ฐ์ด ์ ํํ ๋ฐํ๋๋ค์!!  


<br/>


---

## ๐คฃ Teams์ Bot ์ฐ๊ฒฐ

๊ทธ๋ผ ๊ฐ๋จํ๊ฒ ๋ง๋ค์ด์ ๋ฐฐํฌํด๋ณธ ๋ด์ MS์ Messaging App์ธ Teams์ ์ฐ๋ํด์ ์ฌ์ฉํด๋ณด์ฃ   


* Bot Channel์ Teams Icon ์ ํ 

    ![3333333](https://user-images.githubusercontent.com/69498804/119100242-b44d9500-ba52-11eb-8c7e-946b914dcd11.JPG)

<br/>

* ๊ทธ๋ผ ๋ค์๊ณผ ๊ฐ์ด Access ์ฌ๋ถ๋ฅผ ๋ฌป๋๋ฐ Save๋ฅผ ์ ํํฉ๋๋ค.  

    ![444444](https://user-images.githubusercontent.com/69498804/119100295-c29bb100-ba52-11eb-81da-2537c0ea3a30.JPG)

<br/>

* ๊ทธ ์ดํ Get Bot Embed Codes ์ ํ ํ url์ ๋ณต์ฌํ๊ณ  ์ ์ํฉ๋๋ค.

    ![54545454545](https://user-images.githubusercontent.com/69498804/119100469-f1198c00-ba52-11eb-8ebe-68c02cd52b25.JPG)

    * ํด๋น ์ฝ๋์์ ์ฒซ๋ฒ์งธ ์ค์ Teams ์ ์ url๋ง ๋ณต์ฌ ํ ์นํ์ด์ง ์ ์ ํ๋ฉด ๋ฉ๋๋ค.  

<br/>


* ํด๋น ์นํ์ด์ง์ ์ ์ํ๋ฉด ๋ค์๊ณผ ๊ฐ์ด ์ธ์ฆ ํญ์ด ๋ฐ์ํฉ๋๋ค. - ์ด๊ธฐ๋ก ์ด์ด์ฃผ์ธ์

    ![์บก์ฒ](https://user-images.githubusercontent.com/69498804/119100817-4d7cab80-ba53-11eb-95e7-d3389e4cd795.JPG)

<br/>

* ๊ทธ๋ผ ์๋์ผ๋ก Teams <-> Bot์ด ์ฐ๋๋๋ฉด์ ์๋์ ๊ฐ์ด ๋ฉ์ธ์ง๋ฅผ ์์  ๊ฐ๋ฅํฉ๋๋ค. 

    ![2](https://user-images.githubusercontent.com/69498804/119101122-9df40900-ba53-11eb-8f08-13ef8389e16f.JPG)


<br/>
<br/>
<br/>

์์ค๊ฐ ๊ถ๊ธํ์  ๋ถ๋ค์ ์๋ ์  GITHUB Source๋ฅผ ํ์ธํด์ฃผ์ธ์  

<br/>

* [NASA GITHUB](https://github.com/nasa1515/Azure-Chatbot)


---

## ๋ง์น๋ฉฐโฆ  

  
ํฌ์คํธ๋ ๊ทธ๋ ๊ฒ ๊ธธ๊ฒ ๋์ค์ง ์์์ง๋ง GateWay ์ด์๋ฅผ ํด๊ฒฐํ๋๋ฐ ์ฝ 2~3์ผ ์ ๋ ๊ฑธ๋ ธ์ต๋๋ค.   
Azure์์ ๊ธฐ๋ณธ์ ๊ณตํด์ฃผ๋ Code์ ๋ฌธ์ ๊ฐ ์์ ๊ฑฐ๋ผ๊ณ  ์๊ฐํ์ง ์์๊ธฐ ๋๋ฌธ์ด์ฃ ...  
์ด๋ฒ ํฌ์คํธ์์๋ ๊ฐ๋จํ๊ฒ Echo Bot์ ๊ธฐ๋ฅ๋ง ํ์คํธ ์งํํ์ฌ ๋ฆฌ๋ทฐ ํ์ง๋ง  
๋ค์ ํฌ์คํธ์์๋ LUIS, Q&A๋ฅผ ์ฌ์ฉํด์ ํน์  ์ง๋ฌธ์ ๋ํ ๋ต์ DB์์ ๊ฐ์ ธ์ค๊ฒ ํด๋ณด๊ฒ ์ต๋๋ค.    


---

```toc
```