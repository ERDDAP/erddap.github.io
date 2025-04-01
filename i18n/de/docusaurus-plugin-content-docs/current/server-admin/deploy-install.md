---
sidebar_position: 1
---

# Installieren
Wie man die erste Aufstellung vonERDDAP™auf Ihrem Server


ERDDAP™kann auf jedem Server laufen, der unterstütztJavaund Tomcat (und andere Anwendungsserver wie Jetty, aber wir unterstützen sie nicht) .ERDDAP™wurde auf Linux getestet (auch auf Amazon's AWS) , Mac und Windows-Computer.

*    **Amazon** -- Wenn Sie installierenERDDAP™auf einer Amazon Web Services EC2 Instanz, siehe dies[Amazon Web Services Überblick](/docs/server-admin/additional-information#amazon)zuerst.
*    **Docker** -- Axiom jetzt Angebote[ERDDAP™in einem Docker-Container](https://hub.docker.com/u/axiom/)und IOOS bietet nun[Quick Start Guide fürERDDAP™in einem Docker Container](https://ioos.github.io/erddap-gold-standard/index.html).
Es ist der StandardERDDAP™Installation, aber Axiom hat es in einen Hafencontainer gelegt.
Wenn Sie Docker bereits verwenden, werden Sie wahrscheinlich die Docker-Version bevorzugen.
Wenn Sie Docker nicht schon verwenden, empfehlen wir das im Allgemeinen nicht.
Wenn Sie sich für die Installation entschieden habenERDDAP™via Docker bieten wir keine Unterstützung für den Installationsprozess.
Wir haben noch nicht mit Docker gearbeitet. Bitte senden Sie uns Ihre Kommentare.
*    **Linux und Macs** --ERDDAP™funktioniert super auf Linux- und Mac-Computern. Siehe unten die Anweisungen.
*    **Windows** -- Windows ist gut für TestsERDDAP™und für den persönlichen Gebrauch (siehe die folgenden Anweisungen) , aber wir empfehlen es nicht für die Öffentlichkeit zu verwendenERDDAPS. LaufenERDDAP™unter Windows kann Probleme haben:ERDDAP™kann Dateien schnell löschen und/oder umbenennen können. Dies ist wahrscheinlich auf Antivirus-Software zurückzuführen (z.B. von McAfee und Norton) die die Dateien für Viren überprüft. Wenn Sie in dieses Problem laufen (die durch Fehlermeldungen in der[Pressemitteilung](/docs/server-admin/additional-information#log)Datei wie "Unable to delete ...") , das Ändern der Antivirus-Software-Einstellungen kann das Problem teilweise lindern. Oder betrachten Sie stattdessen einen Linux- oder Mac-Server.

 **Der StandardERDDAP™Installationsanweisungen für Linux, Macs und Windows-Computer sind:** 

0. Stellen Sie sicher, dass alle Abhängigkeiten installiert sind. Auf Nicht-Windows-Maschinen (Linux und Mac) Sie brauchen Csh.
## Java {#java} 
1.  [FürERDDAP™v2.19+, eingerichtetJava21.](#java)
Aus Sicherheitsgründen ist es fast immer am besten, die neueste Version vonJava21.
Bitte laden und installieren Sie die neueste Version
    [OpenJDK von Adoptium (Temurin) ANHANG (LTS) ](https://adoptium.net/temurin/releases/?version=21). Um die Installation zu überprüfen, geben Sie zum Beispiel "/_javaJreBinDirectory_/java -version" ein.
/usr/local/jdk-21.0.3+9/jre/bin/java -Version
    
    ERDDAP™Arbeiten mitJavaaus anderen Quellen, aber wir empfehlen Adoptium, weil es die wichtigste, gemeinschaftlich unterstützt, kostenlos (wie in Bier und Sprache) Version vonJava21 die Long Term Support bietet (kostenlose Upgrades seit vielen Jahren über die erste Veröffentlichung) . Aus Sicherheitsgründen, bitte aktualisieren Sie IhreERDDAP's Version vonJavaperiodisch als neue VersionenJava21 von Adoptium erhältlich.
    
    ERDDAP™wurde intensiv mit 21 nicht anderen Versionen getestet und verwendet. Aus verschiedenen Gründen testen wir weder mit anderen Versionen vonJava.
     
## Tomcat{#tomcat} 
2.  [Einrichten](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat ist die am häufigsten verwendeteJavaAnwendungsserver, derJavaSoftware, die zwischen den Netzdiensten des Betriebssystems steht undJavaServersoftware wieERDDAP™. Es ist Freie und Open Source Software (FOSS) .
    
Sie können einen anderen verwendenJavaAnwendungsserver (z.B., Jetty) , aber wir testen und unterstützen Tomcat.
     
    
    * Laden Sie Tomcat herunter und entpacken Sie es auf Ihrem Server oder PC.
Aus Sicherheitsgründen ist es fast immer am besten, die neueste Version von Tomcat 10 zu verwenden (Version 9 und unten sind nicht akzeptabel) die mitJava21 oder neuer. Im Folgenden wird das Tomcat-Verzeichnis als _tomcat_ bezeichnet.
        
Warnung&#33; Wenn Sie bereits einen Tomcat mit einer anderen Web-Anwendung haben (insbesondere THREDDS) , wir empfehlen Ihnen zu installierenERDDAP™in[Eine zweite Tomcat](/docs/server-admin/additional-information#second-tomcat), weilERDDAP™benötigt verschiedene Tomcat-Einstellungen und sollte nicht mit anderen Anwendungen für Speicher konten.
        
        * Auf Linux,[den "Core" "Tar" herunterladen.gz" Tomcat Verteilung](https://tomcat.apache.org/download-10.cgi)und auspacken. Wir empfehlen das Auspacken in /usr/local.
        * Auf einem Mac ist Tomcat wahrscheinlich bereits in /Library/Tomcat installiert, aber sollte es auf die neueste Version von Tomcat 10 aktualisieren.
Wenn Sie es herunterladen,[den "Core" "Tar" herunterladen.gz" Tomcat Verteilung](https://tomcat.apache.org/download-10.cgi)und in /Library/Tomcat auspacken.
        * Unter Windows können Sie[die "Core" "zip" Tomcat Distribution herunterladen](https://tomcat.apache.org/download-10.cgi)  (die nicht mit der Windows-Registrierung übereinstimmt und die Sie von einer DOS-Befehlszeile steuern) und in einem entsprechenden Verzeichnis auspacken. (Für die Entwicklung verwenden wir die "Core" "zip" Distribution. Wir machen ein /Programm-Verzeichnis und entpacken es dort.) Oder Sie können die "Core" "64-bit Windows zip" Distribution herunterladen, die mehr Funktionen beinhaltet. Wenn die Distribution ein Windows-Installer ist, wird es wahrscheinlich Tomcat in, z.B. /Programme/apache-tomcat-10.0.23 .
             
### Server.xml{#serverxml} 
*   [Server.xml](#serverxml)- In _tomcat_/conf/server.xml-Datei gibt es zwei Änderungen, die Sie zu jedem der beiden machen sollten&lt;Connector&gt; tags- eins für
```
        <Connector port="8080" 
```
und eins für
```
        <Conector port="8443"
```
    1.   (Empfohlen) Erhöhen Sie den ConnectTimeout-Parameterwert, vielleicht auf 300000 (Millisekunden)   (5 Minuten) .
    2.   (Empfohlen) Fügen Sie einen neuen Parameter hinzu: entspanntQueryChars="\\[\\]|" Dies ist optional und etwas weniger sicher, aber entfernt die Notwendigkeit, dass Benutzer diese Zeichen prozentual kodieren, wenn sie in den Parametern der Anfrage URL eines Benutzers auftreten.
             
### Inhalt.xml{#contentxml} 
* kontext.xml -- Ressourcen Cache - In _tomcat_/conf/context.xml, direkt vor der&lt;/Context&gt; tag, ändern Sie das Ressourcen-Tag (oder hinzufügen, wenn es nicht schon da ist) den Cache einstellen MaxSize-Parameter auf 80000:
    &lt;Ressourcen CachingAllowed="true" cacheMaxSize="80000" /&gt;
Dies vermeidet zahlreiche Warnungen in Catalina. das alles beginnt
"WARNUNG\\[Haupt\\]org.apache.catalina.webresources.Cache.getResource Unfähig, die Ressource bei\\[/WEB-INF/Klassen/...]"
         
### Apache Timeout{#apache-timeout} 
* Ändern Sie auf Linux-Computern die Apache-Timeout-Einstellungen, so dass zeitraubende Benutzeranfragen nicht Timeout (mit dem, was oft als "Proxy" oder "Bad Gateway"-Fehler erscheint) . Als root-Benutzer:
    1. Ändern der Apachehttpd.conf Datei (meist in /etc/httpd/conf/) :
Ändern der bestehenden&lt;Timeout&gt; Einstellung (oder eine am Ende der Datei hinzufügen) bis 3600 (Sekunden) , anstatt der Standard 60 oder 120 Sekunden.
Ändern der bestehenden&lt;ProxyTimeout&gt; Einstellung (oder eine am Ende der Datei hinzufügen) bis 3600 (Sekunden) , anstatt der Standard 60 oder 120 Sekunden.
    2. Neuart Apache: /usr/sbin/apachectl -k anmutig (aber manchmal ist es in einem anderen Verzeichnis) .
             
    * Sicherheitsempfehlung: Vgl.[Diese Anweisungen](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)um die Sicherheit Ihrer Tomcat-Installation zu erhöhen, insbesondere für öffentliche Server.
         
    * Für die ÖffentlichkeitERDDAP™Installationen auf Linux und Macs, ist es am besten, Tomcat einzurichten (das Programm) als Zugehörigkeit zum Benutzer "tomcat" (einem separaten Benutzer mit begrenzten Berechtigungen,[hat kein Passwort](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Somit kann nur der Superbenutzer als Benutzer-Tomcat wechseln. Dies macht es für Hacker unmöglich, sich als Benutzer-Tomcat an Ihrem Server anzumelden. Und in jedem Fall sollten Sie es so machen, dass der tomcat Benutzer sehr begrenzte Berechtigungen auf dem Dateisystem des Servers hat (lesen + schreiben +execute Privilegien für den apache-tomcat Verzeichnisbaum und&lt;bigParentDirectory&gt; und ausschließliche Vorrechte für Verzeichnisse mit Daten, dieERDDAP™müssen Zugang zu).
        * Sie können das tomcat Benutzerkonto erstellen (die kein Passwort haben) mit dem Befehl
sudo useradd tomcat -s /bin/bash -p '\\* '
        * Mit dem Befehl können Sie als Benutzer-Tomcat arbeiten
sudo su - tomcat
             (Es wird Sie um das Superuser-Passwort bitten, um dies zu tun.) 
        * Sie können die Arbeit als Benutzer-Tomcat durch den Befehl stoppen
Ausgang
        * Den größten Teil des restlichen Tomcat undERDDAP™Setupanleitung als Benutzer "tomcat". Später führen Sie die start.sh und shutdown.sh-Skripte als Benutzer "tomcat" aus, so dass Tomcat die Erlaubnis hat, in seine Log-Dateien zu schreiben.
        * Nach dem Auspacken von Tomcat aus dem Stamm des apache-tomcat-Verzeichnisses:
            
            * Ändern Sie das Eigentum an dem apache-tomcat-Verzeichnisbaum zum tomcat-Benutzer.
chown -R tomcat apache-tomcat-_10.0.23_
                 (aber ersetzen Sie den tatsächlichen Namen Ihres tomcat Verzeichnisses) .
            * Ändern Sie die "Gruppe" tomcat, Ihren Benutzernamen oder den Namen einer kleinen Gruppe, die tomcat und alle Administratoren von Tomcat/ERDDAP, z.
chgrp -R _your Benutzername_ apache-tomcat-_10.0.23_
            * Ändern Sie die Berechtigungen, damit Tomcat und die Gruppe Vorrechte gelesen, geschrieben, ausgeführt haben, z.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Entfernen Sie die Berechtigungen von "anderen" Benutzern zum Lesen, Schreiben oder Ausführen:
chmod -R o-rwx apache-tomcat-_10.0.23_
Dies ist wichtig, weil es verhindert, dass andere Benutzer möglicherweise sensible Informationen inERDDAP™Dateien einrichten.
            
              
### Speichermedien{#memory} 
* Set Tomcats Umweltvariablen
    
Auf Linux und Macs:
Datei erstellen _tomcat_/bin/setenv.sh (oder in Red Hat Enterprise Linux\\[RHEL\\], edit ~tomcat/conf/tomcat10.conf) um Tomcats Umgebungsvariablen einzustellen. Diese Datei wird von _tomcat_/bin/startup.sh und shutdown.sh verwendet. Die Datei sollte etwas wie:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (aber ersetzen Sie die Verzeichnisnamen von Ihrem Computer) .
 (Wenn Sie zuvor JRE\\_HOME gesetzt haben, können Sie das entfernen.)   
Auf Macs musst du wahrscheinlich nicht JAVA\\_HOME einstellen.

Unter Windows:
Erstellen Sie eine Datei _tomcat_\\bin\\setenv.bat, um Tomcats Umgebungsvariablen einzustellen. Diese Datei wird von _tomcat_\\bin\\startup.bat verwendet undshutdown.bat. Die Datei sollte etwas wie:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (aber ersetzen Sie die Verzeichnisnamen von Ihrem Computer) .
Wenn dies nur für lokale Tests ist, entfernen Sie "-server".
 (Wenn Sie zuvor JRE\\_HOME gesetzt haben, können Sie das entfernen.) 

Die Speichereinstellungen -Xmx und -Xms sind wichtig, weilERDDAP™arbeitet besser mit mehr Erinnerung. Setzen Sie -Xms immer auf den gleichen Wert wie -Xmx.

* Für 32 Bit Betriebssysteme und 32 BitJava:
64 BitJavaist viel besser als 32 BitJava, aber 32 BitJavawird funktionieren, solange der Server nicht wirklich beschäftigt ist. Je mehr physische Speicher im Server desto besser: 4+ GB ist wirklich gut, 2 GB ist okay, weniger wird nicht empfohlen. mit 32 BitJava, auch mit reichlich physischem Gedächtnis, Tomcat undJavawird nicht laufen, wenn Sie versuchen zu setzen -Xmx viel über 1500M (1200M auf einigen Computern) . Wenn Ihr Server weniger als 2GB Speicher hat, reduzieren Sie den -Xmx-Wert (in 'M'egaBytes) bis 1/2 des physischen Gedächtnisses des Computers.
* Für 64 Bit Betriebssysteme und 64 BitJava:
64 BitJavawird nur an einem 64-Bit-Betriebssystem arbeiten.
    
    * mitJava8, Sie müssen \\-d64 zum Tomcat CATALINA\\_OPTS-Parameter in setenv.bat hinzufügen
    * mitJava21, Sie wählen 64 BitJavawenn Sie eine Version herunterladenJavamarkiert "64 bit".
    
mit 64 BitJava, Tomcat undJavakann sehr hohe -Xmx- und -Xms-Einstellungen verwenden. Je physischer Speicher im Server desto besser. Als vereinfachender Vorschlag: Wir empfehlen Ihnen, -Xmx und -Xms zu setzen (in 'M'egaBytes) bis 1/2 (oder weniger) der physischen Erinnerung des Computers. Sie können sehen, ob Tomcat,Java, undERDDAP™werden in der Tat in 64-Bit-Modus durch die Suche nach "Bit" inERDDAP's Daily Report E-Mail oder im _bigParentDirectory_/logs/[Pressemitteilung](/docs/server-admin/additional-information#log)Datei (_bigParentDirectory_ wird in[Setup.xml](#setupxml)) .
#### Müllsammlung{#garbage-collection} 
* InERDDAP™'[Pressemitteilung](/docs/server-admin/additional-information#log)Datei, Sie werden viele sehen "GC (Verlagerungsversagen) " Nachrichten.
Dies ist in der Regel kein Problem. Es ist eine häufige Nachricht von einem normalerweise arbeitendenJavasagen, dass es gerade eine kleinere Müllsammlung beendet, weil es aus dem Raum in Eden lief (der Abschnitt desJavaHeap für sehr junge Objekte) . Normalerweise zeigt die Nachricht Sie _memoryUseBefore_\\-&gt;_memoryUseAfter_. Wenn diese beiden Zahlen zusammen sind, bedeutet das, dass die Müllsammlung nicht produktiv war. Die Nachricht ist nur ein Zeichen von Schwierigkeiten, wenn es sehr häufig ist (alle paar Sekunden) , nicht produktiv, und die Zahlen sind groß und nicht wächst, die zusammen zeigen, dassJavabraucht mehr Speicher, ist kämpfen, um Speicher freizugeben, und ist nicht in der Lage, Speicher freizugeben. Dies kann während einer stressigen Zeit geschehen, dann verschwinden. Aber wenn es fortdauert, ist das ein Zeichen von Ärger.
* Wenn du java.lang siehst.OutOfMemoryError ist inERDDAP™'[Pressemitteilung](/docs/server-admin/additional-information#log)Datei, siehe[Ausgewählt](/docs/server-admin/additional-information#outofmemoryerror)für Tipps zur Diagnose und Lösung der Probleme.
         
### Genehmigungen{#permissions} 
*   [Auf Linux und Macs ändern Sie die Berechtigungen](#permissions)von allen\\*.shDateien in _tomcat_/bin/, die vom Eigentümer ausführbar sind, z.B. mit
```
    chmod +x \\*.sh  
```
### Schriften{#fonts} 
*   [Schriften für Bilder:](#fonts)Wir bevorzugen die freien[DejaVu schriftarten](https://dejavu-fonts.github.io/)zum anderenJavaschriftarten. Die Verwendung dieser Schriftarten wird dringend empfohlen, aber nicht erforderlich.
    
Wenn Sie nicht die DejaVu Schriftarten verwenden möchten, müssen Sie die SchriftartFamilieneinstellung in setup.xml ändern.&lt;Schriftfamilie &gt;SansSerif&lt;/fontFamily&gt;, die mit allenJavaVerteilungen. Wenn Sie fontFamily auf den Namen einer Schrift setzen, die nicht verfügbar ist,ERDDAP™wird keine Liste der verfügbaren Schriften in der log.txt-Datei laden und drucken. Sie müssen eine dieser Schriftarten verwenden.
    
Wenn Sie die DejaVu-Schriften verwenden möchten, stellen Sie bitte sicher, dass die FontFamily-Einstellung in setup.xml ist&lt;Schriftart Familie &gt;DejaVu Sans&lt;/fontFamilie &gt;.
    
Um die DejaVu Schriften zu installieren, laden Sie bitte herunter[DejaVuFonts.zip](/DejaVuFonts.zip)  (5,522,795 Bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) und entpacken Sie die Schriftdateien in ein temporäres Verzeichnis.
    
    * Auf Linux:
        * Für Linux AdoptiumJavaVerteilungen, siehe[Diese Anweisungen](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * mit anderenJavaVerteilungen: Kopieren Sie als Tomcat-Benutzer die Schriftdateien in _JAVA\\_HOME_/lib/fonts soJavadie Schriftarten finden. Denken Sie daran: wenn/wenn Sie später auf eine neuere Version upgradenJava, Sie müssen diese Schriften neu installieren.
    * Auf Macs: für jede Schriftdatei, Doppelklick auf sie und klicken Sie dann auf Install Font.
    * Unter Windows 7 und 10: Wählen Sie im Windows Explorer alle Schriftdateien aus. Rechtsklick. Klicken Sie auf Installieren.
             
### Test Tomcat{#test-tomcat} 
* Testen Sie Ihre Tomcat Installation.
    * Linux:
        * Als Benutzer "tomcat", laufen _tomcat_/bin/startup.sh
        * Ihre URL anzeigen + ":8080/" in Ihrem Browser (z.B.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Sie sollten die Tomcat "Glückwünsche" Seite sehen.
Wenn es Probleme gibt, sehen Sie die Tomcat Log-Datei _tomcat_/logs/catalina.out.
    * Mac (tomcat als Systemadministrator-Benutzer ausführen) :
        * Führen Sie _tomcat_/bin/startup.sh
        * Ihre URL anzeigen + ":8080/" in Ihrem Browser (z.B.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Beachten Sie, dass Ihr Tomcat standardmäßig nur von Ihnen erreichbar ist. Es ist nicht öffentlich zugänglich.
        * Sie sollten die Tomcat "Glückwünsche" Seite sehen.
Wenn es Probleme gibt, sehen Sie die Tomcat Log-Datei _tomcat_/logs/catalina.out.
    * Windows localhost:
        
        * Klicken Sie mit der rechten Maustaste auf das Tomcat-Symbol im System-Tablet und wählen Sie "Start-Service".
        * Blick[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)oder vielleicht[ http://localhost:8080/ ](http://localhost:8080/), in Ihrem Browser. Beachten Sie, dass Ihr Tomcat standardmäßig nur von Ihnen erreichbar ist. Es ist nicht öffentlich zugänglich.
        * Sie sollten die Tomcat "Glückwünsche" Seite sehen.
Wenn es Probleme gibt, sehen Sie die Tomcat Log-Datei _tomcat_/logs/catalina.out.
            
### Probleme mit der Tomcat-Installation?{#troubles-with-the-tomcat-installation} 
* Auf Linux und Mac, wenn Sie nicht Tomcat oderERDDAP™  (oder vielleicht können Sie sie nicht von einem Computer außerhalb Ihrer Firewall erreichen) , Sie können testen, ob Tomcat Port 8080 hört, indem Sie tippen (als Wurzel) auf einer Befehlszeile des Servers:
```  
    netstat -tuplen | grep 8080  
```
Das sollte eine Zeile mit etwas wie:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (wo '#' eine Ziffer ist) , angeben, dass ein "java" Prozess (Vermutlich Tomcat) hört auf Port "8080" für "tcp" Verkehr. Wurden keine Zeilen zurückgegeben, ist die zurückgegebene Zeile deutlich anders, oder wurden zwei oder mehr Zeilen zurückgegeben, so kann es ein Problem mit den Porteinstellungen geben.
* Siehe die Tomcat Protokolldatei _tomcat_/logs/catalina.out. Tomcat Probleme und einigeERDDAP™Startup-Probleme werden dort fast immer angezeigt. Dies ist üblich, wenn Sie zuerst einrichtenERDDAP™.
* Siehe[Tomcat](https://tomcat.apache.org/)Website oder suchen Sie das Internet nach Hilfe, aber bitte informieren Sie uns die Probleme, die Sie hatten und die Lösungen, die Sie gefunden haben.
* Sehen Sie uns[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support).
             
### ERDDAP™Inhalt{#erddap-content} 
3.  [Einrichten der_tomcat_/content/erddapKonfigurationsdateien.](#erddap-content)  
Auf Linux, Mac und Windows herunterladen[ErddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (Version 1.0.0, 20333 Bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datiert 2024-10-14) und entpacken Sie es in _tomcat_, erstellen_tomcat_/content/erddap.

    \\[Einige vorherige Versionen sind ebenfalls verfügbar:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 Bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datiert 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 Bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datiert 2022-02-16)   
    [KAPITEL 1](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 Bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, datiert 2022-10-09)   
    [TEIL 2](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 Bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, datiert 2022-12-08) 
    [KAPITEL 3](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 Bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, datiert 2023-02-27) 
und entpacken Sie es in _tomcat_, erstellen_tomcat_/content/erddap.\\]
    
#### Sonstiges Verzeichnis{#other-directory} 
Für Red Hat Enterprise Linux (RHEL) oder für andere Situationen, in denen Sie das Tomcat-Verzeichnis nicht ändern dürfen oder in denen Sie das Tomcat-Verzeichnis einfügen möchten/benötigt habenERDDAP™Inhaltsverzeichnis in einem anderen Ort aus anderen Gründen (zum Beispiel, wenn Sie Jetty anstelle von Tomcat verwenden) , unzip erddapContent.zipin das gewünschte Verzeichnis (die nur user=tomcat Zugriff hat) und dieerddapContentDirectorySystemimmobilie (z.B.,erddapContentDirectory=~tomcat/content/erddap) alsoERDDAP™finden Sie dieses neue Content-Verzeichnis.
    
### Setup.xml{#setupxml} 
*   [Lesen Sie die Kommentare in_tomcat_/content/erddap/ **Setup.xml** ](#setupxml)und die angeforderten Änderungen vornehmen. setup.xml ist die Datei mit allen Einstellungen, die festlegen, wie IhrERDDAP™verhält sich.
Für die erste Einrichtung müssen Sie diese Einstellungen zumindest ändern:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Wenn Sie das BigParentDirectory erstellen, aus dem Stammverzeichnis von bigParentDirectory:
    
    * Machen Sie user=tomcat den Besitzer des BigParentDirectory, z.B.
```
        chown -R tomcat _bigParentDirectory_
```
    * Ändern Sie die "Gruppe" tomcat, Ihren Benutzernamen oder den Namen einer kleinen Gruppe, die tomcat und alle Administratoren von Tomcat/ERDDAP, z.
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Ändern Sie die Berechtigungen, damit Tomcat und die Gruppe Vorrechte gelesen, geschrieben, ausgeführt haben, z.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Entfernen Sie die Berechtigungen von "anderen" Benutzern zum Lesen, Schreiben oder Ausführen. Dies ist wichtig, um das Lesen möglicherweise sensibler Informationen inERDDAP™Log-Dateien und Dateien mit Informationen über private Datensätze.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Umweltvariablen{#environment-variables} 
Beginnen mitERDDAP™V2.13,ERDDAP™Administratoren können jeden Wert in setup.xml überschreiben, indem eine Umgebungsvariable angegeben wirdERDDAP\\__valueName_ vor dem LaufenERDDAP™. Zum Beispiel, verwendenERDDAP\\_baseUrl überwiegt die&lt;BasisUrl&gt; Wert. Dies kann bei der Bereitstellung hilfreich seinERDDAP™mit einem Container wie Docker, wie Sie Standardeinstellungen in setup.xml setzen können und dann spezielle Einstellungen über Umgebungsvariablen liefern. Wenn Sie geheime Informationen angebenERDDAP™über diese Methode überprüfen Sie sicher, ob die Informationen geheim bleiben.ERDDAP™nur einmal pro Start die Umgebungsvariablen liest, in der ersten Sekunde des Starts, so ist eine Möglichkeit, dies zu verwenden: die Umgebungsvariablen einstellen, startenERDDAP, warte bisERDDAP™wird gestartet, dann die Umgebungsvariablen nicht mehr.
    
### datasets.xml {#datasetsxml} 
* Lesen Sie die Kommentare in[ **Arbeiten mit demdatasets.xmlDatei** ](/docs/server-admin/datasets). Später, nachdem Sie bekommen habenERDDAP™zum ersten Mal (in der Regel mit nur den Standarddatensätzen) , Sie werden das XML in_tomcat_/content/erddap/ **datasets.xml** alle von Ihnen gewünschten Datensätze angebenERDDAP™zu dienen. Hier verbringen Sie den Großteil Ihrer Zeit während der EinrichtungERDDAP™und später, während Sie IhreERDDAP™.

Sie können ein Beispiel sehen[datasets.xmlauf GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (Anders als) Jetzt oder (etwas wahrscheinlicher) in der Zukunft, wenn Sie die CSS-Datei von erddap ändern möchten, machen Sie eine Kopie von_tomcat_/content/erddap/images/erddapStart2.css namens erdddap2.css und dann Änderungen an ihm vornehmen. Änderungen an erddap2.css wirken nur dann, wennERDDAP™wird neu gestartet und erfordert oft auch den Benutzer, die Cache-Dateien des Browsers zu löschen.
     
ERDDAP™wird nicht korrekt funktionieren, wenn die setup.xml oderdatasets.xmlDatei ist keine gut ausgebildete XML-Datei. So, nachdem Sie diese Dateien bearbeiten, ist es eine gute Idee, zu überprüfen, ob das Ergebnis gut gebildet XML ist, indem Sie den XML-Text in einen XML-Checker wie[xmlvalidierung](https://www.xmlvalidation.com/).
     
### Installieren Sie die Datei erddap.war{#install-the-erddapwar-file} 
4. Auf Linux, Mac und Windows herunterladen[Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)in _tomcat_/webapps .
     (Version 2.26, 607,404,032 Bytes, MD5=99a725108b37708e5420986c16a119, datiert 03-31-2025) 
    
Die .war-Datei ist groß, weil sie hochauflösende Küste, Grenze und Höhendaten enthält, die benötigt werden, um Karten zu erstellen.
    
    \\[Einige vorherige Versionen sind ebenfalls verfügbar.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551.068,245 Bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, datiert 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551.069,844 Bytes, MD5=461325E97E7577EC671DD50246CCFB8B, datiert 2022-02-23)   
    [KAPITEL 1](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 Bytes, MD5=F2CFF805893146E932E498FDDBD519B6, datiert 2022-10-09)   
    [TEIL 2](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 Bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, datiert 2022-12-08) 
    [KAPITEL 3](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 Bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, datiert 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 Bytes, MD5=970fbee172e28b0b8a07756eecbc898e, datiert 2024-06-07) 
    [2.2.2.](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 Bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, datiert 2024-11-07) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Proxy verwenden Pass, damit Benutzer nicht die Portnummer, z.B. :8080, in die URL setzen müssen.
Auf Linux-Computern, wenn Tomcat in Apache läuft, ändern Sie bitte den Apachehttpd.conf Datei (meist in /etc/httpd/conf/) um HTTP-Verkehr zu ermöglichenERDDAP™ohne Angabe der Portnummer, z.B. :8080, in der URL. Als root-Benutzer:
    1. Ändern der bestehenden&lt;VirtualHost&gt; tag (wenn es eine gibt) , oder fügen Sie eine am Ende der Datei hinzu:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Dann neu starten Apache: /usr/sbin/apachectl -k anmutig (aber manchmal ist es in einem anderen Verzeichnis) .
         
### NGINX{#nginx} 
 (UNCOMMON) Wenn Sie verwenden[NGINX](https://www.nginx.com/)  (einen Webserver und Load Balancer) :
um NGINX zu erhalten undERDDAP™richtig arbeiten mithttps, Sie müssen den folgenden Snippet in den Tomcat Server.xml setzen&lt;Host&gt; Block:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Und in der nginx config-Datei müssen Sie diese Header setzen:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Dank Kyle Wilcox.)   
     
### Starten Sie Tomcat{#start-tomcat} 
*    (Ich empfehle nicht, den Tomcat Web Application Manager zu verwenden. Wenn Sie nicht vollständig abschalten und starten Tomcat, früher oder später haben Sie PermGen Speicherprobleme.)   
     
*    (In Linux oder Mac OS, wenn Sie einen speziellen Benutzer erstellt haben, um Tomcat laufen, z.B. tomcat, erinnern Sie sich, die folgenden Schritte zu tun, wie dieser Benutzer.)   
     
* Wenn Tomcat schon läuft, schalte Tomcat mit (in Linux oder Mac OS) _tomcat_/bin/shutdown.sh
oder (in Windows) _tomcat_\\bin\\\shutdown.bat
    
Verwenden Sie auf Linux ps -ef|grep tomcat vor und nach shutdown.sh, um sicherzustellen, dass der tomcat-Prozess gestoppt hat. Der Prozess sollte vor der Stilllegung aufgeführt und schließlich nicht nach der Stilllegung aufgeführt werden. Es kann eine Minute oder zwei fürERDDAP™um vollständig abzuschalten. Sei geduldig. Oder wenn es aussieht, als würde es nicht allein aufhalten, verwenden Sie:
Kill -9 _processID_
    
* Start Tomcat mit (in Linux oder Mac OS) _tomcat_/bin/startup.sh
oder (in Windows) _tomcat_\bin\\startup.bat

## IERDDAP™Laufen?{#is-erddap-running} 
Verwenden Sie einen Browser, um anzuzeigen http://_www.YourServer.org_/erddap/status.html   
ERDDAP™startet ohne geladene Datensätze. Datensätze werden in einem Hintergrundfaden geladen und werden so einzeln verfügbar.

### Fehlerbehebung{#troubleshooting} 
* Wenn eine Anfrage von einem Benutzer kommt, geht es nach Apache (auf Linux und Mac OS Computern) Dann Tomcat.ERDDAP™.
* Sie können sehen, was zu Apache kommt (und damit verbundene Fehler) in den Apache-Log-Dateien.
*   [Du](/docs/server-admin/additional-information#tomcat-logs)sehen, was zu Tomcat kommt (und damit verbundene Fehler) in den Tomcat Log-Dateien (_tomcat_/logs/catalina.out und andere Dateien in diesem Verzeichnis) .
*   [Du](/docs/server-admin/additional-information#log)kann sehen, was kommtERDDAP, diagnostische Nachrichten ausERDDAP, und Fehlermeldungen vonERDDAPin derERDDAP™ &lt;bigParentDirectory&gt;logs/log.txt-Datei.
* Tomcat fängt nicht anERDDAP™bis Tomcat eine Anfrage fürERDDAP™. So können Sie in den Tomcat Protokolldateien sehen, wenn es gestartet wirdERDDAP™oder wenn eine mit diesem Versuch verbundene Fehlermeldung vorliegt.
* WannERDDAP™beginnt, es umbenannt die altenERDDAP™log.txt Datei (logArchivedAt_CurrentTime_.txt) und erstellt eine neue log.txt-Datei. Also, wenn das Protokoll. txt-Datei ist alt, es ist ein Zeichen, dassERDDAP™hat nicht vor kurzem neu gestartet.ERDDAP™schreibt Log-Info zu einem Puffer und schreibt nur den Puffer in die Log-Datei periodisch, aber Sie können zwingenERDDAP™um den Puffer in die Log-Datei zu schreiben, indem Sie.../erddap/status.html.

### Probleme: Alte VersionJava {#trouble-old-version-of-java} 
Wenn Sie eine Version vonJavadas ist zu alt fürERDDAP,ERDDAP™wird nicht ausgeführt und Sie werden eine Fehlermeldung in Tomcats Log-Datei wie sehen
Ausnahme im Gewinde "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
Die Lösung ist, die neueste Version zu aktualisierenJavaund stellen Sie sicher, dass Tomcat es verwendet.

### Probleme: langsames Startup Erstes Mal{#trouble-slow-startup-first-time} 
Tomcat muss zum ersten Mal eine Anwendung wieERDDAP™wird gestartet; vor allem muss es das Erddap auspacken. Kriegsakte (die wie ein.zipDatei) . Auf einigen Servern, der erste Versuch, zu sehenERDDAP™Stände (30 Sekunden?) bis diese Arbeit beendet ist. Auf anderen Servern wird der erste Versuch sofort scheitern. Aber wenn Sie 30 Sekunden warten und wieder versuchen, wird es erfolgreich sein, wennERDDAP™wurde korrekt installiert.
Dafür gibt es keine Lösung. So funktioniert Tomcat einfach. Aber es tritt nur das erste Mal, nachdem Sie eine neue Version installierenERDDAP™.

## Abschalten und Neustart{#shut-down-and-restart} 
In der Zukunft, zu stillen (und Neustart)  ERDDAP, siehe[Wie schalte ich die Klappe und stelle Tomcat undERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Ärger?{#trouble} 
Probleme beim Installieren von Tomcat oderERDDAP? Sehen Sie uns[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support).
## E-Mail-Benachrichtigung über neue Versionen vonERDDAP {#email-notification-of-new-versions-of-erddap} 
Wenn Sie eine E-Mail erhalten möchten, wann immer eine neue Version vonERDDAP™ist verfügbar oder wichtigERDDAP™Ankündigungen, können Sie an derERDDAP™Liste der Ankündigungen[Hier.](https://groups.google.com/g/erddap-announce). Diese Liste durchschnittlich etwa eine E-Mail alle drei Monate.
## Anpassen{#customize} 
[Passen Sie IhreERDDAP™Ihre Organisation hervorzuheben (nichtNOAA ERD) .](#customize)
    * Ändern Sie das Banner, das an der Spitze aller erscheintERDDAP™.html-Seiten durch Bearbeiten der&lt;startBodyHtml5&gt; tag in Ihremdatasets.xmlDatei. (Wenn es keinen gibt, kopieren Sie den Standard ausERDDAP'
        \\[Tomcat\\]/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml Datei indatasets.xmlund bearbeiten.) Zum Beispiel:
        * Verwenden Sie ein anderes Bild (d.h. das Logo Ihrer Organisation) .
        * Ändern Sie die Hintergrundfarbe.
        * "ERDDAP" zu "_YourOrganization_'sERDDAP"
        * Ändern Sie den "leichteren Zugang zu wissenschaftlichen Daten" zu "leichteren Zugriff auf _YourOrganization_s Daten".
        * Ändern Sie die "Brought to you by" Links, um Links zu Ihrer Organisation und Finanzierungsquellen zu sein.
    * Ändern Sie die Informationen auf der linken Seite der Startseite, indem Sie die&lt;theShortDescriptionHtml&gt; tag in Ihremdatasets.xmlDatei. (Wenn es keinen gibt, kopieren Sie den Standard ausERDDAP'
        \\[Tomcat\\]/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml Datei indatasets.xmlund bearbeiten.) Zum Beispiel:
        * Beschreiben Sie, was Ihre Organisation und/oder Gruppe tut.
        * Beschreiben Sie, welche Art von Daten dieseERDDAP™hat.
    * Um das Symbol zu ändern, das auf Browser-Tabs erscheint, setzen Sie Ihr Unternehmen favicon. ico in_tomcat_/content/erddap/Bilder/ . Vgl.[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
