---
sidebar_position: 9
---
# プロメテウス

[Prometheus メトリック](https://prometheus.io/)/erddap/metrics で利用できます。 JVMコアメトリックは2.25に多く追加されましたERDDAP™バージョン 2.26 で追加されたメトリック。 メトリックを使用する場合は、少なくともバージョン2.26にあることを確認してください。 デフォルトで有効にするには、追加することで無効にできます。
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
setup.xml へ。

これらのメトリックは、読みやすい機械であるように設計されています。 メトリックページを手動で確認できますが、深さの監視では、Prometheusサーバーを使用することをお勧めします。 Prometheus サーバは、より深さの監視を可能にする歴史的メトリックを保存します (過去の値からのレートや変更) Grafana サーバーで実行されることが多いです。 管理者が自分のサーバーを監視し始めるのに役立つ可能性があるいくつかの事前ビルドされたダッシュボードを提供します。

## Prometheusサーバーの実行

監視スタックを実行するための最良のドキュメント (プロメテウス+グラファナ) プロメテウス[フィードバック](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md)お問い合わせ

## ERDDAP™メトリック

### JVMについて

ERDDAP™役に立つメトリックの数をエクスポート (はじめにERDDAP™2.25) お問い合わせ JVMの健康全般のモニタリングでは、Prometheusクライアントが収集したメトリックを使用します。 ゴミ収集、メモリ使用、ネジなどのデータが含まれています。 詳細については、こちらをご覧ください[プロメテウスJavaクライアント JVM ドキュメント](https://prometheus.github.io/client_java/instrumentation/jvm/)お問い合わせ

### ERDDAP™仕様

私達はまた数を輸出しますERDDAP™特定のメトリック (はじめにERDDAP™2.26) お問い合わせ コードに掘り込む場合は、収集したメトリックを調べることができます。[メトリクス.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java)お問い合わせ

#### ERDDAPアーカイブ _build_info

これはビルド情報です。ERDDAP™サーバ。 バージョンが含まれています (メジャー.マイナー) , バージョン_full (メジャー.マイナー.パッチ) , デプロイメント_info ('Docker のようなサーバーがデプロイされる方法を示すのに使われます お問い合わせ) お問い合わせ

#### 関数_flags

機能フラグの現在の状態を示す情報メトリックです。 ほとんどの boolean 設定オプションは、機能フラグと見なされます。

#### バッファリング サイトマップ

これは、グラフィックアクセラレーションが利用可能なかどうかを示す情報メトリックです。

#### http_request_duration_秒

これは、応答時間秒単位のヒストグラムリクエストです。 ラベルは request_type です。 (例えば Griddap,tabledap, ファイル, wms) , データセット_id (該当する場合、そうしないとリクエストタイプを繰り返す) , ファイル_type (要求のための出力フォーマット 例:'.html'、'.csv'、'.iso19115 お問い合わせ) 、 lang_code の (リクエストの言語、またはデフォルトで空の文字列) , ステータス_code (httpリクエストのステータスコード 200, 302, 404) お問い合わせ

これは、サーバの一般的なデータセットを決定するために、データセットIDでリクエストを追跡するために使用できます。 また、サーバーに遅くなっている要求の特定の種類があるかどうかを識別するのに役立ちます。

#### コンタクト_thread_duration_seconds

タッチスレッドタスクの期間のヒストグラム。 彼らは成功とラベル付けされています (真偽/偽) お問い合わせ

#### タスク_thread_duration_seconds

タスクスレッドの長さのヒストグラム。 彼らは成功とラベル付けされています (真偽/偽) タスクタイプ (ログイン) お問い合わせ

#### load_datasets_duration_seconds ディレクティブ

ロードデータセットタスクの期間のヒストグラム。 それらは主要なと分類されます (真偽/偽) お問い合わせ

#### メール_thread_duration_seconds

メールスレッドタスクの期間のヒストグラム。 彼らは成功とラベル付けされています (真偽/偽) お問い合わせ

#### メール_count_distribution

タスクごとのメールのヒストグラム。

#### データセット_count

データセットのゲージは、各ロードデータセットの呼び出し後に設定されます。 これはカテゴリで分類されます (格子、テーブル) お問い合わせ

#### データセット_failed_load_count

ロードできなかったデータセットのゲージ、各ロードデータセットの呼び出し後に設定します。

#### shed_requests_total は、

小屋された要求のカウンター。 サーバは、サーバがメモリに低いと判断したときにリクエストをキャッシュします (ログイン) 問題が発生します。 リクエストの処理中にRAMやディスク容量が低いため、エラーのリクエストは含まれません。

#### 危険_memory_emails_total

サーバがメモリが危険に低い管理者にメールを送ることを試みる時間のカウンター。

#### 危険な_memory_failures_total

メモリ不足のマシンが故障したリクエストのカウンター。 多くの場合、これは機械が高価な要求の多くを受け取るか、個々の要求が例外的に大きいので。

#### topo_request_total は、

トポデータの要求のカウンター。 これはラベル付きキャッシュです (キャッシュされた/not_cached) お問い合わせ

#### 境界カウンター

境界のための要求のためのカウンターのコレクションもあります。

 - 国民_境界_request_total
 - state_boundaries_request_total ディレクティブ
 - 河川_境界線_request_total
 - gshhs_request_totalさん

これらはステータスでラベル付けされます (粗い、成功、tosed) お問い合わせ
