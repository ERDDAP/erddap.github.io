#  ERDDAP MQTT-integratie

 ERDDAP omvat nu ondersteuning voor het MQTT-protocol om real-time data-inname en meldingen te vergemakkelijken. Deze functionaliteit wordt aangedreven door de open-source [ **HiveMQ MQTT Client** ](https://github.com/hivemq/hivemq-mqtt-client) en [ **HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) makelaarsbibliotheken.

 ERDDAP kan MQTT op twee primaire manieren benutten:

1.   **Als een MQTT Client:**    ERDDAP kan zich abonneren op onderwerpen op een bestaande MQTT-makelaar om gegevens in te nemen en real-time datasets aan te maken.
    
2.   **Als een MQTT Broker:**    ERDDAP kan zijn eigen embedded MQTT broker hosten, zodat externe klanten om gegevens rechtstreeks te publiceren.
    

-----------

##  ERDDAP als MQTT-client

 ERDDAP kan optreden als een MQTT-cliënt om zich te abonneren op onderwerpen op een externe of zijn eigen embedded MQTT-makelaar. Dit wordt bereikt met behulp van de nieuwe `EDDTableFromMqtt` datasettype, dat op dezelfde wijze functioneert als het bestaande [ `EDDTableFromHttpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) dataset.

Momenteel ondersteunt de client implementatie alleen **abonneren** Op onderwerpen.

## Instellingen: `EDDTableFromMqtt` 

Om een dataset te configureren om zich te abonneren op een MQTT makelaar, definieer een dataset van het type `EDDTableFromMqtt` in uw ` datasets.xml ` bestand. De volgende configuratie tags zijn beschikbaar binnen de ` <dataset> ` blok:

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

##  ERDDAP als MQTT-makelaar

 ERDDAP kan een embedded MQTT-makelaar uitvoeren, die twee hoofddoelstellingen dient:

1.   **Gegevensingestie:** Gegevens ontvangen die door externe MQTT-cliënten zijn gepubliceerd voor het maken van real-time datasets.
    
2.   **Kennisgevingen:** Notificaties publiceren over datasetwijzigingen.
    

## Het inschakelen van de embedded broker

De ingebouwde MQTT-makelaar is standaard uitgeschakeld. Om het te activeren, voeg de volgende markering toe aan `setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> waar </enableMqttBroker> `  

## Broker configuratie en datamappen

U kunt aangepaste mappen opgeven voor de configuratie van de makelaar en gegevensbestanden in `setup.xml` . Als deze tags leeg blijven, ERDDAP zal de standaardmappen gebruiken die door de HiveMQ-bibliotheek zijn opgegeven. Voor meer geavanceerde configuratie details, inclusief logging en extensies, verwijzen wij u naar de officiële [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Use Case 1: Ingesting van gegevens van MQTT clients

Om een real-time dataset te bouwen met behulp van de embedded broker, kunt u een `EDDTableFromMqtt` dataset (zoals hierboven beschreven) binnen _zelfde_ ERDDAP instantie om verbinding te maken met zijn eigen lokale makelaar . Externe MQTT-cliënten kunnen dan gegevens hierover publiceren ERDDAP broker, die de `EDDTableFromMqtt` dataset zal zich abonneren op en innemen.

## Gebruik geval 2: Publishing Dataset Notificaties wijzigen

 ERDDAP kan worden geconfigureerd om meldingen over datasetwijzigingen te publiceren (Bijvoorbeeld, updates of herladen) op een onderwerp over een MQTT makelaar. Ten eerste, zorg ervoor dat de makelaar is ingeschakeld of een externe beschikbaar is. Schakel vervolgens de meldingsfunctie in `setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> waar </publishMqttNotif> `  

Wanneer deze functie is ingeschakeld, ERDDAP gebruikt een interne MQTT-client om de berichten te publiceren. De verbindingsinstellingen voor deze client kunnen worden aangepast in `setup.xml` . De tabel hieronder geeft een overzicht van de beschikbare instellingen en hun standaardwaarden.

 | Tag | Type | Standaardwaarde | Omschrijving | 
 | Onverzadigd | ------- | ----------------- | ------------------------------------------ | 
 |   ` <mqttServerHost> `           | tekenreeks |   `localhost`         | De broker host om meldingen te publiceren aan. | 
 |   ` <mqttServerPort> `           | int |   `1883`              | De haven van de kennisgevingsmakelaar. | 
 |   ` <mqttClientId> `             | tekenreeks |   `erddap-client`     | De client ID voor de notificatie uitgever. | 
 |   ` <mqttUserName> `             | tekenreeks |   `erddap-gebruikersnaam`   | De gebruikersnaam van de notificatie-uitgever. | 
 |   ` <mqttPassword> `             | tekenreeks |   `erddap-wachtwoord`   | Het wachtwoord voor de kennisgevingsuitgever. | 
 |   ` <mqttSsl> `                  | booleaans |   `onwaar`             | Gebruik SSL/TLS voor de meldingsverbinding. | 
 |   ` <mqttKeepAlive> `            | int |   `60`                | Blijf leven interval in seconden. | 
 |   ` <mqttCleanStart> `           | booleaans |   `onwaar`             | Beginnen met een schone sessie (geen aanhoudende sessiestatus) . | 
 |   ` <mqttSessionExpiry> `        | int |   `10`                | Sessie vervaldatum in seconden. | 
 |   ` <mqttConnectionTimeout> `    | int |   `10`                | Verbindings timeout in seconden. | 
 |   ` <mqttAutomaticReconnect> `   | booleaans |   `waar`              | Automatisch opnieuw verbinden als de verbinding verloren gaat. | 


-----------

## Milieu Variabele ontleden in ` datasets.xml ` 

Er is een nieuwe functie ingevoerd die het gebruik van omgevingsvariabelen binnen ` datasets.xml ` . Dit is **standaard ingeschakeld** .

Om deze functionaliteit uit te schakelen, voeg de volgende vlag toe aan `setup.xml` :

xml

 ` <enableEnvParsing> onwaar </enableEnvParsing> ` 
