---
title: "Access to Private Datasets"
---
# Tilgang til private datasett i ERDDAP™ 

Mange ERDDAP™ installasjoner har ikke autentisering aktivert og dermed ikke gi noen måte for brukere å logge inn, og de har heller ikke private datasett.

Noen ERDDAP™ installasjoner har autentisering aktivert. I dag, ERDDAP™ bare støtter autentisering via Google-styrte e-postkontoer, som inkluderer e-postkontoer på NOAA og mange universiteter. Hvis en ERDDAP™ har autentisering aktivert, alle med en Google-styrt e-postkonto kan logge på, men de vil bare ha tilgang til private datasett som ERDDAP™ administrator har eksplisitt autorisert dem til tilgang.

## Oppdaterte instruksjoner{#updated-instructions} 

Noen av opplysningene nedenfor er utdatert. Inntil dette blir oppdatert kan du bruke [denne bloggen](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) for nylige trinn for å få data fra et privat datasett med skript.

## Mennesker med nettlesere{#humans-with-browsers} 

Menneskelige brukere av ERDDAP™ kan logge inn ERDDAP™ i en nettleser for å få tilgang til private datasett som de er autorisert til å få tilgang til.

Logg inn:

1. Klikk på loggen i linken øverst til venstre for noen ERDDAP™ Nettside.
Hvis det ikke er logg i link, ERDDAP™ installasjonen har ikke autentisering aktivert, og det er ingen private datasett.
     
2. Klikk på Logg på knappen for å logge på Google-kontoen din.
Teksten på knappen bør endres til " Signert i".
     
3. Klikk på Logg inn ERDDAP knapp.
Nettsiden bør endres til å si Du er logget på som *din E-postadresse* ..
Hvis det ikke gjør det, vent 5 sekunder og klikk på Logg på ERDDAP knappen igjen.
I ekstreme tilfeller må du kanskje vente og prøve igjen noen ganger.
     
4. Ikke bruk ryggknappen til nettleseren. Bruk " ERDDAP " lenke øverst i ovennevnte, og bruk deretter andre lenker til å gå til ERDDAP™ sider du er interessert i. Hvis en cached webside sier at du ikke er logget på, last på siden.
     

## Skript{#scripts} 

 \\[ Dette er litt endret fra informasjon gitt av Lynn DeWitt, som gjorde den harde jobben med å finne ut dette. Takk, Lynn&#33;
Hvis du har rettelser eller forslag, vennligst e-post erd.data @ noaa.gov . \\] 

Det er også mulig å logge på ERDDAP™ og tilgang til private datasett via et skript. Her er et eksempel som bruker curl :)

1. Disse instruksjonene antar at du bruker en gmail-adresse der 2-faktor-autentisering ikke er slått på. Hvis din viktigste gmail-adresse har 2-faktor-autentisering slått på, bør du vurdere å opprette en annen gmail-adresse med 2-faktor-autentisering slått av.
     
2. Logg inn ERDDAP™ manuelt med gmail-adressen du vil bruke i skriptet og aksepterer alle tillatelser som kreves, og logg deretter helt ut igjen.
     
3. Åpne nettleserutviklerverktøyene og gå til nettverksfanen.
     
4. Klikk på ERDDAP™ Logg på" lenke, deretter " Logg på" knappen og velg riktig e-postadresse hvis du blir bedt om det.
     
5. Etter changesLogg inn"-knappen endres til " Signert", vil Utviklerverktøynettverksfanen vise to oppføringer som ligner på følgende (eksempel fra Firefox) :)
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Bruk høyreklikk-menyen for å kopiere som cURL" begge disse URL-ene og lime dem inn i en vanlig tekstredigering
     
6. Klikk på loggen ERDDAP " knapp og "kopier som cURL" lenken som ser ut som:
```
    login.html  
```
og lim inn denne tredje curl kommando i tekstfilen.
     
7. I tekstfilen vil du nå ha 3 linjer som følger, der du har logget på en ERDDAP™ server på ' *https://host.somewhere.com/erddap* '. Den første curl kommando får din brukerprofil i " login\\_hint" og genererer en "id\\_token". Den andre bruker id-_token til å logge inn på Google, og den tredje logger seg deretter på ERDDAP ..
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. De ovennevnte tre linjene, når du kjører sekvensielt fra en kommandolinje, vil logge deg inn ERDDAP .. For å bruke disse i et skript må du fange id-_token fra den første linjen, mate den til den andre linjen og skrive en informasjonskapsel som skal leses av påfølgende linjer.
     
9. For å utvikle et skript, kjører du det første (\"https://accounts.google.com)   curl linje nøyaktig som den ble kopiert fra utviklerverktøyene, og fange responsen (Du kan få en curl feil om flagget ---2.0 - bare fjern det) .. I php ser det ut som følgende:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Logg inn på Google ved å utføre den andre linjen ved å bruke $id\\_token, først fjerne  "-H \"cookies: ting\" - parameter og i stedet fortelle curl å skrive en cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Logg inn ERDDAP™ , igjen å fjerne  "-H \"cookies: ting\" -parameteren, og bruke den tidligere skriftlige informasjonskapselen:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Du bør nå kunne be om data fra serveren ved å bruke den samme informasjonskapselen:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
