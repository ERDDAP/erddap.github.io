#  ERDDAP Integracja MQTT

 ERDDAP obecnie obejmuje wsparcie dla protokołu MQTT, aby ułatwić przyjmowanie danych w czasie rzeczywistym i powiadomienia. Ta funkcjonalność jest zasilana przez open-source [ **HiveMQ MQTT Client** ](https://github.com/hivemq/hivemq-mqtt-client) oraz [ **HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) biblioteki brokerskie.

 ERDDAP może wykorzystać MQTT na dwa podstawowe sposoby:

1.   **Jako klient MQTT:**    ERDDAP może subskrybować tematy na istniejącym brokerze MQTT do przyjmowania danych i tworzenia zbiorów danych w czasie rzeczywistym.
    
2.   **Jako MQTT Broker:**    ERDDAP może prowadzić własny wbudowany broker MQTT, umożliwiający klientom zewnętrznym publikowanie danych bezpośrednio do niego.
    

Czy...

##  ERDDAP jako klient MQTT

 ERDDAP może działać jako klient MQTT subskrybować tematy na zewnętrznych lub własnych wbudowanych MQTT broker. Jest to osiągnięte za pomocą nowego `EDDTableFromMqtt` typ zbioru danych, który działa podobnie do istniejącego `EDDTableFromHttpGet` zestaw danych.

Aktualnie, implementacja klienta obsługuje tylko **subskrypcja** do tematów.

## Konfiguracja: `EDDTableFromMqtt` 

Aby skonfigurować zestaw danych do subskrypcji brokera MQTT, zdefiniuj zestaw danych typu `EDDTableFromMqtt` w ` datasets.xml ` plik. Poniższe znaczniki konfiguracyjne są dostępne w ` <dataset> ` blok:

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

Czy...

##  ERDDAP jako MQTT Broker

 ERDDAP może uruchamiać wbudowanego brokera MQTT, który służy dwóm głównym celom:

1.   **Spożycie danych:** Do otrzymywania danych publikowanych przez zewnętrznych klientów MQTT do tworzenia zbiorów danych w czasie rzeczywistym.
    
2.   **Powiadomienia:** Publikowanie powiadomień o zmianach w zbiorze danych.
    

## Włączenie wbudowanego brokera

Wbudowany broker MQTT jest domyślnie wyłączony. Aby to umożliwić, dodaj następującą flagę `setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> prawda </enableMqttBroker> `  

## Konfiguracja i katalogi danych brokera

Możesz podać własne katalogi dla plików konfiguracyjnych i danych brokera w `setup.xml` . Jeśli te znaczniki pozostaną puste, ERDDAP będzie używać domyślnych katalogów określonych w bibliotece HiveMQ. Aby uzyskać bardziej zaawansowane szczegóły konfiguracji, w tym logowanie i rozszerzenia, należy zapoznać się z oficjalnym [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Przypadek użycia 1: Dane do pobrania od klientów MQTT

Aby zbudować zestaw danych w czasie rzeczywistym za pomocą wbudowanego brokera, można skonfigurować `EDDTableFromMqtt` zbiór danych (jak opisano powyżej) w obrębie _ tego samego _ ERDDAP instancja do połączenia się z własnym lokalnym brokerem. Zewnętrzni klienci MQTT mogą następnie publikować dane do tego ERDDAP broker, który `EDDTableFromMqtt` zestaw danych subskrybuje i połyka.

## Użyj Case 2: Publikowanie powiadomień o zmianie danych

 ERDDAP można skonfigurować, aby publikować powiadomienia o zmianach zbioru danych (np. aktualizacje lub przeładunki) na temat brokera MQTT. Po pierwsze, upewnij się, że broker jest włączony lub zewnętrzny jest dostępny. Wówczas włącz opcję powiadomienia w `setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> prawda </publishMqttNotif> `  

Kiedy ta funkcja jest włączona, ERDDAP używa wewnętrznego klienta MQTT do publikowania wiadomości. Ustawienia połączenia dla tego klienta można dostosować w `setup.xml` . Poniższa tabela zawiera listę dostępnych ustawień i ich wartości domyślne.

 | Znacznik | Rodzaj | Wartość domyślna | Opis | 
 | To... | Proszę. | - Nie. | &#123;C: $aaccff&#125; Tłumaczenie: | 
 |   ` <mqttServerHost> `           | ciąg |   `localhost`         | Host broker do publikowania powiadomień. | 
 |   ` <mqttServerPort> `           | int |   `1883`              | Port brokera powiadomień. | 
 |   ` <mqttClientId> `             | ciąg |   `erddap- client`     | Identyfikator klienta dla wydawcy powiadomień. | 
 |   ` <mqttUserName> `             | ciąg |   `erddap- username`   | Nazwa użytkownika dla wydawcy powiadomień. | 
 |   ` <mqttPassword> `             | ciąg |   `erddap- haslo`   | Hasło dla wydawcy powiadomień. | 
 |   ` <mqttSsl> `                  | boolean |   `false`             | Użyj SSL / TLS do połączenia powiadomienia. | 
 |   ` <mqttKeepAlive> `            | int |   `60`                | Utrzymać żywą przerwę w ciągu kilku sekund. | 
 |   ` <mqttCleanStart> `           | boolean |   `false`             | Zacznij od czystej sesji (brak utrzymującego się stanu sesji) . | 
 |   ` <mqttSessionExpiry> `        | int |   `10`                | Czas ważności sesji w sekundach. | 
 |   ` <mqttConnectionTimeout> `    | int |   `10`                | Czas połączenia w kilka sekund. | 
 |   ` <mqttAutomaticReconnect> `   | boolean |   `prawda`              | Automatycznie ponownie połączyć się w przypadku utraty połączenia. | 


Czy...

## Środowisko Zmienne parowanie w ` datasets.xml ` 

Wprowadzono nową funkcję umożliwiającą stosowanie zmiennych środowiskowych w obrębie ` datasets.xml ` . To jest... **domyślnie włączona** .

Aby wyłączyć tę funkcjonalność, dodaj następującą flagę do `setup.xml` :

xml

 ` <enableEnvParsing> false </enableEnvParsing> ` 
