---
sidebar_position: 2
---
# Oppdater
Hvordan gjøre en oppdatering av en eksisterende ERDDAP™ på din server

## Endringer{#changes} 
1. Gjør endringene oppført i [Endringer](/changes) i avsnittet med tittelen " Ting ERDDAP™ Administratorer trenger å vite og gjøre" for alle ERDDAP™ versjoner siden den versjonen du brukte.
     
##  Java  {#java} 
2. Hvis du oppgraderer fra ERDDAP™ versjon 2.18 eller nedenfor, må du bytte til Java 25 (eller nyere) og den relaterte Tomcat 10. Se det vanlige ERDDAP™ installasjonsanvisninger for [ Java ](/docs/server-admin/deploy-install#java) og [Tomcat](/docs/server-admin/deploy-install#tomcat) .. Du må også kopiere din _tomcat_/content/erddap katalog fra din gamle Tomcat installasjon til din nye Tomcat installasjon.

## Last ned{#download} 
3. Last ned [Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.30.0/ERDDAP-2.30.0.war) i _tomcat_/webapps.
     (versjon 2.30.0, 706.939.130 bytes, MD(2005)CDC4B3D82A20B33A6623B85312F6DC21, datert 2026-04-06) 
     
## messages.xml{#messagesxml} 
4. 
    * Vanlig: Hvis du oppgraderer fra ERDDAP™ versjon 1.46 (eller over) og du bare bruker standard meldingene, vil de nye standard meldingene.xml installeres automatisk (blant .class-filene via erddap. krig) ..
         
    * Sjeldne: Hvis du oppgraderer fra ERDDAP™ versjon 1.44 (eller under) ,
du må slette den gamle meldinger.xml-filen:
         _tomcat_/content/erddap /meldinger.xml .
Den nye standard messages.xml vil bli installert automatisk (blant .class-filene via erddap. krig) ..
         
    * Sjeldne: Hvis du alltid gjør endringer i standard meldinger.xml-filen (på plass) ,
du må gjøre disse endringene i den nye messages.xml-filen (som er
WEB-INF/classes/gov/noaa/pfel/erddap/utili/messages.xml etter erddap.war er dekomprimert av Tomcat).
         
    * Sjeldne: Hvis du opprettholder en egendefinert melding.xml-fil i _tomcat_/content/erddap /,
Du må finne ut (via diff) Hvilke endringer har blitt gjort på standardmeldingene.xml (som er i den nye erddap. krig som
WEB-INF/classes/gov/noaa/pfel/erddap/utili/messages.xml) og endre din egendefinerte messages.xml fil tilsvarende.
         
## Installer{#install} 
5. Installer den nye ERDDAP™ i Tomcat:
\\* Ikke bruk Tomcat Manager. Før eller senere kommer det til å bli problemer med minnet. Det er bedre å faktisk avslutte og starte Tomcat.
* Bytt ut referanser til _tomcat_ under med den faktiske Tomcat-katalogen på datamaskinen.
     
### Linux og Macs{#linux-and-macs} 
1. Lukk Tomcat: Fra en kommandolinje, bruk: _tomcat_/bin/shutdown.sh
Og bruk ps-ef | grop tomcat å se om/når prosessen er stoppet. (Det kan ta et minutt eller to.) 
2. Fjern dekomprimert ERDDAP™ installasjon: I _tomcat_/webapps, bruk
rm-rf erddap
3. Slett den gamle Erddap. krigsfil: I _tomcat_/webapps, bruk rm erddap. krig
4. Kopier den nye Erddap. krigsfil fra den midlertidige katalogen til _tomcat_/webapps
5. Start Tomcat på nytt og ERDDAP : bruk _tomcat_/bin/startup.sh
6. Vis ERDDAP™ i nettleseren din for å sjekke om omstarten lykkes.
     (Ofte må du prøve et par ganger og vente et øyeblikk før du ser ERDDAP™ ..)   
             
### Vinduer{#windows} 
1. Lukk Tomcat: Fra en kommandolinje, bruk: _tomcat_\\bin\\ shutdown.bat 
2. Fjern dekomprimert ERDDAP™ installasjon: I _tomcat_/webapps, bruk
del /S/Q erddap
3. Slett den gamle Erddap. krigsfil: I _tomcat_\\webapps, bruk del erddap. krig
4. Kopier den nye Erddap. krigsfil fra den midlertidige katalogen til _tomcat_\\webapps
5. Start Tomcat på nytt og ERDDAP : bruk _tomcat_\\bin\\startup.bat
6. Vis ERDDAP™ i nettleseren din for å sjekke om omstarten lykkes.
     (Ofte må du prøve et par ganger og vente et øyeblikk før du ser ERDDAP™ ..) 

Problemer med oppdatering ERDDAP ? Se vår [Seksjon om å få ekstra støtte](/docs/intro#support) ..
