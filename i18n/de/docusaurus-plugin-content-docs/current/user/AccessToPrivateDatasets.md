---
title: "Access to Private Datasets"
---
# Zugang zu privaten Datensätzen inERDDAP™

VieleERDDAP™Installationen haben keine Authentifizierung aktiviert und bieten somit keine Möglichkeit, sich anzumelden, noch haben sie private Datensätze.

EinigeERDDAP™Installationen haben die Authentifizierung aktiviert. Derzeit,ERDDAP™nur unterstützt die Authentifizierung über Google-managed E-Mail-Konten, die E-Mail-Konten beiNOAAund viele Universitäten. WennERDDAP™hat die Authentifizierung aktiviert, jeder mit einem Google-managed E-Mail-Konto kann sich anmelden, aber sie haben nur Zugriff auf die privaten Datensätze, dieERDDAP™Administrator hat sie ausdrücklich zum Zugriff berechtigt.

## Aktualisierte Anweisungen{#updated-instructions} 

Einige der untenstehenden Informationen sind nicht verfügbar. Bis dies aktualisiert wird können Sie verwenden[Diesen Blog-Post](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)für die letzten Schritte, um Daten von einem privaten Datensatz mit Skripten zu erhalten.

## Menschen mit Browsern{#humans-with-browsers} 

Menschliche NutzerERDDAP™kann sich anmeldenERDDAP™in einem Browser, um Zugang zu privaten Datensätzen zu erhalten, die sie zum Zugriff berechtigt sind.

Einloggen:

1. Klicken Sie auf das Log in Link oben links von jedemERDDAP™Seite.
Wenn es keinen Login-Link gibt, dieERDDAP™Installation hat keine Authentifizierung aktiviert und es gibt keine privaten Datensätze.
     
2. Klicken Sie auf die Schaltfläche Anmelden, um sich in Ihr Google-Konto einzutragen.
Der Text der Schaltfläche sollte auf "Eingewählt" ändern.
     
3. Klicken Sie auf das AnmeldenERDDAPKnopf.
Die Webseite sollte sich ändern Sie sind eingeloggt *Ihr E-Mail senden* .
Wenn nicht, warten Sie 5 Sekunden und klicken Sie auf das Log inERDDAPKnopf wieder.
In extremen Fällen müssen Sie vielleicht warten und dann wieder ein paar Mal versuchen.
     
4. Verwenden Sie nicht den Back-Button Ihres Browsers. Verwenden Sie die "ERDDAP" link an der Spitze der oben, dann verwenden Sie andere Links zu gehenERDDAP™Seiten, an denen Sie interessiert sind. Wenn eine geätzte Webseite sagt, dass Sie nicht eingeloggt sind, laden Sie die Seite neu.
     

## Schriften{#scripts} 

\\[Dies wird leicht durch Informationen von Lynn DeWitt, die hart daran gearbeitet haben, dies herauszubilden, geändert. Lynn, vielen Dank&#33;
Wenn Sie Korrekturen oder Vorschläge haben, mailen Sie bitte erd.data @ noaaa.gov .\\]

Es ist auch möglich, sich einzuloggen,ERDDAP™und Zugriff auf private Datensätze über ein Skript. Hier ein Beispiel, das verwendetcurl:

1. Diese Anweisungen gehen davon aus, dass Sie eine Mail-Adresse verwenden, in der die 2-Faktor-Authentifizierung nicht eingeschaltet ist. Wenn Ihre Haupt-Gmail-Adresse eine 2-Faktor-Authentifizierung aktiviert hat, betrachten Sie die Erstellung einer anderen Gmail-Adresse mit 2-Faktor-Authentifizierung ausgeschaltet.
     
2. EinloggenERDDAP™manuell mit der Mail-Adresse, die Sie in Ihrem Skript verwenden möchten, und akzeptieren Sie alle erforderlichen Berechtigungen, dann melden Sie sich vollständig zurück.
     
3. Öffnen Sie den Browser Developer Tools und gehen Sie auf die Registerkarte Netzwerk.
     
4. Klicken Sie auf dieERDDAP™"log in" link, dann die "Sign in" Taste und wählen Sie die entsprechende E-Mail-Adresse, wenn Sie aufgefordert.
     
5. Nachdem die Schaltfläche "Sign in" auf "Signed in" wechselt, zeigt die Registerkarte Developer Tools Network zwei Einträge, die wie folgt aussehen: (Beispiel aus Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Verwenden Sie das Kontextmenü der Maus mit der rechten Maustaste, um "kopieren als cURL" beide dieser URLs und fügen Sie sie in einen Klartext-Editor ein
     
6. Klicken Sie auf das "Log inERDDAP"Taste und "kopieren als cURL" der Link, der aussieht:
```
    login.html  
```
und das dritte klebencurlBefehl in die Textdatei.
     
7. In der Textdatei haben Sie nun 3 Zeilen wie die folgenden, wo Sie sich in eineERDDAP™Server bei ' * https://host.somewhere.com/erddap * '. Die erstecurlBefehl erhält Ihr Benutzerprofil in "login\\_hint" und erzeugt ein "id\\_token". Der zweite verwendet das id\\_token, um sich in Google anzumelden, und das dritte protokolliert sich dann zuERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Die obigen 3 Zeilen, wenn sie sequentiell von einer Befehlszeile aus ausgeführt werden, werden Sie inERDDAP. Um diese in einem Skript zu verwenden, müssen Sie das id\\_token aus der ersten Zeile erfassen, in die zweite Zeile einspeisen und ein Cookie schreiben, das durch nachfolgende Zeilen gelesen werden soll.
     
9. Um ein Skript zu entwickeln, führen Sie das erste (' https://accounts.google.com )  curlLinie genau wie es von den Entwickler-Tools kopiert wurde, und erfassen Sie die Antwort (du könntestcurlfehler über die flagge "-2.0" einfach entfernen) . In php sieht es wie folgt aus:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Loggen Sie sich bei Google ein, indem Sie die zweite Zeile mit $id\\_token ausführen, zuerst entfernen Sie den Parameter "-H 'Cookie: stuff'" und stattdessen erzählencurlein Cookie zu schreiben:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
EinloggenERDDAP™, wieder entfernen Sie den Parameter "-H 'Cookie: stuff'" und verwenden Sie den zuvor geschriebenen Cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Sie sollten nun in der Lage sein, Daten vom Server zu verlangen, indem Sie denselben Cookie verwenden:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
