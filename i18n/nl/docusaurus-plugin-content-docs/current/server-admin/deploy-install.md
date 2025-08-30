---
sidebar_position: 1
---

# Installeren
Hoe te doen de eerste instelling vanERDDAP™op uw server


ERDDAP™kan draaien op elke server die ondersteuntJavaen Tomcat (en andere applicatieservers zoals Jetty, maar we ondersteunen ze niet) .ERDDAP™is getest op Linux (Inclusief Amazon's AWS) Mac en Windows computers.
*    **Docker** -- Wij bieden[ERDDAP™in een Docker container](https://hub.docker.com/r/erddap/erddap)en IOOS biedt nu een[Snelstartgids voorERDDAP™in een Docker Container](https://ioos.github.io/erddap-gold-standard/index.html).
Het is de standaard.ERDDAP™installatie, in een Docker container.
Via Docker Samenstellen bieden wij eenvoudige manieren om ssl en monitoring op te zetten, lees meer in uit[Docker documentatie](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).
Als u Docker al gebruikt, zult u waarschijnlijk liever de Docker versie.
Als u op zoek bent om te draaien op cloud-diensten zult u waarschijnlijk liever de Docker-versie.
*    **Amazon** -- Als u installeertERDDAP™op een Amazon Web Services EC2 instantie, zie dit[Amazon Web Services Overzicht](/docs/server-admin/additional-information#amazon)Eerst.
*    **Linux en Macs** --ERDDAP™werkt geweldig op Linux en Mac computers. Zie de instructies hieronder.
*    **Vensters** -- Windows is prima voor het testenERDDAP™en voor persoonlijk gebruik (zie onderstaande instructies) , maar we raden het niet aan voor publiekERDDAPs. UitvoerenERDDAP™op Windows kunnen problemen hebben: met name,ERDDAP™kan bestanden niet snel kunnen verwijderen en/of hernoemen. Dit is waarschijnlijk te wijten aan antivirus software (bijvoorbeeld van McAfee en Norton) die de bestanden op virussen controleert. Als u dit probleem tegenkomt (die kunnen worden gezien door foutmeldingen in de[log.txt](/docs/server-admin/additional-information#log)bestand als "Kan niet verwijderen ...") , het veranderen van de instellingen van de antivirussoftware kan gedeeltelijk verlichten het probleem. Of overwegen om een Linux of Mac server te gebruiken.

 **De normERDDAP™installatie-instructies voor Linux, Macs en Windows computers zijn:** 

0. Zorg ervoor dat alle afhankelijkheden zijn geïnstalleerd. Op niet-Windows-machines (Linux en Mac) Je hebt CSH nodig.
## Java {#java} 
1.  [VoorERDDAP™v2.19+, ingesteldJava21.](#java)
Om veiligheidsredenen is het bijna altijd het beste om de nieuwste versie vanJava21.
Download en installeer de nieuwste versie van
    [Adoptium's OpenJDK (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). Typ bijvoorbeeld "/_javaJreBinDirectory_/java -version" om de installatie te verifiëren
/usr/local/jdk-21.3+9/jre/bin/java -versie
    
    ERDDAP™werkt metJavauit andere bronnen, maar we raden Adopium omdat het de belangrijkste, gemeenschap-ondersteunde, gratis (zoals in bier en speech) versie vanJava21 biedt langdurige ondersteuning (gratis upgrades voor vele jaren na de eerste release) . Om veiligheidsredenen, gelieve uwERDDAPde versie vanJavaperiodiek als nieuwe versies vanJava21 beschikbaar komen van Adopdium.
    
    ERDDAP™is getest en uitgebreid gebruikt met 21, niet met andere versies. Om verschillende redenen testen we niet met andere versies vanJava.
     
## Tomcat{#tomcat} 
2.  [Instellen](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat is de meest gebruikteJavaApplication Server, dat isJavasoftware die tussen de netwerkdiensten van het besturingssysteem enJavaserversoftware zoalsERDDAP™. Het is Vrije en Open Bron Software (FOSS) .
    
U kunt een andere gebruikenJavaProgrammaserver (b.v. Jetty) , maar we testen alleen met en ondersteunen Tomcat.
     
    
    * Download Tomcat en uitpakken op uw server of PC.
Om veiligheidsredenen is het bijna altijd het beste om de nieuwste versie van Tomcat 10 te gebruiken (versie 9 en hieronder zijn niet aanvaardbaar) die is ontworpen om te werken metJava21 of nieuwer. Hieronder wordt de Tomcat directory aangeduid als _tomcat_.
        
Waarschuwing. Als u al een Tomcat met een andere webapplicatie (met name THREDDS) , raden wij u aan te installerenERDDAP™in[een tweede Tomcat](/docs/server-admin/additional-information#second-tomcat), omdatERDDAP™heeft verschillende Tomcat instellingen nodig en zou niet te maken moeten hebben met andere toepassingen voor geheugen.
        
        * Op Linux,[download de "Core" "tar".gz" Tomcat distributie](https://tomcat.apache.org/download-10.cgi)En uitpakken. We raden het uitpakken aan in /usr/local.
        * Op een Mac is Tomcat waarschijnlijk al geïnstalleerd in /Library/Tomcat, maar moet het bijwerken naar de nieuwste versie van Tomcat 10.
Als je het downloadt,[download de "Core" "tar".gz" Tomcat distributie](https://tomcat.apache.org/download-10.cgi)en uitpakken in /Library/Tomcat.
        * Op Windows, kunt u[download de "Core" "zip" Tomcat distributie](https://tomcat.apache.org/download-10.cgi)  (die niet knoeien met de Windows-register en die u bestuurt vanaf een DOS-commandoregel) en uitpakken in een geschikte directory. (Voor ontwikkeling gebruiken we de "Core" "zip" distributie. We maken een /programma directory en pakken het daar uit.) Of u kunt de "Core" "64-bit Windows zip" distributie downloaden, die meer functies bevat. Als de distributie een Windows installatie is, zal het waarschijnlijk Tomcat in, bijvoorbeeld, /Program Files/apache-tomcat-10.0.23 .
             
### server.xml{#serverxml} 
*   [server.xml](#serverxml)- In _tomcat_/conf/server.xml bestand, zijn er twee wijzigingen die je moet maken aan elk van de twee&lt;Connector&gt; tags- één voor
```
        <Connector port="8080" 
```
en één voor
```
        <Conector port="8443"
```
    1.   (Aanbevolen) Verhoog de connectieTimeout parameter waarde, misschien tot 300000 (milliseconden)   (5 minuten) .
    2.   (Aanbevolen) Voeg een nieuwe parameter toe: relaxedQueryChars="\\[\\]|" Dit is optioneel en iets minder veilig, maar verwijdert de noodzaak voor gebruikers om deze tekens procent-encoderen wanneer ze voorkomen in de parameters van de verzoek-URL van een gebruiker.
             
### content.xml{#contentxml} 
* context.xml -- Resources Cache - In _tomcat_/conf/context.xml, vlak voor de&lt;/Context&gt; tag, wijzig de Resources-tag (of voeg het toe als het er nog niet is) om de cache in te stellen MaxSize parameter tot 80000:
    &lt;Resources cachingAllowed="true" cacheMaxSize="80000" /&gt;
Dit voorkomt talrijke waarschuwingen in catalina. uit dat alles beginnen met
"WARNING\\[hoofd\\]org.apache.catalina.webresources.cache.getResource Kan de hulpbron niet toevoegen aan\\[/WEB-INF/classes/...]"
         
### Apache Timeout{#apache-timeout} 
* Op Linux computers, wijzigen van de Apache timeout instellingen zodat tijdrovende gebruikersverzoeken geen timeout (met wat vaak verschijnt als een "Proxy" of "Bad Gateway" fout) . Als root gebruiker:
    1. De Apache wijzigenhttpd.conf-bestand (meestal in /etc/httpd/conf/) :
Het bestaande&lt;Timeout&gt; instellen (of voeg er een toe aan het einde van het bestand) tot 3600 (seconden) , in plaats van de standaard 60 of 120 seconden.
Het bestaande&lt;ProxyTimeout&gt; instellen (of voeg er een toe aan het einde van het bestand) tot 3600 (seconden) , in plaats van de standaard 60 of 120 seconden.
    2. Apache herstarten: /usr/sbin/apachectl -k sierlijk (maar soms is het in een andere map) .
             
    * Veiligheidsaanbeveling: Zie[deze instructies](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)om de beveiliging van uw Tomcat installatie te verhogen, vooral voor publieke servers.
         
    * Voor publiekERDDAP™installaties op Linux en Macs, het is het beste om Tomcat op te zetten (het programma) als behorend tot gebruiker "tomcat" (een afzonderlijke gebruiker met beperkte toegangsrechten en welke[heeft geen wachtwoord](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Dus, alleen de super gebruiker kan overstappen naar optreden als gebruiker Tomcat. Dit maakt het onmogelijk voor hackers om in te loggen op uw server als gebruiker Tomcat. En in ieder geval moet je het zo maken dat de Tomcat gebruiker zeer beperkte permissies heeft op het bestandssysteem van de server (read+write+execute privileges voor de apache-tomcat directory tree en&lt;bigParentDirectory&gt; en alleen-lezen privileges voor mappen met data dieERDDAP™toegang tot).
        * U kunt het Tomcat gebruikersaccount aanmaken (die geen wachtwoord heeft) door het commando te gebruiken
sudo useradd tomcat -s /bin/bash -p '\\* '
        * U kunt overschakelen naar het werken als gebruiker Tomcat door het commando
sudo su - tomcat
             (Het zal u vragen om het superuser wachtwoord voor toestemming om dit te doen.) 
        * U kunt stoppen met werken als gebruiker Tomcat door het commando
afsluiten
        * Doe de rest van de Tomcat enERDDAP™setup instructies als gebruiker "tomcat." Voer later de startup.sh en shutdown.sh scripts uit als gebruiker "tomcat" zodat Tomcat toestemming heeft om naar zijn logbestanden te schrijven.
        * Na het uitpakken van Tomcat, van de ouder van de apache-tomcat directory:
            
            * Verander de eigenaar van de mapstructuur van de apache-tomcat naar de Tomcat-gebruiker.
clown -R Tomcat apache-tomcat-_10.0.23_
                 (maar vervang de werkelijke naam van uw Tomcat directory) .
            * Wijzig de "groep" naar Tomcat, uw gebruikersnaam of de naam van een kleine groep die Tomcat en alle beheerders van Tomcat omvat/ERDDAP, bijvoorbeeld,
chgrp -R _jouw Gebruikersnaam_ apache-tomcat-_10.0.23_
            * Verander toegangsrechten zodat Tomcat en de groep hebben gelezen, schrijven, uitvoeren privileges, bijvoorbeeld,.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Verwijder "andere" gebruikersrechten om te lezen, te schrijven of uit te voeren:
chmod -R o-rwx apache-tomcat-_10.0.23_
Dit is belangrijk, omdat het voorkomt dat andere gebruikers mogelijk gevoelige informatie inERDDAP™setup bestanden.
            
              
### Geheugen{#memory} 
* Omgevingsvariabelen van Tomcat instellen
    
Op Linux en Macs:
Een bestand _tomcat_/bin/setenv.sh aanmaken (of in Red Hat Enterprise Linux\\[RHEL\\], bewerken ~tomcat/conf/tomcat10.conf) Tomcat's omgevingsvariabelen instellen. Dit bestand wordt gebruikt door _tomcat_/bin/startup.sh en shutdown.sh. Het bestand moet iets bevatten als:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (maar vervang de mapnamen van uw computer) .
 (Als je eerder JRE\\_HOME hebt ingesteld, kun je dat verwijderen.)   
Op Macs hoef je waarschijnlijk geen JAVA\\_HOME in te stellen.

Op Windows:
Maak een bestand _tomcat_\\bin\\setenv.bat om Tomcat's omgevingsvariabelen in te stellen. Dit bestand wordt gebruikt door _tomcat_\\bin\\startup.bat enshutdown.bat. Het bestand moet iets bevatten als:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (maar vervang de mapnamen van uw computer) .
Als dit alleen voor lokale testen is, verwijder "-server."
 (Als je eerder JRE\\_HOME hebt ingesteld, kun je dat verwijderen.) 

De -Xmx en -Xms geheugeninstellingen zijn belangrijk omdatERDDAP™Werkt beter met meer geheugen. Stel altijd -Xms in op dezelfde waarde als -Xmx.

* Voor 32 bit besturingssystemen en 32 bitJava:
64 bitJavais veel beter dan 32 bitJavamaar 32 bitJavawerkt zolang de server niet echt bezet is. Hoe meer fysiek geheugen in de server, hoe beter: 4+ GB is echt goed, 2 GB is oké, minder wordt niet aanbevolen. Met 32 bitsJava, zelfs met overvloedig fysiek geheugen, Tomcat enJavazal niet draaien als u probeert om -Xmx veel hoger dan 1500M (1200M op sommige computers) . Als uw server minder dan 2 GB geheugen heeft, verminder dan de -Xmx waarde (in 'M'egaBytes) tot 1/2 van het fysieke geheugen van de computer.
* Voor 64 bit besturingssystemen en 64 bitJava:
64 bitJavawerkt alleen op een 64 bit besturingssysteem.
    
    * MetJava8, u moet toevoegen \\-d64 aan de Tomcat CATALINA\\_OPTS parameter in setenv.bat
    * MetJava21, u kiest 64 bitJavawanneer u een versie vanJavagemarkeerd met "64 bit."
    
Met 64 bitJava, Tomcat enJavakan zeer hoge -Xmx en -Xms instellingen gebruiken. Hoe meer fysiek geheugen in de server, hoe beter. Als een simplistische suggestie: wij raden u aan -Xmx en -Xms in te stellen op (in 'M'egaBytes) tot 1/2 (of minder) van het fysieke geheugen van de computer. Je kunt zien of Tomcat,JavaenERDDAP™worden inderdaad uitgevoerd in 64 bit modus door te zoeken naar "bit," inERDDAP's Dagelijks rapport e-mail of in de _bigParentDirectory_/logs/[log.txt](/docs/server-admin/additional-information#log)bestand (_bigParentDirectory_ is gespecificeerd in[setup.xml](#setupxml)) .
#### Afvalverzameling{#garbage-collection} 
* InERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)bestand, zult u veel "GC (Toewijzingsfout) " berichten.
Dit is meestal geen probleem. Het is een frequent bericht van een normaal werkendeJavaZe zeggen dat het net klaar is met een kleine vuilnisverzameling omdat de kamer in Eden opraakte. (de afdelingJavaberg voor zeer jonge objecten) . Meestal toont het bericht u _memoryUseVoor_\\-&gt;_memoryUseNa_. Als die twee nummers dicht bij elkaar zijn, betekent dat dat de afvalverzameling niet productief was. Het bericht is slechts een teken van problemen als het zeer frequent (elke paar seconden) , niet productief, en de aantallen zijn groot en niet groeien, die samen aangeven datJavaheeft meer geheugen nodig, heeft moeite om geheugen vrij te maken, en kan geen geheugen vrijmaken. Dit kan gebeuren tijdens een stressvolle tijd, ga dan weg. Maar als het aanhoudt, is dat een teken van problemen.
* Als je Java.lang.OutOfMemoryError's in zietERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)bestand, zie[OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror)voor tips over het diagnosticeren en oplossen van de problemen.
         
### Rechten{#permissions} 
*   [Op Linux en Macs, de toegangsrechten wijzigen](#permissions)van alles\\*.shbestanden in _tomcat_/bin/ die door de eigenaar moeten worden uitgevoerd, bijvoorbeeld met
```
    chmod +x \\*.sh  
```
### Lettertypen{#fonts} 
*   [Lettertypen voor afbeeldingen:](#fonts)Wij geven de voorkeur aan de gratis[DejaVu-lettertypen](https://dejavu-fonts.github.io/)aan de andereJavalettertypen. Het gebruik van deze lettertypen is sterk aanbevolen, maar niet vereist.
    
Als u ervoor kiest om de DejaVu lettertypen niet te gebruiken, moet u het lettertypeFamily instellen in setup.xml veranderen in&lt;lettertypeFamily&gt;SansSerif&lt;/fontFamily&gt;, die beschikbaar is met alleJavadistributies. Als je fontFamily op de naam van een lettertype zet dat niet beschikbaar is,ERDDAP™zal een lijst met beschikbare lettertypen in het log.txt-bestand niet laden en zal deze afdrukken. Je moet zo'n lettertype gebruiken.
    
Als u ervoor kiest om de DejaVu lettertypen te gebruiken, zorg er dan voor dat het lettertypeFamilie instelling in setup.xml is&lt;lettertype Familie&gt;DejaVu Sans&lt;FontFamily&gt;.
    
Om de DejaVu lettertypen te installeren, kunt u downloaden[DejaVuFonts.zip](/DejaVuFonts.zip)  (5,522.795 bytes, MD5=33E1E61FA406A547851ED308B4FFEF42) en rits de lettertypebestanden naar een tijdelijke map.
    
    * Op Linux:
        * Voor Linux AdoptioniumJavadistributies, zie[deze instructies](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Met andereJavadistributies: Als Tomcat-gebruiker kopieer je de lettertypebestanden naar _JAVA\\_HOME_/lib/fonts dusJavakan de lettertypen te vinden. Vergeet niet: als / wanneer u later upgrade naar een nieuwere versie vanJavaJe moet deze lettertypen opnieuw installeren.
    * Op Macs: voor elk lettertypebestand, dubbelklik erop en klik vervolgens op Lettertype installeren.
    * Op Windows 7 en 10: in Windows Explorer, selecteer alle lettertypebestanden. Rechter muisklik. Klik op Installeren.
             
### Test Tomcat{#test-tomcat} 
* Test uw Tomcat installatie.
    * Linux:
        * Als gebruiker "tomcat" start _tomcat_/bin/startup.sh
        * Bekijk uw URL + ":8080" in uw browser (bv.[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Je zou de Tomcat "Gefeliciteerd" pagina moeten zien.
Als er problemen zijn, zie het Tomcat log bestand _tomcat_/logs/catalina.out.
    * Mac (tomcat uitvoeren als systeembeheerder gebruiker) :
        * _tomcat_/bin/startup.sh uitvoeren
        * Bekijk uw URL + ":8080" in uw browser (bv.[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Merk op dat uw Tomcat standaard alleen toegankelijk is voor u. Het is niet openbaar toegankelijk.
        * Je zou de Tomcat "Gefeliciteerd" pagina moeten zien.
Als er problemen zijn, zie het Tomcat log bestand _tomcat_/logs/catalina.out.
    * Windows localhost:
        
        * Klik met de rechtermuisknop op het Tomcat-pictogram in het systeemvak en kies "Startservice."
        * Beeld[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/), of[ http://localhost:8080/ ](http://localhost:8080/), in uw browser. Merk op dat uw Tomcat standaard alleen toegankelijk is voor u. Het is niet openbaar toegankelijk.
        * Je zou de Tomcat "Gefeliciteerd" pagina moeten zien.
Als er problemen zijn, zie het Tomcat log bestand _tomcat_/logs/catalina.out.
            
### Problemen met de Tomcat installatie?{#troubles-with-the-tomcat-installation} 
* Op Linux en Mac, als je Tomcat niet kunt bereiken ofERDDAP™  (of misschien kun je ze gewoon niet bereiken vanaf een computer buiten je firewall) , kunt u testen of Tomcat luistert naar poort 8080, door te typen (als root) op een commandoregel van de server:
```  
    netstat -tuplen | grep 8080  
```
Dat zou een regel terug moeten geven met zoiets als:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (waarbij '#' een cijfer is) , waaruit blijkt dat een "java" proces (Waarschijnlijk Tomcat.) is luisteren op poort "8080" voor "tcp" verkeer. Als er geen regels werden teruggegeven, als de teruggekregen lijn aanzienlijk anders is, of als er twee of meer lijnen werden teruggegeven, dan kan er een probleem zijn met de poortinstellingen.
* Zie het Tomcat-logbestand _tomcat_/logs/catalina.out. Tomcat problemen en sommigeERDDAP™Opstartproblemen worden daar bijna altijd aangegeven. Dit komt vaak voor bij de eerste instellingERDDAP™.
* Zie[Tomcat](https://tomcat.apache.org/)website of doorzoek het web voor hulp, maar laat ons weten welke problemen je had en welke oplossingen je hebt gevonden.
* Zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
             
### ERDDAP™Inhoud{#erddap-content} 
3.  [Stel de_tomcat_/content/erddapconfiguratiebestanden.](#erddap-content)  
Op Linux, Mac en Windows, downloaden[erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (versie 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, gedateerd 2024-10-14) en rits het uit in _tomcat_, aanmaken_tomcat_/content/erddap.

    \\[Enkele eerdere versies zijn ook beschikbaar:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, gedateerd 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, gedateerd 2022-02-16)   
    [2,21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, gedateerd 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, gedateerd 2022-12-08) 
    [2,23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, gedateerd 2023-02-27) 
en rits het uit in _tomcat_, aanmaken_tomcat_/content/erddap.\\]
    
#### Andere map{#other-directory} 
Voor Red Hat Enterprise Linux (RHEL) of voor andere situaties waarin u de Tomcat-directory niet mag wijzigen of waar u deERDDAP™inhoud directory in een andere locatie om een andere reden (bijvoorbeeld als je Jetty gebruikt in plaats van Tomcat) , unzip erddapContent.zipin de gewenste map (tot welke alleen gebruiker=tomcat toegang heeft) en stel deerddapContentDirectorysysteemeigenschap (bv.erddapContentDirectory=~tomcat/content/erddap) dusERDDAP™kan deze nieuwe inhoud directory vinden.
    
### setup.xml{#setupxml} 
*   [Lees de opmerkingen in_tomcat_/content/erddap' **setup.xml** ](#setupxml)en de gevraagde wijzigingen aanbrengen. setup.xml is het bestand met alle instellingen die aangeven hoe uwERDDAP™Gedraag je.
Voor de eerste setup moet u tenminste deze instellingen wijzigen:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Wanneer u de bigParentDirectory aanmaakt, vanuit de oudermap van bigParentDirectory:
    
    * Maak gebruiker=tomcat de eigenaar van de bigParentDirectory, bijvoorbeeld,
```
        chown -R tomcat _bigParentDirectory_
```
    * Wijzig de "groep" naar Tomcat, uw gebruikersnaam of de naam van een kleine groep die Tomcat en alle beheerders van Tomcat omvat/ERDDAP, bijvoorbeeld,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Verander toegangsrechten zodat Tomcat en de groep hebben gelezen, schrijven, uitvoeren privileges, bijvoorbeeld,.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Verwijder "andere" gebruikersrechten om te lezen, te schrijven of uit te voeren. Dit is belangrijk om te voorkomen dat het lezen van mogelijk gevoelige informatie inERDDAP™log bestanden en bestanden met informatie over privé datasets.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Omgevingsvariabelen{#environment-variables} 
Beginnen metERDDAP™v2.13,ERDDAP™beheerders kunnen elke waarde in setup.xml overschrijven door een omgevingsvariabele genaamdERDDAP\\__valueName_ voordat u startERDDAP™. Bijvoorbeeld, gebruikERDDAP\\_baseUrl overschrijft de&lt;baseUrl&gt; waarde. Dit kan handig zijn bij het implementerenERDDAP™met een container als Docker, zoals u standaardinstellingen in setup.xml kunt zetten en dan speciale instellingen via omgevingsvariabelen kunt leveren. Als u geheime informatie aanERDDAP™Controleer via deze methode of de informatie geheim blijft.ERDDAP™leest alleen omgevingsvariabelen eenmaal per opstarten, in de eerste seconde van opstarten, dus een manier om dit te gebruiken is: stel de omgevingsvariabelen in, startERDDAP, wacht totERDDAP™wordt gestart en de omgevingsvariabelen worden uitgeschakeld.
    
### datasets.xml {#datasetsxml} 
* Lees de opmerkingen in[ **Werken met dedatasets.xmlBestand** ](/docs/server-admin/datasets). Later, nadat jeERDDAP™voor de eerste keer (meestal met alleen de standaard datasets) , zul je de XML in_tomcat_/content/erddap' **datasets.xml** om alle datasets te specificeren die u wiltERDDAP™Om te dienen. Dit is waar u het grootste deel van uw tijd doorbrengen tijdens het opzettenERDDAP™en later met behoud van uwERDDAP™.

U kunt een voorbeeld zien[datasets.xmlop GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (Onwaarschijnlijk) Nu of (iets waarschijnlijker) in de toekomst, als u erddap's CSS-bestand wilt wijzigen, maak dan een kopie van_tomcat_/content/erddap/images/erddapStart2.css genaamd erddap2.css en dan wijzigingen aanbrengen. Wijzigingen in erddap2.css worden alleen van kracht wanneerERDDAP™wordt herstart en vereisen vaak ook de gebruiker om de gecachede bestanden van de browser te wissen.
     
ERDDAP™werkt niet correct als de setup.xml ofdatasets.xmlbestand is geen goed gevormd XML bestand. Dus, nadat je deze bestanden hebt bewerkt, is het een goed idee om te controleren of het resultaat goed is gevormd XML door de XML tekst te plakken in een XML checker zoals[xmlvalidatie](https://www.xmlvalidation.com/).
     
### Het erddap.war-bestand installeren{#install-the-erddapwar-file} 
4. Op Linux, Mac en Windows, downloaden[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war)in _tomcat_/webapps .
     (versie 2.28.0, 620,824,288 bytes, MD5=f948b2ba603f65a83ac67af43da9e4c2, gedateerd 08-29-2025) 
    
Het .war bestand is groot omdat het hoge resolutie kustlijn, grens, en hoogte gegevens die nodig zijn om kaarten te maken bevat.
    
    \\[Sommige eerdere versies zijn ook beschikbaar.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, gedateerd 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069.844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, gedateerd 2022-02-23)   
    [2,21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDBD519B6, gedateerd 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742.765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, gedateerd 2022-12-08) 
    [2,23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, gedateerd 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, gedateerd 2024-06-07) 
    [2,25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, gedateerd 2024-11-07) 
    [2,26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032 bytes, MD5=99a725108b37708e5420986c1616a119, gedateerd 2025-03-31) 
    [2,27,0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)  (620.554.403 bytes, MD5=3b2086c659ee4145ca2dff447bf4ef7, gedateerd 06-11-2025) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Proxy gebruiken Passeer zodat gebruikers het poortnummer, bijvoorbeeld:8080, niet in de URL hoeven te zetten.
Op Linux computers, als Tomcat draait in Apache, wijzig dan de Apachehttpd.conf-bestand (meestal in /etc/httpd/conf/) HTTP-verkeer naar/vanERDDAP™zonder het poortnummer, bijvoorbeeld:8080, in de URL. Als root gebruiker:
    1. Het bestaande wijzigen&lt;VirtualHost&gt; tag (als er één is) , of voeg er een toe aan het einde van het bestand:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Herstart vervolgens Apache: /usr/sbin/apachectl -k sierlijk (maar soms is het in een andere map) .
         
### NGINX{#nginx} 
 (UNCOMMON) Als u[NGINX](https://www.nginx.com/)  (een webserver en load balancer) :
om NGINX enERDDAP™correct werken methttps, moet u het volgende knipsel in de Tomcat server.xml&lt;Host&gt; blok:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
En in het nginx configuratiebestand moet je deze headers instellen:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Dankzij Kyle Wilcox.)   
     
### Tomcat starten{#start-tomcat} 
*    (Ik raad het gebruik van de Tomcat Web Application Manager niet aan. Als je Tomcat niet volledig afsluit en opstart, heb je vroeg of laat problemen met PermGen geheugen.)   
     
*    (In Linux of Mac OS, als je een speciale gebruiker hebt gemaakt om Tomcat uit te voeren, bijvoorbeeld, Tomcat, vergeet niet om de volgende stappen als die gebruiker te doen.)   
     
* Als Tomcat al draait, sluit Tomcat af met (in Linux of Mac OS) _tomcat_/bin/shutdown.sh
of (in vensters) _tomcat_\\bin\\shutdown.bat
    
Gebruik op Linux ps -ef|grep Tomcat voor en na afsluiten.sh om zeker te zijn dat het Tomcat proces is gestopt. Het proces moet vóór het afsluiten worden vermeld en uiteindelijk niet na het afsluiten. Het kan een minuut of twee duren voorERDDAP™om volledig te sluiten. Wees geduldig. Of als het erop lijkt dat het niet vanzelf stopt, gebruik dan:
-9 _processID_ doden
    
* Tomcat starten met (in Linux of Mac OS) _tomcat_/bin/startup.sh
of (in vensters) _tomcat_\\bin\\startup.bat

## IsERDDAP™Rennen?{#is-erddap-running} 
Gebruik een browser om te proberen te bekijken http://_www.YourServer.org_/erddap/status.html   
ERDDAP™start zonder datasets geladen. Datasets worden geladen in een achtergrond thread en zo worden beschikbaar een-voor-een.

### Problemen oplossen{#troubleshooting} 
* Wanneer een verzoek van een gebruiker binnenkomt, gaat het naar Apache (op Linux en Mac OS computers) Dan Tomcat.ERDDAP™.
* Je kunt zien wat er naar Apache gaat. (en gerelateerde fouten) in de Apache log bestanden.
*   [Jij](/docs/server-admin/additional-information#tomcat-logs)kan zien wat er met Tomcat gebeurt (en gerelateerde fouten) in de Tomcat-logbestanden (_tomcat_/logs/catalina.out en andere bestanden in die map) .
*   [Jij](/docs/server-admin/additional-information#log)kan zien wat er gaat gebeurenERDDAP, diagnoseboodschappen vanERDDAPen foutmeldingen vanERDDAPIn deERDDAP™ &lt;bigParentDirectory&gt;logs/log.txt-bestand.
* Tomcat start nietERDDAP™Totdat Tomcat een verzoek krijgt voorERDDAP™. Zodat je kunt zien in de Tomcat log bestanden als het begonERDDAP™of als er een foutmelding met betrekking tot die poging.
* WanneerERDDAP™begint, het hernoemt de oudeERDDAP™log.txt-bestand (logArchivedAt_CurrentTime_.txt) en maakt een nieuw log.txt bestand aan. Dus als het logboek. txt-bestand is oud, het is een teken datERDDAP™is niet onlangs herstart.ERDDAP™schrijft log info naar een buffer en schrijft alleen de buffer naar het logbestand periodiek, maar u kunt forcerenERDDAP™om de buffer naar het logbestand te schrijven door een bezoek .../erddap/status.html.

### Problemen: Oude versie vanJava {#trouble-old-version-of-java} 
Als u een versie vanJavaDat is te oud voorERDDAP,ERDDAP™zal niet uitvoeren en u ziet een foutmelding in Tomcat's log bestand zoals
Uitzondering in draad "main" java.lang.Niet-ondersteunde klasseVersieFout:
_some/class/name_: Niet ondersteund major.minor versie _someNumber_
De oplossing is het bijwerken van de meest recente versie vanJavaEn zorg ervoor dat Tomcat het gebruikt.

### Problemen: Traag opstarten eerste keer{#trouble-slow-startup-first-time} 
Tomcat moet veel werk doen de eerste keer dat een toepassing alsERDDAP™wordt gestart; met name moet het uitpakken van de erddap. war-bestand (Dat is als een.zipbestand) . Op sommige servers, de eerste poging om te bekijkenERDDAP™stalletjes (30 seconden?) Totdat dit werk klaar is. Op andere servers zal de eerste poging onmiddellijk mislukken. Maar als je 30 seconden wacht en het opnieuw probeert, zal het slagen alsERDDAP™correct is geïnstalleerd.
Hier is geen oplossing voor. Dit is gewoon hoe Tomcat werkt. Maar het gebeurt alleen de eerste keer nadat u een nieuwe versie vanERDDAP™.

## Afsluiten en herstarten{#shut-down-and-restart} 
In de toekomst, te sluiten (en herstart)  ERDDAP, zie[Hoe te afsluiten en opnieuw te starten Tomcat enERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Problemen?{#trouble} 
Problemen met de installatie van Tomcat ofERDDAP? Zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
## E-mail Kennisgeving van nieuwe versies vanERDDAP {#email-notification-of-new-versions-of-erddap} 
Als u een e-mail wilt ontvangen wanneer een nieuwe versie vanERDDAP™beschikbaar is of andere belangrijkeERDDAP™aankondigingen, kunt u deelnemen aan deERDDAP™aankondigingenlijst[Hier.](https://groups.google.com/g/erddap-announce). Deze lijst is gemiddeld ongeveer één e-mail per drie maanden.
## Aanpassen{#customize} 
[Pas uwERDDAP™om uw organisatie te markeren (nietNOAA ERD) .](#customize)
    * Wijzig de banner die bovenaan verschijntERDDAP™.html pagina's door het bewerken van de&lt;startBodyHtml5&gt; tag in uwdatasets.xmlbestand. (Als er geen is, kopieer de standaard vanERDDAP's
        \\[kat\\]/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erdap/util/messages.xml-bestand naardatasets.xmlen bewerken.) Bijvoorbeeld:
        * Een andere afbeelding gebruiken (Het logo van uw organisatie) .
        * Verander de achtergrondkleur.
        * Wijziging "ERDDAP" naar "Uw organisatie"ERDDAP"
        * Wijzig "Gemakkelijker toegang tot wetenschappelijke gegevens" in "Gemakkelijker toegang tot _Uw organisatie_'s gegevens."
        * Wijzig de "Breed to you by" links om links te zijn naar uw organisatie en financieringsbronnen.
    * Wijzig de informatie aan de linkerkant van de startpagina door het bewerken van de&lt;de korte beschrijvingHtml&gt; tag in uwdatasets.xmlbestand. (Als er geen is, kopieer de standaard vanERDDAP's
        \\[kat\\]/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erdap/util/messages.xml-bestand naardatasets.xmlen bewerken.) Bijvoorbeeld:
        * Beschrijf wat uw organisatie en/of groep doet.
        * Beschrijf welke gegevens dit isERDDAP™heeft.
    * Om het pictogram dat verschijnt op de browsertabbladen te wijzigen, zet u de favicon van uw organisatie. ico in_tomcat_/content/erddap/images/ . Zie[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
