#  ERDDAP MQTT Integration

 ERDDAP Nu ingår stöd för MQTT-protokollet för att underlätta realtidsdataintag och meddelanden. Denna funktionalitet drivs av open-source [ **HiveMQ MQTT Kund** ](https://github.com/hivemq/hivemq-mqtt-client) och [ **HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) mäklare bibliotek.

 ERDDAP kan utnyttja MQTT på två primära sätt:

1.   **Som MQTT-klient:**    ERDDAP kan prenumerera på ämnen på en befintlig MQTT-mäklare för att inta data och skapa dataset i realtid.
    
2.   **Som MQTT Broker:**    ERDDAP kan vara värd för sin egen inbäddade MQTT-mäklare, så att externa kunder kan publicera data direkt till den.
    

-------------

##  ERDDAP Som MQTT-klient

 ERDDAP kan fungera som en MQTT-klient för att prenumerera på ämnen på en extern eller egen inbäddad MQTT-mäklare. Detta uppnås med hjälp av den nya `EDDTableFromMqtt` datasettyp, som fungerar på samma sätt som den befintliga `EDDTableFromHttpGet` dataset.

För närvarande stöder klientgenomförandet endast **Prenumerera** ämnen.

## Konfiguration: `EDDTableFromMqtt` 

För att konfigurera en datamängd för att prenumerera på en MQTT-mäklare, definiera en datamängd av typ `EDDTableFromMqtt` i din ` datasets.xml ` fil. Följande konfigurationstaggar finns tillgängliga inom ` <dataset> ` Block:

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

-------------

##  ERDDAP Som MQTT Broker

 ERDDAP kan köra en inbäddad MQTT-mäklare, som tjänar två huvudsyften:

1.   **Dataintag:** För att få data publicerad av externa MQTT-klienter för att skapa realtidsdata.
    
2.   **Meddelanden:** Att publicera meddelanden om datasetändringar.
    

## Gör det möjligt för den inbäddade mäklaren

Den inbäddade MQTT-mäklaren är inaktiverad som standard. För att göra det, lägg till följande flagga för att `setup.xml` Från:

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> sanning sant </enableMqttBroker> `  

## Broker Configuration & Data Directories

Du kan ange anpassade kataloger för mäklarens konfiguration och datafiler i `setup.xml` . Om dessa taggar är tomma, ERDDAP kommer att använda standardkatalogen som anges av HiveMQ-biblioteket. För mer avancerade konfigurationsuppgifter, inklusive loggning och tillägg, vänligen hänvisa till den officiella [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Använd fall 1: Ingesting Data från MQTT-klienter

För att bygga en realtidsdataset med den inbäddade mäklaren kan du konfigurera en `EDDTableFromMqtt` Dataset (som beskrivs ovan) inom _same_ ERDDAP Till exempel att ansluta till sin egen lokala mäklare. Externa MQTT-klienter kan sedan publicera data till detta ERDDAP mäklare, som `EDDTableFromMqtt` dataset kommer att prenumerera på och inta.

## Använd fall 2: Publicera datasetändringsmeddelanden

 ERDDAP kan konfigureras för att publicera meddelanden om datasetändringar (t.ex. uppdateringar eller reloads) ett ämne på en MQTT mäklare. För det första, se till att mäklaren är aktiverad eller en extern är tillgänglig. Sedan aktivera meddelandefunktionen i `setup.xml` Från:

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> sanning sant </publishMqttNotif> `  

När denna funktion är aktiverad, ERDDAP använder en intern MQTT-klient för att publicera meddelandena. Anslutningsinställningarna för denna klient kan anpassas i `setup.xml` . Tabellen nedan listar de tillgängliga inställningarna och deras standardvärden.

 | Taggar | Typ | Standardvärde | Beskrivning | 
 | ------------------------------ | ---------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | Sträng |   `localhost`         | Mäklaren värd för att publicera meddelanden till. | 
 |   ` <mqttServerPort> `           | Int |   `1883`              | Hamnen i anmälningsmäklaren. | 
 |   ` <mqttClientId> `             | Sträng |   `Erddap-klient`     | Klient-ID för anmälningsförlaget. | 
 |   ` <mqttUserName> `             | Sträng |   `Erddap-username`   | Användarnamnet för anmälningsförlaget. | 
 |   ` <mqttPassword> `             | Sträng |   `Erddap-password`   | Lösenordet för meddelandeutgivaren. | 
 |   ` <mqttSsl> `                  | Boolean |   `falska lögner`             | Använd SSL/TLS för anmälningsanslutningen. | 
 |   ` <mqttKeepAlive> `            | Int |   `60 60 60 60 60`                | Håll-alive intervall på några sekunder. | 
 |   ` <mqttCleanStart> `           | Boolean |   `falska lögner`             | Börja med en ren session (Inget bestående sessionstillstånd) . | 
 |   ` <mqttSessionExpiry> `        | Int |   `10 10 10 10 10`                | Session löper ut intervall på några sekunder. | 
 |   ` <mqttConnectionTimeout> `    | Int |   `10 10 10 10 10`                | Anslutnings timeout på några sekunder. | 
 |   ` <mqttAutomaticReconnect> `   | Boolean |   `sanning sant`              | Återanslut automatiskt om anslutningen går förlorad. | 


-------------

## Miljö Variable Parsing in ` datasets.xml ` 

En ny funktion har införts som möjliggör användning av miljövariabler inom ` datasets.xml ` . Detta är **aktiverat som standard** .

För att inaktivera denna funktionalitet, lägg till följande flagga för att `setup.xml` Från:

xml

 ` <enableEnvParsing> falska lögner </enableEnvParsing> ` 
