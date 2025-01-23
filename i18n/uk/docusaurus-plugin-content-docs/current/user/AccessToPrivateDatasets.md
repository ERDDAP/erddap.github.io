---
title: "Access to Private Datasets"
---
# Доступ до приватних даних вERDDAP™

БагатоERDDAP™Ввімкніть налаштування, не ввімкнено, і, таким чином, не надайте ніякого способу для входу в систему, а не у них є будь-які приватні дані.

ЩоERDDAP™Увімкнено встановлення. В даний часERDDAP™тільки підтримує автентифікацію через облікові записи електронної пошти Google, які включають облікові записи електронної пошти вNOAAі багато університетів. ЯкщоERDDAP™Увімкнено автентифікацію, будь-який з обліковим записом електронної пошти Google-managed можна увійти, але вони матимуть доступ до персональних даних, які містяться в тому, що обліковий запис електронної пошти Google-managed може увійти в систему, але вони матимуть лише доступ до особистих даних, які містяться в Інтернеті.ERDDAP™Адміністратор чітко уповноважений їм доступ.

## Оновлена інструкція{#updated-instructions} 

Деякі дані нижче з дати. До цього оновлення можна використовувати[Веб-сайт](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)за останні кроки щодо отримання даних з приватного облікового запису з скриптами.

## Люди з браузерами{#humans-with-browsers} 

Люди людиниERDDAP™УвійтиERDDAP™для отримання доступу до персональних даних, які вони уповноважені на доступ.

Для входу в систему:

1. Натисніть на колоду за посиланням у верхній зліва від будь-якогоERDDAP™Веб-сайт
Якщо немає входу в посилання,ERDDAP™Встановлення не містить автентифікацій, і не існує приватних даних.
     
2. Клацніть на кнопку Вхід в обліковий запис Google.
Текст гудзики повинен змінитися до "Підпису".
     
3. Натисніть на УвійтиERDDAPкнопка.
Сторінка повинна змінитися Ви увійти, як *Ваше ім'я Електронна пошта* й
Якщо це не, почекайте 5 секунд і натисніть на ЛогERDDAPкнопка знову.
У крайніх випадках можна почекати, а потім спробувати знову кілька разів.
     
4. Не використовуйте кнопку «Задня» браузера. Використовуйте "ERDDAP"посилання на вершину вище, потім використовуйте інші посилання, щоб перейти доERDDAP™Вас цікавить. Якщо ви не ввійшли, перевантажте сторінку.
     

## Списки{#scripts} 

\\[Це трохи модифіковано з інформації, що надається компанією Lynn DeWitt, яка зробила важкою роботою з фігурою. Низький, спасибі вам дуже багато&#33;
Якщо у вас є виправлення або пропозиції, будь ласка, email erd.data @ noaa.gov .\\]

Також можна увійти в системуERDDAP™і доступ до приватних даних через скрипт. Ось приклад, який використовуєcurl:

1. Ці вказівки припускають, що ви використовуєте адресу електронної пошти, де не вимкнено 2-факторну автентифікацію. Якщо ваша головна адреса електронної пошти має 2-факторну автентифікацію, розгляньте створення іншої адреси з 2-факторною автентичністю.
     
2. УвійтиERDDAP™ручний з gmail адрес, який ви хочете використовувати в вашому скрипті і приймати будь-які дозволи, необхідні, після чого увійти повністю назад.
     
3. Відкрийте інструменти розробника веб-переглядача та перейдіть на вкладку мережі.
     
4. Натисніть наERDDAP™"log in" link, потім натисніть кнопку "Підписатись" і виберіть відповідну адресу електронної пошти, якщо запитати.
     
5. Після зміни кнопки "Підписатися" на кнопку "Підписатися", закладку Розробник Tools Network покаже два записи, які виглядають як: (Приклад з Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Використовуйте контекстне меню миші для "копії як CURL" як з цих URL-адрес та вставте їх у звичайний текстовий редактор
     
6. Натисніть на кнопку "Ввійти"ERDDAP"кнопка і "копія як cURL" посилання, яка виглядає як:
```
    login.html  
```
і вставте цю третинуcurlкоманда в текстовий файл.
     
7. У текстовому файлі ви тепер будете мати 3 лінії, такі як:ERDDAP™сервер на ' * https://host.somewhere.com/erddap * Р. ПершийcurlКоманда отримує ваш профіль користувача в "login\\_hint" і генерує "id\\_token". Другий використовує id\\_token, щоб увійти в Google, і третій потім увійти в системуERDDAPй
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Наведені вище 3 лінії, при запуску послідовно з командного рядка, ввійдуть васERDDAPй Для того, щоб використовувати ці в скрипті, потрібно захопити ідентифікатор\\_token з першого рядка, подавати його в другу лінію, і написати cookie, щоб читатися наступними лініями.
     
9. Щоб розробити скрипт, запустіть перший (Р https://accounts.google.com )  curlточно так, як це було скопійовано з інструментів розробника, і захоплення відповіді (Ви можете отриматиcurlпомилка про прапор "-2.0" просто видаліть його) й У php він виглядає наступним чином:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Увійти в Google, виконавши другий рядок за допомогою $id\\_token, спочатку знімаючи параметр "-H "Cookie: stuff" і замість того, щоб розповістиcurlписати cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
УвійтиERDDAP™, знову видаляючи параметр "-H "Cookie: речі" і використовуючи раніше записаний cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Ви повинні мати можливість запитувати дані з сервера, використовуючи той же cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
