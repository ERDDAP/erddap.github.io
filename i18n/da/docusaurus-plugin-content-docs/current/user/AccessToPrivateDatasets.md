---
title: "Access to Private Datasets"
---
# Adgang til private datasæt iERDDAP™

Mange mangeERDDAP™installationer har ikke godkendelse aktiveret, og giver dermed ingen måde for brugere at logge ind, og de har heller ikke private datasæt.

Nogle af nogleERDDAP™installationer har godkendelse aktiveret. I øjeblikket,ERDDAP™understøtter kun godkendelse via Google-managed e-mailkonti, som indeholder e-mailkonti påNOAAog mange universiteter. Hvis enERDDAP™har godkendelse aktiveret, alle med en Google-managed-mailkonto kan logge ind, men de vil kun have adgang til de private datasæt, som de har adgang tilERDDAP™Administrator har udtrykkeligt godkendt dem til at få adgang.

## Opdateret vejledning{#updated-instructions} 

Nogle af nedenstående oplysninger er forældet. Indtil dette bliver opdateret kan du bruge[Denne blog indlæg](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)for de seneste trin om at få data fra et privat datasæt med scripts.

## Mennesker med browsere{#humans-with-browsers} 

Menneskelige brugere afERDDAP™kan logge indERDDAP™i en browser for at få adgang til private datasæt, som de er autoriseret til at få adgang til.

Log ind:

1. Klik på log ind i linket øverst til venstreERDDAP™webside.
Hvis der ikke er log på link, er linketERDDAP™installation har ikke godkendelse aktiveret, og der er ingen private datasæt.
     
2. Klik på knappen Log på for at logge ind på din Google-konto.
Knapets tekst skal ændres til "Loget i".
     
3. Klik på Log indERDDAPknappen.
Websiden skal ændre sig for at sige Du er logget ind som *Dit din egen EmailAddress* .
Hvis det ikke gør, skal du vente 5 sekunder og klikke på Log indERDDAPknappen igen.
I ekstreme tilfælde, kan du nødt til at vente og derefter prøve igen et par gange.
     
4. Brug ikke din browsers Back-knap. Brug "ERDDAP"link på toppen af ovenstående, så brug andre links til at gå tilERDDAP™sider, du er interesseret i. Hvis en cached-side siger, at du ikke er logget ind, skal du indlæse siden.
     

## scripts{#scripts} 

\\[Dette er lidt ændret fra oplysninger leveret af Lynn DeWittt, der gjorde det hårde arbejde med at finde ud af dette. Lynn, tak meget&#33;
Hvis du har rettelser eller forslag, bedes du sende en e-mail til os.\\]

Det er også muligt at logge ind påERDDAP™og få adgang til private datasæt via et script. Her er et eksempel, der brugercurl:

1. Disse instruktioner antager, at du bruger en gmail-adresse, hvor 2-faktorgodkendelse ikke er tændt. Hvis din primære gmail-adresse har 2-faktorgodkendelse slået til, skal du overveje at oprette en anden gmail-adresse med 2-faktorgodkendelse slået fra.
     
2. Log indERDDAP™manuelt med den gmail-adresse, du vil bruge i dit script og acceptere eventuelle nødvendige tilladelser, så log helt tilbage ud.
     
3. Åbn browserudviklerværktøjerne, og gå til fanen Netværk.
     
4. Klik på knappenERDDAP™"Log ind"-linket, og vælg derefter den relevante e-mailadresse, hvis du bliver bedt om det.
     
5. Når knappen "Log ind" ændres til "Log ind", vises fanen Udviklerværktøjer, der ligner følgende: (Eksempel fra Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Brug muse højreklik-kontekstmenuen til "copy as cURL" begge af disse urls og indsæt dem i en almindelig tekst editor
     
6. Klik på "Log indERDDAP"knappen og "copy as cURL" linket, der ligner:
```
    login.html  
```
og sæt denne tredjecurlkommando ind i tekstfilen.
     
7. I tekstfilen vil du nu have 3 linjer som følgende, hvor du har logget ind på enERDDAP™server på ' * https://host.somewhere.com/erddap * ". Den førstecurlkommando får din brugerprofil i "login\\_hint" og genererer en "id\\_token". Den anden bruger id\\_token til at logge ind på Google, og den tredje derefter logger ind påERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Ovenstående 3 linjer, når du kører sekventielt fra en kommandolinje, vil log dig indERDDAP. For at bruge disse i et script skal du fange id\\_token fra den første linje, fodre den til den anden linje, og skrive en cookie til at læse af efterfølgende linjer.
     
9. At udvikle et script, køre den første ('' https://accounts.google.com )  curllinje præcis, som det blev kopieret fra udviklerværktøjerne, og fange svaret (Du kan få encurlfejl om flaget "--2.0" bare fjerne det) . I php ser det ud til følgende:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Log ind på Google ved at udføre den anden linje ved hjælp af $id\\_token, først fjerne "-H 'Cookie: ting" parameter og i stedet fortællecurlat skrive en cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Log indERDDAP™, igen fjerne "-H 'Cookie: ting" parameter, og ved hjælp af den tidligere skriftlige cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Du bør nu kunne anmode om data fra serveren ved hjælp af den samme cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
