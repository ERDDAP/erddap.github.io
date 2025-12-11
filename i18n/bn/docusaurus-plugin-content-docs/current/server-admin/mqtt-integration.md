#  ERDDAP MQTP

 ERDDAP এখন এমকিউটিটি প্রোটোকলের প্রতি সমর্থন রয়েছে। বর্তমানে ব্যবহার করা হয় [ **HivMQQQT ক্লায়েন্ট** ](https://github.com/hivemq/hivemq-mqtt-client) এবং [ **HivmQ সম্প্রদায় সংস্করণ** ](https://github.com/hivemq/hivemq-community-edition) ব্রোকার লাইব্রেরি।

 ERDDAP প্রাথমিক দুটি উপায়ে এমকিউটিকে ব্যবহার করা যায়:

1.   **এমকিউটি ক্লায়েন্ট হিসেবে:**    ERDDAP বর্তমানে এমকিউটিএ ব্রোঞ্জের তথ্য সংগ্রহে এবং বাস্তব সময়ের তথ্য তৈরি করতে একটি বিষয় সংযুক্ত করতে পারে।
    
2.   **এমকিউটি ব্রোকার হিসেবে:**    ERDDAP তার নিজস্ব হোস্ট যা এমকিউটিএ ব্রোকার, বাইরের ক্লায়েন্টদের সরাসরি তথ্য প্রকাশ করতে দেয়।
    

উহ...

##  ERDDAP MQT ক্লায়েন্ট হিসাবে

 ERDDAP এটি এমকিউটিটি (এমকিউটি) ক্লায়েন্ট হিসেবে কাজ করতে পারে একটি বাইরের বিষয় বা তার নিজস্ব বিকল্প এমকিউটি ব্রোকার। এই নতুন পদ্ধতি ব্যবহার করে অর্জন করা যায় `EDDT টেবিল উৎসqt` ডাটা টাইপ ( ধরণের), যা বিদ্যমান ফাংশনের সাথে একইভাবে কাজ করে `EDD টেবিল Htttupet গেটComment` ডাটাসেট.

বর্তমানে, ক্লায়েন্ট দ্বারা শুধুমাত্র সমর্থিত হয় **সাবস্ক্রাইব করা** বিষয় নিয়ে.

## কনফিগারেশন: `EDDT টেবিল উৎসqt` 

সাবস্ক্রাইব করার উদ্দেশ্যে MQT ব্রোকার সংযুক্ত করতে একটি তথ্য নির্ধারণ করুন, সংজ্ঞায়িত করুন সংজ্ঞায়িত করো sectory `EDDT টেবিল উৎসqt` তোমার মধ্যে ` datasets.xml ` ফাইল. নিম্নলিখিত কনফিগারেশনের মধ্যে উপস্থিত ট্যাগ বর্তমানে উপস্থিত রয়েছে ` <dataset> ` ব্লক:

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

উহ...

##  ERDDAP MQT ব্রোকার হিসেবে

 ERDDAP এটি দুটি মূল উদ্দেশ্য সাধন করতে পারে:

1.   **তথ্যের স্তর:** রিয়েল টাইম ডাটা তৈরি করার জন্য বহিস্থিত MQT ক্লায়েন্ট দ্বারা প্রকাশিত তথ্য পেতে।
    
2.   **বিজ্ঞপ্তি:** তথ্য পরিবর্তন সম্বন্ধে বিজ্ঞপ্তি প্রকাশ করতে ব্যবহৃত হয়।
    

## এমবেড করা ব্রোকার সক্রিয় করা হচ্ছে

এমবেড করা MQTথ ব্রোকার ডিফল্টরূপে নিষ্ক্রিয় করা হয়েছে । এটি সক্রিয় করার জন্য, নিম্নলিখিত ফ্ল্যাগ যোগ করুন `উন্নত ব্যবস্থা।` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> সত্য </enableMqttBroker> `  

## ব্রোকার কনফিগারেশন এবং ডাটা ডিরেক্টরিName

ব্রোকার কনফিগারেশন ফাইলের মধ্যে কনফিগারেশন ও তথ্যের জন্য স্বনির্ধারিত ডিরেক্টরি নির্ধারণ করা যাবে `উন্নত ব্যবস্থা।` . . এই ট্যাগগুলি ফাঁকা থাকলে, ERDDAP HivMQ লাইব্রেরি দ্বারা নির্ধারিত ডিফল্ট ডিরেক্টরি ব্যবহার করা হবে । অধিক বিবরণের জন্য লগ ইন সংক্রান্ত উন্নত কনফিগারেশন ও এক্সটেনশন অন্তর্ভুক্ত করুন [ **HivmQ কমিউনিটি সংস্করণ উইকি** ](https://github.com/hivemq/hivemq-community-edition/wiki) . .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## MQT ক্লায়েন্ট থেকে তথ্য ব্যবহার করুন

এমবেড করা ব্রোকার ব্যবহার করে একটি বাস্তব সময়- ভিত্তিক তথ্য নির্মাণ করুন, আপনি একটি কনফিগার করতে পারেন `EDDT টেবিল উৎসqt` ডাটাসেট (যেমন বর্ণনা উপরে) অক্ষরের মধ্যে (_c) ERDDAP যেন তারা সুরক ্ ষিত ডিম । বহিস্থিত MQT ক্লায়েন্ট দ্বারা এই তথ্য প্রকাশ করা যাবে ERDDAP ব্রোকার, যেটা `EDDT টেবিল উৎসqt` সাবস্ক্রাইব করতে চাইলে সাবস্ক্রাইব করতে হবে।

## কেস ২:

 ERDDAP তথ্য পরিবর্তন করার জন্য কনফিগার করা তথ্যকে প্রকাশ করার উদ্দেশ্যে কনফিগার করা হবে (eg, আপডেট অথবা পুনরায় লোড করুন) এমকিউটি ব্রোকার সম্পর্কে একটা বিষয়ে। প্রথমে, ব্রোকার সক্রিয় অথবা বহিস্থিত কোনো সামগ্রী সক্রিয় করা আবশ্যক । তারপর, সূচনাপ্রদানের ব্যবস্থা সক্রিয় করা হবে `উন্নত ব্যবস্থা।` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> সত্য </publishMqttNotif> `  

যখন এই বৈশিষ্ট্য সক্রিয় করা হয় ERDDAP বার্তা প্রকাশ করার জন্য একটি অভ্যন্তরীণ MQT ক্লায়েন্ট ব্যবহার করা হবে । এই ক্লায়েন্টের সাথে সংযোগের জন্য ব্যবহারযোগ্য সংযোগের বৈশিষ্ট্য `উন্নত ব্যবস্থা।` . . নীচের টেবিলের পাশে বিদ্যমান সেটিংস এবং তাদের ডিফল্ট মানসমূহ।

 | ধর্ম্ম | ধরন | ডিফল্ট মান | বিবরণ | 
 | দে-লেভেলি | --disallow-test | --------... | অধ্যামফিগারিয়েCity in Oregon USA | 
 |   ` <mqttServerHost> `           | পংক্তি |   `স্থানীয় হোস্ট`         | ব্রোকার হোস্টটি প্রকাশ করার জন্য প্রকাশ করা হবে। | 
 |   ` <mqttServerPort> `           | পূর্ণসংখ্যা |   `১৮৮৩`              | বিজ্ঞপ্তির ব্রোকার পোর্ট। | 
 |   ` <mqttClientId> `             | পংক্তি |   `radp-client`     | বিজ্ঞপ্তির জন্য ব্যবহৃত ক্লায়েন্টের ID। | 
 |   ` <mqttUserName> `             | পংক্তি |   `ওর-এস-ভি-পি`   | বিজ্ঞপ্তির জন্য ব্যবহারকারীর নাম। | 
 |   ` <mqttPassword> `             | পংক্তি |   `পরিত্রাণের পাসওয়ার্ড`   | বিজ্ঞপ্তির জন্য পাসওয়ার্ড | 
 |   ` <mqttSsl> `                  | বুলিয়ান |   `মিথ্যা`             | সূচনাপ্রদানের জন্য SSL/TLS ব্যবহার করা হবে। | 
 |   ` <mqttKeepAlive> `            | পূর্ণসংখ্যা |   `৬০`                | কিছুক্ষণের মধ্যে বিরতি থাকবে । | 
 |   ` <mqttCleanStart> `           | বুলিয়ান |   `মিথ্যা`             | নিরাপদ সেশান সহযোগে আরম্ভ করুন (কোনো সেশান সংরক্ষণ করা হয়নি) . . | 
 |   ` <mqttSessionExpiry> `        | পূর্ণসংখ্যা |   `১০`                | সেকেন্ড এককে & সময় বিরতি দাও | 
 |   ` <mqttConnectionTimeout> `    | পূর্ণসংখ্যা |   `১০`                | সেকেন্ড অনুযায়ী সংযোগের সময়সীমা উত্তীর্ণ হয়েছে। | 
 |   ` <mqttAutomaticReconnect> `   | বুলিয়ান |   `সত্য`              | সংযোগ বিচ্ছিন্ন হলে স্বয়ংক্রিয়ভাবে পুনরায় সংযোগ স্থাপন করা হবে । | 


উহ...

## পরিবেশ ভেরিয়েবল পার্সে ` datasets.xml ` 

একটি নতুন বৈশিষ্ট্য চালু করা হয়েছে যা ভিতরের এনভায়রনমেন্ট ভেরিয়েবলের ব্যবহার অনুমোদন করে ` datasets.xml ` . . এই **ডিফল্টরূপে সক্রিয় করা হবে** . .

এই বৈশিষ্ট্য নিষ্ক্রিয় করার জন্য নিম্নলিখিত ফ্ল্যাগ সক্রিয় করুন, নিম্নলিখিত ফ্ল্যাগগুলি যোগ করুন `উন্নত ব্যবস্থা।` :

এল- এম- এল

 ` <enableEnvParsing> মিথ্যা </enableEnvParsing> ` 
