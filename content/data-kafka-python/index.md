---
emoji: ๐คฆโโ๏ธ
title: "[DATA] - Kafka:Confluent to Cloud With Python"
date: "2022-05-11 00:39:25"
author: nasa1515
tags: DATA CLOUD
categories: DATA CLOUD
---


## ๐ About This Post

์ด๋ฒ ํฌ์คํธ์์๋ Python์ ์ฌ์ฉํ์ฌ ๊ฐ๋จํ๊ฒ ๋ฌธ์์ด์ ๋ง๋๋ Producer๋ฅผ ์์ฑํ ๋ค์  
Kafka-Connector๋ฅผ ์ด์ฉํด์ ๊ฐ Cloud์ Steraming Tools ๋ค์ Endpoint(Broker)๋ก Message๋ฅผ ์์๋ณด๊ฒ ์ต๋๋ค.  


--- 

## โ Kafka Producer Application 

Kafka๋ ๊ธฐ๋ณธ์ ์ผ๋ก Clinet API๋ฅผ ๊ฐ์ง๊ณ  ์์ต๋๋ค,  
๋๋ฌธ์ ์ด๋ฅผ ์ฌ์ฉํด์ Producer, Consumer์ Application ๊ฐ๋ฐ์ด ๊ฐ๋ฅํฉ๋๋ค.  
third party Clinet๋ฅผ ์ฌ์ฉ ํ  ์ ์๋๋ฐ java, python, go ๋ฑ์ด ์์ต๋๋ค.  
๊ฐ์ฅ ๋ํ์ ์ผ๋ก ์ฌ์ฉํ๋ python-kafka Clinet๊ฐ ์์ง๋ง ์ด๋ฒ์๋ ์๋ก์ด ์ค์ต ๊ฒธ  
์์ฆ ์๋กญ๊ฒ ๋ ์ค๋ฅด๊ณ  ์๋ python-confluent-kafka๋ฅผ ์ฌ์ฉํด๋ณด๋๋ก ํ๊ฒ ์ต๋๋ค.  

<br/>

* Install Confluent-kafka (Conda ํ๊ฒฝ์์ ์งํํ์์ต๋๋ค.)


  ```js
  $ conda install -c conda-forge python-confluent-kafka
  ```

<br/>


---

## ๐ Azure EventHub Connection

์ฐ์  ์ฒซ๋ฒ์งธ ์์๋ก๋ ๊ฐ์ฅ Kafka Connector์ ๋ํ ํธํ์ด ์ ์ด์๋๊ณ  ์๋ Azure EventHub ๋ถํฐ ์งํํ๋๋ก ํ๊ฒ ์ต๋๋ค.  
Azure๋ ์์ฒญ ๊ฐ๋จํ๊ฒ Producer๋ฅผ ๋ง๋ค ๋ Config์ bootstrap ์ชฝ์ ์ค์ ๋ง EventHub์ Endpoint ์ชฝ์ผ๋ก๋ง ์ค์ ํด์ฃผ๋ฉด ๋ฉ๋๋ค. [์ฐธ๊ณ  Github](https://github.com/Azure/azure-event-hubs-for-kafka/tree/master/quickstart/python)


<br/>

* Create Azure EventHub Name SPACE & Endpoint 

  [๊ณต์๋ฌธ์](https://docs.microsoft.com/ko-kr/azure/event-hubs/event-hubs-create)


  <br/>

* ์์ ๊ณต์๋ฌธ์ ์์๋๋ก NameSpace๋ฅผ ์ ์์ ์ผ๋ก ์์ฑํ๋ค๋ฉด, FQDN Endpoint๋ฅผ ์์ฑํฉ๋๋ค.  

  ![image](https://user-images.githubusercontent.com/69498804/167967135-ca1c2c53-68ad-435f-9179-a7b423af0c82.png)
  [Event Hub Namespace] - [๊ณต์  ์์ธ์ค ์ ์ฑ] - [์ถ๊ฐ]

<br/>

* ์ดํ์ ์์ฑ๋ SAS Key์ ์ฐ๊ฒฐ ๋ฌธ์์ด์ ํ์ธ ๋ฐ ๋ณต์ฌํด๋๋ฉด ๋ฉ๋๋ค.  

  ![image](https://user-images.githubusercontent.com/69498804/167967340-1614f477-1bee-4a9f-86ae-ecf7f9e1a4b8.png)
  [Kafka Connector์์ ์ฐ๊ฒฐ๋  ๋ saal Passwoed Endpoint๋ก ์ฌ์ฉ ๋ฉ๋๋ค.]

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
          'bootstrap.servers': '<EventHub Namespace Name>.servicebus.windows.net:9093', # ์ฌ๊ธฐ์ ์์ฑํ EventHub์ NameSpace์ผ๋ก ๋ณํํ์๋ฉด ๋ฉ๋๋ค.
          'security.protocol': 'SASL_SSL',
          'sasl.mechanism': 'PLAIN',
          'sasl.username': '$ConnectionString',
          'sasl.password': '<SAS Connection Endpoint URL>', # ์ฌ๊ธฐ์ ๋ฐ๋ก ์์์ ๋ฐ๊ธ๋ฐ์ SAS EndPoint๋ฅผ ์๋ ฅํฉ๋๋ค.
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
      for i in range(0, 1000):   # ์ ๋ Range๋ก 0~1000 ๊น์ง์ ์ซ์๋ก ๋ฌธ์์ด์ ์์ฑํด์ ๊ฒ์ ํ์ต๋๋ค.
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

  ์ Python Script์ ์๋ ๋ฐฉ๋ฒ์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.

  ```js
  $ python3 producer.py <Topic Name>
  ...
  ...
  python3 /home/nasa1515/docker/producer/Azure/producer.py nasatopic -> ์์ฑ ํ  Topic Name
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
  [์ ๊ทธ๋ฆผ๊ณผ ๊ฐ์ด ๋ช์ํ Topic Name์ผ๋ก ์๋ ์์ฑ๋ฉ๋๋ค.]

<br/>


* EventHub Traffic Log Check

  ![image](https://user-images.githubusercontent.com/69498804/167968491-e7a417c0-aa18-4095-838b-a8d24b315b48.png)
  [Source Code ๋์ ์์ ๋ถํฐ EventHub์ Traffic์ด ๋ฐ์ํ๊ณ , Message๋ ์ ํํ 1K๊ฐ ์์ฌ์์ต๋๋ค.]


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
          'bootstrap.servers': '<Your NameSpace Name>.servicebus.windows.net:9093', # NameSpace Name ์๋ ฅํด์ค๋๋ค.
          'security.protocol': 'SASL_SSL',
          'sasl.mechanism': 'PLAIN',
          'sasl.username': '$ConnectionString',
          'sasl.password': '<SAS Token Endpoint URL>', # Endpoint Url ์๋ ฅ
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

  ์ Python Script์ ์๋ ๋ฐฉ๋ฒ์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.

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
  [Consumer Source Code ๋์ ์์ ๋ถํฐ EventHub์ OutBound Traffic์ด ๋ฐ์ํ๊ณ , Oout Message๋ ์ ํํ 1K๊ฐ ์์ฌ์์ต๋๋ค.]

<br/>


---

## ๐ GCP Pub/Sub Connection



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

## ๋ง์น๋ฉฐโฆ  

์ฌ์ค ์ด๋ฒ ํฌ์คํธ์์ ๊ตฌ์ถํ Kafka Broker Cluster์ ๋ชฉ์ ์  
Public Cloud ๋ณ๋ก ์กด์ฌํ๋ Streaming Tools์ ํ์ธํด๋ณด๊ธฐ ์ํจ์๋๋ค.  
์๊ฐ๋ณด๋ค ๊ตฌ์ถ ํฌ์คํธ๊ฐ ๊ธธ์ด์ ธ์ ๋ถ๋์ดํ๊ฒ ํฌ์คํธ๋ฅผ ์ฌ๋ฌ๊ฐ๋ก ๋๋ ์ผ ํ  ๊ฒ ๊ฐ์ต๋๋ค.  
๋ค์ ํฌ์คํธ์์๋ Ptyhon์ ์ฌ์ฉํด Kafka Producer Application์ ์์ฑํ๊ณ   
Event Message๋ฅผ Cloud๋ก ๋ณด๋ด๋ ๋ฐฉ๋ฒ์ ๋ํด์ ์ ๋ฆฌํ๊ฒ ์ต๋๋ค.  

---

```toc
```