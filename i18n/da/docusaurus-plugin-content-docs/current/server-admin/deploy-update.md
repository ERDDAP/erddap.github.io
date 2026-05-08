---
sidebar_position: 2
---
# Opdatering
Hvordan man laver en opdatering af en eksisterende ERDDAP™ på din server

## Ændringer{#changes} 
1. Gør de ændringer, der er angivet i [Ændringer](/changes) i afsnittet med titlen "Ting ERDDAP™ Administratorer har brug for at vide og gøre "for alle ERDDAP™ versioner siden den version, du brugte.
     
##  Java  {#java} 
2. Hvis du opgraderer fra ERDDAP™ version 2.18 eller nedenfor, skal du skifte til Java 25 (eller nyere) og den beslægtede Tomcat 10. Se den almindelige ERDDAP™ monteringsvejledning til [ Java ](/docs/server-admin/deploy-install#java) og [Tomcat](/docs/server-admin/deploy-install#tomcat) . Du bliver også nødt til at kopiere din _tomcat_/content/erddap mappe fra din gamle Tomcat installation til din nye Tomcat installation.

## Download{#download} 
3. Download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.30.0/ERDDAP-2.30.0.war) til _ tomcat _ / webapps.
     (version 2.30.0, 706,939,121 bytes, MD5 = CDC4B3D82A20B33A6623B85312F6DC21, dateret 2026- 04- 02) 
     
## messages.xml{#messagesxml} 
4. 
    * Almindelig: Hvis du opgraderer fra ERDDAP™ version 1.46 (eller derover) og du bare bruge standardmeddelelserne, vil den nye standard messages.xml blive installeret automatisk (blandt .class filer via erddap. krig) .
         
    * Sjælden: Hvis du opgraderer fra ERDDAP™ version 1.44 (eller derunder) ,
du SKAL slette den gamle messages.xml fil:
         _tomcat_/content/erddap / messages.xml.
Den nye standard messages.xml vil blive installeret automatisk (blandt .class filer via erddap. krig) .
         
    * Sjælden: Hvis du altid foretager ændringer i standardfilen messages.xml (på plads) ,
du skal foretage disse ændringer i den nye messages.xml fil (som er
WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml efter erddap.war nedbrydes af Tomcat).
         
    * Sjælden: Hvis du vedligeholder en brugerdefineret messages.xml fil i _tomcat_/content/erddap /
du skal finde ud af (via diff) hvilke ændringer der er foretaget til standard messages.xml (som er i den nye erddap. krig som
WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml) og ændre din brugerdefinerede messages.xml fil i overensstemmelse hermed.
         
## Installér{#install} 
5. Installér den nye ERDDAP™ i Tomcat:
\\ * Brug ikke Tomcat Manager. Før eller siden vil der være problemer med PermGen hukommelse. Det er bedre at lukke ned og starte Tomcat.
\\ * Erstat referencer til _ tomcat _ nedenfor med den faktiske Tomcat mappe på din computer.
     
### Linux og Macs{#linux-and-macs} 
1. Nedlukning af tomat: Fra en kommandolinje, brug: _ tomcat _ / bin / shotdown.sh
Og brug ps-ef | grep tomcat for at se om / når processen er stoppet. (Det kan tage et minut eller to.) 
2. Fjern det dekomprimerede ERDDAP™ installation: I _ tomcat _ / webapps, brug
rm - rf erddap
3. Slet den gamle erddap. war file: In _ tomcat _ / webapps, brug rm erddap. krig
4. Modtaget. krigsfil fra den midlertidige mappe til _ tomcat _ / webapps
5. Genstart Tomcat og ERDDAP : use _ tomcat _ / bin / startup.sh
6. Vis ERDDAP™ i din browser for at kontrollere, at genstart lykkedes.
     (Ofte er du nødt til at prøve et par gange og vente et minut, før du ser ERDDAP™ .)   
             
### Windows{#windows} 
1. Nedlukning af tomat: Fra en kommandolinje, brug: _ tomcat _\\ bin\\ shutdown.bat 
2. Fjern det dekomprimerede ERDDAP™ installation: I _ tomcat _ / webapps, brug
del / S / Q erddap
3. Slet den gamle erddap. krigsfil: In _ tomcat _\\ webapps, brug del erddap. krig
4. Modtaget. krigsfil fra den midlertidige mappe til _ tomcat _\\ webapps
5. Genstart Tomcat og ERDDAP : use _ tomcat _\\ bin\\ startup.bat
6. Vis ERDDAP™ i din browser for at kontrollere, at genstart lykkedes.
     (Ofte er du nødt til at prøve et par gange og vente et minut, før du ser ERDDAP™ .) 

Problemer med opdatering ERDDAP ? Se vores [sektion om at få yderligere støtte](/docs/intro#support) .
