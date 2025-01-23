---
title: "Access to Private Datasets"
---
# Dostęp do prywatnych zbiorów danych wERDDAP™

WieleERDDAP™Instalacje nie mają włączonego uwierzytelniania i w związku z tym nie zapewniają użytkownikom możliwości logowania się, nie mają też żadnych prywatnych zbiorów danych.

NiektóreERDDAP™instalacje mają włączone uwierzytelnianie. ObecnieERDDAP™Tylko obsługuje uwierzytelnianie poprzez konta pocztowe zarządzane przez Google-NOAAi wiele uniwersytetów. JeśliERDDAP™ma uwierzytelnianie włączone, każdy z Google- zarządzane konto e-mail może się zalogować, ale będą mieli tylko dostęp do prywatnych zbiorów danych, żeERDDAP™Administrator wyraźnie upoważnił ich do dostępu.

## Aktualizacja instrukcji{#updated-instructions} 

Niektóre z poniższych informacji są nieaktualne. Dopóki to nie zostanie zaktualizowane możesz użyć[ten blog post](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)dla ostatnich kroków na temat uzyskiwania danych z prywatnego zbioru danych ze skryptami.

## Ludzie z przeglądarkami{#humans-with-browsers} 

U ludziERDDAP™może się zalogowaćERDDAP™w przeglądarce w celu uzyskania dostępu do prywatnych zbiorów danych, do których mają dostęp.

Zaloguj się:

1. Kliknij na link logowania w lewym górnym rogu dowolnegoERDDAP™strona internetowa.
Jeśli nie ma logowania w link,ERDDAP™instalacja nie posiada autoryzacji i nie ma prywatnych zbiorów danych.
     
2. Kliknij przycisk Zaloguj się, aby zalogować się na konto Google.
Tekst przycisku powinien zmienić się na "Podpisany".
     
3. Kliknij na dziennikERDDAPPrzycisk.
Strona powinna się zmienić, aby powiedzieć Jesteś zalogowany jako *do Adres emailName* .
Jeśli nie, odczekaj 5 sekund i kliknij na dziennikERDDAPPrzycisk ponownie.
W skrajnych przypadkach, może trzeba poczekać i spróbować ponownie kilka razy.
     
4. Nie używaj przycisku Back przeglądarki. Użyj "ERDDAP"link na górze powyżej, a następnie użyć innych linków, aby przejść doERDDAP™strony, które Cię interesują. Jeśli strona internetowa mówi, że nie jesteś zalogowany, przeładuj stronę.
     

## Skrypt{#scripts} 

\\[Jest to nieznacznie zmienione na podstawie informacji dostarczonych przez Lynn DeWitt, która wykonała ciężką pracę, aby to rozgryźć. Lynn, dziękuję bardzo&#33;
Jeśli masz poprawki lub sugestie, prosimy wysłać e-mail erd.data @ noaa.gov.\\]

Można również zalogować się doERDDAP™i dostęp do prywatnych zbiorów danych za pomocą skryptu. Oto przykład, który wykorzystujecurl:

1. Instrukcje te zakładają, że używasz adresu gmail, gdzie nie jest włączone uwierzytelnianie 2- czynnika. Jeśli Twój główny adres gmail ma włączone uwierzytelnianie 2- czynnik, należy rozważyć utworzenie innego adresu gmail z uwierzytelnianiem 2- czynnik wyłączony.
     
2. Zaloguj się doERDDAP™ręcznie z adresem gmail chcesz używać w skrypcie i zaakceptować wszelkie wymagane uprawnienia, a następnie zalogować się całkowicie z powrotem.
     
3. Otwórz narzędzia programisty przeglądarki i przejdź do zakładki Sieć.
     
4. Kliknij naERDDAP™"Zaloguj się" link, a następnie przycisk "Zaloguj się" i wybierz odpowiedni adres e-mail, jeśli jest wyświetlony.
     
5. Po zmianie przycisku "Zaloguj się" na "Zarejestrowany", zakładka Sieć narzędzi programisty pokaże dwa wpisy, które wyglądają następująco (przykład z Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Użyj menu kontekstowego kliknij prawym przyciskiem myszy, aby "skopiować jako cURL" oba te urls i wklej je do zwykłego edytora tekstu
     
6. Kliknij na "Zaloguj sięERDDAP"przycisk i" skopiować jako CURL "link, który wygląda jak:
```
    login.html  
```
i wklej tę trzeciącurlpolecenie do pliku tekstowego.
     
7. W pliku tekstowym, masz teraz 3 wiersze, jak poniżej, gdzie zalogowano się doERDDAP™serwer na ' * https://host.somewhere.com/erddap * '. PierwszycurlPolecenie otrzymuje profil użytkownika w "login\\ _ hint" i generuje "id\\ _ token". Drugi używa id\\ _ token do logowania się do Google, a trzeci następnie loguje się doERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Powyższe 3 linie, po uruchomieniu kolejno z linii poleceń, zaloguje się doERDDAP. Aby użyć ich w skrypcie, musisz uchwycić id\\ _ token z pierwszej linii, podać go do drugiej linii i zapisać plik cookie do odczytu przez kolejne linie.
     
9. Aby opracować skrypt, uruchom pierwszy (' https://accounts.google.com )  curllinii dokładnie jak został skopiowany z narzędzi deweloperskich, i uchwycić odpowiedź (można dostaćcurlbłąd dotyczący flagi "-- 2.0" wystarczy usunąć) . W php wygląda następująco:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Zaloguj się do Google, wykonując drugą linię używając $id\\ _ token, najpierw usuwając parametr "-H 'Cookie: stuff'" i zamiast tego mówiąccurldo napisania pliku cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Zaloguj się doERDDAP™, ponownie usuwając parametr "-H 'Cookie: stuff'" i używając wcześniej napisanego pliku cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Należy teraz być w stanie zażądać danych z serwera, używając tego samego pliku cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
