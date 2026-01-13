---
sidebar_position: 1
---

# Installera
Hur man gör den inledande inställningen av ERDDAP™ på din server

 ERDDAP™ kan köras på någon server som stöder Java och Tomcat (och andra programservrar som Jetty, men vi stöder dem inte.) .
 ERDDAP™ har testats på Linux (inklusive Amazons AWS) Mac och Windows-datorer.

*  **Docker** ----- Vi tillhandahåller [ ERDDAP™ I en Docker container](https://hub.docker.com/r/erddap/erddap) 
IOOS erbjuder nu en [Snabbstartguide för ERDDAP™ I en Docker Container](https://ioos.github.io/erddap-gold-standard/index.html) .
Det är standarden ERDDAP™ installation, i en Docker behållare.
Genom Docker Komponera vi ger enkla sätt att ställa in ssl och övervakning, läs mer ut [Docker dokumentation](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Om du redan använder Docker kommer du förmodligen att föredra Docker-versionen.
Om du vill köra på molntjänster kommer du förmodligen att föredra Docker-versionen.
*  **Amazon Amazon Amazon Amazon** ----- Om du installerar ERDDAP™ på en Amazon Web Services EC2-instans, se detta [Amazon Web Services översikt](/docs/server-admin/additional-information#amazon) Först.
*  **Linux och Macs** ----- ERDDAP™ fungerar bra på Linux och Mac-datorer. Se instruktionerna nedan.
*  **Windows Windows** ----- Windows är bra för testning ERDDAP™ och för personligt bruk (se instruktionerna nedan) ,
Men vi rekommenderar inte att du använder den för allmänheten ERDDAP™ Utplaceringar. Running ERDDAP™ på Windows kan ha problem:
i synnerhet, ERDDAP™ kan vara oförmögen att radera och/eller byta namn snabbt. Detta beror förmodligen på antivirusprogram
   (från McAfee och Norton) som kontrollerar filerna för virus. Om du stöter på detta problem
(som kan ses med felmeddelanden i [Log.txt](/docs/server-admin/additional-information#log) fil som
"Det går att ta bort ..."), ändra antivirusprogramvarans inställningar kan delvis lindra problemet. Eller överväga att använda en Linux- eller Mac-server istället.

 **Standarden ERDDAP™ installationsanvisningar för Linux, Macs och Windows-datorer är:** 

0. Se till att alla beroenden är installerade. På icke-Windows maskiner (Linux och Mac) Du behöver csh.

##  Java  {#java} 

1.  [För ERDDAP™ v2.29.0+, upprätta Java 25.](#java) 
Av säkerhetsskäl är det nästan alltid bäst att använda den senaste versionen av Java 25.
Ladda ner och installera den senaste versionen av
    [Adoptium OpenJDK (Temurin) 25 25 25 25 (LTS) ](https://adoptium.net/temurin/releases/?version=25) .
För att verifiera installationen, kör `/javaJreBinDirectory/java -version` till exempel
    `/usr/local/jdk-25.0.1+8/jre/bin/java -version` .

    ERDDAP™ arbete med Java från andra källor, men vi rekommenderar Adoptium eftersom det är det viktigaste, community-stödda.
Gratis gratis (som i öl och tal) version av Java 25 som erbjuder långsiktig support (gratis uppgraderingar under många år förbi den första releasen) .
Av säkerhetsskäl, vänligen uppdatera din ERDDAP version av Java periodiskt som nya versioner av Java 25 blir tillgängligt från Adoptium.

    ERDDAP™ har testats och använts i stor utsträckning med 25, inte andra versioner. Av olika skäl testar vi inte med eller stöder andra versioner av Java .
     
## Tomcat{#tomcat} 

2.  [Ställ in](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat är den mest använda Java Applikationsserver,
som är Java programvara som står mellan operativsystemets nätverkstjänster och Java Server programvara som ERDDAP™ .
Det är gratis och öppen programvara (FOSS) .

Du kan använda en annan Java Applikationsserver (t.ex. Jetty) Vi testar bara med och stöder Tomcat.

   * Ladda ner Tomcat och packa upp den på din server eller PC.
Av säkerhetsskäl är det nästan alltid bäst att använda den senaste versionen av Tomcat 10. (version 9 och nedan är inte acceptabla) 
som är utformad för att arbeta med Java 25 eller nyare. Nedan kommer Tomcat-katalogen att kallas `Tomcat` .

Varning&#33;__ Om du redan har en Tomcat kör någon annan webbapplikation (Särskilt TREDDS) Vi rekommenderar att du installerar ERDDAP™ in i
      [En andra Tomcat](/docs/server-admin/additional-information#second-tomcat) för att ERDDAP™ behöver olika Tomcat-inställningar
och bör inte behöva brottas med andra program för minne.

     * på Linux, [Ladda ner "Core" "Tar .gz Tomcat distribution](https://tomcat.apache.org/download-10.cgi) och packa upp den.
Vi rekommenderar att packa upp den i `/usr/lokal` .
     * På en Mac är Tomcat förmodligen redan installerat `/Library/Tomcat` , men bör uppdatera den till den senaste versionen av Tomcat 10.
Om du laddar ner den, [Ladda ner "Core" "Tar .gz Tomcat distribution](https://tomcat.apache.org/download-10.cgi) och packa upp den `/Library/Tomcat` .
     * På Windows kan du [Ladda ner "Core" "zip" Tomcat distribution](https://tomcat.apache.org/download-10.cgi) 
        (som inte röra med Windows-registret och som du styr från en DOS-kommandorad) och packa upp den i en lämplig katalog.
        (För utveckling använder vi "Core" "zip" distribution. Vi gör en `/program` Katalog och packa upp den där.) 
Eller du kan ladda ner "Core" "64-bitars Windows zip" -distributionen, som innehåller fler funktioner.
Om distributionen är en Windows-installatör kommer det förmodligen att sätta Tomcat i till exempel. `/Programfiler/apache-tomcat-10.0.23` .
             
### Server.xml{#serverxml} 

*  [Server.xml](#serverxml) - I `tomcat/conf/server.xml` fil, det finns två ändringar som du bör göra för var och en av de två ` <Connector> ` taggar
   (En för `&lt;Connector port="8080"` och en för `&lt;Conector port="8443"` ) .
   1.  (Rekommenderas) Öka `anslutning Timeout` parametervärde, kanske till 300 000 (millisekunder, som är 5 minuter) .
   2.  (Rekommenderas) Lägg till en ny parameter: `avslappnad QueryChars="[] | "` . Detta är frivilligt och något mindre säkert,
men tar bort behovet av användare att procentkoda dessa tecken när de förekommer i parametrarna för en användares begäran URL.
             
### innehåll.xml{#contentxml} 

* sammanhang.xml ----- Resurser Cache - I `tomcat/conf/context.xml` strax före ` </Context> ` tag, ändra Resources tag
   (Eller lägg till det om det inte redan finns där) att ställa in cache MaxSize parameter till 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Detta undviker många varningar i catalina. Allt börjar med
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeout{#apache-timeout} 

* På Linux-datorer, ändra Apache timeout-inställningarna så att tidskrävande användarförfrågningar inte timeout
   (med vad som ofta visas som en "Proxy" eller "Bad Gateway" fel) . Som rotanvändare:
  * Ändra Apache ` http d.conf` fil (vanligtvis i `/etc/ http d/conf/` ) Från:
    * Ändra befintliga ` <Timeout> ` Inställning (eller lägga till en i slutet av filen) till 3600 (sekunder) I stället för standard 60 eller 120 sekunder.
    * Ändra befintliga ` <ProxyTimeout> ` Inställning (eller lägga till en i slutet av filen) till 3600 (sekunder) I stället för standard 60 eller 120 sekunder.
  * Starta om Apache: `/usr/sbin/apachectl K graciös`   (Men ibland är det i en annan katalog) .

### Säkerhet{#security} 
         
* Säkerhetsrekommendation: Se [Dessa instruktioner](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) öka säkerheten för
Din Tomcat-installation, speciellt för offentliga servrar.
         
* För allmänheten ERDDAP™ installationer på Linux och Mac, det är bäst att ställa in Tomcat (Programmet) som tillhörande användaren `Tomcat` 
   (en separat användare med begränsade behörigheter och som [har inget lösenord](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Således kan endast superanvändaren byta till att fungera som användare `Tomcat` . Detta gör det omöjligt för hackare att logga in på din server som användare `Tomcat` .
Och i alla fall bör du göra det så att `Tomcat` användaren har mycket begränsade behörigheter på serverns filsystem (läs + skriv + utför privilegier
För `apache-tomcat` katalog träd och ` <bigParentDirectory> ` endast privilegier för kataloger med data som ERDDAP™ behöver tillgång till).
  * Du kan skapa `Tomcat` Användarkonto (som inte har något lösenord) genom att använda kommandot:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Du kan byta till att arbeta som användare `Tomcat` genom att använda kommandot
    ```
    sudo su - tomcat
    ```
     (Det kommer att be dig om superuser lösenord för tillstånd att göra detta.) 
    * Du kan sluta fungera som användartomcat genom att använda kommandot
    ```
    exit
    ````
    * Gör de flesta av resten av Tomcat och ERDDAP™ Inställningar som användare `Tomcat` . Senare, springa `Startup.sh` och `Avstängning. Skräck` skript som användare `Tomcat` 
så att Tomcat har tillstånd att skriva till sina loggfiler.
    * Efter att ha packat upp Tomcat, från föräldern `apache-tomcat` Katalog:
      * Ändra ägande av apache-tomcat katalogträdet till tomcat-användaren.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (men ersätta det faktiska namnet på din tomcat katalog) .
      * Ändra "gruppen" för att vara tomkat, ditt användarnamn eller namnet på en liten grupp som innehåller tomkat och alla administratörer av Tomcat/ ERDDAP Från:
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Ändra behörigheter så att tomcat och gruppen har läst, skrivit, utför privilegier:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Ta bort "andra" användarens behörighet att läsa, skriva eller utföra:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Detta är viktigt eftersom det hindrar andra användare från att läsa eventuellt känslig information. ERDDAP™ Inställningar filer.

### Minne{#memory} 

Ställ Tomcats miljövariabler

* På Linux och Mac:
Skapa en fil `tomcat/bin/setenv.sh`   (Eller i Red Hat Enterprise Linux \\[ RHEL \\] , edit `~tomcat/conf/tomcat10.conf` ) att ställa in Tomcats miljövariabler.
Denna fil kommer att användas av `tomcat/bin/startup.sh` och `Avstängning. Skräck` . Filen ska innehålla något som:
  ```
  export JAVA_HOME=/usr/local/jdk-25.0.1+8
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (men ersätta katalogens namn från din dator) .
   (Om du tidigare ställt `JRE_HOME` Du kan ta bort det.) 
På Mac behöver du förmodligen inte ställa in `Java-hemmet` .

* På Windows:
Skapa en fil `tomcat\bin\\setenv.bat` att ställa in Tomcats miljövariabler.
Denna fil kommer att användas av `tomcat\bin\\startup.bat` och ` shutdown.bat ` .
Filen ska innehålla något som:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-25.0.1+8"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (men ersätta katalogens namn från din dator) .
Om detta bara är för lokal testning, ta bort "-server".
   (Om du tidigare ställt `JRE_HOME` Du kan ta bort det.) 

och `-Xmx` och `-Xms` minnesinställningar är viktiga eftersom ERDDAP™ fungerar bättre med mer minne.
Alltid inställd `-Xms` till samma värde som `-Xmx` .

* För 32 bitars operativsystem och 32 bitar Java Från:
64 bitar Java Bättre än 32 bitar Java Men 32 bit Java Kommer att fungera så länge servern inte är upptagen.
Ju mer fysiskt minne i servern desto bättre: 4 + GB är riktigt bra, 2 GB är okej, mindre rekommenderas inte.
Med 32 bitar Java Även med rikligt fysiskt minne, Tomcat och Java Kör inte om du försöker ställa in `-Xmx` Mycket över 1500M (1200M på vissa datorer) .
Om din server har mindre än 2 GB minne, minska `-Xmx` Värdevärde (I 'M'egaBytes) 1/2 av datorns fysiska minne.

* För 64 bitars operativsystem och 64 bitar Java Från:
64 bitar Java fungerar bara på ett 64-bitars operativsystem.
  * Med Java 8, du måste lägga till `-d64` Till Tomcat `CATALINA_OPTS` parameter i `setenv.bat` .
  * Med Java 21 Du väljer 64 bitar Java När du laddar ner en version av Java märkt "64 bit".

Med 64 bit Java Tomcat och Java kan använda mycket hög `-Xmx` och `-Xms` Inställningar. Ju mer fysiskt minne i servern desto bättre.
Som ett förenklat förslag: Vi rekommenderar att du ställer in `-Xmx` och `-Xms` att (I 'M'egaBytes) till 1/2 (eller mindre) av datorns fysiska minne.
Du kan se om Tomcat, Java och ERDDAP™ kör faktiskt i 64 bitars läge genom att söka efter "bit", ERDDAP Daglig rapport e-post
eller i `bigParentDirectory/logs/ [Log.txt](/docs/server-admin/additional-information#log) ` fil ( `bigParentDirectory` specificeras i [setup.xml](#setupxml) ) .

#### Garbage Collection{#garbage-collection} 

* Inom ERDDAP™ "S [Log.txt](/docs/server-admin/additional-information#log) Du kommer att se många "GC (Tilldelning misslyckande) budskap.
Detta är vanligtvis inte ett problem. Det är ett frekvent meddelande från en normalt fungerande Java säger att det precis avslutat en mindre sopor
samling eftersom den sprang ur rummet i Eden (sektionen i Java Heap för mycket unga föremål) . Vanligtvis visar meddelandet dig
   `minneUseBefore-&gt;memoryUseAfter` . Om dessa två siffror är nära varandra betyder det att soporkollektionen inte var produktiv.
Budskapet är bara ett tecken på problem om det är mycket vanligt. (Några sekunder) inte produktiva, och siffrorna är stora och inte växande,
som tillsammans indikerar att Java behöver mer minne, kämpar för att frigöra minnet, och kan inte frigöra minnet.
Detta kan hända under en stressig tid, sedan gå bort. Men om det kvarstår är det ett tecken på problem.
* Om du ser `Java.lang.OutOfMemoryError` s in ERDDAP™ "S [Log.txt](/docs/server-admin/additional-information#log) fil,
se [OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) för tips om hur man diagnostisera och lösa problemen.
         
### Tillstånd{#permissions} 

*  [På Linux och Mac, ändra behörigheterna](#permissions) av alla `*.sh` filer i `tomcat/bin/` att verkställas av ägaren:
  ```
  chmod +x *.sh
  ```

### Fonts{#fonts} 

*  [Fonts för bilder:](#fonts) Vi föredrar starkt det fria [DejaVu teckensnitt](https://dejavu-fonts.github.io/) till den andra Java Typsnitt.
Användning av dessa teckensnitt rekommenderas starkt men krävs inte.

Om du väljer att inte använda DejaVu teckensnitt, måste du ändra fontFamily inställningen i setup.xml till ` <fontFamily> SansSerif </fontFamily> ` ,
som är tillgänglig med alla Java distributioner. Om du ställer in ` <fontFamily> ` till namnet på ett teckensnitt som inte är tillgängligt, ERDDAP™ Kommer inte att ladda
och kommer att skriva ut en lista över tillgängliga teckensnitt i `Log.txt` fil. Du måste använda en av dessa teckensnitt.

Om du väljer att använda DejaVu teckensnitt, se till att ` <fontFamily> ` Inställning i setup.xml är ` <fontFamily> DejaVu Sans </fontFamily> ` .

För att installera DejaVu teckensnitt, vänligen ladda ner [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5.522.795 byte, MD5=33E1E61FAB06A547851ED308B4FEF42) 
och unzip teckenfilerna till en tillfällig katalog.

  * På Linux:
    * För Linux Adoptium Java distributioner, se [Dessa instruktioner](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Med andra Java Fördelningar: Som den `Tomcat` användaren, kopiera teckenfilerna i `$JAVA_HOME/lib/fonts` Så Java kan hitta teckensnitten.
Kom ihåg: om/när du senare uppgraderar till en nyare version Java Du måste installera om dessa teckensnitt.
  * På Mac: för varje teckenfil, dubbelklicka på den och klicka sedan på Installera Font.
  * På Windows 7 och 10: i Windows Explorer väljer du alla teckenfiler. Högerklick. Klicka på Installera.
             
### Testa Tomcat{#test-tomcat} 

* Testa din Tomcat installation.
  * Linux:
    * Som användare "tomcat", kör `tomcat/bin/startup.sh` .
    * Visa din URL + ":8080/" i din webbläsare (t.ex., [ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac Mac Mac Mac Mac Mac (kör tomcat som systemadministratörens användare) Från:
    * Kör `tomcat/bin/startup.sh` .
    * Visa din URL + ":8080/" i din webbläsare (t.ex., [ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Observera att som standard är din Tomcat endast tillgänglig för dig. Det är inte allmänt tillgängligt.
  * Windows localhost:
    * Högerklicka på Tomcat-ikonen i systembrickan och välj "Start service".
    * Utsikt [ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/) eller kanske [ http://localhost:8080/ ](http://localhost:8080/) i din webbläsare. Observera att som standard är din Tomcat endast tillgänglig för dig. Det är inte allmänt tillgängligt.

Du bör se sidan Tomcat "Grattis".

Om det finns problem, se Tomcat-loggfilen på `tomcat/logs/catalina.out` .

### Problem med Tomcat-installationen?{#troubles-with-the-tomcat-installation} 

* På Linux och Mac, om du inte kan nå Tomcat eller ERDDAP™   (Eller kanske du bara inte kan nå dem från en dator utanför brandväggen) ,
Du kan testa om Tomcat lyssnar på port 8080 genom att skriva (Som root) på en kommandorad av servern:

  ```
  netstat -tuplen | grep 8080
  ```

Det bör returnera en linje med något som:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (där var `# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #` är lite digital) indikerar att en `Java` Processprocessprocess (Antagligen Tomcat) lyssnar på port "8080" för "tcp" trafik.
Om inga linjer returnerades, om linjen returneras är signifikant annorlunda, eller om två eller flera linjer returnerades, kan det finnas ett problem med hamninställningarna.

* Se Tomcat log file `tomcat/logs/catalina.out` . Tomcat problem och vissa ERDDAP™ Startproblem är nästan alltid indikerade där.
Detta är vanligt när du först ställer in ERDDAP™ .

* Se [Tomcat](https://tomcat.apache.org/) webbplats eller söka på webben för hjälp, men låt oss veta de problem du hade och de lösningar du hittade.

* Se vår [sektion om att få ytterligare stöd](/docs/intro#support) .
             
###  ERDDAP™ Innehåll{#erddap-content} 
3.   [Ställ in the `Tomcat/content/erddap` Konfigurationsfiler.](#erddap-content) 
På Linux, Mac och Windows, ladda ner [ErddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip) 
och unzip det i `Tomcat` katalog, skapa `Tomcat/content/erddap` .

__Version 1.0.1, 20683 byte, MD5=98a8099e7e674da59fe35e9c96efa7b5, daterad 2025-06-02_____________________________________________________________________________________________________________________________________________________________________________________________________________

Några tidigare versioner finns också tillgängliga:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19 792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, daterad 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19 792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, daterad 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19 810 byte, MD5=1E26F62E7A06191EE686868C40B9A29362, daterad 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19 810 byte, MD5=1E26F62E7A06191EE686868C40B9A29362, daterad 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19 810 byte, MD5=1E26F62E7A06191EE686868C40B9A29362, daterad 2023-02-27) 

#### Andra Directory{#other-directory} 

För Red Hat Enterprise Linux (RHEL) eller för andra situationer där du inte får ändra Tomcat-katalogen eller var du vill/behöver
att sätta ERDDAP™ innehållskatalog på någon annan plats av någon annan anledning (Om du till exempel använder Jetty istället för Tomcat) ,
unzip `ErddapContent .zip ` till önskad katalog (som endast `Tomcat` användaren har åtkomst) och sätta ` erddapContentDirectory ` System Fastighet
 (t.ex. ` erddapContentDirectory  =~tomcat/content/erddap ` ) Så ERDDAP™ kan hitta denna nya innehållskatalog.

### setup.xml{#setupxml} 

*  [Läs kommentarerna i `tomcat/content/erddap/setup.xml` ](#setupxml) och göra de begärda ändringarna. setup.xml är filen med alla inställningar som anger hur din ERDDAP™ beter sig.

För den första installationen måste du åtminstone ändra dessa inställningar:
      *  ` <bigParentDirectory> ` 
      *  ` <emailEverythingTo> ` 
      *  ` <baseUrl> ` 
      *  ` <email...> ` Inställningar
      *  ` <admin...> ` Inställningar
      *  ` <baseHttpsUrl> `   (När du ställer in https ) 

När du skapar bigParentDirectory, från moderkatalogen för bigParentDirectory:

    * Göra `Tomcat` användaren ägaren till `bigParentDirectory` Från:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Ändra "gruppen" för att vara tomkat, ditt användarnamn eller namnet på en liten grupp som innehåller tomkat och alla administratörer av Tomcat/ ERDDAP Från:
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Ändra behörigheter så att tomcat och gruppen har läst, skrivit, utför privilegier:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Ta bort "andra" användarens behörighet att läsa, skriva eller utföra. Detta är viktigt för att förhindra att läsa eventuellt känslig information
in i ERDDAP™ logga filer och filer med information om privata datamängder.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Miljövariabler{#environment-variables} 

Börja med ERDDAP™ v2.13, ERDDAP™ administratörer kan åsidosätta värdet i setup.xml genom att ange en miljövariabel
Namnet namn ` ERDDAP _valueName` Innan du kör ERDDAP™ . Till exempel, Använd ` ERDDAP BaseUrl` överskrider ` <baseUrl> ` värde.
Detta kan vara praktiskt när du distribuerar ERDDAP™ med en behållare som Docker, eftersom du kan sätta standardinställningar i setup.xml
och sedan leverera speciella inställningar via miljövariabler. Om du lämnar hemlig information till ERDDAP™ via denna metod,
Se till att kontrollera att informationen kommer att förbli hemlig. ERDDAP™ läser bara miljövariabler en gång per start,
I den första sekunden av start, så ett sätt att använda detta är: sätt miljövariabler, börja ERDDAP ,
Vänta tills ERDDAP™ startas, sedan störa miljövariablerna.

###  datasets.xml  {#datasetsxml} 

* Läs kommentarerna i [ **Arbeta med datasets.xml Fil** ](/docs/server-admin/datasets) . Senare, efter att du fått ERDDAP™ kör
För första gången (vanligtvis med bara standarddataset) Du kommer att ändra XML i `tomcat/innehåll/erddap/ datasets.xml ` 
för att ange alla datamängder du vill ha din ERDDAP™ att tjäna. Det är där du kommer att spendera huvuddelen av din tid
när du ställer in ERDDAP™ och senare samtidigt bibehålla din ERDDAP™ .

Du kan se ett exempel [ datasets.xml på GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Osannolikt) Nu eller (Lite mer sannolikt) i framtiden, om du vill ändra dinddaps CSS-fil, kopiera
   `tomcat/content/erddap/images/erddapStart2.css` att `tomcat/content/erddap/images/erddap2.css` och sedan göra ändringar i den.
Förändringar till `Erddap2.css` endast träda i kraft när ERDDAP™ omstartas och kräver ofta också att användaren rensar webbläsarens cachade filer.
     
 ERDDAP™ fungerar inte korrekt om setup.xml eller datasets.xml filen är inte en välformad XML-fil. Så efter att du har redigerat dessa filer,
Det är en bra idé att verifiera att resultatet är välformat XML genom att klistra in XML-texten i en XML-kontroll som [xmlvalidering](https://www.xmlvalidation.com/) .
     
### Installera erddap. krigsfil{#install-the-erddapwar-file} 

4. På Linux, Mac och Windows, __download [Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) __ in `Tomcat/webapps` Från:

__Version 2.29.0, 706.788.135 byte, MD5=A5ED0DCC8D46CA27640FEB8CE4A8560, daterad 12-15-2025

Krigsfilen är stor eftersom den innehåller högupplöst kustlinje, gräns och höjddata som behövs för att skapa kartor.

Vissa tidigare versioner finns också tillgängliga.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 byte, MD5=5FEA912B5D42E50EAB9591F773EA848D, daterad 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 byte, MD5=461325E97E7577EC671DD50246CCFB8B, daterad 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 byte, MD5=F2CFF805893146E932E498FDDBD519B6, daterad 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 byte, MD5=2B33354F633294213AE2AFDDCF4DA6D0, daterad 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572 124,953 byte, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, daterad 2023-03-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 byte, MD5=970fbee172e28b0b8a07756eecbc898e, daterad 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 byte, MD5=652AFC9D1421F00B5F789DA2C4732D4C, daterad 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 byte, MD5=99a725108b37708e5420986c16a119, daterad 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 byte, MD5=3b2086c659eee4145ca2dff447bf4ef7, daterad 2025-06-11) 
   *  [2.28.1](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war)   (622,676,238 byte, MD5=48b4226045f950c8a8d69ef9521b9bc9, daterad 2025-09-05) 

### Konfigurera proxy (Utplaceringsspecifik)  {#proxy} 

 ERDDAP™ är vanligtvis utplacerad bakom en webbserver omvänd proxy så att den kan serveras på vanliga HTTP-portar (80 och 443) .
SSL/TLS-avslutning hängs ofta på webbserverproxyskiktet också. Specifikationer beror på kraven i varje utplacering.

#### Apache{#apache} 

1. Se till att `mod_proxy` och `mod_proxy_ http ` är laddade:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Ändra befintliga ` <VirtualHost> ` tagga (Om det finns en) eller lägga till en i slutet av filen:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Om ERDDAP™ tjänas på en annan väg än `/erddap` Sätt också in `X-Forwarded-Prefix` header till
Path segment _before_ `/erddap` . Denna inställning skulle vara lämplig för en ERDDAP™ serveras på
 `/subpath/erddap` Från:

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Sedan starta om Apache: `/usr/sbin/apachectl K graciös`   (Men ibland är det i en annan katalog) .
         
#### NGINX{#nginx} 

I nginx config-filen ställer du in dessa rubriker:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Om ERDDAP™ tjänas på en annan väg än `/erddap` Sätt också in `X-Forwarded-Prefix` header till
Path segment _before_ `/erddap` . Denna inställning skulle vara lämplig för en ERDDAP™ serveras på
 `/subpath/erddap` Från:

```
proxy_set_header X-Forwarded-Prefix /subpath
```


För att få NGINX och ERDDAP™ arbeta korrekt med https , du måste lägga följande snippet inuti Tomcat server.xml ` <Host> ` Block:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Börja Tomcat{#start-tomcat} 

*  (Jag rekommenderar inte att du använder Tomcat Web Application Manager. Om du inte helt stänger och startar Tomcat, kommer du förr eller senare att ha PermGen minnesproblem.) 
*  (I Linux eller Mac OS, om du har skapat en speciell användare för att köra Tomcat, t.ex. tomcat, kom ihåg att göra följande steg som den användaren.) 
* Om Tomcat redan kör, stäng av Tomcat med (i Linux eller Mac OS)   `tomcat/bin/shutdown.sh` 
eller (i Windows)   `tomcat\bin\\ shutdown.bat ` 

På Linux, använd `Ps -ef | grep tomcat` före och efter `Avstängning. Skräck` För att se till att tomcatprocessen har slutat.
Processen bör anges före nedstängningen och så småningom inte listas efter nedstängningen.
Det kan ta en minut eller två för ERDDAP™ att helt stänga ner. Var tålmodig. Eller om det ser ut som det inte kommer att sluta på egen hand, använd:
   `Döda -9 <processID> ` 
* Börja Tomcat med (i Linux eller Mac OS)   `tomcat/bin/startup.sh` eller (i Windows)   `tomcat\bin\\startup.bat` 

## Är ERDDAP™ Kör?{#is-erddap-running} 

Använd en webbläsare för att försöka visa http://www.YourServer.org/erddap/status.html.
 
 ERDDAP™ startar upp utan några datamängder laddade. Dataset laddas i en bakgrundstråd och blir därmed tillgänglig en-för-en.

### Felsökning{#troubleshooting} 

* När en förfrågan från en användare kommer in går den till Apache (på Linux och Mac OS-datorer) Då Tomcat, då ERDDAP™ .
* Du kan se vad som kommer till Apache (och relaterade fel) i Apache-loggfilerna.
*    [Du du](/docs/server-admin/additional-information#tomcat-logs) Kan se vad som kommer till Tomcat (och relaterade fel) 
I Tomcat-loggfilerna ( `tomcat/logs/catalina.out` och andra filer i den katalogen) .
*    [Du du](/docs/server-admin/additional-information#log) kan se vad som kommer till ERDDAP diagnostiska meddelanden från ERDDAP ,
och felmeddelanden från ERDDAP i den ERDDAP™   ` <bigParentDirectory> /logs/log.txt` fil.
* Tomcat börjar inte ERDDAP™ Tills Tomcat får en begäran om ERDDAP™ . Så du kan se i Tomcat-loggfilerna om det
började ERDDAP™ om det finns ett felmeddelande relaterat till det försöket.
* När när ERDDAP™ Börjar upp, det dör den gamla ERDDAP™ Log.txt fil ( `Regissör <CurrentTime> .txt` ) och skapar en ny log.txt-fil.
Så om `Log.txt` filen är gammal, det är ett tecken på att ERDDAP™ Har inte nyligen startat om. ERDDAP™ Skriver log info till en buffert
och bara skriver bufferten till loggfilen regelbundet, men du kan tvinga ERDDAP™ att skriva bufferten till loggfilen genom att besöka
     ` /erddap/status.html ` .

### Problem: Gamla versionen av Java  {#trouble-old-version-of-java} 

Om du använder en version av Java Det är för gammalt för ERDDAP , ERDDAP™ inte köra och du kommer att se ett felmeddelande i Tomcats loggfil som

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Lösningen är att uppdatera till den senaste versionen av Java Se till att Tomcat använder den.

### Problem: Långsam start första gången{#trouble-slow-startup-first-time} 

Tomcat måste göra mycket arbete första gången ett program som ERDDAP™ startas, särskilt måste den packa upp `Erddap.war` fil
 (som är som en .zip fil) . På vissa servrar, det första försöket att visa ERDDAP™ Stalls (30 sekunder?) tills detta arbete är klart.
På andra servrar kommer det första försöket att misslyckas omedelbart. Men om du väntar 30 sekunder och försöker igen, kommer det att lyckas om ERDDAP™ installerades korrekt.

Det finns ingen fix för detta. Det är helt enkelt hur Tomcat fungerar. Men det sker bara första gången när du har installerat en ny version av ERDDAP™ .

## Stäng ner och starta om{#shut-down-and-restart} 

I framtiden, att stänga av (och omstart)   ERDDAP™ Se, se [Hur man stänger av och startar om Tomcat ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Problem?{#trouble} 

Problem med att installera Tomcat eller ERDDAP™ ?? Se vår [sektion om att få ytterligare stöd](/docs/intro#support) .

## E-postmeddelande om nya versioner av ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Om du vill få ett e-postmeddelande när en ny version av ERDDAP™ finns eller annan viktig ERDDAP™ tillkännagivanden,
Du kan gå med i ERDDAP™ Tillkännagivanden lista [här här här](https://groups.google.com/g/erddap-announce) . Denna lista genomsnitt ungefär ett e-postmeddelande var tredje månad.

## Anpassa{#customize} 

*  [Anpassa din ERDDAP™ för att belysa din organisation (Inte inte NOAA   ERD ) .](#customize) 
* Ändra bannern som visas högst upp ERDDAP™ .html sidor genom att redigera ` <startBodyHtml5> ` tagga i din ` datasets.xml ` fil.
(Om det inte finns en, kopiera standarden från ERDDAP™ "S `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` fil
in i ` datasets.xml ` och redigera den.) Du kan till exempel:
  * Använd en annan bild (dvs. din organisations logotyp) .
  * Ändra bakgrundsfärgen.
  * Ändra " ERDDAP™ till "YourOrganization_'s" ERDDAP™ "
  * Ändra "Easier access to science data" till "Easier access to _YourOrganization_'s data".
  * Ändra länkarna "Gjort för dig" för att vara länkar till din organisation och finansieringskällor.
* Ändra informationen på vänster sida av hemsidan genom att redigera ` <theShortDescriptionHtml> ` tagga i din ` datasets.xml ` fil.
(Om det inte finns en, kopiera standarden från ERDDAP™ "S `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` fil
in i ` datasets.xml ` och redigera den.) Du kan till exempel:
  * Beskriv vad din organisation och/eller grupp gör.
  * Beskriv vilken typ av data detta ERDDAP™ har.
  * För att ändra ikonen som visas på webbläsarflikar, sätt din organisations favicon. ico i `tomcat/content/erddap/images/` .
Se https://en.wikipedia.org/wiki/Favicon.
 
