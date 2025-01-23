---
title: "EDDTableFromEML" 
---
# EDDTableFromEML と EDDTableFromEMLBatch GenerateDatasetのオプション Xmlの

\\[このページは、このページの先頭へERDDAP™EMLファイルを扱う管理者。
このドキュメントは2016年に作成されました。 2020年11月30日(日)に最終編集されました。\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)ユーザーは、共通のファイル形式でグリッドされたおよび表形式の科学データセットのサブセットをダウンロードし、グラフやマップを作るためのシンプルで一貫した方法を与えるデータサーバです。ERDDAP™与えられたデータセットを多次元格子された変数のグループとして使用します (例:衛星やモデルデータ) またはデータベースのようなテーブルとして (各タイプの情報と各観察の行の列) お問い合わせERDDAP™自由でオープンソースソフトウェアなので、誰でも誰でもできる[ダウンロードとインストールERDDAP™](/docs/server-admin/deploy-install)データを配信する

データセットを追加するにはERDDAP™取付け、ERDDAP™管理者は、呼び出されたファイルにデータセットを記述するXMLのチャンクを追加しなければなりませんdatasets.xmlお問い合わせ (あります[徹底したドキュメントdatasets.xml](/docs/server-admin/datasets)お問い合わせ) XMLのチャンクを生成することは可能ですが、datasets.xml完全に手で、ERDDAP™と呼ばれるツールが付属しています[ **生成データセットXml** ](/docs/server-admin/datasets#tools)特定のデータセットに必要なXMLのチャンクのラフドラフトを、データセットに関する情報のソースに基づいて生成できます。

最初に GenerateDataset を生成します。 Xml は、作成したいデータセットの種類です。 生成データセット Xmlには特別なオプションがあります。 **EDDTableFromEMLの特長** 情報を使用する情報[エコロジカルメタデータ言語 (EMLについて) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XMLファイルでXMLのチャンクを生成するdatasets.xml作成する[EDDTableFromAsciiFiles (EDDTableFromAsciiFiles) からの投稿](/docs/server-admin/datasets#eddtablefromasciifiles)EMLファイル内の各データテーブルからのデータセット。 これは、ほとんどのEMLファイルにとって非常によく機能します。EMLファイルでは、必要なすべてのメタデータを簡単に操作できる形式で保存するための優れた仕事をしています。 GenerateDatasetsXml がデータセットを作成する必要がある情報は、EML ファイルの URL を含む EML ファイルで、GenerateDatasetsXml のダウンロード、解析、EML ファイルの説明と比較します。 (多くのグループは、環境データだけでなく、表形式の科学データセットを文書化するための素晴らしいシステムであるEMLに切り替えるのにうまくいくでしょう。 そして、XMLスキーマを作成する多くのグループは、クリアなXMLスキーマのケーススタディとしてEMLを使用するのは、ポイントに、過度に深くない (i.e.、あまりにも多くのレベル) 人間とコンピューターが操作しやすい) 

## お問い合わせ{#questions} 

GenerateDatasets のすべての質問はこちら Xmlは、1つのEMLファイルまたはEMLファイルのバッチだけを処理する場合は、どのように答えるべきかについてのコメントを尋ねます。

* EDDタイプとは?
1つのファイルだけを処理する場合は、 回答: EDDTableFromEML
ファイルのグループを処理する場合は、回答: EDDTableFromEMLBatch
* ファイルを保存するディレクトリ?
ダウンロードしたEMLおよび/またはデータファイルを保存するために使用されるディレクトリの名前を入力します。
ディレクトリが存在しない場合、作成されます。
*    (EDDTableFromEML 用 メニュー) EML URL またはローカルファイル名?
EMLファイルのURLまたはローカルファイル名を入力します。
*    (EDDTableFromEMLBatch専用) EMLダイアル (URL またはローカル) お問い合わせ
ディレクトリの名前をEMLファイルで入力 (URL またはローカル dir) お問い合わせ
例えば: http://sbc.lternet.edu/data/eml/files/
 
*    (EDDTableFromEMLBatch専用) ファイル名 regex?
EML ディレクトリで目的の EML ファイルを識別するために使用される正規表現を入力します。
例: knb-lter-sbc\\.\\d+
* ローカルファイルを使用する場合 (ログイン|パスワード) お問い合わせ
既存のローカルEMLファイルとデータファイルを使用するには、trueを入力してください。
EMLファイルおよび/またはデータファイルを常に再ダウンロードするために false を入力してください。
* アクセス お問い合わせ
新しいデータセットがプライベートなデータセットになるようにしたい場合ERDDAPグループの名前を指定します。 (ツイート) アクセスを許可します。
LTERグループにおすすめ:「lter」とグループを組み合わせる、例えば、lter Sbc .
「null」を入力すると、&lt;アクセス To&gt; 出力中のタグ。
お問い合わせ[アクセス お問い合わせ](/docs/server-admin/datasets#accessibleto)お問い合わせ
* ローカル タイムゾーン (米国/太平洋) お問い合わせ
時間変数がローカル時間値を持つことを示す場合、このタイムゾーンは割り当てられます。
これは、からの値でなければなりません[タイムゾーン名の TZ 列のリスト](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)お問い合わせ
リストの最後に "US/..." を簡単に使用できるすべての名前に注意してください。
間違ったことを見つけると、変更することができますtime\\_zoneチャンクのdatasets.xmlお問い合わせ

EMLプラスERDDAP™素晴らしい組み合わせです。ERDDAP™ユーザーの富への直接アクセスをユーザーに与えることができます[Biocomplexityの知識ネットワーク (ログイン) ](https://knb.ecoinformatics.org/)そして、[長期環境研究 (ログイン) ](https://lternet.edu/)米国の政府のプロジェクトが米国政府に会うためのデータとヘルプ[研究成果公開アクセス (ログイン) 要件](https://nosc.noaa.gov/EDMC/PD.DSP.php)Webサービスで利用できるデータを作ることによって。 また、EMLプラスERDDAP™連邦機関の学術/NSF-funded領域と科学者の間で素晴らしい橋のように思える (NOAA, NASA, アメリカ) リアルム。

お問い合わせ[追加サポートを受けるセクション](/docs/intro#support)お問い合わせ
 
## デザインの詳細{#design-details} 

GenerateDatasetsXml の EDDTableFromEML オプションの設計の詳細は次のとおりです。
いくつかは、EML との違いに関連しています。ERDDAP™物事とGenerateDatasetの使い方 Xmlはこれらの問題に対処します。

### 1つのデータが1つになるERDDAP™データセット{#one-datatable-becomes-one-erddap-dataset} 
1 つの EML ファイルが複数ある可能性があります。&lt;データデータ テーブル&gt;s。ERDDAP™1 つを作るERDDAP™EML データごとのデータセットテーブル。 ザ・オブ・ザ・datasetIDデータセットの場合
 *EML名称* お問い合わせ *テーブル数*   (EMLname がテキストの場合) または
 *システム\\_EMLName* お問い合わせ *テーブル数*   (EMLname が数の場合) お問い合わせ
例えば、ファイル knb-lter-sbc.28 の表# は、ERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML 対 CF+ACDD{#eml-versus-cfacdd} 
EMLファイル内のメタデータのほとんどすべては、ERDDAP、しかし別のフォーマットで。ERDDAP™利用する[CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)そして、[パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)メタデータ規格。 これらは、キー=値のペアをグローバルメタデータと各変数のメタデータに使用する補完的なメタデータシステムです。
はい、メタデータのEML表現はCF+ACDD表現よりも優れています。 CF+ACDD 表現を EML の置換として使用することをお勧めしません。 CF+ACDDは、EMLの世界からEML世界への橋の一部として考えてください。OPeNDAP/CF/ACDDの世界。
     
### 小さな変化{#small-changes} 
ERDDAP™小さな変化を多くする。 例えば、ERDDAP™EML非使用DOI代替 識別子とdataTable番号をERDDAP™ datasetID, しかし、わずかに代替を変更 ほとんどのコンピュータ言語で有効な変数名を作る識別子(例: knb-lter-sbc.33 データ) 表1はknb\\_lter\\_sbc\\_33\\_t1になります。
     
### ドキュメントブック{#docbook} 
EML は、DocBook のマークアップシステムを使用して、EML ファイルのテキストブロックの構造を提供します。 CF と ACDD は、メタデータがプレーンテキストであることを要求します。 なので、GenerateDatasets Xmlは、マークされたテキストをテキストのフォーマットされたバージョンのように見えるプレーンテキストに変換します。 インラインタグは、四角括弧でサニタイズされます。\\[強調表示\\], プレーンテキストで左.
     
### データファイル{#data-files} 
EML dataTable には、実際のデータファイルの URL が含まれているため、GenerateDatasets Xmlは:
1. データファイルのダウンロード
2. EMLファイルと同じディレクトリに保存します。
3. データの読み込み
4. ファイルの実際のデータとEML内のデータの記述を比較します。
5. GenerateDatasets の場合 Xml は違いを見つけたり、それらに対処したり、エラーメッセージを返す場合に演算子を尋ねたりします。 下記の各項目に詳細を記載しております。
         
### .zip'd データファイル{#zipd-data-files} 
参照されたデータファイルがある場合.zipファイルが 1 つのファイルだけを含む必要があります。 そのファイルは、ERDDAP™データセット。 1つ以上のファイルがある場合。ERDDAP™データセットを拒否します。 必要であれば、修正できます。 (実際には、すべてのSBC LTER zipファイルには1つのデータファイルしかありません。)   
     
### ストレージタイプ{#storagetype} 
カラムのストレージの場合 タイプは指定しません、ERDDAP™データファイル内のデータをもとに、最適な推測を使用します。 この作品は、かなりうまくいきます。
     
### ユニット{#units} 
ERDDAP™使用方法[UDUNITSユニットのフォーマット](https://www.unidata.ucar.edu/software/udunits/)お問い合わせ 生成データセット XmlはEML単位をに変えることができますUDUNITSタイムの約95%を清潔に保ちます。 残りの5%は単位の読みやすい記述で、例えば、EMLの「biomasDensityUnitPerAbundanceUnit」は「豊富な単位ごとのbiomasの密度の単位」になりますERDDAPお問い合わせ 技術的に許可されていません。 状況下では悪くはないと思います。\\[必要であれば、作らないユニットUDUNITS互換性は変数のコメント属性に移動できます。\\]  
     
### EML バージョン 2.1.1{#eml-version-211} 
EML v2.1.1 ファイルが GenerateDataset に追加されました。 2016年のXmlは、EMLコミュニティにいくつかの取組があることを期待しています。 2020年のように、それは起こらなかった。 ザ・オブ・ザ・ERDDAP™開発者は、より最近のバージョンのEMLのサポートを追加することは喜んでいますが、新しい機能が実際に使用される場合にのみ。 お問い合わせerd.data at noaa.gov最近のバージョンのEMLに対応してほしいと思われたら、実際にこの機能を利用します。
     

## EMLファイルの問題{#issues-with-the-eml-files} 

ソフトウェアクライアントが問題を引き起こすEMLファイルには問題/問題があります (GenerateDatasetsXMLのEDDTableFromEMLオプションなど) EMLファイルを解釈/処理しようとします。

* ここにはいくつかの問題がありますが、それらはほとんど小さいですが、解決可能な問題です。 一般的に、EMLは素晴らしいシステムであり、それに対処するために私の喜びでした。
* これらは、最悪/最も一般的なものから少なくとも悪い/あまりの共通点に分類されます。
* ほとんどは特定のEMLファイルで小さな問題に関連しています (これはEMLの欠陥ではないです) お問い合わせ
* ほとんどの場合、EMLファイルやデータファイルへの簡単な変更で修正できます。
* LTER の人々は EML ファイルの妥当性をテストするために EML のチェッカーを造っていることを考えると、私はチェッカーに追加できる機能に関するいくつかの提案を追加しました。

問題は次のとおりです。

### 別の日付と時刻の列{#separate-date-and-time-columns} 
一部のデータファイルには、日付と時刻の異なる列がありますが、統一された日付+時刻の列はありません。 現在、GenerateDatasets Xml はこれらの別々の列でデータセットを作成しますが、次のような理由では理想的ではありません。

* データセットが入るのであれば最高ですERDDAP™結合された date+time 列が呼ばれる"time"お問い合わせ
* 多くの場合、データセットがロードされませんERDDAP™なぜなら、"time"カラムは date+time のデータがありません。

2つのソリューションがあります。
1. ソースデータを編集して、datafile に新しいカラムを追加 (EML で記述する) 日付と時刻の列が 1 つの列に結合される場所。 次に、GenerateDatasetを再実行する Xml なので新しいカラムが見つかります。
2. 利用する[派手な変数](/docs/server-admin/datasets#script-sourcenamesderived-variables)機能のERDDAP™新しい変数を定義するdatasets.xml日付と時刻の列を連結することで作成されます。 この状況を具体的に扱う例の一つ。
         
### コラム名{#inconsistent-column-names} 
EML ファイルは、データファイルの列とその名前をリストします。 残念ながら、実際のデータファイル内の列名とは異なることが多いです。 通常、EML ファイルの列順は、名前が若干異なる場合でも、データファイルの列順と同じです。 生成データセット Xml は、列名と一致するようにします。 できないとき (共通点) , 停止します。, EML/データファイル名のペアを表示, 正しく整列されているかどうかを尋ねます. 's' をテーブルをスキップすると、GeneratedDatasetsXml はエラーメッセージを出力し、次のテーブルに移動します。
ソリューションは、EML ファイルの erroneous カラム名を変更して、データファイル内のカラム名と一致することです。
     
### 異なる列の注文{#different-column-order} 
EML がデータファイルに存在するよりも異なる順序で列を指定した場合がいくつかあります。 生成データセット マッチアップが大丈夫か、データセットがスキップされていれば、Xml は停止し、オペレータに尋ねます。 スキップされると、結果ファイルにエラーメッセージが表示されます。例:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
ソリューションは、これらのEMLファイル内の列の順序を固定して、データファイルの注文と一致することです。

EML チェッカーが EML ファイルの列と列の順序が EML ファイルの列と列の順序と一致することを確認したら、それは素晴らしいでしょう。
    
### 誤ったnumHeaderLines{#incorrect-numheaderlines} 
複数のデータ 表は誤った状態のnumHeaderLines=1、例えば、...sbc.4011. この原因ERDDAP™列名としてデータの最初の行を読み込みます。 これらのデータをすべて手動でSKIPしようとしました。 比類のないソースの名前がすべてのデータ値であるため、それらは明らかです。 そして、誤ってnumHeaderLines=0を持っているファイルがある場合、私のシステムは明らかではありません。 ここでは、SBC LTER の失敗ファイルから例を示します。
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
そのため、 GenerateDatasets のようにエラーが表示される Xml はファイル内のデータの最初の行を考えて (例:2008-10-01T00:00 など) 列名を持つ行は (2008-10-01T00:00 がカラム名だったかのように) お問い合わせ

EML チェッカーが numHeaderLines 値をチェックした場合、それはいいでしょう。
    
### numHeader行 = 0{#numheaderlines--0} 
一部のソースファイルには、列名がありません。ERDDAP™EML が同じ列の数を記述する場合に受け入れます。

私の意見では、これは非常に危険なようです。 異なる順序または異なる単位の列がある可能性があります (詳しくはこちら) その問題をキャッチする方法はありません。 すべての ASCII のデータファイルが列名を持つ行がある場合、それははるかに優れています。
    
### DateTime 形式の文字列{#datetime-format-strings} 
EMLは日付時刻のフォーマットを記述する標準的な方法があります。 しかし、EMLファイルで使用するにはかなりのバリエーションがあります。 (以前はこれについて間違っていた。 formatString の EML のドキュメントが表示されるので、[JavaDateTimeFormatter 仕様](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), しかし、その使用に関する重要なガイドラインが欠けている, フォーマットStringは、多くの場合/通常、不適切に使用されます.) 誤った場合、および/または文字の誤った重複、および/または非標準のフォーマットを含むいくつかのインスタンスがあります。 つまり、GenerateDatasetsXmlのようなクライアント、特にソフトウェアクライアントに不当な負担をかけます。 生成データセット Xml は、EML ファイルに誤って定義されたフォーマットを変換しようとします。
[日付/時刻形式ERDDAP™お問い合わせ](/docs/server-admin/datasets#string-time-units), ほぼ同じJava/Joda のタイム フォーマットの指定が、もう少し寛容です。

EMLチェッカーが厳密な遵守を要求すればそれは素晴らしいですJava/ヨダ/ERDDAP時間単位の指定はデータ テーブルの日付時刻が指定されたフォーマットと正しく解析できることを確認しました。
    
### DateTime しかしタイムゾーンはありません{#datetime-but-no-time-zone} 
生成データセット Xmlは日付の列を探します 時間と指定されたタイムゾーン (またはZulu: 'Z' または "gmt" または "utc" を含むカラム名または属性定義で終わる時間単位から、またはローカル: カラム名または属性定義の "local" から) お問い合わせ また、日付列のファイルでも時間列もありません。 また、日付や時刻情報のないファイルです。

生成データセット Xml は、SBC LTER の特定のバッチで指定できるタイムゾーンから「ローカル」のすべての時間を扱うので、US/Pacific を使用します。 情報はコメントに時々ありますが、コンピュータプログラムが把握するのは簡単です。

この基準を満たしていないファイルは、「良い日付なし」というメッセージで拒否されます。 (タイム) 利用できる。 一般的な問題は次のとおりです。

* 日付と時刻の列がある列があるが、日付ではない 時間列。
* タイムユニットはありますが、タイムゾーンは指定されていません。

その他のコメント:
タイムゾーンの列で日付+時刻がよい場合、その列は名前付きになります。"time"お問い合わせERDDAPお問い合わせERDDAP™時間列データが理解可能/変換可能である必要があるZulu/UTC/GMTタイムゾーン dateTimes。\\[私の信念は:ローカル時間と異なる日付/時刻のフォーマットを使用して (2桁の年数&#33; mm/dd/y 対 dd/mm/y 対 ...) データファイルでは、エンドユーザーが複雑な変換を行うように強制的にZulu1つのデータセットからデータを別のデータと比較するための時間。 お問い合わせERDDAP™すべての時間データを標準化します。 文字列の場合、ERDDAP™ISO 8601:2004を常に使用して下さい (Eメール) 標準フォーマット、例えば、1985-01-02T00:00:00Z。 数値の時間のために、ERDDAP™常に使用"seconds since 1970-01-01T00:00:00Z"お問い合わせERDDAP™常に使用するZulu  (UTC、GMT) タイムゾーンは、異なるタイムゾーンと標準的な時間と日光の節約時間と作業の困難を取り除きます。 なので、GenerateDatasets Xml は、EML の dataTable カラムを date+time で取得します。Zuluお問い合わせ これは、EMLが正式な語彙/システムを使用しないため難しい (お問い合わせ[Java/Jodaの時間フォーマット](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) データの指定 時間フォーマット:
数値時間値の col がある場合 (例:Matlabタイムタイム) そして、Zuluタイムゾーン (または日付だけ、時間列なしで) 、それはとして使用されます"time"お問い合わせ
日付と時刻のデータを照合している場合、Zuluタイムゾーン、として使用されます"time"他の日付または時刻の列が削除されます。
直前の日付情報と照合が見つかった場合は、"time"変数 (タイムゾーンなし) お問い合わせ
データ列と時間列と組み合わせた日付がない場合 タイムカラム、データセットはREJECTEDです。ただし、データセットは組み合わせた日付を追加することで使用可能にすることができます。 タイムカラム (できれば、Zuluタイムゾーン) datafile に、EML ファイルにその説明を追加します。
SBC LTERからのサンプル:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable 2 .

EML/LTER が列の含める必要があったら、それは素晴らしいでしょうZulu  (UTC、GMT) 関連するすべてのソースデータファイル内のタイムゾーン時刻。 次のベストは、システムをEMLに追加して、time\\_zone標準名を使用して属性 (お問い合わせ[TZカラム](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) お問い合わせ
    
### ミスmissing\\_value {#missing-missing_value} 
いくつかの列は、missing\\_valueしかし、Knb-lter-sbc.5011 では、EML メタデータにリストしません。例:、cipitation\\_mm は -999 を使用します。 EML で欠損値が指定されていない場合、GenerateDatasetsXml は、共通の欠損値を自動的に検索します。 (例:99、-99、999、-999、9999、-9999、等) メタデータを作成する しかし、他の欠落missing\\_values がキャッチされていない。

EMLチェッカーが欠落していたらいいでしょうmissing\\_valueお問い合わせ
    
### 小さな問題{#small-problems} 
小さな問題がたくさんあります (スペル、句読) 各データセットを検査する人だけが発見されるでしょう。

EML チェッカーがスペルや文法のエラーを調べると、それは素晴らしいでしょう。 これは、科学の単語は、スペルチェッカーがフラグを立てていることが多いため、難しい問題です。 人間の編集はおそらく必要です。
    
### 無効なUnicode文字{#invalid-unicode-characters} 
一部のEMLコンテンツには、無効なUnicode文字が含まれています。 これらは、誤ってコピーされ、UTF-8 EMLファイルに貼り付けられたWindows charsetからおそらく文字です。 生成データセット Xmlはこれらの文字を例えば、\\[#128\\]なので、検索するのは簡単ですERDDAP™ datasets.xmlファイル。

EML チェッカーがこれをチェックしたといいでしょう。 見つけやすく、簡単に修正できます。
    
### 別のコラムの単位] (#differentカラムユニット)  {#different-column-unitsdifferentcolumnunits} 
一部のEML dataTables は、異なるユニットを持っているため、データファイル内の列と矛盾している列を定義します。 生成データセット Xml はこれらをフラグします。 違いが大丈夫かどうか判断するオペレータまでです。 これらは "SKIPPED" データテーブルとして失敗ファイルに表示されます。 SBC LTER の失敗ファイルのサンプル:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
EMLチェッカーがユニットにマッチしたことをチェックしたといいでしょう。 残念ながら、これは、ソースファイルがユニットを含まないため、データセットの作成者に連絡することなく、キャッチし、解決できない可能性があります。 上記の例の矛盾は、ソースの列名とEMLの列名にユニットが含まれているためのみ顕著でした。 他のデータTablesにこの問題はありますが、検出できませんか?
    
### EMLの異なるバージョン{#different-versions-of-eml} 
生成データセット XmlはEML 2.1.1で動作するように設計されています。 EML の他のバージョンは 2.1.1 にマッチするか、 GenerateDatasetsXml に対処するための特別なコードがある程度に動作します。 これはまれな問題です。 それが起こるとき、ソリューションは、ファイルをEML 2.1.1に変換したり、EMLファイルを送信したりすることです。erd.data at noaa.govなので、GenerateDatasetsに変更を加えることができます。 違いに対処するXml。

Bob は、EML ファイルの GenerateDataset をサポート 2016年のXmlは、EMLコミュニティにいくつかの取組があることを期待しています。 2020年のように、それは起こらなかった。 Bob は、最近のバージョンの EML のサポートを追加するのに満足していますが、新しい機能が実際に使用される場合にのみ役立ちます。 お問い合わせerd.data at noaa.gov最近のバージョンのEMLに対応してほしいと思われたら、実際にこの機能を利用します。
    
### データファイルの解析のトラブル{#trouble-parsing-the-data-file} 
まれに、dataTable はエラーで拒否される可能性があります。 "行の項目数が不明 #120 (観察=52、予想=50) ツイート このようなエラーメッセージは、datafile の行が他の行よりも異なる値を持っていたことを意味します。 問題があるかもしれないERDDAP™  (例えば、正しくファイルを解析しない) またはファイル内で。 SBC LTERからのサンプル:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #3、datafile=LTER\\_month\\_bottledata\\_registered\\_stations\\_20140429.txt を参照してください。
