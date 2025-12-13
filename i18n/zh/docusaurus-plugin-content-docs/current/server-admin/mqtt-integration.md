#  ERDDAP MQTT 整合

 ERDDAP 现在包括支持MQTT协议,以便利实时数据摄入和通知。 此功能由开源驱动 [ **HiveMQ MQT 客户端** ](https://github.com/hivemq/hivemq-mqtt-client) 和 [ **蜂窝MQ 社区版** ](https://github.com/hivemq/hivemq-community-edition) 经纪人图书馆。

 ERDDAP 可以通过两种主要方式利用MQTT:

1.   **作为 MQTT 客户端 :**    ERDDAP 可以订阅一个 MQTT 经纪人上的主题来摄取数据并创建实时数据集.
    
2.   **作为MQTT经纪:**    ERDDAP 可以托管自己的嵌入式MQTT经纪人,允许外部客户端直接向它发布数据.
    

- - - - - - - - - ----

##  ERDDAP 作为 MQTT 客户端

 ERDDAP 可以作为一个MQTT客户端在外部或自己的嵌入式MQTT经纪人上订阅话题. 使用新的 `来自Mqtt的 EDD 表格` 数据集类型,其功能类似于现有的 [ `来自 HttpGet 的 EDD 表格` ](/docs/server-admin/datasets#eddtablefromhttpget) 数据集。

目前,客户端只支持 **签名** 改为主题。

## 配置 : `来自Mqtt的 EDD 表格` 

要配置用于订阅 MQTT 经纪人的数据集, 定义类型数据集 `来自Mqtt的 EDD 表格` 在你身边 ` datasets.xml ` 文档。 下列配置标签可在 ` <dataset> ` 块 :

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

- - - - - - - - - ----

##  ERDDAP 作为 MQTT 经纪商

 ERDDAP 可以运行嵌入式MQTT经纪人,它主要服务于两个目的:

1.   **数据摄入量 :** 接收外部MQTT客户端发布的数据以创建实时数据集.
    
2.   **通知:** 发布关于数据集变化的通知。
    

## 启用嵌入式经纪

嵌入的MQTT经纪人默认被禁用. 要启用它,请在 `设置. xml` 数字 :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> 真实 </enableMqttBroker> `  

## 中介配置和数据目录

您可以指定经纪人配置和数据文件的自定义目录 `设置. xml` 。 。 。 如果这些标记是空的, ERDDAP 将使用 HiveMQ 库指定的默认目录。 关于更高级的配置细节,包括记录和扩展,请参见官方网站 [ **蜂窝MQ 社区版 维基百科** ](https://github.com/hivemq/hivemq-community-edition/wiki) 。 。 。 。
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## 使用例1:从 MQTT 客户端获取数据

要使用嵌入式经纪人构建实时数据集,您可以配置一个 `来自Mqtt的 EDD 表格` 数据集 (如上所述) 位于(_S) ERDDAP 实例可以连接到自己的本地经纪人。 外部 MQTT 客户端可以在此发布数据 ERDDAP 经纪人,哪个 `来自Mqtt的 EDD 表格` 数据集将订阅并吞入。

## 使用案例2: 公布数据集更改通知

 ERDDAP 可配置发布关于数据集更改的通知 (例如,更新或重新加载) 到 MQTT 经纪人的话题。 第一,确保经纪人被启用或有外部经纪人。 然后,在 `设置. xml` 数字 :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> 真实 </publishMqttNotif> `  

当启用此特性时, ERDDAP 使用内部的MQTT客户端发布消息. 此客户端的连接设置可以在 `设置. xml` 。 。 。 下表列出了可用的设置及其默认值.

 | 标记 | 类型 | 默认值 | 说明 | 
 | - - - - - - - - - - - - - - - - - - - - - - | - -- - -- | - - - - - - - - - - - - - - - - - - - - | ————————————————————————————————————————————————————————————————————————————————————————————————————————...... | 
 |   ` <mqttServerHost> `           | 字符串 |   `本地主机`         | 经纪人主机发布通知。 | 
 |   ` <mqttServerPort> `           | 单位 |   `1883 (英语).`              | 通知经纪人的港口。 | 
 |   ` <mqttClientId> `             | 字符串 |   `erddap 客户端`     | 通知出版单位的客户身份证明. | 
 |   ` <mqttUserName> `             | 字符串 |   `erddap 用户名`   | 通知出版单位的用户名. | 
 |   ` <mqttPassword> `             | 字符串 |   `电子密码`   | 通知发布者的密码. | 
 |   ` <mqttSsl> `                  | 布尔 |   `虚假`             | 使用SSL/TLS进行通知连接. | 
 |   ` <mqttKeepAlive> `            | 单位 |   `页:1`                | 保持活动间隔数秒。 | 
 |   ` <mqttCleanStart> `           | 布尔 |   `虚假`             | 从干净的会话开始 (无持续会话状态) 。 。 。 。 | 
 |   ` <mqttSessionExpiry> `        | 单位 |   `10个`                | 会话过期间隔数秒. | 
 |   ` <mqttConnectionTimeout> `    | 单位 |   `10个`                | 连接超时数秒 。 | 
 |   ` <mqttAutomaticReconnect> `   | 布尔 |   `真实`              | 如果连接丢失, 将自动重新连接 。 | 


- - - - - - - - - ----

## 环境变量分析 ` datasets.xml ` 

采用了一个新的功能,允许在内部使用环境变量。 ` datasets.xml ` 。 。 。 。 这是 **默认启用** 。 。 。 。

要禁用此功能, 请在 `设置. xml` 数字 :

ưμ㼯A

 ` <enableEnvParsing> 虚假 </enableEnvParsing> ` 
