---
sidebar_position: 1
---

# Installer
Hvordan å gjøre den første oppsett av ERDDAP™ på din server

 ERDDAP™ kan kjøres på enhver server som støtter Java og Tomcat (og andre programservere som Jetty, men vi støtter dem ikke) ..
 ERDDAP™ Har blitt testet på Linux (Inkludert i Amazons AWS) Mac og Windows datamaskiner.

*  **Docker** -- Vi tilbyr [ ERDDAP™ i en Docker-beholder](https://hub.docker.com/r/erddap/erddap) 
IOOS tilbyr nå [Hurtigstartguide for ERDDAP™ i en Docker Container](https://ioos.github.io/erddap-gold-standard/index.html) ..
Det er standarden ERDDAP™ installasjon, i en Docker container.
Gjennom Docker Kombiner vi gir enkle måter å sette opp ssl og overvåking, lese mer på utsiden [Docker dokumentasjon](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) ..
Hvis du allerede bruker Docker, vil du sannsynligvis foretrekke Docker versjonen.
Hvis du ønsker å kjøre på skytjenester vil du sannsynligvis foretrekke Docker-versjonen.
*  **Amazon** -- Hvis du installerer ERDDAP™ på en Amazon Web Services EC2-instans, se dette [Amazon Web Services Oversikt](/docs/server-admin/additional-information#amazon) Først.
*  **Linux og Macs** -- ERDDAP™ Fungerer bra på Linux og Mac datamaskiner. Se instruksjonene nedenfor.
*  **Vinduer** -- Windows er bra for testing ERDDAP™ og til personlig bruk (Se instruksjonene nedenfor) ,
Men vi anbefaler ikke å bruke det til offentlig ERDDAP™ Utdelinger. Kjøring ERDDAP™ På Windows kan det være problemer:
særlig, ERDDAP™ kan være i stand til å slette og/eller omdøpe filer raskt. Dette skyldes sannsynligvis antivirusprogramvare.
   (For eksempel fra McAfee og Norton) som kontrollerer filene for virus. Hvis du løper inn i dette problemet
(som kan ses av feilmeldinger i [log.txt](/docs/server-admin/additional-information#log) fil som
"Ukan ikke slette ..."), endre innstillingene til antivirusprogramvaren kan delvis lindre problemet. Eller vurdere å bruke en Linux eller Mac-server i stedet.

 **Standarden ERDDAP™ installasjonsanvisninger for Linux, Macs og Windows-datamaskiner er:** 

0. Sørg for at alle avhengigheter er installert. På ikke-Windows maskiner (Linux og Mac) Du trenger csh.

##  Java  {#java} 

1.  [For ERDDAP™ v2.19+, sett opp Java 21.](#java) 
Av sikkerhetsgrunner er det nesten alltid best å bruke den nyeste versjonen av Java 21.
Last ned og installer den nyeste versjonen av
    [Adoptiums OpenJDK (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) ..
Hvis du vil verifisere installasjonen, kjører du «/javaJreBinDirectory/java -version», for eksempel
 `/usr/lokal/jdk-21.0.3+9/jre/bin/java -Selvfølgelig.

    ERDDAP™ jobber med Java fra andre kilder, men vi anbefaler Adoptium fordi det er det viktigste, samfunnsstøttede,
gratis (som i øl og tale) versjon av Java 21 som tilbyr langtidsstøtte (gratis oppgraderinger i mange år forbi den første utgivelsen) ..
Av sikkerhetsgrunner, vennligst oppdater din ERDDAP versjon av Java periodisk som nye versjoner av Java 21 blir tilgjengelig fra Adoptium.

    ERDDAP™ har blitt testet og brukt mye med 21, ikke andre versjoner. Av ulike grunner tester vi ikke med eller støtter andre versjoner av Java ..
     
## Tomcat{#tomcat} 

2.  [Sett opp](#tomcat)   [Tomcat](https://tomcat.apache.org) .. Tomcat er den mest brukte Java applikasjonsserver,
som er Java programvare som står mellom operativsystemets nettverkstjenester og Java serverprogramvare som ERDDAP™ ..
Det er gratis og åpen kilde programvare (FOSS) ..

Du kan bruke en annen Java Applikasjonsserver (f.eks. Jetty) Men vi tester bare med og støtter Tomcat.

   * Last ned Tomcat og pakke det ut på serveren eller PCen.
Av sikkerhetsgrunner er det nesten alltid best å bruke den nyeste versjonen av Tomcat 10 (versjon 9 og nedenfor er ikke akseptable) 
som er designet for å jobbe med Java 21 eller nyere. Nedenfor refereres Tomcat-katalogen til «tomcat».

_Varsel&#33;___ Hvis du allerede har en Tomcat som kjører noe annet webprogram (Spesielt tredder) Vi anbefaler at du installerer ERDDAP™ i
      [En andre Tomcat](/docs/server-admin/additional-information#second-tomcat) fordi ERDDAP™ trenger forskjellige Tomcat-innstillinger
og bør ikke trenge å kjempe med andre programmer for minne.

     * på Linux [Last ned "Kore" "tartar .gz " Tomcat distribusjon](https://tomcat.apache.org/download-10.cgi) og pakke den ut.
Vi anbefaler å pakke det ut i `/usr/local'.
     * På en Mac er Tomcat sannsynligvis allerede installert i `/Library/Tomcat`, men bør oppdatere den til den nyeste versjonen av Tomcat 10.
Hvis du laster det ned, [Last ned "Kore" "tartar .gz " Tomcat distribusjon](https://tomcat.apache.org/download-10.cgi) og pakke det i '/Library/Tomcat'.
     * På Windows kan du [Last ned  "Kore" "zip" Tomcat-distribusjonen](https://tomcat.apache.org/download-10.cgi) 
        (som ikke roter med Windows-registeret og som du kontrollerer fra en DOS-kommandolinje) og pakke den i en passende katalog.
        (For utvikling bruker vi distribution Core " "zip"-distribusjonen. Vi lager en '/programmer'-katalog og pakker den ut der.) 
Eller du kan laste ned Windows Core" "64-bits Windows zip"-distribusjonen, som inkluderer flere funksjoner.
Hvis distribusjonen er en Windows-installatør, vil den sannsynligvis sette Tomcat i for eksempel `/Program Filer/apache-tomcat-10.0.23'.
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - I filen «tomcat/conf/server.xml» er det to endringer som du bør gjøre til hver av de to « <Connector> ` tags
   (en for «&lt;Connector port="8080"» og en for «&lt;Connector port="8443"») ..
   1.  (Anbefalt) Øk parameterverdien «tilkoblingstid», kanskje til 300000 (millisekunder, som er 5 minutter) ..
   2.  (Anbefalt) Legg til en ny parameter: `relaxedQueryChars="[] | "«. Dette er valgfritt og litt mindre sikkert,
men fjerner behovet for brukerne til prosentkode disse tegnene når de oppstår i parametrene til en brukers forespørsel URL.
             
### content.xml{#contentxml} 

* context.xml -- Resources Cache - I `tomcat/conf/context.xml`, rett før ` </Context> ` tag, endre ressurstaggen
   (Legg til det hvis det ikke allerede er der) å sette bufferen MaxSize-parameter til 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Dette unngår mange advarsler i catalina. Alt starter med
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Tidsavbrudd{#apache-timeout} 

* På Linux-datamaskiner endre innstillingene for tidsavbrudd for Apache slik at tidskrevende brukerforespørsler ikke vil bli forsinket
   (med det som ofte vises som en "Proxy" eller "Bad Gateway" feil) .. Som rotbrukere:
  * Endre Apache http d.conf` fil (Vanligvis i `/etc/ http d/conf/ `) :)
    * Endre eksisterende <Timeout> ` innstilling (eller legge til en på slutten av filen) til 3600 (sekunder) I stedet for standard 60 eller 120 sekunder.
    * Endre eksisterende <ProxyTimeout> ` innstilling (eller legge til en på slutten av filen) til 3600 (sekunder) I stedet for standard 60 eller 120 sekunder.
  * Start Apache på nytt: `/usr/sbin/apachectl -K graciøs ` (Men noen ganger er det i en annen katalog) ..

### Sikkerhet{#security} 
         
* Sikkerhetsanbefaling: Se [disse instruksjonene](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) å øke sikkerheten til
din Tomcat installasjon, spesielt for offentlige servere.
         
* For offentlig ERDDAP™ installasjoner på Linux og Macs, det er best å sette opp Tomcat (programmet) som tilhører brukeren `tomcat `
   (en separat bruker med begrenset tillatelse og som [har ikke passord](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) ..
Dermed kan bare superbrukeren bytte til å fungere som bruker \"tomcat\". Dette gjør det umulig for hackere å logge inn på serveren din som bruker «tomcat».
Og uansett, bør du gjøre det slik at brukeren `tomcat' har svært begrensede tillatelser på serverens filsystem (lese+write+executive privilegier
for katalogtreet «apache-tomcat» og « <bigParentDirectory> ` og skrivebare privilegier for mapper med data som ERDDAP™ trenger tilgang til).
  * Du kan opprette brukerkontoen tomcat (som ikke har passord) Ved å bruke kommandoen:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Du kan bytte til å jobbe som bruker `tomcat` ved å bruke kommandoen
    ```
    sudo su - tomcat
    ```
     (Det vil be deg om superbrukarpassord for tillatelse til å gjøre dette.) 
    * Du kan slutte å jobbe som brukertomcat ved å bruke kommandoen
    ```
    exit
    ````
    * Gjør det meste av resten av Tomcat og ERDDAP™ setup instruksjoner som bruker «tomcat». Senere kjører du `startup.sh` og 'shutdown.sh` skript som bruker `tomcat' `
slik at Tomcat har tillatelse til å skrive til sine loggfiler.
    * Etter å ha pakket ut Tomcat, fra foreldre til mappen «apache-tomcat»:
      * Endre eierskap til Apache-tomcat katalogtre til tomcat bruker.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (men erstatte det faktiske navnet på tomcat-katalogen din) ..
      * Endregroupgruppen" for å være tomcat, brukernavn eller navnet på en liten gruppe som inkluderer tomcat og alle administratorer av Tomcat/ ERDDAP :)
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Endre tillatelser slik at tomcat og gruppen har lest, skrevet, utført privilegier:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Fjern andres tillatelser til å lese, skrive eller utføre:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Dette er viktig, fordi det hindrer andre brukere i å lese muligens sensitiv informasjon i ERDDAP™ installasjonsfiler.

### Minne{#memory} 

Sett Tomcats miljøvariabler

* På Linux og Macs:
Opprette en fil `tomcat/bin/setenv.sh ` (eller i Red Hat Enterprise Linux \\[ RHEL \\] , rediger `~tomcat/conf/tomcat10.conf `) For å sette Tomcats miljøvariabler.
Denne filen vil bli brukt av `tomcat/bin/startup.sh` og `shutdown.sh`. Filen skal inneholde noe som:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (erstatte mappenavn fra datamaskinen) ..
   (Hvis du tidligere satt «JRE_HOME», kan du fjerne det.) 
På Macs, trenger du sannsynligvis ikke å sette JAVA_HOME.

* På Windows:
Opprette en fil «tomcat-bin-setenv.bat» for å sette Tomcat miljøvariabler.
Denne filen vil bli brukt av `tomcat\bin\\startup.bat` og ` shutdown.bat `.
Filen skal inneholde noe som:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (erstatte mappenavn fra datamaskinen) ..
Hvis dette er bare for lokal testing, fjerne "-server".
   (Hvis du tidligere satt «JRE_HOME», kan du fjerne det.) 

minneinnstillingene `-Xmx' og `-Xms' er viktige fordi ERDDAP™ fungerer bedre med mer minne.
Sett alltid «-Xms» til samme verdi som «-Xmx».

* For 32 bit operativsystemer og 32 bit Java :)
64 bit Java Er mye bedre enn 32 bit Java men 32 bit Java Fungerer så lenge serveren ikke er opptatt.
Jo mer fysisk minne på serveren jo bedre: 4+ GB er veldig bra, 2 GB er ok, mindre anbefales ikke.
Med 32 bit Java , selv med rikelig fysisk minne, Tomcat og Java vil ikke kjøre hvis du prøver å sette `-Xmx' mye over 1500M (1200M på noen datamaskiner) ..
Hvis serveren har mindre enn 2GB minne, redusere `-Xmx`-verdien (i 'M'egabytes) 1/2 av datamaskinens fysiske minne.

* For 64 bit operativsystemer og 64 bit Java :)
64 bit Java Det vil bare fungere på et 64-biters operativsystem.
  * Med Java 8, du må legge til `-d64` i Tomcat 'CATALINA_OPTS' parameter i 'setenv.bat'.
  * Med Java 21 du velger 64 bit Java Når du laster ned en versjon av Java merket "64 bit".

Med 64 bit Java Tomcat og Java kan bruke svært høye `-Xmx` og `-Xms` innstillinger. Jo mer fysisk minne på serveren jo bedre.
Som et forenklet forslag: vi anbefaler du å sette `-Xmx' og `-Xms` til (i 'M'egabytes) til 1/2 (eller mindre) av datamaskinens fysiske minne.
Du kan se om Tomcat, Java , og ERDDAP™ kjører faktisk i 64-bits modus ved å lete etter - bit, - i ERDDAP Daglig rapport e-post
eller i `storeParentDirectory/logs/ [log.txt](/docs/server-admin/additional-information#log) ` fil («bigParentDirectory» er spesifisert i [config.xml](#setupxml) ) ..

#### Garbage Samling{#garbage-collection} 

* I ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fil, vil du se mange "GC (Tildelingsfeil) " Meldinger.
Dette er vanligvis ikke et problem. Det er et hyppig budskap fra en normalt drift Java å si at det nettopp fullførte et mindre søppel
samling fordi det gikk tom for rom i Eden (delen av Java haug for svært unge objekter) .. Vanligvis viser meldingen deg
`Minnebruk før-&gt; memoryUseAfter'. Hvis disse to tallene er tett sammen, betyr det at søppelsamlingen ikke var produktiv.
Budskapet er bare et tegn på problemer hvis det er svært hyppig (hvert sekund) ikke produktivt, og tallene er store og ikke voksende,
som sammen indikerer at Java trenger mer minne, sliter med å frigjøre minne, og kan ikke frigjøre minne.
Dette kan skje under en stressende tid, og deretter gå bort. Men hvis det fortsetter, er det et tegn på problemer.
* Hvis du ser \"java.lang.OutOfMemoryError's in ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fil,
se [OutOfMemory feil](/docs/server-admin/additional-information#outofmemoryerror) For tips om hvordan du diagnostiserer og løser problemene.
         
### Tillatelser{#permissions} 

*  [På Linux og Macs endrer du tillatelsene](#permissions) av alle «*.sh»-filer i «tomcat/bin/» som skal kjøres av eieren:
  ```
  chmod +x *.sh
  ```

### Skrifter{#fonts} 

*  [Skrifter for bilder:](#fonts) Vi foretrekker sterkt det frie [DejaVu skrifttyper](https://dejavu-fonts.github.io/) til den andre Java Skrifter.
Bruk av disse skriftene er sterkt anbefalt, men ikke nødvendig.

Hvis du velger å ikke bruke DejaVu-skriftene, må du endre fontFamily-innstillingen i setup.xml til ` <fontFamily> SansSerif </fontFamily> `,
som er tilgjengelig med alle Java Distribusjoner. Hvis du setter \" <fontFamily> til navnet på en skrifttype som ikke er tilgjengelig, ERDDAP™ vil ikke laste
og vil skrive ut en liste over tilgjengelige skrifter i «log.txt»-filen. Du må bruke en av disse skriftene.

Hvis du velger å bruke DejaVu skrifttyper, må du sørge for at ` <fontFamily> ` innstilling i oppsett.xml er ` <fontFamily> DejaVu Sans </fontFamily> `.

Hvis du vil installere DejaVu-skrifter, vennligst last ned [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5 522 795 bytes, MD(95)33E1E61FAB06A547851ED308B4FFEF42) 
og fjern fontfilene til en midlertidig mappe.

  * På Linux:
    * For Linux Adoptium Java Fordelinger, se [disse instruksjonene](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) ..
    * Med andre Java Fordelinger: Som bruker av «tomcat», kopiere skriftfilene til «$JAVA_HOME/lib/fonts» så Java finner skriftene.
Husk: Hvis/når du senere oppgraderer til en nyere versjon av Java , må du installere disse skriftene på nytt.
  * På Macs: for hver skrifttypefil, dobbeltklikk på den og klikk deretter Installer Font.
  * På Windows 7 og 10: i Windows Explorer, velg alle skriftfilene. Høyreklikk. Klikk på Installer.
             
### Test Tomcat{#test-tomcat} 

* Test din Tomcat installasjon.
  * Linux:
    * Som bruker "tomcat", kjør «tomcat/bin/startup.sh».
    * Vis din URL + ":8080/" i nettleseren din (f.eks. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) ..
  * Mac (kjøre tomcat som systemadministrator bruker) :)
    * Kjør «tomcat/bin/startup.sh».
    * Vis din URL + ":8080/" i nettleseren din (f.eks. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) ..
Merk at Tomcat som standard er kun tilgjengelig for deg. Det er ikke offentlig tilgjengelig.
  * Windows localhost:
    * Høyreklikk på Tomcat-ikonet i systembrettet, og velg " Start service".
    * Vis [http://127.0.0.1:8080/](http://127.0.0.1:8080/) Eller kanskje [http://localhost:8080/](http://localhost:8080/) I nettleseren din. Merk at Tomcat som standard er kun tilgjengelig for deg. Det er ikke offentlig tilgjengelig.

Du bør se Tomcat-Congratulations - siden.

Hvis det er problemer, se Tomcat loggfil på `tomcat/logs/catalina.out`.

### Problemer med Tomcat installasjon?{#troubles-with-the-tomcat-installation} 

* På Linux og Mac, hvis du ikke kan nå Tomcat eller ERDDAP™   (Eller kanskje kan du bare ikke nå dem fra en datamaskin utenfor brannmuren) ,
du kan teste om Tomcat lytter til port 8080, ved å skrive (som rot) på en kommandolinje på serveren:

  ```
  netstat -tuplen | grep 8080
  ```

Dette bør returnere én linje med noe som:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (Hvor \"#\" er noe siffer) , indikerer at en «java» prosess (Sannsynligvis Tomcat) Lytter på havnen "8080" for "tcp" trafikk.
Hvis ingen linjer ble returnert, hvis linjen returnerte er betydelig forskjellig, eller hvis to eller flere linjer ble returnert, kan det være et problem med portinnstillingene.

* Se Tomcat-loggfilen «tomcat/logs/catalina.out». Tomcat problemer og noen ERDDAP™ oppstartsproblemer er nesten alltid angitt der.
Dette er vanlig når du først setter opp ERDDAP™ ..

* Se [Tomcat](https://tomcat.apache.org/) nettside eller søk på nettet etter hjelp, men vennligst gi oss beskjed om problemene du hadde og løsningene du fant.

* Se vår [Seksjon om å få ekstra støtte](/docs/intro#support) ..
             
###  ERDDAP™ Innhold{#erddap-content} 
3.   [Sett opp konfigurasjonsfilene «tomcat/content/erddap».](#erddap-content) 
På Linux, Mac og Windows, last ned [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
og zip det inn i `tomcat'-katalogen, og oppretter `tomcat/content/erddap'.

__Versjon 1.0.0, 20333 bytes, MD(2005)2B8D2A5E5ED73E3A42B529C168C60B5, datert 2024-10-14__

Noen tidligere versjoner er også tilgjengelige:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19.792 bytes, MD(2005)8F892616BAEF2DF0F4B036DCB4AD7C, datert 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19.792 bytes, MD(2005)8F892616BAEF2DF0F4B036DCB4AD7C, datert 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19 810 bytes, MD(2005)1E26F62E7A06191EE6868C40B9A29362, datert 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19.810 bytes, MD(2005)1E26F62E7A06191EE6868C40B9A29362, datert 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19 810 bytes, MD(2005)1E26F62E7A06191EE6868C40B9A29362, datert 2023-02-27) 

#### Andre mapper{#other-directory} 

For Red Hat Enterprise Linux (RHEL) eller for andre situasjoner der du ikke har lov til å endre Tomcat-katalogen eller hvor du vil / trenger
å sette ERDDAP™ innholdskatalog på et annet sted av en annen grunn (Hvis du for eksempel bruker Jetty i stedet for Tomcat) ,
unzip `erddapContent .zip Inn i ønsket katalog (som bare brukeren har tilgang til) og sette \" erddapContentDirectory ` system eiendom
 (f.eks. erddapContentDirectory  =~tomcat/content/erddap `) så ERDDAP™ finner denne nye innholdskatalogen.

### config.xml{#setupxml} 

*  [Les kommentarene i `tomcat/content/erddap/setup.xml `](#setupxml) Gjør de etterspurte endringene. config.xml er filen med alle innstillingene som angir hvordan din ERDDAP™ Opptrer.

For det første oppsettet må du i det minste endre disse innstillingene:
      * ` <bigParentDirectory> `
      * ` <emailEverythingTo> `
      * ` <baseUrl> `
      * ` <email...> ` innstillinger
      * ` <admin...> ` innstillinger
      * ` <baseHttpsUrl> ` (Når du setter opp https ) 

Når du oppretter bigParentDirectory, fra foreldrekatalogen til bigParentDirectory:

    * Gjør `tomcat' brukeren til eieren av `bigParentDirectory':
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Endregroupgruppen" for å være tomcat, brukernavn eller navnet på en liten gruppe som inkluderer tomcat og alle administratorer av Tomcat/ ERDDAP :)
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Endre tillatelser slik at tomcat og gruppen har lest, skrevet, utført privilegier:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Fjern andres tillatelser til å lese, skrive eller utføre. Dette er viktig for å unngå å lese eventuelt sensitiv informasjon
i ERDDAP™ Logge filer og filer med informasjon om private datasett.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Miljøvariabler{#environment-variables} 

Begynner med ERDDAP™ v2.13, ERDDAP™ administratorer kan overstyre alle verdier i config.xml ved å angi en miljøvariabel
Oppkalt « ERDDAP _verdinavn før du kjører ERDDAP™ .. For eksempel bruk ERDDAP _baseUrl overstyrer ` <baseUrl> ` Verdi.
Dette kan være praktisk ved utplassering ERDDAP™ med en beholder som Docker, som du kan sette standardinnstillinger i setup.xml
og deretter gi spesielle innstillinger via miljøvariabler. Hvis du gir hemmelig informasjon til ERDDAP™ gjennom denne metoden,
Pass på å sjekke at informasjonen vil forbli hemmelig. ERDDAP™ Leser bare miljøvariabler en gang per oppstart,
i første sekund av oppstart, så en måte å bruke dette på er: sett miljøvariabler, start ERDDAP ,
Vent til ERDDAP™ er i gang, og deretter uroe miljøvariabler.

###  datasets.xml  {#datasetsxml} 

* Les kommentarene i [ **Arbeide med datasets.xml Fil** ](/docs/server-admin/datasets) .. Senere, etter du får ERDDAP™ kjører
For første gang (vanligvis med bare standard datasett) , vil du endre XML i `tomcat/content/erddap/ datasets.xml `
for å angi alle datasettene du vil ha ERDDAP™ å tjene. Det er her du vil tilbringe mesteparten av din tid
mens du konfigurerer ERDDAP™ og senere mens du opprettholder din ERDDAP™ ..

Du kan se et eksempel [ datasets.xml på GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) ..
     
*  (Ulikt) Nå eller (Litt mer sannsynlig) i fremtiden, hvis du vil endre Erddaps CSS-fil, kopier
«tomcat/content/erddap/images/erddapStart2.css» til «tomcat/content/erddap/images/erddap2.css» og deretter gjøre endringer i det.
Endringer i `erddap2.css' har bare virkning når ERDDAP™ er omstartet og krever ofte også at brukeren fjerner nettleserens cachede filer.
     
 ERDDAP™ vil ikke fungere riktig hvis config.xml eller datasets.xml filen er ikke en velformet XML-fil. Så etter at du har redigert disse filene,
det er en god ide å bekrefte at resultatet er velformet XML ved å lime XML-teksten inn i en XML-sjekker som [xmlvalidering](https://www.xmlvalidation.com/) ..
     
### Installer erddap. krigsfil{#install-the-erddapwar-file} 

4. På Linux, Mac og Windows _ Last ned [Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) __ til `tomcat/webapps`:

__Versjon 2.28.1, 622.676.238 bytes, MD(2005)48b426045f950c8a8d69ef9521b9bc9, datert 2025-09-05_

.war-filen er stor fordi den inneholder høy oppløsning kystlinje, grenser og høydedata som trengs for å opprette kart.

Noen tidligere versjoner er også tilgjengelige.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (068,245 bytes, MD(2005)5FEA912B5D42E50EAB9591F773EA848D, datert 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (069,844 bytes, MD(35)461325E97E7577EC671DD50246CCFB8B, datert 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD(2005)F2CFF805893146E932E498FDDBD519B6, datet 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567.742.765 bytes, MD(2005)2B33354F633294213AE2AFDDCF4DA6D0, datert 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD(2005)D843A043C506725EBD6F8EFDCCA8FD5F, dateret 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568.748.187 bytes, MD(2005)970fbee172e28b0b8a07756eecbc898e, datert 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD(2005)652AFC9D1421F00B5F789DA2C4732D4C, datert 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607.404.032 bytes, MD(2005)99a725108b37708e5420986c1616a119, datert 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bytes, MD(2005)3b2086c659eee4145ca2dff447bf4ef7, datert 2025-06-11) 

### Konfigurer proxy (bruksspesifikk)  {#proxy} 

 ERDDAP™ er vanligvis plassert bak en webserver omvendt proxy for å tillate det å betjenes på standard HTTP-porter (80 og 443) ..
SSL/TLS-avslutting er ofte hevet på webserverens proxylag. Spesifikasjonene avhenger av kravene til hver utplassering.

#### Apache{#apache} 

1. Sørg for at «mod_proxy» og «mod_proxy_ http `Er lastet:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Endre eksisterende <VirtualHost> ` tag (Hvis det finnes en) , eller legg til en på slutten av filen:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Hvis ERDDAP™ er servert på en annen bane enn «/erddap», angir også «X-Forwarded-Prefix»-hodet til
banesegment _fore_ `/erddap'. Denne innstillingen vil være egnet for en ERDDAP™ servert på
`/subpath/erddap':

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Start Apache på nytt: `/usr/sbin/apachectl -K graciøs ` (Men noen ganger er det i en annen katalog) ..
         
#### NGINX{#nginx} 

I konfigurasjonsfilen for nginx angir du disse overskriftene:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Hvis ERDDAP™ er servert på en annen bane enn «/erddap», angir også «X-Forwarded-Prefix»-hodet til
banesegment _fore_ `/erddap'. Denne innstillingen vil være egnet for en ERDDAP™ servert på
`/subpath/erddap':

```
proxy_set_header X-Forwarded-Prefix /subpath
```


For å få NGINX og ERDDAP™ fungerer riktig med https , må du legge følgende snutt i Tomcat server.xml ` <Host> ` blokk:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Start Tomcat{#start-tomcat} 

*  (Jeg anbefaler ikke å bruke Tomcat Web Application Manager. Hvis du ikke helt stenger og starter Tomcat, vil du tidligere eller senere ha problemer med minneproblemene i PermGen.) 
*  (I Linux eller Mac OS, hvis du har opprettet en spesiell bruker å kjøre Tomcat, for eksempel tomcat, huske å gjøre følgende trinn som den brukeren.) 
* Hvis Tomcat allerede kjører, steng Tomcat med (i Linux eller Mac OS) `tomcat/bin/shutdown.sh`
eller (i Windows)  `mcat\bin\\ shutdown.bat `

På Linux, bruk `ps-ef | gep tomcat` før og etter 'shutdown.sh' for å sikre at tomcat prosessen har stoppet.
Prosessen bør listes opp før avslutningen og til slutt ikke oppført etter avslutningen.
Det kan ta et minutt eller to for ERDDAP™ Fullstendig lukket ned. Vær tålmodig. Eller hvis det ser ut som det ikke vil stoppe på egen hånd, bruk:
 `kill-9 <processID> `
* Start Tomcat med (i Linux eller Mac OS) «tomcat/bin/startup.sh» eller (i Windows)  `tomcat\bin\\startup.bat `

## Er ERDDAP™ Løper?{#is-erddap-running} 

Bruk en nettleser til å prøve å visehttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ starter uten datasett. Datasett er lastet i en bakgrunnstråd og så bli tilgjengelig en for én.

### Feilsøking{#troubleshooting} 

* Når en forespørsel fra en bruker kommer inn, går det til Apache (på Linux og Mac OS datamaskiner) Så Tomcat, så ERDDAP™ ..
* Du kan se hva som kommer til Apache (relaterte feil) i Apache loggfiler.
*    [Du](/docs/server-admin/additional-information#tomcat-logs) Se hva som kommer til Tomcat (relaterte feil) 
i Tomcat loggfiler (`tomcat/logs/catalina.out` og andre filer i denne katalogen) ..
*    [Du](/docs/server-admin/additional-information#log) kan se hva som kommer til ERDDAP , diagnostiske meldinger fra ERDDAP ,
og feilmeldinger fra ERDDAP i ERDDAP™ ` <bigParentDirectory> /logs/log.txt` fil.
* Tomcat starter ikke ERDDAP™ til Tomcat får en forespørsel ERDDAP™ .. Så du kan se i Tomcat-loggfiler hvis det
Startet ERDDAP™ eller hvis det er en feilmelding knyttet til dette forsøket.
* Når ERDDAP™ Begynner å omdøpe det gamle ERDDAP™ log.txt-fil («logArchived På <CurrentTime> .txt») og oppretter en ny log.txt-fil.
Så hvis `log.txt'-filen er gammel, er det et tegn på at ERDDAP™ Har ikke nylig startet på nytt. ERDDAP™ skriver logginformasjon til en buffer
og bare skriver bufferen til loggfilen periodisk, men du kan tvinge ERDDAP™ å skrive bufferen til loggfilen ved å besøke
` /erddap/status.html `.

### Problem: Gamle versjon av Java  {#trouble-old-version-of-java} 

Hvis du bruker en versjon av Java Det er for gammelt til ERDDAP , ERDDAP™ vil ikke kjøre, og du vil se en feilmelding i Tomcats loggfil som

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Løsningen er å oppdatere den siste versjonen av Java Pass på at Tomcat bruker det.

### Problem: Treg oppstart første gang{#trouble-slow-startup-first-time} 

Tomcat må gjøre mye arbeid første gang en søknad som ERDDAP™ er startet; spesielt, det må pakke ut `erddap.war` filen
 (som er som en .zip fil) .. På noen servere, det første forsøket på å vise ERDDAP™ boder (30 sekunder?) til dette arbeidet er ferdig.
På andre servere vil det første forsøket mislykkes umiddelbart. Men hvis du venter 30 sekunder og prøver igjen, vil det lykkes hvis ERDDAP™ ble installert riktig.

Det er ingen løsning på dette. Slik fungerer Tomcat. Men det skjer bare første gang etter at du installerer en ny versjon av ERDDAP™ ..

## Slå av og på nytt{#shut-down-and-restart} 

I fremtiden, å stenge ned (og omstart)   ERDDAP™ Se [Hvordan slå ned og starte Tomcat på nytt og ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) ..

## Problemer?{#trouble} 

Problemer med å installere Tomcat eller ERDDAP™ ? Se vår [Seksjon om å få ekstra støtte](/docs/intro#support) ..

## E-postvarsel om nye versjoner av ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Hvis du vil motta en e-post når en ny versjon av ERDDAP™ er tilgjengelig eller annen viktig ERDDAP™ kunngjøringer,
Du kan bli med i ERDDAP™ annonseringsliste [her](https://groups.google.com/g/erddap-announce) .. Denne listen gjennomsnitt omtrent én e-post hver tredje måned.

## Tilpass{#customize} 

*  [Tilpass din ERDDAP™ å markere organisasjonen din (ikke NOAA   ERD ) ..](#customize) 
* Endre banneren som vises øverst på alle ERDDAP™ .html sider ved å redigere ` <startBodyHtml5> ` tag i din ` datasets.xml ` fil.
(Hvis det ikke er én, kopier standard fra ERDDAP™ «tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml» fil
inn i datasets.xml ` og rediger det.) For eksempel kan du:
  * Bruk et annet bilde (Det vil si organisasjonens logo) ..
  * Endre bakgrunnsfarge.
  * Endre " ERDDAP™ " til "_YourOrganization_ ERDDAP™ "
  * Endre " lettere tilgang til vitenskapelige data" til " lettere tilgang til _YourOrganization_s data".
  * Endre "Brought til deg ved" koblinger for å være koblinger til organisasjonen og finansieringskildene.
* Endre informasjonen på venstre side av hjemmesiden ved å redigere ` <theShortDescriptionHtml> ` tag i din ` datasets.xml ` fil.
(Hvis det ikke er én, kopier standard fra ERDDAP™ «tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml» fil
inn i datasets.xml ` og rediger det.) For eksempel kan du:
  * Beskriv hva din organisasjon og/eller gruppe gjør.
  * Beskriv hva slags data dette ERDDAP™ Det har det.
  * Hvis du vil endre ikonet som vises på nettleserfanene, setter du organisasjonens favicon. ico i `tomcat/content/erddap/images/`.
Sehttps://en.wikipedia.org/wiki/Favicon.
