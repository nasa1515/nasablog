---
emoji: 🤦‍♂️
title: "[DATA] - Kafka:Confluent to Cloud With Python"
date: "2022-05-11 00:39:25"
author: nasa1515
tags: DATA CLOUD
categories: DATA CLOUD
---


## 😎 About This Post

이번 포스트에서는 Python을 사용하여 간단하게 문자열을 만드는 Producer를 생성한 뒤에  
Kafka-Connector를 이용해서 각 Cloud의 Steraming Tools 들을 Endpoint(Broker)로 Message를 쌓아보겠습니다.  


--- 

## ✔ Kafka Producer Application 

Kafka는 기본적으로 Clinet API를 가지고 있습니다,  
때문에 이를 사용해서 Producer, Consumer의 Application 개발이 가능합니다.  
third party Clinet를 사용 할 수 있는데 java, python, go 등이 있습니다.  
가장 대표적으로 사용하는 python-kafka Clinet가 있지만 이번에는 새로운 실습 겸  
요즘 새롭게 떠오르고 있는 python-confluent-kafka를 사용해보도록 하겠습니다.  

<br/>

* Install Confluent-kafka (Conda 환경에서 진행하였습니다.)


  ```js
  $ conda install -c conda-forge python-confluent-kafka
  ```

<br/>


---

## 😍 Azure EventHub Connection

우선 첫번째 순서로는 가장 Kafka Connector에 대한 호환이 잘 운영되고 있는 Azure EventHub 부터 진행하도록 하겠습니다.  
Azure는 엄청 간단하게 Producer를 만들 때 Config에 bootstrap 쪽의 설정만 EventHub의 Endpoint 쪽으로만 설정해주면 됩니다. [참고 Github](https://github.com/Azure/azure-event-hubs-for-kafka/tree/master/quickstart/python)


<br/>

* Create Azure EventHub Name SPACE & Endpoint 

  [공식문서](https://docs.microsoft.com/ko-kr/azure/event-hubs/event-hubs-create)


  <br/>

* 위의 공식문서 순서대로 NameSpace를 정상적으로 생성했다면, FQDN Endpoint를 생성합니다.  

  ![image](https://user-images.githubusercontent.com/69498804/167967135-ca1c2c53-68ad-435f-9179-a7b423af0c82.png)
  [Event Hub Namespace] - [공유 엑세스 정책] - [추가]

<br/>

* 이후에 생성된 SAS Key의 연결 문자열을 확인 및 복사해두면 됩니다.  

  ![image](https://user-images.githubusercontent.com/69498804/167967340-1614f477-1bee-4a9f-86ae-ecf7f9e1a4b8.png)
  [Kafka Connector에서 연결될 때 saal Passwoed Endpoint로 사용 됩니다.]

<br/>

---

### Producer Application Code Test

* Used Producer Source CODE [Message Publish]

    ```js
    from confluent_kafka import Producer
    import sys

    if __name__ == '__main__':
      if len(sys.argv) != 2:
          sys.stderr.write('Usage: %s <topic>\n' % sys.argv[0])
          sys.exit(1)
      topic = sys.argv[1]
      conf = {
          'bootstrap.servers': '<EventHub Namespace Name>.servicebus.windows.net:9093', # 여기에 생성한 EventHub의 NameSpace으로 변환하시면 됩니다.
          'security.protocol': 'SASL_SSL',
          'sasl.mechanism': 'PLAIN',
          'sasl.username': '$ConnectionString',
          'sasl.password': '<SAS Connection Endpoint URL>', # 여기에 바로 위에서 발급받은 SAS EndPoint를 입력합니다.
          'client.id': 'nasa1515-producer'
      }
      # Create Producer instance
      p = Producer(**conf)


      # fail check def
      def delivery_callback(err, msg):
          if err:
              sys.stderr.write('%% Message failed delivery: %s\n' % err)
          else:
              sys.stderr.write('%% Message delivered to %s [%d] @ %o\n' % (msg.topic(), msg.partition(), msg.offset()))

      # Write 1-100 to topic
      for i in range(0, 1000):   # 저는 Range로 0~1000 까지의 숫자로 문자열을 생성해서 게시 했습니다.
          try:
              p.produce(topic, 'Kafka_data_nasa1515-' + str(i), callback=delivery_callback)
          except BufferError as e:
              sys.stderr.write('%% Local producer queue is full (%d messages awaiting delivery): try again\n' % len(p))
          p.poll(0)

      # Wait until all messages have been delivered
      sys.stderr.write('%% Waiting for %d deliveries\n' % len(p))
      p.flush()
      ```

<br/>

* Message Publish Code Test

  위 Python Script의 작동 방법은 다음과 같습니다.

  ```js
  $ python3 producer.py <Topic Name>
  ...
  ...
  python3 /home/nasa1515/docker/producer/Azure/producer.py nasatopic -> 생성 할 Topic Name
  ```

<br/>

* Code Result [Success]

  ```js 
  (kafka) nasa1515@L-wslee:~$ python3 /home/nasa1515/docker/producer/Azure/producer.py nasatopic
  % Waiting for 1000 deliveries
  % Message delivered to nasatopic [0] @ 0
  % Message delivered to nasatopic [0] @ 1
  % Message delivered to nasatopic [0] @ 2
  % Message delivered to nasatopic [0] @ 3
  % Message delivered to nasatopic [0] @ 4
  % Message delivered to nasatopic [0] @ 5
  % Message delivered to nasatopic [0] @ 6
  % Message delivered to nasatopic [0] @ 7
  % Message delivered to nasatopic [0] @ 10
  % Message delivered to nasatopic [0] @ 11
  % Message delivered to nasatopic [0] @ 12
  % Message delivered to nasatopic [0] @ 13
  % Message delivered to nasatopic [0] @ 14
  % Message delivered to nasatopic [0] @ 15
  % Message delivered to nasatopic [0] @ 16
  % Message delivered to nasatopic [0] @ 17
  % Message delivered to nasatopic [0] @ 20
  ....
  ```

<br/>

* EventHub Topic[Enterty] Check

  ![image](https://user-images.githubusercontent.com/69498804/167968241-150c6c2c-c781-4742-9185-d2f8b399dd29.png)
  [위 그림과 같이 명시한 Topic Name으로 자동 생성됩니다.]

<br/>


* EventHub Traffic Log Check

  ![image](https://user-images.githubusercontent.com/69498804/167968491-e7a417c0-aa18-4095-838b-a8d24b315b48.png)
  [Source Code 동작 시점부터 EventHub에 Traffic이 발생하고, Message도 정확히 1K가 쌓여있습니다.]


<br/>

---

### Consumer Application CODE Test

<br/>

* Used Consumer Source CODE [Message Consume]

  ```js
  from confluent_kafka import Consumer, KafkaException, KafkaError
  import sys
  import getopt
  import json
  import logging
  import pandas as pandas
  from pprint import pformat


  def stats_cb(stats_json_str):
      stats_json = json.loads(stats_json_str)
      print('\nKAFKA Stats: {}\n'.format(pformat(stats_json)))


  def print_usage_and_exit(program_name):
      sys.stderr.write('Usage: %s [options..] <consumer-group> <topic1> <topic2> ..\n' % program_name)
      options = '''
   Options:
    -T <intvl>   Enable client statistics at specified interval (ms)
  '''
      sys.stderr.write(options)
      sys.exit(1)


  if __name__ == '__main__':
      optlist, argv = getopt.getopt(sys.argv[1:], 'T:')
      if len(argv) < 2:
          print_usage_and_exit(sys.argv[0])

      group = argv[0]
      topics = argv[1:]
      conf = {
          'bootstrap.servers': '<Your NameSpace Name>.servicebus.windows.net:9093', # NameSpace Name 입력해줍니다.
          'security.protocol': 'SASL_SSL',
          'sasl.mechanism': 'PLAIN',
          'sasl.username': '$ConnectionString',
          'sasl.password': '<SAS Token Endpoint URL>', # Endpoint Url 입력
          'group.id': group,
          'client.id': '<Cumstom>',
          'request.timeout.ms': 60000,
          'session.timeout.ms': 60000,
          'default.topic.config': {'auto.offset.reset': 'smallest'}
      }

      # Check to see if -T option exists
      for opt in optlist:
          if opt[0] != '-T':
              continue
          try:
              intval = int(opt[1])
          except ValueError:
              sys.stderr.write("Invalid option value for -T: %s\n" % opt[1])
              sys.exit(1)

          if intval <= 0:
              sys.stderr.write("-T option value needs to be larger than zero: %s\n" % opt[1])
              sys.exit(1)

          conf['stats_cb'] = stats_cb
          conf['statistics.interval.ms'] = int(opt[1])

      # Create logger for consumer (logs will be emitted when poll() is called)
      logger = logging.getLogger('consumer')
      logger.setLevel(logging.DEBUG)
      handler = logging.StreamHandler()
      handler.setFormatter(logging.Formatter('%(asctime)-15s %(levelname)-8s %(message)s'))
      logger.addHandler(handler)

      # Create Consumer instance
      # Hint: try debug='fetch' to generate some log messages
      c = Consumer(conf, logger=logger)

      def print_assignment(consumer, partitions):
          print('Assignment:', partitions)

      # Subscribe to topics
      c.subscribe(topics, on_assign=print_assignment)

      # Read messages from Kafka, print to stdout
      try:
          while True:
              msg = c.poll(timeout=100.0)
              if msg is None:
                  continue
              if msg.error():
                  # Error or event
                  if msg.error().code() == KafkaError._PARTITION_EOF:
                      # End of partition event
                      sys.stderr.write('%% %s [%d] reached end at offset %d\n' %
                                       (msg.topic(), msg.partition(), msg.offset()))
                  else:
                      # Error
                      raise KafkaException(msg.error())
              else:
                  # Proper message
                  print(msg.value())

      except KeyboardInterrupt:
          sys.stderr.write('%% Aborted by user\n')

      finally:
          # Close down consumer to commit final offsets.
          c.close()
  ```


<br/>

* Message Consumer Code Test

  위 Python Script의 작동 방법은 다음과 같습니다.

  ```js
  $ python3 producer.py <Comsumer_GROUP_ID> <TOPIC_NAME_1> <TOPIC_NAME_2> ...
  ...
  ...
  python3 /home/nasa1515/docker/producer/Azure/Consum.py $Default nasatopic nasatopic
  ```


<br/>


* Code Result [Success]

  ```js 
  2022-05-12 10:11:59,390 WARNING  CONFWARN [nasa1515-consumer#consumer-1] [thrd:app]: Configuration property request.timeout.ms is a producer property and will be ignored by this consumer instance
  Assignment: [TopicPartition{topic=nasatopic,partition=0,offset=-1001,error=None}]
  b'Kafka_data_nasa1515-0'
  b'Kafka_data_nasa1515-1'
  b'Kafka_data_nasa1515-2'
  b'Kafka_data_nasa1515-3'
  b'Kafka_data_nasa1515-4'
  b'Kafka_data_nasa1515-5'
  b'Kafka_data_nasa1515-6'
  b'Kafka_data_nasa1515-7'
  b'Kafka_data_nasa1515-8'
  b'Kafka_data_nasa1515-9'
  b'Kafka_data_nasa1515-10'
  b'Kafka_data_nasa1515-11'
  b'Kafka_data_nasa1515-12'
  ...
  ...
  ```

<br/>

* EventHub Outbound Traffic Check

  ![image](https://user-images.githubusercontent.com/69498804/167972747-18419a68-3a28-42c5-a737-5f52e447a97d.png)
  [Consumer Source Code 동작 시점부터 EventHub에 OutBound Traffic이 발생하고, Oout Message도 정확히 1K가 쌓여있습니다.]

<br/>


---

## 😁 GCP Pub/Sub Connection



### Producer Application Code Test

* Used Producer Source CODE [Message Publish]

  ```js
  import json
  from google.auth import jwt
  from concurrent import futures
  from google.cloud import pubsub_v1

  service_account_info = json.load(open("/home/nasa1515/docker/producer/GCP/data-cloocus-ffd800735dd1.json"))
  credentials_pub = "https://pubsub.googleapis.com/google.pubsub.v1.Publisher"

  credentials = jwt.Credentials.from_service_account_info(
      service_account_info, audience=credentials_pub
  )

  publisher = pubsub_v1.PublisherClient(credentials=credentials)


  project_id = "data-cloocus"
  topic_id = "pubsub_nasa1515"

  topic_path = publisher.topic_path(project_id, topic_id)

  for n in range(1, 100):
      data_str = f"nasa1515_Pubsub_Massage : {n}"
      data = data_str.encode("utf-8")
      future = publisher.publish(topic_path, data)
      print(future.result())

  print(f"Published messages to {topic_path}.")
  ```


<br/>



### Consumer Application CODE Test

<br/>

* Used Consumer Source CODE [Message Consume]

  ```js
  import os
  import json
  from google.auth import jwt
  from google.cloud import pubsub_v1


  service_account_info = json.load(open("/home/nasa1515/docker/producer/GCP/data-cloocus-ffd800735dd1.json"))
  credentials_sub = "https://pubsub.googleapis.com/google.pubsub.v1.Subscriber"

  credentials = jwt.Credentials.from_service_account_info(
      service_account_info, audience=credentials_sub
  )

  subscriber = pubsub_v1.SubscriberClient(credentials=credentials)


  project_id = "data-cloocus"
  topic_id = "pubsub_nasa1515"
  subscription = "pubsub_nasa1515-sub"
  topic_name = f'projects/{project_id}/topics/{topic_id}'
  subscription_name = f'projects/{project_id}/subscriptions/{subscription}'


  def callback(message):
      print(message.data)
      message.ack()


  with pubsub_v1.SubscriberClient() as subscriber:
      try:
          response = subscriber.get_subscription(subscription=subscription_name)
          print(response)
      except:
          subscriber.create_subscription(
          name=subscription_name, topic=topic_name)
          future = subscriber.subscribe(subscription_name, callback)
      else:
          future = subscriber.subscribe(subscription_name, callback)
          try:
              future.result()
          except KeyboardInterrupt:
              future.cancel()
  ```
  
---

## 마치며…  

사실 이번 포스트에서 구축한 Kafka Broker Cluster의 목적은  
Public Cloud 별로 존재하는 Streaming Tools을 확인해보기 위함입니다.  
생각보다 구축 포스트가 길어져서 부득이하게 포스트를 여러개로 나눠야 할 것 같습니다.  
다음 포스트에서는 Ptyhon을 사용해 Kafka Producer Application을 생성하고  
Event Message를 Cloud로 보내는 방법에 대해서 정리하겠습니다.  

---

```toc
```