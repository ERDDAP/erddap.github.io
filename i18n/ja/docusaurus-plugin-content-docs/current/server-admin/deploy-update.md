---
sidebar_position: 2
---
# ニュース
既存の更新を行う方法 ERDDAP™ サーバー

## 変更点{#changes} 
1. リストされた変更を作る [変更点](/changes) "Things" というセクションで ERDDAP™ 管理者は知っておく必要があります。 ERDDAP™ 使用するバージョンからバージョン。
     
##  Java  {#java} 
2. からアップグレードする場合 ERDDAP™ バージョン 2.18 以下, 切り替える必要があります。 Java 25 日 (または新しい) 関連するTomcat 10. 定番を見る ERDDAP™ 取付けの指示のための [ Java ](/docs/server-admin/deploy-install#java) そして、 [トムキャット](/docs/server-admin/deploy-install#tomcat) . . コピーする必要もあります _tomcat_/content/erddap 古いTomcatインストールから新しいTomcatインストールまでのディレクトリ。

## ダウンロード{#download} 
3. ダウンロード [erddap.warの](https://github.com/ERDDAP/erddap/releases/download/v2.30.0/erddap.war) _tomcat_/webapps に。
     (バージョン2.30.0、706,939,121バイト、MD5=CDC4B3D82A20B33A6623B85312F6DC21、日付 2026-04-06) 
     
## メッセージ.xml{#messagesxml} 
4. 
    * 共通: からアップグレードする場合 ERDDAP™ バージョン 1.46 (以上) そして、標準的なメッセージだけを使用して下さい、新しい標準メッセージ.xmlは自動的に取付けられます (.class ファイルを erddap 経由で .class ファイルに格納します。 戦争) . .
         
    * レア: からアップグレードする場合 ERDDAP™ バージョン 1.44 (以下) ,
古い message.xml ファイルを削除する必要があります。
         _tomcat_/content/erddap /messages.xml .
新しい標準メッセージ.xml は自動的にインストールされます。 (.class ファイルを erddap 経由で .class ファイルに格納します。 戦争) . .
         
    * レア: いつも標準のmessions.xmlファイルに変更を加える場合 (設置場所) ,
これらの変更を新しいmessions.xmlファイル(つまり
WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml 以降 erddap.war は Tomcat によって非圧縮されます。
         
    * レア: custom message.xml ファイルを保存する場合 _tomcat_/content/erddap /,
あなたが把握する必要があります (差分による) デフォルトメッセージ.xml に変更されたもの(新しい erddap にある)。 戦争として
WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml は、カスタム メッセージ.xml ファイルをそれに応じて変更します。
         
## インストール{#install} 
5. 新規インストール ERDDAP™ Tomcatで:
お問い合わせ Tomcat マネージャーは使用しないでください。 PermGen メモリの問題は、もうしばらくお待ちください。 実際にシャットダウンとスタートアップのTomcatがより良くなる。
\\* お使いのコンピューターの実際のTomcatディレクトリーにある_tomcat_に参照を置換します。
     
### LinuxとMac{#linux-and-macs} 
1. トムキャットをシャットダウン: コマンドラインから、_tomcat_/bin/shutdown.sh を使用します。
ps -ef を使う | grep tomcat は、プロセスが停止した時/時を確認します。 (1分か2分かかる場合があります。) 
2. decompressed を削除 ERDDAP™ インストール: _tomcat_/webapps では、
rm -rf の erddap
3. 古い erddap を削除します。 war file: _tomcat_/webapps では、rm erddap を使用します。 戦争
4. 新しい erddap をコピーします。 一時的なディレクトリから _tomcat_/webapps への警告ファイル
5. Tomcatを再起動し、 ERDDAP : _tomcat_/bin/startup.sh を使う
6. ニュース ERDDAP™ お使いのブラウザで、再起動が成功したことを確認します。
     (数回試してみると、目の前で1分待ちます ERDDAP™ . .)   
             
### ウィンドウズ{#windows} 
1. トムキャットをシャットダウン: コマンドラインから: _tomcat_\bin\\\ shutdown.bat 
2. decompressed を削除 ERDDAP™ インストール: _tomcat_/webapps では、
デル /S / Q erddap
3. 古い erddap を削除します。 戦争ファイル: _tomcat_\\webapps では、del erddap を使用します。 戦争
4. 新しい erddap をコピーします。 一時的なディレクトリから _tomcat_\\webapps への警告ファイル
5. Tomcatを再起動し、 ERDDAP : _tomcat_\bin\\startup.bat を使う
6. ニュース ERDDAP™ お使いのブラウザで、再起動が成功したことを確認します。
     (数回試してみると、目の前で1分待ちます ERDDAP™ . .) 

トラブル更新 ERDDAP お問い合わせ お問い合わせ [追加サポートを受けるセクション](/docs/intro#support) . .
