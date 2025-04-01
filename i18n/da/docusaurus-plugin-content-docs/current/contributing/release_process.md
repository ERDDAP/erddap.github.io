---
sidebar_position: 3
---
# ERDDAP™Udgivelsesproces
* Sørg for, at billed sammenligningsfiler er tilgængelige (Dette kan betyde, at køre ’mvn bekræfte’, hvis du ønsker at fremskynde, at der er begrænset til blot gruppen ImageComparison, selvom det stadig kræver kørsel af Jetty tests) 
* Opdater afhængigheder
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Opdater plugins
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Kør tests for at sikre, at afhængighed opdateringer ikke bryde noget for alle større konfigurationer (datasæt parsing især, selvom andre væsentlige indstillinger samt) 
```
mvn verify
```
* Brug OversætMessages.translate () at opdatere oversættelser, hvis det er nødvendigt
* EDStatic.java sætter udvikling Ret til falsk, ændre versionsnummeret og angive udgivelsesdatoen.
* Gør byggepladsen
```
mvn clean
mvn compile
mvn package
```
## Kanariske Kanariske
Send krigsfilen til distribution på Coastwatch-serveren eller en anden server, der bruger de fleste datasættyper og modtager en masse trafik.
Vi ønsker at forsøge at finde fejl før bredere distribution af bygningen.

Medtag besked, når du fortæller om en ny udgivelse.

Standardsproceduren er:
* Upload .war-filen til kystwatch\\[Tomcat\\]/indhold / indhold /
* Som bruger=tomcat:
  * I nærheden af In In In In In In In In In In In In In In\\[Tomcat\\]/bin / :
./shutdown.sh //use "ps -fu tomcat" for at sikre, at den er stoppet
  * I nærheden af In In In In In In In In In In In In In In\\[Tomcat\\]/webapps/:
-rf erddap
rm erddap. krig krig
cp ./content/erddap/erddap2.22.war Erddap.war //eller hvad nummeret er
  * I nærheden af In In In In In In In In In In In In In In\\[Tomcat\\]/bin / :
./startup.sh
  * EfterERDDAPhar returneret en webside, i\\[Tomcat\\]/webapps/:
chgrp -R erddap erddap
chmod -R g+rw erddap
chmod -R o-rwx erddap

## GitHub Release
Udkast GitHub release, omfatter erddap.war og erddapContent.zip  (Ingen versionsnumre) 

title: The official v2.25 version
beskrive: Se listen med ændringer
       https://erddap.github.io/changes#version-225
 

## Dokumentation Opdatering
* Opdater versionsnummeret i docusaurus.config.ts-filen (i sidefoden) .
* Rediger dokumentationssiderne (udrulning.md og udrulning.md) .
  * Søg efter\\[Erddap.war\\] 
  * Kopier de eksisterende oplysninger (lidt omformateret) til listen over tidligere installationer 2.
  * Ændre de aktuelle udgivelsesoplysninger for erddap. krig på\\[Erddap.war\\]
* Kør oversættelserne til dokumentationswebstedet.
* Foretag en trækkeanmodning og flette ændringerne.
* Aktiver dokumentationsstedet (Se læseme) .

## Sørg for, at andre repos er opdateret efter behov
Det betyder hovedsageligt ErddapContent og ErddapTest, men de skal holdes opdateret under udvikling ændringer.

## Advisér brugere
Meddelelse om brugere, der anmodede ændringer (eller hvis fejl blev rettet) . Giv dem tid til at kontrollere ændringer og/eller hæve problemer.

ERDDAPversion 2.25 er nu tilgængelig&#33;

Du kan læse om ændringerne på
 https://erddap.github.io/changes#version-225
 

Nogle af ændringerne er ændringer, som du foreslog. Tak, fordi du indsendte en redigering. Søg efter dit navn på listen over ændringer for at se detaljerne. Det ville være fantastisk, hvis du kunne prøve de nye funktioner snart, før jeg meddeler denne nye version til et bredere publikum.

Hvis du er enERDDAPAdministrator, instruktionerne for opgradering er på
 https://erddap.github.io/docs/server-admin/deploy-update
 

Hvis du har problemer, spørgsmål, forslag, bedes du kontakte mig.

Tak, fordi du brugerERDDAP.

### Reklamation
Send en meddelelse til listen Meddelelser.
