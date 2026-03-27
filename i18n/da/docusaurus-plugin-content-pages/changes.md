---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ Ændringer

 ERDDAP™ er et godt eksempel på [Bruger- drevet innovation](https://en.wikipedia.org/wiki/User_innovation) , hvor produktinnovation ofte kommer fra forbrugerne ( ERDDAP™ brugere) , ikke kun producenterne ( ERDDAP™ udviklere) . I årenes løb, de fleste af de ideer til nye funktioner og ændringer i ERDDAP™ er kommet fra brugere. Disse brugere krediteres nedenfor for deres store ideer. Tak&#33; Please holde disse store forslag kommer&#33;

Her er ændringerne forbundet med hver ERDDAP™ frigivelse.

## Version 2.30.0{#version-2300} 
 (udgivet 2026- 04- 07) 

Version v2.30.0 fokuserer i høj grad på fejlrettelser, afhængighedsopdateringer for stabilitet og sikkerhed og test af præstationsforbedringer.

*    **Nye funktioner og ændringer (til brugerne) :** 
      * Forstærket [Croissant](https://mlcommons.org/working-groups/data/croissant/) metadata kompatibilitet og manifest støtte, herunder [mlcroissant](https://pypi.org/project/mlcroissant/) kompatibilitet.
      * Forbedret støtte til parketbooster.

*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
      * Ubrugte kommandolinjeværktøjer og tilhørende kode blev fjernet fra codebasen for at reducere den tekniske gæld. Se https://github.com/ERDDAP/erddap/pull/432.
 
      * Et nyt bonusflag `kraftSynkronousLoading` er blevet tilføjet for at tilsidesætte standardindlæsningsmetoden for datasæt. Dette bør sjældent være nødvendigt og kun anvendes i tilfælde, hvor udskudt lastning giver anledning til problemer. Se [feature flag side](/docs/server-admin/feature-flags#forcesynchronousloading) for detaljer.

## Version 2.29.0{#version-2290} 
 (udgivet 2025- 12- 15) 

Der kræves handling.

 ERDDAP™ version 2.29.0 kræver jdk 25 eller senere. Opdatér din jdk version. Hvis det er et problem, kan du bygge ERDDAP™ til en ældre jdk (tilbage til mindst 17) ved at ændre pom.xml filen. JDK 25 er en LTS-udgivelse af Java og omfatter mange forbedringer, især forbedret ydeevne.

*    **Nye funktioner og ændringer (til brugerne) :** 
    * ISO 19115-versioner: Se nedenfor for admin info. For brugere, kan du nu anmode om specifikke versioner af ISO 19115 metadata. Gør dette fra griddap / tabledap sider for et datasæt med filtypen drop down. Disse versioner vil være uafhængige af serveren standard.

*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Ny funktion, MQTT support. For detaljer anbefaler jeg at læse [ny side om det.](/docs/server-admin/mqtt-integration) Dette omfatter at kunne bygge datasæt fra MQTT-meddelelser og offentliggøre MQTT-meddelelser, når et datasæt ændres. Det er slukket som standard, så hvis du ønsker at bruge det, skal du aktivere det.

Tak til Ayush Singh for at arbejde på MQTT&#33;

    * S3 forbedringer: Tilføjelse støtte til S3 URI 'er som cacheFromUrl værdi. Dette vil tillade ERDDAP til at støtte private spande hostet off amazonaws.com Også behandlet en S3 hukommelse lækage problem.

Tak til @ SethChampagnerNRL for arbejdet med S3&#33;

    * ISO 19115-versioner: Der er nu støtte til 3 forskellige versioner af ISO 19115 metadata. Standard versionen styres af indstillinger i din setup.xml. Hvis brugen Sisisiso19115 er falsk, vil serveren som standard give NOAA ændret ISO19115 _ 2. Hvis usSisiso19115 er sandt, så serveren vil bruge en anden version afhængigt af værdien af usSisisiso19139. Hvis brugen er sand, vil standarden være ISO19139 _ 2007, hvis brugen er falsk vil standarden være ISO19115 _ 3 _ 2016. Vi anbefaler at bruge Sisisiso19115 = sand og Sisisiso19139 = falsk. Din organisation kan kræve forskellige indstillinger.

    * Migreret til java. tidsbibliotek (i stedet for java.utiltil. GregorianCalendar) . Dette bør give præstationsforbedringer på forespørgsler, der involverer dato / tid kolonner. Der bør ikke være nogen mærkbar indvirkning for langt de fleste datasæt. Det kendte tilfælde dette forårsager en ændring er, hvis datasættet bruger `dage siden 0000- 01- 01` eller lignende. Hvis dette er et problem for en variabel, kan du tilføje ` <att name="legacy_time_adjust"> true </att> ` til addAttributes a dataVariable eller axisVariable .
    
    *    datasets.xml er nu behandlet af en [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Dette har mange anvendelser, herunder indstilling af private værdier (som adgangskoder) ved hjælp af miljøvariabler. Dette kan deaktiveres ved at indstille enableEnvParsing til false i setup.xml.

    * Trykakse: Tilfører et særligt tilfælde for stigninger defineret ved tryk. Dette bruges primært i Meteorologi datasæt, der definerer lodrette stigninger i isobariske niveauer. BEMÆRK: Mindre trykværdier betyder højere stigninger, så aksen kører modsat de normale stigninger defineret i meter eller fødder.

Takket være [SethChampagnerNRL](https://github.com/ERDDAP/erddap/pull/373) 

    *    EDDGrid FromNcFiles med varierende dimensioner: Der er (eksperimentel) støtte til EDDGrid FromNcFiles datasæt til at have variabler, der ikke bruger det samme sæt akser. Vær venlig at rapportere tilbage om, hvordan det virker for dig, eller hvis adfærden ikke virker helt korrekt.

    * Der er en samling af optimeringer, der bør være sikker, men har flag til at vende tilbage til gammel adfærd, hvis det er nødvendigt. Hvis du finder behovet for at indstille nogen af flagene, skal du indsende en fejl. Hvis vi hører om ingen spørgsmål de fleste af disse vil blive fjernet med den nye adfærd standard i fremtiden. Der er en [ny side om feature flag](/docs/server-admin/feature-flags) hvor du kan læse om disse og andre flag.

      * touch Tråd Kun WhenPets: Dette er en ændring, så touchThread vil kun køre, når der er elementer i køen at røre. En mindre tråd kører er en mindre optimering, men stadig nyttig. Standard til sandt.

      * use NcMetadata ForFileTable: Denne ændring gør det muligt for den interne filtabel at bruge nc attributter, specifikt en variabel faktisk _ range attribut for at undgå at læse hele nc-fil. Dette kan drastisk fremskynde indledende indlæsning af datasæt baseret på nc filer, hvis den faktiske _ range for hver variabel i hver fil er inkluderet som en attribut. Bemærk, at dette stoler på værdien, så hvis det er forkert, vil den interne fil tabel have forkerte oplysninger. Standard til sandt.

      * ncHeader MakeFile: Denne ændring gør det muligt at generere nc header filer uden først at generere den repræsentative nc-fil. Dette er en lille optimering for EDDTable, men en enorm optimering for mange EDDGrid anmodninger. Standard til falsk (som i falsk er den tilsigtede optimerede adfærd) .

      * baggrund CreateSubset Tabel: Denne ændring flytter nogle af den oprindelige behandling af datasæt til en baggrundstråd. Dette skulle forbedre tiden for indlæsning af datasæt. Specielt den forsinkede del er delsæt tabeller, som også genereres, når det er nødvendigt, hvis den forsinkede behandling ikke er sket endnu. Standard til sandt.

    * Nogle små ændringer, fejlrettelser (Tak til Italo Borrelli for rettelser til EDDTableFromAggregateRows tak. @ SethChampagnerNRL for at gøre det muligt at strække mere end 360 i EDDGrid LonPM180, og flere andre fejlrettelser) og optimering.

*    **til ERDDAP™ Udviklere:** 
    * Yderligere optimering, herunder skæring test køre tid i halve.

    * Nye testprofiler for meget flaky (ekstern) eller ekstremt langsom (LowAWS) tests.

## Version 2.28.1{#version-2281} 
 (udgivet 2025- 09- 05) 

*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Støtte tilføjet til X- Forwarded- Prefix. Dette er af særlig interesse for at administrere kørende servere på en delsti. Læs vores opdaterede dokumentation for [Apache](/docs/server-admin/deploy-install#apache) og [Nginx](/docs/server-admin/deploy-install#nginx) for mere information.

Takket være [@ srstravage](https://github.com/srstsavage) 

## Version 2.28.0{#version-2280} 
 (udgivet 2025- 08- 29) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    *    [Croissant schema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) er nu tilgængelig. Administrerer kan kontrollere, om standard metadata bruger Croissant, men startende med 2.28.0 kan du anmode Croissant definition for med den nye eksport filtype. "croissant" (som giver en jsonld fil) .

*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * New Docker Billede oprettet på hver flettet pull anmodning. Det er alfabygger, de er ikke versionerede udgivelser. De vil have et mærke som "20250814T034025", hvilket indikerer, hvornår det blev bygget. Hvis du ønsker at prøve de nyeste funktioner kan du bruge disse. Hvis du ønsker noget mere stabilt bruge vores udgivelser med en semantisk version tag (f.eks. 2.28.0) . Vi sigter altid på at få alpha-udgivelserne til at kunne bruges, men der er mindre test for dem end vores versionerede udgivelser. Vi anbefaler altid, at du bruger noget mindst lige så nyt som vores "nyeste" udgave, som vil være den seneste semantiske versionerede udgave.

    * Docker Billeder nu tilgængelige på [GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) ud over [DockerHub](https://hub.docker.com/r/erddap/erddap) .

Takket være [@ ocefpaf](https://github.com/ocefpaf) , [@ abkfenris](https://github.com/abkfenris) , [@ srstravage](https://github.com/srstsavage) , og [MathewBiddle](https://github.com/MathewBiddle) til deres bidrag omkring Docker Images. Dette omfattede de første bidrag fra dem alle undtagen @ ststravage&#33;
    
    * Der er nu støtte til [Croissant schema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) filer. Det er som standard. Du kan deaktivere Croissant skema i din setup.xml med (IKKE ANBEFALET - Du bedes kontakte eller indsende et spørgsmål om GitHub, hvis du skal gøre dette) :
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Nogle indstillinger har fået deres standardværdier ændret. use HeadersForUrl og use EddReflection nu både standard til sandt. Hvis de forårsager et problem, og du er nødt til at sætte dem til falsk, skal du oprette et problem. Hensigten er at fjerne dem i en fremtidig udgivelse.

    * Nogle indstillinger er blevet fjernet. use SharedWatchService and redirectDocumentation ToGitHublo var blevet sat til true som standard for flere udgivelser og var temmelig godt testet på dette punkt. Fjerner disse tilladt for nogle kode oprydning.

    * Nogle små ændringer, fejlrettelser og optimeringer.

*    **til ERDDAP™ Udviklere:** 
    * Masser af døde kode fjernet. Mange advarsler rettet.

## Version 2.27.0{#version-2270} 
 (udgivet 2025- 06- 11) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * Nye data til colorbar konverter på servere på / erddap / convert / color.html

*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Standard adfærd er, at cachen nu vil blive ryddet uafhængigt af den store belastning datasæt opgave. Dette vil give mulighed for mere pålidelig og regelmæssig clearing af gamle cache-filer. Der er yderligere arbejde til at forbedre server adfærd, når lav på diskplads (returnere en fejl for anmodninger, der sandsynligvis vil gøre serveren løber tør for plads, og rydde cachen oftere under lave diskforhold for at forsøge at forhindre fejl) . I datasets.xml   (or setup.xml) du kan tilføje / indstille den nye cache Parameteren ClearMinutter til kontrol af hvor ofte serveren kontrollerer for at rydde cachen. Bemærk, at den eksisterende CacheMinutter parameter styrer alderen af filer, der skal holdes, den nye cache ClearMinutter er for, hvor ofte man skal gøre en chache klar.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Du kan deaktivere de nye cache klare kontroller ved at indstille taskCacheClear til false i setup.xml, selvom det ikke anbefales.
cache ClearMinutter er også i [datasets-dokumentation](/docs/server-admin/datasets#cacheclearminutes) .
    
    * Lokaliseret datasæt metadata support. Det understøtter lokalisering for værdier i en addAttributes afsnit. Tilføj blot en attribut med den ekstra xml: lang tag. For eksempel at tilføje en fransk titel til et datasæt din addAttributes Afsnit vil omfatte:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Yderligere oplysninger [lokaliseret metadatadokumentation](/docs/server-admin/localized-metadata) .

    * New Docker Sammensæt fil med indstillinger for SSL og en barebones Prometheus server. Tak til Shane St. Savage for SSL og Jiahui Hu for Prometheus.

    * Støtte til at bruge oplysninger i headers til at bestemme serveren URL i stedet for at stole på config-filen. Dette vil gøre det muligt for en server at få adgang til flere navne og kan forenkle visse konfigurationer. Aktivér det og send feedback.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Nogle små ændringer, fejlrettelser og optimeringer.

*    **til ERDDAP™ Udviklere:** 
    * Refaktor til hvordan output-filtyper er defineret i kode. Dette bør gøre det, så filtyper kan tilføjes uden at skulle røre mange kode steder.

## Version 2.26{#version-226} 
 (udgivet 2025- 03- 31) 

*    **For alle:** 
    * Stor opdatering til vores dokumentationsside: https://erddap.github.io/
 
Udover den opdaterede udseende er der forbedret navigation, søgning, oversættelse, og det bør være lettere at opretholde fremadrettet&#33;

*    **Nye funktioner og ændringer (til brugerne) :** 
    * Abonnementer og RSS opdateringer bør ske mere pålideligt for datasæt, der bliver opdateret ofte fra filændringer.

*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Standard frigivelse kræver / understøtter Java version 21. Tilbage i denne udgivelse er at være i stand til nemt at lave en Java 17 kompatibel binær.

    * Ny funktion til at tilpasse de oplysninger, der vises om datasæt i UI. Vi forventer, at dette er særligt nyttigt for at tilføje ting som datasættet citationer. For flere detaljer kan du læse [ny dokumentation](/docs/server-admin/display-info) . Tak til Ayush Singh for bidraget&#33;

    * Yderligere Prometheus målinger. Den største er ` http _ request _ varighed _ sekunder` som omfatter svartider opdelt efter: "request _ type", "dataset _ id", "dataset _ type", "file _ type", "lang _ kode", "status _ kode"
Denne maskine læsbar format vil gøre det muligt bedre indsamling af målinger til at forstå, hvordan brugerne bruger serveren.

    * Ny måde at generere ISO19115 XML-filer. Det bruger Apache SIS og er en ny mulighed i denne udgivelse. Aktivér det og send feedback.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * EU vil nu skabe individuelle links for hver url i felter som infoUrl og resumé.

    * Abonnementer og RSS opdateringer bør ske mere pålideligt for datasæt, der bliver opdateret ofte fra filændringer. Hvis dette forårsager problemer, bedes du række ud på GitHub og deaktivere funktionaliteten ved at tilføje nedenstående flag til din setup.xml.
IKKE ANBEFALET
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Delsæt variabler vil ikke længere blive automatisk genereret for datasæt type EDDTableFromNcCFFiles. Hvis du var afhængig af adfærd, kan du enten (præfereret opløsning) Tilføj subsetVariables til datasets definition i din datasets.xml , eller tilføje nedenstående flag til din setup.xml. Hvis du føler behov for at tænde dette, bedes du række ud på GitHub, så vi bedre kan støtte din use case bevæger sig fremad.
IKKE ANBEFALET
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Serveren vil nu omdirigere anmodninger om dokumentation (under downloads / som er den dokumentation, der er blevet migreret) til det nye dokumentationssted. Om nødvendigt kan du deaktivere dette med et flag i setup.xml:
IKKE ANBEFALET
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Nogle små ændringer og fejlrettelser.

*    **til ERDDAP™ Udviklere:** 
    * Flere kode kvalitet forbedringer og død kode oprydning. Dette omfatter mindre optimeringer, bedre håndtering af lucerbare ressourcer, og migrerer væk fra lange forældede datatyper (som Vector) .

    * Stor refactoring til EDStatic at trække det meste af den config, besked, og metrisk kode. Det er også bedre indkapslet initialisering og håndtering af mappestier (disse sidste 2 har mere at gøre.) 

    * Masser af fremskridt i retning af en officielt understøttet Docker Image. Planen er at færdiggøre og frigive efter ERDDAP™ 2.26 udgivelse er tilgængelig.

## Version 2.25{#version-225} 
 (udgivet 2024- 10- 31) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * EDDTableFromFiles kan nu understøtte forespørgsler med kun afledte udgange (globals, jexl script eller variable) .
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Version 2.25 kræver Java 21 eller nyere. Dette er LTS-versionen og har været tilgængelig i over et år.
         
    * SharedWatchService er nu standard. Hvis du har brug for at deaktivere det, bedes du kontakte chris. John på noaa.gov at lade mig vide, så jeg kan forbedre det i fremtidige versioner og tilføje:
        &lt;use SharedWatchService &gt; false&lt;/ useSharedWatchService &gt; til din setup.xml.
         
    * EU ERDDAP™ servlet vil nu starte ved serverens opstart. Hvilket betyder, at datasæt vil begynde at indlæse straks i stedet for at vente, indtil en anmodning er fremsat.
         
    * Den removeMVRows parameter i EDDTableFromMultidimNcFiles vil nu have en effekt. At sætte det til falsk kan i betydelig grad fremskynde nogle forespørgsler, men dette kan ikke være egnet til alle datasæt. Yderligere oplysninger findes på: [beskrivelse af parameteren](/docs/server-admin/datasets#removemvrows) .
         
    * Datasæt (EDDTableFromNcFiles og EDDGrid FromNcFiles) at bruge zarr-filer er nu understøttet. De skal omfatte "zarr" i enten fileNameRegex eller patRegex. Se [zarr secion i datasættets dokumentation](/docs/server-admin/datasets#zarr) for flere detaljer.
         
    * Ny datasæt type, EDDTableFromParquetFiles er nu understøttet. Se [EDDTableFromParquetFiles secion i dataets dokumentation](/docs/server-admin/datasets#eddtablefromparquetfiles) for flere detaljer.
         
    *    [Prometheus metrics](https://prometheus.io/) er nu tilgængelige på / erddap / metrics.
         
    * En ny XML parser implementering er tilgængelig. Denne nye parser tillader at bruge XInclude i datasets.xml . Tak til Ayush Singh for funktionen.
         
    * Ny parameter i datasets.xml til at kontrollere usædvanlige aktivitet e-mails. unuseActivity Fejlprocent standard til den gamle værdi på 25%. Tak til Ayush Singh for funktionen.
         
    * Ny parameter i setup.xml, der styrer hvis datasættet loading fejl vises på statu.html side. Det er standard at true, at deaktivere datasættet fejl på statussiden, indstille showLoadErrorsOnStatusPage til false:&lt;showLoadErrorsOnStatusPage &gt; false&lt;/ showLoadErrorsOnStatusPage &gt;
         
    * Nogle små ændringer og fejlrettelser.
         
*    **til ERDDAP™ Udviklere:** 
    * Test adskilt fra enhed og integration (langsomt) tests. Også flere test aktiveret og tests er blevet gjort mindre flaky.
         
    * Fejl ved prone (nogle kontroller stadig deaktiveret) og Spot Bugs integreret gennem Maven.
         
    * Fuld kode base formateret til at matche Google Style Guide.
         

## Version 2.24{#version-224} 
 (udgivet 2024- 06- 07) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * Ny farvepalet EK80 for akustiske datasæt tilgængelige. Tak til Rob Cermak for dette.
         
    * Fastsætte et problem, hvor EDDTableAggregateRows ikke viste ordentlige intervaller fra alle børn. Tak til Marco Alba for fix og bug rapport.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * AT GØRE: SIKKERHEDSMÆSSIGE ÆNDRINGER: Google Authentication kan kræve ændringer i din CSP.
        
Specifikt, kan du også nødt til at tilføje https://accounts.google.com/gsi/style og https://accounts.google.com/gsi/ til forbindelse-src. For script- src kan du nu bruge https://accounts.google.com/gsi/client.
 
        
For mere information kan du gå til [Google-side](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) om CSP-konfiguration.
         
        
    * Ny fælles vagttjeneste. Dette er en ny mulighed for at se mapper for opdateringer. Det har en tråd til hvert filsystem i stedet for en tråd per datasæt. Sandsynligvis vil dette reducere antallet af tråde, der bruges til at se for ændringer. Det betyder, at alle datasæt bliver opdateret sammen i stedet for at hvert datasæt har sin egen opdateringsfrekvens. Sandsynligvis vil dette betyde hyppigere opdateringer for de fleste datasæt.
        
For at aktivere dette tilføje&lt;use SharedWatchService &gt; true&lt;/ useSharedWatchService &gt; til din setup.xml.
        
          
Prøv dette og rapportere tilbage, hvordan det virker for dig at chris. John ved Noaa.gov.
         
    * Fix for forkerte varnavne i logfiler. Tak til Ayush Singh for fixet.
         
    * Nogle små ændringer og fejlrettelser.
         
*    **Forbedringer ERDDAP™ udviklere:** 
    * Støtte til lokal udvikling ved hjælp af Docker. Tak Matt Hopson og Roje.
         
    * Støtte til lokal udvikling ved hjælp af Jetty og dokumentation forbedringer. Tak Micah Wengren.
         
    * Ændringer i test for at reducere problemer på tværs af platform. Tak. Shane St. Savage.
         

## Version 2.23{#version-223} 
 (udgivet 2023- 02- 27) 

Bemærk, at denne udgivelse blev gjort af Bob Simons, hvilket viser, at han stadig er omkring og aktiv under overgangen til Chris John, hans efterfølger. Med denne udgivelse bliver alle kodeændringer udført af Chis John, medmindre andet er angivet.

*    **Nye funktioner og ændringer (til brugerne) :** 
    *    (Ingen)   
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * AT GØRE: SIKKERHEDSMÆSSIGE ÆNDRINGER: Google Authentication er nu gennemført via det nye Google Identity Services bibliotek, som er en del af "Log ind med Google". Google 's støtte til det gamle "Google Log In" system vil blive afbrudt 2023-03- 31. Så hvis du bruger Google Authentication i din ERDDAP™ installation, skal du opdatere til ERDDAP™ v2.23 + før da. (Bob er ked af den korte varsel. Det er Bobs skyld.)   
         
    * NCCSV er nu v1.2. Ændringen er, at filerne nu er UTF- 8- kodede filer (de var ASCII) og så kan nu omfatte enhver Unicode tegn som er, uden kodning som\\ u _ hhh _, selvom det stadig er tilladt.
Når du skriver NCCSV filer, ERDDAP™ Nu skriver V1.2 filer.
         ERDDAP™ vil stadig læse NCCSV filer, der følger v1.0 og v1.1 specifikation.
Takket være Pauline- Chauvet, n- a- t- e, og thogar- computer for at foreslå dette og gøre test for at sikre forskellige regneark programmer kan importere UTF- 8 filer. Takket være Bob Simons for denne kode ændring.
         
    * NYT: Status.html webside har nu en linje i nærheden af toppen, som angiver, hvilke datasæt loadDataets er i øjeblikket læsning og relaterede statistikker, eller ingen, hvis ingen datasæt bliver indlæst. Dette kan være meget nyttigt at ERDDAP™ administratorer forsøger at finde ud af, hvorfor indlæse Datasættene tager så lang tid. Også, nGridDataset, nTableDataset, og nTotalDataets tæller nedenfor, der er nu øjeblikkelig (tidligere, de var fra slutningen af den sidste store belastning Datasæt) .
Denne forandring er for Roy Mendelssohn. Takket være Bob Simons for denne kode ændring.
         
    * FORBEDRING: Generatedataset Xml ændres nu til CF- 1, 10 (var CF- 1, 6) i attributterne "konventioner".
Takket være Bob Simons for denne kode ændring.
         
    * Nogle små ændringer og fejlrettelser.
         

## Version 2.22{#version-222} 
 (udgivet 2022- 12- 08) 

Bemærk, at denne udgivelse blev gjort af Bob Simons, hvilket viser, at han stadig er omkring og aktiv under overgangen til hans efterfølger.

*    **Nye funktioner og ændringer (til brugerne) :** 
    *    (Ingen)   
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * At gøre: ingenting.
         
    * SIKKERHEDSMUG FIX: Der var en Cross Site Skriftsrelateret fejl i koden for den sprogvalg drop down. Takket være NOAA Sikkerhedsskanninger for at fange dette. Dette viser, at NOAA sikkerhed er aktivt og rutinemæssigt på udkig efter sikkerhedssvagheder i ERDDAP .
         
    * SIKKERHEDSFIX: De mange biblioteker, der anvendes af ERDDAP™ blev som sædvanlig opdateret som en del af denne udgave. Denne gang, dette omfattede opdatering af PostgreSQL driver (som havde en sikkerhedsfejl) til 42.5.1.
         
    * FORBEDRING: Mere små ændringer til ERDDAP 's hukommelse management system bør reducere chancen for en given anmodning mislykkes på grund af manglende tilgængelig hukommelse.
         
    * Nogle små ændringer og fejlrettelser.
         

## Version 2.21{#version-221} 
 (udgivet 2022- 10- 09) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    *    (Ingen)   
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * AT GØRE: Java 17, bør du ikke bruge\\ -d64 i JAVA\\ _ OPTS i setenv.bat eller setenv.sh. Så hvis den er der, så fjern den. Jeg tror, at 64 bit mode er nu valgt, når du henter en 64 bit version af Java . Takket være Sam Woodman.
         
    * BUG FIX: Nogle gange forsøgte det nye e-mail-system at logge ind for ofte, hvilket fik Google Email-servere til at afvise alle fremtidige logfiler i forsøg. Nu, e-mailsystemet undgår dette og relaterede problemer.
         

## Version 2.20{#version-220} 
 (udgivet 2022- 09- 30) 

*    **Brug ikke v2.20. Det er fejlbehæftet.** Men administratorer stadig nødt til at gøre TO-DO-emner anført nedenfor, når du opgraderer til v2.21 +.
     
*    **Nye funktioner og ændringer (til brugerne) :** 
    *    (Ingen)   
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * FORBEDRING: Vi gen- aktiveret den gamle hukommelse management system (Math2.ensureMemorieTilgængelig) og ændrede det nye hukommelsesstyringssystem (EDStatic.asedThis Request) til at arbejde bedre med det. Se [Hukommelsesstatus](/docs/server-admin/additional-information#memory-status) for detaljer.
         
    * ÆNDRINGER: Standard for&lt;ipAddressMaxRequests &gt; er datasets.xml blev øget fra 7 til 15. Det er klart, at nogle legitime WMS klienter kan generere mere end 7 samtidige anmodninger.
         

## Version 2.19{#version-219} 
 (udgivet 2022- 09- 01) 

*    **Brug ikke v2.19. Det er fejlbehæftet.** Men administratorer stadig nødt til at gøre TO-DO-emner anført nedenfor, når du opgraderer til v2.20 +.
     
*    **Nye funktioner og ændringer (til brugerne) :** 
    * NYT: Der er en ny serverside funktion, orderBy Nedskydning, som virker som orderBy men slags i faldende orden. Takket være Adam Leadbetter.
         
    * FORBEDRING: Nu, grafer (men ikke kort) vil udvide til at fylde den tilgængelige plads på lærredet, dvs plads ikke bruges af legenden. Du kan få høje grafer, firkantede grafer eller brede grafer ved at tilføje og manipulere & .size = _ bredde _ | _ højde _ parameter (hvor bredde og højde angiver størrelsen af lærredet, i pixels) på anmodning URL. (Dette er ikke en mulighed på .graph webside. Du skal tilføje det til URL 'en manuelt.) Hvis du ikke angiver & .size parameter, anmodninger om .smallPng, .png, .largePng, .smallPdf, .pdf, og .large.pdf har foruddefinerede lærred størrelser, så din graf vil udvide til at fylde den tilgængelige plads, men vil normalt være omtrent firkantet. Takket være Bob Fleming.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * AT GØRE: ERDDAP™ nu kræver Java 17 og den beslægtede Tomcat 10. Du skal følge ERDDAP™ monteringsvejledning (eller tilsvarende, f.eks. for Docker) at installere Java 17 og Tomcat 10 og kopiere din \\[ tomcat \\] / indholdsmappe fra din Tomcat 8 installation i den nye \\[ tomcat \\] mappe. Der er ingen andre ændringer, du skal gøre til din ERDDAP installation i forbindelse med denne ændring. Med andre ord: ERDDAP™ fungerer som det gjorde før.
        
Glem ikke at lave ERDDAP -relaterede ændringer til Tomcats server.xml og kontekst.xml, når du opgraderer Tomcat. Se ERDDAP 's [Monteringsanvisning for tomat](/docs/server-admin/deploy-install#tomcat) .
        
Mit indtryk af Java 17 er, at det foretrækker mere processing magt og hukommelse til lang-kører, større applikationer som ERDDAP™ , så det virker lidt langsommere end Java 8 med lav effekt computere (f.eks. 2 kerner og minimal RAM) og virker lidt hurtigere end Java 8 med højere effekt computere (f.eks. 4 + kerner og rigelig RAM) . Så hvis du ser dårlig ydeevne, bruge programmer som Linux 's [top](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) at kontrollere ressourceforbrug og overveje at give ERDDAP™ flere ressourcer, især mere hukommelse. Hukommelsen er billig&#33; De fleste telefoner har flere processorer og hukommelse end de servere, som nogle af jer bruger til at køre ERDDAP &#33;
Takket være Erin Turnbull.
         
        
    * AT GØRE: Hvis du bruger ERDDAP™ til at få adgang til Cassandra, for Cassandra, skal du holde bruge den version af Java som du brugte til at styre Cassandra. Bare skift til Java 17 for drift Tomcat + ERDDAP .
         
    * AT GØRE: Anbefalet: Hvis din servers CPU har 4 + kerner og 8 + GB RAM, overveje at skifte til disse indstillinger i din datasets.xml fil:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Hvis din server har færre ressourcer, holde sig til "1" for begge disse indstillinger.
De nThreads systemer til EDDGrid FromFiles og EDDTable FromFiles blev væsentligt forbedret. Disse ændringer førte til en enorm hastighedsforbedring (f.eks. 2X speedup når nThreads er sat til 2 eller mere) for de mest udfordrende anmodninger (når et stort antal filer skal behandles for at indsamle resultaterne) . Nogle relaterede ændringer fra Chris John vil også føre til en generel speedup hele ERDDAP . Koden for disse ændringer blev bidraget af Chris John. Tak. Chris&#33;
         
    * ADVARSEL: datasetID er forældet og ikke længere understøttet (men teknisk set stadig tilladt) . De vil sandsynligvis blive udelukket i den næste udgivelse. Hvis du bruger bindestreger, skift til understregninger nu for at undgå problemer. Hvis du gør det nu, er det på din egen hastighed. Hvis du venter til næste udgivelse, vil du være i panik og nødt til at beskæftige sig med det den dag.
         
    * Nu, til .htmlTable datasvar, hvis dataene i en streng celle indeholder data: billede / png; base64, efterfulgt af et base64 kodet png-billede ERDDAP™ vil vise et ikon (så brugeren kan se billedet, hvis de svæver over det) og knapper for at gemme teksten eller billedet til udklipsholderen. Takket være Marco Alba (der bidrog med koden) og Bob Simons (som ændrede det en smule) .
         
    * NYT: -doNotAddStandardNames
Hvis du inkluderer\\ - doNotAddStandardNames som en kommandolinjeparameter, når du kører generere Datasæt Xml, generér Datasæt Xml vil ikke tilføje standard\\_name til addAttributes for andre variabler end variabler ved navn breddegrad, længdegrad, højde, dybde eller tid (som har indlysende standard\\_name s) . Dette kan være nyttigt, hvis du bruger output fra generere Datasæt Xml direkte i ERDDAP™ uden at redigere output, fordi generere Datasæt Xml ofte gæt standard\\_name s (Bemærk, at vi altid anbefaler, at du redigere output, før du bruger det i ERDDAP .) Brug af denne parameter vil have andre mindre relaterede virkninger, fordi den gættede standard\\_name bruges ofte til andre formål, f.eks. til at skabe en ny long\\_name , og til at oprette colorBar indstillinger. Takket være Kevin O 'Brien.
         
    * Du kan nu sætte&lt;updateMaxEvents &gt; 10&lt;/ updateMaxEvents &gt; er datasets.xml   (ind med de andre indstillinger nær toppen) for at ændre det maksimale antal filændringer (standard = 10) der vil blive behandlet af updateEveryNMillis-systemet. Et større tal (100?) kan være nyttigt, når det er meget vigtigt, at datasættet altid opdateres. Se [updateMaxEvents dokumentation](/docs/server-admin/datasets#updatemaxevents) . Takket være John Maurer.
         
    * NYT: Tilføjet støtte til global " real\\_time = sand | falsk "String attribut.
Hvis dette er falsk (standard) og hvis datasættet ikke bruger opdatering EveryNMillis, ERDDAP™ vil cache svar på anmodninger om filtyper, hvor hele filen skal oprettes før ERDDAP™ kan begynde at sende svaret til brugeren og genbruge dem i op til omkring 15 minutter (f.eks. .nc , .png) .
Hvis dette er indstillet til sandt, eller hvis datasættet bruger opdatering EveryNMillis, ERDDAP™ vil aldrig cache svarfilerne og vil altid returnere nyoprettede filer.
Takket være John Maurer.
         
    * NYT: E-mails sendes nu i en separat emailThread. Dette gør indlæsning datasæt og andre handlinger, der genererer e-mails hurtigere, fordi loadDataets behøver ikke at vente på e-mail, der skal sendes, som nogle gange tager lang tid. Det nye system kan sende flere e-mails pr. e-mail-session, hvorved antallet af e-mail-server logins og reducere risikoen for dem, der svigter, fordi de er for hyppige. Der er statistik for emailThread på statu.html-siden og diagnostiske beskeder i log.txt -- se efter "emailThread". Bemærk, at en tall af nEmailsPerSession = 0, indikerer problemer, dvs, en e-mail-session var ude af stand til at sende nogen e-mails.
Takket være Bob Simons.
         
    * ÆNDRINGER: E-mails sendes nu med en lidt anden kode (på grund af Java 17 og ændringen til e-mail Thread) . Hvis du har problemer med at sende e-mails, bedes du e-mail erd.data at noaa.gov .
         
    * NYT: Abonnementsaktiviteter, der "touch" en ekstern URL håndteres nu i en separat touchThread. Dette gør loading datasæt og andre handlinger, der rører webadresser hurtigere, fordi loadDataets behøver ikke at vente på touch skal være afsluttet, hvilket undertiden tager lang tid. Der er statistikker for touchThread på statu.html-siden og diagnostiske beskeder i log.txt -- se efter "touchThread".
Takket være Bob Simons.
         
    * NYT: På statu.html siden, i "Major LoadDataset Time Series", er der en ny "skur" kolonne, som angiver antallet af anmodninger, der blev kastet, fordi aktuelle ERDDAP™ hukommelsesforbruget var for højt. Anmodninger, der er skuret vil returnere HTTP-statuskode 503 "Service til rådighed". De anmodninger var ikke nødvendigvis et problem. De er lige ankommet til en travl tid. Dette var en del af en revamp af, hvordan ERDDAP™ beskæftiger sig med høj hukommelse brug.
         
    * NYT: På Unix / Linux-computere, er der nu en "OS Info" linje på status.html webside med aktuelle operativsystemoplysninger, herunder CPU belastning og hukommelse brug.
         
    * Nu, hvor ERDDAP™ er genstartet og quickRestart = true, EDDTableFromFiles datasæt vil genbruge delsæt .nc og særskilt .nc . For nogle datasæt, dette i høj grad reducerer tiden til at indlæse datasæt (f.eks. fra 60 sekunder til 0,3 s) . Sammen med den nye emailThread og taskThread (se ovenfor) , bør dette i høj grad fremskynde genstart ERDDAP™ for mange ERDDAP™ anlæg. Takket være Ben Adams og John Kerfoot.
         
    * Tidligere, forældreløse datasæt (datasæt, der er live i ERDDAP™ men ikke er i datasets.xml ) var blot noteret på status. html og i log.txt efter hver større loadDataset. Nu er de automatisk fjernet fra ERDDAP™ og bemærkes på statu.html og i log.txt, og e-mail til e-mail EverythingTo. Så hvis du ønsker at fjerne et datasæt fra ERDDAP™ , Nu skal du bare fjerne dens stykke af xml i datasets.xml og det vil blive fjernet i den næste store loadDataset. Takket være Bob Simons.
         
    * KNOWN BUG i netcdf- java v5.5.2 og v5.5.3: EU EDDGrid FromThredds Formand Katalog mulighed i Generatedataset Xml bruges til at arbejde for THREDDS kataloger, der indeholder referencer til datasæt i eksterne THREDDS kataloger. Nu gør det ikke. Jeg har rapporteret problemet til netcdf- java udviklere.
         
    * BUG FIX: For dokker brugere indstilling setup.xml parametre via ERDDAP \\ _ _ paramName _: for int og boolean parametre (f.eks. e-mail SmtpPort) , ERDDAP™ var forkert på udkig efter bare _ paramName _. Nu ser det ud til ERDDAP - ParamName. Takket være Alessandro De Donno.
         
    * ÆNDRINGER: ERDDAP™ testsystem bruger nu et automatiseret system til at kontrollere, at nyoprettede testbilleder er præcis som forventet. Tak til Chris John for forslaget og Bob Simons for gennemførelsen.
         

## Version 2.18{#version-218} 
 (udgivet 2022- 02- 23) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * IKKE
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * BUG FIX: .nc Filerne var ikke lukket under visse omstændigheder. Nu er de. Takket være Marco Alba, Roland Schweitzer, John Maurer og andre.
         

## Version 2.17{#version-217} 
 (udgivet 2022- 02- 16) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * BUG FIX: Efter ændringer i orderBy system for et par år siden, Tabledap 's Make A Graph ikke korrekt håndtere mange forespørgsler, der anvendes orderBy Xxx. Nu gør det. Takket være Maurice Libes.
         
    * Tidligere: ERDDAP™ afviste anmodninger. transparent Png 'er, når bredde- og / eller længdeværdierne var helt eller delvist uden for rækkevidde. ( ERDDAP™ GitHub Issues # 19, skrevet af Rob Fuller -- tak for udstationering at Rob) Nu returnerer det transparente pixels for alle områder uden for området af billedet. Dette er nyttigt for mange klient applikationer. Koden ændringer for at gøre denne ændring blev gjort udelukkende af Chris John. Mange tak, Chris&#33;
         
    * Tidligere: ERDDAP™ afviste griddap anmodninger, hvor indeksværdierne for en given dimension var \\[ høj: lav \\] . Nu gør disse anmodninger gyldige ved at bytte de lave og høje værdier. Dette løser et mangeårigt problem for brugere og for eksterne programmer som xtracto, som skulle holde styr på de få datasæt, der har breddegrad værdier, der spænder fra høj til lav for at gøre anmodning som \\[  (50) : (20)  \\] således at anmodningen i indeksområde var \\[ lav: høj \\] . Se https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html En anmodning som \\[  (20) : (50)  \\] for en af disse datasæt fortolkes automatisk som \\[  (50) : (20)  \\] .
         
    * ÆNDRINGER: .esriAsscii anmodninger nu udløse en "File: Gem som" dialogboks i brugerens browser. Takket være Joel Van Noord.
         
    * BUG FIX: Nu, hvis længden variabel af et barn datasæt af en EDDGrid LonPM180 eller EDDGrid Lon0360 datasæt har en valid\\_min og / eller valid\\_max attribut, de er fjernet i EDDGrid LonPM180 eller EDDGrid Lon0360 datasæt. Takket være Roy Mendelssohn.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * AT GØRE: Hvis du havde indstillet&lt;dataProviderFormActive &gt; til falsk til midlertidigt at håndtere XSS sårbarhed, skal du indstille det tilbage til true.
         
    * SIKKERHEDSMUG FIX: Fast XSS sårbarhed i dataudbyderform. Takket være Genaro Contreras Gutiérrez.
         
    * BUG FIX: Når en AWS S3 dirctory havde mere end 10000 filer, ERDDAP™ kastede en "intern fejl". Det er nu ordnet. Takket være Andy Ziegler.
         
    * BUG FIX: EDDGrid SideBySide tillod ikke at variable sourceName s i forskellige børnedatasæt til at være den samme. Nu gør det. Takket være Joshua Stanford.
         

## Version 2.16{#version-216} 
 (udgivet 2021- 12- 17) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * ÆNDRINGER / BUG FIXES: Talrige små ændringer i oversættelsessystemet takket være forslag fra sprogspecifikke redaktører. Takket være Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian og Mike Smit.
         
    * Tilføjet en ordentlig ansvarsfraskrivelse og tildeling til Google Oversæt, som krævet af betingelserne i Google Oversæt. EU 's&lt;html &gt; tag i HTML for hver webside nu korrekt identificerer ikke-engelske websider som værende blevet maskinoversat. Takket være Mike Smit.
         
    * BUG FIX: De login websider arbejder nu ordentligt med forskellige sprogindstillinger. Takket være Mike Smit.
         
    * NYT orderBy Sum filter. Og ny Check All og Uncheck All knapper på EDDGrid Webside for dataadgangsformular. Takket være Marco Albas kodebidrag.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * AT GØRE: Hvis du har
        &lt;questionMarkImageFile &gt; QuestionMark.jpg&lt;/ question MarkImageFile &gt;
i din setup.xml fil, skal du enten fjerne hele tag (anbefales, så standardfilen bruges) eller ændre det til:
        &lt;questionMarkImageFile &gt; QuestionMark.png&lt;/ question MarkImageFile &gt;
         
    * Bare så du ved det, [Adoptium](https://adoptium.net/?variant=openjdk8) har erstattet AdoptOpenJDK som den vigtigste / anbefalede kilde til Java   (OpenJDK) .
         
    * ÆNDRINGER: Logfilerne fra ERDDAP™ , GenerateDataset Xml, og DasDds er nu UTF- 8, ikke computerens standard tegnsæt. Jeg gjorde en masse kontrol og foretaget et par ændringer for at sikre, at ERDDAP™ altid angiver det korrekte tegnsæt, når du læser eller skriver alle former for filer, og ikke længere (i flere tilfælde) er afhængig af computerens standardtegnsæt. Dette rettede et par fejl og flyttede så tæt som jeg kunne på målet om at bruge UTF-8 for så mange filtyper som muligt (f.eks., .log, .xml, .html .json , .json i .nc Hoveder) . Bemærk, at mange ældre filtyper er forpligtet til at bruge ISO- 8859-1 (f.eks. OPeNDAP .das, .dds, .csv, .tsv , .nc 3, .nccsv , .cpt) . Jeg tidligere forsøgt at arbejde med CF gruppe og med Unidata at tilføje støtte til UTF-8 i .nc 3 filer; begge var resistente.
         
    * NYT: Når du henter filer fra AWS S3, ERDDAP 's cache FromUrl system i EDDGrid FromFiles og EDDTable FromFiles bruger nu den nye AWS Transfer Manager til at downloade filer via paralleliserede stykker (således meget hurtigt) . Målet gennemløb er sat til 20 Gbps, per fil, så dette fungerer godt med alle AWS instans typer, men især dem, der har fremragende "Networking Performance". Med denne ændring ERDDAP 's cache FromUrl system tilbyder nu sammenlignelige hastigheder til xarray' s tilgang af paralleliserede downloads af præ-chunked filer, men uden behovet for at konvertere kildefiler fra .nc og .hdf til chunked xarray filer. Faktisk, ERDDAP 's system er bedre, hvis der er en efterfølgende anmodning om at læse fra samme fil, fordi ERDDAP™ nu har en lokal kopi af filen. Vores samfund har brugt år på at standardisere på .nc og .hdf filer. Nu behøver vi ikke at kaste det ud bare for at få god ydeevne, når lagring af data i AWS S3. Takket være Rich Signell.
         
    * Change: SearchEngine = Lucene er indtil videre forældet. Det er et komplekst system, der ofte giver resultater, som er lidt anderledes end den mere ønskelige adfærd SearchEngine = original. For næsten alle ERDDAP™ installation, tidsbesparelser af Lucene ikke opveje forskellene i resultater. Brug venligst søgemaskine = original i stedet hvis det er muligt. Hvis det giver problemer, så send en e-mail til Bob.
         
    * Lucensøgemaskinen opfører sig nu mere som den oprindelige søgemaskine. Der er ikke længere tilfælde, hvor Lucene tror, at et datasæt matcher og originalen ikke gør. Også Lucenes placeringer nu lige originale placeringer (fordi original nu altid bruges til at beregne placeringerne) .
         
    * BUG FIX: fra en nylig udgivelse ERDDAP™ stoppede med at se mere end de første 1000 objekter i en given AWS S3 spand. Nu ERDDAP™ ser igen alle objekterne. Takket være Andy Ziegler.
         
    * BUG FIX: nu EDDTableAggregate Rækker fjerner actual\\_range attribut når en eller flere af barnets datasæt ikke nogensinde kender dens variabler ' actual\\_range   (f.eks. EDDTableFromDatabase) . Takket være Erik Geletti.
         

## version 2.15{#version-215} 
 (udgivet 2021- 11- 19) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    *    ERDDAP™ har et nyt system til at lade brugerens angive det sprog, der skal bruges til alle websider. Hvis ERDDAP™ installation er indstillet til at bruge det, vil listen over sprog vises i øverste højre hjørne af hver webside. ERDDAP™ URL 'er fra før denne version fortsætter med at virke og altid returnere engelsk indhold, som før.
        
Ikke alle tekster eller alle websider blev oversat. Der var tidsbegrænsninger på dette projekt, der forhindrede Qi og Bob i at komme til 100%.
        
Det indlysende spørgsmål er: Hvorfor har vi lagt så meget kræfter i dette, når Chrome vil oversætte websider på -the- flyve? Svaret er: på denne måde får vi langt mere kontrol over, hvordan oversættelsen sker. Især er der masser af ord, der ikke bør oversættes på websiderne, f.eks. titler og resuméer af datasæt, navne på variabler, parametre, enheder og organisationer. Meget af den oversættelse indsats var at identificere ord og sætninger, der ikke bør oversættes. Også, maskinen oversættelser tendens til at finkæmme visse typer af HTML markup. Håndtering af oversættelse tilladt os at minimere dette problem.
        
Oversættelsesprojektet blev udført af Qi Zeng (en Google Summer of Code praktikant) og Bob Simons ved hjælp af Googles Oversættelse web-service. Det var et stort projekt. Tak. Qi&#33;
        
    * BUG FIX: ERDDAP™ Nu tillader ORCID ID 'er at have X som sidste ciffer. Takket være Maurice Libes.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * AT GØRE:
        
        * Du skal foretage et par ændringer i forbindelse med ERDDAP 's nye system til at lade brugerne angive sproget for websider.
            * På første linje af din setup.xml og datasets.xml filer, ændre til: kodning = "UTF-8" og ændre dokumentets kodning i din teksteditor, så det gemmes som en UTF-8-fil. GenerateDataset Xml nu antager, at datasets.xml er en UTF-8 fil.
            * Programmører, der udarbejder ERDDAP : Alle ERDDAP™ .java-filer skal behandles som UTF- 8-filer som standard. Du kan være nødt til at tilføje "-kodning UTF- 8" til javac kommandolinjen. (Det gjorde jeg.) 
            * For at aktivere dette system (anbefales kraftigt) , i&lt;startBodyhtml5 &gt; tag, som du angiver i datasets.xml , ændre "& amp&#33; loginInfo;" til "& amp&#33; loginInfo; | & amp&#33; language; "så listen over sprog vises i øverste højre hjørne af hver ERDDAP™ Webside.
            *    ERDDAP™ er&lt;startBodyhtml5 &gt; tag, som du angiver i datasets.xml til at angive HTML-indholdet for banneret øverst på hver ERDDAP™ webside, uanset hvilket sprog brugeren vælger. Hvis du ændrer det mærke for at bruge
" &EasierAccessToScientificData; "i stedet for" Lettere adgang til videnskabelige data "og
" &BroughtToYouBy; "i stedet for" bragt til dig af ", ERDDAP™ vil bruge oversatte versioner af disse sætninger i banneret.
            * Ligeledes den nye standard&lt;shortdeskriptionHtml &gt; in datasets.xml er
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
De sidste 3 linjer af indhold er ting, der vil blive erstattet med oversat tekst. Hvis du konvertere nogen af dem (og dette PartikelErddap) eller alle til at udtrykke tekst i datasets.xml   (der har prioritet, hvis de er til stede) eller messages.xml, at teksten vil komme uanset hvilket sprog brugeren vælger. Dette er ikke perfekt, men jeg regnede med, at få administratorer ville redigere&lt;The ShortDescriptionHtml &gt; i 35 forskellige filer for at give 35 forskellige oversatte versioner af dette mærke.
        
          
         
    * ÆNDRINGER: Nogle fejl håndteres nu en smule anderledes og kan derfor tilføjes til "Mislykkede forespørgsler" på statu.html og i den daglige rapport E-mail. Så de tal kan være noget større end før.
         
    * BUG FIX: Generatedataset Xml til EDDGrid og EDDGrid LonPM180 omfatter nu ikke kildedatasæt med datasetID = ~ ".\\*\\ _ LonPM180 "og datasetID = ~ ".\\*Lon0360, hhv.
         

## Version 2.14{#version-214} 
 (udgivet 2021- 07- 02) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    *    (ingen)   
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * NYT: EDDGrid Lon0360 som gør et forankret datasæt med længdeværdier & gt; = 0 og&lt;= 360 fra et forankret datasæt med længdeværdier & gt; = -180 og&lt;= 180. Se [ EDDGrid Lon0360 dokumentation](/docs/server-admin/datasets#eddgridlon0360) . Takket være Dale Robinson.
         
    * NYT: ERDDAP™ administratorer kan nu tilsidesætte enhver værdi i setup.xml via en miljøvariabel navngivet ERDDAP \\ _ _ valueName _ før du kører ERDDAP . Brug ERDDAP \\ _ baseUrl tilsidesætter&lt;baseUrl &gt; værdi. Dette kan være praktisk, når du installerer ERDDAP™ med en beholder, som du kan sætte standard indstillinger i setup.xml og derefter levere særlige indstillinger via miljøvariabler. Hvis du leverer hemmelige oplysninger til ERDDAP™ ved hjælp af denne metode, skal du sørge for at kontrollere, at oplysningerne forbliver hemmelige. ERDDAP™ læser kun miljøvariablerne én gang pr. opstart, i det første sekund af opstart, så en måde at bruge dette er: sæt miljøvariablerne, start ERDDAP™ , vent til ERDDAP™ er startet, derefter frakoble miljøvariablerne. Takket være Marc Portier.
         
    * Hvis nogle filer i en EDDTableFrom... Filer datasæt med en masse filer har nogle meget lange String værdier, datasættet vil indlæse meget hurtigere og reagere på anmodninger meget hurtigere. Tidligere: ERDDAP™ ville tildele en masse plads til min og max String værdier i de filer, der er gemt med fil oplysninger for sådanne datasæt. Den resulterende fil var enorm, hvilket får det til at blive skrevet og læse langsomt. Takket være OBIS.
         
    * Nu, ERDDAP™ gør et bedre stykke arbejde med at fortolke usædvanlige og ugyldige karakter sekvenser i CSV-filer. Takket være OBIS.
         
    * FIX: Efter et års problemer med Cassandra, jeg endelig med succes installeret Cassandra (v2) igen og så var i stand til at køre de test med Cassandra v2. Så nu kan jeg mere trygt sige, at ERDDAP™ arbejder med Cassandra v2 og v3. Takket være ONC.
         

## Version 2.12{#version-212} 
 (udgivet 2021- 05- 14) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * BUG FIX: Hvis du er på sortlisten over abonnementer, kan du nu ikke bede om en liste over dine abonnementer.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * AT GØRE: NEW: system til automatisk at begrænse muligheden for ondsindede brugere og alt for aggressive legitime brugere til at foretage et stort antal samtidige anmodninger, som ville forringe systemets ydeevne for andre brugere. Der er 3 nye valgfrie tags i datasets.xml som du kan / bør tilføje lige efter&lt;GraphBackgroundColor &gt;:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

For yderligere oplysninger, se [ipadressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests) . ERDDAP™ udskriver nu også "Antal unikke brugere (siden opstart) "på Status.html side.
Takket være den person i Kina angriber min ERDDAP™ installation.
         
    * ÆNDRING til Postgresql driver adfærd: Da jeg opdaterede Postgresql driver, kolonnen navne i tabellisten genereret af Postgresql og GenerateDatasetsXml kom tilbage alle uppercase, i stedet for alle lavcase, som før. Jeg ved ikke, om det vil påvirke andre ting, da databaser ofte anser disse navne for at være sagen ufølsomme. Mit testdatasæt fungerer stadig korrekt. Men hvis dit datasæt holder op med at arbejde med dette ERDDAP™ opdatering, dette er den mulige årsag til at forfølge først.
         
    * BUG FIX: ERDDAP™ nu også håndterer private AWS S3-filer korrekt. Der var andre relaterede forbedringer til håndtering af AWS S3-filer. Takket være Michael Gangl og Dylan Pugh.
         
    * NYT: EDDGrid FromNcFiles og EDDGrid FromNcFiles Udpakket kan nu læse data fra "strukturer" i .nc 4 og .hdf 4 filer. For at identificere en variabel, der er fra en struktur,&lt; sourceName &gt; skal bruge formatet: _ fullStructureName _ | _ medlemName _, for eksempel group1 / myStruct | Mit medlem. Takket være NRL.
         
    * ÆNDRINGER: nu, hvis den aktuelle hukommelse forbrug plus denne anmodning er endda lidt høj, griddap sæt nThreads for denne anmodning til 1. Således ERDDAP™ bevarer hukommelsen, når hukommelsen er knap. Takket være den person i Kina angriber min ERDDAP™ installation.
         
    * NYT system til overvågning af antallet af åbne filer (som omfatter stikdåse og andre ting, ikke bare filer) i Tomcat på Linux-computere. Hvis nogle filer fejlagtigt aldrig få lukket, kan antallet af åbne filer stige, indtil det overstiger det maksimalt tilladte og mange virkelig dårlige ting sker. Så nu, på Linux-computere (oplysningerne er ikke tilgængelige for Windows) :
        
        * Der er en ny "Open Files" kolonne på den yderste højre af statu.html webside, der viser den procent af max-filer åbne. På Windows viser det bare "?".
        * Hvornår ERDDAP™ genererer denne information i slutningen af hver større datasæt genindlæsning, vil det udskrive til loggen. txt- fil:
openFileCount = _ current _ of max = _ max _% = _% _
        * Hvis procentsatsen er &gt; 50%, sendes en e-mail til ERDDAP™ administrator og e-mail Alt Til e- mail- adresser.
        
For at finde ud af mere, eller hvis du ser dette problem på din ERDDAP™ , se [For mange åbne filer](/docs/server-admin/additional-information#too-many-open-files) .
Takket være den person i Kina angriber min ERDDAP™ installation.
         
    * NEW: Jeg tilføjede en masse kontrol for og håndtering af "For mange åbne filer", så opgaven bare stopper og brugeren ser fejlmeddelelsen. Datafiler vil ikke længere være markeret som dårlig, hvis læsning dem resulterer i en "For mange åbne filer" fejl.
         
    * NYT \\[ Big ParentDirectory \\] / badFilesFlag mappe:
Hvis du sætter en fil i denne mappe med en datasetID som filnavn (filindholdet er ligegyldigt) , ERDDAP™ vil slette badFiles .nc fil for det datasæt (om nogen) og genindlæs datasættet ASAP. Dette medfører ERDDAP™ at prøve igen at arbejde med filerne tidligere (Forkert?) Mærket er slemt. Takket være Marco Alba.
         
    * Ved opstart, hvis en EDDGrid Fra... filer eller EDDTableFrom... Filer dataset oprindeligt har 0 filer i sin liste over kendte gyldige filer (f.eks. er det et nyt datasæt) , så ERDDAP™ defaers indlæsning og sætter et flag, så det vil blive indlæst ASAP efter de store loadDataset er færdig. Dette fremskynder den indledende opstart, når der er nye datasæt.
         
    * ÆNDRINGER: FileVisitorDNLS.testAWSS3 () og FileVisitorSubdir.testAWSS3 () ; nu bruge AWS v2 (ikke v1) SDK. Så nu Git ERDDAP™ distribution omfatter nu alle nødvendige filer, og du behøver ikke længere manuelt tilføje den massive v1 AWS SDK jar fil.
         
    * Jeg skiftede til at bruge Maven til at opdage / samle afhængigheder. (The .jar files in / lib) . Ændringen til v2 af AWS SDK nødvendiggjorde dette. Det vil være nødvendigt for andre importerede koder i fremtiden. En enorm tak til Kyle Wilcox der gav den pom.xml han skabte og bruger, hvilket løste flere problemer for mig.
         
    * ÆNDRINGER: Parameteren for klassestien (- cp) bruges i GenerateDatasetXml, DasDds og andre små programmer, der kommer med ERDDAP™ , og i rådet til programmører er nu meget enklere og bør aldrig nogensinde ændre sig igen, da det henviser til mappen, ikke de enkelte filer:
\\ - cp klasser; C:\\ programmer\\ _ tomcat\\ lib\\ servlet- api.jar; lib\\ *
         (eller ':' i stedet for ';' for Linux og Macs) .
         (Jeg skulle have gjort det for mange år siden, da det blev en mulighed.)   
         
    * NYT: Generatedataset Xml har en ny nytte mulighed: findDuplicateTime, som vil søge gennem en samling af brogede .nc   (og beslægtede) filer til at finde filer med duplikerede tidsværdier. Se [findDuplicate Tid](/docs/server-admin/datasets#findduplicatetime)   
         
    * NYT: datasets.xml kan nu omfatte en&lt;paletter &gt; tag, som tilsidesætter&lt;paletter &gt; mærkeværdi fra messages.xml (eller vender tilbage til messages.xml værdi, hvis den er tom) . Dette lader dig ændre listen over tilgængelige paletter, mens ERDDAP™ er på flugt. Også, hvis du har en cptfiles undermappe i ERDDAP™ indholdsmappe ERDDAP™ vil kopiere alle\\ *. cpt filer i denne mappe i \\[ tomcat \\] / webapps / erddap / WEB- INF / cptfiles mappe hver gang ERDDAP™ starter op. Tilsammen lader disse ændringer dig tilføje paletter og få ændringerne til at vare ved, når du installerer en ny version af ERDDAP . Se [dokumentation for paletter](/docs/server-admin/datasets#palettes)   
Takket være Jennifer Sevadjian, Melanie Abecassis og måske andre CoastWatch-folk.
         
    * ÆNDRING: [&lt;lowDownTroubleMillis &gt;] (/ docs / server- admin / datasæt # slowdowntroublemillis) er nu brugt til alle mislykkede anmodninger, ikke blot nogle få typer.
         
    * ÆNDRINGER: RunLoadDataset tråden afbryder nu LoadDataset tråden på 3 / 4 LoadDataset MaxMinutter så der er mere tid til LoadDataset til at bemærke afbrydelse og exit elegant. Der er også flere og bedre diagnostiske beskeder til dette.
         
    * ÆNDRINGER fra den gamle version af Lucen til v8.7.0.
         
    * ÆNDRINGER: e-mails sendt af ERDDAP™ Nu vises med en fast bredde skrifttype.
         
    * Change: EDDGrid FromFiles får nu akseværdier samt attributter fra FIRST | LAST-fil, som angivet i&lt;metadataFrom &gt;. Tak. (ikke) til Ken Casey, et al.
         
    * Tilføj understøttelse for de ugyldige enheder "grad\\ _ North" og "grad\\ _ East", som fejlagtigt bruges af de seneste filer (fra 2020- 10- 01) i AVHRR Pathfinder Version 5.3 L3- Farvelagt (L3C) SST datasæt (nceiPH53 sst d1day og nceiPH53 sst n1day) . ERDDAP™ kan nu standardisere dem til gyldige enheder. Tak. (ikke) til Ken Casey, et al.
         

## Version 2.11{#version-211} 
 (udgivet 20- 12- 04) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * BUG FIX: OrderByMean kastede en NullPointerExemption, hvis en variabel havde blot en af\\ _ FillValue eller mangler\\ _ Værdi defineret. Nu håndterer den situationen korrekt. Takket være Marco Alba.
         
    * BUG FIX: Der var problemer med ODV tekstfiler oprettet af ERDDAP™ i v2.10. De problemer er løst. Takket være Shaun Bell.
         
    * BUG FIX: Bare ind ERDDAP™ v2.10: Hvis de lat lon grænser blev angivet i URL, den bounding boks blev ikke tegnet på verdenskortet. Nu er det igen. Takket være John Maurer.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * BUG FIX: Bare ind ERDDAP™ v2.10: Scriptfilerne for ArchiveADataset, GenerateDataets Xml og DasDds virkede ikke, fordi de ikke havde de ændringer i klassestien, som blev tilføjet med ERDDAP™ V2.10. Takket være Marco Alba.
         
    * NYT: datasets.xml , kan du nu have mærket:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

I øjeblikket, hvis det er sandt (eller hvis mærket er tomt, eller hvis mærket ikke er i filen) når en brugers anmodning fører til en NullPointerExemption ERDDAP™ vil e-mail stack spor til erd.data at noaa.gov   (i ERDDAP™ udviklingsteam) . Dette bør være sikkert og sikkert, da ingen fortrolige oplysninger (F.eks. anmodningerne) er inkluderet i mailen. Dette bør gøre det muligt at fange alle obskure, helt uventede bugs, der fører til NullPointerExceptions. Ellers ser brugeren undtagelserne, men ERDDAP™ udviklere ikke, så vi ved ikke, at der er et problem, der skal rettes.
        
Det er muligt, at dette mærke vil føre til andre lignende diagnostiske oplysninger sendes til erd.data at noaa.gov i fremtiden. E-mailens indhold vil altid være minimal og relateret til fejl, og ikke, for eksempel, brugsoplysninger. Takket være Marco Alba.
         
        
    * ÆNDRET: Nu, fælles komprimerede filtyper ( .bz2 , .gz , .gzip , .tar , .tgz , .z , .zip ) er også forbudt for byte range anmodninger. Dette angives via&lt;extensionsNoRangeRequests &gt; in messages.xml.
         
    * KUN PROBLEM: Som ved ERDDAP™ 2.10, .nc ml filer, der forsøger at ændre en attribut, ikke ændre attributten. Dette er en kendt fejl i netcdf- java som jeg har rapporteret og de siger vil blive rettet i den næste udgivelse af netcdf- java.
         

## Version 2.10{#version-210} 
 (udgivet 20- 11- 05) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * NYT: [Interpolat](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) konverter interpolerer effektivt værdier fra et forankret datasæt værdier. Som sådan er det især nyttigt for forskere, der arbejder med data om dyrespor. Denne konverter tager i en tabel med bredde, længde og tid kolonner (og måske andre kolonner) og returnerer en tabel med yderligere kolonner med interpolerede værdier. Dette svarer således til den populære [Xtracit](https://coastwatch.pfeg.noaa.gov/xtracto) script oprindeligt skabt af Dave Foley, men tilbyder den fordel at behandle op til 100 point per anmodning. Tak til Dave Foley og Jordan Watson ( NMFS ) .
         
    * FORBEDRING: Avanceret søgning er nu streng for ikke-.html anmodninger. Det vil nu smide undtagelser for anmodninger, der har permanente fejl (f.eks. anmodninger, hvor minLat &gt; maxLat) eller midlertidige fejl (F.eks. anmodninger om en standard\\_name der ikke eksisterer) . For .html anmodninger, Advanced Search er uændret: som med Google søgninger, gør det sit bedste og lydløst rettelser eller ignorerer fejl. Takket være Rich Signell.
         
    * FORBEDRING: Kortet på siden Avanceret søgning er nu større (du skal stadig knirke, men mindre) og betydeligt mere præcis (men stadig ikke perfekt) . Takket være John Maurer.
         
    * FORBEDRING: The "Draw land maske" indstilling på Make A Graph websider og & .land =... indstilling i URL 'er, der anmoder om et kort nu understøtter to flere muligheder:
"omrids" trækker bare landmasken omrids, politiske grænser, søer og floder.
"off" trækker ikke noget.
Se [&. land =... dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) .
Takket være John Maurer.
         
    * FORBEDRING: Grafer og kort skabt af ERDDAP™ kan nu bruge tre nye markørtyper: Borderless fyldt plads, borderless fyldt cirkel, borderless fyldt op trekant. Koden for dette blev bidraget af Marco Alba af ETT / EMODnet Fysik. Takket være Marco Alba.
         
    * NYT: "files" system understøtter nu plain Filtype svar (.csv .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv eller .xhtml .) f.eks. [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) .
Takket være Kyle Wilcox.
         
    * FORBEDRING: De webadresser, der genereres, når en bruger bruger en dataadgangsformular (html) eller en Make- A- Graph (.graph) Webside nu korrekt - indkode tegnene \\[ og \\] . Dette gør webadresser lidt sværere for mennesker at læse, men er bedre fra et web- sikkerhed synspunkt. Administratorer har nu mulighed for at indstille relaxedQueryChars = ' \\[  \\]  | 'i Tomcat server.xml fil (mindre sikker) eller ikke (mere sikker) .
Takket være Antoine Queric, Dominic Fuller- Rowell, og andre.
         
    * NYT: Hvis en anmodning til en EDDTable datasæt omfatter & tilføje Variabler hvor (_ attribut Navn, attribut Værdi _) , ERDDAP™ vil tilføje alle variabler, der har _ attribut Navn = attribut Værdi _ til listen over ønskede variabler.
Se [& Tilføj Variabler Hvis dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) . Takket være Aurelie Briand, et al.
         
    * ÆNDRET: ERDDAP™ nu nægter byte range anmodninger til / filer / .nc eller .hdf filer. Forsøg ikke at forbinde til fjernbetjening .nc eller .hdf filer som om de var lokale filer. Det er forfærdeligt ineffektivt og skaber ofte andre problemer. I stedet:
        * Anvendelse(OPeN)DAPclient software til at oprette forbindelse til ERDDAP 's DAP tjenester i forbindelse med dette datasæt (som har / griddap / eller / tabledap / i URL 'en) . Det er hvad DAP er for.
        * Brug datasættets dataadgangsformular til at anmode om en delmængde af data.
        * Hvis du har brug for hele filen eller gentagen adgang over en lang periode, skal du bruge curl , wget , eller din browser til at downloade hele filen, og derefter få adgang til data fra din lokale kopi af filen.
             
    * FORBEDRING: Txt output option er blevet omskrevet til at understøtte den nye version af ODV .txt filer og til støtte for korrekt repræsentation af bane, timeserier og profildata.
         
    * FORBEDRING: Nu, søgetermer i dobbelte citater fortolkes som en json streng, så de kan have\\ kodede tegn. Dette giver dig bl.a. mulighed for at søge efter en nøjagtig match for en attribut, fx, "institution = NOAA  \\n "vil ikke matche et datasæt med institution = NOAA   NMFS . Takket være Dan Nowacki.
         
    * FORBEDRING: Yderligere steder, flydende punkt numre (specielt flyder konverteret til doubler) nu vises som en lidt mere afrundet version af antallet i ekstra steder, f.eks. en float tidligere vist som en dobbelt som 32.27998779296875, kan nu vises som 32.28. Takket være Kyle Wilcox.
         
    * BUG FIX: usignerede heltal lydfiler blev læst lidt forkert. Nu læses de rigtigt.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * ADVARSEL: Første gang du kører ERDDAP™ v2.10, nogle datasæt baseret på lokale datafiler vil indlæse **Meget** langsomt fordi ERDDAP™ har brug for at genskabe sin database af fil information. Efter den langsomme genfyldning, vil de indlæse hurtigt, som før. Vær tålmodig.
         
    * Ting du skal gøre:
        * Når du først kører v2.10, nogle datasæt kan ikke indlæse, fordi ERDDAP™ er nu strengere om nogle metadata. Som før, ERDDAP™ vil e-mail dig en Daily Report, når det første indlæses. Det vil omfatte fejlmeddelelser for hver af de datasæt, der ikke indlæse. Læs fejlmeddelelserne for at finde ud af problemerne. I de fleste tilfælde skal du blot foretage en lille ændring af datasættets metadata for at løse problemet.
             
        * I datasets.xml , søg efter&lt; sourceName & gt; = (Bemærk: '=' er [fikseret værdi sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) . For de fleste ERDDAP™ opsætninger, disse er sjældne. Hvis nogen af værdierne efter '=' er strenge (Ikke numre) , skal du nu lukke strengen i dobbelt citater. For eksempel:
Før:&lt; sourceName & gt; = KZ401&lt;/ sourceName &gt;
Efter:&lt; sourceName & gt; = "KZ401"&lt;/ sourceName &gt;
             
        * NYT: Der er en ny valgfri indstilling i setup.xml,&lt;defaultAccessibleViaFiles &gt;, som sætter standarden&lt;AccessibleViaFiles &gt; for hver af datasættene. Standard for dette nye mærke er falsk, hvilket efterligner den tidligere ERDDAP™ adfærd. Denne indstilling af lavere niveau kan tilsidesættes af en given datasæt&lt;AccessibleViaFiles &gt; indstilling.
            
ANBEFALET (fordi der er brugere, der ønsker dette) :
Hvis du vil lave alt EDD... FromFiles datasæt tilgængelige via filsystemet, så
            
            1. Tilføj dette mærke til din setup.xml fil:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Valgfrit) Fjern alle
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
er datasets.xml da standarden nu er sand.
                 
        * Tilføj\\ _ FillValue attributter:
             ERDDAP™ bruges til at have en standard\\ _ FillValue for alle heltal variabler: den maksimale værdi af datatypen (f.eks. 127 for byte-variabler) . Nu gør det ikke. For at undgå at disse værdier vises som dataværdier (ikke manglende værdier) , skal du udtrykkeligt angive disse via\\ _ FillValue attributter. Fra nu af, hver gang du starter op ERDDAP™ , det vil sende administratoren en e-mail med en .csv tabel med en liste over heltal kilde variabler, som ikke har\\ _ FillValue eller missing\\_value attributter og de foreslåede nye\\ _ FillValue attributter. Se [Tilføj\\ _ Fyld Værdiattributter](/docs/server-admin/datasets#add-_fillvalue-attributes) for mere information og instruktioner.
             
        * Hvis du kompilerer ERDDAP™ , du er nødt til at ændre classpath parameter på javac kommandolinjerne for at tilføje en reference til disse nye krukker: lib / common-jexl.jar; lib / aws- java- sdk.jar; lib / jackson- annotations.jar; lib / jackson- core.jar; lib / jackson- databa.jar.
             
    * ÆNDRINGER: Tomcat 9 er nu den anbefalede version af Tomcat for ERDDAP . Den seneste version af Tomcat 8,5 + er også fint for nu. Vi gjorde rent. ERDDAP 's [Monteringsanvisning for tomat](/docs/server-admin/deploy-install#tomcat) .
        
Den seneste version af Java 8 (ikke Java 9, 10, 11,...) fra [AdoptOpenJDK](https://adoptopenjdk.net/) forbliver den anbefalede version af Java til ERDDAP . Java 8 har Long Term Support fra AdoptOpenJDK, så det forbliver sikkert at bruge, men husk at få den nyeste version af det regelmæssigt af sikkerhedsmæssige årsager.
        
    * NYT: Script SourceNames / afledte variabler i tabeldatasæt
EDDTableFromFiles, EDDTableFromDatabase, og EDDTableFromNames datasæt kan nu omfatte udtryk og scripts i sourceName . Dette lader dig lave nye variabler baseret på eksisterende variabler i kildefilerne. Beregningen for en given ny variabel foretages inden for en række af resultaterne, gentagne gange for alle rækker. For eksempel at lave en længdevariabel med værdier i området -180 - 180 ° fra en variabel med værdier i området 0 - 360 °:
        &lt; sourceName & gt; = Math2.anglePM180 (row.columnDouble ("lon") ) &lt;/ sourceName &gt;
For yderligere oplysninger, se [Script SourceNavne](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
Takket være Bob Simons (som planlagde dette før ERDDAP™ v1.0 og endelig fundet en måde at gennemføre det) , Kevin O 'Brien, Roland Schweitzer, John Maurer, og Apache JEXL biblioteket for at gøre den virkelig svære del (og gør det godt) .
         
    * NYT: Ikke-signerede heltal datatyper (ubyte, ushort, uint, ulong) er nu støttet. Bemærk at mange filtyper (f.eks. .das, .dds .nc 3) støtter ikke alle disse nye datatyper. Se [Data Typedokumentation](/docs/server-admin/datasets#data-types) for detaljer om hvordan ERDDAP™ om disse forskelle. I særdeleshed siden(OPeN)DAP, især den .dds svar, understøtter ikke underskrevet bytes, longs, eller ulongs, kan du ønsker at bruge ERDDAP 's tabulær repræsentation af .das og .das som set i http ... / erddap / **info** / _ datasetID _ html webside (f.eks. [ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) som du også kan få i andre filtyper eller .nccsv Metadata respons (f.eks. [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) , som begge understøtter alle datatyper i alle situationer.
        
ADVARSEL: For datasæt, der er påvirket af denne ændring, er det muligt, at du vil se problemer med datasættet, fordi de data, der ERDDAP™ læsning fra kilden kan være anderledes (F.eks. kan variabler, der tidligere er læst som underskrevne heltal, nu læses som ikke-underskrevne heltal.) . De deraf følgende problemer omfatter: nye filer ikke bliver tilføjet til datasættet, og / eller fejl, når du forsøger at få adgang til data. Hvis et datasæt har problemer, den første ting at forsøge er at [sætte en hård Flag](/docs/server-admin/additional-information#hard-flag) til datasættet. Hvis det ikke løser problemet, skal du se på loggen. txt for at se fejlmeddelelser, dykke ned i datasets.xml for datasættet, og / eller måske genkøre generateDatasets.xml for datasættet.
Takket være netcdf- java 5.x (som tvang problemet) og den kommende CF 1.9.
        
    * Der er nu [bedre dokumentation / rådgivning](/docs/server-admin/datasets#s3-buckets) for hvordan man opretter et datasæt fra filer i AWS S3 spande. Takket være Micah Wengren.
         
    * ÆNDRING: Der er flere ændringer i forbindelse med "files" system.
        * Koden til at håndtere dette blev omskrevet for at kunne bruges af flere klasser.
             
        * NEW: Brugeranmodninger til mappe lister kan nu anmode om, at svaret være en af de standard plain tabel typer ved at vedlægge den ønskede filendelse: .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv eller .xhtml ). For eksempel:
             [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
Takket være Kyle Wilcox og Shane St Savage.
             
        * Nu, Generér Datasæt Xml vil ikke omfatte en&lt;AccessibleViaFiles &gt; tag i uddata. Antagelsen er, at datasættet vil stole på værdien af den nye&lt;defaultAccessibleViaFiles &gt; tag i setup.xml. Se [tilgængelig ViaFiles](/docs/server-admin/datasets#accessibleviafiles) .
             
        * FORBEDRING: Yderligere datasæt understøtter nu tilgængelige ViaFiles: EDDGrid SideBySide EDDGrid AggregateExistingDimension EDDGrid FromErddap, EDDTableFromErddap EDDGrid FromEDDTabel, EDDTableFrom EDDGrid , og EDDGrid FromEtopo. For disse, filerne fra en given fjern / barn datasæt vil kun være tilgængelige, hvis både forældre og fjern / barn datasæt har adgang ViaFiles sat til true (måske via&lt;defaultAccessibleViaFiles &gt;). Takket være Damian Smyth og Rob Fuller.
             
        * TIL / ANBEFALING: Vi anbefaler at gøre alle relevante datasæt tilgængelige via filsystemet ved indstilling&lt;defaultAccessibleViaFiles &gt; til true i setup.xml, fordi der er en gruppe af brugere, for hvem dette er den foretrukne måde at få data. Det hedder i domskonklusionen: "files" system gør det nemt for brugerne at se, hvilke filer der er tilgængelige, og hvornår de sidst ændret, hvilket gør det nemt for en bruger at vedligeholde deres egen kopi af hele datasættet. Hvis du generelt ikke ønsker at gøre datasæt tilgængelige via filsystemet, indstille&lt;defaultAccessibleViaFiles &gt; til false. I begge tilfælde, bare brug&lt;accessibleViaFiles &gt; for de få datasæt, der er undtagelser fra den generelle politik fastsat af&lt;defaultAccessibleViaFiles &gt; (f.eks. når datasættet anvendes .nc ml filer, som ikke er rigtig nyttige for brugerne) .
             
    * FORBEDRING: Nu, hvis en kilde datasæt har CF grid\\ _ mapping information, generere Datasæt Xml for behæftede datasæt vil tilføje oplysninger til globale&lt;addatts &gt;, og oplysningerne vil blive tilføjet til globale&lt;sourceAtts &gt; Hver gang data læses fra filen. Oplysningerne vises i datasættets globale attributter som et sæt attributter med præfix-gitteret\\ _ mapping\\ _.
         
    * FORBEDRING: Støtte til grupper ved læsning .nc 4 (og til en vis grad i .hdf 5) filer. ge ERDDAP™ datasættet vil blive konstrueret ud fra variablerne i en af filens grupper. Også, Generatedataset Xml til EDDGrid FromNcFiles og EDDGrid FromNcFiles Udpakket nu beder om en "gruppe" (f.eks. "" for alle grupper "," someGroup "," someGroup / someSubGroup "eller" \\[ rod \\] "for bare rodgruppen) . Takket være Charles Carleton og Jessica Hausman.
         
    * FORBEDRING: Generatedataset Xml til EDDGrid FromNcFiles og EDDGrid FromNcFiles Udpakket nu understøtter en valgfri "DimensionsCSV" parameter, som lader dig angive kildenavne for de dimensioner, du ønsker dette datasæt at bruge. Brug "" for at få de variabler, der bruger de fleste dimensioner, som før. Også en relateret lille fejl, der opstod med denne type fil er nu rettet. Takket være Sujal Manandhar.
         
    * BUG FIX: Generatedataset Xml nu korrekt lister "EDDTableFromJsonlCSVFiles" (ikke "EDDTableFromJsonlCSV") som en af EDDType-mulighederne. Takket være Andy Ziegler.
         
    * FORBEDRING: EDDGrid FromNcFiles Upakkede nu standardiserer "enheder" attributter til standard / "kanoniske" udenheder (den samme metode som Enhedskonverteren) . For eksempel: "meter per second" , "meters/second" , "m.s^-1" , og "m s-1" bliver alle "m s-1" . Takket være Andy Ziegler.
        
ADVARSEL: Det er muligt, at dette vil forårsage problemer for nogle eksisterende datasæt (f.eks. få nye filer til at blive mærket "dårlige") . I bekræftende fald [sætte en hård Flag](/docs/server-admin/additional-information#hard-flag) for datasættet, så alle kildefiler vil blive genlæst med det nye system.
        
    * Nu, en variabel er&lt; sourceName &gt; kan angive en fast værdi af = NaN og variablen kan have en actual\\_range attribut som angiver et begrænset interval. Dette er undertiden nyttigt, så et datasæt (især et EDDTableFromFileName datasæt) kan have dummy variabel (s)   (f.eks. breddegrad, længdegrad, tid) med faste NaN-værdier, men med en gyldig actual\\_range   (som fastsat af attributten) . Så i Advanced Search en bruger kan søge efter datasæt, der har data i en bestemt breddegrad, længdegrad, tidsinterval og dette datasæt vil være i stand til at sige, at det har relevante data (selv om alle de faktiske rækker af data vil vise NaN) . Se [Dokumentation for fast værdi](/docs/server-admin/datasets#fixed-value-sourcenames) .
Takket være Mathew Biddle.
         
    * Nu, den datasets.xml chunk for en EDDTableFromAsciiFiles eller EDDTableFromColumnarAsciiFiles datasæt kan omfatte et tag, der fortæller ERDDAP™ at ignorere alle linjer øverst i filen til og med den linje, der matcher det angivne regulære udtryk. For eksempel:
        &lt;skipHeaderToRegex &gt;\\\*\\\*\\\*Leder.\\*&lt;/ skipHeaderToRegex &gt;
vil ignorere alle linjer op til og inklusive en linje, der starter med "\\*\\** * HEADER ". Se [&lt;skipHeaderToRegex &gt; dokumentation] (/ docs / server- admin / datasæt # skipheadertoregex) .
Takket være Eli Hunter
         
    * Nu, den datasets.xml chunk for en EDDTableFromAssciiFiles eller EDDTableFromColumnarAssciiFilesdataset kan indeholde et mærke, der fortæller ERDDAP™ at ignorere alle linjer i filen som matcher det angivne regulære udtryk. For eksempel:
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

vil springe alle linjer, der starter med "#". Se [&lt;skipLinesRegex &gt; dokumentation] (/ docs / server- admin / datasæt # skiplinesregex) .
Takket være Eli Hunter.
         
    * NYT: datasets.xml chunk for ethvert EDDTable datasæt kan nu omfatte & add Variabler hvor (NamesCSV.) . Hvis det gør, ERDDAP™ vil tilføje en kontrol for hver af de angivne attributter Navne på datasættets dataadgangsformular (html webside) at gøre det nemt for brugere at tilføje og tilføje Variabler hvor (_ attribut Navn, attribut Værdi _) til anmodningen.
Se [& Tilføj Variabler Hvis dokumentation](/docs/server-admin/datasets#addvariableswhere) .
Takket være Aurelie Briand, et al.
         
    * NYT Tretten-part værktøj: ERDDAP -lint
         ERDDAP -lint er et program fra Rob Fuller og Adam Leadbetter af Irish Marine Institute, som du kan bruge til at forbedre metadata af din ERDDAP™ Datasets. ERDDAP -lint "indeholder regler og en simpel statisk web-program til at køre nogle verifikationstest mod din ERDDAP™ server. Alle tests køres i webbrowseren ". Som [Unix / Linux lint- værktøj](https://en.wikipedia.org/wiki/Lint_(software) ), kan du redigere de eksisterende regler eller tilføje nye regler. Se [ ERDDAP -lint](https://github.com/IrishMarineInstitute/erddap-lint) for mere information.
        
Dette værktøj er især nyttigt for datasæt, som du skabte for nogen tid siden, og nu ønsker at bringe up- to- date med dine nuværende metadata præferencer. For eksempel tidlige versioner af GenerateDataset Xml gjorde ikke noget for at skabe global creator\\_name , creator\\_email , skaber\\ _ type, eller creator\\_url metadata. Du kunne bruge ERDDAP -lint til at identificere de datasæt, der mangler disse metadata attributter.
        
Tak til Rob og Adam for at skabe dette værktøj og gøre det tilgængeligt for ERDDAP™ fællesskab.
        
    * NEW: Nu er det okay, hvis nogle af filerne i en EDDGrid FromFiles datasæt har ikke alle datasættets variabler. Filerne vil blive inkluderet som om de havde variablerne (med alle manglende værdier) .
Takket være Dale Robinson og Doug Latornell.
         
    * NYT: Der er nye brugsstatistikker i logfilen og Daily Report til at hjælpe administratorer identificere de brugere, der forårsager hukommelsesproblemer. Statistikkerne hedder "OutOfMemory (Arraystørrelse) "," OutOfMemory (For stor) ", og" OutOfMemory (Alt for stor) ". De viser IP-adresser på de brugere, der har fremsat anmodninger i disse kategorier, og antallet af anmodninger, de har fremsat. Hvis der ikke var nogen besværlige anmodninger, vil disse statistikker ikke forekomme." OutOfMemory (Arraystørrelse) "og" OutOfMemory (Alt for stor) "anmodninger er normalt ikke et problem, fordi anmodningerne var så store, at ERDDAP™ fangede dem hurtigt og returnerede en fejlmeddelelse. The "OutOfMemory (For stor) "anmodninger er farligere, fordi ERDDAP™ gjort en indsats, før det indså, at der ikke var nok hukommelse i øjeblikket til at håndtere anmodningen (selv om problemet kan være andre anmodninger lige før disse anmodninger) .
        
Der er også nye statistikker ved navn "Large Request, IP-adresse", der viser IP-adresser på de brugere, der gjorde store anmodninger (i øjeblikket, gridded .nc filer &gt; 1GB) .
        
Også tidsserietabellen på statu.html side indeholder nu en "memFail" kolonne, der viser antallet af anmodninger, der mislykkedes med "OutOfMemory (For stor) "fejl siden sidste store load datasæt. Et andet tal end 0 her giver i det mindste anledning til bekymring.
Takket være Bob Simons.
        
    * NYT: Den nye version af Hyrax viser mappelister anderledes end før. ERDDAP™ kan nu læse de gamle og nye kataloger.
         
    * NYT: Datasæt genindlæser og brugersvar, der tager &gt; 10 sekunder at afslutte (med eller uden succes) er markeret med " (&gt; 10 'ere&#33;) ". Således kan du søge log.txt fil for denne sætning for at finde de datasæt, der var langsomme til at genindlæse eller forespørgslen nummer af de anmodninger, der var langsomme til at afslutte. Du kan derefter se højere i log.txt fil for at se, hvad datasættet problem var, eller hvad brugeren anmodning var, og hvem det var fra. Disse langsomme datasæt belastninger og brugeranmodninger er undertiden beskattes på ERDDAP . Så at vide mere om disse anmodninger kan hjælpe dig med at identificere og løse problemer.
    * FORBEDRING: ved validering af et CF DSG-datasæt, ERDDAP™ nu sikrer, at variabler med ic\\ _ rolleattributter er i den tilsvarende cdm\\ _...\\ _ variabler liste og ikke er i andre cdm\\ _...\\ _ variabler lister. For eksempel, hvis en timeseriesProfile datasæt har en "station\\ _ id" variabel, som har den f\\ _ rolle = timeseries\\ _ id attribut, så "station\\ _ id" skal være i den se\\ _ timeseries\\ _ variable liste, men må ikke være i den se\\ _ profil\\ _ variabler liste.
Takket være Micah Wengren.
         
    * FORBEDRING: 'Forenkling' er nu hurtigere, bruger mindre hukommelse, og kan returnere LongArray. Takket være Unidata .
         
    * FORBEDRING: QuickGenstart er nu betydeligt hurtigere for EDDTableFrom (nc- relateret) Filer (undtagen EDDTableFromNcCFFiles og EDDTableFromInvalidCRAFIles) fordi gøre Forventet (og et andet sted) nu bare læser prøve filens metadata i stedet for at læse alle data. Takket være Jessica Austin.
         
    * FORBEDRING: Der er nu støtte til tidsstrenge med præcision større end to- the- millisekund, hvis de ekstra cifre er alle 0 'er, f.eks. "2020- 05- 22T01: 02: 03.456000000Z". Takket være Yibo Jiang.
         
    * FORBEDRING: GenerateDatasettsXml 's EDD.DESTINationName bruges til at fjerne' ('og alt efter. Nu fjerner det (.\\*) kun hvis det er enden på sourceName . Nu fjerner det også \\[ .\\* \\] kun hvis dette er enden på sourceName . Takket være Julien Paul.
         
    * FORBEDRING: Generatedataset Xml nu gør variablen destinationName s unikke ved tilføjet\\ _ 2,\\ _ 3,..., efter behov. Takket være Julien Paul.
         
    * FORBEDRING: Når Calendar2.parseDateTime parses dd, hh eller HH, kan det første 'ciffer' nu være et rum.
    * KUN PROBLEM: Start med ERDDAP™ 2.10, .nc ml filer, der forsøger at ændre en attribut, ikke ændre attributten. Dette er en kendt fejl i netcdf- java som jeg har rapporteret og de siger vil blive rettet i den næste udgivelse af netcdf- java.
         
    * BROKEN LINKS FIX: Jeg lavede et rigtigt system til test for brudte links i ERDDAP™ websider, så der nu skal være meget få brudte links (i hvert fald fra hver udgivelsesdato -- nye brudte links opstår ofte) .
         
    * BUG FIX: EDDTableFromHttpGet mislykkedes med visse typer af anmodninger. Nu gør det ikke. Takket være Emma på BODC.
         
    * BUG FIX: For at håndtere nogle anmodninger, EDDTable lavet en midlertidig fil for hver anmodet variabel, med et filnavn slutter i variablens navn. Hvis variablens navn også var en type komprimering (f.eks. .Z) , ERDDAP ville prøve (og mislykkes) til at dekomprimere den midlertidige fil. Nu ender de midlertidige filnavne. Takket være Mathew Biddle.
         
    * BUG FIX: GenerateDatasetsXml og Calendar2.convertTo Java DateTime Format er nu langt mindre tilbøjelige til at foretage en forkert ændring, når du forsøger at fastsætte en muligvis ugyldig dato tidsformat. Især, ingen automatisk foreslået dateTime format vil blive ændret. Takket være Mathew Biddle.
         
    * BUG FIX: Hvis der var en fejl, mens få indhold fra en ekstern URL, og hvis errorStream indhold er komprimeret, ERDDAP™ nu korrekt dekomponerer fejlmeddelelsen. Takket være Bob Simons.
         
    * BUG FIX:&lt;subscribeToRemoteErddapDataset &gt; blev ikke anvendt, når EDD... FromErddap datasæt var et barn datasæt. Nu er det. Takket være Chris Romsos.
         
    * BUG FIX: Generatedataset Xml mener ikke længere en kilde variabel navn startende med "latin" kan være breddegrad. Takket være Vincent Luzzo.
         
    * BUG FIX: Nu er en OutOfMemoryError, mens du læser en datafil, mens behandling af en brugers anmodning er ikke en grund til at tilføje en fil til BadFiles listen. Takket være Bob Simons.
         

## Version 2.02{#version-202} 
 (udgivet 2019- 08- 21) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * NYT: Der er nu to måder at søge efter datasæt på flere ERDDAP a. De virker lidt anderledes og har forskellige grænseflader og muligheder.
        
        *    [SearchMultiple ERDDAP s. html](/SearchMultipleERDDAPs.html) fra Bob Simons / NOAA   NMFS   SWFSC   ERD .
        *    [ http://erddap.com ](http://erddap.com) fra Rob Fuller / Marine Institute of Ireland.
        
Tak til Tylar Murray for den oprindelige anmodning.
         
    * FORBEDRING: en anmodning til "files" system til at hente en fil, der faktisk er på et eksternt websted (f.eks. AWS S3) nu fører til en omdirigering, så brugeren vil faktisk hente data fra kilden, i stedet for at bruge ERDDAP™ som mellemmand. Takket være Andy Ziegler og NOAA .
         
    * NYT: Som et eksempel på de nye AWS S3- relaterede funktioner, og for at gøre det lettere for nogen at gennemse og downloade filer fra offentlige AWS S3 spande, har vi oprettet
         [~ 110 prøvedatasæt](https://registry.opendata.aws/) der tillader nogen at gennemse indholdet af næsten alle
         [AWS S3 Åbne dataspande](https://registry.opendata.aws/) . Hvis du klikker på "files" link til nogen af disse prøve datasæt, kan du gennemse mappen træ og filer i denne S3 spand. På grund af den måde disse datasæt fungerer, disse mapper lister er altid perfekt up-to-date, fordi ERDDAP™ får dem op at flyve. Hvis du klikker ned mappetræet til et faktisk filnavn og klik på filnavnet, ERDDAP™ vil omdirigere din anmodning til AWS S3, så du kan downloade filen direkte fra AWS. ERDDAP™ administratorer kan
         [Læs retninger for hvordan du gør dette for andre S3 spande](/docs/server-admin/datasets#working-with-aws-s3-files) . Takket være Andy Ziegler og NOAA .
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Ting du har brug for at gøre: ingen
         
    * FORBEDRING: ERDDAP 's metode til lagring arrays af strenge (StringArray) er nu meget mere hukommelse effektiv. String Arrays anvendes i hele ERDDAP™ , især når du læser tabeldata ASCII datafiler. Også, andre ændringer gør læsning CSV / TSV / SSV ASCII, columnar ASCII, og jsonlCSV tabeldata datafiler hurtigere og meget mere hukommelse effektiv. Resultatet er: for en 764 MB ASCII data testfil (men komprimeret til en 52MB .gz fil) med 3,503,266 rækker og 33 kolonner, den maksimale hukommelse forbrug gik fra 10GB ned til 0.6GB (på toppen) . Tiden til at læse det gik fra ~ 7 minutter (men varierer meget med hvor meget fysisk hukommelse er i computeren) ned til ~ 36 sekunder (herunder 10 'ere til forenkling () som kun anvendes af GenerateDataset Xml) . Mange andre steder i ERDDAP™ vil drage fordel af denne øgede hukommelse effektivitet. Takket være Tylar Murray og Mathew Biddle.
        
Jeg udforskede en anden løsning. (lagring strenge i StringArray som UTF- 8- kodet byte arrays) . Det reducerer hukommelsen brug en anden ~ 33%, men på bekostning af ~ 33% afmatning. Sammenlignet med det system, der nu anvendes, virkede det som en dårlig handel. Det er nemmere at give en computer mere hukommelse (købe mere hukommelse til ~ $200) end at gøre det hurtigere (købe en helt ny computer) .
        
Hvis det er bekvemt, er det stadig en god idé at opdele enorme tabeldata filer i flere mindre filer baseret på nogle kriterier som stationID og / eller tid. ERDDAP™ vil ofte kun nødt til at åbne en af de små filer som svar på en brugers anmodning, og dermed være i stand til at reagere meget hurtigere.
        
    * Der er nu [ ERDDAP™ AWS S3-dokumentation](/docs/server-admin/datasets#working-with-aws-s3-files) , som beskriver, hvordan man får ERDDAP™ til at arbejde med datafiler i AWS S3 spande.
Og... ERDDAP™ nu bruger nye funktioner i AWS S3 Java API.
Og... ERDDAP™ nu tillader AWS S3 URL 'er at inkludere yderligere tegn (periode, hyphen, underscore) med skovlnavne.
Og... ERDDAP™ nu kræver, at AWS S3 spand URL 'er skal identificeres på en specifik måde:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
hvor præfikset er valgfrit.
Takket være Andy Ziegler og NOAA .
         
    * FORBEDRING: Generatedataset Xml behandler nu ekstra almindelige missing\\_value s stand- ins som manglende værdier og så er mere tilbøjelige til at konvertere en kolonne til en numerisk datatype. Også, PrimitiveArray.simplificere () nu logs, som særlige data værdi fik det til at behandle en given kolonne som en kolonne af strenge. Takket være Mathew Biddle.
         
    * FORBEDRING:&lt;request Blacklist &gt; understøtter nu.\\*.\\*  (eller:\\*:\\*til IPv6) ved slutningen af IP-adresser, så du kan sortliste en større del af IP-adresser, f.eks 110.52.\\*.\\*  (Kina Unicom Tianjin) . Se dokumentationen for [&lt;ANMODNING Blacklist &gt;] (/ docs / server- admin / datasæt # requestblacklist) Takket være China Unicom og China Telecom.
         
    * FORBEDRING: Hvis en datasæts kilde ikke angiver en "institution" attribut, GenerateDataset Xml og loadDataset nu få det fra en "creator\\ _ institution" attribut (om muligt) . Takket være Micah Wengren.
         
    * BUG FIX: standardisere Hvad der ikke altid blev anvendt på ASCII datafiler.
Også, EDDTable ikke korrekt håndtere begrænsninger på tidsværdier, når kilden havde String tidsværdier og standardisere Hvad der blev brugt.
Takket være Paloma de la Vallee.
        
Jeg sagde ikke klart før: Du skal bare bruge standardisere Hvilke funktioner, når du rent faktisk har brug for dem (f.eks. når forskellige kildefiler opbevarer tidsværdier på forskellige måder) , fordi nogle anmodninger til datasæt, der bruger standardisere Hvad vil blive behandlet lidt langsommere.
        
    * BUG FIX: En fejl i kode brugt af EDDGrid FromNcFiles fik det til at mislykkes med .nc 4 og .hdf 5 filer, der har "lang" (int64) variabler. Det er nu ordnet. Tak til Friedmann Wobus.
         
    * BUG FIX: Små ændringer af ISO 19115 filer for at gøre en anden validator glad. Takket være Chris MacDermaid og Anna Milan.
         

## Version 2.01{#version-201} 
 (udgivet 2019- 07- 02) 

*    **Nye funktioner og ændringer (til brugerne) :** 
    * Ingen.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * BUG FIX: En fejl i koden, som genererer dataadgangsformularen for tabledap Datasættene fik denne webside til at være blank for nogle datasæt. Jeg har også forbedret håndteringen af uventede fejl på alle HTML-sider, så de vil (som regel) vise en fejlmeddelelse. Takket være Marco Alba.
    * FORBEDRING: Generatedataset Xml ikke længere udskriver en langvarig advarsel i toppen af output. I stedet skal du se [Redigér generering Datasæt Xml Output](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) . Takket være Steven Baum.
    * FORBEDRING: Generatedataset Xml giver nu lidt forskellige anbefalinger i forskellige situationer for&lt;updateEveryNMillis &gt; for EDD... Fra... Filer datasæt. Også, Generatedataset Xml nu afskrækker den oprindelige "ekstrakt" system til EDDTableFromFiles datasæt.

## Version 2.00{#version-200} 
 (udgivet 2019- 06- 26) 

*    ** ERDDAP™ V2.00 er endelig her&#33; Ja&#33;**   
     
    * Vi undskylder den lange forsinkelse for at afslutte denne version.
Tak for din tålmodighed.
         
    * Den gode nyhed er, at den ekstra tid blev brugt til at tilføje flere af de funktioner, som brugerne havde anmodet om. Den dårlige nyhed er, at selv med forsinkelsen, ikke alle ønskede funktioner blev tilføjet. Vi beklager, men det virkede vigtigere at få denne udgivelse ud end at forsinke mere (For evigt?) løbende tilføje nye funktioner. Vi lover at vende tilbage til hyppigere udgivelser i fremtiden.
         
    * "Version 2? Er der store ændringer og uforligeligheder?"
Store nye funktioner? Ja.
Store uforligeligheder eller ændringer for administratorer eller brugere? Nej.
Vi sprang fra v1.82 til v2.00:
        * til dels for at fejre 10 år (Nu 11) siden den første offentliggørelse af ERDDAP™   (v1,00 den 2008- 05- 06, som udvendigt lignede v2,00) . I den tid, ERDDAP™ er gået fra ét anlæg til næsten 100 anlæg i mindst 12 lande (Australien, Belgien, Canada, Frankrig, Indien, Irland, Italien, Sydafrika, Spanien, Thailand, Storbritannien, USA) .
        * til dels at markere en større tilføjelse i en helt ny retning: ERDDAP™ nu har en data ingest system til at gå med de eksisterende data server tjenester (Se [EDDTableFromHttpGet](#eddtablefromhttpget) ) ,
        * og delvis fordi det ikke var et stort spring fra 1,82 til 2,00 numerisk, så dette virkede som det rigtige tidspunkt.
             
    * Den anden gode nyhed er, at der nu er to andre grupper bidrager kode til ERDDAP™   (i denne version og med indikationer vil de fortsætte) : Rob Fuller og Adam Leadbetter fra Irlands Marine Institute, og Roland Schweitzer fra PMEL og Weathertop Consulting. Mange tak. Det er sandt, at de arbejder på projekter efter eget valg, men det er den klassiske open source udviklingsmodel -- grupper bidrager med kode for de funktioner, de gerne vil have tilføjet. Den ekstra fordel for bidragydere: de får at bruge de nye funktioner, så snart de er færdige; de behøver ikke at vente på den næste udgivelse af ERDDAP . Deres gruppe er også velkommen til at bidrage&#33; Se [ ERDDAP™ Vejledning for programmører](/docs/contributing/programmer-guide) .
         
    * Vi håber du kan lide ERDDAP™ v2.00. Vi ser frem til de næste 10 år af ERDDAP™ udvikling og stadig mere brug i hele verden.
         
*    **Nye funktioner og ændringer (til brugerne) :**   
     
    * NYT: orderByMean filter
til tabledap Datasættene beregner midlerne for de angivne grupper. Også alle orderBy muligheder nu understøtter en ekstra måde at definere grupper: _ numericVariable \\[ / nummer \\[ timeUnits \\]  \\[ : offset \\]  \\] _ f.eks. tid / 1 dag eller dybde / 10: 5. For eksempel: stationID , tid, vandtemperatur & orderByMean  (" stationID , tid / 1 dag ") ville sortere resultaterne ved stationID og tid, derefter beregne og returnere gennemsnittet af waterTemp for hver stationID for hver dag. Disse er bemærkelsesværdigt nyttige og kraftfulde nye funktioner. Den nye kode for disse funktioner og ændringerne af den gamle kode blev bidraget af Rob Fuller og Adam Leadbetter af Irlands Marine Institute og indsendt via Git. Tak. Rob og Adam&#33;
         
    * NEW: output filtype for tabeldatasæt: [.data Tabel](https://developers.google.com/chart/interactive/docs/reference#dataparam) ,
en JSON fil formateret til brug med Google Visualization klientbibliotek ( Google Charts ) . Koden for dette blev bidraget af Roland Schweitzer og indsendt via Git. Tak. Roland&#33;
         
    * NEW: output filtype for tabeldatasæt: [ .jsonlCSV1 ](https://jsonlines.org/examples/) ,
som er ligesom den eksisterende .jsonlCSV mulighed, men med kolonne navne på første linje. Takket være Eugene Burger.
         
    * NYT: Hvis administratoren gør det muligt, kan brugerne nu logge ind med deres [ORCID](https://orcid.org) Konto.
Det er et OAuth 2.0 godkendelsessystem, meget ligesom Google godkendelse. ORCID er udbredt af forskere til entydigt identificere sig. ORCID-konti er gratis og har ikke de personlige problemer, som Google-konti har. Se ERDDAP 's [Orcidegodkendelsesinstruktioner](/docs/server-admin/additional-information#orcid) . Takket være BCO-DMO (Adam Shepard, Danie Kinkade osv.) .
         
    * NYT: En ny URL konverter konverterer out- of- date URL 'er til up- to- date URL' er.
Se... / erddap / convert / urls.html på alle ERDDAP™ installation, f.eks.
         [Dette link til konverteren i ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) . Dette bør være nyttigt for dataforvaltere. Dette bruges også internt af GenerateDatasetsXml. Takket være Bob Simons og Sharon Mesick.
         
    * FORBEDRING: [Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) nu har muligheder for at konvertere en almindelig streng tid til en ISO8601 streng tid, eller konvertere en UDUNITS -som tidsenheder snor ind i en ordentlig UDUNITS tid enheder streng. Dette bør også være nyttigt for ERDDAP™ administratorer, der har brug for at vide, hvilket format der skal angives for attributten "enheder" for strengtidsvariabler. Dette bruges også internt af GenerateDatasetsXml og standardizeWhat funktion af EDDTableFromFiles. Takket være Bob Simons.
         
    * NYT: [Enhed konvertering](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) har en ny "Standardize UDUnits" valgmulighed.
For eksempel omregnes "deg\\ _ C / m" og "grader\\ _ C meters-1" til
"grad\\ _ C m-1". Denne funktion bruges også af standardizeWhat funktion af EDDTableFromFiles. Takket være Bob Simons.
         
    * NYT: For grafer (andre end overfladegrafer) på griddap 's og tabledap 'Make A Graph websider, når x-aksen ikke er en tidsakse, hvis kun en delmængde af x-aksens variabel er synlig, er der nu knapper over grafen for at flytte X-Axis venstre- eller højreorienterede. Takket være Carrie Wall Bell / Hydrophone projektet.
         
    * NYT: For grafer kan X og / eller Y-aksen nu bruge en Logskala.
Brugere kan styre Y Axis skala via en ny drop- down kontrol på griddap og tabledap Lav en graf websider. Se [.xRange og. yRange-dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) . Takket være Carrie Wall Bell / Hydrophone projektet.
         
    * FORBEDRING: ERDDAP™ nu gør bedre brug af forskellige HTTP fejlkoder og nu returnerer en(OPeN)DAPv2.0- formateret fejlmeddelelse nyttelast. Se [nærmere oplysninger](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) . Takket være Antoine Queric og Aurelie Briand.
         
    * FORBEDRING: Brug ikke Netcdf- java / c eller andre software værktøjer til at oprette forbindelse til .nc eller .hdf filer serveret af ERDDAP 's / files / system som om de var lokale filer. ERDDAP™ nu afviser disse anmodninger. Det er forfærdeligt ineffektivt og skaber ofte andre problemer. I stedet:
        
        * Anvendelse(OPeN)DAPclient software til at oprette forbindelse til ERDDAP 's DAP Tjenester i forbindelse med datasættet (som har / griddap / eller / tabledap / i URL 'en) . Det er hvad DAP er for og gør så godt.
        * Eller brug datasættets dataadgangsformular til at anmode om en delmængde af data.
        * Eller, hvis du har brug for hele filen eller gentagen adgang over en lang periode, skal du bruge curl , wget , eller din browser til at downloade hele filen, og derefter få adgang til data fra din lokale kopi af filen.
        
          
         
    * FORBEDRING: ERDDAP™ hjemmeside, Fuld Tekstsøgning er nu ovenfor "Vis en liste over alle datasæt", da det er det bedste udgangspunkt for de fleste brugere. Takket være Didier Mallarino og Maurice Libes.
         
    * FORBEDRING: på DataProviderForm3.html der er nu dropdown lister over fælles standard\\_name a. Takket være nogen til IOOS DMAC-mødet.
         
    * FORBEDRING: På / filer / websider, er der nu et link til den nye "Hvad kan jeg gøre med disse filer?" sektion af / filer / dokumentation. Dette afsnit beskriver forskellige filtyper og giver forslag til, hvordan man arbejder med dem. Takket være Maurice Libes.
         
    * FORBEDRING: Næsten hver anmodning til ERDDAP™ bør være mindst en lille smule hurtigere, og nogle gange meget hurtigere.
         
    * BUG FIX: Under visse omstændigheder, når en EDDTable datasæt gemt data i nogle typer af .nc filer, den globale "id" attribut blev sat til filens foreslåede navn, som omfatter en hash for at gøre det unikt for denne anmodning. Nu "id" er korrekt efterladt uændret (hvis angivet) eller sat til datasættets datasetID   (hvis ikke specificeret) . Takket være John Maurer.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:**   
     
    * AT GØRE: Denne udgivelse vil tage nogen tid og arbejde fra dig. Vær tålmodig og planlægger at tage et par timer til at foretage de nødvendige ændringer og et par timer til at eksperimentere med nye funktioner.
         
    * For sikkerhed, lave en sikkerhedskopi af din nuværende setup.xml og datasets.xml filer, så du kan vende tilbage til dem i det usandsynlige tilfælde, hvor du er nødt til at vende tilbage til ERDDAP™ v1.82.
         
    * AT GØRE: Det anbefalede Java er nu AdoptOpenJDK 's OpenJDK 8 (LTS) + HotSpot.
Dette er en open source variant af Java der ikke har nogen begrænsninger på dens anvendelse (i modsætning Oracle 's Java distribution) . Det er afledt af Oracle 's Java på en on- going måde, med Oracle Velsignelse. Af sikkerhedshensyn er det vigtigt at Java version up- to- date. Se ERDDAP 's [ Java monteringsvejledning](/docs/server-admin/deploy-install#java) .
         
    * TO DO: AdoptOpenJDK 's Java har brug for en lille tilføjelse til din Tomcat installation: se [Resourcer Cache instruktioner](/docs/server-admin/deploy-install#contentxml) . Jeg tror, at dette er en erstatning for -XX: MaxPermSize indstilling, som (Vedtage) OpenJDK understøtter ikke længere.
         
    * AT GØRE: Den nye standard og anbefale&lt;fontFamily &gt; indstilling i setup.xml er
DejaVu Sans, som er indbygget i AdoptOpenJDK 's Java . Se
         [reviderede installationsinstruktioner for skrifttype](/docs/server-admin/deploy-install#fonts) .
         
    * TO: Mange tags bevæger sig fra setup.xml til datasets.xml . Fordelen er, at du kan ændre deres værdier, mens ERDDAP™ kører, uden genstart ERDDAP . Især kan du nemt ændre&lt;startBodyhtml5 &gt; for at vise en midlertidig besked på ERDDAP™ Hjemmeside (f.eks. "Tjek det nye JPL MUR SST v4.1 datasæt"... eller "Dette ERDDAP™ vil være offline for vedligeholdelse 2019- 05- 08T17: 00 PDT gennem 2019- 05- 08T20: 00 PDT ".) . Hvis / når du ændrer disse tags i datasets.xml , vil ændringerne træde i kraft næste gang ERDDAP™ læser datasets.xml .
         
        
        1. Kopiér dette indhold i din datasets.xml fil (hvor som helst nær starten af filen, efter&lt;erddapDatasets &gt;):
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

        2. One, kopiér værdien (om nogen) for hver af disse tags fra din setup.xml fil i det nye tag, som du lige har indsat (over) er datasets.xml . For eksempel, hvis du havde brugt en værdi på 30 for&lt;cacheMinutter &gt; i setup.xml, skal du kopiere denne værdi til den nye&lt;cacheMinutter &gt; tag in datasets.xml   (selv om værdien er den samme som den nye standard værdi, er det bedst at bare forlade tag i datasets.xml blank) .
            
Hvis din værdi er forskellig fra den nye foreslåede standard (andet end for&lt;startBodyHtml5 &gt; og&lt;The ShortDescriptionHtml &gt;, som er nyttige til at tilpasse din ERDDAP™ installation), skal du overveje at skifte til de nye standardværdier. Dette gælder især for&lt;partialRequestMaxBytes &gt; og&lt;partialRequestMaxCells &gt;, hvor standardværdien / den foreslåede værdi har ændret sig betydeligt i årenes løb.
            
Når du har kopieret hver værdi, skal du slette mærket og dets beskrivelse fra setup.xml. Det er bedre at have disse tags i datasets.xml . Og der er nu bedre beskrivelser i [setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) .
            
        
En særhed i det nye system er, at den allerførste webside, når du starter op ERDDAP vil være standard ERDDAP™ Webside. Hver efterfølgende webside vil bruge... Html indhold, du angiver i datasets.xml .
        
    * ADVARSEL: Første gang du kører ERDDAP™ v2.0, datasæt baseret på lokale datafiler vil indlæse **Meget** langsomt fordi ERDDAP™ har brug for at genskabe sin database af filer i et lidt andet format. Efter den langsomme genfyldning, vil de indlæse hurtigt, som før. Vær tålmodig.
         
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
    *    [BIG NY FEATUR: EDDTableFromHttpGet](#eddtablefromhttpget)   
Indtil nu, ERDDAP™ bare læse data og gjort det tilgængeligt for brugerne. Nu ERDDAP™ har et simpelt og effektivt system til at indfange realtidsdata fra sensorer. Blandt andre funktioner, dette datasæt tilbyder fine- kornet versioning: det husker hver ændring foretaget til datasættet, da det blev foretaget, og af hvem. Normalt vil brugerne bare have den nyeste version af datasættet, med alle ændringer anvendt. Men der er mulighed for brugerne at anmode om data fra datasættet som det var på ethvert tidspunkt. Dette letter reproducerbar videnskab. I modsætning til de fleste andre nærtidsdatasæt er disse datasæt således berettigede til [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) . fordi de møder DOI krav om, at datasættet er uændret, undtagen ved aggregering. Se [EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget) . Takket være OOI (fra længe siden og nu) for at tale om behovet for dette og Eugene Burger for påmindelsen om at arbejde på, hvad der er vigtigt.
         
    * BIG NY FEATUR: ERDDAP™ kan nu tjene data direkte fra eksternt komprimerede datafiler, herunder .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , eller. Z. Datasæt kan omfatte en blanding af eksternt-komprimerede filer (Måske de ældre datafiler?) og ikke-eksternt-komprimerede filer, og du kan komprimere / dekomprimere en fil til enhver tid.
        
Det her fungerer godt&#33;
I de fleste tilfælde, den afmatning i forbindelse med nedbrydning af filerne er mindre. Vi opfordrer dig kraftigt til at prøve dette, især for datasæt og / eller datafiler, der sjældent anvendes.
        
Dette kan spare dig $30.000 eller mere&#33;
Dette er en af de få ERDDAP™ funktioner, der kan spare dig masser af penge - hvis du komprimere en masse datafiler, vil du have brug for langt færre RAID 'er / harddiske til at gemme data, eller omvendt, kan du tjene langt flere data (op til 10x) med de RAID 'er, du allerede har. Hvis denne funktion sparer dig fra at købe en anden RAID, så har det reddet dig omkring $30.000.
        
Se [Eksternt komprimeret dokumentation for filer](/docs/server-admin/datasets#externally-compressed-files) . Takket være Benoit Perrimond og Paloma de la Vallee.
        
    * BIG NY FEATUR: Alle EDDGrid FromFiles og alle EDDTableFromFiles datasæt understøtter en&lt;cacheFromUrl &gt; tag og a&lt;cacheSizeGB &gt; tag. Hvis CacheSizeGB ikke er angivet, vil dette downloade og vedligeholde en komplet kopi af en ekstern datasæt filer. Hvis CacheSizeGB er angivet og er &gt; 0, vil dette downloade filer fra det eksterne datasæt, efter behov, til en lokal cache med en begrænset størrelse, hvilket er nyttigt, når du arbejder med cloud- baseret (f.eks. S3) datafiler. Se [cache FromUrl-dokumentation](/docs/server-admin/datasets#cachefromurl) for detaljer. Tak til Bob Simons og Roy Mendelssohn (der i årevis har skrevet scripts til at håndtere at gøre lokale kopier af eksterne datasæt filer) , Lloyd Cotten, Eugene Burger, Conor Delaney (da han var på Amazon Web Services) , og Google Cloud Platform.
         
    * NYT: Den nye EDDTableFromJsonlCSV klasse kan læse tabeldata fra
         [JSON Linjer CSV- filer](https://jsonlines.org/examples/)   ("Bedre end CSV") . Tak til folk på Marine Institute of Ireland for at fortælle mig om dette format og til Eugene Burger og PMEL for anmodningen om at støtte det som en input type.
         
    * Alle EDDGrid og alle EDDTableFromFiles datasæt understøtter en&lt;nThreads &gt; indstilling, som fortæller ERDDAP™ hvor mange tråde der skal bruges, når en forespørgsel besvares. Se [nThreads-dokumentation](/docs/server-admin/datasets#nthreads) for detaljer. Takket være Rob Bochenek fra Axiom Data Science, Eugene Burger, Conor Delaney (da han var på Amazon Web Services) , og Google Cloud Platform.
         
    * NY standardisering Hvad for alle EDDTableFromFiles underklasser -
Tidligere, hvis for en given variabel, værdierne af de vigtige attributter (f.eks. scale\\_factor , add\\_offset , missing\\_value ,\\ _ FillValue, enheder) var ikke konsekvent, EDDTableFromFiles ville vælge en værdi for hver attribut til at være "gyldig" og markere filer med andre attributter værdier som "dårlige filer". Der er et system til at standardisere filerne, så snart EDDTableFromFiles læser filerne. Se [EDDTableFromFile 's standardisering Hvad](/docs/server-admin/datasets#standardizewhat) . En af ERDDAP Hovedmålene er at gøre datafiler og datasæt tilgængelige på en konsekvent måde. Standardise Hvad er et vigtigt nyt værktøj til at gøre det til en realitet. Takket være Marco Alba, Margaret O 'Brien (og andre EML-brugere) , BCO- DMO, og InPort brugere.
         
    * NYE EDDTableFromInvalidCRAFIles giver dig mulighed for at lave et datasæt fra en samling af NetCDF   (v3 eller v4)   .nc filer, der bruger en specifik, ugyldig, variant af CF DSG Contiguous Ragged Array (CRA) filer. Stikprøvefiler for denne datatype kan findes på https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/   \\[ 2020- 10- 21 Denne server er nu ikke pålidelig tilgængelig \\] . Selvom ERDDAP™ understøtter denne filtype, det er en ugyldig filtype, som ingen bør begynde at bruge. Grupper, der i øjeblikket bruger denne filtype, opfordres kraftigt til at bruge ERDDAP™ at generere gyldige CF DSG CRA filer og stoppe med at bruge disse filer. Takket være Ajay Krishnan og Tim Boyer.
         
    * EDDTableFromThreddsFiles og EDDTableFrom Hyrax Filer er nu forældet. Skift til EDDTableFromNcFiles (eller en variant) plus&lt;cacheFromUrl &gt;. Hvis det ikke virker af en eller anden grund, e-mail erd.data at noaa.gov . Hvis der ikke er nogen klager før 2020, kan disse datatyper fjernes.
         
    * FORBEDRING - System til automatisk konvertering ikke-ISO 8601 gange til ISO 8601 gange (indført i v1.82) er blevet stærkt udvidet til at beskæftige sig med en lang række yderligere formater. Dette påvirker GenerateDatasettsXml og ERDDAP er håndtering af kildemetadata.
         
    * FORBEDRING - Med sin tredje store revision af String tid fortolkning system (og forhåbentlig den sidste) , ERDDAP™ ikke længere anvendelse Java 's DateTimeFormatter på grund af fejl, der undertiden påvirker ekstreme tider (år&lt;= 0000). ERDDAP™ nu bruger sit eget system til at fortolke tidsstrenge.
         
    * ADVARSEL: Den nye String tid fortolkning system er noget strengere. Hvis en af dine datasæt pludselig kun mangler værdier for tidsværdier, årsagen er næsten helt sikkert, at tidsformatet strengen er lidt forkert. Der bør være fejlmeddelelser i loggen. txt relateret til tidsværdier, der ikke matcher tidsformatet -- der skulle hjælpe dig med at fastsætte tidsformatet strengen for det datasæt. Hvis du har brug for hjælp, skal du bruge muligheden i ERDDAP 's Time Converter som "Konverter \\[ s \\] enhver almindelig strengetid ind i en ISO 8601 strengetid "-- det angiver det format, konverteren brugte til at fortolke kildestrengen.
         
    * ANBEFALING: Den hurtigste, nemmeste og billigste måde at fremskynde ERDDAP 's adgang til tabeldata er at sætte datafiler på en Solid State Drive (SSD) . De fleste tabeller datasæt er relativt små, så en 1 eller 2 TB SSD er sandsynligvis tilstrækkeligt til at holde alle de datafiler for alle dine tabeller datasæt. SSD er i sidste ende slide ud, hvis du skriver data til en celle, slette det, og skrive nye data til denne celle for mange gange. I stedet anbefaler jeg, at (så meget som muligt) du bare bruge din SSD til at skrive data en gang og læse det mange gange. Så, selv en forbruger-kvalitet SSD bør vare meget lang tid, sandsynligvis meget længere end nogen Hard Disk Drive (HDD) . Forbruger-grade SSD er nu billige (i 2018, ~ $200 for 1 TB eller ~ $400 for 2 TB) og priserne er stadig faldende hurtigt. Hvornår ERDDAP™ har adgang til en datafil, en SSD tilbyder både
        
        * kortere latency (~ 0.1ms, versus ~ 3ms for en HDD, versus ~ 10 (?) ms for en RAID, versus ~ 55ms for Amazon S3) , og
        * højere gennemstrømning (~ 500 MB / S, versus ~ 75 MB / s for en HDD versus ~ 500 MB / s for en RAID) .
        
Så du kan komme op til en ~ 10X performance boost (vs en HDD) 200 dollars&#33; Sammenlignet med de fleste andre mulige ændringer i dit system (En ny server til 10.000 dollars? en ny RAID for $35.000? en ny netværksknap til $5.000? osv.) , Dette er langt den bedste afkast på investeringer (ROI) . Hvis din server ikke er fyldt med hukommelse, yderligere hukommelse til din server er også en stor og relativt billig måde at fremskynde alle aspekter af ERDDAP .
         \\[ SSD 's ville være fantastisk til brogede data, også, men de fleste brogede datasæt er meget større, hvilket gør SSD meget dyrt. \\]   
         
    * NYT: Alle, der er logget ind får rolle = \\[ anyoneLogget I \\] , selv om der ikke er&lt;bruger &gt; tag til dem i datasets.xml . Hvis du sætter datasæt&lt;accessibleTo &gt; to \\[ anyoneLogget I \\] , så alle, der har logget ind til ERDDAP™   (f.eks. via deres Gmail eller Orcid-konto) vil få tilladelse til at få adgang til datasættet, selv hvis du ikke har angivet en&lt;bruger &gt; tag til dem i datasets.xml . Takket være Maurice Libes.
         
    * FORBEDRING: UDUNITS / UCUM units konverter blev markant forbedret.
Det håndterer ugyldige enheder strenge bedre (der begynder med at lægge vægt på at bevare oplysninger i stedet for at håndhæve gyldigheden) . Desuden har resultaterne nu en standardiseret syntaks.
         
    * NYT: UDUNITS / UCUM enheder konverter har en ny mulighed for at standardisere en UDUNITS string.
Dette fungerer godt for gyldige UDUNITS strenge og rimeligt godt for ikke-standard / ugyldig UDUNITS Strenge. For eksempel: UDUNITS = "meter pr. sekund", "meter / sekund" "m.s^-1" , og "m s-1" vil alle vende tilbage "m.s.-1". Dette var nødvendigt for den nye standardisering Hvilket system beskrevet ovenfor. Takket være Marco Alba, Margaret O 'Brien (og andre EML-brugere) , BCO- DMO, og InPort brugere.
         
    * NYT: EDDTableFromMultidimNcFiles har nu en [Behandlingsdimensioner](/docs/server-admin/datasets#treatdimensionsas) option, der fortæller ERDDAP™ til behandling af visse dimensioner (f.eks. LAT og LON) som om de var andre dimensioner (f.eks. TIME) . Dette er nyttigt for nogle forkerte filer, der bruger forskellige dimensioner for forskellige variabler, når de skulle have brugt kun én dimension (f.eks. TIME) . Takket være Marco Alba og Maurice Libes.
         
    * Nu, alle EDDGrid Fra... Filer datasæt understøtter en ny speciel akse sourceName som fortæller ERDDAP™ at udtrække oplysninger fra filnavnet (bare filename.ext) og bruge værdien til **erstatte** den eksisterende akseværdi længst til venstre. Format er
        \\*\\*\\ * sted FromFileName, _ dataType _, _ extractRegex _, _ captereGroupNumber _
Se [denne dokumentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Takket være NOAA Pathfinder Dagligt aggregationsdatasæt.
         
    * Nu, alle EDDGrid Fra... Filer datasæt understøtter en ny speciel akse sourceName som fortæller ERDDAP™ at udtrække oplysninger fra filens patName (mapper + filename.ext)   
        \\*\\*\\ * patName, _ dataType _, _ extractRegex _, _ captureGroupNumber _
Til dette bruger stiens navn altid '/' som mappeseparatortegn, aldrig '\\'.
Se [denne dokumentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Takket være Paloma de la Vallee.
         
    * Alle EDDTableFrom... Filer datasæt understøtter yderligere pseudovariabel sourceName s der udtrækker oplysninger fra filens filnavn (bare filename.ext)   (Se [\\*\\*\\ * filnavn](/docs/server-admin/datasets#filename-sourcenames) ) eller fra filens fulde patName (/ dir1 / dir2 / filename.ext)   (Se [\\*\\*\\ * patName](/docs/server-admin/datasets#pathname-sourcenames) ) . Takket være Paloma de la Vallee.
         
    * NYT: EDDGrid dataset har en eller flere meget store dimensioner (f.eks. millioner af værdier) hvilket optager en masse hukommelse, kan du indstille den nye [&lt;dimensionValuesInMemory &gt;] (/ docs / server- admin / datasæt # dimensionværdiinmemory) indstilling til false (default er sand) , som får datasættet til at gemme værdierne på disken og hente dem efter behov. Tak til David Rodriguez og Rich Signell (re: EDDGrid FromAudioFiles) .
         
    * Tidligere, hvis du ombestilte dataVariable s for en EDDTableFromFiles datasæt og genindlæst datasættet, EDDTableFromFiles ville genlæse alle datafiler. Nu kan det beskæftige sig med ombestilling uden at genlæse alle datafiler. Takket være Roland Schweitzer.
         
    * Nu, hvor ERDDAP™ læser ASCII, NCSV, og JSON Lines CSV tabelfiler, hvis det finder en fejl på en given linje (f.eks. forkert antal elementer) , det logger en advarsel ("ADVARSEL: Skipping line #"... "uventet antal elementer"...) til [log.txt-fil](/docs/server-admin/additional-information#log) og fortsætter derefter med at læse resten af datafilen. Således er det dit ansvar at se regelmæssigt (eller skrive et script til at gøre dette) for den besked i loggen. txt så du kan løse problemerne i datafilerne. ERDDAP™ er sat op på denne måde, så brugerne kan fortsætte med at læse alle de tilgængelige gyldige data, selvom nogle linjer i filen har fejl. Tidligere: ERDDAP™ markeret filen som "dårlig" og fjernet den fra datasættet.
         
    * FORBEDRING: når præcise tidspunkter (f.eks. til nærmeste sekund eller millisekund) opbevares ved kilden som "minutter siden"... (eller større enheder) , ERDDAP™ nu runder dem til nærmeste millisekund, når du læser værdierne i ERDDAP . I modsat fald er antallet af flydende punkter forslået, og anmodninger om data på bestemte tidspunkter (f.eks. & tid = 2018- 06- 15T01: 30: 00) vil mislykkes. Tidligere beregnede den dem så præcist som muligt. (og stadig gør, hvis enhederne er fx "sekunder siden"... eller "millisekunder siden"...) . Det er bedst at undgå dette problem ved ikke at bruge store enheder (f.eks. minutter eller timer) til at gemme præcise tidsværdier (f.eks. mikrosekunder) -- computere gør et dårligt stykke arbejde med at håndtere decimaler. Takket være Marco Alba.
         
    * ÆNDRINGER TIL EDDTableFrom EDDGrid hvilket gør det meget bedre. EDDTableFrom EDDGrid lader brugerne spørge gridded datasæt, som om de var tabeldatasæt ("Forespørgsel efter værdi") .
        
        * EU støtter nu&lt;maxAxis0 &gt; tag (standard = 10) som angiver det maksimale antal akser \\[ 0 \\]   (som regel "time" ) værdier, der kan spørges på én gang. Dette forhindrer naive anmodninger fra at få EDDTableFrom EDDGrid til at søge gennem en hel broget datasæt (som ville mislykkes med en timeout fejl) .
        * GenerateDataset Xml har nu en mulighed for at generere EDDTableFrom EDDGrid datasæt for alle datasæt i et givet format ERDDAP™ der matcher en specificeret regex (bruge.\\ * til at matche alle datasæt) . Datasættene, som det skaber, har yderligere oplysninger i den sammenfattende attribut, der angiver, at dette er en tabeludgave af et forankret datasæt. Og deres datasetID er datasetID af den brogede datasæt, plus "\\ _ asatable".
        * Der er en stor hastighed op for de mest almindelige setup: når den brogede datasæt er en EDDGrid FromErddap datasæt, der er i samme ERDDAP .
        
Takket være James Gallagher og Ed Armstrong.
         
    * NYT: generér Datasæt Xml for alle typer af datasæt er nu meget mere tilbøjelige til at tilføje en\\ _ FillValue eller missing\\_value attribut til en numerisk variabel addAttributes . For eksempel, dette sker, når streng manglende værdi markører (f.eks. ",". ","? "," NA "," nd "," NaN ") for denne variabel i prøvefilen konverteres til ERDDAP er indfødte manglende værdier (127 i byte-kolonner, 32767 i korte kolonner, 2147483647 i int-kolonner, 9223372036854775807 i lange kolonner, og NaN i flydende og dobbelte variabler) . Det forekommer også for NaN værdier i float og dobbelte variabler. Også "nd" blev tilføjet på listen over almindelige manglende værdi markører i numeriske dataposter, der ERDDAP™ bør lede efter. Takket være Matt Biddle fra BCO-DMO.
         
    * FORBEDRING: ncdump option i generator Datasæt Xml er nu mere som ncdump (men stadig bruger netcdf- java version af ncdump) . Den udskriver en ny liste over muligheder. Nu til .nc ml filer, det udskriver ncdump output for resultatet af .nc ml filændringer anvendt på det underliggende .nc eller .hdf fil.
         
    * BUG FIX: Der var en fil håndtag lækage (i sidste ende forårsager ERDDAP™ til at fryse op) forårsaget, når du opretter nogle typer af outputfiler, f.eks. Jeg tror / håber, at alt dette nu er ordnet. Hvis du stadig ser problemer, bedes du fortælle mig typen af datasæt (gitter eller tabel) og den type fil, der forårsager problemet. Takket være Steven Beale, Lynn DeWitt, Jibei Zhao og andre.
         
    * BUG FIX: EU WMS   Leaflet demo ikke fuldt / korrekt konvertere "dybde" akse til "elevation". Det gør det, og de brudte legende anmodninger er rettet. Også, alle akse muligheder i drop- down lister er altid i stigende sorteret rækkefølge. Takket være Antoine Queric og Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles nu korrekt understøtter begrænsninger på String variabler, der blev oprettet fra char variabler i datafilerne. Takket være Antoine Queric og Aurelie Briand.
         
    * BUG FIX: Nu, når et datasæt bliver utilgængelig, data forsøger at underrette (med meddelelsen "Dette datasæt er i øjeblikket ikke tilgængelig".) dens abonnenter, anførte handlinger, rss, og lonPM180 datasæt, der er afhængige af det. Takket være Roy Mendelssohn og Bob Simons.
         
    * BUG FIX: To fejl relateret til EDDTableCopy. Takket være Sam McClatchie.
         
    * FORBEDRING: Antallet af mislykkede anmodninger vist på statu.html side vil stige, fordi flere ting tælles som svigt end før.
         
    * FORBEDRING: ERDDAP er statu.html nu viser "Anmodninger (median tid i ms) "i tidsserien. Tidligere viste det median gange afkortet til heltal sekunder.
         
    * I Jsonld output, Jsonld "navn" nu kommer fra datasættets "title" er ERDDAP og jsonlds overskrift kommer nu fra datasættets " datasetID "i ERDDAP . Tidligere var det omvendt. Det forekommer mig forkert, fordi i normal engelsk brug, "navn" er normalt en kort, (ideelt set) entydig identifikator, der sjældent / aldrig ændrer (f.eks. Robert Middlename Simons) , ikke en beskrivelse som ikke er unik og som nemt og ofte kan ændre (f.eks. "En fyr, der skriver software til NOAA En høj fyr, der skriver software til NOAA ") . Det ville være godt, hvis ordningens definition af [Navn](https://schema.org/name) , i forbindelse med et Dataset, var mere specifikke. Software udviklere bør kunne skrive en implementering af en specifikation baseret på specifikationen alene, uden vejledning fra eksperter. Men jeg udsætter mig til Google (især Natasha Noy) , NCEI (især John Relph) og Rob Fuller.
         
    * FORBEDRING: I jsonld output er de fire "spatialCoverage GeoShape" værdier nu minLat minLon maxLon maxLon. Tidligere blev lats og lons positioner vendt om. Det ville være godt, hvis ordningens definition af [GeoShape](https://schema.org/GeoShape) angivet den korrekte rækkefølge. Software udviklere bør kunne skrive en implementering af en specifikation baseret på specifikationen alene, uden vejledning fra eksperter. Takket være Natasha Noy og Rob Fuller.

## Version 1.82{#version-182} 
 (udgivet 2018- 01- 26) 

*    **Nye funktioner (til brugerne) :**   
     
    * Talrige subtile ændringer i udseende-og-følelse af ERDDAP™ websider.
        * FORBEDRING: ERDDAP™ nu bruger HTML 5 og gør bedre brug af CSS.
        * FORBEDRING: Websiderne er blevet lidt ændret for at gøre dem renere og mindre "travle". (De er stadig tætte, og der er stadig ting, man kunne klage over, men forhåbentlig langt mindre end før.) Tak til John Kerfoot for nogle kommentarer.
        * FORBEDRING: Websiderne ser nu meget bedre ud på mobiltelefoner og andre små enheder, især hvis du bruger dem i landskabsorientering. De ser også bedre ud i meget små og meget store vinduer i desktop browsere.
        * FORBEDRING: For at forbedre sikkerheden og andre grunde, brugen af en out- of- date Openlays version for WMS Demonstrationssider er blevet erstattet af Leaflet .
        * NYT: støtte til forhåndsvisninger af billede, lyd og videofiler i "files" system (f.eks. [dette testdatasæt](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) og .htmlTable svar, når en celle har URL for et billede, lyd eller videofil (f.eks. [denne anmodning](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) . Hvis du svæver over et '?' ikon, bør du se et billede, lyd, eller video fil preview. Du kan også klikke på fillinket for at se filen fuld skærm i din browser. Se [Dokumentation af mediefiler](/docs/server-admin/datasets#media-files) . Bemærk, at forskellige browsere understøtter forskellige filtyper, så eksemplerne kan ikke arbejde i din browser.
Takket være disse mennesker / links til ideer og samplingskode til CSS- kun billedværktøjstips (var på https://codepen.io/electricalbah/pen/eJRLVd ) og udsat billedindlæsning (var på https://varvy.com/pagespeed/defer-images.html )   (men koden blev ændret før brug i ERDDAP ) .
Takket være Cara Wilson, Matthew Austin og Adam Shepherd / BCO-DMO for anmodninger om billedstøtte.
Takket være Jim Potemra, Rich Signell, OOI, og Carrie Wall Bell for anmodninger om lyd / hydrophone fil support.
Tak til OOI for at vise behovet for video support.
        * NYT: En undergruppe af data fra enhver ERDDAP™ dataset (men normalt et datasæt fra lydfiler) kan nu gemmes i en .wav lydfil. ( [dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) Takket være Jim Potemra, Rich Signell, OOI, og Carrie Wall Bell for anmodninger om lyd / hydrophone fil support.
        * FORBEDRING: Formatet for webtilgængelighedsmapper (WAF)   (F.eks. de / filer / mapper) er blevet opdateret til at bruge en HTML- tabel. Det nye format efterligner den nyere version af mappen notering websider skabt af nyere versioner af Apache. Mennesker vil finde, at ændringerne gør oplysningerne lettere at læse. Software, der parser disse dokumenter (f.eks. software, der høster ISO 19115-dokumenter fra ERDDAP ) skal revideres, men det nye format vil være lettere at fortolke end det tidligere format. (Hør efter, Anna Milan.) 
        * NYT outOfDateDatasets.html Side. ( [eksempel](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) Denne webside viser en tabel med alle de nær- real- tid datasæt, der har en&lt; testOutOfDate &gt; tag (se nedenfor) , rangeret efter hvor out- of- date datasættene er. Dette instrumentbræt bør være nyttigt for ERDDAP™ administratorer og slutbrugere, når de ønsker at vide, hvilke datasæt er out- of- date. For dataserier uden dato er der formentlig et problem med datakilden, så ERDDAP™ er ude af stand til at se / få data fra nyere tidspunkter.
Administratorer: Hvis du ikke ønsker en Out- Of- Date Datasets hjemmeside, tilføje dette til din setup.xml:
            &lt;outOfDateDatasettsActive &gt; false&lt;/ outOfDateDatasatsActive &gt;
Der er nu testOutOfDate og ud AfDato kolonner i allDatasets dataset.
Tak til Bob Simons, der har ønsket dette i årevis, og til de kloge mennesker i Irlands Marine Institute, der gav mig inspiration via deres dedikerede Raspberry Pi og skærm, som altid viser en skærm som denne på deres kontor.
        * FORBEDRING: .htmlTable og .xhtml respons er nu bedre formateret, mere kompakt, og dermed indlæse hurtigere. Takket være HTML5 og CSS.
    * NY output-filtype for griddap datasæt: .timeGaps. Den viser en liste over huller i tidsværdierne, som er større end medianforskellen. ( [eksempel](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) Dette er nyttigt for ERDDAP™ administratorer og slutbrugere, når de ønsker at vide, om der er uventede huller i tidsværdierne for et datasæt, der forventes at have regelmæssigt fordelt tidsværdier. Takket være Bob Simons og Roy Mendelssohn, der havde brug for denne funktion.
    * FORBEDRING: Standard grafen for allDatasets dataset er nu et kort med x = maxLon og y = maxLat. Takket være John Kerfoot, Rich Signell og OOI-CI.
    * NYT: [erddapy](https://github.com/ioos/erddapy) er ikke en ERDDAP™ funktion, men vil være af interesse for mange ERDDAP™ brugere. Erddapy ( ERDDAP™ + Python ) er Python bibliotek skabt af Filipe Fernandes, der "drager fordel af ERDDAP 's RESTful web-tjenester og skaber ERDDAP™ URL for enhver anmodning som at søge efter datasæt, erhverve metadata, downloade data osv ". Takket være Filipe Fernandes.
    * Jeg burde have nævnt det før: Der er en tredje part R pakke designet til at gøre det lettere at arbejde med ERDDAP™ fra R: [rerddap](https://github.com/ropensci/rerddap#rerddap) . Takket være [ropenSci](https://ropensci.org/) og Roy Mendelssohn.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:**   
     
    * GØR: I setup.xml, lige under&lt;adminInstitution &gt;, skal du tilføje en&lt;adminInstitutUrl &gt; tag som angiver en URL for din institution (eller gruppe) .
    * TO: Disse 3 tags i setup.xml bruges ikke længere:
        &lt;start HeadHtml &gt;&lt;startBodyHtml &gt; og&lt;endBodyHtml &gt;. De erstattes af
        &lt;startHeadhtml5 &gt;&lt;startBodyHtml5 &gt; og&lt;endBodyhtml5 &gt;, som har standardværdier angivet i messages.xml (og vist nedenfor) .
        
Vi anbefaler at bruge standard&lt;startHeadHtml5 &gt; og&lt;endBodyhtml5 &gt;.
Vi anbefaler: Hvis du har lavet ændringer til originalen&lt;startBodyHtml &gt; og / eller ønsker at tilpasse din ERDDAP™ Nu bedes du kopiere den nye&lt;startBodyhtml5 &gt; tag (nedefra) i din setup.xml og ændre det til at tilpasse din ERDDAP™ så ERDDAP 's websider afspejler din organisation, ikke NOAA   ERD . Vigtigt, bedes du ændre "bragt til dig af" til din organisation (s) . Hvis du har brug for hjælp, bedes du sende e-mail erd.data at noaa.gov . (Hvis du ikke ønsker at tilpasse din ERDDAP™ nu, bruge standarden&lt;startBodyHtml5 &gt;.)
        
Derefter slette de 3 gamle tags i din setup.xml, som ikke længere bruges.

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

Der er flere måder, du kan [tilpasse ERDDAP™ ](/docs/server-admin/deploy-install#customize) så ERDDAP 's websider afspejler din organisation i stedet for NOAA   ERD .
        
    * AT GØRE:&lt; EDDGrid ... Eksempel på & gt; - mærker (startende med&lt; EDDGrid IdEksempel & gt;) og&lt;EDDTable... Eksempel på & gt; - mærker (startende med&lt;EDDTableIdEksempel & gt;) i din setup.xml fil bruges til at oprette eksempler i griddap og tabledap dokumentation. html websider i din ERDDAP .
        
Hvis du ikke har tilpasset disse tags, bedes du slette dem fra din setup.xml fil. Nu har de alle standard i messages.xml, der refererer til datasæt i Bobs ERDDAP™ på https://coastwatch.pfeg.noaa.gov/erddap/index.html . Så du behøver ikke længere at have specifikke datasæt i din ERDDAP . Hvis du ønsker at tilsidesætte standarden, kopiere nogle eller alle disse tags i din setup.xml og ændre deres værdier.
Hvis du vil have eksemplerne til at pege på din ERDDAP™ , den nemmeste metode er:
        
        1. Medtag disse to datasæt i din ERDDAP™ ved at tilføje dette til din datasets.xml :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Tilføj dette mærke til din setup.xml, men ændre URL til din ERDDAP 's ( https ?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Hvis du har tilpasset disse tags, forlade dem som er, og du tilføje disse 2 nye tags til din setup.xml for at angive ERDDAP™ URL for disse datasæt, men ændre URL til din ERDDAP 's ( https ?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * AT GØRE: ERDDAP™ nu bruger en css fil kaldet erddap2.css. Hvis De har foretaget ændringer i \\[ tomcat \\] / webapps / erddap / images / erddap.css, overveje at foretage lignende ændringer til erddap2.css (i samme mappe) .
    * NYT: ERDDAP s websider har nu et stort antal næsten usynlige interne links (Teksten er sort og ikke understreget) . Hvis du svæver over et af disse links (normalt de første få ord i overskrifter og stykker) , markøren bliver en hånd. Hvis du klikker på linket, URL 'en er det interne link til den del af dokumentet. Dette gør det let at henvise til specifikke afsnit af dokumentationen. Takket være Bob Simons, som har ønsket det i årevis.
    * NYT: ERDDAP™ nu understøtter [Byte område / Accept- Ranges](https://en.wikipedia.org/wiki/Byte_serving) anmodninger om dele af / filer / filer. Dette var nødvendigt for at støtte lyd og video seere i browsere.
    * TO DO: Nu, for at forbedre sikkerheden, hvis du har angivet&lt;baseHttpsUrl &gt; i setup.xml (og dermed støtte https ) , det anbefalede flag Url er en https URL med en mere sikker flagKey. Hvis det er tilfældet, vil tidligere flag Urls / flagKeys blive ugyldige. Indgives: Hvis disse ændringer gælder for din ERDDAP™ og hvis ERDDAP™ har EDDGrid FromErddap og EDDTable FromErddap er der abonnerer på fjernbetjening ERDDAP s, derefter, når du opdaterer ERDDAP , din ERDDAP™ vil automatisk forsøge at abonnere med den nye flagUrl, så du bør slette de gamle abonnementer og validere de nye abonnementer, når du får de nye abonnement validering e-mails.
    * AT GØRE: ERDDAP™ har EDDGrid FromErddap datasæt til erdVH3 datasæt på Bobs kystur ERDDAP™ , bedes du ændre dem for at henvise til de nye erdVH2018 datasæt.
    * AT GØRE: Hvis du inkluderer en af de jplAquariussSS prøve datasæt i din ERDDAP™ , venligst ændre "V4" i datasetID til "V5".
    * AT GØRE: actual\\_range er nu en CF standard attribut (fra CF- 1.7) og klart siger, at hvis variablen bruger add\\_offset og / eller scale\\_factor til at pakke dataværdierne, derefter actual\\_range værdier bør bruge den uemballerede datatype og være uemballerede værdier. Det er desværre i modstrid med vores tidligere råd. GenerateDataset Xml pakker nu pakket ud actual\\_range værdier, men det vil ikke fastsætte eksisterende datasæt i din datasets.xml fil.
        
Så tjek dine datasæt: hvis en variabel værdier er pakket, og hvis actual\\_range er angivet som pakkede data værdier, skal du tilføje en&lt; addAttributes &gt; actual\\_range værdi til angivelse af de upakkede værdier. Ellers indlæses datasættet ikke ERDDAP . En enkel og næsten perfekt måde at gøre dette er at søge din datasets.xml til kilde Attributter, der har
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
og a scale\\_factor andre end 1, 0. Det er... actual\\_range attributter, som du måske skal rette.
        
For aksevariabler i EDDGrid datasæt ERDDAP™ altid sætter actual\\_range attributten er det faktiske værdiinterval, da den kender disse værdier.
        
For aksevariabler med faldende værdier (F.eks. nogle breddegrader variabler) , ERDDAP™ oprettet actual\\_range med \\[ 0 \\] ... \\[ sidste \\] Værdier, som var høje... lave. Nu bruger den altid lave... høje værdier til at lave den nye CF definition.
        
Det hedder i domskonklusionen: actual\\_range værdier er særlig vigtige for EDDTable datasæt, fordi ERDDAP™ vil hurtigt afvise brugeranmodninger om dataværdier, der er mindre end actual\\_range en minimumsværdi, eller som er større end actual\\_range maksimal værdi.
        
Relateret: den faktiske\\ _ min, faktisk\\ _ max data\\_min og data\\_max attributter er nu forældet. Konvertér dine datasæt til at bruge actual\\_range I stedet.
        
    * AT (frivilligt, men anbefales) : For hver nær- real- tid og prognose datasæt i din ERDDAP™ , venligst tilføje en [&lt; testOutOfDate &gt;] (/ docs / server- admin / datasæt # testoutoftdate) mærke med en værdi i form now- _ nUnits _, f.eks. now- To dage. Hvis den maksimale tidsværdi for datasættet er ældre end denne værdi, anses datasættet for at være forældet og vil blive markeret som sådan på [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) Webside. Dette giver dig en nem måde at se, når noget er galt med en datasæts kilde.
    *    [NYT: Semantisk Markering af Datasets med json- ld (JSON Sammenkædede data) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ nu bruger [json- ld (JSON Sammenkædede data) ](https://json-ld.org) at gøre dine data katalog og datasæt en del af [semantisk web](https://en.wikipedia.org/wiki/Semantic_Web) , som er Tim Berners- Lee 's idé om at gøre web-indhold mere maskinlæsbar og maskine "forståelig". Søgemaskiner ( [Især Google](https://developers.google.com/search/docs/data-types/datasets) ) og andre semantiske værktøjer kan bruge denne strukturerede markup til at lette opdagelse og indeksering. Den json- ld struktureret markup vises som usynlig-to-mennesker&lt;script &gt; kode http://.../erddap/info/index.html Webside (som er et semantisk web [Datakatalog](https://schema.org/DataCatalog) ) og på hver http://.../erddap/info/_datasetID_/index.html Webside (som er et semantisk web [Datasæt](https://schema.org/Dataset) ) . (Særlig tak til Adam Leadbetter og Rob Fuller fra Marine Institute i Irland for at gøre de hårde dele af arbejdet for at gøre denne del af ERDDAP .) 
    * NYT: Der er nye datatyper, som kan læse data fra lydfiler:
         [ EDDGrid FromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) som behandler lyddata som behæftede data.
         [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , som behandler lyddata som tabeldata. Takket være Jim Potemra, Rich Signell, OOI, og Carrie Wall Bell for anmodninger om lyd / hydrophone fil support.
    * Ændringer i GenerateDataset Xml (og relaterede ændringer) :
        * NYT: ERDDAP™ har nu et system til automatisk [opdatere webaddate- URL 'er](/docs/server-admin/additional-information#out-of-date-urls) både i GenerateDataset Xml og når du indlæser datasæt. Hvis du har forslag til yderligere URL 'er, der skal fanges og opdateres, eller hvis du mener, at dette skal gøres til en tjeneste (som konvertererne) , please email erd.data at noaa.gov .
        * NYT: nu, hvis Generatedataset Xml ser en CF standard\\_name   (som bør være alle små bogstaver) med en uppercase karakter, det tilføjer alle lavercase version til&lt; addAttributes &gt;. Også, når et datasæt belastninger, hvis ERDDAP™ ser en CF standard\\_name med en uppercase karakter, det stille ændrer det til standard\\_name . Takket være Rich Signell.
        * NYT: nu, hvis Generatedataset Xml ser en attribut med en tid, der ikke er i ISO 8601 format, det tilføjer ISO 8601 formateret tid til&lt; addAttributes &gt;. Hvis ERDDAP™ ikke genkende formatet, det lader tidsværdien uændret. Hvis du ser et format, der ERDDAP™ ikke genkende og fastsætte, skal du e-maile det til erd.data at noaa.gov .
        * FORBEDRING: Den lave kode for EDDGrid FromThredds Formand Katalog mulighed i Generatedataset Xml er nu afhængig af Unidata netcdf- java katalog crawler kode (thredds. katalogklasser) så det kan håndtere alle THREDDS kataloger (som kan være overraskende kompleks) . Tak til Roland Schweitzer for at foreslå denne ændring og takket være Unidata til koden.
        * NYT: Generatedataset Xml til EDDGrid FromDap tilføjer nu, "startYear- EndYear" til slutningen af titlen baseret på faktiske tidsakseværdier. Slutår = "nuværende", hvis der findes data inden for de sidste 150 dage.
        * NYT: Generatedataset Xml til EDDGrid FromDap tilføjer nu, " \\[ opløsning \\] ° til titlen, hvis datasættet er jævnt fordelt og det samme for lat og lor.
        * FORBEDRING: Tidskonverteren har nu yderligere funktioner, især evnen til at konvertere strenggange i en lang række fælles formater til ISO 8601 strenge eller til et UDUnits-kompatibelt nummer. Alle tidligere understøttede funktioner fortsætter med at virke, uændret.
        * BUG FIX: Generatedataset Xml og nøgleord konverter nu omfatter "Earth Science &gt;" i starten af GCMD Science søgeord. Når et datasæt indlæses ERDDAP™ , ERDDAP™ nu løser alle GCMD søgeord i nøgleord attribut, der ikke starter med "Earth Science &gt;" eller at bruge noget andet end titel tilfælde (hvor det første bogstav i hvert ord er kapitaliseret) .
        * FORBEDRING: når du foreslår&lt; destinationName &gt; 's, GenerateDataset Xml for EDDTableFromAsciiFiles har lige brugt halen ende af sourceName s med '/'   (nogle var filnavne) . Nu bruger det hele sourceName (f.eks. "blahblahblah (m / s)". Denne ændring vil være godt for nogle datasæt og ikke for andre, men det er sikrere adfærd. Takket være Maurice Libes.
        * BUG FIX: Generatedataset Xml og datasættets konstruktører sikrer nu, at der ikke er flere kolonnenavne. Takket være Maurice Libes.
        * BUG FIX: Generatedataset Xml for EDDTableFromAsciiFiles skrev ikke&lt;columnSeparator &gt; til uddata. Nu gør det. Takket være Maurice Libes.
    * NYT: DasDdsværktøjet udskriver nu oplysninger om tidsmellemrum (i [.timeGaps information](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) om datasættet er et forankret datasæt.
    * NYT: Avanceret søgning accepterer nu "now _\\ - nUnits _" tidsværdier. Takket være Rich Signell.
    * FORBEDRING: For at forbedre sikkerheden, når en e-mailadresse i et datasæts metadata eller data er skrevet til en html webside, "@" erstattes med "at". Dette fanger kun e-mailadresser, der er hele metadata eller dataværdi, ikke e-mailadresser indlejret i længere værdier.
    * FORBEDRING: RSS information til private datasæt er nu kun tilgængelig for brugerne (og RSS læsere) som er logget ind og godkendt til at bruge det datasæt.
    * NY: Nu, når et datasæt er indlæst, hvis date\\_created , date\\_issued , date\\_modified , eller dato\\ _ metadata\\ _ modificeret attribut har en tidsværdi, der ikke er i ISO 8601 format, ERDDAP™ ændrer det til ISO 8601 formateret tid. Hvis ERDDAP™ ikke genkende formatet, det lader tidsværdien uændret. Hvis du ser et format, der ERDDAP™ ikke genkende og fastsætte, skal du e-maile det til erd.data at noaa.gov .
    * FORBEDRING: .dods svar fra EDDGrid Datasættene bør nu være betydeligt hurtigere. Takket være Rich Signell.
    * Ændringer i forbindelse med ERDDAP om oprettelse af ISO 19115-dokumenter:
        * BUG FIX: når du opretter ISO 19115-dokumenter, dataVariable enheder var ikke HTML Attribut kodet og procent kodet. Nu er de. Takket være NGDC 's ISO 19115 validator.
        * BUG FIX: når du opretter ISO 19115-dokumenter, date\\_created blev brugt som det er, så ofte var det forkerte format. Nu er det konverteret til ISO 8601 Z streng. Takket være NGDC 's ISO 19115 validator.
        * BUG FIX: når du opretter ISO 19115-dokumenter, ERDDAP™ nu længere skriver datoer med år = 0000 (som med klimatologi datasæt) , fordi ISO 19115 skema ikke tillader datoer med år = 0000. Takket være NGDC 's ISO 19115 validator.
    * NYT: Som før en anmodning til http ... / erddap / version vil returnere bare versionsnummeret (som tekst) f.eks. " ERDDAP \\ _ version = 1,82 ".
En anmodning til http ... / erddap / version\\ _ string vil returnere et nummer og en valgfri suffiks af '\\ _' plus ASCII tekst (ingen mellemrum eller kontroltegn) f.eks. " ERDDAP \\ _ version\\ _ streng = 1.82\\ _ JohnsFork ". De mennesker, der gør gaffel vil angive dette ved at ændre EDStatic.erddapVersion. Denne måde at gøre det på skaber ikke problemer for tidligere versioner af ERDDAP . Tak til Axiom (især Kyle Wilcox) og Irlands Marine Institute (navnlig Rob Fuller) .
    * BUG FIX: For wms version = 1.3.0, request = GetMap , crs = EPSG: 4326 (ikke CRS: 84) anmodninger: bbox ordren skal være minLat, minLon, maxLat, maxLon. For CRS: 84 anmodninger, som før, bbox ordre skal være minLon, minLat, maxLon, maxLat. Dette kan fastsætte ved hjælp ERDDAP 's WMS 1.3.0 service i ArcGIS   (tak til Paola Arce) . Tak. (ikke) til OGC for at gøre dette så kompliceret. Takket være Leaflet for at håndtere dette korrekt og for at give mig en måde at teste dette.
    * FORBEDRING: Tidligere, den foreslåede link til RSS og e-mail abonnementer har http URL til din ERDDAP . Nu er det https URL, hvis det er aktivt.
    * NYT: EDDGrid Kopiér understøtter nu et valgfrit mærke&lt;kun siden &gt; _ someValue _&lt;/ kun siden &gt;, hvor værdien er en specifik ISO- 8601- formateret tid eller en now- nUnits (f.eks. now- 2 år) Tid. Se [Kun til Siden dokumentation](/docs/server-admin/datasets#onlysince) . Takket være Drew P.
    * FORBEDRING: om muligt, ERDDAP™ vil vise https URL (fra&lt;baseHttpsUrl &gt;, hvis tilgængelig) i stedet for http URL når det fortæller brugerne URL til at tilføje / validere / fjerne / liste et abonnement.
    * BUG FIX: ERDDAP™ nu tillader en abonnement handling at starte med " https://" . (Bob slår panden.) Takket være Jennifer Sevadjian.
    * BUG FIX: .jsonlKVP nu bruger ':' mellem hver nøgle og værdi, i stedet for '=' . (Bob slår panden.) Takket være Alexander Barth.
    * BUG FIX: Tidligere, hvis du genstarter ERDDAP™ med quickRestart = true, og hvis, før datasættet blev genindlæst normalt, du foretaget et opkald til en EDDTableFromFiles datasæt, der brugte updateEveryNMillis, og hvis en datafil netop var blevet ændret, anmodningen ville mislykkes med en null pointer fejl. Nu vil anmodningen lykkes. Takket være John Kerfoot.
    * NYT: Når et datasæt er indlæst ERDDAP™ , nøgleordene er nu omorganiseret i sorteret rækkefølge og eventuelle newline tegn fjernes.
    * Hvis en geojson... .json eller .nc ') Se bilag "Spørgetid". .json p parameter, svar mime type er program / javascript. Bemærk, at .json p er ikke understøttet for .jsonlCSV eller .jsonlKVP da det ikke ville virke. Takket være Rob Fuller.
    * FORBEDRING: Den mime type for json linjer fileType muligheder er nu "ansøgning / x- jsonlines". Det var ansøgning / jsonl. I øjeblikket er der ikke noget definitivt korrekt valg.
    * FORBEDRING: Antallet af mislykkede anmodninger vist på statu.html side vil stige, fordi flere ting tælles som svigt end før, fx, ClientAbortExemption.
    * Hvis et svar fra ERDDAP™ er ikke komprimeret, så overskriften på svaret vil omfatte "Content- Encoding" = "identitet".
    * "Licence" attributten var ikke påkrævet. Hvis det ikke er angivet, standard Licens fra messages.xml (eller fra setup.xml, hvis dette findes) anvendes som standard.
    * NYT: Der er nu en valgfri [fileAccessSuffix attribut](/docs/server-admin/datasets#fileaccessbaseurl) . som kan bruges sammen med de eksisterende [attributten filAccessBaseUrl](/docs/server-admin/datasets#fileaccessbaseurl) .
    * For at øge sikkerheden, blev denne version udarbejdet med den seneste Java JDK v8u162.
    * NYT: For at øge sikkerheden, flere fælles domæner, der tilbyder midlertidige e-mail-adresser (f.eks. @ mailinator.com) er nu på en permanent e-mail sortliste for abonnementssystemet.
    * NYT: For at øge sikkerheden, tallier i Daily Report nu omfatter:
SetDataset Flag IP- adresse mislykkedes (siden sidste daglige rapport)   
SetDataset Flag IP- adresse mislykkedes (siden opstart)   
SetDataset Flag IP-adresse Succesed (siden sidste daglige rapport)   
SetDataset Flag IP-adresse Succesed (siden opstart)   
De "mislykkede" tallier lader dig se hvem (En hacker?) forsøger at sætte et flag, men fejler.
    * FORBEDRING: For at øge sikkerheden, e-mail-adresser i&lt;abonnentEmailBlacklist &gt; i din datasets.xml er nu betragtet som en sag-ufølsom.
         

## Version 1.80{#version-180} 
 (udgivet 2017- 08- 04) 

*    **Nye funktioner (til brugerne) :**   
     
    * NYT orderByCount  () filter lader dig angive hvordan resultattabellen sorteres (eller ikke) og bare returnerer en række for hver sorteringsgruppe, med optællingen af antallet af nonmissing- værdier for hver variabel.
For eksempel: orderByCount  (" stationID ") vil sortere efter stationID og returnerer en række for hver stationID , med en optælling af antallet af ikke-missing- værdier for hver variabel.
Hvis du bare angiver orderByCount  ("") , vil svaret være blot en række med antallet af ikke-missing- værdier for hver datavariabel.
Se [ orderBy ... dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Takket være Ben Adams.
    * NYT .nc oJson- fil Typeindstilling for fastgjorte og tabeldatasæt. Denne indstilling gør en NCO lvl = 2 "pedantisk" JSON fil med alle de oplysninger, der normalt findes i en .nc fil. Se [ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json) Takket være Charlie Zender.
    * BUG FIX: EU orderBy ... () muligheder på Make A Graph webside håndteres nu korrekt.
    * BUG FIX: .geoJson output nu udskriver ikke rækker, hvor lat eller lon værdier mangler. Også højdeværdier (om muligt) er nu inkluderet i koordinaterne, ikke som dataværdier. Takket være Jonathan Wilkins.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:**   
     
    * SIKKERHEDSSPØRGSMÅL: Protocols.js bibliotek bruges til OpenLayers demo WMS sider i ERDDAP™ er forældet og har en fejl, der potentielt gør det muligt at misbruge den. (Desværre, ajourføring OpenLayers og protokoller. Det er ikke let.) Det åbner op for muligheden for, at biblioteket kunne blive oprettet for at tillade en grænseoverskridende sårbarhed. Men siden ERDDAP™ Kun til anvendelse OpenLayers på en bestemt pre- set- up måde og kun med specifik ERDDAP -baseret datakilder, mener vi, at der ikke er nogen grænseoverskridende sårbarhed i ERDDAP 's brug af OpenLayers og protocols.js Men hvis du ikke tror på dette, kan du nu deaktivere brugen af OpenLayers demo WMS sider af din ERDDAP™ ved tilføjelse
```
        <openLayersActive>false</openLayersActive>  
```
til din setup.xml fil. Standard er "sand". Takket være Charles Carleton og NCEI.
    * SIKKERHEDSÆNDRINGER: Ubrugte .jar-filer og duplikerede .jar-filer (fordi de også er i netcdfAll.jar) er blevet fjernet fra ERDDAP™ distribution. Out- of- date .jar filer er blevet opdateret. Takket være Charles Carleton og NCEI.
    * SIKKERHEDSÆNDRINGER: Den netcdfAll.jar fil distribueret med ERDDAP™ er den seneste version (p.t. 4.6.10) , men det indeholder stadig interne jackson .jar filer, der er kendt for at være out- of- date og har sikkerhedssårbarheder, især Jackson biblioteker, der kun bruges, når adgang Amazon S3 datakilder. Hvis du ikke har adgang til data via Amazon S3 (du ville vide hvis du var) , disse sårbarheder er ikke relevante.
        
Netcdf- java udviklere hævder, at disse sårbarheder er ikke relevante på grund af den måde, at netcdf kode bruger disse biblioteker og under alle omstændigheder ville kun være relevante, når adgang Amazon S3. Se [ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866) . Jeg tror på dem. Hvis du stadig har bekymringer om dette, bedes du kontakte netcdf- java udviklere. (Bemærk, at hvis du ikke tror på netcdf- java udviklere og overvejer ikke at bruge ERDDAP™ på grund af dette, bør du ikke bruge Thredds enten, fordi Thredds bruger netcdf- java mere grundlæggende og mere omfattende end ERDDAP .) 
        
Detaljer: Den besværlige kode og sårbarhedsadvarslerne er:
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.core / jackson- databaind / pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høj
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.dataformat / jackson- dataformat- cbor / pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høj
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.core / jackson- annotationer / pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høj
Se https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Kritisk
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.core / jackson- core / pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høj
Se https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Kritisk
"For version 4.6.10, aws- java- sdk- core trækker i version 2.6.6 af jackson-\\ * artefakter". (email fra netcdf- java folk) .
Takket være Charles Carleton og NCEI.
        
    * COMPLER ÆNDRINGER: Hvis du rekompilerer ERDDAP™ , Bemærk, at -cp klassesti parameter, der er nødvendig for kommandolinjen er nu meget kortere end før. Se den nye -cp indstilling i [denne dokumentation](/docs/contributing/programmer-guide#development-environment) . Takket være Charles Carleton og NCEI.
    * NY OPTION i Generatedataset Xml: EDDTableFromBcodmo, som kun er til intern brug hos BCO- DMO.
Takket være Adam Shepherd og BCODMO.
    * NYT ATTRIBUT OG FEATUR: Hvis en EDDTable-kolonne har filnavne på webtilgængelige filer (f.eks. billed-, video- eller lydfiler) , kan du tilføje
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
at angive basens URL (slutter med /) er nødvendige for at gøre filnavnene til fuldstændige URL 'er. Så for .htmlTable svar ERDDAP™ vil vise filnavnet som et link til den kombinerede URL (basen Url plus filnavnet) .
Hvis du vil ERDDAP™ at tjene de relaterede filer, lave en separat EDDTableFromFileNames datasæt for disse filer (det kan være et privat datasæt) .
Takket være Adam Shepherd og BCODMO.
    * ANBEFALING AF NYE ATTRIBUTTER: Hvis en EDDTable-kolonne har filnavne på webtilgængelige filer (f.eks. billed-, video- eller lydfiler) som er tilgængelige via et arkiv (f.eks. .zip fil) tilgængelig via en URL, brug
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
for at angive URL 'en for arkivet.
Hvis du vil ERDDAP™ til at tjene arkivfilen, lave en separat EDDTableFromFileNames datasæt for denne fil (det kan være et privat datasæt) .
Takket være Adam Shepherd og BCODMO.
    * FORBEDRING AF GenerateDataets Xml for at fjerne årsagerne til ugyldig / dårlig&lt; subsetVariables &gt; forslag og duplikerede / dårlige foreslåede variable navne, osv. Takket være Rich Signell, Adam Shepherd og BCO-DMO.
    * NY OPTION: Den politiske grænse information distribueret med ERDDAP er fra en tredjepart og noget forældet. Også, der er omstridte grænser på flere steder i verden, hvor forskellige mennesker vil have forskellige ideer om, hvad der er korrekt. Vi gør ingen krav om korrektion af de POLITISKE BOUNDAR data, der vedrører ERDDAP . Hvis du ikke kan lide den politiske grænse information, der kommer med ERDDAP™ du kan nu fortælle ERDDAP™ til aldrig at trække politiske grænser ved at tilføje
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
til din setup.xml fil. Standard er "sand". Takket være Raju Devender.
    * NY METADATA TAG: I datasets.xml for et datasæt, kan du nu angive standardnummeret for farve Barnesektioner til a dataVariable på grafer og kort med
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (standard = -1, som siger at lade ERDDAP™ beslutte) . Se [farve Linjeindstillinger](/docs/server-admin/datasets#color-bar-attributes) .
    * FORBEDRING: statens grænse farve på kort var lilla (Deep Purple til dig Baby Boomers) . Nu er den grå (mellem den nationale grænse grå og land grå) .
    * BUG FIX:&lt;iso19115File &gt; og&lt;fgdcFile &gt; in datasets.xml blev ikke altid håndteret korrekt. Nu er de. Takket være BCO-DMO.

## Version 1.78{#version-178} 
 (udgivet 2017- 05- 27) 

*    **Nye funktioner (til brugerne) :**   
     
    *    (ingen)   
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:**   
     
    * FORBEDRING: Rækkefølgen af linjer i "Major LoadDataset Time Series" på statu.html side er nu nyeste på toppen til ældste i bunden.
    * BUG FIX: ERDDAP™ nu skriver .nccsv filer med tidsvariablen actual\\_range som ISO- 8601 Strengtid. Det løser fejlen med EDDTableFromErddap fortolker info fra et eksternt datasæt og fra quicKRestart- filen for alle EDDTableFrom... Filer datasæt. (Tidspunktet actual\\_range vil være forkert første gang datasættet belastninger i v1.78, men korrekt efter det er genindlæst, fx, hvis du flag datasættet.) 

## Version 1.76{#version-176} 
 (udgivet 2017- 05- 12) 

*    **Nye funktioner (til brugerne) :**   
     
    * ÆNDRINGER i Tomcat: For anmodninger til ERDDAP™ kommer fra anden software end webbrowsere (f.eks. curl , R Matlab , Python , Java ) :
Som med tidligere ændringer i versioner af Tomcat (det laveste niveau software, der kører ERDDAP ) siden begyndelsen af 2016, skal flere og flere af de tegn i forespørgslen del af forespørgsel URL være [ **Procent indkodet** ](/docs/server-admin/datasets#infourl) af sikkerhedsgrunde. Browsere tage sig af procent kodning for dig. så bruger ERDDAP™ i en browser er ikke påvirket, medmindre anmodningen bliver omdirigeret til en anden ERDDAP .
    * Tidligere, ERDDAP™ behandlet **Char variabler** mere som usignerede korte heltal end tegn. Nu behandler det dem mere som 1-karakteristik-lang UCS-2 (Unicode) Strenge. Se [char dokumentation](/docs/server-admin/datasets#char) . Takket være Aurelie Briand og Argo projektet.
    * Tidligere, ERDDAP™ Tilbød lidt støtte til **Unicode- tegn** over tegn # 255 i strenge. Nu, internt, ERDDAP™ fuldt understøtter 2- byte UCS-2 tegn (tegn nummereret 0 til 65535) i Strings. Når String data er skrevet til forskellige filtyper, ERDDAP™ gør det bedste det kan for at støtte 2-byte karer. Et andet eksempel er .csv filer, som ERDDAP™ skriver med ISO- 8859-1 charset (a 1-byte-tegnsæt) , så ERDDAP™ skriver tegn over tegn # 255 med JSON- like\\ u _ hhh _ syntax. Se [Strengdata](/docs/server-admin/datasets#string) .
    * FORBEDRING: I .nc filer skrevet af ERDDAP™ , char variabler, der skal fortolkes som Strings vil have attributten
         **\\ _ Kodning = ISO- 8859-1**   
I .nc filer læst af ERDDAP™ , char variabler med "\\ _ Encoding" vil blive fortolket som strenge med det angivne tegnsæt.
    * REMINDER: ERDDAP™ støtter **JSON- like backslash- kodning** med særlige tegn, når du angiver begrænsninger i Char og String variabler. Således kan du bede om noget som & myString = "\\ u20ac" når du vil have rækker af data hvor myString = €siden 20ac er den hexadecimale version af kodepunktet for eurosymbolet. Flere kilder på nettet viser kodenumrene for Unicode-symboler, f.eks.: [ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode) .
    * Tidligere, ERDDAP™ Tilbydes begrænset støtte til **lang heltal** variabler. Nu ERDDAP™ fuldt understøtter længes internt og gør sit bedste, når du skriver lange data til forskellige filtyper.. Se [lang dokumentation](/docs/server-admin/datasets#long) . Takket være Irlands Marine Institute, Craig Risien, Rich Signell, Christopher Wingard og OOI.
    * NYT: output- filtype for griddap og tabledap : ** .nccsv ** , som gør en NetCDF -lignende, ASCII, CSV fil, der også indeholder alle de metadata, der ville være i en sammenlignelig .nc fil. Se [NCCSV Specifikation](/docs/user/nccsv-1.00) . Takket være Steve Hankin.
    * NYT: ** orderByClosest filter** kan du angive hvordan resultattabellen vil blive sorteret og et interval (f.eks. 2 timer) . Inden for hver sorteringsgruppe vil kun de rækker, der er tættest på intervallet, blive holdt. For eksempel: orderByClosest  (" stationID , tid, 2 timer ") vil sortere efter stationID og tid, men kun returnere rækkerne for hver stationID hvor den sidste orderBy kolonne (tid) er tættest på 2 timers intervaller. Dette er det tætteste på tabledap til skridtværdier i en griddap anmodning. Denne indstilling kan angives via enhver tabledap dataset 's .html webside, .graph webside, og ved enhver URL, at du genererer dig selv. Takket være Irlands Marine Institute og Ocean Networks Canada.
    * NYT: ** orderByLimit filter** kan du angive, hvordan resultaterne tabellen vil blive sorteret og et limit nummer (f.eks. 100) . Inden for hver sorteringsgruppe vil kun de første "limit" rækker blive holdt. For eksempel: orderByMax  (" stationID , 100 ") vil sortere efter stationID , men kun returnere de første 100 rækker for hver stationID . Dette svarer til SQL 's LIMIT-klausul. Denne indstilling kan angives via enhver tabledap dataset 's .html webside, .graph webside, og ved enhver URL, at du genererer dig selv. Takket være Irlands Marine Institute og Ocean Networks Canada.
    * NYT: To nye svarfiltyper, ** .jsonlCSV og .jsonlKVP ** er tilgængelige for anmodninger til broderede datasæt, tabeldatasæt og mange andre steder i ERDDAP   (f.eks. anmodninger om oplysninger om datasæt) . Filerne er JSON Lines filer ( [ https://jsonlines.org/ ](https://jsonlines.org/) ) hvor hver linje har et separat JSON objekt. .jsonlCSV har værdierne i CSV-format. .jsonlKVP har nøgle: Værdipar. Hver linje står på sin egen. Linjerne er ikke indkapslet i et større JSON array eller objekt. For eksempel se [denne stikprøveanmodning](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) . Takket være Damian Smyth, Rob Fuller, Adam Leadbetter og Irlands Marine Institute.
    * NYT: Der er ny dokumentation, der beskriver [ **Sådan får du adgang til private datasæt i ERDDAP™ via scripts** ](/docs/user/AccessToPrivateDatasets) . Takket være Lynn DeWitt.
    * FORBEDRING: ** OpenLayers ** Kortet var 2 grader og er nu 4 data pixels. Takket være Rusty Holleman.
    * FORBEDRING: I nogle almindelige tilfælde, anmodninger, der omfatter en **regulært udtryk** begrænsning vil blive behandlet meget hurtigere.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:**   
     
    *    **SLOW FØRSTE STARTUP:** Første gang du starter denne nye version, vil det tage lang tid for ERDDAP™ at indlæse alle datasæt, fordi det skal gen- læse alle kildedatafiler (selv om bare overskriften for behæftede datafiler) . Hvis du ser på logfilerne, kan du se fejlmeddelelser, der siger "gammel / uunderstøttet forbedret Version" af nogle interne filer -- det er okay -- ERDDAP™ vil gøre de nye versioner af de interne filer. Vær tålmodig.
    * AKTION: ERDDAP™ nu bruger den nye **java.time** klasser (også kendt som JSR 310) i stedet for Joda at fortolke String gange i numeriske gange. Bemærkninger:
        * Hvis ERDDAP™ pludselig har problemer med fortolkning String gange for en given datasæt og dermed bare konverterer de fleste eller alle gange til NaN 's (Manglende værdier) , problemet er næsten altid med datoen Time format streng, som du har angivet som "enheder" af variablen. Det nye system har nogle gange brug for en lidt anderledes dateTime format streng.
        * Hvis numeriske måneder og dage i dateTime strenge ikke 0-polstret (f.eks. "3 / 7 / 2016") , sørg for at formatet bare har en enkelt M og d (f.eks. "M / d / åååå", ikke "MM / dd / åååå") .
        * Ændre eventuelle fraktionerede sekunder specifikation, der bruger lavercase s 's (For eksempel, den .sss i yyyy-MM-dd Ikke 'HH: mm: sss.sss) til kapital S 'er (f.eks. yyyy-MM-dd Ikke HH: mm: ss.SSS) .
        *    ERDDAP™ understøtter ikke længere strengdato Tidsformater med tocifrede år (YYY) med et implicit århundrede (f.eks. 1900 eller 2000) . Virksomhederne brugte milliarder af dollars på at løse dette problem i slutningen af 1990 'erne. Forskere bør ikke bruge to cifrede år. Fastsæt kildefilen (s) ved konvertering til 4-cifret år, og derefter bruge åååå på datoen Tidsformat.
        * Du kan bruge åååå eller ÅÅÅÅ (som ERDDAP™ konverterer til uuu) til at fortolke 4 cifret år, herunder negative år, f.eks. -4712 (som er 4713 f.Kr.) . Takket være SeaDataNet, Thomas Gardner og BODC.
        * Fortsæt med at bruge Z i et dateTime format for at få ERDDAP til at fortolke en tidsforskydning (f.eks. Z, + 0200, -08, -0800, -08: 30) .
        *    **Sørg for at bruge Java version 1.8.0\\ _ 21 eller højere.** 
        * Programmer -- Hvis du skriver Java programmer, der kører ERDDAP™ kode, skal du fjerne henvisningen til joda- tid. krukke i klassens sti parameter.
    * NYT: ERDDAP 's [ArchiveA Datasæt værktøj](/docs/server-admin/additional-information#archiveadataset) kan nu oprette [ **BagIt-filer** ](https://en.wikipedia.org/wiki/BagIt) . NCEI kan standardisere på dette format. Takket være Scott Cross og John Relph.
    * FORBEDRING: links til at downloade erddap. Krigen mod ERDDAP™ Websider nu pege på **GitHub** . (De er offentlige links, så du behøver ikke at deltage i GitHub.) Dette betyder meget hurtigere downloads (op til 12Mb / s versus 1Mb / s) og få problemer med downloads. Takket være Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney og Irlands Marine Institute.
    * FORBEDRING: **statu.html side og den daglige statusrapport e-mail** nu omfatte en "Major LoadDataset Time Series" sektion, der viser statistikker om ERDDAP™ fra slutningen af hver større loadDataset for de sidste 100 store loadDataets. Takket være vores besværlige RAID.
    * NYT: en ny, valgfri (men anbefales) parameter for EDDTableFromCassandra datasæt: [ ** &lt;partitionKeyCSV &gt; ** ] (/ docs / server- admin / datasæt # partitionkeycsv) . Takket være Ocean Networks Canada.
    * NYT: EDDTableFromAssciiFiles understøtter nu ** &lt;columnSeparator &gt; ** parameter. Hvis null eller ", klassen vil gætte, som før, Ellers vil det første tegn vil blive brugt som kolonne separator, når du læser filerne. Takket være Sky Bristol og Abigail Benson.
    * Ny: den nye datatype [ **EDDTableFromNccsvFiler** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) , kan lave et datasæt ved at aggregere [NCCSV .csv filer](/docs/user/nccsv-1.00) . Takket være Steve Hankin.
    * FORBEDRING: **EDDTableFromErddap** nu bruger .nccsv at få oplysninger fra fjernbetjening ERDDAP s og for det lokale arkiv over denne metadatainformation. Dette giver fuld støtte til Char og lange datatyper, og til Unicode (UCS-2) charset for kløer og strenge. Takket være Rob Fuller og Irlands Marine Institute.
    * FORBEDRING: EDDTableFromErddap og EDDGrid FromErddap understøtter nu ** &lt;omdirigerer &gt; false&lt;/ omdiriger &gt; ** som fortæller ERDDAP™ aldrig at omdirigere anmodningen til fjernbetjeningen ERDDAP . Standard er sand. Dette er nyttigt, når fjernbetjeningen ERDDAP™ er en privat ERDDAP . Takket være Damian Smyth, Rob Fuller, og Irlands Marine Institute.
    * FORBEDRING: ERDDAP™ nu fangster **annullerede brugeranmodninger** før. Og ERDDAP™ nu lukker ned hurtigere, fordi det lave niveau tråde lukker ned hurtigere. Takket være vores besværlige RAID.
    *    **GenerateDataset Xml:** 
        * NYT: Den nye særlige EDDType "ncdump" udskriver en [ncdump](https://linux.die.net/man/1/ncdump) \\ - som udskrift af hovedet af en .nc fil. Du kan også udskrive dataværdierne for bestemte variabler (eller indtast "intet" for ikke at udskrive nogen dataværdier) . Dette er nyttigt, fordi, uden ncdump er det svært at vide, hvad der er i en fil, og dermed hvilken EDDType du skal angive for GenerateDatasetsXml. Takket være Craig Risien, Rich Signell, Christopher Wingard og OOI.
        * NYT: For SeaData Nettotal:
Når det er relevant, GenerateDataets Xml gør nu en specifik semantisk konvertering ved hjælp af en ekstern SPARQL forespørgsel: hvis en variabel kilde metadata omfatter en sdn\\ _ parameter\\ _ urn, fx sdn\\ _ parameter\\ _ urn = "SDN: P01::: PSLTZZ01", GenerateDataets Xml tilføjer den tilsvarende P02-attribut, f.eks. sdn\\ _ P02\\ _ urn = "SDN: P02:: PSAL". Hvis du har datasæt, der bruger disse attributter, og hvis din ERDDAP 's&lt; categoryAttributes &gt; i setup.xml omfatter sdn\\ _ parameter\\ _ urn og sdn\\ _ P02\\ _ urn, vil brugerne være i stand til at bruge ERDDAP™ Kategori søgesystem til søgning efter datasæt med specifikke værdier af disse attributter. Takket være BODC og Alexandra Kokkinaki.
        * FORBEDRING: Generatedataset Xml ændrer nu mange http:// referencer i metadata til https:// når det er relevant.
        * FORBEDRING: Generatedataset Xml nu forsøger at gætte skaberen\\ _ type og udgiver\\ _ type.
        * FORBEDRING: Variablens datatyper foreslået af GenerateDataets Xml vil nu være lidt bedre. Takket være Margaret O 'Brien, LTER og EML.
        * FORBEDRING: Generatedataset Xml er bedre til at specificere&lt;cdm\\ _ data\\ _ type & gt;, og tilføje de relaterede, krævede attributter (fx&lt;cdm\\ _ timeseries\\ _ variable & gt;), så du kan give denne information. Takket være Rich Signell.
        * FORBEDRING: I Generatedataset Xml, for EDDTable datasæt, forslaget til&lt; subsetVariables &gt; er nu meget mere konservativt. Takket være John Kerfoot.
        * FORBEDRING: datasets.xml for et datasæt angiver featureType men ikke CDM\\ _ data\\ _ type, den featureType vil blive brugt som cdm\\ _ data\\ _ type. Takket være Rich Signell.
        * BUG FIX: generér Datasæt Xml nu foreslår den korrekte&lt;dataType &gt; for datavariabler, der har scale\\_factor , add\\_offset og / eller\\ _ Usignerede attributter.
    * FORBEDRING: ERDDAP™ åbner en .nc fil, der er **kortere** end det skulle være (F.eks. blev den ikke kopieret helt på plads) , ERDDAP™ Nu behandler filen som skidt. Tidligere: ERDDAP™ returnerede manglende værdier for enhver manglende del af filen, fordi det er standard adfærd for netcdf- java. ERDDAP™ nu bruger ucar .nc 2.iosp.netcdf3.N3header.distill FileTruncation = true; Takket være vores besværlige RAID og Christian Ward-Garrison.
    * FORBEDRING: ISO 19115 forfatteren gør nu brug af **creator\\ _ type** om nødvendigt.
    * FORBEDRING: ERDDAP™ nu bruger den nyeste netcdf- java v4.6.9 som kan læse yderligere typer af **netcdf-4-filer** . Takket være Craig Risien, Rich Signell, Christopher Wingard og OOI.
    * BUG FIX: undgå problemer, hvis forskellige kildefiler har forskellige datatyper for en given variabel. Takket være Roy Mendelssohn og Eugene Burger.
    * BUG FIX: **Time format konverteringer** er nu bedre beskyttet mod dårlige tidsværdier. Takket være NDBC.
    * BUG FIX: EDDGrid FromNcFiles Udpakket nu håndterer tidsværdier med **"måneder siden"... og "år siden"...** korrekt (ved at øge måneden eller året, ikke ved groft at tilføje fx, 30 dage gentagne gange) . Takket være Soda3.3.1
    * Lige i v1.74, **abonnementer** krævede en handling (f.eks. http:// ...) , som var og bør være valgfrit.
    * BUG FIX: EDDGrid FromMergeIRFiles.lowGetSourceMetadata () ikke tilføje nogen globale attributter. Nu gør det.
         

## Version 1.74{#version-174} 
 (udgivet 2016- 10- 07) 

*    **Nye funktioner (til brugerne) :**   
     
    * Nu, når en liste over datasæt (Alle, eller fra en søgning) vises på en webside, er lange titler vises på flere linjer. Tidligere blev midten af en lang titel erstattet af "... Takket være Margaret O 'Brien, LTER og EML.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:**   
     
    * TO: På Linux-computere, ændre Apache timeout indstillinger, så tidskrævende brugeranmodninger ikke timeout (med hvad der ofte vises som en "Proxy" eller "Bad Gateway" fejl) . Som root-bruger:
        
        1. Ændr apacherne http d.conf- fil (normalt i / etc / http d / conf /) :
Ændr eksisterende&lt;Tidsudløb &gt; indstilling (eller tilføje en i slutningen af filen) til 3600 (sekunder) , i stedet for standard 60 eller 120 sekunder.
Ændr eksisterende&lt;ProxyTimeout &gt; indstilling (eller tilføje en i slutningen af filen) til 3600 (sekunder) , i stedet for standard 60 eller 120 sekunder.
        2. Genstart Apache: / usr / sbin / apachectl - k yndefuld (men nogle gange er det i en anden mappe) .
        
Takket være Thomas Oliver.
         
    * NYT: \\[ Big ParentDirectory / hard Flagmappe
Dette virker som flagmappen, men hardFlag-versionen sletter også alle datasættene. Der er ingen URL 'er til at sætte en hardFlag. Dette kan kun bruges ved at sætte en fil i denne mappe.
hård Flag er meget nyttige, når du gør noget, der forårsager en ændring i, hvordan ERDDAP™ læser og tolker kildedata, for eksempel, når du installerer en ny version af ERDDAP™ eller når du har foretaget visse typer ændringer i en datasæts definition i datasets.xml . Se [denne dokumentation](/docs/server-admin/additional-information#hard-flag) . Takket være John Kerfoot og alle Argo-grupperne.
         
    * NYT: Generatedataset Xml har nu en EDDTableFromEML mulighed
der læser et datasæt beskrivelse i et økologisk metadata sprog (EML) fil, downloads den relaterede datafil, og genererer et stykke af datasets.xml så datasættet kan tilføjes til ERDDAP . Der er også en EDDTableFromEMLBatch som gør det samme for alle EML filer i en mappe. Dette virker meget godt, fordi EML gør et fremragende stykke arbejde med at beskrive datasættet, og fordi KNB og LTER gør de faktiske datafiler tilgængelige.
EML plus ERDDAP™ kunne være en stor kombination, da ERDDAP™ kunne give brugerne mere direkte adgang til den rigdom af KNB og LTER data og hjælpe disse projekter opfylde den amerikanske regerings [Offentlig adgang til forskningsresultater (PARR) krav](https://nosc.noaa.gov/EDMC/PD.DSP.php) ved at gøre dataene tilgængelige via en webtjeneste.
Se [denne dokumentation](/docs/server-admin/EDDTableFromEML) . Takket være Margaret O 'Brien, LTER og EML.
         
    * NYT: Generatedataset Xml har nu en EDDTableFromInPort mulighed
som læser et datasæt beskrivelse i en InPort XML fil og forsøger at generere et stykke af datasets.xml så datasættet kan tilføjes til ERDDAP . Dette skaber sjældent en ready- to- use stykke XML til datasets.xml , men det vil skabe et godt groft udkast, der er et godt udgangspunkt for redigering af et menneske.
Det ville være godt, hvis folk, der bruger InPort til at dokumentere deres datasæt ville også bruge ERDDAP™ til at gøre de faktiske data tilgængelige via ERDDAP 's web-tjenester og dermed opfylde den amerikanske regerings og NOAA 's [Offentlig adgang til forskningsresultater (PARR) krav](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) ved at gøre dataene tilgængelige via en webtjeneste. Det er en løsning, der kan bruges lige nu. ( erd.data at noaa.gov er glad for at hjælpe.)   
Se [denne dokumentation](/docs/server-admin/datasets#eddtablefrominport) . Takket være Evan Howell og Melanie Abecassis.
         
    * FORBEDRING: ERDDAP™ bruger nu netcdf- java 4.6.6.
Med tidligere versioner, netcdf- java læse nogle fyld værdier (Måske, bare i netcdf-4 filer) som nuller. Nu læser nogle af dem som netcdf standard fyld værdi: -127 for bytes, -32767 for shorts, -2147483647 for ints. Unidata siger, at den nye adfærd er den rette adfærd. Hvis en variabel i et datasæt begynder at vise en af disse værdier, hvor de plejede at vise nuller, kan du tilføje, fx,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
til variablen addAttributes til at fortælle ERDDAP™ til at behandle denne værdi som en missing\\_value /\\ _ Fyld Værdi. Men i mange tilfælde, der ikke vil give det ønskede resultat: 0. Hvis ja, overveje at ændre filerne med NCO eller omskrive filerne. Klager? Kontakt venligst Unidata ; -)
         
    * TO: New Topographidepth palette
Jeg opfordrer dig til at skifte alle datasæt, der bruger OceanDepth palette til at bruge den nye TopographyDepth palette, som er ligesom Topography undtagen med farver flippet, så det er egnet til dybde værdier (positiv = ned) i stedet for højdeværdier (positiv = op) . De anbefalede indstillinger for denne palette er:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NY FEATUR: String missing\\_value og / eller\\ _ FillValue
Hvis en streng variabel definerer en missing\\_value og / eller\\ _ FillValue ERDDAP™ vil nu fjerne disse værdier fra dataene og erstatte dem med en tom streng, så manglende værdier vises som tomme strenge, som med andre datasæt i ERDDAP . Takket være Margaret O 'Brien, LTER og EML.
         
    * NY FEATUR: Støtte til lokale tider
tidsstempel variabler med kildedata fra strenge kan nu angive en tidszone via en " time\\_zone "attribut, der fører ERDDAP™ til at konvertere de local- time- zone kildetidspunkter (nogle i Standard tid, nogle i Daylight Saving tid) til Zulu gange. Listen over gyldige tidszoner er sandsynligvis identisk med listen i TZ-kolonnen i [Denne tabel](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Standard er " Zulu ". Fælles amerikanske tidszoner er: US / Hawaii, US / Alaska, US / Pacific, US / Mountain, US / Arizona, US / Central, US / Eastern. For tidsstempler variabler med numeriske kildedata, kan du angive" time\\_zone "attribut, men værdien skal være" Zulu "eller" UTC ". Takket være Margaret O 'Brien, LTER og EML.
         
    * NYE FEATUR: EDDTableFromAssciiFiles understøtter nu semikolon- adskilte filer
og er klogere på at finde ud af separatoren. Takket være Margaret O 'Brien, LTER og EML.
         
    * NY FEATUR: Hvis der er en betydelig fejl i loadDataset (større eller mindre, f.eks. en manglende eller ugyldig datasets.xml dokument) , ERDDAP™ vil nu angive det i statu.html, lige under "n Datasættene mislykkedes at indlæse" som ERROR: under behandling datasets.xml : se log.txt for detaljer.
         
    * NY FEATUR: ERDDAP™ Jeg leder efter forældreløse.
Hvornår ERDDAP™ gør en stor belastning Datasets, det ser nu efter forældreløse datasæt (datasæt, der er i ERDDAP™ men ikke i datasets.xml ) . Hvis fundet, er de opført i statu.html, lige under "n Datasættene mislykkedes at indlæse" som ERROR: n Orphan Datasættene (datasæt ERDDAP™ men ikke i datasets.xml ) =...
Hvis du ønsker at fjerne (aflæsning) en forældreløs fra ERDDAP™ , skal du tilføje
        &lt;dataset type = "_ anyValidType _" datasetID = "_ theDatasetID _" active = "false" / &gt;
til datasets.xml indtil datasættet er aflæsset i løbet af de næste større loadDataset.
         
    * BUG FIX: Hvis et datasæt havde en numerisk tidsstempelvariabel med andre enheder end "seconds since 1970-01-01T00:00:00Z" og med&lt;updateEveryNMillis &gt; system aktiv, tidsstemplet variabel blev sat forkert, når datasættet blev opdateret. Takket være John Kerfoot.
         
    * BOG FIX: hvis&lt;quickGenstart &gt; var sandt i setup.xml og du anmodede om data fra en EDDTableFrom... Filer datasæt der bruges&lt;updateEveryNMillis &gt;, den første anmodning til datasættet ville mislykkes, men efterfølgende anmodninger ville lykkes. Nu vil den første anmodning ikke fejle. Takket være John Kerfoot.
         
    * BUG FIX: GenerateDatasetsXml.sh og .bat fungerede ikke med &gt; 9 parametre på kommandolinjen. Nu gør de. Takket være John Kerfoot.
         
    * BUG FIX: De nye EDDTableFromMultidimNcFiles ikke konsekvent fjerne efterfølgende mellemrum fra strenge. Nu gør det. Dette påvirkede især ARGO-filer. Takket være Kevin O 'Brien og Roland Schweitzer.
         
    * BUG FIX: Al fjernadgang DAP tjenester er nu iværksat af mere moderne kode. Dette løser "forbindelse lukket" fejl, når adgang til nogle EDDTableFromErddap datasæt. Takket være Kevin O 'Brien.
         
    * BUG FIX: Håndtering af orderBy ... () og særskilt () er nu tilbage til den måde, de var før de seneste ændringer: en given anmodning kan have flere orderBy ... () og / eller særskilt () filter ERDDAP™ vil håndtere dem i den rækkefølge, de er angivet. Takket være David Karuga.
         
    * BUG FIX: Hvis datasættet er EDDTableFromDatabase og en forespørgsel har [sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) og / eller [sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) , så databasen kan (afhængigt af indstillingerne i datasets.xml ) med eller uden håndtag **kun den første**   orderBy .. () eller særskilt () . Takket være David Karuga.
         
    * BUG FIX: Den seneste ekstra kodning forårsagede problemer med nogle forespørgsler til .nc CF-filer, f.eks. "HTTP-status 500 - Forespørgsel fejl: variabel = station er opført to gange i resultatvariablerne liste". Takket være Kevin O 'Brien.
         
    * BUG FIX: EDDTableFromFiles havde problemer med at genindlæse et datasæt, når en af kolonnerne var en sand char kolonne. Takket være Roland Schweitzer.
         
    * BUG FIX: EDDGrid FromNcFiles Udpakket nu også konverterer missing\\_value og\\ _ FillValue til standardværdier, så filer med forskellige værdier kan aggregeres. På grund af denne ændring, efter du installerer denne nye version af ERDDAP™ , please set a [hård Flag](/docs/server-admin/additional-information#hard-flag) for hver EDDGrid FromNcFiles Upakket datasæt i ERDDAP .
         
    * FORBEDRING: EDDTableFromNcCFFiles kan nu håndtere filer, der har flere prøve\\ _ dimension er. Et givet datasæt må kun anvende variabler, der anvender en af prøvningens dimensioner. Takket være Ajay Krishnan.
         
    * For EDDTableFrom...&lt;sortFilesBySourceNavne &gt; nu tillader kommasepareret (anbefales) eller rumadskilte lister over variable kildenavne. I begge tilfælde kan individuelle variable navne være omgivet af dobbelte citater, f.eks. hvis navnet har et internt rum.

## Version 1.72{#version-172} 
 (udgivet 2016-05-12) 

*    **Nye funktioner (til brugerne) :** Ingen.
     
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * NYE EDDTableFromMultidimNcFiles [EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles) er et nyt alternativ til EDDTableFromNcFiles. Det er designet til at håndtere grupper af filer med flere variabler med fælles dimensioner, f.eks. var1 \\[ a \\]  \\[ b \\] , var2 \\[ a \\] , var3 \\[ b \\] , ScalarVar. Takket være Argo Project, Aurélie Briand og Roland Schweitzer.
    * BUG FIX: ERDDAP™   (via klasse FileVisitorDNLS og FileVistorSubdir) følger nu symbolske links på Linux. ERDDAP™ stadig ikke følge. Ink er på Windows.
    * BUG FIX af fejl indført i 1.70: separat + orderBy var ikke tilladt sammen i én anmodning. Nu er de igen. De er ikke gensidigt eksklusive / overflødige. Takket være David Karuga.
    * ÆNDRINGER datasets.xml sortliste over IP-adresser:
IP v4 adresser synes at ERDDAP™ som 4 periodeadskilte hextal.
Jeg tror IP v6 adresser vises som 8 kolonseparerede hex numre.
Så ERDDAP™ understøtter nu koloner i IP-adresser i denne liste og:\\ * i slutningen af listen til at blokere en række adresser.
    * FORBEDRING: ERDDAP™ nu bruger NetcdfFileWriter til at skrive .nc filer i stedet for de forældede NetcdfFileWritable. Der bør ikke være nogen mærkbar ændring til de resulterende filer. Dette åbner mulighed for at gøre store .nc filer, der bruger .nc 3 64 bit udvidelser. Hvis du ønsker / har brug for det, bedes du sende en anmodning til erd.data at noaa.gov .
    * FORBEDRING: Mange af links til eksterne hjemmesider var forældede. Nu er de up-to-date og brug https: i stedet for http : når det er muligt.
    * Mange små ændringer.

## Version 1.70{#version-170} 
 (udgivet 2016- 04- 15) 

*    **Nye funktioner (til brugerne) :** Ingen.
     
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** Nedenfor er der flere anbefalede ændringer af dokumentationen i din setup.xml fil.
Vær venlig at foretage disse ændringer nu.
30 minutters arbejde nu kan spare dig timer af forvirring i fremtiden.
    * Fejlfiks: Problemet var, at anmodninger, der blev omdirigeret til en fjerntliggende ERDDAP mislykkedes med et ugyldigt tegn ' | 'fejlmeddelelse. Dette skete kun med de seneste versioner af Tomcat. Takket være Rusty Holleman, Conor Delaney og Roy Mendelssohn.
    * Fejlfiks: ERDDAP™ bruger nu en up- to- date version af netcdf- java (det er en lang historie) som omfatter up- to- date støtte til NcML, som løser problemet med NcML LogicalReduce ikke virker som forventet. Der kan være et par små ændringer i metadata, som ERDDAP™ læser via netcdf- java fra .nc , .hdf , .grib, og .bufr filer. Takket være Favio Medrano.
    * Det nye [EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows) giver dig mulighed for at lave en fusioneret EDDTable datasæt fra to eller flere EDDTable datasæt, som har de samme data variabler ved hjælp af de samme enheder. Tak til Kevin O 'Brien.
    * Nye muligheder for EDDTableFromDatabase ( [sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) og [sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) ) lad dig angive om ERDDAP™ , databasen, eller begge, håndtere forskellige og orderBy   (og alle varianter) begrænsninger. Takket være David Karuga.
    * Du kan nu gøre et privat datasæt grafer og metadata tilgængelige for offentligheden via det nye [&lt;grafsAccessibleTo &gt; offentlig&lt;/ grafsAccessibleTo &gt;] (/ docs / server- admin / datasæt # grafsaccessibleto) tag. Takket være Emanuel Lombardi.
    * Nu, hvis en streng gik til Generatedataset Xml eller DasDds er omgivet af dobbelte citater, er det ikke citeret (som om det er en JSON streng) . Takket være John Kerfoot og Melanie Abecassis.
    * GenerateDataset Xml understøtter nu "standard" for at få standard og "intet" for at få en tom streng (de arbejder med eller uden citater) . Dette løser nogle problemer i forbindelse med at passere tomme strenge.
    * Nu, i Generatedataset Xml, for alle EDDGrid FromFiles og EDDTable FromFiles datasæt, hvis prøven Filnavn du angiver er "" (den tomme streng) , det vil bruge den sidste matchende filnavn fra mappen + regex + rekursive = true.
    * Opdateret: DisplayInBrowser-koden, som bruges til at vise resultaterne af GenerateDatasetsXml og DasDds på Linux-computere, var forældet og gav et mærkeligt budskab om Netscape. Dette bruger et moderne Linux-værktøj: xdg- open. Takket være Melanie Abecassis.
    * EU allDatasets dataset har nu en "files" søjle, som angiver basens URL for linket / filer (hvis der er en) til datasættet.
    * Øge den generelle sikkerhed af din ERDDAP™ ved at ændre tilladelserne i forbindelse med tomcat-mappen og Big ParentDirectory:
         (De faktiske kommandoer nedenfor er for Linux. For andre OS 'er, foretage tilsvarende ændringer.) 
        * Ændre "gruppe" at være tomcat, dit brugernavn, eller navnet på en lille gruppe, der omfatter tomcat og alle administratorer af Tomcat / ERDDAP f.eks.
chgrp-R _ yourBrugerName _ apache- tomcat- _ 8.0.23 _
chgrp -R _ your BrugerName bigParentDirectory _
        * Ændre tilladelser, så Tomcat og gruppen har læst, skrive, udføre privilegier, f.eks.
chmod -R ug + rwx apache- tomcat- _ 8.0.23 _
chmod - R ug + rwx _ bigParentDirectory _
        * Fjern "andre" brugerrettigheder til at læse, skrive eller udføre:
chmod -R o- rwx apache- tomcat- _ 8.0.23 _
chmod - R o- rwx _ bigParentDirectory _
Dette er vigtigt, fordi det forhindrer andre brugere i at læse muligvis følsomme oplysninger i ERDDAP™ setup filer, logfiler og filer med information om private datasæt.
    * Autentificering / login systemet blev fornyet. Takket være Thomas Gardner, Emanuel Lombardi, og den amerikanske regering nye [HTTPS- Kun standard](https://home.dotgov.gov/management/preloading/dotgovhttps/) .
        * Autentifikationen = openid blev fjernet. Det var forældet.
        * Den nye, anbefalede, [autentificering = google](/docs/server-admin/additional-information#google) tilvalg bruger Google Sign-In (baseret på OAuth 2.0) at tillade alle med en Google-e-mail-konto (inklusive Google forvaltede konti som @noaa.gov ) til at logge ind.
        * Den nye, [autentificering = e-mail](/docs/server-admin/additional-information#email) mulighed er en sikkerhedskopi for godkendelse = google. Det giver brugere med en&lt;bruger &gt; tag ind datasets.xml at logge ind ved at sende dem en e-mail med et særligt link.
        * I din setup.xml, skal du ændre beskrivelsen for&lt;autentificering &gt; skal være
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

        * I din setup.xml, skal du tilføje dette lige under&lt;autentificering &gt; tag
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

        * Brugere, der ikke er logget ind, kan bruge http eller https URL 'er (hvis du har oprettet&lt;baseHttpsUrl &gt; i din setup.xml). Takket være den amerikanske regerings nye [HTTPS- Kun standard](https://https.cio.gov/) .
        * Nu kan du opfordre alle brugere til at bruge https   (ikke http ) ved indstilling&lt;baseUrl &gt; at være en https URL. At tvinge brugerne til kun at bruge https , skal du også foretage ændringer i din Apache / Tomcat setup til at blokere ikke- https adgang. Takket være den amerikanske regerings nye [HTTPS- Kun standard](https://https.cio.gov/) .
            
I din setup.xml, skal du ændre beskrivelsen for&lt;baseUrl &gt; skal være
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

        * Valgmulighederne&lt;passwordEncoding &gt; ændret. I din setup.xml, skal du ændre beskrivelsen for&lt;passwordEncoding &gt; to be
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

        * I din setup.xml, skal du ændre beskrivelsen for&lt;baseHttpsUrl &gt; skal
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

        * Nu, hvis listPrivatDatasets = true i setup.xml, vil endnu mindre information blive vist om datasæt, som en bruger ikke har adgang til.
    * Nu, især for når du er ved at oprette din ERDDAP du kan nu fortælle ERDDAP™ ikke at forsøge at abonnere på eksterne ERDDAP™ Datasets. Takket være Filip Rocha Freire.
I din setup.xml, lige før&lt;fontFamily &gt;, add venligst
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

    * I din setup.xml, i instruktionerne ovenfor&lt;emailFromAddress &gt;, indsættes:
Hvis det er muligt, opsæt dette for at bruge en sikker forbindelse (SSL / TLS) til e-mailserveren.
Hvis din opsætning ikke bruger en sikker forbindelse til e-mailserveren, bedes du foretage ændringerne for at gøre det.
    * I datasets.xml , venligst tilføje denne linje til beskrivelsen af&lt;abonnentEmailBlacklist &gt; i din datasets.xml :
Du kan bruge navnet "\\*"til at sortliste et helt domæne, f.eks.\\*@ example.com.
    * Siden ændringen til logsystemet i v1.66, logfilen er aldrig up- to- date. Der er altid beskeder eller dele af beskeder, der venter på at blive skrevet til logfilen. Nu kan du gøre det up-to-date (i et øjeblik) ved at se din ERDDAP 's status webside på http://_your.domain.org_/erddap/status.html .
    * HashDigest.......
    * En lille ændring (til String2.canonical) der skulle hjælpe med at holde tingene i gang hurtigt, når ERDDAP™ er meget travlt og også bedre beskæftige sig med et meget stort antal datasæt.
    * Stærk Anbefalet: stop med at bruge&lt;convertToPublicSourceUrl &gt; er datasets.xml at konvertere et IP-nummer i et datasæt&lt; sourceUrl &gt; (f.eks. http://192.168.#.#/ ) ind i et domænenavn (f.eks. http : my.domain.org /) . Fra nu af, nye abonnementer til http://localhost , http://127.0.0.1 , og http://192.168.#.# URLS får ikke lov af sikkerhedshensyn. Så brug altid det offentlige domænenavn i&lt; sourceUrl &gt; tag (om nødvendigt på grund af DNS-problemer) , kan du bruge [/ etc / hosts tabel på din server](https://linux.die.net/man/5/hosts) at løse problemet ved at konvertere lokale domænenavne til IP-numre uden at bruge en DNS-server. Du kan teste hvis et givet domænenavn bliver korrekt løst ved at bruge
ping _ some.domain.name _
    * I generateDatasets.xml, til fjerndatasæt (f.eks. fra en THREDDS server) , automatisk genereret datasetID s er uændret for de fleste domæner. For et par domæner, den første del (Dvs. navnet) for automatisk genereret datasetID vil være lidt anderledes. Især er det nu mere sandsynligt, at navne, der havde en del, har to dele. For eksempel datasæt fra http://oos.soest.hawaii.edu tidligere ført til datasetID er, der startede med hawaii\\ _, men nu føre til datasetID s der starter med hawaii\\ _ soest\\ _. Hvis dette forårsager problemer for dig, bedes du e-maile mig. Der er måske en løsning.
    * Cassandra driver blev opdateret til cassandra- driver- core- 3.0.0.jar og dermed for Cassandra v3. EDDTableFromCassandra ikke drage fordel af nogen nye funktioner i Cassandra v3. Indekser i Cassandra kan nu være mere komplekse, men ERDDAP™ stadig bruger Cassandra v2 indeks model, som antager, at en indekseret kolonne kan være direkte spørges med '=' begrænsninger. GenerateDataset Xml for EDDTableFromCassandra registrerer ikke længere kolonner med indeks; hvis et indeks er simpelt, skal du angive det i datasets.xml med hånden. Hvis du har brug for støtte til mere komplekse indekser eller andre nye funktioner, skal du e-mail erd.data at noaa.gov .
&#33; Hvis De stadig bruger Cassandra 2. x, skal De fortsætte med at bruge ERDDAP™ v1.68 indtil du opgraderer til at bruge Cassandra 3.x.
    * Krukker og Classpath - Næsten alle de medfølgende tredjeparts .jar filer blev opdateret til deres nyeste versioner.
        * slf4j.jar blev tilføjet til / lib og klassestien.
        * Joid. Krukke og tsik. krukken blev fjernet fra / lib og klassestien.
        * Hvis du får fejlmeddelelser om klasser, der ikke findes, når du kompilerer eller kører ERDDAP™ eller et af dens værktøjer, sammenligne din kommandolinjes klassesti til ERDDAP 's [nuværende klassesti](/docs/contributing/programmer-guide#development-environment) at finde ud af, hvilke .jars mangler fra din klassesti.

## Version 1.68{#version-168} 
 (udgivet 2016-02- 08) 

*    **Nye funktioner (til brugerne) :** Ingen.
     
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    *    [ EDDGrid FromFiles aggregering via filnavne eller globale metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) --
Alle variationer af EDDGrid FromFiles kan nu aggregere en gruppe af filer ved at tilføje en ny venstre dimension, normalt tid, baseret på en værdi afledt af hvert filnavn eller fra værdien af en global attribut, der er i hver fil.
    * FORBEDRING: Vi tidligere foreslået, at du måske ønsker at skabe en EDDGrid FromErddap datasæt i datasets.xml der refererede og gentjente jplMU 'en RSS T datasæt i vores ERDDAP . Da der nu er en nyere version af datasættet, at datasættet er nu forældet. Så hvis du har det datasæt i din ERDDAP™ , please add this new datasæt
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Hvis du ønsker at fjerne den gamle jplMU RSS T datasæt fra din ERDDAP™   (det er dit valg) , ændre sin aktive indstilling fra "sand" til "falsk".
    * Fejlfiks: Tjek venligst det store ParentDirectory, som du angav i din setup.xml. Hvis du ikke sætte en skråstreg i slutningen af&lt;bigParentDirectory &gt; navn, så ERDDAP™ vil have oprettet flere mapper ved at tilføje ord direkte til det navn, du har angivet, i stedet for at oprette undermapper. Start med version 1.68 ERDDAP™ tilføjer en skråstreg til slutningen af mappenavn, hvis du ikke angive en. Så hvis du tidligere ikke angive en skråstreg i slutningen, så når du installerer ERDDAP™ v1.68 skal du flytte og omdøbe disse mapper **efter** du lukker den gamle ERDDAP™ og **før** du starter den nye ERDDAP . For eksempel, hvis du fejlagtigt angivet bigParentDirectory som / home / erddapBPD (ingen baglæns skråstreg) og ERDDAP™ har fejlagtigt oprettet mapper som
/ home / erddapBPDcache
/ home / erddapBPDcopy
/ home / erddapBPDdataset
/ home / erddapBPDflag
/ home / erddapBDLogs
/ home / erddapBPDlucen
og en fil ved navn / home / erddapBPDsubscriptionsV1.txt
så skal du flytte og omdøbe dem for at være
/ home / erddapBPD / cache
/ home / erddapBPD / copy
/ home / erddapBPD / dataset
/ home / erddapBPD / flag
/ home / erddapBPD / logs
/ home / erddapBPD / lucen
og / home / erddapBPD / subscriptionsV1.txt
    * Fejlfiks: Der var bugs i EDDGrid LonPM180 ERDDAP™ v1.66, der opstod, når barnet datasæt er en EDDGrid FromErddap.
    * Fejlfiks: Der var en fejl i EDDGrid FromFiles og EDDTable FromFiles in ERDDAP™ v1.66 der forårsagede&lt;updateEveryNMillis &gt; skal ignoreres første gang datasættet blev indlæst efter en genstart.
    * Fejlfiks / ny funktion: Hvis et barn EDDGrid AggregateExistingDimension EDDGrid Modtaget. EDDGrid FromEDDTable EDDGrid LonPM180 EDDGrid SideBySide, EDDTableCopy eller EDDTableFrom EDDGrid er en... FromErddap dataset, at forælder dataet nu abonnerer på den underliggende ERDDAP™ dataset. Hvis det underliggende ERDDAP™ dataset er i samme ERDDAP™ , abonnement og dets validering er gjort direkte; du vil ikke få en e-mail beder dig om at validere abonnement. Ellers, hvis abonnementssystemet for din ERDDAP™ er slukket, indstille&lt;reloadEveryNMinutter &gt; indstilling af moderdatasættet til et lille nummer (60?) så det forbliver up-to-date.
    * Fejlfiks / ny funktion: Hvis et barn EDDGrid AggregateExistingDimension EDDGrid Modtaget. EDDGrid FromEDDTable EDDGrid LonPM180 EDDGrid SideBySide, EDDTableCopy eller EDDTableFrom EDDGrid har aktiv = "false", at barnet datasæt er nu sprunget.

## Version 1.66{#version-166} 
 (udgivet 2016- 01- 19) 

*    **Nye funktioner (til brugerne) :** 
    * Grafer (ikke kort) kan nu have faldende værdier på akserne. For at få dette, når du bruger en Make A Graph webside, ændre nye Y Axis: stigende indstilling (standard) til faldende. Eller, i en URL, der anmoder om en graf, bruge den nye valgfri 3. ' | 'parameter for [&. x Område og / eller &. yRange kontakter](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) , som kan være ingenting (standard) , sande, eller t at få stigende værdier, eller bruge falske eller f at få faldende værdier. Den sande | falske værdier er ufølsomme. Takket være Chris Fullilove, John Kerfoot, Luke Campbell og Cara Wilson.
    * Brugere kan nu angive baggrundsfarven for grafer ved at tilføje en & .bgColor = 0x _ AARRGGBB _ switch til den URL, der anmoder grafen. Se .bgColor i afsnittet om grafikkommandoer i [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) og [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) dokumentation. Takket være John Kerfoot og Luke Campbell.
    * For tabeldatasæt, begrænsninger kan nu henvise til min (Et VariableName) eller max (Et VariableName) . Se [min () og max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) . Takket være John Kerfoot.
    * For tabeldatasæt, tidsbegrænsninger, der bruger [Nu](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) kan nu angive tidsenheder af millisekunder eller millis.
    * En anmodning om et billede af et tabeldatasæt gør nu et kort (ikke en graf) hvis x- og y-variablerne er lig med variable (kompatible enheder) . Takket være Rich Signell.
    * Fejl fix: Time akse etiketter og flåter undertiden havde ulige uregelmæssigheder, når du anmoder om flere grafer samtidigt (f.eks. på en webside) . Problemet var en fejl i SGT grafikbiblioteket, der ERDDAP™ anvendelser (en variabel var "statisk", der ikke skulle have været) . Takket være Bradford Butman.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Det er en sikkerhedsrisiko at sætte din e-mail adgangskode i en almindelig tekstfil som setup.xml. For at afbøde dette problem, anbefaler vi stærkt, at du:
        1. Opret en e-mail-konto bare for ERDDAP er brug, fx erddap @ yourInstitution.org. Det har også andre fordele; især mere end én ERDDAP™ administrator kan derefter få adgang til denne e-mail-konto.
        2. Gør tilladelserne af setup.xml fil rw (læse + skrive) for den bruger, der vil køre Tomcat og ERDDAP™   (bruger = tomcat?) og ingen tilladelser (ikke læse eller skrive) for gruppen og andre brugere. Takket være Filip Rocha Freire.
    * Det nye [ArchiveADataset](/docs/server-admin/additional-information#archiveadataset) værktøj forenkler at lave en .tar  .gz arkiv med en delmængde af et datasæt i et format, der er egnet til arkivering (Det drejer sig især om: NOAA er NCEI) . Dette bør være nyttigt for mange ERDDAP™ administratorer i mange situationer, men især for grupper inden for NOAA .
    * Den nye datatype [ EDDGrid FromNcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked) er en variant af EDDGrid FromNcFiles. Forskellen er, at denne klasse udpakker hver datafil før EDDGrid FromFiles ser på filerne:
        
        * Det pakker pakkede variabler, der bruger scale\\_factor og / eller add\\_offset .
        * Det fremmer heltal variabler, der har\\ _ Usigneret = sande attributter til en større heltal datatype, så værdierne vises som de usignerede værdier. For eksempel, en\\ _ Usigneret = sand byte (8 bit) variabel bliver en underskrevet kort (16 bit) variabel.
        * Det konverterer\\ _ FillValue og missing\\_value værdier, der skal være NaN 's (eller MAX\\ _ VÆRDI for heltal datatyper) .
        
Den store fordel ved denne klasse er, at det giver en måde at håndtere forskellige værdier af scale\\_factor , add\\_offset ,\\ _ FillValue, eller missing\\_value i forskellige filer i en samling. Ellers ville du skulle bruge et værktøj som [NcML](/docs/server-admin/datasets#ncml-files) eller [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) at ændre hver fil for at fjerne forskellene, så filerne kunne håndteres af EDDGrid FromNcFiles. For at denne klasse skal fungere korrekt, skal filerne følge CF-standarderne for de tilhørende attributter. Takket være Philippe Makowski.
    * Den nye datatype [ EDDGrid LonPM180 Formand](/docs/server-admin/datasets#eddgridlonpm180) kan du ændre datasæt, der har nogle længdeværdier større end 180 (f.eks. intervallet 0 til 360) til datasæt med længdeværdier inden for området -180 til 180 (Længdegrad Plus eller Minus 180, deraf navnet) . Den store fordel ved at tilbyde datasæt med længdeværdier i området -180 til 180 er, at OGC Tjenesteydelser (f.eks. WMS ) kræve længdeværdier i dette område. Takket være Lynne Tablewski, Fabien Guichard, Philippe Makowski og Martin Spel.
2016- 01- 26 Opdatering: Eeek&#33; Dette har en fejl, der opstår, når barnet datasæt er en EDDGrid FromErddap der henviser til et datasæt i samme ERDDAP . Denne fejl er rettet i ERDDAP™ v1.68.
    * I [GenerateDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml) en ny særlig datatype EDDGrid LonPM180FromErddapCatalog, kan du generere datasets.xml til EDDGrid LonPM180 datasæt fra alle EDDGrid datasets ERDDAP som har en længdegrad på over 180.
    * For alle EDDGrid datasets datasets.xml du kan nu bruge den valgfrie
[&lt;tilgængelig Via WMS &gt; true | falsk&lt;/ tilgængelig Via WMS &gt;] (/ docs / server- admin / datasæt # accessibleviawms)   (standard = true) . Sætter dette til falsk magt deaktiverer WMS service for dette datasæt. Hvis det er sandt, kan datasættet stadig ikke være tilgængeligt via WMS af andre grunde (f.eks. ingen lat eller lonøkser) . Dette er især nyttigt for datasæt, der eksisterer på egen hånd og indpakket af EDDGrid LonPM180, således at kun LonPM180 version er tilgængelig via WMS .
    * I setup.xml kan du angive en anden standardfarve for baggrunden for grafer. Farven angives som en 8-cifret hexadecimal værdi i form 0x _ AARRGGBB _, hvor AA, RR, GG og BB er henholdsvis de opacitet, røde, grønne og blå komponenter, angivet som 2-cifrede hexadecimale tal. Bemærk, at lærredet altid er uigennemsigtig hvid, så en (delvis -) gennemsigtig graf baggrundsfarve blander sig i det hvide lærred. Standard er lyseblå:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Takket være John Kerfoot og Luke Campbell.
    * I setup.xml, kan du nu angive den maksimale størrelse for [logfil](/docs/server-admin/additional-information#log)   (når det omdøbes til log. txt. tidligere og en ny log. txt er oprettet) i MegaBytes. Det tilladte minimum er 1. Det tilladte maksimum er 2000. Standard er 20 (MB) . For eksempel:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * I datasets.xml , [&lt;fgdcFile &gt;] (/ docs / server- admin / datasæt # fgdcfile) eller [&lt;iso19115File &gt;] (/ docs / server- admin / datasæt # iso19115file) kan nu være en lokal fil (som før) eller en URL (som vil blive downloadet så der er en lokal kopi) . Hvis ERDDAP™ er ude af stand til at downloade filen, vil indlæsning af datasættet fortsætte, men datasættet vil ikke have en fgdc eller iso19115 fil.
    *    EDDGrid FromFiles og EDDTable FromFiles datasæt kan nu gøre en quickGenstart (det system, ERDDAP™ forsøger at bruge, når datasæt først indlæses, når ERDDAP™ er genstartet) . Dette fremskynder genstart ERDDAP .
2016- 01- 26 Opdatering: Eeek&#33; Dette har en fejl der forårsager&lt;updateEveryNMillis &gt; ignoreres første gang datasættet indlæses efter en genstart. Denne fejl er rettet i ERDDAP™ v1.68.
    * En generel forbedring af QuickRestart- systemet tillader ERDDAP™ til at indlæse datasæt hurtigere, når ERDDAP™ er genstartet.
    * Alle EDDGrid FromFiles og EDDTable FromFiles underklasser nu acceptere en ny&lt;patrregix &gt; tag, normalt angivet lige nedenfor&lt;rekursiv &gt;. Hvis rekursiv er "sand", er kun fuld undermappe stier, der matcher patRegex (standard =. "\\ *") vil blive accepteret. På samme måde&lt; sourceUrl s &gt; tag i en EDDGrid AggregateExistingDimension kan nu omfatte en patRegex attribut (standard =. "\\ *") .
    * Standard for&lt;partialRequestMaxBytes &gt; i setup.xml er nu 490000000 (~ 490 MB) . Dette undgår nogle problemer / timeouts relateret til at få data fra THREDDS dataservere. Takket være Leslie Thorne.
    * En lille ændring af logsystemet bør tillade ERDDAP™ at være mere lydhør, når det er meget, meget travlt. Information er nu skrevet til logfilen på disken drev i temmelig store stykker. Fordelen er, at det er meget effektivt... ERDDAP™ vil aldrig blokere venter på oplysninger skal skrives til logfilen. Ulempen er, at loggen vil næsten altid ende med en delvis besked, som ikke vil blive afsluttet, før det næste stykke er skrevet.
    * Fejl fix relateret til inotify og [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasæt # updateeEverynmillis) system til EDDGrid FromFiles og EDDTable FromFiles datasæt: Det er ikke længere nødvendigt at angive en stor af fs.inotif.max\\ _ user\\ _ ure eller fs.inotif.max\\ _ user\\ _ tilfælde. Der er en fejl i Java der forårsager nogle dele af Java 's inotify / WatchDirectory system til ikke skrald indsamlet, når de er afsluttet; i sidste ende, antallet af zombie inotify ure eller tilfælde ville overstige det maksimale antal angivne. ERDDAP™ nu virker omkring dette Java Insekt.
Også, antallet af inotify tråde er opført på statu.html webside, så du kan holde øje med dens anvendelse. Typisk, der er 1 inotify tråd pr EDDGrid FromFiles og EDDTable FromFiles datasæt.
    * Fejl fix: på mange steder, i stedet for en fejl bliver kastet tilbage, en ny fejl blev genereret, som kun indeholdt en kort version af den oprindelige fejlmeddelelse og uden stack spor. Nu, når en ny fejl genereres, det korrekt omfatter hele den oprindelige undtagelse, f.eks, smide nye undtagelse ("noget nyt budskab", e) ;
Takket være Susan Perkins.
    * Fejlfiks: indtil for nylig (V1.64?) , hvis en... / datasetID URL blev anmodet om ERDDAP™ vil tilføje .html til URL 'en. I v1.64 mislykkedes dette (en forkert formateret URL blev genereret og derefter mislykkedes) . Nu virker det igen. Takket være Chris Fullilove.

## Version 1.64{#version-164} 
 (udgivet 2015-08- 19) 

*    **Nye funktioner (til brugerne) :** 
    * Der er nu vejledning for adgang til passwordbeskyttet privat ERDDAP™ datasæt ( https:// ) via curl og Python . Se [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) og [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) brugsanvisning.
Takket være Emilio Mayorga af NANOOS og Paul Janecek af Spyglass Technologies.
         
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    *    ERDDAP™ nu kræver Java 1,8 +.
         Java 1.7 nåede sit mål [livsophør](https://www.oracle.com/technetwork/java/eol-135779.html)   (ikke flere sikkerhedsopdateringer) i april 2015. Denne version af ERDDAP™ vil ikke arbejde med versioner af Java under 1, 8. Hvis du opdaterer fra Java 1, 7x (eller tidligere) , du bør også opdatere Tomcat. Se [ ERDDAP™ Indstil instruktioner](/docs/server-admin/deploy-install) til download links og råd.
    * Ny dataudbyderformular.
Når en dataudbyder kommer til dig i håb om at tilføje nogle data til din ERDDAP™ , kan det være vanskeligt og tidskrævende at indsamle alle de metadata, der er nødvendige for at tilføje datasættet i ERDDAP . Mange datakilder (f.eks. csv-filer Excel-filer, databaser) har ingen interne metadata, så ERDDAP™ har en ny dataudbyderformular, der indsamler metadata fra dataudbyderen og giver dataudbyderen en anden vejledning, herunder omfattende vejledning for datadatabaser. De forelagte oplysninger konverteres til datasets.xml format og derefter e-mail til ERDDAP™ administrator (dig) og skrevet (Bilag) til bigParentDirectory / logs / dataProviderForm.log. Således former semi- automatiserer processen med at få et datasæt ind ERDDAP™ , men ERDDAP™ Administratoren skal stadig udfylde datasets.xml chunk og beskæftige sig med at få datafilen (s) fra udbyderen eller forbindelsen til databasen. For mere information, se [Dataudbyder Formularbeskrivelse](/docs/server-admin/datasets#data-provider-form) .
    * Ny&lt;matchAxisNDigits &gt;
kan bruges af EDDGrid FromFiles (og dermed fra NcFiles og fra MergeIRFiles) , EDDGrid AggregateExistingDimension EDDGrid Modtaget, og EDDGrid SideBySide datasæt til at angive, hvor præcist lig akseværdierne i forskellige filer skal være (hvor mange cifre) : 0 = ingen kontrol (Brug den ikke&#33;) , 1-18 for at øge præcision, eller 20 (standard) for præcis lighed. For n = 1-18 ERDDAP™ sikrer, at de første n-cifre af dobbelte værdier (eller (n + 1) div 2 for floatværdier) er lige.
        &lt;matchAxisNDigits &gt; erstatter&lt;sikre AxisValuesAreEqual &gt;, som nu er forældet. En værdi af 'sand' konverteres til matchAxisNDigits = 20. En værdi af 'false' (Gør det ikke&#33;) konverteres til at matche AxisNDigits = 0.
    *    EDDGrid FromFiles og EDDTable FromFiles vil indlæse meget langsomt første gang du bruger denne version af ERDDAP .
         ERDDAP™ nu gemmer den interne fil oplysninger lidt anderledes, så den interne fil tabel for hver af disse datasæt skal genopbygges. Så bare rolig. Der er ikke noget galt. Det er kun en gang.
    * Fjernkildefiler
         EDDGrid FromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles tillader nu filerne at være eksterne filer i en mappe tilgængelig ved http://   (og sandsynligvis https:// og ftp: / /, men de er uprøvede) hvis den eksterne server understøtter [Range anmodninger](https://en.wikipedia.org/wiki/Byte_serving) i anmodningsoverskriften. THREDDS og Amazon S3 support Range Request, Hyrax Nej. Dette system giver dig mulighed for at få adgang til data i eksterne filer uden at downloade filerne (hvilket er nyttigt, hvis de eksterne filer er for omfangsrige) , men adgang til disse filer vil være langt langsommere end adgang til lokale filer eller endda til en fjern OPeNDAP kilde.
Dette omfatter "files" i en Amazon S3 spand, da de er tilgængelige via http:// . Hvis S3 objektnavne er som filnavne (med interne / 's som et Linux-mappetræ) , ERDDAP™ kan også gøre filerne tilgængelige via ERDDAP 's "files" system. For at dette kan fungere, skal dine S3 legitimationsoplysninger være i ~ / .aws / legitimationsoplysninger (på Linux, OS X eller Unix) , eller C:\\ Brugere\\ USERNAME\\ .aws\\ legitimationsoplysninger (på Windows) på serveren med ERDDAP . Se [Amazon SDK dokumentation](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) .
    * GenerateDataset Xml har en ny, usædvanlig mulighed: EDDsFromFiles.
Dette vil gå gennem et filsystem (selv et eksternt system som en Amazon S3 hvis objekterne har file- lignende navne) og skabe datasets.xml stykker for en række datasæt. Din kilometertal kan variere. Dette virker godt, hvis filerne er organiseret, så alle datafiler i en given mappe (og dets undermapper) er egnet til et datasæt (f.eks. alle SST 1- dages kompositter) . Ellers (f.eks. hvis en mappe indeholder nogle SST-filer og nogle Chlorophyll- a-filer) , dette virker dårligt, men kan stadig være nyttigt.
    * Programmer: nye / lib .jar filer.
Hvis du kompilerer ERDDAP™ , bemærk venligst de nye .jar-filer i klassestien -cp parameter, der er anført i ERDDAP™   [Vejledning for programmører](/docs/contributing/programmer-guide) .
    * hav\\ _ vand\\ _ praktisk\\ _ saltindhold
Hvis du bruger CF standard navn sea\\ _ water\\ _ salinity for enhver variabel, jeg opfordrer dig til at skifte til havet\\ _ water\\ _ practical\\ _ salinity som er tilgængelig i [version 29 af CF Standard Name Tabellen](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (og nogle tidligere versioner -- det vidste jeg ikke) . Dette navn viser, at dette faktisk er en praktisk saltindhold værdi ved hjælp af Practical Salinity Units   ( PSU ) , i modsætning til en ældre g / kg værdi. De kanoniske enheder er forskellige, men stadig utroligt ubrugelige: 1 (Formentlig antydning PSU / PSS- 78) , i modsætning til 1e-3 (Antyder formentlig g / kg) til havet\\ _ vand\\ _ saltindhold. \\[ Hey, Unidata og CF: Vi identificerer værdier, der bruger andre skalaer, for eksempel Fahrenheit eller Celsius, via en enhed streng, der er navnet på skalaen eller nogle variationer. Hvorfor kan vi ikke identificere saltvandsenheder via deres skala, f.eks. PSS- 78? Jeg ved, at PSS- 78 værdier er "unitless", men der er en implicit skala, er der ikke? Hvis jeg opfinder en ny praktisk saltvandsskala, hvor værdierne er 0,875 gange PSS- 78-værdierne, skal de kanoniske enheder stadig være "1"? Hvordan kunne en bruger skelne dem fra hinanden? Enheder på 1e-3 og 1 er hverken beskrivende eller nyttige for brugere, der forsøger at finde ud af, hvad tallene angiver. \\] 

## Version 1.62{#version-162} 
 (udgivet 2015-06- 08) 

*    **Nye funktioner (til brugerne) :** 
    * til EDDGrid Datasæt, brugere kan nu gøre Graph Type: Overflade grafer med enhver kombination af numeriske akser, ikke bare længdegrad versus breddegrad. Det giver x i forhold til y. (projiceret) Grafer og forskellige [Hovmöller Diagrammer](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) f.eks. plodning af længdegrad versus dybde eller tid versus dybde. \\[ Bemærk: Hvis dybden er på Y-aksen, vil den sandsynligvis blive vendt fra det, du ønsker. Det er desværre ikke en mulighed endnu. \\] Takket være Cara Wilson og Lynn DeWitt.
    * Der er en ny [Oceanic / Atmosfærisk Akronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) som lader dig konvertere et fælles oceanisk / atmosfærisk akronym til / fra et fuldt navn.
    * Der er en ny [Oceanic / Atmosfærisk Name](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) som lader dig konvertere et fælles oceanisk / atmosfærisk variabel navn til / fra et fuldt navn.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    *    Java 7 / 8
         Oracle ikke længere understøtter (giver sikkerhedsfejlrettelser til)   Java 7. ERDDAP™ stadig støtter Java 7, men venligst flytte til Java 8. Den næste udgivelse af ERDDAP™ vil sandsynligvis kræve Java 8.
    *    valid\\_min / max / område
Tidligere og nu, hvis en dataVariable havde scale\\_factor og add\\_offset metadata ERDDAP™ udpakker dataværdierne og fjerner disse metadata. Tidligere: ERDDAP™ ikke ændre / pakke nogen valid\\_range , valid\\_min , valid\\_max metadata (som normalt / bør indeholde pakkede værdier) ved scale\\_factor og add\\_offset . Nu gør det. Søg venligst efter din ERDDAP™ for "gyldig\\ _" og sørg for, at alle de variabler, der har valid\\_range , valid\\_min eller valid\\_max har de korrekte værdier, når datasæt vises i den nye version af ERDDAP . Se [ valid\\_range / min / maks. dokumentation](/docs/server-admin/datasets#valid_range) .
    * ACDD- 1, 3
Tidligere: ERDDAP™   (navnlig GenerateDataset Xml) anvendes / anbefales det originale (1, 0) version af [ NetCDF Attribut- konvention for dataset- søgning](https://wiki.esipfed.org/ArchivalCopyOfVersion1) der blev omtalt som " Unidata Dataset Discovery v1.0 "i de globale konventioner og Metadata\\_Conventions attributter. Nu anbefaler vi [ACDD version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) som blev ratificeret i begyndelsen af 2015 og kaldes "ACDD-1.3" Heldigvis ACDD-1.3 er meget bagud kompatibel med version 1.0. Vi HENSTILLER, at du [skift til ACDD- 1.3](/docs/server-admin/datasets#switch-to-acdd-13) . Det er ikke svært.
    * GenerateDataset Xml Attributter
Der var en lang række ændringer for at forbedre&lt; addAttributes &gt; værdier foreslået af GenerateDataets Xml for de globale konventioner creator\\_name / e-mail / url, nøgleord, resumé og titel attributter og for variablen long\\_name attribut. Nogle ændringer er relateret til den nye brug af ACDD-1.3.
    * EDDTableFrom SOS datasæt
Med lejlighedsvis tilføjelse af nye typer af SOS servere og ændringer til de gamle servere, det bliver sværere for ERDDAP™ til automatisk at detektere servertypen fra serverens svar. Anvendelse af [&lt;sosServerType &gt;] (/ docs / server- admin / datasæt # eddtablefrom soss- skeleton- xml)   (med en værdi af IOOS\\ _ NDBC, IOOS\\ _ NOS, OOSTethys eller WHOI) er nu STRONGY ANBEFALET. Hvis nogen af dine datasæt af denne type har problemer i den nye version af ERDDAP , prøv at genkøre GenerateDataset Xml til SOS server til at generere et nyt stykke af datasets.xml for det datasæt. GenerateDataset Xml vil lade dig prøve de forskellige&lt;sosServerType &gt; indstillinger indtil du finder den rigtige for en given server. Hvis du stadig har problemer, så lad mig vide det problem, du ser, og URL 'en på serveren og jeg vil forsøge at hjælpe.
    * EDDTableFromFileNames datasæt
Nogle attributter, der blev anbefalet addAttributes er nu sourceAttributter. Du behøver sandsynligvis ikke at ændre noget for eksisterende datasæt i din datasets.xml .
    * Fejl fix relateret til visse anmodninger til EDDTableFromNcCFFiles datasæt.
Jeg tilføjede også et stort antal enhedstest til det eksisterende store antal enhedstest af de underliggende metoder (der er 100 's af scenarier) . Takket være Eli Hunter.
    * Fejlfiks / små ændringer til EDDGrid FromMergeIR.
Tak til Jonathan Lafite og Philippe Makowski
    * Fejlfiks: EDDGrid FromErddap virker nu, selv om en ekstern datasæt ikke har ioos\\_category variable attributter.
Takket være Kevin O 'Brien.
    * Fejl fix i .graph webside for EDDGrid datasets, når der kun er én aksevariabel med mere end én værdi.
Takket være Charles Carleton.
    * Der var andre små forbedringer, ændringer og fejlrettelser.

## Version 1.60{#version-160} 
 (udgivet 2015-03- 12) 

*    **Nye funktioner (til brugerne) :** ingen
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * STYRKE HENSTILLET: Opdatér din servers [robots.txt](/docs/server-admin/additional-information#robotstxt) fil, der skal indeholde:
Suspension: / erddap / files /
    * IAdvisér problem og løsning:
På Linux-computere, hvis du bruger&lt;updateEveryNMillis &gt; med datasæt med type = EDDGrid FromFiles, EDDTableFromFiles, EDDGrid Kopi, EDDTableCopy, eller deres underklasser, kan du se et problem, hvor et datasæt undlader at indlæse (lejlighedsvis eller konsekvent) med fejlmeddelelsen: "IOExemption: Bruger grænse for inotify tilfælde nået eller for mange åbne filer". Hvis ja, kan du løse dette problem ved at ringe (som rod) :
echo fs.inotifi.max\\ _ user\\ _ ure = 65536 | tee-a / etc / sysctl.conf
echo fs.inotifi.max\\ _ user\\ _ instances = 1024 | tee-a / etc / sysctl.conf
sysctl - p
Eller brug højere tal, hvis problemet fortsætter. Standard for ure er 8192. Standard for tilfælde er 128. \\[ UPDATE: Der er en fejl i Java som forårsager, at inotificere tilfælde ikke indsamles affald. Dette problem undgås i ERDDAP™ v1.66 og højere. Så den bedre løsning er at skifte til den nyeste version af ERDDAP . \\] 
    * NoSuchFileExemption Fejlretter:
Der var en fejl, der kunne forårsage datasæt af typen = EDDGrid FromFiles, EDDTableFromFiles, EDDGrid Kopi, EDDTableCopy, eller deres underklasser til ikke at indlæse lejlighedsvis med fejlen "NoSuchFileExemption: _ someFileName _". Fejlen er relateret til brugen af FileVisitor og blev indført i ERDDAP™ v1.56. Problemet er sjælden og er mest tilbøjelige til at påvirke datasæt med et stort antal ofte skiftende datafiler.
    * Der var nogle små forbedringer, ændringer og fejlrettelser.

## Version 1.58{#version-158} 
 (udgivet 2015-02- 25) 

*    **Nye funktioner (til brugerne) :** 
    * Det nye [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) system kan du gennemse et virtuelt filsystem og downloade kildedatafiler fra mange ERDDAP™ Datasets. EU "files" systemet er aktivt som standard, men ERDDAP™ administratorer kan deaktivere det ved at sætte
```
        <filesActive>false</filesActive>  
```
i ERDDAP™ setup.xml fil. Særlig tak til Philippe Makowski, der holdt, da jeg var langsom til at værdsætte skønheden af denne idé.
    * tidsdestination Max... Tidligere havde tidsvariablen for EDDTable datasæt med næsten realtidsdata en destinationMax af NaN, hvilket antydede, at den maksimale tidsværdi for datasættet er nylig, men ikke præcist kendt og ændrer sig hyppigt. DestinationMax har en reel værdi, der indikerer den nuværende-kendte sidste gang. Mange datasæt har løbende opdateret data. ERDDAP™ understøtter adgang til de nyeste data, selv om det er efter den nuværende-kendt sidste gang. Bemærk, at den nye [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasæt # updateeEverynmillis) støtte til EDDGrid FromFiles og EDDTable FromFiles datasæt opdaterer tidsvariablens destinationMax. En anden konsekvens af denne ændring er, at datasetID = allDatasets Datasættet omfatter nu den aktuelt kendte sidste gang i maxTime kolonner. Takket være John Kerfoot.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * STYRKE HENSTILLET: Opdatér din servers [robots.txt](/docs/server-admin/additional-information#robotstxt) fil, der skal indeholde:
Suspension: / filer /
Suspension: / erddap / files /
    * Stikprøve datasets.xml -- Sidste år anbefalede vi flere fremragende datasæt i kysturet ERDDAP™ som du kunne tilføje til din ERDDAP™ bare ved at tilføje et par linjer til din datasets.xml . Hvis du har tilføjet erdVH datasæt, bedes du skifte til nyere erdVH2 datasæt:
        * Lav en kopi af alle de erdVH datasæt og ændre den kopierede datasetID er fra erdVH... til erdVH2... og ændre den refererede sourceUrl fra erdVH... til erdVH2....
        * Sæt erdVH... datasæt til aktive = "false".
    * Alle EDDGrid FromFiles og EDDTable FromFiles underklasser understøtter nu [&lt;accessibleViaFiles &gt;] (/ docs / server- admin / datasæt # accessibleviafiles) til at gøre kildedatafiler tilgængelige via "files" systemer. Som standard er dette system slukket for hvert datasæt. Du skal tilføje mærket for at aktivere det. Takket være Philippe Makowski.
    * Alle EDDGrid FromFiles og EDDTable FromFiles underklasser understøtter nu [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasæt # updateeEverynmillis) . Som standard er dette system slukket for hvert datasæt. Du skal tilføje mærket for at aktivere det. Takket være Dominic Fuller- Rowell og NGDC.
    * Det nye [EDDTableFromFileName](/docs/server-admin/datasets#eddtablefromfilenames) opretter et datasæt fra oplysninger om en gruppe filer i serverens filsystem, men det tjener ikke data fra filerne. For eksempel er dette nyttigt til distribution af samlinger af billedfiler, lydfiler, videofiler, tekstbehandlingsfiler og regneark filer. Dette virker hånd-i-hånd med den nye [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) system, så brugerne kan downloade filerne. Særlig tak til Philippe Makowski, der holdt, da jeg var langsom til at værdsætte skønheden af denne idé.
    * Det nye [ EDDGrid FromEDDTable](/docs/server-admin/datasets#eddgridfromeddtable) lader dig konvertere et tabeldatasæt til et forankret datasæt. Takket være Ocean Networks Canada.
    * Det nye [ EDDGrid FromMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles) Aggregater data fra en gruppe af lokale MergeIR .gz filer. EDDGrid FromMergeIRFiles har den sondring at være den første stykke kode bidraget til ERDDAP . Det blev gjort uden vores hjælp. Tre jubel og særlig tak til Jonathan Lafite og Philippe Makowski fra R.Tech Engineering.
    * Der er en ny, valgfri setup.xml tag,&lt;unitTestDataDir &gt;, som angiver mappen med enhedsdatafiler, som er tilgængelige via et nyt GitHub-arkiv: [ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest) . For eksempel:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Dette er ikke nyttigt endnu, men er en del af bevægelsen i retning af at gøre så mange af de enhed tests kører af andre mennesker som muligt. Takket være Terry Rankine.
    * Der var mange små forbedringer, ændringer og fejlrettelser.

## Version 1.56{#version-156} 
 (udgivet 2014- 12- 16) 

*    **Nye funktioner (til brugerne) :**   (Ingen) 
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Du kender sikkert allerede til [ EDDGrid FromErddap Formand](/docs/server-admin/datasets#eddfromerddap) og [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) som lader dig linke til datasæt i andre ERDDAP s og få dem til at dukke op i din ERDDAP . Brugeranmodninger om faktiske data fra disse datasæt bliver omdirigeret usynligt til kilden ERDDAP™ , så dataene ikke flyder gennem dit system eller bruge din båndbredde. Der er nu en stor liste over anbefalede datasæt i prøven datasets.xml til erddapContent .zip . At inkludere dem i din ERDDAP™ , alt du skal gøre er at kopiere og indsætte dem, du ønsker i din datasets.xml . Takket være Conor Delaney.
    * Hvis du kompilerer ERDDAP™ Du skal tilføje noget nyt. krukke filer til din [classpath - cp switch](/docs/contributing/programmer-guide#development-environment) til javac og java.
    * Det nye [EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra) håndterer at få data fra [Cassandra](https://cassandra.apache.org/) . Takket være Ocean Networks Canada.
    * Det nye [EDDTableFromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) håndterer at få data fra ASCII datafiler med fixed- bredde søjler. Takket være Philippe Makowski.
    * Alle EDDGrid FromFiles og EDDTable FromFiles underklasser nu bruge en ny metode, FileVisitor (til Java 1, 7) at indsamle oplysninger om filerne. Dette kan ikke have nogen fordel for den første indsamling af fil information for en given datasæt, men synes at have en enorm fordel for efterfølgende sammenkomster, hvis gjort snart, mens OS stadig har oplysningerne cached. Takket være NGDC.
        
Vi anbefaler stadig: Hvis et datasæt har et stort antal filer (f.eks. &gt; 1000) , styresystemet (og dermed EDDGrid FromFiles og EDDTableFromFiles) vil fungere meget mere effektivt, hvis du gemmer filerne i en række undermapper (en om året, eller en om måneden for datasæt med meget hyppige filer) , så der aldrig er et stort antal filer i en given mappe.
        
    * Flere små forbedringer af EDDTableFromAsciiFiles.
    * Nogle forbedringer til EDDTableFromAssciiServiceNOS, især for at få nogle yderligere kolonner af oplysninger fra kilden. Takket være Lynn DeWitt.
    * Nogle små fejlrettelser relateret til ISO 19115, ERDDAP™ genererer. Takket være Anna Milan.

## Version 1.54{#version-154} 
 (udgivet 2014- 10- 24) 

*    **Nye funktioner (til brugerne) :** 
    * Nogle variabler arbejder nu med tid på millisekunder præcision, fx, 2014- 10- 24T16: 41: 22.485Z. Takket være Dominic Fuller- Rowell.
*    **Små ændringer / fejlrettelser:** 
    * Fejlfiks: med en vis kombination af omstændigheder, EDDGrid FromNcFile datasæt returnerede data med reduceret præcision (f.eks. svævefly i stedet for dobbeltgængere) . Dette kan kun påvirke dataværdier med &gt; 8 betydende cifre. Undskyld. (Og det var en klassisk computer programmering fejl: en forkert karakter.) Takket være Dominic Fuller- Rowell.
    * Mange små ændringer.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Griddap datasæt understøtter nu tidsstempel akse variabler og data variabler (Variabler med tidsværdier, men en destinationName andre end "time" ) . Takket være Dominic Fuller- Rowell.
    *    ERDDAP™ nu korrekt understøtter millisekunder time\\_precision "1970- 01- 01T00: 00. 00.000 Z". En bevidst flirt: når du skriver tider til humanorienterede filer (f.eks. .csv .tsv , .json , .xhtml ) , ERDDAP™ bruger de angivne time\\_precision hvis det omfatter sekunder og / eller decimalsekunder; ellers bruger det sekunder time\\_precision "1970- 01- 01T00: 00: 00Z" (for konsistens og baglæns kompatibilitet) . Takket være Dominic Fuller- Rowell.
    *    EDDGrid FromNcFiles understøtter nu læsning String dataVariable a.
    *    .nc filer skrevet af griddap kan nu have String dataVariable a.
    * GenerateDataset Xml indeholder nu mere flush () opkald for at undgå problemet med information ikke bliver skrevet til filerne. Takket være Thierry Valero.
    * Dokumentationen for GenerateDatasetsXml blev forbedret, især for at påpege, at -i-knappen kun virker, hvis du angiver alle svarene på kommandolinjen (f.eks. scripttilstand) . Og scripttilstand er forklaret. Takket være Thierry Valero.
    *    ERDDAP™ ikke længere tillader to variabler i et datasæt at have den samme sourceName . (Hvis nogen gjorde det før, det sandsynligvis førte til fejlmeddelelser.) Som før, ERDDAP™ tillader ikke to variabler i et datasæt at have den samme destinationName .

## Version 1.52{#version-152} 
 (udgivet 2014-10- 03) 

*    **Nye funktioner:**   (ingen) 
*    **Små ændringer / fejlrettelser:** 
    * En anden (mindre) ændring at gøre ERDDAP™ Hurtigere.
    * Forbedring af ISO 19115 filer genereret af ERDDAP : tilføjet nyligt anbefalet&lt;gmd: protokolværdier & gt; (information, søgning OPeNDAP : OPeNDAP , ERDDAP : griddap, og ERDDAP : tabledap ) indenfor&lt;gmd: CI\\ _ OnlineResource & gt;. Takket være Derrick Snowden og John Maurer.
    * Mange små ændringer.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Fejl fix: GenerateDatasetsXml.sh og DasDdssh var ikke i erddap.war for 1,48 og 1,50. Nu er de. Takket være Thierry Valero.
    * Små ændringer til nogle hastighedstest i TestAll at gøre dem mindre modtagelige for tilfældigheder. Takket være Terry Rankine.

## Version 1.50{#version-150} 
 (udgivet 2014- 09- 06) 

*    **Nye funktioner:**   (ingen) 
*    **Små ændringer / fejlrettelser:** 
    * Dette ERDDAP™ bør være meget hurtigere end de seneste versioner.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:**   (intet) 

## Version 1.48{#version-148} 
 (udgivet 2014- 09- 04) 

*    **Nye funktioner:** 
    *    ERDDAP™ nu altid skaber et tabeldatasæt, datasetID = allDatasets , som har en tabel med oplysninger om alle datasæt i denne ERDDAP . Det kan udspørges som alle andre tabeller datasæt. Dette er et nyttigt alternativ til det nuværende system til at få information om datasæt programmatisk.
    * Der er to nye output-filtyper til EDDTable og EDDGrid , .csv0 og .tsv 0. De er komma- og tabulat- separat- værdi filer, der ikke har linjer med kolonne navne eller enheder. Dataene starter på første linje. De er især nyttige for scripts, der bare ønsker et stykke information fra ERDDAP .
*    **Små ændringer / fejlrettelser:** 
    * Kort kan nu laves til længdegrader i området -720 til 720.
    * Det nye .nc ml respons Filtype er tilgængelig for alle EDDGrid Datasets. Det returnerer [NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\ - formateret beskrivelse af datasættet (svarende til en kombineret dds + .das) .
    * Fejlfiks: Gemmer tabeldata til en .nc fil var begrænset til 100.000 værdier per variabel. Nu er det bare begrænset til 2 GB total filstørrelse. Takket være Kevin O 'Brien.
    * Fejlfiks: saveAs Matlab metoder nu sikre, at datasetID s konverteres til sikker Matlab variable navne. Men jeg anbefaler stadig, at du skaber datasetID s der er gyldige variable navne: startende med et bogstav og derefter bare bruge A- Z, a- z, 0- 9, og\\ _. Se [ datasetID ](/docs/server-admin/datasets#datasetid) . Takket være Luke Campbell.
    * Fejlrettelse i EDDTableFromDatabase: Med nogle typer af databaser, en NO\\ _ Data svar fra databasen førte til en meningsløs 30 sekunder forsinkelse i ERDDAP . Takket være Greg Williams.
    * Fejlfiks: EDDGrid Lav en graf med graftype = linjer (eller markører og linjer) tvunget x akse variabel til at være tid. Nu kan det være enhver akse. Takket være Lynn DeWitt.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * STYRKE ANBEFALET: Opdatering Java   
Denne version af ERDDAP™ kræver Java 7 eller højere, men Java 7 vil nå ud-af-liv i april 2015 (Snart&#33;) , så nu er et godt tidspunkt at skifte til Java 8. Java 8 er strengt anbefalet. Jeg tester med Java 8. Bemærk, at Java 6 nåede sit slutpunkt i februar 2013 (Ikke flere fejlrettelser&#33;) .
    * STYRKE ANBEFALET: Opdater Tomcat
Hvis du bruger Tomcat, bedes du skifte til den nyeste version af Tomcat. Tomcat 8 er designet til at arbejde med Java 8.
    * " ERDDAP er ikke længere et akronym. Nu er det bare et navn. Jeg vil ikke have navnet til at fremhæve ERD . Jeg vil have ERDDAP™ at fremhæve din institution og dine data.
    * BREV [tilpasse udseendet af din ERDDAP™ installation til at fremhæve din institution og dine data](/docs/server-admin/deploy-install#customize) . Med en times arbejde, kan du gøre gode forbedringer, der vil vare evigt.
    * I setup.xml&lt;displayDiagnosticInfo &gt; indstilling er nu altid ignoreret og behandles, som om værdien var falsk.
ANBEFALET:&lt;displayDiagnosticInfo &gt; tag og relaterede oplysninger fra din setup.xml.
    * I setup.xml, standard for&lt; drawLandMask &gt; var "slut", men nu er det "under", hvilket er en bedre generel standard (fungerer godt med alle datasæt) .
    * GenerateDatasetsXml.sh og DadDdssh Linux scripts bruger nu bash i stedet for csh, og har udvidelsen .sh. Takket være Emilio Mayorga
    * GenerateDataset Xml og DasDds opretter nu deres egne logfiler (GenerateDatasetsXml.log og DasDds.log) og outputfiler (GenerateDatasetsXml.out og DadDds.out) in _ bigParentDirectory _ / logs /, og aldrig sætte deres resultater på udklipsholderen.
    * GenerateDataset Xml understøtter nu en -i kommandolinjeparameter, som indsætter output i den angivne fil på et angivet sted. Se [dokumentation](/docs/server-admin/datasets#generatedatasetsxml) . Takket være Terry Rankine.
    * EDDTableFromDatabase understøtter nu&lt;columnNameQuotes &gt;&lt;/ columnNameQuotes &gt;, med gyldige værdier " (standard) ", eller ingenting. Dette tegn (om nogen) vil blive brugt før og efter kolonne navne i SQL forespørgsler. Forskellige typer af databaser, der er oprettet på forskellige måder, vil kræve forskellige kolonne navn citationstegn.
    * Tabular breddegrad og længdegrad variabler kan nu have tilpasset long\\_name f.eks. profilbreddegrad. Tidligere kunne de kun være breddegrad og længdegrad.
    * Fra nu af, angive "defaultDataQuery" og "defaultGraphQuery" som attributter i datasættets globale metadata (dvs.&lt;addatts &gt;), ikke som separate&lt;defaultDataQuery &gt; og&lt;defaultGraphQuery &gt; tags. (Selvom, hvis du stadig angiver dem via tags, ERDDAP™ vil automatisk oprette globale attributter med oplysningerne.) 

## Version 1.46{#version-146} 
 (udgivet 2013- 07- 09) 

*    **Nye funktioner:** 
    *    (Ingen) 
*    **Små ændringer / fejlrettelser:** 
    * Fejl fix: I EDDTableFromDatabase, i version 1.44 kun, ERDDAP™ forkert citeret databasens tabelnavn i SQL erklæringer. Det er nu ordnet. Takket være Kevin O 'Brien.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    *    ** Hvis du ikke ændrer standardmeddelelserne i messages.xml,
Slet \\[ tomcat \\] / content / erddap / messages.xml. **   
Standard messages.xml fil er nu i erddap. krig fil, ikke erddapContent .zip . Så du behøver ikke længere at manuelt opdatere messages.xml.
    * Hvis du ændrer meddelelser i messages.xml, fra nu af, hver gang du opdaterer ERDDAP™ enten:
        * Lav de samme ændringer du lavede før til den nye
             \\[ tomcat \\] / webapps / erddap / WEB- INF / classes / gov / noaa / pfel / erddap / util / messages.xml.
Og denne ene gang: slet \\[ tomcat \\] / content / erddap / messages.xml.
        * Eller, finde ud af, hvad der har ændret sig i den nye messages.xml (via diff) , og ændre din
             \\[ tomcat \\] / content / erddap / messages.xml fil i overensstemmelse hermed.

## Version 1.44{#version-144} 
 (udgivet 2013-05-30) 

*    **Nye funktioner:** 
    * Forespørgsler til EDDTable datasæt understøtter & orderBy min (...) og & orderByMinMax  (...)   (som returnerer to rækker i hver gruppe med minimum og maksimum for den sidste orderBy værdi) . Takket være Lynn DeWitt.
    * Der er to nye tabledap filtyper: .nc CFHeader og .nc CFMAHeader (som returnerer den ncdump- lignende header af den tilsvarende .nc CF og .nc CFMA-filtyper) . Takket være Steve Hankin.
*    **Små ændringer / fejlrettelser:** 
    * Fejlrettelse: indlæsning af .graph og .html websider for datasæt med masser af tidsværdier var langsom, fordi ERDDAP™ var langsom, når generere tidsskyderen muligheder. Nu er det altid hurtigt. Takket være Michael Barry, OOICI og Kristian Sebastian Blalid.
    * Fejlfiks: I nogle EDDTabeldatatyper blev tidsbegrænsningerne ikke altid håndteret korrekt. Nu er de. Takket være John Maurer og Kevin O 'Brien.
    * Fejl fix: datasæt ville ikke indlæse, når alle subsetVariables var variabler med fast værdi. Nu vil de. Takket være Lynn DeWitt og John Peterson.
    * FORBEDRING: nu, alle forespørgsler til bare delsæt variabler handle som om & distinct () er en del af forespørgslen.
    * FORBEDRING: nu, for forespørgsler, der omfatter & .json p = _ functionName _, _ function Navn _ SKAL nu være en serie på 1 eller flere (periodeadskilt) ord. Hvert ord skal starte med et ISO 8859 bogstav eller "\\ _" og efterfølges af 0 eller flere ISO 8859 bogstaver, cifre eller "\\ _". Ja, det er mere restriktivt end Java Scripts krav til funktionsnavne.
    * Tidsaksen på grafer fungerer nu godt i længere tidsintervaller (80 - 10000 år) og kortere tidsintervaller (0.003 - 180 sekunder) .
    *    ERDDAP™ er nu mere tilgivende, når fortolkning variationer af ISO- 8601- format tidsdata.
    * Der var mange andre små ændringer og fejlrettelser.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    *    **Du SKAL opdatere til den nyeste version for at være sikker.**   
         ERDDAP™ har gennemgået en sikkerhedsrevision. Der var nogle fejl og svagheder. Version 1.44 indeholder flere vigtige sikkerhedsfejlrettelser og flere ændringer for at øge sikkerhed og tilgængelighed (f.eks. for synshæmmede brugere) . Version 1.44 har bestået opfølgende sikkerhedsrevision. Takket være alle de gode mennesker på USGS og Acunetix, der gjorde dette muligt. (Bør ikke NOAA Gør du det her?) 
    * Det nye [EDDTableFrom WFS Filer](/docs/server-admin/datasets#eddtablefromwfsfiles) gør en lokal kopi af alle data fra en ArcGIS MapServer WFS server og så data kan derefter genserveres hurtigt til ERDDAP™ brugere. Takket være Christy Caudill.
    * Det nye [EDDTableFrom EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) kan du oprette et EDDTable datasæt fra en EDDGrid dataset. Nogle almindelige årsager til at gøre dette er:
        * Dette gør det muligt at forespørge datasættet med OPeNDAP udvælgelseskrav (som en bruger kan have anmodet om) .
        * Datasættet er i sagens natur et tabeldatasæt. Takket være OOICI, Jim Potemra, Roy Mendelssohn.
    * Det variable navn "dybde" er nu et særligt alternativ til "højde". Enhederne skal være en variant af "meter". Dataværdierne skal være positive = nedad. ERDDAP™ er nu helt klar over betydningen af "dybde" og understøtter det, hvor højden er understøttet (f.eks. som en komponent i en CF DSG cdm\\ _ data\\ _ type = profildatasæt) . Et datasæt må ikke have både "dybde" og "højde" -variabler.
    * I datasets.xml , skal du fjerne enhver anvendelse af&lt;att navn = "cdm\\ _ highth\\ _ proxy" &gt; dybde&lt;/ att &gt; da dybde er nu et særligt alternativ til højde og derfor ikke behøver at være specielt identificeret.
    * I datasets.xml , skal du fjerne enhver anvendelse af&lt;unit description in lists fra SOS .
Når værdien er 1, skal du bare slette den.
Når værdien er -1, overveje at ændre variablen navn til dybde.
For andre værdier tilføjes til&lt; addAttributes &gt;, for eksempel:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Alle datasæt understøtter nu
        
        *   &lt;defaultDataQuery &gt; som bruges, hvis der anmodes om .html uden forespørgsel.
            * Du vil sandsynligvis sjældent nødt til at bruge dette.
            * For Griddap datasæt, er en almindelig brug af dette at angive en anden standard dybde eller højde dimension værdi (f.eks. \\[ 0 \\] i stedet for \\[ sidste \\] ) .
Under alle omstændigheder bør du altid liste alle variabler, altid bruge de samme dimension værdier for alle variabler, og næsten altid bruge \\[ 0 \\] , \\[ sidste \\] eller \\[ 0: sidste \\] for dimensionsværdierne.
For eksempel:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * til tabledap datasæt, den mest almindelige brug af dette er at angive et andet standardtidsinterval (I forhold til nu, f.eks., & tid & gt; = now- 1 dag) .
Husk, at anmode om ingen data variabler er det samme som at angive alle data variabler, så normalt kan du bare angive den nye tidsbegrænsning.
For eksempel:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery &gt; som bruges, hvis .graph ønskes uden forespørgsel.
            * Du vil sandsynligvis sjældent nødt til at bruge dette.
            * For Griddap datasæt, den mest almindelige brug af dette er at angive en anden standard dybde eller højde dimension værdi (f.eks. \\[ 0 \\] i stedet for \\[ sidste \\] ) og / eller specificere, at en bestemt variabel tegnes.
Under alle omstændigheder vil du næsten altid bruge \\[ 0 \\] , \\[ sidste \\] eller \\[ 0: sidste \\] for dimensionsværdierne.
For eksempel:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * til tabledap datasæt, de mest almindelige anvendelser af dette er at angive forskellige variabler, der skal tegnes, et andet standardtidsinterval (I forhold til nu, f.eks., & tid & gt; = now- 1 dag) og / eller forskellige standardgrafikindstillinger (f.eks. markørtype) .
For eksempel:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Husk at du er nødt til at XML- indkode eller indkode (enten en, men ikke begge) standardforespørgsler, da de er i et XML-dokument. For eksempel bliver & amp; amp;,&lt;bliver & amp; lt;, og &gt; bliver & gt;.
Og tjek venligst dit arbejde. Det er nemt at lave en fejl og ikke få, hvad du ønsker.
Takket være Charles Carleton, Kevin O 'Brien, Luke Campbell og andre.
    *    EDDGrid FromDap EDDGrid FromErddap og EDDTableFrom EDDGrid har et nyt system til at håndtere datasæt, der ændrer sig hyppigt (så ofte som omkring hver 0,5 s) . I modsætning til ERDDAP er regelmæssig, proaktiv system til fuldstændig genindlæsning af hvert datasæt, dette valgfri ekstra system er reaktivt (udløst af en brugeranmodning) og inkrementel (blot opdatere de oplysninger, der skal opdateres) . For eksempel hvis en anmodning til en EDDGrid FromDap datasæt forekommer mere end det angivne antal millisekunder siden den seneste opdatering, ERDDAP™ vil se om der er nogen nye værdier for venstre (som regel "time" ) dimension og i så fald bare downloade disse nye værdier, før du håndterer brugerens anmodning. Dette system er meget godt til at holde et hurtigt skiftende datasæt up-to-date med minimale krav til datakilden, men på bekostning af en smule bremse behandlingen af nogle brugeranmodninger. Se [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasæt # updateeEverynmillis)   
Takket være Michael Barry og OOICI.
    *    EDDGrid FromNcFiles, EDDTableFromNcFiles, og EDDTableFromNcCFFiles understøtter nu [NcML .nc ml](/docs/server-admin/datasets#ncml-files) kildefiler i stedet for .nc filer. Takket være Jose B Rodriguez Rueda.
    * til EDDGrid AggregateExistingDimension ERDDAP™ understøtter en ny serverType = "dodsindex" valgmulighed for serverType attribut af&lt; sourceUrl s &gt; tag. Dette virker med websider, der har lister over filer inden&lt;pre &gt;&lt;/ pre &gt; og ofte under OPeNDAP logo. Et eksempel er: [ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) .
    * For EDDTableFrom SOS understøtter nu et valgfrit mærke
```  
        <sosServerType>_serverType_</sosServerType>  
```
så du kan angive typen af SOS server (så ERDDAP™ behøver ikke at finde ud af det) . Gyldige værdier af&lt;_ serverType _\\ & gt; er IOOS\\ _ NDBC, IOOS\\ _ NOS, OOSTethys , og WHOI (en nyligt understøttet server Type) . Se [EDDTableFrom SOS ](/docs/server-admin/datasets#eddtablefromsos) . Takket være Derrick Snowden og Janet Fredericks.
    * Alle EDDGrid Fra... filer, EDDTableFrom... filer, EDDGrid Kopiér og EDDTable Kopiér nu understøtter et valgfrit mærke
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
som kan se ERDDAP™ at opbevare filen Tabel (med oplysninger om hver kildedatafil) i hukommelsen i stedet for bare på disken (standard) . Hold filtabellen i hukommelsen hurtigere anmodninger om data (specielt hvis der er &gt; 1000 kildedatafiler) men bruger mere hukommelse. Hvis du sætter dette til true for ethvert datasæt, holde øje med hukommelsen: i øjeblikket bruger linje på _ yourDomain _ /erddap/status.html at sikre, at ERDDAP™ har stadig masser af fri hukommelse. Takket være Fredrik Stray.
    * EDDTableFromASCIIFiler understøtter nu&lt;charset &gt;. De to mest almindelige tegnsæt (sagen følsom&#33;) er ISO- 8859-1 (standard) og UTF-8.
    * Anbefalet: i setup.xml, inden&lt;startHeadHtml &gt;, skift venligst&lt;html &gt; til
        &lt;html lang = "en- US" &gt; (eller en anden [sprogkode](https://www.w3schools.com/tags/ref_language_codes.asp) hvis du har oversat messages.xml) .
    * setup.xml har nye valgfrie tags til at deaktivere dele af ERDDAP :
        *   &lt;convertersActive &gt; false&lt;/ convertersActive &gt;&lt;&#33; -- standarden er sand -- &gt;
        *   &lt;slideSorterActive &gt; false&lt;/ slideSorterActive &gt;&lt;&#33; -- standarden er sand -- &gt;
        *   &lt;wmsaktive &gt; false&lt;/ wmsaktiv &gt;&lt;&#33; -- standarden er sand -- &gt; Generelt anbefaler vi ikke at sætte nogen af disse til falsk.
    * GenerateDataset Xml skriver nu resultater til _ bigParentDirectory _ / logs / generateDatasettsXmlLog.txt, ikke log.txt. Takket være Kristian Sebastian Blalid.
    * GenerateDataset Xml giver nu et godt forslag til&lt;genbelastning EveryNMinutter &gt;. Takket være NOAA UAF-projektet.
    * Mange små forbedringer til GenerateDatasetsXml. Takket være NOAA UAF-projektet.

## Version 1.42{#version-142} 
 (udgivet 2012-11-26) 

*    **Nye funktioner:** 
    *    (Ingen større nye funktioner.) 
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Hvis du opgraderer fra ERDDAP™ 1.38 eller 1.40, der var ingen ændringer, der kræver, at du foretager ændringer i dine konfigurationsfiler (men du skal bruge den nye messages.xml fil) .
    *    ERDDAP™ endnu en gang kan køre med Java 1.6. ( ERDDAP™ v1.40 påkrævet Java 1.7.) Vi stadig stærkt anbefale at bruge den nyeste version af Java 1.7.
    * en ny datatype [EDDTableFrom AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles) , kan læse data fra et sæt af automatisk Vejrstationer (AWS) XML datafiler. Takket være Lynn Dewitt og Exploratorium.
*    **Små ændringer / fejlrettelser:** 
    * Justeret til ændringer i NDBC SOS kildedataservere.
    * Justeret til ændringer af NOS COOPS ASCII-tjenesterne.
    * Lavede flere små ændringer og fejlrettelser.

## Version 1.40{#version-140} 
 (udgivet 2012-10-25) 

*    **Nye funktioner:** 
    * Der er et nyt output filformat til tabledap datasæt: .nc CFMA, som gemmer de ønskede data i en .nc fil, der er i overensstemmelse med CF [Særskilte prøveudtagningsgeometrier](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Multidimensionelle array muligheder, og som derfor er i overensstemmelse med NODC skabeloner \\[ 2021: nu [NCEI-skabeloner](https://www.ncei.noaa.gov/netcdf-templates)  \\] til lagring af denne type data. Takket være NODC.
    *    tabledap anmodninger kan nu omfatte tidspres såsom & tid &gt; now- 5 dage. Se [dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Takket være James Gosling.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Hvis du opgraderer fra ERDDAP™ 1.38, der var ingen ændringer, der kræver, at du foretager ændringer i dine konfigurationsfiler (men du skal bruge den nye messages.xml fil) .
    *    ERDDAP™ offentlige udgivelser og interne milepæle er tilgængelige via [ ERDDAP™ om GitHub](https://github.com/ERDDAP) . For mere information, se [Wiki](https://github.com/ERDDAP/erddap/wiki) til ERDDAP™ og mere generelt [ ERDDAP™ Vejledning for programmører](/docs/contributing/programmer-guide) . (Dette blev meddelt separat et par uger efter ERDDAP™ 1.38 frigivelse.) 
    * GenerateDataset Xml er blevet forbedret.
        * Scriptet blev revideret, så det skulle virke korrekt på alle Linux-computere (Ikke kun nogle få) .
        * Det tilføjer nu creator\\_name , creator\\_email , og creator\\_url når det er muligt.
        * Mange andre små forbedringer.
    * Raffineret hvordan ERDDAP™ tager sig af tiden.
        * Internt, ERDDAP™ nu håndterer tider ved millisekund præcision (ikke sekunder) .
        * Du kan nu vælge at angive tiden præcision for en given datasæt, se [ time\\_precision ](/docs/server-admin/datasets#time_precision) . For eksempel kan du indstille et datasæt for at vise tidsværdier med datopræcision (f.eks. 1970-01-01) .
        * Dine nuværende datasæt vil bruge standardindstillingerne, så de er upåvirket af disse ændringer og vil fortsætte med at vise tid med sekunder præcision. Takket være Servet Cizmeli og Philip Goldstein.
    *    [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles) er en ny datasæt type, som du kan bruge i din datasets.xml fil. Det kan læse data fra et af de mange filformater, der er defineret af [CF Særskilte prøveudtagningsgeometrier](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) konventioner. Takket være NODC og særlig tak til Kyle Wilcox for at gøre prøve filer for det enorme antal gyldige DSG filformater og for at gøre dem offentligt tilgængelige.
*    **Små ændringer / fejlrettelser:** 
    * Udvidelse [quickGenstart](#quick-restart) system til alle relevante EDDGrid og EDDTable underklasser.
    * Forbedret dokumentation, især relateret til, hvordan du bruger [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) og [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) fra forskellige klientsoftware.
    * Ændrede avanceret søgning for at understøtte minTime og / eller maxTime udtrykt som epochSeconds. Takket være Lynn Dewitt.
    * Ændret .htmlTable output til at vise URL 'er og e-mailadresser som links.
    * Tilføjet "rel =" og "rev =" til relevant&lt;a Horif &gt; tags. Takket være Pat Cappelaere fra OGC   REST projekt.
    * Bedre beskyttelse mod urealistisk store dataanmodninger, navnlig inden for tabledap , hvor det er et sværere problem.
    * Flyttede flere beskeder til messages.xml.
    * Lavede hastighedsforbedringer.
    * Fast EDDGrid FromFiles til at tillade faldende sorterede akser. Takket være Maricel Etchegaray.
    * Fjernede henvisninger til iGoogle, da det vil blive afbrudt.
    * Lavede flere små ændringer og fejlrettelser.

## Version 1.38{#version-138} 
 (udgivet 2012- 04- 21) 

*    **Nye funktioner:** 
    * ISO 19115 og FGDC -- ERDDAP™ kan automatisk generere ISO 19115 og FGDC XML metadatafiler for hvert datasæt. Links til filerne er synlige på hver liste over datasæt (f.eks. fra fuld tekstsøgning) og også i webtilgængelige mapper (WAF)   (se [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) og [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) . Takket være Ted Habermann, Dave Neufeld og mange andre.
    * Fuld tekstsøgning for datasæt understøtter nu\\ - _ excludedWord og\\ - "_ udelukket sætning _". Takket være Rich Signell.
    * Søgning efter datasæt nu returnere resultater en side ad gangen. Standard bruger parameterstrengen: side = 1 & itemsPerPage = 1000, men du kan ændre værdierne i URL 'en for din anmodning. Takket være Steve Hankin og UAF-projektet.
    *    OpenSearch -- ERDDAP™ nu støtter [ OpenSearch 1, 1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) standard for søgning efter datasæt. Dette giver blandt andet mulighed for katalogisering hjemmesider til at gøre distribuerede søgninger (passerer en søgning anmodning til hvert katalog, som den kender til) .
    * Kommasepareret Værdi (CSV) Filer... ERDDAP™ nu genererer CSV-filer med blot et komma mellem værdier (som Excel foretrækker) i stedet for komma + plads. Takket være Jeff de LaBeaujardiere.
    * Million Datasets... Der blev foretaget flere ændringer for at støtte ERDDAP s have et stort antal datasæt, måske endda en million. Takket være Steve Hankin og UAF-projektet.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
#### Hurtig genstart{#quick-restart} 
*    [A](#quick-restart) hurtiggenstart system tillader ERDDAP™ at genstarte meget hurtigere.
     **Tilføj dette til din setup.xml fil** lige efter&lt;/ datasæt Regex &gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Fuld tekstsøgning efter datasæt kan nu gøres med Lucene søgemaskine (selvom vi anbefaler den oprindelige søgemaskine, hvis du har færre end 10.000 datasæt) eller det oprindelige søgesystem.
         **Tilføj dette til din setup.xml fil** lige efter&lt;/ displayDiagnosticInfo &gt;:
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

    * I setup.xml kan / bør du nu tilføje to nye kategorier til kommasepareret liste over&lt; categoryAttributes &gt;:
        * global: nøgleord (tilføje det lige efter global: institution) -- en ny speciel sag, der parser en komma- adskilt liste af søgeord fra de globale nøgleord attribut til at lave en separat indgang for hvert søgeord.
        * variabel Navn (Tilføj det til sidst) -- en ny speciel sag, der kategoriserer hver af de dataVariable   destinationName a.
    * I setup.xml, kan du (men hvorfor?) Fortæl ERDDAP™ ikke at tilbyde FGDC og / eller ISO 19115 metadata for noget datasæt ved at inkludere
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Standardværdierne for disse indstillinger er sande.
    * I datasets.xml , venligst overveje at forbedre metadata for dine datasæt. ERDDAP™ nu automatisk genererer ISO 19115 og FGDC XML metadatafiler for hvert datasæt baseret på datasættets metadata.
Så... **godt datasæt metadata fører til godt ERDDAP -genererede ISO 19115 og FGDC metadata.**   
         **Se den nye dokumentation for de mange nye ANBEFALEDE [Global attributter](/docs/server-admin/datasets#global-attributes) .** 
    * I datasets.xml , hvis du ønsker at fortælle ERDDAP™ til at bruge en præ- made FGDC og / eller ISO 19115 fil, der er et sted på serverens filsystem i stedet for at have ERDDAP™ generere disse filer, brug:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Hvis _ fullFileName _\\ = "" eller filen ikke findes, vil datasættet ikke have FGDC og / eller ISO 19115 metadata. Så dette er også nyttigt, hvis du ønsker at undertrykke FGDC og / eller ISO 19115 metadata for et bestemt datasæt.
    * I datasets.xml , for alle EDDGrid SidebySide og EDDGrid AggregateExistingDimension datasæt, gøre sikker på, at barn datasæt har forskellige datasetID er over deres forældre datasæt og over de andre børn. (For eksempel kan du følge George Foremans enkle, men effektive system til at navngive sine børn.) Hvis nogen navne i en familie er præcis de samme, datasættet vil undlade at indlæse (med fejlmeddelelsen om, at værdierne for den aggregerede akse ikke er sorterede) .
    * I datasets.xml , der var nogle ændringer i listen over gyldige ioos\\_category metadataværdier:
        * "pCO2" blev ændret til "CO2".
        * "Fysisk Oceanografi" blev tilføjet.
        * "Jord" blev tilføjet.
    * I datasets.xml , ERDDAP™ ikke længere tillader "." i en datasetID . Det var tilladt, men modløs. (Undskyld.) 
    * I datasets.xml , opsætningen til EDDTableFromThreddsFiles og EDDTableFrom Hyrax Filer har ændret sig en smule, fordi begge klasser blev bare omskrevet til at være mere effektive (begge klasser nu altid lave en lokal kopi af alle de eksterne datafiler) . Se dokumentationen for oprettelse af disse klasser: [EDDTableFrom Hyrax Filer](/docs/server-admin/datasets#eddtablefromhyraxfiles) og [EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Se især de reviderede bemærkninger om&lt;fileDir &gt; (Nu irrelevant) og&lt; sourceUrl &gt; (nu afgørende) . Også, bør du aldrig wrap denne klasse i EDDTableCopy for effektivitet.
    * I datasets.xml , hvis du bruger EDDTableFromDatabase med en Oracle database, skal du inkludere en forbindelse Ejendomme såsom
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
at angive, hvor mange rækker af data der skal hentes på én gang, fordi standarden er 10, hvilket er forfærdeligt ineffektivt. Se [ Oracle dokumentation](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) . MySql og PostgreSQL synes at have bedre standard for denne indstilling. Takket være Kevin O 'Brien.
    * Hvis du bruger EDDTableFromDatabase, se den forbedrede ["Hastighed" - dokumentation](/docs/server-admin/datasets#eddtablefromdatabase) for yderligere forslag til forbedring af ydeevnen. Takket være Kevin O 'Brien.
    * I datasets.xml , for alle EDDTable... datasæt, i konventionerne og Metadata\\_Conventions globale attributter, se venligst CF- 1.6 (ikke CF- 1, 0, 1, 1, 2, 1, 3, 1, 4, eller 1, 5) , da CF- 1.6 er den første version, der omfatter ændringerne i forbindelse med den diskrete prøvetagningsgeometri.
    * Programmer, der er ved at samle ERDDAP™ kode behov for at tilføje lib / lucene- core.jar til listen over krukker filer i deres javac og java kommandolinje stier.
    *    ERDDAP™ har en [ny service](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) at konvertere et CF Standard Name til / fra en GCMD Science Keyword. Du kan finde dette nyttigt, når du genererer globale søgeord metadata for datasæt i din ERDDAP .
    * At håndtere Bots... Læs venligst dette råd for [forhindre bots i at kravle din ERDDAP™ på en dum måde](/docs/server-admin/additional-information#robotstxt) .
    * Oversættelse... Teksten til ERDDAP s websider er nu mest i messages.xml og så velegnet til oversættelse til forskellige sprog (f.eks. tysk, fransk) . Meddelelserne bruger nu ofte MessageFormat til formatering, også for at hjælpe med at lave oversættelser. Hvis du er interesseret i at gøre en oversættelse, bedes du e-mail erd dot data at noaa dot gov .
    * Stikprøve datasets.xml -- Der var flere små, men væsentlige fejl i stikprøven datasets.xml . Hvis du bruger disse datasæt, skal du få de nyere versioner fra den nye prøve datasets.xml i den nye erddapContent .zip fil. Takket være James Wilkinson.
    * Git... Jeg vil forsøge hårdt at gøre ERDDAP™ et GitHub projekt ASAP efter denne udgivelse.
*    **Små ændringer / fejlrettelser:** 
    * En ny palet, OceanDepth, er nyttig for dybdeværdier (positiv er nede) f.eks. 0 (lavvandet) 8000 (dyb) .
    * EU .kml output fra tabledap bruger en bedre markør ikon (det er ikke fuzzy) . Og at svæve over en markør gør den større.
    * EDDTableFromFiles -- I den seneste opgradering, den nye netcdf- java bibliotek havde strammere restriktioner for variable navne i .nc filer. Det forårsagede problemer for EDDTableFromFiles hvis en variabel er sourceName havde visse punktummer. EDDTableFromFiles er nu ændret for at undgå dette problem. Takket være Thomas Holcomb.
    * Den .subset side nu understøtter 0 / 10 / 100 / 1000 / 10000 / 100000 i stedet for et afkrydsningsfelt for Relaterede data. Værktøjstippet advarer om, at 100000 kan få din browser til at gå ned. Tak til Annette DesRochers, Richard (Abe) Coughlin og IOOS Biological Project.
    * ... / erddap / info / _ datasetID _ / index.html websider viser nu webadresser og e-mail-adresser som klikbare links. Takket være Richard (Abe) Coughlin og IOOS Biological Project.
    * Fejlfiks: In tabledap til datasæt med højde MetersPerSourceUnit&lt;0, forespørgsler med højdebegrænsninger blev håndteret forkert. Takket være Kyle Wilcox.
    * Fejlfiks: EDDGrid AggregateFromExistingDimension understøtter nu mere forskellige TDS URL 'er. Takket være?

## Version 1.36{#version-136} 
 (udgivet 2011-08- 01) 

*    **Nye funktioner:** 
    * Ingen væsentlige ændringer fra en brugers synspunkt.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Det pmelTao datasæt, der ofte blev brugt som prøve datasæt for tabledap   
dokumentation ikke længere er tilgængelig. ERDDAP™ Administratorer SKAL foretage disse ændringer:
        * I datasets.xml , hvis du har en datasetID = "pmelTao" datasæt, add
aktiv = "false" lige før "&gt;" i slutningen af denne linje.
        * I din setup.xml, hvis din&lt;EDDTableIdEksempel &gt; er pmelTao, derefter:
            * Hvis De datasets.xml har ikke et datasæt med datasetID = "erdGlobecFlattle", tilføjes
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * I din setup.xml, erstatte alle tags fra&lt;EDDTableIdEksempel &gt; gennem
                &lt;EDDTabel Matlab PlotEksempel &gt; med
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
                
    * For datasæt, hvor typen er en underklasse af EDDTableFromFiles, kan du nu lave data fra metadata.
Specifikt, kan du nu lave en variabel fra værdierne af en attribut af en af de oprindelige variabler.
For eksempel i datasets.xml , inden for&lt; dataVariable &gt; tag, hvis du bruger
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ vil lave en variabel med værdierne af PI attributten for krydstogtets variabel.
Takket være WOD.
*    **Ændringer:** 
    * Små ændringer

## Version 1.34{#version-134} 
 (udgivet 2011-06- 15) 

*    **Ændringer:** 
    * Fejlfiks: Rettet en hukommelse lækage, der opstod på omkring 64-bit Java anlæg.
    * Fejlfiks: ERDDAP™ nu korrekt sætter disse globale attributter når breddegrad dimensions værdier spænder fra høj til lav: geospatial\\ _ lat\\ _ min, geospatial\\ _ lat\\ _ max, Sydlig\\ _ Northing, Nordligste\\ _ Northing.
        
Bemærk, at actual\\_range er uændret: det kan have lave, høje eller høje, lave værdier, da det er beregnet til at angive området og rækkefølgen af opbevaring.
        
    * Små forandringer.
    *    ERDDAP™ administratorer behøver ikke at foretage ændringer i deres setup.xml eller datasets.xml .

## Version 1.32{#version-132} 
 (udgivet 2011-05- 20) 

*    **Ændringer:** 
    * Støtte til de nyligt ratificerede CF Diskret prøvetagning geometrier (som desværre endnu ikke er tilgængelig online) , som erstatter de foreslåede CF Point Observation Conventions.
         ERDDAP™ brugere vil se, at CDM\\ _ feature\\ _ type = Station er erstattet af TimeSeries, og der er små ændringer i de filer, der er oprettet til .nc CF-filtype (flad\\ _ dimension kaldes nu prøve\\ _ dimension) .
         ERDDAP™ administratorer bliver nødt til at foretage disse ændringer i datasets.xml :
        * cdm\\ _ data\\ _ type = Station bør ændres til cdm\\ _ data\\ _ type = TimeSeries.
        * cdm\\ _ data\\ _ type = StationProfil bør ændres til cdm\\ _ data\\ _ type = TimeSeriesProfile.
        * cdm\\ _ station\\ _ variable skal ændres til cdm\\ _ timeseries\\ _ variable.
        * ic\\ _ role = station\\ _ id bør ændres til ic\\ _ role = timeseries\\ _ id.
    * Ny ioos\\_category optioner: "Farvet opløst organisk stof", "pCO2", "Stream Flow", "Total Suspenderet stof".
    * Mulig løsning på en mulig hukommelseslækage på 64- bit Java . \\[ Det virkede ikke. \\] 
    * Små forandringer.

## Version 1.30{#version-130} 
 (udgivet 2011-04- 29) 

*    **Nye funktioner:** 
    * Støtte til 64- bit Java . Når det bruges med 64 bit Java , ERDDAP™ kan nu bruge meget mere bunke hukommelse og håndtere mange flere samtidige anmodninger.
    * Støtte til .nc file anmodninger op til 2GB (også uden 64-bit Java ) ved bedre anvendelse af ERDDAP er håndtering af data i stykker.
    * Mange 2X hastighed forbedringer i koden og 2X hastighed ups fra Java 1.6 make ERDDAP™ 2X til 4X hurtigere end før.
    * Hukommelsesbesparende forbedringer betydeligt lavere ERDDAP 's base memory use.
    * til tabeldatasæt ERDDAP™ er nu fuldt ud klar over en datasæts cdm\\ _ data\\ _ type, og hvordan data kort til CDM typen. Se [CF Specifikation af diskrete prøvetagningsgeometrier](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Måske en dag snart, at Word-fil vil blive konverteret til .html og erstatte den aktuelle "OBSOLETE" oplysninger på denne webside. Takket være NOAA UAF-projektet.
    * For de fleste EDDTable datasæt, en ny output filtype option, .nc CF, skaber Contiguous Ragged Array .nc filer, der er i overensstemmelse med den seneste version af [CF Diskret prøvetagning geometrier konventioner](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Disse filer er struktureret til at afspejle CDM datatypen for datasættet. Da de foreslåede konventioner lige ændret, som i denne skriftligt, netcdf- java biblioteket endnu ikke understøtter læsning af filformater skabt af ERDDAP og tolke dem som CDM datafiler. Det vil det sikkert snart. Takket være NOAA UAF-projektet.
    * View: Distinct Data option på .subset webside er nu en drop- down liste, der lader brugerne angive det maksimale antal rækker af særskilte data, der skal ses (standard = 1000) . Denne ændring, og andre, tillade ERDDAP™ til at arbejde med datasæt, der har meget stort antal rækker af forskellige data. (Antallet af unikke værdier for en enkelt variabel er stadig et problem, men det kan være temmelig høj (20.000?) før .subset og andre websider indlæses virkelig langsomt.) Takket være NOAA UAF-projektet.
    * .delsæt websider har en ny mulighed: Se Distinct Data Counts. Takket være GTOPP projektet.
    * For at hjælpe brugerne, de særskilte værdier (f.eks. stationenavn) er nu vist på Make- A- Graph og Data Access Forms. Takket være NOAA UAF-projektet.
    * .transparent Png anmodninger nu understøtter alle typer af grafer og data repræsentationer. Den tegner kun data -- ingen økser, legender, landmaske eller noget andet. Dette gør det muligt at lave billeder som lag af gennemsigtige Pngs. Hvis & .size = _ bredde _ | _ højde _ er angivet i forespørgslen (anbefales) Det er en ære. Standard er 360x360 pixels. Den eneste undtagelse er EDDGrid &. draw = overflade, hvor standard (som før) er et billede med ~ 1 / pixel per datapunkt (op til 3000 x og y pixels) . Takket være Fred Hochstaedter.
    * EU WMS websider viser nu farvebjælken for datasættets variabel (s) . Takket være Emilio Mayorga og andre.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Denne udgivelse indebærer en masse ændringer. De er alle vigtige. Vær tålmodig og arbejd gennem alle de ændringer, der er angivet nedenfor.
    * Denne version bliver skubbet ud tidligere end beregnet til at beskæftige sig med nogle Java Sikkerhedsinsekter. Desværre er flere funktioner / rettelser beregnet til dette ERDDAP™ version er ikke i denne version. Undskyld. Forhåbentlig vil den næste version være relativt snart (og meget nemmere at opgradere til) .
    * For at undgå flere sikkerhedsfejl i Java 6 opdatere 23 og nedenfor, downloade og installere den nyeste version af Java   ( Java 6 opdatering 24 eller højere) . Hvis du har et 64- bit operativsystem, skal du få en 64- bit version af Java .
    * Hvis du bruger Tomcat 5, skal du opgradere til Tomcat 6 eller 7 (foretrækkes) . Hvis du bruger Tomcat 6, overveje opgradering til Tomcat version 7.
    * Følg venligst alle instruktionerne for [om oprettelse af et nyt ERDDAP™ ](/docs/server-admin/deploy-install) , men hvor det er relevant, vil du kopiere filer fra din gamle installation til den nye installation, især \\[ tomcat \\] / content / erddap mappe og filer. Som en del af dette skal [nye Tomcat opsætningsanbefalinger](/docs/server-admin/deploy-install#tomcat) .
    * Standard erddap.css er nu inkluderet i erddap.war-filen.
        * For at bruge standard erddap.css, **Slet** din gamle \\[ tomcat \\] / content / erddap / images / erddap.css.
        * Hvis du har ændret \\[ tomcat \\] / content / erddap / images / erddap.css, og ønsker at blive ved med at bruge det: bare lade det være på plads og erstatte&lt;input &gt; sektion med:
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

    * I \\[ tomcat \\] / content / erddap / setup.xml:
        * Erstat kommentarer og tags relateret til&lt;partialRequestMaxBytes &gt; og&lt;partialRequestMaxCells &gt; med
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
        * Erstat bemærkningerne vedrørende&lt; categoryAttributes &gt; og overveje at ændre mærkets værdi:
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

Individuel&lt; categoryAttributes &gt; der er globale attributter nu SKAL identificeres via præfikset global: (f.eks. global: institution) . Andre attributter antages at være variable attributter (f.eks. standard\\_name ) . Institutionsværdier (de eneste) var tilbage i det oprindelige tilfælde. Nu konverteres alle kategoriværdier til små bogstaver.
    * I \\[ tomcat \\] / indhold / erddap / datasets.xml :
        * Stor forstørrelse: ERDDAP™ har nye krav i forbindelse med en tabeldatasættets cdm\\ _ data\\ _ type. Især skal hvert datasæt have de korrekte metadata og variabler relateret til cdm\\ _ data\\ _ typen. Hvis ikke, vil datasættet ikke indlæse og vil kaste en fejl. Se dokumentation for [cdm\\ _ data\\ _ type](/docs/server-admin/datasets#cdm_data_type) .
        * FYI: Der er en ny datatype: EDDTableFromAsciiServiceNOS.
        * FYI: Der er tre nyligt tilladt ioos\\_category tilvalg: Hydrologi, kvalitet (f.eks. for kvalitetsflag) og statistik (f.eks. middelværdi) .
        * For EDDTableFrom... Filer datasæt, fjerne enhver&lt;nDimensioner &gt; tags. De er ikke længere nødvendige eller anvendes.
        * For variabler med destinationName = højde ERDDAP™ ikke længere tvinger long\\_name til at være Højde. Gå venligst gennem din datasets.xml og gentagne gange søge efter&lt; destinationName &gt; højde og tilføje til denne variabel er&lt; addAttributes &gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (eller en lidt anderledes long\\_name i særlige tilfælde) .
        * Valgfrit: Alle EDDTableFromFiles underklasser understøtter variabel [ sourceName = global:...](/docs/server-admin/datasets#global-sourcenames) at konvertere globale metadata fra hver fil til en datavariabel. Takket være Lynn DeWitt.
    * EDDTableFromDatabase brugere -- ERDDAP™ kommer med en ny JDBC 4 driver til Postgres. For andre databaser, tjek nettet for den seneste JDBC .jar fil til din database. Siden ERDDAP™ nu bruger Java 1.6 +, JDBC 4 (ikke 3) anbefales sandsynligvis.
    * FYI
        *    EDDGrid Fra... Filer og EDDTable Fra... Filer datasæt nu gemme fileTable information i
             \\[ Big ParentDirectory \\] / datasæt Info / \\[  datasetID  \\] /\\ * .nc filer.
Også EDDTable datasæt nu gemme delmængden oplysninger i
             \\[ Big ParentDirectory \\] / datasæt Info / \\[  datasetID  \\] /\\ * .nc filer. Disse filer plejede at være
             \\[ Big ParentDirectory \\] / datasæt Info / \\[  datasetID  \\] .\\ * .json filer.
De gamle filer vil blive slettet automatisk, når ERDDAP™ starter op. Eller du kan slette alle filer (men forlade de tomme undermapper) er \\[ Big ParentDirectory \\] / datasetInfo /.
        * Jeg arbejdede på en ny EDDTableFromNcCFFiles, som ville læse data fra lokale og eksterne filer ved hjælp af de foreslåede, nye CF Point Observation konventioner. Men det er ikke i denne udgivelse. Der er problemer i netcdf- java biblioteker relateret til nogle metoder til at læse disse filer. Og der var nogle meget nylige ændringer af de foreslåede CF Point Observation konventioner. Når netcdf- java biblioteket er fast og opdateret til det seneste forslag, vil jeg genoptage arbejdet med dette.
        * Kører ERDDAP™ på Windows kan have problemer: især, kan du se i \\[ bigParentDirectory / logs / log.txt fil, ERDDAP™ er undertiden ude af stand til at slette og / eller omdøbe filer hurtigt. Dette skyldes antivirus software (f.eks. fra McAfee og Norton) som kontrollerer filerne for virus. Hvis du løber ind i dette problem (som kan ses af fejlmeddelelser i log.txt-filen som "Kan ikke slette"...) , ændre antivirus-software indstillinger kan delvist afhjælpe problemet.
Hvis ERDDAP™ i Windows er bare en test kører på dit skrivebord, dette er bare en irritation.
Hvis ERDDAP™ i Windows er din offentlighed ERDDAP™ , overveje at skifte til en Linux-server.
    * Slow First Startup -- Første gang du løber ERDDAP™ efter opgradering ERDDAP™ kan være langsom til at indlæse datasæt. Den måde ERDDAP™ gemmer oplysninger om aggregerede filer har ændret sig, så ERDDAP™ bliver nødt til at gen- læse nogle oplysninger fra alle disse filer. Det vil tage tid.
    * Fejl ved opstart -- I betragtning af ændringerne relateret til CDM\\ _ data\\ _ type, er det sandsynligt, at nogle af dine datasæt ikke vil indlæse og vil kaste fejl. Læs forsigtigt den daglige rapport e-mail, at ERDDAP™ sender dig når ERDDAP™ er færdig med at starte op. Det vil have en liste over datasæt, der ikke indlæse (i toppen) og grunden til at de ikke læssede (ved bunden) .
    * Hvis du sidder fast eller har andre spørgsmål, e-mail oplysningerne til mig: erd.data at noaa.gov .
    * Programmer -- Hvis du skriver Java programmer, der kører ERDDAP™ kode, skal du ændre nogle af kommandolinjens parameterreferencer:
        * Skift joda- time - 1.6.2.jar til joda- time. krukke
        * Skift postgres JDBC .jar reference til postgresql.jdbc.jar
*    **Små ændringer og fejlrettelser:** 
    
    * Forbedret forbindelseshåndtering for at undgå ophængte tråde.
    * Forbedret concurrency praksis til at håndtere næsten samtidige identiske anmodninger mere effektivt.
    *    ERDDAP™ nu bruger netcdfAll- 4.2.jar (omdøbt til netcdfAll- seneste. krukke) . Denne switch nødvendiggjorde flere interne ændringer og forårsagede et par små eksterne ændringer, fx ændringer til hvordan grib filer læses og små ændringer til .nc Header output.
    * Ny funktion: \\[ erddap \\] / convert / fipscounty.html konverterer FIPS amtskoder til / fra amtnavne.
    * På kort er statsgrænser nu mørke violet, så de skiller sig bedre ud på alle baggrundsfarver.
    * Tabulær .kml output igen bruger et cirkulært ikon til at markere punkter (ikke flyikonet Google har for nylig skiftet til) .
    * ErdCalcofi datasættene blev omorganiseret og er nu serveret fra lokale filer (hurtigere) .
    * GenerateDataset Xml fra Thredder Katalog nu opretter en resultatfil:
         \\[ tomcat \\] / webapps / erddap / WEB- INF / temp / EDDGrid FromThreddsCatalog.xml. Takket være Kevin O 'Brien.
    * GenerateDataset Xml fra Thredder Katalog nu forsøger at fjerne unødvendige portnumre fra kilden URL 'er (f.eks.: 8080 og: 8081 kan undertiden fjernes) . Takket være NOAA Central 's sikkerhedshold.
    * For delsæt websider har kortet over Distinct Data nu et variabelt interval.
    * Flere lister i ERDDAP™   (f.eks. tabellen, der viser alle datasæt) blev sorteret, så A.. Z sorteret før a. .z . Nu sortere de i en sag-ufølsom måde.
    * Små ændringer af websiderne.
    * GenerateDataset Xml og DasDds ikke længere smide en undtagelse, hvis de ikke kan sætte resultaterne på systemets udklipsholder eller displayInBrowser. Takket være Eric Bridger og Greg Williams.
    * Fejlfiks: Når datasæt er indlæst, ERDDAP™ nu fjerner eller justerer de geospatiale globale attributter. Takket være Charles Carleton.
    * Fejlfix: String2.getClassPath () nu korrekt afkode klassen Sti (især på Windows viste mellemrum i filnavnet sig som% 20) . Dette påvirkede ERDDAP™ EDStatic kalder SSR.getContextDirectory () og finde indhold / erddap. Takket være Abe Coughlin.
    * Fejl fix: i EDDTableFromFiles relateret til getDataForDapQuery håndtering af forskellige () anmodninger. Takket være Eric Bridger.
    * Fejlfiks: tabledap anmodninger ikke korrekt håndtere højde begrænsninger, når datasættets højde MetersPerSourceUnit var -1. Takket være Eric Bridger.
    * Fejlfiks: EDDTableFrom... Filer datasæt nu korrekt håndtere anmodninger, som omfatter = NaN og&#33; = NaN.
    
## Version 1.28{#version-128} 
 (udgivet 2010- 08- 27) 

*    **Nye funktioner:** Ingen.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** Ingen.
*    **Fejlretter:** Fix en programfejl (kun i ver 1.26) der gjorde ERDDAP™ Meget langsomt.
     

## Version 1.26{#version-126} 
 (udgivet 2010- 08- 25) 

*    **Nye funktioner:** Ingen.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** 
    * Fra din \\[ tomcat \\] / content / erddap / setup.xml
        * I&lt;legal &gt;, på en ny linje nedenfor \\[ standard Datalicenser \\] , insert \\[ StandardKontakt \\] . \\[ StandardKontakt \\] der henviser til&lt;adminEmail &gt; angivet højere op i setup.xml.
        * Fjern&lt;tableto BGColor &gt; og&lt;tableHighlightBGColor &gt;.
        * Anbefalet: Ændring&lt;endBodyHtml &gt; til
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

    * Krævet: Til din \\[ tomcat \\] / content / erddap / images / erddap.css and erddapAlt.css, add nedefra:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Fejlrettelser og små ændringer:** 
    
    * Fejl fix: i nogle situationer, formularer virkede ikke i nogle versioner af Internet Explorer. Mange tak til Greg Williams.
    * Fejlfiks: Knapperne Make A Graph virkede ikke hvis datasættet var fra en fjernbetjening ERDDAP .
    * Fejlfiks: WMS Nogle gange virkede det ikke, hvis datasættet var fra en fjernbetjening ERDDAP .
    * Mange små ændringer og fejlrettelser.
    

## Version 1.24{#version-124} 
 (udgivet 2010- 08- 06) 

*    **Nye funktioner:** 
    * Ny [Undersæt websider](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) bruge facetslebet søgning til at vælge delsæt af tabeldatasæt. Takket være POST.
    * Ny [Avanceret søgning](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) kombinerer alle de andre søgemuligheder og tilføjer længdegrad, breddegrad og tid bounding kasser. Takket være Ellyn Montgomery. (Undskyld forsinkelsen.) 
    * Ny [Konverter tid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) Webside og service lader dig konvertere numeriske tidspunkter til / fra ISO strengetider.
    * Ny [Konverter Enheder](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) Webside og service lader dig konvertere UDUNITS til / fra UCM- enheder. Takket være NOAA IOOS SOS .
    * Hvis tabledap request include & unit ("UCUM") , enheden navne vil blive konverteret fra oprindelige navne (som regel UDUNITS ) til [UCUM](https://unitsofmeasure.org/ucum.html) enheder navne. Dette påvirker kun enheder\\*navne\\*, ikke dataværdier. Takket være NOAA IOOS SOS .
    * Forbedringer til at gøre en graf websider og grafer og kort:
        * Hvis grafen er et kort, er der nye Make A Graph knapper til at zoome ind / ud og en ny mulighed for at klikke for at ændre kortets midterpunkt. Takket være POST.
        * Filtrér indstillinger tilføjet nær bunden. Takket være Greg Williams.
        * De indbyggede kystbaserede datafiler blev opdateret til GSHHS v2.0. Takket være POST.
        * Kort omfatter nu søer og floder. Takket være POST. (Beklager, Sacramento floden Delta mangler fordi hverken kystlinien data eller sø / flod datasæt beskæftiger sig med det.) 
        * De indbyggede pscoast- afledt nation / stat filer blev opdateret. Takket være POST.
        * Topographi.cpt blev ændret en smule. (Undskyld, hvis det påvirker dig.) Takket være POST.
        * I Griddap 's Make A Graph, hvis en bruger ændrer en variabel, formularen er automatisk genindsendt, så axisVariable s 'showStartAndStop afspejler altid grafvariablerne. Takket være Joaquin Trinanes.
        * For png og pdf-billedURL 'er:
            * Ny & .land = _ value _, hvor _ value _ kan være "under" (Vis topografi) eller "over" (bare vise bathymetri) . Hvis ikke angivet, sættes standarden af [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask) er datasets.xml eller setup.xml. Takket være POST.
            * Ny: linjer i legenden, der er for lang, er automatisk brudt ind i flere linjer. Takket være POST.
        * For png-billedURL 'er:
            * Ny & .legende = _ value _, hvor _ value _ kan være "bunden" (standard) "fra" eller "kun". Dette lader dig inkludere legenden, udelukke legenden, eller få kun legenden. Takket være Cara Wilson.
            * Ny & .trim = _ n Pixels _ leaves a border of nPixels (f.eks. 10) i bunden af billedet. Det anvendes efter .legende = Off. Takket være Cara Wilson.
            * Ny & .size = _ bredde _ | _ højde _ lader dig angive bredde og højde for billedet, i pixels.
    * Nye output-filformater:
        * .csvp og .tsv p -- like .csv and .tsv med " (_ enheder _) "Bilag til kolonne navne på første linje.
        * .odvTxt -- gør en .txt fil, der forenkler at få data ind [Havdata Vis (ODV) ](https://odv.awi.de/) .
        * .esriCsv -- gør en .csv fil egnet til import i ESRI 's ArcGIS . (kun tabeldatasæt) Takket være Jan Mason, Jeff de La Beaujardiere, og NOAA IOOS SOS projekt.
    * GUI forbedringer af [Kategoriser](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) websider. Også kategorisere værdier (andre end institution) er nu alle små. Anmodninger fra andre lande accepteres (omdirigeret) for baglæns kompatibilitet. Takket være Roy Mendelssohn.
    * Fejlmeddelelser er nu endnu kortere og mere orienteret mod brugerne. Takket være Greg Williams.
    * En intern ændring, som i høj grad reducerer ERDDAP 's base memory use.
    * Mange nye funktioner, som kun er relevante for POST-projektet.
*    **Ting ERDDAP™ Administratorer har brug for at vide og gøre:** Der er mange ændringer. Undskyld. Men hver eneste giver nogle gode fordele.
    * Store ændringer i GenerateDatasetXml -- det stiller nu ofte flere spørgsmål (se det relevante [dataset Typer](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) oplysninger) og nu altid genererer hovedsagelig ready- to- use indhold til datasets.xml . Du er stadig ansvarlig for opsætningen, så du bør stadig gennemgå datasets.xml indhold, før du bruger det. En menneskelig indsats i projektet vil altid gøre bedre end et computerprogram. Takket være UAF-projektet.
    * KRÆVET: I setup.xml skal du revidere WMS afsnit. Det bør nu omfatte disse tags (men du er velkommen til at ændre værdierne) :
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

    * KRÆVET: I setup.xml, kopiere og indsætte denne nye foreslået&lt;startHeadHtml &gt; for at erstatte din gamle version. Men du er velkommen til at foretage ændringer for dine præferencer.
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

Takket være POST, Hans Vedo og Rick Blair.
    * PÅKRÆVET: I setup.xml, i&lt;startBodyHtml &gt;, skift til&lt;body &gt; tag til at være bare&lt;body &gt;, da stilen nu er indstillet af erddap.css.
    * KRÆVET: i setup.xml, ændre til dette&lt;endBodyHtml &gt; (men ændre e-mailadressen til din e-mailadresse og du er velkommen til at foretage andre ændringer) :
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

    * HØJT ANBEFALET: I setup.xml, den anbefalede&lt;The ShortDescriptionHtml &gt; er nu
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

Det kan du godt ændre, især den sidste sætning i første afsnit.
    * I setup.xml, emailEverythingTo og emailDailyReport Til nu kan være kommaseparerede lister over e-mailadresser. Den første e- mail- Alt For er særlige, fx abonnementer på EDDXxxxFromErddap datasæt bruge denne e-mail-adresse. Takket være John Maurer.
    * Email fejl er nu logget til \\[ Big ParentDirectory \\] / logs / emailLogц- MM- DD.txt fil.
    * I setup.xml, er der en ny, valgfri parameter til at indstille e-mail-konto egenskaber (normalt lige efter&lt;emailPassword &gt;):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Standard er ingenting. Takket være Rich Signell.
    * KRÆVET: Hvis du bruger EDDTableCopy eller EDDGrid Kopi, du skal DELETE alle \\[ Big ParentDirectory \\] / copy / directories and files that containing "xh" in the directory or filnavne after stop the old ERDDAP™ og før du starter den nye ERDDAP™ Så disse filer vil blive kopieret igen. Jeg er meget ked af det, men det var vigtigt at foretage ændringen og forhåbentlig det påvirker få administratorer og få filer.
I Linux kan du finde disse filer med, cd \\[ Big ParentDirectory \\] / kopi
Find.\\*xh\\*  
I Windows, kan du finde disse filer med, Start | Søg
Hvad vil du søge efter: Dokumenter
Hele eller en del af filnavnet: xh
Kig i: Gennemse - &gt; \\[ Big ParentDirectory \\] / kopi
Klik på 'Søgning'
^ A at vælge dem alle
Del at slette dem alle
    * I datasets.xml , for EDDTableFromDatabase datasæt, for dato og tidsstempel variabler, ændre data Type til dobbelt og enheder til sekunder siden 1970-01-01T00: 00: 00Z. Vi kræver, at du gemmer tidsstempel data i databasen\\*med\\*en tidszone. Uden tidszone oplysninger, de forespørgsler, ERDDAP™ sender til databasen og de resultater, som ERDDAP™ get fra databasen via JDBC er tvetydige og er sandsynligvis forkert. Vi prøvede, men fandt ingen pålidelig måde at håndtere "tidsstempel uden tidszone" data. Vi synes alligevel, det er god praksis. Efter alt, "tidsstempel uden tidszone" data har en implicit tidszone. Mens det er fantastisk, at tidszonen er indlysende for databasen admin, det giver mening at angive det eksplicit, så andre software kan korrekt interagere med din database. Tak / undskyld Michael Urzen.
    * HØJT HENSTILLET: datasets.xml , for at aktivere .subset websider til facetteret søgning af dine tabeldatasæt, skal du tilføje [&lt; subsetVariables &gt;] (/ docs / server- admin / datasæt # subsetvariable) til datasættets globale attributter.
    * HENSTILLET: datasets.xml , hvis du har datasættet med datasetID = "pmelGtsppp", skal du ændre det at være
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * HENSTILLET: datasets.xml , der er nye gyldige muligheder for [&lt;cdm\\ _ data\\ _ type & gt;] (/ docs / server- admin / datasæt # cdm _ data _ type) global attribut, så du bør gennemgå / ændre værdien for dine datasæt.
    * I datasets.xml , den nye [&lt;sourceNeedsExpandedFP\\ _ EQ & gt;] (/ docs / server- admin / datasets # sourceneeds extendedfp _ eq) er nyttigt hvis kildeserveren ikke konsekvent håndterer & _ variable _\\ = _ value _ tests korrekt (på grund af [generelle vanskeligheder ved at teste ligheden af flydende punkt numre](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) . sourceNeedsExpandedFP\\ _ EQ er sat til true som standard (den sikreste indstilling) så du behøver ikke at lave ændringer.
    * Ny [EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) . Takket være Jerry Yun Pan.
    * Ny [EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Takket være Roy Mendelssohn.
    * Ændringer til [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) lader det bruges med en bredere vifte af filer.
    * EDDTableFromBMDE er blevet deaktiveret. Der er ikke længere nogen aktive, passende datakilder.
    * I GenerateDatasetXml, den nye EDDGrid FromThredds Formand Catalog høster en hel THREDDS katalog (eller en delmængde) og genererer datasets.xml indhold. Takket være UAF-projektet.
    * GenerateDataset Xml og DasDds nu også sætte deres resultater i \\[ Big ParentDirectory \\] / logs / log.txt. Takket være Rich Signell og Charles Carleton.
    * Mange forbedringer af login-systemet. Takket være POST.
*    **Ting ERDDAP™ Programmer Behov for at vide og gøre:** 
    * Der har været ændringer i / WEB- INF / lib / mappen. Du bedes ændre dine javac og java klassesti indstillinger i overensstemmelse hermed.
    * Der er en ny \\[ er Url \\] / erddap / versionstjeneste til bestemmelse af versionen af en ERDDAP . Svaret er tekst, f.eks.: ERDDAP \\ _ version = 1.24 Hvis du får en HTTP 404 Not- Fundet fejlmeddelelse, behandle ERDDAP™ som version 1.22 eller lavere. Takket være POST.
*    **Små ændringer og fejlrettelser:** 
    
    * EDDTableFrom Sos ændringer:
        * Droppet understøttelse til læsning af IOOS SOS XML- svar.
        * Tilføjet understøttelse til læsning af IOOS SOS tekst / csv. (Så NOS SOS servere er i øjeblikket ikke understøttet.) 
        * Lavede masser af ændringer relateret til IOOS SOS serverdetaljer.
        * Tilføjet støtte til BBOX forespørgsler til IOOS SOS og OOSTethys   SOS servere. Disse ændringer resulterer i en stor hastighed op for relevante dataanmodninger. Takket være IOOS SOS .
    * Tekst i .mat tabeldatafiler gemmes nu korrekt. Takket være Roy Mendelssohn.
    *    WMS 
        *    OpenLayers er nu bundtet med ERDDAP™ til brug på WMS websider. Dette løser problemet forårsaget, når OpenLayers er blevet ændret for et par måneder siden og forhindrer fremtidige problemer.
        * I WMS   GetCapabilities EU 's politik&lt;OnlineResource &gt; værdien er nu URL 'en for WMS service. Takket være Charlton Galvarino.
        * En legende vises på WMS Webside til at vise colorbar. Takket være Emilio Mayorga.
    *    EDDGrid AggregateExistingDimension constructor havde problemer, hvis en akse 'kilde Værdier var ikke lig med deres destination Værdier, f.eks. hvis kildetid var noget andet end "seconds since 1970-01-01" . Takket være Todd Spindler.
    * I TableWitherGeoJson, den overskydende ',' efter bbox \\[ ... \\] er blevet fjernet. Takket være Greg Williams.
    * Mange små ændringer og fejlrettelser.
    
## Version 1.22{#version-122} 
 (udgivet 2009- 07- 05) 

* The SlideSorter bug indført i 1.20 er rettet.
* OBIS-fejlen indført i 1.20 er rettet.
* Henvisningerne til Jason datasæt på billederne / gadgets / GoogleGadgets side blev fjernet.
     
## Version 1.20{#version-120} 
 (udgivet 2009- 07- 02) 

*    ERDDAP™ administratorer, skal du tilføje dette til din setup.xml fil:
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

* Nye datasæt [ EDDGrid Kopiér](/docs/server-admin/datasets#eddgridcopy) og [EDDTableCopy](/docs/server-admin/datasets#eddtablecopy) lave og vedligeholde en lokal kopi af en anden EDDGrid eller EDDTable datasæt og servere data fra den lokale kopi. Disse er meget nemme at bruge og meget effektive **løsninger på nogle af de største problemer med at servere data fra eksterne datakilder:** 
    
    * Adgang til data fra en ekstern datakilde kan være langsom (af forskellige grunde) .
    * Det eksterne datasæt er undertiden utilgængelige (på ny af forskellige grunde) .
    * At stole på en kilde til data ikke skalere godt (f.eks. når mange brugere og mange ERDDAP s udnytte det) .
    
Plus, den lokale kopi er en backup af den originale, hvilket er nyttigt i tilfælde af at der sker noget med den originale.
    
Der er ikke noget nyt ved at lave en lokal kopi af et datasæt. Det nye her er, at disse klasser gør det\\*let\\*til at skabe og\\*vedligeholde\\*en lokal kopi af data fra en\\*sort\\*om typer af fjerndatakilder og\\*Tilføj metadata\\*mens du kopierer data.
    
Disse datasæt er en del af et komplet sæt af funktioner, der forenkler oprettelsen af [net / klynger / sammenslutninger af ERDDAP s](/docs/server-admin/scaling) til håndtering af meget tunge byrder (f.eks. i et datacenter) .
    
* Ny datatype [EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase) får data fra en lokal eller ekstern database tabel.
*    ERDDAP™ har nu en [sikkerhed](/docs/server-admin/additional-information#security) system, der understøtter autentificering (at lade brugerne logge ind) og tilladelse (om at give dem adgang til visse private datasæt) .
* Der er [to, nye kommandolinjeværktøjer](/docs/server-admin/datasets#tools) til at hjælpe ERDDAP™ administratorer generere XML for et nyt datasæt i datasets.xml :
    * GenerateDataset Xml kan generere et groft udkast af datasættet XML for næsten enhver type datasæt.
    * DasDds hjælper dig gentagne gange teste og forfine XML for et datasæt. ERDDAP Generatedataset Xml websider er blevet fjernet. Af sikkerhedsgrunde støttede de kun nogle få datatyper. De nye kommandolinjeværktøjer er en bedre løsning.
* Det nye [statusside](/docs/server-admin/additional-information#status-page) lader alle (men især administratorer) se status for en ERDDAP™ fra enhver browser ved at gå til \\[ baseUrl \\]  /erddap/status.html .
* Tabledap understøtter nu [server- sidefunktioner](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) :
    * & separat () fjerner dublerede rækker fra svartabellen
    * & orderBy  (...) kan du angive, hvordan svartabellen skal sorteres,
    * & orderByMax  (...) kan du angive, hvordan responstabellen skal sorteres og fjerner alle rækker undtagen rækker med de maksimale værdier i den sidst angivne kolonne. Dette kan f.eks. bruges til at få de sidste tilgængelige data for hver station.
* Tabulære datasæt kan nu omfatte yderligere dateTime variabler, som ikke er navngivet "time" . Disse variabler er genkendt af deres "enheder" metadata, som skal indeholde " since "   (for numerisk dato Tider) eller "åå" eller "Ø" (til formateret streng dateTimes) . Men brug venligst stadig destinationName   "time" for hoveddatoen Tidsvariabel.
*    ERDDAP™ nu genererer en [sitemap.xml](/docs/server-admin/additional-information#sitemapxml) fil, som fortæller søgemaskiner, at din ERDDAP skal kun krybes hver måned. ERDDAP™ Administratorer, følg venligst [disse instruktioner](/docs/server-admin/additional-information#sitemapxml) at underrette søgemaskinerne om den nye sitemap.xml fil.
*    ERDDAP 's fejlmeddelelser er nu meget kortere og rettet mod kunder (Ikke programmører) . Takket være Greg Williams.
* [&lt;ANMODNING Blacklist &gt;] (/ docs / server- admin / datasæt # requestblacklist) nu også understøtter IP-adresser, hvor det sidste nummer er blevet erstattet af\\ *.
* Anmodninger .json og .geoJson filer kan nu omfatte en valgfri [jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) anmodning ved at tilføje "& .json p = _ functionName _ "til slutningen af forespørgslen. Dybest set, dette bare fortæller ERDDAP™ at tilføje "_ functionName _ ("til begyndelsen af reaktionen og") "til slutningen af svaret. Hvis der oprindeligt ikke var nogen forespørgsel, så efterlad" & "i din forespørgsel. Takket være Greg Williams.
* Mange nye statistikker blev føjet til [Daglig rapport](/docs/server-admin/additional-information#daily-report) .
* På websider med datasets er institution og id nu længst til højre. Dette flytter abonnement og andre mere nyttige kolonner i visning på smalle computerskærme.
* På alle websider, sidens titel (baseret på&lt;titel &gt; i&lt;startHeadHtml &gt; som du definerer i setup.xml) ændres til at indeholde en bedre beskrivelse af websiden (f.eks. ved at medtage det nuværende datasets titel og institution) .
* Xmx information er nu inkluderet med hukommelsen oplysninger trykt i log.txt, Daily Report, og om status.html. Takket være Ellyn Montgomery.
*    ERDDAP™ har yderligere generel beskyttelse mod alle fejl (F.eks, OutOfMemoryError) . Takket være Charles Carleton.
* Forbedringer af fejlhåndtering, hvis svaret allerede er indgået.
* FORBEDRING: EDDTableFromFiles og EDDGrid FromFiles nu bare tillade&lt;metadataFrom &gt; første eller sidste. næstsidste er ikke længere understøttet. Og først og sidst er nu baseret på filernes sidste ændrede tid.
* Fejlfiks: i EDDTableFrom SOS , ugyldig info for en station kastede en undtagelse og fik hele datasættet til at blive afvist. De stationer ignoreres bare. (og fejlmeddelelsen er logget på log.txt) . Takket være Rick Blair.
     

## Version 1.18{#version-118} 
 (udgivet 2009- 04- 08) 

* Fejl fix: Start i 1.14, EDDTable Data Access Form og gøre en graf webside ikke ordentligt håndtere citerede begrænsninger.
* Fejl fix: fra 1.14, EDDTableFromDapSequence ikke håndtere tidspres korrekt, hvis kilden tidsenheder var "sekunder siden 1970- 01- 01T00: 00: 00".
     

## Version 1.16{#version-116} 
 (udgivet 2009- 03- 26) 

*    ERDDAP™ administratorer:
    * Dette er en vigtig udgivelse, fordi det løser en fejl, der forlod en ERDDAP™ tråd kører, hvis du brugte Tomcat Manager til at stoppe / starte eller genlade ERDDAP . Så når du installerer 1.16, ikke bare bruge Tomcat manager til at afinstallere den gamle ERDDAP™ og implementere den nye ERDDAP . I stedet: **fravælg den gamle ERDDAP™ , genstart Tomcat (eller serveren) , derefter implementere den nye ERDDAP .** Det er altid en god idé at gøre det, når man installerer en ny version.
    * Tilføj [&lt;Request Blacklist &gt;&lt;/ request Blacklist &gt;] (/ docs / server- admin / datasæt # requestblacklist) til Deres datasets.xml . Dette kan bruges til at angive en liste over klient- IP-adresser der skal blokeres (f.eks. at afværge et angreb fra tjenesten eller en alt for nidkær web robot) .
* Der er nu en \\[ Big ParentDirectory \\] / log- mappe til at holde ERDDAP™ logfiler. Når du starter ERDDAP™ , det gør en arkivkopi af log.txt og log. txt.tidligere filer med et tidsstempel. Hvis der var problemer før genstart, kan det være nyttigt at analysere disse filer.
*    ERD 's ERDDAP™ nu har abonnementssystemet tændt.
*    ERDDAP™ igen tillader (men stadig ikke anbefale) "% 26" indkodning af "&" i webadresser (se [relateret ændring i v1.14](#percent26) ) .
* Flere nye tilføjelser til Tally-sektionen i [Daglig rapport](/docs/server-admin/additional-information#daily-report) .
* Små fejlrettelser i generateDatasetsXml.
* Et par små fejlrettelser.
     

## Version 1.14{#version-114} 
 (udgivet 2009- 03- 17) 

* Ændringer for brugere:
    * I netdataanmodninger ERDDAP™ støtter nu: [last- n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) hvor n er et heltal af indeks og [ (last- d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) hvor d er en numerisk værdi (til tiden, det er i sekunder) .
    * I tabeldata anmodninger, String begrænsninger nu kræver [dobbelte citater](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) omkring værdien, for eksempel, & id = "NDBC40121" Dette er påkrævet af DAP protokol.
    * I tabeldata anmodninger, ERDDAP™ nu kræver, at [alle begrænsninger være korrekt procent kodet](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) . Browsere gør dette automatisk, så det meste påvirker computerprogrammer / scripts, der er adgang ERDDAP .
#### Procent 26{#percent26} 
*    [Tidligere:](#percent26) i [med en graf webside](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) og [ ERDDAP™ Google Gadget webside](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) sagde at erstatte "&" i billedets URL med "% 26". Fra nu af skal du erstatte "&" i billedets URL med "& amp;". Så du skal erstatte "% 26" i eksisterende websider og Google Gadgets med "& amp;". (Undskyld.) 
*    ERDDAP™ Administratorer, tak:
    * Tilføj følgende til din [setup.xml](/docs/server-admin/deploy-install#setupxml) fil (og ændre flag Nøglenøgleværdi) :
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

    * På linjen efter&lt;emailUserName &gt; i din [setup.xml](/docs/server-admin/deploy-install#setupxml) file, add
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
og indtast din rigtige adgangskode.
    * Du kan ændre&lt;wmsSampleBBox &gt; i Deres [setup.xml](/docs/server-admin/deploy-install#setupxml) fil med længdeværdier op til 360, f.eks.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * I datasets.xml fil, omdøb datasættet type EDDTableFromNc4DFiles til EDDTableFromNcFiles (som nu understøtter filer med et antal dimensioner) . Hvis du havde en EDDTableFromNc4DFiles datasæt:
        
        1. Du SKAL skifte til type = "EDDTableFromNcFiles" i dine datasæt. XML- fil.
        2. Du skal tilføje en&lt;nDimensioner &gt; 4&lt;/ nDimensions &gt; tag til datasættets XML.
        3. Du kan tilføje den nye&lt;sortFilesBySourceNames &gt; tag for at angive den interne rækkefølge for filerne, som bestemmer den samlede rækkefølge for de returnerede data.
        
For yderligere oplysninger, se [EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles) .
    * Tidligere, for EDDTableFromDapSequence, for OPeNDAP DRDS-servere datasets.xml , vi brugte&lt;sourceCanConstrainStringsRegex &gt; ~ =&lt;/ sourceCanConstrainStringRegex &gt;. Men vi ser nu, at DRDS regex-støtten er mere begrænset end ERDDAP 's, så vi anbefaler&lt;sourceCanConstrainStringsRegex &gt;&lt;/ sourceCanConstrainStringRegex &gt; så regex begrænsninger ikke videregives til kilden, men i stedet håndteres af ERDDAP .
    * Fornyet håndtering af sourceCanConstrese... er datasets.xml ved [EDDTableFromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence) og (Indvendigt) alle EDDTabeldatatyper. Det nye system er enklere og bedre afspejler variabiliteten af forskellige datakilder. Du kan være nødt til at ændre XML for dine datasæt i datasets.xml .
* Der er flere nye funktioner, som er nyttige af sig selv, men når kombineret, også lette oprettelsen af [net / klynger / sammenslutninger af ERDDAP s](/docs/server-admin/additional-information#grids-clusters-and-federations) .
    * Nye datasæt:
        *    [ EDDGrid FromErddap Formand](/docs/server-admin/datasets#eddfromerddap) og [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) som lader en ERDDAP™ omfatte et datasæt fra en anden ERDDAP™ på en meget enkel og meget effektiv måde.
        *    [ EDDGrid FromFiles](/docs/server-admin/datasets#eddgridfromfiles)   (og underklasse [ EDDGrid FromNcFiles](/docs/server-admin/datasets#eddgridfromncfiles) som kan læse NetCDF   .nc , GRIB .grb, og HDF   .hdf filer) .
        *    [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) som kan læse NetCDF   .nc som har en bordlignende struktur.
    * RunLoadDataset og LoadDataset blev moderniseret, så ERDDAP™ er meget lydhør over for at genindlæse datasæt baseret på filer i [flag](/docs/server-admin/additional-information#flag) mappe (ofte&lt;5 sekunder, hvis hovedlæsset Datasættene er i øjeblikket gjort).
    * Ny tjeneste at tillade [en URL til at oprette en flagfil](/docs/server-admin/additional-information#set-dataset-flag) for et givet datasæt, f.eks.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
opretter en flagfil i flagmappen for rPmelTao (om end flaget Nøglen her er forkert) .
    * Ny [abonnement](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) service, så enhver klient kan angive en handling, der vil blive gjort, når et bestemt datasæt oprettes (når ERDDAP™ er genstartet) og når datasættet ændres på nogen måde. Dette system kan deaktiveres via&lt;abonnentSystemAktiv &gt; i din [setup.xml](/docs/server-admin/deploy-install#setupxml) fil. EU ERDDAP™   [Daglig rapport](/docs/server-admin/additional-information#daily-report) nu lister alle abonnementer og indeholder den URL, der er nødvendig for at annullere hver enkelt, hvis du føler, at systemet bliver misbrugt. I datasets.xml , der er en ny, valgfri [&lt;abonnement EmailBlacklist &gt;] (/ docs / server- admin / datasæt # abonnentemailblacklist) tag, så administratorer kan angive en kommaadskilt liste over e-mail-adresser, som straks sortlistet fra abonnementssystemet.
    * Ny [&lt;onChange &gt;] (/ docs / server- admin / datasæt # onchange) attribut in datasets.xml Lad os ERDDAP™ administrator angiver en handling, som vil blive gjort, når et specifikt datasæt oprettes (når ERDDAP™ er genstartet) og når datasættet ændres på nogen måde.
    * Forbedringer til fuld tekstsøgning: Lagring af søgestrengen for hvert datasæt bruger nu 1 / 2 af hukommelsen. Søgealgoritmen (Boyer- Moore-like) er nu 3X hurtigere.
    * E- mail fra ERDDAP™ nu altid bruge emnet og indholdet med \\[ erddap Url \\] , så det vil være klart, hvilke ERDDAP™ dette kom fra (i tilfælde af at De injicerer flere ERDDAP s) .
    * Mere omfattende statistik indsamling for [Daglig rapport](/docs/server-admin/additional-information#daily-report) email.
    * Ny logfil \\[ Big ParentDirectory \\] / emailLogYEAR- MM- DD.txt logger alle e-mails sendt af ERDDAP™ hver dag. Dette er især nyttigt, hvis din server faktisk ikke kan sende e-mails -- du kan i det mindste læse dem i loggen.
    *    ERDDAP™ nu gør en \\[ Big ParentDirectory \\] / cache / ( datasetID ) mappe for hvert datasæt, da der kan være masser af filer cachet.
* Ny [ RSS 2, 01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) foder til hvert datasæt (Kig efter orange RSS ikoner på lister over datasæt, dataadgangsformularer og lave en graf websider) .
*    EDDGrid   .kml svar bruger nu flisebilleder ("Superoverloys" -- dynamisk genererede quadtree billeder) . Det oprindelige billede indlæses i GoogleEarth meget hurtigere end før. Opløsningen af kortet stiger, når du zoomer ind, op til den fulde opløsning af datasættet. Anbefaling: Brugerne skal anmode .kml på et tidspunkt, men datasættets længde, breddegrad. Desværre blev støtte til tidsintervaller fjernet (Jeg håber, den kommer tilbage.) .
*    ERDDAP™ nu tilføjer [Udløber og Cache- Control max- age headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) til alle filer ønsket fra / image- mappen. Dette reducerer i høj grad antallet af statiske fil anmodninger sendt til ERDDAP og dermed i høj grad fremskynde de fleste ERDDAP™ side belastninger. Også, mange Java Script fil referencer flyttet til bunden af deres HTML-sider, som også fremskynder mange ERDDAP™ side belastninger. Takket være bogen "High Performance Web Sites" af Steve Souders og YSlow tilføjelse til FireBug plugin i FireFox.
*    ERDDAP™ skiftede fra netcdf- java 2.2.22 til netcdf- java 4.0. Blandt andet tillader dette EDDGrid FromNcFiles at læse HDF   .hdf , samt GRIB. Grb og NetCDF   .nc filer.
*    EDDGrid FromDap og EDDGrid FromNcFiles understøtter nu også DArray (samt DGrid)   dataVariable a. Hvis en dimension ikke har en tilsvarende koordinatvariabel, ERDDAP™ opretter en aksevariabel med indeksværdierne (f.eks. 0, 1, 2,..., 311, 312) . Så alle andre aspekter af EDDGrid forblive det samme:
\\ * Det stadig tjener alle datasæt som Grids, med en akse variabel for hver dimension.
\\ * Forespørgsler kan stadig anmode om værdier fra akserne variabler.
Takket være Charles Carleton, Thomas Im, Dorian Raymer og andre.
* EU WMS   OpenLayers sider har nu en standard længde, breddegrad område, der er lidt større end datasættets område (ikke det nøjagtige område, så sammenhængen mellem små datasæt er mere indlysende) . Standard området kan nu også være 0 til 360, hvilket gør det muligt at vise hele spektret af mange datasæt nu. Takket være Todd Spindler.
* Nye skydere på nogle Data Access Forms og gøre en graf websider. De forenkler (Rå varer) specifikation af de ønskede data og tilbyde god visuel feedback.
* En ny mulighed for&lt;dataset &gt; tags datasets.xml : [aktiv = "false"](/docs/server-admin/datasets#active) .
* Referencer til ERD 's ERDDAP™ ændret fra coast watch.pfel (virker stadig via proxy) til coast watch.pfeg (foretrækkes) .
* Ny støtte til [ data\\_min og data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) variable metadataattributter.
* En delvis opløsning til [WaitThenTryAgain / Delvise resultater undtagelse](/docs/server-admin/additional-information#waitthentryagain-exception) : Nu, nogle anmodninger, der tidligere mislykkedes, når en datakilde ændring blev opdaget vil lykkes, fordi ERDDAP™ vil genindlæse datasættet og genanmode om dataene automatisk, alle i forbindelse med den oprindelige anmodning.
* Fejlfiks: generér Datasæt Xml blev deaktiveret i ERDDAP™ version 1.12. Tak til Ellyn Montgomery for at påpege dette.
* Små ændringer af fejlhåndtering.
* Mange forbedringer for at undgå / håndtere mulige raceforhold (Det betyder, at eventuelle problemer, der opstår som følge af flertrådet ERDDAP ) som forårsagede små, sjældne problemer.
* Hvis en fejlmeddelelse er skrevet på et billede, vil billedet kun blive i cachen i ~ 5- 10 minutter (ikke 60) . Takket være Cara Wilson.
* Standardmeddelelsen når der ikke er nogen data er nu "Din forespørgsel produceret ingen matchende resultater"., som er kortere, mere præcis, og matcher OPeNDAP servere.
*    EDDGrid ikke længere tillader bundne akseværdier.
* Små ændringer til .ver og .help anmodninger.
* Mange små ændringer og fejlrettelser.
     

## Version 1.12{#version-112} 
 (udgivet 2008- 10- 31) 

* EDDTableFrom SOS igen arbejder med NDBC SOS og arbejder med det nye NOS SOS .
* EDDTableFromBMDE kræver nu ERDDAP™ admin at specificere dataVariable a.
*    EDDGrid ikke længere kræver, at lat og ere jævnt fordelt. transparent Png eller .kml . Takket være Todd Spindler.
* Et par små ændringer.
     

## Version 1.10{#version-110} 
 (udgivet 2008- 10- 14) 

* Nye "colorBar" metadata for datavariabler i datasets.xml definerer standardfarvelinjeindstillinger for grafer og kort. Se [mere information](/docs/server-admin/datasets#color-bar-attributes) . Dette er vigtigt, fordi det i høj grad forbedrer udseendet af standard grafer og kort produceret af Make A Graph, og fordi standard grafer og kort nu har en ensartet farve bar, selv når klienten ændrer den ønskede tid eller geografiske område. Det var også nødvendigt for WMS .
*    ERDDAP™ nu tjener de fleste gitter data via en WMS service. Dette er vigtigt, fordi det viser, at ud over at få data fra mange typer af dataservere, ERDDAP™ kan distribuere data via forskellige protokoller ( DAP , WMS ... mere i fremtiden) . Se [kundedokumentation](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) . Eller [dokumentation for administratorer](/docs/server-admin/datasets#wms) . Eller [Prøv det.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) .
* Ny støtte til længdeværdier &gt; 180 in .kml filer.
* Ny CDM\\ _ data\\ _ type: andet.
*    ERDDAP™ nu understøtter "boolesk" kilde dataType. Se [mere information](/docs/server-admin/datasets#boolean-data) Dette vil blive nyttigt for den fremtidige EDDTableFromDatabase.
* Ny EDDTableFromBMDE understøtter DiGIR / BMDE datakilder.
* EDVGridaxis tillader nu faldende sorterede værdier. PmelOscar datasets havde brug for dette.
*    ERDDAP™ nu returnerer HTTP fejl (f.eks. "404 for ressource / side ikke fundet") i flere situationer, i stedet for HTML-sider med fejlmeddelelser.
* Mange ændringer / tilføjelser til ERDDAP™ dokumentation.
* Mange små forandringer.
* Nogle fejlrettelser.
*    **Ting ERDDAP™ administratorer skal gøre for at opgradere til denne version:** 
    * I datasets.xml , for enhver EDDTableFrom SOS datasæt, ændre "observedProperty" metadata til "sourceObservedProperty".
    * Reglerne for axisVariable eller dataVariable 's destinationName er nu [strengere](/docs/server-admin/datasets#datavariable-addattributes) . Du skal kontrollere, at dine variable navne er gyldige. Enten tjekke dem i hånden, eller køre ERDDAP™ og se på fejlmeddelelserne i rapporten, der sendes til administratoren.
    * I datasets.xml , hvis du ønsker, at en netdatavariabel skal være tilgængelig via WMS , skal du tilføje colorBar metadata. I det mindste&lt;att navn = " colorBarMinimum "type =" dobbelt "&gt; 0&lt;/ att &gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Se [mere information](/docs/server-admin/datasets#wms) .
    * Tilføj følgende til din [setup.xml](/docs/server-admin/deploy-install#setupxml) fil (men tilpasse det med dine oplysninger) :

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
 (udgivet 2008- 07- 13) 

* En ny webtjeneste i ERDDAP™ , generér Datasæt Xml, assists ERDDAP™ administratorer ved at oprette et groft udkast til XML nødvendig for at beskrive et datasæt i datasets.xml 
* Nogle ændringer / fejlrettelser relateret til at tillade griddap at blive set af netcdf- java som en opendap server, herunder: globale metadata er nu mærket "NC\\ _ GLOBAL" (i stedet for GLOBAL) .
* EU EDDGrid og EDDTable Data Access Forms nu bruge forespørgsel oplysninger i URL. Så, for eksempel, hvis en bruger går fra en Make A Graph form til en Data Access Form, er begrænsningerne nu korrekt overført.
*    tabledap 's Make A Graph nu tillader begrænsninger på String variabler.
* EDDTable 's Make A Graph tillader nu NAN begrænsninger. Takket være Steve Hankin.
* Fejlfiks: Gem EDDTable AsImage ikke korrekt genkende .colorbar min og max værdier. Takket være Steve Hankin
* Mange forbedringer af setupDatasetsXml. Takket være Ellyn Montgomery.
* Griddap anmodninger nu tillade () -stil anmodninger lidt uden for den faktiske akse område. Dette er passende, da () -værdierne afrundes til nærmeste faktiske værdi. Tak til Cindy Bessey
* Jeg lavede FloatArray og DoubleArray testen af isaften plads mere sofistikeret. Det vil altid være uperfekt (fordi testen skal tilpasses til hvert datasæt) Men det burde være bedre. Takket være Ellyn Montgomery.
* Jeg flyttede setup.html og setupDataset Xml.html erddap 's / download mappe og hardkodede alle links til dem. Nu kan jeg foretage ændringer og opdatere opsætningsoplysningerne med det samme.
* Mange små ændringer. Et par små fejlrettelser.
*    **Ting ERDDAP™ administratorer skal gøre for at opgradere til denne version:** 
    * Flyt&lt;ShortDescription Html &gt; fra messages.xml til [setup.xml](/docs/server-admin/deploy-install#setupxml) fil. Det angiver den tekst, der vises i midten af venstre side af ERDDAP™ Hjemmeside. Tilføj også&lt;h1 &gt; ERDDAP &lt;/ h1 &gt; (eller en anden overskrift) til toppen af det. **Eller...** kopi&lt;The ShortDescriptionHtml &gt; i den nye [setup.xml](/docs/server-admin/deploy-install#setupxml) fil (fra den nye erddapContent .zip ) ind i din setup.xml.
         

## Version 1.06{#version-106} 
 (udgivet 2008- 06- 20) 

* Ny støtte til IOOS DIF SOS datakilder.
* Mange små ændringer. Et par små fejlrettelser.
     

## Version 1.04{#version-104} 
 (udgivet 2008- 06- 10) 

* Ny Slide Sorter funktion.
* Ny Google Gadgets side og eksempler.
* Fejlfiks i EDDGrid .saveAsNc for variabel med skala og addOffset.
     

## Version 1.02{#version-102} 
 (udgivet 2008- 05- 26) 

* Ny EDDGrid SideBySide giver mulighed for forskellige axisVariable s \\[ 0 \\] kilde Værdier.
* Alle strømme og vinde datasæt blev fusioneret til EDDGrid SideBySide datasæt.
* Billeder fra billedforespørgsler er nu cached for 1 time.
     

## Version 1.00{#version-100} 
 (udgivet 2008- 05- 06) 

* Lav en graf websider og grafik kommandoer i URL 'er.
* Støtte til flag filer til at tvinge genindlæsning af et datasæt.
* Ny datasæt type: EDDTableFrom4DFiles (den første underklasse af EDDTableFromFiles) .
