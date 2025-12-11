#  ERDDAP Comhtháthú MQTT

 ERDDAP Áirítear anois tacaíocht do phrótacal MQTT chun ionghabháil agus fógraí sonraí fíor-ama a éascú. Tá an fheidhmiúlacht faoi thiomáint ag an oscailte-foinse [ **Cliant MQTT HiveMQ** ](https://github.com/hivemq/hivemq-mqtt-client) agus [ **Eagrán pobail HiveMQ** ](https://github.com/hivemq/hivemq-community-edition) leabharlanna bróicéir.

 ERDDAP Is féidir MQTT a ghiaráil ar dhá bhealach bunscoile:

1.   **Mar Cliant MQTT:**    ERDDAP Is féidir síntiús a íoc le topaicí ar bhróicéir MQTT atá ann cheana chun sonraí a ionghabháil agus tacair sonraí fíor-ama a chruthú.
    
2.   **Mar Bróicéir MQTT:**    ERDDAP Is féidir a óstáil a bróicéir MQTT leabaithe féin, ag ligean do chliaint seachtracha sonraí a fhoilsiú go díreach dó.
    

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

##  ERDDAP mar Cliant MQTT

 ERDDAP Is féidir gníomhú mar chliant MQTT chun síntiús a íoc le topaicí ar bhróicéir MQTT seachtrach nó leabaithe féin. Tá sé seo a bhaint amach ag baint úsáide as an nua `EDDTableFromMq` cineál tacar sonraí, a fheidhmíonn cosúil leis an atá ann cheana `Féachaint ar Fholúntais` tacar sonraí.

Faoi láthair, ní thacaíonn an cur i bhfeidhm cliaint ach amháin **Amharc ar gach eolas** le topaicí.

## Cumraíocht: `EDDTableFromMq` 

Chun tacar sonraí a chumrú chun síntiús a íoc le bróicéir MQTT, socraigh tacar sonraí de chineál `EDDTableFromMq` i do ` datasets.xml ` comhad. Tá na clibeanna cumraíochta seo a leanas ar fáil laistigh den ` <dataset> ` bloc:

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

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

##  ERDDAP mar Bróicéir MQTT

 ERDDAP Is féidir le bróicéir MQTT leabaithe a reáchtáil, a fhreastalaíonn ar dhá phríomhchuspóir:

1.   **Ionghabháil Sonraí:** Chun sonraí a fháil a d'fhoilsigh cliaint MQTT seachtracha chun tacair shonraí fíor-ama a chruthú.
    
2.   **Fógraí:** Fógraí a fhoilsiú faoi athruithe tacar sonraí.
    

## Enabling an Bróicéir Leabaithe

Tá an bróicéir MQTT leabaithe faoi mhíchumas de réir réamhshocraithe. Chun é a chumasú, cuir an bhratach seo a leanas chun `crios fuar: aon sonraí` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> fíor fíor </enableMqttBroker> `  

## Bróicéir Cumraíocht &amp; StiúrthóirÃ Sonraí

Is féidir leat a shonrú eolairí saincheaptha le haghaidh an bróicéir ar chumraíocht agus comhaid sonraí i `crios fuar: aon sonraí` . Má tá na clibeanna fágtha folamh, ERDDAP úsáid a bhaint as na heolairí réamhshocraithe sonraithe ag an leabharlann HiveMQ. Le haghaidh sonraí cumraíochta níos airde, lena n-áirítear logáil agus síntí, féach ar an oifigeach [ **Uaireadóirí macasamhail Chopard** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Úsáid Cás 1: Sonraí Ionghabháil ó Chliaint MQTT

A thógáil tacar sonraí fíor-ama ag baint úsáide as an bróicéir leabaithe, is féidir leat a chumrú `EDDTableFromMq` dataset (mar a thuairiscítear thuas) laistigh den _same_ ERDDAP mar shampla a nascadh lena bhróicéir áitiúil féin. Is féidir le cliaint MQTT Seachtrach sonraí a fhoilsiú ansin chuig seo ERDDAP bróicéir, a bhfuil an `EDDTableFromMq` Beidh tacar sonraí síntiús agus ingest.

## Bain úsáid as Cás 2: Fógraí Athrú Sonraí a fhoilsiú

 ERDDAP is féidir a chumrú fógraí a fhoilsiú faoi athruithe tacar sonraí (e.g., nuashonruithe nó athluchtuithe) topaic ar bhróicéir MQTT. Ar dtús, a chinntiú go bhfuil an bróicéir ar chumas nó tá ceann seachtrach ar fáil. Ansin, ar chumas an ghné fógra i `crios fuar: aon sonraí` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> fíor fíor </publishMqttNotif> `  

Nuair a bhíonn an ghné seo ar chumas, ERDDAP Úsáideann cliant MQTT inmheánach a fhoilsiú na teachtaireachtaí. Is féidir na socruithe nasc don chliant seo a oiriúnú i `crios fuar: aon sonraí` . Liostaíonn an tábla thíos na socruithe atá ar fáil agus a luachanna réamhshocraithe.

 | Clib Clib | Cineál Cineál Cineál cineál | Luach réamhshocraithe | Cur síos ar an Táirge | 
 | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | teaghrán |   `localhost`         | An bróicéir óstach fógraí a fhoilsiú. | 
 |   ` <mqttServerPort> `           | taiseachas aeir: fliuch |   `Níl an Tweet seo ar fáil`              | An calafort an bhróicéir fógra. | 
 |   ` <mqttClientId> `             | teaghrán |   `taiseachas aeir: fliuch`     | An ID cliant don fhoilsitheoir fógra. | 
 |   ` <mqttUserName> `             | teaghrán |   `erddap-username`   | An ainm úsáideora don fhoilsitheoir fógra. | 
 |   ` <mqttPassword> `             | teaghrán |   `erddap-password`   | An focal faire don fhoilsitheoir fógra. | 
 |   ` <mqttSsl> `                  | riachtanais uisce: measartha |   `foirm duille: oval`             | Bain úsáid as SSL / TLS don nasc fógra. | 
 |   ` <mqttKeepAlive> `            | taiseachas aeir: fliuch |   `60 60 60`                | Coinnigh-aibí eatramh i soicind. | 
 |   ` <mqttCleanStart> `           | riachtanais uisce: measartha |   `foirm duille: oval`             | Tosaigh le seisiún glan (aon stát seisiún fós) . | 
 |   ` <mqttSessionExpiry> `        | taiseachas aeir: fliuch |   `tréimhse saoil: ilbhliantúil`                | eatramh dul in éag seisiún i soicind. | 
 |   ` <mqttConnectionTimeout> `    | taiseachas aeir: fliuch |   `tréimhse saoil: ilbhliantúil`                | Ceangal timeout i soicind. | 
 |   ` <mqttAutomaticReconnect> `   | riachtanais uisce: measartha |   `fíor fíor`              | Athcheangal go huathoibríoch má tá an nasc caillte. | 


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Comhshaol Comhuainiú athraitheach i ` datasets.xml ` 

Tá gné nua tugtha isteach a ligeann úsáid athróg comhshaoil laistigh de ` datasets.xml ` . Is maith liom é **cumasaithe de réir réamhshocraithe** .

Chun an fheidhmiúlacht seo a dhíchumasú, cuir an bhratach seo a leanas chun `crios fuar: aon sonraí` :

taiseachas aeir: fliuch

 ` <enableEnvParsing> foirm duille: oval </enableEnvParsing> ` 
