---
sidebar_position: 3
---
#  ERDDAP™ Release Process
* Se till att bild jämförelse filer är tillgängliga (Detta kan innebära att köra `Mvn verifiera` Om du vill påskynda den uppehållsbegränsningen till bara ImageComparison-gruppen, men notera att det fortfarande kräver att du kör Jetty-test.) 
* Uppdatera beroenden
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Uppdatera plugin
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Kör tester för att se till att beroendeuppdateringar inte bryta något för alla större konfigurationer (datamängder i synnerhet, även om andra betydande inställningar samt) . Observera att den externa testsviten kan vara mycket fläckig. Den slowAWS test svit kan ta mycket lång tid.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Använd TranslateMessages.translate () uppdatera översättningar om det behövs
* EDStatic.java sätter utveckling Ändra versionsnumret och ange lanseringsdatumet.
* Gör bygget
```
mvn clean
mvn compile
mvn package
```
## Kanarieöarna
Skicka krigsfilen för distribution på Coastwatch-servern eller någon annan server som använder de flesta datasettyperna och får mycket trafik.
Vi vill försöka hitta fel innan bredare distribution av byggnaden.

Inkludera meddelande när du berättar om en ny release.

Standardförfarandet är:
* Ladda upp .war-filen till kustwatch \\[ Tomcat \\] /innehåll/erddap/
* Som användare=tomcat:
  * Inom \\[ Tomcat \\] /bin/ :
./shutdown.sh //use "ps-fu tomcat" för att säkerställa att den har stoppats
  * Inom \\[ Tomcat \\] /webapps/ :
RM -rf Erddap
Rm erddap. krig
cp ../innehåll/erddap/erddap2.22. Erddap.war //eller vad numret är
  * Inom \\[ Tomcat \\] /bin/ :
Startup.sh
  * Efter ERDDAP har återvänt en webbsida, \\[ Tomcat \\] /webapps/ :
chgrp -R erddap erddap
chmod -R g+rw erddap
chmod -R o-rwx erddap

## GitHub frigör
Draft GitHub release, inkluderar erddap.war och erddapContent .zip   (Inga versionsnummer) 

title: The official v2.25 version
beskriva: Se ändringslistan på
      https://erddap.github.io/changes#version-225

## Dokumentationsuppdatering
* Uppdatera versionsnummer i docusaurus.config.ts-filen (i sidosektionen) .
* Redigera dokumentationssidorna (deploy-install.md och deploy-update.md) .
  * Sök efter \\[ Erddap.war \\]  
  * Kopiera befintlig information (Lite reformaterade) till listan över tidigare installationer 2.
  * Ändra den aktuella releaseinformationen för erddap. krig vid \\[ Erddap.war \\] 
* Kör översättningarna för dokumentationswebbplatsen.
* Gör en pull request och slå samman ändringarna.
* Utplacera dokumentationswebbplatsen (Se Readme) .

## Se till att andra repor är uppdaterade efter behov
Främst betyder detta ErddapContent och ErddapTest, men de bör hållas uppdaterade under utvecklingsförändringar.

## Meddela användare
Först meddela alla användare som begärde ändringar (eller vars buggar var fixerade) . Ge dem tid att verifiera förändringar och/eller höja problem.

 ERDDAP version 2.25 är nu tillgänglig&#33;

Du kan läsa om förändringarna på
https://erddap.github.io/changes#version-225

Några av förändringarna är förändringar som du föreslog. Tack så mycket för dina förslag. Sök efter ditt namn i listan över ändringar för att se detaljerna. Det skulle vara bra om du kunde prova de nya funktionerna snart, innan jag tillkännager denna nya version till en bredare publik.

Om du är en ERDDAP administratör, instruktionerna för uppgradering är på
https://erddap.github.io/docs/server-admin/deploy-update

Om du har några problem, frågor, förslag, vänligen maila mig.

Tack för att du använder ERDDAP .

### Announce release
Skicka ett meddelande till Announcements Mailing-listan.
