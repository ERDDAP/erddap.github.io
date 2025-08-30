---
sidebar_position: 1
---

# インストール
初期設定を行う方法ERDDAP™サーバー


ERDDAP™どのサーバーでもサポートできるJavaトムキャット (また、Jetty などのアプリケーションサーバはサポートしていません。) お問い合わせERDDAP™Linux でテスト済み (Amazon の AWS を含む) 、MacおよびWindowsコンピュータ。
*    **ドッカー** お問い合わせ 提供サービス[ERDDAP™Dockerコンテナ](https://hub.docker.com/r/erddap/erddap)そしてIOOSは今提供します[クイックスタートガイドERDDAP™Dockerコンテナ](https://ioos.github.io/erddap-gold-standard/index.html)お問い合わせ
それは標準ですERDDAP™ドッカーコンテナにインストールします。
Dockerを通して sslおよび監視をセットアップする容易な方法を提供しましたり、多くをで読んで下さい[ドッカー文書](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md)お問い合わせ
Docker を既に使用している場合は、Docker のバージョンが優先されます。
クラウドサービスで実行したい場合は、おそらく Docker バージョンを好むでしょう。
*    **アマゾン** お問い合わせ インストールしている場合ERDDAP™Amazon Web Services EC2 インスタンスで、これを参照してください。[Amazon Webサービス概要](/docs/server-admin/additional-information#amazon)まずは。
*    **LinuxとMac** お問い合わせERDDAP™Linux および Mac コンピューターで動作します。 以下の手順を参照してください。
*    **ウィンドウズ** お問い合わせ Windowsはテストのために良いですERDDAP™個人的な使用のために (以下の手順を参照してください。) , しかし、我々は公共のためにそれを使用することをお勧めしませんERDDAPお問い合わせ ランニングERDDAP™Windowsでは問題が起きる可能性があります。ERDDAP™ファイルを素早く削除したり、名前を変更したりすることはできません。 これはおそらくアンチウィルス ソフトウェアのためです (例:McAfeeとNorton) ウイルスのファイルをチェックしています。 この問題に遭遇した場合 (エラーメッセージで見ることができるメッセージ[ログイン](/docs/server-admin/additional-information#log)"削除できません..." のようなファイル) , ウイルス対策ソフトウェアの設定を変更すると、部分的に問題を軽減することができます. または、代わりにLinuxまたはMacサーバーを使用して検討してください。

 **標準規格ERDDAP™Linux、Mac、およびWindowsコンピュータのインストール手順は次のとおりです。** 

0. 依存関係がインストールされていることを確認してください。 非Windowsマシンで (LinuxとMac) csh が必要です。
## Java {#java} 
1.  [お問い合わせERDDAP™v2.19+, 設定Java21. .](#java)
セキュリティ上の理由から、最新バージョンを使用するのはほぼ常に最善ですJava21. .
最新バージョンをダウンロードしてインストールしてください
    [採用のOpenJDK (テムリン) 21日 (ツイート) ](https://adoptium.net/temurin/releases/?version=21)お問い合わせ インストールを確認するには、例えば "/_javaJreBinDirectory_/java -version" と入力します。
/usr/local/jdk-21.0.3+9/jre/bin/java -バージョン
    
    ERDDAP™作品紹介Java他のソースから, しかし、我々はそれがメインであるので、採用をお勧めします, コミュニティをサポート, 無料 (ビール・スピーチ) バージョンJava長期的なサポートを提供する21 (初期リリースを過ぎた数年間無料アップグレード) お問い合わせ セキュリティ上の理由は、更新してくださいERDDAP's バージョンJava定期的に新しいバージョンとしてJava採用から21が利用可能になりました。
    
    ERDDAP™他のバージョンではなく21と広範囲にテストされ、使用されました。 様々な理由で、他のバージョンの対応やサポートは行いません。Javaお問い合わせ
     
## トムキャット{#tomcat} 
2.  [セットアップ](#tomcat) [トムキャット](https://tomcat.apache.org)お問い合わせ
Tomcatは最も広く使用されているJava適用サーバー、ありますJavaオペレーティングシステムのネットワークサービスとJavaサーバソフトウェアのようなERDDAP™お問い合わせ それは自由で、オープンソースソフトウェアです (フォス) お問い合わせ
    
別の使い方Javaアプリケーションサーバ (例:Jetty) ですが、Tomcat のテストとサポートのみです。
     
    
    * Tomcatをダウンロードし、サーバーまたはPCに解凍します。
セキュリティ上の理由から、Tomcat 10の最新バージョンを使用するのはほぼ常に最善です (バージョン9以下は受け付けておりません。) 機能するように設計されていますJava21 以降 Tomcat ディレクトリは _tomcat_ と呼ばれます。
        
お知らせ すでに他のWebアプリケーションを実行しているTomcatを持っている場合 (特にTHREDDS) 、私達は取付けることを推薦しますERDDAP™お問い合わせ[2 番目の Tomcat](/docs/server-admin/additional-information#second-tomcat), のでERDDAP™異なる Tomcat の設定を必要とし、メモリの他のアプリケーションと対峙する必要はありません。
        
        * Linux では、[「Core」をダウンロード.gz「Tomcat分布」](https://tomcat.apache.org/download-10.cgi)そしてそれを解凍して下さい。 /usr/local にアンパックすることをおすすめします。
        * Macでは、Tomcatは/Library/Tomcatに既にインストールされていますが、Tomcat 10.の最新バージョンにアップデートする必要があります。
ダウンロードしたら、[「Core」をダウンロード.gz「Tomcat分布」](https://tomcat.apache.org/download-10.cgi)/Library/Tomcatで解凍します。
        * Windowsでは、できます["Core" "zip" Tomcat配布をダウンロード](https://tomcat.apache.org/download-10.cgi)  (WindowsレジストリとDOSコマンドラインから制御しない) 適切なディレクトリに解凍します。 (開発には「コア」の「zip」の配布を使用します。 /programsディレクトリを作成し、それを解凍します。) または、より多くの機能を含む「Core」64ビットWindows zipの配布をダウンロードすることができます。 ディストリビューションが Windows インストーラの場合、例えば /Program Files/apache-tomcat-10.0.23 に Tomcat を置くでしょう。
             
### サーバ.xml{#serverxml} 
*   [サーバ.xml](#serverxml)- _tomcat_/conf/server.xml ファイルには、それぞれ2つの変更がある&lt;コネクタ&gt; タグ - のための1
```
        <Connector port="8080" 
```
そして1つはのための
```
        <Conector port="8443"
```
    1.   (おすすめ商品) connectTimeout パラメータ値を 300000 に増加させる (ミリ秒)   (5分以内) お問い合わせ
    2.   (おすすめ商品) 新しいパラメーターを追加します。: RelaxQueryChars="\\[\\]|ツイート これは、ユーザのリクエスト URL のパラメーターで発生したときに、ユーザがこれらの文字をパーセントエンコードする必要性を、オプションで少し安全です。
             
### コンテンツ。xml{#contentxml} 
* コンテキスト.xml -- リソースキャッシュ - _tomcat_/conf/context.xml では、直前に&lt;/Context&gt; タグ、 リソースタグの変更 (既に存在していない場合は、または追加してください。) キャッシュを設定する 80000へのMaxSize変数:
    &lt;リソース cachingAllowed="true" cacheMaxSize="80000" /&gt;
これは、カタリナで多数の警告を回避します。 まずは、
「警告」\\[メインページ\\]org.apache.catalina.webresources.Cache.getリソース リソースを追加できない\\[/WEB-INF/classes/...]
         
### Apache のタイムアウト{#apache-timeout} 
* Linux コンピューターで、Apache のタイムアウト設定を変更して、時間のかかるユーザリクエストはタイムアウトしません。 ("Proxy" または "Bad Gateway" エラーとして表示されるもの) お問い合わせ rootユーザとして:
    1. Apache の変更httpd.conf ファイル (通常は/etc/でhttpd/conf/) : : :
既存の変更&lt;タイムアウト&gt;設定 (またはファイルの最後に 1 つを追加) から 3600 (秒単位) デフォルト60秒または120秒の代わりに。
既存の変更&lt;ProxyTimeout&gt; 設定 (またはファイルの最後に 1 つを追加) から 3600 (秒単位) デフォルト60秒または120秒の代わりに。
    2. Apache の再起動: /usr/sbin/apachectl -k 優雅な (しかし、時々それは別のディレクトリにあります) お問い合わせ
             
    * 保証勧告: お問い合わせ[これらの手順](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)特に公共サーバー用の Tomcat のインストールのセキュリティを高めるため。
         
    * パブリックERDDAP™Linux と Mac のインストールでは、Tomcat の設定が最適です。 (プログラム) ユーザの "tomcat" に属する (限られた権限を持つ別のユーザー[パスワードがない](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) お問い合わせ そのため、スーパーユーザのみがユーザのtomcatとして動作するように切り替えることができます。 これにより、ハッカーがユーザーのTomcatとしてサーバーにログインすることができません。 いずれの場合も、tomcat のユーザがサーバーのファイルシステムに非常に限られた権限を持つようにするべきです(apache-tomcat ディレクトリツリーのread+write+execute 権限)&lt;bigParentDirectory&gt; データを持つディレクトリの読み取り権限ERDDAP™アクセス方法
        * tomcatユーザーアカウントを作成できます。 (パスワードがない) コマンドを使う
sudo useradd tomcat -s /bin/bash -p '\\* お問い合わせ
        * コマンドを使用してユーザのtomcatとして動作するように切り替えることができます
sudo su - コイン
             (これを行うには、スーパーユーザのパスワードが必要です。) 
        * コマンドを使用してユーザのtomcatとして動作を停止することができます
アクセス
        * トムキャットの残りの部分を最大限に活用し、ERDDAP™ユーザの "tomcat" として設定手順。 その後、Tomcat がログファイルに書き込み権限を持つように、Startup.sh と shutdown.sh スクリプトをユーザ "tomcat" として実行します。
        * Tomcat を解凍した後、apache-tomcat ディレクトリの親から:
            
            * apache-tomcat ディレクトリツリーの所有権を tomcat ユーザに変更します。
chown -R の tomcat の apache-tomcat-_10.0.23_
                 (しかし、Tomcatディレクトリの実際の名前を置き換える) お問い合わせ
            * "group" を tomcat、ユーザー名、または tomcat を含む小さなグループの名前、Tomcat のすべての管理者に変更します。ERDDAP、例えば、
chgrp -R _your (日本語) ユーザ名_ apache-tomcat-_10.0.23_
            * tomcat とグループが読み取り、書き込み、権限を実行できるように権限を変更します。
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * "other" のユーザ権限を読み取り、書き込み、または実行します。
chmod -R o-rwx apache-tomcat-_10.0.23_
これは重要なことです。他のユーザーが読み込むのを防ぐため、機密情報を読み込みます。ERDDAP™設定ファイル。
            
              
### メモリ{#memory} 
* Tomcatの環境変数を設定する
    
LinuxとMacの場合:
ファイルを作成する _tomcat_/bin/setenv.sh (またはRed Hat Enterprise Linuxで\\[フリル\\], 編集 ~tomcat/conf/tomcat10.conf) Tomcat の環境変数を設定する。 このファイルは _tomcat_/bin/startup.sh と shutdown.sh によって使用されます。 ファイルには以下のようなものが含まれている必要があります。
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (しかし、コンピュータからディレクトリ名を置き換える) お問い合わせ
 (JRE\\_HOME を設定すると、削除できます。)   
Macでは、おそらくJAVA\\_HOMEを設定する必要はありません。

Windowsで:
Tomcatの環境変数を設定するには、_tomcat_\bin\\setenv.batファイルを作成します。 このファイルは _tomcat_\bin\\startup.bat で使われます。shutdown.batお問い合わせ ファイルが以下のようなものを含んでいる必要があります。
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (しかし、コンピュータからディレクトリ名を置き換える) お問い合わせ
ローカルテストだけの場合、"-server" を削除します。
 (JRE\\_HOME を設定すると、削除できます。) 

-Xmx と -Xms のメモリ設定は重要ERDDAP™より多くの記憶とよりよい働かせて下さい。 -Xms を -Xmx と同じ値に設定します。

* 32ビットのオペレーティング システムおよび32ビットのためJava: : :
64ビットJava32ビットよりもはるかに優れていますJava32ビットJavaサーバが本当に忙しくない限り動作します。 サーバの物理メモリがより良くなる: 4 GBは本当に良いです、2 GBは大丈夫です、より少ないお勧めしません。 32ビットを使ってJava、豊富な物理的な記憶、TomcatおよびJava-Xmx を 1500M 以上設定しようとすると動作しません (一部のコンピュータで1200M) お問い合わせ サーバがメモリの2GB未満の場合、-Xmx値の低下 ('メガバイト) コンピュータの物理的な記憶の1/2に。
* 64ビットオペレーティング システムおよび64ビットのためJava: : :
64ビットJava64ビットオペレーティングシステムで動作します。
    
    * とJava8つは、setenv.batのTomcat CATALINA\\_OPTS変数に\\-d64を加える必要があります
    * とJava21、64ビットJavaバージョンをダウンロードするときJavaマークされた「64ビット」。
    
64ビットを使ってJava, トムキャットとJava非常に高い -Xmx および -Xms の設定を使用できます。 サーバの物理メモリが向上しました。 シンプルな提案として、-Xmx と -Xms を設定することをお勧めします。 ('メガバイト) に 1/2 (以下) コンピュータの物理的な記憶の。 Tomcat かどうかを確認できます。JavaとERDDAP™確かに「ビット」を検索して64ビットモードで実行されているERDDAP' 毎日報告メールまたは _bigParentDirectory_/logs/[ログイン](/docs/server-admin/additional-information#log)ファイル (_bigParentDirectory_ は[セットアップ。xml](#setupxml)) お問い合わせ
#### ゴミ収集{#garbage-collection} 
* インスタグラムERDDAP™お問い合わせ[ログイン](/docs/server-admin/additional-information#log)"GC" と表示します。 (配分の失敗) メッセージ
これは通常問題ではありません。 普通の操作から頻繁にメッセージですJavaエデンの部屋から出てきたので、マイナーなごみ収集を終えたと言います (セクションのセクションJava非常に若いオブジェクトのヒープ) お問い合わせ 通常、メッセージは _memoryUseBefore_\\-&gt;_memoryUseAfter_ を表示します。 その2つの数字が一緒に閉じれば、ゴミ収集は生産的ではないことを意味します。 非常に頻繁である場合、メッセージはトラブルの兆候だけです (秒単位) 、生産的ではなく、数字は大きく成長していないため、Javaより多くのメモリが必要です。メモリを解放し、メモリを解放できません。 ストレスの多い時間に起こることがあります。 しかし、それが主張するならば、それはトラブルの兆候です。
* java.lang.OutOfMemoryError's が見つからない場合ERDDAP™お問い合わせ[ログイン](/docs/server-admin/additional-information#log)ファイル, 参照[OutOfメモエラー](/docs/server-admin/additional-information#outofmemoryerror)問題を診断し、解決する方法に関するヒント。
         
### パーミッション{#permissions} 
*   [Linux と Mac で、権限を変更します。](#permissions)すべて\\*.sh_tomcat_/bin/ のファイルで、所有者が実行できるようにします。
```
    chmod +x \\*.sh  
```
### フォント{#fonts} 
*   [画像のフォント:](#fonts)私たちは強く自由を好む[DejaVuフォント](https://dejavu-fonts.github.io/)その他へJavaフォント。 これらのフォントの使用は強くお勧めしますが、必須ではありません。
    
DejaVu フォントを使用しない場合は、setup.xml で FontFamily の設定を変更する必要があります。&lt;フォントファミリー&gt;サンセリフ&lt;/fontFamily&gt;、すべてで利用可能Java分布。 FontFamily を使用できるフォントの名前に設定した場合、ERDDAP™log.txt ファイルの利用可能なフォントのリストをロードして印刷しません。 これらのフォントのいずれかを使用する必要があります。
    
DejaVu フォントを使用する場合は、setup.xml の FontFamily 設定を必ず確認してください。&lt;フォント ファミリー&gt;DejaVu Sans&lt;/fontFamily&gt;。
    
DejaVuフォントをインストールするには、ダウンロードしてください[デジャヴフフォント.zip](/DejaVuFonts.zip)  (5,522,795 バイト, MD5=33E1E61FAB06A547851ED308B4FFEF42) フォントファイルを一時ディレクトリに解凍します。
    
    * Linuxで:
        * Linuxの採用のためJava分布, 参照[これらの手順](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/)お問い合わせ
        * その他Java分布: Tomcat ユーザーとして、フォントファイルを _JAVA\\_HOME_/lib/fonts にコピーします。Javaフォントを検索できます。 覚えておいてください: 後で新しいバージョンにアップグレードするときJavaこれらのフォントを再インストールする必要があります。
    * Macの場合:各フォントファイルの場合、ダブルクリックしてフォントをインストールします。
    * Windows 7と10:Windowsエクスプローラで、すべてのフォントファイルを選択します。 右クリックします。 インストールをクリックします。
             
### トムキャットのテスト{#test-tomcat} 
* Tomcatのインストールをテストします。
    * リナックス:
        * ユーザ "tomcat" として、 _tomcat_/bin/startup.sh を実行します。
        * お使いのブラウザでURL + ":8080/" を表示 (例:[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) お問い合わせ
        * Tomcat "Congratulations"のページが表示されます。
問題がある場合は、Tomcatログファイル_tomcat_/logs/catalina.outを参照してください。
    * メニュー (システム管理者ユーザとしてtomcatを実行) : : :
        * 実行 _tomcat_/bin/startup.sh
        * お使いのブラウザでURL + ":8080/" を表示 (例:[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) お問い合わせ デフォルトでは、Tomcat がアクセス可能です。 公然アクセスできません。
        * Tomcat "Congratulations"のページが表示されます。
問題がある場合は、Tomcatログファイル_tomcat_/logs/catalina.outを参照してください。
    * Windowsのlocalhost:
        
        * システムトレイの Tomcat アイコンを右クリックし、「サービス開始」を選択します。
        * ニュース[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)または多分[ http://localhost:8080/ ](http://localhost:8080/)お使いのブラウザで デフォルトでは、Tomcat がアクセス可能です。 公然アクセスできません。
        * Tomcat "Congratulations"のページが表示されます。
問題がある場合は、Tomcatログファイル_tomcat_/logs/catalina.outを参照してください。
            
### Tomcatのインストールに問題がありますか?{#troubles-with-the-tomcat-installation} 
* Linux と Mac では、Tomcat に到達できない場合やERDDAP™  (またはおそらく、ファイアウォールの外でコンピュータからそれらに到達することはできません) , Tomcat がポート 8080 を聞いているかどうかを試すことができます。, typing で (ルートとして) サーバのコマンドラインで:
```  
    netstat -tuplen | grep 8080  
```
これは、次のようなもので1行を返すべきです。
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (ここで '#' は '#' は '#' が '#' は '#' は '#' が '#' は ' で '#' は '#' は '#' は '#' は '#' が ' は '#' は '#' が ' は '#' は ' は ' ' の は ' ' ' は ' ' ' ' は ' ' ' ' ' ' ' ' ' ' ' ' は ' ' ' ' ' ' は ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' は は ' は は ' ' は ' ' ' ' ' は ' ' ' ' ' ' ' ' ' ' ' ' ) 「Java」プロセスを示す (トムキャット) "tcp" トラフィックのポート "8080" を聞いています。 行が返されなかった場合、行が返された場合、または2行以上が返された場合は、ポート設定に問題があります。
* Tomcat ログファイル _tomcat_/logs/catalina.out を参照してください。 Tomcatの問題といくつかのERDDAP™スタートアップの問題は、ほぼ常にそこに表示されます。 最初に設定するときはこれが一般的ですERDDAP™お問い合わせ
* 詳細はこちら[トムキャット](https://tomcat.apache.org/)ウェブサイトやヘルプのためのWebを検索します, しかし、我々はあなたが持っていた問題とあなたが見つけたソリューションを知らせてください.
* お問い合わせ[追加サポートを受けるセクション](/docs/intro#support)お問い合わせ
             
### ERDDAP™コンテンツ{#erddap-content} 
3.  [セットアップ_tomcat_/content/erddap設定ファイル。](#erddap-content)  
Linux、Mac、Windowsで、ダウンロード[erddapコンテンツ.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (バージョン1.0.0、20333バイト、MD5=2B8D2A5E5ED73E3A42B529C168C60B5、日付2024-10-14) それを _tomcat_ に解凍し、_tomcat_/content/erddapお問い合わせ

    \\[以前のバージョンもあります。
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19792バイト、MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C、日付 2022-02-16)   
    [2.18の](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19792バイト、MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C、日付 2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810バイト、MD5=1E26F62E7A06191EE6868C40B9A29362、日付 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810バイト、MD5=1E26F62E7A06191EE6868C40B9A29362、日付 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810バイト、MD5=1E26F62E7A06191EE6868C40B9A29362、日付 2023-02-27) 
それを _tomcat_ に解凍し、_tomcat_/content/erddapお問い合わせ\\]
    
#### 他のディレクトリ{#other-directory} 
Red HatエンタープライズLinux用 (フリル) または、Tomcat ディレクトリを変更したり、Tomcat ディレクトリを置きたくない他の状況の場合ERDDAP™何らかの理由で他の場所にあるコンテンツディレクトリ (例えば、Tomcatの代わりにJettyを使うと) , unzip erddapContent.zip目的のディレクトリに (user=tomcat だけがアクセスできる) そして置きますerddapContentDirectoryシステムプロパティ (例:erddapContentDirectory=~tomcat/content/erddap) お問い合わせERDDAP™この新しいコンテンツディレクトリを検索できます。
    
### セットアップ。xml{#setupxml} 
*   [コメントを読む_tomcat_/content/erddap/ / / / **セットアップ。xml** ](#setupxml)要求された変更を加えて下さい。 setup.xml は、設定の全てのファイルで、どのように設定するかを指定します。ERDDAP™アクション。
初期設定では、これらの設定を少なくとも変更する必要があります。
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
bigParentDirectory の親ディレクトリから bigParentDirectory を作成するとき:
    
    * user=tomcat を bigParentDirectory の所有者にします。
```
        chown -R tomcat _bigParentDirectory_
```
    * "group" を tomcat、ユーザー名、または tomcat を含む小さなグループの名前、Tomcat のすべての管理者に変更します。ERDDAP、例えば、
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * tomcat とグループが読み取り、書き込み、権限を実行できるように権限を変更します。
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * "other" のユーザ権限を削除して、読み書き、実行します。 これは、おそらく機密情報を読むのを防ぐことが重要ですERDDAP™ログファイルとファイルをプライベートデータセットに関する情報とともに保存します。:
```
        chmod -R o-rwx _bigParentDirectory_
```

### 環境変数{#environment-variables} 
まずはERDDAP™v2.13,ERDDAP™管理者は、指定した環境変数を指定することで、setup.xml で任意の値を上書きできます。ERDDAP\\__valueName_ を実行する前にERDDAP™お問い合わせ 例えば、ERDDAP\\_baseUrl オーバーライド&lt;baseUrl&gt; 値。 デプロイ時に便利です。ERDDAP™Docker のようなコンテナで、setup.xml に標準設定を設定し、環境変数を使って特別な設定を提供できるようにします。 秘密情報を供給する場合ERDDAP™この方法では、情報が秘密に残ることを確認してください。ERDDAP™起動時に環境変数を 1 回だけ読み込み、起動の 1 秒で、これを使用する一つの方法は: 環境変数を設定し、起動するERDDAP, まで待ちますERDDAP™環境変数をunsetし始めます。
    
### datasets.xml {#datasetsxml} 
* コメントを読む[ **と働くdatasets.xmlファイル** ](/docs/server-admin/datasets)お問い合わせ 後で、あなたが得る後ERDDAP™初めて走る (通常はデフォルトデータセットのみ) でXMLを変更します。_tomcat_/content/erddap/ / / / **datasets.xml** 必要なすべてのデータセットを指定するERDDAP™お問い合わせ これは、セットアップ中にあなたの時間のバルクを費やす場所ですERDDAP™メンテナンス中、ERDDAP™お問い合わせ

例を確認できます。[datasets.xmlGitHubで](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml)お問い合わせ
     
*    (うまいも) 今、または (もう少し可能性が高い) 将来的には、 erddap の CSS ファイルを変更したい場合は、 コピーを作成します。_tomcat_/content/erddap/images/erddapStart2.css は erddap2.css と呼ばれ、変更を行います。 erddap2.css への変更は、いつしか効果をとりますERDDAP™再起動され、多くの場合、ブラウザのキャッシュされたファイルを消去するためにユーザーが必要です。
     
ERDDAP™setup.xml または setup.xml が正しく動作しないdatasets.xmlファイルが整形されたXMLファイルではありません。 そのため、これらのファイルを編集した後、XMLテキストをXMLチェッカーに貼り付けることで、結果がよく形成されたXMLであることを検証することをお勧めします。[xmlvalidationの](https://www.xmlvalidation.com/)お問い合わせ
     
### erddap.warファイルをインストールする{#install-the-erddapwar-file} 
4. Linux、Mac、Windowsで、ダウンロード[erddap.warの](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war)_tomcat_/webapps に。
     (バージョン2.28.0、620、824、288バイト、MD5=f948b2ba603f65a83ac67af43da9e4c2、日付08-29-2025) 
    
.war ファイルは高解像度の海岸線、境界線、および関連するデータがマップを作成する必要があるため大きいです。
    
    \\[以前のバージョンもあります。
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245バイト、MD5=5FEA912B5D42E50EAB9591F773EA848D、日付 2022-02-16)   
    [2.18の](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (ファックス: 86-2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411バイト、MD5=F2CFF805893146E932E498FDDBD519B6、日付 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765バイト、MD5=2B33354F633294213AE2AFDDCF4DA6D0、日付 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953バイト、MD5 = D843A043C506725EBD6F8EFDCCA8FD5FD5F、日付 2023-03-03) 
    [2.24の](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187バイト、MD5=970fbee172e28b0b8a07756eecbc898e、日付 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039バイト、MD5=652AFC9D1421F00B5F789DA2C4732D4C、日付 2024-11-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032 バイト、MD5=99a725108b37708e5420986c1616a119、日付 2025-03-31) 
    [2.27.0 の](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)  (620,554,403バイト、MD5=3b2086c659eee4145ca2dff447bf4ef7、日付 2018年11月20日) 
    \\]
    
#### プロキシパス{#proxypass} 
5. プロキシを使用する ポート番号を入力する必要はありません。たとえば、URL の :8080 です。
Linux コンピューターでは、Tomcat が Apache で実行されている場合は、Apache を変更してください。httpd.conf ファイル (通常は/etc/でhttpd/conf/) HTTP トラフィックを/から許可するERDDAP™ポート番号を要求せずに、例えば、URLの:8080。 rootユーザとして:
    1. 既存の変更&lt;VirtualHost&gt; タグ (1つある場合) ファイルの最後に 1 つを追加または追加します。
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. それから Apache を再起動します: /usr/sbin/apachectl -k 優雅な (しかし、時々それは別のディレクトリにあります) お問い合わせ
         
### ガンインックス{#nginx} 
 (ツイートNCOマモン) ご利用の場合[ガンインックス](https://www.nginx.com/)  (ウェブサーバとロードバランサ) : : :
NGINXを取得するためにERDDAP™正しく機能するhttps, 次のスニペットを Tomcat server.xml に入れる必要があります。&lt;Host&gt;ブロック:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
nginx 設定ファイルでは、以下のヘッダーを設定する必要があります。
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Kyle Wilcox のおかげで.)   
     
### Tomcatを起動する{#start-tomcat} 
*    (Tomcat Web Application Manager の使用はお勧めしません。 完全にシャットダウンして起動しないと、Tomcat が早く、または後で PermGen メモリの問題が発生します。)   
     
*    (Linux または Mac OS では、Tomcat を実行する特別なユーザーを作成している場合は、そのユーザーとして次の手順を実行してください。)   
     
* Tomcat が既に稼働している場合、Tomcat をシャットダウン (Linux または Mac OS の場合) _tomcat_/bin/shutdown.sh _ ルートマップ
または (ウィンドウズ) _tomcat_\\bin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\shutdown.bat
    
Linux で ps -ef を使う|tomcat をシャットダウンした後、tomcat プロセスが停止していることを確認してください。 プロセスはシャットダウンの前にリストされ、最終的にシャットダウン後にリストされていない必要があります。 1分か2分かかる場合があります。ERDDAP™完全にシャットダウンします。 患者になる。 または、自分で止まらないように見える場合は、次のようにします。
キル -9 _processID_
    
* Tomcatを起動する (Linux または Mac OS の場合) _tomcat_/bin/startup.sh は、
または (ウィンドウズ) _tomcat_\\bin\\startup.bat の使い方

## お問い合わせERDDAP™ランニング?{#is-erddap-running} 
ブラウザで閲覧しようとする http://_www.YourServer.org_/erddap/status.html   
ERDDAP™ロードされたデータセットなしで起動します。 背景のスレッドにデータセットが読み込まれるので、一対一で利用できるようになります。

### トラブルシューティング{#troubleshooting} 
* ユーザからのリクエストが入ってくると、Apache に行きます。 (LinuxとMac OSコンピュータ) それからTomcat、それからERDDAP™お問い合わせ
* Apache に何が来るかを見ることができます。 (関連するエラー) Apache のログファイル
*   [お問い合わせ](/docs/server-admin/additional-information#tomcat-logs)Tomcatに何が来るかを見ることができます (関連するエラー) Tomcat のログファイル (_tomcat_/logs/catalina.out およびそのディレクトリ内の他のファイル) お問い合わせ
*   [お問い合わせ](/docs/server-admin/additional-information#log)何が来るかを見ることができますERDDAPの診断メッセージからのERDDAP, エラーメッセージからERDDAP, でERDDAP™ &lt;bigParentDirectory&gt;logs/log.txt ファイル。
* Tomcatは起動しませんERDDAP™Tomcatが要求されるまでERDDAP™お問い合わせ 起動したら、Tomcatログファイルで確認できます。ERDDAP™または、その試みに関連するエラーメッセージがある場合。
* いつかERDDAP™起動して、古い名前を変更しますERDDAP™log.txt ファイル (logArchivedAt_CurrentTime_.txt の使い方) 新しいlog.txtファイルを作成します。 ログの場合。 txt ファイルが古いので、ERDDAP™最近再起動していない.ERDDAP™ログ情報をバッファに書き出し、バッファを定期的にログファイルに書き込むだけですが、強制できます。ERDDAP™訪問してログファイルにバッファを書き込む.../erddap/status.htmlお問い合わせ

### トラブル:旧バージョンのJava {#trouble-old-version-of-java} 
バージョンを使用している場合Javaそれはあまりにも古いですERDDAP,ERDDAP™Tomcat のログファイルでエラーメッセージが表示されません。
"main" java.lang.UnsupportedClassVersionError のスレッドで例外:
_some/class/name_: サポートされていないメジャーマイナーバージョン _someNumber_
ソリューションは、最新のバージョンに更新することですJavaTomcatが使用していることを確認してください。

### トラブル:スタートアップの初回起動{#trouble-slow-startup-first-time} 
Tomcat は、初めてのアプリケーションを初めて使う必要があるERDDAP™同様に、 erddap をアンパックする必要があります。 戦争ファイル (これは、.zipファイル) お問い合わせ 一部のサーバーでは、最初にビューしようとするERDDAP™ストール (30秒?) この作品が完成するまで。 他のサーバーでは、最初の試みはすぐに失敗します。 しかし、30秒待ってからもう一度試してみると、ERDDAP™正しくインストールされました。
修正はありません。 トムキャットが作品の仕組みです。 しかし、新しいバージョンをインストールした後に初めて発生しますERDDAP™お問い合わせ

## シャットダウンして再起動{#shut-down-and-restart} 
将来、シャットダウン (再起動)  ERDDAP, 見る[Tomcatをシャットダウンして再起動する方法とERDDAP](/docs/server-admin/additional-information#shut-down-and-restart)お問い合わせ
## トラブル?{#trouble} 
Tomcat やERDDAPお問い合わせ お問い合わせ[追加サポートを受けるセクション](/docs/intro#support)お問い合わせ
## 新バージョンのメール通知ERDDAP {#email-notification-of-new-versions-of-erddap} 
新しいバージョンのメールを受信したい場合ERDDAP™またはその他の重要ERDDAP™発表、参加可能ERDDAP™お知らせ一覧[詳しくはこちら](https://groups.google.com/g/erddap-announce)お問い合わせ このリストは3ヶ月ごとにほぼ1つのメールの平均値です。
## カスタマイズ{#customize} 
[カスタマイズERDDAP™組織を強調する (コメントはありませんNOAA ERD) お問い合わせ](#customize)
    * すべての上部に表示されるバナーを変更するERDDAP™.html ページを編集することで&lt;startBodyHtml5&gt; あなたのタグdatasets.xmlファイル。 (もし 1 がない場合、デフォルトをコピーします。ERDDAPお問い合わせ
        \\[トームキャット\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml にdatasets.xmlそしてそれを編集して下さい。) 例えば:
        * 異なるイメージを使用する (あなたの組織のロゴ) お問い合わせ
        * 背景色を変更します。
        * 変更するERDDAP"_YourOrganization_'s へERDDAPツイート
        * 「科学データへのより簡単なアクセス」を「_YourOrganization_のデータへのより簡単にアクセス」に変更します。
        * 組織と資金源へのリンクである「あなたによって求められている」リンクを変更します。
    * ページの左側にある情報を編集することで変更&lt;theShortDescriptionHtml&gt; あなたのタグdatasets.xmlファイル。 (もし 1 がない場合、デフォルトをコピーします。ERDDAPお問い合わせ
        \\[トームキャット\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml にdatasets.xmlそしてそれを編集して下さい。) 例えば:
        * 組織やグループが何をしているかを記述します。
        * データの種類を記述するERDDAP™お問い合わせ
    * ブラウザタブに表示されるアイコンを変更するには、組織のファビコンを設定します。 ログイン_tomcat_/content/erddap/画像/ . お問い合わせ[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon)お問い合わせ
