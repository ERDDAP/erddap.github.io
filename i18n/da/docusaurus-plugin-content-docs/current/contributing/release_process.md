---
sidebar_position: 3
---
#  ERDDAP™ Udgivelsesproces
* Sørg for billede sammenligning filer er tilgængelige (det kan betyde at køre `mvn- verificering` , hvis du ønsker at fremskynde det op begrænse til blot ImageComparison gruppe, selvom note, der stadig kræver kører Jetty tests) 
* Opdatér afhængigheder
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Opdatér plugins
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Kør tests for at sikre afhængighed opdateringer ikke bryde noget for alle store konfigurationer (datasæt fortolker især, selv om andre væsentlige indstillinger så godt) . Bemærk, at den eksterne test suite kan være meget flaky. Den langsomme AWS test suite kan tage meget lang tid.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Anvendelse `python oversættelse / translate.py` om nødvendigt at opdatere oversættelser.
* EDStatic.java sæt udvikling Tilstand til false, ændre versionsnummeret og angive udgivelsesdato.
* Byg.
```
mvn clean
mvn compile
mvn package
```
## Kanariefrø
Send krigsfilen til distribution på Coastwatch server eller en anden server, der bruger de fleste af datatyperne og modtager en masse trafik.
Vi ønsker at forsøge at finde fejl før en bredere fordeling af bygningen.

Inkludér besked når du fortæller om en ny udgivelse.

Standardproceduren er:
* Upload .war-filen til kysturet \\[ tomcat \\] / indhold / erddap /
* Som bruger = tomcat:
  * I \\[ tomcat \\] / bin /:
. / shutdown.sh / / use "ps -fu tomcat" for at sikre, at det er stoppet
  * I \\[ tomcat \\] / webapps /:
rm - rf erddap
rm erddap. krig
cp.. / content / erddap / erddap2.22.war erddap.war / / eller hvad end nummeret er
  * I \\[ tomcat \\] / bin /:
. / startup.sh
  * Efter ERDDAP er returneret en webside, i \\[ tomcat \\] / webapps /:
chgrp - R erddap erddap
chmod - R g + rw erddap
chmod -R o- rwx erddap

## GitHub Release
Udkast til GitHub udgivelse, omfatter erddap.war og erddapContent .zip   (ingen versionsnumre) 

title: The official v2.25 version
beskrivelse: Se ændringslisten på
       https://erddap.github.io/changes#version-225
 

## Dokumentationsopdatering
* Opdatér versionsnummeret i docusarus.config.ts-filen (i fodgængersektionen) .
* Redigér dokumentationssider (deploy- install.md og deploy- update.md) .
  * Søg efter \\[ erddap.war \\]  
  * Kopiér de eksisterende oplysninger (lidt omformateret) til listen over tidligere anlæg 2.
  * Ændr den aktuelle udgivelsesinformation for erddap. krig \\[ erddap.war \\] 
* Kør oversættelser til dokumentation site.
* Lav en pull anmodning og flette ændringerne.
* Udarbejd dokumentationsstedet (se readme) .

## Sørg for, at andre genkøbsforretninger opdateres efter behov
Dette betyder primært ErddapContent og ErddapTest, men de bør holdes ajour under udviklingen ændringer.

## Underret brugere
Først underrette alle brugere, der anmodede om ændringer (eller hvis fejl blev rettet) . Giv dem tid til at verificere ændringer og / eller rejse spørgsmål.

 ERDDAP version 2.25 er nu tilgængelig&#33;

Du kan læse om ændringerne på
 https://erddap.github.io/changes#version-225
 

Nogle af ændringerne er ændringer, som du foreslog. Mange tak for Deres forslag. Søg efter dit navn i listen over ændringer for at se detaljerne. Det ville være godt, hvis du kunne prøve de nye funktioner snart, før jeg annoncerer denne nye version til et bredere publikum.

Hvis De er en ERDDAP administrator, instruktionerne for opgradering er på
 https://erddap.github.io/docs/server-admin/deploy-update
 

Hvis du har nogen problemer, spørgsmål, forslag, venligst e-mail mig.

Tak fordi du brugte ERDDAP .

### Annoncer frigivelse
Send en meddelelse til postlisten.
