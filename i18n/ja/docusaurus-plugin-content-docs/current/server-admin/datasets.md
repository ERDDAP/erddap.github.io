---
sidebar_position: 3
---
# と働く datasets.xml ファイル

 \\[ このページは、このページの先頭へ ERDDAP™ 管理者。 \\] 

続いた後 ERDDAP™   [インストール手順](/docs/server-admin/deploy-install) 、編集しなければなりません datasets.xml ファイル *トームキャット* /content/erddap/ がデータセットを記述する ERDDAP™ 取付けはサーブします。

例を確認できます。 [ datasets.xml GitHubで](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) お問い合わせ

- - - - -

##  [導入事例](#introduction)  {#introduction} 

### 必要なアセンブリ{#some-assembly-required} 
データセットの設定 ERDDAP™ データセットのディレクトリやURLを指すのは問題ではありません。 あなたはXMLのチャンクを書く必要があります datasets.xml データセットを記述する。

* グリッドされたデータセットのために、データセットを合わせるために ERDDAP 's は、グリッドデータのデータ構造で、同じ次元を共有するデータセットの変数のサブセットを識別する必要があります。 ( [なぜ?](#why-just-two-basic-data-structures)   [お問い合わせ](#dimensions) ) 
* データセットの現在のメタデータは自動でインポートされます。 しかし、メタデータを変更したり、他のメタデータを追加したい場合は、それを指定する必要があります。 datasets.xml お問い合わせ そして ERDDAP™ 他のメタデータを必要とします。 [グローバル属性](#global-attributes)   (など infoUrl , 機関, sourceUrl , 概要, タイトル) そして、 [変数属性](#variable-addattributes)   (など long\\_name ユニット) お問い合わせ 現在データセットに存在するメタデータとして、データセットに記述された情報を追加し、要求されるメタデータ ERDDAP™ データセットに記述情報を付加します。 追加のメタデータは、データセットに良い追加であり、 ERDDAP™ 慣れていないユーザーにデータを提示するより良い仕事をします。
*    ERDDAP™ 特別なことを行う必要があります。 [経度、緯度、高度 (または深さ) 変数と時間変数](#destinationname) お問い合わせ

これらのアイデアを購入し、XMLを作成するための努力を費やすと datasets.xml 、すべての利点をの得ます ERDDAP™ 以下を含む:

* データセットの完全なテキスト検索
* カテゴリでデータセットを検索
* データアクセスフォーム ( * datasetID * .html拡張子) そのため、さまざまなファイル形式でデータのサブセットをリクエストできます。
* グラフやマップをリクエストするフォーム ( * datasetID * .グラフ) 
* サイトマップ ( WMS ) グリッドデータセット用
*    RESTful データへのアクセス

作る datasets.xml 最初のデータセットはかなりの労力を要しますが、 **それはより容易になります** お問い合わせ 最初のデータセットの後、次のデータセットで多くの作業を再利用することができます。 幸いなことに、 ERDDAP™ 2つ付属 [ツール](#tools) データセットごとにXMLを作成するのに役立ちます datasets.xml お問い合わせ
あなたが立ち往生したら、私たちを参照してください [追加サポートを受けるセクション](/docs/intro#support) お問い合わせ

### 変数 datasets.xml  {#varaibles-in-datasetsxml} 

お問い合わせ ERDDAP™ バージョン 2.29.0, datasets.xml これから (オプション) によって処理される [文字列置換器](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) お問い合わせ これは、プライベート値の設定を含む多くの用途を持っています (パスワードのように) 環境変数を使用して。 enableEnvParsing を setup.xml で false に設定することで無効にできます。

### データプロバイダ フォーム{#data-provider-form} 
データプロバイダがあなたにデータを追加しようとすると ERDDAP すべてのメタデータを収集するために困難で時間がかかることがあります (データセットに関する情報) データセットを追加するために必要な ERDDAP お問い合わせ 多くのデータソース (たとえば、.csv ファイル、 Excelファイル、データベース) 内部メタデータがないので、 ERDDAP™ データプロバイダからメタデータを収集し、広範なガイダンスを含むデータプロバイダのフォームを持っています [データベース内のデータ](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases) お問い合わせ 提出された情報は、送信された情報に変換されます datasets.xml フォーマットおよびそれから電子メールを ERDDAP™ 管理者権限 (お問い合わせ) と書かれている (リクエスト) お問い合わせ *bigParentディレクトリ* /logs/dataProviderForm.log . したがって、フォームは半自動でデータセットを取得するプロセスを自動化します ERDDAP , しかし、 ERDDAP™ 管理者はまだ完了しなければならない datasets.xml chunk とデータファイルを取得する対処 (ツイート) プロバイダーから、またはデータベースに接続します。

外部ソースからの実際のデータファイルの送信は、巨大なセキュリティリスクです。 ERDDAP™ それに対処するものではありません。 たとえば、メールなどのデータプロバイダやデータプロバイダで動作するソリューションを把握する必要があります。 (小さなファイルの場合) 、雲から引っ張って下さい (例えば、DropBox や Google ドライブ) , sftp サイト (パスワードで) 、またはスニーカー ログイン (USB の親指ドライブか外的なハードドライブ) お問い合わせ あなたが知っている人からファイルだけを受け入れる必要があります。 ウイルスのファイルをスキャンし、他のセキュリティ対策を講じる必要があります。

リンクがない ERDDAP™ データプロバイダのフォームに (例えば、 ERDDAP™ サイトマップ) お問い合わせ 代わりに、誰かが彼らがあなたのデータがあなたの役に立たせたいと伝えた場合 ERDDAP つまり、次のようなメールを送ることができます。
はい、私たちはあなたのデータを取得することができます ERDDAP お問い合わせ まずはフォームに必要事項をご記入下さい。https://*yourUrl*/erddap/dataProviderForm.html  (または http:// お問い合わせ https:// 機能しない) お問い合わせ
完了後、最終確認をさせていただきます。
フォームを見たいだけなら (それを満たさないで) フォームをオンに表示することができます ERD お問い合わせ ERDDAP : : : [導入事例](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html) , [パート1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html) , [パート2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html) , [パート3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html) と [パート4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html) お問い合わせ これらのリンク ERD   ERDDAP™ あなたではなく、私に情報を送信するので、実際にデータを追加したい場合は、それらに情報を提出しないでください ERD   ERDDAP お問い合わせ

データプロバイダフォームを削除したい場合 ERDDAP™ , 置く
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
setup.xml ファイルで。

今回のインペータスは NOAA 's 2014 年 [研究成果公開アクセス (ログイン) ディレクティブ](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf) , 全てを要求する NOAA 納税者ドルを介した環境データがデータサービスで利用可能 (ファイルだけでなく) 12ヶ月以内の制作 そのため、利用に関心が高まります ERDDAP™ サービスASAPでデータセットを利用できるようにするため。 大量のデータプロバイダに対処するためのより効率的な方法が必要です。

フィードバック/提案? こちらのフォームは新品です。 erd dot data at noaa dot gov この改善のためのフィードバックか提案があれば。

### ツール{#tools} 
 ERDDAP™ 必要なデータセットごとにXMLを作成するためのツールである2つのコマンドラインプログラムが付属しています ERDDAP™ お問い合わせ セットアップが完了したら ERDDAP™ 実行する (少なくとも 1 時間) , これらのプログラムを見つけて使用することができます *トームキャット* /webapps/erddap/WEB-INFディレクトリ Linux/Unix シェルスクリプトがあります。 (拡張子 .sh を使って) Windowsスクリプト (拡張子 .bat を使って) 各プログラムについて \\[ Linux では、同じユーザーとしてこれらのツールを実行します。 (トームキャット?) Tomcatを実行します。 \\] 各プログラムを実行すると、質問をします。 各質問に対して、応答を入力し、Enterキーを押します。 または、いつでもプログラムを終了するために ^C を押します。

#### プログラムが実行されませんか?{#program-wont-run} 

* 未知のプログラムを入手する場合 (または類似) エラーメッセージ, 問題は、おそらく、オペレーティングシステムが見つからなかったことです Java お問い合わせ どこを把握する必要があります Java お使いのコンピュータ上で、.bat または .sh ファイルで java リファレンスを編集して使用しようとしています。
* jarファイルが見つからなかったり、エラーメッセージが見つからなかったり、 Java .bat または .sh ファイルにリストされているクラスのいずれかを見つけることができません。 このソリューションは、.jarファイルがどこにあるのかを把握し、.bat または .sh ファイルに java リファレンスを編集することです。
* バージョンを使用している場合 Java プログラムが実行されず、エラーメッセージが表示されます。
"main" java.lang.UnsupportedClassVersionError のスレッドで例外:
     *名/名* : サポートされていないメジャーマイナーバージョン *お電話番号*   
ソリューションは、最新のバージョンに更新することです Java .sh や .bat ファイルをプログラムに使用することを確認してください。

#### 用具はさまざまな診断メッセージを印刷します:{#the-tools-print-various-diagnostic-messages} 

* 「ERROR」という言葉は、何かがうまくいかなかったときに使われます。 エラーを取得するのは迷惑ですが、エラーは問題に対処するために強制します。
* 何かが間違っていたときに「WARNING」という言葉が使われますが、手順は完了できました。 これらはかなりまれです。
* その他は、単なる有益なメッセージです。 \\-verbose を追加できます。 [生成データセットXml](#generatedatasetsxml) または [ダスDds](#dasdds) コマンド ラインは、問題の解決に役立ちます。

2つのツールは大きな助けです, しかし、あなたはまだ、このページ上のすべてのこれらの指示を注意深く読み、自分自身を重要な決定にしなければなりません.

### 生成データセットXml{#generatedatasetsxml} 
*    **生成データセットXml** データセットXMLのラフドラフトを生成することができるコマンドラインプログラムです。
    
GenerateDatasets を使用するよう強くお勧めします チャンクの作成ではなくXml datasets.xml 手で:
    
    * 生成データセット Xmlは秒単位で動作します。 手でこれを行うと、少なくとも1時間の仕事です。
    * 生成データセット Xml はより良い仕事をします。 手でこれを行うには、広範な知識が必要 ERDDAP™ 作品紹介 手でより良い仕事をするということは違っています。 (Bob Simons は GenerateDatasets を使用する 最初のドラフトのためのXml、彼は書いた ERDDAP お問い合わせ) 
    * 生成データセット Xmlは常に有効なチャンクを生成します datasets.xml お問い合わせ 任意のチャンクの datasets.xml あなたが書くことは、おそらく少なくともいくつかのエラーが、予防できない ERDDAP™ データセットの読み込みから。 多くの場合、これらの問題を診断するために時間がかかります. 時間を無駄にしないでください。 生成する データセット Xmlはハードワークを行います。 すると、 .xml を手元で refine することができます。
    
GenerateDatasets を使うとき Xmlプログラム:
    
    * Windows では、GenerateDatasetsXml を実行する初めて、GenerateDatasetsXml.bat ファイルをテキストエディタで編集して、Java へのパスを変更する必要があります。 Windowsが見つけることができるようにexeファイル Java お問い合わせ
    * 生成データセット Xml は最初に EDDType を指定するように要求します (Erd Dapデータセット タイプ:) データセットの 詳細はこちら [データセットの種類一覧](#list-of-types-datasets)   (このドキュメント) 作業中のデータセットに適した型であることを把握します。 通常の EDDType に加えて、いくつかあります [特殊/擬似データセットタイプ](#specialpseudo-dataset-types)   (例: THREDDSカタログをクロールして、チャンクを生成する datasets.xml カタログ内の各データセット) お問い合わせ
    * 生成データセット Xml は、その EDDType に固有の一連の質問をします。 質問は、必要な情報を収集します ERDDAP™ データセットのソースへのアクセス 何かを理解するために ERDDAP™ 同じデータセットタイプをクリックして指定した EDDType のドキュメントを参照してください。 [データセットの種類一覧](#list-of-types-datasets) お問い合わせ
        
特別な文字で文字列を入力する必要がある場合 (例:先頭または末尾の空白文字、非ASCII文字) お問い合わせ [JSONスタイルの文字列](https://www.json.org/json-en.html)   (\\ 文字でエスケープされた特別な文字で) お問い合わせ たとえば、タブの文字だけを入力するには、「\\t」(周囲のダブルクォートで、これは言う ERDDAP™ JSON スタイルの文字列です。
        
    * 多くの場合、回答の1つはGenerateDatasetsXmlが必要とするものではありません。 それから、 GenerateDatasets まで、質問に対する回答を改訂して、もう一度試すことができます Xml は、ソースデータを正常に見つけ、理解することができます。
    * 質問に正しく答えた場合 (または十分に正しく) , 生成データセット Xmlはデータセットのソースに接続し、基本情報を収集します (例えば変数名とメタデータ) お問い合わせ
ローカルからあるデータセットの場合 NetCDF   .nc および関連するファイル、GenerateDatasets Xml は、最初にファイルを読み込みた後、ファイルの ncdump のような構造を印刷します。 これにより、GenerateDatasetsXml を通じて、その後のループでより良い質問に答える情報を得ることができます。
    * 生成データセット Xml はデータセットの XML のラフドラフトを生成します。
    * 診断情報とデータセットXMLのラフドラフトは、 *bigParentディレクトリ* /logs/GenerateDatasetsXml.log .
    * データセットXMLのラフドラフトが書き込まれます *bigParentディレクトリ* /logs/GenerateDatasetsXml.out .
#### "0 ファイル" エラーメッセージ{#0-files-error-message} 
GenerateDataset を実行すると Xml または [ダスDds](#dasdds) 、またはあなたがロードしようとすると EDDGrid から...ファイルやEDDTableFrom ... ファイルのデータセット ERDDAP™ 「0ファイル」エラーメッセージが表示され、 ERDDAP™ ディレクトリに 0 の一致するファイルが見つかりました (そのディレクトリに一致するファイルがあると思うとき) : : :
* ディレクトリの完全な名前を指定していることを確認してください。 また、サンプルファイル名を指定した場合は、フルディレクトリ名を含むファイルのフルネームを指定してください。
* ファイルがそのディレクトリにあることを確認してください。
* ディレクトリ名のスペルを確認してください。
* fileNameRegex をチェックします。 それは本当に、本当に簡単にregexesで間違いを作ることです。 テストの目的のために、すべてのファイル名に一致すべきregex .\\*を試してください。 (お問い合わせ [regex ドキュメント](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) そして、 [regexチュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) お問い合わせ) 
* プログラムを実行しているユーザーを確認してください (例:user=tomcat (お問い合わせ) トムキャット/ ERDDAP ) これらのファイルに対する'read'許可が必要です。
* 一部のオペレーティングシステム (例えば、SELinux) システム設定に応じて、プログラムを実行したユーザーは、ファイルを持つディレクトリに導くディレクトリ全体のチェーンに対する「読み込み」権限を持つ必要があります。


* 解決できない問題がある場合、 [サポートサポート](/docs/intro#support) できるだけ多くの情報で。 同様に、特定のデータセットの適切な EDDType が、そのデータセットで動作しないか、適切な EDDType がない場合、ファイルしてください [GitHubでの問題点](https://github.com/ERDDAP/erddap/issues) 細部を使って (関連する場合のサンプルファイル) お問い合わせ
         
#### GenerateDatasetから出力を編集する必要があります Xml がより良くなる{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* 免責事項:
チャンクの datasets.xml 生成するデータセット Xml ISN'T パーフェクト. あなたは、そのXMLを読んで、PUBLICでそれを使う必要があります ERDDAP お問い合わせ 生成データセット RULES-OF-THUMBのロットのXmlのRELIESは、アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレント・アレン・アレント・アレン・アレン・アレント・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレント・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン・アレン あなたは、あなたが追加するXMLの信頼性を高めるために責任があります ERDDAP お問い合わせ datasets.xml フリル
    
     (楽しい事実:私は叫びません。 歴史的法的理由のために、免責者はすべてのキャップに書かれなければなりません。) 
    
GenerateDatasetsXmlの出力はラフドラフトです。
編集する必要はほとんどありません。
可能な限り出力を行なうための努力を続けてきましたが、限界があります。 多くの場合、必要な情報は単にソースメタデータから利用できません。
    
基本的な問題は、コンピュータプログラムを要求しているということです (生成データセットXml) 同じタスクを100人に与えた場合、100の異なる結果を得ることができます。 「右」の答えは一つありません。 明らかに、このプログラムはボブの心を読むために最も近い (あなたのものではありません) 、しかし、AIのような作業を行うために、AIプログラムのすべて理解されていないAIプログラムではありません。 (終身のAIプログラムの翌日が来るかもしれませんが、まだそうではありません。 もしかしたら、人間はより大きな問題があるかもしれません。 お問い合わせ) 
    
* 情報目的のために、出力は、グローバルなsourceAttributesと変数sourceAttributesをコメントとして表示します。 ERDDAP™ sourceAttributes を結合し、 addAttributes   (優先する) 結合する ユーザーに表示されている属性。 (そして他の属性は縦度、緯度、高度、深さおよび時間変数に自動的に加えられます ERDDAP™ 実際にデータセットを作る) お問い合わせ
     
* sourceAttribute が気に入らないと、同じ名前で addAttribute を追加することで上書きしますが、異なる値 (値も削除したい場合) お問い合わせ
     
* すべての addAttributes コンピューター生成された提案です。 それらを編集&#33; addAttribute が気に入らないと、変更します。
     
* その他を追加したい場合 addAttributes , それらを追加.
     
* 変更したい場合 destinationName 変更します。 しかし、変更しないでください sourceName お問い合わせ
     
* 注文を変更できます dataVariable s またはそれらのいずれかを削除します。


    * それから使用することができます [ダスDds](#dasdds)   (詳しくはこちら) そのデータセットでXMLを繰り返しテストし、結果のデータセットが欲しいように見えるようにします ERDDAP お問い合わせ
    * 小さな変化を自由に作ろう datasets.xml 生成されたチャンク、例えば、より良い供給 infoUrl , 要約, タイトル.
#### doNotAddStandardNames(標準名を追加しない){#donotaddstandardnames} 
実行時に\\-doNotAddStandardNamesをコマンドラインパラメータとして含める場合 データセット Xmlは、発生します データセット Xmlは追加しません standard\\_name お問い合わせ addAttributes 緯度、経度、高度、深さまたは時間という変数以外の任意の変数 (明らかである standard\\_name ツイート) お問い合わせ 出力を生成から使用している場合は便利です データセット 直接Xml ERDDAP™ 出力を編集することなく、生成する データセット Xmlはしばしば推測します standard\\_name 誤って。 (使用する前に、出力を編集しておくことをお勧めします。 ERDDAP お問い合わせ) このパラメータを使用すると、推測されるため、他のマイナーな関連効果があります standard\\_name 他の目的のために、例えば、新しいを作成するために使用されることが多い long\\_name 、colorBar の設定を作成する。
#### スクリプト{#scripting} 
キーボードで対話的に質問に答え、追加のデータセットを生成するためにループする代替として、コマンドライン引数を1つのデータセットを生成するすべての質問に答えることができます。 生成データセット Xml はそれらのパラメータを処理し、出力を出力ファイルに書き、プログラムを終了します。
        
これを設定するには、まず、プログラムをインタラクティブモードで使用し、回答を書き留めます。 部分的な例を示します。
スクリプトを実行してみましょう: ./GenerateDatasetsXml.sh
それから入る:EDDTableFromAsciiFiles
それから入って下さい: /u00/data/
それから入って下さい: .\\*\\.asc
それから入って下さい: /u00/data/sampleFile.asc
それから入って下さい:ISO-8859-1
        
これを非対話的な方法で実行するには、このコマンドラインを使用します。
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles /u00/data/ .\\.asc /u00/data/sampleFile.asc ISO-8859-1
基本的にはコマンドラインですべての回答をリストします。
これは、再実行GenerateDatasetsを必要とする方法で頻繁に変更するデータセットに便利です Xmlの (お知らせ EDDGrid FromThreddsカタログ) お問い合わせ
        
詳細:

* パラメータにスペースや特別な文字が含まれている場合は、パラメータをパラメータとしてエンコードします。 [JSONスタイルの文字列](https://www.json.org/json-en.html) 、例えば、スペースと2つのmy変数 \\n ライン。
* パラメータとして空の文字列を指定したい場合は、: 何も
* パラメータのデフォルト値を指定する場合は、: default を使用します。
             
* 生成データセット Xml は -i をサポート *データセット Xml名前* ツイート *タグ名* 出力を指定した行に差し込むコマンドラインパラメータ datasets.xml ファイル (デフォルトは *トームキャット* /コンテンツ/erddap/ datasets.xml ) お問い合わせ 生成データセット Xml はデータセットの 2 行を探します XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
そして、
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
これらの行間ですべてのものを新しいコンテンツに置き換え、someDatetime を変更します。
* -i スイッチはのみ処理されます (変更と変更 datasets.xml 作ってみる) GenerateDataset を実行すると コマンドライン引数のXmlは、プログラムの1つのループに対するすべての質問に対するすべての回答を指定しています。 (上記「スクリプト」を参照してください。)   (考えは: このパラメータはスクリプトを使って使うことです。 インタラクティブモードでプログラムを使用する場合 (キーボードの入力情報) あなたが望むものを生成する前に、XMLの誤ったチャンクを生成する可能性があります。) 
* Begin と End の行が見つからない場合は、これらの行と新しいコンテンツが直前に入力されます。&lt;/erddapDatasets&gt;.
* -I もあります (資本金 i) -i と同じ動作するテストの目的のために切り替えるが、呼び出されるファイルを作成する datasets.xml  *日付時間* 変更を加えない datasets.xml お問い合わせ
* GenerateDatasetを実行しない 一度に2つのプロセスで-iとXml。 変更の1セットのみが保存される可能性がございます。 深刻なトラブルがある (例えば、破損したファイル) お問い合わせ
    
"GenerateDatasetsXml -verbose" を使用する場合は、通常よりも多くの診断メッセージが表示されます。
    
#### 特殊/擬似データセットタイプ{#specialpseudo-dataset-types} 
一般的に、GenerateDatasets の EDDType オプション この文書に記載されているEDDタイプのXmlマッチ (見る [データセットの種類一覧](#list-of-types-datasets) ) 1 つを生成 datasets.xml 1つの特定のデータソースから1つのデータセットを作成するチャンク。 いくつかの例外と特別な例があります。
    
#####  EDDGrid Erddapから{#eddgridfromerddap} 
この EDDType は、すべてを生成する datasets.xml 作るために必要なチャンク [ EDDGrid Erddapから](#eddfromerddap) すべてのデータセットから EDDGrid リモートのデータセット ERDDAP お問い合わせ 元のままにするオプションがあります datasetID ツイート (一部を複製することができる datasetID 既にあなたの ERDDAP ) 新しい名前を生成したり、ユニークになる (しかし、通常、人間が読めるようにはありません) お問い合わせ
     
##### EDDTableFromErddapの特長{#eddtablefromerddap} 
この EDDType は、すべてを生成する datasets.xml 作るために必要なチャンク [EDDTableFromErddapの特長](#eddfromerddap) リモートのEDDTableデータセットからのデータセット ERDDAP お問い合わせ 元のままにするオプションがあります datasetID ツイート (一部を複製することができる datasetID 既にあなたの ERDDAP ) 新しい名前を生成したり、ユニークになる (しかし、通常、人間が読めるようにはありません) お問い合わせ
     
#####  EDDGrid FromThreddsカタログ{#eddgridfromthreddscatalog} 
この EDDType は、すべてを生成する datasets.xml すべてのために必要なチャンク [ EDDGrid FromDapから](#eddgridfromdap) 再帰的にTHREDDSを介してクロールすることによって見つけることができるデータセット (サブサブ) カタログ THREDDSカタログのURLは、多くの形態があります。 このオプションは、/catalog/ の THREDDS .xml URL を、例えば、
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xmlまたは
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml  
(関連 .html カタログはこちら)
https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html、のために受け入れられません EDDGrid FromThreddsCatalogから。
問題がある場合 EDDGrid フォードズ カタログ:
* 使用している URL が有効であることを確認してください。 /catalog/ と /catalog.xml で終了します。
* 可能であれば、パブリックIPアドレスを使用する (例えば、https://oceanwatch.pfeg.noaa.gov) URL ではローカルの数値 IP アドレスではなく、 (例えば、https://12.34.56.78) お問い合わせ THREDDSがローカルの数値IPアドレスを介してのみアクセス可能である場合は、[&lt;変換ToPublicSourceUrl&gt; (#converttopublicsourceurl(コンバート)) お問い合わせ ERDDAP™ ユーザはパブリックアドレスを参照してくださいが、 ERDDAP™ ローカルの数値アドレスからデータを取得します。
* 解決できない問題がある場合、 [トラブルシューティングのヒントをチェック](#troubleshooting-tips) お問い合わせ
* 今の低レベルのコードは、 Unidata netcdf-javaカタログクローラコード (レッド。 カタログクラス) すべてのTHREDDSカタログを扱うことができるように (意外に複雑になる) お問い合わせ Unidata そのコードについて。
         
#####  EDDGrid LonPM180ErddapCatalogより{#eddgridlonpm180fromerddapcatalog} 
この EDDType は、 datasets.xml 作る [ EDDGrid ロンPM180](#eddgridlonpm180) すべてのデータセットから EDDGrid データセット ERDDAP 任意の経度値が180以上の値を持っている。
* 可能であれば、パブリックIPアドレスを使用する (例えば、https://oceanwatch.pfeg.noaa.gov) URL ではローカルの数値 IP アドレスではなく、 (例えば、https://12.34.56.78) お問い合わせ もし、 ERDDAP™ ローカルの数値 IP アドレス経由でのみアクセス可能です。 [&lt;変換ToPublicSourceUrl&gt; (#converttopublicsourceurl(コンバート)) お問い合わせ ERDDAP™ ユーザはパブリックアドレスを参照してくださいが、 ERDDAP™ ローカルの数値アドレスからデータを取得します。
         
#####  EDDGrid Lon0360ErddapCatalogより{#eddgridlon0360fromerddapcatalog} 
この EDDType は、 datasets.xml 作る [ EDDGrid ロン0360](#eddgridlon0360) すべてのデータセットから EDDGrid データセット ERDDAP 任意の経度値が0未満である。
* 可能であれば、パブリックIPアドレスを使用する (例えば、https://oceanwatch.pfeg.noaa.gov) URL ではローカルの数値 IP アドレスではなく、 (例えば、https://12.34.56.78) お問い合わせ もし、 ERDDAP™ ローカルの数値 IP アドレス経由でのみアクセス可能です。 [&lt;変換ToPublicSourceUrl&gt; (#converttopublicsourceurl(コンバート)) お問い合わせ ERDDAP™ ユーザはパブリックアドレスを参照してくださいが、 ERDDAP™ ローカルの数値アドレスからデータを取得します。
         
##### EDDsFromFiles(ファイル){#eddsfromfiles} 
スタートディレクトリに、ディレクトリとすべてのサブディレクトリを横断し、各グループが見つけたデータファイルのデータセットを作成します。
* データセットが見つかった場合、データセットにはすべてのサブディレクトリが含まれます。
* データセットが見つかられば、類似の兄弟のディレクトリは別のデータセットとして扱われます (たとえば、1990年代のディレクトリ、2000年代、2010年代は別々のデータセットを生成します。) お問い合わせ それらは手作業でコンバインするのは簡単です。最初のデータセットを変更するだけです。&lt;fileDir&gt; は、親ディレクトリに、その後のすべての兄弟データセットを削除します。
* チャンクを生成しようとするだけ datasets.xml ディレクトリ内のファイル拡張子の最も一般的なタイプ (無視される .md5 をカウントしない) お問い合わせ つまり、10 のディレクトリを指定した .nc ファイルと5 .txtファイル、データセットが生成されます。 .nc ファイルだけ。
* これは、同じ拡張子を持つディレクトリ内のすべてのファイルが同じデータセットにあると仮定します。 ディレクトリがいくつかある場合 .nc SSTデータといくつかのファイル .nc クロロフィルデータ付きのファイル、1つのサンプル .nc ファイルが読み込まれる (SSTとは? クロロフィル?) そのタイプのファイルで1つのデータセットが作成されます。 そのデータセットは、おそらく同じデータセットに2種類のファイルをロードしようとすると合併症のせいでロードできません。
* ディレクトリに最もよくある拡張子を持つファイルが4つ未満の場合、これはデータファイルではなく、ディレクトリをスキップしていると仮定します。
* ディレクトリに4つ以上のファイルがある場合が、これは正常にディレクトリのチャンクを生成することができません datasets.xml ファイルの場合 (例えば、サポートされていないファイルタイプ) , これは生成します [EDDTableFromFileNames(ファイル名)](#eddtablefromfilenames) ファイルのデータセット。
* これがログファイルに書き込む診断の最後に、直前に datasets.xml チャンク, これは、すべてのサブディレクトリを横断することによって収集された情報の概要とテーブルを印刷します. 表は、すべてのサブディレクトリを一覧表示し、最も一般的な種類のファイル拡張子、ファイルの総数、およびこれらのファイル用に作成されたデータセットの種類を示します。 (お問い合わせ) お問い合わせ 複雑で深くネストされたファイル構造に直面している場合は、GenerateDatasetsの実行を検討してください。 EDDType=EDDsFromFiles と Xml でこの情報を生成します。
* このオプションは、与えられたデータファイルのグループで最高の EDDType を推測する素晴らしい仕事をしないかもしれませんが、それは迅速で簡単で、試してみる価値があります。 ソースファイルが適している場合は、うまく機能し、生成するのに良い最初のステップです datasets.xml サブディレクトリの多いファイルシステムでは、それぞれ異なるデータセットからのデータファイルがあります。
         
##### EDDTableFromEML と EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
これらの特別な EDDType は、 datasets.xml 作る [EDDTableFromAsciiFiles (EDDTableFromAsciiFiles) からの投稿](#eddtablefromasciifiles) 表のそれぞれからのデータセット [エコロジカルメタデータ言語](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) XMLファイル。 "Batch" バリアントは、ローカルまたはリモートディレクトリ内のすべての EML ファイルで動作します。 別途ご確認ください。 [EDDTableFromEML のドキュメント](/docs/server-admin/EDDTableFromEML) お問い合わせ
     
##### EDDTableFromInポート{#eddtablefrominport} 
この特別な EDDType は、 datasets.xml 作る [EDDTableFromAsciiFiles (EDDTableFromAsciiFiles) からの投稿](#eddtablefromasciifiles) 情報からのデータセット [inport-xml ディレクティブ](https://inport.nmfs.noaa.gov/inport) ファイル。 ソースデータファイルにアクセスできる場合 (inport-xml ファイルには、どこに探すべきかがわかります。) 作業データセットを作ることができます。 ERDDAP お問い合わせ

次の手順では、GenerateDatasets を使用する方法について説明します。 作業中のデータセットを取得するには、inport-xml ファイルで Xml ERDDAP お問い合わせ

1. inport-xmlファイルにアクセスしたら (URL またはローカルファイルのいずれか) : GenerateDatasetを実行 Xml は、EDDType=EDDTableFromInPort を指定し、inport-xml URL またはフルファイル名を指定し、どのChild=0 を指定し、その他の要求された情報を指定する (知られている場合) お問い合わせ (この時点で、ソースデータファイルや名前を指定する必要はありません。) whatChild=0 の設定は GenerateDatasets を記述します。 Xml が情報を書き出す **すべて** お問い合わせ&lt;実体属性情報&gt;&lt;entity&gt; の inport-xml ファイル (もしあれば) お問い合わせ また、inport-xml ファイルにリストされているすべてのダウンロード URL を含む背景情報要約を印刷します。
2. 情報をすべて見る (データセットを生成する背景情報を含む Xmlプリント) ダウンロードURLにアクセスして (ツイート) ソースデータファイルを見つけるために (ツイート) お問い合わせ お問い合わせ (お問い合わせ) ダウンロード (お問い合わせ) アクセス可能なディレクトリに ERDDAP お問い合わせ (ソースデータファイルが見つからない場合は、進行中のポイントはありません。) 
3. Generateを実行 データセット 再びXml。
ソースデータファイルがinport-xmlファイルのいずれかに該当する場合&lt;実体属性情報&gt;&lt;entity&gt;'s を指定すると、 *itEntityの番号*   (例: 1, 2, 3, 3) お問い合わせ ERDDAP™ ソース・データ・ファイル内の列名をエンティティティ情報に名前を付けて、任意の矛盾を承諾/拒否/修正するように試みます。
または、inport-xml ファイルが存在しない場合&lt;実体属性情報&gt;&lt;entity&gt;'s は、どのChild=0 を指定します。
4. チャンクで datasets.xml GenerateDatasets で作られたもの Xmlは[グローバル]を復活させます&lt; addAttributes &gt;&gt; (#グローバルアトリビュート) 必要に応じて/望ましい。
5. チャンクで datasets.xml GenerateDatasetsXml で作られたこと、Add/revise&lt; dataVariable &gt;&gt; (#データ変数) 各変数を記述するために必要/desired として情報。 各変数を適切に識別することを確認してください
ツイート&lt; sourceName &gt;&gt; (#ソース名)   (ソースに表示されるように) ,
ツイート&lt; destinationName &gt;&gt; (#目的地名)   (許可された文字よりも制限が大きい sourceName ) ,
ツイート&lt;ユニット&gt; (#ユニット)   (特にそれがである場合 [時間またはタイムスタンプ変数](#timestamp-variables) 単位がフォーマットを指定する必要がある場合) と
ツイート&lt; missing\\_value &gt;&gt; (#missing_value ディレクティブ) ,
6. 仕上げが近い場合、繰り返し使用して下さい [ダスDds](#dasdds) データセットの説明が有効で、データセットが表示されるかどうかをすぐに確認するツール ERDDAP™ お問い合わせ
     

InPortを使用してデータセットを文書化するためにグループが使用すると、それは素晴らしいでしょう ERDDAP™ 実際のデータを利用できるようにするため:

*    ERDDAP™ 今使うことができるソリューションなので、 NOAA お問い合わせ [研究成果公開アクセス (ログイン) 要件](https://nosc.noaa.gov/EDMC/PD.DSP.php) 今は、将来的にいくつかの漠然とした時間ではありません。
*    ERDDAP™ 実際のデータは、メタデータだけでなく、ユーザーに利用できるようにします。 (メタデータはデータなしで何が良いですか?) 
*    ERDDAP™ メタデータのサポート (明らかに、変数の単位) , 考慮されている他のデータサーバソフトウェアとは異なります。. (メタデータなしのデータは何ですか?) メタデータがサポートしていないソフトウェアを使用するには、誤って使用したデータを招待することです。
*    ERDDAP™ 他のソフトウェアとは異なり、フリーでオープンソースソフトウェアは考慮されています。 受託開発 ERDDAP™ 既に有料です。 サポート ERDDAP™ ご利用者は無料です。
*    ERDDAP あなたのグループを反映し、強調するために「出現は容易にカスタマイズすることができます (コメントはありません ERD または ERDDAP ) お問い合わせ
*    ERDDAP™ すべてのデータセットにアクセスするための一貫した方法を提供します。
*    ERDDAP™ さまざまな種類のデータファイルやリレーショナルデータベースからデータを読み込みます。
*    ERDDAP™ ソースデータが多くのデータファイルにあるデータセットを含む大量のデータセットを扱うことができます。
*    ERDDAP™ netCDF、ESRI .csv などの科学的なデータファイルタイプを含む、ユーザーの要求で、多くの種類のデータファイルにデータを書き込むことができます。 ODV .txt お問い合わせ
*    ERDDAP™ ユーザーの仕様に基づいて、データのサブセットのカスタムグラフとマップを作成できます。
*    ERDDAP™ 画像、ビデオ、またはオーディオファイルのコレクションなどの非データデータセットを扱うことができます。
*    ERDDAP™ 取付けられ、使用されて [世界の60以上の機関](/#who-uses-erddap) お問い合わせ
*    ERDDAP™ 内で使用するために推奨されるデータサーバーの1つとしてリストされています NOAA お問い合わせ [ NOAA データアクセス手続き型指令](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) , 考慮されている他のソフトウェアとは異なります.
*    ERDDAP™ はプロダクトのです NMFS / / / / NOAA なので、 NMFS そして、 NOAA 誇りのポイントであるべき NMFS そして、 NOAA お問い合わせ

お問い合わせ ERDDAP™ お問い合わせ 助けが必要な場合は、メッセージをメールでお送りください。 ERDDAP™ Googleグループ。
     
##### addFillValue属性{#addfillvalueattributes} 
この特別な EDDType オプションはデータセットタイプではありません。 いくつかのデータセットで \\_FillValue 属性をいくつかの変数に追加できるツールです。 お問い合わせ [addFillValue属性](#add-_fillvalue-attributes) お問い合わせ
     
##### findDuplicateの検索 タイムタイム{#findduplicatetime} 
この特別な EDDType オプションはデータセットタイプではありません。 代わりに、GenerateDatasets を伝えます。 グリッドされたコレクションを調べるXml .nc   (と関連) 重複した時間値でファイルのリストを見つけて印刷するファイル。 時間値を見ると、元の単位から元の単位へ変換します。 "seconds since 1970-01-01" 異なるファイルでは、異なる単位の文字列を使用します。 開始ディレクトリを提供する必要があります。 (か、または追跡のスラッシュなしで) ファイル名正規表現 (例:.\\*\\\ .nc  ) ファイル内の時間変数の名前。
     
##### ログイン{#ncdump} 
この特別な EDDType オプションはデータセットタイプではありません。 代わりに、GenerateDatasets を伝えます。 Xml を印刷する [ログイン](https://linux.die.net/man/1/ncdump) \\ のようなプリントアウト .nc , .nc ml、または .hdf ファイル。 これは実際にnetcdf-javaの [NCダンプ](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html) NCdumpのCバージョンよりも限られたツールです。 このオプションを使用する場合、GenerateDatasetsXml はオプションの 1 つを使用するように要求します。 (ヘッダー) , "-c" (調整変数) , "-vall" (デフォルト) , "-v var1;var2", "-v var1 (0,0:10,0:20) お問い合わせ これは、ncdumpなしで、それが何であるかを知ることは難しいので、これは便利です .nc , .nc ml、または .hdf そのため、GenerateDataset に指定する EDDType を指定します。 Xml。 お問い合わせ .nc mlファイル、これは結果のncdump出力を印刷します .nc ml ファイルがアンダーリングに適用される変更 .nc または .hdf ファイル。
         
### ダスDds{#dasdds} 
*    [ **ダスDds** ](#dasdds) コマンド・ライン・プログラムで、新しいデータセットでXMLで最初の試みを作成した後に使用できる datasets.xml お問い合わせ DasDds では、XML を繰り返しテストし、精製することができます。 DasDdsプログラムを使用する場合:
    1. Windowsでは、DasDdsを実行する初めて、DasDdsを編集する必要があります。 java へのパスを変更するテキストエディタでファイルをバットします。 Windowsが見つけることができるようにexeファイル Java お問い合わせ
    2. DasDds は、 datasetID 作業中のデータセット
    3. DasDds は、そのデータセットを作成する datasetID お問い合わせ
        * DasDdsは、常に多くの診断メッセージを印刷します。
"DasDds -verbose" を使うと、DasDds は通常のものよりも多くの診断メッセージを出力します。
        * 安全のために、DasDdsは常にキャッシュされたデータセット情報をすべて削除します (ファイル) データセットを作成する前にデータセットのために。 これは、設定の同等です [堅い旗](/docs/server-admin/additional-information#hard-flag) 集計したデータセットでは、データコンストラクタが見つけたファイル数を制限するために、fileNameRegex を一時的に調整したい場合があります。
        * データセットがロードできなかった場合 (何らかの理由で) , DasDds は、見つかった最初のエラーに対するエラーメッセージを停止し、表示します。
             **問題が何であるかを推測しようとしないでください。 ERROR のメッセージを注意深く読んで下さい。**   
必要に応じて、前述の診断メッセージを読んで、より多くの手がかりや情報を見つけます。
        *    **データセットのXMLに変更してTHATの問題を解決しよう**   
DasDds がデータセットを再度作成しようとします。
        *    **各問題を繰り返し解決すると、最終的にすべての問題を解決します。**   
データセットが読み込まれます。
    4. すべての DasDds 出力 (診断および結果) 画面に書かれ、 *bigParentディレクトリ* /logs/DasDds.log . .
    5. DasDds がデータセットを作成することができれば、DasDds は、 [.ダス (データセット属性構造) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das) , [ログイン (データセット記述子 コンテンツ) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds) と [.timeギャップ (時間ギャップ) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) 画面上のデータセットの情報は、それらに書き込む *bigParentディレクトリ* /logs/DasDds.out .
    6. 多くの場合、データセットのメタデータをクリーンアップし、DasDdsを再実行するために、データセットのXMLにいくつかの小さな変更をしたいです。

### ボーナス サードパーティツール: ERDDAP -リント{#bonus-third-party-tool-erddap-lint} 
 ERDDAP -lintは、あなたのメタデータを改善するために使用できるアイリッシュ・マリン・インスティテュートのロブ・フラーとアダム・リードベッターのプログラムです ERDDAP™ データセット。 ERDDAP -lint "ルールと簡単な静的Webアプリケーションが含まれているため、検証テストを強制的に実行できます。 ERDDAP™ サーバ。 すべてのテストは、Webブラウザで実行されます。 いいね&#33; [Unix/Linux lint ツール](https://en.wikipedia.org/wiki/Lint_(software) ) 既存のルールを編集したり、新しいルールを追加したりすることができます。 お問い合わせ [ ERDDAP -リント](https://github.com/IrishMarineInstitute/erddap-lint) 詳しくはこちら

このツールは、以前に作成したデータセットに特に便利です。現在のメタデータ設定を最新のものにしたいです。 たとえば、GenerateDatasetの初期バージョン Xmlは、グローバルに創造する努力を払っていなかった creator\\_name , creator\\_email , 作成者\\_type, または creator\\_url メタデータ。 利用する ERDDAP -lint は、メタデータ属性が欠けているデータセットを識別します。

このツールを作成するためのロブとアダムのおかげで、利用可能なツールを作る ERDDAP™ コミュニティ。
 
## 基本構成 datasets.xml ファイル{#the-basic-structure-of-the-datasetsxml-file} 
必須タグとオプションタグは、 datasets.xml ファイル (表示される回数) 以下が表示されます。 練習では、 datasets.xml たくさんあります&lt;dataset&gt; のタグと、他のタグのみを内部で使用&lt;erddapDatasets&gt; 必要に応じて。

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

今後、他のエンコーディングが許可される可能性はありますが、今ではISO-8859-1のみが推奨されます。
 
### Xincludeの特長{#xinclude} 
バージョン 2.25 の新機能は Xinclude のサポートです。 これは、SAXパーサーを使用する必要があります&lt;使用SaxParser&gt;true&lt;/useSaxParser&gt; を setup.xml で指定します。 これにより、各データセットを独自のファイルに書き込むことができます。 datasets.xml , データセット定義の部分を再利用, または両方. 例えば、 [EDDTestDataset.java の使い方](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java) 変数定義を再利用するためにXincludeを設定します。
 

- - - - -

## インフォメーション{#notes} 

と働く datasets.xml file は非トリバイアルプロジェクトです。 注意してお読みください。 ピックアップ後 [データセットのタイプ](#list-of-types-datasets) 詳しくはこちらをご覧ください。
     
### データセットタイプの選択{#choosing-the-dataset-type} 
ほとんどの場合、1つだけあります ERDDAP™ 特定のデータソースに適したデータセットタイプ。 少数の場合 (例: .nc ファイル) , いくつかの可能性があります。, しかし、通常、それらの一つは間違いなく最善です. あなたがしなければならない第一と最大の決定は次のとおりです。多次元配列のグループとしてデータセットを扱うのは適切です (もしそうなら、 [ EDDGrid データセットの種類](#eddgrid) ) またはデータベースのようなデータのテーブルとして (もしそうなら、 [EDDTable データセットタイプ](#eddtable) ) お問い合わせ
     
### データをそのまま活用{#serving-the-data-as-is} 
通常、データソースを変更する必要はありません (例えば、ファイルを他のファイルタイプに変換する) そのために ERDDAP™ お問い合わせ 前提の1つ ERDDAP™ データソースはそのまま利用します。 通常、この作品はうまくいきます。 いくつかの例外は:
* 地域データベースとカサンドラ お問い合わせ ERDDAP™ リレーショナルデータベースやCassandraから直接データを配信できます。 しかし、セキュリティ、バランシング、およびパフォーマンスの問題については、同じデータで別のデータベースを設定するか、データを保存するかを選択できます。 NetCDF v3の .nc ファイルと ERDDAP™ 新しいデータソースからデータを配信します。 お問い合わせ [EDDTableFromデータベース](#eddtablefromdatabase) そして、 [EDDTableFromCassandraさん](#eddtablefromcassandra) お問い合わせ
* データソースをサポートしていません。 ERDDAP™ 大量のデータソースに対応できますが、1000年代に世界が満たされています (数百万?) 異なるデータソースの (同様に、データファイル構造) お問い合わせ お問い合わせ ERDDAP™ データソースをサポートしていません。
    * データソースが NetCDF   .nc ファイル、使用することができます [ログイン](#ncml-files) データをオンザフライで変更したり、使用する [ NCO ](#netcdf-operators-nco) データを永続的に変更する。
    * データをデータソースタイプに書き込むことができます。 ERDDAP™ サポート NetCDF 3 .nc ファイルがバイナリファイルなので、一般的な推奨事項です。 ERDDAP™ すぐに読むことができます。 表データの場合、データの収集にデータを保存することを検討してください .nc 使用するファイル [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 一貫性のあるレイド配列のデータ構造なので、 ERDDAP お問い合わせ [EDDTableFromNcCFファイル](#eddtablefromnccffiles) )。 論理的に整理されている場合 (スペースと時間のチャンクのためのデータとそれぞれ) , ERDDAP™ データを素早く抽出することができます。
    * そのデータソースのサポートをリクエストすることができます。 ERDDAP™ Chrisにメールを送る noaaa.govのジョン
    * 処理するコードを書くことで、そのデータソースのサポートを追加できます。 お問い合わせ [お問い合わせ ERDDAP™ プログラマガイド](/docs/contributing/programmer-guide) 
* 速度 -- ERDDAP™ 他の人よりもはるかに高速なデータソースからデータを読むことができます。 例えば、読み込み NetCDF v3の .nc ファイルは高速で、ASCIIファイルを読み込みが遅くなります。 大きい場合 (&gt;1000の) または巨大 (&gt;10,000円) ソースデータファイル数、 ERDDAP™ 一部のデータリクエストは、ゆっくり対応いたします。 通常、違いは人間に気づくことができません。 しかし、そう考えると ERDDAP™ 特定のデータセットでは、データをより効率的な設定に書き込むことで問題を解決する場合があります。 (通常: 少数、よく構造化される、 NetCDF v3の .nc ファイル) お問い合わせ 表データについては、 [このアドバイス](#millions-of-files) お問い合わせ
         
### ログイン{#hint} 
多くの場合、dataset.xml で作業データセットの説明のコピーを作成し、それを変更することで、データセット用の XML を生成することが容易です。
    
### 特殊キャラクターのエンコーディング{#encoding-special-characters} 
お問い合わせ datasets.xml XMLファイルです。 [・エンコード](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML) お問い合わせ&lt;"&amp;"、"&lt;と "&gt;"
間違った:&lt;タイトル&gt; タイム&ティデス&lt;/タイトル&gt;
右:&lt;タイトル&gt; 時間 &amp; ティデス&lt;/タイトル&gt;
     
### XML は構文エラーを許容しません{#xml-doesnt-tolerate-syntax-errors} 
dataset.xml ファイルを編集した後、結果が正しいかを検証するのは良い考えです。 [よく形成されたXML](https://www.w3schools.com/xml/xml_dtd.asp) XMLテキストをXMLチェッカーに貼り付ける [xmlvalidationの](https://www.xmlvalidation.com/) お問い合わせ
     
### トラブルシューティングのヒント{#troubleshooting-tips} 
*    **データセットの問題を診断する他の方法**   
2つのメインに加えて [ツール](#tools) ,
    *    [ログイン](/docs/server-admin/additional-information#log) すべてのログファイルです ERDDAP 診断メッセージ
    * ザ・オブ・ザ・ [デイリーレポート](/docs/server-admin/additional-information#daily-report) ロードしなかったデータセットのリストと例外を含むステータスページよりも多くの情報があります。 (エラー) 生成される。
    * ザ・オブ・ザ・ [ステータスページ](/docs/server-admin/additional-information#status-page) 確認するための簡単な方法 ERDDAP 任意のWebブラウザからのステータスです。 ロードされていないデータセットのリストが含まれています (関連する例外ではありませんが) タスクスレッドの統計 (進行状況を示す [ EDDGrid コピー](#eddgridcopy) そして、 [EDDTableコピー](#eddtablecopy) データセットと任意の [ EDDGrid ファイルから](#eddgridfromfiles) または [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 使用するデータセット [キャッシュFromUrl](#cachefromurl)   (キャッシュではなく サイズGB) ) お問い合わせ
    * あなたが立ち往生したら、私たちを参照してください [追加サポートを受けるセクション](/docs/intro#support) お問い合わせ
         
### 特別な変数{#special-variables} 
*    ** [経度、緯度、高度、深さ、圧力および時間 (ログイン) 変数](#destinationname)   [ destinationName ](#destinationname) sは特別です。** 
    * 一般:
        * LLAT 変数は、 ERDDAP™ 軸変数の (お問い合わせ EDDGrid データセット) データ変数 (EDDTable データセット用)   [ destinationName ](#destinationname) "longitude", "latitude", "altitude", "depth"," "time" お問い合わせ
        * 可能な限りこれらの変数にこれらの標準名を使用するように強くお勧めします。 どれも必要です。 これらの特別な変数名を使用しない場合、 ERDDAP™ 彼らの意義を認識しません。 例えば、LLAT 変数はグラフを作成することによって特に扱われます ( * datasetID * .グラフ) : X軸変数が "longitude" で Y 軸変数が "latitude" の場合、マップを取得します。 (標準的な投影を使用して、そして土地のマスク、政治の境界、等と。) グラフの代わりに。
        *    ERDDAP™ LLAT 変数にメタデータの多くを自動的に追加します。 (例えば " [ ioos\\_category ](#ioos_category) お問い合わせ [ユニット](#units) "、"\\_CoordinateAxisType" のような複数の標準関連属性) お問い合わせ
        *    ERDDAP™ 自動的に、オンザフライ、選択したデータサブセットのLLAT値に関連する多くのグローバルメタデータを追加します。 (たとえば "geospatial\\_lon\\_min") お問い合わせ
        * これらのメタデータ規格をサポートするクライアントは、時間と空間のデータを配置するために、追加したメタデータを活用することができます。
        * クライアントは、変数の名前が関連するすべてのデータセットで同じであるため、LLAT 変数を含むクエリを簡単に生成できます。
    * "longitude" 変数と "latitude" 変数の場合:
        * 利用する [ destinationName ](#destinationname) s 「経度」と「緯度」のみ [ユニット](#units) それぞれ、度\\_eastと度\\_northです。 データがこれらの要件を満たしていない場合、異なる変数名を使用する (例えば、x、y、lonRadians、latRadians) お問い合わせ
        * 経度と緯度データが異なる単位で表現されているため、異なる場合 destinationName s、例えば、lonRadiansとlatRadiansは、グラフを作る ( * datasetID * .グラフ) グラフを作る (例えば、時系列) マップではなく。
    * "高度", "presure","depth" 変数の場合:
        * 利用する [ destinationName ](#destinationname) 標高上のデータ距離を識別する「高度」 (肯定的な="up" 値) お問い合わせ 必要に応じて、海底に値がマイナスである場合(または使用する場合など)、海底の下の距離に対して「高度」を使うことができます。
ツイート&lt;att 名称 scale\\_factor "type="int"&gt; - 1&lt;/att&gt; (#scale_factor(スケールファクター)) 深さ値を高度の値に変換します。
        * 利用する destinationName 海レベル以下のデータ距離を識別するための「深さ」 (肯定的な="ダウン" 値) お問い合わせ
        * または、空気圧レベルによって定義される高度のために (など [イソバ](https://en.wikipedia.org/wiki/Contour_line#Barometric_pressure) ) 、置くべきです destinationName 「圧力」へ。 "hPa", "Pa", "mbar" のユニットをサポートしています。 (肯定的な="ダウン" 値) お問い合わせ
        * データセットは、「高度」、「圧力」、「または「」変数の1つだけあるかもしれません。
        * これらの「高度」と「深さ」変数については、 [ユニット](#units) "m", "m", "m" でなければなりません。 ユニットが異なる場合 (例えば, fathoms) 、使用することができます
ツイート&lt;att 名称 scale\\_factor ツイート *詳しくはこちら バリュー* &lt;/att&gt; (#scale_factor(スケールファクター)) と [&lt;att name="units"&gt;メーター&lt;/att&gt; (#ユニット) 単位をメートルに変えるために。
        * データがこれらの要件を満たしていない場合は、異なる destinationName   (例えば、上向き、距離 トーボトム) お問い合わせ
        * 縦型CRSを知っている場合は、メタデータに「EPSG:5829」を指定してください。 (海のレベルの上の即時の高さ) , "EPSG:5831" (海のレベルの下の即時の深さ) , または "EPSG:5703" (NAVD88の高さ) お問い合わせ
    * お問い合わせ "time" 変数:
        * 利用する [ destinationName ](#destinationname)   "time" date+time 全体を含む変数のみ (または日付、それがすべてある場合) お問い合わせ 例えば、日付とtimeOfDayの別のカラムがある場合、変数名は使用しません。 "time" お問い合わせ
        * お問い合わせ [ユニット](#time-units) time と timeStamp 変数の unit 属性に関する詳細情報
        * 時間変数および関連 [タイムタイム スタンプ変数](#timestamp-variables) ソースの時刻形式からデータを常に変換するという点でユニークです。 (それが何か) 数値値に (1970-01-01T00:00:00Z以来の秒) または 文字列の値 (ISO 8601の:2004年 (Eメール) フォーマット) , 状況に応じて.
        * ユーザがタイムデータをリクエストする場合、数値として時刻を指定することでリクエストできます。 (1970-01-01T00:00:00Z以来の秒) または 文字列の値 (ISO 8601の:2004年 (Eメール) フォーマット) お問い合わせ
        *    ERDDAP™ ユーティリティを持っている [数値変換 文字列の時間から/までの時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) お問い合わせ
        * お問い合わせ [使い方 ERDDAP 時間とともにお得な情報](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) お問い合わせ
            
### なぜ2つの基本データ構造?{#why-just-two-basic-data-structures} 
* 人間クライアントやコンピュータクライアントがデータセット構造の複雑なセットに対処するのは難しいので、 ERDDAP™ 2つの基本的なデータ構造だけを使用して下さい:
    * は、 [グリッドされたデータ構造](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)   (例えば、衛星データやモデルデータなど) そして、
    * は、 [集計データ構造](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)   (たとえば、in-situ buoy、駅、軌跡データなど) お問い合わせ
* 確かに、これらの構造ではすべてのデータが表現できるわけではありませんが、その多くは可能です。 特にテーブルは、非常に柔軟なデータ構造です (リレーショナルデータベースプログラムの成功を見る) お問い合わせ
* これにより、データクエリを簡単に構築できます。
* これにより、データ応答は単純な構造を持ち、より広範囲な標準ファイルタイプでデータをより簡単に配信できます。 (シンプルなデータ構造をサポートすることが多い) お問い合わせ これは私たちが設定した主な理由です ERDDAP™ この方法。
* これは、順番に、私たちにとって非常に簡単です (誰にも) クライアントソフトウェアを全て書き込む ERDDAP™ データセット。
* これにより、異なるソースからデータを比較しやすくなります。
* 他のデータ構造でデータを操作するために使用している場合、このアプローチは単純であるか、不十分であると考えることは非常に認識しています。 しかし、すべてのデータ構造はトレードオフを持っています。 どれも完璧です。 do-it-all構造体でさえ、その欠点を持っています。それらと一緒に作業することは複雑であり、ファイルは特別なソフトウェアライブラリでのみ書き込みまたは読み込むことができます。 ご了承の程 ERDDAP 's はそれに対処するのに十分なアプローチ、それがその利点を持っていることを見つけるかもしれません (データ応答を保持できる複数のファイルタイプのサポート) お問い合わせ ザ・オブ・ザ・ [ ERDDAP™ スライドショー](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)   (特に [データ構造のスライド](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures) ) これらの問題についてたくさん話します。
* そして、このアプローチがあなたに奇妙に聞こえても、ほとんど ERDDAP™ クライアントは気付くことはありません - それらは単にすべてのデータセットが素敵なシンプルな構造を持っていることを見て、彼らは彼らが様々なファイル形式で返された様々なソースからデータを得ることができます感謝されます。
         
### サイズ:{#dimensions} 
*    **ソースデータセット DON'T のグリッド変数が同じ軸変数を共有するとどうなりますか?**   
インスタグラム EDDGrid データセット、すべてのデータ変数は使用しなければ (シェア) 軸変数のすべて。 そのため、ソースデータセットが1セットの寸法と異なる種類の変数を持ついくつかの変数がある場合、あなたは2つのデータセットを作る必要があります ERDDAP お問い合わせ 例えば、 ERDDAP™ 「Some Title」と題するデータセット (表面で) " 使用する変数を保持する \\[ タイムタイム \\]  \\[ 最近の投稿 \\]  \\[ 経緯 \\] 次元および別の作って下さい ERDDAP™ 「Some Title」と題するデータセット (深さで) " 使用する変数を保持する \\[ タイムタイム \\]  \\[ 高度の高度 \\]  \\[ 最近の投稿 \\]  \\[ 経緯 \\] お問い合わせ または、データソースを変更して、単一の値で次元を追加することができます (例えば、altitude=0) 変数を一貫したものにするため。
    
     ERDDAP™ 複雑なデータセットを扱いません (例えば、三角形のメッシュを使用するモデル) お問い合わせ これらのデータセットは、 ERDDAP™ 2 つ以上のデータセットを作成する ERDDAP™   (各新しいデータセット内のすべてのデータ変数が同じ軸変数のセットを共有するように) しかし、それはユーザーが望むものではありません。 一部のデータセットでは、データセットの定期的なグリッドバージョンの作成を検討し、元のデータに加えてそれを提供する可能性があります。 一部のクライアントソフトウェアは、通常のグリッドのみに対処することができるため、これを行うことで、追加のクライアントに到達します。
     
    
### グリッドデータ{#projected-gridded-data} 
一部のグリッドデータには複雑な構造があります。 例えば、衛星レベル2 (「空中トラック」) 単純な投影は使用しません。 モデラー (その他) 多くの場合、さまざまな非円筒形の投影に関するグリッドデータを扱う (例えば、conic、極端のステレオグラフィック、tripolar) または未構造のグリッドで (より複雑なデータ構造) お問い合わせ 一部のエンドユーザーは、このデータをそのまま望んでいるので、情報を失うことはありません。 お客様には、 ERDDAP™ つまり、データを扱うことができます。 ERDDAP™ 管理者は、元のデータセットを複数のデータセットに分割し、同じ軸変数を共有する変数を含む各部分を分割します。 はい、それは関係者と異なり、ほとんどとは違うようです OPeNDAP サーバ。 しかし、 ERDDAP™ さまざまなフォーマットで利用可能なデータを作成することを強調します。 だからこそできる ERDDAP™ より均一なデータ構造を使用する/要求します。 それは少し厄介ですが (i.e., 予想以上に異なる) , ERDDAP™ プロジェクトのデータを配布することができます。

 \\[ はい、 ERDDAP™ データ構造のためのより緩い条件が、出力フォーマットのための条件を保つことができます。 しかし、それは、データがファイルタイプに収まらないので、さまざまな構造を持つデータに対する有効な要求が異なるため、多くのユーザー、特に初心者の間で混乱につながるだろう。 現在のシステムの設計に戻り続けます。 \\] 

一部のエンドユーザーは、さまざまな状況で簡単に使用できるため、Equirectangular / plate carrée や Mercator などのラロン円筒形の投影でデータを望む人もいます。 これらの状況では、 ERDDAP™ 他のソフトウェアを使用する管理者 ( NCO お問い合わせ Matlab お問い合わせ ログイン IDVとは? お問い合わせ) データをジオグラフィックに再プロジェクトする (長方形の映写/版のCarrée) またはその他の円筒状投影およびその形態のデータを ERDDAP™ 別のデータセットとして。 これは、衛星レベル2データをレベル3データに変換したときに何をすべきかに似ています。 そのようなツールは、 [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) データを登録するための拡張オプションを提供しています。

#### GISとデータの再構築{#gis-and-reprojecting-data} 
GISの世界は、しばしば指向マップであるため、GISプログラムは、通常、異なる投影でマップ上のデータをプロットするためのサポートを提供しています。

現在、 ERDDAP™ データを再プロジェクトするツールはありません。 代わりに、外部ツールを使用して、データセットのバリエーションを作成することをお勧めします。元のフォームから、データを長方形にリプロジェクションしています。 (緯度経度) 配列 のために適した ERDDAP お問い合わせ

私たちの意見では、CF/ DAP 世界はGISの世界とは少し異なり、少し下がるレベルで動作します。 ERDDAP™ それを反映させます。 一般的には、 ERDDAP™ 主にデータを扱うように設計されています (地図ではなく) 変更したくない (例:リプロジェクト) そのデータ。 お問い合わせ ERDDAP™ , グリッドされたデータは、多くの場合/通常/できればlat lon 値と円筒形の投影と関連しています。, いくつかの投影のx,y値ではありません。. どんな場合でも、 ERDDAP™ データの投影で何もしません。 つまり、現在の投影で、リプロジェクションがデータへの大きな変化であり、 ERDDAP™ 重要な変更に関与したくない。 また、その後のユーザーは、再びデータを処理し直す可能性があるため、たったひとつのリプロジェクションを行わないと良いでしょう。 (ですから、 ERDDAP™ 管理者は、異なる投影でデータを提供したい、罰金; データをオフラインで再プロジェクトし、異なるデータセットとして提供したい ERDDAP お問い合わせ 衛星ベースのデータセットの多くは、NASAがレベル2を呼び出しているものとして提供されています (スワス) レベル3として (長方形の投射) バージョン。) いつか ERDDAP™ 地図を作る (直接または WMS または KML) , ERDDAP™ 現在、Equirectangular / plate carrée のプロジェクションで地図を作るだけを提供しています。幸いにも、ほとんどのマッピングプログラムで受け入れられています。

お問い合わせ ERDDAP™ 他のソフトウェアを使用する管理者 ( NCO お問い合わせ Matlab お問い合わせ ログイン IDVとは? お問い合わせ) データをジオグラフィックに再プロジェクトする (長方形の映写/版のCarrée) またはその他の円筒状投影およびその形態のデータを ERDDAP™ 別のデータセットとして。 これは、衛星レベル2データをレベル3データに変換したときに何をすべきかに似ています。 そのようなツールは、 [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) データを登録するための拡張オプションを提供しています。

お問い合わせ ERDDAP™ 将来的には他の投影で地図を提供するための組み込みツールがあります。 今後、GISの世界へのより良いつながりを持つことを願っています。 (現在のもの以外 WMS サービス) お問い合わせ この「モダン」の世界では、CF/間のリンクがひどい DAP 世界とGISの世界はまだ弱い。 どちらのものが To Do リストにあります。 (あなたが助けたいなら、特に接続して ERDDAP™ MapServer に、Chris にメールを送ってください。 noaaa.gov のジョン。) 
    
### データの種類{#data-types} 
 ERDDAP™ 以下のデータ型をサポートしています。
 (名前は場合の敏感です; 'u' prefix は "unsigned" を表します。他のシステムの名前の多くはビット数です。) : : :

#### バイト{#byte} 
*    **バイト** -128〜127の範囲で整数値を署名しました。
他のシステムでは、int8と呼ばれることもあります。
これは SQL と Cassandra によって "tinyint" と呼ばれます。
     ERDDAP™ コンバーター [ログイン](#boolean-data) いくつかのソースから (例:SQLとCasandra) バイトに ERDDAP™ 0=false, 1=true, 127=の値で missing\\_value お問い合わせ
#### uバイト{#ubyte} 
*    **uバイト** 0 から 255 の範囲で整数値を符号化しました。
他のシステムでは、これは時々uint8と呼ばれます。
#### ショート{#short} 
*    **ショート** -32768 から 32767 の範囲で整数値を署名しました。
他のシステムでは、int16 と呼ばれることもあります。
SQL と Cassandra の「smallint」と呼ばれます。
#### ushortショート{#ushort} 
*    **ushortショート** 0〜65535の範囲で整数値を符号化しました。
他のシステムでは、これは時々uint16と呼ばれます。
#### ログイン{#int} 
*    **ログイン** -2147483648 から 2147483647 の範囲で整数値を署名しました。
他のシステムでは、int32と呼ばれることもあります。
これは「整数」と呼ばれます | インフォメーション (お問い合わせ) 「Cassandra による SQL と "int" による。
#### ログイン{#uint} 
*    **ログイン** 0〜4294967295の範囲で整数値を符号化しました。
他のシステムでは、これは時々uint32と呼ばれます。
#### ロング{#long} 
*    **ロング** -9223372036854775808 から 9223372036854775807 の範囲で整数値を署名しました。
他のシステムでは、int64と呼ばれることもあります。
これは "bigint" と呼ばれます | インフォメーション (お問い合わせ) 「Cassandra による SQL と "bigint" による。
多くのファイルタイプが長いデータをサポートしていないため、使用は推奨されません。 可能であれば、代わりに2倍を使う (詳しくはこちら) お問い合わせ
#### ログイン{#ulong} 
*    **ログイン** 0から18446744073709551615の範囲の符号なし整数値
他のシステムでは、これは時々uint64と呼ばれます。
複数のファイルタイプが ulong データをサポートしていないため、使用は推奨されません。 可能であれば、代わりに2倍を使う (詳しくはこちら) お問い合わせ
#### フローティング{#float} 
*    **フローティング** 約+/- 3.402823466e+38の範囲のIEEE 754フロートです。
他のシステムでは、これはfloat32と呼ばれます。
これは「本物」と呼ばれます | フローティング (お問い合わせ)  | デシマル (お問い合わせ)  | インフォメーション (お問い合わせ) 「CassandraのSQLとfloatによる」
NaN は、No-a-Number を意味します。
     ERDDAP™ 正味値と負の無限値をNaNに変換します。
#### ダブル{#double} 
*    **ダブル** IEEE 754のダブルサイズで、
+/- 1.7976931348623157E+308。
他のシステムでは、これはfloat64と呼ばれます。
これは「二重精密」と呼ばれます | フローティング (お問い合わせ)  | デシマル (お問い合わせ)  | インフォメーション (お問い合わせ) 「Cassandra による SQL と "double" による。
NaN は、No-a-Number を意味します。
     ERDDAP™ 正味値と負の無限値をNaNに変換します。
#### チャート{#char} 
*    **チャート** シングル、2バイト (16ビット)   [Unicode UCS-2 文字](https://en.wikipedia.org/wiki/UTF-16) から \\u0000   (#0) コース \\uffff   (番号65535) お問い合わせ
     \\uffff 's の定義は NaN の二重価値に類似する Not-a-Character です。
char の使用は、複数のファイルタイプがcharsをサポートしていないか、1バイトのcharsをサポートしていないため、推奨されるものではありません。 (詳しくはこちら) お問い合わせ 代わりに String を使用して検討してください。
char 変数を使用してグラフを作成できます。 ERDDAP™ 文字をUnicodeのコードポイント番号に変換し、数値データとして使用できる。
#### ストリング{#string} 
*    **ストリング** 0 以上のシーケンス、2 バイト (16ビット)   [Unicode UCS-2 文字](https://en.wikipedia.org/wiki/UTF-16) お問い合わせ
     ERDDAP™ 0 の長さの文字列を欠落値として使用/解釈します。 ERDDAP™ 真の null 文字列をサポートしません。
理論的最大弦長は2147483647文字ですが、やや短い弦でも様々な場所では様々な問題があります。
使用条件 ERDDAP SQL の文字、varchar、文字が変化する、バイナリ、varbinary、インターバル、配列、マルチセット、xml などの文字列。他のどのデータベースもクリーンに収まらない ERDDAP™ データ型。
使用条件 ERDDAP 'Cassandra's "text" の文字列と、他のどのCassandraのデータタイプでもきれいに収まらない ERDDAP™ データ型。
     

新着情報 ERDDAP™ v2.10, ERDDAP™ 符号なし整数型を内部でサポートし、データリーダーやライターの限られたサポートを提供していません。
    
### データの種類制限{#data-type-limitations} 
お問い合わせ ERDDAP™ 仮想データセットを持つシステムとして、データセットのソースからデータを内部データモデルに読み込み、さまざまなサービスにデータを書き込みすることにより動作します(例:(OPeN)DAP, WMS ) ユーザリクエストに対応するファイルタイプ。

* 各入力リーダーは、データタイプのサブセットをサポートしています ERDDAP™ サポート データを読み込む ERDDAP '内部データ構造は問題ではありません。
* 各出力ライターは、データタイプのサブセットにも対応しています。 それが問題だから ERDDAP たとえば、長いデータをサポートしていないファイルタイプに長いデータがスクイーズする必要があります。
     

以下は制限の説明です。 (どれも) さまざまな出力ライターとどのように ERDDAP™ 問題に対処する。 このような合併症は、固有の部分です ERDDAP 「システムを相互運用可能にするという目標」

#### アスキー{#ascii} 
* アスキー (.csvの .tsv 等。) テキストファイル -
    * すべての数値データは文字列表現で書かれています (0 の長さの文字列として表示されていないデータ値で) お問い合わせ
    * しかし、 ERDDAP™ 長い値と ulong 値を ASCII テキストファイル、多くの読者に正しく書きます (例:スプレッドシートプログラム) 長い値とulong値に正しく対処できず、代わりにそれらを二重値に変換できます (場合によっては精密の損失と) お問い合わせ
    * 全Unicode文字を扱うJSON 文字列で、Char と String のデータが書かれています。 (当然のことながら、ASCII #127 を超える「珍しい」文字は「\\u20ac」としてユーロ文字が現れます。) お問い合わせ
    
        
#### ジェイソン{#json} 
* ジェイソン ( .json , .jsonlCSV 等。) テキストファイル -
    * すべての数値データは文字列表現で書かれています。
    * 全Unicode文字を扱うJSON 文字列として、Char と String のデータが書かれています。 (当然のことながら、ASCII #127 を超える「珍しい」文字は「\\u20ac」としてユーロ文字が現れます。) お問い合わせ
    * すべての数値データ型の値がnullとして表示されます。
         
####  .nc 3ファイル{#nc3-files} 
*    .nc 3つのファイルは、署名されていない整数データ型をサポートしていません。 CF v1.9 以前は、CF は署名されていない整数型をサポートしていませんでした。 これに対処するため、 ERDDAP™ 2.10+ は NUG 標準に従い、常に "true" または "false" の値を "\\_Unsigned" 属性を追加し、データを符号化されていないか、署名された変数からあるかを示す。 すべての整数属性は署名された属性として書かれています (例:バイト) 署名された値(例えば、uバイト) actual\\_range 値 0 から 255 までの属性は、値 0 から -1 までのバイト属性として表示されます。(2 の補完値の逆)。 (署名された)整数属性が符号化されていない属性として読み取るべきでない方法はありません。 ERDDAP™ 読み込み時に "\\_Unsigned" 属性をサポート .nc 3ファイル。
*    .nc 3つのファイルは、長いデータ型やulongデータ型をサポートしていません。 ERDDAP™ それらを一時的に変換することにより、これを二重変数に引き出す。 倍は正確に+/- 9,007,199,254,740,992まですべての値を表すことができます 2^53 です。 これは不完全な解決です。 Unidata マイナーなアップグレードを行うことを拒否 .nc 3 この問題と関連の問題に対処するため、引用 .nc 3 (主な変更点) ソリューションとして。
* CF仕様 (v1.9の前に) char のデータ型をサポートしていますが、 char が char 配列のビルディングブロックとしてのみ意図されている場合は、 char が char 配列のブロックとして有効に 文字列 である場合、それは不明です。 メーリングリストへの質問は、回答を混乱させるだけです。 これらの合併症のせいで、char変数を避けるのが最善です ERDDAP™ 可能な限り文字列変数を使う。
* 伝統的に、 .nc 3 ファイルは ASCII-encoded でサポートされている文字列のみ (7ビット、 #0 - #127) 文字。 ログイン (そして、 ERDDAP ) それを拡張する (開始 ～2017年) "ISO-8859-1" の値で "\\_Encoding" という属性を含む (ASCIIの拡張子は、各8ビット文字の256値を定義します。) または "UTF-8" で文字列データがエンコードされるかを示します。 その他のエンコーディングは法的ですが、不法です。
         
####  .nc 4 ファイル{#nc4-files} 
*    .nc 全4ファイルに対応 ERDDAP データ型
    
#### NCCSVファイル{#nccsv-files} 
NCCSV 1.0 ファイルは、署名されていない整数データ型をサポートしていません。
 [NCCSV 1.1+ファイル](/docs/user/nccsv-1.00) すべての署名されていない整数データ型をサポート。
     
####  DAP  {#dap} 
*   (OPeN)DAP  (.das、.dds、.asc ASCIIファイル、.dods バイナリファイル) ・
    *   (OPeN)DAP短い、ushort、int、uint、浮遊物および二重価値を正しく扱う。
    *   (OPeN)DAP「バイト」のデータタイプは、その名前が署名されていないと定義されています。 ERDDAP™ 署名として「バイト」を処理しました(OPeN)DAPサービス。 これに対処するために、 ERDDAP™ 2.10+ は NUG 標準に従い、常に "true" または "false" の値で "\\_Unsigned" 属性を追加します。 ERDDAP™ バイトまたは ubyte を呼び出します。 バイト属性と ubyte 属性は、署名された値を持つ "バイト" 属性として書かれています(例えば、 uバイト actual\\_range 値 0 から 255 までの属性は、値 0 から -1 までのバイト属性として表示されます。(2 の補完値の逆)。 "byte" 属性が ubyte 属性として読み込まれるべきか分かりやすい方法はありません。
    *   (OPeN)DAP署名されたか、署名されていない長さをサポートしません。 ERDDAP™ それらを一時的に変換することにより、これを二重変数と属性に扱います。 倍は正確に9,007,199,254,740,992まですべての値を表すことができます 2^53 です。 これは不完全な解決です。 OPeNDAP   (組織について) マイナーなアップグレードを行うことを拒否 DAP 引用するこのおよび関連の問題に対処する2.0 DAP 3 (主な変更点) ソリューションとして。
    * なので(OPeN)DAPchar のデータ型を別々にし、技術的に 1 バイトの ASCII 文字のみをサポートしていません。 (#0 - #127) 文字列では、char のデータ変数は 1 文字の長さの文字列として表示されます。(OPeN)DAP.das、.dds、および.dodsの応答。
    * 技術的に、(OPeN)DAP仕様は、ASCIIエンコードされた文字でのみ文字列をサポートしています (#0 - #127) お問い合わせ ログイン (そして、 ERDDAP ) それを拡張する (開始 ～2017年) "ISO-8859-1" の値で "\\_Encoding" という属性を含む (ASCIIの拡張子は、各8ビット文字の256値を定義します。) または "UTF-8" で文字列データがエンコードされるかを示します。 その他のエンコーディングは法的ですが、不法です。
         
### データ型コメント{#data-type-comments} 
* 多くのファイルタイプにおいて、長く、ulong、およびcharデータに対するサポートが悪いため、これらのデータ型の使用を開示します。 ERDDAP お問い合わせ 可能であれば、長くてulongの代わりに2倍を使うと、charの代わりに String を使う。
     
* メタデータ - なぜなら(OPeN)DAP's .das と .dds の応答は、長い属性や ulong 属性やデータ型をサポートしていない (代わりにそれらをダブルスとして表示) 代わりに使用したいかもしれません ERDDAP 's はメタデータの表的表現を http .../erddap/ **インフォメーション** / / / / * datasetID * .html ウェブページ (例えば、 [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  )   (他のファイルタイプ、例えば、.csv で取得できるもの .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , .xhtml ) または .nccsv メタデータ応答 (例えば、 [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) しかし、 .nccsv Metadataは、表形式のデータセットにのみ使用可能です。) , 両方のデータ型をサポート (確かに、長い、ulong、およびchar) お問い合わせ
         
### メディアファイル{#media-files} 
すべてのデータは数字やテキストの配列ではありません。 一部のデータセットは、画像、音声、ビデオファイルなどのメディアファイルから構成または含んでいます。 ERDDAP™ ユーザーがメディアファイルにアクセスできるように、特別な機能があります。 それは2つのステップ プロセスです:
 

1. 各ファイルは、バイト範囲のリクエストをサポートするシステムを介して、独自のURLを介してアクセスできるようにします。
これを行う最も簡単な方法は、そのディレクトリにファイルを置くことです ERDDAP™ アクセス (コンテナの中にいる場合 .zip ファイル、それらを解凍します、あなたが提供したいかもしれないが、 .zip ユーザへのファイルも。) すると、 [EDDTableFromFileNames(ファイル名)](#eddtablefromfilenames) データセットは、これらのファイルをアクセス可能にする ERDDAP™ 著しく ERDDAP お問い合わせ [ "files" システム](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) お問い合わせ
    
EDDTableFromFileNames からアクセスできる全てのファイル ERDDAP お問い合わせ "files" システムサポート [バイト範囲のリクエスト](https://en.wikipedia.org/wiki/Byte_serving) お問い合わせ 通常、クライアントの場合 (例:ブラウザ) URL をリクエストし、レスポンスとしてファイル全体を取得します。 しかし、バイト範囲のリクエストでは、ファイルからバイトの範囲を指定し、サーバーはそれらのバイトのみを返します。 これは、ブラウザのオーディオとビデオプレーヤーがバイト範囲のリクエストを介してファイルにアクセスできる場合にのみ機能するため、ここに関連しています。
    
オプション: 関連するメディアファイルと複数のデータセットがある場合、各ファイルのサブフォルダを持つ1つのEDDTableFromFileNamesだけを作ることができます。 利点は、新しいデータセット用の新しいメディアファイルを追加したい場合、新しいフォルダーを作成し、そのフォルダにファイルを置きます。 フォルダとファイルが EDDTableFromFileNames のデータセットに自動的に追加されます。
    
2. オプション: メディアファイルへの参照を含むデータセットがある場合、 ERDDAP お問い合わせ
たとえば、 .csv ファイルには、 whale と その視覚に関連するイメージファイルの名前を含む列を見たたびに行が含まれている場合があります。 画像ファイルの名前がファイル名だけである場合、例えば、Img20141024T192403Z、完全なURLではなく、追加する必要があります [ファイルアクセスベース ウルとファイルアクセスサフィックス](#fileaccessbaseurl) そのメタデータに対する属性 dataVariable これらのファイル名の baseURL と suffix を指定します。 EDDTableFromFileNames 経由でファイルにアクセスできる場合は、URL がフォームに表示されます。
     *ベースUrl* /erddap/ファイル/ * datasetID * / / / /
例えば、
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
もしあれば .zip またはデータ変数に関連するすべてのメディアファイルを含む他のコンテナファイルでは、そのファイルをユーザーにアクセスできるようにすることをお勧めします。 (上記のステップ1を参照してください) そしてそれを識別して下さい [fileAccessアーカイブ ウルル](#fileaccessarchiveurl) 属性。
    

 \\[ はじめに ERDDAP™ v1.82の \\] 上記の第一歩を踏み出せば (または両方のステップ) ユーザがビューしたときに、 ERDDAP™   "files" そのデータセットのためのシステム (または、データセットのサブセットを経由して参照するように要求する .htmlTable 2番目のステップを要求した場合、) , ERDDAP™ ファイル名の左にある '?' アイコンが表示されます。 ユーザーがそのアイコンの上にカーソルを合わせると、それらは、画像、またはオーディオプレーヤー、またはビデオプレーヤーを示すポップアップが表示されます。 ブラウザは、限られた種類のタイプのみをサポート

* サイトマップ (通常 .gif、.jpg、および .png) ,
* オーディオ (通常 .mp3, .ogg, .wav) と
* ビデオファイル (通常 .mp4、.ogv、および。 サイトマップ) お問い合わせ

サポートは、異なるオペレーティングシステム上の異なるブラウザの異なるバージョンによって異なります。 そのため、どのファイルタイプが提供できるかを選択すると、これらのタイプを提供するのは理にかなっています。

または、ユーザーが表示されているファイル名をクリックした場合 ERDDAP™ ウェブページ、ブラウザは、別のWebページとして画像、オーディオ、ビデオファイルを表示します。 これは、ポップアップではなく、非常に大きな画像やフルスクリーンにスケールされたビデオを見るのにほとんど便利です。
    
### AWS S3ファイルと連携{#working-with-aws-s3-files} 
 [Amazon Webサービス (ツイート) ](https://aws.amazon.com) 売り手は [クラウドコンピューティング](https://en.wikipedia.org/wiki/Cloud_computing) サービス。 [S3シリーズ](https://aws.amazon.com/s3/) AWSが提供するオブジェクトストレージシステムです。 ディレクトリの階層的なシステムではなく、伝統的なファイルシステムのファイル (PCでハードドライブのように) , S3は "objects" を保持する "buckets" だけを提供しています (お問い合わせ "files" ) お問い合わせ

ASCIIファイルの場合 (例:.csv) , ERDDAP™  Bucket 内のファイルを直接操作できます。 必要なのは、&lt;fileDir&gt; AWS バケットの特定の形式を使用してデータセットのhttps://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/お問い合わせ 使用しない&lt;cacheFromUrl&gt; . 詳しくはこちらをご覧ください。

しかし、バイナリファイルの場合 (例: .nc .grib、.bufr、および .hdf ファイル) 、使用する必要があります&lt;cacheFromUrl&gt; システムは以下のとおりです。 ERDDAP 、netcdf-java (お問い合わせ ERDDAP™ これらのファイルからデータを読み込むために使用します) 、および他の科学的なデータ ソフトウェアは提供する従来のファイル システムでファイルを扱うように設計されています [ブロックレベル](https://en.wikipedia.org/wiki/Block-level_storage) ファイルへのアクセス (ファイルのチャンクの読み込みを許可する) S3のみ提供 [ファイルレベル (オブジェクト) ](https://en.wikipedia.org/wiki/Block-level_storage) ファイルへのアクセス (ファイルの読み込みのみを許可する) お問い合わせ AWS は S3 に代わり、 [弾性ブロックストア (EBSについて) ](https://aws.amazon.com/ebs/) )、ブロックレベルのファイルへのアクセスをサポートしているが、S3よりも高価であるため、大量のデータファイルの大量保存にはほとんど使われません。 (そのため、クラウドにデータを格納すると言うとき (S3シリーズ) 安い、それは通常、オレンジの比較にリンゴです。) 

#### S3 バケツ{#s3-buckets} 
 **バケツの内容。 キー。 オブジェクト。 デリミター。**   
技術的には、S3 バケットは、コンピュータ上のファイルシステムのような階層的なファイル構造で編成されていません。 代わりに、バケットには「オブジェクト」のみが含まれています。 (ファイル) それぞれが「キー」を持っている (名前) お問い合わせ noaa-goes17 バケットのキーの例

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
そのオブジェクトに対応するURlは

 [https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc) 

AWS は URL の構成方法の若干のバリエーションをサポートしていますが、 ERDDAP™ この1つの特定のフォーマットを要求して下さい:
  https://*bucketName*.s3.*region*.amazonaws.com/*key*  

お問い合わせ ERDDAP v2.29, あなたは今、使用することができます `s3://` Bucket URL の代わりに URI 形式。 これは、 [AWS s3 クライエント](https://docs.aws.amazon.com/cli/latest/reference/s3/) お問い合わせ
s3:// *バケット名* / / / / *キーキー* 

ザ・オブ・ザ・ *エリア* S3 URIは3つの方法で指定できます。
- ザ・オブ・ザ・ *エリア* Tomcat ユーザーの `~/.aws/config の設定` プロフィール
- ザ・オブ・ザ・ `AWS_DEFAULT_REGIONの特長` 環境変数
- ザ・オブ・ザ・ `aws.region(足)` JVM変数 (で setenv.sh のために Tomcat) 

一般的な練習は、この例のように、キー名を階層的なパスとファイル名のように見えるようにするが、技術的にはそうではありません。 それは一般的で有用であるので、 ERDDAP™ /'s でキーを扱います。もし階層のパスとファイル名で、このドキュメントは以下のように参照します。 Bucket のキーが /'s を使わない場合 (例: キーのような)
ABI-Lib.2018052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575、その後、 ERDDAP™ 鍵全体を長ファイル名として扱います。

プライベート対パブリックバケット お問い合わせ S3 Bucket の管理者は、 Bucket とその内容をパブリックまたはプライベートにすることができます。 公開する場合は、ファイル用のURLを使用して、バケット内の任意のファイルが誰でもダウンロードできます。 Amazonは、 [データを開く](https://aws.amazon.com/opendata/) パブリックデータセットをホストするプログラム (データを含む NOAA 、 NASA、USGS) それらのバケットからファイルをダウンロードするために、誰にでも無料で、充電しません。 Bucket がプライベートの場合、 Bucket 内のファイルは認証されたユーザーと AWS が料金を請求するのみアクセス可能です。 (通常はバケツの所有者によって支払われる) ファイルを非AWS S3 コンピュータにダウンロードするには ERDDAP™ パブリックとプライベートの Bucket のデータを扱うことができます。

#### AWS認証{#aws-credentials} 
そのために ERDDAP™ プライベートの Bucket の内容を読み込み、AWS の資格情報が必要で、標準的な場所に認証情報ファイルを保存する必要があります。 ERDDAP™ 情報を検索できます。 AWS SDK を参照してください。 Java 2.x ドキュメント: [デフォルト資格情報を設定する](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) お問い合わせ (値を保存するオプション Java コマンドラインパラメータのコマンド \\[ トームキャット \\] /bin/setenv.sh は良いオプションです。) 
#### AWS /ファイル/{#aws-files} 
* /files/ システム -- ザ・オブ・ザ・ ERDDAP™   [/files/システム](#accessibleviafiles) ユーザーは、データセット用のソースファイルをダウンロードすることができます。 元のソースファイルを多くのユーザーがダウンロードしたいため、ソースファイルのすべてのデータセットのためにこれをオンにすることをお勧めします。
    * ファイルがプライベートS3バケットにある場合、ファイルのダウンロードのリクエストは、 ERDDAP™ , ファイルからデータを読み込み、それをユーザーに送信するので、負荷を増加させます ERDDAP™ 、着信および発信の帯域幅を使用して、および作ります (お問い合わせ ERDDAP™ 管理者権限) データを AWS に渡します。
    * ファイルが公開のS3バケットにある場合、そのファイル用のAWS S3 URLにファイルをダウンロードするユーザのリクエストがリダイレクトされるため、データが流れません。 ERDDAP™ 従って負荷を上の減らすこと ERDDAP お問い合わせ ファイルがAmazon Open Dataにある場合 (無料) 公共のバケツ、それからあなた (お問い合わせ ERDDAP™ 管理者権限) AWSにデータエグレス料を払う必要はありません。 そのため、パブリックからのデータを提供する大きな利点があります (プライベート) S3 バケット、Amazon Open Data からデータを提供する巨大な利点 (無料) バケツ。

 ERDDAP また、パブリックバケットの匿名資格情報をサポートしています。 匿名の資格情報を使用するには、 ` <useAwsAnonymous> ログイン </useAwsAnonymous> ` setup.xml へ。

#### カスタムS3エンドポイント{#custom-s3-endpoints} 
AmazonでホストされていないS3互換オブジェクトストレージの場合、設定する必要があります。 [エンドポイント URL](https://docs.aws.amazon.com/sdkref/latest/guide/feature-ss-endpoints.html) あなたの Bucket/key をスペックに `s3://` ログイン

ザ・オブ・ザ・ *エンドポイント URL* 3つの方法で指定できます。
- ザ・オブ・ザ・ *エンドポイント URL* Tomcat ユーザーの `~/.aws/config の設定` プロフィール
- ザ・オブ・ザ・ `AWS_ENDPOINT_URL` 環境変数
- ザ・オブ・ザ・ `フィート.エンドポイント ウルル` JVM変数 (で setenv.sh のために Tomcat) 

S3 構成変数の完全なリストのために、 [Amazonドキュメントを見る](https://docs.aws.amazon.com/cli/latest/topic/config-vars.html) お問い合わせ

 **自己署名された証明書** 
セルフホストのS3バケットでは、セルフサインされたSSL証明書がよくあります。 お問い合わせ ERDDAP これらの Bucket から読み込むには、証明書チェーンを JVM のトラストストアに追加する必要があります。 `$JAVA_HOME/jre/lib/security/cacerts の` お問い合わせ その他、 ERDDAP 利用する [AWS共通ランタイム](https://docs.aws.amazon.com/sdkref/latest/guide/common-runtime.html) バケツを非同期的にアクセスするため。 これにより、パフォーマンスが向上しますが、自己署名証明書がOS固有の信頼ストアに追加されるように要求されます。 これを回避したい場合は、AWS CRT を AWS で無効にすることができます。 ` <useAwsCrt> パスワード </useAwsCrt> ` setup.xml で設定します。

####  ERDDAP™ そしてAWS S3のバケツ{#erddap-and-aws-s3-buckets} 
 [ ** ERDDAP™ そしてAWS S3のバケツ** ](#erddap-and-aws-s3-buckets)   
幸いに、多くの努力の後で、 ERDDAP™ S3のブロックレベルアクセスで動作する固有の問題に対処することを可能にする多くの機能があります。

*    \\[ 免責事項: AWS S3 バケットを使用した作業は、多くの作業です。 AWSは、サービスと機能の巨大なエコシステムです。 たくさんあります。 それは時間と労力がかかりますが、それは可能です。 患者になり、物事を働かせます。 助けのための見る/ask
( ) [AWSドキュメント](https://aws.amazon.com/documentation/gettingstarted/) 、ウェブサイトのような [スタックオーバーフロー](https://stackoverflow.com/) および規則
     [ ERDDAP™ サポートオプション](/docs/intro#support) ) あなたが立ち往生する時/時。 \\]   
     
* S3 バケット内のファイルのディレクトリ構造とファイル名を調べるのは難しいです。 ERDDAP™ この問題に対する解決策があります:EDDTableFromFileNamesには特別なものがあります [\\*\\*\\*fromOnTheFlyから](#fromonthefly) EDDTableFromFileNames のデータセットを作成できるオプションで、ユーザーは S3 バケットの内容を閲覧できます。 (ファイルのダウンロード) データセットによる "files" オプション。 そこにあります [以下の例](#viewing-the-contents-of-a-bucket) お問い合わせ
     
*    ERDDAP™ データを読み込む [外部に圧縮されたデータファイル](#externally-compressed-files) なので、S3のファイルがそのまま保存されていれば結構です。 .gz , .gzip , .bz2 , .Z, または外部に圧縮されたデータファイルの種類, これは劇的にすることができます (2 - 20Xの) ファイルの保存コストを削減します。 S3から小さいファイルを転送することによって保存された時間以来、外部に圧縮されたファイルを使用する時間ペナルティはしばしばありません ERDDAP 余計な時間に必要なバランスをとる ERDDAP™ ファイルを解凍します。 この機能を使用するには、データセットのことを確かめるだけです&lt;fileNameRegex&gt; 圧縮されたファイルタイプを使用可能 (例:追加することで ( |  .gz ) 正規表現の最後に) お問い合わせ
     
* あなたが持っている最も一般的なケースのために、 ERDDAP™ テスト/開発用のPCにインストールされ、データセットがS3バケットのオブジェクトとして保存されるバイナリデータファイルがある場合、データセットを取得する1つのアプローチ ERDDAP™ は:
    1. いくつかのテストデータファイルを保持するために、PC上でディレクトリを作成します。
    2. ソースから作成したディレクトリに2つのデータファイルをダウンロードします。
    3. 使用条件 [生成データセットXml](#generatedatasetsxml) チャンクを生成する datasets.xml 2つのローカルデータファイルに基づいてデータセットの場合。
    4. データセットが希望どおりに機能することを確認してください [ダスDds](#dasdds) ローカル ERDDAP お問い合わせ
        
         **次の手順では、そのデータセットのコピーを作成します。 (S3バケットからデータを取得する) パブリック ERDDAP お問い合わせ** 
        
    5. チャンクのコピー datasets.xml データセットを datasets.xml 公共のため ERDDAP™ データを配信します。
    6. 公開するディレクトリを作成する ERDDAP ローカルハードドライブは、一時的なファイルのキャッシュを保持します。 ディレクトリはディスク容量の多くを使用しない (cacheSizeGB を参照してください。) お問い合わせ
    7. データセットの値を変更する&lt;fileDir&gt; タグが作成したディレクトリにポイントするようにしました (ディレクトリが空いているにもかかわらず) お問い合わせ
    8. 追加する [キャッシュFromUrl](#cachefromurl) dataset の Bucket 名とオプションの prefix を指定するタグ (ディレクトリ) 具体的に [Aws S3 URL フォーマット ERDDAP™ お問い合わせ](#accessing-files-in-an-aws-s3-bucket) お問い合わせ
    9. [追加]&lt;キャッシュサイズGB&gt; (パスワード) dataset の xml にタグ (例えば、10はほとんどのデータセットに良い値です) お問い合わせ ERDDAP™ ローカルキャッシュのサイズを制限する (i.e.、リモートファイルのすべてをキャッシュしようとしないでください) お問い合わせ
    10. パブリックで働くかどうかを見る ERDDAP お問い合わせ 初めての方へ ERDDAP™ データセットをロードすると、ロードする時間が長くなります。 ERDDAP™ すべてのデータファイルをダウンロードして読み込む必要があります。
        
データセットが巨大な格子されたデータファイルの巨大なコレクションである場合、これは非常に長い時間をとり、実用的です。 場合によっては、グリッドされたデータファイルの場合、 ERDDAP™ 必要な情報を抽出することができます (例えば、グリッドされたデータファイル内のデータのタイムポイント) ファイル名からこの問題を回避します。 お問い合わせ [集約による ファイル名](#aggregation-via-file-names-or-global-metadata) お問い合わせ
        
    11. オプション (しかし、特にEDDTableFromFilesデータセットの場合) , あなたは追加することができます [nスレッド](#nthreads) データセットにタグを付けて、 ERDDAP ユーザーのデータリクエストに対応するため、1 スレッド以上を使用する。 これは、ときに発生する遅延の影響を最小限に抑えます ERDDAP™ データファイルを読み込む (リモート) AWS S3 はローカルのキャッシュにバケツを置き、 (おそらく) それらを解凍する。

#### AWS S3 オープンデータ{#aws-s3-open-data} 
一部について NOAA お問い合わせ [ビッグデータプログラム](https://www.noaa.gov/nodd/about) , NOAA AWS を含む 5 つの組織とパートナーシップを組んで、「クラウド内の主要な観察とモデル出力のコピーを格納する潜在的な利点を探求し、さらなる分布を必要としずにデータを直接計算できるようにします。」 AWS には、取得するデータセットが含まれています。 NOAA 大規模なコレクションへのパブリックアクセスを提供するプログラムの一環として [AWS S3でデータを開く](https://registry.opendata.aws/) 任意のコンピュータから、Amazonの計算インスタンスであるかどうか (レンタルコンピューター) AWSネットワークまたはPC上で任意のネットワーク上で。 以下は、パブリックアクセス可能なデータセットで作業していると仮定します。

#### AWS S3 バケットのファイルへのアクセス{#accessing-files-in-an-aws-s3-bucket} 
プライベートS3データバケットの場合、バケットの所有者はバケットにアクセスする必要があります。 (AWS ドキュメントを参照してください。) 

AWS SDKはAWSアカウントが必要です。 Java   (お問い合わせ ERDDAP™ Bucket の内容に関する情報を取得する) AWSアカウント認証が必要です。 (詳しくはこちら) 

 ERDDAP™ AWS S3 の Bucket にアクセスできるのは、[[] を指定した場合のみです。&lt;キャッシュFromUrl&gt; (パスワード) (または)&lt;fileDir&gt;) は特定のフォーマットで指定します。
https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*  
どこまでも

* BucketName は、noaa-goes17 などの Bucket の名前の短い形式です。
* aws-region は、例: us-east-1 は、テーブルの 1 つにある "Region" 列から [AWSサービスエンドポイント](https://docs.aws.amazon.com/general/latest/gr/rande.html) バケットが実際に配置されている場所。
* プレフィックスはオプションです。 現時点では、 '/' お問い合わせ

例えば、https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
このURLフォーマットはAWS S3の推奨事項の1つです: 参照 [バケットへのアクセス](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) そして、 [プレフィックスのこの説明](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html) お問い合わせ ERDDAP™ バケット URL とオプションのプレフィックスを 1 つの URL に結合して指定する&lt;cacheFromUrl&gt; (または)&lt;fileDir&gt;) ファイルが配置されている場所。

#### パブリックAWS S3バケットをテストする{#test-public-aws-s3-buckets} 
公開 Bucket の場合、ブラウザーの AWS S3 ディレクトリの Bucket URL をテストできます。
 [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) バケット URL が正しい場合と適切な場合 ERDDAP , 持っているXML文書を返す (部分的な) バケットの内容の一覧です。 残念ながら、完全なURL (i.e.、バケットURLとプレフィックス) ということ ERDDAP™ 特定のデータセットがブラウザで動作しません。 AWSは、ブラウザで簡単にバケットの階層を閲覧するためのシステムを提供していません。 (誤りがある場合は、Chrisにメールしてください。 noaaa.govのジョン それ以外の場合は、アマゾン、このサポートを追加してください&#33;) 

#### バケットの内容を見る{#viewing-the-contents-of-a-bucket} 
S3 バケットには、数種類のファイルが含まれています。偽のサブディレクトリのカップルで、カップルになることができます。 ERDDAP™ データセット。 作るために ERDDAP™ datasets は、先頭ディレクトリを知りたい&lt;cacheFromUrl&gt; (または)&lt;fileDir&gt;) と、ファイルのサブセットを識別するファイル名の形式。 ブラウザ内の Bucket のコンテンツ全体を表示しようとすると、S3 は最初の 1000 個のファイルを表示するだけです。 現在、バケットの全てのコンテンツを閲覧するための最良の方法は、 [EDDTableFromFileNames(ファイル名)](#eddtablefromfilenames) データセット (お使いのPCで ERDDAP™ またはあなたの公共 ERDDAP ) また、ディレクトリ構造を閲覧し、ファイルをダウンロードするための簡単な方法を提供します。 ザ・オブ・ザ・&lt;fileDir&gt; は、上記のURLになります。https://noaa-goes17.s3.us-east-1.amazonaws.comお問い合わせ \\[ なぜ AWS S3 が AWS アカウントなしでこれを行うための迅速かつ簡単な方法を提供していないのですか? \\] Amazon以外のネットワークでPC上でこれを行うと、Amazonがトリクルに対する応答を遅くする可能性があることに注意してください。 (100について (お問い合わせ) チャンクごとのファイル) 最初の少数のチャンクの後 (チャンクあたりのファイルの1000) ダウンロード バケットは膨大な数のファイルが存在する可能性があるため (Noaaa-goes17 に 26 百万) , バケットのすべてのコンテンツを取得するには、EDDTableFromFileNames を数時間かかる場合があります。 (例:12) 終わりに。 \\[ アマゾン、そうですね&#33; \\] 

#### EDDTableを作る FromFileNames AWS S3 バケットを使用したデータセット{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
バケット名がある場合、S3 バケットのファイルのリストや、バケット内の関連するファイルの場所を識別するプレフィックスがある場合は、以下の手順を使用して EDDTableFromFileNames データセットを作るため、S3 バケットのディレクトリ階層を経由して閲覧できます。 ERDDAP お問い合わせ "files" システム。

1. AWSアカウントを開く
     ERDDAP™ 利用する [AWS SDK用 Java ](https://docs.aws.amazon.com/sdk-for-java/index.html) AWSからバケット情報を取得するため、 [AWSアカウントの作成とアクティベート](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) お問い合わせ それはかなり大きな仕事です。, 学ぶために多くのこと.
     
2. AWS 認証をどこに置くか ERDDAP™ それらを見つけることができます。
指示に従ってください [AWS 認証と開発地域の設定](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) お問い合わせ ERDDAP™   (具体的にはAWS SDK for Java ) AWS の認証情報を検索して利用することができます。 お問い合わせ ERDDAP™ 資格情報が見つからない場合、
java.lang. は、 IllegalArgumentException: プロファイルファイルでは、nullエラーできません ERDDAP 's log.txt ファイル。
    
Linux と Mac OS 用のヒント: 認証ファイルは、Tomcat を実行しているユーザーのホームディレクトリにある必要があります。 (そして、 ERDDAP )   (この段落では user=tomcat を想定します。) ~/.aws/credentials というファイルで ~ は /home/tomcat だと仮定しないでください。 実際に cd ~ を使用して、 オペレーティングシステムが user=tomcat の 〜 と考える場所を見つけます。 存在しないディレクトリを作成します。 また、認証ファイルを所定の場所に置いた後、ファイルに対するユーザーとグループがtomcatであることを確認し、chmod 400の認証情報を使用して、ファイルがuser=tomcatの読み取り専用であることを確認します。
    
3. バケット URL を作成する [フォーマット ERDDAP™ お問い合わせ](#accessing-files-in-an-aws-s3-bucket) 、例えば、
     [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) と (公共のバケツのため) ブラウザでテストして、その Bucket の内容を部分的にリストしている XML ドキュメントを返すようにします。
     
4. 使用条件 [生成データセットXml](#generatedatasetsxml) 作成する [EDDTableFromFileNames(ファイル名)](#eddtablefromfilenames) データセット:
    * 起動ディレクトリには、この構文を使用します。
        \\*\\*ツイート *からOnTheFly、* あなたのBucketUrl*
例えば、
        \\*\\*\\*fromOnTheFlyから、https://noaa-goes17.s3.us-east-1.amazonaws.com/
    * ファイル名 regex? お問い合わせ
    * 再帰的? ログイン
    * リロード みんな? 10080の
    *    infoUrl お問い合わせhttps://registry.opendata.aws/noaa-goes/
    * 機関? NOAA 
    * 概要? 何もない ( ERDDAP™ まともなまとめを自動的に作成します。) 
    * タイトル? 何もない ( ERDDAP™ まともなタイトルを自動的に作成します。) 通常のように、結果のXMLを編集して、それを使用してデータセットのチャンクの前に正しい確認と改善を行う必要があります datasets.xml お問い合わせ
5. 上記の指示に従ってデータセットをロードする場合 ERDDAP EDDTableFromFiles データセットを作成しました。 例として、AWS Open Data Bucket からファイルを閲覧・ダウンロードしやすくするために、EDDTableFromFileNames データセットを作成しました(リストを参照してください)
     [https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_) ) ほとんどすべての [AWS S3 オープンデータバケット](https://registry.opendata.aws/) お問い合わせ
     \\[ ルートディレクトリに多数のファイルが存在しなかったバケット (合理的な時間内にダウンロードできるもの) 公共アクセスを許可しない (誰が公開されているのか?) 、または要求者の支払のバケツです (例:センチネル) お問い合わせ \\]   
クリックすると "files" これらのデータセットの1つにリンクして、S3バケットのディレクトリツリーとファイルを閲覧できます。 道のため\\*\\*\\*fromOnTheFly EDDTableFromFiles は、これらのディレクトリリストは、常に最新です。 ERDDAP™ それらをオンザフライを取得します。 ディレクトリツリーを実際のファイル名にクリックし、ファイル名をクリックします。 ERDDAP™ リクエストをAWS S3にリダイレクトし、ファイルを直接AWSからダウンロードできます。 そのファイルを調べることができます。
    
トラブル?
EDDTableFromFiles がロードされていない場合 ERDDAP™   (または DasDds) , エラーメッセージの log.txt ファイルを見てみましょう。 見ると
java.lang. は、 IllegalArgumentException: プロファイルファイルは、nullエラーではなく、問題はAWS SDK for Java   (によって使用される ERDDAP ) 資格情報ファイルが見つかりません。 上記の資格情報の説明を参照してください。
     

AWSが単にブラウザを使ってパブリックバケットの内容を閲覧できないことは残念です。

 **すると、 ERDDAP™ ユーザーがファイル内のデータにアクセスするデータセット。**   
指示を参照してください。 [ ERDDAP™ そしてS3のバケツ](#erddap-and-aws-s3-buckets)   (詳しくはこちら) お問い合わせ
上記のサンプルEDDTableFromFileNamesデータセットの場合、ディレクトリツリー内のディレクトリとファイル名を少しだけポークすると、トップレベルのディレクトリ名が明確になります。 (例:ABI-L1b-RadC) 何かに対応 ERDDAP™ 別のデータセットを呼び出します。 作業中の Bucket は似ています。 別のデータセットを作成するために、 ERDDAP™ それぞれのデータセット、使用例、
https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
として&lt;cacheFromUrl&gt;. 残念ながら、この例では、バケット内のデータセットはすべてレベル1かレベル2のデータセットであるように見えます。 ERDDAP™   [特に得意ではありません](#dimensions) データセットは、異なる寸法を使用する変数のより複雑なコレクションであるため。
     
    
### NcMLファイル{#ncml-files} 
NcMLファイルでは、元のソースへのオンザフライ変更を指定できます NetCDF   (v3 または v4)   .nc , .grib, .bufr, または .hdf   (v4 または v5) それからファイルがあり、 ERDDAP™ 治療する .nc ソースファイルとして ml ファイル。 ERDDAP™ データセットは受け入れます .nc いつでも ml ファイル .nc ファイルが期待されます。 NcMLファイルは拡張子を持っている必要があります .nc ml。 詳細はこちら [ Unidata NcML ドキュメント](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) お問い合わせ NcMLは、それでいくつかのことをすることができますので便利です (たとえば、異なるファイルをコレクションに異なる変更を加えるなど、特定の値に特定の値をファイルに追加する) とはいえ、 ERDDAP お問い合わせ datasets.xml お問い合わせ

* 変更する .nc ml ファイルの lastModified 時刻は、データセットが再ロードされるたびに再読み込みするファイルが引き起こされますが、下書きに変更されます。 .nc データファイルが直接通知されません。
* ヒント: NcML は\\*お問い合わせ\\*NcML ファイルのいくつかの項目の順序に敏感。 指定した順序で一連の指示を指定するようにNcMLを考えると、ソースファイルを変更する意図 (NcMLファイルの先頭/上にある状態) 宛先ファイルへ (NcMLファイルの末尾/下方にある状態) お問い合わせ

NcMLの代替手段は [ NetCDF オペレータ ( NCO ) ](#netcdf-operators-nco) お問い合わせ 大きな違いは、NcMLがオンザフライの変化を作るためのシステムであるということです (ソースファイルが変更されていないため) 、whereas NCO 変更を加えるために使用することができます (または新しいバージョン) ファイル。 両方とも NCO そして、NcMLは非常に柔軟であり、あなたがファイルを考えることができるほとんどすべての変更を作ることを可能にします。 両方とも、あなたが何をしたいのかを正確に把握することに挑戦することができます。同様の例については、Webをチェックしてください。 両方ともnetCDFの準備に役立つツールです。 HDF 使用するファイル ERDDAP , 注目すべき, 変化は、 ERDDAP 's の操作システムはできます。

例1:単一値で時間寸法を追加する
詳細はこちら .nc 新しい外形寸法を作成するmlファイル (1つの価値との時間、:1041379200) A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km という名前のファイル内の pic 変数にその次元を追加します。 .nc : : :
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
例2:既存の時間値を変更する
時々 ソース .nc 既に時間寸法と時間値を持っていますが、値が間違っています (あなたの目的のため) お問い合わせ お問い合わせ .nc mlファイル: "19810825230030-NCEI" という名前のデータファイルの場合、寸法変数 "time" 1970-01-01T00:00:00Z' 以降、単位属性を 'seconds に設定し、値が 367588800 になるように設定します。
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
###  NetCDF オペレータ ( NCO )  {#netcdf-operators-nco} 
「netCDFオペレーター」 ( NCO ) netCDF をとるコマンド・ライン・プログラムである dozen standalone を構成する \\[ v3 または v4 \\] , HDF   \\[ v4 または v5 \\] , \\[ .grib、.bufr、 \\] および/または DAP 入力としてファイル、そして操作して下さい (e.g.、決定的な新しいデータ、計算の統計、印刷物、hyperslabはメタデータを操作します) 結果をテキスト、バイナリ、またはnetCDF形式で表示またはファイルを出力します。 NCO グリッド化された科学データの分析を支援します。 シェルコマンドスタイル NCO ユーザーは、ファイルをインタラクティブに操作し、分析したり、より高レベルのプログラミング環境のいくつかのオーバーヘッドを回避する高速スクリプトで行うことができます。 (お問い合わせ [ NCO ](https://nco.sourceforge.net/) サイトマップ) お問い合わせ

代替手段 NCO お問い合わせ [ログイン](#ncml-files) お問い合わせ 大きな違いは、NcMLがオンザフライの変化を作るためのシステムであるということです (ソースファイルが変更されていないため) 、whereas NCO 変更を加えるために使用することができます (または新しいバージョン) ファイル。 両方とも NCO そして、NcMLは非常に柔軟であり、あなたがファイルを考えることができるほとんどすべての変更を作ることを可能にします。 両方とも、あなたが何をしたいのかを正確に把握することに挑戦することができます。同様の例については、Webをチェックしてください。 両方ともnetCDFの準備に役立つツールです。 HDF 使用するファイル ERDDAP , 注目すべき, 変化は、 ERDDAP 's の操作システムはできます。

例えば、 NCO もともと一貫していなかったファイルのグループで、時刻変数の単位を一貫して作る。 または、使用することができます NCO 申し込み scale\\_factor そして、 add\\_offset ファイルのグループでは、 scale\\_factor そして、 add\\_offset 異なるソースファイルで異なる値を持っています。
 (または、あなたは今、それらの問題に対処することができます ERDDAP™ お問い合わせ [ EDDGrid FromNcFiles解凍](#eddgridfromncfilesunpacked) の変異体である EDDGrid パックされたデータをアンパックし、異なるコレクションファイルに対処するために、低レベルで時間値を標準化するNcFiles scale\\_factor s と add\\_offset 、または別の時間単位。) 

 NCO 自由でオープンソースソフトウェアです。 [GPL 3.0の特長](https://www.gnu.org/licenses/gpl-3.0.html) ライセンス

例1:ユニットの一貫性を作る
 EDDGrid ファイルとEDDTable ファイルから、指定した変数の単位がすべてのファイルに同一であることを主張します。 ファイルの一部が些細な場合 (機能的ではない) 他とは異なる(例えば、時間単位)
1970-01-01 00:00:00 UTC 以降秒
 "seconds since 1970-01-01T00:00:00Z" 、使用することができます NCO お問い合わせ [メニュー](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor) . すべてのファイル内の単位を同一と変更するため
nco/ncatted -a単位、時間、o、c、1970-01-01T00:00:00Z'以来の秒\\* .nc   
 \\[ EDDTableFrom のような多くの問題... ファイルデータセット, 今使用することができます [標準化 新着情報](#standardizewhat) お問い合わせ ERDDAP ソースファイルを読み込まれているように標準化する ERDDAP お問い合わせ \\] 
    
### データセットのサイズ制限{#limits-to-the-size-of-a-dataset} 
以下に「2億」の参考文献が多数表示されます。 より正確に、それは2,147,483,647への参照です (2^31-1の) 32ビット署名整数の最大値である。 一部のコンピュータ言語では、例えば Java   (お問い合わせ ERDDAP™ で書かれている) 多くのデータ構造に使用できる最大のデータ型です。 (例えば配列のサイズ) お問い合わせ

文字列の値の場合 (例えば、変数名、属性名、文字列属性値、文字列データ値など) 文字列内の文字の最大文字数 ERDDAP™ 約2億円 しかし、ほとんどすべてのケースでは、文字列が合理的なサイズを超えた場合、小さな問題や大きな問題があります (例: 変数名と属性名の 80 文字、ほとんどの文字列属性の値とデータ値の 255 文字) お問い合わせ たとえば、長い変数名を表示するWebページは、応答ファイルタイプの制限を超えると、幅が広く、長い変数名が切り離されます。

グリッドデータセットの場合:

* 上限数 axisVariable s は ~2 億.
上限数 dataVariable s は ~2 億.
しかし、データセットに&gt;100変数がある場合、ユーザーが使用するために面倒になります。
また、データセットに1万個の変数がある場合、サーバは物理メモリを多く必要とし、他の問題が発生します。
* 各次元の最大サイズ ( axisVariable ) 約2億の価値がある。
* 細胞の総数の最大数だと思います (すべての次元のサイズのプロダクト) 無制限ですが、~9e18 になる可能性があります。

表形式のデータセットの場合:

* 上限数 dataVariable s は ~2 億.
しかし、データセットに&gt;100変数がある場合、ユーザーが使用するために面倒になります。
また、データセットに1万個の変数がある場合、サーバは物理メモリを多く必要とし、他の問題が発生します。
* ソースの最大数 (例えば、ファイル) 集計できるのは、約2億円です。
* 場合によっては、個々のソースからの行の最大数 (例えば、ファイルではなくデータベースではなく、) 約2億行。
* 他にも限界があるとは思えません。

グリッドと表形式のデータセットの両方の場合、サブセットのサイズに内部制限がいくつかあります。 (多くの場合、何かの &gt;2 億、または ~9e18 に関連するもの) 、しかし、ユーザーがファイル型固有の制限をヒットする可能性ははるかに高まっています。

*    NetCDF バージョン3 .nc ファイルは2GBバイトに制限されます。 (誰かが本当に問題であるなら、私に知らせてください。 サポートを追加できます。 NetCDF バージョン3 .nc 64ビット延長または NetCDF バージョン4、限界を大幅に増加させるが、無限に。) 
* ブラウザは、データのみで約500MBをクラッシュするので、 ERDDAP™ 応答を制限する .htmlTable ～400MBのデータをリクエスト
* 多くのデータ分析プログラムに類似した制限があります (例えば、次元の最大サイズは、多くの場合〜2億値です。) なので、ファイル型固有の制限を回避するために苦労する理由はありません。
* ファイル型固有の制限は、真に膨大な量のデータを要求するのを防ぐのに役立ちます。 (たとえば、データセットに20TBのデータがある場合、 "give me all this dataset") 、ダウンロードする数週間または数か月かかります。 ダウンロードが長いほど、さまざまな理由で失敗する可能性が高い。
* file-type-specific 制限は、ユーザが合理的にサイズのサブセットを扱うように強制するので便利です。 (たとえば、それぞれ1つのタイムポイントからデータを持つファイルを介して大きなグリッドデータセットを扱う) お問い合わせ
         
### ACDD-1.3 への切り替え{#switch-to-acdd-13} 
お問い合わせ (お知らせ [生成データセットXml](#generatedatasetsxml) ) 現在推奨しています [ACDDバージョン 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) 2015年初頭に批准され、グローバル・コンベンション・属性の「ACDD-1.3」と呼ばれています。 前のページへ ERDDAP™ バージョン 1.62 (2015年6月発売) , ERDDAP™ 元の、版 1.0 を、使用/推薦しました [ NetCDF データセットのディスカバリーのための属性条約](https://wiki.esipfed.org/ArchivalCopyOfVersion1) と称される Unidata グローバル・コンベンションと Metadata\\_Conventions 属性。

データセットが ACDD の以前のバージョンを使用している場合は、 ACDD-1.3 に切り替えることをお勧めします。 難しいことではありません。 ACDD-1.3 はバージョン 1.0 と非常に後方互換性があります。 すべてのデータセットの切り替え (その他 EDDGrid FromErddap と EDDTable FromErddap データセット) : : :

1. 新しく非推奨されたグローバルを削除 Metadata\\_Conventions 追加することで属性 (または既存の変更によって Metadata\\_Conventions 属性属性)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
データセットのグローバルへ&lt; addAttributes &gt;。
     
2. dataset が、グローバルにConferences属性を持っている場合&lt; addAttributes &gt; 全部変更 Unidata 「ACDD-1.3」へのDataset Discovery v1.0」参照。
グローバルなデータセットにConferences属性がない場合&lt; addAttributes &gt; すると ACDD-1.3 を参照する 1 つを追加します。 例えば、
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. データセットがグローバルの場合 standard\\_name\\_vocabulary 属性は、値の形式を例えば変更してください。
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
参照が古いバージョンの場合 [CF標準名表](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) お問い合わせ 現在のバージョンに切り替えることはおそらく良い考えです (65 書きますと) , 新しい標準名は、その後のバージョンでそのテーブルに追加されるので, しかし、古い標準名はまれに非推奨であり、決して削除されません.
     
4. ACDD-1.0 にはグローバル属性が含まれていますが、 creator\\_name , creator\\_email , creator\\_url , [生成データセットXml](#generatedatasetsxml) しばらくの間、自動的に追加しなかった ERDDAP™ v1.50. これは重要な情報です。
        
    *    creator\\_name ユーザがデータセットの作成者を知らせる。
    *    creator\\_email データセットに関する質問がある場合は、たとえば、データセットの作成者に連絡するための優先メールアドレスをユーザーに伝えます。
    *    creator\\_url ユーザーが作成者についての詳細を見つける方法を与えます。
    *    ERDDAP™ FGDC および ISO 19115-2/19139 の各データセットのメタデータ文書を生成するときに、このすべての情報を使用します。 これらの文書は、外部検索サービスによって頻繁に使用されます。
    
データセットのグローバルにこれらの属性を追加してください&lt; addAttributes &gt;。
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
です。 難しすぎなかったことを願っています。
     
### ザラー{#zarr} 
バージョン 2.25 として ERDDAP™ ローカルを読むことができます Zarrファイルを使用して [EDDTableFromNcFiles (EDDTableFromNcFiles) は、](#eddtablefromncfiles) そして、 [ EDDGrid からNcFiles](#eddgridfromncfiles) お問い合わせ

 (2019年8月現在) 我々は簡単に間違っている可能性がありますが、我々はまだ確信していない [ザラー](https://github.com/zarr-developers/zarr-python) データファイルをより小さいチャンクに分割する、または同じようなシステムは問題に大きい解決です ERDDAP™ Amazon AWS S3 などのクラウドサービスに保存されたデータを読み込みます。 Zarrは、さまざまな状況でその有用性を示す素晴らしい技術です。 ERDDAP +S3はこれらの状況の1つになります。 ほとんどの場合、私たちは次のように述べています。Zarrですべてのデータを保存する努力を急いでいる前に、実際により良い解決策であるかどうかを確認するいくつかのテストをしてみましょう。

クラウド内のデータにアクセスする問題は遅延 (最初にデータを取得するラグ) ファイルレベルのアクセス (ブロックレベルのアクセスではなく) お問い合わせ Zarrはファイルレベルのアクセスの問題を解決しますが、レイテンシについては何もしません。 ファイルをダウンロードするだけで比較 (ブロックレベルのアクセスでローカルファイルとして読み込むことができます) 、Zarrは、Zarrでは、ファイルを読み込むことにより、レイテンシーの問題を悪化させる可能性があります。 (それぞれ独自のラグで) お問い合わせ レイテンシの問題は、リクエストの並列化によって解決できますが、Zarrに依存しないより高いレベルのソリューションです。

そしてザラーと (関連データベースと同様に) データのファイルを持つ利便性は、単純で単一ファイルであり、簡単に整合性を検証したり、コピーを作成/ダウンロードしたりすることができます。

 ERDDAP™   (v2 の) URLソースからファイルのローカルキャッシュを維持するためのシステムを持っています (例:S3) (参照)&lt;cacheFromUrl&gt; と&lt;キャッシュマックスGB&gt; (パスワード) )。 新しい [&lt;nスレッド&gt; (#nthreadsさん) レイテンシの問題を最小限に抑えるには、データ検索を高レベルで並列化する必要があります。&lt;cacheFromUrl&gt; は多くのシナリオで非常にうまく機能しているようです。 (私たちは、どのように有益なのかわからない&lt;nThreads&gt; はテストを行わない。 AWS インスタンスのタイミングテストをうまく行っていないことを認めていますが、さまざまなリモート URL ソースファイルでテストを成功させました。 そして ERDDAP お問い合わせ&lt;cacheFromUrl&gt; はあらゆる種類のデータファイルで動作します。 (例: .nc , .hdf , .csv, .jsonlCSV ) 外部圧縮しても (例: .gz ) ファイルの変更なし (例えば、Zarrコレクションに書き換える) お問い合わせ

異なるシナリオは、異なるソリューションを好む可能性があります。例えば、ファイルの一部を一度だけ読み込む必要があります。 (Zarrが勝つ) , 対. 一度すべてのファイルを読む必要があります。, 対. 部分を読む必要があります。 またはすべてのファイルを繰り返し ()&lt;cacheFromUrl&gt; は勝ちます。

ほとんどの場合、私たちは次のように述べています。Zarrですべてのデータを保存する努力を急いでいる前に、実際により良い解決策であるかどうかを確認するいくつかのテストをしてみましょう。

- - - - -
## 型データセットのリスト{#list-of-types-datasets} 
適切なデータセットタイプを選択する必要がある場合は、 [データセットタイプの選択](#choosing-the-dataset-type) お問い合わせ

データセットの種類は2つのカテゴリに分類されます。 ( [なぜ?](#why-just-two-basic-data-structures) ) 

###  EDDGrid  {#eddgrid} 
*    [ ** EDDGrid ** ](#eddgrid) データセットは、グリッドデータを処理します。
    * インスタグラム EDDGrid データセット、データ変数は多次元データ配列です。
    * 各次元の軸線変数である必要があります。 軸変数は、データ変数がそれらを使用する順番で指定される必要があります。
    * インスタグラム EDDGrid データセット、すべてのデータ変数は使用しなければ (シェア) 軸変数のすべて。
         ( [なぜ?](#why-just-two-basic-data-structures)   [彼らがそうでないならば?](#dimensions) ) 
新着情報 ERDDAP™ バージョン 2.29.0 と EDDGrid FromNcFilesは、すべての軸変数をサポートしないデータ変数の実験的サポートです。 (または、同じデータセットで1Dと2Dデータを呼び出すように) お問い合わせ
    * ソートされた寸法値 - すべてで EDDGrid データセット、各次元は分類された順序でであって下さい (昇降または降下) お問い合わせ それぞれ不規則にスペースを置くことができます。 何もない。 これはの条件です [CFメタデータ規格](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) お問い合わせ 次元の値はソート順でない場合、データセットはロードされず、 ERDDAP™ ログファイルの最初の無ソート値を特定します。 *bigParentディレクトリ* /logs/log.txt ディレクティブ
        
いくつかのサブクラスには、追加の制限があります(特に、 EDDGrid AggregateExistingDimensionは、外側(左端、最初の)寸法が昇順であることを要求します。
        
未ソートの寸法は、ほぼ常にソースのデータセットの問題を示しています。 これは、誤名または不適切なファイルが集計に含まれているときに最も一般的に起こります。これは、ソートされていない時間次元につながる。 この問題を解決するには、エラーメッセージを参照してください。 ERDDAP™ log.txt ファイルがオフエンディング時間値を見つけます。 次に、ソースファイルを見て、対応するファイルを見つけます (または 1 つ前後) 集計に所属しない。
        
    * 詳細な説明を参照してください。 [ EDDGrid データモデル](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel) お問い合わせ
    * ザ・オブ・ザ・ EDDGrid データセットのタイプは:
        *    [ EDDGrid FromAudioFilesから](#eddfromaudiofiles) ローカルオーディオファイルのグループからデータを集計します。
        *    [ EDDGrid FromDapから](#eddgridfromdap) グリッドデータを処理する DAP サーバ。
        *    [ EDDGrid からEDDTable](#eddgridfromeddtable) 表形式のデータセットをグリッドデータセットに変換できます。
        *    [ EDDGrid Erddapから](#eddfromerddap) リモートからグリッドされたデータを処理します ERDDAP お問い合わせ
        *    [ EDDGrid トピックス](#eddgridfrometopo) 組み込みのETOPOトポグラフィデータを処理します。
        *    [ EDDGrid ファイルから](#eddgridfromfiles) すべてのスーパークラスです EDDGrid から...ファイルクラス。
        *    [ EDDGrid FromMergeIRFilesから](#eddgridfrommergeirfiles) ローカルMergeIRのグループからデータを集計 .gz ファイル。
        *    [ EDDGrid からNcFiles](#eddgridfromncfiles) ローカルのグループからデータを集計 NetCDF   (v3 または v4)   .nc 関連するファイル。
        *    [ EDDGrid FromNcFiles解凍](#eddgridfromncfilesunpacked) バリアントの場合 EDDGrid ローカルのグループからデータを集約するFromNcFiles NetCDF   (v3 または v4)   .nc 関連するファイル ERDDAP™ 低いレベルのアンパック。
        *    [ EDDGrid ロンPM180](#eddgridlonpm180) 子供の経度値を変更 EDDGrid -180 から 180 の範囲にいるように。
        *    [ EDDGrid ロン0360](#eddgridlon0360) 子供の経度値を変更 EDDGrid 範囲 0 から 360 の範囲内にあるため。
        *    [ EDDGrid サイドバイサイド](#eddgridsidebyside) 2つ以上の集計 EDDGrid サイドバイサイドのデータセット
        *    [ EDDGrid AggregateExistingディメンション](#eddgridaggregateexistingdimension) 2つ以上の集計 EDDGrid データセットは、それぞれが最初の次元の異なる値の範囲を持っていますが、他の次元の同じ値です。
        *    [ EDDGrid コピー](#eddgridcopy) 別のローカルコピーを作ることができます EDDGrid 's のデータはローカルコピーからデータを提供し、
             
    * すべて EDDGrid datasets は nThreads の設定をサポートしており、 ERDDAP™ リクエストに応答する際に使用するスレッド数 詳細はこちら [nスレッド](#nthreads) 詳細はドキュメントを参照してください。
         
### EDDTableの特長{#eddtable} 
*    [ **EDDTableの特長** ](#eddtable) データセットは、表形式のデータを処理します。
    * タブラデータは、行と列を持つデータベースのようなテーブルとして表現できます。 各カラム (データ変数) 名前、属性のセット、および1つのタイプのデータを格納します。 各行に観察があります (または関連する値のグループ) お問い合わせ データソースは、異なるデータ構造、より複雑なデータ構造、および/または複数のデータファイルでデータを持っているかもしれませんが、 ERDDAP™ ソースデータをデータベースのようなテーブルに平らにし、データの表をユーザーに表示できるようにする必要があります。 ERDDAP お問い合わせ
    * 詳細な説明を参照してください。 [EDDTableデータモデル](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel) お問い合わせ
    * EDDTable データセットの種類は次のとおりです。
        *    [EDDTableFromAllデータセット](#eddtablefromalldatasets) レベルの高いデータセットで、他のすべてのデータセットに関する情報が提供されます。 ERDDAP お問い合わせ
        *    [EDDTableFromAsciiFiles (EDDTableFromAsciiFiles) からの投稿](#eddtablefromasciifiles) comma-, tab-, Semicolon-, またはスペース分離した ASCII データファイルからデータを集計します。
        *    [EDDTableFromAsciiサービス](#eddtablefromasciiservice) すべてのEDDTableFromAsciiService...クラスのスーパークラスです。
        *    [EDDTableFromAsciiServiceNOSから](#eddtablefromasciiservicenos) 一部のデータからデータを処理 NOAA NOS Webサービス
        *    [EDDTableFromAudioファイル](#eddfromaudiofiles) ローカルオーディオファイルのグループからデータを集計します。
        *    [EDDTableFromの特長 AwsXmlファイル](#eddtablefromawsxmlfiles) 自動気象ステーションのセットからデータを集計 (ツイート) XMLファイル。
        *    [EDDTableFromCassandraさん](#eddtablefromcassandra) 1つのCassandraテーブルから表データを処理します。
        *    [EDDTableFromColumnarAsciiFilesから](#eddtablefromcolumnarasciifiles) 固定幅のデータ列を持つ表形式の ASCII データファイルからデータを集計します。
        *    [EDDTableFromDapSequence (EDDTableFromDapSequence) の使い方](#eddtablefromdapsequence) 表データを扱う DAP シーケンスサーバー。
        *    [EDDTableFromデータベース](#eddtablefromdatabase) 1つのデータベーステーブルから集計データを処理します。
        *    [EDDTableFromの特長 EDDGrid ](#eddtablefromeddgrid) EDDTable データセットを EDDTable から作成できます。 EDDGrid データセット。
        *    [EDDTableFromErddapの特長](#eddfromerddap) リモートからタプルデータを処理します ERDDAP お問い合わせ
        *    [EDDTableFromFileNames(ファイル名)](#eddtablefromfilenames) サーバのファイルシステム内のファイルのグループに関する情報からデータセットを作成しますが、ファイル内のデータを提供していません。
        *    [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) EDDTableFrom...Files クラスは、すべての EDDTableFrom...Files クラスのスーパークラスです。
        *    [EDDTableFromHttpGetの特長](#eddtablefromhttpget) お問い合わせ ERDDAP 'データインポートとデータエクスポートのシステムだけ。
        *    [EDDTableFromの特長 Hyrax ファイル](#eddtablefromhyraxfiles)   (リリース) 複数の変数を持つファイルからデータを集約し、共有された寸法で提供される [ Hyrax   OPeNDAP サーバー](https://www.opendap.org/software/hyrax-data-server) お問い合わせ
        *    [EDDTableFromInvalidCRAファイル](#eddtablefrominvalidcrafiles) データを集計する NetCDF   (v3 または v4)   .nc 特定の、無効、CF DSG Contiguous Ragged Array の variant を使用するファイル (キュラ) ファイル。 しかし、 ERDDAP™ このファイルタイプをサポートし、使用し始めるべきでない無効なファイルタイプです。 現在、このファイルタイプを使用するグループが強く推奨されています ERDDAP™ 有効なCF DSG CRAファイルを生成し、これらのファイルを使用して停止します。
        *    [EDDTableFromJsonlCSVファイル](#eddtablefromjsonlcsvfiles) データを集計する [ジェイソン CSVファイルライン](https://jsonlines.org/examples/) お問い合わせ
        *    [EDDTableFromMultidimNcファイル](#eddtablefrommultidimncfiles) データを集計する NetCDF   (v3 または v4)   .nc 共有寸法で複数の変数を持つファイル。
        *    [EDDTableFromMqttの特長](/docs/server-admin/mqtt-integration) MQTT メッセージに基づいてデータセットを構築します。 ドキュメントは専用のページです。 似ているものが多いことに注意 [EDDTableFromHttpGetの特長](#eddtablefromhttpget) お問い合わせ
        *    [EDDTableFromNcFiles (EDDTableFromNcFiles) は、](#eddtablefromncfiles) データを集計する NetCDF   (v3 または v4)   .nc 共有寸法で複数の変数を持つファイル。 既存のデータセット用のこのデータセットタイプを引き続き使用しても構いませんが、新しいデータセットでは、代わりにEDDTableFromMultidimNcFilesを使用することをお勧めします。
        *    [EDDTableFromNcCFファイル](#eddtablefromnccffiles) データを集計する NetCDF   (v3 または v4)   .nc 指定したファイル形式の1つを使用するファイル [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) コンベンション しかし多次元CF DSGの変形の1つを使用してファイルのために、使用して下さい [EDDTableFromMultidimNcファイル](#eddtablefrommultidimncfiles) 代わりに。
        *    [EDDTableFromNccsvファイル](#eddtablefromnccsvfiles) データを集計する [NCCSVの特長](/docs/user/nccsv-1.00) ASCII .csv ファイル。
        *    [EDDTableFromNOSの特長](#eddtablefromnos)   (リリース) NOS XMLサーバーからタキュラデータを処理します。
        *    [EDDTableFromOBIS(EDDTableFromOBIS)の特長](#eddtablefromobis) OBIS サーバからタプルデータを処理します。
        *    [EDDTableParquetFilesから](#eddtablefromparquetfiles) データを扱う [パーケット](https://parquet.apache.org/) お問い合わせ
        *    [EDDTableFromの特長 SOS ](#eddtablefromsos) 表データを扱う SOS サーバ。
        *    [EDDTableFromThreddsファイル](#eddtablefromthreddsfiles)   (リリース) 複数の変数を持つファイルからデータを集約し、共有された寸法で提供される [パスワード OPeNDAP サーバー](https://www.unidata.ucar.edu/software/tds/) お問い合わせ
        *    [EDDTableFromの特長 WFS ファイル](#eddtablefromwfsfiles)   (リリース) すべてのデータをローカルにコピーする ArcGIS 地図サーバ WFS サーバはデータがすぐに保存できるように ERDDAP™ ユーザー。
        *    [EDDTableアグレゲートロー](#eddtableaggregaterows) EDDTable データセットのグループからEDDTableデータセットを作ることができます。
        *    [EDDTableコピー](#eddtablecopy) EDDTable のデータセットのローカルコピーを作成し、ローカルコピーからデータをすぐに保存することができます。

  
- - - - -

## データセットタイプの詳細な説明{#detailed-descriptions-of-dataset-types} 

###  EDDGrid FromDapから{#eddgridfromdap} 
 [ ** EDDGrid FromDapから** ](#eddgridfromdap) からグリッド変数を処理します [ DAP ](https://www.opendap.org/) サーバ。

* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 必要な情報を収集したり、独自のXMLを作成したりすることができます。 EDDGrid お使いのブラウザのソースデータセットのDDSとDASファイルを見て、Dapデータセット (.das と .dds を sourceUrl 例えば、 [https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds) ) お問い合わせ
     
*    EDDGrid FromDap は、任意の多次元変数からデータを得ることができます。 DAP データサーバ。 (以前は、 EDDGrid FromDap は "grid" に指定された変数に制限されていましたが、それはもはや要件ではありません。)   
     
* ソートされた寸法値 - 各次元の値はソート順にする必要があります (昇降または降下) お問い合わせ 値が不規則にスペース化できます。 何もない。 これはの条件です [CFメタデータ規格](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) お問い合わせ 次元の値はソート順でない場合、データセットはロードされず、 ERDDAP™ ログファイルの最初の無ソート値を特定します。 *bigParentディレクトリ* /logs/log.txt ディレクティブ
    
未ソートの寸法は、ほぼ常にソースのデータセットの問題を示しています。 これは、誤名または不適切なファイルが集計に含まれているときに最も一般的に起こります。これは、ソートされていない時間次元につながる。 この問題を解決するには、エラーメッセージを参照してください。 ERDDAP™ log.txt ファイルがオフエンディング時間値を見つけます。 次に、ソースファイルを見て、対応するファイルを見つけます (または 1 つ前後) 集計に所属しない。
    
####  EDDGrid FromDap スケルトン ログイン{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
###  EDDGrid からEDDTable{#eddgridfromeddtable} 
 [ ** EDDGrid からEDDTable** ](#eddgridfromeddtable) EDDTable の表データセットを EDDTable に変換する EDDGrid グリッドされたデータセット。 それを忘れないでください ERDDAP™ いずれかのデータセットを扱います [グリッドデータセット (サブクラス EDDGrid ) または集計データセット (EDDTableのサブクラス) ](#why-just-two-basic-data-structures) お問い合わせ

* 通常、グリッドデータがある場合、あなたはちょうどセットアップ EDDGrid 直接データセット。 たとえば、リレーショナルデータベースに保存されたデータがある場合、これは不可能です。 ERDDAP™ EDDTableFromDatabase 経由でのみアクセスできます。 EDDGrid FromEDDTable クラスでは、その状況を救済することができます。
     
* 明らかに、根本的なEDDTableデータセット内のデータは、 (基本的には) グリッドされたデータが、表形式のデータです。 たとえば、EDDTable のデータセットは、CTD のデータがあるかもしれません。東方および北方電流の測定は、いくつかの深さで数回行われます。 深さは毎回同じなので、 EDDGrid FromEDDTable は、埋め込まれた EDDTable データセットを介してデータにアクセスする時間と深さの次元でグリッド化されたデータセットを作成できます。
     
* 生成データセット Xml - Xml の 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 ラフドラフトを改善するために必要な情報を収集することができます。
     
* ソース属性 -- 他のデータセットと同様に、 EDDGrid FromTable には、グローバルソース属性や [グローバル addAttributes ](#global-attributes)   (で指定される datasets.xml ) , グローバルな組み合わせを作るために結合される ユーザーが見るものである属性。 グローバルなソース属性のために、 EDDGrid FromEDDTable は、グローバルに組み合わせる EDDTable の基底データセットの属性。 (分かって考えてみると、感覚になります。) 
    
同様に、それぞれ axisVariable お問い合わせ dataVariable お問い合わせ [ addAttributes ](#addattributes) , EDDGrid FromEDDTable は変数の結合を使用します 地下EDDTableデータセットからの属性 EDDGrid FromEDDTable 変数の sourceAttributes から。 (分かって考えてみると、感覚になります。) 
    
その結果として、EDDTable に良いメタデータがある場合、 EDDGrid FromEDDTableは、多くの場合、非常に少ない必要があります addAttributes メタデータ -- ここにいくつかの微調整があります。
    
*    dataVariable s 対パス axisVariable お問い合わせ 根本的なEDDTableは、唯一の dataVariable お問い合わせ ログイン EDDGrid FromEDDTable データセットには、 axisVariable ツイート (EDDTable の一部から作成 dataVariable ツイート) そして、いくつか dataVariable ツイート (残りのEDDTableから作成 dataVariable ツイート) お問い合わせ [生成データセットXml](#generatedatasetsxml) EDDTable が dataVariable s は EDDGrid からEDDTable axisVariable s, しかし、それはちょうど推測です. GenerateDatasetsXml の出力を変更して、どの値を指定する必要があります。 dataVariable sはなります axisVariable s、および順序で。
     
* 軸線値 -- 言うために根本的なEDDTableについての何もありません EDDGrid FromEDDTable の可能な値 axisVariable データセットのグリッド化されたバージョンの s は、それぞれにその情報を提供する必要があります axisVariable これらの属性の1つを使って:
    
    * axisValues -- 値のリストを指定できます。 例えば、
        &lt;att 名前="axisValues" [タイプ="doubleList"](#attributetype) \\&gt;2,2.5,3,3.5,4&lt;/att&gt;
注意: [データ型](#data-types) 単語リスト また、リストの種類 (例えば、ダブル) , データを一致させる必要があります EDDTable の変数のタイプおよび EDDGrid FromEDDTable データセット。
    * axisValuesStartStrideStop -- では、スタート、ストライド、ストップ値を指定することで、定期的にスペース化された値のシーケンスを指定できます。 上記の axisValues に等しい例を示します。
        &lt;att 名前="axisValuesStartStrideStop" [タイプ="doubleList"](#attributetype) \\&gt;2,0.5,4&lt;/att&gt;
繰り返しますが、リストデータ型の使用に注意して下さい。 また、リストの種類 (例えば、ダブル) , データを一致させる必要があります EDDTable の変数のタイプおよび EDDGrid FromEDDTable データセット。
         
    
アップデート -- 方法がないので EDDGrid EDDTable から EDDTable から axisValue を最初から決定するため、信頼できる方法はありません。 EDDGrid axisValues が変更されたときに EDDTable から決定 (特に、時間変数の新しい値がある場合) お問い合わせ 現在、唯一のソリューションは、axisValues 属性を in に変更することです。 datasets.xml データセットをリロードします。 たとえば、スクリプトを書くことができます。
    
    1. インフォメーション datasets.xml お問い合わせ
         datasetID ツイート *データセットID* ツイート
そのため、正しいデータセットで動作します。
    2. インフォメーション datasets.xml 次回の発生について
         <sourceName>  *変数名*  </sourceName>   
そのため、正しい変数で動作します。
    3. インフォメーション datasets.xml 次回の発生について
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
なので、タグの開始位置を知ることができます。
    4. インフォメーション datasets.xml 次回の発生について
```
        </att>  
```
そのため、軸値の終端位置を知ることができます。
    5. 古い開始、stride を置換し、新しい値で値を停止します。
    6. お問い合わせ [フラグ URL](/docs/server-admin/additional-information#set-dataset-flag) データセットについて ERDDAP™ データセットをリロードします。
    
これは理想ではありませんが、それは働きます。
     
* 精密 -- いつか EDDGrid FromEDDTable は、データに対するユーザーのリクエストに応答し、EDDTable 応答テーブルからデータ列を EDDTable 応答テーブルに移動します。 EDDGrid 応答グリッド。 これを行うには、テーブル内の特定の行の「軸」値がグリッド内の軸値の組み合わせと一致するかどうかを把握する必要があります。 整数データ型の場合、2つの値が等しいかどうかを判断するのは簡単です。 しかし、浮動小数と倍数のために、これは浮動小数点数の恐ろしい問題をもたらします [正確に一致しない](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) お問い合わせ (例:0.2 対 0.199999999999996) お問い合わせ お問い合わせ (お問い合わせ) これに対処する、 EDDGrid FromTable では、どんなものでも精密属性を指定できます。 axisVariable s は、同一の小数桁の総数を指定します。
    * 例えば、&lt;att name="精密"タイプ="int"&gt;5&lt;/att&gt;
    * 異なる種類のデータ変数の場合、異なるデフォルト精度値があります。 デフォルトは通常適切です。 もしそうでなければ、異なる値を指定する必要があります。
    * お問い合わせ axisVariable s は [時間または時間 スタンプ変数](#timestamp-variables) 、デフォルトは完全な精密です (正確なマッチ) お問い合わせ
    * お問い合わせ axisVariable 浮遊物であるsは、デフォルトの精密5です。
    * お問い合わせ axisVariable sはダブルスで、デフォルトの精度は9です。
    * お問い合わせ axisVariable 整数データ型を持っているs, EDDGrid FromEDDTable は精密属性を無視し、常に完全な精密を使用します (正確なマッチ) お問い合わせ
         
    *    **警告&#33;** 集計したデータのチャンクをグリッドされたデータのチャンクに変換するとき、 EDDGrid FromEDDTable は、EDDTable の "axis" 値と期待値の 1 つに一致できません。 EDDGrid FromEDDTable 軸値, EDDGrid FromEDDTable サイレント (エラーなし) テーブルの行からデータを捨てます。 たとえば、他のデータがある (グリッドにない) EDDTable データセット (そしてstrideなら&gt; 1、それは明らかではありません EDDGrid どの軸値が望ましい値であり、その値が stride のせいでスキップされるべきかを fromTable から。) そのため、精度値が高すぎると、有効なデータ値が実際に存在するときに、データ応答の欠如値が表示されるようになります。
        
逆に、精度値が低すぎる場合、一致しないEDDTable "axis"値 EDDGrid EDDTable 軸値から (誤って) マッチ。
        
これらの潜在的な問題は、ユーザーが誤ったデータを取得しているため、恐ろしいです (または不足している値) 適切なデータを取得する場合 (少なくともエラーメッセージ) お問い合わせ
これは欠陥ではありません EDDGrid からテーブル。 EDDGrid FromTableはこの問題を解決できません。 問題は、表データをグリッドデータに変換する際に固有のものです。 (他の前提が作れる限り、ここで作れない) お問い合わせ
それはあなた次第です、 ERDDAP™ 管理者, へ **あなたのテスト EDDGrid 徹底的にEDDTable** これらの潜在的な問題を回避するために、精度値が設定されていることを確認してください。
        
#### ギャップ閾値{#gapthreshold} 
*    [ギャップ閾値](#gapthreshold) お問い合わせ これは非常に珍しいタイプのデータセットです。 作れるクエリの種類から (取扱分野) ログイン EDDGrid データセット (範囲および strides に関連する axisVariable ツイート) 作ることができるクエリの種類と非常に異なります (取扱分野) EDDTable データセット (いくつかの変数の範囲に関連しただけ) のパフォーマンス EDDGrid FromEDDTable データセットは、生成された正確なリクエストと、EDDTable のデータセットの速度によって大きく異なります。  stride 値を持つリクエスト &gt; 1,100円 EDDGrid FromEDDTable は、データが比較的大きいチャンクに対して、EDDTable の根本的な要求をすることができます。 (stride=1 の場合) そして、結果を通してシフトし、いくつかの行からデータを保存し、他の人からデータを捨てます。 必要なデータを取得するために多くのデータを通過する必要がある場合は、リクエストは記入する必要があります。
    
お問い合わせ EDDGrid FromEDDTableは大きなギャップがあることを伝えることができます (不要なデータの行) 行間で目的のデータ, EDDGrid FromEDDTable は、複数のサブリクエストを 1 つの大きなリクエストの代わりに EDDTable にすることで、大きなギャップで不要なデータの行をスキップすることができます。 この決定に対する感度は、gepThreshold 値で指定された値で制御されます。&lt;タグギャップThreshold&gt; タグギャップ (ソースデータの default=1000 行) お問い合わせ より小さな番号にギャップThreshold を設定すると、データセットの作成につながります (一般的に) さらなるサブリクエスト。 より大きい数へのギャップThreshold の設定はデータセットの作成につながります (一般的に) 少数のサブリクエスト。
    
ギャップが小さい場合、 EDDGrid FromEDDTable は、複数のリクエストのオーバーヘッドが複数のデータを取得することで保存された時間よりも大きいため、よりゆっくりと動作します。 ギャップが大きい場合は、 EDDGrid EDDTable は、EDDTable から取り出されるデータが多く、廃棄されるため、よりゆっくりと動作します。 (Goldilocksが発見したように、中央は「ちょうど右」です。) EDDTable データセットの異なるタイプのオーバーヘッドは大きく異なりますので、データセットの実際のベスト設定を知る唯一の方法は、実験を介して行われます。 しかし、あなたは、デフォルトに固執しすぎて行くことはありません。
    
簡単な例は: 想像してみてください EDDGrid FromTable と 1 つだけ axisVariable   (時間、100000のサイズの) , 1 dataVariable   (温度) , デフォルトギャップ1000の閾値。
    
    * ユーザがリクエスト温度を要求する場合 \\[ 0&#58;100&#58;5000 \\] 、strideは100です従ってギャップのサイズは99です、ギャップの境界より少しです。 お問い合わせ EDDGrid FromTable は、リクエストに必要なすべてのデータに対して 1 つだけリクエストを EDDTable にします。 (温度に等しい \\[ 0:5000の \\] ) 必要なデータのすべての行を捨てます。
    * ユーザがリクエスト温度を要求する場合 \\[ 0:2500:5000 \\] 2500 なので、ギャップサイズは 2499 で、これはギャップよりも大きい。 お問い合わせ EDDGrid FromTable は温度に等しい EDDTable への別の要求を作ります \\[ 0 の 0 \\] 、温度 \\[ 2500円 \\] 、温度 \\[ 5000万円 \\] お問い合わせ
    
複数の軸がある場合、ギャップサイズの計算はより複雑です。
    
各ユーザーの要求のため、 EDDGrid FromEDDTableはこれに関連する診断メッセージを印刷します [ログイン](/docs/server-admin/additional-information#log) ファイル。
    
    * もし [&lt;ログレベル&gt; (ログレベル) お問い合わせ datasets.xml info にセットされているので、このようなメッセージを出力します。
\\* nOuterAxes=1 の 4 nOuterRequests=22
nOuterAxes=0 の場合、ギャップThreshold が超過されず、1 つのリクエストのみが EDDTable に作成されます。
nOuterAxes&gt;0 の場合、ギャップThreshold が超過され、nOuterRequests は EDDTable に行なわれ、左の nOuterAxes の各リクエストされた組み合わせに対応する。 たとえば、データセットが4を持っている場合 axisVariable s と dataVariable イーストワードのようなs \\[ タイムタイム \\]  \\[ 最近の投稿 \\]  \\[ 経緯 \\]  \\[ 深さ: \\] 一番左端 (はじめて) 軸変数は時間です。
    * お問い合わせ&lt;ログレベル&gt; お問い合わせ datasets.xml log.txt ファイルに追加の情報が書かれています。
         
####  EDDGrid FromEDDTable スケルトン ログイン{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD*Fromから ERDDAP  {#eddfromerddap} 
 ** EDDGrid Erddapから** リモートからグリッドされたデータを処理します ERDDAP™ サーバ。
 **EDDTableFromErddapの特長** リモートからタプルデータを処理します ERDDAP™ サーバ。

*    EDDGrid FromErddap と EDDTableFromErddap は、他のすべての種類のデータセットとは異なる動作をします。 ERDDAP お問い合わせ
    * 他の種類のデータセットと同様に、これらのデータセットはソースからデータセットに関する情報を取得し、メモリに保存します。
    * 他の種類のデータセットと同様に、 ERDDAP™ データセットの検索、データアクセスフォームの表示 ( * datasetID * .html拡張子) グラフフォームを作成するか、または表示します ( * datasetID * .グラフ) , ERDDAP™ メモリ内のデータセットに関する情報を使用します。
    *    EDDGrid FromErddap と EDDTable FromErddapは、 [グリッド/クラスター/フェデレーション](/docs/server-admin/scaling) インフォメーション ERDDAP CPU使用量を効率的に分散するs (主に地図を作るため) 大規模なデータセンターのメモリ使用量、データセットストレージ、および帯域幅の使用量。
#### リダイレクト{#redirect} 
* 他の種類のデータセットとは異なり、 ERDDAP™ これらのデータセットからデータや画像のリクエストを受信します。 ERDDAP   [リダイレクト](https://en.wikipedia.org/wiki/URL_redirection) リモートへのリクエスト ERDDAP™ サーバ。 結果は:
    * これは非常に有効です (CPU、メモリ、帯域幅) , その他
        1. コンポジット ERDDAP™ リクエストを他の人に送信しなければならない ERDDAP™   (所要時間) お問い合わせ
        2. その他 ERDDAP™ データを取得し、それを再フォーマットし、データをコンポジットに送信します ERDDAP お問い合わせ
        3. コンポジット ERDDAP™ データの受け取り (帯域幅の使用) 、それを再フォーマットして下さい (CPUとメモリの使用) データをユーザに送信する (帯域幅の使用) お問い合わせ リクエストをリダイレクトし、他のリクエストを許可することで ERDDAP™ ユーザーに直接応答を送信するには、コンポジット ERDDAP™ 要求の CPU 時間、メモリ、または帯域幅を基本的に使用しません。
    * リダイレクトは、クライアントソフトウェアに関係なくユーザーに透明です (ブラウザまたはその他のソフトウェアまたはコマンドラインツール) お問い合わせ
*    [教えてください ERDDAP™ ](#redirect) 設定で任意のユーザーリクエストをリダイレクトしない&lt;リダイレクト&gt;false&lt;/redirect&gt; ですが、これは...FromErddap データセットタイプの利点のほとんどを無視します (確かに、フロントエンドの負荷を分散させる ERDDAP™ リモート/バックエンドへ ERDDAP ) お問い合わせ
         
     
#### サブスクリプション{#subscriptions} 
通常、いつ EDDGrid FromErddap と EDDTable FromErddap は (リリース) あなたの上にロード ERDDAP リモートでリモートデータセットにサブスクリプションを追加する ERDDAP 'email/URL サブスクリプションシステム。 つまり、リモートデータセットが変更されるたびに、リモート ERDDAP™ コンタクト [セットデータセット フラグ URL](/docs/server-admin/additional-information#set-dataset-flag) お問い合わせ ERDDAP™ ローカルデータセットが ASAP を再ロードされるため、ローカルデータセットが常に最新かつリモートデータセットを移行できるようにします。 ですから、これが初めて、サブスクリプションを検証するメールリクエストを取得する必要があります。 但し、現地の場合 ERDDAP™ 電子メールやリモートが送信できない場合 ERDDAP 'email/URL サブスクリプションシステムがアクティブでない、リモートをメールする必要があります ERDDAP™ 管理者と s/he を手動で追加するリクエスト&lt;変更&gt; (#onchangeさん) ・・・&lt;/onChange&gt; 関連するすべてのデータセットにタグを付けて、データセットの呼び出しを行います。 [セットデータセット フラグ URL](/docs/server-admin/additional-information#set-dataset-flag) お問い合わせ お問い合わせ ERDDAP™ setDataset のリストの毎日レポート フラグ URL が、 一つだけ送信する EDDGrid FromErddapとEDDTableFromErddapデータセットをリモートへ ERDDAP™ 管理者。
    
これは機能していませんか? ローカルデータセットはリモートデータセットと同期していなくてもよいですか?
データセットが最新の状態に保たれるように、このシステムが正常に動作する必要はいくつかあります。 それぞれのことを順番にチェックしてください。
    
    1. お問い合わせ ERDDAP™ メールでのお問い合わせ setup.xml のメール設定を参照してください。
    2. 全般について (しかし、常に) お問い合わせ ERDDAP お問い合わせ&lt;baseUrl&gt; と&lt;baseHttpsUrl&gt; ポート番号がないので (例:8080、:8443) お問い合わせ もしそうしたら、 [プロキシパス](/docs/server-admin/deploy-install#proxypass) ウルからポートを外す。
    3. setup.xml では、&lt;subscribeToRemoteErddapDataset&gt; は true に設定する必要があります。
    4. ローカルのEDDが... FromErddap データセットはリロードされます、それはリモートに要求を送るべきです ERDDAP™ リモートデータセットを購読します。 これが起こっているかどうかを確認するためにlog.txtを見てみましょう。
    5. サブスクリプションリクエストを検証するために、電子メールを要求する必要があります。
    6. サブスクリプションリクエストを検証するには、そのメールのリンクをクリックする必要があります。
    7. リモート ERDDAP™ 検証が成功したと言わなければならない。 いつでも、リモートからの電子メールを要求できます ERDDAP™ 保留および有効なサブスクリプションのリストを使って。 フォームを見る *リモートErddapBase ウルル* /erddap/subscriptions/list.html 。
    8. リモートデータセットの変更時 (例: 追加のデータを取得します。) 、リモート ERDDAP™ フラグ URL にご連絡ください。 ERDDAP お問い合わせ これをチェックすることはできませんが、リモートの管理者に尋ねることができます ERDDAP™ お問い合わせ
    9. お問い合わせ ERDDAP™ flagURL を設定するためのリクエストを受け取る必要があります。 "setDatasetFlag.txt?" の log.txt を探します。 (ツイート) リクエストに関連したエラーメッセージがある場合に参照してください。
    10. お問い合わせ ERDDAP™ データセットを再ロードしようとする (おそらくすぐにではなく、できるだけ早くASAP) お問い合わせ
         
#### 最新最大 (タイムタイム) お問い合わせ{#up-to-date-maxtime} 
 EDDGrid /TableFromErddap データセットは、ソースデータセットが行われるときに、各ソースデータセットに関する保存された情報のみを変更します。 [「リロード」](#reloadeverynminutes) メタデータの変更の一部 (例:変数の時刻 actual\\_range ) サブスクリプション通知を生成します。 ソースデータセットに頻繁に変更するデータがある場合 (例えば、毎秒新しいデータ) そして使用して下さい [「更新」](#updateeverynmillis) 基礎データへの頻繁な変化に気づくシステム、 EDDGrid /TableFromErddapは、次のデータセット「リロード」まで、これらの頻繁な変更について通知されません。 EDDGrid /TableFromErddap は最新ではありません。 ソースデータセットを変更することで、この問題を最小限に抑えることができます&lt;reloadEveryNMinutes&gt; より小さい値へ (60? 15?) より多くのサブスクリプション通知があるように、 EDDGrid /TableFromErddap は、ソースデータセットに関する情報を更新します。

または、ソースのデータセットが新しいデータを持っているときにデータ管理システムが知っている場合 (例えば、データファイルをコピーするスクリプトを使って、) 、そしてそれが極度の頻繁でなければ (例:5分ごとに、または頻度が少ない) 、よりよい解決があります:

1. 使用しないでください&lt;updateEveryNMillis&gt; は、ソースのデータを最新の状態に保ちます。
2. ソースデータセットの設定&lt;reloadEveryNMinutes&gt; より大きい数に (1440?) お問い合わせ
3. スクリプトがソースのデータセットに問い合わせる [フラグ URL](/docs/server-admin/additional-information#set-dataset-flag) 新しいデータファイルをコピーして配置する直後に。
     

これにより、ソースデータセットが完全に最新になり、サブスクリプション通知を生成し、それに送信されるようになります。 EDDGrid /TableFromErddap データセット。 それは導きます EDDGrid /TableFromErddap のデータセットを完全に更新する (5秒以内に新しいデータを追加) お問い合わせ そして、そのすべてが効率的に行われる (不要なデータセットリロードなし) お問い合わせ
     
#### なし addAttributes , axisVariable または dataVariable  {#no-addattributes-axisvariable-or-datavariable} 
他の種類のデータセットとは異なり、EDDTableFromErddap と EDDGrid FromErddap データセットはグローバルを許可しません&lt;addAttributes&gt;,&lt; axisVariable &gt;、または&lt; dataVariable &gt;セクション datasets.xml そのデータセットのため。 問題は、これらが矛盾につながる可能性があることです。
    
1. 許可され、新しいグローバル属性を追加したとします。
2. ユーザーがあなたの質問をするとき ERDDAP™ グローバルな属性では、新しい属性が現れます。
3. しかし、ユーザーがあなたの質問をするとき ERDDAP™ データファイルの場合、 ERDDAP™ リクエストをソースにリダイレクトする ERDDAP お問い合わせ お問い合わせ ERDDAP™ 新しい属性の unaware です。 そのため、メタデータでデータファイルを作成する場合、例えば、 .nc メタデータは新しい属性を持たない。

2つの回避策があります。

1. ソースの管理者を説得 ERDDAP™ メタデータにしたい変更を加える。
2. EDDTableFromErddap の代わりに、 [EDDTableFromDapSequence (EDDTableFromDapSequence) の使い方](#eddtablefromdapsequence) お問い合わせ または代わりに EDDGrid FromErddap, 使用 [ EDDGrid FromDapから](#eddgridfromdap) お問い合わせ これらのEDDタイプを使用すると、リモートでデータセットに効率的に接続できます ERDDAP™   (データリクエストをリダイレクトすることなく) そして、グローバルに含めることを可能にします&lt;addAttributes&gt;,&lt; axisVariable &gt;、または&lt; dataVariable &gt;セクション datasets.xml お問い合わせ もう一つの違い: リモート・データセットに手動で登録する必要があります。 ERDDAP™ 通知されます (お問い合わせ [フラグ URL](/docs/server-admin/additional-information#set-dataset-flag) ) リモートデータセットの変更がある場合。 そのため、リモートデータセットへのリンクではなく、新しいデータセットを作成します。
         
#### その他の注意事項{#other-notes} 
* セキュリティ上の理由から、 EDDGrid FromErddap と EDDTable FromErddap はサポートしていません [&lt;にアクセスする&gt; (#アクセス可能) タグは、ロギングが必要なリモートデータセットで使用できません。(ただし、それらは[&lt;にアクセスする&gt; (#アクセス可能) .... お問い合わせ ERDDAP お問い合わせ [セキュリティシステム](/docs/server-admin/additional-information#security) 一部のユーザーへのデータセットへのアクセス制限
     
* まずは ERDDAP™ v2.10, EDDGrid FromErddap と EDDTableFromErddap のサポート [&lt;アクセス可能なViaFiles&gt; (#accessibleviaファイル) タグ。 他のタイプのデータセットとは異なり、デフォルトは真ですが、データセットのファイルはソースデータセットも持っている場合にのみアクセス可能になります。&lt;accessViaFiles&gt; true に設定します。
     
* 使うことができます。 [生成データセット Xmlプログラム](#generatedatasetsxml) 作るために datasets.xml このタイプのデータセットのチャンク。 しかし、これらのタイプのデータセットを手作業で簡単に行うことができます。
     
####  EDDGrid FromErddap スケルトン ログイン{#eddgridfromerddap-skeleton-xml} 
*    EDDGrid FromErddap スケルトン XML のデータセットは非常に簡単です。意図は、既に使用するのに適しているリモート データセットを模倣することです。 ERDDAP : : :
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableFromErddap スケルトン ログイン{#eddtablefromerddap-skeleton-xml} 
* EDDTableFromErddap のデータセット用の skeleton XML は非常に簡単です。 意図はリモートデータセットを移行するだけなので、既に使用に適しています。 ERDDAP : : :
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid トピックス{#eddgridfrometopo} 
 [ ** EDDGrid トピックス** ](#eddgridfrometopo) ちょうど役立つ [ETOPO1 グローバル1-分グリッド関連データセット](https://www.ngdc.noaa.gov/mgg/global/global.html)   (氷面、グリッド登録、バイナリ、2バイトのint: etopo1\\_ice\\_g\\_i2 .zip ) と配布される ERDDAP お問い合わせ

* 2人のみ datasetID s はサポートされます EDDGrid FromEtopoは、経度値 -180から180、経度値0から360までのデータにアクセスできるようにします。
* 既にデータが記述されているので、サブタグは存在しません。 ERDDAP お問い合わせ
* 2つのオプション EDDGrid FromEtopo データセットは (文字通り) : : :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

###  EDDGrid ファイルから{#eddgridfromfiles} 
 [ ** EDDGrid ファイルから** ](#eddgridfromfiles) すべてのスーパークラスです EDDGrid から...ファイルクラス。 使えない EDDGrid FromFilesから直接。 代わりに、サブクラスを使用する EDDGrid FromFiles は特定のファイルタイプを処理する:

*    [ EDDGrid FromMergeIRFilesから](#eddgridfrommergeirfiles) グリッドからデータを処理します [マージIR .gz ](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) ファイル。
*    [ EDDGrid FromAudioFilesから](#eddfromaudiofiles) ローカルオーディオファイルのグループからデータを集計します。
*    [ EDDGrid からNcFiles](#eddgridfromncfiles) グリッドからデータを処理します [GRIBの.grb](https://en.wikipedia.org/wiki/GRIB) ファイル, [ HDF   (v4 または v5)   .hdf ](https://www.hdfgroup.org/) ファイル, [ .nc ミリリットル](#ncml-files) ファイル、および [ NetCDF   (v3 または v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) ファイル。 これは他のファイルタイプで動作する可能性があります (例えば、BUFR) 、私達はちょうどそれをテストしませんでした --興味があれば私達にサンプル ファイルを送って下さい。
*    [ EDDGrid FromNcFiles解凍](#eddgridfromncfilesunpacked) バリアントとは EDDGrid グリッドからデータを処理するFromNcFiles NetCDF   (v3 または v4)   .nc 関連するファイル ERDDAP™ 低いレベルのアンパック。

現在、他のファイルタイプは対応しておりません。 しかし、他のファイルタイプのサポートを追加するのは比較的簡単です。 リクエストがあればご連絡ください。 または、データが古いファイルフォーマットにある場合は、ファイルを変換することをお勧めします。 NetCDF v3の .nc ファイル。 NetCDF 広くサポートされています。バイナリ形式は、データへの高速ランダムアクセスを可能にし、既にサポートされています。 ERDDAP お問い合わせ

#### ファイルの詳細から{#from-files-details} 
以下の情報は、すべてのサブクラスに適用されます EDDGrid ファイルから。

##### 既存の次元の集計{#aggregation-of-an-existing-dimension} 
すべてのバリエーション EDDGrid FromFilesは、各ファイルが1つあるローカルファイルからデータを集計できます。 (以上) 左端の異なる値 (はじめて) 次元、通常 \\[ タイムタイム \\] 集計されます。 例えば、寸法は \\[ タイムタイム \\]  \\[ 高度の高度 \\]  \\[ 最近の投稿 \\]  \\[ 経緯 \\] , ファイルには 1 つのデータがあるかもしれません (または数) 時間値 (ツイート) ファイルごと 結果データセットは、すべてのファイルのデータが組み合わされたかのように表示されます。 集計の大きな利点は次のとおりです。

* 集計されたデータセットのサイズは、単一のファイルよりもはるかに大きくなる可能性があります。 (〜2GB) お問い合わせ
* リアルタイムデータの場合、最新のチャンクデータで新しいファイルを簡単に追加できます。 データセット全体を書き換える必要はありません。

集計の要件は次のとおりです。
* ローカルファイルは同じを持っていません dataVariable ツイート (dataset の定義 datasets.xml ) お問い合わせ データセットには、 dataVariable s で定義される datasets.xml お問い合わせ 指定したファイルが存在しない場合 dataVariable , ERDDAP™ 必要に応じて、不足している値を追加します。
* すべての dataVariable s は同じを使用する必要があります axisVariable s/次元 (dataset の定義 datasets.xml ) お問い合わせ ファイルは最初のファイルに基づいて集計されます (一番左端) 次元、昇順で分類される。
* 各ファイル MAYは、最初の次元の1つ以上の値のデータを持っていますが、ファイル間で重複することができません。 ファイルが最初の次元の1つ以上の値がある場合、値が昇順でソートされる必要があります。
* すべてのファイルは、他のすべての寸法の同じ値を持つ必要があります。 テストの精度は、 [MatchAxisNDigits, オーストラリア](#matchaxisndigits) お問い合わせ
* すべてのファイルは正確に同じを持っている必要があります [ユニット](#units) すべてのメタデータ axisVariable s と dataVariable お問い合わせ 問題が起きた場合は、 [ログイン](#ncml-files) または [ NCO ](#netcdf-operators-nco) 問題を解決するため。
         
##### ファイル名またはグローバルメタデータによる集計{#aggregation-via-file-names-or-global-metadata} 
すべてのバリエーション EDDGrid FromFilesは、新しい左端を追加することによって、ファイルのグループを集計することもできます (はじめて) 各ファイル名から派生した値または各ファイルにあるグローバル属性の値に基づいて、通常、時間。 たとえば、ファイル名には、ファイル内のデータに対する時間値が含まれる場合があります。 ERDDAP™ その後、新しい時間次元を作成します。

THREDDSの類似機能とは異なり、 ERDDAP™ 常に作成する axisVariable 数値値で (CFの要求に応じて) , 決して文字列の値 (CFで許可されていないもの) お問い合わせ また、 ERDDAP™ 数値に基づいて集計中のファイルをソートします axisVariable それぞれのファイルに割り当てられた値なので、軸変数が常にCFで要求される値がソートされます。 ファイル名に基づいてlexicographicソートを行うTHREDDSアプローチは、軸値がソートされていない集計につながります (CFで許可されていないもの) ファイル名が派生したものと異なる場合 axisVariable 値。

これらの集計の1つを設定する ERDDAP™ 新しい左端を定義します。 (はじめて)   [ axisVariable ](#axisvariable) 特別な、擬似と&lt; sourceName &gt; と伝えます ERDDAP™ それぞれのファイルから新しい次元の値を探し出す方法

* 擬似のフォーマット sourceName ファイル名から値を取得する (filename.ext のみ) お問い合わせ
    \\*\\*ツイート *ファイル名,*  [データデータ タイプ:](#data-types)  *,* エキストラRegex *,* キャプチャグループ番号*
* 擬似のフォーマット sourceName ファイルの絶対パス名から値を取得するのは
    \\*\\*ツイート *pathName,*  [データデータ タイプ:](#data-types)  *,* エキストラRegex *,* キャプチャグループ番号*
     \\[ そのためには、常にパス名を使う '/' ディレクトリの区切り文字として、'\' は決してありません。 \\] 
* 擬似のフォーマット sourceName グローバルな属性から値を取得する
    \\*\\*ツイート *グローバル:* 属性属性 お名前 (必須) *,*  [データデータ タイプ:](#data-types)  *,* エキストラRegex *,* キャプチャグループ番号*
* この擬似 sourceName オプションは、他の人と異なる機能します。代わりに新しい左端を作成する (はじめて)   axisVariable 、これは現在の価値を取り替えます axisVariable filename から抽出された値で (filename.ext のみ) お問い合わせ フォーマットは
    \\*\\*ツイート *交換する FromFileName,*  [データデータ タイプ:](#data-types)  *,* エキストラRegex *,* キャプチャグループ番号*
     

提供する必要がある部品の説明は次のとおりです。

*    *属性属性 お名前 (必須)* -- 各ファイルに含まれるグローバル属性の名前と、次元値を含む。
*    *データデータ タイプ:* お問い合わせ 値を保存するために使われるデータ型を指定します。 標準リストを見る [データデータ タイプ](#data-types) ということ ERDDAP™ サポートは、 文字列が axis 変数として axis 変数として 許可されていないことを除いて ERDDAP™ String 変数は指定できません。
    
追加の擬似データタイプ、timeFormat= *キーワード 時間形式* , 伝えます ERDDAP™ 値が文字列 timeStamp であること [文字列時間に適した単位](#string-time-units) お問い合わせ ほとんどの場合、必要な stringTimeFormat は、これらのフォーマットの1つのバリエーションになります。
    
    *    yyyy-MM-dd ISO 8601:2004の「T'H:mm:ss.SSSZ --」 (Eメール) 日付時刻形式。 短縮版が必要な場合があります。 yyyy-MM-dd 'T'H:mm:ss か yyyy-MM-dd お問い合わせ
    * yyyyMMddHHHmms.SSS - ISO 8601日付フォーマットのコンパクトなバージョンです。 つまり、yyyMMddHmms や yyyMMdd など、このバージョンを短くする必要があるかもしれません。
    * M・d・yyy H:mm:ss.SSS -- 米国のスラッシュ日付フォーマットです。 M/d/yyy などの短縮版が必要な場合があります。
    * yyyyddDHHmmsSSS - 今年のゼロパッド入り日と (例:001 = 1月1日、365 = 12月31日、非飛躍年。これは、ジュリアンの日付と呼ばれることもあります。) お問い合わせ つまり、yyyDDD などの短縮版が必要な場合があります。
    
この擬似 dataType を使用する場合は、この値を新しい変数に追加します。&lt; addAttributes &gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
すべての時間値をシフトしたい場合は、単位内の時間値をシフトします。例えば、
1970-01-01T12:00:00Z.
*    *エキストラRegex* お問い合わせ これは、 [正規表現](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [チュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) キャプチャグループを含む (括弧で) これは、ファイル名またはグローバル属性の値から値を抽出する方法を記述します。 例えば、S19980011998031.L3b\\_MO\\_CHL のようなファイル名を指定 .nc , キャプチャグループ #1, "\\ \\dチュートリアル "、正規表現ではS (ツイート \\dチュートリアル ) ツイート \\dチュートリアル \\.L3b.\\* は、'S': 1998001 以降の最初の 7 桁をキャプチャします。
*    *キャプチャグループ番号* お問い合わせ キャプチャグループ数です。 (ペアの括弧内) 関心のある情報を含む正規表現。 通常1、最初のキャプチャグループです。 時々、regex の他の目的のためにキャプチャグループを使用する必要があるので、重要なキャプチャグループ番号は 2 になります (2番目のキャプチャグループ) または 3 (第3項) 等。

完全な例 axisVariable これは、各ファイルのファイル名から時間値を取得する新しい時間軸で集計されたデータセットを作る
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
"timeFormat="擬似データを使用するとき タイプ、 ERDDAP™ に 2 つの属性を追加します。 axisVariable ソースから来るように見えるように:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
この場合、 ERDDAP™ という名前の新しい軸を作成します。 "time" 二重値で (1970-01-01T00:00:00Z以来の秒) ファイル名の「S」と「.L3m」の前後の7桁を抽出し、yyyDDDとしてフォーマットされた時間値として解釈することによって。

デフォルトベース時間をオーバーライドできます (1970-01-01T00:00:00Z) 追加することで [add属性](#addattributes) 異なるベースタイムで異なるユニット属性を指定します。 一般的な状況は次のとおりです。衛星データセットの1日コンポジットを持つデータファイルのグループがあります。ファイル名に言及した日の正午になる時間値が欲しい (一日中集中した時間) 変数の long\\_name 「カレンダー」になる。 これを行う例:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
1970-01-01T00:00:00Zの元のベース時間に12時間を追加し、ベース時間に時間= 12。

完全な例 axisVariable 新しい「実行」軸で集計したデータセットを作る (int の値で) 各ファイルに「runID」グローバル属性から実行値を取得する ("r17\\_global" のような値で、17 は実行番号です。) お問い合わせ
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
キャプチャグループ番号 2 を使用して、 'r' または 's' の後に発生した数字をキャプチャし、「\\_global」の前に使用してください。 この例では、追加の属性を追加する方法も示しています (例: ioos\\_category ユニット) 軸変数へ。
     
#### 外部圧縮されたファイル{#externally-compressed-files} 
* サブセットであるデータセット EDDGrid ファイルとEDDTable FromFilesは、外部に圧縮されたデータファイルから直接データを配信できます。 .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 .Z ファイル
     
*    **意外にうまくいく作品です&#33;**   
ほとんどの場合、小型データファイルや中型データファイルを取り戻すための減速はマイナーです。 ディスクスペースを節約する必要がある場合は、特にアクセスされていない古いファイルについては、この機能を使用することを強くお勧めします。
     
*    **お金を節約&#33;**   
これは、いくつかの機能の1つです ERDDAP™ たくさんのお金を節約するチャンスを提供する (若干のパフォーマンスが低下するが) お問い合わせ 圧縮比が等の場合、6:1 (時々それははるかに高い) データセットのデータファイルがディスク容量の1/6だけ必要になります。 それから多分1 RAIDで得ることができます (与えられたサイズの) 6 RAIDSの代わりに (同じサイズの) お問い合わせ それは巨大なコスト節約です。 うまくいけば、いくつかのファイルをコレクションに圧縮する能力 (古いもの?) 他の人を圧縮しない (新しいもの?) いつでも変更するには、ファイルの一部を圧縮するために、ダウンサイドを最小限に抑えましょう (遅いアクセス) お問い合わせ 選択がテープにファイルを格納する間にある場合 (リクエスト時にのみアクセス可能で、遅延後) それらを RAID に保存する対 (経由してアクセス可能 ERDDAP ) 、そしてユーザーが相互に得るように圧縮を使用することに巨大な利点があります (比較的) データの迅速なアクセス また、追加 RAID を購入して保存すると、この機能は約 $30,000 を保存できます。
     
* お問い合わせ EDDGrid FromFiles サブクラスは、データファイルが外部に圧縮されたファイルであることを示す拡張子を持っている場合 (現在: .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 または .Z) , ERDDAP™ ファイルを読み込むときに、データセットのキャッシュディレクトリに解凍します。 (すでにキャッシュされていない場合) お問い合わせ バイナリファイルでは同じです (例: .nc ) EDDTableFromFiles のサブクラス。
     
* EDDTableFromFiles のサブクラスは非バイナリファイルに対して (例:.csv) , 外部に圧縮されたファイルであることを示す拡張子を持つデータファイルは、ファイルが読み込まれるようにオンザフライを解除されます。
     
* 要件: 外部に圧縮されたファイルの種類が使用される場合 (例: .tgz または .zip ) 圧縮されたファイル内の1つ以上のファイルをサポートし、圧縮されたファイルは1つのファイルだけを含む必要があります。
     
* 要件: この機能は、外部に圧縮されたファイルの内容を変更しないと仮定し、キャッシュされた非圧縮されたファイルが再使用できるようにします。 データセットのデータファイルの一部または全部が変更される場合、それらのファイルを圧縮しないでください。 これは、通常、変更が必要なファイルを圧縮しないため、一般的な使用と一貫性があります。
     
*   &lt;fileNameRegex&gt; この作業を行うには、データセットの&lt;fileNameRegex&gt; は圧縮されたファイルの名前と一致しなければなりません。 明らかに、 .\\*すべてのファイル名にマッチします。 特定のファイルタイプを指定すると、例えば、.\\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .nc , 圧縮拡張も含むregexを変更する必要があります, 例えば, .\\ *\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .nc \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .gz (全てのファイルがファイルの場合)* お問い合わせ .nc  .gz ファイル) .
     
* データセットに圧縮されたファイルと圧縮されていないファイルのミックスが含まれる場合、それは良いです。 ファイルがいくつかあると信じると便利です (例:古いファイル) ディスク容量を圧縮することで、ディスク容量を節約するのに便利です。 この作品を作るために、&lt;fileNameRegex&gt; は、圧縮されたファイルの名前と一致してはならない。例えば、.\\*または。\\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .nc  ( | \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .gz ) (その最後にキャプチャグループが指定する場所 .gz オプションです。
     
* 特定のファイルをいつでもコレクションに圧縮または解凍する場合、それは良いです。
データセットが使用しない場合 [&lt;更新EveryNMillis&gt; (#updateeverynmillis, オーストラリア) データセットの設定 [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ ERDDAP™ データセットをリロードし、変更を通知します。 興味深いことに、同じデータセットで異なるファイル用の異なる圧縮アルゴリズムと設定を使用できます (例: .bz2 まれに使用したファイルのために、 .gz 頻繁に使用されるファイルではなく、頻繁に使用されるファイルのための圧縮無し) , regex は .\\*\\\\ など、使用中のすべてのファイル拡張子をサポートしていることを確認してください .nc  ( | \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .gz  | \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .bz2 ) お問い合わせ
     
* もちろん、異なる圧縮アルゴリズムの圧縮比と速度は、ソースファイルと設定によって異なります (例:圧縮レベル) お問い合わせ ファイルを最適化したい場合は、ファイルと圧縮設定の範囲の異なる圧縮方法のテストを実行します。 確実に良いものが必要な場合 (必ずしも最善ではありません) セットアップ、私達は少し推薦します gzip   ( .gz ) お問い合わせ gzip 最小圧縮ファイルを作ることができません (それは合理的に閉じます) , しかし、それは非常に迅速にファイルを圧縮し、 (より重要なのは ERDDAP™ ユーザー) ファイルを素早く解凍します。 プラス, gzip ソフトウェアは、すべてのLinuxとMac OSのインストールで標準装備されており、7ZipやGit BashなどのLinuxアドオンなどの無料のツールを使用してWindowsのためにすぐに利用できます。 たとえば、ソースファイルを圧縮する .gz ファイルのバージョン (同じファイル名ですが、 .gz リクエスト) 、使用して下さい (Linux、Mac OS、およびGit Bashで)   
     gzip   * sourceName *   
解凍するために .gz 元のファイルに戻る、使用
ガンジップ * sourceName  .gz *   
ディレクトリとサブディレクトリの各ソースファイルを圧縮するには、再帰的に使用してください。
     gzip ログイン *ディレクター名*   
それぞれを解凍するために .gz ディレクトリ内のファイルとそのサブディレクトリ、再帰的に、使用
ガンジップ -r *ディレクター名*   
     
* 警告: 外部に圧縮しないでください ( gzip ) 既に内部に圧縮されているファイル&#33;
既に多くのファイルが内部に圧縮されたデータを持っています。 お問い合わせ gzip これらのファイルでは、結果のファイルがそれほど小さくありません()&lt;5% および ERDDAP™ 読む必要があるときにそれらを解凍する時間を無駄にします。 例えば:
    
    * データファイル:例、 .nc 4、および .hdf 5 ファイル: 一部のファイルは内部圧縮を使用します。 一部は使用しません。 変数を圧縮する方法は "\\_ChunkSize" 属性です。 また、グリッドのグループの場合 .nc または .hdf ファイルはすべて異なるサイズで、内部的に圧縮される可能性があります。 同じサイズであれば、内部的に圧縮されません。
    * .gif, .jpg, .png などのイメージファイル
    * オーディオファイル:例、.mp3、および.ogg。
    * ビデオファイル:例、.mp4、.ogv、および.webm。
    
        
不幸なオッズケース: .wav オーディオファイルが巨大で内部的に圧縮されていない。 圧縮するのがいいでしょう ( gzip ) それらは、一般的には、あなたがそうならなければ、ユーザーは自分のブラウザで圧縮されたファイルを再生できません。
     
* テスト ケース: 圧縮 (お問い合わせ gzip ) 1523 グリッド付きデータセット .nc ファイル。
    
    * ソースファイル内のデータはスパースでした (たくさんの不足している値) お問い合わせ
    * ディスク容量の合計は57 GBから、圧縮から7 GBまで続きます。
    * 1つのポイントから大量のデータを要求する&lt;圧縮前後1秒。
    * 365タイムポイントの1つのデータリクエストポイント (最悪の場合の状況) 4 s から 71 s へ。
         
    
どんなデータセットでも合理的なトレードオフであり、偽りなく使用しているデータセットについては確かに私にとって。
     
* 内部対外的な圧縮 --
提供されている内部ファイルの圧縮と比較して .nc 4と4 .hdf 5ファイル、 ERDDAP '外部に圧縮されたバイナリファイルに対するアプローチは、利点と欠点を持っています。 欠点は: 1 つのファイルの小さな部分の 1 つの時間の読み込みのため、内部圧縮はより良いので EDDGrid FromFilesは、いくつかのチャンクを解凍する必要があるだけ (ツイート) ファイルがファイル全体ではなく、 しかし、 ERDDAP 's アプローチにはいくつかの利点があります。
    
    *    ERDDAP™ すべての種類のデータファイルの圧縮をサポート (バイナリと非バイナリ、例えば、 .nc 3と.csv) だけでなく、 .nc 4と4 .hdf 4。
    * ファイルのバルクが短時間で一度以上読む必要がある場合は、一度ファイルを解凍して何度も読み込む時間を節約します。 これは、 ERDDAP™ ユーザーがデータセットに Make-A-Graph を使用し、一連の小さな変更をグラフにします。
    * 圧縮されたファイルを圧縮し、同じコレクションでファイルを圧縮しない機能により、圧縮されたファイルと圧縮されていないファイルをより制御できます。 そして、この追加制御は、本当にソースファイルを変更することなく来ます (ファイルを例えば圧縮できるので、 .gz そして元のファイルを得るためにそれを解凍して下さい) お問い合わせ
    * 特定のファイルが圧縮され、どのように圧縮されるか、いつでも変更する能力 (異なるアルゴリズムと設定) システムのパフォーマンスをさらに制御できます。 元の非圧縮ファイルをいつでも簡単に回復できます。
    
すべての状況で勝者であるアプローチは決してありませんが、 ERDDAP ' 外部圧縮ファイルからデータを配信する機能により、外部圧縮が提供される内部圧縮に合理的な代替 .nc 4と4 .hdf 5。 それは内部の圧縮が使用することを選ぶ主な理由の1つである場合非常に重要です .nc 4と4 .hdf 5。
     
##### 分解されたキャッシュ{#decompressed-cache} 
 ERDDAP™ 圧縮されたバイナリの分解バージョンを作る (例: .nc ) ファイルが読み込まれる必要がある場合のデータファイル。 解凍したファイルは内部のデータセットのディレクトリに保存されます *bigParentディレクトリ* /decompressed/ 。 最近使用されていない非圧縮ファイルは、累積ファイルサイズが&gt;10GBであるときにスペースを解放するために削除されます。 設定で変更できます&lt;decompressedCacheMaxGB&gt; (デフォルト=10) データセット Xml.xml、例えば、
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
また、過去15分で使用されていないファイルの解凍は、各メジャーデータセットのリロード開始時に削除されます。 設定で変更できます&lt;decompressedCacheMaxMinutes古い&gt; (デフォルト=15) データセット Xml.xml、例えば、
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
数値が大きいが、解凍したファイルの累積サイズが原因となる *bigParentディレクトリ* ディスクスペースを外すために、深刻な問題を引き起こします。
     
* ファイルの解凍は時間のかなりの量を取ることができるので (0.1〜10秒) , 圧縮されたファイルを含むデータセットは、データセットの [&lt;nスレッド&gt; (#nthreadsさん) より高い数に設定 (2? 3 4?) お問い合わせ さらなる高数の欠点 (例:5? 6? 7?) ユーザの要求がシステムリソースの割合が高いため、他のユーザの要求の処理を著しく遅くすることができます。 したがって、異なる設定で異なる状況では、理想的なnThreads設定はありません。
         
#### ソートされた寸法値{#sorted-dimension-values} 
各次元の値はソート順にする必要があります (昇降または降下、先頭を除く (一番左端) 終わるべき次元) お問い合わせ 値が不規則にスペース化できます。 どんなことでもできません。 これはの条件です [CFメタデータ規格](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) お問い合わせ 次元の値はソート順でない場合、データセットはロードされず、 ERDDAP™ ログファイルの最初の無ソート値を特定します。 *bigParentディレクトリ* /logs/log.txt ディレクティブ
    
未ソートの寸法は、ほぼ常にソースのデータセットの問題を示しています。 これは、誤名または不適切なファイルが集計に含まれているときに最も一般的に起こります。これは、ソートされていない時間次元につながる。 この問題を解決するには、エラーメッセージを参照してください。 ERDDAP™ log.txt ファイルがオフエンディング時間値を見つけます。 次に、ソースファイルを見て、対応するファイルを見つけます (または 1 つ前後) 集計に所属しない。
    
#### ディレクター{#directories} 
MAY は 1 つのディレクトリ、またはディレクトリとそのサブディレクトリに (再帰的に) お問い合わせ 多数のファイルがある場合 (例:&gt;1,000) 、オペレーティング システム (こうして EDDGrid ファイルから) サブディレクトリの一連のファイルを保存すると、より効率的に動作します (1 年 1 回、または 1 ヶ月あたりのデータセットに非常に頻繁なファイル) , 与えられたディレクトリに膨大な数のファイルが存在しないので.
     
#### &lt;キャッシュFromUrl&gt;{#cachefromurl} 
すべて EDDGrid FromFiles と EDDTableFromFiles のデータセットは、タグのセットをサポート ERDDAP™ リモート・データセットの全てのファイルのコピーをダウンロードし、維持するため、またはいくつかのファイルのキャッシュ (必要に応じてダウンロード) お問い合わせ 大変便利です。 詳細はこちら [キャッシュ FromUrl ドキュメント](#cachefromurl) お問い合わせ
    
#### リモートディレクトリとHTTPレンジリクエスト{#remote-directories-and-http-range-requests} 
 (AKA バイト サービング, バイト レンジ リクエスト, 受け入れ 範囲 http ヘッダー)   
 EDDGrid FromNcFiles、EDDTableFromMultidimNcFiles、EDDTableFromNcFiles、EDDTableFromNcCFFiles、缶 *時々* からのデータを提供 .nc リモートサーバ上のファイルと、サーバーがサポートしている場合はHTTP経由でアクセス [バイテ サービング](https://en.wikipedia.org/wiki/Byte_serving) HTTP レンジリクエスト (バイトサービングの HTTP メカニズム) お問い合わせ これはnetcdf-javaで可能 (お問い合わせ ERDDAP™ 使用して読む .nc ファイル) リモートからの読み取りデータをサポート .nc HTTP レンジリクエストによるファイル。

 **お問い合わせ** 水平に非効率で遅いです。
代わりに [[] を使用します。&lt;cacheFromUrl&gt; システム (パスワード) お問い合わせ

アクセス ERDDAP™ バイト範囲のリクエストを介してファイルとしてデータセット --
あなたができると与えられた、この周りを反転 (理論的に) データセットを考える ERDDAP™ 巨人として .nc 拡張子を付けてファイル " .nc " ベース OPen へ DAP 指定したデータセットのURL (例:https://myserver.org/erddap/griddap/datasetID.ncまた、サブセットを指定した後に?queryを追加することで) 、netcdf-java を使うことができるかどうか尋ねることは多分適度です、 Ferret その他 NetCDF クライアントソフトウェアでデータを読み込む HTTP レンジリクエストから ERDDAP お問い合わせ 答えは、本当に巨大ではないので、いいえ、「 .nc " ファイル。 これを行う場合は、代わりにこれらのオプションのいずれかを実行します。

* 使用条件(OPeN)DAPクライアントソフトウェアは、が提供するグリッドダップサービスに接続する ERDDAP お問い合わせ つまり、 DAP   (こうして ERDDAP ) 設計されました。 それは非常に有効です。
* または、ソースファイルのダウンロード (ツイート) お問い合わせ "files" システム (またはサブセットファイル .nc お問い合わせ お問い合わせ) コンピュータにnetcdf-javaを使用し、 Ferret その他 NetCDF クライアントソフトウェアを読み込みます (最近の投稿) ローカルファイル (ツイート) お問い合わせ
         
#### キャッシュされたファイル情報{#cached-file-information} 
いつか EDDGrid FromFiles データセットは最初に読み込まれます、 EDDGrid FromFilesは、関連するすべてのファイルから情報を読み込み、テーブルを作成します。 (各ファイルの1列) 各有効なファイルと各 "bad" に関する情報 (異なるまたは無効) ファイル。
* 表もディスクに保存されます。 NetCDF v3の .nc ファイル *bigParentディレクトリ* /データセット/ *last2CharsOfデータセットID* / / / / * datasetID * / ファイル名:
dirテーブル .nc   (ユニークなディレクトリ名のリストを保持する) ,
ファイル テーブル .nc   (有効なファイルの情報ごとにテーブルを保持する) ,
悪いファイル .nc   (悪いファイルの情報ごとにテーブルを保持する) お問い合わせ
* アクセスを高速化するため EDDGrid FromFiles データセット (しかし、より多くのメモリを使用する費用で) [ ] を使うことができます。&lt;fileTableInMemory&gt;true のファイル&lt;/fileTableInMemory&gt;/ファイルTableInMemory&gt; (#ファイルテーブルインメモリー) お問い合わせ ERDDAP™ メモリ内のファイル情報テーブルのコピーを保持する。
* ディスク上のファイル情報テーブルのコピーも便利です ERDDAP™ シャットダウンして再起動: 保存 EDDGrid FromFiles は、すべてのデータファイルを再読み込みする必要がありました。
* データセットをリロードすると、 ERDDAP™ 変更した新しいファイルやファイルでデータを読む必要があります。
* ファイルが他のファイルから異なる構造を持っている場合 (例えば、変数の1つに対して異なるデータ型、または " [ユニット](#units) 属性) , ERDDAP "bad" ファイルの一覧にファイルを追加します。 ファイルの問題に関する情報は、 *bigParentディレクトリ* /logs/log.txt ファイル
* これらのファイルを削除または使用する必要はありません。 1つの例外は、データセットの変更をまだ作成している場合 datasets.xml セットアップ, これらのファイルを強制的に削除したい場合 ERDDAP™ ファイルの読み込み/解釈が異なるため、すべてのファイルを再読み込みします。 これらのファイルを削除する必要が生じた場合は、 ERDDAP™ 実行中です。 (すると、 [ログイン](/docs/server-admin/additional-information#set-dataset-flag) データセットASAPを再ロードします。) しかし、 ERDDAP™ 通常、その通知 datasets.xml 情報はファイルと一致しません 表情報とファイルテーブルを自動的に削除します。
* 奨励したい方 ERDDAP™ 保存したデータセット情報を更新する (例えば、データセットのデータディレクトリにファイルを追加、削除、または変更した場合) 、使用して下さい [フラグシステム](/docs/server-admin/additional-information#flag) 強制する ERDDAP™ キャッシュされたファイル情報を更新します。
         
#### リクエストの処理{#handling-requests} 
クライアントのデータを要求する場合、 EDDGrid FromFiles は、どのファイルが要求されたデータを持っているかを確認するために、有効なファイル情報でテーブルをすばやく見ることができます。
     
#### キャッシュされたファイル情報の更新{#updating-the-cached-file-information} 
データセットがリロードされると、キャッシュされたファイルが更新されます。
    
* データセットは、決定どおりに定期的にリロードされます&lt;reloadEveryNMinutes&gt; データセットの情報 datasets.xml お問い合わせ
* データセットは、可能な限り迅速にリロードされます ERDDAP™ 追加した検出、削除、 [お問い合わせ](https://en.wikipedia.org/wiki/Touch_(Unix) ) ) (ファイルの最後に変更する 変更された時間) データファイルの変更
* データセットは、ご使用の際にはできるだけ早くリロードされます。 [フラグシステム](/docs/server-admin/additional-information#flag) お問い合わせ

データセットをリロードすると、 ERDDAP™ 現在利用可能なファイルとキャッシュされたファイル情報テーブルを比較します。 有効なファイルテーブルに新しいファイルが読み込まれ、追加されます。 有効なファイル表から、存在しないファイルが削除されます。 ファイルのタイムスタンプが変更されたファイルが読み込まれ、その情報は更新されます。 新しいテーブルは、メモリとディスク上の古いテーブルを置き換えます。
     
#### 悪いファイル{#bad-files} 
悪いファイルの表とファイルが悪いと宣言された理由 (破損したファイル、不足している変数など) メールでのお問い合わせ お問い合わせ メールアドレス (おそらくあなた) データセットが再ロードされるたびに。 これらのファイルをできるだけ早く交換または修理する必要があります。
     
#### 変数の欠損{#missing-variables} 
ファイルがいくつかある場合 dataVariable データセットで定義される s datasets.xml チャンク、それは大丈夫です。 いつか EDDGrid FromFiles はこれらのファイルのうちの 1 つを読み込み、ファイルが変数を持っていたかどうか、すべての欠落した値で動作します。
     
#### FTPのトラブル/アドバイス{#ftp-troubleadvice} 
FTP の新しいデータファイルを FTP に更新する場合 ERDDAP™ サーバ間 ERDDAP™ 走るチャンスがあり、 ERDDAP™ FTP プロセス中にデータセットを再読み込みします。 思った以上に頻繁に起こります&#33; ファイルが起こると、ファイルが有効になります (有効な名前があります) ファイルがまだ有効ではありません。 お問い合わせ ERDDAP™ その無効なファイルからデータを読み込み、結果のエラーは、ファイルが無効なファイルの表に追加される原因となります。 これは良いではありません。 この問題を回避するには、FTP ファイルの拡張子が ABC2005 の場合は一時ファイル名を使用します。 .nc \\_TEMP 。それから、fileNameRegexテスト (詳しくはこちら) これは関連するファイルではないことを示します。 FTP プロセスが完了したら、ファイルを正しい名前に変更します。 renaming プロセスは、ファイルを瞬時に関連づけるようになります。
     
#### "0 ファイル" エラーメッセージ{#0-files-error-message-1} 
実行する [生成データセットXml](#generatedatasetsxml) または [ダスDds](#dasdds) 、またはあなたがロードしようとすると EDDGrid ファイルデータセットから ERDDAP™ 「0ファイル」エラーメッセージが表示され、 ERDDAP™ ディレクトリに 0 の一致するファイルが見つかりました (そのディレクトリに一致するファイルがあると思うとき) : : :
    * ファイルがそのディレクトリにあることを確認してください。
    * ディレクトリ名のスペルを確認してください。
    * fileNameRegex をチェックします。 それは本当に、本当に簡単にregexesで間違いを作ることです。 テストの目的のために、すべてのファイル名に一致すべきregex .\\*を試してください。 (お問い合わせ [regex ドキュメント](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) そして、 [regexチュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) お問い合わせ) 
    * プログラムを実行しているユーザーを確認してください (例:user=tomcat (お問い合わせ) トムキャット/ ERDDAP ) これらのファイルに対する'read'許可が必要です。
    * 一部のオペレーティングシステム (例えば、SELinux) システム設定に応じて、プログラムを実行したユーザーは、ファイルを持つディレクトリに導くディレクトリ全体のチェーンに対する「読み込み」権限を持つ必要があります。
         
####  EDDGrid FromFiles スケルトン ログイン{#eddgridfromfiles-skeleton-xml} 
*    **スケルトンXML** お問い合わせ EDDGrid FromFiles サブクラスは:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*FromAudioFiles から{#eddfromaudiofiles} 
 ** EDDGrid FromAudioFilesから** そして、 **EDDTableFromAudioファイル** ローカルオーディオファイルの収集からデータを集計します。 (初めて登場 ERDDAP™ v1.82.) 違いは、 EDDGrid FromAudioFilesは多次元データセットとしてデータを扱います (通常2次元と: \\[ ファイルの開始 タイムタイム \\] そして、 \\[ エラー ファイル内の時間 \\] ) , EDDTableFromAudioFiles は、データを表形式のデータとして扱います (通常は、ファイルstartTime、ファイルとelapsedTime、およびオーディオチャンネルからのデータのための列で) お問い合わせ EDDGrid FromAudioFiles では、全てのファイルが同じ数のサンプルを持っていることが必要です。そうでなければ、EDDTableFromAudioFiles を使用する必要があります。 それ以外の場合は、EDDタイプを使用する選択肢は完全にあなたの選択です。 EDDTableFromAudioFiles の1つの利点: 他の情報と他の変数を加えることができます、例えば、 stationID , stationType. どちらの場合も、統一された時間変数の欠如は、これらのEDDタイプからデータを扱うのがより困難になりますが、統一された時間変数を設定するための良い方法はありません。

これらのクラスのスーパークラスを参照してください。 [ EDDGrid ファイルから](#eddgridfromfiles) そして、 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかに関する一般的な情報。

強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 音声ファイルは、音声データのエンコーディングに関連する情報以外のメタデータがないため、出力をGenerateDatasetから編集する必要があります。 必須情報を提供するXml (例、タイトル、要約、 creator\\_name , 機関, 歴史) お問い合わせ

詳細:

* 多数のオーディオファイル形式があります。 現在、 ERDDAP™ ほとんどの .wav と .au ファイルからデータを読み込みます。 現在、他の種類のオーディオファイル、例えば、.aiff や .mp3 は読みません。 .wav と .au の他のオーディオファイル形式やその他の variant のサポートが必要な場合は、リクエストを Chris にメールでお問い合わせください。 noaaa.gov のジョン。 または、今すぐ使用できる回避策として、オーディオファイルをPCM\\_に変換できます。 お問い合わせ (整数データ) または PCM\\_FLOAT (浮動小数点データ) .wavファイルなので、 ERDDAP™ 一緒に働くことができます。
* 現在、 ERDDAP™ オーディオファイルを何で読むことができます Java PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW, ULAWエンコーディング. ERDDAP™ PCM\\_UNSIGNED値を変換 (例: 0 から 255) 署名された値に (例: -128 から 128) データ値のビットをリアランシングすることで ERDDAP™ ALAWとULAWをネイティブエンコードバイト形式からショートに変換 (インサート16) 値。 お問い合わせ Java bigEndian=true データを望む, ERDDAP™ bigEndian=false で保存されたデータのバイトを並べ替える (小さな肥満) 値を正しく読み込むために。 他のすべてのエンコーディングのために (PCMの) , ERDDAP™ データをそのまま読み込みます。
* いつか ERDDAP™ オーディオファイルからデータを読み込み、ファイルの利用可能なオーディオメタデータをグローバル属性に変換します。 これはいつも含まれます (示されるサンプル値を使って) 
    
文字列 audioBigEndian "false"; //true または false
int オーディオ チャネル 1;
文字列 AudioEncoding "PCM\\_SIGNED";
float AudioFrameRate 96000.0; ///秒
int AudioFrameSize 2; //フレームごとのデータバイトの#
float AudioSampleRate 96000.0; ///秒
int オーディオSampleSizeInBits 16; //サンプルごとのチャネルごとのビット数
    
お問い合わせ ERDDAP 's の目的は、フレームは標本と同義語です。これは一度に 1 つのポイントのデータです。
内の属性 ERDDAP™ ソースファイルにあったようにデータを記述する情報があります。 ERDDAP™ PCM\\_UNSIGNED、ALAW、およびULAWエンコードされたデータをPCM\\_SIGNEDに変換し、 bigEndian=falseデータが bigEndian=trueデータに変換されます。 (これは、 Java 読みたい) お問い合わせ エンドでは、データ値が ERDDAP™ 常にある [PCMエンコード](https://en.wikipedia.org/wiki/Pulse-code_modulation) データ値 (i.e.、音波の簡単なデジタル化サンプル) お問い合わせ
* いつか ERDDAP™ オーディオファイルからデータを読み込み、ファイル全体を読み込みます。 ERDDAP™ チャネルごとの約2億のサンプルを同時に読むことができます。 たとえば、サンプルレートが毎秒44,100サンプルの場合、2億サンプルは1ファイルあたり約756分のデータに変換されます。 この量以上のデータを持つオーディオファイルがある場合、ファイルをより小さいチャンクに分割する必要があります。 ERDDAP™ 読むことができます。
* なので ERDDAP™ オーディオファイル全体を読み込み、 ERDDAP™ 大量のオーディオファイルを扱うメモリにアクセスする必要があります。 お問い合わせ [ ERDDAP 's メモリ設定](/docs/server-admin/deploy-install#memory) お問い合わせ 繰り返しますが、これが問題の場合、今使用できる回避策は、ファイルをより小さなチャンクに分割することです。 ERDDAP™ メモリを少なくして読むことができます。
* 一部のオーディオファイルは誤って書かれていました。 ERDDAP™ そのようなケースに対処するための小さな努力をします。 しかし、一般的には、エラーがある場合、 ERDDAP™ 例外をスローする (ファイルを拒否する) または (エラーが検出できない場合) データの読み込み (しかし、データが間違っている) お問い合わせ
*    ERDDAP™ 音の音量の確認や変更は行いません。 理想的には、データ型の範囲全体を使用できる整数のオーディオデータがスケールアップされています。
* 可聴周波ファイルおよび可聴周波プレーヤーに不足している価値のためのシステムがありません (例:-999 または Float.NaN) お問い合わせ そのため、音声データは、欠落した値がないはずです。 不足している値がある場合 (例えば、オーディオファイルを長くなる必要がある場合) 、完全な沈黙として解釈される0のシリーズを使用して下さい。
* いつか ERDDAP™ オーディオファイルからデータを読み込み、常に消去された列を作成します。 各サンプルの時間、秒の時間 (二重として貯えられる) 、最初のサンプルに相対的 (elapse が割り当てられている 時間=0.0 s) お問い合わせ と EDDGrid FromAudioFiles は elapsedTime 軸変数になります。
*    EDDGrid FromAudioFilesでは、すべてのファイルが同じ数のサンプルを持っていることが必要です。 そうでなければ、EDDTableFromAudioFiles を使う必要があります。
* お問い合わせ EDDGrid FromAudioFilesでは、設定したことをお勧めしています。&lt;次元価値記憶&gt; (#次元値インメモリー) 虚偽の場合 (GenerateDatasets で推奨される Xmlの) , 時間の次元は、多くの場合、値の膨大な数を持っているので.
* お問い合わせ EDDGrid FromAudioFiles は、いつもほとんど使用しなくてはなりません。 EDDGrid FromFilesシステム [集約による ファイル名](#aggregation-via-file-names-or-global-metadata) 、録音の開始日を抽出することによってほとんど常に ファイル名からの時刻 例えば、
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
生成データセット Xmlはこれを奨励し、これを支援します。
* EDDTableAudioFiles では、 EDDTableFromFiles システムを ほぼ常に使う必要があります。 [\\*\\*\\*fileName 擬似 sourceName ツイート](#filename-sourcenames) ファイル名から情報を抽出する (ほぼ常に開始日 録画時間) データの列となるよう推進します。 例えば、
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
時刻形式は、単位属性として指定する必要があります。&lt;att name="units"&gt;yyyMMdd'\\_'Hmmss&lt;/att&gt;
     
###  EDDGrid FromMergeIRFilesから{#eddgridfrommergeirfiles} 
 [ ** EDDGrid FromMergeIRFilesから** ](#eddgridfrommergeirfiles) ローカルからデータを集計し、 [マージIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) ファイルから、 [熱帯雨林測定ミッション (ログイン) ](https://trmm.gsfc.nasa.gov) NASAと日本航空宇宙研究開発機構の共同ミッションである。 (ジャクサ) お問い合わせ マージ IRファイルからダウンロードできます。 [NASAとは](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/) お問い合わせ

 EDDGrid FromMergeIRFiles.java が書かれ、貢献しました ERDDAP™ R.Tech EngineeringのJonathan LafiteとPhilippe Makowskiによるプロジェクト (ライセンス: オープンソース) お問い合わせ

 EDDGrid FromMergeIRFilesは少し変わった:

*    EDDGrid FromMergeIRFilesは、同じデータセットで、圧縮または非圧縮のソースデータファイルをサポートしています。 これにより、たとえば、アクセスがほとんどない古いファイルを圧縮することができますが、アクセス頻度の高い新しいファイルを圧縮することができます。 または、元の圧縮の種類を変更できます。 たとえば、Z は .gz お問い合わせ
* 同じディレクトリに同じデータファイルの圧縮および非圧縮バージョンがある場合、必ず確認してください&lt;dataset の fileNameRegex&gt; は、一致するファイル名と一致したくないファイル名と一致させるファイル名に一致します。
* 未圧縮のソースデータファイルにはファイル拡張子がない (ファイル名に "" がない) お問い合わせ
* 圧縮されたソースのデータファイルがファイル拡張子を持っている必要がありますが、 ERDDAP™ ファイルの拡張子を調べることではなく、ファイルの内容を調べて圧縮の種類を決定します。 (例えば ".Z") お問い合わせ 対応する圧縮タイプには「gz」「bzip2」「xz」「lzma」「snappy-raw」「snappy-framed」「pack200」「z」が含まれます。 いつか ERDDAP™ 圧縮されたファイルを読み込み、一時ファイルへの書き込みなしで、オンザフライを分解します。
* すべてのソースデータファイルは、元のファイル命名システムを使用する必要があります:すなわち、merg\\_ *YYYYMMDDHHHの特長* \\_4kmピクセル (どこまでも *YYYYMMDDHHHの特長* ファイルがデータに関連付けられている時間を示します) , ファイルが圧縮されている場合は、ファイル拡張子をプラスします。

このクラスのスーパークラスを参照してください。 [ EDDGrid ファイルから](#eddgridfromfiles) 、このクラスがどのように機能するか、どのように使うかに関する一般的な情報。

強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
 
###  EDDGrid からNcFiles{#eddgridfromncfiles} 
 [ ** EDDGrid からNcFiles** ](#eddgridfromncfiles) ローカル、グリッド、 [GRIB .grb と .grb2](https://en.wikipedia.org/wiki/GRIB) ファイル, [ HDF   (v4 または v5)   .hdf ](https://www.hdfgroup.org/) ファイル, [ .nc ミリリットル](#ncml-files) ファイル, [ NetCDF   (v3 または v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) ファイル、および [ザラー](https://github.com/zarr-developers/zarr-python) ファイル (バージョン 2.25 の) お問い合わせ Zarrファイルには少し異なる動作があり、fileNameRegex または pathRegex のいずれかで "zarr" を含める必要があります。

新着情報 ERDDAP™ バージョン 2.29.0 は、すべての軸変数をサポートしないデータ変数の実験的サポートです。 (または、同じデータセットで1Dと2Dデータを呼び出すように) お問い合わせ GitHub にご連絡ください。 (ディスカッションや問題) フィードバックとバグ。

これは他のファイルタイプで動作する可能性があります (例えば、BUFR) 、私達はちょうどそれをテストしませんでした --サンプル ファイルを送って下さい。

* GRIBファイルの場合、 ERDDAP™ .gbx のインデックスファイルは、各 GRIB ファイルを読み込みはじめて作成します。 そのため、GRIB ファイルは、Tomcat が read+write 権限を持っている "user" ディレクトリにある必要があります。
* このクラスのスーパークラスを参照してください。 [ EDDGrid ファイルから](#eddgridfromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。
* まずは ERDDAP™ v2.12, EDDGrid FromNcFilesと EDDGrid からNcFiles 未梱包で「構造」からデータを読み込むことができます .nc 4と4 .hdf 4ファイル。 構造からある変数を識別するため、&lt; sourceName ツイート フォーマットを使用する必要があります。 *フル構造名称*  |  *会員名* 、例えばgroup1/myStruct | メンバー
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
    
#### グリッドNcファイル内のグループ{#groups-in-gridded-nc-files} 
     [Netcdf4 ファイルはグループを含むことができます。](#groups-in-gridded-nc-files)   ERDDAP™ 変数からデータセットを1つのグループとすべての親グループで行います。 GenerateDataset で特定のグループ名を指定できます。 Xmlの (スラッシュを省略) , または GenerateDataset を持つ "" を使用する ほとんどの寸法を使用する変数のXml検索のすべてのグループ、または " \\[ ログイン \\] "GenerateDatasets を root グループで変数を探します。
    
質問に答えた後、GenerateDatasetsXml がこのタイプのデータセットで最初に行うことは、サンプルファイルの ncdump のような構造を印刷します。 そのため、GenerateDatasets で最初のループに対して、いくつかのgoofy 回答を入力すると Xmlは、少なくともあなたは、あなたが見ることができるかどうか ERDDAP™ ファイルが読み込まれ、どの寸法と変数がファイルにあるかを見ることができます。 それから、GenerateDatasetsXml を通して 2 番目のループに対してより良い答えを与えることができます。
    

###  EDDGrid FromNcFiles解凍{#eddgridfromncfilesunpacked} 
 [ ** EDDGrid FromNcFiles解凍** ](#eddgridfromncfilesunpacked) バリアントとは [ EDDGrid からNcFiles](#eddgridfromncfiles) ローカルからデータを集約する、グリッド化 NetCDF   (v3 または v4)   .nc 関連するファイル。 違いは、このクラスが各データファイルを前に解凍するということです。 EDDGrid FromFiles はファイルを見る:

* 詰め込まれる変数を解凍します [ scale\\_factor および/または add\\_offset ](#scale_factor) お問い合わせ
* \\_FillValue を変換し、 missing\\_value NaN の値 (or MAX\\_VALUE 整数データ型) お問い合わせ
* 時間とタイムスタンプ値を変換する "seconds since 1970-01-01T00:00:00Z" お問い合わせ

このクラスの大きな利点は、さまざまな値に対処する方法を提供するということです scale\\_factor , add\\_offset , \\_FillValue, missing\\_value 、またはコレクション内の異なるソースファイル内の時間単位。 それ以外の場合は、このようなツールを使用する必要があります [ログイン](#ncml-files) または [ NCO ](#netcdf-operators-nco) ファイルが処理できるように、各ファイルを変更して差分を削除 EDDGrid からNcFiles. このクラスでは、関連する属性の CF 規格に従う必要があります。

* 作ってみると EDDGrid からNcFiles 以前に試したファイルと使用できなかったファイルのグループから解凍 EDDGrid FromNcFiles、CDから
     *bigParentディレクトリ* /データセット/ *last2レター* / / / / * datasetID * / / / /
どこまでも *last2レター* 最後の2文字は datasetID ,
ディレクトリ内の全てのファイルを削除します。
* まずは ERDDAP™ v2.12, EDDGrid FromNcFilesと EDDGrid からNcFiles 未梱包で「構造」からデータを読み込むことができます .nc 4と4 .hdf 4ファイル。 構造からある変数を識別するため、&lt; sourceName ツイート フォーマットを使用する必要があります。 *フル構造名称*  |  *会員名* 、例えばgroup1/myStruct | メンバー
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
    
Netcdf4 ファイルはグループを含むことができます。 お問い合わせ [このドキュメント](#groups-in-gridded-nc-files) お問い合わせ
    
質問に答えた後、GenerateDatasetsXml がこのタイプのデータセットで行う最初のことは、サンプルファイルの ncdump のような構造を印刷します **前へ** 未梱包です。 そのため、GenerateDatasets で最初のループに対して、いくつかのgoofy 回答を入力すると Xmlは、少なくともあなたは、あなたが見ることができるかどうか ERDDAP™ ファイルが読み込まれ、どの寸法と変数がファイルにあるかを見ることができます。 それから、GenerateDatasetsXml を通して 2 番目のループに対してより良い答えを与えることができます。
    
###  EDDGrid ロンPM180{#eddgridlonpm180} 
 [ ** EDDGrid ロンPM180** ](#eddgridlonpm180) 子供の経度値を変更 (ツイート)   EDDGrid 経度値が180を超えるデータセット (例えば、0から360) 彼らが範囲にいるように -180 から 180 (Longitude Plus または Minus 180 以降の名前) お問い合わせ

* このようにして、縦度値が180以上あるデータセットを作る方法を提供します。 OGC サービス (例えば WMS サーバ ERDDAP ) 、すべての以来 OGC サービスは -180 から 180 までの経度値を必要とします。
* 不連続性に近い作業は問題を引き起こします。, 不連続性が経度0または経度180であるかどうかに関係なく. このデータセットタイプでは、同じデータセットの2つのバージョンを提供することで、すべての人に対する問題を回避できます。
範囲 0 から 360 までの経度値を持つ 1 (「パシデント」とは?) ,
範囲の経度値の1 -180から180 (「アトランティセントリック」とは?) お問い合わせ
* すべての経度値が 180 を超える子データセットの場合、新しい経度値はすべて 360 度以下です。 たとえば、180から240の経度値を持つデータセットは、-180から-120の経度値を持つデータセットになります。
* 全世界の経度値を持つ子データセットの場合 (約0～360度) 、新しい経度の価値はあるために整理されます (ふりがな) -180から180:
元の 0 から 180 までは変更されません。
元の 180 から 360 の値が -180 から 0 に変換され、経度配列の先頭にシフトされます。
* 180に及ぶが、地球を覆わない子データセットの場合、 ERDDAP™ 地球を覆うデータセットを作るために必要な値が欠落しています。 たとえば、140から200までの経度値を持つ子データセットは、-180から180の経度値を持つデータセットになります。
180〜200の子の値が-180〜160になります。
-160 から 140 までの経度値が新たに追加されます。 対応するデータ値が \\_FillValues になります。
140～180までのお子様の値は変更されません。
欠損値の差し込みは奇妙に見えるかもしれませんが、突然ジャンプする経度値を持つことから生じるいくつかの問題を避ける (例:-160から140まで) お問い合わせ
* インスタグラム [生成データセットXml](#generatedatasetsxml) 特別な「データセットタイプ」があります。 EDDGrid LonPM180FromErddapCatalog で生成します。 datasets.xml お問い合わせ EDDGrid 各々のLonPM180データセット EDDGrid データセット ERDDAP 任意の経度値が180以上の値を持っている。 これにより、これらのデータセットの2つのバージョンが提供されます。
元の、範囲0から360までの経度値を持つ、
および新しいデータセットは、-180 から 180 の範囲の経度値を持ちます。
    
各子のデータセット EDDGrid LonPM180 データセットは EDDGrid 元のデータセットにポイントする FromErddap データセット。
新しいデータセットの datasetID 元のデータセット名と「\\_LonPM180」になります。
例えば、
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
置く EDDGrid LonPM180 データセット **お問い合わせ** 元のデータセット datasets.xml お問い合わせ いくつかの問題を回避する。
    
代わりに、あなたは交換することができます EDDGrid FromErddap の子データセットと元のデータセット datasets.xml お問い合わせ 次に、データセットの1つのバージョンしかありません。-180から180までの経度値を持つもの。 データセットの各バージョンがより便利である時があるため、これを開示します。
    
* たとえば、データセットの2つのバージョンを提供する場合、経度0〜360と経度180〜180で1つ:
    * オプションを使うことができます [&lt;アクセス ヴィクトリア WMS &gt;偽物&lt;アクセス可能 ヴィクトリア WMS &gt;&gt; (#アクセス可能) 0-360データセットで強制的に無効化 WMS データセットのサービス 次に、データセットのLonPM180バージョンのみがアクセス可能です。 WMS お問い合わせ
    * LonPM180 のデータセットを最新の状態に保つ方法がいくつかあります。
        * 子のデータセットが EDDGrid 同じデータセットを参照する FromErddap データセット ERDDAP™ LonPM180 データセットは、常に最新のデータセットを直接購読しようとします。 直接サブスクリプションは、サブスクリプションの検証を要求するメールを生成しません - バリデーションは自動的に行われるべきです。
        * 子のデータセットがない場合 EDDGrid FromErddap と同じデータセット ERDDAP™ , LonPM180 データセットは、定期的なサブスクリプションシステムを使用して、基本的なデータセットを購読します。 サブスクリプションシステムをお持ちの場合 ERDDAP™ オンにすると、サブスクリプションの検証を求めるメールが届きます。 お問い合わせ
        * サブスクリプションシステムをお持ちの場合 ERDDAP™ LonPM180 データセットが再ロードされるまで、LonPM180 のデータセットはメタデータが消去されることがあります。 そのため、サブスクリプションシステムがオフになっている場合は、[&lt;リロード 毎分&gt; (#reloadeveryn分) LonPM180 のデータセットを小数に設定することで、子のデータセットの変更を早くキャッチする可能性が高まります。

* 縦度の最大 &gt; 360 のデータセットの場合、次のオプション設定を使用して、最大値を設定し、データセットは -180 から 180 に補正されます。
```
    <maxSourceLon>540</maxSourceLon>
```

####  EDDGrid LonPM180 スケルトン ログイン{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid ロン0360{#eddgridlon0360} 
 [ ** EDDGrid ロン0360** ](#eddgridlon0360) 子供の経度値を変更 (ツイート)   EDDGrid 経度値が0未満であるデータセット (例えば -180 から 180) 範囲 0 から 360 (名前のゆえ) お問い合わせ

* 不連続性に近い作業は問題を引き起こします。, 不連続性が経度0または経度180であるかどうかに関係なく. このデータセットタイプでは、同じデータセットの2つのバージョンを提供することで、すべての人に対する問題を回避できます。
範囲の経度値の1 -180から180 (「アトランティセントリック」とは?) お問い合わせ
範囲 0 から 360 までの経度値を持つ 1 (「パシデント」とは?) ,
* すべての経度値が0未満の子データセットの場合、新しい経度値はすべて360度以上です。 たとえば、-180 から -120 までの経度値を持つデータセットは、180 から 240 の経度値を持つデータセットになります。
* 全世界の経度値を持つ子データセットの場合 (約180～180) 、新しい経度の価値はあるために整理されます (ふりがな) 0から360まで:
元の -180 から 0 の値は 180 から 360 に変換され、経度配列の最後にシフトされます。
元の 0 から 180 までは変更されません。
* lon=0 に及ぶが、地球を覆わない子のデータセットのために、 ERDDAP™ 地球を覆うデータセットを作るために必要な値が欠落しています。 例えば、-40〜20の経度値を持つ子データセットは0〜360の経度値を持つデータセットになります。
0～20の子の値が変更されません。
20～320までの経度値が新たに追加されます。 対応するデータ値が \\_FillValues になります。
-40〜0の子の値が320〜360になります。
欠損値の差し込みは奇妙に見えるかもしれませんが、突然ジャンプする経度値を持つことから生じるいくつかの問題を避ける (例:20～320) お問い合わせ
* インスタグラム [生成データセットXml](#generatedatasetsxml) 特別な「データセットタイプ」があります。 EDDGrid Lon0360より ErddapCatalog, それはあなたが生成することを可能にします datasets.xml お問い合わせ EDDGrid 各々のLon0360データセット EDDGrid データセット ERDDAP 任意の経度値が180以上の値を持っている。 これにより、これらのデータセットの2つのバージョンが提供されます。
元の、範囲0から360までの経度値を持つ、
および新しいデータセットは、-180 から 180 の範囲の経度値を持ちます。
    
各子のデータセット EDDGrid Lon0360 データセットは EDDGrid 元のデータセットにポイントする FromErddap データセット。
新しいデータセットの datasetID 元のデータセット名と「\\_Lon0360」となります。
例えば、
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
置く EDDGrid Lon0360 データセット **お問い合わせ** 元のデータセット datasets.xml お問い合わせ いくつかの問題を回避する。
    
代わりに、あなたは交換することができます EDDGrid FromErddap の子データセットと元のデータセット datasets.xml お問い合わせ それから、データセットの1つのバージョンだけがあります。0から360までの経度値を持つもの。 データセットの各バージョンがより便利である時があるため、これを開示します。
    
* たとえば、データセットの2つのバージョンを提供する場合、経度0〜360と経度180〜180で1つ:
    * オプションを使うことができます [&lt;アクセス ヴィクトリア WMS &gt;偽物&lt;アクセス可能 ヴィクトリア WMS &gt;&gt; (#アクセス可能) 0 から 360 のデータセットで強制的に無効に WMS データセットのサービス 次に、データセットの -180 から 180 までのバージョンのみがアクセス可能です。 WMS お問い合わせ
    * Lon0360 のデータセットを最新の状態に保つ方法がいくつかあります。
        * 子のデータセットが EDDGrid 同じデータセットを参照する FromErddap データセット ERDDAP™ , Lon0360 のデータセットは、常に最新のデータセットを直接購読しようとする. 直接サブスクリプションは、サブスクリプションの検証を要求するメールを生成しません - バリデーションは自動的に行われるべきです。
        * 子のデータセットがない場合 EDDGrid FromErddap と同じデータセット ERDDAP™ , Lon0360 データセットは、定期的なサブスクリプションシステムを使用して、根本的なデータセットを購読します。 サブスクリプションシステムをお持ちの場合 ERDDAP™ オンにすると、サブスクリプションの検証を求めるメールが届きます。 お問い合わせ
        * サブスクリプションシステムをお持ちの場合 ERDDAP™ Lon0360 データセットが再ロードされるまで、Lon0360 のデータセットはメタデータが消去されることがあります。 そのため、サブスクリプションシステムがオフになっている場合は、[&lt;リロード 毎分&gt; (#reloadeveryn分) Lon0360 のデータセットを小数に設定することで、子のデータセットの変更を早くキャッチする可能性が高まります。
####  EDDGrid Lon0360 スケルトン ログイン{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid サイドバイサイド{#eddgridsidebyside} 
 [ ** EDDGrid サイドバイサイド** ](#eddgridsidebyside) 2つ以上の集計 EDDGrid データセット (お子様) サイドバイサイド

* 結果のデータセットは、すべての子データセットから変数のすべてを持っています。
* 親データセットとすべての子データセットが異なる datasetID お問い合わせ 家族の名前がまったく同じである場合、データセットはロードできません (集計された軸の値がソートされた順番でないエラーメッセージ) お問い合わせ
* すべての子供は同じソース値を持っている必要があります axisVariable ツイート \\[ 1+ \\]   (例えば、緯度、経度) お問い合わせ テストの精度は、 [MatchAxisNDigits, オーストラリア](#matchaxisndigits) お問い合わせ
* 子どもたちは、異なるソース値を持つことができます axisVariable ツイート \\[ 0 の 0 \\]   (例えば、時間) , しかし、彼らは通常、同じです.
* 親データセットは、すべてを持っているように表示されます axisVariable ツイート \\[ 0 の 0 \\] お子様の全ての子からソースの値。
* 例えば、これにより、ソースデータセットをベクトルの u-component と別のソースデータセットとベクトルの v-component と組み合わせることで、コンバインドされたデータが提供されるようになります。
* この方法で作られた子供は、個人的に保持されます。 それらは別にアクセス可能なデータセットではないです (例えば、クライアントのデータリクエストや [フラグファイル](/docs/server-admin/additional-information#flag) ) お問い合わせ
* 親のグローバルメタデータと設定は、最初の子のグローバルメタデータと設定から来ています。
* 最初の子を作成するときに例外がある場合、親は作成されません。
* 他の子供を作成中に例外がある場合、これは電子メールにEverythingToを送信します (で指定される [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) ) ほかの子供達も一緒。
####  EDDGrid SideBySide スケルトン ログイン{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid AggregateExistingディメンション{#eddgridaggregateexistingdimension} 
 [ ** EDDGrid AggregateExistingディメンション** ](#eddgridaggregateexistingdimension) 2つ以上の集計 EDDGrid それぞれのデータセットは、最初の次元の異なる値が、他の次元の同じ値である。

* 例えば、1つの子のデータセットは366値があるかもしれません (2004年のため) 時間次元と別の子供が 365 値を持っている可能性があります (2005年以降) 時間次元のため。
* 他のすべての寸法の全ての値 (例えば、緯度、経度) お子様全員が同一であること テストの精度は、 [MatchAxisNDigits, オーストラリア](#matchaxisndigits) お問い合わせ
* ソートされた寸法値 - 各次元の値はソート順にする必要があります (昇降または降下) お問い合わせ 値が不規則にスペース化できます。 何もない。 これはの条件です [CFメタデータ規格](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) お問い合わせ 次元の値はソート順でない場合、データセットはロードされず、 ERDDAP™ ログファイルの最初の無ソート値を特定します。 *bigParentディレクトリ* /logs/log.txt ディレクティブ
    
未ソートの寸法は、ほぼ常にソースのデータセットの問題を示しています。 これは、誤名または不適切なファイルが集計に含まれているときに最も一般的に起こります。これは、ソートされていない時間次元につながる。 この問題を解決するには、エラーメッセージを参照してください。 ERDDAP™ log.txt ファイルがオフエンディング時間値を見つけます。 次に、ソースファイルを見て、対応するファイルを見つけます (または 1 つ前後) 集計に所属しない。
    
* 親データセットと子のデータセットはそれぞれ異なる datasetID お問い合わせ 家族の名前がまったく同じである場合、データセットはロードできません (集計された軸の値がソートされた順番でないエラーメッセージ) お問い合わせ
* 現在、子供データセットは必須です EDDGrid FromDap データセットとMUSTは、集計された寸法の最小値を持っています (通常最も古い時間値) お問い合わせ 他のすべての子供はほぼ同じデータセットである必要があります (最初の次元の価値観の違い) そしてちょうどそれらによって指定されます sourceUrl お問い合わせ
* 集計データセットは、最初の子からメタデータを取得します。
* ザ・オブ・ザ・ [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作ることができる datasets.xml お問い合わせ EDDGrid AggregateExistingDimension は、一組のファイルをもとに、 Hyrax または THREDDS サーバー。 たとえば、この入力をプログラムに使用する (URL の "/1988" は、例がより速く実行されます) : : :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
結果を使うことができます&lt; sourceUrl &gt; タグまたは削除し、コメントを解除する&lt; sourceUrl &gt; タグ(データセットが再ロードされるたびに新しいファイルが通知されるように)。
####  EDDGrid AggregateExistingDimension スケルトン ログイン{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid コピー{#eddgridcopy} 
 [ ** EDDGrid コピー** ](#eddgridcopy) ローカルコピーを別のものにし、維持する EDDGrid 's のデータはローカルコピーからデータを提供し、

*    EDDGrid コピー (表データの場合、 [EDDTableコピー](#eddtablecopy) ) 非常に使いやすく、非常に効果的です
     **リモートデータソースからデータを処理する最大の問題の解決:** 
    * リモートデータソースからのデータへのアクセスを遅くすることができます。
        * 遅くなる可能性があるので、 (例えば、サーバの非効率的なタイプ) ,
        * あまりにも多くの要求に圧倒されるので、
        * またはサーバーまたはリモートサーバーが帯域幅制限されているため。
    * リモート・データセットは時々利用できません (様々な理由で) お問い合わせ
    * データを1つのソースに頼ることは、うまくスケールしない (たとえば、多くのユーザーと多く ERDDAP sはそれを利用します) お問い合わせ
         
* 使い方 -- EDDGrid コピーは、データのローカルコピーを自動的に作成し、ローカルコピーからデータを配信することで、これらの問題を解決します。 ERDDAP™ ローカルコピーからデータを非常に迅速に配信できます。 ローカルコピーをすることで、リモートサーバへの負担を軽減します。 ローカルコピーは元のバックアップであり、元の何かが起こる場合に便利です。
    
データセットのローカルコピーを作成することに関する新しいものはありません。 ここが新しいのは、このクラスがそれを作ることです\\*簡単操作\\*作成し、\\*メンテナンス\\*ローカルデータのコピー\\*ジャンル\\*リモートデータソースの種類と\\*メタデータを追加\\*データのコピー中に。
    
* データのチャンク -- EDDGrid コピーは、リモートからデータのチャンクを要求することにより、データのローカルコピーを作成します&lt;データセット&gt; 左端の各値のチャンクがあります (はじめて) 軸変数。 EDDGrid コピーは、軸のリモートデータセットのインデックス番号に依存しません。これらは変更される可能性があります。
    
警告:データのチャンクの大きさが大きい場合 (ツイート 2GBの) 問題を引き起こし、 EDDGrid コピーは使用できません。 (申し訳ありませんが、今後この問題の解決を期待しています。) 
    
*    \\[ 代替手段 EDDGrid コピー -
リモートデータがダウンロード可能なファイルを介して利用可能である場合、Webサービスではなく、使用 [キャッシュ FromUrl オプション EDDGrid ファイルから](#cachefromurl) リモートファイルのローカルコピーを作成し、ローカルファイルからデータを配信します。 \\] 
* ローカルファイル -- データの各チャンクは別々に保存されます NetCDF サブディレクトリ内のファイル *bigParentディレクトリ* /コピー/ * datasetID * / / / / (で指定される [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) ) お問い合わせ 軸値から生成されたファイル名は、ファイル名を安全にするために変更されます。 (たとえば、ハイフンは "x2D" に置換されます。) -- これは実際のデータに影響を与えません。
     
* 新しいデータ お問い合わせ それぞれの時間 EDDGrid コピーはリロードされ、それはリモートを点検します&lt;dataset&gt; はどのチャンクが利用できるかを見るために。 データのチャンクのファイルが既に存在していない場合、チャンクを取得するリクエストはキューに追加されます。 ERDDAP 's TaskThread は、データのチャンクに対するキュードリクエストを 1 つずつ処理します。 タスクThread のアクティビティの統計情報を見ることができます。 [ステータスページ](/docs/server-admin/additional-information#status-page) そして、 [デイリーレポート](/docs/server-admin/additional-information#daily-report) お問い合わせ (はい、 ERDDAP™ 複数のタスクをこのプロセスに割り当てることができますが、リモートデータソースの帯域幅、メモリ、CPU時間、ローカルの多くを使用することができます ERDDAP 's の帯域幅、メモリ、 CPU 時間、どちらも良い考えです。) 
    
注意: はじめて EDDGrid コピーは読み込まれます、 (すべてがうまく行く場合) データのチャンクに対する多くのリクエストは、taskThread のキューに追加されますが、ローカルのデータファイルが作成されていません。 そのため、コンストラクタは失敗しますが、taskThread は引き続きローカルファイルを実行して作成します。 すべてがうまくいくと、taskThread はローカルのデータファイルと次の試みをリロードします。 (～15分) 成功するが、当初はデータ量が限られている。
    
Note: ローカルデータセットにデータが含まれている後、データが表示される ERDDAP リモートデータセットが一時的にまたは永続的にアクセスできない場合は、ローカルデータセットはまだ機能します。
    
警告:リモート・データセットが大きい場合および/またはリモート・サーバーは遅いです (問題ではありませんか?) 完全なローカルコピーを作るのに長い時間かかります。 場合によっては、必要な時間は容認できません。 たとえば、T1 行上の 1 TB のデータを伝送する (0.15 GB/s) 最適な条件下で60日以上かかります。 また、リモートやローカルコンピューターの帯域幅、メモリ、CPU 時間を多く使用しています。 ソリューションは、s/he がデータセットのコピーを作成し、ハードドライブをあなたに郵送できるように、リモートデータの管理者にハードドライブをメールすることです。 そのデータを開始点として使用し、 EDDGrid コピーは、データをそれに追加します。 (つまり、 [AmazonのEC2クラウドサービス](https://aws.amazon.com/importexport/) システムに帯域幅の多くがあるにもかかわらず、問題を処理する。) 
    
警告: 左端に与えられた値がある場合 (はじめて) 軸変数はリモート・データセットから消えます、 EDDGrid コピーはローカルコピーファイルを削除します。 必要に応じて、自分で削除することができます。
    
#### グリッドコピーチェックソース データデータ{#grid-copy-checksourcedata} 
ザ・オブ・ザ・ datasets.xml このデータセットにはオプションのタグを持つことができます
```
    <checkSourceData>true</checkSourceData>  
```
デフォルト値は true です。 false に設定すると、データセットがソースデータセットをチェックして、追加データが利用可能なかどうかを確認します。

#### だけなので{#onlysince} 
教えてください EDDGrid コピーして、ソースデータセットのサブセットのコピーを、ソースデータセット全体ではなく、フォームにタグを追加する&lt;だけなので&gt; *詳しくはこちら バリュー* &lt;/onlySince&gt; データセットの datasets.xml チャンク。 EDDGrid コピーは、最初の次元の値に関連するデータ値のみをダウンロードします。 (通常時間次元) より大きい *詳しくはこちら バリュー* お問い合わせ *詳しくはこちら バリュー* できます:
    * 指定した相対時間 now-  *nユニット* お問い合わせ
例えば、&lt;だけなので&gt; now- 2年分&lt;/onlySince&gt; は、外部次元の値をデータにローカルコピーするだけでデータセットを伝えます (通常時間値) 最後の2年以内 (データセットがリロードされるたびに再評価されると、新しいデータがコピーされると) お問い合わせ 詳細はこちら [ now-  *nユニット* 構文の説明](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) お問い合わせ 最初の次元に時間データがある場合に便利です。
        
         EDDGrid コピーは、データを持っているローカルデータファイルを削除しません。時間が経つにつれて、より古いものになります now-  *nユニット* お問い合わせ 選択したファイルをいつでも削除できます。 もしそうなら、設定したことを強くお勧めします。 [ログイン](/docs/server-admin/additional-information#flag) ファイルを削除して指示します EDDGrid キャッシュされたファイルの一覧を更新するためにコピーします。
        
    * ISO 8601 文字列として指定された時刻の固定点 yyyy-MM-ddTHH:mm:ssZ お問い合わせ
例えば、&lt;2000-01-01T00:00:00Zのみ&lt;/onlySince&gt; は、最初の次元の値が \\&gt;=2000-01T00:00:00Z であるデータのローカルコピーを作成するためにのみデータセットを指示します。 最初の次元に時間データがある場合に便利です。
         
    * 浮動小数点数
例えば、&lt;だけなので&gt;946684800.0&lt;/onlySince&gt; . 単位は最初の次元の行先の単位です。 例えば、時間寸法、単位 ERDDAP™ 常に "seconds since 1970-01-01T00:00:00Z" お問い合わせ だから 946684800.0 "seconds since 1970-01-01T00:00:00Z" 2000-01-01T00:00:00Zと同等です。 これは、常に便利なオプションですが、特に最初の次元が時間データを持っていない場合に役立ちます。

####  EDDGrid コピー 推奨使用{#eddgridcopy-recomended-use} 
1. 作成する&lt;データセット&gt; エントリーフォーム (ネイティブタイプではなく、 EDDGrid コピー) リモートデータソースのため。
     **必要なすべてのメタデータを含む、正しく機能します。** 
2. 遅すぎると、XML コードを追加して、それをラップします。 EDDGrid データセットのコピー
    * 別の使用 datasetID   (おそらく変更によって datasetID 古いもの datasetID わずか) お問い合わせ
    * コピーする&lt;アクセス お問い合わせ&lt;reloadEveryNMinutes&gt; と&lt;リモートからonChange&gt; EDDGrid 'XML から EDDGrid コピーのXML。 (彼らの価値観 EDDGrid コピーの問題;内部のデータセットの値は、関連性になります。) 
3.   ERDDAP™ データのローカルコピーを作成し、維持します。
         
* 警告: EDDGrid コピーは、各チャンクのデータ値が変更されないと仮定します。 もし/when なら、chunk ファイルを手動で削除する必要があります。 *bigParentディレクトリ* /コピー/ * datasetID * / 変更・変更 [ログイン](/docs/server-admin/additional-information#flag) 削除されたチャンクが置換されるようにリロードされるデータセット。 データセットに電子メールサブスクリプションがある場合、データセットが最初にデータをリロードし、データをコピーし始めると、データセットが再びロードしたときに2つのメールが届きます。 (自動的に) 新しいローカルデータファイルを検出します。
     
* すべての軸線値は等しくなければなりません。
左端を除く軸のそれぞれ (はじめて) , すべての値がすべての子供に等しくなければなりません. テストの精度は、 [MatchAxisNDigits, オーストラリア](#matchaxisndigits) お問い合わせ
     
* 設定、メタデータ、変数 -- EDDGrid コピーは、同封されたソースのデータセットから設定、メタデータ、および変数を使用します。
     
* メタデータの変更 お問い合わせ 変更が必要な場合 addAttributes またはソースのデータセットに関連付けられた変数の順序を変更します。
    1. 変更する addAttributes ソースデータセットの datasets.xml 必要に応じて。
    2. コピーしたファイルの1つを削除します。
    3. 設定する [ログイン](/docs/server-admin/additional-information#flag) データセットをすぐにリロードします。 フラグを使うと、データセットに電子メールのサブスクリプションがある場合、データセットが最初にデータをリロードし、データをコピーし始めると、データセットが再び読み込まれるときの2つのメールが届きます。 (自動的に) 新しいローカルデータファイルを検出します。
    4. 削除されたファイルは新しいメタデータで再生されます。 ソースデータセットが利用できなくなったら、 EDDGrid コピーデータセットは、最も若いファイルであるため、再生されたファイルからメタデータを取得します。
####  EDDGrid コピースケルトン ログイン{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromCassandraさん{#eddtablefromcassandra} 
 [ **EDDTableFromCassandraさん** ](#eddtablefromcassandra) データを1つから処理する [カサンドラ](https://cassandra.apache.org/) テーブル。 CassandraはNoSQLデータベースです。

*    ERDDAP™ Cassandra v2 と v3 で動作し、変更や設定の違いはありません。 私達はテストしました [Cassandra v2 と v3 から パスワード](https://cassandra.apache.org/download/) お問い合わせ そうなると ERDDAP™ DataStaxからダウンロードしたCassandraと連携することもできます。
     
* 2019年8月～2021年5月には、Casandra社がAdminOpenJdk社に勤務するトラブルが発生しました。 Java v8. EXCEPTION\\_ACCESS\\_VIOLATION を投げる。 しかし今 (2021年5月) , その問題は消えます: 私達はCassandra v2.1.22を首尾よく使用し、OpenJdk jdk8u292-b10を採用します。
     
#### 1つのテーブル{#one-table} 
Cassandraは、リレーショナルデータベースが行う方法で「joins」をサポートしていません。 ワンポイント ERDDAP™ EDDTableFromCassandra データセットのマップを1つに (おそらく1つのサブセット) カサンドラのテーブル。

#### カサンドラ datasets.xml  {#cassandra-datasetsxml} 
*    ERDDAP™ Cassandraと来ます Java ドライバは別途インストールする必要はありません。
* EDDTableFromCassandra に関するすべてのドキュメントの情報を注意深くお読みください。 詳細の一部は非常に重要です。
* カサンドラ Java ドライバーはApache Cassandraで動作するように意図されています (1.2 以上) DataStaxエンタープライズ (3.1以上) お問い合わせ Apache Cassandra 1.2.x を使用している場合は、各ノードの casssandra.yaml ファイルを編集して start\\_native\\_transport: true を設定し、各ノードを再起動する必要があります。
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます(特に[&lt;パーティション キーソース名&gt; (#partitionkeysourcename の名前) )。 あなたは、Cassandra管理者に連絡し、Webを検索することにより、EDDTableFromCassandraデータセットのためにXMLを作成するために必要な情報のほとんどを収集することができます。
    
生成データセット Xmlには、EDDTableFromCassandra の2つの特別なオプションがあります。
    
    1. 「&#33;&#33;&#33;LIST&#33;&#33;&#33;」に入ったら&#33; (引用なし) キースペースでは、プログラムはキースペースのリストを表示します
    2. 特定のキースペースを入力し、「&#33;&#33;&#33;LIST&#33;&#33;&#33;」を入力すると (引用なし) 表名では、このプログラムは、そのキースペースとその列の表のリストを表示します。
##### ケース感度{#case-sensitivity} 
* ケースインセンティブなキースペースとテーブル名 -
Cassandraは、大文字空間とテーブル名をケースインセンティブな方法で扱います。 そのため、予約済みワードを使わず、 (しかし、異なるケースで) Cassandraのキースペースかテーブルの名前として。
* 症例のカラム名 --
デフォルトでは、Cassandra は、ケースインセンティブな方法でカラム名を扱います。 列名としてCassandraの予約語の1つを使う場合 (お問い合わせ) 、使用しなければならない
```
        <columnNameQuotes>"<columnNameQuotes>  
```
お問い合わせ datasets.xml Cassandra と ERDDAP™ カラム名をケースに敏感な方法で扱います。 これは、列名のケースに敏感なバージョンを決定するのが難しいため、これはおそらくあなたのための大規模な頭痛になります - Cassandraは、ほぼ常に真のケースに関係なく、すべての下段の列名が表示されます。
* キャサンドラ管理者と密接に連携し、関連する経験を持たせます。 データセットがロードに失敗した場合は、 [エラーメッセージ](#troubleshooting-tips) 理由を調べるために慎重に.
         
#### カサンドラ&lt;アクセス プロパティ&gt;{#cassandra-connectionproperty} 
Cassandraには接続プロパティがあり、 datasets.xml お問い合わせ これらの多くはカスサンドラのパフォーマンスに影響を与えます- ERDDAP™ 接続。 残念ながら、Cassandra プロパティはプログラム的に設定する必要があります Java ・・・ ERDDAP™ 各プロパティのコードを持っている必要があります ERDDAP™ サポート 現在、 ERDDAP™ これらのプロパティをサポートしています:
 (表示されるデフォルトは、私たちが見るものです。 システムのデフォルトは異なります。) 

*    **一般的なオプション**   
    &lt;アクセス プロパティ名=" **コンプレッション** ツイート *なし | LZ4の特長 | ログイン* &lt;/接続 プロパティ&gt; (ケースインセンティブ, default=none)   
     (一般的な圧縮のアドバイス:CassandraとCassandraの間の接続と ERDDAP™ 接続がリモート/スローの場合、ローカル/高速で「LZ4」を使用します。)   
    &lt;アクセス プロパティ名=" **インフォメーション** ツイート *ユーザー名/パスワード* &lt;/接続 プロパティ&gt; (それはリテラルだ '/' )   
    &lt;アクセス プロパティ名=" **メトリック** ツイート *ログイン | パスワード* &lt;/接続 プロパティ&gt; (2021-01-25 は default=true で、無視され、常に false)   
    &lt;アクセス プロパティ名=" **ポート** ツイート *ログイン* &lt;/接続 プロパティ&gt; (ネイティブバイナリプロトコルのデフォルト=9042)   
    &lt;アクセス プロパティ名=" **ログイン** ツイート *ログイン | パスワード* &lt;/接続 プロパティ&gt; (デフォルト=false)   
     (ssl が失敗したのを素早く使用しようとしました。 成功したら、どうしたか教えてください。) 
*    **クエリオプション**   
    &lt;アクセス プロパティ名=" **一貫性 レベル** ツイート *すべて | その他 | 各\\_量 | ローカル\\_one | ローカル\\_quorum | ローカル\\_serial | 1 | カリキュラム | シリアル | 3 | 2* &lt;/接続 プロパティ&gt; (ケースインセンティブ, default=ONE)   
    &lt;アクセス プロパティ名=" **フェッチサイズ** ツイート *ログイン* &lt;/接続 プロパティ&gt; (デフォルト=5000)   
     (fetchSize を小さい値に設定しないでください。)   
    &lt;アクセス プロパティ名=" **シリアル一貫性レベル** ツイート *すべて | その他 | 各\\_量 | ローカル\\_one | ローカル\\_quorum | ローカル\\_serial | 1 | カリキュラム | シリアル | 3 | 2* &lt;/接続 プロパティ&gt; (ケース・インセンティブ, default=SERIAL) 
*    **ソケットオプション**   
    &lt;アクセス プロパティ名=" **ConnectTimeoutMillisの使い方** ツイート *ログイン* &lt;/接続 プロパティ&gt; (デフォルト=5000)   
     (接続を設定しない TimeoutMillis は、より小さい値に。)   
    &lt;アクセス プロパティ名=" **keepAliveを保って下さい** ツイート *ログイン | パスワード* &lt;/接続 プロパティ&gt;
    &lt;アクセス プロパティ名=" **読みタイムアウトミリリス** ツイート *ログイン* &lt;/接続 プロパティ&gt;
     (Cassandra のデフォルト readTimeoutMillis は 12000 ですが、 ERDDAP™ デフォルトを120000に変更します。 Cassandra が readTimeouts をスローしている場合、Cassandra がこの時刻の前にそれらを投げる可能性があるため、これを増やすことは役に立ちません。 問題は、パーティションごとにあまりにも多くのデータを格納している可能性が高い 主組合せ。)   
    &lt;アクセス プロパティ名=" **受け取りバッファサイズ** ツイート *ログイン* &lt;/接続 プロパティ&gt;
     (デフォルトの receiveBufferSize が何であるかは不明です。 これを小さな値に設定しないでください。)   
    &lt;アクセス プロパティ名=" **ソリンジャー** ツイート *ログイン* &lt;/接続 プロパティ&gt;
    &lt;アクセス プロパティ名=" **tcpNoDelayの特長** ツイート *ログイン | パスワード* &lt;/接続 プロパティ&gt; (デフォルト=null) 

他の接続プロパティを設定できるようにする必要がある場合は、 [追加サポートを受けるセクション](/docs/intro#support) お問い合わせ

Tomcat の起動時に、ConnectionProperties は、指定した Cassandra URL でデータセットが作成される初めてのみ使用されます。 同じ URL を共有するデータセットとそれ以降のすべてのデータセットのリロードは、元の connectProperties を使用します。
    
#### ログイン{#cql} 
Cassandraのクエリ言語 (ログイン) 従来のデータベースで使われるクエリ言語は SQL のように上等です。 なので OPeNDAP 's の表データリクエストは SQL の表形式のデータリクエストを移行するように設計されていました。 ERDDAP™ CQL Bound/PreparedStatements に表形式のデータリクエストを変換します。 ERDDAP™ ステートメントをログに [ログイン](/docs/server-admin/additional-information#log) として
テキストとしてステートメント: *ステートメントAsText*   
参照するステートメントのバージョンは、ステートメントのテキスト表現であり、制約値が配置される「?」のみになります。
       
それほど単純ではありません。 残念なことに、CQL には、制約のどのタイプとクエリできる列の制限が多々あります。例えば、パーティションキー列は = と IN で制約されるので、 ERDDAP™ Cassandraにいくつかの制約を送信し、Cassandraからデータが受信された後、すべての制約を適用します。 助けるために ERDDAP™ Cassandraで効率的に対処し、指定する必要があります [&lt;パーティション キーソース名&gt; (#partitionkeysourcename の名前) , [ ]&lt;クラスターColumnSourceNames&gt; (#clusterカラム名) と [&lt;インデックスColumnSourceNames&gt; (#インデックスカラム名) お問い合わせ datasets.xml このデータセットの場合。 これらは助ける最も重要な方法です ERDDAP™ Cassandraと効率的に働かせて下さい。 わからない ERDDAP™ この情報は、データセットが痛みを伴う遅くなります ERDDAP™ Cassandraリソースのトンを使用してください。
     
#### &lt;パーティション キーソース名&gt;{#partitionkeysourcenames} 
パーティションキーはカスサンドラのテーブルで中心的な役割を果たしているので、 ERDDAP™ 自分の知る必要がある sourceName s と、関連する場合、それらに対処する方法についての他の情報。
* パーティションキーソース列の名前のコンマ区切りリストを指定する必要があります datasets.xml お問い合わせ&lt;パーティション キーソース名&gt;.
簡単な例、
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
より複雑な例,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStampパーティションキー -- パーティションキー列の1つが、別のタイムスタンプ列のコアザーバージョンを持っているタイムスタンプ列の場合、これを経由して指定します
     *パーティションキーSourcName/otherColumnSourceName/ time\\_precision *   
どこまでも time\\_precision の 1 つ [ time\\_precision ](#time_precision) 他の場所で使われる文字列 ERDDAP お問い合わせ
Zのトレース time\\_precision string はデフォルトです。そのため、デフォルトでは問題ありません。 time\\_precision 文字列は Z で終了します。
例えば、 ERDDAP™ 通訳日時/サンプル時間/1970-01-01 「日付の制約は、サンプルタイムの制約から構築できます。 time\\_precision お問い合わせ 制約の実際の変換は複雑ですが、概観です。
     **関連するときはいつでもこれを使用してください。** それは可能にします ERDDAP™ Cassandraと効率的に働くため。 列間のこの関係がカスサンドラのテーブルに存在しておらず、 ERDDAP™ 、データセットは苦痛に遅いです ERDDAP™ Cassandraリソースのトンを使用してください。
* シングル 値のパーティションキー -- あなたが望むなら ERDDAP™ 1つのパーティションキーの1つの値のみで動作するデータセット *パーティションキーソース名=値* お問い合わせ
たとえば、 deviceid=1007 の数値列の引用符を使用しないでください。
たとえば、ストリング列の引用符を使う。例えば、stationid="Point Pinos"
* データセット デフォルト ソート順 -- パーティションキーの順序&lt; dataVariable &gt;の datasets.xml カスサンドラから結果のデフォルトのソート順を決定します。 もちろん、ユーザーは、追加して結果のセットのために異なるソート注文を要求することができます & orderBy  (ツイート *変数のコンマ区切りリスト* ツイート) クエリの最後に。
* デフォルトでは、Cassandra と ERDDAP™ ケースインセンティブな方法でカラム名を扱います。 しかし、あなたが設定した場合 [columnNameクォート](#case-sensitivity) お問い合わせ ERDDAP™ Cassandraカラム名をケースに敏感な方法で扱います。
         
#### &lt;パーティション キーCSV&gt;{#partitionkeycsv} 
これが指定された場合、 ERDDAP™ パーティションのCassandraを要求する代わりに使用します データセットが再ロードされるたびにキー情報。 これは、使用する順序で、異なるパーティションキーの値のリストを提供します。 1970-01-01T00:00:00Z以降、時刻を秒単位で指定する必要があります。 しかし、時間を指定する2つの特別な代替方法もあります (各エンコードは文字列として) : : :

1) 時間 (アソイ8601 タイムタイム)   (MAY は文字列としてエンコードされます)   
2) 「時間」 (anISO8601StartTime, strideSeconds, 停止時間) ツイート (文字列としてエンコードされる必要があります)   
ストップ 時間はISO8601である場合もあります 時間または " now- nUnitsの時間 (例: " now- 3分) お問い合わせ
ストップ 時間は、開始の正確な一致である必要はありません 時間 + x strideSeconds.
毎回行列 () すべてのクエリの前に、値が複数の行に展開されるので、パーティションのリスト キーは常に最新です。
例えば、
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
パーティションキーの組み合わせのこのテーブルに展開します。
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames&gt ;{#clustercolumnsourcenames} 
Cassandraはクラスターの列のSQLのような制約を受け入れます。これは主キーの第2部を形作るコラムです (仕切りのキーの後で (ツイート) ) お問い合わせ そのため、これらの列を経由して識別することが不可欠です。&lt;クラスターColumnSourceNames&gt;. これにより、 ERDDAP™ Cassandraと効率的に働くため。 クラスターの列がない場合、指示しない ERDDAP 、データセットは苦痛に遅いです ERDDAP™ Cassandraリソースのトンを使用してください。
    * 例えば、&lt;クラスターColumnSourceNames&gt; *myClusterColumn1、myClusterColumn2* &lt;/clusterColumnSourceNames&gt;
    * Cassandraテーブルにクラスター列がない場合、指定しない&lt;clusterColumnSourceNames&gt; または値を指定しない。
    * デフォルトでは、Cassandra と ERDDAP™ ケースインセンティブな方法でカラム名を扱います。 しかし、あなたが設定した場合 [columnNameクォート](#case-sensitivity) お問い合わせ ERDDAP™ ケースに敏感な方法でCassandraカラム名を扱います。
         
#### &lt;indexColumnSourceNames&gt; リソース{#indexcolumnsourcenames} 
Cassandraは受け入れます '=' 二次インデックス列の制約は、明示的にインデックスを作成した列です。
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (はい、括弧が必要です。)   
そのため、これらの列を経由して識別する場合、非常に便利です&lt;インデックスColumnSourceNames&gt;. これにより、 ERDDAP™ Cassandraと効率的に働くため。 インデックスの列がない場合、 ERDDAP , いくつかのクエリは無必要になります, 痛みを伴う遅いで ERDDAP™ Cassandraリソースのトンを使用してください。
* 例えば、&lt;indexColumnSourceNames&gt; ドキュメント *myIndexColumn1、myIndexColumn2* &lt;/indexカラム名
* Cassandraテーブルがインデックスカラムを持たない場合、指定しない&lt;indexColumnSourceNames&gt; または値を指定しない。
* 警告: カサンドラのインデックスはデータベースのインデックスとは異なります。 Cassandraの索引は助けだけに助けます '=' 制約。 彼らだけ [おすすめ](https://cassandra.apache.org/doc/latest/cql/indexes.html) 合計値よりもはるかに異なる値を持つ列の場合。
* デフォルトでは、Cassandra と ERDDAP™ ケースインセンティブな方法でカラム名を扱います。 しかし、あなたが設定した場合 [columnNameクォート](#case-sensitivity) お問い合わせ ERDDAP™ ケースに敏感な方法でCassandraカラム名を扱います。
         
#### &lt;maxRequestFraction&gt;{#maxrequestfraction} 
いつか ERDDAP™   (リリース) データセットをロードします。 ERDDAP™ キャサンドラからパーティションキーの異なる組み合わせのリストを取得します。 巨大なデータセットの場合、組み合わせの数が巨大になります。 ほとんどのデータセットから、ユーザーのリクエストを防止したい場合 (またはリクエストを要求する ERDDAP™ さらにフィルタリングするために、ほとんどのデータまたはすべてのデータをダウンロードするには) 、言うことができます ERDDAP™ 組み合わせの数を減らすリクエストだけを経由して&lt;maxRequestFraction&gt; は 1e-10 間の浮動小数点数です (つまり、リクエストは10億個以上の組み合わせを必要としないということです。) と 1 (デフォルトは、リクエストがデータセット全体にできることを意味します) お問い合わせ
たとえば、データセットがパーティションキーとmaxRequestFractionの10000の異なる組み合わせが0.1に設定されている場合、
1001以上の組み合わせからデータを必要とするリクエストは、エラーメッセージが生成されます。
ただし、1000以上の組み合わせからデータを必要とするリクエストは許可されます。
    
一般的に、データセットが大きいほど、設定した方が低い&lt;maxRequestFraction&gt; ディレクティブ 小さなデータセットでは、中型データセットでは0.1、大きなデータセットでは0.01、巨大なデータセットでは0.0001に設定できます。
    
このアプローチは、完璧なものから遠く離れたものです。 拒否された合理的な要求と、大きすぎる要求が許されていることにつながる。 しかし、それは難しい問題であり、このソリューションは何もないよりもはるかに優れています。
    
#### カサンドラ subsetVariables  {#cassandra-subsetvariables} 
他のEDDTableデータセットと同様に、コンマ区切りリストを指定できます。&lt; dataVariable ツイート destinationName s は " [ subsetVariables ](#subsetvariables) " 限られた数の値を持つ変数を識別します。 dataset は .subset の Web ページを持ち、多くの Web ページでドロップダウン リスト内の変数の異なる値のリストを表示します。
    
リストのパーティションキー変数と静的な列だけを含むことは、STONGLY Eです NCO お問い合わせ Cassandraは、データセットが再ロードされるたびに、素早く簡単に異なる組み合わせのリストを生成できます。 1つの例外は、いくつかの他のタイムスタンプ列の粗いバージョンであるタイムスタンプパーティションキーです - それはおそらくこれらのリストから離れることが最善です subsetVariables たくさんの値があるため、ユーザーにはとても便利です。
    
非パーティションキー、リスト内の非静的変数を含む場合、おそらく **お問い合わせ** データセットが再ロードされるたびにカサンドラのために計算的に高価です。 ERDDAP™ データセットのすべての行を調べて、情報を生成する必要があります。 実際には、クエリは失敗する可能性があります。 そのため、非常に小さなデータセットを除いて、これは正式な説明です。
    
#### Cassandraのデータタイプ{#cassandra-datatypes} 
そこには、その周囲がいくつかありますので [Cassandraのデータ タイプ](https://cassandra.apache.org/doc/latest/cql/types.html) サイトマップ ERDDAP™ データ型は、 [[] を指定する必要があります。&lt;データタイプ&gt; (#データ型) 各タグ [&lt; dataVariable &gt;&gt; (#データ変数) お問い合わせ ERDDAP™ どの dataType を使うか。 標準規格 ERDDAP™ データデータ タイプ (最も一般的なCasandraデータタイプ) は:
    
*    [ログイン](#boolean-data)   (ログイン) , , ERDDAP™ バイトとして保存
* バイト (int、範囲が-128から127の場合) 
* ショート (int、範囲が-32768から32767の場合) 
* ログイン (int、カウンター?、varint?、範囲が-2147483648から2147483647の場合) 
* ロング (bigint, カウンター?, varint?, 範囲が -9223372036854775808 に 9223372036854777) 
* フローティング (フローティング) 
* ダブル (ダブル、小数 (精密の損失の可能性あり) , タイムスタンプ) 
* チャート (ascii や text が 1 文字以上あることがない場合) 
* ストリング (ascii, テキスト, varchar, inet, uuid, timeuuid, blob, マップ, セット, リスト?) 

カサンドラの [タイムスタンプ](#cassandra-timestamp-data) 特別な場合:使用 ERDDAP '2つのデータ タイプ。

文字列 dataType を指定する場合 ERDDAP™ Cassandraのマップ、セット、リスト、マップ、各Cassandra行のセットまたはリストは、単一の行に単一の文字列に変換されます ERDDAP™ テーブル。 ERDDAP™ リストの代替システムがあります。以下を参照してください。

 *タイプ:* リスト -- ERDDAP ? ? ? ?&lt;データタイプ&gt; (#データ型) Cassandraのタグ dataVariable s は規則的な含めることができます ERDDAP™ データデータ タイプ (詳しくはこちら) また、Casandra リストの列に使用できるいくつかの特別な dataTypes: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, DoubleList, charList, StringList. これらのリストの列の1つが結果に渡されるとき ERDDAP™ ソースデータの各行がリストに展開されます。 サイズ: () データの行 ERDDAP ;簡単なデータ タイプ (例えば、int) そのソースデータ行に重複したリストが表示されます。 サイズ: () タイム。 結果に複数のリスト変数が含まれている場合、指定したデータの行のすべてのリストは同じサイズを持ち、 "parallel" リストでなければなりません。 ERDDAP™ エラーメッセージが生成されます。 たとえば、ADCP からの電流測定では、
深さ: \\[ 0 の 0 \\] , uCurrent \\[ 0 の 0 \\] , vCurrent \\[ 0 の 0 \\] と zCurrent \\[ 0 の 0 \\] すべての関連性があり、
深さ: \\[ 1 \\] , uCurrent \\[ 1 \\] , vCurrent \\[ 1 \\] と zCurrent \\[ 1 \\] すべて関連している、...
あるいは、望まないと ERDDAP™ リストを複数の行に展開する ERDDAP™ テーブル、文字列を文字列として指定する dataVariable データ リスト全体が 1 列の 1 つの文字列として表されるので、 ERDDAP お問い合わせ
    
#### Cassandraのタイムスタンプのデータ{#cassandra-timestamp-data} 
Cassandraのタイムスタンプデータは、常にタイムゾーンを認識しています。 タイムゾーンを指定せずにタイムスタンプデータを入力すると、Cassandra はタイムスタンプがローカルタイムゾーンを使用すると仮定します。
    
 ERDDAP™ タイムスタンプデータをサポートし、常にデータを表示します。 Zulu /GMTタイムゾーン そのため、カサンドラのタイムスタンプデータを他のタイムゾーンを使用して入力する場合 Zulu /GMTは、タイムスタンプデータのすべてのクエリを行う必要があることを覚えておいてください ERDDAP™ 利用する Zulu /GMTタイムゾーン から出てくるタイムスタンプ値が出てくると驚くことはありません ERDDAP ローカルからタイムゾーンが切り替えるので、数時間でシフトされます。 Zulu /GMTの時間。

* インスタグラム ERDDAP お問い合わせ datasets.xml , で&lt; dataVariable &gt; timestamp変数のタグ、セット
```
          <dataType>double</dataType>  
```
お問い合わせ&lt; addAttributes &gt; セット
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* 提案: データが時間範囲であれば、タイムスタンプ値がインプライド時間範囲の中央を参照するのに便利です。 (例えば、正午) お問い合わせ たとえば、ユーザーが別のデータセットから2010-03-26T13:00Zのデータを持っている場合、彼らは毎日データを持っているこのCassandraデータセットから最も近いデータが必要な場合は、2010-03-26T12:00Zのデータ (カサンドラのデータを表す日付) 明らかに最高です (夜中夜に反対して、それが最も少ない明らかである場所) お問い合わせ
*    ERDDAP™ ユーティリティを持っている [数値変換 文字列の時間から/までの時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) お問い合わせ
* お問い合わせ [使い方 ERDDAP™ 時間とともにお得な情報](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) お問い合わせ
         
#### 整数null{#integer-nulls} 
CassandraはCassandraのintでnullを支えます ( ERDDAP™ ログイン) と bigint ( ERDDAP™ ロング) 列, しかし ERDDAP™ 任意の整数データ型に対して真の null をサポートしません。
デフォルトでは、Cassandra 整数 null は変換されます。 ERDDAP™ に 2147483647 長い列のための int のコラム、または 9223372036854775807 のため。 これらは、テキスト出力ファイルの一部種類の「NaN」として表示されます。 (例えば、.csv) 他の種類のテキスト出力ファイルの "" (例えば、 .htmlTable ) 、および特定の番号 (2147483647 行方不明値) 他の種類のファイル (例えば、バイナリファイルなど .nc マット) お問い合わせ "NaN", "&windSpeed=NaN" を参照することで、このタイプの欠落値でデータの行を検索できます。
    
他の整数値を使用して、Cassandraテーブルに欠落している値を示す場合は、その値を識別してください。 datasets.xml : : :

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Cassandra の浮動小数点列の場合、null は NaNs に変換されます。 ERDDAP お問い合わせ 文字列に変換されるCassandraのデータタイプ ERDDAP™ , null は空の文字列に変換されます。 問題ではない。
    
#### 「WARNING:既に準備済みのクエリを再準備する」{#warning-re-preparing-already-prepared-query} 
* 「WARNING:既に準備済みのクエリを再準備する」 *トームキャット* /logs/catalina.outの特長 (またはその他の Tomcat ログファイル)   
Cassandraの文書は、同じクエリが準備された状態に2回作成されている場合、問題があることを述べています (以上) お問い合わせ (お問い合わせ [バグ報告](https://datastax-oss.atlassian.net/browse/JAVA-236) お問い合わせ) Cassandraのマッドを作ることを避けるため、 ERDDAP™ すべての PreparedStatements をキャッシュして再利用することができます。 Tomcat/when の場合、そのキャッシュが失われます。 ERDDAP™ 再起動しますが、準備された状態が与えられたセッションに関連付けられているので大丈夫だと思う (間の距離 Java カサンドラ) 、それはまた失われます。 これらのメッセージが表示されます。 私は他のソリューションを知らない。 幸いに、それは警告です、エラーではありません (カスサンドラは、それがパフォーマンスの問題につながるかもしれないことを脅かすが) お問い合わせ
    
準備された状態が永遠に良いであるCassandraの要求、従って ERDDAP 's キャッシュされた PreparedStatements は、最新/無効な状態になるべきではありません。 そうでなければ、特定の PreparedStatements が古い/無効になっていることについてのエラーが出た場合、再起動する必要があります ERDDAP™ クリアする ERDDAP preparedStatements のキャッシュ。
    
#### Cassandraの保証{#cassandra-security} 
お問い合わせ [カサンドラの確保](https://cassandra.apache.org/doc/latest/operating/security.html) 

Cassandraと連携するときは、悪意のあるユーザーがあなたのCassandraを損傷したり、アクセスしていないデータへのアクセスを得ることを可能にすることを避けるために、安全かつ確実に物事を行う必要があります。 ERDDAP™ 安全な方法で物事をしようとします。

* セットアップをお待ちください。 ERDDAP™ CassandraユーザーとしてCassandraにのみアクセスできる **関連記事** テーブル (ツイート) READ 権限のみを持っています。
* 接続の設定をおすすめします。 ERDDAP™ カサンドラへ
    * 常に SSL を使用しています。
    * 1つのIPアドレスからの接続を可能にするだけ (またはアドレスのブロック) ひとつから ERDDAP™ ユーザー、および
    * MD5ハッシュフォームのパスワードのみを転送します。
*    \\[ ノウェン・プロブレム \\] 接続プロパティ (パスワードを含む&#33;) プレーンテキストとして保存されます。 datasets.xml お問い合わせ 管理者がCassandraパスワードを入力する方法が見つからなかった ERDDAP Tomcatのスタートアップ (ユーザーの入力なしで起こるか) なので、パスワードはファイルでアクセス可能でなければなりません。 これをより安全にするために:
    * お問い合わせ (お問い合わせ ERDDAP™ 管理者権限) 所有者であるべき datasets.xml READ と WRITE へのアクセス
    * user=tomcat だけを含むグループを作る。 chgrp を使ってグループを datasets.xml , ちょうど READ 権限で.
    * chmod を使用して o-rwx 権限を割り当てる ("other" ユーザの READ や WRITE へのアクセスがない) お問い合わせ datasets.xml お問い合わせ
* お問い合わせ ERDDAP™ パスワードやその他の接続プロパティは「プライベート」に保存されます。 Java 変数。
* クライアントからのリクエストは、Cassandra の CQL リクエストを生成する前に、妥当性を解析し、検証します。
* Cassandraへの要求はCQLの傷/準備された状態と、CQLの注入を防ぐためになされます。 いずれにしても、カスサンドラは、従来のデータベースよりもCQL注射に本質的に少ない感受性です [SQLインジェクション](https://en.wikipedia.org/wiki/SQL_injection) お問い合わせ
         
#### Cassandraの速度{#cassandra-speed} 
Cassandraは速くまたは遅いである場合もあります。 それを高速にするためにできることがあります。
* 一般 -
CQLの性質は、クエリが [宣言](https://en.wikipedia.org/wiki/Declarative_programming) お問い合わせ ユーザが何を望むかを指定するだけです。 クエリが処理または最適化される方法の仕様やヒントは含まれていません。 そのため、方法はありません。 ERDDAP™ キャサンドラがクエリを最適化するのに役立つような方法でクエリを生成する (または、クエリが処理される方法を指定する) お問い合わせ 一般的に、Cassandra 管理者が物事をセットアップする (例えば、インデックス) 特定の種類のクエリを最適化します。
     
* coarser-precision timestamp パーティションキーに関連したタイムスタンプカラムを指定する[&lt;パーティション キーソース名&gt; (#partitionkeysourcename の名前) 助けるべき最も重要な方法は ERDDAP™ Cassandraと効率的に働かせて下さい。 この関係がカスサンドラのテーブルに存在しておらず、 ERDDAP™ 、データセットは苦痛に遅いです ERDDAP™ Cassandraリソースのトンを使用してください。
     
* クラスターの列を[で指定する]&lt;クラスターColumnSourceNames&gt; (#clusterカラム名) 助ける2番目に重要な方法です ERDDAP™ Cassandraと効率的に働かせて下さい。 クラスターの列がない場合、指示しない ERDDAP , データの可能なクエリの大きなサブセットが不要になります, 痛みを伴う遅いで ERDDAP™ Cassandraリソースのトンを使用してください。
     
* メイク [インデックス](https://cassandra.apache.org/doc/latest/cql/indexes.html) 一般的に制約された変数については --
カサンドラのカラムのインデックスを作成すると、しばしば "="制約" で制約されているクエリを高速化できます。
    
Cassandra は、リスト、セット、またはマップの列のインデックスを作成できません。
    
* インデックス列を [ ] で指定する&lt;インデックスColumnSourceNames&gt; (#インデックスカラム名) 助けるべき重要な方法は ERDDAP™ Cassandraと効率的に働かせて下さい。 インデックスの列がない場合、 ERDDAP 、データのためのある照会は無事に、痛みを伴う遅いです ERDDAP™ Cassandraリソースのトンを使用してください。
     
#### Cassandraの統計{#cassandra-stats} 
*    [「Cassandra stats」診断メッセージ](#cassandra-stats) お問い合わせ 全てのために ERDDAP™ Cassandraのデータセットへのユーザーの照会、 ERDDAP™ ログファイルに行を印刷します。 *bigParentディレクトリ* /logs/log.txt, クエリに関連するいくつかの統計, 例えば,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
上記の例で数字を使うと、次の意味があります。

* いつか ERDDAP™ 最後の投稿 (リリース) このデータセットをロードし、Cassandraは語りました ERDDAP™ パーティションキーの10000の異なる組み合わせがありました。 ERDDAP™ ファイル内のすべての異なる組み合わせをキャッシュしました。
* ユーザーの制約により、 ERDDAP™ 目的のデータがあるかもしれない10000のから2つの組合せを識別しました。 お問い合わせ ERDDAP™ パーティションキーの各組み合わせのために、Cassandra に 2 呼び出しを行います。 (それはCassandraが要求するものです。) 明らかに、大量のデータセットにパーティションキーのコンビネーションの数が多いと、与えられたリクエストが大幅に減少しない場合は、面倒です。 それぞれのリクエストがキースペースを削減して設定することで、キースペースを削減できる[&lt;maxRequestFraction&gt; ディレクティブ (#maxrequestfractionの) お問い合わせ ここに、2/10000=2e-4、maxRequestFractionより少しです (ツイート) リクエストは受け付けております。
* パーティションキーの制約を適用した後、 [クラスターカラム](#clustercolumnsourcenames) と [インデックスカラム](#indexcolumnsourcenames) 送信されました ERDDAP™ 、Cassandra は 1200 列のデータを戻しました ERDDAP™ 結果セットで。
* 結果発表 セットは持っていなければなりません [データデータ タイプ= *いくつかのタイプ* プロフィール](#cassandra-datatypes) コラム (リストごとの平均10項目) , ので ERDDAP™ Cassandraから1200行を12000行に拡張 ERDDAP お問い合わせ
*    ERDDAP™ 常にCassandraからのデータにユーザーの制約のすべてを適用します。 この場合、Cassandra が処理されていない制約は、行数を 7405 に削減しました。 ユーザに送信された行数です。

これらの診断メッセージの最も重要な使用は、 ERDDAP™ 自分が何をしているかをやっています。 もしそうでなければ (例えば、期待通りのコンビネーションの数を減らすことはない?) すると、情報を使用して何が間違っているのかを把握することができます。
 
* より良い発見と設定のための研究と実験 [&lt;接続プロパティ&gt; (#cassandra-connectionpropertyさん) お問い合わせ
 
* カサンドラとの間のネットワーク接続の速度をチェック ERDDAP お問い合わせ 接続が遅い場合は、改善できるかどうかを確認します。 最高の状況はいつ ERDDAP™ 同じサーバに取り付けられたサーバ上で実行 (高速) 接続しているCassandraノードを実行しているサーバーとして切り替えます。
 
* お問い合わせ ここに情報を読むとCassandraの文書を慎重に. 実験。 あなたの仕事を確認してください。 カサンドラの場合- ERDDAP™ 接続は期待以上に遅くなりますが、Cassandraテーブルのスキーマと、あなたのCassandraテーブルのスキーマとあなたの ERDDAP™ チャンクの datasets.xml お問い合わせ [追加サポートを受けるセクション](/docs/intro#support) お問い合わせ
 
* 他のすべてが失敗した場合,
収集したデータの保存を検討する NetCDF v3の .nc ファイル (特に .nc 使用するファイル [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 一貫性のあるレイド配列のデータ構造なので、 ERDDAP お問い合わせ [EDDTableFromNcCFファイル](#eddtablefromnccffiles) ) お問い合わせ 論理的に整理されている場合 (スペースと時間のチャンクのためのデータとそれぞれ) , ERDDAP™ データを素早く抽出することができます。
         
#### EDDTableFromCassandra スケルトンXML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDapSequence (EDDTableFromDapSequence) の使い方{#eddtablefromdapsequence} 
 [ **EDDTableFromDapSequence (EDDTableFromDapSequence) の使い方** ](#eddtablefromdapsequence) 変数を 1 および 2 レベルのシーケンス内で扱います [ DAP ](https://www.opendap.org/) サーバなど DAP パープル (お問い合わせhttps://www.pmel.noaa.gov/epic/software/dapper/、今中断される) お問い合わせ

* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。 お使いのブラウザのソースデータセットのDDSとDASファイル(.dasと.ddsを追加する)を見て、必要な情報を収集できます。 sourceUrl (例)https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds)。
    
* 変数は DAP .dds 応答が変数を保持するデータ構造が "sequence" であることを示す場合のシーケンス (場合の無感覚) お問い合わせ
* 場合によっては、シーケンス内のシーケンス、 2- レベルシーケンス -- EDDTableFromDapSequence がこれらを処理します。
#### EDDTableFromDapSequence スケルトン ログイン{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromデータベース{#eddtablefromdatabase} 
 [ **EDDTableFromデータベース** ](#eddtablefromdatabase) 1つのリレーショナルデータベーステーブルからデータを処理します。 [ニュース](https://en.wikipedia.org/wiki/View_(database) )。

#### 1つのテーブルか眺め{#one-table-or-view} 
あなたがサービスしたいデータが2つ以上のテーブルにある場合 (JOINでは、両方のテーブルからデータを一度に抽出する) 1 つを作る必要があります [正規化](https://en.wikipedia.org/wiki/Denormalization)   (すでに登録済み) テーブルか [ニュース](https://en.wikipedia.org/wiki/View_(SQL) ) 1つのデータセットとして利用できるようにしたいすべてのデータと ERDDAP お問い合わせ

大規模で複雑なデータベースでは、非正規化テーブルとして複数のチャンクを分離することが理にかなっています。それぞれに異なる種類のデータセットが分離されます。 ERDDAP お問い合わせ

使用のための非正規化テーブルを作る ERDDAP™ あなたにとってクレイジーなアイデアのように聞こえるかもしれません。 お問い合わせ 理由はいくつかあります ERDDAP™ 非正規化テーブルで動作します。

* 使いやすさが大幅です。
いつか ERDDAP™ データセットを1つ、シンプル、非正規化、単一テーブルとして表示し、誰がデータを理解するのは非常に簡単です。 ほとんどのユーザーは、正規化テーブルを聞いたことがないし、キー、異物キー、テーブルの結合が非常に少ないため、ほぼ確実に異なるタイプの参加の詳細や、参加するSQLを指定する方法がわからない (または複数の参加) お問い合わせ 異常なテーブルを使用して、すべての問題を避けます。 そのため、データセットを提示するための非正規化された単一テーブルの使用だけを正当化します。 ERDDAP™ ユーザー。
     
* 正規テーブル (キー列に関連した複数のテーブル) データをデータベースに保存するのに便利です。
しかし、SQLでも、ユーザーに返される結果は非正規化です。 (ログイン) シングルテーブル。 そのため、ユーザにデータセットを巨大な、非正規化、それらがサブセットを要求できる単一テーブルとして提示することは合理的だそうです (例: 温度の表の行を表示&gt; 30日) お問い合わせ
     
* 変更を加えることができます ERDDAP™ テーブルを変更することなく
     ERDDAP™ データベースの設定方法と異なる可能性があるいくつかの要件があります。
例えば、 ERDDAP™ タイムスタンプデータを「タイムゾーン」フィールドで保存する必要があります。
別々のテーブル/ビューを作ることで ERDDAP™ , あなたは、非正規化テーブルを作るときに、これらの変更を行うことができます ERDDAP お問い合わせ そのため、テーブルの変更をする必要はありません。
     
*    ERDDAP™ 正規化テーブルの構造の一部を再作成します。
'outer' のテーブルからデータがどの列に来るかを指定できます。そのため、特定の値が制限されています。 ERDDAP™ これらの列内の値の異なる組み合わせのすべてを収集し、ユーザーに特別なものを提示します。 ユーザーがデータセットのサブセットをすばやく選択するのに役立つサブセットのWebページ。 各列の異なる値も、データセットの他のWebページ上のドロップダウンリストに表示されます。
     
* 正規化されたテーブルは、あなたからデータを手渡します ERDDAP 管理者は容易に。
このデータセットのエキスパートなので、どのテーブルとどの列が参加するか、また参加方法について決定するということが分かります。 お問い合わせ (または悪化し、エンドユーザー) いくつかのテーブルとそれらに参加する方法についての詳細な手順は、正規化テーブルへのアクセスを私たちに与えるだけです。
     
* 非正規化されたテーブルは、データを効率的にアクセスすることができます。
通常化されたフォームは通常、正規化フォームよりもアクセスが速くなります。 参加は遅くなります。 複数の参加は非常に遅くなります。
     

データベース内の2つ以上のテーブルからデータを取得するには ERDDAP™ 3つのオプションがあります。
 

* 推薦された選択:
正規化テーブルからデータをコンマまたはタブ区切り値ファイルを作成できます。
データセットが大きければ、複数のファイルを作成することは理にかなっています。それぞれは非正規化テーブルの集合 (例えば、より小さい時間範囲のデータ) お問い合わせ
    
ここに大きな利点は、 ERDDAP™ データベースのさらなる努力なしに、データに対するユーザーの要求を処理することができるようになります。 お問い合わせ ERDDAP™ データベースやセキュリティリスクに負担をかけません。 これは、ほとんどすべての状況下で最高のオプションです。 ERDDAP™ 通常、データベースより高速なファイルからデータを取得できます (.csv ファイルを変換する場合 .nc CFファイル) お問い合わせ (理由の一部は、 ERDDAP +files は読み取り専用のシステムであり、提供中に変更を加えるに対処する必要はありません。 [アクセス](https://en.wikipedia.org/wiki/ACID)   (大気、一貫性、分離、耐久性) お問い合わせ) また、 RAID の 1 つにデータを保存し、既存のサーバーにアクセスできるので、別のサーバーを必要としません。 ERDDAP™ 既存のサーバーで。
    
* オプション:
別のコンピューターに新しいデータベースをデノーマライズしたテーブルで設定します。
データベースは MariaDB や MySQL 、 PostgreSQL などのオープンソース・データベースとして無料で使えるので、このオプションはあまり費用がかかりません。
    
ここに大きな利点は、 ERDDAP™ 現行のデータベースにより、さらなる努力をすることなく、データに対するユーザーの要求を処理します。 お問い合わせ ERDDAP™ 現在のデータベースに負担をかけません。 以来、多くのセキュリティ上の懸念を排除 ERDDAP™ 現在のデータベースにアクセスできません。
    
* 推奨オプション:
つながる ERDDAP™ 現在のデータベースへ。
これを行うには、以下が必要です。
    
    * 別のテーブルを作成したり、データを非正規化したテーブルで表示したりできます。
    * 正規化テーブルのみに読み取り専用のアクセスを持つ「erddap」ユーザーを作成します。 (ツイート) お問い合わせ
         
    
これは、データが非常に頻繁に変化し、あなたが与えたい場合のオプションです ERDDAP™ ユーザーは、これらの変更に即座にアクセスします。ただし、その場合でも、上記のファイルオプションを定期的に使用することを感じることがあります。 (30分毎に?) 今日のデータを持つファイルを置き換えます。
このアプローチの巨大な欠点は、 ERDDAP™ ユーザのリクエストは、おそらくデータベースに大きな負担をかけることでしょう。 ERDDAP™ 接続はセキュリティリスク (リスクを最小化・管理できますが) お問い合わせ

異常なテーブルを作るか、またはのための眺め ERDDAP™ いくつかの変更を加えることは良い機会です ERDDAP™ あなたの元のテーブルに影響を与えない方法で、ニーズ:

* Date と timestamp フィールド/列を変更して、Postgres がコールする dataType を使用する [タイムゾーンのタイムスタンプ](#database-date-time-data)   (またはデータベースの等価) お問い合わせ
タイムゾーン情報なしでタイムスタンプが正しく機能しない ERDDAP お問い合わせ
* ユーザーが頻繁に検索する列のインデックスを作成します。
* お問い合わせ [フィールド/カラム名の場合](#quotes-for-names-and-case-sensitivity)   (例えば、すべての小文字を使用する) それらを入力するとき。
* テーブルとフィールド/列名で予約した単語を使用しないでください。

異常なテーブルやビューのヘルプが必要な場合は、データベース管理者にお問い合わせください。
このアプローチについて話したり、最善を尽くしたりしたい場合は、Chrisにメールしてください。 noaaa.gov のジョン。
    
#### データベース datasets.xml  {#database-in-datasetsxml} 
正しい作成が難しい datasets.xml 必要な情報 ERDDAP™ データベースへの接続を確立する。 患者になる。 方法的である。
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
        
生成データセット Xmlには、EDDTableFromDatabase の3つの特別なオプションがあります。
1. 「&#33;&#33;&#33;LIST&#33;&#33;&#33;」に入ったら&#33; (引用なし) カタログ名の場合は、カタログ名のリストが表示されます。
2. 「&#33;&#33;&#33;LIST&#33;&#33;&#33;」に入ったら&#33; (引用なし) スキーマ名の場合は、スキーマ名のリストが表示されます。
3. 「&#33;&#33;&#33;LIST&#33;&#33;&#33;」に入ったら&#33; (引用なし) 表名の場合、プログラムはテーブルとその列のリストを表示します。 あなたが作る最初の「&#33;&#33;&#33;LIST&#33;&#33;&#33;」エントリは、使用されるものです。
* EDDTableFromDatabase に関するすべてのドキュメントの情報を注意深くお読みください。
* データベース管理者に連絡し、Webを検索することで、EDDTableFromDatabaseデータセット用のXMLを作成するために必要なほとんどの情報を収集できます。
* データベースは、多くの場合、列名とテーブル名をケースインセンティブな方法で扱うが、それらはケースインセンティブである。 ERDDAP お問い合わせ そのためデータベースからエラーメッセージがカラム名が不明であると述べた場合 (たとえば "Unknown identifier= お問い合わせ *カラム\\_name* ' ' ') 存在しているにもかかわらず、例えば、すべての首都を使ってみてください。 *コラム* つまり、カラム名の真のケースに敏感なバージョンです。
* データベース管理者と密接に連携し、関連する経験を持たせます。 データセットがロードに失敗した場合は、 [エラーメッセージ](#troubleshooting-tips) 理由を調べるために慎重に.
         
#### JDBCドライバ{#jdbc-driver} 
* [JDBCドライバと&lt;ドライバ名&gt; (#jdbc ドライバー) お問い合わせ データベースの JDBC 3 または JDBC 4 ドライバー .jar ファイルを取得する必要があります。
それを入れて下さい *トームキャット* /webapps/erddap/WEB-INF/lib インストール後 ERDDAP お問い合わせ それから、あなたの datasets.xml このデータセットでは、&lt;このドライバのドライバ名&gt; (残念ながら) ファイル名とは異なる。 データベースのJDBCドライバとドライバの名前のWebを検索する Java 使う必要があります。
    
    * MariaDB について [https://mariadb.com/kb/en/about-the-mariadb-java-client/](https://mariadb.com/kb/en/about-the-mariadb-java-client/)   
ザ・オブ・ザ・&lt;driverName&gt; で使用する datasets.xml   (詳しくはこちら) おそらく org.mariadb.jdbc です。 運転者。
    * MySQL と Amazon RDS の場合、 [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)   
ザ・オブ・ザ・&lt;driverName&gt; で使用する datasets.xml   (詳しくはこちら) おそらくcom.mysql.jdbcです。 運転者。
    * お問い合わせ Oracle , 試す [https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html) お問い合わせ
ザ・オブ・ザ・&lt;driverName&gt; で使用する datasets.xml   (詳しくはこちら) oracle.jdbc.driver です。 Oracle 運転者。
    * Postgresql では、JDBC 4 ドライバーを から取得しました。 [https://mvnrepository.com/artifact/org.postgresql/postgresql](https://mvnrepository.com/artifact/org.postgresql/postgresql)   
ザ・オブ・ザ・&lt;driverName&gt; で使用する datasets.xml   (詳しくはこちら) おそらく org.postgresql です。 運転者。
    * SQL Server では、JTDS JDBC ドライバーから取得できます。 [https://jtds.sourceforge.net](https://jtds.sourceforge.net) お問い合わせ
ザ・オブ・ザ・&lt;driverName&gt; で使用する datasets.xml   (詳しくはこちら) おそらくnet.sourceforge.jtds.jdbcです。 運転者。
    
JDBC ドライバー .jar を入れた後 ERDDAP™ lib ディレクトリは、GenerateDatasets 用の .bat および/または .sh スクリプトファイル内の .jar ファイルへの参照を追加する必要があります。 Xml, DasDds, およびアーカイブADataset にある *トームキャット* /webapps/erddap/WEB-INF/ ディレクトリ; それ以外の場合は、これらのスクリプトを実行したときに ClassNotFoundException を取得します。
    
残念ながら、JDBCはトラブルの原因となります。 間接的な役割 ERDDAP™ そして、データベースは、標準/一般的なデータベースSQLリクエストに微妙な変更を加えることがあります。 ERDDAP™ これにより、問題を引き起こします (例えば、関連する [top/lowercase 識別子](#quotes-for-names-and-case-sensitivity) 関連する [日付/時刻タイムゾーン](#database-date-time-data) ) お問い合わせ 患者様は、ここの情報をよくお読みいただき、ご確認の上、当社をご覧ください。 [追加サポートを受けるセクション](/docs/intro#support) お問い合わせ
    
#### データベース&lt;アクセス プロパティ&gt;{#database-connectionproperty} 
* ツイート&lt;接続プロパティ&gt; (#database-connectionプロパティ) お問い合わせ お問い合わせ datasets.xml データセットの場合、複数の接続を定義する必要があります。 物件タグを伝えたい ERDDAP™ データベースに接続する方法 (たとえば、ユーザ名、パスワード、ssl 接続、および [フェッチサイズ](#set-the-fetch-size) ) お問い合わせ これらは、あらゆる状況で異なり、少し難しいです。 JDBC ドライバーを使用してデータベースに接続する例を Web で検索します。 ザ・オブ・ザ・&lt;connectProperty&gt; 名前 (たとえば "user", "password", "ssl") 「JDBC接続プロパティ」のWebを検索することで、connectionProperty値の一部が確認できます。 *データベース タイプ:* ツイート (例えば、 Oracle 、MySQL、Amazon RDS、MariaDB、PostgreSQL) お問い合わせ
     
#### 名前および場合の感受性のための引用{#quotes-for-names-and-case-sensitivity} 
*    [分野/コラムの名前のための引用;場合の感受性](#quotes-for-names-and-case-sensitivity) - デフォルトでは、EDDTableFromDatabase は ANSI-SQL-Standard のダブルクォーツを SELECT ステートメントのフィールド/列の名前の周りに置きます。フィールド/列名、またはフィールド/列の名前の特別な文字として予約した単語を使用します。 二重引用符は、SQLインジェクション攻撃の特定のタイプを脅かすこともできます。 教えてください ERDDAP™ ", ', または引用句を経由して使用するために&lt;columnNameクォート&gt; お問い合わせ datasets.xml このデータセットの場合。
    
多くのデータベースでは、任意のタイプの引用を使用して、データベースは、ケースの敏感な方法でフィールド/列名で動作する (デフォルトのデータベースケースの代わりに、無感覚な方法) お問い合わせ データベースは、多くの場合、ケースの敏感なフォームが異なる場合、実際のところ、すべての上限のケースとしてファイル/列の名前を表示します。 インスタグラム ERDDAP™ 常にデータベースのカラム名をケースとして扱います。
    
    * マリアのために DB では、データベースをデータベースで実行する必要があります。 [\\-sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/) お問い合わせ
    * MySQL と Amazon RDS の場合、データベースを実行する必要があります。 [\\-sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes) お問い合わせ
    *    Oracle ANSI-SQL標準ダブルクォートをサポート [デフォルトで](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223) お問い合わせ
    * PostgreSQL は ANSI-SQL-Standard のダブルクォートをサポートしています。
    
      
データベース、カタログ、スキーマ、テーブルの名前は予約済みです。 ERDDAP™ 周りの引用符を置きません。
    
可能であれば、データベーステーブルを作成するときにデータベース、カタログ、スキーマ、テーブル名、フィールド名のすべての小文字を使用する (またはビュー) フィールド/カラム名を参照する場合 datasets.xml お問い合わせ ERDDAP お問い合わせ それ以外の場合は、データベース、カタログ、スキーマ、テーブル、および/またはフィールドが見つからなかったというエラーメッセージが表示されます。 そのエラーメッセージが表示された場合は、ケースに敏感なバージョン、すべての上限文字バージョン、および名前の全ての下文字バージョンを使用してみてください。 ERDDAP お問い合わせ それらの1つが機能する場合があります。 そうでない場合は、データベース、カタログ、スキーマ、および/またはテーブルの名前をすべての小文字に変更する必要があります。
    
#### データベース&lt;データデータ タイプ及びgt;{#database-datatype} 
*    [データベース](#database-datatype) ツイート&lt;データタイプ&gt; (#データ型) タグ -- そこには、その周囲がいくつかありますので [データベースデータの種類](https://www.w3schools.com/sql/sql_datatypes_general.asp) サイトマップ ERDDAP™ データ型は、 [[] を指定する必要があります。&lt;データタイプ&gt; (#データ型) 各タグ [&lt; dataVariable &gt;&gt; (#データ変数) お問い合わせ ERDDAP™ どの dataType を使うか。 問題の部分は、異なるデータセットは、さまざまなデータタイプの異なる用語を使用することです。そのため、名前だけでなく、定義に常に一致しようとします。 説明を参照してください。 [スタンダード ERDDAP™ データデータ タイプ](#data-types) は、対応するSQLデータ型への参照を含む。 [日付とタイムスタンプ](#database-date-time-data) 特別な場合: 使用 ERDDAP '2つのデータ タイプ。
     
#### データベースの日付時刻データ{#database-date-time-data} 
データベースの日付時刻列には明示的なタイムゾーンはありません。 そのような列は問題です ERDDAP お問い合わせ データベースは、日付の概念をサポート (時間の有無にかかわらず) タイムゾーンがない場合、時間範囲が近くなります。 しかし、 Java   (こうして ERDDAP ) タイムゾーンで即時の date+times のみを扱います。 そのため、日付データがローカルタイムゾーンに基づいていることを知ることができます。 (日光の節約の時間なしでまたは) またはGMT/ Zulu タイムゾーン, しかし Java   (そして、 ERDDAP ) コメントはありません。 私たちはもともとこの問題を回避できると考えた (例えば、カラムのタイムゾーンを指定することで) , しかし、データベース+JDBC+ Java インタラクションは、この信頼できないソリューションを作成しました。
* お問い合わせ ERDDAP™ JDBC型に対応したデータベースデータ型「タイムゾーンでのタイムスタンプ」で、データベーステーブルに日時データを保存しておく必要があります。 (理想的には、GMT /を使用する Zulu タイムゾーン) お問い合わせ
* インスタグラム ERDDAP お問い合わせ datasets.xml , で&lt; dataVariable &gt; timestamp変数のタグ、セット
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

お問い合わせ&lt; addAttributes &gt; セット
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* 提案: データが時間範囲であれば、タイムスタンプ値がインプライド時間範囲の中央を参照するのに便利です。 (例えば、正午) お問い合わせ たとえば、ユーザーが別のデータセットから2010-03-26T13:00Zのデータを持っている場合、毎日データを持つデータベースデータセットから最も近いデータが必要な場合は、2010-03-26T12:00Zのデータベースデータ (その日付のデータを表す) 明らかに最高です (夜中夜に反対して、それが最も少ない明らかである場所) お問い合わせ
*    ERDDAP™ ユーティリティを持っている [数値変換 文字列の時間から/までの時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) お問い合わせ
* お問い合わせ [使い方 ERDDAP 時間とともにお得な情報](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) お問い合わせ
       
#### 整数null{#integer-nulls-1} 
データベースは整数でnullをサポート (ミント, 小さな, 小さな) 列, しかし ERDDAP™ true null をサポートしていません。
データベースの null は変換されます ERDDAP™ 127 バイトの列, 255 のための ubyte カラム, 32767 短い列, 65535 ushort カラム, 2147483647 int カラム, 4294967295 uint カラム, 9,223,372,036,854,775,807 長い列,または 18446744009551615 ulong カラム. これらのデフォルトを使用する場合は、それらを識別してください missing\\_value s データセットのユーザーのための ERDDAP™ お問い合わせ

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

または

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

あるいは「」を使うこともできます。 missing\\_value "\\_FillValue" の代わりに "属性"
生成データセット Xml は、提案した \\_FillValue 属性を自動的に追加します。 datasets.xml データベースデータセット用

データベースの浮動小数列の場合、null は NaNs に変換されます ERDDAP お問い合わせ
文字列に変換されるデータベースデータ型 ERDDAP™ , null は空の文字列に変換されます。
    
#### データベースのセキュリティ{#database-security} 
* データベースと連携するときは、悪意のあるユーザーがデータベースを損傷したり、アクセスできないデータにアクセスしたりすることを避けるために、できるだけ安全かつ安全に物事を行う必要があります。 ERDDAP™ 安全な方法で物事をしようとします。
    * 別のコンピュータ、データベースとデータベーステーブルに、必要なデータを複製することを検討してください。 ERDDAP™ お問い合わせ (はい、商用データベースなど Oracle 、これは追加のライセンス料を含みます。 しかし、PostgreSQL、MySQL、Amazon RDS、MariaDBなどのオープンソースのデータベースでは、この費用は全くありません。) これはあなたに高いレベルのセキュリティを与え、また防止します ERDDAP™ 元のデータベースを遅くするからのリクエスト。
    * セットアップをお待ちください。 ERDDAP™ データベースにのみアクセスできるデータベースユーザーとして接続する **関連記事** データベース (ツイート) READ 権限のみを持っています。
    * 接続の設定をおすすめします。 ERDDAP™ データベースへ
        * 常に SSL を使用しています。
        * 1つのIPアドレスからの接続を可能にするだけ (またはアドレスのブロック) ひとつから ERDDAP™ ユーザー、および
        * MD5ハッシュフォームのパスワードのみを転送します。
    *    \\[ ノウェン・プロブレム \\] 接続プロパティ (パスワードを含む&#33;) プレーンテキストとして保存されます。 datasets.xml お問い合わせ 管理者がデータベースのパスワードを入力することを可能にする方法が見つからない場合 ERDDAP Tomcatのスタートアップ (ユーザーの入力なしで起こるか) なので、パスワードはファイルでアクセス可能でなければなりません。 これをより安全にするために:
        * お問い合わせ (お問い合わせ ERDDAP™ 管理者権限) 所有者であるべき datasets.xml READ と WRITE へのアクセス
        * user=tomcat だけを含むグループを作る。 chgrp を使ってグループを datasets.xml , ちょうど READ 権限で.
        * chmod を使用して o-rwx 権限を割り当てる ("other" ユーザの READ や WRITE へのアクセスがない) お問い合わせ datasets.xml お問い合わせ
    * お問い合わせ ERDDAP™ パスワードやその他の接続プロパティは「プライベート」に保存されます。 Java 変数。
    * クライアントからのリクエストは、データベースのSQLリクエストを生成する前に、バリデーションをパースしてチェックします。
    * データベースへのリクエストは SQL の PreparedStatements で行なわれます。 [SQLインジェクション](https://en.wikipedia.org/wiki/SQL_injection) お問い合わせ
    * データベースへのリクエストの実行 クエリ (実行しない状態) 読み取り専用のリクエストを制限する (そのため、データベースを変更するSQLインジェクションがこの理由で失敗します。) お問い合わせ
         
#### ログイン{#sql} 
* なので OPeNDAP 's の表データリクエストは SQL の表形式のデータリクエストを移行するように設計されていました。 ERDDAP™ 表形式のデータリクエストをシンプルなSQL PreparedStatementに変換します。 例えば、 ERDDAP™ リクエスト
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
SQL PreparedStatement に変換されます。
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
 ERDDAP™ &distinct のリクエスト () および/または及び orderBy  ( *変数* ) DISTINCT や ORDER BY を追加 *変数* SQL の準備されたステートメントに。 一般的に、データベースからの応答を非常に遅くします。
 ERDDAP™ preparedStatement のログ [ログイン](/docs/server-admin/additional-information#log) として
```
    statement=*thePreparedStatement*  
```
これは、準備された状態のテキスト表現になります。これは、実際の準備された状態とは若干異なります。 たとえば、 PreparedStatement では、特別な方法で時刻がエンコードされます。 しかし、テキスト表現では、ISO 8601の日付時刻として表示されます。
     
#### データベース速度{#database-speed} 
* データベースを遅くすることができます。 あなたができることがあります:
    * 一般 -
SQLの性質は、クエリが [宣言](https://en.wikipedia.org/wiki/Declarative_programming) お問い合わせ ユーザが何を望むかを指定するだけです。 クエリが処理または最適化される方法の仕様やヒントは含まれていません。 そのため、方法はありません。 ERDDAP™ データベースがクエリを最適化するのに役立つような方法でクエリを生成する (または、クエリが処理される方法を指定する) お問い合わせ 一般的には、物事をセットアップするデータベース管理者までです。 (例えば、インデックス) 特定の種類のクエリを最適化します。
##### フェッチサイズを設定する{#set-the-fetch-size} 
データベースはデータを返す ERDDAP™ チャンクで. デフォルトでは、異なるデータベースはチャンク内の異なる行数を返します。 多くの場合、この数字は非常に小さく、非常に非効率です。 例えば、デフォルトは Oracle 10 です&#33; データベースの JDBC ドライバーの JDBC ドキュメントを読んで、これを増やすために設定する接続プロパティを見つけ、データセットの記述にこれを追加します。 datasets.xml お問い合わせ 例えば、
MySQL と Amazon RDS の場合、
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
MariaDBでは、フェッチサイズを変更する方法はありません。 しかし、それは要求された機能なので、これが実装されているかどうかを確認するWebを検索します。
お問い合わせ Oracle 、使用して下さい
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
PostgreSQL では、
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
しかし、数を変えるために自由に感じて下さい。 余りに大きい数を置くことは引き起こします ERDDAP™ メモリを多く使用し、メモリから実行する可能性が高い。
#### 接続プロパティ{#connectionproperties} 
各データベースには、他の接続プロパティが指定できるものがあります。 datasets.xml お問い合わせ これらの多くは、データベースのパフォーマンスに影響を及ぼします ERDDAP™ 接続。 データベースのJDBCドライバのドキュメントをお読みください。 便利な接続プロパティが見つかられば、詳細にメールを送信してください erd dot data at noaa dot gov お問い合わせ
* テーブルを作る --
定期的に応答が早くなります。 (毎日? 新しいデータがある場合、いつでも?) 実際のテーブルを生成する (VIEW を生成する方法と同様に) そして言うこと ERDDAP™ VIEWの代わりにテーブルからデータを取得する。 JOINingの別のテーブルなしでテーブルを要求する任意のので、応答ははるかに高速になります。
* テーブルを真空 -
MySQL と Amazon RDS は、使用するとはるかに高速に応答します。 [カスタマイズテーブル](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html) お問い合わせ
マリア 使用するとDBがより速く応答します [カスタマイズテーブル](https://mariadb.com/kb/en/optimize-table/) お問い合わせ
PostgreSQL がより速く応答します。 [真空ポンプ](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html) テーブル。
     Oracle アナログコマンドがない場合、または必要ありません。
* メイク [インデックス](https://en.wikipedia.org/wiki/Database_index) 一般的に制約された変数については --
変数のデータベースにインデックスを作成することで、多くの/most クエリを高速化できます。 (どのデータベースが「列」と呼ぶか) ユーザーの問い合わせに制約されることが多いです。 一般的に、これらは[]で指定された同じ変数です。&lt; subsetVariables &gt;&gt; (#サブセット変数) そして/または緯度、経度、時間変数。
##### 関係のプールの使用{#use-connection-pooling} 
普通、 ERDDAP™ リクエストごとにデータベースへの個別の接続を行います。 これは最も信頼できるアプローチです。 より高速な選択肢は、接続プールをサポートするDataSourceを使用することです。 設定するには、 (例えば)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
隣接する&lt; sourceUrl &gt;,&lt;ドライバ名&gt;&lt;アクセス プロパティ&gt;.
そして、 *トームキャット* /conf/context.xml は、例えば同じ情報を持つリソースを定義します。
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
DataSourceの使用に関する一般的な情報は、 [https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html) お問い合わせ
お問い合わせ [Tomcatのデータソース情報](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources) そして、 [Tomcat DataSourceの事例](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html) または、他のアプリケーションサーバーで DataSources の使用例の Web を検索します。
* 他のすべてが失敗した場合,
収集したデータの保存を検討する NetCDF v3の .nc ファイル (特に .nc 使用するファイル [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 一貫性のあるレイド配列のデータ構造なので、 ERDDAP お問い合わせ [EDDTableFromNcCFファイル](#eddtablefromnccffiles) ) お問い合わせ 論理的に整理されている場合 (スペースと時間のチャンクのためのデータとそれぞれ) , ERDDAP™ データを素早く抽出することができます。
         
#### EDDTableFromDatabase スケルトン ログイン{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromの特長 EDDGrid  {#eddtablefromeddgrid} 
 [ **EDDTableFromの特長 EDDGrid ** ](#eddtablefromeddgrid) EDDTable のデータを任意のデータセットから作成できます。 EDDGrid データセット。

* これを行うためのいくつかの一般的な理由は次のとおりです。
    * これにより、データセットは、 OPeNDAP 選択制約は、「値でクエリ」の型です。 (ユーザーが要求する可能性があるもの) お問い合わせ
    * データセットは、現在タブラデータセットです。
* 「maxAxis0」のグローバル属性の値 (type="int" の通常) , (デフォルトは10です) 軸数を制限するために使用される \\[ 0 の 0 \\]   (通常は "time" 軸線) 封じられた値 EDDGrid リクエストごとにデータアクセスできるデータセット。 制限がない場合、0の値を指定します。 この設定は重要なので、そうでなければ、EDDTableFrom をユーザーに尋ねるのは簡単です。 EDDGrid グリッドされたデータセットのデータをすべて調べる 時間がかかり、タイムアウトエラーでほとんど失敗します。 EDDTableFrom を安全に保つ設定です。 EDDGrid データセット ERDDAP 彼らは、コンピューティングリソースの不当な使用につながることを恐れずに。
* 封じられた場合 EDDGrid です。 [ EDDGrid Erddapから](#eddfromerddap) そして、 ERDDAP™ 同じです ERDDAP , その後 EDDTableFrom EDDGrid 参照されたデータセットの現在利用可能なバージョンを直接使用します。 これはEDDTableFromのための非常に効率的な方法です EDDGrid グリッドされたデータへのアクセス
* このクラスの[&lt;リロード 毎分&gt; (#reloadeveryn分) カウント数です。 封じられた EDDGrid お問い合わせ&lt;reloadEveryNMinutes&gt; は無視されます。
* 値が[の場合]&lt;更新EveryNMillis&gt; (#updateeverynmillis, オーストラリア) このデータセットは無視されます。 封じられた EDDGrid お問い合わせ&lt;updateEveryNMillis&gt; は何か問題です。
*    [生成データセットXml](#generatedatasetsxml) dataset type=EDDTableFrom のオプション EDDGrid URL を要求する ERDDAP   (通常同じ ERDDAP )   ("/erddap/" で終わる) 正規表現。 生成データセット Xml は、EDDTableFrom 用の XML を生成します。 EDDGrid 各グリッドデータセットのデータセット ERDDAP™ そこにある datasetID 正規表現にマッチする (.\\* を使用して、すべてにマッチします。 datasetID グリッドデータセット用のs) お問い合わせ
    
各データセットのGenerateDatasetsXmlによって生成されるXMLのチャンクは次のとおりです。
    
    * ツイート datasetID です。 EDDGrid お問い合わせ datasetID "\\_AsATable" を使う
    * 新しいサマリーグローバル属性で、 EDDGrid 's 要約とこのデータセットが何であるかを説明する新しい最初の段落.
    * 新しいタイトルのグローバル属性で、 EDDGrid 's title と ", (テーブルとして) お問い合わせ
    * 10. の値を持つ新しい maxAxis0 のグローバル属性
#### EDDTableFromの特長 EDDGrid スケルトンXML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFileNames(ファイル名){#eddtablefromfilenames} 
 [ **EDDTableFromFileNames(ファイル名)** ](#eddtablefromfilenames) サーバのファイルシステム内のファイルのグループに関する情報からデータセットを作成します。各ファイルの URL を含むため、ユーザーはファイルを経由してダウンロードできます。 ERDDAP お問い合わせ [ "files" システム](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) お問い合わせ すべてとは違って [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) サブクラスでは、このデータセットタイプはファイル内のデータを提供していません。

* EDDTableFromFileNames は以下のような場合に便利です。
    * 通常のデータファイルがデータを持っているのと同じ方法で「データ」が含まれていないため、ファイルを全体として配布したいファイルのグループがあります。 たとえば、画像ファイル、ビデオファイル、Word文書、Excelスプレッドシートファイル、PowerPointプレゼンテーションファイル、または未構造のテキストファイル。
    * あなたは、その形式でデータを持っているファイルのグループを持っています ERDDAP™ 読むことができません。 例えば、プロジェクト固有の、カスタム、バイナリ形式です。
         
#### EDDTableFromFileNames データ{#eddtablefromfilenames-data} 
*    [EDDTableFromFileNames データセットのデータ](#eddtablefromfilenames-data) テーブルは ERDDAP™ ローカルファイルのグループに関する情報をオンザフライを作成します。 表には各ファイルの行があります。 4つの特殊属性 [ datasets.xml このデータセットについて](#eddtablefromfilenames-skeleton-xml) このデータセットに含まれるファイルを指定します。
    
##### ファイル ディル{#filedir} 
    *   &lt;ファイルDir&gt; -- これにより、サーバーのファイルシステム内のソースディレクトリがこのデータセットのファイルを指定します。 実際にサーバーのファイルシステムにあるファイル&lt;fileDir&gt; は、指定された仮想ディレクトリ内のこのデータセットの url 列に表示されます。https://*serverUrl*/erddap/files/*datasetID/*お問い合わせ
例えば、 datasetID お問い合わせ RSS お問い合わせ
そして、&lt;fileDir&gt; は /home/data/mur/ です。
そのディレクトリには、jplMUというファイルがあります。 RSS T20150103000000.png、
その後、そのファイルのユーザーに表示されるURLは、
        https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.pngお問い合わせ
        
ローカルディレクトリを使用する以外&lt;fileDir&gt; は、リモートの URL やディレクトリのような Web ページを指定することもできます。 この作品は、
        
        * THREDDSの未集計データセットなど
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020年10月21日 このサーバは、もはや確実に利用可能ではありません。 \\] 
        * 非集計されたデータセット Hyrax 、例えば、
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * ほとんどの Apache のようなディレクトリのリスト、例えば、
             [https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/) 
##### オンザフライ{#fromonthefly} 
 [\\*\\*\\*fromOnTheFlyから](#fromonthefly) お問い合わせ 巨大なS3のバケツのため (noaa-goes17 のような, 持っている 26 百万ファイルファイル) , かかる場合があります ERDDAP™ バケットの内容に関するすべての情報をダウンロードするには最大12時間 (そして他の問題があります) お問い合わせ これを回避するには、特別な方法があります&lt;EDDTableFromFileNames の fileDir&gt; は、AWS S3 の Bucket からディレクトリとファイル名を持つデータセットを作る。 データセットは、ユーザーがデータセットにリクエストを経由して検索できるS3バケットのディレクトリとファイル名のすべてのリストを持っていません。 しかし、データセットは、ユーザがデータセットでディレクトリ階層を横断する場合、ディレクトリとファイルの名前をオンザフライで取得します "files" オプション。 そのため、ユーザーはデータセットのS3バケットのファイル階層とファイルを閲覧できます。 "files" システム。 これを行うには、S3 バケットの URL を "Starting directory" に指定する代わりに (GenerateDatasetで Xmlの) または&lt;ファイルDir&gt; (お問い合わせ datasets.xml ) , 使用:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
例えば:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
ドキュメントを見る [S3のバケツと働かせて下さい ERDDAP™ ](#working-with-aws-s3-files) S3 バケット URL で使用する必要がある特定のフォーマットの説明。 見る
 [これらの詳細と例](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket) 使用方法\\*\\*\\*OnTheFlyから
        
##### 再帰的{#recursive} 
*   &lt;再帰&gt; -- サブディレクトリ内のファイル&lt;fileDir&gt; 一致する名前&lt;fileRegex&gt; は同じサブディレクトリに同じサブディレクトリに表示されます。 "files" URL の場合&lt;recursive&gt; は true に設定されます。 デフォルトは false です。
* ツイート&lt;pathRegex&gt; (#pathregex ディレクティブ) お問い合わせ recursive=true の場合、pathRegex にマッチするディレクトリ名のみ (デフォルト=".\\*") 受付けます。 recursive=false の場合、無視されます。 これはまれに使われますが、異常な状況で非常に役立ちます。 (お問い合わせ [regex ドキュメント](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) そして、 [regexチュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) お問い合わせ) 
##### ファイルRegex{#fileregex} 
*   &lt;ファイルRegex&gt; -- ファイル名全体がファイル名だけ (ディレクトリ名を含めない) マッチする&lt;fileRegex&gt; はこのデータセットに含まれています。 例えば、jplMU RSS お問い合わせ (お問い合わせ [regex ドキュメント](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) そして、 [regexチュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) お問い合わせ)   
         
##### ファイル名のデータテーブルコンテンツから{#from-file-names-data-table-contents} 
テーブルには、次の列があります。
* ログイン ユーザーがファイルをダウンロードするために使用できるURL ERDDAP お問い合わせ [ "files" システム](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) お問い合わせ
* 名前 -- ファイル名 (ディレクトリ名なし) お問い合わせ
* 最後の修正 -- ファイルが最後に修正された時刻 (保存される倍と "seconds since 1970-01-01T00:00:00Z" ) お問い合わせ この変数は、指定したファイルの内容が最後に変更されたときに、ユーザーが確認できるので便利です。 この変数は [タイムタイム スタンプ変数](#timestamp-variables) なので、数値の値としてデータが表示される (1970-01-01T00:00:00Z以来の秒) または 文字列の値 (ISO 8601の:2004年 (Eメール) フォーマット) , 状況に応じて.
* サイズ -- バイト内のファイルのサイズは、二重として保存されます。 それらは、ファイルによっては、ints よりも大きくなる可能性があるため、保存され、応答ファイルの種類によっては長がサポートされていないためです。 二重は、非常に大きなファイルでも、正確なサイズを与えます。
* 定義される追加カラム ERDDAP™ ファイル名から抽出された情報を持つ管理者 (例えば、ファイル内のデータに関連した時間) 各追加カラムのメタデータに指定した2つの属性に基づく dataVariable : : :
    
    * 抽出Regex -- これは、 [正規表現](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [チュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) お問い合わせ regex 全体がファイル名全体に一致しなければなりません (ディレクトリ名を含めない) お問い合わせ regex は、少なくとも 1 つのキャプチャ グループを含む必要があります。 (括弧に囲まれた正規表現のセクション) お問い合わせ ERDDAP™ ファイル名のどのセクションがデータになるかを調べるために使用します。
    * ソリューション グループ -- キャプチャグループ数です。 (#1は最初のキャプチャグループです) 正規表現で。 デフォルトは1です。 キャプチャグループは括弧で囲む正規表現のセクションです。
    
以下は2つの例です。
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
時刻変数の場合、ファイルが jplMU の名前を持っている場合 RSS T20150103000000.png、extractRegexはファイル名に一致し、最初のキャプチャグループに一致する文字を抽出します ("20150103000000" の) dataType=String として、それから使用して下さい [文字列時間に適した単位](#string-time-units) 文字列を時間データ値にパースする (2015-01-03T00:00:00Z) お問い合わせ

日変数の場合、ファイルが jplMU の名前を持っている場合 RSS T20150103000000.png、extractRegexはファイル名に一致し、最初のキャプチャグループに一致する文字を抽出します (3月3日) として [&lt;データタイプ&gt; (#データ型) \\=int のデータ値を 3 で取得します。
        
#### その他の情報{#other-information} 
* いいえ [&lt;更新EveryNMillis&gt; (#updateeverynmillis, オーストラリア) お問い合わせ このタイプのデータセットは不要で、使用できません。&lt;updateEveryNMillis&gt; タグは、EDDTableFromFileNames が提供した情報は、常に最新です。 ERDDAP™ データの各リクエストに対応するため、ファイルシステムに問い合わせます。 膨大な数のファイルが存在する場合でも、このアプローチは合理的にうまくいくはずです。 膨大な数のファイルがある場合、応答が遅くなる可能性があり、しばらくの間、データセットがqueriedされていない。 しかし、その後数分間、オペレーティングシステムはキャッシュに情報を保持しているため、応答は非常に高速でなければなりません。
     
* 使うことができます。 [生成データセット Xmlプログラム](#generatedatasetsxml) 作るために datasets.xml このタイプのデータセットのチャンク。 上記のように、ファイル名から抽出された情報を追加/定義することができます。
     
#### EDDTableFromFileNames スケルトン ログイン{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFiles (EDDTableFromFiles) は、{#eddtablefromfiles} 
 [ **EDDTableFromFiles (EDDTableFromFiles) は、** ](#eddtablefromfiles) EDDTableFrom...Files クラスは、すべての EDDTableFrom...Files クラスのスーパークラスです。 EDDTableFromFiles は直接使用できません。 代わりに、EDDTableFromFiles のサブクラスを使用して、特定のファイルタイプを処理します。

*    [EDDTableFromAsciiFiles (EDDTableFromAsciiFiles) からの投稿](#eddtablefromasciifiles) comma-, tab-, Semicolon-, またはスペース分離した ASCII データファイルからデータを集計します。
*    [EDDTableFromAudioファイル](#eddfromaudiofiles) ローカルオーディオファイルのグループからデータを集計します。
*    [EDDTableFromの特長 AwsXmlファイル](#eddtablefromawsxmlfiles) 自動気象ステーションのセットからデータを集計 (ツイート) XMLファイル。
*    [EDDTableFromColumnarAsciiFilesから](#eddtablefromcolumnarasciifiles) 固定幅のデータ列を持つ表形式の ASCII データファイルからデータを集計します。
*    [EDDTableFromの特長 Hyrax ファイル](#eddtablefromhyraxfiles)   (リリース) 複数の変数でデータを集計し、それぞれに共有された寸法 (例えば、時間、高度 (または深さ) 、緯度、経度) , によって提供される [ Hyrax   OPeNDAP サーバー](https://www.opendap.org/software/hyrax-data-server) お問い合わせ
*    [EDDTableFromInvalidCRAファイル](#eddtablefrominvalidcrafiles) データを集計する NetCDF   (v3 または v4)   .nc 特定の、無効、CF DSG Contiguous Ragged Array の variant を使用するファイル (キュラ) ファイル。 しかし、 ERDDAP™ このファイルタイプをサポートし、使用し始めるべきでない無効なファイルタイプです。 現在、このファイルタイプを使用するグループが強く推奨されています ERDDAP™ 有効なCF DSG CRAファイルを生成し、これらのファイルを使用して停止します。
*    [EDDTableFromJsonlCSVファイル](#eddtablefromjsonlcsvfiles) データを集計する [ジェイソン CSVファイルライン](https://jsonlines.org/examples/) お問い合わせ
*    [EDDTableFromMultidimNcファイル](#eddtablefrommultidimncfiles) データを集計する NetCDF   (v3 または v4)   .nc   (または [ .nc ミリリットル](#ncml-files) ) 複数の変数を持つファイル、各共有寸法 (例えば、時間、高度 (または深さ) 、緯度、経度) お問い合わせ
*    [EDDTableFromNcFiles (EDDTableFromNcFiles) は、](#eddtablefromncfiles) データを集計する NetCDF   (v3 または v4)   .nc   (または [ .nc ミリリットル](#ncml-files) ) 複数の変数を持つファイル、各共有寸法 (例えば、時間、高度 (または深さ) 、緯度、経度) お問い合わせ 既存のデータセット用のこのデータセットタイプを引き続き使用しても構いませんが、新しいデータセットでは、代わりにEDDTableFromMultidimNcFilesを使用することをお勧めします。
*    [EDDTableFromNcCFファイル](#eddtablefromnccffiles) データを集計する NetCDF   (v3 または v4)   .nc   (または [ .nc ミリリットル](#ncml-files) ) 指定したファイル形式の1つを使用するファイル [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) コンベンション しかし多次元CF DSGの変形の1つを使用してファイルのために、使用して下さい [EDDTableFromMultidimNcファイル](#eddtablefrommultidimncfiles) 代わりに。
*    [EDDTableFromNccsvファイル](#eddtablefromnccsvfiles) データを集計する [NCCSVの特長](/docs/user/nccsv-1.00) ASCII .csv ファイル。
*    [EDDTableParquetFilesから](#eddtablefromparquetfiles) データを扱う [パーケット](https://parquet.apache.org/) お問い合わせ
*    [EDDTableFromThreddsファイル](#eddtablefromthreddsfiles)   (リリース) 複数の変数を持つファイルからデータを集約し、共有された寸法で提供される [パスワード OPeNDAP サーバー](https://www.unidata.ucar.edu/software/tds/) お問い合わせ
*    [EDDTableFromの特長 WFS ファイル](#eddtablefromwfsfiles)   (リリース) すべてのデータをローカルにコピーする ArcGIS 地図サーバ WFS サーバはデータがすぐに保存できるように ERDDAP™ ユーザー。

現在、他のファイルタイプは対応しておりません。 しかし、他のファイルタイプのサポートを追加するのは比較的簡単です。 リクエストがあればご連絡ください。 または、データが古いファイルフォーマットにある場合は、ファイルを変換することをお勧めします。 NetCDF v3の .nc ファイル (特に .nc ファイルとファイル [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 目立たせられた配列のデータ構造 -- ERDDAP™ データを素早く抽出できる) お問い合わせ NetCDF 広くサポートされています。バイナリ形式は、データへの高速ランダムアクセスを可能にし、既にサポートされています。 ERDDAP お問い合わせ

#### FromFilesの詳細{#fromfiles-details} 
以下の情報は、EDDTableFromFiles のサブクラスすべてに適用されます。
##### 集計{#aggregation} 
ローカルファイルからデータを集計するクラスです。 各ファイルが保持されます (比較的) 小さなテーブルのデータ。
    * 結果データセットは、すべてのファイルのテーブルが組み合わされたかのように表示されます。 (ファイル#1、ファイル#2からのすべての行と...) お問い合わせ
    * ファイルが指定された変数の全てを持っている必要はありません。 指定したファイルが指定された変数を持たない場合、 ERDDAP™ 必要に応じて、不足している値を追加します。
    * すべてのファイルの変数は、MUSTに同じ値を持つ必要があります [ add\\_offset ](#scale_factor) , [ missing\\_value ](#missing_value) , [\\_料金 バリュー](#missing_value) , [ scale\\_factor ](#scale_factor) と [ユニット](#units) 属性 (お問い合わせ) お問い合わせ ERDDAP™ checks, しかし、それは不完全テストです -- 異なる値がある場合, ERDDAP どのファイルが正しいかわからないため、ファイルが無効です。 問題が起きた場合は、 [ログイン](#ncml-files) または [ NCO ](#netcdf-operators-nco) 問題を解決するため。
         
##### 圧縮されたファイル{#compressed-files} 
すべてのEDDTableFromFilesサブクラス用のソースデータファイルが外部に圧縮することができます (例: .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 または .Z) お問い合わせ 詳細はこちら [外部圧縮されたファイル文書](#externally-compressed-files) お問い合わせ
     
##### キャッシュされたファイル情報{#cached-file-information-1} 
* EDDTableFromFiles のデータセットが最初に読み込まれると、EDDTableFromFiles は関連するすべてのファイルから情報を読み込み、テーブルを作成します。 (各ファイルの1列) 各有効なファイルと各 "bad" に関する情報 (異なるまたは無効) ファイル。
    * 表もディスクに保存されます。 NetCDF v3の .nc ファイル *bigParentディレクトリ* /データセット/ *last2CharsOfデータセットID* / / / / * datasetID * / ファイル名:
dirテーブル .nc   (ユニークなディレクトリ名のリストを保持する) ,
ファイル テーブル .nc   (有効なファイルの情報ごとにテーブルを保持する) ,
悪いファイル .nc   (悪いファイルの情報ごとにテーブルを保持する) お問い合わせ
    * EDDTableFromFiles データセットへのアクセスを高速化 (しかし、より多くのメモリを使用する費用で) 、使用することができます
ツイート&lt;fileTableInMemory&gt;true のファイル&lt;/fileTableInMemory&gt;/ファイルTableInMemory&gt; (#ファイルテーブルインメモリー)   
お問い合わせ ERDDAP™ メモリ内のファイル情報テーブルのコピーを保持する。
    * ディスク上のファイル情報テーブルのコピーも便利です ERDDAP™ シャットダウンして再起動: EDDTable を保存 FromFiles は、すべてのデータファイルを再読み込みする必要がありました。
    * データセットをリロードすると、 ERDDAP™ 変更した新しいファイルやファイルでデータを読む必要があります。
    * ファイルが他のファイルから異なる構造を持っている場合 (例えば、変数の1つに対して異なるデータ型、または " [ユニット](#units) 属性) , ERDDAP "bad" ファイルの一覧にファイルを追加します。 ファイルの問題に関する情報は、 *bigParentディレクトリ* /logs/log.txt ファイル
    * これらのファイルを削除または使用する必要はありません。 1つの例外は、データセットの変更をまだ作成している場合 datasets.xml セットアップ, これらのファイルを強制的に削除したい場合 ERDDAP™ ファイルの読み込み/解釈が異なるため、すべてのファイルを再読み込みします。 これらのファイルを削除する必要が生じた場合は、 ERDDAP™ 実行中です。 (すると、 [ログイン](/docs/server-admin/additional-information#set-dataset-flag) データセットASAPを再ロードします。) しかし、 ERDDAP™ 通常、その通知 datasets.xml 情報はファイルと一致しません 表情報とファイルテーブルを自動的に削除します。
    * 奨励したい方 ERDDAP™ 保存したデータセット情報を更新する (例えば、データセットのデータディレクトリにファイルを追加、削除、または変更した場合) 、使用して下さい [フラグシステム](/docs/server-admin/additional-information#flag) 強制する ERDDAP™ キャッシュされたファイル情報を更新します。
         
##### リクエストの処理{#handling-requests-1} 
*    ERDDAP™ 表形式のデータリクエストは、任意の変数に制約を置くことができます。
    * クライアントのデータのリクエストが処理されると、EDDTableFromFiles は有効なファイル情報でテーブルをすばやく見ることができ、どのファイルが関連したデータがあるかを確認することができます。 たとえば、各ソースファイルが1つの固定位置のbuoyのデータを持っている場合、EDDTableFromFilesは、特定の経度範囲と緯度範囲内のデータがあるかを非常に効率的に決定できます。
    * 有効なファイル情報テーブルには、有効なファイルごとに変数の最小値と最大値が含まれているため、EDDTableFromFilesは他のクエリを非常に効率的に処理することができます。 たとえば、buoys が空気圧センサーを持っていない場合、AirPressure&#33;=NaN、EDDTableFromFiles のクライアントリクエストデータは、どのbuoys が空気圧データを持っているかを効率的に判断できます。
         
##### キャッシュされたファイル情報の更新{#updating-the-cached-file-information-1} 
データセットがリロードされると、キャッシュされたファイルが更新されます。
    
* データセットは、決定どおりに定期的にリロードされます&lt;reloadEveryNMinutes&gt; データセットの情報 datasets.xml お問い合わせ
* データセットは、可能な限り迅速にリロードされます ERDDAP™ 追加した検出、削除、 [お問い合わせ](https://en.wikipedia.org/wiki/Touch_(Unix) ) ) (ファイルの最後に変更する 変更された時間) データファイルの変更
* データセットは、ご使用の際にはできるだけ早くリロードされます。 [フラグシステム](/docs/server-admin/additional-information#flag) お問い合わせ

データセットをリロードすると、 ERDDAP™ 現在利用可能なファイルとキャッシュされたファイル情報テーブルを比較します。 有効なファイルテーブルに新しいファイルが読み込まれ、追加されます。 有効なファイル表から、存在しないファイルが削除されます。 ファイルのタイムスタンプが変更されたファイルが読み込まれ、その情報は更新されます。 新しいテーブルは、メモリとディスク上の古いテーブルを置き換えます。
     
##### 悪いファイル{#bad-files-1} 
悪いファイルの表とファイルが悪いと宣言された理由 (破損したファイル、不足している変数、誤った軸値など) メールでのお問い合わせ お問い合わせ メールアドレス (おそらくあなた) データセットが再ロードされるたびに。 これらのファイルをできるだけ早く交換または修理する必要があります。
     
##### 変数の欠損{#missing-variables-1} 
ファイルがいくつかある場合 dataVariable データセットで定義される s datasets.xml チャンク、それは大丈夫です。 EDDTableFromFiles がそれらのファイルの 1 つを読み込みた場合は、ファイルが変数を持っていた場合として機能しますが、すべての欠落した値で。
     
##### リアルタイムデータ{#near-real-time-data} 
* EDDTableFromFilesは、最新のデータを特別なケースとしてリクエストを処理します。 問題: データセットを構成するファイルが頻繁に更新されると、ファイルが変更されるたびにデータセットが更新されない可能性があります。 そのため、EDDTableFromFiles は変更されたファイルを認識しません。 (あなたは使用することができます [フラグシステム](/docs/server-admin/additional-information#flag) , しかし、これはにつながる可能性があります ERDDAP™ ほぼ継続的にデータセットをリロードします。 ほとんどの場合、お勧めしません。) 代わりに、EDDTableFromFiles は、次のシステムでこれを処理します。 いつか ERDDAP™ 過去20時間以内にデータを要求する (例えば、今まで8時間前) , ERDDAP™ 最後の20時間に任意のデータを持つすべてのファイルを検索します。 したがって、 ERDDAP™ 最新のデータを見つけるために、すべてのファイルを完全に最新のデータする必要はありません。 あなたはまだ設定する必要があります [&lt;リロード 毎分&gt; (#reloadeveryn分) 合理的に小さい値に (例えば、60) , しかし、それは小さなものでなければなりません (例えば、3) お問い合わせ
     
    *    **お勧めしない** ファイル内のほぼリアルタイムデータの組織: たとえば、複数のステーションのデータを保存するデータセットがある場合 (または buoy, または trajectory, ...) たとえば、ステーションごとに1つのファイルがあります。 しかし、ステーションの新しいデータが到着するたびに、大きな古いファイルを読み、大きな新しいファイルを書く必要があります。 そして時 ERDDAP™ データセットをリロードし、一部のファイルが変更されていることに気づくので、これらのファイルを完全に読み込みます。 それは非効率です。
         
    *    **おすすめ商品** ファイル内のほぼリアルタイムデータの組織: チャンク内のデータを保存します。例えば、1つのステーション/buoy/trajectoryのすべてのデータを1年間保存します。 (または1ヶ月) お問い合わせ その後、新しいダムが到着すると、今年のファイルのみが (または月の) データは影響を受ける。
        
        * ベスト: 使用条件 NetCDF v3の .nc 無制限の次元のファイル (タイムタイム) お問い合わせ 次に、新しいデータを追加するには、ファイル全体を読み書きすることなく新しいデータを追加できます。 変更は、非常に効率的かつ本質的に原子的に行われます。そのため、ファイルは矛盾しない状態ではありません。
        * それ以外の場合: 利用できない場合 .nc 無制限の次元のファイル (タイムタイム) 新しいデータを追加する必要がある場合は、影響を受けるファイル全体を読み書きする必要があります (年だけでも過ごせるので、 (または月の) データの価値) お問い合わせ 幸いなことに、以前の年のすべてのファイル (または数か月) その駅が変わらず、
        
どちらの場合も ERDDAP™ データセットをリロードし、ほとんどのファイルは変更されません。少数の小さなファイルだけが変更され、読み込まれる必要があります。
         
##### ディレクター{#directories-1} 
ファイルは1つのディレクトリ、またはディレクトリとそのサブディレクトリにすることができます。 (再帰的に) お問い合わせ 多数のファイルがある場合 (例:&gt;1,000) 、オペレーティング システム (このようにEDDTableFromFiles) サブディレクトリの一連のファイルを保存すると、より効率的に動作します (1 年 1 回、または 1 ヶ月あたりのデータセットに非常に頻繁なファイル) , 与えられたディレクトリに膨大な数のファイルが存在しないので.
     
##### リモートディレクトリとHTTPレンジリクエスト{#remote-directories-and-http-range-requests-1} 
*    **リモートディレクトリとHTTPレンジリクエスト**   (AKA バイト サービング、バイト レンジ リクエスト) お問い合わせ
     EDDGrid FromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles, 時々 からデータを提供できます .nc リモートサーバ上のファイルと、サーバーがサポートしている場合はHTTP経由でアクセス [バイテ サービング](https://en.wikipedia.org/wiki/Byte_serving) HTTP レンジリクエスト (バイトサービングの HTTP メカニズム) お問い合わせ これはnetcdf-javaで可能 (お問い合わせ ERDDAP™ 使用して読む .nc ファイル) リモートからの読み取りデータをサポート .nc HTTP レンジリクエストによるファイル。
    
     **お問い合わせ**   
代わりに [[] を使用します。&lt;cacheFromUrl&gt; システム (パスワード) お問い合わせ
    
##### キャッシュFromUrl{#cachefromurl} 
* ツイート ** &lt;キャッシュFromUrl&gt; ** . . (パスワード) ・
すべて EDDGrid FromFiles と EDDTableFromFiles のデータセットは、タグのセットをサポート ERDDAP™ リモート・データセットの全てのファイルのコピーをダウンロードし、維持するため、またはいくつかのファイルのキャッシュ (必要に応じてダウンロード) お問い合わせ **これは信じられないほど便利な機能です。** 
    * ザ・オブ・ザ・&lt;cacheFromUrl&gt; タグは、リモートファイルリストからリモートデータセットのファイルのリストを持つ URL を指定できます。
        
        * THREDDSの未集計データセットなど
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020年10月21日 このサーバは、もはや確実に利用可能ではありません。 \\] 
        * 非集計されたデータセット Hyrax 、例えば、
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * ほとんどの Apache のようなディレクトリのリスト、例えば、
             [https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/) 
        * S3 バケツ、例えば、
             [https://noaa-goes17.s3.us-east-1.amazonaws.com/](https://noaa-goes17.s3.us-east-1.amazonaws.com/)   
ただし、AWSアカウントや設定などが必要になります。
お問い合わせ [S3のバケツと働かせて下さい ERDDAP™ ](#working-with-aws-s3-files) お問い合わせ
また、キャッシュを使用する必要はありません。 ファイルが ASCII ファイルの場合、S3 の Bucket のファイルを含む FromUrl (例:.csv) , ので ERDDAP™ バケットからデータを直接ストリームから読み込むことができます。
        
         ERDDAP™ これらのファイルをコピーまたはキャッシュします。&lt;fileDir&gt; ディレクトリ。 別のタイプのリモートファイルリストのサポートが必要な場合 (例:FTP) Chris へのリクエストをメールで送信してください。 noaaa.gov のジョン。
        
        * デフォルト値は、&lt;cacheFromUrl&gt; タグは null です。 値を指定しない場合&lt;cacheFromUrl&gt; タグは、このデータセットにコピー/キャッシュシステムが使われません。
        * データセットの場合&lt;ファイルRegex&gt; .\\* 以外の設定は ERDDAP™ fileRegex と一致するファイルのみをダウンロードします。
        * データセットの場合&lt;recursive&gt; 設定は本当であり、リモートファイルはサブディレクトリにあります、 ERDDAP™ リモートサブディレクトリで、データセットの [&lt;pathRegex&gt; (#pathregex ディレクティブ) , ローカルで同じディレクトリ構造を作成し、同じサブディレクトリにローカルファイルを置く.
        * GenerateDatasetで Xml を指定すると、&lt;cacheFromUrl&gt; 値、Generate データセット Xmlはローカルを作成する&lt;fileDir&gt; ディレクトリに 1 つのリモートファイルをコピーします。 生成データセット Xml が生成されます。 datasets.xml そのサンプルファイルに基づいてチャンク (サンプルを指定する ファイル=nothing) お問い合わせ
        * データソースがリモートの場合 ERDDAP™ 、使用して下さい [ EDDGrid Erddapから](#eddfromerddap) または [EDDTableFromErddapの特長](#eddfromerddap) 代わりに&lt;cacheFromUrl&gt;. つまり、あなたのローカル ERDDAP™ データセットがあるように見えますが、ローカルにデータを保存する必要はありません。 利用する唯一の理由&lt;cacheFromUrl&gt; リモートからデータを取得する ERDDAP™ データファイルのローカルコピーが必要な場合は、他の理由があります。 その場合:
            * このデータセットはリモートでデータセットを購読しようとします ERDDAP データセットの変更は、このデータセットのフラグを呼び出します ウルは、このローカルデータセットをリロードし、変更されたリモートファイルをダウンロードすることを引き起こします。 したがって、ローカルデータセットはリモートデータセットに変更がなされた直後に最新になります。
            * リモートの管理者にメールを送る必要があります ERDDAP™ お問い合わせ datasets.xml リモートデータセットのため、ローカルでデータセットを作ることができます ERDDAP™ リモートのデータセットのように見える ERDDAP お問い合わせ
        * データソースがリモートの場合 ERDDAP™ ローカルデータセットは、リモートデータセットを購読しようとします。
            * サブスクリプションが成功した場合、リモートでいつでも ERDDAP 再読み込みと新しいデータがあり、このデータセットのフラッグURLに連絡し、新しいおよび/または変更されたデータファイルをリロードしてダウンロードします。
            * サブスクリプションが失敗した場合 (何らかの理由で) ローカルデータセットが最新の状態であることを確認したい場合、 [ログイン](/docs/server-admin/additional-information#flag) ローカルデータセットのため、リロードされますので、新しいリモートデータファイルや変更されたリモートデータファイルをチェックします。
        * データソースがリモートでない場合 ERDDAP : 再読み込み時に、データセットは、新しいリモートファイルと/または変更されたリモートファイルをチェックします。 通常、これは[によって制御されます]&lt;リロード 毎分&gt; (#reloadeveryn分) お問い合わせ しかし、新しいリモートファイルがある場合に知っていれば、 [ログイン](/docs/server-admin/additional-information#flag) ローカルデータセットでは、新しいファイルや/またはリモートデータファイルをリロードしてチェックします。 一日の特定の時間でこれが日常的に起こる場合 (例:午前7時) 、使用する cron ジョブを作ることができます。 curl フラグに連絡する このデータセットでは、新しいファイルと/または変更されたリモートデータファイルのリロードおよびチェックを行います。
    * ザ・オブ・ザ・&lt;cacheSizeGB&gt; タグは、ローカルキャッシュのサイズを指定します。 クラウドストレージシステムと連携する際には、おそらくこれを使用する必要があります。 [アマゾンS3](https://aws.amazon.com/s3/) これは、一般的に使用されるストレージシステムの一部である [Amazon Webサービス (ツイート) ](https://aws.amazon.com/) お問い合わせ デフォルトは-1です。
        * 値が&lt;=0の (例:-1 のデフォルト値) ,
             ERDDAP™ ダウンロードして維持します **完全なコピー** データセット内のすべてのリモートデータセットのファイル&lt;fileDir&gt;.
            * 可能な限りお勧めする設定です。
            * データセットが再ロードされるたびに、リモートファイルとローカルファイルの名前、サイズ、および lastModified 時刻を比較し、新しいファイルまたは変更されたリモートファイルをダウンロードします。
            * リモートサーバ上にあるファイルが消えた場合、 ERDDAP™ 対応するローカルファイルを削除します。 (それ以外の場合は、リモートサーバーで何かが一時的に間違っていた場合、 ERDDAP™ ローカルファイルの一部または全部を削除できます&#33;) お問い合わせ
            * この設定では、通常設定します&lt;updateEveryNMillis&gt; から -1 まで、データセットが新しいデータファイルをコピーしたときに認識されているからです。
        * 値が &gt;0 の場合、
             ERDDAP™ 必要に応じてリモートデータセットからファイルをローカルにダウンロードします **キャッシュ** (データセット内)&lt;fileDir&gt;) は、指定された GB の数のしきい値サイズで指定します。
            * キャッシュは複数のデータファイルを保持するのに十分な大きさでなければなりません。
            * 一般的に、キャッシュが大きいほど、次の要求されたデータファイルが既にキャッシュにある可能性が高いからです。
            * キャッシュはいつしか使用すべき ERDDAP™ クラウドコンピューティングサーバーで実行中 (e.g.、AWS 計算インスタンス) クラウドストレージシステム内のリモートファイル (例:AWS S3) お問い合わせ
            * ローカルファイルによって使用されるディスクスペースがキャッシュを超えた場合 サイズGB、 ERDDAP™ お問い合わせ (多分すぐに) キャッシュされたファイルの削除 (現在、最近使用したLeastに基づいて (ログイン) アルゴリズム) ローカルファイルで使用されるディスク容量まで&lt;0.75\\*キャッシュサイズGB (「ゴール」) お問い合わせ はい、LRUが非常に悪い場合があります。完璧なアルゴリズムはありません。
            *    ERDDAP™ キャッシュされたファイルを削除しようとすることはありません。 ERDDAP™ 過去10秒で使用開始 これは、キャッシュシステムとデータファイルリーダーシステムにのみ緩やかに統合する欠陥システムです。 このルールのため、 ERDDAP™ その目標に到達するために十分なファイルを削除することはできません。この場合、WARNINGをlog.txtファイルに印刷し、システムがキャッシュをプルーンしようとする時間を大幅に無駄にし、キャッシュ内のファイルのサイズがCashSizeGBを大幅に上回る可能性がある。 今までに起きた場合は、そのデータセットの大きい cacheSizeGB 設定を使用してください。
            * 現在、 ERDDAP™ リモートサーバがローカルキャッシュにあるファイルの新しいバージョンを持っているかどうかはチェックしません。 この機能が必要な場合は、Chrisにメールでお問い合わせください。 noaaa.gov のジョン。
        * 同じタグ名の使用は、コピーシステムとキャッシュシステムが同じアンダーリングシステムを使用していることを意味するかもしれませんが、それは正しいものではありません。
            * コピーシステムは、データセットが再ロードされるたびに、タスクをタスクスレッドでダウンロードし、ファイルを変更します。 実際にローカルディレクトリにコピーしたファイルだけは、 ERDDAP™ データセット。
            * キャッシュシステムは、データセットがリロードされ、これらのすべてのファイルがすべてのファイルがすべてのファイルで利用可能であることを宣言するたびにリモートファイルリストを取得します ERDDAP™ データセット。 興味深いことに、すべてのリモートファイルがデータセットの /files/ Web ページに表示され、ダウンロードできます。 (ファイルが最初にリモートサーバからローカルキャッシュにダウンロードされる間、遅延が遅れるだけではありません。) 
        * cacheSizeGB を使用するデータセットは、使用から利益を得ることができます。 [nスレッド](#nthreads) 1よりも大きい設定は、データセットが1つ以上のリモートファイルを一度にダウンロードできるようにするためです。
    * ザ・オブ・ザ・&lt;cachePartialPathRegex&gt; タグは、データセットの代わりに指定できるまれに使われたタグです [&lt;pathRegex&gt; (#pathregex ディレクティブ) お問い合わせ デフォルトは null です。
        * デフォルトでデータセット全体をコピーする場合にのみ使用します。&lt;cacheSizeGB&gt; -1 の値。&lt;cacheSizeGB&gt; の値の &gt;1 は、非センシカルであるため無視されます。
        * [ドキュメント] を参照してください。&lt;pathRegex&gt; (#pathregex ディレクティブ) レグレックスの建設方法に関するガイダンス
        * これが指定されている場合は、データセットが再ロードされるたびに使用されます。ただし、データセットが1か月の初めに再読み込みされます。
        * これは、リモート・データセットがサブディレクトリの迷路に格納され、それらのファイルの大半がまれに、かつてないと変更する場合に便利です。 ( )&lt;ログイン NASAとは&lt;ログイン 例えば、例えば、&lt;cachePartialPathRegex&gt; は、現在の年または現在の月と一致します。 これらのregexeは、すべての部分的およびフルパス名が一致しなければならないので、指定するのは非常に難しいです&lt;cachePartialPathRegex&gt; と&lt;cachePartialPathRegex&gt; は、リモート URL とローカルディレクトリで動作しなければなりません。 実際の生活例は:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
上のサンプルURLは、年に基づいてサブディレクトリにファイルを持っています (2018年11月11日) 年末年始 (例:001、002、...、365、366) お問い合わせ
注意:&lt;キャッシュPartialPathRegex&gt; .\\* から始まる
その後、リモートURLとローカルディレクトリに共通する特定のサブディレクトリがあります。例えば、 /v4\\.1/
その後、最初のオプションが何もないネストされたキャプチャグループのシリーズを持っています
2番目のオプションは特定の値です。
            
上記の例は、2018年2月10日のディレクトリにのみ一致します。
            https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[ 2020年10月21日 このサーバは、もはや確実に利用可能ではありません。 \\]   
日 011, 012, ..., 019.
             (お問い合わせ [regex ドキュメント](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) そして、 [regexチュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) お問い合わせ)   
助けが必要な場合&lt;cachePartialPathRegex&gt; は、Eメールをお送りください。&lt;cacheFromUrl&gt; から Chris へ。 noaaa.gov のジョン。
            
        * 共通のアプローチ: 使用したい方&lt;cachePartialPathRegex&gt; は、最初に使用しません。 ERDDAP™ すべてのファイルを初期にダウンロードします。 アフター ERDDAP™ すべてのファイルをダウンロードし、データセットのチャンクに追加します。 datasets.xml お問い合わせ
             
##### ファイル数千{#thousands-of-files} 
データセットに何千ものファイルがある場合、 ERDDAP™ データセットからのデータリクエストに対する応答が遅くなる場合があります。 2つの問題があります。
 

1. ディレクトリごとのファイル数。
内部的に、 ERDDAP™ nファイルが1つのディレクトリにあるか、複数のディレクトリに分散しているかにかかわらず、同じ速度で動作します。
     
しかし、問題があります。 指定したディレクトリ内のファイルが増えると、オペレーティングシステムがディレクトリ内のファイルのリストを返すと遅くなります。 (ファイルごと) お問い合わせ ERDDAP お問い合わせ 応答時間は O である可能性があります。 (n ログ n) お問い合わせ 1つのディレクトリのファイル数が多すぎると言うのは難しいですが、10,000は多すぎます。 そのため、セットアップがたくさんのファイルを生成する場合、ここで推奨事項: 論理的に整理されたサブディレクトリにファイルを置く (例:駅・駅・駅・年) お問い合わせ
    
サブディレクトリを使用するもう1つの理由:ユーザーが使用したい場合は ERDDAP お問い合わせ "files" ステーションXの最古のファイルの名前を見つけるためのシステム, ファイルがステーション/年サブディレクトリにある場合、それはより速く、より効率的です, それほど情報が転送される必要があるため.
    
2. ファイルの総数。
表形式のデータセットの場合、 ERDDAP™ 各ファイルに各変数の値の範囲を追跡します。 ユーザがリクエストを作成するとき、 ERDDAP™ ユーザーの要求に一致するデータがあるかもしれないすべてのファイルからすべてのデータを読む必要があります。 ユーザーが限られた時間からデータを求める場合 (例えば、1日または1ヶ月) , それから ERDDAP™ データセットで複数のファイルを開く必要はありません。 しかし、ほぼすべてのファイルが一致するデータを持っている可能性がある極端な例があります (例: waterTemperature=13.2C) お問い合わせ お問い合わせ ERDDAP™ 少しの時間 (部分的に HDD の検索時間、部分的にファイルのヘッダを読む時間) 特定のファイルを開く (ディレクトリにたくさんのファイルがある場合など) , 重要な時間ペナルティは、そのファイルの総数の場合 ERDDAP™ 開くべきことは非常に大きいです。 1000枚のファイルが開けても、かなりの時間がかかります。 そのため、毎日ファイルをより大きな塊に定期的に統合する利点があります (例1年1駅) お問い合わせ 様々な理由でこれを行いたくないかもしれないが、より速い応答につながります。 極端な場合 (例:GTSPPデータセットに約35万個のソースファイルがあります。) , 膨大な数のソースファイルからデータを処理することは、 ERDDAP '単純なクエリに対する応答は時間を取ることができ、メモリのトンを使うことができます。 ソースファイルを小数に集約することで (GTSPP では、私は 720 今、 1 ヶ月あたりの 2 を持っています) , ERDDAP™ 迅速に対応できます。 お問い合わせ [ファイルの百万](#millions-of-files)   
     

N.B.ソリッドステートドライブは素晴らしい&#33; 最も速く、最も簡単で、最も安い方法で助ける ERDDAP™ 膨大な数の取引 (小さい) ファイルがソリッドステートドライブを使用することです。 お問い合わせ [ソリッドステートドライブは素晴らしいです&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
##### ファイルの百万{#millions-of-files} 
* 一部のデータセットには、何百万ものソースファイルがあります。 ERDDAP™ これを処理することができますが、混合結果で。
    
    * にリストされている変数だけを含む要求のため [&lt; subsetVariables &gt;&gt; (#サブセット変数) , ERDDAP™ データファイルからすでに抽出された必要な情報をすべて1つのファイルに保存されているため、非常に迅速に対応できます。
    * その他のご要望 ERDDAP™ データセットのスキャン [キャッシュされたファイル情報](#cached-file-information) リクエストに関連したデータがいくつかあるため、素早く対応できる可能性があることを確認しましょう。
    * しかし、他の要求のために (例えば、waterTemperature=18 度\\_C) どのファイルが関連データを持っているか、 ERDDAP™ 各ファイルがリクエストに関連するデータを持っているかどうかを確認するために多数のファイルを開く必要があります。 ファイルが連続して開きます。 任意のオペレーティングシステムと任意のファイルシステム (ソリッドステートドライブ以外の) 、これは長い間かかります (お問い合わせ ERDDAP™ ゆっくり反応する) ファイルシステムと本当に連携 (お問い合わせ ERDDAP™ 他のリクエストにゆっくりと対応) お問い合わせ
    
幸いにも解決策があります。
    
    1. 非公開でデータセットを設定する ERDDAP™   (パーソナルコンピュータ?) お問い合わせ
    2. シリーズをリクエストするスクリプトの作成と実行 .nc CFファイル、データセットの大きなチャンク、通常は期間 (例えば、指定した月の全てのデータ) お問い合わせ すべての結果ファイルが2GB未満であるように、期間を選択してください (しかし、1GB以上の大成功) お問い合わせ データセットがほぼリアルタイムのデータがある場合、スクリプトを実行して、現在の期間のファイルを再生します。 (例えば、今月) 頻繁に (10分毎に? 毎時?) お問い合わせ リクエスト ERDDAP™ お問い合わせ .nc CFファイルを作成する NetCDF v3の .nc 使用するファイル [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) 強烈な配列のデータ構造)。
    3. セットアップ [EDDTableFromNcCFファイル](#eddtablefromnccffiles) 公開データセット ERDDAP™ そこからデータを取得する .nc  (CFシリーズ) ファイル。 ERDDAP™ これらのファイルからデータをすばやく抽出できます。 そして今数十人や数百人だから (百万の代わりに) ファイルが、 ERDDAP™ ファイルのすべてを開く必要があります。
    
はい、このシステムはセットアップに時間と労力を要しますが、非常にうまく機能します。 ほとんどのデータリクエストは、以前よりも100倍速く処理できます。
     \\[ ボブはこれが可能性だったことを知ったが、最初にこのことをしたケビン・オビエンさんで、うまくいくことが示された。 今、 Bob は、約 18 百万のソースファイルを持つ GTSPP データセットにこれを使用します。 ERDDAP™ 現在、約500台を突破 .nc  (CFシリーズ) ファイル。 \\] 
    
N.B.ソリッドステートドライブは素晴らしい&#33; 最も速く、最も簡単で、最も安い方法で助ける ERDDAP™ 膨大な数の取引 (小さい) ファイルがソリッドステートドライブを使用することです。 お問い合わせ [ソリッドステートドライブは素晴らしいです&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
    
##### 巨大なファイル{#huge-files} 
* 単一の巨大なデータファイル (非常に巨大な ASCII データファイル) OutOfMemoryError を引き起こす可能性があります。 これが問題であるならば、それは明らかであるべきです ERDDAP™ データセットをロードできません。 feasible なら、ファイルを複数のファイルに分割することです。 理想的には、ファイルを論理チャンクに分割できます。 たとえば、ファイルに20か月分のデータが含まれている場合は、1か月分のデータをそれぞれ20ファイルに分割します。 しかし、メインファイルが任意に分割されている場合でも利点があります。 このアプローチには複数の利点があります: a) データファイルを1/20に読み込むために必要なメモリを1つだけ減らします。 b) しばしば, ERDDAP™ 特定のリクエストのデータを見つけるために1つまたは少数のファイルを見る必要があるため、リクエストをはるかに迅速に対処できます。 c) データの収集が進行中の場合、既存の20ファイルが変更されていないままになり、データセットに次の月の値を追加するには、1つの小さな新しいファイルだけを変更する必要があります。
     
##### FTPのトラブル/アドバイス{#ftp-troubleadvice-1} 
* FTP の新しいデータファイルを FTP に更新する場合 ERDDAP™ サーバ間 ERDDAP™ 走るチャンスがあり、 ERDDAP™ FTP プロセス中にデータセットを再読み込みします。 思った以上に頻繁に起こります&#33; ファイルが起こると、ファイルが有効になります (有効な名前があります) ファイルが有効ではありません。 お問い合わせ ERDDAP™ その無効なファイルからデータを読み込み、結果のエラーは、ファイルが無効なファイルの表に追加される原因となります。 これは良いではありません。 この問題を回避するには、FTP ファイルの拡張子が ABC2005 の場合は一時ファイル名を使用します。 .nc \\_TEMP 。それから、fileNameRegexテスト (詳しくはこちら) これは関連するファイルではないことを示します。 FTP プロセスが完了したら、ファイルを正しい名前に変更します。 renaming プロセスは、ファイルを瞬時に関連づけるようになります。
    
##### ファイル名抽出物{#file-name-extracts} 
 \\[ この機能はDEPRECATEDです。 お問い合わせ [\\*\\*\\*fileName 擬似 sourceName ](#filename-sourcenames) 代わりに。 \\]   
EDDTableFromFiles は、各ファイル名から文字列を抽出し、擬似データ変数を作るためのシステムです。 現在、これらの文字列を日付/時刻として解釈するシステムはありません。 このシステムを設定するには、いくつかのXMLタグがあります。 このシステムの一部または全部を必要としない場合は、これらのタグを指定したり、""" 値を使用するだけです。

* preExtractRegex は [正規表現](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [チュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) ファイル名の先頭から削除されるテキストを識別するために使用されます。 regex が一致すれば除去だけ起こります。 通常はファイル名の先頭にマッチする「^」で始まります。
* ニュース ExtractRegexは、ファイル名の末尾から削除されるテキストを識別するために使用される正規表現です。 regex が一致すれば除去だけ起こります。 通常はファイル名の末尾にマッチする "$" で終了します。
* エキストラRegex 現時点では、preExtractRegex と postExtractRegex の後にこの正規表現が使われ、ファイル名から抽出される文字列を識別します。 (例えば、 stationID ) お問い合わせ regex が一致しない場合は、ファイル名全体が使用されます。 (マイナスプレエクストラクターとポスト エキストラ) お問い合わせ ".\\*" を使用して、preExtractRegex と postExtractRegex 後に残っているファイル名全体に一致させます。
* コラム NameForExtract は、抽出された文字列のデータ列のソース名です。 ツイート dataVariable お問い合わせ [ sourceName ](#sourcename) お問い合わせ dataVariable s リスト (任意のデータタイプで、通常は文字列) お問い合わせ

例えば、データセットにXYZAbleのような名前のファイルがある場合 .nc 、 XYZBaker .nc , XYZCharlie .nc 、...、新しい変数を作成したい ( stationID ) 各ファイルが読み込まれると、ステーション ID の値が (Able, Baker, チャーリー, ・・・) ファイル名から抽出され、これらのタグを使うことができます。

*   &lt;プレエクストラクターRegex&gt;^XYZ&lt;/preExtractRegex&gt;
初期 ^ は強制的な正規表現の特殊文字です ERDDAP™ ファイル名の先頭に XYZ を探します。 これにより、ファイル名の先頭にあるXYZが削除される (例えば、ファイル名 XYZAble .nc アブルになる .nc ) お問い合わせ
*   &lt;postExtractRegex&gt;\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .nc ドル&lt;/postExtractRegex&gt;
エンドの $ は、強制的な正規表現の特別な文字です ERDDAP™ お問い合わせ .nc ファイル名の最後に。 .は正規表現の特殊文字ですから (どのキャラクターにもマッチする) \\ としてエンコードされます。 詳しくはこちら (2Eは、期間の16進数文字数であるため) お問い合わせ この原因 .nc , ファイル名の最後に見つかった場合, 削除する (例えば、部分的なファイル名 アブル .nc アブルになる) お問い合わせ
*   &lt;抽出Regex&gt;.\\*&lt;/extractRegex&gt;
.\\* 正規表現はすべての残りの文字にマッチします (例えば、部分的なファイル名 Able は最初のファイルの抽出物になります) お問い合わせ
*   &lt;columnNameForExtract&gt; stationID &lt;/columnNameForExtract&gt;
これは、 ERDDAP™ 呼び出される新しいソース列を作成する stationID 各ファイルを読み込みます。 指定したファイルに対するデータ列には、そのファイル名から抽出されたテキストが表示されます。 (例えば、 アブル) 値として stationID カラム。

ほとんどの場合、同じ結果をもたらすこれらの抽出タグには多くの値があります。正規表現は非常に柔軟です。 しかし、いくつかのケースでは、目的の結果を手に入れる方法が1つあります。
     
##### サインイン sourceName ツイート{#pseudo-sourcenames} 
すべてのデータセットの全ての変数 ERDDAP™ [ ]&lt; sourceName &gt;&gt; (#ソース名) 変数のソースの名前を指定します。 EDDTableFromFiles はいくつかの擬似をサポートしています sourceName 他の場所から価値を抽出するs (例えば、ファイル名やグローバル属性の値) そして、その値がデータのチャンクの定数値の列であることを促進します (例えば、そのファイルのデータの表) お問い合わせ これらの変数では、変数のデータ型を[&lt;データタイプ&gt; (#データ型) タグ。 抽出された情報が dateTime 文字列の場合、dateTime 文字列の形式を指定します。 [unit 属性](#string-time-units) お問い合わせ 仮説 sourceName オプションは:
 
###### グローバル: sourceName ツイート{#global-sourcenames} 
各ソースデータファイルのグローバルメタデータ属性は、データの列となるよう推進することができます。 変数の場合&lt; sourceName &gt; フォーマットがあります
```
        <sourceName>global:*attributeName*</sourceName>
```
それから時 ERDDAP™ ファイルからデータを読み込みます。 ERDDAP™ その名のグローバル属性を探します (例えば、PI) 属性の値で埋め込まれたカラムを作成します。 これは、属性が異なるソースファイルで異なる値を持っている場合に便利です。そうしないと、ユーザはデータセット全体に対するそれらの値の1つしか表示されません。 例えば、
```
        <sourceName>global:PI</sourceName>
```
属性をデータとして宣伝する場合 ERDDAP™ 対応する属性を削除します。 これは、すべてのファイルに値が推定的に異なるため、適切です。 集計されたデータセットで ERDDAP™ 1つの値しかありません。 必要に応じて、追加することで、データセット全体に新しい値を追加できます。&lt;att 名称 *属性属性 お名前 (必須)* ツイート *新着情報 バリュー* &lt;/att&gt; データセットのグローバルに [&lt; addAttributes &gt;&gt; (#addattributes(アダットリブリュート)) お問い合わせ グローバルな属性の場合 ERDDAP™ たとえば、機関、属性に新しい値を追加する必要があります。
     
###### 変数: sourceName ツイート{#variable-sourcenames} 
各ファイルの変数のメタデータ属性は、データの列となるように推進することができます。 変数の場合&lt; [ sourceName ](#sourcename) \\&gt; 形式
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
それから時 ERDDAP™ ファイルからデータを読み込みます。 ERDDAP™ 指定された属性を探します (例えば、ID) 指定された変数の (例えば、器械) 属性の値で埋め込まれたカラムを作成します。 親変数 (例えば、器械) 必要ありません。 dataVariable データセットの定義に含まれているs ERDDAP お問い合わせ 例えば、
```
        <sourceName>variable:instrument:ID</sourceName>
```
これは、属性が異なるソースファイルで異なる値を持っている場合に便利です。そうしないと、ユーザはデータセット全体に対するそれらの値の1つしか表示されません。

属性をデータとして宣伝する場合 ERDDAP™ 対応する属性を削除します。 これは、すべてのファイルに値が推定的に異なるため、適切です。 集計されたデータセットで ERDDAP™ 1つの値しかありません。 必要に応じて、追加することで、データセット全体に新しい値を追加できます。&lt;att 名称 *属性属性 お名前 (必須)* ツイート *新着情報 バリュー* &lt;/att&gt; 変数 [&lt; addAttributes &gt;&gt; (#addattributes(アダットリブリュート)) お問い合わせ 属性について ERDDAP™ 例えば、 ioos\\_category   (セットアップに応じて) 属性に新しい値を追加する必要があります。
        
###### ファイル名 sourceName ツイート{#filename-sourcenames} 
ファイルの fileName の一部を抽出し、データの列であることを宣伝することができます。 この擬似のフォーマット [&lt; sourceName &gt;&gt; (#ソース名) お問い合わせ
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
例えば、
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
EDDTableFromFiles がファイルからデータを読み込みている場合は、fileName が必ず確認されます。 (例:A201807041442.slcpV1 .nc ) 指定された正規表現にマッチする (「正規表現」) そして指定を抽出して下さい (この場合、最初の) キャプチャグループ (これは括弧に囲まれた部分です) 例:「201807041442」 (お問い合わせ [regex ドキュメント](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) そして、 [regexチュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) お問い合わせ) regex は、引用符を囲むことなく文字列として指定することができます。 regex が周囲の引用符で文字列として指定されている場合は、文字列は [JSONスタイルの文字列](https://www.json.org/json-en.html)   (\\ 文字でエスケープされた特別な文字で) お問い合わせ キャプチャグループ番号は通常 1 (最初のキャプチャグループ) , しかし、任意の数であってもよい.
     
###### パス名 sourceName ツイート{#pathname-sourcenames} 
ファイルのフルパスの一部を抽出できます お名前 (必須) (/ディレクトリ/fileName.ext) データの列となるよう促します。 この擬似のフォーマット [&lt; sourceName &gt;&gt; (#ソース名) お問い合わせ
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
例えば、
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
EDDTableFromFiles がファイルからデータを読み込みている場合は、完全な pathName を確認します。 (例: /data/myDatasetID/BAY17/B201807041442 .nc お問い合わせ このテストでは、ディレクトリ区切り文字は常に '/' , 決して '\\' お問い合わせ) 指定された正規表現にマッチする (「正規表現」) そして指定を抽出して下さい (この場合、最初の) キャプチャグループ (これは括弧に囲まれた部分です) 例えば「BAY17」。 (お問い合わせ [regex ドキュメント](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) そして、 [regexチュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) お問い合わせ) regex は、引用符を囲むことなく文字列として指定することができます。 regex が周囲の引用符で文字列として指定されている場合は、文字列は [JSONスタイルの文字列](https://www.json.org/json-en.html)   (\\ 文字でエスケープされた特別な文字で) お問い合わせ キャプチャグループ番号は通常 1 (最初のキャプチャグループ) , しかし、任意の数であってもよい.
         
##### "0 ファイル" エラーメッセージ{#0-files-error-message-2} 
* 実行する [生成データセットXml](#generatedatasetsxml) または [ダスDds](#dasdds) または EDDTableFrom をロードしようとすると... ファイルのデータセット ERDDAP™ 「0ファイル」エラーメッセージが表示され、 ERDDAP™ ディレクトリに 0 の一致するファイルが見つかりました (そのディレクトリに一致するファイルがあると思うとき) : : :
    * ファイルがそのディレクトリにあることを確認してください。
    * ディレクトリ名のスペルを確認してください。
    * fileNameRegex をチェックします。 それは本当に、本当に簡単にregexesで間違いを作ることです。 テストの目的のために、すべてのファイル名に一致すべきregex .\\*を試してください。 (お問い合わせ [regex ドキュメント](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) そして、 [regexチュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) お問い合わせ) 
    * プログラムを実行しているユーザーを確認してください (例:user=tomcat (お問い合わせ) トムキャット/ ERDDAP ) これらのファイルに対する'read'許可が必要です。
    * 一部のオペレーティングシステム (例えば、SELinux) システム設定に応じて、プログラムを実行したユーザーは、ファイルを持つディレクトリに導くディレクトリ全体のチェーンに対する「読み込み」権限を持つ必要があります。
         
##### 標準化 新着情報{#standardizewhat} 
* EDDTableFromFiles のサブクラスがソースファイルのセットを集計する場合、指定した変数に対して、ソースファイルのすべてが複数の属性に対して同じ属性値を持つ必要があります。 scale\\_factor , add\\_offset , \\_Unsigned, missing\\_value , \\_FillValue, 単位). それについて考える: 1つのファイルがwindSpeed unit=knotsと別のファイルがwindSpeed unit=m/sを持っている場合は、2つのファイルからのデータ値が同じ集計されたデータセットに含まれているべきではありません。 そのため、EDDTableFromFiles が最初にデータセットを作成すると、属性値を 1 つのファイルから読み出し、それらの重要な属性に異なる値を持つすべてのファイルを拒否します。 ファイルのほとんどのコレクションでは、すべての変数の属性が一貫しているため、これは問題ではありません。 ただし、ファイルの他のコレクションについては、「悪い」ファイルとして拒否されたファイルの1%、10%、50%、90%、または99%につながります。 トラブルです。
    
EDDTableFrom ファイルには、この問題に対処するシステムがあります。 お問い合わせ 標準化 EDDTableFromFiles は、EDDTableFromFiles が、 EDDTableFromFiles が一貫性のあるかどうかを調べる直前に、ファイルを EDDTableFromFiles に示す設定です。
    
フリップ側は: データセットがこの問題がなければ、標準化を使用しないで下さい お問い合わせ 標準化 潜在的なリスクがいくつかあること (以下について) そして、非効率性。 そのため、実際に標準化の機能を必要としていない場合 何, 潜在的なリスクや不満に直面しる必要はありません。. 最大の不効率性: 様々な標準化時 どのようなオプションがデータセットによって使用されるか、ソースファイルが大幅に異なる方法でデータを格納していることを意味する (例えば、異なる scale\\_factor そして、 add\\_offset 、または異なるフォーマットを使用して時間文字列で) お問い合わせ そのため、ユーザリクエストで指定された制約のために、 ERDDAP™ すべてのソースファイルに適用できる単一のソースレベルの制約を作る。 お問い合わせ ERDDAP™ 影響を受ける制約をより高いレベルでのみ適用できます。 お問い合わせ ERDDAP™ より高い、宛先レベルの制約を適用する前に、より多くのファイルからデータを読み込みます。 そのため、標準化を使用するデータセットへのリクエスト 処理する時間が長くなります。
    
このシステムを使用するには、
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
お問い合わせ [ datasets.xml EDDTableFrom について ファイルデータセット](#eddtablefromfiles-skeleton-xml) (内)&lt;dataset&gt; タグ)。
    
ザ・オブ・ザ・ *標準化 新着情報* value は、EDDTableFromFiles が適用しようとする変更を指定します。 変更は、いくつかの組み合わせの合計です。
    
1. アンパック
これは、ファイル内の数値列を標準化するための多くの一般的で安全な操作を行います。
    * お問い合わせ scale\\_factor および/または add\\_offset 属性は存在し、それらを削除し、それらをデータ値のアンパックに適用します。
    * パックされていない属性 (例:実際の\\_min、実際の\\_max、 actual\\_range , data\\_min , data\\_max , データ\\_range, valid\\_min , valid\\_max , valid\\_range ) , 変数がパックされた場合, 属性値がパックされた場合 (これはトリッキーですが、合理的に信頼できる) お問い合わせ
    * \\_FillValueと/または missing\\_value 現在、これらのデータ値を変換する ERDDAP '標準" の欠損値: 整数型 MAX\\_VALUE (例えば, 127 バイト, 32,767 ショート, と 2,147,483,647 インッツ, 9223372036854775807 ロング) 二重および浮遊物のためのNaN。
    * 古い \\_FillValue と / または missing\\_value 属性 (お問い合わせ) \\_FillValue= で置き換える \\[ お問い合わせ ERDDAP™ 標準欠損値 \\] お問い合わせ
         
2. Numeric Timesの標準化
数値列にCF型数値時間単位がある場合 (ツイート *タイムユニット* お問い合わせ *ベースタイム* 「1900-01-01以来の日」) 、これは日付を変換します 時間値に "seconds since 1970-01-01T00:00:00Z" 値と単位属性を変更して、その値を示します。
これが選択されれば、この変数が持つ可能性がある scale\\_factor または add\\_offset , #1 選択する必要も.
     
3. 文字列を適用 missing\\_value   
文字列カラムに\\_FillValueと/または missing\\_value 属性は、これらの値を "" に変換し、属性を削除します。
     
4. 数字を見つける missing\\_value   
数値列が \\_FillValue や missing\\_value 属性、これは未定義の数値を識別しようとします missing\\_value   (例:-999, 9999, 1e37f) インスタンスを「標準」値に変換 (MAX\\_VALUE 整数タイプ、および NAN のダブルとフロート) お問い合わせ
     **このオプションにはリスクがあります。** 最大の有効なデータ値が不足している値のように見える場合 (例:999) すると、有効なデータ値が不足している値に変換されます (例:NaN) お問い合わせ
     
5. 文字列 "N/A" を "" に変更する
各文字列の列では、複数の文字列を一般的に変換して、行方不明の文字列値を "" に表示します。 現在、これは ".", "...", "-", "?", "??", "N/A", "NA", "none", "non", "null", "unspecified", "unspecified". 文字列の検索は、文字列がトリムされた後に大文字小文字を区別し、適用されます。 "nd" と "other" はリストには特にありません。
     **このオプションにはリスクがあります。** 有効な値であることを考慮する文字列を "" に変換できます。
     
6. 文字列ISO 8601 DateTimesへの標準化
各文字列列では、非純粋に数値文字列 dateTimes を変換しようとします。 (例:「Jan 2, 2018」) ISO 8601 文字列 dateTimes に (2018年01月02日) お問い合わせ
     **お問い合わせ** 列のすべてのデータ値が同じ形式を使用する必要があります。そうしないと、このオプションは与えられた列に変更を加えません。
     **このオプションにはリスクがあります。** よくある日付のように見えるように起こる文字列値を持つ列がある場合 時刻形式は ISO 8601 文字列 dateTimes に変換されます。
     
7. ISO 8601のDateTimesに密集したDateTimesを標準化して下さい
各文字列または整数型列の場合は、ピュアに数値文字列 dateTimes を変換してみてください。 (例:「20180102」) ISO 8601 文字列 dateTimes に (2018年01月02日) お問い合わせ
     **お問い合わせ** 列のすべてのデータ値が同じ形式を使用する必要があります。そうしないと、このオプションは与えられた列に変更を加えません。
     **このオプションにはリスクがあります。** コンパクトな日付ではない値を持つ列がある場合 タイムズは、コンパクトな dateTimes のように見えますが、ISO 8601 文字列 dateTimes に変換されます。
     
8. ユニットの標準化
これにより、各変数のユニット文字列を標準化します。 例えば、 "メートル/秒", "メートル/秒", "m.s^-1" , "m s-1" "m.s-1" はすべて "m.s-1" に変換されます。 データ値を変更しません。 この作品は有効 UDUNITS 単位の文字列, しかし、無効または複雑な文字列の問題を持つことができます. 特定の対のペアを指定することで問題に対処することができます&lt;スタンダード化ユニット&gt; お問い合わせ ERDDAP お問い合わせ
     \\[ トームキャット \\] /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml ファイル。 変更をChrisに送信してください。 noaaa.gov の John ではデフォルトの message.xml に組み込むことができます。
     **このオプションにはリスクがあります。** これは、複雑なユニットまたは無効なユニットを縮小する可能性があります。ただし、上記の回避策を使用して、問題が発生した場合に問題を回避することができます。
         
    
標準化のデフォルト値 何もしない 0 です。

正規化の値を変更したとき データセットが再ロードされる時、 ERDDAP™ 各ファイルに関するミニデータベースを再構築するために、データセット用のすべてのデータファイルを読み直します。 データセットにたくさんのファイルがある場合、これは長い間かかります。
    
注意:

* トリッキーなことです。
標準化 ソースファイル内のすべての列にどのような設定が使用されます。 そのため、例えば、 #2048 を使うと、圧縮文字列 dateTimes の列を ISO 8601 文字列 dateTimes に正常に変換するかもしれませんが、それはまた単にコンパクトな dateTimes のように見えるように起こる文字列で列を誤って変換するかもしれません。
     
*    datasets.xml と GenerateDatasets Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - Xml - X
特に正しい設定を取得するのは難しいです datasets.xml データセットを作成するには、必要な方法を使用します。 最高のアプローチ (常に) は:
    1. 使用条件 [生成データセットXml](#generatedatasetsxml) 標準化する値を指定します。 使用したいもの
    2. 使用条件 [ダスDds](#dasdds) データセットが正しく読み込まれ、標準化を反映するように 指定した設定について
    3. データセットを手でテストする ERDDAP™ 影響を受ける変数が期待どおりに動作するようにします。
         
* リスク -
オプション #256 以上は危険性が高い、すなわち、より大きなチャンスがある ERDDAP™ 行かない変更を行います。 例えば、オプション #2048 は、ISO 8601 "compact" の日付を見るために起こるステーション ID 文字列で変数を誤って変換する可能性があります。 (例: 20180102) ISO 8601への "extended" スケジュール (2018年01月02日) お問い合わせ
     
* 変更後のスロー --
標準化の大切さから EDDTableFromFiles が各データファイルで参照するデータ値の変更は、標準化を変更した場合 どのような設定を行うか、EDDTableFromFiles は、各ファイルに関するすべてのキャッシュされた情報を捨てます (各ファイル内の各データ変数の min と max を含む) 各データファイルを再読み込みします。 データセットに多数のファイルがある場合、これは非常に時間を消費することができますので、データセットが初めてリロードするのに長い時間がかかります ERDDAP™ 変更をしてから再読み込みします。
     
* ヒューリスティックス -
オプション #256 以降では、ヒューリスティックを使用して変更を行います。 ヒューリスティックスが悪い決定を下す状況に遭遇した場合は、Chrisに問題の説明をメールでお問い合わせください。 ノアのヨハネ。 そのため、ヒューリスティックスを改善することができます。
     
* 代替品 --
与えられたデータセットに問題が解決しない場合、あなたは問題を作ることによって問題を解決することができるかもしれない [ .nc ml ファイル](#ncml-files) すべてのデータファイルを並列化し、ファイルを一貫性のあるように、ファイル内の物事の変化を定義します。 その後、EDDTableFrom を指示します... ファイルを集計するためのデータセット .nc ml ファイル。
    
または、使用して下さい [ NCO ](#netcdf-operators-nco) ファイルを一貫性のあるように、実際にファイルに変更を加える。
        
##### 年、月、日付、時間、分、秒のための別のコラム{#separate-columns-for-year-month-date-hour-minute-second} 
年、月、日付、時間、分、秒ごとに異なる列を持つ表形式のデータファイルはかなり一般的です。 新着情報 ERDDAP™ v2.10 は、その列を統一した時間列にまとめるデータファイルを編集する唯一のソリューションでした。 と ERDDAP™ 2.10+ は、使用することができます
ツイート&lt; sourceName &gt;==== *パスワード* &lt; sourceName &gt;&gt; (#ソース名) お問い合わせ ERDDAP™ ソース列を結合して、統一された時間列を作る方法、ソースファイルを編集する必要はありません。
##### &lt;skipHeaderToRegex&gt; は、{#skipheadertoregex} 
* ツイート&lt;skipHeaderToRegex&gt; を飛ばす (#skipheadertoregex(スキーヘッド)) お問い合わせ
オプション (EDDTableFromAsciiFiles と EDDTableFromColumnarAsciiFiles データセットのみ。)   
EDDTableFromAsciiFiles がデータファイルを読み込むと、この正規表現にマッチする行を含む全ての行を無視します。 デフォルトは "" で、このオプションは使用しません。 例は
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
" で始まる行を含むすべての行を無視します。\\*\\*\\* ヘッダーのエンド。

このタグを使うと、&lt;columnNamesRow&gt; と&lt;firstDataRow&gt; ファイルが読み込まれる前にヘッダーが削除されたかのように動作します。 例えば、ヘッダの直後に列名が行にある場合は、 columnNamesRow=0 を使用します。

生成したいなら データセット このタグが必要なデータセットでXml:

1. 既存のファイルをコピーしてヘッダを削除することで、新しい、一時、サンプルファイルを作成します。
2. 実行生成 データセット Xml と、サンプルファイルを指定します。
3. 手動で追加する&lt;skipHeaderToRegex&gt; タグを datasets.xml チャンク。
4. 仮ファイル、サンプルファイルを削除します。
5. データセットを使用する ERDDAP お問い合わせ
##### &lt;skipLinesRegex&gt;{#skiplinesregex} 
オプション (EDDTableFromAsciiFiles と EDDTableFromColumnarAsciiFiles データセットのみ。)   
EDDTableFromAsciiFiles がデータファイルを読み込むと、この正規表現に一致する全ての行は無視されます。 デフォルトは "" で、このオプションは使用しません。 例は
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
"#" で始まる全ての行を無視します。

このタグを使うと、&lt;columnNamesRow&gt; と&lt;firstDataRow&gt; ファイルが読み込まれる前に、すべての一致行が削除されたかのように動作します。 例えば、ファイルの先頭に「#」など、複数の行が始まってもカラム名Row=0を使う。
    
#### EDDTableFromFiles スケルトンXML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiサービス{#eddtablefromasciiservice} 
 [ **EDDTableFromAsciiサービス** ](#eddtablefromasciiservice) 基本的にはスクリーンスクレーパーです。 データを要求するためのシンプルなWebサービスを持っているデータソースに対処することを意図しています (多くの場合、Webページ上のHTMLフォーム) 構造化された ASCII 形式でデータを返すことができます。 (たとえば、comma-separated-value または columnar ASCII のテキスト形式は、多くの場合、データの前後に、または後に他の情報で) お問い合わせ

EDDTableFromAsciiService は、EDDTableFromAsciiService クラスのスーパークラスです。 EDDTableFromAsciiServiceを直接使用することはできません。 代わりに、EDDTableFromAsciiService のサブクラスを使用して、特定の種類のサービスを処理する。

*    [EDDTableFromAsciiServiceNOSから](#eddtablefromasciiservicenos) からデータを取得する NOAA NOSのASCIIサービス。

現在、他のサービスタイプは対応しておりません。 しかし、同様の方法で作業する場合、通常、他のサービスをサポートするのは比較的簡単です。 リクエストがあればご連絡ください。

#### インフォメーション{#details} 
以下の情報は、EDDTableFromAsciiService のサブクラスすべてに適用されます。

* 制約 -- ERDDAP™ 表形式のデータリクエストは、任意の変数に制約を置くことができます。 基本的なサービスは、すべての変数の制約を許さない場合があります。 たとえば、駅名、緯度、経度、時間に関する制約のみをサポートする多くのサービス。 そのため、EDDTableFromAsciiServiceのサブクラスがデータセットのサブセットのリクエストを取得すると、ソースデータサービスにできるだけ多くの制約が渡され、ユーザーがデータを渡す前に、サービスによって返されたデータに対する残りの制約が適用されます。
* 有効な範囲 -- 他の多くのデータセットタイプとは異なり、EDDTableFromAsciiServiceは通常、各変数のデータ範囲がわからないため、有効な範囲の外でデータのリクエストを迅速に拒否することはできません。
* ASCII テキスト応答をパースする -- EDDTableFromAsciiService が ASCII テキスト サービスから応答を取得する場合、応答が期待される形式と情報を持っていることを検証し、データを抽出する必要があります。 このデータセットのXMLのチャンクで様々な特別なタグを使用してフォーマットを指定できます。
    *   &lt;beforeData1&gt; を通して&lt;beforeData10&gt; タグ -- 一連のテキストを指定できます (あなたが望む限り、最大10) EDDTableFromAsciiService は、サービスによって返される ASCII テキストのヘッダで見なければなりません。&lt;beforeData1&gt; を通して&lt;前のデータ10&gt; たとえば、これは、期待する単位を使用して、レスポンスが期待する変数を含むことを検証するのに便利です。 最後の beforeData タグは、データが始まる直前に発生したテキストを識別します。
    *   &lt;アフターデータ&gt; お問い合わせ これにより、EDDTableFromAsciiService が、データの末尾を示すサービスによって返される ASCII テキストで探すテキストを指定します。
    *   &lt;ノーデータ&gt; お問い合わせ EDDTableFromAsciiService がサービスによって返される ASCII テキストでこのテキストを見つけた場合、リクエストに一致するデータがないと結論付けます。
#### EDDTableFromAsciiServiceスケルトンXML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiServiceNOSから{#eddtablefromasciiservicenos} 
 [ **EDDTableFromAsciiServiceNOSから** ](#eddtablefromasciiservicenos) 提供する ASCII テキストデータサービスから EDDTable のデータセットを作成します。 NOAA お問い合わせ [国民の海洋サービス (ノーズ) ](https://oceanservice.noaa.gov/) お問い合わせ このクラスの使い方や使い方については、このクラスのスーパークラスをご覧ください。 [EDDTableFromAsciiサービス](#eddtablefromasciiservice) お問い合わせ ボブサイモン以外の誰もがこのサブクラスを使用する必要があるとは違います。

NOSサービスからの応答内のデータが、カラムの ASCII テキスト形式を使用しているため、緯度と経度以外のデータ変数は、各データ行のどの文字がその変数のデータを含むかを指定する特殊な属性を持つ必要があります。
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllデータセット{#eddtablefromalldatasets} 
 [ **EDDTableFromAllデータセット** ](#eddtablefromalldatasets) 現在ロードされている他のすべてのデータセットに関する情報が高レベルのデータセットです。 ERDDAP お問い合わせ 他の種類のデータセットとは異なり、 allDatasets データセット datasets.xml お問い合わせ ERDDAP™ 自動的に 1 つの EDDTableFromAllDatasets データセットを作成します (お問い合わせ datasetID パスワード allDatasets ) お問い合わせ したがって、 allDatasets 各データセットが作成されます ERDDAP™ 取付けはそれぞれ同じ方法で働きます ERDDAP™ インストール。

ザ・オブ・ザ・ allDatasets データセットは、表形式のデータセットです。 各データセットの情報は行なっています。 それぞれのデータセットに関する情報を持つ列があります。 datasetID 、アクセス可能、機関、タイトル、minLongitude、maxLatitude、maxLatitude、minTime、maxTime、等。 なので allDatasets タブラデータセットで、他のタブラデータセットをクエリできるのと同じ方法でクエリできます。 ERDDAP™ レスポンスのファイルタイプを指定できます。 これにより、ユーザーは非常に強力な方法で関心のあるデータセットを検索できます。
 
### EDDTableFromAsciiFiles (EDDTableFromAsciiFiles) からの投稿{#eddtablefromasciifiles} 
 [ **EDDTableFromAsciiFiles (EDDTableFromAsciiFiles) からの投稿** ](#eddtablefromasciifiles) comma-, tab-, Semicolon-, またはスペース分離した ASCII データファイルからデータを集計します。

* ほとんどの場合、ファイルは最初の行と2番目の行で始まるデータに列名が表示されます。 (ここでは、ファイルの最初の行は行番号1と呼ばれます。) しかし、あなたは使用することができます&lt;columnNamesRow&gt; と&lt;最初のDataRow&gt; で datasets.xml 異なる行番号を指定するファイル。
*    ERDDAP™ データの行が異なるデータ値を持つことを可能にします。 ERDDAP™ 不足しているデータ値が行の最終列であると仮定します。 ERDDAP™ 不足しているデータ値の標準的な欠落値値を割り当てます。 (追加 v1.56) 
* ASCII ファイルは簡単に使用できますが、データを保存/取得するための最も効率的な方法ではありません。 より大きい効率のために、ファイルをとして保存して下さい NetCDF v3の .nc ファイル (すべての変数によって共有される1つの次元、"row"を使って) 代わりに。 お問い合わせ [使用方法 ERDDAP™ 新しいファイルを生成する](#millions-of-files) お問い合わせ
* このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 ASCII ファイルのメタデータの総欠如のため、GenerateDatasetsXml の結果を編集する必要があります。
* 警告: いつ ERDDAP™ 指定した行のエラーが見つかられば、ASCII のデータファイルを読み込みます。 (例えば、誤ったアイテム数) 警告メッセージ (「警告: 悪い行 (ツイート) データ "... 続いて行の悪い行のリストを持つ) お問い合わせ [log.txt ファイル](/docs/server-admin/additional-information#log) データファイルの残りの部分を引き続き読み続けます。 そのため、定期的に見ることがあなたの責任です。 (スクリプトを書くか、) ログ内のメッセージ txt では、データファイル内の問題を解決できるようにします。 ERDDAP™ ユーザーがファイルの一部行が欠陥を持っているにもかかわらず、利用可能なすべての有効なデータを読み続けることができるように、このように設定されています。
     
### EDDTableFromの特長 AwsXmlファイル{#eddtablefromawsxmlfiles} 
 [ **EDDTableFromの特長 AwsXmlファイル** ](#eddtablefromawsxmlfiles) 自動気象ステーションのセットからデータを集計 (ツイート) WeatherBug Rest XML APIを使用したXMLデータファイル (もはや活動しません) お問い合わせ

* このタイプのファイルは、データを保存するシンプルで非効率な方法です。各ファイルが1つの時点から観測を含むように見えるからです。 そのため、多数のファイルが存在します。 パフォーマンスを改善したい場合は、観察グループの統合を検討してください (週分の料金) お問い合わせ NetCDF v3の .nc ファイル (最高: .nc ファイルとファイル [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) 目立たせられた配列のフォーマット](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) 使用して [EDDTableFromMultidimNcファイル](#eddtablefrommultidimncfiles)   (または [EDDTableFromNcCFファイル](#eddtablefromnccffiles) ) データを配信する お問い合わせ [使用方法 ERDDAP™ 新しいファイルを生成する](#millions-of-files) お問い合わせ
* このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。
     
### EDDTableFromColumnarAsciiFilesから{#eddtablefromcolumnarasciifiles} 
 [ **EDDTableFromColumnarAsciiFilesから** ](#eddtablefromcolumnarasciifiles) 固定幅の列を持つ表形式の ASCII データファイルからデータを集計します。

* ほとんどの場合、ファイルは最初の行と2番目の行で始まるデータに列名が表示されます。 ファイルの最初の行/列は行#1と呼ばれます。 しかし、あなたは使用することができます&lt;columnNamesRow&gt; と&lt;最初のDataRow&gt; で datasets.xml 異なる行番号を指定するファイル。
* ザ・オブ・ザ・&lt; addAttributes &gt; それぞれ&lt; dataVariable &gt; これらのデータセットには、次の2つの特別な属性が含まれます。
    
    *   &lt;att name="startColumn"&gt; *インテガー* &lt;att&gt; -- このデータ変数の開始である各行の文字列を指定します。
    *   &lt;att 名前="stopColumn"&gt; *インテガー* &lt;att&gt; -- このデータ変数の最後に 1 である各行の文字列を指定します。
    
最初の文字列は列#0と呼ばれます。
たとえば、このファイルでは、温度値の割り当てを時間値とする:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
時間データ変数は、
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
と時刻データ変数は
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
これらの属性は、すべての変数に指定される必要があります。 [固定値](#fixed-value-sourcenames) そして、 [ファイル名](#filename-sourcenames) 変数。
* ASCII ファイルは簡単に使用できますが、データを保存/取得するための効率的な方法ではありません。 より大きい効率のために、ファイルをとして保存して下さい NetCDF v3の .nc ファイル (すべての変数によって共有される1つの次元、"row"を使って) 代わりに。 お問い合わせ [使用方法 ERDDAP™ 新しいファイルを生成する](#millions-of-files) お問い合わせ
* このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 各データ列の開始位置と終了位置を判断し、ASCIIファイルのメタデータの総欠如を判断する難しさのために、GenerateDatasetsXmlから結果を編集する必要があります。
     
### EDDTableFromHttpGetの特長{#eddtablefromhttpget} 
EDDTableの特長 FromHttpGet は他のすべての種類のデータセットと異なる ERDDAP™ 特定の "authors" が定期的にデータを追加したり、データを修正したり、データセットからデータを削除したりできるシステムを持っていること HTTP GET または [ポスト](#http-post) コンピュータプログラム、スクリプト、ブラウザからのリクエスト。 データセットは、他のすべてのEDDTableデータセットがクエリできるのと同じ方法でユーザーによって照会可能です。 ERDDAP お問い合わせ このクラスのスーパークラスの説明を参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) , そのスーパークラスから継承されている機能について読みます.

EDDTableFromHttpGet のユニークな機能は、以下に記載されています。 この初期セクションをすべて読み、それを理解する必要があります。それ以外の場合は、現実的な期待を持っているか、修正が難しい問題に自分自身を得る可能性があります。

#### 意図した使用{#intended-use} 
このシステムは、以下のために意図されています。

* タプル (サインイン) データ、グリッドデータではなく。
* リアルタイムデータ -
目標は、著者を許可することです (例えば、センサー、自動QCスクリプト、または特定の人間) データセットに変更を加える (フォロー [.insert または .delete コマンド](#insert-and-delete) ) その変更をアクセス可能にするために ERDDAP™ ユーザは1秒未満で、おそらくはるかに高速です。 その1秒はネットワーク時間です。 ERDDAP™ リクエストを1ms程度で処理でき、データがすぐにアクセス可能です。 これは、 [高速](#httpget-speed) , [堅牢な](#robust) と [信頼できるシステム](#system-reliability) お問い合わせ
* ほぼすべてのデータの頻度 -
このシステムは、不十分なデータを受け入れることができます (例:毎日) 非常に頻繁にデータを通して (例:100Hzのデータ) お問い合わせ システムを最適化すれば、より高い頻度データを扱うことができます (極端に行けばおそらく10のKHzデータ) お問い合わせ
* 1つのセンサーまたは類似センサーの収集からのデータ。
*    [バージョン](#versioning) / / / / [再生科学](https://en.wikipedia.org/wiki/Reproducibility) / / / / DOI お問い合わせ
データを変更できるようにする必要がある状況 (例えば、品質管理の旗を変えて下さい) , 著者が各変更を行ったか知っている, 著者が変更を行ったときのタイムスタンプを知っている, そして (リクエストに応じて) 変更前の元のデータを見ることができます。 したがって、これらのデータセットは、 [ DOI ツイート](https://en.wikipedia.org/wiki/Digital_object_identifier) お問い合わせ 彼らが会うので DOI 集計を除いて、データセットが変更されていない要件。 一般的には、リアルタイムのデータセットが対象外です。 DOI s データがレトロアクティブに変更されることが多いため (e.g.、QA/QCの目的のために) お問い合わせ
     

データが EDDTableFromHttpGet のデータセットにあると、他の EDDTable データセットからデータを要求するような方法でデータをリクエストできます。
     
#### 実験: お問い合わせ{#experimental-be-careful} 
このシステムは新しく、失われた環境データが要求できないため、EDDTableFromHttpGetを実験的に処理する必要があります。 別のシステムから移行する場合は、新しいシステムがうまく機能する自信があるまで、古いシステムと新しいシステムを並行して実行してください。 (週または月、わずか時間または日) お問い合わせ この場合、システムが .insert と .delete の URL を EDDTableFromHttpGet データセット に分けてアーカイブすることを確認してください。 (Apache および/または Tomcat のログにすぎても) , 少なくともしばらくの間. また、すべてのケースでは、EDDTableFromHttpGet のデータセットによって作成されたデータファイルが外部のデータストレージデバイスに定期的にバックアップされていることを確認してください。 (注意: [ログイン](https://en.wikipedia.org/wiki/Rsync) . EDDTableFromHttpGet が作成したデータファイルを非常に効率的にバックアップできます。)   
     
#### .insert と .delete{#insert-and-delete} 

任意のデータセットのために ERDDAP™ への要求を送るとき、 ERDDAP™ データセット内のデータのサブセットには、レスポンスに必要なファイルタイプを指定します。例えば、.csv, .htmlTable , .nc , .json お問い合わせ EDDTableFromHttpの特長 インサートできる2つの追加「ファイルタイプ」をサポートするために、このシステムを拡張します (または変更) データセットでデータを削除するか:

* ログイン
    * '&' で区切られた key=value のペアで、標準の HTML フォームの応答のようにリクエストされます。 例えば、
        https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1  
インフォメーション ERDDAP™ データの追加または変更 stationID =46088 指定された時間。
    * この変更の作者はJohnSmithであり、キーはsomeKey1です。
    * URL には有効な値を含める必要があります。 (値が見つからない) すべてのために [ http 取得必須](#httpgetrequiredvariables-global-attribute) 
    * 値が値の場合 http お問い合わせ リクエストの変数 (例: stationID 時間と時間) 既にデータセットの行に値を付け、新しい値が有効に古い値を上書きする (以前の値がまだアクセス可能ですが、ユーザが以前のデータからデータをリクエストする場合 [バージョン](#versioning) データセットの) お問い合わせ
    * .insert URL は &timestamp= を含まない ( ERDDAP™ 値を生成する) または &command= (.insert で指定される (command=0 は) または .delete (コマンド = 1) ) お問い合わせ
    * .insert URL がデータセットにある他のカラムの値を指定しない場合は、ネイティブの欠落値となると仮定します。 (MAX\\_VALUE 整数データタイプ、Nan はフロートとダブルス、文字列の "") お問い合わせ
             
    * .deleteさん
        * '&' で区切られた key=value のペアで、標準の HTML フォームの応答のようにリクエストされます。 例えば、
            https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1  
インフォメーション ERDDAP™ データの削除 stationID 指定された時刻の=46088
        * この変更の作者はJohnSmithであり、キーはsomeKey1です。
        * URL は、URL を指定する必要があります。 [ http 取得必須](#httpgetrequiredvariables-global-attribute) リクエストで (例: stationID 時間と時間) お問い合わせ これらの値が既にデータセットの行の値を一致させる場合 (彼らは通常、) , 古い値は効果的に削除されます (以前の値がまだアクセス可能ですが、ユーザが以前のデータからデータをリクエストする場合 [バージョン](#versioning) データセットの) お問い合わせ
        * リクエストを認証するために必要な非HttpGetrequiredVariables以外の値を指定する必要はありません。
             
    
詳細:
    * .insert と .delete のリクエストは、標準の HTML フォームのレスポンスのようにフォーマットされ、key=value のペアは '&' で区切られます。 値は、 [パーセントエンコード](https://en.wikipedia.org/wiki/Percent-encoding) お問い合わせ したがって、特殊な文字をフォーム%HHにエンコードする必要があります。HHは文字の2桁の16進数値です。 通常、あなたはちょうど数の句読点文字を変換する必要があります: % に %25, に %26, 「に %22,&lt;%3C, =%3D, &gt;%3E, +%2B, | に%7C、 \\[ に%5B、 \\] %5D にスペースを %20 に変換し、#127 を超えるすべての文字を UTF-8 形式に変換し、UTF-8 の各バイトを %HH 形式に変換します。 (プログラマに助けを求める) お問い合わせ
    * .insert と .delete リクエストには、 [ http 取得必須](#httpgetrequiredvariables-global-attribute) 、例えば、 stationID そして時間。 .insert リクエストの場合、リクエストで指定されていない変数は、値が不足していると仮定します。 (整数変数の MAX\\_VALUE, フロート変数の NaN, 文字列変数の空の文字列) お問い合わせ .delete リクエストの場合、non-HttpGetrequired の値 変数 (作者以外は、必要な) 無視されます。
    * .insert と .delete のリクエストには、作者の名前と作者のキーをフォームauthor= のパラメーターで含める必要があります。 *投稿者\\_key* 要求の最後の変数として。 リクエスト全体が受け取られたことを最後に確認するためにこれを要求して下さい ERDDAP お問い合わせ 著者のみ (キーではなく) データファイルに保存されます。 許可されたリストを指定する必要があります *投稿者\\_key* 's はグローバル属性で [ http リソース](#httpgetkeys) 
    * .insert と .delete のパラメーターはスケーラ (シングル) フォーム内の任意の長さの値または配列 \\[ 値1、値2、値3、値N \\] お問い合わせ 指定したリクエストの場合、配列を持つ全ての変数は同じ値の配列を持つ必要があります。 (他のエラーです) お問い合わせ リクエストスケーラと配列の値がある場合、スケーラ値が指定された配列と同じ長さで配列になるようにレプリカされます。 stationID =46088 は、 stationID パスワード \\[ 46088,46088,46088 \\] お問い合わせ 配列はキーです [高いスループット](#httpget-speed) お問い合わせ 配列がなければ、.insert や .delete がリモートの作者から毎秒 8 行以上のデータにチャレンジするようになります。 (すべてのネットワークのオーバーヘッドのため) お問い合わせ 配列では、リモートセンサーから毎秒1000行以上のデータを .insert または .delete するのは簡単です。
    * .insertおよび.deleteは受け入れます (エラーメッセージなし) 整数が期待されると、ポイント番号を浮動させます。 この場合、データセットは整数値を丸めます。
    * .insertおよび.deleteは受け入れます (エラーメッセージなし) 変数のデータ型の範囲外にある整数と浮動小数。 この場合、データセットは値が値として保存されます。 ERDDAP ' は、そのデータ型に対するネイティブな欠損値 (MAX\\_VALUE は、フロートとダブルの整数型とNaNの整数) お問い合わせ
         
#### ソリューション{#response} 
.insert または .delete URL が成功した場合、HTTP レスポンスコードは 200 になります。 (お問い合わせ) 応答はテキストとテキストになります .json オブジェクト、例えば、
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
タイムスタンプにはミリ秒単位の精度があります。

.insert または .delete URL が失敗した場合は、200 以外の HTTP レスポンスコードを取得します。 (お問い合わせ) 、例えば、間違い403 不正なauthor\\_key 値を送信した場合は禁止します。 ERDDAP™ HTTPレスポンスコードを送信します (たとえば、 .json フォーマットされたエラー) それはインターネットで物事が行われる方法であり、システム内のどこにもエラーが発生する可能性があるためです (例えば、ネットワーク内で HTTP エラーを返す) お問い合わせ エラーがからある場合 ERDDAP™ 回答にはテキストが含まれている場合があります。 (コメントはありません .json ) 何が間違っていたのかを詳しく説明しましたが、HTTPレスポンスコード (200=Okay、何か他の問題は悩みます) .insert または .delete が成功したかどうかを確認する適切な方法です。 HTTP レスポンスコードが確認できない場合、または不便な場合は、応答テキストの "status":"success" を検索して、成功の信頼できる表示になります。
    
#### ログファイル{#log-files} 
EDDTableFromHttpGet が .insert と .delete コマンドを受信すると、ログファイル一式に関連したファイルへの情報を追加するだけです。それぞれは、それぞれに格納されているテーブルです。 [ジェイソン CSVファイルライン](https://jsonlines.org/examples/) お問い合わせ ユーザがデータをリクエストする場合、 ERDDAP™ 関連するログファイルをすばやく読み、作成した順序でデータセットの変更を適用し、ユーザーの制約によりリクエストをフィルタリングします。 ERDDAP™ データ。 要求 さまざまなログファイルへのデータの分割、さまざまな情報の保存 (例: コマンドのタイムスタンプ、コマンドが .insert か .delete であったか) データセットのセットアップのさまざまな側面と、すべてはそれを可能にします ERDDAP データを保存し、このデータセットからデータを迅速かつ効率的に取得します。
     
#### セキュリティと著者{#security-and-author} 
.insert と .delete コマンドは、&author= を含める必要があります。 *投稿者\\_key* author\\_key が作者の識別子で構成されている最後のパラメーターとして (あなたが選んだ: 名前、初期値、擬似番号) , アンダースコア, 秘密鍵. ザ・オブ・ザ・ ERDDAP™ 管理者は、いつでも変更できる有効なauthor\\_keyの値のリストを生成するために、著者と連携します。
EDDTableFromHttpGet が .insert または .delete コマンドを受信すると、authorID\\_key が最後のパラメーターで有効であることを確認します。 最後のパラメータなので、コマンドライン全体が到達したことを示します。 ERDDAP™ 捨てられなかった。 秘密鍵は、特定の著者だけがデータセットにデータを入力または削除する可能性があることを保証します。 ERDDAP™ authorID を抽出し、作者の変数にその値を保存します。これにより、データセットに与えられた変更について誰が責任を負っているかを見ることができます。
.insert と .delete コマンドは、 https:   (セキュア)   ERDDAP™ サイトマップ これにより、転送中の情報が秘密に保たれていることを確認します。
     
#### タイムスタンプ{#timestamp} 
ログシステムの一環として、EDDTableFromHttpGet はタイムスタンプを追加します。 (その時間 ERDDAP リクエストを受け取った) ログファイルに保存する各コマンドへ。 なので ERDDAP™ 作者ではなくタイムスタンプを生成し、異なる作者がクロックセットから少し異なる時間に変更を加えるかどうかは関係ありません。 タイムスタンプは、変更がデータセットに行われた時刻を確実に示します。
     
#### HTTP ホスト{#http-post} 
*    [「HTTP POSTとは?」](#http-post)   
スタッフ [ポスト](https://en.wikipedia.org/wiki/POST_(HTTP) )はよりよい代わりです (比較する HTTP GET ) クライアントから HTTP サーバに情報を送信する できるか、またはセキュリティを改善したい場合は、 GET の代わりに POST を使用して情報を送信する ERDDAP お問い合わせ POST は、GET と、 https 安全な方法でURLが送信されますが、URL全体が (author\\_key を含むパラメーターを含む) Apache、Tomcat、および ERDDAP™ ファイルが適切に保護されていない場合は、誰かがそれらを読み取ることができるログファイル。 POST では、パラメーターは安全な方法で送信され、ログファイルに書き込まれません。 POSTは、クライアントが機能し、クライアントソフトウェアによって広くサポートされていないが、プログラミング言語はそれをサポートするため少し難しくなっています。 GET または POST を介してデータセットに送信するコンテンツは、別の方法でフォーマットされるだけです。
     
####  http お問い合わせ 変数 グローバル属性{#httpgetrequiredvariables-global-attribute} 
このシステム全体が機能する重要な部分は、必要なグローバル属性です。 http お問い合わせ 変数は、コンマ区切りのリストです。 dataVariable データを一意に識別するソース名。 これは可能な限り最小限で、ほぼ常に時間変数を含める必要があります。 例えば、ここがおすすめです。 http お問い合わせ 各変数 [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)   (もちろん、データセットではID名が異なる場合があります。) : : :

* TimeSeriesの場合: stationID , 時間
* 軌跡のため:trajectoryID、時間
* プロフィールのため: 時間 (想定時間は Profile\\_id です。) , 深さ
* 時間系列 プロフィール: stationID , 時間 (想定時間は Profile\\_id です。) , 深さ
* トラジェクトリーのため プロフィール:trajectoryID、時間 (想定時間は Profile\\_id です。) , 深さ

    
TimeSeriesを例に挙げる:
.insert コマンドを 含む stationID =46088 と time=2016-06-23T19:53:00Z (他の変数のその他の値) : : :
* そのステーションとその時間に既存のデータがない場合、その効果はデータセットにデータを追加することになります。
* そのステーションとその時間に既存のデータがある場合、この新しいデータで既存のデータの行を置き換えることになります。 (もちろんですから ERDDAP™ 受け取るすべてのコマンドのログを保持し、古いデータはログに残っています。 この変更前のデータセットのバージョンからデータをリクエストする場合、古いデータが表示されます。)   
         
####  http GetDirectory構造{#httpgetdirectorystructure} 
*    [ http リソース 構造 グローバル属性とデータ (ログイン) ファイル名](#httpgetdirectorystructure)   
このシステム全体が効率的に機能する部分は、 ERDDAP™ 一連のデータを作成する (ログイン) データセットの異なるチャンクを持つファイル、それぞれ。 これらがうまく設定されている場合、 ERDDAP™ ほとんどのデータリクエストに対して迅速に対応できます。 この設定は、 http GetDirectoryStructure のグローバル属性は、相対的なファイル名のように見える文字列です。例えば、「 stationID /10years はディレクトリ構造の仕様です。 その部分は、データのディレクトリとファイル名を示す (ログイン) ファイルが組み立てられます。
    
    * 部分が整数である場合 (&gt;==== 1) プラス時間Period (ミリ秒、秒、分、時間、日付、月、年、または複数) , 例えば, 10years, その後 EDDTableFromHttpGet データセットは、データの行のタイム値を取ります (例: 2016-06-23T19:53:00Z) 、その精密にtuncated時間を計算して下さい (例:2010年) フォルダや fileName をそこから作成します。
        
目標は、データを各ファイルに合理的に大きなチャンクを取得することですが、2GB以下です。
        
    * それ以外の場合は、仕様の部分は、 dataVariable お問い合わせ sourceName 、例えば、 stationID お問い合わせ この場合、EDDTableFromHttpGet は、データの新しい行の変数の値からフォルダーまたはファイル名を作成します。 (例:「46088」) お問い合わせ
    
.insert と .delete コマンドのデータが特定のデータに保存されるため (ログイン) files, EDDTableFromHttpGet は通常 1 つまたは複数のデータを開く必要があります。 (ログイン) 特定のユーザー要求のデータを見つけるためのファイル。 それぞれのデータが (ログイン) file には、データセットのチャンクに関するすべての関連情報があり、EDDTableFromHttpGet が特定のバージョンを作るのは高速で簡単です。 (または現在のバージョン) そのファイルのデータセットの (データセット全体のリクエストされたバージョンを生成する必要はありません。) お問い合わせ
    
一般的なガイドラインは、データの量と頻度に基づいています。 データの行ごとに100バイトを想定した場合、
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
例えば、ディレクトリ構造が stationID /2ヶ月で2つのステーションからデータを投入 (46088 と 46155) 2015年12月～2016年5月 EDDTableFromHttp 46088 と 46155 という名前のディレクトリを作成し、2015-11 という名前のファイルを作成します。 .json 2016年01月01日 .json 2016年03月01日 .json 2016年05月08日 .json ログイン (各保有期間 関連する駅の2か月分のデータ) お問い合わせ 将来的には、.insert または .delete を使用してデータを変更または削除する場合、たとえば 2016-04-05T14:45:00Z、EDDTableFromHttp コマンドを46088/2016-03 に追加します。 .json l、関連するデータ (ログイン) ファイル。 データセットは、新しいステーションからデータを保持するために必要な追加のディレクトリを作成するため、将来的には、他のステーションのデータを追加するのは良いです。
    
####  http リソース{#httpgetkeys} 
すべてのEDDTable ログイン データセットを取得するには、グローバル属性が必要です http GetKeys は、許可された作者とその秘密鍵のリストをコンマ区切りのリストとして指定します。 *投稿者\\_key* 、例えば、 JohnSmith\\_someKey1、HOBOLogger\\_someKey2、QCScript59\\_someKey3。
* author\\_key は大文字を区別し、全 ASCII 文字 (#33 - #126, 任意のコンマなし, または ' 文字
* キーはパスワードのようなので、 &gt;=8 文字、推測が難しく、内部辞書の単語なしでなければなりません。 パスワードを扱いますので、それらをプライベートに保つ必要があります。
* 最初の '\\_' 文字はキーから作者を分離するので、作者名は '\\_' 文字を含まない (しかし、キーは) お問い合わせ
* 著者が 1 つ以上のauthor\\_key's、例えば JohnSmith\\_some キー1、JohnSmith\\_some キー7等
* この属性の値をいつでも変更できます。 変更は、データセットが読み込まれる次回に影響します。
* 公開される前に、データセットのグローバルアトリビュートから削除されます。
* データをインサートまたは削除するためのリクエストごとに、&author= を含める必要があります。 *投稿者\\_key* パラメータ。 キーの妥当性を検証した後、 ERDDAP™ 著者の部分だけを保存します (キーではなく) データファイルで。

#### セットアップ{#set-up} 

ここでは、EDDTableFromHttpGet のデータセットを設定するための推奨手順は次のとおりです。

1. このデータセットのデータを保持するメインディレクトリを作ります。 この例では /data/testGet/ を使うようにしましょう。 ユーザーが GenerateDatasetsXml を実行し、実行しているユーザ ERDDAP™ このディレクトリへのアクセスを読み込みます。
     
2. サンプルを作成するためにテキストエディタを使用する .json 拡張子を持つl CSVファイル .json ディレクトリ内の l
名前は重要ではありません。 たとえば、サンプルを呼び出すことができます。 .json ログイン
2ラインを作る .json l CSVファイル、最初の行とdummy/typical値の列名 (正しいデータ型) 第二線。 ここでは、コレクションに適したサンプルファイルです featureType =空気と水温を測定した時間シリーズデータ。
     \\[ お問い合わせ featureType =軌跡、変更する可能性があります stationID trajectoryID であること。 \\]   
     \\[ お問い合わせ featureType =プロファイル、変更する可能性があります stationID ProfileID で、深さ変数を追加します。 \\] 
    
     \\[ ツイート stationID お問い合わせ "time" , "緯度", "経度", "airTemp", "waterTemp", "timestamp", "author", "command" \\] 
     \\[ "myStation", "2018-06-25T17:00:00Z", 0.0, 0.0, 0.0, 0.0, "SomeBody", 0 \\] 
    
注意:
    * このファイルを最終的に削除するので、実際のデータ値が重要ではありませんが、正しいデータタイプでなければなりません。 同様に、ソースからの実際のデータが使用する時間変数は同じフォーマットを使うべきです。
    * すべての変数の場合、 sourceName 等しい意志 destinationName そのため、時刻、緯度、経度、時には深さ、または高度などの正しい/final変数名を、その情報を含む変数が含まれる場合に使用します。
    * 観察が行われた時間を記録する変数名はほぼ常にあります。 dataType 文字列は、 [文字列時間に適した単位](#string-time-units)   (例: yyyy-MM-dd 'T'HH:mm:ss.SSSZ' は、) またはデータ タイプ 倍と [数値時間に適した単位](#time-units)   (例:1970-01-01T00:00:00Z以降、またはその他の拠点時刻) お問い合わせ
    * 列の3つ (通常、最後の3) タイムスタンプ、作者、コマンドでなければなりません。
    * timestamp カラムは EDDTableFromHttpGet で使用し、指定したデータ行をデータファイルに追加したときに示すタイムスタンプを追加します。 1970-01-01T00:00:00Z以降、dataType の倍数と単位秒数があります。
    * dataType 文字列を持つ著者の列は、この行のデータを指定した権限の著者が記録するために使用されます。 認可された著者は、 [ http GetKeys グローバル属性](#httpgetkeys) お問い合わせ 鍵は指定されますが、 *投稿者\\_key* そして、そのフォームの "request" URL にあるので、著者の部分だけがデータファイルに保存されます。
    * dataType バイトのコマンド列は、この行のデータがインサートであるかどうかを示します。 (0 の 0) または削除 (1) お問い合わせ
         
3. GenerateDatasetを実行 Xml とそれを言う
    
    1. データセットのタイプはEDDTableFromHttpGetです
    2. ディレクトリは (この例について) /data/testの お問い合わせ
    3. サンプルファイルが (この例について) /data/testGet/スタートアップ .json ログイン
    4. ザ・オブ・ザ・ http お問い合わせ 変数は (この例について)   stationID , 時間 説明を参照してください。 [ http 取得必須](#httpgetrequiredvariables-global-attribute) お問い合わせ
    5. 5分以内にデータを収集する場合、 http この例の GetDirectoryStructure は stationID /2ヶ月 . 説明を参照してください。 [ http GetDirectory構造](#httpgetdirectorystructure) お問い合わせ
    6. ザ・オブ・ザ・ [ http リソース](#httpgetkeys) 
    
出力を追加する (チャンクの datasets.xml データセットの場合) お問い合わせ datasets.xml お問い合わせ
     
4. 編集する datasets.xml このデータセット用のチャンクで、正しく完了します。
確かに、すべての ? を置き換える? 正しい内容で。
     
5. お問い合わせ&lt;fileTableInMemory&gt; 設定:
    * データセットが通常頻繁な .insert および/または .delete リクエストを取得する場合は、これを true に設定します。 (例: 10秒ごとに1回以上) お問い合わせ これにより、EDDTableFromHttpGet が .insert や .delete リクエストに迅速に対応できます。 これを true に設定すると、EDDTableFromHttpGet は、定期的にファイルテーブルと関連情報をディスクに保存します。 (必要に応じて、約5秒) お問い合わせ
    * これを false に設定する (デフォルト) データセットが通常、 .insert および/または .delete リクエストが不足している場合 (例:10秒ごとに1回未満) お問い合わせ
         
6. 注意: 利用することも可能です。&lt;cacheFromUrl&gt; および関連する設定 datasets.xml EDDTableのため ログイン リモートEDDTableFromHttpGetデータセットのローカルコピーの作成と維持方法としてデータセットを取得する ERDDAP お問い合わせ ただし、この場合、このローカルデータセットは .insert と .delete リクエストを拒否します。

#### EDDTable の使用 FromHttpGet データセット{#using-eddtablefromhttpget-datasets} 

* 著者は "requests" を作ることができます。 [データセットからデータを入力または削除する](#insert-and-delete) お問い合わせ
     
* 実際のデータがデータセットに投入された後、元のサンプルデータファイルを削除できます。
     
* ユーザーは、他のEDDTableデータセットでデータセットからデータをリクエストできます。 ERDDAP お問い合わせ timestamp 列に制約がない場合、リクエストはデータセットの現在のバージョンからデータを取得します。 (インサートと削除コマンドをすべて処理した後のログファイルと再選別 http 取得必須) お問い合わせ
     
* ユーザーは、EDDTableFromHttpGet のデータセットに固有のリクエストを作成することもできます。
    * リクエストが含まれている場合&lt;または&lt;= タイムスタンプ列の制約, その後 ERDDAP™ ログファイルの行を指定したタイムスタンプまで処理します。 エフェクトでは、このタイムスタンプ値からデータセットに行われたすべての変更を一時的に削除します。 詳しくは、 [バージョン](#versioning) お問い合わせ
    * リクエストに &gt;, &gt;=, または = タイムスタンプカラムの制約が含まれている場合、例えば, &timestamp&lt;=0, それから ERDDAP™ インサートや削除コマンドを処理することなく、データファイルからデータをそのまま返します。
* 今後、ツールが構築されると想定しています。 (お問い合わせ お問い合わせ) これらのデータセットを扱うため。 たとえば、生ログファイルを読み込み、異なるキャリブレーション式を適用し、その派生情報と異なるデータセットを生成/更新するスクリプトがあるかもしれません。 スクリプトはリクエストを介して元のデータを取得できることに注意してください ERDDAP™   (スクリプトが動作する最も簡単なファイル形式でデータを取得する) .insert "requests" を使って新しいデータセットを生成/更新する ERDDAP お問い合わせ スクリプトは、データファイルへの直接アクセスを必要としません。 許可された作者のコンピューターに使用できます。
     

#### EDDTableFromHttpGetに関する詳細情報{#detailed-information-about-eddtablefromhttpget} 

トピックは次のとおりです。

*    [セットアップを変更&#33;](#dont-change-the-setup) 
*    [ログイン](#crud) 
*    [無効リクエスト](#invalidrequests) 
*    [スピード](#httpget-speed) 
*    [ロバスト](#robust) 
*    [システム信頼性](#system-reliability) 
*    [バージョン](#versioning) 
*    [「HTTP PUTとDELETEはどうですか?&#33;」](#https-put-and-delete) 
*    [インフォメーション](#httpget-notes) 
*    [基本理念のCHORDSのおかげで。](#thanks) 

詳細はこちら:

##### セットアップを変更&#33;{#dont-change-the-setup} 
データセットが作成され、データを追加したら、

* DON'T 追加または削除 dataVariable お問い合わせ
* DON'T 変更 sourceName または destinationName お問い合わせ dataVariable お問い合わせ
* DON'T データを変更 タイプの dataVariable お問い合わせ しかし、あなたは変更することができます dataVariable 'メタデータ。
* DON'T 変更 http お問い合わせ 変数 グローバルな属性。
* DON'T 変更 http GetDirectoryStructure グローバル属性。

これらのいずれかを変更する必要がある場合は、新しいデータセットを作成し、すべてのデータを新しいデータセットに転送します。
     
##### ログイン{#crud} 
コンピュータサイエンスでは、データセットで作業するための4つの基本コマンドが [クリエイト, READ, 更新, 削除 (ログイン) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) お問い合わせ SQL、リレーショナルデータベースと連携するための言語は、INSERT、SELECT、UPDATE、DELETEに等しい。 EDDTableFromHttpGet では、

* .insert は CREATE と UPDATE の組み合わせです。
* .delete は DELETE です。
* データのサブセットをリクエストするための定期的なシステムが READ です。

このように、EDDTableFromHttpGet は、データセットで作業するための基本的なすべてのコマンドをサポートしています。
     
* .insert または .delete のエラーなしのリクエストは HTTP ステータスコード=200 と JSON オブジェクトを返します。
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
2つのタイムスタンプ値は、インサートまたは削除されたデータの行のタイムスタンプ変数に保存されるミリ秒の同じミリ秒を表します。 ERDDAP™ これらのキーと値のペアの名前とフォーマットを変更しません。 ERDDAP™ 将来の JSON オブジェクトにキー値のペアを追加できます。
     
##### 無効リクエスト{#invalidrequests} 
Invalid .insert または .delete リクエストは、status=200 以外の HTTP エラーステータスコードを返し、データセットに変更を加えません。 これは、誤った著者情報、誤った変数名、異なる変数の異なる配列の長さ、欠落した必須変数、不足している変数値などを含む。 複数のデータファイルが要求される場合、リクエストの一部が成功し、一部が失敗する可能性があります。 しかし、リクエストを送信するセンサーが完全な故障として任意の故障を治療する場合、これは問題ではありません。 例えば、 ERDDAP™ インサート (または削除) 同じデータを2列に2回、最悪の場合、その情報は2回保存され、ログファイルで一緒に閉じられます。 トラブルの原因となるのは難しいです。
     
##### HttpGet 速度{#httpget-speed} 
.insert または .delete リクエストの場合 (カウントしない http オーバーヘッド) , ボールパークは、.insert または .delete の速度を数値化します。
.insert ごとの 1ms のデータ 1 列
.insert ごとの 2ms および配列のデータ 10 列 ( \\[  \\] )   
.insert ごとの 3ms および配列の 100 列のデータ ( \\[  \\] )   
.insert ごとの 13ms は配列のデータの 1000 列の ( \\[  \\] )   
明らかに配列はキーです [高いスループット](#httpget-speed) お問い合わせ 配列がなければ、.insert や .delete がリモートの作者から毎秒 8 行以上のデータにチャレンジするようになります。 (すべてのネットワークのオーバーヘッドのため) お問い合わせ 配列では、リモートセンサーから毎秒1000行以上のデータを .insert または .delete するのは簡単です。

大量のデータリクエストで、Tomcatの上限を最大クエリの長さに表示できます。 (デフォルトは8KBですか?) , しかし、それはあなたのmaxHttpHeaderSize設定を編集することによって増加することができます *トームキャット* /conf/server.xml の HTTP/1.1 コネクターの記入項目。

いつか ERDDAP™ JSON ライン CSV データの読み込み (ログイン) ファイルには、バイナリデータファイルを読むのに比べ、ペナルティが小さくなります。 読書時にこの時間ペナルティは、データを書くときにシステムの速度と堅牢性のために支払う合理的な価格だったと感じました (第一次の重要性) お問い合わせ

##### SSDシリーズ{#ssd} 
 [より大きい速度のため、](#ssd) お問い合わせ [ソリッドステートドライブ (SSDシリーズ) ](https://en.wikipedia.org/wiki/Solid-state_drive) データを保存します。 より高速なファイルアクセス時間 (&lt;ハードディスクドライブよりも0.1ms (3 - 12ミリ秒) お問い合わせ また、データ転送速度が速い (200 - 2500 MB/秒) ハードディスクドライブよりも (〜200 MB/秒) お問い合わせ 近年の費用はかなり下がっています。 初期のSSDは、与えられたブロックに多数の書き込みの後に問題がありましたが、この問題は大幅に減少しました。 SSD を使用してデータを一度に書き込むと、コンシューマーグレードの SSD でさえ (エンタープライズグレードのSSDよりもかなり高価です) 長く続くべきです。
    
##### ロバスト{#robust} 
可能な限り、簡単に作業ができます。
* システムは複数の糸を持つように設計されています (例:センサー、自動QCスクリプト、人間) 同じデータセットと同じファイルでも同時に動作する。 これの多くは、データを保存するためのログファイルアプローチを使用して、非常に単純なファイルタイプを使用することで可能です。 [ジェイソン CSVファイルライン](https://jsonlines.org/examples/) データの保存
* JSON ライン CSV へのもう 1 つの大きな利点は、ファイルが破損してしまった場合です。 (e.g. 行上のエラーのため無効) , テキストエディタでファイルを開き、問題を解決するのは簡単です。
* もう一つの利点は、ファイル内の行にエラーがある場合、システムはまだエラー行の前後に行のすべてのデータを読み込むことができます。 また、システムは、追加の .insert と .delete 情報をログアウトできます。
* 管理者アクセス可能な標準ファイルを使用する巨大な利点 (リレーショナルデータベースやCassandraや他のソフトウェアと比較して) : : : 維持しなければならない他のソフトウェアはありませんし、データを保存または取得するために実行する必要があります。 また、データがチャンクにあるため、常に標準的なファイルをバックアップするのは簡単です。 (しばらくすると、各駅の現行ファイルのみが変更されます。) お問い合わせ 対照的に、それはかなりの努力とシステムダウン時間を要し、データベースとCassandraから外部バックアップファイルを作成する。
         
##### システム信頼性{#system-reliability} 
1つのサーバーを1つのサーバーと期待するのは合理的です ERDDAP™ 99.9%稼働時間 - 年間約9時間のダウンタイム (でも、悪夜でも使える&#33;) お問い合わせ
あなたが勤勉で幸運な場合は、99.99%の稼働時間を得ることができます (年間53分のダウンタイム) , 更新のためのいくつかの再起動は、それほど時間がかかりますので、.
あなたは極端な措置を取る必要があります (別のバックアップ サーバー、無停電電源装置、バックアップ空気調節、24x7x365 人のサイトを監視するため等。) 99.999%の稼働時間にスリムなチャンスを持たせる (年ごとの 5.25 分 downtime) お問い合わせ でも、99.999%の稼働時間を達成するということは、非常に異なっていません (または 99.99%) 問題があなたの制御の外にあるため。 たとえば、Amazon Web Service と Google は、信頼できる Web サービスを提供しますが、そのうちの大きなセクションは数時間ダウンします。

みんなが望む ERDDAP™ 100%の稼働時間、または少なくとも「シックスニン」を持っている (99.9999%の稼働時間は年間32秒のダウンタイムを等しい) , しかし、あなたが費やす時間、労力、お金に関係なく、それを取得しようとしている方法はありません.

しかし、 ERDDAP™ アップタイムは本当の目標ではありません。 目標は信頼される造りです **システム** 、データを失うことはありません。 これは解決可能な問題です。

解決策は:データを送るコンピュータソフトウェアに欠陥許容を造ります ERDDAP お問い合わせ 具体的には、ソフトウェアがデータ待ちのキューを維持すべきである ERDDAP お問い合わせ キューにデータを追加すると、ソフトウェアは、応答をチェックする必要があります ERDDAP お問い合わせ データが受信されていない場合。 エラーはありません。ソフトウェアは、キュー内のデータを残す必要があります。 より多くのデータが生成され、キューに追加されると、ソフトウェアは再びキュー内のデータを .insert しようとする (多分と \\[  \\] システム) お問い合わせ 成功または失敗します。 失敗すると、あとでやってみます。 この方法で動作するようにソフトウェアを書くと、ソフトウェアが数日分のデータをキューに入れる準備ができたら、実際にセンサーのデータを100%アップロードする良いチャンスがあります ERDDAP お問い合わせ そして、あなたは大きな努力や費用を費やすことなくそれを行うだろう。

 \\[ 背景: こんな感じではなかった。 [これは、コンピュータネットワークが信頼性を達成する方法です。](https://en.wikipedia.org/wiki/Reliability_(computer_networking) ) ) コンピュータネットワークは、本質的に信頼できません。 1つのコンピュータから別のコンピュータにファイルを転送すると、ソフトウェアの送信は、いくつかのパケットが失われる可能性があることを知っています。 受信機から指定したパケットに対して、適切な認識が取れていない場合は、失われたパケットを返します。 このアプローチでは、比較的簡単な送信者と受信機ソフトウェアは、信頼できないネットワークの上に信頼性の高いファイル転送システムを構築することができます。 \\] 
    
##### JSON が CSV ファイルを並べる理由{#why-json-lines-csv-files} 
EDDTableFromHttpGet の使用 [ジェイソン CSVファイルライン](https://jsonlines.org/examples/) . データを保存するための 理由は次のとおりです。

* 主な理由は: JSON ライン CSV ファイルの単純性は、複数のスレッドが特定のファイルに書き込むことを可能にする高速で簡単かつ信頼性の高い方法を提供します (例:ファイル名に同期することで) お問い合わせ
* JSON ライン CSV ファイルが破損していた場合 (e.g. 行上のエラーのため無効) , EDDTableFromHttpGet は、エラー行の前と後のすべての行のすべてのデータをまだ読み込むことができます。 .insert と .delete システムは、データファイルに新しいデータを追加し続けることができます。
* JSON ライン CSV ファイルが ASCII ファイルなので、ファイルが破損してしまった場合、修正が容易になります。 (テキストエディタで) お問い合わせ
* JSONラインCSV対応 Unicode 文字列。
* JSON ライン CSV は可変長文字列をサポートしています (いくつかの最大長さに限定されない) お問い合わせ
* JSON ライン CSV は 64 ビット整数に対応 (ロング) お問い合わせ
* JSON ライン CSV の正式な性質と追加の構文 (古い学校 CSV 対) 特定の行が破損していないという追加の保証を提供します。

まずは使ってみた .nc 無制限の次元の3つのファイル。 しかし、問題がありました。

* 主な問題は: 複数のスレッドに書き込むための信頼できる方法はありません .nc 3つのファイル、スレッドが同期された方法で書き込みを行うことで協力している場合でも。
* もし .nc 3 ファイルが破損し、.insert と .delete システムがファイルを引き続き使用することはできません。
* なので .nc ファイルが破損した場合は3つのファイルがバイナリです。 (それらはマルチスレッドの問題のために行う) 難しく、修正できない。 修理に役立つツールはありません。
* CFは文字列のエンコーディングを指定する方法がないため、Unicode、UTF-8エンコーディングをサポートする公式な方法はありません。 \\_Encoding 属性をサポートするために CF を取得しようとしましたが、どの進捗もできませんでした。 ( Unidata \\_Encoding 属性をサポートしている。) 
*    .nc 固定長文字列のみをサポートする3つのファイル。 再び、CFを取得しようとしました。 Unidata 変数長文字列をサポートするためには、どの進捗もできなかった。
*    .nc 3つのファイルは、文字列変数から単一の文字変数を区別する簡単な方法をサポートしません。 再び、CFを取得しようとしました。 Unidata これらの2つのデータタイプを区別するためのシステムをサポートするために、, しかし、任意の進捗をすることはできませんでした.
*    .nc 3つのファイルは、指定されていないエンコーディングで8ビットの文字のみをサポートする。 再び、CFを取得しようとしました。 Unidata エンコーディングを指定するためのシステムをサポートするためには、どんな進捗もできませんでした。
*    .nc 3 ファイルは 64 ビット整数をサポートしていません (ロング) お問い合わせ 再び、CFを取得しようとしました。 Unidata 長いシステムをサポートするためには、進行をしませんでした。
         
##### バージョン{#versioning} 
EDDTable のため ログイン タイムスタンプと各変更の作者とデータセットのすべての変更のログを保存し、そのデータをいつでもすぐに再作成できます。 意味では、時間内に任意のポイントのためのバージョンがあります。 ユーザーのデータリクエストにタイムスタンプが含まれている場合&lt;=制約、例えば、&timestamp&lt;=2016-06-23T16:32:22.128Z (または任意の時間ポイント) 著者やコマンドの制約はありません。 ERDDAP™ 最初に、その時点でデータセットのバージョンを生成することにより、リクエストに応答します。 それから、 ERDDAP™ ユーザーの他の制約を、データに対するその他の要求と同様に適用します。 ERDDAP お問い合わせ EDDTableFromHttpGet は、非常に大きなデータセットでも、このプロセスが非常に高速かつ効率的なように設定されます。

同様に、データセットが...?timestamp&timestamp=maxを要求することによって更新されたとき、ユーザーは見つけることができます (タイムスタンプ) ログイン () 

また、データセットの任意のバージョンでは、ユーザーが変更したどの作者であるか、そしてそれらを作ったとき、データを要求するために、データを要求することができます。

このバージョン管理システムにより、 [再生科学](https://en.wikipedia.org/wiki/Reproducibility) 誰が、いつでも、データセットのバージョンからいつでもデータをリクエストすることができます。 当社が知っている他のシステムでは、この細かなバージョンアップは不可能です。 基礎的なメカニズムは、余分記憶スペースを必要としないで非常に能率的であり、処理の頭上は偽りなくです。

誰もがこのタイプの細かいバージョン管理を必要としているわけではありませんが、大きなデータ管理組織のコンテキストでは、非常に有用です (例:OOI、地球キューブ、データワン、 NOAA NCEIの特長) データセットが複数の著者を持つことができる場所 (例:センサー、自動QCスクリプト、ヒューマンエディタ) お問い合わせ

 \\[ 歴史:このタイプのバージョンアップの必要性は、私が最初に来た (ログイン) 2008年にOOIについて読んだり議論したりするとき。 当時、OOIは、Gitに基づいてバージョンアップするための面倒で遅い、非効率的なシステムを持っていた。 Gitは、それがのために設計されたもののために素晴らしいです, しかし、これではありません. 2008年、OOIの議論で、データ管理のための広範な、効率的な代替対OIシステムを設計しました。 ERDDAP™ その後、このバージョン管理システムを含む。 当時、OOIはバージョン管理システムにコミットし、代替品に興味を持たなかった。 2016年は、この計画の他の側面は、その場に落ち、実装を開始しました。 ほかのプロジェクトで作業する中断が多かったので、2018年までは終了しませんでした。 今でも、データセットを頻繁に変更するために、いつでもデータのバージョンにそのような迅速かつ簡単にアクセスできる他の科学的データシステムには気づいていません。 シンプルなファイルシステムでは提供していません。 リレーショナルデータベースは使用しません。 Cassandraはそうしません。 \\] 
    
##### HTTPS を置き、削除して下さい{#https-put-and-delete} 
*    [「HTTPS PUTとDELETEはどうですか?&#33;」](#https-put-and-delete)   
     [ハイパーテキスト転送プロトコル (スタッフ) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) ワールドワイドウェブの基本であり、ウェブページのURLが「始まる」という理由http://"または "https://"お問い合わせ HTTPS は、追加のセキュリティレイヤーで HTTP です。 毎日、ブラウザ、スクリプト、コンピュータプログラムが数百億のHTTPを作る (ツイート)   **お問い合わせ** リモートソースから情報を取得する要求. スタッフ (ツイート) その他にも [ライブラリ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) , かなりPUT (データをサーバーにプッシュする) と DELETE (サーバからDELETEデータへ) お問い合わせ はい、PUTとDELETEは、データを入力し、データを削除するための適切な方法です。 (ツイート) お問い合わせ GET は、HTTP で動作する全てのソフトウェアによってサポートされています。 (ツイート) お問い合わせ GETは、とても使いやすいです。 誰もがすでにGETで働く方法を知っているし、POSTを使用する方法を知っている (これは基本的にはGETと同じ方法で使用することができます) なので、EDDTableFromHttpGet は GET と POST で動作します。 少ない人 (コンピュータープログラマーも少ない) PUTとDELETEで働いた経験があります。 PUTとDELETEは、一般的にはコンピュータ言語でのみサポートされていますので、それらを使用するには、巧みなプログラムが必要です。 そのため、PUTとDELETEは通常、ツールが進化した方法を考えると、より面倒なアプローチです。
     
##### HttpGet ノート{#httpget-notes} 
*    [インフォメーション](#httpget-notes) 
    * なし dataVariable dataType=char があるかもしれません。 代わりに dataType=String を使用します。 dataType=char を実際に必要とすれば、Chris にメールを送ります。 noaaa.gov のジョン。
         
##### お問い合わせ{#thanks} 
*    [基本理念のCHORDSのおかげで。](#thanks)   
EDDTableFromHttpGetの基本的な考え方 (i.e.、使用 HTTP GET リクエストにデータを追加する) UCARの (NCARの?)   [クラウドホスト型リアルタイムデータサービス (ログイン) ](https://github.com/earthcubeprojects-chords) プロジェクト リクエストのパラメータの形式 (繰り返される *名前=値* , &'s で区切る) Webページ上のHTMLフォームで使用されているのと同じ標準フォーマットです。 シンプルで華麗なアイデアであり、さらにはそれで完全にメッシュするので ERDDAP タブラデータを扱うための既存のシステムです。 アイデアは視力で明らかですが、私は (ログイン) 考えなかった。 EDDTableFromHttpの特長 基本的な考え方を使用して、それを実装する方法のアイデアと組み合わせて、システムを作る ERDDAP™ データのアップロード GET を使用してシステムにデータをプッシュする基本的な考え方以外に、EDDTableFromHttpGet の実装は、CHORDS と完全に独立しており、異なる機能を備えています (例:ログファイル、データのチャンク、異なるセキュリティシステム、CRUDサポート、再現可能なデータ) お問い合わせ CHORDSへの暴露は単なるウェビナーでした。 私たちは、システムを別の方法で実装したいと思ったことをすぐに知ったので、コードを見たり、プロジェクトについて読んだりしませんでした。 しかし、私たちは基本的な考え方のために彼らに感謝しています。 CHORDSへの完全な参照は
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014年12月16日) お問い合わせ 地理科学のためのクラウドホスト型リアルタイムデータサービス (ログイン) ソフトウェア。 UCAR/NCAR -- 地球観測研究所。 [https://doi.org/10.5065/d6v1236q](https://doi.org/10.5065/d6v1236q)   
     
### EDDTableFromの特長 Hyrax ファイル{#eddtablefromhyraxfiles} 
 [ **EDDTableFromの特長 Hyrax ファイル** ](#eddtablefromhyraxfiles)   (非推奨) 複数の変数を持つデータファイルを集約し、それぞれに1つ以上の共有寸法 (例えば、時間、高度 (または深さ) 、緯度、経度) , によって提供される [ Hyrax   OPeNDAP サーバー](https://www.opendap.org/software/hyrax-data-server) お問い合わせ

* このデータセットタイプは **リリース** お問い合わせ 新しく、より一般的なソリューションは、 [キャッシュ EDDTable の FromUrl オプション ファイルから](#cachefromurl)   (または variant) リモートファイルのローカルコピーを作成し、ローカルファイルからデータを配信します。 ザ・オブ・ザ・&lt;cacheFromUrl&gt; オプションは、任意のタイプの表形式のデータファイルで使用できます。 **   
何らかの理由で動作させることができない場合は、Chris にメールを送ってください。 noaaa.gov のジョン。
2020年前の苦情がない場合、このデータセットタイプが削除される場合があります。 ** 
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
* ほとんどの場合、各ファイルが一番左に複数の値を持つ (はじめて) 次元、例えば、時間。
* ファイルが頻繁に (必要はない) 他の次元のための単一の価値があります (例えば、高度 (または深さ) 、緯度、経度) お問い合わせ
* 追加の次元でキャラクター変数を持つファイル (例えばnCharacters) お問い合わせ
*    Hyrax サーバは URL の "/dods-bin/nph-dods/" または "/opendap/" によって識別できます。
* このクラス画面は、 Hyrax 各ディレクトリ内のファイルのリストを持つWebページ。 このため、現在のフォーマットに非常に特異的です。 Hyrax サイトマップ 私達は調節することを試みます ERDDAP™ 将来のバージョンが将来のバージョンの場合の迅速な if/when Hyrax ファイルがリストされている方法を変更します。
* ザ・オブ・ザ・&lt;fileDir&gt; の設定は無視されます。 このクラスは、各リモートデータファイルのローカルコピーをダウンロードして作成するので、 ERDDAP™ ファイルを強制する 汚れて *bigParentディレクトリ* /コピー/ * datasetID * ....
* お問い合わせ&lt; sourceUrl &gt; では、データセットのベースディレクトリの URL を使用します。 Hyrax サーバ、例えば、
    &lt; sourceUrl ツイートhttp://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/&lt;/ / / / sourceUrl ツイート
     (しかし、1ラインに置く)   (ごめんなさい、サーバが利用できなくなったこと) お問い合わせ
ザ・オブ・ザ・ sourceUrl Webページは通常「 OPeNDAP サーバーインデックス \\[ ディレクトリ名 \\] 「トップ」
* このクラスは常に各リモートデータファイルのローカルコピーをダウンロードして作成するので、このデータセットをラップしないでください。 [EDDTableコピー](#eddtablecopy) お問い合わせ
* このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。
* 1D,2D,3D,4Dの一例をご覧いただけます。 [EDDTableFromNcFiles (EDDTableFromNcFiles) は、](#eddtablefromncfiles) お問い合わせ
     
### EDDTableFromInvalidCRAファイル{#eddtablefrominvalidcrafiles} 
 [ **EDDTableFromInvalidCRAファイル** ](#eddtablefrominvalidcrafiles) データを集計する NetCDF   (v3 または v4)   .nc 特定の、無効、CF DSG Contiguous Ragged Array の variant を使用するファイル (キュラ) ファイル。 しかし、 ERDDAP™ このファイルタイプをサポートし、使用し始めるべきでない無効なファイルタイプです。 現在、このファイルタイプを使用するグループが強く推奨されています ERDDAP™ 有効なCF DSG CRAファイルを生成し、これらのファイルを使用して停止します。

詳細: これらのファイルには、サンプル\\_dimension 属性を持つ複数の row\\_size 変数があります。 ファイルは複数のサンプルのために非CF標準ファイルです (ログイン) 寸法は、CF DSG仕様の一部ではない、この追加の規則と約束で、互いに解読し、関連づけられます。 「あなたは、与えられた例を関連付けることができます。 (temp\\_obs 次元) 特定の深さ値で (z\\_obs 次元、最も値の寸法) ですから: 温度行\\_size (与えられたキャストのために) 対応する深さ row\\_size に 0 または等しい (そのキャストのために)   (それはルールです) お問い合わせ そのため、温度行\\_size が 0 でなければ、そのキャストの n の温度値は、そのキャストの n 深さ値に直接関連します。 (それは約束です) お問い合わせ

これらのファイルに関する別の問題: プリンシパル\\_Investigator row\\_size 変数は、sample\\_dimension 属性を持たないし、上記の規則に従わない。

このデータセットタイプのサンプルファイルが見つかりますhttps://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020年10月21日 このサーバは、もはや確実に利用可能ではありません \\] お問い合わせ

このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。

強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。

最初に GenerateDataset を生成します。 質問に答えた後、このタイプのデータセットは、サンプルファイルのncdumpのような構造を印刷します。 そのため、GenerateDatasets で最初のループに対して、いくつかのgoofy 回答を入力すると Xmlは、少なくともあなたは、あなたが見ることができるかどうか ERDDAP™ ファイルが読み込まれ、どの寸法と変数がファイルにあるかを見ることができます。 それから、GenerateDatasetsXml を通して 2 番目のループに対してより良い答えを与えることができます。
 
### EDDTableFromJsonlCSVファイル{#eddtablefromjsonlcsvfiles} 
 [ **EDDTableFromJsonlCSVファイル** ](#eddtablefromjsonlcsvfiles) データを集計する [ジェイソン CSVファイルライン](https://jsonlines.org/examples/) お問い合わせ このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。

* jsonlines.org が言うと、この形式は "CSV よりもむしろ" (そして、法的に、連邦の従業員として、私はそれらに同意したり、同意したりすることはできません - どのようにクレイジーはそれですか?) お問い合わせ CSVは、当初のスプレッドシートプログラムに関連していた歴史上の手荷物によって、正式に定義されず、妨げられることはありません。 JSON ライン CSV, 比較で, 完全に定義され、広く使用されている JSON 規格への接続から利点, その接続から恩恵を有効にします。 Java スクリプトとスクリプト Java お問い合わせ 確かに、長い整数と文字列のUnicode文字のフルサポートがあり、他の特殊な文字を含む明確な方法があります。 (タブと改行) 文字列内で。
    
この形式は、特定のデータファイルの最後に追加の行を定期的に追加する必要があるデータセットのために特に優れています。 その理由と他のために (詳しくはこちら) , [EDDTableFromHttpGetの特長](#eddtablefromhttpget) Json Lines CSV ファイルをデータストレージに使用します。
    
* 入力ファイルはUTF-8エンコードされると仮定されます。 しかし、\\u を与えられた *ログイン* 特別な文字をエンコーディングするためのフォーマット (例:\\u20ac はユーロ文字のエンコーディングです。) \\u を使用して、7ビットの ASCII 文字のみを含むように、ファイルを書くオプションがあります。 *ログイン* 上記のすべての文字をエンコードするには #127.
     
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
    
質問に答えた後、GenerateDatasetsXml がこのタイプのデータセットで最初に行うことは、サンプルファイルの ncdump のような構造を印刷します。 そのため、GenerateDatasets で最初のループに対して、いくつかのgoofy 回答を入力すると Xmlは、少なくともあなたは、あなたが見ることができるかどうか ERDDAP™ ファイルが読み込まれ、どの寸法と変数がファイルにあるかを見ることができます。 それから、GenerateDatasetsXml を通して 2 番目のループに対してより良い答えを与えることができます。
    
* 警告: いつ ERDDAP™ JSON を読み込む 指定した行のエラーが見つかられば、CSV のデータファイルを行ないます。 (例えば、誤ったアイテム数) 警告メッセージ (「警告: 悪い行 (ツイート) データ "... 続いて行の悪い行のリストを持つ) お問い合わせ [log.txt ファイル](/docs/server-admin/additional-information#log) データファイルの残りの部分を引き続き読み続けます。 そのため、定期的に見ることがあなたの責任です。 (スクリプトを書くか、) ログ内のメッセージ txt では、データファイル内の問題を解決できるようにします。 ERDDAP™ ユーザーがファイルの一部行が欠陥を持っているにもかかわらず、利用可能なすべての有効なデータを読み続けることができるように、このように設定されています。
     
### EDDTableFromMultidimNcファイル{#eddtablefrommultidimncfiles} 
 [ **EDDTableFromMultidimNcファイル** ](#eddtablefrommultidimncfiles) データを集計する NetCDF   (v3 または v4)   .nc   (または [ .nc ミリリットル](#ncml-files) ) 複数の変数を持つファイル、それぞれに1つ以上の共有された次元があります。 ファイルには、追加次元の有無にかかわらず、文字変数が含まれている場合があります。 (例えば、 ストリング14) お問い合わせ このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。

* ファイルが多次元 CF DSG の variant の場合、このデータセットのタイプを代わりに使用して下さい [EDDTableFromNcCFファイル](#eddtablefromncfiles) お問い合わせ
     
* からの新しい表形式のデータセットの場合 .nc ファイル、古いことを試みる前にこの選択を使用します [EDDTableFromNcFiles (EDDTableFromNcFiles) は、](#eddtablefromncfiles) お問い合わせ このクラスのいくつかの利点は次のとおりです。
    * このクラスでは、さまざまなファイル構造からより多くの変数を読み込むことができます。 寸法を指定するとCSV (寸法名のコンマ区切りリスト) GenerateDatasetで Xml (または)&lt;寸法CSV&gt;で datasets.xml これらのデータセットの1つのための情報 ERDDAP™ これらの寸法の一部または全部を使用するソースファイル内の変数とすべてのスカラー変数のみを読みます。 次元がグループの場合、そのfullName を、例えば " *グループ名/寸法名* お問い合わせ
    * リクエストの制約に一致しない場合は、このクラスはファイルを素早く拒否することができます。 そのため、大規模なコレクションからのデータを読み込むことは、多くの場合、はるかに高速になります。
    * このクラスは真のchar変数を扱います (非String変数) お問い合わせ
    * このクラスは、作成者がNetcdf-javaの writeStrings を使用しなかったときに文字列変数をトリムできます。 (文字列の終端をマークするためにchar #0を付加する) お問い合わせ
    * このクラスは、特定の変数や寸法を欠く個々のファイルを扱う際に優れています。
    * このクラスでは、行のブロックを削除できます。 [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) 不完全な多次元配列ファイル](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)   
         
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
    
質問に答えた後、GenerateDatasetsXml がこのタイプのデータセットで最初に行うことは、サンプルファイルの ncdump のような構造を印刷します。 そのため、GenerateDatasets で最初のループに対して、いくつかのgoofy 回答を入力すると Xmlは、少なくともあなたは、あなたが見ることができるかどうか ERDDAP™ ファイルが読み込まれ、どの寸法と変数がファイルにあるかを見ることができます。 それから、GenerateDatasetsXml を通して 2 番目のループに対してより良い答えを与えることができます。
    
グループ -- 生成データセット Xml は「グループ」を尋ねます。 任意のグループを検索する "" を入力することができます。 *詳しくはこちら グループ* または " *一部グループ/一部サブグループ* " 特定のグループを検索するか、" \\[ ログイン \\] 「rootグループだけを検索する」 「グループ」の文字列が&lt;グループ&gt; datasets.xml データセットの情報 (ですが、 \\[ ログイン \\] "" は "") お問い合わせ
    
寸法CSV -- GenerateDatasets Xml は "DimensionsCSV" 文字列を要求します。 これは、一連の次元のソース名のコンマ区切り値のリストです。 生成データセット Xml は、サンプルのデータ変数のみを読みます。 .nc これらの寸法の一部または全部を使用するファイル (他の次元無し) , ファイル内のスケーラ変数のすべて, これらのデータ変数からデータセットを作る. 次元がグループの場合、そのfullName を、例えば " *グループ名/寸法名* お問い合わせ
何も指定しない場合 (空の文字列) , 生成データセット Xml は、最も次元の変数を探します。理論では、最も興味深いものになりますが、他のいくつかのグループのデータ変数からデータセットを作りたいと思う時もあります。
存在しない次元名を指定すれば (例:NO\\_MATCH) , ERDDAP™ scalar 変数のすべてを見つけます。
"DimensionsCSV" 文字列は&lt;寸法CSV&gt;で datasets.xml データセットのための情報。
    
#### 御馳走次元として{#treatdimensionsas} 
無効なカテゴリがあります .nc ファイル (CFルールに従わないため) 複数の次元があること (例えば, lat, lon, 時間) 1つの次元だけを使用していれば (例、時間) 例えば:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableFromMultidimNcFiles には、これらのファイルに対処するための特別な機能があります。グローバル属性「treatDimensionsAs」をデータセットにグローバルに追加する場合 addAttributes 、言うことができます ERDDAP™ 特定の次元を扱うため (例:latとlon) 別の次元だったら (例、時間) お問い合わせ "from" 寸法を指定して "to" 寸法を指定するコンマ区切りリストで、例えば
 <att name="treatDimensionsAs"> lat, lon, 時間 </att>   
それから ERDDAP™ ファイルがそのまま読み込まれます。
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
もちろん、リストの各寸法の現在のサイズは同じでなければなりません。そうでなければ、 ERDDAP™ ファイルを「Bad File」として扱います。

これらのファイルは CF ルールに従わないため無効です。 でも ERDDAP™ CFベースのソフトウェアツールが正しく読み取れないため、このようなファイルを作成することを強くお勧めします。 既にそのようなファイルがある場合、可能な限り迅速に有効なファイルでそれらを置き換えることを強くお勧めします。
    
### EDDTableFromNcFiles (EDDTableFromNcFiles) は、{#eddtablefromncfiles} 
 [ **EDDTableFromNcFiles (EDDTableFromNcFiles) は、** ](#eddtablefromncfiles) データを集計する NetCDF   (v3 または v4)   .nc   (または [ .nc ミリリットル](#ncml-files) ) ファイルとファイル [ザラー](https://github.com/zarr-developers/zarr-python) ファイル (バージョン 2.25 の) 複数の変数を使って、1つの共有された次元のそれぞれ (例えば、時間) 1つの共有次元以上 (例えば、時間、高度 (または深さ) 、緯度、経度) お問い合わせ ファイルが同じ寸法名でなければなりません。 特定のファイルには、各寸法の複数の値があり、異なるソースファイルでは値が異なる可能性があります。 追加の次元でキャラクター変数を持つファイル (例えば、 ストリング14) お問い合わせ このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。

Zarrファイルには少し異なる動作があり、fileNameRegex または pathRegex のいずれかで "zarr" を含める必要があります。

* もし、 .nc ファイルの 1 つを使用します。 [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ファイル形式, を使用してみてください [EDDTableFromNcCFファイル](#eddtablefromncfiles) これを試みる前に。
     
* からの新しい表形式のデータセットの場合 .nc ファイルを試し、新しいものを試みて下さい [EDDTableFromMultidimNcファイル](#eddtablefrommultidimncfiles) まずは。
     
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
    
質問に答えた後、GenerateDatasetsXml がこのタイプのデータセットで最初に行うことは、サンプルファイルの ncdump のような構造を印刷します。 そのため、GenerateDatasets で最初のループに対して、いくつかのgoofy 回答を入力すると Xmlは、少なくともあなたは、あなたが見ることができるかどうか ERDDAP™ ファイルが読み込まれ、どの寸法と変数がファイルにあるかを見ることができます。 それから、GenerateDatasetsXml を通して 2 番目のループに対してより良い答えを与えることができます。
    
寸法CSV -- GenerateDatasets Xml は "DimensionsCSV" 文字列を要求します。 これは、一連の次元のソース名のコンマ区切り値のリストです。 生成データセット Xml は、データ変数を内部で見つける .nc これらの次元の一部または全部を使用するファイル、すべてのスカラー変数、およびそれらのデータ変数からデータセットを作る。 何も指定しない場合 (空の文字列) , 生成データセット Xml は、最も次元の変数を探します。理論では、最も興味深いものになりますが、他のいくつかのグループのデータ変数からデータセットを作りたいと思う時もあります。
    
* 1D例: 1Dファイルが2D、3D、4D、...ファイルと若干異なります。
    * あなたはセットを持っているかもしれません .nc 各ファイルが1か月分の1つのドリフトブイからデータの価値を持っているデータファイル。
    * 各ファイルが1つの次元、例えば、時間 (サイズ = \\[ 詳しくはこちら \\] ) お問い合わせ
    * 各ファイルは、例えば、時間、経度、緯度、空気の温度、など、その寸法を使用する1つ以上の1D変数を持っています。
    * 各ファイルは2D文字変数を、例えば次元と持つかもしれません (時間、nCharacters) お問い合わせ
         
* 2D例:
    * あなたはセットを持っているかもしれません .nc 各ファイルが1か月分の1つのドリフトブイからデータの価値を持っているデータファイル。
    * 各ファイルには2つの次元があります。例えば、時間 (サイズ = \\[ 詳しくはこちら \\] ) と id (サイズ = 1) お問い合わせ
    * 各ファイルは、次元と同じ名前の2つの1D変数を持ち、例えば、時間 (タイムタイム) , id (ログイン) お問い合わせ これらの1D変数はリストに含まれているべきです&lt; dataVariable &gt;'s は、データセットの XML にあります。
    * 各ファイルは、例えば、経度、緯度、空気温度、水温、水温などの1つ以上の2D変数を持っています...
    * 各ファイルには3D文字変数(例:寸法)があります。 (時間、id、nCharacters) お問い合わせ
         
* 3D例:
    * あなたはセットを持っているかもしれません .nc 各ファイルが1か月分の1つの文房具からデータの価値があるデータファイル。
    * 各ファイルは3次元、例えば時間を持っています (サイズ = \\[ 詳しくはこちら \\] ) , レイト (サイズ = 1) , と lon (サイズ = 1) お問い合わせ
    * 各ファイルは、次元と同じ名前の3つの1D変数を持ち、例えば、時間 (タイムタイム) , レイト (ログイン) , ロン (ログイン) お問い合わせ これらの1D変数はリストに含まれているべきです&lt; dataVariable &gt;'s は、データセットの XML にあります。
    * 各ファイルは、例えば、空気温度、水温、...
    * 各ファイルには、4D 文字変数(例: 寸法) があります。 (時間,lat,lon,nCharacters) お問い合わせ
    * ファイル名は、ファイル名内の buoy の名前が含まれている場合があります。
         
* 4D例:
    * あなたはセットを持っているかもしれません .nc 各ファイルが1つのステーションから1か月分のデータを持つデータファイル。 毎回、各駅は一連の深さで読書をします。
    * 各ファイルは4次元、例えば時間を持っています (サイズ = \\[ 詳しくはこちら \\] ) , 深さ (サイズ = \\[ 詳しくはこちら \\] ) , レイト (サイズ = 1) , と lon (サイズ = 1) お問い合わせ
    * 各ファイルは、次元と同じ名前の4つの1D変数を持ち、例えば、時間 (タイムタイム) , 深さ (深さ:) , レイト (ログイン) , ロン (ログイン) お問い合わせ これらの1D変数はリストに含まれているべきです&lt; dataVariable &gt;'s は、データセットの XML にあります。
    * 各ファイルは、例えば、空気温度、水温、...
    * 各ファイルは5D文字変数を、例えば次元と持つかもしれません (時間、深さ、lat、lon、nCharacters) お問い合わせ
    * ファイル名は、ファイル名内の buoy の名前が含まれている場合があります。
         
### EDDTableFromNcCFファイル{#eddtablefromnccffiles} 
 [ **EDDTableFromNcCFファイル** ](#eddtablefromnccffiles) データを集計してデータを集計 NetCDF   (v3 または v4)   .nc   (または [ .nc ミリリットル](#ncml-files) ) 指定したファイル形式の1つを使用するファイル [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) コンベンション このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。

多次元CF DSGの変形の1つを使用してファイルのために、使用して下さい [EDDTableFromMultidimNcファイル](#eddtablefrommultidimncfiles) 代わりに。

CF DSG 条約は、何十ものファイル形式を定義し、多数のマイナーなバリエーションが含まれています。 このクラスは、我々が認識しているすべてのバリエーションを扱いますが、我々は1を見逃しているかもしれません (以上) お問い合わせ そのため、CF DSGファイルからデータを読み込むことができない場合は、 [追加のサポート](/docs/intro#support) お問い合わせ

強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
 
### EDDTableFromNccsvファイル{#eddtablefromnccsvfiles} 
 [ **EDDTableFromNccsvファイル** ](#eddtablefromnccsvfiles) データを集計する [NCCSVの特長](/docs/user/nccsv-1.00) ASCII .csv ファイル。 このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。

* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
    
質問に答えた後、GenerateDatasetsXml がこのタイプのデータセットで最初に行うことは、サンプルファイルの ncdump のような構造を印刷します。 そのため、GenerateDatasets で最初のループに対して、いくつかのgoofy 回答を入力すると Xmlは、少なくともあなたは、あなたが見ることができるかどうか ERDDAP™ ファイルが読み込まれ、どの寸法と変数がファイルにあるかを見ることができます。 それから、GenerateDatasetsXml を通して 2 番目のループに対してより良い答えを与えることができます。
    
* 警告: いつ ERDDAP™ NCCSVデータファイルを読み込みます。特定の行のエラーが見つかられば (例えば、誤ったアイテム数) 警告メッセージ (「警告: 悪い行 (ツイート) データ "... 続いて行の悪い行のリストを持つ) お問い合わせ [log.txt ファイル](/docs/server-admin/additional-information#log) データファイルの残りの部分を引き続き読み続けます。 そのため、定期的に見ることがあなたの責任です。 (スクリプトを書くか、) ログ内のメッセージ txt では、データファイル内の問題を解決できるようにします。 ERDDAP™ ユーザーがファイルの一部行が欠陥を持っているにもかかわらず、利用可能なすべての有効なデータを読み続けることができるように、このように設定されています。
     
### EDDTableFromNOSの特長{#eddtablefromnos} 
 [ **EDDTableFromNOSの特長** ](#eddtablefromnos)   (リリース) データを扱う NOAA   [ノーズ](https://opendap.co-ops.nos.noaa.gov/axis/) ソース, 使用する [ SOAP+XML ](https://www.w3schools.com/xml/xml_soap.asp) リクエストと応答のため。 それは非常に具体的です NOAA NOSのXML。 datasets2.xml の EDDTableFromNOS のデータセットを参照してください。
 
### EDDTableFromOBIS(EDDTableFromOBIS)の特長{#eddtablefromobis} 
 [ **EDDTableFromOBIS(EDDTableFromOBIS)の特長** ](#eddtablefromobis) 海洋生物地理情報システムからデータを処理 (スタッフ) サーバー (あったhttp://www.iobis.org ) お問い合わせ 現在、OBISサーバーシステムが最新型になっている、よりアクティブなサーバーがインストールされていない可能性もあります。

* OBISサーバーはXMLリクエストを想定し、XMLレスポンスを返します。
* すべてのOBISサーバーが同じ変数を同じように提供するので (あったhttp://iobis.org/tech/provider/questions) OBIS のデータセットをセットアップする量を指定する必要はありません。 ERDDAP お問い合わせ
* "" を含める必要があります。 creator\\_email " グローバルな属性 addAttributes 、その情報はライセンス内で使用されます。 sourceURL から XML レスポンスを読み込み、適切なメールアドレスが見つかります。
* グローバルな属性を取得することができないか [&lt; subsetVariables &gt;&gt; (#サブセット変数) 与えられたOBISサーバで動作する。 試してみると、1つの変数を試すだけです (たとえば、ScientificName や Genus) お問い合わせ
#### EDDTableFromOBIS(EDDTableFromOBIS)の特長 スケルトンXML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableParquetFilesから{#eddtablefromparquetfiles} 
 [ **EDDTableParquetFilesから** ](#eddtablefromparquetfiles) データを扱う [パーケット](https://parquet.apache.org/) お問い合わせ このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。

* パーケットは非常に効率的に圧縮するように設計されているので、他のフォーマットよりも小さいファイルサイズを与えることができます。
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
* 警告: いつ ERDDAP™ 特定の行のエラーが見つかられば、パーケットのデータファイルを読み込みます。 (例えば、誤ったアイテム数) 警告メッセージ (「警告: 悪い行 (ツイート) データ "... 続いて行の悪い行のリストを持つ) お問い合わせ [log.txt ファイル](/docs/server-admin/additional-information#log) データファイルの残りの部分を引き続き読み続けます。 そのため、定期的に見ることがあなたの責任です。 (スクリプトを書くか、) ログ内のメッセージ txt では、データファイル内の問題を解決できるようにします。 ERDDAP™ ユーザーがファイルの一部行が欠陥を持っているにもかかわらず、利用可能なすべての有効なデータを読み続けることができるように、このように設定されています。
     
### EDDTableFromの特長 SOS  {#eddtablefromsos} 
 [ **EDDTableFromの特長 SOS ** ](#eddtablefromsos) センサー観測サービスからデータを処理 (ツイート [ SOS ](https://www.ogc.org/standards/sos) ) サーバ。

* このデータセット型は、1つのステーションからデータを集約します。 SOS サーバ。
* すべてのステーションは、変数の同じセットに役立ちます (各ステーションのソースがすべての変数を提供する必要はありませんが、) お問い合わせ
*    SOS サーバはXMLリクエストを想定し、XMLレスポンスを返します。
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。 データセットXMLを生成するのは簡単ではありません SOS 手でデータセット。 必要な情報を見つけるには、 sourceUrl お問い合わせ サービス= SOS リクエスト GetCapabilities " ブラウザで、XML を見て、GetObservation リクエストを手で作成します。XML 応答をリクエストに見てみましょう。
* 新しいタイプの時折追加で SOS サーバと古いサーバーへの変更、それは難しくなっています ERDDAP™ サーバの応答からサーバータイプを自動的に検出します。 利用目的&lt;sosServerType&gt; (IOOS\\_NDBC, IOOS\\_NOS, IOOS\\_NOS, OOSTethys , または WHOI) 今、強くお勧め. このタイプのデータセットに問題がある場合は、GenerateDatasetを再実行してみてください。 Xml 用 SOS サーバ。 生成する データセット Xml は別のことを試みることを可能にします&lt;sosServerType&gt; オプションは、指定したサーバーの正しいものを見つけるまでです。
*    SOS 概要:
    * スウィー (センサーウェブの有効化) そして、 SOS   (センサー観測サービス) お問い合わせ [OpenGIS®規格](https://www.ogc.org/standards) お問い合わせ 当ウェブサイトでは、標準文書が記載されています。
    * ザ・オブ・ザ・ OGC ウェブサービス 共通仕様 ver 1.1.0 ( OGC 06-121r3) GETとPOSTクエリの構築をカバー (セクション 7.2.3 とセクション 9 を参照してください。) お問い合わせ
    * getCapabilities xml リクエストを渡すと、 SOS サーバー ( sourceUrl +「?service=」 SOS リクエスト GetCapabilities ツイート) , あなたは、ステーションと観察されたリストとxml結果を取得します 彼らがデータを持っているプロパティ。
    * validateProperty は、プロパティへの正式な URI リファレンスです。 例えば、urn:ogc:phenomenon:longitude:wgs84 またはhttps://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
    * validateProperty は変数ではありません。
    * 1つの変数以上が同じ観察されるかもしれません プロパティ (例えば、内部Temp と外側 温度は両方が観察されるかもしれない プロパティhttps://mmisw.org/ont/cf/parameter/air\\_temperature) お問い合わせ
    * getObservation xml リクエストをリクエストに送信する場合 SOS 応答、フィールド単位、データ内のフィールド名の説明で xml 結果を取得します。 フィールド名には、経度、緯度、深さが含まれます (おそらく) 、および時間。
    * 詳しくはこちら dataVariable EDDTableFrom について SOS "observedProperty" 属性を含める必要があります。この属性は、サーバーから要求されるべき enabledProperty を識別し、その変数を取得する必要があります。 多くの場合、いくつか dataVariable s は、同じコンポジットが観察されたプロパティをリストします。
    * 各々のデータタイプ dataVariable サーバが指定しない場合があります。 もしそうなら、サーバーからXMLデータ応答を調べて、適切な割り当てをしなければなりません[[]&lt;データタイプ&gt;s (#データ型) お問い合わせ ERDDAP™ データセット dataVariable 定義。
    *    (これを書く時) 詳しくはこちら SOS getObservation リクエストを 1 つ以上監視するサーバ プロパティは、観察されたプロパティの最初の結果を返します。 (エラーメッセージはありません&#33;) コンストラクタのリクエストを参照してください。 観察された専門性別に。
* EDDTableFromの特長 SOS 自動的に追加します
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
データセットが作成されると、データセットのグローバル属性に。
*    SOS サーバは通常エクスプレス [ユニット](#units) お問い合わせ [カリキュラム](https://unitsofmeasure.org/ucum.html) システム。 最近の投稿 ERDDAP™ サーバは単位をと表現します [ UDUNITS ](https://www.unidata.ucar.edu/software/udunits/) システム。 2つのシステム間で変換する必要がある場合は、 [ ERDDAP UCUMユニットを変換するWebサービス UDUNITS ](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) お問い合わせ
#### EDDTableFromの特長 SOS スケルトンXML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromThreddsファイル{#eddtablefromthreddsfiles} 
 [ **EDDTableFromThreddsファイル** ](#eddtablefromthreddsfiles)   (非推奨) 複数の変数を持つデータファイルを集約し、それぞれに1つ以上の共有寸法 (例えば、時間、高度 (または深さ) 、緯度、経度) , によって提供される [パスワード OPeNDAP サーバー](https://www.unidata.ucar.edu/software/tds/) お問い合わせ

* このデータセットタイプは **リリース** お問い合わせ 新しく、より一般的なソリューションは、 [キャッシュ EDDTable の FromUrl オプション ファイルから](#cachefromurl)   (または variant) リモートファイルのローカルコピーを作成し、ローカルファイルからデータを配信します。 ザ・オブ・ザ・&lt;cacheFromUrl&gt; オプションは、ディレクトリのようなファイルのリストを公開する任意のWebベースのソースから任意のタイプの表形式のデータファイルで使用できます。 **   
何らかの理由で動作させることができない場合は、Chris にメールを送ってください。 noaaa.gov のジョン。
2020年前の苦情がない場合、このデータセットタイプが削除される場合があります。 ** 
* 強くお勧めします。 [生成データセット Xmlプログラム](#generatedatasetsxml) ラフドラフトを作るために datasets.xml このデータセットのチャンク。 その後、それを微調整するためにそれを編集することができます。
* ほとんどの場合、各ファイルが一番左に複数の値を持つ (はじめて) 次元、例えば、時間。
* ファイルが頻繁に (必要はない) 他の次元のための単一の価値があります (例えば、高度 (または深さ) 、緯度、経度) お問い合わせ
* 追加の次元でキャラクター変数を持つファイル (例えばnCharacters) お問い合わせ
* URL内の「/thredds/」でTHREDDSサーバーを識別できます。 例えば、
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* THREDDSサーバーには様々な場所でカタログがあります。 このクラス URL に "/thredds/catalog/" が含まれていることを要求します。 通常、ルートカタログのブラウザで起動して、目的のサブcatalogにクリックすることで、この変数を見つけることができます。
* このクラスでは、THREDDS が提供している Catalog.xml ファイルをリストで読み込みます。&lt;カタログ参照&gt; (追加の Catalog.xml サブファイルへの参照) そして、&lt;データセット&gt;s (データファイル) お問い合わせ
* ザ・オブ・ザ・&lt;fileDir&gt; の設定は無視されます。 このクラスは、各リモートデータファイルのローカルコピーをダウンロードして作成するので、 ERDDAP™ ファイルを強制する 汚れて *bigParentディレクトリ* /コピー/ * datasetID * ....
* お問い合わせ&lt; sourceUrl &gt;、例えば、THREDDSサーバーのデータセットに、カタログ.xmlファイルのURLを使用します。このURLは、Webブラウザで使用できるものです。
    https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[ 2020年10月21日 このサーバは、もはや確実に利用可能ではありません。 \\] ,
使用方法&lt; sourceUrl ツイートhttps://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml&lt;/ / / / sourceUrl ツイート
     (しかし、1ラインに置く) お問い合わせ
* このクラスは常に各リモートデータファイルのローカルコピーをダウンロードして作成するので、このデータセットをラップしないでください。 [EDDTableコピー](#eddtablecopy) お問い合わせ
* このデータセットのタイプはOPTIONAL、まれに使用される、特別な札を支えます、&lt;スペシャルモード&gt; *モード* &lt;/specialMode&gt; は、サーバーからどのファイルがダウンロードされるべきかを判断するために、特別なハードコードされたルールを使用するように指定することができます。 現在、有効期間のみ *モード* からデータセットで使われるSAMOShttps://tds.coaps.fsu.edu/thredds/catalog/samos最後のバージョン番号でファイルのみをダウンロードします。
* このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) 、このクラスがどのように機能するか、どのように使うかについての情報。
* 1D,2D,3D,4Dの一例をご覧いただけます。 [EDDTableFromNcFiles (EDDTableFromNcFiles) は、](#eddtablefromncfiles) お問い合わせ
     
### EDDTableFromの特長 WFS ファイル{#eddtablefromwfsfiles} 
 [ **EDDTableFromの特長 WFS ファイル** ](#eddtablefromwfsfiles)   (リリース) すべてのデータをローカルにコピーする ArcGIS 地図サーバ WFS サーバはデータがすぐに保存できるように ERDDAP™ ユーザー。

* 特定のフォーマットを指定する必要があります sourceUrl グローバルな属性は、 ERDDAP™ サーバから機能をリクエストする方法 この例をテンプレートとして使用してください。
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (しかし、すべての行を1行に置く) 
* 特別なグローバル属性を追加するには、 ERDDAP™ ダウンロードすべきデータのチャンクの名前を識別する方法。 これは、おそらくすべてのEDDTableFromのために動作します WFS ファイルデータセット:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* このクラスは常に各リモートデータファイルのローカルコピーをダウンロードして作成するので、このデータセットをラップしないでください。 [EDDTableコピー](#eddtablecopy) お問い合わせ
* このクラスのスーパークラスを参照してください。 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) このクラスがどのように機能するか、どのように使うかに関する追加情報。
     
### EDDTableアグレゲートロー{#eddtableaggregaterows} 
 [ **EDDTableアグレゲートロー** ](#eddtableaggregaterows) 「子」EDDTableデータセットのグループからEDDTableデータセットを作ることができます。

* ここでは、EDDTableAggregateRows のいくつかの用途があります。
    * EDDTableAggregateRows は、2 つの異なる種類のファイルやデータソースからデータセットを作成できます。例えば、データセットは、過去 1 か月間保存されるデータセットです。 .nc CFファイルとリレーショナルデータベースに保存された現在の月のデータセット。
    * EDDTableAggregateRows データをソースファイルの変更に対処することができます (例えば、時刻の形式が変更されるか、変数名が変更されるか、またはデータ タイプ/ scale\\_factor / / / / add\\_offset 変更する) お問い合わせ この場合、変更前に作られたファイルから1人の子供がデータを取得し、変更後に作られたファイルから他の子供がデータを取得します。 EDDTableAggregateRowsのこの使用は、使用するための代替手段です [ログイン](#ncml-files) または [ NCO ](#netcdf-operators-nco) お問い合わせ ファイル名に区別機能がない場合(そのため、使用できる)&lt;fileNameRegex&gt; は、どのファイルがどの子データセットに属しているかを判断するために、異なるディレクトリに2つの子データセットのファイルを保存する必要があります。
    * EDDTableAggregateRows のデータセットを 1 つ以上の同様のデータセットの共有サブセットを持つことができます。例えば、プロファイルデータセット、TimeSeriesProfile のデータセット、TrajectoryProfile データセットの組み合わせからプロファイルデータセットを作成するデータセットなどです。 (いくつかの異なる変数と、一般的な変数があります -- この場合、子のデータセットの特別なバリアントを作る必要があります。) お問い合わせ
    * 複数のスタンドアローンのデータセット、それぞれ同じタイプのデータが異なる場所からあります。 これらのデータセットをそのまま残すことができますが、すべてのステーションからデータを持つEDDTableAggregateRowsデータセットも作成できます。各子のデータセットはシンプルなものになります。 [EDDTableFromErddapの特長](#eddfromerddap) 既存のステーションデータセットの1つにポイントする。 これを行うと、EDDTableFromErddap のそれぞれに異なるデータセットを与える datasetID オリジナルのスタンドアローンのデータセットよりも、例えば「子供」を元のものに付け加えることによって datasetID お問い合わせ
* お子様のそれぞれ&lt;dataset&gt; の指定は、スタンドアローンのデータセットであったため、完全なデータセットでなければなりません。 それぞれ同じを持っている必要があります [ dataVariable ツイート](#datavariable) 、同じ順序で、同じと [ destinationName ツイート](#destinationname) , [データデータ タイプ](#datatype) , [ missing\\_value ツイート](#missing_value) , [\\_料金](#missing_value) と [ユニット](#units) お問い合わせ EDDTableAggregateRows のデータセットのそれぞれの変数のメタデータは、最初の子のデータセットの変数から来ますが、EDDTableAggregateRows は更新します [ actual\\_range ](#actual_range) すべての子供のための実際の範囲であるメタデータ。
* 推薦: スタンドアローンのデータセットとして機能する子データセットのそれぞれを取得します。 次に、EDDTableAggregateRows データセットを切断し、貼り付ける datasets.xml 新しいEDDTableAggregateにそれぞれのためのチャンク 列のデータセット。
* データセット デフォルト ソート順 -- 子データセットの順序は、結果の全体的なデフォルトソート順を決定します。 もちろん、ユーザーは、追加して結果のセットのために異なるソート注文を要求することができます & orderBy  (ツイート *変数のコンマ区切りリスト* ツイート) クエリの最後に。
* 「ソース」 [グローバル アトリビュート](#global-attributes) EDDTableAggregateRows は、最初の子のデータセットから結合された globalAttributes です。 EDDTableアグレゲート 行はグローバルに&lt; addAttributes &gt; 追加のグローバル属性を提供したり、ソースのグローバル属性をオーバーライドしたりします。
#### EDDTableアグリゲート 列スケルトンXML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableコピー{#eddtablecopy} 
 [ **EDDTableコピー** ](#eddtablecopy) EDDTable のデータセットのローカルコピーを作成し、ローカルコピーからデータをすぐに保存することができます。

* EDDTableコピー (そして格子データのため、 [ EDDGrid コピー](#eddgridcopy) ) 非常に使いやすく、非常に効果的です **リモートデータソースからデータを処理する最大の問題の解決:** 
    * リモートデータソースからのデータへのアクセスを遅くすることができます。
        * 彼らが本質的に遅いので、彼らは遅くなる可能性があります (例えば、サーバの非効率的なタイプ) ,
        * あまりにも多くの要求に圧倒されるので、
        * またはサーバーまたはリモートサーバーが帯域幅制限されているため。
    * リモート・データセットは時々利用できません (様々な理由で) お問い合わせ
    * データを1つのソースに頼ることは、うまくスケールしない (たとえば、多くのユーザーと多く ERDDAP sはそれを利用します) お問い合わせ
         
* EDDTableCopyは、データのローカルコピーを自動的に作成し、ローカルコピーからデータを処理することで、これらの問題を解決します。 ERDDAP™ ローカルコピーからデータを非常に迅速に配信できます。 ローカルコピーの作成と使用により、リモートサーバへの負担が軽減されます。 ローカルコピーは元のバックアップであり、元の何かが起こる場合に便利です。
    
データセットのローカルコピーを作成することに関する新しいものはありません。 ここが新しいのは、このクラスがそれを作ることです\\*簡単操作\\*作成し、\\*メンテナンス\\*ローカルデータのコピー\\*ジャンル\\*リモートデータソースの種類と\\*メタデータを追加\\*データのコピー中に。
    
#### EDDTableCopy 対&lt;キャッシュFromUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFromUrl&gt; は EDDTableCopy の代替手段です。 彼らは異なる動作.

* EDDTableの特長 リモートサービスからデータのチャンクをリクエストし、ローカルファイル内のチャンクを保存することで、作品をコピーします。 そのため、EDDTableCopy はリモートサービスでデータがアクセスできるケースで便利です。
* ツイート&lt;キャッシュFromUrl&gt; (パスワード) リモートウェブサイトにリストされている既存のファイルをダウンロードします。&lt;cacheFromUrl&gt; は、新しいリモートデータファイルがある場合やリモートデータファイルが変更されたときに簡単に伝えることができるため、使いやすく、より信頼性が高いです。

EDDTableCopy や&lt;cacheFromUrl&gt; を使うと、&lt;cacheFromUrl&gt; それはより容易で、より信頼できるので。
     
#### &lt;抽出物Destination 名前&gt;{#extractdestinationnames} 
EDDTableの特長 コピーは、リモートデータセットからデータのチャンクを要求することにより、データのローカルコピーを作成します。 EDDTableの特長 コピーは、&distinct を要求することによって、チャンクがどのチャンクを要求するかを決定します () 値の&lt;ExtractDestinationNames&gt; (で指定された datasets.xml 以下を参照してください。) リモートデータセット内の変数のスペース分離された宛先名である。 例えば、
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
ドリフトer=tig17、profile=1017、ドリフトer=tig17、profile=1095、...ドリフトer=une12、profile=1223、ドリフトer=une12、profile=1251、...

1列の状況 (例えば、プロフィール) データの行のグループを一意に識別する必要があるのは、例えば、プロファイルなど、非常に多数のデータがある場合、追加の抽出物を指定するのに便利です。 目的地 お名前 (必須) (例えば、漂流器) プロファイルを分割するのに役立ちます。 これにより、特定のディレクトリ内のデータファイルが少ないため、アクセス速度が速くなります。
    
#### ローカルファイル{#local-files} 
データの各チャンクは別々に保存されます NetCDF サブディレクトリ内のファイル *bigParentディレクトリ* /コピー/ * datasetID * / / / / (で指定される [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) ) お問い合わせ サブディレクトリレベルは1つありますが、最後のextractDestinationNameです。 例えば、tig17+1017 のデータが格納されます。
     *bigParentディレクトリ* /copy/sampleデータセット/tig17/1017 .nc お問い合わせ
例えば、une12+1251 のデータが保存されます。
     *bigParentディレクトリ* /copy/sampleデータセット/une12/1251 .nc お問い合わせ
データ値から生成されたディレクトリとファイル名が変更され、ファイル名の安全性が向上 (例えば「x20」にスペースを置換します。) -- これは実際のデータに影響を与えません。
     
#### 新しいデータ{#new-data} 
各時間EDDTable コピーはリロードされ、リモートデータセットで、どの異なるチャンクが利用できるかを確認します。 データのチャンクのファイルが既に存在していない場合、チャンクを取得するリクエストはキューに追加されます。 ERDDAP 's TaskThread は、データのチャンクに対するキュードリクエストを 1 つずつ処理します。 タスクThread のアクティビティの統計情報を見ることができます。 [ステータスページ](/docs/server-admin/additional-information#status-page) そして、 [デイリーレポート](/docs/server-admin/additional-information#daily-report) お問い合わせ (はい、 ERDDAP™ 複数のタスクをこのプロセスに割り当てることができますが、リモートデータソースの帯域幅、メモリ、CPU時間、ローカルの多くを使用することができます ERDDAP 's の帯域幅、メモリ、 CPU 時間、どちらも良い考えです。) 
    
Note: EDDTableCopy がロードされるのは初めてです。 (すべてがうまく行く場合) データのチャンクに対する多くのリクエストは、taskThread のキューに追加されますが、ローカルのデータファイルが作成されていません。 そのため、コンストラクタは失敗しますが、taskThread は引き続きローカルファイルを実行して作成します。 すべてがうまくいくと、taskThread はローカルのデータファイルと次の試みをリロードします。 (～15分) 成功するが、当初はデータ量が限られている。
    
Note: ローカルデータセットにデータが含まれている後、データが表示される ERDDAP リモートデータセットが一時的にまたは永続的にアクセスできない場合は、ローカルデータセットはまだ機能します。
    
警告:リモート・データセットが大きい場合および/またはリモート・サーバーは遅いです (問題ではありませんか?) 完全なローカルコピーを作るのに長い時間かかります。 場合によっては、必要な時間は容認できません。 たとえば、T1 行上の 1 TB のデータを伝送する (0.15 GB/s) 最適な条件下で60日以上かかります。 また、リモートやローカルコンピューターの帯域幅、メモリ、CPU 時間を多く使用しています。 ソリューションは、s/he がデータセットのコピーを作成し、ハードドライブをあなたに郵送できるように、リモートデータの管理者にハードドライブをメールすることです。 そのデータは、開始点とEDDTableCopy として使用して、データを追加します。 (つまり、AmazonのEC2クラウドサービスが問題を処理するのに使われています。システムには帯域幅が多々あります。) 
    
警告: 指定した値の組み合わせがリモートデータセットから消えた場合、EDDTableCopy はローカルのコピーファイルを削除します。 必要に応じて、自分で削除することができます。
    
#### テーブルコピー&lt;checkSourceData&gt のチェック{#tablecopy-checksourcedata} 
ザ・オブ・ザ・ datasets.xml このデータセットにはオプションのタグを持つことができます
```
    <checkSourceData>true</checkSourceData>  
```
デフォルト値は true です。 false に設定すると、データセットがソースデータセットをチェックして、追加データが利用可能なかどうかを確認します。
     
#### 推奨用途{#recommended-use} 
1. 作成する&lt;データセット&gt; エントリーフォーム (ネイティブタイプ、EDDTableCopy ではなく) リモートデータソースのため。 **必要なすべてのメタデータを含む、正しく機能します。** 
2. 余りに遅い場合は、XML コードを EDDTableCopy データセットにラップします。
    * 別の使用 datasetID   (おそらく変更によって datasetID 古いもの datasetID わずか) お問い合わせ
    * コピーする&lt;アクセス お問い合わせ&lt;reloadEveryNMinutes&gt; と&lt;onChange&gt; リモート EDDTable の XML から EDDTableCopy の XML へ。 (EDDTableCopy の数値。内部データセットの値は、関連性が向上します。) 
    * 作成する&lt;ExtractDestinationNames&gt; タグ (詳しくはこちら) お問い合わせ
    *   &lt;orderExtractBy&gt; は、リモートデータセット内の宛先変数名の OPTIONAL 空間区切りリストです。 リモートサーバからデータの各チャンクがダウンロードされると、チャンクはこれらの変数によってソートされます。 (最初の変数で、最初の変数がtiedなら2番目の変数で...) お問い合わせ 場合によっては、 ERDDAP™ リストの最初の変数が数値変数である場合、ローカルデータファイルからデータをより速く抽出することができます ( "time" 数値変数としてカウント) お問い合わせ しかし、データセットに適した方法でこれらの変数を選択します。
3.   ERDDAP™ データのローカルコピーを作成し、維持します。
         
* 警告: EDDTableCopy は、各チャンクのデータ値が変更されていないと仮定します。 もし/when なら、chunk ファイルを手動で削除する必要があります。 *bigParentディレクトリ* /コピー/ * datasetID * / 変更・変更 [ログイン](/docs/server-admin/additional-information#flag) 削除されたチャンクが置換されるようにリロードされるデータセット。 データセットに電子メールサブスクリプションがある場合、データセットが最初にデータをリロードし、データをコピーし始めると、データセットが再びロードしたときに2つのメールが届きます。 (自動的に) 新しいローカルデータファイルを検出します。
     
* メタデータの変更 お問い合わせ 変更が必要な場合 addAttributes またはソースのデータセットに関連付けられた変数の順序を変更します。
    1. 変更する addAttributes ソースデータセットの datasets.xml 必要に応じて。
    2. コピーしたファイルの1つを削除します。
    3. 設定する [ログイン](/docs/server-admin/additional-information#flag) データセットをすぐにリロードします。 フラグを使うと、データセットに電子メールのサブスクリプションがある場合、データセットが最初にデータをリロードし、データをコピーし始めると、データセットが再び読み込まれるときの2つのメールが届きます。 (自動的に) 新しいローカルデータファイルを検出します。
    4. 削除されたファイルは新しいメタデータで再生されます。 ソースデータセットが利用できなくなった場合、 EDDTableCopy のデータは、最も若いファイルであるため、再生されたファイルからメタデータを取得します。
         
*    [ EDDGrid コピー](#eddgridcopy) EDDTableCopy と非常に似ていますが、グリッド化されたデータセットで動作します。
#### EDDTableCopy スケルトンXML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - - - -

## インフォメーション{#details-1} 

一般的なタグと属性の詳細な説明は次のとおりです。

### &lt;angularDegreeUnits&gt; リリース{#angulardegreeunits} 
* ツイート ** &lt;angularDegreeUnits の仕様 ** . . (#angularユニット) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml これは、単位文字列のコンマ区切りリストを含む ERDDAP™ 角度単位として扱うべきです。 変数がこれらの単位の1つを持っている場合、 tabledap お問い合わせ orderByMean フィルターは特別な方法で平均を計算し、-180 から 180 までの値として平均を報告します。 お問い合わせ ERDDAP 現在のデフォルトリストの 's EDStatic.java ソースコードファイルです。 このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ
### &lt;angularDegreeTrueUnits&gt; リリース{#angulardegreetrueunits} 
* ツイート ** &lt;アングル 学位TrueUnits&gt; ** . . (#angulartrueunits ディレクティブ) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml これは、単位文字列のコンマ区切りリストを含む ERDDAP™ 角度単位として扱われるべきです。 変数がこれらの単位の1つを持っている場合、 tabledap お問い合わせ orderByMean フィルターは特別な方法で平均を計算し、0から360までの値として平均を報告します。 お問い合わせ ERDDAP 's 現在のデフォルトリストの EDStatic.java ソースファイル。 このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ
     
### &lt;共通標準名&gt;{#commonstandardnames} 
* ツイート ** &lt;共通標準名&gt; ** . . (#common標準名) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml 共通のコンマ区切りリストを指定する [CF標準名](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) お問い合わせ 例:
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
DataProviderForm3.html ではユーザの利便性として利用しています。
この情報を提供したい場合は datasets.xml , 現在のデフォルトリストをコピーして起動します。&lt;DEFAULT\\_common標準名&gt; お問い合わせ ERDDAP お問い合わせ
 \\[ トームキャット \\] /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml ファイル。
     
### &lt;キャッシュMinutes&gt;{#cacheminutes} 
* ツイート ** &lt;cacheMinutes&gt; ** . . (#キャッシュアウト) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml 年齢を指定する (所要時間) キャッシュ内のファイルが削除される (デフォルト=60) お問い合わせ 例:
```
    <cacheMinutes>60</cacheMinutes>  
```
一般的にはイメージファイルのみ (同じ画像が繰り返し要求されることが多いため) そして、 .nc ファイル (ユーザに送信する前に完全に作成される必要があるため) キャッシュされます。 リクエストが常に同じ応答を返すように見えるかもしれませんが、それは本当ではありません。 例えば、 tabledap 時間を含むリクエスト&gt; *詳しくはこちら タイムタイム* データセットに新しいデータが到着したときに変更されます。 そして含まれているgriddapの要求 \\[ 最後の投稿 \\] データセットに新しいデータが到着したときに時間次元が変化します。 このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ 新着情報 ERDDAP™ v2.00, これは、setup.xmlで指定されました, これは、まだ許可されていますが、捨てられます.

### &lt;キャッシュClearMinutes&gt;{#cacheclearminutes} 
* ツイート ** &lt;キャッシュClearMinutes&gt; ** . . (#キャッシュクリア分) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml キャッシュされたファイルをチェックし、古いファイルを削除する頻度を指定する (所要時間)   (デフォルト=15) お問い合わせ 例:
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
サーバがリクエストの処理が完了すると、最後のキャッシュクリアがどのくらい前に確認されます。 長い前にいたら、タスクをタスクにキューに入れ、キャッシュをクリアします。 このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ これは setup.xml で指定できますが、それは無視されます。
     
### &lt;変換InterpolateRequestCSVExample&gt;{#convertinterpolaterequestcsvexample} 
* ツイート ** &lt;変換InterpolateRequestCSVExample&gt; ** . . (#convertinterpolaterequestcsvexample(コンバート)) 内の OPTIONAL タグです。&lt;erddapDatasets&gt; タグ datasets.xml   \\[ まずは ERDDAP™ v2.10の特長 \\] Interpolate コンバーターの Web ページに表示される例が含まれている。 デフォルト値は: jplMU RSS T41/分析\\_ sst /バイリンガル4
### &lt;ConvertInterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* ツイート ** &lt;ConvertInterpolateDatasetIDVariableList&gt; ** . . (#convertinterpolatedatasetid変数リスト) 内の OPTIONAL タグです。&lt;erddapDatasets&gt; タグ datasets.xml   \\[ まずは ERDDAP™ v2.10の特長 \\] CSVリストを含む datasetID /変数 Interpolate コンバーターの Web ページに提案として使用される名前の例。 デフォルト値は: jplMU RSS T41/分析\\_ sst お問い合わせ
### &lt;変換ToPublicSourceUrl&gt;{#converttopublicsourceurl} 
* ツイート ** &lt;変換ToPublicSourceUrl&gt; ** . . (#converttopublicsourceurl(コンバート)) 内の OPTIONAL タグです。&lt;erddapDatasets&gt; タグ datasets.xml "from" と "to" の属性が含まれているので、マッチしたローカルを変換する方法を指定します。 sourceUrl   (通常 IP 番号) パブリックに sourceUrl   (ドメイン名) . "from" はフォーム " \\[ お問い合わせ \\] // // // // \\[ お問い合わせ \\] . . . これらのタグの 0 以上のものがあります。 詳しくは [&lt; sourceUrl &gt;&gt; (#ソース) お問い合わせ 例えば、
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
マッチングをローカルに引き起こす sourceUrl   (などhttps://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day)   
パブリックに sourceUrl   (https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day) お問い合わせ
このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ

しかし、セキュリティ上の理由やサブスクリプションシステムに関連する理由については、 **このタグを使用しないでください&#33;**   
代わりに、常にパブリックドメイン名を&lt; sourceUrl &gt; タグと使用 [/etc/hostsテーブル](https://linux.die.net/man/5/hosts) ローカルドメイン名をDNSサーバーを使用しなくてもIP番号に変換できます。 ドメイン名が正しく IP 番号に変換されていれば、次のようにテストできます。
ピン *ドメイン名*   
     
### データ:image/png;base64,{#dataimagepngbase64} 
* ユーザーが要求する場合 .htmlTable 応答から ERDDAP™ , 文字列 セル内のデータに data:image/png;base64 が含まれている場合, 続いて base64 エンコード .png イメージ, ERDDAP™ アイコンが表示されます (そのため、ユーザーはそれを上回るならイメージを見ることができます) テキストや画像をクリップボードに保存するためのボタン。 この機能を追加 ERDDAP™ マルコ・アルバによるv2.19。
###  drawLandMask  {#drawlandmask} 
*    [ ** drawLandMask ** ](#drawlandmask) 時とどのようにランドマスクが描画されるべきかを制御するデフォルト設定を指定します。 ERDDAP™ 地図を描きます。 3つの異なる場所で指定することができます datasets.xml   (最少から最優先まで) : : :
    
    1. お問い合わせ drawLandMask 内の指定&lt;erddapDatasets&gt; (特定のデータセットに接続されていない) では、デフォルト値を指定します。 drawLandMask すべてのデータセットのすべての変数のため。 例えば、
    ```
        <drawLandMask>under</drawLandMask>  
    ```
このタグの値の変更は、次の時刻に有効になります。 ERDDAP フィードバック datasets.xml お問い合わせ
このタグが存在しない場合は、デフォルト値が下にある。
         
    2. お問い合わせ drawLandMask 指定されたデータセットのグローバル属性として指定され、デフォルト値を指定します。 drawLandMask データセット内の全ての変数に対して、優先度の設定をオーバーライドします。 例えば、
    ```
        <att name="drawLandMask">under</att>  
    ```
このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ データセットのリロード。
         
    3. お問い合わせ drawLandMask 指定されたデータセット内の変数の属性として指定され、デフォルト値を指定します。 drawLandMask そのデータセットの変数に対して、優先度の設定をオーバーライドします。 例えば、
    ```
        <att name="drawLandMask">under</att>  
    ```
このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ データセットのリロード。
    
ユーザはデフォルトを上書きできます (どこに指定するか) データセットの Make A Graph Web ページにあるドロップダウンリストから「Draw Land Mask」の値を選択するか、&.land= を含む *バリュー* 地図をリクエストするURL ERDDAP お問い合わせ
    
すべての状況では、属性の4つの値があります。
    
    * 地図上のデータを描画する前に「アンダー」がランマスクを描画します。
埋め込まれたデータセットのために、土地は一定した軽い灰色色として表示されます。
表形式のデータセットの場合、「アンダー」は、地と海の上に地形データを表示します。
    * "オーバー" -- グリッドデータセットの場合、「オーバー」は、マップ上のデータを描画した後にランマスクを描画し、土地上のデータをマスクします。 表紙データセットの場合、「オーバー」は、海と陸地がある一定の光の灰色の境界線を示しています。
    * 「アウトライン」は、ランドマスク、政治境界、湖、川の輪郭を描きます。
    * "off" は何も描画しません。
### &lt;メール診断ToErdData&gt;{#emaildiagnosticstoerddata} 
* ツイート ** &lt;メール診断ToErdData ** . . (#電子メール診断toerddata) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml お問い合わせ タグの値は真になります (デフォルト) または false もし、 ERDDAP™ スタックトレースをChrisにメールします。 ノアのヨハネ。 ログイン (お問い合わせ ERDDAP™ 開発チーム) お問い合わせ 機密情報がないため、安全かつ安心です。 (例、リクエストUrl) メールでのお問い合わせ これは、NullPointerExceptions につながるあらゆる障害、全く予期しないバグをキャッチできるはずです。 そうでなければ、ユーザは例外を参照しますが、 ERDDAP™ 開発チームは開発チームではありません (そのため、修正が必要な問題があることは分かりません。) お問い合わせ
     
### &lt;グラフ背景色&gt;{#graphbackgroundcolor} 
* ツイート ** &lt;グラフ背景色&gt; ** . . (#グラフバックグラウンドカラー) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml グラフ上のデフォルトの背景色を指定する。 ほぼすべてのグラフに影響します。 影響を受けない状況はいくつかあります。 色は、AA、RR、GG、BBがそれぞれ、オパシティ、赤、緑、青の各コンポーネントである0xAARRBB形式で8桁の16桁の16進数値として指定されます。 "0x" はケース感度が高いですが、16進数の数字はケース感度ではない。 たとえば、完全に不透明 (ログイン) red=22、green=88、blue=ee の緑がかった青色は 0xff2288ee です。 オパクホワイトは0xffffffffffです。 デフォルトは不透明ライトブルーです (0xffccffの) 、それはデータを引くために使用される多くのパレットの重要な色である白と異なっていることの利点があります。 例えば、
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ
### &lt;ipAddressMaxRequests&gt;{#ipaddressmaxrequests} 
* ツイート ** &lt;ipAddressMaxRequests&gt; ** . . (#ipaddressmaxrequests からのメッセージ) まれに使用された任意札です (最初にサポートされる ERDDAP™ バージョン2.12) お問い合わせ&lt;erddapDatasets&gt; タグ datasets.xml それは、過度に積極的な正当なユーザーと悪意のあるユーザーの能力を制限するシステムの一部であり、他のユーザーのためのシステム性能を低下させる多数の同時リクエストを作ることです。 ipアドレス MaxRequests は、特定の IP アドレスから受け入れられる同時リクエストの最大数を指定します。 追加リクエストは HTTP 429 エラー: Too 多くのリクエストを受信します。 erddap/download/ と erddap/images/ の小さな静的ファイルは、このカウントから除外されません。 デフォルトは 15 です。 最大許容値は1000で、クレイジーが高いです。 ERDDAP™ 多くの正当なユーザーがいるため、6未満の番号を受け入れない (特にWebブラウザと WMS クライアント) 一度に最大6リクエストをリクエストできます。 ザ・オブ・ザ・ ERDDAP™ 毎日のレポートと、各メジャー・データセット・リロードでlog.txtファイルに書かれた同様の情報は、「Requester's IP Address」のタイトルの下にあるこれらのIPアドレスによる要求の背が高いものになります (Too 多くのリクエスト) お問い合わせ
このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ
    
status.html の "Major LoadDatasets Time Series" セクションには、ユーザの ipAddressMaxRequests の設定を上回るリクエスト数を一覧表示する "tooMany" カラムが含まれます。 これは、アクティブな過度に積極的な正当なユーザーと悪意のあるユーザーが存在する場合に簡単に確認することができます (オプション) log.txt ファイルを見て、それらのユーザーをブラックリストしたいかどうかを決定します。
    
この設定をより高い数に設定すると、特に問題はありません。 あなた次第です。 しかし、そうすることで、多くのスレッドを使用してプロジェクトで動作するシステムを設定したり、それらが何をしているかフィードバックを与えたり、利益を得ることはありません。
### &lt;ipAddressMaxRequestsActive&gt;{#ipaddressmaxrequestsactive} 
* ツイート ** &lt;ipAddressMaxRequestsActive&gt; ライセンス ** . . (#ipaddressmaxrequestsactive ディレクティブ) まれに使用された任意札です (最初にサポートされる ERDDAP™ バージョン2.12) お問い合わせ&lt;erddapDatasets&gt; タグ datasets.xml それは、過度に積極的な正当なユーザーと悪意のあるユーザーの能力を制限するシステムの一部であり、他のユーザーのためのシステム性能を低下させる多数の同時リクエストを作ることです。 ipAddressMaxRequestsActiveは、特定のIPアドレスから積極的に処理される同時リクエストの最大数を指定します。 追加リクエストは、前のリクエストが処理されるまでキューに入れられます。 erddap/download/ と erddap/images/ ARE の小さな静的ファイルで、このカウントと関連する回転数を免除します。 デフォルトは2です。 最大許容値は100で、クレイジーが高いです。 攻撃的または悪意のあるユーザーに問題がある場合、特に、これは1を厳格に設定できます。 ユーザーは、要求するすべてのデータをすぐに取得します (ipAddressMaxRequests まで) しかし、システムリソースを占有することができません。 これは、過度に積極的な正当なユーザーと悪意のあるユーザーにdominateを許すため、これはより大きな数に設定することをお勧めしません ERDDAP '処理能力。
このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ
     
### &lt;ipAddressUnlimited&gt;{#ipaddressunlimited} 
* ツイート ** &lt;ipAddress無制限&gt; ** . . (#ipaddressunlimitedさん) まれに使用された任意札です (最初にサポートされる ERDDAP™ バージョン2.12) お問い合わせ&lt;erddapDatasets&gt; タグ datasets.xml それは、過度に積極的な正当なユーザーと悪意のあるユーザーの能力を制限するシステムの一部であり、他のユーザーのためのシステム性能を低下させる多数の同時リクエストを作ることです。 ipAddressUnlimited は、IP アドレスのコンマ区切りリストで、無制限のアクセスを許可する ERDDAP お問い合わせ ログを見る txt ファイルが IP アドレスにサーバーが使用している形式を確認します。 一部のサーバーでは、IP アドレスは #.#.#.#.# の形式になります。 (# は 0 から 255 までの整数です。) #:#:#:#:#:#:#:#:#:#:#:#:#:#:# お問い合わせ このリストのリクエストは ipAddressMaxRequests または ipAddressMaxRequestsActive 設定の対象外です。 これは二次的である可能性があります ERDDAP™ またはシステム内の特定のユーザーまたはサーバーの場合。 ERDDAP™ 常に " (未知のIPAddress) お問い合わせ ERDDAP™ リクエスト者の IP アドレスが同じサーバーで実行される他のプロセスに対して、等、決定できないとき使用します。
このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ
    
何らかの理由で、ユーザーのリクエストがエラーメッセージ「処理する他のリクエストを待機するタイムアウト」を取得すると、ipAddressUnlimitedリストにユーザーのIPアドレスを追加し、その変更を適用して、そのリストから削除することで問題を解決できます。
    
### &lt;loadDatasetsMinutes&gt;{#loaddatasetsminminutes} 
* ツイート ** &lt;loadDatasetsMinMinutes(ロードデータセット) ** . . (#loaddatasets分) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml 最小時間を指定する (所要時間) 主要な負荷間の データセット (いつか ERDDAP™ 再処理 datasets.xml それぞれのデータセットをチェックして、リロードに応じてリロードする必要があるかどうかを確認します。 EveryNMinutes 設定、デフォルト=15) お問い合わせ 例:
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
loadDataset の実行がこの時間よりも少ない場合、 loader は、残りの時間が経過するまで、フラグディレクトリと/またはスリープを繰り返します。 デフォルトは15分で、ほとんどの人にとっては良いでしょう。 これを小数に設定する唯一の欠点は、それが周波数を増加させるということです ERDDAP™ それらが荷を積んでいることを防ぐ間違いがあるデータセットをretries (例えば、リモートサーバがダウンしている) お問い合わせ このようなデータセットが多く、頻繁に再テストされると、データソースはペスタリング/攻撃的な動作を考慮するかもしれません。 このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ 新着情報 ERDDAP™ v2.00, これは、setup.xmlで指定されました, これは、まだ許可されていますが、捨てられます.
     
### &lt;loadDatasetsMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* ツイート ** &lt;loadDatasetsMaxMinutes(ロードデータセット) ** . . (#loaddatasetsmax分) 内の OPTIONAL タグです。&lt;erddapDatasets&gt; タグ datasets.xml 最大時間を指定する (所要時間) 主な荷重 データセットの手間がかかる (負荷の前に "stalled" として扱われ、中断されるデータセットの糸)   (デフォルト=60) お問い合わせ 例:
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
一般的に、これは、すべてのデータセットを再読み込みすることを合理的に考える限り少なくとも2倍に設定する必要があります (累積的) お問い合わせ (コンピュータやネットワークが予想以上に遅くなるので) これは常に loadDatasetsMinutes よりもはるかに長いはずです。 デフォルトは60分です。 一部の人は、これを長く設定します。 このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ 新着情報 ERDDAP™ v2.00, これは、setup.xmlで指定されました, これは、まだ許可されていますが、捨てられます.
     
### &lt;ログレベル&gt;{#loglevel} 
* ツイート ** &lt;ログレベル&gt; ** . . (ログレベル) 内の OPTIONAL タグです。&lt;erddapDatasets&gt; タグ datasets.xml log.txt ファイルに多くの診断メッセージが送信されるかを指定する。 「警告」に設定できます。 (一番少ないメッセージ) お問い合わせ (デフォルト) , または "all" (ほとんどのメッセージ) お問い合わせ 例:
```
    <logLevel>info</logLevel>  
```
このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ 新着情報 ERDDAP™ v2.00, これは、setup.xmlで指定されました, これは、まだ許可されていますが、捨てられます.
     
### &lt;partialRequestMaxBytes&gt; および&lt;部分的なRequestMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* ツイート ** &lt;partialRequestMaxBytes&gt; **. . (#partialrequestmaxbytes-and-partialrequestmaxcells ディレクティブ) と [** &lt;partialRequestMaxCells&gt; ** . . (#partialrequestmaxbytes-and-partialrequestmaxcells ディレクティブ) ほとんど使用されていない OPTIONAL タグ内で&lt;erddapDatasets&gt; タグ datasets.xml お問い合わせ 可能な場合 (常にできない) , ERDDAP™ 大量のデータリクエストをチャンクに分割してメモリを節約できます。
    
32ビットを使って Java , 単純に意味, 最大同時の数 *大きい* リクエストは、利用可能なメモリのおよそ3分の3です (-Xmx 値が Tomcat に渡された) チャンクのサイズによって分けられる (例: 1200 MB / 100 MB =&gt; 12 リクエスト) お問い合わせ その他、メモリを必要とするので、実際のリクエスト数が少ない。 練習では、常にチャンクすることはできない。 そのため、大きすぎるか、大きめの同時無数の要求が32ビットで問題を引き起こす可能性があります。 Java お問い合わせ

64ビットを使って Java , -Xmx 値が大きくなります。 そのため、メモリが制約になる可能性がはるかに少ない。

これらのタグを定義することで、デフォルトのチャンクサイズをオーバーライドできます datasets.xml   (ここに示すよりも異なる値で) : : :
格子のため:&lt;部分的なRequestMaxBytes&gt;100000000&lt;/partialRequestMaxBytes&gt;
テーブルのため:&lt;部分的なRequestMaxCells&gt;1000000&lt;/partialRequestMaxCells&gt;

partialRequestMaxBytes は、部分的なグリッドデータリクエストの最優先バイト数です。 (リクエスト合計のチャンク) お問い合わせ デフォルト=100000000 (10^8) お問い合わせ より大きいサイズは必ずしもよりよいではないです (それはTHREDDSのデフォルト制限であるため、500メガバイトを超えることはありません DAP 応答) お問い合わせ しかし、より大きなサイズは、大量のファイルへのアクセスが少ない場合があります (考える ERD 's の衛星データは、各々の部分的なリクエスト内の各ファイルからより多くのデータを取得する方が良いです。) お問い合わせ

partialRequestMaxCells は、セルの最優先数です。 (nRows \\* データテーブルのnColumns) 部分的な TABLE データ要求のため (リクエスト合計のチャンク) お問い合わせ デフォルト = 100000. より大きいサイズは必ずしもよりよいではないです。 ソースからデータの初期のバッチを待ちます。

このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ 新着情報 ERDDAP™ v2.00, これらはsetup.xmlで指定されました, これはまだ許可されていますが、捨てられます.
     
### &lt;ブラックリスト&gtリクエスト。{#requestblacklist} 
* ツイート ** &lt;リクエストブラックリスト&gt; ** . . (#requestブラックリスト)   [OPTIONALタグ](/docs/server-admin/additional-information#frequent-crashes-or-freezes) お問い合わせ&lt;erddapDatasets&gt; タグ datasets.xml これは、ブラックリストされる数値IPアドレスのコンマ区切りリストを含む。 このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ
    * これは、オフにすることができます [サービス攻撃の拒否](https://en.wikipedia.org/wiki/Denial_of_service) 、過度にzealous [ウェブロボット](https://en.wikipedia.org/wiki/Internet_bot) 、または他のタイプの面倒なユーザー。
    * 面倒なユーザー -- お問い合わせ ERDDAP™ クロールまたはフリーズ/ストップに遅くなると、原因は、一度に複数のスクリプトを実行しているか、または非常に大きく、非常に非効率的、または無効な要求、または同時リクエストの多数を作るのが面倒なユーザーです。 お問い合わせ [ログイン](/docs/server-admin/additional-information#log) 面倒なユーザの数値IPアドレスを調べるケースで確認します。 これが問題の場合、そのユーザーをブラックリストにする必要があります。
        
いつか ERDDAP™ 要求から取得します。 blacklisted IP アドレス, HTTP エラー 403: 禁止. 同行のテキストエラーメッセージは、ユーザーに電子メールを促す、 ERDDAP 管理者は、問題の解決に取り組みます。 エラーメッセージを読む時間を取る場合 (多くは明らかにない) そして、あなたに連絡して、あなたはそれらを一度に1つのスクリプトを実行するためにそれらを取得するためにそれらと一緒に作業することができます、より効率的なリクエストを作る、自分のスクリプトの問題を解決 (例えば、タイミングアウト前に応答できないリモートデータセットからデータを要求する) トラブルの発生源だったか。
        
ユーザーは、リクエストが面倒なことに注意することが多いです。 それらはしばしば、バグ、過失の不当性、またはスクリプトの他の問題に気づいています。 彼らはしばしば、あなたのためだと思う ERDDAP™ 複数のスクリプトを実行したり、複数のスレッドを同時に使用することにより、必要に応じて多くのデータを求めることができる、無料のデータを提供します。
        
        * それぞれに説明できる ERDDAP™ , 今、どのように大きく、強力な, 有限リソースを持っています (CPU時間、ハードドライブI/O、ネットワーク帯域幅など) ユーザーが他のユーザーやオーバーバーデンをクラウドする方法でデータを要求する場合、それは公正ではありません ERDDAP お問い合わせ
        * ユーザーが2つの同時リクエストを作成する方法を知っていると、追加のリクエストは何も費用がかかるので、5、10または20の同時リクエストを作ることができない理由はしばしば見ません。 それは非対称的な戦場のようなものです:ここでは、攻撃的な武器は途方もない利点を持っています (ゼロコスト) 防御兵器の上に (実質の費用のfiniteの取付け) お問い合わせ
        * より多くの同時リクエストを作るためにリターンを減少させるという点で、追加のリクエストは、他のユーザーの要求をブロックし、それらに対して大きな改善をもたらすことはありません。
        * 他のユーザーが存在することを認める (カジュアルなユーザーとスクリプトを実行している他のユーザーの両方) ですから、すべてのものをホグするためにそれらが公正ではありません ERDDAP リソース
        * テクノロジーの巨人は、Webサービスから無限のリソースを期待するためにユーザーに誘発したことを指摘しています。 セットアップ方法がありますが [グリッド/クラスター/フェデレーション ERDDAP ツイート](/docs/server-admin/scaling) 作る ERDDAP™ より多くのリソース、ほとんどのシステム ERDDAP™ 管理者は、そのようなシステムを設定するお金やマンパワーを持っていません。そのようなシステムはまだ有益です。 お問い合わせ ERD 例えば、1人1人 (お問い合わせ) ライティング ERDDAP™ , 管理 2 ERDDAP ツイート (私の上司からの助けを借りて) 複数のデータソースを管理し、すべての年間ハードウェア予算を$ $0で管理 (私たちは、ハードウェアの支払いに時折付与に依存しています) お問い合わせ Google、Facebook、Amazonなど、100 社のエンジニアや、100 億ドルの収益で、より大きなシステムにリサイクルされることはありません。 そして、私たちを動かすことはできません。 ERDDAP™ たとえば、Amazon AWS は、データストレージのコストが大きいため、データエグレッションの料金は大きく、変数が大きいため、外部サービスの予算は 0 です。
        * ユーザへのリクエストは、非時間感度リクエストに対して (ほとんどの一般的なケースは、) 彼らのシステムは一度に1つの要求を要求するちょうどべきです。 要求が時間の敏感である場合 (例えば、Webページ上の複数の.pngs、複数のタイル WMS クライアント等) , おそらく 4 同時リクエストは最大でなければなりません (短時間で) お問い合わせ
        * ユーザーの状況を説明する場合、ほとんどのユーザーは、ブラックリストからIPアドレスを削除できるように、必要な変更を理解し、意思表示します。
             
    * ユーザーをブラックリストするには、IP アドレスのコンマ区切りリストに数値 IP アドレスを追加します。&lt;リクエストでブラックリスト&gt; datasets.xml ファイル。 面倒なユーザーのIPアドレスを見つけるには、 ERDDAP™   *bigParentディレクトリ* /logs/log.txt ファイル ( *bigParentディレクトリ* で指定される [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) ) この場合、そのユーザーの IP アドレスが表示されるかどうかを確認します。 "&#123;&#123;&#123;&#123;&#123;&#123;#" から始まる行にすべてのリクエストの IP アドレスがリストされ、例えば 123.45.67.8 の期間で区切られた 4 数字です。 「ERROR」を検索すると、無効なリクエストなどの問題が見つかります。
    * また、IPアドレスの最後の番号をIPアドレスに置き換えることができます\\*(例: 202.109.200)\\*) IPアドレスの範囲をブロックする, 0-255.
    * また、IPアドレスの最後の2つの数字をIPアドレスに置き換えることができます\\*お問い合わせ\\*  (例えば、121.204.\\*お問い合わせ\\*) IPアドレス、0-255.0-255の広い範囲をブロックする。
    * 例えば、
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * 再起動する必要はありません ERDDAP™ 変更について&lt;効果を要求するBlacklist&gt;。 次回以降の変更が検出されます。 ERDDAP™ どのデータセットもリロードする必要があるか確認してください。 または、訪問することによってプロセスをスピードアップすることができます [セットデータセット フラグ URL](/docs/server-admin/additional-information#set-dataset-flag) あらゆるデータセットのため。
    * お問い合わせ ERDDAP™ 毎日のレポートには、最もアクティブに許可され、ブロックされたリクエストの一覧/文字が含まれています。
    * ドメイン/機関が数値IPアドレスに関連しているかを把握したい場合は、無料のリバースDNS Webサービスを好きなように使用できます。 [https://network-tools.com/](https://network-tools.com/) お問い合わせ
    * 悪意のあるユーザーなど、特定のユーザーをより高いレベルでブロックするという感覚が生じる場合があります。 例えば、サーバー上のすべてのアクセスをブロックできます。 ERDDAP お問い合わせ Linux では、そのような方法が1つあります。 [インフォメーション](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/) お問い合わせ 例えば、コマンドで198.51.100.0から来るすべてをブロックするルールを追加できます。
iptables -I インプット -s 198.51.100.0 -jのDROP
       
### &lt;スローダウンTroubleMillis&gt;{#slowdowntroublemillis} 
* ツイート ** &lt;スローダウンTroubleMillis&gt; ** . . (#スローダウンローブルミリ) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml ミリ秒数を指定する整数を含む (デフォルト=1000) 失敗したすべてのリクエストに応答するときに一時停止するには、例えば、未知のデータセット、あまりにも大きすぎるリクエスト、ブラックリスト上のユーザー。 例:
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
スクリプトが別の直後に1つのリクエストを即座に行なっている場合、別の後に1つの悪いリクエストを迅速に行う可能性があります。 この設定では、失敗したスクリプトを遅くすることができます。 ERDDAP™ 悪いリクエストで洪水はしません。 人間が悪いリクエストをした場合は、この遅延に気づくことはありません。 推薦:
    
    * トラブルがサービスの分散型拒否である場合 (ツイート) 100以上の攻撃者から攻撃し、これをより小さい数に設定 (100 か。) お問い合わせ 長すぎるためにそれらをすべて下げると、あまりにも多くのアクティブなスレッドにつながります。
    * 問題が 1-10 ソースからなら、これを 1000 ms に設定します。 (デフォルト) , 大きい数 (のような 10000) 適度です。 これにより、ネットワークリソースが少ないため、ネットワークリソースを削減できます。 また、1000 ms 以上の場合、悪いリクエストを行なう人には迷惑なことはありません。
    
このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ
     
### &lt;サブスクリプションEmailBlacklist&gt;{#subscriptionemailblacklist} 
* ツイート ** &lt;サブスクリプション メールブラックリスト&gt; ** . . (#サブスクライブメールブラックリスト) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml これは、すぐにブラックリストされているメールアドレスのコンマ区切りリストが含まれています [サブスクリプションシステム](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) 例えば
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
ケースインセンティブなシステムです。 このリストにメールアドレスが追加された場合、そのメールアドレスがサブスクリプションを持っている場合は、サブスクリプションはキャンセルされます。 リストのメールアドレスが購読しようとすると、リクエストは拒否されます。 このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ
     
### 標準的なテキスト{#standard-text} 
*    [ **標準的なテキスト** ](#standard-text) お問い合わせ オプションタグがいくつかあります (ほとんど使用しません) お問い合わせ&lt;erddapDatasets&gt; タグ datasets.xml さまざまな場所で表示されるテキストを指定する ERDDAP お問い合わせ デフォルトのテキストを変更したい場合は、同じ名前のタグから既存の値をコピーします。
     *トームキャット* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml お問い合わせ datasets.xml コンテンツを変更します。 これらを持っていることの利点 datasets.xml いつでも新しい値を指定できます。 ERDDAP™ 実行中です。 これらのタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ タグ名は目的を記述しますが、より深い理解のためにmessions.xmlのデフォルトのコンテンツを参照してください。
    
    *   &lt;標準ライセンス&gt;
    *   &lt;標準お問い合わせ&gt;
    *   &lt;標準データライセンス&gt;
    *   &lt;標準免責事項OfEndorsement&gt;
    *   &lt;標準免責事項OfExternalLinks&gt;
    *   &lt;標準一般販売者&gt;
    *   &lt;スタンダード プライバシーポリシー
    *   &lt;スタートヘッドHtml5&gt;
    *   &lt;startBodyHtml5&gt;は、すべてのWebページの上部の外観をカスタマイズするために変更する良いタグです ERDDAP お問い合わせ 残念ながら、これを使って一時的なメッセージを簡単に追加できます。 ERDDAP™ サイトマップ (例:「新しいJPL MUR SST v4.1 データセットをチェックアウト...」または「これ」 ERDDAP™ 2019-05-08T17:00:00 PDT 2019-05-08T20:00:00 PDT メンテナンスのためオフラインになります。) お問い合わせ このタグを入れる1つの質問 datasets.xml is: 再起動時に ERDDAP 、非常に最初の要求への ERDDAP™ デフォルト開始を返します。 BodyHtml5 HTML が、その後のリクエストは、指定した startBodyHtml5 HTML を使用します。 datasets.xml お問い合わせ
    *   &lt;ショート説明 Html&gt;はあなたの記述をカスタマイズするために変更するよい札です ERDDAP お問い合わせ このページの一時的なメッセージを追加するには、簡単に変更できます。 (例:「これ」 ERDDAP™ 2019-05-08T17:00:00 PDT 2019-05-08T20:00:00 PDT メンテナンスのためオフラインになります。) お問い合わせ
    *   &lt;エンドボディHtml5&gt;
    
      
新着情報 ERDDAP™ v2.00, これらはsetup.xmlで指定されました, これはまだ許可されていますが、捨てられます.
     
### &lt;珍しい 活動およびgt;{#unusualactivity} 
* ツイート ** &lt;異常行為&gt; ** . . (#unusual活動) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml 通常の考慮される loadDataset の 2 つの実行間のリクエストの最大数を指定する (デフォルト=10000) お問い合わせ その数を超えた場合は、メールがEverythingToに送信されます (setup.xml で指定された) お問い合わせ 例:
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ 新着情報 ERDDAP™ v2.00, これは、setup.xmlで指定されました, これは、まだ許可されていますが、捨てられます.
     
### &lt;updateMaxイベント&gt;{#updatemaxevents} 
* ツイート ** &lt;updateMaxイベント&gt; ** . . (#updatemaxeventsの) まれに使用されていた OPTIONAL の札は内のあります&lt;erddapDatasets&gt; タグ datasets.xml ファイル変更イベントの最大数を指定する (デフォルト=10) で処理されます [&lt;更新EveryNMillis&gt; (#updateeverynmillis, オーストラリア) 代わりにデータセットをリロードするために切り替える前のシステム。 例えば、
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
updateEveryNMillis システムは、ユーザーのリクエストが処理される直前に非常に迅速に実行するように意図されています。 たくさんのファイル変更イベントがある場合、おそらくすぐに実行できないため、データセットがリロードされるように呼び出します。 もし、 ERDDAP™ 大量のデータファイルに変更があっても、最新のデータセットを扱い、これをより大きな数に設定できます。 (100 か。) お問い合わせ

### &lt;ユーザー&gt;{#user} 
* ツイート ** &lt;ユーザー&gt; ** . . (#ユーザー) 内の OPTIONAL タグです。&lt;erddapDatasets&gt; タグ datasets.xml ユーザーのユーザー名、パスワードを特定する (認証=カスタムの場合) と役割 (コンマ区切りリスト) お問い合わせ ユーザー名とパスワードの使用は、値に基づいて若干異なります [&lt;認証&gt; (/docs/server-admin/additional-information#authentication) お問い合わせ ERDDAP 's setup.xml ファイル。
    * これは、 ERDDAP お問い合わせ [セキュリティシステム](/docs/server-admin/additional-information#security) 一部のユーザーへのデータセットへのアクセス制限
    * 別のものにする&lt;各ユーザの user&gt; タグ。 必要に応じて、認証=oauth2 の場合、2 を設定できます。&lt;ユーザー&gt; 各ユーザのタグ: ユーザが経由してログインしたときに1つ Google は、ユーザーが Orcid 経由でログインしたときに、同じロールで推定されます。
    * ない場合&lt;user&gt; クライアント用のタグ、s/he はパブリックデータセット、すなわち、データセットにアクセスできるのみ [&lt;にアクセスする&gt; (#アクセス可能) タグ。
    * パスワード
認証=カスタムの場合、ユーザー名は通常、文字、数字、アンダースコア、期間の組み合わせです。
Authentication=email の場合、ユーザー名はユーザーのメールアドレスです。 メールでのお問い合わせ
Authentication=google の場合、ユーザー名はユーザのフル Google のメールアドレスです。 これには、Googleのマネージドアカウントが含まれます @noaa.gov アカウント。
Authentication=orcid の場合、ユーザー名はユーザーの Orcid アカウント番号です。 (ダッシュで) お問い合わせ
Authentication=oauth2 の場合、ユーザー名はユーザのフル Google のメールアドレスか、ユーザーの Orcid のアカウント番号です。 (ダッシュで) お問い合わせ
    * パスワード
Authentication=email, google, orcid, oauth2 の場合、パスワード属性を指定しません。
Authentication=custom の場合、ユーザごとにパスワード属性を指定する必要があります。
        * ユーザーが入力するパスワードは、ケースの機密性であり、8以上の文字を持っている必要があります。 最近では、AWS上のコンピュータのクラスターを使用して、8文字でも素早く安価に亀裂させることができます。 ERDDAP™ ユーザーがログインしようとすると、8文字の最小値だけを強制します(ただし、ログオン時にのみ)&lt;user&gt; タグは処理されます。なぜなら、コードはパスワードのハッシュダイジェストだけを、プレーンテキストパスワードではなく参照するためです。
        * setup.xml の&lt;パスワードエンコーディング&gt; パスワードが保存される方法を決定する&lt;ユーザー&gt; タグ datasets.xml お問い合わせ セキュリティを強化するためには、以下のオプションがあります。
            *    [MD5の特長](https://en.wikipedia.org/wiki/MD5)   (お問い合わせ) -- パスワード属性の場合は、ユーザのパスワードのMD5ハッシュダイジェストを指定します。
            * UEPMD5の特長 (お問い合わせ) -- パスワード属性の場合はMD5ハッシュダイジェストを指定します。 *パスワード* : : : ERDDAP : : : *パスワード* お問い合わせ ユーザー名と " ERDDAP " を使う [ソルト](https://en.wikipedia.org/wiki/Salt_(cryptography) )ハッシュ値、デコードが難しくなります。
            *    [SHA256の特長](https://en.wikipedia.org/wiki/SHA-2)   (お勧めしない) -- パスワード属性の場合は、ユーザのパスワードの SHA-256 ハッシュ ダイジェストを指定します。
            * UEPSHA256の特長 (デフォルト, 推奨パスワードエンコーディング. しかし、はるかに優れています。Google、orchid、またはoauth2認証オプションを使用します。) -- パスワード属性の SHA-256 ハッシュ ダイジェストを指定します。 *パスワード* : : : ERDDAP : : : *パスワード* お問い合わせ ユーザー名と " ERDDAP 「ハッシュ値の塩に使用され、デコードが難しくなります。
        * WindowsではMD5プログラムをダウンロードすることでMD5パスワードの消化値を生成できます (など [MD5の特長](https://www.fourmilab.ch/md5/) ) 使用して (例えば) : : :
md5 -djsmith: ERDDAP : : : *実際のパスワード* 
        * Linux/Unix では、組み込み md5sum プログラムを使用して MD5 の消化値を生成できます。 (例えば) : : :
echo -n "jsmith: ERDDAP : : : *実際のパスワード* ツイート | md5sumの
        * プレーンテキストパスワードは、ケースの機密です。 MD5 および UEPMD5 のパスワードの保存された形態は敏感ではないです。
        * 例えば (UEPMD5を使う) , もし username="jsmith" と password="myPassword",&lt;user&gt; タグ:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
保存したパスワードが生成された場所
md5 -djsmith: ERDDAP :myパスワード
        * ロールは、ユーザーが権限を付与するロールのコンマ区切りのリストです。 その他&lt;dataset&gt; に [ある] があるかもしれません&lt;にアクセスする&gt; (#アクセス可能) そのデータセットにアクセスできるロールをリストするタグ。 特定のユーザーと与えられたデータセットの場合、ユーザーのロールのリストのロールの1つが、データセットのリストのロールの1つにマッチする場合&lt;accessTo&gt; ロールは、ユーザがそのデータセットにアクセスすることを許可します。
            
ログオンしたユーザは、自動的にロールを与えられた \\[ 誰でもログイン インスタグラム \\] 、あるかどうか&lt;user&gt; のタグ datasets.xml またはない。 そのため、指定したデータセットが
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
その後、ログインしているユーザは、そのデータセットにアクセスするために許可されます。&lt;user&gt; のタグ datasets.xml お問い合わせ
            
    * このタグの値の変更は、次の時刻に有効になります。 ERDDAP™ フィードバック datasets.xml データセットに対する応答を含む [ログイン](/docs/server-admin/additional-information#flag) お問い合わせ
         
### &lt;pathRegex&gt;{#pathregex} 
* ツイート ** &lt;パスレレックス&gt; ** . . (#pathregex ディレクティブ) パスを制限する正規表現を指定する (サブディレクトリ) データセットに含まれています。 デフォルトは .\\* で、すべてのパスにマッチします。 これはまれに使用されて、まれに必要とされて、のためのOPTIONALの札 EDDGrid FromFiles データセット、EDDTableFromFiles データセット、その他のデータセットタイプ。 しかし、必要な時、本当に必要です。
    
この仕事をするには、正規表現で本当に良い必要があります。 お問い合わせ [regex ドキュメント](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) そして、 [regexチュートリアル](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) お問い合わせ 特に、キャプチャグループについて知る必要があります (括弧の中の何か) と "or" 記号 " | お問い合わせ
これらは、オプションの任意の数を指定することができます。例えば、 (オプション1 | オプション2 | オプション3) お問い合わせ
また、オプションのどれも、例えば、 ( | オプション2 | オプション3) お問い合わせ
また、キャプチャグループがネストされる可能性があることを知っておく必要があります。例えば、キャプチャグループ内の任意のオプションは、別のキャプチャグループを含むことができます。 ( | オプション2 ( | オプション2 ツイート | オプション2c)  | オプション3) つまり、option2 は何もない、またはoption2b、またはoption2c で続くことができる。
pathRegexes では、各オプションは、/ に続く 1 つのフォルダー名で、 bar/ になります。
    
pathRegexのトリッキー部分は次のとおりです。 ERDDAP™ 再帰的にディレクトリツリーを下ると、pathRegex は、データを持つディレクトリに遭遇するすべてのパスを受け入れる必要があります。 Regexのネストされたキャプチャグループでは、これに対処するための良い方法です。
    
例:
次のディレクトリ構造があるとします。
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
と指定された fileDirectory は /foo/bar/ で、 .nc D内のファイル \\[ 受付時間 \\] &#123;4&#125;/a/サブディレクトリ。
ソリューションは、pathRegex を /foo/bar/ に設定することです。 ( | ダイバーシティ \\[ 受付時間 \\] お問い合わせ ( | ツイート) )   
それが言う:
パスは /foo/bar/ から始まる必要があります。
何もない、または D に従うかもしれない \\[ 受付時間 \\] お問い合わせ
何もない、または a/
    
はい、pathRegex の形式が非常に難しい場合があります。 あなたが立ち往生したら、コンピュータプログラマに尋ねます (世界で一番近いことは、ウィザードの流出の危険性?) または Chris に電子メールを送信してください。 noaaa.govのジョン
    
### &lt;データセット&gt;{#dataset} 
* ツイート ** &lt;データセット&gt; ** . . (#データセット) オプション (常に使用される) 内のタグ&lt;erddapDatasets&gt; タグ datasets.xml その(全ての情報を含む場合)&lt;データセット&gt;および&lt;/dataset&gt;) は 1 つのデータセットを完全に記述します。 例えば、
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
MAY は、データセットタグの任意の数です。 datasets.xml ファイル。
3つの属性 MAYは、&lt;dataset&gt; タグ:
     
    *    **タイプ=" *は、 タイプ:* ツイート** 内のREQUIRED属性&lt;dataset&gt; タグ datasets.xml データセット型を識別する (例えば、 EDDGrid /gridded または EDDTable/tabular データセット) データのソース (たとえば、データベース、ファイル、またはリモート OPeNDAP サーバー) お問い合わせ 詳細はこちら [ **データセットの種類一覧** ](#list-of-types-datasets) お問い合わせ
         
#### データセット ログイン{#datasetid} 
*    [ ** datasetID ツイート *データセットID* ツイート** ](#datasetid) 内のREQUIRED属性&lt;dataset&gt; ショート (通常) を割り当てるタグ&lt;15文字)、データセットに名前を識別する一意
    * ザ・オブ・ザ・ datasetID sは手紙である必要があります (A-Z、a-zの) A-Z、a-z、0-9、および\\_の任意の数に続く(ただし、A-Z、a-z、0-9、および\\_の任意の数に続く)&lt;32文字合計)
    * データセット ID は、ケースの機密性ですが、DON'T は 2 つを作成します datasetID 上文字/下文字のみが異なります。 Windowsコンピュータ上の問題を引き起こします (ユーザーのコンピューターおよび/または) お問い合わせ
    * ベストプラクティス: お問い合わせ [キャメル 導入事例](https://en.wikipedia.org/wiki/CamelCase) お問い合わせ
    * ベストプラクティス: 最初の部分は、ソース機関の名前の頭字語または略語であり、2番目の部分は、データセットの名前の頭字語または省略語であることをお勧めします。 可能であれば、データセットのソース名を反映した名前を作成します。 例えば、 datasetID 電子メール sst a8day" データセットから NOAA   NMFS   SWFSC 環境研究部 ( ERD ) これは衛星/PH/であるために源によって指定されます sst 8日間
    * データセットの名前を変更すると、古いデータセット (古い名前で) 生き続ける ERDDAP お問い合わせ これは "orphan" データセットです。 datasets.xml 今は消えます。 これに対処する必要があります:
        1. お問い合わせ ERDDAP™ v2.19 以降、何もする必要はありません。 ERDDAP™ これらの orphan データセットを自動的に削除します。
        2. お問い合わせ ERDDAP™ v2.18 以前は、 orphan データセットを削除するために何かを行う必要があります。 アクティブ="false" データセットを作る、例えば、
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
次の大きな負荷の後 データセット, 古いデータセットが非アクティブになった後にタグを削除できます。
                 
#### アクティブ{#active} 
*    [ **アクティブ *ログイン* ツイート** ](#active) 内の OPTIONAL 属性&lt;dataset&gt; タグ datasets.xml データセットがアクティブであるかを示す (使用資格 ERDDAP ) またはない。
    * 有効な値はtrueです (デフォルト) そして偽り。
    * デフォルトは真であるため、この属性を一時的に使用したり、このデータセットを永久に削除したりする必要はありません。 ERDDAP お問い合わせ
    * アクティブな="true" のデータセットをから削除するだけです。 datasets.xml , データセットはまだアクティブになります ERDDAP™ 決して更新しません。 そのようなデータセットは「orphan」となり、ステータスなどに表示されます。 ロードできなかったデータセットのリストのすぐ下にあるhtml Web ページ。
    * Active="false" を設定すると、 ERDDAP™ データセットを更新しようとする次回のデータを非アクティブ化します。 これを行うと、 ERDDAP™ データセットについて保存した可能性のある情報を捨てず、実際のデータには何もしません。
    * データセットを削除するために ERDDAP™ , 見る [力のデータセットの取り外し](/docs/server-admin/additional-information#removing-datasets) お問い合わせ
         

 ** 複数のタグは、&lt;データセット&gt;および&lt;/dataset&gt; タグ。 **   
データセットの種類によってタグが許可されるいくつかのバリエーションがあります。 特定のドキュメントを参照してください。 [データセットの種類](#list-of-types-datasets) 詳しくはこちら

#### &lt;アクセス ツイート{#accessibleto} 
* ツイート ** &lt;アクセス お知らせ ** . . (#アクセス可能) OPTIONALタグは、&lt;dataset&gt;コンマ区切りリストを指定するタグ [ロール](#user) このデータセットへのアクセスを許可します。 例えば、
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * これは、 ERDDAP お問い合わせ [セキュリティシステム](/docs/server-admin/additional-information#security) 一部のユーザーへのデータセットへのアクセス制限
    * このタグが存在しない場合、すべてのユーザ (ログインしていない場合でも) このデータセットにアクセスします。
    * このタグが存在している場合、このデータセットは、指定されたロールの1つを持っているログインユーザーのみ表示およびアクセス可能です。 このデータセットは、ログインしていないユーザーに表示されません。
    * ログオンしたユーザは、自動的にロールを与えられた \\[ 誰でもログイン インスタグラム \\] 、あるかどうか&lt;user&gt; のタグ datasets.xml またはない。 そのため、指定したデータセットが
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
その後、ログインしているユーザは、そのデータセットにアクセスするために許可されます。&lt;user&gt; のタグ datasets.xml お問い合わせ
         
#### &lt;グラフAccessibleTo&gt;{#graphsaccessibleto} 
* ツイート ** &lt;グラフAccessibleTo&gt; ** . . (#グラフaccessibleto) OPTIONALタグは、&lt;dataset&gt; タグ datasets.xml データセットのグラフィックやメタデータが公開されているかどうかを判断します。 データセットの部分的にオーバーライドする方法を提供します。 [&lt;にアクセスする&gt; (#アクセス可能) 設定。 許容値は次のとおりです。
    * 自動 -- この値(または欠如)&lt;dataset の graphsAccessibleTo&gt; タグは、dataset の mimic をデータセットからグラフやメタデータにアクセスします。&lt;accessTo&gt; 設定。
データセットがプライベートの場合、グラフとメタデータがプライベートになります。
データセットが公開されている場合、そのグラフとメタデータは公開されます。
    * パブリック お問い合わせ この設定は、データセットのグラフとメタデータが誰にでもアクセス可能になります。データセットがそうでない場合でも、ログインされていないユーザーでも、データセットがプライベートだからです。&lt;accessTo&gt; タグ。
         
#### &lt;アクセス バイファイル&gt;{#accessibleviafiles} 
* ツイート ** &lt;アクセス可能なViaFiles&gt; ** . . (#accessibleviaファイル) OPTIONALタグは、&lt;dataset&gt; タグ datasets.xml お問い合わせ [ EDDGrid AggregateExistingディメンション](#eddgridaggregateexistingdimension) , [ EDDGrid コピー](#eddgridcopy) , [ EDDGrid からEDDTable](#eddgridfromeddtable) , [ EDDGrid Erddapから](#eddfromerddap) , [ EDDGrid トピックス](#eddgridfrometopo) , [ EDDGrid ファイルから](#eddgridfromfiles)   (すべてのサブクラスを含む) , [ EDDGrid サイドバイサイド](#eddgridsidebyside) , [EDDTableコピー](#eddtablecopy)   [EDDTableFromErddapの特長](#eddfromerddap) , [EDDTableFromの特長 EDDGrid ](#eddtablefromeddgrid) と [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles)   (すべてのサブクラスを含む) データセット。 true または false の値を持つことができます。 例えば、
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
値が真の場合、 ERDDAP™ ユーザーがデータセットのソースデータファイルを閲覧してダウンロードできるようにします ERDDAP お問い合わせ [ "files" システム](https://coastwatch.pfeg.noaa.gov/erddap/files/) お問い合わせ 詳細はこちら "files" システム [ドキュメント](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) 詳しくはこちら
    
デフォルト値の&lt;アクセス可能なViaFiles&gt; お問い合わせ&lt;デフォルトアクセス可能なViaFiles&gt; お問い合わせ [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) お問い合わせ false のデフォルト値がありますが、true. の値で set.xml にそのタグを追加することをお勧めします。
    
おすすめ -- 設定することで、ファイルシステムからアクセス可能なすべての関連データセットを作ることをおすすめします。&lt;defaultAccessibleViaFiles&gt; は setup.xml で true で、これはデータを取得する好ましい方法であるユーザのグループがあります。 他の理由から、 "files" システムは、ユーザーがどのファイルが利用可能であるか、そして最後に変更されたときに、ユーザーがデータセット全体を独自のコピーを維持できるようにするのは簡単です。 一般的にファイルシステムを介してアクセス可能なデータセットを作りたくない場合は、設定&lt;defaultAccessibleViaFiles&gt; を false にします。 どちらの場合も、&lt;accessViaFiles&gt; いくつかのデータセットでは、一般的なポリシーに例外があります。&lt;デフォルトアクセス可能なViaFiles&gt; (例えば、データセットが使用するとき [ .nc ミリリットル](#ncml-files) ユーザーが本当に便利ではないファイル) お問い合わせ
     
#### &lt;アクセス ヴィクトリア WMS &gt;{#accessibleviawms} 
* ツイート ** &lt;アクセス ヴィクトリア WMS ツイート ** . . (#アクセス可能) OPTIONALタグは、&lt;dataset&gt; タグ datasets.xml お問い合わせ [ EDDGrid ](#eddgrid) サブクラス。 それは真の価値を持つことができます (デフォルト) または false 例えば、
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
値が false の場合、 ERDDAP お問い合わせ WMS サーバは、このデータセットでは利用できません。 これは、180以上の経度値を持つデータセットに一般的に使用されています (技術的に無効な場合 WMS サービス) 、およびあなたがまた範囲-180から180で全経度値とデータセットの変種を-提供しているかどうか [ EDDGrid ロンPM180](#eddgridlonpm180) お問い合わせ
値が真の場合、 ERDDAP™ データセットを利用できるように試みます ERDDAP お問い合わせ WMS サーバ。 しかし、データセットが完全に不適切な場合 WMS   (例えば、経度や緯度データがない) データセットは、 ERDDAP お問い合わせ WMS この設定に関係なく、サーバー。
     
#### &lt;追加する 変数 所在地と所在地{#addvariableswhere} 
* ツイート&lt;addVariablesWhere&gt; は、 (#addvariables どこでも) 内のオプションタグです。&lt;すべてのEDDTableデータセット用のdataset&gt;タグ。
    
EDDTable データセットへのリクエストは、&add を含むことができます。 変数 アクセス (ツイート *属性属性 お名前 (必須)* お問い合わせ *属性属性 バリュー* ツイート) , 伝えます ERDDAP™ データセット内の全ての変数を追加する *属性名:attributeValue* 要求された変数のリストに。 例えば、ユーザが&addを追加する場合 変数 アクセス (ツイート ioos\\_category "、"風") クエリへ ERDDAP データセットに含まれる全ての変数を追加します。 ioos\\_category =要求された変数のリストに対するWind属性 (例えば、windSpeed、windDirection、windGustSpeed) お問い合わせ *属性属性 お名前 (必須)* そして、 *属性属性 バリュー* ケースに敏感です。
    
インスタグラム datasets.xml データセットの dataset.xml のチャンクがある場合
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
例えば、
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
データアクセスフォーム (.html ウェブページ) データセットにはウィジェットが含まれます (comma-separated リストの各属性名) ユーザーが属性値を指定できる変数のリストのすぐ下。 ユーザーが属性名の1つ以上で属性値を選択すると、&add 経由でリクエストに追加されます。 変数 アクセス (ツイート *属性属性 お名前 (必須)* お問い合わせ *属性属性 バリュー* ツイート) お問い合わせ したがって、このタグは datasets.xml データセットのデータアクセスフォームに表示される属性名のリストを指定し、ユーザーが&addVariablesを追加するのが簡単です リクエストの関数がどこにあるか。 ザ・オブ・ザ・ *属性名CSV* リストはケースに敏感です。
    
#### &lt;高度MetersPerSourceUnit&gt;{#altitudemeterspersourceunit} 
* ツイート ** &lt;高度メートルPerSourceUnit&gt; ** . . (#高度メートルパーソナユニット) 内のオプションタグです。&lt;データセットの dataset&gt; タグ。 EDDTableFromのxxml SOS データセット (お問い合わせ) ソースの高度値や深さ値によって乗算される数を指定すると、高度値に変換できます。 (海抜メートル) お問い合わせ 例えば、
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
このタグは、データセットの縦軸値がメートルではなく、前向きな = up の場合に使われる必要があります。 それ以外の場合は、デフォルト値が1であるので、オプションです。 例えば、
    * ソースが海抜メートルで既に測定されている場合は、1 を使用してください。 (1 がデフォルト値であるため、このタグを使用しないでください。) お問い合わせ
    * ソースが海底メートルで測定されている場合は、-1 を使用します。
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * ソースが海抜 km で測定されている場合は、0.001 を使用します。
         
#### &lt;デフォルトDataQuery&gt;{#defaultdataquery} 
* ツイート ** &lt;defaultDataQuery&gt; ** . . (#デフォルトデータクエリ) OPTIONALタグは、&lt;dataset&gt; タグ datasets.xml それが言う ERDDAP™ 指定したクエリを使用する (「?」の後のURLの部分) .html ファイルの場合 タイプ: (データアクセスフォーム) 問い合わせ無しで要求されます。
    * これを使う必要はほとんどありません。
    * XMLエンコードが必要です (パーセントエンコードしない) デフォルトのクエリは、XML ドキュメントにあるためです。 例えば、& は &amp; になります。&lt;なるほど&lt;, &gt; は &gt になります。
    * お仕事内容をご確認ください。 間違いを犯しやすく、欲しいものを手に入れるのは簡単です。 ERDDAP™ エラーをクリーンアップしようとしますが、それに依存しません。\\*使い方\\*清掃は変更になる場合があります。
    * Griddapデータセットの場合、この一般的な使用は、異なるデフォルト深さまたは高度次元値を指定することです。 (例えば、 \\[ 0 の 0 \\] 代わりに \\[ 最後の投稿 \\] ) お問い合わせ
いずれの場合も、常に全ての変数を一覧表示し、常に全ての変数の同じ次元値を使用し、ほとんど常に使用する必要があります。 \\[ 0 の 0 \\] , \\[ 最後の投稿 \\] または \\[ 0:最後 \\] 寸法値のため。
例えば:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * お問い合わせ tabledap データセットは、制約を指定しない場合、データセットに応じて、大幅なデータセット全体を返します。 制約を指定しない場合は、空ではなく、&lt;defaultDataQuery&gt; (デフォルトを指定するのと同じです。 データクエリ) , defaultDataQuery に含まれるすべての変数を明示的にリストする必要があります。
    * お問い合わせ tabledap データセットは、この最も一般的な使用は、異なるデフォルト時間範囲を指定することです。 (最高への相対 (タイムタイム) , 例えば, &time&gt;=max (タイムタイム) -1日、または現在の親戚、例えば、&time&gt;= now- 1泊1日) お問い合わせ
データ変数を要求しないということは、すべてのデータ変数を指定すると同じなので、通常は新しい時間制約を指定できます。
例えば:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
または
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;デフォルトGraphQuery&gt;{#defaultgraphquery} 
* ツイート ** &lt;デフォルトGraphQuery&gt; ** . . (#デフォルトグラフ) OPTIONALタグは、&lt;dataset&gt; タグ datasets.xml それが言う ERDDAP™ 指定したクエリを使用する (「?」の後のURLの部分) .graphファイルの場合 タイプ: (グラフフォームを作る) 問い合わせ無しで要求されます。
    * これを使う必要はほとんどありません。
    * XMLエンコードが必要です (パーセントエンコードしない) デフォルトのクエリは、XML ドキュメントにあるためです。 例えば、& は &amp; になります。&lt;なるほど&lt;, &gt; は &gt になります。
    * お仕事内容をご確認ください。 間違いを犯しやすく、欲しいものを手に入れるのは簡単です。 ERDDAP™ エラーをクリーンアップしようとしますが、それに依存しません。\\*使い方\\*清掃は変更になる場合があります。
    * Griddapデータセットの場合、この最も一般的な使用は、異なるデフォルト深さまたは高度次元値を指定することです。 (例えば、 \\[ 0 の 0 \\] 代わりに \\[ 最後の投稿 \\] ) 特定の変数がグラフ化されるかどうかを指定します。
いずれの場合も、ほとんどいつも使う \\[ 0 の 0 \\] , \\[ 最後の投稿 \\] または \\[ 0:最後 \\] 寸法値のため。
例えば:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (しかし、すべての行を1行に置く) 
    * お問い合わせ tabledap 制約を指定しない場合は、データセットに応じて、データセット全体をグラフ化します。
    * お問い合わせ tabledap データセットは、この最も一般的な使用は、異なるデフォルト時間範囲を指定することです。 (最高への相対 (タイムタイム) , 例えば, &time&gt;=max (タイムタイム) -1日、または現在の親戚、例えば、&time&gt;= now- 1泊1日) お問い合わせ
データ変数を要求しないということは、すべてのデータ変数を指定すると同じなので、通常は新しい時間制約を指定できます。
例えば:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
または
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;次元価値InMemory&gt;{#dimensionvaluesinmemory} 
* ツイート ** &lt;寸法: バリューインメモリー&gt; ** . . (#次元値インメモリー)   (ログイン (デフォルト) または false) OPTIONAL およびまれに使用された札は内のあります&lt;dataset&gt; 任意のタグ EDDGrid データセットは、 ERDDAP™ 寸法のソース値を保持する場所 (またとして知られている axisVariable ツイート) : : :
    
    * true = メモリ (より速く、より多くのメモリを使用する) 
    * false = ディスクに (メモリが遅くてもメモリを使わない) 
    
例えば、
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
デフォルトでない値を false のデフォルトでない値でのみ使用してください。 ERDDAP™ 非常に大きい次元の多くのデータセットがあります (例えば、何百万の価値、例えば、 EDDGrid FromAudioFiles データセット) そして、 ERDDAP '使用メモリ使用量が高すぎます。 メモリを参照してください。: 現在行を使用して \\[ あなたのドメイン \\]  /erddap/status.html モニターへ ERDDAP™ メモリ使用量。
     
#### &lt;ファイルTableInMemory&gt;{#filetableinmemory} 
* ツイート ** &lt;fileTableInMemory(ファイル)&gt; ** . . (#ファイルテーブルインメモリー)   (true または false (デフォルト) ) 内のオプションタグです。&lt;dataset&gt; 任意のタグ EDDGrid ファイルとEDDTable FromFiles データセット ERDDAP™ fileTable を維持する場所 (各ソースデータファイルに関する情報) : : :
    
    * true = メモリ (より速く、より多くのメモリを使用する) 
    * false = ディスクに (メモリが遅くてもメモリを使わない) 
    
例えば、
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
どのデータセットにも当てはまるように設定すれば、メモリに目を向けて下さい: ラインを現在使用しています \\[ あなたのドメイン \\]  /erddap/status.html それを確実にするために ERDDAP™ まだまだたくさんの記憶があります。
     
#### &lt;fgdcFile&gt;{#fgdcfile} 
* ツイート ** &lt;fgdcFile&gt; ** . . (#fgdcfileの) OPTIONALタグは、&lt;dataset&gt; タグ datasets.xml それが言う ERDDAP™ 既製のFGDCファイルを使用する代わりに、 ERDDAP™ ファイルを生成しようとします。 使用法:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *スタッフ ファイル名* ローカルファイルを参照することができます (サーバのファイルシステム上のどこか) またはリモートファイルのURL。
お問い合わせ *スタッフ ファイル名* \\="" またはファイルが見つからない場合、データセットにはFGDCメタデータはありません。 そのため、特定のデータセットに対してFGDCメタデータを抑制したい場合にも便利です。
または、置くことができます&lt;fgdcActive&gt;偽物&lt;/fgdcActive&gt; を setup.xml で伝えます ERDDAP™ データセットにFGDCメタデータを提供していません。
     
#### &lt;イソ19115 ファイル&gt;{#iso19115file} 
* ツイート ** &lt;iso19115ファイル&gt; ** . . (#iso19115ファイル) OPTIONALタグは、&lt;dataset&gt; タグ datasets.xml それが言う ERDDAP™ 既製のISO 19115ファイルを使用する代わりに、 ERDDAP™ ファイルを生成しようとします。 使用法:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *スタッフ ファイル名* ローカルファイルを参照することができます (サーバのファイルシステム上のどこか) またはリモートファイルのURL。
お問い合わせ *スタッフ ファイル名* \\="" またはファイルが見つからない場合、データセットにはISO 19115メタデータはありません。 そのため、ISO 19115メタデータを特定のデータセットに抑制したい場合にも便利です。
または、置くことができます&lt;iso19115Active&gt;偽&lt;/iso19115Active&gt; 指示する setup.xml の ERDDAP™ 任意のデータセットのためのISO 19115メタデータを提供していません。
     
#### &lt;match軸軸 ニジット&gt;{#matchaxisndigits} 
* ツイート ** &lt;MatchAxisNDigits(アキシスニグジット) ** . . (#matchaxisndigits(マッチ軸線)) 内の OPTIONAL タグです。 EDDGrid  &lt;dataset&gt; タグ EDDGrid 集計されるデータセット、例えばファイルの集計。 データセットがリロードされるたびに、 ERDDAP™ 集計の各コンポーネントの軸値が同じであることを確認します。 試験の精度は、 [MatchAxisNDigits, オーストラリア](#matchaxisndigits) 、二重精密軸線の値をテストするとき一致しなければならない数字の総数を指定する、0 - 18 (デフォルト) お問い合わせ フロート軸値のテストでは、matchAxisNDigits/2桁でテストを行います。 18以上の値が伝えられます EDDGrid 厳密なテストを行うため。 0 の値は、 EDDGrid 以下に記載されている場合を除き、推奨されるものではありません。
    
しかし、 EDDGrid 集計のコンポーネントは、わずかに異なる軸値を持つようにします。1セットの軸値がユーザーに表示されます。 このセットは、データセットのソースメタデータを提供する同じコンポーネントです。 例えば、 EDDGrid FromFiles のデータセットは、&lt;metadataFrom&gt; 設定 (デフォルト=last) お問い合わせ
    
matchAxisNDigits\\=0 の使用は、すべてのチェックをオフにするので、ほとんどの場合、強くお勧めします。 コンポーネントが集計に適したため、チェックが最小限に抑えられます。 すべてのコンポーネントが適していると仮定しますが、必ずしもそうではありません。 そのため、重要なサニティテストです。 matchAxisNDigits1, 2, 3, 4 の値は、異なる軸値がしばしばコンポーネントが作成されたことを示すため、推奨値です。 (バイナリ?) そのため、集計には適していません。
    
matchAxisNDigits\\=0 を使うと便利です。リモートファイルの集計、S3 バケットのデータなどです。 この場合、dataset が cacheFromUrl, cacheSizeGB, matchAxisNDigits\\=0 を使用し、 EDDGrid FromFilesシステム [集約による ファイル名](#aggregation-via-file-names-or-global-metadata) , それから EDDGrid 集計を行うためにすべてのリモートファイルを読む必要はありません。 これにより、S3 バケットのデータから作られたデータセットを素早く読み込むことができます。 (とりあえず遅くなるのではなく、 EDDGrid すべてのファイルをダウンロードして読む必要があります) お問い合わせ
    
#### &lt;nThreads&gt;{#nthreads} 
* まずは ERDDAP™ バージョン 2.00, EDDTableFromFiles または EDDGrid ソースからデータを読み込み、データの1つのチャンクを読み込むことができます (例:1つのソースファイル) 時間の経過 (1つの糸で)   (デフォルトは) データの 1 チャンク以上 (例: 2+ソースファイル) 時間の経過 (2つ以上のスレッド) 各リクエストを処理する間。
     
    * 親指のルール:
ほとんどのシステムでほとんどのデータセットの場合、nThreads=1、デフォルトを使用します。 あなたが強力なコンピュータを持っている場合 (CPUコアの多く、たくさんのメモリ) 次に、nThreads を 2、3、4 以上の設定を検討します。 (しかし、コンピュータのCPUコアの数よりも決して) 利点があるデータセットのため:
        
        * ほとんどのEDDTableFromFilesのデータセットは利益をもたらします。
        * データが実際に処理できるチャンクの前に何かが遅れを引き起こすデータセットは、例えば以下のような利点があります。
            * データセット [外部圧縮 (例: .gz ) ](#externally-compressed-files) バイナリ (例: .nc ) ファイル, ので ERDDAP™ ファイルが読み始める前に、ファイル全体を解凍する必要があります。
            * 使用するデータセット [キャッシュサイズGB](#cachefromurl) , ので ERDDAP™ 読み取れる前にファイルをダウンロードする必要があります。
            * 高帯域幅並列ファイルシステムに保存されているデータファイルを含むデータセットは、要求に応じて、より高速なデータを配信できます。 並列ファイルシステムの例 [JBODについて](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures) , [pNFSについて](http://www.pnfs.com/) , [グルスターFS](https://en.wikipedia.org/wiki/Gluster) 、アマゾンS3およびGoogleクラウドストレージ。
                 
        
警告: nThreads&gt;1 を使うと、 ERDDAP メモリ使用、スレッド使用、および全体的な応答性 (詳しくはこちら [ ERDDAP 's ステータスページ](/docs/server-admin/additional-information#status-page) ) お問い合わせ これらの問題についてのコメントを参照してください。
         
    * 特定のデータセットの場合、このnThreads設定は異なる場所から来ることができます。
        
        * もし、 datasets.xml データセット用のチャンクには、&lt;nThreads&gt; タグ (within )&lt;dataset&gt; タグは、値&gt;=でグローバル属性としてではなく、 1、nThreads の値は使用されます。 データセットごとに異なる番号を指定できます。
        * さもなければ、 datasets.xml お問い合わせ&lt;nTableThreads&gt; タグ (EDDTableのため FromFiles データセット) または&lt;nGridThreads&gt; タグ (お問い合わせ EDDGrid データセット) 値で &gt;= 1、外側&lt;dataset&gt; タグ、nThreads の値が使われます。
        * それ以外の場合は、最小限のメモリを使用するため、安全な選択である1スレッドを使用します。
             
        
お問い合わせ [オリジナル ERDDAP™ 導入事例](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 、私達は使用します
        &lt;nTableスレッド&gt; 6月6日&lt;/nTableスレッド&gt; (強力なサーバーです。) 過去のリクエストは30%以上かかります。
         
##### モニターリソースの使用法{#monitor-resource-usage} 
異なるnThreads設定で実験しているとき (そして多分あなたのに困難なサンプル要求を作って下さい ERDDAP ) コンピューターのリソースの使用状況を監視できます。
* Mac では、Finder : アプリケーション : ユーティリティ : アクティビティモニター
* Linux では、トップ
* Windows 10の使用 *Ctrl + シフト + Esc* タスクマネージャを開く
             
##### 警告: 応答性を低下させる{#warning-decreased-responsiveness} 
分離で、 ERDDAP™ nThreads=1 よりも、より高速な nThreads 設定でデータセットへのリクエストを処理します。 しかし、その要求が処理される間、他のユーザーからの他の要求はやや混雑し、より遅い応答を取得します。 また、いつ ERDDAP™ 特定の要求に対応するほかのコンピューティングリソース (例えば、ディスクドライブアクセス、ネットワーク帯域幅) 特に nThreads の設定が高いと制限する場合があります。 したがって、より高いnThreads設定では、複数のリクエストが処理されると、システム全体の応答性が悪化します。これはユーザーに非常に迷惑になります&#33; そのため、nThreads をコンピューターの CPU コア数以上に設定しないでください。 nThreads=1 は、各リクエストから最も公平な設定です。 (複数の同時リクエストの中で) コンピューティングリソースの同等な共有を取得します。 しかし、より強力なコンピュータは、これは問題になります。
         
##### 警告: より高い記憶 使用のための EDDGrid データセット{#warning-higher-memory-use-for-eddgrid-datasets} 
処理リクエストが nThreads の設定に直接比例している間、メモリ使用。 親指の合理的に安全なルールは次のとおりです。 [ ERDDAP 's メモリ設定](/docs/server-admin/deploy-install#memory) 少なくとも2GB + (2GB \\* nThreads) お問い合わせ 一部のデータセットへのリクエストは、それよりも多くのメモリが必要になります。 例えば、nThreads=3 を任意の値に設定します。 EDDGrid dataset は -Xmx の設定が少なくとも -Xmx8000M であるべきであることを意味します。 そのメモリ設定が3/4より大きい場合、コンピュータの物理メモリは、メモリ設定を低下させるため、nThreadsの設定を減少させます。

EDDTable のデータセットへのリクエストを処理するスレッドのメモリ使用は、ファイルは通常はるかに小さいため、ほぼ常に下がります。 しかし、特定のEDDTableデータセットが巨大な場合 (例: &gt;=1 GB) 上記のコメントは、データセットにも適用されます。

nThreads の設定が何であれ、メモリ使用状況の統計を間近に把握できます。 [ ERDDAP 's ステータスページ](/docs/server-admin/additional-information#status-page) お問い合わせ メモリ使用量を最大にするまで近づくべきではありません ERDDAP ;そうでなければ重大な間違いおよび失敗があります。
        
##### 一時的に1に設定{#temporarily-set-to-1} 
現在のメモリ使用量が若干高い場合、 ERDDAP™ nThreads を 1 にセットします。 したがって、 ERDDAP™ 記憶が傷つくとき記憶を節約して下さい。
         
##### ダイミシングリターン{#diminishing-returns} 
nThreads の設定を増加させるためのディミシングリターンがあります: 2 スレッドは 1 よりも優れます (動的オーバークロックを無視する場合) お問い合わせ しかし3は2よりも良いチャンクだけになります。 4 は 3 よりもマージンのみ優れます。

大きいEDDTableデータセットへの困難なクエリの1つのテストでは、1、2、3、4、5、6の糸を使用して応答時間は38、36、20、18、11秒でした。 (nTableThreads=6 をサーバーに使用しました。) 

nThreads=2: しかし、nThreads=1の代わりにnThreads=2を指定するには、多くの場合、特定のユーザの要求に応答するために必要なクロック時間にあまり差がありません。 理由は: nThreads=1 で、ほとんどの近代的な CPU は頻繁に [動的にオーバークロック](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)   (ターボブースト) CPUのクロック速度を一時的に増加させるために。 したがって、nThreads=1 では、nThreads=2 を使用した場合、2 つのコアのそれぞれよりも 1 つのコアがより高いクロック速度で動作することが多い。 それにもかかわらず、nThreads=1ではなくnThreads=2を使用する方が良いと思います。その設定はより広い状況でより良い結果をもたらすからです。 もちろん、コンピュータに十分なCPUコアがある場合、さらに高いnThreads設定がより良い結果をもたらすべきです。

上記のように、非常に高いnThreads設定は、いくつかの要求に対する迅速な対応につながる可能性がありますが、全体的な減少のリスク ERDDAP™ 応答性と高いメモリ使用 (上記のように) これらの要求が処理される間、一般的には良い考えではありません。
        
##### ログイン コア{#cpu-cores} 
nThreads をコンピュータの CPU の CPU のコア数よりも大きい値に設定しないでください。 基本的にすべての現代のCPUは複数のコアを持っています (例:2,4,8) お問い合わせ 一部のコンピュータには複数のCPUが搭載されている (例:2 CPU \\* 4コア/ CPU = 8 CPUコア) お問い合わせ コンピュータのCPU数とコア数の把握:

* Macで、使用 *オプションキー* : アップルメニュー : システム情報
* Linux では、 cat /proc/cpuinfo を使う
* Windows 10の使用 *Ctrl + シフト + Esc* 開くこと タスクマネージャー : パフォーマンス (ロジカルプロセッサは、CPUコアの総数を示しています) 

はい、ほとんどのプロセッサーは、コアごとの2スレッドをサポートしていると言います (お問い合わせ [ハイパースレッド](https://en.wikipedia.org/wiki/Hyper-threading) ) , しかし、 2 スレッドは、コンピューティングリソースを共有します, 重い負荷の下で CPU の 2 倍のスループットが表示されません. 例えば、4つのコアを持つ1つのCPUを持つコンピュータは、最大8スレッドをサポートすると主張するかもしれませんが、nThreads=4を上回らないはずです。 ERDDAP お問い合わせ 覚えている:

* nThreads の設定 ERDDAP™ リクエストごとに ERDDAP™ 複数のリクエストを同時に処理します。
*    ERDDAP™ プロセスリクエスト以外のもの、例えば、データセットをリロードします。
* いつか ERDDAP™ 特定の要求に対応するほかのコンピューティングリソース (例えば、ディスクドライブアクセス、ネットワーク帯域幅) 制限する場合があります。 nThreads を設定すると、これらの他のリソースが最大化され、遅くなる可能性が高い ERDDAP '一般的な応答性。
* オペレーティングシステムは、実行以外のものを行います ERDDAP お問い合わせ

そのため、nThreads の設定をコンピューターの CPU のコア数以上に設定するのは最善ではありません。
         
##### あなたのマイレージ 5月 バリ (YMMVの特長)  {#your-mileage-may-vary-ymmv} 
異なるnThreads設定の結果は、異なるシステム上の異なるデータセットへの異なる要求のために大きく異なります。 異なるnThreads設定の効果を本当に知りたい場合は、現実的なテストを実行します。
         
##### なぜnThreads per request?{#why-nthreads-per-request} 
"nThreads per request" を思い浮かべる人もいますか? これをコーディングしていたら、私は1つの永久的なワーカースレッドプールとより良いパフォーマンスのためのメッセージングキューを使用します。 1つのワーカースレッドプールとメッセージングキューを使用する問題は、1つの困難なリクエストが複数のスロータスクでキューをフラッドするということです。 それは効果的にブロックされる ERDDAP™ 初期リクエストまで、他のリクエストに関連するタスクで作業を開始することさえ (エッセンシャル) 終わり。 そのため、簡単な後続リクエストでも超ゆっくり対応します。 ERDDAP 'nThreads per request の使用は、コンピューティングリソースのより公平な使用につながる。
         
##### nThreadsと複数のワーカーコンピュータ{#nthreads-vs-multiple-worker-computers} 
残念ながら、 ERDDAP 'nThreadsシステムは、HadoopやApache Sparkが通常使用される方法で、複数の作業者コンピュータを介して、真の並列化として有効になりません。 タスクが複数のコンピュータに本当に並列/配布されるとき、各コンピュータはタスクのその部分にすべてのリソースを使用することができます。 と ERDDAP 's nThreads システム、各スレッドは、同じコンピュータの帯域幅、ディスク ドライブ、メモリ、等のために競合しています。 残念ながら、私たちのほとんどは、セットアップまたはレンタルするリソースや資金を持っていない (Amazon Webサービス (ツイート) またはGoogleクラウドプラットフォーム (GCPの特長) ) コンピュータの巨大な格子。 また、結果の列を任意の順序で返すことができるリレーショナルデータベースとは異なり、 ERDDAP™ 結果の行を一貫した順序で返すことを約束します。 この制約は、 ERDDAP 'nThreads の実装は効率的ではありません。 しかし、 ERDDAP 'nThreads は多くの場合に便利です。

しかし、作る方法はあります ERDDAP™ 大量のリクエストを素早く処理できるスケール [グリッド/クラスター/フェデレーション ERDDAP ツイート](/docs/server-admin/scaling) お問い合わせ
         
#### &lt;パレット&gt;{#palettes} 
* まずは ERDDAP™ バージョン 2.12, datasets.xml 含めることができます。&lt;Palttes&gt; タグ (within)&lt;erddapDatasets&gt;) をオーバーライドする&lt;message.xml の tag 値 (または、タグが in の場合、messions.xml 値に変換します。 datasets.xml 空の) お問い合わせ これは、利用可能なパレットのリストを変更することができます ERDDAP™ 実行中です。 また、新しいバージョンをインストールしたときに変更を行い、それを持続させることができます ERDDAP お問い合わせ
警告: 記載されているパレット datasets.xml message.xml にリストされているパレットのスーパーセットでなければなりません。それ以外の場合は ERDDAP™ 例外を投げ、処理を停止します datasets.xml お問い合わせ これにより、すべてが確実に ERDDAP™ インストールは、少なくとも同じコアパレットをサポートしています。
警告: ERDDAP™ message.xml で指定されたパレットが実際に存在していることを確認しますが、 リストされているパレットファイルをチェックしません。 datasets.xml お問い合わせ ファイルが残っていることを確認することは、あなたの責任です。
    
まずは ERDDAP™ バージョン 2.12, cptfiles サブディレクトリを作る場合 ERDDAP™ コンテンツディレクトリ, ERDDAP™ ディレクトリ内のすべての\\*.cptファイルをコピーします。 \\[ トームキャット \\] /webapps/erddap/WEB-INF/cptfiles ディレクトリ毎回 ERDDAP™ スタートアップ したがって、そのディレクトリにカスタム cpt ファイルを置くと、それらのファイルは ERDDAP™ 、新しいバージョンをインストールしても、あなたの部分に余分な努力を払っていません ERDDAP お問い合わせ
    
警告: カスタムパレットをカスタムパレットに追加する場合 ERDDAP™ お問い合わせ EDDGrid FromErddap および/または EDDTableFromErddap データセット ERDDAP™ すると、ユーザーはカスタムパレットオプションが表示されます。 ERDDAP™ グラフのWebページを作るが、ユーザーがそれらを使用しようとすると、デフォルトでグラフを取得する (通常レインボー) パレット。 これはイメージがリモートによってなされるためです ERDDAP™ カスタムパレットがない。 今唯一のソリューションは、リモートをメールすることです ERDDAP™ 管理者は、カスタムパレットを彼/彼女に追加します ERDDAP または Chris に電子メールを送信してください。 noaa.gov の John は、パレットが標準に追加されるように要求します ERDDAP™ 分布。
    
#### &lt;変更とgt;{#onchange} 
* ツイート ** &lt;オン変更&gt; ** . . (#onchangeさん) OPTIONALタグは、&lt;dataset&gt; タグ datasets.xml このデータセットが作成されるときに行われるアクションを指定する (いつか ERDDAP™ 再起動) このデータセットが何らかの方法で変更される場合。
    * 現在、 EDDGrid サブクラス、メタデータへの変更、または軸変数への変更 (たとえば、近リアルタイムのデータの新しいタイムポイント) 変更と見なされますが、データセットのリロードは変更と見なされません (自分で) お問い合わせ
    * 現在、EDDTable サブクラスでは、データセットのリロードは変更と見なされます。
    * 現在、アクションの2種類のみが許可されています。
        * ツイートhttp://"または "https://"お問い合わせ アクションが " で始まる場合http://"または "https://", ERDDAP™ 送信する HTTP GET 指定した URL へのリクエスト。 応答は無視されます。 たとえば、URL は、何かを行うために他の Web サービスを伝えているかもしれません。
            * URLがクエリ部分を持っている場合 (「?」の後に) 、それは既にある必要があります [パーセントエンコード](https://en.wikipedia.org/wiki/Percent-encoding) お問い合わせ 特別な文字を制約でエンコードする必要があります (初期 '&' と main 以外の '=' 制約で) HH が文字の 2 桁の 16 進数値であるフォーム %H に。 通常、あなたはちょうど数の句読点文字を変換する必要があります: % に %25, に %26, 「に %22,&lt;%3C, =%3D, &gt;%3E, +%2B, | に%7C、 \\[ に%5B、 \\] %5D にスペースを %20 に変換し、#127 を超えるすべての文字を UTF-8 形式に変換し、UTF-8 の各バイトを %HH 形式に変換します。 (プログラマに助けを求める) お問い合わせ
例えば、 stationID &gt;「41004」の特長
なると stationID %3E=%2241004%22
アクセス時にパーセントのエンコーディングが必要です ERDDAP ブラウザ以外のソフトウェアを介して。 ブラウザーは通常、パーセントエンコーディングを処理します。
A-Za-z0-9\\_-以外のすべての文字をパーセントエンコードする必要があります。~ お問い合わせ () \\* は初期 '&' または main をエンコードしません。 '=' 制約で。
プログラミング言語はこれを行うツールを持っています(例えば、参照してください) Java お問い合わせ [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html) そして、 Java スクリプトの [encodeURIComponent(). . (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) そしてそこにあります
                 [あなたのためのエンコード/デコードをパーセントするウェブサイト](https://www.url-encode-decode.com/) お問い合わせ
            * お問い合わせ datasets.xml XMLファイルで、すべての'&'をエンコードし、'&lt;', '&gt;' は URL の '&amp;', '&lt;', と '&gt;' パーセントエンコーディング後。
            * 例: ブラウザに入力するURL:
                https://www.company.com/webService?department=R%26D&param2=value2  
あなたが指定する必要があります&lt;onChange&gt; タグを経由 (1行目) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * メール: お問い合わせ アクションが "mailto:" で始まる場合、 ERDDAP™ データセットが更新/変更されたことを示す後続のメールアドレスに電子メールを送ります。
例えば:&lt;メールアドレス:john.smith@company.com&lt;/onChange&gt; あなたが良い理由を持っている場合 ERDDAP™ 他のタイプのアクションをサポートするために、必要なことを記述する電子メールを送ってください。
    * このタグはオプションです。 これらのタグは好きなだけあります。 各アクションのタグの1つを使用して実行します。
    * これはアナログです ERDDAP 'email/URL サブスクリプション システム, これらのアクションは永続的に保存されません。 (i.e.、それらはEDDオブジェクトにのみ保存されます) お問い合わせ
    * サブスクリプションを削除するには、単に削除します&lt;onChange&gt; タグ。 変更は、データセットが再ロードされる次回の時刻に通知されます。
         
#### &lt;リロードEveryNMinutes&gt;{#reloadeverynminutes} 
* ツイート ** &lt;リロード 毎分&gt; ** . . (#reloadeveryn分) OPTIONALタグは、&lt;dataset&gt; タグ datasets.xml データセットが再ロードされる頻度を指定するほぼすべてのデータセットタイプ。 例えば、
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * 一般的に、頻繁に変化するデータセット (例えば、新しいデータファイルを取得する) 60分ごとに頻繁にリロードする必要があります。
    * 不均質に変化するデータセットは、例えば1440分ごとに不正確にリロードされるべきです (日 日) または10080分 (ウィークリー) お問い合わせ
    * このタグはオプションですがおすすめです。 デフォルトは10080です。
    * 例:&lt;リロードEveryNMinutes&gt;1440&lt;/リロード 毎分&gt;
    * データセットがリロードされると、すべてのファイルが *bigParentディレクトリ* /キャッシュ/ * datasetID * ディレクトリは削除されます。
    * これが設定されているものに関係なく、データセットはより頻繁に読み込まれません&lt;loadDatasetsMinMinutes(ロードデータセット) (デフォルト = 15) , で指定された [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) お問い合わせ そのため、データセットを頻繁にリロードしたい場合、reloadEveryNMinutes と loadDataset の両方を設定する必要があります。 最小値から小値まで
    * reloadEveryNMinutes を loadDatasets と同じ値に設定しないでください。 マイナスは、経過した時間がある可能性があるため、 (例えば) 14:58 または 15:02 ので、データセットは主要なリロードの半分にのみ再ロードされます。 代わりに、より小さい使用 (例えば、10) またはより大きい (例えば、20) リロード EveryNMinutes 値。
    * reloadEveryNMinutesに関係なく、手動で指示できます ERDDAP™ 特定のデータセットをできるだけ早くリロードする [フラグファイル](/docs/server-admin/additional-information#flag) お問い合わせ
    * 好奇心旺盛なプログラマのために -- で ERDDAP™ , すべてのデータセットのリロードは、単一の目的スレッドで処理されます。 フラグファイルやメジャーリロードが見つかられば、1つのスレッドがマイナーリロードを開始 (すべてのデータセットがリロードされる必要があるかどうかを確認する) お問い合わせ 他のスレッドは、データセットの実際のリロードを一度に行います。 これらのスレッドは、すべてのデータセットが最新の状態に保たれていることを確認します。 実際にリロードを行うスレッドは、データセットの新しいバージョンを準備し、それを置換します。 (古いバージョンを基本的に置き換える) お問い合わせ そのため、以下のようなイベントのシーケンスが起こることは非常に可能です。 (それは良いことです) : : :
        
        1.   ERDDAP™ データセットのリロードを開始 (新しいバージョンを作る) 背景に。
        2. ユーザ 'A' は、データセットへのリクエストを行います。 ERDDAP™ データセットの現在のバージョンを使用して、応答を作成します。 (それは良いです。 ユーザの遅延はなく、データセットの現在のバージョンは決して非常に固定されるべきではありません。) 
        3.   ERDDAP™ 新しくリロードされたバージョンのデータセットを作成し、新しいバージョンを生産にスワップします。 データセットの新しいバージョンでは、以降の新しいリクエストが処理されます。 一貫性のために、ユーザーは A のリクエストは元のバージョンで満たされています。
        4. ユーザー 'B' は、データセットへのリクエストを生成し、 ERDDAP™ データセットの新しいバージョンを使用して、応答を作成します。
        5. ユーザ A とユーザ B のリクエストは、 (おそらく A's は最初、多分 B's は最初に終わります) お問い合わせ
        
誰かに「ふたりのふたりを聞いてみよう&#33;」と言ってもらえる&#33; お問い合わせ そろそろ&#33; データセットのリロードは、必要に応じて多くのスレッドを使用するように設定する必要があります。そのため、すべてが高速で、少しまたは遅れなしで行われます。 はい いいえ。 問題は、一度に複数のデータセットをロードすると、いくつかの新しい問題が発生します。 それらはすべて解決するか、または対処する必要があります。 現在のシステムはよく機能し、管理可能な問題があります (例えば、フラグが通知される前のラグの潜在的な) お問い合わせ (助けが必要な場合は、こちらを参照してください。 [追加サポートを受けるセクション](/docs/intro#support) お問い合わせ) 関連記事 [更新情報 エバーネミリリス](#updateeverynmillis) . 応答スレッド内でシステムが動作するので、複数のデータセットが更新される可能性があり、 (フルリロードではなく) 同時に。
##### 積極的な対. 反応{#proactive-vs-reactive} 
 ERDDAP 'reload system は proactive -- datasets は reload の直後にリロードされます EveryNMinutes 時刻がアップ (i.e.、彼らは「屋台」になるが、決して非常に屋台になる) データセットがユーザーからのリクエストを受けているかどうか。 お問い合わせ ERDDAP™ データセットは、常に最新で使用可能です。 これは、THREDDSの反応的アプローチとは対照的です。ユーザの要求は、データセットがスタレであるかどうかを確認するためにTHREDDSを指示するものです。 (それは非常に屋台であるかもしれません) お問い合わせ 階段の場合、THREDDS はユーザが待ちます (数分間頻繁に) データセットがリロードされる間。
        
#### &lt;更新情報 エバーネミリリス&gt;{#updateeverynmillis} 
* ツイート ** &lt;アップデートEveryNMillis&gt; ** . . (#updateeverynmillis, オーストラリア) OPTIONALタグは、&lt;dataset&gt; タグ datasets.xml 助けるデータセットの種類 ERDDAP™ 非常に頻繁に変更するデータセットとの仕事 (ほぼ毎秒) お問い合わせ いいね&#33; ERDDAP 's レギュラー, プロアクティブ, [&lt;リロード 毎分&gt; (#reloadeveryn分) 各データセットを完全にリロードするためのシステム、このオプションの追加システムは、リアクティブです (ユーザーリクエストによってトリガーされる) それが増分されるのでそしてより速く。 (更新が必要な情報を更新するだけ) お問い合わせ 例えば、リクエストをリクエストする場合 EDDGrid FromDap のデータセットは、最後の更新以来、ミリ秒数の指定された数よりも発生します。 ERDDAP™ 一番左に新しい値があるかどうかが表示されます。 (最初, 通常 "time" ) 寸法と、もしそうなら、ユーザのリクエストを処理する前に新しい値をダウンロードしてください。 このシステムは、データソースの最小限の要求で急速に変化するデータセットを最新の状態に保つことで非常に優れていますが、一部のユーザー要求の処理を少し遅くするコストで。
    * このシステムを使用するには、 (例えば) : : :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
直後に&lt;reloadEveryNMinutes(リロード) データセットのタグ datasets.xml お問い合わせ 指定したミリ秒数が1と同じくらい小さい (データセットが常に最新であることを確認するため) お問い合わせ 0 の値 (デフォルト) または負の数がシステムをオフにします。
    * 増加する性質のために、更新は非常に迅速に完了する必要がありますので、ユーザーは長時間待つ必要はありません。
    * 以前の更新が終了する前に2番目のデータリクエストが到着すると、2番目のリクエストは別の更新をトリガーしません。
    * ドキュメンテーションを通して、これらの新しいインクリメンタル、部分的な更新のための規則的な、完全なデータセットのリロードおよび「更新」のための単語「リロード」を使用しようとします。
    * テスト目的のために、いくつかの診断はlog.txtに印刷されます[&lt;ログレベル&gt; (ログレベル) お問い合わせ datasets.xml "all" に設定します。
    * 特に右端の場合、増分更新を使用する (はじめて) 、例えば、時間、軸は大きいです、置くことができます&lt;reloadEveryNMinutes&gt; より大きい数に (1440?) , 更新は、データセットを最新の状態に保つために作業のほとんどを行うように, そして、フルリロードは、不均一に行われます.
    * Note: この新しいアップデートシステムがメタデータを更新 (例えば、時間 actual\\_range , time\\_coverage\\_end, ...) しかし、onChangeをトリガーしません (電子メールまたはURLをタッチ) または変更 RSS フィード (おそらくそれは...) お問い合わせ
    * サブクラスを使用するすべてのデータセット [ EDDGrid ファイルから](#eddgridfromfiles) そして、 [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) : : :
        *    **警告:** それをディレクトリにコピーすることで、データセットに新しいデータファイルを追加するとき ERDDAP™ 見てみると、危険がある ERDDAP™ 部分的に書かれたファイルに気づくでしょう。それを読んでみてくださいが、ファイルが不完全だから失敗します。ファイルを「悪い」ファイルであると宣言し、それを削除します (臨時休業) データセットから。
これを避けるため、 **強烈なおすすめ** 仮名で新しいファイルをディレクトリにコピーする (例えば, 20150226 .nc トンプ) データセットファイルと一致しない 名前Regex (お問い合わせ .nc ) ファイル名を正しい名前に変更します (例えば, 20150226 .nc ) お問い合わせ このアプローチを使うと、 ERDDAP™ 一時的なファイルを無視し、それが完了し、使用準備が整ったら正しく名前付けされたファイルだけに通知します。
        * 既存のデータファイルを修正する場合 (例えば、新しいデータポイントを追加する) ,&lt;updateEveryNMillis&gt; は、変更がアトミカルに表示される場合にうまく機能します。 (瞬時に) ファイルは常に有効なファイルです。 例えば、netcdf-java ライブラリは "classic" の無制限の次元を追加できます。 .nc v3 ファイルをアトマイカルに作成します。
            &lt;updateEveryNMillis&gt; は変更が行われている間にファイルが無効な場合に悪く動作します。
        *   &lt;updateEveryNMillis&gt; は、複数のファイルが短時間で変化するデータセットにうまく機能します。
        *   &lt;updateEveryNMillis&gt; は、大量のファイルが短時間で変化するデータセットに不十分動作します。 (変更がアトマイカルに表示されていない場合) お問い合わせ これらのデータセットでは、使用しない方が良い&lt;updateEveryNMillis&gt; と設定する [ログイン](/docs/server-admin/additional-information#set-dataset-flag) お問い合わせ ERDDAP™ データセットをリロードします。
        *   &lt;アップデートEveryNMillis&gt; [に関連する情報を更新しない]&lt; subsetVariables &gt;&gt; (#サブセット変数) お問い合わせ 通常、これは問題ではありません。 subsetVariables 頻繁に変更しないものについての情報を持っている (たとえば、駅名、緯度、経度のリスト) お問い合わせ もし、 subsetVariables データ変更 (たとえば、新しいステーションがデータセットに追加されると) それから連絡して下さい [フラグ URL](/docs/server-admin/additional-information#set-dataset-flag) データセットについて ERDDAP™ データセットをリロードします。 その他, ERDDAP™ 新しいサブセットに気付かない データセットが再読み込みされるまで変数情報 (&lt;reloadEveryNMinutes&gt;).
        * 一般的な推奨事項:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * ダブル? Linuxコンピュータでは、使用している場合&lt;アップデートEveryNMillis&gt; お問い合わせ EDDGrid FromFiles または EDDTableFromFiles クラスでは、データセットがロードできない問題が表示される (時折、または一貫して) エラーメッセージ: "IOException: インスタンスの inotify のユーザ制限が到達または複数のオープンファイルに達しました。" 原因はバグがあるかもしれません Java これにより、不正なインスタンスが収集されないようにします。 この問題は避けられます ERDDAP™ v1.66以上 そのため、最適なソリューションは、最新バージョンを切り替えることです。 ERDDAP お問い合わせ
問題が解決しない場合(つまり、実際に大量のデータセットを使用している場合)&lt;updateEveryNMillis&gt;) は、この問題を呼び出して修正できます。
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
または、問題が主張している場合は、より高い数字を使用してください。 時計のデフォルトは8192です。 インスタンスのデフォルトは128です。
    * 置くことができます&lt;updateMaxイベント&gt;10&lt;/updateMaxイベント&gt; お問い合わせ datasets.xml   (トップ付近の他の設定で) ファイル変更の最大数を変更する (デフォルト=10) updateEveryNMillisシステムによって処理されます。 常に最新の状態に保つことが非常に重要であるデータセットには、より大きな数が役立ちます。 詳細はこちら [updateMaxEvents ドキュメント](#updatemaxevents) お問い合わせ
    * 好奇心旺盛なプログラマーのために - これらの増分の更新、とは異なります ERDDAP 's フル [リロードEveryNMinutes](#reloadeverynminutes) システムでは、ユーザリクエストスレッド内で発生します。 そのため、データセットを同時に更新することができます。 コードがある (そしてロック) 1つのスレッドのみが与えられた時点の任意のデータセットのアップデートで動作していることを確認してください。 複数の同時更新が容易になりました。複数の同時フルリロードが難しくなります。
         
#### &lt;sourceCanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* ツイート ** &lt;ソースCanConstrainStringEQNE&gt; ** . . (#sourcecanconstrainstringeqneさん) EDDTable 内の OPTIONAL タグ&lt;dataset&gt; タグ datasets.xml ソースが = と &#33;= 演算子で文字列変数を制約できるかどうかを指定します。
    * EDDTableFromDapSequence の場合、これは外部シーケンス文字列変数のみに適用されます。 ソースは内部のシーケンス変数の制約を処理できないと仮定されます。
    * このタグはオプションです。 有効な値はtrueです (デフォルト) そして偽り。
    * EDDTableFromDapSequence の場合 OPeNDAP DRDSサーバー、これはtrueに設定する必要があります (デフォルト) お問い合わせ
    * EDDTableFromDapSequence の場合 Dapper サーバは false に設定します。
    * 例:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sourceCanConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* ツイート ** &lt;ソースCanConstrainStringGTLT&gt; ** . . (#sourcecanconstrainstringgtlt の使い方) EDDTable 内の OPTIONAL タグ&lt;dataset&gt; ソースが String 変数を制約できるかどうかを指定するタグ&lt;,&lt;=、&gt;、および&gt;=演算子。
    * EDDTableFromDapSequence の場合、これは外部シーケンス文字列変数のみに適用されます。 ソースは内部のシーケンス変数の制約を処理できないと仮定されます。
    * 有効な値はtrueです (デフォルト) そして偽り。
    * このタグはオプションです。 デフォルトはtrueです。
    * EDDTableFromDapSequence の場合 OPeNDAP DRDSサーバー、これはtrueに設定する必要があります (デフォルト) お問い合わせ
    * EDDTableFromDapSequence の場合 Dapper サーバは false に設定します。
    * 例:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;ソースCanConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* ツイート ** &lt;sourceCanConstrainStringRegex &gt; ソース ** . . (#sourcecanconstrainstringregex ディレクティブ) EDDTable 内の OPTIONAL タグ&lt;dataset&gt; は、ソースが正規表現で文字列変数を制約できるかどうかを指定するタグです。もしそうなら、演算子は何かです。
    * 有効な値は "=~" (お問い合わせ DAP スタンダード) お問い合わせ (何度も何度もサポート DAP サーバー) または "" (ソースが正規表現をサポートしていないことを示す) お問い合わせ
    * このタグはオプションです。 デフォルトは "" です。
    * EDDTableFromDapSequence の場合 OPeNDAP DRDSサーバー、これは "" に設定する必要があります (デフォルト) お問い合わせ
    * EDDTableFromDapSequence の場合 Dapper サーバー、これは "" に設定する必要があります。 (デフォルト) お問い合わせ
    * 例:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;ソースCanDoDistinct&gt;{#sourcecandodistinct} 
* ツイート ** &lt;ソースCanDoDistinct&gt; ** . . (#sourcecandodistinctは、) EDDTableFromDatabase 内の OPTIONAL タグ&lt;ソースデータベースが &distinct を扱うべきかどうかを指定する dataset&gt; タグ () ユーザーの問い合わせの制約。
    * このタグはオプションです。 有効な値は、 ( ERDDAP™ 異なる処理; デフォルト) , 部分 (ソースは明確で、 ERDDAP™ 再び扱う) 、およびはい (ソースは区別を扱います) お問い合わせ
    * いいえ、 ERDDAP™ 明確に扱うとき記憶から動く、はい使用して下さい。
    * はいとソースデータベースを使っていると、少しずつ違う処理をします。
    * 部分的には、両方の最悪値を与えます: 異なるデータベースの処理が遅いので、それはメモリの外で実行する可能性がありますので、それは遅くです ERDDAP お問い合わせ
    * データベースは、DISTINCTを独自の結果の列だけを要求するリクエストとして解釈します。 ERDDAP™ 結果のソートされた列のリストのリクエストとして解釈します。 これを部分的またははいに設定した場合、 ERDDAP™ 結果をソートするためにデータベースを自動的に指示します。
    * 結果の1つの小さな違い:
なし | 部分的, ERDDAP™ 結果の開始時に「」をソートします (non-" の前の文字列) お問い合わせ
はい、データベースは (ポストグレスは) 結果の最後に「」をソートする (non-" の後の文字列) お問い合わせ
短い言葉で始まる単語の短い単語の並べ替えにも影響します。 例えば、 ERDDAP™ 「シモン」の前に「シモン」をソートします。
    * 例:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sourceCanOrderBy&gt;{#sourcecanorderby} 
* ツイート ** &lt;ソース CanOrderBy&gt; ** . . (#sourcecanorderbyさん) EDDTableFromDatabase 内の OPTIONAL タグ&lt;ソースデータベースが処理すべきかどうかを指定するdataset&gt; タグ orderBy  (・・・) ユーザーの問い合わせの制約。
    * このタグはオプションです。 有効な値は、 ( ERDDAP™ ハンドル orderBy  (・・・) ;デフォルト) , 部分 (ソースハンドル orderBy そして、 ERDDAP™ 再び扱う) 、およびはい (ソースハンドル orderBy  (・・・) ) お問い合わせ
    * いいえ、 ERDDAP™ 処理時にメモリが不足している orderBy  (・・・) 、はい使用して下さい。
    * はいとソースデータベースのハンドルを使用している場合 orderBy  (・・・) ゆっくり使用してください。
    * 部分的には、両方の最悪値を与えます: データベースの処理が遅いので、 orderBy  (・・・) メモリが遅くなり、メモリが不足している可能性があります。 ERDDAP お問い合わせ
    * 結果の1つの小さな違い:
なし | 部分的, ERDDAP™ 結果の開始時に「」をソートします (non-" の前の文字列) お問い合わせ
はい、データベースは (ポストグレスは) 結果の最後に「」をソートする (non-" の後の文字列) お問い合わせ
短い単語と短い単語から始まる単語のソートにも影響します。 例えば、 ERDDAP™ "Simons" の前に "Simon" をソートしますが、データベースがどのようにソートするかはわかりません。
    * 例:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceNeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* ツイート ** &lt;ソースNeedsExpandedFP\\_EQ&gt; ** . . (#sourceneedsexpandedfp_eq をフォロー) EDDTable 内の OPTIONAL タグ&lt;dataset&gt; を指定するタグ (ログイン (デフォルト) または false) ソースがクエリで助けが必要な場合&lt;インフォメーション 変数&gt;=&lt;floatingPointValue&gt; (および&#33;=、&gt;=、)&lt;=)。 例えば、
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * いくつかのデータソースの場合、数値クエリは =, &#33;=,&lt;=, または &gt;= は、浮動小数点数で希望どおり動作しない場合があります。 例えば、値が220.20000000000001として保存されると、 longitude=220.2の検索は失敗するかもしれません。
    * 浮動小数点数が少ないため、この問題が発生する [コンピュータ内で正確に表されない](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) お問い合わせ
    * ソースの場合NeedsExpandedFP\\_EQ true に設定 (デフォルト) , ERDDAP™ この問題を回避するために、データソースに送信されたクエリを修正します。 このセットを真に残すのは、常に安全です。
         
#### &lt; sourceUrl &gt;{#sourceurl} 
* ツイート ** &lt; sourceUrl ツイート ** . . (#ソース) データセットのグローバルに共通するタグ&lt; addAttributes &gt; データのソースである URL を指定します。
    * 例:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (しかし、すべての行を1行に置く) 
    * インスタグラム ERDDAP™ , すべてのデータセットは " sourceUrl " ユーザに表示されている結合されたグローバル属性で。
    * ほとんどのデータセットタイプの場合、このタグは必須です。 データセットの種類の説明を参照して、これが必須かどうかを確認します。
    * いくつかのデータセットの場合、別々&lt; sourceUrl &gt;タグは使用できません。 代わりに、あなたは " sourceUrl ツイート [グローバル属性](#global-attributes) , 通常グローバルに \\&gt; addAttributes &lt;お問い合わせ 実際のソースURLがない場合 (例えば、データがローカルファイルに保存されている場合) 、この属性は、プレースホルダの値だけを持っていることが多いです。例えば、&lt;att name="name"&gt; (ローカルファイル) &lt;/att&gt; 。
    * ほとんどのデータセットでは、データを要求するために使用されるURLのベースです。 例えば、 DAP .dods, .das, .dds, .html が追加できる URL です。
    * お問い合わせ datasets.xml XMLファイルで、'&' をエンコードする必要があります。'&lt;', '&gt;' は URL の '&amp;', '&lt;', '&gt;'.
    * ほとんどのデータセットのタイプのため、 ERDDAP™ オリジナルを追加 sourceUrl   (ソースコードの「localSourceUrl」) お問い合わせ [グローバル属性](#global-attributes)   (ソースコードの「publicSourceUrl」になる場所) お問い合わせ データソースがローカルファイルの場合、 ERDDAP™ 追加する sourceUrl ツイート (ローカルファイル) 「セキュリティ上の注意として、グローバルな属性に。 データソースがデータベースの場合、 ERDDAP™ 追加する sourceUrl ツイート (ソースデータベース) 「セキュリティ上の注意として、グローバルな属性に。 データセットの一部が非公開を使用している場合 sourceUrl お問い合わせ (パソコンがDMZやローカルLANにあるため、) 使える [&lt;変換ToPublicSourceUrl&gt; (#converttopublicsourceurl(コンバート)) ローカルを変換する方法を指定するタグ sourceUrl s から 公開 sourceUrl お問い合わせ
    * ツイート sourceUrl まずは http:// , https:// , ftp://, あるいは他のプレフィックス. https 接続は、ソースのデジタル証明書を読んで確認して、ソースが誰であるかを確かめます。 まれに、このチェックはエラー "javax.net.ssl.SSLProtocolException: handhake alert: unrecognized\\_name" で失敗することがあります。 これは、使用しているドメイン名に一致しない証明書のドメイン名がおそらく原因です。 内容を読み込むことができます。 sourceUrl 's は、Web ブラウザーの証明書で、特に "Subject Alternative Name" セクションの "DNS Name" のリストです。
        
場合によっては、 sourceUrl 使用しているのは、証明書のドメイン名のエイリアスかもしれません。 例えば、
        https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/このエラーをスローしますが、
        https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/, 証明書にドメイン名を使用する, ない. これらのケースのソリューションは、したがって、証明書のドメイン名を見つけて使用することです。 証明書に見つからない場合は、データプロバイダにお問い合わせください。
        
それ以外の場合、証明書のドメイン名は、名前のグループにすることができます。 この問題や問題が解決しない場合は、Chrisにメールしてください。 noaaa.gov で John が問題を報告します。
         

#### &lt;addAttributes&gt; {#addattributes} 
* ツイート ** &lt; addAttributes ツイート ** . . (#addattributes(アダットリブリュート)) 各データセット用のOPTIONALタグと、各変数の ERDDAP 管理者は、データセットとその変数に関連するメタデータ属性を制御します。
    *    ERDDAP™ データセットのソースから属性を結合 (「ソース属性」) と " addAttributes 定義する datasets.xml   (優先する) "combinedAttributes" を作るには、 ERDDAP™ ユーザは参照します。 したがって、あなたは使用することができます addAttributes sourceAttributes の値を再定義し、新しい属性を追加したり、属性を削除したりします。
    * ザ・オブ・ザ・&lt; addAttributes &gt; タグは 0 以上を閉じます ** &lt;アット&gt; ** 個々の属性を指定するために使用されるサブタグ。
    * 各属性は名前と値で構成されます。 (特定のデータタイプがある。例えば、ダブル) お問い合わせ
    * 与えられた名前の属性は1つだけです。 以上あれば、最後の1つは優先順位です。
    * 値が単一の値か、値のスペース分けされたリストであることができます。
    * シンタックス
        * 注文の注文&lt;att&gt; 内のサブタグ addAttributes 重要ではありません。
        * ザ・オブ・ザ・&lt;att&gt; サブタグ形式は
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * すべての属性の宛先名は、文字で始まる必要があります (A-Z、a-zの) A-Z, a-z, 0-9, または '\\_' の文字のみが含まれている必要があります。
        * もし&lt;att&gt; サブタグは、null の値や値を持ちません。この属性は、結合された属性から削除されます。
例えば、&lt;att name="rows" /&gt; は、結合属性から行を削除します。
例えば、&lt;att name="座標"&gt;null&lt;/att&gt; はコンバインド属性から座標を削除します。
##### 属性属性 タイプ:{#attributetype} 
* [オプション型値]&lt;att&gt; サブタグ (#属性型) 値のデータ型を示します。 デフォルトタイプは文字列です。 文字列属性の例は:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * 単一の値の有効なタイプはバイトです (8ビット整数) , ショート (16ビット署名整数) , イン (32ビット署名整数) , 長い (64ビット署名整数) , フロート (32ビット浮動小数点) , ダブル (64ビット浮遊ポイント) , char, 文字列. 例えば、
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
これらのメモを見る [char データ型](#char) お問い合わせ
これらのメモを見る [長いデータ タイプ](#long) お問い合わせ
        
    * スペース分けされた値のリストの有効なタイプ (または単一の値) バイトリスト, ショートリスト, 符号なしショートリスト, charList, intList, longList, floatList, Double リスト。 例えば、
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
unsignedShortList では、署名されていないショートカットのリストを指定できますが、対応するUnicode文字のリストに変換されます(例えば、65 67 69" は "A C E" に変換されます。
charList を指定すると、特別な文字(例、スペース、ダブルクォート、バックスラッシュ、&lt;NCCSVファイルのデータセクションにエンコードする#32、または&gt;#127) (例: ", "\" または """, "\\\\", " \\n ", "\\u20ac") お問い合わせ
stringList はありません。 文字列を複数行文字列として保存します。 例えば、
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### グローバルアトリビュート{#global-attributes} 
* ツイート ** グローバル・アトリビュート/グローバル&lt; addAttributes ツイート ** . . (#グローバルアトリビュート) お問い合わせ
    &lt; addAttributes &gt; は内部の OPTIONAL タグです&lt;dataset&gt; タグは、データセット全体に適用する属性を変更するために使用されます。
    
    *    ** グローバルな利用&lt; addAttributes &gt; データセットのグローバル属性を変更する。 **  ERDDAP™ データセットのソースからグローバル属性を組み合わせる()** ソース属性 **)とグローバル**  addAttributes  **定義する datasets.xml   (優先する) グローバルに** 結合属性 ** です。 ERDDAP™ ユーザは参照します。 したがって、あなたは使用することができます addAttributes sourceAttributes の値を再定義し、新しい属性を追加したり、属性を削除したりします。
    * [を見る] ** &lt; addAttributes ツイート **インフォメーション (#addattributes(アダットリブリュート)) グローバルな変数と変数に適用される** &lt; addAttributes ツイート ** お問い合わせ
    *    [FGDCの特長](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html) そして、 [ISO 19115-2/19139 認証取得](https://en.wikipedia.org/wiki/Geospatial_metadata) メタデータ お問い合わせ 普通、 ERDDAP™ ISO 19115-2/19139とFGDCを自動的に生成します (FGDC-STD-001-1998年) データセットのメタデータから情報を使用して各データセット用のXMLメタデータファイル。 お問い合わせ **良いデータセットメタデータがうまくいく ERDDAP -ISO 19115およびFGDCメタデータを生成しました。 データセットのメタデータを改善するために多くの時間と労力を置いてください (とにかく良いことです) お問い合わせ** ISO 19115 および FGDC メタデータを生成するために使用されるデータセットメタデータ属性のほとんどは、 [ACDDメタデータ規格](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) お問い合わせ
    * 多くのグローバル属性は、その中に特別です ERDDAP™ それらを探し、さまざまな方法でそれらを使用. 例えば、リンクを infoUrl データセットの一覧と、他の場所を含むWebページに含まれているため、ユーザーはデータセットの詳細を見ることができます。
    * ユーザーがデータのサブセットを選択すると、変数の経度、緯度、高度に関連するglobalAttributes (または深さ) および時間範囲 (例えば、南端\\_北上、ノーザント\\_北上、時間\\_coverage\\_start、時間\\_coverage\\_end) 自動的に生成または更新されます。
    * シンプルなサンプルのグローバル&lt; addAttributes &gt; は:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
空の cwhdf\\_version 属性は、ソース cwhdf\\_version 属性を引き起こします。 (お問い合わせ) 属性の最終リストから削除される。
    * この情報の提供は、 ERDDAP™ より良い仕事をし、ユーザーがデータセットを理解するのに役立ちます。
よいメタデータはデータセットを使用可能にします。
不十分なメタデータにより、データセットは使用しません。
メタデータ属性で良い仕事をする時間を入力してください。
##### 特別なグローバル属性 ERDDAP™ 
###### 採用情報{#acknowledgement} 
*    [ **採用情報** ](#acknowledgement) そして、 **ログイン**   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) サポートを提供するグループまたはグループを認めるお勧めの方法です (確かに、金融) このデータを作成したプロジェクト 例えば、
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
ACDD 1.0 と 1.1 は "acnowledgment" という綴りを使用しました。 (米国の通常のスペル) , しかし、ACDD 1.3 これを「認識」に変更しました (これは、U.K.の通常のスペルです。) お問い合わせ 私の理解は、変更が本質的に事故だったことであり、彼らは確かに変更の修正を認識しなかったことです。 混乱&#33; 「認識」と「認識」を持つ100万ものデータファイルが存在します。 これは、標準に「シンプル」の変更の愚かさを強調し、標準の安定性の必要性を強調します。 ACDD 1.3 のため (これは ACDD のバージョンです。 ERDDAP™ サポート) 「認識」と言います。 ERDDAP™   (特に GenerateDatasets Xmlの) お問い合わせ
     
###### cdm\\_altitude\\_proxy ディレクティブ{#cdm_altitude_proxy} 
*    [ **cdm\\_altitude\\_proxy ディレクティブ** ](#cdm_altitude_proxy) 高度または深さ変数を持たないEDDTableデータセットのためだけですが、高度または深さのためのプロキシである変数があります (例えば、圧力、シグマ、ボトル番号) この属性を使用して、その変数を識別することができます。 例えば、
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
もし、 [cdm\\_data\\_type ディレクティブ](#cdm_data_type) プロファイルまたはTrajectoryProfileであり、高度または深さの変数はありません。cdm\\_altitude\\_proxyは定義されます。 cdm\\_altitude\\_proxy が定義されている場合、 ERDDAP™ 変数に次のメタデータを追加します。\\_Coordinate AxisType=Heightとaxis=Z。
     
###### cdm\\_data\\_type ディレクティブ{#cdm_data_type} 
*    [ **cdm\\_data\\_type ディレクティブ** ](#cdm_data_type)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) グローバルな属性で、 Unidata   [共通データモデル](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html) データセットのデータタイプ。 例えば、
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CDMはまだ進化しており、再び変化する可能性があります。 ERDDAP™ 関連する詳細と詳細 [分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) チャプター [CFの1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) メタデータ条約 (以前はCFポイント観測条約と呼ばれる) お問い合わせ
    * データセットのグローバル [ソース属性](#global-attributes) またはそのグローバル&lt; addAttributes ツイート cdm\\_data\\_type 属性を含める必要があります。 いくつかのデータセットタイプ (EDDTable のような オビス) 自動的に設定します。
    * お問い合わせ EDDGrid データセット、cdm\\_data\\_type オプションは Grid です。 (デフォルトは、最もよくあるタイプのデフォルトです。 EDDGrid データセット) , MovingGrid, Other, Point, Profile, RadialSweep, TimeSeriesProfile, Swath, Trajectory, TrajectoryProfile. 現在、 EDDGrid 関連するメタデータを指定する必要はありません。また、cdm\\_data\\_type に一致するデータもチェックしません。 近い将来に変化するでしょう。
    * EDDTable は、CDM ではなく CF の DSG 仕様に従って、 厳格な方法で cdm\\_data\\_type を使用します。そのため、DSG との一貫性が更新されていないためです。 データセットのメタデータが一致しない場合 ERDDAP 's cdm\\_data\\_type の要件 (詳しくはこちら) 、データセットがロードされず、生成されない [エラーメッセージ](#troubleshooting-tips) お問い合わせ (それはあなたがそれを修正できるように、エラーメッセージが間違っていることを教えてくれるという意味で、それは良いことです。) データセットのデータがデータセットのメタデータのセットアップに一致しない場合 (例えば、時系列データセットの所定の場所に対して複数の緯度値がある場合) 、データに対するリクエストは、応答の誤ったデータを返します。 そのため、この権利をすべて取得してください。
        
これらのすべてのデータセットについては、条約および Metadata\\_Conventions グローバル属性はCF-1.6を参照してください。 (CF-1.0、1.1、1.2、1.3、1.4、または1.5) CF-1.6は、Discrete Sampling Geometryに関連する変更を含む最初のバージョンであるため、 (DSGについて) コンベンション
        *   ** ERDDAP™ CF DSG と非単純な関係を持つ** 
        *    ERDDAP™ 有効なDSGファイルであるソースデータセットから有効なDSGデータセットを作ることができます (ツイート) , またはDSGのために設定されていないソースデータセットのうち, メタデータへの変更を介して行うことができます (その一部 ERDDAP -DSG設定を指定するためのより一般的なアプローチを提供するために特化) お問い合わせ
        *    ERDDAP™ データセットをロードすると、検証テストは多く行われます。 cdm\\_data\\_type を持つデータセットの場合 (または featureType ) 属性 正常に読み込みます in ERDDAP™ , それから ERDDAP™ データセットがDSG要件を満たしていると言っています (その他、 ERDDAP™ 見つかった最初の問題を説明する例外をスローします。) お問い合わせ
警告: 正常に読み込まれたデータセットは、DSG要件を満たすように表示されます (属性の正しい組み合わせを持っています) , しかし、まだ誤ってセットアップすることができます。, 誤った結果につながります .nc CFおよびCF .nc CFMA 応答ファイル。 (ソフトウェアは、他の方法では賢く、無数です。) 
        * データセットのメタデータを見ると ERDDAP™ , DSG のデータセットは ERDDAP '内部形式 (巨大でデータベースのようなテーブル) お問い合わせ DSG フォーマットの1つにはありません (例えば、寸法とメタデータが正しいわけではありません。) , しかし、データセットをDSGデータセットとして扱うために必要な情報はメタデータにあります (例えば、cdm\\_data\\_type=TimeSeriesとcdm\\_timeseries\\_variables= *aCsvListOfStation関連変数* 変数のグローバルメタデータと cf\\_role=timeseries\\_id) お問い合わせ
        * ユーザーがデータセットのサブセットをリクエストする場合 .nc CFシリーズ (ログイン .nc DSGのContiguous Ragged Arrayファイル形式のファイル) または .nc CFMAファイル (は、 .nc DSGの多次元配列ファイル形式のファイル) 有効なCF DSGファイルとなります。
警告:ただし、データセットが誤って設定された場合 (メタデータによって行われた約束は真ではありません) , 応答ファイルが技術的に有効になりますが、いくつかの方法では誤りになります.
             
###### EDDTable cdm_data_types
* EDDTable データセットの場合、cdm\\_data\\_type オプション (そして関連の条件で ERDDAP ) お問い合わせ
###### ポイント{#point} 
*    [ポイント](#point) --は関連しない時間および場所で取られた測定のセットのためです。
    * 他のすべての cdm\\_data\\_types と同様に、Point のデータセットは、経度、緯度、時間変数を持つ必要があります。
###### プロフィール{#profile} 
*    [プロフィール](#profile) --は1つの緯度の経度の位置、しかし1つの深さですべての取られた測定のセットです (または高度) お問い合わせ データセットは、異なる場所からの7つのプロファイルなど、これらのプロファイルのコレクションであってもよいです。 このcdm\\_data\\_type は、任意のプロファイル間の任意の論理的な接続を意味しません。
    
* 変数の1つ (たとえば、Profile\\_number) 変数属性 cf\\_role=profile\\_id は、プロファイルを一意に識別する変数を識別します。
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
他の変数が適切でないなら、時間変数を使用して検討して下さい。
###### cdm\\_profile\\_変数{#cdm_profile_variables} 
* データセットには、グローバルアトリビュートが含まれている必要があります。 [cdm\\_profile\\_変数](#cdm_profile_variables) , 値が各プロファイルに関する情報を持つ変数のコンマ区切りリストである場所. 与えられたプロファイルでは、これらの変数の値が定数である必要があります。 例えば、
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
リストには cf\\_role=profile\\_id 変数と、プロファイル、時間、緯度、経度に関する情報を含む他のすべての変数が含まれます。
リストには、高度、深さ、または任意の観察変数が含まれていません。
     

 \\[ Opinion: cdm\\_data\\_type=Profile は使用できません。 実際には、与えられたデータセットは通常実際にTimeSeriesProfileのいずれかです (固定位置のプロファイル) または TrajectoryProfile (軌跡に沿ってプロファイル) など、適切に識別される必要があります。 \\]   
###### タイムシリーズ{#timeseries} 
*    [タイムシリーズ](#timeseries) --は測定の順序です (例えば、海水の温度) 1、固定、緯度、経度、深さで取られる (または高度) 所在地。 (「ステーション」として考える) データセットは、これらのTimeSeriesのコレクション(例えば、各3つの異なる場所からのシーケンス)である場合があります。
    * 変数の1つ (例えば, station\\_id) 変数属性 cf\\_role=timeseries\\_id を持ち、ステーションを一意に識別する変数を識別します。
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_変数{#cdm_timeseries_variables} 
* データセットには、グローバルアトリビュートが含まれている必要があります。 [cdm\\_timeseries\\_変数](#cdm_timeseries_variables) , 値が各ステーションに関する情報を持つ変数のコンマ区切りリストである場所. 指定されたステーションでは、これらの変数の値は定数でなければなりません。 例えば、
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
リストには、cf\\_role=timeseries\\_id 変数と、駅に関する情報を含む他のすべての変数が含まれている必要があります。これは、ほとんど常に緯度と経度を含む (および高度か深さ、現われれば) お問い合わせ
リストには、時間や任意の観察変数が含まれていません。
* いくつかのモオードブイの場合、データセットには緯度と経度変数の2セットがあります。
    1. 一定の緯度と経度値の1組 (モアリングの固定位置) お問い合わせ インスタグラム ERDDAP™ , これらの変数を渡す destinationName 緯度と経度の s は、cdm\\_timeseries\\_variables のリストにこれらの変数を含める。
    2. 各観察に関連する正確な緯度と経度値。 インスタグラム ERDDAP™ , これらの変数を異なる destinationName ツイート (e.g.、精密なLatおよび精密 ログイン) cdm\\_timeseries\\_variables のリストにこれらの変数が含まれていません。
この理由は、理論的観点から、DSG TimeSeriesデータセット、緯度と経度についてです。 (および高度か深さ、現われれば) 駅の場所は定数である必要があります。
###### TimeSeriesプロファイル{#timeseriesprofile} 
*    [TimeSeriesプロファイル](#timeseriesprofile) --は1、固定された、緯度経度の位置で取られたプロフィールの順序のためです。 各プロファイルは、複数の高度または深さで撮影された測定のセットです。 データセットは、これらのTimeSeriesProfilesのコレクションです。例えば、それぞれ12の異なる場所で撮影されたプロファイルのシーケンスです。
    * 変数の1つ (例えば, station\\_id) 変数属性 cf\\_role=timeseries\\_id を持ち、ステーションを一意に識別する変数を識別します。
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * 変数の1つ (たとえば、Profile\\_number) 変数属性 cf\\_role=profile\\_id は、プロファイルを一意に識別する変数を識別します。
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (与えられたプロファイル\\_id は、指定された時系列\\_id だけにユニークでなければなりません。) 他の変数が適切でないなら、時間変数を使用して検討して下さい。
    * dataset には、グローバルAttribute cdm\\_timeseries\\_variables が含まれているため、各ステーションに関する情報を持つ変数のコンマ区切りリストである。 指定されたステーションでは、これらの変数の値は定数でなければなりません。 例えば、
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
リストには、 cf\\_role=timeseries\\_id 変数と、駅に関する情報を含む他のすべての変数が含まれます。これは、ほとんど常に緯度と経度を含みます。
リストには時間、高度、深さ、または任意の観察変数が含まれていません。
    * dataset には、グローバルAttribute cdm\\_profile\\_variables が含まれているため、各プロファイルに関する情報を持つ変数のコンマ区切りリストが表示される。 与えられたプロファイルでは、これらの変数の値が定数である必要があります。 例えば、
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
リストには cf\\_role=profile\\_id 変数と、プロファイルに関する情報を含む他のすべての変数が含まれている必要があります。
リストには、緯度、経度、高度、深さ、または任意の観察変数が含まれていません。
###### ゴミ箱{#trajectory} 
*    [ゴミ箱](#trajectory) --は軌跡に沿って取られた測定の順序です (空間と時間を通してパス)   (例えば、海\\_water\\_ は、水を通って移動するように船によって取られた温度) お問い合わせ データセットは、4つの異なる船のそれぞれからのシーケンスなど、これらの軌跡のコレクションであるかもしれません。
    * 変数の1つ (例えば、ship\\_id) 属性 cf\\_role=trajectory\\_id を持たせて、その変数を一意に特定します。
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectory\\_変数{#cdm_trajectory_variables} 
* データセットには、グローバルアトリビュートが含まれている必要があります。 [cdm\\_trajectory\\_変数](#cdm_trajectory_variables) , 値が各軌跡に関する情報を持つ変数のコンマ区切りリストである場所. 与えられた軌跡のために、これらの変数の値は定数である必要があります。 例えば、
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
リストには、 cf\\_role=trajectory\\_id 変数と trajectory に関する情報を持つ他のすべての変数が含まれます。
リストには時間、緯度、経度、または任意の観察変数が含まれていません。
###### Trajectoryプロファイル{#trajectoryprofile} 
*    [Trajectoryプロファイル](#trajectoryprofile) --は軌跡に沿って取られたプロフィールの順序です。 データセットは、14の異なる船によって撮影されたプロファイルのシーケンスなど、これらのTrajectoryProfilesのコレクションであるかもしれません。
    * 変数の1つ (例えば、ship\\_id) 変数属性 cf\\_role=trajectory\\_id を持たせて、その変数を一意に特定します。
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * 変数の1つ (たとえば、Profile\\_number) 変数属性 cf\\_role=profile\\_id は、プロファイルを一意に識別する変数を識別します。
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (与えられたプロファイル\\_id は、指定した trajectory\\_id にのみユニークでなければなりません。) 他の変数が適切でないなら、時間変数を使用して検討して下さい。
    * データセットには、グローバルAttribute cdm\\_trajectory\\_variables が含まれている必要があります。値がコンマで区切られた変数のリストで、それぞれの軌跡に関する情報が記載されています。 与えられた軌跡のために、これらの変数の値は定数である必要があります。 例えば、
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
リストには、 cf\\_role=trajectory\\_id 変数と trajectory に関する情報を持つ他のすべての変数が含まれます。
リストには、プロファイル関連の変数、時間、緯度、経度、または任意の観察変数が含まれていません。
    * dataset には、グローバルAttribute cdm\\_profile\\_variables が含まれているため、各プロファイルに関する情報を持つ変数のコンマ区切りリストが表示される。 与えられたプロファイルでは、これらの変数の値が定数である必要があります。 例えば、
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
リストには、cf\\_role=profile\\_id 変数と、プロファイルに関する情報を含む他のすべての変数が含まれます。これは、ほぼ常に時間、緯度、経度を含みます。
リストには、高度、深さ、または任意の観察変数が含まれていません。
###### その他{#other} 
*    [その他](#other) -- 条件がありません。 データセットが他のオプションの1つに合わない場合は、データセットが緯度、経度、時間変数が含まれていない場合に使用します。
     
###### 関連記事{#related-notes} 
* "Other" 以外の cdm\\_data\\_type を持つすべてのEDDTableデータセットには、経度、緯度、時間変数があります。
* プロファイルを持つデータセットは、高度変数、深さ変数、または [cdm\\_altitude\\_proxy ディレクティブ](#cdm_altitude_proxy) 変数。
* 理想的な cdm\\_data\\_type の全ての要件に適合するデータセットを作成できない場合は、"Point" を使用します。 (少数の条件が) または「その他」 (条件がない) 代わりに。
* この情報は、 ERDDAP™ 様々な方法では、例えば、主に作るために .nc CFファイル ( .nc データセットのcdm\\_data\\_typeに関連した一貫性のあるレイド配列表現に対応するファイル) そして、 .nc CFMAファイル ( .nc データセットのcdm\\_data\\_typeに関連した多次元配列表現に対応するファイル) で定義される [分離されたサンプリングの幾何学 (DSGについて) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) チャプター [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 以前「CFポイント観測条約」と名付けられたメタデータ条約。
* ヒント: これらのデータセットの場合、正しい設定 [ subsetVariables ](#subsetvariables) 通常、cdm\\_...\\_variables属性にリストされているすべての変数の組み合わせです。 たとえば、TimeSeriesProfile では、cdm\\_timeseries\\_variables と cdm\\_profile\\_variables を使用します。
######  contributor\\_name  {#contributor_name} 
*    [ ** contributor\\_name ** ](#contributor_name)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) このデータセットに貢献した人、組織、またはプロジェクトを識別するための推奨方法です。 (たとえば、このデータセットの作成者によって再処理される前に、データの元の作成者) お問い合わせ 例えば、
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
"contributor" がデータセットに本当に適用されていない場合は、この属性を省略します。 比較する [ creator\\_name ](#creator_name) , これは、資金源に焦点を当てる場合があります.
######  contributor\\_role  {#contributor_role} 
*    [ ** contributor\\_role ** ](#contributor_role)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) 役割を識別するための推奨方法である [ contributor\\_name ](#creator_name) お問い合わせ 例えば、
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
"contributor" がデータセットに本当に適用されていない場合は、この属性を省略します。
###### コンベンション{#conventions} 
*    [ **コンベンション** ](#conventions)   (お問い合わせ [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) メタデータ規格) 強くお勧めします。 (今後はご期待ください。) この値は、このデータセットが続くメタデータの基準のコンマ区切りのリストです。 例えば:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
一般的なメタデータ条約 ERDDAP™ は:
    
    *    [ COARDS コンベンション](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) CFに先駆者です。
    *    [気候と予測 (CFシリーズ) コンベンション](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 推奨属性と必須属性の多くのソースです。 ERDDAP お問い合わせ CF の現在のバージョンは「CF-1.6」として識別されます。
    * ザ・オブ・ザ・ NetCDF データセットのディスカバリーのための属性条約 (パスワード) 推奨属性と必須属性の多くのソースです。 ERDDAP お問い合わせ ACDDの元の1.0バージョン (Ethan Davisの素晴らしい作品) , として識別された [ Unidata データセット ディスカバリー v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1) 現在の流れ (2015年スタート) ACDDの1.3バージョンは、 [ACDD-1.3の特長](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) お問い合わせ データセットが使用している場合 Unidata データセットのディスカバリーv1.0、私達はあなたにあなたを奨励します [データセットを ACDD-1.3 に切り替える](#switch-to-acdd-13) お問い合わせ
    
データセットが追加のメタデータ規格に従っている場合は、Conferences 属性の CSV リストに名前を付けてください。
######  coverage\\_content\\_type  {#coverage_content_type} 
*    [ ** coverage\\_content\\_type ** ](#coverage_content_type)   (お問い合わせ [ISO 19115認証取得](https://en.wikipedia.org/wiki/Geospatial_metadata) メタデータ規格) グリッドされたデータの種類を識別するための推奨方法です (お問い合わせ EDDGrid データセット) お問い合わせ 例えば、
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
許可された値は、補助情報、画像、モデル結果、物理的です。 測定精度 (ISO 19115メタデータが生成されるときのデフォルト) 、品質情報、参照情報、およびテーマ分類。 (EDDTable データセットにこのタグを使用しないでください。)   
######  creator\\_name  {#creator_name} 
*    [ ** creator\\_name ** ](#creator_name)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) 人、組織、またはプロジェクトを識別するための推奨方法 (特定の人物や組織ではない場合) 、作成のためのほとんどの責任 (最近の再処理) このデータについて 例えば、
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
データが広範囲に再処理された場合 (例えば、レベル2からレベル3または4までの衛星データ) それから通常reprocessorは作成者としてリストされ、元の作成者は指示されます [ contributor\\_name ](#contributor_name) お問い合わせ 比較する [プロジェクト](#project) 、それは人、組織、またはプロジェクトを識別することができるので、これはより柔軟です。
######  creator\\_email  {#creator_email} 
*    [ ** creator\\_email ** ](#creator_email)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) メールアドレスを識別するための推奨方法です (正しくフォーマットされた) クリエイターに連絡する方法を提供します。 例えば、
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
######  creator\\_url  {#creator_url} 
*    [ ** creator\\_url ** ](#creator_url)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) データセットを作成した組織のURLを識別するためのRECOMMENDEDの方法は、このデータセットに関するクリエイターの情報を持つURLです (しかし、それはより多くの目的である [ infoUrl ](#infourl) ) お問い合わせ 例えば、
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
######  date\\_created  {#date_created} 
*    [ ** date\\_created ** ](#date_created)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) データが最初に作成された日付を識別するための推奨方法です (例えば、このフォームに処理) 、ISO 8601のフォーマットで。 例えば、
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
データセットに定期的にデータを追加すると、元のデータが利用可能な最初の日付です。
######  date\\_modified  {#date_modified} 
*    [ ** date\\_modified ** ](#date_modified)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) データを最後に修正した日付を識別するための推奨方法です (例えば、エラーが修正されたり、最新のデータが追加されたときに) 、ISO 8601のフォーマットで。 例えば、
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
######  date\\_issued  {#date_issued} 
*    [ ** date\\_issued ** ](#date_issued)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) データは、ISO 8601形式で、最初に他の人に利用できる日付を識別するための推奨方法です。 例えば、
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
たとえば、データセットには、 [ date\\_created ](#date_created) 2010年1月30日(日)に公開されましたが、2010年7月30日(日)に公開されました。 date\\_issued より少なく一般に使用されるより date\\_created そして、 date\\_modified お問い合わせ お問い合わせ date\\_issued 省略し、同じと仮定される date\\_created お問い合わせ
###### グローバル drawLandMask  {#global-drawlandmask} 
*    [ ** drawLandMask ** ](#global-drawlandmask) お問い合わせ これは、使用した OPTIONAL のグローバル属性です。 ERDDAP™   (メタデータ規格なし) データセットの Make A Graph フォームの "Draw Land Mask" オプションのデフォルト値を指定します。 ( * datasetID * .グラフ) と、データのマップを要求する URL の &.land パラメーター。 例えば、
    ```
    <att name="drawLandMask">over</att>  
    ```
詳細はこちら [ drawLandMask プロフィール](#drawlandmask) お問い合わせ
######  featureType  {#featuretype} 
*    [ ** featureType ** ](#featuretype)   (お問い合わせ [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) メタデータ規格) IGNORED または REPLACED です。 データセットの場合 [cdm\\_data\\_type ディレクティブ](#cdm_data_type) お問い合わせ ERDDAP™ 自動的にそれを使用して作成します featureType 属性。 そのため、追加する必要はありません。
    
ただし、使用している方は [EDDTableFromNcCFファイル](#eddtablefromnccffiles) 続くファイルからデータセットを作成する [CFシリーズ 分離されたサンプリングの幾何学 (DSGについて) スタンダード](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) , ファイル自体は持っている必要があります featureType 正しく定義されるように、 ERDDAP™ ファイルを正しく読み込むことができます。 そのタイプのファイルに対するCF DSG要件の一部です。
     
###### 歴史・歴史{#history} 
*    [ **歴史・歴史** ](#history)   (お問い合わせ [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) そして、 [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) データが受け継がれているすべての処理ステップの行でRECOMMENDEDの複数行文字列グローバル属性です。 例えば、
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * 理想的には、各ラインにISO 8601:2004があります (Eメール) フォーマット日時Z (例:2011-08-05T08:55:02Z) 処理ステップの説明に従って。
    *    ERDDAP™ 既に存在していない場合は、これを生成します。
    * 既に存在する場合、 ERDDAP™ 既存の情報に新しい情報を付加します。
    * クライアントがデータを元のソースにバックトラックできるようにするため、履歴は重要です。
######  infoUrl  {#infourl} 
*    [ ** infoUrl ** ](#infourl) このデータセットの詳細については、WebページのURLでREQUIREDグローバル属性です。 (通常、ソース機関のウェブサイトで) お問い合わせ 例えば、
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * データセットのグローバル [ソース属性](#global-attributes) またはそのグローバル&lt; addAttributes ツイート この属性を含める必要があります。
    *    infoUrl クライアントが元のソースからデータについてもっと調べることができるので、それは重要です。
    *    ERDDAP™ リンクを表示 infoUrl データセットのデータアクセスフォーム ( * datasetID * .html拡張子) , グラフのWebページを作る ( * datasetID * .グラフ) ほかのWebページ
    * URLがクエリ部分を持っている場合 (「?」の後に) 、それは既にある必要があります [パーセントエンコード](https://en.wikipedia.org/wiki/Percent-encoding) お問い合わせ 特別な文字を制約でエンコードする必要があります (初期 '&' と main 以外の '=' 、かどうか) HH が文字の 2 桁の 16 進数値であるフォーム %H に。 通常、あなたはちょうど数の句読点文字を変換する必要があります: % に %25, に %26, 「に %22,&lt;%3C, =%3D, &gt;%3E, +%2B, | に%7C、 \\[ に%5B、 \\] %5D にスペースを %20 に変換し、#127 を超えるすべての文字を UTF-8 形式に変換し、UTF-8 の各バイトを %HH 形式に変換します。 (プログラマに助けを求める) お問い合わせ
例えば、 stationID &gt;「41004」の特長
なると stationID %3E=%2241004%22
アクセス時にパーセントのエンコーディングが必要です ERDDAP ブラウザ以外のソフトウェアを介して。 ブラウザーは通常、パーセントエンコーディングを処理します。
A-Za-z0-9\\_-以外のすべての文字をパーセントエンコードする必要があります。~ お問い合わせ () \\* は初期 '&' または main をエンコードしません。 '=' お問い合わせ
プログラミング言語はこれを行うツールを持っています(例えば、参照してください) Java お問い合わせ [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)   
そして、 Java スクリプトの [encodeURIComponent(). . (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) そしてそこにあります
         [あなたのためのエンコード/デコードをパーセントするウェブサイト](https://www.url-encode-decode.com/) お問い合わせ
    * お問い合わせ datasets.xml XMLファイルで、すべての'&'をエンコードし、'&lt;', '&gt;' は URL の '&amp;', '&lt;', と '&gt;' パーセントエンコーディング後。
    *    infoUrl ユニークです。 ERDDAP お問い合わせ 任意のメタデータ規格ではありません。
###### 所属機関{#institution} 
*    [ **所属機関** ](#institution)   (お問い合わせ [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) そして、 [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) このデータのソースである機関の名前の短いバージョン(通常、頭字語、通常は、&lt;20文字) 例えば、
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * データセットのグローバル [ソース属性](#global-attributes) またはそのグローバル&lt; addAttributes ツイート この属性を含める必要があります。
    *    ERDDAP™ データセットのリストを表示する際に、施設が表示されます。 機関名が20文字以上ある場合は、データセットの一覧で最初の20文字のみ表示されます。 (しかし、隣接する「?」アイコンの上にマウスカーソルを置くことで、施設全体を見ることができます。) お問い合わせ
    * 機関をリストに追加する場合&lt; categoryAttributes ツイート お問い合わせ ERDDAP お問い合わせ [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) ファイル、ユーザーは、同じ機関からデータセットを簡単に見つけることができます ERDDAP 's ホームページの「カテゴリによるデータセットの検索」。
###### キーワード{#keywords} 
*    [ **キーワード** ](#keywords)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) 単語と短いフレーズの推奨コンマ区切りリストです (例えば、 [GCMDの特長 科学キーワード](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access) ) 一般的な方法でデータセットを記述し、データセットの他の知識を仮定しない (例えば、海図データには海図データが含まれる) お問い合わせ 例えば、
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
お問い合わせ datasets.xml は、XML ドキュメント、文字と、&lt;キーワードのような属性の , と &gt; (例:GCMDサイエンスキーワードの &gt; 文字) &amp としてエンコードする必要があります。&lt;, &gt;, それぞれ.
データセットが読み込まれるとき ERDDAP ,
    
    * 「地球科学 &gt;」は、その欠けている任意のGCMDキーワードの開始に追加されます。
    * GCMDのキーワードはタイトルケースに変換されます (i.e.、最初の文字は大文字化されます) お問い合わせ
    * キーワードはソート順に並べ替えられ、新しい文字は削除されます。
     
######  keywords\\_vocabulary  {#keywords_vocabulary} 
*    [ ** keywords\\_vocabulary ** ](#keywords_vocabulary)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) キーワード属性の単語/フレーズのガイドラインに従っている場合 (例えば、GCMDサイエンスキーワード) , ここにそのガイドラインの名前を置く. 例えば、
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### ライセンス{#license} 
*    [ **ライセンス** ](#license)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) ライセンスおよび/または使用制限により、堅く推奨されるグローバル属性です。 例えば、
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * もし " \\[ スタンダード \\] " 属性値で発生し、標準で置換されます。 ERDDAP™ ライセンスから&lt;標準ライセンス&gt; タグ ERDDAP お問い合わせ
         \\[ トームキャット \\] /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml ファイル。
         
######  Metadata\\_Conventions  {#metadata_conventions} 
*    [ ** Metadata\\_Conventions ** ](#metadata_conventions) 外部からの [ACDD 1.0の特長](https://wiki.esipfed.org/ArchivalCopyOfVersion1)   (で識別された Metadata\\_Conventions として " Unidata データセット ディスカバリーv1.0) メタデータ規格。 属性値は、このデータセットによって使用されるメタデータ条約のコンマ区切りのリストでした。
データセットが ACDD 1.0 を使用した場合、この属性は STRONGLY RECOMMENDED です。
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
しかし、 ERDDAP™ ACDD-1.3をお勧めします。 お問い合わせ [ACDD-1.3 を使用するデータセットを切り替える](#switch-to-acdd-13) 、使用の Metadata\\_Conventions 強烈な記述: ちょうど使用 [&lt;コンベンション&gt; (#イベント) 代わりに。
######  processing\\_level  {#processing_level} 
*    [ ** processing\\_level ** ](#processing_level)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) 処理の推奨テキストの説明です。 (例えば、 [NASAの地球観測システムデータと情報システムのデータ処理レベル](https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/data-processing-levels) 例えば、レベル3) または品質管理のレベル (例えば、科学の質) データ。 例えば、
    ```
    <att name="processing\\_level">3</att>  
    ```
###### プロジェクト{#project} 
*    [ **プロジェクト** ](#project)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) データセットが一部であるプロジェクトを識別するためのOPTIONAL属性です。 例えば、
    ```
    <att name="project">GTSPP</att>  
    ```
データセットがプロジェクトの一部でない場合には、この属性を使用しないでください。 比較する [ creator\\_name ](#creator_name) 、これはプロジェクトに焦点を当てています (複数のプロジェクトに関与する可能性のある人や組織ではない) お問い合わせ
######  publisher\\_name  {#publisher_name} 
*    [ ** publisher\\_name ** ](#publisher_name)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) このデータセットを公開している人物、組織、プロジェクトを識別するための推奨方法です。 例えば、
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
たとえば、別の人やグループの場合、出版社です。 [編集者](#creator_name) データセットと、あなただけのデータを保存している ERDDAP お問い合わせ 「パブリッシャー」がデータセットに実際に適用されていない場合、この属性を省略します。 比較する [ creator\\_name ](#creator_name) , 出版社は、おそらくデータを変更または再処理しなかった; 出版社は、新しい会場で利用可能なデータを作るだけです.
######  publisher\\_email  {#publisher_email} 
*    [ ** publisher\\_email ** ](#publisher_email)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) メールアドレスを識別するための推奨方法です (たとえば、john\\_smith@great.org) 出版社に連絡する方法を提供します。 例えば、
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
「パブリッシャー」がデータセットに実際に適用されていない場合、この属性を省略します。
######  publisher\\_url  {#publisher_url} 
*    [ ** publisher\\_url ** ](#publisher_url)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) データセットを公表する組織のURLを識別するためのRECOMMENDEDの方法は、このデータセットに関するパブリッシャーの情報を含むURLです。 (しかし、それはより多くの目的である [ infoUrl ](#infourl) ) お問い合わせ 例えば、
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
「パブリッシャー」がデータセットに実際に適用されていない場合、この属性を省略します。
######  real\\_time  {#real_time} 
*    [ ** real\\_time ** ](#real_time) グローバルな String 属性 (あらゆる標準から) これはリアルタイムのデータセットであるかどうかを示します。 例えば、
    ```
    <att name="real\\_time">true</att>  
    ```
これが false の場合 (デフォルト) , ERDDAP™ ファイルが作成される必要のあるファイルタイプのリクエストに対するレスポンスをキャッシュします。 ERDDAP™ 応答をユーザーに送信し、最大15分間再利用を開始できます。 (例: .nc , .png) お問い合わせ
これがtrueに設定されている場合、 ERDDAP™ 応答ファイルをキャッシュしないようにし、新しく作成したファイルを常に返します。
######  sourceUrl 属性属性{#sourceurl-attribute} 
*    [ ** sourceUrl ** ](#sourceurl-attribute) データのソースの URL を持つグローバル属性です。 例えば、
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (しかし、すべての行を1行に置く) 
    *    ERDDAP™ 通常、このグローバル属性を自動的に作成します。 2つの例外はEDDTableFromです Hyrax ファイルとEDDTableFromThreddsFiles.
    * ソースがローカルファイルであり、ファイルが組織によって作成されている場合は、
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * ソースがローカルデータベースであり、組織によってデータが作成されている場合は、
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *    sourceUrl クライアントがデータを元のソースにバックトラックできるようにするため、重要です。
    *    sourceUrl ユニークです。 ERDDAP お問い合わせ 任意のメタデータ規格ではありません。
        
######  standard\\_name\\_vocabulary  {#standard_name_vocabulary} 
*    [ ** standard\\_name\\_vocabulary ** ](#standard_name_vocabulary)   (お問い合わせ [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) 変数から制御された語彙の名前を識別するためのRECOMMENDED属性です [ standard\\_name ](#standard_name) s は取られます。 例えば、
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
バージョン77の場合 [CF標準名表](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) お問い合わせ
         
#####  subsetVariables  {#subsetvariables} 
*    ** subsetVariables **   (EDDTable データセットのみ) comma-separated リストを指定できる RECOMMENDED のグローバル属性です。&lt; dataVariable &gt;&gt; (#データ変数)   [ destinationName ](#destinationname) s は、限られた値の変数を識別する (別の方法:各値が多くの重複を持っている変数) お問い合わせ 例えば、
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
この属性が存在する場合、データセットは * datasetID * .subset ウェブページ (すべてのデータセットリストのリンク) これにより、ユーザーはデータのさまざまなサブセットを素早く簡単に選択できます。
    * データセットが読み込まれるたびに、 ERDDAP ディスク上のロードとストアは、すべての異なるテーブル () サブセットの組み合わせ 変数の変数の値。 ERDDAP™ 読むことができます subsetVariables 非常にすぐにテーブルおよびプロセス (特に、大量のデータファイルを読むか、データベースや他の外部サービスからデータを取得することと比較して) お問い合わせ
    * これにより、 ERDDAP™ 3つのことを行うため:
        1. それは許可します ERDDAP™ データアクセスフォームのドロップダウンリストに可能な値のリストを置く、グラフのWebページを作成し、.subset Webページ。
        2. それは許可します ERDDAP™ そのデータセット用の.subset Webページを提供する。 そのページは興味深いので、これらの変数の値の有効な組み合わせを簡単に見つけることができます。いくつかのデータセットといくつかの変数は非常に困難です。 (ほとんど不可能) お問い合わせ その後、すべてのユーザが明確に要求する () サブセット 変数データは高速になります。
        3. これらの変数のサブセットを参照するユーザリクエストがある場合、 ERDDAP™ すぐに読むことができます subsetVariables ご要望に応じます。 それは時間と努力のトンを節約することができます ERDDAP お問い合わせ
    * 注文の注文 destinationName s を指定するとソート順が決定されます。 * datasetID * .subset Web ページは、通常、最も重要な変数を最初に指定します。 たとえば、複数のステーションのタイムシリーズデータを含むデータセットの場合、たとえば、
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
Station\\_id で値がソートされるようにします。
    * 明らかに、変数が含まれているあなたの選択です subsetVariables リスト、しかし提案された使用法はあります:
        
一般的には、必要な変数を含む ERDDAP™ データセットのデータアクセスフォームのオプションのドロップダウンリストを表示する (.html拡張子) グラフ作成 (.グラフ) サイトマップ
        
一般的には、データセットの機能に関する情報を含む変数 (駅、プロフィール、および/または trajectories から、特に [cdm\\_timeseries\\_変数](#cdm_timeseries_variables) , [cdm\\_profile\\_変数](#cdm_profile_variables) , [cdm\\_trajectory\\_変数](#cdm_trajectory_variables) ) お問い合わせ これらの変数にはいくつかの異なる値しかないので、ドロップダウンリストでうまく動作します。
        
個々の観察に関連するデータ変数は含まれていません (例えば、時間、温度、塩分、電流速度) お問い合わせ subsetVariables リスト。 これらの変数にはあまりにも多くの異なる値があるので、ドロップダウンリストは読み込みが遅くなり、作業が困難になります (作業しない) お問い合わせ
        
    * これらの変数の異なる組み合わせの数が約1,000,000より大きい場合、制限を考慮する必要があります。 subsetVariables 1,000,000未満の異なる組み合わせの数を減らすために指定する。そうしないと、 * datasetID * .subset Web ページをゆっくりと生成できます。 極端な場合、データセットはロードできません ERDDAP™ 異なる組み合わせのリストを生成するため、あまりにも多くのメモリを使用します。 もしそうなら、変数をいくつか削除する必要があります。 subsetVariables リスト。
    * 1つのサブセット変数の異なる値の数が約2万を超える場合、その変数をリストに含まないことを考慮する必要があります。 subsetVariables ;そうでなければ、それは送信するのに長い時間かかります * datasetID * .subset, * datasetID * .グラフ、および * datasetID * .html ウェブページ。 また、Macでは、スクロールバーの欠如のために500以上のアイテムでドロップダウンリストから選択をするのは非常に困難です。 妥協は: ユーザーがドロップダウンリストから値を選択する可能性がない場合、リストから変数を削除します。
    * それぞれのデータセットをテストして、 subsetVariables 設定は大丈夫です。 ソースデータサーバが遅く、長すぎる場合 (または失敗) データをダウンロードするには、指定された変数の数を減らすか、削除する subsetVariables グローバル属性。
    * サブセット 変数は非常に有用です。 データセットが適している場合は、作成してください subsetVariables 属性。
    * EDDTableFromの特長 SOS 自動的に追加します
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
データセットが作成されるとき。
        * 警告可能:ユーザーが使用している場合 * datasetID * .subset Web ページでは、キャリッジリターンまたは改行文字を持つ値を選択します。 * datasetID * .subset が失敗します。 ERDDAP™ 一部の HTML の詳細のため、この問題を回避することはできません。 いずれの場合も、データからキャリッジリターンと改行文字を削除することはほぼ常に良い考えです。 EDDTable なら、問題を解決するために。 subsetVariables DataTableメソッド ERDDAP トラブルの原因となるデータ値を検出し、メールに値がオフエンドの一覧で警告をメールします。 お問い合わせ setup.xml で指定されたメールアドレスをメールに送信します。 そういうわけで、何を固定する必要があるか知っています。
        *    **プリ生成されたサブセットテーブル。** 普通、時 ERDDAP™ データセットをロードし、それは明確に要求します () サブセット変数は、データソースからのデータテーブルを、通常のデータリクエストを介して行います。 場合によっては、データソースからこのデータは利用できず、データソースサーバーからのデータソースから取得することは困難です。 もしそうなら、情報でテーブルを情報に供給することができます。 .json または .csv ファイルの名前 *トームキャット* /content/erddap/サブセット/ * datasetID *  .json   (または .csv) お問い合わせ プレゼントの場合 ERDDAP™ データセットをロードしてサブセットデータのソースとして使用すると、一度読みます。
            * 読みながらエラーが発生した場合は、データセットがロードできません。
            * 同じカラム名は必須です。 (例えば、同じ場合) として&lt; subsetVariables &gt;, しかし, 列 MAY 任意の順序で.
            * MAY には追加の列があります (削除され、新しく冗長行が削除されます) お問い合わせ
            * 値が不足しているのは、値が不足している (偽の数字のような -99) お問い合わせ
            *    .json ファイルは、Unicode文字をうまく作成するのに少し難しいかもしれません。 .json ファイルを作成すると簡単に作成できます。 ERDDAP お問い合わせ
            * .csv ファイルは、ISO 8859-1 文字のみで使用できます。 .csv ファイルには、最初の行と後続行のデータに列名が記載されている必要があります。
        * 巨大なデータセットまたはいつ&lt; subsetVariables &gt; は誤って設定されており、Too Much DataやOutOfMemoryエラーが発生すると、値のコンビネーションの表が十分に大きくなる可能性があります。 解決策は、変数をリストから削除することです。&lt; subsetVariables &gt; 多数の値がある場合、またはそのテーブルのサイズが妥当であるまで必要に応じて変数を削除してください。 エラーに関係なく、エラーの部分 ERDDAP™ それを使う subsetVariables システムがうまく機能しない (e.g.、Webページは非常にゆっくりと読み込みます) 行が多すぎるとき (例:百万円以上) そのテーブルに。
        *    subsetVariables ユーザーが制約で使用できる変数を指定すると、つまりデータセットのサブセットをリクエストする方法は何もありません。 ERDDAP™ 制約が変数のいずれかを参照できるようにします。
###### タイムユニット{#time-units} 
 [時間とタイムスタンプ](#time-units) コラムはISO 8601:2004を持っているべきです (Eメール) フォーマットされた date+time Z 文字列 (例えば、1985-01-31T15:31:00Z) お問い合わせ
             
###### ニュース{#summary} 
*    [ **ニュース** ](#summary)   (お問い合わせ [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) そして、 [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) データセットの長い説明を持つREQUIREDグローバル属性(通常は)&lt;500文字) 例えば、
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * データセットのグローバル [ソース属性](#global-attributes) またはそのグローバル&lt; addAttributes ツイート この属性を含める必要があります。
    * クライアントがタイトルよりも多くの情報を持っているデータセットの説明を読み、データセットが何であるかを迅速に理解できるようにするため、要約は非常に重要です。
    * 助言:要約を書いて下さい従って通りに会うか、または同僚にデータセットをある任意人に記述するために働きます。 含めることを忘れないでください [5つのWと1つのH](https://en.wikipedia.org/wiki/Five_Ws) : 誰がデータセットを作成しましたか? 収集した情報は? 収集したデータはいつですか? 収集した場所 なぜ回収されたのか? 収集方法は?
    *    ERDDAP™ データセットのデータアクセスフォームの要約を表示 ( * datasetID * .html拡張子) , グラフのWebページを作る ( * datasetID * .グラフ) ほかのWebページ ERDDAP™ FGDCおよびISO 19115文書を作成する場合の要約を使用して下さい。
######  testOutOfDate  {#testoutofdate} 
*    [ ** testOutOfDate ** ](#testoutofdate)   (オプション ERDDAP - 特定のグローバルメタデータ属性、標準からではなく) 単純に定義された方法で、近リアルタイムのデータセットのデータが最新のものとみなされた場合、 now-  *nユニット* 例えば、 now- 通常、時刻値の24-48時間後に表示されます。 予測データについては、今すぐ使用してください **+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +**  *nユニット* , 例えば,現在+6日間予報データ, 将来的には8日間. (詳細はこちら [ now-  *nユニット* 構文の説明](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) お問い合わせ) データセットの最大時間値が指定された時間よりも最新である場合、データセットは最新のものとみなされます。 指定された時間よりも最大時間値が古い場合、データセットは最新のものとみなされます。 最新のデータセットでは、データソースの問題が想定されているため、 ERDDAP™ 最近の時点からデータにアクセスできません。
    
ザ・オブ・ザ・ testOutOfDate 値が列として表示されます。 [ allDatasets データセット](#eddtablefromalldatasets) お問い合わせ ERDDAP お問い合わせ また、outOfDate インデックスを計算するために使用されます。これは別のカラムです。 allDatasets データセット。
インデックスが&lt;1、データセットは最新のものと見なされます。
インデックスが&lt;=1、データセットは最新のものとみなされます。
インデックスが&lt;=2、データセットは非常に古いと見なされます。
    
ザ・オブ・ザ・ testOutOfDate 値も使う ERDDAP™ 生成するhttps://*yourDomain*/erddap/outOfDateDatasets.htmlサイトマップ ( [サンプル](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) データセットを表示する&lt; testOutOfDate &gt; タグ、データセットは、その日付の日付によってランク付けされます。 ファイルタイプを変更する場合 (.html から .csv, .jsonlCSV , .nc , .tsv , ...) 異なるファイル形式でその情報を得ることができます。
    
可能であれば、 [生成データセットXml](#generatedatasetsxml) 追加する testOutOfDate グローバルな属性 addAttributes データセットの この値は、GenerateDatasetsXml に利用可能な情報に基づく提案です。 値が適切でないと変更します。
    
ここの「最新」は、非常に異なっています [&lt;リロード 毎分&gt; (#reloadeveryn分) , 最新を最新にする方法を扱います ERDDAP データセットの知識はあります。 ザ・オブ・ザ・&lt; testOutOfDate &gt; システムでは、 ERDDAP データセットの知識は最新です。 お問い合わせ&lt; testOutOfDate &gt; 取引は: データのソースに誤って何かがあるように思われます, より多くの最近のデータがアクセスできないために ERDDAP お問い合わせ
    
###### タイトル{#title} 
*    [ **タイトル** ](#title)   (お問い合わせ [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) そして、 [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) データセットの短い説明を持つREQUIREDグローバル属性(通常は)&lt;=95 文字) 例えば、
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * データセットのグローバル [ソース属性](#global-attributes) またはそのグローバル&lt; addAttributes ツイート この属性を含める必要があります。
    * タイトルは、提示されたすべてのデータセットのリストが重要であるため、重要です ERDDAP   (検索結果以外の) アルファベット順にデータセットをリストします。 そのため、データセットの順序を指定したい場合、または一緒にグループ化されたデータセットがある場合は、そのようにタイトルを作成する必要があります。 データセットの多くのリスト (例えば、カテゴリ検索に対応する) , フルリストのサブセットを表示し、異なる順序で. そのため、各データセットのタイトルは、それぞれに立つ必要があります。
    * タイトルに「DEPRECATED」という言葉が含まれている場合 (すべての資本文字) すると、データセットは検索で下位になります。
             
##### &lt; axisVariable &gt;{#axisvariable} 
* ツイート ** &lt; axisVariable ツイート ** . . (#軸変数) 次元を記述するのに使用されています (「軸」とも呼ばれる) お問い合わせ
お問い合わせ EDDGrid データセット、1つ以上 axisVariable タグは必須です。 [ dataVariable ツイート](#datavariable) すべての軸変数を共有/使用して下さい。 ( [なぜ?](#why-just-two-basic-data-structures)   [彼らがそうでないならば?](#dimensions) )   
データ変数の各次元の軸変数である必要があります。
軸変数は、データ変数がそれらを使用する順番で指定される必要があります。
(EDDTable データセットは使用できません)&lt; axisVariable &gt; タグ
肉体化された例は:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt; axisVariable &gt; 次のサブタグをサポートしています。
###### &lt; sourceName \\&gt;{#sourcename} 
* ツイート&lt; sourceName \\&gt; (#ソース名) -- 変数のデータソースの名前。 これは名前です。 ERDDAP™ データソースからデータを要求する場合に使用します。 これは名前です。 ERDDAP™ データがデータソースから返されたときに探します。 ケース感度です。 お問い合わせ
###### &lt; destinationName \\&gt;{#destinationname} 
* ツイート&lt; destinationName \\&gt; (#目的地名) 変数の名前は、表示され、使用する変数の名前です。 ERDDAP™ ユーザー。
    * これはオプションです。 不在の場合、 sourceName 使用しています。
    * 暗号化やオッズを変更できるので便利です。 sourceName お問い合わせ
    *    destinationName 場合の敏感です。
    *    destinationName s はレターから始める必要があります (A-Z、a-zの) 0 以上の文字でフォローしてください。 (A-Z、a-z、0-9、および\\_) お問い合わせ ('-' が許可される前に ERDDAP™ バージョン1.10.) この制限により、軸変数名が同じようにすることができます。 ERDDAP™ 、応答ファイル、およびプログラミング言語を含むこれらのファイルが使用されるすべてのソフトウェアで (お問い合わせ Python , Matlab と Java スクリプト) 変数名に類似する制限がある場合。
    * インスタグラム EDDGrid データセット、 [経度、緯度、高度、深さ、時間](#destinationname) 軸変数は特別です。
         
######  axisVariable  &lt;addAttributes&gt; {#axisvariable-addattributes} 
* ツイート&lt; addAttributes &gt;&gt; (#変数-addributes) 属性の OPTIONAL セットを定義する ( *お名前 (必須)* パスワード *バリュー* ) 変数のsource's属性に追加され、変数のコンバインド属性を作成します。
変数の [ソース属性](#variable-addattributes) または&lt; addAttributes &gt; 含める [ scale\\_factor および/または add\\_offset ](#scale_factor) 属性は、その値がクライアントに配布する前にソースからデータを解凍するために使われます。
     (プロフィール 値 = ソース 値 \\* scale\\_factor + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + add\\_offset ) お問い合わせ unpacked 変数は同じデータ型になります (例えば、フロート) として scale\\_factor そして、 add\\_offset 値。
         
##### &lt; dataVariable &gt;{#datavariable} 
* ツイート ** &lt; dataVariable ツイート ** . . (#データ変数) お問い合わせ (ほぼすべてのデータセット) 内のタグ&lt;データ変数を記述するために使用されるdataset&gt; タグ。 このタグのインスタンスが1つ以上ある必要があります。 肉体化された例は:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt; dataVariable &gt; 次のサブタグをサポートしています。
###### &lt; sourceName &gt;{#sourcename-1} 
* ツイート&lt; sourceName &gt;&gt; (#ソース名) -- 変数のデータソースの名前。 これは名前です。 ERDDAP™ データソースからデータを要求する場合に使用します。 これは名前です。 ERDDAP™ データがデータソースから返されたときに探します。 ケース感度です。 お問い合わせ
###### グループ{#groups} 
CF は CF v1.8 でグループのサポートを追加しました。 ～2020年以降 NetCDF 変数をグループに入れるツールが .nc ファイル。 実際には、これは変数がグループを識別する長い名前を持っていることを意味します (ツイート) 変数名、例えば、group1a/group2c/varName )。 ERDDAP™ 変数の "/" の変換でグループをサポート&lt; sourceName &gt; 変数の "\\_" に&lt; destinationName &gt;, 例えば,group1a\\_group2c\\_varName . (すると、グループが構文の慣習よりもはるかに多くないことを認識する必要があります。) 変数がリストされているとき ERDDAP™ , グループ内のすべての変数が一緒に現れます, 地下グループを模倣します. \\[ お問い合わせ ERDDAP™ , かなり GenerateDatasets Xmlは、グループを持っているソースファイルでも実行できません。サンプルファイルをChrisにメールで送信してください。 noaaa.gov のジョン。 \\] 

EDDTableFromFiles データセットは、特別にエンコードされた、擬似使用することができます sourceName s は、データ変数となるグローバル属性を促進するために、例えば、新しいデータ変数を定義します。 お問い合わせ [このドキュメント](#pseudo-sourcenames) お問い合わせ
######  HDF 構成{#hdf-structures} 
まずは ERDDAP™ v2.12, EDDGrid FromNcFilesと EDDGrid からNcFiles 未梱包で「構造」からデータを読み込むことができます .nc 4と4 .hdf 4ファイル。 構造からある変数を識別するため、&lt; sourceName ツイート フォーマットを使用する必要があります。 *フル構造名称*  |  *会員名* 、例えばgroup1/myStruct | メンバー

###### 固定値のソース名{#fixed-value-sourcenames} 
EDDTable データセットでは、変数を作成したい場合 (単一、固定価値を使って) ソースデータセットにないのは、次のようにします。
```
    <sourceName>=*fixedValue*</sourceName>  
```
初期の等しい記号は指示します ERDDAP™ 固定する 値が続く。

* 数値変数の場合、固定値が単一のfinite値かNaNでなければなりません (場合の無感覚、例えば、\\=NaN) お問い合わせ
* 文字列変数の場合、固定値がシングルでなければなりません。 [JSONスタイルの文字列](https://www.json.org/json-en.html)   (\\ 文字でエスケープされた特別な文字で) , 例, \\="My \\"special\" 文字列" .
* タイムスタンプ変数の場合は、固定値を数値として指定します。 "seconds since 1970-01-01T00:00:00Z" そして使用して下さい
1970-01-01T00:00:00Z以来のunit=seconds。
    
その他のタグ&lt; dataVariable &gt; これは通常の変数だったかのように動作します。
例えば、0.0の固定値で高度という変数を作成する (フローティング) , 使用:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

異常な状況では、 actual\\_range addAttribute, 宛先の期待値と宛先の値を上書きしますマックス (そうでなければ固定が等しい バリュー) お問い合わせ
 
###### スクリプト SourceNames/派手な変数{#script-sourcenamesderived-variables} 
まずは ERDDAP™ v2.10, で [EDDTableFromFiles (EDDTableFromFiles) は、](#eddtablefromfiles) , [EDDTableFromデータベース](#eddtablefromdatabase) または [EDDTableFromFileNames(ファイル名)](#eddtablefromfilenames) データセット、&lt; sourceName &gt; できます
表現 (単一の値を評価する式) 、フォーマットを使用して下さい
```
    <sourceName>=*expression*</sourceName>  
```
またはスクリプト (単一の値を返す一連のステートメント) 、フォーマットを使用して下さい
```
    <sourceName>=*script*</sourceName>  
```
 ERDDAP™ 返信する [Apache プロジェクト](https://www.apache.org/)   [ Java 表現言語 (ジエクセル) ](https://commons.apache.org/proper/commons-jexl/)   (ライセンス: [パスワード](https://www.apache.org/licenses/LICENSE-2.0) ) 式を評価し、スクリプトを実行します。
与えられた新しい変数の計算は、すべての行に対して繰り返し、結果の1行以内に行われます。
式とスクリプトは、 Java - と Java Script のような構文はどれも使うことができます。
 [JEXLに組み込まれたオペレータとメソッド](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) お問い合わせ
スクリプトはメソッドを使うこともできます (関数) これらのクラスから:
*    [カレンダー2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2) , これは、静的のためのラッパーです。, 時間 - カレンダー関連の方法 com.cohort.util.Calendar2 ( [ライセンス](/acknowledgements#cohort-software) ) お問い合わせ 例えば、
カレンダー2.parseToEpochSeconds ( *sourceTime, 日付 タイムフォーム* ) ソースを解析する dateTimeFormat 文字列を経由してタイム文字列を返し "seconds since 1970-01-01T00:00:00Z"   (エポックSeconds) 二重価値。
*    [数学](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math) 、ほとんどすべての静的、数学関連の方法のためのラッパーです [java.lang. は、 数学](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html) お問い合わせ 例えば、Math.atan2 ( *y、x* ) 長方形の座標を取る (y、x) 極座標を返す (二重の配列 \\[ r, テタ \\] ) お問い合わせ
*    [数学2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2) , これは、ほぼすべての静的のためのラッパーです, com.cohort.utilの数学関連のメソッド. 数学2 ( [ライセンス](/acknowledgements#cohort-software) ) お問い合わせ 例えば、
数学2.roundTo ( *d、nPlaces* ) d を小数点の右側に指定した数字に丸めます。
* 文字列は、静的、文字列関連のすべてのメソッドへのアクセスを提供します。 [java.lang. は、 ストリング](https://docs.oracle.com/javase/8/docs/api/java/lang/String) お問い合わせ 文字列オブジェクト ERDDAP™ 式とスクリプトは、関連するどれでも使用できる Java java.lang で記述される方法。 文字列のドキュメント。 例えば String.valueOf (ログイン) 二重値dを文字列に変換します ("+d" を使うこともできますが) お問い合わせ
*    [ストリング2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2) , これは、com.cohort.util.String2の静的、文字列および配列関連のメソッドのほとんどのためのラッパーです ( [ライセンス](/acknowledgements#cohort-software) ) お問い合わせ 例えば String2 .z エロパッド ( *数値, nDigits* ) 数値文字列の左に 0 's を追加して、数字の総数が nDigits になります。 (例: String2 .z エロパッド (「6」、2) "06" を返す) お問い合わせ
*    [ログイン](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row) ソースのデータテーブルの現在の行にある様々な列からデータにアクセスするための非静的な方法があります。 例えば、 row.columnString (「年」) "year" 列から文字列、whereas、 row.column の値を読みます。 ログイン (「年」) "year" 列から値を整数として読み込みます。

セキュリティ上の理由から、式やスクリプトは、6以外の他のクラスを使用することはできません。 ERDDAP™ デフォルトブラックリストを作成すると、この制限を強制します (すべてのクラスをブラックリストする) そしてホワイトリスト (上記の6つのクラスを具体的に許可する) お問い合わせ 他のメソッドやクラスが必要な場合は、Chris にリクエストを送信してください。 noaaa.gov のジョン。
    
###### ソリューション
EDDTableFromFiles データセットの場合、非常に最小限にしかありません。 (おそらく顕著) これらの変数からのデータのリクエストのスローダウン。 EDDTableFromDatabase では、これらの変数(&longitude0360&gt;30&longitude0360 など)の制約を含むリクエストに対して、膨大な速度のペナルティがあります。&lt;40) 制約がデータベースに通過できないため、データベースははるかに多くのデータを返す必要があります。 ERDDAP™   (それは非常に時間の消費です) そのために ERDDAP™ 新しい変数を作成し、制約を適用できます。 最悪の場合を避けるため (データベースに渡される制約がない場合) , ERDDAP™ データベースがテーブルのコンテンツ全体を返す必要はありませんので、エラーメッセージをスローします。 (これをバイパスしたい場合は、常に真の非スクリプト列に制約を追加します。例えば、&time&lt;3000-01-01.) そのため、EDDTableFromDatabase を使うと、データベースの派生したカラムを作るのは、 sourceName =スクリプト ERDDAP お問い合わせ

###### 表現方法の概要 (またはスクリプト) 使用される:
集計データに対するユーザーの要求に対応するため、 ERDDAP™ ソースファイルの一連のデータを取得します。 各ソースファイルが生の表を生成する (ソースからストレート) データ。 ERDDAP™ その後、生データの表、行ごとに行、式やスクリプトを毎行ごとに一度評価し、その式やスクリプトを持つ新しいカラムを作成する sourceName お問い合わせ
    
###### 生成データセットXml
GenerateDatasets を生成することに注意してください。 変数を作成する必要があるときXmlは完全に気にしません&lt; sourceName &gt;==== *パスワード* &lt;/ / / / sourceName &gt;。 変数を作成する必要があります。 datasets.xml 手で。

###### 式例:
式を使用して新しいデータ列を作成するデータ変数のいくつかの完全な例を示します。 これらの例が期待しています。 (それらのバリエーション) 全式由来の約95%をカバー sourceName お問い合わせ

###### 「日付」を分け、 "time" 列を統一した時間列に:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
お問い合わせ sourceName 式は新しい "time" "date" から文字列値を連結することでカラム ( yyyy-MM-dd ) そして、 "time"   (HH:mm:ss) ソースファイルの各行の列、およびその文字列を変換することによって "seconds since 1970-01-01"   (エポックSeconds) 二重価値。

または、各データセットのソース日付と時刻の列の特定の形式に対処する時間フォーマット文字列をカスタマイズする必要があります。
 [時間単位の文書](#string-time-units) お問い合わせ

技術的に、使用する必要はありません カレンダー2.parseToEpochSeconds () 組み合わせた date+time を epochSeconds に変換します。 date+time String を渡すだけで ERDDAP™ フォーマットを指定する(例:
 yyyy-MM-dd 'T'H:mm:ss'Z' は、ユニットの属性で指定します。 しかし、epochSeconds への変換には重要な利点があります。 同様に、EDDTableFromFiles は、各ファイル内の時間値の範囲を容易に追跡し、時間制約があるリクエストに応答するときに特定のファイルを見るかどうかを迅速に決定できます。

関連する問題は、別の年、月、日付、時間、分、秒のソースから統一された日付+時刻の列を作成する必要があります。 解決策は非常に似ていますが、多くの場合、フィールドの多くのゼロパッドが必要になるので、例えば月 (1 - 12) ・日時 (1 - 31) 常に2つの数字を持っています。 年、月、日付を含む例を示します。
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
関連する問題は、ソーステーブルの別の度、分、秒の列にデータを結合することにより、統一された緯度または経度列を作成する必要があります。 例えば、
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### 0〜360°の経度値で "lon" という名前のカラムを -180 - 180° から値で "longitude" という名前のカラムに変換
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
お問い合わせ sourceName 式は、ソースファイルの各行の "lon" 列から二重値を変換することによって、新しい "longitude" カラムを作ります (想定値 0～360値) と、その値を -180 から 180 倍の値に変換することによって。

代わりに-180 - 180°のソースの経度値を0 - 360°に変換する場合は、使用
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
二度変数のネーミング:
データセットに2つの縦度変数がある場合、使用をお勧めします。 destinationName = -180 - 180°変数の縦度 destinationName =経度0360 (と longName=\\"経度 0-360°") 0 - 360°変数の場合。 特定の経度範囲内のデータを検索するために、ユーザーが時々高度な検索を使用するので、これは重要です。 この検索は、すべてのデータセットの-180 - 180°値が一貫してある場合、より良い機能になります。 また、dataset の geospatial\\_lon\\_min, geospatial\\_lon\\_max, Westernmost\\_Easting と Easternmost\\_Eastings のグローバル属性は一貫した方法で設定されます。 (経度値 -180 から 180°) ;;;
    
###### "tempF" という名前のカラムを度\\_ の温度値に変換 F 列に "tempC" と温度の度\\_ Cの:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
お問い合わせ sourceName 式は float の度\\_ を変換することで新しい "tempC" カラムを作る ソースファイルの各行の "tempF" 列からフロートの度\\_ への F 値 C値。

データセットは元の温度を両方持つことができることに注意してください F変数および新しい臨時雇用者 別の変数を持つことによってC変数
```
    <sourceName>tempF</sourceName>
```
###### 風速と「方向」列を u,v コンポーネントで 2 列に変換
* u 変数を作るためには、使用して下さい
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* v 変数を作成するには、
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
または、u、v を与えられる:
* 速度変数を作るためには、使用して下さい
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* 方向変数を作成するには、
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### スクリプト例:
スクリプトを使う例は、式だけではなく、 sourceName お問い合わせ スクリプトは、式とは対照的に、しばしば必要とされないことを期待しています。 この場合、目標は非NaN欠損値を返すことです (・99) 特定の範囲の外の温度値のため。 スクリプトは "="" の後の部分であることに注意してください。
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### 堅い旗
式やスクリプトが定義されているものを変更する場合 sourceName , 設定する必要があります。 [堅い旗](/docs/server-admin/additional-information#hard-flag) データセットのため ERDDAP™ データセットのキャッシュされた情報をすべて削除し、すべてのデータファイルを再読み込み (新しい式やスクリプトを使う) 次回はデータセットをロードします。 代わりに、あなたは使用することができます [ダスDds](#dasdds) これは、ハードフラグを設定することと同じです。

###### パーセントエンコード
これはほとんど関連していません。 式やスクリプトが書かれているので datasets.xml , これは、XML ドキュメントです。, パーセントは、任意のエンコードをエンコードする必要があります。&lt;、\\&gt;、および式とスクリプト内の文字&lt;, &gt;, &amp; .

###### 一般的な問題
一般的な問題は、変数を作成することです。 sourceName パスワード *パスワード* しかし、データの結果の列は、値が不足しているだけです。 あるいは、新しい列の行が欠落している値があり、そうでないと思われます。 根本的な問題は、何かが表現と間違っていることです。 ERDDAP そのエラーを欠落した値に変換します。 問題を解決するため、

* 問題がどうなるかを調べるために、式を見てみましょう。
* お問い合わせ [ログイン](/docs/server-admin/additional-information#log) それぞれの新しいカラムの作成時に生成された最初のエラーメッセージが表示されます。

一般的な原因は次のとおりです。

* 間違った場合を使用しました。 表現とスクリプトは、ケースの機密性です。
* クラスの名前を省略します。 例えば、Math.abs を使う必要があります。 () , ちょうどabs () お問い合わせ
* 変換をタイプしなかった。 例えば、パラメータ値のデータ型が文字列で、二重値の場合、「+d」で文字列を2倍に変換する必要があります。
* 式内のカラム名は、ファイル内のカラム名に正確に一致しません。 (または、名前は、いくつかのファイルで異なる可能性があります) お問い合わせ
* 式に構文エラーがあります (例えば、欠落または追加 ') . . .

あなたが立ち往生または助けが必要な場合,
詳しくはこちらをご覧ください。 [追加サポートを受けるセクション](/docs/intro#support) お問い合わせ
        
###### &lt; destinationName &gt;{#destinationname-1} 
* ツイート&lt; destinationName &gt;&gt; (#目的地名) -- 変数の名前を表示し、使用する変数の名前 ERDDAP™ ユーザー。
    * これはオプションです。 不在の場合、 [ sourceName ](#sourcename) 使用しています。
    * 暗号化やオッズを変更できるので便利です。 sourceName お問い合わせ
    *    destinationName 場合の敏感です。
    *    destinationName s はレターから始める必要があります (A-Z、a-zの) 0 以上の文字でフォローしてください。 (A-Z、a-z、0-9、および\\_) お問い合わせ ('-' が許可される前に ERDDAP™ バージョン1.10.) この制限により、データ変数名が同じようにすることができます。 ERDDAP™ 、応答ファイル、およびプログラミング言語を含むこれらのファイルが使用されるすべてのソフトウェアで (お問い合わせ Python , Matlab と Java スクリプト) 変数名に類似する制限がある場合。
    * EDDTable データセットでは、 [経度、緯度、高度 (または深さ) 、および時間](#destinationname) データ変数は特別です。
             
###### &lt;データデータ タイプ及びgt;{#datatype} 
* ツイート&lt;データタイプ&gt; (#データ型) -- ソースから来るデータ型を指定します。 (場合によっては、例えば、ASCIIファイルからデータを読み込むと、ソースからのデータが保存されるかを指定します。) 
    * これは、他のデータセットの種類や信号によって要求されます。 これらを要求するデータセットタイプ dataVariable s は: EDDGrid FromXxxFiles, EDDTableFromXxxFiles, EDDTableFromM から WFS , EDDTableFromNOS, EDDTableFrom SOS お問い合わせ ソースから情報を取得するため、他のデータセットタイプはこのタグを無視します。
         
    * 有効な値は標準のどれかです [ ERDDAP™ データの種類](#data-types) ボオラン (詳しくはこちら) お問い合わせ dataType の名前は case-pathy です。
         
###### booleanデータ{#boolean-data} 
*    [「ブーリアン」](#boolean-data) 特別なケースです。
    * 内部的に、 ERDDAP™ booleans が不足している値を保存できず、ほとんどのファイルタイプが booleans をサポートしていないため boolean 型をサポートしていません。 また、 DAP booleans をサポートしていないので、 boolean 変数をクエリする標準的な方法はありません。
    * データの「boolean」を指定する タイプ datasets.xml boolean 値が保存され、バイトとして表されます。 0=false, 1=true, 127= missing\\_value お問い合わせ
    * 数値値を使用して制約を指定できます。 (例えば "isAlive=1") お問い合わせ
    *    ERDDAP™ 管理者は「boolean」データを使用する必要があります タイプ datasets.xml お問い合わせ ERDDAP™ データソースとやり取りする方法 (例えば、リレーショナルデータベースから boolean 値を読み、 0, 1, または 127 に変換) お問い合わせ
         
* ソースファイルのdataTypeからデータ変数を変更したい場合 (例えば、短い) 他のデータへ データセットの型 (例えば、int) 、使用しません&lt;dataType&gt; したいものを指定する。 (いくつかの種類のデータセットで動作します。) 代わりに:
    * 使用条件&lt;dataType&gt; ファイル内のものを指定する (例えば、短い) お問い合わせ
    * お問い合わせ&lt; addAttributes &gt; 変数の場合は、 [ scale\\_factor ](#scale_factor) 新規データと属性 タイプ: (例えば、int) たとえば1の値、
```
            <att name="scale\\_factor" type="int">1</att>  
```
######  dataVariable  &lt;addAttributes&gt; {#datavariable-addattributes} 
* ツイート&lt; addAttributes &gt;&gt; (#変数-addributes) -- 属性のセットを定義する ( *お名前 (必須)* パスワード *バリュー* ) 変数のsource's属性に追加され、変数のコンバインド属性を作成します。 これはオプションです。
変数の [ソース属性](#variable-addattributes) または&lt; addAttributes &gt; 含める [ scale\\_factor および/または add\\_offset ](#scale_factor) 属性は、その値がクライアントに配布する前にソースからデータを解凍するために使われます。 unpacked 変数は同じデータ型になります (例えば、フロート) として scale\\_factor そして、 add\\_offset 値。
        
###### 変数&lt;addAttributes&gt; {#variable-addattributes} 
* ツイート ** 変数属性/変数&lt; addAttributes ツイート ** . . (#変数-addributes) お問い合わせ&lt; addAttributes &gt; は OPTIONAL のタグです&lt; axisVariable &gt; または&lt; dataVariable &gt; 変数の属性を変更するタグ。
    
    *    ** 変数を使う&lt; addAttributes &gt; 変数の属性を変更する。 **  ERDDAP™ データセットのソースから変数の属性を結合します()** ソース属性 **) と変数の**  addAttributes  **定義する datasets.xml   (優先する) 変数の "** 結合属性 ** 「 ERDDAP™ ユーザは参照します。 したがって、あなたは使用することができます addAttributes sourceAttributes の値を再定義し、新しい属性を追加したり、属性を削除したりします。
    * [を見る] ** &lt; addAttributes ツイート **インフォメーション (#addattributes(アダットリブリュート)) グローバルな変数と変数に適用される** &lt; addAttributes ツイート ** お問い合わせ
    *    ERDDAP™ さまざまな方法でこれらの属性の多くを探し、使用します。 例えば、colorBar の値は変数を経由して利用できるように要求されます。 WMS 、地図が一貫したcolorBarsと作ることができるように。
    *    [経緯、緯度、高度 (または深さ) 変数と時間変数](#destinationname) 適切なメタデータを自動的に取得 (例えば、 [ユニット](#units) ) お問い合わせ
    * サンプル&lt; addAttributes &gt; データ変数の場合:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

空の numberOfObservations 属性は、source NumberOfObservations 属性を引き起こします。 (お問い合わせ) 属性の最終リストから削除される。
    * この情報の提供は、 ERDDAP™ より良い仕事をし、ユーザーがデータセットを理解するのに役立ちます。
よいメタデータはデータセットを使用可能にします。
不十分なメタデータにより、データセットは使用しません。
メタデータ属性で良い仕事をする時間を入力してください。
    
###### 特別な変数属性に関するコメント ERDDAP : : :

######  actual\\_range  {#actual_range} 
*    [ ** actual\\_range ** ](#actual_range) RECOMMENDED変数属性です。 例えば、

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* この属性は、 [CDCについて COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) そして、 [CF 1.7+の](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) メタデータ規格。
* 現時点では、変数の宛先データ型と同じデータ型の2つの値の配列であり、実際の値を指定する必要があります。 (理論的または許可されていない) その変数のデータの最小値と最大値。
* データが満載の場合 [ scale\\_factor および/または add\\_offset ](#scale_factor) , actual\\_range 未梱包の値と同じデータ型である必要があります。
* 一部のデータソース (例えば、すべてのEDDTableFrom... ファイルデータセット) , ERDDAP™ 決定する actual\\_range 各変数のセット actual\\_range 属性。 他のデータソースを使って (例えば、リレーショナルデータベース、Cassandra、 DAP パー, Hyrax ) 、それは範囲を計算するためにソースのために面倒なか、または面倒かもしれません ERDDAP™ リクエストしません。 この場合は、設定できるのなら最適です actual\\_range   (特に経度、緯度、高度、深さ、時間変数) 追加することで actual\\_range 各変数の属性 [&lt; addAttributes &gt;&gt; (#addattributes(アダットリブリュート)) このデータセットについて datasets.xml 例えば、

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* 数値について [時間と時刻変数](#time-units) 、指定された値は関連するソースでなければなりません (目的地なし) 数値値。 例えば、ソースタイムの値が「1985-01-01」から保存されると、 actual\\_range 1985-01-01以降は「日」で指定してください。 また、定期的に更新されるリアルタイムデータに対して、NOW を 2 番目の値として参照したい場合、NaN を使用する必要があります。 例えば、1985-01-17 のデータ範囲を NOW まで指定するには、

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* お問い合わせ actual\\_range 既知の (either によって) ERDDAP™ それを計算するか、またはあなたがそれを追加することによって&lt; addAttributes &gt;)、 ERDDAP™ データアクセスフォームでユーザーに表示します ( * datasetID * .html拡張子) グラフのWebページを作る ( * datasetID * .グラフ) FGDC および ISO 19115 メタデータを生成する際に、そのデータセットで使用します。 また、最後の7日間の時間 actual\\_range デフォルト時刻サブセットとして使用されます。
* お問い合わせ actual\\_range 既知の, ユーザーは使用することができます [ツイート () そして最高 () 関数](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) リクエストでは、非常に便利です。
* すべてのEDDTableのために...データセットは、 actual\\_range 知られている (またはそれを指定すると ERDDAP™ それを計算する) , ERDDAP™ 外部のデータへのリクエストを素早く拒否することができます。 たとえば、データセットの最小時間値が1985-01-17に相当する場合、1985-01-01から1985-01-16までの全てのデータのリクエストは、エラーメッセージ「マッチング結果が生成されないクエリ」で即座に拒否されます。 これは、 actual\\_range メタデータの非常に重要な部分は、保存できるため ERDDAP™ 多くの努力を払って、多くの時間を節約します。 そして、このハイライトは、 actual\\_range 値は、データの実際の範囲よりも狭くなりてはならない。そうしないと、 ERDDAP™ 誤って言うかもしれない 実際に関連データがある場合に「マッチングデータがない」。
* ユーザーがデータのサブセットを選択し、メタデータを含むファイルタイプを要求する場合 (例えば、 .nc ) , ERDDAP™ 変更する actual\\_range 応答ファイルでは、サブセットの範囲を反映します。
* 詳しくはこちら [ data\\_min そして、 data\\_max ](#data_min-and-data_max) , これは、指定する代替方法である actual\\_range お問い合わせ しかし、これらは今では非推奨である actual\\_range CF 1.7+ で定義します。
         
###### カラーバー属性{#color-bar-attributes} 
色のバーに提案されたデフォルト属性を指定するいくつかのオプション変数属性があります (データを画像の色に変換するために使用される) この変数の場合。
* 現時点では、この情報は、griddap および tabledap カラーバーを使用するイメージを要求する時はいつでも。
* たとえば、緯度経度格子データがマップのカバレッジとしてプロットされると、カラーバーはデータ値が色に換算する方法を指定します。
* これらの値を持つことで、 ERDDAP™ 時間やその他の寸法値が異なる場合でも、異なる要求間で一貫したカラーバーを使用する画像を作成する。
* これらの属性名は、 ERDDAP お問い合わせ メタデータ規格ではありません。
* カラーバーに関連する属性は次のとおりです。
    *    ** colorBarMinimum ** colorBarの最小値を指定します。 例えば、

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * データが満載の場合 [ scale\\_factor および/または add\\_offset ](#scale_factor) 、指定して下さい colorBarMinimum 未梱包値として。
    * より低いデータ値 colorBarMinimum 同じ色で表されます colorBarMinimum 値。
    * 属性は [タイプ="double"](#attributetype) データ変数の型に関係なく。
    * 値は通常、素敵なラウンド番号です。
    * ベストプラクティス: 最小限のデータ値よりも若干高い値をお勧めします。
    * デフォルト値はありません。
*    ** colorBarMaximum ** colorBarで最大値を指定します。 例えば、

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * データが満載の場合 [ scale\\_factor および/または add\\_offset ](#scale_factor) 、指定して下さい colorBarMinimum 未梱包値として。
    * データ値よりも高い colorBarMaximum 同じ色で表されます colorBarMaximum 値。
    * 属性は [タイプ="double"](#attributetype) データ変数の型に関係なく。
    * 値は通常、素敵なラウンド番号です。
    * ベストプラクティス: データの最大値よりも少し下がる値をお勧めします。
    * デフォルト値はありません。
*    **カラー バーパレット** colorBarのパレットを指定します。 例えば、
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * すべて ERDDAP™ これらの標準パレットをサポートするインストール: BlackBlueWhite、BlackRedWhite、BlackWhite、BlueWhiteRed、LightRainbow、OceanDepth、虹、RedWhiteBlue、逆虹、地理学Depth \\[ 追加された v1.74 \\] 、白黒、白黒、白黒。
    * インストール済みの場合 [追加パレット](/docs/server-admin/additional-information#palettes) それらのいずれかを参照することができます。
    * この属性が存在しない場合、デフォルトは\\-1\\*の場合BlueWhiteRedです。 colorBarMinimum パスワード colorBarMaximum ; それ以外の場合は、デフォルトは虹です。
*    **カラーバースケール** colorBarのスケールを指定します。 例えば、
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * 有効な値は、線形とログです。
    * 値がログの場合、 colorBarMinimum 0 以上でなければなりません。
    * この属性が存在しない場合、デフォルトは線形です。
*    **カラー バー連続** colorBarが色を連続したパレットを持っているか、colorBarがいくつかの離散色を持っているかどうかを指定します。 例えば、
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * 有効な値は、真と偽の文字列です。
    * この属性が存在しない場合、デフォルトはtrueです。
*    **カラーマンション** colorBarのセクションのデフォルト番号を指定します。 例えば、
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * 有効な値は正の整数です。
    * この属性が存在しない場合、デフォルトは\\-1です。 ERDDAP™ colorBarの範囲に基づいてセクションの数を選ぶ。
######  WMS  {#wms} 
変数のための主要な条件はによってアクセス可能であるために ERDDAP お問い合わせ WMS サーバは:
* データセットは、 EDDGrid データセット
* データ変数はグリッド変数である必要があります。
* データ変数は、経度と緯度軸変数を持つ必要があります。 (その他の軸変数はオプションです。) 
* -180 と 180 の間、いくつかの経度値がある必要があります。
* ザ・オブ・ザ・ colorBarMinimum そして、 colorBarMaximum 属性は必須です。 (その他のカラーバーの属性はオプションです。) 

######  data\\_min そして、 data\\_max  {#data_min-and-data_max} 
*    [ ** data\\_min ** そして、 ** data\\_max ** ](#data_min-and-data_max) お問い合わせ これらは、世界海洋循環実験で定義された非推奨変数属性です (ログイン) メタデータの記述。 例えば、

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * ご利用の際には、 [ actual\\_range ](#actual_range) の代わりに data\\_min そして、 data\\_max , ので actual\\_range CF仕様で定義されています。
    * 現時点では、変数の宛先データ型と同じデータ型であり、実際の値を指定する必要があります。 (理論的または許可されていない) その変数のデータの最小値と最大値。
    * データが満載の場合 [ scale\\_factor および/または add\\_offset ](#scale_factor) , data\\_min そして、 data\\_max 未梱包のデータ型を使用して、値をアンパックする必要があります。
         
###### 変数 drawLandMask  {#variable-drawlandmask} 
*    [ ** drawLandMask ** ](#variable-drawlandmask) お問い合わせ これは、使用した OPTIONAL 変数属性です。 ERDDAP™   (メタデータ規格なし) データセットの Make A Graph フォームの "Draw Land Mask" オプションのデフォルト値を指定します。 ( * datasetID * .グラフ) と、データのマップを要求する URL の &.land パラメーター。 例えば、
    ```
        <att name="drawLandMask">under</att>  
    ```
詳細はこちら [ drawLandMask プロフィール](#drawlandmask) お問い合わせ
###### エンコーディング{#encoding} 
*    [ **\\_エンコーディング** ](#encoding) 
    * この属性は String 変数でのみ使用できます。
    * この属性は強く推奨されます。
    * この属性は、 [ NetCDF ユーザーガイド (ログイン) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) お問い合わせ
    * 内部に ERDDAP™ 文字列は2バイトの文字のシーケンスで、 [Unicode UCS-2 文字セット](https://en.wikipedia.org/wiki/UTF-16) お問い合わせ
    * 多くのファイルタイプは、文字列内の1バイトの文字のみをサポートするため、この属性が必要で、関連する文字を識別します。
         [チャート (AKAコードページ) ](https://en.wikipedia.org/wiki/Code_page) UCS-2 文字セットおよび/またはエンコーディング システムから描画された 256 文字のセットに 256 個の可能な値をマッピングする方法を定義します。 [UTF-8の特長](https://en.wikipedia.org/wiki/UTF-8)   (1文字につき1バイトから4バイトまで) お問い合わせ
    * \\_Encoding の値は、ケースインセンティブです。
    * 理論では、 ERDDAP™ \\_Encoding の識別子をサポートできる [IANAリスト](https://www.iana.org/assignments/character-sets/character-sets.xhtml) 、しかし練習で、 ERDDAP™ 現在サポートしている
        * ISO-8859-1の特長 (アンダースコアではなくダッシュを持っていることに注意してください) ユニコードの最初の256文字と同一である利点がある、
        * UTF-8。
    * ソースファイルを読むとき、デフォルト値は、デフォルトはUTF-8であるnetcdf-4ファイルを除き、ISO-8859-1です。
    * これは、ISO-8859-1と異なるcharsetsやエンコーディングを使用している多くのソースファイルが、charsetやエンコーディングを識別しないため、継続的な面倒な問題です。 たとえば、多くのソースデータファイルには、Windows上でMicrosoft Wordからコピーして貼り付けられたメタデータがあり、ASCIIハイフンとアポストトロフィの代わりに、Windows固有のcharsetから派手なハイフンとアポストトロフィがあります。 これらの文字は、オッズ文字または'?' として表示されます。 ERDDAP お問い合わせ
         
###### ファイルAccessBaseUrl{#fileaccessbaseurl} 
*    ** [ファイルAccessBaseUrl](#fileaccessbaseurl) とファイルアクセスサフィックス** 任意の標準からない非常にまれに使用される属性です。 EDDTable 列に Web アクセス可能なファイルのファイル名がある場合 (たとえば、画像、ビデオ、またはオーディオファイル) 、加えることができます
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
ベース URL を指定する (終了 /) ファイル名を完全なURLにするために必要です。 カラムが.pngファイルを参照しているような異常なケースでは、値が ".png" に欠けているため、追加できます。
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(例えば、&lt;@fileAccessSuffixさんのツイート&lt;/a&gt;)
ファイル名を完全な URL にするために追加するサフィックスを指定します。 それから .htmlTable 応答, ERDDAP™ ファイル名はURL全体へのリンクとして表示されます。 (ベース ウルとファイル名とサフィックス) お問い合わせ

お問い合わせ ERDDAP™ 関連するファイルを提供するために、別のファイルを作る [EDDTableFromFileNames(ファイル名)](#eddtablefromfilenames) これらのファイルのデータセット (プライベートなデータセット) お問い合わせ
    
###### fileAccessアーカイブ ウルル{#fileaccessarchiveurl} 
*    [ **fileAccessアーカイブ ウルル** ](#fileaccessarchiveurl) 任意の標準からない非常にまれに使われた属性です。 EDDTable 列に Web アクセス可能なファイルのファイル名がある場合 (たとえば、画像、ビデオ、またはオーディオファイル) アーカイブからアクセス可能 (例: .zip ファイル) URL でアクセス可能、使用&lt;att name="fileAccessArchiveUrl"&gt; *ログイン* &lt;/att&gt; アーカイブのURLを指定します。
    
お問い合わせ ERDDAP™ アーカイブファイルを提供するには、別のファイルを作る [EDDTableFromFileNames(ファイル名)](#eddtablefromfilenames) そのファイルのデータセット (プライベートなデータセット) お問い合わせ
    
######  ioos\\_category  {#ioos_category} 
*    [ ** ioos\\_category ** ](#ioos_category) お問い合わせ これはREQUIRED変数属性です。&lt;変数MustHaveIoosCategory&gt;はtrueに設定されます (デフォルト) お問い合わせ [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) ; そうでなければ、それは最適です。
例えば、&lt;att 名称 ioos\\_category "&gt;サリニティ&lt;/att&gt;
カテゴリは [ NOAA 「統合オーシャン観測システム」 (ログイン) ](https://ioos.noaa.gov/) お問い合わせ
    
    *    (このように書いているように) これらの名前の正式な定義は認識していません。
    * コア名は、Zdenka Willisの.ppt「統合オーシャン観測システム」から (ログイン)   NOAA 「初期の運用能力の構築」と「 [米国IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)   (ページ 1-5) お問い合わせ
    * 今後このリストが変更される可能性があります。 リクエストがあれば、Chrisにメールを送ってください。 noaaa.govのジョン
    *    ERDDAP™ IOOSよりもカテゴリのより大きなリストをサポートしているため、Bob Simonsは追加の名前を追加 (主に科学分野の名前に基づいており、例えば生物学、生態学、気象学、統計、分類) その他のデータの種類
    * 現在の有効な値 ERDDAP™ 浴場、生物学、底文字、CO2、着色された分解された有機性無秩序、汚染物質、分解された栄養素、分解されたO2、生態学、魚の豊富さ、魚の種、熱変化、水力学、氷の配分、Identifier、場所、Meteorology、洋色、光学特性、他、病原体、PhytoplanktonのSpecies、圧力、生産性、Salconsinityの質、Surfaceinityの合計は、温度、検測光線、風速計、風速計、風速計、
    * 異なる用語間の重複と曖昧性があります - あなたの最善を尽くします。
    * 追加する ioos\\_category 一覧へ&lt; categoryAttributes ツイート お問い合わせ ERDDAP お問い合わせ [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) ファイル、ユーザーは簡単に同様のデータセットを経由して見つけることができます ERDDAP 's ホームページの「カテゴリによるデータセットの検索」。
         [試してみる ioos\\_category 関心のあるデータセットを検索します。](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * そこにあった [ディスカッション ERDDAP™ そして、 ioos\\_category お問い合わせ ERDDAP™ Googleグループ](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w) 
    
設定する予定&lt;変数MustHaveIoosCategory&gt; を false にすることで、この属性は必須ではありません。 (「Pfft&#33;」 お問い合わせ) 何らかの理由でそれを真に置く (デフォルト) そして使用して下さい ioos\\_category は:
    
    * setup.xml の場合&lt;変数MustHaveIoosCategory&gt; 真にセットされる、 [生成データセットXml](#generatedatasetsxml) 常に作成/提案する ioos\\_category 各新しいデータセット内の各変数の属性。 それでは、どうしてもそれを残すのか?
    *    ERDDAP™ カテゴリで関心のあるデータセットを検索できます。 ioos\\_category ioos\\_categories がとても便利な検索カテゴリです。 (例えば、温度) かなり広いです。 これは、 ioos\\_category この目的よりもはるかに優れています。例えば、より細かいCF standard\\_name ツイート (これは、例えば、すべての同義語とわずかなバリエーションのために、この目的のためにそれほど良いものではありません。 海\\_water\\_温度) お問い合わせ
(使い方) ioos\\_category この目的のために制御されます&lt; categoryAttributes &gt; setup.xml ファイルで。
         [試してみる ioos\\_category 関心のあるデータセットを検索します。](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * これらのカテゴリから [ NOAA 「統合オーシャン観測システム」 (ログイン) ](https://ioos.noaa.gov/) お問い合わせ これらのカテゴリはIOOSの使命のIOOSの記述に根本的です。 お問い合わせ NOAA 、サポート ioos\\_category 良いです ワン NOAA お問い合わせ (これを見る [ワンポイント NOAA ビデオ](https://www.youtube.com/watch?v=nBnCsMYm2yQ) インスピレーションに満ちた&#33;) 他の米国または国際機関、または政府機関と連携したり、他の一部のOcean Observing Systemと連携している場合、米国IOOSオフィスと連携するのは良い考えではありませんか?
    * しばらくお待ちください。 ERDDAP™ データセットへのリンク [ EDDGrid Erddapから](#eddfromerddap) そして、 [EDDTableFromErddapの特長](#eddfromerddap) お問い合わせ その他の場合 ERDDAP™ お問い合わせ ioos\\_category データセットには、 ioos\\_category お問い合わせ EDDGrid FromErddap と EDDTableFromErddap が機能します。
    * 心理的にはるかに簡単です。 ioos\\_category データセットを作成するとき (もうひとつのことです。 ERDDAP™ データセットを追加する ERDDAP ) 事実の後でそれを加えるためより (これから使うことに決めたら) お問い合わせ
         
######  long\\_name  {#long_name} 
*    [ ** long\\_name ** ](#long_name)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) そして、 [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) RECOMMENDED 変数属性は ERDDAP お問い合わせ 例えば、
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *    ERDDAP™ 利用する long\\_name グラフ上の軸をラベル付けするため。
    * ベストプラクティス: 言葉を込める long\\_name タイトルだったら (最初の単語とすべての非粒子語を大文字化) お問い合わせ ユニットを含まない long\\_name お問い合わせ 長い名前はそれほど長くはいけません(通常&lt;20文字)、しかしより記述的であるべき [ destinationName ](#destinationname) 、それは頻繁に非常に簡潔です。
    * もし " long\\_name " は変数で定義されていない [ソース属性](#variable-addattributes) または&lt; addAttributes &gt;, ERDDAP™ クリーンアップすることで生成します [ standard\\_name ](#standard_name)   (プレゼント) または destinationName お問い合わせ
         
######  missing\\_value  {#missing_value} 
*    [ ** missing\\_value ** ](#missing_value) そして、 **\\_料金 バリュー**   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) そして、 [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) 数値を記述する変数属性 (例: -9999) 不足している値を表すために使用されます。 例えば、

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

文字列変数の場合、両方のデフォルトは "" (空の文字列) お問い合わせ
数値変数の場合、両方のデフォルトはNaNです。
*    ERDDAP™ 両方のサポート missing\\_value と \\_FillValue は、データソースが若干異なる意味を割り当てているためです。
* 現時点では、変数と同じデータ型でなければなりません。
* データが満載の場合 [ scale\\_factor および/または add\\_offset ](#scale_factor) , , missing\\_value \\_FillValue の値は同様にパックされます。 同様に、ローカルを使用する文字列の日付/時刻値を持つ列の場合 [ time\\_zone ](#time_zone) , , missing\\_value \\_FillValue はローカルタイムゾーンを使用する必要があります。
* 変数がこれらの特別な値を使う場合、 missing\\_value \\_FillValue 属性は必須です。
* お問い合わせ [時間と時刻変数](#time-units)   (ソースが文字列か数値であるかどうか) , missing\\_value s と \\_FillValues は "" と表示されます。 (空の文字列) 時刻が文字列として書かれ、時刻が2倍に書かれている場合はNaNと書かれます。 ソースの値 missing\\_value \\_FillValue は変数のメタデータには表示されません。
* 文字列変数の場合、 ERDDAP™ 常に任意の変換 missing\\_value s または \\_FillValue のデータ値が "" に (空の文字列) お問い合わせ ソースの値 missing\\_value \\_FillValue は変数のメタデータには表示されません。
* 数値変数の場合:
ザ・オブ・ザ・ missing\\_value 変数のメタデータに \\_FillValue が出現します。
一部の出力データフォーマットでは、 ERDDAP™ これらの特別な数字は、たとえば、 -9999 が表示されます。
その他の出力データフォーマット (特に .csv のようなテキストのようなフォーマット .htmlTable ) , ERDDAP™ これらの特別な数字をNaNまたは"に置き換えます。
* 一部のデータタイプには、明示的に識別される必要がない固有の欠落した値マーカーがあります missing\\_value または \\_FillValue 属性: float と double 変数は NaN を持っています (数値ではない) , 文字列の値が空の文字列を使用し、char の値が文字を持っている \\uffff   (文字 #65535, 文字ではなくUnicode の値です) お問い合わせ 整数型データ型には、未入力の値マーカーはありません。
* 整数変数に欠落した値がある場合 (例えば、.csv ファイルの空のポジション) , ERDDAP™ 定義された値として値を解釈します missing\\_value またはその変数の \\_FillValue を指定します。 何も定義されていない場合、 ERDDAP™ 値は、そのデータ型で保持できる最大値のデフォルト欠落値として解釈されます。
127 バイト変数の, 32767 ショート, 2147483647 int, 9223372036847755807 長く、
ubyte、ushort、uintのための4294967295、およびulongのための18446744073709551615のための65535のための255。
######  ADD \\_FillValue ATTRIBUTES お問い合わせ{#add-_fillvalue-attributes} 
*    [ ADD \\_FillValue ATTRIBUTES お問い合わせ](#add-_fillvalue-attributes)   
それぞれの時間 ERDDAP™ データセットをロードし、整数ソースのデータ型で変数が定義されているかどうかを確認します。 missing\\_value または \\_FillValue 属性。 変数がない場合は、 ERDDAP™ ログファイルにメッセージを出力する ("Add \\_FillValue Attribute?" から始まる) 推奨する ERDDAP™ 管理者は \\_Fill を追加 この変数の value 属性 datasets.xml お問い合わせ \\_FillValue または missing\\_value 行方不明の値は常に可能であるため、例えば、データセットに与えられたファイルが与えられた変数を持たない場合、 ERDDAP™ 変数が、その変数にすべての欠落した値を持つように変数を提示できるようにする必要があります。 変数が \\_FillValue 属性を持たない場合、追加できます。
    &lt;att 名="\\_FillValue"&gt;null&lt;/att&gt; ではなく、そのメッセージを抑制します。 datasetID 未来の+variable組合せ。
    
それぞれの時間 ERDDAP™ 起動し、ログファイルに書かれているメッセージにそれらのすべての推奨事項を収集します。 (" から始まる" ADD \\_FillValue ATTRIBUTES お問い合わせ) 、電子メールを ERDDAP™ 管理者、CSVデータファイルに書き込む \\[ bigParentディレクトリ \\] /logs/ディレクトリ。 必要に応じて、GenerateDatasetsXmlプログラムを使用できます (AddFillValueAttributes オプション) CSV ファイルにすべての提案を適用する datasets.xml ファイル。 どんなものでも datasetID 属性を追加する必要がない場合、そのファイルの /variable の組み合わせは、属性を変更できます&lt;att 名="\\_FillValue"&gt;null&lt;/att&gt; 推奨事項を抑制する datasetID 未来の+variable組合せ。
    
重要&#33;
ボブがよく言ったように:悪くない (恥ずかしい) 地球温暖化の証拠のいくつかがデータの未知の欠如値によって引き起こされる場合 (例:99 または 127 度\\_ の温度値 不足している値としてマークされているべきCは、したがって、平均および/または中央の統計値が高まっている) お問い合わせ

* \\_FillValue と missing\\_value 異なるソースファイルで指定された変数の値が一貫している必要があります。そうしないと、 ERDDAP™ 値の1セットでファイルを受け入れ、他のすべてのファイルを「Bad Files」として拒否します。 問題を解決するため、
    * ファイルがグリッドされている場合 .nc ファイル、使用することができます [ EDDGrid FromNcFiles解凍](#eddgridfromncfilesunpacked) お問い合わせ
    * ファイルが表形式のデータファイルの場合、EDDTableFrom...Files を使うことができます。 お問い合わせ [標準化 新着情報](#standardizewhat) お問い合わせ ERDDAP ソースファイルを読み込まれているように標準化する ERDDAP お問い合わせ
    * 難しい問題は、 [ログイン](#ncml-files) または [ NCO ](#netcdf-operators-nco) 問題を解決するため。
             
######  scale\\_factor  {#scale_factor} 
*    [ ** scale\\_factor ** ](#scale_factor)   (デフォルト = 1) そして、 ** add\\_offset **   (デフォルト = 0)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) そして、 [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) シンプルな変換で、データ型に詰め込まれたデータを記述するオプション変数属性です。
    * 現時点では、データ型はソースデータ型と異なるため、宛先値のデータ型を記述します。
たとえば、データソースは、短いインッツとしてパックされた1つの小数桁でフロートデータ値を保存している可能性があります。 (インサート16) , 使用 scale\\_factor = 0.1 および add\\_offset = 0. 例えば、

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

この例では、 ERDDAP™ データをアンパックし、フロートデータ値としてユーザーに提示します。
    * プレゼントの場合 ERDDAP™ これらの属性から値を抽出し、属性を削除し、自動的にユーザーのデータをアンパックします。
アクセス 値 = ソース 値 \\* scale\\_factor + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + add\\_offset   
または、別の方法で述べた:
unpackedValue = パック 値 \\* scale\\_factor + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + add\\_offset 
    * ザ・オブ・ザ・ scale\\_factor そして、 add\\_offset 異なるソースファイルで指定された変数の値が一貫している必要があります。そうしないと、 ERDDAP™ 値の1セットでファイルを受け入れ、他のすべてのファイルを「Bad Files」として拒否します。 問題を解決するため、
        * ファイルがグリッドされている場合 .nc ファイル、使用することができます [ EDDGrid FromNcFiles解凍](#eddgridfromncfilesunpacked) お問い合わせ
        * ファイルが表形式のデータファイルの場合、EDDTableFrom...Files を使うことができます。 お問い合わせ [標準化 新着情報](#standardizewhat) お問い合わせ ERDDAP ソースファイルを読み込まれているように標準化する ERDDAP お問い合わせ
        * 難しい問題は、 [ログイン](#ncml-files) または [ NCO ](#netcdf-operators-nco) 問題を解決するため。
             
######  standard\\_name  {#standard_name} 
*    [ ** standard\\_name ** ](#standard_name)   (お問い合わせ [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) メタデータ規格) RECOMMENDED 変数属性は ERDDAP お問い合わせ CFは許可されたリストを維持します [CF標準名](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) お問い合わせ 例えば、
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * 追加する standard\\_name 変数の属性に、追加 standard\\_name 一覧へ&lt; categoryAttributes ツイート お問い合わせ ERDDAP お問い合わせ [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) ファイル、ユーザーは簡単に同様のデータセットを経由して見つけることができます ERDDAP 's ホームページの「カテゴリによるデータセットの検索」。
    * CFを指定すると standard\\_name 変数の場合、変数のユニット属性は、CF標準名テーブルの標準名で指定されたキャニカルユニットと同一である必要はありませんが、ユニットはキャニカルユニットに換算する必要があります。 例えば、すべての温度関連のCF standard\\_name s は "K" を持っています (ケルビン) キャノン単位として。 従って温度関連の変数 standard\\_name K、度\\_C、度\\_F、またはそれらの名前のUDUnitsのバリアントのユニットは、それらはすべて相互変換可能であるためです。
    * ベストプラクティス: 力の部分 [制御された語彙](https://en.wikipedia.org/wiki/Controlled_vocabulary) リスト内の条件だけを使っています。 そのため、管理された語彙で定義されている用語に固執することをお勧めし、リストに適切なものがない場合には、用語を上げることをお勧めします。 追加条件が必要な場合は、標準委員会が管理された語彙に追加するかどうかを確認してください。
    *    standard\\_name 値は、ケースの機密である唯一のCF属性値です。 それらは常にすべての小文字です。 はじめに ERDDAP™ v1.82,GenerateDatasetは、大文字を小文字に変換し、文字を小文字に変換します。 データセットが読み込まれるとき ERDDAP 、大文字は文字を小文字に静かに変更します。
         
######  time\\_precision  {#time_precision} 
*    time\\_precision によって使用される OPTIONAL 属性です ERDDAP™   (メタデータ規格なし) お問い合わせ [時間と時刻変数](#time-units) , グリッドされたデータセットや表形式のデータセットにすることができます。 axisVariable s または dataVariable お問い合わせ 例えば、
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
     time\\_precision いつでも使用する精度を指定する ERDDAP™ Webページの文字列としてその変数から時刻値をフォーマットします。 .htmlTable 応答。 ファイル形式 ERDDAP™ 文字列としてフォーマット時刻 (例えば、.csv と .json ) , ERDDAP™ 使用のみ time\\_precision -僅か秒を含む場合指定フォーマット;そうでなければ、 ERDDAP™ 1970-01-01T00:00:00 を使用する Zのフォーマット。
* 有効な価値は 1970-01、1970-01-01-01T00Z、1970-01-01-01T00:00Z、1970-01T00:00:00Zです (デフォルト) 1970-01-01T00:00:00.0Z、1970-01-01T00:00:00:00.00Z、1970-01-01T00:00:00.000Z。 \\[ 1970年は単数なのでオプションではありません。 ERDDAP™ 整形された時間文字列であるかどうかは分かりません (年間行事) 1970-01-01T00:00:00Z 以降、または数秒数の秒数です。 \\] 
* お問い合わせ time\\_precision 値が一致しないか、デフォルト値が使用されます。
* ここに、他の部分のように ERDDAP™ 、表示されていないフォーマットされた時刻の任意のフィールドは、最小値を持つと仮定されます。 例えば、1985-07、1985-07-01、1985-07-01T00Z、1985-07-01T00:00Z、1985-07-01T00:00:00 Zは、精度の異なるレベルにもかかわらず、すべての同等と見なされます。 これはマッチします [ISO 8601の:2004年 "extended" タイム フォーマットの指定](https://www.iso.org/iso/date_and_time_format) お問い合わせ
*    **警告:** 限られただけを使用する必要があります time\\_precision お問い合わせ **すべて** 変数のデータ値の値は、隠されているすべてのフィールドの最小値のみです。
    * 例えば、 time\\_precision 1970-01-01 すべてのデータ値が1時間=0、分=0、秒=0の場合 (例えば2005-03-04T00:00:00Zおよび2005-03-05T00:00:00Z) お問い合わせ
    * 例えば、使用しない time\\_precision 1970-01-01 値が0時間、分、秒以外の値がある場合 (例えば、2005-03-05T12:00:00Z) デフォルトでない時間値が表示されないため。 それ以外の場合、ユーザーがtime=2005-03-05のすべてのデータを求める場合、要求は予期しないで失敗します。
             
######  time\\_zone  {#time_zone} 
*    [ ** time\\_zone ** ](#time_zone) 
    *    time\\_zone によって使用される OPTIONAL 属性です ERDDAP™   (メタデータ規格なし) お問い合わせ [時間と時刻変数](#time-units) , グリッドされたデータセットや表形式のデータセットにすることができます。.
    * デフォルトは " Zulu ツイート (GMTのモダンなタイムゾーンバージョン) お問い合わせ
    * 背景情報:「タイムオフセット」 (例:太平洋標準時間、-08:00、GMT-8) 固定、特定の、相対的なオフセット Zulu   (GMTの) お問い合わせ 対照的に、「タイムゾーン」は、日光節約の影響を受けているはるかに複雑なことです (例:「米国・太平洋」) 異なる場所で異なるルールがあった。 タイムゾーンは、単純なオフセット値で要約できないため、常に名前を持っています (表の「TZデータベース名」列を参照 [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) お問い合わせ ERDDAP お問い合わせ time\\_zone 属性は、いくつかのタイムゾーンからローカルタイムデータを扱うのに役立ちます (例:1987-03-25T17:32:05 パシフィック タイムタイム) お問い合わせ 文字列または数値時間データがある場合 (固定式) 時間オフセットは、単にデータを調整する Zulu   (これは、 ERDDAP™ お問い合わせ) unit 属性の異なるベース時間を指定する (例:「1970-01-01T08:00:00Zからの時間」、時刻オフセットを指定するT08に注意) 、そしてあなたが望む結果を得るために結果を常に点検して下さい。
    * 文字列からソースデータを持つタイムスタンプ変数の場合、この属性は、リードするタイムゾーンを指定できます。 ERDDAP™ ローカルタイムゾーンのソース時間を変換する (標準的な時間、日光のセービングの時間である) お問い合わせ Zulu タイムタイム (常に標準時間) お問い合わせ 有効なタイムゾーン名のリストは、TZ 列の一覧とおそらく同一です [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) お問い合わせ 一般的な米国タイムゾーン:米国/ハワイ、米国/アラスカ、米国/太平洋、米国/マレーシア、米国/アリゾナ州、米国/中央、米国/東部。
    * 数値ソースデータのタイムスタンプ変数の場合、" time\\_zone " 属性, しかし、値は " Zulu または「UTC」。 他のタイムゾーンのサポートが必要な場合は、Chrisにメールをお送りください。 noaaa.gov のジョン。
         
###### レガシー_time_adjust{#legacy_time_adjust} 
*    [ **レガシー_time_adjust** ](#legacy_time_adjust) はじめに ERDDAP™ 2.29.0、時間変数は若干異なります。 まれに、使用するとき最も可能性が高い `今日から` 1582年以前の (お問い合わせ `0000-01-01以来の日` または `1-1-1 00:00:0.0 以降` ) 日付変数への調整を記述する必要があります。 この理由は ERDDAP™ java.timeライブラリを使用して、内部で日付を管理します。 古い GregorianCalendar ライブラリを使用して正しい日付をキャッシュするために必要なデータセットがあります。

```
<axisVariable>
    <sourceName>time</sourceName>
    <destinationName>time</destinationName>
    <!-- sourceAttributes>
        ... removed several lines ...
        <att name="units">days since 1-1-1 00:00:0.0</att>
    </sourceAttributes -->
    <addAttributes>
        ... removed several lines ...
        <att name="legacy_time_adjust">true</att>
    </addAttributes>
</axisVariable>
```

###### ユニット{#units} 
*    [ **ユニット** ](#units)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) そして、 [パスワード](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) メタデータ規格) データ値の単位を定義します。 例えば、
    ```
        <att name="units">degree\\_C</att>
    ```
    * "units" は sourceAttribute か addAttribute のどちらかとして要求されます "time" 変数は適度に適度に他の変数のために推薦されます (それはほとんど常にあります) お問い合わせ
    * 一般的にはおすすめです [UDユニット](https://www.unidata.ucar.edu/software/udunits/) \\ 互換単位で必要な単位 [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) そして、 [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) 規格。
    * 別の共通の標準はあります [カリキュラム](https://unitsofmeasure.org/ucum.html) -- 測定の単位のための統一されたコード。 [ OGC ](https://www.ogc.org/) サービス等 [ SOS ](https://www.ogc.org/standards/sos) , [ WCS ](https://www.ogc.org/standards/wcs) と [ WMS ](https://www.ogc.org/standards/wms) UOMとしてUCUMを要求し、しばしばUCUMを参照する (測定の単位) お問い合わせ
    * すべてのデータセットに1つのユニット規格を使用することをお勧めします ERDDAP お問い合わせ お問い合わせ ERDDAP™ あなたが使用している標準&lt;unit\\_standard&gt; は、 [セットアップ。xml](/docs/server-admin/deploy-install#setupxml) ファイル。
    * 異なるソースファイルで指定された変数のユニットは、一貫性が必要です。 ファイルの1つのサブセットが異なる単位値を使用するデータファイルのコレクションを持っている場合(例えば、
「1985-01-01」から「2000-01-01」まで、
"degree\\_Celsius" 対 "deg\\_C", または
"knots" と "m/s") は、単位の値の標準化方法を見つける必要があります。そうしないと、 ERDDAP™ ファイルのサブセットのみをロードします。 それについて考える: 1つのファイルがwindSpeed unit=knotsと別のファイルがwindSpeed unit=m/sを持っている場合は、2つのファイルからの値が同じ集計されたデータセットに含まれているべきではありません。
        * ファイルがグリッドされている場合 .nc ファイル、多くの状況で使用できる [ EDDGrid FromNcFiles解凍](#eddgridfromncfilesunpacked) お問い合わせ
        * ファイルが表形式のデータファイルの場合、多くの場合、EDDTableFrom...Filesを使うことができます。 お問い合わせ [標準化 新着情報](#standardizewhat) お問い合わせ ERDDAP ソースファイルを読み込まれているように標準化する ERDDAP お問い合わせ
        * 難しい問題は、 [ログイン](#ncml-files) または [ NCO ](#netcdf-operators-nco) 問題を解決するため。
    * CF の標準的なセクション 8.1 は変数のデータがによって詰められると言います [ scale\\_factor および/または add\\_offset ](#scale_factor) 「変数の単位は、パッケージされていないデータの代表的であるべきです。」
    *    [時間変数およびタイムスタンプ変数のため、](#time-units) 変数のどちらか [ソース属性](#variable-addattributes) または&lt; addAttributes ツイート (優先する) お問い合わせ [ユニット](#units) いずれか
        
        * 時間軸変数や時間データ変数の数値データ: [UDユニット](https://www.unidata.ucar.edu/software/udunits/) \\ 互換文字列 (フォーマットを使って *ユニット* お問い合わせ *ベースタイム* ) ソースタイム値を解釈する方法を説明する (例えば、1970-01-01T00:00:00Z以来の秒) お問い合わせ
            
         *ユニット* 以下のいずれかのいずれかのことができます。
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
技術的に、 ERDDAP™ 従わない UDUNITS 変換するときの標準 "years since" そして、 "months since" 時間値に "seconds since" お問い合わせ ザ・オブ・ザ・ UDUNITS 標準は固定された単一の価値として年を定義します: 3.15569259747e7秒。 そして UDUNITS 月を年12月に定義します。 残念ながら、私たちが使用していると見てきたほとんどのデータセット "years since" または "months since" カレンダーの年月や暦月になる値を明確に意図します。 例えば、3 "months since 1970-01-01" 通常は1970-04-01を意味するように意図されています。 お問い合わせ ERDDAP™ 通訳 "years since" そして、 "months since" カレンダーの年月として、厳密に従わない UDUNITS 標準。
            
ザ・オブ・ザ・ *ベースタイム* ISO 8601:2004認証取得 (Eメール) フォーマットされた日付時刻の文字列 ( yyyy-MM-dd 'T'H:mm:ssZ、例えば、1970-01-01T00:00:00Z) 、またはそのいくつかのバリエーション (例えば、端に欠けている部分) お問い合わせ ERDDAP™ 「1970-1-1 0:0:0」など、その理想的なフォーマットのバリエーションの広い範囲で動作するようにしました。 タイムゾーン情報が見つからない場合、 Zulu タイムゾーン (アカGMT) お問い合わせ 別の時刻オフセットを指定しても、 ERDDAP™ 日光保存時間を使用しないでください。 baseTime が他のフォーマットを使用している場合は、&lt; addAttributes &gt; ISO 8601:2004のバリエーションを使用する新しい単位の文字列を指定する (Eメール) フォーマット(例:1985年1月1日から1985年1月1日から1985年1月1日までに変更日)
        
テストできます ERDDAP 's の特定に対処する能力 *ユニット* お問い合わせ *ベースタイム* お問い合わせ ERDDAP お問い合わせ [時間コンバーター](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) お問い合わせ うまくいけば、番号を差し込むことができます (データソースから最初の時間値?) 単位の文字列、変換をクリックし、 ERDDAP™ ISO 8601:2004にそれを変換することができる (Eメール) フォーマットされた日付時刻文字列。 単位の文字列が認識できないと、コンバータはエラーメッセージを返します。

###### 文字列の時間単位{#string-time-units} 
*    [文字列データでタイムまたはタイムスタンプのデータ変数のユニット属性の場合、](#string-time-units) あなたが指定しなければなりません [java.time.DateTimeFormatter の使い方](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) パターン (主に java.text と互換性があります。 シンプルな日付フォーム) 文字列の時刻を解釈する方法について説明します。
    
ISO 8601:2004のバリエーションである一般的な時間フォーマット (Eメール) 標準フォーマット (例: 2018-01-02T00:00:00Z) のバリエーションを指定できます。 yyyy-MM-dd 'T'H:mm:ssZ, たとえば、 yyyy-MM-dd 文字列が日付のみである場合。 yyy-M で始まる形式は、 ERDDAP フォーマットのマイナーなバリエーションを非常に許す特別なパーサを使用します。 パーサは、'Z'、"UTC"、"GMT"、±XX:XX、±XXXX、および±XXフォーマットの形式でタイムゾーンを扱うことができます。 日付時刻の部分が指定されていない場合 (例えば、分と秒) , ERDDAP™ そのフィールドの最も低い値を想定 (例えば、秒が指定されていない場合、秒=0 は想定されます。) お問い合わせ
    
他のすべての文字列時間フォーマットでは、DateTimeFormatter 互換のタイムフォーマット文字列を正確に指定する必要があります。 お問い合わせ yyyy-MM-dd 'T'H:mm:sZ は、これらの形式の文字列は、時刻文字列から特定の種類の情報を特定する文字から作成されます。例えば、m は分時間を意味します。 フォーマットの文字を数回繰り返すと、例えば、m は任意の数字で値を指定することができることを意味します。mm は 2 桁で値を指定しなければならないことを意味します。 ザ・オブ・ザ・ Java DateTimeFormatter のドキュメントは粗大な概要であり、これらの詳細をクリアしません。 そのため、キャラクターのバリエーションや意味の一覧がここにあります。 ERDDAP™   (時々若干異なる Java 'DateTimeFormatter's は、) : : :
    
     | キャラクター | 事例紹介 | 意味する | 
     | お問い合わせ | お問い合わせ | お問い合わせ | 
     | u, y, Y | \\-4712, 0, 1, 10, 100, 2018 | 年番号、数字の任意の数。 ERDDAP™ 治療 y (イヤーオブジェ) と Y (週間ベースの年, これは、多くの場合、y ではなく誤って使用されているので、) u として、 [占星術年番号](https://en.wikipedia.org/wiki/Astronomical_year_numbering) お問い合わせ 占星術年は、BCEを使用しない正または負の整数です (アメリカ) またはセリウム (インフォメーション) 時代の設計者: 2018=2018CE、...、2=2CE、1=1CE、0=1BCE、-1=2BCE、-2=3BCE、... | 
     | uuuuuuuuuu, yyy, お問い合わせ | \\-4712、0000、0001、0010、0100、2018 | 4桁の天文学年番号 (前の「-」を無視する)   | 
     | ツイート | 1、01、12 | 月数、数字の任意の数 (1=1月)   | 
     | MMの | 01月12日 | 2桁 (パッドなし) 月数 | 
     | MMMの | 1月, ヤン, ヤン, JAN | a 3 手紙 英語 月 名, 症例 | 
     | MMMMの | Jan, jan, JAN, 1月, ジャヌーリー, JANUARY | 3文字または完全な英語の月名、場合の無感覚 | 
     | ログイン | 1、01、31 | 月間番号、数字の任意の数 | 
     | ログイン | 01月31日 | 2桁 (パッドなし) 毎月1日 'digit' はスペースです。 | 
     | ダイバーシティ | 1、001、366 | 日数、任意の数字、001=Jan 1 | 
     | DDDについて | 001, 366 | 1年3桁、001=Jan 1 | 
     | お問い合わせ | thu, THU, 木 | 3 文字の日の週、値を解析するときは無視します | 
     | お問い合わせ | thu, THU, Thu, thursday, THURSDAY, 木曜日 | 3文字またはフルイングリッシュデーオブウィーク、ケースインセンティブ、パース時に値が無視されます | 
     | フリガナ | 0, 00, 23 | 一日中 (0-23から) 、数字の任意の数 | 
     | ログイン | 00、23 | 1日のHH時間 (2018年8月23日) 2桁 'digit' はスペースです。 | 
     | は、 | 午前、午後、午後 | AM または PM の場合の無感覚 | 
     | ログイン | 12、01、11 | 時計 - 時間 - 時 - 時 (12月1日、2日... 11) 、数字の任意の数 | 
     | ログイン | 12、01、11 | 時計 - 時間 - 時 - 時 (12月1日、2日... 11) 2桁 'digit' はスペースです。 | 
     | ログイン | 0、11 | 午前-午後 (0, 1, ...11) 、数字の任意の数 | 
     | 代表取締役 | 00、01、11 | 毎時～午後2桁 | 
     | m 点 | 0、00、59 | 最小時間、任意の数字 | 
     | ミリメートル | 00、59 | 最小時間、2桁 | 
     | ツイート | 0、00、59 | 秒単位、任意の数字 | 
     | ログイン | 00、59 | 2桁、2桁 | 
     | ツイート | 0、000、9、999 | fraction-of-secondは、小数点、数字の任意の数に従うように、 | 
     | ステンレス | 00,99,99 | 100秒、2桁 | 
     | SSSシリーズ | 000、999 | 秒数, 3桁 | 
     | ツイート | 0、0000、86399999 | 一日のミリ秒数、任意の数字 | 
     | AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA | 〒86399999 沖縄県うるま市字栄野比1212-1 | ミリ秒単位、8桁 | 
     | ネクタイ | 0、0000000000000000000、8639999999 | nanosecond-of-day、任意の数字。 インスタグラム ERDDAP™ , これはnMillisにtuncated. | 
     | NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN | ファックス: 86-755-335 | nanosecond-of-day、14桁。 インスタグラム ERDDAP™ これはnMillisにtuncated. | 
     | ログイン | 0, 00000000000, 5999999 | ナノ秒単位、任意の数字。 インスタグラム ERDDAP™ これはnMillisにtuncated. | 
     | ログイン | Publish Date:2017-05-01TSFM:MS皮鞋 X 千代洋服,紳裝入門提案 | ナノ秒単位、11桁。 インスタグラム ERDDAP™ これはnMillisにtuncated. | 
     | XXX、ZZZの | Z、-08:00、+01:00 | フォーマット 'Z' または ± のタイムゾーン (2桁の時間のオフセット) : : : (2桁分のオフセット) お問い合わせ このお菓子 *スペース* + として (非標準) お問い合わせ 'Z' をサポートしている ZZZ は標準外ですが、一般的なユーザエラーを扱います。 | 
     | XXのZZ | 電話番号: +0100 | フォーマット 'Z' または ± のタイムゾーン (2桁の時間のオフセット) : : : (2桁分のオフセット) お問い合わせ このお菓子 *スペース* + として (非標準) お問い合わせ ZZ は 'Z' をサポートしていませんが、一般的なユーザー エラーを扱います。 | 
     | X、Z | Z、-08、+01 | フォーマット 'Z' または ± のタイムゾーン (2桁の時間のオフセット) : : : (2桁分のオフセット) お問い合わせ このお菓子 *スペース* + として (非標準) お問い合わせ 'Z' をサポートしている Z は標準外ですが、一般的なユーザエラーを扱います。 | 
     | xxxxxx | \\08:00, +01:00 | フォーマットのタイムゾーン ± (2桁の時間のオフセット) : : : (2桁分のオフセット) お問い合わせ このお菓子 *スペース* + として (非標準) お問い合わせ | 
     | ログイン | \\-0800、+0100 | フォーマットのタイムゾーン ± (2桁の時間のオフセット)  (2桁分のオフセット) お問い合わせ このお菓子 *スペース* + として (非標準) お問い合わせ | 
     | ツイート | \\-08, +01 | フォーマットのタイムゾーン ± (2桁の時間のオフセット) お問い合わせ このお菓子 *スペース* + として (非標準) お問い合わせ | 
     | お問い合わせ | 'T'、'Z'、'GMT' | 一連のリテラル文字の開始と終了 | 
     | お問い合わせ お問い合わせ (2つの単一の引用符)   | お問い合わせ お問い合わせ | 2つのシングルクォートは、リテラルシングルクォートを示す | 
     |   \\[  \\]   |   \\[   \\]   | スタート (ツイート \\[ ツイート) そして終わり (ツイート \\] ツイート) オプションのセクション。 この表記は、文字文字と形式文字列の最後にのみサポートされています。 | 
     | #, &#123;, &#125; | #, &#123;, &#125; | 未来の用途に | 
     | G、L、Q、e、c、V、z、O、p |       | これらの書式文字は、 Java 'DateTimeFormatter, しかし、現在サポートされていません ERDDAP お問い合わせ 必要に応じて、Chrisにメールを送る必要があります。 noaaa.gov のジョン。 | 
    
注意:
    
    * punctuation の日付時刻では、数値は数字の可変数を持つ場合があります。 (例えば、米国スラッシュ日付フォーマット「1/2/1985」では、月と日付は1桁または2桁である) フォーマットは1文字のトークンを使用する必要があります。例えば、月と日付の任意の数字を受け入れるM/d/yyなど。
    * アイテムの数字が定数である場合、例: 01/02/1985 では、2 桁の日付、2 桁の MM/dd/yyy 、および 4 桁の年の数字を指定します。
    * これらのフォーマットは、機能するトリッキーです。 与えられたフォーマットは、ほとんどのために動作するかもしれませんが、すべてではなく、指定された変数の文字列を時間とします。 指定した形式が期待どおりに動作していることを確認してください。 ERDDAP 変数の全ての時間文字列に対して。
    * 可能であれば、GenerateDatasetXml は時間フォーマットの文字列を提案します。
    * フォーマット文字列を生成するヘルプが必要な場合は、Chris にメールしてください。 noaaa.gov のジョン。

主時間データ変数 (表形式のデータセットの場合) そして主時間軸変数 (グリッドデータセット用) によって認識される [ destinationName ](#destinationname) 時間。 単位のメタデータは「1970-01-01」以降、数値時間値のUDUnits互換ユニット文字列である必要があります。 (表またはグリッドされたデータセットの場合) または [文字列時間に適した単位](#string-time-units) 、例えば、「M/d/yyyy」 (表形式のデータセットの場合) お問い合わせ

異なるグリッドの異なる時間単位 .nc ファイル - グリッドのコレクションを持っている場合 .nc ファイルの変数の1つのサブセットは、ファイルの1つ以上の他のサブセットよりも異なる時間単位を使用します。 [ EDDGrid FromNcFiles解凍](#eddgridfromncfilesunpacked) お問い合わせ 時間値を変換する "seconds since 1970-01-01T00:00:00Z" より低いレベルでは、差を隠すことで、ヘテロ系ファイルのコレクションから1つのデータセットを作ることができます。

###### TimeStamp 変数{#timestamp-variables} 
 [TimeStamp 変数](#timestamp-variables) お問い合わせ その他の変数 ( axisVariable または dataVariable , で EDDGrid またはEDDTableデータセット) timeStamp 変数にすることができます。 タイムスタンプ変数は、時間単位と時間データを持つ変数ですが、&lt; destinationName &gt; 時間以外。 TimeStamp 変数は、ソースの時刻形式を変換するメインタイム変数のように振る舞います "seconds since 1970-01-01T00:00:00Z" および/またはISO 8601:2004年 (Eメール) フォーマット)。 ERDDAP™ 時間を認識する タイム関連によるスタンプ変数 " [ユニット](#units) "メタデータ、この正規表現にマッチしなければならない" \\[ a-zA-Zの特長 \\] + + + から + \\[ 受付時間 \\] .+"を (数値の日付 例えば、 "seconds since 1970-01-01T00:00:00Z" ) または日付 "uuuuuu", "yyy" または "YYYY" を含む時間フォーマット文字列 (例えば " yyyy-MM-dd 'T'H:mm:ssZ" は、) お問い合わせ しかし、まだ使用してください destinationName   "time" 主日の場合 時間変数。

 **常にあなたの仕事をチェックして、表示する時間データを確実に確認します ERDDAP™ 正しい時間データです。** 時間データを扱うことは、常にトリッキーでエラーが発生します。

お問い合わせ [時間変数に関する詳細情報](#destinationname) お問い合わせ
 ERDDAP™ ユーティリティを持っている [数値変換 文字列の時間から/までの時間](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) お問い合わせ
お問い合わせ [使い方 ERDDAP™ 時間とともにお得な情報](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) お問い合わせ
         
        
######  valid\\_range  {#valid_range} 
*    [ ** valid\\_range ** または ** valid\\_min ** そして、 ** valid\\_max ** ](#valid_range) お問い合わせ これらは OPTIONAL 変数属性で定義されています。 [CFシリーズ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) メタデータ条約。 例えば、

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

または

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * 現時点では、変数と同じデータ型であり、その変数の有効な最小値と最大値を指定します。 ユーザーは、この範囲の外で値が無効であると判断する必要があります。
    *    ERDDAP™ 応募しない valid\\_range お問い合わせ 別の方法: ERDDAP™ 外部のデータ値を変換しない valid\\_range \\_Fill へ 価値または missing\\_value お問い合わせ ERDDAP™ このメタデータを渡すだけで、アプリケーションをあなたまで残します。
なぜ? これは、このメタデータが データプロバイダが望んでいた場合、データプロバイダは、データプロバイダは、外部のデータを変換することができます valid\\_range \\_FillValues になる。 ERDDAP™ データプロバイダを推測しません。 このアプローチはより安全です。後で示されていると、 valid\\_range 狭すぎるか、そうでなければ、 ERDDAP™ データを隠すことはありません。
    * データが満載の場合 [ scale\\_factor および/または add\\_offset ](#scale_factor) , valid\\_range , valid\\_min そして、 valid\\_max データ型と値が詰まっているはずです。 お問い合わせ ERDDAP™ リクエスト scale\\_factor そして、 add\\_offset データセットをロードするとき、 ERDDAP™ 解凍します valid\\_range , valid\\_min そして、 valid\\_max 宛先メタデータが送信されるように値 (ユーザ名) 未梱包のデータタイプと範囲を示します。
または、unpacked\\_ がない場合 valid\\_range 属性は存在し、名前を変更します valid\\_range いつか ERDDAP™ データセットをロードします。
##### &lt;removeMVRows&gt;{#removemvrows} 
* ツイート ** &lt;removeMVRows&gt; ** . . (#removemvrowsさん) タグ内のオプションタグ datasets.xml EDDTableFromFiles 用 (すべてのサブクラスを含む) データセットは、EDDTableFromMultidimNcFiles にのみ使用されます。 true または false の値を持つことができます。 例えば、true
これは、すべての値がグループの終わりに行の任意のブロックを削除します。 missing\\_value , \\_FillValue, または CoHort ...Array のネイティブな欠損値 (またはCharArraysのchar=#32) お問い合わせ これは、CF DSG多次元配列ファイルタイプと同様のファイル用のものです。 True なら、これは適切なテストを行い、常に最大 dim 変数をすべてロードするので、時間がかかります。
デフォルト値は false です。
おすすめ -- データセットの場合、remomVRows を false に設定することをお勧めします。 removeMVRows を true に設定すると、リクエストが大幅に遅くなる可能性がありますが、一部のデータセットでは必要です。
