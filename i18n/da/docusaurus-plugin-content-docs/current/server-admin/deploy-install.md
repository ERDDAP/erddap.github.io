---
sidebar_position: 1
---

# Installer installation
Sådan gør du den første opsætning af ERDDAP™ på din server

 ERDDAP™ kan køre på enhver server, der understøtter Java og Tomcat (og andre applikationsservere som Jetty, men vi understøtter ikke dem) .
 ERDDAP™ er blevet testet på Linux (herunder på Amazon's AWS) , Mac og Windows-computere.

*  **Docker** -- Vi leverer [ ERDDAP™ i en Docker-container](https://hub.docker.com/r/erddap/erddap) 
og IOOS tilbyder nu et tilbud [Hurtig startguide til ERDDAP™ i en Docker Container](https://ioos.github.io/erddap-gold-standard/index.html) .
Det er standarden ERDDAP™ installation, i en Docker beholder.
Gennem Docker Vi tilbyder nemme måder at opsætte ssl og overvåge, læse mere på [Docker dokumentation](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Hvis du allerede bruger Docker, vil du sandsynligvis foretrække Docker-versionen.
Hvis du leder efter at køre på cloud-tjenester, vil du sandsynligvis foretrække Docker-versionen.
*  **Amazon Amazon** -- Hvis du installerer ERDDAP™ på en Amazon Web Services EC2-instans, se dette [Oversigt over Amazon Web Services](/docs/server-admin/additional-information#amazon) først.
*  **Linux og Macs** -- ERDDAP™ virker fantastisk på Linux og Mac-computere. Se vejledningen nedenfor.
*  **Windows Windows Windows** -- Windows er fint til test ERDDAP™ og til personlig brug (Se vejledningen nedenfor) ,
men vi anbefaler ikke at bruge det til offentligheden ERDDAP™ implementeringer. Løb ERDDAP™ på Windows kan have problemer:
særligt, ERDDAP™ kan ikke slette og/eller omdøbe filer hurtigt. Dette skyldes sandsynligvis antivirus software
   (f.eks. fra McAfee og Norton) som kontrollerer filerne til virus. Hvis du kører ind i dette problem
(som kan ses af fejlmeddelelser i [log.txt](/docs/server-admin/additional-information#log) fil lignende
"Tilgængelig for at slette ..."), ændring af antivirussoftwarens indstillinger kan delvist lindre problemet. Eller overveje at bruge en Linux- eller Mac-server i stedet.

 **Standard ERDDAP™ installationsinstruktioner for Linux, Macs og Windows-computere er:** 

0. Sørg for, at eventuelle afhængigheder er installeret. På ikke-Windows maskiner (Linux og Mac) , du behøver csh.

##  Java  {#java} 

1.  [For For For For For ERDDAP™ v2.29.0+, sæt op Java 25.](#java) 
Af sikkerhedsmæssige årsager er det næsten altid bedst at bruge den nyeste version af Java 25.
Download og installer den nyeste version af
    [Adoptiums OpenJDK (Temurin) 25 (LTS) ](https://adoptium.net/temurin/releases/?version=25) .
For at kontrollere installationen, køre `/javaJreBinDirectory/java -version` f.eks.
    `/usr/local/jdk-25.0.1+8/jre/bin/java -version` .

    ERDDAP™ arbejder med Java fra andre kilder, men vi anbefaler Adoptium, fordi det er den vigtigste, fællesskabsstøttet,
Gratis gratis (som i øl og tale) version af Java 25, der tilbyder Long Term Support (gratis opgraderinger i mange år tidligere den første udgivelse) .
Af sikkerhedsmæssige årsager, bedes du opdatere din ERDDAP 's version af Java periodisk som nye versioner af Java 25 bliver tilgængelig fra Adoptium.

    ERDDAP™ er blevet testet og brugt i vid udstrækning med 25, ikke andre versioner. Af forskellige grunde tester vi ikke med eller understøtter andre versioner af Java .
     
## Tomcat{#tomcat} 

2.  [Opsæt op](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat er den mest udbredte Java Ansøgningsserver,
som er Java software, der står mellem operativsystemets netværkstjenester og Java serversoftware som ERDDAP™ .
Det er gratis og Open Source software (FOSS) .

Du kan bruge en anden Java Ansøgning Server (f.eks. Jetty) , men vi tester kun med og støtte Tomcat.

   * Hent Tomcat og udpakning det på din server eller pc.
Af sikkerhedsmæssige årsager er det næsten altid bedst at bruge den nyeste version af Tomcat 10 (version 9 og nedenfor er ikke acceptabel) 
som er designet til at arbejde med Java 25 eller nyere. Nedenfor vil Tomcat-mappen blive henvist til som `Tomcat` .

__Warning&#33;__ Hvis du allerede har en Tomcat, der kører nogle andre webapplikationer (særligt særligt) , vi anbefaler, at du installerer ERDDAP™ i in in in in
      [Et andet Tomcat](/docs/server-admin/additional-information#second-tomcat) , fordi ERDDAP™ behov for forskellige Tomcat indstillinger
og bør ikke konkurrere med andre programmer til hukommelse.

     * På Linux, [Download "Core" "tar .gz " Tomcat distribution](https://tomcat.apache.org/download-10.cgi) og udpakning det.
Vi anbefaler at pakke det i `/usr/lokal` .
     * På en Mac, Tomcat er sandsynligvis allerede installeret i `/Library/Tomcat` , men skal opdatere det til den nyeste version af Tomcat 10.
Hvis du downloader det, [Download "Core" "tar .gz " Tomcat distribution](https://tomcat.apache.org/download-10.cgi) og udpakning det i `/Library/Tomcat` .
     * På Windows, kan du [Download "Core" "zip" Tomcat distribution](https://tomcat.apache.org/download-10.cgi) 
        (som ikke roder med Windows-registreringsdatabasen, og som du styrer fra en DOS-kommandolinje) og udpakning det i en passende mappe.
        (Til udvikling bruger vi "Core" "zip" distribution. Vi laver en `/ programmer` mappe og pakke det der.) 
Eller du kan downloade "Core" "64-bit Windows zip" distribution, som indeholder flere funktioner.
Hvis distributionen er en Windows-installation, vil den sandsynligvis sætte Tomcat i, for eksempel, `/Program Files/apache-tomcat-10.0.23` .
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - I te `tomcat/conf/server.xml` fil, der er to ændringer, du skal foretage for hver af de to ` <Connector> ` tags
   (en til en `&lt;Connector port Scope8080"` og en til `&lt;Conector port Hanging8443"` ) .
   1.  (Anbefalet anbefalet) Forøgelse af `Tilslutningstilslutning Timeout` parameterværdi, måske til 300000 (millisekunder, som er 5 minutter) .
   2.  (Anbefalet anbefalet) Tilføj en ny parameter: `Tilbage til kortet[] | " " " "` . Dette er valgfrit og lidt mindre sikker,
Men fjerner behovet for brugere til procentkode disse tegn, når de forekommer i parametrene for en brugerkonto.
             
### indhold.xml{#contentxml} 

* kontekst.xml -- Ressourcer cache - I `tomcat/conf/context.xml` , lige før det ` </Context> ` Mærke, ændre Ressourcer tag
   (eller tilføje det, hvis det ikke allerede er der) for at indstille cachen MaxSize parameter til 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Dette undgår mange advarsler i katalina. ud af, at alle starter med
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeout{#apache-timeout} 

* På Linux-computere skal du ændre indstillingerne for Apache timeout, så tidskrævende brugeranmodninger ikke timeout
   (med hvad der ofte vises som en "Proxy" eller "Bad Gateway" fejl) . Som root-brugeren:
  * Rediger Apache ` http d.conf` filfil (normalt i `/etc / http d/konference/` ) :
    * Ændre de eksisterende ` <Timeout> ` indstilling af indstilling (eller tilføje en i slutningen af filen) til 3600 (sekunder sekunder) , i stedet for standard 60 eller 120 sekunder.
    * Ændre de eksisterende ` <ProxyTimeout> ` indstilling af indstilling (eller tilføje en i slutningen af filen) til 3600 (sekunder sekunder) , i stedet for standard 60 eller 120 sekunder.
  * Genstart Apache: `/usr/sbin/apachectl -k yndefuld`   (Men nogle gange er det i en anden mappe) .

### Sikkerhed for sikkerhed{#security} 
         
* Sikkerheds anbefaling: Se endnu [disse instruktioner](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) for at øge sikkerheden af
Din Tomcat installation, især for offentlige servere.
         
* Til offentligheden ERDDAP™ installationer på Linux og Macs, det er bedst at opsætte Tomcat (programmet) som tilhører brugeren `Tomcat` 
   (en separat bruger med begrænsede tilladelser og hvilke [Ingen adgangskode](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Således kan kun superbrugeren skifte til at handle som bruger `Tomcat` . Dette gør det umuligt for hackere at logge ind på din server som bruger `Tomcat` .
Og i alle tilfælde skal du gøre det så `Tomcat` Brugeren har meget begrænsede tilladelser på serverens filsystem (læs+writing + eksekverbare privilegier
for te `apache-tomcat` mappetræ og ` <bigParentDirectory> ` og læs kun rettigheder til mapper med data, der ERDDAP™ behov for adgang til).
  * Du kan oprette dig `Tomcat` brugerkonto (som ikke har nogen adgangskode) ved at bruge kommandoen:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Du kan skifte til at arbejde som bruger `Tomcat` ved at bruge kommandoen
    ```
    sudo su - tomcat
    ```
     (Det vil bede dig om superbruger adgangskode for tilladelse til at gøre dette.) 
    * Du kan stoppe med at arbejde som bruger tomcat ved at bruge kommandoen
    ```
    exit
    ````
    * De fleste af resten af Tomcat og ERDDAP™ setup instruktioner som bruger `Tomcat` . Senere, køre den `opstart.sh` og og og `nedlukning. sh sh` scripts som bruger `Tomcat` 
så Tomcat har tilladelse til at skrive til sine log filer.
    * Efter at have pakket Tomcat, fra forælderen af `apache-tomcat` Katalog:
      * Ændre ejerskab af apache-tomcat-mappens træ til brugeren.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (men erstatte det faktiske navn på din tomcat mappe) .
      * Ændre "gruppen" for at være tomcat, dit brugernavn eller navnet på en lille gruppe, der indeholder tomcat og alle administratorer af Tomcat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Ændre tilladelser, så tomcat og gruppen har læst, skrive, udføre privilegier:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Fjern "andre" brugerens tilladelser til at læse, skrive eller udføre:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Dette er vigtigt, fordi det forhindrer andre brugere i at læse muligvis følsomme oplysninger i ERDDAP™ Opsætning af filer.

### Hukommelseshukommelse{#memory} 

Sæt Tomcats miljøvariabler

* På Linux og Macs:
Opret en fil `tomcat/bin/setenv.sh`   (eller i Red Hat Enterprise Linux \\[ RHEL \\] , redigere `~tomcat/conf/tomcat10.conf` ) at indstille Tomcats miljøvariabler.
Denne fil vil blive brugt af `tomcat/bin/startup.sh` og og og `nedlukning. sh sh` . Filen skal indeholde noget som:
  ```
  export JAVA_HOME=/usr/local/jdk-25.0.1+8
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (men erstatning af mappenavne fra din computer) .
   (Hvis du tidligere har indstillet `JRE_HOME` , du kan fjerne det.) 
På Macs, behøver du sandsynligvis ikke at indstille `JAVA_HOME` .

* På Windows:
Opret en fil `Tomcat\bin\\setenv.bat` at indstille Tomcats miljøvariabler.
Denne fil vil blive brugt af `tomcat\bin\\startup.bat` og og og ` shutdown.bat ` .
Filen skal indeholde noget som:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-25.0.1+8"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (men erstatning af mappenavne fra din computer) .
Hvis dette kun er for lokal test, skal du fjerne "-server".
   (Hvis du tidligere har indstillet `JRE_HOME` , du kan fjerne det.) 

The The The The The The The `-Xmx` og og og `-Xms` hukommelsesindstillinger er vigtige, fordi ERDDAP™ virker bedre med mere hukommelse.
Altid indstillet `-Xms` til samme værdi som `-Xmx` .

* Til 32 bit operativsystemer og 32 bit Java :
64 bit Java er meget bedre end 32 bit Java , men 32 bit Java vil arbejde så længe serveren ikke er virkelig optaget.
Jo mere fysisk hukommelse i serveren jo bedre: 4+ GB er virkelig god, 2 GB er okay, mindre anbefales ikke.
Med 32 bit Java , selv med rigelig fysisk hukommelse, Tomcat og Java Kør ikke, hvis du forsøger at indstille `-Xmx` langt over 1500M (1200M på nogle computere) .
Hvis din server har mindre end 2 GB hukommelse, skal du reducere hukommelsen `-Xmx` værdiværdiværdiværdi (i 'M'egaBytes) til 1/2 af computerens fysiske hukommelse.

* Til 64 bit Betjeningssystemer og 64 bit Java :
64 bit Java vil kun arbejde på et 64 bit operativsystem.
  * Med Java 8, du skal tilføje `-d64` til Tomcat `CATALINA_OPTS` parameter i `Setenv.bat` .
  * Med Java 21, du vælger 64 bit Java når du downloader en version af Java markeret "64 bit".

Med 64 bit Java , Tomcat og Java kan bruge meget høj `-Xmx` og og og `-Xms` Indstillinger. Jo mere fysisk hukommelse i serveren jo bedre.
Som et forenklet forslag: Vi anbefaler, at du indstiller `-Xmx` og og og `-Xms` til at til (i 'M'egaBytes) til 1/2 (eller mindre) af computerens fysiske hukommelse.
Du kan se, om Tomcat, Java , og ERDDAP™ kører faktisk i 64 bit mode ved at søge efter " bit", i ERDDAP 's Daily Report e-mail
eller i området `bigParentDirectory/logs/logs [log.txt](/docs/server-admin/additional-information#log) ` filfil ( `bigParentDirectory` er angivet i [opsætning.xml](#setupxml) ) .

#### Billeder af Garbage Collection{#garbage-collection} 

* I nærheden af In In In In In In In In In In In In In In ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fil, vil du se mange "GC (Ombygning Failure) " beskeder.
Dette er normalt ikke et problem. Det er en hyppig meddelelse fra en normalt drift Java at sige, at det bare er afsluttet et mindre affald
samling, fordi det løb ud af rummet i Eden (Afsnittet i Java hanap for meget unge genstande) . Normalt vises beskeden
   `hukommelseBrug før-&gt;memoryBrug efter` . Hvis disse to tal er tæt sammen, betyder det, at affaldsopsamlingen ikke var produktiv.
Meddelelsen er kun et tegn på problemer, hvis det er meget hyppig (hvert par sekunder) , ikke produktive, og tallene er store og ikke voksende,
som tilsammen angiver, at Java kræver mere hukommelse, kæmper for at frigøre hukommelse, og er ikke i stand til at frigøre hukommelse.
Det kan ske under en stressende tid, så gå væk. Men hvis det fortsætter, det er et tegn på problemer.
* Hvis du ser `Klik her for at få flere oplysninger.` s i s ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fil,
Se se [FjerneMemoryFejl](/docs/server-admin/additional-information#outofmemoryerror) for tips om, hvordan du diagnosticerer og løser problemerne.
         
### Tilladelser{#permissions} 

*  [På Linux og Macs skal du ændre tilladelser](#permissions) af alle `*.sh` filer i filer i `Tomcat/bin/` at være eksekverbar af ejeren:
  ```
  chmod +x *.sh
  ```

### Skrifttyper{#fonts} 

*  [Skrifttyper til billeder:](#fonts) Vi foretrækker stærkt den gratis [DejaVu skrifttyper](https://dejavu-fonts.github.io/) til den anden Java skrifttyper.
Brug af disse skrifttyper anbefales stærkt, men ikke påkrævet.

Hvis du vælger ikke at bruge DejaVu-skrifttyper, skal du ændre skriftfamilieindstillingen i opsætning.xml til ` <fontFamily> I nærheden af SansSerif </fontFamily> ` ,
som er tilgængelig med alle Java distributioner. Hvis du indstiller ` <fontFamily> ` til navnet på en skrifttype, der ikke er tilgængelig, ERDDAP™ Må ikke indlæse
og vil udskrive en liste over tilgængelige skrifttyper på listen `log.txt` fil. Du skal bruge en af disse skrifttyper.

Hvis du vælger at bruge DejaVu-skrifttyperne, skal du sørge for, at ` <fontFamily> ` konfiguration.xml er ` <fontFamily> Flyrejser til Sans </fontFamily> ` .

For at installere DejaVu-skrifttyper, skal du downloade [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
og indpakke skriftfilerne til en midlertidig mappe.

  * På Linux:
    * Til Linux Adoptium Java distributioner, se [disse instruktioner](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Med andre Java Fordelinger: Som det `Tomcat` Bruger, kopiere skriftfilerne til `$JAVA_HOME/lib/fonts` så så sådan Java kan finde skrifttyperne.
Husk: hvis/ når du senere opgraderer til en nyere version af Java , du skal geninstallere disse skrifttyper.
  * På Macs: for hver skriftfil, dobbelt klik på det, og klik derefter på Installer Font.
  * På Windows 7 og 10: I Windows Explorer skal du vælge alle skriftfiler. Højreklik. Klik på Installer.
             
### Test Tomcat{#test-tomcat} 

* Test din Tomcat installation.
  * Linux:
    * Som bruger "tomcat", kører `tomcat/bin/startup.sh` .
    * Se din URL + ":8080/" i din browser (fx, [ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac Mac Mac Mac (Kør tomcat som systemadministratorens bruger) :
    * Løb `tomcat/bin/startup.sh` .
    * Se din URL + ":8080/" i din browser (fx, [ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Bemærk, at din Tomcat som standard kun er tilgængelig af dig. Det er ikke offentligt tilgængeligt.
  * Windows lokalhost:
    * Højreklik på Tomcat-ikonet i systembakken, og vælg "Start service".
    * Udsigt til udsigt [ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/) eller måske [ http://localhost:8080/ ](http://localhost:8080/) , i din browser. Bemærk, at din Tomcat som standard kun er tilgængelig af dig. Det er ikke offentligt tilgængeligt.

Du skal se Tomcat "Congratulations" side.

Hvis der er problemer, se Tomcat-filen på `tomcat/logs/catalina.out` .

### Problemer med Tomcat installation?{#troubles-with-the-tomcat-installation} 

* På Linux og Mac, hvis du ikke kan nå Tomcat eller ERDDAP™   (eller måske kan du bare ikke nå dem fra en computer uden for din firewall) ,
Du kan teste, om Tomcat lytter til port 8080 ved at skrive (som rod) på en kommandolinje af serveren:

  ```
  netstat -tuplen | grep 8080
  ```

Det skal returnere en linje med noget som:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (hvor `# # # #` er nogle digitalisering) , der angiver, at en `java` procesproces (formodentlig Tomcat) lytter på port "8080" til "tcp" trafik.
Hvis der ikke blev returneret linjer, hvis linjen returneres markant anderledes, eller hvis to eller flere linjer blev returneret, kan der være et problem med portindstillingerne.

* Se filen Tomcat `tomcat/logs/catalina.out` . Tomcat problemer og nogle ERDDAP™ opstartsproblemer er næsten altid angivet der.
Dette er almindeligt, når du først opretter op ERDDAP™ .

* Se billederne [Tomcat](https://tomcat.apache.org/) hjemmeside eller søg på nettet for at hjælpe, men lad os vide de problemer, du havde, og de løsninger, du fandt.

* Se vores udvalg [sektion om at få ekstra støtte](/docs/intro#support) .
             
###  ERDDAP™ Indhold Indhold indhold{#erddap-content} 
3.   [Opsæt op af `tomcat / indhold /` konfigurationsfiler.](#erddap-content) 
På Linux, Mac og Windows, download [ErddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip) 
og riv den ind i `Tomcat` mappe, oprettelse `tomcat / indhold /` .

__Version 1.0.1, 20683 bytes, MD5=98a8099e7e674da59fe35e9c96efa7b5, dateret 2025-06-02__

Nogle tidligere versioner er også tilgængelige:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, af 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, af 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bytes, MD5 =E26F62E7A06191EE6868C40B9A29362, af 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bytes, MD5 =E26F62E7A06191EE6868C40B9A29362, af 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bytes, MD5 =E26F62E7A06191EE6868C40B9A29362, dateret 2023-02-27) 

#### Andre mappe{#other-directory} 

Til Red Hat Enterprise Linux (RHEL) eller for andre situationer, hvor du ikke har tilladelse til at ændre Tomcat-mappen, eller hvor du vil/need
at sætte den ERDDAP™ indholdskatalog på en anden grund (for eksempel, hvis du bruger Jetty i stedet for Tomcat) ,
Uzip `ErddapContent .zip ` i den ønskede mappe (til hvilket kun den `Tomcat` Brugeren har adgang) og sæt den ` erddapContentDirectory ` Systemejendom
 (f.eks. ` erddapContentDirectory  =~tomcat/content/erddap ` ) så så sådan ERDDAP™ kan finde denne nye indholdskatalog.

### opsætning.xml{#setupxml} 

*  [Læs kommentarerne i `tomcat/content/erddap/setup.xml` ](#setupxml) og foretage de ønskede ændringer. setup.xml er filen med alle de indstillinger, der angiver, hvordan din ERDDAP™ opfører sig.

For den første opsætning, skal du mindst ændre disse indstillinger:
      *  ` <bigParentDirectory> ` 
      *  ` <emailEverythingTo> ` 
      *  ` <baseUrl> ` 
      *  ` <email...> ` Indstillinger for indstillinger
      *  ` <admin...> ` Indstillinger for indstillinger
      *  ` <baseHttpsUrl> `   (når du opsætter https ) 

Når du opretter bigParentDirectory, fra forældremappen af bigParentDirectory:

    * Gør det `Tomcat` Bruger ejeren af ejeren af `bigParentDirectory` :
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Ændre "gruppen" for at være tomcat, dit brugernavn eller navnet på en lille gruppe, der indeholder tomcat og alle administratorer af Tomcat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Ændre tilladelser, så tomcat og gruppen har læst, skrive, udføre privilegier:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Fjern "andre" brugerens tilladelser til at læse, skrive eller udføre. Dette er vigtigt at forhindre læsning muligvis følsomme oplysninger
i in in in in ERDDAP™ log filer og filer med oplysninger om private datasæt.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Miljøvariabler{#environment-variables} 

Begyndende med ERDDAP™ v2.13, ERDDAP™ Administratorer kan tilsidesætte enhver værdi i opsætning.xml ved at angive en miljøvariable
navngivet navn ` ERDDAP _værdinavn` før løb ERDDAP™ . Brug f.eks. ` ERDDAP _baseUrl` tilsidesætter tilsidesættelsen ` <baseUrl> ` værdi.
Dette kan være praktisk, når du installerer ERDDAP™ med en beholder som Docker, da du kan sætte standardindstillinger i opsætning.xml
og derefter levere særlige indstillinger via miljøvariabler. Hvis du leverer hemmelige oplysninger til ERDDAP™ via denne metode,
Sørg for at kontrollere, at oplysningerne forbliver hemmelige. ERDDAP™ kun læser miljøvariabler én gang pr. opstart,
i første sekund af opstart, så en måde at bruge dette er: sæt miljøvariabler, start ERDDAP ,
Vent frem til ERDDAP™ Startes, og sæt derefter miljøvariablerne.

###  datasets.xml  {#datasetsxml} 

* Læs kommentarerne i [ **Arbejde med arbejdet datasets.xml Filen fil** ](/docs/server-admin/datasets) . Senere, efter du får ERDDAP™ løbeløb
for første gang (Normalt med kun standarddatasæt) , vil du ændre XML i `tomcat / indhold / datasets.xml ` 
for at angive alle de data, du ønsker, ERDDAP™ at tjene. Dette er, hvor du vil bruge mængden af din tid
samtidig med at du indstiller ERDDAP™ og senere samtidig opretholde din ERDDAP™ .

Du kan se et eksempel [ datasets.xml på GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (I modsætning til) Nu eller nu (lidt mere sandsynligt) i fremtiden, hvis du ønsker at ændre erddap's CSS-fil, kopiere
   `tomcat/content/erddap/images/erddapStart2.css` til at til `tomcat/content/erddap/images/erddap2.css` og derefter foretage ændringer til det.
Ændringer til `Erddap2.css` kun tage virkning, når ERDDAP™ genstartes og kræver ofte også brugeren at rydde browserens cachede filer.
     
 ERDDAP™ virker ikke korrekt, hvis opsætningen.xml eller datasets.xml filen er ikke en veldannet XML-fil. Så efter du har redigeret disse filer,
Det er en god ide at bekræfte, at resultatet er veldannet XML ved at indsætte XML-teksten i en XML-tjeker som [xmlvalidation](https://www.xmlvalidation.com/) .
     
### Installer æraen. krig fil{#install-the-erddapwar-file} 

4. På Linux, Mac og Windows, __download [Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) __ ind i `Tomcat/webapps` :

__Version 2.29.0, 706,788,135 bytes, MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560, dateret 12-15-2025__

.war-filen er stor, fordi den indeholder høj opløsning kystlinje, grænse og højdedata, der er nødvendige for at oprette kort.

Nogle tidligere versioner er også tilgængelige.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, af 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, af 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD5=F2CFF893146E932E498FDDBD519B6, af 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, af 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, af 2023-03-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, dateret 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, af 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bytes, MD5=99a725108b37708e5420986c16a119, dateret 202187-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, dateret 2025-06-11) 
   *  [2.28.1](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war)   (622,676,238 bytes, MD5=48b4226045f950c8a8d69ef9521b9bc9, af 2025-09-05) 

### Konfigurer proxy (implementering af specifikke)  {#proxy} 

 ERDDAP™ er typisk indsat bag en webserver reverse proxy for at tillade, at den bliver serveret på standard HTTP-porte (80 og 443) .
SSL/TLS opsigelse er ofte afdøbt på webserver proxy lag samt. Specifikke afhænger af kravene i hver implementering.

#### Apache Apache{#apache} 

1. Sørg for, at `Mod_proxy` og og og `Mod_proxy_ http ` er indlæst:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Ændre den eksisterende ` <VirtualHost> ` tag tag (hvis der er en) , eller tilføj en ved udgangen af filen:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Hvis ERDDAP™ betjenes på en anden vej end `/erddap` , også sæt den `X-Forwarded-Prefix` Overskrift til sidehovedet
stisegment _beDerfor_ `/erddap` . Denne indstilling ville være passende for en ERDDAP™ Der serveres morgenmad på cafeen.
 `/subpath/erddap` :

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Genstart derefter Apache: `/usr/sbin/apachectl -k yndefuld`   (Men nogle gange er det i en anden mappe) .
         
#### NGINX{#nginx} 

I nginx config-filen skal du indstille disse overskrifter:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Hvis ERDDAP™ betjenes på en anden vej end `/erddap` , også sæt den `X-Forwarded-Prefix` Overskrift til sidehovedet
stisegment _beDerfor_ `/erddap` . Denne indstilling ville være passende for en ERDDAP™ Der serveres morgenmad på cafeen.
 `/subpath/erddap` :

```
proxy_set_header X-Forwarded-Prefix /subpath
```


For at få NGINX og ERDDAP™ arbejde korrekt med https , du skal sætte følgende uddrag inde i Tomcat-serveren.xml ` <Host> ` blok:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Start Tomcat{#start-tomcat} 

*  (Jeg anbefaler ikke at bruge Tomcat Web Application Manager. Hvis du ikke er helt lukket og starter Tomcat, før eller senere vil du have PermGen hukommelse problemer.) 
*  (I Linux eller Mac OS, hvis du har oprettet en speciel bruger til at køre Tomcat, f.eks. tomcat, huske at gøre følgende trin som den bruger.) 
* Hvis Tomcat allerede kører, lukkes Tomcat med (i Linux eller Mac OS)   `tomcat/bin/shutdown.sh` 
eller eller eller (I Windows)   `I nærheden af tomcat\bin\\ shutdown.bat ` 

På Linux, brug `ps -ef | Færk tomcat` før og efter `nedlukning. sh sh` for at sikre, at tomcat-processen er stoppet.
Processen skal være opført før nedlukningen og i sidste ende ikke opført efter nedlukningen.
Det kan tage et minut eller to til ERDDAP™ til fuldstændig lukket ned. Vær tålmodig. Eller hvis det ser ud, at det ikke stopper på sin egen, brug:
   `drab -9 <processID> ` 
* Start Tomcat med (i Linux eller Mac OS)   `tomcat/bin/startup.sh` eller eller eller (I Windows)   `tomcat\bin\\startup.bat` 

## Is ERDDAP™ løb?{#is-erddap-running} 

Brug en browser til at forsøge at se http://www.YourServer.org/erddap/status.html.
 
 ERDDAP™ starter op uden datasæt indlæst. Datasets er indlæst i en baggrundstråd og bliver tilgængelige en-by-one.

### Fejlfinding{#troubleshooting} 

* Når en anmodning fra en bruger kommer i, går det til Apache (på Linux og Mac OS-computere) , så Tomcat, så ERDDAP™ .
* Du kan se, hvad der kommer til Apache (og relaterede fejl) i Apache log filer.
*    [Dig](/docs/server-admin/additional-information#tomcat-logs) kan se, hvad der kommer til Tomcat (og relaterede fejl) 
i Tomcat log filer ( `tomcat/logs/catalina.out` og andre filer i denne mappe) .
*    [Dig](/docs/server-admin/additional-information#log) kan se, hvad der kommer til ERDDAP , diagnostiske meddelelser fra ERDDAP ,
og fejlmeddelelser fra ERDDAP , i den ERDDAP™   ` <bigParentDirectory> /logs/log.txt` fil.
* Tomcat starter ikke ERDDAP™ indtil Tomcat får en anmodning om ERDDAP™ . Så du kan se i Tomcat log filer, hvis det er
startede ERDDAP™ eller hvis der er en fejlmeddelelse relateret til dette forsøg.
* Hvornår Hvornår skal man Hvornår ERDDAP™ starter op, det omdøber den gamle ERDDAP™ log.txt-fil ( `Log ind <CurrentTime> .txt` ) og oprette en ny log.txt-fil.
Så hvis det er tilfældet `log.txt` fil er gammel, det er et tegn på, at ERDDAP™ har ikke for nylig genstartet. ERDDAP™ Skriv logoplysninger til en buffer
og skriver kun bufferen til logfilen periodisk, men du kan tvinge ERDDAP™ at skrive bufferen til logfilen ved at besøge
     ` /erddap/status.html ` .

### Trouble: Gamle version af Java  {#trouble-old-version-of-java} 

Hvis du bruger en version af Java det er for gammel til ERDDAP , ERDDAP™ Kør ikke, og du vil se en fejlmeddelelse i Tomcat's logfil som

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Løsningen er at opdatere til den seneste version af Java og sørg for, at Tomcat bruger den.

### Trouble: Slow Startup første gang{#trouble-slow-startup-first-time} 

Tomcat skal gøre en masse arbejde første gang en ansøgning som ERDDAP™ er startet; især, det skal pakke pakken `Erddap.war` filfil
 (som er som en .zip filfil) . På nogle servere, det første forsøg på at se ERDDAP™ boder (30 sekunder?) indtil dette arbejde er færdigt.
På andre servere vil det første forsøg mislykkes med det samme. Men hvis du venter 30 sekunder og prøve igen, vil det lykkes, hvis ERDDAP™ blev installeret korrekt.

Der er ingen fix for dette. Dette er simpelthen, hvordan Tomcat virker. Men det sker kun første gang, efter at du installerer en ny version af ERDDAP™ .

## Luk og genstart{#shut-down-and-restart} 

I fremtiden, for at lukke (og genstart)   ERDDAP™ , se [Sådan lukkes du ned og genstart Tomcat og ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Har du lyst?{#trouble} 

Troubles installation Tomcat eller ERDDAP™ ? Se vores udvalg [sektion om at få ekstra støtte](/docs/intro#support) .

## Email Meddelelse om nye versioner af ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Hvis du vil modtage en e-mail, når en ny version af ERDDAP™ er tilgængelig eller andre vigtige ERDDAP™ meddelelser,
Du kan tilmelde dig ERDDAP™ bekendtgørelser liste [her her](https://groups.google.com/g/erddap-announce) . Denne liste svarer til omtrent én e-mail hver tredje måned.

## Tilpas tilpasning{#customize} 

*  [Tilpas din søgning ERDDAP™ at fremhæve din organisation (Ikke ikke NOAA   ERD ) .](#customize) 
* Ændre det banner, der vises øverst på alle ERDDAP™ .html sider ved at redigere ` <startBodyHtml5> ` tag i din ` datasets.xml ` fil.
(Hvis der ikke er en, skal du kopiere standarden fra ERDDAP™ 's `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` filfil
ind i ` datasets.xml ` og redigere det.) Du kan f.eks.:
  * Brug et andet billede (f.eks. din organisations logo) .
  * Ændre baggrundsfarven.
  * Ændre " ERDDAP™ " til "_DinOrganization_'s ERDDAP™ " " " "
  * Ændre "Easier adgang til videnskabelige data" til "Easier adgang til _DinOrganization_'s data".
  * Du kan ændre links til din organisation og finansieringskilder.
* Ændre oplysningerne på venstre side af startsiden ved at redigere oplysningerne ` <theShortDescriptionHtml> ` tag i din ` datasets.xml ` fil.
(Hvis der ikke er en, skal du kopiere standarden fra ERDDAP™ 's `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` filfil
ind i ` datasets.xml ` og redigere det.) Du kan f.eks.:
  * Beskriv hvad din organisation og/eller gruppe gør.
  * Beskrive, hvilken slags data dette ERDDAP™ har.
  * Hvis du vil ændre ikonet, der vises på browser faner, skal du sætte din organisations favicon. ico in `tomcat/content/erddap/billeder/` .
Se endnu https://en.wikipedia.org/wiki/Favicon.
 
