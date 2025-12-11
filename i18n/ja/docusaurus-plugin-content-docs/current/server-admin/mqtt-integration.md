#  ERDDAP MQTTの統合

 ERDDAP 現在、MQTT プロトコルのサポートが含まれており、リアルタイムのデータ処理と通知を容易にします。 この機能はオープンソースによって供給されます [ **HiveMQ MQTTクライアント** ](https://github.com/hivemq/hivemq-mqtt-client) そして、 [ **HiveMQコミュニティエディション** ](https://github.com/hivemq/hivemq-community-edition) ブローカーライブラリ。

 ERDDAP MQTT を 2 つの主要な方法で活用できます。

1.   **MQTT クライアントとして:**    ERDDAP 既存の MQTT ブローカーのトピックを購読してデータを発信し、リアルタイムのデータセットを作成することができます。
    
2.   **MQTTブローカーとして:**    ERDDAP 外部クライアントが直接データを公開できるように、独自の埋め込みMQTTブローカーをホストできます。
    

お問い合わせ

##  ERDDAP MQTTクライアントとして

 ERDDAP MQTT クライアントとして、外部または独自の MQTT ブローカーのトピックを購読することができます。 新規で実現 `EDDTableFromMqttの特長` 既存のデータセットタイプと同様に機能する `EDDTableFromHttpGetの特長` データセット。

現在、クライアントの実装のみがサポート **サブスクライブ** トピック

## 構成: `EDDTableFromMqttの特長` 

MQTT ブローカーに購読するデータセットを設定するには、タイプのデータセットを定義します。 `EDDTableFromMqttの特長` お問い合わせ ` datasets.xml ` ファイル。 以下の設定タグは、 ` <dataset> ` ブロック:

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

お問い合わせ

##  ERDDAP MQTTブローカーとして

 ERDDAP 埋め込まれたMQTTブローカーを実行することができます。これは、2つの主な目的を果たします。

1.   **データ摂取:** 外部のMQTTクライアントが公開したデータをリアルタイムのデータセットを作成するために受信するため。
    
2.   **通知:** データセットの変更に関する通知を公開する。
    

## 埋め込まれたブローカーを有効にする

組み込みMQTTブローカーはデフォルトで無効になっています。 有効にするには、次のフラグを追加します。 `セットアップ。xml` : : :

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> ログイン </enableMqttBroker> `  

## ブローカー構成とデータディレクトリ

ブローカーの構成とデータファイルのカスタムディレクトリを指定できます。 `セットアップ。xml` お問い合わせ これらのタグが空のままの場合、 ERDDAP HiveMQライブラリで指定されたデフォルトのディレクトリを使用します。 ログや拡張機能など、より高度な構成の詳細については、公式を参照してください。 [ **HiveMQコミュニティエディションWiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) お問い合わせ
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## 事例1:MQTTクライアントからデータを発信する

埋め込まれたブローカーを使用してリアルタイムのデータセットを作成するには、 `EDDTableFromMqttの特長` データセット (上記の通り) _same_ 内の ERDDAP 独自のローカルブローカーに接続するインスタンス。 外部のMQTTクライアントは、このデータを公開することができます ERDDAP ブローカー、その `EDDTableFromMqttの特長` データセットは、購読とインジェストを行います。

## ユースケース2:データセット変更通知の公開

 ERDDAP データセットの変更に関する通知を公開するように設定できます (例、更新、リロード) MQTTブローカーのトピックに。 まず、ブローカーが有効になっているか、外部のブローカーが利用できるかを確認します。 次に、通知機能を有効にします。 `セットアップ。xml` : : :

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> ログイン </publishMqttNotif> `  

この機能を有効にすると、 ERDDAP 内部の MQTT クライアントを使用してメッセージを公開します。 このクライアントの接続設定は、 `セットアップ。xml` お問い合わせ 以下の表は、利用可能な設定とデフォルト値のリストです。

 | ツイート | タイプ: | デフォルト値 | コンテンツ | 
 | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | お問い合わせ | ----------------- | ------------------------------------------------------------------------- | 
 |   ` <mqttServerHost> `           | キーワード |   `ローカルホスト`         | ブローカーは通知を公開するホストです。 | 
 |   ` <mqttServerPort> `           | ログイン |   `1883年`              | 通知ブローカーのポート。 | 
 |   ` <mqttClientId> `             | キーワード |   `erddap クライアント`     | 通知パブリッシャーのクライアントID。 | 
 |   ` <mqttUserName> `             | キーワード |   `erddap ユーザー名`   | 通知パブリッシャーのユーザー名。 | 
 |   ` <mqttPassword> `             | キーワード |   `erddap-passwordの使い方`   | 通知パブリッシャーのパスワード。 | 
 |   ` <mqttSsl> `                  | ログイン |   `パスワード`             | 通知接続には、SSL/TLS を使用します。 | 
 |   ` <mqttKeepAlive> `            | ログイン |   `電話番号`                | 秒単位で連続間隔を保って下さい。 | 
 |   ` <mqttCleanStart> `           | ログイン |   `パスワード`             | 清潔なセッションから始める (持続セッション状態なし) お問い合わせ | 
 |   ` <mqttSessionExpiry> `        | ログイン |   `10月10日`                | セッションの有効期限間隔を秒単位で満たします。 | 
 |   ` <mqttConnectionTimeout> `    | ログイン |   `10月10日`                | 接続タイムアウト秒数。 | 
 |   ` <mqttAutomaticReconnect> `   | ログイン |   `ログイン`              | 接続が失われた場合は自動的に再接続します。 | 


お問い合わせ

## 環境変数 パース ` datasets.xml ` 

環境変数の使用を可能にする新しい機能が導入されました ` datasets.xml ` お問い合わせ お問い合わせ **デフォルトで有効** お問い合わせ

この機能を無効にするには、次のフラグを追加します。 `セットアップ。xml` : : :

ログイン

 ` <enableEnvParsing> パスワード </enableEnvParsing> ` 
