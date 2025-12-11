---
title: "Access to Private Datasets"
---
# Pääsy yksityisiin tietoihin ERDDAP™ 

Monet monet ERDDAP™ Asennuksissa ei ole todennusta eikä näin ollen tarjoa mitään tapaa kirjautua sisään, eikä niillä ole yksityisiä tietoaineistoja.

Jotkut ERDDAP™ Asennukset on todennettu. Tällä hetkellä, ERDDAP™ Tukee vain tunnistamista Googlen hallinnoimien sähköpostitilien kautta, joka sisältää sähköpostitilejä NOAA ja monia yliopistoja. Jos ERDDAP™ autentikointi on sallittua, kuka tahansa, jolla on Googlen hallinnoima sähköpostitili, voi kirjautua sisään, mutta heillä on pääsy vain yksityisiin tietoaineistoihin, jotka ovat ERDDAP™ Hallinnoija on nimenomaisesti valtuuttanut heidät käyttämään niitä.

## Päivitettyjä ohjeita{#updated-instructions} 

Osa alla olevista tiedoista on vanhentunut. Kunnes tämä päivitetään, voit käyttää [Tämä blogi](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) Viimeisimmät vaiheet tietojen saamiseksi yksityisestä tietoaineistosta käsikirjoitusten avulla.

## Ihmisiä selaimilla{#humans-with-browsers} 

Ihmisen käyttäjät ERDDAP™ voi kirjautua sisään ERDDAP™ selaimessa saadakseen pääsyn yksityisiin tietoaineistoihin, joihin heillä on lupa käyttää.

Kirjaudu sisään:

1. Klikkaa lokiin linkkiä vasemmalla puolella mistä tahansa ERDDAP™ verkkosivuilla.
Jos linkkiä ei ole, ERDDAP™ Asennuksella ei ole todennusta eikä yksityisiä tietoaineistoja ole.
     
2. Klikkaa Kirjaudu sisään painike kirjautuaksesi Google-tilillesi.
Painikkeen teksti muuttuu "Signed in".
     
3. Klikkaa sisään ERDDAP nappia.
Verkkosivun pitäisi muuttua sanomaan Olet kirjautunut sisään kuin *sinun Sähköposti* .
Jos näin ei ole, odota 5 sekuntia ja klikkaa Logia. ERDDAP Nappi taas.
Äärimmäisissä tapauksissa joudut odottamaan ja yritä uudelleen muutaman kerran.
     
4. Älä käytä selaimesi Back-painiketta. Käytä " ERDDAP Linkki edellä mainitun yläreunassa ja käytä muita linkkejä ERDDAP™ Sivut, joista olet kiinnostunut. Jos napsautettu sivu sanoo, että et ole kirjautunut sisään, lataa sivu uudelleen.
     

## Käsikirjoitukset{#scripts} 

 \\[ Tämä on hieman muokattu Lynn DeWittin antamista tiedoista, jotka tekivät tämän vaikean työn. Lynn, kiitos paljon&#33;
Jos sinulla on korjauksia tai ehdotuksia, lähetä sähköpostia osoitteeseen erd.data @ noaa.gov. \\] 

On myös mahdollista kirjautua sisään ERDDAP™ Käytä yksityisiä tietoaineistoja käsikirjoituksen kautta. Tässä esimerkki, joka käyttää curl :

1. Nämä ohjeet olettavat, että käytät gmail-osoitetta, jossa 2-tekijän todentaminen ei ole käytössä. Jos pääasiallisessa gmail-osoitteessa on 2-tekijän todentaminen, harkitse toisen gmail-osoitteen luomista 2-tekijän todennuksella.
     
2. Kirjaudu sisään ERDDAP™ manuaalisesti gmail-osoitteella, jota haluat käyttää käsikirjoituksessasi, ja hyväksy kaikki tarvittavat luvat ja kirjaudu sitten kokonaan ulos.
     
3. Avaa selaimen kehittäjätyökalut ja siirry verkkovälilehteen.
     
4. Klikkaa tästä ERDDAP™ "kirjaudu sisään" -linkki, sitten "Sign in" -painike ja valitse sopiva sähköpostiosoite, jos sitä pyydetään.
     
5. Kun "Sign in" -painike muuttuu "Signed in", Developer Tools Network -välilehti näyttää kaksi merkintää, jotka näyttävät seuraavilta. (Lähde: Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Käytä hiiren oikean klikkauksen kontekstivalikkoa "kopioimaan URL-osoitteena" molemmissa URL-osoitteissa ja liittämään ne tavalliseen tekstieditoriin.
     
6. Klikkaa "Log into" ERDDAP "painike ja "kopioi URL-osoitteena" linkki, joka näyttää:
```
    login.html  
```
ja liittää kolmannen curl komentaminen tekstitiedostoon.
     
7. Tekstitiedostossa on nyt kolme riviä, kuten seuraavat, joissa olet kirjautunut sisään ERDDAP™ Palvelin " *https://host.somewhere.com/erddap* &gt; Ensimmäinen curl Komento saa käyttäjäprofiilisi "login \\hint" ja tuottaa "id-tunnuksen". Toinen käyttää _id-tunnusta kirjautuakseen Googleen ja kolmas kirjautuu sitten sisään. ERDDAP .
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Edellä mainitut kolme riviä, jotka kulkevat peräkkäin komentoriviltä, kirjaavat sinut sisään ERDDAP . Jotta voit käyttää näitä käsikirjoituksessa, sinun on kiinnitettävä id-token ensimmäisestä rivistä, syötettävä se toiseen riviin ja kirjoitettava eväste, joka on luettava myöhemmillä riveillä.
     
9. Kehittää käsikirjoitusta, juosta ensimmäinen ("""https://accounts.google.com)   curl juuri sellaisena kuin se on kopioitu kehittäjän työkaluista, ja ottaa vastauksen (Saatat saada curl Virhe lipusta "-2.0" poista se) . FP:ssä näyttää seuraavalta:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Kirjaudu sisään Googleen suorittamalla toisen rivin käyttämällä $idtokenia, poistamalla ensin "-H 'Cookie: Things" -parametri ja sen sijaan kertomalla. curl Kirjoita eväste:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Kirjaudu sisään ERDDAP™ poistaa "-H 'Cookie: tavarat' -parametrin ja käyttää aiemmin kirjoitettua evästettä:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Voit nyt pyytää palvelimelta tietoja käyttämällä samaa evästettä:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
