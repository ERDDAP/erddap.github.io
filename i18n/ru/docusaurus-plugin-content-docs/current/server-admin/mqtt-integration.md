#  ERDDAP Интеграция MQTT

 ERDDAP Теперь включает поддержку протокола MQTT для облегчения приема данных и уведомлений в режиме реального времени. Эта функциональность поддерживается открытым исходным кодом [ **Клиент MQTT компании HiveMQ** ](https://github.com/hivemq/hivemq-mqtt-client) и [ **Издание сообщества HiveMQ** ](https://github.com/hivemq/hivemq-community-edition) Брокерские библиотеки.

 ERDDAP MQTT можно использовать двумя основными способами:

1.   **Как клиент MQTT:**    ERDDAP Вы можете подписаться на темы существующего брокера MQTT, чтобы проглотить данные и создать наборы данных в реальном времени.
    
2.   **Как брокер MQTT:**    ERDDAP Встроенный MQTT-брокер позволяет внешним клиентам публиковать данные непосредственно в нем.
    

--------

##  ERDDAP Как клиент MQTT

 ERDDAP Вы можете выступать в качестве клиента MQTT для подписки на темы на внешнем или собственном встроенном брокере MQTT. Это достигается с помощью нового `EDDTableFromMqtt` тип набора данных, который функционирует аналогично существующему [ `EDDTable FromHttpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) набор данных.

В настоящее время реализация клиента поддерживает только **подписывать** По темам.

## Конфигурация: `EDDTableFromMqtt` 

Чтобы настроить набор данных для подписки на брокера MQTT, определите тип набора данных `EDDTableFromMqtt` в твоем ` datasets.xml ` Файл. Следующие теги конфигурации доступны в ` <dataset> ` Блок:

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

##  ERDDAP Как брокер MQTT

 ERDDAP Можно запустить встроенный брокер MQTT, который служит двум основным целям:

1.   **Потребление данных:** Получать данные, опубликованные внешними клиентами MQTT, для создания наборов данных в режиме реального времени.
    
2.   **Уведомления:** Публикация уведомлений об изменениях набора данных.
    

## Внедрение встроенного брокера

Встроенный брокер MQTT по умолчанию отключен. Для этого добавьте следующий флаг: `Настройка.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> истинный </enableMqttBroker> `  

## Брокерская конфигурация и каталоги данных

Вы можете указать пользовательские каталоги для конфигурации брокера и файлы данных в `Настройка.xml` . Если эти метки останутся пустыми, ERDDAP будет использовать каталоги по умолчанию, указанные библиотекой HiveMQ. Для более продвинутых деталей конфигурации, включая журналирование и расширения, пожалуйста, обратитесь к официальному лицу. [ **Разработчик: Wiki Community Edition** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Случай 1: Получение данных от клиентов MQTT

Чтобы создать набор данных в реальном времени с помощью встроенного брокера, вы можете настроить `EDDTableFromMqtt` набор данных (как описано выше) Внутри одного и того же ERDDAP Например, для подключения к своему местному брокеру. Внешние клиенты MQTT могут публиковать данные для этого. ERDDAP брокером, который `EDDTableFromMqtt` Набор данных будет подписываться и глотать.

## Пример использования 2: Публикация уведомлений об изменении набора данных

 ERDDAP может быть сконфигурирован для публикации уведомлений об изменениях набора данных (например, обновления или перезагрузки) Тема для обсуждения у брокера MQTT. Во-первых, убедитесь, что брокер включен или доступен внешний. Затем включить функцию уведомления в `Настройка.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> истинный </publishMqttNotif> `  

Когда эта функция включена, ERDDAP Использует внутренний клиент MQTT для публикации сообщений. Настройки соединения для этого клиента могут быть настроены в `Настройка.xml` . В таблице ниже перечислены доступные настройки и их значения по умолчанию.

 | Тег | Тип | Ценность по умолчанию | Описание | 
 | ------------------------- | ------ | --------------- | -------------------------------------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | струна |   `местный житель`         | Брокер-хостинг для публикации уведомлений. | 
 |   ` <mqttServerPort> `           | инт |   `1883`              | Порт брокера уведомлений. | 
 |   ` <mqttClientId> `             | струна |   `клиент`     | ID клиента для издателя уведомлений. | 
 |   ` <mqttUserName> `             | струна |   `имя пользователя`   | Имя пользователя издателя уведомлений. | 
 |   ` <mqttPassword> `             | струна |   `пароль erddap`   | Пароль для издателя уведомлений. | 
 |   ` <mqttSsl> `                  | булевый |   `ложный`             | Используйте SSL/TLS для подключения уведомлений. | 
 |   ` <mqttKeepAlive> `            | инт |   `60`                | Удерживайте интервал в секундах. | 
 |   ` <mqttCleanStart> `           | булевый |   `ложный`             | Начните с чистого сеанса (Никакого постоянного сессионного состояния) . | 
 |   ` <mqttSessionExpiry> `        | инт |   `1010`                | Интервал окончания сеанса в секундах. | 
 |   ` <mqttConnectionTimeout> `    | инт |   `1010`                | Время подключения в секундах. | 
 |   ` <mqttAutomaticReconnect> `   | булевый |   `истинный`              | Автоматическое переподключение, если соединение потеряно. | 


--------

## Вариабельность окружающей среды в ` datasets.xml ` 

Введена новая функция, позволяющая использовать переменные среды внутри ` datasets.xml ` . Это **включено по умолчанию** .

Чтобы отключить эту функцию, добавьте следующий флаг: `Настройка.xml` :

xml

 ` <enableEnvParsing> ложный </enableEnvParsing> ` 
