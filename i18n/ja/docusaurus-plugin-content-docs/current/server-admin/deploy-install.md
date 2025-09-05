---
sidebar_position: 1
---

# インストール
初期設定を行う方法 ERDDAP™ サーバー

 ERDDAP™ どのサーバーでもサポートできる Java トムキャット (また、Jetty などのアプリケーションサーバはサポートしていません。) お問い合わせ
 ERDDAP™ Linux でテスト済み (Amazon の AWS を含む) 、MacおよびWindowsコンピュータ。

*  **ドッカー** お問い合わせ 提供サービス [ ERDDAP™ Dockerコンテナ](https://hub.docker.com/r/erddap/erddap) 
そしてIOOSは今提供します [クイックスタートガイド ERDDAP™ Dockerコンテナ](https://ioos.github.io/erddap-gold-standard/index.html) お問い合わせ
それは標準です ERDDAP™ ドッカーコンテナにインストールします。
Dockerを通して sslおよび監視をセットアップする容易な方法を提供しましたり、多くをで読んで下さい [ドッカー文書](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) お問い合わせ
Docker を既に使用している場合は、Docker のバージョンが優先されます。
クラウドサービスで実行したい場合は、おそらく Docker バージョンを好むでしょう。
*  **アマゾン** お問い合わせ インストールしている場合 ERDDAP™ Amazon Web Services EC2 インスタンスで、これを参照してください。 [Amazon Webサービス概要](/docs/server-admin/additional-information#amazon) まずは。
*  **LinuxとMac** お問い合わせ ERDDAP™ Linux および Mac コンピューターで動作します。 以下の手順を参照してください。
*  **ウィンドウズ** お問い合わせ Windowsはテストのために良いです ERDDAP™ 個人的な使用のために (以下の手順を参照してください。) ,
しかし、公に使用することをお勧めしません ERDDAP™ 導入事例 ランニング ERDDAP™ Windowsで問題があるかもしれません:
確かに、 ERDDAP™ ファイルを素早く削除したり、名前を変更したりすることはできません。 これはおそらくアンチウィルス ソフトウェアのためです
   (例:McAfeeとNorton) ウイルスのファイルをチェックしています。 この問題に遭遇した場合
(エラーメッセージで表示できる) [ログイン](/docs/server-admin/additional-information#log) ファイルのような
「削除できません...」と、アンチウイルスソフトウェアの設定を変更すると、部分的に問題を軽減することができます。 または、代わりにLinuxまたはMacサーバーを使用して検討してください。

 **標準規格 ERDDAP™ Linux、Mac、およびWindowsコンピュータのインストール手順は次のとおりです。** 

0. 依存関係がインストールされていることを確認してください。 非Windowsマシンで (LinuxとMac) csh が必要です。

##  Java  {#java} 

1.  [お問い合わせ ERDDAP™ v2.19+, 設定 Java 21. .](#java) 
セキュリティ上の理由から、最新バージョンを使用するのはほぼ常に最善です Java 21. .
最新バージョンをダウンロードしてインストールしてください
    [採用のOpenJDK (テムリン) 21日 (ツイート) ](https://adoptium.net/temurin/releases/?version=21) お問い合わせ
インストールを確認するには、たとえば `/javaJreBinDirectory/java -version` を実行します。
`/usr/local/jdk-21.0.3+9/jre/bin/java -バージョン`。

    ERDDAP™ 作品紹介 Java 他のソースから, しかし、我々はそれがメインであるので、, コミュニティをサポート,
無料 (ビール・スピーチ) バージョン Java 長期的なサポートを提供する21 (初期リリースを過ぎた数年間無料アップグレード) お問い合わせ
セキュリティ上の理由は、更新してください ERDDAP 's バージョン Java 定期的に新しいバージョンとして Java 採用から21が利用可能になりました。

    ERDDAP™ 他のバージョンではなく21と広範囲にテストされ、使用されました。 様々な理由で、他のバージョンの対応やサポートは行いません。 Java お問い合わせ
     
## トムキャット{#tomcat} 

2.  [セットアップ](#tomcat)   [トムキャット](https://tomcat.apache.org) お問い合わせ Tomcatは最も広く使用されている Java アプリケーション サーバー,
お問い合わせ Java オペレーティングシステムのネットワークサービスと Java サーバソフトウェアのような ERDDAP™ お問い合わせ
それは自由で、オープンソースソフトウェアです (フォス) お問い合わせ

別の使い方 Java アプリケーションサーバ (例:Jetty) ですが、Tomcat のテストとサポートのみです。

   * Tomcatをダウンロードし、サーバーまたはPCに解凍します。
セキュリティ上の理由から、Tomcat 10の最新バージョンを使用するのはほぼ常に最善です (バージョン9以下は受け付けておりません。) 
機能するように設計されています Java 21 以降 以下では、Tomcat ディレクトリは `tomcat` と呼ばれます。

__学習&#33;__ すでに他のWebアプリケーションを実行しているTomcatを持っている場合 (特にTHREDDS) 、私達は取付けることを推薦します ERDDAP™ お問い合わせ
      [2 番目の Tomcat](/docs/server-admin/additional-information#second-tomcat) , ので ERDDAP™ 異なる Tomcat の設定が必要
メモリの他のアプリケーションと対峙する必要はありません。

     * Linux では、 [「Core」をダウンロード .gz 「Tomcat分布」](https://tomcat.apache.org/download-10.cgi) そしてそれを解凍して下さい。
`/usr/local` にアンパックすることを推奨します。
     * Mac では、Tomcat は既に `/Library/Tomcat` にインストールされていますが、Tomcat 10. の最新バージョンにアップデートする必要があります。
ダウンロードしたら、 [「Core」をダウンロード .gz 「Tomcat分布」](https://tomcat.apache.org/download-10.cgi) そして`/Library/Tomcat`でそれを解凍して下さい。
     * Windowsでは、できます ["Core" "zip" Tomcat配布をダウンロード](https://tomcat.apache.org/download-10.cgi) 
        (WindowsレジストリとDOSコマンドラインから制御しない) 適切なディレクトリに解凍します。
        (開発にあたっては、「コア」の「zip」の配布を使用します。 `/programs` ディレクトリを作り、それを解凍します。) 
または、より多くの機能を含む「コア」64ビットWindows zipの配布をダウンロードすることができます。
ディストリビューションが Windows インストーラーの場合、Tomcat を、例えば `/Program Files/apache-tomcat-10.0.23` とします。
             
### サーバ.xml{#serverxml} 

*  [サーバ.xml](#serverxml) - `tomcat/conf/server.xml` ファイルでは、2 つごとに作る2つの変更があります。 <Connector> タグ
   (`&lt;コネクターポート="8080"` と `&lt;コネクタポート="8443"` の 1 つ) お問い合わせ
   1.  (おすすめ商品) `connectionTimeout` パラメータ値を 300000 に増加させる (ミリ秒, 5 分) お問い合わせ
   2.  (おすすめ商品) 新規パラメーターを追加: `relaxedQueryChars="[] | お問い合わせ これは任意および少しより安全です、
しかし、ユーザのリクエスト URL のパラメーターで発生したときに、ユーザがこれらの文字をパーセントエンコードする必要性を削除します。
             
### コンテンツ。xml{#contentxml} 

* コンテキスト.xml お問い合わせ リソースキャッシュ - 直前に `tomcat/conf/context.xml` で ` </Context> `タグ、リソースタグを変更する
   (既に存在していない場合は、または追加してください。) キャッシュを設定する 80000へのMaxSize変数:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
これは、カタリナで多数の警告を回避します。 まずは、
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache のタイムアウト{#apache-timeout} 

* Linux コンピューターで、Apache のタイムアウト設定を変更して、時間のかかるユーザリクエストはタイムアウトしません。
   ("Proxy" または "Bad Gateway" エラーとして表示されるもの) お問い合わせ rootユーザとして:
  * Apache の変更 http d.conf` ファイル (通常は `/etc/ http d/conf/ ツイート) : : :
    * 既存の `を変更 <Timeout> 設定 (またはファイルの最後に 1 つを追加) から 3600 (秒単位) デフォルト60秒または120秒の代わりに。
    * 既存の `を変更 <ProxyTimeout> 設定 (またはファイルの最後に 1 つを追加) から 3600 (秒単位) デフォルト60秒または120秒の代わりに。
  * Apache の再起動: `/usr/sbin/apachectl -k 優雅な ツイート (しかし、時々それは別のディレクトリにあります) お問い合わせ

### セキュリティ{#security} 
         
* 保証勧告: お問い合わせ [これらの手順](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) セキュリティを高めるため
特に公共サーバー用のTomcatのインストール。
         
* パブリック ERDDAP™ Linux と Mac のインストールでは、Tomcat の設定が最適です。 (プログラム) ユーザの `tomcat' に属する ツイート
   (限られた権限を持つ別のユーザー [パスワードがない](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) お問い合わせ
したがって、スーパーユーザのみがユーザ `tomcat` として動作するように切り替えることができます。 これは、ユーザ `tomcat` として、ハッカーがサーバーにログインすることができません。
また、サーバーのファイルシステム(read+write+execute 権限)で `tomcat` のユーザが非常に限られた権限を持っているように、任意の場合には、それをしなければなりません。
`apache-tomcat` ディレクトリツリーと ` <bigParentDirectory> ディレクトリの ` と 読み込み専用権限 と データ ERDDAP™ アクセス方法
  * `tomcat` ユーザーアカウントを作成できます。 (パスワードがない) コマンドを使って:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * ユーザ `tomcat` として動作するように切り替えることができます。 コマンドを使う
    ```
    sudo su - tomcat
    ```
     (これを行うには、スーパーユーザのパスワードが必要です。) 
    * コマンドを使用してユーザのtomcatとして動作を停止することができます
    ```
    exit
    ````
    * トムキャットの残りの部分を最大限に活用し、 ERDDAP™ ユーザ `tomcat` として設定する手順。 その後、`startup.sh` と `shutdown.sh` スクリプトをユーザ `tomcat として実行します。 ツイート
Tomcat がログファイルに書き込む権限を持つようにします。
    * Tomcat を解凍した後、 `apache-tomcat` ディレクトリの親から:
      * apache-tomcat ディレクトリツリーの所有権を tomcat ユーザに変更します。
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (しかし、Tomcatディレクトリの実際の名前を置き換える) お問い合わせ
      * "group" を tomcat、ユーザー名、または tomcat を含む小さなグループの名前、Tomcat のすべての管理者に変更します。 ERDDAP : : :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * tomcat とグループが読み取り、書き込み、権限を実行できるように権限を変更します。
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * "other" のユーザ権限を読み取り、書き込み、または実行します。
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
これは重要なことです。他のユーザーが読み込むのを防ぐため、機密情報を読み込みます。 ERDDAP™ 設定ファイル。

### メモリ{#memory} 

Tomcatの環境変数を設定する

* LinuxとMacの場合:
ファイルを作成する `tomcat/bin/setenv.sh ツイート (またはRed Hat Enterprise Linuxで \\[ フリル \\] , 編集 `~tomcat/conf/tomcat10.conf ツイート) Tomcat の環境変数を設定する。
このファイルは `tomcat/bin/startup.sh` と `shutdown.sh` で使用されます。 ファイルには以下のようなものが含まれている必要があります。
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (しかし、コンピュータからディレクトリ名を置き換える) お問い合わせ
   (以前に `JRE_HOME` を設定すると、その削除ができます。) 
Macでは、`JAVA_HOME` を設定する必要はありません。

* Windowsで:
Tomcat の環境変数を設定するファイル `tomcat\bin\\setenv.bat` を作成します。
このファイルは `tomcat\bin\\startup.bat` と `` で使用されます。 shutdown.bat お問い合わせ
ファイルが以下のようなものを含んでいる必要があります。
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (しかし、コンピュータからディレクトリ名を置き換える) お問い合わせ
ローカルテストだけの場合、"-server" を削除します。
   (以前に `JRE_HOME` を設定すると、その削除ができます。) 

`-Xmx` と `-Xms` のメモリ設定は重要なので ERDDAP™ より多くの記憶とよりよい働かせて下さい。
`-Xms` を `-Xmx` と同じ値に設定します。

* 32ビットのオペレーティング システムおよび32ビットのため Java : : :
64ビット Java 32ビットよりもはるかに優れています Java 32ビット Java サーバが本当に忙しくない限り動作します。
サーバの物理メモリがより良くなる: 4 GBは本当に良いです、2 GBは大丈夫です、より少ないお勧めしません。
32ビットを使って Java 、豊富な物理的な記憶、Tomcatおよび Java '-Xmx` を 1500M 以上設定しようとすると動作しません (一部のコンピュータで1200M) お問い合わせ
サーバがメモリの2GB未満の場合、`-Xmx` 値が減ります。 ('メガバイト) コンピュータの物理的な記憶の1/2に。

* 64ビットオペレーティング システムおよび64ビットのため Java : : :
64ビット Java 64ビットオペレーティングシステムで動作します。
  * と Java 8、`-d64` を Tomcat`CATALINA_OPTS` パラメータに `setenv.bat` に追加する必要があります。
  * と Java 21、64ビット Java バージョンをダウンロードするとき Java マークされた「64ビット」。

64ビットを使って Java , トムキャットと Java 非常に高い `-Xmx` と `-Xms` の設定を使用できます。 サーバの物理メモリが向上しました。
シンプルな提案として、`-Xmx` と `-Xms` をセットすることを推奨します。 ('メガバイト) に 1/2 (以下) コンピュータの物理的な記憶の。
Tomcat かどうかを確認できます。 Java と ERDDAP™ 確かに「ビット」を検索して64ビットモードで実行されている ERDDAP '毎日レポートメール
または `bigParentDirectory/logs/ [ログイン](/docs/server-admin/additional-information#log) ファイル (`bigParentDirectory` は、 [セットアップ。xml](#setupxml) ) お問い合わせ

#### ゴミ収集{#garbage-collection} 

* インスタグラム ERDDAP™ お問い合わせ [ログイン](/docs/server-admin/additional-information#log) "GC" と表示します。 (配分の失敗) メッセージ
これは通常問題ではありません。 普通の操作から頻繁にメッセージです Java マイナーなごみを終わらせると言った
エデンの部屋から出てきたコレクション (セクションのセクション Java 非常に若いオブジェクトのヒープ) お問い合わせ 通常、メッセージが表示されます
"memoryUseBefore-&gt;memoryUseAfter`。 その2つの数字が一緒に閉じれば、ゴミ収集は生産的ではないことを意味します。
非常に頻繁である場合、メッセージはトラブルの兆候だけです (秒単位) 、生産的ではなく、数字は大きく成長していない、
一緒に示している Java より多くのメモリが必要です。メモリを解放し、メモリを解放できません。
ストレスの多い時間に起こることがあります。 しかし、それが主張するならば、それはトラブルの兆候です。
* もし `java.lang.OutOfMemoryError`s を参照すれば ERDDAP™ お問い合わせ [ログイン](/docs/server-admin/additional-information#log) ファイル,
詳しくはこちら [OutOfメモエラー](/docs/server-admin/additional-information#outofmemoryerror) 問題を診断し、解決する方法に関するヒント。
         
### パーミッション{#permissions} 

*  [Linux と Mac で、権限を変更します。](#permissions) すべての `*.sh` ファイルは `tomcat/bin/` で所有者が実行可能になります。
  ```
  chmod +x *.sh
  ```

### フォント{#fonts} 

*  [画像のフォント:](#fonts) 私たちは強く自由を好む [DejaVuフォント](https://dejavu-fonts.github.io/) その他へ Java フォント。
これらのフォントの使用は強くお勧めしますが、必須ではありません。

DejaVu フォントを使用しない場合は、setup.xml の FontFamily 設定を `` に変更する必要があります。 <fontFamily> サンセリフ </fontFamily> お問い合わせ
すべてで利用できます Java 分布。 設定した場合 <fontFamily> 利用可能なフォントの名前に、 ERDDAP™ ロードしません
`log.txt` ファイルに利用可能なフォントのリストを印刷します。 これらのフォントのいずれかを使用する必要があります。

DejaVu フォントを使用する場合は、必ず ``` を確認してください。 <fontFamily> set.xml の設定は `` <fontFamily> DejaVu サンズ </fontFamily> お問い合わせ

DejaVuフォントをインストールするには、ダウンロードしてください [デジャヴフフォント .zip ](/DejaVuFonts.zip)   (5,522,795 バイト, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
フォントファイルを一時ディレクトリに解凍します。

  * Linuxで:
    * Linuxの採用のため Java 分布, 参照 [これらの手順](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) お問い合わせ
    * その他 Java 分布: `tomcat` ユーザとして、フォントファイルを `$JAVA_HOME/lib/fonts` にコピーします。 Java フォントを検索できます。
覚えておいてください: 後で新しいバージョンにアップグレードするとき Java これらのフォントを再インストールする必要があります。
  * Macの場合:各フォントファイルの場合、ダブルクリックしてフォントをインストールします。
  * Windows 7と10:Windowsエクスプローラで、すべてのフォントファイルを選択します。 右クリックします。 インストールをクリックします。
             
### トムキャットのテスト{#test-tomcat} 

* Tomcatのインストールをテストします。
  * リナックス:
    * ユーザ "tomcat" として、`tomcat/bin/startup.sh` を実行します。
    * お使いのブラウザでURL + ":8080/" を表示 (例: [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) お問い合わせ
  * メニュー (システム管理者ユーザとしてtomcatを実行) : : :
    * `tomcat/bin/startup.sh` を実行します。
    * お使いのブラウザでURL + ":8080/" を表示 (例: [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) お問い合わせ
デフォルトでは、Tomcat がアクセス可能です。 公然アクセスできません。
  * Windowsのlocalhost:
    * システムトレイの Tomcat アイコンを右クリックし、「サービス開始」を選択します。
    * ニュース [http://127.0.0.1:8080/](http://127.0.0.1:8080/) または多分 [http://localhost:8080/](http://localhost:8080/) お使いのブラウザで デフォルトでは、Tomcat がアクセス可能です。 公然アクセスできません。

Tomcat "Congratulations"のページが表示されます。

問題がある場合は、Tomcat/logs/catalina.out` の Tomcat ログファイルを参照してください。

### Tomcatのインストールに問題がありますか?{#troubles-with-the-tomcat-installation} 

* Linux と Mac では、Tomcat に到達できない場合や ERDDAP™   (またはおそらく、ファイアウォールの外でコンピュータからそれらに到達することはできません) ,
Tomcat が 8080 ポートを listen しているかどうかを試すことができます。 (ルートとして) サーバのコマンドラインで:

  ```
  netstat -tuplen | grep 8080
  ```

これは、次のようなもので1行を返すべきです。

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (ここで `#` はいくつかの数字です) , `java` プロセスを示す (トムキャット) "tcp" トラフィックのポート "8080" を聞いています。
行が返されなかった場合、行が返された場合、または2行以上が返された場合は、ポート設定に問題があります。

* Tomcat ログファイル `tomcat/logs/catalina.out` を参照してください。 Tomcatの問題といくつかの ERDDAP™ スタートアップの問題は、ほぼ常にそこに表示されます。
最初に設定するときはこれが一般的です ERDDAP™ お問い合わせ

* 詳細はこちら [トムキャット](https://tomcat.apache.org/) ウェブサイトやヘルプのためのWebを検索します, しかし、我々はあなたが持っていた問題とあなたが見つけたソリューションを知らせてください.

* お問い合わせ [追加サポートを受けるセクション](/docs/intro#support) お問い合わせ
             
###  ERDDAP™ コンテンツ{#erddap-content} 
3.   [`tomcat/content/erddap` 設定ファイルを設定します。](#erddap-content) 
Linux、Mac、Windowsで、ダウンロード [erddapコンテンツ .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
`tomcat` ディレクトリに解凍し、`tomcat/content/erddap` を作成します。

__Version 1.0.0、20333バイト、MD5=2B8D2A5E5ED73E3A42B529C168C60B5、日付 2024-10-14___

以前のバージョンもあります。

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19792バイト、MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C、日付 2022-02-16) 
    *  [2.18の](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19792バイト、MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C、日付 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810バイト、MD5=1E26F62E7A06191EE6868C40B9A29362、日付 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810バイト、MD5=1E26F62E7A06191EE6868C40B9A29362、日付 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810バイト、MD5=1E26F62E7A06191EE6868C40B9A29362、日付 2023-02-27) 

#### 他のディレクトリ{#other-directory} 

Red HatエンタープライズLinux用 (フリル) または、Tomcatディレクトリを変更したり、必要な場所を変更することはできません。
置くために ERDDAP™ 何らかの理由で他の場所にあるコンテンツディレクトリ (例えば、Tomcatの代わりにJettyを使うと) ,
unzip `erddapContent .zip 目的のディレクトリへ (`tomcat` ユーザのみがアクセスできる) と `` を設定 erddapContentDirectory システムプロパティ
 (例) erddapContentDirectory  =~tomcat/content/erddap ツイート) お問い合わせ ERDDAP™ この新しいコンテンツディレクトリを検索できます。

### セットアップ。xml{#setupxml} 

*  [`tomcat/content/erddap/setup.xml のコメントを読み込みます。 ツイート](#setupxml) 要求された変更を加えて下さい。 setup.xml は、設定の全てのファイルで、どのように設定するかを指定します。 ERDDAP™ アクション。

初期設定では、これらの設定を少なくとも変更する必要があります。
      * ツイート <bigParentDirectory> ツイート
      * ツイート <emailEverythingTo> ツイート
      * ツイート <baseUrl> ツイート
      * ツイート <email...> 設定
      * ツイート <admin...> 設定
      * ツイート <baseHttpsUrl> ツイート (セットアップするとき https ) 

bigParentDirectory の親ディレクトリから bigParentDirectory を作成するとき:

    * `bigParentDirectory` の所有者に `tomcat` ユーザを作る:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * "group" を tomcat、ユーザー名、または tomcat を含む小さなグループの名前、Tomcat のすべての管理者に変更します。 ERDDAP : : :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * tomcat とグループが読み取り、書き込み、権限を実行できるように権限を変更します。
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * "other" のユーザ権限を削除して、読み書き、実行します。 これは、おそらく機密情報を読むことを防ぐことが重要です
お問い合わせ ERDDAP™ ログファイルとファイルをプライベートデータセットに関する情報とともに保存します。
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### 環境変数{#environment-variables} 

まずは ERDDAP™ v2.13, ERDDAP™ 管理者は、環境変数を指定することで setup.xml で任意の値を上書きできます。
名前 ERDDAP _valueName` を実行する前に ERDDAP™ お問い合わせ 例えば ``` を使う ERDDAP _baseUrl` をオーバーライド <baseUrl> 値。
デプロイ時に便利です。 ERDDAP™ Docker のようなコンテナで、setup.xml に標準設定を置くことができます。
環境変数を使用して、特別な設定を供給します。 秘密情報を供給する場合 ERDDAP™ この方法によって、
情報が秘密に残ることを確認してください。 ERDDAP™ 起動時に環境変数を読み込み、
起動の第1秒で、これを使用する方法は次のとおりです。環境変数を設定し、起動します。 ERDDAP ,
待ち時間まで ERDDAP™ 環境変数をunsetし始めます。

###  datasets.xml  {#datasetsxml} 

* コメントを読む [ **と働く datasets.xml ファイル** ](/docs/server-admin/datasets) お問い合わせ 後で、あなたが得る後 ERDDAP™ ランニング
初めての方へ (通常はデフォルトデータセットのみ) では、XML を `tomcat/content/erddap/ に変更します。 datasets.xml ツイート
必要なすべてのデータセットを指定する ERDDAP™ お問い合わせ それはあなたがあなたの時間のバルクを費やす場所です
設定中 ERDDAP™ メンテナンス中、 ERDDAP™ お問い合わせ

例を確認できます。 [ datasets.xml GitHubで](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) お問い合わせ
     
*  (うまいも) 今、または (もう少し可能性が高い) 将来的には、 erddap の CSS ファイルを変更したい場合、 コピー
`tomcat/content/erddap/images/erddapStart2.css` から `tomcat/content/erddap/images/erddap2.css` へ変換し、変更を行います。
`erddap2.css` への変更は、時のみ有効になります。 ERDDAP™ 再起動され、多くの場合、ブラウザのキャッシュされたファイルを消去するためにユーザーが必要です。
     
 ERDDAP™ setup.xml または setup.xml が正しく動作しない datasets.xml ファイルが整形されたXMLファイルではありません。 そのため、これらのファイルを編集した後、
結果がXMLテキストをXMLチェッカーに貼り付けることで、XMLがうまく形成されていることを検証するのは良い考えです [xmlvalidationの](https://www.xmlvalidation.com/) お問い合わせ
     
### erddap をインストールします。 戦争ファイル{#install-the-erddapwar-file} 

4. Linux、Mac、Windows、_ダウンロード [erddap.warの](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) __ に `tomcat/webapps`:

__バージョン2.28.1、622、676、238バイト、MD5=48b4226045f950c8a8d69ef9521b9bc9、日付 2025-09-05_

.war ファイルは高解像度の海岸線、境界線、および関連するデータがマップを作成する必要があるため大きいです。

以前のバージョンもあります。

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245バイト、MD5=5FEA912B5D42E50EAB9591F773EA848D、日付 2022-02-16) 
   *  [2.18の](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (ファックス: 86-2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411バイト、MD5=F2CFF805893146E932E498FDDBD519B6、日付 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765バイト、MD5=2B33354F633294213AE2AFDDCF4DA6D0、日付 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953バイト、MD5 = D843A043C506725EBD6F8EFDCCA8FD5FD5F、日付 2023-03-03) 
   *  [2.24の](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187バイト、MD5=970fbee172e28b0b8a07756eecbc898e、日付 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039バイト、MD5=652AFC9D1421F00B5F789DA2C4732D4C、日付 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 バイト、MD5=99a725108b37708e5420986c1616a119、日付 2025-03-31) 
   *  [2.27.0 の](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403バイト、MD5=3b2086c659eee4145ca2dff447bf4ef7、日付 2025-06-11) 

### プロキシの設定 (展開固有の)  {#proxy} 

 ERDDAP™ 通常、Webserver リバースプロキシの後ろにデプロイされ、標準の HTTP ポートで配信できるようにします。 (80と443) お問い合わせ
SSL/TLS の終端は、Webserver プロキシレイヤーでもハシドされます。 仕様は各展開の要件に依存します。

#### パスワード{#apache} 

1. `mod_proxy` と `mod_proxy_ http 読み込み:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. 既存の `を変更 <VirtualHost> タグ (1つある場合) ファイルの最後に 1 つを追加または追加します。
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

お問い合わせ ERDDAP™ `/erddap` 以外のパスで、`X-Forwarded-Prefix` ヘッダーを `X-Forwarded-Prefix` に設定します。
パスセグメント _before_ `/erddap`。 この設定は、 ERDDAP™ スタッフ
`/subpath/erddap`:

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Apache を再起動します: `/usr/sbin/apachectl -k 優雅な ツイート (しかし、時々それは別のディレクトリにあります) お問い合わせ
         
#### ガンインックス{#nginx} 

nginx 設定ファイルでは、これらのヘッダーを設定します。
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

お問い合わせ ERDDAP™ `/erddap` 以外のパスで、`X-Forwarded-Prefix` ヘッダーを `X-Forwarded-Prefix` に設定します。
パスセグメント _before_ `/erddap`。 この設定は、 ERDDAP™ スタッフ
`/subpath/erddap`:

```
proxy_set_header X-Forwarded-Prefix /subpath
```


NGINXを取得するために ERDDAP™ 正しく機能する https 、Tomcat server.xml の内部に次のスニペットを置く必要があります。 <Host> ブロック:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Tomcatを起動する{#start-tomcat} 

*  (Tomcat Web Application Manager の使用はお勧めしません。 完全にシャットダウンして起動しないと、Tomcat が早く、または後で PermGen メモリの問題が発生します。) 
*  (Linux または Mac OS では、Tomcat を実行する特別なユーザーを作成している場合は、そのユーザーとして次の手順を実行してください。) 
* Tomcat が既に稼働している場合、Tomcat をシャットダウン (Linux または Mac OS の場合) `tomcat/bin/shutdown.sh`
または (ウィンドウズ) `tomcat\bin\\ shutdown.bat ツイート

Linux で `ps -ef を使う | tomcat を `shutdown.sh` の前後に grep して、tomcat プロセスが停止していることを確認します。
プロセスはシャットダウンの前にリストされ、最終的にシャットダウン後にリストされていない必要があります。
1分か2分かかる場合があります。 ERDDAP™ 完全にシャットダウンします。 患者になる。 または、自分で止まらないように見える場合は、次のようにします。
`kill -9 <processID> ツイート
* Tomcatを起動する (Linux または Mac OS の場合) `tomcat/bin/startup.sh` または (ウィンドウズ) `tomcat\bin\\startup.bat ツイート

## お問い合わせ ERDDAP™ ランニング?{#is-erddap-running} 

ブラウザで閲覧しようとするhttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ ロードされたデータセットなしで起動します。 背景のスレッドにデータセットが読み込まれるので、一対一で利用できるようになります。

### トラブルシューティング{#troubleshooting} 

* ユーザからのリクエストが入ってくると、Apache に行きます。 (LinuxとMac OSコンピュータ) それからTomcat、それから ERDDAP™ お問い合わせ
* Apache に何が来るかを見ることができます。 (関連するエラー) Apache のログファイル
*    [お問い合わせ](/docs/server-admin/additional-information#tomcat-logs) Tomcatに何が来るかを見ることができます (関連するエラー) 
Tomcat のログファイル (`tomcat/logs/catalina.out` およびそのディレクトリ内の他のファイル) お問い合わせ
*    [お問い合わせ](/docs/server-admin/additional-information#log) 何が来るかを見ることができます ERDDAP の診断メッセージからの ERDDAP ,
エラーメッセージから ERDDAP , で ERDDAP™ ツイート <bigParentDirectory> /logs/log.txt` ファイル。
* Tomcatは起動しません ERDDAP™ Tomcatが要求されるまで ERDDAP™ お問い合わせ そのため、Tomcat ログファイルで確認できます。
スタート ERDDAP™ または、その試みに関連するエラーメッセージがある場合。
* いつか ERDDAP™ 起動して、古い名前を変更します ERDDAP™ log.txt ファイル (ログイン お問い合わせ <CurrentTime> ログイン) 新しいlog.txtファイルを作成します。
なので、`log.txt` ファイルが古い場合は、 ERDDAP™ 最近再起動していない. ERDDAP™ ログ情報をバッファに書き込む
バッファを定期的にログファイルに書き込むだけですが、強制できます ERDDAP™ 訪問してログファイルにバッファを書き込む
ツイート /erddap/status.html お問い合わせ

### トラブル:旧バージョンの Java  {#trouble-old-version-of-java} 

バージョンを使用している場合 Java それはあまりにも古いです ERDDAP , ERDDAP™ Tomcat のログファイルでエラーメッセージが表示されません。

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

ソリューションは、最新のバージョンに更新することです Java Tomcatが使用していることを確認してください。

### トラブル:スタートアップの初回起動{#trouble-slow-startup-first-time} 

Tomcat は、初めてのアプリケーションを初めて使う必要がある ERDDAP™ 同様に、`erddap.war` ファイルを解凍する必要があります。
 (これは、 .zip ファイル) お問い合わせ 一部のサーバーでは、最初にビューしようとする ERDDAP™ ストール (30秒?) この作品が完成するまで
他のサーバーでは、最初の試みはすぐに失敗します。 しかし、30秒待ってからもう一度試してみると、 ERDDAP™ 正しくインストールされました。

修正はありません。 トムキャットが作品の仕組みです。 しかし、新しいバージョンをインストールした後に初めて発生します ERDDAP™ お問い合わせ

## シャットダウンして再起動{#shut-down-and-restart} 

将来、シャットダウン (再起動)   ERDDAP™ , 見る [Tomcatをシャットダウンして再起動する方法と ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) お問い合わせ

## トラブル?{#trouble} 

Tomcat や ERDDAP™ お問い合わせ お問い合わせ [追加サポートを受けるセクション](/docs/intro#support) お問い合わせ

## 新バージョンのメール通知 ERDDAP  {#email-notification-of-new-versions-of-erddap} 

新しいバージョンのメールを受信したい場合 ERDDAP™ またはその他の重要 ERDDAP™ お知らせ
参加できます ERDDAP™ お知らせ一覧 [詳しくはこちら](https://groups.google.com/g/erddap-announce) お問い合わせ このリストは3ヶ月ごとにほぼ1つのメールの平均値です。

## カスタマイズ{#customize} 

*  [カスタマイズ ERDDAP™ 組織を強調する (コメントはありません NOAA   ERD ) お問い合わせ](#customize) 
* すべての上部に表示されるバナーを変更する ERDDAP™ .html ページを編集することで <startBodyHtml5> `` のタグ datasets.xml `ファイル。
(もし 1 がない場合、デフォルトをコピーします。 ERDDAP™ 'mcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` ' ' ' ファイル
お問い合わせ datasets.xml それを編集する。) 例えば:
  * 異なるイメージを使用する (あなたの組織のロゴ) お問い合わせ
  * 背景色を変更します。
  * 変更する ERDDAP™ "_YourOrganization_'s へ ERDDAP™ ツイート
  * 「科学データへのより簡単なアクセス」を「_YourOrganization_のデータへのより簡単にアクセス」に変更します。
  * 組織と資金源へのリンクである「あなたによって求められている」リンクを変更します。
* このページの左側にある情報を `` を編集することによって変更します。 <theShortDescriptionHtml> `` のタグ datasets.xml `ファイル。
(もし 1 がない場合、デフォルトをコピーします。 ERDDAP™ 'mcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` ' ' ' ファイル
お問い合わせ datasets.xml それを編集する。) 例えば:
  * 組織やグループが何をしているかを記述します。
  * データの種類を記述する ERDDAP™ お問い合わせ
  * ブラウザタブに表示されるアイコンを変更するには、組織のファビコンを設定します。 ICO in `tomcat/content/erddap/images/`.
お問い合わせhttps://en.wikipedia.org/wiki/Favicon.
