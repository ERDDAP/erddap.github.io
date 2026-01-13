---
sidebar_position: 1
---

# Installeren
Hoe te doen de eerste instelling van ERDDAP™ op uw server

 ERDDAP™ kan draaien op elke server die ondersteunt Java en Tomcat (en andere applicatieservers zoals Jetty, maar we ondersteunen ze niet) .
 ERDDAP™ is getest op Linux (Inclusief Amazon's AWS) Mac en Windows computers.

*  **Docker** -- Wij bieden [ ERDDAP™ in een Docker container](https://hub.docker.com/r/erddap/erddap) 
en IOOS biedt nu een [Snelstartgids voor ERDDAP™ in een Docker Container](https://ioos.github.io/erddap-gold-standard/index.html) .
Het is de standaard. ERDDAP™ installatie, in een Docker container.
Via Docker Samenstellen bieden wij eenvoudige manieren om ssl en monitoring op te zetten, lees meer in uit [Docker documentatie](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Als u Docker al gebruikt, zult u waarschijnlijk liever de Docker versie.
Als u op zoek bent om te draaien op cloud-diensten zult u waarschijnlijk liever de Docker-versie.
*  **Amazon** -- Als u installeert ERDDAP™ op een Amazon Web Services EC2 instantie, zie dit [Amazon Web Services Overzicht](/docs/server-admin/additional-information#amazon) Eerst.
*  **Linux en Macs** -- ERDDAP™ werkt geweldig op Linux en Mac computers. Zie de instructies hieronder.
*  **Vensters** -- Windows is prima voor het testen ERDDAP™ en voor persoonlijk gebruik (zie onderstaande instructies) ,
maar we raden het niet aan voor publiek ERDDAP™ inzet. Uitvoeren ERDDAP™ op Windows kunnen problemen hebben:
met name, ERDDAP™ kan bestanden niet snel kunnen verwijderen en/of hernoemen. Dit is waarschijnlijk te wijten aan antivirus software
   (bijvoorbeeld van McAfee en Norton) die de bestanden op virussen controleert. Als u dit probleem tegenkomt
(die kan worden gezien door foutmeldingen in de [log.txt](/docs/server-admin/additional-information#log) bestand als
"Niet in staat om te verwijderen ..."), het veranderen van de antivirus software instellingen kan gedeeltelijk verlichten het probleem. Of overwegen om een Linux of Mac server te gebruiken.

 **De norm ERDDAP™ installatie-instructies voor Linux, Macs en Windows computers zijn:** 

0. Zorg ervoor dat alle afhankelijkheden zijn geïnstalleerd. Op niet-Windows-machines (Linux en Mac) Je hebt CSH nodig.

##  Java  {#java} 

1.  [Voor ERDDAP™ v2.29.0+, ingesteld Java 25.](#java) 
Om veiligheidsredenen is het bijna altijd het beste om de nieuwste versie van Java 25.
Download en installeer de nieuwste versie van
    [Adoptium's OpenJDK (Temurin) 25 (LTS) ](https://adoptium.net/temurin/releases/?version=25) .
Om de installatie te verifiëren, draaien `/javaJreBinDirectory/java -versie` , bijvoorbeeld
    `/usr/local/jdk-25.0.1+8/jre/bin/java -versie` .

    ERDDAP™ werkt met Java uit andere bronnen, maar we raden Adopium aan omdat het de belangrijkste, door de gemeenschap gesteunde,
vrij (zoals in bier en speech) versie van Java 25 biedt langdurige ondersteuning (gratis upgrades voor vele jaren na de eerste release) .
Om veiligheidsredenen, gelieve uw ERDDAP de versie van Java periodiek als nieuwe versies van Java 25 beschikbaar komen van Adopdium.

    ERDDAP™ is getest en uitgebreid gebruikt met 25, niet met andere versies. Om verschillende redenen testen we niet met andere versies van Java .
     
## Tomcat{#tomcat} 

2.  [Instellen](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat is de meest gebruikte Java Applicatieserver
dat is Java software die tussen de netwerkdiensten van het besturingssysteem en Java serversoftware zoals ERDDAP™ .
Het is Vrije en Open Bron Software (FOSS) .

U kunt een andere gebruiken Java Programmaserver (b.v. Jetty) , maar we testen alleen met en ondersteunen Tomcat.

   * Download Tomcat en uitpakken op uw server of PC.
Om veiligheidsredenen is het bijna altijd het beste om de nieuwste versie van Tomcat 10 te gebruiken (versie 9 en hieronder zijn niet aanvaardbaar) 
die is ontworpen om te werken met Java 25 of nieuwer. Hieronder wordt de Tomcat directory aangeduid als `kat` .

_Waarschuwing&#33; Als u al een Tomcat met een andere webapplicatie (met name THREDDS) , raden wij u aan te installeren ERDDAP™ in
      [een tweede Tomcat](/docs/server-admin/additional-information#second-tomcat) , omdat ERDDAP™ heeft verschillende Tomcat instellingen nodig
en mogen niet te maken hebben met andere toepassingen voor geheugen.

     * Op Linux, [download de "Core" "tar" .gz " Tomcat distributie](https://tomcat.apache.org/download-10.cgi) en uitpakken.
We raden het uitpakken in `/usr/local` .
     * Op een Mac is Tomcat waarschijnlijk al geïnstalleerd in `/Library/Tomcat` , maar moet het bijwerken naar de nieuwste versie van Tomcat 10.
Als je het downloadt, [download de "Core" "tar" .gz " Tomcat distributie](https://tomcat.apache.org/download-10.cgi) en uitpakken in `/Library/Tomcat` .
     * Op Windows, kunt u [download de "Core" "zip" Tomcat distributie](https://tomcat.apache.org/download-10.cgi) 
        (die niet knoeien met de Windows-register en die u bestuurt vanaf een DOS-commandoregel) en uitpakken in een geschikte directory.
        (Voor ontwikkeling gebruiken we de "Core" "zip" distributie. We maken een `/programma's` directory en uitpakken daar.) 
Of u kunt de "Core" "64-bit Windows zip" distributie downloaden, die meer functies bevat.
Als de distributie is een Windows-installer, het zal waarschijnlijk Tomcat in, bijvoorbeeld, `/Program Files/apache-tomcat-10.0.23` .
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - In de `tomcat/conf/server.xml` bestand, er zijn twee wijzigingen die u moet maken aan elk van de twee ` <Connector> ` labels
   (één voor `&lt;Connectorpoort="8080"` en één voor `&lt;Conectorpoort="8443"` ) .
   1.  (Aanbevolen) Verhoog de `verbinding Tijdslimiet` parameterwaarde, misschien tot 300000 (milliseconden, dat is 5 minuten) .
   2.  (Aanbevolen) Een nieuwe parameter toevoegen: `relaxedQueryChars="[] | "` . Dit is optioneel en iets minder veilig,
maar verwijdert de noodzaak voor gebruikers om deze tekens procent-encoderen wanneer ze voorkomen in de parameters van de verzoek-URL van een gebruiker.
             
### content.xml{#contentxml} 

* context.xml -- Resources Cache - In `tomcat/conf/context.xml` , vlak voor de ` </Context> ` tag, wijzig de Resources-tag
   (of voeg het toe als het er nog niet is) om de cache in te stellen MaxSize parameter tot 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Dit voorkomt talrijke waarschuwingen in catalina. uit dat alles beginnen met
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeout{#apache-timeout} 

* Op Linux computers, wijzigen van de Apache timeout instellingen zodat tijdrovende gebruikersverzoeken geen timeout
   (met wat vaak verschijnt als een "Proxy" of "Bad Gateway" fout) . Als root gebruiker:
  * De Apache wijzigen ` http d.conf` bestand (vaak `/etc/ http d/conf/` ) :
    * Het bestaande ` <Timeout> ` instelling (of voeg er een toe aan het einde van het bestand) tot 3600 (seconden) , in plaats van de standaard 60 of 120 seconden.
    * Het bestaande ` <ProxyTimeout> ` instelling (of voeg er een toe aan het einde van het bestand) tot 3600 (seconden) , in plaats van de standaard 60 of 120 seconden.
  * Apache herstarten: `/usr/sbin/apachectl -k sierlijk`   (maar soms is het in een andere map) .

### Beveiliging{#security} 
         
* Veiligheidsaanbeveling: Zie [deze instructies](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) de veiligheid van
uw Tomcat installatie, vooral voor publieke servers.
         
* Voor publiek ERDDAP™ installaties op Linux en Macs, het is het beste om Tomcat op te zetten (het programma) als toebehorend aan gebruiker `kat` 
   (een afzonderlijke gebruiker met beperkte toegangsrechten en welke [heeft geen wachtwoord](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Dus, alleen de super gebruiker kan overschakelen naar het optreden als gebruiker `kat` . Dit maakt het voor hackers onmogelijk om in te loggen op uw server als gebruiker `kat` .
En in ieder geval, moet je het zo maken dat de `kat` gebruiker heeft zeer beperkte toegangsrechten op het bestandssysteem van de server (lees + write+execute privileges
voor de `apache-tomcat` map boom en ` <bigParentDirectory> ` en alleen-lezen privileges voor mappen met data die ERDDAP™ toegang tot).
  * U kunt de `kat` gebruikersaccount (die geen wachtwoord heeft) door het commando:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * U kunt overschakelen naar werken als gebruiker `kat` door het commando te gebruiken
    ```
    sudo su - tomcat
    ```
     (Het zal u vragen om het superuser wachtwoord voor toestemming om dit te doen.) 
    * U kunt stoppen met werken als gebruiker Tomcat door het commando
    ```
    exit
    ````
    * Doe de rest van de Tomcat en ERDDAP™ setup instructies als gebruiker `kat` . Later, run de `startup.sh` en `afsluiten. sh` scripts als gebruiker `kat` 
zodat Tomcat toestemming heeft om naar zijn logbestanden te schrijven.
    * Na het uitpakken van Tomcat, van de ouder van de `apache-tomcat` map:
      * Verander de eigenaar van de mapstructuur van de apache-tomcat naar de Tomcat-gebruiker.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (maar vervang de werkelijke naam van uw Tomcat directory) .
      * Wijzig de "groep" naar Tomcat, uw gebruikersnaam of de naam van een kleine groep die Tomcat en alle beheerders van Tomcat omvat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Toestemmingen wijzigen zodat Tomcat en de groep rechten hebben gelezen, geschreven, uitgevoerd:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Verwijder "andere" gebruikersrechten om te lezen, te schrijven of uit te voeren:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Dit is belangrijk, omdat het voorkomt dat andere gebruikers mogelijk gevoelige informatie in ERDDAP™ setup bestanden.

### Geheugen{#memory} 

Omgevingsvariabelen van Tomcat instellen

* Op Linux en Macs:
Een bestand aanmaken `Tomcat/bin/setenv.sh`   (of in Red Hat Enterprise Linux \\[ RHEL \\] , bewerken `~tomcat/conf/tomcat10.conf` ) Tomcat's omgevingsvariabelen instellen.
Dit bestand zal worden gebruikt door `Tomcat/bin/startup.sh` en `afsluiten. sh` . Het bestand moet iets bevatten als:
  ```
  export JAVA_HOME=/usr/local/jdk-25.0.1+8
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (maar vervang de mapnamen van uw computer) .
   (Als u eerder `JRE_HOME` , u kunt verwijderen.) 
Op Macs, je hoeft waarschijnlijk niet te zetten `JAVA_HOME` .

* Op Windows:
Een bestand aanmaken `tomcat\bin\\setsv.bat` Tomcat's omgevingsvariabelen instellen.
Dit bestand zal worden gebruikt door `tomcat\bin\\startup.bat` en ` shutdown.bat ` .
Het bestand moet iets bevatten als:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-25.0.1+8"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (maar vervang de mapnamen van uw computer) .
Als dit alleen voor lokale testen is, verwijder "-server."
   (Als u eerder `JRE_HOME` , u kunt verwijderen.) 

De `-Xmx` en `Xms` geheugeninstellingen zijn belangrijk omdat ERDDAP™ Werkt beter met meer geheugen.
Altijd ingesteld `Xms` tot dezelfde waarde als `-Xmx` .

* Voor 32 bit besturingssystemen en 32 bit Java :
64 bit Java is veel beter dan 32 bit Java maar 32 bit Java werkt zolang de server niet echt bezet is.
Hoe meer fysiek geheugen in de server, hoe beter: 4+ GB is echt goed, 2 GB is oké, minder wordt niet aanbevolen.
Met 32 bits Java , zelfs met overvloedig fysiek geheugen, Tomcat en Java zal niet rennen als je probeert om in te stellen `-Xmx` veel hoger dan 1500M (1200M op sommige computers) .
Als uw server heeft minder dan 2 GB geheugen, verminderen de `-Xmx` waarde (in 'M'egaBytes) tot 1/2 van het fysieke geheugen van de computer.

* Voor 64 bit besturingssystemen en 64 bit Java :
64 bit Java werkt alleen op een 64 bit besturingssysteem.
  * Met Java 8, u moet toevoegen `-d64` naar de Tomcat `CATALINA_OPTS` parameter in `setenv.bat` .
  * Met Java 21, u kiest 64 bit Java wanneer u een versie van Java gemarkeerd met "64 bit."

Met 64 bit Java , Tomcat en Java kan zeer hoog gebruiken `-Xmx` en `Xms` instellingen. Hoe meer fysiek geheugen in de server, hoe beter.
Als een simplistische suggestie: wij raden u set `-Xmx` en `Xms` tot (in 'M'egaBytes) tot 1/2 (of minder) van het fysieke geheugen van de computer.
Je kunt zien of Tomcat, Java en ERDDAP™ worden inderdaad uitgevoerd in 64 bit modus door te zoeken naar "bit," in ERDDAP 's Dagelijks verslag e-mail
of in de `bigParentDirectory/logs/ [log.txt](/docs/server-admin/additional-information#log) ` bestand ( `bigParentDirectory` is gespecificeerd in [setup.xml](#setupxml) ) .

#### Afvalverzameling{#garbage-collection} 

* In ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) bestand, zult u veel "GC (Toewijzingsfout) " berichten.
Dit is meestal geen probleem. Het is een frequent bericht van een normaal werkende Java zeggen dat het net klaar is met een klein afval
collectie omdat er geen ruimte meer was in Eden (de afdeling Java berg voor zeer jonge objecten) . Meestal toont het bericht u
   `geheugenUseVoor-&gt;geheugenUseNa` . Als die twee nummers dicht bij elkaar zijn, betekent dat dat de afvalverzameling niet productief was.
Het bericht is slechts een teken van problemen als het zeer frequent (elke paar seconden) , niet productief, en de aantallen zijn groot en niet groeien,
die samen aangeven dat Java heeft meer geheugen nodig, heeft moeite om geheugen vrij te maken, en kan geen geheugen vrijmaken.
Dit kan gebeuren tijdens een stressvolle tijd, ga dan weg. Maar als het aanhoudt, is dat een teken van problemen.
* Als u ziet `Java.lang.OutOfMemoryError` sm ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) bestand,
zie [OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) voor tips over het diagnosticeren en oplossen van de problemen.
         
### Rechten{#permissions} 

*  [Op Linux en Macs, de toegangsrechten wijzigen](#permissions) van alles `*.sh` bestanden in `tomcat/bin/` uitvoerbaar te zijn door de eigenaar:
  ```
  chmod +x *.sh
  ```

### Lettertypen{#fonts} 

*  [Lettertypen voor afbeeldingen:](#fonts) Wij geven de voorkeur aan de gratis [DejaVu-lettertypen](https://dejavu-fonts.github.io/) aan de andere Java lettertypen.
Het gebruik van deze lettertypen is sterk aanbevolen, maar niet vereist.

Als u ervoor kiest om de DejaVu lettertypen niet te gebruiken, moet u het lettertypeFamily instellen in setup.xml veranderen in ` <fontFamily> SansSerif </fontFamily> ` ,
die beschikbaar is met alle Java distributies. Als u ` <fontFamily> ` op de naam van een lettertype dat niet beschikbaar is, ERDDAP™ zal niet laden
en zal een lijst van beschikbare lettertypen afdrukken in de `log.txt` bestand. Je moet zo'n lettertype gebruiken.

Als u ervoor kiest om de DejaVu lettertypen te gebruiken, zorg er dan voor dat de ` <fontFamily> ` instellen in setup.xml is ` <fontFamily> DejaVu Sans </fontFamily> ` .

Om de DejaVu lettertypen te installeren, kunt u downloaden [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522.795 bytes, MD5=33E1E61FA406A547851ED308B4FFEF42) 
en rits de lettertypebestanden naar een tijdelijke map.

  * Op Linux:
    * Voor Linux Adoptionium Java distributies, zie [deze instructies](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Met andere Java distributies: Als de `kat` gebruiker, kopieer de lettertypebestanden in `$JAVA_HOME/lib/fonts` dus Java kan de lettertypen te vinden.
Vergeet niet: als / wanneer u later upgrade naar een nieuwere versie van Java Je moet deze lettertypen opnieuw installeren.
  * Op Macs: voor elk lettertypebestand, dubbelklik erop en klik vervolgens op Lettertype installeren.
  * Op Windows 7 en 10: in Windows Explorer, selecteer alle lettertypebestanden. Rechter muisklik. Klik op Installeren.
             
### Test Tomcat{#test-tomcat} 

* Test uw Tomcat installatie.
  * Linux:
    * Als gebruiker "tomcat" uitvoeren `Tomcat/bin/startup.sh` .
    * Bekijk uw URL + ":8080" in uw browser (bv. [ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (tomcat uitvoeren als systeembeheerder gebruiker) :
    * Uitvoeren `Tomcat/bin/startup.sh` .
    * Bekijk uw URL + ":8080" in uw browser (bv. [ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Merk op dat uw Tomcat standaard alleen toegankelijk is voor u. Het is niet openbaar toegankelijk.
  * Windows localhost:
    * Klik met de rechtermuisknop op het Tomcat-pictogram in het systeemvak en kies "Startservice."
    * Beeld [ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/) , of [ http://localhost:8080/ ](http://localhost:8080/) , in uw browser. Merk op dat uw Tomcat standaard alleen toegankelijk is voor u. Het is niet openbaar toegankelijk.

Je zou de Tomcat "Gefeliciteerd" pagina moeten zien.

Als er problemen zijn, zie het Tomcat log bestand op `tomcat/logs/catalina.out` .

### Problemen met de Tomcat installatie?{#troubles-with-the-tomcat-installation} 

* Op Linux en Mac, als je Tomcat niet kunt bereiken of ERDDAP™   (of misschien kun je ze gewoon niet bereiken vanaf een computer buiten je firewall) ,
U kunt testen of Tomcat luistert naar poort 8080, door te typen (als root) op een commandoregel van de server:

  ```
  netstat -tuplen | grep 8080
  ```

Dat zou een regel terug moeten geven met zoiets als:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (waarbij `#` is een cijfer) , waaruit blijkt dat a `java` proces (Waarschijnlijk Tomcat.) is luisteren op poort "8080" voor "tcp" verkeer.
Als er geen regels werden teruggegeven, als de teruggekregen lijn aanzienlijk anders is, of als er twee of meer lijnen werden teruggegeven, dan kan er een probleem zijn met de poortinstellingen.

* Zie het Tomcat-logbestand `tomcat/logs/catalina.out` . Tomcat problemen en sommige ERDDAP™ Opstartproblemen worden daar bijna altijd aangegeven.
Dit komt vaak voor bij de eerste instelling ERDDAP™ .

* Zie [Tomcat](https://tomcat.apache.org/) website of doorzoek het web voor hulp, maar laat ons weten welke problemen je had en welke oplossingen je hebt gevonden.

* Zie onze [sectie over het krijgen van extra ondersteuning](/docs/intro#support) .
             
###  ERDDAP™ Inhoud{#erddap-content} 
3.   [Stel de `tomcat/content/erdap` configuratiebestanden.](#erddap-content) 
Op Linux, Mac en Windows, downloaden [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip) 
en rits het los in de `kat` map, aanmaken `tomcat/content/erdap` .

__Versie 1.0.1, 20683 bytes, MD5=98a8099e7e674da59fe35e9c96efa7b5, gedateerd 2025-06-02__

Enkele eerdere versies zijn ook beschikbaar:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, gedateerd 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, gedateerd 2022-02-16) 
    *  [2,21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, gedateerd 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, gedateerd 2022-12-08) 
    *  [2,23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, gedateerd 2023-02-27) 

#### Andere map{#other-directory} 

Voor Red Hat Enterprise Linux (RHEL) of voor andere situaties waarbij u de Tomcat-map niet mag wijzigen of waar u wilt/nodig
om de ERDDAP™ inhoud directory in een andere locatie om een andere reden (bijvoorbeeld als je Jetty gebruikt in plaats van Tomcat) ,
unzip `erddapContent .zip ` in de gewenste map (waarbij alleen de `kat` gebruiker heeft toegang) en stel de ` erddapContentDirectory ` systeemeigenschap
 (bv. ` erddapContentDirectory  =~tomcat/content/erddap ` ) dus ERDDAP™ kan deze nieuwe inhoud directory vinden.

### setup.xml{#setupxml} 

*  [Lees de opmerkingen in `tomcat/content/erddap/setup.xml` ](#setupxml) en de gevraagde wijzigingen aanbrengen. setup.xml is het bestand met alle instellingen die aangeven hoe uw ERDDAP™ Gedraag je.

Voor de eerste setup moet u tenminste deze instellingen wijzigen:
      *  ` <bigParentDirectory> ` 
      *  ` <emailEverythingTo> ` 
      *  ` <baseUrl> ` 
      *  ` <email...> ` instellingen
      *  ` <admin...> ` instellingen
      *  ` <baseHttpsUrl> `   (wanneer u het opzetten https ) 

Wanneer u de bigParentDirectory aanmaakt, vanuit de oudermap van bigParentDirectory:

    * Maak de `kat` gebruiker de eigenaar van de `bigParentDirectory` :
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Wijzig de "groep" naar Tomcat, uw gebruikersnaam of de naam van een kleine groep die Tomcat en alle beheerders van Tomcat omvat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Toestemmingen wijzigen zodat Tomcat en de groep rechten hebben gelezen, geschreven, uitgevoerd:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Verwijder "andere" gebruikersrechten om te lezen, te schrijven of uit te voeren. Dit is belangrijk om te voorkomen dat mogelijk gevoelige informatie wordt gelezen
in ERDDAP™ log bestanden en bestanden met informatie over privé datasets.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Omgevingsvariabelen{#environment-variables} 

Beginnen met ERDDAP™ v2.13, ERDDAP™ beheerders kunnen elke waarde in setup.xml overschrijven door een omgevingsvariabele op te geven
genaamd ` ERDDAP _Waardenaam` voor het draaien ERDDAP™ . Bijvoorbeeld, gebruik ` ERDDAP _BaseUrl` overschrijft de ` <baseUrl> ` waarde.
Dit kan handig zijn bij het implementeren ERDDAP™ met een container als Docker, zoals u standaard instellingen in setup.xml kunt zetten
en leveren dan speciale instellingen via omgevingsvariabelen. Als u geheime informatie aan ERDDAP™ via deze methode,
Controleer of de informatie geheim blijft. ERDDAP™ slechts eenmaal per opstarten omgevingsvariabelen leest;
in de eerste seconde van opstarten, dus een manier om dit te gebruiken is: stel de omgevingsvariabelen in, start ERDDAP ,
wacht tot ERDDAP™ wordt gestart en de omgevingsvariabelen worden uitgeschakeld.

###  datasets.xml  {#datasetsxml} 

* Lees de opmerkingen in [ **Werken met de datasets.xml Bestand** ](/docs/server-admin/datasets) . Later, nadat je ERDDAP™ draait
voor de eerste keer (meestal met alleen de standaard datasets) , zul je de XML in `tomcat/content/erdap/ datasets.xml ` 
om alle datasets te specificeren die u wilt ERDDAP™ Om te dienen. Hier zul je het grootste deel van je tijd doorbrengen.
tijdens instellen ERDDAP™ en later met behoud van uw ERDDAP™ .

U kunt een voorbeeld zien [ datasets.xml op GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Onwaarschijnlijk) Nu of (iets waarschijnlijker) in de toekomst, als je erddap's CSS-bestand wilt wijzigen, kopieer
   `tomcat/content/erddap/images/erddapStart2.css` tot `tomcat/content/erddap/image/erddap2.css` En dan veranderen.
Wijzigingen in `erddap2.css` alleen van kracht worden wanneer ERDDAP™ wordt herstart en vereisen vaak ook de gebruiker om de gecachede bestanden van de browser te wissen.
     
 ERDDAP™ werkt niet correct als de setup.xml of datasets.xml bestand is geen goed gevormd XML bestand. Dus, nadat je deze bestanden hebt bewerkt,
het is een goed idee om te controleren of het resultaat goed gevormd XML is door de XML tekst in een XML checker te plakken zoals [xmlvalidatie](https://www.xmlvalidation.com/) .
     
### Installeer de erddap. war-bestand{#install-the-erddapwar-file} 

4. Op Linux, Mac en Windows, __downloaden [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) Naar binnen `tomcat/webapps` :

__Versie 2.29,0, 706,788,135 bytes, MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560, gedateerd 12-15-2025__

Het .war bestand is groot omdat het hoge resolutie kustlijn, grens, en hoogte gegevens die nodig zijn om kaarten te maken bevat.

Sommige eerdere versies zijn ook beschikbaar.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, gedateerd 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069.844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, gedateerd 2022-02-23) 
   *  [2,21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDBD519B6, gedateerd 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742.765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, gedateerd 2022-12-08) 
   *  [2,23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, gedateerd 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, gedateerd 2024-06-07) 
   *  [2,25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, gedateerd 2024-11-07) 
   *  [2,26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bytes, MD5=99a725108b37708e5420986c1616a119, gedateerd 2025-03-31) 
   *  [2,27,0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620.554.403 bytes, MD5=3b2086c659ee4145ca2dff447bf4ef7, gedateerd 2025-06-11) 
   *  [2.28,1](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war)   (622,676,238 bytes, MD5=48b4226045f950c8a8d69ef9521b9bc9, gedateerd 2025-09-05) 

### Proxy instellen (specifieke inzet)  {#proxy} 

 ERDDAP™ wordt meestal ingezet achter een webserver omgekeerde proxy om het te kunnen worden bediend op standaard HTTP poorten (80 en 443) .
SSL/TLS termination wordt vaak ook aan de proxylaag van de webserver gekoppeld. De specifieke kenmerken hangen af van de eisen van elke inzet.

#### Apache{#apache} 

1. Zorg ervoor dat `_Wijzigen` en `mod_proxy_ http ` geladen zijn:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Het bestaande wijzigen ` <VirtualHost> ` label (als er één is) , of voeg er een toe aan het einde van het bestand:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Als ERDDAP™ wordt gediend op een ander pad dan `/erdap` , zet ook de `X-Forwarded-prefix` kop naar de
padsegment _voor_ `/erdap` . Deze vaststelling zou geschikt zijn voor een ERDDAP™ gedagvaard te
 `/subpad/erdap` :

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Herstart dan Apache: `/usr/sbin/apachectl -k sierlijk`   (maar soms is het in een andere map) .
         
#### NGINX{#nginx} 

Stel in het nginx configuratiebestand deze headers in:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Als ERDDAP™ wordt gediend op een ander pad dan `/erdap` , zet ook de `X-Forwarded-prefix` kop naar de
padsegment _voor_ `/erdap` . Deze vaststelling zou geschikt zijn voor een ERDDAP™ gedagvaard te
 `/subpad/erdap` :

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Om NGINX en ERDDAP™ correct werken met https , moet u het volgende knipsel in de Tomcat server.xml ` <Host> ` blok:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Tomcat starten{#start-tomcat} 

*  (Ik raad het gebruik van de Tomcat Web Application Manager niet aan. Als je Tomcat niet volledig afsluit en opstart, heb je vroeg of laat problemen met PermGen geheugen.) 
*  (In Linux of Mac OS, als je een speciale gebruiker hebt gemaakt om Tomcat uit te voeren, bijvoorbeeld, Tomcat, vergeet niet om de volgende stappen als die gebruiker te doen.) 
* Als Tomcat al draait, sluit Tomcat af met (in Linux of Mac OS)   `Tomcat/bin/shutdown.sh` 
of (in vensters)   `Tomcat\bin\\ shutdown.bat ` 

Gebruik op Linux `ps -ef | greptomcat` voor en na `afsluiten. sh` om ervoor te zorgen dat het Tomcat proces is gestopt.
Het proces moet vóór het afsluiten worden vermeld en uiteindelijk niet na het afsluiten.
Het kan een minuut of twee duren voor ERDDAP™ om volledig te sluiten. Wees geduldig. Of als het erop lijkt dat het niet vanzelf stopt, gebruik dan:
   `doden -9 <processID> ` 
* Tomcat starten met (in Linux of Mac OS)   `Tomcat/bin/startup.sh` of (in vensters)   `tomcat\bin\\startup.bat` 

## Is ERDDAP™ Rennen?{#is-erddap-running} 

Gebruik een browser om te proberen te bekijken http://www.YourServer.org/erddap/status.html.
 
 ERDDAP™ start zonder datasets geladen. Datasets worden geladen in een achtergrond thread en zo worden beschikbaar een-voor-een.

### Problemen oplossen{#troubleshooting} 

* Wanneer een verzoek van een gebruiker binnenkomt, gaat het naar Apache (op Linux en Mac OS computers) Dan Tomcat. ERDDAP™ .
* Je kunt zien wat er naar Apache gaat. (en gerelateerde fouten) in de Apache log bestanden.
*    [Jij](/docs/server-admin/additional-information#tomcat-logs) kan zien wat er met Tomcat gebeurt (en gerelateerde fouten) 
in de Tomcat-logbestanden ( `tomcat/logs/catalina.out` en andere bestanden in die map) .
*    [Jij](/docs/server-admin/additional-information#log) kan zien wat er gaat gebeuren ERDDAP , diagnoseboodschappen van ERDDAP ,
en foutmeldingen van ERDDAP In de ERDDAP™   ` <bigParentDirectory> /logs/log.txt` bestand.
* Tomcat start niet ERDDAP™ Totdat Tomcat een verzoek krijgt voor ERDDAP™ . Zodat je kunt zien in de Tomcat log bestanden als het
gestart ERDDAP™ of als er een foutmelding met betrekking tot die poging.
* Wanneer ERDDAP™ begint, het hernoemt de oude ERDDAP™ log.txt-bestand ( `logarchiefAt <CurrentTime> .txt` ) en maakt een nieuw log.txt bestand aan.
Dus als de `log.txt` bestand is oud, het is een teken dat ERDDAP™ is niet onlangs herstart. ERDDAP™ schrijft log info naar een buffer
en schrijft alleen de buffer regelmatig naar het logbestand, maar u kunt forceren ERDDAP™ om de buffer naar het logbestand te schrijven door te bezoeken
     ` /erddap/status.html ` .

### Problemen: Oude versie van Java  {#trouble-old-version-of-java} 

Als u een versie van Java Dat is te oud voor ERDDAP , ERDDAP™ zal niet uitvoeren en u ziet een foutmelding in Tomcat's log bestand zoals

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

De oplossing is het bijwerken van de meest recente versie van Java En zorg ervoor dat Tomcat het gebruikt.

### Problemen: Traag opstarten eerste keer{#trouble-slow-startup-first-time} 

Tomcat moet veel werk doen de eerste keer dat een toepassing als ERDDAP™ wordt gestart; met name moet het uitpakken van de `erddap.war` bestand
 (Dat is als een .zip bestand) . Op sommige servers, de eerste poging om te bekijken ERDDAP™ stalletjes (30 seconden?) Totdat dit werk klaar is.
Op andere servers zal de eerste poging onmiddellijk mislukken. Maar als je 30 seconden wacht en het opnieuw probeert, zal het slagen als ERDDAP™ correct is geïnstalleerd.

Hier is geen oplossing voor. Dit is gewoon hoe Tomcat werkt. Maar het gebeurt alleen de eerste keer nadat u een nieuwe versie van ERDDAP™ .

## Afsluiten en herstarten{#shut-down-and-restart} 

In de toekomst, te sluiten (en herstart)   ERDDAP™ , zie [Hoe te afsluiten en opnieuw te starten Tomcat en ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Problemen?{#trouble} 

Problemen met de installatie van Tomcat of ERDDAP™ ? Zie onze [sectie over het krijgen van extra ondersteuning](/docs/intro#support) .

## E-mail Kennisgeving van nieuwe versies van ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Als u een e-mail wilt ontvangen wanneer een nieuwe versie van ERDDAP™ beschikbaar is of andere belangrijke ERDDAP™ aankondigingen;
U kunt deelnemen aan de ERDDAP™ aankondigingenlijst [Hier.](https://groups.google.com/g/erddap-announce) . Deze lijst is gemiddeld ongeveer één e-mail per drie maanden.

## Aanpassen{#customize} 

*  [Pas uw ERDDAP™ om uw organisatie te markeren (niet NOAA   ERD ) .](#customize) 
* Wijzig de banner die bovenaan verschijnt ERDDAP™ .html pagina's door het bewerken van de ` <startBodyHtml5> ` tag in uw ` datasets.xml ` bestand.
(Als er geen is, kopieer de standaard van ERDDAP™ 's `tomcat/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` bestand
in ` datasets.xml ` en bewerken.) Bijvoorbeeld:
  * Een andere afbeelding gebruiken (Het logo van uw organisatie) .
  * Verander de achtergrondkleur.
  * Wijziging " ERDDAP™ " naar "Uw organisatie" ERDDAP™ "
  * Wijzig "Gemakkelijker toegang tot wetenschappelijke gegevens" in "Gemakkelijker toegang tot _Uw organisatie_'s gegevens."
  * Wijzig de "Breed to you by" links om links te zijn naar uw organisatie en financieringsbronnen.
* Wijzig de informatie aan de linkerkant van de startpagina door het bewerken van de ` <theShortDescriptionHtml> ` tag in uw ` datasets.xml ` bestand.
(Als er geen is, kopieer de standaard van ERDDAP™ 's `tomcat/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` bestand
in ` datasets.xml ` en bewerken.) Bijvoorbeeld:
  * Beschrijf wat uw organisatie en/of groep doet.
  * Beschrijf welke gegevens dit is ERDDAP™ heeft.
  * Om het pictogram dat verschijnt op de browsertabbladen te wijzigen, zet u de favicon van uw organisatie. ico in `Tomcat/content/erddap/image/` .
Zie https://en.wikipedia.org/wiki/Favicon.
 
