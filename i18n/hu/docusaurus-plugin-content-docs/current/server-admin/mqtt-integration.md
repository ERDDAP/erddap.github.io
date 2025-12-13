#  ERDDAP MQTT integráció

 ERDDAP most magában foglalja az MQTT protokoll támogatását, hogy megkönnyítse a valós idejű adatok ösztönzését és értesítéseit. Ezt a funkcionalitást a nyílt forráskódú [ **HiveMQ MQTT ügyfél** ](https://github.com/hivemq/hivemq-mqtt-client) és [ **HiveMQ közösségi kiadás** ](https://github.com/hivemq/hivemq-community-edition) bróker könyvtárak.

 ERDDAP lehet kihasználni MQTT két elsődleges módon:

1.   **MQTT ügyfélként:**    ERDDAP feliratkozhat témákra egy meglévő MQTT brókerről a legegyszerűbb adatokra, és valós idejű adatkészleteket hozhat létre.
    
2.   **MQTT Broker:**    ERDDAP tárolhatja saját beágyazott MQTT brókerét, lehetővé téve a külső ügyfelek számára, hogy közvetlenül nyilvánosságra hozzanak adatokat.
    

---------

##  ERDDAP MQTT ügyfél

 ERDDAP MQTT ügyfélként lehet feliratkozni a témákra egy külső vagy saját beágyazott MQTT bróker. Ez az új használatával érhető el `EDDTableFromMqt` adatkészlet típus, amely hasonlóan működik a meglévő [ `EDDTableFromHttpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) adatkészlet.

Jelenleg az ügyfél végrehajtása csak támogatja **aláírás** témák.

## Konfiguráció: `EDDTableFromMqt` 

Adatkészlet konfigurálása egy MQTT brókerhez, meghatározza a típus adatkészletét `EDDTableFromMqt` a te ` datasets.xml ` fájl. A következő konfigurációs címkék állnak rendelkezésre a ` <dataset> ` blokk:

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

---------

##  ERDDAP MQTT Broker

 ERDDAP beágyazott MQTT brókert futtathat, amely két fő célt szolgál:

1.   **Adatfelmérés:** Annak érdekében, hogy a külső MQTT ügyfelek által közzétett adatokat valós idejű adatkészletek létrehozására használhassák.
    
2.   **Értesítések:** Az adatkészlet-változásokkal kapcsolatos értesítések közzététele.
    

## Beágyazott bróker engedélyezése

A beágyazott MQTT brókert az alapértelmezés fogyatékkal élő. Hogy lehetővé tegyük, add hozzá a következő zászlót `setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> Igaz </enableMqttBroker> `  

## Broker Configuration & Adatkezelők

Megadhatja a szokásos könyvtárakat a bróker konfigurációjára és adatfájljaira `setup.xml` ... Ha ezek a címkék üresek maradnak, ERDDAP a HiveMQ könyvtár által meghatározott alapértelmezett könyvtárakat fogja használni. A fejlettebb konfigurációs részletek, beleértve a naplózást és a kiterjesztéseket, kérjük, forduljon a hivatalos [ **HiveMQ közösségi kiadás Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) ...
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Használja az 1. esetet: Ingesting Data from MQTT ügyfelek

Ahhoz, hogy egy valós idejű adatkészletet építsen a beágyazott bróker segítségével, konfigurálhat egy `EDDTableFromMqt` adatkészlet (a fent leírt) belül _same_ ERDDAP Például, hogy kapcsolódjon a saját helyi bróker. A külső MQTT ügyfelek ezt követően közzétehetik az adatokat ERDDAP bróker, amely `EDDTableFromMqt` Az adatállomány feliratkozik és lemarad.

## 2. eset használata: Adatkészlet-változási értesítések közzététele

 ERDDAP konfigurálható az adatkészlet-változásokkal kapcsolatos értesítések közzétételére (pl. frissítések vagy újratöltések) egy téma egy MQTT bróker. Először is, biztosítsa a bróker engedélyezett vagy egy külső elérhető. Ezután engedélyezze az értesítési funkciót `setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> Igaz </publishMqttNotif> `  

Ha ez a funkció engedélyezett, ERDDAP Belső MQTT klienst használ az üzenetek közzétételéhez. Az ügyfél kapcsolati beállításai testreszabhatók `setup.xml` ... Az alábbi táblázat felsorolja a rendelkezésre álló beállításokat és az alapértelmezett értékeket.

 | Tagok | típus | Alapértelmezett érték | Leírás | 
 | ------------------------------ | ------ | ---------------- | ----------------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | Szilárd |   `Helyszín`         | A bróker fogadta el, hogy értesítéseket tegyen közzé. | 
 |   ` <mqttServerPort> `           | Inkább |   `1883`              | Az értesítési bróker kikötője. | 
 |   ` <mqttClientId> `             | Szilárd |   `erddap-kliens`     | Az ügyfél azonosítója az értesítési kiadó számára. | 
 |   ` <mqttUserName> `             | Szilárd |   `erddap-username`   | Az értesítési kiadó felhasználónévje. | 
 |   ` <mqttPassword> `             | Szilárd |   `erddap-password`   | Az értesítési kiadó jelszava. | 
 |   ` <mqttSsl> `                  | boolean |   `hamis`             | Használja az SSL / TLS-t az értesítési kapcsolathoz. | 
 |   ` <mqttKeepAlive> `            | Inkább |   `60.`                | Folyamatos intervallum másodpercekben. | 
 |   ` <mqttCleanStart> `           | boolean |   `hamis`             | Kezdj egy tiszta ülésen (nincs tartós ülés állapota) ... | 
 |   ` <mqttSessionExpiry> `        | Inkább |   `10.`                | Session lejárati intervallum másodpercekben. | 
 |   ` <mqttConnectionTimeout> `    | Inkább |   `10.`                | Connection időzítés másodpercekben. | 
 |   ` <mqttAutomaticReconnect> `   | boolean |   `Igaz`              | Automatikusan kapcsolja össze, ha a kapcsolat elveszett. | 


---------

## Környezeti változó mezőgazdaság ` datasets.xml ` 

Új funkciót vezettek be, amely lehetővé teszi a környezeti változók használatát ` datasets.xml ` ... Ez az **lehetővé tette az alapértelmezés** ...

E funkcionalitás letiltásához add hozzá a következő zászlót `setup.xml` :

xml xml

 ` <enableEnvParsing> hamis </enableEnvParsing> ` 
