---
sidebar_position: 2
---
# Bijwerken
Hoe een Update van een BestaandeERDDAP™op uw server

## Wijzigingen{#changes} 
1. Maak de wijzigingen vermeld in[Wijzigingen](/changes)in de rubriek "Dingen"ERDDAP™Beheerders moeten weten en doen" voor alle van deERDDAP™versies sinds de versie die u gebruikte.
     
## Java {#java} 
2. Als u upgraden vanERDDAP™versie 2.18 of hieronder, u moet overschakelen naarJava21 (of nieuwer) en de bijbehorende Tomcat 10. Zie de reguliereERDDAP™installatie-instructies voor[Java](/docs/server-admin/deploy-install#java)en[Tomcat](/docs/server-admin/deploy-install#tomcat). U zult ook uw_tomcat_/content/erddapdirectory van je oude Tomcat installatie naar je nieuwe Tomcat installatie.

## Downloaden{#download} 
3. Downloaden[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)in _tomcat_/webapps .
     (versie 2.25_1, 592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, gedateerd 2024-11-07) 
     
## messages.xml{#messagesxml} 
4. 
    * Vaak: Als u upgraden vanERDDAP™versie 1.46 (of hoger) en je gebruikt gewoon de standaard berichten, de nieuwe standaard berichten.xml zal automatisch worden geïnstalleerd (tussen de .class bestanden via erddap. oorlog) .
         
    * Zelden: Als u upgraden vanERDDAP™versie 1.44 (of lager) ,
U MOET het oude messages.xml bestand verwijderen:
        _tomcat_/content/erddap/messages.xml .
De nieuwe standaard messages.xml wordt automatisch geïnstalleerd (tussen de .class bestanden via erddap. oorlog) .
         
    * Zelden: Als u altijd wijzigingen aanbrengt in het standaard messages.xml bestand (Plaats) ,
je moet deze wijzigingen maken in het nieuwe messages.xml bestand (dat is
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml na erddap.war wordt gedecomprimeerd door Tomcat).
         
    * Zelden: Als u een aangepaste messages.xml bestand in_tomcat_/content/erddap/,
Je moet het uitzoeken. (via diff) welke wijzigingen zijn aangebracht in de standaard messages.xml (die in de nieuwe erddap staan. oorlog als
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) en wijzig uw aangepaste berichten.xml bestand dienovereenkomstig.
         
## Installeren{#install} 
5. Installeer de nieuweERDDAP™in Tomcat:
\\* Gebruik Tomcat Manager niet. Vroeg of laat zullen er PermGen geheugenproblemen zijn. Het is beter om daadwerkelijk afsluiten en opstarten Tomcat.
\\* Vervang verwijzingen naar _tomcat_ hieronder met de werkelijke Tomcat directory op uw computer.
     
### Linux en Macs{#linux-and-macs} 
1. Afsluiten Tomcat: Gebruik vanaf een opdrachtregel: _tomcat_/bin/shutdown.sh
En gebruik ps -ef|grep Tomcat om te zien of/wanneer het proces is gestopt. (Het kan even duren.) 
2. Verwijder de gedecomprimeerdeERDDAP™installatie: In _tomcat_/webapps gebruiken
rm -rf erddap
3. Verwijder de oude erddap. war file: Gebruik in _tomcat_/webapps rm erddap. oorlog
4. Begrepen. war-bestand van de tijdelijke map naar _tomcat_/webapps
5. Herstart Tomcat enERDDAP: gebruik _tomcat_/bin/startup.sh
6. BeeldERDDAP™in uw browser om te controleren of de herstart geslaagd is.
     (Vaak moet je proberen een paar keer en wacht een minuut voordat je zietERDDAP™.)   
             
### Vensters{#windows} 
1. Afsluiten Tomcat: Gebruik vanaf een opdrachtregel: _tomcat_\\bin\\shutdown.bat
2. Verwijder de gedecomprimeerdeERDDAP™installatie: In _tomcat_/webapps gebruiken
del /S/Q erddap
3. Verwijder de oude erddap. oorlogsbestand: In _tomcat_\\webapps, gebruik del erddap. oorlog
4. Begrepen. war bestand van de tijdelijke map naar _tomcat_\\webapps
5. Herstart Tomcat enERDDAP: gebruik _tomcat_\\bin\\startup.bat
6. BeeldERDDAP™in uw browser om te controleren of de herstart geslaagd is.
     (Vaak moet je proberen een paar keer en wacht een minuut voordat je zietERDDAP™.) 

Problemen met bijwerkenERDDAP? Zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
