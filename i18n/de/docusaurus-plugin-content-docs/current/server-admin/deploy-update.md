---
sidebar_position: 2
---
# Aktualisierung
Wie man ein Update eines Vorstehenden tut ERDDAP™ auf Ihrem Server

## Änderungen{#changes} 
1. Ändern Sie die in [Änderungen](/changes) in der Sektion "Dinge ERDDAP™ Administratoren müssen wissen und tun" für alle ERDDAP™ Versionen seit der verwendeten Version.
     
##  Java  {#java} 
2. Wenn Sie von ERDDAP™ Version 2.18 oder unten, Sie müssen auf Java ANHANG (oder neuer) und den verwandten Tomcat 10. Siehe regelmäßige ERDDAP™ Installationsanweisungen für [ Java ](/docs/server-admin/deploy-install#java) und [Tomcat](/docs/server-admin/deploy-install#tomcat) . Sie müssen auch Ihre _tomcat_/content/erddap Verzeichnis von Ihrer alten Tomcat Installation auf Ihre neue Tomcat Installation.

## Downloads{#download} 
3. Downloads [Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) in _tomcat_/webapps .
     (Version 2.28.1, 622,676,238 Bytes, MD5=48b4226045f950c8a8d69ef9521b9bc9, datiert 09-05-2025) 
     
## Nachrichten.xml{#messagesxml} 
4. 
    * Gemeinsam: Wenn Sie von ERDDAP™ Version 1.46 (oder höher) und Sie verwenden nur die Standardnachrichten, die neue Standardnachrichten.xml wird automatisch installiert (unter den .class Dateien über erddap. Krieg) .
         
    * Selten: Wenn Sie von ERDDAP™ Version 1.44 (oder darunter) ,
Sie müssen die alte Message.xml-Datei löschen:
         _tomcat_/content/erddap /messages.xml .
Die neuen Standardnachrichten.xml werden automatisch installiert (unter den .class Dateien über erddap. Krieg) .
         
    * Selten: Wenn Sie immer Änderungen an der Standard-Nachrichten.xml-Datei vornehmen (in place) ,
Sie müssen diese Änderungen in der neuen Messages.xml-Datei (die ist
WEB-INF/classes/gov/noaa/pfel/erdap/util/messages.xml nach erddap.war wird von Tomcat dekomprimiert).
         
    * Selten: Wenn Sie eine benutzerdefinierte Nachrichten.xml-Datei in _tomcat_/content/erddap /,
du musst herausfinden (via diff) welche Änderungen an der Standard-Nachrichten.xml vorgenommen wurden (die sich im neuen Erddap befinden). Krieg als
WEB-INF/classes/gov/noaa/pfel/erdap/util/messages.xml) und modifizieren Sie Ihre benutzerdefinierte message.xml-Datei entsprechend.
         
## Installieren{#install} 
5. Installieren Sie das neue ERDDAP™ in Tomcat:
) Verwenden Sie Tomcat Manager nicht. Früher oder später gibt es PermGen Speicherprobleme. Es ist besser, tatsächlich abschalten und starten Tomcat.
\\* Ersetzen Sie Referenzen auf _tomcat_ unten mit dem aktuellen Tomcat-Verzeichnis auf Ihrem Computer.
     
### Linux und Macs{#linux-and-macs} 
1. Shutdown Tomcat: Verwenden Sie aus einer Befehlszeile: _tomcat_/bin/shutdown.sh
Und nutzen ps -ef | grep tomcat zu sehen, ob/wenn der Prozess gestoppt wurde. (Es kann eine Minute oder zwei dauern.) 
2. Entfernen Sie die dekomprimierten ERDDAP™ Installation: In _tomcat_/webapps, verwenden
rm -rf erddap
3. Löschen Sie das alte Erddap. Kriegsdatei: In _tomcat_/webapps verwenden Sie rm erddap. Krieg
4. Kopieren Sie das neue Erddap. Kriegsdatei aus dem temporären Verzeichnis zu _tomcat_/webapps
5. Tomcat und ERDDAP : Verwendung _tomcat_/bin/startup.sh
6. Blick ERDDAP™ in Ihrem Browser überprüfen, ob der Neustart erfolgreich ist.
     (Oft müssen Sie ein paar Mal versuchen und eine Minute warten, bevor Sie sehen ERDDAP™ .)   
             
### Windows{#windows} 
1. Shutdown Tomcat: Verwenden Sie aus einer Befehlszeile: _tomcat_\\bin\\\ shutdown.bat 
2. Entfernen Sie die dekomprimierten ERDDAP™ Installation: In _tomcat_/webapps, verwenden
del /S/Q erddap
3. Löschen Sie das alte Erddap. Kriegsakte: In _tomcat_\\webapps verwenden Sie del erddap. Krieg
4. Kopieren Sie das neue Erddap. Kriegsdatei aus dem temporären Verzeichnis zu _tomcat_\\webapps
5. Tomcat und ERDDAP : Verwendung _tomcat_\\bin\\startup.bat
6. Blick ERDDAP™ in Ihrem Browser überprüfen, ob der Neustart erfolgreich ist.
     (Oft müssen Sie ein paar Mal versuchen und eine Minute warten, bevor Sie sehen ERDDAP™ .) 

Probleme bei der Aktualisierung ERDDAP ? Sehen Sie uns [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .
