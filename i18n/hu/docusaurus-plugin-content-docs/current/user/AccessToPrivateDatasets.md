---
title: "Access to Private Datasets"
---
# Hozzáférés a privát adatbázisokhozERDDAP™

SokERDDAP™A telepítések nem rendelkeznek hitelesítéssel, és így nem nyújtanak semmilyen lehetőséget a felhasználók számára a bejelentkezéshez, és nincs magánadatbázisuk.

NéhányERDDAP™a telepítések engedélyezett hitelesítés. Jelenleg,ERDDAP™csak a Google által irányított e-mail fiókokon keresztül támogatja a hitelesítést, amely magában foglalja az e-mail fiókokatNOAAés sok egyetem. Ha egyERDDAP™hitelesítést engedélyezett, bárki, aki egy Google által irányított e-mail fiókkal rendelkezik, bejelentkezhet, de csak hozzáférést biztosít a magánadatokhoz, amelyeket aERDDAP™Az adminisztrátor kifejezetten engedélyezte a hozzáférést.

## Frissített utasítások{#updated-instructions} 

Az alábbi információk némelyike a dátumból származik. Amíg ez frissül, használhatja[Ez a blogbejegyzés](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)a legutóbbi lépések a személyes adatkészletből származó adatok írásokkal.

## Emberek a böngészőkkel{#humans-with-browsers} 

Emberi felhasználókERDDAP™BejelentkezhetERDDAP™egy böngészőben annak érdekében, hogy hozzáférjenek a személyes adatkészletekhez, amelyeket engedélyeznek a hozzáférésre.

Bejelentkezés:

1. Kattintson a naplóra linken a felső baloldalon mindenERDDAP™weboldal.
Ha nincs log a linkben, aERDDAP™A telepítés nem rendelkezik hitelesítéssel, és nincsenek magánadatok.
     
2. Kattintson a jelre a gombban, hogy írjon alá a Google fiókjába.
A gomb szövegének meg kell változtatnia a "Bejelentkezve".
     
3. Kattintson a bejelentkezésreERDDAPgomb.
A weboldalnak meg kell változtatnia azt, hogy Bejelentkezik, mint *Te EmailAddress* ...
Ha nem, várjon 5 másodpercet, és kattintson a BejelentkezésreERDDAPgomb újra.
Szélsőséges esetekben lehet, hogy várni kell, majd próbálja meg újra néhányszor.
     
4. Ne használja a böngésző Vissza gombját. Használja a "ERDDAP"A fenti tetején lévő link, majd más linkeket használjon, hogy menjenERDDAP™Az Ön érdekelt oldalak. Ha egy csípős weboldal azt mondja, hogy nem jelentkezik be, töltse ki az oldalt.
     

## Szövegek{#scripts} 

\\[Ez kissé módosított a Lynn DeWitt által szolgáltatott információkból, akik ezt kitalálták. Lynn, nagyon köszönöm&#33;
Ha korrekciók vagy javaslatok, kérjük e-mail erd.data @ noaa.gov.\\]

Lehetséges bejelentkezniERDDAP™és hozzáférhet a privát adatkészletekhez egy szkripten keresztül. Íme egy példa, amely használjacurl:

1. Ezek az utasítások azt feltételezik, hogy olyan gmail címet használ, ahol a 2-faktoros hitelesítés nem fordul elő. Ha a fő gmail címe 2-faktoros hitelesítés fordult, fontolja meg, hogy létrehoz egy másik gmail címet 2-faktoros hitelesítéssel.
     
2. BejelentkezésERDDAP™manuálisan az Ön által a forgatókönyvben kívánt gmail címmel, és fogadjon el minden szükséges engedélyt, majd jelentkezzen be teljesen.
     
3. Nyissa meg a böngésző fejlesztői eszközöket, és menjen a hálózati lapra.
     
4. Kattintson aERDDAP™"log in" link, majd a "Bejelentkezés" gomb, és válassza ki a megfelelő e-mail címet, ha ugor.
     
5. Miután a "Jelentés" gomb "Bejelentkezett", a Fejlesztő Eszközök Hálózat lap két bejegyzést mutat, amelyek úgy néznek ki, mint a következő (Például a Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Használja az egér jobb kattintásos kontextus menüjét, hogy "másolja a URL-t" mindkét késztetést, és egy egyszerű szövegszerkesztőbe helyezze őket
     
6. Kattintson a "Log intoERDDAP" gomb és "másolni, mint a CURL" a link, amely úgy néz ki, mint:
```
    login.html  
```
és pasztálja ezt a harmadikatcurlparancsot a szövegfájlba.
     
7. A szövegfájlban most 3 sor van, mint a következő, ahol bejelentett egyERDDAP™szerver a " * https://host.somewhere.com/erddap * "..." Az elsőcurlA parancs a felhasználói profilját a "login\\_hint"-ban kapja, és létrehoz egy "id\\_token"-t. A második használja az id\\_token-t, hogy bejelentkezzen a Google-ba, a harmadik pedig bejelentkezikERDDAP...
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. A fenti 3 sorok, amikor sorrendben futnak egy parancssorból, belépnekERDDAP... Annak érdekében, hogy ezeket egy szkriptben használja, meg kell ragadnia az id\\_token-t az első sorból, táplálja a második sorba, és írjon egy cookie-t, amelyet későbbi sorok olvasnak.
     
9. Egy forgatókönyv kidolgozása, futtassa az elsőt ("..." https://accounts.google.com )  curlpontosan úgy, ahogy a fejlesztői eszközökből másolták, és elfoglalták a választ (Lehet, hogy kapsz egycurlhiba a "--2.0" zászlóról csak távolítsa el) ... A php-ben úgy néz ki, mint a következők:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Jelentkezzen be a Google-ba azáltal, hogy végrehajtja a második sort a $id\\_token használatával, először eltávolítja a "H"Cookie: cucc" paramétert, és inkább azt mondja, hogycurlírni egy sütit:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
BejelentkezésERDDAP™, ismét eltávolítja a "H "Cookie: cucc" paramétert, és a korábban írott cookie használatával:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Most képesnek kell lennie arra, hogy adatokat kérjen a szervertől, ugyanazt a cookie-t használja:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
