#  ERDDAP MQTT Entegrasyonu

 ERDDAP Şimdi, MQTT protokolü için gerçek zamanlı verileri kesinti ve bildirimleri kolaylaştırmak için destek içerir. Bu işlevsellik açık kaynak tarafından desteklenir [ **HiveMQ MQTT Müşteri** ](https://github.com/hivemq/hivemq-mqtt-client) ve [ **HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) broker kütüphaneleri.

 ERDDAP MQTT'den iki birincil şekilde yararlanabilir:

1.   **Bir MQTT Müşterisi Olarak:**    ERDDAP Mevcut bir MQTT brokerine verileri çekmek ve gerçek zamanlı veri setleri oluşturmak için abone olabilir.
    
2.   **Bir MQTT Broker olarak:**    ERDDAP Kendi gömülü MQTT brokerine evlenebilir, dış müşterilere doğrudan verilere yayınlamasına izin verebilir.
    

►

##  ERDDAP Bir MQTT Müşterisi Olarak

 ERDDAP Bir MQTT müşteri olarak dış veya kendi gömülü MQTT brokerine abone olmak için hareket edebilir. Bu yeni kullanılarak elde edilir `EDDTable FromMqtttt` Mevcut verilere benzer şekilde işlev gösteren veri kümesi tipi, [ `EDDTable FromHttpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) dataset.

Şu anda, müşteri uygulamaları yalnızca destekler **alt** konulara.

## Kurulum: `EDDTable FromMqtttt` 

Bir MQTT brokerine abone olmak için bir veri kümesi yapılandırın, bir veri kümesinin bir veri kümesi tanımlayın `EDDTable FromMqtttt` Senin içinde ` datasets.xml ` Dosya. Aşağıdaki yapılandırma etiketleri içinde mevcuttur ` <dataset> ` Blok: blok:

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

►

##  ERDDAP Bir MQTT Broker

 ERDDAP İki ana amaçlara hizmet eden gömülü bir MQTT brokeri çalıştırabilirsiniz:

1.   **Data Ingestion:** Gerçek zamanlı veri setleri oluşturmak için dış MQTT müşterileri tarafından yayınlanan verileri almak.
    
2.   **Bildirimler:** Dataset değişiklikleri hakkında bildirimleri yayınlamak.
    

## Gömülü Broker Brokere karşı

MQTT brokeri varsayılan olarak devre dışı bırakılır. Bunu sağlamak için aşağıdaki bayrağı ekleyin `Kurulum.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek </enableMqttBroker> `  

## Rehberlik ve Data Directories

brokerin konfigürasyonu ve veri dosyaları için özel yönetmenleri belirtebilirsiniz `Kurulum.xml` . Bu etiketler boş bırakılırsa, ERDDAP HiveMQ kütüphanesi tarafından belirtilen varsayılan yönetmenleri kullanacaktır. Kayıt ve uzatmalar da dahil olmak üzere daha gelişmiş yapılandırma detayları için lütfen resmin resmine bakın [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Vaka Kullanımı 1: MQTT Müşterilerden gelen veriler

gömülü broker kullanarak gerçek zamanlı bir veri kümesi oluşturmak için, bir yapılandırma yapabilirsiniz `EDDTable FromMqtttt` Dataset (Yukarıda açıklandığı gibi) _same_ ERDDAP Örneğin kendi yerel brokerine bağlanmak. Dış MQTT müşterileri daha sonra bu verilere bunu yayınlayabilir ERDDAP broker, hangi `EDDTable FromMqtttt` Dataset abone olacak ve ingest.

## Vaka 2: Yayın Dataset Change Bildirimleri

 ERDDAP Dataset değişiklikleri hakkında bildirimleri yayınlamak için yapılandırılabilir (e.g., güncelleştirmeler veya yeniden yükler) Bir MQTT brokerinde bir konu için. İlk olarak, brokerin etkinleştirilmesi veya dış bir kişinin mevcut olmasını sağlayın. Sonra, bildirim özelliği etkinleştirin `Kurulum.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek </publishMqttNotif> `  

Bu özellik etkinleştirildiğinde, ERDDAP mesajları yayınlamak için bir iç MQTT müşteri kullanır. Bu müşteri için bağlantı ayarları özelleştirilmiş olabilir `Kurulum.xml` . Aşağıdaki tablo mevcut ayarları ve varsayılan değerlerini listeler.

 | Tag Tag | Tipi Tipi Tipi Tipi | Varsayılan değer | Açıklama | 
 | - &#33;&#33;&#33; | - ► | -- -- | - ----- --------------- | 
 |   ` <mqttServerHost> `           | dize |   `yerelhost`         | broker bildirimleri yayınlamaya ev sahipliği yaptı. | 
 |   ` <mqttServerPort> `           | int |   `1883`              | Bildirim brokerinin limanı. | 
 |   ` <mqttClientId> `             | dize |   `erddap-client`     | Bildirim yayıncısı için müşteri kimliği. | 
 |   ` <mqttUserName> `             | dize |   `erddap-username`   | Bildirim yayıncısı için kullanıcı adı. | 
 |   ` <mqttPassword> `             | dize |   `erddap-password`   | Bildirim yayıncısı için şifre. | 
 |   ` <mqttSsl> `                  | boole |   `Sahte sahte yanlış`             | Bildirim bağlantısı için SSL/TLS kullanın. | 
 |   ` <mqttKeepAlive> `            | int |   `60 60 60`                | saniyeler içinde geçici aralığı tutun. | 
 |   ` <mqttCleanStart> `           | boole |   `Sahte sahte yanlış`             | Temiz bir seansla başlayın (Hiçbir kalıcı devlet oturumu) . | 
 |   ` <mqttSessionExpiry> `        | int |   `10 10`                | Oturum saniyeler içinde aralığı. | 
 |   ` <mqttConnectionTimeout> `    | int |   `10 10`                | saniyede bağlantı zamanı. | 
 |   ` <mqttAutomaticReconnect> `   | boole |   `Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek`              | Otomatik olarak bağlantı kaybolursa yeniden bağlantı. | 


►

## Çevre Değişkenleri Parsing in in in ` datasets.xml ` 

Yeni bir özellik, çevre değişkenlerinin kullanılmasına izin veren tanıtıldı ` datasets.xml ` . İşte bu **varsayılan olarak etkinleştirilen varsayılan** .

Bu işlevselliği devre dışı bırakmak için aşağıdaki bayrağı ekleyin `Kurulum.xml` :

xml

 ` <enableEnvParsing> Sahte sahte yanlış </enableEnvParsing> ` 
