---
sidebar_position: 3
---
#  ERDDAP™ Utgivelsesprosessen
* Kontroller at sammenligningsfiler er tilgjengelige (Dette kan bety å løpe `mvn verifisere` , hvis du ønsker å øke den begrensning til bare ImageComparison-gruppen, men merk at fortsatt krever kjører Jetty-tester) 
* Oppdater avhengighet
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Oppdater plugins
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Kjør tester for å sikre at avhengighet oppdateringer ikke bryter noe for alle store konfigurasjoner (Datasett tolker spesielt, men alle andre viktige innstillinger også) .. Merk at den eksterne testsuiten kan være veldig flaky. SlowAWS test suite kan ta svært lang tid.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Bruk OversettMessages.translate () å oppdatere oversettelser om nødvendig
* EDStatic.java satt utvikling Mode til falsk, endre versjonsnummer og angi utgivelsesdato.
* Gjør bygningen
```
mvn clean
mvn compile
mvn package
```
## Kanariske
Send krigsfilen for distribusjon på Coastwatch-serveren eller en annen server som bruker de fleste datasettstypene og mottar mye trafikk.
Vi vil prøve å finne feil før bredere distribusjon av byggverket.

Ta med melding når du forteller om en ny utgivelse.

Standardprosedyren er:
* Last opp .war-filen til coastwatch \\[ tomcat \\] /innhold/erddap/
* Som bruker=tomcat:
  * I \\[ tomcat \\] /bin/ :
./shutdown.sh // bruk "ps -fu tomcat" for å sikre at det har stoppet
  * I \\[ tomcat \\] /webapps/ :
rm-rf erddap
rm erddap. krig
cp .../innhold/erddap/erddap2.22.war Erddap.war / eller hva som helst nummeret er
  * I \\[ tomcat \\] /bin/ :
./startup.sh
  * Etter ERDDAP har returnert en nettside, i \\[ tomcat \\] /webapps/ :
chgrp-R erddap erddap
chmod-R g+rw erddap
chmod-R o-rwx erddap

## GitHub Release
Utkast til GitHub-utgivelsen, inkluderer erddap.war og erddapContent .zip   (Ingen versjonsnummer) 

title: The official v2.25 version
Beskrivelse: Se endringslisten på
      https://erddap.github.io/changes#version-225

## Dokumentasjonsoppdatering
* Oppdatere versjonsnummeret i docusaurus.config.ts-filen (i bunndelen) ..
* Rediger dokumentasjonssidene (implementer-install.md og implementer-update.md) ..
  * Søk etter \\[ Erddap.war \\]  
  * Kopier eksisterende informasjon (litt misfarging) til listen over tidligere installasjoner 2.
  * Endre gjeldende utgivelsesinformasjon for Erddap. krig i \\[ Erddap.war \\] 
* Kjør oversettelsene for dokumentasjonssiden.
* Gjør en trekkforespørsel og slå sammen endringene.
* Avsett dokumentasjonssiden (se readme) ..

## Sørg for at andre repos er oppdaterte etter behov
Hovedsaklig betyr dette ErddapContent og ErddapTest, men de bør holdes oppdatert under utviklingsendringer.

## Varsle brukere
Først varsle alle brukere som har bedt om endringer (eller hvis feil er løst) .. Gi dem tid til å verifisere endringer og/eller reise problemer.

 ERDDAP versjon 2.25 er nå tilgjengelig&#33;

Du kan lese om endringene på
https://erddap.github.io/changes#version-225

Noen av endringene er endringer som du har foreslått. Takk for din vurdering. Søk etter ditt navn i listen over endringer for å se detaljene. Det ville være bra om du kunne prøve ut de nye funksjonene snart, før jeg annonserer denne nye versjonen til et bredere publikum.

Hvis du er en ERDDAP administrator, instruksjonene for oppgradering er på
https://erddap.github.io/docs/server-admin/deploy-update

Hvis du har problemer, spørsmål, forslag, vennligst send meg e-post.

Takk for at du brukte ERDDAP ..

### Uttal utgivelse
Send en melding til e-postlisten.
