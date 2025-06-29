---
title: "ERDDAP™ - Changes"
---
# ERDDAP™変更点

ERDDAP™素晴らしい例です。[ユーザー主導のイノベーション](https://en.wikipedia.org/wiki/User_innovation)消費者から製品革新が頻繁に来るところ (ERDDAP™ユーザー) プロデューサーだけでなく、 (ERDDAP™開発者) お問い合わせ 長年にわたって、新しい機能と変化のためのアイデアのほとんどERDDAP™ユーザーから来ています。 これらのユーザーは、その優れたアイデアのために以下にクレジットされます。 お問い合わせ ぜひご参加ください&#33;

それぞれに関連した変更は次のとおりです。ERDDAP™リリース

## バージョン2.27.0{#version-2270} 
 (リリース 2025-06-11) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * /erddap/convert/color.html のサーバー上のcolorbarコンバーターへの新しいデータ

*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * デフォルト behavoir は、キャッシュが主要なロードデータセットタスクの独立して消去されることです。 これは、古いキャッシュファイルのより信頼性と定期的なクリアを可能にします。 ディスクスペースの低いときにサーバーのBehavoirを改善する追加の作業があります (リクエストのエラーを返すと、サーバーがスペースからなくなる可能性があり、エラーを防止しようとすると、ディスクの状況が低いときにキャッシュを頻繁にクリアする) お問い合わせ インスタグラムdatasets.xml  (または setup.xml) 新しいキャッシュを追加/設定できます ClearMinutes パラメータは、サーバーがキャッシュをクリアする方法を頻繁に制御します。 Note、既存の cacheMinutes パラメータは、保存するファイルの年齢、新しいキャッシュを制御します。 ClearMinutesは、シャッチをクリアする頻度です。
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
これは推奨されていないが、setup.xml で false に設定することで、新しいキャッシュクリアチェックを無効にすることができます。
キャッシュ ClearMinutesは、[データセットのドキュメント](/docs/server-admin/datasets#cacheclearminutes)お問い合わせ
    
    * 集中データセットメタデータサポート 値のローカリゼーションをサポートaddAttributesセクション。 追加のxml:langタグで属性を追加するだけです。 例えば、フランス語のタイトルをデータセットに追加するaddAttributesセクションには以下が含まれます:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
利用可能な追加詳細[メタデータドキュメント](/docs/server-admin/localized-metadata)お問い合わせ

    * 新しいドッカー SSL と barebones Prometheus サーバーのオプションでファイルをコンパイルします。 シャンゼ・セント・サベージ氏、プロメテウスの SSL と Jiahui Hu 氏に感謝します。

    * 設定ファイルに依存する代わりに、ヘッダ内の情報を使用してサーバー URL を判断するサポート。 これにより、サーバーは複数の名前でアクセスでき、特定の設定を簡素化できます。 ご意見・ご要望等ございましたら、お気軽にお問い合わせ下さい。
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * いくつかの小さな変更、バグ修正、最適化。

*    **お問い合わせERDDAP™開発者:** 
    * 出力ファイルタイプがコードで定義される方法のレファクタ。 多くのコードの場所に触れなくてもファイルタイプを追加できるようにします。

## バージョン 2.26{#version-226} 
 (リリース 2025-03-31) 

*    **すべてのために:** 
    * ドキュメントサイトへの大きな更新: https://erddap.github.io/
 
更新された外観に加えて、ナビゲーション、検索、翻訳が改善され、今後維持しやすくなります&#33;

*    **新機能と変更 (ユーザ向け) : : :** 
    * サブスクリプションとRSS更新はファイル変更から頻繁に更新されるデータセットのためにより確実に起こるべきです。

*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * デフォルトリリースは必須/サポートJavaバージョン21. このリリースに戻り、簡単に作ることができますJava17 互換バイナリ。

    * UI内のデータセットについて表示される情報をカスタマイズする新機能。 データセットの引用のようなものを追加するには、これは特に便利です。 詳細については、あなたは読むことができます[新しいドキュメント](/docs/server-admin/display-info)お問い合わせ ご協力ありがとうございました&#33;

    * 追加のPrometheusメトリック。 一番大きいのは `http_request_duration_seconds` では、リクエストの応答時間を "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code" で区切るリクエストの応答時間が含まれます。
このマシン読み取り可能なフォーマットは、ユーザーがサーバーを使用する方法を理解するために、メトリックのより良いコレクションを有効にします。

    * ISO19115 XMLファイルを生成する新しい方法。 このリリースでは、Apache SIS を使用します。 ご意見・ご要望等ございましたら、お気軽にお問い合わせ下さい。
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI は、各 URL の個々のリンクをフィールドに作成します。infoUrlそして要約。

    * サブスクリプションとRSS更新はファイル変更から頻繁に更新されるデータセットのためにより確実に起こるべきです。 問題が起きた場合は、GitHub でアクセスし、下記のフラグを setup.xml に追加して機能を無効にしてください。
コメントはありません
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * サブセット変数は、データセット型 EDDTableFromNcCFFiles で自動的に生成されません。 行動に頼っていたら、 (好まれた解決) 追加するsubsetVariablesデータセット定義へdatasets.xmlまたは、setup.xml に以下のフラグを追加します。 これをオンにする必要があると感じた場合は、GitHub でアクセスしてください。そのため、ご使用のユースケースを先に動かすことができます。
コメントはありません
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * サーバがドキュメントリクエストをリダイレクトするようになりました (ダウンロード中/ 移行されたドキュメント) 新しいドキュメントサイトへ。 必要に応じて、setup.xml のフラグでこれを無効化できます。
コメントはありません
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * いくつかの小さな変更とバグ修正。

*    **お問い合わせERDDAP™開発者:** 
    * コードの品質改善とコードのクリーンアップ これには、マイナーな最適化、クロージャのリソースの取り扱いが向上し、長い障害物データ型から離れることが含まれます。 (ベクトルのような) お問い合わせ

    * 設定、メッセージ、メトリックコードのほとんどをプルアウトするために、EDStatic への大規模なリファクタリング。 また、ディレクトリパスの初期化と処理をカプセル化します。 (これらの最後の2は、もっとやるべきです。) 

    * 正式にサポートされている Docker Image への多くの進行。 計画は完了し、後にリリースすることですERDDAP™2.26 リリース対応

## バージョン 2.25{#version-225} 
 (公開日 2024-10-31) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * EDDTableFromFiles は、派生した出力のみでクエリをサポートできるようになりました。 (グローバル、jexlスクリプト、または変数) お問い合わせ
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * バージョン 2.25 は要求しますJava21 以降 LTSバージョンで1年以上使用可能です。
         
    * SharedWatchService はデフォルトです。 無効にする必要がある場合は、chrisにお問い合わせください。 noaaa.gov で john を 知っているので、将来のバージョンで改善して追加することができます。
        &lt;useSharedWatchサービス&gt;false&lt;/useSharedWatchService&gt; を setup.xml へ。
         
    * ザ・オブ・ザ・ERDDAP™サーバ起動時に servlet が起動します。 つまり、リクエストが作成されるまで待つのではなく、データセットがすぐにロードを開始します。
         
    * EDDTableFromMultidimNcFiles の removeMVRows パラメータは、今度は効果をもたらします。 false に設定すると、一部のクエリが大幅に高速化できますが、すべてのデータセットには適していません。 詳細については、こちらをご覧ください[パラメータの説明](/docs/server-admin/datasets#removemvrows)お問い合わせ
         
    * データセット (EDDTableFromNcFiles とEDDGridからNcFiles) zarr ファイルがサポートされています。 fileNameRegex または pathRegex のいずれかに "zarr" を含める必要があります。 詳細はこちら[データセットのドキュメントの zarr の secion](/docs/server-admin/datasets#zarr)詳しくはこちら
         
    * 新しいデータセットタイプ、EDDTableFromParquetFilesがサポートされています。 詳細はこちら[EDDTableFromParquetFiles データセットのドキュメントの secion](/docs/server-admin/datasets#eddtablefromparquetfiles)詳しくはこちら
         
    *   [Prometheus メトリック](https://prometheus.io/)/erddap/metrics で利用できます。
         
    * 新しいXMLパーザーの実装が利用可能です。 この新しいパーサーは、Xinclude を Xinclude で使用することができますdatasets.xmlお問い合わせ Ayush Singh の機能をありがとう。
         
    * 新しいパラメーターdatasets.xml異常な活動の電子メールを制御するため。 珍しい行為 FailPercent デフォルトは 25% の古い値です。 Ayush Singh の機能をありがとう。
         
    * dataset の読み込みエラーが status.html ページに表示されているかどうかを制御する setup.xml の新しいパラメーター。 デフォルトでは、ステータスページのデータセットエラーを無効にするには、showLoadErrorsOnStatusPage を false に設定します。&lt;showLoadErrorsOnStatusページ&gt;false&lt;/showLoadErrorsOnStatusページ&gt;
         
    * いくつかの小さな変更とバグ修正。
         
*    **お問い合わせERDDAP™開発者:** 
    * 単位および統合に分けられるテスト (遅い) テスト。 また、テストが有効化され、テストが不十分になりました。
         
    * エラーの傾向 (一部のチェックは無効になっています) Maven によって統合されるスポットバグ。
         
    * Googleスタイルガイドと一致させるためにフォーマットされた完全なコードベース。
         

## バージョン 2.24{#version-224} 
 (公開日 2024-06-07) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * 利用できる音響データセットのための新しい色のパレットEK80。 Rob Cermak のおかげで、これに感謝します。
         
    * EDDTableAggregateRowsがすべての子供から適切な範囲を表示しなかった問題を修正しました。 修正とバグ報告のためのマルコ・アルバのおかげで。
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * するには:セキュリティの変更: Google 認証は、CSP の変更が必要な場合があります。
        
具体的には、追加する必要があります https://accounts.google.com/gsi/style stlye-src および https://accounts.google.com/gsi/ src に接続します。 script-src を使うには、 https://accounts.google.com/gsi/client.
 
        
より多くの情報のためにあなたが行くことができる[サイトマップ](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)CSPの設定について
         
        
    * 新規共有ウォッチサービス これは、更新のためのディレクトリを見るための新しいオプションです。 データセットごとに1つのスレッドではなく、各ファイルシステムに1つのスレッドがあります。 ほとんどの場合、変更を監視するために使用されるスレッドの数を大幅に削減します。 すべてのデータセットは、独自の更新頻度を持つ各データセットの代わりに更新されます。 ほとんどの場合、これはほとんどのデータセットのより頻繁に更新を意味します。
        
この追加を有効にするには&lt;useSharedWatchサービス&gt;true&lt;/useSharedWatchService&gt; を setup.xml へ。
        
          
ぜひ、ぜひお試しください。 noaaa.govでジョン.
         
    * ログに誤ったvarの名前を修正しました。 Ayush Singhの修正のおかげで。
         
    * いくつかの小さな変更とバグ修正。
         
*    **改善のためのERDDAP™開発者:** 
    * Dockerを使ったローカル開発のサポート マット・ホプソンとロジェに感謝します。
         
    * Jetty およびドキュメントの改善によるローカル開発のサポート Micah Wengren ありがとうございます。
         
    * 問題のクロスプラットフォームを削減するためのテストの変更。 お問い合わせ シャネ・セント・サヴィッジ
         

## バージョン 2.23{#version-223} 
 (リリース 2023-02-27) 

このリリースはボブ・サイモンズによって行われ、それによって、クリス・ジョンへの移行中に、彼はまだ周りと活動的であることを示しています。 このリリースでは、指定された場合を除き、すべてのコードの変更は Chis John によって行われます。

*    **新機能と変更 (ユーザ向け) : : :** 
    *    (なし)   
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * するには:セキュリティの変更: 「Googleでログイン」の一部である新しいGoogle IDサービスライブラリを介してGoogle認証が達成されました。 旧「Googleサインイン」システムのサポートは2023-03-31を中止します。 そのため、Google 認証をお使いの場合ERDDAP™インストール, あなたは、に更新する必要がありますERDDAP™v2.23+ の前に。 (ご迷惑をおかけしますが、ご了承ください。 それはボブの欠陥です。)   
         
    * 改善:NCCSV は v1.2 になりました。 変更は、ファイルがUTF-8でエンコードされたファイルであることです。 (彼らはASCIIだった) そのため、Unicode 文字はそのままに、エンコーディングなしで \\u_hhhhhhhhhhhhhh_ として指定できます。
NCCSVファイルを書くとき、ERDDAP™v1.2 ファイルを書きます。
        ERDDAP™v1.0 と v1.1 の仕様に従い、NCCSV ファイルを読み込みます。
Pauline-Chauvet、n-a-t-e、thogar-computer のおかげで、これを提案し、さまざまなスプレッドシートプログラムがUTF-8ファイルをインポートできるようにテストを実施します。 このコードの変更のためにボブサイモンのおかげで.
         
    * NEW: status.html の Web ページには、データセットの loadDatasets が現在ロードおよび関連する統計情報、データセットがロードされていない場合、またはデータセットがロードされていない場合のどれかを示すトップの近くの行があります。 これは非常に役立つことができますERDDAP™ロードの理由を把握しようとする管理者 データセットは長持ちしています。 また、nGridDatasets、nTableDatasets、nTotalDatasets は、現在インスタンス化されている以下の数をカウントします。 (以前、彼らは最後の主要な負荷の端としていました データセット) お問い合わせ
この変更は、ロイ・メンデルスゾーンのことです。 このコードの変更のためにボブサイモンのおかげで.
         
    * 生成: GenerateDatasets XmlがCF-1.10に変更 (CF-1.6 は) "Convention" 属性で。
このコードの変更のためにボブサイモンのおかげで.
         
    * いくつかの小さな変更とバグ修正。
         

## バージョン 2.22{#version-222} 
 (リリース 2022-12-08) 

今回のリリースはボブ・サイモンズによって行われたことに注意して、彼の成功者への移行中に、彼はまだ周りとアクティブであることを示しました。

*    **新機能と変更 (ユーザ向け) : : :** 
    *    (なし)   
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * する: 何も.
         
    * セキュリティ バグ修正: 言語選択のためのコードにクロスサイトスクリプト関連のバグがありました。 お問い合わせNOAAこれをキャッチするためのセキュリティスキャン。 これは、NOAAセキュリティは積極的に、定期的にセキュリティの弱点を探していますERDDAPお問い合わせ
         
    * セキュリティフィックス: 使用する多くのライブラリERDDAP™このリリースの一環として、通常どおり更新されました。 今回はPostgreSQLドライバをアップデートしました。 (セキュリティバグがあった) から 42.5.1.
         
    * 改善: より小さい変更へのERDDAPメモリ管理システムは、利用可能なメモリが不足しているため、与えられたリクエストが失敗する可能性を減らす必要があります。
         
    * いくつかの小さな変更とバグ修正。
         

## バージョン 2.21{#version-221} 
 (リリース 2022-10-09) 

*    **新機能と変更 (ユーザ向け) : : :** 
    *    (なし)   
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * お問い合わせJava17、 setenv.bat または setenv.sh の JAVA\\_OPTS で \\-d64 を使用しないでください。 そこであれば、削除してください。 64ビット版をダウンロードしたときに64ビットモードが選択されていると思いますJavaお問い合わせ サム・ウッドマンのご協力ありがとうございました。
         
    * バグフィックス: 時々、新しいメールシステムは、あまりにも頻繁にログインしようとしました。これにより、Googleメールサーバーは、すべての将来のログを試みることを拒否しました。 これで、メールシステムがこれと関連の問題を回避します。
         

## バージョン 2.20{#version-220} 
 (リリース 2022-09-30) 

*    **v2.20 を使用しないでください。 それは欠陥です。** しかし、管理者は、v2.21 +にアップグレードするときに、下に記載されているTO DO項目を行う必要があります。
     
*    **新機能と変更 (ユーザ向け) : : :** 
    *    (なし)   
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * 改善: 古いメモリ管理システムを再有効化 (数学2.ensureMemoryAvailable) 新しいメモリ管理システムを修正 (EDStatic.shedこのリクエスト) うまくいく。 お問い合わせ[記憶状態](/docs/server-admin/additional-information#memory-status)詳しくはこちら
         
    * CHANGED: デフォルト&lt;ipAddressMaxRequests&gt; お問い合わせdatasets.xml7から15に増加しました。 それはいくつかの正当なものであることは明らかですWMSクライアントは7件以上の同時リクエストを生成できます。
         

## バージョン 2.19{#version-219} 
 (リリース 2022-09-01) 

*    **v2.19 を使用しないでください。 それは欠陥です。** しかし、管理者は、v2.20 +にアップグレードする際に、下に記載されているTO DO項目を行う必要があります。
     
*    **新機能と変更 (ユーザ向け) : : :** 
    * NEW:新しいサーバー側の機能があります、orderBy好きな作品の絶え間ないorderBy, しかし、降順にソート. アダム・リードベッターのおかげで。
         
    * 即興:今、グラフ (地図ではなくマップ) キャンバスに空きスペースを埋めるために展開します。つまり、凡例では使われない空間です。 &.size=_width_ を追加して操作することで、高グラフ、四角グラフ、または広いグラフを得ることができます。|_height_ パラメータ (幅と高さは、キャンバスのサイズ、ピクセルで指定します) URL リクエストで。 (.graph の Web ページではオプションではありません。 手動でURLに追加する必要があります。) &.sizeパラメータを指定しない場合は、.smallPng、.png、.largePng、.smallPdf、.pdf、および.large.pdfの要求はあらかじめ定義されたキャンバスサイズを持っているので、グラフは利用可能なスペースを埋めるために展開しますが、通常はほぼ四角になります。 ボブ・フレミングのおかげ
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * お問い合わせERDDAP™今すぐリクエストJava17 と関連する Tomcat 10. あなたが従わなければならないERDDAP™インストール手順 (または Docker の等しい例) インストールするJava17 と Tomcat 10 をコピーし、\\[トームキャット\\]あなたのTomcat 8インストールから新しい/contentディレクトリ\\[トームキャット\\]ディレクトリ。 あなたがあなたのものにする必要がある他の変更はありませんERDDAPこの変更に関連するインストール。 つまり、ERDDAP™前にやったように作品。
        
忘れてはいけませんERDDAP-Tomcatのserver.xmlとcontext.xmlをアップグレードするときに関連した変更。 お問い合わせERDDAPお問い合わせ[Tomcatインストール手順](/docs/server-admin/deploy-install#tomcat)お問い合わせ
        
私の印象Java17 は、長期的、より大きい適用のためのより多くの処理力および記憶を好むことですERDDAP™より少し遅くなるのでJava低い電力コンピュータとの8 (例:2コアと最小限のRAM) そしてより少し速く働かせますJava8 高い発電コンピュータと (例:4コアと豊富なRAM) お問い合わせ パフォーマンスが悪い場合は、Linux のようなプログラムを使用してください。[トップトップ](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)リソースの使用法を確認し、与えることを考慮するERDDAP™より多くのリソース、特により多くのメモリ。 記憶は安い&#33; ほとんどの携帯電話は、実行するために使用しているサーバーよりも多くのプロセッサとメモリを持っていますERDDAPお問い合わせ
Erin Turnbullのおかげで.
         
        
    * TO DO: ご利用の場合ERDDAP™Cassandraにアクセスするには、Cassandraのために、あなたは、バージョンのJavaCassandraを実行するために使用していたこと。 スイッチだけJava17 ランニングのための Tomcat+ERDDAPお問い合わせ
         
    * お問い合わせ: サーバの CPU が 4 コアと 8 + GB の RAM を持っている場合は、これらの設定を変更してください。datasets.xmlファイル:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

サーバがリソースが少ない場合は、その設定の「1」に固執します。
nThreadsシステムEDDGridファイルとEDDTable FromFilesが大幅に改善されました。 これらの変化は、巨大な速度改善につながる (例えば、nThreads が 2 以上に設定されると 2X のスピードアップ) 最も困難な要求のために (多数のファイルが結果を集めるために処理しなければならない場合) お問い合わせ Chris Johnの関連変更は、全体的に一般的なスピードアップにつながるERDDAPお問い合わせ これらの変更のコードは、Chris John が貢献しました。 お問い合わせ クリス&#33;
         
    * 警告: 催眠datasetID's は非推奨であり、サポートされていない (技術的に許可されているが) お問い合わせ 次のリリースでは、おそらく使用できません。 もしあなたがハイフンを使うなら、問題を避けるためにアンダースコアに転換して下さい。 変更を加えると、自分のスピードで行います。 次のリリースまで待ってから、慌ててて、その日に対処する必要があります。
         
    * NEW: 今、のために.htmlTable文字列セルのデータにデータが含まれている場合、data:image/png;base64 は base64 のエンコード .png イメージで、ERDDAP™アイコンが表示されます (そのため、ユーザーはそれを上回るならイメージを見ることができます) テキストや画像をクリップボードに保存するためのボタン。 マルコ・アルバに感謝 (コードに貢献した方) ボブサイモンズ (少し修正した) お問い合わせ
         
    * 新規: -doNotAddStandardNames
実行時に\\-doNotAddStandardNamesをコマンドラインパラメータとして含める場合 データセット Xmlは、発生します データセット Xmlは追加しませんstandard\\_nameお問い合わせaddAttributes緯度、経度、高度、深さまたは時間という変数以外の任意の変数 (明らかであるstandard\\_nameツイート) お問い合わせ 出力を生成から使用している場合は便利です データセット 直接XmlERDDAP™出力を編集することなく、生成する データセット Xmlはしばしば推測しますstandard\\_name誤って。 (使用する前に、出力を編集しておくことをお勧めします。ERDDAPお問い合わせ) このパラメータを使用すると、推測されるため、他のマイナーな関連効果がありますstandard\\_name他の目的のために、例えば、新しいを作成するために使用されることが多いlong\\_name、colorBar の設定を作成する。 Kevin O'Brien(ケビン・オビエン)
         
    * NEW: 今置くことができます&lt;updateMaxイベント&gt;10&lt;/updateMaxイベント&gt; お問い合わせdatasets.xml  (トップ付近の他の設定で) ファイル変更の最大数を変更する (デフォルト=10) updateEveryNMillisシステムで処理されます。 大きい数字 (100 か。) データセットが常に最新の状態に保つことが非常に重要である場合、便利です。 詳細はこちら[updateMaxEvents ドキュメント](/docs/server-admin/datasets#updatemaxevents)お問い合わせ John Maurerさん、ありがとうございました。
         
    * NEW: グローバルなサポートを追加real\\_time=trueの場合|false" 文字列属性。
これが false の場合 (デフォルト) データセットが更新を使用しない場合 エベンミリリス、ERDDAP™ファイルが作成される必要のあるファイルタイプのリクエストに対するレスポンスをキャッシュします。ERDDAP™応答をユーザーに送信し、最大15分間再利用を開始できます。 (例:.nc, .png) お問い合わせ
これがtrueに設定されているか、データセットが更新を使用している場合 エベンミリリス、ERDDAP™応答ファイルをキャッシュしないようにし、新しく作成したファイルを常に返します。
John Maurerさん、ありがとうございました。
         
    * 新規:メールが別のメールに送信されます。 これは、loadDatasets がメールが送信されるのを待つ必要がないため、データセットやその他のアクションを高速化します。 新しいシステムは、メールセッションごとに複数のメールを送ることができます。そのため、メールサーバのログイン回数を減らし、失敗する恐れを減らすことができます。 log.txt の status.html ページと診断メッセージの emailThread の統計があります。 "emailThread" を探します。 nEmailsPerSession=0 の背が高いため、メールセッションはメール送信できませんでした。
ボブ・サイモンズのおかげで。
         
    * CHANGED:メールが若干異なるコードで送信されます (なぜなら、Java17 とメールへの変更スレッド) お問い合わせ メールでのお問い合わせerd.data at noaa.govお問い合わせ
         
    * NEW:リモート URL の「タッチ」が別々の touchThread で処理されるサブスクリプションアクション。 これにより、ロードデータセットやその他のアクションが URL に速く触れるようになります。ロードデータセットは、タッチが完了するまで待つ必要はありません。 log.txt の status.html ページと診断メッセージのtouchThread の統計情報があります。
ボブ・サイモンズのおかげで。
         
    * NEW: status.html ページでは、「Major LoadDatasets Time Series」では、現在のため、キャッシュされたリクエストの数を示す新しい「shed」列があります。ERDDAP™メモリ使用量が高すぎました。 キャッシュされたリクエストは、HTTPステータスコード503 "Service available" を返します。 これらの要求は必ずしも問題ではありませんでした。 忙しい時間に来たばかり。 これは、方法の刷新の一部でしたERDDAP™高いメモリ使用量を扱います。
         
    * 新機能: Unix/Linux コンピューターでは、CPU 負荷やメモリ使用を含む現在のオペレーティングシステム情報を含む、Status.html の Web ページに「OS Info」行があります。
         
    * 即興:今、いつERDDAP™再起動され、quickRestart=true が、EDDTableFromFiles の datasets がサブセットを再利用します。.ncそして明確.ncお問い合わせ 一部のデータセットでは、データセットをロードする時間を大幅に削減 (例:60秒から0.3秒) お問い合わせ 新しいメールに加えて、Thread と TaskThread (詳しくはこちら) 、これは大幅に再起動をスピードアップする必要がありますERDDAP™たくさんERDDAP™インストール。 ベン・アダムスとジョン・ケルフットのおかげ
         
    * 変更: 以前、孤児のデータセット (生きているデータセットERDDAP™しかし、datasets.xml) ステータスを記しただけでした。 各主要な loadDatasets の後の html および log.txt で。 これで、自動的に削除されます。ERDDAP™status.html と log.txt で通知され、メールにメールが送信されます。 お問い合わせ データセットを削除したい場合ERDDAP™, 今、あなたがしなければならないのは、そのXMLのチャンクを取り除きますdatasets.xml次の主要な loadDataset で削除されます。 ボブ・サイモンズに感謝します。
         
    * Netcdf-java v5.5.2とv5.5.3のKNOWN BUG: ザ・オブ・ザ・EDDGridフォードズ GenerateDatasetsのカタログオプション リモートTHREDDSカタログ内のデータセットへの参照を含むTHREDDSカタログに使用するXml。 今ではそうではありません。 netcdf-java 開発者に問題が報告されました。
         
    * BUG FIX: Docker ユーザが setup.xml パラメータを経由して設定するERDDAP\\_paramName_: int と boolean のパラメーター (例:メール Smtpポート) ,ERDDAP™_paramName_ を正しく探しませんでした。 お問い合わせERDDAP\\_paramName_。 アレッサンドロ・デ・ドンノさん、ありがとうございました。
         
    * 変更:ERDDAP™新しく作成したテストイメージが期待どおりに確認するために、自動システムを使用します。 クリスのおかげで ジョン・フォー・提案とボブ・サイモンの実装。
         

## バージョン 2.18{#version-218} 
 (リリース 2022-02-23) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * メニュー
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * バグフィックス:.nc一部の状況では、ファイルが閉じられませんでした。 今、彼らはいます。 マルコ・アルバ、ロランド・シュヴェッツェーザー、ジョン・マウラー、その他
         

## バージョン 2.17{#version-217} 
 (リリース 2022-02-16) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * バグフィックス: 変更後orderBy数年前に、Tabledap's Make A Graph が使用した多くのクエリを正しく処理しなかったorderBy_Xxx_. なるほど。 Maurice Libes のおかげで.
         
    * 変更: 以前、ERDDAP™リクエストの拒否 トランスペアレント 緯度や経度値が部分的に、あるいは完全に範囲外であったときのPngの。 (ERDDAP™GitHub の問題 #19, Rob Fuller に投稿 – Rob の投稿のおかげで) これで、画像の任意の範囲領域の透明ピクセルを返します。 多くのクライアントアプリケーションに便利です。 この変更を行うコードは、Chris John によって完全に行われました。 ありがとうございます。
         
    * 変更: 以前、ERDDAP™与えられた次元のインデックス値が与えられた次元のインデックス値が与えられた Griddap 要求を拒否しました\\[高い:低い\\]お問い合わせ これにより、低値と高値のスワップにより、これらのリクエストが有効になります。 これは、ユーザーやXtractoなどの外部プログラムに対して、緯度値が高値から低域まで、要求を要求するために、緯度値を持ついくつかのデータセットを追跡する必要がありました\\[ (50万円) : : : (2018年12月20日) \\]インデックス空間の要求があったように\\[低い:最高\\]お問い合わせ お問い合わせ https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html 今、リクエストは\\[ (2018年12月20日) : : : (50万円) \\]これらのデータセットの1つが自動的に解釈されます\\[ (50万円) : : : (2018年12月20日) \\]お問い合わせ
         
    * CHANGED: .esriAscii リクエストは、ユーザのブラウザーで「File : Save As」ダイアログ ボックスをトリガーします。 ジョエル・ヴァン・ノオルドに感謝します。
         
    * バグフィックス: 今、子供のデータセットの縦度変数がEDDGridLonPM180またはEDDGridLon0360 データセットにvalid\\_minおよび/またはvalid\\_max属性、それらは削除されますEDDGridLonPM180またはEDDGridLon0360 データセット。 Roy Mendelssohn のおかげで.
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * TO DO: セットがあったら&lt;dataProviderFormActive&gt; は、XSS 脆弱性を一時的に処理するために false にすることで、true に戻します。
         
    * SECURITY BUG FIX: データプロバイダのフォームでXSS脆弱性を修正しました。 Genaro Contreras Gutiérrez さん、ありがとうございました。
         
    * バグフィックス: AWS S3 が 10000 以上のファイルを持っていた場合、ERDDAP™「内部エラー」を押します。 修正しました。 Andy Zieglerのおかげで.
         
    * バグフィックス:EDDGridSideBySide は変数を許可しなかったsourceNames は異なる子のデータセットと同じです。 なるほど。 Joshua Stanford のおかげで.
         

## バージョン 2.16{#version-216} 
 (リリース 2021-12-17) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * CHANGES/BUGの修正: 言語固有のエディタからの提案のおかげで、翻訳システムへの多くの小さな変更。 Melanie Abecassis、Marco Alba、Jessy Barrette、Filipe Fernandes、Etienne Godin、Jennifer Sevadjian、およびMike Smitのおかげで。
         
    * Google Translateの用語で要求されるように、Google翻訳の適切な免責事項とアトリビューションを追加します。 また、&lt;html&gt; は、すべてのウェブページで HTML にタグをつけて、翻訳された機械として、英語以外のページを正しく識別できるようになりました。 マイク・シミのおかげで。
         
    * バグフィックス: ログインページが異なる言語設定で正しく機能できるようになりました。 マイク・シミのおかげで。
         
    * ニュースorderBySum フィルター。 そして、新しいチェックすべてとチェック解除すべてのボタンEDDGridデータアクセスフォームウェブページ マルコ・アルバのコードコントリビューションのおかげで。
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * お問い合わせ
        &lt;質問MarkImageFile&gt;QuestionMark.jpg&lt;/questionMarkImageFile &gt; ドキュメント
setup.xml ファイルでは、タグ全体を削除する必要があります。 (推奨されるので、デフォルトファイルは使用されます) または変更する:
        &lt;質問MarkImageFile&gt;QuestionMark.png&lt;/questionMarkImageFile &gt; ドキュメント
         
    * 変更: ちょうどあなたが知っている、[リクルート](https://adoptium.net/?variant=openjdk8)主/推薦された源として採用OpenJDKを取り替えましたJava  (オープンJDK) お問い合わせ
         
    * CHANGE:ログファイルからERDDAP™, 生成データセット Xml と DasDds は現在 UTF-8 で、コンピューターのデフォルト文字セットではありません。 私は多くのチェックを行い、いくつかの変更を行なったので、ERDDAP™すべての種類のファイルを読み書きしたり、書きするときに常に適切な文字セットを指定します。 (複数の場合) コンピューターのデフォルト文字セットに依存します。 これは、いくつかの間違いを修正し、できるだけ多くのファイルタイプのためにUTF-8を使用することの目標にできる限り近いように移動しました (例:.log、.xml、.html、.json,.jsonお問い合わせ.ncヘッダー) お問い合わせ ISO-8859-1 を使用するには、古いファイルの種類が必要です。 (例:OPeNDAP.das、.dds、.csv、.tsv,.nc3、.nccsv, .cpt) お問い合わせ 以前はCFグループやCFグループと連携しようとしました。UnidataUTF-8のサポートを追加.nc3つのファイル;両方が抵抗力があるでした。
         
    * NEW: AWS S3からファイルをダウンロードすると、ERDDAPのキャッシュ FromUrlシステムEDDGridファイルとEDDTable FromFiles は、新しい AWS Transfer Manager を使用して、並列化されたチャンクを使用してファイルをダウンロードできるようになりました。 (従って非常に速い) お問い合わせ ターゲットスループットはファイルごとに20Gbpsに設定されますので、これはすべてのAWSインスタンスタイプでうまく動作しますが、特に優れた「ネットワークパフォーマンス」を持つもの。 この変更を使ってERDDAPのキャッシュ FromUrlシステムは、あらかじめチャンクされたファイルの並列ダウンロードのXarrayのアプローチに匹敵する速度を提供しますが、ソースファイルを変換する必要はありません.ncそして、.hdfチャンクされたXarrayファイルへ。 実際、ERDDAP's システムが同じファイルから読み込むための後続リクエストがある場合に優れています。ERDDAP™現在、ファイルのローカルコピーを持っています。 私たちのコミュニティは、長年にわたり標準化を続けてきました.ncそして、.hdfファイル。 これで、AWS S3 でデータを保存するときに、すべてのパフォーマンスをうまく取得するだけを AWS にすべきではありません。 豊富なSignellのおかげで。
         
    * CHANGE: searchEngine=Lucene は、現在、非推奨です。 多くの場合、searchEngine=originalのより望ましい動作とは若干異なる結果をもたらす複雑なシステムです。 ほとんどすべてのERDDAP™インストール、Luceneの時間の節約は結果の違いをオフセットしません。 必要に応じて、searchEngine=original を使用してください。 問題が発生した場合は、ボブにメールを送ってください。
         
    * CHANGE: ルーセンのsearchEngineは、元のsearchEngineのように動作します。 ルーセンがデータセットのマッチを考えて元のものではないと判断した場合、もうありません。 また、ルクエンのランキングでは、元のランキングと同等 (オリジナルは、常にランキングを計算するために使用されるので) お問い合わせ
         
    * バグフィックス: 最近のリリースで始まり、ERDDAP™AWS S3 の Bucket で最初の 1000 以上のオブジェクトが表示されない。 今、ERDDAP™オブジェクトのすべてが表示されます。 Andy Zieglerのおかげで.
         
    * BUG FIX: 今EDDTableAggregate Rowsは削除しますactual\\_range子データセットの1つ以上が変数を知らなかったら、属性 お問い合わせactual\\_range  (例:EDDTableFromDatabase) お問い合わせ Erik Gelettiのおかげで.
         

## バージョン 2.15{#version-215} 
 (リリース 2021-11-19) 

*    **新機能と変更 (ユーザ向け) : : :** 
    *   ERDDAP™すべてのWebページで使用する言語を指定できるようにする新しいシステムがあります。 もしERDDAP™インストールは、すべてのWebページの右上隅にある言語の一覧が表示されます。ERDDAP™このバージョンの前の URL は引き続き機能し、英語のコンテンツを常に返します。
        
すべてのテキストやすべてのWebページが翻訳されていない。 このプロジェクトでは、Qiとボブが100%になるのを防ぐ時間制約がありました。
        
明らかな質問は、ChromeがWebページをオンザフライに変換すると、これにそれほど多くの努力を費やしたのはなぜですか? 答えは: このようにして、翻訳が行われる方法について、もっと多くの制御を得ます。 確かに、Webページでは翻訳されてはならない言葉がたくさんあります。例えば、データセットのタイトルと要約、変数の名前、パラメータ、単位、および組織。 翻訳の努力の多くは、翻訳されない言葉やフレーズを識別していました。 また、機械翻訳は特定のタイプのHTMLマークアップを縮小する傾向にあります。 翻訳の管理は、この問題を最小限に抑えるために許可しました。
        
Qi Zengによる翻訳プロジェクト (Google Summer of Code インターン) そして、Googleの翻訳Webサービスを使用して、ボブサイモン。 巨大なプロジェクトでした。 お問い合わせ お問い合わせ
        
    * バグフィックス:ERDDAP™ORCID ID は、X を最後の数字として保持できるようになりました。 Maurice Libesのおかげで.
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * お問い合わせ
        
        * 関連するいくつかの変更を行う必要があります。ERDDAPユーザがWebページの言語を指定できるようにするための新しいシステムです。
            * setup.xml の最初の行で、datasets.xmlテキストエディタでドキュメントのエンコーディングを変更することで、UTF-8ファイルとして保存されます。 生成データセット Xml は、現在、datasets.xmlUTF-8ファイルです。
            * コンパイルしたプログラマERDDAP: : : すべてERDDAP™.java ファイルはデフォルトで UTF-8 ファイルとして扱われるべきです。 "-encoding UTF-8" を javac コマンドラインに追加する必要があります。 (しました。) 
            * このシステムを有効にするには (強くお勧め) , で&lt;startBodyHtml5&gt; で指定するタグdatasets.xml「&amp&#33;loginInfo」を「&amp&#33;loginInfo」に変更します。|&amp&#33;language;「すべての言語の右上隅に表示されるようにERDDAP™サイトマップ
            *   ERDDAP™使用のみ&lt;startBodyHtml5&gt; で指定するタグdatasets.xmlバナーのHTMLコンテンツは、すべての一番上に指定するERDDAP™ユーザが選択した言語に関係なく、Webページ。 使用するタグを変更した場合
ツイート&EasierAccessToScientificData;「科学データへのアクセスが容易」ではなく、
ツイート&BroughtToYouBy;"" ではなく、ERDDAP™バナー内のこれらのフレーズの翻訳バージョンを使用します。
            * 同様に、新しいデフォルト&lt;theShortDescriptionHtml&gt; でdatasets.xmlお問い合わせ
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
コンテンツの最後の3行は、翻訳されたテキストに代入されるものです。 それらのいずれかを変換する場合 (かなり &this 部分的なErddap;) またはテキストを明示するためにそれらすべてdatasets.xml  (優先していれば、) あるいは、そのテキストは、ユーザーが選択した言語に関係なく表示されます。 これは完璧ではありませんが、編集したい管理者が少ないと判断しました&lt;そのタグの35の異なる翻訳バージョンを提供するために、35の異なるファイルでsShortDescriptionHtml&gt;。
        
          
         
    * CHANGED: いくつかのエラーが若干異なるため、Status.html および Daily Report 電子メールで「失敗したリクエスト」の背が高いものに追加されることがあります。 そのため、その数字は以前よりも若干大きくなります。
         
    * BUG FIX: GenerateDatasets Xml 用EDDGridLon0360およびEDDGridLonPM180 では、ソースのデータセットがなくなりました。datasetID=〜。\\*\\_LonPM180" とdatasetID=〜。\\*\\_Lon0360, それぞれ.
         

## バージョン 2.14{#version-214} 
 (公開日 2021-07-02) 

*    **新機能と変更 (ユーザ向け) : : :** 
    *    (なし)   
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * 新しい:EDDGridLon0360 は、経度値の &gt;=0 および&lt;=360 は、経度値のグリッドデータセットから &gt;=-180 と&lt;=180. 詳細はこちら[EDDGridLon0360 ドキュメント](/docs/server-admin/datasets#eddgridlon0360)お問い合わせ デール・ロビンソン 様
         
    * 新しい:ERDDAP™管理者は、setup.xml の値を環境変数で上書きできるようになりました。ERDDAP\\__valueName_ を実行する前にERDDAPお問い合わせ 例えば、ERDDAP\\_baseUrl オーバーライド&lt;baseUrl&gt; 値。 デプロイ時に便利です。ERDDAP™コンテナで、setup.xml に標準設定を設定し、環境変数を介した特別な設定を提供できるようにします。 秘密情報を供給する場合ERDDAP™この方法では、情報が秘密に残ることを確認してください。ERDDAP™起動時に環境変数を 1 回だけ読み込み、起動の 1 秒で、これを使用する方法は次のとおりです。環境変数を設定し、起動します。ERDDAP™, まで待ちますERDDAP™環境変数をunsetし始めます。 マルク・ポルティエさん、ありがとうございました。
         
    * IMPROVED: 今度は、EDDTableFrom のファイル... たくさんのファイルを持つデータセットは、非常に長い文字列値を持っています。データセットははるかに高速に読み込まれ、リクエストに迅速に対応します。 以前は、ERDDAP™そのようなデータセットのファイル情報で保存されているファイル内の min と max の String 値の多くのスペースを割り当てます。 結果のファイルが巨大で、書き込まれ、ゆっくりと読むことができます。 OBISのおかげで。
         
    * 即興:今、ERDDAP™CSV ファイルに異常で無効な文字シーケンスを解釈するより良いジョブを行います。 OBISのおかげで。
         
    * フィックス:カスサンドラとトラブルの年後、私はついにCassandraをインストールしました (バージョン2) 再びCassandra v2でテストを再実行できるようにしました。 今、私はもっと自信を持って状態にすることができますERDDAP™Cassandra v2とv3で動作します。 ONC のおかげで.
         

## バージョン 2.12{#version-212} 
 (公開日 2021-05-14) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * バグフィックス: サブスクリプションブラックリストにしている場合は、サブスクリプションのリストをリクエストできません。
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * TO DO: 新規: 悪意のあるユーザーの能力を自動的に制限し、他のユーザーに対してシステム性能を低下させるような同時リクエストを大量に作成する正当なユーザーを攻撃するシステム。 に3つの新しい任意札がありますdatasets.xmlあなたができるか、またはあなたがすぐに追加することができます&lt;グラフ背景色&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

詳しくは、[ipAddressMaxリクエスト](/docs/server-admin/datasets#ipaddressmaxrequests)お問い合わせERDDAP™また、「ユニークユーザーの数」もプリントできるようになりました。 (スタートアップ) "status.htmlページで。
中国の人のおかげで攻撃私のERDDAP™インストール。
         
    * Postgresql ドライバーの動作への変更: Postgresql ドライバーを更新すると、postgresql と GenerateDatasetsXml が生成するテーブルリストの列名が、以前のように、すべての小文字ではなく、すべての大文字に戻りました。 データベースは、多くの場合、これらの名前が不感的であると考えているので、他のものに影響を与えるかどうかはわかりません。 私のテストデータセットは正しく機能します。 しかし、データセットがこれで機能しなくなる場合ERDDAP™アップデートは、まず第一に追随する原因です。
         
    * バグフィックス:ERDDAP™また、プライベートなAWS S3ファイルを正しく処理します。 AWS S3 ファイルの処理に関連した改善がありました。 Michael GanglとDylan Pughのおかげで、マイケル・ギャングとDylan Pughの共同作業が始まります。
         
    * 新しい:EDDGridFromNcFilesとEDDGridからNcFiles Unpacked では「構造」からデータを読み込むことができます。.nc4と4.hdf4ファイル。 構造からある変数を識別するため、&lt;sourceNameツイート フォーマットを使用する必要があります: _fullStructureName_|_memberName_、例えばgroup1/myStruct|メンバー NRL のおかげで。
         
    * CHANGED:現在、現在のメモリ使用量とこの要求が少し高ければ、Griddapセット nThreads はこのリクエストを 1 にリクエストします。 したがって、ERDDAP™記憶が傷つくとき記憶を節約して下さい。 中国の人のおかげで攻撃私のERDDAP™インストール。
         
    * 開いたファイルの数を監視するための新しいシステム (ソケットとその他のものを含むファイルだけでなく、) Linux コンピューターの Tomcat にインストールします。 一部のファイルが誤って閉じられない場合は、許可されたファイル数と多くの本当に悪いものが発生するまで、開いたファイルが増える可能性があります。 今、Linuxコンピュータで (情報はWindowsでは利用できません) : : :
        
        * status.html の Web ページの右端にある "Open Files" カラムは、最大ファイルの割合が開きます。 Windowsでは、「?」と表示します。
        * いつかERDDAP™各メジャーデータセットのリロード終了時にその情報を生成し、ログに印刷します。 txt ファイル:
openFileCount=_current_ の max=_max_%=_percent_
        * パーセンテージが &gt;50% の場合、メールが送信されます。ERDDAP™管理者とメール お問い合わせ 電子メールアドレス
        
より多くのことを見つけるために、またはあなたの上でこの問題を見ればERDDAP™, 見る[あまりにも多くのファイルを開く](/docs/server-admin/additional-information#too-many-open-files)お問い合わせ
中国の人のおかげで攻撃私のERDDAP™インストール。
         
    * NEW: 「Too」の多くのオープンファイルをチェックして処理するチェックを多く追加しましたので、タスクは止まり、ユーザはエラーメッセージが表示されます。 それらを読み込むと、データファイルが「あまりにも多くのオープンファイル」エラーで結果が出た場合は、もはや悪いようにマークされません。
         
    * ニュース\\[bigParentディレクトリ\\]/badFilesFlagディレクトリ:
このディレクトリにファイルを置くと、datasetIDファイル名として (ファイルの内容は問題ありません) ,ERDDAP™badFilesを削除.ncそのデータセットのファイル (お問い合わせ) データセットASAPを再ロードします。 この原因ERDDAP™以前にファイルを扱うために再び試みる (本当に?) 悪いとマークされる。 マルコ・アルバに感謝します。
         
    * CHANGED:スタートアップで、EDDGridから...ファイルやEDDTableFrom ... ファイルデータセットには、既知の有効なファイルのリストに 0 個のファイルがあります。 (例:新しいデータセットです。) , それからERDDAP™defers はそれをロードし、主要な loadDatasets が終了した後に ASAP をロードされるようにフラグを設定します。 新しいデータセットがある場合、初期起動を高速化します。
         
    * CHANGED: ファイルビジターDNLS.testAWSS3 () と ファイルVisitorSubdir.testAWSS3 () ; AWS v2 を使用します。 (v1ではなく) SDK について それでは今、GitERDDAP™ディストリビューションには、必要なすべてのファイルが含まれています。 大規模なv1 AWS SDK jarファイルを追加する必要はありません。
         
    * チャンジド: Maven を使用して依存関係を検知/監視するために切り替える (/libの.jarファイル) お問い合わせ AWS SDK の v2 への変更が必要になりました。 将来的には、他のインポートコードが必要です。 彼が作成したpom.xmlを提供し、使用したKyle Wilcoxのおかげで、私はいくつかの問題を解決しました。
         
    * CHANGED: classpath パラメータ (ログイン) GenerateDatasetXml、DasDds、その他の小さなプログラムで使用ERDDAP™, プログラマへのアドバイスでは、よりシンプルであり、ディレクトリを参照するので、再び変更しないでください, 個々のファイルではなく:
\\-cp クラス;C:\\programs\\\_tomcat\\lib\\servlet-api.jar;lib\\\\*
         (または ':' の代わりに ';' Linux と Mac の場合) お問い合わせ
         (ここ数年前にオプションになったら、この数年前にやるべきです。)   
         
    * 新規: GenerateDatasets Xmlには新しいユーティリティオプションがあります: グリッドされたコレクションから検索するfindDuplicateTime.nc  (と関連) 重複した時間値でファイルを見つけるファイル。 お問い合わせ[findDuplicateの検索 タイムタイム](/docs/server-admin/datasets#findduplicatetime)  
         
    * 新しい:datasets.xml今すぐ含めることができます&lt;Palttes&gt; タグをオーバーライドする&lt;message.xml の tag 値 (または 空の場合、messions.xml 値に変換します。) お問い合わせ これは、利用可能なパレットのリストを変更することができますERDDAP™実行中です。 また、cptfiles のサブディレクトリがある場合ERDDAP™コンテンツディレクトリ,ERDDAP™ディレクトリ内のすべての\\*.cptファイルをコピーします。\\[トームキャット\\]/webapps/erddap/WEB-INF/cptfiles ディレクトリ毎回ERDDAP™スタートアップ 一緒に、これらの変更を使用すると、パレットを追加し、新しいバージョンをインストールしたときにパーシストを変更することができますERDDAPお問い合わせ 詳細はこちら[パレットのドキュメント](/docs/server-admin/datasets#palettes)  
Jennifer Sevadjian、Melanie Abecassis、および多分他のコーストWatchの人々のおかげで。
         
    * チャンジド: [&lt;スローダウンTroubleMillis&gt; (/docs/server-admin/データセット#slowdowntroublemillis) いくつかのタイプではなく、すべての失敗リクエストに使用されます。
         
    * CHANGED: RunLoadDatasets スレッドが 3/4 LoadDatasets で LoadDatasets スレッドを中断 MaxMinutes なので、LoadDataset が中断を通知し、順調に終了する時間が増えます。 また、これにはより良く診断メッセージがあります。
         
    * 旧バージョンの Lucene から v8.7.0 へ変更
         
    * 変更: 送信された電子メールERDDAP™固定幅フォントで表示されます。
         
    * 変更:EDDGridFromFiles は、FIRST の axis 値と属性を取得します。|LASTファイルで指定された&lt;メタデータFrom&gt;. お問い合わせ (コメントはありません) ケン・キャシー、ら。
         
    * 最近のファイルで誤って使用している無効なユニット "degree\\_North" と "degree\\_East" のサポートを追加 (2020年10月1日) AVHRRパスファインダーバージョン5.3 L3-Collated (L3Cの) SSTデータセット (ネシーPH53sstd1dayとnceiPH53sstn1日) お問い合わせERDDAP™有効な単位にそれらを標準化できるようになりました。 お問い合わせ (コメントはありません) ケン・キャシー、ら。
         

## バージョン 2.11{#version-211} 
 (公開日 2020-12-04) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * BUG FIX:OrderByMeanは、変数が\\_FillValueかmiss\\_の1つだったらNullPointerExceptionを投げました 定義される値。 状況を正しく処理します。 マルコ・アルバに感謝します。
         
    * バグフィックス: ODV テキストファイルには問題がありました。ERDDAP™v2.10で。 これらの問題は修正されます。 シャウン・ベルに感謝します。
         
    * バグフィックス: お問い合わせERDDAP™v2.10: URL に lat lon のバインドが指定された場合、バウンディング ボックスは世界地図上に描画されていない。 あとはもう。 John Maurerさん、ありがとうございました。
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * バグフィックス: お問い合わせERDDAP™v2.10: アーカイブADataset、GenerateDatasetsのスクリプトファイル Xml と DasDds は、クラスパスの変更がなかったため、機能しませんでした。ERDDAP™v2.10. 今、彼らは行います. マルコ・アルバに感謝します。
         
    * 新機能: でdatasets.xml, あなたは今、タグを持っているかもしれません:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

現在、trueの場合 (またはタグが空の場合、またはタグがファイルにない場合) ユーザーのリクエストが NullPointerException につながると、ERDDAP™スタックトレースをメールで送信するerd.data at noaa.gov  (お問い合わせERDDAP™開発チーム) お問い合わせ 機密情報がないため、安全かつ安心です。 (例、リクエストUrl) メールでのお問い合わせ これは、NullPointerExceptions につながるあらゆる障害、全く予期しないバグをキャッチできるはずです。 そうでなければ、ユーザは例外を参照しますが、ERDDAP™開発者がいないので、修正が必要な問題はありません。
        
このタグは、他の類似の診断情報を電子メールで送信する可能性があるerd.data at noaa.gov未来へ。 電子メールのコンテンツは、常にバグと関連性が最小限に抑えられ、例えば使用情報などではありません。 マルコ・アルバに感謝します。
         
        
    * CHANGED: 今、一般的な圧縮ファイルタイプ (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) バイト範囲のリクエストに対しても禁止されています。 これは、&lt;拡張子NoRangeRequests&gt; に message.xml.
         
    * ノウェン・プロブレム: お問い合わせERDDAP™2.10、.nc属性を変更しようとする ml ファイルは、属性を変更しません。 これは私が報告したnetcdf-javaの既知のバグであり、netcdf-javaの次のリリースで修正されると言います。
         

## バージョン 2.10{#version-210} 
 (公開日 2020-11-05) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * NEW: 新しい[インターポレート](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)コンバーターは、グリッドされたデータセットの値を効率的に補う。 そのため、動物実験データを扱う研究者にとっては特に便利です。 このコンバーターは、緯度、経度、時刻の列を持つテーブルを取ります (そして、多分他のコラム) 補間値で追加の列を持つテーブルを返します。 したがって、これは人気に似ています[Xtractomaticの特長](https://coastwatch.pfeg.noaa.gov/xtracto)もともとDave Foleyによって作られたスクリプトですが、リクエストごとに最大100ポイントの処理の利点を提供します。 ダブ・フォリーとヨルダン・ワトソンに感謝 (NMFS) お問い合わせ
         
    * IMPROVED: 高度な検索は、.html 以外のリクエストに対して厳格です。 永続的なエラーを抱えるリクエストに対して例外を投げるようになりました (例: minLat &gt; maxLat のリクエスト) または一時的なエラー (例: リクエストstandard\\_name存在しない) お問い合わせ .html リクエストでは、高度な検索は変更されません: Google の検索と同様に、最善かつサイレントな修正やエラーを無視します。 豊富なSignellのおかげで。
         
    * 改善: アドバンスト検索ページのマップが大きくなりました (あなたはまだスパンコールする必要がありますが、少ない) そしてかなりより正確 (しかし、まだ完璧ではありません) お問い合わせ John Maurerさん、ありがとうございました。
         
    * IMPROVED: グラフのウェブページと&.land=... の「Draw Land Mask」の設定は、マップをリクエストする URL の設定は、2つのオプションをサポートしています。
「アウトライン」は、ランドマスクの輪郭、政治境界、湖、川を描きます。
"off" は何も描画しません。
詳細はこちら[&.land=... ドキュメント](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)お問い合わせ
John Maurerさん、ありがとうございました。
         
    * 重要: グラフとマップERDDAP™3つの新しいマーカータイプを使うことができます: ボーダーレス充填スクエア、ボーダーレス充填サークル、ボーダーレス充填三角形。 このコードは、ETT / EMODnet Physicsのマルコ・アルバによって貢献されました。 マルコ・アルバに感謝します。
         
    * 新しい:"files"システムは現在、プレーンをサポートしています ファイル型応答 (.csvの.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvまたは.xhtmlお問い合わせ) 、例えば、[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)お問い合わせ
Kyle Wilcox のおかげで.
         
    * IMPROVED: ユーザーがデータアクセスフォームを使用するときに生成されたURL (.html拡張子) または Make-A グラフ (.グラフ) webページでは、文字を正しくパーセントエンコードできるようになりました。\\[そして、\\]お問い合わせ これにより、URLは人間が読みやすくなりますが、Webセキュリティの観点から優れています。 管理者は現在、remoteQueryChars= の設定オプションを持っています。 お問い合わせ\\[\\]|' で Tomcat server.xml ファイル (より安全な) またはない (より安全な) お問い合わせ
Antoine Queric、Dominic Fuller-Rowell、その他多数のご愛顧を賜りますようお願い申し上げます。
         
    * NEW:EDDTableデータセットへのリクエストには&addが含まれている場合 変数 アクセス (アーカイブ 名前、属性 バリュー) ,ERDDAP™_attribute を持つすべての変数を追加します。 名前=属性 要求された変数のリストへの Value_ 。
詳細はこちら[ログイン 変数 ドキュメントの場所](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere)お問い合わせ Aurelie Briand(アウレリー・ブリアン)さん、
         
    * 刻まれた:ERDDAP™バイト範囲のリクエストを /files/ に拒否できるようになりました。.ncまたは.hdfファイル。 リモートに接続しようとしないでください.ncまたは.hdfローカルファイルがあったらファイルとしてファイル。 非常に非効率で、他の問題を引き起こします。 代わりに:
        * 使用条件(OPeN)DAPクライアントソフトウェアに接続するERDDAPお問い合わせDAPこのデータセットのサービス (/griddap/ または /tabledap/ URL で) お問い合わせ それは、DAPお問い合わせ
        * データセットのデータアクセスフォームを使用して、データのサブセットをリクエストします。
        * ファイルの全体や長時間にわたる繰り返しアクセスが必要な場合は、curl,wgetファイル全体をダウンロードしたり、ファイルのローカルコピーからデータにアクセスしたりできます。
             
    * 改良: .odv Txt の出力オプションは、新しいバージョンの新しいバージョンをサポートするために書き直されましたODV .txtファイルと、軌跡、時系列、プロフィールデータの適切な表現をサポートする。
         
    * IMPROVED: これで、ダブルクォートの検索条件は json 文字列として解釈されるので、 \\ エンコードされた文字を持つことができます。 他のものの中で、これは、属性の正確な一致を検索することができます。例えば、「institution=NOAA\\n" は、dataset と、system= と一致しません。NOAA NMFSお問い合わせ Dan Nowackiさん、ありがとうございました。
         
    * 改善: 追加の場所、浮動小数点 (特に2倍に変えられた浮遊物) 32.27998779296875のように2倍に表示されたフロートなど、追加の場所で数のもう少し丸みのあるバージョンとして表示されます。 Kyle Wilcox のおかげで.
         
    * BUG FIX: 符号なし整数のオーディオファイルが少し誤って読み込まれていました。 よく読んでいます。
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * 警告: 実行する初めてERDDAP™v2.10 はローカルデータファイルに基づくデータセットがロードされます。 **お問い合わせ** ゆっくりとERDDAP™ファイルのデータベースを再作成する必要があります。 初期リロードが遅い後、早速読み込みます。 お問い合わせ
         
    * あなたがしなければならないこと:
        * 最初にv2.10を実行すると、一部のデータセットはロードできません。ERDDAP™メタデータの一部を厳格化しました。 お問い合わせERDDAP™最初に読み込まれるときに毎日レポートをメールで送信します。 ロードしなかったデータセットのそれぞれのエラーメッセージが含まれます。 エラーメッセージを読み、問題を把握します。 ほとんどの場合、問題を解決するためにデータセットのメタデータに小さな変更を加える必要があります。
             
        * インスタグラムdatasets.xml, 検索&lt;sourceName&gt; = (注意:'='署名、識別する[固定値sourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) お問い合わせ ほとんどのERDDAP™セットアップは、これらはまれです。 後に値のいずれかの場合'='文字列 (数字ではなく) 文字列を二重引用符で囲む必要があります。 例えば、
前へ:&lt;sourceName&gt;=KZ401&lt;/ / / /sourceNameツイート
後:&lt;sourceName&gt;="KZ401"&lt;/ / / /sourceNameツイート
             
        * NEW: setup.xml に新しいオプション設定があります。&lt;defaultAccessibleViaFiles&gt; はデフォルトで設定します。&lt;accessViaFiles&gt; データセットごとに この新しいタグのデフォルトは false で、以前のタグを移行します。ERDDAP™行動。 この低レベル設定は、指定したデータセットでオーバールできます。&lt;accessViaFiles&gt; 設定。
            
おすすめ商品 (これを望むユーザーが存在するため) : : :
すべてのEDDを作りたいなら... ファイルシステムからアクセス可能な FromFiles データセット
            
            1. このタグを setup.xml ファイルに追加します。
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (オプション) すべて削除
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
お問い合わせdatasets.xmlデフォルトはtrueです。
                 
        * \\_FillValue属性を追加します。
            ERDDAP™すべての整数変数のデフォルト \\_FillValue を使用する: データ型の最大値 (例:バイト変数の127) お問い合わせ 今ではそうではありません。 これらの値がデータ値として示されていることを避けるため (値が見つからない) \\_FillValue 属性を使って明示的にこれらを記述する必要があります。 これからは、スタートするたびにERDDAP™, 管理者は、\\_FillValue を持たない整数ソース変数のリストで .csv テーブルでメールを送信します。missing\\_value属性、提案された new \\_FillValue 属性。 お問い合わせ[\\_Fill を追加 価値属性](/docs/server-admin/datasets#add-_fillvalue-attributes)詳細については、および指示。
             
        * コンパイルする場合ERDDAP™, これらの新しいjarの参照を追加するには、javacコマンドラインでclasspathパラメータを変更する必要があります: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar お問い合わせ
             
    * CHANGED: Tomcat 9はTomcatの推奨バージョンですERDDAPお問い合わせ Tomcat 8.5+ の最新バージョンは、現在でも問題ありません。 クリーンアップERDDAPお問い合わせ[Tomcatインストール手順](/docs/server-admin/deploy-install#tomcat)お問い合わせ
        
最新のバージョンJava8月8日 (コメントはありませんJava9,10,11 ...) から[採用OpenJDK](https://adoptopenjdk.net/)推奨バージョンのままJavaお問い合わせERDDAPお問い合わせJava8 は、AdminOpenJDK から長期サポートを持っているので、安全に使用できますが、セキュリティ上の理由から定期的に最新バージョンを入手してください。
        
    * NEW: スクリプトの SourceNames/ 表データセットで派生した変数
EDDTableFromFiles, EDDTableFromDatabase, EDDTableFromFileNames データセットには、式やスクリプトが含まれている場合があります。sourceNameお問い合わせ これは、ソースファイル内の既存の変数に基づいて新しい変数を作ることができます。 与えられた新しい変数の計算は、すべての行に対して繰り返し、結果の1行以内に行われます。 たとえば、値の縦度変数を-180 - 180°の範囲の変数から0 - 360°にするために:
        &lt;sourceName&gt;=数学2.anglePM180 (row.columnダブル (「ロン」) ) &lt;/ / / /sourceNameツイート
詳しくは、[スクリプト SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
ボブ・サイモンズのおかげで (以前に計画したERDDAP™v1.0 と最後に実装する方法を見つけました) , Kevin O'Brien, Roland Schweitzer, John Maurer, そして、Apache JEXL 本当に難しい部分をやることのためのライブラリ (よくやってみる) お問い合わせ
         
    * NEW: 符号なし整数データ型 (ubyte、ushort、uint、ulong) 現在サポート中です。 多くのファイルタイプに注意してください。 (例:.das、.dds、.nc3) これらすべての新しいデータ型をサポートしていません。 詳細はこちら[データデータ タイプ ドキュメント](/docs/server-admin/datasets#data-types)詳しくはこちらERDDAP™これらの違いを扱います。 確かに、以来(OPeN)DAP特に .dds の応答は、署名されたバイト、長、または ulongs をサポートしていません。ERDDAP.das と .das の表表現http.../erddap/ **インフォメーション** ツイートdatasetIDサイトマップ (例えば、[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) 他のファイルの種類や、.nccsvメタデータ応答 (例えば、[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) 、すべての状況ですべてのデータ型をサポートしています。
        
警告:この変更の影響を受けているデータセットについては、データセットに問題があることがわかります。ERDDAP™ソースからの読み込みは異なる可能性があります (e.g.、以前に署名された整数として読み込まれる変数は、署名されていない整数として読み込まれる) お問い合わせ 結果の問題は、データセットに新しいファイルを追加せず、データにアクセスしようとするとエラーです。 データセットに問題がある場合、最初に試すべきことは[ハードセット ログイン](/docs/server-admin/additional-information#hard-flag)データセットの場合。 問題が解決しない場合は、ログを見る必要があります。 txt はエラーメッセージを表示し、datasets.xmlデータセット、および/またはデータセット用のgenerateDatasets.xml を再実行する場合があります。
netcdf-java 5.x のおかげで (問題を強制する) 次回のCF 1.9。
        
    * 即興:今[より良いドキュメント/アドバイス](/docs/server-admin/datasets#s3-buckets)AWS S3 バケットのファイルからデータセットを作成する方法 Micah Wengrenのおかげで.
         
    * 変更点: 変更点はいくつかあります"files"システム。
        * 処理するコードは、より多くのクラスで使えるように書き換えられました。
             
        * NEW: ディレクトリリストのユーザリクエストは、 .csv というファイル拡張子を追加することで、レスポンスが標準のプレーンテーブルタイプのいずれかであることをリクエストできるようになりました。.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvまたは.xhtml)。 例えば、
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Kyle Wilcox と Shane St Savage のおかげです。
             
        * 即興: 生成する データセット Xmlは含まれません&lt;accessViaFiles&gt; 出力のタグ。 仮定は、データセットが新しい値に依存するということです&lt;デフォルトアクセス可能なViaFiles&gt; setup.xml のタグ お問い合わせ[アクセス バイファイル](/docs/server-admin/datasets#accessibleviafiles)お問い合わせ
             
        * 改善: 追加のデータセットタイプが利用可能になりました バイファイル:EDDGridサイドバイシド,EDDGridAggregate既存の次元,EDDGridFromErddap、EDDTableFromErddap、EDDGridEDDTable、EDDTableFromからEDDGridとEDDGridトピックス これらについては、指定されたリモート/チャイルドのデータセットからのファイルは、親とリモート/チャイルドのデータセットの両方がアクセス可能である場合にのみアクセス可能です。 ViaFiles が true に設定 (perhaps 経由で)&lt;デフォルトAccessibleViaFiles&gt;)。 ダミアン・スマイスとロブ・フラーのおかげ
             
        * TO DO/RECOMMENDATION: 設定することで、ファイルシステムからアクセス可能なすべての関連データセットを作ることをおすすめします。&lt;defaultAccessibleViaFiles&gt; は setup.xml で true で、これはデータを取得する好ましい方法であるユーザのグループがあります。 他の理由から、"files"システムは、ユーザーがどのファイルが利用可能であるか、そして最後に変更されたときに、ユーザーがデータセット全体を独自のコピーを維持できるようにするのは簡単です。 一般的にファイルシステムを介してアクセス可能なデータセットを作りたくない場合は、設定&lt;defaultAccessibleViaFiles&gt; を false にします。 どちらの場合も、&lt;accessViaFiles&gt; いくつかのデータセットでは、一般的なポリシーに例外があります。&lt;デフォルトアクセス可能なViaFiles&gt; (例えば、データセットが使用するとき.ncml ファイル、ユーザーに本当に有用でない) お問い合わせ
             
    * IMPROVED: ソースデータセットにCF Grid\\_mapping情報がある場合、生成します データセット グリッドデータセット用のXmlは、情報をグローバルに追加します&lt;addAtts&gt; と、情報はグローバルに追加されます。&lt;sourceAtts&gt; ファイルから毎回データを読み込みます。 dataset のグローバル属性は、プレフィックス Grid\\_mapping\\_ のセットとして表示されます。
         
    * 改善:読書時のグループのサポート.nc3 (そしてある程度.hdf5月5日) ファイル。 一般的には、ERDDAP™データセットは、ファイルのグループ内の変数から構成されます。 また、GenerateDatasets を生成します。 Xml 用EDDGridFromNcFilesとEDDGridからNcFiles 「グループ」を依頼 (例えば、任意のグループ、 "someGroup"、 "someGroup/someSubGroup"、"\\[ログイン\\]" ちょうどルートグループのために) お問い合わせ チャールズ・カルレトン氏、ジェシカ・ハウスマン氏に感謝します。
         
    * 生成: GenerateDatasets Xml 用EDDGridFromNcFilesとEDDGridからNcFiles unpacked は、このデータセットが使用したい寸法のソース名を指定できるオプションの「DimensionsCSV」パラメータをサポートしました。 "" を使用して、最も寸法を使用する変数を前に取得します。 また、このタイプのファイルで発生した関連する小さなバグを修正しました。 Sujal Manandharさん、ありがとうございました。
         
    * BUG FIX: GenerateDatasets Xml は "EDDTableFromJsonlCSVFiles" を適切にリストします。 ("EDDTableFromJsonlCSV" ではない) EDDTypeオプションの1つとして。 Andy Zieglerのおかげで.
         
    * 改善される:EDDGridからNcFiles unpacked は「units」属性を標準/「canonical」の udunits に標準化しました (ユニットコンバーターと同じ方法) お問い合わせ 例えば、"meter per second","meters/second","m.s^-1"と"m s-1"全員が"m s-1"お問い合わせ Andy Zieglerのおかげで.
        
警告: これは、いくつかの既存のデータセットの問題を引き起こす可能性があります (例えば、新しいファイルを「悪い」にラベルを付けることを引き起こします) お問い合わせ お問い合わせ[ハードセット ログイン](/docs/server-admin/additional-information#hard-flag)データセットでは、すべてのソースファイルが新しいシステムで読み直されるようにします。
        
    * 即興:変数の&lt;sourceName&gt; は =NaN の固定値を指定でき、変数は変数にactual\\_rangefinite 範囲を指定する属性。 これは、データセットが役立つことがあります (特に EDDTableFromFileNames データセット) ダミー変数を持つことができます (ツイート)   (例、緯度、経度、時間) NaN の固定値で、有効actual\\_range  (属性によってセットされる) お問い合わせ 次に、Advanced Searchでは、特定の緯度、経度、時間範囲、およびこのデータセットにデータがあるデータセットを検索することができます。 (実際のデータ列はすべてNaNを表示しますが) お問い合わせ 詳細はこちら[固定値の文書](/docs/server-admin/datasets#fixed-value-sourcenames)お問い合わせ
Mathew Biddle のおかげです。
         
    * NEW: 今、datasets.xmlEDDTableFromAsciiFiles または EDDTableFromColumnarAsciiFiles のデータセット用のチャンクには、ERDDAP™指定した正規表現にマッチする行を含むファイル最上位の行の全てを無視します。 例えば、
        &lt;skipHeaderToRegex&gt;\\\ をスキップする\\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*ヘッダーのエンド。\\*&lt;/skipHeaderToRegex(スキーヘッド)
" で始まる行を含むすべての行を無視します。\\*\\*\\* ヘッダーのエンド。 [を見る]&lt;SkipHeaderToRegex&gt; ドキュメント (/docs/server-admin/datasets#skipheadertoregex) お問い合わせ
エリ・ハンター
         
    * NEW: 今、datasets.xmlEDDTableFromAsciiFiles または EDDTableFromColumnarAsciiFilesdataset 用のチャンクには、タグを記述できます。ERDDAP™指定された正規表現に一致するファイル内のすべての行を無視します。 例えば、
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

"#" で始まる全ての行をスキップします。 [を見る]&lt;SkipLinesRegex&gt; ドキュメント (/docs/server-admin/datasets#skiplinesregex) お問い合わせ
エリ・ハンターのおかげで。
         
    * 新機能:datasets.xmlEDDTable データセットのチャンクには &add が含まれている場合があります。 変数 アクセス (_属性名CSV_) お問い合わせ もし、ERDDAP™指定した属性ごとにウィジェットを追加します。 データセットのデータアクセスフォームの名前 (.html ウェブページ) ユーザが &add を追加するのを簡単にする 変数 アクセス (アーカイブ 名前、属性 バリュー) リクエストへ
詳細はこちら[ログイン 変数 ドキュメントの場所](/docs/server-admin/datasets#addvariableswhere)お問い合わせ
Aurelie Briand(アウレリー・ブリアン)さん、
         
    * ニュース サードパーティツール:ERDDAP-リント
        ERDDAP-lintは、あなたのメタデータを改善するために使用できるアイリッシュ・マリン・インスティテュートのロブ・フラーとアダム・リードベッターのプログラムですERDDAP™データセット。ERDDAP-lint "ルールと簡単な静的Webアプリケーションが含まれているため、検証テストを強制的に実行できます。ERDDAP™サーバ。 すべてのテストは、Webブラウザで実行されます。 いいね&#33;[Unix/Linux lint ツール](https://en.wikipedia.org/wiki/Lint_(software)) 既存のルールを編集したり、新しいルールを追加したりすることができます。 お問い合わせ[ERDDAP-リント](https://github.com/IrishMarineInstitute/erddap-lint)詳しくはこちら
        
このツールは、以前に作成したデータセットに特に便利です。現在のメタデータ設定を最新のものにしたいです。 たとえば、GenerateDatasetの初期バージョン Xmlは、グローバルに創造する努力を払っていなかったcreator\\_name,creator\\_email, 作成者\\_type, またはcreator\\_urlメタデータ。 利用するERDDAP-lint は、メタデータ属性が欠けているデータセットを識別します。
        
このツールを作成するためのロブとアダムのおかげで、利用可能なツールを作るERDDAP™コミュニティ。
        
    * NEW: ファイルの一部がファイルの中にあれば大丈夫です。EDDGridFromFiles データセットには、すべてのデータセットの変数はありません。 変数を持っていたら、ファイルが含まれている (すべての欠落した値で) お問い合わせ
Dale Robinson と Doug Latornell のおかげです。
         
    * NEW: ログファイルやデイリーレポートには、管理者がメモリの問題を引き起こしているユーザーを識別できるようにするための新しい使用統計があります。 統計は「OutOfMemory」と名付けられます。 (配列のサイズ) "OutOfMemory" は、 (トオビッグ) と "OutOfMemory" (ウェイト ビッグ) お問い合わせ これらのカテゴリでリクエストをしたユーザーの IP アドレスと、そのリクエスト数を表示します。 面倒なリクエストがない場合、これらの統計は表示されません。 「OutOfMemory」について (配列のサイズ) と "OutOfMemory" (ウェイト ビッグ) " リクエストは大きかったので、通常は問題ではありませんERDDAP™それらを素早くキャッチし、エラーメッセージを返す。 「OutOfMemory」について (トオビッグ) 「要求はより危険ですから」ERDDAP™リクエストを処理するために現在利用可能なメモリが不足していたことに気付いた前に、いくつかの努力をしました (問題は、これらの要求の前に他の要求であってもよい) お問い合わせ
        
大規模なリクエストをしたユーザーのIPアドレスを表示する「大リクエスト、IPアドレス」という新しい統計もあります。 (現在、グリッド化.ncファイル &gt; 1GBの) お問い合わせ
        
また、status.htmlページにあるタイムシリーズテーブルには、「OutOfMemory」で失敗したリクエストの数を示す「memFail」列が追加されました。 (トオビッグ) " 最後のメジャーロードデータセット以来のエラー。 0以外の番号は、懸念の少なくともいくつかの原因です。
ボブ・サイモンズのおかげで。
        
    * NEW: 新しいバージョンのHyraxディレクトリのリストを前後に表示します。ERDDAP™古いディレクトリリストと新しいディレクトリリストを読み込みます。
         
    * NEW: データセットのリロードおよびユーザー応答は &gt;10秒をとって完了します (首尾よくまたは不成功) "" とマークされている (&gt;10代目) お問い合わせ したがって、このフレーズのlog.txtファイルを検索して、リロードやリクエストのリクエスト数が遅くなるデータセットを見つけることができます。 その後、log.txtファイルでデータセットの問題が何であるか、またはユーザーリクエストが誰であるかを確認することができます。 これらの遅いデータセットの読み込みとユーザのリクエストは、時に課税されますERDDAPお問い合わせ そのため、これらの要求についての詳細は、問題を特定し、解決するのに役立ちます。
    * 改善: CF DSG データセットを有効化する場合、ERDDAP™cf\\_role 属性を持つ変数が、対応する cdm\\_...\\_variables リストにあることを確認し、他の cdm\\_...\\_variables リストにはありません。 例えば、 cf\\_role=timeseries\\_id 属性を持つ "station\\_id" 変数がある場合、 "station\\_id" は cf\\_timeseries\\_variables リストにある必要がありますが、 cf\\_profile\\_variables リストには含まれません。
Micah Wengrenのおかげで.
         
    * 改善: 'Simplify' がより速く、より少ないメモリを使用し、LongArrayを返すことがあります。 お問い合わせUnidataお問い合わせ
         
    * 即効: EDDTableFrom のクイックリスタートが大幅に高速になりました (nc関連) ファイル (EDDTableFromNcCFFiles と EDDTableFromInvalidCRAFiles を除く) 作製だから 期待される (別の場所) これで、すべてのデータの読み込みではなく、サンプルファイルのメタデータを読み込みます。 ようこそジェシカ・オースティンへ。
         
    * 改善: 追加の数字がすべての0's、例えば、「2020-05-22T01:02:03.456000000Z」である場合、精度が大きい時間文字列のサポートができるようになりました。 Yibo Jiangのおかげで.
         
    * 改善: GenerateDatasetsXml の EDD.suggestDestinationName を '(' と ' を全て削除するために使用されます。 削除する (.)\\*) それが終わりである場合だけsourceNameお問い合わせ 削除する\\[お問い合わせ\\*\\]それが終わりである場合だけsourceNameお問い合わせ ジュリエン・パウロに感謝します。
         
    * 生成: GenerateDatasets Xml は変数を作るようになりましたdestinationNames は、必要に応じて \\_2, \\_3, ... を追加することでユニークです。 ジュリエン・パウロに感謝します。
         
    * 推奨: Calendar2.parseDateTime が dd,h,HH をパースすると、最初の 'digit' はスペースになるかもしれません。
    * ノウェン・プロブレム: まずはERDDAP™2.10、.nc属性を変更しようとする ml ファイルは、属性を変更しません。 これは私が報告したnetcdf-javaの既知のバグであり、netcdf-javaの次のリリースで修正されると言います。
         
    * ブロケンリンクスフィックス: 壊れたリンクのテストのための適切なシステムを作りましたERDDAP™ウェブページなので、壊れたリンクが少ない (各リリースの日付の少なくとも--頻繁に発生する新しい壊れたリンク) お問い合わせ
         
    * BUG FIX: EDDTableFromHttpGet は特定の種類のリクエストに失敗しました。 今ではそうではありません。 BODCのEMMAのおかげで。
         
    * バグフィックス: 一部のリクエストを処理するには、EDDTable はリクエストされた変数ごとに一時ファイルを作成しました。変数の名前で終わるファイル名です。 変数の名前が圧縮の型だった場合 (例:.Z) ,ERDDAPお問い合わせ (失敗する) 一時的なファイルを解凍します。 暫定ファイル名が ".temp" で終わるようになりました。 Mathew Biddle のおかげです。
         
    * BUG FIX: GenerateDatasetsXml と Calendar2.convertToJava日付時間 フォーマットは、おそらく無効な日付時間フォーマットを修正しようとすると、誤った変更を行う可能性がはるかに低いです。 なお、自動集計された dateTime 形式は変更されません。 Mathew Biddle のおかげです。
         
    * バグフィックス: リモート URL からコンテンツを取得するときにエラーが発生し、errorStream コンテンツが圧縮されている場合は、ERDDAP™エラーメッセージを正しく削除します。 ボブ・サイモンズに感謝します。
         
    * バグフィックス:&lt;subscribeToRemoteErddapDataset&gt; は EDD のときに適用されません... FromErddap データセットは子データセットでした。 です。 Chris Romsosのおかげで.
         
    * BUG FIX: GenerateDatasets Xml は "latin" で始まるソース変数名が緯度になるのではないでしょうか。 Vincent Luzzoのおかげで.
         
    * BUG FIX: 今, OutOfMemoryError ユーザのリクエストを処理するときにデータファイルを読みながら、BadFilesリストにファイルを追加する理由はありません. ボブ・サイモンズに感謝します。
         

## バージョン2.02{#version-202} 
 (公開日 2019-08-21) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * NEW: 複数のデータセットを検索する2つの方法がありますERDDAPお問い合わせ 彼らはわずかに異なる動作し、異なるインタフェースとオプションを持っています。
        
        *   [検索マルチプルERDDAPツイート](/SearchMultipleERDDAPs.html)ボブ・サイモンズ/NOAA NMFS SWFSC ERDお問い合わせ
        *   [ http://erddap.com ](http://erddap.com)ロブ・フラー/アイルランド海洋研究所
        
Tylar Murray(タイラー・マレー)のオリジナルリクエストを承っております。
         
    * 提案: 要求への"files"リモートサイトで実際にあるファイルをダウンロードするシステム (例:AWS S3) リダイレクトにつながるので、ユーザーは実際にソースからデータをダウンロードします。ERDDAP™仲介者として。 Andy Ziegler のおかげで、NOAAお問い合わせ
         
    * NEW: AWS S3 関連の新機能の一例として、公開 AWS S3 の Bucket からファイルを閲覧・ダウンロードしやすくするために作成しました。
        [~110サンプルデータセット](https://registry.opendata.aws/)誰がほぼすべてのコンテンツを閲覧できるようにする
        [AWS S3 オープンデータバケット](https://registry.opendata.aws/)お問い合わせ クリックすると"files"これらのサンプルデータセットのいずれかのリンク、S3 バケットのディレクトリツリーとファイルを閲覧できます。 これらのデータセットが機能するので、これらのディレクトリリストは最新です。ERDDAP™それらをオンザフライを取得します。 ディレクトリツリーを実際のファイル名にクリックし、ファイル名をクリックします。ERDDAP™リクエストをAWS S3にリダイレクトし、ファイルを直接AWSからダウンロードできます。ERDDAP™管理者はできます
        [他のS3バケットでこれを行う方法の指示を読みます](/docs/server-admin/datasets#working-with-aws-s3-files)お問い合わせ Andy Ziegler のおかげで、NOAAお問い合わせ
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * 必要なこと: どれも
         
    * 改善される:ERDDAP's 文字列の配列を格納する方法 (ストリングアレイ) よりメモリ効率が向上しました。 ストリング 配列は、ERDDAP™特に、表形式の ASCII データファイルを読み込みます。 また、CSV/TSV/SSV ASCII、カラムASCII、jsonlCSV タブラーデータファイルをより速く、よりメモリ効率が向上します。 結果は: 764 MB の ASCII データ テスト ファイルのため (しかし、52MBに圧縮.gzファイル) 3,503,266行と33列で、最大メモリ使用量は10GBから0.6GBまで (ピーク時) お問い合わせ 読み取れる時間は～7分 (しかし、物理的なメモリがどのくらいのコンピュータで大きく変化する) ～36秒 (簡単に10秒を含む () GenerateDatasets でのみ使用されます。 Xmlの) お問い合わせ 他の多くの場所でERDDAP™この増加したメモリ効率の恩恵を受ける。 Tylar MurrayとMathew Biddleは、タイラー・マレー、マテス・ビドル、マテス・ビドル、マテス・ビドル、マテス・ビドル、マテス・ビドル、マテス・ビドル、マテス・ビドル、マテス、マテス・ビドル、マテス、マテス・ビドル、マテス・ビドル、マテス、マテス、マテス・ビドル、マテス、マテス・ビドル、マテス、マテス・ビドル、マテス、マテス、マテス・ビドル、マテス、マテス、マテス、マテス、マテス、マテス、マテス、マテス・ビドル、マテス、マテス、マテス、マテス、マテス、マテス、マテス、マテス、マテス、マテス、マテス・ビドル、マテス、マテス、マテス、マテス、マテス、マテス、マテ
        
私は異なるソリューションを探求しました (StringArray の文字列を UTF-8 でエンコードされたバイト配列として格納する) お問い合わせ メモリ使用量を33%削減するが、~33%の減速のコスト。 今使っているシステムと比較して、悪い取引のように思える。 コンピュータにより多くの記憶を与えることは容易です (より多くのメモリを購入する ~$200) より速くなる (新規コンピュータ全体を購入する) お問い合わせ
        
それが便利であるならば、それはまだいくつかの基準に基づいて、巨大な表形式のデータファイルをいくつかの小さなファイルに分割することをお勧めしますstationIDまたは時間。ERDDAP™ユーザのリクエストに応じて、小さなファイルの1つだけを開く必要があるため、はるかに高速に対応できます。
        
    * 即興:今[ERDDAP™AWS S3 ドキュメント](/docs/server-admin/datasets#working-with-aws-s3-files), 取得方法を説明するERDDAP™AWS S3 バケットのデータファイルと連携します。
また、ERDDAP™AWS S3 の新しい機能を使用JavaAPI です。
また、ERDDAP™AWS S3 URL が追加の文字を含むようになりました (期間、ハイフン、アンダースコア) バケット名
また、ERDDAP™AWS S3 バケット URL を特定の方法で特定する必要がある:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
プレフィックスはオプションです。
Andy Ziegler のおかげで、NOAAお問い合わせ
         
    * 生成: GenerateDatasets Xmlは現在、追加の共通処理を行いますmissing\\_values は値が不足しているため、列を数値データ型に変換する可能性が高い。 また、PrimitiveArray.simplify(プリミティブアレイ) () 特定のデータ値が与えられた列を文字列の列として扱うために引き起こしたログを表示します。 Mathew Biddle のおかげです。
         
    * 改善される:&lt;ブラックリスト&gt; リクエストができるようになりました。\\*お問い合わせ\\*  (または :\\*: : :\\*IPv6用) IPアドレスの最後に、IPアドレスのより大きな塊をブラックリストできるようにします。例えば、110.52。\\*お問い合わせ\\*  (中国 Unicom 天津) お問い合わせ [ ] のドキュメントを参照してください。&lt;リクエストブラックリスト&gt; (/docs/server-admin/datasets#requestblacklist) 中国Unicomと中国Telecomのおかげで。
         
    * IMPROVED: データセットのソースが指定しない場合"institution"属性、GenerateDatasets Xml と loadDataset が "creator\\_institution" 属性から取得できるようになりました。 (利用可能な場合) お問い合わせ Micah Wengrenのおかげで.
         
    * BUG FIX:標準化 常に ASCII のデータファイルに適用されませんでした。
また、EDDTable は、ソースが文字列の時間値を持っていたとき、時間値の制約を適切に処理しませんでした。 使用していたもの
パロマ・デ・ラ・ヴァレー
        
前にはっきり述べられなかった: 正規化を使用するだけ あなたが実際にそれらを必要とするときのどんな特徴 (例えば、異なるソースファイルが異なる方法で時間値を格納する場合) , 標準化を使用するデータセットへのいくつかの要求のため 少し遅く処理されます。
        
    * バグフィックス: 使用するコードのバグEDDGridFromNcFiles が失敗する原因.nc4と4.hdf"long" を持つ 5 つのファイル (インサート64) 変数。 修正しました。 Friedemann Wobus(フリーデマン・ウォブール)
         
    * バグフィックス: ISO 19115ファイルへの小さな変更で、異なるバリデータを作成できます。 Chris MacDermaidとAnna Milanのおかげです。
         

## バージョン2.01{#version-201} 
 (公開日 2019-07-02) 

*    **新機能と変更 (ユーザ向け) : : :** 
    * なし。
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * バグフィックス: データアクセスフォームを生成するコードのバグtabledapデータセットは、Webページが一部のデータセットの空白になっていることを引き起こしました。 また、すべてのHTMLページで予期しないエラーの処理を改善し、 (よくある質問) エラーメッセージを表示します。 マルコ・アルバに感謝します。
    * 生成: GenerateDatasets Xmlは出力の上部に長い警告を印刷しません。 お問い合わせ[遺伝子の編集 データセット Xmlの出力](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better)お問い合わせ スティーブン・バウムに感謝します。
    * 生成: GenerateDatasets Xmlは現在、さまざまな状況で少し異なる推奨事項を作る&lt;updateEveryNMillis&gt; for EDD...From...Files データセット。 また、GenerateDatasets を生成します。 Xml は、EDDTableFromFiles のデータセット用の元の "extract" システムを廃止しました。

## バージョン2.00{#version-200} 
 (公開日 2019-06-26) 

*    **ERDDAP™v2.00 ついにここに&#33; ユア&#33;**   
     
    * 本バージョンをクリアするために必要な期間は、大変申し訳ございません。
ありがとうございます。
         
    * 良いニュースは、ユーザーが要求した機能の多くを追加するために、余分な時間が使用されていたことです。 悪いニュースは、遅延しても、すべての要求された機能が追加されていないことです。 申し訳ありませんが、このリリースをもっと遅延させるよりももっと重要なのは残念です (永遠に?) 新しい機能を継続的に追加します。 今後、より頻繁にリリースされると約束します。
         
    * 「バージョン2?&#33;」 大きく変化し、互換性はありますか?
大きな新機能? はい。
管理者やユーザーの大きな不適合性や変更? いいえ。
v1.82からv2.00にジャンプしました。
        * 10年を祝う (今 11) 初公開以来ERDDAP™  (v1.00 に 2008-05-06, 当然、v2.00 のように注目して見ました) お問い合わせ その時、ERDDAP™1つのインストールから少なくとも12の国でほぼ100のインストールに行ってきました (オーストラリア、ベルギー、カナダ、フランス、インド、アイルランド、イタリア、南アフリカ、スペイン、タイ、イギリス、アメリカ) お問い合わせ
        * 完全に新しい方向に大きな追加をマークする部分:ERDDAP™既存のデータサーバサービスを利用するデータインジェストシステム (詳しくはこちら[EDDTableFromHttpGetの特長](#eddtablefromhttpget)) ,
        * そして、特に1.82から2.00までの大きなジャンプではなかったので、これは正しい時間のように思える。
             
    * 他の良いニュースは、2つの他のグループがコードを貢献している現在あることですERDDAP™  (このバージョンでは、それらが続行する表示とともに) : アイルランドの海洋研究所のRoland Schweitzer、PMELとWeathertop ConsultingのRoland SchweitzerのRob FullerとAdam Leadbetter。 ありがとうございます。 彼らが自分の選択のプロジェクトに取り組んでいるのは事実ですが、それは古典的なオープンソース開発モデルです。グループは、彼らが追加したい機能のコードに貢献します。 コントリビューターへの追加利点: 彼らは、彼らが終了したらすぐに新しい機能を使用するようになります。 彼らは次のリリースを待つ必要はありませんERDDAPお問い合わせ 皆様のご参加をお待ちしております。 詳細はこちら[ERDDAP™プログラマガイド](/docs/contributing/programmer-guide)お問い合わせ
         
    * お問い合わせERDDAP™v2.00. 今後10年を迎えるERDDAP™世界各地での開発・利用
         
*    **新機能と変更 (ユーザ向け) : : :**   
     
    * 新しい:orderByMeanフィルター
お問い合わせtabledapデータセットは、指定したグループの手段を計算します。 また、すべてorderByオプションは、グループを定義する追加の方法をサポートしています: _numericVariable\\[/番号\\[タイムユニット\\]\\[:オフセット\\]\\]_、例えば、時間/1日または深さ/10:5。 例えば、stationID、時間、水臨時雇用者及びorderByMean (ツイートstationID、時間/1日」) 結果を並べ替えるstationIDそして、それぞれのためのwaterTempの平均を計算し、そして戻して下さいstationID一日中。 これらは、著しく有用で強力な新機能です。 これらの機能の新しいコードと古いコードの変更は、ロブ・フラーとアイルランドの海洋研究所のアダム・リードベッターによって貢献され、Gitによって提出されました。 お問い合わせ ロブとアダム&#33;
         
    * NEW: 表形式のデータセットの出力ファイルタイプ:[.データ テーブル](https://developers.google.com/chart/interactive/docs/reference#dataparam),
JSON ファイルの形式は、Google Visualizationクライアントライブラリ (Google Charts) お問い合わせ このコードは、Roland Schweitzerによって貢献され、Gitで提出されました。 お問い合わせ ロランド&#33;
         
    * NEW: 表形式のデータセットの出力ファイルタイプ:[.jsonlCSV1](https://jsonlines.org/examples/),
既存のもののように.jsonlCSVオプションが、最初の行の列名で。 ユージンバーガーのおかげで。
         
    * NEW: 管理者が有効になっている場合、ユーザーはログインできます。[ソリューション](https://orcid.org)アカウント。
Google認証のようなOAuth 2.0認証システムです。 研究者が独自に識別するために、ORCID は広く利用されています。 ORCIDアカウントは無料で、Googleアカウントが持つプライバシー問題はありません。 お問い合わせERDDAPお問い合わせ[Orcid認証の指示](/docs/server-admin/additional-information#orcid)お問い合わせ BCO-DMOのおかげで (アダム・シェパード、ダニー・キンカデなど) お問い合わせ
         
    * NEW: 新しい URL コンバーターは、最新の URL を最新の URL に変換します。
任意の上で .../erddap/convert/urls.html を参照してください。ERDDAP™取付け、例えば、
        [コンバーターへのこのリンクERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html)お問い合わせ これは、データ管理者に役立ちます。 また、GenerateDatasetsXml で内部で使用されます。 ボブ・サイモンとシャロン・メシックのおかげ
         
    * 即興:[時間コンバーター](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)今、ISO8601文字列時間に任意の一般的な文字列時間を変換するか、または変換するオプションがありますUDUNITS- 適切な時間単位の文字列のようにUDUNITS時間単位の文字列。 これも役に立つはずですERDDAP™文字列時間変数の "units" 属性に指定するフォーマットを知っている必要がある管理者。 また、GenerateDatasetsXml と EDDTableFromFiles のどの機能も内部で使用されます。 ボブ・サイモンズに感謝します。
         
    * 新機能:[ユニットコンバーター](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)新たに「UDUnitsの標準化」オプションを追加しました。
例えば、"deg\\_C/m" と "degrees\\_C m-1" は両方変換されます。
"degree\\_C m-1" は、 この機能は、 EDDTableFromFiles のStandardizeWhat 機能でも使用されます。 ボブ・サイモンズに感謝します。
         
    * NEW: グラフの場合 (表面グラフ以外の) Griddapのとtabledap's グラフのウェブページを作成します。x 軸が時間軸ではないとき、x 軸変数の範囲のサブセットだけが表示される場合は、グラフの上にあるボタンで X 軸を左方向または右方向にシフトします。 Carrie Wall Bell / ハイドロホンプロジェクト
         
    * NEW: グラフの場合、X および/または Y の軸線はログスケールを使うことができます。
ユーザーは、グリッドダップに新しいドロップダウンウィジェットを介してY軸スケールを制御することができます。tabledapグラフのWebページを作る。 詳細はこちら[.xRange と . yRange ドキュメント](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange)お問い合わせ Carrie Wall Bell / ハイドロホンプロジェクト
         
    * 改善される:ERDDAP™これにより、さまざまな HTTP エラー コードがより使いやすくなり、今では返します。(OPeN)DAPv2.0-formatted エラーメッセージのペイロード。 お問い合わせ[詳細情報](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors)お問い合わせ Antoine Queric と Aurelie Briand のおかげです。
         
    * 改善:Netcdf-java/cまたは他のソフトウェアツールを使用して接続しないでください.ncまたは.hdf提供されるファイルERDDAPローカルファイルだったら /files/ システム。ERDDAP™リクエストを拒否しました。 非常に非効率で、他の問題を引き起こします。 代わりに:
        
        * 使用条件(OPeN)DAPクライアントソフトウェアに接続するERDDAPお問い合わせDAPデータセットのサービス (/griddap/ または /tabledap/ URL で) お問い合わせ それは、DAPお問い合わせ
        * または、データセットのデータアクセスフォームを使用して、データのサブセットをリクエストします。
        * または、ファイル全体または長時間にわたる繰り返しアクセスが必要な場合は、使用curl,wgetファイル全体をダウンロードしたり、ファイルのローカルコピーからデータにアクセスしたりできます。
        
          
         
    * 即興:ERDDAP™ホームページでは、ほとんどのユーザーにとって最高のスタートポイントであるため、フルテキスト検索は「すべてのデータセットのリストを表示」の上で行われます。 ディエ・マハリノとモーリス・リベスに感謝します。
         
    * 推奨: DataProviderForm3.html 今、一般的なドロップダウンリストがありますstandard\\_nameお問い合わせ IOOS DMAC ミーティングで誰かに感謝します。
         
    * IMPROVED: /files/ Web ページでは、/files/ ドキュメンテーションの /files/ のセクションで、新しい "できること?" へのリンクが公開されています。 そのセクションでは、さまざまなファイルタイプを説明し、それらがどのように機能するかを提案します。 Maurice Libesのおかげで.
         
    * 推奨:ほぼすべてのリクエストERDDAP™少なくとも少し速くなり、時にははるかに速くなります。
         
    * バグフィックス: 一部の状況下では、EDDTable のデータセットがいくつかのタイプのデータを保存するとき.ncfile は、グローバルの "id" 属性は、その要求に固有のハッシュを含む、ファイルの提案名にセットされました。 今「id」は正しく変更されていないまま (指定された場合) またはデータセットのdatasetID  (指定されていない場合) お問い合わせ John Maurerさん、ありがとうございました。
         
*    **お知らせERDDAP™管理者は知っておく必要があります。**   
     
    * TO DO: このリリースは、あなたからいくつかの時間と仕事をとります。 必要な変化を数時間と数時間かけて、新しい機能で実験してみて下さい。
         
    * TO DO: 安全のために、現在の setup.xml のバックアップコピーを作成し、datasets.xmlファイルを変換する必要のないケースでそれらを反転できるようにERDDAP™v1.82.
         
    * TO DO: おすすめJavaOpenJDK の OpenJDK の OpenJDK を今採用します 8月8日 (ツイート) + ホットスポット
これはオープンソースの変種です。Java使用上の制限がない (いいねOracleお問い合わせJavaコンテンツ) お問い合わせ から得られるOracleお問い合わせJava進行中の方法で、Oracle「祝福」 セキュリティ上の理由から、あなたの安全を守ることが大切です。Javaバージョンアップ日付 お問い合わせERDDAPお問い合わせ[Javaインストール手順](/docs/server-admin/deploy-install#java)お問い合わせ
         
    * TO DO:OpenJDKの採用JavaTomcatのインストールに小さな追加が必要です。[リソースキャッシュの指示](/docs/server-admin/deploy-install#contentxml)お問い合わせ これは -XX:MaxPermSize 設定の置換であると思います。 (導入事例) OpenJDKはサポートしておりません。
         
    * TO DO: 新しいデフォルトで推奨&lt;fontFamily&gt; setup.xml の設定
DejaVu Sans に組み込まれています。Javaお問い合わせ 詳細はこちら
        [フォントのインストールの指示を修正](/docs/server-admin/deploy-install#fonts)お問い合わせ
         
    * TO DO: set.xml から多くのタグが移動されます。datasets.xmlお問い合わせ 利点は、値を変更できるということですERDDAP™再起動せずに実行中ERDDAPお問い合わせ 確かに、簡単に変更できます&lt;startBodyHtml5&gt; 一時的なメッセージを表示するERDDAP™サイトマップ (例:「新しいJPL MUR SST v4.1 データセットをチェックアウト...」または「これ」ERDDAP™2019-05-08T17:00:00 PDT 2019-05-08T20:00:00 PDT メンテナンスのためオフラインになります。) お問い合わせ これらのタグを変更する方法datasets.xml変更は次回の時刻に影響しますERDDAP™フィードバックdatasets.xmlお問い合わせ
         
        
        1. コンテンツをコピーするdatasets.xmlファイル(ファイルの開始のすぐ近くにあるところ)&lt;erddapDatasets&gt;:
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. 1対1で値をコピー (お問い合わせ) setup.xmlファイルから貼り付けた新しいタグの各タグ (詳しくはこちら) お問い合わせdatasets.xmlお問い合わせ たとえば、30 の値を使っていたら&lt;cacheMinutes&gt; setup.xml では、その値を新しいものにコピーする必要があります。&lt;cacheMinutes&gt; タグdatasets.xml  (値が新しいデフォルト値と同じですが、タグをそのまま残すのが最善です。datasets.xmlブランク) お問い合わせ
            
新しく提案されたデフォルトとは異なる場合(それ以外の場合)&lt;startBodyHtml5&gt; と&lt;theShortDescriptionHtml&gt; は、カスタマイズするのに便利です。ERDDAP™インストール)、新しいデフォルト値への切り替えを検討してください。 これは特に本当です&lt;partialRequestMaxBytes と&lt;partialRequestMaxCells&gt; は、デフォルト値/値が年々大きく変化したところです。
            
各値をコピーした後、タグとその記述を setup.xml から削除します。 これらのタグを持っている方が良いdatasets.xmlお問い合わせ そして今ではより良い説明があります[セットアップデータセットXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file)お問い合わせ
            
        
新規システムへのお問い合わせは、起動時に初めてのWebページが一番多いことです。ERDDAPデフォルトはERDDAP™サイトマップ その後のウェブページでは、指定した ...Html コンテンツを使用します。datasets.xmlお問い合わせ
        
    * 警告: 実行する初めてERDDAP™v2.0では、ローカルデータファイルに基づくデータセットがロードされます。 **お問い合わせ** ゆっくりとERDDAP™ファイルのデータベースを少し異なる形式で再作成する必要があります。 初期リロードが遅い後、早速読み込みます。 お問い合わせ
         
#### EDDTableFromHttpGetの特長{#eddtablefromhttpget} 
    *   [BIG新機能:EDDTableFromHttpGet](#eddtablefromhttpget)  
現在まで、ERDDAP™データを読み込み、ユーザーが利用できるようにしました。 今、ERDDAP™センサーからリアルタイムデータを発信するためのシンプルで効率的なシステムです。 他の機能の中で、このデータセットは細かいバージョンアップを提供しています:データセットに作られたすべての変更を覚えています。 通常、ユーザーはすべての変更が適用されるデータセットの最新バージョンを望むだけです。 しかし、ユーザーがデータセットからデータを要求するオプションは、任意の時点でありました。 これは再現可能な科学を容易にします。 したがって、他のほぼリアルタイムのデータセットとは異なり、これらのデータセットは、[DOIツイート](https://en.wikipedia.org/wiki/Digital_object_identifier)お問い合わせ 彼らが会うのでDOI集計を除いて、データセットが変更されていない要件。 お問い合わせ[EDDTableFromHttpGetの特長](/docs/server-admin/datasets#eddtablefromhttpget)お問い合わせ OOIのおかげで (昔から今) 重要なことについて作業についてリマインダーのためのこのとユージンバーガーの必要性について話しています。
         
    * 大きい新しい特徴:ERDDAP™外部に圧縮されたデータファイルから直接データを提供できるようになりました。.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2、または .Z. データセットには、外部圧縮ファイルのミックスが含まれる場合があります。 (おそらく古いデータファイル?) そして非外部に圧縮されたファイルであり、いつでもファイルを圧縮/分解することができます。
        
この作品は素晴らしい&#33;
ほとんどの場合、ファイルの解凍に関する減速はマイナーです。 誤って使用しているデータセットおよび/またはデータファイルについては、これを試すことを強くお勧めします。
        
$30,000以上保存できます&#33;
これは、いくつかありますERDDAP™たくさんのお金を節約できる機能 - 多くのデータファイルを圧縮する場合、データを保存するには、RAIDs/hardドライブがほとんど必要になります。または逆に、はるかに多くのデータを提供できます (10xまで) 既に持っている RAID を使って。 この機能は、別の RAID を購入からあなたを救う場合, その後、約保存 $30,000.
        
詳細はこちら[外部圧縮されたファイル文書](/docs/server-admin/datasets#externally-compressed-files)お問い合わせ Benoit Perrimond と Paloma de la Vallee のおかげで、Benoit Perrimond と Paloma de la Vallee は、Benoit Perrimond と Paloma de la Vallee の両端で、Benoit Perrimond とPaloma de la Vallee の両端から、Benoit Perrimond とPaloma de la Vallee の両端で、Benoit Perrimond とPaloma de la Vallee の両端から、Benoit Perrimond とPaloma de la Vallee の両端から、Benoit Perrimond とPal
        
    * 大きい新しい特徴: すべてEDDGridFromFiles と EDDTableFromFiles のすべてのデータセットは、&lt;cacheFromUrl&gt; タグとタグ&lt;cacheSizeGB&gt; タグ。 cacheSizeGB が指定されていない場合、リモートデータセットのファイルの完全なコピーをダウンロードして維持します。 cacheSizeGB が指定され、 &gt;0 の場合、必要に応じてリモートデータセットからファイルをダウンロードし、限られたサイズのローカルキャッシュに、クラウドベースの作業時に便利です。 (例:S3) データファイル。 詳細はこちら[キャッシュ FromUrl ドキュメント](/docs/server-admin/datasets#cachefromurl)詳しくはこちら ボブ・サイモンとロイ・メンデルスゾーン (リモートデータセットファイルのローカルコピーを作成するために長年スクリプトを書く人) 、ロイド・コッテン、ユージン・バーガー、コラー・デレーン (Amazon Webサービスにいたとき) Googleクラウドプラットフォーム
         
    * NEW: 新しいEDDTableFromJsonlCSV クラスは、表形式のデータをから読み込むことができます
        [ジェイソン CSVファイルライン](https://jsonlines.org/examples/)  (「CSVよりもベター」) お問い合わせ アイルランドのマリーン・インスティテュート・オブ・アイルランドの皆さん、このフォーマットについて教えていただき、ユージン・バーガーとPMELが入力タイプとしてサポートしてくれました。
         
    * 最新: すべてEDDGridすべてのEDDTableFromFilesデータセットは、&lt;nThreads&gt; 設定、ERDDAP™リクエストに応答する際に使用するスレッド数 詳細はこちら[nThreads ドキュメント](/docs/server-admin/datasets#nthreads)詳しくはこちら Axiom Data Science、Eugene Burger、Conor DelaneyのRobert Bochenek氏に感謝 (Amazon Webサービスにいたとき) Googleクラウドプラットフォーム
         
    * 新しい標準化 すべてのEDDTableFromFilesサブクラスについて -
以前は、与えられた変数の場合、重要な属性の値が (例:scale\\_factor,add\\_offset,missing\\_value, \\_FillValue, 単位) 一貫性がなかったため、EDDTableFromFiles は各属性の 1 つの値を選択し、 "valid" になり、"Bad Files" という他の属性値でファイルをマークします。 これで、EDDTableFromFiles がファイルを読み込むとすぐにファイルを標準化するシステムがあります。 お問い合わせ[EDDTableFromFileの標準化 新着情報](/docs/server-admin/datasets#standardizewhat)お問い合わせ の 1 つERDDAP'主な目標は、データファイルとデータセットを一貫してアクセスできるようにすることです。 標準化 その現実を作るために重要な新しいツールは何ですか。 マルコ・アルバ(Margaret O'Brien) (他のEMLユーザー) , BCO-DMO, InPort ユーザ.
         
    * 新しいEDDTableFromInvalidCRAFilesを使用すると、コレクションからデータセットを作成できますNetCDF  (v3 または v4)  .nc特定の、無効、CF DSG Contiguous Ragged Array の variant を使用するファイル (キュラ) ファイル。 このデータセットタイプのサンプルファイルが見つかります https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020年10月21日 このサーバは、確実に利用可能になりました\\]お問い合わせ しかし、ERDDAP™このファイルタイプをサポートし、使用し始めるべきでない無効なファイルタイプです。 現在、このファイルタイプを使用するグループが強く推奨されていますERDDAP™有効なCF DSG CRAファイルを生成し、これらのファイルを使用して停止します。 Ajay Krishnan と Tim Boyer の口コミを投稿します。
         
    * EDDTableFromThreddsFiles と EDDTableFromHyraxファイルが廃止されました。 EDDTableFromNcFiles に切り替えてください。 (または variant) プラス&lt;cacheFromUrl&gt;. 何らかの理由で動作しない場合は、電子メールerd.data at noaa.govお問い合わせ 2020年以前の苦情がない場合、これらのデータセットタイプが削除される場合があります。
         
    * おすすめ -- ISO 8601をISO 8601に自動変換するためのシステム (v1.82で導入) 多数の追加フォーマットに対処するために大きく拡大しました。 これは GenerateDatasetsXml に影響します。ERDDAPソースメタデータの処理
         
    * おすすめ -- 文字列時間解析システムの第3次メジャーリビジョン (最後まで) ,ERDDAP™もはや使用しませんJava'DateTimeFormatter 時々極端な時間に影響を与えるバグのため (年)&lt;=0000)。ERDDAP™時間文字列を解析するために独自のシステムを使用します。
         
    * 警告: 新しい文字列の時間解析システムがやや厳しいです。 データセットの1つが突然、時間値の値が欠けているだけの場合、原因は時間フォーマットの文字列が少し間違っていることはほとんど確信しています。 ログにエラーメッセージがあるはずです。 txt は、時刻の形式に一致しなかった時間値に関連しています。これにより、そのデータセットの時刻の形式文字列を修正できます。 助けが必要な場合は、オプションを使用してください。ERDDAP「変換する時間コンバータ」\\[ツイート\\]ISO 8601文字列時間に任意の一般的な文字列時間 " - コンバータがソース文字列を解析するのに使用される形式を示します。
         
    * おすすめ:最速、最も簡単で、最も安い方法でスピードアップERDDAP's は、表データへのアクセスは、ソリッドステートドライブにデータファイルを置くことです。 (SSDシリーズ) お問い合わせ ほとんどの表形式のデータセットは比較的小さいため、1 または 2 TB SSD は、すべての表形式のデータセットのデータファイルを保持するのに十分です。 データをセルに書き込むとSSDが最終的に摩耗し、削除し、そのセルに新しいデータを何度も書き込む。 代わりに、私はそれをお勧めします (可能な限り) SSDを使用してデータを一度に書き、何度も読みます。 その後、コンシューマーグレードのSSDでも、ハードディスクドライブよりもはるかに長い、非常に長時間持続する必要があります (ハードウェア) お問い合わせ 消費者向けSSDの方が安い (2018年、2TBの$200または$400) そして価格が落ちるのは速いです。 いつかERDDAP™データファイルにアクセスし、SSDは両方を提供します
        
        * 短いレイテンシ (~0.1ms, 対 ~3ms HDD, 対 ~10 (お問い合わせ) ms for RAID, versus ~55ms for Amazon S3) と
        * 高いスループット (~500 MB/S, versus ~75 MB/s HDD 対 ~500 MB/s の RAID) お問い合わせ
        
そのため、最大10Xのパフォーマンスブーストを得ることができます (HDD 対) $200で&#33; システムの他のほとんどの変更と比較して ($10,000の新しいサーバー? 新規 RAID $35,000? 5,000ドルの新しいネットワークスイッチ? など。) 、これは投資の最高のリターンによるものです (ログイン) お問い合わせ サーバがメモリにロードされていない場合、サーバーのメモリの追加は、非常に安価で、あらゆる面をスピードアップする手段です。ERDDAPお問い合わせ
        \\[SSDは、グリッドデータにも最適ですが、ほとんどのグリッドデータセットははるかに大きいため、SSDは非常に高価になります。\\]  
         
    * NEW: ログインしている人全員がロールを取得する\\[誰でもログイン インスタグラム\\], いなくても&lt;user&gt; のタグdatasets.xmlお問い合わせ データセットの設定をすれば&lt;accessTo&gt; へ\\[誰でもログイン インスタグラム\\]ログインした人ERDDAP™  (Gmail または Orcid のアカウントから、) 未指定の場合でも、データセットにアクセスできる権限があります。&lt;user&gt; のタグdatasets.xmlお問い合わせ Maurice Libes のおかげで.
         
    * 即興:UDUNITS/UCUMユニットコンバーターは広く改良されました。
無効な単位のひもをよりよい扱います (妥当性を強化するのではなく、情報の保存に重点を置きます) お問い合わせ また、結果は標準化された構文を持っています。
         
    * 新機能:UDUNITS/UCUM単位のコンバーターに標準化する新しい選択がありますUDUNITS文字列。
この作品は有効UDUNITS非標準/無効に文字列と合理的によくUDUNITS文字列。 例えば、例えばUDUNITS="メートル/秒", "メートル/秒","m.s^-1"と"m s-1""m.s-1" を返す。 新しい標準化のために必要だった 上記のシステムについて マルコ・アルバ(Margaret O'Brien) (他のEMLユーザー) , BCO-DMO, InPort ユーザ.
         
    * NEW: EDDTableFromMultidimNcFiles は、[御馳走次元として](/docs/server-admin/datasets#treatdimensionsas)オプション, 言うERDDAP™特定の次元を扱うため (例:LAT、LON) 他の次元だったら (例: 時間) お問い合わせ これは、異なる変数の異なる次元を1つの次元だけ使用しなければならないときに使用するいくつかの誤ったファイルにとって有用です (例: 時間) お問い合わせ マルコ・アルバとモーリス・ライブスに感謝します。
         
    * NEW: 今、すべてEDDGridから...ファイルデータセットは新しい特別な軸線をサポートsourceName誰が言うかERDDAP™fileName から情報を抽出する (filename.ext のみ) 値を使う **交換する** 既存の左端の軸値。 フォーマットは
        \\*\\*\\*replaceFromFileName、_dataType_、_extractRegex_、_captureGroupNumber_
お問い合わせ[このドキュメント](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)お問い合わせ ありがとうございます。NOAAPathfinder 毎日の集計データセット。
         
    * NEW: 今、すべてEDDGridから...ファイルデータセットは新しい特別な軸線をサポートsourceName誰が言うかERDDAP™ファイルのpathNameから情報を抽出する (ディレクトリ + filename.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
そのためには、常にパス名を使う'/'ディレクトリの区切り文字として、'\' は決してありません。
お問い合わせ[このドキュメント](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)お問い合わせ パロマ・デ・ラ・ヴァレー
         
    * NEW: 今、すべてのEDDTableFrom ... ファイルデータセットは追加の擬似変数をサポートsourceNameファイルの fileName から情報を抽出する s (filename.ext のみ)   (詳しくはこちら[\\*\\*\\*ファイル名](/docs/server-admin/datasets#filename-sourcenames)) またはファイルのフルパス名から (/dir1/dir2/filename.ext)   (詳しくはこちら[\\*\\*\\*パス名](/docs/server-admin/datasets#pathname-sourcenames)) お問い合わせ パロマ・デ・ラ・ヴァレー
         
    * 新規: もしEDDGridデータセットに1つ以上の非常に大きい次元があります (例えば、何百万の価値) たくさんのメモリを取り上げると、新しい設定ができます。&lt;次元価値記憶&gt; (/docs/server-admin/datasets#dimensionvaluesinmemory) false の設定 (デフォルトはtrueです) つまり、データセットがディスク上の値を保存し、必要に応じてそれらを取得する原因となります。 デビッド・ロドリゲスとリッチ・シニョールに感謝 (再:EDDGridFromAudioFilesから) お問い合わせ
         
    * 改善: 以前は、再注文した場合dataVariableEDDTableFromFiles のデータセット用の s と、データセットを再読み込み、EDDTableFromFiles はすべてのデータファイルを再読み込みします。 これで、すべてのデータファイルを再読み込みすることなく、再オーダーに対応できます。 Roland Schweitzerは、Roland Schweitzerのゲストの皆様にお礼申し上げます。
         
    * 即興:今、いつERDDAP™ASCII、NCCSV、JSON は、指定した行のエラーが見つかられば、CSV の表形式のデータファイルを表示します。 (例えば、誤ったアイテム数) 警告メッセージ (「WARNING:スキャッピングライン #」...「意外なアイテム数...」) お問い合わせ[log.txt ファイル](/docs/server-admin/additional-information#log)データファイルの残りの部分を引き続き読み続けます。 そのため、定期的に見ることがあなたの責任です。 (スクリプトを書くか、) ログ内のメッセージ txt では、データファイル内の問題を解決できるようにします。ERDDAP™ユーザーがファイルの一部行が欠陥を持っているにもかかわらず、利用可能なすべての有効なデータを読み続けることができるように、このように設定されています。 以前は、ERDDAP™ファイルを "bad" としてマークし、データセットから削除します。
         
    * 改良: 正確な時 (例えば、最も近い秒またはミリ秒に) "mins from ..." としてソースに保存されます。 (大きい単位) ,ERDDAP™値を読み込むときに最も近いミリ秒にそれらを丸めますERDDAPお問い合わせ それ以外の場合、浮動小数の数字は、特定の時間でデータが破棄され、要求されます (例:&time=2018-06-15T01:30:00) 失敗します。 以前は、できるだけ正確に計算しました。 (単位が例えば、"秒以来..." または "milliseconds 以来..." である場合、まだありません) お問い合わせ 大きい単位を使用しないでこの問題を避けることは最善です (例、分、時間) 正確な時間値を格納する (例:マイクロ秒) -- コンピュータは小数桁を扱うのに悪い仕事をします。 マルコ・アルバに感謝します。
         
    * CHANGES へ EDDTableFromEDDGridより良くなる。 EDDTableFromの特長EDDGridユーザーは、集計されたデータセットをタブラデータセットだったかのように問い合わせることができます。 (「価値のクエリ」) お問い合わせ
        
        * 今、サポート&lt;maxAxis0&gt; タグ (デフォルト=10) 最大軸数を指定する\\[0 の 0\\]  (よくある質問"time") 一度にクエリできる値。 これは、Nive リクエストが EDDTableFrom を取得するのを防ぐEDDGridグリッドされたデータセット全体を調べる (タイムアウトエラーで失敗する) お問い合わせ
        * 生成データセット Xml には EDDTableFrom を生成するオプションがあります。EDDGrid与えられたすべてのグリッドデータセットのためのデータセットERDDAP™指定された正規表現にマッチする (.\\* を使用して、すべてのデータセットにマッチします。) お問い合わせ 生成するデータセットは、これはグリッドされたデータセットの表形式のバージョンであることを示すサマリー属性に追加情報を持っています。 そして、datasetIDです。datasetIDグリッドされたデータセットの「\\_AsATable」と
        * 最も一般的なセットアップには大きなスピードがあります。グリッド化されたデータセットがEDDGridFromErddap と同じデータセットERDDAPお問い合わせ
        
ジェームズ・ガラッシャーとエド・アームストロングのおかげで。
         
    * NEW: 生成 データセット すべてのタイプのデータセットのXmlは\\_FillValueを追加する可能性が高くなりますmissing\\_value数値変数の属性addAttributesお問い合わせ 例えば、これは文字列が値マーカーを欠落したときに発生します (例: "", ".", "?", "NA", "nd", "NaN") サンプルファイルの変数が変換されるためERDDAP's のネイティブな欠損値 (127 バイトの列で, 32767 短い列で, 2147483647 int コラム、9223372036854775807 長い列で、フロートとダブル変数のNaN) お問い合わせ フロートとダブル変数のNaN値でも発生します。 また、数値データ列の共通欠損値マーカーの一覧に「nd」を追加しました。ERDDAP™お問い合わせ BCO-DMOのマットバイドルのおかげで。
         
    * 改善: 生成中の ncdump オプション データセット Xml は ncdump (しかし、依然として ncdump の netcdf-java バージョンを使用します。) お問い合わせ これで、オプションの新しいリストが表示されます。 今, のために.ncmlファイル、それは結果のncdump出力を印刷します.ncml ファイルがアンダーリングに適用される変更.ncまたは.hdfファイル。
         
    * バグフィックス: ファイルハンドルリークがあった (結局原因ERDDAP™凍結する) 作成中にエラーが発生したときに、出力ファイルの種類、例えば、.geotif を作成した場合に原因となります。 今は、すべて固定されていると思います。 問題が見つからない場合は、データセットの種類を教えてください。 (格子かテーブル) 問題を引き起こしているファイルの種類。 スティーブン・ベール、リン・デウィット、ジベイ・ザハオ、その他
         
    * バグフィックス: ザ・オブ・ザ・WMS Leafletデモは「詳細」の軸を「高度化」に完全に変換しなかった。 今、それは、壊れた凡例の要求が修正されています。 また、ドロップダウンリストのすべての軸オプションは、ソート順を昇順に常にあります。 Antoine Queric と Aurelie Briand のおかげです。
         
    * BUG FIX: EDDTableFromFiles は、データファイルの char 変数から作成された文字列変数の制約を正しくサポートできるようになりました。 Antoine Queric と Aurelie Briand のおかげです。
         
    * バグフィックス: データセットが利用できなくなったら、データセットが通知しようとします (「このデータセットは現在利用できません」というメッセージで) 購読者、リストされたアクション、rs、およびlonPM180 データセットは、それに依存しています。 Roy Mendelssohnとボブ・シモンズに感謝します。
         
    * バグフィックス: EDDTableCopyに関連する2つのバグ。 Sam McClatchieさん、ありがとうございました。
         
    * IMPROVED: status.html ページに表示された失敗したリクエストの数が増加します。以前よりも多くのことが失敗としてカウントされます。
         
    * 改善される:ERDDAP's status.html' は "Requests" を表示します。 (msのメディアタイム) 「時系列で」 以前は、整数秒に切り捨てられたメディアタイムが示されていました。
         
    * IMPROVED: jsonld 出力では、 jsonld の "name" は、dataset's から"title"お問い合わせERDDAPと jsonld の "headline" は、データセットの "datasetIDお問い合わせERDDAPお問い合わせ 以前は逆転していた。 通常の英語の使い方で「名前」が短いので、これは私には間違っているようです。 (理想的に) まれに/決して変化しない一意の識別子 (例:ロバート・ミドルネーム・サイモンズ) 、ユニークでない記述ではなく、簡単に変更できる (e.g. 「ソフトウェアを書く男」NOAA「対」ソフトウェアを書く背の高い男NOAAツイート) お問い合わせ Gee は、スキーマ.org 定義のスキーマなら素晴らしいでしょう。[お名前 (必須)](https://schema.org/name)データセットのコンテキストでは、より具体的でした。 ソフトウェア開発者は、専門家からのガイダンスなしで、仕様に基づいて仕様の実装を書くことができるはずです。 しかし、私はGoogleを欺く (おそらくナタシャ ログイン) 、NCEI (ジョン・レフ) ロブ・フラー。
         
    * 改善: jsonld 出力では、4 つの "spatialCoverage GeoShape box" の値が minLat minLon maxLat maxLon になります。 以前は、lat と lon の位置が逆転していた。 Gee は、スキーマ.org 定義のスキーマなら素晴らしいでしょう。[ジオシェパー](https://schema.org/GeoShape)正しい順序を指定する。 ソフトウェア開発者は、専門家からのガイダンスなしで、仕様に基づいて仕様の実装を書くことができるはずです。 Natasha Noy と Rob Fuller のおかげです。

## バージョン1.82{#version-182} 
 (公開日 2018-01-26) 

*    **新しい特徴 (ユーザ向け) : : :**   
     
    * 微妙な微妙な変化は、ルックアンドフィールの変化ERDDAP™サイトマップ
        * 改善される:ERDDAP™HTML 5 を使用して、CSS をよりよく使うようになりました。
        * 改善:Webページが少し修正され、それらをクリーナーと "busy". (彼らはまだ密かであり、それでも物事が疑われる可能性がありますが、以前よりもはるかに少ないことを願っています。) John Kerfootのコメントありがとうございます。
        * 改善:Webページは、特に景色の向きで使用する場合は、携帯電話やその他の小さなデバイスではるかに優れています。 また、デスクトップブラウザの非常に小さくて非常に大きなウィンドウで見栄えがよくなります。
        * 改善:セキュリティやその他の理由を改善するために、最新のOpenlayersバージョンの使用WMSデモページを交換しましたLeafletお問い合わせ
        * NEW:画像、音声、ビデオファイルのプレビューのサポート"files"システム (例えば、[このテストデータセット](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) お問い合わせ.htmlTableセルに画像、オーディオ、ビデオファイルのURLがある場合の応答 (例えば、[このリクエスト](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) お問い合わせ '?' アイコンを超える場合は、画像、オーディオ、ビデオファイルプレビューが表示されます。 また、ファイルリンクをクリックすると、ブラウザのフル画面が表示されます。 詳細はこちら[メディアファイル文書](/docs/server-admin/datasets#media-files)お問い合わせ 異なるブラウザが異なるファイルタイプをサポートしているため、お使いのブラウザでは動作しない場合があります。
CSS専用の画像ツールチップのアイデアとサンプルコードのこれらの人々/リンクのおかげで (お問い合わせ https://codepen.io/electricalbah/pen/eJRLVd ) そして映し出されたイメージのローディング (お問い合わせ https://varvy.com/pagespeed/defer-images.html )   (使用前にコードを変更したがERDDAP) お問い合わせ
Cara Wilson氏、マタイ・オースティン氏、Adam Shepherd/BCO-DMO氏による画像サポートの依頼
Jim Potemra、豊富なSignell、OOI、Carrie Wall Bellのおかげで、オーディオ/ハイドロホンファイルのサポートをリクエストできます。
ビデオサポートの必要性を示すためにOOIのおかげで。
        * NEW: あらゆるデータからのサブセットERDDAP™データセット (しかし、通常、オーディオファイルからのデータセット) .wav オーディオファイルに保存できるようになりました。 ([ドキュメント](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Jim Potemra、豊富なSignell、OOI、Carrie Wall Bellのおかげで、オーディオ/ハイドロホンファイルのサポートをリクエストできます。
        * 改善:Webアクセシブルフォルダのフォーマット (ワフ)   (例: /files/ フォルダ) HTMLテーブルを使用するために更新されました。 新しいフォーマットは、Apache の最近のバージョンで作成された Web ページをリストするディレクトリのより最近のバージョンを模倣します。 人間は、変更が情報を簡単に読みやすくなることがわかります。 これらの文書を解析するソフトウェア (例:ISO19115文書を収穫するソフトウェアERDDAP) 変更する必要がありますが、新しいフォーマットは以前のフォーマットよりもパースしやすくなります。 (アンナ・ミラノ) 
        * ニュースoutOfDateDatasets.htmlサイトマップ ([サンプル](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) このページでは、ほぼリアルタイムのデータセットがすべて揃っているテーブルを説明します。&lt;testOutOfDate&gt;タグ (詳しくはこちら) , データセットの更新方法によってランク付けされます。 このダッシュボードは便利ですERDDAP™どのデータセットが最新であるかを知りたいと思うとき管理者およびエンド ユーザー。 最新のデータセットでは、データソースに問題が起きているため、ERDDAP™最近の時点からデータが表示されない
管理者: Out-Of-Date Datasets Web ページが不要な場合は、setup.xml に追加します。
            &lt;outOfDateDatasetsActive&gt;false の使い方&lt;/outOfDateDatasetsActive&gt;
現在、testOutOfDateそして、 OfDate カラムallDatasetsデータセット。
ボブ・サイモンズは、長年このことを望んでいた、そしてアイルランドの海洋研究所の巧みな人々のおかげで、私は彼らの専用のラズベリーPiとモニターを介してインスピレーションを与え、常に自分のオフィスでこのような画面が表示されます。
        * 改善される:.htmlTableそして、.xhtml応答は、フォーマットされ、よりコンパクトで、より高速に読み込みます。 HTML5とCSSのおかげで。
    * .timeGaps のデータセット用の新しい出力ファイルタイプ。 メディアのギャップよりも大きい時間値のギャップのリストが表示されます。 ([サンプル](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) これは、ERDDAP™管理者とエンドユーザは、データセットのタイム値に予期しないギャップがあるかどうかを、定期的にスペースされた時間値を持つことが予想されます。 ボブ・シモンズとロイ・メンデルスゾーンがこの機能を必要としていました。
    * 改善: デフォルトのグラフallDatasetsdataset は x=maxLon と y=maxLat のマップです。 ジョン・カーフ、リッチ・シグネル、OOI-CIのご協力により、
    * 新しい:[エルダピー](https://github.com/ioos/erddapy)-- なしERDDAP™機能, しかし、多くの興味がありますERDDAP™ユーザー。 エルドダピー (ERDDAP™+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +Python) お問い合わせPython「Filipe Fernandes」が作ったライブラリERDDAPお問い合わせRESTfulウェブサービスを作成し、ERDDAP™データセットを検索したり、メタデータを取得したり、データをダウンロードしたりするなどのリクエストのためのURL。 Filipe Fernandes のおかげで.
    * 私は前に述べた必要があります: 使いやすいように設計されたサードパーティ製のRパッケージがありますERDDAP™から R:[リルドダップ](https://github.com/ropensci/rerddap#rerddap)お問い合わせ お問い合わせ[rOpenSciの特長](https://ropensci.org/)ロイ・メンデルスゾーン
         
*    **お知らせERDDAP™管理者は知っておく必要があります。**   
     
    * TO DO: setup.xml では、以下&lt;adminInstitution&gt; を、加えて下さい&lt;adminInstitutionUrl&gt; 機関の URL を指定するタグ (グループ) お問い合わせ
    * TO DO: setup.xml の3つのタグは使用できません:
        &lt;スタート ヘッドHtml&gt;,&lt;startBodyHtml&gt; と&lt;endBodyHtml&gt;. それらは交換されます
        &lt;スタートヘッドHtml5&gt;、&lt;startBodyHtml5&gt; と&lt;endBodyHtml5&gt; は、メッセージで指定されたデフォルト値を持っています。xml (以下に示す) お問い合わせ
        
デフォルトを使用することをお勧めします&lt;startHeadHtml5&gt; と&lt;endBodyHtml5&gt;。
推奨事項:元の変更があった場合&lt;startBodyHtml&gt; および/またはカスタマイズしたいERDDAP™まずは、新しいものをコピーしてください。&lt;startBodyHtml5&gt; タグ (以下から) setup.xml にし、それを変更してカスタマイズしますERDDAP™そのためにERDDAP'Webページは、あなたの組織を反映しています。NOAA ERDお問い合わせ 確かに、あなたの組織に「あなたに求める」を変更してください (ツイート) お問い合わせ ご質問・お問い合わせerd.data at noaa.govお問い合わせ (カスタマイズしない場合ERDDAP™今、デフォルトを使用する&lt;startBodyHtml5&gt;.)
        
その後、もはや使用されていない setup.xml に 3 古いタグを削除します。

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

あなたができる追加の方法があります[カスタマイズERDDAP™](/docs/server-admin/deploy-install#customize)お問い合わせERDDAP'web ページは、組織の代わりに反映されますNOAA ERDお問い合わせ
        
    * お問い合わせ&lt;EDDGrid...例&gt;タグ(スターティング)&lt;EDDGridIdExample&gt;)と&lt;EDDTable... 例&gt; タグ (スターティング)&lt;setup.xml ファイルの EDDTableIdExample&gt; は、 Griddap 内の例を作成するために使用されます。tabledapドキュメント。 html のウェブページERDDAPお問い合わせ
        
これらのタグをカスタマイズしなかった場合は、setup.xmlファイルから削除してください。 現在、それらはすべて、Bob のデータセットを参照する message.xml にデフォルトを持っていますERDDAP™お問い合わせ https://coastwatch.pfeg.noaa.gov/erddap/index.html お問い合わせ そのため、特定のデータセットがインストールされていないERDDAPお問い合わせ デフォルトをオーバーライドしたい場合は、それらのタグの一部または全部を setup.xml にコピーし、値を変更します。
あなたの例を指したいならERDDAP™一番簡単な方法は:
        
        1. これら2つのデータセットをあなたのものに含めるERDDAP™これを追加することでdatasets.xml: : :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. このタグを setup.xml に追加しますが、URL を URL に変更します。ERDDAPお問い合わせ (httpsお問い合わせ) サイトマップ
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
これらのタグをカスタマイズしたら、そのまま保存して、これら2つの新しいタグをsetup.xmlに追加して指定してください。ERDDAP™これらのデータセットの URL は、URL を URL に変更します。ERDDAPお問い合わせ (httpsお問い合わせ) サイトマップ
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * お問い合わせERDDAP™erddap2.css という css ファイルを使用します。 変更があった場合\\[トームキャット\\]/webapps/erddap/images/erddap.css は erddap2.css に類似した変更を加えることを検討します (同じディレクトリに) お問い合わせ
    * 新しい:ERDDAP's web ページには、ほとんど見えない内部リンクがたくさんあります (テキストは黒色であり、強調されていない) お問い合わせ これらのリンクの1つをホバーする場合 (通常、見出しと段落の最初の少数の言葉) カーソルは手になります。 リンクをクリックすると、URLはドキュメントのそのセクションに内部リンクされます。 ドキュメントの特定のセクションを参照するのは簡単です。 ボブ・サイモンズさん、長年お世話になりました。
    * 新しい:ERDDAP™今すぐサポート[バイトの範囲/受け入れ範囲](https://en.wikipedia.org/wiki/Byte_serving)/files/ ファイルの部分のリクエスト。 ブラウザで音声とビデオビューアをサポートする必要がありました。
    * TO DO: 今、セキュリティを向上させるために、指定された場合&lt;baseHttpsUrl&gt; で setup.xml (そして従ってサポートhttps) , 推奨フラグ ウルはhttpsより安全なフラグキーを持つURL。 もしそうなら、以前のフラグUrls/flagKeysは無効になります。 管理者: これらの変更が変更される場合ERDDAP™そしてあなたの場合ERDDAP™お問い合わせEDDGridFromErddap と EDDTable FromErddapのリモート購読ERDDAPs, その後, 更新後ERDDAPお問い合わせERDDAP™自動的に新しいフラッグUrlを購読しようとするので、新しいサブスクリプション検証メールを取得するときに、古いサブスクリプションを削除し、新しいサブスクリプションを検証する必要があります。
    * お問い合わせERDDAP™お問い合わせEDDGriderdVH3 のデータセット用の FromErddap データセットは、ボブの海岸ウォッチでERDDAP™erdVH2018のデータセットは、変更してください。
    * TO DO: jplAquariusSSS サンプルデータセットのどれも含まれている場合ERDDAP™「V4」は、datasetID'V5" へ
    * お問い合わせactual\\_rangeCF標準属性は今 (CF-1.7の) 変数が使用すると明らかに言うadd\\_offsetおよび/またはscale\\_factorデータの値をパックするには、actual\\_range値は、未パッケージのデータ型を使用し、未梱包された値でなければなりません。 残念ながら、この紛争は、以前のアドバイスと競合します。 生成データセット Xml がパックを外すactual\\_range値, しかし、それはあなたの既存のデータセットを修正しませんdatasets.xmlファイル。
        
ですから、データセットを確認してください: 変数の値がパックされれば、もしactual\\_range梱包されたデータ値として指定されます。&lt;addAttributesツイートactual\\_rangeunpacked 値を指定する値。 それ以外の場合、データセットはロードされませんERDDAPお問い合わせ これを行うためのシンプルで完璧な方法は、あなたの検索することですdatasets.xmlソース用 持っている属性
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
そして、scale\\_factor1.0 以外。 お問い合わせactual\\_rangeあなたが修正しなければならないかもしれない属性。
        
軸変数のEDDGridデータセット,ERDDAP™常にセットactual\\_rangeこれらの値を知っているので、値の実際の範囲になる属性。
        
降下値の軸変数の場合 (例: 緯度変数) ,ERDDAP™編集者actual\\_rangeお問い合わせ\\[0 の 0\\]・・・\\[最後の投稿\\]値が高かった... 今、それは常に新しいCF定義を作るために低...高値を使用しています。
        
正しい姿勢actual\\_rangeEDDTable のデータセットは特に重要です。ERDDAP™ユーザのリクエストを素早く拒否し、データ値が少ない場合actual\\_range最小値またはより大きいactual\\_range最大値。
        
関連:実際の\\_min、実際の\\_max、data\\_minそして、data\\_max属性は廃止されました。 データセットを変換して使用してくださいactual\\_range代わりに。
        
    * お問い合わせ (任意、しかし推薦される) : : : ほぼリアルタイムでデータセットを予測ERDDAP™お問い合わせ&lt;testOutOfDate&gt;&gt; (/docs/server-admin/datasets#testoutofdate ディレクティブ) フォーム内の値を持つタグnow-_nUnits_ などnow-2日間 データセットの最大時間値がその値よりも古い場合、データセットは最新のものと見なされます。[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)サイトマップ これは、データセットのソースに何かが間違っているときに表示される簡単な方法を提供します。
    *   [NEW: json-ld によるデータセットのセマンティックマークアップ (ジェイソン 連携データ) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™今すぐ使用[json-ldの特長 (ジェイソン 連携データ) ](https://json-ld.org)データカタログとデータセットを一部作成[semantic webサイト](https://en.wikipedia.org/wiki/Semantic_Web)、これはTim Berners-LeeのWebコンテンツをもっと読むことができ、機械「耐え難い」を作る考えです。 検索エンジン ([特にGoogle](https://developers.google.com/search/docs/data-types/datasets)) ほかのセマンティックツールは、発見やインデックス作成を容易にするために、この構造のマークアップを使うことができます。 json-ld 構造のマークアップは、見えない-to-humans として表示されます。&lt;スクリプト&gt; コードの http://.../erddap/info/index.html サイトマップ (これは、セマンティックなウェブです[データカタログ](https://schema.org/DataCatalog)) それぞれ http://.../erddap/info/_datasetID_/index.html サイトマップ (これは、セマンティックなウェブです[データセット](https://schema.org/Dataset)) お問い合わせ (アイルランドの海洋研究所のアダム・リードベッターとロブ・フラーのおかげで、この部分を作るために作業のハード部分をやっていますERDDAPお問い合わせ) 
    * NEW: オーディオファイルからデータを読み込むことができる新しいデータセットタイプがあります。
        [EDDGridFromAudioFilesから](/docs/server-admin/datasets#eddfromaudiofiles)音声データをグリッドデータとして扱う
        [EDDTableFromAudioファイル](/docs/server-admin/datasets#eddfromaudiofiles)オーディオデータを表データとして扱う。 Jim Potemra、豊富なSignell、OOI、Carrie Wall Bellのおかげで、オーディオ/ハイドロホンファイルのサポートをリクエストできます。
    * GenerateDataset の変更 Xmlの (関連する変更) : : :
        * 新しい:ERDDAP™今、自動的にシステムを持っている[最新のURLを更新](/docs/server-admin/additional-information#out-of-date-urls)GenerateDataset で両方 Xml とデータセットをロードするとき。 キャッチして更新されるべき追加のURLの提案がある場合、またはこれがサービスに変わるべきだと考えている場合 (コンバーターのような) お問い合わせerd.data at noaa.govお問い合わせ
        * 新規: GenerateDatasets の場合 XmlはCFを見るstandard\\_name  (すべての小文字でなければなりません) topcase 文字で、すべての downcase バージョンを追加します。&lt;addAttributes&gt;。 また、データセットが読み込まれた場合、ERDDAP™CFを見るstandard\\_nameアッパーケース文字で、無声にそれを変えますstandard\\_nameお問い合わせ 豊富なSignellのおかげで。
        * 新規: GenerateDatasets の場合 Xml は ISO 8601 の形式ではなく、ISO 8601 のフォーマットされた時間に付加する属性を見ます&lt;addAttributes&gt;。 お問い合わせERDDAP™フォーマットを認識せず、変更されていない時間値を残します。 フォーマットが表示された場合ERDDAP™確認・修正は行っておりません。erd.data at noaa.govお問い合わせ
        * 改善:低レベルのコードEDDGridフォードズ GenerateDatasetsのカタログオプション Xml は現在に依存していますUnidatanetcdf-javaカタログクローラコード (レッド。 カタログクラス) すべてのTHREDDSカタログを扱うことができるように (意外に複雑になる) お問い合わせ ローランド・シュヴァイツァーは、この変化と感謝の意を表しています。Unidataコードの場合。
        * 新規: GenerateDatasets Xml 用EDDGridFromDap は、実際の時間軸値に基づいて、タイトルの ", startyear-EndYear" を追加できるようになりました。 過去150日間にデータが存在する場合、EndYear="present"。
        * 新規: GenerateDatasets Xml 用EDDGridFromDap は ",\\[ソリューション\\]データセットが均等にスペース化され、latとlonの同じ場合のタイトルへの°"。
        * 改善: 時間コンバーターは、ISO 8601 文字列または UDUnits 互換番号に、さまざまな一般的なフォーマットで文字列時間を変換する機能が追加されています。 以前にサポートしたすべての機能は、変更されていない作業を継続します。
        * BUG FIX: GenerateDatasets Xml と キーワード コンバータ 今「地球科学」 &gt; 「GCMD サイエンス キーワードの開始時」. データセットが読み込まれるときERDDAP™,ERDDAP™「地球科学 &gt;」で始まらないキーワード属性にGCMDキーワードを固定するか、タイトルケース以外のものを使わない (各単語の最初の文字が大文字化される場所) お問い合わせ
        * 提案:提案するとき&lt;destinationName&gt;'s、GenerateDatasets EDDTableFromAsciiFiles の Xml は tail の端をちょうど使用しましたsourceNames と'/'  (ファイル名のようなものがあった) お問い合わせ 今、それは全体を使用するsourceName(例:"blahblahblahblah (m/s)"。 この変更は、いくつかのデータセットで、他の人のためにではなく、より安全な動作です。 Maurice Libesのおかげで.
        * BUG FIX: GenerateDatasets Xml とデータセットコンストラクタは、重複した列名がないことを確認します。 Maurice Libesのおかげで.
        * BUG FIX: GenerateDatasets EDDTableFromAsciiFiles の Xml は書きませんでした&lt;columnSeparator&gt; を出力します。 なるほど。 Maurice Libesのおかげで.
    * NEW: DasDds ツールがタイムギャップ情報を表示します (お問い合わせ[.timeギャップ情報](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) データセットがグリッド化されたデータセットの場合。
    * NEW: 高度な検索は「now_\\-nUnits_」のタイム値を受け入れます。 豊富なSignellのおかげで。
    * IMPROVED: セキュリティーを改善するために、データセットのメタデータまたはデータ内のメールアドレスがhtmlウェブページに書かれている場合、"@" は "" に置き換えられます。 これは、メタデータやデータ値全体が埋め込まれたメールアドレスではなく、より長い値で埋め込まれたメールアドレスだけをキャッチします。
    * 改善:セキュリティを高めるため、RSSプライベートデータセットの情報は、ユーザーのみで利用可能 (そして、RSSリーダー) 誰がログインして、そのデータセットを使用する権限を付与されます。
    * NEW: データセットがロードされると、date\\_created,date\\_issued,date\\_modified, または date\\_metadata\\_modified 属性は、ISO 8601 形式でない時間値を持っています。ERDDAP™ISO 8601のフォーマットされた時間に変更します。 お問い合わせERDDAP™フォーマットを認識せず、変更されていない時間値を残します。 フォーマットが表示された場合ERDDAP™確認・修正は行っておりません。erd.data at noaa.govお問い合わせ
    * 改善: .dods からの応答EDDGridデータセットは大幅に高速化します。 豊富なSignellのおかげで。
    * 関連する変更ERDDAPISO 19115文書の作成:
        * BUG FIX:ISO 19115文書を作成するとき、dataVariable単位はHTML Attributeのエンコードされ、パーセントは符号化されませんでした。 今、彼らはいます。 NGDCのISO 19115のバリデータのおかげで。
        * BUG FIX:ISO 19115文書を作成するとき、date\\_createdとはいえ、よく間違ったフォーマットだった。 ISO 8601 Z 文字列に変換します。 NGDCのISO 19115のバリデータのおかげで。
        * BUG FIX:ISO 19115文書を作成するとき、ERDDAP™年 = 0000 で日付を書く (気候データセットと同様に) ISO 19115のスキーマが年数の日付を許可しないため、 NGDCのISO 19115のバリデータのおかげで。
    * NEW: 要求の前にhttp.../erddap/version はバージョン番号だけを返す (テキストとして) など、ERDDAP\\_version=1.82 です。
今すぐ、リクエストhttp.../erddap/version\\_string は '\\_' と ASCII テキストのオプションのサフィックスを返す (スペースや制御文字なし) など、ERDDAP\\_version\\_string=1.82\\_JohnsFork を使う。 フォークをしている人は、EDStatic.erddapVersion を変更することでこれを指定します。 以前のバージョンの問題を引き起こすことはありません。ERDDAPお問い合わせ Axiomのおかげで (著名な, Kyle Wilcox) アイルランドの海洋研究所 (確かに、ロブ・フラー) お問い合わせ
    * バグフィックス: wms version=1.3.0 の場合、request=GetMap, crs=EPSG:4326 (ない CRS:84) 要求:bbox順序はminLat、minLon、maxLat、maxLonでなければなりません。 CRS:84の要求のために、前に、bboxの発注はminLon、minLat、maxLon、maxLatでなければなりません。 これは、使用して修正することができますERDDAPお問い合わせWMS1.3.0サービスArcGIS  (パオラ・アルスに感謝) お問い合わせ お問い合わせ (コメントはありません) お問い合わせOGCこんなに複雑にするため。 お問い合わせLeafletこれを正しく処理し、これをテストする方法を私に与えます。
    * 改善: 以前、提案されたリンクのためのRSSそして電子メールの購読に持っていますhttpあなたのURLERDDAPお問い合わせ 今、それはhttpsURL がアクティブの場合
    * 新しい:EDDGridコピーはオプションタグをサポート&lt;だけなので&gt;_someValue_&lt;/onlySince&gt;、値が特定のISO-8601フォーマットされた時間またはaである場合now-nユニット (例:now-2年分) 時間。 詳細はこちら[メニュー ドキュメント](/docs/server-admin/datasets#onlysince)お問い合わせ Drew Pのおかげで.
    * 即興: 利用できる場合、ERDDAP™ショーhttpsURL(から)&lt;baseHttpsUrl&gt;, 利用可能な場合)httpユーザーが URL をユーザに知らせると、サブスクリプションを追加/検証/削除/リストします。
    * バグフィックス:ERDDAP™今ではサブスクリプションアクションが " https://" お問い合わせ (ボブは彼の額をスラップ.) Jennifer Sevadjianさん、ありがとうございました。
    * バグフィックス:.jsonlKVP次に、各キーと値の間の ':' を使用します。'='お問い合わせ (ボブは彼の額をスラップ.) アレクサンダーバースのおかげで。
    * バグフィックス: 以前は、再起動したらERDDAP™QuickRestart=true で、データセットが正常にリロードされる前に、updateEveryNMillis を使用した EDDTableFromFiles のデータセットに呼び出し、データファイルが変更された場合、リクエストは null のポインタエラーで失敗します。 リクエストが成功します。 ジョン・カーフのおかげ
    * NEW: データセットが読み込まれるときERDDAP™キーワードはソート順に並べ替えられ、新しい文字は削除されます。
    * 即興:.geoJson なら、.jsonまたは.ncoJson の要求は持っています.jsonp パラメータは、レスポンス mime 型は application/javascript です。 注意:.jsonpはサポートされていません.jsonlCSVまたは.jsonlKVP、それは働かないので。 ロブ・フラーさん、ありがとうございました。
    * IMPROVED: json 行の mime タイプ fileType オプションは "application/x-jsonlines" です。 アプリケーション/jsonl 現在、決定的な正しい選択はありません。
    * IMPROVED: status.html ページに表示された失敗したリクエストの数が増加します。以前よりも多くのことが失敗としてカウントされるため、ClientAbortException が増加します。
    * 即興: 応答からERDDAP™圧縮されず、応答のヘッダには「Content-Encoding」="identity」が含まれます。
    * IMPROVED: "license" 属性は必要ありません。 これで、指定しない場合は、messions.xml からの標準ライセンス (またはsetup.xml から) デフォルトとして使用されます。
    * NEW: オプションがあります[fileAccessSuffix属性](/docs/server-admin/datasets#fileaccessbaseurl). 既存のと使用することができます[fileAccessBaseUrl属性](/docs/server-admin/datasets#fileaccessbaseurl)お問い合わせ
    * IMPROVED:セキュリティを高めるために、このバージョンは最新のバージョンでコンパイルされましたJavaJDKのv8u162。
    * NEW:セキュリティを高めるために、一時的なメールアドレスを提供する複数の一般的なドメイン (例:@mailinator.com) サブスクリプションシステム用の永久的なメールブラックリストに今あります。
    * 新機能:セキュリティを強化するには、デイリーレポートの背が高くなります。
セットデータセット フラグ IP アドレス失敗 (最終日報以来)   
セットデータセット フラグ IP アドレス失敗 (スタートアップ)   
セットデータセット フラグ IP アドレス 成功 (最終日報以来)   
セットデータセット フラグ IP アドレス 成功 (スタートアップ)   
「失敗した」背の高い人は誰に会いましょう (ハッカー?) フラグを設定しようとしていますが、失敗しています。
    * 改善: セキュリティーを高めるため、メールアドレスをメールで送信します。&lt;サブスクリプションメールブラックリスト&gt;datasets.xmlケース・インセンティブと見なされます。
         

## バージョン1.80{#version-180} 
 (公開日 2017-08-04) 

*    **新しい特徴 (ユーザ向け) : : :**   
     
    * ニュースorderByCount () filter では、結果テーブルのソート方法を指定できます。 (またはない) 各ソートグループに1行ずつ返し、各変数の非従順値のカウントで返します。
例えば、orderByCount (ツイートstationIDツイート) 並べ替えstationIDそれぞれの行を1行ずつ返しstationID, 各変数の非従順値の数のカウントで.
もしだけ指定すればorderByCount (お問い合わせ) 応答は、各データ変数の非従順値の数で1行になります。
詳細はこちら[orderBy... ドキュメント](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)ベン・アダムスに感謝します。
    * ニュース.ncoJson ファイル グリッドされたおよび表形式のデータセットのオプションを入力します。 このオプションは、NCOlvl=2 "pedantic" JSON は、通常、すべての情報で見つかりました.ncファイル。 お問い合わせ[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)チャーリー・ツェンダーのありがとう。
    * バグフィックス: ザ・オブ・ザ・orderBy・・・ () Make A Graph Web ページのオプションが正しく処理されます。
    * BUG FIX: .geoJson の出力は lat や lon の値が欠落している行を印刷しません。 また、高度の値 (利用可能な場合) データ値ではなく、座標に含まれているようになりました。 ジョナサン・ウィルキンスに感謝します。
         
*    **お知らせERDDAP™管理者は知っておく必要があります。**   
     
    * 証券会社: Protocols.js ライブラリは、OpenLayersデモオンWMSページ数ERDDAP™最新であり、悪用される可能性があるバグがあります。 (残念ながら、更新OpenLayersプロトコル。 js は簡単です。) これにより、ライブラリがクロスサイトの脆弱性を許すように設定できる可能性が開きます。 しかし、ERDDAP™使用のみOpenLayers特定の事前設定方法および特定のだけERDDAP- ベースのデータソースは、クロスサイトの脆弱性がないことを信じていますERDDAP's の使用OpenLayersそして、protocols.js. しかし、あなたがこれを信じていないならば、あなたは今、使用を無効にすることができますOpenLayersデモオンWMSあなたのページERDDAP™加えることによって
```
        <openLayersActive>false</openLayersActive>  
```
setup.xml ファイルへ。 デフォルトは "true" です。 チャールズ・カルレトン氏、NCEI氏より
    * SECURITY CHANGES: 未使用の.jarファイルと.jarファイルを複製 (彼らはnetcdfAll.jarにもあるので) から削除されたERDDAP™分布。 最新の .jar ファイルが更新されました。 チャールズ・カルレトン氏、NCEI氏より
    * 機密保持: netcdfAll.jarファイルと配布ERDDAP™最新バージョン (現在 4.6.10) , しかし、それはまだ、古いであることが知られ、セキュリティの脆弱性を持っている内部ジャックソン.jarファイルが含まれています, 特にアマゾンS3データソースにアクセスするときにのみ使用されるジャクソンライブラリ. Amazon S3でデータにアクセスできない場合 (いつだったかわからない) これらの脆弱性は関係ありません。
        
netcdf-java 開発者は、netcdf コードがこれらのライブラリを使用しており、Amazon S3 にアクセスするときにのみ関連性があることを維持しています。 お問い合わせ[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866)お問い合わせ お問い合わせ それでもこの懸念がある場合は、netcdf-java 開発者にお問い合わせください。 (netcdf-java の開発者を信じておらず、使用していないことを想定していない場合に注意ERDDAP™そのため、THREDDS は基本的にはより広くより広くより広範囲に利用するので、ERDDAPお問い合わせ) 
        
詳細: 面倒なコードと脆弱性警告は次のとおりです。
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
お問い合わせ https://nvd.nist.gov/vuln/detail/CVE-2016-7051 お問い合わせ 高い
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-c/borm.xml
お問い合わせ https://nvd.nist.gov/vuln/detail/CVE-2016-7051 お問い合わせ 高い
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
お問い合わせ https://nvd.nist.gov/vuln/detail/CVE-2016-7051 お問い合わせ 高い
お問い合わせ https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- クリティカル
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
お問い合わせ https://nvd.nist.gov/vuln/detail/CVE-2016-7051 お問い合わせ 高い
お問い合わせ https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- クリティカル
「バージョン4.6.10では、ジャックソン=\\*アーティファクトのバージョン2.6.6で、aws-java-sdk-coreがプルします。」 (netcdf-java からのメール) お問い合わせ
チャールズ・カルレトン氏、NCEI氏より
        
    * COMPILERの天使: 再コンパイルする場合ERDDAP™コマンド行に必要な -cp classpath パラメータは以前よりもはるかに短くなりました。 新しい -cp の設定を参照してください。[このドキュメント](/docs/contributing/programmer-guide#development-environment)お問い合わせ チャールズ・カルレトン氏、NCEI氏より
    * GenerateDataset の新しいオプション Xml: EDDTableFromBcodmo は、BCO-DMO の内部使用のためだけである。
アダム・シェパードとBCODMOのおかげで。
    * 新しい属性および特徴: EDDTable 列に Web アクセス可能なファイルのファイル名がある場合 (たとえば、画像、ビデオ、またはオーディオファイル) 、加えることができます
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
ベース URL を指定する (終了 /) ファイル名を完全なURLにするために必要です。 それから.htmlTable応答,ERDDAP™ファイル名を結合URLへのリンクとして表示します (ベース ウルとファイル名) お問い合わせ
お問い合わせERDDAP™関連するファイルを提供するには、それらのファイルの別のEDDTableFromFileNamesデータセットを作る (プライベートなデータセット) お問い合わせ
アダム・シェパードとBCODMOのおかげで。
    * 新しい属性の更新: EDDTable カラムが web アクセス可能なファイルのファイル名を持っている場合 (たとえば、画像、ビデオ、またはオーディオファイル) アーカイブからアクセス可能 (例:.zipファイル) URL でアクセス可能、使用
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
アーカイブのURLを指定します。
お問い合わせERDDAP™アーカイブファイルを提供するには、そのファイルの別のEDDTableFromFileNamesデータセットを作る (プライベートなデータセット) お問い合わせ
アダム・シェパードとBCODMOのおかげで。
    * GenerateDatasets への提案 無効/悪い原因を取り除くXml&lt;subsetVariables&gt; 提案と重複/悪い提案変数名など 豊富なシグネル、アダム・シェパード、およびBCO-DMOのおかげで。
    * 新しい選択: 政治的境界情報と分散ERDDAPサードパーティーから、やや、最新です。 また、様々な人が正しいことについて異なる考えを持つ世界のいくつかの場所で紛争の境界があります。 ポーティカル・ボウンダリ・データが生み出しているのが現状です。ERDDAPお問い合わせ 政治の境界情報を気に入らなければERDDAP™、今言うことができますERDDAP™追加することで政治的境界線を描画しない
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
setup.xml ファイルへ。 デフォルトは "true" です。 Raju Devenderのおかげで.
    * 新しいメタダタ タグ: お問い合わせdatasets.xmlデータセットの場合、デフォルトの色数を指定できるようになりました。 バーセクションdataVariableグラフとマップ
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1 は、ERDDAP™お問い合わせ) お問い合わせ 詳細はこちら[カラー バーの設定](/docs/server-admin/datasets#color-bar-attributes)お問い合わせ
    * 改良:地図上の州の境界色は紫色でした (ベビーブーマーのためのディープパープル) お問い合わせ 今、それは灰色です (国の境界灰色と土地の灰色の間に) お問い合わせ
    * バグフィックス:&lt;iso19115File&gt;と&lt;fgdcFile&gt; でdatasets.xml常に正しく処理されていない それでは、 BCO-DMOのおかげで。

## バージョン 1.78{#version-178} 
 (公開日 2017-05-27) 

*    **新しい特徴 (ユーザ向け) : : :**   
     
    *    (なし)   
         
*    **お知らせERDDAP™管理者は知っておく必要があります。**   
     
    * IMPROVED: status.html ページの "Major LoadDatasets Time Series" の行の順番は、一番上に最新です。
    * バグフィックス:ERDDAP™今は書きます.nccsv時間変数のファイルactual\\_rangeISO-8601 文字列の時間として。 これは、リモートデータセットから EDDTableFromErddap 解析情報と、すべての EDDTableFrom...Files データセットの QuickRestart ファイルからバグを修正しました。 (時間についてactual\\_rangeデータセットが v1.78 にロードされるのは初めて間違っていますが、再ロードされると、例えば、データセットをフラグすると正しいです。) 

## バージョン 1.76{#version-176} 
 (公開日 2017-05-12) 

*    **新しい特徴 (ユーザ向け) : : :**   
     
    * Tomcat の変更: リクエストERDDAP™ウェブブラウザ以外のソフトウェアから来られる (例:curl、R、Matlab,Python,Java) : : :
Tomcatのバージョンの以前の変更と同様に (実行する低レベルのソフトウェアERDDAP) 2016年初旬以降、リクエスト URL のクエリ部分の文字数が増える[ **パーセントエンコード** ](/docs/server-admin/datasets#infourl)セキュリティ上の理由 ブラウザーは、パーセントのエンコーディングを処理します。 ご利用にあたってERDDAP™リクエストが別のものにリダイレクトされない限り、ブラウザは影響しませんERDDAPお問い合わせ
    * 改良: 以前、ERDDAP™処理する **char 変数** 文字よりも符号なしの短い整数のようなもの。 今、それは1-character-long UCS-2のようにそれらをより扱います (ユニコード) 文字列。 詳細はこちら[char ドキュメント](/docs/server-admin/datasets#char)お問い合わせ Aurelie BriandとArgoプロジェクトのおかげで。
    * 改良: 以前、ERDDAP™少しサポートを提供しました **Unicode 文字** 文字列の文字#255以上。 今、内部的に、ERDDAP™2バイトのUCS-2文字を完全にサポート (文字数 0～65535) 文字列。 文字列データが様々なファイルタイプに書かれているとき、ERDDAP™2バイトの文字をサポートできるのは最善です。 もう一つの例は .csv ファイルです。ERDDAP™ISO-8859-1 charset で書く (1バイトのcharset) ・・・ERDDAP™JSON のような \\u_hhhh_ の構文で、文字 #255 を超える文字を記述します。 お問い合わせ[文字列データ](/docs/server-admin/datasets#string)お問い合わせ
    * 改善される: で.ncによって書かれたファイルERDDAP™, 文字列として解釈されるchar変数は属性を持つ
         **\\_エンコード=ISO-8859-1**   
インスタグラム.nc読み込みファイルERDDAP™, char 変数 "\\_Encoding" は指定されたcharset で String として解釈されます。
    * 注文:ERDDAP™サポート **JSON のようなバックスラッシュエンコーディング** char と String 変数の制約を指定すると、特別な文字。 そのため、20ac 以降、myString=€ がユーロシンボルのコードポイントの 16 進数バージョンであるので、データの行を望むときに、&myString="\\u20ac" のようなリクエストをリクエストできます。 ウェブ上の複数のソースは、Unicodeのシンボルのコードポイント番号を示しています。[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)お問い合わせ
    * 改良: 以前、ERDDAP™限られたサポートを提供しました **長い整数** 変数。 詳しくはこちらERDDAP™長いデータを様々なファイルタイプに書き込むと、内部的に長尺に対応し、最善を尽くします。 詳細はこちら[長いドキュメント](/docs/server-admin/datasets#long)お問い合わせ アイルランドの海洋研究所、クレイグ・リシエン、リッチ・シグネル、クリストファー・ワナード、OOIのおかげで。
    * NEW: Griddap と出力ファイルタイプtabledap: : : **.nccsv** つまり、NetCDF-like, ASCII, CSV ファイルも、同等のメタデータに含まれている.ncファイル。 詳細はこちら[NCCSVの特長 仕様](/docs/user/nccsv-1.00)お問い合わせ スティーブ・ハンキンに感謝します。
    * 新しい: **orderByClosestフィルター** 結果テーブルのソートと間隔を指定する (例:2時間) お問い合わせ 各ソートグループ内では、間隔の一番近い行のみを保持します。 例えば、orderByClosest (ツイートstationID、時間、2時間」) 並べ替えstationIDそれぞれの行だけを返すstationID最後の場所orderByコラム (タイムタイム) 最短2時間間隔です。 これは最も近いことですtabledapGriddap リクエストの値を stride する。 このオプションは、任意の方法で指定できます。tabledapdataset の .html の Web ページ、.graph の Web ページ、および生成する URL のいずれかによって。 アイルランドのマリン・インスティテュートとオーシャン・ネットワークス・カナダのおかげ
    * 新しい: **orderByLimitフィルター** 結果テーブルのソートと制限番号を指定する (例:100) お問い合わせ 各ソートグループ内では、最初の 'limit' 行のみを保持します。 例えば、orderByMax (ツイートstationID、100") 並べ替えstationID, しかし、それぞれ最初の100行のみを返すstationIDお問い合わせ SQL の LIMIT 句と似ています。 このオプションは、任意の方法で指定できます。tabledapdataset の .html の Web ページ、.graph の Web ページ、および生成する URL のいずれかによって。 アイルランドのマリン・インスティテュートとオーシャン・ネットワークス・カナダのおかげ
    * NEW: 2つの新しい応答ファイルタイプ, **.jsonlCSVそして、.jsonlKVP** グリッドされたデータセット、表形式のデータセット、その他多くの場所へのリクエストが使用可能ERDDAP  (例:データセットに関する情報のリクエスト) お問い合わせ ファイルは JSON 線ファイルです ([ https://jsonlines.org/ ](https://jsonlines.org/)) 各行に別の JSON オブジェクトがある場所。.jsonlCSVCSV 形式の値だけを持っています。.jsonlKVPキーがあります: 値のペア。 各線は、それぞれに立っています。 行は、より大きい JSON 配列またはオブジェクトに囲まれません。 例えば、[このサンプルリクエスト](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z)お問い合わせ ダミアン・スミス氏、ロブ・フラー氏、アダム・リードベッター氏、アイルランドのマリン・インスティテュート氏に感謝します。
    * NEW: 記述する新しい文書があります[ **プライベートデータセットへのアクセス方法ERDDAP™スクリプト経由で** ](/docs/user/AccessToPrivateDatasets)お問い合わせ Lynn DeWitt のおかげです。
    * 改善:最低限の程度 **OpenLayers** 地図は2度で、4つのデータピクセルになりました。 Rusty Hollemanのおかげで.
    * 改善: いくつかの一般的なケースでは、要求を含む **正規表現** 制約はより速く処理されます。
         
*    **お知らせERDDAP™管理者は知っておく必要があります。**   
     
    *    **スローファーストスタート:** この新しいバージョンを立ち上げる最初の時間は、長い時間がかかりますERDDAP™ソースのすべてのデータファイルを再読み込みする必要があるため、すべてのデータセットをロードするには (グリッドされたデータファイルのヘッダーだけ) お問い合わせ ログを見ると、内部ファイルの "old/unsupported EnhancVersion" というエラーメッセージが表示されることがあります。ERDDAP™内部ファイルの新しいバージョンを作成します。 お問い合わせ
    * アクション:ERDDAP™今、新しい使用 **java.time の** クラス (別名 JSR 310) 代わりに、Joda は文字列を数値時間に解析します。 注意:
        * お問い合わせERDDAP™突然、与えられたデータセットの文字列時間を解析する問題があり、NN's にほとんどまたは常に変換します。 (不足している値) 、問題は日付とほとんど常にあります 変数の "units" として指定された時間フォーマット文字列。 新しいシステムは、少し異なるdateTime形式の文字列を必要とする場合があります。
        * dateTime文字列の数値月と日が0パッドされていない場合 (例:「3/7/2016」) フォーマットが単一のMとdを持っていることを確認してください (例:「M/d/yyy」ではなく「MM/dd/yyyyy」) お問い合わせ
        * downcase s's を使用する任意の僅か秒指定を変更します。 (例: .ss のyyyy-MM-dd'T'HH:mm:ss.ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss) 資本金に お問い合わせ (例:yyyy-MM-dd'T'H:mm:ss.SSS) お問い合わせ
        *   ERDDAP™文字列の日付をサポートしない 2桁の年で時刻形式 (ログイン) 暗黙の世紀と (例:1900年または2000年) お問い合わせ 1990年代後半にこの問題が修正された数十億ドルの事業を費やしました。 サイエンティストは2桁の数字を使用するべきではありません。 ソースファイルを修正してください (ツイート) 4桁の年数に変換し、日付で yyyy を使用します。 時間フォーマット。
        * yyyy や YYYYYYY を使うことができます。 (お問い合わせERDDAP™uuuuuuuuuu への変換) 負の年、例えば、-4712 を含む 4 桁の年をパースするため (紀元前4713年) お問い合わせ SeaDataNet、Thomas Gardner、およびBODCのご協力によります。
        * 引き続き、Z を dateTime 形式で使用してください。ERDDAP時間オフセットを解析する (例:Z、+0200、-08、-0800、-08:30) お問い合わせ
        *    **必ずご使用くださいJavaバージョン 1.8.0\\_21 以降** 
        * プログラマ お問い合わせ 書き込む場合Java実行するプログラムERDDAP™コード、参照をjoda-timeに削除する必要があります。 クラスパスパラメータの jar 。
    * 新しい:ERDDAPお問い合わせ[アーカイブA データセットツール](/docs/server-admin/additional-information#archiveadataset)作成できるようになりました[ **BagItファイル** ](https://en.wikipedia.org/wiki/BagIt)お問い合わせ NCEIはこのフォーマットで標準化することができます。 スコット・クロスとジョン・レフのおかげ
    * 改善: erddap をダウンロードするためのリンク。 戦争でERDDAP™ウェブページは現在、 **GitHubで** お問い合わせ (これらは公開リンクなので、GitHubに参加する必要はありません。) これは、はるかに高速なダウンロードを意味します (最大12Mb/s versus 1Mb/s) ダウンロードに問題はありません。 ダミアン・スマイス、ロブ・フラー、アダム・リードベッター、コナー・デレーン、アイルランドのマリン・インスティテュートのおかげで。
    * 即興: **status.html ページと毎日のステータスレポートメール** 現在、統計情報を示す「Major LoadDatasets Time Series」セクションを含むERDDAP™最後の 100 の主要な loadDatasets の各主要な loadDatasets の終端として。 大変お世話になりました。
    * 新しく、任意 (おすすめ) EDDTableFromCassandra データセットのパラメーター: [ ** &lt;パーティションキーCSV&gt; ** . . (/docs/server-admin/datasets#partitionkeycsv) お問い合わせ オーシャン・ネットワークス・カナダ 様
    * NEW: EDDTableFromAsciiFilesがサポート ** &lt;コラムセパレータ&gt; ** パラメータ。 null または "" の場合、クラスは前のように推測します。そうしないと、ファイルを読むときに最初の文字はカラムの区切り文字として使用されます。 スカイブリストルとアビゲイル・ベンソンに感謝します。
    * 新しい: 新しいデータセットのタイプ、[ **EDDTableFromNccsvファイル** ](/docs/server-admin/datasets#eddtablefromnccsvfiles)、集計によってデータセットを作ることができます[NCCSV .csv ファイル](/docs/user/nccsv-1.00)お問い合わせ スティーブ・ハンキンに感謝します。
    * 改善される: **EDDTableFromErddapの特長** 今すぐ使用.nccsvリモートから情報を取得するERDDAPs およびそのメタデータ情報のローカル アーカイブ用。 これにより、文字と長いデータ型、Unicode のフルサポートが可能 (UCS-2の特長) chars と Strings の文字セット。 ロブ・フラーとアイルランドの海洋研究所のおかげで。
    * 改良:EDDTableFromErddapおよびEDDGridFromErddapがサポート ** &lt;リダイレクト&gt;false&lt;/redirect&gt; ** 誰が言うかERDDAP™リクエストをリモートにリダイレクトしないようにERDDAPお問い合わせ デフォルトはtrueです。 これはリモート時に便利ですERDDAP™プライベートERDDAPお問い合わせ ダミアン・スマイス、ロブ・フラー、アイルランドのマリン・インスティテュートに感謝します。
    * 改善される:ERDDAP™今キャッチ **ユーザーのリクエストをキャンセル** お問い合わせ そしてERDDAP™低レベルのスレッドがより速くシャットダウンしているため、より高速にシャットダウンします。 大変お世話になりました。
    *    **生成データセット Xml:** 
        * NEW: 新しい特別なEDDType "ncdump"は、[ログイン](https://linux.die.net/man/1/ncdump)ヘッダーの\\-likeプリントアウト.ncファイル。 指定した変数のデータ値を印刷することもできます。 (または任意のデータ値を印刷しないために「いいえ」を入力する) お問い合わせ これは、ncdumpなしでファイル内のものを知っておくのが難しいため、GenerateDatasetsXml に指定すべきEDDTypeです。 Craig Risien、リッチ・シグネル、Christopher Wingard、OOIのおかげです。
        * 新規:SeaDataの場合 純データ:
適切な場合、GenerateDatasets Xml はリモート SPARQL クエリを使用して特定のセマンティック変換を行います: 変数のソースメタデータに sdn\\_parameter\\_urn が含まれている場合は、 sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01", GenerateDatasets Xml は、対応する P02 属性、例えば、sdn\\_P02\\_urn = "SDN:P02::PSAL" を追加します。 これらの属性を使用するデータセットがある場合、ERDDAPお問い合わせ&lt;categoryAttributes&gt; setup.xml には sdn\\_parameter\\_urn と sdn\\_P02\\_urn が含まれているので、ユーザーは利用できるようになります。ERDDAP™これらの属性の特定の値でデータセットを検索するカテゴリ検索システム。 BODCとアレクサンドラ・コクキナキに感謝します。
        * 生成: GenerateDatasets Xmlは現在多くの変更を加えますhttp://メタデータの参照https://適切な場合。
        * 生成: GenerateDatasets Xml は作成者\\_type とパブリッシャー\\_type を推測しようとします。
        * IMPROVED: GenerateDatasetsが提案する変数のdataTypes Xml は少し良いでしょう。 Margaret O'Brien、LTER、およびEMLのおかげで。
        * 生成: GenerateDatasets Xml は指定でよりよいです&lt;cdm\\_data\\_type&gt; および関連する必須属性を追加 (例、&lt;cdm\\_timeseries\\_variables&gt;) なので、その情報を提供できます。 豊富なSignellのおかげで。
        * 改善: GenerateDatasets で Xml、EDDTableデータセット、のための提案&lt;subsetVariables&gt; より保守的になりました。 ジョン・カーフのおかげ
        * 改善される: 場合datasets.xmlデータセットの仕様featureTypecdm\\_data\\_type ではなく、featureTypecdm\\_data\\_type として使用されます。 豊富なSignellのおかげで。
        * BUG FIX: 生成 データセット Xmlは正しいことを提案します&lt;dataType&gt; 持っているデータ変数のscale\\_factor,add\\_offset\\_Unsigned 属性。
    * 改善される:時ERDDAP™開く.ncファイルが **ショート** それよりも (e.g. 完全にコピーされていなかった) ,ERDDAP™ファイルが悪いように処理します。 以前は、ERDDAP™netcdf-java のデフォルト動作であるため、ファイルの欠落部分の欠落した値を返します。ERDDAP™ucar を使う.nc2.iosp.netcdf3.N3header.disallowFileTruncation = true; 苦難のRAIDとクリスチャン・ウォード・ガリソンに感謝します。
    * 改良:ISO 19115の作家は今使用をします **作成者\\_type** , 存在する場合.
    * 改善される:ERDDAP™netcdf-java v4.6.9 は、追加タイプの追加タイプを読み込みます。 **netcdf-4 ファイル** お問い合わせ Craig Risien、リッチ・シグネル、Christopher Wingard、OOIのおかげです。
    * BUG FIX: 異なるソースファイルが指定された変数の異なるデータ型を持っている場合、問題を回避します。 Roy MendelssohnとEugene Burgerのおかげさまで。
    * バグフィックス: **時間フォーマット変換** 悪い時間値から保護されるようになりました。 NDBC のおかげで。
    * バグフィックス:EDDGridからNcFiles Unpacked では、時間値を扱います。 **「月は・・・」と「年は・・・」** よくある質問 (月または年を増やすことで、原始的に30日を繰り返し加えることによる) お問い合わせ Soda3.3.1 のおかげで.
    * バグフィックス:v1.74で、 **サブスクリプション** アクションが必要 (例:http://・・・) , あったとオプションでなければなりません.
    * バグフィックス:EDDGridFromMergeIRFiles.lowGetSourceメタデータ () グローバル属性を追加しなかった。 なるほど。
         

## バージョン 1.74{#version-174} 
 (公開日 2016-10-07) 

*    **新しい特徴 (ユーザ向け) : : :**   
     
    * 今、データセットの一覧 (全部または検索から) 複数の行に長いタイトルが表示されます。 以前は、長いタイトルの中央が「...」に置き換えられました。 Margaret O'Brien、LTER、およびEMLのおかげで。
         
*    **お知らせERDDAP™管理者は知っておく必要があります。**   
     
    * TO DO: Linux コンピューターで、Apache のタイムアウト設定を変更して、時間のかかるユーザリクエストはタイムアウトしません。 ("Proxy" または "Bad Gateway" エラーとして表示されるもの) お問い合わせ rootユーザとして:
        
        1. Apache の変更httpd.conf ファイル (通常は/etc/でhttpd/conf/) : : :
既存の変更&lt;タイムアウト&gt;設定 (またはファイルの最後に 1 つを追加) から 3600 (秒単位) デフォルト60秒または120秒の代わりに。
既存の変更&lt;プロキシタイムアウト&gt; アクセス (またはファイルの最後に 1 つを追加) から 3600 (秒単位) デフォルト60秒または120秒の代わりに。
        2. Apache の再起動: /usr/sbin/apachectl -k 優雅な (しかし、時々それは別のディレクトリにあります) お問い合わせ
        
トーマス・オリバー氏に感謝します。
         
    * 新しい:\\[bigParentディレクトリ/ハード フラグディレクトリ
これは、フラグディレクトリのように動作しますが、hardFlagバージョンは、キャッシュされたデータセット情報をすべて削除します。 ハードフラグを設定するURLはありません。 そのディレクトリにファイルを置くだけで使えます。
ハード どのように変化を引き起こす何かを行うとき、フラグは非常に便利ですERDDAP™ソースデータを読み込み、解釈します。例えば、新しいバージョンをインストールしたときにERDDAP™またはデータセットの定義に特定の種類の変更を行った場合datasets.xmlお問い合わせ お問い合わせ[このドキュメント](/docs/server-admin/additional-information#hard-flag)お問い合わせ ジョン・カーフとアルゴのすべてのグループのおかげで。
         
    * 新規: GenerateDatasets Xml には EDDTableFromEML オプションがあります。
エコロジー・メタデータ・ランゲージでデータセットの説明を読み込む (EMLについて) ファイル、関連するデータファイルをダウンロードし、チャンクを生成しますdatasets.xmlデータセットを追加できるようにERDDAPお問い合わせ ディレクトリ内のすべてのEMLファイルの同じことを行うEDDTableFromEMLBatchもあります。 これは、EML がデータセットを記述する優れた仕事を行っているため、KNB と LTER が実際のデータファイルを作成するため、非常にうまく機能します。
EMLプラスERDDAP™大きい組合せであることができるので、ERDDAP™ユーザーは、KNBとLTERデータの富に直接アクセスし、それらのプロジェクトが米国政府のを満たしているのを助けることができる[研究成果公開アクセス (ログイン) 要件](https://nosc.noaa.gov/EDMC/PD.DSP.php)Webサービスで利用できるデータを作ることによって。
お問い合わせ[このドキュメント](/docs/server-admin/EDDTableFromEML)お問い合わせ Margaret O'Brien、LTER、およびEMLのおかげで。
         
    * 新規: GenerateDatasets Xml には EDDTableFromInPort オプションがあります。
InPort XML ファイルにデータセットの説明を読み込み、チャンクを生成するdatasets.xmlデータセットを追加できるようにERDDAPお問い合わせ これはめったにXMLの既製のチャンクを生成しますdatasets.xml、しかしそれは人間によって編集するための良い出発点である良いラフドラフトを作成します。
InPort を使ってデータセットを文書化する場合も素晴らしいでしょう。ERDDAP™実際のデータを利用できるようにするためERDDAP's web サービスおよびそれによって米国政府に会いますNOAAお問い合わせ[研究成果公開アクセス (ログイン) 要件](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)Webサービスで利用できるデータを作ることによって。 今でも使えるソリューションです。 (erd.data at noaa.govお問い合わせ)   
お問い合わせ[このドキュメント](/docs/server-admin/datasets#eddtablefrominport)お問い合わせ Evan Howell と Melanie Abecassis のおかげです。
         
    * 改善される:ERDDAP™netcdf-java 4.6.6 を使用します。
以前のバージョンでは、netcdf-java では、いくつかの値を読み込む (おそらく、netcdf-4ファイルで) 0's として。 今、ネットcdf標準のフィリング値としてそれらのいくつかを読みます: -127 バイト, -32767 ショートパンツ, -2147483647 ints.Unidata新しい行動は適切な行動であると言う。 データセットの変数が 0 を表示するために使用したこれらの値の 1 つを示す場合、例えば、
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
変数にaddAttributesお問い合わせERDDAP™その価値をとして扱うためmissing\\_value/\\_Fillの 価値。 しかし、多くの場合、希望する結果は、0 の結果は収まりません。 もしそうなら、ファイルの変更を検討してください。NCOまたはファイルを書き換えます。 苦情? お問い合わせUnidata;-)
         
    * TO DO: 新しい地理Depthパレット
OceanDepthパレットを使用して、新しいTopographyDepthパレットを使用するすべてのデータセットを切り替えることをお勧めします。これは、色の反転を除き、トポグラフィのようなものです。 (プラス=ダウン) , 代わりに高度の値 (プラス=アップ) お問い合わせ このパレットの推奨設定は次のとおりです。
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * 新しい特徴: ストリングmissing\\_valueと/または\\_FillValue
文字列変数が定義されている場合missing\\_valueと/または \\_FillValue,ERDDAP™これで、データからそれらの値を削除し、空の文字列でそれらを置き換えます。これにより、不足している値は空の文字列として表示されます。ERDDAPお問い合わせ Margaret O'Brien、LTER、およびEMLのおかげで。
         
    * 新しい特徴: ローカルタイムズのサポート
文字列からソースデータを持つ timestamp 変数は、タイムゾーンを "time\\_zoneリードする属性ERDDAP™ローカルタイムゾーンのソース時間を変換する (標準的な時間、日光のセービングの時間である) お問い合わせZuluタイム。 有効なタイムゾーン名のリストは、おそらく TZ 列の一覧と同一です[このテーブル](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)お問い合わせ デフォルトは "Zuluお問い合わせ 一般的な米国タイムゾーン:米国/ハワイ、米国/アラスカ、米国/太平洋、米国/マレーシア、米国/アリゾナ州、米国/中央、米国/東部。 数値ソースデータのタイムスタンプ変数の場合、"time\\_zone" 属性, しかし、値は "Zuluまたは「UTC」。 Margaret O'Brien、LTER、およびEMLのおかげで。
         
    * 新機能:EDDTableFromAsciiFilesはセミコロン区切りファイルをサポートしています
そして、セパレータを調べるのが賢明です。 Margaret O'Brien、LTER、およびEMLのおかげで。
         
    * 新しい特徴: loadDatasets に大きなエラーがある場合 (メジャーまたはマイナー、例えば、欠落または無効datasets.xmlドキュメント) ,ERDDAP™ERROR として "n Datasets Failed To Load" を "n Datasets Failed To Load" のすぐ下にある status.html で表示します。処理中datasets.xml: 詳細は log.txt を参照してください。
         
    * 新しい特徴:ERDDAP™孤児を探します。
いつかERDDAP™大きい負荷をします データセットは、Orphanデータセットを探します (データセットERDDAP™しかし、ないdatasets.xml) お問い合わせ 見つかった場合は、ERROR:n Orphan Datasetsとして "n Datasets Failed To Load" のすぐ下にある status.html にリストされています。 (データセットERDDAP™しかし、ないdatasets.xml) =.....
削除したい場合 (アンロード) 孤児からERDDAP™、加える必要があります
        &lt;データセットタイプ="_anyValidType_"datasetID="_theDatasetID_" アクティブ="false" /&gt;
お問い合わせdatasets.xml次の主要な loadDatasets の間にデータセットがアンロードされるまで。
         
    * バグフィックス: データセットが数値のタイムスタンプ変数を他の単位と持っていた場合"seconds since 1970-01-01T00:00:00Z"そして、&lt;updateEveryNMillis&gt; システムがアクティブで、データセットが更新されたとき、タイムスタンプ変数の範囲は誤って設定されました。 ジョン・カーフのおかげ
         
    * バグ修正: もし&lt;quickRestart&gt; は setup.xml で true で、EDDTableFrom からデータを要求しました。 使用されるファイルデータセット&lt;updateEveryNMillis&gt; は、データセットの最初のリクエストは失敗しますが、その後のリクエストは成功します。 最初のリクエストは失敗しません。 ジョン・カーフのおかげ
         
    * BUG FIX: GenerateDatasetsXml.sh と .bat はコマンドラインの &gt;9 パラメータで動作しなかった。 今、彼らはやる. ジョン・カーフのおかげ
         
    * バグフィックス: 新しいEDDTableFromMultidimNcFilesは、文字列から末尾のスペースを一貫して削除しませんでした。 なるほど。 残念ながら、この影響を受けたARGOファイル。 Kevin O'Brien と Roland Schweitzer の主要ブランドです。
         
    * バグフィックス: すべてのリモートアクセスDAPより現代的なコードでサービスを開始 これにより、EDDTableFromErddap のデータセットにアクセスしたときに「接続閉鎖」エラーが修正されます。 Kevin O'Brien(ケビン・オビエン)
         
    * バグフィックス: 取扱いについてorderBy・・・ () そして明確 () 最近の変更の前にいた方法に戻る: 与えられたリクエストは複数あるかもしれませんorderBy・・・ () と/または異なる () フィルター;ERDDAP™指定した順序で処理します。 デビッド・カルーガのおかげさまで。
         
    * バグフィックス: dataset が EDDTableFromDatabase で、クエリーが[ソースCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)および/または[ソースCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)すると、データベースは (設定によってはdatasets.xml) 部分的にまたは完全にハンドル **初めての方へ**  orderBy.... () または明確 () お問い合わせ デビッド・カルーガ氏
         
    * バグフィックス: 最近の余分なパーセントエンコーディングは、いくつかのクエリで問題を引き起こしました.ncCFファイル、例えば「HTTPステータス」 500 - クエリエラー: 結果変数のリストで変数=station が 2 回リストされます。 Kevin O'Brien(ケビン・オビエン)
         
    * BUG FIX: EDDTableFromFiles は、列の 1 つが真の文字列だったときに、データセットを再読み込みするトラブルがありました。 Roland Schweitzerは、Roland Schweitzerのゲストの皆様にお礼申し上げます。
         
    * バグフィックス:EDDGridからNcFiles 未梱包も変換missing\\_value\\_FillValue は標準値なので、異なる値を持つファイルが集計できます。 この変更のため、この新しいバージョンをインストールした後ERDDAP™お問い合わせ[ハード ログイン](/docs/server-admin/additional-information#hard-flag)お問い合わせEDDGridからNcFiles 未梱包データセットERDDAPお問い合わせ
         
    * 改良: EDDTableFromNcCFFiles は複数のsample\\_dimension のファイルを扱うようになりました。 指定したデータセットは、sample\\_dimensions の1つを使用する変数のみを使用する必要があります。 Ajay Krishnan さん、ありがとうございました。
         
    * 改善:EDDTableFrom...Filesのために、&lt;sortFilesBySourceNames &gt; ソートファイル 今、コンマ区切りが可能 (おすすめ) または、変数のソース名のリストを区切るスペース。 いずれの場合も、名前に内部空間がある場合など、二重引用符で個別変数名を囲むことがあります。

## バージョン 1.72{#version-172} 
 (公開日 2016-05-12) 

*    **新しい特徴 (ユーザ向け) : : :** なし。
     
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * 新しいEDDTableFromMultidimNcFiles[EDDTableFromMultidimNcファイル](/docs/server-admin/datasets#eddtablefrommultidimncfiles)EDDTableFromNcFiles の新しい代替手段です。 共有寸法で複数の変数を持つファイルのグループを扱うように設計されています。例、var1\\[は、\\]\\[ツイート\\], var2\\[は、\\], var3\\[ツイート\\], スカラー Argo Project、Aurélie Briand、Roland Schweitzerのご協力を賜りますようお願い申し上げます。
    * バグフィックス:ERDDAP™  (FileVisitorDNLS および FileVistorSubdir クラス経由で) Linux 上でシンボリックなリンクを下します。ERDDAP™Windows で .lnk's に従わない。
    * 1.70で導入されたバグのバグ修正: 明確 +orderByリクエストに応じて一緒に許可されていない 今、彼らは再び. 彼らは相互に排他的/冗長ではありません。 デビッド・カルーガのおかげさまで。
    * 変更するdatasets.xmlIPアドレスのブラックリスト:
IP v4アドレスが表示されるERDDAP™4つの期間分けられた六角数として。
IP v6 アドレスは 8 個のコロン分離されたヘックス番号として表示されます。
お問い合わせERDDAP™リストの最後に、IP アドレス内のコロンと :\\* をサポートし、アドレスの範囲をブロックします。
    * 改善される:ERDDAP™今、NetcdfFileWriterを使用して書きます.nc非推奨のNetcdfFileWriteableの代わりにファイル。 結果のファイルへの変更は控えめにしないでください。 大きくなる可能性を広げる.nc使用するファイル.nc3 64ビットの拡張子。 ご希望・ご要望がございましたら、お気軽にお問い合わせ下さい。erd.data at noaa.govお問い合わせ
    * 改善: 遠隔ウェブサイトへのリンクの多くは最新だった。 今、彼らは最新であり、使用していますhttps:代わりにhttp: いつでも可能です。
    * 多くの小さな変化。

## バージョン 1.70{#version-170} 
 (公開日 2016-04-15) 

*    **新しい特徴 (ユーザ向け) : : :** なし。
     
*    **お知らせERDDAP™管理者は知っておく必要があります。** 以下に、setup.xml ファイルにドキュメントにいくつかの推奨変更があります。
変更点はこちら
今後30分も時間も節約できる。
    * バグ修正: 問題は、リモートにリダイレクトされたリクエストでしたERDDAP無効な文字で失敗 '|'エラーメッセージ。 最近のバージョンのTomcatでしか発生しません。 Rusty Holleman、Conor Delaney、Roy Mendelssohn のおかげです。
    * バグ修正:ERDDAP™netcdf-java の最新のバージョンを使用できるようになりました。 (それは長い物語です) NcML LogicalReduce が期待どおり動作しない問題を修正した最新の NcML のサポートが含まれています。 メタデータにはいくつかの小さな変更があるかもしれません。ERDDAP™netcdf-java から読み込む.nc,.hdf, .grib, .bufr ファイル. Favio Medranoのおかげで.
    * 新着情報[EDDTableアグレゲートロー](/docs/server-admin/datasets#eddtableaggregaterows)同じ単位を使用して同じデータ変数を持つ2つ以上のEDDTableデータセットからマージされたEDDTableデータセットを作ることができます。 Kevin O'Brien さん、ありがとうございました。
    * EDDTableFromDatabase の新しいオプション ([ソースCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)そして、[ソースCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) かどうかを指定するERDDAP™、データベース、または両方、明瞭で処理し、orderBy  (そしてすべての変形) 制約。 デビッド・カルーガ氏
    * 公開するデータセットのグラフとメタデータを新しい方法で公開できるようになりました。 [&lt;graphsAccessibleTo&gt;パブリック&lt;/graphsAccessibleTo&gt; 一覧 (/docs/server-admin/datasets#graphsaccessibleto) タグ。 Emanuele Lombardiのおかげで.
    * これで、 GenerateDataset に渡される文字列が Xml または DasDds は、二重引用符で囲まれています。 (JSON 文字列の場合) お問い合わせ John KerfootとMelanie Abecassisのおかげさまで。
    * 生成データセット Xml は "default" をサポートし、デフォルトと "nothing" を空の文字列を取得できるようになりました。 (彼らは引用符なしでまたは機能します) お問い合わせ これは空の文字列を渡すことに関連するいくつかの問題を解決します。
    * これで、GenerateDatasets で すべてのXml、EDDGridファイルとEDDTable FromFiles データセット、サンプルの場合 指定したファイル名は "" です。 (空の文字列) , ディレクトリ + regex + recursive=true から最後の一致 fileName を使用します。
    * 更新: displayInBrowser のコードは、GenerateDatasetsXml と DasDds の結果を Linux コンピューターに表示するために使用されますが、最新であり、Netscape に関するオッズメッセージを出力しました。 今、これは、xdg-open のモダンな Linux ツールを使用します。 Melanie Abecassisのおかげで。
    * ザ・オブ・ザ・allDatasetsデータセットは現在、"files"/filesリンクのベースURLを示すカラム (1つある場合) データセットの場合。
    * あなたの一般的なセキュリティを強化するERDDAP™tomcat ディレクトリと bigParentDirectory に関連付けられているパーミッションを変更することで:
         (以下のコマンドは、Linux 用のコマンドです。 他のOSの場合、アナログな変更を行います。) 
        * "group" を tomcat、ユーザー名、または tomcat を含む小さなグループの名前、Tomcat のすべての管理者に変更します。ERDDAP、例えば、
chgrp -R _yourUserName_ apache-tomcat-_8.0.23_
chgrp -R _your (日本語) ユーザ名 bigParentDirectory_
        * tomcat とグループが読み取り、書き込み、権限を実行できるように権限を変更します。
chmod -R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _bigParentDirectory_
        * "other" のユーザ権限を読み取り、書き込み、または実行します。
chmod -R o-rwx apache-tomcat-_8.0.23_
chmod -R o-rwx _bigParentDirectory_
これは重要なことです。他のユーザーが読み込むのを防ぐため、機密情報を読み込みます。ERDDAP™設定ファイル、ログファイル、およびプライベートデータセットに関する情報付きのファイル。
    * 認証/ログインシステムが変更されました。 Thomas Gardner、Emanuele Lombardi、米国政府の新人[HTTPS だけ標準](https://home.dotgov.gov/management/preloading/dotgovhttps/)お問い合わせ
        * 認証=openid オプションが削除されました。 最新だった。
        * 新しく、推薦される、[認証=Google](/docs/server-admin/additional-information#google)オプションの使用 Googleサインイン (OAuth 2.0 に基づく) Googleのメールアカウントをお持ちの方 (含まれるもの Googleはアカウントを管理@noaa.gov) ログイン
        * 新しい、[認証=メール](/docs/server-admin/additional-information#email)オプションは、認証=グーグルのバックアップです。 ユーザがユーザーを&lt;user&gt; タグdatasets.xml特別なリンクでメールを送ることでログインします。
        * setup.xml では、説明を変更してください。&lt;認証&gt;
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * setup.xml では、以下のようにしてください。&lt;認証&gt; ログイン
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * 今、ログインしていないユーザが使えるようになりましたhttpまたはhttpsURL(設定済みの場合)&lt;baseHttpsUrl&gt; を setup.xml にインストールします。 米国政府の新人に感謝[HTTPS だけ標準](https://https.cio.gov/)お問い合わせ
        * 今、あなたはすべてのユーザーが使用することを奨励することができますhttps  (コメントはありませんhttp) 設定で&lt;baseUrl&gt; になるhttpsサイトマップ ユーザーが利用するだけを強制するhttpsまた、Apache/Tomcat の設定を変更して、ブロックを解除する必要があります。httpsアクセス 米国政府の新人に感謝[HTTPS だけ標準](https://https.cio.gov/)お問い合わせ
            
setup.xml では、説明を変更してください。&lt;baseUrl&gt; になる
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * オプション&lt;パスワードエンコーディング&gt; 変更しました。 setup.xml では、説明を変更してください。&lt;パスワードエンコーディング&gt;
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * setup.xml では、説明を変更してください。&lt;baseHttpsUrl&gt; になる
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * これで、setup.xml で listPrivateDatasets=true をすると、ユーザがアクセスできないデータセットについてさらに情報が少なくなります。
    * 今、特に初期設定時にERDDAP、今言うことができますERDDAP™リモートへの購読を試みないERDDAP™データセット。 Filipe Rocha Freireのおかげで.
setup.xml では、直前に&lt;フォントファミリー&gt;、追加して下さい
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * setup.xml では、上記の手順で&lt;emailFromAddress&gt; を入力してください。
可能であれば、セキュアな接続を使用するように設定します。 (SSL/TLSの特長) メールサーバへ。
設定がメールサーバへのセキュアな接続でない場合、変更を行ってください。
    * お問い合わせdatasets.xmlの記述にこのラインを加えて下さい&lt;サブスクリプションメールブラックリスト&gt;datasets.xml: : :
名前 " を使うことができます\\*「ドメイン全体をブラックリストする」\\*@example.com からのツイート
    * v1.66 のロギングシステムの変更以来、ログファイルは最新ではありません。 ログファイルへの書き込みを待っているメッセージやメッセージの一部が常にあります。 今、あなたはそれを最新のものにすることができます (瞬時に) 閲覧することでERDDAP's ステータスウェブページ http://_your.domain.org_/erddap/status.html お問い合わせ
    * ハッシュダイジェスト .......
    * 小さな変化 (文字列2.canonical へ) 物事を迅速に動かすのに役立つERDDAP™非常に忙しく、また非常に多くのデータセットとよりよく対処します。
    * 強力に 推奨:使用停止&lt;変換ToPublicSourceUrl&gt; お問い合わせdatasets.xmlデータセットのIP番号を変換する&lt;sourceUrlツイート (例: http://192.168.#.#/ ) ドメイン名に (例:http:my.domain.org/) お問い合わせ ここから、新しいサブスクリプションへ http://localhost , http://127.0.0.1 と http://192.168.#.# セキュリティ上の理由でURLSは許可されません。 パブリックドメイン名を常に使用してください&lt;sourceUrl&gt;タグ (DNSの問題のために必要であれば) 、使用することができます[サーバ上の /etc/hosts テーブル](https://linux.die.net/man/5/hosts)DNS サーバーを使用せずに、ローカルドメイン名をIP番号に変換することで問題を解決します。 特定のドメイン名が正しく解決されればテストできます
ピン _some.domain.name_
    * リモート・データ・セットのためのgenerateDatasets.xml で、 (例:THREDDSサーバから) 、自動生成されるdatasetIDほとんどのドメインは変更されません。 いくつかのドメインの場合、最初の部分 (i.e. 名前) 自動的に生成されるdatasetID少し違う。 確かに、ある部分があった名前は2つの部分を持つ可能性が高い。 例えば、データセットから http://oos.soest.hawaii.edu 以前 led にdatasetIDs は hawaii\\_ から始まりましたが、datasetIDs は hawaii\\_soest\\_ から始まる。 問題が起きた場合は、メールをお送りください。 勤務時間がある場合があります。
    * Cassandraのドライバーは、Cassandra-driver-core-3.0.0.jar に更新され、Cassandra v3 で更新されました。EDDTableFromCassandra は Cassandra の新しい機能を利用しません v3。 Cassandra のインデックスは、より複雑になる可能性がありますが、ERDDAP™まだCassandra v2のインデックスモデルを使用します。これは、インデックスされたカラムが直接クエリできると仮定します。'='制約。 生成データセット EDDTableFromCassandra 用の Xml は、もはやインデックスでカラムを検出しません。インデックスが単純な場合は、それを指定する必要があります。datasets.xml手で。 より複雑なインデックスやその他の新機能のサポートが必要な場合は、Eメールでお問い合わせください。erd.data at noaa.govお問い合わせ
お問い合わせ Cassandra 2.xをまだ使用している場合は、引き続き使用してくださいERDDAP™あなたがCasandra 3.xを使用してアップグレードするまでv1.68。
    * Jars と Classpath -- 含まれているサードパーティの .jar ファイルのほとんどすべては、最新バージョンに更新されました。
        * /lib と classpath に slf4j.jar を追加しました。
        * ジェイド。 jarとtsik。 jar は /lib と classpath から削除されました。
        * コンパイルや実行時に見つからなかったクラスに関するエラーメッセージが表示された場合ERDDAP™またはそのツールの 1 つで、コマンドラインの classpath をコマンドラインの classpath と比較します。ERDDAPお問い合わせ[現在のクラスパス](/docs/contributing/programmer-guide#development-environment).jar がクラスパスから欠落しているかを把握します。

## バージョン 1.68{#version-168} 
 (公開日 2016-02-08) 

*    **新しい特徴 (ユーザ向け) : : :** なし。
     
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    *   [EDDGridファイル名またはグローバルメタデータによるFromFiles集計](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)お問い合わせ
すべてのバリエーションEDDGridFromFiles は、各ファイル名から派生した値や各ファイルにあるグローバル属性の値に基づいて、新しい左端の次元、通常は時間を追加することにより、ファイルのグループを集計できるようになりました。
    * 約束: 以前は、あなたが作成したいかもしれないことを提案しましたEDDGridFromErddap データセットdatasets.xmljplMU 参照・予約RSS当社のTデータセットERDDAPお問い合わせ データセットの新しいバージョンがあるので、データセットは廃止されました。 そのため、データセットがデータセットを持っている場合ERDDAP™この新しいデータセットを追加してください
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
古いjplMUを削除したい場合RSSユーザーのTデータセットERDDAP™  (それはあなたの選択です) 「true」から「false」にアクティブな設定を変更します。
    * バグ修正: setup.xml で指定した bigParentDirectory を確認してください。 末尾にスラッシュを入れなかったら&lt;bigParentDirectory&gt; 名前, その後ERDDAP™サブディレクトリを作成する代わりに、指定した名前に直接単語を追加することにより、いくつかのディレクトリを作成しました。 バージョン1.68以降、ERDDAP™ディレクトリ名の末尾に slash を追加します。 なので、最後にスラッシュを指定しなかった場合は、インストール時にERDDAP™v1.68 これらのディレクトリを移動して名前を変更する必要があります **アフター** 古いシャットダウンERDDAP™そして、 **前へ** 新規を立ち上げるERDDAPお問い合わせ たとえば、 /home/erddapBPD として bigParentDirectory を誤って指定した場合 (スラッシュなし) そして、ERDDAP™間違ったディレクトリを作成する
/ホーム/erddapBPDcache
/home/erddapBPDcopy/ホーム/erddapBPDcopy
/home/erddapBPDデータセット
/ホーム/erddapBPDflag
/home/erddapBPDlogs/ホーム/erddapBPDlogs
/ホーム/erddapBPDlucene
/home/erddapBPDsubscriptionsV1.txt という名前のファイル
その後、移動して名前を変更する必要があります
/home/erddapBPD/キャッシュ
/home/erddapBPD/copy/コピー
/home/erddapBPD/データセット
/home/erddapBPD/フラグ
/home/erddapBPD/ログ
/home/erddapBPD/ルーセン
/home/erddapBPD/サブスクリプションV1.txt
    * バグ修正: バグがあったEDDGridLonPM180 でERDDAP™子データセットが子のデータセットの場合に発生したv1.66EDDGridErddapから。
    * バグ修正: バグがあったEDDGridファイルとEDDTable ファイルからERDDAP™原因のv1.66&lt;updateEveryNMillis&gt; は、再起動後にデータセットが読み込まれた初めて無視されます。
    * バグ修正/新機能: 子供のデータセットが内部の場合EDDGridAggregate既存の次元,EDDGridコピー、EDDGridからEDDTable、EDDGridLonPM180のEDDGridSideBySide、EDDTableCopy、またはEDDTableFromEDDGridは...FromErddap データセットで、親データセットが現在アンダーリングに加入しているERDDAP™データセット。 根本的な場合ERDDAP™データセットは同じですERDDAP™サブスクリプションと検証は、直接行われます。サブスクリプションを検証するために要求するメールは取得できません。 それ以外の場合は、サブスクリプションシステムがあなたのERDDAP™オフ、セット&lt;reloadEveryNMinutes&gt; 親データセットを小さな番号に設定する (60?) 最新情報を受け取るように。
    * バグ修正/新機能: 子供のデータセットが内部の場合EDDGridAggregate既存の次元,EDDGridコピー、EDDGridからEDDTable、EDDGridLonPM180のEDDGridSideBySide、EDDTableCopy、またはEDDTableFromEDDGrid子のデータセットがスキップされるように、active="false" が使われています。

## バージョン 1.66{#version-166} 
 (公開日 2016-01-19) 

*    **新しい特徴 (ユーザ向け) : : :** 
    * グラフ (地図ではなく) axes に値が降下できるようになりました。 Make A Graph Web ページを使用するときにこれを取得するには、新しい Y 軸を変更します。 (デフォルト) 降下する。 または、グラフを要求するURLで、新しいオプション3rd 'を使用する|'パラメータ[と.x 範囲および/または及び。 yRange スイッチ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)何もできない (デフォルト) , true, または t で昇順値を取得するか、偽値または f を使用して降下値を取得します。 真実|虚偽値が不感の場合です。 Chris Fullilove、John Kerfoot、Luke Campbell、Cara Wilson のおかげで、Chris Fullilove、John Kerfoot、Luke Campbell、Cara Wilson のゲストの皆様にお礼申し上げます。
    * ユーザーは、&.bgColor=0x_ を追加することで、グラフの背景色を指定できるようになりました。 AARRGGBB_ グラフを要求する URL に切り替えます。 .bgColor の .bgColor を参照してください。[グリッドダップ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)そして、[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)ドキュメント。 John KerfootとLuke Campbellのおかげさまで。
    * 表形式のデータセットの場合、制約は min を参照できるようになりました。 (_someVariableName_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _) または最高 (_someVariableName_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _) お問い合わせ お問い合わせ[ツイート () そして最高 () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)お問い合わせ ジョン・カーフのおかげ
    * 表形式のデータセットの場合、使用する時間制約[最近の投稿](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)ミリ秒単位またはミリ秒単位を指定できるようになりました。
    * 表形式のデータセットのイメージをリクエストするとマップが作成されます (グラフではない) x と y 変数が縦度型と緯度型変数の場合 (互換ユニット) お問い合わせ 豊富なSignellのおかげで。
    * バグ修正: タイム軸ラベルとティックは、複数のグラフを同時に要求するときに時々奇妙な不規則性を持っていた (例:Webページ) お問い合わせ 問題は、SGTグラフィックスライブラリのバグでした。ERDDAP™使用方法 (変数は "static" で、) お問い合わせ ブラッドフォード・ブットマンのおかげ
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * setup.xml のようなプレーンテキストファイルにメール パスワードを置くのはセキュリティリスクです。 その問題を軽減するために、私たちはあなたを強くお勧めします。
        1. 専用のメールアカウントを設定するERDDAP's use、例えば erddap@yourInstitution.org 。 それは他の利点も持っています; 当然のことながら、1 つ以上ERDDAP™管理者は、そのメールアカウントにアクセスすることができます。
        2. setup.xml ファイル rw のパーミッションを作る (読み書き) Tomcat を実行し、ERDDAP™  (user=tomcat ?) 許可なし (読み書きしない) グループや他のユーザーの場合。 Filipe Rocha Freireのおかげで.
    * 新着情報[アーカイブAデータセット](/docs/server-admin/additional-information#archiveadataset)ツールは、作成を簡素化.tar.gzアーカイブはアーカイブに適した形式でデータセットのサブセットでアーカイブ (確かに、NOAANCEIの特長) お問い合わせ それは多くのために有用であるERDDAP™多くの状況の管理者が、特にグループのためにNOAAお問い合わせ
    * 新しいデータセットタイプ[EDDGridFromNcFiles解凍](/docs/server-admin/datasets#eddgridfromncfilesunpacked)バリアントとはEDDGridからNcFiles. 違いは、このクラスが各データファイルを前に解凍するということです。EDDGridFromFiles はファイルを見る:
        
        * 使う変数をアンパックscale\\_factorおよび/またはadd\\_offsetお問い合わせ
        * \\_Unsigned=true 属性を持つ整数変数をより大きい整数データ型にプロモートし、値が符号されていない値として表示されるようにします。 例えば \\_Unsigned=true バイト (8ビット) 変数は署名された不足分になります (16ビット) 変数。
        * \\_FillValue を変換し、missing\\_valueNaN の値 (or MAX\\_VALUE 整数データ型) お問い合わせ
        
このクラスの大きな利点は、さまざまな値に対処する方法を提供するということですscale\\_factor,add\\_offset, \\_FillValue, またはmissing\\_valueコレクション内の異なるファイル。 それ以外の場合は、このようなツールを使用する必要があります[ログイン](/docs/server-admin/datasets#ncml-files)または[NCO](/docs/server-admin/datasets#netcdf-operators-nco)ファイルが処理できるように、各ファイルを変更して差分を削除EDDGridからNcFiles. このクラスでは、関連する属性の CF 規格に従う必要があります。 Philippe Makowskiさん、ありがとうございました。
    * 新しいデータセットタイプ[EDDGridロンPM180](/docs/server-admin/datasets#eddgridlonpm180)180 を超える経度値を持つデータセットを変更できます。 (例:0～360の範囲) 範囲-180から180の範囲内の経度値を持つデータセットに (Longitude Plus または Minus 180 以降の名前) お問い合わせ 範囲 -180 から 180 までの経度値でデータセットを提供する大きな利点は、OGCサービス (例:WMS) この範囲の経度値を必要とします。 Lynne Tablewski、Fabien Guichard、Philippe Makowski、Martin Spelなど、幅広い分野で活躍しています。
2016年1月26日 更新: Eeek&#33; 子データセットがEDDGrid同じデータセットを参照する FromErddapERDDAPお問い合わせ このバグは修正されますERDDAP™v1.68.
    * インスタグラム[生成データセットXml](/docs/server-admin/datasets#generatedatasetsxml)、新しい特別なデータセットのタイプ、EDDGridLonPM180FromErddapCatalog で生成します。datasets.xmlお問い合わせEDDGridLonPM180 すべてのデータセットEDDGridデータセットERDDAP任意の経度値が180以上の値を持っている。
    * お問い合わせEDDGridデータセット、datasets.xmlオプションを使うことができます
ツイート&lt;アクセス ヴィクトリアWMS&gt;正しい|パスワード&lt;アクセス可能 ヴィクトリアWMS&gt;&gt; (/docs/server-admin/datasets#accessibleviawms)   (デフォルト=true) お問い合わせ これを false に設定することで強制的に無効化WMSこのデータセットのサービス もしtrueの場合、データセットはアクセスできません。WMSその他の理由 (例:lat または lon axes なし) お問い合わせ これは、自分の上に存在するデータセットのために特に有用であり、によって包まれるEDDGridLonPM180 なので、LonPM180 版のみがアクセス可能です。WMSお問い合わせ
    * setup.xml では、グラフの背景の異なるデフォルト色を指定できます。 色は、AA、RR、GG、BBが2桁の16桁の16桁の16桁の16桁の16進数値で、それぞれ2桁の16進数番号で指定されます。 キャンバスは常に不透明なので、 (セミ ・) 白いキャンバスに透明のグラフの背景色のブレンド。 デフォルトはライトブルーです。
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
John KerfootとLuke Campbellのおかげさまで。
    * setup.xml では、最大サイズを指定できるようになりました。[ログファイル](/docs/server-admin/additional-information#log)  (ログに名前を変更したとき。 テキスト 以前の新しいログ。 txt は作成されます) , メガバイトで. 許可される最低は1です。 上限は2000です。 デフォルトは 20 です (メガバイト) お問い合わせ 例えば:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * インスタグラムdatasets.xml, [ ]&lt;fgdcFile&gt; (/docs/server-admin/datasets#fgdcfile) または [&lt;iso19115ファイル&gt; (/docs/server-admin/datasets#iso19115file) ローカルファイルになる (前に) または URL (ローカルコピーがあるので、ダウンロードされます) お問い合わせ お問い合わせERDDAP™ファイルがダウンロードできません。データセットの読み込みは続行しますが、データセットは fgdc や iso19115 ファイルはありません。
    *   EDDGridファイルとEDDTable FromFiles データセットは、QuickRestart を実行できるようになりました。 (システムERDDAP™データセットが最初に読み込まれるときに使用するERDDAP™再起動) お問い合わせ 再起動を高速化ERDDAPお問い合わせ
2016年1月26日 更新: Eeek&#33; 原因となるバグがある&lt;updateEveryNMillis&gt; は、再起動後にデータセットが読み込まれる初めて無視されます。 このバグは修正されますERDDAP™v1.68.
    * QuickRestart システムへの一般的な改善が可能ERDDAP™データセットを高速に読み込むERDDAP™再起動します。
    * すべてEDDGridファイルとEDDTable FromFiles のサブクラスは新しいクラスを受け付けます&lt;pathRegex&gt; タグ、通常は以下に指定された&lt;再帰&gt;。 recursive が "true" の場合、pathRegex にマッチする全サブディレクトリパスのみ (デフォルト=".\\*") 受付けます。 同様に、&lt;sourceUrls&gt; タグEDDGridAggregateExistingDimension には pathRegex 属性を含めることができます。 (デフォルト=".\\*") お問い合わせ
    * デフォルトは&lt;setup.xml のpartialRequestMaxBytes&gt; は 490000000 になりました (～490MB) お問い合わせ これは、THREDDSのデータサーバからデータを取得することに関連した問題/タイムアウトを避けます。 Leslie Thorneは、Leslie Thorneでのお手頃な価格の宿泊施設をご提供いたします。
    * ログシステムへの小さな変更は許可する必要がありますERDDAP™それは非常に、非常に忙しく、より敏感であるために。 ディスクドライブのログファイルには、かなり大きなチャンクが書かれています。 利点は、これは非常に効率的なことです。ERDDAP™ログファイルに書き込まれる情報待ちをブロックしません。 欠点は、次のチャンクが書かれているまでログがほぼ常に部分的なメッセージで終わることです。
    * inotifyと[]に関連するバグ修正&lt;更新EveryNMillis&gt; (/docs/server-admin/データセット#updateeverynmillis) システムEDDGridファイルとEDDTable FromFiles データセット: fs.inotify.max\\_user\\_watches や fs.inotify.max\\_user\\_instances の大きい値を指定する必要はありません。 バグがあるJavaいくつかの部分を引き起こすJava's inotify/WatchDirectory システムは、最終決定時に収集されたゴミを収集しません。最終的には、ゾンビがウォッチやインスタンスを通知する回数は、指定された最大数を超えます。ERDDAP™今、この作品は、Javaバグ。
また、inotify スレッドの数は status.html の Web ページにリストされているため、使用状況を把握することができます。 典型的には、1つのinotifyの糸ごとのありますEDDGridファイルとEDDTable FromFiles データセット。
    * バグ修正: 多くの場所では、エラーが再スローされた代わりに、元のエラーメッセージの短いバージョンしか含まれていない新しいエラーが生成されました。 これで、新しいエラーが生成されると、元の例外全体が正しく含まれ、新しい例外をスローします。 (「一部新しいメッセージ」、e) ;;;
Susan Perkinsのおかげで.
    * バグ修正: 最近まで (v1.64?) , もし.../datasetIDリクエストされたURLERDDAP™.html を URL に追加します。 v1.64では、これは失敗しました (正しくフォーマットされた URL が生成され、失敗した) お問い合わせ 今、この作品は再び。 Chris Fulliloveのおかげで.

## バージョン 1.64{#version-164} 
 (公開日 2015-08-19) 

*    **新しい特徴 (ユーザ向け) : : :** 
    * パスワード保護されたプライベートにアクセスするためのガイダンスがありますERDDAP™データセット (https://) お問い合わせcurlそして、Pythonお問い合わせ 詳細はこちら[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)そして、[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)指示。
NANOOSとPaul JanecekのSpyglass TechnologiesのEmilio Mayorgaに感謝します。
         
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    *   ERDDAP™今すぐリクエストJava1.8+。
        Java1.7 到着[人生の終わり](https://www.oracle.com/technetwork/java/eol-135779.html)  (セキュリティのアップデートが不要) 2015年4月 このバージョンERDDAP™バージョンで動作しないJava以下 1.8. から更新する場合Java1.7x の (またはそれ以前) また、Tomcatを更新する必要があります。 詳細はこちら[ERDDAP™セットアップ手順](/docs/server-admin/deploy-install)リンクとアドバイスのダウンロード
    * 新規データプロバイダフォーム
データプロバイダがあなたにデータを追加しようとするとERDDAP™, データセットを追加するために必要なすべてのメタデータを収集するために困難で時間がかかる場合がありますERDDAPお問い合わせ 多くのデータソース (たとえば、.csv ファイル、 Excelファイル、データベース) 内部メタデータがないので、ERDDAP™データプロバイダからメタデータを収集し、データベース内のデータに関する広範なガイダンスを含む、データプロバイダに他のガイダンスを与える新しいデータプロバイダフォームがあります。 提出された情報は、送信された情報に変換されますdatasets.xmlフォーマットおよびそれから電子メールをERDDAP™管理者権限 (お問い合わせ) と書かれている (リクエスト) bigParentDirectory/logs/dataProviderForm.log へ。 したがって、フォームは半自動でデータセットを取得するプロセスを自動化しますERDDAP™, しかし、ERDDAP™管理者はまだ完了しなければならないdatasets.xmlchunk とデータファイルを取得する対処 (ツイート) プロバイダーから、またはデータベースに接続します。 詳しくは、[データプロバイダ フォームの説明](/docs/server-admin/datasets#data-provider-form)お問い合わせ
    * ニュース&lt;MatchAxisNDigits(アキシスニグジット)
で使用することができますEDDGridファイルから (したがって、NcFiles と fromMergeIRFiles から) ,EDDGridAggregate既存の次元,EDDGridコピー、およびEDDGridSideBySide データセットは、異なるファイルの軸線値が正確に等しい方法を指定する (数字の数) : 0=チェックなし (お問い合わせ) 、精密を増加するための1-18、または20 (デフォルト) 厳密な平等のため。 n=1-18 の場合、ERDDAP™二重値の最初のn桁が確保される (または (n+1の) div 2 フロート値) 等しいです。
        &lt;matchAxisNDigits&gt; 置換&lt;SecureAxisValuesAreEqual&gt; を廃止しました。 'true' の値は matchAxisNDigits=20 に変換されます。 'false' の値 (お問い合わせ) 一致するように変換されます AxisNDigits=0。
    *   EDDGridファイルとEDDTable FromFilesは、このバージョンを使用する初めて非常にゆっくりと読み込みますERDDAPお問い合わせ
        ERDDAP™現在、内部のファイル情報は少し異なっているので、これらのデータセットごとに内部ファイルテーブルを再構築する必要があります。 心配しないでください。 何も間違っていません。 1回です。
    * リモートソースファイル
        EDDGridFromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles では、ファイルがリモートファイルとしてアクセスできるディレクトリにhttp://  (おそらくhttps://と ftp:// が、それらはテストされていない) リモートサーバがサポートしている場合[範囲の要求](https://en.wikipedia.org/wiki/Byte_serving)ヘッダーリクエストで。 THREDDSとAmazon S3のサポート範囲のリクエスト、Hyraxありません。 このシステムは、ファイルをダウンロードせずにリモートファイル内のデータにアクセスすることができます (リモートファイルがあまりにもボリュームが多い場合、それは有用です) , しかし、これらのファイルへのアクセスは、ローカルファイルまたはリモートへのアクセスよりもはるかに遅くなりますOPeNDAPソース。
含まれるもの"files"Amazon S3 の Bucket では、http://お問い合わせ S3 オブジェクト名が filename のような場合 (Linux ディレクトリツリーのような内部 /'s を使って) ,ERDDAP™また、ファイルを経由してアクセスできるようにすることができますERDDAPお問い合わせ"files"システム。 そのためには、S3 の認証情報は ~/.aws/credentials でなければなりません。 (Linux、OS X、またはUnix) , または C:\\Users\\USERNAME\\.aws\\credentials (Windowsで) サーバ上でERDDAPお問い合わせ 詳細はこちら[Amazon SDKのドキュメント](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1)お問い合わせ
    * 生成データセット Xml には新しい珍しいオプションがあります: EDDsFromFiles.
これはファイルシステムを通過します (オブジェクトがファイルのような名前を持っている場合、Amazon S3のようなリモートシステムでも) そして作成して下さいdatasets.xml一連のデータセットのためのチャンク。 マイル数が異なります。 ファイルが整理されているので、指定したディレクトリ内のすべてのデータファイルが保存されます。 (サブディレクトリ) 1つのデータセットのために適しています (例えば、すべてのSST 1日コンポジット) お問い合わせ その他 (例えば、ディレクトリにSSTファイルといくつかのChlorophyll-aファイルが含まれる場合) この作品は不十分ですが、まだ役に立つかもしれません。
    * プログラマ:新しい/lib .jarファイル。
コンパイルする場合ERDDAP™は、クラスパス -cp パラメータにリストされている新しい .jar ファイルに注意して下さいERDDAP™ [プログラマガイド](/docs/contributing/programmer-guide)お問い合わせ
    * 海\\_water\\_practical\\_salinity
任意の変数にCF標準名 sea\\_water\\_salinity を使用する場合は、利用可能な海\\_water\\_practical\\_salinity に切り替えることをお勧めします。[CF標準名表の版29](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (以前のバージョンがいくつかあります。) お問い合わせ この名前は、これは確かに実用的Salinity値であることを意味しますPractical Salinity Units  (PSU) 古いg/kg値とは対照的に、 規範的な単位は異なりますが、まだ信じられないほど役立ちます: 1 (想定外注PSU/PSS-78の特長) 1e-3の反対として、 (推定的にg/kgを塗ること) 海用\\_water\\_salinity\\[こんにちは、UnidataそしてCF: スケールやバリエーションの名称である単位文字列で、FahrenheitやCelsiusなど、他のスケールを使用する値を特定します。 なぜ、PSS-78などのスケールで塩分単位を識別できませんか? 私は知っている:PSS-78値は「ユニットレス」ですが、暗黙のスケールはありませんか? PSS-78 値が 0.875 回ある新しい実用的な塩分スケールを発明したら、正式な単位は「1」であるべきですか。 ユーザーがそれらを区別する方法は? 1e-3と1のユニットは、数字が何を示しているかを把握しようとするユーザーには、記述的または有用ではありません。\\]

## バージョン1.62{#version-162} 
 (公開日 2015-06-08) 

*    **新しい特徴 (ユーザ向け) : : :** 
    * お問い合わせEDDGridデータセット、ユーザーはグラフタイプを作ることができます:数値軸の任意の組み合わせと表面グラフ、単なる経度対緯度。 これにより x の versus y を作ることができます。 (プロジェクト) グラフおよびさまざまな[Hovmöller図](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram)、例えば、縦度対深さ、または時間対深さをプロットする。\\[注意: 深さが Y 軸上にある場合は、おそらくあなたが望むものから反転されます。 申し訳ありません、このコンテンツはただ今 English のみです。\\]Cara Wilson と Lynn DeWitt のおかげです。
    * 新規登録[Oceanic/大気の頭字語のコンバーター](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)一般的な海洋/大気の頭字語をフルネームに変換できます。
    * 新規登録[海洋/大気 変数名 コンバーター](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)一般的な海域/大気変数名をフルネームに変換できます。
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    *   Java7月8日
        Oracleもはやサポートしません (セキュリティバグ修正を提供)  Java7。ERDDAP™サポートJava7、お越し下さい。Java8. 次のリリースERDDAP™おそらく要求しますJava8。
    *   valid\\_min/max/範囲
以前は、dataVariableお問い合わせscale\\_factorそして、add\\_offsetメタデータ,ERDDAP™データの値を解凍し、メタデータを削除します。 以前は、ERDDAP™変更/解凍を行わないvalid\\_range,valid\\_min,valid\\_maxメタデータ (通常/ステンレスは、パック値を含む) によってscale\\_factorそして、add\\_offsetお問い合わせ なるほど。 お問い合わせERDDAP™"valid\\_" で、変数の全てが、valid\\_range,valid\\_minまたはvalid\\_maxデータセットが新しいバージョンに表示されるときに正しい値を持つERDDAPお問い合わせ お問い合わせ[valid\\_range/min/max ドキュメント](/docs/server-admin/datasets#valid_range)お問い合わせ
    * ACDD-1.3の特長
以前は、ERDDAP™  (特に GenerateDatasets Xmlの) オリジナルを推薦する使用された/推薦される (1.0 の) バージョン[NetCDFデータセットのディスカバリーのための属性条約](https://wiki.esipfed.org/ArchivalCopyOfVersion1)と称されるUnidataグローバル・コンベンションとMetadata\\_Conventions属性。 お問い合わせ[ACDDバージョン 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)2015年初頭に批准され、「ACDD-1.3」と呼ばれます。 幸いに、ACDD-1.3はバージョン1.0と非常に後方互換性があります。 お問い合わせ[ACDD-1.3 への切り替え](/docs/server-admin/datasets#switch-to-acdd-13)お問い合わせ 難しいことではありません。
    * 生成データセット Xml属性
改善に多くの変化がありました&lt;addAttributes&gt; GenerateDatasets が提案する値 グローバル・コンベンションのXmlcreator\\_name/email/url、キーワード、要約、タイトル属性、変数long\\_name属性。 一部の変更は、ACDD-1.3 の新しい使用に関連しています。
    * EDDTableFromの特長SOSデータセット
新しいタイプの時折追加でSOSサーバと古いサーバーへの変更、それは難しくなっていますERDDAP™サーバの応答からサーバータイプを自動的に検出します。 [使用]&lt;sosServerType&gt; (/docs/server-admin/datasets#eddtablefromsos-skeleton-xml)   (IOOS\\_NDBC, IOOS\\_NOS, IOOS\\_NOS,OOSTethys, または WHOI) 今、強くお勧め. このタイプのデータセットが新しいバージョンに問題がある場合ERDDAP, GenerateDatasetを再実行しようとする Xml 用SOS新規チャンクを生成するサーバーdatasets.xmlそのデータセットのため。 生成データセット Xml は別のことを試みることを可能にします&lt;sosServerType&gt; オプションは、指定したサーバーの正しいものを見つけるまでです。 それでも問題が起きた場合は、サーバーのURLやURLをよくお知り下さい。
    * EDDTableFromFileNames データセット
推奨される属性addAttributes現在sourceAttributes です。 既存のデータセットのデータを変更する必要はありません。datasets.xmlお問い合わせ
    * EDDTableFromNcCFFiles データセットに関する特定のリクエストに関連するバグ修正。
また、既存の多数のユニットテストに、基礎的なメソッドのユニットテストを追加しました。 (100のシナリオがあります) お問い合わせ エリ・ハンターのおかげで。
    * バグ修正/小さな変更EDDGridFromMergeIRから。
Jonathan LafiteとPhilippe Makowskiに感謝
    * バグ修正:EDDGridFromErddap はリモートデータセットが持っていなくても動作しますioos\\_category変数属性。
Kevin O'Brien(ケビン・オビエン)
    * .graph Webページでバグ修正EDDGrid複数の値で1つの軸変数しか1つしかない場合のデータセット。
チャールズ・カルレトン(Charles Carleton)
    * 他にも小さな改良や変更、バグ修正がありました。

## バージョン 1.60{#version-160} 
 (公開日 2015-03-12) 

*    **新しい特徴 (ユーザ向け) : : :** なし
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * 連載:サーバーの更新[ロボット.txt](/docs/server-admin/additional-information#robotstxt)含めるファイル:
保存: /erddap/ファイル/
    * 問題および解決を通知して下さい:
Linuxコンピュータでは、使用している場合&lt;アップデートEveryNMillis&gt; type= を使用したデータセットEDDGridファイル、EDDTableFromFiles、EDDGridコピー、EDDTableCopy、またはそのサブクラスは、データセットがロードに失敗する問題を見ることができます。 (時折、または一貫して) エラーメッセージ: "IOException: インスタンスの inotify のユーザ制限が到達または複数のオープンファイルに達しました。" もしそうなら、この問題を呼び出して修正できます。 (ルートとして) : : :
echo fs.inotify.max\\_user\\_watches=65536|ティー -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instances=1024|ティー -a /etc/sysctl.conf
sysctl -pの特長
または、問題が主張している場合は、より高い数字を使用してください。 時計のデフォルトは8192です。 インスタンスのデフォルトは128です。\\[UPDATE: バグがあるJavaこれにより、不正なインスタンスが収集されないようにします。 この問題は避けられますERDDAP™v1.66以上 そのため、より良いソリューションは、最新バージョンに切り替えることですERDDAPお問い合わせ\\]
    * NoSuchFileExceptionの特長 バグ修正:
type= のデータセットを引き起こすバグがあったEDDGridファイル、EDDTableFromFiles、EDDGrid「NoSuchException: _someFileName_」というエラーで時々読み込まれないように、コピー、EDDTableCopy、またはそのサブクラスをコピーします。 バグはFileVisitorの使用に関連しており、ERDDAP™v1.56。 問題はまれであり、多くの場合、データファイルを変更するデータセットに影響を及ぼす可能性があります。
    * 小さな改良、変更、バグ修正がありました。

## バージョン1.58{#version-158} 
 (公開日 2015-02-25) 

*    **新しい特徴 (ユーザ向け) : : :** 
    * 新着情報["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)システムを使用すると、仮想ファイルシステムを参照し、ソースデータを多くのファイルからダウンロードできますERDDAP™データセット。 ザ・オブ・ザ・"files"デフォルトではシステムが有効であるが、ERDDAP™管理者は、置くことで無効にすることができます
```
        <filesActive>false</filesActive>  
```
お問い合わせERDDAP™setup.xml ファイル。 私はこのアイデアの美しさを感謝するために遅かったとき、主張したフィリップ・マコフスキに感謝の特別感謝.
    * 時間 目的地 マックス -- 以前は、EDDTable のデータセットの時刻変数がほぼリアルタイムのデータが、Nan の ObjectMax を持っていたため、データセットの最大時間値が最新であるが、正確に知られ、頻繁に変化するわけではありません。 今度は、estMax に現存する最後の時刻を示す実値があります。 多くのデータセットは継続的にデータを更新しています。ERDDAP™現行の最終時刻以降であっても、最新のデータへのアクセスをサポートします。 新しいことに注意する[&lt;更新EveryNMillis&gt; (/docs/server-admin/データセット#updateeverynmillis) サポートEDDGridファイルとEDDTable FromFiles のデータセットは、時刻変数の宛先 Max を更新します。 この変更のもう一つの結果は、datasetIDパスワードallDatasetsdataset には、maxTime 列の既定の最終時刻が含まれている。 ジョン・カーフのおかげ
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * 連載:サーバーの更新[ロボット.txt](/docs/server-admin/additional-information#robotstxt)含めるファイル:
保存: /ファイル/
保存: /erddap/ファイル/
    * サンプルdatasets.xmlお問い合わせ 昨年は、コーストウォッチでいくつかの優れたデータセットをお勧めしますERDDAP™あなたに追加できるERDDAP™数行を数行ずつ追加するだけでdatasets.xmlお問い合わせ erdVH データセットを追加した場合は、新しいerdVH2 データセットに切り替えてください。
        * すべての erdVH データセットのコピーを作成し、コピーを変更しますdatasetID's from erdVH... へ erdVH2... 参照を変更sourceUrlerdVH ... から erdVH2....
        * erdVH... データセットを Active="false" に設定します。
    * すべてEDDGridファイルとEDDTable FromFiles サブクラスがサポートできるようになりました [&lt;アクセス可能なViaFiles&gt; (/docs/server-admin/datasets#accessibleviaファイル) ソースデータファイルをアクセス可能にする"files"システム。 デフォルトでは、このシステムは各データセットに対してオフです。 有効にするタグを追加する必要があります。 Philippe Makowskiさん、ありがとうございました。
    * すべてEDDGridファイルとEDDTable FromFiles サブクラスがサポートできるようになりました [&lt;更新EveryNMillis&gt; (/docs/server-admin/データセット#updateeverynmillis) お問い合わせ デフォルトでは、このシステムは各データセットに対してオフです。 有効にするタグを追加する必要があります。 Dominic Fuller-Rowell と NGDC のおかげです。
    * 新着情報[EDDTableFromFileNames(ファイル名)](/docs/server-admin/datasets#eddtablefromfilenames)サーバのファイルシステム内のファイルのグループに関する情報からデータセットを作成しますが、ファイル内のデータを提供していません。 たとえば、画像ファイル、オーディオファイル、ビデオファイル、単語処理ファイル、スプレッドシートファイルを配布するのに便利です。 新品で手作業を手作業で仕上げる["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)ユーザーがファイルをダウンロードできるように、システム。 私はこのアイデアの美しさを感謝するために遅かったとき、主張したフィリップ・マコフスキに感謝の特別感謝.
    * 新着情報[EDDGridからEDDTable](/docs/server-admin/datasets#eddgridfromeddtable)表形式のデータセットをグリッドデータセットに変換できます。 オーシャン・ネットワークス・カナダ 様
    * 新着情報[EDDGridFromMergeIRFilesから](/docs/server-admin/datasets#eddgridfrommergeirfiles)ローカルMergeIRのグループからデータを集計.gzファイル。EDDGridFromMergeIRFilesは、コードの最初のチャンクであることの区別を持っています。ERDDAPお問い合わせ 助けを借りずに完了しました。 R.Tech EngineeringのJonathan LafiteとPhilippe Makowskiの3つの応援と特別感謝
    * 新しく、オプションの setup.xml タグがあります。&lt;unitTestDataDir&gt; は、新しい GitHub リポジトリで利用可能なユニットテストデータファイルでディレクトリを指定します。[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest)お問い合わせ 例えば:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
それでも役に立ちませんが、他の人々によって実行可能なユニットテストの多くを作るための動きの一部です。 テリー・ランカインに感謝します。
    * 小さな改良や変更、バグ修正が多かった。

## バージョン1.56{#version-156} 
 (公開日 2014-12-16) 

*    **新しい特徴 (ユーザ向け) : : :**   (なし) 
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * あなたはおそらくすでに知っている[EDDGridErddapから](/docs/server-admin/datasets#eddfromerddap)そして、[EDDTableFromErddapの特長](/docs/server-admin/datasets#eddfromerddap)他のデータセットにリンクできるERDDAPs とそれらがあなたの中に現れているERDDAPお問い合わせ これらのデータセットからの実際のデータに対するユーザー要求は、ソースに不可視にルーティングされますERDDAP™そのため、データはシステムを通して流れたり、帯域幅を使うことはありません。 サンプルに推奨データセットの大きなリストがありますdatasets.xmlで erddapContent.zipお問い合わせ それらをあなたの中に含めるERDDAP™, あなたがしなければならないのは、コピーして、あなたが望むものを貼り付けるだけですdatasets.xmlお問い合わせ Conor Delaneyのご協力に感謝します。
    * コンパイルする場合ERDDAP™新しく追加する必要があります。 jar ファイルから[classpath -cp スイッチ](/docs/contributing/programmer-guide#development-environment)javac と java の場合
    * 新着情報[EDDTableFromCassandraさん](/docs/server-admin/datasets#eddtablefromcassandra)からデータを取得するハンドル[カサンドラ](https://cassandra.apache.org/)お問い合わせ オーシャン・ネットワークス・カナダ 様
    * 新着情報[EDDTableFromColumnarAsciiFilesから](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)固定幅の列で ASCII のデータファイルからデータを取得できます。 Philippe Makowskiさん、ありがとうございました。
    * すべてEDDGridファイルとEDDTable FromFiles サブクラスは、新しいメソッド、FileVisitor を使用します。 (追加するJavaで 1.7) ファイルの情報を収集します。 これは、与えられたデータセットのためのファイル情報の最初の収集のための恩恵がないかもしれませんが、OSがまだ情報をキャッシュしている間、すぐに行われた場合は、その後の収集のための大きな利益を持っているようです。 NGDC のおかげで。
        
私達はまだ推薦します: データセットに多数のファイルがある場合 (例:1,000) 、オペレーティング システム (こうしてEDDGridファイルとEDDTableFromFiles) サブディレクトリの一連のファイルを保存すると、より効率的に動作します (1 年 1 回、または 1 ヶ月あたりのデータセットに非常に頻繁なファイル) , 与えられたディレクトリに膨大な数のファイルが存在しないので.
        
    * EDDTableFromAsciiFiles へのいくつかの小さな改良。
    * EDDTableFromAsciiServiceNOS へのいくつかの改善は、ソースから情報の追加の列を取得することではありません。 Lynn DeWitt のおかげです。
    * ISO 19115に関連したいくつかの小さなバグ修正ERDDAP™生成します。 アンナ ミラノ 感謝

## バージョン1.54{#version-154} 
 (公開日 2014-10-24) 

*    **新しい特徴 (ユーザ向け) : : :** 
    * いくつかの変数は、ミリ秒精度で時間とともに動作します, 例えば, 2014-10-24T16:41:22.485Z. Dominic Fuller-Rowell のおかげで.
*    **小さな変更/バグ修正:** 
    * バグ修正:状況の特定の組み合わせで、EDDGridFromNcFile のデータセットは、データの返りを削減 (例:ダブルではなくフロート) お問い合わせ これは、データ値にのみ影響することができます。 &gt; 8 重要な数字. 私の謝罪。 (そして、それは古典的なコンピュータプログラミングのバグでした: 1つの間違った文字。) Dominic Fuller-Rowell のおかげで.
    * 多くの小さな変化。
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * Griddapデータセットは、タイムスタンプの軸変数とデータ変数をサポート (i.e.、時間値の変数、destinationNameその他"time") お問い合わせ Dominic Fuller-Rowell のおかげで.
    *   ERDDAP™Milliseconds を正しくサポートtime\\_precision「1970-01-01T00:00:00.000Z」発売 1つの意図的な質問:人間指向ファイルへの時間を書くとき (例:.csv,.tsv,.json,.xhtml) ,ERDDAP™指定された使用time\\_precision秒と/または小数秒を含む場合。 それ以外の場合は、秒を使用するtime\\_precision「1970-01-01T00:00:00Z」発売 (一貫性と後方互換性のため) お問い合わせ Dominic Fuller-Rowell のおかげで.
    *   EDDGridFromNcFiles では、読み取り文字列をサポートdataVariableお問い合わせ
    *   .ncGriddap によって書かれたファイルは現在 String を持つことができますdataVariableお問い合わせ
    * 生成データセット Xmlは現在、より多くのフラッシュが含まれています () ファイルに書かれていない情報の問題を避けるために呼び出します。 Thierry Valeroのおかげで.
    * GenerateDatasetsXml のドキュメンテーションが改善され、コマンドラインですべての回答を指定すると、-i スイッチが動作するという点は注目できません。 (例:スクリプトモード) お問い合わせ スクリプトモードは説明しています。 Thierry Valeroのおかげで.
    *   ERDDAP™データセットで2つの変数が同じであるようにするsourceNameお問い合わせ (誰かがそれを前にしたならば、おそらくエラーメッセージにつながります。) お問い合わせERDDAP™データセットに2つの変数が同じであることを許可しないdestinationNameお問い合わせ

## バージョン1.52{#version-152} 
 (公開日 2014-10-03) 

*    **新しい特徴:**   (なし) 
*    **小さな変更/バグ修正:** 
    * その他 (小さい) 変更するERDDAP™より速く。
    * 生成されるISO 19115ファイルの改善ERDDAP: 新しくおすすめ&lt;gmd:protocol&gt;値 (情報、検索、OPeNDAP: : :OPeNDAP,ERDDAP:griddap、およびERDDAP: : :tabledap) 内径&lt;gmd:CI\\_OnlineResource&gt;。 Derrick Snowden と John Maurer のおかげ
    * 多くの小さな変化。
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * バグ修正: GenerateDatasetsXml.sh と DasDds.sh は erddap.war では 1.48 と 1.50 ではなかった。 今、彼らはいます。 Thierry Valeroのおかげで.
    * TestAll のスピードテストへの小さな変更により、可能性が低いことが可能になります。 テリー・ランカインに感謝します。

## バージョン1.50{#version-150} 
 (公開日 2014-09-06) 

*    **新しい特徴:**   (なし) 
*    **小さな変更/バグ修正:** 
    * お問い合わせERDDAP™最近のバージョンよりもはるかに高速でなければなりません。
*    **お知らせERDDAP™管理者は知っておく必要があります。**   (何もない) 

## バージョン 1.48{#version-148} 
 (公開日 2014-09-04) 

*    **新しい特徴:** 
    *   ERDDAP™常に表形式のデータセットを作成します。datasetIDパスワードallDatasets, これは、この中のすべてのデータセットに関する情報の表を持っていますERDDAPお問い合わせ 他の表形式のデータセットのようにクエリできます。 これは、プログラム的にデータセットに関する情報を得るために、現在のシステムに便利な代替手段です。
    * EDDTable には 2 つの新しい出力ファイルタイプがあり、EDDGrid, .csv0 と.tsv0。 それらはコンマであり、列名や単位で行っていないタブ区切り値ファイルです。 データは最初の行で始まります。 彼らは、単に1つの情報から情報を望むスクリプトのために特に便利ですERDDAPお問い合わせ
*    **小さな変更/バグ修正:** 
    * 地図は-720から720の範囲の経度に作ることができます。
    * 新着情報.ncml 応答 ファイルタイプはすべて使用可能EDDGridデータセット。 を返します。[NCMLシリーズ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)データセットの\\-formatted説明 (.dds + .das を組み合わせて) お問い合わせ
    * バグ修正: 表データを保存する.ncfile は変数ごとの 100,000 値に限られました。 2 GBの合計ファイルサイズに制限されます。 Kevin O'Brien(ケビン・オビエン)
    * バグ修正: saveAsMatlabメソッドは、datasetIDs は安全に変換されますMatlab変数名。 しかし、私はまだあなたが作成することを強くお勧めしますdatasetID有効な変数名であるs: 文字から始めて、A-Z、a-z、0-9、\\_ を使ってください。 お問い合わせ[datasetID](/docs/server-admin/datasets#datasetid)お問い合わせ Luke Campbellのおかげです。
    * EDDTableFromDatabase のバグ修正: データベースの種類によっては、NO\\_ データベースからのデータ応答は、無点30秒の遅延につながりますERDDAPお問い合わせ グレッグ・ウィリアムズに感謝します。
    * バグ修正:EDDGridグラフタイプ = 線でグラフを作る (またはマーカーまたはマーカーとライン) 強制的な x 軸変数は時間である。 どんな軸でも構いません。 Lynn DeWitt のおかげです。
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * 連載:更新Java  
このバージョンERDDAP™お問い合わせJava7 以上のものJava7は2015年4月に終末期を迎えます (お問い合わせ) 、従って今に転換するよい時間ですJava8. だからJava8 は強くお勧めします。. 私はテストしますJava8. ご注意Java2013年2月6日(水)に終了 (これ以上のセキュリティバグ修正はありません&#33;) お問い合わせ
    * STRONGLY Recommended: アップデート トムキャット
Tomcatをご利用の場合は、Tomcatの最新バージョンに切り替えてください。 Tomcat 8が機能するように設計されているJava8。
    * ツイートERDDAP" もはや頭字語ではありません。 ちょうど名前です。 名前を強調表示させたくありませんERDお問い合わせ お問い合わせERDDAP™貴社の機関とお客様のデータを強調する。
    * お問い合わせ[あなたの出現をカスタマイズして下さいERDDAP™貴社の機関とお客様のデータを強調するためのインストール](/docs/server-admin/deploy-install#customize)お問い合わせ 1時間の仕事で、永遠に続く素敵な改善ができます。
    * setup.xml では、&lt;displayDiagnosticInfo&gt; オプションは、値が false だったかのように常に無視され処理されます。
推奨:削除&lt;displayDiagnosticInfo&gt; タグと関連する情報 from your setup.xml.
    * setup.xml では、デフォルトは&lt;drawLandMask&gt; は "over" でしたが、今は "under" で、より優れた一般的なデフォルトです。 (すべてのデータセットでうまく機能) お問い合わせ
    * GenerateDatasetsXml.sh と DadDds.sh Linux スクリプトは、csh ではなく bash を使用し、拡張子 .sh を持っています。 Emilio Mayorga 感謝
    * 生成データセット Xml と DasDds が独自のログファイルを作成するようになりました (GenerateDatasetsXml.log と DasDds.log) ファイル出力 (GenerateDatasetsXml.out と DadDds.out) _bigParentDirectory_/logs/ で、クリップボードに結果を置きません。
    * 生成データセット Xml は、指定した場所に出力を指定したファイルに差し込む -i コマンドラインパラメーターをサポートしています。 詳細はこちら[ドキュメント](/docs/server-admin/datasets#generatedatasetsxml)お問い合わせ テリー・ランカインに感謝します。
    * EDDTableFromDatabase がサポート&lt;columnNameクォート&gt;&lt;/columnNameQuotes&gt;, 有効な値 " (デフォルト) , ', または何も. このキャラクター (お問い合わせ) SQL クエリのカラム名の前後に使用されます。 異なる種類のデータベース, 異なる方法で設定, 異なる列の名前の引用符が必要になります.
    * 表の緯度および経度変数は今カスタマイズすることができますlong\\_name's、例えば、プロフィールの緯度。 以前は、緯度と経度だけであった。
    * ここから、dataset のグローバルメタデータ (i.e. など) の属性として "defaultDataQuery" と "defaultGraphQuery" を指定します。&lt;addAtts&gt;) は分離しない&lt;defaultDataQuery&gt; および&lt;defaultGraphQuery&gt; タグ。 (ただし、タグを経由して指定しても構いません。ERDDAP™情報でグローバル属性を自動的に作成します。) 

## バージョン 1.46{#version-146} 
 (公開日 2013-07-09) 

*    **新しい特徴:** 
    *    (なし) 
*    **小さな変更/バグ修正:** 
    * バグ修正: EDDTableFromDatabase では、バージョン 1.44 のみで、ERDDAP™SQL ステートメントのデータベースの表名を不適切に引用しました。 修正しました。 Kevin O'Brien(ケビン・オビエン)
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    *    ** message.xml で標準メッセージを変更しない場合は、
削除\\[トームキャット\\]/content/erddap/messages.xml ディレクティブ **   
デフォルトメッセージ.xml ファイルが erddap にインストールされます。 戦争ファイル、erddapContent ではなく.zipお問い合わせ そのため、手動でメッセージ.xml を更新する必要はありません。
    * message.xml でメッセージを変更する場合、ここから更新するたびにERDDAP™, いずれか:
        * 以前作った変更を新しいものにする
            \\[トームキャット\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
そして、今度は: 削除\\[トームキャット\\]/content/erddap/messages.xml ディレクティブ
        * または、新しいメッセージ.xml で変更されたものを把握する (差分による) 、および変更
            \\[トームキャット\\]/content/erddap/messages.xml のファイルです。

## バージョン 1.44{#version-144} 
 (公開日 2013-05-30) 

*    **新しい特徴:** 
    * EDDTable データセットへの Queries がサポート &orderByツイート (・・・) と&&orderByMinMax (・・・)   (各グループで2列を返し、最後に最小限と最大orderByバリュー) お問い合わせ Lynn DeWitt のおかげです。
    * 2つの新しいtabledapファイルの種類:.ncCFヘッダーと.ncCFMAヘッダー (対応するの ncdump のようなヘッダーを返す.ncCFおよびCF.ncCFMAファイルタイプ) お問い合わせ スティーブ・ハンキンに感謝します。
*    **小さな変更/バグ修正:** 
    * バグ修正: .graph と .html の Web ページを読み込み、多くの時間値を持つデータセットが遅いためERDDAP™タイムスライダオプションを生成すると遅い。 今、それは常に高速です。 マイケル・バリー、OOICI、クリスティアン・セバスティアン・ブラードに感謝します。
    * バグ修正: 一部のEDDTableデータセットタイプでは、常に時間制約が正しく処理されていない。 今、彼らはいます。 John MaurerとKevin O'Brienのおかげで、John Maurerのゲストをお迎えします。
    * バグ修正: データセットは、すべてのデータがロードされないsubsetVariables固定値変数でした。 なるほど。 リン・デウィットとジョン・ペテロソンのご協力に感謝します。
    * IMPROVED: 今、サブセット変数のすべてのクエリは、&distinct のように機能します () クエリの部分です。
    * 即興:今、&.jsonp=_functionName_, _function 名前_ 1つ以上のシリーズになる必要があります (期間分け) キーワード それぞれの単語は、ISO 8859 文字または "\\_" で始まり、0 文字以上の ISO 8859 文字、数字、または "\\_" で始まる必要があります。 はい、これはより制限的ですJavaスクリプトの機能名の要件。
    * グラフ上の時間軸は、もはや時間範囲のためにうまく機能します (80 - 10000 年) より短い時間範囲 (0.003 - 180秒) お問い合わせ
    *   ERDDAP™ISO-8601-format 時間のデータのバリエーションを解析する際には、今はもっと許されます。
    * 他にも小さな変更やバグ修正などがありました。
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    *    **最新バージョンにアップデートして、セキュアにしてください。**   
        ERDDAP™セキュリティ監査を実施 バグや弱点がありました。 バージョン1.44には、セキュリティとアクセシビリティを高めるために、いくつかの重要なセキュリティバグ修正といくつかの変更が含まれています (例:視覚障がい者向け) お問い合わせ バージョン1.44は、フォローアップセキュリティ監査を通過しました。 USGSとAcunetixの皆さんのおかげで、これを実現しました。 (ないNOAAお問い合わせ) 
    * 新着情報[EDDTableFromの特長WFSファイル](/docs/server-admin/datasets#eddtablefromwfsfiles)すべてのデータをローカルにコピーするArcGIS地図サーバWFSサーバとデータがすぐに保存できるようにERDDAP™ユーザー。 Christy Caudillのおかげで.
    * 新着情報[EDDTableFromの特長EDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)EDDTable データセットを EDDTable から作成できます。EDDGridデータセット。 これを行うためのいくつかの一般的な理由は次のとおりです。
        * これにより、データセットは、OPeNDAP選択制約 (ユーザーが要求する可能性があるもの) お問い合わせ
        * データセットは、現在タブラデータセットです。 OOICI, Jim Potemra, Roy Mendelssohn のおかげです。
    * 変数名 "depth" は "altitude" の特別な代替品です。 単位は「メートル」のいくつかの変形でなければなりません。 データの値は、正の値=ダウンでなければなりません。ERDDAP™「深さ」の意味を十分に認識し、高度がサポートされるところをサポート (例: CF DSG cdm\\_data\\_type=profile データセットのコンポーネントとして) お問い合わせ データセットには「深さ」と「高度」の両方の変数が存在しません。
    * お問い合わせdatasets.xml、使用を取除いて下さい&lt;@cdm\\_altitude\\_proxy からのツイート&lt;/att&gt; 深さは高度に特別な代わりであり、特に特定する必要はありません。
    * お問い合わせdatasets.xml、使用を取除いて下さい&lt;高度MetersPerSourceUnit&gt;、EDDTableを除く 詳しくはこちらSOSお問い合わせ
値が1の場合、削除します。
値が-1の場合、変数名を深さに変更することを検討してください。
その他の値については、&lt;addAttributes&gt;、例えば:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * すべてのデータセットがサポートできるようになりました
        
        *   &lt;.html がクエリなしで要求された場合に使われる defaultDataQuery&gt; 。
            * これを使う必要はほとんどありません。
            * Griddapデータセットの場合、この一般的な使用は、異なるデフォルト深さまたは高度次元値を指定することです。 (例:\\[0 の 0\\]代わりに\\[最後の投稿\\]) お問い合わせ
いずれの場合も、常に全ての変数を一覧表示し、常に全ての変数の同じ次元値を使用し、ほとんど常に使用する必要があります。\\[0 の 0\\],\\[最後の投稿\\]または\\[0:最後\\]寸法値のため。
例えば:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * お問い合わせtabledapデータセットは、この最も一般的な使用は、異なるデフォルト時間範囲を指定することです。 (現在、例えば、&time&gt;=now-1泊1日) お問い合わせ
データ変数を要求しないということは、すべてのデータ変数を指定すると同じなので、通常は新しい時間制約を指定できます。
例えば:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;.graph がクエリなしで要求された場合に使われる defaultGraphQuery&gt; 。
            * これを使う必要はほとんどありません。
            * Griddapデータセットの場合、この最も一般的な使用は、異なるデフォルト深さまたは高度次元値を指定することです。 (例:\\[0 の 0\\]代わりに\\[最後の投稿\\]) 特定の変数がグラフ化されるかどうかを指定します。
いずれの場合も、ほとんどいつも使う\\[0 の 0\\],\\[最後の投稿\\]または\\[0:最後\\]寸法値のため。
例えば:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * お問い合わせtabledapデータセットは、この最も一般的な用途は、異なる変数をグラフ化し、異なるデフォルト時間範囲を指定することです。 (現在、例えば、&time&gt;=now-1泊1日) および/または異なるデフォルトグラフィック設定 (例:マーカータイプ) お問い合わせ
例えば:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

XMLエンコードまたはパーセントエンコードが必要であることを忘れないでください (どちらか一方、両方ではなく) デフォルトのクエリは、XML ドキュメントにあるためです。 例えば、& は &amp;amp; になります。&lt;&amp;lt;、および&gt;は&amp;gt;になります。
お仕事内容をご確認ください。 間違いを犯しやすく、欲しいものを手に入れるのは簡単です。
チャールズ・カルレトン、ケビン・オビエン、ルーク・キャンベル、その他
    *   EDDGridFromDapから、EDDGridFromErddapとEDDTableFromからEDDGrid頻繁に変更するデータセットに対処する新しいシステムがあります (ほぼすべての 0.5 秒) お問い合わせ いいね&#33;ERDDAP'各データセットを完全にリロードするための定期的な、プロアクティブなシステム、このオプションの追加システムが再アクティブです (ユーザーリクエストによってトリガーされる) そして増分 (更新が必要な情報を更新するだけ) お問い合わせ 例えば、リクエストをリクエストする場合EDDGridFromDap のデータセットは、最後の更新以来、ミリ秒数の指定された数よりも発生します。ERDDAP™一番左に新しい値があるかどうかが表示されます。 (よくある質問"time") 寸法と、もしそうなら、ユーザのリクエストを処理する前に新しい値をダウンロードしてください。 このシステムは、データソースの最小限の要求で急速に変化するデータセットを最新の状態に保つことで非常に優れていますが、一部のユーザー要求の処理を少し遅くするコストで。 詳しくはこちら&lt;更新EveryNMillis&gt; (/docs/server-admin/データセット#updateeverynmillis)   
マイケル・バリー氏、OOICI様より
    *   EDDGridFromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles がサポート[ログイン.ncミリリットル](/docs/server-admin/datasets#ncml-files)ソースファイルの場所.ncファイル。 Jose B Rodriguez Ruedaのゲストは、Jose B Rodriguez Ruedaのゲストをお待ちしています。
    * お問い合わせEDDGridAggregate既存の次元,ERDDAP™serverType 属性の serverType 属性の new serverType="dodsindex" オプションをサポート&lt;sourceUrls&gt; タグ これは、内部のファイルのリストを持っているWebページで動作します&lt;前へ&gt;&lt;/pre&gt; と多くの場合、OPeNDAPロゴ。 例は[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)お問い合わせ
    * EDDTableFromの場合SOSオプションタグをサポート
```  
        <sosServerType>_serverType_</sosServerType>  
```
なので、タイプを指定できます。SOSサーバー (お問い合わせERDDAP™それを把握する必要はありません) お問い合わせ 有効な値&lt;_serverType_\\&gt; IOOS\\_NDBC、IOOS\\_NOS、OOSTethys, と WHOI (新しくサポートされたサーバー タイプ:) お問い合わせ お問い合わせ[EDDTableFromの特長SOS](/docs/server-admin/datasets#eddtablefromsos)お問い合わせ Derrick Snowden と Janet Fredericks のおかげさまで。
    * すべてEDDGridから...ファイル、EDDTableFrom...ファイル、EDDGridコピー、EDDTable 今すぐコピーして、オプションのタグをサポート
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
伝えることができるERDDAP™ファイルを保存する テーブル (各ソースデータファイルに関する情報とともに) ディスクの代わりにメモリ (デフォルト) お問い合わせ fileTable をメモリに保存することで、データのリクエストを高速化 (特に&gt;1000ソースデータファイルがある場合) 、しかしより多くの記憶を使用します。 任意のデータセットでこれを設定した場合、メモリに目を向けてください。現在、_yourDomain_ で行を使用します。/erddap/status.htmlそれを確実にするためにERDDAP™まだまだたくさんの記憶があります。 Fredrik Stray のおかげで.
    * EDDTableFromASCIIFilesがサポート&lt;charset&gt;. 2つの最も一般的な文字セット (ケース感度&#33;) ISO-8859-1の特長 (デフォルト) そしてUTF-8。
    * 推奨: setup.xml で、&lt;startHeadHtml&gt; 変更して下さい&lt;html&gt; お問い合わせ
        &lt;html lang="en-US"&gt; (または別の[言語コード](https://www.w3schools.com/tags/ref_language_codes.asp)翻訳済みメッセージがあれば.xml) お問い合わせ
    * setup.xml には新しいオプションのタグがあり、コンポーネントの無効化ERDDAP: : :
        *   &lt;コンバーターActive&gt;false&lt;/コンバーターアクティブ&gt;&lt;&#33;-- デフォルトは true --&gt;
        *   &lt;SlideSorterActive&gt;偽&lt;/slideSorterActive&gt;&lt;&#33;-- デフォルトは true --&gt;
        *   &lt;wmsActive&gt;false の&lt;/wmsActive&gt;&lt;&#33;-- デフォルトは true --&gt;In です。これらを false に設定することを推奨します。
    * 生成データセット Xml は、log.txt ではなく、_bigParentDirectory_/logs/generateDatasetsXmlLog.txt に結果を書きます。 クリスティアン・セバスティアン・ブラードに感謝します。
    * 生成データセット Xml は今よい提案をのための作ります&lt;リロード 毎分&gt; ありがとうございます。NOAAUAFプロジェクト
    * GenerateDatasetsXml への多くの小さな改良。 ありがとうございます。NOAAUAFプロジェクト

## バージョン 1.42{#version-142} 
 (公開日 2012-11-26) 

*    **新しい特徴:** 
    *    (主な新機能はありません。) 
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * からアップグレードする場合ERDDAP™1.38 または 1.40 は、設定ファイルの変更を要求する変更がなかった (しかし、新しいMessage.xmlファイルを使用する必要があります。) お問い合わせ
    *   ERDDAP™再び実行できるJava1.6インチ (ERDDAP™v1.40 必須Java1.7. .) 最新版の最新版のご利用を強くお勧めしております。Java1.7. .
    * 新しいデータセットタイプ[EDDTableFromの特長 AwsXmlファイル](/docs/server-admin/datasets#eddtablefromawsxmlfiles)、自動気象ステーションのセットからデータを読むことができます (ツイート) XMLデータファイル。 Lynn DewittとExploratoriumのおかげです。
*    **小さな変更/バグ修正:** 
    * NDBCへの変更調整SOSソースデータサーバ。
    * NOS COOPS ASCII サービスの変更を調整しました。
    * いくつかの小さな変更とバグ修正を行いました。

## バージョン 1.40{#version-140} 
 (公開日 2012-10-25) 

*    **新しい特徴:** 
    * 新しい出力ファイル形式がありますtabledapデータセット:.nc要求されたデータを CFMA に保存します。.ncCFに準拠したファイル[分離されたサンプリングの幾何学](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)多次元配列オプションは、NODC テンプレートにしたがって適合します。\\[2021: 今、[NCEIテンプレート](https://www.ncei.noaa.gov/netcdf-templates)\\]このタイプのデータを格納する。 NODC のおかげで。
    *   tabledapリクエストには、&time などの時間制約を含むことができます。now-5日間 詳細はこちら[ドキュメント](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)お問い合わせ ジェームス・ゴスリングに感謝します。
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * からアップグレードする場合ERDDAP™1.38, 設定ファイルに変更を加える必要がある変更はありません (しかし、新しいMessage.xmlファイルを使用する必要があります。) お問い合わせ
    *   ERDDAP™パブリックリリースと内部のマイルストーンは、[ERDDAP™GitHubで](https://github.com/ERDDAP)お問い合わせ 詳しくは、[メニュー](https://github.com/ERDDAP/erddap/wiki)お問い合わせERDDAP™プロジェクトだけでなく、より一般的な[ERDDAP™プログラマガイド](/docs/contributing/programmer-guide)お問い合わせ (数週間後に別途発表ERDDAP™1.38 リリース。) 
    * 生成データセット Xmlが改善されました。
        * スクリプトは変更されましたので、すべてのLinuxコンピュータで正しく動作する必要があります (ほんの数だけ) お問い合わせ
        * 今追加します。creator\\_name,creator\\_emailとcreator\\_urlいつでも可能です。
        * その他にも小さな改良が多数あります。
    * 精製方法ERDDAP™時間とともに取引します。
        * 内部的に、ERDDAP™ミリ秒単位の精度で時間を処理します (秒単位) お問い合わせ
        * 指定したデータセットのタイム精度を任意に指定できるようになりました。[time\\_precision](/docs/server-admin/datasets#time_precision)お問い合わせ たとえば、日付精度で時刻値を表示するデータセットを設定できます。 (例:1970-01-01) お問い合わせ
        * 現在のデータセットはデフォルト設定を使用しますので、これらの変更によって影響を受けず、秒単位の精度で時間を表示し続けます。 Servet CizmeliとPhilip Goldsteinのご協力に感謝します。
    *   [EDDTableFromNcCFファイル](/docs/server-admin/datasets#eddtablefromnccffiles)新しいデータセットタイプです。datasets.xmlファイル。 定義する多数のファイル形式からデータを読み込むことができます。[CFシリーズ 分離されたサンプリングの幾何学](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)コンベンション NODCとKyle Wilcoxのおかげで、有効なDSGファイル形式の膨大な数のサンプルファイルを作成し、それらを公に利用できるようにしました。
*    **小さな変更/バグ修正:** 
    * 拡大する[クイックスタート](#quick-restart)関連するすべてのシステムEDDGridEDDTable サブクラス。
    * ドキュメントの改善、特に使用方法に関する改善[グリッドダップ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)そして、[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)さまざまなクライアントソフトウェアから。
    * minTime および/または maxTime を epochSeconds として表現できるように、高度な検索を変更しました。 Lynn Dewitt のおかげで.
    * 変更内容.htmlTableurlとメールアドレスをリンクとして表示するための出力。
    * 関連する "rel=" と "rev=" を追加&lt;href&gt; タグ。 Pat Cappelaereさんからの感謝OGC RESTプロジェクト
    * 非現実的な大きなデータ要求に対する保護を改善しました。tabledap、それはより堅い問題であるところ。
    * message.xml にメッセージが増えました。
    * スピード向上を実現
    * 固定式EDDGridFromFiles はソートされた軸を下降できるようにします。 Maricel Etchegaray のおかげです。
    * 廃止されるため、iGoogle への参照を削除しました。
    * いくつかの小さな変更とバグ修正を行いました。

## バージョン 1.38{#version-138} 
 (公開日 2012-04-21) 

*    **新しい特徴:** 
    * ISO 19115 および FGDC --ERDDAP™データセットごとにISO 19115とFGDC XMLメタデータファイルを自動生成できます。 ファイルのリンクは、データセットのすべてのリストに表示されます。 (例:フルテキスト検索から) ウェブアクセス可能なフォルダにも (ワフ)   (見る[FGDC WAFの特長](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)そして、[ISO 19115 認証取得](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) お問い合わせ テド・ハベルマン、デイブ・ノイフェルト、その他多くの方々のご協力をお待ちしております。
    * データセットのフルテキスト検索が\\-_をサポートexcludedWord_ と \\-"_excluded phrase_" 。 豊富なSignellのおかげで。
    * データセットを検索すると、結果を一度に返します。 デフォルトでは、パラメータ文字列: page=1&itemsPerPage=1000 を使用しますが、リクエストの URL で値を変更できます。 スティーブ・ハンキンとUAFプロジェクトのおかげです。
    *   OpenSearchお問い合わせERDDAP™今すぐサポート[OpenSearch1.1 の](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)データセットを検索するための標準。 とりわけ、これは、カタログ集計ウェブサイトが分散検索を行うことを可能にします (それぞれのカタログに検索リクエストを渡すと、) お問い合わせ
    * コンマ区切り バリュー (CSVシリーズ) ファイル --ERDDAP™値間のコンマでCSVファイルを生成 (Excelが好むもの) comma+spaceの代わりに。 Jeff deLaBeaujardiere は、Jeff deLaBeaujardiere の3つ星ホテルです。
    * 百万のデータセット -- いくつかの変更は、サポートするために作られましたERDDAP膨大な数のデータセットを持っている、おそらく数百万。 スティーブ・ハンキンとUAFプロジェクトのおかげです。
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
#### クイックリスタート{#quick-restart} 
*   [ツイート](#quick-restart)クイックリスタートシステムにより、ERDDAP™より速く再起動します。
     **setup.xml ファイルに追加してください。** 直後に&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * データセットのテキスト検索は Lucene 検索エンジンで行えます。 (10,000 のデータセット未満の場合、元の検索エンジンをお勧めしますが、) または元の検索システム。
         **setup.xml ファイルに追加してください。** 直後に&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * setup.xml では、コンマ区切りリストに 2 つの新しいカテゴリを追加できるようになりました。&lt;categoryAttributes&gt;:
        * グローバル:キーワード (global:institution の直後に追加します。) -- キーワードのコンマ区切りリストをグローバルキーワード属性からパースする新しい特別なケースで、各キーワードの別のエントリを作ることができます。
        * 変数 お名前 (必須) (終了時に追加) -- それぞれを分類する新しい特別な場合dataVariable destinationNameお問い合わせ
    * setup.xml では、 (しかし、なぜ?) お問い合わせERDDAP™FGDC および/または ISO 19115 メタデータをデータセットに含めない
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

これらの設定のデフォルト値は true です。
    * インスタグラムdatasets.xmlデータセットのメタデータの改善を検討してください。ERDDAP™データセットのメタデータに基づいて、データセットごとにISO 19115とFGDC XMLメタデータファイルを自動的に生成します。
お問い合わせ **良いデータセットメタデータがうまくいくERDDAP-ISO 19115およびFGDCメタデータを生成しました。**   
         **新しく更新された多くのドキュメントを見る[グローバルアトリビュート](/docs/server-admin/datasets#global-attributes)お問い合わせ** 
    * インスタグラムdatasets.xml、あなたが伝えたいならERDDAP™既製のFGDCおよび/またはISO 19115ファイルを使用するには、サーバーのファイルシステムにどこかにあるERDDAP™これらのファイルを生成し、使用する:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
_fullFileName_\\="" またはファイルが見つからない場合、データセットにはFGDCおよび/またはISO 19115メタデータはありません。 そのため、FGDCやISO 19115のメタデータを特定のデータセットに抑制したい場合にも便利です。
    * インスタグラムdatasets.xml, すべてのEDDGridSideBySideおよびEDDGridAggregateExistingDimension データセットは、子供のデータセットが異なることを特定しますdatasetID親データセットと他の子供よりもs。 (たとえば、George Foremanのシンプルで効果的なシステムで子供を命名することができます。) 家族の名前がまったく同じである場合、データセットはロードできません (集計された軸の値がソートされた順番でないエラーメッセージ) お問い合わせ
    * インスタグラムdatasets.xml, 有効なリストにいくつかの変更があったioos\\_categoryメタデータ値:
        * 「pCO2」を「CO2」に変更しました。
        * 「フィジカル・オーシャングラフィー」を追加しました。
        * 「土壌」を追加しました。
    * インスタグラムdatasets.xml,ERDDAP™もはや '.' を ' で許可しませんdatasetIDお問い合わせ 許されたが、捨てられた。 (お問い合わせ) 
    * インスタグラムdatasets.xml, EDDTableFromThreddsFiles と EDDTableFrom のセットアップHyrax両方のクラスがより効率的になるように書き換えられたので、ファイルが若干変更されました (両方のクラスは、常にすべてのリモートデータファイルのローカルコピーを作る) お問い合わせ これらのクラスを設定するためのドキュメントを参照してください。[EDDTableFromの特長Hyraxファイル](/docs/server-admin/datasets#eddtablefromhyraxfiles)そして、[EDDTableFromThreddsファイル](/docs/server-admin/datasets#eddtablefromthreddsfiles)お問い合わせ 特に、変更されたコメントについては、&lt;ファイルDir&gt; (今、無関係) そして、&lt;sourceUrlツイート (今不可欠) お問い合わせ また、このクラスを EDDTableCopy で効率よくラップしないでください。
    * インスタグラムdatasets.xml, EDDTableFromDatabase を使っている場合Oracleデータベース、接続を含める必要があります。 物件等
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
デフォルトは10でフェッチするデータの行数を1回指定するには、horribly非効率的なです。 詳細はこちら[Oracleドキュメント](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm)お問い合わせ MySql と PostgreSQL は、この設定のデフォルト値が向上しているようです。 Kevin O'Brien(ケビン・オビエン)
    * EDDTableFromDatabase を使用する場合は、改善されたものを参照してください。[「スピード」のドキュメント](/docs/server-admin/datasets#eddtablefromdatabase)パフォーマンスを向上させるための追加の提案。 Kevin O'Brien(ケビン・オビエン)
    * インスタグラムdatasets.xml, すべてのEDDTableのため... データセット, 条約とMetadata\\_Conventionsグローバル属性はCF-1.6を参照してください。 (CF-1.0、1.1、1.2、1.3、1.4、または1.5) CF-1.6は、ディスクリートサンプリング幾何学に関連する変更を含む最初のバージョンであるため。
    * コンパイルしているプログラマERDDAP™コードは lib/lucene-core.jar を javac と java コマンドラインパスの jar ファイルのリストに追加する必要があります。
    *   ERDDAP™お問い合わせ[新サービス](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)GCMDサイエンスキーワードからCF標準名を変換します。 グローバルなキーワードメタデータを生成する際に、データセットのメタデータを生成する際に便利です。ERDDAPお問い合わせ
    * ボットに対処する -- お問い合わせ[ボットがあなたのクローリングを防ぐERDDAP™最上級の方法](/docs/server-admin/additional-information#robotstxt)お問い合わせ
    * 翻訳 -- テキストERDDAP's web ページは、主にmessions.xmlで、異なる言語への翻訳に適しています (例:ドイツ、フランス語) お問い合わせ メッセージは現在、多くの場合、フォーマットのためにMessageFormatを使用して、翻訳の作成を支援します。 翻訳を希望される方は、メールでお問い合わせください。erd dot data at noaa dot govお問い合わせ
    * サンプルdatasets.xmlお問い合わせ いくつかの小さかったが、サンプルに大きな誤差があったdatasets.xmlお問い合わせ これらのデータセットを使用する場合は、新しいサンプルから新しいバージョンを入手してください。datasets.xml新しい erddapContent で.zipファイル。 ジェームス・ウィルキンソン(James Wilkinson)
    * ギット -- 頑張りますERDDAP™このリリースの後に GitHub プロジェクトを ASAP で作成します。
*    **小さな変更/バグ修正:** 
    * 新しいパレット、OceanDepth は深さの値に便利です (肯定的なダウン) , 例, 0 (サインイン) に 8000 (フィードバック) お問い合わせ
    * ザ・オブ・ザ・.kml出力からtabledapより良いマーカーアイコンを使用する (うつまらない) お問い合わせ マーカーの上にカーソルを合わせると大きくなります。
    * EDDTableFromFiles ディレクティブ 最後のアップグレードでは、新しいnetcdf-javaライブラリは、変数名に対する制限が厳しくなりました。.ncファイル。 変数が EDDTableFromFiles に問題が生じた場合sourceName特定の句読点文字を持っていた。 EDDTableFromFiles は、その問題を回避するために変更されました。 トーマス・ホルコムブのおかげさまで。
    * .subset ページがサポート 関連データのチェックボックスの代わりに0/10/100/1000/10000/100000。 100000がブラウザをクラッシュさせる可能性があるツールチップは警告します。 Annette DesRochers リチャード (アベ) Coughlin、IOOSの生物学的プロジェクト。
    * .../erddap/info/datasetID_/index.html Web ページでは、URLとメールアドレスをクリック可能なリンクとして表示できるようになりました。 リチャードのありがとう (アベ) クフリンとIOOSの生物学的プロジェクト。
    * バグ修正: でtabledap、高度が付いているデータセットのための メーターPerSourceUnit&lt;0、高度の制約の問い合わせは誤って処理されていました。 Kyle Wilcox のおかげで.
    * バグ修正:EDDGridAggregateFromExistingDimension では、より多様な TDS URL をサポートしています。 ありがとうございます。

## バージョン1.36{#version-136} 
 (公開日 2011-08-01) 

*    **新しい特徴:** 
    * ユーザーの立場から重要な変更はありません。
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * pmelTao のデータセットとしてよく使われていたデータセットtabledap  
ドキュメントは使用できません。ERDDAP™管理者は、これらの変更を行う必要があります。
        * お問い合わせdatasets.xml, あなたが持っている場合datasetID="pmelTao" データセット、追加
その行末の "&gt; の直前の Active="false" が有効です。
        * setup.xml では、&lt;EDDTableIdExample(エドタブル) pmelTao です。
            * もし、datasets.xmlデータセットがないdatasetID="erdGlobecBottle" を追加
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * setup.xml では、すべてのタグをから置換します。&lt;EDDTableIdExample(エドタブル) コース
                &lt;EDDTableの特長MatlabPlotExample&gt; お問い合わせ
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * 型が EDDTableFromFiles のサブクラスであるデータセットでは、メタデータからデータを生成できるようになりました。
具体的には、元の変数の属性の値から変数を作ることができます。
例えば、datasets.xml, 内 a&lt;dataVariable&gt; 使用すると、
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™クルーズ変数の PI 属性の値で変数を作成します。
WODのおかげで。
*    **変更点:** 
    * 小さな変更

## バージョン1.34{#version-134} 
 (公開日 2011-06-15) 

*    **変更点:** 
    * バグ修正: 64ビットで発生したメモリリークを修正Javaインストール。
    * バグ修正:ERDDAP™緯度次元の値が高値から低値までの範囲のとき、これらのグローバル属性を正しく設定します。: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernmost\\_Northing,ノーザンモ\\_Northing.
        
注意:actual\\_range変更されていない:それは範囲および貯蔵の順序を示すために意図されているので低、高い価値または高い、低い価値があるかもしれません。
        
    * 小さい変更。
    *   ERDDAP™管理者は、setup.xml に変更を加える必要はありません。datasets.xmlお問い合わせ

## バージョン1.32{#version-132} 
 (公開日 2011-05-20) 

*    **変更点:** 
    * 新しく批准された、CFの分離されたサンプリングの幾何学のためのサポート (残念ながらオンラインではまだ利用できません) 提案されたCFポイント観測条約を置き換える。
        ERDDAP™ユーザーは、 cdm\\_feature\\_type=Station が TimeSeries に置換され、作成したファイルへの小さな変更があることがわかります。.ncCFファイルタイプ (flat\\_dimension は、sample\\_dimension と呼ばれています。) お問い合わせ
        ERDDAP™管理者は、これらの変更を行う必要があります。datasets.xml: : :
        * cdm\\_data\\_type=Station は cdm\\_data\\_type=TimeSeries に変更する必要があります。
        * cdm\\_data\\_type=StationProfile は cdm\\_data\\_type=TimeSeriesProfile に変更する必要があります。
        * cdm\\_station\\_variables は cdm\\_timeseries\\_variables に変更する必要があります。
        * cf\\_role=station\\_id は cf\\_role=timeseries\\_id に変更する必要があります。
    * ニュースioos\\_categoryオプション:「着色分解有機マット」「pCO2」「ストリームフロー」「トータルサスペンドマット」
    * 64ビットでメモリリーク可能なソリューションJavaお問い合わせ\\[うまくいかない\\]
    * 小さい変更。

## バージョン1.30{#version-130} 
 (公開日 2011-04-29) 

*    **新しい特徴:** 
    * 64ビット対応Javaお問い合わせ 64ビット使用時Java,ERDDAP™より多くのヒープメモリを使用し、より多くの同時リクエストを処理することができます。
    * サポート.nc2GBまでのファイルリクエスト (64ビットなしJava) よりよい使用によってERDDAPチャンクのデータ処理
    * コードと2Xの速度で2Xの速度が向上しました。Java1.6 作って下さいERDDAP™2X から 4X まで高速
    * 記憶節約の改善は大幅に低下しますERDDAPベースメモリ使用量
    * 表形式のデータセットの場合、ERDDAP™データセットのcdm\\_data\\_type、データマップをCDMタイプに完全に認識できるようになりました。 詳細はこちら[CFシリーズ 分離されたサンプリングの幾何学の指定](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)お問い合わせ おそらく、Wordファイルが.htmlに変換され、そのWebページで現在の「OBSOLETE」情報を置き換えることがすぐにある。 ありがとうございます。NOAAUAFプロジェクト
    * ほとんどのEDDTableデータセットの場合、新しい出力ファイルタイプオプション、.ncCFは、Contiguous Ragged Arrayを作成します.nc最新バージョンに対応したファイル[CFシリーズ 離散サンプリングジオメトリ条約](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)お問い合わせ これらのファイルは、データセットのCDMデータタイプを反映した構造になっています。 提案された慣行が変更されるので、この書き込みでは netcdf-java ライブラリはまだ作成するファイル形式を読むサポートしていません。ERDDAPCDMデータファイルとして解釈します。 なるほど。 ありがとうございます。NOAAUAFプロジェクト
    * ビュー : .subset Web ページの .subset データオプション は、ユーザーが表示する特定のデータの行の最大数を指定するドロップダウン リストです。 (デフォルト = 1000) お問い合わせ この変更、他、許可して下さいERDDAP™異なるデータの行数が多いデータセットで動作する。 (単一の変数のユニークな値の数は、まだ問題ですが、かなり高い (20,000円) .subsetや他のWebページが本当にゆっくりとロードする前に。) ありがとうございます。NOAAUAFプロジェクト
    * .subset Web ページには、新しいオプションがあります。 分散データカウントを表示します。 GTOPPプロジェクトのおかげで
    * ユーザを支援するために、明確な価値観 (例:駅名) Make-A-Graph および Data Access フォームに表示されています。 ありがとうございます。NOAAUAFプロジェクト
    * .transparentの Png リクエストは、すべての種類のグラフとデータ表現をサポートしています。 単なるデータ -- 軸、凡例、ランドマスク、その他何も描画しません。 これにより、透明なPngのレイヤーとして画像を作ることができます。 もし&.size=_width_|_height_ はクエリで指定されます。 (おすすめ) お問い合わせ デフォルトは360x360ピクセルです。 唯一の例外はEDDGrid&.draw=surface(デフォルト) (前に) データポイントごとの~1/pixelのイメージです (最大3000 xおよびyピクセル) お問い合わせ Fred Hochstaedterのおかげで.
    * ザ・オブ・ザ・WMSwebページでは、データセットの変数のカラーバーが表示されます (ツイート) お問い合わせ Emilio Mayorga とその他
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * このリリースでは、多くの変更が伴います。 それらはすべて重要です。 以下に掲げる全ての変更により、患者様とお仕事ください。
    * このバージョンは、いくつかに対処するために意図したよりも早く押し出されていますJavaセキュリティバグ 残念ながら、このために意図したいくつかの機能/修正ERDDAP™バージョンは本バージョンではありません。 お問い合わせ うまくいけば、次のバージョンは比較的早くなります (アップグレードがはるかに簡単) お問い合わせ
    * 複数のセキュリティバグを避けるためJava6 アップデート 23 以下、最新バージョンをダウンロードしてインストールしますJava  (Java6 更新 24 以上) お問い合わせ 64ビットオペレーティングシステムをお持ちの場合は、64ビット版の64ビット版を入手してください。Javaお問い合わせ
    * Tomcat 5を使用している場合は、Tomcat 6または7にアップグレードする必要があります (お問い合わせ) お問い合わせ Tomcat 6を使用している場合は、Tomcatバージョン7にアップグレードを検討してください。
    * 上記のすべての手順に従ってください[新規設定ERDDAP™](/docs/server-admin/deploy-install)、しかし関連性のあるところ、あなたの古いインストールから新しいインストールにファイルをコピーします。\\[トームキャット\\]/content/erddapディレクトリとファイル。 その一部として、注意してください[新しい Tomcat セットアップの推奨事項](/docs/server-admin/deploy-install#tomcat)お問い合わせ
    * デフォルト erddap.css は erddap.war ファイルに含まれています。
        * デフォルトの erddap.css を使用するには、 **削除** あなたの古い\\[トームキャット\\]/content/erddap/images/erddap.css .
        * 変更された場合\\[トームキャット\\]/content/erddap/images/erddap.css で、それを使用し続けたい: そのままにして置換する&lt;入力&gt; セクション:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * お問い合わせ\\[トームキャット\\]/content/erddap/setup.xml:
        * 関連するコメントやタグを置き換える&lt;partialRequestMaxBytes と&lt;partialRequestMaxCells&gt; お問い合わせ
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * 関連するコメントを置き換える&lt;categoryAttributes&gt; タグの値の変更を検討する:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

個人のお客様&lt;categoryAttributes&gt; グローバルな属性は、プレフィックスグローバルで識別される必要があります。 (例:グローバル:機関) お問い合わせ 他の属性は変数属性であると仮定されます (例:standard\\_name) お問い合わせ また、機関の価値観 (唯一のもの) 元のケースに残っていた。 今、すべてのカテゴリの値が小文字に変換されます。
    * お問い合わせ\\[トームキャット\\]/コンテンツ/erddap/datasets.xml: : :
        * 大きい改良:ERDDAP™表形式のデータセットのcdm\\_data\\_typeに関する新しい要件があります。 同様に、各データセットにはcdm\\_data\\_typeに関連する正しいメタデータと変数があります。 そうでない場合、データセットはロードされず、エラーをスローします。 ドキュメントを見る[cdm\\_data\\_type ディレクティブ](/docs/server-admin/datasets#cdm_data_type)お問い合わせ
        * FYI: EDDTableFromAsciiServiceNOS の新しいデータセットタイプがあります。
        * FYI: 新しく許可される3つがありますioos\\_categoryオプション: ハイドロロジー、品質 (e.g.、質の旗のための) , 統計 (例、意味) お問い合わせ
        * EDDTableから... ファイルデータセット、削除&lt;nDimensions&gt; タグ。 不要、または使用していません。
        * 変数とdestinationName=高度、ERDDAP™もはや力無しlong\\_nameお問い合わせ お問い合わせdatasets.xml繰り返し検索&lt;destinationName&gt;altitude とその変数に追加&lt;addAttributes&gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (または若干異なるlong\\_name特別な場合) お問い合わせ
        * オプション: すべてのEDDTableFromFilesサブクラスは、変数をサポート[sourceName=グローバル:...](/docs/server-admin/datasets#global-sourcenames)それぞれのファイルからデータをデータ変数に変換します。 Lynn DeWitt のおかげです。
    * EDDTableFromDatabase ユーザー -ERDDAP™Postgres の新しい JDBC 4 ドライバーが付属しています。 他のデータベースについては、データベースの最新のJDBC .jarファイルをチェックしてください。 お問い合わせERDDAP™今すぐ使用Java1.6+、JDBC 4 (なし 3) おすすめです。
    * 財務・業績
        *   EDDGridから...ファイルとEDDTable から... ファイルデータセットが fileTable 情報を格納できるようになりました
            \\[bigParentディレクトリ\\]/データセット インフォメーション\\[datasetID\\]/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/.ncファイル。
また、EDDTable データセットは、サブセット情報を保存できるようになりました。
            \\[bigParentディレクトリ\\]/データセット インフォメーション\\[datasetID\\]/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/\\*/.ncファイル。 これらのファイルが使用される
            \\[bigParentディレクトリ\\]/データセット インフォメーション\\[datasetID\\]お問い合わせ.jsonファイル。
古いファイルが自動的に削除されますERDDAP™スタートアップ または、すべてのファイルを削除することができます (しかし、空のサブディレクトリを残します) お問い合わせ\\[bigParentディレクトリ\\]/datasetInfo/ ディレクティブ
        * 新しい EDDTableFromNcCFFiles で、提案された新しい CF Point Observation Conventions を使用して、ローカルおよびリモートファイルからデータを読み込みます。 しかし、このリリースではそうではありません。 これらのファイルを読むためのいくつかの方法に関連するnetcdf-javaライブラリに問題があります。 そして、提案されたCFポイント観測条約の最近の変更がありました。 netcdf-java ライブラリが修正され、最新の提案に更新されると、これを再開します。
        * ランニングERDDAP™Windowsに問題があるかもしれません: そうでなければ、\\[bigParentDirectory/logs/log.txt ファイルERDDAP™ファイルを素早く削除したり名前を変更したりすることはできません。 これはアンチウィルス ソフトウェアによるものです (例:McAfeeとNorton) ウイルスのファイルをチェックしています。 この問題に遭遇した場合 (log.txtファイル内のエラーメッセージで「削除できません...」のように表示できます。) , ウイルス対策ソフトウェアの設定を変更すると、部分的に問題を軽減することができます.
もし、ERDDAP™ウィンドウズでは、デスクトップ上で実行されているテストだけで、これはただ迷惑です。
もし、ERDDAP™Windowsであなたの公共ですERDDAP™Linux サーバーへの切り替えを検討してください。
    * スローファーストスタートアップ -- 初めて走るERDDAP™改善の後で、ERDDAP™データセットをロードすると遅くなる可能性があります。 方法ERDDAP™集計されたファイルに関する情報が変更されるので、ERDDAP™すべてのファイルから情報を再読み込みする必要があります。 それは時間がかかります.
    * スタートアップのエラー -- cdm\\_data\\_type に関連する変更を考えると、データセットの一部がロードされず、エラーをスローする可能性があります。 毎日のレポートメールをよく読むERDDAP™いつ送信するかERDDAP™起動完了です。 ロードされていないデータセットのリストが表示されます (トップに) ロードしなかった理由 (底の近く) お問い合わせ
    * あなたが立ち往生したり、他の質問がある場合は、私に詳細を電子メールで送信します。erd.data at noaa.govお問い合わせ
    * プログラマ お問い合わせ 書き込む場合Java実行するプログラムERDDAP™コードは、コマンドラインパラメータの参照の一部を変更する必要があります。
        * joda-time-1.6.2.jarをjoda-timeに変更します。 ジャー
        * Postgres JDBC .jar リファレンスを postgresql.jdbc.jar に変更
*    **小さな変更とバグ修正:** 
    
    * 空糸を避けるための接続処理を改善しました。
    * ほぼ同時同一の要求をより効率的に処理するために、円滑な慣行を改善しました。
    *   ERDDAP™netcdfAll-4.2.jar を使う (netcdfAll-latest に名前を変更しました。 ジャー) お問い合わせ このスイッチは、いくつかの内部変更が必要になり、いくつかの小さな外部の変更を引き起こしました。例えば、gribファイルがどのように読み込まれ、小さな変更を引き起こします。.ncヘッダー出力。
    * 新機能:\\[エルダップ\\]/convert/fipscounty.html 変換FIPS郡のコードから/郡名から。
    * 地図では、状態の境界線が暗くなっているので、すべての背景色でより良く見えます。
    * タプル.kml再び出力すると、円アイコンを使用してポイントをマークします (飛行機のアイコンではない Googleは最近に切り替えました) お問い合わせ
    * erdCalcofi のデータセットは再配置され、ローカルファイルから提供されました (より速く) お問い合わせ
    * 生成データセット Xmlから ステッド カタログは現在、結果ファイルを作成する:
        \\[トームキャット\\]/webapps/erddap/WEB-INF/temp/EDDGridFromThreddsCatalog.xml から Kevin O'Brien(ケビン・オビエン)
    * 生成データセット Xmlから ステッド カタログは現在、ソースURLから不要なポート番号を削除しようとします (例::8080 と :8081 が削除される) お問い合わせ お問い合わせNOAA中央のセキュリティチーム。
    * .subset Web ページでは、Distinct Data の Map には、変数 lat lon 範囲があります。
    * いくつかのリストERDDAP™  (例:すべてのデータセットを表示するテーブル) A.Z が前にソートしたようにソートされました。.zお問い合わせ ケースに敏感な方法でソートします。
    * .subset Web ページへの小さな変更: 単位が表示されるようになりました。
    * 生成データセット システムクリップボードや displayInBrowser に結果を置くことができない場合は、Xml と DasDds は例外を投げません。 エリック・ブリカーとグレッグ・ウィリアムズに感謝します。
    * バグ修正: データセットが読み込まれるとき、ERDDAP™geospatial のグローバル属性を削除または調整します。 チャールズ・カルレトン(Charles Carleton)
    * バグ修正: String2.getClassPath () 今、きちんとクラスをパーセントデコード パス (おそらく、Windowsでは、ファイル名のスペースが%20として登場しました) お問い合わせ この影響を受けるERDDAP™EDStatic が SSR.getContextDirectory を呼び出す () コンテンツ/ erddap を検索します。 Abe Coughlinさん、ありがとうございました。
    * バグ修正: EDDTableFromFiles では、別々の getDataForDapQuery 処理に関連する () リクエスト エリック・ブリカーズのご協力に感謝します。
    * バグ修正:tabledapリクエストは、データセットの高度の制約を適切に処理しなかった MetersPerSourceUnit は -1 でした。 エリック・ブリカーズのご協力に感謝します。
    * バグ修正:EDDTableFrom... =NaN と &#33;=NaN を含むリクエストを正しく処理できるようになりました。
    
## バージョン1.28{#version-128} 
 (公開日 2010-08-27) 

*    **新しい特徴:** なし。
*    **お知らせERDDAP™管理者は知っておく必要があります。** なし。
*    **バグ修正:** プログラミングミスを修正 (Ver 1.26 のみ) 作ってみるERDDAP™非常に遅い。
     

## バージョン1.26{#version-126} 
 (公開日 2010-08-25) 

*    **新しい特徴:** なし。
*    **お知らせERDDAP™管理者は知っておく必要があります。** 
    * あなたから\\[トームキャット\\]/content/erddap/setup.xml,
        * インスタグラム&lt;法的&gt;、次の新しいラインで\\[スタンダード データライセンス\\], インサート\\[スタンダードコンタクト\\]お問い合わせ\\[スタンダードコンタクト\\]参照する&lt;adminEmail&gt; は setup.xml で上位に指定しました。
        * 削除&lt;テーブルCommonBGColor&lt;tablehighlightBGColor&gt;.
        * おすすめ: アクセス&lt;endBodyHtml&gt; へ
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * 必須: あなたへ\\[トームキャット\\]/content/erddap/images/erddap.css と erddapAlt.css は、下部に追加します。
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **バグ修正と小さな変更:** 
    
    * バグ修正: いくつかの状況では、フォームは、いくつかのバージョンのInternet Explorerで動作しませんでした。 グリー・ウィリアムズに感謝します。
    * バグ修正: データセットがリモートからあったらグラフボタンが機能しなかったERDDAPお問い合わせ
    * バグ修正:WMSリモートからデータセットがあったら、時々機能しなかったERDDAPお問い合わせ
    * 多くの小さな変更とバグ修正。
    

## バージョン1.24{#version-124} 
 (公開日 2010-08-06) 

*    **新しい特徴:** 
    * ニュース[サブセットのWebページ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)表形式のデータセットのサブセットを選択するために、ファセットされた検索を使用します。 POSTのおかげで。
    * ニュース[高度な検索](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)他のすべての検索オプションを組み合わせ、経度、緯度、時間境界ボックスを追加します。 エルリン・モンゴメリーに感謝します。 (申し訳ありません、このコンテンツはただ今 English のみです。) 
    * ニュース[変換時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)ウェブページとサービスでは、数値時間をISO文字列から変換することができます。
    * ニュース[変換ユニット](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)ウェブページとサービスを変換することができますUDUNITSUCUMユニットから お問い合わせNOAAログインSOSお問い合わせ
    * お問い合わせtabledapリクエストには、 &units リクエストが含まれます。 (カリキュラム) 元の名前から単位の名前が変換されます (よくある質問UDUNITS) お問い合わせ[カリキュラム](https://unitsofmeasure.org/ucum.html)単位の名前。 これはユニットにのみ影響を与えます\\*名称:\\*データ値ではなく、 お問い合わせNOAAログインSOSお問い合わせ
    * グラフのWebページとグラフとマップを作成する改善:
        * グラフがマップの場合、マップの中央ポイントを変更するには、新しい Make A Graph ボタンをズームイン/アウトし、新しいオプションがあります。 POSTのおかげで。
        * 下部の近くのフィルター設定を追加しました。 グレッグ・ウィリアムズに感謝します。
        * 海岸線のデータファイルがGSHHS v2.0に更新されました。 POSTのおかげで。
        * 湖と川が広がる地図 POSTのおかげで。 (残念ながら、サクラメント・リバー・デルタは、海岸線データや湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/湖/) 
        * pscoast-derivedの国家/州のファイルで構築されました。 POSTのおかげで。
        * Topography.cpt は若干変更されました。 (この悪影響を及ぼすと申し訳ありません。) POSTのおかげで。
        * Griddap の Make A Graph では、ユーザーが変数を変更した場合、フォームは自動的に再登録され、axisVariables' showStartAndStop は、常にグラフ変数を反映しています。 ジョアキン・トリナネスに感謝します。
        * pngとpdfイメージURLの場合:
            * _value_ が "under" にできる new &.land=_value_ の (ショートポグラフィ) または "オーバー" (ちょうどbasymetryを示す) お問い合わせ 指定されていない場合、デフォルトは[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)お問い合わせdatasets.xmlまたは setup.xml. POSTのおかげで。
            * 新しい: 余りに長い伝説のラインは複数のラインに自動的に壊れます。 POSTのおかげで。
        * pngイメージURLの場合:
            * _value_ が "Bottom" にできる、 new &.legend=_value_ が (デフォルト) 「オフ」または「オン」 これは、凡例を含んだり、凡例を除外したり、凡例だけを取得することを可能にします。 Cara Wilson のおかげで.
            * 新規 &.trim=_n Pixels_はnPixelsの境界を残します (例:10) 画像の下部にある。 .legend=Off の後に適用される。 Cara Wilson のおかげで.
            * 新規&.size=_width_|_height_ では、画像の幅と高さをピクセル単位で指定できます。
    * 新しい出力ファイル形式:
        * .csvp と.tsvp -- .csv や.tsv, と " (_単位_) 「先頭行の列名に追加しました。
        * .odvTxt -- データの取得を簡素化する .txt ファイルを作る[海洋データ ニュース (ODVの) ](https://odv.awi.de/)お問い合わせ
        * .esriCsv -- ESRI のインポートに適した .csv ファイルを作るArcGISお問い合わせ (集計データセットのみ) Jan Mason、ジェフ・デ・ラ・ボージャーディーレ、NOAAログインSOSプロジェクト
    * GUI の改善[カテゴライズ](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)サイトマップ また、分類する値 (機関以外) 今、すべての小文字。 ノンローケース対応 (リダイレクト) 後方互換性のため。 Roy Mendelssohn のおかげで.
    * エラーメッセージは、ユーザーに対してより短く、より一層の指向です。 グレッグ・ウィリアムズに感謝します。
    * 大きく減らす内部変化ERDDAPベースメモリ使用量
    * POST プロジェクトに関連する多くの新機能。
*    **お知らせERDDAP™管理者は知っておく必要があります。** たくさんの変更があります。 お問い合わせ しかし、それぞれが素晴らしい利点をもたらします。
    * GenerateDatasetXml への大きな変更 - より多くの質問ができるようになりました (関連記事を見る[データセット タイプ](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)インフォメーション) そして、常に必要な準備が整ったコンテンツを生成します。datasets.xmlお問い合わせ あなたはまだセットアップを担当しているので、あなたはまだレビューする必要がありますdatasets.xmlご利用前のコンテンツ コンピュータプログラムよりも、プロジェクトへの努力を重ねる人間が常に良いでしょう。 UAFプロジェクトのおかげで
    * 必須: setup.xml では、requiRED を再設定する必要があります。WMSセクション。 今、これらのタグを含める必要があります (しかし価値を変えるために自由に感じて下さい) : : :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUIRED: setup.xml では、この新しい提案をコピーして貼り付ける&lt;startHeadHtml&gt; 古いバージョンを置き換える しかし、あなたの好みの変更を自由に作るために感じなさい。
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

POST、ハンス・ヴェド、リック・ブラア氏に感謝します。
    * お問い合わせ: setup.xml で、&lt;startBodyHtml&gt; は、&lt;body&gt; タグだけ&lt;body&gt; は erddap.css によってスタイルが設定されているので、
    * REQUIRED: setup.xml では、これを変更します。&lt;エンドボディHtml&gt; (しかし、メールアドレスをメールアドレスに変更し、他の変更を加えるために自由に感じます) : : :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * 非常にお勧め: setup.xml では、推奨&lt;theShortDescriptionHtml&gt; は、
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

特に最初の段落の最後の文を自由に変更してください。
    * setup.xml, emailEverythingTo と emailDailyReport 現在、メールアドレスのコンマ区切りリストになることができます。 最初の電子メール 特に、例えば、EDDXxxxFromErddapのデータセットへのサブスクリプションは、そのメールアドレスを使用します。 John Maurerさん、ありがとうございました。
    * 電子メールのエラーがログオンされました\\[bigParentディレクトリ\\]/logs/emailLogYYY-MM-DD.txt ファイル。
    * setup.xml では、メールアカウントプロパティ(通常は直後に)を設定するための新しいオプションのパラメーターがあります。&lt;メールパスワード&gt;:
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

デフォルトは何もありません。 豊富なSignellのおかげで。
    * 必須:EDDTableCopy またはEDDGridコピー、すべてのDELETEが必要です\\[bigParentディレクトリ\\]/copy/ディレクトリと "xh" を含むファイル。ディレクトリやファイル名は、古いファイルを停止した後ERDDAP™新しく始まる前にERDDAP™そのファイルは再コンパイルされます。 私はとても残念ですが、変更をし、うまくいけば、いくつかの管理者といくつかのファイルに影響を与えることが重要です。
Linuxでは、これらのファイルをcdで見つけることができます\\[bigParentディレクトリ\\]/コピー
お問い合わせ\\*ログイン\\*  
Windowsでは、これらのファイルを、開始見つけることができます|インフォメーション
検索したいもの: ドキュメント
ファイル名の全部または一部: xh
参照: ブラウズ -&gt;\\[bigParentディレクトリ\\]/コピー
「検索」をクリック
^A を全て選択する
それらをすべて削除するデル
    * お問い合わせ:datasets.xml, EDDTableFromDatabase データセットの場合, 日付とタイムスタンプ変数, 変更データ 1970-01-01T00:00:00Z 以降、ダブルと単位を秒単位にタイプします。 タイムスタンプデータをデータベースに保存する\\*お問い合わせ\\*タイムゾーン。 タイムゾーン情報がなければ、クエリがERDDAP™データベースと結果に送信するERDDAP™JDBCを経由してデータベースから取得することはあいまいで間違っている可能性があります。 「タイムゾーンなしのタイムスタンプ」データを扱う信頼できる方法を見つけました。 とにかく良い練習だと思います。 結局のところ、「タイムゾーンのないタイムスタンプ」データは、暗黙のタイムゾーンを持っています。 タイムゾーンがデータベース管理者に明らかであるのは素晴らしいですが、他のソフトウェアがデータベースと正しく相互作用できるように明示的に指定するのは理にかなっています。 Thanks/sorry マイケル・ウルゼン
    * 高く評価される: でdatasets.xml, .subset の Web ページを有効にして、 .subset のタブラーデータセットの検索を .subset できるようにするには、[&lt;subsetVariables&gt;&gt; (/docs/server-admin/datasets#subsetvariable) データセットのグローバル属性に。
    * おすすめ: でdatasets.xmlデータセットがあれば、datasetID="pmelGtsppp" は、
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * おすすめ: でdatasets.xml, [ ] の新しい有効なオプションがあります。&lt;cdm\\_data\\_type&gt; (/docs/server-admin/datasets#cdm_data_type) グローバルな属性なので、データセットの値を見直し/変更する必要があります。
    * インスタグラムdatasets.xml, 新しい [&lt;sourceNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#sourceneedsexpandedfp_eq) ソースサーバが &_variable_\\=_value_ を正しく処理していない場合に便利です。 (なぜなら、[浮動小数点の平等性をテストする一般的な難しさ](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) お問い合わせ ソースNeedsExpandedFP\\_EQ デフォルトでtrueに設定される (最も安全な設定) 変更を加える必要はありません。
    * ニュース[EDDTableFromAsciiFiles (EDDTableFromAsciiFiles) からの投稿](/docs/server-admin/datasets#eddtablefromasciifiles)お問い合わせ ジェリー・ユン・パンに感謝します。
    * ニュース[EDDTableFromThreddsファイル](/docs/server-admin/datasets#eddtablefromthreddsfiles)お問い合わせ Roy Mendelssohn のおかげで.
    * 変更点[EDDTableFromNcFiles (EDDTableFromNcFiles) は、](/docs/server-admin/datasets#eddtablefromncfiles)より広い範囲のファイルで使用できます。
    * EDDTableFromBMDE は無効になっています。 アクティブ、適切なデータソースはありません。
    * GenerateDatasetXml では、新しいEDDGridフォードズ カタログがTHREDDSカタログ全体を収穫 (またはサブセット) 生成するdatasets.xmlコンテンツ UAFプロジェクトのおかげで
    * 生成データセット Xml と DasDds も結果を入れる\\[bigParentディレクトリ\\]/logs/log.txt ディレクティブ リッチ・シグネルとチャールズ・カルレトンのおかげで。
    * ログインシステムへの多くの改善 POSTのおかげで。
*    **お知らせERDDAP™プログラマ 知っておくべきこと:** 
    * /WEB-INF/lib/ ディレクトリに変更がありました。 javacとJavaのクラスパスの設定を変更してください。
    * 新規登録\\[お問い合わせ ウルル\\]/erddap/version はバージョンの決定を下すERDDAPお問い合わせ 応答はテキスト、例えば、ERDDAP\\_version=1.24 HTTP 404 Not-Found エラーメッセージが表示された場合は、ERDDAP™バージョン1.22以下 POSTのおかげで。
*    **小さな変更とバグ修正:** 
    
    * EDDTableFromの特長 変更点:
        * IOOSを読むためのサポートをドロップSOSXML 応答。
        * IOOSを読むためのサポートを追加SOSテキスト/csv. (だからNOSSOS現在サーバはサポートしていません。) 
        * IOOSに関連した変更の多くを作ったSOSサーバーの詳細。
        * IOOSのBBOXクエリのサポートを追加しましたSOSそして、OOSTethys SOSサーバ。 これらの変更は、関連するデータリクエストに対して大きなスピードアップをもたらします。 IOOSのおかげでSOSお問い合わせ
    * テキスト.mat表形式のデータファイルが正しく保存されます。 Roy Mendelssohn のおかげで.
    *   WMS
        *   OpenLayers現在バンドルされていますERDDAP™使用のためにWMSサイトマップ これは、問題が発生したときに発生した問題を修正しますOpenLayers数ヶ月前に変化し、将来の問題を防ぎます。
        * お問い合わせWMS GetCapabilities応答、&lt;オンラインリソース&gt; 値の URL は、WMSサービス。 シャルトン・ガルヴァリーノ(Charlton Galvarino)
        * 凡例を上に表示WMSカラーバーを表示するWebページ。 Emilio Mayorga のおかげです。
    *   EDDGridAggregateExistingDimensionコンストラクタは、軸のソースで問題がありました 値が目的地に等しくなかった ソースタイムが他のものだった場合など、値"seconds since 1970-01-01"お問い合わせ お問い合わせToddスピンドラー。
    * TableWriterGeoJson では、bbox の後の超過 '、\\[・・・\\]削除されました。 グレッグ・ウィリアムズに感謝します。
    * 多くの小さな変更とバグ修正。
    
## バージョン1.22{#version-122} 
 (公開日 2009-07-05) 

* 1.20に導入したSlideSorterのバグを修正しました。
* 1.20に導入したOBISのバグを修正しました。
* 画像/ガジェット/GoogleGadgetsページのJasonデータセットへの参照が削除されました。
     
## バージョン1.20{#version-120} 
 (公開日 2009-07-02) 

*   ERDDAP™管理者は、setup.xml ファイルに追加してください。
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* 新しいデータセットタイプ[EDDGridコピー](/docs/server-admin/datasets#eddgridcopy)そして、[EDDTableコピー](/docs/server-admin/datasets#eddtablecopy)別のローカルコピーの作成と維持EDDGridまたは EDDTable のデータセットのデータとローカルコピーからのデータを提供します。 これらは非常に使いやすく、非常に効果的です **リモートデータソースからデータを処理する最大の問題の解決:** 
    
    * リモートデータソースからのデータへのアクセスが遅い (様々な理由で) お問い合わせ
    * リモート・データセットは時々利用できません (様々な理由で) お問い合わせ
    * データを1つのソースに頼ることは、うまくスケールしない (たとえば、多くのユーザーと多くのユーザーERDDAPsはそれを利用します) お問い合わせ
    
さらに、ローカルコピーは元のバックアップであり、元の何かが起こる場合に便利です。
    
データセットのローカルコピーを作成することに関する新しいものはありません。 ここが新しくなったのは、このクラスがそれを作ることです。\\*簡単操作\\*作成し、\\*メンテナンス\\*ローカルデータのコピー\\*ジャンル\\*リモートデータソースの種類と\\*メタデータを追加\\*データのコピー中に。
    
これらのデータセットタイプは、作成を簡素化する機能の完全なセットの一部です[グリッド/クラスター/フェデレーションERDDAPツイート](/docs/server-admin/scaling)非常に重負荷を処理するため (例:データセンター内) お問い合わせ
    
* 新しいデータセットタイプ[EDDTableFromデータベース](/docs/server-admin/datasets#eddtablefromdatabase)ローカルまたはリモートデータベーステーブルからデータを取得します。
*   ERDDAP™現在、[セキュリティ](/docs/server-admin/additional-information#security)認証をサポートするシステム (ユーザーのログインを許可する) そして承認 (特定の個人データセットへのアクセスを許可する) お問い合わせ
* あります[2、新しい、コマンドラインツール](/docs/server-admin/datasets#tools)助けるためにERDDAP™管理者は新しいデータセットでXMLを生成しますdatasets.xml: : :
    * 生成データセット Xml は、ほぼすべての種類のデータセットに対して、データセット XML のラフドラフトを生成することができます。
    * DasDds は、XML を繰り返しテストし、データセットに精査するのに役立ちます。ERDDAPの GenerateDatasets XmlのWebページを削除しました。 セキュリティ上の理由から、一部のデータセットタイプのみがサポートされています。 新しいコマンドラインツールはより良いソリューションです。
* 新着情報[ステータスページ](/docs/server-admin/additional-information#status-page)だれでも許可して下さい (しかし、著しく管理者) ステータスを表示ERDDAP™どのブラウザからも\\[ベースUrl\\]/erddap/status.htmlお問い合わせ
* Tabledapは現在サポートしています[サーバー側の機能](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions): : :
    * ログイン () レスポンステーブルから重複行を削除し、
    * ・orderBy (・・・) 応答テーブルのソート方法を指定できます。
    * ・orderByMax (・・・) レスポンステーブルがソートされ、最後に指定した列の最大値以外のすべての行を削除する方法を指定できます。 たとえば、各駅の最終利用可能なデータを取得するために使用できます。
* 表データセットには、名前が付けられていない追加のdateTime変数が含まれるようになりました。"time"お問い合わせ これらの変数は "units" メタデータによって認識されます。" since "  (数値の日付 スケジュール) または "yy" または "yy" (文字列 dateTimes のフォーマット) お問い合わせ しかし、まだ使用してくださいdestinationName "time"主日の場合 時間変数。
*   ERDDAP™生成する[サイトマップ](/docs/server-admin/additional-information#sitemapxml)ファイルが、あなたの検索エンジンに伝えますERDDAP毎月のクロールのみが必要です。ERDDAP™管理者は、フォローしてください[これらの手順](/docs/server-admin/additional-information#sitemapxml)新しいsitemap.xmlファイルに関する検索エンジンに通知します。
*   ERDDAP's エラーメッセージは、クライアントにはるかに短く、装備されています (プログラマではない) お問い合わせ グレッグ・ウィリアムズに感謝します。
* ツイート&lt;リクエストブラックリスト&gt; (/docs/server-admin/datasets#requestblacklist) また、最後の番号が\\*に置換されたIPアドレスもサポートしています。
* リクエスト.json.geoJson ファイルにはオプションが含まれている場合があります。[jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)「&リクエスト」を追加することで.jsonクエリの最後に p=_functionName_" を指定します。 基本的には、これはちょうど伝えますERDDAP™"_functionName_" を追加 (「応答の先頭へ」) " 応答の最後に。 最初にクエリがなかった場合は、クエリの "&" をオフにします。 グレッグ・ウィリアムズに感謝します。
* 新規統計の多くが追加されました[デイリーレポート](/docs/server-admin/additional-information#daily-report)お問い合わせ
* データセット、機関、IDの一覧が記載されているWebページでは、現在すぐに利用できます。 これは、サブスクリプションや他の有用な列を狭いコンピュータ画面で表示します。
* すべてのWebページでは、ページのタイトル(に基づく)&lt;title&gt; で&lt;set.xml で定義する startHeadHtml&gt; は、Web ページのより良い説明を含めるように変更されます。 (たとえば、現在のデータセットのタイトルと機関を含む) お問い合わせ
* Xmx情報はlog.txt、Daily Report、Status.htmlで印刷されたメモリ情報に含まれています。 エルリン・モンゴメリーに感謝します。
*   ERDDAP™すべてのエラーに対する追加、汎用性保護 (例:OutOfMemoryError) お問い合わせ チャールズ・カルレトン(Charles Carleton)
* 応答が既にコミットされている場合、エラー処理の改善。
* 改善:EDDTableFromFilesおよびEDDGridFromFilesが許可するようになりました&lt;metadataFrom&gt; 最初か最後まで。 penultimate はサポートされていません。 そして、最初に最後にはファイルの lastModifiedTime に基づいています。
* バグ修正:EDDTableFromSOS, 1つの場所の無効な情報は例外を投げ、データセット全体が拒否されるように引き起こしました。 今、これらのステーションは無視されます (エラーメッセージがlog.txtに記録されます) お問い合わせ Rick Blairのおかげで.
     

## バージョン1.18{#version-118} 
 (公開日 2009-04-08) 

* バグ修正: 1.14 以降、EDDTable Data Access Form で、グラフのウェブページが引用された制約に正しく対処しなかった。
* バグ修正: 1.14 以降、EDDTableFromDapSequence は、ソースタイムユニットが "1970-01-01T00:00:00 以降秒でない場合、タイム制約を正しく処理しませんでした。
     

## バージョン1.16{#version-116} 
 (公開日 2009-03-26) 

*   ERDDAP™管理者:
    * これは重要なリリースです。バグが残っているので、ERDDAP™Tomcat Managerを使用してストップ/スタートまたはリロードに使用した場合のスレッド実行ERDDAPお問い合わせ 1.16 をインストールすると、Tomcat 管理者が古いものを元に戻すことはできません。ERDDAP™新規展開ERDDAPお問い合わせ 代わりに: **古いものERDDAP™, Tomcat を再起動する (またはサーバー) それから新しい展開しますERDDAPお問い合わせ** 新しいバージョンをインストールするとき、常に良い考えです。
    * お問い合わせ&lt;リクエストブラックリスト&gt;&lt;/requestブラックリスト&gt; (/docs/server-admin/datasets#requestblacklist) あなたへdatasets.xmlお問い合わせ これは、ブロックされるクライアントIPアドレスのリストを指定するために使用されます (例えば、サービス攻撃の拒否や過度なWebロボットを阻止するために) お問い合わせ
* 今、そこにあります\\[bigParentディレクトリ\\]/logs ディレクトリは、ERDDAP™ログファイル。 はじめにERDDAP™log.txt と log のアーカイブコピーを作成します。 時間スタンプで txt.previous ファイル。 再起動前のトラブルがありましたら、これらのファイルを分析するのに便利です。
*   ERDお問い合わせERDDAP™サブスクリプションシステムがオンになっています。
*   ERDDAP™再び使える (しかし、まだお勧めしません) リクエスト URL の "%26" のエンコーディング (見る[関連v1.14変更](#percent26)) お問い合わせ
* Tally セクションへのいくつかの新しい追加[デイリーレポート](/docs/server-admin/additional-information#daily-report)お問い合わせ
* 小さなバグは、generateDatasetsXml で修正します。
* いくつかの小さなバグ修正。
     

## バージョン1.14{#version-114} 
 (公開日 2009-03-17) 

* ユーザーの変更:
    * 格子データ要求では、ERDDAP™今すぐサポート:[最後のn](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)n が整数のインデックスであり、[ (最後のd) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)d が数値の値である場合 (秒単位で) お問い合わせ
    * 表形式のデータリクエストでは、文字列制約が要求されるようになりました[二重引用符](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)例:&id="NDBC40121" これは必須ですDAPプロトコル。
    * 表形式のデータリクエストで、ERDDAP™今、要求する[すべての制約は適切にエンコードされるパーセント](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode)お問い合わせ ブラウザはこれを自動的に行うので、これは主にアクセスしているコンピュータプログラム/スクリプトに影響を与えますERDDAPお問い合わせ
#### パーセント26{#percent26} 
*   [以前は、](#percent26)お問い合わせ[グラフのWebページを埋め込む](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)そして、[ERDDAP™Googleガジェットのウェブページ](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)画像のURLに「&」を「%26」に置き換える これからはイメージのURLに「&」を「&amp;」に置き換えてください。 既存のWebページやGoogle Gadgetsで「&amp;」に「%26」を置き換える必要があります。 (お問い合わせ) 
*   ERDDAP™管理者は、以下にお願いします:
    * 以下を追加してください。[セットアップ。xml](/docs/server-admin/deploy-install#setupxml)ファイル (フラグを変更 KeyKey 値) : : :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * 後ライン&lt;メールアドレス:[セットアップ。xml](/docs/server-admin/deploy-install#setupxml)ファイル、追加
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
パスワードを入力してください。
    * 変更できます&lt;wmsSampleBBox&gt; で[セットアップ。xml](/docs/server-admin/deploy-install#setupxml)縦度値を最大 360 まで含めるファイルなど、
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * お問い合わせdatasets.xmlfile, データセット型 EDDTableFromNc4DFiles を EDDTableFromNcFiles に変更 (これで、任意の数の次元でファイルをサポートしています) お問い合わせ EDDTableFromNc4DFiles データセットをお持ちの場合:
        
        1. データセットのtype="EDDTableFromNcFiles"に変更する必要があります。 XMLファイル。
        2. あなたが追加しなければならない&lt;n次元&gt; 3&lt;/nDimensions&gt; は、データセットのXMLにタグ付けします。
        3. 新規追加する&lt;sortFilesBySourceNames&gt; タグは、ファイルの内部の順序を指定し、データの全体的な順序を決定します。
        
詳しくは、[EDDTableFromFiles (EDDTableFromFiles) は、](/docs/server-admin/datasets#eddtablefromfiles)お問い合わせ
    * 過去に、EDDTableFromDapSequence のOPeNDAPDRDSサーバー、datasets.xml、私達は使用しました&lt;ソースCanConstrainStringsRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. しかし、DRDS regexのサポートがより制限されていることを見るようになりましたERDDAPお問い合わせ&lt;sourceCanConstrainStringsRegex &gt; リリース&lt;/sourceCanConstrainStringRegex&gt; regex制約がソースに渡されないため、代わりに処理されますERDDAPお問い合わせ
    * sourceCanConstrain のリバンプ処理 お問い合わせdatasets.xmlによって[EDDTableFromDapSequence (EDDTableFromDapSequence) の使い方](/docs/server-admin/datasets#eddtablefromdapsequence)そして、 (内部に) すべてのEDDTableデータセットタイプ。 新しいシステムはシンプルで、異なるデータソースの分散性を反映しています。 データセットのXMLを変更する必要がありますdatasets.xmlお問い合わせ
* 自身で有用であるいくつかの新機能がありますが、組み合わせると、作成を容易にする[グリッド/クラスター/フェデレーションERDDAPツイート](/docs/server-admin/additional-information#grids-clusters-and-federations)お問い合わせ
    * 新しいデータセットタイプ:
        *   [EDDGridErddapから](/docs/server-admin/datasets#eddfromerddap)そして、[EDDTableFromErddapの特長](/docs/server-admin/datasets#eddfromerddap)1 つをERDDAP™別のデータセットを含むERDDAP™非常に簡単で、非常に効率的な方法で。
        *   [EDDGridファイルから](/docs/server-admin/datasets#eddgridfromfiles)  (そしてそのサブクラス、[EDDGridからNcFiles](/docs/server-admin/datasets#eddgridfromncfiles)読むことができます。NetCDF .nc、GRIB .grbおよびHDF .hdfファイル) お問い合わせ
        *   [EDDTableFromNcFiles (EDDTableFromNcFiles) は、](/docs/server-admin/datasets#eddtablefromncfiles)読むことができます。NetCDF .ncテーブルのような構造をもつ。
    * RunLoadDatasets と LoadDatasets が変更されました。ERDDAP™ファイルのファイルに基づいてデータセットをリロードすることが非常に反応します[ログイン](/docs/server-admin/additional-information#flag)ディレクトリ (often)&lt;主 loadDatasets が現在実行されている場合は 5 秒。
    * 許可する新しいサービス[フラグファイルを作成するURL](/docs/server-admin/additional-information#set-dataset-flag)与えられたデータセットについては、例えば、
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
rPmelTao のフラグディレクトリにフラグファイルを作成する (フラグが ここでのキーは間違っています) お問い合わせ
    * ニュース[サブスクリプション](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)特定のデータセットが作成されるときに行われるアクションを指定できるようにサービス (いつかERDDAP™再起動) データセットが何らかの方法で変更される場合。 このシステムが無効にすることができます&lt;サブスクリプションシステムアクティブ&gt; で[セットアップ。xml](/docs/server-admin/deploy-install#setupxml)ファイル。 ザ・オブ・ザ・ERDDAP™ [デイリーレポート](/docs/server-admin/additional-information#daily-report)これで、すべてのサブスクリプションをリストし、システムが乱用していると感じた場合、各サブスクリプションをキャンセルするために必要なURLが含まれています。 インスタグラムdatasets.xml, 新しい, オプション [&lt;サブスクリプション メールブラックリスト&gt; (/docs/server-admin/datasets#subscriptionemailblacklist) 管理者がサブスクリプションシステムから即座にブラックリストされているメールアドレスのコンマ区切りリストを指定できるようにタグ付けします。
    * 新着情報&lt;変更&gt; (/docs/server-admin/データセット#onchange) 属性 indatasets.xmlお問い合わせERDDAP™管理者は、特定のデータセットを作成するときに行われるアクションを指定します。 (いつかERDDAP™再起動) データセットが何らかの方法で変更される場合。
    * 完全なテキスト検索の改善:各データセットの検索文字列を格納すると、メモリの1/2を使用します。 検索アルゴリズム (ボーイルモアのような) 3倍高速化しました。
    * 電子メールERDDAP™常に被写体とコンテンツを優先する\\[エルダップ ウルル\\]、それが明確になるようにERDDAP™から来た (複数人を管理する場合ERDDAPツイート) お問い合わせ
    * より広範な統計収集のための[デイリーレポート](/docs/server-admin/additional-information#daily-report)メールアドレス
    * 新しいログファイル\\[bigParentディレクトリ\\]/emailLogYEAR-MM-DD.txtは、送信されたすべてのメールをログアウトしますERDDAP™一日中。 サーバーが実際に電子メールを送信できない場合は、これは特に便利です。ログに少なくともそれらを読み込みます。
    *   ERDDAP™これで、\\[bigParentディレクトリ\\]/キャッシュ/ (datasetID) キャッシュされたファイルがたくさんあるため、各データセットのディレクトリ。
* ニュース[RSSバージョン1](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)各データセットのフィード (オレンジを探しますRSSデータセット、データアクセスフォーム、グラフのWebページのリストに関するアイコン) お問い合わせ
*   EDDGrid .kmlチルド画像を使用した応答 ("superoverlays" -- 動的に生成されたクォードツリー画像) お問い合わせ 初期の画像は、以前のよりもはるかに高速なGoogleEarthに読み込まれます。 地図の解像度は、ズームインすると増加します。, データセットの完全な解像度まで. Recommend: ユーザーのリクエスト.kml一方、データセットの全経度、緯度範囲。 残念ながら、時間範囲のサポートは削除されました (お問い合わせ) お問い合わせ
*   ERDDAP™追加する[Expires と Cache-Control ヘッダー](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)/images ディレクトリから要求される全てのファイルへ。 これにより、送信された静的ファイルのリクエスト数を大幅に削減できます。ERDDAPそして従ってほとんどをスピードをあげますERDDAP™ページの読み込み その他、多数Javaスクリプトファイル参照は、HTMLページの下部に移動し、また多くのスピードをあげますERDDAP™ページの読み込み Steve SoudersとFireFoxのFireBugプラグインへのySlowの追加による「高性能Webサイト」の本のおかげで。
*   ERDDAP™netcdf-java 2.2.22 から netcdf-java 4.0 へ切り替えます。 その他にも、EDDGridFromNcFiles から読み込むHDF .hdf, だけでなく、GRIB .grb とNetCDF .ncファイル。
*   EDDGridFromDap とEDDGridFromNcFiles も DArray をサポート (同様に DGrid)  dataVariableお問い合わせ 次元が対応する座標変数を持たない場合、ERDDAP™インデックス値で軸変数を作成する (例: 0, 1, 2, ..., 311, 312) お問い合わせ だから、他のすべての側面EDDGrid同じまま:
お問い合わせ 各次元の軸線変数を持つGridsとしてすべてのデータセットを提供します。
お問い合わせ Queries は axis 変数から値をリクエストできます。
チャールズ・カルレトン、トーマス・イン、ドリアン・レイマー、その他
* ザ・オブ・ザ・WMS OpenLayersこのページには、データセットの範囲よりも少し大きいデフォルトの経度、緯度範囲があります (厳密な範囲ではないので、小さなデータセットのコンテキストはより明らかです) お問い合わせ デフォルト範囲は 0 から 360 で、現在多くのデータセットのフル レンジを表示できるようになりました。 お問い合わせToddスピンドラー。
* 一部のデータアクセスフォームで新しいスライダを作成し、グラフのWebページを作成します。 シンプルに (ログイン) 目的のデータの指定はよい視覚フィードバックを提供します。
* 新しいオプション&lt;データセット&gt; タグdatasets.xml: : :[アクティブ="false"](/docs/server-admin/datasets#active)お問い合わせ
* 参考文献ERDお問い合わせERDDAP™Coastwatch.pfelから変更 (それでもプロキシを介して動作します) Coastwatch.pfeg へ (お問い合わせ) お問い合わせ
* 新しいサポート[data\\_minそして、data\\_max](/docs/server-admin/datasets#data_min-and-data_max)変数メタデータ属性。
* 部分的なソリューション[WaitThenTryAgain / 部分的な結果 例外](/docs/server-admin/additional-information#waitthentryagain-exception): : : これで、データソース変更が検出されたときに以前に失敗したリクエストが成功するので、ERDDAP™データセットをリロードし、データを自動的に再リクエストし、元のリクエストのコンテキストにあるすべてのデータを復元します。
* バグ修正: 生成 データセット Xmlは無効になっていますERDDAP™バージョン1.12. エルリン・モンゴメリーは、このアウトを指摘していただきありがとうございます.
* エラー処理への小さな変更。
* 可能なレース条件で回避/拒否する多くの改善 (i.e.、マルチスレッドの性質から生じる可能性のある問題ERDDAP) 小さい、不十分な問題を引き起こしました。
* これで、エラーメッセージが画像に書かれている場合、画像はキャッシュにのみ5〜10分間滞在します (ない 60) お問い合わせ Cara Wilson のおかげで.
* データがない場合の標準的なメッセージは「あなたのクエリは一致する結果を作り出しません。」、より短く、より正確であり、マッチしますOPeNDAPサーバ。
*   EDDGridもはや結ばれた軸線の価値を可能にします。
* .ver と .help リクエストへの小さな変更。
* 多くの小さな変更とバグ修正。
     

## バージョン1.12{#version-112} 
 (公開日 2008-10-31) 

* EDDTableFromの特長SOS再びNDBCで動作するSOS新しいNOSで働き、SOSお問い合わせ
* EDDTableFromBMDE 今要求しますERDDAP™管理者が指定するdataVariableお問い合わせ
*   EDDGridlat と lon が均等に間隔をあける必要はなくなりました。 トランスペアレント ピンまたは.kmlお問い合わせ お問い合わせToddスピンドラー。
* 小さな変更が少ない。
     

## バージョン1.10{#version-110} 
 (公開日 2008-10-14) 

* データの変数の「colorBar」メタデータの新しいメタデータdatasets.xmlグラフとマップのデフォルトカラーバーの設定を定義します。 お問い合わせ[詳細情報](/docs/server-admin/datasets#color-bar-attributes)お問い合わせ これは、デフォルトグラフとマップが、クライアントが要求された時間や地理的な範囲を変更する場合でも、一貫性のあるカラーバーを持っているので、グラフを作成することによって生成されたデフォルトのグラフとマップの外観を大幅に改善するので、重要です。 また、これは必要だったWMSお問い合わせ
*   ERDDAP™現在、ほとんどのグリッドデータを経由して利用できるようになりました。WMSサービス。 多くのデータサーバからデータを取得するだけでなく、ERDDAP™異なるプロトコルを介してデータを配布することができます (DAP,WMS、...未来の多く) お問い合わせ 詳細はこちら[クライアントのドキュメント](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html)お問い合わせ または[管理者向けドキュメント](/docs/server-admin/datasets#wms)お問い合わせ または[お問い合わせ](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html)お問い合わせ
* 経度値の新しいサポート &gt;180.kmlファイル。
* 新しいcdm\\_data\\_type: その他 .
*   ERDDAP™「boolean」のソースdataTypeをサポートしています。 お問い合わせ[詳細情報](/docs/server-admin/datasets#boolean-data)今後 EDDTableFromDatabase が使えるようになります。
* EDDTableFromBMDE は DiGIR/BMDE のデータソースをサポートしています。
* EDVGridAxis では、ソートされた値を下降できるようになりました。 pmelOscar データセットはこれを必要としていました。
*   ERDDAP™HTTP エラーを返すようになりました (例:「リソース/ページが見つからなかった404」) エラーメッセージのHTMLページではなく、より多くの状況で。
* 変更/変更のロットERDDAP™ドキュメント。
* 小さな変化の多く。
* いくつかのバグ修正。
*    **お知らせERDDAP™管理者はこのバージョンにアップグレードする必要があります。** 
    * インスタグラムdatasets.xml, 任意のEDDTableFromのためSOSデータセットは「observedProperty」メタデータを「sourceObservedProperty」に変更します。
    * ルールについてaxisVariableまたはdataVariableお問い合わせdestinationNameこれから[厳しい](/docs/server-admin/datasets#datavariable-addattributes)お問い合わせ 変数名が有効であることを確認する必要があります。 手動で確認するか、または実行するかERDDAP™管理者にメールが送信されたレポートのエラーメッセージを見てください。
    * インスタグラムdatasets.xml, グリッドデータ変数を経由してアクセスできるようにしたい場合WMSカラーバーメタデータを追加する必要があります。 少なくとも、例えば、&lt;att 名称colorBarMinimum"type="double"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
お問い合わせ[詳細情報](/docs/server-admin/datasets#wms)お問い合わせ
    * 以下を追加してください。[セットアップ。xml](/docs/server-admin/deploy-install#setupxml)ファイル (しかし、あなたの情報とそれをカスタマイズして下さい) : : :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## バージョン 1.08{#version-108} 
 (公開日 2008-07-13) 

* 新しいウェブサービスERDDAP™, 生成 データセット Xml の援助ERDDAP™管理者は、XMLのラフドラフトを作成して、データセットを記述する必要がありますdatasets.xml
* 一部の変更/バグ修正では、griddap が opendap サーバとして netcdf-java で見られるようにしました。これには、グローバルメタデータは「NC\\_GLOBAL」にラベル付けされています。 (「GLOBAL」の代わりに) お問い合わせ
* ザ・オブ・ザ・EDDGridEDDTable Data Access Forms は、URL でクエリ情報を利用できるようになりました。 そのため、例えば、ユーザーが Make A Graph フォームから Data Access Form へ進むと、制約が適切に転送されます。
*   tabledap's Make A Graph では、文字列変数の制約ができるようになりました。
* EDDTable の Make A Graph では、NaN 制約ができるようになりました。 スティーブ・ハンキンに感謝します。
* バグ修正:EDDTable保存 AsImage は .colorbar min と max の値を正しく認識しなかった。 スティーブ・ハンキンに感謝
* setupDatasetsXml への多くの改良。 エルリン・モンゴメリーに感謝します。
* Griddapリクエストが許可できるようになりました () - 実際の軸線の範囲の外で若干のスタイル要求。 より適しています。 () -値が最も近い実際の値に丸めされます。 シンディ・ベシー
* isEvenlySpaced の FloatArray と DoubleArray のテストをさらに洗練されたものにしました。 それは常に不完全です (テストは各データセットのためにカスタマイズする必要があるので) しかし、それはより良いはずです。 エルリン・モンゴメリーに感謝します。
* setup.html と setupDataset を移動しました。 Xml.html erddap の /download ディレクトリとハード コードされたすべてのリンク。 これで、すぐに設定情報を変更して更新することができます。
* 多くの小さな変化。 いくつかの小さなバグ修正。
*    **お知らせERDDAP™管理者はこのバージョンにアップグレードする必要があります。** 
    * 交通アクセス&lt;ショート説明 メッセージ.xml からメッセージへの Html&gt;[セットアップ。xml](/docs/server-admin/deploy-install#setupxml)ファイル。 左側の中央に表示されるテキストを指定します。ERDDAP™サイトマップ また、追加&lt;h1&gt;ERDDAP&lt;/h1&gt; (または他の見出し) 一番上へ。 **または、** コピー&lt;theShortDescriptionHtml&gt; 新規[セットアップ。xml](/docs/server-admin/deploy-install#setupxml)ファイル (新しい erddapContent から.zip) setup.xml へ。
         

## バージョン 1.06{#version-106} 
 (公開日 2008-06-20) 

* 新しいサポートIOOS DIF SOSデータソース。
* 多くの小さな変化。 いくつかの小さなバグ修正。
     

## バージョン 1.04{#version-104} 
 (公開日 2008-06-10) 

* 新しいスライドソーター機能。
* 新しいGoogle Gadgetsページと例。
* バグ修正EDDGrid.saveAsNc は、スケールと addOffset の変数です。
     

## バージョン 1.02{#version-102} 
 (公開日 2008-05-26) 

* ニュースEDDGridSideBySideは異なるaxisVariableツイート\\[0 の 0\\]ソース 価値。
* 現在および風データセットはすべてに統合されましたEDDGridSideBySide データセット。
* 画像リクエストの画像は1時間キャッシュされます。
     

## バージョン 1.00{#version-100} 
 (公開日 2008-05-06) 

* グラフのWebページとURLのグラフィックコマンドを作成します。
* フラグファイルのサポートにより、データセットを強制的にリロードできます。
* 新しいデータセットタイプ:EDDTableFrom4DFiles (EDDTableFromFiles の最初のサブクラス) お問い合わせ
