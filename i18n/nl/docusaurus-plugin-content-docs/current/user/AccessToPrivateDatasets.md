---
title: "Access to Private Datasets"
---
# Toegang tot privégegevenssets inERDDAP™

VeelERDDAP™installaties hebben geen authenticatie ingeschakeld en bieden dus geen enkele manier om in te loggen, noch hebben ze privé datasets.

SommigeERDDAP™installaties hebben authenticatie ingeschakeld. Momenteel,ERDDAP™ondersteunt alleen authenticatie via Google-beheerde e-mailaccounts, waaronder e-mailaccounts opNOAAen vele universiteiten. IndienERDDAP™heeft authenticatie ingeschakeld, iedereen met een Google-beheerde e-mailaccount kan inloggen, maar ze hebben alleen toegang tot de privé datasets die deERDDAP™De beheerder heeft hen uitdrukkelijk gemachtigd om toegang te krijgen.

## Bijgewerkte instructies{#updated-instructions} 

Enkele van onderstaande informatie is verouderd. Totdat dit wordt bijgewerkt kunt u gebruiken[deze blog post](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)voor recente stappen op het verkrijgen van gegevens uit een private dataset met scripts.

## Mensen met browsers{#humans-with-browsers} 

Menselijke gebruikersERDDAP™kan inloggenERDDAP™in een browser om toegang te krijgen tot private datasets die zij mogen gebruiken.

Aanmelden:

1. Klik op de log in link in de linkerbovenhoek van eenERDDAP™webpagina.
Als er geen log-in link, deERDDAP™installatie heeft geen authenticatie ingeschakeld en er zijn geen privé datasets.
     
2. Klik op de knop Inloggen om in te loggen op uw Google-account.
De tekst van de knop moet veranderen in "Ingelogd."
     
3. Klik op de Log inERDDAPButton.
De webpagina moet veranderen om te zeggen U bent ingelogd als *uw E-mailadres* .
Als het niet, wacht 5 seconden en klik op de Log inERDDAPNog een keer.
In extreme gevallen moet je misschien wachten en dan een paar keer opnieuw proberen.
     
4. Gebruik je browser's Back-knop niet. Gebruik de "ERDDAP" link aan de bovenkant van het bovenstaande, gebruik dan andere links naarERDDAP™pagina's waarin je geïnteresseerd bent. Als een cached webpagina zegt dat je niet bent ingelogd, herlaad dan de pagina.
     

## Scripts{#scripts} 

\\[Dit is enigszins aangepast aan de informatie van Lynn DeWitt, die het moeilijke werk heeft gedaan om dit uit te zoeken. Lynn, hartelijk bedankt&#33;
Als u correcties of suggesties, e-mail erd.data @ noaa.gov .\\]

Het is ook mogelijk om in te loggen opERDDAP™en toegang tot privé datasets via een script. Hier is een voorbeeld datcurl:

1. Deze instructies gaan ervan uit dat u een gmail adres gebruikt waar de 2-factor authenticatie niet is ingeschakeld. Als uw hoofdgmail adres 2-factor authenticatie ingeschakeld heeft, overweeg dan om een ander gmail adres aan te maken met 2-factor authenticatie uitgeschakeld.
     
2. AanmeldenERDDAP™handmatig met het gmail adres dat u wilt gebruiken in uw script en accepteer alle benodigde machtigingen en log dan volledig terug uit.
     
3. Open de browser Developer Tools en ga naar het tabblad Netwerk.
     
4. Klik op deERDDAP™"Inloggen" link, dan de "Inloggen" knop en kies het juiste e-mailadres indien gevraagd.
     
5. Na de knop "Inloggen" verandert in "Ingelogd" zal het tabblad Ontwikkelingshulpmiddelen Netwerk twee items tonen die eruit zien als het volgende (voorbeeld van Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Gebruik de muis rechts-klik context menu om "kopiëren als cURL" beide van deze urls en plak ze in een platte tekst-editor
     
6. Klik op de "Log inERDDAP" knop en "kopieer als cURL" de link die eruit ziet als:
```
    login.html  
```
en plak deze derdecurlcommando in het tekstbestand.
     
7. In het tekstbestand heb je nu 3 regels zoals het volgende, waar je bent ingelogd in eenERDDAP™server bij ' * https://host.somewhere.com/erddap * '. De eerstecurlcommando krijgt uw gebruikersprofiel in "login\\_hint" en genereert een "id\\_token." De tweede gebruikt de id\\_token om in te loggen op Google, en de derde dan logt in opERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. De bovenstaande 3 regels, wanneer uitgevoerd achtereenvolgens vanaf een opdrachtregel, zal u inloggenERDDAP. Om deze in een script te gebruiken moet je de id\\_token van de eerste regel vastleggen, het naar de tweede regel voeren en een cookie schrijven die door volgende regels gelezen moet worden.
     
9. Om een script te ontwikkelen, voer het eerste uit (' https://accounts.google.com )  curllijn precies zoals het werd gekopieerd uit de ontwikkelaar tools, en vastleggen van de reactie (U kunt eencurlfout bij de vlag "--2.0" gewoon verwijderen) . In php ziet het er als volgt uit:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Log in op Google door de tweede regel uit te voeren met $id\\_token, eerst de parameter "-H 'Cookie: stuff' te verwijderen en in plaats daarvan te vertellencurlom een cookie te schrijven:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
AanmeldenERDDAP™, het opnieuw verwijderen van de parameter "-H 'Cookie: stuff', en het gebruik van de eerder geschreven cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Je zou nu gegevens van de server moeten kunnen opvragen met dezelfde cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
