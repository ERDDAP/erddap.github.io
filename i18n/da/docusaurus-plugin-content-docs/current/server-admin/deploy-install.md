---
sidebar_position: 1
---

# Installér
Sådan laver du den indledende opsætning af ERDDAP™ på din server

 ERDDAP™ kan køre på en server, der understøtter Java og Tomcat (og andre programservere som Jetty, men vi støtter dem ikke) .
 ERDDAP™ er blevet testet på Linux (herunder på Amazon 's AWS) Mac, og Windows-computere.

*  **Docker** -- Vi leverer [ ERDDAP™ i en dokker container](https://hub.docker.com/r/erddap/erddap) 
og IOOS tilbyder nu en [Guide til hurtig start til ERDDAP™ i en Docker Container](https://ioos.github.io/erddap-gold-standard/index.html) .
Det er standarden. ERDDAP™ installation, i en Docker container.
Gennem Docker Sammensætte vi giver nem måder at sætte op ssl og overvågning, læse mere i ud [Dokumentation af læger](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Hvis du allerede bruger Docker, vil du sandsynligvis foretrække den Docker version.
Hvis du er på udkig efter at køre på cloud-tjenester, vil du sandsynligvis foretrække Docker version.
*  **Amazon** -- Hvis du installerer ERDDAP™ på en Amazon Web Services EC2 instans, se dette [Amazon Web Services Oversigt](/docs/server-admin/additional-information#amazon) Først.
*  **Linux og Macs** -- ERDDAP™ fungerer godt på Linux og Mac computere. Se vejledningen nedenfor.
*  **Windows** -- Windows er fint til test ERDDAP™ og til personlig brug (se vejledningen nedenfor) ,
men vi anbefaler ikke at bruge det til offentligheden ERDDAP™ deployeringer. Kører ERDDAP™ på Windows kan have problemer:
navnlig ERDDAP™ kan være ude af stand til at slette og / eller omdøbe filer hurtigt. Dette skyldes sandsynligvis antivirus software
   (f.eks. fra McAfee og Norton) som kontrollerer filerne for virus. Hvis du løber ind i dette problem
(som kan ses af fejlmeddelelser i [log.txt](/docs/server-admin/additional-information#log) fil som
"Kan ikke slette"...), ændre antivirus-software indstillinger kan delvist afhjælpe problemet. Eller overveje at bruge en Linux eller Mac server i stedet.

 **Standard ERDDAP™ installationsinstruktioner til Linux, Macs og Windows-computere er:** 

0. Sørg for at alle afhængigheder er installeret. På ikke-Windows-maskiner (Linux og Mac) Du har brug for Csh.

##  Java  {#java} 

1.  [til ERDDAP™ v2.19 +, oprettet Java 21.](#java) 
Af sikkerhedsgrunde er det næsten altid bedst at bruge den nyeste version af Java 21.
Download og installer den nyeste version af
    [Adoptiums OpenJDK (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
For at verificere installationen, køre '/ javaJreBinDirectory / java-version', for eksempel
'/ usr / local / jdk- 21.0.3 + 9 / jre / bin / java -version ".

    ERDDAP™ arbejder med Java fra andre kilder, men vi anbefaler Adoptium, fordi det er den vigtigste, communitysunderstøttet,
fri (som i øl og tale) version af Java 21 der tilbyder langsigtet støtte (gratis opgraderinger i mange år tidligere den oprindelige udgivelse) .
Af sikkerhedshensyn bedes du opdatere din ERDDAP s version af Java regelmæssigt som nye versioner af Java 21

    ERDDAP™ er blevet testet og anvendt i vidt omfang med 21, ikke andre versioner. Af forskellige grunde, vi ikke teste med eller støtte andre versioner af Java .
     
## Tomcat{#tomcat} 

2.  [Sæt op](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat er den mest udbredte Java programserver
som er Java software, der står mellem operativsystemets netværkstjenester og Java server software som ERDDAP™ .
Det er fri og åben kilde software (FOSS) .

Du kan bruge en anden Java Programserver (f.eks. Jetty) Men vi tester kun med og støtter Tomcat.

   * Download Tomcat og pak den ud på din server eller PC.
Af sikkerhedsgrunde er det næsten altid bedst at bruge den nyeste version af Tomcat 10 (version 9 og nedenfor er ikke acceptable) 
som er beregnet til at arbejde med Java 21 eller nyere. Nedenfor omtales Tomcat-mappen som 'tomcat'.

Advarsel&#33; Selv om du allerede har en Tomcat kører nogle anden web program (specielt trekanter) , anbefaler vi at du installerer ERDDAP™ er
      [en anden Tomcat](/docs/server-admin/additional-information#second-tomcat) , fordi ERDDAP™ har brug for forskellige Tomcat indstillinger
og bør ikke skulle kæmpe med andre applikationer til hukommelse.

     * På Linux, [download "Core" tjære .gz "Tomcat distribution](https://tomcat.apache.org/download-10.cgi) og pakke ud.
Vi anbefaler at pakke den ud i '/ usr / local'.
     * På en Mac, er Tomcat sandsynligvis allerede installeret i '/ Library / Tomcat', men bør opdatere det til den nyeste version af Tomcat 10.
Hvis du downloader det, [download "Core" tjære .gz "Tomcat distribution](https://tomcat.apache.org/download-10.cgi) og pakke den ud i '/ Library / Tomcat'.
     * På Windows, kan du [download "Core" "zip" Tomcat distribution](https://tomcat.apache.org/download-10.cgi) 
        (som ikke roder med Windows registreringsdatabasen, og som du styrer fra en DOS kommandolinje) og pakke det ud i en passende mappe.
        (Til udvikling, vi bruger "Core" "zip" distribution. Vi laver en '/ programmer' mappe og pakker den ud der.) 
Eller du kan downloade "Core" "64-bit Windows zip" distribution, som indeholder flere funktioner.
Hvis distributionen er en Windows-installer, vil det sandsynligvis sætte Tomcat i, for eksempel, '/ Program Files / apache- tomcat- 10.0.23'.
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - I 'tomcat / conf / server.xml' fil, der er to ændringer, som du skal gøre til hver af de to ' <Connector> 'tags
   (en for '&lt; Connector port = "8080" "og en for' &lt; Conector port =" 8443 "") .
   1.  (Anbefalet) Forøg parameterværdien "connectionTimeout", måske til 300000 (millisekunder, som er 5 minutter) .
   2.  (Anbefalet) Tilføj en ny parameter: 'relakedQueryChars = "[] | "". Dette er valgfrit og lidt mindre sikkert.
men fjerner behovet for brugere til at indkode disse tegn, når de forekommer i parametrene for en brugers anmodning URL.
             
### content.xml{#contentxml} 

* contekt.xml -- Resources Cache - In 'tomcat / conf / concect.xml', lige før ' </Context> 'tag, ændre Resources tag
   (eller tilføje det, hvis det ikke allerede er der) til at indstille cachen Maks. størrelse parameter til 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Dette undgår mange advarsler i catalina. ud at alle starter med
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeout{#apache-timeout} 

* På Linux-computere, ændre Apache timeout indstillinger, så tidskrævende brugeranmodninger ikke timeout
   (med hvad der ofte vises som en "Proxy" eller "Bad Gateway" fejl) . Som root-bruger:
  * Ændr apacherne ' http d.conf '- fil (som regel i '/ etc / http d / conf / ') :
    * Ændr eksisterende ' <Timeout> 'indstilling (eller tilføje en i slutningen af filen) til 3600 (sekunder) , i stedet for standard 60 eller 120 sekunder.
    * Ændr eksisterende ' <ProxyTimeout> 'indstilling (eller tilføje en i slutningen af filen) til 3600 (sekunder) , i stedet for standard 60 eller 120 sekunder.
  * Genstart apache: '/ usr / sbin / apachectl - k yndefuld' (men nogle gange er det i en anden mappe) .

### Sikkerhed{#security} 
         
* Sikkerhedsanbefaling: Se [disse instruktioner](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) til at øge sikkerheden af
din Tomcat installation, især for offentlige servere.
         
* Til offentligheden ERDDAP™ installationer på Linux og Macs, er det bedst at oprette Tomcat (programmet) som tilhører brugerens tomcat '
   (en separat bruger med begrænsede tilladelser, og som [har ingen adgangskode](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Således kan kun superbrugeren skifte til at fungere som bruger 'tomcat'. Dette gør det umuligt for hackere at logge ind på din server som bruger 'tomcat'.
Og under alle omstændigheder, bør du gøre det, så "tomcat" bruger har meget begrænsede tilladelser på serveren filsystem (læse + skrive + udføre privilegier
til mappetræet "apachetomcat" og " <bigParentDirectory> 'og read- only privilegier for mapper med data, der ERDDAP™ ).
  * Du kan oprette 'tomcat' brugerkonto (som ikke har nogen adgangskode) ved at bruge kommandoen:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Du kan skifte til at arbejde som bruger 'tomcat' ved at bruge kommandoen
    ```
    sudo su - tomcat
    ```
     (Det vil bede dig om superuser password for tilladelse til at gøre dette.) 
    * Du kan stoppe med at arbejde som bruger tomcat ved hjælp af kommandoen
    ```
    exit
    ````
    * Gør det meste af resten af Tomcat og ERDDAP™ opsætningsvejledning som bruger 'tomcat'. Senere køre 'startup.sh' og 'shoutdown.sh' scripts som bruger 'tomcat'
så Tomcat har tilladelse til at skrive til sine logfiler.
    * Efter udpakning Tomcat, fra forælderen af 'apache- tomcat' mappe:
      * Skift ejerskab af apache- tomcat mappe træ til tomcat bruger.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (men erstatte det faktiske navn på din tomcat mappe) .
      * Ændre "gruppe" at være tomcat, dit brugernavn, eller navnet på en lille gruppe, der omfatter tomcat og alle administratorer af Tomcat / ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Ændre tilladelser, så tomcat og gruppen har læst, skrive, udføre privilegier:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Fjern "andre" brugerrettigheder til at læse, skrive eller udføre:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Dette er vigtigt, fordi det forhindrer andre brugere i at læse muligvis følsomme oplysninger i ERDDAP™ opsætningsfiler.

### Hukommelse{#memory} 

Sæt Tomcats miljøvariabler

* På Linux og Macs:
Opret en fil 'tomcat / bin / setenv.sh' (eller i Red Hat Enterprise Linux \\[ RHEL \\] , rediger '~ tomcat / conf / tomcat10.conf') til at indstille Tomcats miljøvariabler.
Denne fil vil blive brugt af 'tomcat / bin / startup.sh' og 'shotdown.sh'. Filen skal indeholde noget som:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (men erstatte mappenavne fra din computer) .
   (Hvis du tidligere har sat 'JRE _ HOME', kan du fjerne det.) 
På Macs behøver du nok ikke sætte 'JAVA _ HOME'.

* På Windows:
Opret en fil 'tomcat\\ bin\\ setenv.bat' for at indstille Tomcats miljøvariabler.
Denne fil vil blive brugt af 'tomcat\\ bin\\ startup.bat' og ' shutdown.bat ".
Filen skal indeholde noget som:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (men erstatte mappenavne fra din computer) .
Hvis dette er bare for lokal test, fjerne "-server".
   (Hvis du tidligere har sat 'JRE _ HOME', kan du fjerne det.) 

'-Xmx' og '-Xms' hukommelsesindstillingerne er vigtige, fordi ERDDAP™ fungerer bedre med mere hukommelse.
Sæt altid '-Xms' til samme værdi som '-Xmx'.

* til 32 bit styresystemer og 32 bit Java :
64 bit Java er meget bedre end 32 bit Java , men 32 bit Java vil arbejde, så længe serveren er ikke rigtig travlt.
Jo mere fysisk hukommelse i serveren jo bedre: 4 + GB er virkelig godt, 2 GB er okay, mindre anbefales ikke.
med 32 bit Java , selv med rigelige fysiske hukommelse, Tomcat og Java vil ikke køre, hvis du forsøger at sætte '-Xmx' meget over 1500M (1200M på nogle computere) .
Hvis din server har mindre end 2GB hukommelse, reducere '-Xmx' værdi (in 'M' egaBytes) til 1 / 2 af computerens fysiske hukommelse.

* For 64 bit Operativsystemer og 64 bit Java :
64 bit Java vil kun arbejde på en 64 bit operativsystem.
  * med Java 8, du skal tilføje '-d64' til Tomcat 'CATALINA _ OPTS' parameter i 'setenv.bat'.
  * med Java 21, du vælger 64 bit Java når du downloader en version af Java Mærket "64 bit".

med 64 bit Java , Tomcat og Java kan bruge meget høje '-Xmx' og '-Xms' indstillinger. Jo mere fysisk hukommelse i serveren jo bedre.
Som et forenklet forslag: vi anbefaler, at du sætter '-Xmx' og '-Xms' til (in 'M' egaBytes) til 1 / 2 (eller mindre) om computerens fysiske hukommelse.
Du kan se om Tomcat, Java , og ERDDAP™ er faktisk kører i 64 bit mode ved at søge efter "bit" i ERDDAP 's Daily Report e- mail
eller i "bigParentDirectory / logs / [log.txt](/docs/server-admin/additional-information#log) 'fil ('Big ParentDirectory' er specificeret i [setup.xml](#setupxml) ) .

#### Affaldsindsamling{#garbage-collection} 

* I ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fil, vil du se mange "GC (Tildelingsfejl) "beskeder.
Det er normalt ikke et problem. Det er en hyppig besked fra en normalt fungerende Java at sige, at den lige er færdig med et mindre skrald
samling, fordi det løb tør for plads i Eden (den del af Java bunker til meget unge objekter) . Normalt viser beskeden dig
'memoryUseBefore- &gt; memoryUseAfter'. Hvis de to tal er tæt på hinanden, betyder det, at affaldssamlingen ikke var produktiv.
Budskabet er kun et tegn på problemer, hvis det er meget hyppigt (hvert par sekunder) , ikke produktive, og antallet er stort og ikke vokser,
som tilsammen viser, at Java har brug for mere hukommelse, kæmper for at frigøre hukommelse, og er ude af stand til at frigøre hukommelse.
Dette kan ske i en stressende tid, derefter gå væk. Men hvis det fortsætter, er det et tegn på problemer.
* Hvis du ser 'java.lang.OutOfMemoryError er i ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) fil
Se [OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) til tips om, hvordan man diagnosticerer og løser problemerne.
         
### Tilladelser{#permissions} 

*  [På Linux og Macs, ændre tilladelser](#permissions) af alle '* .sh' -filer i 'tomcat / bin /', som ejeren kan udføre:
  ```
  chmod +x *.sh
  ```

### Skrifttyper{#fonts} 

*  [Skrifttyper til billeder:](#fonts) Vi foretrækker det frie [DejaVu skrifttyper](https://dejavu-fonts.github.io/) til det andet Java skrifttyper.
Brug af disse skrifttyper anbefales kraftigt, men ikke påkrævet.

Hvis du vælger ikke at bruge DejaVu skrifttyper, skal du ændre fontFamily indstillingen i setup.xml til ' <fontFamily> SansSerif </fontFamily> ",
som er tilgængelig med alle Java distributioner. Hvis du sætter ' <fontFamily> 'til navnet på en skrifttype, der ikke er tilgængelig, ERDDAP™ vil ikke indlæse
og vil udskrive en liste over tilgængelige skrifttyper i log.txt-filen. Du skal bruge en af disse skrifttyper.

Hvis du vælger at bruge DejaVu skrifttyper, skal du sørge for <fontFamily> 'indstilling i setup.xml er' <fontFamily> DejaVu Sans </fontFamily> ".

For at installere DejaVu skrifttyper, skal du downloade [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 bytes, MD5 = 33E1E61FAB06A547851ED308B4FFEF42) 
og zip skrifttypefilerne til en midlertidig mappe.

  * På Linux:
    * For Linux Adoptium Java distributioner, se [disse instruktioner](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Med andet Java distributioner: Som 'tomcat' bruger, kopiere skrifttype filer i '$JAVA _ HOME / lib / fonts' så Java kan finde skrifttyperne.
Husk: hvis / når du senere opgraderer til en nyere version af Java du skal geninstallere disse skrifttyper.
  * På Macs: for hver skrifttype fil, dobbeltklik på den og klik derefter på Installer skrifttype.
  * På Windows 7 og 10: i Windows Stifinder, skal du vælge alle de skrifttype filer. Højreklik. Klik på Installer.
             
### Test af tomat{#test-tomcat} 

* Test din Tomcat installation.
  * Linux:
    * Som bruger "tomcat", køre "tomcat / bin / startup.sh".
    * Vis din URL + ": 8080 /" i din browser (f.eks. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (køre tomcat som systemadministrator bruger) :
    * Kør 'tomcat / bin / startup.sh'.
    * Vis din URL + ": 8080 /" i din browser (f.eks. [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Bemærk, at som standard, din Tomcat er kun tilgængelig for dig. Det er ikke offentligt tilgængeligt.
  * Windows localhost:
    * Højreklik på Tomcat ikonet i systembakken, og vælg "Start service".
    * Vis [http://127.0.0.1:8080/](http://127.0.0.1:8080/) eller måske [http://localhost:8080/](http://localhost:8080/) , i din browser. Bemærk, at som standard, din Tomcat er kun tilgængelig for dig. Det er ikke offentligt tilgængeligt.

Du skulle se Tomcat "Tillykke" siden.

Hvis der er problemer, se Tomcat logfilen på 'tomcat / logs / catalina.out'.

### Problemer med Tomcats installation?{#troubles-with-the-tomcat-installation} 

* På Linux og Mac, hvis du ikke kan nå Tomcat eller ERDDAP™   (eller måske kan du bare ikke nå dem fra en computer uden for din firewall) ,
du kan teste hvis Tomcat lytter til port 8080, ved at skrive (som rod) på en kommandolinje på serveren:

  ```
  netstat -tuplen | grep 8080
  ```

Det burde vende tilbage en linje med noget som:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (hvor '#' er et ciffer) , der angiver, at en java-proces (Formentlig Tomcat) lytter på havnen "8080" for "tcp" trafik.
Hvis ingen linjer blev returneret, hvis linjen returneret er betydeligt anderledes, eller hvis to eller flere linjer blev returneret, så kan der være et problem med portindstillingerne.

* Se tomcat-logfilen "tomcat / logs / catalina.out". Tomcat problemer og nogle ERDDAP™ opstart problemer er næsten altid angivet der.
Dette er almindeligt, når du er første opsætning ERDDAP™ .

* Se [Tomcat](https://tomcat.apache.org/) hjemmeside eller søge på nettet efter hjælp, men lad os vide de problemer, du havde, og de løsninger, du fandt.

* Se vores [sektion om at få yderligere støtte](/docs/intro#support) .
             
###  ERDDAP™ Indhold{#erddap-content} 
3.   [Opsætning af 'tomcat / content / erddap' - indstillingsfiler.](#erddap-content) 
På Linux, Mac og Windows, download [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
og zip det ind i 'tomcat' mappe, skabe 'tomcat / content / erddap'.

_ _ Version 1.0.0, 20333 bytes, MD5 = 2B8D2A5AE5ED73E3A42B529C168C60B5, dateret 2024-10- 14 _ _

Nogle tidligere versioner er også tilgængelige:

    *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 byte, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, dateret 2022- 02- 16) 
    *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 byte, MD5 = 8F892616BAEEF2DF0F4BB036DCB4AD7C, dateret 2022- 02- 16) 
    *  [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19810 byte, MD5 = 1E26F62E7A06191EE6868C40B9A29362, dateret 2022- 10- 09) 
    *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19810 bytes, MD5 = 1E26F62E7A06191EE6868C40B9A29362, dateret 2022- 12- 08) 
    *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19810 byte, MD5 = 1E26F62E7A06191EE6868C40B9A29362, dateret 2023- 02- 27) 

#### Andet register{#other-directory} 

For Red Hat Enterprise Linux (RHEL) eller til andre situationer, hvor du ikke har tilladelse til at ændre Tomcat-mappen, eller hvor du ønsker / har brug for
til ERDDAP™ indhold mappe i en anden placering af en anden grund (for eksempel, hvis du bruger Jetty i stedet for Tomcat) ,
unzip 'erddapContent .zip 'ind i den ønskede mappe (som kun tomcat-brugeren har adgang til) og sæt ' erddapContentDirectory 'System ejendom
 (f.eks. " erddapContentDirectory  =~tomcat/content/erddap ') så ERDDAP™ kan finde denne nye indholdsmappe.

### setup.xml{#setupxml} 

*  [Læs kommentarerne i 'tomcat / content / erddap / setup.xml'](#setupxml) og foretage de ønskede ændringer. setup.xml er filen med alle de indstillinger, der angiver, hvordan din ERDDAP™ Opfør dig ordentligt.

For den indledende opsætning, skal du mindst ændre disse indstillinger:
      * ' <bigParentDirectory> '
      * ' <emailEverythingTo> '
      * ' <baseUrl> '
      * ' <email...> 'indstillinger
      * ' <admin...> 'indstillinger
      * ' <baseHttpsUrl> ' (når du sætter op https ) 

Når du opretter den store ParentDirectory, fra forælder mappe af store ParentDirectory:

    * Gør 'tomcat' brugeren til ejer af 'big ParentDirectory':
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Ændre "gruppe" at være tomcat, dit brugernavn, eller navnet på en lille gruppe, der omfatter tomcat og alle administratorer af Tomcat / ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Ændre tilladelser, så tomcat og gruppen har læst, skrive, udføre privilegier:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Fjern "andre" brugerens tilladelser til at læse, skrive eller udføre. Dette er vigtigt for at forhindre læsning muligvis følsomme oplysninger
er ERDDAP™ log filer og filer med information om private datasæt.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Miljøvariabler{#environment-variables} 

Start med ERDDAP™ v2.13 ERDDAP™ administratorer kan tilsidesætte enhver værdi i setup.xml ved at angive en miljøvariabel
navngivet ' ERDDAP _ valueName 'før kørsel ERDDAP™ . For eksempel, brug ' ERDDAP _ baseurl 'tilsidesætter' <baseUrl> 'værdi.
Dette kan være praktisk, når du installerer ERDDAP™ med en beholder som Docker, som du kan sætte standard indstillinger i setup.xml
og derefter levere særlige indstillinger via miljøvariabler. Hvis du leverer hemmelige oplysninger til ERDDAP™ via denne metode
Sørg for at kontrollere, at oplysningerne forbliver hemmelige. ERDDAP™ kun læser miljøvariabler én gang pr. opstart,
i første sekund af opstart, så en måde at bruge dette er: indstille miljøvariabler, starte ERDDAP ,
Vent til ERDDAP™ er startet, derefter frakoble miljøvariablerne.

###  datasets.xml  {#datasetsxml} 

* Læs kommentarerne i [ **Arbejde med datasets.xml Fil** ](/docs/server-admin/datasets) . Senere, efter du får ERDDAP™ kører
for første gang (normalt med bare standard datasæt) , vil du ændre XML i 'tomcat / content / erddap / datasets.xml '
at angive alle de datasæt, du ønsker din ERDDAP™ til at tjene. Det er her du vil tilbringe størstedelen af din tid
under opsætning ERDDAP™ og senere, mens du vedligeholder din ERDDAP™ .

Du kan se et eksempel [ datasets.xml om GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Usandsynligt) Nu eller (lidt mere sandsynligt) i fremtiden, hvis du ønsker at ændre erddaps CSS-fil, kopiere
'tomcat / content / erddap / images / erddapStart2.css' to 'tomcat / content / erddap / images / erddap2.css' og derefter foretage ændringer i det.
Ændringer i 'erddap2.css' får kun virkning, når ERDDAP™ er genstartet og ofte også kræver, at brugeren til at rydde browserens cache filer.
     
 ERDDAP™ vil ikke virke korrekt, hvis setup.xml eller datasets.xml fil er ikke en velformet XML-fil. Så efter du har redigeret disse filer,
det er en god idé at kontrollere, at resultatet er velformet XML ved at indsætte XML tekst i en XML-checker som [xmlvalidation](https://www.xmlvalidation.com/) .
     
### Installer erddap. krigsfil{#install-the-erddapwar-file} 

4. På Linux, Mac og Windows, _ _ download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) _ _ into 'tomcat / webapps':

_ _ Version 2.28.0, 620,824,288 bytes, MD5 = f948b2ba603f65a83ac67af43da9e4c2, dateret 2025- 08- 29 _ _

Den .war fil er stor, fordi det indeholder høj opløsning kystlinje, grænse, og elevation data er nødvendige for at skabe kort.

Nogle tidligere versioner er også tilgængelige.

   *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 byte, MD5 = 5FEA912B5D42E50EAB9591F773EA848D, dateret 2022- 02- 16) 
   *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bytes, MD5 = 461325E97E7577EC671DD50246CCFB8B, dateret 2022- 02- 23) 
   *  [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD5 = F2CFF805893146E932E498FDDBD519B6, dateret 2022- 10- 09) 
   *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 byte, MD5 = 2B33354F633294213AE2AFDCF4DA6D0, dateret 2022- 12- 08) 
   *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5 = D843A043C506725EBD6F8EFDCCA8FD5F, dateret 2023- 03- 03) 
   *  [2, 24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5 = 970fbee172e28b0b8a07756eecbc898e, dateret 2024- 06- 07) 
   *  [2, 25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5 = 652AFC9D1421F00B5F789DA2C4732D4C, dateret 2024- 11- 07) 
   *  [2, 26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bytes, MD5 = 99a725108b37708e5420986c161616a119, dateret 2025- 03- 31) 
   *  [2, 27, 0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bytes, MD5 = 3b2086c659ee4145c2ff447bf4ef7, dateret 2025- 06- 11) 

### Indstil proxy (implementeringsspecifik)  {#proxy} 

 ERDDAP™ er typisk indsat bag en webserver reverse proxy at tillade det at blive serveret på standard HTTP-porte (80 og 443) .
SSL / TLS afslutning er ofte hængt på webserverens proxy lag så godt. Specifikationerne afhænger af kravene til hver indsættelse.

#### Apache{#apache} 

1. Sørg for, at 'mod _ proxy' og 'mod _ proxy _ http 'er indlæst:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Ændr eksisterende ' <VirtualHost> 'tag (hvis der er en) , eller tilføje en i slutningen af filen:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Hvis ERDDAP™ er serveret på en anden sti end '/ erddap', også indstille 'X-Forwarded-Prefix' header til
sti segment _ før _ '/ erddap'. Denne indstilling ville være passende for en ERDDAP™ serveret på
'/ subpath / erddap':

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Derefter genstart Apache: '/ usr / sbin / apachectl - k yndefuld' (men nogle gange er det i en anden mappe) .
         
#### NGINX{#nginx} 

I nginx config fil, indstille disse overskrifter:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Hvis ERDDAP™ er serveret på en anden sti end '/ erddap', også indstille 'X-Forwarded-Prefix' header til
sti segment _ før _ '/ erddap'. Denne indstilling ville være passende for en ERDDAP™ serveret på
'/ subpath / erddap':

```
proxy_set_header X-Forwarded-Prefix /subpath
```


For at få NGINX og ERDDAP™ arbejde korrekt med https , Du er nødt til at sætte følgende snuppet inde i Tomcat server.xml ' <Host> 'blok:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Start tomcat{#start-tomcat} 

*  (Jeg anbefaler ikke at bruge Tomcat Web Application Manager. Hvis du ikke helt nedlukning og opstart Tomcat, før eller senere vil du have PermGen hukommelse problemer.) 
*  (I Linux eller Mac OS, hvis du har skabt en særlig bruger til at køre Tomcat, fx tomcat, huske at gøre følgende trin som denne bruger.) 
* Hvis Tomcat allerede kører, lukke ned Tomcat med (i Linux eller Mac OS) 'tomcat / bin / shortdown .shh'
eller (i Windows) 'tomcat\\ bin\\ shutdown.bat '

På Linux, brug 'ps - ef | grep tomcat 'før og efter' shutdown.sh 'for at sikre, at tomcat processen er stoppet.
Processen skal angives før nedlukning og i sidste ende ikke anført efter nedlukning.
Det kan tage et minut eller to for ERDDAP™ at lukke ned. Vær tålmodig. Eller hvis det ser ud som om det ikke vil stoppe på egen hånd, bruge:
'kill -9 <processID> '
* Start Tomcat med (i Linux eller Mac OS) "tomcat / bin / startup.sh" eller (i Windows) 'tomcat\\ bin\\ startup.bat'

## er ERDDAP™ Løb?{#is-erddap-running} 

Brug en browser til at prøve at sehttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ starter op uden nogen datasæt indlæst. Datasættene er indlæst i en baggrundstråd og bliver således tilgængelige en-by-one.

### Fejlfinding{#troubleshooting} 

* Når en anmodning fra en bruger kommer ind, det går til Apache (på Linux og Mac OS-computere) , så Tomcat, så ERDDAP™ .
* Du kan se, hvad der kommer til apache (og tilhørende fejl) i Apache logfilerne.
*    [Dig](/docs/server-admin/additional-information#tomcat-logs) kan se hvad der kommer til Tomcat (og tilhørende fejl) 
i Tomcat logfiler ('tomcat / logs / catalina.out' og andre filer i denne mappe) .
*    [Dig](/docs/server-admin/additional-information#log) kan se hvad der kommer til ERDDAP , diagnostiske meddelelser fra ERDDAP ,
og fejlmeddelelser fra ERDDAP , i ERDDAP™ ' <bigParentDirectory> / logs / log.txt '- fil.
* Tomcat starter ikke ERDDAP™ indtil Tomcat får en anmodning om ERDDAP™ . Så du kan se i Tomcat logfiler, hvis det
startet ERDDAP™ eller hvis der er en fejlmeddelelse relateret til dette forsøg.
* Hvornår ERDDAP™ starter op, det omdøber den gamle ERDDAP™ log.txt-fil ('logArchived på <CurrentTime> .txt ") og opretter en ny log.txt fil.
Så hvis log.txt-filen er gammel, er det et tegn på, at ERDDAP™ er ikke for nylig genstartet. ERDDAP™ skriver log info til en buffer
og kun skriver buffer til logfilen regelmæssigt, men du kan tvinge ERDDAP™ at skrive bufferen til logfilen ved at besøge
' /erddap/status.html ".

### Problemer: Gamle version af Java  {#trouble-old-version-of-java} 

Hvis du bruger en version af Java der er for gammel til ERDDAP , ERDDAP™ vil ikke køre, og du vil se en fejlmeddelelse i Tomcat logfil som

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Løsningen er at opdatere til den seneste version af Java og sørg for, at Tomcat bruger den.

### Problemer: langsom start første gang{#trouble-slow-startup-first-time} 

Tomcat skal gøre en masse arbejde første gang en ansøgning som ERDDAP™ er startet; især, det er nødt til at pakke "erddap.war" fil
 (som er som en .zip fil) . På nogle servere, det første forsøg på at se ERDDAP™ boder (30 sekunder?) indtil arbejdet er færdigt.
På andre servere vil det første forsøg mislykkes med det samme. Men hvis du venter 30 sekunder og prøve igen, vil det lykkes, hvis ERDDAP™ blev installeret korrekt.

Der er ingen løsning. Sådan fungerer Tomcat. Men det sker kun første gang efter du installerer en ny version af ERDDAP™ .

## Luk ned og genstart{#shut-down-and-restart} 

I fremtiden, at lukke ned (og genstart)   ERDDAP™ , se [Sådan lukker ned og genstarter Tomcat og ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Problemer?{#trouble} 

Problemer med at installere Tomcat eller ERDDAP™ ? Se vores [sektion om at få yderligere støtte](/docs/intro#support) .

## E-mail meddelelse om nye versioner af ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Hvis du ønsker at modtage en e-mail, når en ny version af ERDDAP™ er tilgængelig eller anden vigtig ERDDAP™ meddelelser
du kan deltage i ERDDAP™ Meddelelsesliste [her](https://groups.google.com/g/erddap-announce) . Denne liste gennemsnit omkring en e-mail hver tredje måned.

## Tilpas{#customize} 

*  [Tilpas din ERDDAP™ at fremhæve din organisation (ikke NOAA   ERD ) .](#customize) 
* Skift banner, der vises øverst på alle ERDDAP™ html sider ved at redigere ' <startBodyHtml5> 'Mærke i din' datasets.xml 'fil.
(Hvis der ikke er en, kopiere standarden fra ERDDAP™ 'tomcat / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml' fil
ind ' datasets.xml 'og redigere det.) For eksempel kan du:
  * Brug et andet billede (Dvs. din organisations logo) .
  * Ændr baggrundsfarven.
  * Ændr " ERDDAP™ "to" _ YourOrganisation _ 's ERDDAP™ "
  * Skift "Nemmere adgang til videnskabelige data" til "Nemmere adgang til _ YourOrganisation _ s data".
  * Ændre "Bragt til dig af" links til at være links til din organisation og finansiering kilder.
* Ændre oplysningerne på venstre side af hjemmesiden ved at redigere ' <theShortDescriptionHtml> 'Mærke i din' datasets.xml 'fil.
(Hvis der ikke er en, kopiere standarden fra ERDDAP™ 'tomcat / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml' fil
ind ' datasets.xml 'og redigere det.) For eksempel kan du:
  * Beskriv, hvad din organisation og / eller gruppe gør.
  * Beskriv hvilken slags data dette ERDDAP™ har.
  * For at ændre ikonet, der vises på browserfaneblade, skal du sætte din organisations favør. ico in 'tomcat / content / erddap / images /'.
Sehttps://en.wikipedia.org/wiki/Favicon.
