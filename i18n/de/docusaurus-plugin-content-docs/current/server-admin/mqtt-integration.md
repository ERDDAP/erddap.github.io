#  ERDDAP MQTT Integration

 ERDDAP enthält nun Unterstützung für das MQTT-Protokoll, um Echtzeit-Datenaufnahmen und Benachrichtigungen zu erleichtern. Diese Funktionalität wird von der Open-Source betrieben [ **HiveMQ MQTT Client** ](https://github.com/hivemq/hivemq-mqtt-client) und [ **HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) Brokerbibliotheken.

 ERDDAP kann MQTT in zwei primären Möglichkeiten nutzen:

1.   **Als MQTT Client:**    ERDDAP kann Themen auf einem vorhandenen MQTT-Broker abonnieren, um Daten zu erfassen und Echtzeit-Datensätze zu erstellen.
    
2.   **Als MQTT Broker:**    ERDDAP kann seinen eigenen eingebetteten MQTT Broker hosten, so dass externe Clients Daten direkt an ihn veröffentlichen.
    

--------

##  ERDDAP als MQTT-Client

 ERDDAP kann als MQTT-Client handeln, um Themen auf einem externen oder einem eigenen eingebetteten MQTT-Broker zu abonnieren. Dies wird mit dem neuen `EDDTableFromMqt` Datensatztyp, der ähnlich dem bestehenden [ `EDDTableFromHtpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) Datensatz.

Derzeit unterstützt die Client-Implementierung nur **Anmeldung** zu Themen.

## Konfiguration: `EDDTableFromMqt` 

Um einen Datensatz zu konfigurieren, um einen MQTT-Broker zu abonnieren, definieren Sie einen Datensatz vom Typ `EDDTableFromMqt` in deiner ` datasets.xml ` Datei. Die folgenden Konfigurations-Tags sind innerhalb der ` <dataset> ` Block:

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

##  ERDDAP als MQTT Broker

 ERDDAP kann einen eingebetteten MQTT-Broker ausführen, der zwei Hauptzwecke dient:

1.   **Datenaufnahme:** Um Daten von externen MQTT-Clients zur Erstellung von Echtzeit-Datensätzen zu erhalten.
    
2.   **Mitteilungen:** Benachrichtigungen über Datensatzänderungen veröffentlichen.
    

## Einbinden der Embedded Broker

Der eingebettete MQTT-Broker ist standardmäßig deaktiviert. Um es zu aktivieren, fügen Sie das folgende Flag hinzu `Setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> wahr </enableMqttBroker> `  

## Broker Configuration & Data Directors

Sie können benutzerdefinierte Verzeichnisse für die Konfiguration des Brokers und Datendateien in `Setup.xml` . Wenn diese Tags leer gelassen werden, ERDDAP verwendet die Standardverzeichnisse, die von der HiveMQ-Bibliothek angegeben werden. Für erweiterte Konfigurationsdetails, einschließlich Protokollierung und Erweiterungen, wenden Sie sich bitte an den offiziellen [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Use Case 1: Datenerfassung von MQTT Clients

Um einen Echtzeit-Datensatz mit dem eingebetteten Broker zu erstellen, können Sie eine `EDDTableFromMqt` Datensatz (wie oben beschrieben) In den Warenkorb ERDDAP Beispiel, um mit einem eigenen lokalen Broker zu verbinden. Externe MQTT-Clients können dann Daten dazu veröffentlichen ERDDAP Broker, die `EDDTableFromMqt` dataset abonniert und ingest.

## Use Case 2: Veröffentlichung von Datensatz Änderungsmeldungen

 ERDDAP kann konfiguriert werden, um Benachrichtigungen über Datensatzänderungen zu veröffentlichen (z.B. Updates oder Nachladungen) zu einem Thema zu einem MQTT-Broker. Zunächst stellen Sie sicher, dass der Broker aktiviert ist oder ein externer verfügbar ist. Dann aktivieren Sie die Benachrichtigung Funktion in `Setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> wahr </publishMqttNotif> `  

Wenn diese Funktion aktiviert ist, ERDDAP verwendet einen internen MQTT-Client, um die Nachrichten zu veröffentlichen. Die Verbindungseinstellungen für diesen Client können in `Setup.xml` . Die folgende Tabelle listet die verfügbaren Einstellungen und deren Standardwerte auf.

 | Tag | Typ | Standardwert | Warenbezeichnung | 
 | --------------------- | ----- | ------------- | ------------------------- | 
 |   ` <mqttServerHost> `           | Zeichen |   `Lokalhost`         | Der Broker-Host, um Benachrichtigungen zu veröffentlichen. | 
 |   ` <mqttServerPort> `           | in |   `1883`              | Der Hafen des Benachrichtigungsbrokers. | 
 |   ` <mqttClientId> `             | Zeichen |   `Erddap-Client`     | Die Client-ID für den Benachrichtigungsverleger. | 
 |   ` <mqttUserName> `             | Zeichen |   `Erddap-username`   | Der Benutzername für den Benachrichtigungsverleger. | 
 |   ` <mqttPassword> `             | Zeichen |   `Erddap-Passwort`   | Das Passwort für den Benachrichtigungsverleger. | 
 |   ` <mqttSsl> `                  | Borolen |   `falsch`             | Verwenden Sie SSL/TLS für die Benachrichtigungsverbindung. | 
 |   ` <mqttKeepAlive> `            | in |   `60.`                | Halteintervall in Sekunden. | 
 |   ` <mqttCleanStart> `           | Borolen |   `falsch`             | Beginnen Sie mit einer sauberen Sitzung (kein beharrlicher Sitzungszustand) . | 
 |   ` <mqttSessionExpiry> `        | in |   `10.`                | Sitzungsablauf in Sekunden. | 
 |   ` <mqttConnectionTimeout> `    | in |   `10.`                | Verbindungszeit in Sekunden. | 
 |   ` <mqttAutomaticReconnect> `   | Borolen |   `wahr`              | Automatische Wiederverbindung, wenn die Verbindung verloren geht. | 


--------

## Umwelt Variable Parsing in ` datasets.xml ` 

Es wurde eine neue Funktion eingeführt, die die Verwendung von Umgebungsvariablen innerhalb der ` datasets.xml ` . Das ist **standardmäßig aktiviert** .

Um diese Funktionalität zu deaktivieren, fügen Sie das folgende Flag hinzu `Setup.xml` :

xml

 ` <enableEnvParsing> falsch </enableEnvParsing> ` 
