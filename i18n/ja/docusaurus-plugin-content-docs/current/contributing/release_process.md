---
sidebar_position: 3
---
#  ERDDAP™ リリースプロセス
* 画像比較ファイルが使用可能であることを確認してください (これは、実行中を意味するかもしれない `mvn 検証` , まだJettyテストを実行する必要があるにもかかわらず、画像比較グループだけに限定される速度を上げる場合は) 
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
* テストを実行して、依存性の更新がすべての主要な設定で何かを破らなかったことを確認します (特に、他の重要な設定だけでなく、) . . 外部テスト スイートは非常に不十分であることができることに注意して下さい。 スローAWS テスト スイートは非常に長い時間かかることができます。
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* 使用条件 `python翻訳/translate.py` 必要に応じて翻訳を更新します。
* EDStatic.java セット開発 モードを false にし、バージョン番号を変更し、リリース日を指定します。
* ビルドを行います。
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
* .warファイルをコーストウォッチにアップロードする \\[ トームキャット \\] /コンテンツ/erddap/
* user=tomcat として:
  * インスタグラム \\[ トームキャット \\] /bin/ :
./shutdown.sh // "ps -fu tomcat" を使用して、停止する
  * インスタグラム \\[ トームキャット \\] /webapps/ :
rm -rf の erddap
RM の erddap. 戦争
ログイン ../content/erddap/erddap2.22.war erddap.war // または番号が何であるか
  * インスタグラム \\[ トームキャット \\] /bin/ :
./スタートアップ.sh
  * アフター ERDDAP ウェブページを返しました。 \\[ トームキャット \\] /webapps/ :
chgrp -R erddap erddap
chmod -R g + rw erddap
chmod -R o-rwx erddap

## GitHubリリース
GitHub リリースをドラッグし、 erddap.war と erddapContent を含む。 .zip   (バージョン番号なし) 

title: The official v2.25 version
説明: 変更リストを見る
       https://erddap.github.io/changes#version-225
 

## ドキュメント更新
* docusaurus.config.ts ファイルのバージョン番号を更新する (フッターセクション) . .
* ドキュメントページを編集する (deploy-install.md と deploy-update.md) . .
  * お問い合わせ \\[ erddap.warの \\]  
  * 既存の情報をコピーする (少し改良された) 以前のインストールの一覧へ 2。
  * erddap のリリース情報を変更します。 戦争で \\[ erddap.warの \\] 
* ドキュメントサイトの翻訳を実行します。
* プルリクエストを作成し、変更をマージします。
* ドキュメントサイトを展開する (readmeを見る) . .

## 必要に応じて、他のリポジトリを最新の状態に保つ
主にこれは、ErddapContentとErddapTestを意味しますが、開発変更時に最新の状態に保つ必要があります。

## ユーザーの通知
変更を要求したユーザーが最初に通知する (バグが修正されたか) . . 変更を検証したり、問題を改善したりする時間を与えます。

 ERDDAP バージョン 2.25 を公開しました。

変更について読むことができます。
 https://erddap.github.io/changes#version-225
 

あなたが提案した変更の一部が変更されます。 ご意見をお寄せいただきありがとうございます。 変更の一覧にある名前を検索して、詳細を確認します。 新しい機能をすぐに試すことができれば、私はこの新しいバージョンをより広い聴衆に発表する前に、それは素晴らしいだろう。

お問い合わせ ERDDAP 管理者、アップグレードの指示は
 https://erddap.github.io/docs/server-admin/deploy-update
 

ご質問・ご意見・ご要望などございましたら、お気軽にお問い合わせ下さい。

お問い合わせ ERDDAP . .

### リリース
お知らせ メーリングリストにお知らせをお送りします。
