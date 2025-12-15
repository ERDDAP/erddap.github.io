# ERDDAP MQTT Integration

ERDDAP now includes support for the MQTT protocol to facilitate real-time data ingestion and notifications. This functionality is powered by the open-source [**HiveMQ MQTT Client**](https://github.com/hivemq/hivemq-mqtt-client) and [**HiveMQ Community Edition**](https://github.com/hivemq/hivemq-community-edition) broker libraries.

ERDDAP can leverage MQTT in two primary ways:

1.  **As an MQTT Client:**  ERDDAP can subscribe to topics on an existing MQTT broker to ingest data and create real-time datasets.
    
2.  **As an MQTT Broker:**  ERDDAP can host its own embedded MQTT broker, allowing external clients to publish data directly to it.
    

----------

## ERDDAP as an MQTT Client

ERDDAP can act as an MQTT client to subscribe to topics on an external or its own embedded MQTT broker. This is achieved using the new  `EDDTableFromMqtt`  dataset type, which functions similarly to the existing [`EDDTableFromHttpGet`](/docs/server-admin/datasets#eddtablefromhttpget) dataset.

Currently, the client implementation only supports  **subscribing**  to topics.

## Configuration:  `EDDTableFromMqtt`

To configure a dataset to subscribe to an MQTT broker, define a dataset of type  `EDDTableFromMqtt`  in your  `datasets.xml`  file. The following configuration tags are available within the  `<dataset>`  block:

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

## ERDDAP as an MQTT Broker

ERDDAP can run an embedded MQTT broker, which serves two main purposes:

1.  **Data Ingestion:**  To receive data published by external MQTT clients for creating real-time datasets.
    
2.  **Notifications:**  To publish notifications about dataset changes.
    

## Enabling the Embedded Broker

The embedded MQTT broker is disabled by default. To enable it, add the following flag to  `setup.xml`:

`<!-- Enables the embedded HiveMQ broker. Default is 'false'. --> <enableMqttBroker>true</enableMqttBroker>` 

## Broker Configuration & Data Directories

You can specify custom directories for the broker's configuration and data files in `setup.xml`. If these tags are left empty, ERDDAP will use the default directories specified by the HiveMQ library. For more advanced configuration details, including logging and extensions, please refer to the official [**HiveMQ Community Edition Wiki**](https://github.com/hivemq/hivemq-community-edition/wiki).
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Use Case 1: Ingesting Data from MQTT Clients

To build a real-time dataset using the embedded broker, you can configure an  `EDDTableFromMqtt`  dataset (as described above) within the  _same_  ERDDAP instance to connect to its own local broker . External MQTT clients can then publish data to this ERDDAP broker, which the  `EDDTableFromMqtt`  dataset will subscribe to and ingest.

## Use Case 2: Publishing Dataset Change Notifications

ERDDAP can be configured to publish notifications about dataset changes (e.g., updates or reloads) to a topic on an MQTT broker. First, ensure the broker is enabled or an external one is available. Then, enable the notification feature in  `setup.xml`:

`<!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. --> <publishMqttNotif>true</publishMqttNotif>` 

When this feature is enabled, ERDDAP uses an internal MQTT client to publish the messages. The connection settings for this client can be customized in  `setup.xml`. The table below lists the available settings and their default values.

| Tag                        | Type    | Default Value     | Description                                               |
| -------------------------- | ------- | ----------------- | --------------------------------------------------------- |
| `<mqttServerHost>`         | string  | `localhost`       | The broker host to publish notifications to.              |
| `<mqttServerPort>`         | int     | `1883`            | The port of the notification broker.                      |
| `<mqttClientId>`           | string  | `erddap-client`   | The client ID for the notification publisher.             |
| `<mqttUserName>`           | string  | `erddap-username` | The username for the notification publisher.              |
| `<mqttPassword>`           | string  | `erddap-password` | The password for the notification publisher.              |
| `<mqttSsl>`                | boolean | `false`           | Use SSL/TLS for the notification connection.              |
| `<mqttKeepAlive>`          | int     | `60`              | Keep-alive interval in seconds.                           |
| `<mqttCleanStart>`         | boolean | `false`           | Start with a clean session (no persisted session state).  |
| `<mqttSessionExpiry>`      | int     | `10`              | Session expiry interval in seconds.                       |
| `<mqttConnectionTimeout>`  | int     | `10`              | Connection timeout in seconds.                            |
| `<mqttAutomaticReconnect>` | boolean | `true`            | Automatically reconnect if the connection is lost.        |


----------

## Environment Variable Parsing in  `datasets.xml`

A new feature has been introduced that allows for the use of environment variables within  `datasets.xml`. This is  **enabled by default**.

To disable this functionality, add the following flag to  `setup.xml`:

xml

`<enableEnvParsing>false</enableEnvParsing>`
