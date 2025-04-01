---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Förändringar

ERDDAP™är ett bra exempel på[Användar-Driven Innovation](https://en.wikipedia.org/wiki/User_innovation)Där produktinnovation ofta kommer från konsumenter (ERDDAP™användare) inte bara producenterna (ERDDAP™utvecklare) . Under årens lopp, de flesta idéer för nya funktioner och förändringar iERDDAP™har kommit från användare. Dessa användare krediteras nedan för sina stora idéer. Tack&#33; Vänligen håll dessa stora förslag kommer&#33;

Här är förändringarna i samband med varjeERDDAP™release.

## Version 2.26{#version-226} 
 (släppt 2025-03-31) 

*    **För alla:** 
    * Stor uppdatering till vår dokumentationswebbplats: https://erddap.github.io/
 
Förutom det uppdaterade utseendet finns det förbättrad navigering, sökning, översättning och det borde vara lättare att fortsätta framåt&#33;

*    **Nya funktioner och förändringar (för användare) Från:** 
    * Prenumerationer ochRSSuppdateringar bör ske mer tillförlitligt för datamängder som uppdateras ofta från filändringar.

*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Standardutgåvan kräver/stöderJavaversion 21. Tillbaka i denna release kan enkelt göra enJava17 kompatibel binär.

    * Ny funktion för att anpassa den information som visas om datamängder i UI. Vi förväntar oss att detta är särskilt användbart för att lägga till saker som datasetcitationer. För mer information kan du läsa[Ny dokumentation](/docs/server-admin/display-info). Tack till Ayush Singh för bidraget&#33;

    * Ytterligare Prometheus mätvärden. Den största är "http_request_duration_seconds' som inkluderar förfrågningstider som bryts ned av: "request_type", "dataset_id", "file_type", "lang_code", "status_code"
Detta maskinläsbara format möjliggör bättre samling av mätvärden för att förstå hur användare använder servern.

    * Nytt sätt att generera ISO19115 XML-filer. Den använder Apache SIS och är ett nytt alternativ i denna release. Vänligen aktivera det och skicka feedback.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI kommer nu att skapa individuella länkar för varje url på fält sominfoUrloch sammanfattning.

    * Prenumerationer ochRSSuppdateringar bör ske mer tillförlitligt för datamängder som uppdateras ofta från filändringar. Om detta orsakar problem, vänligen nå ut på GitHub och inaktivera funktionaliteten genom att lägga till nedanstående flagga till din setup.xml.
Inte återkommande
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subset variabler kommer inte längre att genereras automatiskt för dataset typ EDDTableFromNcCFFiles. Om du förlitar dig på beteendet kan du antingen (Föredrog lösning) Lägg tillsubsetVariablestill dataset definition i dindatasets.xml, eller lägg till nedanstående flagga till din setup.xml. Om du känner behovet av att slå på detta, vänligen nå ut på GitHub så att vi bättre kan stödja ditt användningsfall framåt.
Inte återkommande
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Servern omdirigerar nu dokumentationsförfrågningar (under nedladdningar/ vilket är den dokumentation som har migrerats) till den nya dokumentationssajten. Om det behövs kan du inaktivera detta med en flagga i setup.xml:
Inte återkommande
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Vissa små förändringar och buggfixar.

*    **FörERDDAP™Utvecklare:** 
    * Mer kodkvalitetsförbättringar och dead code cleanup. Detta inkluderar mindre optimeringar, bättre hantering av stängbara resurser och migrera bort från långa föråldrade datatyper. (Som Vector) .

    * Stor refaktorering till EDStatic för att dra ut det mesta av konfig, meddelande och metrisk kod. Bättre inkapslar initiering och hantering av katalogvägar (Dessa två sista har mer att göra.) 

    * Många framsteg mot en officiellt stödd Docker Image. Planen är att slutföra och släppa efterERDDAP™2.26 release är tillgänglig.

## Version 2.25{#version-225} 
 (släppt 2024-10-31) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    * EDDTableFromFiles kan nu stödja frågor med endast härledda utgångar (globalt, jexl script eller variabler) .
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Version 2.25 kräverJava21 eller nyare. Detta är LTS-versionen och har varit tillgänglig i över ett år.
         
    * SharedWatchService är nu standard. Om du behöver inaktivera det, vänligen kontakta chris. john på noaa.gov för att låta mig veta, så jag kan förbättra den i framtida versioner och lägga till:
        &lt;AnvändSharedWatchService&gt;False&lt;/useSharedWatchService&gt; till din setup.xml.
         
    * ochERDDAP™Servlet börjar nu på serverstart. Det betyder att datamängder börjar ladda omedelbart istället för att vänta tills en begäran görs.
         
    * Den removeMVRows parameter i EDDTableFromMultidimNcFiles kommer nu att ha en effekt. Att ställa in det till falskt kan avsevärt påskynda vissa frågor, men det kan inte vara lämpligt för alla datamängder. För mer information se[Beskrivning av parametern](/docs/server-admin/datasets#removemvrows).
         
    * Dataset (EDDTableFromNcFiles ochEDDGridFrånNcFiles) Använda zarr-filer stöds nu. De måste inkludera "zarr" i antingen filenNameRegex eller pathRegex. Se[zarr sektion i dataset dokumentation](/docs/server-admin/datasets#zarr)för mer detaljer.
         
    * Ny datasettyp, EDDTableFromParquetFiles stöds nu. Se[EDDTableFromParquetFiles sektion i dataset dokumentation](/docs/server-admin/datasets#eddtablefromparquetfiles)för mer detaljer.
         
    *   [Prometheus Metrics](https://prometheus.io/)finns nu på /erddap/metri.
         
    * En ny XML parser implementering är tillgänglig. Denna nya parser tillåter användning av XInclude idatasets.xml. Tack vare Ayush Singh för funktionen.
         
    * Ny parameter idatasets.xmlför att kontrollera ovanliga aktivitetsmail. ovanlig aktivitet Felaktiga standarder till det gamla värdet på 25%. Tack vare Ayush Singh för funktionen.
         
    * Ny parameter i setup.xml som styr om dataset loading fel visas på status.html sida. Det standarder till sant, att inaktivera dataset fel på statussidan, ställa in showLoadErrorsOnStatusPage till falsk:&lt;showLoadErrorsOnStatusPage &gt;false&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Vissa små förändringar och buggfixar.
         
*    **FörERDDAP™Utvecklare:** 
    * Tester separerade till enhet och integration (långsam) tester. Även fler tester aktiverade och tester har gjorts mindre fläckiga.
         
    * Fel Prone (Vissa kontroller fortfarande funktionshindrade) och Spot Bugs integrerade genom Maven.
         
    * Fullständig kodbas formaterad för att matcha Google Style Guide.
         

## Version 2.24{#version-224} 
 (släppt 2024-06-07) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    * Ny färgpalett EK80 för tillgängliga akustiska datamängder. Tack till Rob Cermak för detta.
         
    * Fixen ett problem där EDDTableAggregateRows inte visade rätt sortiment från alla barn. Tack vare Marco Alba för fix- och buggrapporten.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * För att göra: Security Change: Google Authentication kan kräva ändringar i din CSP.
        
Specifikt kan du också behöva lägga till https://accounts.google.com/gsi/style att stlye-src och https://accounts.google.com/gsi/ att ansluta-src. För script-src kan du nu använda https://accounts.google.com/gsi/client.
 
        
För mer information kan du gå till[Google page](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)CSP konfiguration.
         
        
    * New Shared Watch Service. Detta är ett nytt alternativ för att titta på kataloger för uppdateringar. Den har en tråd för varje filsystem istället för en tråd per datamängd. Troligtvis kommer detta drastiskt minska antalet trådar som används för att titta på förändringar. Det betyder att alla datamängder uppdateras tillsammans istället för att varje datamängd har sin egen uppdateringsfrekvens. Troligtvis kommer detta att innebära mer frekventa uppdateringar för de flesta datamängder.
        
För att möjliggöra detta tillägg&lt;AnvändSharedWatchService&gt;&lt;/useSharedWatchService&gt; till din setup.xml.
        
          
Prova detta och rapportera tillbaka hur det fungerar för dig att chris. john på noaa.gov.
         
    * Fix för felaktiga var namn i loggar. Tack Ayush Singh för fixen.
         
    * Vissa små förändringar och buggfixar.
         
*    **Förbättringar förERDDAP™utvecklare:** 
    * Stöd för lokal utveckling med hjälp av Docker. Tack Matt Hopson och Roje.
         
    * Stöd för lokal utveckling med hjälp av Jetty och dokumentationsförbättringar. Tack Micah Wengren.
         
    * Ändringar av tester för att minska problem plattform. Tack Shane Savage.
         

## Version 2.23{#version-223} 
 (släppt 2023-02-27) 

Observera att denna utgåva gjordes av Bob Simons, vilket visar att han fortfarande är runt och aktiv under övergången till Chris John, hans efterträdare. Alla kodändringar görs av Chis John, om inte annat anges.

*    **Nya funktioner och förändringar (för användare) Från:** 
    *    (Ingen)   
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * För att göra: Security Change: Google Authentication uppnås nu via det nya Google Identity Services-biblioteket som ingår i "Sign In with Google". Googles stöd för det gamla "Google Sign In"-systemet kommer att avbrytas 2023-03-31. Om du använder Google Authentication i dinERDDAP™installation, du måste uppdatera tillERDDAP™v2.23+ innan dess. (Bob är ledsen för det korta meddelandet. Det är Bobs fel.)   
         
    * NCCSV är nu v1.2. Ändringen är att filerna nu är UTF-8-kodade filer (De var ASCII) och så kan nu inkludera någon Unicode-karaktär som är, utan kodning som \\u_hhhh_, även om det fortfarande är tillåtet.
När du skriver NCCSV-filer,ERDDAP™Nu skriver v1.2-filer.
        ERDDAP™Läs fortfarande NCCSV-filer som följer v1.0 och v1.1-specifikationen.
Tack vare Pauline-Chauvet, n-a-t-e och thogar-dator för att föreslå detta och göra testerna för att säkerställa att olika kalkylprogram kan importera UTF-8 filer. Tack vare Bob Simons för denna kodändring.
         
    * NEW: Status.html webbsida har nu en linje nära toppen som indikerar vilka dataset loadDatasets för närvarande laddar och relaterad statistik, eller ingen om ingen dataset laddas. Detta kan vara till stor hjälp förERDDAP™administratörer som försöker lista ut varför last Dataset tar så lång tid. Också, nGridDatasets, nTableDatasets och nTotalDatasets räknas nedan som nu är omedelbara (tidigare var de i slutet av den sista stora belastningen Dataset) .
Denna förändring är för Roy Mendelssohn. Tack vare Bob Simons för denna kodändring.
         
    * IMPROVED: GenerateDatasets Xml ändras nu till CF-1.10 (CF-1,6) i "Konventioner" attribut.
Tack vare Bob Simons för denna kodändring.
         
    * Vissa små förändringar och buggfixar.
         

## Version 2.22{#version-222} 
 (släppt 2022-12-08) 

Observera att denna utgåva gjordes av Bob Simons, vilket visar att han fortfarande är runt och aktiv under övergången till sin efterträdare.

*    **Nya funktioner och förändringar (för användare) Från:** 
    *    (Ingen)   
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * För att göra: ingenting.
         
    * Security Bug Fix: Det fanns en Cross Site Scripting-relaterad bugg i koden för språkvalet sjunker ner. Tack vareNOAAsäkerhetsskanningar för att fånga detta. Detta visar attNOAAsäkerhet är aktivt och rutinmässigt letar efter säkerhetssvagheter iERDDAP.
         
    * Security Fix: De många bibliotek som används avERDDAP™uppdaterades som vanligt som en del av denna release. Den här gången inkluderade detta uppdatering av PostgreSQL-föraren (som hade en säkerhetsbugg) till 42.5.1.
         
    * IMPROVED: Mer små förändringarERDDAPMinneshanteringssystem bör minska risken för en viss förfrågan som misslyckas på grund av brist på tillgängligt minne.
         
    * Vissa små förändringar och buggfixar.
         

## Version 2.21{#version-221} 
 (släppt 2022-10-09) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    *    (Ingen)   
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * TO DO: FörJava17, bör du inte använda \\-d64 i JAVA\\_OPTS i setenv.bat eller setenv.sh. Så om det är där, vänligen ta bort det. Jag tror att 64 bit läge nu väljs när du laddar ner en 64 bit version avJava. Tack till Sam Woodman.
         
    * BUG FIX: Ibland försökte det nya e-postsystemet logga in alltför ofta, vilket ledde till att Googles e-postservrar avvisade alla framtida loggar i försök. Nu undviker e-postsystemet detta och relaterade problem.
         

## Version 2.20{#version-220} 
 (släppt 2022-09-30) 

*    **Använd inte v2.20. Det är bristfälligt.** Men administratörer behöver fortfarande göra de TO DO-objekt som anges nedan när du uppgraderar till v2.21 +.
     
*    **Nya funktioner och förändringar (för användare) Från:** 
    *    (Ingen)   
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Vi aktiverade det gamla minneshanteringssystemet (Math2.ensureMemory Tillgänglig) och modifierat det nya minneshanteringssystemet (EDStatic.shedThisRequest) att arbeta bättre med det. Se[Minnesstatus](/docs/server-admin/additional-information#memory-status)för detaljer.
         
    * CHANGED: Standarden för&lt;ipAddressMaxRequests &gt; in idatasets.xmlökades från 7 till 15. Det är klart att vissa legitimaWMSKunder kan generera mer än 7 samtidiga förfrågningar.
         

## Version 2.19{#version-219} 
 (släppt 2022-09-01) 

*    **Använd inte v2.19. Det är bristfälligt.** Men administratörer behöver fortfarande göra de TO DO-objekt som anges nedan när du uppgraderar till v2.20+.
     
*    **Nya funktioner och förändringar (för användare) Från:** 
    * NEW: Det finns en ny server-side funktion,orderBynedåt, som fungerar somorderByMen sorterar i nedstigande ordning. Tack till Adam Leadbetter.
         
    * IMPROVED: Nu, grafer (Men inte kartor) expanderar för att fylla det tillgängliga utrymmet på duken, dvs utrymme som inte används av legenden. Du kan få höga grafer, kvadratgrafer eller breda grafer genom att lägga till och manipulera &.size=_width_|_height_ parameter (där bredd och höjd specificerar dukens storlek, i pixlar) på begäran URL. (Detta är inte ett alternativ på .graph-webbsidan. Du måste lägga till den i URL manuellt.) Om du inte specificerar parametern &.size, förfrågningar om .smallPng, .png, .largePng, .smallPdf, .pdf och .large.pdf har fördefinierade dukstorlekar, så din graf kommer att expandera för att fylla det tillgängliga utrymmet, men kommer vanligtvis att vara ungefär kvadrat. Tack till Bob Fleming.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * För att göra:ERDDAP™nu kräverJava17 och tillhörande Tomcat 10. Du måste följaERDDAP™installationsanvisningar (eller motsvarande t.ex. för Docker) för att installeraJava17 och Tomcat 10 och kopiera din\\[Tomcat\\]Innehållskatalog från din Tomcat 8-installation till den nya\\[Tomcat\\]katalog. Det finns inga andra förändringar som du behöver göra till dinERDDAPinstallation relaterad till denna förändring. Med andra ord,ERDDAP™fungerar som det gjorde förut.
        
Glöm inte att göraERDDAP-relaterade ändringar av Tomcats server.xml och kontext.xml när du uppgraderar Tomcat. SeERDDAP"S[Tomcat installationsanvisningar](/docs/server-admin/deploy-install#tomcat).
        
Mitt intryck avJava17 är att det föredrar mer bearbetningskraft och minne för långvariga, större applikationer somERDDAP™så det fungerar något långsammare änJava8 med låga kraftdatorer (t.ex. 2 kärnor och minimal RAM) och fungerar något snabbare änJava8 med högre kraftdatorer (t.ex. 4+ kärnor och rikligt RAM) . Så om du ser dålig prestanda, använd program som Linux[toppen](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)kontrollera resursanvändning och överväga att geERDDAP™mer resurser, särskilt mer minne. Minne är billigt&#33; De flesta telefoner har fler processorer och minne än de servrar som några av er använder för att köraERDDAP&#33;&#33;
Tack till Erin Turnbull.
         
        
    * TO DO: Om du använderERDDAP™för att komma åt Cassandra, för Cassandra, måste du fortsätta använda versionen avJavaatt du använde för att köra Cassandra. Bara byta tillJava17 för att köra Tomcat+ERDDAP.
         
    * TO DO: Rekommenderas: Om din servers CPU har 4 + kärnor och 8 + GB RAM, överväga att ändra till dessa inställningar i din serverdatasets.xmlFil:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Om din server har färre resurser, håll dig till "1" för båda inställningarna.
nThreads system förEDDGridFromFiles och EDDTable FromFiles förbättrades signifikant. Dessa förändringar ledde till en stor hastighetsförbättring (2X speedup när nThreads är inställd på 2 eller mer) för de mest utmanande förfrågningarna (när ett stort antal filer måste behandlas för att samla in resultaten) . Vissa relaterade förändringar från Chris John kommer också att leda till en allmän hastighet.ERDDAP. Koden för dessa ändringar bidrog till Chris John. Tack, Chris&#33;
         
    * VARNING: Hyphens indatasetID"S depreceras och stöds inte längre (även tekniskt tillåtet) . De kommer antagligen att bli avslappnade i nästa release. Om du använder hyphens, byt till understrykningar nu för att undvika problem. Om du gör förändringen nu är det i din egen hastighet. Om du väntar till nästa release, kommer du att vara i panik och måste hantera det den dagen.
         
    * NY: Nu, för.htmlTabledatarespons, om data i en strängcell innehåller data:bild/png;bas64, följt av en bas64 kodad .png-bild,ERDDAP™Visa en ikon (Så användaren kan se bilden om de svävar över den) och knappar för att spara texten eller bilden till klippbordet. Tack vare Marco Alba (som bidrog med koden) och Bob Simons (som modifierade den något) .
         
    * NEW: -DoNotAddStandardNames
Om du inkluderar \\-doNotAddStandardNames som en kommandoradsparameter när du kör generera Dataset Xml, generera Dataset Xml kommer inte att lägga tillstandard\\_nametilladdAttributesför andra variabler än variabler som heter latitud, longitud, höjd, djup eller tid (som har uppenbartstandard\\_names) . Detta kan vara användbart om du använder utgången från att generera Dataset Xml direkt iERDDAP™utan att redigera utgången, för att generera Dataset Xml gissar oftastandard\\_names felaktigt. (Observera att vi alltid rekommenderar att du redigerar utgången innan du använder den iERDDAP.) Använda denna parameter kommer att ha andra mindre relaterade effekter eftersom den gissadestandard\\_nameanvänds ofta för andra ändamål, t.ex. för att skapa en nylong\\_nameoch skapa färgBar inställningar. Tack vare Kevin O'Brien.
         
    * NY: Du kan nu sätta&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; in idatasets.xml  (med de andra inställningarna nära toppen) ändra det maximala antalet filändringar (Standard=10) Det kommer att behandlas av uppdateringenEveryNMillis-systemet. Ett större antal (100?) kan vara användbart när det är mycket viktigt att datamängden hålls alltid uppdaterad. Se[updateMaxEvents dokumentation](/docs/server-admin/datasets#updatemaxevents). Tack till John Maurer.
         
    * Nytt: Tillagt stöd för globaltreal\\_time=True|falska "sträng attribut.
Om detta är falskt (Default) och om datasetet inte använder uppdatering EveryNMillis,ERDDAP™cach svar på förfrågningar om filtyper där hela filen måste skapas innanERDDAP™kan börja skicka svaret till användaren och återanvända dem i upp till 15 minuter (t.ex.,.nc.png) .
Om detta är sant eller om datamängden använder uppdatering EveryNMillis,ERDDAP™kommer aldrig att cacha svarsfilerna och kommer alltid att returnera nyskapade filer.
Tack till John Maurer.
         
    * NEW: E-postmeddelanden skickas nu i ett separat e-postmeddelande. Detta gör laddningsdataset och andra åtgärder som genererar e-post snabbare eftersom loadDatasets inte behöver vänta på att e-postmeddelandet skickas, vilket ibland tar lång tid. Det nya systemet kan skicka flera e-postmeddelanden per e-post session, vilket minskar antalet e-postserver inloggningar och minskar risken för de som misslyckas eftersom de är för frekventa. Det finns statistik för e-postThread på status.html-sidan och diagnostiska meddelanden i log.txt - leta efter "emailThread". Observera att ett tal av nEmailsPerSession = 0, indikerar problem, dvs en e-postsession inte kunde skicka några e-postmeddelanden.
Tack till Bob Simons.
         
    * CHANGED: E-postmeddelanden skickas nu med något annorlunda kod (på grund avJava17 och ändringen till emailThread) . Om du har problem med att skicka e-post, vänligen e-posterd.data at noaa.gov.
         
    * NEW: Abonnemangsåtgärder som "berör" en fjärrURL hanteras nu i en separat touchThread. Detta gör laddningsdataset och andra åtgärder som rör URL-adresser snabbare eftersom loadDatasets inte behöver vänta på att beröringen ska slutföras, vilket ibland tar lång tid. Det finns statistik för touchThread på status.html-sidan och diagnostiska meddelanden i log.txt - leta efter "touchThread".
Tack till Bob Simons.
         
    * NEW: På status.html-sidan, i "Major LoadDatasets Time Series", finns det en ny "shed"-kolumn som anger antalet förfrågningar som skeddes eftersom nuvarandeERDDAP™minnesanvändningen var för hög. Förfrågningar som kastas kommer att returnera HTTP statuskod 503 "Service Available". Dessa förfrågningar var inte nödvändigtvis ett problem. De kom bara till en upptagen tid. Detta var en del av en revamp av hurERDDAP™handlar om hög minnesanvändning.
         
    * NEW: På Unix / Linux-datorer finns det nu en "OS Info" -linje på status.html-webbsidan med aktuell operativsysteminformation inklusive CPU-belastning och minnesanvändning.
         
    * VIKTIGT: Nu närERDDAP™omstartas och quickRestart=true, EDDTableFromFiles datasets kommer att återanvända subset.ncoch distinkt.nc. För vissa datamängder minskar detta mycket tid att ladda datamängden (t.ex. från 60 sekunder till 0,3) . Tillsammans med den nya e-postThread och uppgiftThread (Se ovan) Detta bör i hög grad påskynda omstartERDDAP™för mångaERDDAP™installationer. Tack vare Ben Adams och John Kerfoot.
         
    * CHANGED: Tidigare, föräldralösa dataset (Dataset som lever iERDDAP™Men är inte idatasets.xml) noterades helt enkelt på status. html och i log.txt efter varje större lastDatasets. Nu tas de bort automatiskt frånERDDAP™och noteras på status.html och i log.txt, och mailas till e-post Allt att. Så om du vill ta bort en dataset frånERDDAP™Nu allt du behöver göra är att ta bort sin bit xml idatasets.xmlOch det kommer att tas bort i nästa stora lastDatasets. Tack till Bob Simons.
         
    * KNOWN BUG i netcdf-java v5.5.2 och v5.5.3: ochEDDGridFrånThredds Katalogalternativ i GenerateDatasets Xml brukade arbeta för THREDDS-kataloger som inkluderar referenser till datamängder i avlägsna THREDDS-kataloger. Nu gör det inte. Jag har rapporterat problemet till netcdf-java utvecklare.
         
    * BUG FIX: För Docker användare inställning.xml parametrar viaERDDAP\\_paramName_: för int och booleanska parametrar (e.g., e-post SmtpPort) ,ERDDAP™Söker felaktigt bara _paramName_. Nu ser det ut för _ERDDAP\\_paramname_. Tack vare Alessandro De Donno.
         
    * Change: TheERDDAP™Testsystemet använder nu ett automatiserat system för att kontrollera att nybildade testbilder är exakt lika förväntade. Tack till Chris John för förslag och Bob Simons för genomförandet.
         

## Version 2.18{#version-218} 
 (släppt 2022-02-23) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    * Ingen
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * BUG FIX:.ncfiler stängdes inte under vissa omständigheter. Nu är de. Tack vare Marco Alba, Roland Schweitzer, John Maurer och andra.
         

## Version 2.17{#version-217} 
 (släppt 2022-02-16) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    * BUG FIX: Efter förändringar iorderBysystem för några år sedan, Tabledap's Make A Graph hanterade inte riktigt många frågor som användesorderBy_Xxx_. Nu gör det. Tack vare Maurice Libes.
         
    * Change: Tidigare,ERDDAP™förkastade förfrågningar om . transparent transparent transparent Pngs när latitud- och/eller longitudvärdena delvis eller helt var out-of-range. (ERDDAP™GitHub frågor #19, publicerad av Rob Fuller - tack för att ha publicerat den Rob) Nu returnerar den transparenta pixlar för alla utomordentliga delar av bilden. Detta är användbart för många klientapplikationer. Koden ändras för att göra denna förändring gjordes helt av Chris John. Tack så mycket, Chris&#33;
         
    * Change: Tidigare,ERDDAP™avvisade ansökningar om nätdatorer där indexvärdena för en given dimension var\\[hög:low\\]. Nu gör det dessa förfrågningar giltiga genom att byta de låga och höga värdena. Detta löser ett långvarigt problem för användare och för externa program som xtracto som var tvungna att hålla reda på de få datamängder som har latitudvärden som sträcker sig från högt till lågt för att göra begäran som\\[ (50 50 50) Från: (20 20 20 20) \\]att begäran i indexutrymme var\\[låg:hög\\]. Se https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Nu, en förfrågan som\\[ (20 20 20 20) Från: (50 50 50) \\]för en av dessa datamängder tolkas automatiskt som\\[ (50 50 50) Från: (20 20 20 20) \\].
         
    * .esriAscii-förfrågningar utlöser nu en "File: Save As"-dialogruta i användarens webbläsare. Tack till Joel Van Noord.
         
    * BUG FIX: Nu, om longitudvariabeln för ett barns datamängd av enEDDGridLonPM180 ellerEDDGridLon0360 dataset har envalid\\_minoch/ellervalid\\_maxDe är borttagna iEDDGridLonPM180 ellerEDDGridLon0360 dataset. Tack till Roy Mendelssohn.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * TO DO: Om du hade satt&lt;dataProviderFormActive&gt; till falskt att tillfälligt hantera XSS sårbarhet, vänligen ange det tillbaka till sant.
         
    * SECURITY BUG FIX: Fast XSS sårbarhet i Data Provider Form. Tack vare Genaro Contreras Gutiérrez.
         
    * BUG FIX: När en AWS S3-sprit hade mer än 10000 filer,ERDDAP™kastade en "intern fel". Detta är nu fixat. Tack till Andy Ziegler.
         
    * BUG FIX:EDDGridSideBySide tillät inte variabelnssourceNames i olika barnuppgifter för att vara densamma. Nu gör det. Tack till Joshua Stanford.
         

## Version 2.16{#version-216} 
 (släppt 2021-12-17) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    * CHANGES/BUG FIXES: Många små förändringar i översättningssystemet tack vare förslag från språkspecifika redaktörer. Tack vare Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian och Mike Smit.
         
    * ADDED en ordentlig ansvarsfriskrivning och tillskrivning för Google Translate, enligt villkoren i Google Translate. också, den&lt;html&gt; tagga i HTML för varje webbsida identifierar nu korrekt icke-engelska webbsidor som maskin översatt. Tack till Mike Smit.
         
    * BUG FIX: Inloggningswebbsidorna fungerar nu korrekt med olika språkinställningar. Tack till Mike Smit.
         
    * NyttorderBySumma filter. Och ny kontroll allt och avmarkera alla knappar påEDDGridData Access Form webbsida. Tack vare kodbidraget av Marco Alba.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * För att göra: Om du har
        &lt;FrågaMarkImageFile&gt;QuestionMark.jpg&lt;/questionMarkImageFile&gt;
i din setup.xml-fil måste du antingen ta bort hela taggen (rekommenderas, så standardfilen används) Eller ändra det till:
        &lt;FrågaMarkImageFile&gt;QuestionMark.png&lt;/questionMarkImageFile&gt;
         
    * Change: Just so you know[Adoptium](https://adoptium.net/?variant=openjdk8)har ersatt AdoptOpenJDK som huvud/rekommenderad källaJava  (OpenJDK) .
         
    * CHANGE: Logfilerna frånERDDAP™GenerateDatasets Xml och DasDds är nu UTF-8, inte datorns standardfigur. Jag gjorde mycket kontroll och gjorde några ändringar för att säkerställa attERDDAP™Anger alltid rätt karaktär när du läser eller skriver alla typer av filer, och inte längre (i flera fall) förlitar sig på datorns standardfiguruppsättning. Detta korrigerade några misstag och flyttade så nära jag kunde till målet att använda UTF-8 för så många filtyper som möjligt. (t.ex. .log, .xml, .html,.json,.jsonL,.ncHeader) . Observera att många äldre filtyper krävs för att använda ISO-8859-1 (t.ex.,OPeNDAP.das, .dds, .csv,.tsv,.nc3,.nccsv, .cpt) . Jag har tidigare försökt arbeta med CF-gruppen och medUnidatalägga till stöd för UTF-8 i.nc3 filer; båda var resistenta.
         
    * NEW: När du laddar ner filer från AWS S3ERDDAPCache FrånUrl system iEDDGridFromFiles och EDDTable FromFiles använder nu den nya AWS Transfer Manager för att ladda ner filer via parallella bitar (Så mycket snabbt) . Målet genomströmning är inställd på 20 Gbps, per fil, så detta fungerar bra med alla AWS instanstyper, men särskilt de som har utmärkt "Nätverksprestanda". Med denna förändringERDDAPCache FromUrl-systemet erbjuder nu jämförbara hastigheter till röntgensyn av parallella nedladdningar av pre-chunked-filer, men utan att behöva konvertera källfilerna från.ncoch.hdfi chunked röntgen filer. Faktum är attERDDAPsystemet är bättre om det finns en efterföljande begäran att läsa från samma fil, eftersomERDDAP™Nu har en lokal kopia av filen. Vårt samhälle har tillbringat år med att standardisera på.ncoch.hdffiler. Nu behöver vi inte kasta ut allt för att få bra prestanda när vi lagrar data i AWS S3. Tack vare Rich Signell.
         
    * CHANGE: searchEngine=Lucene är för närvarande deprecated. Det är ett komplext system som ofta ger resultat som är något annorlunda än det mer önskvärda beteendet hos searchEngine=original. För nästan allaERDDAP™installationer, tidsbesparingar av Lucene kompenserar inte skillnaderna i resultaten. Använd sökmotor=original istället om möjligt. Om det orsakar problem, vänligen maila Bob.
         
    * Lucene searchEngine beter sig nu mer som den ursprungliga sökmotorn. Det finns inte längre några fall där lucene tror att en dataset matcher och original inte. Lucenes rankningar nu lika original ranking (eftersom originalet nu alltid används för att beräkna rankningen) .
         
    * BUG FIX: Börjar i en ny release,ERDDAP™slutade se mer än de första 1000 objekten i en given AWS S3 hink. Nu,ERDDAP™återigen ser alla objekt. Tack till Andy Ziegler.
         
    * BUG FIX: Nu EDDTableAggregate Rows tar bortactual\\_rangeattribut när en eller flera av barnens datamängder aldrig vet dess variabler "actual\\_range  (t.ex. EDDTableFromDatabase) . Tack vare Erik Geletti.
         

## version 2.15{#version-215} 
 (släppt 2021-11-19) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    *   ERDDAP™har ett nytt system för att låta användaren ange språket som ska användas för alla webbsidor. Om enERDDAP™installationen är inställd för att använda den, listan över språk kommer att visas i övre högra hörnet av varje webbsida.ERDDAP™URL: s från innan denna version fortsätter att fungera och returnerar alltid engelska innehåll, som tidigare.
        
Inte all text eller alla webbsidor översattes. Det fanns tidsbegränsningar på detta projekt som hindrade Qi och Bob från att komma till 100%.
        
Den uppenbara frågan är: varför gjorde vi så mycket ansträngning i detta när Chrome kommer att översätta webbsidor på flygningen? Svaret är: På så sätt får vi mycket mer kontroll över hur översättningen görs. Det finns särskilt många ord som inte bör översättas på webbsidorna, t.ex. titlarna och sammanfattningarna av datamängder, namnen på variabler, parametrar, enheter och organisationer. Mycket av översättningsarbetet var att identifiera ord och fraser som inte borde översättas. Dessutom tenderade maskinöversättningarna att mangla vissa typer av HTML-markup. Att hantera översättningen gjorde det möjligt för oss att minimera detta problem.
        
Översättningsprojektet gjordes av Qi Zeng (en Google Summer of Code intern) och Bob Simons använder Googles översättningswebbtjänst. Det var ett stort projekt. Tack, Qi&#33;
        
    * BUG FIX:ERDDAP™Nu tillåter ORCID-ID att ha X som sista siffra. Tack vare Maurice Libes.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * För att göra:
        
        * Du måste göra några ändringar relaterade tillERDDAP"Det nya systemet för att låta användare ange språket för webbsidor.
            * På den första raden av din setup.xml ochdatasets.xmlfiler, ändra till: kodning = "UTF-8" och ändra dokumentets kodning i din textredigerare så det sparas som en UTF-8-fil. GenerateDatasets Xml antar nu attdatasets.xmlär en UTF-8-fil.
            * programmerare som sammanställerERDDAPFrån: AllaERDDAP™.java-filer bör behandlas som UTF-8-filer som standard. Du kan behöva lägga till "-kodning UTF-8" till kommandoraden Javac. (Jag gjorde det.) 
            * För att möjliggöra detta system (starkt rekommenderat) i den&lt;StartBodyHtml5&gt; tagga som du anger idatasets.xmländra "&amp&#33;loginInfo;" till "&amp&#33;loginInfo;|Och amp&#33;språk, så att listan över språk visas i övre högra hörnet av varjeERDDAP™webbsida.
            *   ERDDAP™endast använder&lt;StartBodyHtml5&gt; tagga som du anger idatasets.xmlför att ange HTML-innehållet för bannern högst upp på varjeERDDAP™webbsida, oavsett vilket språk användaren väljer. Om du ändrar den taggen för att använda
"&EasierAccessToScientificData;i stället för "Easier access to science data" och
"&BroughtToYouBy;Istället för "Brought to you by"ERDDAP™använder översatta versioner av dessa fraser i bannern.
            * Likaså den nya standarden&lt;TheShortDescriptionHtml&gt; idatasets.xmlär att
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
De sista 3 innehållslinjerna är saker som kommer att ersättas med översatt text. Om du konverterar någon av dem (Notably &this Särskilt Erddap;) eller alla av dem att explicit text idatasets.xml  (som har prioritet, om nutiden) eller messages.xml, den texten visas oavsett vilket språk användaren väljer. Detta är inte perfekt, men jag tänkte att få administratörer skulle vilja redigera&lt;TheShortDescriptionHtml&gt; i 35 olika filer för att ge 35 olika översatta versioner av den taggen.
        
          
         
    * CHANGED: Vissa fel hanteras nu något annorlunda och så kan läggas till i tallyt av "misslyckade förfrågningar" på status.html och i Daily Report Email. Så dessa siffror kan vara något större än tidigare.
         
    * BUG FIX: GenerateDatasets Xml förEDDGridLon0360 ochEDDGridLonPM180 utesluter nu källdataset meddatasetID"".\\*LonPM180" ochdatasetID"".\\*\\_Lon0360", respektive.
         

## Version 2.14{#version-214} 
 (släppt 2021-07-02) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    *    (Ingen)   
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Ny:EDDGridLon0360 som gör ett rutnät med longitudvärden &gt;=0 och&lt;=360 från en rutnäterad dataset med longitudvärden &gt;=-180 och&lt;=180. Se[EDDGridLon0360 dokumentation](/docs/server-admin/datasets#eddgridlon0360). Tack till Dale Robinson.
         
    * Ny:ERDDAP™administratörer kan nu åsidosätta något värde i setup.xml via en miljövariabel som heterERDDAP\\_valueName_ innan du körERDDAP. Till exempel, AnvändERDDAPBaseUrl åsidosätter&lt;BasUrl&gt; värde. Detta kan vara praktiskt när du distribuerarERDDAP™med en behållare, eftersom du kan sätta standardinställningar i setup.xml och sedan leverera speciella inställningar via miljövariabler. Om du lämnar hemlig information tillERDDAP™via denna metod, se till att kontrollera att informationen kommer att förbli hemlig.ERDDAP™läser bara miljövariablerna en gång per uppstart, under den första sekunden av uppstarten, så ett sätt att använda detta är: sätt miljövariabler, börjaERDDAP™Vänta tillERDDAP™startas, sedan störa miljövariablerna. Tack vare Marc Portier.
         
    * IMPROVED: Nu, om vissa filer i en EDDTableFrån... Filer datamängd med många filer har några mycket långa String-värden, datamängden kommer att ladda mycket snabbare och svara på förfrågningar mycket snabbare. Tidigare,ERDDAP™skulle fördela mycket utrymme för min och max String-värden i filerna som lagras med filinformation för sådana datamängder. Den resulterande filen var stor, vilket gjorde att den skrevs och lästes långsamt. Tack till OBIS.
         
    * VIKTIGT: Nu,ERDDAP™Gör ett bättre jobb med att tolka ovanliga och ogiltiga karaktärssekvenser i CSV-filer. Tack till OBIS.
         
    * Efter ett år av problem med Cassandra, jag äntligen framgångsrikt installerade Cassandra (v2) Återigen kunde man köra om testerna med Cassandra v2. Nu kan jag mer självsäkert säga attERDDAP™arbetar med Cassandra v2 och v3. Tack vare ONC.
         

## Version 2.12{#version-212} 
 (släppt 2021-05-14) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    * BUG FIX: Om du är på abonnemanget svartlista, kan du nu inte begära en lista över dina prenumerationer.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * TO DO: NY: system för att automatiskt begränsa förmågan hos skadliga användare och alltför aggressiva legitima användare att göra ett stort antal samtidiga förfrågningar som skulle försämra systemets prestanda för andra användare. Det finns 3 nya valfria taggar idatasets.xmlsom du kan/bör lägga till direkt efter&lt;grafBackgroundColor &gt;:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

För ytterligare information, se[ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™Nu trycker man på "Nummer av unika användare (Sedan start) på status.html-sidan.
Tack vare att personen i Kina attackerar minERDDAP™installation.
         
    * CHANGE till Postgresql förarbeteende: När jag uppdaterade Postgresql-drivrutinen kom kolumnnamnen i tabelllistan som genererades av Postgresql och GenerateDatasetsXml tillbaka i alla fall, i stället för alla kolumner, som tidigare. Jag vet inte om det kommer att påverka andra saker eftersom databaser ofta anser att dessa namn är okänsliga. Min testdataset fungerar fortfarande korrekt. Men om din dataset slutar fungera med dettaERDDAP™uppdatering, detta är den möjliga orsaken att fortsätta först.
         
    * BUG FIX:ERDDAP™Nu hanterar också privata AWS S3-filer korrekt. Det fanns andra relaterade förbättringar av hanteringen av AWS S3-filer. Tack vare Michael Gangl och Dylan Pugh.
         
    * Ny:EDDGridFrånNcFiles ochEDDGridFrånNcFiles Unpacked kan nu läsa data från "strukturer" i.nc4 och.hdf4 filer. För att identifiera en variabel som kommer från en struktur,&lt;sourceName&gt; &gt; &gt; &gt; &gt; Använd formatet: _fullStructureName_|_memberName_, till exempel grupp1/myStruct|MyMember. Tack till NRL.
         
    * CHANGED: Nu, om nuvarande minnesanvändning plus denna förfrågan är ännu något hög, rutnätsuppsättningar nThreads för denna begäran till 1. Således,ERDDAP™bevarar minnet när minnet är knappt. Tack vare att personen i Kina attackerar minERDDAP™installation.
         
    * Nytt system för att övervaka antalet öppna filer (som inkluderar uttag och andra saker, inte bara filer) I Tomcat på Linux-datorer. Om vissa filer felaktigt aldrig stängs kan antalet öppna filer öka tills det överstiger det maximala tillåtna och många riktigt dåliga saker händer. Så nu på Linux-datorer (Informationen är inte tillgänglig för Windows) Från:
        
        * Det finns en ny "Öppna filer"-kolumn längst till höger om status.html-webbsidan som visar procenten av max-filerna öppna. På Windows visar det bara "?".
        * När närERDDAP™genererar den informationen i slutet av varje större dataset-reload, den kommer att skrivas ut till loggen. txt fil:
openFileCount=_current_ av max=_max_%=_percent_
        * Om andelen är &gt;50% skickas ett e-postmeddelande tillERDDAP™administratör och e-post Allting Allt Till e-postadresser.
        
För att ta reda på mer, eller om du ser detta problem på dinERDDAP™Se, se[För många öppna filer](/docs/server-admin/additional-information#too-many-open-files).
Tack vare att personen i Kina attackerar minERDDAP™installation.
         
    * NEW: Jag lade till mycket kontroll och hantering av "För många öppna filer", så uppgiften stannar bara och användaren ser felmeddelandet. Datafiler kommer inte längre att markeras som dåligt om du läser dem resulterar i ett "för många öppna filer" fel.
         
    * Nytt\\[bigParentDirectory\\]/badFilesFlag katalog:
Om du lägger en fil i den här katalogen med endatasetIDsom filnamn (filinnehåll spelar ingen roll) ,ERDDAP™kommer att radera badFiles.ncfil för den dataset (Om någon) och ladda om dataset ASAP. Detta orsakarERDDAP™försök igen att arbeta med filerna tidigare (felaktigt?) markerad som dålig. Tack vare Marco Alba.
         
    * CHANGED: Vid start, om enEDDGridFrån...Files or EDDTableFrom... Filer dataset ursprungligen har 0 filer i sin lista över kända giltiga filer (Det är till exempel en ny dataset) SedanERDDAP™skjuter upp den och sätter en flagga så att den kommer att laddas ASAP efter att de stora loadDatasets är klar. Detta påskyndar den första starten när det finns nya dataset.
         
    * FileVisitorDNLS.testAWSS3 () FileVisitorSubdir.testAWSS3 () Använd nu AWS v2 (inte v1) SDK. Så nu GitERDDAP™distribution innehåller nu alla nödvändiga filer och du behöver inte längre manuellt lägga till den massiva v1 AWS SDK-burkfilen.
         
    * Jag bytte till att använda Maven för att upptäcka / samla beroenden (.jar-filer i /lib) . Förändringen till v2 av AWS SDK krävde detta. Det behövs för annan importerad kod i framtiden. Ett stort tack till Kyle Wilcox som gav pom.xml han skapade och använder, som löste flera problem för mig.
         
    * CHANGED: Classpath parameter (-cp) används i GenerateDatasetXml, DasDds och andra små program som kommer medERDDAP™, och i råd till programmerare är nu mycket enklare och bör aldrig ändras igen eftersom det hänvisar till katalogen, inte enskilda filer:
\\-cp klasser;C:\\programs&#125;&#125;_tomcat\\lib\\servlet-api.jar;lib *
         (eller ":" istället för ";" för Linux och Mac) .
         (Jag borde ha gjort detta år sedan när det blev ett alternativ.)   
         
    * Ny: GenerateDatasets Xml har ett nytt verktygsalternativ: findDuplicateTime som kommer att söka genom en samling rutnät.nc  (och relaterade) filer för att hitta filer med dubbla tidsvärden. Se[FindDuplicate Tid](/docs/server-admin/datasets#findduplicatetime)  
         
    * Ny:datasets.xmlKan nu inkludera en&lt;Paletter &gt; tag som åsidosätter&lt;Palettes&gt; tag value from messages.xml (eller återgå till meddelandena.xml värde om det är tomt) . Detta låter dig ändra listan över tillgängliga paletter medanERDDAP™är igång. Om du har en cptfiles underkatalog iERDDAP™innehållskatalog,ERDDAP™kopiera alla \\*.cpt-filer i den katalogen i\\[Tomcat\\]/webapps/erddap/WEB-INF/cptfiles katalog varje gångERDDAP™Börjar upp. Tillsammans tillåter dessa ändringar att du lägger till paletter och har ändringarna kvarstår när du installerar en ny version avERDDAP. Se[Palettes dokumentation](/docs/server-admin/datasets#palettes)  
Tack till Jennifer Sevadjian, Melanie Abecassis, och kanske andra CoastWatch människor.
         
    * Förändrad: [&lt;slowDownTroubleMillis &gt;] (/docs/server-admin/datasets#slowdowntroublemillis) används nu för alla misslyckade förfrågningar, inte bara några typer.
         
    * CHANGED: RunLoadDatasets tråd nu avbryter LoadDatasets tråd på 3/4 LoadDatasets MaxMinutes så det finns mer tid för LoadDatasets att märka avbrott och avsluta graciöst. Det finns också fler och bättre diagnostiska meddelanden för detta.
         
    * Ändras från den gamla versionen av Lucene till v8.7.0.
         
    * Change: E-postmeddelanden som skickas avERDDAP™Nu visas med en fast bredd typsnitt.
         
    * Change:EDDGridFromFiles får nu axelvärden samt attribut från FIRST|LAST fil, som anges i&lt;metadataFrån&gt;. Tack (Inte inte) Ken Casey, et al.
         
    * ADDED stöd för de ogiltiga enheterna "degree\\_North" och "degree\\_East" som felaktigt används av de senaste filerna (Sedan 2020-10-01) i AVHRR Pathfinder Version 5.3 L3-Collated (L3C) SST dataset (nceiPH53sstd1day och nceiPH53sstn1day) .ERDDAP™kan nu standardisera dem till giltiga enheter. Tack (Inte inte) Ken Casey, et al.
         

## Version 2.11{#version-211} 
 (släppt 2020-12-04) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    * BUG FIX: OrderByMean kastade en NullPointerException om en variabel hade bara en av \\_FillValue eller saknade \\_ Värde definierat. Nu hanterar den situationen korrekt. Tack vare Marco Alba.
         
    * BUG FIX: Det fanns problem med ODV textfiler som skapats avERDDAP™i v2.10. Dessa problem är fixerade. Tack till Shaun Bell.
         
    * BUG FIX: Just inERDDAP™v2.10: Om lat lon gränserna specificerades i URL, var gränsrutan inte dras på världskartan. Nu är det igen. Tack till John Maurer.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * BUG FIX: Just inERDDAP™v2.10: Skriptfilerna för ArchiveADataset, GenerateDatasets Xml och DasDds fungerade inte eftersom de inte hade förändringar i klasspaten som tillsattes medERDDAP™v2.10. Nu gör de det. Tack vare Marco Alba.
         
    * Ny: Idatasets.xmlDu kan nu ha taggen:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

För närvarande, om sant (eller om taggen är tom, eller om taggen inte finns i filen) när en användares begäran leder till en NullPointerException,ERDDAP™kommer att maila stack spår tillerd.data at noaa.gov  (ochERDDAP™utvecklingsteam) . Detta bör vara säkert och säkert eftersom ingen konfidentiell information (t.ex. begäran) ingår i e-post. Detta bör göra det möjligt att fånga eventuella obskyra, helt oväntade buggar som leder till NullPointerExceptions. Annars ser användaren undantagen, menERDDAP™utvecklare vet inte, så vi vet inte att det finns ett problem som måste lösas.
        
Det är möjligt att denna tagg kommer att leda till att annan liknande diagnostisk information skickas tillerd.data at noaa.govi framtiden. E-postens innehåll kommer alltid att vara minimalt och relaterat till buggar, och inte till exempel användningsinformation. Tack vare Marco Alba.
         
        
    * CHANGED: Nu, vanliga komprimerade filtyper (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) är också förbjudna för förfrågningar om bytesintervall. Detta anges via&lt;extensionsNoRangeRequests&gt; i messages.xml.
         
    * Knulla Probert: Som medERDDAP™2.10,.ncml-filer som försöker ändra ett attribut, ändra inte attributet. Detta är en känd bugg i netcdf-java som jag har rapporterat och de säger kommer att fastställas i nästa utgåva av netcdf-java.
         

## Version 2.10{#version-210} 
 (släppt 2020-11-05) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    * Ny: Den nya[Interpolate](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)Omvandlare interpolerar effektivt värdena från en rutnätad dataset värderingar. Som sådan är det särskilt användbart för forskare som arbetar med data från djurspår. Denna omvandlare tar in en tabell med latitud, longitud och tid kolumner (och kanske andra kolumner) och returnerar en tabell med ytterligare kolumner med interpolerade värden. Detta liknar den populära[Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto)Manus som ursprungligen skapades av Dave Foley, men erbjuder fördelen med att bearbeta upp till 100 poäng per förfrågan. Tack till Dave Foley och Jordan Watson (NMFS) .
         
    * Avancerad sökning är nu strikt för icke-html-förfrågningar. Det kommer nu att kasta undantag för förfrågningar som har permanenta fel. (e.g. förfrågningar där minLat &gt; maxLat) eller tillfälliga fel (t.ex. begäran om enstandard\\_nameDet existerar inte) . För .html-förfrågningar är Advanced Search oförändrad: som med Google-sökningar gör det sina bästa och tysta fixar eller ignorerar fel. Tack vare Rich Signell.
         
    * IMPROVED: Kartan på Advanced Search-sidan är nu större (Du måste fortfarande squint, men mindre) och betydligt mer exakt (Men ändå inte perfekt) . Tack till John Maurer.
         
    * IMPROVED: Inställningen "Draw land mask" på Gör en grafwebbsidor och &.land =... inställning i webbadresser som begär en karta stöder nu ytterligare två alternativ:
"outline" drar bara landmaskkonturen, politiska gränser, sjöar och floder.
"off" drar ingenting.
Se[och.land=... dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Tack till John Maurer.
         
    * IMPROVED: Grafer och kartor som skapats avERDDAP™kan nu använda tre nya markörtyper: Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Triangle. Koden för detta bidrog till Marco Alba av ETT/EMODnet Physics. Tack vare Marco Alba.
         
    * Ny:"files"Systemet stöder nu plain Filtyp svar (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsveller.xhtml.) t.ex.,[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Tack vare Kyle Wilcox.
         
    * VIKTIGT: De webbadresser som genereras när en användare använder ett data Access-formulär (.html) Eller en Make-A-Graph (.graph) webbsida nu korrekt procent-kodar karaktärerna\\[och\\]. Detta gör webbadresserna lite svårare för människor att läsa, men är bättre från en webbsäkerhetssynpunkt. Administratörer har nu möjlighet att ställa in relaxedQueryChars = "\\[\\]|I Tomcat Server.xml-filen (mindre säker) eller inte (säkrare) .
Tack vare Antoine Queric, Dominic Fuller-Rowell och andra.
         
    * NEW: Om en begäran till en EDDTable dataset innehåller &add Variables Var där (_attribute Namn, attribut Value_) ,ERDDAP™kommer att lägga till alla variabler som har _attribute Namn =attribute Value_ till listan över begärda variabler.
Se[ochadd Variables Där dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Tack vare Aurelie Briand, et al.
         
    * Förändrad:ERDDAP™nu vägrar byte range förfrågningar till /files/.nceller.hdffiler. Försök inte ansluta till fjärrkontrollen.nceller.hdffiler som om de vore lokala filer. Det är fruktansvärt ineffektivt och orsakar ofta andra problem. Istället:
        * Användning(OPeN)DAPklientprogramvara för att ansluta tillERDDAP"SDAPtjänster för denna dataset (som har /griddap/ eller/tabledapI URL) . Det är vadDAPär för.
        * Använd datasetets Form för dataåtkomst för att begära en delmängd av data.
        * Om du behöver hela filen eller upprepad åtkomst under lång tid, användcurl,wget, eller din webbläsare för att ladda ner hela filen, sedan komma åt data från din lokala kopia av filen.
             
    * IMPROVED: .odv Txt-utgångsalternativ har skrivits om för att stödja den nya versionen avODV .txtfiler och för att stödja korrekt representation av banor, tidsserier och profildata.
         
    * Sökord i dubbla citat tolkas nu som en json sträng, så att de kan ha \\ kodade tecken. Bland annat kan du söka efter en exakt match för ett attribut, t.ex. "institution=NOAA\\nkommer inte att matcha en dataset med institution=NOAA NMFS. Tack till Dan Nowacki.
         
    * IMPROVED: På ytterligare platser, flytande punktnummer (Särskilt flyter konverterade till dubblar) nu visas som en något mer avrundad version av numret på ytterligare platser, t.ex. en flotta som tidigare visats som en dubbel som 32.27998779296875, kan nu visas som 32.28. Tack vare Kyle Wilcox.
         
    * BUG FIX: osignerade integer ljudfiler lästes något felaktigt. Nu läser de rätt.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * VARNING: Första gången du körERDDAP™v2.10, vissa dataset baserat på lokala datafiler kommer att laddas **väldigt mycket väldigt mycket** långsamt förERDDAP™måste återskapa sin databas med filinformation. Efter den långsamma initiala reloaden kommer de att ladda snabbt, som tidigare. Var tålmodig.
         
    * Saker du måste göra:
        * När du först kör v2.10 kan vissa datamängder inte laddas eftersomERDDAP™Nu är det strängare med vissa metadata. Som tidigare,ERDDAP™kommer att skicka dig en daglig rapport när den först laddas upp. Det kommer att innehålla felmeddelanden för varje datamängd som inte laddades. Läs felmeddelandena för att räkna ut problemen. I de flesta fall behöver du bara göra en liten förändring av datamängdens metadata för att lösa problemet.
             
        * Inomdatasets.xmlSök efter&lt;sourceNameoch gt;= (Notera'='Tecken, som identifierar en[Fast-värdesourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . För de flestaERDDAP™Inställningar, dessa är sällsynta. Om något av värdena efter'='är strängar (Inte siffror) Du måste nu omsluta strängen i dubbla offerter. Till exempel,
Före:&lt;sourceName=KZ401&lt;///sourceName&gt; &gt; &gt; &gt; &gt;
Efter:&lt;sourceName&gt;="KZ401"&lt;///sourceName&gt; &gt; &gt; &gt; &gt;
             
        * NEW: Det finns en ny valfri inställning i setup.xml,&lt;defaultAccessibleViaFiles&gt;, som sätter standarden&lt;tillgängligaViaFiles&gt; för var och en av datamängderna. Standarden för denna nya tag är falsk, som efterliknar den tidigareERDDAP™beteende. Denna lägre nivå inställning kan överskattas av en viss dataset&lt;tillgängligaViaFiles&gt; inställning.
            
Rekommenderad (För det finns användare som vill ha detta) Från:
Om du vill göra allt EDD... FrånFiles dataset tillgängliga via filsystemet, sedan
            
            1. Lägg till den här taggen till din setup.xml-fil:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Optionellt) Ta bort alla
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
in idatasets.xmlEftersom standarden nu är sant.
                 
        * Lägg till \\_FillValue Attributes:
            ERDDAP™används för att ha en standard \\_FillValue för alla heltalsvariabler: det maximala värdet av datatypen (127 för bytesvariabler) . Nu gör det inte. För att undvika att dessa värden visas som datavärden (inte saknade värden) Du måste uttryckligen ange dessa via \\_FillValue-attribut. Från och med nu, varje gång du börjarERDDAP™, det kommer att skicka administratören ett e-postmeddelande med en .csv-tabell med en lista över heltalskällor variabler som inte har \\_FillValue ellermissing\\_valueattribut, och de föreslagna nya \\_FillValue attribut. Se[Lägg till \\_Fill Value Attributes](/docs/server-admin/datasets#add-_fillvalue-attributes)för mer information och instruktioner.
             
        * Om du kompilerarERDDAP™, du måste ändra klasspath parametern på javac kommandoraderna för att lägga till en hänvisning till dessa nya burkar: lib / Commons-jexl.jar;lib / aws-java-sdk.jar;lib / Jackson-annotations.jar;lib / Jackson-core.jar;lib / Jackson-databind.jar .
             
    * Tomcat 9 är nu den rekommenderade versionen av Tomcat förERDDAP. Den senaste versionen av Tomcat 8.5+ är också bra för nu. Vi städade uppERDDAP"S[Tomcat installationsanvisningar](/docs/server-admin/deploy-install#tomcat).
        
Den senaste versionen avJava8 8 8 8 8 8 8 8 (Inte inteJava9, 10, 11, ...) Från[AdoptOpenJDK](https://adoptopenjdk.net/)är den rekommenderade versionen avJavaFörERDDAP.Java8 har Långsiktigt stöd från AdoptOpenJDK så det är fortfarande säkert att använda, men kom ihåg att få den senaste versionen av det regelbundet av säkerhetsskäl.
        
    * NEW: Script SourceNames / Derived Variables in Tabular Datasets
EDDTableFromFiles, EDDTableFromDatabase och EDDTableFromFileNames dataset kan nu innehålla uttryck och skript i skrifternasourceName. Detta gör att du kan göra nya variabler baserat på befintliga variabler i källfilerna. Beräkningen för en viss ny variabel görs inom en rad av resultaten, upprepade gånger för alla rader. Till exempel för att göra en longitudvariabel med värden i intervallet -180 - 180° från en variabel med värden i intervallet 0-360°:
        &lt;sourceName=Math2.anglePM180 (row.columnDouble ("lon") ) &lt;///sourceName&gt; &gt; &gt; &gt; &gt;
För detaljer, se[Script SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Tack till Bob Simons (som planerade detta innanERDDAP™v1.0 och äntligen hittat ett sätt att genomföra det) Kevin O'Brien, Roland Schweitzer, John Maurer och Apache JEXL-biblioteket för att göra den riktigt hårda delen (och gör det bra) .
         
    * NEW: Unsigned Integer Data Typer (ubyte, ushort, uint, ulong) stöds nu. Notera att många filtyper (t.ex. .das, .dds,.nc3 3 3 3 3) Stöd inte alla dessa nya datatyper. Se[Datadatadata data Typdokumentation](/docs/server-admin/datasets#data-types)För detaljer om hurERDDAP™handlar om dessa skillnader. Framför allt sedan(OPeN)DAP, särskilt .dds-svaret, stöder inte signerade byte, längder eller ulongs, du kanske vill användaERDDAPTabular representation av .das och .das som ses ihttp.../erddap/ **info info info** /_datasetID_.html webbsida (till exempel,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) som du också kan få i andra filtyper eller.nccsvMetadatarespons (till exempel,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) Båda stöder alla datatyper i alla situationer.
        
För datamängder som påverkas av denna förändring är det möjligt att du kommer att se problem med datamängden eftersom data somERDDAP™Läser från källan kan vara annorlunda (Till exempel kan variabler som tidigare lästs som signerade heltal nu läsas som osignerade heltal.) . De resulterande problemen inkluderar: nya filer som inte läggs till i datamängden och/eller fel när du försöker komma åt data. Om en dataset har problem är det första att försöka att[Sätt en hård Flaggan](/docs/server-admin/additional-information#hard-flag)för dataset. Om det inte löser problemet måste du titta på loggen. txt för att se felmeddelanden, dyka in idatasets.xmlför dataset, och/eller kanske köra genereraDatasets.xml för dataset.
Tack till netcdf-java 5.x (som tvingade frågan) och den kommande CF 1.9.
        
    * Intryck: Det finns nu[bättre dokumentation/rådgivning](/docs/server-admin/datasets#s3-buckets)för hur man skapar en dataset från filer i AWS S3 hinkar. Tack till Micah Wengren.
         
    * Det finns flera förändringar relaterade till"files"system.
        * Koden för att hantera detta skrevs om för att användas av fler klasser.
             
        * NEW: Användarförfrågningar för katalogförteckningar kan nu begära att svaret är en av standardtabelltyperna genom att appendera önskad filändelse: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsveller.xhtml). Till exempel,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Tack vare Kyle Wilcox och Shane St Savage.
             
        * IMPROVED: Nu Generate Dataset Xml inkluderar inte en&lt;tillgängligaViaFiles&gt; tagga i utgången. Antagandet är att datamängden kommer att förlita sig på värdet av den nya&lt;DefaultAccessibleViaFiles&gt; tagga in setup.xml. Se[tillgänglig tillgänglig ViaFiles](/docs/server-admin/datasets#accessibleviafiles).
             
        * IMPROVED: Ytterligare datasettyper stöder nu tillgängliga ViaFiles:EDDGridSideBySide,EDDGridAggregateExistingDimension,EDDGridFrånErddap, EDDTableFromErddap,EDDGridFrånEDDTable, EDDTableFromEDDGridochEDDGridFrånEtopo. För dessa kommer filerna från en viss fjärr-/barndataset endast att vara tillgängliga om både föräldern och fjärr-/barndataseten har tillgängligt ViaFiles är sanna (kanske via&lt;DefaultAccessibleViaFiles&gt;). Tack till Damian Smyth och Rob Fuller.
             
        * TO DO / RECOMMENDATION: Vi rekommenderar att du gör alla relevanta datamängder tillgängliga via filsystemet genom att ange&lt;defaultAccessibleViaFiles&gt; till sant i setup.xml eftersom det finns en grupp användare för vilka detta är det föredragna sättet att få data. Bland andra skäl,"files"system gör det enkelt för användare att se vilka filer som är tillgängliga och när de senast ändrats, vilket gör det enkelt för en användare att behålla sin egen kopia av hela datamängden. Om du i allmänhet inte vill göra datamängder tillgängliga via filsystemet, ange&lt;DefaultAccessibleViaFiles &gt; till false. I båda fallen, bara använda&lt;tillgängligaViaFiles&gt; för de få datamängder som är undantag från den allmänna policy som fastställs av&lt;DefaultAccessibleViaFiles&gt; (till exempel när datamängden använder.ncml-filer, som inte är användbara för användare) .
             
    * IMPROVED: Nu, om en källdataset har CF-nätverksinformation, generera Dataset Xml för ruttna dataset kommer att lägga till informationen till global&lt;addAtts&gt;, och informationen kommer att läggas till globalt&lt;sourceAtts&gt; varje gång data läses från filen. Informationen kommer att visas i datasetets globala attribut som en uppsättning attribut med prefixnätet \\_mapping \\_ .
         
    * VIKTIGT: Stöd för grupper när du läser.nc4.4 4. (och i viss utsträckning i.hdf5.5 5.5 5.5) filer. Generellt, enERDDAP™dataset kommer att byggas från variablerna i en av filens grupper. GenerateDatasets Xml förEDDGridFrånNcFiles ochEDDGridFrånNcFiles Uppackad frågar nu efter en "grupp" (t.ex. "" för alla/alla grupper, "someGroup", "someGroup/someSubGroup" eller "\\[root\\]för bara rotgruppen) . Tack vare Charles Carleton och Jessica Hausman.
         
    * IMPROVED: GenerateDatasets Xml förEDDGridFrånNcFiles ochEDDGridFrånNcFiles Unpacked stöder nu en valfri "DimensionsCSV" parameter som låter dig ange källnamnen på de dimensioner som du vill att denna dataset ska använda. Använd "" för att få de variabler som använder mest dimensioner, som tidigare. Dessutom är en relaterad liten bugg som inträffade med denna typ av fil nu fast. Tack till Sujal Manandhar.
         
    * BUG FIX: GenerateDatasets Xml listar nu korrekt "EDDTableFromJsonlCSVFiles" (Inte "EDDTableFromJsonlCSV") Som en av EDDType alternativ. Tack till Andy Ziegler.
         
    * VIKTIGT:EDDGridFrånNcFiles Unpacked nu standardiserar "enheter" attribut till standard / "kanoniska" udunits (samma metod som Units converter) . Till exempel,"meter per second","meters/second","m.s^-1"och"m s-1"Allt blir"m s-1". Tack till Andy Ziegler.
        
VARNING: Det är möjligt att detta orsakar problem för vissa befintliga datamängder. (Till exempel, få nya filer att märkas "dåliga") . Om så är fallet,[Sätt en hård Flaggan](/docs/server-admin/additional-information#hard-flag)för dataset så att alla källfiler kommer att läsas om med det nya systemet.
        
    * IMPROVED: Nu, en variabel&lt;sourceNamekan ange ett fast värde av =NaN och variabeln kan ha enactual\\_rangeattribut som specificerar ett ändligt sortiment. Detta är ibland användbart så att en dataset (I synnerhet en EDDTableFromFileNames dataset) kan ha dummy variabel (s)   (t.ex. latitud, longitud, tid) med fasta värden av NaN, men med giltighetactual\\_range  (som anges av attributet) . I Avancerad sökning kan en användare söka efter datamängder som har data i en viss bredd, longitud, tidsintervall och denna datamängd kommer att kunna säga att den har relevant datamängd. (Även om alla datans faktiska rader visar NaN) . Se[Fast värdedokumentation](/docs/server-admin/datasets#fixed-value-sourcenames).
Tack till Mathew Biddle.
         
    * NY: Nu, dendatasets.xmlchunk för en EDDTableFromAsciiFiles eller EDDTableFromColumnarAsciiFiles dataset kan innehålla en tag som berättarERDDAP™att ignorera alla rader längst upp i filen upp till och med den linje som matchar det angivna regelbundna uttrycket. Till exempel,
        &lt;SkipHeaderToRegex &gt;&gt;\\*Ü\\*Ü\\*END OF HEADER.\\*&lt;SkipHeaderToRegex
kommer att ignorera alla linjer upp till och med en linje som börjar med "\\*\\*End Of Header. och se [den]&lt;skipHeaderToRegex&gt; dokumentation] (/docs/server-admin/datasets#skipheadertoregex) .
Tack till Eli Hunter
         
    * NY: Nu, dendatasets.xmlchunk för en EDDTableFromAsciiFiles eller EDDTableFromColumnarAsciiFilesdataset kan innehålla en tagg som berättarERDDAP™att ignorera alla rader i filen som matchar det angivna regelbundna uttrycket. Till exempel,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

kommer att hoppa över alla linjer som börjar med "#". och se [den]&lt;skipLinesRegex &gt; dokumentation] (/docs/server-admin/datasets#skiplinesregex) .
Tack till Eli Hunter.
         
    * Nytt: Thedatasets.xmlchunk för alla EDDTable dataset kan nu inkludera &add Variables Var där (_attributeNamesCSV_) . Om det gör det,ERDDAP™kommer att lägga till en widget för var och en av de angivna attributen Namn på datasetets Form för dataåtkomst (.html webbsida) För att göra det enkelt för användare att lägga till &add Variables Var där (_attribute Namn, attribut Value_) till begäran.
Se[ochadd Variables Där dokumentation](/docs/server-admin/datasets#addvariableswhere).
Tack vare Aurelie Briand, et al.
         
    * Nytt Tredjepartsverktyg:ERDDAP-Lint
        ERDDAP-lint är ett program från Rob Fuller och Adam Leadbetter från det irländska marinininstitutet som du kan använda för att förbättra metadata för dinERDDAP™dataset.ERDDAP-lint "innehåller regler och en enkel statisk webbapplikation för att köra vissa verifieringstest mot dinaERDDAP™Server. Alla tester körs i webbläsaren.” som liknar[Unix/Linux lint verktyg](https://en.wikipedia.org/wiki/Lint_(software)Du kan redigera befintliga regler eller lägga till nya regler. Se[ERDDAP-Lint](https://github.com/IrishMarineInstitute/erddap-lint)för mer information.
        
Detta verktyg är särskilt användbart för datamängder som du skapade för en tid sedan och vill nu uppdatera med dina aktuella metadatapreferenser. Till exempel tidiga versioner av GenerateDatasets Xml gjorde inga ansträngningar för att skapa globaltcreator\\_name,creator\\_emailcreator\\_type, ellercreator\\_urlmetadata. Du kan användaERDDAP-lätta för att identifiera de datamängder som saknar dessa metadataattribut.
        
Tack vare Rob och Adam för att skapa detta verktyg och göra det tillgängligt förERDDAP™gemenskap.
        
    * Nu är det okej om några av filerna i enEDDGridFrånFiles dataset har inte alla datasetets variabler. Filerna kommer att inkluderas som om de hade variablerna (med alla saknade värden) .
Tack till Dale Robinson och Doug Latornell.
         
    * NEW: Det finns ny användningsstatistik i loggfilen och Daily Report för att hjälpa administratörer att identifiera de användare som orsakar minnesproblem. Statistiken heter "OutOfMemory (Array Size) "OutOfMemory" (För stort) och "OutOfMemory (Sätt för stort) ". De visar IP-adresserna för de användare som gjorde förfrågningar i dessa kategorier och antalet förfrågningar de gjorde. Om det inte fanns några besvärliga förfrågningar visas inte denna statistik. OutOfMemory (Array Size) och "OutOfMemory (Sätt för stort) Förfrågningar är vanligtvis inte ett problem eftersom förfrågningarna var så stora attERDDAP™fångade dem snabbt och returnerade ett felmeddelande. "OutOfMemory" (För stort) Förfrågningar är farligare eftersomERDDAP™gjorde lite ansträngning innan det insåg att det inte fanns tillräckligt med minne för närvarande för att hantera begäran. (Även om problemet kan vara andra förfrågningar innan dessa förfrågningar) .
        
Det finns också ny statistik som heter "Large Request, IP-adress" som visar IP-adresserna för användare som gjorde stora förfrågningar. (För närvarande, gridded.ncfiler &gt; 1 GB) .
        
Tidsseriens tabell på status.html-sidan innehåller nu en "memFail"-kolumn som visar antalet förfrågningar som misslyckades med "OutOfMemory (För stort) "Fel sedan de sista stora Load Datasets. Alla andra än 0 här är åtminstone någon orsak till oro.
Tack till Bob Simons.
        
    * Ny: Den nya versionen avHyraxVisar kataloglistor annorlunda än tidigare.ERDDAP™kan nu läsa de gamla och nya katalogen listor.
         
    * NEW: Dataset reloads och användarrespons som tar &gt;10 sekunder att slutföra (framgångsrikt eller misslyckat) är märkta med " (&gt;10&#33;) ". Således kan du söka log.txt-filen för den här frasen för att hitta de datamängder som var långsamma att ladda om eller begäran antal för de förfrågningar som var långsamma att slutföra. Du kan sedan titta högre i log.txt-filen för att se vad datasetproblemet var eller vad användarens begäran var och vem det var från. Dessa långsamma datamängder och användarförfrågningar beskattar ibland påERDDAP. Att veta mer om dessa förfrågningar kan hjälpa dig att identifiera och lösa problem.
    * IMPROVED: När du validerar en CF DSG dataset,ERDDAP™Nu säkerställer att variabler med cf\\_role attribut är i motsvarande cdm\\_...\\_variables lista och inte finns i andra cdm\\_...\\_variables listor. Till exempel, om en tidsseriesProfil dataset har en "station\\_id" variabel som har cf\\_role=timeseries\\_id attribut, måste "station\\_id" vara i cf\\_timeseries\\_variables-listan, men får inte vara i cf\\_profile\\_variables-listan.
Tack till Micah Wengren.
         
    * "Förenkla" är nu snabbare, använder mindre minne och kan returnera LongArray. Tack vareUnidata.
         
    * Snabbstart är nu betydligt snabbare för EDDTableFrom (nc-relaterade) Filer (utom EDDTableFromNcCFFiles och EDDTableFromInvalidCRAFiles) för att göra Förväntad (och en annan plats) Nu läser du bara provfilens metadata istället för att läsa alla data. Tack till Jessica Austin.
         
    * Det finns nu stöd för tidssträngar med precision större än till millisekund om de extra siffrorna är alla 0, t.ex. "2020-05-22T01:02:03.456000000Z". Tack till Yibo Jiang.
         
    * IMPROVED: GenerateDatasetsXmls EDD.suggestDestinationName används för att ta bort "(" och allt efter. Nu tar den bort (.\\*) endast om det är slutet påsourceName. Nu tar det också bort\\[.\\*\\]endast om det är slutet påsourceName. Tack till Julien Paul.
         
    * IMPROVED: GenerateDatasets Xml gör nu variabelndestinationNames unik genom att lägga till \\_2, \\_3, ... efter behov. Tack till Julien Paul.
         
    * IMPROVED: När Calendar2.parseDateTime parses dd, hh eller HH, den första "siffran" kan nu vara ett utrymme.
    * Knulla Probert: Börja medERDDAP™2.10,.ncml-filer som försöker ändra ett attribut, ändra inte attributet. Detta är en känd bugg i netcdf-java som jag har rapporterat och de säger kommer att fastställas i nästa utgåva av netcdf-java.
         
    * BROKEN LINKS FIX: Jag gjorde ett ordentligt system för testning för brutna länkar iERDDAP™webbsidor, så det borde nu finnas mycket få brutna länkar (Åtminstone från varje releasedatum - nya brutna länkar uppstår ofta) .
         
    * FIX: EDDTableFromHttpGet misslyckades med vissa typer av förfrågningar. Nu gör det inte. Tack vare Emma på BODC.
         
    * BUG FIX: För att hantera vissa förfrågningar gjorde EDDTable en tillfällig fil för varje begärd variabel, med ett filnamn som slutar i variabelns namn. Om variabelns namn också var en typ av kompression (t.ex. .Z) ,ERDDAPSkulle försöka (och misslyckas) att dekomprimera den tillfälliga filen. Nu slutar de tillfälliga filnamnen i ".temp". Tack till Mathew Biddle.
         
    * BUG FIX: GenerateDatasetsXml och Calendar2.convertToJavaDatumtid Format är nu mycket mindre benägna att göra en felaktig förändring när man försöker fixa ett eventuellt ogiltigt datum tidsformat. Notably, ingen auto-suggested dateTime format kommer att ändras. Tack till Mathew Biddle.
         
    * BUG FIX: Om det fanns ett fel när du fick innehåll från en fjärrURL, och om felStream-innehållet komprimeras,ERDDAP™nu korrekt dekomprimerar felmeddelandet. Tack till Bob Simons.
         
    * BUG FIX:&lt;SubscribeToRemoteErddapDataset&gt; applicerades inte när EDD... FromErddap dataset var ett barn dataset. Nu är det. Tack vare Chris Romsos.
         
    * BUG FIX: GenerateDatasets Xml tror inte längre att ett källvariabelnamn som börjar med "latin" kan vara latitud. Tack till Vincent Luzzo.
         
    * BUG FIX: Nu är en OutOfMemoryError när du läser en datafil medan du bearbetar en användares begäran inte en anledning att lägga till en fil i BadFiles-listan. Tack till Bob Simons.
         

## Version 2.02{#version-202} 
 (släppt 2019-08-21) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    * NEW: Det finns nu två sätt att söka efter datamängder på fleraERDDAPs. De arbetar något annorlunda och har olika gränssnitt och alternativ.
        
        *   [SearchMultipleERDDAPHtml](/SearchMultipleERDDAPs.html)från Bob Simons/NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)från Rob Fuller/The Marine Institute of Ireland.
        
Tack vare Tylar Murray för den ursprungliga begäran.
         
    * VIKTIGT: En begäran till"files"system för att ladda ner en fil som faktiskt finns på en fjärrplats (t.ex. AWS S3) nu leder till en omdirigering, så användaren kommer faktiskt att ladda ner data från källan, istället för att användaERDDAP™som mellanhand. Tack till Andy Ziegler ochNOAA.
         
    * NEW: Som ett exempel på de nya AWS S3-relaterade funktionerna, och för att göra det lättare för alla att surfa och ladda ner filer från offentliga AWS S3-hinkar har vi skapat
        [~110 provdataset](https://registry.opendata.aws/)som gör det möjligt för alla att surfa på innehållet i nästan alla
        [AWS S3 Open Data-hinkarna](https://registry.opendata.aws/). Om du klickar på"files"länk för någon av dessa provdataset, kan du bläddra i katalogen träd och filer i den S3 hink. På grund av hur dessa datamängder fungerar, är dessa kataloglistor alltid helt uppdaterade eftersomERDDAP™Får dem på flygningen. Om du klickar på katalogens träd till ett faktiskt filnamn och klickar på filnamnet,ERDDAP™omdirigera din begäran till AWS S3 så att du kan ladda ner filen direkt från AWS.ERDDAP™administratörer kan
        [Läs riktningar för hur man gör detta för andra S3-hinkar](/docs/server-admin/datasets#working-with-aws-s3-files). Tack till Andy Ziegler ochNOAA.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Saker du behöver göra: ingen
         
    * VIKTIGT:ERDDAP"S metod för att lagra mängder strängar (StringArray) är nu mycket mer minneseffektivt. String Arrays används överalltERDDAP™, särskilt när du läser tabell ASCII datafiler. Även andra ändringar gör läsa CSV/TSV/SSV ASCII, kolumnar ASCII och jsonlCSV tabular datafiler snabbare och mycket mer minneseffektiv. Resultatet är: för en 764 MB ASCII datatestfil (Men komprimerad till en 52MB.gzfil) med 3,503,266 rader och 33 kolumner gick den maximala minnesanvändningen från 10 GB ner till 0,6 GB (på topp) . Tiden att läsa den gick från ~ 7 minuter (Men varierar mycket med hur mycket fysiskt minne är i datorn) ner till ~36 sekunder (inklusive 10s för förenkling () som endast används av GenerateDatasets Xml) . Många andra platser iERDDAP™kommer att dra nytta av denna ökade minneseffektivitet. Tack vare Tylar Murray och Mathew Biddle.
        
Jag utforskade en annan lösning (lagra strängar i StringArray som UTF-8-kodade bytesarrayer) . Det minskar minnesanvändningen ytterligare ~ 33%, men till kostnaden för ~ 33% avmattning. Jämfört med det system som nu används, verkade det som en dålig handel. Det är lättare att ge en dator mer minne (Köp mer minne för ~$200) än att göra det snabbare (Köp en helt ny dator) .
        
Om det är bekvämt är det fortfarande en bra idé att dela upp stora tabelldatafiler i flera mindre filer baserat på vissa kriterier somstationIDoch/eller tid.ERDDAP™kommer ofta bara att behöva öppna en av de små filerna som svar på en användares begäran, och därmed kunna svara mycket snabbare.
        
    * Intryck: Det finns nu[ERDDAP™AWS S3 dokumentation](/docs/server-admin/datasets#working-with-aws-s3-files), som beskriver hur man fårERDDAP™att arbeta med datafiler i AWS S3-hinkarna.
också,ERDDAP™nu använder nya funktioner i AWS S3JavaAPI.
också,ERDDAP™Nu tillåter AWS S3-adresser att inkludera ytterligare tecken (period, hyphen, underscore) i hinknamn.
också,ERDDAP™nu kräver att AWS S3 bucket-adresser identifieras på ett specifikt sätt:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
där prefix är valfritt.
Tack till Andy Ziegler ochNOAA.
         
    * IMPROVED: GenerateDatasets Xml behandlar nu ytterligare vanligtmissing\\_values stand-ins som saknade värden och så är mer benägna att konvertera en kolumn till en numerisk datatyp. PrimitiveArray.simplify () Nu loggar det specifika datavärdet som orsakade det för att behandla en viss kolumn som en strängkolumn. Tack till Mathew Biddle.
         
    * VIKTIGT:&lt;requestBlacklist &gt; stöder nu.\\*.\\*  (Eller:\\*Från:\\*För IPv6) i slutet av IP-adresserna så att du kan svartlista en större del av IP-adresser, t.ex. 110.52.\\*.\\*  (Kina Unicom Tianjin) . Se dokumentationen för [&lt;FörfråganBlacklist] (/docs/server-admin/datasets#requestblacklist) Tack vare China Unicom och China Telecom.
         
    * Om en dataset källa inte anger en"institution"attribut, GenerateDatasets Xml och loadDataset får nu det från en "skapare" attribut (om det är tillgängligt) . Tack till Micah Wengren.
         
    * BUG FIX: Standardisera Vad som inte alltid tillämpades på ASCII datafiler.
EDDTable hanterade inte ordentligt begränsningar på tidsvärden när källan hade String-tidsvärden och standardiserade Vad som användes.
Tack vare Paloma de la Vallee.
        
Jag har inte klart sagt tidigare: du bör bara använda standardisering Vilka funktioner när du faktiskt behöver dem (t.ex. när olika källfiler lagrar tidsvärden på olika sätt) eftersom vissa förfrågningar till datamängder som använder standardisera Vad kommer att behandlas lite långsammare.
        
    * BUG FIX: En bugg i kod som används avEDDGridFrånNcFiles orsakade det att misslyckas med.nc4 och.hdf5 filer som har "lång" (Int64) variabler. Detta är nu fixat. Tack till Friedemann Wobus.
         
    * BUG FIX: Små ändringar i ISO 19115-filer för att göra en annan validator glad. Tack vare Chris MacDermaid och Anna Milano.
         

## Version 2.01{#version-201} 
 (släppt 2019-07-02) 

*    **Nya funktioner och förändringar (för användare) Från:** 
    * Ingen.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * BUG FIX: En bugg i koden som genererar Data Access Form förtabledapdatamängder orsakade att webbsidan var tom för vissa datamängder. Jag förbättrade också hanteringen av oväntade fel på alla HTML-sidor så att de kommer att (vanligen vanligen vanligen vanligtvis) Visa ett felmeddelande. Tack vare Marco Alba.
    * IMPROVED: GenerateDatasets Xml trycker inte längre en lång varning överst på utgången. Istället, se[Redigera Generate Dataset Xml Output](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Tack vare Steven Baum.
    * IMPROVED: GenerateDatasets Xml gör nu lite olika rekommendationer i olika situationer för&lt;updateEveryNMillis&gt; för EDD...Från...Files dataset. GenerateDatasets Xml avskräcker nu det ursprungliga "extrahera" systemet för EDDTableFromFiles dataset.

## Version 2.00{#version-200} 
 (släppt 2019-06-26) 

*    **ERDDAP™v2.00 är äntligen här&#33; Ja&#33;**   
     
    * Vi ber om ursäkt för den långa fördröjningen som behövs för att avsluta den här versionen.
Tack för ditt tålamod.
         
    * Den goda nyheten är att den extra tiden användes för att lägga till fler funktioner som användarna hade begärt. Den dåliga nyheten är att även med fördröjningen tillkom inte alla begärda funktioner. Vi är ledsna, men det verkade viktigare att få denna utgåva ut än att fördröja mer. (För alltid?) ständigt lägga till nya funktioner. Vi lovar att återvända till mer frekventa utgåvor i framtiden.
         
    * Version 2&#33; Finns det stora förändringar och oförenligheter?”
Stora nya funktioner? Ja.
Stora oförenligheter eller förändringar för administratörer eller användare? Nej.
Vi hoppade från v1.82 till v2.00:
        * Dels för att fira 10 år (Nu 11) sedan den första offentliggörandet avERDDAP™  (v1.00 2008-05-06, som utåt såg anmärkningsvärt som v2.00) . I den tiden,ERDDAP™har gått från en installation till nästan 100 installationer i minst 12 länder (Australien, Belgien, Kanada, Frankrike, Indien, Irland, Italien, Sydafrika, Spanien, Thailand, Storbritannien, USA) .
        * dels för att markera ett stort tillägg i en helt ny riktning:ERDDAP™nu har ett dataintagssystem att gå med befintliga dataservertjänster (se[EDDTableFromHttpGet](#eddtablefromhttpget)) ,
        * Och delvis för att det inte var ett stort hopp från 1,82 till 2,00 numeriskt, så det verkade som rätt tid.
             
    * Den andra goda nyheten är att det nu finns två andra grupper som bidrar till koden.ERDDAP™  (i denna version och med indikationer kommer de att fortsätta) Rob Fuller och Adam Leadbetter of Ireland's Marine Institute och Roland Schweitzer från PMEL och Weathertop Consulting. Tack så mycket. Det är sant att de arbetar med projekt som de själva väljer, men det är den klassiska open-source-utvecklingsmodellen - grupper bidrar med kod för de funktioner som de mest vill se till. Den extra fördelen för bidragsgivare: de får använda de nya funktionerna så snart de är färdiga; de behöver inte vänta på nästa utgåva avERDDAP. Din grupp är också välkommen att bidra&#33; Se[ERDDAP™Programmers guide](/docs/contributing/programmer-guide).
         
    * Hoppas du gillarERDDAP™Vi ser fram emot de kommande 10 årenERDDAP™utveckling och mer användning runt om i världen.
         
*    **Nya funktioner och förändringar (för användare) Från:**   
     
    * Ny:orderByMeanfilterfilter
Förtabledapdataset beräknar medlen för de angivna grupperna. AllaorderByalternativ stöder nu ytterligare ett sätt att definiera grupper:\\[/Number\\[TimeUnits\\]\\[Offset\\]\\]t.ex. tid/1dag eller djup/10:5. Till exempel,stationID,time,waterTemp&orderByMean ("stationID,time/1day") skulle sortera resultaten genomstationIDoch tid, sedan beräkna och returnera medelvärdet av vattenTemp för varjestationIDför varje dag. Dessa är anmärkningsvärt användbara och kraftfulla nya funktioner. Den nya koden för dessa funktioner och ändringarna av den gamla koden bidrogs av Rob Fuller och Adam Leadbetter från Irlands Marine Institute och skickades via Git. Tack, Rob och Adam&#33;
         
    * NEW: utdatafiltyp för tabular dataset:[.data Bord](https://developers.google.com/chart/interactive/docs/reference#dataparam),
en JSON-fil formaterad för användning medGoogle VisualizationKundbibliotek (Google Charts) . Koden för detta bidrog med Roland Schweitzer och skickades via Git. Tack, Roland&#33;
         
    * NEW: utdatafiltyp för tabular dataset:[.jsonlCSV1](https://jsonlines.org/examples/),
som liknar den befintliga.jsonlCSValternativ, men med kolumnnamn på första raden. Tack till Eugene Burger.
         
    * NEW: Om administratören gör det kan användarna nu logga in med sina[ORCID](https://orcid.org)konto.
Det är ett OAuth 2.0-autentiseringssystem, ungefär som Google-autentisering. ORCID används ofta av forskare för att unikt identifiera sig. ORCID-konton är gratis och har inte de integritetsfrågor som Google-konton har. SeERDDAP"S[Orcid autentisering instruktioner](/docs/server-admin/additional-information#orcid). Tack vare BCO-DMO (Adam Shepard, Danie Kinkade, etc.) .
         
    * NEW: En ny URL-omvandlare konverterar out-of-date URLs till up-to-date URLs.
Se .../erddap/convert/urls.html på någonERDDAP™installation, t.ex.
        [denna länk till konverteraren iERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Detta bör vara användbart för datahanterare. Detta används också internt av GenerateDatasetsXml. Tack vare Bob Simons och Sharon Mesick.
         
    * Improped: The[Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)nu har alternativ för att omvandla någon vanlig strängtid till en ISO8601 strängtid, eller omvandla enUDUNITS-liknande tidsenheter som strängar in i en riktigUDUNITSTidsenheter sträng. Detta bör också vara användbart förERDDAP™administratörer som behöver veta vilket format som ska ange för attributet "enheter" för strängtidsvariabler. Detta används också internt av GenerateDatasetsXml och standardiserar Vilken funktion av EDDTableFromFiles. Tack till Bob Simons.
         
    * Nytt: The[Enheter Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)har ett nytt "Standardize UDUnits" alternativ.
Till exempel, "deg\\_C/m" och "degrees\\_C meter-1" omvandlas båda till
"Degree\\_C m-1". Denna funktion används också av standardiseringVilka funktion av EDDTableFromFiles. Tack till Bob Simons.
         
    * NY: För grafer (annat än yta grafer) på griddap's ochtabledapGör en Graph-webbsidor, när x-axeln inte är en tidsaxel, om bara en delmängd av x-axelvariabelns intervall är synlig, finns det nu knappar ovanför grafen för att flytta X-axeln vänster eller högerut. Tack vare Carrie Wall Bell / Hydrophone-projektet.
         
    * För grafer kan X och/eller Y-axeln nu använda en Log-skala.
Användare kan styra Y Axis Scale via en ny nedgångs widget på nätet ochtabledapGör en Graph webbsidor. Se[.xRange och . yRange dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Tack vare Carrie Wall Bell / Hydrophone-projektet.
         
    * VIKTIGT:ERDDAP™nu gör bättre användning av olika HTTP-felkoder och returnerar nu en(OPeN)DAPv2.0-formaterade felmeddelanden payload. Se[detaljer](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Tack vare Antoine Queric och Aurelie Briand.
         
    * Använd inte Netcdf-java/c eller andra mjukvaruverktyg för att ansluta till.nceller.hdffiler som serveras avERDDAP"S/files/system som om de vore lokala filer.ERDDAP™nu vägrar dessa förfrågningar. Det är fruktansvärt ineffektivt och orsakar ofta andra problem. Istället:
        
        * Användning(OPeN)DAPklientprogramvara för att ansluta tillERDDAP"SDAPtjänster för dataset (som har /griddap/ eller/tabledapI URL) . Det är vadDAPär för och gör så bra.
        * Eller använd datamängdens Form för dataåtkomst för att begära en delmängd av data.
        * Eller om du behöver hela filen eller upprepad åtkomst under en lång tidsperiod, användcurl,wget, eller din webbläsare för att ladda ner hela filen, sedan komma åt data från din lokala kopia av filen.
        
          
         
    * Improped: PåERDDAP™Hemsida, Full Text Search är nu över "Visa en lista över alla datamängder" eftersom det är den bästa utgångspunkten för de flesta användare. Tack vare Didier Mallarino och Maurice Libes.
         
    * IMPROVED: På DataProviderForm3.html Det finns nu listor över gemensammastandard\\_names. Tack vare någon på IOOS DMAC-mötet.
         
    * IMPROVED: På /filer/webbsidor finns det nu en länk till den nya "Vad kan jag göra med dessa filer?" avsnitt av /filer/dokumentation. Det avsnittet beskriver olika filtyper och ger förslag på hur man arbetar med dem. Tack vare Maurice Libes.
         
    * Nästan varje begäran omERDDAP™bör vara minst lite snabbare, och ibland mycket snabbare.
         
    * BUG FIX: Under vissa omständigheter, när en EDDTable dataset sparade data i vissa typer av.ncfiler, den globala "id" attributet var inställd på filens föreslagna namn, som innehåller en hash för att göra det unikt för den begäran. Nu är "id" rätt kvar oförändrad (om det anges) eller till datasetetsdatasetID  (om inte specificerat) . Tack till John Maurer.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:**   
     
    * TO DO: Denna release kommer att ta lite tid och arbeta från dig. Var tålmodig och planera på att ta några timmar för att göra de nödvändiga förändringarna och några timmar att experimentera med nya funktioner.
         
    * För säkerhet, gör en säkerhetskopia av din nuvarande setup.xml ochdatasets.xmlfiler så att du kan återgå till dem i det osannolika fallet där du behöver återgå tillERDDAP™v1.82.
         
    * För att göra: De rekommenderadeJavaNu är AdoptOpenJDKs OpenJDK 8 8 8 8 8 8 8 8 (LTS) HotSpot.
Detta är en öppen källkod variant avJavasom inte har några begränsningar för dess användning (Till skillnad frånOracle"SJavadistribution) . Den härrör frånOracle"SJavapågående sätt, medOraclevälsignelse. Av säkerhetsskäl är det viktigt att hålla dinJavaversion up-to-date. SeERDDAP"S[Javainstallationsanvisningar](/docs/server-admin/deploy-install#java).
         
    * AdoptOpenJDKsJavabehöver ett litet tillskott till din Tomcat-installation: se[Resurser Cache instruktioner](/docs/server-admin/deploy-install#contentxml). Jag tror att detta är en ersättning för inställningen -XX:MaxPermSize, som (Adopt) OpenJDK stöder inte längre.
         
    * TO DO: Den nya standarden och rekommendera&lt;fontFamily&gt; inställning i setup.xml är
DejaVu Sans som är inbyggda i AdoptOpenJDKsJava. Se
        [reviderade typsnitt installationsanvisningar](/docs/server-admin/deploy-install#fonts).
         
    * TO DO: Många taggar flyttar från setup.xml tilldatasets.xml. Fördelen är att du kan ändra värdena medanERDDAP™Kör, utan omstartERDDAP. I synnerhet kan du enkelt ändra&lt;StartBodyHtml5&gt; för att visa ett tillfälligt meddelande påERDDAP™Hemsidan (t.ex. "Kontrollera den nya JPL MUR SST v4.1 dataset ..." eller "DettaERDDAP™kommer att vara offline för underhåll 2019-05-08T17:00:00 PDT genom 2019-05-08T20:00 PDT.") . Om/när du ändrar dessa taggar idatasets.xmlförändringarna träder i kraft nästa gångERDDAP™Läserdatasets.xml.
         
        
        1. Kopiera detta innehåll i dittdatasets.xmlfil (när som helst nära filens start, efter&lt;erddapDatasets&gt;):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. En-för-en, kopiera värdet (Om någon) för var och en av dessa taggar från din setup.xml-fil till den nya taggen som du precis klistrade in (ovanför) in idatasets.xml. Om du till exempel hade använt ett värde på 30 för&lt;cacheminutes &gt; i setup.xml, du bör kopiera det värdet till den nya&lt;cacheMinutes &gt; tag indatasets.xml  (Även om värdet är detsamma som det nya standardvärdet, är det bäst att bara lämna taggen idatasets.xmlBlank) .
            
Om ditt värde skiljer sig från den nya föreslagna standarden (annat än för&lt;StartBodyHtml5&gt; och&lt;TheShortDescriptionHtml&gt;, som är användbara för att anpassa dinERDDAP™installation), vänligen överväga att byta till de nya standardvärdena. Detta gäller särskilt för&lt;partialRequestMaxBytes&gt; och&lt;partialRequestMaxCells&gt;, där standard/föreslagna värdet har förändrats betydligt under åren.
            
När du kopierar varje värde raderar du taggen och dess beskrivning från setup.xml. Det är bättre att ha dessa taggar idatasets.xml. Och det finns nu bättre beskrivningar i[setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
En quirk av det nya systemet är att den första webbsidan när du startarERDDAPkommer att vara standardERDDAP™webbsida. Varje efterföljande webbsida kommer att använda ... Html-innehåll du anger idatasets.xml.
        
    * VARNING: Första gången du körERDDAP™v2.0, dataset baserat på lokala datafiler kommer att laddas **väldigt mycket väldigt mycket** långsamt förERDDAP™måste återskapa sin databas med filer i ett lite annorlunda format. Efter den långsamma initiala reloaden kommer de att ladda snabbt, som tidigare. Var tålmodig.
         
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
    *   [BIG NEW FEATURE: EDDTableFromHttpGet](#eddtablefromhttpget)  
Fram till nu,ERDDAP™Läs bara data och gjorde den tillgänglig för användare. Nu,ERDDAP™har ett enkelt, effektivt system för intag av realtidsdata från sensorer. Bland andra funktioner erbjuder denna datamängd finkornig version: den kommer ihåg varje förändring som gjorts till datamängden, när den gjordes och av vem. Vanligtvis vill användare bara ha den senaste versionen av datasetet, med alla ändringar som tillämpas. Men det finns möjlighet för användare att begära data från datamängden eftersom det var när som helst i tid. Detta underlättar reproducerbar vetenskap. Således, till skillnad från de flesta andra realtidsdataset, är dessa dataset berättigade till[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). för att de möterDOIKravet på att datamängden är oföränderlig, förutom genom aggregation. Se[EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget). Tack till OOI (från länge sedan och nu) För att tala om behovet av detta och Eugene Burger för påminnelsen om att arbeta med det som är viktigt.
         
    * Big New Feature:ERDDAP™kan nu betjäna data direkt från externa datafiler, inklusive.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, eller .Z. Dataset kan innehålla en blandning av externt komprimerade filer (Kanske äldre datafiler?) och icke-externt-komprimerade filer, och du kan komprimera / dekomprimera en fil när som helst.
        
Detta fungerar bra&#33;
I de flesta fall är avmattningen relaterad till att dekomprimera filerna mindre. Vi uppmuntrar dig starkt att prova detta, särskilt för datamängder och/eller datafiler som sällan används.
        
Detta kan spara dig $ 30 000 eller mer&#33;
Detta är en av de fåERDDAP™funktioner som kan spara mycket pengar - om du komprimerar en hel del datafiler, behöver du mycket färre RAID / hårddiskar för att lagra data, eller omvänt, kan du tjäna mycket mer data (upp till 10x) med de RAID du redan har. Om den här funktionen sparar dig från att köpa en annan RAID, har den sparat dig cirka 30 000 dollar.
        
Se[Externt komprimerad fildokumentation](/docs/server-admin/datasets#externally-compressed-files). Tack vare Benoit Perrimond och Paloma de la Vallee.
        
    * Big New Feature: Allt alltEDDGridFromFiles och alla EDDTableFromFiles dataset stöder en&lt;cacheFromUrl&gt; tag och en&lt;cacheSizeGB&gt; tag. Om cacheSizeGB inte specificeras kommer detta att ladda ner och behålla en komplett kopia av en fjärrdatamängds filer. Om cacheSizeGB specificeras och är &gt;0, kommer detta att ladda ner filer från fjärrdatasetet, efter behov, till en lokal cache med begränsad storlek, vilket är användbart när du arbetar med molnbaserad (t ex S3) datafiler. Se[Cache FrånUrl dokumentation](/docs/server-admin/datasets#cachefromurl)för detaljer. Tack till Bob Simons och Roy Mendelssohn (som i åratal har skrivit manus för att hantera lokala kopior av fjärrdatasetfiler) Lloyd Cotten, Eugene Burger, Conor Delaney (när han var på Amazon Web Services) och Google Cloud Platform.
         
    * Ny: Den nya EDDTableFromJsonlCSV klass kan läsa tabelldata från
        [JSON Lines CSV-filer](https://jsonlines.org/examples/)  ("Bättre än CSV") . Tack vare människorna på Marine Institute of Ireland för att berätta om detta format och Eugene Burger och PMEL för begäran om att stödja det som en ingångstyp.
         
    * NY: AllaEDDGridoch alla EDDTableFromFiles dataset stöder en&lt;nThreads&gt; inställning, som berättarERDDAP™Hur många trådar att använda när du svarar på en begäran. Se[nThreads dokumentation](/docs/server-admin/datasets#nthreads)för detaljer. Tack vare Rob Bochenek av Axiom Data Science, Eugene Burger, Conor Delaney (när han var på Amazon Web Services) och Google Cloud Platform.
         
    * NY standardisera Vad för alla EDDTableFromFiles underklasser -
Tidigare, om för en viss variabel, värdena av de viktiga attributen (t.ex.,scale\\_factor,add\\_offset,missing\\_value, \\_FillValue, enheter) inte konsekvent, EDDTableFromFiles skulle välja ett värde för varje attribut att vara "giltiga" och markera filer med andra attributvärden som "Bad Files". Nu finns det ett system för att standardisera filerna så snart EDDTableFromFiles läser filerna. Se[EDDTableFromFiles standardisering Vad är vad](/docs/server-admin/datasets#standardizewhat). En avERDDAP"Stora mål är att göra datafiler och datamängder tillgängliga på ett konsekvent sätt. Standardisera Vad är ett viktigt nytt verktyg för att göra det till en verklighet. Tack vare Marco Alba, Margaret O'Brien (och andra EML användare) BCO-DMO och InPort-användare.
         
    * NEW EDDTableFromInvalidCRAFiles låter dig göra en dataset från en samling avNetCDF  (v3 eller v4)  .ncfiler som använder en specifik, ogiltig, variant av CF DSG Contiguous Ragged Array (CRA) filer. Provfiler för denna datasettyp finns på https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Denna server är nu inte tillförlitligt tillgänglig\\]. Även omERDDAP™stöder denna filtyp, det är en ogiltig filtyp som ingen ska börja använda. Grupper som för närvarande använder denna filtyp uppmuntras starkt att användaERDDAP™för att generera giltiga CF DSG CRA-filer och sluta använda dessa filer. Tack vare Ajay Krishnan och Tim Boyer.
         
    * EDDTableFromThreddsFiles och EDDTableFromHyraxFiler är nu deprecated. Vänligen byt till EDDTableFromNcFiles (eller en variant) plus plus&lt;cacheFromUrl&gt;. Om det inte fungerar av någon anledning, e-posterd.data at noaa.gov. Om det inte finns några klagomål före 2020 kan dessa datamängder tas bort.
         
    * Improped - Systemet för att automatiskt konvertera icke-ISO 8601 gånger till ISO 8601 gånger (infördes i v1.82) har kraftigt utökats för att hantera ett stort antal ytterligare format. Detta påverkar GenerateDatasetsXml ochERDDAPhantering av källmetadata.
         
    * Improped - Med sin tredje stora översyn av strängtidsparssystemet (och förhoppningsvis den sista) ,ERDDAP™inte längre använderJavaDateTimeFormatter på grund av buggar som ibland påverkar extrema tider (år&lt;=0000).ERDDAP™nu använder sitt eget system för parsing tidssträngar.
         
    * VARNING: Det nya strängtidsparssystemet är något strängare. Om en av dina datamängder plötsligt bara har saknat värden för tidsvärden, är orsaken nästan säkert att tidsformatsträngen är något fel. Det bör finnas felmeddelanden i loggen. txt relaterad till tidsvärden som inte matchade tidsformatet - det borde hjälpa dig att fixa tidsformatet sträng för det datasetet. Om du behöver hjälp, använd alternativet iERDDAPTidskonverterare som konverterar\\[s\\]varje vanlig strängtid i en ISO 8601 strängtid " - det indikerar det format som omvandlaren använde för att analysera källsträngen.
         
    * Rekommendation: Det snabbaste, enklaste och billigaste sättet att påskyndaERDDAPtillgång till tabelldata är att sätta datafilerna på en Solid State Drive (SSD) . De flesta tabelldatamängder är relativt små, så en 1 eller 2 TB SSD är förmodligen tillräcklig för att hålla alla datafiler för alla dina tabelldatamängder. SSD sliter så småningom ut om du skriver data till en cell, raderar den och skriver nya data till den cellen för många gånger. Istället rekommenderar jag att (så mycket som möjligt) Du använder bara din SSD för att skriva data en gång och läsa det många gånger. Sedan, även en konsument-grade SSD bör pågå en mycket lång tid, förmodligen mycket längre än någon hård disk Drive. (HDD) . Konsumentkvalitet SSD är nu billiga (2018, ~ $ 200 för 1 TB eller ~ $ 400 för 2 TB) Och priserna faller fortfarande snabbt. När närERDDAP™åtkomst till en datafil, en SSD erbjuder båda
        
        * Kortare latens (~0.1ms, jämfört med ~3ms för en HDD, jämfört med ~10 (??) ms för en RAID, jämfört med ~ 55ms för Amazon S3) och
        * högre genomströmning (~500 MB / S, jämfört med ~ 75 MB / s för en HDD jämfört med ~ 500 MB / s för en RAID) .
        
Så du kan få upp till en ~ 10X prestanda boost (vs en HDD) För $200&#33; Jämfört med andra möjliga ändringar i ditt system (En ny server för 10 000 dollar? En ny RAID för 35 000 dollar? En ny nätverksbrytare för $ 5000? etc.) Detta är den absolut bästa avkastningen på investeringar (Roi) . Om din server inte är laddad med minnet, är ytterligare minne för din server också ett bra och relativt billigt sätt att påskynda alla aspekter avERDDAP.
        \\[SSD skulle också vara bra för ruttna data, men de flesta ruttna datamängder är mycket större, vilket gör SSD mycket dyrt.\\]  
         
    * NY: Alla som är inloggade får roll =\\[NågonLogged Inom\\]Även om det inte finns något&lt;Användare&gt; tagga för dem idatasets.xml. Om du ställer in dataset's&lt;tillgänglig för&gt;\\[NågonLogged Inom\\]Den som har loggat inERDDAP™  (via deras Gmail eller Orcid-konto) kommer att tillåtas att komma åt datamängden, även om du inte har angett en&lt;Användare&gt; tagga för dem idatasets.xml. Tack vare Maurice Libes.
         
    * Improped: TheUDUNITS/UCUM-enheter omvandlare förbättrades kraftigt.
Den hanterar ogiltiga enheter strängar bättre (börja med en betoning på att bevara information, snarare än att verkställa giltighet) . Resultaten har också en standardiserad syntax.
         
    * Nytt: TheUDUNITS/UCUM-enheter omvandlare har ett nytt alternativ att standardisera enUDUNITSSträng.
Detta fungerar bra för giltigtUDUNITSsträngar och rimligt bra för icke-standard / ogiltigUDUNITSsträngar. Till exempel, till exempel,UDUNITS= "meter per sekund", "meter/sekund","m.s^-1"och"m s-1"Alla kommer tillbaka "m.s-1". Detta behövdes för den nya standardiseringen Vilket system som beskrivs ovan. Tack vare Marco Alba, Margaret O'Brien (och andra EML användare) BCO-DMO och InPort-användare.
         
    * NEW: EDDTableFromMultidimNcFiles har nu en[behandlaDimensionsAs](/docs/server-admin/datasets#treatdimensionsas)Alternativ, som berättarERDDAP™att behandla vissa dimensioner (t.ex. LAT och LON) som om de vore andra dimensioner (t.ex. tid) . Detta är användbart för vissa felaktiga filer som använder olika dimensioner för olika variabler när de ska ha använt bara en dimension. (t.ex. tid) . Tack vare Marco Alba och Maurice Libes.
         
    * NY: Nu, alltEDDGridFrån...Files dataset stöder en ny speciell axelsourceNamesom berättarERDDAP™att extrahera information från filnamnet (bara filename.ext) och använda värdet till **Ersätt ersättare** det befintliga vänstra axelvärdet. Formatet är
        \\*\\*\\*replaceFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Se[Denna dokumentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Tack vareNOAAPathfinder Daily aggregation dataset.
         
    * NY: Nu, alltEDDGridFrån...Files dataset stöder en ny speciell axelsourceNamesom berättarERDDAP™att extrahera information från filens PathName (Kataloger + filename.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
För detta använder sökvägsnamnet alltid'/'som katalogen separator karaktär, aldrig '\'.
Se[Denna dokumentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Tack vare Paloma de la Vallee.
         
    * NY: Nu, alla EDDTableFrån... Fildataset stöder ytterligare pseudovariabelsourceNames som extraherar information från filens filnamn (bara filename.ext)   (se[\\*\\*FileName](/docs/server-admin/datasets#filename-sourcenames)) eller från filens fulla PathName (/dir1/dir2/filename.ext)   (se[\\*\\**pathName](/docs/server-admin/datasets#pathname-sourcenames)) . Tack vare Paloma de la Vallee.
         
    * Ny: Om enEDDGridDataset har en eller flera mycket stora dimensioner (t.ex. miljoner värderingar) som tar upp en hel del minne, du kan ställa in den nya [&lt;dimensionValuesInMemory] (/docs/server-admin/datasets#dimensionvaluesinmemory) Inställning till falsk (Standarden är sann) , som orsakar datamängden för att lagra värdena på disken och hämta dem när det behövs. Tack vare David Rodriguez och Rich Signell (Re:EDDGridFrån AudioFiles) .
         
    * Föregående inlägg: If you reordered thedataVariables för en EDDTableFromFiles dataset och laddade om datasetet, EDDTableFromFiles skulle läsa alla datafiler. Nu kan det hantera omställningen utan att läsa alla datafiler. Tack till Roland Schweitzer.
         
    * VIKTIGT: Nu närERDDAP™Läser ASCII, NCCSV och JSON Lines CSV-tabelldatafiler, om det hittar ett fel på en viss linje (t.ex. felaktigt antal objekt) Den loggar ett varningsmeddelande ("VARNING: Skippa linje #"... "Oväntat antal objekt...") till[Log.txt fil](/docs/server-admin/additional-information#log)och sedan fortsätter att läsa resten av datafilen. Därför är det ditt ansvar att se periodiskt (Eller skriva ett manus för att göra det) för det budskapet i loggen. txt så att du kan åtgärda problemen i datafilerna.ERDDAP™är inställd på detta sätt så att användarna kan fortsätta att läsa alla tillgängliga giltiga data även om vissa rader av filen har brister. Tidigare,ERDDAP™markerade filen som "dålig" och tog bort den från datamängden.
         
    * Improped: När exakta tider (t.ex. till närmaste sekund eller millisekund) lagras på källan som "minuter sedan ..." (eller större enheter) ,ERDDAP™nu rundar dem till närmaste millisekund när man läser värdena tillERDDAP. Annars är flytande punktnummer blåmärken och förfrågningar om data vid specifika tidpunkter (e.g., &time=2018-06-15T01:30:00) kommer att misslyckas. Tidigare beräknade den dem så exakt som möjligt (Och fortfarande gör om enheterna är t.ex. "andar sedan ..." eller "milliseconds sedan ...") . Det är bäst att undvika detta problem genom att inte använda stora enheter (t.ex. minuter eller timmar) lagra exakta tidsvärden (till exempel mikrosekunder) Datorer gör ett dåligt jobb med att hantera decimala siffror. Tack vare Marco Alba.
         
    * CHANGES to EDDTableFrånEDDGridsom gör det mycket bättre. EDDTableFrånEDDGridlåter användare fråga gridded dataset som om de var tabular dataset ("fråga efter värde") .
        
        * Det stöder nu en&lt;MaxAxis0&gt; taggen (Standard=10) som specificerar det maximala antalet axlar\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]  (vanligen vanligen vanligen vanligtvis"time") värden som kan queried på en gång. Detta förhindrar naiva förfrågningar från att få EDDTableFromEDDGridatt söka igenom en hel rutnät dataset (som skulle misslyckas med en timeout fel) .
        * GenerateDatasets Xml har nu möjlighet att generera EDDTableFromEDDGriddatamängder för alla ruttna datamängder i en givenERDDAP™som matchar en specificerad regex (Använd .\\* för att matcha alla dataset) . De datamängder som den skapar har ytterligare information i den sammanfattande attribut som indikerar att detta är en tabellversion av en rutnätad datamängd. och derasdatasetIDär dendatasetIDav den ruttna datamängden, plus "\\_AsATable".
        * Det finns en stor hastighet upp för den vanligaste inställningen: när den ruttna datamängden är enEDDGridFromErddap dataset som är i sammaERDDAP.
        
Tack vare James Gallagher och Ed Armstrong.
         
    * NY: generera Dataset Xml för alla typer av datamängder är nu mycket mer benägna att lägga till en \\_FillValue ellermissing\\_valueattribut till en numerisk variabelnsaddAttributes. Till exempel sker detta när sträng saknas värde markörer (t.ex. "", "?", "NA", "NaN") för den variabeln i provfilen konverteras tillERDDAP"S infödda saknade värden (127 i byte kolumner, 32767 i korta kolumner, 2147483647 i int kolumner, 9223372036854775807 i långa kolumner och NaN i flytande och dubbla variabler) . Det förekommer också för NaN-värden i flotta och dubbla variabler. Också, "nd" lades till i listan över vanliga saknade värde markörer i numeriska data kolumner somERDDAP™bör leta efter. Tack vare Matt Biddle från BCO-DMO.
         
    * IMPROVED: ncdump alternativet i generera Dataset Xml är nu mer som ncdump (men använder fortfarande netcdf-java-versionen av ncdump) . Nu skriver den ut en ny lista över alternativ. Nu, för.ncml-filer, det skriver ut ncdump-utgången för resultatet av.ncml-filändringar som tillämpas på den underliggande.nceller.hdffil.
         
    * BUG FIX: Det fanns ett filhandtag läck (så småningom orsakarERDDAP™att frysa upp) orsakade när man skapade vissa typer av utdatafiler, t.ex. .geotif, särskilt när fel inträffade under skapandet. Jag tror/hoppa det är nu alla fixade. Om du fortfarande ser problem, vänligen berätta vilken typ av dataset (nät eller bord) och den typ av fil som orsakar problemet. Tack vare Steven Beale, Lynn DeWitt, Jibei Zhao och andra.
         
    * BUG FIX: ochWMS LeafletDemo konverterade inte helt / korrekt "djup" axeln till "höjning". Nu gör det, och de trasiga legendförfrågningarna är fixerade. Dessutom är alla axelalternativ i listrutorna alltid i stigande sorterad ordning. Tack vare Antoine Queric och Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles stöder nu korrekt begränsningar på String-variabler som skapades från char-variabler i datafilerna. Tack vare Antoine Queric och Aurelie Briand.
         
    * BUG FIX: Nu när en datamängd blir otillgänglig försöker datamängden att meddela (Med meddelandet "Denna dataset är för närvarande inte tillgänglig.") abonnenter, noterade åtgärder, rss och lonPM180 dataset som förlitar sig på det. Tack vare Roy Mendelssohn och Bob Simons.
         
    * BUG FIX: Två buggar relaterade till EDDTableCopy. Tack till Sam McClatchie.
         
    * Antalet misslyckade förfrågningar som visas på status.html-sidan kommer att öka eftersom fler saker räknas som fel än tidigare.
         
    * VIKTIGT:ERDDAPs status.html visar nu "Förfrågningar (median gånger i ms) I tidsserien. Tidigare visade det median gånger truncated till heltal sekunder.
         
    * I jsonld-utgången kommer jsonld-namnet nu från datasetets"title"in iERDDAP, och jsonld "headline" nu kommer från datasetets "datasetID"IERDDAP. Tidigare var det omvänd. Detta verkar fel för mig eftersom i vanlig engelsk användning är "namn" vanligtvis en kort, (idealiskt) En unik identifierare som sällan/aldrig ändras (Robert Middlename Simons) inte en beskrivning som inte är unik och som lätt och ofta kan förändras ("En kille som skriver programvara förNOAA”En lång kille som skriver programvara förNOAA") . Gee, det skulle vara bra om schema.org definitionen av[Namnnamn](https://schema.org/name), i samband med en dataset, var mer specifika. Programutvecklare bör kunna skriva ett genomförande av en specifikation baserat på specifikationen ensam, utan vägledning från experter. Men jag skjuter upp Google (I synnerhet Natasha Noy) NCEI (I synnerhet John Relph) och Rob Fuller.
         
    * I jsonld-utgången är de fyra "spatialCoverage GeoShape-box"-värdena nu minLat minLon maxLat maxLon. Tidigare vändes lat- och lonpositionerna. Gee, det skulle vara bra om schema.org definitionen av[GeoShape](https://schema.org/GeoShape)specificera rätt ordning. Programutvecklare bör kunna skriva ett genomförande av en specifikation baserat på specifikationen ensam, utan vägledning från experter. Tack vare Natasha Noy och Rob Fuller.

## Version 1.82{#version-182} 
 (släppt 2018-01-26) 

*    **Nya funktioner (för användare) Från:**   
     
    * Många subtila förändringar i utseende och känsla avERDDAP™webbsidor.
        * VIKTIGT:ERDDAP™Nu använder HTML 5 och använder bättre CSS.
        * Internetsidorna har ändrats något för att göra dem renare och mindre "upptagna". (De är fortfarande täta och det finns fortfarande saker man kan klaga på, men förhoppningsvis mycket mindre än tidigare.) Tack till John Kerfoot för några kommentarer.
        * Internetsidorna ser nu mycket bättre ut på mobiltelefoner och andra små enheter, särskilt om du använder dem i landskapsorientering. De ser också bättre ut i mycket små och mycket stora fönster i stationära webbläsare.
        * För att förbättra säkerheten och andra skäl, användning av en out-of-date Openlayers version förWMSdemonstrationssidor har ersatts avLeaflet.
        * NY: stöd för förhandsvisningar av bild, ljud och videofiler i"files"Systemsystem (till exempel,[Denna testdatauppsättning](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) och in.htmlTablesvar när en cell har webbadressen till en bild, ljud eller videofil (till exempel,[Denna begäran](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Om du svävar över en "?" ikon, bör du se en bild, ljud eller videofil förhandsgranskning. Du kan också klicka på fillänken för att visa filen full skärm i din webbläsare. Se[Media Files dokumentation](/docs/server-admin/datasets#media-files). Observera att olika webbläsare stöder olika filtyper, så exemplen kanske inte fungerar i din webbläsare.
Tack vare dessa personer / länkar för idéer och provkod för CSS-bara bildverktyg (var på https://codepen.io/electricalbah/pen/eJRLVd ) och uppskjuten bildbelastning (var på https://varvy.com/pagespeed/defer-images.html )   (Även om koden ändrades före användning iERDDAP) .
Tack vare Cara Wilson, Matthew Austin och Adam Shepherd/BCO-DMO för förfrågningar om bildstöd.
Tack vare Jim Potemra, Rich Signell, OOI och Carrie Wall Bell för förfrågningar om ljud / hydrofonfilsupport.
Tack vare OOI för att visa behovet av videosupport.
        * En delmängd av data från allaERDDAP™Dataset (Men vanligtvis en dataset från ljudfiler) Kan nu sparas i en .wav ljudfil. ([dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Tack vare Jim Potemra, Rich Signell, OOI och Carrie Wall Bell för förfrågningar om ljud / hydrofonfilsupport.
        * IMPROVED: Formatet för Web Accessible Folders (WAF)   (t.ex. /filer/ mappar) har uppdaterats för att använda en HTML-tabell. Det nya formatet efterliknar den senaste versionen av katalogen som listar webbsidor som skapats av nyare versioner av Apache. Människor kommer att upptäcka att förändringarna gör informationen lättare att läsa. Programvara som liknar dessa dokument (programvara som skördar ISO 19115-dokument frånERDDAP) måste revideras, men det nya formatet blir lättare att parsera än tidigare format. (Uppmärksamhet, Anna Milan.) 
        * NyttoutOfDateDatasets.htmlsida. ([Exempelvis](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Denna webbsida visar en tabell med alla nära realtidsdata som har en&lt;testOutOfDate&gt; tagga (Se nedan) rankad av hur out-of-date dataset är. Denna instrumentpanel bör vara användbar förERDDAP™administratörer och slutanvändare när de vill veta vilka datamängder som är aktuella. För aktuella datamängder finns det förmodligen ett problem med datakällan, så attERDDAP™kan inte se/få data från nyare tidspunkter.
Administratörer: Om du inte vill ha en Out-Of-Date Datasets webbsida, lägg till detta i din setup.xml:
            &lt;outOfDateDatasetsActive &gt;false&lt;/outOfDateDatasetsActive&gt;
Det finns nutestOutOfDateoch ut Datum kolumner iallDatasetsdataset.
Tack vare Bob Simons, som har velat ha detta i åratal, och till de smarta människorna i Irlands Marine Institute som gav mig inspiration via deras dedikerade Raspberry Pi och bildskärm som alltid visar en skärm som detta på deras kontor.
        * VIKTIGT:.htmlTableoch.xhtmlsvaret är nu bättre formaterat, mer kompakt och därmed ladda snabbare. Tack vare HTML5 och CSS.
    * NEW output filtyp för griddap datasets: .timeGaps. Den visar en lista över luckor i tidsvärdena som är större än mediansklyftan. ([Exempelvis](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Detta är användbart förERDDAP™administratörer och slutanvändare när de vill veta om det finns oväntade luckor i tidsvärdena för en datamängd som förväntas ha regelbundna tidsvärden. Tack vare Bob Simons och Roy Mendelssohn som behövde denna funktion.
    * IMPROVED: Standardgrafen förallDatasetsdataset är nu en karta med x=maxLon och y=maxLat. Tack vare John Kerfoot, Rich Signell och OOI-CI.
    * Ny:[Erddapy](https://github.com/ioos/erddapy)är inte enERDDAP™funktion, men kommer att vara av intresse för mångaERDDAP™användare. Erddapy (ERDDAP™+ + +Python) är enPythonBibliotek som skapats av Filipe Fernandes som ”tar fördel avERDDAP"SRESTfulwebbtjänster och skaparERDDAP™URL för alla förfrågningar som att söka efter datamängder, förvärva metadata, ladda ner data etc. Tack vare Filipe Fernandes.
    * Jag borde ha nämnt tidigare: Det finns ett tredjeparts R-paket som gör det lättare att arbeta medERDDAP™Inifrån R:[Rerddap](https://github.com/ropensci/rerddap#rerddap). Tack vare[ROpenSci](https://ropensci.org/)och Roy Mendelssohn.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:**   
     
    * TO DO: I setup.xml, nedanför&lt;adminInstitution &gt;, lägg till en&lt;adminInstitutionUrl&gt; taggen som anger en URL för din institution (eller grupp) .
    * Dessa 3 taggar i setup.xml används inte längre:
        &lt;Börja HeadHtml&gt;,&lt;StartBodyHtml&gt; och&lt;endBodyHtml&gt;. De ersätts av
        &lt;StartHeadHtml5&gt;&lt;StartBodyHtml5&gt; och&lt;endBodyHtml5&gt;, som har standardvärden som anges i meddelanden.xml (och visas nedan) .
        
Vi rekommenderar att du använder standarden&lt;StartHeadHtml5&gt; och&lt;endBodyHtml5&gt;.
Vi rekommenderar: Om du gjorde ändringar i originalet&lt;StartBodyHtml&gt; och/eller vill anpassa dinERDDAP™Nu, snälla kopiera det nya&lt;StartBodyHtml5&gt; taggen (från nedan) i din setup.xml och ändra den för att anpassa dinERDDAP™så attERDDAPwebbsidor återspeglar din organisation, inteNOAA ERD. Noterbart, vänligen ändra "Brought to you by" till din organisation (s) . Om du behöver hjälp, vänligen e-posterd.data at noaa.gov. (Om du inte vill anpassa dinERDDAP™Använd nu standarden&lt;StartBodyHtml5&gt;.)
        
Ta sedan bort 3 gamla taggar i din setup.xml som inte längre används.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Det finns ytterligare sätt du kan[anpassaERDDAP™](/docs/server-admin/deploy-install#customize)SåERDDAPwebbsidor återspeglar din organisation istället förNOAA ERD.
        
    * För att göra: The&lt;EDDGridExempel & gt; taggar (starta med&lt;EDDGridIdExample & gt;) och&lt;EDDTable... Exempel & gt; taggar (starta med&lt;EDDTableIdExample & gt;) i din setup.xml-fil används för att skapa exempel i griddap ochtabledapdokumentation. html webbsidor i dinaERDDAP.
        
Om du inte anpassade dessa taggar, ta bort dem från din setup.xml-fil. Nu har de alla standarder i meddelanden.xml som hänvisar till dataset i BobsERDDAP™vid https://coastwatch.pfeg.noaa.gov/erddap/index.html . Så du behöver inte längre ha specifika datamängder i dinERDDAP. Om du vill åsidosätta standarderna, kopiera några eller alla dessa taggar i din setup.xml och ändra sina värden.
Om du vill att exemplen ska peka på dinERDDAP™Den enklaste metoden är:
        
        1. Inkludera dessa två datamängder i dinERDDAP™genom att lägga till detta till dittdatasets.xmlFrån:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Lägg till den här taggen till din setup.xml, men ändra webbadressen till dinERDDAP"S (https??) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Om du anpassade dessa taggar, lämna dem som är och vänligen lägg till dessa 2 nya taggar till din setup.xml för att angeERDDAP™URL för dessa datamängder, men ändra webbadressen till dinERDDAP"S (https??) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * För att göra:ERDDAP™nu använder en css fil som heter erddap2.css. Om du har gjort ändringar i\\[Tomcat\\]/webapps/erddap/images/erddap.css, överväga att göra liknande ändringar av erddap2.css (i samma katalog) .
    * Ny:ERDDAPwebbsidor har nu ett stort antal nästan osynliga interna länkar (texten är svart och inte understruken) . Om du svävar över en av dessa länkar (vanligtvis de första orden av rubriker och stycken) Böjaren blir en hand. Om du klickar på länken är webbadressen den interna länken till den delen av dokumentet. Detta gör det enkelt att hänvisa till specifika delar av dokumentationen. Tack till Bob Simons, som har velat ha detta i flera år.
    * Ny:ERDDAP™Nu stöder[Byte Range / Accept-Ranges](https://en.wikipedia.org/wiki/Byte_serving)Förfrågningar om delar av/filer/filer. Detta behövdes för att stödja ljud- och videovisningarna i webbläsare.
    * TO DO: För att förbättra säkerheten, om du har angett&lt;baseHttpsUrl&gt; i setup.xml (och därmed stödhttps) Den rekommenderade flaggan Url är enhttpsURL med en säkrare flaggkey. Om så är fallet kommer alla tidigare flaggUrls/flagKeys att bli ogiltiga. Admins: Om dessa ändringar gäller för dinERDDAP™och om dinERDDAP™harEDDGridFromErddap och EDDTable FromErddaps som prenumererar på distansERDDAPSedan, efter att du har uppdateratERDDAP, dinERDDAP™kommer automatiskt att försöka prenumerera med den nya flagganUrl, så du bör radera de gamla prenumerationerna och validera de nya prenumerationerna när du får de nya abonnemangsbekräftelse e-post.
    * TO DO: Om dinERDDAP™harEDDGridFromErddap dataset för erdVH3 dataset på Bobs kustwatchERDDAP™Vänligen ändra dem för att hänvisa till de nya dataseten för erdVH2018.
    * TO DO: Om du inkluderar någon av jplAquariusSSS-provdatamängderna i dinaERDDAP™Vänligen ändra "V4" idatasetID"V5".
    * För att göra:actual\\_rangeär nu en CF standard attribut (Från och med CF-1.7) och tydligt säger att om variabeln använderadd\\_offsetoch/ellerscale\\_factorför att packa datavärdena, sedanactual\\_rangevärden bör använda den uppackade datatypen och vara uppackade värden. Tyvärr konflikter med våra tidigare råd. GenerateDatasets Xml packar nu packatactual\\_rangevärden, men det kommer inte att fixa befintliga datamängder i dinadatasets.xmlfil.
        
Kontrollera dina datamängder: om en variabels värden är packade och omactual\\_rangespecificeras som packade datavärden, vänligen lägg till en&lt;addAttributes&gt; &gt; &gt; &gt; &gt;actual\\_rangevärde för att specificera de oförpackade värdena. Annars kommer datamängden inte att laddas inERDDAP. Ett enkelt och nästan perfekt sätt att göra detta är att söka efter dittdatasets.xmlFör källa Attribut som har
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
och enscale\\_factorannat än 1.0. De är deactual\\_rangeattribut som du kanske måste fixa.
        
För axelvariabler iEDDGriddataset,ERDDAP™Ställ alltid inactual\\_rangeattributet är det faktiska intervallet av värdena eftersom det vet dessa värden.
        
För axelvariabler med nedstigande värden (t.ex. vissa latitudvariabler) ,ERDDAP™skapat skapatactual\\_rangemed\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]......\\[Sista sista\\]värden, som var höga...low. Nu använder det alltid låga värden för att göra den nya CF-definitionen.
        
Korrektheten hosactual\\_rangevärden är särskilt viktiga för EDDTable dataset, eftersomERDDAP™kommer snabbt att avvisa användarförfrågningar om datavärden som är mindre än deactual\\_rangeminimivärde eller som är större änactual\\_rangemaximalt värde.
        
Relaterad: den faktiska\\_min, faktiska\\_max,data\\_minochdata\\_maxattribut är nu deprecated. Vänligen konvertera dina datamängder för att användaactual\\_rangeI stället.
        
    * För att göra (valfritt, men rekommenderat) Från: För varje nära realtid och prognosdataset i dinERDDAP™Vänligen lägg till en [&lt;testOutOfDate&gt;] (/docs/server-admin/datasets#testoutofdate) tagga med ett värde i formnow-_nUnits_ t.ex.now-2 dagar. Om det maximala tidsvärdet för datamängden är äldre än det värdet, anses datamängden vara aktuell och kommer att markeras som sådan på den.[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)webbsida. Detta ger ett enkelt sätt för dig att se när något är fel med en dataset källa.
    *   [Ny: Semantisk markering av datamängder med json-ld (JSON Länkade data) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™nu använder[Json-ld (JSON Länkade data) ](https://json-ld.org)för att göra din datakatalog och datamängder en del av[Semantisk webb](https://en.wikipedia.org/wiki/Semantic_Web), som är Tim Berners-Lee idé att göra webbinnehåll mer maskinläsbart och maskin "förståeligt". Sökmotorer ([Google i synnerhet](https://developers.google.com/search/docs/data-types/datasets)) och andra semantiska verktyg kan använda denna strukturerade märkning för att underlätta upptäckt och indexering. Den json-ld strukturerade markeringen visas som osynliga-till-människor&lt;script&gt; kod på http://.../erddap/info/index.html Webbsidan (som är en semantisk webb[DataCatalog](https://schema.org/DataCatalog)) och på var och en http://.../erddap/info/_datasetID_/index.html Webbsidan (som är en semantisk webb[Dataset](https://schema.org/Dataset)) . (Särskilt tack till Adam Leadbetter och Rob Fuller från Marine Institute i Irland för att göra de hårda delarna av arbetet för att göra denna del avERDDAP.) 
    * NEW: Det finns nya datasettyper som kan läsa data från ljudfiler:
        [EDDGridFrån AudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), som behandlar ljuddata som ruttna data.
        [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), som behandlar ljuddata som tabular data data. Tack vare Jim Potemra, Rich Signell, OOI och Carrie Wall Bell för förfrågningar om ljud / hydrofonfilsupport.
    * Förändringar i GenerateDatasets Xml (och relaterade förändringar) Från:
        * Ny:ERDDAP™Nu har ett system att automatiskt[uppdatera out-of-date URLs](/docs/server-admin/additional-information#out-of-date-urls)Båda i GenerateDatasets Xml och när du laddar dataset. Om du har förslag på ytterligare webbadresser som ska fångas och uppdateras, eller om du tror att detta ska omvandlas till en tjänst (som konverterarna) , vänligen e-posterd.data at noaa.gov.
        * NY: Om GenerateDatasets Xml ser en CFstandard\\_name  (som bör vara alla lägre) med en överkroppskaraktär lägger den till all nedre version till&lt;addAttributes&gt;. När en dataset laddas, omERDDAP™ser en CFstandard\\_namemed en överkropp, den tyst ändrar den tillstandard\\_name. Tack vare Rich Signell.
        * NY: Om GenerateDatasets Xml ser ett attribut med en tid som inte är i ISO 8601-format, det lägger till ISO 8601-formaterad tid till&lt;addAttributes&gt;. OmERDDAP™Känner inte igen formatet, det lämnar tidsvärdet oförändrat. Om du ser ett format somERDDAP™inte känner igen och fixar, vänligen maila det tillerd.data at noaa.gov.
        * IMPROVED: Den låga nivåkoden förEDDGridFrånThredds Katalogalternativ i GenerateDatasets Xml är nu beroende avUnidatanetcdf-java katalog crawler kod (Tredds. katalog klasser) så att den kan hantera alla THREDDS-kataloger (som kan vara överraskande komplexa) . Tack till Roland Schweitzer för att ha föreslagit denna förändring och tack vareUnidataför koden.
        * Ny: GenerateDatasets Xml förEDDGridFromDap lägger nu till ", startYear-EndYear" till slutet av titeln baserat på faktiska tidsaxelvärden. EndYear="present" om data finns under de senaste 150 dagarna.
        * Ny: GenerateDatasets Xml förEDDGridFromDap lägger nu till ",\\[resolution\\]°" till titeln om datasetet är jämnt fördelat och detsamma för lat och lon.
        * IMPROVED: Tidsomvandlaren har nu ytterligare funktioner, särskilt förmågan att konvertera strängtider i en mängd olika vanliga format till ISO 8601 strängar eller till ett UDUnits-kompatibelt tal. Alla tidigare stödda funktioner fortsätter att fungera, oförändrade.
        * BUG FIX: GenerateDatasets Xml och Keywords-omvandlaren innehåller nu "Earth Science" i början av GCMD Science Keywords. När en dataset laddas inERDDAP™,ERDDAP™Nu fixar alla GCMD-nyckelord i nyckelordsattributet som inte börjar med "Earth Science" eller som använder något annat än titelfall (där varje ords första bokstav kapitaliseras) .
        * VIKTIGT: När du föreslår&lt;destinationName&gt;'s, GenerateDatasets Xml för EDDTableFromAsciiFiles använde bara svansens ändesourceNames med'/'  (Några var filnamn-liknande) . Nu använder den helasourceName(t.ex. ”blahblahblah (m/s)”. Denna förändring kommer att vara bra för vissa dataset och inte för andra, men det är säkrare beteende. Tack vare Maurice Libes.
        * BUG FIX: GenerateDatasets Xml och datasetbyggarna ser nu till att det inte finns några dubbla kolumnnamn. Tack vare Maurice Libes.
        * BUG FIX: GenerateDatasets Xml för EDDTableFromAsciiFiles skrev inte&lt;kolumnSeparator&gt; till utgången. Nu gör det. Tack vare Maurice Libes.
    * NEW: DasDds-verktyget trycker nu ut tidsgapinformation (och[.timeGaps information](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) Om datasetet är ett rutnät dataset.
    * Avancerad sökning accepterar nu "now_\\-nUnits_" tidsvärden. Tack vare Rich Signell.
    * För att förbättra säkerheten, när en e-postadress i en datamängds metadata eller data skrivs till en html-webbsida, ersätts "@" vid ". Detta fångar bara e-postadresser som är hela metadata eller datavärde, inte e-postadresser inbäddade i längre värden.
    * För att öka säkerheten,RSSInformation för privata datamängder är nu endast tillgänglig för användare (ochRSSläsare) som är inloggade och bemyndigade att använda denna dataset.
    * NY: Nu när en dataset laddas, omdate\\_created,date\\_issued,date\\_modified, eller date\\_metadata\\_modified attribut har ett tidsvärde som inte finns i ISO 8601-format,ERDDAP™ändrar den till ISO 8601 formaterad tid. OmERDDAP™Känner inte igen formatet, det lämnar tidsvärdet oförändrat. Om du ser ett format somERDDAP™inte känner igen och fixar, vänligen maila det tillerd.data at noaa.gov.
    * .dods svar frånEDDGriddatamängder bör nu vara betydligt snabbare. Tack vare Rich Signell.
    * Förändringar relaterade tillERDDAPSkapandet av ISO 19115 dokument:
        * BUG FIX: När du skapar ISO 19115 dokumentdataVariableenheter var inte HTML Attribute kodade och procent kodade. Nu är de. Tack vare NGDC:s ISO 19115 validator.
        * BUG FIX: När du skapar ISO 19115 dokumentdate\\_createdanvändes som det är, så ofta var fel format. Nu konverteras den till ISO 8601 Z-sträng. Tack vare NGDC:s ISO 19115 validator.
        * BUG FIX: När du skapar ISO 19115 dokumentERDDAP™Skriver längre datum med år =0000 (som med dataset för klimatologi) Eftersom ISO 19115-schemat inte tillåter datum med år=0000. Tack vare NGDC:s ISO 19115 validator.
    * NY: Som före en begäran omhttp.../erddap/version returnerar bara versionsnumret (som text) t.ex. "ERDDAP\\_version=1.82"
Nu, en begäran atthttp.../erddap/version\\_string kommer att returnera ett nummer och ett valfritt suffix av "\\_" plus ASCII-text (Inga utrymmen eller kontrollkaraktärer) t.ex. "ERDDAP\\_version\\_string=1.82\\_JohnsFork. Folk som gör gaffeln kommer att ange detta genom att ändra EDStatic.erddapVersion. Detta sätt att göra det orsakar inte problem för tidigare versioner avERDDAP. Tack till Axiom (I synnerhet Kyle Wilcox) Irlands Marine Institute (Framför allt Rob Fuller) .
    * BUG FIX: För wms version=1.3.0, request=GetMapcrs=EPSG:4326 (inte CRS:84) Förfrågningar: bboxbeställningen måste vara minLat,minLon,maxLat,maxLon. För CRS:84 förfrågningar, som tidigare, måste bbox beställning vara minLon,minLat,maxLon,maxLat. Detta kan fixa användningERDDAP"SWMS1.3.0 service iArcGIS  (Tack vare Paola Arce) . Tack (Inte inte) attOGCför att göra detta så komplicerat. Tack vareLeafletför att hantera detta korrekt och för att ge mig ett sätt att testa detta.
    * Föregående, den föreslagna länken förRSSe-postabonnemang harhttpURL för dinERDDAP. Nu är det denhttpsURL, om det är aktivt.
    * Ny:EDDGridCopy stöder nu en valfri tagg&lt;endastSince&gt;_someValue_&lt;/onlySince&gt;, där värdet är en specifik ISO-8601-formaterad tid eller ennow-NUnits (t.ex.,now-2 år) Tid. Se[endast endast Sedan dokumentation](/docs/server-admin/datasets#onlysince). Tack vare Drew P.
    * VIKTIGT: Om det är tillgängligt,ERDDAP™kommer att visahttpsURL (från&lt;baseHttpsUrl&gt;, om tillgängligt) istället förhttpURL när det berättar användarna URL:n att lägga till / validera / ta bort / lista ett abonnemang.
    * BUG FIX:ERDDAP™Nu tillåter en prenumerationsåtgärd att börja med " https://" . (Bob slår sin panna.) Tack till Jennifer Sevadjian.
    * BUG FIX:.jsonlKVPanvänder nu ":" mellan varje nyckel och värde, istället för'='. (Bob slår sin panna.) Tack till Alexander Barth.
    * BUG FIX: Tidigare, om du startade omERDDAP™med quickRestart=true, och om, innan datasetet laddades om normalt, du ringde till en EDDTableFromFiles dataset som använde updateEveryNMillis, och om en datafil just hade ändrats, skulle begäran misslyckas med en nollpekare fel. Nu kommer begäran att lyckas. Tack till John Kerfoot.
    * NEW: När en dataset laddas inERDDAP™Nyckelorden omorganiseras nu till sorterad ordning och eventuella nyhetskaraktärer tas bort.
    * Om en .geoJson,.jsoneller.ncOJson begäran har.jsonp parameter, svar mime typ är applikation/javascript. Observera att.jsonP stöds inte för.jsonlCSVeller.jsonlKVPeftersom det inte skulle fungera. Tack till Rob Fuller.
    * IMPROVED: Mime-typen för json-linjer filtyp är nu "application/x-jsonlines". Det var applikation/jsonl. För närvarande finns det inget definitivt korrekt val.
    * Antalet misslyckade förfrågningar som visas på status.html-sidan kommer att öka eftersom fler saker räknas som misslyckanden än tidigare, t.ex. ClientAbortException.
    * Om ett svar frånERDDAP™inte komprimeras, då kommer svarets rubrik att innehålla "Content-Encoding"="identitet".
    * IMPROVED: "Licens" -attributet behövdes inte. Nu, om det inte anges, standardlicensen från meddelanden.xml (eller från setup.xml om nu) används som standard.
    * NY: Det finns nu en valfri[filAccessSuffix attribut](/docs/server-admin/datasets#fileaccessbaseurl)som kan användas med befintliga[filAccessBaseUrl attribut](/docs/server-admin/datasets#fileaccessbaseurl).
    * För att öka säkerheten sammanställdes denna version med den senasteJavaJDK v8u162.
    * För att öka säkerheten, flera vanliga domäner som erbjuder tillfälliga e-postadresser (t.ex. @mailinator.com) finns nu på en permanent e-post svartlista för abonnemangssystemet.
    * För att öka säkerheten inkluderar nu talliesna i Daily Report:
SetDataset Flag IP-adress misslyckades (Sedan senaste dagsrapporten)   
SetDataset Flag IP-adress misslyckades (Sedan start)   
SetDataset Flag IP-adress framgångsrik (Sedan senaste dagsrapporten)   
SetDataset Flag IP-adress framgångsrik (Sedan start)   
De "misslyckade" tallies låter dig se vem (En hacker?) försöker sätta en flagga, men misslyckas.
    * För att öka säkerheten, e-postadresser i&lt;abonnemangEmailBlacklist &gt; i dindatasets.xmlanses nu vara case-insensitive.
         

## Version 1.80{#version-180} 
 (släppt 2017-08-04) 

*    **Nya funktioner (för användare) Från:**   
     
    * NyttorderByCount () filter låter dig ange hur resultattabellen sorteras (eller inte) och bara returnerar en rad för varje sortgrupp, med antalet icke-saknade värden för varje variabel.
Till exempel,orderByCount ("stationID") kommer att sorterastationIDoch returnera en rad för varjestationIDmed ett antal icke-saknade värden för varje variabel.
Om du bara specificerarorderByCount (""") Svaret blir bara en rad med antalet icke-saknade värden för varje datavariabel.
Se[orderBy... dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Tack vare Ben Adams.
    * Nytt.ncOJson-fil Typalternativ för gridded och tabular dataset. Detta alternativ gör enNCOlvl=2 "pedantisk" JSON-fil med all information som normalt finns i en.ncfil. Se[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Tack till Charlie Zender.
    * BUG FIX: ochorderBy...... () Alternativ på Make A Graph-webbsidan hanteras nu korrekt.
    * BUG FIX: .geoJson utgång nu inte skriva ut rader där lat eller lon värdena saknas. Även höjdvärden (om det är tillgängligt) ingår nu i koordinaterna, inte som datavärden. Tack till Jonathan Wilkins.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:**   
     
    * Security ISSUE: Protokollen.js bibliotek som används förOpenLayersDemo påWMSsidor iERDDAP™är out-of-date och har en bugg som potentiellt tillåter det att missbrukas. (Tyvärr, uppdateraOpenLayersoch protokoll. js är inte lätt.) Det öppnar upp möjligheten att biblioteket kan ställas in för att möjliggöra en sårbarhet på plats. Men eftersomERDDAP™endast användningarOpenLayerspå ett specifikt förinställt sätt och endast med specifikERDDAP-baserade datakällor, vi tror att det inte finns någon sårbarhet på platsERDDAPanvändning avOpenLayersoch protokoll.js. Men om du inte tror detta, kan du nu inaktivera användningen avOpenLayersDemo påWMSsidor på dinaERDDAP™genom att lägga till
```
        <openLayersActive>false</openLayersActive>  
```
till din setup.xml-fil. Standarden är "sann". Tack vare Charles Carleton och NCEI.
    * Security Changes: Oanvända .jar-filer och duplicera .jar-filer (eftersom de också är i netcdfAll.jar) har tagits bort frånERDDAP™distribution. Out-of-date .jar filer har uppdaterats. Tack vare Charles Carleton och NCEI.
    * Security Changes: netcdfAll.jar-filen distribuerad medERDDAP™är den senaste versionen (för närvarande 4.6.10) , men det innehåller fortfarande interna jackson .jar-filer som är kända för att vara out-of-date och har säkerhetsproblem, särskilt Jackson-biblioteken som endast används när du använder Amazon S3-datakällor. Om du inte har tillgång till data via Amazon S3 (Du skulle veta om du var) Dessa sårbarheter är inte relevanta.
        
netcdf-java-utvecklarna hävdar att dessa sårbarheter inte är relevanta på grund av det sätt som netcdf-kod använder dessa bibliotek och i alla fall bara skulle vara relevant när du använder Amazon S3. Se[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Jag tror dem. Om du fortfarande har problem med detta, vänligen kontakta netcdf-java utvecklare. (Observera att om du inte tror netcdf-java utvecklare och funderar på att inte användaERDDAP™På grund av detta bör du inte använda TREDDS heller, eftersom TREDDS använder netcdf-java mer fundamentalt och mer omfattande änERDDAP.) 
        
Detaljer: Den besvärliga koden och sårbarhetsvarningarna är:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 ----- Hög
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 ----- Hög
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 ----- Hög
Se https://nvd.nist.gov/vuln/detail/CVE-2016-3720 Kritiskt
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 ----- Hög
Se https://nvd.nist.gov/vuln/detail/CVE-2016-3720 Kritiskt
"För version 4.6.10 drar aws-java-sdk-core i version 2.6.6 av jackson-\\* artefakter." (e-post från netcdf-java människor) .
Tack vare Charles Carleton och NCEI.
        
    * Kompilatorförändringar: Om du återkommerERDDAP™Observera att -cp-klasspath-parametern som behövs för kommandoraden nu är mycket kortare än tidigare. Se den nya -cp inställningen i[Denna dokumentation](/docs/contributing/programmer-guide#development-environment). Tack vare Charles Carleton och NCEI.
    * NY OPTION i GenerateDatasets Xml: EDDTableFromBcodmo, som bara är för internt bruk på BCO-DMO.
Tack vare Adam Shepherd och BCODMO.
    * NEW ATTRIBUTE och FEATURE: Om en EDDTable-kolumn har filnamn på webbtillgängliga filer (t.ex. bild, video eller ljudfiler) Du kan lägga till
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
för att ange bas URL (Slutar med /) behövs för att göra filnamnen till kompletta webbadresser. För.htmlTablesvar,ERDDAP™kommer att visa filnamnet som en länk till den kombinerade URL (basen Url plus filnamnet) .
Om du villERDDAP™för att tjäna relaterade filer, göra en separat EDDTableFromFileNames dataset för dessa filer (Det kan vara en privat dataset) .
Tack vare Adam Shepherd och BCODMO.
    * NEW ATTRIBUTE RECOMMENDATION: Om en EDDTable-kolumn har filnamn på webbtillgängliga filer (t.ex. bild, video eller ljudfiler) som är tillgängliga via ett arkiv (t.ex.,.zipfil) tillgänglig via en URL, använd
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
att ange URL för arkivet.
Om du villERDDAP™för att tjäna arkivfilen, göra en separat EDDTableFromFileNames dataset för den filen (Det kan vara en privat dataset) .
Tack vare Adam Shepherd och BCODMO.
    * IMPROVEMENTS to GenerateDatasets Xml tar bort orsakerna till ogiltig/dålig&lt;subsetVariablesFörslag och dubblett/dåligt föreslog variabla namn etc. Tack vare Rich Signell, Adam Shepherd och BCO-DMO.
    * Nytt uppdrag: Den politiska gränsinformation som delas ut medERDDAPär från en tredje part och något out-of-date. Det finns också omtvistade gränser på flera ställen i världen, där olika människor kommer att ha olika idéer om vad som är korrekt. Vi gör inga klaimer om hjärtat av den politiska skriften data medERDDAP. Om du inte gillar den politiska gränsinformationen som följer medERDDAP™Nu kan du berättaERDDAP™att aldrig dra politiska gränser genom att lägga till
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
till din setup.xml-fil. Standarden är "sann". Tack till Raju Devender.
    * NY METADATA TAG: I dendatasets.xmlför en dataset kan du nu ange standardnumret för färg Bar avsnitt för endataVariablepå grafer och kartor med
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1, som säger attERDDAP™besluta att besluta) . Se[Färgfärg Bar inställningar](/docs/server-admin/datasets#color-bar-attributes).
    * IMPROVED: statens gränsfärg på kartor var lila (Djup lila för dig baby boomers) . Nu är det grå (mellan den nationella gränsen grå och landet grå) .
    * BUG FIX:&lt;iso19115File &gt; och&lt;fgdcFile &gt; idatasets.xmlhanterades inte alltid korrekt. Nu är de. Tack vare BCO-DMO.

## Version 1.78{#version-178} 
 (släppt 2017-05-27) 

*    **Nya funktioner (för användare) Från:**   
     
    *    (Ingen)   
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:**   
     
    * IMPROVED: Ordern för rader i "Major LoadDatasets Time Series" på status.html-sidan är nu nyast på toppen till äldsta längst ner.
    * BUG FIX:ERDDAP™nu skriver.nccsvfiler med tidsvariabelnsactual\\_rangeSom en ISO-8601 String tid. Det fixar felet med EDDTableFromErddap parsing info från en fjärrdataset och från snabbstart-filen för alla EDDTableFrom...Files dataset. (Tidenactual\\_rangekommer att vara fel första gången datamängden laddas i v1,78 men korrekt efter det laddas om, t.ex. om du flaggar datamängden.) 

## version 1.76{#version-176} 
 (släppt 2017-05-12) 

*    **Nya funktioner (för användare) Från:**   
     
    * Change i Tomcat: För förfrågningar attERDDAP™kommer från andra programvara än webbläsare (t.ex.,curlR, R,Matlab,Python,Java) Från:
Som med tidigare ändringar i versioner av Tomcat (lägre nivå programvara som körsERDDAP) Sedan början av 2016 måste fler och fler av karaktärerna i fråga del av begäran URL vara[ **Procent kodad** ](/docs/server-admin/datasets#infourl)Av säkerhetsskäl. Webbläsare tar hand om procent kodning för dig. Så att användaERDDAP™i en webbläsare påverkas inte om inte begäran omdirigeras till en annanERDDAP.
    * Föregående:ERDDAP™behandlad **char variabler** mer som osignerade korta heltal än tecken. Nu behandlar det dem mer som 1-karaktärslånga UCS-2 (Unicode) Strängar. Se[char dokumentation](/docs/server-admin/datasets#char). Tack vare Aurelie Briand och Argo-projektet.
    * Föregående:ERDDAP™Erbjudet litet stöd för **Unicode karaktärer** över karaktär #255 i strängar. Nu, internt,ERDDAP™fullt stöder 2-byte UCS-2 chars (tecken numrerade 0 till 65535) i strängar. När String-data skrivs till olika filtyper,ERDDAP™Gör det bästa det kan för att stödja 2-byte chars. Ett annat exempel är .csv filer somERDDAP™Skriver med ISO-8859-1 charset (1-byte charset) Så, såERDDAP™Skriver några tecken över tecken #255 med JSON-liknande \\u_hhhh_ syntax. Se[String data](/docs/server-admin/datasets#string).
    * VIKTIGT: I.ncfiler skrivna avERDDAP™char variabler som ska tolkas som strängar kommer att ha attributet
         **\\_Encoding=ISO-8859-1**   
Inom.ncfiler som läses avERDDAP™char variabler med "\\_Encoding" kommer att tolkas som strängar med den angivna charset.
    * REMINDER:ERDDAP™stöd **JSON-liknande backslash-kodning** av speciella tecken när du anger begränsningar av char och String variabler. Således kan du begära något som &myString ="u20ac" när du vill ha rader av data där myString = sedan 20ac är den hexadecimala versionen av kodpunkten för Euro-symbolen. Flera källor på webben visar kodpunktnumren för Unicode-symboler, t.ex.[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * Föregående:ERDDAP™Erbjudet begränsat stöd för **Långt heltal** variabler. Numera nuERDDAP™fullt ut stöder längder internt och gör sitt bästa när du skriver långa data till olika filtyper. Se[lång dokumentation](/docs/server-admin/datasets#long). Tack vare Irlands Marine Institute, Craig Risien, Rich Signell, Christopher Wingard och OOI.
    * NEW: utdatafiltyp för griddap ochtabledapFrån: **.nccsv** som gör enNetCDF-som ASCII, CSV-fil som också innehåller alla metadata som skulle vara jämförbara.ncfil. Se[NCCSV Specifikation](/docs/user/nccsv-1.00). Tack till Steve Hankin.
    * Ny: **orderByClosestfilterfilter** låter dig ange hur resultattabellen ska sorteras och ett intervall (t.ex. 2 timmar) . Inom varje sortgrupp kommer endast raderna närmast intervallet att hållas. Till exempel,orderByClosest ("stationIDTid, 2 timmar") kommer att sorterastationIDoch tid, men bara returnera raderna för varjestationIDdär den sistaorderByKolumn (Tid) är närmast 2 timmars intervall. Detta är det närmaste itabledapAtt kliva värdena i en griddap begäran. Detta alternativ kan specificeras via någontabledapdataset .html webbsida, .graph webbsida och av någon URL som du genererar själv. Tack vare Irlands Marine Institute och Ocean Networks Canada.
    * Ny: **orderByLimitfilterfilter** låter dig ange hur resultattabellen ska sorteras och ett gränsnummer (t.ex. 100) . Inom varje sortgrupp kommer endast de första "gräns" raderna att hållas. Till exempel,orderByMax ("stationID100") kommer att sorterastationID, men bara returnera de första 100 raderna för varjestationID. Detta liknar SQL:s LIMIT-klausul. Detta alternativ kan specificeras via någontabledapdataset .html webbsida, .graph webbsida och av någon URL som du genererar själv. Tack vare Irlands Marine Institute och Ocean Networks Canada.
    * NEW: Två nya svarsfiltyper, **.jsonlCSVoch.jsonlKVP** finns för förfrågningar om ruttna datamängder, tabelldatamängder och många andra platser iERDDAP  (t.ex. begäran om information om datamängder) . Filerna är JSON Lines-filer ([ https://jsonlines.org/ ](https://jsonlines.org/)) där varje rad har ett separat JSON-objekt..jsonlCSVhar bara värdena i ett CSV-format..jsonlKVPNyckeln: Värdepar. Varje linje står på egen hand. Linjerna är inte inneslutna i en större JSON-array eller objekt. Till exempel, se[denna provförfrågan](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Tack vare Damian Smyth, Rob Fuller, Adam Leadbetter och Irlands Marine Institute.
    * NEW: Det finns en ny dokumentation som beskriver[ **Hur man får tillgång till privata datamängder iERDDAP™via Scripts** ](/docs/user/AccessToPrivateDatasets). Tack till Lynn DeWitt.
    * VIKTIGT: Den minsta omfattningen av **OpenLayers** Kartan var 2 grader och är nu 4 datapixlar. Tack vare Rusty Holleman.
    * I vissa gemensamma fall, förfrågningar som inkluderar en **regelbundet uttryck** Begränsning kommer att behandlas mycket snabbare.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:**   
     
    *    **SLOW FIRST STARTUP:** Första gången du startar den här nya versionen tar det lång tid för dig.ERDDAP™att ladda alla datamängder eftersom det måste läsa om alla källdatafiler (Även om bara rubriken för ruttna datafiler) . Om du tittar på loggar kan du se felmeddelanden som säger "gamla / osupporterade förbättrad version" av vissa interna filer - det är okej -ERDDAP™kommer att göra de nya versionerna av de interna filerna. Var tålmodig.
    * ACTION:ERDDAP™nu använder den nya **Java.time** klasser (även känd som JSR 310) I stället för Joda för att parsa String-tider till numeriska tider. Anteckningar:
        * OmERDDAP™plötsligt har problem att parsa String-tider för en viss datamängd och därmed bara konverterar mest eller hela tiden till NaN: s (saknade värden) Problemet är nästan alltid med datumet Tidsformatsträng som du angav som variabelns "enheter". Det nya systemet behöver ibland en något annorlunda datumTime format sträng.
        * Om numeriska månader och dagar i datumTime strängar är inte 0-padded (t.ex. "3/7/2016") Se till att formatet bara har en enda M och d (t.ex. "M/d/yyyyy", inte "MM/dd/yyyy") .
        * Ändra någon fraktionell sekundsspecifikation som använder lägre s (t.ex. .ss inyyyy-MM-ddH:mm:ss.ss) till kapital S's, (t.ex.,yyyy-MM-ddH:mm:ss.SSS) .
        *   ERDDAP™inte längre stöder strängdatum Tidsformat med tvåsiffriga år (yy) med ett underförstått århundrade (t.ex. 1900 eller 2000) . Företagen spenderade miljarder dollar för att lösa detta problem i slutet av 1990-talet. Forskare bör inte använda två siffror år. Vänligen fixa källfilen (s) genom att konvertera till 4-siffriga år, använd sedan yyyy i datumet Time format.
        * Du kan använda yyyy eller YYYY (som skallERDDAP™konverterar till uuuu) parse 4 siffror år, inklusive negativa år, t.ex. -4712 (som är 4713 f.Kr.) . Tack vare SeaDataNet, Thomas Gardner och BODC.
        * Fortsätt att använda Z inom ett datumTime-format för att fåERDDAPför att parase en tid offset (t.ex. Z, +0200, -08, -0800, -08:30) .
        *    **Se till att du använderJavaversion 1.8.0\\_21 eller högre.** 
        * Programmerare ----- Om du skriverJavaProgram som körERDDAP™kod, du måste ta bort referensen till joda-time. Kör i klassvägsparametern.
    * Ny:ERDDAP"S[ArchiveA Dataset Tool](/docs/server-admin/additional-information#archiveadataset)kan nu skapa[ **BagIt filer** ](https://en.wikipedia.org/wiki/BagIt). NCEI kan standardisera på detta format. Tack till Scott Cross och John Relph.
    * IMPROVED: Länkarna för att ladda ner erddap. krig motERDDAP™webbsidor pekar nu på **GitHub** . (De är offentliga länkar, så du behöver inte gå med GitHub.) Detta innebär mycket snabbare nedladdningar (upp till 12 Mb/s jämfört med 1Mb/s) och få problem med nedladdningar. Tack vare Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney och Irlands Marine Institute.
    * Improped: The **status.html sida och den dagliga Statusrapport e-post** Nu finns ett avsnitt "Major LoadDatasets Time Series" som visar statistik omERDDAP™i slutet av varje större lastDatasets för de senaste 100 stora lastDatasets. Tack vare vår besvärliga RAID.
    * Ny: en ny, valfri (men rekommenderas) parameter för EDDTableFromCassandra dataset: [ ** &lt;partitionKeyCSV&gt; ** ] (/docs/server-admin/datasets#partitionkeycsv) . Tack vare Ocean Networks Canada.
    * NEW: EDDTableFromAsciiFiles stöder nu ** &lt;KolumnSeparator&gt; ** parameter. Om null eller ", klassen kommer att gissa, som tidigare, Annars kommer den första karaktären att användas som kolumn separator när du läser filerna. Tack vare Sky Bristol och Abigail Benson.
    * Nytt: den nya datasettypen,[ **EDDTableFromNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles)kan göra en dataset genom att aggregera[NCCSV .csv-filer](/docs/user/nccsv-1.00). Tack till Steve Hankin.
    * VIKTIGT: **EDDTableFromErddap** nu använder.nccsvför att få information från fjärrkontrollERDDAPs och för lokal arkiv av den metadatainformationen. Detta möjliggör fullt stöd för char och långa datatyper, och för Unicode (UCS 2) Charset för chars och strings. Tack vare Rob Fuller och Irlands Marine Institute.
    * IMPROVED: EDDTableFromErddap ochEDDGridFromErddap stöder nu ** &lt;omdirigering &gt; falskt&lt;/Omdirigera&gt; ** som berättarERDDAP™aldrig omdirigera begäran till fjärrkontrollenERDDAP. Standarden är sann. Detta är användbart när fjärrkontrollenERDDAP™är en privatERDDAP. Tack vare Damian Smyth, Rob Fuller och Irlands Marine Institute.
    * VIKTIGT:ERDDAP™Nu fångar **Annullerade användarförfrågningar** Förr. ochERDDAP™stängs nu snabbare eftersom trådarna på låg nivå stängs snabbare. Tack vare vår besvärliga RAID.
    *    **GenerateDatasets Xml:** 
        * NEW: Den nya speciella EDDType "ncdump" skriver ut en[ncdump](https://linux.die.net/man/1/ncdump)\\-liknande utskrift av rubriken på en.ncfil. Du kan också skriva ut datavärdena för specificerade variabler (eller ange "ingenting" för att inte skriva ut några datavärden) . Detta är användbart eftersom det utan ncdump är svårt att veta vad som finns i en fil och därmed vilken EDDType du ska ange för GenerateDatasetsXml. Tack vare Craig Risien, Rich Signell, Christopher Wingard och OOI.
        * NY: För SeaData Nettodata:
När så är lämpligt, GenerateDatasets Xml gör nu en specifik semantisk omvandling med en fjärr SPARQL-fråga: om en variabels källmetadata innehåller en sdn\\_parameter\\_urn, t.ex. sdn\\_parameter\\_urn = "SDN:P01::: PSLTZZ01", GenerateDatasets Xml kommer att lägga till motsvarande P02-attribut, t.ex. sdn\\_P02\\_urn = "SDN:P02::PSAL". Om du har datamängder som använder dessa attribut, och om duERDDAP"S&lt;categoryAttributesi setup.xml innehåller sdn\\_parameter\\_urn och sdn\\_P02\\_urn, användare kommer att kunna användaERDDAP™Kategori söksystem för att söka efter datamängder med specifika värden för dessa attribut. Tack vare BODC och Alexandra Kokkinaki.
        * IMPROVED: GenerateDatasets Xml ändrar nu mångahttp://referenser i metadata tillhttps://när så är lämpligt.
        * IMPROVED: GenerateDatasets Xml försöker nu gissa skapare\\_type och utgivare\\_type.
        * IMPROVED: Variabelns dataTyper föreslogs av GenerateDatasets Xml blir nu lite bättre. Tack vare Margaret O'Brien, LTER och EML.
        * IMPROVED: GenerateDatasets Xml är bättre på att specificera&lt;cdm\\_data\\_type&gt; och lägga till relaterade, nödvändiga attribut (t.ex.&lt;cdm\\_timeseries\\_variables&gt;), så att du kan tillhandahålla den informationen. Tack vare Rich Signell.
        * IMPROVED: I GenerateDatasets Xml, för EDDTable dataset, förslag för&lt;subsetVariablesär nu mycket mer konservativ. Tack till John Kerfoot.
        * VIKTIGT: Omdatasets.xmlför en dataset specificerarfeatureTypemen inte cdm\\_data\\_type,featureTypeanvänds som cdm\\_data\\_type. Tack vare Rich Signell.
        * BUG FIX: generera Dataset Xml föreslår nu rätt&lt;DataType &gt; för datavariabler som harscale\\_factor,add\\_offsetoch/eller \\_Unsigned attribut.
    * Improped: NärERDDAP™öppnar en.ncfil som är **Kortare** än det är tänkt att vara (t.ex., det blev inte helt kopierat på plats) ,ERDDAP™behandlar nu filen så dålig. Tidigare,ERDDAP™returnerade saknade värden för någon saknad del av filen eftersom det är standardbeteendet för netcdf-java.ERDDAP™Nu använder ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation= true; Tack vare vår besvärliga RAID och Christian Ward-Garrison.
    * ISO 19115 författare använder nu **Skaparen\\_type** Om nu.
    * VIKTIGT:ERDDAP™nu använder den senaste netcdf-java v4.6.9 som kan läsa ytterligare typer av **netcdf-4 filer** . Tack vare Craig Risien, Rich Signell, Christopher Wingard och OOI.
    * BUG FIX: Undvik problem om olika källfiler har olika datatyper för en viss variabel. Tack vare Roy Mendelssohn och Eugene Burger.
    * BUG FIX: **Tidsformat konverteringar** är nu bättre skyddade mot dåliga tidsvärden. Tack till NDBC.
    * BUG FIX:EDDGridFrånNcFiles Unpacked hanterar nu tidsvärden med **"månader sedan ..." och "år sedan ..."** korrekt (genom att stegra månaden eller året, inte genom att grovt lägga till t.ex. 30 dagar upprepade gånger) . Tack vare Soda3.3.1.
    * BUG FIX: bara i v1,74, **Prenumerationer** krävs en åtgärd (t.ex.,http://......) , vilket var och bör vara valfritt.
    * BUG FIX:EDDGridFrånMergeIRFiles.lowGetSourceMetadata () Inte lägga till några globala attribut. Nu gör det.
         

## Version 1.74{#version-174} 
 (släppt 2016-10-07) 

*    **Nya funktioner (för användare) Från:**   
     
    * Nu när en lista över datamängder (Allt, eller från en sökning) visas på en webbsida, långa titlar visas på flera rader. Tidigare ersattes mitten av en lång titel med "..." Tack vare Margaret O'Brien, LTER och EML.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:**   
     
    * TO DO: På Linux-datorer, ändra Apache timeout-inställningarna så att tidskrävande användarförfrågningar inte timeout (med vad som ofta visas som en "Proxy" eller "Bad Gateway" fel) . Som rotanvändare:
        
        1. Ändra Apachehttpd.conf-fil (vanligtvis i /etc/httpd/conf/) Från:
Ändra befintliga&lt;Timeout &gt; Inställning (eller lägga till en i slutet av filen) till 3600 (sekunder) I stället för standard 60 eller 120 sekunder.
Ändra befintliga&lt;Proxytimeout &gt; Inställning (eller lägga till en i slutet av filen) till 3600 (sekunder) I stället för standard 60 eller 120 sekunder.
        2. Starta Apache: /usr/sbin/apachectl K graciös (Men ibland är det i en annan katalog) .
        
Tack till Thomas Oliver.
         
    * Ny:\\[bigParentDirectory/hård Flagga katalog
Detta fungerar som flaggkatalogen, men hardFlag-versionen tar också bort all cachad dataset-information. Det finns inga webbadresser för att ställa in en hardflag. Detta kan endast användas genom att sätta en fil i den katalogen.
hård hård Flaggor är mycket användbara när du gör något som orsakar en förändring i hurERDDAP™läser och tolkar källdata, till exempel när du installerar en ny version avERDDAP™eller när du har gjort vissa typer av ändringar i en dataset definition idatasets.xml. Se[Denna dokumentation](/docs/server-admin/additional-information#hard-flag). Tack till John Kerfoot och alla Argo-grupper.
         
    * Ny: GenerateDatasets Xml har nu ett EDDTableFromEML-alternativ
som läser en dataset beskrivning i ett Ekologiskt metadataspråk (EML) fil, laddar ner den relaterade datafilen och genererar en bit avdatasets.xmlså att dataset kan läggas tillERDDAP. Det finns också en EDDTableFromEMLBatch som gör samma sak för alla EML-filer i en katalog. Detta fungerar mycket bra eftersom EML gör ett utmärkt jobb med att beskriva datamängden och eftersom KNB och LTER gör de faktiska datafilerna tillgängliga.
EML plusERDDAP™kan vara en bra kombination, eftersomERDDAP™kan ge användarna mer direkt tillgång till mängden KNB- och LTER-data och hjälpa dessa projekt att möta den amerikanska regeringens[Offentlig tillgång till forskningsresultat (Parr) krav](https://nosc.noaa.gov/EDMC/PD.DSP.php)genom att göra data tillgängliga via en webbtjänst.
Se[Denna dokumentation](/docs/server-admin/EDDTableFromEML). Tack vare Margaret O'Brien, LTER och EML.
         
    * Ny: GenerateDatasets Xml har nu ett EDDTableFromInPort-alternativ
som läser en dataset beskrivning i en InPort XML-fil och försöker generera en bit avdatasets.xmlså att dataset kan läggas tillERDDAP. Detta skapar sällan en färdig att använda bit av XML fördatasets.xmlMen det kommer att skapa ett bra grovt utkast som är en bra utgångspunkt för redigering av en människa.
Det skulle vara bra om personer som använder InPort för att dokumentera sina datamängder också skulle användaERDDAP™för att göra de faktiska uppgifterna tillgängliga viaERDDAPwebbtjänster och därigenom möta den amerikanska regeringen ochNOAA"S[Offentlig tillgång till forskningsresultat (Parr) krav](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)genom att göra data tillgängliga via en webbtjänst. Detta är en lösning som kan användas just nu. (erd.data at noaa.govär glad att hjälpa.)   
Se[Denna dokumentation](/docs/server-admin/datasets#eddtablefrominport). Tack vare Evan Howell och Melanie Abecassis.
         
    * VIKTIGT:ERDDAP™nu använder netcdf-java 4.6.6.
Med tidigare versioner läste netcdf-java några fyllningsvärden (Kanske bara i netcdf-4 filer) Som 0. Nu läser det några av dem som netcdf standard fyllningsvärde: -127 för byte, -32767 för shorts, -2147483647 för myror.Unidatasäger att det nya beteendet är rätt beteende. Om en variabel i en dataset börjar visa ett av dessa värden där de brukade visa 0: s, kan du lägga till, t.ex.,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
till variabelnsaddAttributesAtt berättaERDDAP™att behandla detta värde som ettmissing\\_value/_Fill Värde. Men i många fall kommer det inte att ge önskat resultat: 0. Om så är fallet, överväga att ändra filerna medNCOeller skriva om filerna. Klagomål? Vänligen kontaktaUnidata;-)
         
    * För att göra: New TopographyDepth palett
Jag uppmuntrar dig att byta alla datamängder som använder OceanDepth-paletten för att använda den nya TopographyDepth-paletten, som är som Topography förutom med färgerna vända, så att den är lämplig för djupvärden (positiv = nedåt) I stället för höjdvärden (positiv=up) . De rekommenderade inställningarna för denna palett är:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NY FEATURE: Stringmissing\\_valueoch/eller \\_FillValue
Om en String-variabel definierar enmissing\\_valueoch/eller \\_FillValue,ERDDAP™kommer nu att ta bort dessa värden från data och ersätta dem med en tom sträng, så att saknade värden visas som tomma strängar, som med andra datamängder iERDDAP. Tack vare Margaret O'Brien, LTER och EML.
         
    * NY FEATURE: Stöd för lokala tider
tidsstämpelvariabler med källdata från Strings kan nu ange en tidszon via en "time\\_zoneattribut som lederERDDAP™Omvandla lokala tidszonens källtider (Några i standardtid, några i dagsljus spara tid) in iZulugånger. Listan över giltiga tidszonnamn är förmodligen identisk med listan i TZ-kolumnen i[Denna tabell](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Standarden är "Zulu". Vanliga amerikanska tidszoner är: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern. För tidsstämpelvariabler med numeriska källdata kan du ange "time\\_zoneattribut, men värdet måste vara "Zulueller "UTC". Tack vare Margaret O'Brien, LTER och EML.
         
    * NEW FEATURE: EDDTableFromAsciiFiles stöder nu semicolon-separerade filer
Och är smartare om att räkna ut separatorn. Tack vare Margaret O'Brien, LTER och EML.
         
    * NY FEATURE: Om det finns ett betydande fel i loadDatasets (större eller mindre, t.ex. en saknad eller ogiltigdatasets.xmldokumentdokument) ,ERDDAP™kommer nu att ange det i status.html, precis nedan "n Datasets Failed To Load" som ERROR: medan bearbetningdatasets.xmlSe log.txt för detaljer.
         
    * NY FEATURE:ERDDAP™letar efter föräldralösa.
När närERDDAP™Gör en stor belastning Dataset, det letar nu efter föräldralösa dataset (Dataset som finns iERDDAP™Men inte indatasets.xml) . Om de hittas är de listade i status.html, precis nedan "n Datasets Failed To Load" som ERROR: n Orphan Datasets (Dataset iERDDAP™Men inte indatasets.xml) =....
Om du vill ta bort (Unload) en föräldralös frånERDDAP™Du måste lägga till
        &lt;datasettyp="_anyValidType_"datasetID="_theDatasetID_" aktiv="falsk"/&gt;
attdatasets.xmltills datamängden lossas under nästa stora loadDatasets.
         
    * BUG FIX: Om en dataset hade en numerisk tidsstämpelvariabel med andra enheter än"seconds since 1970-01-01T00:00:00Z"och med&lt;updateEveryNMillis&gt; system aktivt, tidsstämpelvariabelns sortiment sattes felaktigt när datamängden uppdaterades. Tack till John Kerfoot.
         
    * Bug fix: Om&lt;quickRestart&gt; var sant i setup.xml och du begärde data från en EDDTableFrån... Filer dataset som används&lt;updateEveryNMillis&gt;, den första begäran till datamängden skulle misslyckas, men efterföljande förfrågningar skulle lyckas. Nu kommer den första begäran inte att misslyckas. Tack till John Kerfoot.
         
    * BUG FIX: GenerateDatasetsXml.sh och .bat fungerade inte med &gt;9 parametrar på kommandoraden. Nu gör de. Tack till John Kerfoot.
         
    * BUG FIX: De nya EDDTableFromMultidimNcFiles tog inte konsekvent bort spårningsplatser från strängar. Nu gör det. Detta påverkade särskilt ARGO-filer. Tack vare Kevin O'Brien och Roland Schweitzer.
         
    * BUG FIX: All tillgång till fjärrkontrollDAPNu initieras tjänster av mer modern kod. Detta fastställer felet "anslutning stängd" när du använder vissa EDDTableFromErddap-dataset. Tack vare Kevin O'Brien.
         
    * BUG FIX: Hantering avorderBy...... () och distinkt () är nu tillbaka till hur de var före de senaste ändringarna: en viss begäran kan ha fleraorderBy...... () och/eller en distinkt () filter;ERDDAP™kommer att hantera dem i den ordning de anges. Tack till David Karuga.
         
    * BUG FIX: Om datasetet är EDDTableFromDatabase och en fråga har[KällaCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)och/eller[Källa CanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)då databasen kan (beroende på inställningar idatasets.xml) Delvis eller helt hantera **endast den första**  orderBy... () eller distinkt () . Tack till David Karuga.
         
    * BUG FIX: Den senaste extra procent-kodning orsakade problem med vissa frågor för.ncCF-filer, t.ex. "HTTP Status 500 - Fel: Variabel=station är listad två gånger i resultatvariabler listan. Tack vare Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFiles hade problem med att ladda om en datamängd när en av kolumnerna var en sann kolumn. Tack till Roland Schweitzer.
         
    * BUG FIX:EDDGridFrånNcFiles Uppackad nu konverterar ocksåmissing\\_valueoch \\_FillValue till standardvärden så att filer med olika värden kan aggregeras. På grund av denna förändring, när du har installerat denna nya version avERDDAP™Vänligen ange en[hård hård Flaggan](/docs/server-admin/additional-information#hard-flag)för varjeEDDGridFrånNcFiles Oförpackade dataset i dinERDDAP.
         
    * IMPROVED: EDDTableFromNcCFFiles kan nu hantera filer som har flera prov_dimension. En viss datamängd får endast använda variabler som använder ett av provet/dimensionerna. Tack till Ajay Krishnan.
         
    * För EDDTableFrån...Files,&lt;TypFilesBySourceNames&gt; Nu tillåter comma-separat (rekommenderas) eller utrymme separerade listor över variabla källnamn. I båda fallen kan enskilda variabla namn omges av dubbla citat, t.ex. om namnet har ett internt utrymme.

## version 1.72{#version-172} 
 (släppt 2016-05-12) 

*    **Nya funktioner (för användare) Från:** Ingen.
     
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * NEW EDDTableFromMultidimNcFiles[EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)är ett nytt alternativ till EDDTableFromNcFiles. Den är utformad för att hantera grupper av filer med flera variabler med delade dimensioner, t.ex. var1\\[en\\]\\[B\\]Var2\\[en\\]Var3\\[B\\]SkalarVar. Tack vare Argo Project, Aurélie Briand och Roland Schweitzer.
    * BUG FIX:ERDDAP™  (via FileVisitorDNLS och FileVistorSubdir klasser) Följer nu symboliska länkar på Linux.ERDDAP™fortfarande inte följer .lnks på Windows.
    * BUG FIX av bugg infördes i 1,70: distinkt +orderByTillåts inte tillsammans på en begäran. Nu är de igen. De är inte ömsesidigt exklusiva / överflödiga. Tack till David Karuga.
    * Skanda pådatasets.xmlsvartlista över IP-adresser:
IP v4-adresser verkarERDDAP™som 4 periodsparerade hexnummer.
Jag tror att IP v6-adresser visas som 8 kolon-separerade hexnummer.
SåERDDAP™nu stöder kolon i IP-adresserna i den listan och : * i slutet av listan för att blockera en rad adresser.
    * VIKTIGT:ERDDAP™Nu använder NetcdfFileWriter för att skriva.ncfiler istället för den deprecerade NetcdfFileWriteable. Det bör inte finnas någon märkbar förändring av de resulterande filerna. Detta öppnar upp möjligheten att göra stort.ncfiler som använder.nc3 64bit förlängningar. Om du vill/behöver det, skicka en förfrågan tillerd.data at noaa.gov.
    * Många av länkarna till avlägsna webbplatser var out-of-date. Nu är de uppdaterade och använderhttps:istället förhttpNär det är möjligt.
    * Många små förändringar.

## Version 1.70{#version-170} 
 (släppt 2016-04-15) 

*    **Nya funktioner (för användare) Från:** Ingen.
     
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** Nedan finns det flera rekommenderade ändringar av dokumentationen i din setup.xml-fil.
Gör dessa ändringar nu.
30 minuters arbete kan nu spara timmar av förvirring i framtiden.
    * Bug fix: Problemet var att förfrågningar som omdirigerades till en avlägsenERDDAPMisslyckades med en ogiltig karaktär|felmeddelande. Detta inträffade endast med nya versioner av Tomcat. Tack vare Rusty Holleman, Conor Delaney och Roy Mendelssohn.
    * Bug fix:ERDDAP™nu använder en uppdaterad version av netcdf-java (Det är en lång historia) som inkluderar aktuellt stöd för NcML, som åtgärdar problemet med NcML LogicalReduce inte fungerar som förväntat. Det kan finnas några små förändringar i metadata somERDDAP™Läser via netcdf-java från.nc,.hdf, .grib och .bufr filer. Tack till Favio Medrano.
    * Den nya[EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows)låter dig göra en sammanslagen EDDTable dataset från två eller flera EDDTable dataset som har samma datavariabler med samma enheter. Tack till Kevin O'Brien.
    * Nya alternativ för EDDTableFromDatabase ([KällaCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)och[Källa CanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) Låt dig ange omERDDAP™databasen, eller båda, hanterar distinkt ochorderBy  (och alla varianter) begränsningar. Tack till David Karuga.
    * Du kan nu göra en privat datamängds diagram och metadata tillgängliga för allmänheten via den nya&lt;graferAccessibleTo&gt;Public&lt;/graphsAccessibleTo&gt;] (/docs/server-admin/datasets#graphsaccessibleto) tag. Tack vare Emanuele Lombardi.
    * Om en sträng gick till GenerateDatasets Xml eller DasDds är omgiven av dubbla citat, det är ociterat (Som om det är en JSON-sträng) . Tack till John Kerfoot och Melanie Abecassis.
    * GenerateDatasets Xml stöder nu "standard" för att få standarden och "ingenting" för att få en tom sträng (De arbetar med eller utan citat) . Detta löser vissa problem relaterade till passerande tomma strängar.
    * Nu, i GenerateDatasets Xml, för allaEDDGridFromFiles och EDDTable FrånFiles dataset, om provet FileName du anger är "" (Den tomma strängen) , det kommer att använda den sista matchande filnamnet från katalogen + regex + recursive=true.
    * Uppdaterad: DisplayInBrowser-koden som används för att visa resultaten av GenerateDatasetsXml och DasDds på Linux-datorer var out-of-date och gav ett udda meddelande om Netscape. Nu använder detta ett modernt Linux-verktyg: xdg-open. Tack vare Melanie Abecassis.
    * ochallDatasetsDataset har nu en"files"kolumn, som indikerar basURL för länken /filer (Om det finns en) för dataset.
    * Öka din allmänna säkerhetERDDAP™genom att ändra behörigheterna i samband med tomcat-katalogen och bigParentDirectory:
         (De faktiska kommandon nedan är för Linux. För andra OS, gör analoga förändringar.) 
        * Ändra "gruppen" för att vara tomkat, ditt användarnamn eller namnet på en liten grupp som innehåller tomkat och alla administratörer av Tomcat/ERDDAPt.ex.,
chgrp -R _yourUserName_ apache-tomcat-_8.0.23_
chgrp -R _your Användarnamn bigParentDirectory_
        * Ändra behörigheter så att tomcat och gruppen har läst, skrivit, utför privilegier, t.ex.
chmod -R ug+rwx apache-tomcat-_8.0.23
chmod -R ug+rwx _bigParentDirectory_
        * Ta bort "andra" användarens behörighet att läsa, skriva eller utföra:
chmod -R o-rwx apache-tomcat-_8.0.23
chmod -R o-rwx _bigParentDirectory_
Detta är viktigt eftersom det hindrar andra användare från att läsa eventuellt känslig information.ERDDAP™konfigurera filer, loggfiler och filer med information om privata datamängder.
    * Autentiserings-/loginsystemet har uppdaterats. Tack vare Thomas Gardner, Emanuele Lombardi och den amerikanska regeringens nya[HTTPS-Only Standard](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * Autentiseringen = Openid alternativet togs bort. Det var out-of-date.
        * Den nya, rekommenderade,[Autentisering=google](/docs/server-admin/additional-information#google)option uses Google Sign-In (baserat på OAuth 2.0) tillåta alla med ett Google-e-postkonto (inklusive Google hanterade konton som@noaa.gov) att logga in.
        * Den nya,[Autentisering=email](/docs/server-admin/additional-information#email)alternativet är en backup för autentisering = Google. Det tillåter användare med en&lt;Användare&gt; tagga indatasets.xmllogga in genom att skicka ett e-postmeddelande med en speciell länk.
        * I din setup.xml, vänligen ändra beskrivningen för&lt;autentisering &gt; att vara
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * I din setup.xml, lägg till detta nedanför&lt;autentisering &gt; tagga
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Nu kan användare som inte är inloggade användahttpellerhttpsURL (om du har ställt in&lt;baseHttpsUrl&gt; i din setup.xml). Tack vare den amerikanska regeringens nya[HTTPS-Only Standard](https://https.cio.gov/).
        * Nu kan du uppmuntra alla användare att användahttps  (Inte intehttp) genom inställning&lt;BasUrl &gt; att vara enhttpsURL. Att tvinga användare att använda endasthttpsDu måste också göra ändringar i din Apache/Tomcat-inställning för att blockera icke-httpstillgång. Tack vare den amerikanska regeringens nya[HTTPS-Only Standard](https://https.cio.gov/).
            
I din setup.xml, vänligen ändra beskrivningen för&lt;baseUrl&gt; för att vara
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Optionerna&lt;LösenordEncoding &gt; ändras. I din setup.xml, vänligen ändra beskrivningen för&lt;lösenordEncoding &gt; för att vara
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * I din setup.xml, vänligen ändra beskrivningen för&lt;baseHttpsUrl&gt; för att vara
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Nu, om listPrivateDatasets=true in setup.xml, kommer ännu mindre information att visas om datamängder som en användare inte har tillgång till.
    * Nu, speciellt för när du ursprungligen ställer in dinERDDAPNu kan du berättaERDDAP™inte försöka prenumerera på fjärrkontrollERDDAP™dataset. Tack vare Filipe Rocha Freire.
I din setup.xml, precis innan&lt;FontFamily &gt;, lägg till
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * I din setup.xml, i instruktionerna ovan&lt;eFromAddress&gt;, vänligen infoga:
Om möjligt, ställa in detta för att använda en säker anslutning (SSL / TLS) till e-postservern.
Om din inställning inte använder en säker anslutning till e-postservern, gör ändringarna för att göra det så.
    * I dindatasets.xmlLägg till denna linje i beskrivningen av&lt;abonnemangEmailBlacklist &gt; i dindatasets.xmlFrån:
Du kan använda namnet "\\*svartlista en hel domän, t.ex.\\*@example.com.
    * Eftersom ändringen av loggsystemet i v1.66 är loggfilen aldrig aktuell. Det finns alltid meddelanden eller delar av meddelanden som väntar på att skrivas till loggfilen. Nu kan du göra det uppdaterat (För ett ögonblick) genom att se dinERDDAPstatus webbsida på http://_your.domain.org_/erddap/status.html .
    * HashDigest...
    * En liten förändring (till String2.canonical) Det bör hjälpa till att hålla saker och ting rör sig snabbt närERDDAP™är mycket upptagen och bättre hantera ett mycket stort antal datamängder.
    * Starkt Rekommenderas: Sluta använda&lt;konverteraToPublicSourceUrl&gt; in idatasets.xmlkonvertera ett IP-nummer i en dataset&lt;sourceUrl&gt; &gt; &gt; &gt; &gt; (t.ex., http://192.168.#.#/ ) till ett domännamn (t.ex.,httpMy.domain.org/) . Från och med nu nya prenumerationer till http://localhost , http://127.0.0.1 och http://192.168.#.# URLS kommer inte att tillåtas av säkerhetsskäl. Använd alltid det offentliga domännamnet i&lt;sourceUrl&gt; tagga (om det behövs på grund av DNS-problem) Du kan använda[/etc/hosts-tabellen på din server](https://linux.die.net/man/5/hosts)lösa problemet genom att konvertera lokala domännamn till IP-nummer utan att använda en DNS-server. Du kan testa om ett visst domännamn löses korrekt genom att använda
Ping _some.domain.name_
    * I genereraDatasets.xml, för fjärrdataset (från en THREDDS-server) Den automatiskt genereradedatasetIDs är oförändrade för de flesta domäner. För några domäner, den första delen (dvs. namnet) av den automatiskt genereradedatasetIDkommer att vara lite annorlunda. I synnerhet är namn som hade en del nu mer benägna att ha två delar. Till exempel datamängder från http://oos.soest.hawaii.edu tidigare lett tilldatasetIDs som började med hawaii, men nu leder tilldatasetIDs som börjar med hawaii\\_soest\\_. Om detta orsakar problem för dig, vänligen maila mig. Det kan finnas en work-around.
    * Cassandra-föraren uppdaterades till cassandra-driver-core-3.0.0.jar och därmed för Cassandra v3. EDDTableFromCassandra utnyttjar inte några nya funktioner i Cassandra v3. Index i Cassandra kan nu vara mer komplexa, menERDDAP™fortfarande använder Cassandra v2 index modell, som förutsätter att en indexerad kolumn kan vara direkt queried med'='begränsningar. GenerateDatasets Xml för EDDTableFromCassandra upptäcker inte längre kolumner med index; om ett index är enkelt måste du ange det idatasets.xmlför hand. Om du behöver stöd för mer komplexa index eller andra nya funktioner, vänligen e-posterd.data at noaa.gov.
&#33;&#33;&#33; Om du fortfarande använder Cassandra 2.x, fortsätt att användaERDDAP™v1.68 tills du uppgraderar till Cassandra 3.x.
    * Jars och Classpath - Nästan alla inkluderade tredjeparts .jar-filer uppdaterades till sina senaste versioner.
        * Sf4j.jar lades till /lib och klasspaten.
        * joid. Jar och tsik. Jar togs bort från /lib och klasspaten.
        * Om du får felmeddelanden om klasser som inte finns när du sammanställer eller körERDDAP™eller ett av dess verktyg, jämför din kommandorads klasspath tillERDDAP"S[nuvarande klasspath](/docs/contributing/programmer-guide#development-environment)för att räkna ut vilka .jars som saknas från din klasspat.

## Version 1.68{#version-168} 
 (släppt 2016-02-08) 

*    **Nya funktioner (för användare) Från:** Ingen.
     
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    *   [EDDGridFrånFiles Aggregation via Filnamn eller Global Metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)-----
Alla variationer avEDDGridFromFiles kan nu samla en grupp filer genom att lägga till en ny vänstermest dimension, vanligtvis tid, baserat på ett värde som härrör från varje filnamn eller från värdet av en global attribut som finns i varje fil.
    * Vi föreslog tidigare att du kanske vill skapa enEDDGridFromErddap dataset i dindatasets.xmlDet refererade och återbetalade jplMURSST dataset i vårERDDAP. Eftersom det nu finns en nyare version av datamängden, är datamängden nu avskriven. Så om du har den datamängden i dinERDDAP™Vänligen lägg till denna nya dataset
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Om du vill ta bort den gamla jplMURSST dataset från dinERDDAP™  (Det är ditt val) Ändra dess aktiva inställning från "sann" till "falsk".
    * Bug fix: Kontrollera bigParentDirectory som du angav i din setup.xml. Om du inte satte en slash i slutet av&lt;bigParentDirectory &gt; namn, dåERDDAP™kommer att ha skapat flera kataloger genom att godkänna ord direkt till det namn som du angav, istället för att skapa underkataloger. Börjar med version 1.68,ERDDAP™lägger till en streck i slutet av katalogen namn om du inte ange en. Så om du tidigare inte ange en slash i slutet, då när du installerarERDDAP™v1.68 Du måste flytta och byta namn till dessa kataloger **Efter** Du stänger av det gamlaERDDAP™och **före** Du startar det nyaERDDAP. Om du till exempel felaktigt specificerade bigParentDirectory som /home/erddapBPD (Inga trailing slash) ochERDDAP™Har felaktigt skapat kataloger som
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDlucene
och en fil som heter /home/erddapBPDsubscriptionsV1.txt,
Då måste du flytta och byta namn på dem för att vara
/home/erddapBPD/cache
/home/erddapBPD/copy
/home/erddapBPD/dataset
/home/erddapBPD/flagga
/home/erddapBPD/loggar
/home/erddapBPD/lucene
och /home/erddapBPD/subscriptionsV1.txt
    * Bug fix: Det fanns buggar iEDDGridLonPM180 iERDDAP™v1.66 som inträffade när barnets datamängd är enEDDGridFrånErddap.
    * Bug fix: Det fanns en bugg iEDDGridFromFiles och EDDTable FrånFiles inERDDAP™v1.66 som orsakade&lt;updateEveryNMillis&gt; för att ignoreras första gången datamängden laddades efter en omstart.
    * Bug fix / ny funktion: Om ett barn dataset inomEDDGridAggregateExistingDimension,EDDGridKopiera,EDDGridFrånEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy eller EDDTableFromEDDGridär en ...Från Erddap dataset, som förälder dataset nu prenumererar på underliggandeERDDAP™dataset. Om den underliggandeERDDAP™Dataset är i sammaERDDAP™Prenumerationen och dess validering görs direkt; du får inte ett e-postmeddelande som ber dig att validera prenumerationen. Annars, om abonnemangssystemet för dittERDDAP™är avstängd, ställ in&lt;reloadEveryNMinutes&gt; inställning för föräldradataset till ett mindre antal (60?) Så att den stannar uppdaterad.
    * Bug fix / ny funktion: Om ett barn dataset inomEDDGridAggregateExistingDimension,EDDGridKopiera,EDDGridFrånEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy eller EDDTableFromEDDGridhar aktivt = "falskt", att barndatauppsättningen nu är hoppad.

## Version 1.66{#version-166} 
 (släppt 2016-01-19) 

*    **Nya funktioner (för användare) Från:** 
    * Grafer (Inte kartor) kan nu ha nedstigande värden på axlarna. För att få detta när du använder en Make A Graph-webbsida, ändra ny Y Axis: uppstigande inställning (Default) Att falla. Eller, i en URL som begär en graf, använd den nya valfria 3rd|parameter för[och.x Range och/eller &. yRange switchar](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)som inte kan vara något (Default) , sant eller t för att få uppstigande värden, eller använda falska eller f för att få nedstigande värden. Den sanna|falska värden är fall okänsliga. Tack vare Chris Fullilove, John Kerfoot, Luke Campbell och Cara Wilson.
    * Användare kan nu ange bakgrundsfärgen för grafer genom att lägga till en &.bgColor=0x_ AARRGBB_ byter till webbadressen som begär diagrammet. Se .bgColor i avsnittet Graphics Commands i avsnittet[griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)och[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)dokumentation. Tack till John Kerfoot och Luke Campbell.
    * För tabelldataset kan begränsningar nu hänvisa till min (_someVariableName_) eller max (_someVariableName_) . Se[Min min min min min () och max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Tack till John Kerfoot.
    * För tabelldataset, tidsbegränsningar som använder[Nu nu nu](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)kan nu ange tidsenheter av millisekunder eller millis.
    * En begäran om en bild av en tabell dataset gör nu en karta (Inte ett diagram) om x- och y-variablerna är longitud-liknande och latitudliknande variabler (Kompatibla enheter) . Tack vare Rich Signell.
    * Bug fix: Tidsaxel etiketter och fästingar hade ibland udda oegentligheter när du begär flera grafer samtidigt (t ex på en webbsida) . Problemet var en bugg i SGT grafikbiblioteket somERDDAP™Användning (En variabel var "statisk" som inte borde ha varit) . Tack till Bradford Butman.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Det är en säkerhetsrisk att sätta ditt e-postlösenord i en vanlig textfil som setup.xml. För att mildra problemet rekommenderar vi starkt att du:
        1. Ställ in ett e-postkonto bara förERDDAPAnvändning, t.ex. erddap@yourInstitution.org. Det har också andra fördelar, särskilt mer än enERDDAP™administratören kan sedan ges tillgång till det e-postkontot.
        2. Gör behörigheterna för setup.xml-filen rw (Läs + Skriv) för användaren som kör Tomcat ochERDDAP™  (användar=tomcat?) och inga behörigheter (inte läsa eller skriva) för gruppen och andra användare. Tack vare Filipe Rocha Freire.
    * Den nya[ArchiveADataset](/docs/server-admin/additional-information#archiveadataset)verktyg förenklar att göra en.tar.gzarkiv med en delmängd av en datamängd i ett format som är lämpligt för arkivering (i synnerhet vidNOAANCEI) . Detta bör vara användbart för mångaERDDAP™administratörer i många situationer, men särskilt för grupper inomNOAA.
    * Den nya datasettypen[EDDGridFrånNcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked)är en variant avEDDGridFrånNcFiles. Skillnaden är att denna klass packar upp varje datafil innanEDDGridFromFiles tittar på filerna:
        
        * Det packar upp packade variabler som använderscale\\_factoroch/elleradd\\_offset.
        * Det främjar heltalsvariabler som har \\_Unsigned=true attribut till en större integer datatyp så att värdena visas som osignerade värden. Till exempel, en \\_Unsigned=true byte (8 bit) Variabel blir en signerad kort (16 bit) Variabel.
        * Den konverterar \\_FillValue ochmissing\\_valueVärdena att vara NaNs (eller MAX\\_VALUE för datatyper) .
        
Den stora fördelen med denna klass är att den ger ett sätt att hantera olika värden avscale\\_factor,add\\_offset\\_FillValue, ellermissing\\_valuei olika filer i en samling. Annars skulle du behöva använda ett verktyg som[NcML](/docs/server-admin/datasets#ncml-files)eller[NCO](/docs/server-admin/datasets#netcdf-operators-nco)ändra varje fil för att ta bort skillnaderna så att filerna kan hanteras avEDDGridFrånNcFiles. För att denna klass ska fungera korrekt måste filerna följa CF-standarderna för de relaterade attributen. Tack vare Philippe Makowski.
    * Den nya datasettypen[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)låter dig ändra datamängder som har några longitudvärden större än 180 (t.ex. intervallet 0 till 360) i datamängder med longitudvärden inom intervallet -180 till 180 (Longitude Plus eller Minus 180, alltså namnet) . Den stora fördelen att erbjuda datamängder med longitudvärden i intervallet -180 till 180 är attOGCtjänster (t.ex.,WMS) kräver longitud värden i detta intervall. Tack vare Lynne Tablewski, Fabien Guichard, Philippe Makowski och Martin Spel.
2016-01-26 Uppdatering: Eeek&#33; Detta har en bugg som uppstår när barnets datamängd är enEDDGridFromErddap som refererar till en dataset i sammaERDDAP. Denna bugg är fast iERDDAP™v1.68.
    * Inom[GenerateDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml)En ny speciell datasettyp,EDDGridLonPM180FromErddapCatalog låter dig genereradatasets.xmlFörEDDGridLonPM180 datamängder från allaEDDGridDataset i enERDDAPsom har någon longitud värden större än 180.
    * För allaEDDGriddataset, idatasets.xmlDu kan nu använda den valfria
[Och [Gud]&lt;tillgänglig tillgänglig ViaWMS&gt;True|falska lögner&lt;Tillgänglig ViaWMS&gt;] (/docs/server-admin/datasets#accessibleviawms)   (Default=True) . Att ställa detta till falskt tvång inaktiverarWMSservice för denna dataset. Om det är sant kan datamängden fortfarande inte vara tillgänglig viaWMSAv andra skäl (t.ex. inga lat- eller lonaxlar) . Detta är särskilt användbart för datamängder som finns på egen hand och inslagna avEDDGridLonPM180, så att endast LonPM180-versionen är tillgänglig viaWMS.
    * I setup.xml kan du ange en annan standardfärg för bakgrunden av grafer. Färgen anges som ett 8-siffrigt hexadecimalvärde i formen 0x_AARRGGBB_, där AA, RR, GG och BB är opacitet, röda, gröna och blå komponenter, respektive, specificerade som 2-siffriga hexadecimaltal. Observera att duken alltid är ogenomskinlig vit, så en (Semi -) transparent graf bakgrund färg blandar in i den vita duken. Standarden är ljusblå:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Tack till John Kerfoot och Luke Campbell.
    * I setup.xml kan du nu ange maximal storlek för[Log Fil](/docs/server-admin/additional-information#log)  (När det byts namn till logga. txt. tidigare och en ny logg. txt skapas) I MegaBytes. Det lägsta tillåtna är 1. Det högsta tillåtna är 2000. Standarden är 20 (MB) . Till exempel:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Inomdatasets.xmloch [så]&lt;fgdcFile &gt;] (/docs/server-admin/datasets#fgdcfile) och [eller]&lt;iso19115File &gt;] (/docs/server-admin/datasets#iso19115file) Kan nu vara en lokal fil (som förut) Eller en URL (som kommer att laddas ner så det finns en lokal kopia) . OmERDDAP™kan inte ladda ner filen, laddningen av datamängden kommer att fortsätta men datamängden kommer inte att ha en fgdc eller iso19115-fil.
    *   EDDGridFromFiles och EDDTable FrånFiles dataset kan nu göra en snabbstart (det system somERDDAP™försöker använda när dataset laddas först närERDDAP™Återstartas) . Detta hastigheter upp omstartERDDAP.
2016-01-26 Uppdatering: Eeek&#33; Detta har en bugg som orsakar&lt;updateEveryNMillis&gt; för att ignoreras första gången datamängden laddas efter en omstart. Denna bugg är fast iERDDAP™v1.68.
    * En allmän förbättring av snabbstart-systemet möjliggörERDDAP™ladda datamängder snabbare närERDDAP™omstartas.
    * Allt alltEDDGridFromFiles och EDDTable FrånFiles underklasser accepterar nu en ny&lt;pathRegex&gt; tag, vanligen anges nedan&lt;Återkommande &gt;. Om återkommande är "sanna", endast fullständiga underkatalogvägar som matchar vägenRegex (Default="*") kommer att accepteras. På samma sätt, en&lt;sourceUrls&gt; tagga i enEDDGridAggregateExistingDimension kan nu inkludera en PathRegex-attribut (Default="*") .
    * Standarden för&lt;partialRequestMaxBytes&gt; i setup.xml är nu 490000000000 (~490 MB) . Detta undviker vissa problem / timeouts relaterade till att få data från THREDDS dataservrar. Tack till Leslie Thorne.
    * En liten förändring av logsystemet bör tillåtaERDDAP™att vara mer lyhörd när det är mycket, mycket upptagen. Information skrivs nu till loggfilen på diskenheten i ganska stora bitar. Fördelen är att detta är mycket effektivt -ERDDAP™kommer aldrig att blockera väntar på att information ska skrivas till loggfilen. Nackdelen är att loggen nästan alltid slutar med ett partiellt meddelande, som inte slutförs förrän nästa bit skrivs.
    * Bug fix relaterad till inotify och [&lt;updateEveryNMillis &gt;] (/docs/server-admin/datasets#updateeverynmillis) System förEDDGridFromFiles och EDDTable FrånFiles dataset: Det är inte längre nödvändigt att ange en stor del av fs.inotify.max\\_user\\_watches eller fs.inotify.max\\_user\\_instances. Det finns en bugg iJavasom orsakar vissa delar avJava"S inotify/WatchDirectory system som inte ska samlas in när de slutförs; så småningom skulle antalet zombie inotify klockor eller instanser överstiga det maximala antalet specificerade.ERDDAP™Nu arbetar vi runt dettaJavabug.
Dessutom är antalet inotify trådar listade på status.html webbsidan, så att du kan hålla ett öga på dess användning. Vanligtvis finns det 1 inotify tråd perEDDGridFromFiles och EDDTable FrånFiles dataset.
    * Bug fix: på många ställen, i stället för att ett fel skulle störtas, genererades ett nytt fel som endast inkluderade en kort version av det ursprungliga felmeddelandet och utan stack spår. Nu, när ett nytt fel genereras, innehåller det ordentligt hela det ursprungliga undantaget t.ex., kasta ny Undantag ("Några nya budskap", e) ;
Tack till Susan Perkins.
    * Bug fix: tills nyligen (v1.64?) Om en .../datasetIDURL begärdes,ERDDAP™skulle lägga till .html till webbadressen. I v1.64 misslyckades detta (en felaktigt formaterad URL genererades och misslyckades sedan) . Nu funkar det igen. Tack vare Chris Fullilove.

## Version 1.64{#version-164} 
 (släppt 2015-08-19) 

*    **Nya funktioner (för användare) Från:** 
    * Det finns nu vägledning för att komma åt den lösenordsskyddade privataERDDAP™Dataset (https://) via via viacurlochPython. Se[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)och[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)instruktioner.
Tack vare Emilio Mayorga av NANOOS och Paul Janecek av Spyglass Technologies.
         
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    *   ERDDAP™nu kräverJava1.8+.
        Java1,7 nådde sin[slutet av livet](https://www.oracle.com/technetwork/java/eol-135779.html)  (Inga fler säkerhetsuppdateringar) i april 2015. Denna version avERDDAP™fungerar inte med versioner avJavaunder 1.8. Om du uppdaterar frånJava1.7x (eller tidigare) Du bör också uppdatera Tomcat. Se[ERDDAP™Ställ in instruktioner](/docs/server-admin/deploy-install)för nedladdning av länkar och råd.
    * Ny dataleverantörsformulär.
När en dataleverantör kommer till dig hoppas du lägga till lite data till dinERDDAP™Det kan vara svårt och tidskrävande att samla in alla metadata som behövs för att lägga till datamängden iERDDAP. Många datakällor (till exempel .csv-filer, Excel-filer, databaser) har inga interna metadata, såERDDAP™har ett nytt dataleverantörsformulär som samlar metadata från dataleverantören och ger dataleverantören någon annan vägledning, inklusive omfattande vägledning för dataindatabaser. Den inlämnade informationen omvandlas tilldatasets.xmlformat och sedan skickas tillERDDAP™Administratör (Du du) och skriftlig (Appenderad) till bigParentDirectory/logs/dataProviderForm.log. Således formuläret halvautomatiserar processen att få en dataset in iERDDAP™Men denERDDAP™Administratören måste fortfarande slutföradatasets.xmlchunk och hantera att få datafilen (s) från leverantören eller anslutning till databasen. För mer information, se[Dataleverantör Formbeskrivning](/docs/server-admin/datasets#data-provider-form).
    * Nytt nytt&lt;matchAxisNDigits &gt;
kan användas avEDDGridFrånFiles (och därmed frånNcFiles och frånMergeIRFiles) ,EDDGridAggregateExistingDimension,EDDGridKopiera ochEDDGridSideBySide dataset för att ange hur exakt lika axelvärdena i olika filer måste vara (Hur många siffror) 0=ingen kontroll (Använd inte detta&#33;) 1-18 för ökad precision eller 20 (Default) för exakt jämlikhet. För n=1-18,ERDDAP™säkerställer att de första siffrorna för dubbla värden (eller (n+1) Div 2 för flytvärden) är lika.
        &lt;matchAxisNDigits &gt; ersätter&lt;säkerställaAxisValuesAreEqual&gt;, som nu avskrivs. Ett värde av "sanna" kommer att konverteras till matchAxisNDigits = 20. Ett värde av "falsk" (Gör inte detta&#33;) konverteras till match AxisNDigits=0.
    *   EDDGridFromFiles och EDDTable FromFiles laddar mycket långsamt första gången du använder den här versionen avERDDAP.
        ERDDAP™lagrar nu den interna filinformationen lite annorlunda, så den interna filtabellen för var och en av dessa datamängder måste byggas om. Så oroa dig inte. Ingenting är fel. Det är en en gång sak.
    * Fjärrkälla filer
        EDDGridFrånNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles nu låta filerna vara fjärrfiler i en katalog tillgänglig viahttp://  (och förmodligenhttps://och ftp://, men de är otestade) om fjärrservern stöder[Range förfrågningar](https://en.wikipedia.org/wiki/Byte_serving)i begäran header. THREDDS och Amazon S3 stödjer Range RequestsHyraxInte. Detta system låter dig komma åt data i fjärrfiler utan att ladda ner filerna (som är till hjälp om fjärrfilerna är för voluminösa) , men tillgång till dessa filer kommer att vara mycket långsammare än tillgång till lokala filer eller till och med till en fjärrkontroll.OPeNDAPKälla.
Detta inkluderar"files"i en Amazon S3 hink eftersom de är tillgängliga viahttp://. Om S3-objektnamnen är som filnamn (Intern / som ett Linux katalogträd) ,ERDDAP™kan också göra filerna tillgängliga viaERDDAP"S"files"system. För att detta ska fungera måste dina S3-uppgifter vara i - /.aws / referenser (på Linux, OS X eller Unix) C:\\Users\\USERNAME\\.aws\\credentials (på Windows) på servern medERDDAP. Se[Amazon SDK dokumentation](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * GenerateDatasets Xml har ett nytt, ovanligt alternativ: EDDsFromFiles.
Detta kommer att gå igenom ett filsystem (även ett fjärrsystem som en Amazon S3 om objekten har filliknande namn) och skapadatasets.xmlbitar för en serie dataset. Din körsträcka kan variera. Detta fungerar bra om filerna är organiserade så att alla datafiler i en viss katalog (och dess underkataloger) är lämpliga för en dataset (Alla SST 1-dagars kompositer) . Annars (t.ex. om en katalog innehåller vissa SST-filer och vissa klorofyll-a-filer) Detta fungerar dåligt men kan fortfarande vara användbart.
    * Programmerare: nya /lib .jar-filer.
Om du kompilerarERDDAP™Observera de nya .jar-filerna i klasspaten -cp-parametern som anges iERDDAP™ [Programmers guide](/docs/contributing/programmer-guide).
    * Sea\\_water\\_practical\\_salinity
Om du använder CF-standardnamnet Sea\\_water\\_salinity för någon variabel, uppmuntrar jag dig att byta till havs\\_vatten\\_practical\\_salinity som finns tillgänglig i[version 29 av CF Standard Name Table](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (Några tidigare versioner - jag visste inte det) . Detta namn indikerar att detta verkligen är ett praktiskt salthalt värde med hjälp avPractical Salinity Units  (PSU) I motsats till ett äldre g/kg-värde. Kanoniska enheter är olika, men fortfarande otroligt ohjälpliga: 1 1 (antagligen implicerarPSU/PSS-78) I motsats till 1e-3 (Antagligen implicerar g/kg) för havsvatten\\_salinitet.\\[Hej,Unidataoch CF: Vi identifierar värden som använder andra skalor, till exempel Fahrenheit eller Celsius, via en enhetssträng som är namnet på skalan eller någon variation. Varför kan vi inte identifiera salthaltenheter via deras skala, t.ex. PSS-78? PSS-78 värden är "enhetlösa", men det finns en underförstådd skala, finns det inte? Om jag uppfinner en ny praktisk salthaltskala där värdena är 0,875 gånger PSS-78-värden, ska de kanoniska enheterna fortfarande vara "1"? Hur kunde en användare berätta för dem ifrån varandra? Enheter på 1e-3 och 1 är varken beskrivande eller användbara för användare som försöker räkna ut vad siffrorna anger.\\]

## Version 1.62{#version-162} 
 (släppt 2015-06-08) 

*    **Nya funktioner (för användare) Från:** 
    * FörEDDGriddatamängder, användare kan nu göra Graph Type: Surface grafer med någon kombination av numeriska axlar, inte bara longitud kontra latitud. Detta låter dig göra x versus y (Projekterad) grafer och olika[Hovmöller diagram](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram)Till exempel planera longitud kontra djup eller tid kontra djup.\\[Obs&#33;: Om djupet är på Y-axeln kommer det förmodligen att vändas från vad du vill. Förlåt, un-flipping det är ännu inte ett alternativ.\\]Tack vare Cara Wilson och Lynn DeWitt.
    * Det finns en ny[Oceanic/Atmosfärisk Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)som låter dig konvertera en vanlig oceanisk / atmosfärisk akronym till / från ett fullständigt namn.
    * Det finns en ny[Oceanic/Atmosfärisk Variable Names Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)som låter dig konvertera ett vanligt oceaniskt/atmosfäriskt variabelnamn till/från ett fullständigt namn.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    *   Java7/8
        OracleInte längre stöd (ger säkerhetsbuggfixar för)  Java7.ERDDAP™Stöd fortfarandeJava7, men vänligen flytta tillJava8. nästa utgåva avERDDAP™Kommer förmodligen att krävaJava8.
    *   valid\\_min/max/range
Tidigare och nu, om endataVariablehade haftscale\\_factorochadd\\_offsetmetadata,ERDDAP™packar upp datavärdena och tar bort den metadatan. Tidigare,ERDDAP™Inte ändra/unpacka någonvalid\\_range,valid\\_min,valid\\_maxmetadata (som vanligtvis/bör innehålla förpackade värden) avscale\\_factorochadd\\_offset. Nu gör det. Vänligen sök dinERDDAP™för "valid\\_" och se till att alla variabler som harvalid\\_range,valid\\_minellervalid\\_maxha rätt värden när datamängden visas i den nya versionen avERDDAP. Se[valid\\_range/min/max dokumentation](/docs/server-admin/datasets#valid_range).
    * ACDD-1.3
Tidigare,ERDDAP™  (I synnerhet GenerateDatasets Xml) används/rekommenderas originalet (1.0) version av[NetCDFAttributkonvention för Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)som kallades "UnidataDataset Discovery v1.0 i de globala konventionerna ochMetadata\\_Conventionsattribut. Nu rekommenderar vi[ACDD version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)som ratificerades i början av 2015 och kallas "ACDD-1.3". Lyckligtvis är ACDD-1.3 mycket bakåtkompatibel med version 1.0. Vi rekommenderar att du[byta till ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). Det är inte svårt.
    * GenerateDatasets Xml attribut
Det fanns ett stort antal förändringar för att förbättra&lt;addAttributes&gt; värden som föreslås av GenerateDatasets Xml för de globala konventionerna,creator\\_name/email/url, nyckelord, sammanfattning och titelattribut och för variabelnlong\\_nameattribut. Vissa förändringar är relaterade till den nya användningen av ACDD-1.3.
    * EDDTableFrånSOSDataset
Med enstaka tillägg av nya typer avSOSservrar och ändringar i de gamla servrarna blir det svårare förERDDAP™för att automatiskt upptäcka servertypen från serverns svar. Användningen av [&lt;ServerType &gt;] (/docs/server-admin/datasets#eddtablefromsos-skeleton-xml)   (med ett värde av IOOS_NDBC, IOOS_NOS,OOSTethyseller WHOI) är nu starkt återkallad. Om någon av dina datamängder av denna typ har problem i den nya versionen avERDDAPFörsök omgående GenerateDatasets Xml förSOSserver för att generera en ny bit avdatasets.xmlför denna dataset. GenerateDatasets Xml låter dig prova de olika&lt;ServerType&gt; alternativ tills du hittar rätt för en viss server. Om du fortfarande har problem, låt mig veta problemet du ser och webbadressen på servern och jag kommer att försöka hjälpa till.
    * EDDTableFromFileNames dataset
Vissa attribut som rekommenderadesaddAttributesär nu sourceAttributes. Du behöver förmodligen inte ändra något för befintliga datamängder i dindatasets.xml.
    * Buggfix relaterad till vissa förfrågningar till EDDTableFromNcCFFiles dataset.
Jag har också lagt till ett stort antal enhetstester till det befintliga stora antalet enhetstester av de underliggande metoderna. (Det finns 100 scenarier) . Tack till Eli Hunter.
    * Bug fix/små förändringarEDDGridFrånMergeIR.
Tack till Jonathan Lafite och Philippe Makowski
    * Bug fix:EDDGridFromErddap fungerar nu även om en fjärrdata inte harioos\\_categoryVariabla attribut.
Tack vare Kevin O'Brien.
    * Bug fix i .graph webbsida förEDDGriddatamängder när det bara finns en axelvariabel med mer än ett värde.
Tack vare Charles Carleton.
    * Det fanns andra små förbättringar, förändringar och buggfixar.

## Version 1.60{#version-160} 
 (släppt 2015-03-12) 

*    **Nya funktioner (för användare) Från:** Ingen
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * STRONGLY RECOMMENDED: Uppdatera serverns[robots.txt](/docs/server-admin/additional-information#robotstxt)fil för att inkludera:
Disallow: /erddap/files/
    * INotify Problem and Solution:
På Linux-datorer, om du använder&lt;updateEveryNMillis &gt; med dataset med typ=EDDGridFrånFiles, EDDTableFromFiles,EDDGridKopiera, EDDTableCopy eller deras underklasser kan du se ett problem där en dataset inte laddas (ibland eller konsekvent) Med felmeddelandet: "IOException: Användargränsen för inotify-instanser som nåtts eller för många öppna filer". Om så är fallet kan du lösa detta problem genom att ringa (Som root) Från:
echo fs.inotify.max\\_user\\_watches=65536|Tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instances=1024|Tee -a /etc/sysctl.conf
Sysctl -p
Eller använd högre siffror om problemet kvarstår. Standarden för klockor är 8192. Standarden till exempel är 128.\\[UPPDATERING: Det finns en bugg iJavasom orsakar inotify fall att inte vara sopor samlas in. Detta problem undviks iERDDAP™v1.66 och högre. Den bättre lösningen är att byta till den senaste versionen avERDDAP.\\]
    * NoSuchFileException Bug Fix:
Det fanns en bugg som kunde orsaka datamängder av typ =EDDGridFrånFiles, EDDTableFromFiles,EDDGridKopiera, EDDTableCopy eller deras underklasser för att inte ladda ibland med felet "NoSuchFileException: _someFileName_". Buggen är relaterad till användning av FileVisitor och introducerades iERDDAP™v1.56. Problemet är sällsynt och kommer sannolikt att påverka datamängder med ett stort antal ofta ändrade datafiler.
    * Det fanns några små förbättringar, förändringar och buggfixar.

## Version 1.58{#version-158} 
 (släppt 2015-02-25) 

*    **Nya funktioner (för användare) Från:** 
    * Den nya["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)system låter dig bläddra i ett virtuellt filsystem och ladda ner källdatafiler från mångaERDDAP™dataset. och"files"systemet är aktivt som standard, menERDDAP™administratörer kan inaktivera det genom att sätta
```
        <filesActive>false</filesActive>  
```
i denERDDAP™setup.xml fil. Särskilt tack till Philippe Makowski, som fortsatte när jag var långsam för att uppskatta skönheten i denna idé.
    * Tid destination Max - Tidigare hade tidsvariabeln för EDDTable datamängder med nära realtidsdata en destinationMax av NaN, vilket innebar att det maximala tidsvärdet för datamängden är nyligen, men inte exakt känd och ändras ofta. Nu har destinationMax ett verkligt värde, vilket indikerar den för närvarande kända förra gången. Många datamängder har kontinuerligt uppdaterat data.ERDDAP™stöder åtkomst till de senaste uppgifterna, även om det är efter den aktuella senaste tiden. Observera att det nya [&lt;updateEveryNMillis &gt;] (/docs/server-admin/datasets#updateeverynmillis) Stöd iEDDGridFromFiles och EDDTable FrånFiles dataset uppdaterar tidsvariabelns destinationMax. En annan konsekvens av denna förändring är attdatasetID= =allDatasetsdataset innehåller nu den nuvarande kända sista gången i maxTime-kolumnerna. Tack till John Kerfoot.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * STRONGLY RECOMMENDED: Uppdatera serverns[robots.txt](/docs/server-admin/additional-information#robotstxt)fil för att inkludera:
Disallow: /filer/
Disallow: /erddap/files/
    * Sampledatasets.xml----- Förra året rekommenderade vi flera utmärkta datamängder i kusten.ERDDAP™att du kan lägga till dinERDDAP™bara genom att lägga till några rader till dinadatasets.xml. Om du lade till erdVH dataset, vänligen byt till de nyare erdVH2 dataset:
        * Gör en kopia av alla erdVH-dataset och ändra kopieradedatasetIDFrån erdVH... till erdVH2... och ändra den refereradesourceUrlfrån erdVH... till erdVH2.
        * Ställ in erdVH... dataset till aktiv = "falsk".
    * Allt alltEDDGridFromFiles och EDDTable FrånFiles underklasser stöder nu [&lt;tillgängligaViaFiles&gt;] (/docs/server-admin/datasets#accessibleviafiles) för att göra källdatafilerna tillgängliga via"files"system. Som standard är detta system avstängd för varje dataset. Du måste lägga till taggen för att aktivera den. Tack vare Philippe Makowski.
    * Allt alltEDDGridFromFiles och EDDTable FrånFiles underklasser stöder nu [&lt;updateEveryNMillis &gt;] (/docs/server-admin/datasets#updateeverynmillis) . Som standard är detta system avstängd för varje dataset. Du måste lägga till taggen för att aktivera den. Tack vare Dominic Fuller-Rowell och NGDC.
    * Den nya[EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames)skapar en dataset från information om en grupp filer i serverns filsystem, men det tjänar inte data inifrån filerna. Till exempel är detta användbart för att distribuera samlingar av bildfiler, ljudfiler, videofiler, ordbehandlingsfiler och kalkylbladsfiler. Detta fungerar hand i hand med den nya["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)system, så att användare kan ladda ner filerna. Särskilt tack till Philippe Makowski, som fortsatte när jag var långsam för att uppskatta skönheten i denna idé.
    * Den nya[EDDGridFrånEDDTable](/docs/server-admin/datasets#eddgridfromeddtable)låter dig konvertera en tabular dataset till en gridded dataset. Tack vare Ocean Networks Canada.
    * Den nya[EDDGridFrånMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)aggregerar data från en grupp lokala MergeIR.gzfiler.EDDGridFromMergeIRFiles har distinktionen att vara den första biten av koden som bidragit tillERDDAP. Det gjordes helt utan vår hjälp. Tre jubel och speciellt tack vare Jonathan Lafite och Philippe Makowski från R.Tech Engineering.
    * Det finns en ny, valfri setup.xml tag,&lt;unitTestDataDir&gt;, som anger katalogen med enhetstestdatafiler som är tillgängliga via ett nytt GitHub-förvar:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Till exempel:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Detta är inte användbart ännu, men är en del av flytten mot att göra så många av enhetstesten som körs av andra människor som möjligt. Tack till Terry Rankine.
    * Det fanns många små förbättringar, förändringar och buggfixar.

## Version 1.56{#version-156} 
 (släppt 2014-12-16) 

*    **Nya funktioner (för användare) Från:**   (Ingen) 
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Du vet förmodligen redan om[EDDGridFrånErddap](/docs/server-admin/datasets#eddfromerddap)och[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)som låter dig länka till dataset i andraERDDAPoch få dem att visas i dinERDDAP. Användarförfrågningar om faktiska data från dessa datamängder dirigeras osynligt till källanERDDAP™Så data flödar inte genom ditt system eller använder din bandbredd. Det finns nu en stor lista över rekommenderade dataset i provetdatasets.xmli erddapContent.zip. Att inkludera dem i dinERDDAP™Allt du behöver göra är att kopiera och klistra in de du vill ha i dindatasets.xml. Tack vare Conor Delaney.
    * Om du kompilerarERDDAP™Du måste lägga till lite nytt. Jar filer till din[klasspath -cp switch](/docs/contributing/programmer-guide#development-environment)för javac och java.
    * Den nya[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra)hanterar att få data från[Cassandra](https://cassandra.apache.org/). Tack vare Ocean Networks Canada.
    * Den nya[EDDTableFromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)hanterar att få data från ASCII-datafiler med kolumner med fast bredd. Tack vare Philippe Makowski.
    * Allt alltEDDGridFromFiles och EDDTable FrånFiles underklasser använder nu en ny metod, FileVisitor (tillsatt tillJavai 1.7) att samla in information om filerna. Detta kan inte ha någon fördel för den första insamlingen av filinformation för en viss datamängd men verkar ha en stor fördel för efterföljande insamlingar om det görs snart, medan operativsystemet fortfarande har informationen cachad. Tack till NGDC.
        
Vi rekommenderar fortfarande: Om en dataset har ett stort antal filer (t.ex. &gt;1 000) operativsystemet (och därmedEDDGridFrånFiles och EDDTableFromFiles) kommer att fungera mycket mer effektivt om du lagrar filerna i en serie underkataloger (en per år, eller en per månad för datamängder med mycket frekventa filer) så att det aldrig finns ett stort antal filer i en viss katalog.
        
    * Flera små förbättringar av EDDTableFromAsciiFiles.
    * Vissa förbättringar av EDDTableFromAsciiServiceNOS, särskilt för att få några ytterligare kolumner av information från källan. Tack till Lynn DeWitt.
    * Vissa små buggfixar relaterade till ISO 19115 somERDDAP™genererar. Tack till Anna Milan.

## Version 1.54{#version-154} 
 (släppt 2014-10-24) 

*    **Nya funktioner (för användare) Från:** 
    * Vissa variabler arbetar nu med tiden på millisekunders precision, t.ex. 2014-10-24T16:41:22.485Z. Tack vare Dominic Fuller-Rowell.
*    **Små förändringar/buggfixar:** 
    * Bug fix: med en viss kombination av omständigheter,EDDGridFrånNcFile-dataset returnerade data vid minskad precision (t.ex. flyter istället för dubblar) . Detta kan endast påverka datavärdena med &gt; 8 signifikanta siffror. Min ursäkt. (Och det var en klassisk datorprogrammering bugg: en fel karaktär.) Tack vare Dominic Fuller-Rowell.
    * Många små förändringar.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Griddap-dataset stöder nu tidsstämpelaxelvariabler och datavariabler (dvs variabler med tidsvärden, men endestinationNameannat än"time") . Tack vare Dominic Fuller-Rowell.
    *   ERDDAP™stöder nu korrekt millisekundertime\\_precision1970-01-01T00:00:00.000Z En avsiktlig quirk: när du skriver tider till mänskliga orienterade filer (t.ex. .csv,.tsv,.json,.xhtml) ,ERDDAP™använder den angivnatime\\_precisionom den innehåller sekunder och/eller decimal sekunder; annars använder den sekundertime\\_precision1970-01-01T00:00:00Z (för konsistens och bakåtkompatibilitet) . Tack vare Dominic Fuller-Rowell.
    *   EDDGridFromNcFiles stöder nu att läsa StringdataVariables.
    *   .ncfiler skrivna av griddap kan nu ha StringdataVariables.
    * GenerateDatasets Xml innehåller nu mer flush () samtal för att undvika problemet med information som inte skrivs till filerna. Tack till Thierry Valero.
    * Dokumentationen för GenerateDatasetsXml förbättrades, särskilt för att påpeka att -i switch bara fungerar om du anger alla svar på kommandoraden (t.ex. script mode) . Och manusläge förklaras. Tack till Thierry Valero.
    *   ERDDAP™inte längre tillåter två variabler i en dataset att ha sammasourceName. (Om någon gjorde det förut, det förmodligen ledde till felmeddelanden.) Som tidigare,ERDDAP™tillåter inte två variabler i en dataset att ha sammadestinationName.

## Version 1.52{#version-152} 
 (släppt 2014-10-03) 

*    **Nya funktioner:**   (Ingen) 
*    **Små förändringar/buggfixar:** 
    * Ännu en annan (Mindre) förändring för att göraERDDAP™snabbare.
    * Förbättring av ISO 19115-filer som genereras avERDDAPTillagd nyligen rekommenderad&lt;gmd: Protocol & gt; värden (information, sök,OPeNDAPFrån:OPeNDAP,ERDDAPgriddap ochERDDAPFrån:tabledap) inom inom&lt;gmd:CI\\_OnlineResource & gt; Tack vare Derrick Snowden och John Maurer.
    * Många små förändringar.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Bug fix: GenerateDatasetsXml.sh och DasDds.sh var inte i erddap.war för 1,48 och 1,50. Nu är de. Tack till Thierry Valero.
    * Små förändringar i vissa hastighetstester i TestAll för att göra dem mindre mottagliga för slumpen. Tack till Terry Rankine.

## Version 1.50{#version-150} 
 (släppt 2014-09-06) 

*    **Nya funktioner:**   (Ingen) 
*    **Små förändringar/buggfixar:** 
    * Detta dettaERDDAP™bör vara mycket snabbare än de senaste versionerna.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:**   (ingenting ingenting) 

## Version 1.48{#version-148} 
 (släppt 2014-09-04) 

*    **Nya funktioner:** 
    *   ERDDAP™skapar alltid en tabular dataset,datasetID= =allDatasets, som har en informationsförteckning om alla datamängder i dettaERDDAP. Det kan vara queried som alla andra tabular dataset. Detta är ett användbart alternativ till det aktuella systemet för att få information om dataset programmatiskt.
    * Det finns två nya utdatafiltyper för EDDTable ochEDDGrid.csv0 och.tsv0. De är komma- och flik-separerade värdefiler som inte har linjer med kolumnnamn eller enheter. Datan börjar på den första raden. De är särskilt användbara för skript som bara vill ha en bit av information frånERDDAP.
*    **Små förändringar/buggfixar:** 
    * Kartor kan nu göras till longitud i intervallet -720 till 720.
    * Den nya.ncml response File Type är tillgänglig för allaEDDGriddataset. Den återvänder[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\-formaterad beskrivning av datasetet (liknar en kombinerad .dds + .das) .
    * Bug fix: Spara tabelldata till en.ncfilen var begränsad till 100 000 värden per variabel. Nu är det bara begränsat till 2 GB total filstorlek. Tack vare Kevin O'Brien.
    * Bug fix: the saveAsMatlabmetoder ser nu till attdatasetIDs konverteras till säkerMatlabVariabla namn. Men jag rekommenderar fortfarande starkt att du skapardatasetIDs som är giltiga variabla namn: börja med ett brev och sedan bara använda A-Z, a-z, 0-9 och \\_. Se[datasetID](/docs/server-admin/datasets#datasetid). Tack till Luke Campbell.
    * Bug fix i EDDTableFromDatabase: Med vissa typer av databaser, en NO\\_ DATA-svaret från databasen ledde till en meningslös 30 sekunders fördröjningERDDAP. Tack till Greg Williams.
    * Bug fix:EDDGridGör en graf med graftyp = linjer (eller markörer eller markörer och linjer) tvingad x axelvariabel att vara tid. Nu kan det vara någon axel. Tack till Lynn DeWitt.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * STRONGLY RECOMMENDED: UppdateringJava  
Denna version avERDDAP™KravenJava7 eller högre, menJava7 kommer att nå sitt slut i april 2015 (Snart&#33;) Så nu är det en bra tid att byta tillJava8. såJava8 är starkt återkallad. Jag testar medJavaNotera attJava6 nådde sitt slut i februari 2013 (Inga fler säkerhetsbuggfixar&#33;) .
    * STRONGLY RECOMMENDED: Uppdatera Tomcat
Om du använder Tomcat, vänligen byt till den senaste versionen av Tomcat. Tomcat 8 är utformad för att arbeta medJava8.
    * "ERDDAPär inte längre en akronym. Nu är det bara ett namn. Jag vill inte att namnet ska markeraERD. Jag villERDDAP™markera din institution och dina data.
    * Förklara[anpassa utseendet på dinERDDAP™installation för att markera din institution och dina data](/docs/server-admin/deploy-install#customize). Med en timmes arbete kan du göra fina förbättringar som kommer att vara för evigt.
    * I setup.xml, the&lt;displayDiagnosticInfo&gt; alternativet ignoreras nu alltid och behandlas som om värdet var falskt.
Rekommenderad: Ta bort&lt;displayDiagnosticInfo&gt; taggen och relaterad information från din setup.xml.
    * I setup.xml, standard för&lt;drawLandMaskvar "över", men nu är det "under", vilket är en bättre allmän standard (fungerar bra med alla dataset) .
    * GenerateDatasetsXml.sh och DadDds.sh Linux-skript använder nu bash istället för csh och har förlängningen .sh. Tack till Emilio Mayorga
    * GenerateDatasets Xml och DasDds skapar nu sina egna loggfiler (GenerateDatasetsXml.log och DasDds.log) och utdatafiler (GenerateDatasetsXml.out och pappads.out) i _bigParentDirectory_/logs/, och aldrig sätta sina resultat på klippbordet.
    * GenerateDatasets Xml stöder nu en -i-kommandoradsparameter som infogar utgången i den angivna filen på en angiven plats. Se[dokumentation](/docs/server-admin/datasets#generatedatasetsxml). Tack till Terry Rankine.
    * EDDTableFromDatabase stöder nu&lt;kolumnNameQuotes&gt;&lt;/columnNameQuotes&gt;, med giltiga värden (Default) ", eller ingenting. Denna karaktär (Om någon) kommer att användas före och efter kolumnnamn i SQL-frågor. Olika typer av databaser, inrättade på olika sätt, kommer att behöva olika kolumnnamn citatmärken.
    * Tabular latitud och longitud variabler kan nu ha anpassatlong\\_namet.ex. profil latitud. Tidigare kunde de bara vara bredd och longitud.
    * Från och med nu ange "defaultDataQuery" och "defaultGraphQuery" som attribut i datasetets globala metadata (dvs.&lt;addAtts &gt;), inte som separat&lt;defaultDataQuery &gt; och&lt;DefaultGraphQuery&gt; taggar. (Även om du fortfarande anger dem via taggarna,ERDDAP™Skapar automatiskt globala attribut med informationen.) 

## Version 1.46{#version-146} 
 (släppt 2013-07-09) 

*    **Nya funktioner:** 
    *    (Ingen) 
*    **Små förändringar/buggfixar:** 
    * Bug fix: I EDDTableFromDatabase, endast i version 1.44,ERDDAP™felaktigt citerade databasens tabellnamn i SQL-uttalanden. Det är nu fixat. Tack vare Kevin O'Brien.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    *    ** Om du inte ändrar standardmeddelandena i meddelanden.xml,
ta bort\\[Tomcat\\]/content/erddap/messages.xml. **   
Standardmeddelandena.xml-filen är nu i erddap. Krigsfil, inte erddapContent.zip. Så du behöver inte längre uppdatera meddelanden.xml.
    * Om du ändrar meddelandena i meddelanden.xml, från och med nu, varje gång du uppdaterarERDDAP™antingen:
        * Gör samma ändringar du gjort innan till den nya
            \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Och den här gången: ta bort\\[Tomcat\\]/content/erddap/messages.xml.
        * Eller ta reda på vad som har förändrats i de nya meddelandena.xml (via diff) och ändra din
            \\[Tomcat\\]/content/erddap/messages.xml fil därefter.

## Version 1.44{#version-144} 
 (släppt 2013-05-30) 

*    **Nya funktioner:** 
    * Frågor till EDDTable dataset stöder ochorderByMin Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min Min (......) och & & &orderByMinMax (......)   (som returnerar två rader i varje grupp, med minsta och högstorderByVärdevärde) . Tack till Lynn DeWitt.
    * Det finns två nyatabledapFiltyper:.ncCFHeader och.ncCFMAHeader (som returnerar ncdump-liknande rubriken på motsvarande.ncCF och.ncCFMA filtyper) . Tack till Steve Hankin.
*    **Små förändringar/buggfixar:** 
    * Bug fix: ladda .graph och .html webbsidor för datamängder med massor av tidsvärden var långsam eftersomERDDAP™var långsam när man genererar tidsreglage alternativ. Nu är det alltid snabbt. Tack vare Michael Barry, OOICI och Kristian Sebastian Blalid.
    * Bug fix: I vissa EDDTable datasettyper hanterades inte tidsbegränsningarna alltid korrekt. Nu är de. Tack till John Maurer och Kevin O'Brien.
    * Bug fix: datamängder skulle inte laddas när allasubsetVariablesfasta värdevariabler. Nu kommer de. Tack till Lynn DeWitt och John Peterson.
    * IMPROVED: Nu fungerar alla frågor för bara subset variabler som om & distinkt () är en del av frågan.
    * För frågor som inkluderar &.jsonp=_functionName_, _funktion Namn_ MÅSTE nu vara en serie av 1 eller mer (period-separat) ord. Varje ord måste börja med ett ISO 8859-brev eller "\\_" och följs av 0 eller fler ISO 8859-bokstäver, siffror eller "\\_". Ja, detta är mer restriktivt änJavaSkriptets krav på funktionsnamn.
    * Tidsaxeln på grafer fungerar nu bra för längre tidsintervall (80 - 10000 år) och kortare tidsintervall (0,003 - 180 sekunder) .
    *   ERDDAP™är nu mer förlåtande när man parsar variationer av ISO-8601-format tidsdata.
    * Det fanns många andra små förändringar och buggfixar.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    *    **Du måste uppdatera till den senaste versionen för att vara säker.**   
        ERDDAP™genomgick en säkerhetsrevision. Det fanns några buggar och svagheter. Version 1.44 innehåller flera viktiga säkerhetsbuggfixar och flera ändringar för att öka säkerheten och tillgängligheten (t.ex. för synnedsatta användare) . Version 1.44 har godkänt uppföljningssäkerhetsrevisionen. Tack vare alla bra människor på USGS och Acunetix som gjorde detta möjligt. (Borde inteNOAAGör detta?) 
    * Den nya[EDDTableFrånWFSFiler](/docs/server-admin/datasets#eddtablefromwfsfiles)gör en lokal kopia av alla data från enArcGISMapServerWFSserver och så kan data sedan sparas snabbt tillERDDAP™användare. Tack till Christy Caudill.
    * Den nya[EDDTableFrånEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)låter dig skapa en EDDTable dataset från enEDDGriddataset. Några vanliga skäl för att göra detta är:
        * Detta gör det möjligt för datasetet att bli queried medOPeNDAPvalbegränsningar (som en användare kan ha begärt) .
        * Datasetet är i sig en tabular dataset. Tack vare OOICI, Jim Potemra, Roy Mendelssohn.
    * Variabelnamnet "djup" är nu ett speciellt alternativ till "höjd". Enheterna måste vara en variant av "meter". Datavärdena måste vara positiva = nedåt.ERDDAP™är nu fullt medveten om betydelsen av djup och stöder den varhelst höjden stöds. (t.ex. som en komponent i en CF DSG cdm\\_data\\_type=profildataset) . En datamängd får inte ha både "djup" och "höjd" variabler.
    * I dindatasets.xml, ta bort alla användningar av&lt;Att namn="cdm\\_altitude\\_proxy"&gt;djup&lt;/att&gt; eftersom djupet nu är ett speciellt alternativ till höjd och det behöver inte identifieras speciellt.
    * I dindatasets.xml, ta bort alla användningar av&lt;höjdMetersPerSourceUnit&gt;, förutom EDDTable FrånSOS.
När värdet är 1, ta bara bort det.
När värdet är -1, överväga att ändra det variabla namnet till djupet.
För andra värden, lägg till&lt;addAttributesTill exempel:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Alla datamängder stöder nu
        
        *   &lt;defaultDataQuery &gt; som används om .html begärs utan fråga.
            * Du kommer förmodligen sällan behöva använda detta.
            * För griddap dataset, en vanlig användning av detta är att ange ett annat standarddjup eller höjd dimension värde (t.ex.,\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]istället för\\[Sista sista\\]) .
Du bör alltid lista alla variabler, alltid använda samma dimensionsvärden för alla variabler och nästan alltid använda samma dimensionsvärden.\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\],\\[Sista sista\\]eller\\[0:last\\]för dimensionsvärdena.
Till exempel:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Förtabledapdatamängder, den vanligaste användningen av detta är att ange ett annat standardtidsintervall (i förhållande till nu, t.ex., &time&gt;=now-1 dag) .
Kom ihåg att begära inga datavariabler är detsamma som att ange alla datavariabler, så vanligtvis kan du bara ange den nya tidsbegränsningen.
Till exempel:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery &gt; som används om .graph begärs utan fråga.
            * Du kommer förmodligen sällan behöva använda detta.
            * För griddap dataset är den vanligaste användningen av detta att ange ett annat standarddjup eller höjd dimension värde (t.ex.,\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]istället för\\[Sista sista\\]) och/eller specificera att en specifik variabel graferas.
I alla fall kommer du nästan alltid att använda\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\],\\[Sista sista\\]eller\\[0:last\\]för dimensionsvärdena.
Till exempel:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Förtabledapdatamängder, den vanligaste användningen av detta är att ange olika variabler som ska graferas, ett annat standardtidsintervall (i förhållande till nu, t.ex., &time&gt;=now-1 dag) och/eller olika standardgrafikinställningar (t.ex. markörtyp) .
Till exempel:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Kom ihåg att du behöver XML-kod eller procent-kod (antingen en, men inte båda) standardfrågor eftersom de är i ett XML-dokument. Till exempel, och blir &amp;amp;amp; ,&lt;blir &amp;lt; och &gt; blir &amp;gt;
Vänligen kontrollera ditt arbete. Det är lätt att göra ett misstag och inte få vad du vill.
Tack vare Charles Carleton, Kevin O'Brien, Luke Campbell och andra.
    *   EDDGridFrånDap,EDDGridFromErddap och EDDTableFromEDDGridha ett nytt system för att hantera datamängder som förändras ofta (så ofta som ungefär var 0,5 s) . Till skillnad frånERDDAP"S vanliga, proaktiva system för att helt ladda om varje datamängd, är detta valfria ytterligare system reaktivt. (utlöses av en användarbegäran) och inkrementell (bara uppdatera den information som behöver uppdateras) . Till exempel, om en begäran till enEDDGridFromDap dataset förekommer mer än det angivna antalet millisekunder sedan den senaste uppdateringen.ERDDAP™kommer att se om det finns några nya värden till vänster (vanligen vanligen vanligen vanligtvis"time") dimension och i så fall bara ladda ner de nya värdena innan du hanterar användarens begäran. Detta system är mycket bra på att hålla en snabbt föränderlig datamängd uppdaterad med minimala krav på datakällan, men till kostnaden för att något sakta ner behandlingen av vissa användarförfrågningar. Se [Läs mer]&lt;updateEveryNMillis &gt;] (/docs/server-admin/datasets#updateeverynmillis)   
Tack vare Michael Barry och OOICI.
    *   EDDGridFromNcFiles, EDDTableFromNcFiles och EDDTableFromNcCFFiles stöder nu[NcML.ncml](/docs/server-admin/datasets#ncml-files)Källa filer i stället för.ncfiler. Tack till Jose B Rodriguez Rueda.
    * FörEDDGridAggregateExistingDimension,ERDDAP™stöder ett nytt serverType="dodsindex"-alternativ för serverType-attributet&lt;sourceUrls&gt; tag. Detta fungerar med webbsidor som har listor över filer inom&lt;Pre&gt;&lt;/pre&gt; och ofta under enOPeNDAPlogotyp. Ett exempel är[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * För EDDTableFromSOSNu stöder en valfri tag
```  
        <sosServerType>_serverType_</sosServerType>  
```
så att du kan ange typen avSOSServer server (SåERDDAP™behöver inte räkna ut det) . Giltiga värden av&lt;_serverType_\\&gt; är IOOS\\_NDBC, IOOS\\_NOS,OOSTethysoch WHOI (En nyligen stödd server Typ) . Se[EDDTableFrånSOS](/docs/server-admin/datasets#eddtablefromsos). Tack vare Derrick Snowden och Janet Fredericks.
    * Allt alltEDDGridFrån...Files, EDDTableFrån...Files,EDDGridKopiera och EDDTable Kopiera stöder nu en valfri tagg
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
som kan berättaERDDAP™för att hålla filen Bord (med information om varje källdatafil) I minnet istället för bara på disken (Default) . Att hålla filen Tabell i minnet påskyndar förfrågningar om data (Speciellt om det finns &gt;1000 källdatafiler) men använder mer minne. Om du ställer in detta till sant för alla datamängder, håll ett öga på minnet: för närvarande använder du linje på _yourDomain_/erddap/status.htmlsäkerställa attERDDAP™har fortfarande gott om fri minne. Tack till Fredrik Stray.
    * EDDTableFromASCIIFiles stöder nu&lt;Charset&gt;. De två vanligaste karset (fall känslig&#33;) är ISO-8859-1 (Default) och UTF-8.
    * Rekommenderas: i setup.xml, inom&lt;StartHeadHtml&gt;, vänligen ändra&lt;html&gt; in i
        &lt;html lang="en-US"&gt; (eller en annan[språkkod](https://www.w3schools.com/tags/ref_language_codes.asp)Om du har översatt messages.xml) .
    * setup.xml har nya valfria taggar för att inaktivera delar avERDDAPFrån:
        *   &lt;konverterareActive&gt;False&lt;/convertersActive&gt;&lt;&#33; - Standarden är sann -&gt;
        *   &lt;SorterActive&gt;False&lt;SlideSorterActive &gt;&lt;&#33; - Standarden är sann -&gt;
        *   &lt;WmsActive &gt; False&lt;/wmsActive&gt;&lt;&#33;-- standarden är sant -&gt; I allmänhet rekommenderar vi att du ställer någon av dessa till falsk.
    * GenerateDatasets Xml skriver nu resultat till _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, inte log.txt. Tack till Kristian Sebastian Blalid.
    * GenerateDatasets Xml gör nu ett bra förslag till&lt;Reload EveryNMinutes &gt;. Tack vareNOAAUAF-projekt.
    * Många små förbättringar av GenerateDatasetsXml. Tack vareNOAAUAF-projekt.

## Version 1.42{#version-142} 
 (släppt 2012-11-26) 

*    **Nya funktioner:** 
    *    (Inga större nya funktioner.) 
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Om du uppgraderar frånERDDAP™1.38 eller 1.40, det fanns inga ändringar som kräver att du ändrar dina konfigurationsfiler. (men du måste använda den nya meddelanden.xml-filen) .
    *   ERDDAP™Återigen kan springa medJava1.6. (ERDDAP™v1.40 krävsJava1.7.) Vi rekommenderar fortfarande starkt att du använder den senaste versionen avJava1.7.
    * En ny datasettyp,[EDDTableFrån AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles)kan läsa data från en uppsättning automatiska väderstationer (AWS) XML datafiler. Tack vare Lynn Dewitt och Exploratorium.
*    **Små förändringar/buggfixar:** 
    * Justerat till förändringar i NDBCSOSkälldataservrar.
    * Justerat till ändringar av NOS COOPS ASCII-tjänster.
    * Gjorde flera små förändringar och buggfixar.

## Version 1.40{#version-140} 
 (släppt 2012-10-25) 

*    **Nya funktioner:** 
    * Det finns ett nytt utdatafilformat förtabledapDataset:.ncCFMA, som sparar begärda data i en.ncfil som överensstämmer med CF[Diskret sampling geometrier](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Multidimensionella Array-alternativ, och som därför överensstämmer med NODC-mallarna\\[2021: Nu är[NCEI mallar](https://www.ncei.noaa.gov/netcdf-templates)\\]för att lagra denna typ av data. Tack vare NODC.
    *   tabledapFörfrågningar kan nu innefatta tidsbegränsningar som &time&gt;now-5 dagar. Se[dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Tack till James Gosling.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Om du uppgraderar frånERDDAP™1.38 Det fanns inga ändringar som kräver att du ändrar dina konfigurationsfiler. (men du måste använda den nya meddelanden.xml-filen) .
    *   ERDDAP™offentliga utgåvor och interna milstolpar finns tillgängliga via[ERDDAP™på GitHub](https://github.com/ERDDAP). För mer information, se[Wiki](https://github.com/ERDDAP/erddap/wiki)FörERDDAP™projekt samt mer allmänt[ERDDAP™Programmers guide](/docs/contributing/programmer-guide). (Detta meddelades separat några veckor efterERDDAP™1.38 release.) 
    * GenerateDatasets Xml har förbättrats.
        * Manuset reviderades så det borde fungera korrekt på alla Linux-datorer. (Inte bara några få) .
        * Det lägger nu tillcreator\\_name,creator\\_emailochcreator\\_urlnär det är möjligt.
        * Många andra små förbättringar.
    * Förfinat hurERDDAP™handlar om tid.
        * Internt,ERDDAP™nu hanterar tider på millisekund precision (Inte sekunder) .
        * Du kan nu valfritt ange tidsprecisionen för en viss dataset, se[time\\_precision](/docs/server-admin/datasets#time_precision). Du kan till exempel ange en dataset för att visa tidsvärden med datumprecision (t.ex. 1970-01-01) .
        * Dina aktuella datamängder kommer att använda standardinställningarna, så de påverkas inte av dessa ändringar och kommer att fortsätta att visa tid med sekunders precision. Tack vare Servet Cizmeli och Philip Goldstein.
    *   [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)är en ny datasettyp som du kan använda i dindatasets.xmlfil. Det kan läsa data från någon av de många filformat som definieras av[CF Diskret sampling geometrier](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konventioner. Tack vare NODC och speciellt tack vare Kyle Wilcox för att göra provfiler för det stora antalet giltiga DSG-filformat och för att göra dem offentligt tillgängliga.
*    **Små förändringar/buggfixar:** 
    * Utvidgade[Snabbstart](#quick-restart)system för alla relevantaEDDGridoch EDDTable underklasser.
    * Förbättrad dokumentation, särskilt relaterad till hur man använder[griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)och[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)från olika klientprogramvara.
    * Ändrad avancerad sökning för att stödja minTime och/eller maxTime uttryckt som epokSeconds. Tack till Lynn Dewitt.
    * Ändrad.htmlTableUtgång för att visa url och e-postadresser som länkar.
    * Lägg till "rel=" och "rev=" till relevant&lt;en href&gt; taggar. Tack vare Pat Cappelaere frånOGC RESTprojekt.
    * Förbättrat skydd mot orealistiskt stora dataförfrågningar, särskilt inomtabledapDär det är ett svårare problem.
    * Flyttade fler meddelanden till messages.xml.
    * Gjorde hastighetsförbättringar.
    * FastEDDGridFrånFiles för att tillåta nedåtgående sorterade axlar. Tack vare Maricel Etchegaray.
    * Ta bort referenser till iGoogle eftersom det kommer att avbrytas.
    * Gjorde flera små förändringar och buggfixar.

## Version 1.38{#version-138} 
 (släppt 2012-04-21) 

*    **Nya funktioner:** 
    * ISO 19115 och FGDCERDDAP™kan automatiskt generera ISO 19115 och FGDC XML metadatafiler för varje dataset. Länkar till filerna är synliga på varje lista över datamängder (från Full Text Search) och även i Web Accessible Folders (WAF)   (se[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)och[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Tack vare Ted Habermann, Dave Neufeld och många andra.
    * Fulltextsökningar för dataset stöder nu \\-_excludedWord_ och \\-"_exkluderad fras_" . Tack vare Rich Signell.
    * Sökningar efter datamängder returnerar nu resultat en sida i taget. Standarden använder parametersträngen: page=1&itemsPerPage=1000, men du kan ändra värdena i webbadressen för din begäran. Tack vare Steve Hankin och UAF-projektet.
    *   OpenSearch-----ERDDAP™stöder nu[OpenSearch1.1.](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)standard för att söka efter datamängder. Bland annat tillåter detta katalogaggregationswebbplatser att göra distribuerade sökningar (skicka en sökförfrågan till varje katalog som den vet om) .
    * Comma separerad Värde (CSV) Filer -ERDDAP™genererar nu CSV-filer med bara ett komma mellan värden (vilket Excel föredrar) I stället för comma+space. Tack till Jeff deLaBeaujardiere.
    * Million Datasets - Flera förändringar gjordes för att stödjaERDDAPhar ett stort antal datamängder, kanske till och med en miljon. Tack vare Steve Hankin och UAF-projektet.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
#### Snabbstart{#quick-restart} 
*   [Ett](#quick-restart)Snabba omstartssystem tillåterERDDAP™att starta mycket snabbare.
     **Lägg till detta i din setup.xml-fil** direkt efter&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Fulltextsökningar för dataset kan nu göras med Lucene sökmotor (Vi rekommenderar den ursprungliga sökmotorn om du har färre än 10 000 datamängder.) eller det ursprungliga söksystemet.
         **Lägg till detta i din setup.xml-fil** direkt efter&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * I setup.xml kan du/bör nu lägga till två nya kategorier i den komma-separerade listan över&lt;categoryAttributes&gt;::
        * Global:keywords (Lägg till det direkt efter global:institution) - ett nytt specialfall som paraserar en komma-separerad lista över nyckelord från det globala sökord attributet för att göra en separat post för varje sökord.
        * Variabel Namnnamn (Lägg till det i slutet) Ett nytt specialfall som kategoriserar var och en avdataVariable destinationNames.
    * I setup.xml kan du (Men varför?) berättaERDDAP™inte erbjuda FGDC och/eller ISO 19115 metadata för datamängd genom att inkludera
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Standardvärdena för dessa inställningar är sanna.
    * Inomdatasets.xmlTänk på att förbättra metadata för dina datamängder.ERDDAP™nu genererar automatiskt ISO 19115 och FGDC XML metadatafiler för varje dataset baserat på datasetets metadata.
Så, **Bra dataset metadata leder till braERDDAP-genererad ISO 19115 och FGDC metadata.**   
         **Se den nya dokumentationen för de många nya[Globala attribut](/docs/server-admin/datasets#global-attributes).** 
    * Inomdatasets.xmlOm du vill berättaERDDAP™att använda en pre-made FGDC- och/eller ISO 19115-fil som finns någonstans på serverns filsystem istället för att haERDDAP™generera dessa filer, använd:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Om _fullFileName_′′ eller filen inte finns, kommer datamängden inte att ha någon FGDC och/eller ISO 19115 metadata. Detta är också användbart om du vill undertrycka FGDC och/eller ISO 19115-metadata för en viss datamängd.
    * Inomdatasets.xmlFör allaEDDGridSideBySide ochEDDGridAggregateExistingDimension dataset, se till att barndataset har olikadatasetIDs än deras föräldrars datamängder och än de andra barnen. (Du kan till exempel följa George Foremans enkla men effektiva system för att namnge hans barn.) Om några namn i en familj är exakt samma, kommer datamängden inte att laddas (med felmeddelandet att värdena på den aggregerade axeln inte är i sorterad ordning) .
    * Inomdatasets.xmlDet fanns vissa ändringar i listan över giltigaioos\\_categorymetadatavärden:
        * "PCO2" ändrades till "CO2".
        * "Fysisk oceanografi" tillkom.
        * "Soils" tillkom.
    * Inomdatasets.xml,ERDDAP™inte längre tillåter "." i endatasetID. Det var tillåtet men avskräckt. (Förlåt) 
    * Inomdatasets.xml, installationen för EDDTableFromThreddsFiles och EDDTableFromHyraxFiler har ändrats något eftersom båda klasserna bara skrevs om för att vara effektivare. (Båda klasserna gör nu alltid en lokal kopia av alla fjärrdatafiler) . Se dokumentationen för att ställa in dessa klasser:[EDDTableFrånHyraxFiler](/docs/server-admin/datasets#eddtablefromhyraxfiles)och[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). I synnerhet se de reviderade kommentarerna om&lt;FilDir&gt; (Irrelevant) och&lt;sourceUrl&gt; &gt; &gt; &gt; &gt; (Nu väsentlig) . Du bör heller aldrig linda denna klass i EDDTableCopy för effektivitet.
    * Inomdatasets.xmlOm du använder EDDTableFromDatabase med enOracledatabasen, du bör inkludera en anslutning Fastigheter som
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
för att ange hur många rader av data som ska hämtas samtidigt eftersom standarden är 10, vilket är fruktansvärt ineffektivt. Se[Oracledokumentation](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql och PostgreSQL verkar ha bättre standarder för denna inställning. Tack vare Kevin O'Brien.
    * Om du använder EDDTableFromDatabase, se de förbättrade["Speed" dokumentation](/docs/server-admin/datasets#eddtablefromdatabase)För ytterligare förslag för att förbättra prestanda. Tack vare Kevin O'Brien.
    * Inomdatasets.xmlför alla EDDTable ... datamängder, i konventionerna ochMetadata\\_Conventionsglobala attribut, hänvisa till CF-1.6 (inte CF-1.0, 1.1, 1.2, 1.3, 1.4 eller 1.5) , eftersom CF-1.6 är den första versionen som inkluderar ändringarna i Discrete Sampling Geometry.
    * programmerare som sammanställerERDDAP™kod måste lägga till lib/lucene-core.jar på listan över burkfiler i deras javac och java kommandoradsbanor.
    *   ERDDAP™har en[Ny service](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)konvertera ett CF Standard Name till/från ett GCMD Science Keyword. Du kan hitta detta användbart när du genererar globala sökordsmetadata för datamängderna i dinaERDDAP.
    * Hantera Bots - Vänligen läs detta råd till[förhindra bots från att krypa dinERDDAP™på ett dumt sätt](/docs/server-admin/additional-information#robotstxt).
    * Översättning - Texten omERDDAPwebbsidor är nu mestadels i messages.xml och så lämplig för översättning till olika språk (t.ex. tyska, franska) . Meddelandena använder nu ofta MessageFormat för formatering, även för att hjälpa till med att göra översättningar. Om du är intresserad av att göra en översättning, vänligen e-posterd dot data at noaa dot gov.
    * Sampledatasets.xml----- Det fanns flera små men betydande fel i provetdatasets.xml. Om du använder dessa datamängder, vänligen få de nyare versionerna från det nya provetdatasets.xmlI den nya erddapContent.zipfil. Tack till James Wilkinson.
    * Git - Jag kommer att försöka svårt att göraERDDAP™ett GitHub-projekt ASAP efter denna release.
*    **Små förändringar/buggfixar:** 
    * En ny palett, OceanDepth, är användbar för djupvärden (positivt är nere) t.ex. 0 (Den grunda) till 8000 (djupt) .
    * och.kmlUtgång fråntabledapAnvänder en bättre markör ikon (Det är inte fuzzy) . Och sväva över en markör gör det nu större.
    * EDDTableFromFiles - I den senaste uppgraderingen hade det nya netcdf-java-biblioteket hårdare restriktioner för variabla namn..ncfiler. Det orsakade problem för EDDTableFromFiles om en variabelsourceNamehade vissa skiljetecken. EDDTableFromFiles är nu modifierad för att undvika det problemet. Tack till Thomas Holcomb.
    * .subset-sidan stöder nu 0/10/100/1000/10000/100000 istället för en checkruta för relaterade data. Tooltip varnar för att 100000 kan få din webbläsare att krascha. Tack till Annette DesRochers, Richard (Abe) Coughlin och IOOS Biological Project.
    * .../erddap/info/datasetID_/index.html webbsidor visar nu urls och e-postadresser som klickbara länkar. Tack till Richard (Abe) Coughlin och IOOS Biological Project.
    * Bug fix: Itabledapför dataset med höjd MetersPerSourceUnit&lt;0, frågor med höjdbegränsningar hanterades felaktigt. Tack vare Kyle Wilcox.
    * Bug fix:EDDGridAggregateFromExistingDimension stöder nu fler olika TDS-adresser. Tack vare?

## Version 1.36{#version-136} 
 (släppt 2011-08-01) 

*    **Nya funktioner:** 
    * Inga signifikanta förändringar från användarens synvinkel.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * PmelTao dataset som ofta användes som provdataset för provettabledap  
Dokumentation är inte längre tillgänglig.ERDDAP™administratörer måste göra dessa förändringar:
        * I dindatasets.xmlOm du har endatasetID= "pmelTao" dataset, lägg till
aktiv="falsk" strax före "&gt;" i slutet av den linjen.
        * I din setup.xml, om din&lt;EDDTableIdExample &gt; är pmelTao, då:
            * Om dindatasets.xmlinte har en dataset meddatasetID= "erdGlobecBottle", tillägg
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * I din setup.xml, ersätt alla taggar från&lt;EDDTableIdExample &gt; genom
                &lt;EDDTableMatlabPlotExample &gt; med
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * För datamängder där typen är en underklass av EDDTableFromFiles kan du nu göra data från metadata.
Specifikt kan du nu göra en variabel från värdena på en egenskap av en av de ursprungliga variablerna.
Till exempel, idatasets.xmlinom en&lt;dataVariabletag, om du använder
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™kommer att göra en variabel med värdena på PI-attributet av kryssningsvariabeln.
Tack vare WOD.
*    **Förändringar:** 
    * Små förändringar

## Version 1.34{#version-134} 
 (släppt 2011-06-15) 

*    **Förändringar:** 
    * Bug fix: Fast ett minne läcka som inträffade på några 64-bitarsJavainstallationer.
    * Bug fix:ERDDAP™nu korrekt sätter dessa globala attribut när breddgradens värden sträcker sig från hög till låg: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernmost\\_Northing, Northernmost\\_Northing.
        
Observera attactual\\_rangeär oförändrad: det kan ha låga, höga värden eller höga, låga värden, eftersom det är avsett att ange intervallet och lagringsordningen.
        
    * Små förändringar.
    *   ERDDAP™administratörer behöver inte göra några ändringar i deras setup.xml ellerdatasets.xml.

## Version 1.32{#version-132} 
 (släppt 2011-05-20) 

*    **Förändringar:** 
    * Stöd för den nyligen ratificerade, CF Discrete Sampling Geometries (som tyvärr ännu inte är tillgänglig online) som ersätter de föreslagna CF Point Observation Conventions.
        ERDDAP™användare kommer att se att cdm\\_feature\\_type=Station ersätts av TimeSeries och det finns små ändringar i filerna som skapats för de.ncCF-filtyp (flat\\_dimension kallas nu prov\\_dimension) .
        ERDDAP™administratörer måste göra dessa förändringar idatasets.xmlFrån:
        * cdm\\_data\\_type=Station bör ändras till cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile bör ändras till cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variables bör ändras till cdm\\_timeseries\\_variables.
        * cf\\_role=station\\_id bör ändras till cf\\_role=timeseries\\_id.
    * Nytt nyttioos\\_categoryalternativ: "Colored Dissolved Organic Matter", "pCO2", "Stream Flow", "Total Suspended Matter".
    * Möjlig lösning på en möjlig minnesläcka på 64-bitarsJava.\\[Det fungerade inte.\\]
    * Små förändringar.

## Version 1.30{#version-130} 
 (släppt 2011-04-29) 

*    **Nya funktioner:** 
    * Support för 64-bitarsJava. När den används med 64 bitJava,ERDDAP™kan nu använda mycket mer heap minne och hantera många fler samtidiga förfrågningar.
    * Stöd för.ncfilförfrågningar upp till 2 GB (Även utan 64-bitarsJava) genom bättre användning avERDDAPHantering av data i bitar.
    * Många 2X hastighetsförbättringar i koden och 2X hastighet upp frånJava1.6 görERDDAP™2X till 4X snabbare än tidigare.
    * Minnesbesparingsförbättringar betydligt lägreERDDAPbasminneanvändning.
    * för tabular dataset,ERDDAP™är nu fullt medveten om en dataset cdm\\_data\\_type, och hur datakartorna till CDM-typen. Se[CF Diskret sampling geometri specifikation](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Kanske en dag snart kommer Word-filen att konverteras till .html och ersätta den aktuella "OBSOLETE"-informationen på den webbsidan. Tack vareNOAAUAF-projekt.
    * För de flesta EDDTable dataset, ett nytt utdatafiltypalternativ,.ncCF skapar Contiguous Ragged Array.ncfiler som uppfyller den senaste versionen av[CF Discrete Sampling Geometries konventioner](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Dessa filer är strukturerade för att återspegla CDM-datatypen av datamängden. Eftersom de föreslagna konventionerna just ändrats, från och med detta skrivande, stöder netcdf-java-biblioteket ännu inte att läsa de filformat som skapats avERDDAPoch tolkar dem som CDM-datafiler. Det kommer nog snart. Tack vareNOAAUAF-projekt.
    * Distinktdataalternativet på .subset-webbsidan är nu en rullgardinslista som låter användare ange det maximala antalet rader av distinkta data som ska visas (Standard = 1000) . Denna förändring och andra tillåterERDDAP™att arbeta med datamängder som har mycket stort antal rader av distinkta data. (Antalet unika värden för varje enskild variabel är fortfarande ett problem, men det kan vara ganska högt. (20 000?) innan .subset och andra webbsidor laddas väldigt långsamt.) Tack vareNOAAUAF-projekt.
    * .subset webbsidor har ett nytt alternativ: Visa Distinct Data Counts. Tack vare GTOPP-projektet.
    * För att hjälpa användare, de olika värdena (t.ex. stationsnamn) visas nu på Formerna för Make-A-Graph och Data Access. Tack vareNOAAUAF-projekt.
    * Transparent Png-förfrågningar stöder nu alla typer av grafer och datarepresentationer. Det drar bara data - inga axlar, legender, landmask eller något annat. Detta gör det möjligt att göra bilder som lager av transparentaPngs. Om &.size=_width_|_height_ anges i frågan (rekommenderas) Det är hedrat. Standarden är 360x360 pixlar. Det enda undantaget ärEDDGridoch.draw=surface, där standarden (som förut) är en bild med ~1/pixel per datapunkt (upp till 3000 x och y pixlar) . Tack till Fred Hochstaedter.
    * ochWMSwebbsidor visar nu färgfältet för datamängdens variabel (s) . Tack vare Emilio Mayorga och andra.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Denna release innebär många förändringar. De är alla viktiga. Var tålmodig och arbeta genom alla ändringar som anges nedan.
    * Denna version skjuts ut tidigare än avsedd att hantera vissaJavasäkerhetsbuggar. Tyvärr är flera funktioner/fix avsedda för dettaERDDAP™versionen finns inte i den här versionen. Förlåt. Förhoppningsvis blir nästa version relativt snart (och mycket lättare att uppgradera till) .
    * För att undvika flera säkerhetsbuggar iJava6 uppdatering 23 och nedan, ladda ner och installera den senaste versionen avJava  (Java6 uppdatering 24 eller högre) . Om du har ett 64-bitars operativsystem, vänligen få en 64-bitarsversion avJava.
    * Om du använder Tomcat 5 måste du uppgradera till Tomcat 6 eller 7 (Föredrog) . Om du använder Tomcat 6, överväga uppgradering till Tomcat version 7.
    * Följ alla instruktioner för[inrätta en nyERDDAP™](/docs/server-admin/deploy-install), men i förekommande fall kommer du att kopiera filer från din gamla installation till den nya installationen, särskilt den.\\[Tomcat\\]/content/erddap katalog och filer. Som en del av det, notera[nya Tomcat setup rekommendationer](/docs/server-admin/deploy-install#tomcat).
    * Standard erddap.css ingår nu i erddap.war-filen.
        * För att använda standard erddap.css, **ta bort** Din gamla\\[Tomcat\\]/content/erddap/images/erddap.css.
        * Om du ändrade\\[Tomcat\\]/content/erddap/images/erddap.css, och vill fortsätta använda den: lämna den på plats och ersätta den&lt;Input&gt; sektion med:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * I din\\[Tomcat\\]/content/erddap/setup.xml:
        * Ersätt kommentarer och taggar relaterade till&lt;partialRequestMaxBytes&gt; och&lt;partialRequestMaxCells &gt; med
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Ersätt kommentarerna relaterade till&lt;categoryAttributes&gt; och överväga att ändra taggens värde:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Enskilda&lt;categoryAttributesDet är globala attribut som nu måste identifieras via prefixet globalt: (t.ex. global:institution) . Andra attribut antas vara variabla attribut (t.ex.,standard\\_name) . Institutionsvärden (de enda) lämnades i det ursprungliga fallet. Nu konverteras alla kategorivärden till nedre.
    * I din\\[Tomcat\\]/innehåll/erddap/datasets.xmlFrån:
        * Stor improviserad:ERDDAP™har nya krav relaterade till en tabular dataset cdm\\_data\\_type. I synnerhet har varje dataset MUST rätt metadata och variabler relaterade till cdm\\_data\\_type. Om inte, kommer datamängden inte att laddas och kommer att kasta ett fel. Se dokumentationen för[cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type).
        * FYI: Det finns en ny datasettyp: EDDTableFromAsciiServiceNOS.
        * FYI: Det finns tre nytillåtnaioos\\_categoryalternativ: Hydrologi, kvalitet (t.ex. för kvalitetsflaggor) och statistik (t.ex. menar) .
        * För EDDTableFrån... Filer dataset, ta bort alla&lt;nDimensions&gt; taggar. De behövs inte längre eller används.
        * För variabler meddestinationName= höjd,ERDDAP™inte längre tvingarlong\\_nameAtt vara höjd. Vänligen gå igenom dindatasets.xmloch upprepade gånger söka efter&lt;destinationName&gt;höjd och lägg till den där variabeln&lt;addAttributes&gt;::
```
              <att name="long\\_name">Altitude</att>  
```
             (eller något annorlundalong\\_namei särskilda fall) .
        * Valfritt: Alla EDDTableFromFiles underklasser stöder variabel[sourceName=global:...](/docs/server-admin/datasets#global-sourcenames)omvandla globala metadata från varje fil till en datavariabel. Tack till Lynn DeWitt.
    * EDDTableFromDatabase användareERDDAP™kommer med en ny JDBC 4-förare för Postgres. För andra databaser, kontrollera webben för den senaste JDBC .jar-filen för din databas. Sedan dessERDDAP™nu använderJava1.6+, JDBC 4 (Inte 3) rekommenderas förmodligen.
    * FYI
        *   EDDGridFrån...Files och EDDTable Från... Filer dataset nu lagra filTable information i
            \\[bigParentDirectory\\]/dataset Info/\\[datasetID\\]/***.ncfiler.
Också, EDDTable dataset nu lagra subset information i
            \\[bigParentDirectory\\]/dataset Info/\\[datasetID\\]/***.ncfiler. Dessa filer brukade vara
            \\[bigParentDirectory\\]/dataset Info/\\[datasetID\\]. \\************************************************************************************************************************************************************************************************************************************************************.jsonfiler.
De gamla filerna raderas automatiskt närERDDAP™Börjar upp. Eller du kan radera alla filer (Men lämna de tomma underkatalogerna) in i\\[bigParentDirectory\\]/datasetInfo/.
        * Jag arbetade med en ny EDDTableFromNcCFFiles som skulle läsa data från lokala och avlägsna filer med hjälp av de föreslagna, nya CF Point Observation Conventions. Men det är inte i denna release. Det finns problem i netcdf-java bibliotek relaterade till vissa metoder för att läsa dessa filer. Och det fanns några mycket nya ändringar av de föreslagna CF Point Observation Conventions. När biblioteket netcdf-java är fastställt och uppdaterat till det senaste förslaget kommer jag att återuppta arbetet med detta.
        * RunningERDDAP™på Windows kan ha problem: särskilt kan du se i\\[bigParentDirectory/logs/log.txt-fil somERDDAP™kan ibland inte ta bort och/eller byta namn på filer snabbt. Detta beror på antivirusprogram (från McAfee och Norton) som kontrollerar filerna för virus. Om du stöter på detta problem (som kan ses av felmeddelanden i log.txt-filen som "Användbar att ta bort ...") ändra antivirusprogramvarans inställningar kan delvis lindra problemet.
OmERDDAP™I Windows är bara ett test som körs på skrivbordet, det här är bara en irritation.
OmERDDAP™i Windows är din publikERDDAP™Tänk på att byta till en Linux-server.
    * Långsam första startup Första gången du körERDDAP™efter uppgradering,ERDDAP™kan vara långsamt att ladda datamängderna. VägenERDDAP™lagrar information om aggregerade filer har ändrats, såERDDAP™måste läsa lite information från alla dessa filer. Det kommer att ta tid.
    * Fel på Startup - Med tanke på ändringarna relaterade till cdm\\_data\\_type är det troligt att vissa av dina datamängder inte laddas och kommer att kasta fel. Läs noggrant Daily Report-e-postmeddelandet somERDDAP™Skickar dig närERDDAP™är färdig med att starta upp. Det kommer att ha en lista över datamängder som inte laddades (på toppen) och anledningen till att de inte laddade (nära botten) .
    * Om du fastnar eller har andra frågor, maila detaljerna till mig:erd.data at noaa.gov.
    * Programmerare ----- Om du skriverJavaProgram som körERDDAP™koden, du måste ändra några av kommandoradens parameterreferenser:
        * Ändra joda-time-1.6.2.jar till joda-time. Jar
        * Ändra Postgres JDBC .jar referens till postgresql.jdbc.jar
*    **Små förändringar och buggfixar:** 
    
    * Förbättrad anslutningshantering för att undvika hängda trådar.
    * Förbättrade metoder för att hantera nästan samtidiga identiska önskemål mer effektivt.
    *   ERDDAP™nu använder netcdfAll-4.2.jar (byta namn till netcdfAll-latest. Jar) . Denna växel krävde flera interna förändringar och orsakade några små externa förändringar, t.ex. ändringar av hur gribfiler läses och små förändringar i.ncHuvudutgång.
    * Ny funktion:\\[Erddap\\]/convert/fipscounty.html konverterarFIPSlänskoder till/från länsnamn.
    * På kartor är statsgränserna nu mörka violetter, så de sticker ut bättre på alla bakgrundsfärger.
    * Tabular.kmlåterigen använder en cirkulär ikon för att markera poäng (Inte flygplansikonen Google bytte nyligen till) .
    * De erdCalcofi datamängder omorganiserades och serveras nu från lokala filer. (snabbare) .
    * GenerateDatasets Xml från Thredds Catalog skapar nu en resultatfil:
        \\[Tomcat\\]/webapps/erddap/WEB-INF/temp/EDDGridFrånThreddsCatalog.xml. Tack vare Kevin O'Brien.
    * GenerateDatasets Xml från Thredds Catalog försöker nu ta bort onödiga portnummer från käll-adressen (8080 och 8081 kan ibland tas bort) . Tack vareNOAACentrals säkerhetsteam.
    * För .subset-webbsidor har Map of Distinct Data nu ett variabelt lat lon-intervall.
    * Flera listor iERDDAP™  (t.ex. tabellen som visar alla datamängder) Sorterades så att A.Z sorterades före en..z. Nu sorterar de på ett fallskänsligt sätt.
    * Små ändringar av .subset-webbsidorna, inklusive: enheter är nu angivna.
    * GenerateDatasets Xml och DasDds kastar inte längre ett undantag om det inte går att sätta resultaten på systemklippet eller displayInBrowser. Tack vare Eric Bridger och Greg Williams.
    * Bug fix: När dataset laddas,ERDDAP™nu tar bort eller justerar de geospatiala globala attributen. Tack vare Charles Carleton.
    * Bug fix: String2.getClassPath () nu korrekt procent avkodar klassen Vägen (I synnerhet, på Windows, uppträdde utrymmen i filnamnet som %20) . Detta påverkadeERDDAP™EDStatic ringer SSR.getContextDirectory () Hitta innehåll/erddap. Tack Abe Coughlin.
    * Bug fix: i EDDTableFromFiles relaterade till getDataForDapQuery hantering av distinkt () Förfrågningar. Tack till Eric Bridger.
    * Bug fix:tabledapFörfrågningar hanterade inte korrekt höjdbegränsningar när datamängdens höjd MetersPerSourceUnit var -1. Tack till Eric Bridger.
    * Bug fix: EDDTableFrån... Filer dataset hanterar nu korrekt förfrågningar som inkluderar =NaN och &#33; =NaN.
    
## Version 1.28{#version-128} 
 (släppt 2010-08-27) 

*    **Nya funktioner:** Ingen.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** Ingen.
*    **Bug Fix:** Fixa ett programmeringsfel (endast i ver 1.26) Detta gjordeERDDAP™Mycket långsamt.
     

## Version 1.26{#version-126} 
 (släppt 2010-08-25) 

*    **Nya funktioner:** Ingen.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** 
    * Från din\\[Tomcat\\]/content/erddap/setup.xml,
        * Inom&lt;laglig &gt;, på en ny linje nedan\\[standard DataLicenses\\]Infoga\\[StandardKontakt\\].\\[StandardKontakt\\]hänvisar till&lt;adminEmail&gt; specificerad högre upp i setup.xml.
        * Ta bort&lt;tableCommonBGColor&gt; och&lt;TabellHighlightBGColor&gt;.
        * Rekommenderas: Förändring&lt;endBodyHtml&gt; till
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Krav: Till din\\[Tomcat\\]/content/erddap/images/erddap.css och erddapAlt.css, lägg till längst ner:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Bug fixar och små förändringar:** 
    
    * Bug fix: i vissa situationer fungerade inte formulär i vissa versioner av Internet Explorer. Tack så mycket för Greg Williams.
    * Bug fix: Make A Graph-knapparna fungerade inte om datamängden var från en fjärrkontrollERDDAP.
    * Bug fix:WMSIbland fungerade inte om datamängden var från en fjärrkontrollERDDAP.
    * Många små förändringar och buggfixar.
    

## Version 1.24{#version-124} 
 (släppt 2010-08-06) 

*    **Nya funktioner:** 
    * Nytt nytt[Subset webbsidor](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)Använda införd sökning för att välja delmängder av tabular datamängder. Tack vare POST.
    * Nytt nytt[Avancerad sökning](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)kombinerar alla andra sökalternativ och lägger till longitud, latitud och tidsbundna lådor. Tack vare Ellyn Montgomery. (Förlåt för förseningen.) 
    * Nytt nytt[Konvertera tiden](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)webbsida och service låter dig konvertera numeriska tider till/från ISO strängtider.
    * Nytt nytt[Konvertera enheter](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)webbsida och service låter dig konverteraUDUNITStill/från UCUM-enheter. Tack vareNOAAIOOSSOS.
    * Om entabledapFörfrågan inkluderar &units ("UCUM") Enhetsnamnen konverteras från originalnamn (vanligen vanligen vanligen vanligtvisUDUNITS) att[UCUM](https://unitsofmeasure.org/ucum.html)enheter namn. Detta påverkar endast enheter\\*Namn\\*Inte datavärden. Tack vareNOAAIOOSSOS.
    * Förbättringar för att göra en grafwebbsidor och grafer och kartor:
        * Om diagrammet är en karta finns det nya Make A Graph-knappar för att zooma in / ut och ett nytt alternativ att klicka för att ändra kartans mittpunkt. Tack vare POST.
        * Filterinställningar läggs till nära botten. Tack vare Greg Williams.
        * De inbyggda datafilerna på kusten uppdaterades till GSHHS v2.0. Tack vare POST.
        * Kartor inkluderar nu sjöar och floder. Tack vare POST. (Sorry, Sacramento River Delta saknas eftersom varken kusten data eller sjön/river dataset handlar om det.) 
        * De inbyggda i pscoast-härledda land/state filer uppdaterades. Tack vare POST.
        * Topography.cpt ändrades något. (Förlåt om detta påverkar dig negativt.) Tack vare POST.
        * I griddap's Make A Graph, om en användare ändrar en variabel, skickas formuläret automatiskt så att formuläretaxisVariables' showStartAndStop återspeglar alltid grafvariablerna. Tack till Joaquin Trinanes.
        * För png och pdf bild URL:er:
            * New &.land=_value_, där _value_ kan vara "under" (Visa topografi) Eller "over" (Bara visa badymetri) . Om inte specificeras anges standarden för[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)in idatasets.xmleller setup.xml. Tack vare POST.
            * Nya: Linjer i legenden som är för långa bryts automatiskt in i flera rader. Tack vare POST.
        * För png bild URL:er:
            * New &.legend=_value_, där _value_ kan vara "Bottom" (Default) "Off" eller "Only". Detta låter dig inkludera legenden, utesluta legenden, eller få bara legenden. Tack vare Cara Wilson.
            * New &.trim=_n Pixels lämnar en gräns på nPixels (t.ex. 10) längst ner på bilden. Den tillämpas efter .legend=Off. Tack vare Cara Wilson.
            * New &.size=_width_|_height_ låter dig ange bredden och höjden för bilden, i pixlar.
    * Nya utdatafilformat:
        * .csvp och.tsvP - som .csv och.tsvMen med " (_units_) "Vänds till kolumnnamn på den första raden.
        * .odvTxt - gör en .txt-fil som förenklar att få data i[Ocean Data Utsikt (ODV) ](https://odv.awi.de/).
        * .esriCsv - gör en .csv-fil lämplig för import i ESRI: sArcGIS. (tabular dataset endast) Tack till Jan Mason, Jeff de La Beaujardiere, ochNOAAIOOSSOSprojekt.
    * GUI förbättringar till[Kategorisera](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)webbsidor. Också kategorisera värden (annat än institution) är nu alla lägre. Icke-lowercase förfrågningar accepteras (omdirigerad) för bakåtkompatibilitet. Tack till Roy Mendelssohn.
    * Felmeddelanden är nu ännu kortare och mer inriktade på användarna. Tack vare Greg Williams.
    * En intern förändring som kraftigt minskarERDDAPbasminneanvändning.
    * Många nya funktioner som endast är relevanta för POST-projektet.
*    **Saker att göra sakerERDDAP™Administratörer behöver veta och göra:** Det finns massor av förändringar. Förlåt. Men var och en ger några fina fördelar.
    * Stora förändringar i GenerateDatasetXml - det ställer nu ofta fler frågor (se relevant[Dataset Typer](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)Information om information) och genererar nu alltid i huvudsak färdigt innehåll fördatasets.xml. Du är fortfarande ansvarig för installationen, så du bör fortfarande granskadatasets.xmlinnehåll innan du använder det. En mänsklig ansträngning i projektet kommer alltid att göra bättre än ett datorprogram. Tack vare UAF-projektet.
    * REQUIRED: I setup.xml måste du revideraWMSsektion. Det bör nu inkludera dessa taggar (Känn dig fri att ändra värdena) Från:
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUIRED: I setup.xml, kopiera och klistra in denna nya föreslagna&lt;StartHeadHtml&gt; för att ersätta din gamla version. Känn dig fri att göra ändringar för dina preferenser.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Tack vare POST, Hans Vedo och Rick Blair.
    * REQUIRED: I setup.xml, in&lt;StartBodyHtml&gt;, ändra&lt;kropp&gt; tag för att bara vara&lt;kropp&gt;, eftersom stilen nu är inställd av erddap.css.
    * REQUIRED: I setup.xml, ändra till detta&lt;endBodyHtml&gt; (men ändra e-postadressen till din e-postadress och känn dig fri att göra andra ändringar) Från:
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * HIGHLY RECOMMENDED: I setup.xml, den rekommenderade&lt;TheShortDescriptionHtml &gt; är nu
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Känn dig fri att ändra detta, särskilt den sista meningen i första stycket.
    * I setup.xml, emailEverythingTo och emailDailyReport För att nu kunna vara komma-separerade listor över e-postadresser. Det första e-postmeddelandetAllt För att vara speciell, t.ex., abonnemang till EDDXxxFromErddap dataset använder den e-postadressen. Tack till John Maurer.
    * E-postfel är nu inloggade på\\[bigParentDirectory\\]/loggar/emailLogYYY-MM-DD.txt-fil.
    * I setup.xml finns en ny, valfri parameter för att ställa in e-postkontoegenskaper (vanligen direkt efter&lt;emailPassword&gt;):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Standarden är ingenting. Tack vare Rich Signell.
    * REQUIRED: Om du använder EDDTableCopy ellerEDDGridKopiera, du måste göra allt\\[bigParentDirectory\\]/kopi / kataloger och filer som innehåller "xh" i katalogen eller filnamn efter att ha stoppat det gamlaERDDAP™och innan den nyaERDDAP™Så dessa filer kommer att kopieras igen. Jag är väldigt ledsen, men det var viktigt att göra förändringen och förhoppningsvis påverkar det få administratörer och få filer.
I Linux kan du hitta dessa filer med cd\\[bigParentDirectory\\]/copy
Hitta .\\*xh\\*  
I Windows kan du hitta dessa filer med, Starta|Sök efter Sök
Vad vill du söka efter: Dokument
Alla eller delar av filnamnet: xh
Titta in: Bläddra -&gt;\\[bigParentDirectory\\]/copy
Klicka på "Sök"
^ A för att välja dem alla
Del för att radera dem alla
    * REQUIRED: Idatasets.xml, för EDDTableFromDatabase dataset, för datum och tidsstämpel variabler, ändra data Skriv till dubbla och enheterna till sekunder sedan 1970-01-01T00:00:00Z. Vi kräver att du lagrar tidsstämpeldata i databasen\\*med\\*en tidszon. Utan tidszonsinformation, de frågor somERDDAP™skickar till databasen och resultaten somERDDAP™Kommer från databasen via JDBC är tvetydiga och kommer sannolikt att vara fel. Vi försökte, men fann inget tillförlitligt sätt att hantera "timestamp utan tidszon" data. Vi tror att detta är bra praxis ändå. När allt kommer omkring har "timestamp utan tidszon" data en underförstådd tidszon. Även om det är bra att tidszonen är uppenbar för databasadministrationen, är det meningsfullt att ange det uttryckligen så att annan programvara kan interagera korrekt med din databas. Tack/förlåt Michael Urzen.
    * HELIG RECOMMENDED: Idatasets.xml, för att aktivera .subset-webbsidor för införd sökning av dina tabelldatamängder, måste du lägga till [&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariables) till datasetets globala attribut.
    * Rekommenderad: Idatasets.xmlOm du har dataset meddatasetID= "pmelGtsppp", vänligen ändra det för att vara
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * Rekommenderad: Idatasets.xmlDet finns nya giltiga alternativ för [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) globalt attribut, så du bör granska / ändra värdet för dina datamängder.
    * Inomdatasets.xmlDen nya [&lt;sourceNeedsExpandedFP\\_EQ & gt;] (/docs/server-admin/datasets#sourceneedsexpandedfp_eq) är till hjälp om källservern inte hanterar och_variable_value_ korrekt (på grund av[Allmänna svårigheter att testa jämlikheten i flytande punktnummer](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . sourceNeedsExpandedFP\\_EQ är inställd på sant som standard (Den säkraste inställningen) Så du behöver inte göra några ändringar.
    * Nytt nytt[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Tack till Jerry Yun Pan.
    * Nytt nytt[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Tack till Roy Mendelssohn.
    * Förändringar till[EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)låter den användas med ett bredare utbud av filer.
    * EDDTableFromBMDE har inaktiverats. Det finns inte längre några aktiva, lämpliga, datakällor.
    * I GenerateDatasetXml, den nyaEDDGridFrånThredds Katalog skördar en hel THREDDS katalog (eller en subset) och genererardatasets.xmlinnehåll. Tack vare UAF-projektet.
    * GenerateDatasets Xml och DasDds sätter nu också sina resultat i\\[bigParentDirectory\\]/logs/log.txt. Tack vare Rich Signell och Charles Carleton.
    * Många förbättringar av inloggningssystemet. Tack vare POST.
*    **Saker att göra sakerERDDAP™Programmerare Behöver veta och göra:** 
    * Det har skett förändringar i/WEB-INF/lib/katalogen. Vänligen ändra dina javac- och java-klasspath-inställningar därefter.
    * Det finns en ny\\[Dina dina Url\\]/erddap/version service för att bestämma versionen av enERDDAP. Svaret är text, t.ex.ERDDAP\\_version=1.24 Om du får ett HTTP 404 felmeddelande, behandlaERDDAP™som version 1.22 eller lägre. Tack vare POST.
*    **Små förändringar och buggfixar:** 
    
    * EDDTableFrån Förändringar:
        * Släppt stöd för att läsa IOOSSOSXML svar.
        * Tillagt stöd för att läsa IOOSSOStext/csv. (NOSSOSservrar som för närvarande inte stöds.) 
        * Gjorde massor av förändringar relaterade till IOOSSOSserveruppgifter.
        * Tillagt stöd för BBOX frågor för IOOSSOSochOOSTethys SOSservrar. Dessa ändringar resulterar i en stor hastighet upp för relevanta dataförfrågningar. Tack till IOOSSOS.
    * Text i.matTabular datafiler sparas nu korrekt. Tack till Roy Mendelssohn.
    *   WMS
        *   OpenLayersär nu bundled medERDDAP™för användning påWMSwebbsidor. Detta åtgärdar problemet som orsakas närOpenLayersförändrades för några månader sedan och förhindrar framtida problem.
        * I denWMS GetCapabilitiessvar,&lt;OnlineResource &gt; värde är nu webbadressen tillWMSservice. Tack vare Charlton Galvarino.
        * En legend visas påWMSwebbsida för att visa färgfältet. Tack vare Emilio Mayorga.
    *   EDDGridAggregateExistingDimension konstruktion hade problem om en axelkälla Värden var inte lika med sin destination Värden, t.ex. om källtid var något annat än"seconds since 1970-01-01". Tack vareToddSpindler.
    * I TableWriterGeoJson, överskottet ", efter bbox\\[......\\]har tagits bort. Tack till Greg Williams.
    * Många små förändringar och buggfixar.
    
## Version 1.22{#version-122} 
 (släppt 2009-07-05) 

* SlideSorter bugg infördes i 1,20 är fast.
* OBIS-buggen som infördes i 1,20 är fast.
* Hänvisningarna till Jason dataset på bilderna/gadgets/GoogleGadgets-sidan togs bort.
     
## Version 1.20{#version-120} 
 (släppt 2009-07-02) 

*   ERDDAP™administratörer, lägg till detta i din setup.xml-fil:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Nya datasettyper[EDDGridKopiera](/docs/server-admin/datasets#eddgridcopy)och[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)göra och upprätthålla en lokal kopia av en annanEDDGrideller EDDTable dataset data och servera data från den lokala kopian. Dessa är mycket lätta att använda och mycket effektiva **lösningar på några av de största problemen med att servera data från fjärrdatakällor:** 
    
    * Att komma åt data från en fjärrdatakälla kan vara långsamt (Av olika skäl) .
    * Fjärrdatasetet är ibland otillgängligt (igen, av olika skäl) .
    * Att förlita sig på en källa för data skalas inte bra (när många användare och mångaERDDAPAnvänd den) .
    
Dessutom är den lokala kopian en säkerhetskopia av originalet, vilket är användbart om något händer med originalet.
    
Det finns inget nytt om att göra en lokal kopia av en dataset. Vad som är nytt här är att dessa klasser gör det\\*lätt\\*att skapa och\\*upprätthålla\\*en lokal kopia av data från en\\*variation\\*av typer av fjärrdatakällor och\\*Lägg till metadata\\*medan du kopierar data.
    
Dessa datamängder är en del av en komplett uppsättning funktioner som förenklar skapandet av[nät/kluster/federationer avERDDAPs](/docs/server-admin/scaling)hantera mycket tunga laster (t ex i ett datacenter) .
    
* Ny dataset typ[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)får data från en lokal eller fjärrdatabastabell.
*   ERDDAP™Nu har en[Säkerhet](/docs/server-admin/additional-information#security)System som stöder autentisering (låta användare logga in) och tillstånd (ge dem tillgång till vissa privata datamängder) .
* Det finns[två, nya, kommandoradsverktyg](/docs/server-admin/datasets#tools)för att hjälpaERDDAP™administratörer genererar XML för en ny dataset idatasets.xmlFrån:
    * GenerateDatasets Xml kan generera ett grovt utkast av dataset XML för nästan alla typer av dataset.
    * DasDds hjälper dig att upprepade gånger testa och förfina XML för en dataset.ERDDAPGenerateDatasets Xml webbsidor har tagits bort. Av säkerhetsskäl stödde de bara några datasettyper. De nya kommandoradsverktygen är en bättre lösning.
* Den nya[Statussidan](/docs/server-admin/additional-information#status-page)Låter någon (men särskilt administratörer) Visa status för enERDDAP™från någon webbläsare genom att gå till\\[basUrl\\]/erddap/status.html.
* Tabledap stöder nu[Server-side funktioner](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions)Från:
    * och distinkt () tar bort dubbla rader från svarstabellen,
    * ochorderBy (......) låter dig ange hur svarstabellen ska sorteras,
    * ochorderByMax (......) låter dig ange hur responstabellen ska sorteras och ta bort alla rader förutom raderna med maximala värden i den sista angivna kolumnen. Detta kan till exempel användas för att få de sista tillgängliga uppgifterna för varje station.
* Tabular dataset kan nu inkludera ytterligare datumTime variabler som inte heter"time". Dessa variabler erkänns av deras "enheter" metadata, som måste innehålla" since "  (för numeriska datum Tid) eller "yy" eller "YY" (för formaterad String dateTimes) . Men vänligen använd fortfarandedestinationName "time"för huvuddatumet Tidsvariabel.
*   ERDDAP™genererar nu en[Sitemap.xml](/docs/server-admin/additional-information#sitemapxml)fil, som berättar sökmotorer att dinERDDAPbehöver bara krypas varje månad.ERDDAP™administratörer, vänligen följ[Dessa instruktioner](/docs/server-admin/additional-information#sitemapxml)att meddela sökmotorerna om den nya sitemap.xml-filen.
*   ERDDAPFelmeddelanden är nu mycket kortare och inriktade på kunder (Inte programmerare) . Tack till Greg Williams.
* [Och [Gud]&lt;FörfråganBlacklist] (/docs/server-admin/datasets#requestblacklist) Nu stöder också IP-adresser där det sista numret har ersatts med \\*.
* Begäran om.jsonoch .geoJson-filer kan nu inkludera en valfri[Jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)Förfrågan genom att lägga till "&.jsonp=_functionName_ till slutet av frågan. I grund och botten säger detta baraERDDAP™Lägg till "_functionName_ (Till början av svaret och ") Till slutet av svaret. Om det ursprungligen inte fanns någon fråga, lämna "&" i din fråga. Tack vare Greg Williams.
* Massor av ny statistik lades till i[Daglig rapport](/docs/server-admin/additional-information#daily-report).
* På webbsidor med listor över datamängder, institution och id är nu höger. Detta flyttar abonnemang och andra mer användbara kolumner i sikte på smala datorskärmar.
* På alla webbsidor, sidans titel (baserat på&lt;titel&gt; i&lt;StartHeadHtml&gt; som du definierar i setup.xml) ändras för att inkludera en bättre beskrivning av webbsidan (till exempel genom att inkludera den aktuella datamängdens titel och institution) .
* Xmx-information ingår nu med minnesinformationen tryckt i log.txt, Daily Report och på status.html. Tack vare Ellyn Montgomery.
*   ERDDAP™har ytterligare allmänt skydd mot alla fel (Till exempel OutOfMemoryError) . Tack vare Charles Carleton.
* Förbättringar av felhantering om svaret redan har begåtts.
* EDDTableFromFiles ochEDDGridFrånFiles nu bara tillåta&lt;metadataFrån första eller sista. Penultimate stöds inte längre. Och först och sista är nu baserade på filernas sistaModifiedTime.
* Bug fix: i EDDTableFromSOSogiltig info för en station kastade ett undantag och orsakade att hela datamängden avvisades. Nu ignoreras dessa stationer bara (och felmeddelandet är inloggat på log.txt) . Tack vare Rick Blair.
     

## Version 1.18{#version-118} 
 (släppt 2009-04-08) 

* Bug fix: Börjar i 1.14, EDDTable Data Access Form och Gör en Graph webbsida inte korrekt hantera citerade begränsningar.
* Bug fix: Från och med 1.14 hanterade EDDTableFromDapSequence inte tidsbegränsningar korrekt om källtidsenheterna inte var "sekunder sedan 1970-01-01T00:00:00".
     

## Version 1.16{#version-116} 
 (släppt 2009-03-26) 

*   ERDDAP™administratörer:
    * Detta är en viktig release eftersom det fixar en bugg som lämnade enERDDAP™tråd körning om du använde Tomcat Manager för att stoppa / starta eller laddaERDDAP. Så när du installerar 1.16, använd inte bara Tomcat-chefen för att distribuera den gamlaERDDAP™och distribuera det nyaERDDAP. Istället: **Distribuera det gamlaERDDAP™Omstart Tomcat (eller servern) Sedan distribuera den nyaERDDAP.** Det är alltid en bra idé att göra det när du installerar en ny version.
    * Vänligen lägg till [&lt;requestBlacklist &gt;&lt;/requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) till dindatasets.xml. Detta kan användas för att ange en lista över klient IP-adresser som ska blockeras (t.ex. att avvärja en Denial of Service-attack eller en alltför ivrig webbrobot) .
* Det finns nu en\\[bigParentDirectory\\]/logs katalog för att hållaERDDAP™loggfiler. När du börjarERDDAP™Det gör en arkivkopia av log.txt och log. Txt.previous filer med en tidsstämpel. Om det fanns problem innan omstarten kan det vara användbart att analysera dessa filer.
*   ERD"SERDDAP™Nu har prenumerationssystemet aktiverats.
*   ERDDAP™Återigen tillåter (Men fortfarande inte rekommenderar) "%26" kodning av "&" på begäran URL (se[relaterad v1.14 förändring](#percent26)) .
* Flera nya tillägg till Tally-delen av[Daglig rapport](/docs/server-admin/additional-information#daily-report).
* Små buggfixar i genereraDatasetsXml.
* Några små buggfixar.
     

## Version 1.14{#version-114} 
 (släppt 2009-03-17) 

* Ändringar för användare:
    * I begäran om nätdata,ERDDAP™Nu stöder:[Förra-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)där n är ett heltal antal index och[ (Sista-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)där d är ett numeriskt värde (För tid är det i sekunder) .
    * I tabelldataförfrågningar kräver strängbegränsningar nu[dubbla citat](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)runt värdet, till exempel, &id="NDBC40121" Detta krävs avDAPprotokoll.
    * i tabelliska dataförfrågningar,ERDDAP™Nu kräver det att[Alla begränsningar är korrekt procent kodade](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Webbläsare gör detta automatiskt, så det påverkar mestadels datorprogram/skript som kommer åtERDDAP.
#### Procent26{#percent26} 
*   [Tidigare,](#percent26)och[bädda in en graf webbsida](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)och[ERDDAP™Google Gadget webbsida](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)sade att ersätta "&" i bildens URL med "% 26". Från och med nu bör du ersätta "&" i bildens URL med "&amp;". Så du måste ersätta alla "%26" på befintliga webbsidor och Google Gadgets med "&amp;". (Förlåt) 
*   ERDDAP™administratörer, vänligen:
    * Lägg till följande till din[setup.xml](/docs/server-admin/deploy-install#setupxml)fil (och ändra flaggan KeyKey värde) Från:
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * På linjen efter&lt;emailUserName&gt; i din[setup.xml](/docs/server-admin/deploy-install#setupxml)fil, add
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
och ange ditt riktiga lösenord.
    * Du kan ändra&lt;wmsSampleBox &gt; i din[setup.xml](/docs/server-admin/deploy-install#setupxml)fil för att inkludera longitudvärden upp till 360, t.ex.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * I dindatasets.xmlfil, byta namn på datasettypen EDDTableFromNc4DFiles till EDDTableFromNcFiles (som nu stöder filer med ett antal dimensioner) . Om du hade en EDDTableFromNc4DFiles dataset:
        
        1. Du måste ändra till typ = "EDDTableFromNcFiles" i dina datamängder. XML fil.
        2. Du måste lägga till en&lt;nDimensions&gt; 4.4 4.&lt;/nDimensions&gt; tagga till datasetets XML.
        3. Du kan lägga till den nya&lt;sortFilesBySourceNames&gt; taggen för att ange den interna ordningen för filerna, som bestämmer den övergripande ordningen för de data som returneras.
        
För detaljer, se[EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles).
    * I det förflutna, för EDDTableFromDapSequence, förOPeNDAPDRDS servrar, idatasets.xmlVi använde&lt;sourceCanConstrainStringsRegex &gt;&lt;/sourceCanConstrainStringRegex&gt;. Men vi ser nu att DRDS regex stöd är mer begränsat änERDDAPSå vi rekommenderar&lt;sourceCanConstrainStringsRegex&lt;/sourceCanConstrainStringRegex&gt; så att regexbegränsningar inte överförs till källan, utan hanteras istället avERDDAP.
    * Revampad hantering av sourceCanConstrain... in idatasets.xmlav[EDDTableFromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence)och (internt) alla EDDTable dataset typer. Det nya systemet är enklare och bättre återspeglar variationen i olika datakällor. Du kan behöva ändra XML för dina datamängder idatasets.xml.
* Det finns flera nya funktioner som är användbara av sig själva, men i kombination underlättar också skapandet av[nät/kluster/federationer avERDDAPs](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Nya datasettyper:
        *   [EDDGridFrånErddap](/docs/server-admin/datasets#eddfromerddap)och[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)som låter enERDDAP™inkludera en dataset från en annanERDDAP™på ett mycket enkelt och mycket effektivt sätt.
        *   [EDDGridFrånFiles](/docs/server-admin/datasets#eddgridfromfiles)  (och dess underklass,[EDDGridFrånNcFiles](/docs/server-admin/datasets#eddgridfromncfiles)som kan läsaNetCDF .ncGRIB .grb ochHDF .hdffiler filer) .
        *   [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)som kan läsaNetCDF .ncsom har en bordsliknande struktur.
    * RunLoadDatasets och LoadDatasets revampades så attERDDAP™är mycket lyhörd att ladda om dataset baserat på filer i[flagga](/docs/server-admin/additional-information#flag)Katalog (ofta&lt;5 sekunder om huvudlastDatasets för närvarande görs).
    * Ny tjänst för att tillåta[En URL för att skapa en flaggfil](/docs/server-admin/additional-information#set-dataset-flag)för en viss datamängd, t.ex.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
skapar en flaggfil i flaggkatalogen för rPmelTao (Även om flaggan Nyckeln här är fel) .
    * Nytt nytt[Prenumeration](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)service så att alla kunder kan ange en åtgärd som kommer att göras när en viss dataset skapas (När närERDDAP™Återstartas) och när datamängden ändras på något sätt. Detta system kan inaktiveras via&lt;abonnemangSystemActive &gt; i din[setup.xml](/docs/server-admin/deploy-install#setupxml)fil. ochERDDAP™ [Daglig rapport](/docs/server-admin/additional-information#daily-report)Nu listar alla abonnemang och innehåller den URL som behövs för att avbryta var och en, om du känner att systemet missbrukas. Inomdatasets.xmlDet finns en ny, valfri [&lt;Prenumeration EmailBlacklist] (/docs/server-admin/datasets#subscriptionemailblacklist) tag så att administratörer kan ange en komma-separerad lista över e-postadresser som omedelbart är svartlistade från prenumerationssystemet.
    * Ny [Nästa]&lt;OnChange (/docs/server-admin/datasets#onchange) attribut idatasets.xmlLåterERDDAP™administratören specificerar en åtgärd som görs när en specifik dataset skapas (När närERDDAP™Återstartas) och när datamängden ändras på något sätt.
    * Förbättringar av fullständig textsökning: lagra söksträngen för varje datamängd använder nu 1/2 minnet. Sökalgoritmen (Boyer-Moore-liknande) Nu är 3X snabbare.
    * E-post frånERDDAP™Förbered alltid ämnet och innehållet med\\[Erddap Url\\]för att det skall bli klart,ERDDAP™Detta kom från (Om du administrerar fleraERDDAPs) .
    * Mer omfattande statistiksamling för[Daglig rapport](/docs/server-admin/additional-information#daily-report)e-post.
    * Ny log file\\[bigParentDirectory\\]/emailLogYEAR-MM-DD.txt loggar alla e-postmeddelanden som skickas avERDDAP™varje dag. Detta är särskilt användbart om din server inte kan skicka e-postmeddelanden - du kan åtminstone läsa dem i loggen.
    *   ERDDAP™Nu gör en\\[bigParentDirectory\\]/cache/ (datasetID) katalog för varje dataset eftersom det kan finnas massor av filer cachade.
* Nytt nytt[RSS2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)foder för varje dataset (Leta efter orangeRSSikoner på listor över dataset, Data Access Forms och Gör en Graph-webbsidor) .
*   EDDGrid .kmlsvar använder nu lutade bilder ("superoverlays" - dynamiskt genererade quadtree bilder) . Den första bilden laddas in i GoogleEarth mycket snabbare än tidigare. Upplösningen av kartan ökar när du zoomar in, upp till den fullständiga upplösningen av datamängden. Rekommendation: Användare bör begära.kmlför en gång, men datamängdens hela longitudområde. Tyvärr togs stöd för tidsintervall bort (Hoppas det kommer tillbaka) .
*   ERDDAP™nu adds[Förfaller och Cache-Control max-age headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)till alla filer som begärts från katalogen / bilder. Detta minskar kraftigt antalet statiska filförfrågningar som skickas tillERDDAPoch därmed i hög grad påskyndar mestERDDAP™sida laster. Och mångaJavaSkriptfilreferenser flyttade till botten av sina HTML-sidor, vilket också påskyndar mångaERDDAP™sida laster. Tack vare boken "High Performance Web Sites" av Steve Souders och ySlow tillägg till FireBug plugin i FireFox.
*   ERDDAP™bytte från netcdf-java 2.2.22 till netcdf-java 4.0. Bland annat tillåter dettaEDDGridFrånNcFiles att läsaHDF .hdfsamt GRIB .grb ochNetCDF .ncfiler.
*   EDDGridFromDap ochEDDGridFromNcFiles stöder nu även DArray (samt DGrid)  dataVariables. Om en dimension inte har en motsvarande koordinatvariabel,ERDDAP™skapar en axelvariabel med indexvärdena (t.ex. 0, 1, 2, ..., 311, 312) . Så alla andra aspekter avEDDGridförblir densamma:
\\**** \\******************************************************************************************************************************************************************************************************************************************************** Det tjänar fortfarande alla datamängder som Grids, med en axelvariabel för varje dimension.
\\**** \\******************************************************************************************************************************************************************************************************************************************************** Kärnor kan fortfarande begära värden från axelvariablerna.
Tack vare Charles Carleton, Thomas Im, Dorian Raymer och andra.
* ochWMS OpenLayerssidor har nu en standard longitud,latitudintervall som är lite större än datasetets sortiment (inte det exakta intervallet, så sammanhanget med små datamängder är mer uppenbart) . Standardintervallet kan nu också vara 0 till 360, vilket gör att hela utbudet av många datamängder visas nu. Tack vareToddSpindler.
* Nya reglage på vissa Data Access Forms och Gör en Graph-webbsidor. De förenklar (rå) Specifikation av önskad data och erbjuder bra visuell feedback.
* Ett nytt alternativ för&lt;Dataset&gt; taggar indatasets.xmlFrån:[aktiv="falsk"](/docs/server-admin/datasets#active).
* Hänvisningar tillERD"SERDDAP™ändrad från kustwatch.pfel (fungerar fortfarande via proxy) till kustwatch.pfeg (Föredrog) .
* Nytt stöd för[data\\_minochdata\\_max](/docs/server-admin/datasets#data_min-and-data_max)Variabel metadata attribut.
* En partiell lösning på[WaitThenTryAgain / Partiella resultat undantag](/docs/server-admin/additional-information#waitthentryagain-exception)Från: Vissa förfrågningar som tidigare misslyckats när en datakälla ändrades kommer att lyckas eftersomERDDAP™kommer att ladda om datamängden och begära om data automatiskt, allt i samband med den ursprungliga begäran.
* Bug fix: generera Dataset Xml inaktiverades iERDDAP™version 1.12. Tack till Ellyn Montgomery för att du pekar ut det här.
* Små förändringar i felhantering.
* Många förbättringar för att undvika / hantera eventuella rasvillkor (d.v.s. eventuella problem som härrör från den mångfasade naturenERDDAP) som orsakade små, sällsynta problem.
* Nu, om ett felmeddelande är skrivet på en bild, kommer bilden bara att stanna i cache för ~ 5-10 minuter. (Inte 60) . Tack vare Cara Wilson.
* Standardmeddelandet när det inte finns några data är nu "Din fråga producerade inga matchande resultat.", vilket är kortare, mer exakt och matcherOPeNDAPservrar.
*   EDDGridinte längre tillåter bundna axelvärden.
* Små ändringar i .ver och .help-förfrågningar.
* Många små förändringar och buggfixar.
     

## Version 1.12{#version-112} 
 (släppt 2008-10-31) 

* EDDTableFrånSOSÅterigen arbetar med NDBCSOSoch arbetar med nya NOSSOS.
* EDDTableFromBMDE kräver nuERDDAP™admin att specificeradataVariables.
*   EDDGridinte längre kräver att lat och lon vara jämnt fördelade för . transparent transparent transparent Png eller.kml. Tack vareToddSpindler.
* Några små förändringar.
     

## Version 1.10{#version-110} 
 (släppt 2008-10-14) 

* Ny "colorBar" metadata för datavariabler idatasets.xmldefinierar standardfärgfältets inställningar för grafer och kartor. Se[Mer information](/docs/server-admin/datasets#color-bar-attributes). Detta är viktigt eftersom det kraftigt förbättrar utseendet på standardgrafer och kartor som produceras av Make A Graph och eftersom standarddiagrammen och kartorna nu har en konsekvent färgfält även när kunden ändrar den begärda tiden eller geografiska intervallet. Detta var också nödvändigt förWMS.
*   ERDDAP™Nu tjänar de flesta nätdata via enWMSservice. Detta är viktigt eftersom det visar att förutom att få data från många typer av dataservrar,ERDDAP™kan distribuera data via olika protokoll (DAP,WMS... mer i framtiden) . Se[Kunddokumentation](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Eller[dokumentation för administratörer](/docs/server-admin/datasets#wms). Eller[Prova det](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Nytt stöd för longitudvärden &gt;180 in.kmlfiler.
* Ny cdm\\_data\\_type: Övrig.
*   ERDDAP™stöder nu "boolean" källdataType. Se[Mer information](/docs/server-admin/datasets#boolean-data)Detta kommer att bli användbart för framtida EDDTableFromDatabase.
* Ny EDDTableFromBMDE stöder DiGIR/BMDE datakällor.
* EDVGridAxis tillåter nu nedstigande sorterade värden. PmelOscar datamängder behövde detta.
*   ERDDAP™Nu returnerar HTTP-fel (t.ex. "404 för resurs/sidor som inte finns") i fler situationer, istället för HTML-sidor med felmeddelanden.
* Massor av förändringar/tillgångar tillERDDAP™dokumentation.
* Massor av små förändringar.
* Några bug fixes.
*    **Saker att göra sakerERDDAP™administratörer bör göra för att uppgradera till denna version:** 
    * Inomdatasets.xmlför alla EDDTableFromSOSdatamängder, ändra "observedProperty" metadata till "sourceObservedProperty".
    * Reglerna för enaxisVariableellerdataVariable"SdestinationNameär nu[strängare](/docs/server-admin/datasets#datavariable-addattributes). Du måste kontrollera att dina variabla namn är giltiga. Kontrollera dem för hand eller körERDDAP™och titta på felmeddelandena i rapporten som skickas till administratören.
    * Inomdatasets.xmlOm du vill att en nätdatavariabel ska vara tillgänglig viaWMSDu måste lägga till färgBar metadata. Åtminstone till exempel,&lt;Att namn="colorBarMinimumTyp = "dubbel"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Se[Mer information](/docs/server-admin/datasets#wms).
    * Lägg till följande till din[setup.xml](/docs/server-admin/deploy-install#setupxml)fil (men anpassa den med din information) Från:

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Version 1.08{#version-108} 
 (släppt 2008-07-13) 

* En ny webbtjänst iERDDAP™generera Dataset Xml, hjälperERDDAP™administratörer genom att skapa ett grovt utkast till XML som behövs för att beskriva en datamängd idatasets.xml
* Vissa ändringar / buggfixar relaterade till att tillåta griddap ses av netcdf-java som en opendap-server, inklusive: global metadata är nu märkt "NC\\_GLOBAL" (I stället för "GLOBAL") .
* ochEDDGridoch EDDTable Data Access Forms använder nu frågeinformation i webbadressen. Så, till exempel, om en användare går från en Make A Graph-formulär till ett data Access-formulär, överförs begränsningarna nu korrekt.
*   tabledapMake A Graph tillåter nu begränsningar på String variabler.
* EDDTables Make A Graph tillåter nu NaN-begränsningar. Tack till Steve Hankin.
* Bug fix: EDDTable spara AsImage erkände inte ordentligt .colorbar min och max värden. Tack till Steve Hankin
* Många förbättringar för setupDatasetsXml. Tack vare Ellyn Montgomery.
* Griddap-förfrågningar tillåter nu () -stilförfrågningar något utanför det faktiska axelområdet. Detta är lämpligt eftersom () -värden avrundas till närmaste faktiska värde. Tack till Cindy Bessey
* Jag gjorde FloatArray och DoubleArray test av isEvenlySpaced mer sofistikerad. Det kommer alltid att vara ofullkomligt (eftersom testet skulle behöva anpassas för varje dataset) Men det borde vara bättre. Tack vare Ellyn Montgomery.
* Jag flyttade setup.html och setupDatasets Xml.html erddaps / nedladdningskatalog och hårdkodade alla länkar till dem. Nu kan jag göra ändringar och uppdatera installationsinformationen omedelbart.
* Många små förändringar. Några små buggfixar.
*    **Saker att göra sakerERDDAP™administratörer bör göra för att uppgradera till denna version:** 
    * Flytta&lt;TheShortDescription Html&gt; från dina meddelanden.xml till din[setup.xml](/docs/server-admin/deploy-install#setupxml)fil. Det anger texten som visas i mitten av vänster sida avERDDAP™Hemsidan. Lägg också till&lt;H1&gt;ERDDAP&lt;/h1&gt; (eller någon annan rubrik) till toppen av det. **Eller,** kopiera&lt;TheShortDescriptionHtml&gt; i den nya[setup.xml](/docs/server-admin/deploy-install#setupxml)fil (från den nya erddapContent.zip) till din setup.xml.
         

## Version 1.06{#version-106} 
 (släppt 2008-06-20) 

* Nytt stöd förIOOS DIF SOSdatakällor.
* Många små förändringar. Några små buggfixar.
     

## Version 1.04{#version-104} 
 (släppt 2008-06-10) 

* Ny Slide Sorter-funktion.
* Ny Google Gadgets sida och exempel.
* Bug fix iEDDGrid.saveAsNc för variabel med skala och addOffset.
     

## Version 1.02{#version-102} 
 (släppt 2008-05-26) 

* Nytt nyttEDDGridSideBySide möjliggör olikaaxisVariables\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]källa Värden.
* Alla strömmar och vinddatamängder slogs samman tillEDDGridSideBySide dataset.
* Bilder från bildförfrågningar är nu cachade i 1 timme.
     

## Version 1.00{#version-100} 
 (släppt 2008-05-06) 

* Gör en Graph-webbsidor och grafikkommandon i URL:er.
* Stöd för flaggfiler för att tvinga omladdning av en dataset.
* Ny datasettyp: EDDTableFrom4DFiles (Den första underklassen av EDDTableFromFiles) .
