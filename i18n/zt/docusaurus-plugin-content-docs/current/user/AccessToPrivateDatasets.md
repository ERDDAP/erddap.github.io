---
title: "Access to Private Datasets"
---
# 存取私人數據集 ERDDAP™ 

很多 ERDDAP™ 設備沒有啟用認證功能, 因此不提供使用者登入的任何方式, 也沒有任何私密的資料集 。

有些 ERDDAP™ 裝置已啟用認證 。 目前, ERDDAP™ 只支援透過 Google 管理的電子郵件帳戶的認證, 其中包括電子郵件帳戶 : NOAA 和很多大學。 如果 ERDDAP™ 已啟用認證, 任何使用 Google 管理的電子郵件帳戶的人都可以登入, 但他們只能存取私人的數據集 。 ERDDAP™ 行政官已明确授權他們存取 。

## 更新指令{#updated-instructions} 

以下部分信息已过时. 在更新之前, 您可以使用 [此部落格文章](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) 以取得有文稿的私人数据集的資料。

## 有瀏覽器的人類{#humans-with-browsers} 

人類使用者 ERDDAP™ 可以登入 ERDDAP™ 在瀏覽器中以取得他們被授權存取的私人數據集。

要登入 :

1. 在任意左上方的連結中點擊紀錄 ERDDAP™ 网页。
如果沒有連結 。 ERDDAP™ 安裝沒有開啟認證功能, 沒有私人的數據集 。
     
2. 按下按鈕中的簽名來簽署到您的 Google 帳戶 。
按鍵的文字應該變更為「 簽署」 。
     
3. 點擊日志進入 ERDDAP 按钮。
網頁應該改變為說 您已登入 *您 電子郵件地址* .
如果沒有, 請等待 5 秒, 按下日志 ERDDAP 又按鈕。
在極端情況下,你可能需要等待,然后再試一次。
     
4. 不要用瀏覽器的後鍵 。 使用 " ERDDAP " 以上最上面的連結,然后使用其他連結去 ERDDAP™ 您所興趣的頁面 。 如果快取的網頁說你沒有登入 重新載入頁面
     

## 文稿{#scripts} 

 \\[ 由Lynn DeWitt提供, 琳恩,謝謝你&#33;
若您有更正或建議, 請發送 Erd. data@ noaa.gov 。 \\] 

也可以登入到 ERDDAP™ 並透過文稿存取私人數據集。 這是一個使用 curl :

1. 這些指令假設您使用的是 gmail 位址, 其中 2 因素認證沒有開啟 。 如果您的主要 gmail 位址已開啟 2 個因子認證, 請考慮建立另一個 gmail 位址, 關閉 2 個因子認證 。
     
2. 登入到 ERDDAP™ 手動使用您要使用的 gmail 位址 。
     
3. 開啟瀏覽器開發工具, 前往網路分頁 。
     
4. 點擊 ERDDAP™ 「 登入」 連結, 然後是「 簽署於」 按鈕, 如果被啟動, 請選擇相當的電子郵件位址 。
     
5. 在「 簽署」 按鈕變更為「 簽署於內」 之後, 開發者工具網路分頁會顯示兩個項目, 看起來像以下 (Firefox 示例) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
用滑鼠右擊的上下文選單來「 复制為 cURL 」 這兩個 urls 并貼入純文字編輯器
     
6. 點擊"Log into" ERDDAP "按鈕和"副本為cURL"的連結看起來像:
```
    login.html  
```
貼上這第三張 curl 命令。
     
7. 在文字檔中, 您現在會有3行, 如以下, 您已登入其中 ERDDAP™ 伺服器位於 ' *https://host.somewhere.com/erddap* '". 第一次 curl 命令會在「loginQint」中取得您的使用者描述檔, 並產生「 idQToken 」 。 第二個使用 id\\_token 登入 Google, 第三個再登入 ERDDAP .
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. 以上 3 行, 依次從命令行執行時, 將您登入 ERDDAP . 要在文稿中使用, 您需要從第一行抓取 id\\_token , 將它輸入第二行, 並寫出一個 cookie , 以便由之後的行讀取 。
     
9. 要發展劇本, 執行第一個 (' 'https://accounts.google.com)   curl 直線與從開發工具复制的完全一樣,並抓取回應 (你可以得到 curl 旗子「 -2.0 」 的錯誤) . 在php中,它看起來像如下:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
使用 $id\\_token 執行第二行登入 Google, 首先移除「 - H’ Cookie: stuff 」 參數, 而是告訴 curl 寫作曲奇:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
登入到 ERDDAP™ ,再次移除“-H'Cookie: stuff”參數,并使用先前寫好的 cookie :
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
您現在應該可以用同樣的曲奇取得伺服器的資料 :
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
