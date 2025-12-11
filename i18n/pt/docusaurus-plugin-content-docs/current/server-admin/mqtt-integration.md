#  ERDDAP Integração MQTT

 ERDDAP agora inclui suporte para o protocolo MQTT para facilitar a ingestão de dados em tempo real e notificações. Esta funcionalidade é alimentada pelo código aberto [ **Cliente HiveMQ MQTT** ](https://github.com/hivemq/hivemq-mqtt-client) e [ **HiveMQ Community Edition** ](https://github.com/hivemq/hivemq-community-edition) bibliotecas de corretores.

 ERDDAP pode alavancar o MQTT de duas maneiras principais:

1.   **Como Cliente MQTT:**    ERDDAP pode se inscrever em tópicos em um corretor MQTT existente para ingerir dados e criar conjuntos de dados em tempo real.
    
2.   **Como um corretor MQTT:**    ERDDAP pode hospedar seu próprio corretor MQTT incorporado, permitindo que os clientes externos publiquem dados diretamente para ele.
    

---------------

##  ERDDAP como um cliente MQTT

 ERDDAP pode atuar como um cliente MQTT para se inscrever em tópicos em um corretor MQTT externo ou próprio incorporado. Isso é alcançado usando o novo `EDDTable FromMqtt` tipo de dataset, que funciona de forma semelhante ao existente `EDDTable FromHttpGet` conjunto de dados.

Atualmente, a implementação do cliente só suporta **subscrevendo** para tópicos.

## Configuração: `EDDTable FromMqtt` 

Para configurar um conjunto de dados para se inscrever em um corretor MQTT, defina um conjunto de dados do tipo `EDDTable FromMqtt` em seu ` datasets.xml ` ficheiro. As seguintes tags de configuração estão disponíveis dentro do ` <dataset> ` bloco:

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

---------------

##  ERDDAP como um corretor MQTT

 ERDDAP pode executar um corretor MQTT incorporado, que serve duas finalidades principais:

1.   **Ingestão de dados:** Para receber dados publicados por clientes MQTT externos para criar conjuntos de dados em tempo real.
    
2.   **Notificações:** Para publicar notificações sobre alterações de conjuntos de dados.
    

## Ativando o corretor incorporado

O corretor MQTT incorporado está desativado por padrão. Para habilitar, adicione a seguinte bandeira `setup.xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> verdadeiro </enableMqttBroker> `  

## Configuração de corretores e diretórios de dados

Você pode especificar diretórios personalizados para a configuração do corretor e arquivos de dados em `setup.xml` . Se estas tags forem deixadas vazias, ERDDAP usará os diretórios padrão especificados pela biblioteca HiveMQ. Para detalhes de configuração mais avançados, incluindo registro e extensões, consulte o oficial [ **HiveMQ Community Edition Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Caso de uso 1: Ingestão de dados de clientes MQTT

Para construir um conjunto de dados em tempo real usando o corretor incorporado, você pode configurar um `EDDTable FromMqtt` conjunto de dados (como descrito acima) dentro do _same_ ERDDAP exemplo para se conectar ao seu próprio corretor local . Clientes MQTT externos podem, em seguida, publicar dados a este ERDDAP corretor, que o `EDDTable FromMqtt` dataset irá se inscrever e ingerir.

## Caso de uso 2: Notificações de alteração de conjuntos de dados de publicação

 ERDDAP pode ser configurado para publicar notificações sobre alterações de conjuntos de dados (por exemplo, atualizações ou recargas) para um tópico sobre um corretor MQTT. Primeiro, garantir que o corretor está habilitado ou um externo está disponível. Em seguida, ative o recurso de notificação em `setup.xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> verdadeiro </publishMqttNotif> `  

Quando este recurso estiver ativado, ERDDAP usa um cliente MQTT interno para publicar as mensagens. As configurações de conexão para este cliente podem ser personalizadas em `setup.xml` . A tabela abaixo lista as configurações disponíveis e seus valores padrão.

 | Tag Tag | Tipo | Valor padrão | Descrição | 
 | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | string |   `localhost`         | O anfitrião do corretor para publicar notificações. | 
 |   ` <mqttServerPort> `           | - Não. |   `1883`              | O porto do corretor de notificações. | 
 |   ` <mqttClientId> `             | string |   `erddap-client`     | O ID do cliente para o editor de notificações. | 
 |   ` <mqttUserName> `             | string |   `erddap-username`   | O nome de usuário para o editor de notificação. | 
 |   ` <mqttPassword> `             | string |   `erddap-password`   | A senha para o editor de notificações. | 
 |   ` <mqttSsl> `                  | booleano |   `falso`             | Use SSL/TLS para a conexão de notificação. | 
 |   ` <mqttKeepAlive> `            | - Não. |   `60.`                | Intervalo em segundos. | 
 |   ` <mqttCleanStart> `           | booleano |   `falso`             | Comece com uma sessão limpa (não persiste estado de sessão) . | 
 |   ` <mqttSessionExpiry> `        | - Não. |   `10.`                | Período de validade de sessão em segundos. | 
 |   ` <mqttConnectionTimeout> `    | - Não. |   `10.`                | Tempo de conexão em segundos. | 
 |   ` <mqttAutomaticReconnect> `   | booleano |   `verdadeiro`              | Reconecte-se automaticamente se a conexão for perdida. | 


---------------

## Ambiente Parsing variável em ` datasets.xml ` 

Um novo recurso foi introduzido que permite o uso de variáveis de ambiente dentro ` datasets.xml ` . Isto é... **habilitado por padrão** .

Para desativar esta funcionalidade, adicione a seguinte bandeira `setup.xml` :

xml

 ` <enableEnvParsing> falso </enableEnvParsing> ` 
