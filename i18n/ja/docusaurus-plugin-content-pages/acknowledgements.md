# アクノレッジメント

コントリビューター [クレジット](https://github.com/erddap/erddap/blob/main/CREDITS.md) お問い合わせ ERDDAP™ 別のページにある。 ERDDAP™ 製品の [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") お問い合わせ

ボブ・サイモンズは、元の主作者です ERDDAP™   (デザイナーとソフトウェア開発者が書いた ERDDAP -特定のコード) お問い合わせ スタート地点はロイ・メンデルスゾーンの (ボブのボス) ボブがコンバーチブルプログラムをオンにする提案 (タブラーデータを1つの形式から別の形式に変換し、Bobの事前から大幅なコードに変換する小さなユーティリティ NOAA ボブがオープンソースであることを再ライセンスした作業) ウェブサービスへ。

ロイ・メンデルスゾーンは、分散型データシステム、ボブへの初期提案、そして継続的なサポートに関するアイデアでした。 (ハードウェア、ネットワーク、その他のソフトウェアのサポート、およびボブの時間を解放することで、彼はより多くの時間を費やすことができる ERDDAP™ コードコード) このプロジェクトを可能にし、その成長を可能にしました。

ザ・オブ・ザ・ ERDDAP -特定のコードは、著作権のあるオープンソースとしてライセンスされています。 [ NOAA ](https://www.noaa.gov) 著作権の保有 詳細はこちら [ ERDDAP™ ライセンス](/license) お問い合わせ
 ERDDAP™ オープンソース、Apache、LGPL、MIT/X、Mozilla、パブリックドメインライブラリ、データを使用します。
 ERDDAP™ GPLコードや商用プログラムは必要ありません。

仕事のための資金調達のバルク ERDDAP™ これから NOAA ボブ・サイモンズの給与を支払った。 初年度の ERDDAP™ , 彼は政府の請負業者だったとき, 資金はから来た [ NOAA コーストウォッチ](https://coastwatch.noaa.gov/) プログラム、 [ NOAA ログイン](https://ioos.noaa.gov/) プログラム、そして今は太平洋の棚の追跡を捧げます (ポスト) プログラム

多くのクレジットは多くの ERDDAP™ 提案やコメントを作った管理者やユーザは、多くの改善をもたらした ERDDAP お問い合わせ 多くの人が名前で述べています [変更の一覧](/changes) お問い合わせ お問い合わせ (名前付きと名前なし) お問い合わせ したがって、 ERDDAP™ 素晴らしい例です。 [ユーザー主導のイノベーション](https://en.wikipedia.org/wiki/User_innovation) 消費者から製品革新が頻繁に来るところ ( ERDDAP™ ユーザー) プロデューサーだけでなく、 ( ERDDAP™ 開発者) お問い合わせ

ここでは、ソフトウェアとデータセットのリストです。 ERDDAP™ 分布。 皆様のお越しをお待ちしております。 ありがとうございます。
 \\[ 2021年からは、コードのすべてのソースを適切にリストすることはほとんど不可能になりました ERDDAP™ 私たちが使用するライブラリの数が少ないため (特にnetcdf-javaと特にAWS) 順番に多くの他の多くのライブラリを使用します。 すべてのライブラリ ERDDAP™ コードコールは、他のライブラリが順番にコールするライブラリの多くとして、直接以下に含まれています。 以下にプロジェクトを省略した場合は、下記にプロジェクトを追加し、クレジットが発行するクレジットを提示してください。 \\] 

## プロフィール{#overview} 
 ERDDAP™ お問い合わせ [ Java ライブラリ](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) プログラム お問い合わせ ERD 、それは内部で動かします [トムキャット](https://tomcat.apache.org/) アプリケーションサーバ (ライセンス: [パスワード](https://www.apache.org/licenses/) ) , と [パスワード](https://httpd.apache.org/) ウェブサーバ (ライセンス: [パスワード](https://www.apache.org/licenses/) ) 、コンピュータで動くこと [レッドハットLinux](https://www.redhat.com/) オペレーティング システム (ライセンス: [GPLの特長](https://www.gnu.org/licenses/gpl-3.0.html) ) お問い合わせ
     
## データセット{#datasets} 
データセットは様々なソースからあります。 メタデータを見る (特に " sourceUrl お問い合わせ infoUrl お問い合わせ "institution" ライセンス) データセットごとに 多くのデータセットは、データを使用するたびに、データプロバイダを cite/credit する必要があります。 データプロバイダを cite/credit するために常に良いフォームです。 お問い合わせ [紙にデータセットを作成する方法](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) お問い合わせ
     
## CoHortソフトウェア{#cohort-software} 
 [com/cohort クラス](#cohort-software) CoHortソフトウェアとは (https://www.cohortsoftware.com) MIT/X のようなライセンスで利用できるクラスを作る (class/com/cohort/util/LICENSE.txt を参照してください。) お問い合わせ
     
## CoastWatchブラウザ{#coastwatch-browser} 
 ERDDAP™ CoastWatch Browserプロジェクトからコードを使用する (現在は廃止) お問い合わせ [ NOAA コーストウォッチ](https://coastwatch.noaa.gov)   [西海岸地域ノード](https://coastwatch.pfeg.noaa.gov/)   (ライセンス: オープンソース) お問い合わせ そのプロジェクトは、元コーディネーターであるデイブ・フォリーが主導し運営しました。 NOAA CoastWatch西海岸地域ノード。 コーストWatchブラウザのコードはすべてボブ・サイモンズによって書かれています。
     
##  OPeNDAP  {#opendap} 
データから [ OPeNDAP ](https://www.opendap.org) サーバは、 [ Java   DAP 1.1.7.1](https://www.opendap.org/deprecated-software/java-dap)   (ライセンス: LGPL) お問い合わせ
     
##  NetCDF ログイン{#netcdf-java} 
 NetCDF ファイル ( .nc ) 、GMT 様式 NetCDF ファイル (.grdの) , GRIB, および BUFR は、コードで読み書きされます。 [ NetCDF   Java ライブラリー](https://www.unidata.ucar.edu/software/netcdf-java/)   (ライセンス: [BSD-3の特長](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) から [ Unidata ](https://www.unidata.ucar.edu/) お問い合わせ

ソフトウェアに含まれるもの NetCDF   Java .jar:

* slf4jの
ザ・オブ・ザ・ NetCDF   Java 図書館およびCassandraの必要性 [シンプルなロギングファサードからslf4j Java ](https://www.slf4j.org/) プロジェクト 現在、 ERDDAP™ slf4j-simple-xxx.jar を slf4j.jar に改名し、この必要性を満たします。 (ライセンス: [代表取締役社長](https://www.slf4j.org/license.html) ) お問い合わせ
     
* ジドム
ザ・オブ・ザ・ NetCDF   Java .jar には、XML の処理コードが含まれています。 [ジドム](http://www.jdom.org/)   (ライセンス: [パスワード](http://www.jdom.org/docs/faq.html#a0030) ) netcdfAll.jarに含まれている。
     
* ジョダ
ザ・オブ・ザ・ NetCDF   Java .jar には [ジョダ](https://www.joda.org/joda-time/) カレンダーの計算のため (おそらく使用されていない ERDDAP ) お問い合わせ (ライセンス: [Apache 2.0 の](https://www.joda.org/joda-time/licenses.html) ) お問い合わせ
     
* パスワード
ザ・オブ・ザ・ NetCDF   Java .jar には .jar ファイルがいくつか含まれています。 [Apache プロジェクト](https://www.apache.org/) : : :
     [共通コード](https://commons.apache.org/proper/commons-codec/) ,
     [一般的な発見](https://commons.apache.org/discovery/) ,
     [共通点- http クライアント](https://hc.apache.org/httpcomponents-client-ga/) ,
     [共通ログ](https://commons.apache.org/proper/commons-logging/)   
     [Httpコンポーネント](https://hc.apache.org) ,
     (ライセンス: [パスワード](https://www.apache.org/licenses/LICENSE-2.0) )   
これらはnetcdfAll.jarに含まれています。
     
* その他
ザ・オブ・ザ・ NetCDF   Java .jar には、: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.re2j, com.google.re2j, com.google.re2j, com.google.thirdparty. (Google は Apache と BSD のようなライセンスを使用します。)   
         
## SGTの特長{#sgt} 
グラフとマップは、変更されたバージョンのオンザフライで作成されます NOAA SGTの特長 (お問い合わせhttps://www.pmel.noaa.gov/epic/java/sgt/、今中断される) バージョン3 (は、 Java -Donald Denboが作成した科学的グラフィックスツールキット [ NOAA メニュー](https://www.pmel.noaa.gov/) )   (ライセンス: オープンソース (お問い合わせhttps://www.pmel.noaa.gov/epic/java/license.html) ) お問い合わせ
     
## ウォルター・ゾーン{#walter-zorn} 
大きい、HTMLツールチップ ERDDAP 'HTMLページはWaler Zorn's wz\\_tooltipで作成されます。 ライブラリ (ライセンス: LGPL) お問い合わせ
スライダーとスライドソーターのドラッグ&ドロップ機能がWaler Zornのwz\\_dragdrop.jsで作成されます。 (ライセンス: LGPL) お問い合わせ
     
## サイトマップ{#openpdf} 
.pdfファイルを作成する [サイトマップ](https://github.com/LibrePDF/OpenPDF) , 無料 Java -PDFライブラリ
     
## GSHHSの特長{#gshhs} 
海岸線と湖のデータは、 [GSHHSの特長](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) -- 世界的な自己一貫性、階層、高解像の海岸線データベース (ライセンス: [GPLの特長](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) ポール・ウェッセルとウォルター・スミスが制作

弊社では、対応する正式なデータについて、明確に理解しています。 ERDDAP™ -- NAVIGATIONALの目的に使用しないでください。
     
    
## GMTスコースト{#gmt-pscoast} 
政治的境界と河川データは、 [スコースト](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) プログラム [GMTの](https://www.soest.hawaii.edu/gmt/) からデータを使用する [CIAについて 世界データ銀行II](https://www.evl.uic.edu/pape/data/WDB/)   (ライセンス: パブリックドメイン) お問い合わせ

ポーティカル・ボウンダリ・データが生み出しているのが現状です。 ERDDAP お問い合わせ
    
## トピックス{#etopo} 
いくつかのマップの背景で使用される気密/地理データは、 [ETOPO1 グローバル1-分グリッド関連データセット](https://www.ngdc.noaa.gov/mgg/global/global.html)   (氷面、グリッド登録、バイナリ、2バイトのint: etopo1\\_ice\\_g\\_i2 .zip )   (ライセンス: [パブリックドメイン](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) 、無料で配布される [ NOAA NGDCの](https://www.ngdc.noaa.gov) お問い合わせ

弊社では、バティメトリ/TOPOGRAPHYデータに含まれるデータの正確性について、いかなる表明もしていません。 ERDDAP お問い合わせ NAVIGATIONALの目的に使用しないでください。
    
##  Java メール{#javamail} 
電子メールは、メール内のコードを使用して送信されます。 ジャーから Oracle お問い合わせ [ Java メール API](https://javaee.github.io/javamail/)   (ライセンス: [共同開発と流通ライセンス (CDDLについて) バージョン1.1](https://javaee.github.io/javamail/LICENSE) ) お問い合わせ
     
## ジェイソン{#json} 
 ERDDAP™ 使用方法 [json.orgの Java JSONライブラリ](https://www.json.org/index.html) パースへ [ジェイソン](https://www.json.org/) データデータ (ライセンス: [オープンソース](https://www.json.org/license.html) ) お問い合わせ
     

## 投稿grSQL{#postgrsql} 
 ERDDAP™ 含まれるもの [ポストドレスJDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) ドライバー (ライセンス: [サーバ](https://www.postgresql.org/about/licence/) ) お問い合わせ ドライバーは著作権 (ツイート) 1997-2010 PostgreSQL グローバル開発グループ お問い合わせ
     
## ログイン{#lucene} 
 ERDDAP™ Apache からコードを使う [ログイン](https://lucene.apache.org/) お問い合わせ (ライセンス: [パスワード](https://www.apache.org/licenses/LICENSE-2.0) ) "lucene" 検索エンジンオプション (しかし、デフォルトの「オリジナル」検索エンジンでは使用できません) お問い合わせ
     
## 共通圧縮{#commons-compress} 
 ERDDAP™ Apache からコードを使う [共通圧縮](https://commons.apache.org/compress/) お問い合わせ (ライセンス: [パスワード](https://www.apache.org/licenses/LICENSE-2.0) ) お問い合わせ
     
## ジエクセル{#jexl} 
 ERDDAP™ 式やスクリプトを評価するためのサポート&lt; sourceName s&gt;'s は [Apache プロジェクト](https://www.apache.org/) : : : [ Java 表現言語 (ジエクセル) ](https://commons.apache.org/proper/commons-jexl/)   (ライセンス: [パスワード](https://www.apache.org/licenses/LICENSE-2.0) ) お問い合わせ
     
## カサンドラ{#cassandra} 
 ERDDAP™ 含まれるもの パスワード [カサンドラの](https://cassandra.apache.org/)   [キャサンドラ・ドライバー・コア.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (ライセンス: [Apache 2.0 の](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) お問い合わせ
Cassandraのcasandra-driver-core.jarは要求します (お問い合わせ ERDDAP™ 含まれるもの) : : :
*    [グアバ.jar](https://github.com/google/guava)   (ライセンス: [Apache 2.0 の](https://github.com/google/guava/blob/master/LICENSE) ) お問い合わせ
*    [lz4.jarの](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (ライセンス: [Apache 2.0 の](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) お問い合わせ
*    [メトリックコア.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (ライセンス: [代表取締役社長](https://github.com/codahale/metrics/blob/master/LICENSE) ) お問い合わせ
*    [netty-all.jar ディレクティブ](https://netty.io/downloads.html)   (ライセンス: [Apache 2.0 の](https://netty.io/downloads.html) ) お問い合わせ
*    [snappy-java.jar は、](https://xerial.org/snappy-java/)   (ライセンス: [Apache 2.0 の](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) お問い合わせ
         
##  KT\\_ パレット{#kt_-palettes} 
接頭辞を持つカラーパレット " KT\\_ お問い合わせ [Kristenによる.cptパレットのコレクション ログイン](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (ライセンス: [代表取締役社長](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) , しかし、わずかにJennifer Sevadjianによって再フォーマット NOAA そのためには ERDDAP 's .cpt の要件。
     
##  Leaflet  {#leaflet} 
 ERDDAP™ 利用する Java スクリプトライブラリ [ Leaflet ](https://leafletjs.com/)   (ライセンス: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) として WMS クライアント WMS ウェブページ ERDDAP お問い合わせ それは優秀なソフトウェアです (、使いやすい設計されていて、速く、および自由) Vladimir Agafonkinから。
     
## ツイート{#aws} 
Amazon AWSと連携 (S3を含む) , ERDDAP™ v2 を使う [AWS SDK用 Java ](https://aws.amazon.com/sdk-for-java/)   (ライセンス: [パスワード](https://www.apache.org/licenses/) ) お問い合わせ

AWS は、依存関係をプルするために Maven が必要です。 これらには、以下の .jar ファイルが含まれます。 (xxx がバージョン番号で、時間が経つにつれて変更され、ライセンスタイプが括弧に) : アノテーションxxx.jar (パスワード) , apache-client-xxx.jar (パスワード) , ams-xxx.jar (サーバ) , asm-xxx.jar (サーバ) , asm-analysis-xxx.jar (サーバ) , asm-commons-xxx.jar (サーバ) , asm-tree-xxx.jar (サーバ) , asm-util-xxx.jar (サーバ) , auth-xxx.jar (お問い合わせ) , aws-core-xxx.jar (パスワード) , aws-query-protocol-xxx.jar (パスワード) , aws-xml-protocol-xxx.jar (パスワード) , チェッカー-qual-xxx.jar (代表取締役社長) , error\\_prone\\_annotations-xxx.jar (パスワード) , eventstream-xxx.jar (パスワード) , 障害アクセスxxx.jar (パスワード) , http コアxxx.jar (パスワード) , j2objc-annotations-xxx.jar (パスワード) , ジャックソン-注釈-xxx.jar (パスワード) , ジャックソンコアxxx.jar (パスワード) , ジャックソン-databind-xxx.jar (パスワード) , jaxen-xxx.jar (サーバ) , jffi-xxx.jar (パスワード) , jffi-xxx.native. ジャー (パスワード) , jnr-constants-xxx.jar (パスワード) , jnr-ffi-xxx.jar (パスワード) , jnr-posix-xxx.jar (パスワード) , jnr-x86asm-xxx.jar (パスワード) , json-xxx.jar (オープンソース) , jsr305-xxx.jar (パスワード) , リスナブルフューチャーxxx.jar (パスワード) , ダースネットについて . ジャーズ (パスワード) , プロフィールxxx.jar (パスワード) , プロトコルコアxxx.jar (パスワード) , 反応ストリームxxx.jar (CCOについて 1.0 の) , 地域xxx.jar (パスワード) , s3-xxx.jar (パスワード) , sdkコアxxx.jar (パスワード) , utils-xxx.jar (お問い合わせ) お問い合わせ 実際のライセンスを確認するには、.jar 名を検索します。 [Mavenリポジトリ](https://mvnrepository.com/) それからライセンスを見つけるために、プロジェクトのファイルで周りをrummage。
    

また、開発時に使用しているソフトウェアやウェブサイトのすべてに非常に感謝しています ERDDAP 、を含む
 [クローム](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [ダックダックゴー](https://duckduckgo.com/?q=) ,
 [編集Plus](https://www.editplus.com/) ,
 [ファイル](https://filezilla-project.org/) お問い合わせ
 [GitHubで](https://github.com/) ,
 [Google検索](https://www.google.com/webhp) ,
 [プッシー](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [スタックオーバーフロー](https://stackoverflow.com/) ,
 [トドイスト](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
インターネット、ワールドワイドウェブ、その他、素晴らしい、役立つウェブサイト。
ありがとうございます。
