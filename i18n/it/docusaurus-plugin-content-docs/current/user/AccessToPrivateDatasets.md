---
title: "Access to Private Datasets"
---
# Accesso ai Dataset privatiERDDAP™

MoltiERDDAP™le installazioni non hanno abilitato l'autenticazione e quindi non forniscono alcun modo per gli utenti di effettuare il login, né hanno alcun datoset privato.

AlcuniERDDAP™le installazioni hanno attivato l'autenticazione. Attualmente,ERDDAP™supporta solo l'autenticazione tramite account e-mail gestiti da Google, che include account e-mail aNOAAe molte università. Se unERDDAP™ha abilitato l'autenticazione, chiunque abbia un account e-mail gestito da Google può accedere, ma avrà solo accesso ai set di dati privati cheERDDAP™l'amministratore li ha esplicitamente autorizzati ad accedere.

## Istruzioni aggiornate{#updated-instructions} 

Alcune delle informazioni qui sotto sono fuori data. Fino a quando questo viene aggiornato è possibile utilizzare[questo blog post](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)per i passi recenti sull'ottenere i dati da un dataset privato con gli script.

## Uomo con Browser{#humans-with-browsers} 

Utenti umani diERDDAP™può accedereERDDAP™in un browser al fine di ottenere l'accesso a dataset privati che sono autorizzati ad accedere.

Per accedere a:

1. Clicca sul log in link nella sinistra superiore di qualsiasiERDDAP™pagina web.
Se non c'è alcun collegamento, ilERDDAP™l'installazione non ha attivato l'autenticazione e non ci sono set di dati privati.
     
2. Clicca sul pulsante Accedi per accedere al tuo account Google.
Il testo del pulsante dovrebbe cambiare a "Signed in".
     
3. Clicca sul AccediERDDAPPulsante.
La pagina web dovrebbe cambiare per dire Sei registrato come *il tuo Indirizzo email* .
Se non lo fa, attendere 5 secondi e cliccare sul Log inERDDAPPulsante di nuovo.
In casi estremi, potresti dover aspettare e poi riprovare qualche volta.
     
4. Non utilizzare il pulsante Indietro del browser. Utilizzare il "ERDDAP" link in cima a quanto sopra, quindi utilizzare altri link per andare aERDDAP™pagine che ti interessano. Se una pagina web memorizzata nella cache dice che non sei connesso, ricarica la pagina.
     

## Scripts{#scripts} 

\\[Questo è leggermente modificato da informazioni fornite da Lynn DeWitt, che ha fatto il duro lavoro di capire questo. Lynn, grazie mille&#33;
Se avete correzioni o suggerimenti, si prega di e-mail erd.data @ noa.gov .\\]

È anche possibile accedere aERDDAP™e accedere ai set di dati privati tramite uno script. Ecco un esempio che utilizzacurl:

1. Queste istruzioni presumono che si sta utilizzando un indirizzo gmail in cui l'autenticazione a 2 fattori non è attivata. Se l'indirizzo gmail principale ha attivato l'autenticazione a 2 fattori, considerare la creazione di un altro indirizzo gmail con l'autenticazione a 2 fattori disattivata.
     
2. AccediERDDAP™manualmente con l'indirizzo gmail che si desidera utilizzare nel tuo script e accettare eventuali autorizzazioni richieste, quindi eseguire il login completamente.
     
3. Apri il browser Strumenti di sviluppo e vai alla scheda Rete.
     
4. Fare clic suERDDAP™"log in" link, quindi il pulsante "Sign in" e scegliere l'indirizzo email appropriato se richiesto.
     
5. Dopo che il pulsante "Sign in" cambia a "Signed in", la scheda Developer Tools Network mostra due voci che sembrano le seguenti (esempio da Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Utilizzare il menu di scelta rapida del mouse per "copiare come cURL" entrambi questi ricci e incollarli in un editor di testo semplice
     
6. Clicca sul "Log inERDDAP" pulsante e "copia come cURL" il link che sembra:
```
    login.html  
```
e incollare questo terzocurlcomando nel file di testo.
     
7. Nel file di testo, ora avrai 3 linee come le seguenti, dove hai effettuato l'accesso in unERDDAP™server in ' * https://host.somewhere.com/erddap * '. Il primocurlcomando ottiene il tuo profilo utente in "login\\_hint" e genera un "id\\_token". Il secondo utilizza il id\\_token per accedere a Google, e il terzo poi accede aERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Le 3 linee di cui sopra, quando si esegue sequenzialemente da una riga di comando, si accedeERDDAP. Al fine di utilizzare questi in uno script è necessario catturare l'id\\_token dalla prima riga, alimentarlo alla seconda riga, e scrivere un cookie da leggere dalle righe successive.
     
9. Per sviluppare uno script, eseguire il primo (' https://accounts.google.com )  curllinea esattamente come è stato copiato dagli strumenti dello sviluppatore, e catturare la risposta (si può ottenerecurlerrore sulla bandiera "--2.0" basta rimuoverlo) . In php sembra il seguente:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Accedi a Google eseguendo la seconda riga utilizzando $id\\_token, prima rimuovendo il parametro "-H 'Cookie: stuff'" e invece dicendocurlper scrivere un cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
AccediERDDAP™, nuovamente rimuovendo il parametro "-H 'Cookie: stuff'" e utilizzando il cookie scritto in precedenza:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Ora dovresti essere in grado di richiedere i dati dal server, utilizzando lo stesso cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
