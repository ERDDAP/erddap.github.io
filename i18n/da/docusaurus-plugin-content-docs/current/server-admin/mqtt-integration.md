#  ERDDAP MQTT Integration

 ERDDAP Nu indeholder understøttelse af MQTT-protokollen for at lette realtidsdataindtagelse og meddelelser. Denne funktionalitet drives af open-source [ **I nærheden af HiveMQ MQTT Client** ](https://github.com/hivemq/hivemq-mqtt-client) og og og [ **Hoteller i nærheden af HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) mæglerbiblioteker.

 ERDDAP kan udnytte MQTT på to primære måder:

1.   **Som MQTT-klient:**    ERDDAP kan abonnere på emner på en eksisterende MQTT mægler til at ingest data og oprette real-time datasets.
    
2.   **Som MQTT Broker:**    ERDDAP kan hoste sin egen indlejrede MQTT mægler, så eksterne klienter kan udgive data direkte til det.
    

-----------

##  ERDDAP som MQTT Client

 ERDDAP kan handle som en MQTT-klient til at abonnere på emner på en ekstern eller egen indlejret MQTT-mægler. Dette opnås ved hjælp af den nye `EDDTableFraMqttt` datasæt type, der fungerer lignende til den eksisterende [ `EDDTableFraHttpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) Datasæt.

I øjeblikket understøtter klientimplementeringen kun **tilmelding** til emner.

## Konfiguration: `EDDTableFraMqttt` 

At konfigurere et datasæt til at abonnere på en MQTT mægler, definere et datasæt af type `EDDTableFraMqttt` i din indbakke ` datasets.xml ` fil. Følgende konfigurationstag er tilgængelige i følgende konfigurationstag ` <dataset> ` blok:

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

 ERDDAP kan køre en integreret MQTT mægler, som tjener to hovedformål:

1.   **Data Indtagelse:** For at modtage data offentliggjort af eksterne MQTT-klienter for at skabe real-time datasæt.
    
2.   **Meddelelser:** For at udgive meddelelser om datasæt ændringer.
    

## Aktivering af indlejret mægler

Den integrerede MQTT mægler er deaktiveret som standard. Hvis du vil aktivere det, skal du tilføje følgende flag til `opsætning.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> sande sande sande sande </enableMqttBroker> `  

## Komponentering og dataansvarlige

Du kan angive brugerdefinerede mapper til mæglerens konfiguration og datafiler i `opsætning.xml` . Hvis disse tags er efterladt tomme, ERDDAP vil bruge de standardmapper, der er angivet af HiveMQ-biblioteket. For mere avancerede konfigurationsoplysninger, herunder logning og udvidelser, henvises til den officielle [ **Oversættelse af HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Brug sag 1: Indtagelse af data fra MQTT-klienter

For at opbygge et real-time datasæt ved hjælp af den indlejrede mægler, kan du konfigurere en `EDDTableFraMqttt` Datasæt (som beskrevet ovenfor) inden for _same_ ERDDAP f.eks. at oprette forbindelse til sin egen lokale mægler. Eksterne MQTT-klienter kan derefter udgive data til dette ERDDAP mægler, som `EDDTableFraMqttt` Datasæt abonnerer på og ingest.

## Brug af sag 2: Forlag Dataset Change Notifications

 ERDDAP kan konfigureres til at offentliggøre meddelelser om datasæt ændringer (f.eks. opdateringer eller genindlæsninger) til et emne på en MQTT mægler. Først skal du sikre, at mægleren er aktiveret eller en ekstern er tilgængelig. Aktiver derefter meddelelsesfunktionen i `opsætning.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> sande sande sande sande </publishMqttNotif> `  

Når denne funktion er aktiveret, ERDDAP Brug en intern MQTT-klient til at udgive meddelelserne. Forbindelsesindstillingerne for denne klient kan tilpasses i `opsætning.xml` . Tabellen nedenfor viser de tilgængelige indstillinger og deres standardværdier.

 | Tag med tag | Type Type Type Type | Standardværdi | Beskrivelse Beskrivelse Beskrivelse Beskrivelse | 
 | ------------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | streng streng |   `Lokalhost`         | broker vært for at udgive meddelelser til. | 
 |   ` <mqttServerPort> `           | int |   `1883`              | Porten af meddelelsesmægleren. | 
 |   ` <mqttClientId> `             | streng streng |   `Erddap-klient`     | Klient-id'et til meddelelsesgiveren. | 
 |   ` <mqttUserName> `             | streng streng |   `Erddap-brugernavn`   | Brugernavnet for meddelelsesgiveren. | 
 |   ` <mqttPassword> `             | streng streng |   `Erddap-password`   | Adgangskoden til meddelelsesgiveren. | 
 |   ` <mqttSsl> `                  | boolean |   `falsk`             | Brug SSL/TLS til meddelelsesforbindelsen. | 
 |   ` <mqttKeepAlive> `            | int |   `60 60 60 60`                | Holdbare interval på få sekunder. | 
 |   ` <mqttCleanStart> `           | boolean |   `falsk`             | Start med en ren session (Ingen afsluttende session tilstand) . | 
 |   ` <mqttSessionExpiry> `        | int |   `10 10`                | Session udløbsinterval på få sekunder. | 
 |   ` <mqttConnectionTimeout> `    | int |   `10 10`                | Tilslutningstid på få sekunder. | 
 |   ` <mqttAutomaticReconnect> `   | boolean |   `sande sande sande sande`              | Afbryd automatisk, hvis forbindelsen er tabt. | 


-----------

## Miljøvariabel Parsing i ` datasets.xml ` 

En ny funktion er blevet introduceret, der giver mulighed for brug af miljøvariabler inden for ` datasets.xml ` . Dette er **aktiveret som standard** .

Hvis du vil deaktivere denne funktionalitet, skal du tilføje følgende flag til `opsætning.xml` :

xml

 ` <enableEnvParsing> falsk </enableEnvParsing> ` 
