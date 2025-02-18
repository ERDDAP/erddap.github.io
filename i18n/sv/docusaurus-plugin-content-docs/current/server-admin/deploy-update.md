---
sidebar_position: 2
---
# Uppdatering
Hur man gör en uppdatering av en befintligERDDAP™på din server

## Förändringar{#changes} 
1. Gör ändringarna som anges i[Förändringar](/changes)i avsnittet med titeln "ThingsERDDAP™Administratörer behöver veta och göra för allaERDDAP™versioner sedan den version du använde.
     
## Java {#java} 
2. Om du uppgraderar frånERDDAP™version 2.18 eller nedan måste du byta tillJava21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 (eller nyare) och tillhörande Tomcat 10. Se regelbundenERDDAP™installationsanvisningar för[Java](/docs/server-admin/deploy-install#java)och[Tomcat](/docs/server-admin/deploy-install#tomcat). Du måste också kopiera din_tomcat_/content/erddapKatalog från din gamla Tomcat installation till din nya Tomcat installation.

## Ladda ner{#download} 
3. Ladda ner[Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)till _tomcat_/webapps.
     (version 2.25_1, 592,292,039 byte, MD5=652AFC9D1421F00B5F789DA2C4732D4C, daterad 2024-11-07) 
     
## meddelanden.xml{#messagesxml} 
4. 
    * Vanligt: Om du uppgraderar frånERDDAP™version 1.46 (eller ovanför) och du använder bara standardmeddelanden, den nya standardmeddelanden.xml installeras automatiskt (bland .class filer via erddap. krig) .
         
    * Sällsynta: Om du uppgraderar frånERDDAP™version 1.44 (eller under) ,
Du måste ta bort den gamla meddelanden.xml-filen:
        _tomcat_/content/erddap/messages.xml.
De nya standardmeddelandena.xml installeras automatiskt (bland .class filer via erddap. krig) .
         
    * Sällsynta: Om du alltid gör ändringar i standardmeddelandena.xml-filen (På plats) ,
Du måste göra dessa ändringar i den nya meddelanden.xml-filen (som är
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml efter erddap.war dekomprimeras av Tomcat).
         
    * Sällsynta: Om du upprätthåller en anpassad messages.xml-fil i_tomcat_/content/erddap/,
Du måste räkna ut (via diff) Vilka ändringar har gjorts till standardmeddelandena.xml (som finns i den nya erddap. krig som
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) och ändra din anpassade meddelanden.xml-fil därefter.
         
## Installera{#install} 
5. Installera den nyaERDDAP™I Tomcat:
\\**** \\******************************************************************************************************************************************************************************************************************************************************** Använd inte Tomcat Manager. Förr eller senare kommer det att finnas PermGen minnesproblem. Det är bättre att faktiskt stänga och starta Tomcat.
Ersätt referenser till _tomcat_ nedan med den faktiska Tomcat-katalogen på din dator.
     
### Linux och Macs{#linux-and-macs} 
1. Avstängning Tomcat: Från en kommandorad, använd: _tomcat_/bin/shutdown.sh
Använd ps -ef|grep tomcat för att se om/när processen har stoppats. (Det kan ta en minut eller två.) 
2. Ta bort dekomprimeradERDDAP™installation: I _tomcat_/webapps, använd
RM -rf Erddap
3. Ta bort den gamla erddap. Krigsfil: I _tomcat_/webbapps, använd rm erddap. krig
4. Kopiera den nya erddap. krigsfil från den tillfälliga katalogen till _tomcat_/webapps
5. Restart Tomcat ochERDDAPAnvänd _tomcat_/bin/startup.sh
6. UtsiktERDDAP™i din webbläsare för att kontrollera att omstarten lyckades.
     (Ofta måste du prova några gånger och vänta en minut innan du serERDDAP™.)   
             
### Windows Windows{#windows} 
1. Avstängning Tomcat: Från en kommandorad, använd: _tomcat_\bin\\shutdown.bat
2. Ta bort dekomprimeradERDDAP™installation: I _tomcat_/webapps, använd
Del /S/Q Erddap
3. Ta bort den gamla erddap. Krigsfil: I _tomcat_\\webapps, använd del erddap. krig
4. Kopiera den nya erddap. Krigsfil från den tillfälliga katalogen till _tomcat_\\webapps
5. Restart Tomcat ochERDDAPAnvänd _tomcat_\bin\\startup.bat
6. UtsiktERDDAP™i din webbläsare för att kontrollera att omstarten lyckades.
     (Ofta måste du prova några gånger och vänta en minut innan du serERDDAP™.) 

Problem med att uppdateraERDDAP?? Se vår[sektion om att få ytterligare stöd](/docs/intro#support).
