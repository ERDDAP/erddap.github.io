#  ERDDAP MQTT-integrasjon

 ERDDAP Nå inkluderer støtte for MQTT-protokollen for å lette datainntak og varsler i sanntid. Denne funksjonaliteten drives av åpen kilde [ **HiveMQ MQTT-klient** ](https://github.com/hivemq/hivemq-mqtt-client) og [ **HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) megler biblioteker.

 ERDDAP kan utnytte MQTT på to primære måter:

1.   **Som MQTT-klient:**    ERDDAP kan abonnere på emner på en eksisterende MQTT megler å innta data og opprette sanntidsdatasett.
    
2.   **Som MQTT Broker:**    ERDDAP kan være vert for sin egen innebygde MQTT megler, slik at eksterne klienter kan publisere data direkte til det.
    

-----------

##  ERDDAP som MQTT-klient

 ERDDAP kan fungere som en MQTT-klient for å abonnere på emner på en ekstern eller sin egen innebygd MQTT-megler. Dette oppnås ved hjelp av det nye `EDDTableFraMqtt` Datasett, som fungerer på samme måte som eksisterende `EDDTableFraHttpGet` - Datasett.

Kundens implementering støtter for tiden kun **abonnerer** til emner.

## Oppsett: `EDDTableFraMqtt` 

For å konfigurere et datasett for å abonnere på en MQTT megler, definere et datasett av type `EDDTableFraMqtt` i din ` datasets.xml ` fil. Følgende konfigurasjonsmerker er tilgjengelige i ` <dataset> ` blokk:

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

##  ERDDAP som MQTT Broker

 ERDDAP kan kjøre en innebygd MQTT megler, som tjener to hovedformål:

1.   **Opplysninger:** For å motta data publisert av eksterne MQTT-klienter for å skape datasett i sanntid.
    
2.   **Varsel:** Å publisere varsler om endringer i datasett.
    

## Aktivere den innebygde brokeren

Den innebygde MQTT megleren er deaktivert som standard. For å aktivere det, legg til følgende flagg i `config.xml` :)

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> sant </enableMqttBroker> `  

## Broker Configuration & Data Directorys

Du kan angi egendefinerte mapper for meglerens konfigurasjon og datafiler i `config.xml` .. Hvis disse taggene er tomme, ERDDAP vil bruke standardmappene som er angitt i HiveMQ-biblioteket. For mer avanserte konfigurasjonsdetaljer, inkludert logging og utvidelser, vennligst se den offisielle [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) ..
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Bruk Case 1: Utstedelse av data fra MQTT-klienter

For å bygge et datasett i sanntid ved hjelp av den innebygde megleren, kan du konfigurere en `EDDTableFraMqtt` Datasett (som beskrevet ovenfor) i _same_ ERDDAP eksempel å koble til sin egen lokale megler. Eksterne MQTT-klienter kan deretter publisere data til dette ERDDAP megler, som `EDDTableFraMqtt` Datasett vil abonnere på og innta.

## Bruk Case 2: Publishing Dataset Endre varsler

 ERDDAP kan konfigureres til å publisere varsler om endringer i datasett (For eksempel oppdateringer eller reloader) til et emne på en MQTT megler. For det første, sørg for at megleren er aktivert eller en ekstern er tilgjengelig. Deretter kan du aktivere varslingsfunksjonen i `config.xml` :)

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> sant </publishMqttNotif> `  

Når denne funksjonen er aktivert, ERDDAP bruker en intern MQTT-klient til å publisere meldingene. Tilkoblingsinnstillingene for denne klienten kan tilpasses `config.xml` .. Tabellen nedenfor viser tilgjengelige innstillinger og standardverdier.

 | Tagg | Type | Standardverdi | Beskrivelse | 
 | -... | ------- | -... | Jeg vet ikke. | 
 |   ` <mqttServerHost> `           | streng |   `localhost`         | Meglerens vert å publisere varsler til. | 
 |   ` <mqttServerPort> `           | Interessert |   `1883`              | Havnen til varslingsmegleren. | 
 |   ` <mqttClientId> `             | streng |   `erddap-client`     | Kunde-ID for meldingsutgiveren. | 
 |   ` <mqttUserName> `             | streng |   `erddap-brukernavn`   | Brukernavn for meldingsutgiveren. | 
 |   ` <mqttPassword> `             | streng |   `erddap-passord`   | Passord for meldingsutgiveren. | 
 |   ` <mqttSsl> `                  | boolsk |   `falsk`             | Bruk SSL/TLS til varslingstilkoblingen. | 
 |   ` <mqttKeepAlive> `            | Interessert |   `60`                | Hold-alive intervall i sekunder. | 
 |   ` <mqttCleanStart> `           | boolsk |   `falsk`             | Start med en ren sesjon (Ingen vedvarande sesjonstilstand) .. | 
 |   ` <mqttSessionExpiry> `        | Interessert |   `10`                | Sesjon utløpsintervall i sekunder. | 
 |   ` <mqttConnectionTimeout> `    | Interessert |   `10`                | Tilkoblingstid i sekunder. | 
 |   ` <mqttAutomaticReconnect> `   | boolsk |   `sant`              | Koble automatisk igjen hvis tilkoblingen går tapt. | 


-----------

## Miljøvariabel Parsing i ` datasets.xml ` 

En ny funksjon er introdusert som tillater bruk av miljøvariabler i ` datasets.xml ` .. Dette er **aktivert som standard** ..

Hvis du vil deaktivere denne funksjonen, kan du legge til følgende flagg i `config.xml` :)

xml

 ` <enableEnvParsing> falsk </enableEnvParsing> ` 
