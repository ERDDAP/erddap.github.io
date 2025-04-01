---
sidebar_position: 1
---

# Installer installation
Sådan gør du den første opsætning afERDDAP™på din server


ERDDAP™kan køre på enhver server, der understøtterJavaog Tomcat (og andre applikationsservere som Jetty, men vi understøtter ikke dem) .ERDDAP™er blevet testet på Linux (herunder på Amazon's AWS) , Mac og Windows-computere.

*    **Amazon Amazon** -- Hvis du installererERDDAP™på en Amazon Web Services EC2-instans, se dette[Oversigt over Amazon Web Services](/docs/server-admin/additional-information#amazon)først.
*    **Docker** -- Axiom tilbyder nu[ERDDAP™i en Docker-container](https://hub.docker.com/u/axiom/)og IOOS tilbyder nu et tilbud[Hurtig startguide tilERDDAP™i en Docker Container](https://ioos.github.io/erddap-gold-standard/index.html).
Det er standardenERDDAP™installation, men Axiom har lagt den i en docker beholder.
Hvis du allerede bruger Docker, vil du sandsynligvis foretrække Docker-versionen.
Hvis du ikke allerede bruger Docker, anbefaler vi generelt ikke dette.
Hvis du valgte at installereERDDAP™via Docker tilbyder vi ingen støtte til installationsprocessen.
Vi har ikke arbejdet med Docker endnu. Hvis du arbejder med dette, bedes du sende os dine kommentarer.
*    **Linux og Macs** --ERDDAP™virker fantastisk på Linux og Mac-computere. Se vejledningen nedenfor.
*    **Windows Windows Windows** -- Windows er fint til testERDDAP™og til personlig brug (Se vejledningen nedenfor) , men vi anbefaler ikke at bruge det til offentlighedenERDDAPs. LøbERDDAP™på Windows kan have problemer: navnlig,ERDDAP™kan ikke slette og/eller omdøbe filer hurtigt. Dette skyldes sandsynligvis antivirus software (f.eks. fra McAfee og Norton) som kontrollerer filerne til virus. Hvis du kører ind i dette problem (som kan ses af fejlmeddelelser i den[log.txt](/docs/server-admin/additional-information#log)fil som "Unable at slette...") , ændring af antivirussoftwarens indstillinger kan delvist lindre problemet. Eller overveje at bruge en Linux- eller Mac-server i stedet.

 **StandardERDDAP™installationsinstruktioner for Linux, Macs og Windows-computere er:** 

0. Sørg for, at eventuelle afhængigheder er installeret. På ikke-Windows maskiner (Linux og Mac) , du behøver csh.
## Java {#java} 
1.  [For For For For ForERDDAP™v2.19+, sæt opJava21. marts](#java)
Af sikkerhedsmæssige årsager er det næsten altid bedst at bruge den nyeste version afJava21. marts
Download og installer den nyeste version af
    [Adoptiums OpenJDK (Temurin) 21:21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). Hvis du vil kontrollere installationen, skal du skrive "/_javaJreBinDirectory_/java -version", for eksempel
/usr/local/jdk-21.0.3+9/jre/bin/java -version
    
    ERDDAP™arbejder medJavafra andre kilder, men vi anbefaler Adoptium, fordi det er den vigtigste, community-støttet, gratis (som i øl og tale) version afJava21 der tilbyder Long Term Support (gratis opgraderinger i mange år tidligere den første udgivelse) . Af sikkerhedsmæssige årsager, bedes du opdatere dinERDDAP's version afJavaperiodisk som nye versioner afJava21 bliver tilgængelig fra Adoptium.
    
    ERDDAP™er blevet testet og brugt i vid udstrækning med 21, ikke andre versioner. Af forskellige grunde tester vi ikke med eller understøtter andre versioner afJava.
     
## Tomcat{#tomcat} 
2.  [Opsæt op](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat er den mest udbredteJavaAnsøgning Server, som erJavasoftware, der står mellem operativsystemets netværkstjenester ogJavaserversoftware somERDDAP™. Det er gratis og Open Source software (FOSS) .
    
Du kan bruge en andenJavaAnsøgning Server (f.eks. Jetty) , men vi tester kun med og støtte Tomcat.
     
    
    * Hent Tomcat og udpakning det på din server eller pc.
Af sikkerhedsmæssige årsager er det næsten altid bedst at bruge den nyeste version af Tomcat 10 (version 9 og nedenfor er ikke acceptabel) som er designet til at arbejde medJava21 eller nyere. Nedenfor henvises Tomcat-mappen til som _tomcat_.
        
Advarsel&#33; Hvis du allerede har en Tomcat, der kører nogle andre webapplikationer (særligt særligt) , vi anbefaler, at du installererERDDAP™i in in in in[Et andet Tomcat](/docs/server-admin/additional-information#second-tomcat), fordiERDDAP™behov for forskellige Tomcat indstillinger og bør ikke konkurrere med andre applikationer til hukommelse.
        
        * På Linux,[Download "Core" "tar.gz" Tomcat distribution](https://tomcat.apache.org/download-10.cgi)og udpakning det. Vi anbefaler at pakke det i /usr/local.
        * På en Mac er Tomcat sandsynligvis allerede installeret i /Library/Tomcat, men skal opdatere det til den nyeste version af Tomcat 10.
Hvis du downloader det,[Download "Core" "tar.gz" Tomcat distribution](https://tomcat.apache.org/download-10.cgi)og udpakning det i /Library/Tomcat.
        * På Windows, kan du[Download "Core" "zip" Tomcat distribution](https://tomcat.apache.org/download-10.cgi)  (som ikke roder med Windows-registreringsdatabasen, og som du styrer fra en DOS-kommandolinje) og udpakning det i en passende mappe. (Til udvikling bruger vi "Core" "zip" distribution. Vi laver en /programmer mappe og pakker den der.) Eller du kan downloade "Core" "64-bit Windows zip" distribution, som indeholder flere funktioner. Hvis distributionen er en Windows-installation, vil den sandsynligvis sætte Tomcat i, for eksempel /Program Files/apache-tomcat-10.0.23 .
             
### server.xml{#serverxml} 
*   [server.xml](#serverxml)- I _tomcat_/conf/server.xml-fil, er der to ændringer, du skal foretage for hver af de to&lt;Plug&gt; tags- en for
```
        <Connector port="8080" 
```
og en til
```
        <Conector port="8443"
```
    1.   (Anbefalet anbefalet) Forøg forbindelsenTimeout parameter værdi, måske til 300000 (millisekunder)   (som er 5 minutter) .
    2.   (Anbefalet anbefalet) Tilføj en ny parameter: afslappetQueryChars Hanging\\[\\]|" " " " Dette er valgfrit og lidt mindre sikker, men fjerner behovet for brugere til procentkode disse tegn, når de forekommer i parametrene for en brugerkonto.
             
### indhold.xml{#contentxml} 
* kontekst.xml -- Ressourcer cache - I _tomcat_/conf/context.xml, lige før te&lt;/Context&gt; tag, ændre Ressourcer tag (eller tilføje det, hvis det ikke allerede er der) for at indstille cachen MaxSize parameter til 80000:
    &lt;Ressourcer kachingAlled Hangingtrue" cacheMaxSize80000" /&gt;
Dette undgår mange advarsler i katalina. ud af, at alle starter med
"WARNING\\[Hoved vigtigste\\]org.apache.catalina.webresources.Cache.getResources Kan ikke tilføje ressourcen på\\[/WEB-INF/classes/...]"
         
### Apache Timeout{#apache-timeout} 
* På Linux-computere skal du ændre indstillingerne for Apache timeout, så tidskrævende brugeranmodninger ikke timeout (med hvad der ofte vises som en "Proxy" eller "Bad Gateway" fejl) . Som root-brugeren:
    1. Rediger Apachehttpd.conf-fil (normalt i /etc /httpd/konference/) :
Ændre de eksisterende&lt;Tidsout&gt; indstilling (eller tilføje en i slutningen af filen) til 3600 (sekunder sekunder) , i stedet for standard 60 eller 120 sekunder.
Ændre de eksisterende&lt;ProxyTimeout&gt; indstilling (eller tilføje en i slutningen af filen) til 3600 (sekunder sekunder) , i stedet for standard 60 eller 120 sekunder.
    2. Genstart Apache: /usr/sbin/apachectl -k yndefuld (Men nogle gange er det i en anden mappe) .
             
    * Sikkerheds anbefaling: Se endnu[disse instruktioner](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)for at øge sikkerheden af din Tomcat installation, især for offentlige servere.
         
    * Til offentlighedenERDDAP™installationer på Linux og Macs, det er bedst at opsætte Tomcat (programmet) som tilhører brugeren "tomcat" (en separat bruger med begrænsede tilladelser og hvilke[Ingen adgangskode](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Således kan kun den super bruger skifte til at handle som bruger tomcat. Dette gør det umuligt for hackere at logge ind på din server som bruger tomcat. Og i alle tilfælde skal du gøre det, så tomcat-brugeren har meget begrænsede tilladelser på serverens filsystem (læs+writing+executerettigheder for apache-tomcat-mappen træ og&lt;bigParentDirectory&gt; og read-only privilegier for mapper med data,ERDDAP™behov for adgang til).
        * Du kan oprette en tomcat brugerkonto (som ikke har nogen adgangskode) ved at bruge kommandoen
sudo brugertilføjelse tomcat -s /bin/bash -p '\\* ''
        * Du kan skifte til at arbejde som bruger tomcat ved hjælp af kommandoen
sudo su - tomcat
             (Det vil bede dig om superbruger adgangskode for tilladelse til at gøre dette.) 
        * Du kan stoppe med at arbejde som bruger tomcat ved at bruge kommandoen
udgang
        * De fleste af resten af Tomcat ogERDDAP™setup instruktioner som bruger "tomcat". Senere kører opstart.sh og nedlukning.sh scripts som bruger "tomcat", så Tomcat har tilladelse til at skrive til sine log filer.
        * Efter at have pakket Tomcat, fra moderen af apache-tomcat-mappen:
            
            * Ændre ejerskab af apache-tomcat-mappens træ til brugeren.
klovn -R tomcat apache-tomcat-_10.0.23_
                 (men erstatte det faktiske navn på din tomcat mappe) .
            * Ændre "gruppen" for at være tomcat, dit brugernavn eller navnet på en lille gruppe, der indeholder tomcat og alle administratorer af Tomcat/ERDDAPf.eks.
chgrp -R _your Brugernavn_ apache-tomcat-_10.0.23_
            * Ændre tilladelser, så tomcat og gruppen har læst, skrive, udføre privilegier, f.eks.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Fjern "andre" brugerens tilladelser til at læse, skrive eller udføre:
chmod -R o-rwx apache-tomcat-_10.0.23_
Dette er vigtigt, fordi det forhindrer andre brugere i at læse muligvis følsomme oplysninger iERDDAP™Opsætning af filer.
            
              
### Hukommelseshukommelse{#memory} 
* Sæt Tomcats miljøvariabler
    
På Linux og Macs:
Opret en fil _tomcat_/bin/setenv.sh (eller i Red Hat Enterprise Linux\\[RHEL\\], redigere ~tomcat/conf/tomcat10.conf) at indstille Tomcats miljøvariabler. Denne fil vil blive brugt af _tomcat_/bin/startup.sh og nedlukning.sh. Filen skal indeholde noget som:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (men erstatning af mappenavne fra din computer) .
 (Hvis du tidligere har indstillet JRE\\_HOME, kan du fjerne det.)   
På Macs behøver du sandsynligvis ikke at sætte JAVA\\_HOME.

På Windows:
Opret en fil _tomcat_"bin"setenv.bat for at indstille Tomcats miljøvariabler. Denne fil vil blive brugt af _tomcat_‘bin’startup.bat ogshutdown.bat. Filen skal indeholde noget som:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (men erstatning af mappenavne fra din computer) .
Hvis dette kun er for lokal test, skal du fjerne "-server".
 (Hvis du tidligere har indstillet JRE\\_HOME, kan du fjerne det.) 

-Xmx og -Xms hukommelse indstillinger er vigtige, fordiERDDAP™virker bedre med mere hukommelse. Altid indstillet -Xms til samme værdi som -Xmx.

* Til 32 bit operativsystemer og 32 bitJava:
64 bitJavaer meget bedre end 32 bitJava, men 32 bitJavavil arbejde så længe serveren ikke er virkelig optaget. Jo mere fysisk hukommelse i serveren jo bedre: 4+ GB er virkelig god, 2 GB er okay, mindre anbefales ikke. Med 32 bitJava, selv med rigelig fysisk hukommelse, Tomcat ogJavaKør ikke, hvis du forsøger at sætte -Xmx meget over 1500M (1200M på nogle computere) . Hvis din server har mindre end 2 GB hukommelse, skal du reducere værdien -Xmx (i 'M'egaBytes) til 1/2 af computerens fysiske hukommelse.
* Til 64 bit Betjeningssystemer og 64 bitJava:
64 bitJavavil kun arbejde på et 64 bit operativsystem.
    
    * MedJava8, du skal tilføje \\-d64 til Tomcat CATALINA\\_OPTS parameter i setenv.bat
    * MedJava21, du vælger 64 bitJavanår du downloader en version afJavamarkeret "64 bit".
    
Med 64 bitJava, Tomcat ogJavakan bruge meget høj -Xmx og -Xms indstillinger. Jo mere fysisk hukommelse i serveren jo bedre. Som et forenklet forslag: Vi anbefaler dig sæt -Xmx og -Xms to (i 'M'egaBytes) til 1/2 (eller mindre) af computerens fysiske hukommelse. Du kan se, om Tomcat,Java, ogERDDAP™kører faktisk i 64 bit mode ved at søge efter " bit", iERDDAP's Daily Report e-mail eller i _bigParentDirectory_/logs/[log.txt](/docs/server-admin/additional-information#log)filfil (_bigParentDirectory_ er angivet i[opsætning.xml](#setupxml)) .
#### Billeder af Garbage Collection{#garbage-collection} 
* I nærheden af In In In In In In In In In In In In In InERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)fil, vil du se mange "GC (Ombygning Failure) " beskeder.
Dette er normalt ikke et problem. Det er en hyppig meddelelse fra en normalt driftJavaat sige, at det bare endte en mindre affaldskollektion, fordi det løb ud af rummet i Eden (Afsnittet iJavahanap for meget unge genstande) . Normalt vises beskeden dig _memoryBrug før_\\-&gt;_memoryUse efter_. Hvis disse to tal er tæt sammen, betyder det, at affaldsopsamlingen ikke var produktiv. Meddelelsen er kun et tegn på problemer, hvis det er meget hyppig (hvert par sekunder) , ikke produktive, og tallene er store og ikke voksende, som tilsammen angiver, atJavakræver mere hukommelse, kæmper for at frigøre hukommelse, og er ikke i stand til at frigøre hukommelse. Det kan ske under en stressende tid, så gå væk. Men hvis det fortsætter, det er et tegn på problemer.
* Hvis du ser java.lang.OutOfMemory Error's inERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)fil, se[FjerneMemoryFejl](/docs/server-admin/additional-information#outofmemoryerror)for tips om, hvordan du diagnosticerer og løser problemerne.
         
### Tilladelser{#permissions} 
*   [På Linux og Macs skal du ændre tilladelser](#permissions)af alle\\*.shfiler i _tomcat_/bin/at være eksekverbar af ejeren, f.eks. med
```
    chmod +x \\*.sh  
```
### Skrifttyper{#fonts} 
*   [Skrifttyper til billeder:](#fonts)Vi foretrækker stærkt den gratis[DejaVu skrifttyper](https://dejavu-fonts.github.io/)til den andenJavaskrifttyper. Brug af disse skrifttyper anbefales stærkt, men ikke påkrævet.
    
Hvis du vælger ikke at bruge DejaVu-skrifttyper, skal du ændre skriftfamilieindstillingen i opsætning.xml til&lt;Familietype:SansSerif&lt;/fontFamily&gt;, som er tilgængelig med alleJavadistributioner. Hvis du indstiller skriftfamilie til navnet på en skrifttype, der ikke er tilgængelig,ERDDAP™Du vil ikke indlæse og udskrive en liste over tilgængelige skrifttyper i log.txt-filen. Du skal bruge en af disse skrifttyper.
    
Hvis du vælger at bruge DejaVu-skrifttyper, skal du sørge for, at skriftfamilieindstillingen i opsætning.xml er&lt;font skrifttype Hoteller i nærheden af DejaVu Sans&lt;/fontFamily&gt;.
    
For at installere DejaVu-skrifttyper, skal du downloade[DejaVuFonts.zip](/DejaVuFonts.zip)  (5,522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) og indpakke skriftfilerne til en midlertidig mappe.
    
    * På Linux:
        * Til Linux AdoptiumJavadistributioner, se[disse instruktioner](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Med andreJavaFordelinger: Som Tomcat bruger skal du kopiere skriftfilerne til _JAVA\\_HOME_/lib/fonts såJavakan finde skrifttyperne. Husk: hvis/ når du senere opgraderer til en nyere version afJava, du skal geninstallere disse skrifttyper.
    * På Macs: for hver skriftfil, dobbelt klik på det, og klik derefter på Installer Font.
    * På Windows 7 og 10: I Windows Explorer skal du vælge alle skriftfiler. Højreklik. Klik på Installer.
             
### Test Tomcat{#test-tomcat} 
* Test din Tomcat installation.
    * Linux:
        * Som bruger "tomcat", køre _tomcat_/bin/startup.sh
        * Se din URL + ":8080/" i din browser (fx,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Du skal se Tomcat "Congratulations" side.
Hvis der er problemer, kan du se Tomcat-filen _tomcat_/logs/catalina.out.
    * Mac Mac Mac Mac (Kør tomcat som systemadministratorens bruger) :
        * Kør _tomcat_/bin/startup.sh
        * Se din URL + ":8080/" i din browser (fx,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Bemærk, at din Tomcat som standard kun er tilgængelig af dig. Det er ikke offentligt tilgængeligt.
        * Du skal se Tomcat "Congratulations" side.
Hvis der er problemer, kan du se Tomcat-filen _tomcat_/logs/catalina.out.
    * Windows lokalhost:
        
        * Højreklik på Tomcat-ikonet i systembakken, og vælg "Start service".
        * Udsigt til udsigt[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)eller måske[ http://localhost:8080/ ](http://localhost:8080/), i din browser. Bemærk, at din Tomcat som standard kun er tilgængelig af dig. Det er ikke offentligt tilgængeligt.
        * Du skal se Tomcat "Congratulations" side.
Hvis der er problemer, kan du se Tomcat-filen _tomcat_/logs/catalina.out.
            
### Problemer med Tomcat installation?{#troubles-with-the-tomcat-installation} 
* På Linux og Mac, hvis du ikke kan nå Tomcat ellerERDDAP™  (eller måske kan du bare ikke nå dem fra en computer uden for din firewall) , kan du teste, om Tomcat lytter til port 8080, ved at skrive (som rod) på en kommandolinje af serveren:
```  
    netstat -tuplen | grep 8080  
```
Det skal returnere en linje med noget som:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (hvor '#' er nogle digitalisering) , der angiver, at en "java" proces (formodentlig Tomcat) lytter på port "8080" til "tcp" trafik. Hvis der ikke blev returneret linjer, hvis linjen returneres markant anderledes, eller hvis to eller flere linjer blev returneret, kan der være et problem med portindstillingerne.
* Se Tomcat logfilen _tomcat_/logs/catalina.out. Tomcat problemer og nogleERDDAP™opstartsproblemer er næsten altid angivet der. Dette er almindeligt, når du først opretter opERDDAP™.
* Se billederne[Tomcat](https://tomcat.apache.org/)hjemmeside eller søg på nettet for at hjælpe, men lad os vide de problemer, du havde, og de løsninger, du fandt.
* Se vores udvalg[sektion om at få ekstra støtte](/docs/intro#support).
             
### ERDDAP™Indhold Indhold indhold{#erddap-content} 
3.  [Opsæt op af_tomcat_/content/erddapkonfigurationsfiler.](#erddap-content)  
På Linux, Mac og Windows, download[ErddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (Version 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, af 2024-10-14-14-14) og indpakke det ind i _tomcat_, oprettelse_tomcat_/content/erddap.

    \\[Nogle tidligere versioner er også tilgængelige:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, af 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, af 2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 bytes, MD5 =E26F62E7A06191EE6868C40B9A29362, af 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 bytes, MD5 =E26F62E7A06191EE6868C40B9A29362, af 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 bytes, MD5 =E26F62E7A06191EE6868C40B9A29362, dateret 2023-02-27) 
og indpakke det ind i _tomcat_, oprettelse_tomcat_/content/erddap.\\]
    
#### Andre mappe{#other-directory} 
Til Red Hat Enterprise Linux (RHEL) eller for andre situationer, hvor du ikke har tilladelse til at ændre Tomcat-mappen, eller hvor du ønsker/need at sætte denERDDAP™indholdskatalog på en anden grund (for eksempel, hvis du bruger Jetty i stedet for Tomcat) , unzip erddapContent.zipi den ønskede mappe (til hvilken kun bruger=tomcat har adgang) og sæt denerddapContentDirectorySystemejendom (fx,erddapContentDirectory=~tomcat/content/erddap) så så sådanERDDAP™kan finde denne nye indholdskatalog.
    
### opsætning.xml{#setupxml} 
*   [Læs kommentarerne i_tomcat_/content/erddap/ / / / **opsætning.xml** ](#setupxml)og foretage de ønskede ændringer. setup.xml er filen med alle de indstillinger, der angiver, hvordan dinERDDAP™opfører sig.
For den første opsætning, skal du mindst ændre disse indstillinger:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Når du opretter bigParentDirectory, fra forældremappen af bigParentDirectory:
    
    * Gør brugeren=tomcat ejeren af bigParentDirectory, f.eks.
```
        chown -R tomcat _bigParentDirectory_
```
    * Ændre "gruppen" for at være tomcat, dit brugernavn eller navnet på en lille gruppe, der indeholder tomcat og alle administratorer af Tomcat/ERDDAPf.eks.
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Ændre tilladelser, så tomcat og gruppen har læst, skrive, udføre privilegier, f.eks.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Fjern "andre" brugerens tilladelser til at læse, skrive eller udføre. Dette er vigtigt at forhindre læsning muligvis følsomme oplysninger iERDDAP™log filer og filer med oplysninger om private datasæt.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Miljøvariabler{#environment-variables} 
Begyndende medERDDAP™v2.13,ERDDAP™Administratorer kan tilsidesætte enhver værdi i opsætning.xml ved at angive en miljøvariabel ved navnERDDAP\\__værdinavn_, før du kørerERDDAP™. Brug f.eks.ERDDAP\\_baseUrl tilsidesætter&lt;baseUrl&gt; værdi. Dette kan være praktisk, når du installererERDDAP™med en beholder som Docker, da du kan sætte standardindstillinger i opsætning.xml og derefter levere særlige indstillinger via miljøvariabler. Hvis du leverer hemmelige oplysninger tilERDDAP™via denne metode skal du kontrollere, at oplysningerne forbliver hemmelige.ERDDAP™kun læser miljøvariabler én gang pr. opstart, i første sekund af opstart, så en måde at bruge dette er: sæt miljøvariabler, startERDDAPVent indtilERDDAP™Startes, og sæt derefter miljøvariablerne.
    
### datasets.xml {#datasetsxml} 
* Læs kommentarerne i[ **Arbejde med arbejdetdatasets.xmlFilen fil** ](/docs/server-admin/datasets). Senere, efter du fårERDDAP™kører for første gang (Normalt med kun standarddatasæt) , vil du ændre XML i_tomcat_/content/erddap/ / / / **datasets.xml** for at angive alle de data, du ønsker,ERDDAP™at tjene. Dette er, hvor du vil bruge mængden af din tid, mens du opsætterERDDAP™og senere samtidig opretholde dinERDDAP™.

Du kan se et eksempel[datasets.xmlpå GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (I modsætning til) Nu eller nu (lidt mere sandsynligt) i fremtiden, hvis du ønsker at ændre erddaps CSS-fil, lave en kopi af_tomcat_/content/erddap/images/erddapStart2.css kaldet erddap2.css og derefter foretage ændringer til det. Ændringer til erddap2.css tager kun virkning, nårERDDAP™genstartes og kræver ofte også brugeren at rydde browserens cachede filer.
     
ERDDAP™virker ikke korrekt, hvis opsætningen.xml ellerdatasets.xmlfilen er ikke en veldannet XML-fil. Så efter du redigerer disse filer, er det en god ide at bekræfte, at resultatet er veldannet XML ved at indsætte XML-teksten i en XML-tjeker som[xmlvalidation](https://www.xmlvalidation.com/).
     
### Installer filen erddap.war{#install-the-erddapwar-file} 
4. På Linux, Mac og Windows, download[Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)i _tomcat_/webapps.
     (version 2.26, 607,404,032 bytes, MD5=99a725108b37708e5420986c16a119, af 03-31-2025) 
    
.war-filen er stor, fordi den indeholder høj opløsning kystlinje, grænse og højdedata, der er nødvendige for at oprette kort.
    
    \\[Nogle tidligere versioner er også tilgængelige.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, af 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, af 2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 bytes, MD5=F2CFF893146E932E498FDDBD519B6, af 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, af 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, af 2023-03-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, dateret 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, af 2024-11-07) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Brug Proxy Pass så brugerne ikke behøver at sætte portnummeret, f.eks. :8080, i URL.
På Linux-computere, hvis Tomcat kører i Apache, skal du ændre Apachehttpd.conf-fil (normalt i /etc /httpd/konference/) at tillade HTTP-trafik til/fraERDDAP™uden at kræve portnummeret, f.eks. :8080, i webadressen. Som root-brugeren:
    1. Ændre den eksisterende&lt;VirtualHost&gt; tag (hvis der er en) , eller tilføj en ved udgangen af filen:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Genstart derefter Apache: /usr/sbin/apachectl -k yndefuld (Men nogle gange er det i en anden mappe) .
         
### NGINX{#nginx} 
 (U USANCOMMON) Hvis du bruger[NGINX](https://www.nginx.com/)  (en webserver og belastningsbalancer) :
for at få NGINX ogERDDAP™arbejde korrekt medhttps, du skal sætte følgende uddrag inde i Tomcat-serveren.xml&lt;Vært&gt; blok:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Og i nginx config-filen, skal du indstille disse overskrifter:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Tak til Kyle Wilcox.)   
     
### Start Tomcat{#start-tomcat} 
*    (Jeg anbefaler ikke at bruge Tomcat Web Application Manager. Hvis du ikke er helt lukket og starter Tomcat, før eller senere vil du have PermGen hukommelse problemer.)   
     
*    (I Linux eller Mac OS, hvis du har oprettet en speciel bruger til at køre Tomcat, f.eks. tomcat, huske at gøre følgende trin som den bruger.)   
     
* Hvis Tomcat allerede kører, lukkes Tomcat med (i Linux eller Mac OS) _tomcat_/bin/shutdown.sh
eller eller eller (I Windows) _tomcat_"bin"shutdown.bat
    
På Linux, brug ps -ef|bugsep tomcat før og efter nedlukning.sh for at sikre, at tomcat proces er stoppet. Processen skal være opført før nedlukningen og i sidste ende ikke opført efter nedlukningen. Det kan tage et minut eller to forERDDAP™til fuldstændig lukket ned. Vær tålmodig. Eller hvis det ser ud, at det ikke stopper på sin egen, brug:
drab -9 _processID_
    
* Start Tomcat med (i Linux eller Mac OS) _tomcat_/bin/startup.sh
eller eller eller (I Windows) _tomcat_ "bin"startup.bat

## IsERDDAP™løb?{#is-erddap-running} 
Brug en browser til at forsøge at se http://_www.YourServer.org_/erddap/status.html   
ERDDAP™starter op uden datasæt indlæst. Datasets er indlæst i en baggrundstråd og bliver tilgængelige en-by-one.

### Fejlfinding{#troubleshooting} 
* Når en anmodning fra en bruger kommer i, går det til Apache (på Linux og Mac OS-computere) , så Tomcat, såERDDAP™.
* Du kan se, hvad der kommer til Apache (og relaterede fejl) i Apache log filer.
*   [Dig](/docs/server-admin/additional-information#tomcat-logs)kan se, hvad der kommer til Tomcat (og relaterede fejl) i Tomcat log filer (_tomcat_/logs/catalina.out og andre filer i mappen) .
*   [Dig](/docs/server-admin/additional-information#log)kan se, hvad der kommer tilERDDAP, diagnostiske meddelelser fraERDDAP, og fejlmeddelelser fraERDDAP, i denERDDAP™ &lt;bigParentDirectory&gt;logs/log.txt-fil.
* Tomcat starter ikkeERDDAP™indtil Tomcat får en anmodning omERDDAP™. Så du kan se i Tomcat log filer, hvis det startedeERDDAP™eller hvis der er en fejlmeddelelse relateret til dette forsøg.
* Hvornår Hvornår skal man HvornårERDDAP™starter op, det omdøber den gamleERDDAP™log.txt-fil (logArchivedAt_CurrentTime_.txt) og oprette en ny log.txt-fil. Så hvis log. txt-filen er gammel, det er et tegn på, atERDDAP™har ikke for nylig genstartet.ERDDAP™skriver logoplysninger til en buffer og skriver kun bufferen til logfilen periodisk, men du kan tvingeERDDAP™at skrive bufferen til logfilen ved at besøge.../erddap/status.html.

### Trouble: Gamle version afJava {#trouble-old-version-of-java} 
Hvis du bruger en version afJavadet er for gammel tilERDDAP,ERDDAP™Kør ikke, og du vil se en fejlmeddelelse i Tomcat's logfil som
Undtagelse i tråd "main" java.lang.UunderstøttetClassVersion Fejl:
_some/class/name_: Ustøttet større.minor version _someNumber_
Løsningen er at opdatere til den seneste version afJavaog sørg for, at Tomcat bruger den.

### Trouble: Slow Startup første gang{#trouble-slow-startup-first-time} 
Tomcat skal gøre en masse arbejde første gang en ansøgning somERDDAP™er startet; især skal det pakke den erddap. krig fil (som er som en.zipfilfil) . På nogle servere, det første forsøg på at seERDDAP™boder (30 sekunder?) indtil dette arbejde er færdigt. På andre servere vil det første forsøg mislykkes med det samme. Men hvis du venter 30 sekunder og prøve igen, vil det lykkes, hvisERDDAP™blev installeret korrekt.
Der er ingen fix for dette. Dette er simpelthen, hvordan Tomcat virker. Men det sker kun første gang, efter at du installerer en ny version afERDDAP™.

## Luk og genstart{#shut-down-and-restart} 
I fremtiden, for at lukke (og genstart)  ERDDAP, se[Sådan lukkes du ned og genstart Tomcat ogERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Har du lyst?{#trouble} 
Troubles installation Tomcat ellerERDDAP? Se vores udvalg[sektion om at få ekstra støtte](/docs/intro#support).
## Email Meddelelse om nye versioner afERDDAP {#email-notification-of-new-versions-of-erddap} 
Hvis du vil modtage en e-mail, når en ny version afERDDAP™er tilgængelig eller andre vigtigeERDDAP™Meddelelser, du kan tilmelde digERDDAP™bekendtgørelser liste[her her](https://groups.google.com/g/erddap-announce). Denne liste svarer til omtrent én e-mail hver tredje måned.
## Tilpas tilpasning{#customize} 
[Tilpas din søgningERDDAP™at fremhæve din organisation (Ikke ikkeNOAA ERD) .](#customize)
    * Ændre det banner, der vises øverst på alleERDDAP™.html sider ved at redigere&lt;startBodyHtml5&gt; tag i dindatasets.xmlfil. (Hvis der ikke er en, skal du kopiere standarden fraERDDAP's
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fil inddatasets.xmlog redigere det.) Du kan f.eks.:
        * Brug et andet billede (f.eks. din organisations logo) .
        * Ændre baggrundsfarven.
        * Ændre "ERDDAP" til "_DinOrganization_'sERDDAP" " " "
        * Ændre "Easier adgang til videnskabelige data" til "Easier adgang til _DinOrganization_'s data".
        * Du kan ændre links til din organisation og finansieringskilder.
    * Ændre oplysningerne på venstre side af startsiden ved at redigere oplysningerne&lt;teShortDescriptionHtml&gt; tag i dindatasets.xmlfil. (Hvis der ikke er en, skal du kopiere standarden fraERDDAP's
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fil inddatasets.xmlog redigere det.) Du kan f.eks.:
        * Beskriv hvad din organisation og/eller gruppe gør.
        * Beskrive, hvilken slags data detteERDDAP™har.
    * Hvis du vil ændre ikonet, der vises på browser faner, skal du sætte din organisations favicon. ico in_tomcat_/content/erddap/ Fotos/ . Se endnu[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
