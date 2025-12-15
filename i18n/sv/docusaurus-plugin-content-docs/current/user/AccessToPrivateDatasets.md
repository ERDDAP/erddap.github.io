---
title: "Access to Private Datasets"
---
# Tillgång till privata datamängder i ERDDAP™ 

Många många ERDDAP™ installationer har inte autentisering aktiverat och ger därför inte något sätt för användare att logga in, inte heller har de några privata datamängder.

Vissa ERDDAP™ installationer har autentisering aktiverad. För närvarande, ERDDAP™ endast stöder autentisering via Google-hanterade e-postkonton, som inkluderar e-postkonton på NOAA och många universitet. Om en ERDDAP™ har autentisering aktiverat, vem som helst med ett Google-hanterat e-postkonto kan logga in, men de kommer bara att ha tillgång till de privata datamängden som ERDDAP™ administratören har uttryckligen godkänt dem att komma åt.

## Uppdaterade instruktioner{#updated-instructions} 

En del av informationen nedan är ur datum. Tills detta uppdateras kan du använda [Detta blogginlägg](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) för senaste steg på att få data från en privat dataset med skript.

## Människor med webbläsare{#humans-with-browsers} 

Mänskliga användare av ERDDAP™ kan logga in ERDDAP™ i en webbläsare för att få tillgång till privata datamängder som de är behöriga att komma åt.

För att logga in:

1. Klicka på loggen i länken i den övre vänstern av någon ERDDAP™ webbsida.
Om det inte finns någon logga in länk, ERDDAP™ installationen har inte autentisering aktiverad och det finns inga privata datamängder.
     
2. Klicka på knappen Logga in för att logga in på ditt Google-konto.
Texten på knappen ska ändras till "Signed in".
     
3. Klicka på Logga in ERDDAP knappen.
Webbsidan bör ändras för att säga Du är inloggad som *Dina dina Emailadress* .
Om det inte gör det, vänta 5 sekunder och klicka på Logga in ERDDAP knappen igen.
I extrema fall kan du behöva vänta och sedan försöka igen några gånger.
     
4. Använd inte webbläsarens Back-knapp. Använd " ERDDAP länk högst upp på ovanstående, sedan använda andra länkar för att gå till ERDDAP™ sidor du är intresserad av. Om en cachad webbsida säger att du inte är inloggad, ladda om sidan.
     

## Skrifter{#scripts} 

 \\[ Detta ändras något från information som tillhandahålls av Lynn DeWitt, som gjorde det svåra jobbet att räkna ut detta. Lynn, tack så mycket&#33;
Om du har korrigeringar eller förslag, vänligen e-post erd.data @ noaa.gov. \\] 

Det är också möjligt att logga in på ERDDAP™ och tillgång till privata dataset via ett skript. Här är ett exempel som använder curl Från:

1. Dessa instruktioner antar att du använder en gmail-adress där 2-faktorsautentisering inte aktiveras. Om din huvudsakliga gmail-adress har 2-faktorsautentisering aktiveras, överväga att skapa en annan gmailadress med 2-faktorsautentisering avstängd.
     
2. Logga in till ERDDAP™ manuellt med den gmail-adress du vill använda i ditt skript och acceptera eventuella behörigheter som krävs, logga sedan helt ut.
     
3. Öppna webbläsaren Developer Tools och gå till fliken Nätverk.
     
4. Klicka på ERDDAP™ "logga in" -länken, sedan "Sign in" -knappen och välj lämplig e-postadress om du uppmanas.
     
5. Efter att knappen "Sign in" ändras till "Signed in", visar fliken Utvecklarverktyg Network två poster som ser ut som följande (Exempel från Firefox) Från:
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Använd musen högerklicka på kontextmenyn för att "kopiera som cURL" båda dessa url och klistra in dem i en vanlig textredigerare
     
6. Klicka på "Logga in ERDDAP "Knapp och "kopia som cURL" länken som ser ut:
```
    login.html  
```
och klistra in denna tredje curl komma in i textfilen.
     
7. I textfilen har du nu 3 rader som följande, där du har loggat in i en ERDDAP™ Server på ' *https://host.somewhere.com/erddap* ". Den första curl kommandot får din användarprofil i "login\\_hint" och genererar en "id\\_token". Den andra använder id\\_token för att logga in på Google, och den tredje loggar sedan in för att ERDDAP .
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Ovanstående 3 rader, när du körs sekventiellt från en kommandorad, loggar du in dig i ERDDAP . För att kunna använda dessa i ett manus måste du fånga id\\_token från den första raden, mata den till den andra raden och skriva en cookie som ska läsas av efterföljande rader.
     
9. För att utveckla ett manus, kör den första ("https://accounts.google.com)   curl linje exakt som den kopierades från utvecklarverktygen och fånga svaret (Du kan få en curl fel om flaggan "-2.0" bara ta bort den) . I php ser det ut som följande:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Logga in på Google genom att utföra den andra raden med $id\\_token, först ta bort "-H" Cookie: saker "" parameter och istället berätta curl För att skriva en cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Logga in till ERDDAP™ Återigen ta bort parametern "-H" Cookie: stuff "" och använda den tidigare skriftliga cookien:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Du bör nu kunna begära data från servern med samma cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
