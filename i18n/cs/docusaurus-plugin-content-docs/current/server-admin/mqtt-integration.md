#  ERDDAP Integrace MQTT

 ERDDAP nyní zahrnuje podporu protokolu MQTT pro usnadnění požití a oznamování údajů v reálném čase. Tato funkce je napájena otevřeným zdrojem [ **HiveMQ MQTT klient** ](https://github.com/hivemq/hivemq-mqtt-client) a [ **HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) knihovny makléřů.

 ERDDAP může využít MQTT dvěma primárními způsoby:

1.   **Jako klient MQTT:**    ERDDAP může přihlásit k tématům existujícího makléře MQTT data a vytvářet data v reálném čase.
    
2.   **Jako MQTT Broker:**    ERDDAP může hostit vlastního vloženého makléře MQTT, který umožňuje externím klientům zveřejňovat data přímo k němu.
    

-----------

##  ERDDAP jako MQTT klient

 ERDDAP může působit jako MQTT klient, aby se přihlásil k tématům na externí nebo vlastní zabudovaný MQTT broker. Toho je dosaženo pomocí nového `EDDTableFromMqtt` Typ datového souboru, který funguje podobně jako stávající [ `EDDTableFromHttpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) Soubor dat.

V současné době klientská implementace podporuje pouze **Přihlášení** na témata.

## Nastavení: `EDDTableFromMqtt` 

Konfigurace datového souboru pro přihlášení k makléři MQTT, definovat datový soubor typu `EDDTableFromMqtt` ve Vašem ` datasets.xml ` Složka. Následující konfigurační značky jsou dostupné v rámci ` <dataset> ` blok:

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

-----------

##  ERDDAP jako MQTT makléř

 ERDDAP může provozovat vložený makléř MQTT, který slouží dvěma hlavním účelům:

1.   **Požití dat:** Získání dat zveřejněných externími klienty MQTT pro vytváření dat v reálném čase.
    
2.   **Oznámení:** Zveřejnit oznámení o změnách datového souboru.
    

## Umožnění vloženému makléři

Vložený makléř MQTT je defaultně zakázán. K tomu přidejte následující vlajku `setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> pravda </enableMqttBroker> `  

## Konfigurace a datové adresáře makléře

Můžete zadat vlastní adresáře pro konfiguraci makléře a datové soubory v `setup.xml` . Pokud jsou tyto značky prázdné, ERDDAP použije výchozí adresáře určené knihovnou HiveMQ. Pro pokročilejší údaje o konfiguraci, včetně logování a rozšíření, se prosím obraťte na úředníka [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Použít případ 1: požití dat od MQTT klientů

Pro sestavení souboru v reálném čase pomocí vloženého brokera můžete nakonfigurovat `EDDTableFromMqtt` Soubor údajů (jak je popsáno výše) v rámci _zame_ ERDDAP instance pro připojení k vlastnímu místnímu makléři . Externí klienti MQTT pak mohou zveřejnit data k tomuto ERDDAP makléř, který `EDDTableFromMqtt` Databáze se přihlásí a pozře.

## Použít případ 2: Publishing Dataset Změna oznámení

 ERDDAP lze nakonfigurovat pro zveřejnění oznámení o změnách datového souboru (např. aktualizace nebo opětovné načítání) na téma MQTT makléře. Za prvé, zajistit, že makléř je povolen nebo externí je k dispozici. Poté povolte oznamovací funkci v `setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> pravda </publishMqttNotif> `  

Když je tato funkce povolena, ERDDAP ke zveřejnění zpráv používá interní MQTT klient. Nastavení připojení pro tohoto klienta lze přizpůsobit v `setup.xml` . Níže uvedená tabulka uvádí dostupná nastavení a jejich výchozí hodnoty.

 | Značka | Typ | Výchozí hodnota | Popis zboží | 
 | ---------- | ------- | ----------------- | ------------------- | 
 |   ` <mqttServerHost> `           | řetězec |   `localhost`         | Hostitel makléře zveřejní oznámení. | 
 |   ` <mqttServerPort> `           | int |   `1883`              | Přístav oznamovacího makléře. | 
 |   ` <mqttClientId> `             | řetězec |   `erddap- klient`     | ID klienta pro vydavatele oznámení. | 
 |   ` <mqttUserName> `             | řetězec |   `erddap-username`   | Uživatelské jméno vydavatele oznámení. | 
 |   ` <mqttPassword> `             | řetězec |   `erddap- password`   | Heslo pro vydavatele oznámení. | 
 |   ` <mqttSsl> `                  | boolean |   `false`             | Pro oznamovací spojení použijte SSL/TLS. | 
 |   ` <mqttKeepAlive> `            | int |   `60`                | Udržujte interval v sekundách. | 
 |   ` <mqttCleanStart> `           | boolean |   `false`             | Začít s čistým sezením (žádný trvalý stav relace) . | 
 |   ` <mqttSessionExpiry> `        | int |   `10`                | Čas ukončení session v sekundách. | 
 |   ` <mqttConnectionTimeout> `    | int |   `10`                | Timeout spojení za sekundy. | 
 |   ` <mqttAutomaticReconnect> `   | boolean |   `pravda`              | Automaticky se znovu připojit, pokud je spojení ztraceno. | 


-----------

## Prostředí Proměnná Analýza v ` datasets.xml ` 

Byla zavedena nová funkce, která umožňuje používání proměnných prostředí v rámci ` datasets.xml ` . Tohle je **standardně zapnuto** .

Pro vypnutí této funkce přidejte následující vlajku `setup.xml` :

xml

 ` <enableEnvParsing> false </enableEnvParsing> ` 
