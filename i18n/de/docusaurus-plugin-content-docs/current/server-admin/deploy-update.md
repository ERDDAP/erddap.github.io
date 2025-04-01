---
sidebar_position: 2
---
# Aktualisierung
Wie man ein Update eines Vorstehenden tutERDDAP™auf Ihrem Server

## Änderungen{#changes} 
1. Ändern Sie die in[Änderungen](/changes)in der Sektion "DingeERDDAP™Administratoren müssen wissen und tun" für alleERDDAP™Versionen seit der verwendeten Version.
     
## Java {#java} 
2. Wenn Sie vonERDDAP™Version 2.18 oder unten, Sie müssen aufJavaANHANG (oder neuer) und den verwandten Tomcat 10. Siehe regelmäßigeERDDAP™Installationsanweisungen für[Java](/docs/server-admin/deploy-install#java)und[Tomcat](/docs/server-admin/deploy-install#tomcat). Sie müssen auch Ihre_tomcat_/content/erddapVerzeichnis von Ihrer alten Tomcat Installation auf Ihre neue Tomcat Installation.

## Downloads{#download} 
3. Downloads[Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)in _tomcat_/webapps .
     (Version 2.26, 607,404,032 Bytes, MD5=99a725108b37708e5420986c16a119, datiert 03-31-2025) 
     
## Nachrichten.xml{#messagesxml} 
4. 
    * Gemeinsam: Wenn Sie vonERDDAP™Version 1.46 (oder höher) und Sie verwenden nur die Standardnachrichten, die neue Standardnachrichten.xml wird automatisch installiert (unter den .class Dateien über erddap. Krieg) .
         
    * Selten: Wenn Sie vonERDDAP™Version 1.44 (oder darunter) ,
Sie müssen die alte Message.xml-Datei löschen:
        _tomcat_/content/erddap/messages.xml .
Die neuen Standardnachrichten.xml werden automatisch installiert (unter den .class Dateien über erddap. Krieg) .
         
    * Selten: Wenn Sie immer Änderungen an der Standard-Nachrichten.xml-Datei vornehmen (in place) ,
Sie müssen diese Änderungen in der neuen Messages.xml-Datei (die ist
WEB-INF/classes/gov/noaa/pfel/erdap/util/messages.xml nach erddap.war wird von Tomcat dekomprimiert).
         
    * Selten: Wenn Sie eine benutzerdefinierte Nachrichten.xml-Datei in_tomcat_/content/erddap/,
du musst herausfinden (via diff) welche Änderungen an der Standard-Nachrichten.xml vorgenommen wurden (die sich im neuen Erddap befinden). Krieg als
WEB-INF/classes/gov/noaa/pfel/erdap/util/messages.xml) und modifizieren Sie Ihre benutzerdefinierte message.xml-Datei entsprechend.
         
## Installieren{#install} 
5. Installieren Sie das neueERDDAP™in Tomcat:
) Verwenden Sie Tomcat Manager nicht. Früher oder später gibt es PermGen Speicherprobleme. Es ist besser, tatsächlich abschalten und starten Tomcat.
\\* Ersetzen Sie Referenzen auf _tomcat_ unten mit dem aktuellen Tomcat-Verzeichnis auf Ihrem Computer.
     
### Linux und Macs{#linux-and-macs} 
1. Shutdown Tomcat: Verwenden Sie aus einer Befehlszeile: _tomcat_/bin/shutdown.sh
Und nutzen ps -ef|grep tomcat zu sehen, ob/wenn der Prozess gestoppt wurde. (Es kann eine Minute oder zwei dauern.) 
2. Entfernen Sie die dekomprimiertenERDDAP™Installation: In _tomcat_/webapps, verwenden
rm -rf erddap
3. Löschen Sie das alte Erddap. Kriegsdatei: In _tomcat_/webapps verwenden Sie rm erddap. Krieg
4. Kopieren Sie das neue Erddap. Kriegsdatei aus dem temporären Verzeichnis zu _tomcat_/webapps
5. Tomcat undERDDAP: Verwendung _tomcat_/bin/startup.sh
6. BlickERDDAP™in Ihrem Browser überprüfen, ob der Neustart erfolgreich ist.
     (Oft müssen Sie ein paar Mal versuchen und eine Minute warten, bevor Sie sehenERDDAP™.)   
             
### Windows{#windows} 
1. Shutdown Tomcat: Verwenden Sie aus einer Befehlszeile: _tomcat_\\bin\\\shutdown.bat
2. Entfernen Sie die dekomprimiertenERDDAP™Installation: In _tomcat_/webapps, verwenden
del /S/Q erddap
3. Löschen Sie das alte Erddap. Kriegsakte: In _tomcat_\\webapps verwenden Sie del erddap. Krieg
4. Kopieren Sie das neue Erddap. Kriegsdatei aus dem temporären Verzeichnis zu _tomcat_\\webapps
5. Tomcat undERDDAP: Verwendung _tomcat_\\bin\\startup.bat
6. BlickERDDAP™in Ihrem Browser überprüfen, ob der Neustart erfolgreich ist.
     (Oft müssen Sie ein paar Mal versuchen und eine Minute warten, bevor Sie sehenERDDAP™.) 

Probleme bei der AktualisierungERDDAP? Sehen Sie uns[Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support).
