---
sidebar_position: 1
---

# Installieren
Wie man die erste Aufstellung von ERDDAP™ auf Ihrem Server

 ERDDAP™ kann auf jedem Server laufen, der unterstützt Java und Tomcat (und andere Anwendungsserver wie Jetty, aber wir unterstützen sie nicht) .
 ERDDAP™ wurde auf Linux getestet (auch auf Amazon's AWS) , Mac und Windows-Computer.

*  **Docker** -- Wir liefern [ ERDDAP™ in einem Docker-Container](https://hub.docker.com/r/erddap/erddap) 
und IOOS bietet jetzt [Quick Start Guide für ERDDAP™ in einem Docker Container](https://ioos.github.io/erddap-gold-standard/index.html) .
Es ist der Standard ERDDAP™ Installation, in einem Docker Container.
Über Docker Zusammenfassend bieten wir einfache Möglichkeiten, ssl und Überwachung einzurichten, weiterlesen [Docker Dokumentation](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Wenn Sie Docker bereits verwenden, werden Sie wahrscheinlich die Docker-Version bevorzugen.
Wenn Sie auf Cloud-Services laufen wollen, werden Sie wahrscheinlich die Docker-Version bevorzugen.
*  **Amazon** -- Wenn Sie installieren ERDDAP™ in einer Amazon Web Services EC2 Instanz, siehe dies [Amazon Web Services Überblick](/docs/server-admin/additional-information#amazon) zuerst.
*  **Linux und Macs** -- ERDDAP™ funktioniert großartig auf Linux- und Mac-Computern. Siehe unten die Anweisungen.
*  **Windows** -- Windows ist gut für Tests ERDDAP™ und für den persönlichen Gebrauch (siehe unten die Anweisungen) ,
aber wir empfehlen es nicht für die Öffentlichkeit zu verwenden ERDDAP™ Bereitstellungen. Laufen ERDDAP™ unter Windows kann Probleme haben:
insbesondere ERDDAP™ kann Dateien schnell löschen und/oder umbenennen können. Dies ist wahrscheinlich auf Antivirus-Software zurückzuführen
   (z.B. von McAfee und Norton) die die Dateien für Viren überprüft. Wenn Sie in dieses Problem laufen
(die durch Fehlermeldungen in der [Pressemitteilung](/docs/server-admin/additional-information#log) Datei wie
"Unable to delete ..."), das Ändern der Antivirus-Software-Einstellungen kann das Problem teilweise lindern. Oder betrachten Sie stattdessen einen Linux- oder Mac-Server.

 **Der Standard ERDDAP™ Installationsanweisungen für Linux, Macs und Windows-Computer sind:** 

0. Stellen Sie sicher, dass alle Abhängigkeiten installiert sind. Auf Nicht-Windows-Maschinen (Linux und Mac) Sie brauchen Csh.

##  Java  {#java} 

1.  [Für ERDDAP™ v2.19+, eingerichtet Java 21.](#java) 
Aus Sicherheitsgründen ist es fast immer am besten, die neueste Version von Java 21.
Bitte laden und installieren Sie die neueste Version
    [OpenJDK von Adoptium (Temurin) ANHANG (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Um die Installation zu überprüfen, führen Sie zum Beispiel `/javaJreBinDirectory/java -version` aus.
`/usr/local/jdk-21.0.3+9/jre/bin/java -Version.

    ERDDAP™ Arbeiten mit Java aus anderen Quellen, aber wir empfehlen Adoptium, weil es die wichtigste, gemeinschaftlich unterstützt,
kostenlos (wie in Bier und Sprache) Version von Java 21 das bietet langfristige Unterstützung (kostenlose Upgrades seit vielen Jahren über die erste Veröffentlichung) .
Aus Sicherheitsgründen, bitte aktualisieren Sie Ihre ERDDAP 's Version von Java periodisch als neue Versionen Java 21 von Adoptium erhältlich.

    ERDDAP™ wurde intensiv mit 21 nicht anderen Versionen getestet und verwendet. Aus verschiedenen Gründen testen wir weder mit anderen Versionen von Java .
     
## Tomcat{#tomcat} 

2.  [Einrichten](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat ist die am häufigsten verwendete Java Anwendungsserver,
die Java Software, die zwischen den Netzdiensten des Betriebssystems steht und Java Serversoftware wie ERDDAP™ .
Es ist Freie und Open Source Software (FOSS) .

Sie können einen anderen verwenden Java Anwendungsserver (z.B., Jetty) , aber wir testen und unterstützen Tomcat.

   * Laden Sie Tomcat herunter und entpacken Sie es auf Ihrem Server oder PC.
Aus Sicherheitsgründen ist es fast immer am besten, die neueste Version von Tomcat 10 zu verwenden (Version 9 und unten sind nicht akzeptabel) 
die mit Java 21 oder neuer. Im Folgenden wird das Tomcat-Verzeichnis als "tomcat" bezeichnet.

__Warning&#33;___ Wenn Sie bereits einen Tomcat mit einer anderen Web-Anwendung haben (insbesondere THREDDS) , wir empfehlen Ihnen zu installieren ERDDAP™ in
      [ein zweiter Tomcat](/docs/server-admin/additional-information#second-tomcat) , weil ERDDAP™ verschiedene Tomcat-Einstellungen
und sollte nicht mit anderen Anwendungen für den Speicher konten müssen.

     * Auf Linux, [den "Core" "Tar" herunterladen .gz " Tomcat Verteilung](https://tomcat.apache.org/download-10.cgi) und auspacken.
Wir empfehlen das Auspacken in `/usr/local`.
     * Auf einem Mac ist Tomcat wahrscheinlich bereits in `/Library/Tomcat installiert, aber sollte es auf die neueste Version von Tomcat 10 aktualisieren.
Wenn Sie es herunterladen, [den "Core" "Tar" herunterladen .gz " Tomcat Verteilung](https://tomcat.apache.org/download-10.cgi) und in `/Library/Tomcat` auspacken.
     * Unter Windows können Sie [die "Core" "zip" Tomcat Distribution herunterladen](https://tomcat.apache.org/download-10.cgi) 
        (die nicht mit der Windows-Registrierung übereinstimmt und die Sie von einer DOS-Befehlszeile steuern) und in einem entsprechenden Verzeichnis auspacken.
        (Für die Entwicklung verwenden wir die "Core" "zip" Distribution. Wir machen ein `/programs`-Verzeichnis und entpacken es dort.) 
Oder Sie können die "Core" "64-bit Windows Zip" Distribution herunterladen, die mehr Funktionen beinhaltet.
Wenn die Distribution ein Windows-Installer ist, wird es wahrscheinlich Tomcat in, zum Beispiel `/Program Files/apache-tomcat-10.0.23`.
             
### Server.xml{#serverxml} 

*  [Server.xml](#serverxml) - In der `tomcat/conf/server.xml`-Datei gibt es zwei Änderungen, die Sie zu jedem der beiden machen sollten ` <Connector> ` Tags
   (eine für `&lt;Connector port="8080" und eine für `&lt;Conector port="8443") .
   1.  (Empfohlen) Erhöhen Sie den Parameterwert `connectionTimeout`, vielleicht auf 300000 (Millisekunden, 5 Minuten) .
   2.  (Empfohlen) Fügen Sie einen neuen Parameter hinzu: `relaxedQueryChars="[] | ". Dies ist optional und etwas weniger sicher,
aber entfernt die Notwendigkeit, dass Benutzer diese Zeichen prozentual kodieren, wenn sie in den Parametern der Anfrage-URL eines Benutzers auftreten.
             
### Inhalt.xml{#contentxml} 

* kontext.xml -- Ressourcen Cache - In `tomcat/conf/context.xml`, direkt vor dem ``` </Context> ` tag, ändern Sie das Ressourcen-Tag
   (oder hinzufügen, wenn es nicht schon da ist) den Cache einstellen MaxSize-Parameter auf 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Dies vermeidet zahlreiche Warnungen in Catalina. das alles beginnt
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeout{#apache-timeout} 

* Ändern Sie auf Linux-Computern die Apache-Timeout-Einstellungen, so dass zeitraubende Benutzeranfragen nicht Timeout
   (mit dem, was oft als "Proxy" oder "Bad Gateway"-Fehler erscheint) . Als root-Benutzer:
  * Ändern des Apache ` http d.conf-Datei (in der Regel `/etc/ http d/conf/ `) :
    * Ändern der vorhandenen ` <Timeout> ` Einstellung (oder eine am Ende der Datei hinzufügen) bis 3600 (Sekunden) , statt der Standard 60 oder 120 Sekunden.
    * Ändern der vorhandenen ` <ProxyTimeout> ` Einstellung (oder eine am Ende der Datei hinzufügen) bis 3600 (Sekunden) , statt der Standard 60 oder 120 Sekunden.
  * Apache neu: `/usr/sbin/apachectl -k anmutig ` (aber manchmal ist es in einem anderen Verzeichnis) .

### Sicherheit{#security} 
         
* Sicherheitsempfehlung: Siehe [Diese Anweisungen](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) die Sicherheit zu erhöhen
Ihre Tomcat-Installation, insbesondere für öffentliche Server.
         
* Für die Öffentlichkeit ERDDAP™ Installationen auf Linux und Macs, ist es am besten, Tomcat einzurichten (das Programm) als Mitglied `tomcat `
   (einem separaten Benutzer mit begrenzten Berechtigungen, [hat kein Passwort](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
So kann nur der Superbenutzer als Benutzer "tomcat" wechseln. Dies macht es für Hacker unmöglich, sich als User `tomcat` an Ihren Server anzumelden.
Und in jedem Fall sollten Sie es so machen, dass der `tomcat` Benutzer sehr begrenzte Berechtigungen auf dem Dateisystem des Servers hat (read+write+execute Privilegien
für den `apache-tomcat` Verzeichnisbaum und `` <bigParentDirectory> ` und lesen Sie nur Privilegien für Verzeichnisse mit Daten, die ERDDAP™ muss Zugang haben).
  * Sie können das Benutzerkonto von `tomcat` erstellen (die kein Passwort haben) mit dem Befehl:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Sie können als Benutzer wechseln `tomcat` mit dem Befehl
    ```
    sudo su - tomcat
    ```
     (Es wird Sie um das Superuser-Passwort bitten, um dies zu tun.) 
    * Sie können die Arbeit als Benutzer-Tomcat durch den Befehl stoppen
    ```
    exit
    ````
    * Den größten Teil des restlichen Tomcat und ERDDAP™ Setupanleitung als Benutzer `tomcat`. Später führen Sie die Skripte `startup.sh` und `shutdown.sh` als Benutzer `tomcat `
so dass Tomcat die Erlaubnis hat, in seine Protokolldateien zu schreiben.
    * Nach dem Auspacken von Tomcat aus dem Stamm des `apache-tomcat`-Verzeichnisses:
      * Ändern Sie das Eigentum an dem apache-tomcat-Verzeichnisbaum zum tomcat-Benutzer.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (aber ersetzen Sie den tatsächlichen Namen Ihres tomcat Verzeichnisses) .
      * Ändern Sie die "Gruppe" tomcat, Ihren Benutzernamen oder den Namen einer kleinen Gruppe, die tomcat und alle Administratoren von Tomcat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Ändern Sie die Berechtigungen, damit Tomcat und die Gruppe lesen, schreiben, Privilegien ausführen:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Entfernen Sie die Berechtigungen von "anderen" Benutzern zum Lesen, Schreiben oder Ausführen:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Dies ist wichtig, weil es verhindert, dass andere Benutzer möglicherweise sensible Informationen in ERDDAP™ Setup-Dateien.

### Speichermedien{#memory} 

Set Tomcats Umweltvariablen

* Auf Linux und Macs:
Erstellen einer Datei `tomcat/bin/setenv.sh ` (oder in Red Hat Enterprise Linux \\[ RHEL \\] `~tomcat/conf/tomcat10.conf `) Tomcats Umgebungsvariablen einstellen.
Diese Datei wird von `tomcat/bin/startup.sh` und `shutdown.sh` verwendet. Die Datei sollte etwas wie:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (aber ersetzen Sie die Verzeichnisnamen von Ihrem Computer) .
   (Wenn Sie zuvor `JRE_HOME` gesetzt haben, können Sie das entfernen.) 
Auf Macs müssen Sie wahrscheinlich nicht `JAVA_HOME` setzen.

* Unter Windows:
Erstellen Sie eine Datei `tomcat\bin\\setenv.bat`, um Tomcats Umgebungsvariablen einzustellen.
Diese Datei wird von `tomcat\bin\\startup.bat` und `` verwendet. shutdown.bat `.
Die Datei sollte etwas wie:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (aber ersetzen Sie die Verzeichnisnamen von Ihrem Computer) .
Wenn dies nur für lokale Tests ist, entfernen Sie "-server".
   (Wenn Sie zuvor `JRE_HOME` gesetzt haben, können Sie das entfernen.) 

Die Speichereinstellungen `-Xmx` und `-Xms sind wichtig, weil ERDDAP™ arbeitet besser mit mehr Erinnerung.
Setzen Sie immer `-Xms` auf den gleichen Wert wie `-Xmx`.

* Für 32 Bit Betriebssysteme und 32 Bit Java :
64 Bit Java ist viel besser als 32 Bit Java , aber 32 Bit Java wird funktionieren, solange der Server nicht wirklich beschäftigt ist.
Je physischer Speicher im Server desto besser: 4+ GB ist wirklich gut, 2 GB ist okay, weniger wird nicht empfohlen.
mit 32 Bit Java , auch mit reichlich physischem Gedächtnis, Tomcat und Java wird nicht laufen, wenn Sie versuchen, `-Xmx` viel über 1500M setzen (1200M auf einigen Computern) .
Wenn Ihr Server weniger als 2 GB Speicher hat, reduzieren Sie den `-Xmx` Wert (in 'M'egaBytes) bis 1/2 des physischen Gedächtnisses des Computers.

* Für 64 Bit Betriebssysteme und 64 Bit Java :
64 Bit Java wird nur an einem 64-Bit-Betriebssystem arbeiten.
  * mit Java 8, Sie müssen `-d64` zum Tomcat `CATALINA_OPTS` Parameter in `setenv.bat` hinzufügen.
  * mit Java 21, Sie wählen 64 Bit Java wenn Sie eine Version herunterladen Java markiert "64 bit".

mit 64 Bit Java , Tomcat und Java kann sehr hohe `-Xmx` und `-Xms` Einstellungen verwenden. Je physischer Speicher im Server desto besser.
Als vereinfachender Vorschlag empfehlen wir Ihnen `-Xmx` und `-Xms` zu setzen (in 'M'egaBytes) bis 1/2 (oder weniger) der physischen Erinnerung des Computers.
Sie können sehen, ob Tomcat, Java , und ERDDAP™ sind in der Tat in 64-Bit-Modus durch die Suche nach "Bit" in ERDDAP 's Daily Report E-Mail
oder im `bigParentDirectory/logs/ [Pressemitteilung](/docs/server-admin/additional-information#log) ` Datei (`bigParentDirectory` ist in [Setup.xml](#setupxml) ) .

#### Müllsammlung{#garbage-collection} 

* In ERDDAP™ ' [Pressemitteilung](/docs/server-admin/additional-information#log) Datei, Sie werden viele sehen "GC (Verlagerungsversagen) " Nachrichten.
Dies ist in der Regel kein Problem. Es ist eine häufige Nachricht von einem normalerweise arbeitenden Java sagen, dass es gerade einen kleinen Müll beendet
Sammlung, weil es aus dem Raum in Eden (der Abschnitt des Java Heap für sehr junge Objekte) . Normalerweise zeigt die Nachricht Sie
`memoryUseBefore-&gt;memoryUseAfter`. Wenn diese beiden Zahlen zusammen sind, bedeutet das, dass die Müllsammlung nicht produktiv war.
Die Nachricht ist nur ein Zeichen von Schwierigkeiten, wenn es sehr häufig ist (alle paar Sekunden) , nicht produktiv, und die Zahlen sind groß und nicht wächst,
die zusammen angeben, Java braucht mehr Speicher, ist kämpfen, um Speicher freizugeben, und ist nicht in der Lage, Speicher freizugeben.
Dies kann während einer stressigen Zeit geschehen, dann verschwinden. Aber wenn es fortdauert, ist das ein Zeichen von Ärger.
* Wenn Sie `java.lang.OutOfMemoryError`s in ERDDAP™ ' [Pressemitteilung](/docs/server-admin/additional-information#log) Datei,
siehe [Ausgewählt](/docs/server-admin/additional-information#outofmemoryerror) für Tipps, wie man die Probleme diagnostiziert und löst.
         
### Genehmigungen{#permissions} 

*  [Auf Linux und Macs ändern Sie die Berechtigungen](#permissions) von allen `*.sh` Dateien in `tomcat/bin/`, die vom Eigentümer ausführbar sind:
  ```
  chmod +x *.sh
  ```

### Schriftarten{#fonts} 

*  [Schriften für Bilder:](#fonts) Wir bevorzugen die freien [DejaVu schriftarten](https://dejavu-fonts.github.io/) zum anderen Java schriftarten.
Die Verwendung dieser Schriftarten wird dringend empfohlen, aber nicht erforderlich.

Wenn Sie nicht die DejaVu Schriftarten verwenden möchten, müssen Sie die SchriftartFamilieneinstellung in setup.xml zu ` ändern. <fontFamily> SansSerif </fontFamily> `,
die mit allen Java Verteilungen. Wenn Sie ` <fontFamily> ` zum Namen einer Schrift, die nicht verfügbar ist, ERDDAP™ wird nicht geladen
und druckt eine Liste der verfügbaren Schriftarten in der Datei `log.txt`. Sie müssen eine dieser Schriftarten verwenden.

Wenn Sie die DejaVu-Schriften verwenden möchten, stellen Sie bitte sicher, dass <fontFamily> ` Einstellung in setup.xml ist ` <fontFamily> DejaVu Sans </fontFamily> `.

Um die DejaVu Schriftarten zu installieren, laden Sie bitte herunter [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 Bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
und entpacken Sie die Schriftdateien in ein temporäres Verzeichnis.

  * Auf Linux:
    * Für Linux Adoptium Java Verteilungen, siehe [Diese Anweisungen](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * mit anderen Java Verteilungen: Als `tomcat` Benutzer kopieren Sie die Schriftdateien in `$JAVA_HOME/lib/fonts` so Java die Schriftarten finden.
Denken Sie daran: wenn/wenn Sie später auf eine neuere Version upgraden Java , Sie müssen diese Schriftarten neu installieren.
  * Auf Macs: für jede Schriftdatei, Doppelklick auf sie und klicken Sie dann auf Install Font.
  * Unter Windows 7 und 10: Wählen Sie im Windows Explorer alle Schriftdateien aus. Rechtsklick. Klicken Sie auf Installieren.
             
### Test Tomcat{#test-tomcat} 

* Testen Sie Ihre Tomcat Installation.
  * Linux:
    * Als Benutzer "tomcat", führen Sie `tomcat/bin/startup.sh`.
    * Ihre URL anzeigen + ":8080/" in Ihrem Browser (z.B., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (tomcat als Systemadministrator-Benutzer ausführen) :
    * Führen Sie `tomcat/bin/startup.sh`.
    * Ihre URL anzeigen + ":8080/" in Ihrem Browser (z.B., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Beachten Sie, dass Ihr Tomcat standardmäßig nur von Ihnen zugänglich ist. Es ist nicht öffentlich zugänglich.
  * Windows localhost:
    * Klicken Sie mit der rechten Maustaste auf das Tomcat-Symbol im System-Tablet und wählen Sie "Start-Service".
    * Blick [http://127.0.0.1:8080/](http://127.0.0.1:8080/) oder vielleicht [http://localhost:8080/](http://localhost:8080/) , in Ihrem Browser. Beachten Sie, dass Ihr Tomcat standardmäßig nur von Ihnen zugänglich ist. Es ist nicht öffentlich zugänglich.

Sie sollten die Tomcat "Glückwünsche" Seite sehen.

Wenn es Probleme gibt, sehen Sie die Tomcat-Log-Datei bei `tomcat/logs/catalina.out`.

### Probleme mit der Tomcat-Installation?{#troubles-with-the-tomcat-installation} 

* Auf Linux und Mac, wenn Sie nicht Tomcat oder ERDDAP™   (oder vielleicht können Sie sie einfach nicht von einem Computer außerhalb Ihrer Firewall erreichen) ,
Sie können testen, ob Tomcat Port 8080 hört, indem Sie tippen (als Wurzel) auf einer Befehlszeile des Servers:

  ```
  netstat -tuplen | grep 8080
  ```

Das sollte eine Zeile mit etwas wie:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (wo `#` eine Ziffer ist) , angeben, dass ein `java` Prozess (Vermutlich Tomcat) hört auf dem Hafen "8080" für "tcp" Verkehr.
Wurden keine Zeilen zurückgegeben, ist die zurückgegebene Zeile deutlich anders, oder wurden zwei oder mehr Zeilen zurückgegeben, so kann es ein Problem mit den Porteinstellungen geben.

* Siehe die Tomcat Protokolldatei `tomcat/logs/catalina.out`. Tomcat Probleme und einige ERDDAP™ Startup-Probleme werden dort fast immer angezeigt.
Dies ist üblich, wenn Sie zuerst einrichten ERDDAP™ .

* Siehe [Tomcat](https://tomcat.apache.org/) Website oder suchen Sie das Internet nach Hilfe, aber bitte teilen Sie uns die Probleme mit, die Sie hatten und die Lösungen, die Sie gefunden haben.

* Sehen Sie uns [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .
             
###  ERDDAP™ Inhalt{#erddap-content} 
3.   [Richten Sie die Konfigurationsdateien `tomcat/content/erddap` ein.](#erddap-content) 
Auf Linux, Mac und Windows herunterladen [ErddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
und entpacken Sie es in das `tomcat`-Verzeichnis, Erstellen von `tomcat/content/erddap`.

__Version 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datiert 2024-10-14__

Einige vorherige Versionen sind ebenfalls verfügbar:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 Bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datiert 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 Bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datiert 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 Bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, datiert 2022-10-09) 
    *  [TEIL 2](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 Bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, datiert 2022-12-08) 
    *  [KAPITEL 3](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 Bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, datiert 2023-02-27) 

#### Sonstiges Verzeichnis{#other-directory} 

Für Red Hat Enterprise Linux (RHEL) oder für andere Situationen, in denen Sie das Tomcat-Verzeichnis nicht ändern dürfen oder wo Sie wollen/benötigt haben
um die ERDDAP™ Inhaltsverzeichnis in einem anderen Ort aus einem anderen Grund (zum Beispiel, wenn Sie Jetty anstelle von Tomcat verwenden) ,
`erdddapContent .zip ` in das gewünschte Verzeichnis (nur der `tomcat` Benutzer hat Zugriff) und ` erddapContentDirectory ` Systemimmobilie
 (z.B. ` erddapContentDirectory  =~tomcat/content/erddap `) also ERDDAP™ finden Sie dieses neue Content-Verzeichnis.

### Setup.xml{#setupxml} 

*  [Lesen Sie die Kommentare in `tomcat/content/erdap/setup.xml `](#setupxml) und die gewünschten Änderungen vornehmen. setup.xml ist die Datei mit allen Einstellungen, die festlegen, wie Ihr ERDDAP™ verhält sich.

Für die erste Einrichtung müssen Sie diese Einstellungen zumindest ändern:
      * ` <bigParentDirectory> `
      * ` <emailEverythingTo> `
      * ` <baseUrl> `
      * ` <email...> ` Einstellungen
      * ` <admin...> ` Einstellungen
      * ` <baseHttpsUrl> ` (wenn Sie einrichten https ) 

Wenn Sie das BigParentDirectory erstellen, aus dem Stammverzeichnis von bigParentDirectory:

    * Machen Sie den `tomcat` Benutzer den Besitzer des `bigParentDirectory`:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Ändern Sie die "Gruppe" tomcat, Ihren Benutzernamen oder den Namen einer kleinen Gruppe, die tomcat und alle Administratoren von Tomcat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Ändern Sie die Berechtigungen, damit Tomcat und die Gruppe lesen, schreiben, Privilegien ausführen:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Entfernen Sie die Berechtigungen von "anderen" Benutzern zum Lesen, Schreiben oder Ausführen. Dies ist wichtig, um das Lesen möglicherweise sensibler Informationen zu verhindern
in ERDDAP™ Log-Dateien und Dateien mit Informationen über private Datensätze.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Umweltvariablen{#environment-variables} 

Beginnen mit ERDDAP™ V2.13, ERDDAP™ Administratoren können jeden Wert in setup.xml überschreiben, indem eine Umgebungsvariable angegeben wird
Name ` ERDDAP _valueName` vor dem Laufen ERDDAP™ . Zum Beispiel ` ERDDAP _baseUrl` übertreibt die ` <baseUrl> Wert.
Dies kann bei der Bereitstellung hilfreich sein ERDDAP™ mit einem Container wie Docker, wie Sie Standardeinstellungen in setup.xml setzen können
und dann spezielle Einstellungen über Umgebungsvariablen liefern. Wenn Sie geheime Informationen angeben ERDDAP™ über dieses Verfahren,
überprüfen, ob die Informationen geheim bleiben. ERDDAP™ nur einmal pro Start Umgebungsvariablen liest,
in der ersten Sekunde des Starts, so ist eine Möglichkeit, dies zu verwenden: die Umgebungsvariablen festlegen, starten ERDDAP ,
bis ERDDAP™ wird gestartet, dann die Umgebungsvariablen nicht mehr.

###  datasets.xml  {#datasetsxml} 

* Lesen Sie die Kommentare [ **Arbeiten mit dem datasets.xml Datei** ](/docs/server-admin/datasets) . Später, nachdem Sie bekommen haben ERDDAP™ Laufen
zum ersten Mal (in der Regel mit nur den Standarddatensätzen) , Sie ändern das XML in `tomcat/content/erdap/ datasets.xml `
alle von Ihnen gewünschten Datensätze angeben ERDDAP™ zu dienen. Hier verbringen Sie den Großteil Ihrer Zeit
während der Einrichtung ERDDAP™ und später, während Sie Ihre ERDDAP™ .

Sie können ein Beispiel sehen [ datasets.xml auf GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Anders als) Jetzt oder (etwas wahrscheinlicher) in der Zukunft, wenn Sie die CSS-Datei von erddap ändern möchten, kopieren
`tomcat/content/erddap/images/erddapStart2.css` zu `tomcat/content/erddap/images/erddap2.css` und dann Änderungen daran vornehmen.
Änderungen an `erddap2.css` wirken nur dann, wenn ERDDAP™ wird neu gestartet und erfordert oft auch den Benutzer, die Cache-Dateien des Browsers zu löschen.
     
 ERDDAP™ wird nicht korrekt funktionieren, wenn die setup.xml oder datasets.xml Datei ist keine gut ausgebildete XML-Datei. Also, nachdem Sie diese Dateien bearbeitet haben,
es ist eine gute Idee, zu überprüfen, ob das Ergebnis gut gebildet XML ist, indem der XML-Text in einen XML-Checker wie [xmlvalidierung](https://www.xmlvalidation.com/) .
     
### Installieren Sie das Erddap. Kriegsakte{#install-the-erddapwar-file} 

4. Unter Linux, Mac und Windows __download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) __ in `tomcat/webapps`:

__Version 2.28.0, 620,824,288 Bytes, MD5=f948b2ba603f65a83ac67af43da9e4c2, datiert 2025-08-29___

Die .war-Datei ist groß, weil sie hochauflösende Küste, Grenze und Höhendaten enthält, die benötigt werden, um Karten zu erstellen.

Einige vorherige Versionen sind ebenfalls verfügbar.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 Bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, datiert 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551.069,844 Bytes, MD5=461325E97E7577EC671DD50246CCFB8B, datiert 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 Bytes, MD5=F2CFF805893146E932E498FDDBD519B6, datiert 2022-10-09) 
   *  [TEIL 2](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 Bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, datiert 2022-12-08) 
   *  [KAPITEL 3](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 Bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, datiert 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 Bytes, MD5=970fbee172e28b0b8a07756eecbc898e, datiert 2024-06-07) 
   *  [2.2.](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 Bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, datiert 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 Bytes, MD5=99a725108b37708e5420986c16a119, datiert 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 Bytes, MD5=3b2086c659ee4145ca2dff447bf4ef7, datiert 2025-06-11) 

### Proxy konfigurieren (spezifisch)  {#proxy} 

 ERDDAP™ wird typischerweise hinter einem Webserver-Reverse-Proxy bereitgestellt, um es auf Standard-HTML-Ports zu bedienen (80 und 443) .
SSL/TLS-Terminierung wird häufig auch an der Webserver-Proxyschicht hanlded. Spezifika sind abhängig von den Anforderungen jeder Bereitstellung.

#### Apache{#apache} 

1. Stellen Sie sicher, dass `mod_proxy` und `mod_proxy_ http ` werden geladen:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Ändern der vorhandenen ` <VirtualHost> ` Tag (wenn es eine gibt) , oder fügen Sie eine am Ende der Datei hinzu:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

wenn ERDDAP™ wird auf einem anderen Weg als `/erddap` serviert, auch das `X-Forwarded-Prefix`-Header auf den
Pfadsegment _vor_ `/erddap`. Diese Einstellung wäre für eine ERDDAP™ serviert
`/subpath/erdap`:

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Dann neu starten Apache: `/usr/sbin/apachectl -k anmutig ` (aber manchmal ist es in einem anderen Verzeichnis) .
         
#### NGINX{#nginx} 

In der nginx config-Datei setzen Sie diese Header:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

wenn ERDDAP™ wird auf einem anderen Weg als `/erddap` serviert, auch das `X-Forwarded-Prefix`-Header auf den
Pfadsegment _vor_ `/erddap`. Diese Einstellung wäre für eine ERDDAP™ serviert
`/subpath/erdap`:

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Um NGINX zu erhalten und ERDDAP™ richtig arbeiten mit https , Sie müssen den folgenden Snippet in den Tomcat Server.xml ` setzen <Host> ` Block:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Tomcat{#start-tomcat} 

*  (Ich empfehle nicht den Tomcat Web Application Manager. Wenn Sie nicht vollständig abschalten und starten Tomcat, früher oder später haben Sie PermGen Speicher Probleme.) 
*  (In Linux oder Mac OS, wenn Sie einen speziellen Benutzer erstellt haben, um Tomcat laufen, z.B. tomcat, erinnern Sie sich, die folgenden Schritte wie dieser Benutzer zu tun.) 
* Wenn Tomcat schon läuft, schalte Tomcat mit (in Linux oder Mac OS) `tomcat/bin/shutdown.sh`
oder (in Windows) `tomcat\bin\\ shutdown.bat `

Verwenden Sie auf Linux `ps -ef | grep tomcat` vor und nach `shutdown.sh` um sicherzustellen, dass der tomcat-Prozess gestoppt ist.
Der Prozess sollte vor der Stilllegung aufgeführt und schließlich nicht nach der Stilllegung aufgeführt werden.
Es kann eine Minute oder zwei für ERDDAP™ um vollständig abzuschalten. Sei geduldig. Oder wenn es aussieht, als würde es nicht allein aufhalten, verwenden Sie:
`kill -9 <processID> `
* Start Tomcat mit (in Linux oder Mac OS) `tomcat/bin/startup.sh` oder (in Windows) `tomcat\bin\\startup.bat `

## I ERDDAP™ Laufen?{#is-erddap-running} 

Verwenden Sie einen Browser, um anzuzeigenhttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ startet ohne geladene Datensätze. Datensätze werden in einem Hintergrundfaden geladen und werden so einzeln verfügbar.

### Fehlerbehebung{#troubleshooting} 

* Wenn eine Anfrage von einem Benutzer kommt, geht es nach Apache (auf Linux- und Mac OS-Computern) Dann Tomcat. ERDDAP™ .
* Sie können sehen, was zu Apache kommt (und damit verbundene Fehler) in den Apache-Log-Dateien.
*    [Du](/docs/server-admin/additional-information#tomcat-logs) sehen, was zu Tomcat kommt (und damit verbundene Fehler) 
in den Tomcat Log-Dateien (`tomcat/logs/catalina.out` und andere Dateien in diesem Verzeichnis) .
*    [Du](/docs/server-admin/additional-information#log) sehen, was kommt ERDDAP , diagnostische Nachrichten aus ERDDAP ,
und Fehlermeldungen von ERDDAP in der ERDDAP™ ` <bigParentDirectory> /logs/log.txt` Datei.
* Tomcat fängt nicht an ERDDAP™ bis Tomcat eine Anfrage für ERDDAP™ . So können Sie in den Tomcat Log-Dateien sehen, wenn es
begann ERDDAP™ oder wenn es eine mit diesem Versuch verbundene Fehlermeldung gibt.
* Wann ERDDAP™ beginnt, es umbenannt die alten ERDDAP™ log.txt Datei (`logArchiv Am <CurrentTime> .txt) und erstellt eine neue log.txt-Datei.
Wenn also die `log.txt`-Datei alt ist, ist es ein Zeichen, dass ERDDAP™ hat nicht vor kurzem neu gestartet. ERDDAP™ schreibt Log-Info zu einem Puffer
und schreibt nur den Puffer in die Log-Datei periodisch, aber Sie können zwingen ERDDAP™ um den Puffer in die Log-Datei zu schreiben, indem Sie
` /erddap/status.html `.

### Probleme: Alte Version Java  {#trouble-old-version-of-java} 

Wenn Sie eine Version von Java das ist zu alt für ERDDAP , ERDDAP™ wird nicht ausgeführt und Sie werden eine Fehlermeldung in Tomcats Log-Datei wie sehen

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Die Lösung ist, die neueste Version zu aktualisieren Java und stellen Sie sicher, dass Tomcat es verwendet.

### Probleme: langsames Startup Erstes Mal{#trouble-slow-startup-first-time} 

Tomcat muss zum ersten Mal eine Anwendung wie ERDDAP™ wird gestartet; vor allem muss es die `erdap.war` Datei auspacken
 (die wie ein .zip Datei) . Auf einigen Servern, der erste Versuch, zu sehen ERDDAP™ Stände (30 Sekunden?) bis diese Arbeit beendet ist.
Auf anderen Servern wird der erste Versuch sofort scheitern. Aber wenn Sie 30 Sekunden warten und wieder versuchen, wird es erfolgreich sein, wenn ERDDAP™ wurde korrekt installiert.

Dafür gibt es keine Lösung. So funktioniert Tomcat einfach. Aber es tritt nur das erste Mal, nachdem Sie eine neue Version installieren ERDDAP™ .

## Abschalten und Neustart{#shut-down-and-restart} 

In der Zukunft, zu stillen (und Neustart)   ERDDAP™ , siehe [Wie schalte ich die Klappe und stelle Tomcat und ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Ärger?{#trouble} 

Probleme bei der Installation von Tomcat oder ERDDAP™ ? Sehen Sie uns [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .

## E-Mail-Benachrichtigung über neue Versionen von ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Wenn Sie eine E-Mail erhalten möchten, wann immer eine neue Version von ERDDAP™ ist verfügbar oder wichtig ERDDAP™ Ankündigungen,
ihr könnt mitmachen ERDDAP™ Liste der Ankündigungen [Hier.](https://groups.google.com/g/erddap-announce) . Diese Liste durchschnittlich etwa eine E-Mail alle drei Monate.

## Anpassen{#customize} 

*  [Passen Sie Ihre ERDDAP™ Ihre Organisation hervorzuheben (nicht NOAA   ERD ) .](#customize) 
* Ändern Sie das Banner, das an der Spitze aller erscheint ERDDAP™ .html-Seiten durch Bearbeiten des ` <startBodyHtml5> ` tag in your ` datasets.xml ` Datei.
(Wenn es keinen gibt, kopieren Sie den Standard aus ERDDAP™ `tomcat/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` Datei
` datasets.xml ` und bearbeiten.) Zum Beispiel:
  * Verwenden Sie ein anderes Bild (d.h. das Logo Ihrer Organisation) .
  * Ändern Sie die Hintergrundfarbe.
  * " ERDDAP™ " zu "_YourOrganization_'s ERDDAP™ "
  * Ändern Sie den "leichteren Zugang zu wissenschaftlichen Daten" zu "leichteren Zugriff auf _YourOrganization_s Daten".
  * Ändern Sie die "Brought to you by" Links, um Links zu Ihrer Organisation und Finanzierungsquellen zu sein.
* Ändern Sie die Informationen auf der linken Seite der Startseite, indem Sie die ` <theShortDescriptionHtml> ` tag in your ` datasets.xml ` Datei.
(Wenn es keinen gibt, kopieren Sie den Standard aus ERDDAP™ `tomcat/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` Datei
` datasets.xml ` und bearbeiten.) Zum Beispiel:
  * Beschreiben Sie, was Ihre Organisation und/oder Gruppe tut.
  * Beschreiben Sie, welche Art von Daten diese ERDDAP™ hat.
  * Um das Symbol zu ändern, das auf Browser-Tabs erscheint, setzen Sie Ihr Unternehmen favicon. ico in `tomcat/content/erdap/images/`.
Siehehttps://en.wikipedia.org/wiki/Favicon.
