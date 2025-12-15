#  ERDDAP MQTT-integraatio

 ERDDAP MQTT-protokolla tukee nyt reaaliaikaisten tietojen hyödyntämistä ja ilmoittamista. Toiminnallisuus perustuu avoimeen lähdekoodiin [ **HiveMQ MQTT asiakas** ](https://github.com/hivemq/hivemq-mqtt-client) ja [ **HiveMQ Yhteisö** ](https://github.com/hivemq/hivemq-community-edition) Välittäjäkirjastot.

 ERDDAP MQTT:tä voidaan käyttää kahdella pääasiallisella tavalla:

1.   **MQTT-asiakkaana:**    ERDDAP voi tilata aiheita olemassa olevassa MQTT-välittäjässä hyödyntämään tietoja ja luoda reaaliaikaisia tietoaineistoja.
    
2.   **MQTT-välittäjänä:**    ERDDAP voi isännöidä omaa upotettua MQTT-välittäjää, jonka avulla ulkopuoliset asiakkaat voivat julkaista tietoja suoraan sille.
    

-----------

##  ERDDAP MQTT-asiakkaana

 ERDDAP voi toimia MQTT-asiakkaana tilaamaan aiheita ulkoisella tai omalla upotetulla MQTT-välittäjällä. Tämä saavutetaan käyttämällä uutta `EDDTableFromMqtt` tietotyyppi, joka toimii samalla tavalla kuin nykyinen [ `EdDTableFromHttpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) Dataa.

Tällä hetkellä asiakaspalvelu tukee vain **subscribing** aiheita.

## Konfiguraatio: `EDDTableFromMqtt` 

Määrittää tietoaineiston tilaamaan MQTT-välittäjä, määrittää tyypin tietoaineisto. `EDDTableFromMqtt` sinun sisälläsi ` datasets.xml ` tiedosto. Seuraavat konfiguraatiot ovat saatavilla ` <dataset> ` Blokki:

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

##  ERDDAP MQTT-välittäjänä

 ERDDAP Voit käyttää upotettua MQTT-välittäjää, joka palvelee kahta päätarkoitusta:

1.   **Datan ingesointi:** Saadakseen ulkoisten MQTT-asiakkaiden julkaisemia tietoja reaaliaikaisten tietoaineistojen luomiseksi.
    
2.   **Ilmoitukset:** julkaista ilmoituksia tietoaineiston muutoksista.
    

## Sulautettu välittäjä

Sulautettu MQTT-välittäjä on pois käytöstä oletusarvoisesti. Sen mahdollistamiseksi lisää seuraava lippu `Asennus.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> Todellista </enableMqttBroker> `  

## Broker Configuration & Data Directorys Näytä tarkat tiedot

Voit määrittää räätälöityjä hakemistoja välittäjän konfigurointiin ja tietotiedostoihin `Asennus.xml` . Jos ne ovat tyhjät, ERDDAP käyttää HiveMQ-kirjaston määrittämiä oletushakemistoja. Lisätietoja, mukaan lukien kirjautuminen ja laajennukset, voit tutustua virallisiin [ **HiveMQ Community Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Käyttötapaus 1: Tietojen yhdistäminen MQTT-asiakkailta

Reaaliaikaisen tietoaineiston rakentaminen sulautetun välittäjän avulla voit määrittää `EDDTableFromMqtt` Data (Kuten edellä on kuvattu) _sama_ ERDDAP muodostaa yhteyden omaan paikalliseen välittäjäänsä. Ulkopuoliset MQTT-asiakkaat voivat julkaista tietoja tähän ERDDAP välittäjä, jonka `EDDTableFromMqtt` Tiedot merkitsevät ja nielevät.

## Tapaus 2: Tietojen muutosilmoitusten julkaiseminen

 ERDDAP voidaan määrittää julkaisemaan ilmoituksia tietoaineiston muutoksista (esim. päivitykset tai lataukset) aiheena MQTT-välittäjä. Varmista ensin, että välittäjä on käytössä tai ulkoinen on käytettävissä. Ota sitten käyttöön ilmoitusominaisuus `Asennus.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> Todellista </publishMqttNotif> `  

Kun tämä ominaisuus otetaan käyttöön, ERDDAP käyttää sisäistä MQTT-asiakasta viestien julkaisemiseen. Tämän asiakkaan yhteysasetukset voidaan mukauttaa `Asennus.xml` . Alla olevassa taulukossa luetellaan käytettävissä olevat asetukset ja niiden oletusarvot.

 | Tag | Tyyppi | Oletusarvo | Kuvaus | 
 | ----------------------- | ------- | --------------- | ------------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | string |   `Paikallinen isäntä`         | Välittäjä julkaisee ilmoitukset. | 
 |   ` <mqttServerPort> `           | Sisään |   `1883`              | Ilmoituksen välittäjän satama. | 
 |   ` <mqttClientId> `             | string |   `Erddap-asiakas`     | Asiakastunnus ilmoituksen julkaisijalle. | 
 |   ` <mqttUserName> `             | string |   `Erddap-käyttäjätunnus`   | Ilmoituksen julkaisijan käyttäjätunnus. | 
 |   ` <mqttPassword> `             | string |   `Erddap-password`   | Ilmoituksen julkaisijan salasana. | 
 |   ` <mqttSsl> `                  | Boolee |   `Väärin väärä`             | Käytä SSL/TLS-yhteyttä ilmoitukseen. | 
 |   ` <mqttKeepAlive> `            | Sisään |   `60`                | Jatka elämää sekunneissa. | 
 |   ` <mqttCleanStart> `           | Boolee |   `Väärin väärä`             | Aloita puhtaalla istunnolla (Ei pysyvää istuntoa) . | 
 |   ` <mqttSessionExpiry> `        | Sisään |   `10 10`                | Istunnon päättymisaika sekunneissa. | 
 |   ` <mqttConnectionTimeout> `    | Sisään |   `10 10`                | Yhteysaikataulu sekunneissa. | 
 |   ` <mqttAutomaticReconnect> `   | Boolee |   `Todellista`              | Automaattinen yhteys, jos yhteys häviää. | 


-----------

## Ympäristömuuttujat ` datasets.xml ` 

Uusi ominaisuus, joka mahdollistaa ympäristömuuttujan käytön ` datasets.xml ` . Tämä on **Oletusarvon mahdollistaminen** .

Jos haluat poistaa tämän toiminnallisuuden, lisää seuraava lippu `Asennus.xml` :

xml

 ` <enableEnvParsing> Väärin väärä </enableEnvParsing> ` 
