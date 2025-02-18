---
sidebar_position: 2
---
# Oppdater
Hvordan gjøre en oppdatering av en eksisterendeERDDAP™på din server

## Endringer{#changes} 
1. Gjør endringene oppført i[Endringer](/changes)i avsnittet med tittelen " TingERDDAP™Administratorer trenger å vite og gjøre - for alleERDDAP™versjoner siden den versjonen du brukte.
     
## Java {#java} 
2. Hvis du oppgraderer fraERDDAP™versjon 2.18 eller nedenfor, må du bytte tilJava21 (eller nyere) og den tilhørende Tomcat 10. Se det vanligeERDDAP™installasjonsanvisninger for[Java](/docs/server-admin/deploy-install#java)og[Tomcat](/docs/server-admin/deploy-install#tomcat).. Du må også kopiere din_tomcat_/content/erddapkatalog fra din gamle Tomcat installasjon til din nye Tomcat installasjon.

## Last ned{#download} 
3. Last ned[Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)i _tomcat_/webapps.
     (versjon 2.25_1, 592.292.039 bytes, MD(2005)652AFC9D1421F00B5F789DA2C4732D4C, datert 2024-11-07) 
     
## messages.xml{#messagesxml} 
4. 
    * Vanlig: Hvis du oppgraderer fraERDDAP™versjon 1.46 (eller over) og du bare bruker standard meldinger, vil de nye standard meldinger.xml bli installert automatisk (blant .class-filer via erddap. krig) ..
         
    * Sjeldne: Hvis du oppgraderer fraERDDAP™versjon 1.44 (eller under) ,
du må slette den gamle meldinger.xml-filen:
        _tomcat_/content/erddap/ Meldinger.xml.
Den nye standard messages.xml vil bli installert automatisk (blant .class-filer via erddap. krig) ..
         
    * Sjeldne: Hvis du alltid gjør endringer i standard meldinger.xml-filen (på plass) ,
du må gjøre disse endringene i den nye messages.xml-filen (som er
WEB-INF/classes/gov/noaa/pfel/erddap/utili/messages.xml etter erddap.war er dekomprimert av Tomcat.
         
    * Sjeldne: Hvis du opprettholder en egendefinert melding.xml fil i_tomcat_/content/erddap/,
Du må finne ut (via diff) Hvilke endringer har blitt gjort til standardmeldingene.xml (som er i den nye erddap. krig som
WEB-INF/classes/gov/noaa/pfel/erddap/utili/messages.xml) og endre din egendefinerte messages.xml fil tilsvarende.
         
## Installer{#install} 
5. Installer den nyeERDDAP™i Tomcat:
\\* Ikke bruk Tomcat Manager. Før eller senere vil det være problemstillinger i minnet. Det er bedre å faktisk avslutte og starte Tomcat.
* Bytt ut referanser til _tomcat_ nedenfor med den faktiske Tomcat-katalogen på datamaskinen.
     
### Linux og Macs{#linux-and-macs} 
1. Lukk Tomcat: Fra en kommandolinje, bruk: _tomcat_/bin/shutdown.sh
Og bruk ps-ef|grep tomcat for å se om/når prosessen er stoppet. (Det kan ta et minutt eller to.) 
2. Fjern dekomprimertERDDAP™installasjon: I _tomcat_/webapps, bruk
rm-rf erddap
3. Slett den gamle Erddap. war file: I _tomcat_/webapps, bruk rm erddap. krig
4. Kopier den nye Erddap. krigsfil fra den midlertidige katalogen til _tomcat_/webapps
5. Start Tomcat på nytt ogERDDAP: bruk _tomcat_/bin/startup.sh
6. VisERDDAP™i nettleseren din for å sjekke at omstarten lykkes.
     (Ofte må du prøve noen ganger og vente et øyeblikk før du serERDDAP™..)   
             
### Vinduer{#windows} 
1. Lukk Tomcat: Fra en kommandolinje, bruk: _tomcat_\\bin\\shutdown.bat
2. Fjern dekomprimertERDDAP™installasjon: I _tomcat_/webapps, bruk
del /S/Q erddap
3. Slett den gamle Erddap. krigsfil: I _tomcat_\\webapps, bruk del erddap. krig
4. Kopier den nye Erddap. krigsfil fra den midlertidige katalogen til _tomcat_\\webapps
5. Start Tomcat på nytt ogERDDAP: bruk _tomcat_\\bin\\startup.bat
6. VisERDDAP™i nettleseren din for å sjekke at omstarten lykkes.
     (Ofte må du prøve noen ganger og vente et øyeblikk før du serERDDAP™..) 

Problemer med oppdateringERDDAP? Se vår[Seksjon om å få ekstra støtte](/docs/intro#support)..
