---
sidebar_position: 3
---
# ERDDAP™Release-Prozess
* Stellen Sie sicher, dass Bildvergleichsdateien verfügbar sind (Dies könnte bedeuten, `mvn check`, wenn Sie wollen, dass bis zu nur die ImageComparison Gruppe beschränken, obwohl beachten, dass noch laufende Jetty-Tests erfordert) 
* Aktualisieren von Abhängigkeiten
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Plugins aktualisieren
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Führen Sie Tests, um sicherzustellen, dass Abhängigkeitsaktualisierungen nichts für alle wichtigen Konfigurationen brechen (vor allem datasets parsing, obwohl auch andere signifikante Einstellungen) 
```
mvn verify
```
* Verwenden Sie TranslateMessages.translate () Übersetzungen aktualisieren, wenn nötig
* EDStatic.java setzte Entwicklung Modus zu false, ändern Sie die Versionsnummer und geben Sie das Freigabedatum an.
* Machen Sie den Bau
```
mvn clean
mvn compile
mvn package
```
## Kanarische Inseln
Senden Sie die Kriegsdatei für die Distribution auf dem Coastwatch-Server oder einem anderen Server, der die meisten Datensatztypen verwendet und viel Traffic erhält.
Wir wollen versuchen, Fehler zu finden, bevor eine größere Verteilung des Aufbaus.

Fügen Sie Nachricht ein, wenn Sie über eine neue Veröffentlichung erzählen.

Das Standardverfahren ist:
* Laden Sie die .war-Datei nach Coastwatch hoch\\[Tomcat\\]/Fortsetzung/Erlaubung/
* Als user=tomcat:
  * In\\[Tomcat\\]/bin/
./shutdown.sh // Verwenden Sie "ps -fu tomcat" um sicherzustellen, dass es gestoppt hat
  * In\\[Tomcat\\]/webapps/ :
rm -rf erddap
rm erddap. Krieg
c) ../Fortsetzung/erdap/erddap2.22.war erddap.war //oder was auch immer die Nummer ist
  * In\\[Tomcat\\]/bin/
./startup.sh
  * Nach demERDDAPhat eine Webseite zurückgegeben, in\\[Tomcat\\]/webapps/ :
chgrp -R erddap erddap
chmod -R g+rw erddap
chmod -R o-rwx erddap

## GitHub Veröffentlichung
Entwurf der GitHub-Veröffentlichung, beinhalten erddap.war und erddapContent.zip  (keine Versionsnummern) 

title: The official v2.25 version
Beschreibung: Siehe die Änderungsliste
       https://erddap.github.io/changes#version-225
 

## Dokumentation Update
* Aktualisieren Sie die Versionsnummer in der Datei docusaurus.config.ts (im Fußabschnitt) .
* Bearbeiten der Dokumentationsseiten (deploy-install.md und deploy-update.md) .
  * Suche nach\\[Erddap.war\\] 
  * Kopieren der vorhandenen Informationen (leicht reformiert) zur Liste der früheren Anlagen 2.
  * Ändern Sie die aktuellen Release-Informationen für Erddap. Krieg gegen\\[Erddap.war\\]
* Führen Sie die Übersetzungen für die Dokumentationsseite aus.
* Machen Sie eine Pull-Anforderung und fügen Sie die Änderungen zusammen.
* Bereitstellung der Dokumentationsseite (siehe readme) .

## Stellen Sie sicher, dass andere Aufgaben bei Bedarf aktuell sind
Hauptsächlich bedeutet dies ErddapContent und ErddapTest, aber sie sollten während der Entwicklung auf dem neuesten Stand gehalten werden.

## Benachrichtigen Sie Benutzer
Benachrichtigen Sie alle Benutzer, die Änderungen beantragt haben (oder deren Fehler behoben wurden) . Geben Sie ihnen Zeit, um Änderungen zu überprüfen und / oder Probleme zu erhöhen.

ERDDAPVersion 2.25 ist jetzt verfügbar&#33;

Sie können über die Änderungen lesen
 https://erddap.github.io/changes#version-225
 

Einige der Änderungen sind Änderungen, die Sie vorgeschlagen haben. Vielen Dank für Ihre Vorschläge. Suchen Sie nach Ihrem Namen in der Liste der Änderungen, um die Details zu sehen. Es wäre toll, wenn Sie die neuen Features bald ausprobieren könnten, bevor ich diese neue Version einem breiteren Publikum ankündige.

Wenn Sie einERDDAPAdministrator, die Anweisungen für den Upgrade sind bei
 https://erddap.github.io/docs/server-admin/deploy-update
 

Wenn Sie Probleme haben, Fragen, Vorschläge, bitte mailen Sie mir.

Danke für die VerwendungERDDAP.

### Ankündigung
Senden Sie eine Mitteilung an die Ankündigungen Mailing-Liste.
