#  ERDDAP ایم‌ٹی‌ٹی‌ٹی‌منٹ

 ERDDAP اب اصل وقت کے اعداد و شمار کی تزئین و آرائش اور اطلاعات کی سہولت کے لیے MQT پروٹوکول کی حمایت شامل ہے۔ یہ سرگرمی کھلے سرسید کی طرف سے اختیار کی جاتی ہے۔ [ **HiveMQ MQT Client** ](https://github.com/hivemq/hivemq-mqtt-client) اور [ **HiveMQ کمیونٹی ایڈیشن** ](https://github.com/hivemq/hivemq-community-edition) توڑ لائبریریز۔

 ERDDAP MQT کو دو بنیادی طریقوں سے ترتیب دے سکتا ہے:

1.   **بطور MQT Client:**    ERDDAP حالیہ ایم کی ٹی ٹی کے ضلع میں ہونے والے موضوعات پر گفتگو کر سکتے ہیں اور حقیقی وقت کے اعداد و شمار تخلیق کر سکتے ہیں۔
    
2.   **بطور MQT Broker:**    ERDDAP بیرونی گاہکوں کو براہ راست ڈیٹا شائع کرنے کی اجازت دے سکتے ہیں
    

----

##  ERDDAP بطور MQT Client

 ERDDAP کسی بیرونی یا خود سے متعلق موضوعات پر بحث کرنے کے لئے MQT کلائنٹ کے طور پر کام کر سکتا ہے۔ یہ نیا استعمال کر رہا ہے `Mqt سے مراد` ڈیٹا سیٹ ٹائپ، جو موجودہ کے ساتھ اسی طرح کام کرتا ہے۔ [ `ایچ‌ٹیپ سے پیدا ہونے والے بچے` ](/docs/server-admin/datasets#eddtablefromhttpget) اعداد و شمار۔

فی الحال کلائنٹ پر عمل آوری صرف معاونت کرتی ہے۔ **ذیلی ضلع** موضوعات پر.

## غلطی: `Mqt سے مراد` 

ایک ایم کی ٹی توڑر پر ڈیٹا سیٹ لگانے کے لئے، ڈیٹا سیٹ کی نوعیت کا تعین کرتے ہیں۔ `Mqt سے مراد` آپ میں ` datasets.xml ` فائل. ذیلی وضع قطعس اندر موجود ہیں۔ ` <dataset> ` بلاک:

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

----

##  ERDDAP بطور MQT Broker

 ERDDAP ایک انفنٹری ایم کیٹی ہارمر چلا سکتا ہے، جو دو مرکزی مقاصد انجام دیتا ہے:

1.   **ڈاٹ کام:** حقیقی وقت کے اعداد و شمار تخلیق کرنے کے لیے بیرونی MQT کلائنٹ کی جانب سے شائع کردہ اعداد و شمار کو حاصل کرنے کے لیے۔
    
2.   **ناشر:** ڈیٹا سیٹ کی تبدیلیوں کے بارے میں اطلاعات شائع کرنے کے لئے.
    

## اِس سے ظاہر ہوتا ہے کہ اُن کا ایمان مضبوط تھا ۔

انفلیشن ایم کیٹی ہارنر مقررہ مقدار سے معذور ہے۔ اسے قابل بنانے کے لیے مندرجہ ذیل جھنڈ شامل کریں۔ `تیار` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> سچ </enableMqttBroker> `  

## برکیر کرافٹ اینڈ ڈیٹا ڈائریکٹرز

آپ درجہ بندیر کی وضع کاری اور ڈیٹا فائل کے لیے سیرت ڈائریکٹرز متعین کر سکتے ہیں۔ `تیار` . . اگر یہ کھیل خالی چھوڑ دیئے جائیں ERDDAP HiveMQ لائبریری کی طرف سے مقرر کردہ دیہی ڈائریکٹرز کو استعمال کریں گے. مزید ترقی یافتہ ڈھانچے کی تفصیلات کے لیے، جن میں پراکرت اور توسیع بھی شامل ہے، دفتر کے حوالے سے رجوع کریں گے۔ [ **HiveMQ کمیونٹی ایڈیشن وکی** ](https://github.com/hivemq/hivemq-community-edition/wiki) . .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Cas 1: Ingesting Data استعمال MQT Clients سے کیا۔

ایک حقیقی وقت کے اعداد و شمار بنانے کے لئے، آپ کو ایک پروڈیوس کر سکتے ہیں `Mqt سے مراد` ڈیٹا سیٹ (جیسا کہ اوپر بیان کیا گیا ہے۔) جگہ ERDDAP ''اپنے مقامی بھکر سے متصل ہونے کی مثال۔ بیرونی MQT کلائنٹ پھر اس میں ڈیٹا شائع کر سکتے ہیں۔ ERDDAP جس نے پیٹھ پھیری `Mqt سے مراد` اعداد و شمار کی تزئین و آرائش سے متعلق ہوگا۔

## کیس 2: پبلشنگ ڈیٹا سیٹ تبدیل کرنا

 ERDDAP ڈیٹا سیٹ کی تبدیلیوں کے بارے میں اطلاعات شائع کرنے کے لیے اسکرپٹ کیا جا سکتا ہے۔ (مثلا، تجدید یا تزئین و آرائش۔) ایک ایم کیو ٹی توڑ کے موضوع پر ایک موضوع پر۔ سب سے پہلے یہ یقینی بناتا ہے کہ توڑ کو قابل بنایا جائے یا بیرونی دست یاب ہو۔ اس کے بعد ، اطلاعاتی خصوصیت کو پیدا کرنے کے قابل `تیار` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> سچ </publishMqttNotif> `  

جب یہ خصوصیت قابل عمل ہو جائے تو ERDDAP پیغامات شائع کرنے کے لیے اندرونی MQT کلائنٹ استعمال کرتا ہے۔ اس کلائنٹ کے لیے اتصال کی ترتیبات وضع کی جا سکتی ہیں `تیار` . . ذیل میں دستیاب ترتیبات اور اُن کی لازمی اقدار کی فہرست دی گئی ہے ۔

 | ٹیگ | قسم | طے شدہ | تفصیل | 
 | ---- | ---- | ---- | . . . . . . . . . . . . . . . | 
 |   ` <mqttServerHost> `           | آواز |   `مقامی`         | اطلاعات شائع کرنے کے لیے توڑر میزبان۔ | 
 |   ` <mqttServerPort> `           | باقی |   `1883`              | اطلاعات کی بندرگاہ ہار گئی۔ | 
 |   ` <mqttClientId> `             | آواز |   `ایوارڈز-client`     | مبشروں کے لیے کلائنٹ آئی ڈی ۔ | 
 |   ` <mqttUserName> `             | آواز |   `ایردوپ-سوس-نام`   | منادی کے کام میں حصہ لینا | 
 |   ` <mqttPassword> `             | آواز |   `اردداپ-پسک لفظ ہے۔`   | تبلیغی خدمت کے لیے پاس ورڈ | 
 |   ` <mqttSsl> `                  | ایران |   `غلط`             | پیام اتصال کے لیے SSL/TLS استعمال کریں. | 
 |   ` <mqttKeepAlive> `            | باقی |   `60`                | سیکنڈوں میں ہوشیار رہنے. | 
 |   ` <mqttCleanStart> `           | ایران |   `غلط`             | خالص سیشن سے شروع کریں (کوئی غیر متصل سیشن حالت) . . | 
 |   ` <mqttSessionExpiry> `        | باقی |   `10`                | سیکنڈوں میں انتہائی تیز. | 
 |   ` <mqttConnectionTimeout> `    | باقی |   `10`                | سیکنڈوں میں وقت ختم. | 
 |   ` <mqttAutomaticReconnect> `   | ایران |   `سچ`              | خودکار طور پر اتصال ناکام ہوگیا. | 


----

## ماحولیاتی ترقی میں ` datasets.xml ` 

ایک نئی خصوصیت متعارف کرائی گئی ہے جو اندر ماحول کی تبدیلی کے استعمال کی اجازت دیتی ہے۔ ` datasets.xml ` . . یہ ہے **طے شدہ** . .

اس تقریب کو معطل کرنے کے لئے مندرجہ ذیل جھنڈ شامل کریں `تیار` :

Xml

 ` <enableEnvParsing> غلط </enableEnvParsing> ` 
