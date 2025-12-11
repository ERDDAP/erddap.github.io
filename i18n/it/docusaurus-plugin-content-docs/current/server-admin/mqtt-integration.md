#  ERDDAP Integrazione MQTT

 ERDDAP ora include il supporto per il protocollo MQTT per facilitare l'ingestione e le notifiche dei dati in tempo reale. Questa funzionalità è alimentata da open-source [ **Client MQTT HiveMQ** ](https://github.com/hivemq/hivemq-mqtt-client) e [ **Edizione comunitaria HiveMQ** ](https://github.com/hivemq/hivemq-community-edition) librerie di broker.

 ERDDAP può sfruttare MQTT in due modi principali:

1.   **Come client MQTT:**    ERDDAP può sottoscrivere argomenti su un broker MQTT esistente per ingerire i dati e creare set di dati in tempo reale.
    
2.   **Come Broker MQTT:**    ERDDAP può ospitare il proprio broker MQTT incorporato, permettendo ai clienti esterni di pubblicare i dati direttamente ad esso.
    

----------

##  ERDDAP come client MQTT

 ERDDAP può agire come client MQTT per sottoscrivere argomenti su un broker MQTT esterno o suo embedded. Questo si ottiene utilizzando il nuovo `EDDTable FromMqt` tipo di dataset, che funziona in modo simile all'esistente `EDDTableDaHttpGet` Dataset.

Attualmente, l'implementazione client supporta solo **sottoscrizione** a argomenti.

## Configurazione: `EDDTable FromMqt` 

Per configurare un dataset per iscriversi a un broker MQTT, definire un dataset di tipo `EDDTable FromMqt` nel tuo ` datasets.xml ` file. I seguenti tag di configurazione sono disponibili all'interno ` <dataset> ` blocco:

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

----------

##  ERDDAP come un broker MQTT

 ERDDAP può eseguire un broker MQTT incorporato, che serve due scopi principali:

1.   **Ingestione dei dati:** Per ricevere i dati pubblicati da client MQTT esterni per creare set di dati in tempo reale.
    
2.   **Notifica:** Per pubblicare le notifiche sulle modifiche del dataset.
    

## Attivare il Broker Embedded

Il broker MQTT incorporato è disabilitato per impostazione predefinita. Per abilitarlo, aggiungere la seguente bandiera per `setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> vero </enableMqttBroker> `  

## Broker Configuration & Data Directories

È possibile specificare directory personalizzate per la configurazione del broker e i file di dati in `setup.xml` . Se questi tag sono lasciati vuoti, ERDDAP userà le directory predefinite specificate dalla libreria HiveMQ. Per dettagli di configurazione più avanzati, tra cui logging e le estensioni, fare riferimento al funzionario [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Utilizzare il caso 1: Ingestione dei dati dai client MQTT

Per creare un dataset in tempo reale utilizzando il broker incorporato, è possibile configurare un `EDDTable FromMqt` set di dati (come descritto sopra) all'interno del _same_ ERDDAP istanza per connettersi al proprio broker locale . I client MQTT esterni possono quindi pubblicare i dati a questo scopo ERDDAP broker, che il `EDDTable FromMqt` dataset si iscriverà e ingerirà.

## Utilizzare il caso 2: Pubblicazione Dataset Modifica notifiche

 ERDDAP può essere configurato per pubblicare le notifiche sulle modifiche di dataset (ad esempio, aggiornamenti o ricarica) a un argomento su un broker MQTT. In primo luogo, assicurarsi che il broker è abilitato o uno esterno è disponibile. Quindi, abilitare la funzione di notifica in `setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> vero </publishMqttNotif> `  

Quando questa funzione è abilitata, ERDDAP utilizza un client MQTT interno per pubblicare i messaggi. Le impostazioni di connessione per questo cliente possono essere personalizzate `setup.xml` . La tabella sottostante elenca le impostazioni disponibili e i valori predefiniti.

 | Tag: | Tipo | Valore predefinito | Descrizione | 
 | ------------------------- | ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | stringa |   `localhosting`         | L'host broker di pubblicare le notifiche. | 
 |   ` <mqttServerPort> `           | In |   `1883`              | Il porto del broker di notifica. | 
 |   ` <mqttClientId> `             | stringa |   `erddap-client`     | L'ID client per l'editore di notifica. | 
 |   ` <mqttUserName> `             | stringa |   `erddap-username`   | Il nome utente per l'editore di notifica. | 
 |   ` <mqttPassword> `             | stringa |   `erddap-password`   | La password per l'editore di notifica. | 
 |   ` <mqttSsl> `                  | boolean |   `falso`             | Utilizzare SSL/TLS per la connessione di notifica. | 
 |   ` <mqttKeepAlive> `            | In |   `60`                | Intervallo di mangime in pochi secondi. | 
 |   ` <mqttCleanStart> `           | boolean |   `falso`             | Inizia con una sessione pulita (nessun stato di sessione persistito) . | 
 |   ` <mqttSessionExpiry> `        | In |   `10`                | Intervallo di scadenza di sessione in secondi. | 
 |   ` <mqttConnectionTimeout> `    | In |   `10`                | Tempo di connessione in pochi secondi. | 
 |   ` <mqttAutomaticReconnect> `   | boolean |   `vero`              | Ricollegare automaticamente se la connessione è persa. | 


----------

## Ambiente Variabile Parsing ` datasets.xml ` 

È stata introdotta una nuova funzionalità che consente l'uso di variabili di ambiente all'interno ` datasets.xml ` . Questo è **abilitato per impostazione predefinita** .

Per disabilitare questa funzionalità, aggiungere la seguente bandiera a `setup.xml` :

xml

 ` <enableEnvParsing> falso </enableEnvParsing> ` 
