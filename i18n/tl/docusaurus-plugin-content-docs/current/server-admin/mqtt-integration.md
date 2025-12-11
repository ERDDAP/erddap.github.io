#  ERDDAP " MQTT Integration "

 ERDDAP ay kinabibilangan ngayon ng suporta para sa protocol ng MQTT upang mapadali ang real-time data feedation at notification. Ang functionality na ito ay pinapatakbo ng open-source [ **Client ng HiveMQ MQTT** ](https://github.com/hivemq/hivemq-mqtt-client) at [ **Talaan ng mga Nilalaman** ](https://github.com/hivemq/hivemq-community-edition) Mga aklatan ng ahente.

 ERDDAP ay makapag - aalis ng MQTT sa dalawang pangunahing paraan:

1.   **Bilang MQT Client:**    ERDDAP ay maaaring magsuskribe ng mga paksa sa isang umiiral na MQT broker upang kumain ng datos at lumikha ng real-time datasets.
    
2.   **Bilang MQTT Broker:**    ERDDAP ay maaaring maging host ng sarili nitong nakapaloob na MQT broker, na nagpapahintulot sa panlabas na mga kliyente na tuwirang maglathala ng impormasyon dito.
    

----

##  ERDDAP bilang Isang MQTT Client

 ERDDAP ay maaaring gumanap bilang isang kliyenteng MQTT na magskripto ng mga paksa sa isang panlabas o sa sarili nitong nakapaloob na MQTT broker. Ito ay nakakamit gamit ang bago `Mapagkakatiwalaan Mula saMqtt` tipo ng dataset, na kahawig ng umiiral `NABAUTISAN NG EDDTTEGO` datos.

Sa kasalukuyan, ang pagpapatupad ng kliyente ay sumusuporta lamang **ipinasok** sa mga paksa.

## Pagsang - ayon: `Mapagkakatiwalaan Mula saMqtt` 

Upang isaayos ang isang dataset upang magsuskribe sa isang ahente ng MQTT, bigyang - kahulugan ang isang dataset ng tipo ng titik `Mapagkakatiwalaan Mula saMqtt` sa iyong ` datasets.xml ` talaksan. Ang sumusunod na mga tag ng pagsasaayos ay makukuha sa loob ng ` <dataset> ` bloke:

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

##  ERDDAP bilang MQTT Broker

 ERDDAP ay maaaring magpatakbo ng isang nakatagong MQT broker, na nagsisilbi sa dalawang pangunahing layunin:

1.   **Pag - aalis ng Data:** Upang makatanggap ng datos na inilathala ng mga kliyenteng panlabas na MQTT para sa paglikha ng real-time datasets.
    
2.   **Mga Kapansin - pansin:** Upang maglathala ng mga notasyon tungkol sa mga pagbabago sa dataset.
    

## Pag - e - Enbed Broker

Ang nakapaloob na MQTT broker ay nabalda ng default. Upang magawa ito, idagdag ang sumusunod na watawat `setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> totoo </enableMqttBroker> `  

## Broker Configuration & Data Directories

Maaari mong tiyakin ang mga direktor ng kaugalian para sa pagsasaayos at data file ng broker `setup.xml` . Kung ang mga tag na ito ay maiwang walang laman, ERDDAP ay gagamit ng default directories na tinukoy ng aklatan ng HiveMQ. Para sa mas makabagong mga detalye sa pag - aayos, kasali na ang pagtotroso at pagpapalawig, pakisuyong tukuyin ang opisyal [ **Edisyon ng Wiki ng HiveMQ Community** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Gamitin ang Kaso 1: Pag - aalis ng Date mula sa MQT Clients

Upang makagawa ng isang reality-time dataset gamit ang nakapaloob na broker, maaari mong isaayos ang isang `Mapagkakatiwalaan Mula saMqtt` datos (gaya ng inilarawan sa itaas) sa loob ng _same_ ERDDAP Halimbawa upang makipag-ugnayan sa sarili nitong lokal na broker . Pagkatapos ay maaaring ilathala ng mga kliyenteng MQTT ang impormasyon tungkol dito ERDDAP broker, na siyang ginagawa `Mapagkakatiwalaan Mula saMqtt` Ang dataset ay mag-skripto at kakain.

## Gamitin ang Kaso 2: Publishing Dataset Change Notifications

 ERDDAP ay maaaring isaayos upang ilathala ang mga notification tungkol sa mga pagbabago sa dataset (e.g., updates o reloads) sa isang paksa tungkol sa isang ahente ng MQTT. Una, tiyakin na ang broker ay may magagawa o may makukuha sa labas. Pagkatapos, gawin ang bahaging notasyon sa `setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> totoo </publishMqttNotif> `  

Kapag nagawa ang bahaging ito, ERDDAP ay gumagamit ng isang panloob na kliyenteng MQTT upang ilathala ang mga mensahe. Ang mga kalagayan ng kaugnayan para sa kliyenteng ito ay maaaring isaayos `setup.xml` . Ang mesa sa ibaba ay nagtatala ng makukuhang mga setting at ng kanilang default na mga halaga.

 | Tag | Uri | Napakalaking Halaga | Paglalarawan | 
 | -------------- | --- | ---------- | ----,-,-,--------------------------------------- | 
 |   ` <mqttServerHost> `           | string |   `lokal na distrito`         | Ang punong - abala ng broker upang maglathala ng mga nota. | 
 |   ` <mqttServerPort> `           | int |   `1883`              | Ang daungan ng notification broker. | 
 |   ` <mqttClientId> `             | string |   `erddap-client`     | Ang kliyente ID para sa mamamahayag ng notification. | 
 |   ` <mqttUserName> `             | string |   `erddap-username`   | Pangalan ng tagagamit para sa mamamahayag ng notification. | 
 |   ` <mqttPassword> `             | string |   `salita ng erddap-pass`   | Ang kontrasenyas para sa mamamahayag ng notification. | 
 |   ` <mqttSsl> `                  | Ekstasi |   `bulaan`             | Gumamit ng SSL/TLS para sa contection ng notification. | 
 |   ` <mqttKeepAlive> `            | int |   `60`                | Panatilihin ang-alsive interval sa segundo. | 
 |   ` <mqttCleanStart> `           | Ekstasi |   `bulaan`             | Magsimula sa isang malinis na sesyon (walang matiyagang sesyon) . | 
 |   ` <mqttSessionExpiry> `        | int |   `10`                | Session expiry interval sa mga segundo. | 
 |   ` <mqttConnectionTimeout> `    | int |   `10`                | Pag - uugnay ng oras sa loob ng mga segundo. | 
 |   ` <mqttAutomaticReconnect> `   | Ekstasi |   `totoo`              | Awtomatikong muling magdurugtong kung ang koneksiyon ay nawala. | 


----

## Nakasasakit na Kapaligiran ` datasets.xml ` 

Isang bagong katangian ang ipinakilala na nagpapahintulot sa paggamit ng mga variable sa kapaligiran ` datasets.xml ` . Ito ay **nagagawa sa pamamagitan ng default** .

Upang sirain ang gawaing ito, idagdag ang sumusunod na bandila `setup.xml` :

xml

 ` <enableEnvParsing> bulaan </enableEnvParsing> ` 
