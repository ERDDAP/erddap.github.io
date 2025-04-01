---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Ændringer

ERDDAP™er et fantastisk eksempel på[Bruger-Driven Innovation](https://en.wikipedia.org/wiki/User_innovation), hvor produktinnovation ofte kommer fra forbrugerne (ERDDAP™brugere) , ikke bare producenterne (ERDDAP™udviklere udviklere) . Gennem årene, de fleste ideer til nye funktioner og ændringer iERDDAP™er kommet fra brugere. Disse brugere krediteres nedenfor for deres store ideer. Tak&#33; Vær venligst opmærksom på de gode forslag, der kommer&#33;

Her er de ændringer, der er forbundet med hinandenERDDAP™udgivelse.

## Version 2.26{#version-226} 
 (udgivet 2025-02-?) 

*    **Til alle:** 
    * Stor opdatering til vores dokumentationsside: https://erddap.github.io/
 
Udover det opdaterede udseende er der forbedret navigation, søg, oversættelse, og det skal være nemmere at vedligeholde&#33;

*    **Nye funktioner og ændringer (for brugere) :** 
    * Abonnementer ogRSSopdateringer skal ske mere pålideligt for datasæt, der bliver opdateret ofte fra filændringer.

*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Standard release kræver/understøtterJavaversion 21. Tilbage i denne udgivelse er i stand til nemt at lave enJava17 kompatibel binær.

    * Ny funktion til at tilpasse de oplysninger, der vises om datasæt i UI. Vi forventer, at det er særligt nyttigt at tilføje ting som datasæt citationer. For flere detaljer kan du læse[Ny dokumentation](/docs/server-admin/display-info.md). Tak til Ayush Singh for bidraget&#33;

    * Yderligere Prometheus metrics. Den største er `http_request_duration_kunder', der indeholder anmodning svartider brudt ned af: "request_type", "dataset_id", "dataset_type", "fil_type", "lang_code", "status_code"
Denne maskine læsbar format vil give bedre samling af metrics til at forstå, hvordan brugerne bruger serveren.

    * Ny måde at generere ISO19115 XML-filer. Det bruger Apache SIS og er en ny mulighed i denne udgivelse. Aktiver det og send feedback.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI vil nu oprette individuelle links til hver url i felter som f.eks.infoUrlog opsummering.

    * Abonnementer ogRSSopdateringer skal ske mere pålideligt for datasæt, der bliver opdateret ofte fra filændringer. Hvis dette forårsager problemer, skal du komme ud på GitHub og deaktivere funktionaliteten ved at tilføje nedenstående flag til din opsætning.xml.
Ikke tilladt
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subset variabler vil ikke længere blive automatisk genereret til datasæt type EDDTableFraNcCFFiles. Hvis du var afhængig af adfærden, kan du enten (foretrukket løsning) Tilføj tilføjelsensubsetVariablestil definition af datasæt i dindatasets.xml, eller tilføj nedenstående flag til din opsætning.xml. Hvis du føler behovet for at dreje denne på, kan du komme ud på GitHub, så vi bedre kan støtte din brugstaske fremad.
Ikke tilladt
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * serveren vil nu omdirigere dokumentation anmodninger (under downloads/ hvilket er den dokumentation, der er blevet migreret) til det nye dokumentationswebsted. Hvis det er nødvendigt, kan du deaktivere dette med et flag i opsætning.xml:
Ikke tilladt
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Nogle små ændringer og fejlrettelser.

*    **For For For For ForERDDAP™Udviklere:** 
    * Mere kodekvalitetsforbedringer og død kodeoprydning. Dette omfatter mindre optimeringer, bedre håndtering af closable ressourcer og migration væk fra lange forældede datatyper (som Vector) .

    * Stor refactoring til EDStatic for at trække mest ud af config, besked og metrisk kode. Det også bedre indkapsler initialisering og håndtering af mappeer (disse sidste 2 har mere at blive gjort.) 

    * Masser af fremskridt mod et officielt understøttet Docker Image. Planen er at afslutte og frigive efter planenERDDAP™2.26 udgivelse er tilgængelig.

## Version 2.25{#version-225} 
 (udgivet 2024-10-31) 

*    **Nye funktioner og ændringer (for brugere) :** 
    * EDDTableFraFiles kan nu understøtte forespørgsler med kun afledt output (globale, jexl script eller variabler) .
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Version 2.25 kræverJava21 eller nyere. Dette er LTS-versionen og er blevet tilgængelig i over et år.
         
    * SharedWatchService er nu standarden. Hvis du har brug for at deaktivere det, bedes du kontakte chris. john på noaa.gov for at lade mig vide, så jeg kan forbedre den i fremtidige versioner og tilføje:
        &lt;BrugSharedWatchService&gt;false&lt;/useSharedWatchService&gt; til din opsætning.xml.
         
    * The The The The The The TheERDDAP™servlet starter nu på serverstart. Det betyder, at datasæt vil begynde at indlæse umiddelbart i stedet for at vente, indtil en anmodning er foretaget.
         
    * FjernMVRows parameter i EDDTableFraMultidimNcFiles vil nu have en effekt. At indstille det til falsk kan betydeligt fremskynde nogle forespørgsler, men det kan ikke være egnet til alle datasæt. For flere oplysninger se oplysningerne[beskrivelse af parameteren](/docs/server-admin/datasets#removemvrows).
         
    * Datasæt (EDDTableFraNcFiles ogEDDGridFraNcFiles) Brug af zarr-filer understøttes nu. De skal inkludere "zarr" i enten fileNameRegex eller stiRegex. Se billederne[zarr sekion i datasets dokumentation](/docs/server-admin/datasets#zarr)for flere detaljer.
         
    * Ny datasæt type, EDDTableFra parkFiles er nu understøttet. Se billederne[EDDTableFra parkFiles sekion i datasæt dokumentation](/docs/server-admin/datasets#eddtablefromparquetfiles)for flere detaljer.
         
    *   [Prometheus metrics](https://prometheus.io/)er nu tilgængelig på /erddap/metrics.
         
    * En ny XML parser implementering er tilgængelig. Denne nye parser gør det muligt at bruge XInclude idatasets.xml. Tak til Ayush Singh for funktionen.
         
    * Ny parameter idatasets.xmlat kontrollere usædvanlige aktivitet e-mails. usædvanligtAktivitet Usædvanlige standarder til den gamle værdi på 25%. Tak til Ayush Singh for funktionen.
         
    * Ny parameter i setup.xml, der kontrollerer, om datasæt indlæsning fejl vises på status.html side. Det er standarder til at deaktivere datasæt fejl på statussiden, indstille VisLoad FejlsOnStatusPage til falsk:&lt;VisLoad fejlsOnStatusPage&gt;false&lt;Klik her for at få flere oplysninger.
         
    * Nogle små ændringer og fejlrettelser.
         
*    **For For For For ForERDDAP™Udviklere:** 
    * Test adskilt til enhed og integration (langsom langsom langsom) tests. Også flere tests aktiveret og tests er blevet lavet mindre flaky.
         
    * Fejl Prone (Nogle kontroller er stadig deaktiveret) og Spot Bugs integreret gennem Maven.
         
    * Fuld kode base formateret til at matche Google Style Guide.
         

## Version 2.24{#version-224} 
 (udgivet 2024-06-07) 

*    **Nye funktioner og ændringer (for brugere) :** 
    * Ny farvepalet EK80 til akustiske datasæt til rådighed. Tak til Rob Cermak for dette.
         
    * Løst et problem, hvor EDDTableAggregateRows ikke viste ordentlige intervaller fra alle børn. Takket være Marco Alba for fix og fejl rapport.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Sådan gør du: Google Authentication kan kræve ændringer i din CSP.
        
Specifikt, kan du også nødt til at tilføje https://accounts.google.com/gsi/style til stlye-src og https://accounts.google.com/gsi/ at oprette forbindelse. Til script-src kan du nu bruge https://accounts.google.com/gsi/client.
 
        
For mere information kan du gå til den[Google-side](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)om CSP konfiguration.
         
        
    * Ny Fælles Watch Service. Dette er en ny mulighed for at se mapper for opdateringer. Det har en tråd til hvert filsystem i stedet for en tråd pr. datasæt. Det vil sandsynligvis reducere antallet af tråde, der bruges til at se efter ændringer. Det betyder, at alle datasæt bliver opdateret sammen i stedet for hver datasæt med sin egen opdateringsfrekvens. Det vil sandsynligvis betyde hyppige opdateringer for de fleste datasæt.
        
Sådan aktiverer du denne tilføjelse&lt;BrugSharedWatchService&gt;true&lt;/useSharedWatchService&gt; til din opsætning.xml.
        
          
Prøv venligst dette og rapporterer tilbage, hvordan det virker for dig at dåb. john på noaa.gov.
         
    * Fix for forkerte varnavne i logfiler. Tak til Ayush Singh for fix.
         
    * Nogle små ændringer og fejlrettelser.
         
*    **Forbedring forERDDAP™udviklere:** 
    * Støtte til lokal udvikling ved hjælp af Docker. Tak Matt Hopson og Roje.
         
    * Støtte til lokal udvikling ved hjælp af Jetty- og dokumentationsforbedringer. Tak Micah Wengren.
         
    * Ændringer til test for at reducere problemer cross platform. Tak Hoteller i nærheden af Shane St. Savage.
         

## Version 2.23{#version-223} 
 (udgivet 2023-02-27) 

Bemærk, at denne udgivelse blev udført af Bob Simons, og dermed viser, at han stadig er omkring og aktiv under overgangen til Chris John, hans efterfølger. Ved denne udgivelse sker alle kodeændringer af Chis John, medmindre andet er angivet.

*    **Nye funktioner og ændringer (for brugere) :** 
    *    (Ingen Ingen Ingen)   
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Sådan gør du: Google Authentication er nu gennemført via det nye Google Identity Services-bibliotek, som er en del af "Sign In with Google". Googles støtte til det gamle "Google Sign In" system vil blive udgået 2023-03-31. Så hvis du bruger Google Authentication i din browserERDDAP™installation, skal du opdatere tilERDDAP™v2.23+ før derefter. (Bob er ked af den korte varsel. Det er Bobs fejl.)   
         
    * IMPROVED: NCCSV er nu v1.2. Ændringen er, at filerne nu er UTF-8-enkodede filer (de var ASCII) og så kan nu inkludere enhver Unicode-figur som er, uden at kodning som ‘u_hhhh_, selvom det stadig er tilladt.
Når du skriver NCCSV-filer,ERDDAP™skriver nu v1.2 filer.
        ERDDAP™vil stadig læse NCCSV-filer, der følger v1.0 og v1.1 specifikation.
Takket være Pauline-Chauvet, n-a-t-e og thogar-computer for at foreslå dette og foretage test for at sikre forskellige regnearksprogrammer kan importere UTF-8-filer. Tak til Bob Simons for denne kode ændring.
         
    * NY: Status.html-siden har nu en linje i nærheden af toppen, som angiver, hvilke datasæt loadDatasets i øjeblikket indlæses og relaterede statistikker, eller ingen, hvis der ikke indlæses datasæt. Dette kan være meget nyttigt atERDDAP™Administratorer forsøger at finde ud af, hvorfor belastning Datasets tager så længe. Også nGridDatasets, nTableDatasets, og nTotalDatasets tæller nedenfor, der nu er øjeblikkelige (tidligere, de var som i slutningen af den sidste store belastning Datasæt) .
Denne ændring er for Roy Mendelssohn. Tak til Bob Simons for denne kode ændring.
         
    * IMPROVED: GenererDatasets Xml ændrer sig nu til CF-1.10 (var CF-1.6) i "Conventions" attributter.
Tak til Bob Simons for denne kode ændring.
         
    * Nogle små ændringer og fejlrettelser.
         

## Version 2.22{#version-222} 
 (udgivet 2022-12-08) 

Bemærk, at denne udgivelse blev udført af Bob Simons, og derved viser, at han stadig er omkring og aktiv under overgangen til sin efterfølger.

*    **Nye funktioner og ændringer (for brugere) :** 
    *    (Ingen Ingen Ingen)   
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * At gøre: intet.
         
    * SIKKERHEDBUG FIX: Der var en Cross Site scripts-relateret fejl i koden for sprogvalg drop ned. Tak tilNOAAsikkerhedsscanninger for at fange dette. Dette viser, atNOAAsikkerhed er aktivt og rutinemæssigt på udkig efter sikkerhedssvagheder iERDDAP.
         
    * Sikkerhed: De mange biblioteker, der bruges afERDDAP™blev opdateret, som sædvanlig, som en del af denne udgivelse. Denne gang har denne inkluderet opdatering af PostgreSQL driver (som havde en sikkerhedsfejl) til 42.5.1.
         
    * VIGTIGT: Flere små ændringerERDDAP's hukommelsesstyringssystem bør reducere chancen for en given anmodning, der ikke skyldes manglende tilgængelig hukommelse.
         
    * Nogle små ændringer og fejlrettelser.
         

## Version 2.21{#version-221} 
 (udgivet 2022-10-09) 

*    **Nye funktioner og ændringer (for brugere) :** 
    *    (Ingen Ingen Ingen)   
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Sådan gør du: ForJava17 skal du ikke bruge \\-d64 i JAVA\\_OPTS i setenv.bat eller setenv.sh. Så hvis det er der, skal du fjerne det. Jeg tror, at 64 bit mode nu er valgt, når du downloader en 64 bit version afJava. Tak til Sam Woodman.
         
    * BUG FIX: Nogle gange forsøgte det nye e-mail-system at logge ind for ofte, hvilket forårsagede Google Email-servere at afvise alle fremtidige log i forsøg. Nu undgår e-mailsystemet disse og relaterede problemer.
         

## Version 2.20{#version-220} 
 (udgivet 2022-09-30) 

*    **Brug ikke v2.20. Det er brændt.** Men administratorer behøver stadig at gøre TO DO-objekterne nedenfor, når du opgraderer til v2.21+.
     
*    **Nye funktioner og ændringer (for brugere) :** 
    *    (Ingen Ingen Ingen)   
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * IMPROVED: Vi genaktiverer det gamle hukommelsessystem (Math2.ensureMemoryAvailable) og ændrede det nye hukommelsessystem (EDStatic.shedThisRequest) at arbejde bedre med det. Se endnu[Hukommelsesstatus](/docs/server-admin/additional-information#memory-status)for detaljer.
         
    * CHANGED: Standarden for&lt;ipAddressMaxRequests&gt; i in in in indatasets.xmlsteg fra 7 til 15. Det er klart, at nogle legitimeWMSKunderne kan generere mere end 7 samtidige anmodninger.
         

## Version 2.19{#version-219} 
 (udgivet 2022-09-01) 

*    **Brug ikke v2.19. Det er brændt.** Men administratorer skal stadig gøre TO DO-objekterne nedenfor, når de opgraderer til v2.20+.
     
*    **Nye funktioner og ændringer (for brugere) :** 
    * NY: Der er en ny server-side funktion,orderByAfsender, som fungerer somorderBy, men sorterer i faldende rækkefølge. Tak til Adam Leadbetter.
         
    * IMPROVED: Nu, grafer (men ikke kort) vil udvide til at udfylde den tilgængelige plads på lærredet, dvs. rummet, der ikke bruges af legenden. Du kan få høj grafer, firkantede grafer eller brede grafer ved at tilføje og manipulere &.size=_bredde_|_height_ parameter (hvor bredden og højden angiver størrelsen på lærredet, i pixels) på anmodningssiden. (Dette er ikke en mulighed på siden .graph. Du skal tilføje det til URL manuelt.) Hvis du ikke angiver parameteren &.size, anmodninger om .smallPng, .png, .largePng, .smallPdf, .pdf og .large.pdf har foruddefinerede lærredsstørrelser, så din graf vil udvide til at udfylde den tilgængelige plads, men vil normalt være omtrent kvadratisk. Tak til Bob Fleming.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Sådan gør du:ERDDAP™nu kræverJava17 og den relaterede Tomcat 10. Du skal følgeERDDAP™installationsvejledning (eller den tilsvarende f.eks. til Docker) at installereJava17 og Tomcat 10 og kopiere din\\[Tomcat\\]/content mappe fra din Tomcat 8 installation i den nye\\[Tomcat\\]mappe. Der er ingen andre ændringer, som du har brug for til at foretage digERDDAPinstallation relateret til denne ændring. Med andre ord,ERDDAP™fungerer som det gjorde før.
        
Glem ikke at gøre detERDDAP- relaterede ændringer til Tomcats server.xml og kontekst.xml, når du opgraderer Tomcat. Se endnuERDDAP's[Tomcat installationsvejledning](/docs/server-admin/deploy-install#tomcat).
        
Mit indtryk afJava17 er, at det foretrækker mere forarbejdningskraft og hukommelse i lang tid, større applikationer somERDDAP™, så det virker lidt langsommere endJava8 med lave strømcomputere (f.eks. 2 kerner og minimal RAM) og arbejder lidt hurtigere endJava8 med højere strømcomputere (f.eks. 4+ kerner og rigelig RAM) . Så hvis du ser dårlig præstation, bruge programmer som Linux's[top top top top](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)at kontrollere ressourceforbruget og overveje at giveERDDAP™flere ressourcer, især mere hukommelse. Hukommelse er billig&#33; De fleste telefoner har flere processorer og hukommelse end de servere, at nogle af jer bruger til at køreERDDAP&#33;
Tak til Erin Turnbull.
         
        
    * Hvis du brugerERDDAP™at få adgang til Cassandra, for Cassandra, skal du fortsætte med at bruge versionen afJavaat du brugte til at køre Cassandra. Bare skift tilJava17 til løb Tomcat+ERDDAP.
         
    * Anbefalet: Hvis serverens CPU har 4+ kerner og 8+ GB RAM, skal du overveje at ændre disse indstillinger i dine indstillinger.datasets.xmlfil:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Hvis din server har færre ressourcer, skal du holde til "1" for begge disse indstillinger.
NThreads systemer tilEDDGridFraFiles og EDDTable FraFiles blev signifikant forbedret. Disse ændringer førte til en enorm hastighedsforbedring (f.eks. 2X speedup, når nThreads er indstillet til 2 eller flere) for de mest udfordrende ønsker (når et stort antal filer skal behandles for at indsamle resultaterne) . Nogle relaterede ændringer fra Chris John vil også føre til en generel speedup gennemERDDAP. Koden for disse ændringer blev bidraget af Chris John. Tak, fordi du var Chris&#33;
         
    * ADVARSEL: bindestreger idatasetID's er forældet og ikke længere understøttet (selvom teknisk stadig tilladt) . De vil sandsynligvis være utilfredse i den næste udgivelse. Hvis du bruger bindestreger, skal du skifte til understreger nu for at undgå problemer. Hvis du laver ændringen nu, er det på din egen hastighed. Hvis du venter til den næste udgivelse, vil du være i panik og nødt til at håndtere det på den dag.
         
    * NYHED: Nu, for.htmlTabledatareaktioner, hvis dataene i en streng celle indeholder data:image/png;base64, efterfulgt af en base64 kodet .png billede,ERDDAP™vil vise et ikon (så brugeren kan se billedet, hvis de svæver over det) og knapper for at gemme teksten eller billedet til udklipsholderen. Tak til Marco Alba (der bidrog koden) Og Bob Simons (der ændrede det lidt) .
         
    * NYHED: -IkkeAddStandardnavne
Hvis du indeholder \\-doNotAddStandardNames som en kommandolinjeparameter, når du kører Datasæt Xml, generere Datasæt Xml vil ikke tilføjestandard\\_nameTil højreaddAttributesfor andre variabler end variabler ved navn breddegrad, længde, højde, dybde eller tid (som har indlysendestandard\\_names s s) . Dette kan være nyttigt, hvis du bruger output fra generere Datasæt Xml direkte iERDDAP™uden at redigere output, fordi generere Datasæt Xml ofte gætterstandard\\_names forkert. (Bemærk, at vi altid anbefaler, at du redigerer output, før du bruger det iERDDAP.) Brug af denne parameter vil have andre mindre relaterede effekter, fordi gættetstandard\\_namebruges ofte til andre formål, f.eks. til at oprette en nylong\\_name, og for at oprette farveBar indstillinger. Tak til Kevin O'Brien.
         
    * NYHED: Du kan nu sætte&lt;OpdaterMaxEvents&gt;10&lt;/updateMaxEvents&gt; i in in in indatasets.xml  (med de andre indstillinger i nærheden af toppen) for at ændre det maksimale antal filændringer (Standard=10) der vil blive behandlet af opdateringenEveryNMillis system. Et større antal (100?) Det kan være nyttigt, når det er meget vigtigt, at datasættet holdes altid opdateret. Se billederne[OpdaterMaxEvents dokumentation](/docs/server-admin/datasets#updatemaxevents). Tak til John Maurer.
         
    * NYHED: Tilføjet understøttelse af global "real\\_time=true|falsk" streng attribut.
Hvis dette er falsk (Standard) og hvis datasættet ikke bruger opdatering EveryNMillis,ERDDAP™vil cache svar på anmodninger om filtyper, hvor hele filen skal oprettes førERDDAP™kan begynde at sende svar på brugeren og genbruge dem i op til omkring 15 minutter (fx,.nc.png) .
Hvis dette er indstillet til sand, eller hvis datasættet bruger opdatering EveryNMillis,ERDDAP™vil aldrig cache de svarfiler og vil altid returnere nyoprettede filer.
Tak til John Maurer.
         
    * NYHED: Emails sendes nu i en separat e-mailThread. Dette gør indlæsning af datasæt og andre handlinger, der genererer e-mails hurtigere, fordi loadDatasets ikke behøver at vente på, at e-mailen sendes, som nogle gange tager lang tid. Det nye system kan sende flere e-mails pr. e-mailsession, og dermed reducere antallet af e-mail server logins og reducere risikoen for dem, der ikke er for hyppig. Der er statistik for e-mailThread på status.html-siden og diagnostiske meddelelser i log.txt -- se efter "emailThread". Bemærk, at en tally af nEmailsPerSession=0, angiver problemer, dvs., en e-mail session var ikke i stand til at sende nogen e-mails.
Tak til Bob Simons.
         
    * CHANGED: Emails sendes nu med en anden kode (på grund afJava17 og ændringen til e-mailThread) . Hvis du har problemer med at sende e-mails, bedes du kontakte e-mailerd.data at noaa.gov.
         
    * NY: Abonnementshandlinger, der "touch" en fjern URL, håndteres nu i et separat touchThread. Dette gør indlæsning af datasæt og andre handlinger, der rører URL'er hurtigere, fordi belastningDatasetsets ikke behøver at vente på, at røret er afsluttet, som nogle gange tager lang tid. Der er statistik for touchThread på status.html-siden og diagnostiske meddelelser i log.txt -- se efter "touchThread".
Tak til Bob Simons.
         
    * NY: På status.html side, i "Major LoadDatasets Time Series", er der en ny "shed" kolonne, der angiver antallet af anmodninger, der blev tabt, fordi nuværendeERDDAP™hukommelsesbrug var for høj. Anmodninger, der er tabt, vil returnere HTTP-statuskode 503 "Tjeneste". Disse anmodninger var ikke nødvendigvis et problem. De ankom bare til en travl tid. Dette var en del af en revamp af hvordanERDDAP™Tilbyder med høj hukommelse brug.
         
    * NY: På Unix/Linux-computere er der nu en "OS Info" linje på status.html-websiden med aktuelle operativsystemoplysninger, herunder CPU-belastning og hukommelse brug.
         
    * VIGTIGT: Nu, nårERDDAP™genstartes og hurtigRestart=true, EDDTableFraFiles datasets vil genbruge subset.ncog adskilt.nc. For nogle datasæt reducerer dette i høj grad tiden for at indlæse datasættet (f.eks. fra 60 sekunder til 0,3) . Sammen med den nye e-mailThread og opgaveThread (Se ovenstående) , dette bør meget fremskynde genstartERDDAP™for mangeERDDAP™installationer. Takket være Ben Adams og John Kerfoot.
         
    * CHANGED: Tidligere, forældreløse datasæt (datasæt, der lever iERDDAP™men er ikke idatasets.xml) blev simpelthen bemærket på status. html og i log.txt efter hver større belastningDatasets. Nu fjernes de automatisk fraERDDAP™og noteret på status.html og i log.txt, og e-mailed til e-mail Alttil. Så hvis du vil fjerne et datasæt fraERDDAP™, nu alt hvad du skal gøre er at fjerne dens klump af xml idatasets.xmlog det vil blive fjernet i den næste store belastningDatasets. Tak til Bob Simons.
         
    * KNOWN BUG i netcdf-java v5.5.2 og v5.5.3: The The The The The The TheEDDGridFromThredds Katalog mulighed i GenererDatasets Xml bruges til at arbejde for THREDDS kataloger, der omfatter referencer til datasæt i fjern THREDDS kataloger. Nu er det ikke. Jeg har rapporteret problemet til netcdf-java udviklere.
         
    * BUG FIX: For Docker-brugere opsætning.xml parametre viaERDDAP\\__paramName_: for int og boolean parametre (e.eks. e-mail SmtpPort) ,ERDDAP™var forkert på udkig efter kun _paramName_. Nu ser det ud til _ERDDAP\\_paramName_. Tak til Alessandro De Donno.
         
    * CHANGE: TheERDDAP™testsystem bruger nu et automatiseret system til at kontrollere, at nyoprettede testbilleder er præcis som forventet. Tak til Chris John for forslag og Bob Simons til implementering.
         

## Version 2.18{#version-218} 
 (udgivet 2022-02-23) 

*    **Nye funktioner og ændringer (for brugere) :** 
    * NONE
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * BUG FIX:.ncfiler var ikke lukket under nogle omstændigheder. Nu er de. Takket være Marco Alba, Roland Schweitzer, John Maurer og andre.
         

## Version 2.17{#version-217} 
 (udgivet 2022-02-16) 

*    **Nye funktioner og ændringer (for brugere) :** 
    * BUG FIX: Efter ændringer i ændringerneorderByFor et par år siden, Tabledap's Make A Graph ikke ordentligt håndtere mange forespørgsler, der brugteorderBy_Xxx_. Nu gør det. Tak til Maurice Libes.
         
    * CHANGE: Tidligere,ERDDAP™afviste anmodninger om . transparent transparent transparent Png's når breddegraden og/eller længdeværdierne var delvist eller fuldt ud. (ERDDAP™GitHub spørgsmål #19, skrevet af Rob Fuller -- takket være at skrive, at Rob) Nu returnerer den transparente pixel for eventuelle udestående områder af billedet. Dette er nyttigt for mange klient applikationer. Kodeændringerne for at foretage denne ændring blev foretaget helt af Chris John. Tak, fordi du indsendte en redigering.
         
    * CHANGE: Tidligere,ERDDAP™afviste gitterdap anmodninger, hvor indeksværdierne for en given dimension var\\[høj:lav\\]. Nu gør det disse anmodninger gyldige ved at udskifte de lave og høje værdier. Dette løser et langvarigt problem for brugere og for eksterne programmer som xtracto, som skulle holde styr på de få datasæt, der har latitude værdier, der spænder fra høj til lav for at anmode om lignende\\[ (50 50 50) : (20 20 20) \\]så anmodningen i indeksplads var\\[lav: høj\\]. Se endnu https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Nu, en anmodning som\\[ (20 20 20) : (50 50 50) \\]for en af disse data er automatisk fortolket som\\[ (50 50 50) : (20 20 20) \\].
         
    * CHANGED: .esriAscii anmodninger nu udløser en "File : Save As" dialogboks i brugerens browser. Tak til Joel Van Noord.
         
    * BUG FIX: Nu, hvis længdevariablen af et barns datasæt af enEDDGridLonPM180 ellerEDDGridLon0360 datasæt har envalid\\_minog/ellervalid\\_maxattribut, de fjernes i attributtenEDDGridLonPM180 ellerEDDGridLon0360 datasæt. Tak til Roy Mendelssohn.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Hvis du havde indstillet&lt;DataProviderFormActive&gt; at falsk til midlertidigt at håndtere XSS-sårbarheden, skal du indstille det tilbage til sand.
         
    * SIKKERHED BUG FIX: Fast XSS sårbarhed i Dataudbyder Form. Tak til Genaro Contreras Gutiérrez.
         
    * BUG FIX: Når en AWS S3 diktatory havde mere end 10000 filer,ERDDAP™kastede en "Internal Error". Dette er nu rettet. Tak til Andy Ziegler.
         
    * BUG FIX:EDDGridSideBySide gjorde ikke muligt for variablenssourceNames i forskellige barns datasæt til at være den samme. Nu gør det. Tak til Joshua Stanford.
         

## Version 2.16{#version-216} 
 (udgivet 2021-12-17) 

*    **Nye funktioner og ændringer (for brugere) :** 
    * CHANGES/BUG FIXES: Talrige små ændringer i oversættelsessystemet takket være forslag fra sprogspecifikke redaktører. Tak til Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian og Mike Smit.
         
    * TILBAGE en ordentlig frasender og tilskrivning for Google Translate, som krævet af vilkårene for Google Translate. Også,&lt;html&gt; tag i HTML for hver webside identificerer nu korrekt ikke-engelske websider som er blevet maskine oversat. Tak til Mike Smit.
         
    * BUG FIX: Log-websiderne arbejder nu ordentligt med forskellige sprogindstillinger. Tak til Mike Smit.
         
    * NYHEDorderBySum filter. Og nyt Tjek alle og fjerne alle knapper påEDDGridData Access Form hjemmeside. Takket være kodebidrag fra Marco Alba.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Hvis du har
        &lt;Hoteller i nærheden afMarkFil&gt;QuestionMark.jpg&lt;/questionMarkImageFile&gt;
i din setup.xml fil, skal du enten fjerne hele tag (anbefalet, så standardfilen bruges) eller ændre det til:
        &lt;Hoteller i nærheden afMarkFil&gt;QuestionMark.png&lt;/questionMarkImageFile&gt;
         
    * CHANGE: Bare så du ved,[Adoptium](https://adoptium.net/?variant=openjdk8)har erstattet AdoptOpenJDK som hoved-/anbefalet kildeJava  (OpenJDK) .
         
    * CHANGE: log filer fraERDDAP™, GenererDatasets Xml, og DasDds er nu UTF-8, ikke computerens standard figursæt. Jeg gjorde en masse kontrol og foretaget et par ændringer for at sikre, atERDDAP™Angiv altid det korrekte tegn, når du læser eller skriver alle former for filer, og ikke længere (i flere tilfælde) afhængigt af computerens standard figursæt. Dette korrigerede et par fejl og flyttede så tæt som jeg kunne nå målet med at bruge UTF-8 for så mange filtyper som muligt (f.eks. .log, .xml, .html,.json,.jsonl,.ncSidehoved) . Bemærk, at mange ældre filtyper skal bruge ISO-8859-1 (fx,OPeNDAP.das, .dds, .csv,.tsv,.nc3,.nccsv.cpt) . Jeg forsøgte tidligere at arbejde med CF-gruppen og medUnidataat tilføje støtte til UTF-8 i.nc3 filer; begge var modstandsdygtige.
         
    * NYHED: Når du downloader filer fra AWS S3,ERDDAP's cache FraUrl system iEDDGridFraFiles og EDDTable FraFiles bruger nu den nye AWS Transfer Manager til at downloade filer via parallelle chunks (således meget hurtigt) . Målet gennemløb er indstillet til 20 Gbps, pr fil, så dette fungerer godt med alle AWS-instanstyper, men især dem, der har fremragende "Networking Performance". Med denne ændringERDDAP's cache FraUrl systemet tilbyder nu sammenlignelige hastigheder til xarray's tilgang til parallelle downloads af foruddefinerede filer, men uden behov for at konvertere kildefiler fra.ncog og og.hdfi chunked xarray filer. Faktisk,ERDDAP's system er bedre, hvis der er en efterfølgende anmodning om at læse fra samme fil, fordiERDDAP™Nu har en lokal kopi af filen. Vores samfund har brugt mange års standardisering på.ncog og og.hdffiler. Nu behøver vi ikke at tosss, at alt ud bare for at få god ydeevne, når vi lagrer data i AWS S3. Tak til Rich Signell.
         
    * CHANGE: søgEngine=Lucene er, for nu, deprecated. Det er et komplekst system, der ofte giver resultater, som er lidt anderledes end den mere ønskelige adfærd af søgEngine=original. Til næsten alleERDDAP™installationer, tidsbesparelsen af Lucene ikke forskudte forskellene i resultater. Brug venligst søg=Engine i stedet, hvis det er muligt. Hvis det forårsager problemer, bedes du kontakte Bob.
         
    * CHANGE: The Lucene søgemaskine opfører nu mere som den originale søgemaskine. Der er ikke længere nogen tilfælde, hvor lucene mener, at et datasæt matcher og originalen ikke. Også lucenes ranglister nu lige originale ranglister (fordi originalen nu altid bruges til at beregne ranglisterne) .
         
    * BUG FIX: Begyndende i en nylig udgivelse,ERDDAP™stoppede med at se mere end de første 1000 objekter i en given AWS S3 spand. Nu, nu,ERDDAP™ser igen alle objekter. Tak til Andy Ziegler.
         
    * BUG FIX: Nu EDDTableAggregate Rækker fjerneractual\\_rangeattribut, når en eller flere af barnets datasæt ikke nogensinde kender dens variabler ''actual\\_range  (f.eks. EDDTableFraDatabase) . Tak til Erik Geletti.
         

## version 2.15{#version-215} 
 (udgivet 2021-11-19) 

*    **Nye funktioner og ændringer (for brugere) :** 
    *   ERDDAP™har et nyt system til at lade brugerens specificere det sprog, der skal bruges til alle websider. Hvis enERDDAP™installation er indstillet til at bruge det, listen af sprog vises i øverste højre hjørne af hver webside.ERDDAP™URL'er fra før denne version fortsætter med at arbejde og altid returnere engelsk indhold, som før.
        
Ikke alle tekst eller alle websider blev oversat. Der var tidsbegrænsninger på dette projekt, der forhindrede Qi og Bob fra at komme til 100%.
        
Det indlysende spørgsmål er: hvorfor gjorde vi så meget bestræbelser på dette, når Chrome vil oversætte websider på farten? Svaret er: denne måde, vi får meget mere kontrol over, hvordan oversættelsen sker. Især er der masser af ord, der ikke bør oversættes på websider, f.eks. titler og referater af datasæt, navne på variabler, parametre, enheder og organisationer. Meget af oversættelsesindsatsen identificerede ord og sætninger, der ikke bør oversættes. Også machine oversættelser har tendens til at ødelægge visse typer af HTML-markup. Håndtering af oversættelsen tillod os at minimere dette problem.
        
Oversættelsesprojekteret blev udført af Qi Zeng (En Google Summer of Code praktikant) og Bob Simons ved hjælp af Googles oversættelseswebservice. Det var et stort projekt. Tak, fordi Qi&#33;
        
    * BUG FIX:ERDDAP™Tillad nu ORCID-id'er at have X som sidste digitalisering. Tak til Maurice Libes.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Sådan gør du:
        
        * Du skal foretage et par ændringer relateret tilERDDAP's nye system til at lade brugerne angive sproget for websider.
            * På den første linje af din opsætning.xml ogdatasets.xmlfiler, ændre til: kodningen af SMTPUTF-8" og ændre dokumentets kodning i din tekst editor, så det gemmes som en UTF-8-fil. GenererDatasets Xml antager nu, at Xml nudatasets.xmler en UTF-8 fil.
            * Programmer, der kompilererERDDAP: Alle afERDDAP™.java-filer skal behandles som UTF-8-filer som standard. Du skal muligvis tilføje "kodning UTF-8" til javac kommandolinjen. (Jeg gjorde.) 
            * For at aktivere dette system (stærkt anbefalet) , i den&lt;startBodyHtml5&gt; tag, som du angiver idatasets.xml, ændre "&amp&#33;loginInfo;" i "&amp&#33;loginInfo;|&amp&#33;sprog;" så listen af sprog vises i øverste højre hjørne af hverERDDAP™webside.
            *   ERDDAP™kun bruger den&lt;startBodyHtml5&gt; tag, som du angiver idatasets.xmlfor at angive HTML-indholdet for banneret øverst på hverERDDAP™webside, uanset hvilket sprog brugeren vælger. Hvis du ændrer det tag til brug
" " " "&EasierAccessToScientificData;"I stedet for "Easier adgang til videnskabelige data" og
" " " "&BroughtToYouBy;"I stedet for "Brought to you by",ERDDAP™vil bruge oversat versioner af disse sætninger på banneret.
            * På samme måde den nye standard&lt;TheShortDescriptionHtml&gt; indatasets.xmler det er
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
De sidste 3 linjer af indhold er ting, der vil blive erstattet med oversat tekst. Hvis du konverterer nogen af dem (Sandsynligvis og denne SærligErddap;) eller alle af dem til eksplicit tekst idatasets.xml  (som har prioritet, hvis nutid) eller meddelelser.xml, vil teksten vises uanset hvilket sprog brugeren vælger. Dette er ikke perfekt, men jeg fandt, at nogle administratorer ville redigere&lt;ShortDescriptionHtml&gt; i 35 forskellige filer for at give 35 forskellige oversatte versioner af det tag.
        
          
         
    * CHANGED: Nogle fejl håndteres nu lidt anderledes, og det kan føjes til "Failed Requests" på status.html og i Daily Report Email. Så disse tal kan være noget større end før.
         
    * BUG FIX: GenererDatasets Xml tilEDDGridLon0360 ogEDDGridLonPM180 udelukker nu kildedatasæt meddatasetID= ~".\\*\\_LonPM180" ogdatasetID= ~".\\*\\_Lon0360", henholdsvis.
         

## Version 2.14{#version-214} 
 (udgivet 2021-07-02) 

*    **Nye funktioner og ændringer (for brugere) :** 
    *    (Ingen ingen ingen)   
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * NYHED:EDDGridLon0360, som gør et gitteret datasæt med længdeværdier og nød;=0 og&lt;=360 fra en gitteret datasæt med længdeværdier og længde; =-180 og&lt;=180. Se billederne[EDDGridLon0360 dokumentation](/docs/server-admin/datasets#eddgridlon0360). Tak til Dale Robinson.
         
    * NYHED:ERDDAP™Administratorer kan nu tilsidesætte enhver værdi i opsætning.xml via en miljøvariabel ved navnERDDAP\\__værdinavn_, før du kørerERDDAP. Brug f.eks.ERDDAP\\_baseUrl tilsidesætter&lt;baseUrl&gt; værdi. Dette kan være praktisk, når du installererERDDAP™med en beholder, da du kan indstille standardindstillinger i opsætning.xml og derefter levere særlige indstillinger via miljøvariabler. Hvis du leverer hemmelige oplysninger tilERDDAP™via denne metode skal du kontrollere, at oplysningerne forbliver hemmelige.ERDDAP™Læs kun miljøvariablerne én gang pr. opstart, i første sekund af opstart, så en måde at bruge dette er: sæt miljøvariablerne, startERDDAP™Vent indtilERDDAP™Startes, og sæt derefter miljøvariablerne. Tak til Marc Portier.
         
    * IMPROVED: Nu, hvis nogle filer i en EDDTableFra... Filer datasæt med en masse filer har nogle meget lange strenge værdier, datasættet vil indlæse meget hurtigere og svare på anmodninger meget hurtigere. Tidligere,ERDDAP™ville allokere en masse plads til min og max strenge værdier i de filer, der er gemt med filoplysninger for sådanne datasæt. Den resulterende fil var enorm, hvilket gør det til at skrive og læse langsomt. Tak til OBIS.
         
    * VIGTIGT: Nu,ERDDAP™gør et bedre job med at fortolke usædvanlige og ugyldige tegnsekvenser i CSV-filer. Tak til OBIS.
         
    * FIX: Efter et års problemer med Cassandra, har jeg endelig installeret Cassandra (v2) igen og så kunne rerun testerne med Cassandra v2. Så nu kan jeg mere trygt angive, atERDDAP™værker med Cassandra v2 og v3. Tak til ONC.
         

## Version 2.12{#version-212} 
 (udgivet 2021-05-14) 

*    **Nye funktioner og ændringer (for brugere) :** 
    * BUG FIX: Hvis du er på abonnementet blacklist, kan du nu ikke anmode en liste over dine abonnementer.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * TO DO: NY: system til automatisk at begrænse muligheden for ondsindede brugere og overly aggressive legitime brugere til at foretage et stort antal samtidige anmodninger, som ville afgradere systemydelse for andre brugere. Der er 3 nye valgfrie tags idatasets.xmlsom du kan/should tilføje lige efter&lt;grafBackgroundColor&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

For yderligere information, se[ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™også nu udskriver "Antal af unikke brugere (siden opstart) " på status.html side.
Tak til den person i Kina, der angriber minERDDAP™installation.
         
    * CHANGE til Postgresql driver adfærd: Når jeg har opdateret Postgresql-driveren, kom kolonnenavnene på tabellisten genereret af Postgresql Generer ogDatasetsXml tilbage alle øverstecase, i stedet for alle lavere kufferter som før. Jeg ved ikke, om det vil påvirke andre ting, da databaser ofte anser de navne, der skal være ifølsomme. Min testdatasæt virker stadig korrekt. Men hvis dine datasæt stopper med at arbejde med detteERDDAP™Opdatering, dette er den mulige årsag til at forfølge først.
         
    * BUG FIX:ERDDAP™Nu håndterer også private AWS S3 filer korrekt. Der var andre relaterede forbedringer af håndteringen af AWS S3 filer. Tak til Michael Gangl og Dylan Pugh.
         
    * NYHED:EDDGridFraNcFiles ogEDDGridFraNcFiles Upakket kan nu læse data fra "strukturer" i.nc4 og 4.hdf4 filer. At identificere en variabel, der er fra en struktur, den&lt;sourceName&gt; &gt; &gt; &gt; skal bruge formatet: _fullStructureName_|_Husknavn_, for eksempel gruppe1/myStruct|Mit medlem. Tak til NRL.
         
    * CHANGED: Nu, hvis nuværende hukommelsesforbrug plus denne anmodning er endnu lidt høj, gitteretap sæt nThreads for denne anmodning til 1. Således,ERDDAP™sparer hukommelse, når hukommelsen er arce. Tak til den person i Kina, der angriber minERDDAP™installation.
         
    * Nyt system til at overvåge antallet af åbne filer (som indeholder stik og nogle andre ting, ikke bare filer) i Tomcat på Linux-computere. Hvis nogle filer fejlagtigt aldrig bliver lukket, kan antallet af åbne filer stige, indtil det overstiger den maksimale tilladt og mange virkelig dårlige ting sker. Så nu på Linux-computere (Oplysningerne er ikke tilgængelige for Windows) :
        
        * Der er en ny "Åbne filer" kolonne på den langt højre side af status.html-siden viser procent af max-filer åbne. På Windows viser det bare "?".
        * Hvornår Hvornår skal man HvornårERDDAP™genererer, at oplysninger i slutningen af hvert større datasæt reload, vil den udskrive til loget. txt-fil:
openFileCount=_strøm_ på maks=_max_ %=_percent_
        * Hvis procentdelen er &gt;50%, sendes en e-mail til denERDDAP™administrator og e-mail Alt alt Til e-mail-adresser.
        
For at finde ud af mere, eller hvis du ser dette problem på dit problemERDDAP™, se[For mange åbne filer](/docs/server-admin/additional-information#too-many-open-files).
Tak til den person i Kina, der angriber minERDDAP™installation.
         
    * NY: Jeg tilføjede en masse kontrol for og håndtering af "Too mange åbne filer", så opgaven bare stopper og brugeren ser fejlmeddelelsen. Datafiler vil ikke længere blive markeret som slemt, hvis du læser dem resultater i en "Too mange åbne filer" fejl.
         
    * NYHED\\[bigParentDirectory\\]/badFilesFlag mappe:
Hvis du lægger en fil i denne mappe med endatasetIDsom filnavnet (filindholdet betyder ikke) ,ERDDAP™vil slette de dårligeFiles.ncfil til den datasæt (hvis nogen) og opload dataset ASAP. Dette årsagerERDDAP™at prøve igen for at arbejde med de filer tidligere (Erigt?) markeret som dårligt. Tak til Marco Alba.
         
    * CHANGED: Ved opstart, hvis enEDDGridFra...Filer eller EDDTableFra... Filer datasæt oprindeligt har 0 filer på sin liste over kendte gyldige filer (f.eks. er det et nyt datasæt) , såERDDAP™defer indlæse det og sæt et flag, så det vil blive indlæst ASAP efter den store belastningDatasets er færdig. Dette fremskynder den første opstart, når der er nye datasæt.
         
    * CHANGED: FileVisitorDNLS.testAWSS3 () og filVisitorSubdir.testAWSS3 () ; nu brug AWS v2 (ikke v1) SDK. Så nu GitERDDAP™distribution omfatter nu alle nødvendige filer, og du behøver ikke længere manuelt at tilføje den massive v1 AWS SDK krukke fil.
         
    * CHANGED: Jeg skiftede til at bruge Maven til at opdage/gather afhængigheder (.jar filer i /lib) . Ændringen til v2 af AWS SDK ophørte dette. Det bliver nødvendigt for andre importerede kode i fremtiden. En enorm tak til Kyle Wilcox, der gav pom.xml han skabte og bruger, som løste flere problemer for mig.
         
    * CHANGED: klassepat parameter (-cp) Bruges i GenererDatasetXml, DasDds og andre små programmer, der kommer medERDDAP™, og i rådgivning til programmører er nu meget enklere og bør ikke nogensinde ændre sig igen, da det refererer til mappen, ikke de enkelte filer:
\\-cp klasser;C: "programmer\\\_tomcat"lib "servlet-api.jar;lib\\\*
         (eller ':' i stedet for ';' for Linux og Macs) .
         (Jeg skal have gjort dette år siden, da det blev en mulighed.)   
         
    * NYHED: GenererDatasets Xml har en ny værktøjsmulighed: findDuplicateTime, som vil søge gennem en samling af gitterded.nc  (og relateret) filer til at finde filer med duplikerede tidsværdier. Se endnu[FindDuplicate Tidstid](/docs/server-admin/datasets#findduplicatetime)  
         
    * NYHED:datasets.xmlKan nu inkludere en&lt;paletter&gt; tag, som tilsidesætter&lt;paletter&gt; tagværdi fra beskeder.xml (eller vender tilbage til meddelelserne.xml værdi, hvis det er tomt) . Dette lader dig ændre listen over tilgængelige paletter, mensERDDAP™kører. Også, hvis du har en cptfile subdirectory i denERDDAP™indholdskatalog,ERDDAP™vil kopiere alle \\*.cpt-filer i mappen i mappen\\[Tomcat\\]/webapps/erddap/WEB-INF/cptfiles-mappen hver gangERDDAP™starter op. Disse ændringer giver dig mulighed for at tilføje paletter og har ændringerne ved at installere en ny version afERDDAP. Se billederne[paletter dokumentation](/docs/server-admin/datasets#palettes)  
Tak til Jennifer Sevadjian, Melanie Abecassis, og måske andre CoastWatch mennesker.
         
    * CHANGED: [&lt;I nærheden af langsomDownTroubleMillis&gt;] (/docs/server-admin/datasæt#slowdowntroublemillis) bruges nu til alle mislykkede anmodninger, ikke blot et par typer.
         
    * CHANGED: RunLoadDatasets tråd afbryder nu LoadDatasetsets tråd på 3/4 LoadDatasetsets MaxMinutes så der er mere tid til LoadDatasets for at bemærke afbrydelse og udgang yndefuldt. Der er også mere og bedre diagnostiske meddelelser for dette.
         
    * CHANGED fra den gamle version af Lucene til v8.7.0.
         
    * CHANGE: Emails sendt afERDDAP™Nu vises med en fast bredde font.
         
    * CHANGE:EDDGridFraFiles får nu akseværdier samt attributter fra FIRST|LAST fil, som angivet i&lt;metadataFra&gt;. Tak (Ikke ikke) til Ken Casey, et al.
         
    * TILED understøttelse af de ugyldige enheder "grader\\_North" og "grader\\_East", som er fejlagtigt brugt af de seneste filer (siden 2020-10-01) i AVHRR Pathfinder Version 5.3 L3-Collated (L3C) SST-datasæt (I nærheden af nceiPH53sstd1 dag og nceiPH53sstn1 dag) .ERDDAP™Kan nu standardisere dem til gyldige enheder. Tak (Ikke ikke) til Ken Casey, et al.
         

## Version 2.11{#version-211} 
 (udgivet 2020-12-04) 

*    **Nye funktioner og ændringer (for brugere) :** 
    * BUG FIX: OrderByMean kastede en NullPointerException, hvis en variabel kun havde en af \\_FillValue eller mangler\\_ Værdi defineret. Nu håndterer det situationen korrekt. Tak til Marco Alba.
         
    * BUG FIX: Der var problemer med ODV tekstfiler oprettet afERDDAP™i v2.10. Disse problemer er rettet. Tak til Shaun Bell.
         
    * BUG FIX: Lige iERDDAP™v2.10: Hvis lat-lon bundete blev angivet i URL'en, blev den bundet boks ikke trukket på verdenskortet. Nu er det igen. Tak til John Maurer.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * BUG FIX: Lige iERDDAP™v2.10: script-filer til ArchiveADataset, GenererDatasets Xml og DasDds virkede ikke, fordi de ikke havde ændringerne i klassestien, som blev tilføjet medERDDAP™v2.10. Nu gør de. Tak til Marco Alba.
         
    * NYHED: Idatasets.xml, du kan nu have tagget:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

I øjeblikket, hvis sandt (eller hvis tagget er tomt, eller hvis mærket ikke er i filen) , når en brugers anmodning fører til en NullPointerException,ERDDAP™e-mail stacksporet tilerd.data at noaa.gov  (te te te teERDDAP™udviklingsteam) . Dette bør være sikkert og sikkert, da ingen fortrolige oplysninger (f.eks. anmodningenUrl) er inkluderet i emailen. Dette skal gøre det muligt at fange enhver obscure, helt uventede bugs, der fører til NullPointerExceptions. Ellers ser brugeren undtagelserne, men undtagelserneERDDAP™udviklere ikke, så vi ved ikke, der er et problem, der skal løses.
        
Det er muligt, at dette tag vil føre til andre, lignende diagnostiske oplysninger, der sendes tilerd.data at noaa.govi fremtiden. Emailens indhold vil altid være minimalt og relateret til bugs, og ikke, for eksempel brugsoplysninger. Tak til Marco Alba.
         
        
    * CHANGED: Nu, almindelige komprimerede filtyper (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) er også forbudt for byte område anmodninger. Dette er angivet via&lt;udvidelserNoRangeRequests&gt; i meddelelser.xml.
         
    * KNOWN PROBLEM: Som medERDDAP™2.10,.ncml filer, der forsøger at ændre en attribut, skal du ikke ændre attributten. Dette er en kendt fejl i netcdf-java, som jeg har rapporteret, og de siger vil blive rettet i den næste udgivelse af netcdf-java.
         

## Version 2.10{#version-210} 
 (udgivet 2020-11-05) 

*    **Nye funktioner og ændringer (for brugere) :** 
    * NYHED: Det nye[Interpolate](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)Omformer effektivt værdier fra en gitteret datasæts værdier. Som sådan er det særligt nyttigt for forskere, der arbejder med dyresporsdata. Denne konverter tager i en tabel med breddegrad, længde og tidszoner (og måske andre kolonner) og returnerer et bord med ekstra kolonner med sammenpolerede værdier. Dette svarer således til den populære[Xtrakomatisk](https://coastwatch.pfeg.noaa.gov/xtracto)manuskript oprindeligt skabt af Dave Foley, men tilbyder fordel af at behandle op til 100 point pr. anmodning. Tak til Dave Foley og Jordan Watson (NMFS) .
         
    * IMPROVED: Advanced Search er nu streng for ikke-.html anmodninger. Det vil nu smide undtagelser for anmodninger, der har permanente fejl (f.eks. anmodninger, hvor minLat &gt; maxLat) eller midlertidige fejl (f.eks. anmodninger om etstandard\\_namedet eksisterer ikke) . For .html anmodninger, Advanced Search er uændret: som med Google søgninger, det gør dens bedste og tavse rettelser eller ignorerer fejl. Tak til Rich Signell.
         
    * VIGTIGT: Kortet på siden Advanced Search er nu større (du stadig skal squint, men mindre) og signifikant mere præcis (men stadig ikke perfekt) . Tak til John Maurer.
         
    * IMPROVED: Indstillingen "Draw jordmaske" på Make A Graph-websider og &.land=... i webadresser, der anmoder om et kort understøtter nu to flere muligheder:
"outline" trækker bare jordmuren, politiske grænser, søer og floder.
"off" trækker ikke noget.
Se billederne[&.land=... dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Tak til John Maurer.
         
    * IMPROVED: Grafer og kort oprettet afERDDAP™kan nu bruge tre nye mærketyper: Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Triangle. Koden for dette blev bidraget af Marco Alba af ETT / EMODnet Fysik. Tak til Marco Alba.
         
    * NYHED:"files"system understøtter nu almindeligt Filtypereaktioner (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsveller.xhtml.) f.eks.[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Tak til Kyle Wilcox.
         
    * VIGTIGT: De webadresser, der genereres, når en bruger bruger bruger en data Access-formular (.html) eller en Make-A-Graph (.ografi) webside nu korrekt procentkode tegn\\[og og og\\]. Dette gør webadresserne lidt sværere for mennesker at læse, men er bedre fra en web-sikkerhedsstand. Administratorer har nu mulighed for at indstille afslappedeQueryChars= ''\\[\\]|' i Tomcat-serveren.xml-filen (mindre sikker) eller ikke (mere sikker) .
Tak til Antoine Queric, Dominic Fuller-Rowell og andre.
         
    * NYHED: Hvis en anmodning til en EDDTable datasæt omfatter &tilføjelse Varer Hvor (_attribute Navn, egenskab Værdi_) ,ERDDAP™vil tilføje alle variabler, der har _attribute Navn=attribute Værdi_ på listen over ønskede variabler.
Se billederne[& tilsætning Varer Hvor dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Tak til Aurelie Briand, et al.
         
    * CHANGED:ERDDAP™afviser nu afte sortiment anmodninger til /files/.nceller eller eller.hdffiler. Forsøg ikke at oprette forbindelse til fjern.nceller eller eller.hdffiler som om de var lokale filer. Det er forfærdeligt ineffektivt og forårsager ofte andre problemer. I stedet:
        * Brug(OPeN)DAPklient software til at oprette forbindelse tilERDDAP'sDAPtjenester til denne datasæt (som har /griddap/ eller /tabledap/ i URL) . Det er hvad der erDAPer for.
        * Brug datasættets data Access-formular til at anmode om en del af data.
        * Hvis du har brug for hele filen eller gentagen adgang i en lang periode, skal du brugecurl,wget, eller din browser til at downloade hele filen, og få adgang til dataene fra din lokale kopi af filen.
             
    * VIGTIGT: .odv Txt output mulighed er blevet genskrevet til at understøtte den nye version afODV .txtfiler og til at støtte den korrekte repræsentation af trajectory, tidsserie og profildata.
         
    * VIGTIGT: Nu fortolkes søgetermer i dobbelt citater som en json streng, så de kan have "kodede tegn. Blandt andre ting, kan du søge efter en præcis match for en attribut, f.eks. " Institution=NOAA\\n" vil ikke matche et datasæt med institution=NOAA NMFS. Tak til Dan Nowacki.
         
    * VIGTIGT: På yderligere steder, flydende punktnumre (især strømmer konverteret til dobbelt) Nu vises som en lidt mere afrundet version af nummeret på yderligere steder, f.eks. en flyt tidligere vist som en dobbelt ligesom 32.27998779296875, kan nu vises som 32.28. Tak til Kyle Wilcox.
         
    * BUG FIX: ikke-signede lydfiler blev læst lidt forkert. Nu læses de korrekt.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * ADVARSEL: Den første gang du kørerERDDAP™v2.10, nogle datasæt baseret på lokale datafiler vil indlæse **meget meget meget** langsomt fordiERDDAP™Skal genskabe sin database med filoplysninger. Efter den langsomme indledende reload, vil de indlæse hurtigt, som før. Vær venligst tålmodig.
         
    * Du skal gøre:
        * Når du først kører v2.10, kan nogle datasæt ikke indlæse, fordiERDDAP™er nu strengere om nogle metadata. Som før,ERDDAP™vil sende dig en daglig rapport, når den først indlæser op. Det vil omfatte fejlmeddelelser for hver af de datasæt, der ikke indlæsede. Læs fejlmeddelelser for at finde ud af problemerne. I de fleste tilfælde skal du blot foretage en lille ændring til datasættets metadata for at løse problemet.
             
        * I nærheden af In In In In In In In In In In In In In Indatasets.xml, søg efter&lt;sourceName&gt; = (Bemærk venligst, at'='Tegn, som identificerer et[Fast værdisourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . For de flesteERDDAP™opsætninger, disse er sjældne. Hvis nogen af værdierne efter'='er strenge (ikke tal) , du skal nu lukke strengen i dobbelte citater. For eksempel,
Før:&lt;sourceNameOprettet af:=KZ401&lt;/ / / /sourceName&gt; &gt; &gt; &gt;
Efter:&lt;sourceNameRelaterede artikler - Wikipedia, den frie encyklopædi&lt;/ / / /sourceName&gt; &gt; &gt; &gt;
             
        * NY: Der er en ny valgfri indstilling i opsætning.xml,&lt;standardAccessibleViaFiles&gt;, som angiver standarden&lt;tilgængeligViaFiles&gt; for hver af datasets. Standarden for denne nye tag er falsk, som efterligner den tidligereERDDAP™adfærd. Denne lavere niveauindstilling kan overvejes af en given datasæts&lt;tilgængeligViaFiles&gt; indstilling.
            
Ansættelse (fordi der er brugere, der ønsker dette) :
Hvis du vil gøre alle EDD... FraFiles datasæt tilgængelige via filsystemet, derefter
            
            1. Tilføj dette tag til din setup.xml fil:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Valgfrit) Fjern alle dele
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
i in in in indatasets.xmlDa standarden nu er sandt.
                 
        * Tilføj \\_FillValue Attributes:
            ERDDAP™Bruges til at have en standard \\_FillValue for alle ueger variabler: den maksimale værdi af datatypen (f.eks. 127 for byte variabler) . Nu er det ikke. For at undgå at have disse værdier vist som dataværdier (manglende værdier) , du skal udtrykkeligt angive disse via \\_FillValue attributter. Fra nu, hver gang du starter opERDDAP™, vil det sende administratoren en e-mail med en .csv-tabel med en liste over integer kildevariabler, som ikke har \\_FillValue ellermissing\\_valueattributter, og de foreslåede nye \\_FillValue attributter. Se endnu[Tilføj \\_Fill Værdiattributter](/docs/server-admin/datasets#add-_fillvalue-attributes)for mere information og instruktioner.
             
        * Hvis du kompilererERDDAP™, du skal ændre klassepat parameter på javac kommandolinjer for at tilføje en henvisning til disse nye krukker: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotationer.jar;lib/jackson-core.jar;lib/jackson-databind.jar; .
             
    * CHANGED: Tomcat 9 er nu den anbefalede version af Tomcat forERDDAP. Den seneste version af Tomcat 8.5+ er også fin for nu. Vi rensede opERDDAP's[Tomcat installationsvejledning](/docs/server-admin/deploy-install#tomcat).
        
Den seneste version afJava8:8 (Ikke ikkeJava9, 10, 11,...) fra fra fra[Vedtagelse afOpenJDK](https://adoptopenjdk.net/)forbliver den anbefalede version afJavafor for forERDDAP.Java8 har Long Term Support fra AdoptOpenJDK, så det forbliver sikkert at bruge, men husk at få den seneste version af det med jævne mellemrum af sikkerhedsmæssige årsager.
        
    * NYHED: Script SourceNames / udledte variabler i Tabular Datasets
EDDTableFraFiles, EDDTableFraDatabase, og EDDTableFraFileNames datasæt kan nu indeholde udtryk og scripts i desourceName. Dette lader dig gøre nye variabler baseret på eksisterende variabler i kildefiler. Beregningen for en given ny variabel sker inden for en række af resultaterne, gentagne gange for alle rækker. For eksempel at gøre en længdevariabel med værdier i intervallet -180 - 180° fra en variabel med værdier i interval 0 - 360°:
        &lt;sourceNameOggt; =Math2.anglePM180 (Senge: 1x værelse med kingsize-seng ("lon") ) &lt;/ / / /sourceName&gt; &gt; &gt; &gt;
For detaljer, se[Script Sourcenavne](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Tak til Bob Simons (der planlagde dette førERDDAP™v1.0 og endelig fandt en måde at implementere den) , Kevin O'Brien, Roland Schweitzer, John Maurer og Apache JEXL bibliotek for at gøre den virkelig hårde del (og gør det godt) .
         
    * NYHED: Usignede datatyper (ubyte, ukort, uint, ulong) understøttes nu. Bemærk, at mange filtyper (f.eks. .das, .dds,.nc3 3) Støtte ikke alle disse nye datatyper. Se billederne[Datadata Type dokumentation](/docs/server-admin/datasets#data-types)for detaljer om, hvordanERDDAP™Tilbyder disse forskelle. Især siden(OPeN)DAP.dds svar, understøtter ikke signerede aftes, lange eller ulongs, kan du brugeERDDAP's fanulær repræsentation af .das og .das som set i denhttp.../erddap/ **info info** /_datasetID_.html side (for eksempel,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) som du også kan få i andre filtyper eller de.nccsvMetadata (for eksempel,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) , begge af hvilke understøtter alle datatyper i alle situationer.
        
ADVARSEL: For datasæt, der påvirkes af denne ændring, er det muligt, at du vil se problemer med datasættet, fordi de data, der er berørtERDDAP™Læser fra kilden kan være forskellige (f.eks., variabler, der tidligere er læst som signerede integers, kan nu læses som usignede integers) . De resulterende problemer omfatter: nye filer, der ikke føjes til datasættet, og/eller fejl, når du forsøger at få adgang til dataene. Hvis et datasæt har problemer, den første ting at prøve er at[sæt en hård Flag](/docs/server-admin/additional-information#hard-flag)for datasættet. Hvis det ikke løser problemet, skal du se på log. txt for at se fejlmeddelelser, dykke ind i fejlendatasets.xmlfor datasættet, og/eller måske rerun generereDatasets.xml til datasættet.
Tak til netcdf-java 5.x (som tvang problemet) og den kommende CF 1.9.
        
    * IMPROVED: Der er nu[bedre dokumentation/advice](/docs/server-admin/datasets#s3-buckets)for hvordan du opretter et datasæt fra filer i AWS S3 skovle. Tak til Micah Wengren.
         
    * CHANGED: Der er flere ændringer relateret til"files"system.
        * Koden til at håndtere dette blev omskrevet for at være brugbart af flere klasser.
             
        * NYHED: Brugeranmodninger til mappelister kan nu anmode om, at svaret er en af de standard sletter tabeltyper ved at gøre den ønskede filudvidelse: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsveller.xhtml). For eksempel,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Tak til Kyle Wilcox og Shane St Savage.
             
        * IMPROVED: Nu, Generer Datasæt Xml vil ikke inkludere en&lt;tilgængeligViaFiles&gt; tag i output. Antagelsen er, at datasættet vil stole på værdien af den nye&lt;StandardAccessibleViaFiles&gt; tag i opsætning.xml. Se endnu[tilgængelig ViaFiles](/docs/server-admin/datasets#accessibleviafiles).
             
        * VIGTIGT: Yderligere datasættyper understøtter nu tilgængelige ViaFiles:EDDGridSideBySide,EDDGridAggregateExistingDimension,EDDGridFraErddap, EDDTableFraErddap,EDDGridFraEDDTable, EDDTableFraEDDGrid, ogEDDGridFraEtopo. For disse vil filerne fra et givet fjern-/barn-datasæt kun være tilgængelige, hvis både forælderen og fjern/barn-datasættet har tilgængelige ViaFiles sæt til ægte (perhaps via&lt;StandardAccessibleViaFiles&gt;). Tak til Damian Smyth og Rob Fuller.
             
        * TO DO / RECOMMENDATION: Vi anbefaler at gøre alle relevante datasæt tilgængelige via filsystemet ved at indstille&lt;StandardAccessibleViaFiles&gt; til ægte i opsætning.xml, fordi der er en gruppe brugere, som dette er den foretrukne måde at få dataene. Blandt andre årsager,"files"systemet gør det nemt for brugerne at se, hvilke filer der er tilgængelige, og når de sidste ændres, gør det nemt for en bruger at opretholde deres egen kopi af hele datasættet. Hvis du generelt ikke ønsker at gøre datasæt tilgængelige via filsystemet, skal du indstille&lt;StandardAccessibleViaFiles&gt; til falsk. I begge tilfælde, bare brug&lt;tilgængeligViaFiles&gt; for de få datasæt, der er undtagelser til den generelle politik fastsat af&lt;StandardAccessibleViaFiles&gt; (f.eks. når datasættet bruger.ncml filer, som ikke er virkelig nyttige for brugere) .
             
    * IMPROVED: Nu, hvis en kildedatasæt har CF gitter\\_mapping information, genererer Datasæt Xml til gitterded datasæt vil tilføje oplysninger til globale&lt;addAtts&gt;, og oplysningerne vil blive tilføjet til globale&lt;kildeAtts&gt; Hver gang data læses fra filen. Oplysningerne vises i datasættets globale attributter som et sæt attributter med prefix gitter\\_mapping\\__.
         
    * VIGTIGT: Støtte til grupper, når du læser.nc4 4 (og i nogle grad i.hdf5 5 5) filer. Generelt, enERDDAP™Datasæt vil blive konstrueret fra variablerne i en af filets grupper. Også, GenererDatasets Xml tilEDDGridFraNcFiles ogEDDGridFraNcFiles Upakket nu beder om en "gruppe" (f.eks., "" for alle / alle grupper, "someGroup", "someGroup/someSubGroup", eller "\\[rodrod\\]" for bare rodgruppen) . Tak til Charles Carleton og Jessica Hausman.
         
    * IMPROVED: GenererDatasets Xml tilEDDGridFraNcFiles ogEDDGridFraNcFiles Udpakket understøtter nu en valgfri "DimensionsCSV" parameter, som lader dig angive kildenavnene for de dimensioner, du ønsker, at denne datasæt skal bruge. Brug "" til at få de variabler, der bruger de mest dimensioner, som før. Også en relateret lille fejl, der opstod med denne type fil, er nu rettet. Tak til Sujal Manandhar.
         
    * BUG FIX: GenererDatasets Xml lister nu korrekt "EDDTableFraJsonlCSVFiles" (Ikke "EDDTableFraJsonlCSV") som en af EDDType-indstillingerne. Tak til Andy Ziegler.
         
    * VIGTIGT:EDDGridFraNcFiles Upakket nu standardiserer "enheder" attributter til standard /"kanonisk" udenheder (den samme metode som Units konverter) . For eksempel,"meter per second","meters/second","m.s^-1", og"m s-1"Alt bliver"m s-1". Tak til Andy Ziegler.
        
ADVARSEL: Det er muligt, at dette vil forårsage problemer for nogle eksisterende datasæt (f.eks., forårsage nye filer til at blive mærket "bad") . Hvis ja,[sæt en hård Flag](/docs/server-admin/additional-information#hard-flag)for datasættet, så alle kildefiler vil blive genlæst med det nye system.
        
    * IMPROVED: Nu, en variabel&lt;sourceName&gt; kan angive en fast værdi på =NaN og variablen kan have enactual\\_rangeattribut, der angiver et endeligt interval. Dette er nogle gange nyttigt, så et datasæt (Især en EDDTableFraFileNames datasæt) Kan have dummy variabel (s s s)   (f.eks. breddegrad, længde, periode) med faste værdier af NaN, men med en gyldigactual\\_range  (som angivet af attributten) . Derefter kan en bruger søge efter datasæt, der har data i en bestemt breddegrad, længde, tidszone og dette datasæt kunne sige, at den har relevante data (selvom alle de faktiske rækker af data vil vise NaN) . Se billederne[Fast værdidokumentation](/docs/server-admin/datasets#fixed-value-sourcenames).
Tak til Mathew Biddle.
         
    * NYHED: Nu, tedatasets.xmlchunk til en EDDTableFraAsciiFiles eller EDDTableFra kolonnearAsciiFiles dataset kan indeholde et tag, der fortællerERDDAP™at ignorere alle linjer øverst på filen op til og herunder den linje, der matcher det angivne regulære udtryk. For eksempel,
        &lt;Søgeresultat for SkipHeaderToRegex&gt;\\*“”\\*“”\\*END af TRIN.\\*&lt;/skipHeaderToRegex&gt;
vil ignorere alle linjer op til og herunder en linje, der starter med "\\*\\*\\* END OF HEADER". Se [&lt;KickHeaderToRegex&gt; dokumentation] (/docs/server-admin/datasets#skipheadertoregex) .
Tak til Eli Hunter
         
    * NYHED: Nu, tedatasets.xmlchunk til en EDDTableFraAsciiFiles eller EDDTableFra kolonnearAsciiFile dataset kan indeholde et tag, der fortællerERDDAP™at ignorere alle linjer i den fil, der matcher det angivne regulære udtryk. For eksempel,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

vil springe alle linjer, der starter med "#". Se [&lt;BrugervejledningerRegex&gt; dokumentation] (/docs/server-admin/datasets#skiplinesregex) .
Tak til Eli Hunter.
         
    * NYHED: Thedatasets.xmlFærst for alle EDDTable datasæt kan nu inkludere & til Varer Hvor (_attributeNamesCSV_) . Hvis det gør,ERDDAP™vil tilføje en widget for hver af den angivne attribut Navne på datasættets data Access-formular (.html side) at gøre det nemt for brugerne at tilføje &tilføje Varer Hvor (_attribute Navn, egenskab Værdi_) til anmodning.
Se billederne[& tilsætning Varer Hvor dokumentation](/docs/server-admin/datasets#addvariableswhere).
Tak til Aurelie Briand, et al.
         
    * NYHED Brugervejledning:ERDDAP-lint
        ERDDAP-lint er et program fra Rob Fuller og Adam Leadbetter of te Irish Marine Institute, som du kan bruge til at forbedre metadata på dinERDDAP™Datasets.ERDDAP-lint "fordele regler og en simpel statisk web ansøgning for at køre nogle verifikationstest mod dinERDDAP™server. Alle testne kører i webbrowseren." Ligesom[Unix/Linux lint værktøj](https://en.wikipedia.org/wiki/Lint_(software)), kan du redigere de eksisterende regler eller tilføje nye regler. Se endnu[ERDDAP-lint](https://github.com/IrishMarineInstitute/erddap-lint)for mere information.
        
Dette værktøj er især nyttigt for datasæt, som du har oprettet for lidt tid siden, og nu ønsker at bringe op til dato med dine aktuelle metadata præferencer. For eksempel tidlige versioner af GenererDatasets Xml gjorde ikke nogen indsats for at skabe globalcreator\\_name,creator\\_email, skaber\\_type ellercreator\\_urlmetadata. Du kan brugeERDDAP-lint til at identificere de datasæt, der mangler disse metadata attributter.
        
Tak til Rob og Adam for at skabe dette værktøj og gøre det tilgængeligt for denERDDAP™fællesskab.
        
    * NY: Nu er det okay, hvis nogle af filerne i enEDDGridFraFiles datasæt har ikke alle datasæts variabler. Filerne vil blive inkluderet som om de havde variablerne (med alle manglende værdier) .
Tak til Dale Robinson og Doug Latornell.
         
    * NY: Der er nye brugsstatistik i logfilen og Daily Report for at hjælpe administratorer identificere de brugere, der forårsager hukommelsesproblemer. Statistikken hedder "OutOfMemory (Array størrelse) "OutOfMemory" (For Big) ", og "OutOfMemory (Vejen for Big) ". De viser IP-adresserne for de brugere, der har anmodet om i disse kategorier, og antallet af anmodninger, de har foretaget. Hvis der ikke var fejlagtige anmodninger, vises disse statistikker ikke. "Out OfMemory" (Array størrelse) " og "OutOfMemory (Vejen for Big) "anmodninger er normalt ikke et problem, fordi anmodningerne var så store, atERDDAP™fangede dem hurtigt og returnerede en fejlmeddelelse. The "Out OfMemory (For Big) "anmodninger er mere farligt, fordiERDDAP™gjort nogle indsats, før det indså, at der ikke var nok hukommelse i øjeblikket tilgængelig for at håndtere anmodningen (selvom problemet kan være andre anmodninger lige før disse anmodninger) .
        
Der er også nye statistikker ved navn "Stor anmodning, IP-adresse", som viser de brugeres IP-adresser, der gjorde store anmodninger (i øjeblikket, gitterded.ncFiler &gt; 1 GB) .
        
Også tidsseriens tabel på status.html-siden indeholder nu en "memFail" kolonne, der viser antallet af anmodninger, der mislykkedes med "OutMemory (For Big) " fejl siden de sidste store Load Datasets. Alle andre end 0 her er mindst nogle årsager til bekymring.
Tak til Bob Simons.
        
    * NYHED: Den nye version afHyraxviser mappelister forskelligt end før.ERDDAP™kan nu læse de gamle og nye mappelister.
         
    * NYHED: Dataset reloads og brugerreaktioner, der tager &gt;10 sekunder for at afslutte (succes eller mislykkedes) er markeret med " (&gt;10s&#33;) ". Således kan du søge log.txt-filen for denne sætning for at finde de datasæt, der var langsom til at indlæse eller anmodningsnummeret af de anmodninger, der var langsom til slut. Du kan derefter se højere i log.txt-filen for at se, hvad datasættet problem var, eller hvad brugerens anmodning var, og hvem det var fra. Disse langsomme datasæt belastninger og brugeranmodninger er nogle gange skattende påERDDAP. Så vel vidende mere om disse anmodninger kan hjælpe dig med at identificere og løse problemer.
    * VIGTIGT: Når du har godkendt et CFG-datasæt,ERDDAP™Nu sikrer variabler med cf\\_role attributter på den tilsvarende cdm\\_...\\_variables liste og ikke på andre cdm\\_...\\_variables lister. Hvis en tidsserieProfil datasæt f.eks. har en "station\\_id" variabel, der har cf\\_role=timeseries\\_id attributten, skal "station\\_id" være i cf\\_timeseries\\_variables liste, men ikke være i cf\\_profile\\_variables liste.
Tak til Micah Wengren.
         
    * IMPROVED: 'Simplify' er nu hurtigere, bruger mindre hukommelse og kan returnere LongArray. Tak tilUnidata.
         
    * IMPROVED: hurtigstart er nu væsentligt hurtigere for EDDTableFra (nc-relaterede) Filer (undtagen EDDTableFraNcCFFiles og EDDTableFraInvalidCRAFiles) fordi gøre Forventet (og et andet sted) Læs nu blot prøvefilens metadata i stedet for at læse alle data. Tak til Jessica Austin.
         
    * IMPROVED: Der er nu støtte til tidsstrenge med præcision større end to-the-milli sekunder, hvis de ekstra cifre er alle 0'er, f.eks. "2020-05-22T01:02:03.456000000Z". Tak til Yibo Jiang.
         
    * IMPROVED: GenererDatasetsXml's EDD.suggestDestinationName bruges til at fjerne "(" og alt efter. Nu fjerner det (.\\*) kun hvis det er slutningen af slutningen afsourceName. Nu fjerner det også\\[.\\*\\]kun hvis det er slutningen af slutningen afsourceName. Tak til Julien Paul.
         
    * IMPROVED: GenererDatasets Xml gør nu variablendestinationNames unikt ved tilføjet \\_2, \\_3, ..., efter behov. Tak til Julien Paul.
         
    * VIGTIGT: Når Kalender2.parseDateTime parses dd, hh eller HH, kan den første "cifre" nu være et rum.
    * KNOWN PROBLEM: Begyndende medERDDAP™2.10,.ncml filer, der forsøger at ændre en attribut, skal du ikke ændre attributten. Dette er en kendt fejl i netcdf-java, som jeg har rapporteret, og de siger vil blive rettet i den næste udgivelse af netcdf-java.
         
    * Velkommen til FIX: Jeg lavede et ordentlig system til test af ødelagte links iERDDAP™websider, så der skal nu være meget få brudte links (mindst som hver udgivelsesdato - nye brudte links opstår ofte) .
         
    * BUG FIX: EDDTableFraHtttpGet mislykkedes med visse typer anmodninger. Nu er det ikke. Tak til Emma på BODC.
         
    * BUG FIX: For at håndtere nogle anmodninger gjorde EDDTable en midlertidig fil for hver ønskede variabel, med et filnavn, der slutter i variablens navn. Hvis variablens navn også var en type kompression (f.eks.) ,ERDDAPville prøve (og fejl) at dekomprimere den midlertidige fil. Nu slutter de midlertidige filnavne i ".temp". Tak til Mathew Biddle.
         
    * BUG FIX: GenererDatasetsXml og Kalender2.convertToJavaDatotid Format er nu meget mindre tilbøjelige til at foretage en forkert ændring, når du forsøger at fastsætte et eventuelt ugyldigt tidsformat. Desværre vil ingen auto-suggested datoTime format ændres. Tak til Mathew Biddle.
         
    * BUG FIX: Hvis der var en fejl, mens du får indhold fra en fjern URL, og hvis fejlStream-indholdet er komprimeret,ERDDAP™Nu kan dekomprimere fejlmeddelelsen. Tak til Bob Simons.
         
    * BUG FIX:&lt;AbonnentToRemoteErddapDataset&gt; blev ikke anvendt, når EDD... FraErddap dataset var et barn datasæt. Nu er det. Tak til Chris Romsos.
         
    * BUG FIX: GenererDatasets Xml mener ikke længere et kildevariabelt navn startende med "latin" kan være breddegrad. Tak til Vincent Luzzo.
         
    * BUG FIX: Nu er en OutOfMemory fejl, mens du læser en datafil, mens du behandler en brugers anmodning ikke er en grund til at tilføje en fil til BadFiles liste. Tak til Bob Simons.
         

## Version 2.02{#version-202} 
 (udgivet 2019-08-21) 

*    **Nye funktioner og ændringer (for brugere) :** 
    * NYHED: Der er nu to måder at søge efter datasæt på flereERDDAPs. De arbejder lidt anderledes og har forskellige grænseflader og muligheder.
        
        *   [SøgMultipleERDDAPs.html](/SearchMultipleERDDAPs.html)fra Bob Simons/NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)fra Rob Fuller/The Marine Institute of Ireland.
        
Tak til Tylar Murray for den oprindelige anmodning.
         
    * IMPROVED: en anmodning til den"files"system til at downloade en fil, der rent faktisk er på en fjern hjemmeside (f.eks. AWS S3) nu fører til en omdirigering, så brugeren vil faktisk downloade dataene fra kilden, i stedet for at brugeERDDAP™som formidler. Tak til Andy Ziegler ogNOAA.
         
    * NY: Som et eksempel på de nye AWS S3-relaterede funktioner, og for at gøre det nemmere for alle at gennemse og downloade filer fra offentlige AWS S3 skovle, har vi skabt
        [~110 prøve datasæt](https://registry.opendata.aws/), der gør det muligt for alle at gennemse indholdet af næsten alle
        [AWS S3 Åbne dataskovler](https://registry.opendata.aws/). Hvis du klikker på"files"Link til nogen af disse prøvedatasæt, kan du gennemse mappetræet og filer i denne S3 spand. På grund af disse datasets arbejde, er disse mappelister altid helt opdaterede, fordiERDDAP™får dem på farten. Hvis du klikker ned på mappetræet til et egentligt filnavn og klikker på filnavnet,ERDDAP™vil omdirigere din anmodning til AWS S3, så du kan downloade filen direkte fra AWS.ERDDAP™Administratorer kan
        [Læs anvisninger for hvordan du gør dette for andre S3 skovle](/docs/server-admin/datasets#working-with-aws-s3-files). Tak til Andy Ziegler ogNOAA.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Kræver dig ikke
         
    * VIGTIGT:ERDDAP's metode til opbevaring af arrays af strenge (StringArray) er nu meget mere hukommelse effektiv. streng streng streng Arrays bruges overaltERDDAP™, især når du læser tabulære ASCII-datafiler. Andre ændringer gør læsning CSV/TSV/SSV ASCII, kolonnear ASCII og jsonlCSV tabulære datafiler hurtigere og meget mere hukommelse effektiv. Resultatet er: for en 764 MB ASCII data testfil (men komprimeret til en 52MB.gzfilfil) med 3,503,266 rækker og 33 kolonner, den maksimale hukommelse forbrug gik fra 10 GB ned til 0,6 GB (på toppen) . Tiden til at læse det gik fra ~7 minutter (men varierer meget med hvor meget fysisk hukommelse er i computeren) ned til ~36 sekunder (herunder 10'er for forenklet () som kun bruges af GenererDatasets Xml) . Mange andre steder i nærhedenERDDAP™vil drage fordel af denne øgede hukommelseseffektivitet. Tak til Tylar Murray og Mathew Biddle.
        
Jeg udforskede en anden løsning (Opbevaring af strenge i StringArray som UTF-8-enkodet afte arrays) . Det reducerer hukommelsesforbruget en anden ~33%, men på bekostning af ~33% nedsænkning. Sammenlignet med det system, der nu bruges, der syntes som en dårlig handel off. Det er nemmere at give en computer mere hukommelse (Køb mere hukommelse til ~$200) end at gøre det hurtigere (Køb en helt ny computer) .
        
Hvis det er praktisk, er det stadig altid en god ide at opdele store tabulære datafiler i flere mindre filer baseret på nogle kriterier som f.eks.stationIDog/eller tid.ERDDAP™vil ofte kun være nødt til at åbne en af de små filer, der svarer til en brugers anmodning, og dermed kunne reagere meget hurtigere.
        
    * IMPROVED: Der er nu[ERDDAP™AWS S3 dokumentation](/docs/server-admin/datasets#working-with-aws-s3-files), som beskriver, hvordan man fårERDDAP™at arbejde med datafiler i AWS S3 skovle.
Også,ERDDAP™bruger nu nye funktioner i AWS S3JavaAPI.
Også,ERDDAP™Tillad nu AWS S3 webadresser til at inkludere yderligere tegn (periode, bindestreg, understregning) i spandnavne.
Også,ERDDAP™kræver nu, at AWS S3 skovl webadresser identificeres på en bestemt måde:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
hvor præfiks er valgfri.
Tak til Andy Ziegler ogNOAA.
         
    * IMPROVED: GenererDatasets Xml behandler nu yderligere fællesmissing\\_values stand-ins som manglende værdier og så er mere sandsynligt at konvertere en kolonne til en numeriske data type. Også, PrimitiveArray.simplify () Nu loger, som bestemt dataværdi forårsagede det til at behandle en given kolonne som en kolonne af strenge. Tak til Mathew Biddle.
         
    * VIGTIGT:&lt;anmodning Blacklist&gt; understøtter nu .\\*.\\*  (eller :\\*:\\*for IPv6) i slutningen af IP-adresserne, så du kan blacklist en større del af IP-adresser, f.eks. 110.52.\\*.\\*  (Kina Unicom Tianjin) . Se dokumentationen for [&lt;Anmod om Blacklist&gt;] (/docs/server-admin/datasets#requestblacklist) Tak til Kina Unicom og Kina Telecom.
         
    * VIGTIGT: Hvis en datasæts kilde ikke angiver en"institution"attribut, GenererDatasets Xml og indlæseDataset nu få det fra en "creator\\_institution" egenskab (hvis det er tilgængeligt) . Tak til Micah Wengren.
         
    * BUG FIX: standardiser Hvad blev ikke altid anvendt til ASCII datafiler.
Desuden håndterede EDDTable ikke ordentligt begrænsninger på tidsværdier, når kilden havde strenge tidsværdier og standardiser Hvad blev brugt.
Tak til Paloma de la Vallee.
        
Jeg havde ikke klart tilstand før: du skal bare bruge standardize Hvilke funktioner, når du rent faktisk har brug for dem (f.eks. når forskellige kildefiler gemmer tidsværdier på forskellige måder) , fordi nogle anmodninger til datasæt, der bruger standardiser Hvad vil blive behandlet lidt langsommere.
        
    * BUG FIX: En fejl i kode, der bruges afEDDGridFraNcFiles forårsagede det at mislykkes med.nc4 og 4.hdf5 filer, der har "lang" (int64) variabler. Dette er nu rettet. Tak til Friedemann Wobus.
         
    * BUG FIX: Små ændringer til ISO 19115-filer for at gøre en anden validering glad. Tak til Chris MacDermaid og Anna Milan.
         

## Version 2.01{#version-201} 
 (udgivet 2019-07-02) 

*    **Nye funktioner og ændringer (for brugere) :** 
    * Ingen.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * BUG FIX: En fejl i koden, der genererer data Access-formularen fortabledapDatasets forårsagede, at webside skal være blank for nogle datasæt. Jeg forbedrede også håndteringen af uventede fejl på alle HTML-sider, så de vil (normalt) Vis en fejlmeddelelse. Tak til Marco Alba.
    * IMPROVED: GenererDatasets Xml udskriver ikke længere en langvarig advarsel øverst i outputtet. I stedet kan du se[Redigering af Gener Datasæt Xml Output](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Tak til Steven Baum.
    * IMPROVED: GenererDatasets Xml gør nu lidt forskellige anbefalinger i forskellige situationer for&lt;OpdaterEveryNMillis&gt; for EDD...Fra...Files datasets. Også, GenererDatasets Xml optager nu det oprindelige "ekstrakt" system til EDDTableFraFiles datasets.

## Version 2.00{#version-200} 
 (udgivet 2019-06-26) 

*    **ERDDAP™v2.00 er endelig her&#33; Hej&#33;**   
     
    * Vi undskylder den lange forsinkelse, der er nødvendig for at afslutte denne version.
Tak for din tålmodighed.
         
    * Den gode nyhed er, at den ekstra tid blev brugt til at tilføje flere af de funktioner, som brugerne havde anmodet om. Den dårlige nyhed er, at selv med forsinkelsen, ikke alle ønskede funktioner blev tilføjet. Vi beklager, men det syntes mere vigtigt at få denne udgivelse ud end at forsinke mere (for evigt?) tilføjer løbende nye funktioner. Vi lover at vende tilbage til hyppige udgivelser i fremtiden.
         
    * "Version 2?&#33; Er der store ændringer og uforeneligheder?
Store nye funktioner? Ja.
Big incompatibiliteter eller ændringer for administratorer eller brugere? Nej.
Vi hoppede fra v1.82 til v2.00:
        * dels at fejre 10 år (nu 11) siden den første offentlige udgivelse afERDDAP™  (v1.00 på 2008-05-06, som udadtil så bemærkelsesværdigt som v2.00) . På det tidspunkt,ERDDAP™er gået fra en installation til næsten 100 installationer i mindst 12 lande (Australien, Belgien, Canada, Frankrig, Indien, Irland, Italien, Sydafrika, Spanien, Thailand, Storbritannien, USA) .
        * dels at markere en stor tilføjelse i en helt ny retning:ERDDAP™Nu har et datasystem til at gå med de eksisterende dataservertjenester (Se se[EDDTableFraHttpGet](#eddtablefromhttpget)) ,
        * og dels fordi det ikke var et stort spring fra 1,82 til 2,00 numerisk, så dette syntes som det rigtige tidspunkt.
             
    * Den anden gode nyhed er, at der nu er to andre grupper, der bidrager kode tilERDDAP™  (i denne version og med indikationer vil de fortsætte) : Rob Fuller og Adam Leadbetter af Irlands marineinstitut og Roland Schweitzer af PMEL og Weathertop Consulting. Mange tak. Det er sandt, at de arbejder på projekter af deres eget valg, men det er den klassiske open-source udvikling model --grupper bidrager kode til de funktioner, de bedst ønsker at se tilføjet. Den ekstra fordel for bidragydere: de kommer til at bruge de nye funktioner så snart de er færdige; de behøver ikke at vente på den næste udgivelse afERDDAP. Din gruppe er velkommen til at bidrage, også&#33; Se billederne[ERDDAP™Programmeringsguide](/docs/contributing/programmer-guide).
         
    * Vi håber du kan lideERDDAP™v2.00. Vi ser frem til de næste 10 år afERDDAP™udvikling og stadig mere brug over hele verden.
         
*    **Nye funktioner og ændringer (for brugere) :**   
     
    * NYHED:orderByMeanfilter filter filter
for for fortabledapDatasæt vil beregne midlerne til de angivne grupper. Også, alle af deorderByMuligheder understøtter nu en ekstra måde at definere grupper på: _numerisk\\[/ nummer\\[tidenUnits\\]\\[:offset\\]\\]_, f.eks. tid/1 dag eller dybde/10:5. For eksempel,stationIDHoteller i nærheden afwaterTemp&orderByMean (" " " "stationID,tid 1 dag") ville sortere resultaterne afstationIDog tid, derefter beregne og returnere midlerne til vandTemp for hverstationIDfor hver dag. Disse er utroligt nyttige og kraftfulde nye funktioner. Den nye kode for disse funktioner og ændringerne til den gamle kode blev bidraget af Rob Fuller og Adam Leadbetter of Ireland's Marine Institute og indsendt via Git. Tak, fordi du var Rob og Adam&#33;
         
    * NYHED: output filtype til faneformede datasæt:[.data Tabelbord](https://developers.google.com/chart/interactive/docs/reference#dataparam),
en JSON fil formateret til brug med denGoogle Visualizationklientbibliotek (Google Charts) . Koden for dette blev bidraget af Roland Schweitzer og indsendt via Git. Tak, fordi du var Roland&#33;
         
    * NYHED: output filtype til faneformede datasæt:[.jsonlCSV1](https://jsonlines.org/examples/),
som den eksisterende.jsonlCSVmulighed, men med kolonnenavne på den første linje. Tak til Eugene Burger.
         
    * NYHED: Hvis administratoren gør det, kan brugerne nu logge ind med deres[ORCID](https://orcid.org)konto.
Det er et OAuth 2.0-godkendelsessystem, meget som Google-godkendelse. ORCID bruges vidt af forskere til unikt at identificere sig selv. ORCID-konti er gratis og har ikke privatlivsproblemer, som Google-konti har. Se endnuERDDAP's[Orcid-godkendelse instruktioner](/docs/server-admin/additional-information#orcid). Tak til BCO-DMO (Adam Shepard, Danie Kinkade osv.) .
         
    * NY: En ny URL-konverter konverterer forældede webadresser til opdaterede webadresser.
Se.../erddap/convert/urls.html på alle siderERDDAP™installation, f.eks.
        [Dette link til konverteren iERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Dette skal være nyttigt for dataledere. Dette bruges også internt af GenererDatasetsXml. Tak til Bob Simons og Sharon Mesick.
         
    * IMPROVED: The[Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)nu har muligheder for at konvertere enhver fælles streng tid til en ISO8601 streng tid eller konvertere enUDUNITS-lignende tidsenheder snor ind i en ordentligUDUNITSTidsenheder snor. Dette bør også være nyttigt atERDDAP™Administratorer, der har brug for at vide, hvad format til at angive for attributten "enheder" for strenge tidsvariabler. Dette bruges også internt af GenererDatasetsXml og standardiser Hvilken funktion af EDDTableFraFiles. Tak til Bob Simons.
         
    * NYHED: The[Units Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)har en ny "Standardize UDUnits" mulighed.
For eksempel er "deg\\_C/m" og "grader\\_C meter-1" begge konverteret til
"grader\\_C m-1". Denne funktion bruges også af standardiser Hvilken funktion af EDDTableFraFiles. Tak til Bob Simons.
         
    * NYHED: Til grafer (andre end overfladegrafer) på gitterdap's ogtabledap's Make A Graph websider, når x aksen ikke er en tidsakse, hvis kun et subset af x aksevariable's sortiment er synligt, er der nu knapper over grafen til at skifte X Axis venstre eller højre. Takket være Carrie Wall Bell / Hydrophone projekt.
         
    * NY: Til grafer kan X og/eller Y-akse nu bruge en Log skala.
Brugere kan styre Y Axis skala via en ny drop-down widget på gitteretap ogtabledapLav en graf websider. Se billederne[.xRange og . yRange dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Takket være Carrie Wall Bell / Hydrophone projekt.
         
    * VIGTIGT:ERDDAP™nu gør bedre brug af forskellige HTTP-fejlkoder og returnerer nu en(OPeN)DAPv2.0-formateret fejlmeddelelse nyttelast. Se endnu[detaljer](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Tak til Antoine Queric og Aurelie Briand.
         
    * IMPROVED: Brug ikke Netcdf-java/c eller andre softwareværktøjer til at oprette forbindelse til.nceller eller eller.hdffiler serveret afERDDAP's /files / system som hvis de var lokale filer.ERDDAP™afviser nu disse anmodninger. Det er forfærdeligt ineffektivt og forårsager ofte andre problemer. I stedet:
        
        * Brug(OPeN)DAPklient software til at oprette forbindelse tilERDDAP'sDAPtjenester til datasættet (som har /griddap/ eller /tabledap/ i URL) . Det er hvad der erDAPer for og gør så godt.
        * Eller brug datasættets data Access-formular til at anmode om en del af data.
        * Eller hvis du har brug for hele filen eller gentagen adgang i en lang periode, brugcurl,wget, eller din browser til at downloade hele filen, og få adgang til dataene fra din lokale kopi af filen.
        
          
         
    * VIGTIGT: På bagsidenERDDAP™hjemmeside, Full Text Search er nu ovenfor "Vis en liste over alle datasæt", da det er det bedste udgangspunkt for de fleste brugere. Tak til Didier Mallarino og Maurice Libes.
         
    * VIGTIGT: På DataProviderForm3.html Der er nu rullelister af fællesstandard\\_names. Tak til nogen på IOOS DMAC møde.
         
    * VIGTIGT: På /files/websider er der nu et link til det nye "Hvad kan jeg gøre med disse filer?" afsnit af /files/dokumentationen. Dette afsnit beskriver forskellige filtyper og giver forslag til, hvordan du arbejder med dem. Tak til Maurice Libes.
         
    * VIGTIGT: Næsten hver anmodning tilERDDAP™bør være mindst lidt hurtigere, og nogle gange meget hurtigere.
         
    * BUG FIX: Under visse omstændigheder, når en EDDTable datasæt gemte data i nogle typer af.ncfiler, den globale "id" egenskab blev indstillet til filens foreslåede navn, som indeholder et hash til at gøre det unikt for den pågældende anmodning. Nu er "id" korrekt efterladt uændret (hvis det er angivet) eller sæt til datasættetsdatasetID  (hvis ikke angivet) . Tak til John Maurer.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:**   
     
    * TO DO: Denne udgivelse vil tage tid og arbejde fra dig. Vær tålmodig og plan om at tage et par timer for at foretage de krævede ændringer og et par flere timer for at eksperimentere med nye funktioner.
         
    * Til sikkerhed, lave en sikkerhedskopi af din nuværende opsætning.xml ogdatasets.xmlfiler, så du kan vende tilbage til dem i det usandsynlige tilfælde, hvor du skal vende tilbage tilERDDAP™v1.82.
         
    * TO DO: Det anbefalesJavaer nu VedtageOpenJDK's OpenJDK 8:8 (LTS) + HotSpot.
Dette er en open source variant afJavader ikke har restriktioner på brugen (i modsætning tilOracle'sJavadistribution af distribution) . Det stammer fraOracle'sJavapå en on-going måde, medOracleVelsignelse. Af sikkerhedsmæssige årsager er det vigtigt at holde dinJavaVersion up-to-date. Se endnuERDDAP's[Javainstallationsvejledning](/docs/server-admin/deploy-install#java).
         
    * TO DO: AdoptOpenJDK'sJavakræver en lille tilføjelse til din Tomcat installation: se te[Ressourcer cache instruktioner](/docs/server-admin/deploy-install#contentxml). Jeg tror, at dette er en erstatning for -XX:MaxPermSize indstilling, som (Vedtagelse) OpenJDK understøtter ikke længere.
         
    * TO DO: Den nye standard og anbefaler&lt;Typografi&gt; indstilling i opsætning.xml er
DejaVu Sans, der er bygget i AdoptOpenJDK'sJava. Se billederne
        [Opdaterede skrifttypeinstallationsinstruktioner](/docs/server-admin/deploy-install#fonts).
         
    * TO DO: Mange tags flytter fra setup.xml tildatasets.xml. Fordelen er, at du kan ændre deres værdier, mensERDDAP™kører, uden genstartERDDAP. Især kan du nemt skifte&lt;StartBodyHtml5&gt; for at vise en midlertidig besked påERDDAP™Forsideside (f.eks. "Check out te new JPL MUR SST v4.1 datasæt..." eller "DetteERDDAP™vil være offline for vedligeholdelse 2019-05-08T17:00:00 PDT gennem 2019-05-08T20:00:00 PDT.) . Hvis / når du ændrer disse tags idatasets.xml, ændringerne vil tage virkning næste gangERDDAP™Læserdatasets.xml.
         
        
        1. Kopier dette indhold ind i dit indholddatasets.xmlfil (alt i nærheden af starten af filen, efter&lt;ErddapDatasets&gt;):
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

        2. En-til-en, kopiere værdien (hvis nogen) for hver af disse tags fra din setup.xml fil i det nye tag, du lige har fortid (ovenfor) i in in in indatasets.xml. For eksempel, hvis du havde brugt en værdi på 30 for&lt;cacheMinutes&gt; i opsætning.xml, bør du kopiere denne værdi til den nye&lt;cacheMinutes&gt; tag idatasets.xml  (selvom værdien er den samme som den nye standardværdi, er det bedst at bare forlade mærket idatasets.xmlblank) .
            
Hvis værdien er forskellig fra den nye foreslåede standard (andre end for&lt;StartBodyHtml5&gt; og&lt;ShortDescriptionHtml&gt;, som er nyttige til at tilpasse din søgningERDDAP™installation), skal du overveje at skifte til de nye standardværdier. Dette er især sandt&lt;partielRequestMaxBytes&gt; og&lt;delvisRequestMaxCells&gt;, hvor standard/suggested værdi har ændret sig betydeligt i årene.
            
Når du kopierer hver værdi, skal du slette mærket og dens beskrivelse fra opsætning.xml. Det er bedre at have disse tags idatasets.xml. Og der er nu bedre beskrivelser i[OpsætningDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
En quirk af det nye system er, at den første webside, når du starterERDDAPvil være standardenERDDAP™webside. Hver efterfølgende webside vil bruge det ...Html indhold, du angiver idatasets.xml.
        
    * ADVARSEL: Den første gang du kørerERDDAP™v2.0, datasæt baseret på lokale datafiler vil indlæse **meget meget meget** langsomt fordiERDDAP™skal genskabe sin database af filer i et lidt andet format. Efter den langsomme indledende reload, vil de indlæse hurtigt, som før. Vær venligst tålmodig.
         
#### EDDTableFraHttpGet{#eddtablefromhttpget} 
    *   [BIG NEW FEATURE: EDDTableFraHttpGet](#eddtablefromhttpget)  
Indtil nu,ERDDAP™bare læse data og gjorde det tilgængeligt for brugerne. Nu, nu,ERDDAP™har et simpelt, effektivt system til at opfange realtidsdata fra sensorer. Blandt andre funktioner, denne datasæt tilbyder finkornet versioning: det husker hver ændring lavet til datasættet, når det blev lavet, og af hvem. Normalt vil brugerne bare have den nyeste version af datasættet, med alle ændringer, der anvendes. Men der er mulighed for brugere at anmode data fra datasættet, da det var på ethvert tidspunkt. Dette letter reproducerbar videnskab. I modsætning til de fleste andre nær-real-time datasæt, er disse datasæt berettiget til at[DOIs s s](https://en.wikipedia.org/wiki/Digital_object_identifier). fordi de mødesDOIkrav om, at datasættet ikke ændrer sig, undtagen ved sammenlægning. Se endnu[EDDTableFraHttpGet](/docs/server-admin/datasets#eddtablefromhttpget). Tak til OOI (for længe siden og nu) for at tale om behovet for dette og Eugene Burger for påmindelsen om at arbejde på, hvad der er vigtigt.
         
    * BIG NEW FEATURE:ERDDAP™kan nu tjene data direkte fra eksterne komprimerede datafiler, herunder.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, eller .Z. Datasets kan indeholde en blanding af eksterne dokumenter (Måske de ældre datafiler?) og ikke-ekstern-komprimerede filer, og du kan komprimere / trykke på en fil til enhver tid.
        
Dette virker fantastisk&#33;
I de fleste tilfælde er den nedsænkning relateret til at dekomprimere filerne mindre. Vi opfordrer dig stærkt til at prøve dette, især for datasæt og/eller datafiler, der er uvist anvendt.
        
Dette kan spare dig $30.000 eller mere&#33;
Dette er et af de fåERDDAP™funktioner, der kan spare dig mange penge - hvis du komprimerer en masse datafiler, skal du have langt færre RAID'er/harddiske til at gemme dataene, eller omvendt, kan du tjene langt flere data (op til 10x) med de RAID'er, du allerede har. Hvis denne funktion gemmer dig fra at købe en anden RAID, så har den gemt dig omkring $30.000.
        
Se billederne[Eksternt komprimeret fildokumentation](/docs/server-admin/datasets#externally-compressed-files). Takket være Benoit Perrimond og Paloma de la Vallee.
        
    * BIG NEW FEATURE: AlleEDDGridFraFiles og alle EDDTableFraFiles datasets understøtter en&lt;cacheFraUrl&gt; tag og en&lt;cacheSizeGB&gt; tag. Hvis cacheSizeGB ikke er angivet, vil dette downloade og vedligeholde en komplet kopi af en fjerndatasæts filer. Hvis cacheSizeGB er angivet og er &gt;0, vil dette downloade filer fra fjerndatasættet, efter behov, i en lokal cache med en begrænset størrelse, som er nyttig, når du arbejder med cloud-baseret (fx S3) Datafiler. Se billederne[cache cache cache cache FraUrl dokumentation](/docs/server-admin/datasets#cachefromurl)for detaljer. Tak til Bob Simons og Roy Mendelssohn (hvem i årevis har skrevet scripts til at håndtere at lave lokale kopier af fjerndatasæt filer) Hoteller i nærheden af Lloyd Cotten, Eugene Burger, Conor Delaney (da han var på Amazon Web Services) , og Google Cloud Platform.
         
    * NYHED: Den nye EDDTableFraJsonlCSV klasse kan læse tabulære data fra
        [JSON Linje CSV-filer](https://jsonlines.org/examples/)  ("Better end CSV") . Tak til de mennesker på Marine Institute of Ireland for at fortælle mig om dette format og til Eugene Burger og PMEL for anmodning om at støtte det som en input type.
         
    * NYHED: AlleEDDGridog alle EDDTableFraFiles-datasæt understøtter en&lt;nThreads&gt; indstilling, som fortællerERDDAP™hvor mange tråde skal bruge, når de reagerer på en anmodning. Se billederne[nThreads dokumentation](/docs/server-admin/datasets#nthreads)for detaljer. Tak til Rob Bochenek af Axiom Data Science, Eugene Burger, Conor Delaney (da han var på Amazon Web Services) , og Google Cloud Platform.
         
    * NY standardiser Hvad for alle EDDTableFraFiles subclasses -
Tidligere, hvis for en given variabel, værdierne af de vigtige attributter (fx,scale\\_factor,add\\_offset,missing\\_value, \\_FillValue, enheder) var ikke konsekvent, EDDTableFraFiles ville vælge en værdi for hver attribut at være "valid" og markere filer med andre attributværdier som "Bad Files". Nu er der et system til at standardisere filerne så snart EDDTableFraFiles læser filerne. Se endnu[EDDTableFraFiles standardiser Hvad](/docs/server-admin/datasets#standardizewhat). En afERDDAP's vigtigste mål er at gøre datafiler og datasæt tilgængelige på en konsekvent måde. standardiser Hvad er et vigtigt nyt værktøj til at gøre denne virkelighed. Tak til Marco Alba, Margaret O'Brien (og andre EML-brugere) , BCO-DMO og InPort-brugere.
         
    * NEW EDDTableFraInvalidCRAFiles giver dig mulighed for at lave et datasæt fra en samling afNetCDF  (v3 eller v4)  .ncfiler, der bruger en bestemt, ugyldig variant af CF DSG Contiguous Ragged Array (CRA) filer. Prøve filer til denne datasæt type kan findes på https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Denne server er nu ikke tilgængelig\\]. Selv om selvomERDDAP™understøtter denne filtype, er det en ugyldig filtype, der ingen skal begynde at bruge. Grupper, der bruger denne filtype, opfordres til at brugeERDDAP™at generere gyldige CF DSG CRA-filer og stoppe med at bruge disse filer. Tak til Ajay Krishnan og Tim Boyer.
         
    * EDDTableFraThreddsFiles og EDDTableFraHyraxFiler er nu deprecated. Skift til EDDTableFraNcFiles (eller en variant) plus plus plus&lt;cacheFraUrl&gt;. Hvis det ikke virker af nogen grund, e-mailerd.data at noaa.gov. Hvis der ikke er klager før 2020, kan disse datasæt typer fjernes.
         
    * IMPROVED -- Systemet til automatisk at konvertere ikke-ISO 8601 gange til ISO 8601 gange (indført i v1.82) er blevet udvidet til at håndtere et stort antal ekstra formater. Dette påvirker GenererDatasetsXml ogERDDAP's håndtering af kilde metadata.
         
    * IMPROVED -- Med sin tredje store revision af strygetiden parsing system (og forhåbentlig den sidste) ,ERDDAP™ikke længere brugJava's DateTimeFormatter på grund af bugs, der undertiden påvirker ekstreme tider (år&lt;=0000).ERDDAP™Nu bruger sit eget system til parsing time strenge.
         
    * ADVARSEL: Den nye strygetid parsing system er noget strengere. Hvis en af dine data pludselig har kun manglende værdier for tidsværdier, er årsagen næsten helt sikkert, at tidsformatstrengen er lidt forkert. Der skal være fejlmeddelelser i log. txt relateret til tidsværdier, der ikke matcher tidsformatet -- der skal hjælpe dig med at løse tidsformatstrengen for det datasæt. Hvis du har brug for hjælp, skal du bruge indstillingen iERDDAP's Time Converter som "Convert\\[s s s\\]enhver almindelig streng tid i en ISO 8601 streng tid" - det angiver det format, som den konvertere, der bruges til at parse kildestrengen.
         
    * RECOMMENDATION: Den hurtigste, nemmeste og billigste måde at fremskyndeERDDAP's adgang til tabulære data er at sætte datafiler på en Solid State Drive (SSD) . De fleste tabulære datasæt er relativt små, så en 1 eller 2 TB SSD sandsynligvis er tilstrækkelige til at holde alle datafiler for alle dine tabulære datasæt. SSD'er bruger til sidst, hvis du skriver data til en celle, slette det og skrive nye data til denne celle for mange gange. I stedet anbefaler jeg, at (så meget som muligt) Du skal bare bruge din SSD til at skrive data én gang og læse det mange gange. Så skal selv en forbruger-grade SSD vare meget lang tid, sandsynligvis meget længere end nogen harddisk (harddisk) . Forbruger-grade SSD'er er nu billig (i 2018, ~$200 for 1 TB eller ~ $ 400 for 2 TB) og priser falder stadig hurtigt. Hvornår Hvornår skal man HvornårERDDAP™adgang til en datafil, en SSD tilbyder både
        
        * kortere ventetid (~0.1ms, versus ~3ms for en harddisk, versus ~10 (?) ms til en RAID, versus ~55ms til Amazon S3) , og
        * højere gennemløb (~500 MB/S, versus ~75 MB/s for en harddisk versus ~500 MB/s for en RAID) .
        
Så du kan komme op til en ~10X præstation boost (vs en harddisk) for $200&#33; Sammenlignet med de fleste andre mulige ændringer i dit system (en ny server til $10.000? en ny RAID for $5.000? en ny netværkskontakt til $5.000? osv.) , dette er langt den bedste Return On Investment (ROI) . Hvis din server ikke er indlæst med hukommelse, ekstra hukommelse for din server er også en stor og relativt billig måde at fremskynde alle aspekter afERDDAP.
        \\[SSD's ville være fantastisk til gitterded data, også, men de fleste gitterede datasets er meget større, hvilket gør SSD meget dyrt.\\]  
         
    * NYHED: Alle, der er logget ind, får rolle=\\[Log ind I nærheden af In In In In In In In In In In In In In In\\], selvom der ikke er noget&lt;Bruger&gt; tag for dem idatasets.xml. Hvis du indstiller datasæt's&lt;tilgængeligTo&gt; at\\[Log ind I nærheden af In In In In In In In In In In In In In In\\], så alle, der har logget indERDDAP™  (f.eks. via deres Gmail eller Orcid-konto) autoriseret til at få adgang til datasættet, selvom du ikke har angivet en&lt;Bruger&gt; tag for dem idatasets.xml. Tak til Maurice Libes.
         
    * IMPROVED: TheUDUNITS/UCUM enheder konverter blev betydeligt forbedret.
Det håndterer ugyldige enheder strenge bedre (begyndende med vægt på at bevare oplysninger, snarere end at håndhæve gyldighed) . Resultaterne har også en standardiseret syntaks.
         
    * NYHED: TheUDUNITS/UCUM enheder konverter har en ny mulighed for at standardisere enUDUNITSstreng.
Dette fungerer godt for gyldigtUDUNITSstrenge og rimeligt godt for ikke-standard / ugyldigUDUNITSstrenge. For eksempel f.eks.UDUNITSpr. sekund", "meter/sekund","m.s^-1", og"m s-1"vil alle vende tilbage "m.s-1". Dette var nødvendigt for den nye standardiser Det system, der er beskrevet ovenfor. Tak til Marco Alba, Margaret O'Brien (og andre EML-brugere) , BCO-DMO og InPort-brugere.
         
    * NYHED: EDDTableFraMultidimNcFiles nu har en[behandleDimensionsAs](/docs/server-admin/datasets#treatdimensionsas)mulighed, der fortællerERDDAP™at behandle visse dimensioner (f.eks. LAT og LON) som om de var andre dimensioner (f.eks.) . Dette er nyttigt for nogle forkerte filer, der bruger forskellige dimensioner til forskellige variabler, når de skal have brugt en dimension (f.eks.) . Takket være Marco Alba og Maurice Libes.
         
    * NYHED: Nu, altEDDGridFra...Files datasets understøtter en ny speciel aksesourceNamesom fortællerERDDAP™til at udtrække oplysninger fra filnavnet (bare filnavn.ext) og brug værdien til **erstatter erstatning** den eksisterende topakse værdi. Formatet er
        \\*\\*\\*replaceFraFileName,_dataType_,_ekstractRegex_,_captureGroup
Se endnu[denne dokumentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Tak til detNOAAVejfinder Daglig aggregation datasæt.
         
    * NYHED: Nu, altEDDGridFra...Files datasets understøtter en ny speciel aksesourceNamesom fortællerERDDAP™til at udtrække oplysninger fra filens vejnavn (mapper + filnavn.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroup
For dette bruger stinavnet altid'/'som den mappe separator figur, aldrig "".
Se endnu[denne dokumentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Tak til Paloma de la Vallee.
         
    * NYHED: Nu, alle EDDTableFra... Fildatasæt understøtter yderligere pseudovariablesourceNames, der udtrækker oplysninger fra filens filnavn (bare filnavn.ext)   (Se se[\\*\\*\\*FilName](/docs/server-admin/datasets#filename-sourcenames)) eller fra filens fulde stinavn (/dir1/dir2/filname.ext)   (Se se[\\*\\*\\*pathName](/docs/server-admin/datasets#pathname-sourcenames)) . Tak til Paloma de la Vallee.
         
    * NYHED: Hvis enEDDGriddatasæt har en eller flere meget store dimensioner (f.eks. millioner af værdier) som tager en masse hukommelse, kan du indstille den nye [&lt;dimensionValuesInMemory&gt;] (/docs/server-admin/datasets#dimensionværdisinmemory) indstilling til falsk (Standarden er sandt) , som forårsager datasættet til at gemme værdierne på disken og hente dem, når det er nødvendigt. Tak til David Rodriguez og Rich Signell (re:EDDGridFraAudioFiles) .
         
    * IMPROVED: Tidligere, hvis du genbestiltdataVariables til en EDDTableFraFiles dataset og genindlæst datasættet, EDDTableFraFiles ville læse alle datafiler. Nu kan det håndtere genbestilling uden at læse alle datafiler. Tak til Roland Schweitzer.
         
    * VIGTIGT: Nu, nårERDDAP™Læser ASCII, NCCSV og JSON Lines CSV tabulære datafiler, hvis det finder en fejl på en given linje (f.eks. forkert antal varer) , det logger en advarselsmeddelelse ("WARNING: Skipping line #"... " uventet antal varer...") Til højre[log.txt-fil](/docs/server-admin/additional-information#log)og derefter fortsætter med at læse resten af datafilen. Det er derfor dit ansvar at se periodisk (eller skrive et script til at gøre det) for denne meddelelse i loget. txt, så du kan løse problemerne i datafiler.ERDDAP™opsættes på denne måde, så brugerne kan fortsætte med at læse alle de tilgængelige gyldige data, selvom nogle linjer af filen har fejl. Tidligere,ERDDAP™markeret filen som "bad" og fjernet den fra datasættet.
         
    * VIGTIGT: Når præcise tider (f.eks. til den nærmeste anden eller millisekunder) gemmes på kilden som "minutters siden ..." (eller større enheder) ,ERDDAP™Nu runder dem til den nærmeste millisekunder, når du læser værdierne iERDDAP. Ellers er de flydende punktnumre blå og anmodninger om data på bestemte tidspunkter (f.eks. &time=2018-06-15T01:30:00) vil mislykkes. Tidligere beregnede det så præcist som muligt (og gør stadig, hvis enhederne er f.eks. "kunder siden ..." eller "millikunder siden ...") . Det er bedst at undgå dette problem ved ikke at bruge store enheder (f.eks. minutter eller timer) til at gemme præcise tidsværdier (f.eks. mikrokunder) -- computere gør et dårligt job med håndtering af decimalcifre. Tak til Marco Alba.
         
    * CHANGES til EDDTableFraEDDGridhvilket gør det meget bedre. EDDTableFraEDDGridlader brugerne forespørge gitterded-datasæt, når de var faneformede datasæt ("Beskydning af værdi") .
        
        * Det understøtter nu en&lt;maxAxis0&gt; tag (Standard=10) der angiver det maksimale antal akser\\[0\\]  (normalt"time") værdier, der kan genbruges på én gang. Dette forhindrer naive anmodninger fra at få EDDTableFraEDDGridat søge gennem en hel gitterded datasæt (som ville mislykkes med en timeout fejl) .
        * GenererDatasets Xml har nu mulighed for at generere EDDTableFraEDDGridDatasæt til alle de gitterede datasæt i en givenERDDAP™som matcher en bestemt regex (Brug .\\* for at matche alle datasæt) . De datasæt, som det skaber, har yderligere oplysninger i den sammenfattende egenskab, der angiver, at dette er en faneformet version af et gitteret datasæt. Og deresdatasetIDer detdatasetIDaf gitteret datasæt, plus "\\_AsATable".
        * Der er en stor hastighed op for den mest almindelige opsætning: når gitteret datasæt er enEDDGridFraErddap datasæt, der er i sammeERDDAP.
        
Tak til James Gallagher og Ed Armstrong.
         
    * NYHED: generere Datasæt Xml for alle typer datasæt er nu meget mere tilbøjelige til at tilføje en \\_FillValue ellermissing\\_valueattribut til en numeriske variabelsaddAttributes. Dette sker f.eks., når strenge mangler værdimarkører (f.eks., "", ".", "?", "NA", "nd", "NaN") for den variable i prøvefilen konverteres tilERDDAP's oprindelige manglende værdier (127 i byte kolonner, 32767 i korte kolonner, 2147483647 int kolonner, 9223372036854775807 i lange kolonner og NaN i flyt og dobbelt variabler) . Det sker også for NaN værdier i flyt og dobbelt variabler. Desuden blev "nd" tilføjet til listen over almindelige manglende værdimarkører i numeriske datakolonner, derERDDAP™bør kigge efter. Tak til Matt Biddle af BCO-DMO.
         
    * IMPROVED: ncdump mulighed i generere Datasæt Xml er nu mere som ncdump (men bruger stadig netcdf-java-versionen af ncdump) . Nu udskriver den en ny liste over muligheder. Nu, for.ncml filer, det udskriver ncdump output for resultatet af.ncml filændringer, der anvendes på underliggende.nceller eller eller.hdffil.
         
    * BUG FIX: Der var en fil håndtag lækage (i sidste ende forårsagerERDDAP™at fryse op) forårsaget, når du opretter nogle typer output filer, f.eks., .geotif, især når fejl opstod under skabelse. Jeg tror/hope dette er nu alle fast. Hvis du stadig ser problemer, så fortæl mig typen af datasæt (gitter eller bord) og den type fil, der forårsager problemet. Takket være Steven Beale, Lynn DeWittt, Jibei Zhao og andre.
         
    * BUG FIX: The The The The The The TheWMS Leafletdemoen konverterede ikke helt/svarende den "dybde" akse til "elevation". Nu, det gør, og de brudte legender anmodninger er rettet. Alle akseindstillinger i rullelisten er altid i stigende rækkefølge. Tak til Antoine Queric og Aurelie Briand.
         
    * BUG FIX: EDDTableFraFiles understøtter nu begrænsninger på strenge variabler, der blev oprettet fra char variabler i datafiler. Tak til Antoine Queric og Aurelie Briand.
         
    * BUG FIX: Når et datasæt ikke er tilgængeligt, forsøger datasættet at underrette (med meddelelsen "Denne datasæt er ikke tilgængelig i øjeblikket.") sine abonnenter, børsnoterede handlinger, rss og lonPM180 datasæt, der er afhængige af det. Tak til Roy Mendelssohn og Bob Simons.
         
    * BUG FIX: To bugs relateret til EDDTableCopy. Tak til Sam McClatchie.
         
    * IMPROVED: Antallet af mislykkede anmodninger vist på status.html-siden vil stige, fordi flere ting tælles som fejl end før.
         
    * VIGTIGT:ERDDAP's status.html nu viser "Requests (median gange i ms) " i tidsserien. Tidligere viste det median tider forkortet til heltals sekunder.
         
    * IMPROVED: I jsonld output, jsonld "name" kommer nu fra datasættets"title"i in in in inERDDAP, og jsonld "headline" kommer nu fra datasættets "datasetID" i "ERDDAP. Tidligere blev det omvendt. Dette synes forkert for mig, fordi i normal engelsk brug, "navn" er normalt en kort, (ideelt) unik identifikator, der sjældent/never ændrer (fx Robert Middlename Simons) , ikke en beskrivelse, som ikke er unik, og som nemt og ofte kan ændres (f.eks. "En fyr, der skriver software tilNOAA" vs. "En høj fyr, der skriver software tilNOAA" " " ") . Gee, ville det være fantastisk, hvis schema.org definition af[Navn](https://schema.org/name), i forbindelse med et datasæt, var mere specifik. Softwareudviklere bør kunne skrive en implementering af en specifikation baseret på specifikationen alene uden vejledning fra eksperter. Men jeg tager imod Google (Især Natasha Noy) , NCEI (Især Johannes Relph) , og Rob Fuller.
         
    * IMPROVED: I jsonld output, de fire "spatialCoverage GeoShape boks" værdier er nu minLat minLon maxLat maxLon. Tidligere blev lat- og lonpositionerne omvendt. Gee, ville det være fantastisk, hvis schema.org definition af[GeoShape](https://schema.org/GeoShape)Angive den korrekte ordre. Softwareudviklere bør kunne skrive en implementering af en specifikation baseret på specifikationen alene uden vejledning fra eksperter. Tak til Natasha Noy og Rob Fuller.

## Version 1.82{#version-182} 
 (udgivet 2018-01-26) 

*    **Nye funktioner (for brugere) :**   
     
    * Talrige subtile ændringer i udseende-og-feel afERDDAP™websider.
        * VIGTIGT:ERDDAP™Nu bruger HTML 5 og gør bedre brug af CSS.
        * VIGTIGT: Websiderne er lidt modificeret for at gøre dem renere og mindre "busy". (De er stadig tætte, og der er stadig ting man kunne klage over, men forhåbentlig mindre end før.) Tak til John Kerfoot for nogle kommentarer.
        * VIGTIGT: Websiderne ser nu meget bedre ud på mobiltelefoner og andre små enheder, især hvis du bruger dem i landskabsorientering. De ser også bedre ud i meget små og meget store vinduer i stationære browsere.
        * IMPROVED: For at forbedre sikkerheden og andre årsager, brug af en forældet Openlayers version af denWMSdemonstrationssider er blevet erstattet afLeaflet.
        * NYHED: Støtte til forhåndsvisninger af billede, lyd og videofiler i te"files"systemsystem (for eksempel,[Dette testdatasæt](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) og i.htmlTablereaktioner, når en celle har URL-adressen til et billede, lyd eller videofil (for eksempel,[Denne anmodning](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Hvis du svæver over et '?' ikon, skal du se et billede, lyd eller video fil preview. Du kan også klikke på fillinket for at se filen fuld skærm i din browser. Se billederne[Mediefiler dokumentation](/docs/server-admin/datasets#media-files). Bemærk, at forskellige browsere understøtter forskellige filtyper, så eksemplerne ikke virker i din browser.
Takket være disse mennesker/links til idéer og prøvekode til CSS-kun billedværktøjstips (var på https://codepen.io/electricalbah/pen/eJRLVd ) og defereret billedbelastning (var på https://varvy.com/pagespeed/defer-images.html )   (selvom koden blev ændret før brug iERDDAP) .
Takket være Cara Wilson, Matthew Austin og Adam Shepherd/BCO-DMO for anmodninger om billedunderstøttelse.
Takket være Jim Potemra, Rich Signell, OOI og Carrie Wall Bell for anmodninger om lyd/hydrophone fil support.
Takket være OOI for at vise behovet for video support.
        * NYHED: En del af data fra enhverERDDAP™Datasæt (men normalt et datasæt fra lydfiler) kan nu gemmes i en .wav lydfil. ([dokumentationsdokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Takket være Jim Potemra, Rich Signell, OOI og Carrie Wall Bell for anmodninger om lyd/hydrophone fil support.
        * IMPROVED: Formatet til webkompatible mapper (WAF)   (f.eks. /files/mapper) er blevet opdateret til at bruge en HTML-tabel. Det nye format efterligner den seneste version af mappens listewebsider skabt af nyere versioner af Apache. Mennesker vil finde, at ændringerne gør oplysningerne nemmere at læse. Software, der parrer disse dokumenter (f.eks. software, der høster ISO 19115-dokumenter fraERDDAP) vil blive revideret, men det nye format vil være nemmere at parse end det forrige format. (Vær opmærksom på Anna Milano.) 
        * NYHEDoutOfDateDatasets.htmlside. ([eksempel](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Denne side viser en tabel med alle de nærmeste datasæt, der har en&lt;testOutOfDate&gt; tag (se nedenfor) , rangeret ved, hvordan forældede datasæt er. Dette dashboard skal være nyttigt forERDDAP™Administratorer og slutbrugere, når de ønsker at vide, hvilke datasæt er forældet. For forældede datasæt, er der formodentlig et problem med datakilden, så det erERDDAP™er ikke i stand til at se /get data fra mere nylige tidspunkt punkter.
Administratorer: Hvis du ikke ønsker en Out-Of-Date Datasets webside, skal du tilføje dette til din opsætning.xml:
            &lt;afDateDatasetsActive&gt;false&lt;Søg efter datoDatasetsActive&gt;
Der er nutestOutOfDateog ude Af Dato kolonner i kolonnerneallDatasetsDatasæt.
Takket være Bob Simons, der har ønsket dette i årevis, og til de kloge folk i Irlands Marine Institute, der gav mig inspiration via deres dedikerede Raspberry Pi og monitor, som altid viser en skærm som dette i deres kontor.
        * VIGTIGT:.htmlTableog og og.xhtmlrespons er nu bedre formateret, mere kompakt og dermed indlæse hurtigere. Tak til HTML5 og CSS.
    * NEW output fil type til gitterdap datasæt: .timeGaps. Det viser en liste over huller i tidsværdierne, der er større end mediansk hul. ([eksempel](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Dette er nyttigt forERDDAP™Administratorer og slutbrugere, når de ønsker at vide, om der er uventede mellemrum i tidsværdierne for et datasæt, der forventes at have regelmæssigt pladssat tidsværdier. Takket være Bob Simons og Roy Mendelssohn, der havde brug for denne funktion.
    * IMPROVED: Standard grafen for standardenallDatasetsdatasæt er nu et kort med x=maxLon og y=maxLat. Takket være John Kerfoot, Rich Signell og OOI-CI.
    * NYHED:[Erddapy](https://github.com/ioos/erddapy)-- er ikke enERDDAP™funktion, men vil være af interesse for mangeERDDAP™Brugere. Erddapy (ERDDAP™+ + + +Python) er enPythonbibliotek skabt af Filipe Fernandes, at "takes fordel afERDDAP'sRESTfulwebtjenester og skaber webtjenesterERDDAP™URL for enhver anmodning som at søge efter datasæt, købe metadata, downloade data osv. Tak til Filipe Fernandes.
    * Jeg skal have nævnt før: Der er en tredjeparts R-pakke designet til at gøre det nemmere at arbejde medERDDAP™indefra R:[Rerddap](https://github.com/ropensci/rerddap#rerddap). Tak til[rOpenSci](https://ropensci.org/)og Roy Mendelssohn.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:**   
     
    * TO DO: I opsætning.xml, lige nedenfor&lt;AdminInstitution&gt;, skal du tilføje en&lt;AdminInstitutionUrl&gt; tag, der angiver en URL for din institution (eller gruppe) .
    * Disse 3 tags i setup.xml bruges ikke længere:
        &lt;startstart HovedHtml&gt;,&lt;StartBodyHtml&gt; og&lt;AfslutBodyHtml&gt;. De erstattes af
        &lt;StartHeadHtml5&gt;,&lt;StartBodyHtml5&gt; og&lt;endBodyHtml5&gt;, som har standardværdier angivet i meddelelser.xml (og vist nedenfor) .
        
Vi anbefaler at bruge standarden&lt;StartHeadHtml5&gt; og&lt;AfslutBodyHtml5&gt;.
Vi anbefaler: Hvis du har foretaget ændringer i originalen&lt;StartBodyHtml&gt; og/eller ønsker at tilpasse dinERDDAP™Nu skal du kopiere den nye&lt;StartBodyHtml5&gt; tag (fra nedenfor) i din opsætning.xml og ændre den til at tilpasse dinERDDAP™så detERDDAP's websider afspejler din organisation, ikkeNOAA ERD. Du kan også ændre "Hørt til dig" til din organisation (s s s) . Hvis du har brug for hjælp, bedes du kontakteerd.data at noaa.gov. (Hvis du ikke ønsker at tilpasse dinERDDAP™Brug nu standarden&lt;StartBodyHtml5&gt;.)
        
Så slette de 3 gamle tags i din setup.xml, som ikke længere bruges.

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

Der er yderligere måder, du kan[Tilpas tilpasningERDDAP™](/docs/server-admin/deploy-install#customize)så så sådanERDDAP's websider afspejler din organisation i stedet forNOAA ERD.
        
    * Sådan gør du:&lt;EDDGrid...Eksample&gt; tags (start med&lt;EDDGridIdExample&gt;) og&lt;EDDTable... Eksempel&gt; tags (start med&lt;EDDTableIExample&gt;) i din opsætning.xml-fil bruges til at oprette eksempler på gitteretap ogtabledapdokumentation. html-websider i din browserERDDAP.
        
Hvis du ikke tilpasser disse tags, bedes du slette dem fra din setup.xml fil. Nu har de alle standarder i meddelelser.xml, der henviser til datasæt i Bob'sERDDAP™spiste på https://coastwatch.pfeg.noaa.gov/erddap/index.html . Så du behøver ikke længere at have specifikke datasæt i dine dataERDDAP. Hvis du vil tilsidesætte standarderne, kopiere nogle eller alle disse tags i din opsætning.xml og ændre deres værdier.
Hvis du vil have eksemplerne til at pege på dinERDDAP™, den nemmeste metode er:
        
        1. Medtag disse to datasæt i dine dataERDDAP™ved at tilføje dette til dindatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Tilføj dette tag til din opsætning.xml, men skift URL til din adresseERDDAP's (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Hvis du tilpasser disse tags, skal du forlade dem som er, og tilføj disse 2 nye tags til din opsætning.xml for at angive den.ERDDAP™URL for disse datasæt, men ændre URL'en til dinERDDAP's (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * Sådan gør du:ERDDAP™bruger nu en css fil kaldet erddap2.css. Hvis du har foretaget ændringer\\[Tomcat\\]/webapps/erddap/images/erddap.css, overveje at foretage lignende ændringer i erddap2.css (i samme mappe) .
    * NYHED:ERDDAP's websider har nu et stort antal næsten usynlige interne links (Teksten er sort og ikke understregede) . Hvis du svæver over et af disse links (normalt de første par ord af overskrifter og afsnit) , markøren bliver en hånd. Hvis du klikker på linket, er URL'en det interne link til dette dokument. Dette gør det nemt at henvise til specifikke sektioner af dokumentationen. Takket være Bob Simons, der har ønsket dette i årevis.
    * NYHED:ERDDAP™understøtter nu[Byte Range / Accepter-Ranges](https://en.wikipedia.org/wiki/Byte_serving)anmodninger om dele af /files / filer. Dette var nødvendigt for at støtte lyd- og video seere i browsere.
    * TO DO: Nu for at forbedre sikkerheden, hvis du har angivet&lt;baseHttpsUrl&gt; i opsætning.xml (og dermed støttehttps) , det anbefalede flag Url er enhttpsURL med en mere sikker flagKey. Hvis det er tilfældet, vil enhver tidligere flagUrls/flagKeys blive ugyldig. Admins: Hvis disse ændringer gælder for digERDDAP™og hvis duERDDAP™har haftEDDGridFra Erddap og EDDTable FraErddap's, der abonnerer på fjernbetjeningenERDDAPs, så efter du opdatererERDDAP, dinERDDAP™vil automatisk forsøge at abonnere på det nye flagUrl, så du skal slette de gamle abonnementer og validere de nye abonnementer, når du får de nye abonnement validering e-mails.
    * Sådan gør du:ERDDAP™har haftEDDGridFraErddap datasæt til erdVH3 datasæt på Bob's kysturERDDAP™, skal du ændre dem for at henvise til de nye æraer af erdVH2018.
    * TO DO: Hvis du indeholder nogle af de jplAquariusSSS prøvedatasæt i dinERDDAP™, skal du ændre "V4" i tedatasetID's til "V5".
    * Sådan gør du:actual\\_rangeer nu en CF standard attribut (af CF-1.7) og tydeligt siger, at hvis variablen anvenderadd\\_offsetog/ellerscale\\_factortil at pakke dataværdierne, derefteractual\\_rangeVærdierne skal bruge den ubepakkede datatype og være upakkede værdier. Desværre, denne konflikter med vores tidligere råd. GenererDatasets Xml nu pakker pakketactual\\_rangeværdier, men det løser ikke eksisterende datasæt i dine datadatasets.xmlfil.
        
Så skal du kontrollere dine datasæt: Hvis en variabels værdier er pakket, og hvis du vilactual\\_rangeer angivet som pakkede dataværdier, skal du tilføje en&lt;addAttributes&gt; &gt; &gt; &gt;actual\\_rangeværdi for at angive de upakkede værdier. Ellers vil datasættet ikke indlæses iERDDAP. En enkel og næsten perfekt måde at gøre dette er at søge efter dindatasets.xmltil kilde Bidrag, der har
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
og ascale\\_factorandet end 1.0. De er deactual\\_rangeattributter, som du måske skal løse.
        
Til aksevariabler iEDDGridDatasæt,ERDDAP™Altid indstiller altidactual\\_rangeattributten til at være den egentlige vifte af værdierne, da det kender disse værdier.
        
Til aksevariabler med faldende værdier (f.eks. nogle breddegrader) ,ERDDAP™skabtactual\\_rangemed\\[0\\]......\\[sidst\\]værdier, som var høj...lav. Nu bruger det altid lave...høje værdier for at gøre den nye CF-definition.
        
Den korrektehed af korrekthedenactual\\_rangeværdier er særligt vigtige for EDDTable datasæt, fordiERDDAP™vil hurtigt afvise brugeranmodninger for dataværdier, der er mindre end deactual\\_rangemindsteværdi eller som er større end denactual\\_rangemaksimal værdi.
        
Relaterede: den egentlige \\_min, faktiske \\_max,data\\_minog og ogdata\\_maxattributter er nu afgrænset. Konverter dine datasæt til at brugeactual\\_rangeI stedet.
        
    * Sådan gør du (valgfrit, men anbefales) : For hver nærreal-time og prognoser datasæt i dinERDDAP™, bedes du tilføje en [&lt;testOutOfDate&gt;] (/docs/server-admin/datasets#testoutofdate) tag med en værdi i formnow-_nUnits_, f.eks.now-2 dage. Hvis den maksimale tidsværdi for datasættet er ældre end den værdi, betragtes datasættet som forældet og vil blive markeret som sådan på den måde[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)webside. Det giver en nem måde at se, når noget er forkert med en datasæts kilde.
    *   [NYHED: Semantic Markup af datasæt med json-ld (JSON Disse data) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™bruger nu nu[json-ld (JSON Disse data) ](https://json-ld.org)for at gøre dit datakatalog og datasæt en del af[semantisk web](https://en.wikipedia.org/wiki/Semantic_Web), som er Tim Berners-Lees ide at gøre webindhold mere maskinlæsbar og maskine "underholdbare". Søgemaskiner ([Google især](https://developers.google.com/search/docs/data-types/datasets)) og andre semantiske værktøjer kan bruge denne strukturerede markering til at lette opdagelse og indeksering. json-ld strukturerede markup vises som usynlig-til-humaner&lt;script&gt; kode på koden http://.../erddap/info/index.html webside (som er en semantisk web[DataCatalog](https://schema.org/DataCatalog)) og på hver http://.../erddap/info/_datasetID_/index.html webside (som er en semantisk web[Datasæt](https://schema.org/Dataset)) . (Special takket være Adam Leadbetter og Rob Fuller of te Marine Institute i Irland for at gøre de hårde dele af arbejdet til at gøre denne del afERDDAP.) 
    * NY: Der er nye datasæt typer, som kan læse data fra lydfiler:
        [EDDGridFraAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), som behandler lyddata som gitterded data.
        [EDDTableFraAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), som behandler lyddata som tabulære data. Takket være Jim Potemra, Rich Signell, OOI og Carrie Wall Bell for anmodninger om lyd/hydrophone fil support.
    * Ændringer til GenererDatasets Xml (og relaterede ændringer) :
        * NYHED:ERDDAP™Nu har et system til automatisk[Opdater forældede webadresser](/docs/server-admin/additional-information#out-of-date-urls)både i GenererDatasets Xml og ved indlæsning af datasæt. Hvis du har forslag til yderligere webadresser, der skal fanges og opdateres, eller hvis du mener, at dette skal gøres til en tjeneste (som omformere) , venligst e-mailerd.data at noaa.gov.
        * NYHED: Nu, hvis GenererDatasets Xml ser en CFstandard\\_name  (som skal være alle mindre) med en øvre figur, det tilføjer den alle undercase version til&lt;addAttributes&gt;. Også, når en datasæt belastninger, hvisERDDAP™Se en CFstandard\\_namemed en øvre figur, ændrer den lydløst den til denstandard\\_name. Tak til Rich Signell.
        * NYHED: Nu, hvis GenererDatasets Xml ser en egenskab med en tid, der ikke er i ISO 8601 format, det tilføjer ISO 8601 formateret tid til at&lt;addAttributes&gt;. HvisERDDAP™genkender ikke formatet, det efterlader tidsværdien uændret. Hvis du ser et format, derERDDAP™genkender ikke og retter, så send den tilerd.data at noaa.gov.
        * IMPROVED: Den lave niveau kode for teEDDGridFromThredds Katalog mulighed i GenererDatasets Xml nu afhænger afUnidataNetcdf-java katalog crawler kode (Tømmermænd. Katalog klasser) så det kan håndtere alle THREDDS kataloger (som kan være overraskende kompleks) . Tak til Roland Schweitzer for at foreslå denne ændring og takket væreUnidatafor koden.
        * NYHED: GenererDatasets Xml tilEDDGridFraDap tilføjer nu ", startYear-EndYear" til slut af titlen baseret på faktiske tids akseværdier. EndYear
        * NYHED: GenererDatasets Xml tilEDDGridFraDap tilføjer nu ",\\[opløsningsopløsning\\]°" til titlen, hvis datasættet er jævnt placeret og det samme for lat og lon.
        * IMPROVED: Tidens konverter har nu ekstra funktioner, især evnen til at konvertere strenge gange i en bred vifte af almindelige formater til ISO 8601 strenge eller til et UDUnits-kompatibelt nummer. Alle tidligere understøttede funktioner fortsætter med at arbejde, uændret.
        * BUG FIX: GenererDatasets Xml og nøgleord konverteren indeholder nu "Earth Science &gt; " i starten af GCMD Science Søgeord. Når et datasæt er indlæst iERDDAP™,ERDDAP™nu rettelser alle GCMD-ord i attributten, der ikke starter med "Earth Science &gt; " eller som bruger noget andet end titel sag (hvor hvert ords første bogstav er kapitaliseret) .
        * VIGTIGT: Når du foreslår&lt;destinationName&gt;'s, GenererDatasets Xml til EDDTableFraAsciiFiles brugte bare halen ende afsourceNames med'/'  (nogle var filnavn-lignende) . Nu bruger det helesourceName(f.eks. "blahblahblah (m/s)". Denne ændring vil være god til nogle datasæt og ikke for andre, men det er sikrer adfærd. Tak til Maurice Libes.
        * BUG FIX: GenererDatasets Xml og datasættet konstruerere sikrer nu, at der ikke er duplikerede kolonnenavne. Tak til Maurice Libes.
        * BUG FIX: GenererDatasets Xml for EDDTableFraAsciiFiles skrev ikke&lt;kolonneSeparator&gt; til output. Nu gør det. Tak til Maurice Libes.
    * NYHED: DasDds-værktøjet udskriver nu tidens mellemrum (te te te te[.timeGaps oplysninger](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) hvis datasættet er et gitteret datasæt.
    * NYHED: Avanceret søgning accepterer nu "nu_\\-nUnits_" tidsværdier. Tak til Rich Signell.
    * VIGTIGT: For at forbedre sikkerheden, når en e-mailadresse i et datasæts metadata eller data er skrevet til en HTML-side, erstattes "@" med " på ". Dette fanger kun e-mail adresser, der er hele metadata eller dataværdi, ikke e-mail adresser indlejret i længere værdier.
    * VIGTIGT: For at øge sikkerheden,RSSOplysninger om private datasæt er nu kun tilgængelige for brugere (og og ogRSSlæsere) hvem er logget ind og godkendt til at bruge disse datasæt.
    * NY: Nu, når et datasæt er indlæst, hvisdate\\_created,date\\_issued,date\\_modified, eller dato\\_metadata\\_modified attribut har en tidsværdi, der ikke er i ISO 8601 format,ERDDAP™ændrer det til ISO 8601 formateret tid. HvisERDDAP™genkender ikke formatet, det efterlader tidsværdien uændret. Hvis du ser et format, derERDDAP™genkender ikke og retter, så send den tilerd.data at noaa.gov.
    * IMPROVED: .dods svar fraEDDGridDatasets bør nu være betydeligt hurtigere. Tak til Rich Signell.
    * Ændringer der relaterer tilERDDAP's oprettelse af ISO 19115 dokumenter:
        * BUG FIX: når du opretter ISO 19115-dokumenter,dataVariableEnheder var ikke HTML Attribute en kodet og procent kodet. Nu er de. Takket være NGDC's ISO 19115 gyldigator.
        * BUG FIX: når du opretter ISO 19115-dokumenter,date\\_createdblev brugt som er, så ofte var det forkerte format. Nu er det konverteret til ISO 8601 Z streng. Takket være NGDC's ISO 19115 gyldigator.
        * BUG FIX: når du opretter ISO 19115-dokumenter,ERDDAP™skriver nu længere datoer med år=0000 (som med klimaologiske datasæt) , fordi ISO 19115 schema ikke tillader datoer med år=0000. Takket være NGDC's ISO 19115 gyldigator.
    * NYHED: Som før en anmodning tilhttp.../erddap/version vil returnere lige versionsnummeret (som tekst) , f.eks. "ERDDAP\\_version =.82".
Nu, en anmodning omhttp.../erddap/version\\_string vil returnere et nummer og en valgfri suffix af "\\_" plus ASCII tekst (ingen mellemrum eller kontrol tegn) , f.eks. "ERDDAP\\_version\\_string =82\\_JohnsFork". Folk, der gør gaffel, vil angive dette ved at ændre EDStatic.erddapVersion. På denne måde forårsager det ikke problemer for tidligere versioner afERDDAP. Tak til Axiom (Især Kyle Wilcox) Hoteller i nærheden af Irland's Marine Institute (Især Rob Fuller) .
    * BUG FIX: For wms version=.3.0, anmodning=GetMap, crs=EPSG:4326 (Ikke CRS:84) anmodninger: bbox ordre skal være minLat,minLon,maxLat,maxLon. For CRS:84 anmodninger, som før, bbox ordre skal være minLon,minLat,maxLon,maxLat. Dette kan rette ved brugERDDAP'sWMS1.3.0 tjeneste iArcGIS  (takket være Paola Arce) . Tak (Ikke ikke) til at tilOGCfor at gøre dette så kompliceret. Tak tilLeaflettil håndtering af denne korrekt og for at give mig en måde at teste dette.
    * IMPROVED: Forrige, det foreslåede link tilRSSog e-mail abonnementer harhttpURL til din adresseERDDAP. Nu er det denhttpsURL, hvis det er aktivt.
    * NYHED:EDDGridKopier nu understøtter et valgfrit tag&lt;Slet kunSince&gt;_someValue_&lt;/kunSince&gt;, hvor værdien er en specifik ISO-8601-formatet tid eller ennow-nUnits (fx,now-2 år) tid. Se billederne[kun Siden dokumentation](/docs/server-admin/datasets#onlysince). Tak til Drew P.
    * VIGTIGT: Hvis det er tilgængeligt,ERDDAP™vil vise showethttpsURL (fra)&lt;baseHttpsUrl&gt;, hvis det er tilgængeligt) i stedet for tehttpURL, når det fortæller brugerne URL til at tilføje/validate/fjern/liste et abonnement.
    * BUG FIX:ERDDAP™Tillad nu en abonnement handling at starte med " https://" . (Bob slår sin pande.) Tak til Jennifer Sevadjian.
    * BUG FIX:.jsonlKVPbruger nu ':' mellem hver nøgle og værdi i stedet for i stedet for'='. (Bob slår sin pande.) Tak til Alexander Barth.
    * BUG FIX: Tidligere, hvis du genstartedeERDDAP™med hurtigRestart=true, og hvis det før datasættet blev genindlæst normalt, lavede du et opkald til en EDDTableFraFiles datasæt, der brugte opdateringEveryNMillis, og hvis en datafil lige var blevet ændret, ville anmodningen mislykkes med en null-pegefejl. Nu vil anmodningen lykkes. Tak til John Kerfoot.
    * NY: Når et datasæt er indlæst iERDDAP™, nøgleordene er nu bagudrettede i sorteret rækkefølge, og eventuelle nye linjer fjernes.
    * VIGTIGT: Nu, hvis en .geoJson,.jsoneller eller eller.ncoJson anmodning har.jsonp parameter, reaktion mime type er ansøgning/javascript. Bemærk, at.jsonp understøttes ikke for.jsonlCSVeller eller eller.jsonlKVP, da det ikke ville arbejde. Tak til Rob Fuller.
    * IMPROVED: Den mime type til json linjer fileType muligheder er nu "application/x-jsonlines". Det var ansøgning/jsonl. I øjeblikket er der ikke noget endeligt korrekt valg.
    * IMPROVED: Antallet af mislykkede anmodninger vist på status.html-siden vil stige, fordi flere ting tælles som fejl end før, f.eks. KlientAbortException.
    * IMPROVED: Nu, hvis et svar fraERDDAP™er ikke komprimeret, så overskriften af svaret vil omfatte "Indhold-kodning"-troty".
    * VIGTIGT: Den "licens" attribut var ikke påkrævet. Nu, hvis det ikke er angivet, standardLicense fra meddelelser.xml (eller fra setup.xml, hvis nuværende) bruges som standard.
    * NY: Der er nu et valgfrit tilbehør[FileAccessSuffix attribut](/docs/server-admin/datasets#fileaccessbaseurl). som kan bruges med den eksisterende[FileAccessBaseUrl attribut](/docs/server-admin/datasets#fileaccessbaseurl).
    * IMPROVED: For at øge sikkerheden, denne version blev kompileret med den senesteJavaJDK v8u162.
    * NY: For at øge sikkerheden, flere almindelige domæner, der tilbyder midlertidige e-mailadresser (f.eks. @mailinator.com) er nu på en permanent e-mail blacklist for abonnementssystemet.
    * NY: For at øge sikkerheden, de høje i den daglige rapport nu omfatter:
SetDataset Markér IP-adresse (siden sidste daglige rapport)   
SetDataset Markér IP-adresse (siden opstart)   
SetDataset Markér IP-adresse (siden sidste daglige rapport)   
SetDataset Markér IP-adresse (siden opstart)   
De "Failed" højeies giver dig mulighed for at se, hvem (en hacker?) forsøger at sætte et flag, men er ikke svigtet.
    * VIGTIGT: For at øge sikkerheden, e-mail-adresser i&lt;AbonnementEmailBlacklist&gt; i din kontodatasets.xmlanses nu for at være tilfældet-infølsomme.
         

## Version 1.80{#version-180} 
 (udgivet 2017-08-04) 

*    **Nye funktioner (for brugere) :**   
     
    * NYHEDorderByCount () filter lader dig angive, hvordan resultattabellen sorteres (eller ikke) og returnerer kun en række for hver sorteringsgruppe, med antallet af ikke-missende værdier for hver variabel.
For eksempel,orderByCount (" " " "stationID" " " ") vil sortere efterstationIDog returnere en række for hverstationID, med et antal ikke-missende værdier for hver variabel.
Hvis du blot angiverorderByCount ("") , svaret vil være kun en række med antallet af ikke-missende værdier for hver data variabel.
Se billederne[orderBy... dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Tak til Ben Adams.
    * NYHED.ncoJson-fil Type mulighed for gitterded og faneformede datasæt. Denne mulighed gør enNCOlvl=2 "pedantic" JSON fil med alle de oplysninger, der normalt findes i en.ncfil. Se endnu[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Tak til Charlie Zender.
    * BUG FIX: The The The The The The TheorderBy...... () Indstillinger på Make A Graph-siden håndteres nu korrekt.
    * BUG FIX: .geoJson output udskriver nu ikke rækker, hvor lat- eller lonværdier mangler. Også højdeværdier (hvis det er tilgængeligt) er nu inkluderet i koordinaterne, ikke som dataværdier. Tak til Jonathan Wilkins.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:**   
     
    * Kontrol af ISSUE: De protokoller.js bibliotek, der bruges til detOpenLayersdemo på demoenWMSsider i siderneERDDAP™er forældet og har en fejl, der potentielt giver det mulighed for at misbruges. (Desværre, opdateringOpenLayersog protokol. js er ikke let.) Det åbner op for muligheden for, at biblioteket kan opsættes for at tillade en sårbarhed på tværs af websteder. Men, sidenERDDAP™kun anvendelserOpenLayerspå en bestemt præ-set-up måde og kun med specifikERDDAP-baserede datakilder, vi mener, at der ikke er nogen sårbarhed på tværs af webstederERDDAPBrug afOpenLayersMen hvis du ikke tror dette, kan du nu deaktivere brugen afOpenLayersdemo på demoenWMSSider i dine siderERDDAP™ved at tilføje
```
        <openLayersActive>false</openLayersActive>  
```
til din setup.xml fil. Standarden er "true". Tak til Charles Carleton og NCEI.
    * SECURITY CHANGES: Ubrugt .jar filer og dubler .jar filer (fordi de også er i netcdfAll.jar) er blevet fjernet fraERDDAP™distribution. Out-of-date .jar filer er blevet opdateret. Tak til Charles Carleton og NCEI.
    * Sikkerhed: NetcdfAll.jar-filen distribueret medERDDAP™er den seneste version (I øjeblikket 4,6.10) , men det indeholder stadig interne jackson .jar-filer, der er kendt for at være forældet og har sikkerhedssårbarheder, især de Jackson-biblioteker, der kun bruges ved adgang til Amazon S3 datakilder. Hvis du ikke får adgang til data via Amazon S3 (du ville vide, om du var) , disse sårbarheder er ikke relevante.
        
Netcdf-java udviklere opretholder, at disse sårbarheder ikke er relevante på grund af den måde, at netcdf-koden bruger disse biblioteker, og i alle tilfælde kun ville være relevante, når de besøger Amazon S3. Se endnu[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Jeg tror dem. Hvis du stadig har bekymringer om dette, bedes du kontakte netcdf-java udviklere. (Bemærk, at hvis du ikke tror netcdf-java udviklere og er usikker på ikke at brugeERDDAP™På grund af dette, bør du ikke bruge THREDDS enten, fordi THREDDS bruger netcdf-java mere fundamentalt og mere i vid udstrækning endERDDAP.) 
        
Detaljer: Den besværlige kode og sårbarhedsadvarsler er:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Se endnu https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høj høj
NetcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Se endnu https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høj høj
NetcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotationer/pom.xml
Se endnu https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høj høj
Se endnu https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- kritisk
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Se endnu https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høj høj
Se endnu https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- kritisk
"For version 4,6.10 trækker aws-java-sdk-core i version 2.6,6 af jackson-\\* artefakter." (e-mail fra netcdf-java folk) .
Tak til Charles Carleton og NCEI.
        
    * COMPILER CHANGES: Hvis du er færdigERDDAP™, bemærke, at -cp klassepat parameter nødvendig for kommandolinjen er nu meget kortere end før. Se den nye -cp indstilling i[denne dokumentation](/docs/contributing/programmer-guide#development-environment). Tak til Charles Carleton og NCEI.
    * NYHED OPTION i GenererDatasets Xml: EDDTableFraBcodmo, som kun er til intern brug på BCO-DMO.
Tak til Adam Shepherd og BCODMO.
    * NYHED ATTRIBUTE og FEATURE: Hvis en EDDTabel kolonne har filnavne af web tilgængelige filer (f.eks. billede, video eller lydfiler) , du kan tilføje
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
for at angive den grundlæggende webadresse (Afslut med /) nødvendige for at gøre filnavnene til komplette webadresser. Så for derefter.htmlTablereaktioner,ERDDAP™vil vise filnavnet som et link til den kombinerede URL (basen Url plus filnavnet) .
Hvis du ønskerERDDAP™at tjene de relaterede filer, gøre en separat EDDTableFraFileNames datasæt for disse filer (Det kan være et privat datasæt) .
Tak til Adam Shepherd og BCODMO.
    * NYT ATTRIBUTE RECOMMENDATION: Hvis en EDDTabel kolonne har filnavne af web tilgængelige filer (f.eks. billede, video eller lydfiler) som er tilgængeligt via et arkiv (fx,.zipfilfil) tilgængelig via en URL, brug
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
for at angive URL'en til arkivet.
Hvis du ønskerERDDAP™til at tjene arkivfilen, gøre en separat EDDTableFraFileNames datasæt til den fil (Det kan være et privat datasæt) .
Tak til Adam Shepherd og BCODMO.
    * IMPROVEMENTS til GenererDatasets Xml for at fjerne årsagerne til ugyldige / bad&lt;subsetVariables&gt; forslag og dubler/bad foreslåede variable navne osv. Tak til Rich Signell, Adam Shepherd og BCO-DMO.
    * NYHED OPTION: De politiske grænseoplysninger distribueret medERDDAPer fra en tredjepart og noget forældet. Der er også uenigheder på flere steder i verden, hvor forskellige mennesker vil have forskellige ideer om, hvad der er korrekt. Vi gør NO CLAIM OM CORRECTNESS for at sikre, at der er tale om en sådan behandling.ERDDAP. Hvis du ikke kan lide de politiske grænseoplysninger, der kommer medERDDAP™, du kan nu fortælleERDDAP™til aldrig at trække politiske grænser ved at tilføje
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
til din setup.xml fil. Standarden er "true". Tak til Raju Devender.
    * NYHED METADATA TAG: In te In te In te In tedatasets.xmlfor et datasæt, kan du nu angive standardnummeret for farve Bar sektioner til endataVariablepå grafer og kort med
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (Standard=-1, som siger at ladeERDDAP™beslutte at beslutte) . Se billederne[farve farve farve Barindstillinger](/docs/server-admin/datasets#color-bar-attributes).
    * IMPROVED: tilstandsgrænsen farve på kort blev lilla (Deep Purple til dig Baby Boomers) . Nu er det grå (i mellem den nationale grænse grå og jordgrå) .
    * BUG FIX:&lt;I nærheden af iso19115File&gt; and&lt;fgdcFile&gt; indatasets.xmlvar ikke altid håndteret korrekt. Nu er de. Tak til BCO-DMO.

## Version 1.78{#version-178} 
 (udgivet 2017-05-27) 

*    **Nye funktioner (for brugere) :**   
     
    *    (Ingen ingen ingen)   
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:**   
     
    * IMPROVED: rækkefølgen af linjer i "Major LoadDatasets Time Series" på status.html side er nu nyeste på toppen til ældste i bunden.
    * BUG FIX:ERDDAP™skriver nu.nccsvfiler med tidens variableactual\\_rangesom en ISO-8601 streng tid. Det løser fejlen med EDDTableFraErddap parsing info fra en fjern datasæt og fra hurtigstart-filen for alle EDDTableFra...Files datasets. (Tidenactual\\_rangevil være forkert første gang datasættet indlæser i v1.78, men korrekt efter det er genindlæst, f.eks. hvis du flager datasættet.) 

## Version 1.76{#version-176} 
 (udgivet 2017-05-12) 

*    **Nye funktioner (for brugere) :**   
     
    * CHANGE i Tomcat: For anmodninger omERDDAP™komme fra software andre end webbrowsere (fx,curl, R,Matlab,Python,Java) :
Som med tidligere ændringer i versioner af Tomcat (den lavere software, der kørerERDDAP) Siden begyndelsen af 2016 skal flere og flere af tegnne i forespørgslens forespørgselsdel være[ **Percent En kode** ](/docs/server-admin/datasets#infourl)af sikkerhedsmæssige årsager. Browserer tager sig af procent kodning for dig. så brugERDDAP™i en browser påvirkes ikke, medmindre anmodningen bliver viderestillet til en andenERDDAP.
    * VIGTIGT: Tidligere,ERDDAP™behandlet behandling **Pære variabler** mere som usignede korte integers end tegn. Nu behandler det dem mere som 1-karakterist-long UCS-2 (Unicode) Strenge. Se billederne[Foto dokumentation](/docs/server-admin/datasets#char). Takket være Aurelie Briand og Argo projektet.
    * VIGTIGT: Tidligere,ERDDAP™tilbudt lille støtte til **Unicode tegn** Over figur #255 i Strings. Nu internt,ERDDAP™Fuldt understøtter 2-byte UCS-2 chars (tegn nummer 0 gennem 65535) i strenge. Når String data er skrevet til forskellige filtyper,ERDDAP™gør det bedste, det kan at støtte 2-byte chars. Et andet eksempel er .csv-filer, somERDDAP™skriver med ISO-8859-1 charset (En 1-byte charset) , såERDDAP™skriver nogen tegn over tegn #255 med JSON-lignende "u_hhhh_ syntaks. Se endnu[Strenge data](/docs/server-admin/datasets#string).
    * IMPROVED: In.ncfiler skrevet afERDDAP™, char variabler, der skal fortolkes som strenge, vil have attributten
         **\\_Encoding=ISO-8859-1**   
I nærheden af In In In In In In In In In In In In In In.ncfiler læses afERDDAP™, char variabler med "\\_Encoding" vil blive fortolket som strenge med det angivne charset.
    * Leverandør af:ERDDAP™understøtter **JSON-lignende ryg** af særlige tegn, når du angiver begrænsninger af char og String variabler. Således kan du anmode om noget som &myString IMG«u20ac, når du ønsker rækker af data, hvor myString=€, da 20ac er den hexadecimal version af kodepunktet for Euro symbolet. Flere kilder på nettet viser kodepunktet tal for Unicode symboler, f.eks.[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * VIGTIGT: Tidligere,ERDDAP™ydet begrænset støtte til **længe iteger** variabler. Nu nu nuERDDAP™fuldt ud understøtter længere internt og gør det bedst, når du skriver lange data til forskellige filtyper. Se billederne[Lang dokumentation](/docs/server-admin/datasets#long). Tak til Irlands marineinstitut, Craig Risien, Rich Signell, Christopher Wingard og OOI.
    * NYHED: output filtype til gitterdap ogtabledap: **.nccsv** , som gør enNetCDF-som, ASCII, CSV-fil, der også indeholder alle de metadata, der ville være i en lignende.ncfil. Se billederne[NCCSV Specifikation specifikation](/docs/user/nccsv-1.00). Tak til Steve Hankin.
    * NYHED: **orderByClosestfilter filter filter** lader dig angive, hvordan resultattabellen sorteres, og et interval (f.eks. 2 timer) . Inden for hver slags gruppe, vil kun de rækker, der er tættest på intervallet, holdes. For eksempel,orderByClosest (" " " "stationID, tid, 2 timer") vil sortere efterstationIDog tid, men kun returnere rækkerne for hverstationIDhvor det sidsteorderBykolonne kolonne kolonne (tidstid) er tættest på 2 timeintervaller. Dette er den nærmeste ting itabledaptil at fremskynde værdier i en gitterforespørgsel. Denne mulighed kan angives via enhvertabledapDatasets .html-side, .graph-webside, og af enhver webadresse, du genererer dig selv. Takket være Danmarks Marine Institute og Ocean Networks Canada.
    * NYHED: **orderByLimitfilter filter filter** lader dig angive, hvordan resultattabellen sorteres, og et grænsenummer (f.eks. 100) . Inden for hver slags gruppe, vil kun de første 'grænse' rækker blive holdt. For eksempel,orderByMax (" " " "stationID, 100") vil sortere efterstationID, men kun returnere de første 100 rækker for hverstationID. Dette svarer til SQL's LIMIT-bestemmelse. Denne mulighed kan angives via enhvertabledapDatasets .html-side, .graph-webside, og af enhver webadresse, du genererer dig selv. Takket være Danmarks Marine Institute og Ocean Networks Canada.
    * NYHED: To nye svar filtyper, **.jsonlCSVog og og.jsonlKVP** er til rådighed for anmodninger om gitterded datasæt, tabulære datasæt og mange andre steder iERDDAP  (f.eks. anmodninger om oplysninger om datasæt) . Filerne er JSON Lines filer ([ https://jsonlines.org/ ](https://jsonlines.org/)) hvor hver linje har et separat JSON-objekt..jsonlCSVBare har værdierne i et CSV-format..jsonlKVPhar nøgle: Værdipar. Hver linje står på egen hånd. Linjerne er ikke lukket i et større JSON array eller objekt. Du kan f.eks. se[denne prøveforespørgsel](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Takket være Damian Smyth, Rob Fuller, Adam Leadbetter og Irlands Marine Institute.
    * NYHED: Der er ny dokumentation, der beskriver[ **Sådan får du adgang til private datasæt iERDDAP™via scripts** ](/docs/user/AccessToPrivateDatasets). Tak til Lynn DeWitt.
    * VIGTIGT: Mindste graden af **OpenLayers** kort var 2 grader og er nu 4 datapixler. Tak til Rusty Holleman.
    * IMPROVED: I nogle almindelige tilfælde, anmodninger, der omfatter en **almindeligt udtryk** begrænsninger vil blive behandlet meget hurtigere.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:**   
     
    *    **SLOW FIRST STARTUP:** Den første gang du starter denne nye version, vil det tage lang tid forERDDAP™at indlæse alle datasæt, fordi det skal læse alle kildedatafiles (selvom bare header til gitterded data filer) . Hvis du ser på de logfiler, kan du se fejlmeddelelser, der siger "old/unstøttet forbedretVersion" af nogle interne filer -- det er okay --ERDDAP™vil gøre de nye versioner af de interne filer. Vær venligst tålmodig.
    * ACTION:ERDDAP™bruger nu den nye **java.time** klasser klasser (også kendt som JSR 310) I stedet for Joda til parse strenge gange i numeriske tider. Noter:
        * HvisERDDAP™pludselig har problemer parsing strenge gange for en given datasæt og dermed bare konvertere mest eller alle tider til NaN's (manglende værdier) , problemet er næsten altid med datoen Tidsformatstreng, som du angiver som "enheder" af variablen. Det nye system har nogle gange brug for en lidt anden datoTime format streng.
        * Hvis numeriske måneder og dage i datoTime strengene ikke er 0-padded (g., "3/7/2016") , sørg for, at formatet bare har en enkelt M og d (f.eks. "M/d/yyyyyyyyyyyyyyy") .
        * Ændre eventuelle fraktionelle sekunder specifikation, der bruger lavere kuffert s's (f.eks. .sss iyyyy-MM-dd'T'HH:mm:ss.sss) , i kapital S's, (fx,yyyy-MM-dd'T'HH:mm:ss.SSS) .
        *   ERDDAP™Ikke længere understøtter streng dato Tidsformater med tocifrede år (Billeder af yy) med et underforstået århundrede (f.eks. 1900 eller 2000) . Virksomheder tilbragte milliarder af dollars fastsættelse af dette problem i slutningen af 1990'erne. Forskere bør ikke bruge to cifrede år. Ret venligst kildefilen (s s s) ved at konvertere til 4-cifrede år, skal du bruge yyyyyy i datoen Tidsformat.
        * Du kan bruge yyyyyy eller YYYYYY (somERDDAP™konvertere til uuuu) til parse 4 cifrede år, herunder negative år, f.eks. -4712 (som er 4713 f.Kr.) . Tak til SeaDataNet, Thomas Gardner, og BODC.
        * Fortsæt med at bruge Z inden for et datoTime format for at fåERDDAPat parse en tidsforskydning (f.eks. Z, +0200, -08, -0800, -08:30) .
        *    **Sørg for, at du brugerJavaversion 1.8.0\\_21 eller højere.** 
        * Programmer -- Hvis du skriverJavaProgrammer, der kørerERDDAP™kode, skal du fjerne referencen til joda-time. krukke i klassesti parameter.
    * NYHED:ERDDAP's[Arkiv Datasæt værktøj](/docs/server-admin/additional-information#archiveadataset)Kan nu oprette[ **BagIt filer** ](https://en.wikipedia.org/wiki/BagIt). NCEI kan standardisere på dette format. Tak til Scott Cross og John Relph.
    * IMPROVED: Forbindelserne til at downloade erddap. krig mod krigenERDDAP™Websider peger nu på **GitHub** . (De er offentlige links, så du ikke behøver at deltage i GitHub.) Det betyder meget hurtigere downloads (op til 12Mb/s mod 1Mb/s) og få problemer med downloads. Takket være Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney og Irlands Marine Institute.
    * IMPROVED: The **Statusrapport e-mail med den daglige statusrapport** indeholder nu en "Major LoadDatasets Time Series" sektion, som viser statistik omERDDAP™i slutningen af hver større belastningDatasets for de sidste 100 store belastningDatasets. Tak til vores besværlige RAID.
    * NY: en ny, valgfri (men anbefales) parameter for EDDTableFraCassandra datasæt: [ ** &lt;partitionKeyCSV&gt; ** Særkegle (/docs/server-admin / Datasets#partitionkeycsv) . Tak til Ocean Networks Canada.
    * NYHED: EDDTableFraAsciiFiles understøtter nu ** &lt;kolonneSeparator&gt; ** parameter. Hvis null eller "", vil klassen gætte, som før, ellers vil den første figur blive brugt som kolonne separator ved læsning af filerne. Tak til Sky Bristol og Abigail Benson.
    * Ny: den nye datasæt type,[ **EDDTableFraNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), kan gøre et datasæt ved at aggregere[NCCSV .csv filer](/docs/user/nccsv-1.00). Tak til Steve Hankin.
    * VIGTIGT: **EDDTableFraErddap** bruger nu nu.nccsvfor at få oplysninger fra fjernERDDAPs og for lokal arkiv af disse metadata info. Dette muliggør fuld støtte til char- og lange datatyper og til Unicode (UCS-2) Sæt til chars og strenge. Takket være Rob Fuller og Irlands Marine Institute.
    * IMPROVED: EDDTableFraErddap ogEDDGridFraErddap understøtter nu ** &lt;omdirigering&gt;false&lt;/redirect&gt; ** som fortællerERDDAP™aldrig at omdirigere anmodning til fjernbetjeningenERDDAP. Standarden er sandt. Dette er nyttigt, når fjernbetjeningenERDDAP™er privatERDDAP. Takket være Damian Smyth, Rob Fuller og Irlands Marine Institute.
    * VIGTIGT:ERDDAP™nu fangster **annullerede brugeranmodninger** hurtigere. Og og ogERDDAP™Nu lukkes der ned hurtigere, fordi de lave niveautråde lukkes hurtigere. Tak til vores besværlige RAID.
    *    **GenererDatasets Xml:** 
        * NYHED: Den nye særlige EDDType "ncdump" udskriver en[ncdump](https://linux.die.net/man/1/ncdump)\\-lignende udskrifter af headeren af en.ncfil. Du kan også udskrive dataværdierne for specificerede variabler (eller indtast "ingen" for ikke at udskrive dataværdier) . Dette er nyttigt, fordi uden ncdump det er svært at vide, hvad der er i en fil, og dermed hvilken EDDType du skal angive for GenererDatasetsXml. Tak til Craig Risien, Rich Signell, Christopher Wingard og OOI.
        * NYHED: Til SeaData Netdata:
Når det er relevant, GenererDatasets Xml gør nu en specifik semantisk konvertering ved hjælp af en fjern SPARQL-forespørgsel: Hvis en variabel kilde metadata indeholder en sdn\\_parametre\\_urn, f.eks. sdn\\_parametre\\_urn = "SDN:P01:PSLTZZ01", GenererDatasetsetsetsetsetsets Xml vil tilføje den tilsvarende P02 attribut, f.eks. sdn\\_P02\\_urn = "SDN:P02::PSAL". Hvis du har datasæt, der bruger disse attributter, og hvis dineERDDAP's&lt;categoryAttributes&gt; i opsætning.xml indeholder sdn\\_parametre\\_urn og sdn\\_P02\\_urn, vil brugerne kunne brugeERDDAP™Kategori søgesystem til at søge efter datasæt med specifikke værdier af disse attributter. Tak til BODC og Alexandra Kokkinaki.
        * IMPROVED: GenererDatasets Xml ændrer nu mangehttp://henvisninger i metadata tilhttps://når det er relevant.
        * IMPROVED: GenererDatasets Xml forsøger nu at gætte skaber\\_type og udgiver\\_type.
        * IMPROVED: De variable datatyper, der foreslås af GenererDatasets Xml vil nu være lidt bedre. Takket være Margaret O'Brien, LTER og EML.
        * IMPROVED: GenererDatasets Xml er bedre til at specificere&lt;CDm\\_data\\_type&gt; og tilføje de relaterede nødvendige attributter (f.eks.&lt;CDm\\_timeseries\\_variables&gt;), så du kan levere disse oplysninger. Tak til Rich Signell.
        * IMPROVED: In GenererDatasets Xml, til EDDTable datasæt, forslag til&lt;subsetVariables&gt; er nu meget mere konservativ. Tak til John Kerfoot.
        * VIGTIGT: Hvisdatasets.xmlfor en datasæt specificeresfeatureTypemen ikke cdm\\_data\\_type,featureTypevil blive brugt som cdm\\_data\\_type. Tak til Rich Signell.
        * BUG FIX: generere Datasæt Xml foreslår nu den korrekte&lt;DataType&gt; for datavariabler, der harscale\\_factor,add\\_offsetog/eller \\_Unsigned attributter.
    * VIGTIGT: NårERDDAP™Åbne en.ncfil, der er **kortere kortere kortere** end det er meningen at være (f.eks., det fik ikke helt kopieret på plads) ,ERDDAP™behandler nu filen så slemt. Tidligere,ERDDAP™returnerede manglende værdier for enhver manglende del af filen, fordi det er standardadfærd for netcdf-java.ERDDAP™bruger nu ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = sand; Tak til vores besværlige RAID og Christian Ward-Garrison.
    * IMPROVED: ISO 19115 forfatter gør nu brug af **skaber\\_type** , hvis det er til stede.
    * VIGTIGT:ERDDAP™nu bruger den nyeste netcdf-java v4.6.9, som kan læse yderligere typer af **netcdf-4-filer** . Tak til Craig Risien, Rich Signell, Christopher Wingard og OOI.
    * BUG FIX: undgå problemer, hvis forskellige kildefiler har forskellige datatyper til en given variabel. Tak til Roy Mendelssohn og Eugene Burger.
    * BUG FIX: **Tidsformatkonverteringer** er nu bedre beskyttet mod dårlige tidsværdier. Tak til NDBC.
    * BUG FIX:EDDGridFraNcFiles Upakket nu håndterer tidsværdier med **"månederne siden ..." og "år siden ..."** korrekt korrekt korrekt (ved at øge måneden eller år, ikke ved at tilføje f.eks. 30 dage gentagne gange) . Tak til Soda3.3.1.
    * BUG FIX: lige i v1.74, **Abonnementer** påkrævet en handling (fx,http://......) , som var og skal være valgfri.
    * BUG FIX:EDDGridFraMergeIRFiles.lowGetSourceMetadata () Tilføj ikke nogen globale attributter. Nu gør det.
         

## Version 1.74{#version-174} 
 (udgivet 2016-10-07) 

*    **Nye funktioner (for brugere) :**   
     
    * Nu, når en liste over datasæt (Alt, eller fra en søgning) vises på en webside, lange titler vises på flere linjer. Tidligere blev midten af en lang titel erstattet af "... ". Takket være Margaret O'Brien, LTER og EML.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:**   
     
    * TO DO: På Linux-computere skal du ændre indstillingerne for Apache-timeout, så tidskrævende brugeranmodninger ikke timeout (med hvad der ofte vises som en "Proxy" eller "Bad Gateway" fejl) . Som root-brugeren:
        
        1. Rediger Apachehttpd.conf-fil (normalt i /etc /httpd/konference/) :
Ændre de eksisterende&lt;Tidsout&gt; indstilling (eller tilføje en i slutningen af filen) til 3600 (sekunder sekunder) , i stedet for standard 60 eller 120 sekunder.
Ændre de eksisterende&lt;ProxyTimeout&gt; indstilling af indstilling (eller tilføje en i slutningen af filen) til 3600 (sekunder sekunder) , i stedet for standard 60 eller 120 sekunder.
        2. Genstart Apache: /usr/sbin/apachectl -k yndefuld (Men nogle gange er det i en anden mappe) .
        
Tak til Thomas Oliver.
         
    * NYHED:\\[bigParentDirectory/hard Markér mappe
Dette fungerer som flagmappen, men den hårdeFlag version sletter også alle de cachelagrede datasæt information. Der er ingen webadresser til at indstille en hårdFlag. Dette kan kun bruges ved at placere en fil i mappen.
hårdt hårdt Flag er meget nyttige, når du gør noget, der forårsager en ændring i, hvordanERDDAP™Læser og fortolker kildedata, f.eks. når du installerer en ny version afERDDAP™eller når du har foretaget visse typer ændringer i en datasæts definition idatasets.xml. Se endnu[denne dokumentation](/docs/server-admin/additional-information#hard-flag). Takket være John Kerfoot og alle Argo grupper.
         
    * NYHED: GenererDatasets Xml har nu en EDDTableFraEML mulighed
som læser en datasæt beskrivelse i et Ecological Metadata Language (EML) fil, downloads den relaterede datafil, og genererer en flokdatasets.xmlså datasættet kan føjes tilERDDAP. Der er også en EDDTableFraEMLBatch, som gør det samme for alle EML-filer i en mappe. Dette fungerer meget godt, fordi EML gør et fremragende job for at beskrive datasættet og fordi KNB og LTER gør de faktiske datafiler tilgængelige.
EML plusERDDAP™kunne være en stor kombination, daERDDAP™kunne give brugere mere direkte adgang til rigdom af KNB og LTER-data og hjælpe disse projekter med at opfylde USA's regering[Offentlig adgang til forskningsresultater (PARR) krav](https://nosc.noaa.gov/EDMC/PD.DSP.php)ved at gøre de tilgængelige data via en webtjeneste.
Se endnu[denne dokumentation](/docs/server-admin/EDDTableFromEML). Takket være Margaret O'Brien, LTER og EML.
         
    * NYHED: GenererDatasets Xml har nu en EDDTableFraInPort-indstilling
som læser en datasæt beskrivelse i en InPort XML-fil og forsøger at generere en bid afdatasets.xmlså datasættet kan føjes tilERDDAP. Dette skaber sjældent en klar til brug af XML tildatasets.xml, men det vil skabe et godt groft udkast, der er et godt udgangspunkt for at redigere af et menneske.
Det ville være fantastisk, hvis folk bruger InPort til at dokumentere deres datasæt ville også brugeERDDAP™at gøre de faktiske data tilgængelige viaERDDAP's webtjenester og dermed mødes den amerikanske regering' ogNOAA's[Offentlig adgang til forskningsresultater (PARR) krav](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)ved at gøre de tilgængelige data via en webtjeneste. Dette er en løsning, der kunne bruges lige nu. (erd.data at noaa.gover glad for at hjælpe.)   
Se endnu[denne dokumentation](/docs/server-admin/datasets#eddtablefrominport). Tak til Evan Howell og Melanie Abecassis.
         
    * VIGTIGT:ERDDAP™bruger nu netcdf-java 4.6,6.
Med tidligere versioner læser netcdf-java nogle fyldværdier (måske bare i netcdf-4-filer) som 0'er. Nu læser det nogle af dem som netcdf standardværdi: -127 for bytes, -32767 for shorts, -2147483647 for ints.Unidatasiger den nye adfærd er den rette adfærd. Hvis en variabel i et datasæt starter med at vise en af disse værdier, hvor de brugte til at vise 0'er, kan du tilføje, f.eks.
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
til variablenaddAttributesat fortælleERDDAP™at behandle denne værdi som enmissing\\_value/ \\_Fill Værdi. Men i mange tilfælde, der ikke vil give det ønskede resultat: 0'er. Hvis det er tilfældet, skal du overveje at ændre filerne medNCOeller omskrive filerne. Klager? Kontakt venligstUnidata;-)
         
    * TO DO: Ny topografiDepth palette
Jeg opfordrer dig til at skifte alle datasæt, der bruger OceanDepth-paletten til at bruge den nye TopografiDepth-palet, som er ligesom Topografi bortset fra farverne, der er vendt, så det er velegnet til dybdeværdier (positivt=down) , i stedet for højdeværdier (positivt=up) . De anbefalede indstillinger for denne palet er:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NYHED FEATURE: streng streng strengmissing\\_valueog/eller \\_FillValue
Hvis en streng variabel definerer enmissing\\_valueog/eller \\_FillValue,ERDDAP™fjerner nu disse værdier fra data og erstatter dem med en tom streng, så manglende værdier vises som tomme strenge, som med andre datasæt iERDDAP. Takket være Margaret O'Brien, LTER og EML.
         
    * NYHED FEATURE: Støtte til lokale tider
timetamp variabler med kildedata fra Strings kan nu angive en tidszone via en "time\\_zone" attribut, der førerERDDAP™for at konvertere de lokale tidszone kildetider (nogle i Standard tid, nogle i Daylight Saving tid) ind iZulutider. Listen af gyldige tidszonenavne er sandsynligvis identisk med listen i kolonnen TZ i kolonnen TZ[denne tabel](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Standarden er "Zulu". Fælles tidszoner er: USA/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern. For tidsstempel variabler med numeriske kildedata, kan du angive "time\\_zone" attribut, men værdien skal være "Zulu" eller "UTC". Takket være Margaret O'Brien, LTER og EML.
         
    * NEW FEATURE: EDDTableFraAsciiFiles understøtter nu semikolonn-separated filer
og er smartere ved at finde ud af separatoren. Takket være Margaret O'Brien, LTER og EML.
         
    * NYHED FEATURE: Hvis der er en betydelig fejl i belastningDatasets (større eller mindre, f.eks. manglende eller ugyldigdatasets.xmldokumentdokument) ,ERDDAP™vil nu angive det i status.html, lige under "n Datasets Failed To Load" som ERROR: mens du behandlerdatasets.xml: se log.txt for detaljer.
         
    * NYHED FEATURE:ERDDAP™ser ud til børnehjem.
Hvornår Hvornår skal man HvornårERDDAP™gør en stor belastning Datasets, det ser nu ud til børnehjem (Datasæt, der er iERDDAP™men ikke idatasets.xml) . Hvis det er fundet, er de angivet i status.html, lige under "n Datasets Failed To Load" som ERROR: n Orphan Datasetsets (Datasæt iERDDAP™men ikke idatasets.xml) = ....
Hvis du vil fjerne (Ulast) Et børnehjemERDDAP™, du skal tilføje
        &lt;Datasæt type RoHS_anyValidType_"datasetIDBrugere, der downloadede Vanish_theDatasetID_ downloadede også:
til at tildatasets.xmlindtil datasættet er losset under den næste store belastningDatasets.
         
    * BUG FIX: Hvis et datasæt havde ennumerisk timetamp variabel med enheder andet end"seconds since 1970-01-01T00:00:00Z"og med&lt;opdateringEveryNMillis&gt; system aktivt, tidsstempelvariables rækkevidde blev sat forkert, når datasættet blev opdateret. Tak til John Kerfoot.
         
    * BUG FIX: Hvis&lt;hurtigstart&gt; var sandt i opsætning.xml og du anmodede data fra en EDDTableFra... Filer datasæt, der bruges&lt;opdateringEveryNMillis&gt;, den første anmodning til datasættet ville mislykkes, men efterfølgende anmodninger ville lykkes. Nu vil den første anmodning ikke mislykkes. Tak til John Kerfoot.
         
    * BUG FIX: GenererDatasetsXml.sh og .bat fungerede ikke med &gt;9 parametre på kommandolinjen. Nu gør de. Tak til John Kerfoot.
         
    * BUG FIX: De nye EDDTableFraMultidimNcFiles fjernede ikke konstant spor af mellemrum fra strenge. Nu gør det. Især dette berørte ARGO-filer. Tak til Kevin O'Brien og Roland Schweitzer.
         
    * BUG FIX: Alt adgang til fjernbetjeningDAPtjenester er nu igangsat af mere moderne kode. Dette løser fejlen "connection lukket" ved at få adgang til nogle EDDTableFraErddap datasets. Tak til Kevin O'Brien.
         
    * BUG FIX: Håndtering aforderBy...... () og adskilt () er nu tilbage til den måde, de var før de seneste ændringer: en given anmodning kan have flereorderBy...... () og/eller en bestemt () filter;ERDDAP™vil håndtere dem i den rækkefølge, de er angivet. Tak til David Karuga.
         
    * BUG FIX: Hvis datasættet er EDDTableFraDatabase og en forespørgsel har[kildeKanOrderBy](/docs/server-admin/datasets#sourcecanorderby)og/eller[kildeKanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct), så databasen kan (afhængigt af indstillinger idatasets.xml) delvis eller helt håndtag **kun den første**  orderBy.. () eller adskilt () . Tak til David Karuga.
         
    * BUG FIX: Den seneste ekstra procent-kodning forårsagede problemer med nogle forespørgsler for.ncCF-filer, f.eks. "HTTP Status 500 - Forespørgselsfejl: variabel=station er opført to gange i resultatvariabler listen." Tak til Kevin O'Brien.
         
    * BUG FIX: EDDTableFraFiles havde problemer med at indlæse et datasæt, når en af kolonnerne var en sand char kolonne. Tak til Roland Schweitzer.
         
    * BUG FIX:EDDGridFraNcFiles Upakket nu også konverterermissing\\_valueog \\_FillValue til standardværdier, så filer med forskellige værdier kan aggregeres. På grund af denne ændring, efter at du installerer denne nye version afERDDAP™, venligst sæt en[hårdt hårdt Flag](/docs/server-admin/additional-information#hard-flag)for hverEDDGridFraNcFiles Upakket datasæt i dinERDDAP.
         
    * IMPROVED: EDDTableFraNcCFFiles kan nu håndtere filer, der har flere prøve\\_dimension'er. Et givet datasæt skal kun bruge variabler, der bruger en af prøven\\_dimensioner. Tak til Ajay Krishnan.
         
    * IMPROVED: Til EDDTableFra...Files,&lt;sortereFilesBySourceNames&gt; nu giver kommunal-separated (anbefalet anbefalet) eller mellemrum adskilte lister over variable kildenavne. I begge tilfælde kan enkelte variable navne være omgivet af dobbelt citater, f.eks. hvis navnet har et internt rum.

## Version 1.72{#version-172} 
 (udgivet 2016-05-12) 

*    **Nye funktioner (for brugere) :** Ingen.
     
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * NYHED EDDTableFraMultidimNcFiles[EDDTableFraMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)er et nyt alternativ til EDDTableFraNcFiles. Det er designet til at håndtere grupper af filer med flere variabler med delte dimensioner, f.eks.\\[a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a\\]\\[b\\], var2\\[a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a\\], var3\\[b\\], scalarVar. Takket være Argo Project, Aurélie Briand og Roland Schweitzer.
    * BUG FIX:ERDDAP™  (via filVisitorDNLS og FileVistorSubdir klasser) Nu følger symboliske links på Linux.ERDDAP™Følg stadig ikke .lnk's på Windows.
    * BUG FIX af fejl indført i 1.70: særskilt +orderByvar ikke tilladt sammen i én anmodning. Nu er de igen. De er ikke gensidigt eksklusive/rødundant. Tak til David Karuga.
    * Til fodsdatasets.xmlblacklist af IP-adresser:
IP v4 adresser vises tilERDDAP™som 4 tidsbestemte hæx-numre.
Jeg tror, at IP v6 adresser vises som 8 kolon-separatet hæx tal.
SåERDDAP™Nu understøtter kolonier i IP-adresserne på denne liste og :\\* i slutningen af listen for at blokere en række adresser.
    * VIGTIGT:ERDDAP™nu bruger NetcdfFileWriter til at skrive.ncfiler i stedet for den deprecated NetcdfFileWriteable. Der bør ikke være nogen mærkbar ændring til de resulterende filer. Dette åbner op for muligheden for at gøre stor.ncfiler, der bruger de.nc3 64bit udvidelser. Hvis du ønsker/need, så send en anmodning tilerd.data at noaa.gov.
    * IMPROVED: Mange af links til eksterne hjemmesider var forældet. Nu er de opdaterede og brugerhttps:i stedet forhttp: når det er muligt.
    * Mange små ændringer.

## Version 1.70{#version-170} 
 (udgivet 2016-04-15) 

*    **Nye funktioner (for brugere) :** Ingen.
     
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** Nedenfor er der flere anbefalede ændringer til dokumentationen i din opsætning.xml-fil.
Foretag disse ændringer nu.
30 minutter af arbejdet kan nu gemme dig timers forvirring i fremtiden.
    * Bug fix: Problemet var, at anmodninger, der blev omdirigeret til en fjernERDDAPmislykkedes med en ugyldig figur "|Fejlmeddelelse. Dette skete kun med de seneste versioner af Tomcat. Tak til Rusty Holleman, Conor Delaney og Roy Mendelssohn.
    * Bug fix:ERDDAP™bruger nu en opdateret version af netcdf-java (Det er en lang historie) som indeholder up-to-date understøttelse af NcML, som løser problemet med NcML LogicalReduce ikke fungerer som forventet. Der kan være et par små ændringer i de metadata, somERDDAP™Læser via netcdf-java fra.nc,.hdf, .grib og .bufr filer. Tak til Favio Medrano.
    * Den nye[EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows)giver dig mulighed for at lave en sammensatte EDDTable datasæt fra to eller flere EDDTable datasæt, der har de samme datavariabler ved hjælp af de samme enheder. Tak til Kevin O'Brien.
    * Nye muligheder for EDDTableFraDatabase ([kildeKanOrderBy](/docs/server-admin/datasets#sourcecanorderby)og og og[kildeKanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) Lad dig angive, omERDDAP™, databasen eller begge, håndtere særskilte ogorderBy  (og alle varianter) begrænsninger. Tak til David Karuga.
    * Du kan nu lave en privat datasæts diagrammer og metadata til rådighed for offentligheden via den nye [&lt;GraferAccessibleTo&gt;public&lt;/graphsAccessibleTo&gt;] (/docs/server-admin/datasets#graphsaccessibleto) tag. Tak til Emanuele Lombardi.
    * Nu, hvis en streng passer til GenererDatasets Xml eller DasDds er omgivet af dobbelte citater, det er uquoted (som om det er en JSON streng) . Tak til John Kerfoot og Melanie Abecassis.
    * GenererDatasets Xml understøtter nu "standard" for at få standarden og "ingen" for at få en tom streng (de arbejder med eller uden tilbud) . Dette løser nogle problemer relateret til at passere tomme strenge.
    * Nu, i GenererDatasets Xml, for alleEDDGridFraFiles og EDDTable FraFiles datasæt, hvis prøven Filnavn, du angiver, er "" (den tomme streng) , vil det bruge den sidste matchende filnavn fra mappen + regex + reursive=true.
    * Opdateret: DisplayInBrowser kode, der bruges til at vise resultaterne af GenererDatasetsXml og DasDds på Linux-computere var forældet og gav en mærkelig besked om Netscape. Nu bruger dette et moderne Linux værktøj: xdg-open. Tak til Melanie Abecassis.
    * The The The The The The TheallDatasetsDatasæt har nu en"files"kolonne, der angiver bundens URL for /files link (hvis der er en) for datasættet.
    * Forøg din generelle sikkerhedERDDAP™ved at ændre de tilladelser, der er knyttet til tomcat-mappen og bigParentDirectory:
         (De faktiske kommandoer nedenfor er for Linux. For andre OS'er, foretage analoge ændringer.) 
        * Ændre "gruppen" for at være tomcat, dit brugernavn eller navnet på en lille gruppe, der indeholder tomcat og alle administratorer af Tomcat/ERDDAPf.eks.
cgrp -R _yourUserName_ apache-tomcat-_8.0.23_
chgrp -R _your Brugernavn bigParentDirectory_
        * Ændre tilladelser, så tomcat og gruppen har læst, skrive, udføre privilegier, f.eks.
ug+rwx apache-tomcat-_8.0.23_
ug+rwx _bigParentDirectory_
        * Fjern "andre" brugerens tilladelser til at læse, skrive eller udføre:
chmod -R o-rwx apache-tomcat-_8.0.23_
chmod -R o-rwx _bigParentDirectory_
Dette er vigtigt, fordi det forhindrer andre brugere i at læse muligvis følsomme oplysninger iERDDAP™setup filer, log filer og filer med oplysninger om private datasæt.
    * Godkendelses-/loginsystemet blev genfortampet. Takket være Thomas Gardner, Emanuele Lombardi og den amerikanske regerings nye[HTTPS-kun standard](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * Indstillingen=openid blev fjernet. Det var forældet.
        * Den nye, anbefalede,[Godkendelse =google](/docs/server-admin/additional-information#google)mulighed bruger Google Log ind (baseret på OAuth 2.0) at tillade nogen med en Google-mail-konto (herunder Google administrerede konti som@noaa.gov) at logge ind.
        * Det nye,[Godkendelse = e-mail](/docs/server-admin/additional-information#email)mulighed er en sikkerhedskopi af godkendelse=google. Det giver brugerne mulighed for at&lt;Bruger&gt; tag idatasets.xmlat logge ind ved at sende dem en e-mail med et særligt link.
        * I din opsætning.xml skal du ændre beskrivelsen for&lt;Godkendelse&gt; for at være
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

        * I din opsætning.xml skal du tilføje dette nedenfor&lt;Godkendelse&gt; tag tag
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

        * Nu kan brugere, der ikke er logget ind, brugehttpeller eller ellerhttpsURL'er (hvis du har konfigureret&lt;baseHttpsUrl&gt; i din opsætning.xml. Tak til den amerikanske regerings nye[HTTPS-kun standard](https://https.cio.gov/).
        * Nu kan du opfordre alle brugere til at brugehttps  (Ikke ikkehttp) ved at indstille&lt;baseUrl&gt; at være enhttpsURL. At tvinge brugere til at bruge kunhttps, skal du også foretage ændringer i din Apache/Tomcat opsætning for at blokere ikke--httpsadgang. Tak til den amerikanske regerings nye[HTTPS-kun standard](https://https.cio.gov/).
            
I din opsætning.xml skal du ændre beskrivelsen for&lt;baseUrl&gt; at være
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

        * Mulighederne&lt;Adgangskode nulstilling&gt; ændret. I din opsætning.xml skal du ændre beskrivelsen for&lt;Adgangskode nulstilling&gt; for at være
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

        * I din opsætning.xml skal du ændre beskrivelsen for&lt;baseHttpsUrl&gt; at være
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

        * Nu, hvis listePrivateDatasets=true i setup.xml, vil endnu mindre information blive vist om datasæt, at en bruger ikke har adgang til.
    * Nu, især for, hvornår du oprindeligt opretter din opsætningERDDAP, du kan nu fortælleERDDAP™ikke at prøve at abonnere på fjernbetjeningenERDDAP™Datasets. Tak til Filipe Rocha Freire.
I din opsætning.xml, lige før&lt;Familietype&gt;, tilføj venligst
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

    * I din opsætning.xml, i instruktionerne ovenfor&lt;EmailFraAddress&gt;, skal du indsætte:
Hvis det er muligt, skal du indstille dette op til at bruge en sikker forbindelse (SSL / TLS) til e-mailserveren.
Hvis din opsætning ikke bruger en sikker forbindelse til e-mailserveren, skal du foretage ændringerne for at gøre det så.
    * I din indbakkedatasets.xml, venligst tilføje denne linje til beskrivelsen af&lt;AbonnementEmailBlacklist&gt; i din kontodatasets.xml:
Du kan bruge navnet "\\*" til blacklist et helt domæne, f.eks.\\*.
    * Da ændringen til logningssystemet i v1.66, er logfilen aldrig opdateret. Der er altid beskeder eller dele af meddelelser, der venter på at blive skrevet til logfilen. Nu kan du gøre det up-to-date (for et øjeblik) ved at se dinERDDAP's statusside på siden http://_your.domain.org_/erddap/status.html .
    * .......
    * En lille ændring (til String2.canonisk) det bør hjælpe med at holde tingene i bevægelse hurtigt, nårERDDAP™er meget optaget og også bedre beskæftige sig med et meget stort antal datasæt.
    * Stærkt Anbefalet: stop ved brug&lt;konvertereToPublicSourceUrl&gt; i in in in indatasets.xmlat konvertere et IP-nummer i et datasæt's&lt;sourceUrl&gt; &gt; &gt; &gt; (fx, http://192.168.#.#/ ) i et domænenavn (fx,http:my.domain.org/) . Fra nu, nye abonnementer til http://localhost , http://127.0.0.1 , og http://192.168.#.# URLS vil ikke blive tilladt af sikkerhedsmæssige årsager. Så brug altid det offentlige domænenavn i det offentlige domæne&lt;sourceUrl&gt; tag (hvis det er nødvendigt på grund af DNS problemer) , du kan bruge[/etc/hosts tabel på din server](https://linux.die.net/man/5/hosts)at løse problemet ved at konvertere lokale domænenavne til IP-numre uden at bruge en DNS-server. Du kan teste, om et bestemt domænenavn bliver korrekt løst ved at bruge
ping _some.domain.name_
    * I generereDatasets.xml, til fjerndatasæt (f.eks. fra en THREDDS-server) , den automatisk genererededatasetIDs er uændret for de fleste domæner. For et par domæner, den første del (f.eks. navnet) af den automatisk genererededatasetIDvil være lidt anderledes. Især navne, der havde en del, er nu mere tilbøjelige til at have to dele. For eksempel datasæt fra http://oos.soest.hawaii.edu tidligere ledt tildatasetIDs, der startede med hawaii\\_, men nu fører tildatasetIDs der starter med hawaii\\_soest\\_. Hvis dette forårsager problemer for dig, bedes du kontakte mig. Der kan være en arbejdsgang.
    * Cassandra driveren blev opdateret til cassandra-driver-core-3.0.0.jar og dermed for Cassandra v3. EDDTableFraCassandra ikke drage fordel af eventuelle nye funktioner i Cassandra v3. Indekser i Cassandra kan nu være mere kompleks, menERDDAP™Brug stadig Cassandra v2 indeksmodellen, som antager, at en indekseret kolonne kan blive direkte rodet med'='begrænsninger. GenererDatasets Xml for EDDTableFraCassandra registrerer ikke længere kolonner med indekser; hvis et indeks er simpelt, skal du angive det idatasets.xmlhånd. Hvis du har brug for støtte til mere komplekse indekser eller andre nye funktioner, bedes du sende en e-mailerd.data at noaa.gov.
&#33;&#33;&#33; Hvis du stadig bruger Cassandra 2.x, skal du fortsætte med at brugeERDDAP™v1.68 indtil du opgraderer til at bruge Cassandra 3.x.
    * Jars og Classpath -- Næsten alle de omfattede tredjeparts .jar filer blev opdateret til deres seneste versioner.
        * slf4j.jar blev tilføjet til /lib og klassepat.
        * joid. krukke og tsik. krukker blev fjernet fra /lib og klassestien.
        * Hvis du får fejlmeddelelser om klasser ikke fundet, når du kompilerer eller kørerERDDAP™eller en af dens værktøjer, sammenlign din kommandolinjes klassesti tilERDDAP's[nuværende klasse](/docs/contributing/programmer-guide#development-environment)at finde ud af, hvilke .jars mangler fra din klassepat.

## Version 1.68{#version-168} 
 (udgivet 2016-02-08) 

*    **Nye funktioner (for brugere) :** Ingen.
     
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    *   [EDDGridFraFiles Aggregation via filnavne eller Global Metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)--
Alle variationer afEDDGridFraFiles kan nu aggregere en gruppe filer ved at tilføje en ny venstre dimension, normalt tid, baseret på en værdi, der stammer fra hvert filnavn eller fra værdien af en global egenskab, der er i hver fil.
    * IMPROVED: Vi foreslog tidligere, at du kunne lide at oprette enEDDGridFraErddap datasæt i dindatasets.xmlden refererede og genbehandlede jplMURSST datasæt i voresERDDAP. Da der nu er en nyere version af datasættet, er datasættet nu forældet. Så hvis du har det datasæt i dinERDDAP™Hvis du vil tilføje dette nye datasæt
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Hvis du vil fjerne den gamle jplMURSST-datasæt fra dinERDDAP™  (det er dit valg) , ændre sin aktive indstilling fra "true" til "false".
    * Bug fix: Tjek venligst den storeParentDirectory, du har angivet i din opsætning.xml. Hvis du ikke havde sat en slash i slutningen af slutningen af det&lt;bigParentDirectory&gt; navn, derefterERDDAP™vil have skabt flere mapper ved at vise ord direkte til det navn, du har angivet, i stedet for at oprette undermapper. Begyndende med version 1.68,ERDDAP™tilføjer en skråstreg til slutningen af mappenavnet, hvis du ikke angive en. Så hvis du tidligere ikke angive en slash i slutningen, så når du installererERDDAP™v1.68 Du skal flytte og omdøbe disse mapper **efter efter efter** du lukker den gamleERDDAP™og og og **før før** du starter den nyeERDDAP. For eksempel, hvis du fejlagtigt specificerede bigParentDirectory som /home/erddapBPD (Ingen sporing slash) og og ogERDDAP™har fejlagtigt oprettet mapper som
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/ hjem/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDlucene
og en fil ved navn /home/erddapBPDsubscriptionsV1.txt,
Så skal du flytte og omdøbe dem til at være
/home/erddapBPD/cache
/home/erddapBPD/copy
/home/erddapBPD/dataset
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/lucene
og /home/erddapBPD/subscriptionsV1.txt
    * Bug fix: Der var fejl iEDDGridLonPM180 inERDDAP™v1.66, der opstod, når barnet datasæt er etEDDGridFraErddap.
    * Bug fix: Der var en fejl iEDDGridFraFiles og EDDTable FraFiles iERDDAP™v1.66, der forårsagede&lt;opdateringEveryNMillis&gt; for at ignorere den første gang datasættet blev indlæst efter en genstart.
    * Bug fix / Ny funktion: Hvis et barns datasæt indenEDDGridAggregateExistingDimension,EDDGridKopier,EDDGridFraEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy eller EDDTableFraEDDGrider en ...FraErddap dataset, at forældredatasæt nu abonnerer på det underliggendeERDDAP™Datasæt. Hvis den underliggendeERDDAP™Datasæt er i sammeERDDAP™, abonnementet og dens validering sker direkte; du får ikke en e-mail, der beder dig om at bekræfte abonnementet. Ellers, hvis abonnementssystemet til dit abonnementERDDAP™er slukket, sæt af&lt;reloadEveryNMinutes&gt; indstilling for forældrenes datasæt til et lille tal (60?) så det forbliver up-to-date.
    * Bug fix / Ny funktion: Hvis et barns datasæt indenEDDGridAggregateExistingDimension,EDDGridKopier,EDDGridFraEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy eller EDDTableFraEDDGridhar aktiv thefalse", at børnedatasæt nu springes over.

## Version 1.66{#version-166} 
 (udgivet 2016-01-19) 

*    **Nye funktioner (for brugere) :** 
    * Grafer (Ikke kort) kan nu have faldende værdier på akserne. For at få dette, når du bruger en Make A Graph-side, skal du ændre nye Y Axis : stigende indstilling (Standard) til faldende. Eller i en webadresse, der anmoder om en graf, skal du bruge den nye valgfri 3. '|' parameter for parameteren[&.x Range og/eller &. YRangekontakter](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands), som ikke kan være noget (Standard) , sand eller t at få opstigende værdier eller bruge falsk eller f for at få faldende værdier. Det sande|falske værdier er tilfælde ufølsomme. Tak til Chris Fullilove, John Kerfoot, Luke Campbell og Cara Wilson.
    * Brugere kan nu angive baggrundsfarven til grafer ved at tilføje en &.bgColor=0x_ AARRGGBB_ switch til den URL, der anmoder grafen. Se .bgColor i sektionen Grafikkommandoer[gitteretap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)og og og[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)dokumentation. Tak til John Kerfoot og Luke Campbell.
    * For tabulære datasæt, begrænsninger kan nu henvise til min (_someVariableName_) eller max (_someVariableName_) . Se endnu[min min () og max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Tak til John Kerfoot.
    * For tabulære datasæt, tidsbegrænsninger, der bruger[nu nu nu](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)kan nu angive tidsenheder af millisekunder eller millimeter.
    * En anmodning om et billede af et tabulært datasæt gør nu et kort (Ikke en graf) hvis x og y variabler er længdelignende og breddegradlignende variabler (kompatible enheder) . Tak til Rich Signell.
    * Bug fix: Time akse etiketter og flåter nogle gange havde ulige uregelmæssigheder, når du anmoder flere diagrammer samtidig (f.eks. på en webside) . Problemet var en fejl i SGT-grafikbiblioteket, derERDDAP™Brug af anvendelser (en variabel var "statisk", der ikke burde have været) . Tak til Bradford Butman.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Det er en sikkerhedsrisiko at placere din e-mail-adgangskode i en almindelig tekstfil som opsætning.xml. For at afbøde dette problem, anbefaler vi stærkt, at du:
        1. Angiv en e-mail-konto bare forERDDAPBrug, fx, erddap@yourInstitution.org . Det har andre fordele også; navnlig mere end énERDDAP™Administrator kan derefter få adgang til den e-mail-konto.
        2. Foretag tilladelserne i opsætningen.xml-filen rw (Læs+skrive) for brugeren, der vil køre Tomcat ogERDDAP™  (Bruger=tomcat?) og ingen tilladelser (ikke læse eller skrive) for gruppen og andre brugere. Tak til Filipe Rocha Freire.
    * Den nye[ArchiveADataset](/docs/server-admin/additional-information#archiveadataset)værktøj forenkler at gøre en.tar.gzarkiv med et undersæt af et datasæt i et format, der er egnet til arkivering (Sandsynligvis, påNOAA's NCEI) . Dette skal være nyttigt for mangeERDDAP™Administratorer i mange situationer, men især for grupper inden forNOAA.
    * Den nye datasæt type[EDDGridFraNcFilesUnpakke](/docs/server-admin/datasets#eddgridfromncfilesunpacked)er en variant afEDDGridFraNcFiles. Forskellen er, at denne klasse pakker hver datafil førEDDGridFraFiles ser på filerne:
        
        * Den pakkede variabler, der brugerscale\\_factorog/elleradd\\_offset.
        * Det fremmer integer variabler, der har \\_Unsigned=true attributter til en større iteger data type, så værdierne vises som de usignede værdier. For eksempel en \\_Unsigned=true byte (8 bit) variabel bliver en underskrevet kort (16 bit) variabel.
        * Det konverterer \\_FillValue ogmissing\\_valueværdier for at være NaN's (eller MAX\\_VALUE for integer data typer) .
        
Den store fordel ved denne klasse er, at det giver en måde at håndtere forskellige værdier afscale\\_factor,add\\_offset, \\_FillValue ellermissing\\_valuei forskellige filer i en samling. Ellers ville du nødt til at bruge et værktøj som[NcML](/docs/server-admin/datasets#ncml-files)eller eller eller[NCO](/docs/server-admin/datasets#netcdf-operators-nco)for at ændre hver fil for at fjerne forskellene, så filerne kunne håndteres afEDDGridFraNcFiles. For denne klasse at arbejde ordentligt, skal filerne følge CF standarder for de relaterede attributter. Tak til Philippe Makowski.
    * Den nye datasæt type[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)lader dig ændre datasæt, der har nogle længdeværdier større end 180 (f.eks. rækkevidde 0 til 360) i datasæt med længdeværdier inden for rækkevidde -180 til 180 (Langitude Plus eller Minus 180, dermed navnet) . Den store fordel at tilbyde datasæt med længdeværdier i sortimentet -180 til 180 er, atOGCtjenester (fx,WMS) kræver længdeværdier i dette område. Tak til Lynne Tablewski, Fabien Guichard, Philippe Makowski og Martin Spel.
2016-01-26 Opdater: Eeek&#33; Dette har en fejl, der opstår, når barnet datasæt er enEDDGridFraErddap, der referencerer et datasæt i sammeERDDAP. Denne fejl er rettet iERDDAP™v1.68.
    * I nærheden af In In In In In In In In In In In In In In[GenererDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml), en ny speciel datasæt type,EDDGridLonPM180FraErddapCatalog, lader dig generere dendatasets.xmlfor for forEDDGridLonPM180 datasæt fra alle afEDDGridDatasæt i enERDDAPder har alle længdeværdier større end 180.
    * Til alleEDDGridDatasæt, idatasets.xmlDu kan nu bruge det valgfrie
[ []&lt;tilgængelig Via Via Via ViaWMS&gt;true|falsk&lt;/ utilgængelig Via Via Via ViaWMS&gt;] (/docs / server-admin / Datasets#accessibleviawms)   (Standard=and) . Indstilling af denne til falsk forcibly deaktivererWMSService til denne datasæt. Hvis det er tilfældet, kan datasættet stadig ikke være tilgængeligt viaWMSaf andre grunde (f.eks. ikke lat eller lon akser) . Dette er især nyttigt for datasæt, der findes på egen hånd og indpakket afEDDGridLonPM180, så kun LonPM180 versionen er tilgængelig viaWMS.
    * I opsætning.xml, kan du angive en anden standard farve til baggrunden af grafer. Farven er angivet som en 8 cifret hexadecimal værdi i form 0x_AARRGGBB_, hvor AA, RR, GG, og BB er opacity, rød, grønne og blå komponenter, henholdsvis angivet som 2-cifret hexadecimal tal. Bemærk, at lærredet altid er uigennemsigtig hvid, så et (semi - - - -) transparent graf baggrund farve blandes i det hvide lærred. Standarden er lyseblå:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Tak til John Kerfoot og Luke Campbell.
    * I opsætning.xml kan du nu angive den maksimale størrelse for den[logfil](/docs/server-admin/additional-information#log)  (når det omdøbes til at logge. txt. tidligere og en ny log. txt er oprettet) , i MegaBytes. Mindste tilladt er 1. Det maksimale tilladt er 2000. Standarden er 20 (MB MB) . For eksempel:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml[&lt;I nærheden af fgdcFile&gt;] (/docs/server-admin/datasets#fgdcfile) eller [&lt;I nærheden af iso19115File&gt;] (/docs/server-admin/datasets#iso19115file) kan nu være en lokal fil (som før) eller en URL (som downloades, så der er en lokal kopi) . HvisERDDAP™er ikke i stand til at downloade filen, indlæsning af datasættet vil fortsætte, men datasættet har ikke en fgdc eller iso19115-fil.
    *   EDDGridFraFiles og EDDTable FraFiles datasæt kan nu gøre en hurtigstart (systemet, derERDDAP™forsøger at bruge, når datasæt først indlæses, når datasætERDDAP™genstartes) . Dette fremskynder genstartERDDAP.
2016-01-26 Opdater: Eeek&#33; Dette har en fejl, der forårsager&lt;opdateringEveryNMillis&gt; for at ignorere den første gang datasættet er indlæst efter en genstart. Denne fejl er rettet iERDDAP™v1.68.
    * En generel forbedring til hurtigstart systemet giver mulighedERDDAP™at indlæse datasæt hurtigere, nårERDDAP™genstartes.
    * AlleEDDGridFraFiles og EDDTable FraFiles subclasses accepterer nu en ny&lt;stiRegex&gt; tag, normalt angivet lige under&lt;Receptpligt&gt;. Hvis reursive er "true", kun fuld undermapper, der matcher stiRegex (\\*") vil blive accepteret. På samme måde&lt;sourceUrls&gt; tag i enEDDGridAggregateExistingDimension kan nu inkludere en stiRegex attribut (\\*") .
    * Standarden for&lt;delvisRequestMaxBytes&gt; i opsætning.xml er nu 490000000 (~490 MB) . Dette undgår nogle problemer/timeouts relateret til at få data fra THREDDS-dataservere. Tak til Leslie Thorne.
    * En lille ændring i logsystemet skal tilladeERDDAP™at være mere lydhør, når det er meget, meget travlt. Oplysninger er nu skrevet til logfilen på diskdrevet i ret store stykker. Fordelen er, at dette er meget effektivt --ERDDAP™vil aldrig blokere vente på, at oplysninger skal skrives til logfilen. Ulempen er, at loget næsten altid ender med en delvis meddelelse, som ikke vil blive afsluttet, indtil næste klump er skrevet.
    * Bug fix relateret til inotify og [&lt;OpdaterEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis) System til systemEDDGridFraFiles og EDDTable FraFiles datasæt: Det er ikke længere nødvendigt at angive en stor af fs.inotify.max\\_user\\_watches eller fs.inotify.max\\_user\\_instances. Der er en fejl iJavader forårsager nogle dele afJava's inotify/WatchDirectory system til ikke at blive affald indsamlet, når de er finaliseret; i sidste ende vil antallet af zombie inotify ure eller tilfælde overstige det maksimale antal angivet.ERDDAP™Nu arbejder omkring detteJavafejl.
Desuden er antallet af inotify tråde opført på status.html-websiden, så du kan holde øje med dens brug. Typisk er der 1 inotify tråd pr.EDDGridFraFiles og EDDTable FraFiles datasæt.
    * Bug fix: i mange steder, i stedet for en fejl at blive rethrown, en ny fejl blev genereret, som kun indeholdt en kort version af den oprindelige fejlmeddelelse og uden stack trace. Nu, når en ny fejl genereres, indeholder den korrekt hele den oprindelige undtagelse, f.eks. smide nye Undtagelser ("nogle nye beskeder", e) ;
Tak til Susan Perkins.
    * Bug fix: indtil for nylig (v1.64?) , hvis en .../datasetIDURL blev anmodet omERDDAP™ville tilføje .html til URL. I v1.64, dette mislykkedes (en forkert formateret URL blev genereret og mislykkedes) . Nu fungerer dette igen. Tak til Chris Fullilove.

## Version 1.64{#version-164} 
 (udgivet 2015-08-19) 

*    **Nye funktioner (for brugere) :** 
    * Der er nu vejledning til adgang til adgangskodebeskyttet privatERDDAP™Datasæt (https://) viacurlog og ogPython. Se billederne[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)og og og[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)instruktioner.
Takket være Emilio Mayorga af NANOOS og Paul Janecek af Spyglass Technologies.
         
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    *   ERDDAP™nu kræverJava1.8+.
        Java1.7 nåede dens[ende af livet](https://www.oracle.com/technetwork/java/eol-135779.html)  (Ikke flere sikkerhedsopdateringer) i april 2015. Denne version afERDDAP™vil ikke arbejde med versioner afJavanedenfor 1.8. Hvis du opdaterer fraJava1,7x (eller tidligere) , bør du også opdatere Tomcat. Se billederne[ERDDAP™Opsætning af instruktioner](/docs/server-admin/deploy-install)til download links og rådgivning.
    * Ny dataudbyder Form.
Når en dataudbyder kommer til dig i håb om at tilføje nogle data til dine dataERDDAP™, kan det være svært og tidskrævende at indsamle alle de metadata, der er nødvendige for at tilføje datasættet tilERDDAP. Mange datakilder (for eksempel .csv-filer, Excel-filer, databaser) har ingen interne metadata, såERDDAP™har en ny Dataudbyder Form, der samler metadata fra dataudbyderen og giver dataudbyderen en anden vejledning, herunder omfattende vejledning til Data In Databases. De oplysninger, der indsendes, overføres tildatasets.xmlformat og derefter e-mailet til detERDDAP™Administrator (dig du) og skrevet (tilføjet) til storeParentDirectory/logs/dataProviderForm.log . Således danner formularen halvautomatiske processen med at få et datasæt iERDDAP™, men denERDDAP™Administratoren skal stadig fuldføredatasets.xmlchunk and deal med at få datafilen (s s s) fra udbyderen eller forbindelsen til databasen. Du kan finde flere oplysninger i afsnittet[Dataudbyder Formbeskrivelse](/docs/server-admin/datasets#data-provider-form).
    * Nyt nyt&lt;MatchAxisNDigits&gt;
Kan bruges afEDDGridFraFiles (og dermed fraNcFiles og fraMergeIRFiles) ,EDDGridAggregateExistingDimension,EDDGridKopier, ogEDDGridSideBySide-datasæt for at angive, hvor præcist aksens værdier i forskellige filer skal være (hvor mange cifre) : 0=no kontrol (Brug ikke dette&#33;) , 1-18 for at øge præcisionen eller 20 (Standard) for præcis ligestilling. Til n =-18,ERDDAP™sikrer, at de første n cifre af dobbeltværdier (eller eller eller (n+1) div 2 for flydeværdier) er lig.
        &lt;matchAxisNDigits&gt; erstatter&lt;sikreAxisValuesAreEqual&gt;, som nu er deprecated. En værdi af 'and' vil blive konverteret til matchAxisNDigits=20. En værdi af 'false' (Gør ikke dette&#33;) vil blive konverteret til match AxisNDigits=0.
    *   EDDGridFraFiles og EDDTable FraFiles vil indlæse meget langsomt første gang du bruger denne version afERDDAP.
        ERDDAP™Nu gemmer de interne filoplysninger lidt anderledes, så det interne filbord for hver af disse datasæt skal genopbygges. Så rolig. Intet er forkert. Det er en én gang ting.
    * Fjernkilder
        EDDGridFraNcFiles, EDDTableFraNcFiles, EDDTableFraNcCFFiles giver nu filerne til at være fjerntliggende filer i en mappe, der er tilgængelige afhttp://  (og sandsynligvishttps://og ftp://, men de er ikke afprøvet) hvis fjernserveren understøtter[Rækkeanmodninger](https://en.wikipedia.org/wiki/Byte_serving)i anmodningshovedet.THDS og Amazon S3 support Range anmodninger,Hyraxgør ikke. Dette system giver dig mulighed for at få adgang til data i fjernfiler uden at downloade filerne (hvilket er nyttigt, hvis fjernfiler er for voluminøse) , men adgang til disse filer vil være langt langsommere end adgang til lokale filer eller endda til en fjernOPeNDAPkilde.
Dette inkluderer"files"i en Amazon S3 spand, da de er tilgængelige viahttp://. Hvis S3-objektnavnene er som filnavne (med interne /'s som et Linux-katalog træ) ,ERDDAP™kan også gøre filerne tilgængelige viaERDDAP's"files"system. For dette at arbejde skal dine S3 legitimationsoplysninger være i ~/.save / credentials (på Linux, OS X eller Unix) , eller C: “Brugere” (på Windows) på serveren medERDDAP. Se billederne[Amazon SDK-dokumentation](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * GenererDatasets Xml har en ny, usædvanlig mulighed: EDDsFraFiles.
Dette vil gå gennem et filsystem (selv et fjernsystem som en Amazon S3, hvis objekterne har fillignende navne) og oprette dendatasets.xmlbidder til en række datasæt. Dit kilometertal kan variere. Dette fungerer godt, hvis filerne er organiseret, så alle datafiler i en given mappe (og dens undermapper) er velegnet til én datasæt (f.eks. alle SST 1-dages kompositter) . Ellers ellers (f.eks., hvis en mappe indeholder nogle SST-filer og nogle Chlorophyll-a-filer) , dette virker dårligt, men kan stadig være nyttigt.
    * Programmer: nye /lib .jar filer.
Hvis du kompilererERDDAP™, Bemærk venligst de nye .jar filer i klassepath -cp parameter opført i denERDDAP™ [Programmeringsguide](/docs/contributing/programmer-guide).
    * Have\\_water\\_practical\\_salinity
Hvis du bruger CF-standardnavnet hav\\_water\\_salinity for enhver variabel, opfordrer jeg dig til at skifte til havet\\_water\\_practical\\_salinity, som er tilgængelig i[Version 29 af CF Standard Name Table](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (og nogle tidligere versioner - jeg vidste ikke, at) . Dette navn angiver, at dette faktisk er en Praktisk Salinity værdi ved hjælp afPractical Salinity Units  (PSU) , i modsætning til en ældre g/kg værdi. Kanoniske enheder er forskellige, men stadig utrolig uhjælpelig: 1 1 1 1 (antagelig antyder, atPSU/PSS-78) , i modsætning til 1e-3 (antagelig at betyde g/kg) for havet \\_water\\_salinity.\\[Hej, Hej,Unidataog CF: Vi identificerer værdier, der bruger andre skalaer, for eksempel Fahrenheit eller Celsius, via en enhedsstreng, der er navnet på skalaen eller en variation. Hvorfor kan vi ikke identificere salinity-enheder via deres skala, f.eks. PSS-78? Jeg ved: PSS-78 værdier er "enhedsløse", men der er en underforstået skala, er ikke der? Hvis jeg opfinder en ny praktisk salinity skala, hvor værdierne er 0,875 gange PSS-78-værdierne, skal de kanoniske enheder stadig være "1"? Hvordan kunne en bruger fortælle dem fra hinanden? Enheder af 1e-3 og 1 er hverken beskrivende eller nyttige for brugere, der forsøger at finde ud af, hvad tallene angiver.\\]

## Version 1.62{#version-162} 
 (udgivet 2015-06-08) 

*    **Nye funktioner (for brugere) :** 
    * For For For For ForEDDGridDatasets, brugerne kan nu lave Graph Type: Overfladediagrammer med enhver kombination af numeriske akser, ikke bare længde versus breddegrad. Dette lader dig gøre x mod y (projektbeskrivelse) Grafer og forskellige[Hovmöller Diagrams](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram), for eksempel, plotte længdegrad versus dybde, eller tid versus dybde.\\[Bemærk: Hvis dybden er på Y Axis, vil den sandsynligvis vendes fra, hvad du ønsker. Desværre, un-flipping det er endnu ikke en mulighed.\\]Tak til Cara Wilson og Lynn DeWittt.
    * Der er en ny[Hoteller i nærheden af Oceanic/Atmospheric Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)som lader dig konvertere en fælles oceanisk/atmosfærisk akronym til/fra et fuld navn.
    * Der er en ny[Oceanic/Atmosfærisk Variabel navne Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)som lader dig konvertere et fælles oceanisk/atmosfærisk variabel navn til/fra et komplet navn.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    *   Java7/8
        OracleIkke længere understøtter (Giver sikkerheds fejlrettelser til)  Java7.ERDDAP™stadig understøtterJava7, men vær venlig at flytte tilJava8. Den næste udgivelse afERDDAP™vil sandsynligvis kræveJava8.
    *   valid\\_min/max / rækkevidde
Tidligere og nu, hvis endataVariablehavde haftscale\\_factorog og ogadd\\_offsetmetadata, metadataERDDAP™Fjerner dataværdierne og fjerner metadata. Tidligere,ERDDAP™Ændret ikke/upack nogenvalid\\_range,valid\\_min,valid\\_maxmetadata metadata metadata (som regel/should indeholder fyldte værdier) af byscale\\_factorog og ogadd\\_offset. Nu gør det. Søg efter din søgningERDDAP™for "valid\\_" og sørg for, at alle de variabler, der harvalid\\_range,valid\\_minellervalid\\_maxhar de korrekte værdier, når datasætene vises i den nye version afERDDAP. Se endnu[valid\\_range/min/max dokumentation](/docs/server-admin/datasets#valid_range).
    * ACDD-1.3
Tidligere,ERDDAP™  (Betydeligt GenererDatasets Xml) brugt/anbefalet originalen (1.0) version af versionen[NetCDFIntributekonventionen for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)som blev omtalt som "UnidataDataset Discovery v1.0" i de globale konventioner ogMetadata\\_Conventionsattributter. Nu, vi anbefaler[ACDD version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)som blev ratificeret i begyndelsen af 2015 og henvises til som "ACDD-1.3". Heldigvis er ACDD-1.3 meget bagud kompatibel med version 1.0. Vi anbefaler, at du[Skift til ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). Det er ikke svært.
    * GenererDatasets Xml Attributes
Der var et stort antal ændringer for at forbedre&lt;addAttributes&gt; værdier anbefalet af GenererDatasets Xml for de globale konventioner,creator\\_name/email/url, nøgleord, oversigt og titel attributter og for variablenlong\\_nameattribut. Nogle ændringer er relateret til den nye brug af ACDD-1.3.
    * EDDTableFraSOSDatasæt
Med lejlighedsvis tilføjelse af nye typer afSOSservere og ændringer i de gamle servere, det bliver sværere forERDDAP™til automatisk at registrere servertypen fra serverens svar. Brug af [&lt;sosServerType&gt;] (/docs/server-admin/datasæt #eddtablefromsos-skeleton-xml)   (med en værdi af IOOS\\_NDBC, IOOS\\_NOS,OOSTethys eller WHOI) er nu STRONGLY RECOMMMENTD. Hvis nogen af dine datasæt af denne type har problemer i den nye version afERDDAP, prøv re-running GenererDatasets Xml for teSOSserver til at generere en ny bid afdatasets.xmlfor denne datasæt. GenererDatasets Xml vil lade dig prøve de forskellige&lt;såsServerType&gt; muligheder, indtil du finder den rigtige til en given server. Hvis du stadig har problemer, så lad mig vide det problem, du ser, og URL-adressen på serveren, og jeg vil forsøge at hjælpe.
    * EDDTableFraFileNames datasæt
Nogle attributter, der blev anbefaletaddAttributeser nu kildeAttributes. Du behøver sandsynligvis ikke at ændre noget for eksisterende datasæt i dine datadatasets.xml.
    * Bug fix relateret til visse anmodninger til EDDTableFraNcCFFiles datasets.
Jeg har også tilføjet et stort antal enhedstest til det eksisterende store antal enhedstest af de underliggende metoder (der er 100's scenarier) . Tak til Eli Hunter.
    * Bug fix / små ændringer tilEDDGridFraMergeIR.
Tak til Jonathan Lafite og Philippe Makowski
    * Bug fix:EDDGridFraErddap virker nu, selvom et fjerndatasæt ikke harioos\\_categoryvariable attributter.
Tak til Kevin O'Brien.
    * Bug fix i .graph webside forEDDGridDatasæt, når der kun er en akse variabel med mere end én værdi.
Tak til Charles Carleton.
    * Der var andre små forbedringer, ændringer og fejlrettelser.

## Version 1.60{#version-160} 
 (udgivet 2015-03-12) 

*    **Nye funktioner (for brugere) :** Ingen ingen ingen
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * STRONGLY RECOMMMENTD: Opdater din servers[robotter.txt](/docs/server-admin/additional-information#robotstxt)fil til at inkludere:
Ikke tilladt: /erddap / filer /
    * Jeg giver problemer og løsning:
På Linux-computere, hvis du bruger&lt;OpdaterEveryNMillis&gt; med datasæt med type=EDDGridFraFiles, EDDTableFraFiles,EDDGridKopier, EDDTableCopy eller deres underklasser, kan du se et problem, hvor et datasæt undlader at indlæse (lejlighedsvis eller konsekvent) med fejlmeddelelsen: "IOException: Brugergrænse af inotify tilfælde nåede eller for mange åbne filer". Hvis det er tilfældet, kan du løse dette problem ved at ringe (som rod) :
echo fs.inotify.max\\_user\\_watches=65536|T-shirts -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instances=1024|T-shirts -a /etc/sysctl.conf
sysctl -p
Eller brug højere tal, hvis problemet fortsætter. Standarden for ure er 8192. Standarden for forekomster er 128.\\[UPDATE: Der er en fejl iJavasom forårsager inotify forekomster til ikke at blive affald indsamlet. Dette problem undgås iERDDAP™v1.66 og højere. Så den bedre løsning er at skifte til den nyeste version afERDDAP.\\]
    * NoSuchFileException Fejl Fix:
Der var en fejl, der kunne forårsage datasæt af type=EDDGridFraFiles, EDDTableFraFiles,EDDGridKopier, EDDTableCopy, eller deres underklasser til ikke at indlæse lejlighedsvis med fejlen "NoSuchFileException: _someFileName_". Fejlen er relateret til brug af FileVisitor og blev introduceret iERDDAP™v1.56. Problemet er sjældent og er mest sandsynligt at påvirke datasæt med et stort antal ofte skiftende datafiler.
    * Der var nogle små forbedringer, ændringer og fejlrettelser.

## Version 1.58{#version-158} 
 (Udgivet 2015-02-25) 

*    **Nye funktioner (for brugere) :** 
    * Den nye["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)system lader dig gennemse et virtuelt filsystem og downloade kildedatafiler fra mangeERDDAP™Datasets. The The The The The The The"files"systemet er aktivt som standard, menERDDAP™Administratorer kan deaktivere det ved at sætte
```
        <filesActive>false</filesActive>  
```
i områdetERDDAP™setup.xml fil. Særligt takket være Philippe Makowski, der vare ved, da jeg var langsom til at sætte pris på skønheden i denne idé.
    * destination Maks. -- Tidligere havde tidsvariablen af EDDTable datasæt med nær realtidsdata en destinationMax af NaN, som under forudsætning af, at den maksimale tidsværdi for datasættet er nyere, men ikke præcist kendt og ændrer sig ofte. Nu har destinationMax en reel værdi, hvilket angiver den aktuelt kendte sidste gang. Mange datasæt har løbende opdateret data.ERDDAP™understøtter adgang til de seneste data, selv hvis det er efter den aktuelt kendte sidste gang. Bemærk, at den nye [&lt;OpdaterEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis) støtte iEDDGridFraFiles og EDDTable FraFiles-datasæt opdaterer tidsvariablens destinationMax. En anden konsekvens af denne ændring er, at dendatasetID= = = = =allDatasetsDatasæt indeholder nu den aktuelt kendte sidste gang i kolonnen maxTime. Tak til John Kerfoot.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * STRONGLY RECOMMMENTD: Opdater din servers[robotter.txt](/docs/server-admin/additional-information#robotstxt)fil til at inkludere:
Ikke tilladt: / filer /
Ikke tilladt: /erddap / filer /
    * Prøve prøvedatasets.xml-- Sidste år anbefalede vi flere fremragende datasæt i kysturenERDDAP™at du kunne tilføje til dinERDDAP™bare ved at tilføje et par linjer til dindatasets.xml. Hvis du har tilføjet de erdVH-datasæt, skal du skifte til de nyere tidsdatasæt:
        * Lav en kopi af alle de ærasdata og ændre kopieretdatasetID's from erdVH... at erdVH2... og ændre referencensourceUrlfra erdVH... til erdVH2....
        * Angiv den æra, der er gemt... datasæt til aktiv brug.
    * AlleEDDGridFraFiles og EDDTable FraFiles subclasses understøtter nu [&lt;tilgængeligViaFiles&gt;] (/docs / server-admin / Datasets#accessibleviafiles) at gøre kildedatafiler tilgængelige via den"files"systemer. Som standard er dette system slukket for hver datasæt. Du skal tilføje mærket for at aktivere det. Tak til Philippe Makowski.
    * AlleEDDGridFraFiles og EDDTable FraFiles subclasses understøtter nu [&lt;OpdaterEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis) . Som standard er dette system slukket for hver datasæt. Du skal tilføje mærket for at aktivere det. Tak til Dominic Fuller-Rowell og NGDC.
    * Den nye[EDDTableFraFileNames](/docs/server-admin/datasets#eddtablefromfilenames)oprette et datasæt fra oplysninger om en gruppe filer i serverens filsystem, men det tjener ikke data fra filerne. For eksempel er dette nyttigt til at distribuere samlinger af billedfiler, lydfiler, videofiler, ordbehandling filer og regneark filer. Dette arbejder hånd-in-hand med den nye["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)system, så brugerne kan downloade filerne. Særligt takket være Philippe Makowski, der vare ved, da jeg var langsom til at sætte pris på skønheden i denne idé.
    * Den nye[EDDGridFraEDDTable](/docs/server-admin/datasets#eddgridfromeddtable)lader dig konvertere en faneformet datasæt til et gitteret datasæt. Tak til Ocean Networks Canada.
    * Den nye[EDDGridFraMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)aggregerer data fra en gruppe af lokale FleIR.gzfiler.EDDGridFraMergeIRFiles har forskellen på at være den første del af kode bidraget tilERDDAP. Det blev gjort helt uden vores hjælp. Tre jubler og særlige tak til Jonathan Lafite og Philippe Makowski af R.Tech Engineering.
    * Der er en ny, valgfri opsætning.xml tag,&lt;enhedTestDataDir&gt;, som angiver mappen med enhedstest datafiler, der er tilgængelige via et nyt GitHub-lager:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). For eksempel:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Dette er ikke nyttigt endnu, men er en del af flytningen for at gøre så mange af enhedstestene runnable af andre mennesker som muligt. Tak til Terry Rankine.
    * Der var mange små forbedringer, ændringer og fejlrettelser.

## Version 1.56{#version-156} 
 (udgivet 2014-12-16) 

*    **Nye funktioner (for brugere) :**   (Ingen Ingen Ingen) 
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Du kender sandsynligvis allerede om[EDDGridFraErddap](/docs/server-admin/datasets#eddfromerddap)og og og[EDDTableFraErddap](/docs/server-admin/datasets#eddfromerddap)som lader dig linke til datasæt i andreERDDAPs og har dem vist i dinERDDAP. Brugeranmodninger om faktiske data fra disse datasæt bliver omdirigeret til kildenERDDAP™, så dataene ikke flyder gennem dit system eller bruger din båndbredde. Der er nu en stor liste over anbefalede datasæt i prøvendatasets.xmlI erddapContent.zip. At inkludere dem i dinERDDAP™, alt hvad du skal gøre er at kopiere og indsætte dem, du ønsker ind i dindatasets.xml. Tak til Conor Delaney.
    * Hvis du kompilererERDDAP™, du skal tilføje nogle nye . krukker til dine[klassesti - cp switch](/docs/contributing/programmer-guide#development-environment)for javac og java.
    * Den nye[EDDTableFraCassandra](/docs/server-admin/datasets#eddtablefromcassandra)håndterer data fra[Cassandra](https://cassandra.apache.org/). Tak til Ocean Networks Canada.
    * Den nye[EDDTableFra kolonnearAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)håndterer at få data fra ASCII datafiler med fast bredde kolonner. Tak til Philippe Makowski.
    * AlleEDDGridFraFiles og EDDTable FraFiles subclasses bruger nu en ny metode, FileVisitor (føjet tilJavai 1.7) at indsamle oplysninger om filerne. Dette kan ikke have gavn af den første samling af filoplysninger til et givent datasæt, men synes at have en enorm fordel for efterfølgende indsamlinger, hvis det sker hurtigt, mens OS stadig har informations cachen. Tak til NGDC.
        
Vi anbefaler stadig: Hvis et datasæt har et stort antal filer (f.eks. &gt;1.000) , operativsystemet (og dermedEDDGridFraFiles og EDDTableFraFiles) vil fungere meget mere effektivt, hvis du gemmer filerne i en række undermapper (om året, eller en måned for datasæt med meget hyppige filer) , så der aldrig er et stort antal filer i en given mappe.
        
    * Flere små forbedringer til EDDTableFraAsciiFiles.
    * Nogle forbedringer til EDDTableFraAsciiServiceNOS, især for at få nogle ekstra kolonner af information fra kilden. Tak til Lynn DeWitt.
    * Nogle små fejlrettelser relateret til ISO 19115, derERDDAP™genererer. Tak til Anna Milano.

## Version 1.54{#version-154} 
 (udgivet 2014-10-24) 

*    **Nye funktioner (for brugere) :** 
    * Nogle variabler arbejder nu med tiden på millimeters præcision, f.eks. 2014-10-24T16:41:22.485Z. Tak til Dominic Fuller-Rowell.
*    **Små ændringer/Bug Fixes:** 
    * Bug fix: med en bestemt kombination af omstændigheder,EDDGridFraNcFile datasets returnerede data ved nedsat præcision (f.eks. flydere i stedet for doubler) . Dette kunne kun påvirke dataværdier med &gt; 8 væsentlige figurer. Mine apologier. (Og det var en klassisk computer programmering fejl: en forkert figur.) Tak til Dominic Fuller-Rowell.
    * Mange små ændringer.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Griddap-datasæt understøtter nu timetamp aksevariabler og datavariabler (dvs. variabler med tidsværdier, men endestinationNameandet end"time") . Tak til Dominic Fuller-Rowell.
    *   ERDDAP™understøtter nu korrekt millisekundertime\\_precision"1970-01T00:00:00. tilsigtet quirk: når du skriver tider til menneskelige-orienterede filer (fx .csv,.tsv,.json,.xhtml) ,ERDDAP™Brug af de angivnetime\\_precisionhvis det indeholder sekunder og/eller decimal sekunder; ellers bruger den sekundertime\\_precision"1970-01T00:00:00Z" (for konsistens og bagud kompatibilitet) . Tak til Dominic Fuller-Rowell.
    *   EDDGridFraNcFiles understøtter nu læsning StringdataVariables.
    *   .ncfiler skrevet af gitterdap kan nu have StringdataVariables.
    * GenererDatasets Xml indeholder nu mere flush () opfordrer til at undgå problemet med oplysninger, der ikke skrives til filerne. Tak til Thierry Valero.
    * Dokumentationen for GenererDatasetsXml blev forbedret, især for at påpege, at -i-kontakten kun virker, hvis du angiver alle svarene på kommandolinjen (f.eks. script mode) . Og script tilstand forklares. Tak til Thierry Valero.
    *   ERDDAP™ikke længere tillader to variabler i et datasæt at have det sammesourceName. (Hvis nogen gjorde det før, det sandsynligvis førte til fejlmeddelelser.) Som før,ERDDAP™tillader ikke to variabler i et datasæt at have det sammedestinationName.

## Version 1.52{#version-152} 
 (udgivet 2014-10-03) 

*    **Nye funktioner:**   (Ingen ingen ingen) 
*    **Små ændringer/Bug Fixes:** 
    * Et andet andet andet (mindre mindre mindre) Ændring for at gøreERDDAP™hurtigere.
    * Forbedring til ISO 19115-filer genereret afERDDAP: tilføjet ny anbefalet&lt;gmd:protocol&gt; værdier (information, søgning,OPeNDAP:OPeNDAP,ERDDAP:griddap ogERDDAP:tabledap) inden for gåafstand&lt;gmd:CI\\_OnlineResource&gt;. Tak til Derrick Snowden og John Maurer.
    * Mange små ændringer.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Bug fix: GenererDatasetsXml.sh og DasDds.sh var ikke i erddap.war for 1.48 og 1.50. Nu er de. Tak til Thierry Valero.
    * Små ændringer til nogle hastighedstest i TestAll for at gøre dem mindre modtagelige for chancen. Tak til Terry Rankine.

## Version 1.50{#version-150} 
 (udgivet 2014-09) 

*    **Nye funktioner:**   (Ingen ingen ingen) 
*    **Små ændringer/Bug Fixes:** 
    * DetteERDDAP™bør være meget hurtigere end de seneste versioner.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:**   (Intet) 

## Version 1.48{#version-148} 
 (udgivet 2014-09-04) 

*    **Nye funktioner:** 
    *   ERDDAP™Opret nu altid et tabulært datasæt,datasetID= = = = =allDatasets, som har en tabel med oplysninger om alle datasæt i detteERDDAP. Det kan være rodet som enhver anden faneformet datasæt. Dette er et nyttigt alternativ til det nuværende system til at få oplysninger om datasets programmatisk.
    * Der er to nye output filtyper til EDDTable ogEDDGrid, .csv0 og.tsv0. De er komma- og tabsparate-værdifiler, der ikke har linjer med kolonnenavne eller enheder. Dataene starter på den første linje. De er især nyttige til scripts, der bare ønsker et stykke information fraERDDAP.
*    **Små ændringer/Bug Fixes:** 
    * Kort kan nu laves til længdegrader i området -720 til 720.
    * Den nye.ncml svar Filtype er tilgængelig for alleEDDGridDatasets. Det vender tilbage[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\-formateret beskrivelse af datasættet (svarende til en kombineret .dds + .das) .
    * Bug fix: Saving tabulære data til en.ncfilen var begrænset til 100.000 værdier pr. variabel. Nu er det kun begrænset til 2 GB total filstørrelse. Tak til Kevin O'Brien.
    * Bug fix: sparAsMatlabmetoder sikrer nu, atdatasetIDs konverteres til sikkerMatlabvariable navne. Men jeg anbefaler stadig stærkt, at du opretterdatasetIDs, der er gyldige variable navne: startende med et brev og derefter bare bruge A-Z, a-z, 0-9 og \\_. Se endnu[datasetID](/docs/server-admin/datasets#datasetid). Tak til Luke Campbell.
    * Bug fix i EDDTableFraDatabase: Med nogle typer databaser, en NO\\_ DATA-respons fra databasen førte til et punktløst 30 sekunds forsinkelse iERDDAP. Tak til Greg Williams.
    * Bug fix:EDDGridLav en graf med Graph Type = linjer (eller markører eller markører og linjer) tvunget x akse variabel til at være tid. Nu kan det være enhver akse. Tak til Lynn DeWitt.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * STRONGLY RECOMMMENTD: OpdateringJava  
Denne version afERDDAP™kræver behovJava7 eller højere, menJava7 vil nå sin slutdato i april 2015 (snart&#33;) , så nu er en god tid til at skifte tilJava8. SåJava8 er STRONGLY RECOMMMENTD. Jeg tester medJava8. Bemærk, atJava6 nåede sin slutdato i februar 2013 (ingen mere sikkerheds fejlrettelser&#33;) .
    * Opdatering af Tomcat
Hvis du bruger Tomcat, skal du skifte til den nyeste version af Tomcat. Tomcat 8 er designet til at arbejde medJava8.
    * " " " "ERDDAP" er ikke længere en akronym. Nu er det bare et navn. Jeg vil ikke have navnet til at fremhæveERD. Jeg ønskerERDDAP™at fremhæve din institution og dine data.
    * Afgiftspligt[Tilpas udseendet af dinERDDAP™installation for at fremhæve din institution og dine data](/docs/server-admin/deploy-install#customize). Med en times arbejde, kan du gøre gode forbedringer, der vil vare for evigt.
    * I opsætning.xml, te&lt;DisplayDiagnosticInfo&gt; mulighed er nu altid ignoreret og behandlet, da værdien var falsk.
Fjern markeringen i afkrydsningsfeltet&lt;VisDiagnosticInfo&gt; tag og relaterede oplysninger fra din opsætning.xml.
    * I opsætning.xml, standarden for&lt;drawLandMask&gt; var "over", men nu er det "under", som er en bedre generel standard (fungerer godt med alle datasæt) .
    * GenererDatasetsXml.sh og DadDds.sh Linux scripts bruger nu bash i stedet for csh, og har udvidelsen .sh. Tak til Emilio Mayorga
    * GenererDatasets Xml og DasDds skaber nu deres egne log filer (GenererDatasetsXml.log og DasDds.log) og output filer (GenererDatasetsXml.out og DadDds.out) i _bigParentDirectory_/logs/, og aldrig sætte deres resultater på klippebordet.
    * GenererDatasets Xml understøtter nu en -i kommandolinje parameter, der indsætter output i den angivne fil på et bestemt sted. Se billederne[dokumentationsdokumentation](/docs/server-admin/datasets#generatedatasetsxml). Tak til Terry Rankine.
    * EDDTableFraDatabase understøtter nu&lt;kolonnenavnQuotes&gt;&lt;/columnNameQuotes&gt;, med gyldige værdier " (Standard) , " eller intet. Denne figur (hvis nogen) vil blive brugt før og efter kolonnenavne i SQL-forespørgsler. Forskellige typer databaser, der er konfigureret på forskellige måder, vil have brug for forskellige kolonnenavnemærker.
    * Tabular breddegrad og længdevariabler kan nu have tilpassetlong\\_name's, f.eks. Profil Latitude. Tidligere kunne de kun være Latitude og længde.
    * Fra nu af skal du angive "standardDataQuery" og "defaultGraphQuery" som attributter i datasættets globale metadata (dvs.,&lt;addAtts&gt;), ikke som separate&lt;StandardDataQuery&gt; og&lt;StandardGraphQuery&gt; tags. (Selvom du stadig angiver dem via tags,ERDDAP™vil automatisk oprette globale attributter med oplysningerne.) 

## Version 1.46{#version-146} 
 (udgivet 2013-07-09) 

*    **Nye funktioner:** 
    *    (Ingen Ingen Ingen) 
*    **Små ændringer/Bug Fixes:** 
    * Bug fix: I EDDTableFraDatabase, i version 1.44 kun,ERDDAP™forkert citeret databases tabelnavn i SQL- udsagn. Det er nu fast. Tak til Kevin O'Brien.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    *    ** Hvis du ikke ændrer standardmeddelelserne i meddelelser.xml,
slette sletning\\[Tomcat\\]/content/erddap/messages.xml . **   
Standardbeskeder.xml-filen er nu i æraen. krig fil, ikke erddapContent.zip. Så skal du ikke længere opdatere meddelelser.xml .
    * Hvis du ændrer meddelelserne i meddelelser.xml, fra nu på, hver gang du opdatererERDDAP™, enten:
        * Foretag de samme ændringer, du har foretaget før til den nye
            \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Og denne gang: slette\\[Tomcat\\]/content/erddap/messages.xml .
        * Eller find ud af, hvad der har ændret sig i de nye beskeder.xml (via diff) , og rediger din
            \\[Tomcat\\]/content/erddap/messages.xml-fil i overensstemmelse hermed.

## Version 1.44{#version-144} 
 (udgivet 2013-05-30) 

*    **Nye funktioner:** 
    * Anvisninger til EDDTable datasæt nu support ogorderByMin kæreste (......) og &orderByMinMax (......)   (som returnerer to rækker i hver gruppe, med minimum og maksimum af de sidsteorderByværdiværdiværdiværdi) . Tak til Lynn DeWitt.
    * Der er to nyetabledapfiltyper:.ncCFHeader og.ncCFMAHeader (som returnerer ncdump-lignende header af den tilsvarende.ncCF og.ncCFMA filtyper) . Tak til Steve Hankin.
*    **Små ændringer/Bug Fixes:** 
    * Bug fix: indlæsning af .graph og .html websider for datasæt med masser af tid værdier var langsom, fordiERDDAP™var langsom, når du genererer tiden skyder muligheder. Nu er det altid hurtigt. Tak til Michael Barry, OOICI, og Kristian Sebastian Blalid.
    * Bug fix: I nogle EDDTable datasættyper håndteres tidsbegrænsningerne ikke altid korrekt. Nu er de. Tak til John Maurer og Kevin O'Brien.
    * Bug fix: datasets ville ikke indlæse, når alle afsubsetVariablesvar fast værdivariabler. Nu vil de. Tak til Lynn DeWittt og John Peterson.
    * IMPROVED: nu, alle forespørgsler til bare subset variabler fungerer som om &distinct () er en del af forespørgselen.
    * IMPROVED: nu, for forespørgsler, der omfatter &.jsonp=_funktionnavn_, _funktion Navn_ SKAL nu være en serie af 1 eller mere (Periodepareret) ord. Hvert ord skal starte med et ISO 8859-brev eller "\\_" og følges af 0 eller flere ISO 8859 breve, cifre eller "\\_". Ja, det er mere restriktiv endJavaScripts krav til funktionsnavne.
    * Tidens akse på grafer virker nu godt i længere tid spænder (80 - 10000 år) og kortere tidsintervaller (0.003 - 180 sekunder) .
    *   ERDDAP™er nu mere tilgivende, når der er tale om variationer af ISO-8601-format tidsdata.
    * Der var mange andre små ændringer og fejlrettelser.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    *    **Du skal opdatere til den nyeste version for at være sikker.**   
        ERDDAP™Gennemgik en sikkerhedsrevision. Der var nogle fejl og svagheder. Version 1.44 indeholder flere vigtige sikkerheds fejlrettelser og flere ændringer for at øge sikkerhed og tilgængelighed (f.eks. til synshæmmede brugere) . Version 1.44 har bestået opfølgningssikkerhedsrevisionen. Takket være alle de gode mennesker på USGS og Acunetix, der gjorde dette muligt. (Bør ikkeNOAAGør dette?) 
    * Den nye[EDDTableFraWFSFiler](/docs/server-admin/datasets#eddtablefromwfsfiles)gør en lokal kopi af alle data fra enArcGISMapServerWFSserver og så dataene kan derefter genbehandles hurtigt tilERDDAP™Brugere. Tak til Christy Caudill.
    * Den nye[EDDTableFraEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)lader dig oprette en EDDTable datasæt fra enEDDGridDatasæt. Nogle almindelige årsager til at gøre dette er:
        * Dette gør det muligt for datasættet at blive queried medOPeNDAPudvælgelsesbegrænsninger (som en bruger kan have anmodet) .
        * Datasættet er iboende et tabulært datasæt. Tak til OOICI, Jim Potemra, Roy Mendelssohn.
    * Det variable navn "dybde" er nu et særligt alternativ til "altitude". Enhederne skal være en variant af "metre". Dataværdierne skal være positive=down.ERDDAP™er nu fuldt bevidst om betydningen af "dybde" og understøtter det, hvor højden understøttes (f.eks. som en komponent i en CF DSG-cdm\\_data\\_type=profildatasæt) . Et datasæt må ikke have både "dybde" og "altitude" variabler.
    * I din indbakkedatasets.xml, fjerne enhver brug af&lt;ont navn Hangingcdm\\_altitude\\_proxywp dybde&lt;/att&gt; siden dybde er nu et særligt alternativ til højde, og så behøver ikke at være specielt identificeret.
    * I din indbakkedatasets.xml, fjerne enhver brug af&lt;højdeMetersPerSourceUnit&gt;, bortset fra EDDTable Fra Fra Fra Fra Fra FraSOS.
Når værdien er 1, skal du bare slette det.
Når værdien er -1, skal du overveje at ændre det variable navn til dybde.
Til andre værdier, tilføj til&lt;addAttributes&gt; f.eks.:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Alle datasæt understøtter nu
        
        *   &lt;StandardDataQuery&gt;, som bruges, hvis .html anmodes om uden forespørgsel.
            * Du vil sandsynligvis sjældent nødt til at bruge dette.
            * For gitterdatasæt, en fælles brug af dette er at angive en anden standarddybde eller højde dimensionværdi (fx,\\[0\\]i stedet for\\[sidst\\]) .
I alle tilfælde bør du altid liste alle variablerne, altid bruge de samme dimensionværdier for alle variabler, og næsten altid bruge\\[0\\],\\[sidst\\]eller\\[0:last\\]for dimensionværdierne.
For eksempel:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * For For For For FortabledapDatasets, den mest almindelige brug af dette er at angive en anden standard tidszone (i forhold til nu, f.eks. &time&gt;=now-1 dag) .
Husk at anmode om ingen datavariabler er det samme som at angive alle datavariabler, så normalt kan du bare angive den nye tidsbegrænsning.
For eksempel:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;StandardGraphQuery&gt;, som bruges, hvis .graph anmodes uden forespørgsel.
            * Du vil sandsynligvis sjældent nødt til at bruge dette.
            * For gitterdatasæt, den mest almindelige brug af dette er at angive en anden standarddybde eller højde dimensionværdi (fx,\\[0\\]i stedet for\\[sidst\\]) og/eller for at angive, at en bestemt variabel grafes.
I alle tilfælde vil du næsten altid bruge\\[0\\],\\[sidst\\]eller\\[0:last\\]for dimensionværdierne.
For eksempel:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * For For For For Fortabledapdatasæt, den mest almindelige brug af dette er at angive forskellige variabler, der skal grafes, en anden standard tidszone (i forhold til nu, f.eks. &time&gt;=now-1 dag) og/eller forskellige standardgrafikindstillinger (f.eks. mærketype) .
For eksempel:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Husk, at du har brug for XML-encode eller procent-encode (enten en, men ikke begge) standardforespørgsler, da de er i et XML-dokument. For eksempel, og bliver &amp;amp; ,&lt;blive &amp;lt; , og &gt; bliver &amp;gt; .
Og tjek venligst dit arbejde. Det er nemt at lave en fejl og ikke få hvad du ønsker.
Takket være Charles Carleton, Kevin O'Brien, Luke Campbell og andre.
    *   EDDGridFraDap,EDDGridFra Erddap, og EDDTableFraEDDGridhar et nyt system til at håndtere datasæt, der ændrer sig ofte (så ofte som omtrent hver 0,5 s) . I modsætning tilERDDAP's regelmæssige, proaktive system til fuldstændig at indlæse hver datasæt, dette valgfrie ekstra system er reaktiv (udløst af en brugerkonto) og trintal (bare opdatere de oplysninger, der skal opdateres) . For eksempel, hvis en anmodning til enEDDGridFraDap datasæt sker mere end det angivne antal millisekunder siden den sidste opdatering,ERDDAP™vil se, om der er nye værdier for den venstre største (normalt"time") dimension og, hvis det er tilfældet, skal du blot downloade de nye værdier, før du håndterer brugerens anmodning. Dette system er meget godt til at holde en hurtig ændring af datasæt up-to-date med minimale krav på datakilden, men på bekostning af lidt langsommere behandling af nogle brugeranmodninger. Se [&lt;OpdaterEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis)   
Tak til Michael Barry og OOICI.
    *   EDDGridFraNcFiles, EDDTableFraNcFiles og EDDTableFraNcCFFiles nu støtte[NcML.ncml](/docs/server-admin/datasets#ncml-files)kildefiler på plads af.ncfiler. Tak til Jose B Rodriguez Rueda.
    * For For For For ForEDDGridAggregateExistingDimension,ERDDAP™understøtter en ny serverType-dejdsindex" mulighed for serverenType- attributten af&lt;sourceUrls&gt; tag. Dette virker med websider, der har lister over filer inden for&lt;pre&gt;&lt;/pre&gt; og ofte under enOPeNDAPlogo. Et eksempel er[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * Til EDDTableFraSOSunderstøtter nu et valgfrit tag
```  
        <sosServerType>_serverType_</sosServerType>  
```
så du kan angive typen afSOSserver (så så sådanERDDAP™behøver ikke at finde det ud) . Gyldige værdier af&lt;_serverType_\\&gt; er IOOS\\_NDBC, IOOS\\_NOS,OOSTethysog WHOI (en ny understøttet server Type Type Type Type) . Se endnu[EDDTableFraSOS](/docs/server-admin/datasets#eddtablefromsos). Tak til Derrick Snowden og Janet Fredericks.
    * AlleEDDGridFra...Files, EDDTableFra...Files,EDDGridKopier og EDDTable Copy understøtter nu et valgfrit tag
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
som kan fortælleERDDAP™for at holde filen Tabelbord (med oplysninger om hver kildedatafil) i hukommelse i stedet for bare på disken (Standard) . At holde filenTable i hukommelseshastigheder op anmodninger om data (især hvis der er &gt;1000 kildedatafiler) , men bruger mere hukommelse. Hvis du indstiller dette til at tro for alle datasæt, skal du holde øje med hukommelsen: i øjeblikket ved hjælp af linje på _yourDomain_/erddap/status.htmlfor at sikre, atERDDAP™stadig har masser af gratis hukommelse. Tak til Fredrik Stray.
    * EDDTableFraASCIIFiles understøtter nu&lt;charset&gt;. De to mest almindelige charsets (Tilfælde følsom&#33;) er ISO-8859-1 (Standard) og UTF-8.
    * Anbefalet: i opsætning.xml, inden&lt;startHeadHtml&gt;, skal du ændre&lt;html&gt; ind i
        &lt;html langhed (eller en anden[sprogkode](https://www.w3schools.com/tags/ref_language_codes.asp)hvis du har oversat meddelelser.xml) .
    * setup.xml har nye valgfrie tags til at deaktivere dele afERDDAP:
        *   &lt;OmformereActive&gt;false&lt;Afgræns søgning&lt;&#33;-- standarden er ægte --&gt;
        *   &lt;Klik her for at få flere oplysninger.&lt;/slideSorterActive&gt;&lt;&#33;-- standarden er ægte --&gt;
        *   &lt;wmsActive&gt;false&lt;Egenskaber for /wmsActive&gt;&lt;&#33;- standarden er sand --&gt;I almindelighed, anbefaler vi mod at indstille nogen af disse til falsk.
    * GenererDatasets Xml skriver nu resultater for _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, ikke log.txt. Tak til Kristian Sebastian Blalid.
    * GenererDatasets Xml gør nu et godt forslag til det&lt;reload EveryNMinutes&gt;. Tak tilNOAAUAF projekt.
    * Mange små forbedringer til GenererDatasetsXml. Tak tilNOAAUAF projekt.

## Version 1.42{#version-142} 
 (udgivet 2012-11-26) 

*    **Nye funktioner:** 
    *    (Ingen store nye funktioner.) 
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Hvis du opgraderer fraERDDAP™1.38 eller 1.40 var der ingen ændringer, der kræver, at du ændrer dine konfigurationsfiler (men du skal bruge de nye beskeder.xml-fil) .
    *   ERDDAP™igen kan køre medJava1.6. (ERDDAP™v1.40 påkrævetJava1.7.) Vi anbefaler stadig stærkt at bruge den nyeste version afJava1.7.
    * En ny datasæt type,[EDDTableFra Billeder af AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), kan læse data fra et sæt Automatisk Vejrstation (AWS) XML-datafiler. Tak til Lynn Dewitt og Exploratorium.
*    **Små ændringer/Bug Fixes:** 
    * Justeret til ændringer i NDBCSOSkildedataservere.
    * Justerede ændringer i NOS COOPS ASCII-tjenesterne.
    * Lavet flere små ændringer og fejlrettelser.

## Version 1.40{#version-140} 
 (udgivet 2012-10-25) 

*    **Nye funktioner:** 
    * Der er et nyt output filformat tiltabledapDatasæt:.ncCFMA, som gemmer de ønskede data i en.ncfil, der overholder CF[Diskret Sampling Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Multidimensionelle Array muligheder, og som derfor overholder NODC-skabelonerne\\[2021: nu[NCEI-skabeloner](https://www.ncei.noaa.gov/netcdf-templates)\\]til opbevaring af denne type data. Tak til NODC.
    *   tabledapanmodninger kan nu inkludere tidsbegrænsninger som &time&gt;now-5 dage. Se billederne[dokumentationsdokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Tak til James Gosling.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Hvis du opgraderer fraERDDAP™1.38, der var ingen ændringer, der kræver, at du ændrer dine konfigurationsfiler (men du skal bruge de nye beskeder.xml-fil) .
    *   ERDDAP™offentlige udgivelser og interne milepæle er tilgængelige via[ERDDAP™på GitHub](https://github.com/ERDDAP). Du kan finde flere oplysninger i afsnittet[Wikimedia Commons](https://github.com/ERDDAP/erddap/wiki)for teERDDAP™projekt samt mere generel[ERDDAP™Programmeringsguide](/docs/contributing/programmer-guide). (Dette blev annonceret separat et par uger efterERDDAP™1.38 udgivelse.) 
    * GenererDatasets Xml er blevet forbedret.
        * Scriptet blev revideret, så det skal fungere korrekt på alle Linux-computere (Ikke bare et par) .
        * Det tilføjer nucreator\\_name,creator\\_email, ogcreator\\_urlnår det er muligt.
        * Mange andre små forbedringer.
    * Raffineret hvordanERDDAP™tilbud med tiden.
        * Indvendigt,ERDDAP™håndterer nu tiderne på millimeters præcision (Ikke sekunder) .
        * Du kan nu angive tidspræcisionen for et bestemt datasæt, se[time\\_precision](/docs/server-admin/datasets#time_precision). Du kan f.eks. indstille et datasæt til at vise tidsværdier med datopræcision (fx 1970-01-01) .
        * Dine nuværende datasæt vil bruge standardindstillingerne, så de er upåvirket af disse ændringer og vil fortsætte med at vise tid med sekunder præcision. Tak til Servet Cizmeli og Philip Goldstein.
    *   [EDDTableFraNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)er en ny datasæt type, som du kan bruge i dindatasets.xmlfil. Det kan læse data fra alle de mange filformater, der er defineret af[CF Diskret Sampling Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konventioner. Takket være NODC og særligt takket være Kyle Wilcox til at lave prøvefiler til det store antal gyldige DSG-filformater og til at gøre dem offentligt tilgængelige.
*    **Små ændringer/Bug Fixes:** 
    * Udvidet[hurtigstart](#quick-restart)system til alle relevanteEDDGridog EDDTable underklasser.
    * Forbedret dokumentation, især relateret til, hvordan du bruger[gitteretap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)og og og[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)fra forskellige klient software.
    * Ændret avanceret søgning for at støtte minTime og/eller maxTime udtrykt som epochSeconds. Tak til Lynn Dewitt.
    * Ændret.htmlTableoutput for at vise urls og e-mail adresser som links.
    * Tilføjet "releret og "rev Vimeo til relevant&lt;Udvidet&gt; tags. Tak til Pat Cappelaere fra denOGC RESTprojekt.
    * Forbedret beskyttelse mod urealistisk store dataanmodninger, navnlig inden fortabledap, hvor det er et sværere problem.
    * Flyttet flere meddelelser til meddelelser.xml.
    * Lavet hastighedsforbedringer.
    * Rettet fastEDDGridFraFiles til at tillade faldende sortere akser. Tak til Maricel Etchegaray.
    * Fjernede referencer til iGoogle, da det vil blive afbrudt.
    * Lavet flere små ændringer og fejlrettelser.

## Version 1.38{#version-138} 
 (udgivet 2012-04-21) 

*    **Nye funktioner:** 
    * ISO 19115 og FGDC --ERDDAP™kan automatisk generere ISO 19115 og FGDC XML metadata filer for hver datasæt. Links til filerne er synlige på hver liste af datasæt (f.eks. fra fuld tekst Søg) og også i webkompatible mapper (WAF)   (Se det her[I nærheden af FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)og og og[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Takket være Ted Habermann, Dave Neufeld og mange andre.
    * Fuld Text Searches for Datasets understøtter nu \\-_excludedWord_ og \\-"_ekskluderet sætning_" . Tak til Rich Signell.
    * Søgning efter datasæt returnerer nu en side på et tidspunkt. Standarden bruger parameterstrengen: side=&itemsPerPage=1000, men du kan ændre værdierne i URL-adressen på din anmodning. Takket være Steve Hankin og UAF-projektet.
    *   OpenSearch--ERDDAP™understøtter nu[OpenSearch1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)standard for søgning efter datasæt. Blandt andre ting, dette giver katalog aggregation websteder til at udføre distribuerede søgninger (Planlæg en søgeanmodning til hvert katalog, som det ved om) .
    * Comma Separated Værdiværdi (CSV CSV CSV) Filer --ERDDAP™genererer nu CSV-filer med blot en koma mellem værdier (som Excel foretrækker) , i stedet for koma+space. Tak til Jeff deLaBeaujardiere.
    * Million datasæt -- Flere ændringer blev foretaget for at støtteERDDAPs med et stort antal datasæt, måske endda en million. Takket være Steve Hankin og UAF-projektet.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
#### Hurtig genstart{#quick-restart} 
*   [A A A A A A](#quick-restart)hurtig genstart system giverERDDAP™at genstarte meget hurtigere.
     **Tilføje denne til din opsætning.xml fil** lige efter&lt;/ DatasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Fuldtekstsøgning af datasæt kan nu udføres med Lucene søgemaskine (Selvom vi anbefaler den originale søgemaskine, hvis du har færre end 10.000 datasæt) eller det oprindelige søgesystem.
         **Tilføje denne til din opsætning.xml fil** lige efter&lt;/displayDiagnosticInfo&gt;:
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

    * I opsætning.xml, kan du /should nu tilføje to nye kategorier til den komma-separatede liste af&lt;categoryAttributes&gt;:
        * globale:keywords (tilføje det lige efter global: Institution) -- en ny speciel sag, der parses en koma-separat liste af søgeord fra den globale søgeord egenskab for at gøre en separat indgang for hvert søgeord.
        * variabel variabel variabel variabel Navn (tilføje det i slutningen) -- en ny speciel sag, der kategorierer hver afdataVariable destinationNames.
    * I setup.xml, kan du (men hvorfor?) fortælleERDDAP™ikke at tilbyde FGDC og/eller ISO 19115 metadata til datasæt, herunder
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Standardværdierne for disse indstillinger er sande.
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml, skal du overveje at forbedre metadata for dine datasæt.ERDDAP™Nu genererer automatisk ISO 19115 og FGDC XML metadatafiler for hver datasæt baseret på datasættets metadata.
Så, **God datasæt metadata fører til gode datasætERDDAP-genererede ISO 19115 og FGDC metadata.**   
         **Se den nye dokumentation for de mange nye RECOMMMENTD[Globale bidrag](/docs/server-admin/datasets#global-attributes).** 
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml, hvis du vil fortælleERDDAP™at bruge en præfabrikeret FGDC og/eller ISO 19115-fil, der er et sted på serverens filsystem i stedet for at haveERDDAP™generere disse filer, brug:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Hvis _FilefullFilename_\\microsoft" eller filen ikke findes, vil datasættet ikke have nogen FGDC og/eller ISO 19115 metadata. Så dette er også nyttigt, hvis du ønsker at undertrykke FGDC og/eller ISO 19115 metadata for et bestemt datasæt.
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml, for alleEDDGridSideBySide ogEDDGridAggregateExistingDimension datasæt, sikre, at barns datasæt har forskelligedatasetIDs end deres forældredatasæt og end de andre børn. (Du kan f.eks. følge George Foremans enkle, men effektive system til at navngive sine børn.) Hvis nogen navne i en familie er præcis det samme, vil datasættet undlade at indlæse (med fejlmeddelelsen, at værdierne af den samlede akse ikke er i sorteret rækkefølge) .
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml, der var nogle ændringer på listen over gyldigeioos\\_categorymetadataværdier:
        * "pCO2" blev ændret til "CO2".
        * "Physical Oceanography" blev tilføjet.
        * "Soils" blev tilføjet.
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml,ERDDAP™Ikke længere tillader '.' i endatasetID. Det var tilladt, men diskotek. (Beklager) 
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml, opsætningen for EDDTableFraThreddsFiles og EDDTableFraHyraxFiler har ændret sig lidt, fordi begge klasser bare blev omskrevet for at være mere effektiv (begge klasser gør altid en lokal kopi af alle fjerndatafiler) . Se dokumentationen for at opsætte disse klasser:[EDDTableFraHyraxFiler](/docs/server-admin/datasets#eddtablefromhyraxfiles)og og og[EDDTableFraThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Se især de reviderede kommentarer om&lt;filDir&gt; (nu irrelevant) og og og&lt;sourceUrl&gt; &gt; &gt; &gt; (Nu afgørende betydning) . Desuden bør du aldrig pakke denne klasse i EDDTableCopy for effektivitet.
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml, hvis du bruger EDDTableFraDatabase med enOracledatabase, skal du inkludere en forbindelse Ejendom såsom
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
for at angive, hvor mange rækker data der skal hentes på én gang, fordi standarden er 10, som er horibly ineffektiv. Se billederne[Oracledokumentationsdokumentation](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql og PostgreSQL synes at have bedre standarder for denne indstilling. Tak til Kevin O'Brien.
    * Hvis du bruger EDDTableFraDatabase, kan du se den forbedrede["Speed" dokumentation](/docs/server-admin/datasets#eddtablefromdatabase)for yderligere forslag til at forbedre ydeevnen. Tak til Kevin O'Brien.
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml, for alle EDDTable... datasæt, i konventionen ogMetadata\\_Conventionsglobale attributter, henvises til CF-1.6 (ikke CF-1.0, 1.1, 1,2, 1.3, 1.4 eller 1,5) , da CF-1.6 er den første version til at inkludere ændringerne relateret til Discrete Sampling Geometry.
    * Programmer, der kompilerer deERDDAP™kode skal tilføje lib/lucene-core.jar til listen over krukker i deres javac og java kommandolinje stier.
    *   ERDDAP™har en[Ny service](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)at konvertere et CF Standardnavn til/fra et GCMD Science-ord. Du kan finde denne nyttige ved at generere globale søgeords metadata til datasæt i dine dataERDDAP.
    * Deal med Bots -- Læs denne vejledning[forhindre bots i at kravle dinERDDAP™på en dum måde](/docs/server-admin/additional-information#robotstxt).
    * Oversættelse -- Teksten påERDDAP's websider er nu for det meste i meddelelser.xml og så velegnet til oversættelse til forskellige sprog (f.eks. tysk, fransk) . Beskederne bruger nu ofte MessageFormat til formatering, også til at hjælpe med at lave oversættelser. Hvis du er interesseret i at gøre en oversættelse, bedes du sende en e-mailerd dot data at noaa dot gov.
    * Prøve prøvedatasets.xml-- Der var flere små, men betydelige fejl i prøvendatasets.xml. Hvis du bruger disse datasæt, kan du få de nyere versioner fra den nye prøvedatasets.xmli den nye tidsalderddapContent.zipfil. Tak til James Wilkinson.
    * Git -- Jeg vil forsøge svært at gøreERDDAP™Et GitHub projekt ASAP efter denne udgivelse.
*    **Små ændringer/Bug Fixes:** 
    * En ny palet, OceanDepth, er nyttig for dybdeværdier (positivt er ned) f.eks. 0 (Lavt lav) til 8000 (dybt dybt dybt) .
    * The The The The The The The.kmloutput fratabledapbruger et bedre mærkeikon (det er ikke fuzzy) . Og svæve over en markør gør det større.
    * EDDTableFraFiles -- I den sidste opgradering, det nye netcdf-java bibliotek havde strammere restriktioner for variable navne i.ncfiler. Det forårsagede problemer for EDDTableFraFiles, hvis en variabelssourceNamehavde visse tegnsætningstegn. EDDTableFraFiles er nu modificeret for at undgå dette problem. Tak til Thomas Holcomb.
    * Siden .subset understøtter nu 0/10/100/1000/10000/100000 i stedet for et afkrydsningsfelt til Relaterede data. Værktøjstip advarer, at 100000 kan forårsage din browser til at gå ned. Tak til Annette DesRochers, Richard (Abe Abe) Coughlin, og IOOS Biological Project.
    * .../erddap/info/infodatasetID_/index.html websider viser nu urls og e-mailadresser som klikbare links. Tak til Richard (Abe Abe) Coughlin og IOOS Biological Project.
    * Bug fix: Itabledap, til datasæt med højde MetersPerSourceUnit&lt;0, forespørgsler med højdebegrænsninger blev håndteret forkert. Tak til Kyle Wilcox.
    * Bug fix:EDDGridAggregateFraExistingDimension understøtter nu flere forskellige TDS-URL'er. Tak til ?

## Version 1.36{#version-136} 
 (udgivet 2011-08-01) 

*    **Nye funktioner:** 
    * Ingen væsentlige ændringer fra en brugers standpoint.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * PmelTao-datasættet, der ofte blev brugt som prøvedatasæt for prøvedatasættettabledap  
dokumentation er ikke længere tilgængelig.ERDDAP™Administratorer skal foretage disse ændringer:
        * I din indbakkedatasets.xml, hvis du har endatasetIDDatasæt, add
aktiv plovfalse" lige før ↓" i slutningen af denne linje.
        * I din opsætning.xml, hvis din&lt;EDDTableIExample&gt; er pmelTao, så:
            * Hvis du vildatasets.xmlhar ikke et datasæt meddatasetIDTilføj til kurv
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * I din opsætning.xml skal du udskifte alle tags fra&lt;EDDTableIExample&gt; gennem gennem gennem
                &lt;EDDTabelMatlabOversættelse af PlotExample&gt; med med
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
                
    * For datasæt, hvor typen er en underklasse af EDDTableFraFiles, kan du nu foretage data fra metadata.
Du kan nu gøre en variabel fra værdien af en egenskab af en af de oprindelige variabler.
For eksempel idatasets.xml, inden for en&lt;dataVariable&gt; tag, hvis du bruger
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™vil gøre en variabel med værdierne for PI- attributten af cruise variabel.
Tak til WOD.
*    **Ændringer:** 
    * Små ændringer

## Version 1.34{#version-134} 
 (udgivet 2011-06-15) 

*    **Ændringer:** 
    * Bug fix: Fastgjort en hukommelse lækage, der fandt sted på nogle 64-bitJavainstallationer.
    * Bug fix:ERDDAP™Nu sætter disse globale attributter, når breddegradens dimensions værdier spænder fra høj til lav: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernmost\\_Northing, Northernmost\\_Northing.
        
Bemærk, atactual\\_rangeer uændret: Det kan have lave, høje værdier eller høje,lave værdier, da det er beregnet til at angive rækkevidden og rækkefølgen af opbevaring.
        
    * Små ændringer.
    *   ERDDAP™Administratorer behøver ikke at foretage ændringer i deres opsætning.xml ellerdatasets.xml.

## Version 1.32{#version-132} 
 (udgivet 2011-05-20) 

*    **Ændringer:** 
    * Støtte til den nyligt ratificerede, CF Discrete Sampling Geometries (som desværre endnu ikke er tilgængelig online) , som erstatter de foreslåede CF Point observationskonventioner.
        ERDDAP™Brugere vil se, at CDm\\_feature\\_type=Station erstattes af TimeSeries, og der er små ændringer i de filer, der er oprettet for de.ncCF-filtype (flad \\_dimension kaldes nu prøve\\_dimension) .
        ERDDAP™Administratorer skal foretage disse ændringer idatasets.xml:
        * CDm\\_data\\_type=Station skal ændres til cdm\\_data\\_type=TimeSeries.
        * CDm\\_data\\_type=Profile skal ændres til cdm\\_data\\_type=TimeSeriesProfil.
        * CDm\\_station\\_variables skal ændres til CDm\\_timeseries\\_variables.
        * cf\\_role=station\\_id skal ændres til cf\\_role=timeseries\\_id.
    * Nyt nytioos\\_categorymuligheder: "Farvede Økologisk Matter", "pCO2", "Stream Flow", "Total Suspended Matter".
    * Mulig løsning til en mulig hukommelseslækage på 64-bitJava.\\[Det virkede ikke.\\]
    * Små ændringer.

## Version 1.30{#version-130} 
 (udgivet 2011-04-29) 

*    **Nye funktioner:** 
    * Understøttelse af 64-bitJava. Hvornår bruges med 64 bitJava,ERDDAP™kan nu bruge meget mere heap hukommelse og håndtere mange flere samtidige anmodninger.
    * Support til support.ncfilanmodninger op til 2 GB (selv uden 64-bitJava) via bedre brug afERDDAPHåndtering af data i bidder.
    * Mange 2X hastighedsforbedringer i koden og 2X-hastigheder op fraJava1.6 gørERDDAP™2X til 4X hurtigere end før.
    * Hukommelsesbesparelser betydeligt lavereERDDAP's grundlæggende hukommelse forbrug.
    * Til tabulære datasæt,ERDDAP™er nu fuldt bevidst om en datasæts cdm\\_data\\_type, og hvordan datakortet til CDM-typen. Se billederne[CF Diskret Sampling Geometries specifikation](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Måske en dag snart, vil Word-filen blive konverteret til .html og erstatte den nuværende "OBSOLETE" information på denne webside. Tak tilNOAAUAF projekt.
    * Til de fleste EDDTable datasæt, en ny output filtype mulighed,.ncCF, skaber Contiguous Ragged Array.ncfiler, der overholder den nyeste version af den[CF Diskret Sampling Geometries konventioner](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Disse filer er struktureret til at reflektere cdM-datatypen af datasættet. Da de foreslåede konventioner lige har ændret sig, som denne skrivning, understøtter netcdf-java biblioteket endnu ikke at læse de filformater, der er oprettet afERDDAPog fortolke dem som CDM-datafiler. Det vil sandsynligvis snart. Tak tilNOAAUAF projekt.
    * Visningen af data på .subset-siden er nu en rulleliste, der lader brugerne angive det maksimale antal rækker af forskellige data, der skal ses (Standard = 1000) . Denne ændring og andre, tilladeERDDAP™at arbejde med datasæt, der har meget store antal rækker af forskellige data. (Antallet af unikke værdier for enhver enkelt variabel er stadig et problem, men det kan være temmelig høj (20.000?) før .subset og andre websider belastning virkelig langsomt.) Tak til detNOAAUAF projekt.
    * .subset websider har en ny mulighed: Se Distinct Data Counts. Tak til GTOPP projektet.
    * For at hjælpe brugere, de forskellige værdier (f.eks. station navne) vises nu på Make-A-Graph og Data Access Forms. Tak tilNOAAUAF projekt.
    * .transparent Png ønsker nu støtte alle former for diagrammer og data repræsentationer. Det trækker kun data -- ingen akser, legender, jordmask eller noget andet. Det gør det muligt at lave billeder som lag af transparentPngs. Hvis &.size=_bredde_|_height_ er angivet i forespørgsel (anbefalet anbefalet) , det er æret. Standarden er 360x360 pixels. Den eneste undtagelse erEDDGrid&.draw=surface, hvor standarden (som før) er et billede med ~1/pixel pr. data point (op til 3000 x og y pixel) . Tak til Fred Hochstaedter.
    * The The The The The The TheWMSwebsider viser nu farvelinjen for datasættets variable (s s s) . Tak til Emilio Mayorga og andre.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Denne udgivelse indebærer en masse ændringer. De er alle vigtige. Vær tålmodig og arbejde gennem alle de ændringer, der er nævnt nedenfor.
    * Denne version bliver skubbet ud tidligere end beregnet til at håndtere nogleJavasikkerhedsfejl. Desværre, flere funktioner/fixes beregnet til detteERDDAP™Version er ikke i denne version. Desværre. Forhåbentlig vil den næste version være relativt snart (og meget nemmere at opgradere til) .
    * For at undgå flere sikkerhedsfejl iJava6 opdatering 23 og nedenfor, download og installer den nyeste version afJava  (Java6 opdatering 24 eller højere) . Hvis du har et 64-bit operativsystem, kan du få en 64-bit version afJava.
    * Hvis du bruger Tomcat 5, skal du opgradere til Tomcat 6 eller 7 (foretrukket foretrukne) . Hvis du bruger Tomcat 6, skal du overveje opgradering til Tomcat version 7.
    * Følg alle anvisningerne for[opsætning af en nyERDDAP™](/docs/server-admin/deploy-install), men hvor relevant, vil du kopiere filer fra din gamle installation til den nye installation, især den\\[Tomcat\\]/content/erddap mappe og filer. Som en del af dette, skal du bemærke, at[Nye Tomcat setup anbefalinger](/docs/server-admin/deploy-install#tomcat).
    * Den standard erddap.css er nu inkluderet i filen erddap.war.
        * For at bruge standarden erddap.css, **slette sletning** din gamle\\[Tomcat\\]/content/erddap/images/erddap.css .
        * Hvis du har ændret\\[Tomcat\\]/content/erddap/images/erddap.css, og ønsker at fortsætte med at bruge det: bare forlade det på plads og erstatte den&lt;Indholdsfortegnelse med:
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

    * I din indbakke\\[Tomcat\\]/content/erddap/setup.xml:
        * Udskift kommentarer og tags relateret til&lt;partielRequestMaxBytes&gt; og&lt;Oversættelse af partRequestMaxCells&gt; med med
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
        * Udskift kommentarer relateret til&lt;categoryAttributes&gt; og overveje at ændre mærkets værdi:
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

Individuelt individuelt&lt;categoryAttributes&gt; der er globale attributter nu skal identificeres via den præfiks globale: (f.eks. globalt: Institution) . Andre attributter antages at være variable attributter (fx,standard\\_name) . Også institutionens værdier (de eneste) blev efterladt i det originale tilfælde. Nu er alle kategoriværdier konverteret til lavere kuffert.
    * I din indbakke\\[Tomcat\\]/indhold / indhold /datasets.xml:
        * Big IMPROVED:ERDDAP™har nye krav relateret til en faneformet datasæts cdm\\_data\\_type. Sandsynligvis skal hvert datasæt have de korrekte metadata og variabler relateret til cdm\\_data\\_type. Hvis ikke, vil datasættet ikke indlæse og vil smide en fejl. Se dokumentationen for[CDm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type).
        * FYI: Der er en ny datasæt type: EDDTableFraAsciiServiceNOS.
        * FYI: Der er tre nyligt tilladtioos\\_categorymuligheder: Hydrologi, kvalitet (f.eks. til kvalitetsflag) , og statistik (f.eks. betyder det) .
        * Til EDDTableFra... Filer datasæt, fjerne enhver&lt;nDimensions&gt; tags. De er ikke længere nødvendige eller brugt.
        * Til variabler meddestinationName= Højde,ERDDAP™ikke længere kræfterlong\\_nameat være Højde. Gå venligst gennem dine hænderdatasets.xmlog gentagne gange søg efter&lt;destinationName&gt;altitude og tilføje til den variables&lt;addAttributes&gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (eller en lidt anderledeslong\\_namei særlige tilfælde) .
        * Valgfrit: Alle EDDTableFraFiles subclasses understøtter variable[sourceName= globalisering:...](/docs/server-admin/datasets#global-sourcenames)til at konvertere globale metadata fra hver fil til en datavariabel. Tak til Lynn DeWitt.
    * EDDTableFraDatabase-brugere --ERDDAP™leveres med en ny JDBC 4 driver til Postgres. For andre databaser, skal du kontrollere internettet for den seneste JDBC .jar fil for din database. SidenERDDAP™bruger nu nuJava1.6+, JDBC 4 (ikke 3) anbefales sandsynligvis.
    * FYI
        *   EDDGridFra...Filer og EDDTable Fra... Filer datasæt gemmer nu filTable information i
            \\[bigParentDirectory\\]/ Datasæt Info/info\\[datasetID\\]/ \\*.ncfiler.
Desuden gemmer EDDTable datasæt nu subset-oplysningerne i
            \\[bigParentDirectory\\]/ Datasæt Info/info\\[datasetID\\]/ \\*.ncfiler. Disse filer, der bruges til at være
            \\[bigParentDirectory\\]/ Datasæt Info/info\\[datasetID\\].\\*.jsonfiler.
De gamle filer slettes automatisk, nårERDDAP™starter op. Eller du kan slette alle filer (men lad de tomme undermapper) i in in in in\\[bigParentDirectory\\]/ DatasetInfo/.
        * Jeg arbejdede på en ny EDDTableFraNcCFFiles, som ville læse data fra lokale og fjerntliggende filer ved hjælp af de foreslåede, nye CF Point observationskonventioner. Men det er ikke i denne udgivelse. Der er problemer i netcdf-java-bibliotekerne relateret til nogle metoder til at læse disse filer. Og der var nogle meget nylige ændringer i de foreslåede CF Point Observationskonventioner. Når netcdf-java biblioteket er rettet og opdateret til det seneste forslag, vil jeg fortsætte med at arbejde på dette.
        * LøbERDDAP™på Windows kan have problemer: muligvis kan du se i Windows\\[bigParentDirectory/logs/log.txt-filen, derERDDAP™er nogle gange i stand til at slette og/eller omdøbe filer hurtigt. Dette skyldes antivirus software (f.eks. fra McAfee og Norton) som kontrollerer filerne til virus. Hvis du kører ind i dette problem (som kan ses af fejlmeddelelser i log.txt-filen som "Unable at slette...") , ændring af antivirussoftwarens indstillinger kan delvist lindre problemet.
Hvis det er tilfældetERDDAP™I Windows er bare en test, der kører på skrivebordet, det er bare en irritation.
Hvis det er tilfældetERDDAP™i Windows er din offentligeERDDAP™, overveje at skifte til en Linux-server.
    * Slow First Startup -- Den første gang du kørerERDDAP™efter opgradering,ERDDAP™kan være langsom til at indlæse datasæt. VejenERDDAP™lagre oplysninger om aggregerede filer har ændret sig, såERDDAP™skal læse nogle oplysninger fra alle disse filer. Det vil tage tid.
    * Fejl ved opstart -- I betragtning af ændringerne i forbindelse med cdm\\_data\\_type, er det sandsynligt, at nogle af dine datasæt ikke indlæse og vil smide fejl. Læs omhyggeligt den daglige rapport e-mail, somERDDAP™sender dig, nårERDDAP™er færdig med at starte op. Det vil have en liste over datasæt, der ikke indlæsede (på toppen) og grunden til, at de ikke indlæsede (tæt på bunden) .
    * Hvis du sidder fast eller har andre spørgsmål, kan du sende oplysninger til mig:erd.data at noaa.gov.
    * Programmer -- Hvis du skriverJavaProgrammer, der kørerERDDAP™kode, skal du ændre nogle af kommandolinjen parameter referencer:
        * Change joda-time-1.6.2.jar til joda-time. krukke
        * Ændre postgres JDBC .jar reference til postgresql.jdbc.jar
*    **Små ændringer og fejl Fixes:** 
    
    * Forbedret tilslutningshåndtering for at undgå hængte tråde.
    * Forbedret concurrency praksis til at håndtere næsten samtidige identiske anmodninger mere effektivt.
    *   ERDDAP™nu bruger netcdfAll-4.2.jar (Omdøbt til netcdfAll-latest. krukke) . Denne switch necessiterede flere interne ændringer og forårsagede et par små eksterne ændringer, f.eks. ændringer til, hvordan grib filer læses og små ændringer i de.ncSideudgang.
    * Ny funktion:\\[Erddap\\]/konvert/fipscounty.html konverterersFIPStællelige koder til/fra tællenavne.
    * På kort er statsgrænser nu mørke violet, så de skiller sig ud bedre ud på alle baggrundsfarver.
    * Tabular.kmloutput igen bruger et cirkelikon til at markere point (Ikke flyveikonet Google skiftede for nylig til) .
    * De erdCalcofi-datasæt var bagudrettede og er nu serveret fra lokale filer (hurtigere hurtigere hurtigere) .
    * GenererDatasets Xml fra Thredds Katalog skaber nu en resultatfil:
        \\[Tomcat\\]/webapps/erddap/WEB-INF/temp/EDDGridFraThreddsCatalog.xml . Tak til Kevin O'Brien.
    * GenererDatasets Xml fra Thredds Katalog nu forsøger at fjerne unødvendige portnumre fra kildewebsidens (f.eks. :8080 og :8081 kan undertiden fjernes) . Tak tilNOAAcentralts sikkerhedsteam.
    * For .subset websider har Map of Distinct Data nu en variabel lat lon rækkevidde.
    * Flere lister iERDDAP™  (f.eks. tabellen, der viser alle datasæt) sorteret så at A..Z sorteret før en..z. Nu sorteres de i en tilfælde-infølsom måde.
    * Små ændringer i .subset websider, herunder: enheder er nu angivet.
    * GenererDatasets Xml og DasDds ikke længere smide en undtagelse, hvis de ikke kan sætte resultaterne på systemklipsholderen eller displayInBrowser. Tak til Eric Bridger og Greg Williams.
    * Bug fix: Når datasæt er indlæst,ERDDAP™fjerner nu eller justerer de geospatiale globale attributter. Tak til Charles Carleton.
    * Bug fix: String2.getClassPath () nu korrekt procent-decodes klassen Vejvej (Især på Windows optrådte rum i filnavnet som %20) . Dette påvirkedeERDDAP™EDStatic kalder SSR.getContextDirectory () og find indhold/erddap. Tak til Abe Coughlin.
    * Bug fix: i EDDTableFraFiles relateret til fåDataForDapQuery håndtering af særskilt () anmodninger. Tak til Eric Bridger.
    * Bug fix:tabledapanmodninger håndterede ikke ordentligt højdebegrænsninger, når datasættets højde MetersPerSourceUnit var -1. Tak til Eric Bridger.
    * Bug fix: EDDTableFra... Filer datasæt nu korrekt håndtere anmodninger, der omfatter =NaN og &#33;=NaN.
    
## Version 1.28{#version-128} 
 (udgivet 2010-08-27) 

*    **Nye funktioner:** Ingen.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** Ingen.
*    **Fejl Fix:** Fix en programmering fejl (kun i ver 1.26) det gjordeERDDAP™meget langsom.
     

## Version 1.2{#version-126} 
 (udgivet 2010-08-25) 

*    **Nye funktioner:** Ingen.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** 
    * Fra din\\[Tomcat\\]/content/erddap/setup.xml,
        * I nærheden af In In In In In In In In In In In In In In&lt;Juridisk&gt;, på en ny linje nedenfor\\[standard standard standard DataLicenses\\], indsætte\\[Standard Kontakt\\].\\[Standard Kontakt\\]henviser til&lt;AdminEmail&gt; angivet højere op i opsætning.xml.
        * Fjern Fjern Fjern Fjern&lt;TabelCommonBGColor&gt; og&lt;Tabel HighlightBGColor&gt;.
        * Anbefalet: Ændre ændringer&lt;AfslutBodyHtml&gt; til
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

    * Nødvendigt: Til din\\[Tomcat\\]/content/erddap/images/erddap.css og erddapAlt.css, tilføje i bunden:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Bug Fixes og små ændringer:** 
    
    * Bug fix: i nogle situationer, formularer virkede ikke i nogle versioner af Internet Explorer. Tak meget til Greg Williams.
    * Bug fix: Lav A Graph-knapper virkede ikke, hvis datasættet var fra en fjernbetjeningERDDAP.
    * Bug fix:WMSnogle gange fungerede ikke, hvis datasættet var fra en fjernERDDAP.
    * Mange små ændringer og fejlrettelser.
    

## Version 1.24{#version-124} 
 (udgivet 2010-08) 

*    **Nye funktioner:** 
    * Nyt nyt[Subset websider](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)Brug facetslebet søgning til at vælge undersæt af tabulære datasæt. Tak til POST.
    * Nyt nyt[Avanceret søgning](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)kombinerer alle de andre søgemuligheder og tilføjer længde, bredde og tid bundet kasser. Tak til Ellyn Montgomery. (Desværre for forsinkelsen.) 
    * Nyt nyt[Konverter tid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)webside og service lader dig konvertere numeriske tider til/fra ISO strenge gange.
    * Nyt nyt[Konverter enheder](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)webside og service lader dig konvertereUDUNITStil/fra UCUM-enheder. Tak tilNOAAIOOSSOS.
    * Hvis du viltabledapanmodning omfatter &units ("UCUM") , enhedsnavnene vil blive konverteret fra oprindelige navne (normaltUDUNITS) til at til[UCUM](https://unitsofmeasure.org/ucum.html)Enheder navne. Dette påvirker kun enheder\\*navnenavne\\*, ikke dataværdier. Tak tilNOAAIOOSSOS.
    * Forbedrer til Make A Graph websider og grafer og kort:
        * Hvis grafen er et kort, er der nye Make A Graph knapper til at zoome ind/out og en ny mulighed for at klikke for at ændre kortets center punkt. Tak til POST.
        * Filterindstillinger tilføjet nær bunden. Tak til Greg Williams.
        * De indbyggede kystdatafiler blev opdateret til GSHHS v2.0. Tak til POST.
        * Kort indeholder nu søer og floder. Tak til POST. (Desværre mangler Sacramento River Delta, fordi hverken kystdataene eller søen/river datasættet omhandler det.) 
        * Den indbyggede pscoast-deledte lande/state-filer blev opdateret. Tak til POST.
        * Topografi.cpt blev ændret lidt. (Desværre, hvis dette negativt påvirker dig.) Tak til POST.
        * I gitterdap's Make A Graph, hvis en bruger ændrer en variabel, bliver formularen automatisk gensubmitteret, så formularen automatisk genindføresaxisVariables' showStartAndStop afspejler altid grafvariabler. Tak til Joaquin Trinanes.
        * Til png og pdf billedadresser:
            * Ny &.land=_værdi_, hvor _value_ kan være "under" (Vis topografi) eller "over" (Vis bare badymetry) . Hvis ikke er angivet, er standarden indstillet af[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)i in in in indatasets.xmleller opsætning.xml. Tak til POST.
            * Ny: linjer i legenden, der er for lang, opdeles automatisk i flere linjer. Tak til POST.
        * Til png billedadresser:
            * Ny &.legend=_værdi_, hvor _value_ kan være "Bottom" (standard) , "Off" eller "kun". Dette lader dig inkludere legenden, udelukke legenden, eller få kun legenden. Tak til Cara Wilson.
            * Nyt &.trim=_n Sticker_ efterlader en kant af nPixels (f.eks. 10) nederst på billedet. Det anvendes efter .legend=Off. Tak til Cara Wilson.
            * Nyt &.size=_bredde_|_height_ lader dig angive bredden og højden for billedet, i pixels.
    * Nye output filformater:
        * .csvp og.tsvp - ligesom .csv og.tsv, men med " (_enheder_) " føjet til kolonnenavne på den første linje.
        * .odvTxt -- gør en .txt-fil, der forenkler at få data til[Oplysninger om Ocean Udsigt til udsigt (ODV) ](https://odv.awi.de/).
        * .esriCsv -- gør en .csv-fil egnet til import i ESRI'sArcGIS. (Ændrede datasæt kun) Tak til Jan Mason, Jeff de La Beaujardiere ogNOAAIOOSSOSprojekt.
    * GUI forbedringer til de[Categorize](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)websider. Også de kategorize værdier (andre end institution) er nu alle mindre. Ikke-sænke anmodninger accepteres (omdirigeret) for baglæns kompatibilitet. Tak til Roy Mendelssohn.
    * Fejlmeddelelser er nu endnu kortere og mere orienteret for brugerne. Tak til Greg Williams.
    * En intern ændring, som i høj grad reducererERDDAP's grundlæggende hukommelse forbrug.
    * Mange nye funktioner, som kun er relevante for POST-projektet.
*    **Ting, tingERDDAP™Administratorer har brug for at vide og gøre:** Der er masser af ændringer. Desværre. Men hver bringer nogle gode fordele.
    * Store ændringer i GenererDatasetXml - det spørger nu ofte flere spørgsmål (se det relevante[Datasæt Typer](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)Oplysninger om information) og nu genererer altid hovedsageligt klar til brug af indhold tildatasets.xml. Du er stadig ansvarlig for opsætningen, så du stadig bør gennemgå konfigurationen.datasets.xmlindhold, før du bruger det. En menneskelig indsats i projektet vil altid gøre bedre end et computerprogram. Tak til UAF-projektet.
    * REQUIRED: I opsætning.xml skal du revidereWMSsektion. Det skal nu inkludere disse tags (men føler sig fri til at ændre værdierne) :
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

    * REQUIRED: I opsætning.xml, kopiere og indsætte denne nye foreslåede&lt;StartHeadHtml&gt; for at erstatte din gamle version. Men føl dig velkommen til at foretage ændringer for dine præferencer.
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

Tak til POST, Hans Vedo og Rick Blair.
    * REQUIRED: I opsætning.xml, i&lt;StartBodyHtml&gt;, ændre ændringen&lt;krop&gt; tag til at være bare&lt;krop&gt;, da stilen nu er sat af erddap.css.
    * REQUIRED: I opsætning.xml, ændre til dette&lt;AfslutBodyHtml&gt; (men ændre e-mailadressen til din e-mailadresse og er velkommen til at foretage andre ændringer) :
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

    * HighLY RECOMMMENTD: I setup.xml, den anbefalede&lt;ShortDescriptionHtml&gt; er nu
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

Du er velkommen til at ændre dette, især den sidste sætning i første afsnit.
    * I opsætning.xml, e-mailEverythingTo og e-mailDailyReport For at kunne nu være komma-separatede lister over e-mail adresser. Den første mailEverything For at være specielt, f.eks. abonnementer på EDDXxxxFraErddap-datasæt bruger den e-mailadresse. Tak til John Maurer.
    * Email fejl er nu logget ind\\[bigParentDirectory\\]/logs/emailLogYYYY-MM-DD.txt-filen.
    * I setup.xml, er der en ny, valgfri parameter til at indstille e-mail-konto egenskaber (normalt lige efter&lt;EmailPassword&gt;):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Standarden er intet. Tak til Rich Signell.
    * REQUIRED: Hvis du bruger EDDTableCopy ellerEDDGridKopier, du skal DELETE alle\\[bigParentDirectory\\]/copy / mapper og filer, der indeholder "xh" i mappen eller filnavne efter at stoppe den gamleERDDAP™og før du starter den nyeERDDAP™så disse filer vil blive re-copied. Jeg er meget ked af, men det var vigtigt at foretage ændringen og forhåbentlig påvirker det få administratorer og få filer.
I Linux, kan du finde disse filer med, cd\\[bigParentDirectory\\]/copy
Find .\\*xh\\*  
I Windows kan du finde disse filer med, Start|Søg Søg Søg
Hvad vil du søge efter: Dokumenter
Alle eller dele af filnavnet: xh
Kig i: Gennemse -&gt;\\[bigParentDirectory\\]/copy
Klik på 'Søg'
^A for at vælge dem alle
Del at slette dem alle
    * REQUIRED: Idatasets.xml, for EDDTableFraDatabase-datasæt, for dato og tidsstempelvariabler, ændre data Type til dobbelt og enhederne til sekunder siden 1970-01T00:00:00Z. Vi REQUIRE, at du lagrer timetamp data i databasen\\*med med\\*en tidszone. Uden tidszone oplysninger, de forespørgsler, derERDDAP™sender til databasen og de resultater, somERDDAP™Fås fra databasen via JDBC er utvetydig og er sandsynligvis forkert. Vi forsøgte, men fandt ingen pålidelig måde at håndtere "timestamp uden tidszone" data. Vi tror, det er god praksis alligevel. Efter alt, "timestamp uden tidszone" data har en underforstået tidszone. Mens det er fantastisk, at tidszonen er indlysende for databaseadministratoren, giver det mening at angive det eksplicit, så andre software kan korrekt interagere med din database. Tak/sorry Michael Urzen.
    * Høj kvalitet: Indatasets.xml, for at aktivere .subset websider for facetteret søgning af dine faneformede datasæt, skal du tilføje [&lt;subsetVariables&gt;] (/docs/server-admin/datasæt #subsetvariables) til datasættets globale attributter.
    * RECOMMMENTD: Indatasets.xml, hvis du har datasættet meddatasetID◆pmelGtsppp", skal du ændre det for at være
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * RECOMMMENTD: Indatasets.xml, der er nye gyldige muligheder for [&lt;CDm\\_data\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) global egenskab, så du bør gennemgå/ændre værdien for dine datasæt.
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml, den nye [&lt;KildeNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin / Datasets#sourceneedsexpandedfp_eq) er nyttigt, hvis kildeserveren ikke konsekvent håndterer &_variable_\\=_value_ test korrekt (på grund af[generel vanskelighed for at teste ligheden af flydende punktnumre](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . KildeNeedsExpandedFP\\_EQ er indstillet til at tro som standard (den sikreste indstilling) , så du ikke behøver at foretage ændringer.
    * Nyt nyt[EDDTableFraAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Tak til Jerry Yun Pan.
    * Nyt nyt[EDDTableFraThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Tak til Roy Mendelssohn.
    * Ændringer til[EDDTableFraNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)lader det bruges med en bredere vifte af filer.
    * EDDTableFraBMDE er blevet deaktiveret. Der er ikke længere nogen aktiv, passende datakilder.
    * I GenererDatasetXml, den nyeEDDGridFromThredds Katalog høster en hel THREDDS katalog (eller et undersæt) og generererdatasets.xmlindhold. Tak til UAF-projektet.
    * GenererDatasets Xml og DasDds nu også sætte deres resultater i\\[bigParentDirectory\\]/logs/log.txt. Tak til Rich Signell og Charles Carleton.
    * Mange forbedringer af loginsystemet. Tak til POST.
*    **Ting, tingERDDAP™Programmer Har du brug for at vide og gøre:** 
    * Der er blevet ændringer i /WEB-INF/lib/mappen. Skift dine javac- og java classpath-indstillinger i overensstemmelse hermed.
    * Der er en ny\\[Dit din egen Url\\]/erddap/version tjeneste til at bestemme versionen af enERDDAP. Svaret er tekst, f.eks.ERDDAP\\_version =.24 Hvis du får en HTTP 404 Not-Found-fejlmeddelelse, skal du behandleERDDAP™som version 1.22 eller lavere. Tak til POST.
*    **Små ændringer og fejl Fixes:** 
    
    * EDDTableFra Ændringer:
        * droppet støtte til læsning IOOSSOSXML svar.
        * Tilføjet understøttelse af læsning IOOSSOStekst/csv. (Så NOSSOSservere understøttes ikke.) 
        * Lavet masser af ændringer relateret til IOOSSOSserver detaljer.
        * Tilføjet understøttelse af BBOX forespørgsler til IOOSSOSog og ogOOSTethys SOSservere. Disse ændringer resulterer i en stor hastighed op for relevante dataanmodninger. Tak til IOOSSOS.
    * Tekst i tekst.mattabulære datafiler gemmes nu korrekt. Tak til Roy Mendelssohn.
    *   WMS
        *   OpenLayerser nu bundtet medERDDAP™til brug påWMSwebsider. Dette løser problemet forårsaget, nårOpenLayersændrede et par måneder siden og forhindrer fremtidige problemer.
        * In te In te In te In teWMS GetCapabilitiessvar,&lt;OnlineResource&gt; Værdien er nu URL'en forWMSService. Tak til Charlton Galvarino.
        * En legende vises påWMSwebside for at vise farvelinjen. Tak til Emilio Mayorga.
    *   EDDGridAggregateExistingDimension konstruereren havde problemer, hvis en akses kilde Værdier var ikke lig deres destination Værdier, f.eks. hvis kildetid var noget andet end"seconds since 1970-01-01". Tak tilToddSpindler.
    * I TableWriterGeoJson, overskydende ',' efter bbox\\[......\\]er blevet fjernet. Tak til Greg Williams.
    * Mange små ændringer og fejlrettelser.
    
## Version 1.22{#version-122} 
 (udgivet 2009-07-05) 

* SlideSorter fejl introduceret i 1.20 er rettet.
* OBIS fejl indført i 1.20 er rettet.
* Henvisningerne til Jason-datasæt på billederne/gadgets/GoogleGadgets-siden blev fjernet.
     
## Version 1.20{#version-120} 
 (udgivet 2009-07-02) 

*   ERDDAP™administratorer, bedes du tilføje dette til din setup.xml fil:
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

* Nye datasættyper[EDDGridKopiere Kopier](/docs/server-admin/datasets#eddgridcopy)og og og[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)foretage og vedligeholde en lokal kopi af en andenEDDGrideller EDDTable datasæts data og tjener data fra den lokale kopi. Disse er meget let at bruge og meget effektiv **løsninger til nogle af de største problemer med at betjene data fra fjerndatakilder:** 
    
    * Adgang af data fra en fjern datakilde kan være langsom (af en række grunde) .
    * Fjerndatasættet er undertiden utilgængelig (igen, af en række grunde) .
    * Omliggende på én kilde til dataene ikke skaleres godt (f.eks. når mange brugere og mange mange brugereERDDAPs udnytte det) .
    
Plus, den lokale kopi er en sikkerhedskopi af den oprindelige, som er nyttig i tilfælde af noget sker til originalen.
    
Der er ikke noget nyt om at lave en lokal kopi af et datasæt. Hvad er nyt her er, at disse klasser gør det\\*nemt og nemt\\*at oprette og oprette\\*opretholde vedligehold\\*en lokal kopi af data fra en\\*sort\\*af typer fjerndatakilder og\\*Tilføje metadata\\*mens du kopierer dataene.
    
Disse datasæt typer er en del af et komplet sæt funktioner, der forenkler oprettelse af[gitter / clusters/federationer afERDDAPs s s](/docs/server-admin/scaling)at håndtere meget tunge belastninger (f.eks. i et datacenter) .
    
* Ny datasæt type[EDDTableFraDatabase](/docs/server-admin/datasets#eddtablefromdatabase)Få data fra en lokal eller fjern databasetabel.
*   ERDDAP™Nu har du en[sikkerhed](/docs/server-admin/additional-information#security)system, der understøtter godkendelse (at lade brugerne logge ind) og godkendelse (give dem adgang til visse private datasæt) .
* Der er der[to, nye, kommandolinjeværktøjer](/docs/server-admin/datasets#tools)for at hjælpeERDDAP™Administratorer genererer XML for et nyt datasæt idatasets.xml:
    * GenererDatasets Xml kan generere et groft udkast til datasæt XML for næsten enhver type datasæt.
    * DasDds hjælper dig gentagne gange med at teste og tilpasse XML til et datasæt.ERDDAP's GenererDatasets Xml websider er fjernet. Af sikkerhedsmæssige årsager understøtter de kun et par datasæt typer. De nye kommandolinjeværktøjer er en bedre løsning.
* Den nye[Statusside](/docs/server-admin/additional-information#status-page)lader alle (Men især administratorer) Se status for enERDDAP™fra enhver browser ved at gå til\\[baseUrl\\]/erddap/status.html.
* Tabeldap understøtter nu[server-sidefunktioner](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * & detinkt () fjerner dublerede rækker fra reaktionstabellen,
    * & & &orderBy (......) lader dig angive, hvordan responstabellen skal sorteres,
    * & & &orderByMax (......) Du kan angive, hvordan svartabellen skal sorteres og fjerne alle rækker undtagen for rækker med de maksimale værdier i den sidste angivne kolonne. Dette kan f.eks. bruges til at få de sidste tilgængelige data til hver station.
* Tabulære datasæt kan nu indeholde ekstra datoTime variabler, som ikke er navngivet"time". Disse variable anerkendes af deres "enheder" metadata, som skal indeholde" since "  (for numeriske dato Times Times Times) eller "yy" eller "YY" (for formateret streng datoTimes) . Men brug stadigdestinationName "time"for den vigtigste dato Tidsvariable.
*   ERDDAP™genererer nu en[sitemap.xml](/docs/server-admin/additional-information#sitemapxml)fil, som fortæller søgemaskiner, at dinERDDAPbehøver kun at blive crawlet hver måned.ERDDAP™Administratorer, skal du følge[disse instruktioner](/docs/server-admin/additional-information#sitemapxml)at underrette søgemaskinerne om den nye sitemap.xml-fil.
*   ERDDAP's fejlmeddelelser er nu meget kortere og gearet til klienter (ikke programmører) . Tak til Greg Williams.
* [ []&lt;Anmod om Blacklist&gt;] (/docs/server-admin/datasets#requestblacklist) Nu understøtter også IP-adresser, hvor det sidste nummer er blevet erstattet af \\*.
* Anmodninger om.jsonog .geoJson filer kan nu indeholde en valgfri[jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)anmodning ved at tilføje "&.jsonp=_funktionName_" til slutningen af forespørgslen. Dybest set, dette bare fortællerERDDAP™Sådan tilføjes "_funktionName_ (" til begyndelsen af svaret og ") " til slutningen af svaret. Hvis der oprindeligt ikke var nogen forespørgsel, skal du forlade "&" i din forespørgsel. Tak til Greg Williams.
* Masser af nye statistikker blev føjet til[Daglig rapport](/docs/server-admin/additional-information#daily-report).
* På websider med lister over datasæt, institution og id er nu til højre. Dette flytter abonnement og andre mere nyttige kolonner til at se på smalle computerskærme.
* På alle websider, sidens titel (baseret på siden)&lt;Titel&gt; i titlen&lt;StartHeadHtml&gt;, at du definerer i setup.xml) ændres for at inkludere en bedre beskrivelse af hjemmesiden (f.eks. ved at inkludere den aktuelle datasæts titel og institution) .
* Xmx information er nu inkluderet i hukommelsesoplysningerne trykt i log.txt, Daily Report og på status.html. Tak til Ellyn Montgomery.
*   ERDDAP™har yderligere generel beskyttelse mod alle fejl (f.eks., OutOfMemory fejl) . Tak til Charles Carleton.
* Forbedringer til fejlhåndtering, hvis svaret allerede er begået.
* IMPROVED: EDDTableFraFiles ogEDDGridFraFiles nu bare tillade&lt;metadataFra&gt; først eller sidste. penultimate understøttes ikke længere. Og først og sidste er nu baseret på filernes sidsteModifiedTime.
* Bug fix: i EDDTableFraSOS, ugyldige oplysninger for en station kastede en undtagelse og forårsagede hele datasættet at blive afvist. Nu ignoreres disse stationer bare (og fejlmeddelelsen er logget på log.txt) . Tak til Rick Blair.
     

## Version 1.18{#version-118} 
 (udgivet 2009-04-08) 

* Bug fix: Starting i 1.14, EDDTable Data Access Form og Make A Graph-webside ikke korrekt beskæftige sig med citerede begrænsninger.
* Bug fix: Starting i 1.14, EDDTableFraDapSequence håndterede ikke tidsbegrænsninger korrekt, hvis kildetidens enheder ikke var "andre end 1970-01T00:00:00".
     

## Version 1.16{#version-116} 
 (udgivet 2009-03-26) 

*   ERDDAP™Administratorer:
    * Dette er en vigtig udgivelse, fordi det løser en fejl, der forlod enERDDAP™trådløb, hvis du brugte Tomcat Manager til Stop/Start eller ReloadERDDAP. Så når du installerer 1.16, behøver du ikke bare bruge Tomcat manager til at undeploy den gamleERDDAP™og udrulle den nyeERDDAP. I stedet: **Uagt den gamleERDDAP™Genstart Tomcat (eller serveren) , derefter udrulle den nyeERDDAP.** Det er altid en god ide at gøre det, når du installerer en ny version.
    * Tilføj venligst [&lt;Anmod om Blacklist&gt;&lt;/requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) til dindatasets.xml. Dette kan bruges til at angive en liste over klient IP-adresser, der skal blokeres (f.eks. at fend off a Denial of Service angreb eller en mere zealøs webrobot) .
* Der er nu en\\[bigParentDirectory\\]/logs-mappen for at holde styr påERDDAP™log filer. Når du starterERDDAP™, det gør en arkiv kopi af log.txt og log. txt.tidligere filer med et tidsstempel. Hvis der var problemer før genstart, kan det være nyttigt at analysere disse filer.
*   ERD'sERDDAP™Nu har abonnementssystemet slået til.
*   ERDDAP™igen tillader igen (men stadig ikke anbefaler) "%26" kodning af "&" på anmodning webadresser (Se det her[relateret v1.14 ændring](#percent26)) .
* Flere nye tilføjelser til Tally-afsnittet[Daglig rapport](/docs/server-admin/additional-information#daily-report).
* Små fejlrettelser i generereDatasetsXml.
* Et par små fejlrettelser.
     

## Version 1.14{#version-114} 
 (udgivet 2009-03-17) 

* Ændringer for brugere:
    * I gitterdataanmodninger,ERDDAP™understøtter nu:[sidste-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)hvor n er et taltal af indekser og[ (sidst-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)hvor d er en numeriske værdi (i tide, det er på få sekunder) .
    * Under tabulerede dataanmodninger kræver strenge begrænsninger nu behov[Dobbelte tilbud](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)omkring værdien, for eksempel &idONICNDBC40121" Dette kræves afDAPprotokol.
    * I tabulerede dataanmodninger,ERDDAP™kræver nu, at[alle begrænsninger er korrekt procentkodet](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Browserer gør dette automatisk, så dette for det meste påvirker computerprogrammer/scripts, der er adgang tilERDDAP.
#### Percent26{#percent26} 
*   [Tidligere,](#percent26)te te te te[Integrer en graf webside](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)og[ERDDAP™Google Gadget webside](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)"&" i billedets URL med "%26". Fra nu af skal du erstatte "&" i billedets URL med "&amp;". Så du skal udskifte nogen "%26" i eksisterende websider og Google Gadgets med "&amp;". (Beklager) 
*   ERDDAP™Administratorer, venligst:
    * Tilføj følgende til din[opsætning.xml](/docs/server-admin/deploy-install#setupxml)filfil (og ændre flaget Nøglenøgleværdi) :
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

    * På linjen efter&lt;EmailBrugernavn&gt; i din[opsætning.xml](/docs/server-admin/deploy-install#setupxml)fil, tilføjelse
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
Indtast din rigtige adgangskode.
    * Du kan ændre&lt;wmsSampleBBox&gt; i din[opsætning.xml](/docs/server-admin/deploy-install#setupxml)fil for at inkludere længdeværdier op til 360, f.eks.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * I din indbakkedatasets.xmlfil, omdøb datasæt type EDDTableFraNc4DFiles til EDDTableFraNcFiles (som nu understøtter filer med alle dimensioner) . Hvis du havde en EDDTableFraNc4DFiles datasæt:
        
        1. Du skal ændre til at skrive NaughtyEDDTableFraNcFiles" i dine datasæt. XML-fil.
        2. Du skal tilføje en&lt;I nærheden af nDimensions&gt; 4 4&lt;/nDimensions&gt; tag til datasættets XML.
        3. Du kan tilføje den nye&lt;sortereFilesBySourceNames&gt; tag for at angive den interne ordre for filerne, som bestemmer den samlede rækkefølge af de data, der returneres.
        
For detaljer, se[EDDTableFraFiles](/docs/server-admin/datasets#eddtablefromfiles).
    * I fortiden, for EDDTableFraDapSequence, forOPeNDAPDRDS-servere, idatasets.xml, vi brugte&lt;kildeKanConstrainStringeRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. Men vi ser nu, at DRDS regex-understøttelse er mere begrænset endERDDAP's, så vi anbefaler&lt;KildeKanConstrainStringeRegex&gt;&lt;/sourceCanConstrainStringRegex&gt;, så regex begrænsninger ikke passer til kilden, men håndteres i stedet afERDDAP.
    * Repræmpet håndtering af kildeCanConstrain... i in in in indatasets.xmlaf by[EDDTableFraDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence)og og og (internt internt internt) alle EDDTable datasæt typer. Det nye system er enklere og bedre afspejler manglende evne til forskellige datakilder. Du skal muligvis ændre XML for dine datasæt idatasets.xml.
* Der er flere nye funktioner, der er nyttige af sig selv, men når kombineret, også lette skabelsen af[gitter / clusters/federationer afERDDAPs s s](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Nye datasæt typer:
        *   [EDDGridFraErddap](/docs/server-admin/datasets#eddfromerddap)og og og[EDDTableFraErddap](/docs/server-admin/datasets#eddfromerddap)som lader enERDDAP™inkludere et datasæt fra en andenERDDAP™på en meget enkel og meget effektiv måde.
        *   [EDDGridFraFiles](/docs/server-admin/datasets#eddgridfromfiles)  (og dens underklasse,[EDDGridFraNcFiles](/docs/server-admin/datasets#eddgridfromncfiles)som kan læseNetCDF .nc, GRIB .grb, ogHDF .hdffiler filer filer) .
        *   [EDDTableFraNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)som kan læseNetCDF .ncsom har en tabellignende struktur.
    * RunLoadDatasets og LoadDatasets blev moderniseret, så atERDDAP™er meget lydhør for at indlæse datasets baseret på filer i filerne[flag flag flag flag](/docs/server-admin/additional-information#flag)Katalog (often&lt;5 sekunder, hvis hovedbelastningDatasets i øjeblikket er færdig.
    * Ny service til at tillade[en URL til at oprette en flagfil](/docs/server-admin/additional-information#set-dataset-flag)for et bestemt datasæt, f.eks.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
skaber en flagfil i flagmappen for rPmelTao (selvom flaget Key her er forkert) .
    * Nyt nyt[Abonnement](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)service, så enhver kunde kan angive en handling, der vil ske, når et bestemt datasæt oprettes (når du nårERDDAP™genstartes) og når datasættet ændres på nogen måde. Dette system kan deaktiveres via&lt;AbonnementSystemActive&gt; i dit abonnement[opsætning.xml](/docs/server-admin/deploy-install#setupxml)fil. The The The The The The TheERDDAP™ [Daglig rapport](/docs/server-admin/additional-information#daily-report)Angiver nu alle abonnementer og indeholder den webadresse, der er nødvendig for at annullere hver enkelt, hvis du føler, at systemet misbruges. I nærheden af In In In In In In In In In In In In In Indatasets.xml, der er en ny, valgfri [&lt;Abonnement EmailBlacklist&gt;] (/docs/server-admin/datasets#subscriptionemailblacklist) tag så administratorer kan angive en komma-separat liste over e-mailadresser, der umiddelbart er sortlistet fra abonnementssystemet.
    * Nyt [Flere]&lt;påChange&gt;] (/docs/server-admin/datasets#onchange) attribut idatasets.xmlTillader, atERDDAP™Administrator angiver en handling, der vil ske, når et bestemt datasæt oprettes (når du nårERDDAP™genstartes) og når datasættet ændres på nogen måde.
    * Forbedringer til fuld tekst søgning: At gemme søgestrengen for hver datasæt nu bruger 1/2 hukommelse. Søgealgoritme (Boyer-Moore-lignende) er nu 3X hurtigere.
    * Emails fraERDDAP™Nu altid forberede emnet og indholdet med\\[Erddap Url\\], så det vil være klart, hvilketERDDAP™Dette kom fra (hvis du administrerer flereERDDAPs s s) .
    * Mere omfattende statistik samling for[Daglig rapport](/docs/server-admin/additional-information#daily-report)email.
    * Ny logfil\\[bigParentDirectory\\]/emailLogYEAR-MM-DD.txt logger alle e-mails sendt afERDDAP™hver dag. Dette er især nyttigt, hvis din server ikke kan sende e-mails - du kan mindst læse dem i logken.
    *   ERDDAP™Nu gør det en\\[bigParentDirectory\\]/ cache / (datasetID) mappe for hvert datasæt, da der kan være masser af filer cached.
* Nyt nyt[RSS2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)feed for hver datasæt (Kig efter orangeRSSikoner på lister over datasæt, Data Access Forms og Make A Graph websider) .
*   EDDGrid .kmlSvar bruger nu flisebilleder ("superoverlays" - dynamisk genereret quadtree billeder) . Det oprindelige billede indlæses i GoogleEarth meget hurtigere end før. Opløsningen af kortet øges, når du zoomer ind, op til den fulde opløsning af datasættet. Recommend: Brugere skal anmode.kmlfor et tidspunkt, men datasættets hele længde, breddegrad rækkevidde. Desværre blev støtte til tidsintervaller fjernet (Jeg håber det kommer tilbage) .
*   ERDDAP™nu tilføjer[Udløb og cache-Control max-age overskrifter](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)til alle filer, der anmodes fra mappen / billeder. Dette reducerer i høj grad antallet af statiske filanmodninger sendt tilERDDAPog dermed i høj grad fremskynde de flesteERDDAP™sidebelastninger. Også, mangeJavaScript-fil referencer flyttes til bunden af deres HTML-sider, som også fremskynder mangeERDDAP™sidebelastninger. Takket være bogen "High Performance Web Sites" af Steve Souders og ySlow tilføjelse til FireBug plugin i FireFox.
*   ERDDAP™Tænd for netcdf-java 2.2.22 til netcdf-java 4.0. Blandt andre ting, dette giverEDDGridFraNcFiles til at læseHDF .hdf, samt GRIB .grb ogNetCDF .ncfiler.
*   EDDGridFraDap ogEDDGridFraNcFiles understøtter nu også DArray (samt DGrid)  dataVariables. Hvis en dimension ikke har en tilsvarende koordinater variabel,ERDDAP™skaber en akse variabel med indeksværdierne (f.eks. 0, 1, 2, ..., 311, 312) . Så alle andre aspekter afEDDGridforblive den samme:
\\* Det tjener stadig alle datasæt som Grids, med en akse variabel for hver dimension.
\\* Queries kan stadig anmode værdier fra aksevariablerne.
Takket være Charles Carleton, Thomas Im, Dorian Raymer og andre.
* The The The The The The TheWMS OpenLayersSider har nu en standard længde, breddegrad rækkevidde, der er lidt større end datasættets sortiment (ikke det nøjagtige område, så forbindelsen til små datasæt er mere indlysende) . Standardserien kan nu også være 0 til 360, hvilket gør det muligt for mange datasæt at blive vist nu. Tak tilToddSpindler.
* Nye skydere på nogle data Access Forms og Make A Graph websider. De forenkler (crude) specifikation af de ønskede data og giver god visuel feedback.
* En ny mulighed for&lt;Datasæt&gt; tags idatasets.xml:[aktivt arbejde](/docs/server-admin/datasets#active).
* Referencer tilERD'sERDDAP™ændret fra kystwatch.pfel (virker stadig via proxy) til kystur.pfeg (foretrukket foretrukne) .
* Ny støtte til[data\\_minog og ogdata\\_max](/docs/server-admin/datasets#data_min-and-data_max)variable metadata attributter.
* En delvis løsning til den[VentDaTryAgain delvise / delvise resultater Undtagelse](/docs/server-admin/additional-information#waitthentryagain-exception): Nu vil nogle anmodninger, der tidligere mislykkedes, når en datakildeændring blev opdaget, lykkes, fordiERDDAP™Genindlæs datasættet og re-request dataene automatisk, alt sammen i forbindelse med den oprindelige anmodning.
* Bug fix: generere Datasæt Xml blev deaktiveret iERDDAP™version 1.12. Tak til Ellyn Montgomery for at påpege dette.
* Små ændringer til fejlhåndtering.
* Mange forbedringer for at undgå/deal med mulige løbsforhold (f.eks. mulige problemer som følge af den multi-telæste natur afERDDAP) som forårsagede små, infrequent problemer.
* Nu, hvis en fejlmeddelelse er skrevet på et billede, vil billedet kun forblive i cachen for ~5-10 minutter (ikke 60) . Tak til Cara Wilson.
* Standardmeddelelsen, når der ikke er data, er nu "Din forespørgsel producerede ingen matchende resultater.", som er kortere, mere præcis og matcherOPeNDAPservere.
*   EDDGridIkke længere giver bundet akseværdier.
* Små ændringer til .ver og .help anmodninger.
* Mange små ændringer og fejlrettelser.
     

## Version 1.12{#version-112} 
 (udgivet 2008-10-31) 

* EDDTableFraSOSigen arbejder med NDBCSOSog arbejder med de nye NOSSOS.
* EDDTableFraBMDE kræver nuERDDAP™Admin for at angivedataVariables.
*   EDDGridikke længere kræver, at lat og lon er jævnt placeret for . transparent transparent transparent Png eller.kml. Tak tilToddSpindler.
* Et par små ændringer.
     

## Version 1.10{#version-110} 
 (udgivet 2008-10-14) 

* Ny "farveBar" metadata til datavariabler idatasets.xmldefinerer standardfarvelinjens indstillinger for diagrammer og kort. Se endnu[mere information](/docs/server-admin/datasets#color-bar-attributes). Dette er vigtigt, fordi det i høj grad forbedrer udseendet af standardgrafer og kort produceret af Make A Graph og fordi standardgrafer og kort nu har en ensartet farvelinje, selv når klienten ændrer det ønskede tidspunkt eller geografiske område. Dette var også nødvendigt forWMS.
*   ERDDAP™Nu tjener de fleste gitterdata via enWMSService. Dette er vigtigt, fordi det viser, at ud over at få data fra mange typer af dataservere,ERDDAP™kan distribuere data via forskellige protokoller (DAP,WMS... mere i fremtiden) . Se billederne[klientdokumentation](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Eller[dokumentation for administratorer](/docs/server-admin/datasets#wms). Eller[Prøv det ud](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Ny støtte til længdeværdier &gt;180 i.kmlfiler.
* Ny cdm\\_data\\_type: Andet .
*   ERDDAP™understøtter nu "boolean" kildedataType. Se endnu[mere information](/docs/server-admin/datasets#boolean-data)Dette vil blive nyttigt for fremtiden EDDTableFraDatabase.
* Nye EDDTableFraBMDE understøtter DiGIR/BMDE datakilder.
* EDVGridAxis tillader nu faldende sorteret værdier. PmelOscarsets krævede dette.
*   ERDDAP™Nu returnerer HTTP-fejl (f.eks. "404 for ressource / side ikke fundet") i flere situationer, i stedet for HTML-sider med fejlmeddelelser.
* Masser af ændringer / fordele tilERDDAP™dokumentation.
* Masser af små ændringer.
* Nogle fejlrettelser.
*    **Ting, tingERDDAP™Administratorer skal gøre for at opgradere til denne version:** 
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml, for enhver EDDTableFraSOSDatasets, ændre "observeredeProperty" metadata til "sourceObservedProperty".
    * Reglerne for enaxisVariableeller eller ellerdataVariable'sdestinationNameer nu nu[strammere](/docs/server-admin/datasets#datavariable-addattributes). Du skal kontrollere, at dine variable navne er gyldige. Du kan enten tjekke dem ved hånden eller køreERDDAP™og se på fejlmeddelelserne i den rapport, der er sendt til administratoren.
    * I nærheden af In In In In In In In In In In In In In Indatasets.xml, hvis du ønsker, at en gitterdatavariabel skal være tilgængelig viaWMS, du skal tilføje farveBar metadata. Mindst, for eksempel,&lt;NavnligcolorBarMinimum"type "Enkel0"&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Se endnu[mere information](/docs/server-admin/datasets#wms).
    * Tilføj følgende til din[opsætning.xml](/docs/server-admin/deploy-install#setupxml)filfil (men tilpasse den med dine oplysninger) :

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
 (udgivet 2008-07-13) 

* En ny webtjeneste iERDDAP™, generere Datasæt Xml, hjælperERDDAP™Administratorer ved at oprette et groft udkast til XML nødvendig for at beskrive et datasæt idatasets.xml
* Nogle ændringer / fejlrettelser relateret til at tillade gitterdap at blive set af netcdf-java som en opendap server, herunder: globale metadata er nu markeret "NC\\_GLOBAL" (i stedet for "GLOBAL") .
* The The The The The The TheEDDGridog EDDTable Data Access-formularer bruger nu forespørgselsoplysninger i URL. Hvis en bruger f.eks. går fra en Make A Graph-formular til en Data Access-formular, overføres begrænsningerne nu korrekt.
*   tabledap's Make A Graph giver nu begrænsninger på strenge variabler.
* EDDTables Make A Graph giver nu NaN begrænsninger. Tak til Steve Hankin.
* Bug fix: EDDTable gem AsBillede forstod ikke korrekt .farvebar min og max værdier. Tak til Steve Hankin
* Mange forbedringer af opsætningenDatasetsXml. Tak til Ellyn Montgomery.
* Griddap anmodninger tillader nu () -style anmoder lidt uden for det egentlige akseområde. Dette er passende siden () - Værdier afrundes til den nærmeste faktiske værdi. Tak til Cindy Bessey
* Jeg lavede FloatArray og DoubleArray test af isEvenlySpaced mere sofistikeret. Det vil altid være ufuldkommen (fordi testen skulle tilpasses for hver datasæt) , men det bør være bedre. Tak til Ellyn Montgomery.
* Jeg flyttede opsætning.html og setupDatasets Xml.html erddap's /download mappe og hårdt kodede alle links til dem. Nu kan jeg foretage ændringer og opdatere opsætningsoplysningerne umiddelbart.
* Mange små ændringer. Et par små fejlrettelser.
*    **Ting, tingERDDAP™Administratorer skal gøre for at opgradere til denne version:** 
    * Flytte Flyt&lt;TheShortDescription Html&gt; fra dine beskeder.xml til din[opsætning.xml](/docs/server-admin/deploy-install#setupxml)fil. Det angiver den tekst, der vises i midten af venstre side af denERDDAP™startside. Også, tilføje&lt;H1&gt;ERDDAP&lt;/h1&gt; (eller nogle andre overskrifter) til toppen af det. **Eller,** kopi kopi&lt;teShortDescriptionHtml&gt; i den nye[opsætning.xml](/docs/server-admin/deploy-install#setupxml)filfil (fra den nye erddapContent.zip) ind i din opsætning.xml.
         

## Version 1.06{#version-106} 
 (udgivet 2008-06-20) 

* Ny støtte tilIOOS DIF SOSdatakilder.
* Mange små ændringer. Et par små fejlrettelser.
     

## Version 1.04{#version-104} 
 (udgivet 2008-06-10) 

* Ny Slide Sorter funktion.
* Ny Google Gadgets side og eksempler.
* Bug fix iEDDGrid.saveAsNc til variabel med skala og addOffset.
     

## Version 1.02{#version-102} 
 (udgivet 2008-05-26) 

* Nyt nytEDDGridSideBySide giver mulighed for forskelligeaxisVariables s s\\[0\\]kildekildekilde Værdier.
* Alle strømninger og vinddata blev flettet indEDDGridSideBySide-datasæt.
* Billeder fra billedanmodninger caches nu i 1 time.
     

## Version 1.00{#version-100} 
 (udgivet 2008-05-06) 

* Lav en graf websider og grafikkommandoer i webadresser.
* Støtte til flagfiler for at tvinge genindlæsing af et datasæt.
* Ny datasæt type: EDDTableFra4DFiles (den første del af EDDTableFraFiles) .
