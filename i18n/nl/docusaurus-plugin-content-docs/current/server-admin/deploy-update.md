---
sidebar_position: 2
---
# Bijwerken
Hoe een Update van een Bestaande ERDDAP™ op uw server

## Wijzigingen{#changes} 
1. Maak de wijzigingen vermeld in [Wijzigingen](/changes) in de rubriek "Dingen" ERDDAP™ Beheerders moeten weten en doen" voor alle van de ERDDAP™ versies sinds de versie die u gebruikte.
     
##  Java  {#java} 
2. Als u upgraden van ERDDAP™ versie 2.18 of hieronder, u moet overschakelen naar Java 25 (of nieuwer) en de bijbehorende Tomcat 10. Zie de reguliere ERDDAP™ installatie-instructies voor [ Java ](/docs/server-admin/deploy-install#java) en [Tomcat](/docs/server-admin/deploy-install#tomcat) . U zult ook uw _tomcat_/content/erddap directory van je oude Tomcat installatie naar je nieuwe Tomcat installatie.

## Downloaden{#download} 
3. Downloaden [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) in _tomcat_/webapps .
     (versie 2.29,0, 706,788,135 bytes, MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560, gedateerd 12-15-2025) 
     
## messages.xml{#messagesxml} 
4. 
    * Vaak: Als u upgraden van ERDDAP™ versie 1.46 (of hoger) en je gebruikt gewoon de standaard berichten, de nieuwe standaard berichten.xml zal automatisch worden geïnstalleerd (tussen de .class bestanden via erddap. oorlog) .
         
    * Zelden: Als u upgraden van ERDDAP™ versie 1.44 (of lager) ,
U MOET het oude messages.xml bestand verwijderen:
         _tomcat_/content/erddap /messages.xml .
De nieuwe standaard messages.xml wordt automatisch geïnstalleerd (tussen de .class bestanden via erddap. oorlog) .
         
    * Zelden: Als u altijd wijzigingen aanbrengt in het standaard messages.xml bestand (Plaats) ,
je moet deze wijzigingen maken in het nieuwe messages.xml bestand (dat is
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml na erddap.war wordt gedecomprimeerd door Tomcat).
         
    * Zelden: Als u een aangepaste messages.xml bestand in _tomcat_/content/erddap /,
Je moet het uitzoeken. (via diff) welke wijzigingen zijn aangebracht in de standaard messages.xml (die in de nieuwe erddap staan. oorlog als
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) en wijzig uw aangepaste berichten.xml bestand dienovereenkomstig.
         
## Installeren{#install} 
5. Installeer de nieuwe ERDDAP™ in Tomcat:
\\* Gebruik Tomcat Manager niet. Vroeg of laat zullen er PermGen geheugenproblemen zijn. Het is beter om daadwerkelijk afsluiten en opstarten Tomcat.
\\* Vervang verwijzingen naar _tomcat_ hieronder met de werkelijke Tomcat directory op uw computer.
     
### Linux en Macs{#linux-and-macs} 
1. Afsluiten Tomcat: Gebruik vanaf een opdrachtregel: _tomcat_/bin/shutdown.sh
En gebruik ps -ef | grep Tomcat om te zien of/wanneer het proces is gestopt. (Het kan even duren.) 
2. Verwijder de gedecomprimeerde ERDDAP™ installatie: In _tomcat_/webapps gebruiken
rm -rf erddap
3. Verwijder de oude erddap. war file: Gebruik in _tomcat_/webapps rm erddap. oorlog
4. Begrepen. war-bestand van de tijdelijke map naar _tomcat_/webapps
5. Herstart Tomcat en ERDDAP : gebruik _tomcat_/bin/startup.sh
6. Beeld ERDDAP™ in uw browser om te controleren of de herstart geslaagd is.
     (Vaak moet je proberen een paar keer en wacht een minuut voordat je ziet ERDDAP™ .)   
             
### Vensters{#windows} 
1. Afsluiten Tomcat: Gebruik vanaf een opdrachtregel: _tomcat_\\bin\\ shutdown.bat 
2. Verwijder de gedecomprimeerde ERDDAP™ installatie: In _tomcat_/webapps gebruiken
del /S/Q erddap
3. Verwijder de oude erddap. oorlogsbestand: In _tomcat_\\webapps, gebruik del erddap. oorlog
4. Begrepen. war bestand van de tijdelijke map naar _tomcat_\\webapps
5. Herstart Tomcat en ERDDAP : gebruik _tomcat_\\bin\\startup.bat
6. Beeld ERDDAP™ in uw browser om te controleren of de herstart geslaagd is.
     (Vaak moet je proberen een paar keer en wacht een minuut voordat je ziet ERDDAP™ .) 

Problemen met bijwerken ERDDAP ? Zie onze [sectie over het krijgen van extra ondersteuning](/docs/intro#support) .
