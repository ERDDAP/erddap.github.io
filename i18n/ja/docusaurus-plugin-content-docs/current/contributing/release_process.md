---
sidebar_position: 3
---
# ERDDAP™リリースプロセス
* 画像比較ファイルが利用可能であることを確認してください (これは、`mvn の検証` を実行していることを意味します。ただし、Jetty のテストを実行する必要があるにもかかわらず、imageComparison のグループだけに限定される速度を上げる場合は、) 
* 依存関係の更新
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* プラグインの更新
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* テストを実行して、依存性の更新がすべての主要な設定で何かを破らなかったことを確認します (特に、他の重要な設定だけでなく、) 
```
mvn verify
```
* TranslateMessages.translate を使う () 必要に応じて翻訳を更新する
* EDStatic.java セット開発 モードを false に変更し、バージョン番号を変更し、リリース日を指定します。
* ビルドを行う
```
mvn clean
mvn compile
mvn package
```
## カナリー
ほとんどのデータセットタイプを使用し、多くのトラフィックを受信するCourstwatchサーバーまたは他のサーバーに配布するための警告ファイルを送信します。
ビルドの幅を広げる前にエラーを見つけよう。

新規リリースをお伝えする際のメッセージを含めます。

標準的なプロシージャはあります:
* .warファイルをコーストウォッチにアップロードする\\[トームキャット\\]/コンテンツ/erddap/
* user=tomcat として:
  * インスタグラム\\[トームキャット\\]/bin/ :
./shutdown.sh // "ps -fu tomcat" を使用して、停止する
  * インスタグラム\\[トームキャット\\]/webapps/ :
rm -rf エルダップ
RM の erddap. 戦争
ログイン ../content/erddap/erddap2.22.war erddap.war // または数値が何であるか
  * インスタグラム\\[トームキャット\\]/bin/ :
./スタートアップ.sh
  * アフターERDDAPウェブページを返しました。\\[トームキャット\\]/webapps/ :
chgrp -R erddap erddap
chmod -R g + rw erddap
chmod -R o-rwx erddap

## GitHubリリース
GitHub リリースをドラッグし、 erddap.war と erddapContent を含む。.zip  (バージョン番号なし) 

title: The official v2.25 version
説明: 変更リストを見る
       https://erddap.github.io/changes#version-225
 

## ドキュメント更新
* docusaurus.config.ts ファイルのバージョン番号を更新する (フッターセクション) お問い合わせ
* ドキュメントページを編集する (deploy-install.md と deploy-update.md) お問い合わせ
  * お問い合わせ\\[erddap.warの\\] 
  * 既存の情報をコピーする (少し改良された) 以前のインストールの一覧へ 2。
  * erddap の現在のリリース情報を変更します。 戦争で\\[erddap.warの\\]
* ドキュメントサイトの翻訳を実行します。
* プルリクエストを作成し、変更をマージします。
* ドキュメントサイトを展開する (readmeを見る) お問い合わせ

## 必要に応じて、他のリポジトリが最新であることを確認してください
主にこれは、ErddapContentとErddapTestを意味しますが、開発変更時に最新の状態に保つ必要があります。

## ユーザーの通知
変更を要求したユーザーが最初に通知する (バグが修正されたか) お問い合わせ 変更を検証したり、問題を改善したりする時間を与えます。

ERDDAPバージョン 2.25 を公開しました。

変更について読むことができます。
 https://erddap.github.io/changes#version-225
 

いくつかの変更は、あなたが提案した変更です。 お問い合わせ 変更の一覧にある名前を検索して詳細を確認します。 新しい機能をすぐに試すことができれば、私はこの新しいバージョンをより広い聴衆に発表する前に、それは素晴らしいだろう。

お問い合わせERDDAP管理者、アップグレードの指示は
 https://erddap.github.io/docs/server-admin/deploy-update
 

ご質問・ご意見・ご要望などございましたら、お気軽にお問い合わせ下さい。

お問い合わせERDDAPお問い合わせ

### リリース
お知らせ メーリングリストにお知らせをお送りします。
