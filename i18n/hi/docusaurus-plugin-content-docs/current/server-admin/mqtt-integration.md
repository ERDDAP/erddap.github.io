#  ERDDAP MQTT एकीकरण

 ERDDAP अब वास्तविक समय डेटा ingestion और अधिसूचनाओं को सुविधाजनक बनाने के लिए MQTT प्रोटोकॉल के लिए समर्थन शामिल है। यह कार्यक्षमता ओपन सोर्स द्वारा संचालित है [ **HiveMQ MQTT क्लाइंट** ](https://github.com/hivemq/hivemq-mqtt-client) और [ **HiveMQ सामुदायिक संस्करण** ](https://github.com/hivemq/hivemq-community-edition) ब्रोकर पुस्तकालय

 ERDDAP दो प्राथमिक तरीकों से MQTT का लाभ उठा सकते हैं:

1.   **एक MQTT क्लाइंट के रूप में:**    ERDDAP एक मौजूदा MQTT ब्रोकर पर विषयों की सदस्यता डेटा ingest करने और वास्तविक समय डेटा सेट बनाने के लिए कर सकते हैं।
    
2.   **एक MQTT ब्रोकर के रूप में:**    ERDDAP अपने स्वयं के एम्बेडेड MQTT ब्रोकर की मेजबानी कर सकते हैं, जिससे बाहरी ग्राहकों को सीधे डेटा प्रकाशित करने की अनुमति मिलती है।
    

--------

##  ERDDAP MQTT क्लाइंट के रूप में

 ERDDAP एक MQTT क्लाइंट के रूप में कार्य कर सकता है जो किसी बाहरी या उसके खुद के एम्बेडेड MQTT ब्रोकर पर विषयों की सदस्यता ले सकता है। यह नया उपयोग करके हासिल किया गया है `EDDTableFromMqtt` डेटासेट प्रकार, जो मौजूदा के समान कार्य करता है [ `EDDTableFromHttpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) डेटासेट।

वर्तमान में, ग्राहक कार्यान्वयन केवल समर्थन करता है **सदस्यता** विषय

## विन्यास: `EDDTableFromMqtt` 

एक MQTT ब्रोकर की सदस्यता के लिए डेटासेट को कॉन्फ़िगर करने के लिए, प्रकार के डेटासेट को परिभाषित करना `EDDTableFromMqtt` अपने ` datasets.xml ` फ़ाइल निम्नलिखित कॉन्फ़िगरेशन टैग भीतर उपलब्ध हैं ` <dataset> ` ब्लॉक:

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

##  ERDDAP MQTT ब्रोकर के रूप में

 ERDDAP एक एम्बेडेड MQTT ब्रोकर चला सकता है, जो दो मुख्य उद्देश्यों को पूरा करता है:

1.   **डेटा अंतर्ग्रहण:** वास्तविक समय डेटासेट बनाने के लिए बाह्य MQTT ग्राहकों द्वारा प्रकाशित डेटा प्राप्त करना।
    
2.   **अधिसूचनाएं:** डेटासेट परिवर्तनों के बारे में सूचनाएं प्रकाशित करना।
    

## एम्बेडेड ब्रोकर को सक्षम करना

एम्बेडेड MQTT ब्रोकर डिफ़ॉल्ट रूप से अक्षम है। इसे सक्षम करने के लिए, निम्नलिखित ध्वज को जोड़ने के लिए `साइटमैप` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> सच </enableMqttBroker> `  

## ब्रोकर विन्यास और डाटा डायरेक्टरी

आप ब्रोकर के कॉन्फ़िगरेशन और डेटा फ़ाइलों के लिए कस्टम निर्देशिकाओं को निर्दिष्ट कर सकते हैं `साइटमैप` । यदि इन टैगों को खाली छोड़ दिया जाता है, तो इन टैगों को खाली छोड़ दिया जाता है। ERDDAP HiveMQ पुस्तकालय द्वारा निर्दिष्ट डिफ़ॉल्ट निर्देशिकाओं का उपयोग करेगा। अधिक उन्नत विन्यास विवरण के लिए, जिसमें लॉगिंग और एक्सटेंशन शामिल हैं, कृपया आधिकारिक देखें [ **HiveMQ सामुदायिक संस्करण Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) ।
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## केस 1: MQTT क्लाइंट से डेटा की खोज

एम्बेडेड ब्रोकर का उपयोग करके वास्तविक समय में डेटासेट बनाने के लिए, आप एक कॉन्फ़िगर कर सकते हैं `EDDTableFromMqtt` डेटासेट (जैसा कि ऊपर वर्णित है) _same_ ERDDAP उदाहरण के लिए अपने स्थानीय ब्रोकर से जुड़ने के लिए। इसके बाद बाहरी MQTT क्लाइंट इस डेटा को प्रकाशित कर सकते हैं ERDDAP ब्रोकर, जो `EDDTableFromMqtt` डेटासेट सदस्यता और ingest करेगा।

## केस 2: प्रकाशित डेटासेट बदलें अधिसूचनाएं

 ERDDAP डेटासेट परिवर्तनों के बारे में सूचनाएं प्रकाशित करने के लिए कॉन्फ़िगर किया जा सकता है (उदाहरण के लिए, अद्यतन या पुनः लोड) MQTT ब्रोकर पर एक विषय के लिए। सबसे पहले, सुनिश्चित करें कि ब्रोकर सक्षम है या एक बाहरी उपलब्ध है। फिर, अधिसूचना सुविधा को सक्षम करें `साइटमैप` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> सच </publishMqttNotif> `  

जब यह सुविधा सक्षम हो जाती है, ERDDAP संदेश प्रकाशित करने के लिए एक आंतरिक MQTT क्लाइंट का उपयोग करता है। इस क्लाइंट के लिए कनेक्शन सेटिंग्स को अनुकूलित किया जा सकता है `साइटमैप` । नीचे दी गई तालिका उपलब्ध सेटिंग्स और उनके डिफ़ॉल्ट मान को सूचीबद्ध करती है।

 | टैग | प्रकार | डिफ़ॉल्ट मान | विवरण | 
 | -------------------------- | ------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | स्ट्रिंग |   `स्थानीयहोस्ट`         | ब्रोकर अधिसूचनाओं को प्रकाशित करने की मेजबानी करता है। | 
 |   ` <mqttServerPort> `           | int |   `1883`              | नोटिफिकेशन ब्रोकर का बंदरगाह। | 
 |   ` <mqttClientId> `             | स्ट्रिंग |   `erddap-client`     | अधिसूचना प्रकाशक के लिए क्लाइंट आईडी। | 
 |   ` <mqttUserName> `             | स्ट्रिंग |   `erddap-username`   | अधिसूचना प्रकाशक के लिए उपयोगकर्ता नाम। | 
 |   ` <mqttPassword> `             | स्ट्रिंग |   `erddap-password`   | अधिसूचना प्रकाशक के लिए पासवर्ड। | 
 |   ` <mqttSsl> `                  | बोरान |   `झूठ`             | अधिसूचना कनेक्शन के लिए SSL/TLS का उपयोग करें। | 
 |   ` <mqttKeepAlive> `            | int |   `60`                | सेकंड में अंतराल रखें। | 
 |   ` <mqttCleanStart> `           | बोरान |   `झूठ`             | एक साफ सत्र के साथ शुरू (कोई सतत सत्र राज्य नहीं) । | 
 |   ` <mqttSessionExpiry> `        | int |   `10`                | सेकंड में सत्र समाप्ति अंतराल। | 
 |   ` <mqttConnectionTimeout> `    | int |   `10`                | सेकंड में कनेक्शन टाइमआउट। | 
 |   ` <mqttAutomaticReconnect> `   | बोरान |   `सच`              | अगर कनेक्शन खो गया है तो स्वचालित रूप से फिर से कनेक्ट करें। | 


--------

## पर्यावरण परिवर्तनीय पार्सिंग ` datasets.xml ` 

एक नई सुविधा पेश की गई है जो पर्यावरण चर के उपयोग की अनुमति देता है ` datasets.xml ` । यह है **डिफ़ॉल्ट रूप से सक्षम** ।

इस कार्यक्षमता को अक्षम करने के लिए, निम्नलिखित ध्वज को जोड़ने के लिए `साइटमैप` :

xml

 ` <enableEnvParsing> झूठ </enableEnvParsing> ` 
