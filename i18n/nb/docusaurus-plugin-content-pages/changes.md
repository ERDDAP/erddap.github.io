---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Endringer

ERDDAP™Et godt eksempel på[Brukerdrevet innovasjon](https://en.wikipedia.org/wiki/User_innovation), der produktinnovasjon ofte kommer fra forbrukere (ERDDAP™brukere) Ikke bare produsentene (ERDDAP™utviklere) .. I årenes løp har de fleste ideene til nye funksjoner og endringer iERDDAP™Har kommet fra brukerne. Disse brukerne krediteres nedenfor for sine gode ideer. Takk&#33; Vennligst hold disse gode forslagene kommer&#33;

Her er endringene som er forbundet med hverERDDAP™Frigjøring.

## Versjon 2.27.0{#version-2270} 
 (Utgitt 2025-06-?) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Nye data til colorbar converter på servere på /erddap/convert/color.html

*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Standard behavoir er at cache nå vil bli slettet uavhengig av de store belastningsdatasett oppgaven. Dette vil tillate mer pålitelig og regelmessig fjerning av gamle cache-filer. Det er ekstra arbeid for å forbedre serverbehavoir når det er lavt på diskplass (å returnere en feil for forespørsler som sannsynligvis vil få serveren til å gå tom for plass, og å rydde cache oftere under lave diskforhold for å forsøke å hindre feil) .. Idatasets.xml  (eller setup.xml) du kan legge til / angi den nye cache ClearMinutes parameter for å kontrollere hvor ofte serveren sjekker for å rydde cache. Merk at den eksisterende cacheMinutes parameteren kontrollerer alderen på filer som skal oppbevares, den nye cache ClearMinutes er for hvor ofte å gjøre en chach klar.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Du kan deaktivere den nye cache klare kontroller ved å sette oppgaveCacheClear til falsk i setup.xml, men det anbefales ikke.
cache ClearMinutes er også i[Datasetts dokumentasjon](/docs/server-admin/datasets#cacheclearminutes)..
    
    * Lokalisert metadatastøtte for datasett. Det støtter lokalisering for verdier i enaddAttributesSeksjon. Legg til en attributt med ekstra xml:lang tag. For eksempel å legge til en fransk tittel i et datasett dittaddAttributesSeksjonen inkluderer:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Ytterligere detaljer tilgjengelig i[lokalisert metadatadokumentasjon](/docs/server-admin/localized-metadata)..

    * New Docker Skriv fil med alternativer for SSL og en barebones Prometheus-server. Takk til Shane St. Savage for SSL og Jiahui Hu for Prometheus.

    * Støtte for bruk av informasjon i overskriftene til å bestemme serverens URL i stedet for å stole på oppsettsfilen. Dette vil gjøre det mulig å få tilgang til en server med flere navn og kan forenkle visse konfigurasjoner. Vennligst aktiver det og send tilbakemeldinger.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Noen små endringer, feilrettinger og optimeringer.

*    **ForERDDAP™Utviklere:** 
    * Refaktor til hvordan utgangsfiltypene er definert i kode. Dette bør gjøre det slik at filtyper kan legges til uten å måtte berøre mange kodesteder.

## Versjon 2.26{#version-226} 
 (utgitt 2025-03-31) 

*    **For alle:** 
    * Stor oppdatering til vår dokumentasjonsside: https://erddap.github.io/
 
Foruten det oppdaterte utseendet er det forbedret navigasjon, søk, oversettelse, og det bør være lettere å opprettholde videre&#33;

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Abonnementer ogRSSoppdateringer bør skje mer pålitelig for datasett som blir oppdatert ofte fra filendringer.

*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Standardutgivelsen krever/støtterJava21. Tilbake i denne utgaven er det lett å lage enJava17 kompatible binære.

    * Ny funksjon for å tilpasse informasjonen som vises om datasett i UI. Vi forventer at dette er spesielt nyttig å legge til ting som datasett siteringer. For mer informasjon kan du lese[ny dokumentasjon](/docs/server-admin/display-info).. Takk til Ayush Singh for bidraget&#33;

    * Ytterligere Prometheus metrikk. Den største er:http_request_duration_seconds» som inkluderer forespørselsresponstider delt ned av: "request_type", "dataset_id", "dataset_type", " fil_type", "lang_kode " "status_kode"
Dette maskinlesbare formatet vil tillate bedre samling av metriske for å forstå hvordan brukerne bruker serveren.

    * Ny måte å generere ISO19115 XML-filer. Det bruker Apache SIS og er et nytt alternativ i denne utgivelsen. Vennligst aktiver det og send tilbakemeldinger.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI vil nå opprette individuelle lenker for hver adresse i felt sominfoUrlog sammendrag.

    * Abonnementer ogRSSoppdateringer bør skje mer pålitelig for datasett som blir oppdatert ofte fra filendringer. Hvis dette forårsaker problemer, vennligst kontakt på GitHub og deaktivere funksjonaliteten ved å legge til flagget nedenfor til config.xml.
IKKE TILGÅTT
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subset variabler vil ikke lenger bli genereret automatisk for datasett type EDDTableFromNcCFFiles. Hvis du var avhengig av oppførselen, kan du enten (Foretrukket løsning) Legg tilsubsetVariablestil datasettets definisjon i dindatasets.xml, eller legg flagget nedenfor til setup.xml. Hvis du føler behovet for å slå på dette, vennligst kontakt ut på GitHub slik at vi bedre kan støtte din brukssak fremover.
IKKE TILGÅTT
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Serveren vil nå omdirigere dokumentasjonsforespørsler (under nedlastinger/ som er dokumentasjonen som har blitt migrert) til den nye dokumentasjonssiden. Hvis nødvendig kan du deaktivere dette med et flagg i setup.xml:
IKKE TILGÅTT
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Noen små endringer og feilrettinger.

*    **ForERDDAP™Utviklere:** 
    * Mer kodekvalitetsforbedringer og dead code cleanup. Dette inkluderer mindre optimaliseringer, bedre håndtering av klosbare ressurser og migrasjon fra langvarige datatyper (som Vector) ..

    * Stor repactoring til EDStatic å trekke ut det meste av konfigurasjonen, meldingen og metriske koden. Det også bedre innkapsler initialisering og håndtering av katalogstier (Disse to siste har mer å gjøre.) 

    * Mange fremskritt mot et offisielt støttet Docker Image. Planen er å avslutte og frigjøre etterERDDAP™2.26 utgivelse er tilgjengelig.

## Versjon 2.25{#version-225} 
 (utgitt 2024-10-31) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * EDDTableFromFiles kan nå støtte forespørsler med kun avledede utganger (globaler, jexl manus, eller variabler) ..
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Versjon 2.25 kreverJava21 eller nyere. Dette er LTS-versjonen og har vært tilgjengelig i over ett år.
         
    * SharedWatchService er nå standard. Hvis du trenger å deaktivere det, vennligst kontakt chris. john på noaa.gov å gi meg beskjed, så jeg kan forbedre det i fremtidige versjoner og legge til:
        &lt;useSharedWatchService&gt;falsk&lt;/useSharedWatchService&gt; til din setup.xml.
         
    * DenERDDAP™Servlet starter nå ved serveroppstart. Dette betyr at datasett vil begynne å laste umiddelbart i stedet for å vente til en forespørsel er gjort.
         
    * RemoveMVRoads parameter i EDDTableFromMultidimNcFiles vil nå ha en effekt. Å sette det på falsk kan betydelig fremskynde noen spørsmål, men dette kan ikke være egnet for alle datasett. For mer informasjon se[Beskrivelse av parameteren](/docs/server-admin/datasets#removemvrows)..
         
    * Datasett (EDDTableFromNcFiler ogEDDGridFraNcFiles) bruker zarr filer er nå støttet. De må inkludere "zarr" i enten filenNameRegex eller pathRegex. Se[zarr secion i dokumentasjonen](/docs/server-admin/datasets#zarr)For flere detaljer.
         
    * Ny datasetttype, EDDTableFromParquetFiles er nå støttet. Se[EDDTableFraParquetFiles seconion i datasettsdokumentasjonen](/docs/server-admin/datasets#eddtablefromparquetfiles)For flere detaljer.
         
    *   [Prometheus metriske](https://prometheus.io/)er nå tilgjengelig på /erddap/metri.
         
    * En ny XML-tolker implementasjon er tilgjengelig. Denne nye tolken tillater bruk av XInclude idatasets.xml.. Takk til Ayush Singh for funksjonen.
         
    * Ny parameter idatasets.xmlå kontrollere uvanlig aktivitet e-post. ualmindeligAktivitet FailPercent standarder til den gamle verdien på 25%. Takk til Ayush Singh for funksjonen.
         
    * Ny parameter i config.xml som kontrollerer om datasett lastingsfeil vises på status.html-siden. Det er standard til sant, for å deaktivere datasettsfeil på statussiden, angir showLoadErrorsOnStatusPage til falsk:&lt;showLoadErrorsOnStatusPage&gt;falsk&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Noen små endringer og feilrettinger.
         
*    **ForERDDAP™Utviklere:** 
    * Testing separert til enhet og integrasjon (sakte) tester. Også flere tester aktivert og tester har blitt gjort mindre flaky.
         
    * Feil Prone (Noen kontroller er fortsatt deaktivert) og Spot Bugs integrert gjennom Maven.
         
    * Full kodebase formatert for å matche Google Style Guide.
         

## Versjon 2.24{#version-224} 
 (utgitt 2024-06-07) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Ny farge palett EK80 for akustiske datasett tilgjengelig. Takk til Rob Cermak for dette.
         
    * Løs et problem hvor EDDTableAggregate roads ikke viste riktige intervaller fra alle barn. Takk til Marco Alba for fix and bug report.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Å gjøre: SIKKERHETSændring: Google-autentisering kan kreve endringer i din CSP.
        
Spesielt kan du også måtte legge til https://accounts.google.com/gsi/style til stlye-src og https://accounts.google.com/gsi/ å koble til. For script-src kan du nå bruke https://accounts.google.com/gsi/client.
 
        
For mer informasjon kan du gå til[Google-side](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)om CSP konfigurasjon.
         
        
    * Ny Shared Watch Service. Dette er et nytt alternativ for å se på mapper for oppdateringer. Den har en tråd for hvert filsystem i stedet for én tråd per datasett. Mest sannsynlig vil dette drastisk redusere antall tråder som brukes til å se etter endringer. Det betyr at alle datasett blir oppdatert sammen i stedet for at hvert datasett har sin egen oppdateringsfrekvens. Mest sannsynlig vil dette bety hyppigere oppdateringer for de fleste datasett.
        
For å aktivere dette tillegget&lt;useSharedWatchService&gt;true&lt;/useSharedWatchService&gt; til din setup.xml.
        
          
Vennligst prøv dette og rapporter om hvordan det fungerer for deg å chris. john på noaa.gov.
         
    * Fix for feil var navn i logger. Takk til Ayush Singh for løsningen.
         
    * Noen små endringer og feilrettinger.
         
*    **Forbedringer forERDDAP™utviklere:** 
    * Støtte til lokal utvikling ved hjelp av Docker. Takk Matt Hopson og Roje.
         
    * Støtte for lokal utvikling ved hjelp av Jetty og dokumentasjonsforbedringer. Takk, Michael Wengren.
         
    * Endringer i tester for å redusere problemer på tvers av plattform. Takk Shane St. Savage.
         

## Versjon 2.23{#version-223} 
 (utgitt 2023-02-27) 

Legg merke til at denne utgivelsen ble gjort av Bob Simons, og dermed viser at han fortsatt er rundt og aktiv under overgangen til Chris John, hans etterfølger. Alle kodeendringer gjøres av Chis John med mindre annet er angitt.

*    **Nye funksjoner og endringer (for brukere) :)** 
    *    (Ingen)   
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Å gjøre: SIKKERHETSændring: Google-godkjenning er nå oppnådd via det nye Google Identity Services-biblioteket som er en del av "Logg inn med Google". Googles støtte til det gamle systemGoogle Sign In"-systemet vil bli avsluttet 2023-03-31. Hvis du bruker Google Authentication i dinERDDAP™installasjon, må du oppdatere tilERDDAP™v2.23+ før da. (Bob beklager kort varsel. Det er Bobs feil.)   
         
    * NCCSV er nå v1.2. Endringen er at filene nå er UTF-8-kodede filer (De var ASCII) og så kan nå inneholde alle Unicode-tegn som er, uten å kode som \\u_hhhh_, selv om det fortsatt er tillatt.
Når NCCSV-filer skrives,ERDDAP™Nå skriver v1.2 filer.
        ERDDAP™vil fortsatt lese NCCSV-filer som følger v1.0 og v1.1-spesifikasjonen.
Takket være Pauline-Chauvet, n-a-t-e og thogar-computer for å foreslå dette og gjøre testene for å sikre ulike regneark programmer kan importere UTF-8 filer. Takk til Bob Simons for denne koden endring.
         
    * NEW: Status.html nettsiden har nå en linje nær toppen som indikerer hvilke datasett lastDatasett som for tiden lastes inn og relatert statistikk, eller ingen hvis ingen datasett lastes. Dette kan være svært nyttig forERDDAP™administratorer prøver å finne ut hvorfor lasting Datasett tar så lang tid. NGridDatasets, nTableDatasets og nTotalDatasets teller nedenfor som nå er øyeblikkelig (Tidligere var de fra slutten av den siste store belastningen Datasett) ..
Denne endringen er til Roy Mendelssohn. Takk til Bob Simons for denne koden endring.
         
    * IMPROVED: Genererer datasett Xml endres nå til CF-1.10 (var CF-1.6) i konvensjonene.
Takk til Bob Simons for denne koden endring.
         
    * Noen små endringer og feilrettinger.
         

## Versjon 2.22{#version-222} 
 (utgitt 2022-12-08) 

Legg merke til at denne utgivelsen ble utført av Bob Simons, og dermed viser at han fortsatt er rundt og aktiv under overgangen til sin etterfølger.

*    **Nye funksjoner og endringer (for brukere) :)** 
    *    (Ingen)   
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Å gjøre: ingenting.
         
    * SIKKERHETSBUG FIX: Det var en Cross Site-relatert feil i koden for språkvalg faller ned. Takket væreNOAASikkerhetsskanning for å fange dette. Dette viser atNOAAsikkerhet er aktivt og rutinemessig på jakt etter sikkerhets svakheter iERDDAP..
         
    * SIKKERHETSFIX: De mange bibliotekene som brukes avERDDAP™ble som vanlig oppdatert som en del av denne utgivelsen. Denne gangen inkluderte dette oppdatering av PostgreSQL driveren (som hadde en sikkerhetsfeil) til 42.5.1.
         
    * IMPROVED: Flere små endringer iERDDAPhukommelsesstyringssystemet bør redusere sjansen for en gitt forespørsel som mangler på grunn av mangel på tilgjengelig minne.
         
    * Noen små endringer og feilrettinger.
         

## Versjon 2.21{#version-221} 
 (utgitt 2022-10-09) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    *    (Ingen)   
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Å gjøre: ForJava17, bør du ikke bruke \\-d64 i JAVA\\_OPTS i setenv.bat eller setenv.sh. Så hvis det er der, vennligst fjern det. Jeg tror at 64 bit modus er nå valgt når du laster ned en 64 bits versjon avJava.. Takk til Sam Woodman.
         
    * BUG FIX: Noen ganger forsøkte det nye e-postsystemet å logge inn for ofte, noe som førte til at Google e-post-servere avviste alle fremtidige innloggingsforsøk. Nå unngår e-postsystemet dette og relaterte problemer.
         

## Versjon 2.20{#version-220} 
 (utgitt 2022-09-30) 

*    **Ikke bruk v2.20. Det er feil.** Men administratorer trenger fortsatt å gjøre TO DO-elementene som er oppført nedenfor ved oppgradering til v2.21+.
     
*    **Nye funksjoner og endringer (for brukere) :)** 
    *    (Ingen)   
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * IMPROVED: Vi reaktiverte det gamle minnestyringssystemet (Math2.ensureMemoryTilgjengelig) og endret det nye minnestyringssystemet (EDStatic.shedThisRequest) å jobbe bedre med det. Se[Minnestatus](/docs/server-admin/additional-information#memory-status)for detaljer.
         
    * Endret: Standard for&lt;ipAddressMaxRequests&gt; idatasets.xmlØkt fra 7 til 15. Det er klart at noen legitimeWMSKundene kan generere mer enn 7 samtidige forespørsler.
         

## Versjon 2.19{#version-219} 
 (utgitt 2022-09-01) 

*    **Ikke bruk v2.19. Det er feil.** Men administratorer trenger fortsatt å gjøre TO DO-elementene som er oppført nedenfor ved oppgradering til v2.20+.
     
*    **Nye funksjoner og endringer (for brukere) :)** 
    * NEW: Det er en ny serverside-funksjon,orderBySynske, som fungerer somorderByMen slags i synkende rekkefølge. Takk til Adam Leadbetter.
         
    * IMPROVED: Nå, grafer (Men ikke kart) vil utvide seg til å fylle det tilgjengelige rommet på lerretet, dvs. plass som ikke brukes av legenden. Du kan få høye grafer, firkantet grafer eller brede grafer ved å legge til og manipulere &.size=_wide_|_høyde_parameter (der bredde og høyde angi størrelsen på lerretet, i piksler) på forespørselsadressen. (Dette er ikke et alternativ på nettsiden .graph. Du må legge den til URL-en manuelt.) Hvis du ikke angir &.size parameter, forespørsler om .smallPng, .png, .largePng, .smallPdf, .pdf og .large.pdf har forhåndsdefinerte lerret størrelser, så grafen vil utvide seg til å fylle det tilgjengelige området, men vil vanligvis være omtrent firkantet. Takk til Bob Fleming.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Å gjøre:ERDDAP™Nå kreverJava17 og den relaterte Tomcat 10. Du må følgeERDDAP™installasjonsinstruksjoner (eller tilsvarende for Docker) å installereJava17 og Tomcat 10 og kopier din\\[tomcat\\]/innhold katalog fra din Tomcat 8 installasjon i den nye\\[tomcat\\]Katalog. Det finnes ingen andre endringer du trenger å gjøre til dinERDDAPinstallasjon relatert til denne endringen. Med andre ord:ERDDAP™fungerer som før.
        
Ikke glem å lageERDDAP-relaterte endringer i Tomcats server.xml og kontekst.xml når du oppgraderer Tomcat. SeERDDAP's[Tomcat installasjonsinstruksjoner](/docs/server-admin/deploy-install#tomcat)..
        
Mitt inntrykk avJava17 er at det foretrekker mer prosesskraft og minne for langvarig drift, større programmer somERDDAP™Så det fungerer litt langsommere ennJava8 med lav effekt datamaskiner (For eksempel 2 kjerner og minimal RAM) og jobber litt raskere ennJava8 med høyere motorer (For eksempel 4+ kjerner og rikelig RAM) .. Hvis du ser dårlig ytelse, bruk programmer som Linuxs[topp](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)å sjekke ressursbruk og vurdere å giERDDAP™Flere ressurser, spesielt mer minne. Minne er billig&#33; De fleste telefonene har flere prosessorer og minne enn serverne som noen av dere bruker til å kjøreERDDAP&#33;
Takk til Erin Turnbull.
         
        
    * Å gjøre: Hvis du brukerERDDAP™å få tilgang til Cassandra, for Cassandra, må du fortsette å bruke versjonen avJavaAt du brukte til å kjøre Cassandra. Bare bytte tilJava17 for å kjøre Tomcat+ERDDAP..
         
    * Å gjøre: Anbefalt: Hvis serverens CPU har 4+ kjerner og 8+ GB RAM, bør du vurdere å endre til disse innstillingene i dindatasets.xmlfil:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Hvis serveren din har færre ressurser, hold deg til "1 for begge disse innstillingene.
NThreads-systemer forEDDGridFra Filer og EDDTable Filene ble betydelig forbedret. Disse endringene førte til en enorm forbedring av hastigheten (For eksempel 2X speedup når nThreads er satt til 2 eller mer) For de mest utfordrende forespørsler (Når et stort antall filer må behandles for å samle resultatene) .. Noen relaterte endringer fra Chris John vil også føre til en generell hastighet gjennom heleERDDAP.. Koden for disse endringene var bidratt av Chris John. Takk, Chris&#33;
         
    * ADVARSEL: bindestrek idatasetIDEr foreldet og ikke lenger støttet (teknisk fortsatt tillatt) .. De vil sikkert bli avvist i neste utgivelse. Hvis du bruker bindestrek, bytte til understreker nå for å unngå problemer. Hvis du gjør endringen nå, det er i egen hastighet. Hvis du venter til neste utgivelse, er du i panikk og må håndtere det den dagen.
         
    * NY: Nå, for.htmlTabledatasvar, hvis dataene i en streng celle inneholder data:image/png;base64, etterfulgt av et base64 kodet .png-bilde,ERDDAP™vil vise et ikon (slik at brukeren kan se bildet hvis de svinger over det) og knapper for å lagre teksten eller bildet til utklippstavlen. Takk til Marco Alba (som bidro koden) Bob Simons (som endret det litt) ..
         
    * NYE: - ikke legg til standardnavn
Hvis du har \\ doNotAddStandardNames som en kommandolinjeparameter når du kjører genererer Datasett Xml, generer Datasett Xml vil ikke legge tilstandard\\_nametiladdAttributesfor andre variabler enn variabler som heter breddegrad, lengdegrad, høyde, dybde eller tid (som har åpenbarestandard\\_names) .. Dette kan være nyttig hvis du bruker utgangen fra å generere Datasett Xml direkte iERDDAP™uten å redigere utdata, fordi generere Datasett Xml gjetter oftestandard\\_namefeil. (Merk at vi alltid anbefaler at du redigerer utdata før du bruker det iERDDAP..) Bruk av denne parameteren vil ha andre mindre relaterte effekter fordi gjettetstandard\\_namebrukes ofte til andre formål, f.eks. til å skape en nylong\\_name, og for å opprette fargelinjen innstillinger. Takk til Kevin O'Brien.
         
    * NEW: Du kan nå sette&lt;oppdateringMaxEvents&gt;10&lt;/updateMaxEvents&gt; idatasets.xml  (i de andre innstillingene nær toppen) å endre det maksimale antall filendringer (standard=10) som vil bli behandlet av oppdateringenEveryNMillis systemet. Et større antall (100?) kan være nyttig når det er svært viktig at datasettet alltid holdes oppdatert. Se[oppdateringMaxEvents dokumentasjon](/docs/server-admin/datasets#updatemaxevents).. Takk til John Maurer.
         
    * NY: Legg til støtte for global "real\\_time= sant|falske" Streng attributt.
Hvis dette er falskt (standard) Hvis datasettet ikke bruker oppdatering Hver NMillis,ERDDAP™vil cache svar på forespørsler om filtyper der hele filen må opprettes førERDDAP™kan begynne å sende svaret til brukeren og gjenbruke dem i opptil ca 15 minutter (f.eks..nc.png) ..
Hvis dette er satt til sant, eller hvis datasettet bruker oppdatering Hver NMillis,ERDDAP™vil aldri lagre responsfilene og vil alltid returnere nyopprettede filer.
Takk til John Maurer.
         
    * NEW: E-poster sendes nå i en separat e-post. Dette gjør lasting av datasett og andre handlinger som genererer e-post raskere fordi lastdatasett ikke trenger å vente på at e-posten sendes, noe som noen ganger tar lang tid. Det nye systemet kan sende flere e-poster per e-post-sesjon, og dermed redusere antall e-post-server-innlogginger og redusere risikoen for at de ikke mislykkes fordi de er for hyppige. Det er statistikk for e-postThread på status.html siden og diagnostiske meldinger i log.txt -- se etter "emailThread". Legg merke til at et tall av nEmailsPerSession=0 indikerer problemer, dvs. at en e-postøkt ikke klarte å sende e-post.
Takk til Bob Simons.
         
    * Endret: E-post sendes nå med litt forskjellig kode (på grunn avJava17 og endring til e-postThread) .. Hvis du har problemer med å sende e-post, vennligst e-posterd.data at noaa.gov..
         
    * NEW: Abonnementshandlinger som "touch" en ekstern URL håndteres nå i et separat touchThread. Dette gjør lasting av datasett og andre handlinger som berører nettadresser raskere fordi lastDatasett ikke trenger å vente på at berøringen skal fullføres, noe som noen ganger tar lang tid. Det er statistikk for touchThread på status.html siden og diagnostiske meldinger i log.txt -- se etter "touchThread".
Takk til Bob Simons.
         
    * NEW: På status.html-siden, i -Major LoadDatasets Time Series - det er en ny -shed - kolonne som indikerer antall forespørsler som ble kastet fordi gjeldendeERDDAP™minnebruken var for høy. Forespørsler som blir kastet vil returnere HTTP-statuskoden 503 "Service Available". Disse forespørselene var ikke nødvendigvis et problem. De kom akkurat på en travel tid. Dette var en del av en revidering av hvordanERDDAP™håndterer høy minnebruk.
         
    * NEW: På Unix/Linux datamaskiner er det nå en "OS Info" linje på status.html nettsiden med gjeldende operativsysteminformasjon inkludert CPU-last og minnebruk.
         
    * IMPPROVED: Nå, nårERDDAP™er omstartet og rask restart=true, EDDTableFromFiles datasett vil gjenbruke undergruppe.ncog distinkt.nc.. For noen datasett, dette reduserer mye tiden til å laste datasettet (f.eks. fra 60 sekunder til 0,3s) .. Sammen med den nye e-posten (Se ovenfor) , dette bør øke hastigheten på nyttERDDAP™for mangeERDDAP™installasjoner. Takk til Ben Adams og John Kerfoot.
         
    * Endret: Tidligere, foreldreløse datasett (Datasett som bor iERDDAP™men er ikke idatasets.xml) ble bare notert på status. HTML og i log.txt etter hver større lastDatasett. De blir automatisk fjernet fraERDDAP™og notert på status.html og i log.txt, og e-postet til e-post Alt til. Hvis du vil fjerne et datasett fraERDDAP™, nå alt du trenger å gjøre er å fjerne sin bit av xml idatasets.xmlog den vil bli fjernet i de neste store lastdatasettene. Takk til Bob Simons.
         
    * KnowN BUG i netcdf-java v5.52 og v5.5.3: DenEDDGridFraThredds Katalogvalg i Genererer Datasett Xml som brukes til å jobbe for TREDDS kataloger som inkluderer referanser til datasett i eksterne TREDDS kataloger. Nå gjør det ikke. Jeg har rapportert problemet til netcdf-java utviklere.
         
    * BUG FIX: For Docker brukere innstilling oppsett.xml parametere viaERDDAP\\_paramName_: for inten- og boolske parametre (For eksempel e-post SmtpPort) ,ERDDAP™var feilaktig på jakt etter bare _paramName_. Nå ser det etter _ERDDAP \\_paramName_. Takk til Alessandro De Donno.
         
    * Endring: DenERDDAP™testsystem bruker nå et automatisert system for å sjekke at nye testbilder er nøyaktig som forventet. Takk til Chris John for forslaget og Bob Simons for gjennomføringen.
         

## Versjon 2.18{#version-218} 
 (utgitt 2022-02-23) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * NONE
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * BUG FIX:.ncFilene ble ikke stengt under noen omstendigheter. Nå er de det. Takket være Marco Alba, Roland Schweitzer, John Maurer og andre.
         

## Versjon 2.17{#version-217} 
 (utgitt 2022-02-16) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * BUG FIX: Etter endringer iorderBysystemet for noen år siden, Tabledaps Make A Graph håndterte ikke riktig mange spørsmål som brukesorderBy_Xxx_. Nå gjør det det. Takk til Maurice Libes.
         
    * Endring: Tidligere,ERDDAP™avviste forespørsler om. gjennomsiktig Png er når breddegraden og/eller lengdegradsverdiene var delvis eller helt utenfor rekkevidde. (ERDDAP™GitHub Issues #19, postet av Rob Fuller -- takk for innlegg av Rob) Nå returnerer den gjennomsiktige piksler for alle områder utenfor rekkevidde i bildet. Dette er nyttig for mange klientprogrammer. Koden endringer for å gjøre denne endringen ble gjort helt av Chris John. Tusen takk, Chris&#33;
         
    * Endring: Tidligere,ERDDAP™avviste forespørsler om netdap der indeksverdiene for en gitt dimensjon var\\[høy:lav\\].. Nå gjør det disse forespørsler gyldige ved å bytte de lave og høye verdiene. Dette løser et langvarig problem for brukerne og for eksterne programmer som xtracto som måtte holde styr på de få datasettene som har breddegradsverdier som varierer fra høyt til lavt for å gjøre forespørsel som\\[ (50) :) (20) \\]Forespørselen i indeksplassen var\\[lav: høy\\].. Se https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html En forespørsel som\\[ (20) :) (50) \\]For et av disse datasettene tolkes automatisk som\\[ (50) :) (20) \\]..
         
    * Endret: .esriAscii forespørsler utløser nå en "Fil : Lagre som" dialogboks i brukerens nettleser. Takk til Joel Van Noord.
         
    * BUG FIX: Hvis lengdegradsvariabelen til et barnedatasett i etEDDGridLonPM180 ellerEDDGridLon0360 har envalid\\_minog/ellervalid\\_maxAttribut, de fjernes iEDDGridLonPM180 ellerEDDGridLon0360 datasett. Takk til Roy Mendelssohn.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Å gjøre: Hvis du hadde satt&lt;DataProviderFormActive&gt; å feile å midlertidig håndtere XSS sårbarheten, vennligst sett den tilbake til sant.
         
    * SIKKERHET BUG FIX: Fast XSS sårbarhet i Dataleverandør skjema. Takk til Genaro Contreras Gutiérrez.
         
    * BUG FIX: Når en AWS S3 dirctory hadde mer enn 10000 filer,ERDDAP™En intern feil Dette er nå fikset. Takk til Andy Ziegler.
         
    * BUG FIX:EDDGridSideBySide tillot ikke variabelsourceNameI ulike barnedatasett er det samme. Nå gjør det det. Takk til Joshua Stanford.
         

## Versjon 2.16{#version-216} 
 (utgitt 2021-12-17) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Endringer/BUG-FIXER: Mange små endringer i oversettelsessystemet takket være forslag fra språkspesifikke redaktører. Takket være Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian og Mike Smit.
         
    * ADDERT en riktig fraskrivelse og tilskrivning til Google Translate, som kreves av vilkårene i Google Translate. Også&lt;HTML&gt; tagg i HTML for hver nettside identifiserer nå riktig ikke-engelske nettsider som har blitt maskin oversatt. Takk til Mike Smit.
         
    * BUG FIX: Innloggingsnettsidene fungerer nå riktig med ulike språkinnstillinger. Takk til Mike Smit.
         
    * NyorderBySumfilter. Og nye Sjekk alle og fjern merket alle knappene påEDDGridData Access Form nettside. Takket være koden bidraget fra Marco Alba.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Å gjøre: Hvis du har
        &lt;spørsmålMarkImageFile&gt; QuestionMark.jpg&lt;/questionMarkImageFile&gt;
i config.xml-filen din, må du enten fjerne hele merket (anbefalt, så standardfilen brukes) eller endre det til:
        &lt;spørsmålMarkImageFile&gt; QuestionMark.png&lt;/questionMarkImageFile&gt;
         
    * Endringer: Bare så du vet,[Adoptium](https://adoptium.net/?variant=openjdk8)har erstattet AdoptOpenJDK som hoved/anbefalt kilde tilJava  (OpenJDK) ..
         
    * Endring: Loggfilene fraERDDAP™, Opprett datasett Xml, og DasDds er nå UTF-8, ikke datamaskinens standard tegnsett. Jeg har gjort mange endringer for å sikre atERDDAP™alltid angir riktig tegnsett når du leser eller skriver alle typer filer, og ikke lenger (I flere tilfeller) avhengig av datamaskinens standard tegnsett. Dette korrigerte noen feil og flyttet så nært som jeg kunne til målet å bruke UTF-8 for så mange filtyper som mulig (f.eks. .log, .xml, .html,.json,.jsonl,.ncTopptekst) .. Merk at mange eldre filtyper kreves for å bruke ISO-8859-1 (f.eks.OPeNDAP.das, .dds, .csv,.tsv,.nc3,.nccsv.cpt) .. Jeg har tidligere forsøkt å jobbe med CF-gruppen og medUnidataå legge til støtte for UTF-8 i.nc3 filer, begge var resistente.
         
    * NEW: Når du laster ned filer fra AWS S3,ERDDAPcache Fra Url-systemet iEDDGridFra Filer og EDDTable FraFiles bruker nå den nye AWS Transfer Manager til å laste ned filer via parallelliserte biter (så raskt) .. Målet gjennomstrømning er satt til 20 Gbps, per fil, så dette fungerer godt med alle AWS-instanstyper, men spesielt de som har utmerket - Networking Performance". Med denne endringenERDDAPcache FromUrl-systemet tilbyr nå sammenlignbare hastigheter til xarrays tilnærming av parallelliserte nedlastinger av forhåndsvalgte filer, men uten behov for å konvertere kildefilene fra.ncog.hdfi bitte røntgenfiler. Faktisk,ERDDAPSystemet er bedre hvis det er en påfølgende forespørsel om å lese fra den samme filen, fordiERDDAP™Nå har en lokal kopi av filen. Samfunnet har brukt år på å standardisere.ncog.hdfFiler. Nå trenger vi ikke kaste det ut bare for å få god ytelse når vi lagrer data i AWS S3. Takk til Rich Signell.
         
    * Forandring: searchEngine=Lucene er for tiden utdatert. Det er et komplekst system som ofte gir resultater som er litt forskjellig fra den mer ønskelige oppførselen til searchEngine=original. For nesten alleERDDAP™installasjoner, tidsbesparingen av Lucene ikke kompensere forskjellene i resultatene. Bruk searchEngine=original i stedet om mulig. Hvis det forårsaker problemer, vennligst e-post Bob.
         
    * Forandring: Lucene-søketEngine oppfører seg nå mer som den opprinnelige søketEngine. Det er ikke lenger noen tilfeller der lucene tror en datasett kamper og original ikke gjør det. Også lucenes rangering nå lik originalens rangeringer (fordi originalen nå alltid brukes til å beregne rangeringene) ..
         
    * BUG FIX: starter i en nylig utgivelse,ERDDAP™Sluttet å se mer enn de første 1000 objektene i en gitt AWS S3 bøtte. Nå,ERDDAP™Igjen ser alle objektene. Takk til Andy Ziegler.
         
    * BUG FIX: Nå EDDTableAggregate Rader fjerneractual\\_rangeattributt når ett eller flere av barnas datasett aldri vet variabler \"actual\\_range  (f.eks. EDDTableFromDatabase) .. Takk til Erik Geletti.
         

## versjon 2.15{#version-215} 
 (utgitt 2021-11-19) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    *   ERDDAP™har et nytt system for å la brukeren angi språket som skal brukes til alle nettsider. Hvis enERDDAP™installasjon er satt opp til å bruke det, listen over språk vil vises i øvre høyre hjørne av hver nettside.ERDDAP™URL er fra før denne versjonen fortsetter å fungere og alltid returnere engelsk innhold, som før.
        
Ikke all tekst eller alle nettsider ble oversatt. Det var tidsbegrensninger i dette prosjektet som hindret Qi og Bob i å komme til 100%.
        
Det åpenbare spørsmålet er: Hvorfor gjorde vi så mye innsats i dette når Chrome vil oversette nettsider on-the-fly? Svaret er: På denne måten får vi mye mer kontroll over hvordan oversettelsen gjøres. Merkelig er det mange ord som ikke bør oversettes på nettsidene, for eksempel titler og sammendrag av datasett, navn på variabler, parametere, enheter og organisasjoner. Mye av oversettelsesinnsatsen var å identifisere ord og uttrykk som ikke bør oversettes. Også maskinoversettelser har tendens til å mangle visse typer HTML-merking. Å administrere oversettelsen gjorde det mulig å minimere dette problemet.
        
Oversettelsesprosjektet ble utført av Qi Zeng (en Google Summer of Code praktikant) og Bob Simons bruker Googles oversettelsesnetttjeneste. Det var et stort prosjekt. Takk, Qi&#33;
        
    * BUG FIX:ERDDAP™Nå lar ORCID ID ha X som siste siffer. Takk til Maurice Libes.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Å gjøre:
        
        * Du må gjøre noen endringer relatert tilERDDAPDet nye systemet som lar brukere angi språket for nettsider.
            * På første linje i setup.xml ogdatasets.xmlFiler, endre til: koding="UTF-8" og endre dokumentets koding i tekstredigeringen slik at den lagres som en UTF-8-fil. Opprett datasett Xml antar nå atdatasets.xmler en UTF-8-fil.
            * Programmører som samlerERDDAP:) AlleERDDAP™.java-filer bør behandles som UTF-8-filer som standard. Du må kanskje legge til " kodet UTF- til Javac-kommandolinjen. (Det gjorde jeg.) 
            * For å aktivere dette systemet (sterkt anbefalt) i&lt;startBodyHtml5&gt; tag som du angir idatasets.xml, endre "&amp&#33; loginInfo;" til "&amp&#33;loginInfo;|&amp&#33;språk - slik at listen over språk vises i øvre høyre hjørne av hverERDDAP™Nettside.
            *   ERDDAP™Bare bruk&lt;startBodyHtml5&gt; tag som du angir idatasets.xmlå angi HTML-innholdet for banneren øverst på hverERDDAP™nettside uansett hvilket språk brukeren velger. Hvis du endrer etiketten til å bruke
"&EasierAccessToScientificData;" i stedet for " lettere tilgang til vitenskapelige data" og
"&BroughtToYouBy;" i stedet for "Brought til deg ved",ERDDAP™vil bruke oversatte versjoner av disse frasene i banneren.
            * På samme måte er den nye standarden&lt;ShortDescriptionHtml&gt; idatasets.xmler
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
De siste tre linjene av innhold er ting som vil bli erstattet med oversatt tekst. Hvis du konverterer noen av dem (spesielt og dette SpesialErddap;) eller alle å uttrykke teksten idatasets.xml  (som har prioritet, hvis det er) eller messages.xml, den teksten vil vises uansett hvilket språk brukeren velger. Dette er ikke perfekt, men jeg fant ut at få administratorer ønsker å redigere&lt;ShortDescriptionHtml&gt; i 35 ulike filer for å gi 35 forskjellige oversatt versjoner av det merket.
        
          
         
    * Endret: Noen feil håndteres nå litt annerledes, og så kan legges til den høye delen av "Failed Forespørsler" på status.html og i Daily Report E-post. Så disse tallene kan være noe større enn tidligere.
         
    * BUG FIX: Genererer datasett Xml forEDDGridLon0360 ogEDDGridLonPM180 utelukker nå kildedatasett meddatasetID= ~ ".\\*\\_LonPM180" ogdatasetID= ~ ".\\*\\_Lon0360", henholdsvis.
         

## Versjon 2.14{#version-214} 
 (utgitt 2021-07-02) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    *    (ingen)   
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Nyhet:EDDGridLon0360 som gjør et rutet datasett med lengdeverdier &gt;=0 og&lt;=360 fra et gitt datasett med lengdeverdier &gt;=-180 og&lt;= 180. Se[EDDGridLon0360 dokumentasjon](/docs/server-admin/datasets#eddgridlon0360).. Takk til Dale Robinson.
         
    * Nyhet:ERDDAP™administratorer kan nå overstyre enhver verdi i config.xml via en miljøvariabel som heterERDDAP\\_verdiName_ før du kjørerERDDAP.. For eksempel brukERDDAP\\_baseUrl overstyrer&lt;baseUrl&gt;-verdi. Dette kan være praktisk ved utplasseringERDDAP™med en beholder, som du kan sette standardinnstillinger i config.xml og deretter gi spesielle innstillinger via miljøvariabler. Hvis du gir hemmelig informasjon tilERDDAP™via denne metoden, sørg for å sjekke at informasjonen vil forbli hemmelig.ERDDAP™Leser bare miljøvariabler en gang per oppstart, i første sekund av oppstart, så en måte å bruke dette på er: sett miljøvariabler, startERDDAP™Vent tilERDDAP™er i gang, og deretter uroe miljøvariabler. Takk til Marc Portier.
         
    * IMPROVED: Nå, hvis noen filer i en EDDTableFra... Filer datasett med mange filer har noen svært lange strengverdier, vil datasettet laste mye raskere og svare på forespørsler mye raskere. Tidligere,ERDDAP™vil tildele mye plass til min og max strengverdier i filene som lagres med filinformasjon for slike datasett. Den resulterende filen var enorm, noe som førte til at den ble skrevet og lest sakte. Takk til OBIS.
         
    * IMPROVED: Nå,ERDDAP™gjør en bedre jobb med å tolke uvanlige og ugyldige tegnsekvenser i CSV-filer. Takk til OBIS.
         
    * FIX: Etter et års problemer med Cassandra, installerte jeg endelig Cassandra (v2) igjen og så klarte å kjøre testene med Cassandra v2. Nå kan jeg si atERDDAP™jobber med Cassandra v2 og v3. Takk til ONC.
         

## Versjon 2.12{#version-212} 
 (utgitt 2021-05-14) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * BUG FIX: Hvis du er på abonnentet svartliste, kan du nå ikke be om en liste over abonnementene dine.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * TO DO: NEW: System for automatisk å begrense evnen til ondsinnede brukere og over aggressive legitime brukere til å gjøre et stort antall samtidige forespørsler som vil redusere systemets ytelse for andre brukere. Det er 3 nye valgfrie tags idatasets.xmlsom du kan/skal legge til rett etter&lt;grafBakgrunnsfarge&gt;:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

For ytterligere informasjon, se[ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests)..ERDDAP™Skriver også ut antall unike brukere (siden oppstart) " på status.html siden.
Takk til personen i Kina som angriper megERDDAP™installasjon.
         
    * Endre til Postgresql driveradferd: Når jeg oppdaterte Postgresql-driveren, kom kolonnenavnene i tabelllisten generert av Postgresql og GenerationDatasetsXml tilbake alle store bokstavar, i stedet for alle små bokstaver, som før. Jeg vet ikke om det vil påvirke andre ting siden databaser ofte anser disse navnene som ufølsomme. Testdatasettet fungerer fortsatt riktig. Hvis datasettet slutter å jobbe med detteERDDAP™Oppdatering, dette er den mulige årsaken til å forfølge først.
         
    * BUG FIX:ERDDAP™nå også håndterer private AWS S3 filer riktig. Det var andre relaterte forbedringer av håndtering av AWS S3-filer. Takk til Michael Gangl og Dylan Pugh.
         
    * Nyhet:EDDGridFra NcFiles ogEDDGridFraNcFiles Unpacked kan nå lese data fra "strukturer" i.nc4 og.hdf4 filer. For å identifisere en variabel som er fra en struktur,&lt;sourceName&gt; må bruke formatet: _fullStructureName_|_medlemsnavn, for eksempel gruppe1/myStruct|Min medlem. Takk til NRL.
         
    * Endret: Nå, hvis gjeldende minnebruk pluss denne forespørselen er enda litt høy, gitterdap sett nThreads for denne forespørselen til 1. DerforERDDAP™Bevarer hukommelse når minnet er lite. Takk til personen i Kina som angriper megERDDAP™installasjon.
         
    * Nytt system for å overvåke antall åpne filer (som inkluderer sokkel og andre ting, ikke bare filer) i Tomcat på Linux datamaskiner. Hvis noen filer feilaktig aldri blir stengt, kan antallet åpne filer øke til det overstiger maksimalt tillatt og mange virkelig dårlige ting skjer. Så nå på Linux datamaskiner (Informasjonen er ikke tilgjengelig for Windows) :)
        
        * Det er en ny "Åpne filer" kolonne på den ytterste høyre delen av status.html nettsiden som viser prosent av max-filene åpne. På Windows viser det bare --.
        * NårERDDAP™genererer denne informasjonen i slutten av hver større datasett reload, den vil skrive ut til loggen. txt-fil:
OpenFileCount=_current_ av max=_max_ %=_percent_
        * Hvis prosenten er &gt; 50%, sendes en e-post tilERDDAP™administrator og e-post Alt Til e-postadresser.
        
For å finne ut mer, eller hvis du ser dette problemet på dinERDDAP™Se[For mange åpne filer](/docs/server-admin/additional-information#too-many-open-files)..
Takk til personen i Kina som angriper megERDDAP™installasjon.
         
    * NEW: Jeg har lagt til mye kontroll og håndtering av "Too mange åpne filer", så oppgaven bare stopper og brukeren ser feilmeldingen. Datafiler vil ikke lenger bli merket som dårlig hvis du leser dem resulterer i en "Too mange åpne filer" feil.
         
    * Ny\\[bigParentDirectory\\]/badFilesFlag katalog:
Hvis du legger en fil i denne katalogen med endatasetIDsom filtypen (Filinnholdet spiller ingen rolle) ,ERDDAP™vil slette de dårlige Filene.ncfil for det datasettet (dersom noen) Last datasettet på nytt ASAP. Dette forårsakerERDDAP™å prøve igjen å jobbe med filene tidligere (Feilaktig?) Merket som dårlig. Takk til Marco Alba.
         
    * Endret: Ved oppstart, hvis enEDDGridFra... Filer eller EDDTableFra... Filer datasett har opprinnelig 0 filer i sin liste over kjente gyldige filer (For eksempel er det et nytt datasett) , såERDDAP™Utsetter lasting av det og setter et flagg slik at det vil bli lastet ASAP etter at de store lastdatasettene er ferdig. Dette øker oppstarten når det er nye datasett.
         
    * Endret: FileVistorDNLS.testAWSS3 () og FileVisitorSubdir.testAWSS3 () Bruk nå AWS v2 (ikke v1) SDK. Så nå GitERDDAP™distribusjonen inneholder nå alle nødvendige filer og du trenger ikke lenger å manuelt legge til den massive V1 AWS SDK krukkefilen.
         
    * Endret: Jeg byttet til å bruke Maven til å oppdage/samle avhengigheter (.jar filer i /lib) .. Endringen til v2 i AWS SDK krever dette. Det vil bli nødvendig for andre importerte koder i fremtiden. En stor takk til Kyle Wilcox som ga pom.xml han opprettet og bruker, som løste flere problemer for meg.
         
    * Endret: Klassestiparameteren (-cp) brukes i GenererDatasetXml, DasDds og andre små programmer som følger medERDDAP™, og i råd til programmerere er nå mye enklere og bør aldri endres igjen siden det refererer til katalogen, ikke de enkelte filene:
\\-cp klasser;C:\\programmer\\\_tomcat\\lib\\servlet-api.jar;lib\\\*
         (eller \":\" i stedet for \";\" for Linux og Macs) ..
         (Jeg skulle ha gjort det for mange år siden da det ble et alternativ.)   
         
    * NEW: Genererer datasett Xml har et nytt verktøyalternativ: FindDuplicTime som vil søke gjennom en samling gitt.nc  (og relatert) filer for å finne filer med dupliserte tidsverdier. Se[findDuplikat Tid](/docs/server-admin/datasets#findduplicatetime)  
         
    * Nyhet:datasets.xmlkan nå inkludere&lt;paletter&gt; tag som overstyrer&lt;paletter&gt; tag verdi fra messages.xml (eller tilbake til e-post.xml-verdien hvis den er tom) .. Dette lar deg endre listen over tilgjengelige paletter mensERDDAP™Jeg løper. Også, hvis du har en cptfiles underkatalog iERDDAP™innholdskatalog,ERDDAP™vil kopiere alle \\*.cpt-filene i den katalogen til\\[tomcat\\]/webapps/erddap/WEB-INF/cptfiles-katalog hver gangERDDAP™Begynner. Sammen kan du legge til paletter og få endringene vedvarer når du installerer en ny versjon avERDDAP.. Se[Palettdokumentasjon](/docs/server-admin/datasets#palettes)  
Takk til Jennifer Sevadjian, Melanie Abecassis og kanskje andre CoastWatch-folk.
         
    * Endret: [&lt;langsomDownTroubleMillis&gt;] (/docs/server-admin/datasett#slowdowntroublemillis) brukes nå for alle feilaktige forespørsler, ikke bare noen få typer.
         
    * Endret: RunLoadDatasetts-tråden avbryter nå LoadDatasetts-tråden ved 3/4 LoadDatasett MaxMinutes så det er mer tid for LoadDatasett å legge merke til avbruddet og avslutte ypperlig. Det er også flere og bedre diagnostiske budskap til dette.
         
    * Endret fra den gamle versjonen av Lucene til v8.7.0.
         
    * Endring: E-poster sendt avERDDAP™nå vises med en fast bredde.
         
    * Endring:EDDGridFraFiles får nå akseverdier samt attributter fra første|LAST-fil som angitt i&lt;MetadataFra&gt;. Takk (ikke) Ken Casey, et al.
         
    * ADDED-støtte for de ugyldige enhetene " grad\\_Nord" og "grad\\_øst" som feilaktig brukes av de nylige filene (siden 2020-10-01) i AVHRR Pathfinder versjon 5.3 L3-kollisert (L3C) SST datasett (nceiPH53sstd1dag og nceiPH53sstn1dag) ..ERDDAP™kan nå standardisere dem til gyldige enheter. Takk (ikke) Ken Casey, et al.
         

## Versjon 2.11{#version-211} 
 (utgitt 2020-12-04) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * BUG FIX: OrderByMean kastet en NullPointerException hvis en variabel hadde bare en av \\_FillValue eller manglende\\_ Verdi definert. Nå håndterer det situasjonen riktig. Takk til Marco Alba.
         
    * BUG FIX: Det var problemer med ODV-tekstfiler opprettet avERDDAP™i v2.10. Disse problemene er løst. Takket være Shaun Bell.
         
    * BUG FIX: Bare iERDDAP™v2.10: Hvis lat-lon-grensene ble spesifisert i URLen, ble grenseboksen ikke tegnet på verdenskartet. Nå er det igjen. Takk til John Maurer.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * BUG FIX: Bare iERDDAP™v2.10: Skriptfilene for ArchiveADataset, Genererer Datasett Xml og DasDds fungerte ikke fordi de ikke hadde endringer i klassestien som ble lagt til medERDDAP™v2.10. Nå gjør de det. Takk til Marco Alba.
         
    * NEW: Idatasets.xmlDu kan nå ha merket:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Foreløpig, hvis sant (eller hvis merket er tomt, eller om merket ikke er i filen) Når en brukers forespørsel fører til en NullPointerException,ERDDAP™vil sende stabelspor tilerd.data at noaa.gov  (denERDDAP™utviklingsteam) .. Dette bør være trygt og trygt siden ingen konfidensiell informasjon (f.eks. forespørselen) er inkludert i e-posten. Dette bør gjøre det mulig å fange noen uklare, helt uventede feil som fører til NullPointerExceptions. Ellers ser brukeren unntakene, menERDDAP™Utviklere ikke, så vi vet ikke at det er et problem som må løses.
        
Det er mulig at denne etiketten vil føre til at annen, lignende diagnostisk informasjon blir sendt tilerd.data at noaa.govi fremtiden. E-postens innhold vil alltid være minimalt og relatert til feil, og ikke for eksempel bruksinformasjon. Takk til Marco Alba.
         
        
    * Endret: Nå, vanlige komprimerte filtyper (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) er også forbudt for byte rekkeviddeforespørsler. Dette er spesifisert via&lt;noRangeRequests&gt; i messages.xml.
         
    * Kunnskapsproblem: Som medERDDAP™2.10,.ncml-filer som prøver å endre en attributt, ikke endre attributt. Dette er en kjent feil i netcdf-java som jeg har rapportert og de sier vil bli fikset i neste utgivelse av netcdf-java.
         

## Versjon 2.10{#version-210} 
 (utgitt 2020-11-05) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Ny: Den nye[Interpolere](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)konverterer effektivt verdier fra et gitt datasetts verdier. Som sådan er det spesielt nyttig for forskere som arbeider med dyrespordata. Denne konverteren tar i en tabell med breddegrad, lengdegrad og tidskolonner (Og kanskje andre kolonner) og returnerer en tabell med ekstra kolonner med interpolerte verdier. Dette ligner på den populære[Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto)script opprinnelig opprettet av Dave Foley, men tilbyr fordelen med å behandle opptil 100 poeng per forespørsel. Takk til Dave Foley og Jordan Watson (NMFS) ..
         
    * IMPROVED: Avansert søk er nå strengt for ikke-.html-forespørsler. Det vil nå kaste unntak fra forespørsler som har permanente feil (Forespørsler der minLat &gt; maxLat) eller midlertidige feil (Forespørsler om etstandard\\_nameDet eksisterer ikke) .. For .html-forespørsler er Advanced Search uendret: som med Google-søk, gjør det sitt beste og stille løser eller ignorerer feil. Takk til Rich Signell.
         
    * IMPROVED: Kartet på Avansert Søkesiden er nå større (Du trenger fortsatt å squint, men mindre) og betydelig mer nøyaktig (Men likevel ikke perfekt) .. Takk til John Maurer.
         
    * IMPROVED: "Draw landmaske" innstillingen på Make A Graph-nettsider og &.land=... innstillingen i URL-er som ber om et kart støtter nå to flere alternativer:
"outline" trekker bare landmasken kontur, politiske grenser, innsjøer og elver.
Off - trekker ikke noe.
Se[&.land=... dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)..
Takk til John Maurer.
         
    * IMPROVED: Grafer og kart opprettet avERDDAP™kan nå bruke tre nye markørtyper: Borderless fyllt plass, Borderless fyllt sirkel, Borderless fylles opp trekant. Koden til dette ble bidratt av Marco Alba av ITT / EMODnet fysikk. Takk til Marco Alba.
         
    * Nyhet:"files"Systemet støtter nå enkel Filtypesvar (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv, eller.xhtml..) f.eks.[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)..
Takk til Kyle Wilcox.
         
    * IMPROVED: Nettadresser som genereres når en bruker bruker et datatilgangsskjema (.html) eller Make-A-Graph (.graph) nettsiden nå riktig prosentkode tegnene\\[og\\].. Dette gjør URL-ene litt vanskeligere for mennesker å lese, men er bedre fra et web-sikkerhetsperspektiv. Administratorer har nå muligheten til å sette avslappetQueryChars= \"\\[\\]|' i Tomcat server.xml-filen (Mindre sikker) eller ikke (sikrere) ..
Takket være Antoine Queric, Dominic Fuller-Rowell og andre.
         
    * NEW: Hvis en forespørsel til en EDDTable-datasett inkluderer &add Variabler Hvor (_Tildelt Navn, attributt Verdi_) ,ERDDAP™vil legge til alle variabler som har _adtribut Navn=adtribut Verdi_ til listen over etterspurte variabler.
Se[& Legg til Variabler Når dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere).. Takket være Aurelie Briand, et al.
         
    * Endret:ERDDAP™Nekter nå byteområdeforespørsler til /filer/.nceller.hdfFiler. Ikke prøv å koble til fjernkontrollen.nceller.hdfFiler som om de var lokale filer. Det er utrolig ineffektivt og ofte forårsaker andre problemer. I stedet:
        * Bruk(OPeN)DAPKundeprogramvare å koble tilERDDAP'sDAPTjenester for dette datasettet (som har /griddap/ eller /tabledap/ i URL-en) .. Det er det somDAPer til.
        * Bruk datasettets datatilgangsskjema til å be om en undergruppe av data.
        * Hvis du trenger hele filen eller gjentatt tilgang over lang tid, brukcurl,wget, eller nettleseren for å laste ned hele filen, deretter få tilgang til data fra din lokale kopi av filen.
             
    * IMPROVED: .odv Txt-utgangsalternativ har blitt omskrevet for å støtte den nye versjonen avODV .txtfiler og å støtte riktig representasjon av baner, tider og profildata.
         
    * IMPROVED: Nå tolkes søkeord i dobbelt sitater som en Json-streng, slik at de kan ha \\-kodede tegn. Dette lar deg blant annet søke etter en nøyaktig match for en attributt, f.eks.NOAA\\n" vil ikke matche et datasett med institusjon=NOAA NMFS.. Takk til Dan Nowacki.
         
    * IMPROVED: På flere steder, flytende punkt tall (Spesielt flyter konvertert til dobbels) nå opptrer som en litt mer avrundet versjon av tallet på flere steder, f.eks. en flyte som tidligere var vist som en dobbel som 32.27998779296875, kan nå vises som 32.28. Takk til Kyle Wilcox.
         
    * BUG FIX: Udefinert heltalls lydfiler ble lest litt feil. Nå leses de riktig.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * ADVARSEL: Første gang du kjørerERDDAP™v2.10, noen datasett basert på lokale datafiler vil laste **meget** sakte fordiERDDAP™må gjenskape sin database av filinformasjon. Etter den langsomme første reload, vil de lastes raskt, som tidligere. Vær tålmodig.
         
    * Ting du må gjøre:
        * Når du først kjører v2.10, noen datasett kan ikke laste fordiERDDAP™Nå er det strengere med noen metadata. Som før,ERDDAP™vil sende deg en daglig rapport når den først lastes opp. Dette vil inkludere feilmeldingene for hvert av datasettene som ikke lastes. Les feilmeldingene for å finne ut problemene. I de fleste tilfeller må du bare gjøre en liten endring i datasettets metadata for å løse problemet.
             
        * Idatasets.xml, Søk etter&lt;sourceName&gt;= (Legg merke til'='tegn som identifiserer et[Fast verdisourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) .. For de flesteERDDAP™De er sjeldne. Hvis noen av verdiene etter'='er strenger (Ikke tall) Nå må du legge inn strengen i doble sitater. For eksempel
Før:&lt;sourceName&gt;=KZ401&lt;/sourceName&gt;
Etter:&lt;sourceName&gt;="KZ401"&lt;/sourceName&gt;
             
        * NY: Det er en ny valgfri innstilling i config.xml,&lt;standardAccessibleViaFiles&gt;, som angir standard&lt;tilgjengeligViaFiles&gt; for hvert datasett. Standard for denne nye etiketten er falsk, som etterlikner forrigeERDDAP™Atferd. Denne nedre nivåinnstillingen kan overstyres av et gitt datasett&lt;tilgjengeligViaFiles&gt; innstilling.
            
ANSVART (Fordi det er brukere som ønsker dette) :)
Hvis du vil gjøre alle EDD... FraFiles datasett som er tilgjengelige via filsystemet, deretter
            
            1. Legg denne etiketten til config.xml-filen:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Valgfritt) Fjern all den
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
idatasets.xmlSiden standarden nå er sant.
                 
        * Legg til \\_FallValue-attributter:
            ERDDAP™brukes til å ha en standard-_FillValue for alle heltallsvariabler: den maksimale verdien av datatypen (f.eks. 127 for bytevariabler) .. Nå gjør det ikke. For å unngå å ha disse verdiene vist som dataverdier (manglende verdier) , må du eksplisitt oppgi disse via \\_FillValue attributter. Fra nå av, hver gang du starter oppERDDAP™, det vil sende administratoren en e-post med en .csv tabell med en liste over heltallskildevariabler som ikke har  \\_FillValue ellermissing\\_valueattributter, og de foreslåtte nye -_FillValue attributter. Se[Legg til \\Fyll Verdiattributter](/docs/server-admin/datasets#add-_fillvalue-attributes)for mer informasjon og instruksjoner.
             
        * Hvis du kompilererERDDAP™, må du endre klassestiparameteren på javac-kommandolinjene for å legge til en referanse til disse nye krukkene: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar ..
             
    * Endret: Tomcat 9 er nå den anbefalte versjonen av Tomcat forERDDAP.. Den siste versjonen av Tomcat 8.5+ er også bra for nå. Vi rengjordeERDDAP's[Tomcat installasjonsinstruksjoner](/docs/server-admin/deploy-install#tomcat)..
        
Den siste versjonen avJava8 (ikkeJava9, 10, 11, ...) fra[AdoptOpenJDK](https://adoptopenjdk.net/)Fortsatt den anbefalte versjonen avJavaforERDDAP..Java8 har Long Term Support fra AdoptOpenJDK slik at det forblir trygt å bruke, men husk å få den nyeste versjonen av det regelmessig av sikkerhetsgrunner.
        
    * NEW: Skriptkildenavn/avledede variabler i tabelldatasett
EDDTableFromFiles, EDDTableFromDatabase og EDDTableFromFileNames datasett kan nå inkludere uttrykk og skript isourceName.. Dette lar deg lage nye variabler basert på eksisterende variabler i kildefilene. Beregningen for en gitt ny variabel gjøres innen én rad av resultatene, gjentatte ganger for alle rader. For eksempel, å gjøre en lengdevariabel med verdier i området -180 - 180° fra en variabel med verdier i området 0 - 360°:
        &lt;sourceName&gt;=Math2.anglePM180 (rad.kolonneDobbelt ("lon") ) &lt;/sourceName&gt;
For detaljer, se[SkriptkildeNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Takk til Bob Simons (som planla dette førERDDAP™v1.0 og endelig fant en måte å implementere det på) Kevin O'Brien, Roland Schweitzer, John Maurer, og Apache JEXL bibliotek for å gjøre den virkelig harde delen (og gjør det bra) ..
         
    * NEW: Usignert heltallsdatatyper (ubyte, ushort, uint, ulong) Nå støttes det. Legg merke til at mange filtyper (f.eks. .das, .dds,.nc3) Ikke støtte alle disse nye datatypene. Se[Data Typedokumentasjon](/docs/server-admin/datasets#data-types)for detaljer om hvordanERDDAP™håndtere disse forskjellene. Merkelig, siden(OPeN)DAP, spesielt .dds-responsen, støtter ikke signert byte, langer eller ulongs, kan det hende du vil brukeERDDAPden tabellformede representasjonen av .das og .das som sett ihttp.../erddap/ **info** /_datasetID_.html nettside (For eksempel[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) som du også kan komme i andre filtyper eller.nccsvMetadatarespons (For eksempel[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) Begge støtter alle datatyper i alle situasjoner.
        
ADVARSEL: For datasett som påvirkes av denne endringen er det mulig at du vil se problemer med datasettet fordi dataene somERDDAP™Leser fra kilden kan være annerledes (For eksempel kan variabler som tidligere har lest som signerte heltal nå leses som udefinerte heltallsverdier) .. De resulterende problemene inkluderer: nye filer som ikke legges til datasettet, og/eller feil når du prøver å få tilgang til dataene. Hvis et datasett har problemer, er det første å prøve å[Sett en hard Flag](/docs/server-admin/additional-information#hard-flag)For datasettet. Hvis det ikke løser problemet, må du se på loggen. txt for å se feilmeldingene, dykk inn i feilmeldingenedatasets.xmlfor datasettet, og/eller kanskje omkjøre genererDatasets.xml for datasettet.
Takket være netcdf-java 5.x (som tvang problemet) Den kommende CF 1.9.
        
    * IMPPROVED: Det er nå[bedre dokumentasjon/rådgivning](/docs/server-admin/datasets#s3-buckets)for hvordan du oppretter et datasett fra filer i AWS S3 bøtter. Takk til Micah Wengren.
         
    * Endret: Det er flere endringer relatert til"files"systemet.
        * Koden for å håndtere dette ble omskrevet for å være brukbar av flere klasser.
             
        * NEW: Brukerforespørsler om kataloglister kan nå be om at svaret er en av standard tabelltyper ved å legge til ønsket filtype: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv, eller.xhtml). For eksempel
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Takket være Kyle Wilcox og Shane St Savage.
             
        * IMPROVED: Nå, Opprett Datasett Xml vil ikke inkludere en&lt;tilgjengeligViaFiles&gt; tag i utgangen. Antakelsen er at datasettet vil stole på verdien av det nye&lt;standardAccessibleViaFiles &gt; tagg i setup.xml. Se[tilgjengelig ViaFiles](/docs/server-admin/datasets#accessibleviafiles)..
             
        * IMPROVED: Flere datasetttyper støtter nå tilgjengelige ViaFiles:EDDGridSideBySideEDDGridAggregateEDDGridFraErddap, EDDTableFraErddap,EDDGridFraEDDTable, EDDTableFraEDDGrid, ogEDDGridFra Etopo. For disse vil filene fra et gitt fjern-/barnedatasett bare være tilgjengelige hvis både foreldre- og barnedatasettet har tilgjengelig ViaFiles satt til sant (kanskje via&lt;standardAccessibleViaFiles&gt;). Takk til Damian Smyth og Rob Fuller.
             
        * VI anbefaler å gjøre alle relevante datasett tilgjengelig via filsystemet ved å sette&lt;standardAccessibleViaFiles&gt; til sant i setup.xml fordi det er en gruppe brukere som dette er den foretrukne måten å få dataene til. Av andre grunner"files"systemet gjør det enkelt for brukere å se hvilke filer som er tilgjengelige og når de sist endret, og dermed gjøre det enkelt for en bruker å opprettholde sin egen kopi av hele datasettet. Hvis du vanligvis ikke vil gjøre datasett tilgjengelig via filsystemet, angi&lt;standardAccessibleViaFiles&gt; til falsk. I begge tilfeller bare bruk&lt;tilgjengeligViaFiles&gt; for få datasett som er unntak fra den generelle politikken som er fastsatt av&lt;standardAccessibleViaFiles &gt; (For eksempel når datasettet bruker.ncml filer, som ikke er veldig nyttig for brukerne) ..
             
    * IMPROVED: Nå, hvis et kildedatasett har CF-gitter-_mapping informasjon, generere Datasett Xml for nettbaserte datasett vil legge informasjonen til global&lt;AddAtts&gt;, og informasjonen vil bli lagt til globalt&lt;sourceAtts&gt; hver gang data leses fra filen. Informasjonen vil vises i datasettets globale attributter som et sett av attributter med prefiksgitteret\\_mapping\\_.
         
    * INPROVED: Støtte for grupper ved lesing.nc4 (og til en viss grad i.hdf5) Filer. Generelt, enERDDAP™datasettet vil bli konstruert fra variabler i en av filgruppene. Også generer datasett Xml forEDDGridFra NcFiles ogEDDGridFraNcFiles Utpakket ber nå om en gruppe (f.eks. " for for alle/alle grupper, " someGroup " " someGroup/someSubGroup", eller "\\[rot\\]" for bare rotgruppen) .. Takket være Charles Carleton og Jessica Hausman.
         
    * IMPROVED: Genererer datasett Xml forEDDGridFra NcFiles ogEDDGridFraNcFiles Utpakket støtter nå en valgfri "DimensionsCSV" parameter som lar deg angi kildenavnene på dimensjonene som du vil at dette datasettet skal brukes. Bruk " for å få variabler som bruker de mest dimensjoner, som før. Også en relatert liten feil som oppstod med denne filtypen er nå løst. Takk til Sujal Manandhar.
         
    * BUG FIX: Genererer datasett Xml nå riktige lister "EDDTableFraJsonlCSVFiler" (ikke "EDDTableFra JsonlCSV") som et av EDDType-alternativene. Takk til Andy Ziegler.
         
    * IMPROVED:EDDGridFraNcFiles Upakka nå standardiserer " enheter" attributter til standard/"kanonisk" utenheter (den samme fremgangsmåten som enhetsomformeren) .. For eksempel"meter per second","meters/second","m.s^-1", og"m s-1"alle blir"m s-1".. Takk til Andy Ziegler.
        
ADVARSEL: Det er mulig at dette vil forårsake problemer for noen eksisterende datasett (For eksempel forårsake nye filer å bli merket " dårlig") .. I så fall,[Sett en hard Flag](/docs/server-admin/additional-information#hard-flag)for datasettet slik at alle kildefilene vil bli gjenlest med det nye systemet.
        
    * IMPROVED: Nå, en variabel&lt;sourceName&gt; kan angi en fast verdi på =NAN og variabelen kan ha enactual\\_rangeegenskap som angir et definisjonsområde. Dette er noen ganger nyttig slik at et datasett (spesielt et EDDTableFromFileNames dataset) kan ha dummy variabel (s)   (f.eks. breddegrad, lengdegrad, tid) med faste verdier av NaN, men med en gyldigactual\\_range  (som satt av attributten) .. Deretter kan en bruker i Avansert søk søke etter datasett som har data i en bestemt breddegrad, lengdegrad, tidsintervall og dette datasettet vil kunne si det har relevante data (Selv om alle de faktiske rekkene av data vil vise NaN) .. Se[dokumentasjon av fast verdi](/docs/server-admin/datasets#fixed-value-sourcenames)..
Takket være Mathew Biddle.
         
    * NEW: Nå, dendatasets.xmlbit for et EDDTableFromAsciiFiler eller EDDTableFromColumnarAsciiFiles datasett kan inneholde en tag som fortellerERDDAP™å ignorere alle linjene øverst i filen opp til og med linjen som samsvarer med det angitte regulære uttrykket. For eksempel
        &lt;Hopp overHeaderToRegex&gt;\\\*\\\*\\\*Ender av Header.\\*&lt;/skipHeaderToRegex&gt;
vil ignorere alle linjer opp til og inkludert en linje som starter med -\\*\\* \\* HØYDERENS END Se [&lt;Hopp overHeaderToRegex&gt; dokumentasjon] (/docs/server-admin/datasett#skipheadertoregex) ..
Takk til Eli Hunter
         
    * NEW: Nå, dendatasets.xmlbit for et EDDTableFraAsciiFiler eller EDDTableFraColumnarAsciiFilesdatasett kan inneholde en tag som fortellerERDDAP™å ignorere alle linjene i filen som samsvarer med det angitte regulære uttrykket. For eksempel
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

vil hoppe over alle linjer som starter med "#". Se [&lt;SkipLinesRegex&gt; dokumentasjon] (/docs/server-admin/datasett#skiplinesregex) ..
Takk til Eli Hunter.
         
    * NEW: Dendatasets.xmlbit for alle EDDTable-datasett kan nå inkludere & add Variabler Hvor (_tildelingNamesCSV_) .. Hvis det gjør det,ERDDAP™vil legge til en widget for hver av de angitte egenskapene Navn på datasettets datatilgangsskjema (.html nettside) for å gjøre det enkelt for brukere å legge til og legge til Variabler Hvor (_Tildelt Navn, attributt Verdi_) til forespørselen.
Se[& Legg til Variabler Når dokumentasjon](/docs/server-admin/datasets#addvariableswhere)..
Takket være Aurelie Briand, et al.
         
    * Ny Tredjepartsverktøy:ERDDAP-lint
        ERDDAP-lint er et program fra Rob Fuller og Adam Leadbetter fra Irish Marine Institute som du kan bruke til å forbedre metadataene til dinERDDAP™Datasett.ERDDAP-lint " inneholder regler og en enkel statisk webapplikasjon for å kjøre noen verifikasjonstester mot dinERDDAP™server. Alle testene kjører i nettleseren." som[Unix/Linux lint verktøy](https://en.wikipedia.org/wiki/Lint_(software)), kan du redigere eksisterende regler eller legge til nye regler. Se[ERDDAP-lint](https://github.com/IrishMarineInstitute/erddap-lint)For mer informasjon.
        
Dette verktøyet er spesielt nyttig for datasett som du opprettet for noen tid siden og nå ønsker å få oppdatert med dine gjeldende metadatainnstillinger. For eksempel tidlige versjoner av Genererer Datasett Xml gjorde ingen innsats for å skape globalcreator\\_name,creator\\_email, skaper\\_type, ellercreator\\_urlmetadata. Du kan brukeERDDAP-fast for å identifisere datasett som mangler disse metadata attributtene.
        
Takk til Rob og Adam for å lage dette verktøyet og gjøre det tilgjengelig forERDDAP™Samfunn.
        
    * NEW: Nå er det greit hvis noen av filene i enEDDGridFraFiles datasett har ikke alle datasettets variabler. Filene vil bli inkludert som om de hadde variabler (Alle manglende verdier) ..
Takk til Dale Robinson og Doug Latornell.
         
    * NEW: Det er ny bruksstatistikk i loggfilen og Daily Report for å hjelpe administratorer å identifisere brukerne som forårsaker minneproblemer. Statistikken heter "OutOfMemory (Array-størrelse) ", "OutOfMemory (For stor) " og "OutOfMemory (For stor)  ". De viser IP-adresser til brukerne som gjorde forespørsler i disse kategoriene og antall forespørsler de gjorde. Hvis det ikke var noen problemer, vil disse statistikkene ikke vises. "OutOfMemory (Array-størrelse) " og "OutOfMemory (For stor) Forespørsler er vanligvis ikke et problem fordi forespørselene var så store atERDDAP™Fang dem raskt og returnerte en feilmelding. «OutOfMemory» (For stor) Forespørsler er farligere fordiERDDAP™gjorde noen innsats før det innså at det ikke var nok minne for tiden tilgjengelig til å håndtere forespørselen (Selv om problemet kan være andre forespørsler rett før disse forespørsler) ..
        
Det er også nye statistikker som heter "Stor forespørsel, IP-adresse" som viser IP-adresser til brukerne som gjorde store forespørsler (for tiden, gitt.ncfiler &gt; 1GB) ..
        
Også tidsserietabellen på status.html siden inneholder nå en "memFail" kolonne som viser antall forespørsler som mislyktes med "OutOfMemory (For stor) " feil siden de siste store Lastedatasettene. Et annet tall enn 0 her er minst en grunn til bekymring.
Takk til Bob Simons.
        
    * Ny versjon avHyraxViser kataloglister annerledes enn tidligere.ERDDAP™kan nå lese gamle og nye kataloglister.
         
    * NEW: Datasett reloads og brukerresponser som tar &gt; 10 sekunder å avslutte (vellykket eller vellykket) er merket med " (&gt;10s&#33;)  ". Derfor kan du søke i log.txt-filen for å finne datasettene som var langsomme å laste på nytt eller forespørselsnummer på forespørsler som var langsomme å fullføre. Du kan deretter se høyere ut i log.txt-filen for å se hva datasettet problem var eller hva brukerforespørselen var og hvem det var fra. Disse sakte datasett belastninger og brukerforespørsler er noen ganger skatt påERDDAP.. Så å vite mer om disse forespørsler kan hjelpe deg å identifisere og løse problemer.
    * IMPROVED: Når du validerer et CF DSG-datasett,ERDDAP™nå sikrer at variabler med cf-_role attributter er i den tilsvarende cdm-____variables-listen og er ikke i andre cdm-______variables-lister. For eksempel, hvis et timeseriesProfildatasett har en "station\\_id" variabel som har cf__role=timeseries\\_id-attributt, må da "station\\_id" være i cf\\_timeseries-_variables-listen, men må ikke være i cf\\_profil\\_variables-listen.
Takk til Micah Wengren.
         
    * IMPROVED: 'Simplify' er nå raskere, bruker mindre minne, og kan returnere LongArray. Takket væreUnidata..
         
    * IMPROVED: rask restart er nå betydelig raskere for EDDTableFra (nc-relatert) Filer (bortsett fra EDDTableFromNcCFFiler og EDDTableFromInvalidCRAFiler) for å lage Forventet (og et annet sted) Nå bare leser prøvefilens metadata i stedet for å lese alle dataene. Takk til Jessica Austin.
         
    * IMPROVED: Det er nå støtte for tidsstrenger med presisjon større enn to-the-milli sekund hvis de ekstra sifferene er alle 0, f.eks. "2020-05-22T01:02:03.456000000Z". Takk til Yibo Jiang.
         
    * IMPROVED: Generer DatasetsXmls EDD.suggest MODName brukes til å fjerne '(' og alt etter. Nå fjernes det (.\\*Bare hvis det er slutten påsourceName.. Nå fjernes det også\\[..\\*\\]Bare hvis det er slutten påsourceName.. Takk til Julien Paul.
         
    * IMPROVED: Genererer datasett Xml gjør nå variabelendestinationNameS unikt ved å legge til \\_2, \\_3, ... etter behov. Takk til Julien Paul.
         
    * IMPROVED: Når Calendar2.parseDateTime tolker dd, hh eller HH, kan det første 'siffer' nå være et mellomrom.
    * Kunnskapsproblem: Begynner medERDDAP™2.10,.ncml-filer som prøver å endre en attributt, ikke endre attributt. Dette er en kjent feil i netcdf-java som jeg har rapportert og de sier vil bli fikset i neste utgivelse av netcdf-java.
         
    * BROKEN LINKS FIX: Jeg gjorde et riktig system for testing for ødelagte koblinger iERDDAP™nettsider, så det bør nå være svært få ødelagte lenker (i det minste som av hver utgivelsesdato - nye ødelagte lenker oppstår ofte) ..
         
    * BUG FIX: EDDTableFromHttpGet mislyktes med visse typer forespørsler. Nå gjør det ikke. Takk til Emma på BODC.
         
    * BUG FIX: For å håndtere noen forespørsler gjorde EDDTable en midlertidig fil for hver forespurt variabel, med et filnavn som endte i variabelens navn. Hvis variabelens navn også var en type kompresjon (f.eks.) ,ERDDAPville prøve (og mislykkes) å dekomprimere den midlertidige filen. Nå slutter de midlertidige filnavnene i ".temp". Takket være Mathew Biddle.
         
    * BUG FIX: Genererer DatasettXml og Calendar2.convertToJavaDatotid Format er nå mye mindre sannsynlig å gjøre en feil endring når du prøver å fikse et eventuelt ugyldig dato tidsformat. Spesielt vil det ikke endres noe auto-sugged dateTime-format. Takket være Mathew Biddle.
         
    * BUG FIX: Hvis det oppstod en feil under innhold fra en ekstern URL, og hvis feilStream-innholdet er komprimert,ERDDAP™Dekomprimerer nå feilmeldingen. Takk til Bob Simons.
         
    * BUG FIX:&lt;abonnentToRemoteErddapDataset&gt; ble ikke brukt når EDD... FraErddap-datasettet var et barnedatasett. Nå er det det. Takk til Chris Romsos.
         
    * BUG FIX: Genererer datasett Xml tror ikke lenger et kildevariabelt navn som starter med "latin" kan være breddegrad. Takk til Vincent Luzzo.
         
    * BUG FIX: Nå, en OutOfMemoryError mens du leser en datafil mens du behandler en brukers forespørsel er ikke en grunn til å legge til en fil i BadFiles-listen. Takk til Bob Simons.
         

## Versjon 2.02{#version-202} 
 (utgitt 2019-08-21) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * NEW: Det er nå to måter å søke etter datasett på flereERDDAPS. De fungerer litt annerledes og har ulike grensesnitt og alternativer.
        
        *   [SøkMultipleERDDAPS.html](/SearchMultipleERDDAPs.html)fra Bob Simons/NOAA NMFS SWFSC ERD..
        *   [ http://erddap.com ](http://erddap.com)fra Rob Fuller/Irland Marine Institute.
        
Takk til Tylar Murray for den opprinnelige forespørselen.
         
    * IMPROVED: en forespørsel til"files"systemet for å laste ned en fil som faktisk er på et eksternt nettsted (For eksempel AWS S3) nå fører til en omdirigering, så brukeren faktisk vil laste ned data fra kilden, i stedet for å brukeERDDAP™som mellommann. Takk til Andy Ziegler ogNOAA..
         
    * NEW: Som et eksempel på de nye AWS S3-relaterte funksjonene, og for å gjøre det lettere for alle å bla gjennom og laste ned filer fra offentlige AWS S3-bøtter, har vi opprettet
        [~110 prøvedatasett](https://registry.opendata.aws/)som tillater alle å bla gjennom innholdet i nesten alle
        [AWS S3 Åpne databøtter](https://registry.opendata.aws/).. Hvis du klikker på"files"link for noen av de prøvedatasettene, kan du bla gjennom katalogtreet og filene i den S3 bøtte. På grunn av måten disse datasettene fungerer på, er disse kataloglistene alltid helt oppdaterte fordiERDDAP™Få dem på flyet. Hvis du klikker ned katalogtreet til et faktisk filnamn og klikker på filnamnet,ERDDAP™vil omdirigere forespørselen din til AWS S3 slik at du kan laste ned filen direkte fra AWS.ERDDAP™administratorer kan
        [lese instruksjoner for hvordan du gjør dette for andre S3 bøtter](/docs/server-admin/datasets#working-with-aws-s3-files).. Takk til Andy Ziegler ogNOAA..
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Ting du trenger å gjøre: ingen
         
    * IMPROVED:ERDDAPFremgangsmåte for lagring av rekker av strenger (StringArray) Nå er mye mer minneeffektivt. Streng Arrays brukes gjennom heleERDDAP™, spesielt når du leser tabell ASCII-datafiler. Andre endringer gjør også lesing av CSV/TSV/SSV ASCII, kolonnear ASCII og JsonlCSV-tabellfilene raskere og mye mer minneeffektive. Resultatet er: for en 764 MB ASCII-datatestfil (men komprimert til en 52MB.gzfil) med 3,503 266 rader og 33 kolonner, maksimal minnebruk gikk fra 10 GB ned til 0,6 GB (på toppen) .. Tiden til å lese det gikk fra ~ 7 minutter (Men varierer sterkt med hvor mye fysisk minne som er i datamaskinen) ned til ~ 36 sekunder (inkludert 10s for å forenkle () som kun brukes av Genererer Datasett Xml) .. Flere andre steder iERDDAP™vil dra nytte av denne økte minneeffektiviteten. Takk til Tylar Murray og Mathew Biddle.
        
Jeg har utforsket en annen løsning (lager strenger i StringArray som UTF-8-kodede byte tabeller) .. Det reduserer minnebruken til en annen ~ 33%, men til kostnad av ~ 33% bremse. Sammenlignet med systemet som nå brukes, virket det som en dårlig handel off. Det er lettere å gi en datamaskin mer minne (Kjøp mer minne for ~ $ 200) enn å gjøre det raskere (Kjøp en helt ny datamaskin) ..
        
Hvis det er praktisk, er det fortsatt en god ide å dele enorme tabulær datafiler i flere mindre filer basert på noen kriterier somstationIDog/eller tid.ERDDAP™vil ofte bare måtte åpne en av de små filene som svar på en brukers forespørsel, og dermed kunne svare mye raskere.
        
    * IMPPROVED: Det er nå[ERDDAP™AWS S3-dokumentasjon](/docs/server-admin/datasets#working-with-aws-s3-files)som beskriver hvordan man fårERDDAP™å jobbe med datafiler i AWS S3 bøtter.
Også,ERDDAP™Nå bruker nye funksjoner i AWS S3JavaAPI.
Også,ERDDAP™Nå lar AWS S3-adresser inkludere ekstra tegn (periode, bindestrek, understrek) i bøttenavn.
Også,ERDDAP™nå krever at AWS S3 bøtte-adresser identifiseres på en bestemt måte:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
hvor prefikset er valgfritt.
Takk til Andy Ziegler ogNOAA..
         
    * IMPROVED: Genererer datasett Xml behandler nå mer vanligmissing\\_valuestand-ins som manglende verdier og det er mer sannsynlig å konvertere en kolonne til en numerisk datatype. Også PrimitiveArray.simplify () logger nå hvilken bestemt dataverdi som fikk det til å behandle en gitt kolonne som en kolonne av strenger. Takket være Mathew Biddle.
         
    * IMPROVED:&lt;forespørselBlacklist&gt; støtter nå.\\*..\\*  (Eller:\\*:)\\*for IPv6) i slutten av IP-adresser slik at du kan svarteliste en større del av IP-adresser, for eksempel 110.52.\\*..\\*  (Kina Unicom Tianjin) .. Se dokumentasjonen for [&lt;forespørselBlacklist&gt;] (/docs/server-admin/datasett#requestblacklist) Takk til China Unicom og China Telecom.
         
    * IMPROVED: Hvis et datasetts kilde ikke spesifiserer en"institution"attributt, Generer datasett Xml og lastDataset får det nå fra en "creator\\_institution"-attributt (dersom tilgjengelig) .. Takk til Micah Wengren.
         
    * BUG FIX: standardisering Det som ikke alltid ble brukt på ASCII-datafiler.
Også EDDTable håndterte ikke riktig begrensninger på tidsverdier når kilden hadde strenge tidsverdier og standardisering Det som ble brukt.
Takket være Paloma de la Vallee.
        
Jeg har ikke klart tidligere: Du bør bare bruke standardisering Hvilke funksjoner når du faktisk trenger dem (For eksempel når forskjellige kildefiler lagrer tidsverdier på forskjellige måter) , fordi noen forespørsler til datasett som bruker standardisering Hva som vil bli behandlet litt langsommere.
        
    * BUG FIX: En feil i kode som brukes avEDDGridFraNcFiles forårsaket det å mislykkes med.nc4 og.hdf5 filer som har " lang" (int64) Variabler. Dette er nå fikset. Takk til Friedemann Wobus.
         
    * BUG FIX: Små endringer i ISO 19115 filer for å gjøre en annen validerer lykkelig. Takk til Chris MacDermaid og Anna Milan.
         

## Versjon 2.01{#version-201} 
 (utgitt 2019-07-02) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Ingen.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * BUG FIX: En feil i koden som genererer datatilgangsskjemaet fortabledapdatasett førte til at nettsiden var tom for noen datasett. Jeg forbedret også håndteringen av uventede feil på alle HTML-sider slik at de vil (vanligvis) Vis en feilmelding. Takk til Marco Alba.
    * IMPROVED: Genererer datasett Xml skriver ikke lenger ut en langvarig advarsel øverst på utgangen. I stedet kan du se[Redigerer Oppretter Datasett Xml-utgang](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better).. Takk til Steven Baum.
    * IMPROVED: Genererer datasett Xml gir nå litt forskjellige anbefalinger i forskjellige situasjoner for&lt;oppdaterEveryNMillis&gt; for EDD...Fra...Files datasett. Også generer datasett Xml avviser nå det opprinnelige systemextract" systemet for EDDTableFromFiles datasett.

## Versjon 2.00{#version-200} 
 (utgitt 2019-06-26) 

*    **ERDDAP™V2.00 er endelig her&#33; Ja&#33;**   
     
    * Vi beklager den lange forsinkelsen som trengs for å fullføre denne versjonen.
Takk for tålmodigheten.
         
    * Den gode nyheten er at den ekstra tiden ble brukt til å legge til flere av funksjonene som brukerne hadde bedt om. Den dårlige nyheten er at selv med forsinkelsen, ikke alle etterspørte funksjoner ble lagt til. Vi beklager, men det virket viktigere å få ut denne utgivelsen enn å forsinke mer (For alltid?) Legg hele tiden til nye funksjoner. Vi lover å komme tilbake til hyppigere utgivelser i fremtiden.
         
    * -Version 2? Finnes det store endringer og upartiskheter?"
Store nye funksjoner? Ja.
Stor inkompatibilitet eller endringer for administratorer eller brukere? Nei.
Vi hoppet fra v1.82 til v2.00:
        * til å feire ti år (nå 11) Siden den første offentlige utgivelsen avERDDAP™  (v1.00 2008-05-06, som utover så bemerkelsesverdig ut som v2.00) .. På den tiden,ERDDAP™Har gått fra én installasjon til nesten 100 installasjoner i minst 12 land (Australia, Belgia, Canada, Frankrike, India, Irland, Italia, Sør-Afrika, Spania, Thailand, Storbritannia, USA) ..
        * delvis å markere et stort tillegg i en helt ny retning:ERDDAP™Nå har et datainntakssystem å gå med eksisterende dataserver tjenester (se[EDDTableFraHttpGet](#eddtablefromhttpget)) ,
        * Og delvis fordi det ikke var et stort hopp fra 1,82 til 2,00 numerisk, så dette virket som riktig tid.
             
    * Den andre gode nyheten er at det nå er to andre grupper som bidrar tilERDDAP™  (I denne versjonen og med indikasjoner vil de fortsette) Rob Fuller og Adam Leadbetter fra Irlands marineinstitutt og Roland Schweitzer fra PMEL og Weathertop Consulting. Tusen takk. Det er sant at de jobber med prosjekter etter eget valg, men det er den klassiske åpen kildekodeutviklingsmodellen -- grupper bidrar med kode for funksjonene de ønsker å se lagt til. Den ekstra fordelen til bidragsytere: de får bruke de nye funksjonene så snart de er ferdige; de trenger ikke å vente på neste utgivelse avERDDAP.. Din gruppe er velkommen til å bidra også&#33; Se[ERDDAP™Programmørens veiledning](/docs/contributing/programmer-guide)..
         
    * Vi håper du likerERDDAP™v2.00. Vi ser frem til de neste 10 årene avERDDAP™utvikling og mer bruk over hele verden.
         
*    **Nye funksjoner og endringer (for brukere) :)**   
     
    * Nyhet:orderByMeanfilter
fortabledapDatasett vil beregne midlene for de angitte gruppene. Også, alleorderByalternativer støtter nå en ekstra måte å definere grupper på: _numeriskVariabel\\[/nummer\\[timeUnites\\]\\[:offset\\]\\]_, f.eks. tid/dag eller dybde/10:5. For eksempelstationID,tid, vannTemp&orderByMean ("stationIDTid/dag") Ville sortere resultatene frastationIDog tid, deretter beregne og returnere gjennomsnittet av vannTemp for hverstationIDFor hver dag. Disse er utrolig nyttige og kraftige nye funksjoner. Den nye koden for disse funksjonene og endringene av den gamle koden ble bidratt av Rob Fuller og Adam Leadbetter fra Irlands Marine Institute og sendt via Git. Takk, Rob og Adam&#33;
         
    * NY: utgangsfiltype for tabelldatasett:[.data Tabell](https://developers.google.com/chart/interactive/docs/reference#dataparam),
en JSON-fil formatert for brukGoogle Visualizationklientbibliotek (Google Charts) .. Koden til dette ble bidratt av Roland Schweitzer og innsendt via Git. Takk, Roland&#33;
         
    * NY: utgangsfiltype for tabelldatasett:[.jsonlCSV1](https://jsonlines.org/examples/),
som er som det eksisterende.jsonlCSValternativet, men med kolonnenavn på den første linjen. Takk til Eugene Burger.
         
    * NEW: Hvis administratoren aktiverer det, kan brukerne nå logge inn med deres[ORCID](https://orcid.org)konto.
Det er et OAuth 2.0-autentiseringssystem som ligner på Google-autentisering. ORCID er mye brukt av forskere til å identifisere seg selv unikt. ORCID-kontoer er gratis og har ikke personvernproblemene som Google-kontoer har. SeERDDAP's[Orcid-autentiseringsinstruksjoner](/docs/server-admin/additional-information#orcid).. Takk til BCO-DMO (Adam Shepard, Danie Kinkade, etc.) ..
         
    * NEW: En ny URL-omformer konverterer utdaterte URL-adresser til oppdaterte URL-adresser.
Se .../erddap/convert/urls.html på alleERDDAP™installasjon, for eksempel
        [Denne lenken til konverteren iERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html).. Dette bør være nyttig for dataansvarlige. Dette brukes også internt av GenerationDatasetsXml. Takk til Bob Simons og Sharon Mesick.
         
    * IMPROVED: Den[Tidskonverter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)har nå alternativer til å konvertere en felles strengtid til en ISO8601-strengtid, eller konvertere enUDUNITS- som tidsenheter streng inn i en riktigUDUNITStidsenhetsstreng. Dette bør også være nyttig forERDDAP™administratorer som trenger å vite hvilket format som skal angis for attributeenhetene"-attributten for strengtidsvariabler. Dette brukes også internt av GenerererDatasetsXml og standardize. Takk til Bob Simons.
         
    * NEW: Den[Enheter Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)har en ny standardisert UD Units-alternativ.
For eksempel aredeg\\_C/m" og "grader\\_C meter1" konverteres begge til
 " grad\\_C m-1". Denne funksjonen brukes også av standardize Hvilken funksjon i EDDTableFromFiles. Takk til Bob Simons.
         
    * NY: For grafer (andre enn overflategrafer) på netdaps ogtabledap's Make A Graph websider, når x-aksen ikke er en tidsakse, hvis bare en undergruppe av x-aksen variabelens område er synlig, det er nå knapper over grafen for å flytte X-aksen venstre eller høyre. Takket være Carrie Wall Bell / Hydrofone prosjektet.
         
    * NEW: For grafer kan X og/eller Y-aksen nå bruke en loggskala.
Brukere kan styre Y-akseskalaen via en ny nedtrekks widget på rutenettet ogtabledapLag en grafisk nettside. Se[.xRange og . yRange dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange).. Takket være Carrie Wall Bell / Hydrofone prosjektet.
         
    * IMPROVED:ERDDAP™nå gjør bedre bruk av ulike HTTP-feilkoder og returnerer nå en(OPeN)DAPv2.0-formatert feilmelding nyttelast. Se[detaljer](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors).. Takk til Antoine Queric og Aurelie Briand.
         
    * IMPROVED: Ikke bruk Netcdf-java/c eller andre programvareverktøy til å koble til.nceller.hdffiler som betjenes avERDDAP/ files/ system som om de var lokale filer.ERDDAP™Nå avviser disse forespørselene. Det er utrolig ineffektivt og ofte forårsaker andre problemer. I stedet:
        
        * Bruk(OPeN)DAPKundeprogramvare å koble tilERDDAP'sDAPTjenester for datasettet (som har /griddap/ eller /tabledap/ i URL-en) .. Det er det somDAPFor og gjør det bra.
        * Eller bruk datasettets datatilgangsskjema til å be om en undergruppe av data.
        * Eller hvis du trenger hele filen eller gjentatt tilgang over lang tid, brukcurl,wget, eller nettleseren for å laste ned hele filen, deretter få tilgang til data fra din lokale kopi av filen.
        
          
         
    * IMPROVED: PåERDDAP™hjemmeside, Full Text Search er nå over " Se en liste over alle datasett" siden det er det beste utgangspunktet for de fleste brukere. Takk til Didier Mallarino og Maurice Libes.
         
    * IMPROVED: På DataProviderForm3.html Det er nå nedslagsliste over fellesstandard\\_nameS. Takk til noen på IOOS DMAC-møtet.
         
    * IMPROVED: På / filer/ nettsider er det nå en lenke til den nye " Hva kan jeg gjøre med disse filene?" delen av / filer/dokumentasjonen. Denne delen beskriver ulike filtyper og gir forslag til hvordan du jobber med dem. Takk til Maurice Libes.
         
    * INPROVED: Nesten alle forespørsler tilERDDAP™Bør være litt raskere, og noen ganger mye raskere.
         
    * BUG FIX: Under noen omstendigheter, når et EDDTable datasett lagret data i noen typer.ncFiler, den globale "id"-attributten ble satt til filens foreslåtte navn, som inkluderer en hash for å gjøre det unikt for den forespørselen. Nå - id - er riktig igjen uendret (dersom spesifisert) eller satt til datasettetsdatasetID  (dersom ikke spesifisert) .. Takk til John Maurer.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:**   
     
    * Å gjøre: Denne utgivelsen vil ta litt tid og arbeid fra deg. Vennligst vær tålmodig og planlegg å ta noen timer for å gjøre de nødvendige endringene og noen timer til å eksperimentere med nye funksjoner.
         
    * TO DO: For sikkerhet, lage en sikkerhetskopi av gjeldende oppsett.xml ogdatasets.xmlfiler slik at du kan gå tilbake til dem i det usannsynlige tilfellet der du må gå tilbake tilERDDAP™v1.82.
         
    * Å gjøre: Den anbefalteJavaer nå AdoptOpenJDKs OpenJDK 8 (LTS) + HotSpot.
Dette er en åpen kildekode variant avJavahar ingen restriksjoner på bruken (i motsetning tilOracle'sJavadistribusjon) .. Det stammer fraOracle'sJavapå gang, medOracleVelsignelse. Av sikkerhetsgrunner er det viktig å holde dinJavaversjon oppdatert. SeERDDAP's[Javainstallasjonsinstruksjoner](/docs/server-admin/deploy-install#java)..
         
    * Å gjøre: AdoptOpenJDKsJavatrenger et lite tillegg til Tomcat-installasjonen: se[Resources Cache instruksjoner](/docs/server-admin/deploy-install#contentxml).. Jeg tror at dette er en erstatning for -XX:MaxPermSize innstillingen, som (Adopt) OpenJDK støtter ikke lenger.
         
    * Å gjøre: Den nye standarden og anbefale&lt;fontFamily&gt; innstilling i setup.xml er
DejaVu Sans som er bygget inn i AdoptOpenJDKsJava.. Se
        [reviderte instruksjoner for installasjon av font](/docs/server-admin/deploy-install#fonts)..
         
    * Å gjøre: Mange tagger beveger seg fra setup.xml tildatasets.xml.. Fordelen er at du kan endre verdier mensERDDAP™kjører uten å starte på nyttERDDAP.. Du kan enkelt endre deg&lt;startBodyHtml5&gt; å vise en midlertidig melding påERDDAP™hjemmeside (f.eks. " Sjekk ut det nye JPL MUR SST v4.1 datasettet ..." eller " DetteERDDAP™vil være offline for vedlikehold 2019-05-08T17:00:00 PDT gjennom 2019-05-08T20:00:00 PDT.") .. Hvis/når du endrer disse taggene idatasets.xmlEndringene vil tre i kraft neste gangERDDAP™Leserdatasets.xml..
         
        
        1. Kopier dette innholdet til dindatasets.xmlfil (noen som helst i nærheten av starten av filen, etter&lt;ErddapDatasett&gt;:
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

        2. En etter én, kopier verdien (dersom noen) for hver av de taggene fra config.xml-filen til den nye etiketten som du nettopp limte inn (over) idatasets.xml.. Hvis du hadde brukt en verdi på 30 for&lt;cacheMinutes&gt; i setup.xml, bør du kopiere den verdien til den nye&lt;cacheMinutes&gt; tag indatasets.xml  (Selv om verdien er den samme som den nye standardverdien, er det best å bare forlate merket idatasets.xmltom) ..
            
Hvis din verdi er forskjellig fra den nye foreslåtte standarden (andre enn for&lt;startBodyHtml5 &gt; og&lt;ShortDescriptionHtml&gt;, som er nyttig for å tilpasse dinERDDAP™installasjon), må du vurdere å bytte til de nye standardverdiene. Dette gjelder særlig&lt;DelvisRequestMaxbytes &gt; og&lt;partiellRequestMaxCells&gt;, hvor standard/sugget verdi har endret seg betydelig gjennom årene.
            
Når du kopierer hver verdi, sletter taggen og dens beskrivelse fra config.xml. Det er bedre å ha disse taggene idatasets.xml.. I dag finnes det bedre beskrivelser i[setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file)..
            
        
En quirk i det nye systemet er at den aller første nettsiden når du starter oppERDDAPvil være standardERDDAP™Nettside. Hver etterfølgende nettside vil bruke ... Html-innholdet du angir idatasets.xml..
        
    * ADVARSEL: Første gang du kjørerERDDAP™v2.0, datasett basert på lokale datafiler vil laste **meget** sakte fordiERDDAP™må gjenskape sin database av filer i et litt annet format. Etter den langsomme første reload, vil de lastes raskt, som tidligere. Vær tålmodig.
         
#### EDDTableFraHttpGet{#eddtablefromhttpget} 
    *   [BIG NY FEature: EDDTABLEFromHttpGet](#eddtablefromhttpget)  
Inntil nå,ERDDAP™Bare les data og gjort det tilgjengelig for brukerne. Nå,ERDDAP™har et enkelt og effektivt system for å innta sanntidsdata fra sensorer. Blant andre funksjoner tilbyr dette datasettet finkornet versjon: det husker alle endringer gjort i datasettet, når det ble gjort, og av hvem. Vanligvis vil brukerne bare ha den nyeste versjonen av datasettet, med alle endringer som brukes. Men det er mulighet for brukerne å be om data fra datasettet som det var til enhver tid. Dette bidrar til reproducerbar vitenskap. I motsetning til de fleste andre datasett nær sanntid, er disse datasettene kvalifiserte for[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier).. fordi de møterDOIkrav om at datasettet ikke endres, bortsett fra ved sammenslåing. Se[EDDTableFraHttpGet](/docs/server-admin/datasets#eddtablefromhttpget).. Takk til OOI (For lenge siden og nå) for å snakke om behovet for dette og Eugene Burger for påminnelsen om å jobbe med det som er viktig.
         
    * Store nye ting:ERDDAP™kan nå betjene data direkte fra eksterne datafiler, inkludert.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, eller .Z. Datasett kan inneholde en blanding av eksternt komprimerte filer (Kanskje eldre datafiler?) og ikke-eksternt komprimerte filer, og du kan komprimere/dekompresse en fil når som helst.
        
Dette fungerer bra&#33;
I de fleste tilfeller er nedgangen relatert til å dekomprimere filene mindre. Vi oppfordrer deg til å prøve dette, spesielt for datasett og/eller datafiler som ofte brukes.
        
Dette kan spare deg $ 30 000 eller mer&#33;
Dette er en av de fåERDDAP™funksjoner som kan spare deg mye penger -- hvis du komprimerer mye datafiler, trenger du langt færre RAIDs / harddisker for å lagre dataene, eller omvendt, kan du betjene langt mer data (Opp til 10x) Med RAIDs du allerede har. Hvis denne funksjonen sparer deg fra å kjøpe en annen RAID, så har det spart deg rundt $ 30 000.
        
Se[Ekstern komprimert fildokumentasjon](/docs/server-admin/datasets#externally-compressed-files).. Takk til Benoit Perrimond og Paloma de la Vallee.
        
    * Store nye ting: AlleEDDGridFraFiler og alle EDDTableFromFiles datasett støtter en&lt;cacheFra Url&gt; tag og a&lt;cacheSizeGB&gt; tag. Hvis cacheSizeGB ikke er spesifisert, vil dette laste ned og opprettholde en fullstendig kopi av et eksternt datasetts filer. Hvis cacheSizeGB er spesifisert og er &gt;0, vil dette laste ned filer fra fjerndatasettet etter behov til en lokal cache med en begrenset størrelse, noe som er nyttig når du jobber med skybasert (f.eks. S3) Datafiler. Se[cache FraUrl dokumentasjon](/docs/server-admin/datasets#cachefromurl)for detaljer. Takk til Bob Simons og Roy Mendelssohn (som i mange år har skrevet skript for å håndtere lokale kopier av eksterne datasettfiler) , Lloyd Cotten, Eugene Burger, Conor Delaney (Da han var på Amazon Web Services) og Google Cloud Platform.
         
    * NEW: Den nye EDDTableFromJsonlCSV klasse kan lese tabelldata fra
        [JSON Linjer CSV-filer](https://jsonlines.org/examples/)  (Bedre enn CSV) .. Takk til folkene på Marine Institute of Ireland for å fortelle meg om dette formatet og til Eugene Burger og PMEL for forespørselen om å støtte det som en inngangstype.
         
    * NEW: AlleEDDGridog alle EDDTableFromFiles datasett støtter en&lt;nThreads&gt; innstilling, som fortellerERDDAP™Hvor mange tråder du skal bruke når du svarer på en forespørsel. Se[nThreads dokumentasjon](/docs/server-admin/datasets#nthreads)for detaljer. Takket være Rob Bochenek av Axiom Data Science, Eugene Burger, Conor Delaney (Da han var på Amazon Web Services) Google Cloud Platform.
         
    * Ny standardisering Hva for alle EDDTableFromFiles underklasser -
Tidligere, hvis for en gitt variabel, verdiene av de viktige attributtene (f.eks.scale\\_factor,add\\_offset,missing\\_value,  \\_FillValue, enheter) var ikke konsekvent, EDDTableFromFiles ville velge én verdi for hver attributt som skal være " gyldig" og markere filer med andre attributtverdier som "Bad Files". Nå er det et system til å standardisere filene så snart EDDTableFromFiles leser filene. Se[EDDTableFra Filens standardisering Hva](/docs/server-admin/datasets#standardizewhat).. En avERDDAPHovedmålene er å gjøre datafiler og datasett tilgjengelige på en konsekvent måte. standardisering Hva er et viktig nytt verktøy for å gjøre det til en realitet. Takket være Marco Alba, Margaret O'Brien (og andre EML-brukere) , BCO-DMO og InPort-brukere.
         
    * NYE EDDTableFromInvalidCRAFiles lar deg lage et datasett fra en samling avNetCDF  (v3 eller v4)  .ncfiler som bruker en spesifikk, ugyldig variant av CF DSG Contigous Tagged Array (CRA) Filer. Prøvefiler for denne type datasett kan finnes på https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Denne serveren er nå ikke pålitelig tilgjengelig\\].. Selv omERDDAP™støtter denne filtypen, det er en ugyldig filtype som ingen bør begynne å bruke. Grupper som for tiden bruker denne filtypen oppfordres sterkt til å brukeERDDAP™å generere gyldige CF DSG CRA-filer og slutte å bruke disse filene. Takk til Ajay Krishnan og Tim Boyer.
         
    * EDDTableFraTredderFiler og EDDTableFraHyraxFilene er nå utdatert. Bytt til EDDTableFromNcFiles (eller en variant) pluss&lt;cacheFromUrl&gt;. Hvis det ikke fungerer av en eller annen grunn, e-posterd.data at noaa.gov.. Hvis det ikke er noen klager før 2020, kan disse datasettstypene fjernes.
         
    * IMPROVED -- Systemet for automatisk konvertering av ikke-ISO 8601 ganger til ISO 8601 ganger (introdusert i v1.82) har blitt kraftig utvidet for å håndtere et stort antall ekstra formater. Dette påvirker GenererDatasetsXml ogERDDAPhåndtering av kildemetadata.
         
    * IMPROVED -- Med sin tredje store revisjon av String time-tolkingssystemet (Forhåpentligvis den siste) ,ERDDAP™Bruker ikke lengerJavaDateTimeFormater på grunn av feil som noen ganger påvirker ekstreme tider (år&lt;= 0000).ERDDAP™Nå bruker sitt eget system til å tolke tidsstrenger.
         
    * ADVARSEL: Det nye String time parsing systemet er noe strengere. Hvis et av datasettene plutselig har bare manglende verdier for tidsverdier, er årsaken nesten sikkert at tidsformatstrengen er litt feil. Det bør være feilmeldinger i loggen. txt relatert til tidsverdier som ikke matcher tidsformatet - som bør hjelpe deg å fikse tidsformatstrengen for det datasettet. Hvis du trenger hjelp, bruk alternativet iERDDAPTidskonverter som "Konverter\\[s\\]enhver vanlig strengtid til en ISO 8601-strengtid -- det indikerer formatet som omformeren brukte til å tolke kildestrengen.
         
    * FORSLAG: Den raskeste, enkleste og billigste måten å fremskyndeERDDAPtilgang til tabelldata er å legge datafilene på en solid State Drive (SSD) .. De fleste tabellbaserte datasett er relativt små, så en 1 eller 2 TB SSD er sannsynligvis tilstrekkelig til å holde alle datafilene for alle dine tabelldatasett. SSD er til slutt slitt ut hvis du skriver data til en celle, sletter den og skriver nye data til den cellen for mange ganger. I stedet anbefaler jeg det (Så mye som mulig) Du bare bruker SSD til å skrive dataene en gang og lese dem mange ganger. Så, selv en forbruker-klasse SSD bør vare svært lenge, sannsynligvis mye lenger enn noen harddisk (HDD) .. Forbrukerklasse SSD er nå billig (i 2018, ~$200 for 1 TB eller ~$400 for 2 TB) Prisene faller stadig raskt. NårERDDAP™tilgang til en datafil, en SSD tilbyr begge
        
        * kortere latens (~0.1ms, versus ~3ms for en HDD, versus ~10 (?) ms for en RAID, versus ~ 55ms for Amazon S3) , og
        * høyere gjennomstrømning (~500 MB/S, mot ~75 MB/s for en HDD mot ~500 MB/s for en RAID) ..
        
Så du kan komme opp til en ~ 10X ytelsesforsterkning (vs en HDD) For 200 dollar&#33; Sammenlignet med de fleste andre mulige endringer i systemet ditt (En ny server for $ 10.000? En ny RAID for $ 35 000? Ny nettbryter for 5000 dollar? etc.) Dette er langt den beste avkastningen på investering (ROI) .. Hvis serveren ikke er lastet med minne, er ekstra minne for serveren din også en god og relativt billig måte å fremskynde alle aspekter avERDDAP..
        \\[SSD vil også være bra for nettbaserte data, men de fleste nettbaserte datasett er mye større, noe som gjør SSD svært dyrt.\\]  
         
    * NEW: Alle som er logget på får rolle=\\[Hvem som helst I\\]Selv om det ikke er noe&lt;bruker&gt; tag for dem idatasets.xml.. Hvis du setter datasettets&lt;tilgjengeligTil&gt;\\[Hvem som helst I\\]Alle som har logget seg påERDDAP™  (f.eks. via deres Gmail- eller Orcid-konto) vil ha tilgang til datasettet, selv om du ikke har angitt et&lt;bruker&gt; tag for dem idatasets.xml.. Takk til Maurice Libes.
         
    * IMPROVED: DenUDUNITS/UCUM enheter konverter ble mye forbedret.
Det håndterer ugyldige enheter strenger bedre (starter med vekt på å bevare informasjon, i stedet for å håndheve gyldighet) .. Resultatene har nå en standardisert syntaks.
         
    * NEW: DenUDUNITS/UCUM enheter konverter har et nytt alternativ til å standardisere enUDUNITSstreng.
Dette fungerer bra for gyldigUDUNITSstrenger og rimelig godt for ikke-standard / ugyldigUDUNITSstrenger. For eksempel,UDUNITS="meter per sekund", "meter/sekund","m.s^-1", og"m s-1"vil alle komme tilbake - m.s-- Dette var nødvendig for den nye standarden Hvilket system som er beskrevet ovenfor. Takket være Marco Alba, Margaret O'Brien (og andre EML-brukere) , BCO-DMO og InPort-brukere.
         
    * NEW: EDDTableFromMultidimNcFiles har nå en[behandlingDimensioner](/docs/server-admin/datasets#treatdimensionsas)alternativet, det fortellerERDDAP™å behandle visse dimensjoner (For eksempel LAT og LON) Som om de var andre dimensjoner (f.eks. TIME) .. Dette er nyttig for noen feil filer som bruker ulike dimensjoner for ulike variabler når de skulle ha brukt bare én dimensjon (f.eks. TIME) .. Takk til Marco Alba og Maurice Libes.
         
    * NY: Nå, alleEDDGridFra... Filer datasett støtter en ny spesialaksesourceNamesom fortellerERDDAP™å trekke ut informasjon fra filenName (bare filename.ext) og bruk verdien til **erstatte** den eksisterende venstre lengste akseverdi. Formatet er
        \\*\\* \\ * replaceFromFileName,_ dataType_,_extractRegex_,_captureGroupNumber_
Se[denne dokumentasjonen](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata).. Takket væreNOAAPathfinder Daglig samling datasett.
         
    * NY: Nå, alleEDDGridFra... Filer datasett støtter en ny spesialaksesourceNamesom fortellerERDDAP™å trekke ut informasjon fra filstienName (kataloger + filename.ext)   
        \\*\\* \\*veinavn,_ dataType_,_extractRegex_,_ captureGroupNumber_
For dette bruker stinavnet alltid'/'som katalogsepareringstegnet, aldri \"\\\".
Se[denne dokumentasjonen](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata).. Takket være Paloma de la Vallee.
         
    * Nyhet: Nå, alle EDDTableFra... Filer datasett støtter ytterligere pseudovariabelsourceNames som trekker ut informasjon fra filens filName (bare filename.ext)   (se[\\*\\* \\* filName](/docs/server-admin/datasets#filename-sourcenames)) eller fra hele filstienName (/dir1/dir2/filename.ext)   (se[\\*\\** stiName](/docs/server-admin/datasets#pathname-sourcenames)) .. Takket være Paloma de la Vallee.
         
    * NEW: Hvis enEDDGridDatasettet har én eller flere svært store dimensjoner (For eksempel millioner av verdier) som tar opp mye minne, kan du sette den nye [&lt;dimensjonValuesInMemory&gt;] (/docs/server-admin/datasett#dimensjonverdierinminne) innstilling til falsk (Standard er sant) , som får datasettet til å lagre verdiene på disken og hente dem når det trengs. Takk til David Rodriguez og Rich Signell (re:EDDGridFraAudioFiles) ..
         
    * IMPROVED: Tidligere, hvis du omorganisertedataVariables for en EDDTableFromFiles datasett og lastet datasettet på nytt, EDDTableFromFiles ville lese alle datafilene på nytt. Nå kan det håndtere ombestillingen uten å lese om alle datafilene. Takk til Roland Schweitzer.
         
    * IMPPROVED: Nå, nårERDDAP™Leser ASCII, NCCSV og JSON Lines CSV-tabelldatafiler, hvis den finner en feil på en gitt linje (For eksempel feil antall elementer) , det logger en advarselsmelding ( " VARNING: Hoppe over linje #"... " uventet antall elementer...") til[log.txt-fil](/docs/server-admin/additional-information#log)og fortsetter å lese resten av datafilen. Derfor er det ditt ansvar å se regelmessig (eller skrive et skript å gjøre det) For den meldingen i loggen. txt slik at du kan løse problemene i datafilene.ERDDAP™er satt opp slik at brukerne kan fortsette å lese alle tilgjengelige gyldige data selv om noen linjer i filen har feil. Tidligere,ERDDAP™merket filen som " dårlig" og fjernet den fra datasettet.
         
    * IMPROVED: Når nøyaktige tider (f.eks. til nærmeste andre eller millisekund) lagres i kilden som minutter siden ... (eller større enheter) ,ERDDAP™nå runder dem til nærmeste millisekund når du leser verdiene iERDDAP.. Ellers er flytende punkt tall blått og forespørsler om data til bestemte tidspunkter (For eksempel, &time=2018-06-15T01:30:00) vil mislykkes. Tidligere beregnet det dem så nøyaktig som mulig (og likevel gjør hvis enhetene er f.eks. " sekunder siden ..." eller "milli sekunder siden ...") .. Det er best å unngå dette problemet ved ikke å bruke store enheter (f.eks. minutter eller timer) å lagre nøyaktige tidsverdier (f.eks. mikrosekunder) -- Datamaskiner gjør en dårlig jobb med å håndtere desimalsiffer. Takk til Marco Alba.
         
    * Endringer til EDDTabellFraEDDGridsom gjør det mye bedre. EDDTableFraEDDGridlar brukere spørre gitte datasett som om de var tabulær datasett ("Ved verdi by) ..
        
        * Den støtter nå en&lt;maxAxis0&gt; tag (standard=10) som angir det maksimale antall akser\\[0\\]  (vanligvis"time") verdier som kan spørres samtidig. Dette hindrer naive forespørsler fra å få EDDTableFromEDDGridå søke gjennom et helt datasett (som ville mislykkes med en tidsavbruddsfeil) ..
        * Opprett datasett Xml har nå et alternativ til å generere EDDTableFromEDDGriddatasett for alle datasettene i gittERDDAP™som matcher et spesifisert regulært regulært uttrykk (bruk .\\* for å matche alle datasett) .. Datasettene som den oppretter har ytterligere informasjon i den sammendragsattributten som indikerer at dette er en tabellversjon av et gitt datasett. Og deresdatasetIDerdatasetIDav det nettbaserte datasettet, pluss "__Asatable".
        * Det er en stor hastighet for det vanligste oppsettet: når det gitte datasettet er etEDDGridFraErddap datasett som er i sammeERDDAP..
        
Takk til James Gallagher og Ed Armstrong.
         
    * NEW: Skap Datasett Xml for alle typer datasett er nå mye mer sannsynlig å legge til en \\_FillValue ellermissing\\_valueattributt til en numerisk variabeladdAttributes.. Dette skjer for eksempel når streng mangler verdimarkører (f.eks., "."."." "?"?" " "NANANANA " " " " " "NaNa ") for den variabelen i prøvefilen konverteres tilERDDAPInnfødte manglende verdier (127 i bytekolonner, 32767 i korte kolonner, 2147483647 i intense kolonner, 9223372036854775807 i lange kolonner, og NaN i flytende og doble variabler) .. Det oppstår også for NaN-verdier i flytende og doble variabler. Også -nd - ble lagt til listen over vanlige manglende verdi markører i numeriske datakolonner somERDDAP™Jeg burde se etter. Takket være Matt Biddle of BCO-DMO.
         
    * IMPROVED: ncdump alternativet i å generere Datasett Xml er nå mer som ncdump (men fortsatt bruker netcdf-java versjonen av ncdump) .. Nå skriver det ut en ny liste over alternativer. Nå, for.ncml-filer, det skriver ncdump-utgangen for resultatet av.ncml filendringer påført de underliggende.nceller.hdffil.
         
    * BUG FIX: Det var en filhåndtak lekkasje (Til slutt forårsakerERDDAP™å fryse opp) forårsaket ved å opprette noen typer utgangsfiler, for eksempel .geotif, spesielt når det oppstod feil under opprettelsen. Jeg tror/håpner at dette nå er løst. Hvis du fortsatt ser problemer, vennligst fortell meg typen datasett (rutenett eller tabell) og filtypen som forårsaker problemet. Takket være Steven Beale, Lynn DeWitt, Jibei Zhao og andre.
         
    * BUG FIX: DenWMS Leafletdemo konverterte ikke fullstendig/proporsjonelt den dype aksen til -reservasjon - Det gjør det, og de ødelagte legendeforespørsler er løst. Også alle aksealternativer i rullegardinlistene er alltid i stigende sortert rekkefølge. Takk til Antoine Queric og Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles støtter nå riktig begrensninger på strengvariabler som ble opprettet fra tegnvariabler i datafilene. Takk til Antoine Queric og Aurelie Briand.
         
    * BUG FIX: Nå, når et datasett blir utilgjengelig, forsøker datasettet å varsle (med meldingen " Dette datasettet er for tiden utilgjengelig.") sine abonnenter, listede handlinger, rss og lonPM180 datasett som er avhengige av det. Takk til Roy Mendelssohn og Bob Simons.
         
    * BUG FIX: To feil relatert til EDDTableCopy. Takk til Sam McClatchie.
         
    * IMPROVED: Antall mislykkede forespørsler som vises på status.html siden vil øke fordi flere ting regnes som feil enn tidligere.
         
    * IMPROVED:ERDDAPStatus.html viser nå "Requests (Middeltid i ms) I tidsserien. Tidligere viste det median ganger forkortet til heltallsekunder.
         
    * IMPROVED: I Jsonld-utgangen kommer jsonld-navnet" nå fra datasettets"title"iERDDAP, og jsonld-headline - nå kommer fra datasettetdatasetID" iERDDAP.. Tidligere var det omvendt. Dette virker galt for meg fordi i vanlig engelsk bruk, -navn - vanligvis er en kort, (ideelt) unik identifikator som sjelden/aldri endres (For eksempel Robert Middlename Simons) , ikke en beskrivelse som ikke er unik og som enkelt og ofte kan endres (For eksempel, en fyr som skriver programvare forNOAA" vs. " En høy fyr som skriver programvare forNOAA") .. Gee, det ville være bra hvis skjema.org definisjonen av[Navn](https://schema.org/name), i sammenheng med et datasett, var mer spesifikk. Programvareutviklere bør kunne skrive en implementering av en spesifikasjon basert på spesifikasjonen alene, uten veiledning fra eksperter. Men jeg utsetter meg til Google (Spesielt Natasha Noy) , NCEI (særlig John Relph) Rob Fuller.
         
    * IMPROVED: I jsonldutgangen er de fire "spatialCoverage GeoShape-boksen" verdier nå minLat minLon maxLat maxLon. Tidligere var lat- og lonposisjonene snudd. Gee, det ville være bra hvis skjema.org definisjonen av[GeoShape](https://schema.org/GeoShape)angitt riktig rekkefølge. Programvareutviklere bør kunne skrive en implementering av en spesifikasjon basert på spesifikasjonen alene, uten veiledning fra eksperter. Takk til Natasha Noy og Rob Fuller.

## Versjon 1.82{#version-182} 
 (utgitt 2018-01-26) 

*    **Nye funksjoner (for brukere) :)**   
     
    * Mange subtile endringer i utseendet påERDDAP™nettsider.
        * IMPROVED:ERDDAP™Nå bruker HTML 5 og gjør bedre bruk av CSS.
        * IMPROVED: Nettsidene har blitt litt modifisert for å gjøre dem renere og mindre " travle". (De er fortsatt tette og det er fortsatt ting man kan klage på, men forhåpentligvis mye mindre enn tidligere.) Takk til John Kerfoot for noen kommentarer.
        * IMPROVED: Nettsidene ser nå mye bedre ut på mobiltelefoner og andre små enheter, spesielt hvis du bruker dem i landskapsorientering. De ser også bedre ut i svært små og svært store vinduer i desktop nettlesere.
        * IMPROVED: For å forbedre sikkerheten og andre grunner, bruk av en utdatert Openlayers-versjon forWMSDemonstrasjonssider er erstattet avLeaflet..
        * NEW: støtte for forhåndsvisning av bilde, lyd og videofiler i"files"systemet (For eksempel[dette testdatasettet](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) og i.htmlTablesvar når en celle har URL til et bilde, lyd eller videofil (For eksempel[Forespørselen](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) .. Hvis du sveve over et «?»-ikon, bør du se et bilde, lyd- eller videofilvisning. Du kan også klikke på fillenken for å vise filfullskjermen i nettleseren. Se[Dokumentasjon for mediefiler](/docs/server-admin/datasets#media-files).. Merk at forskjellige nettlesere støtter ulike filtyper, så eksemplene kan ikke fungere i nettleseren din.
Takket være disse personene/lenkene for ideer og prøvekode for CSS-bare bilde-brikker (var på https://codepen.io/electricalbah/pen/eJRLVd ) og utsett bildelasting (var på https://varvy.com/pagespeed/defer-images.html )   (Selv om koden ble endret før bruk iERDDAP) ..
Takket være Cara Wilson, Matthew Austin og Adam Shepherd/BCO-DMO for forespørsler om bildestøtte.
Takket være Jim Potemra, Rich Signell, OOI og Carrie Wall Bell for forespørsler om støtte for audio/hydrofonfil.
Takk til OOI for å vise behovet for videostøtte.
        * NYHET: En undergruppe av data fra alleERDDAP™Datasett (men vanligvis et datasett fra lydfiler) kan nå lagres i en .wav-lydfil. ([dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Takket være Jim Potemra, Rich Signell, OOI og Carrie Wall Bell for forespørsler om støtte for audio/hydrofonfil.
        * IMPROVED: Format for web-tilgjengelige mapper (WAF)   (For eksempel / filer/ mapper) Har blitt oppdatert til å bruke en HTML-tabell. Det nye formatet etterlikner den nyere versjonen av kataloglisten nettsider opprettet av nyere versjoner av Apache. Menneskene vil finne at endringene gjør informasjonen lettere å lese. Programvare som tolker disse dokumentene (For eksempel programvare som høster ISO 19115 dokumenter fraERDDAP) Det nye formatet må revideres, men det vil være lettere å tolke enn det forrige formatet. (Vær oppmerksom, Anna Milan.) 
        * NyoutOfDateDatasets.htmlside. ([eksempel](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Denne nettsiden viser en tabell med alle de datasettene som er i nærheten av tiden.&lt;testOutOfDate&gt; tag (Se nedenfor) , rangert etter hvor utdatert datasettene er. Dette instrumentbordet bør være nyttig forERDDAP™administratorer og sluttbrukere når de vil vite hvilke datasett som er utdatert. For utdaterte datasett er det sannsynligvis et problem med datakilden, slik atERDDAP™Kan ikke se/hente data fra nyere tidspunkt.
Administratorer: Hvis du ikke ønsker en Out-Of-Date Datasetts nettside, legger dette til i config.xml:
            &lt;UtOfDateDatasettAktive&gt;falske&lt;/outOfDateDatasettActive &gt;
Det er nåtestOutOfDateog ut AvDato-kolonner iallDatasets- Datasett.
Takket være Bob Simons, som har ønsket dette i årevis, og til de smarte folkene på Irlands Marine Institute som ga meg inspirasjonen via deres dedikerte bringebær Pi og skjerm som alltid viser en skjerm som dette på kontoret.
        * IMPROVED:.htmlTableog.xhtmlresponsen er nå bedre formatert, mer kompakt og dermed laste raskere. Takk til HTML5 og CSS.
    * Ny utgangsfiltype for netadap datasett: .timeGaps. Den viser en liste over hull i tidsverdiene som er større enn mediangapet. ([eksempel](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Dette er nyttig forERDDAP™administratorer og sluttbrukere når de vil vite om det er uventede hull i tidsverdiene for et datasett som forventes å ha regelmessige tidsverdier. Takk til Bob Simons og Roy Mendelssohn som trengte denne funksjonen.
    * IMPROVED: Standard graf forallDatasetsdatasett er nå et kart med x=maxLon og y=maxLat. Takket være John Kerfoot, Rich Signell og OOI-CI.
    * Nyhet:[erdapy](https://github.com/ioos/erddapy)-- er ikke enERDDAP™funksjon, men vil være av interesse for mangeERDDAP™brukere. Erddapy (ERDDAP™+Python) er enPythonbibliotek opprettet av Filipe Fernandes som - tar fordel avERDDAP'sRESTfulInternett-tjenester og skaperERDDAP™URL for enhver forespørsel som å søke etter datasett, kjøpe metadata, laste ned data etc." Takk til Filipe Fernandes.
    * Jeg burde ha nevnt tidligere: Det er en tredjeparts R-pakke designet for å gjøre det lettere å jobbe medERDDAP™Innenfor R:[rerddap](https://github.com/ropensci/rerddap#rerddap).. Takket være[rOpenSci](https://ropensci.org/)Roy Mendelssohn.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:**   
     
    * Å gjøre: I config.xml, nedenfor&lt;adminInstitution&gt;, vennligst legg til en&lt;adminInstitutionUrl&gt; tag som spesifiserer en URL for institusjonen din (eller gruppe) ..
    * TO DO: Disse 3 taggene i setup.xml brukes ikke lenger:
        &lt;start HeadHtml&gt;,&lt;startBodyHtml&gt; og&lt;endBodyHtml&gt;. De er erstattet av
        &lt;startHeadHtml5&gt;,&lt;startBodyHtml5 &gt; og&lt;endBodyHtml5&gt;, som har standardverdier angitt i meldinger.xml (og vist nedenfor) ..
        
Vi anbefaler å bruke standarden&lt;startHeadHtml5&gt; og&lt;endBodyHtml5&gt;.
Vi anbefaler: Hvis du har gjort endringer i originalen&lt;startBodyHtml&gt; og/eller ønsker å tilpasse dinERDDAP™Vennligst kopier det nye&lt;startBodyHtml5&gt; tag (Nedenfra) i config.xml og endre det for å tilpasse dinERDDAP™slik atERDDAPNettsidene reflekterer organisasjonen din, ikkeNOAA ERD.. Spesielt, vennligst endre -Brought til deg ved - til din organisasjon (s) .. Hvis du trenger hjelp, vennligst e-posterd.data at noaa.gov.. (Hvis du ikke vil tilpasse dinERDDAP™Nå, bruk standard&lt;startBodyHtml5&gt;.)
        
Deretter sletter du 3 gamle tagger i setup.xml som ikke lenger brukes.

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

Det finnes flere måter du kan[tilpasseERDDAP™](/docs/server-admin/deploy-install#customize)såERDDAPNettsidene reflekterer organisasjonen i stedet forNOAA ERD..
        
    * Å gjøre:&lt;EDDGrid...Example&gt; tags (starter med&lt;EDDGridIdExample&gt;) og&lt;EDD-tabell... Eksempel &gt; tagger (starter med&lt;EDDTableIdExample&gt;) i config.xml-filen brukes til å opprette eksempler i rutenettet ogtabledapdokumentasjon. html nettsider i dinERDDAP..
        
Hvis du ikke tilpasset disse taggene, vennligst slette dem fra config.xml filen. Nå har de alle standarder i messages.xml som refererer til datasett i BobsERDDAP™på https://coastwatch.pfeg.noaa.gov/erddap/index.html .. Så du trenger ikke lenger å ha spesifikke datasett i dinERDDAP.. Hvis du vil overstyre standardene, kopiere noen eller alle disse taggene i config.xml og endre deres verdier.
Hvis du vil at eksemplene skal peke på dinERDDAP™Den enkleste metoden er:
        
        1. Inkluder disse to datasettene i dinERDDAP™ved å legge dette til dindatasets.xml:)
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Legg denne etiketten til config.xml, men endre URL til dinERDDAP's (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Hvis du har tilpasset disse taggene, la dem som det er, og vennligst legg til disse 2 nye taggene i config.xml å spesifisereERDDAP™URL for disse datasettene, men endre URL til dinERDDAP's (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * Å gjøre:ERDDAP™Nå bruker en css-fil som heter erddap2.css. Hvis du gjør endringer i\\[tomcat\\]/webapps/erddap/images/erddap.css, vurdere å gjøre lignende endringer til erddap2.css (i samme mappe) ..
    * Nyhet:ERDDAPnettsider har nå et stort antall nesten usynlige interne lenker (Teksten er svart og ikke understreket) .. Hvis du sveve over en av disse linkene (Vanligvis de første ordene i overskrifter og avsnitt) Og markøren blir en hånd. Hvis du klikker på lenken, er URL-adressen den interne lenken til den delen av dokumentet. Dette gjør det enkelt å referere til bestemte deler av dokumentasjonen. Takk til Bob Simons som har ønsket dette i årevis.
    * Nyhet:ERDDAP™Nå støtter[Byte Range / Accept-Ranges](https://en.wikipedia.org/wiki/Byte_serving)forespørsler om deler av / filer/ filer. Dette var nødvendig for å støtte lyd og video seere i nettlesere.
    * Å gjøre: Nå, for å forbedre sikkerheten, hvis du spesifisert&lt;baseHttpsUrl&gt; i setup.xml (og dermed støttehttps) Det anbefalte flagget Url er ethttpsURL med et sikrere flaggKey. I så fall vil tidligere flaggUrls/flagKeys bli ugyldig. Administrasjon: Hvis disse endringene gjelder dinERDDAP™Hvis dinERDDAP™harEDDGridFraErddap og EDDTable FraErddap er den som abonnerer på fjernkontrollenERDDAPNår du har oppdatertERDDAP, dinERDDAP™vil automatisk prøve å abonnere på det nye flaggetUrl, så du bør slette de gamle abonnementene og validere de nye abonnementene når du får den nye abonnementsvalideringen e-post.
    * Å gjøre: Hvis dinERDDAP™harEDDGridFraErddap datasett for erdVH3 datasett på Bob's coastwatchERDDAP™Endre dem til å referere til de nye erdVH2018-datasettene.
    * TO DO: Hvis du inkluderer noen av jplAquariusSS-prøvedatasettene i dinERDDAP™, vennligst endre "V4" idatasetID- til V.
    * Å gjøre:actual\\_rangeer nå en CF standard-attributt (fra CF-1,7) og klart sier at hvis variabelen brukeradd\\_offsetog/ellerscale\\_factorå pakke dataverdier, deretteractual\\_rangeverdier bør bruke den utpakkede datatypen og pakkes ut. Dette er i konflikt med tidligere råd. Opprett datasett Xml pakker nå pakketactual\\_rangeverdier, men det vil ikke fikse eksisterende datasett i dindatasets.xmlfil.
        
Så kontroller datasettene dine: Hvis variabelens verdier er pakket og hvisactual\\_rangeer spesifisert som pakkede dataverdier, vennligst legg til en&lt;addAttributes&gt;actual\\_rangeverdi for å angi de utpakkede verdiene. Ellers vil datasettet ikke laste innERDDAP.. En enkel og nesten perfekt måte å gjøre dette på er å søkedatasets.xmlfor kilde Attribut som har
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
og ascale\\_factorandre enn 1.0. Det er detactual\\_rangeAttribut som du kan måtte fikse.
        
For aksevariabler iEDDGriddatasett,ERDDAP™Sett alltidactual\\_rangeattributt å være det faktiske spekteret av verdiene siden den kjenner disse verdiene.
        
For aksevariabler med nedadgående verdier (f.eks. noen breddegradsvariabler) ,ERDDAP™opprettetactual\\_rangemed\\[0\\]...\\[siste\\]verdier, som var høye... lav. Nå bruker det alltid lave verdier for å lage den nye CF-definisjonen.
        
Korreksjonen avactual\\_rangeverdier er spesielt viktige for EDDTable datasett, fordiERDDAP™vil raskt avvise brukerforespørsler om dataverdier som er mindre ennactual\\_rangeminimum verdi eller som er større ennactual\\_rangehøyeste verdi.
        
Relatert: faktisk\\_min, faktisk\\_max,data\\_minogdata\\_maxAttributene er nå utdatert. Konverter dine datasett til brukactual\\_rangeI stedet.
        
    * Å gjøre (valgfri, men anbefalt) :) For hvert datasett i nærheten og værvarsel i dinERDDAP™Legg til en [&lt;testOutOfDate&gt;] (/docs/server-admin/datasett#testoutofdate) Tagge med en verdi i skjemaetnow-_enheter_, f.eks.now-2 dager. Hvis den maksimale tidsverdien for datasettet er eldre enn den verdien, anses datasettet som utdatert og vil bli merket som slik på[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)Nettside. Dette gir en enkel måte å se når noe er galt med et datasetts kilde.
    *   [NEW: Semantisk merking av datasett med Json-ld (JSON Linkede data) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™Nå bruker[Json-ld (JSON Linkede data) ](https://json-ld.org)å gjøre din datakatalog og datasett en del av[Semantisk web](https://en.wikipedia.org/wiki/Semantic_Web), som er Tim Berners-Lees ide om å gjøre webinnhold mer maskinlesbar og maskin " klarere". Søkemotorer ([Særlig Google](https://developers.google.com/search/docs/data-types/datasets)) og andre semantiske verktøy kan bruke denne strukturerte markeringen for å lette oppdagelse og indeksering. Json-ld strukturert markering vises som usynlig-til-mennesker&lt;script&gt; kode på http://.../erddap/info/index.html Nettside (som er en semantisk web[DataCatalog](https://schema.org/DataCatalog)) og på hver http://.../erddap/info/_datasetID_/index.html Nettside (som er en semantisk web[Datasett](https://schema.org/Dataset)) .. (Spesielt takket være Adam Leadbetter og Rob Fuller fra Marine Institute i Irland for å gjøre de harde delene av arbeidet for å gjøre denne delen avERDDAP..) 
    * NEW: Det er nye datasetttyper som kan lese data fra lydfiler:
        [EDDGridFraAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), som behandler lyddata som gitte data.
        [EDDTableFraAudioFiler](/docs/server-admin/datasets#eddfromaudiofiles), som behandler lyddata som tabelldata. Takket være Jim Potemra, Rich Signell, OOI og Carrie Wall Bell for forespørsler om støtte for audio/hydrofonfil.
    * Endringer i genereredatasett Xml (og relaterte endringer) :)
        * Nyhet:ERDDAP™Nå har et system å automatisk[oppdatere utdaterte URLer](/docs/server-admin/additional-information#out-of-date-urls)begge i Generer Datasett Xml og når datasett lastes. Hvis du har forslag til ytterligere webadresser som bør fanges og oppdateres, eller hvis du mener at dette bør bli gjort til en tjeneste (som omformerne) , vennligst e-posterd.data at noaa.gov..
        * NEW: Nå hvis Genererer Datasett Xml ser en CFstandard\\_name  (som alle bør være små) med en stor bokstav, legger det til alle små bokstaver versjon til&lt;addAttributes&gt;. Også når et datasett laster, hvisERDDAP™Ser en CFstandard\\_namemed en stor bokstav, det stille endrer det tilstandard\\_name.. Takk til Rich Signell.
        * NEW: Nå hvis Genererer Datasett Xml ser en attributt med en tid som ikke er i ISO 8601-format, den legger til ISO 8601 formatert tid til&lt;addAttributes&gt;. HvisERDDAP™gjenkjenner ikke formatet, det etterlater tidsverdien uendret. Hvis du ser et format somERDDAP™gjenkjenner ikke og fikser, vennligst send det tilerd.data at noaa.gov..
        * IMPROVED: Den lave nivåkoden forEDDGridFraThredds Katalogvalg i Genererer Datasett Xml er nå avhengig avUnidatanetcdf-java katalog crawler kode (treder. katalogklasser) slik at det kan håndtere alle THREDDS kataloger (som kan være overraskende komplekse) .. Takk til Roland Schweitzer for å foreslå denne endringen og takket væreUnidataFor koden.
        * NEW: Genererer datasett Xml forEDDGridFraDap legger nå til -, startyear-endyear - til slutten av tittelen basert på faktiske tidsakseverdier. Endyear="present" hvis det finnes data de siste 150 dagene.
        * NEW: Genererer datasett Xml forEDDGridFra Dap tilføyer nå "\\[Oppløsning\\]°" til tittelen hvis datasettet er jevnt fordelt og det samme for lat og lon.
        * IMPROVED: Tidskonverteren har nå flere funksjoner, spesielt evnen til å konvertere strengetider i et bredt utvalg av vanlige formater til ISO 8601-strenger eller til et UD Units-kompatibelt nummer. Alle tidligere støttede funksjoner fortsetter å fungere, uendret.
        * BUG FIX: Genererer datasett Xml og nøkkelordskonverteren inkluderer nå " Earth Science &gt; " i starten av GCMD Science Nøkkelord. Når et datasett lastes innERDDAP™,ERDDAP™nå fikser noen GCMD søkeord i nøkkelord attributten som ikke starter med " Earth Science &gt; " eller som bruker noe annet enn tittel tilfelle (hvor det første bokstaven i hvert ord er kapitalisert) ..
        * IMPROVED: Når det foreslås&lt;destinationName&gt;'s, Genererer datasett Xml for EDDTableFra AsciiFiles brukte bare haleenden påsourceNamemed'/'  (Noen var filnavn-lignende) .. Nå bruker den helesourceName(f.eks. "blahblahblah (m/s)". Denne endringen vil være god for noen datasett og ikke for andre, men det er tryggere oppførsel. Takk til Maurice Libes.
        * BUG FIX: Genererer datasett Xml og datasettkonstruktørene sikrer nå at det ikke finnes dupliserte kolonnenavn. Takk til Maurice Libes.
        * BUG FIX: Genererer datasett Xml for EDDTableFromAsciiFiles skrev ikke&lt;columnSeparator&gt; til utgangen. Nå gjør det det. Takk til Maurice Libes.
    * NEW: DasDds-verktøyet skriver nå ut tidsgapinformasjon (den[.timeGaps informasjon](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) Hvis datasettet er et gitt datasett.
    * NEW: Avansert søk aksepterer nå " nå_---nUits_" tidsverdier. Takk til Rich Signell.
    * IMPROVED: For å forbedre sikkerheten, når en e-postadresse i et datasetts metadata eller data er skrevet til en HTML-webside, erstattes "@" med " på ". Dette fanger bare e-postadresser som er hele metadata- eller dataverdien, ikke e-postadresser innebygd i lengre verdier.
    * For å øke sikkerhetenRSSinformasjon for private datasett er nå kun tilgjengelig for brukerne (ogRSSLesere) som er logget inn og autorisert til å bruke dette datasettet.
    * NEW: Nå når et datasett er lastet, hvisdate\\_created,date\\_issued,date\\_modified, eller dato\\_metadata\\_modifisert attributt har en tidsverdi som ikke er i ISO 8601-format,ERDDAP™endrer det til ISO 8601 formatert tid. HvisERDDAP™gjenkjenner ikke formatet, det etterlater tidsverdien uendret. Hvis du ser et format somERDDAP™gjenkjenner ikke og fikser, vennligst send det tilerd.data at noaa.gov..
    * IMPROVED: .dods svar fraEDDGridDatasett bør nå være betydelig raskere. Takk til Rich Signell.
    * Endringer relatert tilERDDAPOpprettelse av ISO 19115 dokumenter:
        * BUG FIX: Når du oppretter ISO 19115 dokumenter,dataVariableenheter var ikke HTML-attributt kodet og prosent kodet. Nå er de det. Takket være NGDCs ISO 19115 validerer.
        * BUG FIX: Når du oppretter ISO 19115 dokumenter,date\\_createdble brukt som det er, så ofte var feil format. Nå konverteres den til ISO 8601 Z-streng. Takket være NGDCs ISO 19115 validerer.
        * BUG FIX: Når du oppretter ISO 19115 dokumenter,ERDDAP™Nå lengre skrive datoer med år = 0000 (som med climatologi datasett) , fordi ISO 19115 skjemaet ikke tillater datoer med år = 0000. Takket være NGDCs ISO 19115 validerer.
    * NEW: Som før forespørsel tilhttp.../erddap/versjon vil returnere bare versjonsnummeret (som tekst) f.eks.ERDDAP\\_versjon=1.82".
En forespørsel tilhttp.../erddap/version\\_streng vil returnere et tall og en valgfri suffiks av '\\_' pluss ASCII-tekst (ingen mellomrom eller kontroll tegn) f.eks.ERDDAP\\_version\\_streng=1.82\\_JohnsFork". De som gjør gaffelen vil spesifisere dette ved å endre EDStatic.erddapVersion. Denne måten å gjøre det forårsaker ikke problemer for tidligere versjoner avERDDAP.. Takk til Axiom (spesielt Kyle Wilcox) Irlands marineinstitutt (spesielt Rob Fuller) ..
    * BUG FIX: For wms versjon=1.3.0, forespørsel=GetMap, crs=EPSG:4326 (ikke CRS:84) forespørsler: bbox bestillingen må være minLat,minLon,maxLat,maxLon. For CRS:84 forespørsler, som tidligere, må bbox bestilling være minLon,minLat,maxLon,maxLat. Dette kan fikses ved hjelp avERDDAP'sWMS1.3.0 Service iArcGIS  (Takk til Paola Arce) .. Takk (ikke) tilOGCFor å gjøre dette så komplisert. Takket væreLeafletFor å håndtere dette riktig og gi meg en måte å teste dette på.
    * IMPROVED: Forrige, foreslått lenke tilRSSog e-postabonnement harhttpURL til dinERDDAP.. Nå er dethttpsURL, hvis det er aktivt.
    * Nyhet:EDDGridKopier nå støtter en valgfri tagg&lt;Bare siden&gt;_someValue_&lt;/kunSiste&gt;, hvor verdien er en bestemt ISO-8601-formatert tid eller ennow-n Enheter (f.eks.now-2 år) Tid. Se[Bare Siden dokumentasjon](/docs/server-admin/datasets#onlysince).. Takk til Drew P.
    * IMPROVED: Hvis tilgjengelig,ERDDAP™vil visehttpsURL (fra&lt;baseHttpsUrl&gt;, om tilgjengelig) i stedet forhttpURL-adresse når den forteller brukerne at URL-adressen skal legge til/validere/fjern/liste et abonnement.
    * BUG FIX:ERDDAP™Nå kan en abonnementshandling begynne med https://" .. (Bob slår pannen sin.) Takk til Jennifer Sevadjian.
    * BUG FIX:.jsonlKVPbruker nå «:» mellom hver nøkkel og verdi i stedet for'='.. (Bob slår pannen sin.) Takk til Alexander Barth.
    * BUG FIX: Tidligere, hvis du starter på nyttERDDAP™med hurtig restart=true, og hvis du, før datasettet ble lastet på nytt normalt, ringte til et EDDTableFromFiles datasett som brukte oppdateringEveryNMillis, og hvis en datafil nettopp hadde blitt endret, ville forespørselen mislykkes med en null pekerfeil. Nå lykkes forespørselen. Takk til John Kerfoot.
    * NEW: Når et datasett lastes innERDDAP™, nøkkelordene er nå omarrangert i sortert rekkefølge og alle nylinjetegn fjernes.
    * IMPPROVED: Nå, hvis en .geoJson,.jsoneller.ncOJson-forespørsel har.jsonp parameter, responsen mime-type er applikasjon / javascript. Merk at.jsonP støttes ikke.jsonlCSVeller.jsonlKVPFordi det ikke ville fungere. Takk til Rob Fuller.
    * IMPROVED: MIME-typen for Json linjer filTypealternativer er nå " Application/x-jsonlines". Det var søknad/jsonl. Foreløpig er det ikke noe definitivt riktig valg.
    * IMPROVED: Antall mislykkede forespørsler som vises på status.html-siden vil øke fordi flere ting regnes som feil enn tidligere, f.eks. ClientAbortException.
    * IMPROVED: Nå, hvis et svar fraERDDAP™er ikke komprimert, så vil overskriften på svaret inkludere "Content-coding"=" identitet".
    * IMPROVED: Attributet " lisens" var ikke nødvendig. Nå, hvis det ikke er spesifisert, standardLicense fra meldinger.xml (eller fra setup.xml hvis tilstede) brukes som standard.
    * NY: Det er nå et valgfritt[filAccessSuffix-attributt](/docs/server-admin/datasets#fileaccessbaseurl)som kan brukes sammen med eksisterende[filAccessBaseUrl-attributt](/docs/server-admin/datasets#fileaccessbaseurl)..
    * IMPROVED: For å øke sikkerheten, ble denne versjonen kompilert med den sisteJavaJDK v8u162.
    * NEW: For å øke sikkerheten, flere felles domener som tilbyr midlertidige e-postadresser (For eksempel, @mailinator.com) er nå på en permanent e-post svartliste til abonnementssystemet.
    * For å øke sikkerheten, inkluderer tallene i Daily Report nå:
SetDataset Kunne ikke flagge IP-adresse (Siden siste daglige rapport)   
SetDataset Kunne ikke flagge IP-adresse (siden oppstart)   
SetDataset Flag IP-adresse lykkes (Siden siste daglige rapport)   
SetDataset Flag IP-adresse lykkes (siden oppstart)   
De - Falske - tallene la deg se hvem (En hacker?) Jeg prøver å sette et flagg, men mislykkes.
    * For å øke sikkerheten, e-postadresser i&lt;emailBlacklist&gt; i dindatasets.xmlNå anses det som ufølsomt.
         

## Versjon 1.80{#version-180} 
 (utgitt 2017-08-04) 

*    **Nye funksjoner (for brukere) :)**   
     
    * NyorderByCount () Filteret lar deg angi hvordan resultattabellen skal sorteres (eller ikke) og bare returnerer én rad for hver gruppe, med antall ikke-manglende verdier for hver variabel.
For eksempelorderByCount ("stationID") vil sortere etterstationIDog returnere én rad for hverstationID, med antall ikke-manglende verdier for hver variabel.
Hvis du bare angirorderByCount (") Svaret vil være bare én rad med antall ikke-manglende verdier for hver datavariabel.
Se[orderBy... dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Takk til Ben Adams.
    * Ny.ncoJson-fil Type alternativ for rutenett og tabell datasett. Dette alternativet gjør enNCOlvl=2 "pedantisk" JSON-fil med all informasjonen som normalt finnes i en.ncfil. Se[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Takk til Charlie Zender.
    * BUG FIX: DenorderBy... () alternativer på Make A Graph nettsiden håndteres nå riktig.
    * BUG FIX: .geoJson-utgang nå ikke skrive ut rader der lat- eller lansverdier mangler. Også høydeverdier (dersom tilgjengelig) er nå inkludert i koordinatene, ikke som dataverdier. Takk til Jonathan Wilkins.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:**   
     
    * SIKKERHETSRESSE: Protokol.js-biblioteket som brukes tilOpenLayersdemo påWMSsider iERDDAP™er utdatert og har en feil som potensielt tillater det å bli misbrukt. (UppdateringOpenLayersog protokoller. JS er ikke lett.) Det åpner muligheten for at biblioteket kan settes opp for å tillate en sårbarhet på tvers av steder. Men sidenERDDAP™Bare brukOpenLayerspå en spesifikk måte og kun med spesifikkERDDAP-baserte datakilder, vi tror det ikke er noen sårbarhet på tvers av nettstedet iERDDAPbruk avOpenLayersog protokoller.js. Men hvis du ikke tror dette, kan du nå deaktivere bruken avOpenLayersdemo påWMSsider av dinERDDAP™ved å legge til
```
        <openLayersActive>false</openLayersActive>  
```
til din config.xml fil. Standarden er " sant". Takk til Charles Carleton og NCEI.
    * SIKKERHETER: Ubrukt .jar filer og duplikat .jar filer (fordi de også er i NetcdfAll.) er fjernet fraERDDAP™Fordeling. Utdaterte .jar-filer er oppdatert. Takk til Charles Carleton og NCEI.
    * SIKKERHETSÅRINGER: NetcdfAll.jar filen distribuert medERDDAP™er den siste versjonen (nå 4.6.10) , men det inneholder fortsatt interne jackson .jar-filer som er kjent for å være utdatert og har sikkerhetsproblemer, spesielt Jackson-bibliotekene som kun brukes når du får tilgang til Amazon S3-datakilder. Hvis du ikke får tilgang til data via Amazon S3 (Du ville vite om du var) Disse sårbarhetene er ikke relevante.
        
Nettcdf-java utviklerne opprettholder at disse sårbarhetene ikke er relevante på grunn av måten Netcdf-koden bruker disse bibliotekene på, og i alle tilfeller vil kun være relevant når du får tilgang til Amazon S3. Se[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866).. Jeg tror dem. Hvis du fortsatt har bekymringer om dette, vennligst kontakt netcdf-java utviklerne. (Merk at hvis du ikke tror netcdf-java utviklere og vurderer ikke å brukeERDDAP™På grunn av dette bør du ikke bruke TREDDS heller, fordi TREDDS bruker netcdf-java mer fundamentalt og mer omfattende ennERDDAP..) 
        
Detaljer: Vanskelig kode og sårbarhetsadvarsler er:
NettcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høy
NettcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høy
NetcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotasjoner/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høy
Se https://nvd.nist.gov/vuln/detail/CVE-2016-3720 Kritisk
NettcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høy
Se https://nvd.nist.gov/vuln/detail/CVE-2016-3720 Kritisk
" For versjon 4.6.10 trekker aws-java-sdk-core i versjon 2.6.6 av jackson-\\* gjenstander." (e-post fra netcdf-java people) ..
Takk til Charles Carleton og NCEI.
        
    * COMPILER-forandringer: Hvis du rekompilererERDDAP™Legg merke til at -cp-klassestiparameteren som er nødvendig for kommandolinjen nå er mye kortere enn før. Se den nye -cp innstilling i[denne dokumentasjonen](/docs/contributing/programmer-guide#development-environment).. Takk til Charles Carleton og NCEI.
    * Nyvalg i Generer Datasett Xml: EDDTableFromBcodmo, som er bare for intern bruk på BCO-DMO.
Takk til Adam Shepherd og BCODMO.
    * NY ATTRIBUTE og FEATURE: Hvis en EDDTable-kolonne har navn på tilgjengelige webfiler (f.eks. bilde, video eller lydfiler) Du kan legge til
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
å angi basisadressen (Slutter med /) nødvendig for å gjøre filnavnene til komplette URLer. Så for.htmlTablesvar,ERDDAP™vil vise filnavnet som en lenke til den kombinerte URLen (basen Url pluss filnamnet) ..
Hvis du vilERDDAP™for å betjene relaterte filer, lage et separat EDDTableFromFileNames datasett for disse filene (Det kan være et privat datasett) ..
Takk til Adam Shepherd og BCODMO.
    * NY ATTRIBUTE-PROGRAM: Hvis en EDDTable-kolonne har filnavn på tilgjengelige filer (f.eks. bilde, video eller lydfiler) som er tilgjengelige via et arkiv (f.eks..zipfil) Tilgjengelig via en URL, bruk
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
å angi URL-adressen til arkivet.
Hvis du vilERDDAP™for å betjene arkivfilen, gjør en egen EDDTableFromFileNames datasett for den filen (Det kan være et privat datasett) ..
Takk til Adam Shepherd og BCODMO.
    * Forhåndsvisninger for å generere datasett Xml å fjerne årsakene til ugyldig/dårlig&lt;subsetVariables&gt; forslag og duplikat / dårlig foreslått variabel navn, etc. Takket være Rich Signell, Adam Shepherd og BCO-DMO.
    * Nyt valg: Den politiske grenseinformasjonen som distribueres medERDDAPer fra en tredjepart og noe utdatert. Også det er omstridte grenser på flere steder i verden, der forskjellige mennesker vil ha ulike ideer om hva som er riktig. Vi har ingen klaim om korrektheten til de politiske bonadiske opplysningene som kommer medERDDAP.. Hvis du ikke liker den politiske grenseinformasjonen som følger medERDDAP™Du kan nå fortelleERDDAP™å aldri trekke politiske grenser ved å legge til
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
til din config.xml fil. Standarden er " sant". Takk til Raju Deventer.
    * NY METADATA TAG: Idatasets.xmlFor et datasett, kan du nå angi standard antall farger Barseksjoner for endataVariablepå grafer og kart med
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (standard=-1, som sier å laERDDAP™bestemme) .. Se[farge Barinnstillinger](/docs/server-admin/datasets#color-bar-attributes)..
    * IMPROVED: Statens grensefarge på kart var lilla (Deep Purple til deg Baby Boomers) .. Nå er det grått (mellom den nasjonale grensen grå og landet grå) ..
    * BUG FIX:&lt;iso19115File &gt; og&lt;fgdcFile&gt; idatasets.xmlHan ble ikke alltid håndtert riktig. Nå er de det. Takk til BCO-DMO.

## Versjon 1.78{#version-178} 
 (utgitt 2017-05-27) 

*    **Nye funksjoner (for brukere) :)**   
     
    *    (ingen)   
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:**   
     
    * IMPROVED: Ordren på linjer i "Major LoadDatasets Time Series" på status.html siden er nå nyeste på toppen til eldste nederst.
    * BUG FIX:ERDDAP™Nå skriver.nccsvfiler med tidsvariabelenactual\\_rangesom en ISO-8601 strengtid. Som fikser feilen med EDDTableFromErddap-tolkingsinformasjon fra et eksternt datasett og fra den raske restart-filen for alle EDDTableFrom... Filer datasett. (Tidenactual\\_rangevil ha feil første gang datasettet lastes i v1.78, men riktig etter at det er lastet på nytt, for eksempel hvis du flagger datasettet.) 

## Versjon 1.76{#version-176} 
 (utgitt 2017-05-12) 

*    **Nye funksjoner (for brukere) :)**   
     
    * Endring i Tomcat: For forespørsler tilERDDAP™kommer fra annen programvare enn nettlesere (f.eks.curl, R,Matlab,Python,Java) :)
Som med tidligere endringer i versjoner av Tomcat (Programvaren som kjørerERDDAP) siden tidlig 2016, må flere og flere tegn i spørringsdelen av forespørselsadressen være[ **Prosent kodet** ](/docs/server-admin/datasets#infourl)av sikkerhetsgrunner. Nettlesere tar seg av prosent koding for deg. bruk avERDDAP™i en nettleser er ikke påvirket med mindre forespørselen blir omdirigert til en annenERDDAP..
    * IMPROVED: Tidligere,ERDDAP™behandlet **tegnvariabler** mer som usignerte korte heltal enn tegn. Nå behandler det dem mer som 1-tegn lang UCS-2 (Unicode) Stringer. Se[tegndokumentasjon](/docs/server-admin/datasets#char).. Takk til Aurelie Briand og Argo-prosjektet.
    * IMPROVED: Tidligere,ERDDAP™tilbys lite støtte til **Unicode- tegn** over tegn #255 i strenger. internt,ERDDAP™Fullstendig støtter 2-byte UCS-2 tegn (tegn nummer 0 til 65535) i strenger. Når strengdata er skrevet til ulike filtyper,ERDDAP™gjør det beste det kan å støtte 2-byte tegn. Et annet eksempel er .csv-filer somERDDAP™skriver med ISO-8859-1-tegnsettet (a 1-byte tegnsett) , såERDDAP™skriver alle tegn over tegn # 255 med JSON-lignende \\u_hhhh_-syntaks. Se[Strengdata](/docs/server-admin/datasets#string)..
    * IMPROVED: I.ncfiler skrevet avERDDAP™, tegnvariabler som skal tolkes som strenger vil ha attributten
         **\\_Koding=ISO-8859-1**   
I.ncFiler lest avERDDAP™, tegnvariabler med "\\_-koding" vil bli tolket som strenger med den angitte teiknkodingen.
    * REMINDER:ERDDAP™støtter **JSON-lignende backslash-encoding** av spesielle tegn når du angir begrensninger på tegn og strengvariabler. Slik kan du be om noe som &myString="\\u20ac" når du vil ha rader av data der myString=€ siden 20ac er den heksadesimale versjonen av kodepunktet for Euro-symbolet. Flere kilder på nettet viser kodepunkttallene for Unicode-symboler, f.eks.[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)..
    * IMPROVED: Tidligere,ERDDAP™tilbudt begrenset støtte til **langt heiltal** Variabler. NåERDDAP™fullt støtter longs internt og gjør sitt beste når du skriver lange data til ulike filtyper. Se[lang dokumentasjon](/docs/server-admin/datasets#long).. Takket være Irlands Marine Institute, Craig Risien, Rich Signell, Christopher Wingard og OOI.
    * NY: utgangsfiltype for netdap ogtabledap:) **.nccsv** som gjør enNetCDF-like, ASCII, CSV-fil som også inneholder alle metadata som ville være i en sammenlignbar.ncfil. Se[NCCSV Spesifikasjon](/docs/user/nccsv-1.00).. Takket være Steve Hankin.
    * Nyhet: **orderByClosestfilter** kan du angi hvordan resultattabellen vil bli sortert og et intervall (f.eks. 2 timer) .. Innenfor hver sorteringsgruppe vil bare radene som er nærmest intervallet, holdes. For eksempelorderByClosest ("stationIDTid, 2 timer") vil sortere etterstationIDog tid, men bare returnere radene for hverstationIDhvor den sisteorderBykolonne (tid) Nærmest 2 timers intervaller. Dette er det nærmeste itabledaptil trinnverdier i en rutenettforespørsel. Dette alternativet kan angis via alletabledapDatasets .html nettside, .graph nettside, og ved alle URLer som du genererer deg selv. Takk til Irlands Marine Institute og Ocean Networks Canada.
    * Nyhet: **orderByLimitfilter** kan du angi hvordan resultattabellen skal sorteres og et grensenummer (f.eks. 100) .. Innenfor hver gruppe vil bare de første \"grense\" radene holdes. For eksempelorderByMax ("stationID, 100") vil sortere etterstationID, men bare returnere de første 100 radene for hverstationID.. Dette ligner på SQLs Klausul. Dette alternativet kan angis via alletabledapDatasets .html nettside, .graph nettside, og ved alle URLer som du genererer deg selv. Takk til Irlands Marine Institute og Ocean Networks Canada.
    * NEW: To nye responsfiltyper, **.jsonlCSVog.jsonlKVP** er tilgjengelige for forespørsler om nettbaserte datasett, tabelldatasett og mange andre steder iERDDAP  (For eksempel forespørsler om informasjon om datasett) .. Filene er JSON Lines-filer ([ https://jsonlines.org/ ](https://jsonlines.org/)) hvor hver linje har et separat JSON-objekt..jsonlCSVBare har verdiene i et CSV-format..jsonlKVPhar nøkkel: Værdipar. Hver linje står på egen hånd. Linjene er ikke innesluttet i en større JSON-array eller -objekt. For eksempel, se[denne prøveanmodningen](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z).. Takket være Damian Smyth, Rob Fuller, Adam Leadbetter og Irlands Marine Institute.
    * NEW: Det er ny dokumentasjon som beskriver[ **Hvordan få tilgang til private datasett iERDDAP™via skript** ](/docs/user/AccessToPrivateDatasets).. Takk til Lynn DeWitt.
    * IMPROVED: Den minste graden av **OpenLayers** Kartet var 2 grader og er nå 4 datapiksler. Takk til Rusty Holleman.
    * IMPROVED: I noen vanlige tilfeller, forespørsler som inkluderer **regulært uttrykk** Begrensning vil bli behandlet mye raskere.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:**   
     
    *    **SLOW First STARTUP:** Første gang du starter denne nye versjonen, vil det ta lang tid forERDDAP™å laste alle datasettene fordi det må leses om alle kildedatafilene (Selv om bare overskriften for rutenettede datafiler) .. Hvis du ser på loggene kan du se feilmeldinger som sier - gamle / ustøttet forbedretVersion - av noen interne filer - det er greit --ERDDAP™vil gjøre de nye versjonene av de interne filene. Vær tålmodig.
    * Action:ERDDAP™Nå bruker den nye **Java.tid** klasser (Også kjent som JSR 310) I stedet for Joda å tolke String ganger i numeriske tider. Merknader:
        * HvisERDDAP™plutselig har problemer med å tolke String ganger for et gitt datasett og dermed bare konverterer mest eller alle ganger til NaNs (manglende verdier) Problemet er nesten alltid med datoen Tidsformatstreng som du spesifisert som -enhetene - av variabelen. Det nye systemet trenger noen ganger en litt annen datoTime formatstreng.
        * Hvis numeriske måneder og dager i datoenTidsstrengene ikke er 0- polstret (f.eks. "3/7/2016") , sørge for at formatet bare har en enkelt M og d (f.eks.  "M/d/YYY", ikke  "MM/dd/YYY") ..
        * Endre alle fraksjonelle sekunder spesifikasjon som bruker små bokstaver (f.eks. .sss iyyyy-MM-dd'T'HH:mm:ss.ssss) Til kapital S's, (f.eks.yyyy-MM-dd'T'HH:mm:ss.SSS) ..
        *   ERDDAP™ikke lenger støtter strengdato Tidsformater med to-siffererte år (yy) med et underforstått århundre (f.eks. 1900 eller 2000) .. Forretninger brukte milliarder dollar på å løse dette problemet i slutten av 1990-tallet. Forskere bør ikke bruke to sifferår. Rett opp kildefilen (s) ved å konvertere til 4-sifrete år, og deretter bruke yyy på datoen Tidsformat.
        * Du kan bruke YYYZ eller YYZZ (somERDDAP™konverterer til uuuu) å tolke 4 sifferår, inkludert negative år, f.eks. -4712 (som er 4713 f.Kr.) .. Takket være SeaDataNet, Thomas Gardner og BODC.
        * Vennligst fortsett å bruke Z innen en datoTid format for å fåERDDAPå tolke en tidsforsinkelse (f.eks. Z, +0200, -08, -0800, -08:30) ..
        *    **Pass på at du brukerJavaversjon 1.8.0\\_21 eller høyere.** 
        * Programmører -- Hvis du skriverJavaprogrammer som kjørerERDDAP™kode, du må fjerne referansen til joda-tid. glass i klassestiparameteren.
    * Nyhet:ERDDAP's[ArkivA Datasett-verktøy](/docs/server-admin/additional-information#archiveadataset)kan nå opprette[ **BagIt-filer** ](https://en.wikipedia.org/wiki/BagIt).. NCEI kan standardisere på dette formatet. Takk til Scott Cross og John Relph.
    * IMPROVED: Linkene til å laste ned erddap. Krig motERDDAP™Nettsider peker nå på **GitHub** .. (De er offentlige koblinger, så du trenger ikke å bli med GitHub.) Dette betyr mye raskere nedlastinger (opp til 12Mb/s versus 1Mb/s) Og få problemer med nedlastinger. Takket være Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney og Irlands Marine Institute.
    * IMPROVED: Den **Status.html siden og den daglige Status Report e-post** Nå inkluderer en "Major LoadDatasets Time Series" delen som viser statistikk omERDDAP™fra slutten av hvert store lastdatasett for de siste 100 store lastdatasettene. Takket være det vanskeligste RAID.
    * NEW: En ny, valgfri (men anbefalt) parameter for EDDTableFromCassandra datasett: [ ** &lt;partitionKeyCSV&gt; ** ] (/docs/server-admin/datasett#partitionkeycsv) .. Takk til Ocean Networks Canada.
    * NEW: EDDTableFromAsciiFiles støtter nå ** &lt;columnSeparator&gt; ** parameter. Hvis null eller - - klassen vil gjette, som før, vil det første tegnet bli brukt som kolonneseparator når du leser filene. Takk til Sky Bristol og Abigail Benson.
    * Ny: den nye datasetttypen,[ **EDDTableFraNccsvFiler** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), kan lage et datasett ved å samle[NCCSV .csv-filer](/docs/user/nccsv-1.00).. Takket være Steve Hankin.
    * IMPROVED: **EDDTableFraErddap** Nå bruker.nccsvå få informasjon fra fjernkontrollenERDDAPS og for lokalt arkiv av den metadatainformasjonen. Dette muliggjør full støtte for tegn og lange datatyper, og for Unicode (UCS-2) Tegnsett for tegn og strenger. Takk til Rob Fuller og Irlands Marine Institute.
    * IMPROVED: EDDTableFromErddap ogEDDGridFraErddap nå støtte ** &lt;omdirigere&gt;falske&lt;/Omdiriger &gt; ** som fortellerERDDAP™aldri å omdirigere forespørselen til fjernkontrollenERDDAP.. Standard er sant. Dette er nyttig når fjernkontrollenERDDAP™er en privatERDDAP.. Takket være Damian Smyth, Rob Fuller og Irlands Marine Institute.
    * IMPROVED:ERDDAP™Nå fanger **avbrutt brukerforespørsler** Før. OgERDDAP™nå stenger ned raskere fordi de lave trådene stenger ned raskere. Takket være det vanskeligste RAID.
    *    **Opprett datasett Xml:** 
        * NEW: Den nye spesielle EDDType-ncdump-skriver en[ncdump](https://linux.die.net/man/1/ncdump)\\-lignende utskrift ut av hodet på en.ncfil. Du kan også skrive ut dataverdiene for spesifiserte variabler (eller skrive inn " ingenting" å ikke skrive ut noen dataverdier) .. Dette er nyttig fordi det uten ncdump er vanskelig å vite hva som er i en fil og dermed hvilken EDDType du bør spesifisere for GenerateDatasetsXml. Takket være Craig Risien, Rich Signell, Christopher Wingard og OOI.
        * NEW: For SeaData Nettodata:
Når det er relevant, genererer datasett Xml gjør nå en bestemt semantisk konvertering ved hjelp av en ekstern SPARQL spørring: hvis en variabels kilde metadata inneholder en sdn\\_parameter\\_urn, for eksempel sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01", Generererer datasett Xml vil legge til den tilsvarende P02-attributten, for eksempel sdn\\_P02\\_urn = "SDN:P02::PSAL". Hvis du har datasett som bruker disse attributtene, og hvis dinERDDAP's&lt;categoryAttributes&gt; i setup.xml inkluderer sdn\\_parameter\\_urn og sdn\\_P02\\_urn, vil brukerne kunne brukeERDDAP™Kategorisøkesystem for å søke etter datasett med spesifikke verdier av disse attributtene. Takk til BODC og Alexandra Kokkinaki.
        * IMPROVED: Genererer datasett Xml endrer nå mangehttp://referanser i metadata tilhttps://når det er nødvendig.
        * IMPROVED: Genererer datasett Xml prøver nå å gjette skaperen\\_type og utgiver\\_type.
        * IMPROVED: Variablens dataTyper foreslått av Genererer Datasett Xml vil nå bli litt bedre. Takket være Margaret O'Brien, LTER og EML.
        * IMPROVED: Genererer datasett Xml er bedre å spesifisere&lt;cdm\\_data\\_type&gt;, og legger til relaterte, nødvendige attributter (f.eks.&lt;cdm\\_timeseries\\_variables&gt;), slik at du kan gi den informasjonen. Takk til Rich Signell.
        * IMPROVED: I Genererer Datasett Xml, for EDDTable datasett, forslaget til&lt;subsetVariables&gt; Nå er mye mer konservativ. Takk til John Kerfoot.
        * IMPROVED: Hvisdatasets.xmlfor datasett angirfeatureTypemen ikke CDm\\_data\\_type, denfeatureTypevil bli brukt som cdm\\_data__type. Takk til Rich Signell.
        * BUG FIX: generer Datasett Xml antyder nå riktig&lt;dataType&gt; for datavariabler som harscale\\_factor,add\\_offsetog/eller \\usignerte attributter.
    * IMPROVED: NårERDDAP™Åpner en.ncfil som er **kortere** enn det skal være (For eksempel, det ble ikke fullstendig kopiert på plass) ,ERDDAP™Nå behandler filen som dårlig. Tidligere,ERDDAP™returnerte manglende verdier for enhver manglende del av filen fordi det er standard atferd for netcdf-java.ERDDAP™Nå bruker Ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = sant; Takket være vår vanskelige RAID og Christian Ward-Garrison.
    * INPROVED: ISO 19115 forfatteren bruker nå **creator-_type** Hvis tilstede.
    * IMPROVED:ERDDAP™nå bruker den nyeste netcdf-java v4.6.9 som kan lese flere typer **netcdf-4 filer** .. Takket være Craig Risien, Rich Signell, Christopher Wingard og OOI.
    * BUG FIX: Unngå problemer hvis forskjellige kildefiler har forskjellige datatyper for en gitt variabel. Takk til Roy Mendelssohn og Eugene Burger.
    * BUG FIX: **Konverteringer av tidsformat** er nå bedre beskyttet mot dårlige tidsverdier. Takk til NDBC.
    * BUG FIX:EDDGridFraNcFiles Upakka nå håndterer tidsverdier med **" måneder siden ..." og " år siden ..."** riktig (ved å øke måneden eller året, ikke ved å tilsette for eksempel 30 dager gjentatte ganger) .. Takk til Soda3.3.1.
    * BUG FIX: Bare i v1.74 **abonnement** kreves en handling (f.eks.http://...) som var og burde være valgfritt.
    * BUG FIX:EDDGridFra FlightIRFiles.lowGetSourceMetadata () Legg ikke til noen globale egenskaper. Nå gjør det det.
         

## Versjon 1.74{#version-174} 
 (utgitt 2016-10-07) 

*    **Nye funksjoner (for brukere) :)**   
     
    * Når en liste over datasett (Alt eller fra søk) vises på en nettside, lange titler vises på flere linjer. Tidligere ble midten av en lang tittel erstattet av .... Takket være Margaret O'Brien, LTER og EML.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:**   
     
    * TO DO: På Linux-datamaskiner, endre innstillingene for tidsavbrudd for Apache slik at tidskrævende brukerforespørsler ikke tidsavbrudd (med det som ofte vises som en "Proxy" eller "Bad Gateway" feil) .. Som rotbrukere:
        
        1. Endre Apachehttpd.conf-fil (vanligvis i /etc/httpd/conf/) :)
Endre eksisterende&lt;Tidsgrense&gt; innstilling (eller legge til en på slutten av filen) til 3600 (sekunder) I stedet for standard 60 eller 120 sekunder.
Endre eksisterende&lt;ProxyTimeout &gt; innstilling (eller legge til en på slutten av filen) til 3600 (sekunder) I stedet for standard 60 eller 120 sekunder.
        2. Start Apache på nytt: /usr/sbin/apachectl -K graciøs (Men noen ganger er det i en annen katalog) ..
        
Takk til Thomas Oliver.
         
    * Nyhet:\\[bigParentDirectory/hard Flaggmappe
Dette fungerer som flaggkatalogen, men den hardFlag-versjonen sletter også all informasjon om cachede datasett. Det er ingen URLs å sette et hardFlag. Dette kan bare brukes ved å legge en fil i den katalogen.
hard Flaggene er svært nyttige når du gjør noe som forårsaker en endring i hvordanERDDAP™leser og tolker kildedataene, for eksempel når du installerer en ny versjon avERDDAP™eller når du har gjort visse typer endringer i et datasetts definisjon idatasets.xml.. Se[denne dokumentasjonen](/docs/server-admin/additional-information#hard-flag).. Takk til John Kerfoot og alle Argo-gruppene.
         
    * NEW: Genererer datasett Xml har nå et EDDTableFromEML-alternativ
som leser en datasett beskrivelse i et økologisk metadataspråk (EML) fil, laster ned den relaterte datafilen, og genererer en bit avdatasets.xmlslik at datasettet kan legges tilERDDAP.. Det er også en EDDTableFromEMLBatch som gjør det samme for alle EML-filene i en mappe. Dette fungerer veldig bra fordi EML gjør en utmerket jobb med å beskrive datasettet og fordi KNB og LTER gjør de faktiske datafilene tilgjengelige.
EML plussERDDAP™Kan være en god kombinasjon, sidenERDDAP™kan gi brukere mer direkte tilgang til rikdommen av KNB og LTER data og hjelpe disse prosjektene møte den amerikanske regjeringens[Offentlig tilgang til forskningsresultater (PARR) Krav](https://nosc.noaa.gov/EDMC/PD.DSP.php)Ved å gjøre opplysningene tilgjengelige via en webtjeneste.
Se[denne dokumentasjonen](/docs/server-admin/EDDTableFromEML).. Takket være Margaret O'Brien, LTER og EML.
         
    * NEW: Genererer datasett Xml har nå et EDDTableFromInPort-alternativ
som leser en datasettbeskrivelse i en InPort XML-fil og prøver å generere en bit avdatasets.xmlslik at datasettet kan legges tilERDDAP.. Dette skaper sjelden en klar til bruk bit av XML fordatasets.xml, men det vil skape et godt grovt utkast som er et godt utgangspunkt for redigering av et menneske.
Det ville være bra hvis folk som bruker InPort til å dokumentere sine datasett også vil brukeERDDAP™å gjøre de faktiske dataene tilgjengelige viaERDDAPNetttjenester og dermed møte den amerikanske regjeringens ogNOAA's[Offentlig tilgang til forskningsresultater (PARR) Krav](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)Ved å gjøre opplysningene tilgjengelige via en webtjeneste. Dette er en løsning som kan brukes akkurat nå. (erd.data at noaa.gover glad for å hjelpe.)   
Se[denne dokumentasjonen](/docs/server-admin/datasets#eddtablefrominport).. Takk til Evan Howell og Melanie Abecassis.
         
    * IMPROVED:ERDDAP™Nå bruker netcdf-java 4.6.6.
Med tidligere versjoner, Netcdf-java lese noen fyllverdier (kanskje, bare i netcdf-4 filer) som 0. Nå leser det noen av dem som netcdf standard fyllverdi: -127 for bytes, -32767 for shorts, -2147483647 for intense.UnidataDen nye oppførselen er riktig oppførsel. Hvis en variabel i et datasett begynner å vise en av disse verdiene hvor de brukte å vise 0, kan du legge til, f.eks.
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
til variabelensaddAttributeså fortelleERDDAP™å behandle den verdien som enmissing\\_value/\\_Fyll Værdi. Men i mange tilfeller vil det ikke gi ønsket resultat: 0. I så fall, vurdere å endre filene medNCOeller omskriving av filene. Klager? Kontakt ossUnidata;-)
         
    * TO DO: Ny TopografiDepth-palett
Jeg oppfordrer deg til å bytte alle datasett som bruker OceanDepth-paletten til å bruke den nye TopographyDepth-paletten, som er som Topography bortsett fra fargene som snus, slik at den er egnet for dybdeverdier (positive=ned) I stedet for høydeverdier (positive = up) .. De anbefalte innstillingene for denne paletten er:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * Ny funksjon: Strengmissing\\_valueog/eller__FillValue
Hvis en strengvariabel definerer enmissing\\_valueog/eller/_Filleverdi,ERDDAP™vil nå fjerne disse verdiene fra dataene og erstatte dem med en tom streng, slik at manglende verdier vises som tomme strenger, som med andre datasett iERDDAP.. Takket være Margaret O'Brien, LTER og EML.
         
    * Ny funksjon: Støtte til lokal tid
tidsstempelvariabler med kildedata fra strenger kan nå angi en tidssone via a "time\\_zoneAttribut som førerERDDAP™å konvertere lokale tidssonekildetider (Noen i Standard tid, noen i Daylight Spar tid) iZuluTider. Listen over gyldige tidssonenavn er sannsynligvis identisk med listen i TZ-kolonnen i[denne tabellen](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).. Standarden er -Zulu ". Vanlige amerikanske tidssoner er: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern. For tidsstempelvariabler med numeriske kildedata kan du angi "time\\_zone" Attribut, men verdien må væreZulu" eller "UTC". Takket være Margaret O'Brien, LTER og EML.
         
    * NEW FEATURE: EDDTableFromAsciiFiles støtter nå semikolonseparerte filer
og er smartere om å finne ut av skillet. Takket være Margaret O'Brien, LTER og EML.
         
    * Ny funksjon: Hvis det er en betydelig feil i lastDatasett (større eller mindre, for eksempel manglende eller ugyldigdatasets.xmldokument) ,ERDDAP™vil nå angi det i status.html, rett nedenfor "n Datasett Mislykkes å laste" som feil: mens du behandlerdatasets.xml: se log.txt for detaljer.
         
    * Ny funksjon:ERDDAP™Leter etter foreldreløse.
NårERDDAP™Gjør en stor belastning Datasett, det ser nå etter foreldreløse datasett (Datasett som er iERDDAP™Men ikke idatasets.xml) .. Hvis funnet, er de oppført i status.html, rett under "n Datasett mislykkes å laste" som feil: n Orphan Datasett (Datasett iERDDAP™Men ikke idatasets.xml) =...
Hvis du vil fjerne (loss) foreldreløse fraERDDAP™Du må legge til
        &lt;datasett type="_anyValidType_"datasetID="_theDatasetID_" active="false" /&gt;
tildatasets.xmlinntil datasettet losses i neste store lastdatasett.
         
    * BUG FIX: Hvis et datasett hadde en numerisk tidsstempelvariabel med andre enheter enn"seconds since 1970-01-01T00:00:00Z"og med&lt;oppdaterEveryNMillis&gt;-systemet som er aktivt, ble tidsstempelvariabelens område satt feil når datasettet ble oppdatert. Takk til John Kerfoot.
         
    * BUG FIX: Hvis&lt;quick Staple&gt; var sant i setup.xml og du ba om data fra en EDDTableFra... Fildatasett som brukes&lt;OppdaterEveryNMillis&gt;, den første forespørselen til datasettet ville mislykkes, men påfølgende forespørsler ville lykkes. Første forespørsel mislykkes. Takk til John Kerfoot.
         
    * BUG FIX: Genererer DatasettsXml.sh og .bat fungerte ikke med &gt; 9 parametere på kommandolinjen. Nå gjør de det. Takk til John Kerfoot.
         
    * BUG FIX: Den nye EDDTableFromMultidimNcFiles fjernet ikke konsekvent etterfølgende mellomrom fra strenger. Nå gjør det det. Dette har påvirket ARGO-filer. Takk til Kevin O'Brien og Roland Schweitzer.
         
    * BUG FIX: All tilgang til fjernkontrollenDAPTjenester initieres nå av mer moderne kode. Dette løser -tilkobling stengt - feil når du får tilgang til noen EDDTableFromErddap-datasett. Takk til Kevin O'Brien.
         
    * BUG FIX: håndtering avorderBy... () og distinkt () er nå tilbake til måten de var før de siste endringene: en gitt forespørsel kan ha flereorderBy... () og/eller distinkt () filter;ERDDAP™vil håndtere dem i den rekkefølgen de er spesifisert. Takk til David Karuga.
         
    * BUG FIX: Hvis datasettet er EDDTableFromDatabase og en spørring har[sourceCanOrderby](/docs/server-admin/datasets#sourcecanorderby)og/eller[sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)Da kan databasen (avhengig av innstillinger idatasets.xml) delvis eller fullstendig håndtak **Bare den første**  orderBy.. () eller distinkt () .. Takk til David Karuga.
         
    * BUG FIX: Den nylige ekstra prosent-kodningen forårsaket problemer med noen spørsmål til.ncCF-filer, for eksempel "HTTP-status 500 - Spørringsfeil: variabel=stasjon er oppført to ganger i resultatvariabler- Takk til Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFiles hadde problemer med å laste om et datasett når en av søylene var en ekte tegnkolonne. Takk til Roland Schweitzer.
         
    * BUG FIX:EDDGridFraNcFiles Utpakket nå konverterer ogsåmissing\\_valueog \\_FallValue til standardverdier slik at filer med ulike verdier kan aggregeres. På grunn av denne endringen, etter at du har installert denne nye versjonen avERDDAP™Vennligst sett en[hard Flag](/docs/server-admin/additional-information#hard-flag)for hverEDDGridFraNcFiles Upakket datasett i dinERDDAP..
         
    * IMPROVED: EDDTableFromNcCFFiles kan nå håndtere filer som har flere prøver\\_dimensions. Et gitt datasett må bare bruke variabler som bruker en av prøve-_dimensjoner. Takk til Ajay Krishnan.
         
    * IMPROVED: For EDDTableFra...Filer,&lt;SortFilesBySourceNames&gt; nå tillater komma-delt (Anbefalt) eller romdelte lister over variable kildenavn. I begge tilfeller kan individuelle variabelnavn være omgitt av doble sitater, f.eks. hvis navnet har et indre rom.

## Versjon 1.72{#version-172} 
 (utgitt 2016-05-12) 

*    **Nye funksjoner (for brukere) :)** Ingen.
     
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Ny EDDTableFraMultidimNcFiler[EDDTableFraMultidimNcFiler](/docs/server-admin/datasets#eddtablefrommultidimncfiles)er et nytt alternativ til EDDTableFromNcFiles. Den er utformet for å håndtere grupper av filer med flere variabler med delte dimensjoner, f.eks. var1\\[a\\]\\[b\\], var2\\[a\\], var3\\[b\\]SkalarVar. Takket være Argo-prosjektet, Aurélie Briand og Roland Schweitzer.
    * BUG FIX:ERDDAP™  (via FilvisitorDNLS og FileVistorSubdir klasser) Nå følger symbolske lenker på Linux.ERDDAP™Følger fortsatt ikke .lnk's på Windows.
    * BUG FIX av feil introdusert i 1.70: distinkt +orderByDet var ikke tillatt sammen i én forespørsel. Nå er de igjen. De er ikke gjensidig eksklusive/redundant. Takk til David Karuga.
    * Endre tildatasets.xmlsvartliste over IP-adresser:
IP v4-adresser synes åERDDAP™som fire periodedelte heksetall.
Jeg tror IP v6-adresser vises som 8 kolondelte heksetall.
SåERDDAP™Nå støtter koloner i IP-adressene i listen og :* på slutten av listen for å blokkere en rekke adresser.
    * IMPROVED:ERDDAP™Nå bruker NetcdfFileWriter å skrive.ncfiler i stedet for den utdaterte NetcdfFileWriterable. Det bør ikke være noen tydelig endring i de resulterende filene. Dette åpner for muligheten til å gjøre store.ncfiler som bruker.nc3 64bit utvidelser. Hvis du ønsker det, vennligst send en forespørsel tilerd.data at noaa.gov..
    * IMPROVED: Mange av linkene til eksterne nettsteder var utdatert. Nå er de oppdaterte og brukhttps:i stedet forhttp: når det er mulig.
    * Mange små endringer.

## Versjon 1.70{#version-170} 
 (utgitt 2016-04-15) 

*    **Nye funksjoner (for brukere) :)** Ingen.
     
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** Nedenfor er det flere anbefalte endringer i dokumentasjonen i config.xml-filen.
Vennligst gjør disse endringene nå.
30 minutters arbeid nå kan spare deg timer med forvirring i fremtiden.
    * Feilretting: Problemet var at forespørsler som ble omdirigert til fjerntliggendeERDDAPmislykkes med et ugyldig tegn|'feilmelding. Dette skjedde kun med nylige versjoner av Tomcat. Takk til Rusty Holleman, Conor Delaney og Roy Mendelssohn.
    * Feilretting:ERDDAP™nå bruker en oppdatert versjon av netcdf-java (Det er en lang historie) som inkluderer oppdatert støtte for NcML, som løser problemet med NcML LogicalReduce som ikke fungerer som forventet. Det kan være noen små endringer i metadata somERDDAP™leser via netcdf-java fra.nc,.hdf, .grib og .bufr filer. Takket være Favio Medrano.
    * Den nye[EDDTable](/docs/server-admin/datasets#eddtableaggregaterows)gjør det mulig å lage et sammenslått EDDTable-datasett fra to eller flere EDDTable-datasett som har de samme datavariabler ved hjelp av de samme enhetene. Takk til Kevin O'Brien.
    * Nye alternativer for EDDTableFraDatabase ([sourceCanOrderby](/docs/server-admin/datasets#sourcecanorderby)og[sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) la deg angi omERDDAP™, databasen eller begge deler, håndtere tydelig ogorderBy  (Alle varianter) Begrensninger. Takk til David Karuga.
    * Du kan nå gjøre et privat datasetts grafer og metadata tilgjengelig for publikum via det nye [&lt;graferAccessibleTo&gt;public&lt;/graferTilgjengeligTil&gt;] (/docs/server-admin/datasett) Tag. Takk til Emanuele Lombardi.
    * Nå, hvis en streng passert til Genererer Datasett Xml eller DasDds er omgitt av doble sitater, det er usitert (Som om det er en JSON-streng) .. Takk til John Kerfoot og Melanie Abecassis.
    * Opprett datasett Xml støtter nå " standard" for å få standard og " ingenting" for å få en tom streng (De jobber med eller uten sitater) .. Dette løser noen problemer relatert til å passere tomme strenger.
    * Nå i Generer Datasett Xml for alleEDDGridFra Filer og EDDTable FraFiles datasett, hvis prøven Filnavn du oppgir er: (den tomme strengen) , vil den bruke den siste matchende filenName fra katalogen + regulær + rekursiv=sann.
    * Oppdatert: DisplayInBrowser-koden som brukes til å vise resultatene av GeneralDatasetsXml og DasDds på Linux-datamaskiner var utdatert og ga en merkelig melding om Netscape. Nå bruker dette et moderne Linux-verktøy: xdg-open. Takk til Melanie Abecassis.
    * DenallDatasetsDatasettet har nå"files"kolonne, som indikerer grunnadressen til / filer-lenken (Hvis det finnes en) For datasettet.
    * Øk den generelle sikkerheten til dinERDDAP™ved å endre tillatelsene knyttet til Tomcat-katalogen og bigParentDirectory:
         (De faktiske kommandoene nedenfor er for Linux. For andre OSs gjør analoge endringer.) 
        * Endregroupgruppen" for å være tomcat, brukernavn eller navnet på en liten gruppe som inkluderer tomcat og alle administratorer av Tomcat/ERDDAPf.eks.
chgrp -R _ din brukerName_ apache-tomcat-_8.0.23_
chgrp-R _ din BrukerName bigParentDirectory_
        * Endre tillatelser slik at tomcat og gruppen har lest, skrive, utføre privilegier, f.eks.
chmod -R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _bigParentDirectory_
        * Fjern andres tillatelser til å lese, skrive eller utføre:
chmod -R o-rwx apache-tomcat-_8.0.23_
chmod -R o-rwx _ bigParentDirectory_
Dette er viktig, fordi det hindrer andre brukere i å lese muligens sensitiv informasjon iERDDAP™installasjonsfiler, loggfiler og filer med informasjon om private datasett.
    * Autentiserings-/loginsystemet ble revidert. Takket være Thomas Gardner, Emanuele Lombardi og den amerikanske regjeringens nye[HTTPS-Bare standard](https://home.dotgov.gov/management/preloading/dotgovhttps/)..
        * Autentisering=openid-alternativet ble fjernet. Det var utdatert.
        * Den nye, anbefalte,[autentisering=google](/docs/server-admin/additional-information#google)alternativet bruker Google Logg inn (basert på OAuth 2.0) å tillate alle med en Google-konto (inkludert Google-kontoer som@noaa.gov) å logge inn.
        * Den nye,[autentisering=email](/docs/server-admin/additional-information#email)alternativet er en sikkerhetskopi for autentisering=google. Det tillater brukere med en&lt;user&gt; tag indatasets.xmlå logge på ved å sende dem en e-post med en spesiell lenke.
        * I setup.xml, vennligst endre beskrivelsen for&lt;autentisering&gt; å være
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

        * I setup.xml legger du til dette nedenfor&lt;autentisering&gt; Merke
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

        * Nå kan brukere som ikke er logget på brukehttpellerhttpsURLer (hvis du har satt opp&lt;baseHttpsUrl&gt; i setup.xml). Takket være den amerikanske regjeringens nye[HTTPS-Bare standard](https://https.cio.gov/)..
        * Nå kan du oppmuntre alle brukere til å brukehttps  (ikkehttp) ved å sette&lt;baseUrl&gt; å være enhttpsURL. Å tvinge brukerne til å bare brukehttps, må du også gjøre endringer i Apache/Tomcat-oppsett for å blokkere ikke-httpsTilgang. Takket være den amerikanske regjeringens nye[HTTPS-Bare standard](https://https.cio.gov/)..
            
I setup.xml, vennligst endre beskrivelsen for&lt;baseUrl&gt; å være
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

        * Alternativene&lt;passordkoding&gt; Endret. I setup.xml, vennligst endre beskrivelsen for&lt;passordkoding&gt; som skal være
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

        * I setup.xml, vennligst endre beskrivelsen for&lt;baseHttpsUrl&gt; å være
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

        * Nå, hvis listePrivateDatasets=true i setup.xml, vil enda mindre informasjon bli vist om datasett som en bruker ikke har tilgang til.
    * Spesielt når du først setter opp dinERDDAPDu kan nå fortelleERDDAP™ikke å prøve å abonnere på fjernkontrollenERDDAP™Datasett. Takk til Filipe Rocha Freire.
I setup.xml, rett før&lt;fontFamily&gt;, vennligst legg til
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

    * I setup.xml, i instruksjonene ovenfor&lt;e-postFraAdresse&gt;, vennligst sett inn:
Hvis det er mulig, konfigurer dette til å bruke en sikker tilkobling (SSL/TLS) til e-postserveren.
Hvis oppsettet ditt ikke bruker en sikker tilkobling til e-postserveren, kan du gjøre endringene for å gjøre det.
    * I dindatasets.xmlLegg til denne linjen i beskrivelsen av&lt;emailBlacklist&gt; i dindatasets.xml:)
Du kan bruke navnet "\\*" å svarteliste et helt domene, f.eks.\\*@example.com .
    * Siden endringen til loggføringssystemet i v1.66, er loggfilen aldri oppdatert. Det er alltid meldinger eller deler av meldinger som venter på å bli skrevet til loggfilen. Nå kan du gjøre det oppdatert (Et øyeblikk) ved å se på dinERDDAPStatus nettside på http://_your.domain.org_/erddap/status.html ..
    * HashDigest...
    * En liten endring (til String2.kanonisk) Det bør bidra til å holde ting i bevegelse raskt nårERDDAP™er veldig opptatt og også bedre å håndtere et stort antall datasett.
    * Sterkt Anbefalt: Slutt å bruke&lt;convertToPublicSourceUrl&gt; idatasets.xmlå konvertere et IP-nummer i et datasetts&lt;sourceUrl&gt; (f.eks. http://192.168.#.#/ ) til et domenenavn (f.eks.http:my.domain.org/) .. Fra nå av, nye abonnementer til http://localhost , http://127.0.0.1 , og http://192.168.#.# URLS blir ikke tillatt av sikkerhetsgrunner. Bruk alltid det offentlige domenenavnet i&lt;sourceUrl&gt; tag (om nødvendig på grunn av DNS-problemer) Du kan bruke[/etc/hosts tabellen på serveren din](https://linux.die.net/man/5/hosts)å løse problemet ved å konvertere lokale domenenavn til IP-numre uten å bruke en DNS-server. Du kan teste om et gitt domenenavn blir riktig løst ved å bruke
ping _some.domain.name_
    * I genererDatasets.xml, for eksterne datasett (f.eks. fra en TREDDS-server) , den automatisk generertedatasetIDS er uendret for de fleste domener. For noen få domener, den første delen (Det vil si navnet) av den automatisk generertedatasetIDDet blir litt annerledes. Navnene som hadde én del er mer sannsynlig å ha to deler. For eksempel datasett fra http://oos.soest.hawaii.edu Tidligere førte tildatasetIDsom begynte med hawaii\\_, men nå fører tildatasetIDsom starter med hawaii\\_soest__. Hvis dette forårsaker problemer for deg, vennligst send meg e-post. Det kan være arbeid rundt.
    * Cassandra driveren ble oppdatert til cassandra-driver-core-3.0.0.jar og dermed for Cassandra v3. EDDTableFromCassandra ikke utnytte noen nye funksjoner i Cassandra v3. Indekser i Cassandra kan nå være mer komplekse, menERDDAP™fortsatt bruker Cassandra v2-indeksmodellen, som antar at en indeksert kolonne kan bli direkte queried med'='Begrensninger. Opprett datasett Xml for EDDTableFraCassandra registrerer ikke lenger kolonner med indekser; Hvis en indeks er enkel, må du spesifisere den idatasets.xmlfor hånd. Hvis du trenger støtte for mer komplekse indekser eller andre nye funksjoner, vennligst e-posterd.data at noaa.gov..
&#33;&#33;&#33; Hvis du fortsatt bruker Cassandra 2.x, kan du fortsette å brukeERDDAP™v1.68 til du oppgraderer til å bruke Cassandra 3.x.
    * Jars og Classpath -- Nesten alle inkluderte tredjepart .jar-filer ble oppdatert til sine nyeste versjoner.
        * slf4j.jar ble lagt til /lib og klassestien.
        * Joid. glass og tsik. krukke ble fjernet fra /lib og klassestien.
        * Hvis du får feilmeldinger om klasser som ikke finnes når du kompilerer eller kjørerERDDAP™eller et av verktøyene, sammenlign kommandolinjens klassesti tilERDDAP's[nåværende klassesti](/docs/contributing/programmer-guide#development-environment)å finne ut hvilke .jars mangler fra klassen din.

## Versjon 1.68{#version-168} 
 (utgitt 2016-02-08) 

*    **Nye funksjoner (for brukere) :)** Ingen.
     
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    *   [EDDGridFraFiles Aggreration via File Names eller Global Metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)--
Alle variasjoner avEDDGridFraFiles kan nå samle en gruppe filer ved å legge til en ny venstrefleste dimensjon, vanligvis tid, basert på en verdi avledet fra hvert filnamn eller fra verdien av en global attributt som er i hver fil.
    * Vi har tidligere foreslått at du vil opprette enEDDGridFraErddap datasett i dindatasets.xmlsom refererte og re-beholdt jplMURSST datasett i vårERDDAP.. Siden det nå er en nyere versjon av det datasettet, er det datasettet nå foreldet. Hvis du har dette datasettet i dinERDDAP™Legg til dette nye datasettet
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Hvis du vil fjerne den gamle jplMURSST datasett fra dinERDDAP™  (Det er ditt valg) Endre dens aktive innstilling fra "true" til "falske".
    * Feilretting: Vennligst sjekk BigParentDirectory som du spesifisert i config.xml. Hvis du ikke satte en skråstrek på slutten av&lt;bigParentDirectory&gt; navn, deretterERDDAP™vil ha opprettet flere mapper ved å legge til ord direkte til navnet som du spesifiserte, i stedet for å opprette underkataloger. Starter med versjon 1.68,ERDDAP™Legg til en skråstrek til slutten av mappenavnet hvis du ikke angir en. Så hvis du tidligere ikke angir en skråstrek på slutten, så når du installererERDDAP™v1.68 må du flytte og omdøpe disse katalogene **etter** Du stenger den gamleERDDAP™og **Før** Du starter den nyeERDDAP.. For eksempel, hvis du feilaktig spesifiserte bigParentDirectory som /home/erddapBPD (ingen etterfølgende skråstrek) ogERDDAP™har feilaktig opprettet mapper som
/hjemme/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/hjemme/erddapBPDlucen
og en fil som heter /home/erddapBPD subscriptionsV1.txt,
Da må du flytte og omdøbe dem til å være
/hjemme/erddapBPD/kache
/home/erddapBPD/kopi
/home/erddapBPD/datasett
/home/erddapBPD/flagg
/hjemme/erddapBPD/logger
/home/erddapBPD/lucen
og /home/erddapBPD/subscriptionsV1.txt
    * Feilretting: Det var feil iEDDGridLonPM180 iERDDAP™v1.66 som skjedde når barnedatasettet er etEDDGridFra Erddap.
    * Feilretting: Det var en feil iEDDGridFra Filer og EDDTable FraFiles inERDDAP™v1.66 som forårsaket&lt;oppdaterEveryNMillis&gt; som skal ignoreres første gang datasettet ble lastet inn etter en omstart.
    * Feilretting/ny funksjon: Hvis et barnedatasett iEDDGridAggregateEDDGridOppfattet.EDDGridFra EDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy eller EDDTableFraEDDGrider en ...FraErddap datasett, som foreldredatasett nå abonnerer på det underliggendeERDDAP™- Datasett. Hvis den underliggendeERDDAP™Datasett er i sammeERDDAP™, abonnement og validering gjøres direkte; du vil ikke få en e-post som ber deg om å validere abonnementet. Hvis abonnementssystemet for dinERDDAP™er slått av, sett&lt;reloadEveryNMinutes&gt; innstilling for foreldredatasettet til et lite tall (60?) for å holde seg oppdatert.
    * Feilretting/ny funksjon: Hvis et barnedatasett iEDDGridAggregateEDDGridOppfattet.EDDGridFra EDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy eller EDDTableFraEDDGridhar aktiv="falsk", at barnedatasettet nå er hoppet over.

## Versjon 1.66{#version-166} 
 (utgitt 2016-01-19) 

*    **Nye funksjoner (for brukere) :)** 
    * Grafer (ikke kart) kan nå ha synkende verdier på aksene. For å få dette når du bruker en Make A Graph-webside, endrer du ny Y-akse : stigende innstilling (standard) til fallende. Eller, i en URL som ber om en graf, bruk den nye valgfrie 3. \"|\" parameter for[&.x Område og/eller &. yRange brytere](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)som ikke kan være noe (standard) , sant eller t for å få stigende verdier, eller bruk falske eller f for å få synkende verdier. Den sanne|falske verdier er ufølsomme. Takket være Chris Fullilove, John Kerfoot, Luke Campbell og Cara Wilson.
    * Brukere kan nå angi bakgrunnsfargen for grafer ved å legge til en &.bgColor=0x_ AARRGGBB_ bytte til URL som krever grafen. Se .bgColor i avsnittet grafikkkommandoer i[netdap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)og[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)dokumentasjon. Takk til John Kerfoot og Luke Campbell.
    * For tabelldatasett kan begrensninger nå referere til min (_noglevariableName_) eller max (_noglevariableName_) .. Se[min () og max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min).. Takk til John Kerfoot.
    * For tabellbaserte datasett, tidsbegrensninger som brukes[Nå](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)kan nå angi tidsenheter med millisekunder eller millis.
    * En forespørsel om et bilde av et tabelldatasett gjør nå et kart (ikke en graf) dersom x og y-variabler er lengdegradslignende og breddegradslignende variabler (kompatible enheter) .. Takk til Rich Signell.
    * Feilretting: Tidsakseetiketter og flåter hadde noen ganger merkelige uregelmessigheter når du ber om flere grafer samtidig (f.eks. på en nettside) .. Problemet var en feil i SGT-grafikkbiblioteket somERDDAP™bruk (En variabel var " statisk" det skulle ikke ha vært) .. Takk til Bradford Butman.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Det er en sikkerhetsrisiko å sette e-postpassordet i en vanlig tekstfil som config.xml. For å redusere dette problemet anbefaler vi sterkt at du:
        1. Sett opp en e-postkonto bare forERDDAPbruk, for eksempel erddap@yourInstitution.org . Det har også andre fordeler; spesielt mer enn énERDDAP™Administrator kan da gis tilgang til den e-postkontoen.
        2. Gjør tillatelsene til config.xml-filen rw (Les+write) for brukeren som vil kjøre Tomcat ogERDDAP™  (Bruker=tomcat?) og ingen tillatelser (ikke lese eller skrive) For gruppen og andre brukere. Takk til Filipe Rocha Freire.
    * Den nye[ArkivADataset](/docs/server-admin/additional-information#archiveadataset)verktøy forenkler å gjøre en.tar.gzarkiv med en undergruppe av et datasett i et format som er egnet for arkivering (spesielt vedNOAANCEIs) .. Dette bør være nyttig for mangeERDDAP™administratorer i mange situasjoner, men spesielt for grupper innenforNOAA..
    * Den nye type datasett[EDDGridFraNcFilesUpakket](/docs/server-admin/datasets#eddgridfromncfilesunpacked)En variant avEDDGridFra NcFiles. Forskjellen er at denne klassen pakker ut hver datafil førEDDGridFraFiles ser på filene:
        
        * Den pakker pakkede variabler som brukesscale\\_factorog/elleradd\\_offset..
        * Den fremmer heltallsvariabler som har \\_Unsigned=sanne attributter til en større heltallsdatatype slik at verdiene vises som de udefinerte verdiene. For eksempel, en__Unsigned=true byte (8 bit) Variabel blir en signert kort (16 bit) Variabel.
        * Den konverterer \\_FillValue ogmissing\\_valueverdier som skal være NaNs (eller MAX\\_VALUE for heltallsdatatyper) ..
        
Den store fordelen med denne klassen er at det gir en måte å håndtere ulike verdier påscale\\_factor,add\\_offsetellermissing\\_valuei ulike filer i en samling. Ellers må du bruke et verktøy som[NcML](/docs/server-admin/datasets#ncml-files)eller[NCO](/docs/server-admin/datasets#netcdf-operators-nco)å endre hver fil for å fjerne forskjellene slik at filene kan håndteres avEDDGridFra NcFiles. For at denne klassen skal fungere riktig, må filene følge CF-standardene for de relaterte attributtene. Takk til Philippe Makowski.
    * Den nye type datasett[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)lar deg endre datasett som har noen lengdeverdier større enn 180 (f.eks. området 0 til 360) i datasett med lengdegradsverdier innen området -180 til 180 (Longitude Plus eller Minus 180, dermed navnet) .. Den store fordelen å tilby datasett med lengdegradsverdier i området -180 til 180 er atOGCTjenester (f.eks.WMS) krever lengdeverdier i dette området. Takket være Lynne Tablewski, Fabien Guichard, Philippe Makowski og Martin Spel.
2016-01-26 Oppdater: Eeek&#33; Dette har en feil som oppstår når barnedatasettet er enEDDGridFraErddap som refererer til et datasett i det sammeERDDAP.. Denne feilen er løst iERDDAP™v1.68.
    * I[Generer DatasetsXml](/docs/server-admin/datasets#generatedatasetsxml)En ny type spesialdatasett,EDDGridLonPM180FraErddapCatalog, lar deg genereredatasets.xmlforEDDGridLonPM180 datasett fra alleEDDGridDatasett i etERDDAPsom har noen lengdeverdier høyere enn 180.
    * For alleEDDGridDatasett, idatasets.xmlNå kan du bruke valgfrie
[&lt;tilgjengelig ViaWMS&gt; True|falsk&lt;/tilgjengelig ViaWMS&gt;] (/docs/server-admin/datasett#tilgjengeligeviawms)   (standard=sann) .. Hvis du setter dette til falskt tvangsdeaktivererWMSTjeneste for dette datasettet. Hvis det er sant, kan datasettet fortsatt ikke være tilgjengelig viaWMSav andre grunner (f.eks. ingen lat eller lonøkser) .. Dette er spesielt nyttig for datasett som eksisterer på egen hånd og pakket inn avEDDGridLonPM180, slik at bare LonPM180-versjonen er tilgjengelig viaWMS..
    * I config.xml, kan du angi en annen standard farge for bakgrunnen av grafer. Fargen er angitt som en 8-siffers heksadesimal verdi i form 0x_AARRGGBB_, hvor AA, RR, GG og BB er åpenhet, rød, grønn og blå komponenter, henholdsvis spesifisert som 2-siffersifierte heksadesimale tall. Legg merke til at lerret alltid er gjennomsiktig hvitt, så a (Semi -) gjennomsiktig graf bakgrunnsfarge blander seg inn i det hvite lerret. Standarden er lysblå:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Takk til John Kerfoot og Luke Campbell.
    * I setup.xml kan du nå angi maksimal størrelse for[loggfil](/docs/server-admin/additional-information#log)  (Når det endres til å logge. txt. Tidligere og ny logg. txt opprettes) I Megabytes. Minimum tillatt er 1. Det maksimale tillatte er 2000. Standarden er 20 (MB) .. For eksempel:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Idatasets.xml, [&lt;fgdcFile&gt;] (/docs/server-admin/datasett#fgdcfile) eller [&lt;iso19115File&gt;] (/docs/server-admin/datasett#iso19115file) kan nå være en lokal fil (som før) eller en URL (som vil bli lastet ned så det er en lokal kopi) .. HvisERDDAP™er ikke i stand til å laste ned filen, lastingen av datasettet vil fortsette, men datasettet vil ikke ha en fgdc eller iso19115-fil.
    *   EDDGridFra Filer og EDDTable FraFiles datasett kan nå gjøre en rask omstart (systemet somERDDAP™prøver å bruke når datasett først lastes nårERDDAP™på nytt) .. Dette øker omstartenERDDAP..
2016-01-26 Oppdater: Eeek&#33; Dette har en feil som forårsaker&lt;oppdaterEveryNMillis&gt; som skal ignoreres første gang datasettet lastes inn etter en omstart. Denne feilen er løst iERDDAP™v1.68.
    * En generell forbedring av det raske restartsystemet tillaterERDDAP™å laste datasett raskere nårERDDAP™er på nytt.
    * AlleEDDGridFra Filer og EDDTable FraFiles underklasser aksepterer nå en ny&lt;pathRegex&gt; tag, vanligvis spesifisert nedenfor&lt;rekursiv &gt;. Hvis rekursivt er " sant", bare fulle underkatalogstier som passer til banenRegex (standard=".*") vil bli akseptert. På samme måte, a&lt;sourceUrlS&gt; tag i enEDDGridAggregateExistingDimension kan nå inneholde en stiRegex-attributt (standard=".*") ..
    * Standard for&lt;partiellRequestMaxbytes&gt; i setup.xml er nå 4900000000 (~490 MB) .. Dette unngår noen problemer/tid relatert til å få data fra TREDDS dataservere. Takk til Leslie Thorne.
    * En liten endring av loggsystemet bør tillateERDDAP™å være mer responsiv når det er svært, veldig opptatt. Informasjon er nå skrevet til loggfilen på diskstasjonen i ganske store biter. Fordelen er at dette er svært effektivt -ERDDAP™vil aldri blokkere venter på at informasjonen skal skrives til loggfilen. Ulempen er at loggen nesten alltid vil avsluttes med en delvis melding, som ikke vil bli fullført før den neste delen er skrevet.
    * Feilretting relatert til iotify og [&lt;OppdaterEveryNMillis&gt;] (/docs/server-admin/datasett) system forEDDGridFra Filer og EDDTable Datasett fra Filer: Det er ikke lenger nødvendig å angi en stor fs.inotify.max\\_user\\_watches eller fs.inotify.max\\_user\\_instances. Det er en feil iJavaDette forårsaker deler avJava's inotify/WatchDirectory system for å ikke søppel samlet når de er finalisert; til slutt, antall zombie inotify klokker eller tilfeller ville overstige det maksimale antall angitt.ERDDAP™Nå jobber rundt detteJavabug.
Også antall inotify tråder er oppført på status.html-websiden, slik at du kan holde et øye med bruken. Vanligvis er det 1 inotify tråd perEDDGridFra Filer og EDDTable Fra Files datasett.
    * Feilretting: På mange steder, i stedet for at en feil blir gjengitt, ble det generert en ny feil som bare inkluderte en kort versjon av den opprinnelige feilmeldingen og uten stabelspor. Nå, når en ny feil genereres, inneholder den riktig hele det opprinnelige unntaket for eksempel, kaste ny unntak (En ny melding", e) ;
Takk til Susan Perkins.
    * Feilretting: til nylig (v1.64?) Hvis en .../datasetIDURL ble bedt om,ERDDAP™vil legge .html til URL. I v1.64 mislyktes dette (en feil formatert URL-adresse ble generert og feilet deretter) .. Nå virker det igjen. Takk til Chris Fullilove.

## Versjon 1.64{#version-164} 
 (utgitt 2015-08-19) 

*    **Nye funksjoner (for brukere) :)** 
    * Det er nå veiledning for tilgang til passordbeskyttet privatERDDAP™Datasett (https://) viacurlogPython.. Se[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)og[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)instruksjoner.
Takket være Emilio Mayorga fra NANOOS og Paul Janecek fra Spyglass Technologies.
         
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    *   ERDDAP™Nå kreverJava1.8+.
        Java1.7 nådde sin[Livets slutt](https://www.oracle.com/technetwork/java/eol-135779.html)  (ikke flere sikkerhetsoppdateringer) i april 2015. Denne versjonen avERDDAP™vil ikke fungere med versjoner avJavaUnder 1.8. Hvis du oppdaterer fraJava1,7x (eller tidligere) Du bør også oppdatere Tomcat. Se[ERDDAP™Sett opp instruksjoner](/docs/server-admin/deploy-install)for nedlasting av lenker og råd.
    * Nytt skjema for dataleverandør.
Når en dataleverandør kommer til deg i håp om å legge til noen data i dinERDDAP™, kan det være vanskelig og tidkrevende å samle alle metadata som trengs for å legge til datasettet iERDDAP.. Mange datakilder (for eksempel .csv-filer, Excel-filer, databaser) har ingen interne metadata, såERDDAP™har et nytt dataleverandørskjema som samler metadata fra dataleverandøren og gir dataleverandøren litt annen veiledning, inkludert omfattende veiledning for data i databaser. De innsendte opplysningene konverteres tildatasets.xmlformat og deretter e-post tilERDDAP™administrator (du) og skrevet (Legg til) til bigParentDirectory/logs/dataProviderForm.log . Således, skjemaet semi-automatiserer prosessen med å få en datasett iERDDAP™Men detERDDAP™administratoren må fortsatt fullføredatasets.xmlbit og håndtere å få datafilen (s) fra leverandøren eller tilkobling til databasen. For mer informasjon, se[Dataleverandør Beskrivelse av skjema](/docs/server-admin/datasets#data-provider-form)..
    * Ny&lt;matchAxisNDigits&gt;
Kan brukes avEDDGridFraFiles (og dermed fra NcFiles og fra FlightIRFiles) ,EDDGridAggregateEDDGridOppfattet ogEDDGridSideBySide-datasett for å angi hvor nøyaktig lik akseverdiene i ulike filer må være (Hvor mange siffer) : 0=ingen kontroll (Ikke bruk dette&#33;) 1, 1-18 for å øke presisjonen, eller 20 (standard) for nøyaktig likhet. For n=1-18,ERDDAP™sikrer at de første n-sifferene av doble verdier (eller (n+1) div 2 for flyteverdier) er like.
        &lt;matchAxisNDigits&gt; erstatter&lt;sikreAxisValuesAreEqual&gt;, som nå er foreldet. En verdi av 'true' vil bli konvertert til matchAxisNDigits=20. En verdi av 'falsk' (Ikke gjør dette&#33;) vil bli konvertert til å matche AxisNDigits=0.
    *   EDDGridFra Filer og EDDTable FromFiles vil laste veldig sakte første gang du bruker denne versjonen avERDDAP..
        ERDDAP™Nå lagrer den interne filinformasjonen litt annerledes, så den interne filtabellen for hvert av disse datasettene må gjenoppbygges. Så ikke bekymre deg. Ingenting er galt. En gangs ting.
    * Fjernkildefiler
        EDDGridFraNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles lar nå filene være eksterne filer i en katalog som er tilgjengelig avhttp://  (og sannsynligvishttps://Og ftp://, men de er ikke testet) Hvis den eksterne serveren støtter[Områdeforespørsler](https://en.wikipedia.org/wiki/Byte_serving)i forespørselshodet. THREDDS og Amazon S3 støtteområde forespørsler,HyraxDet gjør ikke. Dette systemet lar deg få tilgang til data i eksterne filer uten å laste ned filene (som er nyttig hvis fjernfilene er for voluminøse) , men tilgang til disse filene vil være langt langsommere enn tilgang til lokale filer eller til og med til en eksternOPeNDAPkilde.
Dette inkluderer"files"i en Amazon S3 bøtte siden de er tilgjengelige viahttp://.. Hvis S3-objektnavnene er som filnavn (med interne / er som en Linux katalog tre) ,ERDDAP™kan også gjøre filene tilgjengelige viaERDDAP's"files"systemet. For at dette skal fungere, må dine S3 legitimasjoner være i ~/.aws/credentials (på Linux, OS X eller Unix) , eller C:\\Brukere\\USERNAME\\.aws\\kreditiva (på Windows) på serveren medERDDAP.. Se[Amazon SDK dokumentasjon](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1)..
    * Opprett datasett Xml har et nytt, uvanlig alternativ: EDDsFromFiles.
Dette vil gå gjennom et filsystem (selv et eksternt system som en Amazon S3 hvis objektene har fillignende navn) og skapedatasets.xmlbiter for en rekke datasett. Kilasjen kan variere. Dette fungerer bra hvis filene er organisert slik at alle datafilene i en gitt mappe (og underdirektørene) er egnet for ett datasett (f.eks. alle SST 1-dagers kompositter) .. Ellers (f.eks. hvis en katalog inneholder noen SST-filer og noen Chlorophyll-a-filer) Dette virker dårlig, men kan fortsatt være nyttig.
    * Programmører: nye /lib .jar filer.
Hvis du kompilererERDDAP™, vennligst merk de nye .jar-filene i Classpath -cp-parameteren som er oppført iERDDAP™ [Programmørens veiledning](/docs/contributing/programmer-guide)..
    * hav\\_vann\\_praktisk
Hvis du bruker CF-standardnavnet sjø\\_vann\\_salinitet for enhver variabel, oppfordrer jeg deg til å bytte til sjø\\_vann\\_praktisk\\_salinitet som er tilgjengelig i[versjon 29 av CF Standard navnetabellen](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (og noen tidligere versjoner - jeg visste ikke det) .. Dette navnet indikerer at dette faktisk er en praktisk salinity verdi ved hjelp avPractical Salinity Units  (PSU) I motsetning til en høyere g/kg-verdi. De kanoniske enhetene er forskjellige, men likevel utrolig uhjelpelig: 1 (Sannsynligvis antyderPSU/PSS-78) I motsetning til 1e-3 (Sannsynligvis betyr g/kg) for sjø\\_vann\\_salinity.\\[Hei,UnidataCF: Vi identifiserer verdier som bruker andre skalaer, for eksempel Fahrenheit eller Celsius, via en enhetsstreng som er navnet på skalaen eller noen variasjon. Hvorfor kan vi ikke identifisere salinity enheter via deres skala, for eksempel PSS-78? Jeg vet: PSS-78 verdier er - enhetsløse - men det er en underforstått skala, ikke sant? Hvis jeg oppfinner en ny praktisk salinitetsskala hvor verdiene er 0,875 ganger PSS-78-verdiene, bør de kanoniske enhetene fortsatt være -- Hvordan kan en bruker fortelle dem fra hverandre? Enheter på 1e-3 og 1 er verken beskrivende eller nyttige for brukere som prøver å finne ut hva tallene indikerer.\\]

## Versjon 1.62{#version-162} 
 (utgitt 2015-06-08) 

*    **Nye funksjoner (for brukere) :)** 
    * ForEDDGriddatasett, brukere kan nå gjøre Graph Type: Overflate grafer med enhver kombinasjon av numeriske akser, ikke bare lengdegrad versus breddegrad. Dette lar deg gjøre x versus y (projisert) grafer og ulike[Hovmöller Diagram](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram)F.eks. planlegger lengdegrad versus dybde eller tid versus dybde.\\[Merk: Hvis dybden er på Y-aksen, vil den sannsynligvis bli snudd fra det du vil ha. Beklager, det er ennå ikke et alternativ.\\]Takk til Cara Wilson og Lynn DeWitt.
    * Det er en ny[Oceanic/Atmospheric Akronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)som lar deg konvertere et felles oceanisk/atmosfærisk akronym til/fra et fullt navn.
    * Det er en ny[Oceanisk/atmosfærisk Variabel navn konvertering](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)som lar deg konvertere et felles oseanisk/atmosfærisk variabelnavn til/fra et fullt navn.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    *   JavaPGP
        Oracleikke lenger støtter (gir sikkerhetsfeilrettinger for)  Java7.ERDDAP™Fortsatt støtterJava7, men gå tilJava8. Neste utgivelse avERDDAP™vil sannsynligvis kreveJava8.
    *   valid\\_min/max/range
Tidligere og nå, hvisdataVariablehaddescale\\_factorogadd\\_offsetmetadata,ERDDAP™pakker ut dataverdier og fjerner metadata. Tidligere,ERDDAP™ikke endre/utpakke noenvalid\\_range,valid\\_min,valid\\_maxMetadata (som vanligvis/må inneholde pakkede verdier) vedscale\\_factorogadd\\_offset.. Nå gjør det det. Vennligst søk dinERDDAP™For " gyldig\\_" og sørg for at alle variablene som harvalid\\_range,valid\\_min, ellervalid\\_maxhar de riktige verdiene når datasettene vises i den nye versjonen avERDDAP.. Se[valid\\_range/min/maks dokumentasjon](/docs/server-admin/datasets#valid_range)..
    * ACDD-1.3
Tidligere,ERDDAP™  (spesielt Generer datasett Xml) Brukt/anbefalt original (1.0) versjon av[NetCDFAttributkonvensjon for datasett Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)som kallesUnidataDatasett Discovery v1.0" i de globale konvensjonene ogMetadata\\_Conventionsattributter. Nå anbefaler vi[ACDD versjon 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)som ble ratifisert i begynnelsen av 2015 og er omtalt som "ACDD-1.3". Heldigvis er ACDD-1.3 svært bakover kompatibel med versjon 1.0. Vi samtykker i at du[bytte til ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13).. Det er ikke vanskelig.
    * Opprett datasett Xml-attributter
Det var mange endringer for å forbedre&lt;addAttributes&gt; verdier foreslått av GenerateDatasets Xml for de globale konvensjonene,creator\\_name/email/url, nøkkelord, sammendrag og tittelattributter og for variabelenlong\\_nameAttribut. Noen endringer er knyttet til ny bruk av ACDD-1.3.
    * EDDTableFraSOSDatasett
Med tilsetning av nye typerSOSservere og endringer i gamle servere, det blir vanskeligere forERDDAP™for å automatisk oppdage servertypen fra serverens svar. Bruk av [&lt;sosServerType&gt;] (/docs/server-admin/datasett#edtableFromsos-skeleton-xml)   (med en verdi av IOOS\\_NDBC, IOOS\\_NOS,OOSTethyseller WHOI) Nå er det STRONGLIG. Hvis noen av dine datasett av denne typen har problemer i den nye versjonen avERDDAP, prøv å kjøre om Genererer Datasett Xml tilSOSserver å generere en ny bit avdatasets.xmlFor det datasettet. Opprett datasett Xml vil la deg prøve ut det forskjellige&lt;sosServerType&gt; alternativer til du finner den riktige for en gitt server. Hvis du fortsatt har problemer, vennligst gi meg beskjed om problemet du ser og URL-en til serveren og jeg vil prøve å hjelpe.
    * EDDTableFromFileNames datasett
Noen egenskaper som ble anbefaltaddAttributesNå er det kildeAttributes. Du trenger sannsynligvis ikke å endre noe for eksisterende datasett i dindatasets.xml..
    * Feilretting relatert til visse forespørsler til EDDTableFromNcCFFiles datasett.
Jeg tilsatte også et stort antall enhetstester til det eksisterende store antall enhetstester av de underliggende metodene (Det finnes 100 scenarier) .. Takk til Eli Hunter.
    * Feilretting / små endringer iEDDGridFra Flightir.
Takk til Jonathan Lafite og Philippe Makowski
    * Feilretting:EDDGridFraErddap fungerer nå selv om et fjerndatasett ikke harioos\\_categoryvariable attributter.
Takk til Kevin O'Brien.
    * Feilretting i .graph nettside forEDDGriddatasett når det bare er én aksevariabel med mer enn én verdi.
Takk til Charles Carleton.
    * Det var andre små forbedringer, endringer og feilrettinger.

## Versjon 1.60{#version-160} 
 (utgitt 2015-03-12) 

*    **Nye funksjoner (for brukere) :)** ingen
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * STRONGGY REPUBLICED: Oppdater serverens[robots.txt](/docs/server-admin/additional-information#robotstxt)fil å inkludere:
Avslå: /erddap/filer/
    * Inotiser problem og løsning:
På Linux datamaskiner, hvis du bruker&lt;OppdaterEveryNMillis&gt; med datasett med type=EDDGridFra Filer, EDDTabellFra Filer,EDDGridKopier, EDDTableCopy eller deres underklasser, kan du se et problem der et datasett ikke lastes (Noen ganger eller konsekvent) med feilmeldingen: "IOException: Brukergrense for inotify tilfeller nådd eller for mange åpne filer". I så fall kan du løse dette problemet ved å ringe (som rot) :)
echo fs.inotify.max\\_user\\_watches=65536|tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instrument=1024|tee -a /etc/sysctl.conf
sysctl-p
Bruk høyere tall hvis problemet fortsetter. Standarden for klokker er 8192. Standarden for tilfeller er 128.\\[UPDATE: Det er en feil iJavasom forårsaker inotify tilfeller ikke samles inn. Dette problemet unngås iERDDAP™v1.66 og høyere. Så den bedre løsningen er å bytte til den siste versjonen avERDDAP..\\]
    * NoSuchFileException Feilretting:
Det var en feil som kunne forårsake datasett av type=EDDGridFra Filer, EDDTabellFra Filer,EDDGridKopier, EDDTableCopy eller deres underklasser til ikke å laste noen ganger med feilen "NoSuchFileException: _someFileName_". Feilen er relatert til bruk av FileVisitor og ble introdusert iERDDAP™v1.56. Problemet er sjelden og er mest sannsynlig å påvirke datasett med et stort antall ofte skiftende datafiler.
    * Det var små forbedringer, endringer og feilrettinger.

## Versjon 1.58{#version-158} 
 (utgitt 2015-02-25) 

*    **Nye funksjoner (for brukere) :)** 
    * Den nye["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)systemet lar deg bla gjennom et virtuelt filsystem og laste ned kildedatafiler fra mangeERDDAP™Datasett. Den"files"Systemet er som standard aktivt, menERDDAP™administratorer kan deaktivere det ved å sette
```
        <filesActive>false</filesActive>  
```
iERDDAP™config.xml fil. Spesielt takket være Philippe Makowski, som fortsatte da jeg var langsom til å sette pris på skjønnheten i denne ideen.
    * tidsdestinasjon Max -- Tidligere hadde tidsvariabelen til EDDTable-datasett med nær sanntidsdata en destinasjonMax av NaN, som inneholdt at den maksimale tidsverdien for datasettet er nylig, men ikke nøyaktig kjent og endres ofte. Nå har destinasjonenMax en reell verdi, noe som indikerer den for tiden kjente siste gang. Mange datasett har kontinuerlig oppdatert data.ERDDAP™støtter tilgang til de nyeste dataene, selv om det er etter den for tiden kjente siste gang. Merk at den nye [&lt;OppdaterEveryNMillis&gt;] (/docs/server-admin/datasett) støtte iEDDGridFra Filer og EDDTable FraFiles datasett oppdaterer tidsvariabelens destinasjonMax. En annen konsekvens av denne endringen er atdatasetID=allDatasetsdatasettet inkluderer nå den kjente sist gang i maxTime-kolonnene. Takk til John Kerfoot.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * STRONGGY REPUBLICED: Oppdater serverens[robots.txt](/docs/server-admin/additional-information#robotstxt)fil å inkludere:
Avslå: /filer/
Avslå: /erddap/filer/
    * Prøvedatasets.xml-- Forrige år anbefalte vi flere utmerkede datasett i CoastwatchERDDAP™som du kan legge til i dinERDDAP™Bare ved å legge til noen linjer til dindatasets.xml.. Hvis du har lagt til erdVH-datasettene, må du bytte til de nyere erdVH2-datasettene:
        * Lag en kopi av alle erdVH datasett og endre kopiendatasetIDfra ErdVH til ErdVH2 og endre referansensourceUrlfra ErdVH til ErdVH2....
        * Sett erdVH... datasett til aktiv="falsk".
    * AlleEDDGridFra Filer og EDDTable FraFiles underklasser støtter nå [&lt;tilgjengeligViaFiles&gt;] (/docs/server-admin/datasett#tilgjengelige filer) å gjøre kildedatafilene tilgjengelige via"files"systemer. Som standard, dette systemet er av for hvert datasett. Du må legge til merket for å aktivere det. Takk til Philippe Makowski.
    * AlleEDDGridFra Filer og EDDTable FraFiles underklasser støtter nå [&lt;OppdaterEveryNMillis&gt;] (/docs/server-admin/datasett) .. Som standard, dette systemet er av for hvert datasett. Du må legge til merket for å aktivere det. Takk til Dominic Fuller-Rowell og NGDC.
    * Den nye[EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames)oppretter et datasett fra informasjon om en gruppe filer i serverens filsystem, men det tjener ikke data fra inne i filene. For eksempel er dette nyttig for å distribuere samlinger av bildefiler, lydfiler, videofiler, ordbehandlingsfiler og regnearkfiler. Dette virker hånd i hånd med det nye["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)systemet, slik at brukerne kan laste ned filene. Spesielt takket være Philippe Makowski, som fortsatte da jeg var langsom til å sette pris på skjønnheten i denne ideen.
    * Den nye[EDDGridFra EDDTable](/docs/server-admin/datasets#eddgridfromeddtable)lar deg konvertere en tabell datasett til et gitt datasett. Takk til Ocean Networks Canada.
    * Den nye[EDDGridFra FlightIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)aggregerer data fra en gruppe av lokale fusioner.gzFiler.EDDGridFra FlameIRFiles har forskjellen på å være den første delen av koden bidratt tilERDDAP.. Den ble gjort helt uten vår hjelp. Tre jubler og spesielt takket være Jonathan Lafite og Philippe Makowski fra R.Tech Engineering.
    * Det er en ny, valgfri setup.xml tag,&lt;enhetTestDataDir&gt;, som spesifiserer katalogen med enhetens testdatafiler som er tilgjengelige via et nytt GitHub-arkiv:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest).. For eksempel:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Dette er ikke nyttig ennå, men er en del av bevegelsen mot å gjøre så mange av enhetstestene som mulig. Takk til Terry Rankine.
    * Det var mange små forbedringer, endringer og feilrettinger.

## Versjon 1.56{#version-156} 
 (utgitt 2014-12-16) 

*    **Nye funksjoner (for brukere) :)**   (Ingen) 
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Du vet sikkert allerede om[EDDGridFraErddap](/docs/server-admin/datasets#eddfromerddap)og[EDDTableFraErddap](/docs/server-admin/datasets#eddfromerddap)som lar deg koble til datasett i andreERDDAPog få dem vist seg i dinERDDAP.. Brukerforespørsler om faktiske data fra disse datasettene blir rutet usynlig til kildenERDDAP™, slik at dataene ikke flyter gjennom systemet eller bruker båndbredden din. Det er nå en stor liste over anbefalte datasett i prøvendatasets.xmli ErddapContent.zip.. å inkludere dem i dinERDDAP™Alt du trenger å gjøre er å kopiere og lime de du vil inn i dindatasets.xml.. Takk til Conor Delaney.
    * Hvis du kompilererERDDAP™Du må legge til noe nytt. krukke filer til din[classpath-cp bryter](/docs/contributing/programmer-guide#development-environment)Javac og java.
    * Den nye[EDDTableFraCassandra](/docs/server-admin/datasets#eddtablefromcassandra)håndterer å få data fra[Cassandra](https://cassandra.apache.org/).. Takk til Ocean Networks Canada.
    * Den nye[EDDTableFraColumnarAsciiFiler](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)håndterer å få data fra ASCII-datafiler med faste breddekolonner. Takk til Philippe Makowski.
    * AlleEDDGridFra Filer og EDDTable FraFiles underklasser bruker nå en ny metode, FileVisitor (lagt til iJavai 1,7) å samle informasjon om filene. Dette kan ikke ha noen fordel for den første samlingen av filinformasjon for et gitt datasett, men ser ut til å ha en stor fordel for etterfølgende samlinger hvis det gjøres snart, mens OS fortsatt har informasjonen cached. Takk til NGDC.
        
Vi anbefaler fortsatt: Hvis et datasett har et stort antall filer (f.eks. &gt;1,000) , operativsystemet (og dermedEDDGridFraFiler og EDDTableFra Filer) vil fungere mye mer effektivt hvis du lagrer filene i en rekke underkataloger (én per år, eller én i måneden for datasett med svært hyppige filer) , slik at det aldri er et stort antall filer i en gitt katalog.
        
    * Flere små forbedringer til EDDTableFromAsciiFiles.
    * Noen forbedringer av EDDTableFromAsciiServiceNOS, spesielt for å få noen ekstra kolonner med informasjon fra kilden. Takk til Lynn DeWitt.
    * Noen små feilrettinger relatert til ISO 19115 somERDDAP™genererer. Takk til Anna Milan.

## Versjon 1.54{#version-154} 
 (utgitt 2014-10-24) 

*    **Nye funksjoner (for brukere) :)** 
    * Noen variabler fungerer nå med tiden ved millisekunder presisjon, f.eks. 2014-10-24T16:41:22.485Z. Takk til Dominic Fuller-Rowell.
*    **Små endringer/Bug Fixes:** 
    * Feilrettelse: med en viss kombinasjon av omstendigheter,EDDGridFraNcFile datasett returnerte data ved redusert presisjon (f.eks. flyter i stedet for dobler) .. Dette kan kun påvirke dataverdier med &gt; 8 signifikante tall. Unnskyld. (Og det var en klassisk dataprogrammeringsfeil: ett feil tegn.) Takk til Dominic Fuller-Rowell.
    * Mange små endringer.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Griddap datasett støtter nå tidsstempleaksevariabler og datavariabler (dvs. variabler med tidsverdier, mendestinationNameannet enn"time") .. Takk til Dominic Fuller-Rowell.
    *   ERDDAP™nå riktig støtter millisekundertime\\_precision"1970-01-01T00:00:000.000Z". En intensjonell quirk: når du skriver tider til menneskelige-orienterte filer (f.eks. csv,.tsv,.json,.xhtml) ,ERDDAP™bruker den angittetime\\_precisionHvis det inkluderer sekunder og/eller desimal sekunder; ellers bruker det sekundertime\\_precision"1970-01-01T00:00:00Z" (for konsistens og baklengs kompatibilitet) .. Takk til Dominic Fuller-Rowell.
    *   EDDGridFraNcFiles støtter nå lesingsstrengdataVariableS.
    *   .ncfiler skrevet av griddap kan nå ha strengdataVariableS.
    * Opprett datasett Xml inneholder nå mer flush () ringer for å unngå at informasjonen ikke blir skrevet til filene. Takk til Thierry Valero.
    * Dokumentasjonen for GenerationDatasetsXml ble forbedret, spesielt for å påpeke at -i-bryteren bare virker hvis du angir alle svarene på kommandolinjen (f.eks. skriptmodus) .. Og manusmodus er forklaret. Takk til Thierry Valero.
    *   ERDDAP™ikke lenger tillate to variabler i et datasett å ha det sammesourceName.. (Hvis noen gjorde det før, det sannsynligvis førte til feilmeldinger.) Som før,ERDDAP™La ikke to variabler i et datasett ha det sammedestinationName..

## Versjon 1.52{#version-152} 
 (utgitt 2014-10-03) 

*    **Nye funksjoner:**   (ingen) 
*    **Små endringer/Bug Fixes:** 
    * En annen (mindre) Endre å gjøreERDDAP™raskere.
    * Forbedring av ISO 19115-filer generert avERDDAPTilsatt nylig anbefalt&lt;gmd:protocol&gt; - verdier (informasjon, søk,OPeNDAP:)OPeNDAP,ERDDAP:griddap, ogERDDAP:)tabledap) innen&lt;gmd:CI\\_OnlineResource&gt;. Takket være Derrick Snowden og John Maurer.
    * Mange små endringer.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Feilretting: GenerererDatasetsXml.sh og DasDds.sh var ikke i erddap.war for 1.48 og 1.50. Nå er de det. Takk til Thierry Valero.
    * Små endringer i noen hastighetsprøver i TestAll for å gjøre dem mindre utsatt for sjanse. Takk til Terry Rankine.

## Versjon 1.50{#version-150} 
 (utgitt 2014-09-06) 

*    **Nye funksjoner:**   (ingen) 
*    **Små endringer/Bug Fixes:** 
    * DetteERDDAP™Det bør være mye raskere enn nylige versjoner.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:**   (ingenting) 

## Versjon 1.48{#version-148} 
 (utgitt 2014-09-04) 

*    **Nye funksjoner:** 
    *   ERDDAP™Nå alltid oppretter en tabell datasett,datasetID=allDatasets, som har en tabell med informasjon om alle datasett i detteERDDAP.. Det kan spørres som alle andre tabelldatasett. Dette er et nyttig alternativ til det aktuelle systemet for å få informasjon om datasett programmatisk.
    * Det finnes to nye utgangsfiler for EDDTable ogEDDGrid.csv0 og.tsv0. De er komma- og fanedelte verdifiler som ikke har linjer med kolonnenavn eller enheter. Dataene starter på første linje. De er spesielt nyttige for skript som bare vil ha en del informasjon fraERDDAP..
*    **Små endringer/Bug Fixes:** 
    * Kart kan nå gjøres til lengdegrader i området -720 til 720.
    * Den nye.ncml respons File Type er tilgjengelig for alleEDDGridDatasett. Den returnerer[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\-formatert beskrivelse av datasettet (lignende en kombinert .dds + .das) ..
    * Feilretting: Lagre tabelldata til en.ncfilen var begrenset til 100.000 verdier per variabel. Nå er det bare begrenset til 2 GB total filstørrelse. Takk til Kevin O'Brien.
    * Feilretting: SaveAsMatlabMetoder sikrer nå atdatasetIDS blir konvertert til trygtMatlabVariable navn. Jeg anbefaler at du skaperdatasetIDS som er gyldige variable navn: starter med en bokstav og deretter bare ved hjelp av A-Z, a-z, 0-9 og \\_. Se[datasetID](/docs/server-admin/datasets#datasetid).. Takk til Luke Campbell.
    * Feilretting i EDDTableFraDatabase: Med noen typer databaser, en NO-_ DATA-respons fra databasen førte til en meningsløs 30 andre forsinkelse iERDDAP.. Takk til Greg Williams.
    * Feilretting:EDDGridLag en graf med graftype = linjer (eller markører eller markører og linjer) Tvunget x-aksevariabel til å være tid. Nå kan det være hvilken som helst akse. Takk til Lynn DeWitt.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * STRONGLY KJØP: OppdaterJava  
Denne versjonen avERDDAP™kreverJava7 eller høyere, menJava7 vil nå slutten av livet i april 2015 (Snart&#33;) Så nå er det en god tid å bytte tilJava8. SåJava8 er STRONGLY FORSLAGT. Jeg tester medJava8. Legg merke til atJava6 nådde slutten på livet i februar 2013 (ikke flere sikkerhetsfeilrettinger&#33;) ..
    * STRONGGY FORSLAG: Oppdater Tomcat
Hvis du bruker Tomcat, må du bytte til den nyeste versjonen av Tomcat. Tomcat 8 er designet for å jobbe medJava8.
    * "ERDDAP" er ikke lenger et akronym. Nå er det bare et navn. Jeg vil ikke at navnet skal markeresERD.. Jeg vil haERDDAP™å fremheve din institusjon og dine data.
    * PLEASE[tilpasse utseendet på dinERDDAP™installasjon for å fremheve din institusjon og dine data](/docs/server-admin/deploy-install#customize).. Med en times arbeid kan du gjøre fine forbedringer som vil vare for alltid.
    * I setup.xml, den&lt;VisDiagnosticInfo&gt;-alternativet blir nå alltid ignorert og behandlet som om verdien var falsk.
Oppsummert: Fjern den&lt;visningDiagnosticInfo&gt; tag og relatert informasjon fra config.xml.
    * I setup.xml, standard for&lt;drawLandMask&gt; var -over - men nå er det - under - som er en bedre generell standard (fungerer bra med alle datasett) ..
    * CreateDatasetsXml.sh og DadDds.sh Linux skriptene bruker nå bash i stedet for csh, og har utvidelsen .sh. Takk til Emilio Mayorga
    * Opprett datasett Xml og DasDds oppretter nå sine egne loggfiler (Generer DatasetsXml.log og DasDds.log) og utgangsfiler (Generer DatasetsXml.out og DadDds.out) i _bigParentDirectory_/logs/, og aldri sette sine resultater på utklippstavlen.
    * Opprett datasett Xml støtter nå en -i kommandolinjeparameter som setter utgangen i den angitte filen på et spesifisert sted. Se[dokumentasjon](/docs/server-admin/datasets#generatedatasetsxml).. Takk til Terry Rankine.
    * EDDTableFraDatabase støtter nå&lt;kolonneName&lt;/kolonneNameQuotes&gt;, med gyldige verdier " (standard) eller ingenting. Dette tegnet (dersom noen) vil bli brukt før og etter kolonnenavn i SQL-forespørsler. Forskjellige typer databaser, satt opp på forskjellige måter, vil trenge ulike kolonnenavnsmerker.
    * Tabular breddegrad og lengdegrad variabler kan nå ha tilpassetlong\\_name- Profilutvidelse. Tidligere kan de bare være latitude og langmodighet.
    * Fra nå av angi " standardDataQuery" og "standardGraphQuery" som attributter i datasettets globale metadata (dvs.&lt;AddAtts&gt;), ikke som separat&lt;standardDataQuery&gt; og&lt;standardGraphQuery&gt; tags. (Hvis du fortsatt angir dem via taggene,ERDDAP™vil automatisk opprette globale attributter med informasjonen.) 

## Versjon 1.46{#version-146} 
 (utgitt 2013-07-09) 

*    **Nye funksjoner:** 
    *    (Ingen) 
*    **Små endringer/Bug Fixes:** 
    * Feilretting: I EDDTableFromDatabase, kun i versjon 1.44,ERDDAP™Ukorrekt sitert databasens tabellnavn i SQL-setninger. Nå er det fikset. Takk til Kevin O'Brien.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    *    ** Hvis du ikke endrer standard meldinger i messages.xml,
slette\\[tomcat\\]/content/erddap/messages.xml . **   
Standard messages.xml filen er nå i erddap. krigsfil, ikke erddapContent.zip.. Så, du trenger ikke lenger å manuelt oppdatere meldinger.xml .
    * Hvis du endrer meldingene i messages.xml, fra nå av, hver gang du oppdatererERDDAP™Enten:
        * Gjør de samme endringene du gjorde før den nye
            \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Denne gangen: Slett\\[tomcat\\]/content/erddap/messages.xml .
        * Eller, finne ut hva som har endret seg i de nye meldingene.xml (via diff) , og endre din
            \\[tomcat\\]/content/erddap/messages.xml fil tilsvarende.

## Version 1.44{#version-144} 
 (utgitt 2013-05-30) 

*    **Nye funksjoner:** 
    * Spørsmål til EDDTable-datasett støtter nå &orderByMin (...) og &orderByMinMax (...)   (som returnerer to rader i hver gruppe, med minimum og maksimum av det sisteorderByverdi) .. Takk til Lynn DeWitt.
    * Det er to nyetabledapfiltyper:.ncCFHeader og.ncCFMAHeader (som returnerer den ncdump-lignende overskriften til det tilsvarende.ncCF og.ncCFMA filtyper) .. Takket være Steve Hankin.
*    **Små endringer/Bug Fixes:** 
    * Feilrettelse: lasting av .graph og .html nettsider for datasett med mye tid verdier var langsom fordiERDDAP™var langsom når du genererte tidsbryteralternativene. Nå er det alltid raskt. Takk til Michael Barry, OOICI og Kristian Sebastian Blalid.
    * Feilretting: I noen EDDTable-datasettstyper ble ikke tidsbegrensningene alltid håndtert riktig. Nå er de det. Takk til John Maurer og Kevin O'Brien.
    * Feilretting: datasett ville ikke lastes når allesubsetVariablesvar faste verdivariabler. Nå vil de det. Takk til Lynn DeWitt og John Peterson.
    * IMPROVED: Nå fungerer alle spørringer for bare undergruppevariabler som om & fjernt () er en del av spørringen.
    * IMPROVED: nå, for spørsmål som inkluderer &.jsonp=_funksjonsnavn_, _funksjon Navn_ må nå være en serie på 1 eller mer (Periodedelt) Ord. Hvert ord må starte med en ISO 8859 bokstav eller "\\_" og følges av 0 eller flere ISO 8859 bokstaver, siffer eller "__". Dette er mer restriktivt ennJavaScripts krav til funksjonsnavn.
    * Tidsaksen på grafer fungerer nå godt i lengre tidsintervaller (80-10000 år) kortere tidsintervaller (0.03 - 180 sekunder) ..
    *   ERDDAP™er nå mer tilgivende når du tolker variasjoner av ISO-8601-format tidsdata.
    * Det var mange andre små endringer og feilrettinger.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    *    **Du må oppdatere den nyeste versjonen for å være sikker.**   
        ERDDAP™gjennomgått en sikkerhetsrevisjon. Det var noen feil og svakheter. Versjon 1.44 inkluderer flere viktige sikkerhetsfeilrettinger og flere endringer for å øke sikkerheten og tilgjengeligheten (f.eks. for synshemmede brukere) .. Versjon 1.44 har passert oppfølgingskontroll. Takk til alle gode mennesker på USGS og Acunitix som gjorde dette mulig. (Burde ikkeNOAAGjør du dette?) 
    * Den nye[EDDTableFraWFSFiler](/docs/server-admin/datasets#eddtablefromwfsfiles)gjør en lokal kopi av alle data fra enArcGISKartServerWFSserver og så kan dataene lagres raskt.ERDDAP™brukere. Takk til Christy Caudill.
    * Den nye[EDDTableFraEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)lar deg opprette et EDDTable-datasett fra etEDDGrid- Datasett. Noen vanlige grunner til dette er:
        * Dette gjør at datasettet kan spørres medOPeNDAPutvalg av begrensninger (som en bruker kan ha bedt om) ..
        * Datasettet er iboende et tabellisk datasett. Takk til OOICI, Jim Potemra, Roy Mendelssohn.
    * Det variable navnet " dypere" er nå et spesielt alternativ til " altid". Enhetene må være noen variant av "meter". Dataverdiene må være positive = ned.ERDDAP™er nå fullt klar over betydningen av " dybde" og støtter den uansett hvor høyden støttes (f.eks. som en komponent i et CF DSG-cdm\\_data\\_type=profildatasett) .. En datasett må ikke ha både "dybde" og "itude" variabler.
    * I dindatasets.xml, vennligst fjern bruk av&lt;at name="cdm\\_altitude\\_proxy"&gt;dybde&lt;/att&gt; siden dybden nå er et spesielt alternativ til høyde og så trenger ikke å være spesielt identifisert.
    * I dindatasets.xml, vennligst fjern bruk av&lt;høydemålerePerSourceUnite&gt;, bortsett fra EDDTable FraSOS..
Når verdien er 1, bare slette den.
Når verdien er -1, vurdere å endre variabelnavn til dybde.
For andre verdier, legg til i&lt;addAttributes&gt; for eksempel:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Alle datasett støtter nå
        
        *   &lt;standardDataQuery&gt; som brukes dersom .html er bedt om uten spørring.
            * Du trenger sannsynligvis sjelden å bruke dette.
            * For netdap datasett, er en vanlig bruk av dette å spesifisere en annen standard dybde eller høyde dimensjonsverdi (f.eks.\\[0\\]i stedet for\\[siste\\]) ..
I alle fall bør du alltid liste alle variabler, alltid bruke de samme dimensjonsverdiene for alle variabler, og nesten alltid bruke\\[0\\],\\[siste\\], eller\\[0:sist\\]For dimensjonsverdiene.
For eksempel:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Fortabledapdatasett, den vanligste bruken av dette er å angi et annet standard tidsområde (relativt til nå, f.eks. &time&gt;=now-1 dag) ..
Husk at å be om ingen datavariabler er det samme som å spesifisere alle datavariabler, så vanligvis kan du bare spesifisere den nye tidsbegrenselsen.
For eksempel:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;standardGraphQuery&gt; som brukes hvis .graph er bedt om uten spørring.
            * Du trenger sannsynligvis sjelden å bruke dette.
            * For datasett for netdap er den vanligste bruken av dette å angi en annen standarddybde eller høydedimensjonverdi (f.eks.\\[0\\]i stedet for\\[siste\\]) og/eller for å angi at en bestemt variabel grafiseres.
I alle tilfeller vil du nesten alltid bruke\\[0\\],\\[siste\\], eller\\[0:sist\\]For dimensjonsverdiene.
For eksempel:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Fortabledapdatasett, de vanligste brukene av dette er å angi ulike variabler som skal graferes, et annet standard tidsområde (relativt til nå, f.eks. &time&gt;=now-1 dag) og/eller forskjellige standardgrafikkinnstillinger (f.eks. markørtype) ..
For eksempel:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Husk at du trenger å XML-kode eller prosent-enkode (En, men ikke begge) standardspørsmål siden de er i et XML-dokument. For eksempel blir & amp;amp; ,&lt;blir &amp;lt; , og &gt; blir &amp;gt; .
Sjekk arbeidet ditt. Det er enkelt å gjøre en feil og ikke få det du vil ha.
Takket være Charles Carleton, Kevin O'Brien, Luke Campbell og andre.
    *   EDDGridFra Dap,EDDGridFra Erddap, og EDDTableFraEDDGridhar et nytt system for å håndtere datasett som endres ofte (så ofte som omtrent hver 0,5 s) .. I motsetning tilERDDAP's regulære, proaktive system for fullstendig reloading hvert datasett, dette valgfrie ekstra systemet er reaktiv (utløst av en brukerforespørsel) og trinnvis (Oppdatere informasjonen som må oppdateres) .. For eksempel hvis en forespørsel til enEDDGridFraDap datasett forekommer mer enn det angitte antall millisekunder siden den siste oppdateringen,ERDDAP™vil se om det er nye verdier for venstre (vanligvis"time") dimensjon og i så fall bare laste ned de nye verdiene før håndtering av brukerens forespørsel. Dette systemet er veldig bra til å holde en raskt skiftende datasett oppdatert med minimale krav til datakilden, men til kostnad av å senke behandlingen av noen brukerforespørsler. Se [&lt;OppdaterEveryNMillis&gt;] (/docs/server-admin/datasett)   
Takk til Michael Barry og OOICI.
    *   EDDGridFraNcFiles, EDDTableFromNcFiles og EDDTableFromNcCFFiles støtter nå[NcML.ncml](/docs/server-admin/datasets#ncml-files)kildefiler i stedet for.ncFiler. Takk til Jose B Rodriguez Rueda.
    * ForEDDGridAggregateERDDAP™støtter en ny serverType="dodsindex" alternativet for serverType-attributten til serveren&lt;sourceUrls&gt; tag. Dette fungerer med nettsider som har lister over filer i&lt;pre&gt;&lt;/pre&gt; og ofte under enOPeNDAPlogo. Et eksempel er[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)..
    * For EDDTabellFraSOSnå støtter en valgfri tag
```  
        <sosServerType>_serverType_</sosServerType>  
```
Du kan angi typenSOSserver (såERDDAP™trenger ikke å finne det ut) .. Gyldige verdier for&lt;_serverType_&gt; er IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, og whoi (en nystøttet server Type) .. Se[EDDTableFraSOS](/docs/server-admin/datasets#eddtablefromsos).. Takk til Derrick Snowden og Janet Fredericks.
    * AlleEDDGridFiler, EDDTableFra...Filer,EDDGridKopier og EDDTable Kopier nå støtter en valgfri tagg
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
som kan fortelleERDDAP™å beholde filen Tabell (med informasjon om hver kildedatafil) I stedet for bare på disken (standard) .. Å holde filtabellen i minnet øker forespørsler om data (spesielt hvis det er &gt; 1000 kildedatafiler) Men bruk mer minne. Hvis du setter dette til sant for alle datasett, hold øye med minnet: bruker linjen på _dynamisk_/erddap/status.htmlfor å sikre atERDDAP™Det er mye gratis minne. Takk til Fredrik Stray.
    * EDDTableFraSCIIFiles støtter nå&lt;Tegnsett &gt;. De to vanligste tegnsettene (saksfølsom&#33;) er ISO-8859-1 (standard) og UTF-8.
    * Anbefalt: i setup.xml, i&lt;startHeadHtml&gt;, vennligst endre&lt;html&gt; i
        &lt;html lang="en-USA"&gt; (eller en annen[språkkode](https://www.w3schools.com/tags/ref_language_codes.asp)hvis du har oversatt meldinger.xml) ..
    * setup.xml har nye valgfrie tags å deaktivere deler avERDDAP:)
        *   &lt;konvertereActive&gt;falske&lt;/convertersActive&gt;&lt;&#33;--- standarden er sann --&gt;
        *   &lt;slideSorterActive&gt;falsk&lt;/slideSorterActive&gt;&lt;&#33;--- standarden er sann --&gt;
        *   &lt;wmsActive&gt;false&lt;/wmsActive &gt;&lt;&#33;--- standarden er sant --&gt; Generelt anbefaler vi å sette noen av disse til falsk.
    * Opprett datasett Xml skriver nå resultater til _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, ikke log.txt. Takk til Kristian Sebastian Blalid.
    * Opprett datasett Xml gjør nå et godt forslag til&lt;Last på nytt Alle minuter &gt; Takket væreNOAAUAF-prosjekt.
    * Mange små forbedringer til GenerererDatasetsXml. Takket væreNOAAUAF-prosjekt.

## Versjon 1.42{#version-142} 
 (utgitt 2012-11-26) 

*    **Nye funksjoner:** 
    *    (Ingen nye funksjoner.) 
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Hvis du oppgraderer fraERDDAP™1.38 eller 1.40, det var ingen endringer som krever at du gjør endringer i konfigurasjonsfilene dine (men du må bruke den nye meldingene.xml-filen) ..
    *   ERDDAP™En gang til kan løpe medJava1.6. (ERDDAP™v1.40 krevesJava1.7.) Vi anbefaler fortsatt å bruke den nyeste versjonen avJava1.7.
    * En ny type datasett,[EDDTableFra AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), kan lese data fra et sett av automatisk værstasjon (AWS) XML-datafiler. Takket være Lynn Dewitt og Exploratorium.
*    **Små endringer/Bug Fixes:** 
    * Justert til endringer i NDBCSOSkildedataservere.
    * Justert til endringer i NOS COOPS ASCII-tjenestene.
    * Lagt flere små endringer og feilrettinger.

## Versjon 1.40{#version-140} 
 (utgitt 2012-10-25) 

*    **Nye funksjoner:** 
    * Det finnes et nytt utdatafilformat fortabledapDatasett:.ncCFMA, som lagrer de etterspurte dataene i en.ncfil som er i samsvar med CF[Diskret prøvetakingsgeometri](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Multidimensjonale Array-alternativer, og som derfor samsvarer med NODC-malene\\[2021: nå[NCEI-maler](https://www.ncei.noaa.gov/netcdf-templates)\\]for lagring av denne typen data. Takk til NODC.
    *   tabledapForespørsler kan nå inneholde tidsbegrensninger som &time&gt;now-5 dager. Se[dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).. Takk til James Gosling.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Hvis du oppgraderer fraERDDAP™1.38, det var ingen endringer som krever at du gjør endringer i konfigurasjonsfilene dine (men du må bruke den nye meldingene.xml-filen) ..
    *   ERDDAP™Offentlige utgivelser og interne milepæler er tilgjengelige via[ERDDAP™på GitHub](https://github.com/ERDDAP).. For mer informasjon, se[Wiki](https://github.com/ERDDAP/erddap/wiki)ForERDDAP™Prosjekt og mer generelt[ERDDAP™Programmørens veiledning](/docs/contributing/programmer-guide).. (Dette ble annonsert separat noen uker etterERDDAP™1.38 utgivelse.) 
    * Opprett datasett Xml er forbedret.
        * Skriptet ble revidert slik at det skulle fungere riktig på alle Linux datamaskiner (Ikke bare noen få) ..
        * Det legger nå tilcreator\\_name,creator\\_email, ogcreator\\_urlNår det er mulig.
        * Mange andre små forbedringer.
    * Refinert hvordanERDDAP™tar seg av tiden.
        * internt,ERDDAP™nå håndterer ganger ved millisekund presisjon (ikke sekunder) ..
        * Du kan nå eventuelt angi tidspresisjonen for et gitt datasett, se[time\\_precision](/docs/server-admin/datasets#time_precision).. For eksempel kan du angi et datasett som viser tidsverdier med datopresisjon (f.eks. 1970-01-01) ..
        * De aktuelle datasettene vil bruke standardinnstillingene, slik at de ikke påvirkes av disse endringene og vil fortsette å vise tid med sekunder presisjon. Takket være Servet Cizmeli og Philip Goldstein.
    *   [EDDTableFraNcCFFiler](/docs/server-admin/datasets#eddtablefromnccffiles)er en ny type datasett som du kan bruke i dindatasets.xmlfil. Det kan lese data fra noen av de mange filformatene definert av[CF Diskret prøvetakingsgeometri](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konvensjoner. Takket være NODC og spesielt takket være Kyle Wilcox for å lage prøvefiler for det store antall gyldige DSG-filformater og for å gjøre dem offentlig tilgjengelige.
*    **Små endringer/Bug Fixes:** 
    * Utvidet[Rask omstart](#quick-restart)system til alle relevanteEDDGridEDDTable underklasser.
    * Forbedret dokumentasjon, spesielt knyttet til hvordan du bruker[netdap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)og[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)fra ulike klientprogrammer.
    * Endret avansert søk for å støtte minTime og/eller maxTime uttrykt som epokesekunder. Takk til Lynn Dewitt.
    * Endret.htmlTableutdata for å vise URL-er og e-postadresser som lenker.
    * Lagt til "rel=" og "rev=" til relevant&lt;en href&gt; tags. Takk til Pat Cappelaere fraOGC RESTProsjekt.
    * Forbedret beskyttelse mot urealistisk store dataforespørsler, spesielt innentabledapHvor det er et vanskeligere problem.
    * Flyttet flere meldinger til messages.xml.
    * Forbedring av hastigheten.
    * FastEDDGridFra Filer for å tillate synkende sorterte økser. Takket være Maricel Etchegaray.
    * Fjernet referanser til iGoogle siden det vil bli avsluttet.
    * Lagt flere små endringer og feilrettinger.

## Versjon 1.38{#version-138} 
 (utgitt 2012-04-21) 

*    **Nye funksjoner:** 
    * ISO 19115 og FGDC -ERDDAP™kan automatisk generere ISO 19115 og FGDC XML metadatafiler for hvert datasett. Linker til filene er synlige på alle lister over datasett (For eksempel fra fulltekstsøk) og også i Web-tilgjengelige mapper (WAF)   (Se[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)og[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) .. Takk til Ted Habermann, Dave Neufeld og mange andre.
    * Søk etter datasett nå støtte \\-_excludedWord_ og \\-__ekskludert frase_" . Takk til Rich Signell.
    * Søker etter datasett returnerer nå en side om gangen. Standarden bruker parameterstrengen: side=1& itemsPerPage=1000, men du kan endre verdiene i URL-adressen til forespørselen din. Takk til Steve Hankin og UAF prosjektet.
    *   OpenSearch--ERDDAP™Nå støtter[OpenSearch1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)standard for å søke etter datasett. Dette tillater blant annet katalogaggregeringsnettsteder å gjøre distribuerte søk (Sende en søkeforespørsel til hver katalog som den vet om) ..
    * Comma Separert Verdi (CSV) Filer --ERDDAP™Nå genererer CSV-filer med bare et komma mellom verdier (hvilken Excel foretrekker) I stedet for komma+rom. Takk til Jeff deLaBeaujardiere.
    * Million datasett -- Flere endringer er gjort for å støtteERDDAPhar et stort antall datasett, kanskje til og med en million. Takk til Steve Hankin og UAF prosjektet.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
#### Rask omstart{#quick-restart} 
*   [A](#quick-restart)Rask omstart tillaterERDDAP™å starte på nytt mye raskere.
     **Legg dette til i config.xml-filen din** Rett etter&lt;/datasett Regex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Søk i fulltekst etter datasett kan nå gjøres med søkemotoren Lucene (Selv om vi anbefaler den opprinnelige søkemotoren hvis du har færre enn 10.000 datasett) Eller det opprinnelige søkesystemet.
         **Legg dette til i config.xml-filen din** Rett etter&lt;/displayDiagnosticInfo&gt;:
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

    * I setup.xml kan du/bør nå legge til to nye kategorier i komma-separert liste av&lt;categoryAttributes&gt;:
        * global: keywords (Legg til det rett etter global:institusjon) -- et nytt spesialfall som tolker en kommadelt liste over nøkkelord fra den globale søkeordattributten for å lage en egen oppføring for hvert søkeord.
        * variabel Navn (Legg til den på slutten) En ny spesialsak som kategoriserer hver avdataVariable destinationNameS.
    * I setup.xml kan du (Men hvorfor?) fortelERDDAP™ikke å tilby FGDC og/eller ISO 19115 metadata for datasett ved å inkludere
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Standardverdiene for disse innstillingene er sanne.
    * Idatasets.xmlVennligst vær oppmerksom på å forbedre metadataene for datasettene dine.ERDDAP™Nå genererer ISO 19115 og FGDC XML metadatafiler automatisk for hvert datasett basert på datasettets metadata.
Så, **Gode datasett metadata fører til godERDDAP-generert ISO 19115 og FGDC metadata.**   
         **Se den nye dokumentasjonen for de mange nye[Globale attributter](/docs/server-admin/datasets#global-attributes)..** 
    * Idatasets.xmlHvis du vil fortelleERDDAP™å bruke en forhåndsfremstilt FGDC og/eller ISO 19115-fil som er et sted på serverens filsystem i stedet for å haERDDAP™Opprette disse filene, bruk:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Hvis _fullFileName_==" eller filen ikke finnes, vil datasettet ikke ha FGDC og/eller ISO 19115 metadata. Så dette er også nyttig hvis du vil undertrykke FGDC og/eller ISO 19115 metadata for et bestemt datasett.
    * Idatasets.xmlFor alleEDDGridSideBySide ogEDDGridAggregateExistingDimension datasett, sørg for at barnedatasett har forskjelligedatasetIDS enn deres foreldredatasett og enn de andre barna. (For eksempel, kan du følge George Foremans enkle men effektive system for å navngi barna sine.) Hvis noen navn i en familie er nøyaktig det samme, vil datasettet ikke lastes inn (med feilmeldingen om at verdiene til den samlede aksen ikke er i sortert rekkefølge) ..
    * Idatasets.xmlDet var noen endringer i listen over gyldigeioos\\_categorymetadataverdier:
        * PCO ble endret til "CO2".
        * "Physical Oceanography" ble lagt til.
        * Oljer ble tilsatt.
    * Idatasets.xml,ERDDAP™ikke lenger tillater \".\" i endatasetID.. Det var tillatt, men misfornøyd. (Beklager) 
    * Idatasets.xml, oppsettet for EDDTabellFraThreddsFiler og EDDTableFraHyraxFiler har endret seg litt fordi begge klassene bare ble omskrevet for å være mer effektive (Begge klasser gjør nå alltid en lokal kopi av alle eksterne datafiler) .. Se dokumentasjonen for å etablere disse klassene:[EDDTableFraHyraxFiler](/docs/server-admin/datasets#eddtablefromhyraxfiles)og[EDDTableFraTreddsFiler](/docs/server-admin/datasets#eddtablefromthreddsfiles).. Spesielt se de reviderte kommentarene til&lt;filDir&gt; (Nå irrelevant) og&lt;sourceUrl&gt; (Nå er det viktig) .. Også bør du aldri pakke denne klassen i EDDTableCopy for effektivitet.
    * Idatasets.xml, hvis du bruker EDDTableFromDatabase med enOracledatabase, du bør inkludere en tilkobling Eiendom som
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
å angi hvor mange rekker data som skal hentes på én gang fordi standarden er 10, som er forferdelig ineffektiv. Se[Oracledokumentasjon](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm).. MySql og PostgreSQL synes å ha bedre standard for denne innstillingen. Takk til Kevin O'Brien.
    * Hvis du bruker EDDTableFromDatabase, se den forbedrede[" Hastighet" dokumentasjon](/docs/server-admin/datasets#eddtablefromdatabase)For ytterligere forslag for å forbedre ytelsen. Takk til Kevin O'Brien.
    * Idatasets.xml, for alle EDDTable... datasett, i konvensjonene ogMetadata\\_Conventionsglobale egenskaper, vennligst se CF-1.6 (ikke CF-1.0, 1.1, 1.2, 1.3, 1.4 eller 1,5) , siden CF-1.6 er den første versjonen til å inkludere endringene relatert til diskret samplingsgeometri.
    * programmerere som utarbeiderERDDAP™kode må legge lib/lucene-core.jar til listen over krukkefiler i deres javac og java kommandolinjestier.
    *   ERDDAP™har en[Ny service](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)å konvertere et CF Standard-navn til/fra et GCMD Science Keyword. Du kan finne dette nyttig når du genererer globale søkeord metadata for datasettene i dineERDDAP..
    * Ta seg av Bots- Les dette rådet til[forhindre bots i å krype dinERDDAP™På en dum måte](/docs/server-admin/additional-information#robotstxt)..
    * Oversettelse -- Teksten påERDDAPnettsider er nå for det meste i messages.xml og så egnet for oversettelse til ulike språk (f.eks. tysk, fransk) .. Meldingene bruker nå ofte Meldingsformat for formatering, også for å hjelpe til med å gjøre oversettelser. Hvis du er interessert i å gjøre en oversettelse, vennligst e-posterd dot data at noaa dot gov..
    * Prøvedatasets.xml-- Det var flere små, men betydelige feil i prøvendatasets.xml.. Hvis du bruker disse datasettene, vennligst hent de nyere versjonene fra den nye prøvendatasets.xmli det nye erddapContent.zipfil. Takk til James Wilkinson.
    * Git- Jeg vil prøve hardt å gjøreERDDAP™et GitHub-prosjekt ASAP etter denne utgivelsen.
*    **Små endringer/Bug Fixes:** 
    * En ny palett, OceanDepth, er nyttig for dybdeverdier (Positiv er nede) f.eks. 0 (grunn) til 8000 (dyp) ..
    * Den.kmlUtgang fratabledapbruker et bedre markørikon (Det er ikke uklart) .. Og å sveve over en markør gjør det nå større.
    * EDDTableFra Filer -- I den siste oppgraderingen hadde det nye netcdf-java-biblioteket tettere restriksjoner for variable navn i.ncFiler. Det forårsaket problemer for EDDTabellFromFiles hvis en variabel ersourceNameHan hadde visse tegntegn. EDDTableFromFiles er nå endret for å unngå dette problemet. Takk til Thomas Holcomb.
    * .subset siden støtter nå 0/10/100/1000/10000 i stedet for en avmerkingsboks for Relaterte data. Tipsen advarer om at 100.000 kan få nettleseren til å krasje. Takk til Annette DesRochers, Richard (Abe) Coughlin og IOOS Biologisk prosjekt.
    * .../erddap/info/_datasetID_/index.html nettsider viser nå url og e-postadresser som klikkbare lenker. Takk til Richard (Abe) Coughlin og IOOS Biologisk prosjekt.
    * Feilretting: Itabledapfor datasett med høyde MetersPerSourceUnite&lt;0, spørsmål med høydebegrensninger ble håndtert feil. Takk til Kyle Wilcox.
    * Feilretting:EDDGridAggregateFromExistingDimension støtter nå mer forskjellige TDS-adresser. Takk til?

## Versjon 1.36{#version-136} 
 (utgitt 2011-08-01) 

*    **Nye funksjoner:** 
    * Ingen betydelige endringer fra brukerens synspunkt.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * PmelTao-datasettet som ofte ble brukt som prøvedatasett fortabledap  
Dokumentasjonen er ikke lenger tilgjengelig.ERDDAP™Administratorer må gjøre disse endringene:
        * I dindatasets.xmlHvis du har endatasetID="pmelTao" datasett, legg til
aktiv="falsk" rett før "&gt;" i slutten av den linjen.
        * I setup.xml, hvis din&lt;EDDTableIdExample&gt; er pmelTao, så:
            * Hvis dindatasets.xmlhar ikke datasett meddatasetID="erdGlobecBottle", add
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * I din setup.xml, erstatte alle taggene fra&lt;EDDTableIdExample&gt; gjennom
                &lt;EDDTableMatlabPlotExample&gt; med
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
                
    * For datasett der typen er en underklasse av EDDTableFromFiles, kan du nå lage data fra metadata.
Spesielt kan du nå gjøre en variabel fra verdiene til en av de opprinnelige variablene.
For eksempel idatasets.xmlInne i en&lt;dataVariable&gt; tag, hvis du bruker
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™vil gjøre en variabel med verdiene av PI-attributten til cruise variabelen.
Takk til WOD.
*    **Endringer:** 
    * Små endringer

## Versjon 1.34{#version-134} 
 (utgitt 2011-06-15) 

*    **Endringer:** 
    * Feilretting: Fikset en minnelekkasje som skjedde på rundt 64-bitersJavainstallasjoner.
    * Feilretting:ERDDAP™Nå setter disse globale egenskapene riktig når breddegradsdimensjonens verdier varierer fra høy til lav: geospatial\\_lat__min, geospatiell\\_lat\\_max, sørligst__nordlig, nordlig\\_nordlig.
        
Merk atactual\\_rangeer uendret: det kan ha lave, høye verdier eller høye, lave verdier, siden det er ment å indikere området og lagringsordenen.
        
    * Små endringer.
    *   ERDDAP™administratorer trenger ikke å gjøre noen endringer i deres oppsett.xml ellerdatasets.xml..

## Versjon 1.32{#version-132} 
 (utgitt 2011-05-20) 

*    **Endringer:** 
    * Støtte til nylig ratifiserte CF diskrete prøvetakingsgeometre (som dessverre ikke er tilgjengelig på nettet ennå) , som erstatter de foreslåtte CF punktobservasjonskonvensjonene.
        ERDDAP™brukerne vil se at CDm-_feature-_type=Station er erstattet av TimeSeries, og det er små endringer i filene som er opprettet for.ncCF filtype (flat\\_dimensjon kalles nå prøve\\_dimensjon) ..
        ERDDAP™administratorer må gjøre disse endringene idatasets.xml:)
        * cdm\\_data\\_type=Station bør endres til cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile bør endres til cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variabler bør endres til cdm\\_timeseries__variables.
        * cf__role=station\\_id bør endres til cf__role=timeseries\\_id.
    * Nyioos\\_categoryalternativer: " Farget løst organiske saker", "pCO2", "Stream Flow " " Total suspender".
    * Mulig løsning på en mulig minnelekkasje på 64-bitJava..\\[Det funket ikke.\\]
    * Små endringer.

## Versjon 1.30{#version-130} 
 (utgitt 2011-04-29) 

*    **Nye funksjoner:** 
    * Støtte for 64-bitersJava.. Når det brukes med 64 bitJava,ERDDAP™kan nå bruke mye mer haug minne og håndtere mange mer samtidige forespørsler.
    * Støtte til.ncfilforespørsler opp til 2GB (Selv uten 64-bitsJava) bedre bruk avERDDAPhåndtere data i biter.
    * Mange 2X-hastighetsforbedringer i koden og 2X-hastighetsoppganger fraJava1.6 gjørERDDAP™2X til 4X raskere enn før.
    * Hukommelsesbesparende forbedringer betydelig lavereERDDAPBaseminnebruk.
    * For tabelldatasett,ERDDAP™er nå helt klar over et datasetts cdm\\_data\\_type, og hvordan datakartene til CDM-typen. Se[CF Diskret prøvetaking Geometries spesifikasjon](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries).. Kanskje en dag snart, vil Word-filen bli konvertert til .html og erstatte gjeldende "OBSOLETE" informasjon på den siden. Takket væreNOAAUAF-prosjekt.
    * For de fleste EDDTable datasett, et nytt utdatafiltypealternativ,.ncCF, skaper sammenhengende raged Array.ncfiler som er i samsvar med den nyeste versjonen av[CF Diskret prøvetaking Geometries konvensjoner](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries).. Disse filene er strukturert for å reflektere CDM-datatypen i datasettet. Siden de foreslåtte konvensjonene bare endret seg, fra denne skrivingen, støtter ikke netcdf-java-biblioteket ennå å lese filformatene opprettet avERDDAPog tolke dem som CDM-datafiler. Det kommer sannsynligvis snart. Takket væreNOAAUAF-prosjekt.
    * Visningen : Distinkt Dataalternativ på .subset-websiden er nå en rullegardinliste som lar brukerne angi det maksimale antall rader med tydelige data som skal vises (standard = 1000) .. Denne endringen, og andre, tillaterERDDAP™å jobbe med datasett som har svært mye antall rader med forskjellige data. (Antall unike verdier for hver enkelt variabel er fortsatt et problem, men det kan være ganske høyt. (20 000?) Før .subset og andre nettsider lastes veldig sakte.) Takket væreNOAAUAF-prosjekt.
    * .subset nettsider har et nytt alternativ: Vis forskjellig datatelling. Takket være GTOPP-prosjektet.
    * For å hjelpe brukere, de forskjellige verdiene (f.eks. stasjonsnavn) er nå vist på Make-A-Graph og Data Access Forms. Takket væreNOAAUAF-prosjekt.
    * . gjennomsiktig Png-forespørsler støtter nå alle typer grafer og datarepresentasjoner. Det trekker bare data -- ingen økser, legender, landmaske eller noe annet. Dette gjør det mulig å lage bilder som lag av transparentePngs. Hvis &.size=_width_|_høyde_ er angitt i spørringen (Anbefalt) Det er æret. Standard er 360x360 piksler. Det eneste unntaket erEDDGrid&.draw=overflate, der standardinnstillingen (som før) er et bilde med ~1/piksel per datapunkt (opp til 3000 x og y piksler) .. Takk til Fred Hochstaedter.
    * DenWMSnettsider viser nå fargelinjen for datasettets variabel (s) .. Takk til Emilio Mayorga og andre.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Denne utgivelsen innebærer mange endringer. De er alle viktige. Vær tålmodig og arbeid gjennom alle endringene som er oppført nedenfor.
    * Denne versjonen blir presset ut tidligere enn ment å håndtere noenJavasikkerhet bugs. Dessverre, flere funksjoner/rettelser beregnet på detteERDDAP™Denne versjonen er ikke i denne versjonen. Beklager. Forhåpentligvis vil den neste versjonen bli relativt snart (og mye lettere å oppgradere til) ..
    * For å unngå flere sikkerhetsfeil iJava6 oppdatering 23 og nedenfor, laste ned og installere den nyeste versjonen avJava  (Java6 Oppdater 24 eller høyere) .. Hvis du har et 64-biters operativsystem, kan du få en 64-biters versjon avJava..
    * Hvis du bruker Tomcat 5, må du oppgradere til Tomcat 6 eller 7 (Foretrukket) .. Hvis du bruker Tomcat 6, vurdere å oppgradere til Tomcat versjon 7.
    * Følg alle instruksjonene for[Opprette en nyERDDAP™](/docs/server-admin/deploy-install), men hvor det er relevant, vil du kopiere filer fra din gamle installasjon til den nye installasjonen, spesielt\\[tomcat\\]/content/erddap katalog og filer. Som en del av det, legg merke til[nye Tomcat oppsett anbefalinger](/docs/server-admin/deploy-install#tomcat)..
    * Standard erddap.css er nå inkludert i erddap.war-filen.
        * Hvis du vil bruke standard erddap.css, **slette** din gamle\\[tomcat\\]/content/erddap/images/erddap.css .
        * Hvis du endrer\\[tomcat\\]/content/erddap/images/erddap.css, og ønsker å fortsette å bruke det: Bare la det være på plass og erstatte&lt;input&gt; delen med:
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

    * I din\\[tomcat\\]/content/erddap/setup.xml:
        * Bytt ut kommentarer og tagger relatert til&lt;DelvisRequestMaxbytes &gt; og&lt;DelvisRequestMaxCells&gt; med
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
        * Bytt ut kommentarene relatert til&lt;categoryAttributes&gt; og vurdere å endre etikettens verdi:
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

Individual&lt;categoryAttributes&gt; som er globale attributter nå må identifiseres via prefikset globalt: (f.eks. global:institusjon) .. Andre attributter antas å være variable attributter (f.eks.standard\\_name) .. Også institusjonsverdier (de eneste) var igjen i det opprinnelige tilfellet. Nå konverteres alle kategoriverdier til små bokstavar.
    * I din\\[tomcat\\]/innhold/erddap/datasets.xml:)
        * Stor impprovisert:ERDDAP™har nye krav knyttet til et tabellisk datasetts cdm\\_data\\_type. Merkelig nok må hvert datasett ha riktig metadata og variabler relatert til cdm-_data-_typen. Hvis ikke, vil datasettet ikke laste og vil kaste en feil. Se dokumentasjonen for[CDm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)..
        * FYI: Det er en ny type datasett: EDDTableFromAsciiServiceNOS.
        * FYI: Det er tre nylig tillattioos\\_categoryalternativer: Hydrologi, Kvalitet (f.eks. for kvalitetsflagg) , og statistikk (For eksempel betyr) ..
        * For EDDTableFra... Filer datasett, fjern alle&lt;nDimensions&gt; tags. De er ikke lenger nødvendig eller brukt.
        * For variabler meddestinationName=altitude,ERDDAP™ikke lenger tvingerlong\\_nameå være høy. Gå gjennom dindatasets.xmlFlere ganger søker&lt;destinationName&gt;heltitude og legge til i den variabelen&lt;addAttributes&gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (Eller litt annerledeslong\\_namei spesielle tilfeller) ..
        * Valgfritt: Alle EDDTableFromFiles underklasser støttevariabel[sourceName= Global:...](/docs/server-admin/datasets#global-sourcenames)å konvertere globale metadata fra hver fil til en datavariabel. Takk til Lynn DeWitt.
    * EDDTableFromDatabase-brukereERDDAP™kommer med en ny JDBC 4 driver for Postgres. For andre databaser, se nettet for den nyeste JDBC .jar-filen for databasen din. SidenERDDAP™Nå brukerJava1.6+, JDBC 4 (ikke 3) Det anbefales sannsynligvis.
    * FYI
        *   EDDGridFra...Filer og EDDTable Fra... Filer datasett lagrer nå filtabellinformasjonen i
            \\[bigParentDirectory\\]/datasett Info/\\[datasetID\\]/\\*.ncFiler.
Også EDDTable-datasett lagrer nå undergruppens informasjon i
            \\[bigParentDirectory\\]/datasett Info/\\[datasetID\\]/\\*.ncFiler. Disse filene pleide å være
            \\[bigParentDirectory\\]/datasett Info/\\[datasetID\\].\\*.jsonFiler.
De gamle filene slettes automatisk nårERDDAP™Begynner. Eller du kan slette alle filer (La de tomme underreglene) i\\[bigParentDirectory\\]/datasettInfo/.
        * Jeg jobbet med en ny EDDTableFromNcCFFiles som ville lese data fra lokale og eksterne filer ved hjelp av de foreslåtte, nye CF Point Observasjon Conventions. Men det er ikke i denne utgivelsen. Det er problemer i netcdf-java biblioteker relatert til noen metoder for å lese disse filene. Og det var en del nylige endringer i de foreslåtte CF punktobservasjonskonvensjonene. Når netcdf-java biblioteket er løst og oppdatert til det nyeste forslaget, vil jeg fortsette arbeidet med dette.
        * KjøringERDDAP™på Windows kan ha problemer: spesielt kan du se i\\[bigParentDirectory/logs/log.txt-fil somERDDAP™Noen ganger er det ikke mulig å slette og/eller omdøpe filer raskt. Dette skyldes antivirusprogramvare (For eksempel fra McAfee og Norton) som kontrollerer filene for virus. Hvis du løper inn i dette problemet (som kan ses av feilmeldinger i log.txt-filen som "Ukan ikke slettes ... ...) , endrer antivirusprogramvarens innstillinger kan delvis lindre problemet.
HvisERDDAP™i Windows er bare en test som kjører på skrivebordet ditt, dette er bare en irritasjon.
HvisERDDAP™i Windows er din offentligeERDDAP™, vurdere å bytte til en Linux-server.
    * Sakte første oppstart -- Første gang du kjørerERDDAP™etter oppgradering,ERDDAP™kan være langsom til å laste datasett. VeienERDDAP™lagre informasjon om aggregerte filer har endret seg, såERDDAP™Du må lese litt informasjon fra alle disse filene på nytt. Det tar tid.
    * Feil ved oppstart -- Siden endringene relatert til cdm__data__type, er det sannsynlig at noen av datasettene dine ikke vil laste og vil kaste feil. Les e-posten til Daily Report nøye atERDDAP™Sender deg nårERDDAP™Nå er det ferdig å starte. Det vil ha en liste over datasett som ikke lastes (på toppen) Og grunnen til at de ikke lastet (nær bunnen) ..
    * Hvis du sitter fast eller har andre spørsmål, e-post opplysningene til meg:erd.data at noaa.gov..
    * Programmører -- Hvis du skriverJavaprogrammer som kjørerERDDAP™kode, du må endre noen av kommandolinjeparameteren referanser:
        * Endre joda-tid-1.6.2.jar til joda-tid. krukke
        * Endre Postgres JDBC .jar referanse til postgresql.jdbc.jar
*    **Små endringer og feilrettinger:** 
    
    * Forbedret tilkoblingshåndtering for å unngå hengende tråder.
    * Forbedret konovalutapraksis for å håndtere nesten samtidige identiske forespørsler mer effektivt.
    *   ERDDAP™Nå bruker netcdfAll-4.2.jar (omdøpt til netcdfAll-latest. krukke) .. Denne bryteren trengte flere interne endringer og forårsaket noen små eksterne endringer, f.eks. endringer i hvordan grib-filer leses og små endringer i.ncUtgang fra overskriften.
    * Ny funksjon:\\[erddap\\]/convert/fipscounty.html konvertererFIPSfylkeskoder til/fra fylkesnavn.
    * På kart er statlige grenser nå mørke fiolette, så de skiller seg ut bedre på alle bakgrunnsfarger.
    * Tabell.kmlutgang igjen bruker et sirkulært ikon til å markere poeng (ikke flyikonet Google har nylig byttet til) ..
    * ErdCalcofi-datasettene ble omarrangert og serveres nå fra lokale filer (raskere) ..
    * Opprett datasett Xml fra Thredds Katalogen oppretter nå en resultatfil:
        \\[tomcat\\]/webapps/erddap/WEB-INF/temp/EDDGridfraThreddsCatalog.xml. Takk til Kevin O'Brien.
    * Opprett datasett Xml fra Thredds Katalog prøver nå å fjerne unødvendige portnumre fra kildeadresser (f.eks.:8080 og :8081 kan noen ganger fjernes) .. Takket væreNOAAsentralt sikkerhetsteam.
    * For .subset-websider har kartet over distinktdata nå et variabelt lat-lon-område.
    * Flere lister iERDDAP™  (For eksempel tabellen som viser alle datasettene) ble sortert slik at A.Z sortert før a..z.. Nå sorteres de på en ufølsom måte.
    * Små endringer i .subset nettsider, inkludert: enheter er nå angitt.
    * Opprett datasett Xml og DasDds ikke lenger kaste et unntak hvis det ikke er mulig å sette resultatene på systemutklippstavlen eller viseInBrowser. Takk til Eric Bridger og Greg Williams.
    * Feilretting: Når datasett er lastet,ERDDAP™nå fjerner eller justerer de geospatielle globale attributtene. Takk til Charles Carleton.
    * Feilretting: String2.getClassPath () Nå riktig prosent-dekoder klassen Sti (Spesielt på Windows, vises mellomrom i filnavnet som %20) .. Dette påvirketERDDAP™EDStatic call SSR.getContextDirectory () og å finne innhold/erddap. Takk til Abe Coughlin.
    * Feilretting: i EDDTableFromFiler relatert til getDataForDapQuery håndtering av distinkt () Forespørsler. Takk til Eric Bridger.
    * Feilretting:tabledapForespørsler håndterte ikke høydebegrensninger når datasettets høyde MetersPerSourceUnite var -1. Takk til Eric Bridger.
    * Feilretting: EDDTabellFra... Filer datasett nå korrekt håndtere forespørsler som inkluderer =Nan og &#33; =Nan.
    
## Versjon 1.28{#version-128} 
 (utgitt 2010-08-27) 

*    **Nye funksjoner:** Ingen.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** Ingen.
*    **Feilretting:** Løs en programmeringsfeil (kun i ver 1.26) som gjordeERDDAP™Veldig langsom.
     

## Versjon 1.26{#version-126} 
 (utgitt 2010-08-25) 

*    **Nye funksjoner:** Ingen.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** 
    * Fra din\\[tomcat\\]/content/erddap/setup.xml,
        * I&lt;på en ny linje nedenfor\\[standard DataLicenser\\], sett inn\\[standardKontakt\\]..\\[standardKontakt\\]refererer til&lt;adminEmail&gt; spesifisert høyere oppe i config.xml.
        * Fjern&lt;tabellCommonBGColor&gt; og&lt;tabellHighlightBGColor&gt;.
        * Anbefalt: Endre&lt;EndBodyHtml&gt; til
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

    * Nødvendig: Til din\\[tomcat\\]/content/erddap/images/erddap.css og erddapAlt.css, legg til i bunnen:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Feilrettinger og små endringer:** 
    
    * Feilretting: I noen situasjoner fungerte ikke skjemaer i noen versjoner av Internet Explorer. Takk til Greg Williams.
    * Feilretting: Knappene Make A Graph fungerte ikke hvis datasettet var fra en fjernERDDAP..
    * Feilretting:WMSNoen ganger ikke fungeret hvis datasettet var fra en fjerntliggendeERDDAP..
    * Mange små endringer og feilrettinger.
    

## Versjon 1.24{#version-124} 
 (utgitt 2010-08-06) 

*    **Nye funksjoner:** 
    * Ny[Subset websider](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)bruke facettert søk for å velge undergrupper av tabelldatasett. Takk til Post.
    * Ny[Avansert søk](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)kombinerer alle de andre søkealternativene og legger til lengdegrad, breddegrad og tidsavgrensende bokser. Takk til Ellyn Montgomery. (Beklager forsinkelsen.) 
    * Ny[Konverter tid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)nettside og tjeneste lar deg konvertere numeriske ganger til/fra ISO-strengtider.
    * Ny[Konverter enheter](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)nettside og tjeneste lar deg konvertereUDUNITStil/fra UCUM-enheter. Takket væreNOAAIOOSSOS..
    * Hvis atabledapForespørsel inkluderer & enheter ("UCUM") , enhetsnavnene vil bli konvertert fra opprinnelige navn (vanligvisUDUNITS) til[UCUM](https://unitsofmeasure.org/ucum.html)enhetsnavn. Dette påvirker bare enheter\\*navn\\*Ikke dataverdier. Takket væreNOAAIOOSSOS..
    * Forbedringer for å lage en graf nettsider og grafer og kart:
        * Hvis grafen er et kart, er det nye Make A Graph-knapper for å zoome inn/ut og et nytt alternativ for å klikke for å endre sentrumspunktet til kartet. Takk til Post.
        * Filtrer innstillinger lagt til nær bunnen. Takk til Greg Williams.
        * Den bygget i kystdatafiler ble oppdatert til GSHHS v2.0. Takk til Post.
        * Kart inkluderer nå innsjøer og elver. Takk til Post. (Beklager, Sacramento River Delta mangler fordi verken kystdata eller innsjøen/elv datasettet behandler det.) 
        * Den bygget i pscoast-avledet land / state filer ble oppdatert. Takk til Post.
        * Topografi.cpt ble endret litt. (Beklager om dette påvirker deg negativt.) Takk til Post.
        * Hvis en bruker endrer en variabel, sendes skjemaet automatisk inn på nytt, slik ataxisVariables' showStartAndStop reflekterer alltid grafvariabler. Takk til Joaquin Trinanes.
        * For png og pdf-bildeadresser:
            * Ny &.land=_value_, der _verdi_ kan være " under" (Vis topografi) eller over (Bare show badymetri) .. Hvis ikke spesifisert, er standarden satt av[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)idatasets.xmleller setup.xml. Takk til Post.
            * Nye: linjer i legenden som er for lang, blir automatisk delt i flere linjer. Takk til Post.
        * For png-bildeadresser:
            * Ny &.legend=_value_, der _verdi_ kan være " bottom" (standard) ,Av" ellerOnlyBare". Dette lar deg inkludere legenden, utelukke legenden eller få bare legenden. Takk til Cara Wilson.
            * Ny &.trim=_n Pixels_ etterlater en kant av nPixels (f.eks. 10) nederst på bildet. Den brukes etter .legend=Off. Takk til Cara Wilson.
            * Ny &.size=_wide_|_høyde_ lar deg angi bredde og høyde for bildet i piksler.
    * Nye utdatafilformater:
        * csvp og.tsvp - som .csv og.tsvMen med " (_enheter) Legg til kolonnenavn på første linje.
        * .odvTxt -- gjør en .txt-fil som forenkler å få data inn[Ocean Data Vis (ODV) ](https://odv.awi.de/)..
        * .esriCsv -- gjør en .csv-fil egnet for import i ESRIsArcGIS.. (kun tabelldatasett) Takket være Jan Mason, Jeff de La Beaujardiere ogNOAAIOOSSOSProsjekt.
    * GUI forbedring av[Kategorize](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)nettsider. Også kategoriseringsverdiene (andre enn institusjon) Nå er alle små. Forespørsler fra ikke-små tilfeller godtas (omdirigert) for baklengs kompatibilitet. Takk til Roy Mendelssohn.
    * Feilmeldinger er nå enda kortere og mer orientert for brukerne. Takk til Greg Williams.
    * En intern endring som redusererERDDAPBaseminnebruk.
    * Mange nye funksjoner som kun er relevante for POST prosjektet.
*    **TingERDDAP™Administratorer trenger å vite og gjøre:** Det er mange endringer. Beklager. Men hver enkelt har noen gode fordeler.
    * Store endringer i GenerationDatasetXml -- det stiller nå ofte flere spørsmål (se relevant[Datasett Typer](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)Informasjon) og nå alltid genererer i det vesentlige klart å bruke innhold tildatasets.xml.. Du er fortsatt ansvarlig for konfigurasjonen, så du bør fortsatt se gjennomdatasets.xmlInnhold før bruk. En menneskelig innsats i prosjektet vil alltid gjøre bedre enn et dataprogram. Takk til UAF-prosjektet.
    * I setup.xml må du revidereWMSSeksjon. Det bør nå inkludere disse taggene (Føl deg fri til å endre verdiene) :)
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

    * REQUIRED: I config.xml, kopiere og lime inn dette nye foreslått&lt;startHeadHtml&gt; for å erstatte din gamle versjon. Men vær fri til å gjøre endringer i dine preferanser.
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

Takk til POST, Hans Vedo og Rick Blair.
    * I setup.xml, i&lt;startBodyHtml&gt;, endre&lt;body&gt; tag å være&lt;kroppen&gt;, siden stilen nå er satt av erddap.css.
    * REQUIRED: I setup.xml, endre til dette&lt;endBodyHtml&gt; (Men endre e-postadressen til e-postadressen din og vær fri til å gjøre andre endringer) :)
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

    * HØYTE: I setup.xml, anbefales&lt;ShortDescriptionHtml&gt; er nå
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

Føl deg fri til å endre dette, spesielt den siste setningen i første ledd.
    * I setup.xml, e-postEverythingTo og e-postDailyReport For å nå kan være kommadelte lister over e-postadresser. Første e-post Alt For å være spesielt, f.eks., bruk abonnementer på EDDXxxFromErddap datasett den e-postadressen. Takk til John Maurer.
    * E-postfeil er nå logget på\\[bigParentDirectory\\]/logs/emailLog YÅÅÅ-MM-DD.txt-fil.
    * I setup.xml er det en ny, valgfri parameter for å angi e-postkontoegenskaper (vanligvis rett etter&lt;e-post
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Standard er ingenting. Takk til Rich Signell.
    * REQUIRED: Hvis du bruker EDDTableCopy ellerEDDGridKopier, du må dele alle\\[bigParentDirectory\\]/kopi/ mapper og filer som inneholder "xh" i katalogen eller filnavnene etter å ha stoppet det gamleERDDAP™Før den nyeERDDAP™Så disse filene vil bli kopiert på nytt. Jeg beklager, men det var viktig å gjøre endringen og forhåpentligvis påvirker det få administratorer og få filer.
I Linux kan du finne disse filene med, cd\\[bigParentDirectory\\]/copy
Finn.\\*xh\\*  
I Windows kan du finne disse filene med Start|Søk
Hva vil du søke etter: Dokumenter
Alle eller deler av filnavnet: xh
Se på: Bla gjennom -&gt;\\[bigParentDirectory\\]/copy
Klikk på «Søk»
^A å velge dem alle
Del å slette dem alle
    * REQUIRED: Idatasets.xmlFor EDDTableFromDatabase-datasett, for dato og tidsstempelvariabler, endre dataene Skriv til dobbel og enhetene til sekunder siden 1970-01-01T00:00:00Z. Vi anbefaler at du lagrer tidsstempeldata i databasen\\*med\\*En tidssone. Uten tidssoneinformasjon, spørsmålene somERDDAP™sende til databasen og resultatene somERDDAP™kommer fra databasen via JDBC er tvetydig og vil sannsynligvis ha feil. Vi prøvde, men fant ingen pålitelig måte å håndtere " tidsstempel uten tidssone" data. Vi mener det er god praksis uansett. Tross alt, - tidsstempel uten tidssone - data har en underforstått tidssone. Selv om det er bra at tidssonen er åpenbar for databasen administrator, er det fornuftig å spesifisere det eksplisitt slik at annen programvare kan riktig samhandle med databasen din. Takk, Michael Urzen.
    * HØYTE: Idatasets.xml, for å aktivere .subset nettsider for faceted søk av dine tabular datasett, må du legge til [&lt;subsetVariables&gt;] (/docs/server-admin/datasett#subsetvariables) til datasettets globale egenskaper.
    * REJEKTERT: Idatasets.xmlHvis du har datasettet meddatasetID=-pmelGtsppp - vennligst endre det til å være
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * REJEKTERT: Idatasets.xml, det er nye gyldige alternativer for [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasett#cdm_data_type) global attribut, så du bør gjennomgå / endre verdien for dine datasett.
    * Idatasets.xmlDen nye [&lt;kilde NEDSExpandedFP\\_EQ&gt;] (/docs/server-admin/datasett#kilden trenger Extendedfp_eq) er nyttig hvis kildeserveren ikke konsekvent håndterer &_variable_\\=_value_ tester riktig (på grunn av[generelle vansker med å teste likheten mellom flytende punkttall](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) .. kilden UtvidetFP\\_EQ er satt til sant som standard (Den sikreste innstillingen) Så du trenger ikke å gjøre noen endringer.
    * Ny[EDDTableFraAsciiFiler](/docs/server-admin/datasets#eddtablefromasciifiles).. Takk til Jerry Yun Pan.
    * Ny[EDDTableFraTreddsFiler](/docs/server-admin/datasets#eddtablefromthreddsfiles).. Takk til Roy Mendelssohn.
    * Endringer til[EDDTableFraNcFiler](/docs/server-admin/datasets#eddtablefromncfiles)lar det brukes med et bredere utvalg av filer.
    * EDDTableFromBMDE er deaktivert. Det er ikke lenger noen aktive, passende datakilder.
    * I GenererDatasetXml, den nyeEDDGridFraThredds Katalog høster en hel TREDDS katalog (eller undergruppe) og skaperdatasets.xmlinnhold. Takk til UAF-prosjektet.
    * Opprett datasett Xml og DasDds nå også sette sine resultater i\\[bigParentDirectory\\]/logg/log.txt. Takk til Rich Signell og Charles Carleton.
    * Mange forbedringer av innloggingssystemet. Takk til Post.
*    **TingERDDAP™Programmører Må vite og gjøre:** 
    * Det har vært endringer i /WEB-INF/lib/-katalogen. Endre innstillingene for javac og java classpath.
    * Det er en ny\\[din Url\\]/erddap / versjon tjeneste for å bestemme versjonen av enERDDAP.. Svaret er f.eks. tekst.ERDDAP\\_versjon=1.24 Hvis du får en HTTP 404 ikke-Found feilmelding, behandleERDDAP™som versjon 1.22 eller lavere. Takk til Post.
*    **Små endringer og feilrettinger:** 
    
    * EDDTableFra Endringer i sos:
        * Dropt støtte for å lese IOOSSOSXML-svar.
        * Lagt til støtte for lesing av IOOSSOStekst/csv. (Så NOSSOSServere støttes for tiden ikke.) 
        * Lagt mange endringer relatert til IOOSSOSserverdetaljer.
        * Lagt til støtte for BBOX-forespørsler for IOOSSOSogOOSTethys SOSservere. Disse endringene resulterer i en stor hastighet for relevante dataforespørsler. Takk til IOOSSOS..
    * Tekst i.mattabulær datafiler er nå lagret riktig. Takk til Roy Mendelssohn.
    *   WMS
        *   OpenLayersNå er pakket medERDDAP™til bruk påWMSnettsider. Dette løser problemet som forårsakes nårOpenLayersFor noen måneder siden endret seg og hindrer fremtidige problemer.
        * IWMS GetCapabilitiesSvar,&lt;OnlineResource &gt; verdien er nå URL-adressen tilWMSService. Takk til Charlton Galvarino.
        * En legende vises påWMSnettside for å vise fargelinjen. Takk til Emilio Mayorga.
    *   EDDGridAggregateExistingDimensjonskonstruktøren hadde problemer hvis en aksens kilde Verdier var ikke lik deres destinasjon Verdier, for eksempel hvis kildetid var noe annet enn"seconds since 1970-01-01".. Takket væreToddSpindler.
    * I TableWriterGeoJson, overflødig '', etter bbox\\[...\\]er fjernet. Takk til Greg Williams.
    * Mange små endringer og feilrettinger.
    
## Versjon 1.22{#version-122} 
 (utgitt 2009-07-05) 

* SlideSorter feilen introdusert i 1.20 er fikset.
* OBIS feil introdusert i 1.20 er fikset.
* Referansene til Jason datasett på siden bilder/gadgets/GoogleGadgets ble fjernet.
     
## Versjon 1.20{#version-120} 
 (utgitt 2009-07-02) 

*   ERDDAP™administratorer, vennligst legg dette til i config.xml-filen:
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

* Nye datasetttyper[EDDGridKopier](/docs/server-admin/datasets#eddgridcopy)og[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)lage og vedlikeholde en lokal kopi av en annenEDDGrideller EDDTable-datasettets data og betjene data fra den lokale kopien. Disse er svært enkle å bruke og svært effektive **løsninger på noen av de største problemene med å betjene data fra eksterne datakilder:** 
    
    * Å få tilgang til data fra en fjerndatakilde kan være sakte (av ulike grunner) ..
    * Fjerndatasettet er noen ganger utilgjengelig (av en rekke grunner) ..
    * Relying på én kilde for data skalerer ikke bra (For eksempel når mange brukere og mangeERDDAPbruk det) ..
    
I tillegg er den lokale kopien en sikkerhetskopi av den originale, som er nyttig i tilfelle noe skjer med den originale.
    
Det er ikke noe nytt om å lage en lokal kopi av et datasett. Det som er nytt her er at disse klassene gjør det\\*lett\\*å skape og\\*Vedlikehold\\*en lokal kopi av data fra en\\*Varietet\\*av typer eksterne datakilder og\\*Legg til metadata\\*mens du kopierer dataene.
    
Disse datasetttypene er en del av et komplett sett med funksjoner som forenkler opprettelsen av[rutenett/clustere/federasjoner avERDDAPs](/docs/server-admin/scaling)å håndtere svært tunge belastninger (f.eks. i et datasenter) ..
    
* Ny type datasett[EDDTableFraDatabase](/docs/server-admin/datasets#eddtablefromdatabase)får data fra en lokal eller ekstern databasetabell.
*   ERDDAP™Nå har en[sikkerhet](/docs/server-admin/additional-information#security)system som støtter autentisering (La brukere logge inn) og autorisasjon (gi dem tilgang til visse private datasett) ..
* Det er[to, nye, kommandolinjeverktøy](/docs/server-admin/datasets#tools)For å hjelpeERDDAP™administratorer genererer XML for et nytt datasett idatasets.xml:)
    * Opprett datasett Xml kan generere et grovt utkast av datasett XML for nesten alle typer datasett.
    * DasDds hjelper deg gjentatte ganger å teste og raffinere XML for et datasett.ERDDAPGenerer datasett Xml nettsider er fjernet. Av sikkerhetsgrunner støttet de bare noen få datasett typer. De nye kommandolinjene er en bedre løsning.
* Den nye[statusside](/docs/server-admin/additional-information#status-page)La alle (spesielt administratorer) se status som enERDDAP™fra enhver nettleser ved å gå til\\[baseUrl\\]/erddap/status.html..
* Tabledap støtter nå[funksjoner på serversiden](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):)
    * & fjernt () fjerner dupliserte rader fra responstabellen,
    * &orderBy (...) kan du angi hvordan responstabellen skal sorteres,
    * &orderByMax (...) lar deg angi hvordan responstabellen skal sorteres og fjerner alle radene bortsett fra radene med de maksimale verdiene i den sist angitte kolonnen. Dette kan for eksempel brukes til å få de siste tilgjengelige dataene for hver stasjon.
* Tabelldatasett kan nå inneholde ekstra datoTidsvariabler som ikke heter"time".. Disse variablene gjenkjennes av deres - enheter - metadata, som må inneholde" since "  (for numerisk dato Times) eller "y" eller "y" (for formaterte String dateTimes) .. Men vær så snill å brukedestinationName "time"for hoveddatoen Tidsvariabel.
*   ERDDAP™Nå genererer[Sitemap.xml](/docs/server-admin/additional-information#sitemapxml)fil, som forteller søkemotorer at dinERDDAPBare må krypes hver måned.ERDDAP™administratorer, følg[disse instruksjonene](/docs/server-admin/additional-information#sitemapxml)å varsle søkemotorene om den nye sitemap.xml-filen.
*   ERDDAPFeilmeldinger er nå mye kortere og rettet til kunder (Ikke programmerere) .. Takk til Greg Williams.
* [&lt;forespørselBlacklist&gt;] (/docs/server-admin/datasett#requestblacklist) Nå støtter også IP-adresser der det siste tallet er erstattet av \\*.
* Forespørsler om.jsonog .geoJson-filer kan nå inneholde en valgfri[Jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)Forespørsel ved å legge til "&.jsonp=_funksjonsnavn_" til slutten av spørringen. I utgangspunktet forteller dette bareERDDAP™å legge til "_ funksjonName_ (i begynnelsen av svaret og) " til slutten av svaret. Hvis det opprinnelig ikke var noen forespørsel, la " &" være i spørringen. Takk til Greg Williams.
* Mange nye statistikker ble lagt til[Daglig rapport](/docs/server-admin/additional-information#daily-report)..
* På nettsider med lister over datasett, institusjon og id er nå lengst til høyre. Dette beveger abonnement og andre mer nyttige kolonner i visning på smale datamaskinskjermer.
* På alle nettsider, sidens tittel (basert på&lt;tittel&gt; i&lt;startHeadHtml&gt; som du definerer i setup.xml) endres til å inneholde en bedre beskrivelse av nettsiden (For eksempel ved å inkludere det aktuelle datasettets tittel og institusjon) ..
* Xmx-informasjon er nå inkludert med minneinformasjonen som skrives ut i log.txt, Daily Report og på status.html. Takk til Ellyn Montgomery.
*   ERDDAP™har ytterligere generell beskyttelse mot alle feil (For eksempel, OutOfMemoryError) .. Takk til Charles Carleton.
* Forbedringer til feilhåndtering hvis svaret allerede er gjort.
* IMPROVED: EDDTableFromFiler ogEDDGridFraFiles tillater nå bare&lt;MetadataFra&gt; først eller sist. Penultimate støttes ikke lenger. Og først og sist er nå basert på filenes LastModifiedTime.
* Feilretting: i EDDTableFraSOS, ugyldig info for en stasjon kastet et unntak og førte til at hele datasettet ble avvist. Nå er disse stasjonene bare ignorert (og feilmeldingen er logget til log.txt) .. Takk til Rick Blair.
     

## Versjon 1.18{#version-118} 
 (utgitt 2009-04-08) 

* Feilretting: Å starte i 1.14, EDDTable Data Access Form og Make A Graph websiden ikke riktig håndtere sitert begrensninger.
* Feilretting: Utgangspunkt i 1.14, EDDTableFromDapSequence håndterte ikke tidsbegrensninger riktig hvis kildetiden enhetene ikke var " sekunder siden 1970-01-01T00:00:00".
     

## Versjon 1.16{#version-116} 
 (utgitt 2009-03-26) 

*   ERDDAP™administratorer:
    * Dette er en viktig utgivelse fordi det løser en feil som etterlot enERDDAP™tråd som kjører hvis du brukte Tomcat Manager til å stoppe/starte eller laste på nyttERDDAP.. Så når du installerer 1.16, ikke bare bruk Tomcat manager til å løse det gamleERDDAP™og distribuere det nyeERDDAP.. I stedet: **Utnytt den gamleERDDAP™, Start på nytt Tomcat (eller serveren) , deretter distribuere den nyeERDDAP..** Det er alltid en god ide å gjøre det når du installerer en ny versjon.
    * Legg til [&lt;forespørselBlacklist&gt;&lt;/forespørselBlacklist&gt;] (/docs/server-admin/datasett#requestblacklist) til dindatasets.xml.. Dette kan brukes til å angi en liste over klientens IP-adresser som skal blokkeres (For eksempel å avverge et avslag på tjenesteangrep eller en altfor ivrig nettrobot) ..
* Det er nå en\\[bigParentDirectory\\]/logger-mappen å holdeERDDAP™Loggfiler. Når du starterERDDAP™, det gjør en arkivkopi av log.txt og logg. txt.første filer med et tidsmerke. Hvis det var problemer før omstart, kan det være nyttig å analysere disse filene.
*   ERD'sERDDAP™Nå har abonnementssystemet slått på.
*   ERDDAP™igjen tillater (Men likevel anbefaler)  "%26" koding av  "&" i forespørselsadresser (Se[relatert v1.14 endring](#percent26)) ..
* Flere nye tillegg til Tally delen av[Daglig rapport](/docs/server-admin/additional-information#daily-report)..
* Små feilrettinger i genererDatasetsXml.
* Noen små feilrettinger.
     

## Versjon 1.14{#version-114} 
 (utgitt 2009-03-17) 

* Endringer for brukere:
    * i forespørsler om nettdata,ERDDAP™Nå støtter:[Last-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)hvor n er et heltal antall indekser og[ (siste-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)hvor d er en numerisk verdi (For tiden er det på sekunder) ..
    * I tabellbaserte dataforespørsler krever strenge begrensninger nå[dobbelt sitater](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)rundt verdien, for eksempel &id="NDBC40121" Dette kreves avDAPprotokoll.
    * I tabelldataforespørsler,ERDDAP™Nå krever det[alle begrensninger er riktig kodet](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode).. Nettlesere gjør dette automatisk, så dette påvirker hovedsakelig dataprogrammer/skripter som får tilgang tilERDDAP..
#### Prosent26{#percent26} 
*   [Tidligere,](#percent26)den[embed en graf webside](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)og[ERDDAP™Google Gadgets nettside](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)sa å erstatte "&" i bildets URL med "%26". Fra nå av bør du erstatte "&" i bildets URL med "&amp;". Så du må erstatte alle "%26" i eksisterende nettsider og Google Gadgets med "&amp;". (Beklager) 
*   ERDDAP™administratorer, vennligst:
    * Legg til følgende i din[config.xml](/docs/server-admin/deploy-install#setupxml)fil (Endre flagget NøkkelKey-verdi) :)
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

    * På linjen etter&lt;e-postbrukereName&gt; i din[config.xml](/docs/server-admin/deploy-install#setupxml)fil, legg til
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
Skriv inn ditt ekte passord.
    * Du kan endre&lt;WmsSampleBBBox&gt; i din[config.xml](/docs/server-admin/deploy-install#setupxml)fil å inkludere lengdegradsverdier opp til 360, f.eks.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * I dindatasets.xmlfil, gi nytt navn til datasetttypen EDDTableFromNc4DFiler til EDDTableFromNcFiles (som nå støtter filer med alle antall dimensjoner) .. Hvis du hadde en EDDTableFromNc4DFiles datasett:
        
        1. Du må endre til type="EDDTableFromNcFiles" i datasettene dine. XML-fil.
        2. Du må legge til en&lt;nDimensioner&gt; 4&lt;/nDimensions&gt; tagg til datasettets XML.
        3. Du kan legge til det nye&lt;SortFilesBySourceNames&gt; tag for å angi den interne rekkefølgen for filene, som bestemmer den generelle rekkefølgen av dataene som returneres.
        
For detaljer, se[EDDTableFra Filer](/docs/server-admin/datasets#eddtablefromfiles)..
    * I det siste, for EDDTableFromDapSequence, forOPeNDAPDRDS-servere idatasets.xmlVi brukte&lt;canConstrainStringsRegex &gt; ~=&lt;/kildeKanConstrainStringRegex&gt;. Men vi ser nå at DRDS regulær støtte er mer begrenset ennERDDAP's, så vi anbefaler&lt;canConstrainStringsRegex &gt;&lt;/sourceCanConstrainStringRegex&gt; slik at regulære begrensninger ikke overføres til kilden, men i stedet håndteres avERDDAP..
    * Recamped håndtering av kildenCanConstrain... idatasets.xmlved[EDDTableFra DapSekvens](/docs/server-admin/datasets#eddtablefromdapsequence)og (internt) alle EDDTable datasett typer. Det nye systemet er enklere og reflekterer bedre variasjonen av ulike datakilder. Du kan måtte endre XML for datasett idatasets.xml..
* Det er flere nye funksjoner som er nyttige av seg selv, men når kombinert, også lette opprettelsen av[rutenett/clustere/federasjoner avERDDAPs](/docs/server-admin/additional-information#grids-clusters-and-federations)..
    * Nye datasettstyper:
        *   [EDDGridFraErddap](/docs/server-admin/datasets#eddfromerddap)og[EDDTableFraErddap](/docs/server-admin/datasets#eddfromerddap)som lar enERDDAP™Et datasett fra en annenERDDAP™på en veldig enkel og meget effektiv måte.
        *   [EDDGridFraFiles](/docs/server-admin/datasets#eddgridfromfiles)  (og underklassen,[EDDGridFraNcFiles](/docs/server-admin/datasets#eddgridfromncfiles)som kan lesesNetCDF .nc, GRIB .grb ogHDF .hdffiler) ..
        *   [EDDTableFraNcFiler](/docs/server-admin/datasets#eddtablefromncfiles)som kan lesesNetCDF .ncsom har en tabelllignende struktur.
    * RunLoadDatasett og Lastedatasett ble revamped slik atERDDAP™er svært lydhør overfor reloading av datasett basert på filer i[flagg](/docs/server-admin/additional-information#flag)katalog (ofte&lt;5 sekunder dersom hovedlastdatasett for tiden er gjort).
    * Ny tjeneste for å tillate[en URL for å opprette en flaggfil](/docs/server-admin/additional-information#set-dataset-flag)for et gitt datasett, f.eks.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
oppretter en flaggfil i flaggkatalogen for rPmelTao (Selv om flagget Nøkkelen her er feil) ..
    * Ny[abonnement](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)tjeneste slik at enhver klient kan angi en handling som vil bli gjort når et bestemt datasett opprettes (NårERDDAP™på nytt) og når datasettet endres på noen måte. Dette systemet kan deaktiveres via&lt;abonnementSystemActive&gt; i din[config.xml](/docs/server-admin/deploy-install#setupxml)fil. DenERDDAP™ [Daglig rapport](/docs/server-admin/additional-information#daily-report)nå lister alle abonnementene og inkluderer URL-adressen som trengs for å kansellere hver, i tilfelle du føler at systemet blir misbrukt. Idatasets.xml, det er en ny, valgfri [&lt;abonnement E-postBlacklist&gt;] (/docs/server-admin/datasett#subscriptionemailblacklist) Tagg slik at administratorer kan angi en kommaseparert liste over e-postadresser som umiddelbart er svartelistet fra abonnementssystemet.
    * Ny [&lt;onChange&gt;] (/docs/server-admin/datasett#onchange) egenskap idatasets.xmltillaterERDDAP™administrator angir en handling som vil bli gjort når et bestemt datasett opprettes (NårERDDAP™på nytt) og når datasettet endres på noen måte.
    * Forbedringer til fulltekstsøk: å lagre søkestrengen for hvert datasett bruker nå 1/2 minne. Søk algoritme (Boyer-Moore-lignende) Nå er 3X raskere.
    * E-post fraERDDAP™Nå alltid forutsette emnet og innhold med\\[erddap Url\\]så det vil være klart hvemERDDAP™Dette kom fra (Hvis du administrerer flereERDDAPs) ..
    * Mer omfattende statistikksamling for[Daglig rapport](/docs/server-admin/additional-information#daily-report)e-post.
    * Ny loggfil\\[bigParentDirectory\\]/emailLogYEAR-MM-DD.txt logger alle e-poster sendt avERDDAP™Hver dag. Dette er spesielt nyttig hvis serveren ikke kan sende e-post -- du kan i det minste lese dem i loggen.
    *   ERDDAP™Nå gjør en\\[bigParentDirectory\\]/cache/ (datasetID) katalog for hvert datasett siden det kan være mange filer cached.
* Ny[RSS2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)fôring for hvert datasett (Se etter den orangeRSSikoner på lister over datasett, datatilgangsskjemaer og lage en graf nettsider) ..
*   EDDGrid .kmlSvar nå bruke flislagte bilder ("superoverlays" - dynamisk generert quadtree bilder) .. Det opprinnelige bildet lastes inn i GoogleEarth mye raskere enn tidligere. Oppløsningen på kartet øker når du zoomer inn, opp til full oppløsning av datasettet. Anbefal: Brukere bør be om.kmlfor et tidspunkt, men datasettets hele lengdegrad, breddegrad. Dessverre ble støtte for tidsintervaller fjernet (Håper det kommer tilbake) ..
*   ERDDAP™Nå legger[Utløper og cache-kontroll max-alder overskrifter](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)til alle filer som er bedt om fra /bilder-katalogen. Dette reduserer antall statiske filforespørsler som sendes tilERDDAPOg dermed øker det mesteERDDAP™sidelast. Også mangeJavaScript-filreferanser flyttet til bunnen av sine HTML-sider, som også øker mangeERDDAP™sidelast. Takket være boken "High Performance Web sites" av Steve Souders og ySlow tillegg til FireBug plugin i FireFox.
*   ERDDAP™byttet fra netcdf-java 2.2.22 til netcdf-java 4.0. Dette tillater blant annetEDDGridFra NcFiles til å leseHDF .hdf, samt Grib .grb ogNetCDF .ncFiler.
*   EDDGridFra Dap ogEDDGridFraNcFiles støtter nå DARray (samt GDrid)  dataVariableS. Hvis en dimensjon ikke har en tilsvarende koordinatvariabel,ERDDAP™skaper en aksevariabel med indeksverdiene (f.eks. 0, 1, 2, ..., 311, 312) .. Alle andre aspekter avEDDGridForbli den samme:
\\* Den tjener fortsatt alle datasett som gitter, med en aksevariabel for hver dimensjon.
\\* Forespørsler kan fortsatt be om verdier fra aksevariabler.
Takket være Charles Carleton, Thomas Im, Dorian Raymer og andre.
* DenWMS OpenLayerssidene har nå et standard lengdegradsområde som er litt større enn datasettets rekkevidde. (ikke det nøyaktige området, så konteksten til små datasett er mer åpenbar) .. Standardområdet kan nå også være 0 til 360, noe som gjør det mulig å vise hele spekteret av mange datasett. Takket væreToddSpindler.
* Nye glidebrytere på noen Data Access skjemaer og lage en graf nettsider. De forenkler (rå) Spesifikasjon av de ønskede dataene og gir god visuell tilbakemelding.
* Et nytt alternativ for&lt;Datasett&gt; Tags indatasets.xml:)[aktiv="falsk"](/docs/server-admin/datasets#active)..
* Referanser tilERD'sERDDAP™endret fra coastwatch.pfel (fortsatt fungerer via proxy) til Coastwatch.pfeg (Foretrukket) ..
* Ny støtte til[data\\_minogdata\\_max](/docs/server-admin/datasets#data_min-and-data_max)variable metadata attributter.
* En delvis løsning på[VentDåForsøk på nytt / Delvis resultat Unntak](/docs/server-admin/additional-information#waitthentryagain-exception):) Nå vil noen forespørsler som tidligere mislyktes når en datakilde endring ble oppdaget lykkes fordiERDDAP™vil laste datasettet på nytt og automatisk spørre dataene, alt i sammenheng med den opprinnelige anmodningen.
* Feilretting: generer Datasett Xml var deaktivert iERDDAP™versjon 1.12. Takk til Ellyn Montgomery for å peke på dette.
* Små endringer i feilhåndtering.
* Mange forbedringer for å unngå/dealere med mulige raseforhold (Mulige problemer som oppstår på grunn av multi-thread artERDDAP) som forårsaket små, sjeldne problemer.
* Nå, hvis en feilmelding er skrevet på et bilde, vil bildet bare bo i cache i ~5-10 minutter (ikke 60) .. Takk til Cara Wilson.
* Standardmeldingen når det ikke finnes noe data nå " Forespørselen din ga ingen matchende resultater." som er kortere, mer nøyaktig og matcherOPeNDAPservere.
*   EDDGridikke lenger tillater bundet akseverdier.
* Små endringer i .ver og .help-forespørsler.
* Mange små endringer og feilrettinger.
     

## Versjon 1.12{#version-112} 
 (utgitt 2008-10-31) 

* EDDTableFraSOSFungerer igjen med NDBCSOSog jobber med det nye NOSSOS..
* EDDTableFraBMDE krever nåERDDAP™admin å angidataVariableS.
*   EDDGridikke lenger krever at lat og lon er jevnt fordelt. gjennomsiktig Png eller.kml.. Takket væreToddSpindler.
* Noen små endringer.
     

## Versjon 1.10{#version-110} 
 (utgitt 2008-10-14) 

* Ny-colorBar" metadata for datavariabler idatasets.xmldefinerer standard fargelinjen innstillinger for grafer og kart. Se[mer informasjon](/docs/server-admin/datasets#color-bar-attributes).. Dette er viktig fordi det forbedrer utseendet på standard grafer og kart produsert av Make A Graph og fordi standard grafer og kart nå har en konsekvent fargelinje selv når klienten endrer det etterspurde klokkeslettet eller det geografiske området. Dette var nødvendig forWMS..
*   ERDDAP™Nå serverer de fleste nettdata via enWMSService. Dette er viktig fordi det viser at i tillegg til å få data fra mange typer dataservere,ERDDAP™kan distribuere data via ulike protokoller (DAP,WMSMer i fremtiden) .. Se[Kundedokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html).. Eller[dokumentasjon for administratorer](/docs/server-admin/datasets#wms).. Eller[Prøv det ut](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html)..
* Ny støtte for lengdegradsverdier &gt; 180 i.kmlFiler.
* Ny cdm\\_data\\_type: Andre .
*   ERDDAP™nå støtter "boolean" kildedataType. Se[mer informasjon](/docs/server-admin/datasets#boolean-data)Dette vil bli nyttig for den fremtidige EDDTableFromDatabase.
* Ny EDDTableFromBMDE støtter DigIR/BMDE-datakilder.
* EDVGridAxis tillater nå synkende sorterte verdier. PmelOscar-datasettene trengte dette.
*   ERDDAP™Nå returnerer HTTP-feil (f.eks. "404 for ressurs/side ikke funnet") i flere situasjoner, i stedet for HTML-sider med feilmeldinger.
* Mange endringer/tillegg tilERDDAP™dokumentasjon.
* Mange små endringer.
* Noen feilrettinger.
*    **TingERDDAP™Administratorer bør gjøre for å oppgradere til denne versjonen:** 
    * Idatasets.xml, for alle EDDTableFromSOSDatasett, endring "observertProperty" metadata til "kildeobservertProperty".
    * Regler for etaxisVariableellerdataVariable'sdestinationNameer nå[strengere](/docs/server-admin/datasets#datavariable-addattributes).. Du må sjekke at variabelnavnene dine er gyldige. Sjekk dem enten for hånd eller løpERDDAP™og se på feilmeldingene i rapporten som sendes til administratoren.
    * Idatasets.xmlHvis du vil at en rutenett datavariabel skal være tilgjengelig viaWMS, du må legge til colorBar metadata. I hvert fall, for eksempel,&lt;navn="colorBarMinimum" type=" double"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Se[mer informasjon](/docs/server-admin/datasets#wms)..
    * Legg til følgende i din[config.xml](/docs/server-admin/deploy-install#setupxml)fil (Tilpass den med din informasjon) :)

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

## Versjon 1.08{#version-108} 
 (utgitt 2008-07-13) 

* En ny webtjeneste iERDDAP™, generere Datasett Xml, hjelperERDDAP™administratorer ved å opprette et grovt utkast av XML som trengs for å beskrive et datasett idatasets.xml
* Noen endringer/feilrettinger relatert til at netdap kan sees av netcdf-java som en opendap-server, inkludert: globale metadata er nå merket "NC\\_GLOBAL" (I stedet for GLOBAL) ..
* DenEDDGridog EDDTable Data Access Forms bruker nå spørreinformasjon i URL-en. Så, for eksempel, hvis en bruker går fra et Make A Graph-skjema til et Data Access-skjema, overføres begrensningene nå riktig.
*   tabledapMake A Graph tillater nå begrensninger på strengvariabler.
* EDDTables Make A Graph tillater nå NaN-begrensninger. Takket være Steve Hankin.
* Feilretting: EDDTable lagre AsImage gjenkjente ikke .colorbar min og max verdier. Takk til Steve Hankin
* Mange forbedringer av setupDatasetsXml. Takk til Ellyn Montgomery.
* Griddap-forespørsler tillater nå () -stilforespørsler litt utenfor det faktiske akseområdet. Dette er passende siden () -verdier avrundes til nærmeste faktiske verdi. Takk til Cindy Bessey
* Jeg gjorde FloatArray og DoubleArray test av erEvenlySpaced mer sofistikert. Det vil alltid være ufullkomment (fordi testen må tilpasses for hvert datasett) Men det bør være bedre. Takk til Ellyn Montgomery.
* Jeg flyttet oppsett.html og setupDatasett Xml.html erddaps / nedlastningskatalog og harde kodet alle lenker til dem. Nå kan jeg gjøre endringer og oppdatere installasjonsinformasjonen umiddelbart.
* Mange små endringer. Noen små feilrettinger.
*    **TingERDDAP™Administratorer bør gjøre for å oppgradere til denne versjonen:** 
    * Flytt&lt;Kort beskrivelse Html&gt; fra dine meldinger.xml til din[config.xml](/docs/server-admin/deploy-install#setupxml)fil. Den angir teksten som vises midt på venstre side avERDDAP™hjemmeside. Legg til&lt;h1&gt;ERDDAP&lt;/h1&gt; (eller andre overskrifter) til toppen av det. **Eller,** kopi&lt;ShortDescriptionHtml&gt; i den nye[config.xml](/docs/server-admin/deploy-install#setupxml)fil (fra den nye ErddapContent.zip) inn i oppsettet.xml.
         

## Versjon 1.06{#version-106} 
 (utgitt 2008-06-20) 

* Ny støtte tilIOOS DIF SOSDatakilder.
* Mange små endringer. Noen små feilrettinger.
     

## Versjon 1.04{#version-104} 
 (utgitt 2008-06-10) 

* Ny Slide Sorter funksjon.
* Ny Google Gadgets-side og eksempler.
* Feilretting iEDDGrid.saveAsNc for variabel med skala og addOffset.
     

## Versjon 1.02{#version-102} 
 (utgitt 2008-05-26) 

* NyEDDGridSideBySide tillater ulikeaxisVariables\\[0\\]kilde Verdier.
* Alle strømmene og vinddatasettene ble slått sammen tilEDDGridSideBySide datasett.
* Bilder fra bildeforespørsler er nå cached i 1 time.
     

## Versjon 1.00{#version-100} 
 (utgitt 2008-05-06) 

* Lag en grafisk nettsider og grafikkkommandoer i URLer.
* Støtte for flaggfiler for å tvinge til å laste om et datasett.
* Ny datasett type: EDDTableFra4DFiler (den første underklassen av EDDTableFromFiles) ..
