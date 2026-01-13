---
sidebar_position: 2
---
# Opdater opdatering
Sådan foretager du en opdatering af en eksisterende ERDDAP™ på din server

## Ændringer{#changes} 
1. Foretag de ændringer, der er angivet i [Ændringer](/changes) i sektionen med titlen "Things ERDDAP™ Administratorer har brug for at vide og gøre" for alle af ERDDAP™ versioner siden den version, du brugte.
     
##  Java  {#java} 
2. Hvis du opgraderer fra ERDDAP™ version 2.18 eller nedenfor, skal du skifte til Java 25 (eller nyere) og den relaterede Tomcat 10. Se de regelmæssige ERDDAP™ installationsvejledning for [ Java ](/docs/server-admin/deploy-install#java) og og og [Tomcat](/docs/server-admin/deploy-install#tomcat) . Du skal også kopiere din _tomcat_/content/erddap Katalog fra din gamle Tomcat installation til din nye Tomcat installation.

## Download Download Download Download{#download} 
3. Download Download Download Download [Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) i _tomcat_/webapps.
     (version 2.29.0, 706,788,135 bytes, MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560, dateret 12-15-2025) 
     
## beskeder.xml{#messagesxml} 
4. 
    * Fælles: Hvis du opgraderer fra ERDDAP™ version 1.46 (eller ovenfor) og du bare bruger standardmeddelelserne, vil de nye standardmeddelelser.xml blive installeret automatisk (blandt .class filer via erddap. krig krig) .
         
    * Sjælden: Hvis du opgraderer fra ERDDAP™ version 1.44 (eller nedenfor) ,
du SKAL slette de gamle beskeder.xml-fil:
         _tomcat_/content/erddap /messages.xml .
De nye standardmeddelelser.xml vil blive installeret automatisk (blandt .class filer via erddap. krig krig) .
         
    * Sjælden: Hvis du altid foretager ændringer i standardmeddelelser.xml-filen (på plads) ,
du skal foretage disse ændringer i de nye meddelelser.xml-fil (som er
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml efter erddap.war er deaktiveret af Tomcat.
         
    * Sjælden: Hvis du vedligeholder en brugerdefinerede meddelelser.xml-fil i _tomcat_/content/erddap /,
du skal finde ud (via diff) hvilke ændringer er foretaget til standardmeddelelser.xml (som er i den nye æra. krig som krig
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) og ændre dine brugerdefinerede meddelelser.xml-fil i overensstemmelse hermed.
         
## Installer installation{#install} 
5. Installer den nye ERDDAP™ i Tomcat:
\\* Brug ikke Tomcat Manager. Snart eller senere vil der være PermGen hukommelse problemer. Det er bedre at faktisk lukke og starte Tomcat.
\\* Udskift referencer til _tomcat_ nedenfor med den faktiske Tomcat-katalog på din computer.
     
### Linux og Macs{#linux-and-macs} 
1. Lukning Tomcat: Fra en kommandolinje skal du bruge: _tomcat_/bin/shutdown.sh
Og brug ps -ef | grep tomcat for at se, om / når processen er stoppet. (Det kan tage et minut eller to.) 
2. Fjern dekomprimeret ERDDAP™ installation: I _tomcat_/webapps, brug
-rf erddap
3. Slette den gamle erddap. krig fil: I _tomcat_/webapps, brug rm erddap. krig krig
4. Kopier den nye æra. krig fil fra den midlertidige mappe til _tomcat_/webapps
5. Genstart Tomcat og ERDDAP : brug _tomcat_/bin/startup.sh
6. Udsigt til udsigt ERDDAP™ I din browser for at kontrollere, at genstarten lykkedes.
     (Ofte skal du prøve et par gange og vente et minut, før du ser ERDDAP™ .)   
             
### Windows Windows Windows{#windows} 
1. Lukning Tomcat: Fra en kommandolinje skal du bruge: _tomcat_"bin" shutdown.bat 
2. Fjern dekomprimeret ERDDAP™ installation: I _tomcat_/webapps, brug
Del /S/Q erddap
3. Slette den gamle erddap. krig fil: I _tomcat_”webapps, brug del erddap. krig krig
4. Kopier den nye æra. krigsfil fra den midlertidige mappe til _tomcat_"webapps
5. Genstart Tomcat og ERDDAP : Brug _tomcat_«bin»startup.bat
6. Udsigt til udsigt ERDDAP™ I din browser for at kontrollere, at genstarten lykkedes.
     (Ofte skal du prøve et par gange og vente et minut, før du ser ERDDAP™ .) 

Opdatering af Troubles ERDDAP ? Se vores udvalg [sektion om at få ekstra støtte](/docs/intro#support) .
