#  ERDDAP MQTT 集成

 ERDDAP 包括支援 MQTT 协议, 以方便实时資料摄入和通知 。 此功能由開源電源提供 [ **蜂巢Q MQT 客戶端** ](https://github.com/hivemq/hivemq-mqtt-client) 和 [ **蜂巢MQ 社區版** ](https://github.com/hivemq/hivemq-community-edition) 經紀人圖書館

 ERDDAP 可以用两种主要方式利用 MQTT:

1.   **作为 MQTT 客戶端 :**    ERDDAP 可以在 MQTT 代理商上訂閱主題, 以吸收資料並建立实时的數據集 。
    
2.   **作為 MQTT 经纪商 :**    ERDDAP 可以主控它自己的嵌入式MQTT经纪商,讓外部客戶直接向它公布資料.
    

- - - - - -

##  ERDDAP 作为 MQTT 客戶端

 ERDDAP 可以用 MQTT 用戶端來訂閱外部或自己嵌入的 MQTT 介面 。 使用新的 `從 Mqtt 取自 EDD 表格` 數據集類型,其功能類似於现有的 `從 HttpGet 的 EDD 表格` 數據集。

目前,客戶端只支援 **簽署** 至主題。

## 配置 : `從 Mqtt 取自 EDD 表格` 

要設定要訂閱 MQTT 介面的數據集, 請定義類型的數據集 `從 Mqtt 取自 EDD 表格` 在您的 ` datasets.xml ` 文件。 以下設定標籤可在 ` <dataset> ` 區塊 :

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

- - - - - -

##  ERDDAP 作為 MQTT 经纪

 ERDDAP 可以經營嵌入式 MQTT 经纪商,

1.   **資料摄入 :** 接收外部 MQTT 客戶端為建立实时數據集而公布的資料 。
    
2.   **通知:** 公布數據集變更通知 。
    

## 啟動嵌入式经纪

嵌入的 MQTT 代理商默认已禁用 。 要啟動它, 要在 `設定. xml` :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> 真 </enableMqttBroker> `  

## 介面配置資料目錄( D)

您可以指定經紀人設定與資料檔案的自訂目錄 `設定. xml` . 如果這些標籤是空的 ERDDAP 將使用 HiveMQ 文庫指定的預設目錄。 關於更進一步的設定細節,包括登記與延伸,請參考官方 [ **蜂巢MQ 社區版 Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) .
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## 使用例 1: 從 MQTT 客戶端取得資料

要使用嵌入式中介建立实时數據集, 您可以設定 `從 Mqtt 取自 EDD 表格` 数据集 (上文) 相同(_S) ERDDAP 例如, 外部 MQTT 客戶端可以在此公布資料 ERDDAP 經紀人 `從 Mqtt 取自 EDD 表格` 數據集將訂閱并吞入 。

## 使用案例2: 公布數據集變更通知

 ERDDAP 可以設定以公布數據集變更通知 (例如,更新或重新載入) 到 MQTT 经纪商的專題。 第一,确保經紀人啟用或有外部代理。 然后,启用通知功能于 `設定. xml` :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> 真 </publishMqttNotif> `  

當此功能啟用時, ERDDAP 使用 MQTT 內部客戶端來发布信件 。 此客戶端的連接設定可以自訂於 `設定. xml` . 下表列出可用的設定值及其預設值 。

 | 標籤 | 類型 | 預設值 | 描述 | 
 | - - - - - - - - - - | - - - - | - - - - - - - | ——————————————————————————————————————————. | 
 |   ` <mqttServerHost> `           | 字串 |   `本地主機`         | 代理主機會公布通知 | 
 |   ` <mqttServerPort> `           | 英寸 |   `1883年`              | 通知代理商的港口 | 
 |   ` <mqttClientId> `             | 字串 |   `erddap 客戶端`     | 通知出版商的客戶證 | 
 |   ` <mqttUserName> `             | 字串 |   `erddap 使用者名稱`   | 通知出版商的使用者名稱 。 | 
 |   ` <mqttPassword> `             | 字串 |   `字元`   | 通知出版商的密碼 。 | 
 |   ` <mqttSsl> `                  | 布林 |   `假`             | 通知連接使用 SSL/ TLS 。 | 
 |   ` <mqttKeepAlive> `            | 英寸 |   `60`                | 數秒內保持正常 | 
 |   ` <mqttCleanStart> `           | 布林 |   `假`             | 從清潔片段開始 (沒有常數狀態) . | 
 |   ` <mqttSessionExpiry> `        | 英寸 |   `10`                | 工作階段的結束间隔為秒 。 | 
 |   ` <mqttConnectionTimeout> `    | 英寸 |   `10`                | 連接暫停秒 。 | 
 |   ` <mqttAutomaticReconnect> `   | 布林 |   `真`              | 如果失去連接, 自動重新連接 。 | 


- - - - - -

## 環境變數分析 ` datasets.xml ` 

已引入新的功能, 可以在內使用環境變數 ` datasets.xml ` . 這是 **默认已開啟** .

要禁用此功能, 請加入以下旗號 `設定. xml` :

x毫升

 ` <enableEnvParsing> 假 </enableEnvParsing> ` 
