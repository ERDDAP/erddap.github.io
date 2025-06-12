---
sidebar_position: 1
---

# Installera
Hur man gör den inledande inställningen avERDDAP™på din server


ERDDAP™kan köras på någon server som stöderJavaoch Tomcat (och andra programservrar som Jetty, men vi stöder dem inte.) .ERDDAP™har testats på Linux (inklusive Amazons AWS) Mac och Windows-datorer.

*    **Amazon Amazon Amazon Amazon** ----- Om du installerarERDDAP™på en Amazon Web Services EC2-instans, se detta[Amazon Web Services översikt](/docs/server-admin/additional-information#amazon)Först.
*    **Docker** ----- Axiom erbjuder nu[ERDDAP™I en Docker container](https://hub.docker.com/u/axiom/)IOOS erbjuder nu en[Snabbstartguide förERDDAP™I en Docker Container](https://ioos.github.io/erddap-gold-standard/index.html).
Det är standardenERDDAP™installation, men Axiom har lagt den i en dockarbehållare.
Om du redan använder Docker kommer du förmodligen att föredra Docker-versionen.
Om du inte redan använder Docker rekommenderar vi i allmänhet inte detta.
Om du väljer att installeraERDDAP™via Docker erbjuder vi inget stöd för installationsprocessen.
Vi har inte jobbat med Docker än. Om du arbetar med detta, skicka oss dina kommentarer.
*    **Linux och Macs** -----ERDDAP™fungerar bra på Linux och Mac-datorer. Se instruktionerna nedan.
*    **Windows Windows** ----- Windows är bra för testningERDDAP™och för personligt bruk (se instruktionerna nedan) Men vi rekommenderar inte att du använder den för allmänhetenERDDAPs. RunningERDDAP™på Windows kan ha problem: särskiltERDDAP™kan vara oförmögen att radera och/eller byta namn snabbt. Detta beror förmodligen på antivirusprogram (från McAfee och Norton) som kontrollerar filerna för virus. Om du stöter på detta problem (som kan ses med felmeddelanden i[Log.txt](/docs/server-admin/additional-information#log)fil som "Unable to rad...") ändra antivirusprogramvarans inställningar kan delvis lindra problemet. Eller överväga att använda en Linux- eller Mac-server istället.

 **StandardenERDDAP™installationsanvisningar för Linux, Macs och Windows-datorer är:** 

0. Se till att alla beroenden är installerade. På icke-Windows maskiner (Linux och Mac) Du behöver csh.
## Java {#java} 
1.  [FörERDDAP™v2.19+, inrättaJava21.](#java)
Av säkerhetsskäl är det nästan alltid bäst att använda den senaste versionen avJava21.
Ladda ner och installera den senaste versionen av
    [Adoptium OpenJDK (Temurin) 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). För att verifiera installationen, typ "/_javaJreBinDirectory_/java-version", till exempel
/usr/local/jdk-21.0.3+9/jre/bin/java -version
    
    ERDDAP™arbete medJavafrån andra källor, men vi rekommenderar Adoptium eftersom det är det viktigaste, community-stödda, gratis. (som i öl och tal) version avJava21 som erbjuder långsiktig support (gratis uppgraderingar under många år förbi den första releasen) . Av säkerhetsskäl, vänligen uppdatera dinERDDAPversion avJavaperiodiskt som nya versioner avJava21 blir tillgängligt från Adoptium.
    
    ERDDAP™har testats och använts omfattande med 21, inte andra versioner. Av olika skäl testar vi inte med eller stöder andra versioner avJava.
     
## Tomcat{#tomcat} 
2.  [Ställ in](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat är den mest användaJavaApplikationsserver, som ärJavaprogramvara som står mellan operativsystemets nätverkstjänster ochJavaServer programvara somERDDAP™. Det är gratis och öppen programvara (FOSS) .
    
Du kan använda en annanJavaApplikationsserver (t.ex. Jetty) Vi testar bara med och stöder Tomcat.
     
    
    * Ladda ner Tomcat och packa upp den på din server eller PC.
Av säkerhetsskäl är det nästan alltid bäst att använda den senaste versionen av Tomcat 10. (version 9 och nedan är inte acceptabla) som är utformad för att arbeta medJava21 eller nyare. Nedan kommer Tomcat-katalogen att kallas _tomcat_.
        
Varning&#33; Om du redan har en Tomcat kör någon annan webbapplikation (Särskilt TREDDS) Vi rekommenderar att du installerarERDDAP™in i[En andra Tomcat](/docs/server-admin/additional-information#second-tomcat)för attERDDAP™behöver olika Tomcat-inställningar och bör inte behöva brottas med andra applikationer för minnet.
        
        * på Linux,[Ladda ner "Core" "Tar.gzTomcat distribution](https://tomcat.apache.org/download-10.cgi)och packa upp den. Vi rekommenderar att du packar upp den i/usr/local.
        * På en Mac är Tomcat förmodligen redan installerat i / Bibliotek / Tomcat, men bör uppdatera den till den senaste versionen av Tomcat 10.
Om du laddar ner den,[Ladda ner "Core" "Tar.gzTomcat distribution](https://tomcat.apache.org/download-10.cgi)och packa upp den i/Library/Tomcat
        * På Windows kan du[Ladda ner "Core" "zip" Tomcat distribution](https://tomcat.apache.org/download-10.cgi)  (som inte röra med Windows-registret och som du styr från en DOS-kommandorad) och packa upp den i en lämplig katalog. (För utveckling använder vi "Core" "zip" distribution. Vi gör en / program katalog och packa upp den där.) Eller du kan ladda ner "Core" "64-bitars Windows zip" -distributionen, som innehåller fler funktioner. Om distributionen är en Windows-installatör kommer det förmodligen att sätta Tomcat i till exempel /Programfiler / apache-tomcat-10.0.23 .
             
### Server.xml{#serverxml} 
*   [Server.xml](#serverxml)I _tomcat_/conf/server.xml-filen finns det två ändringar som du bör göra för var och en av de två&lt;Connector & gt; taggar - en för
```
        <Connector port="8080" 
```
och en för
```
        <Conector port="8443"
```
    1.   (Rekommenderas) Öka anslutningenTimeout parameter värde, kanske till 300 000 (millisekunder)   (som är 5 minuter) .
    2.   (Rekommenderas) Lägg till en ny parameter: relaxedQueryChars="\\[\\]|" Detta är frivilligt och något mindre säkert, men tar bort behovet av användare att procentkoda dessa tecken när de uppstår i parametrarna för en användares begäran URL.
             
### innehåll.xml{#contentxml} 
* sammanhang.xml - Resurser Cache - I _tomcat_/conf/context.xml, strax före&lt;/Context&gt; tag, change the Resources tag (Eller lägg till det om det inte redan finns där) att ställa in cache MaxSize parameter till 80000:
    &lt;Resurser cachingAllowed="true" cacheMaxSize="80000" / & gt;
Detta undviker många varningar i catalina. Allt börjar med
Varning\\[Huvudsakliga\\]org.apache.catalina.webresources.Cache.getResource Kan inte lägga till resursen på\\[/WEB-INF/classes/..."
         
### Apache Timeout{#apache-timeout} 
* På Linux-datorer, ändra Apache timeout-inställningarna så att tidskrävande användarförfrågningar inte timeout (med vad som ofta visas som en "Proxy" eller "Bad Gateway" fel) . Som rotanvändare:
    1. Ändra Apachehttpd.conf-fil (vanligtvis i /etc/httpd/conf/) Från:
Ändra befintliga&lt;Timeout & gt; inställning (eller lägga till en i slutet av filen) till 3600 (sekunder) I stället för standard 60 eller 120 sekunder.
Ändra befintliga&lt;ProxyTimeout & gt; inställning (eller lägga till en i slutet av filen) till 3600 (sekunder) I stället för standard 60 eller 120 sekunder.
    2. Starta Apache: /usr/sbin/apachectl K graciös (Men ibland är det i en annan katalog) .
             
    * Säkerhetsrekommendation: Se[Dessa instruktioner](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)öka säkerheten för din Tomcat-installation, särskilt för offentliga servrar.
         
    * För allmänhetenERDDAP™installationer på Linux och Mac, det är bäst att ställa in Tomcat (Programmet) som tillhör användaren "tomcat" (en separat användare med begränsade behörigheter och som[har inget lösenord](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Således kan endast superanvändaren byta till att fungera som användartomcat. Detta gör det omöjligt för hackare att logga in på din server som användartomcat. Och i alla fall bör du göra det så att tomcat-användaren har mycket begränsade behörigheter på serverns filsystem (läs + skriv + utför privilegier för apache-tomcat-katalogens träd och&lt;bigParentDirectory & gt; och read-only privilegier för kataloger med data somERDDAP™behöver tillgång till).
        * Du kan skapa tomcat användarkonto (som inte har något lösenord) genom att använda kommandot
sudo useradd tomcat -s /bin/bash -p "
        * Du kan byta till att arbeta som användartomcat genom att använda kommandot
Sudo Su - Tomcat
             (Det kommer att be dig om superuser lösenord för tillstånd att göra detta.) 
        * Du kan sluta fungera som användartomcat genom att använda kommandot
exit
        * Gör de flesta av resten av Tomcat ochERDDAP™Anvisningar som användaren "tomcat". Senare kör startup.sh och shutdown.sh scripts som användaren "tomcat" så att Tomcat har tillstånd att skriva till sina loggfiler.
        * Efter att ha packat upp Tomcat, från föräldern till apache-tomcat-katalogen:
            
            * Ändra ägande av apache-tomcat katalogträdet till tomcat-användaren.
chown -R tomcat apache-tomcat-_10.0.23_
                 (men ersätta det faktiska namnet på din tomcat katalog) .
            * Ändra "gruppen" för att vara tomkat, ditt användarnamn eller namnet på en liten grupp som innehåller tomkat och alla administratörer av Tomcat/ERDDAPt.ex.,
chgrp -R _your UserName_ apache-tomcat-_10.0.23_
            * Ändra behörigheter så att tomcat och gruppen har läst, skrivit, utför privilegier, t.ex.
chmod -R ug+rwx apache-tomcat-_10.0.23
            * Ta bort "andra" användarens behörighet att läsa, skriva eller utföra:
chmod -R o-rwx apache-tomcat-_10.0.23
Detta är viktigt eftersom det hindrar andra användare från att läsa eventuellt känslig information.ERDDAP™Inställningar filer.
            
              
### Minne{#memory} 
* Ställ Tomcats miljövariabler
    
På Linux och Mac:
Skapa en fil _tomcat_/bin/setenv.sh (Eller i Red Hat Enterprise Linux\\[RHEL\\], redigera ~tomcat/conf/tomcat10.conf) att ställa in Tomcats miljövariabler. Denna fil kommer att användas av _tomcat_/bin/startup.sh och shutdown.sh. Filen ska innehålla något som:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (men ersätta katalogens namn från din dator) .
 (Om du tidigare satt JRE_HOME kan du ta bort det.)   
På Mac behöver du förmodligen inte ställa in JAVA\\_HOME.

På Windows:
Skapa en fil _tomcat_\bin\\setenv.bat för att ställa in Tomcats miljövariabler. Denna fil kommer att användas av _tomcat_\bin\\startup.bat ochshutdown.bat. Filen ska innehålla något som:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (men ersätta katalogens namn från din dator) .
Om detta bara är för lokal testning, ta bort "-server".
 (Om du tidigare satt JRE_HOME kan du ta bort det.) 

-Xmx och -Xms minnesinställningar är viktiga eftersomERDDAP™fungerar bättre med mer minne. Ange alltid -XMs till samma värde som -Xmx.

* För 32 bitars operativsystem och 32 bitarJavaFrån:
64 bitarJavaBättre än 32 bitarJavaMen 32 bitJavaKommer att fungera så länge servern inte är upptagen. Ju mer fysiskt minne i servern desto bättre: 4 + GB är riktigt bra, 2 GB är okej, mindre rekommenderas inte. Med 32 bitarJavaÄven med rikligt fysiskt minne, Tomcat ochJavaKör inte om du försöker ställa in -Xmx mycket över 1500M (1200M på vissa datorer) . Om din server har mindre än 2 GB minne, minska -Xmx-värdet (I 'M'egaBytes) 1/2 av datorns fysiska minne.
* För 64 bitars operativsystem och 64 bitarJavaFrån:
64 bitarJavafungerar bara på ett 64-bitars operativsystem.
    
    * MedJava8, du måste lägga till \\-d64 till Tomcat CATALINA\\_OPTS parameter i setenv.bat
    * MedJava21 Du väljer 64 bitarJavaNär du laddar ner en version avJavamärkt "64 bit".
    
Med 64 bitJavaTomcat ochJavakan använda mycket höga -Xmx och -Xms-inställningar. Ju mer fysiskt minne i servern desto bättre. Som ett förenklat förslag: vi rekommenderar att du ställer in -Xmx och -Xms till (I 'M'egaBytes) till 1/2 (eller mindre) av datorns fysiska minne. Du kan se om Tomcat,JavaochERDDAP™kör faktiskt i 64 bitars läge genom att söka efter "bit",ERDDAPDaglig rapport e-post eller i _bigParentDirectory_/loggar/[Log.txt](/docs/server-admin/additional-information#log)fil (_bigParentDirectory_ anges i[setup.xml](#setupxml)) .
#### Garbage Collection{#garbage-collection} 
* InomERDDAP™"S[Log.txt](/docs/server-admin/additional-information#log)Du kommer att se många "GC (Tilldelning misslyckande) budskap.
Detta är vanligtvis inte ett problem. Det är ett frekvent meddelande från en normalt fungerandeJavasäger att det precis avslutat en mindre skräpsamling eftersom det sprang ut ur rummet i Eden (sektionen iJavaHeap för mycket unga föremål) . Vanligtvis visar meddelandet dig _memoryUseBefore_\\-&gt;_memoryUseAfter_. Om dessa två siffror är nära varandra betyder det att soporkollektionen inte var produktiv. Budskapet är bara ett tecken på problem om det är mycket vanligt. (Några sekunder) inte produktiva och siffrorna är stora och inte växande, vilket tillsammans indikerar attJavabehöver mer minne, kämpar för att frigöra minnet, och kan inte frigöra minnet. Detta kan hända under en stressig tid, sedan gå bort. Men om det kvarstår är det ett tecken på problem.
* Om du ser java.lang.OutOfMemoryError iERDDAP™"S[Log.txt](/docs/server-admin/additional-information#log)fil, se[OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror)för tips om hur man diagnostisera och lösa problemen.
         
### Tillstånd{#permissions} 
*   [På Linux och Mac, ändra behörigheterna](#permissions)av alla\\*.shfiler i _tomcat_/bin/för att verkställas av ägaren, t.ex.
```
    chmod +x \\*.sh  
```
### Fonts{#fonts} 
*   [Fonts för bilder:](#fonts)Vi föredrar starkt det fria[DejaVu teckensnitt](https://dejavu-fonts.github.io/)till den andraJavaTypsnitt. Användning av dessa teckensnitt rekommenderas starkt men krävs inte.
    
Om du väljer att inte använda DejaVu teckensnitt, måste du ändra fontFamily inställningen i setup.xml till&lt;FontFamily & gt;SansSerif&lt;/fontFamily & gt;, som är tillgänglig med allaJavadistributioner. Om du ställer in fontFamily till namnet på ett teckensnitt som inte är tillgängligt,ERDDAP™inte ladda och kommer att skriva ut en lista över tillgängliga teckensnitt i log.txt-filen. Du måste använda en av dessa teckensnitt.
    
Om du väljer att använda DejaVu teckensnitt, se till att fontFamily inställningen i setup.xml är&lt;Font Familj & gt; DejaVu Sans&lt;/fontFamily&gt;
    
För att installera DejaVu teckensnitt, vänligen ladda ner[DejaVuFonts.zip](/DejaVuFonts.zip)  (5.522.795 byte, MD5=33E1E61FAB06A547851ED308B4FEF42) och unzip teckenfilerna till en tillfällig katalog.
    
    * På Linux:
        * För Linux AdoptiumJavadistributioner, se[Dessa instruktioner](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Med andraJavaFördelningar: Som Tomcat-användaren kopierar du teckenfilerna till _JAVA\\_HOME_/lib/fonts såJavakan hitta teckensnitten. Kom ihåg: om/när du senare uppgraderar till en nyare versionJavaDu måste installera om dessa teckensnitt.
    * På Mac: för varje teckenfil, dubbelklicka på den och klicka sedan på Installera Font.
    * På Windows 7 och 10: i Windows Explorer väljer du alla teckenfiler. Högerklick. Klicka på Installera.
             
### Testa Tomcat{#test-tomcat} 
* Testa din Tomcat installation.
    * Linux:
        * Som användare "tomcat", kör _tomcat_/bin/startup.sh
        * Visa din URL + ":8080/" i din webbläsare (t.ex.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Du bör se sidan Tomcat "Grattis".
Om det finns problem, se Tomcat-loggfilen _tomcat_/logs/catalina.out.
    * Mac Mac Mac Mac Mac Mac (kör tomcat som systemadministratörens användare) Från:
        * Kör _tomcat_/bin/startup.sh
        * Visa din URL + ":8080/" i din webbläsare (t.ex.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Observera att som standard är din Tomcat endast tillgänglig för dig. Det är inte allmänt tillgängligt.
        * Du bör se sidan Tomcat "Grattis".
Om det finns problem, se Tomcat-loggfilen _tomcat_/logs/catalina.out.
    * Windows localhost:
        
        * Högerklicka på Tomcat-ikonen i systembrickan och välj "Start service".
        * Utsikt[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)eller kanske[ http://localhost:8080/ ](http://localhost:8080/)i din webbläsare. Observera att som standard är din Tomcat endast tillgänglig för dig. Det är inte allmänt tillgängligt.
        * Du bör se sidan Tomcat "Grattis".
Om det finns problem, se Tomcat-loggfilen _tomcat_/logs/catalina.out.
            
### Problem med Tomcat-installationen?{#troubles-with-the-tomcat-installation} 
* På Linux och Mac, om du inte kan nå Tomcat ellerERDDAP™  (Eller kanske du bara inte kan nå dem från en dator utanför brandväggen) Du kan testa om Tomcat lyssnar på port 8080 genom att skriva (Som root) på en kommandorad av servern:
```  
    netstat -tuplen | grep 8080  
```
Det bör returnera en linje med något som:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (där "#" är lite digitalt) indikerar att en "java" process (Antagligen Tomcat) lyssnar på port "8080" för "tcp" trafik. Om inga linjer returnerades, om linjen returneras är signifikant annorlunda, eller om två eller flera linjer returnerades, kan det finnas ett problem med hamninställningarna.
* Se Tomcat log file _tomcat_/logs/catalina.out. Tomcat problem och vissaERDDAP™Startproblem är nästan alltid indikerade där. Detta är vanligt när du först ställer inERDDAP™.
* Se[Tomcat](https://tomcat.apache.org/)webbplats eller söka på webben för hjälp, men låt oss veta de problem du hade och de lösningar du hittade.
* Se vår[sektion om att få ytterligare stöd](/docs/intro#support).
             
### ERDDAP™Innehåll{#erddap-content} 
3.  [Ställ in the_tomcat_/content/erddapKonfigurationsfiler.](#erddap-content)  
På Linux, Mac och Windows, ladda ner[ErddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (version 1.0.0, 20333 byte, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, daterad 2024-10-14) och unzip det i _tomcat_, skapa_tomcat_/content/erddap.

    \\[Några tidigare versioner finns också tillgängliga:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19 792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, daterad 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19 792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, daterad 2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19 810 byte, MD5=1E26F62E7A06191EE686868C40B9A29362, daterad 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19 810 byte, MD5=1E26F62E7A06191EE686868C40B9A29362, daterad 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19 810 byte, MD5=1E26F62E7A06191EE686868C40B9A29362, daterad 2023-02-27) 
och unzip det i _tomcat_, skapa_tomcat_/content/erddap.\\]
    
#### Andra Directory{#other-directory} 
För Red Hat Enterprise Linux (RHEL) eller för andra situationer där du inte får ändra Tomcat-katalogen eller var du vill/behöver sättaERDDAP™innehållskatalog på någon annan plats av någon annan anledning (Om du till exempel använder Jetty istället för Tomcat) Unzip ErddapContent.ziptill önskad katalog (som endast användar=tomcat har tillgång till) och sättaerddapContentDirectorySystem Fastighet (t.ex.,erddapContentDirectory=~tomcat/content/erddap) SåERDDAP™kan hitta denna nya innehållskatalog.
    
### setup.xml{#setupxml} 
*   [Läs kommentarerna i_tomcat_/content/erddap/// **setup.xml** ](#setupxml)och göra de begärda ändringarna. setup.xml är filen med alla inställningar som anger hur dinERDDAP™beter sig.
För den första installationen måste du åtminstone ändra dessa inställningar:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
När du skapar bigParentDirectory, från moderkatalogen för bigParentDirectory:
    
    * Gör användaren =tomcat ägaren av bigParentDirectory, t.ex.
```
        chown -R tomcat _bigParentDirectory_
```
    * Ändra "gruppen" för att vara tomkat, ditt användarnamn eller namnet på en liten grupp som innehåller tomkat och alla administratörer av Tomcat/ERDDAPt.ex.,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Ändra behörigheter så att tomcat och gruppen har läst, skrivit, utför privilegier, t.ex.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Ta bort "andra" användarens behörighet att läsa, skriva eller utföra. Detta är viktigt för att förhindra att läsa eventuellt känslig information iERDDAP™loggfiler och filer med information om privata datamängder:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Miljövariabler{#environment-variables} 
Börja medERDDAP™v2.13,ERDDAP™administratörer kan åsidosätta något värde i setup.xml genom att ange en miljövariabel som heterERDDAP\\_valueName_ innan du körERDDAP™. Till exempel, AnvändERDDAPBaseUrl åsidosätter&lt;BasUrl & gt; värde. Detta kan vara praktiskt när du distribuerarERDDAP™med en behållare som Docker, eftersom du kan sätta standardinställningar i setup.xml och sedan leverera speciella inställningar via miljövariabler. Om du lämnar hemlig information tillERDDAP™via denna metod, se till att kontrollera att informationen kommer att förbli hemlig.ERDDAP™läser bara miljövariabler en gång per start, under den första sekunden av uppstarten, så ett sätt att använda detta är: sätt miljövariabler, börjaERDDAPVänta tillERDDAP™startas, sedan störa miljövariablerna.
    
### datasets.xml {#datasetsxml} 
* Läs kommentarerna i[ **Arbeta meddatasets.xmlFil** ](/docs/server-admin/datasets). Senare, efter att du fåttERDDAP™Kör för första gången (vanligtvis med bara standarddataset) Du kommer att ändra XML i_tomcat_/content/erddap/// **datasets.xml** för att ange alla datamängder du vill ha dinERDDAP™att tjäna. Det är där du kommer att spendera huvuddelen av din tid medan du ställer inERDDAP™och senare samtidigt bibehålla dinERDDAP™.

Du kan se ett exempel[datasets.xmlpå GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (Osannolikt) Nu eller (Lite mer sannolikt) i framtiden, om du vill ändra dinddaps CSS-fil, gör en kopia av_tomcat_/content/erddap/images/erddapStart2.css kallas erddap2.css och gör sedan ändringar i det. Ändringar av erddap2.css tar bara effekt närERDDAP™omstartas och kräver ofta också att användaren rensar webbläsarens cachade filer.
     
ERDDAP™fungerar inte korrekt om setup.xml ellerdatasets.xmlfilen är inte en välformad XML-fil. Så efter att du har redigerat dessa filer är det en bra idé att verifiera att resultatet är välformat XML genom att klistra in XML-texten i en XML-kontroll som[xmlvalidering](https://www.xmlvalidation.com/).
     
### Installera erddap.war-filen{#install-the-erddapwar-file} 
4. På Linux, Mac och Windows, ladda ner[Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)till _tomcat_/webapps.
     (version 2.27.0, 620,554,403 byte, MD5=3b2086c659eee4145ca2dff447bf4ef7, daterad 06-11-2025) 
    
Krigsfilen är stor eftersom den innehåller högupplöst kustlinje, gräns och höjddata som behövs för att skapa kartor.
    
    \\[Vissa tidigare versioner finns också tillgängliga.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 byte, MD5=5FEA912B5D42E50EAB9591F773EA848D, daterad 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 byte, MD5=461325E97E7577EC671DD50246CCFB8B, daterad 2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 byte, MD5=F2CFF805893146E932E498FDDBD519B6, daterad 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 byte, MD5=2B33354F633294213AE2AFDDCF4DA6D0, daterad 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572 124,953 byte, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, daterad 2023-03-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 byte, MD5=970fbee172e28b0b8a07756eecbc898e, daterad 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 byte, MD5=652AFC9D1421F00B5F789DA2C4732D4C, daterad 2024-11-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032 byte, MD5=99a725108b37708e5420986c16a119, daterad 2025-03-31) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Använd Proxy Passera så att användare inte behöver sätta portnumret, t.ex.:8080, i webbadressen.
På Linux-datorer, om Tomcat körs i Apache, vänligen ändra Apache.httpd.conf-fil (vanligtvis i /etc/httpd/conf/) tillåta HTTP-trafik till/frånERDDAP™utan att kräva portnumret, t.ex.:8080, i webbadressen. Som rotanvändare:
    1. Ändra befintliga&lt;VirtualHost & gt; tagga (Om det finns en) eller lägga till en i slutet av filen:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Starta sedan om Apache: /usr/sbin/apachectl K graciös (Men ibland är det i en annan katalog) .
         
### NGINX{#nginx} 
 (U U U U U UNCOMMON) Om du använder[NGINX](https://www.nginx.com/)  (En webbserver och lastbalanser) Från:
För att få NGINX ochERDDAP™arbeta korrekt medhttps, du måste lägga följande snippet inuti Tomcat server.xml&lt;Värd & gt; block:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Och i nginx config-filen måste du ställa in dessa rubriker:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Tack vare Kyle Wilcox.)   
     
### Börja Tomcat{#start-tomcat} 
*    (Jag rekommenderar inte att du använder Tomcat Web Application Manager. Om du inte helt stänger och startar Tomcat, kommer du förr eller senare att ha PermGen minnesproblem.)   
     
*    (I Linux eller Mac OS, om du har skapat en speciell användare för att köra Tomcat, t.ex. tomcat, kom ihåg att göra följande steg som den användaren.)   
     
* Om Tomcat redan kör, stäng av Tomcat med (i Linux eller Mac OS) _tomcat_/bin/shutdown.sh
eller (i Windows) _tomcat_\bin\\shutdown.bat
    
På Linux, använd ps -ef|grep tomcat före och efter avstängning.sh för att se till att tomcat-processen har slutat. Processen bör anges före nedstängningen och så småningom inte listas efter nedstängningen. Det kan ta en minut eller två förERDDAP™att helt stänga ner. Var tålmodig. Eller om det ser ut som det inte kommer att sluta på egen hand, använd:
döda -9 _processID_
    
* Börja Tomcat med (i Linux eller Mac OS) _tomcat_/bin/startup.sh
eller (i Windows) _tomcat_\bin\\startup.bat

## ÄrERDDAP™Kör?{#is-erddap-running} 
Använd en webbläsare för att försöka visa http://_www.YourServer.org_/erddap/status.html   
ERDDAP™startar upp utan några datamängder laddade. Dataset laddas i en bakgrundstråd och blir därmed tillgänglig en-för-en.

### Felsökning{#troubleshooting} 
* När en förfrågan från en användare kommer in går den till Apache (på Linux och Mac OS-datorer) Då Tomcat, dåERDDAP™.
* Du kan se vad som kommer till Apache (och relaterade fel) i Apache-loggfilerna.
*   [Du du](/docs/server-admin/additional-information#tomcat-logs)Kan se vad som kommer till Tomcat (och relaterade fel) I Tomcat-loggfilerna (_tomcat_/logs/catalina.out och andra filer i den katalogen) .
*   [Du du](/docs/server-admin/additional-information#log)kan se vad som kommer tillERDDAPdiagnostiska meddelanden frånERDDAPoch felmeddelanden frånERDDAPi denERDDAP™ &lt;bigParentDirectory & gt;logs/log.txt-fil.
* Tomcat börjar inteERDDAP™Tills Tomcat får en begäran omERDDAP™. Så du kan se i Tomcat-loggfilerna om det börjadeERDDAP™om det finns ett felmeddelande relaterat till det försöket.
* När närERDDAP™Börjar upp, det dör den gamlaERDDAP™Log.txt fil (LogArchivedAt_CurrentTime_.txt) och skapar en ny log.txt-fil. Om loggen. Txt-fil är gammal, det är ett tecken på attERDDAP™Har inte nyligen startat om.ERDDAP™skriver logga in på en buffert och skriver bara bufferten till loggfilen periodiskt, men du kan tvingaERDDAP™att skriva bufferten till loggfilen genom att besöka .../erddap/status.html.

### Problem: Gamla versionen avJava {#trouble-old-version-of-java} 
Om du använder en version avJavaDet är för gammalt förERDDAP,ERDDAP™inte köra och du kommer att se ett felmeddelande i Tomcats loggfil som
Undantag i tråd "huvud" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
Lösningen är att uppdatera till den senaste versionen avJavaSe till att Tomcat använder den.

### Problem: Långsam start första gången{#trouble-slow-startup-first-time} 
Tomcat måste göra mycket arbete första gången ett program somERDDAP™startas, särskilt måste det packa upp erddap. krigsfil (som är som en.zipfil) . På vissa servrar, det första försöket att visaERDDAP™Stalls (30 sekunder?) tills detta arbete är klart. På andra servrar kommer det första försöket att misslyckas omedelbart. Men om du väntar 30 sekunder och försöker igen, kommer det att lyckas omERDDAP™installerades korrekt.
Det finns ingen fix för detta. Det är helt enkelt hur Tomcat fungerar. Men det sker bara första gången när du har installerat en ny version avERDDAP™.

## Stäng ner och starta om{#shut-down-and-restart} 
I framtiden, att stänga av (och omstart)  ERDDAPSe, se[Hur man stänger av och startar om TomcatERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Problem?{#trouble} 
Problem med att installera Tomcat ellerERDDAP?? Se vår[sektion om att få ytterligare stöd](/docs/intro#support).
## E-postmeddelande om nya versioner avERDDAP {#email-notification-of-new-versions-of-erddap} 
Om du vill få ett e-postmeddelande när en ny version avERDDAP™finns eller annan viktigERDDAP™Tillkännagivanden, du kan gå med iERDDAP™Tillkännagivanden lista[här här här](https://groups.google.com/g/erddap-announce). Denna lista genomsnitt ungefär ett e-postmeddelande var tredje månad.
## Anpassa{#customize} 
[Anpassa dinERDDAP™för att belysa din organisation (Inte inteNOAA ERD) .](#customize)
    * Ändra bannern som visas högst uppERDDAP™.html sidor genom att redigera&lt;StartBodyHtml5 & gt; tagga i dindatasets.xmlfil. (Om det inte finns en, kopiera standarden frånERDDAP"S
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil idatasets.xmloch redigera den.) Du kan till exempel:
        * Använd en annan bild (dvs. din organisations logotyp) .
        * Ändra bakgrundsfärgen.
        * Ändra "ERDDAPtill "YourOrganization_'s"ERDDAP"
        * Ändra "Easier access to science data" till "Easier access to _YourOrganization_'s data".
        * Ändra länkarna "Gjort för dig" för att vara länkar till din organisation och finansieringskällor.
    * Ändra informationen på vänster sida av hemsidan genom att redigera&lt;theShortDescriptionHtml&gt; tagga i dindatasets.xmlfil. (Om det inte finns en, kopiera standarden frånERDDAP"S
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil idatasets.xmloch redigera den.) Du kan till exempel:
        * Beskriv vad din organisation och/eller grupp gör.
        * Beskriv vilken typ av data dettaERDDAP™har.
    * För att ändra ikonen som visas på webbläsarflikar, sätt din organisations favicon. ico i_tomcat_/content/erddap/images/. Se[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
