#  ERDDAP MQTT Integration

 ERDDAP ahora incluye el apoyo al protocolo MQTT para facilitar la ingestión y notificaciones de datos en tiempo real. Esta funcionalidad está impulsada por el código abierto [ **HiveMQ Cliente MQTT** ](https://github.com/hivemq/hivemq-mqtt-client) y [ **HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) bibliotecas de corredores.

 ERDDAP puede aprovechar el MQTT de dos maneras principales:

1.   **Como cliente MQTT:**    ERDDAP puede suscribirse a temas sobre un corredor MQTT existente para ingerir datos y crear conjuntos de datos en tiempo real.
    
2.   **Como MQTT Broker:**    ERDDAP puede albergar su propio broker MQTT integrado, permitiendo a los clientes externos publicar datos directamente a él.
    

--------

##  ERDDAP como cliente MQTT

 ERDDAP puede actuar como un cliente MQTT para suscribirse a temas en un corredor MQTT externo o integrado. Esto se logra utilizando el nuevo `EDDTableDesde Mqt` tipo de conjunto de datos, que funciona de forma similar al existente `EDDTableDesdeHtpGet` Dataset.

Actualmente, la implementación del cliente solo apoya **suscriptores** a temas.

## Configuración: `EDDTableDesde Mqt` 

Para configurar un conjunto de datos para suscribirse a un broker MQTT, defina un conjunto de datos de tipo `EDDTableDesde Mqt` en tu ` datasets.xml ` archivo. Las siguientes etiquetas de configuración están disponibles dentro de las ` <dataset> ` bloque:

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

##  ERDDAP como MQTT Broker

 ERDDAP puede ejecutar un broker MQTT integrado, que sirve dos propósitos principales:

1.   **Ingestión de datos:** Para recibir datos publicados por clientes externos de MQTT para crear conjuntos de datos en tiempo real.
    
2.   **Notificaciones:** Publicar notificaciones sobre cambios de conjunto de datos.
    

## Activar el Broker Embedded

El broker MQTT integrado está deshabilitado por defecto. Para habilitarlo, agregue la siguiente bandera `setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> verdadero </enableMqttBroker> `  

## Configuración de carpetas &quot; Directores de datos

Puede especificar directorios personalizados para la configuración del corredor y archivos de datos en `setup.xml` . Si estas etiquetas quedan vacías, ERDDAP utilizará los directorios predeterminados especificados por la biblioteca HiveMQ. Para más detalles de configuración avanzados, incluyendo registro y extensiones, consulte al funcionario [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Caso 1: Ingerir datos de los clientes de MQTT

Para construir un conjunto de datos en tiempo real utilizando el broker integrado, puede configurar un `EDDTableDesde Mqt` Dataset (como se describe anteriormente) dentro del _same_ ERDDAP instancia para conectar a su propio corredor local . Los clientes externos MQTT pueden publicar datos a este ERDDAP bróker, que `EDDTableDesde Mqt` Dataset se suscribirá e ingerirá.

## Caso de uso 2: Publicación de notificaciones de cambio de dataset

 ERDDAP puede configurarse para publicar notificaciones sobre cambios de conjunto de datos (por ejemplo, actualizaciones o recargas) a un tema sobre un corredor de MQTT. En primer lugar, asegurar que el corredor esté habilitado o que esté disponible. Luego, active la función de notificación en `setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> verdadero </publishMqttNotif> `  

Cuando esta función está habilitada, ERDDAP utiliza un cliente MQTT interno para publicar los mensajes. Los ajustes de conexión para este cliente se pueden personalizar en `setup.xml` . La tabla siguiente enumera los ajustes disponibles y sus valores predeterminados.

 | Tag | Tipo | Valor predeterminado | Descripción | 
 | -------- | --- | - Sí. | ----- | 
 |   ` <mqttServerHost> `           | cuerda |   `localhost`         | El anfitrión del corredor para publicar notificaciones a. | 
 |   ` <mqttServerPort> `           | int |   `1883`              | El puerto del corredor de notificación. | 
 |   ` <mqttClientId> `             | cuerda |   `Erddap-client`     | El ID del cliente para el editor de notificación. | 
 |   ` <mqttUserName> `             | cuerda |   `erddap-username`   | El nombre de usuario para el editor de notificación. | 
 |   ` <mqttPassword> `             | cuerda |   `erddap-password`   | La contraseña para el editor de notificaciones. | 
 |   ` <mqttSsl> `                  | boolean |   `falso`             | Use SSL/TLS para la conexión de notificación. | 
 |   ` <mqttKeepAlive> `            | int |   `60`                | Mantener el intervalo en segundos. | 
 |   ` <mqttCleanStart> `           | boolean |   `falso`             | Comience con una sesión limpia (no persiste sesión Estado) . | 
 |   ` <mqttSessionExpiry> `        | int |   `10`                | Período de expiración de sesión en segundos. | 
 |   ` <mqttConnectionTimeout> `    | int |   `10`                | Tiempo de conexión en segundos. | 
 |   ` <mqttAutomaticReconnect> `   | boolean |   `verdadero`              | Reconectar automáticamente si la conexión se pierde. | 


--------

## Medio ambiente Variable ` datasets.xml ` 

Se ha introducido una nueva característica que permite el uso de variables ambientales dentro de ` datasets.xml ` . Esto es **habilitado por defecto** .

Para deshabilitar esta funcionalidad, añadir la siguiente bandera a `setup.xml` :

xml

 ` <enableEnvParsing> falso </enableEnvParsing> ` 
