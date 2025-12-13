#  ERDDAP Integrare MQTT

 ERDDAP include acum sprijin pentru protocolul MQTT pentru a facilita ingerarea și notificările datelor în timp real. Această funcționalitate este alimentată de open-source [ **HiveMQ MQTT Client** ](https://github.com/hivemq/hivemq-mqtt-client) şi [ **HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) biblioteci broker.

 ERDDAP poate influența MQTT în două moduri principale:

1.   **Ca un client MQTT:**    ERDDAP poate subscrie la subiecte pe un broker MQTT existent la ingerarea datelor și crearea seturilor de date în timp real.
    
2.   **Ca un Broker MQTT:**    ERDDAP poate găzdui propriul broker MQTT încorporat, permițând clienților externi să publice date direct către acesta.
    

-----------

##  ERDDAP în calitate de client MQTT

 ERDDAP poate acționa ca un client MQTT pentru a subscrie la subiecte pe un broker MQTT extern sau propriul său încorporat. Acest lucru se realizează folosind noul `Tabel EDD din Mqtt` tipul setului de date, care funcționează similar cu cel existent; [ `Tabel EDD de la HttpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) Set de date.

În prezent, implementarea clientului susține doar **subscrie** la subiecte.

## Configurare: `Tabel EDD din Mqtt` 

Pentru a configura un set de date pentru a subscrie la un broker MQTT, definește un set de date de tip `Tabel EDD din Mqtt` în ` datasets.xml ` Dosar. Următoarele etichete de configurare sunt disponibile în cadrul ` <dataset> ` bloc:

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

##  ERDDAP ca un Broker MQTT

 ERDDAP poate rula un broker MQTT încorporat, care servește două scopuri principale:

1.   **Ingestia datelor:** Pentru a primi date publicate de clienți externi MQTT pentru crearea seturilor de date în timp real.
    
2.   **Notificări:** Pentru a publica notificări privind modificările setului de date.
    

## Activarea brokerului încorporat

Brokerul MQTT încorporat este dezactivat în mod implicit. Pentru a permite acest lucru, adăugați următorul steag `setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> Adevărat. </enableMqttBroker> `  

## Configurație Broker & Directore de date

Puteți specifica directoare personalizate pentru configurația brokerului și fișiere de date în `setup.xml` . Dacă aceste etichete sunt lăsate goale, ERDDAP va utiliza directoarele implicite specificate de biblioteca HiveMQ. Pentru detalii de configurare mai avansate, inclusiv logare și extensii, vă rugăm să consultați oficial [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Utilizați cazul 1: Ingerarea datelor de la clienții MQTT

Pentru a construi un set de date în timp real folosind broker încorporat, puteți configura un `Tabel EDD din Mqtt` Set de date (conform descrierii de mai sus) în cadrul _același_ ERDDAP să se conecteze la propriul broker local. Clienţii externi MQTT pot apoi publica date în acest sens ERDDAP broker, care `Tabel EDD din Mqtt` Setul de date se va subscrie și ingera.

## Utilizați caseta 2: Editarea datelor Schimbă notificările

 ERDDAP pot fi configurate pentru a publica notificări despre modificările setului de date (de exemplu, actualizări sau reîncărcări) la un subiect despre un broker MQTT. În primul rând, asigurați-vă că brokerul este activat sau este disponibil unul extern. Apoi, permite funcția de notificare în `setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> Adevărat. </publishMqttNotif> `  

Când această caracteristică este activată, ERDDAP utilizează un client intern MQTT pentru a publica mesajele. Setările de conectare pentru acest client pot fi personalizate în `setup.xml` . Tabelul de mai jos enumeră setările disponibile și valorile implicite ale acestora.

 | Tag | Tip | Valoare implicită | Descriere | 
 | TRIBUNALUL | -... ----- | ------------------ | ------------------------ | 
 |   ` <mqttServerHost> `           | șir |   `gazdă locală`         | Brokerul gazdă pentru publicarea notificărilor. | 
 |   ` <mqttServerPort> `           | int |   `1883`              | Portul brokerului de notificare. | 
 |   ` <mqttClientId> `             | șir |   `erddap-client`     | ID-ul clientului pentru editorul de notificare. | 
 |   ` <mqttUserName> `             | șir |   `Nume utilizator erddap`   | Numele de utilizator al editorului de notificare. | 
 |   ` <mqttPassword> `             | șir |   `erddap-password`   | Parola pentru editorul de notificare. | 
 |   ` <mqttSsl> `                  | boolean |   `fals`             | Utilizați SSL/TLS pentru conexiunea de notificare. | 
 |   ` <mqttKeepAlive> `            | int |   `60`                | Supravieţuieşte în câteva secunde. | 
 |   ` <mqttCleanStart> `           | boolean |   `fals`             | Începeți cu o sesiune curată (nicio stare de sesiune persistentă) . | 
 |   ` <mqttSessionExpiry> `        | int |   `10`                | Intervalul de expirare a sesiunii în câteva secunde. | 
 |   ` <mqttConnectionTimeout> `    | int |   `10`                | Conexiune timeout în câteva secunde. | 
 |   ` <mqttAutomaticReconnect> `   | boolean |   `Adevărat.`              | Reconectați automat dacă conexiunea este pierdută. | 


-----------

## Variabile de mediu Parsing in ` datasets.xml ` 

A fost introdusă o nouă caracteristică care permite utilizarea variabilelor de mediu în cadrul ` datasets.xml ` . Aceasta este **activat implicit** .

Pentru a dezactiva această funcționalitate, adăugați următorul steag `setup.xml` :

xml

 ` <enableEnvParsing> fals </enableEnvParsing> ` 
