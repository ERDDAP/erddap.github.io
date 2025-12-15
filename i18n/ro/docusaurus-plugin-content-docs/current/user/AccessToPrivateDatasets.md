---
title: "Access to Private Datasets"
---
# Accesul la date private în ERDDAP™ 

Multe ERDDAP™ instalațiile nu au activat autentificarea și, prin urmare, nu oferă utilizatorilor nicio modalitate de a se conecta, nici nu au seturi de date private.

Unele ERDDAP™ instalațiile au activat autentificarea. În prezent, ERDDAP™ numai acceptă autentificarea prin intermediul conturilor de e-mail gestionate de Google, care include conturi de e-mail la NOAA şi multe universităţi. Dacă ERDDAP™ a activat autentificarea, oricine cu un cont de e-mail gestionat Google se poate conecta, dar va avea acces doar la seturile de date private pe care ERDDAP™ Administratorul le-a autorizat în mod explicit accesul.

## Instrucțiuni actualizate{#updated-instructions} 

Unele dintre informaţiile de mai jos sunt depăşite. Până când acest lucru devine actualizat puteți utiliza [acest post blog](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) pentru etapele recente privind obținerea datelor dintr-un set de date privat cu scripturi.

## Oameni cu browsere{#humans-with-browsers} 

Utilizatorii umani ai ERDDAP™ se pot conecta la ERDDAP™ într-un browser pentru a avea acces la seturile de date private pe care acestea sunt autorizate să le acceseze.

Pentru a vă conecta:

1. Faceți clic pe log în link-ul din stânga sus a oricăruia ERDDAP™ Pagina web.
Dacă nu există niciun log în link, ERDDAP™ instalarea nu are activată autentificarea și nu există seturi de date private.
     
2. Faceți clic pe butonul Sign in pentru a vă conecta în contul Google.
Textul butonului trebuie schimbat în "Semnat."
     
3. Faceți clic pe jurnal în ERDDAP buton.
Pagina web ar trebui să se schimbe pentru a spune Te-ai logat ca *dumneavoastră Adresa de e-mail* .
Dacă nu, așteptați 5 secunde și faceți clic pe jurnal în ERDDAP din nou.
În cazuri extreme, va trebui să așteptați și apoi încercați din nou de câteva ori.
     
4. Nu folosi butonul din spate al browser-ului. Utilizați " ERDDAP " link la partea de sus a celor de mai sus, apoi utilizaţi alte link-uri pentru a merge la ERDDAP™ pagini care vă interesează. Dacă o pagină web cache spune că nu sunt înregistrate în, reîncărcați pagina.
     

## Scripturi{#scripts} 

 \\[ Acest lucru este ușor modificat din informațiile furnizate de Lynn DeWitt, care a făcut treaba grea de imaginind acest lucru. Lynn, mulţumesc foarte mult&#33;
Dacă aveți corecturi sau sugestii, vă rugăm să trimiteți erd.data @ noaa.gov. \\] 

De asemenea, este posibil să vă conectați la ERDDAP™ și accesează seturi de date private prin intermediul unui scenariu. Iată un exemplu care folosește curl :

1. Aceste instrucțiuni presupun că utilizați o adresă de gmail unde autentificarea 2 factori nu este activată. În cazul în care adresa dvs. principală de gmail are 2 factori de autentificare pornit, ia în considerare crearea unei alte adrese de gmail cu 2 factori de autentificare oprit.
     
2. Autentifică-te la ERDDAP™ manual cu adresa de gmail pe care doriți să o utilizați în script și să acceptați orice permisiuni necesare, apoi să vă logați complet înapoi.
     
3. Deschide browserul Instrumente Dezvoltator, și du-te la fila de rețea.
     
4. Click pe ERDDAP™ link-ul "log in," apoi butonul "Semneaza" si alege adresa de e-mail corespunzatoare daca este solicitata.
     
5. După ce butonul "Semnează" se schimbă la "Semnat în," tab-ul Developer Tools Network va arăta două intrări care arată ca următoarele (exemplu de la Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Utilizați meniul contextului mouse-ului click-dreapta pentru a "copy as cURL" ambele dintre aceste urli și le lipi într-un editor text simplu
     
6. Faceți clic pe "Log în ERDDAP " buton și "copie ca CURL" link-ul care arata ca:
```
    login.html  
```
si lipi aceasta a treia curl comanda în fișierul text.
     
7. În fişierul text, veţi avea acum 3 linii ca următoarele, în cazul în care aţi autentificat într-un ERDDAP™ server la ' *https://host.somewhere.com/erddap* '. Primul curl comanda devine profilul de utilizator în "login\\_int" și generează un "id\\_token." Al doilea folosește id\\_token pentru a se conecta la Google, iar al treilea apoi se conectează la ERDDAP .
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Cele 3 linii de mai sus, atunci când rulați secvențial de la o linie de comandă, vă va conecta în ERDDAP . Pentru a le folosi într-un script trebuie să capturați id\\_token-ul de la prima linie, să-l alimentați la a doua linie și să scrieți un cookie care să fie citit după replicile ulterioare.
     
9. Pentru a dezvolta un scenariu, executați primul ('https://accounts.google.com)   curl linie exact așa cum a fost copiat din instrumentele dezvoltatorului, și captura răspunsul (este posibil să aveţi curl eroare despre steagul "-2.0" doar scoate-l) . În php se pare ca urmatoarele:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Autentifică-te pe Google prin executarea celei de-a doua linii folosind $id\\_token, în primul rând eliminarea parametrului "-H "Cookie: chestii" și în schimb spunând curl pentru a scrie un cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Autentifică-te la ERDDAP™ , din nou eliminarea parametrului "-H 'Cookie: chestie' și utilizarea cookie-ului scris anterior:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Acum ar trebui să puteți solicita date de pe server, folosind același cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
