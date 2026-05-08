---
sidebar_position: 2
---
# Bijwerken
Hoe een Update van een Bestaande ERDDAP™ op uw server

## Wijzigingen{#changes} 
1. De wijzigingen in [Wijzigingen](/changes) in de rubriek "Dingen" ERDDAP™ Beheerders moeten weten en doen" voor alle van de ERDDAP™ versies sinds de versie die je gebruikte.
     
##  Java  {#java} 
2. Als u upgraden van ERDDAP™ versie 2.18 of hieronder, u moet overschakelen naar Java 25 (of nieuwer) en de bijbehorende Tomcat 10. Zie de reguliere ERDDAP™ installatie-instructies voor [ Java ](/docs/server-admin/deploy-install#java) en [Tomcat](/docs/server-admin/deploy-install#tomcat) . U zult ook uw _tomcat_/content/erddap directory van je oude Tomcat installatie naar je nieuwe Tomcat installatie.

## Downloaden{#download} 
3. Downloaden [Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.30.0/ERDDAP-2.30.0.war) in _tomcat_/webapps .
     (versie 2.30,0, 706,939,121 bytes, MD5=CDC4B3D82A20B33A6623B85312F6DC21, gedateerd 2026-02-02) 
     
## messages.xml{#messagesxml} 
4. 
    * Vaak: Als u upgraden van ERDDAP™ versie 1.46 (of hoger) en je gebruikt gewoon de standaard berichten, de nieuwe standaard berichten.xml zal automatisch worden geïnstalleerd (tussen de .class bestanden via erddap. oorlog) .
         
    * Zelden: Als u upgraden van ERDDAP™ versie 1.44 (of lager) ,
U MOET het oude messages.xml bestand verwijderen:
         _tomcat_/content/erddap /messages.xml .
De nieuwe standaard messages.xml wordt automatisch geïnstalleerd (tussen de .class bestanden via erddap. oorlog) .
         
    * Zelden: Als u altijd wijzigingen aanbrengt in het standaard messages.xml bestand (op zijn plaats) ,
je moet deze wijzigingen maken in het nieuwe messages.xml bestand (dat is
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml na erddap.war wordt gedecomprimeerd door Tomcat).
         
    * Zelden: Als u een aangepast messages.xml bestand in _tomcat_/content/erddap /,
Je moet het uitzoeken. (via diff) welke wijzigingen zijn aangebracht in de standaardberichten.xml (die in de nieuwe erddap staan. oorlog als
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) en wijzig uw aangepaste berichten.xml bestand dienovereenkomstig.
         
## Installeren{#install} 
5. Installeer de nieuwe ERDDAP™ in Tomcat:
\\* Gebruik Tomcat Manager niet. Vroeg of laat zullen er PermGen geheugenproblemen zijn. Het is beter om echt afsluiten en opstarten Tomcat.
\\* Vervang verwijzingen naar _tomcat_ hieronder met de werkelijke Tomcat directory op uw computer.
     
### Linux en Macs{#linux-and-macs} 
1. Sluit Tomcat af: Gebruik vanaf een opdrachtregel: _tomcat_/bin/shutdown.sh
En gebruik ps -ef | grep tomcat om te zien of/wanneer het proces is gestopt. (Het kan even duren.) 
2. Verwijder de gedecomprimeerde ERDDAP™ installatie: In _tomcat_/webapps gebruiken
rm -rf erddap
3. Verwijder de oude erddap. war file: Gebruik in _tomcat_/webapps rm erddap. oorlog
4. Begrepen. war bestand van de tijdelijke map naar _tomcat_/webapps
5. Herstart Tomcat en ERDDAP : gebruik _tomcat_/bin/startup.sh
6. Beeld ERDDAP™ in uw browser om te controleren of de herstart geslaagd is.
     (Vaak moet je proberen een paar keer en wacht een minuut voordat je ziet ERDDAP™ .)   
             
### Vensters{#windows} 
1. Sluit Tomcat af: Gebruik vanaf een opdrachtregel: _tomcat_\\bin\\ shutdown.bat 
2. Verwijder de gedecomprimeerde ERDDAP™ installatie: In _tomcat_/webapps gebruiken
del /S/Q erddap
3. Verwijder de oude erddap. oorlogsbestand: Gebruik in _tomcat_\\webapps del erddap. oorlog
4. Begrepen. war bestand van de tijdelijke map naar _tomcat_\\webapps
5. Herstart Tomcat en ERDDAP : gebruik _tomcat_\\bin\\startup.bat
6. Beeld ERDDAP™ in uw browser om te controleren of de herstart geslaagd is.
     (Vaak moet je proberen een paar keer en wacht een minuut voordat je ziet ERDDAP™ .) 

Problemen met bijwerken ERDDAP ? Zie onze [sectie over het krijgen van extra ondersteuning](/docs/intro#support) .
