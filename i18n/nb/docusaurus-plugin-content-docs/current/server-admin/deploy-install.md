---
sidebar_position: 1
---

# Installer
Hvordan å gjøre den første oppsett avERDDAP™på din server


ERDDAP™kan kjøres på enhver server som støtterJavaog Tomcat (og andre programservere som Jetty, men vi støtter dem ikke) ..ERDDAP™Har blitt testet på Linux (Inkludert i Amazons AWS) Mac og Windows datamaskiner.
*    **Docker** -- Vi tilbyr[ERDDAP™i en Docker-beholder](https://hub.docker.com/r/erddap/erddap)IOOS tilbyr nå[Hurtigstartguide forERDDAP™i en Docker Container](https://ioos.github.io/erddap-gold-standard/index.html)..
Det er standardenERDDAP™installasjon, i en Docker container.
Gjennom Docker Kombiner vi gir enkle måter å sette opp ssl og overvåking, lese mer på utsiden[Docker dokumentasjon](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md)..
Hvis du allerede bruker Docker, vil du sannsynligvis foretrekke Docker versjonen.
Hvis du ønsker å kjøre på skytjenester vil du sannsynligvis foretrekke Docker-versjonen.
*    **Amazon** -- Hvis du installererERDDAP™på en Amazon Web Services EC2-instans, se dette[Amazon Web Services Oversikt](/docs/server-admin/additional-information#amazon)Først.
*    **Linux og Macs** --ERDDAP™Fungerer bra på Linux og Mac datamaskiner. Se instruksjonene nedenfor.
*    **Vinduer** -- Windows er bra for testingERDDAP™og til personlig bruk (Se instruksjonene nedenfor) , men vi anbefaler ikke å bruke det til offentligERDDAPS. KjøringERDDAP™på Windows kan ha problemer: spesieltERDDAP™kan være i stand til å slette og/eller omdøpe filer raskt. Dette skyldes sannsynligvis antivirusprogramvare. (For eksempel fra McAfee og Norton) som kontrollerer filene for virus. Hvis du løper inn i dette problemet (som kan sees av feilmeldinger i[log.txt](/docs/server-admin/additional-information#log)fil som "Ukan slettes ...") , endrer antivirusprogramvarens innstillinger kan delvis lindre problemet. Eller vurdere å bruke en Linux eller Mac-server i stedet.

 **StandardenERDDAP™installasjonsanvisninger for Linux, Macs og Windows-datamaskiner er:** 

0. Sørg for at alle avhengigheter er installert. På ikke-Windows maskiner (Linux og Mac) Du trenger csh.
## Java {#java} 
1.  [ForERDDAP™v2.19+, sett oppJava21.](#java)
Av sikkerhetsgrunner er det nesten alltid best å bruke den nyeste versjonen avJava21.
Last ned og installer den nyeste versjonen av
    [Adoptiums OpenJDK (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21).. For å bekrefte installasjonen, skriver du "/_javaJreBinDirectory_/java -versjon", for eksempel
/usr/lokal/jdk-21.0.3+9/jre/bin/java -versjon
    
    ERDDAP™jobber medJavafra andre kilder, men vi anbefaler Adoptium fordi det er den viktigste, samfunnsstøttede, gratis (som i øl og tale) versjon avJava21 som tilbyr langtidsstøtte (gratis oppgraderinger i mange år forbi den første utgivelsen) .. Av sikkerhetsgrunner, vennligst oppdater dinERDDAPversjon avJavaperiodisk som nye versjoner avJava21 blir tilgjengelig fra Adoptium.
    
    ERDDAP™har blitt testet og brukt mye med 21, ikke andre versjoner. Av ulike grunner tester vi ikke med eller støtter andre versjoner avJava..
     
## Tomcat{#tomcat} 
2.  [Sett opp](#tomcat) [Tomcat](https://tomcat.apache.org)..
Tomcat er den mest brukteJavaProgramserver, som erJavaprogramvare som står mellom operativsystemets nettverkstjenester ogJavaserverprogramvare somERDDAP™.. Det er gratis og åpen kilde programvare (FOSS) ..
    
Du kan bruke en annenJavaApplikasjonsserver (f.eks. Jetty) Men vi tester bare med og støtter Tomcat.
     
    
    * Last ned Tomcat og pakke det ut på serveren eller PCen.
Av sikkerhetsgrunner er det nesten alltid best å bruke den nyeste versjonen av Tomcat 10 (versjon 9 og nedenfor er ikke akseptable) som er designet for å jobbe medJava21 eller nyere. Nedenfor vil Tomcat-katalogen bli omtalt som _tomcat_.
        
Advarsel&#33; Hvis du allerede har en Tomcat som kjører noe annet webprogram (Spesielt tredder) Vi anbefaler at du installererERDDAP™i[En andre Tomcat](/docs/server-admin/additional-information#second-tomcat)fordiERDDAP™trenger ulike Tomcat innstillinger og bør ikke trenge å kjempe med andre programmer for minne.
        
        * på Linux[Last ned "Kore" "tartar.gz" Tomcat distribusjon](https://tomcat.apache.org/download-10.cgi)og pakke den ut. Vi anbefaler å pakke den i /usr/lokal.
        * På en Mac er Tomcat sannsynligvis allerede installert i /Library/Tomcat, men bør oppdatere det til den nyeste versjonen av Tomcat 10.
Hvis du laster det ned,[Last ned "Kore" "tartar.gz" Tomcat distribusjon](https://tomcat.apache.org/download-10.cgi)og pakke det i /Library/Tomcat.
        * På Windows kan du[Last ned  "Kore" "zip" Tomcat-distribusjonen](https://tomcat.apache.org/download-10.cgi)  (som ikke roter med Windows-registeret og som du kontrollerer fra en DOS-kommandolinje) og pakke den i en passende katalog. (For utvikling bruker vi distribution Core " "zip"-distribusjonen. Vi lager en / programmer-katalog og pakker det ut der.) Eller du kan laste ned Windows Core" "64-bits Windows zip"-distribusjonen, som inkluderer flere funksjoner. Hvis distribusjonen er en Windows-installerer, vil den sannsynligvis legge Tomcat i, for eksempel /Programfiler/apache-tomcat-10.0.23 .
             
### server.xml{#serverxml} 
*   [server.xml](#serverxml)- I _tomcat_/conf/server.xml-fil, det er to endringer som du bør gjøre til hver av de to&lt;Koble &gt; tags - en for
```
        <Connector port="8080" 
```
En til
```
        <Conector port="8443"
```
    1.   (Anbefalt) Øk tilkoblingstidens parameterverdi, kanskje til 300000 (millisekund)   (som er 5 minutter) ..
    2.   (Anbefalt) Legg til en ny parameter: avslappetQueryChars="\\[\\]|" Dette er valgfritt og litt mindre sikkert, men fjerner behovet for brukerne til prosentkode disse tegnene når de oppstår i parametrene til en brukers forespørsel URL.
             
### content.xml{#contentxml} 
* context.xml -- Resources Cache - I _tomcat_/conf/context.xml, rett før&lt;/Context&gt; tag, endre ressurstaggen (Legg til det hvis det ikke allerede er der) å sette bufferen MaxSize-parameter til 80000:
    &lt;Ressurser cachingTillat=" sant" cacheMaxSize="80000" /&gt;
Dette unngår mange advarsler i catalina. Alt starter med
 " VARNING\\[hoved\\]org.apache.catalina.webresources.cache.getResource Klarte ikke å legge til ressursen på\\[/WEB-INF/klasser/...]"
         
### Apache Tidsavbrudd{#apache-timeout} 
* På Linux-datamaskiner endre innstillingene for tidsavbrudd for Apache slik at tidskrevende brukerforespørsler ikke vil bli forsinket (med det som ofte vises som en "Proxy" eller "Bad Gateway" feil) .. Som rotbrukere:
    1. Endre Apachehttpd.conf-fil (vanligvis i /etc/httpd/conf/) :)
Endre eksisterende&lt;Tidsavbrudd &gt; innstilling (eller legge til en på slutten av filen) til 3600 (sekunder) I stedet for standard 60 eller 120 sekunder.
Endre eksisterende&lt;ProxyTimeout&gt; innstilling (eller legge til en på slutten av filen) til 3600 (sekunder) I stedet for standard 60 eller 120 sekunder.
    2. Start Apache på nytt: /usr/sbin/apachectl -K graciøs (Men noen ganger er det i en annen katalog) ..
             
    * Sikkerhetsanbefaling: Se[disse instruksjonene](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)for å øke sikkerheten til Tomcat-installasjonen, spesielt for offentlige servere.
         
    * For offentligERDDAP™installasjoner på Linux og Macs, det er best å sette opp Tomcat (programmet) som tilhører brukeren "tomcat" (en separat bruker med begrenset tillatelse og som[har ikke passord](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) .. Således kan bare superbrukeren bytte til å fungere som brukertomkat. Dette gjør det umulig for hackere å logge inn på serveren som brukertomcat. Og uansett bør du gjøre det slik at tomcat brukeren har svært begrensede tillatelser på serverens filsystem (lese+write+e executive privilegier for apache-tomcat katalogtre og&lt;bigParentDirectory&gt; og skrivebeskyttede privilegier for mapper med data somERDDAP™trenger tilgang til).
        * Du kan opprette tomcat brukerkonto (som ikke har passord) ved å bruke kommandoen
sudo userad tomcat -s /bin/bash -p '* \"
        * Du kan bytte til å jobbe som brukertomcat ved å bruke kommandoen
sudo su-tomcat
             (Det vil be deg om superbrukarpassord for tillatelse til å gjøre dette.) 
        * Du kan slutte å jobbe som brukertomcat ved å bruke kommandoen
Avslutt
        * Gjør det meste av resten av Tomcat ogERDDAP™installasjonsanvisninger som bruker "tomcat". Senere, kjør oppstart.sh og shutdown.sh skript som bruker "tomcat" slik at Tomcat har tillatelse til å skrive til sine loggfiler.
        * Etter å ha pakket ut Tomcat, fra forelderen til Apache-tomcat-katalogen:
            
            * Endre eierskap til Apache-tomcat katalogtre til tomcat bruker.
chown -R tomcat apache-tomcat-_10.0.23_
                 (men erstatte det faktiske navnet på tomcat-katalogen din) ..
            * Endregroupgruppen" for å være tomcat, brukernavn eller navnet på en liten gruppe som inkluderer tomcat og alle administratorer av Tomcat/ERDDAPf.eks.
chgrp-R _ din Brukernavn_ apache-tomcat-_10.0.23_
            * Endre tillatelser slik at tomcat og gruppen har lest, skrive, utføre privilegier, f.eks.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Fjern andres tillatelser til å lese, skrive eller utføre:
chmod -R o-rwx apache-tomcat-_10.0.23_
Dette er viktig, fordi det hindrer andre brukere i å lese muligens sensitiv informasjon iERDDAP™installasjonsfiler.
            
              
### Minne{#memory} 
* Sett Tomcats miljøvariabler
    
På Linux og Macs:
Opprette en fil _tomcat_/bin/setenv.sh (eller i Red Hat Enterprise Linux\\[RHEL\\], rediger ~tomcat/conf/tomcat10.conf) For å sette Tomcats miljøvariabler. Denne filen vil bli brukt av _tomcat_/bin/startup.sh og shutdown.sh. Filen skal inneholde noe som:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (erstatte mappenavn fra datamaskinen) ..
 (Hvis du tidligere har satt JRE\\_HOME, kan du fjerne det.)   
På Macs trenger du sannsynligvis ikke å sette JAVA\\_HOME.

På Windows:
Opprett en fil _tomcat_\\bin\\setenv.bat for å sette Tomcats miljøvariabler. Denne filen vil bli brukt av _tomcat_\\bin\\startup.bat ogshutdown.bat.. Filen skal inneholde noe som:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (erstatte mappenavn fra datamaskinen) ..
Hvis dette er bare for lokal testing, fjerne "-server".
 (Hvis du tidligere har satt JRE\\_HOME, kan du fjerne det.) 

-Xmx- og -Xms-minneinnstillingene er viktige fordiERDDAP™fungerer bedre med mer minne. Sett alltid -Xms til samme verdi som -Xmx.

* For 32 bit operativsystemer og 32 bitJava:)
64 bitJavaEr mye bedre enn 32 bitJavamen 32 bitJavaFungerer så lenge serveren ikke er opptatt. Jo mer fysisk minne på serveren jo bedre: 4+ GB er veldig bra, 2 GB er ok, mindre anbefales ikke. Med 32 bitJava, selv med rikelig fysisk minne, Tomcat ogJavavil ikke kjøre hvis du prøver å sette -Xmx mye over 1500M (1200M på noen datamaskiner) .. Hvis serveren har mindre enn 2GB minne, redusere -Xmx-verdien (i 'M'egabytes) 1/2 av datamaskinens fysiske minne.
* For 64 bit operativsystemer og 64 bitJava:)
64 bitJavaDet vil bare fungere på et 64-biters operativsystem.
    
    * MedJava8, du må legge til \\-d64 i Tomcat CATALINA\\_OPTS parameter i setenv.bat
    * MedJava21 du velger 64 bitJavaNår du laster ned en versjon avJavamerket "64 bit".
    
Med 64 bitJavaTomcat ogJavakan bruke svært høye -Xmx og -Xms innstillinger. Jo mer fysisk minne på serveren jo bedre. Som et forenklet forslag: Vi anbefaler at du setter -Xmx og -Xms til (i 'M'egabytes) til 1/2 (eller mindre) av datamaskinens fysiske minne. Du kan se om Tomcat,Java, ogERDDAP™kjører faktisk i 64-bits modus ved å lete etter - bit, - iERDDAPdaglig rapport e-post eller i _bigParentDirectory_/logs/[log.txt](/docs/server-admin/additional-information#log)fil (_BigParentDirectory_ er spesifisert i[config.xml](#setupxml)) ..
#### Garbage Samling{#garbage-collection} 
* IERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)fil, vil du se mange "GC (Tildelingsfeil) " Meldinger.
Dette er vanligvis ikke et problem. Det er et hyppig budskap fra en normalt driftJavasi at det nettopp fullførte en mindre søppelsamling fordi det rennet ut av rommet i Eden (delen avJavahaug for svært unge objekter) .. Vanligvis viser meldingen deg _minneBrukfore_\\&gt;_minneBrukAfter_. Hvis disse to tallene er tett sammen, betyr det at søppelsamlingen ikke var produktiv. Budskapet er bare et tegn på problemer hvis det er svært hyppig (hvert sekund) , ikke produktive, og tallene er store og ikke voksende, som sammen indikerer atJavatrenger mer minne, sliter med å frigjøre minne, og kan ikke frigjøre minne. Dette kan skje under en stressende tid, og deretter gå bort. Men hvis det fortsetter, er det et tegn på problemer.
* Hvis du ser java.lang.OutOfMemoryError's inERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)fil, se[OutOfMemory feil](/docs/server-admin/additional-information#outofmemoryerror)For tips om hvordan du diagnostiserer og løser problemene.
         
### Tillatelser{#permissions} 
*   [På Linux og Macs endrer du tillatelsene](#permissions)av alle\\*.shfiler i _tomcat_/bin/ som skal kjøres av eieren, f.eks. med
```
    chmod +x \\*.sh  
```
### Skrifter{#fonts} 
*   [Skrifter for bilder:](#fonts)Vi foretrekker sterkt det frie[DejaVu skrifttyper](https://dejavu-fonts.github.io/)til den andreJavaSkrifter. Bruk av disse skriftene er sterkt anbefalt, men ikke nødvendig.
    
Hvis du velger å ikke bruke DejaVu-skriftene, må du endre fontFamily-innstillingen i config.xml til&lt;fontFamilie&gt;SansSerif&lt;/fontFamily&gt;, som er tilgjengelig med alleJavaDistribusjoner. Hvis du angir fontFamily til navnet på en skrifttype som ikke er tilgjengelig,ERDDAP™vil ikke laste og vil skrive ut en liste over tilgjengelige skrifter i log.txt-filen. Du må bruke en av disse skriftene.
    
Hvis du velger å bruke DejaVu-fontene, må du sørge for at skriftFamily-innstillingen i config.xml er&lt;skrift Familie&gt;DejaVu Sans&lt;/fontFamily&gt;.
    
Hvis du vil installere DejaVu-skrifter, vennligst last ned[DejaVuFonts.zip](/DejaVuFonts.zip)  (5 522 795 bytes, MD(95)33E1E61FAB06A547851ED308B4FFEF42) og fjern fontfilene til en midlertidig mappe.
    
    * På Linux:
        * For Linux AdoptiumJavaFordelinger, se[disse instruksjonene](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/)..
        * Med andreJavaFordelinger: Som Tomcat-brukere, kopiere skriftfilene til _JAVA\\_HOME_/lib/fonts såJavafinner skriftene. Husk: Hvis/når du senere oppgraderer til en nyere versjon avJava, må du installere disse skriftene på nytt.
    * På Macs: for hver skrifttypefil, dobbeltklikk på den og klikk deretter Installer Font.
    * På Windows 7 og 10: i Windows Explorer, velg alle skriftfilene. Høyreklikk. Klikk på Installer.
             
### Test Tomcat{#test-tomcat} 
* Test din Tomcat installasjon.
    * Linux:
        * Som bruker "tomcat", kjør _tomcat_/bin/startup.sh
        * Vis din URL + ":8080/" i nettleseren din (f.eks.[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) ..
        * Du bør se Tomcat-Congratulations - siden.
Hvis det er problemer, se Tomcat-loggfilen _tomcat_/logs/catalina.out.
    * Mac (kjøre tomcat som systemadministrator bruker) :)
        * Kjør _tomcat_/bin/startup.sh
        * Vis din URL + ":8080/" i nettleseren din (f.eks.[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .. Merk at Tomcat som standard er kun tilgjengelig for deg. Det er ikke offentlig tilgjengelig.
        * Du bør se Tomcat-Congratulations - siden.
Hvis det er problemer, se Tomcat-loggfilen _tomcat_/logs/catalina.out.
    * Windows localhost:
        
        * Høyreklikk på Tomcat-ikonet i systembrettet, og velg " Start service".
        * Vis[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)Eller kanskje[ http://localhost:8080/ ](http://localhost:8080/)I nettleseren din. Merk at Tomcat som standard er kun tilgjengelig for deg. Det er ikke offentlig tilgjengelig.
        * Du bør se Tomcat-Congratulations - siden.
Hvis det er problemer, se Tomcat-loggfilen _tomcat_/logs/catalina.out.
            
### Problemer med Tomcat installasjon?{#troubles-with-the-tomcat-installation} 
* På Linux og Mac, hvis du ikke kan nå Tomcat ellerERDDAP™  (Eller kanskje kan du bare ikke nå dem fra en datamaskin utenfor brannmuren) , kan du teste om Tomcat lytter til port 8080, ved å skrive (som rot) på en kommandolinje på serveren:
```  
    netstat -tuplen | grep 8080  
```
Dette bør returnere én linje med noe som:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (hvor \"#\" er noe siffer) som indikerer at en "java" prosess (Sannsynligvis Tomcat) Lytter på havnen "8080" for "tcp" trafikk. Hvis ingen linjer ble returnert, hvis linjen returnerte er betydelig forskjellig, eller hvis to eller flere linjer ble returnert, kan det være et problem med portinnstillingene.
* Se Tomcat-loggfilen _tomcat_/logs/catalina.out. Tomcat problemer og noenERDDAP™oppstartsproblemer er nesten alltid angitt der. Dette er vanlig når du først setter oppERDDAP™..
* Se[Tomcat](https://tomcat.apache.org/)nettside eller søk på nettet etter hjelp, men vennligst gi oss beskjed om problemene du hadde og løsningene du fant.
* Se vår[Seksjon om å få ekstra støtte](/docs/intro#support)..
             
### ERDDAP™Innhold{#erddap-content} 
3.  [Sett opp_tomcat_/content/erddapkonfigurasjonsfiler.](#erddap-content)  
På Linux, Mac og Windows, last ned[erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (versjon 1.0.0, 20333 bytes, MD(2005)2B8D2AE5ED73E3A42B529C168C60B5, datert 2024-10-14) og zip det inn i _tomcat_, opprette_tomcat_/content/erddap..

    \\[Noen tidligere versjoner er også tilgjengelige:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19.792 bytes, MD(2005)8F892616BAEF2DF0F4B036DCB4AD7C, datert 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19.792 bytes, MD(2005)8F892616BAEF2DF0F4B036DCB4AD7C, datert 2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19 810 bytes, MD(2005)1E26F62E7A06191EE6868C40B9A29362, datert 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19.810 bytes, MD(2005)1E26F62E7A06191EE6868C40B9A29362, datert 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19 810 bytes, MD(2005)1E26F62E7A06191EE6868C40B9A29362, datert 2023-02-27) 
og zip det inn i _tomcat_, opprette_tomcat_/content/erddap..\\]
    
#### Andre mapper{#other-directory} 
For Red Hat Enterprise Linux (RHEL) eller i andre situasjoner der du ikke har lov til å endre Tomcat-katalogen eller hvor du vil/må plassereERDDAP™innholdskatalog på et annet sted av en annen grunn (Hvis du for eksempel bruker Jetty i stedet for Tomcat) , unzip erddapContent.zipi ønsket katalog (som bare bruker=tomcat har tilgang til) og satterddapContentDirectorysystem eiendom (f.eks.erddapContentDirectory=~tomcat/content/erddap) såERDDAP™finner denne nye innholdskatalogen.
    
### config.xml{#setupxml} 
*   [Les kommentarene i_tomcat_/content/erddap/ **config.xml** ](#setupxml)Gjør de etterspurte endringene. config.xml er filen med alle innstillingene som angir hvordan dinERDDAP™Opptrer.
For det første oppsettet må du i det minste endre disse innstillingene:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Når du oppretter bigParentDirectory, fra foreldrekatalogen til bigParentDirectory:
    
    * Gjør bruker=tomcat eier av bigParentDirectory, f.eks.
```
        chown -R tomcat _bigParentDirectory_
```
    * Endregroupgruppen" for å være tomcat, brukernavn eller navnet på en liten gruppe som inkluderer tomcat og alle administratorer av Tomcat/ERDDAPf.eks.
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Endre tillatelser slik at tomcat og gruppen har lest, skrive, utføre privilegier, f.eks.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Fjern andres tillatelser til å lese, skrive eller utføre. Dette er viktig for å hindre å lese mulig sensitiv informasjon iERDDAP™Logge filer og filer med informasjon om private datasett.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Miljøvariabler{#environment-variables} 
Begynner medERDDAP™v2.13,ERDDAP™administratorer kan overstyre alle verdier i config.xml ved å angi en miljøvariabel som heterERDDAP\\_verdiName_ før du kjørerERDDAP™.. For eksempel brukERDDAP\\_baseUrl overstyrer&lt;baseUrl &gt; verdi. Dette kan være praktisk når du distribuererERDDAP™med en beholder som Docker, som du kan sette standardinnstillinger i config.xml og deretter gi spesielle innstillinger via miljøvariabler. Hvis du gir hemmelig informasjon tilERDDAP™via denne metoden, sørg for å sjekke at informasjonen vil forbli hemmelig.ERDDAP™Leser bare miljøvariabler en gang per oppstart, i første sekund av oppstart, så en måte å bruke dette på er: sett miljøvariabler, startERDDAPVent tilERDDAP™er i gang, og deretter uroe miljøvariabler.
    
### datasets.xml {#datasetsxml} 
* Les kommentarene i[ **Arbeide meddatasets.xmlFil** ](/docs/server-admin/datasets).. Senere, etter du fårERDDAP™løper for første gang (vanligvis med bare standard datasett) , vil du endre XML i_tomcat_/content/erddap/ **datasets.xml** for å angi alle datasettene du vil haERDDAP™å tjene. Dette er der du vil tilbringe mesteparten av din tid mens du setter oppERDDAP™og senere mens du opprettholder dinERDDAP™..

Du kan se et eksempel[datasets.xmlpå GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml)..
     
*    (Ulikt) Nå eller (Litt mer sannsynlig) i fremtiden, hvis du vil endre Erddaps CSS-fil, gjør en kopi av_tomcat_/content/erddap/images/erddapStart2.css kalt erddap2.css og deretter gjøre endringer i det. Endringer i erddap2.css trer i kraft nårERDDAP™er omstartet og krever ofte også at brukeren fjerner nettleserens cachede filer.
     
ERDDAP™vil ikke fungere riktig hvis config.xml ellerdatasets.xmlfilen er ikke en velformet XML-fil. Så etter at du har redigert disse filene, er det en god ide å bekrefte at resultatet er velformet XML ved å lime XML-teksten inn i en XML-sjekker som[xmlvalidering](https://www.xmlvalidation.com/)..
     
### Installer erddap.war-filen{#install-the-erddapwar-file} 
4. På Linux, Mac og Windows, last ned[Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war)i _tomcat_/webapps.
     (versjon 2.28.0, 620.824.288 bytes, MD(95)f948b2ba603f65a83ac67af43da9e4c2, datert 08-29-2025) 
    
.war-filen er stor fordi den inneholder høy oppløsning kystlinje, grenser og høydedata som trengs for å opprette kart.
    
    \\[Noen tidligere versjoner er også tilgjengelige.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (068,245 bytes, MD(2005)5FEA912B5D42E50EAB9591F773EA848D, datert 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (069,844 bytes, MD(35)461325E97E7577EC671DD50246CCFB8B, datert 2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 bytes, MD(2005)F2CFF805893146E932E498FDDBD519B6, datet 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567.742.765 bytes, MD(2005)2B33354F633294213AE2AFDDCF4DA6D0, datert 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bytes, MD(2005)D843A043C506725EBD6F8EFDCCA8FD5F, dateret 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568.748.187 bytes, MD(2005)970fbee172e28b0b8a07756eecbc898e, datert 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 bytes, MD(2005)652AFC9D1421F00B5F789DA2C4732D4C, datert 2024-11-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607.404.032 bytes, MD(2005)99a725108b37708e5420986c1616a119, datert 2025-03-31) 
    [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)  (620.554.403 bytes, MD(2005)3b2086c659eee4145ca2dff447bf4ef7, datert 06-11-2025) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Bruk proxy Pass så brukere trenger ikke å sette portnummeret, f.eks.:8080, i URL.
På Linux datamaskiner, hvis Tomcat kjører i Apache, vennligst endre Apachehttpd.conf-fil (vanligvis i /etc/httpd/conf/) å tillate HTTP trafikk til/fraERDDAP™uten å kreve portnummeret, f.eks. :8080, i URL. Som rotbrukere:
    1. Endre eksisterende&lt;VirtualHost&gt; tag (Hvis det finnes en) , eller legg til en på slutten av filen:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Start på nytt Apache: /usr/sbin/apachectl -K graciøs (Men noen ganger er det i en annen katalog) ..
         
### NGINX{#nginx} 
 (UNCOMMON) Hvis du bruker[NGINX](https://www.nginx.com/)  (en webserver og lastbalanse) :)
for å få NGINX ogERDDAP™fungerer riktig medhttps, må du sette følgende snutt inne i Tomcat server.xml&lt;Vert &gt; blokk:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Og i Nginx-oppsettfilen må du angi disse overskriftene:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Takk til Kyle Wilcox.)   
     
### Start Tomcat{#start-tomcat} 
*    (Jeg anbefaler ikke å bruke Tomcat Web Application Manager. Hvis du ikke helt stenger og starter Tomcat, vil du tidligere eller senere ha problemer med minneproblemene i PermGen.)   
     
*    (I Linux eller Mac OS, hvis du har opprettet en spesiell bruker å kjøre Tomcat, for eksempel tomcat, huske å gjøre følgende trinn som den brukeren.)   
     
* Hvis Tomcat allerede kjører, steng Tomcat med (i Linux eller Mac OS) _tomcat_/bin/shutdown.sh
eller (i Windows) _tomcat_\\bin\\shutdown.bat
    
På Linux, bruk ps-ef|grep tomcat før og etter shutdown.sh å sørge for at tomcat prosessen har stoppet. Prosessen bør listes opp før avslutningen og til slutt ikke oppført etter avslutningen. Det kan ta et minutt eller to forERDDAP™Fullstendig lukket ned. Vær tålmodig. Eller hvis det ser ut som det ikke vil stoppe på egen hånd, bruk:
kill -9 _processID_
    
* Start Tomcat med (i Linux eller Mac OS) _tomcat_/bin/startup.sh
eller (i Windows) _tomcat_\\bin\\startup.bat

## ErERDDAP™Løper?{#is-erddap-running} 
Bruk en nettleser til å prøve å vise http://_www.YourServer.org_/erddap/status.html   
ERDDAP™starter uten datasett. Datasett er lastet i en bakgrunnstråd og så bli tilgjengelig en for én.

### Feilsøking{#troubleshooting} 
* Når en forespørsel fra en bruker kommer inn, går det til Apache (på Linux og Mac OS datamaskiner) Så Tomcat, såERDDAP™..
* Du kan se hva som kommer til Apache (relaterte feil) i Apache loggfiler.
*   [Du](/docs/server-admin/additional-information#tomcat-logs)Se hva som kommer til Tomcat (relaterte feil) i Tomcat loggfiler (_tomcat_/logs/catalina.out og andre filer i den katalogen) ..
*   [Du](/docs/server-admin/additional-information#log)kan se hva som kommer tilERDDAP, diagnostiske meldinger fraERDDAPog feilmeldinger fraERDDAPiERDDAP™ &lt;bigParentDirectory&gt;loggs/log.txt fil.
* Tomcat starter ikkeERDDAP™til Tomcat får en forespørselERDDAP™.. Så du kan se i Tomcat loggfiler hvis det startetERDDAP™eller hvis det er en feilmelding knyttet til dette forsøket.
* NårERDDAP™Begynner å omdøpe det gamleERDDAP™log.txt-fil (loggArchivedAt_CurrentTime_.txt) og oppretter en ny log.txt-fil. Hvis loggen. txt-filen er gammel, det er et tegn på atERDDAP™Har ikke nylig startet på nytt.ERDDAP™skriver logginformasjon til en buffer og skriver bare bufferen til loggfilen regelmessig, men du kan tvingeERDDAP™å skrive bufferen til loggfilen ved å besøke .../erddap/status.html..

### Problem: Gamle versjon avJava {#trouble-old-version-of-java} 
Hvis du bruker en versjon avJavaDet er for gammelt tilERDDAP,ERDDAP™vil ikke kjøre, og du vil se en feilmelding i Tomcats loggfil som
Unntak i tråd "main" java.lang.U støttetClassVersionError:
_Noen/klasse/navn_: Ikke støttet major.minor versjon _someNumber_
Løsningen er å oppdatere den siste versjonen avJavaPass på at Tomcat bruker det.

### Problem: Treg oppstart første gang{#trouble-slow-startup-first-time} 
Tomcat må gjøre mye arbeid første gang en søknad somERDDAP™er startet; spesielt det må pakke ut erddap. krigsfil (som er som en.zipfil) .. På noen servere, det første forsøket på å viseERDDAP™boder (30 sekunder?) til dette arbeidet er ferdig. På andre servere vil det første forsøket mislykkes umiddelbart. Men hvis du venter 30 sekunder og prøver igjen, vil det lykkes hvisERDDAP™ble installert riktig.
Det er ingen løsning på dette. Slik fungerer Tomcat. Men det skjer bare første gang etter at du installerer en ny versjon avERDDAP™..

## Slå av og på nytt{#shut-down-and-restart} 
I fremtiden, å stenge ned (og omstart)  ERDDAPSe[Hvordan slå ned og starte Tomcat på nytt ogERDDAP](/docs/server-admin/additional-information#shut-down-and-restart)..
## Problemer?{#trouble} 
Problemer med å installere Tomcat ellerERDDAP? Se vår[Seksjon om å få ekstra støtte](/docs/intro#support)..
## E-postvarsel om nye versjoner avERDDAP {#email-notification-of-new-versions-of-erddap} 
Hvis du vil motta en e-post når en ny versjon avERDDAP™er tilgjengelig eller annen viktigERDDAP™kunngjøringer, du kan bli med iERDDAP™annonseringsliste[her](https://groups.google.com/g/erddap-announce).. Denne listen gjennomsnitt omtrent én e-post hver tredje måned.
## Tilpass{#customize} 
[Tilpass dinERDDAP™å markere organisasjonen din (ikkeNOAA ERD) ..](#customize)
    * Endre banneren som vises øverst på alleERDDAP™.html sider ved å redigere&lt;startBodyHtml5&gt; tag i dindatasets.xmlfil. (Hvis det ikke er én, kopier standard fraERDDAP's
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fil tildatasets.xmlog rediger det.) For eksempel kan du:
        * Bruk et annet bilde (Det vil si organisasjonens logo) ..
        * Endre bakgrunnsfarge.
        * Endre "ERDDAP" til "_YourOrganization_ERDDAP"
        * Endre " lettere tilgang til vitenskapelige data" til " lettere tilgang til _YourOrganization_s data".
        * Endre "Brought til deg ved" koblinger for å være koblinger til organisasjonen og finansieringskildene.
    * Endre informasjonen på venstre side av hjemmesiden ved å redigere&lt;ShortDescriptionHtml&gt;-merket i dindatasets.xmlfil. (Hvis det ikke er én, kopier standard fraERDDAP's
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fil tildatasets.xmlog rediger det.) For eksempel kan du:
        * Beskriv hva din organisasjon og/eller gruppe gjør.
        * Beskriv hva slags data detteERDDAP™Det har det.
    * Hvis du vil endre ikonet som vises på nettleserfanene, setter du organisasjonens favicon. ico i_tomcat_/content/erddap/bilder/ . Se[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon)..
