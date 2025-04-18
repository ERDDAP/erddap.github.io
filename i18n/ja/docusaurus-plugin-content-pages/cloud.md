---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™クラウド

## クラウドとは

最も単純な定義はローカルサーバーではありません。 これは非常に広く、多くの異なるセットアップを意味することができます。 たとえば、データセンター、仮想プライベートサーバー、共有サーバー、サーバーレス、または何かで専用の物理サーバーになる可能性があります。

### なぜクラウドなのか

組織がクラウドに移行したいという多くの理由があります。 最も重要なのは、物理的なハードウェアを購入と比較して計算/ストレージのニーズのために提供する柔軟性です。

これにより、データセンター/サーバールームを維持する必要がなくなります。 また、コンピュートリソースを現在のニーズにスケーリングすることもできます。 クラウドは、リソースをスケールアップするだけでなく、さまざまなことを意味することができます。 それはより多くのために支払うことを意味することができます (以下) サーバレスリソース。 共有サーバーからプライベートサーバへ移行することを意味する。 より大きな専用物理サーバへのアップグレードを意味することができます。

## できますERDDAP™クラウドで実行しますか?

はい。

ERDDAP™ローカルまたはクラウド環境で実行できる Tomcat 内で実行するように設計されています。 Docker で実行するためのコミュニティサポートがあります。[公式サイト Docker のサポートがすぐに対応](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md)お問い合わせ

と言った。ERDDAP™専用のサーバーが標準だったときに設計されました。 サーバレスではなく、サーバーレス化が不可能な場合は非常に困難です。

### できますERDDAP™スケール?

スケーリングERDDAP™より多くのサーバーレスリソースを使用するよりも複雑です。 私達にある大きい文書があります[スケールする方法ERDDAP™](https://erddap.github.io/docs/server-admin/scaling)お問い合わせ スケールアップしやすいERDDAP™お問い合わせ

### オートスケーリングを防ぐものは?

ERDDAP™データセットを最新の状態に保つこと、データセットの変更の購読者への通知、データのキャッシュ、ユーザーのリクエストの処理など、多くのことを行っています。 十分に大きいのためにERDDAP™サーバのような[コーストウォッチ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)つまり、常に何かをやっています。 連続使用は、実際にはサーバーレスオプションのための非常に高価な状況です (あなたは、サーバーレスをやっているとき、コンピューティングのために大きなプレミアムを支払うので、主な利点は、時折呼び出しを行うときだけ) お問い合わせ また、すべてを動かしていきたいERDDAP™'serverless バージョンへのさまざまな機能は、管理者に必要な非常に複雑な設定で終わるでしょう。

### できますERDDAP™クラウドストレージを使用する?

はい。

ERDDAP™クラウドストレージをサポート (AWS S3を含む) このサポートの改善 (例えば非AWS S3) 優先度が高いERDDAP™開発ロードマップ。ERDDAP™既存のオンラインサービスからデータを引き出すこともできます。 より多くの情報のために、私は私たちを見てお勧め[データセット型ドキュメント](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)お問い合わせ
