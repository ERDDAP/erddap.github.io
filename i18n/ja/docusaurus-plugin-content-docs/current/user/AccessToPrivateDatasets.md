---
title: "Access to Private Datasets"
---
# プライベートデータセットへのアクセスERDDAP™

詳しくはこちらERDDAP™インストールには認証が有効になっていないため、ユーザがログインする方法を提供したり、プライベートなデータセットを持っているりしません。

スタッフERDDAP™インストールは認証を有効にします。 現在、ERDDAP™Google マネージドメールアカウントによる認証のみをサポートし、メールアカウントを含むNOAAそして多くの大学。 もしERDDAP™認証が有効になっています。Google マネージドのメールアカウントをお持ちの方はログインできますが、プライベートなデータセットへのアクセスしかできません。ERDDAP™管理者は明示的にアクセスを許可しています。

## 更新された指示{#updated-instructions} 

下記の情報の一部は日付外です。 更新されるまでは、[このブログ記事](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)スクリプトでプライベートなデータセットからデータを取得するための最近の手順。

## ブラウザで人間{#humans-with-browsers} 

人間のユーザーERDDAP™ログオンERDDAP™ブラウザでは、アクセスを許可されているプライベートデータセットにアクセスできるようにします。

ログインするには:

1. 任意の左上にあるリンク内のログをクリックしますERDDAP™サイトマップ
リンクにログがない場合、ERDDAP™インストールは認証が有効でなく、プライベートなデータセットはありません。
     
2. ボタンをクリックしてGoogleアカウントにログインします。
ボタンのテキストは「サインイン」に変更する必要があります。
     
3. ログをクリックERDDAPボタン。
ウェブページが変更されるべき 次のようにログインします *お問い合わせ メールアドレス* お問い合わせ
そうでない場合は、5秒待ってからログをオンにしますERDDAPもう一度ボタン。
極端な場合, あなたは待つ必要があり、その後、数回再び試すことができます.
     
4. ブラウザのバックアップボタンを使用しないでください。 " を使うERDDAP" 上記の上部にリンクし、他のリンクを使用して、ERDDAP™興味のあるページ キャッシュされたウェブページがログインされていない場合、ページを再読み込みします。
     

## スクリプト{#scripts} 

\\[これは、リン・デウィットが提供した情報から少し変更されます。, 誰がこのアウトを強制するハードジョブをした. ありがとうございました&#33;
修正や提案がある場合は、 erd.data @ noaaa.gov までお問い合わせください。\\]

ログアウトも可能です。ERDDAP™スクリプト経由でプライベートなデータセットにアクセスします。 ここでは、使用する例です。curl: : :

1. これらの手順では、2要素認証がオンになっていないgmailアドレスを使用していると仮定します。 メインの gmail アドレスに 2 要素認証がオンになっている場合は、2 要素認証がオフになっている別の gmail アドレスを作成することを検討してください。
     
2. ログインERDDAP™スクリプトで使用したい gmail アドレスを手動で使用し、必要な任意の権限を承諾し、完全にログアウトします。
     
3. ブラウザ開発者ツールを開き、ネットワークタブに移動します。
     
4. クリックしてください。ERDDAP™「ログイン」リンクから「サインイン」ボタンをクリックし、プロンプトが表示された場合、適切なメールアドレスを選択します。
     
5. 「サインイン」ボタンが「サインイン」に変更された後、開発者ツールネットワークタブでは、次の2つのエントリが表示されます。 (Firefox からの例) : : :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
マウスを右クリックしてコンテキストメニューを「cURL としてコピー」して、それらをプレーンテキストエディタに貼り付けます
     
6. 「ログイン」をクリックERDDAP"" ボタンと "cURL としてコピー" のように見えるリンク:
```
    login.html  
```
この3分の3を貼り付けるcurlテキストファイルへのコマンド。
     
7. テキストファイルでは、次のように3行の行があります。ERDDAP™' サーバー * https://host.somewhere.com/erddap * お問い合わせ 初めての方へcurlコマンドは "login\\_hint" でユーザプロファイルを取得し、"id\\_token" を生成します。 2 つは id\\_token を使って Google にログインし、次に 3 番目のログをERDDAPお問い合わせ
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. 上記の3行は、コマンドラインから順次実行されると、ログインします。ERDDAPお問い合わせ これらをスクリプトで使用するには、最初の行からid\\_tokenをキャプチャし、それを2番目の行に送り、その後の行で読み込むクッキーを書く必要があります。
     
9. スクリプトを開発するには、最初に実行します (お問い合わせ https://accounts.google.com )  curl開発者ツールからコピーされたように正確に行い、応答をキャプチャします (あなたが得ることができるcurlフラグ "--2.0" に関するエラーは削除します。) お問い合わせ phpでは、次のようになります。
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
$id\\_tokenを使用して2番目の行を実行することにより、Googleにログインし、最初に "-H 'Cookie: stuff'パラメータを削除し、代わりに伝えますcurlクッキーの書き方:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
ログインERDDAP™, 再び "-H の 'Cookie: stuff'" パラメータを削除, 以前に書いたクッキーを使用して:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
同じクッキーを使用して、サーバーからデータをリクエストできるようになりました。
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
