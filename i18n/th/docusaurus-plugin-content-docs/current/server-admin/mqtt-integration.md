#  ERDDAP การแบ่งประเภท MQT

 ERDDAP ตอนนี้รวมการรองรับโพรโทคอล MQTT เพื่อความสะดวกในการรับข้อมูลและแจ้งเตือน ระบบนี้ถูกใช้งานโดยโอเพนซอร์ส [ **โปรแกรมลูกข่าย MQTTName** ](https://github.com/hivemq/hivemq-mqtt-client) ถึง [ **รายการ HiveMQ ของชุมชน** ](https://github.com/hivemq/hivemq-community-edition) ห้องสมุดโบรกเกอร์

 ERDDAP สามารถต่อรอง MQTT ได้สองแบบหลักๆ

1.   **เป็นไคลเอนต์ MQTT:**    ERDDAP สามารถสมัครรับหัวข้อบนโบรกเกอร์ MQTT ที่มีอยู่แล้ว เพื่อรับข้อมูล และสร้างชุดข้อมูลตามเวลาจริง
    
2.   **ในฐานะตัวแบ่ง MQTT:**    ERDDAP สามารถเป็นเจ้าภาพโบรกเกอร์ MQTT ที่ฝังตัวได้ อนุญาตให้ลูกค้าภายนอก เผยแพร่ข้อมูลโดยตรงไปยังมัน
    

--------

##  ERDDAP ในฐานะไคลเอนต์ MQTT

 ERDDAP สามารถทําหน้าที่เป็นไคลเอนต์ MQTT เพื่อสมัครรับหัวข้อจากภายนอก หรือโบรกเกอร์ MQTT ของตัวมันเอง นี้ประสบความสําเร็จโดยใช้ใหม่ `DDTable from Mqt` ชนิดของชุดข้อมูล ซึ่งทําหน้าที่คล้ายกันกับที่มีอยู่ [ `เพิ่มข้อมูล` ](/docs/server-admin/datasets#eddtablefromhttpget) ชุดข้อมูล

ปัจจุบัน การจัดการของไคลเอนต์รองรับเท่านั้น **การแบ่งกลุ่มย่อย** เรื่องของเรื่อง

## การปรับแต่ง: `DDTable from Mqt` 

เพื่อปรับแต่งชุดข้อมูลที่จะใช้ร่วมกับโบรกเกอร์ MQTT ให้กําหนดชุดข้อมูลประเภท `DDTable from Mqt` ในของคุณ ` datasets.xml ` แฟ้ม ป้ายกํากับการปรับแต่งต่อไปนี้จะมีอยู่ภายใน ` <dataset> ` บล็อก:

```
<!-- Example configuration for an EDDTableFromMqtt dataset in datasets.xml -->
<dataset type="EDDTableFromMqtt" datasetID="mqtt_realtime_data" active="true">

    <!-- The hostname or IP address of the MQTT broker. -->
    <serverHost>broker.example.com</serverHost>

    <!-- The port number of the MQTT broker. -->
    <serverPort>1883</serverPort>

    <!-- A unique identifier for this MQTT client. -->
    <clientId>erddap-subscriber-1</clientId>

    <!-- The username for broker authentication (optional). -->
    <username>user</username>

    <!-- The password for broker authentication (optional). -->
    <password>secret</password>

    <!-- A comma-separated list of MQTT topics to subscribe to. -->
    <topics>sensor/+/data, another/topic</topics>

    <!-- Set to 'true' to use a secure SSL/TLS connection. Default is 'false'. -->
    <useSsl>false</useSsl>

    <!-- The session expiry interval in seconds. -->
    <sessionExpiryInterval>3600</sessionExpiryInterval>

    <!-- The connection timeout in seconds. -->
    <connectionTimeout>10</connectionTimeout>

    <!-- Set to 'true' to enable automatic reconnection. Default is 'true'. -->
    <automaticReconnect>true</automaticReconnect>

</dataset>
```

--------

##  ERDDAP เป็นโบรกเกอร์ MQT

 ERDDAP สามารถเรียกใช้โบรกเกอร์ MQTT ที่ฝังแนบมาด้วย ซึ่งทําหน้าที่สองวัตถุประสงค์หลัก:

1.   **การกระตุ้นข้อมูล:** เพื่อรับข้อมูลที่เผยแพร่โดยไคลเอนต์ MQTT สําหรับการสร้างชุดข้อมูลแบบเรียลไทม์
    
2.   **การแจ้งให้ทราบ:** เพื่อเผยแพร่การแจ้งเตือนเกี่ยวกับการเปลี่ยนแปลงของข้อมูล
    

## การ ทํา ให้ พัง ทลาย

โบรกเกอร์ MQTT ที่ฝังแนบมาด้วยโดยปริยายจะถูกปิดการใช้งาน เพื่อเปิดใช้งานมัน ให้เพิ่มแฟล็กต่อไปนี้ไปยัง `ตั้งค่า. xml` .

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> จริง </enableMqttBroker> `  

## การปรับแต่งตัวแบ่งและจัดการข้อมูล

คุณสามารถกําหนดไดเรกทอรีกําหนดเองสําหรับการปรับแต่งและแฟ้มข้อมูลของโบรกเกอร์ได้ `ตั้งค่า. xml` . ถ้าป้ายกํากับพวกนี้ว่างเปล่า ERDDAP จะใช้ไดเรกทอรีปริยายที่ระบุโดยไลบรารี HiveMQ สําหรับรายละเอียดการตั้งค่าเพิ่มเติม รวมถึงการล็อกอินและส่วนขยาย โปรดอ้างอิงไปยังเจ้าหน้าที่ [ **Wiki รุ่นของชุมชน HievemQ** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## ใช้ตัวพิมพ์ที่ 1: การเพิ่มข้อมูลจากไคลเอนต์ MQTT

เพื่อสร้างชุดข้อมูลตามเวลาจริงโดยใช้โบรกเกอร์แบบฝังตัว คุณสามารถปรับแต่ง `DDTable from Mqt` ชุดข้อมูล (ตามที่กล่าวไว้) ภายใน_เดิม ERDDAP ตัวอย่างของการเชื่อมต่อไปยังโบรกเกอร์ท้องถิ่นของตัวเอง โปรแกรมลูกข่าย MQT สามารถเผยแพร่ข้อมูลได้ ERDDAP โบรกเกอร์ ซึ่ง `DDTable from Mqt` ชุดข้อมูลจะสมัครกิน

## ใช้ตัวพิมพ์ 2: การแจ้งข้อมูล

 ERDDAP สามารถปรับแต่งให้เผยแพร่การแจ้งเตือนเกี่ยวกับการเปลี่ยนแปลงของข้อมูล (เช่น ปรับปรุงหรือโหลดใหม่) กับหัวข้อเกี่ยวกับโบรกเกอร์ MQTT อย่างแรก ทําให้แน่ใจว่า จะเปิดใช้งานโบรกเกอร์ หรือรายการภายนอกที่มีอยู่ จากนั้นให้เปิดใช้งานคุณสมบัติการแจ้งเตือนใน `ตั้งค่า. xml` .

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> จริง </publishMqttNotif> `  

เมื่อเปิดใช้งานคุณสมบัตินี้ ERDDAP ใช้ไคลเอนต์ MQTT ภายในเพื่อเผยแพร่ข้อความ การตั้งค่าการเชื่อมต่อสําหรับไคลเอนต์นี้ สามารถกําหนดได้ใน `ตั้งค่า. xml` . ตารางด้านล่างนี้จะแสดงรายการการตั้งค่าและค่าปริยายที่มี

 | ป้ายกํากับ | ชนิด | ค่าปริยาย | คําอธิบาย | 
 | -------------------- | ----- | ------------- | ----------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | ข้อความ |   `เครื่องในเครื่อง`         | โบรกเกอร์จะตีพิมพ์การแจ้งเตือน | 
 |   ` <mqttServerPort> `           | อินท |   `1883`              | พอร์ตของโบรกเกอร์แจ้งเหตุ | 
 |   ` <mqttClientId> `             | ข้อความ |   `แก้ไขโครงการหลัก...`     | หมายเลขไคลเอนต์สําหรับสํานักพิมพ์แจ้ง | 
 |   ` <mqttUserName> `             | ข้อความ |   `ชื่อเครื่อง`   | ชื่อผู้ใช้สําหรับสํานักพิมพ์แจ้งเหตุ | 
 |   ` <mqttPassword> `             | ข้อความ |   `คําค้น`   | รหัสผ่านสําหรับผู้แจ้งเตือน | 
 |   ` <mqttSsl> `                  | บูเลียน |   `เท็จ`             | ใช้ SSL/ TLS สําหรับการเชื่อมต่อการแจ้งเตือน | 
 |   ` <mqttKeepAlive> `            | อินท |   `60`                | รักษาช่วงในวินาที | 
 |   ` <mqttCleanStart> `           | บูเลียน |   `เท็จ`             | เริ่มด้วยวาระงานที่สะอาด (ไม่พบสถานะวาระงานที่ต่อเนื่อง) . | 
 |   ` <mqttSessionExpiry> `        | อินท |   `10`                | ช่วงการหมดอายุของกลุ่มงานในหน่วยวินาที | 
 |   ` <mqttConnectionTimeout> `    | อินท |   `10`                | หมดเวลาเชื่อมต่อในวินาที | 
 |   ` <mqttAutomaticReconnect> `   | บูเลียน |   `จริง`              | ทําการเชื่อมต่อใหม่หากการเชื่อมต่อสูญหาย | 


--------

## ตัวแปรสิ่งแวดล้อม ` datasets.xml ` 

มีการปรับปรุงคุณสมบัติใหม่ที่อนุญาตให้ใช้งานตัวแปรแวดล้อมภายใน ` datasets.xml ` . นี่คือ **เปิดใช้โดยปริยาย** .

เพื่อปิดการทํางานนี้ ให้เพิ่มแฟล็กต่อไปนี้ไปยัง `ตั้งค่า. xml` .

xml

 ` <enableEnvParsing> เท็จ </enableEnvParsing> ` 
