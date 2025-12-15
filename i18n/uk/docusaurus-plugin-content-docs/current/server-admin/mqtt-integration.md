#  ERDDAP Інтеграція MQTT

 ERDDAP Тепер включає підтримку протоколу MQTT для полегшення в режимі реального часу введення даних та повідомлень. Цей функціонал працює на відкритому ресурсі [ **Клієнт HiveMQ MQTT** ](https://github.com/hivemq/hivemq-mqtt-client) і [ **HiveMQ Презентація спільноти** ](https://github.com/hivemq/hivemq-community-edition) бібліотеки брокера.

 ERDDAP може використовувати MQTT двома основними способами:

1.   **Клієнт MQTT:**    ERDDAP може підписатися на теми на наявний брокер MQTT для отримання даних і створення даних в режимі реального часу.
    
2.   **Як брокер MQTT:**    ERDDAP може розмістити свої власні вбудовані брокери MQTT, що дозволяє зовнішнім клієнтам публікувати дані безпосередньо до нього.
    

-------

##  ERDDAP як клієнт MQTT

 ERDDAP може діяти як клієнт MQTT для підписки на теми на зовнішній або власний вбудований брокер MQTT. Це досягається за допомогою нового `EDDTableЗ альбомуMqtt` тип даних, який відповідає існуючим [ `EDDTableЗ альбомуHttpGet` ](/docs/server-admin/datasets#eddtablefromhttpget) датасет.

В даний час підтримка клієнтів **Підприскування** на теми.

## Налаштування: `EDDTableЗ альбомуMqtt` 

Для налаштування набору даних для підписки на брокер MQTT, визначення розміру даних `EDDTableЗ альбомуMqtt` у вас ` datasets.xml ` файл. Теґи нижче конфігурації доступні в межах ` <dataset> ` блок:

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

-------

##  ERDDAP як MQTT брокер

 ERDDAP може запустити вбудований брокер MQTT, який обслуговує два основних цілі:

1.   **Зняття даних:** Щоб отримувати дані, опубліковані зовнішніми клієнтами MQTT для створення даних в режимі реального часу.
    
2.   **Повідомлення:** Публікувати повідомлення про зміни даних.
    

## Включення вбудованого брокера

Вбудований брокер MQTT відключений за замовчуванням. Щоб включити його, додайте наступний прапор `Налаштування.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> Справедливість </enableMqttBroker> `  

## Конфігурація та управління даними брокера

Ви можете вказати спеціальні каталоги для конфігурації та файлів даних брокера в `Налаштування.xml` й Якщо ці теги залишаються порожніми, ERDDAP використовувати каталоги за замовчуванням, вказані бібліотекою HiveMQ. Для більш просунутих конфігураційних деталей, в тому числі для входу і розширення, будь ласка, зверніться до офіційної [ **HiveMQ Community Edition Вікі** ](https://github.com/hivemq/hivemq-community-edition/wiki) й
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Використання Case 1: Взяти дані від клієнтів MQTT

Для побудови в режимі реального часу за допомогою вбудованого брокера можна налаштувати `EDDTableЗ альбомуMqtt` мета (як описано вище) в межах _same_ ERDDAP наприклад, для підключення до власного місцевого брокера. Зовні клієнти MQTT можуть публікувати дані для цього ERDDAP брокер, який `EDDTableЗ альбомуMqtt` Зареєструйтеся на новини та новини.

## Використовуйте Case 2: Повідомлення про зміну даних

 ERDDAP можна налаштувати для публікації повідомлень про зміни даних (Наприклад, оновлення або перезавантаження) до теми на брокері MQTT. Для того, щоб брокер був включений або зовнішній. Потім ввімкніть функцію сповіщення `Налаштування.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> Справедливість </publishMqttNotif> `  

Коли ця функція включена, ERDDAP використовує внутрішній клієнт MQTT для публікації повідомлень. Налаштування підключення для цього клієнта можна налаштувати в `Налаштування.xml` й У таблиці нижче перераховують доступні налаштування та значення за замовчуванням.

 | Навігація | Тип | Значення за замовчуванням | Опис | 
 | ---------- | ------- | --------- | -------------- | 
 |   ` <mqttServerHost> `           | Увійти |   `Український`         | Брокер-хост для публікації повідомлень. | 
 |   ` <mqttServerPort> `           | Увійти |   `1883 р.`              | Порт повідомлення брокера. | 
 |   ` <mqttClientId> `             | Увійти |   `ерддап-клієнт`     | Ідентифікатор клієнта для видавця повідомлень. | 
 |   ` <mqttUserName> `             | Увійти |   `erddap-користувач`   | Ім'я користувача для видавця повідомлень. | 
 |   ` <mqttPassword> `             | Увійти |   `erddap-password`   | Пароль для видавця повідомлень. | 
 |   ` <mqttSsl> `                  | болеан |   `Логін`             | Використовуйте SSL/TLS для підключення повідомлень. | 
 |   ` <mqttKeepAlive> `            | Увійти |   `60 хв`                | Проміжок часу. | 
 |   ` <mqttCleanStart> `           | болеан |   `Логін`             | Почати з чистою сеансом (не стійкий стан сеансу) й | 
 |   ` <mqttSessionExpiry> `        | Увійти |   `10 хв`                | Проміжок часу сеансу за секундами. | 
 |   ` <mqttConnectionTimeout> `    | Увійти |   `10 хв`                | Час підключення за секундами. | 
 |   ` <mqttAutomaticReconnect> `   | болеан |   `Справедливість`              | Автоматично від'єднатися, якщо з'єднання втрачено. | 


-------

## Вихровинна мінлива батьківщина в ` datasets.xml ` 

Введено нову функцію, яка дозволяє використовувати змінні середовища в межах ` datasets.xml ` й Це **За замовчуванням** й

Щоб вимкнути цю функціональність, додайте наступний прапор `Налаштування.xml` :

Логін

 ` <enableEnvParsing> Логін </enableEnvParsing> ` 
