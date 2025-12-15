---
title: "Access to Private Datasets"
---
# 访问私人数据集 ERDDAP™ 

许多 ERDDAP™ 设备没有启用认证功能,因此没有为用户提供登录的任何方式,也没有任何私人数据集.

有点 ERDDAP™ 设备确实启用了认证。 目前, ERDDAP™ 只支持通过谷歌管理的电子邮件账户进行认证,其中包括电子邮件账户。 NOAA 还有许多大学 如果出现 ERDDAP™ 已启用认证, 任何拥有 Google 管理电子邮件账户的人都可以登录, 但他们只能访问私人数据集 。 ERDDAP™ 管理员明确授权他们访问.

## 更新指令{#updated-instructions} 

以下部分资料已过时. 在更新之前, 您可以使用 [这篇博客文章](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) 用于最近从带有脚本的私有数据集获取数据的步骤。

## 有浏览器的人类{#humans-with-browsers} 

人类使用者 ERDDAP™ 可以登录到 ERDDAP™ 在浏览器中,以便访问他们被授权访问的私人数据集。

要登录 :

1. 单击任何链接左上角的日志 ERDDAP™ 网页。
如果没有链接日志,则 ERDDAP™ 安装没有启用认证,也没有私人数据集。
     
2. 点击按钮中的标志以签名进入您的 Google 账户 。
按钮的文本应更改为"签入".
     
3. 点击日志进入 ERDDAP 按钮。
网页应更改为: 您被登录为 *您的电话 电子邮件地址* 。 。 。 。
如果没有,请等待5秒,点击日志进入 ERDDAP 按钮。
在极端的情况下,你可能需要等待,然后再尝试几次.
     
4. 不要使用浏览器的后键. 使用 " ERDDAP " 上方的链接,然后使用其他链接 ERDDAP™ 您感兴趣的页面。 如果一个缓存网页说你没有登录,就重新装入页面.
     

## 脚本{#scripts} 

 \\[ 这从Lynn DeWitt提供的信息中略微修改了一下,他努力地想出了这个问题。 琳恩,非常感谢&#33;
如需更正或建议,请发电子邮件至erd.data@noaa.gov。 \\] 

也可以登录到 ERDDAP™ 通过脚本访问私人数据集。 这里有一个例子可以使用 curl 数字 :

1. 这些指令假设您正在使用 gmail 地址, 其中 2 因素认证没有打开 。 如果您的主要 gmail 地址已打开 2 因素认证, 请考虑 创建另一个 gmail 地址, 关闭 2 因素认证 。
     
2. 登录到 ERDDAP™ 手动使用您想要在您的脚本中使用的 gmail 地址, 并接受所需的权限, 然后完全返回日志 。
     
3. 打开浏览器开发工具,然后转到网络标签。
     
4. 点击 ERDDAP™ "log in" 链接,然后是"Sign in"按钮,如果被提示则选择适当的电子邮件地址.
     
5. 在将“ 签名” 按钮修改为“ 签名” 之后, 开发者工具网络标签将显示两个类似以下的条目 (来自 Firefox 的实例) 数字 :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
使用鼠标右键单击上下文菜单“ 复制为 cURL ” 这两个 urls 并粘贴到纯文本编辑器中
     
6. 点击“日志” ERDDAP "按钮和"复制为cURL"的链接看起来像:
```
    login.html  
```
粘贴这第三个 curl 命令输入文本文件。
     
7. 在文本文件中,您现在会有如下3行,您已经登录到一个 ERDDAP™ 服务器 : *https://host.somewhere.com/erddap* ' '. 第一个 curl 命令在“loginQQhint”中获取用户配置,并生成“idQQtoken”。 第二集使用 id\\_token 登录到 Google, 第三集登录到 ERDDAP 。 。 。 。
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. 以上3行,从命令行依次运行时,将登录您 ERDDAP 。 。 。 为了在脚本中使用这些,您需要从第一行中捕捉 idQQtoken,将其输入第二行,并写一个cookie,供后续行阅读.
     
9. 要开发一个脚本, 运行第一个 ( 'https://accounts.google.com)   curl 线条与开发工具复制时完全相同,并抓取响应 (你可能会得到一个 curl 关于旗帜“ -2.0” 的错误只需删除) 。 。 。 在php中,它看起来像如下:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
使用 $id\\_token 执行第二行登录到 Google, 首先删除“-H'Cookie: stuff” 参数, 转而告诉 curl 来写饼干 :
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
登录到 ERDDAP™ ,再次删除“-H'Cookie: stuff”参数,并使用先前写的 cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
您现在应该能够使用同样的 cookie 请求服务器的数据 :
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
