---
sidebar_position: 3
---
# ERDDAP™Loslaten
* Zorg ervoor dat afbeelding vergelijking bestanden beschikbaar zijn (dit zou kunnen betekenen het uitvoeren van ) 
* Afhankelijkheden bijwerken
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Plugins bijwerken
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Testen uitvoeren om ervoor te zorgen dat de afhankelijkheid updates niets hebben gebroken voor alle belangrijke configuraties (datasets die met name ontleden, maar ook andere belangrijke instellingen) 
```
mvn verify
```
* Vertalen messages.translate gebruiken () vertalingen bijwerken indien nodig
* EDStatic.java set ontwikkeling Wijzig het versienummer en geef de releasedatum op.
* Doe het bouwen
```
mvn clean
mvn compile
mvn package
```
## Canarische eilanden
Stuur het oorlogsbestand voor distributie op de Coastwatch server of een andere server die de meeste datasets gebruikt en veel verkeer ontvangt.
We willen proberen fouten te vinden voordat de bouw breder verspreid wordt.

Inclusief bericht bij het vertellen over een nieuwe release.

De standaardprocedure is:
* Upload het .war bestand naar coastwatch\\[kat\\]/content/erdap/
* Als gebruiker=tomcat:
  * In\\[kat\\]/bin/:
./shutdown.sh //gebruik "ps -fu tomcat" om er zeker van te zijn dat het gestopt is
  * In\\[kat\\]/webapps/:
rm -rf erddap
Erddap. oorlog
cp ../content/erddap/erddap2.22.war erddap.war //of wat het nummer ook is
  * In\\[kat\\]/bin/:
./startup.sh
  * Na deERDDAPheeft een webpagina teruggestuurd, in\\[kat\\]/webapps/:
chgrp -R erddap erddap
chmod -R g+rw erddap
chmod -R o-rwx erddap

## GitHub release
Ontwerp de GitHub release, inclusief erddap.war en erddapContent.zip  (geen versienummers) 

title: The official v2.25 version
beschrijven: Zie de lijst met wijzigingen op
       https://erddap.github.io/changes#version-225
 

## Documentatie bijwerken
* Versienummer bijwerken in het documentsaurus.config.ts bestand (in de voettekst) .
* De documentatiepagina's bewerken (implement-install.md en implement-update.md) .
  * Zoeken\\[erddap.war\\] 
  * De bestaande informatie kopiëren (licht geformatteerd) naar de lijst van eerdere installaties 2.
  * Verander de huidige release-informatie voor erddap. oorlog bij\\[erddap.war\\]
* Voer de vertalingen voor de documentatie site.
* Maak een pull request en merge de wijzigingen.
* Implementeer de documentatiesite (zie readme) .

## Ervoor zorgen dat andere repo's zo nodig bijgewerkt zijn
Dit betekent voornamelijk ErddapContent en ErddapTest, maar deze moeten tijdens ontwikkelingswijzigingen op de hoogte gehouden worden.

## Gebruikers op de hoogte brengen
Waarschuw eerst alle gebruikers die wijzigingen hebben aangevraagd (of wiens bugs zijn gerepareerd) . Geef ze de tijd om wijzigingen te verifiëren en/of problemen aan te kaarten.

ERDDAPversie 2.25 is nu beschikbaar&#33;

U kunt lezen over de wijzigingen op
 https://erddap.github.io/changes#version-225
 

Sommige van de wijzigingen zijn veranderingen die u voorstelde. Hartelijk dank voor uw suggesties. Zoek naar uw naam in de lijst met wijzigingen om de details te zien. Het zou geweldig zijn als je de nieuwe features binnenkort kunt uitproberen, voordat ik deze nieuwe versie bekend maak aan een breder publiek.

Als u eenERDDAPbeheerder, de instructies voor het upgraden zijn op
 https://erddap.github.io/docs/server-admin/deploy-update
 

Als u problemen, vragen, suggesties, e-mail me.

Bedankt voor het gebruik.ERDDAP.

### Ontbreken
Stuur een aankondiging naar de Aankondigingen Mailing lijst.
