---
title: "Access to Private Datasets"
---
# Доступ к частным наборам данных вERDDAP™

МногиеERDDAP™Установки не имеют возможности аутентификации и, таким образом, не предоставляют пользователям никакого способа входа в систему, а также не имеют каких-либо частных наборов данных.

НекоторыеERDDAP™Установки имеют возможность аутентификации. В настоящее времяERDDAP™поддерживает аутентификацию только через управляемые Google учетные записи электронной почты, которые включают учетные записи электронной почты вNOAAи многие университеты. ЕслиERDDAP™имеет включенную аутентификацию, любой, у кого есть учетная запись электронной почты, управляемая Google, может войти в систему, но у них будет доступ только к частным наборам данных, которыеERDDAP™Администратор явно разрешил им доступ.

## Обновленные инструкции{#updated-instructions} 

Часть приведенной ниже информации устарела. Пока это не будет обновлено, вы можете использовать[Этот блог пост](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)Последние шаги по получению данных из частного набора данных со скриптами.

## Люди с браузерами{#humans-with-browsers} 

Человеческие пользователиERDDAP™может войти вERDDAP™в браузере для получения доступа к частным наборам данных, к которым они имеют право доступа.

Для входа:

1. Нажмите на входную ссылку в верхнем левом углу любойERDDAP™Веб-страница.
Если нет входа в систему, тоERDDAP™Установка не включает аутентификацию, и нет частных наборов данных.
     
2. Нажмите на кнопку «Подписаться», чтобы войти в свою учетную запись Google.
Текст кнопки должен измениться на «Подпись».
     
3. Щелкните по входуERDDAPКнопка.
Сайт должен измениться, чтобы сказать Вы вошли в систему как *твой Адрес электронной почты* .
Если нет, подождите 5 секунд и нажмите на вход.ERDDAPОпять кнопка.
В крайних случаях вам, возможно, придется подождать, а затем попробовать еще раз.
     
4. Не используйте кнопку Back вашего браузера. Используйте "ERDDAP"ссылка сверху выше, затем используйте другие ссылки для перехода наERDDAP™Страницы, которые вас интересуют. Если кэшированная веб-страница говорит, что вы не вошли в систему, перезагрузите страницу.
     

## Сценарии{#scripts} 

\\[Это немного изменено из информации, предоставленной Линн ДеВитт, которая сделала тяжелую работу, чтобы выяснить это. Линн, большое спасибо&#33;
Если у вас есть исправления или предложения, пожалуйста, напишите erd.data @ noaa.gov.\\]

Также можно войти вERDDAP™Доступ к частным наборам данных через скрипт. Вот пример, который используетcurl:

1. Эти инструкции предполагают, что вы используете адрес электронной почты, где не включена 2-факторная аутентификация. Если ваш основной адрес gmail включает 2-факторную аутентификацию, рассмотрите возможность создания другого адреса gmail с отключенной 2-факторной аутентификацией.
     
2. Войти внутрьERDDAP™вручную с адресом электронной почты, который вы хотите использовать в своем сценарии, и принимать любые необходимые разрешения, а затем полностью выйти из системы.
     
3. Откройте браузер Developer Tools и перейдите на вкладку Network.
     
4. Нажмите наERDDAP™Ссылка «log in», затем кнопка «Sign in» и выберите подходящий адрес электронной почты, если будет предложено.
     
5. После изменения кнопки «Подписаться» на «Подписаться», вкладка «Инструменты разработчика» покажет две записи, которые выглядят следующим образом: (Пример из Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Используйте контекстное меню правого клика мыши, чтобы «копировать как cURL» оба этих URL-адреса и вставить их в простой текстовый редактор.
     
6. Кликните на "Загляните вERDDAP"кнопка" и "копировать как cURL" ссылка, которая выглядит так:
```
    login.html  
```
и вставить третьюcurlВведите команду в текстовый файл.
     
7. В текстовом файле теперь у вас будет 3 строки, такие как:ERDDAP™Сервер в '' * https://host.somewhere.com/erddap * '. ПервыйcurlКоманда получает профиль пользователя в «login\\_hint» и генерирует «id\\_token». Второй использует id\\_token для входа в Google, а третий затем входит в систему.ERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Вышеуказанные 3 строки при последовательном запуске из командной строки войдут в системуERDDAP. Для того, чтобы использовать их в скрипте, вам нужно захватить id\\_token с первой строки, послать его на вторую строку и написать файл cookie для чтения последующими строками.
     
9. Чтобы разработать сценарий, запустите первый (" https://accounts.google.com )  curlстроку точно так же, как она была скопирована с инструментов разработчика, и фиксировать ответ (Вы можете получить AcurlОшибка о флаге "--2.0" просто уберите его) . В php это выглядит так:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Войдите в Google, выполнив вторую строку с помощью $id\\_token, сначала удалив параметр «-H ‘Cookie: stuff» и вместо этого сообщивcurlЧтобы написать печенье:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Войти внутрьERDDAP™, снова удаляя параметр "-H 'Cookie: stuff" и используя ранее написанный файл cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Теперь вы можете запрашивать данные с сервера, используя тот же файл cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
