---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ Endringer

 ERDDAP™ Et godt eksempel på [Innovasjon](https://en.wikipedia.org/wiki/User_innovation) hvor produktinnovasjon ofte kommer fra forbrukere ( ERDDAP™ brukere) Ikke bare produsentene ( ERDDAP™ utviklere) .. Gjennom årene har de fleste ideene til nye funksjoner og endringer i ERDDAP™ Har kommet fra brukerne. Disse brukerne krediteres nedenfor for sine gode ideer. Takk&#33; Vennligst hold disse gode forslagene kommer&#33;

Her er endringene som er forbundet med hver ERDDAP™ Frigjøring.

## Versjon 2.30.0{#version-2300} 
 (utgitt 2026-04-07) 

Versjon v2.30.0 fokuserer stort sett på feilrettinger, avhengighetsoppdateringer for stabilitet og sikkerhet og testing av ytelsesforbedringer.

*    **Nye funksjoner og endringer (for brukere) :)** 
      * Forbedret [Croissant](https://mlcommons.org/working-groups/data/croissant/) metadata kompatibilitet og manifest støtte, inkludert [mlcroissant](https://pypi.org/project/mlcroissant/) kompatibilitet.
      * Forbedret støtte til parkett bobler.

*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
      * Ubrukte kommandolinjeverktøy og tilhørende kode ble fjernet fra kodebase for å redusere teknisk gjeld. Se https://github.com/ERDDAP/erddap/pull/432.
 
      * Et nytt flagg `ForceSynkronousLoading` Har blitt lagt til for å overstyre standard utsett datasett-lasting tilnærming. Dette bør sjelden være nødvendig, og kun brukes i tilfeller der utsett lasting forårsaker problemer. Se [funksjonen flaggside](/docs/server-admin/feature-flags#forcesynchronousloading) for detaljer.

## Versjon 2.29.0{#version-2290} 
 (utgitt 2025-12-15) 

Handling nødvendig.

 ERDDAP™ versjon 2.29.0 krever jdk 25 eller senere. Oppdater din Jdk versjon. Hvis det er et problem, kan du bygge ERDDAP™ for en eldre jdk (Tilbake til minst 17) ved å endre pom.xml-filen. JDK 25 er en LTS utgivelse av Java og inkluderer mange forbedringer, spesielt forbedret ytelse.

*    **Nye funksjoner og endringer (for brukere) :)** 
    * ISO 19115 versjoner: Se nedenfor for admin info. For brukere kan du nå be om spesifikke versjoner av ISO 19115 metadata. Gjør dette fra rutenettet/ tabledap sider for et datasett med filtypen faller ned. Disse versjonene vil være uavhengig av serverens standard.

*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Ny funksjon, støtte for MQTT. For detaljer anbefaler jeg å lese [Ny side om det.](/docs/server-admin/mqtt-integration) Dette inkluderer å kunne bygge datasett fra MQTT-meldinger, og publisere MQTT-meldinger når et datasett endres. Det er av som standard, så hvis du vil bruke det, må du aktivere det.

Takk til Ayush Singh for å jobbe på MQTT&#33;

    * S3 forbedringer: Legge til støtte for S3-adresser som cacheFromUrl-verdi. Dette vil tillate ERDDAP å støtte private bøtter hostet av amazonaws.com Også løst et S3-minnelekkasjeproblem.

Takk til @SethChampagneNRL for arbeidet med S3&#33;

    * ISO 19115 versjoner: Det er nå støtte for 3 forskjellige versjoner av ISO 19115 metadata. Standardversjonen styres av innstillinger i config.xml. Hvis brukSisISO19115 er falsk, vil serveren som standard gi NOAA modifisert ISO19115_2. Hvis brukSisISO19115 er sant, vil serveren bruke en annen versjon avhengig av verdien av brukSisISO19139. Hvis brukSisISO19139 er sant, vil standarden være ISO19139_2007, hvis brukSisISO19139 er falsk, vil standarden være ISO19115_3_2016. Vi anbefaler å bruke brukSisISO1911 [25] sant og brukSisISO19139=falske. Din organisasjon kan kreve ulike innstillinger.

    * Jeg gikk til Java. tidsbibliotek (I stedet for java.util. GregorianskeCalendar) .. Dette bør gi ytelsesforbedringer ved spørsmål som involverer dato/tid-kolonner. Det bør ikke være noen merkbar effekt for de fleste datasett. Det eneste kjente tilfellet dette forårsaker en endring er hvis datasettet bruker `dager siden 0000-01-01` eller lignende. Hvis dette er et problem for en variabel, kan du legge til ` <att name="legacy_time_adjust"> sant </att> ` til addAttributes delen av enten dataVariable eller axisVariable ..
    
    *    datasets.xml Nå behandles av en [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) .. Dette har mange bruksområder inkludert å sette private verdier (som passord) bruk av miljøvariabler. Dette kan deaktiveres ved å angi EnvParsing til falsk i config.xml.

    * Trykkakse: Legger til et spesielt tilfelle for økninger definert av trykk. Dette brukes primært i Meteorologidatasett som definerer vertikale økninger i isobare nivåer. MERK: Mindre trykkverdier betyr høyere stigninger, så aksen går overfor de normale høyder definert i meter eller føtter.

Takk til [SethChampagneNRL](https://github.com/ERDDAP/erddap/pull/373) 

    *    EDDGrid FraNcFiles med varierende dimensjoner: Det er (eksperimentell) støtte til EDDGrid FraNcFiles datasett å ha variabler som ikke bruker det samme settet akser. Vennligst rapporter tilbake om hvordan dette fungerer for deg, eller hvis oppførselen ikke virker helt riktig.

    * Det er en samling av optimeringer som bør være trygge, men har flagg å gå tilbake til gammel oppførsel om nødvendig. Hvis du finner behovet for å angi noe av flaggene, vennligst fil en feil. Hvis vi hører om ingen problemer vil de fleste av disse bli fjernet med den nye atferdsstandarden i fremtiden. Det er en [ny side om funksjonsflagg](/docs/server-admin/feature-flags) der du kan lese om disse og andre flagg.

      * berøring Tråd Bare Når elementene: Dette er en endring slik at berøringstråden bare vil kjøres når det er elementer i køen å røre. En færre trådkjøring er en mindre optimalisering, men likevel nyttig. Standard til sant.

      * brukNcMetadata ForFiltabell: Denne endringen lar den interne filtabellen bruke nc-attributter, spesielt en variabel actual_range-attributt for å unngå å lese hele nc-filen. Dette kan drastisk øke den opprinnelige lastingen av datasett basert på nc-filer hvis det faktiske_range for hver variabel i hver fil er inkludert som en attributt. Merk at dette stoler på verdien, så hvis det er feil, vil den interne filtabellen ha feil informasjon. Standard til sant.

      * ncHeader MakeFile: Denne endringen gjør det mulig å generere nc-hodefiler uten først å generere den representative nc-filen. Dette er en liten optimering for EDDTable, men en enorm optimering for mange EDDGrid Forespørsler. Standard til falsk (som i falsk er den tiltenkte optimaliserte oppførselen) ..

      * bakgrunn OpprettSubset Tabeller: Denne endringen beveger noen av den første behandlingen av datasett til en bakgrunnstråd. Dette bør forbedre tiden for lasting av datasett. Spesielt den forsinkede delen er undergruppetabeller, som også genereres når nødvendig hvis den forsinkede behandlingen ikke har skjedd ennå. Standard til sant.

    * Noen små endringer, feilrettinger (Takk Italo Borrelli for fix for EDDTableFra Aggregate Rooms, Takk @SethChampagneNRL for å tillate lengdegrader som er større enn 360 i EDDGrid LonPM180, og flere andre feilrettinger) og optimering.

*    **For ERDDAP™ Utviklere:** 
    * Ytterligere optimaliseringer, inkludert skjæring av prøvekjøringstid i to.

    * Nye testprofiler for veldig flaky (Ekstern) eller ekstremt sakte (sakteAWS) Tester.

## Versjon 2.28.1{#version-2281} 
 (utgitt 2025-09-05) 

*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Støtte lagt til for X-Forwarded-Prefix. Dette er spesielt interessant for administratorer som kjører servere på en understi. Les vår oppdaterte dokumentasjon for [Apache](/docs/server-admin/deploy-install#apache) og [Nginx](/docs/server-admin/deploy-install#nginx) For mer informasjon.

Takk til [@srstsavage](https://github.com/srstsavage) 

## Versjon 2.28.0{#version-2280} 
 (utgitt 2025-08-29) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    *    [Croissant-skjema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) nå tilgjengelig. Admins kan kontrollere om standard metadata bruker Croissant, men fra og med 2.28.0 kan du be om Croissant-definisjonen for med den nye eksportfiltypen ".croissant" (som gir en Jsonld-fil) ..

*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * New Docker Bilde opprettet på hver sammenslått trekkforespørsel. Dette er alfabygg, de er ikke utgitt. De vil ha en tag som "20250814T034025", som indikerer når den ble bygget. Hvis du vil prøve ut de nyeste funksjonene kan du bruke disse. Hvis du vil ha noe mer stabilt bruk våre utgivelser med en semantisk versjonstag (f.eks. 2.28.0) .. Vi tar alltid sikte på å få alfautgivelsene til å være brukbare, men det er mindre testing for dem enn våre versjonsutgivelser. Vi anbefaler alltid at du bruker noe minst så nytt som vår siste utgivelse som vil være den siste semantiske versjon.

    * Docker Bilder nå tilgjengelig på [GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) I tillegg til [DockerHub](https://hub.docker.com/r/erddap/erddap) ..

Takk til [@ocefpaf](https://github.com/ocefpaf) , [@abkfenris](https://github.com/abkfenris) , [@srstsavage](https://github.com/srstsavage) , og [MathewBiddle](https://github.com/MathewBiddle) til bidragene rundt Docker Images. Dette inkluderte de første bidrag fra alle bortsett fra @stsavage&#33;
    
    * Det er nå støtte til å generere [Croissant-skjema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) Filer. Det er som standard. Du kan deaktivere Croissant-skjemaet i setup.xml med (Ikke aktivert - Vennligst kontakt eller fil et problem på GitHub hvis du trenger å gjøre dette) :)
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Noen innstillinger har endret standardverdier. brukHeadersForUrl og brukEddReflection nå både standard til sant. Hvis de forårsaker et problem og du trenger å sette dem til falsk, vennligst lag et problem. Hensikten er å fjerne dem i en fremtidig utgivelse.

    * Noen innstillinger er fjernet. brukSharedWatchService og omdirigereDokumentering ToGitHubio hadde blitt satt til sant som standard for flere utgivelser og ble ganske godt testet på dette punktet. Fjerne disse tillatt for noen kode rengjøring.

    * Noen små endringer, feilrettinger og optimeringer.

*    **For ERDDAP™ Utviklere:** 
    * Mange døde kode fjernet. Mange advarsler løst.

## Versjon 2.27.0{#version-2270} 
 (utgitt 2025-06-11) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Nye data til colorbar konverter på servere på /erddap/convert/color.html

*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Standard atferd er at cache nå vil bli slettet uavhengig av de store last datasett oppgaven. Dette vil tillate mer pålitelig og regelmessig fjerning av gamle cache-filer. Det er ekstra arbeid for å forbedre serveradferd når lavt på diskplass (å returnere en feil for forespørsler som sannsynligvis vil gjøre serveren tom for plass, og å slette cache oftere under lave diskforhold for å forsøke å hindre feil) .. I datasets.xml   (eller setup.xml) du kan legge til/sett den nye cacheen ClearMinutes parameter for å kontrollere hvor ofte serveren sjekker for å rydde cache. Merk at den eksisterende cacheMinutes parameteren kontrollerer alderen på filene som skal holdes, den nye cache ClearMinutes er for hvor ofte å gjøre en chach klar.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Du kan deaktivere den nye cache klare kontroller ved å sette oppgaveCacheClear til falsk i setup.xml, men det anbefales ikke.
mellomlager ClearMinutes er også i [Datasetts dokumentasjon](/docs/server-admin/datasets#cacheclearminutes) ..
    
    * Lokalisert datasett metadata støtte. Den støtter lokalisering for verdier i en addAttributes Seksjon. Legg til en attributt med ekstra xml:lang tag. Legg til fransk tittel i et datasett addAttributes Seksjonen inkluderer:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Flere detaljer er tilgjengelige i [lokalisert metadatadokumentasjon](/docs/server-admin/localized-metadata) ..

    * New Docker Komponer fil med alternativer for SSL og en barebones Prometheus-server. Takk til Shane St. Savage for SSL og Jiahui Hu for Prometheus.

    * Støtte for bruk av informasjon i overskriftene til å bestemme serverens URL i stedet for å stole på oppsettsfilen. Dette vil gjøre det mulig å få tilgang til en server med flere navn og kan forenkle visse konfigurasjoner. Vennligst aktiver det og send tilbakemeldinger.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Noen små endringer, feilrettinger og optimeringer.

*    **For ERDDAP™ Utviklere:** 
    * Refaktor til hvordan utgangsfiltypene er definert i kode. Dette bør gjøre det slik at filtyper kan legges til uten å måtte berøre mange kodesteder.

## Versjon 2.26{#version-226} 
 (utgitt 2025-03-31) 

*    **For alle:** 
    * Stor oppdatering til vår dokumentasjonsside: https://erddap.github.io/
 
I tillegg til det oppdaterte utseendet er det forbedret navigasjon, søk, oversettelse, og det bør være lettere å opprettholde videre&#33;

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Abonnementer og RSS oppdateringer bør skje mer pålitelig for datasett som blir oppdatert ofte fra filendringer.

*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Standardutgivelsen krever/støtter Java 21. Tilbake i denne utgaven er det lett å lage en Java 17 kompatible binære.

    * Ny funksjon for å tilpasse informasjonen som vises om datasett i UI. Vi forventer at dette er spesielt nyttig å legge til ting som datasett siteringer. For flere detaljer kan du lese [Ny dokumentasjon](/docs/server-admin/display-info) .. Takk til Ayush Singh for bidraget&#33;

    * Ekstra Prometheus metriske. Den største er ` http _Request_duration_seconds` som inkluderer forespørselsresponstider fordelt på: " request_type", "dataset_id", "dataset_type", " fil_type", "lang_code", "status_code"
Dette maskinlesbare formatet vil gjøre det mulig å bedre samle metrikker for å forstå hvordan brukerne bruker serveren.

    * Ny måte å generere ISO19115 XML-filer. Det bruker Apache SIS og er et nytt alternativ i denne utgivelsen. Vennligst aktiver det og send tilbakemeldinger.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI vil nå opprette individuelle lenker for hver URL i felt som infoUrl og sammendrag.

    * Abonnementer og RSS Oppdateringer bør skje mer pålitelig for datasett som blir oppdatert ofte fra filendringer. Hvis dette forårsaker problemer, kan du kontakte GitHub og deaktivere funksjonaliteten ved å legge flagget nedenfor til config.xml.
INGEN KJELDE
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subsetvariabler vil ikke lenger bli generert automatisk for datasett type EDDTableFromNcCFFiles. Hvis du var avhengig av oppførselen, kan du heller (Foretrukket løsning) Legg til subsetVariables til datasettets definisjon i din datasets.xml , eller legg til flagget nedenfor til setup.xml. Hvis du føler behovet for å slå på dette, vennligst kontakt ut på GitHub slik at vi bedre kan støtte din bruks saken fremover.
INGEN KJELDE
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Serveren vil nå omdirigere dokumentasjonsforespørsler (under nedlastinger/ som er dokumentasjonen som har blitt migrert) til den nye dokumentasjonssiden. Hvis nødvendig kan du deaktivere dette med et flagg i setup.xml:
INGEN KJELDE
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Noen små endringer og feilrettinger.

*    **For ERDDAP™ Utviklere:** 
    * Mer kode kvalitet forbedringer og døde kode rengjøring. Dette inkluderer mindre optimalisering, bedre håndtering av klossbare ressurser og migrering fra langvarige datatyper (som vektor) ..

    * Stor refaktoring til EDStatic å trekke ut det meste av konfigurasjonen, meldingen og metrisk kode. Det også bedre innkapsler initialisering og håndtering av katalogstier (De siste to har mer å gjøre.) 

    * Mange fremskritt mot et offisielt støttet Docker Image. Planen er å fullføre og frigjøre etter ERDDAP™ 2.26 utgivelse er tilgjengelig.

## Versjon 2.25{#version-225} 
 (utgitt 2024-10-31) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * EDDTableFromFiles kan nå støtte forespørsler med kun avledede utdata (globaler, jexl-skript eller variabler) ..
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Versjon 2.25 krever Java 21 eller nyere. Dette er LTS-versjonen og har vært tilgjengelig i over et år.
         
    * SharedWatchService er nå standard. Hvis du trenger å deaktivere det, vennligst kontakt chris. john på noaa.gov å fortelle meg, så jeg kan forbedre det i fremtidige versjoner og legge til:
        &lt;brukSharedWatchService&gt;falsk&lt;/useSharedWatchService&gt; til ditt oppsett.xml.
         
    * Den ERDDAP™ Servelet starter nå ved serveroppstart. Dette betyr at datasett vil begynne å laste umiddelbart i stedet for å vente til en forespørsel er gjort.
         
    * RemoveMVRoads parameteren i EDDTableFromMultidimNcFiles vil nå ha en effekt. Å sette den til falsk kan ha betydelig fart på noen spørsmål, men dette kan ikke være egnet for alle datasett. For mer informasjon se [beskrivelse av parameteren](/docs/server-admin/datasets#removemvrows) ..
         
    * Datasett (EDDTableFraNcFiler og EDDGrid FraNcFiles) bruk av zarr-filer er nå støttet. De må inkludere "zarr" i enten filenNameRegex eller pathRegex. Se [zarr secion i datasettsdokumentasjonen](/docs/server-admin/datasets#zarr) for flere detaljer.
         
    * Ny datasetttype, EDDTableFromParquetFiles er nå støttet. Se [EDDTableFraParquetFiles sekion i datasettsdokumentasjonen](/docs/server-admin/datasets#eddtablefromparquetfiles) for flere detaljer.
         
    *    [Prometheus metriske](https://prometheus.io/) er nå tilgjengelig på /erddap/metri.
         
    * En ny XML-tolker implementasjon er tilgjengelig. Denne nye tolken tillater bruk av XInclude i datasets.xml .. Takk til Ayush Singh for funksjonen.
         
    * Ny parameter i datasets.xml å kontrollere uvanlige aktivitet e-poster. uvanligAktivitet FailPersent standard til den gamle verdien på 25%. Takk til Ayush Singh for funksjonen.
         
    * Ny parameter i config.xml som kontrollerer om datasett lasting feil vises på status.html-siden. Det standard til sant, for å deaktivere datasettfeil på statussiden, angir showLoadErrorsOnStatusPage til falsk:&lt;showLoadErrorsOnStatusPage&gt;falske&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Noen små endringer og feilrettinger.
         
*    **For ERDDAP™ Utviklere:** 
    * Testing separert til enhet og integrasjon (sakte) Tester. Også flere tester aktivert og tester har blitt gjort mindre flaky.
         
    * Feil Prone (Noen kontroller er fortsatt deaktivert) og Spot Bugs integrert gjennom Maven.
         
    * Full kodebase formatert for å matche Google Style Guide.
         

## Versjon 2.24{#version-224} 
 (utgitt 2024-06-07) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Ny farge palett EK80 for akustiske datasett tilgjengelig. Takk til Rob Cermak for dette.
         
    * Løs et problem der EDDTableAggregate roads ikke viste riktige intervaller fra alle barn. Takket være Marco Alba for reparasjonen og feilrapporten.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Å gjøre: SIKKERHETSændring: Google-autentisering kan kreve endringer i din CSP.
        
Spesielt kan du også måtte legge til https://accounts.google.com/gsi/style å stlye-src og https://accounts.google.com/gsi/ å koble til. For script-src kan du nå bruke https://accounts.google.com/gsi/client.
 
        
For mer informasjon kan du gå til [Google-side](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) om CSP konfigurasjon.
         
        
    * Ny Shared Watch Service. Dette er et nytt alternativ for å se på mapper for oppdateringer. Den har én tråd for hvert filsystem i stedet for én tråd per datasett. Mest sannsynlig vil dette drastisk redusere antall tråder som brukes til å se på endringer. Det betyr at alle datasett blir oppdatert sammen i stedet for at hvert datasett har sin egen oppdateringsfrekvens. Mest sannsynlig vil dette bety hyppigere oppdateringer for de fleste datasett.
        
For å aktivere dette tillegget&lt;useSharedWatchService&gt;true&lt;/useSharedWatchService&gt; til ditt oppsett.xml.
        
          
Vennligst prøv dette og rapporter hvordan det fungerer for deg å chris. John på noaa.gov.
         
    * Rett for feil var navn i logger. Takk til Ayush Singh for løsningen.
         
    * Noen små endringer og feilrettinger.
         
*    **forbedringer for ERDDAP™ utviklere:** 
    * Støtte til lokal utvikling ved hjelp av Docker. Takk Matt Hopson og Roje.
         
    * Støtte for lokal utvikling ved å bruke Jetty og dokumentasjonsforbedringer. Takk, Michael Wengren.
         
    * Endringer i tester for å redusere problemer på tvers av plattform. Takk Shane St. Savage.
         

## Versjon 2.23{#version-223} 
 (utgitt 2023-02-27) 

Legg merke til at denne utgivelsen ble gjort av Bob Simons, og dermed viser at han fortsatt er rundt og aktiv under overgangen til Chris John, hans etterfølger. Med denne utgivelsen blir alle kodeendringer utført av Chis John, med mindre annet er angitt.

*    **Nye funksjoner og endringer (for brukere) :)** 
    *    (Ingen)   
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Å gjøre: SIKKERHETSændring: Google-godkjenning er nå utført via det nye Google Identity Services-biblioteket som er en del av "Sign In with Google". Googles støtte til det gamle systemGoogle Log In"-systemet vil bli avsluttet 2023-03-31. Hvis du bruker Google-autentisering i din ERDDAP™ installasjon, må du oppdatere til ERDDAP™ v2.23+ før da. (Bob er lei for kort varsel. Det er Bobs feil.)   
         
    * NCCSV er nå v1.2. Endringen er at filene nå er UTF-8-kodede filer (De var ASCII) og så kan nå inkludere alle Unicode-tegn som er, uten å kode som \\u_hhhh_, selv om det fortsatt er tillatt.
Når du skriver NCCSV-filer, ERDDAP™ Nå skriver v1.2 filer.
         ERDDAP™ vil fortsatt lese NCCSV-filer som følger v1.0 og v1.1-spesifikasjonen.
Takket være Pauline-Chauvet, n-a-t-e og thogar-datamaskin for å foreslå dette og gjøre testene for å sikre at ulike regneark programmer kan importere UTF-8-filer. Takk til Bob Simons for denne koden endring.
         
    * NEW: Status.html nettsiden har nå en linje nær toppen som indikerer hvilke datasett lastDatasett som for tiden lastes og relaterte statistikker, eller ingen hvis ingen datasett lastes. Dette kan være veldig nyttig å ERDDAP™ administratorer prøver å finne ut hvorfor belastning Datasett tar så lang tid. Også nGridDatasett, nTableDatasett og nTotalDatasett teller nedenfor som nå er øyeblikkelig (Tidligere var de fra slutten av den siste store belastningen Datasett) ..
Denne endringen er for Roy Mendelssohn. Takk til Bob Simons for denne koden endring.
         
    * IMPROVED: Generer datasett Xml endres nå til CF-1.10 (var CF-1.6) i konvensjonene - attributter.
Takk til Bob Simons for denne koden endring.
         
    * Noen små endringer og feilrettinger.
         

## Versjon 2.22{#version-222} 
 (utgitt 2022-12-08) 

Legg merke til at denne utgivelsen ble utført av Bob Simons, og dermed viste at han fortsatt er rundt og aktiv under overgangen til sin etterfølger.

*    **Nye funksjoner og endringer (for brukere) :)** 
    *    (Ingen)   
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Å gjøre: ingenting.
         
    * SIKKERHETSBUG FIX: Det var en Cross Site-relatert feil i koden for språkvalg faller ned. Takk til NOAA Sikkerhetsskanninger for å fange dette. Dette viser at NOAA sikkerhet er aktivt og rutinemessig på jakt etter sikkerhets svakheter i ERDDAP ..
         
    * SIKKERHETSFIX: De mange bibliotekene som brukes av ERDDAP™ ble oppdatert som vanlig som en del av denne utgivelsen. Denne gangen inkluderte dette oppdatering av PostgreSQL-driveren (som hadde en sikkerhetsfeil) til 42.5.1.
         
    * IMPROVED: Flere små endringer i ERDDAP minnestyringssystemet bør redusere sjansen for en gitt forespørsel som mangler på grunn av manglende tilgjengelig minne.
         
    * Noen små endringer og feilrettinger.
         

## Versjon 2.21{#version-221} 
 (utgitt 2022-10-09) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    *    (Ingen)   
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Å gjøre: For Java 17, du bør ikke bruke \\-d64 i JAVA\\_OPTS i setenv.bat eller setenv.sh. Hvis det er der, vennligst fjern det. Jeg tror at 64 bit modus er nå valgt når du laster ned en 64 bit versjon av Java .. Takk til Sam Woodman.
         
    * BUG FIX: Noen ganger forsøkte det nye e-postsystemet å logge inn for ofte, noe som førte til at Google e-postservere avviste all fremtidig logg i forsøk. Nå unngår e-postsystemet dette og relaterte problemer.
         

## Versjon 2.20{#version-220} 
 (utgitt 2022-09-30) 

*    **Ikke bruk v2.20. Det er feil.** Men administratorer trenger fortsatt å gjøre TO DO elementer som er oppført nedenfor ved oppgradering til v2.21+.
     
*    **Nye funksjoner og endringer (for brukere) :)** 
    *    (Ingen)   
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * IMPROVED: Vi aktiverte det gamle minnestyringssystemet på nytt (Math2.ensureMemoryTilgjengelig) og endret det nye minnestyringssystemet (EDStatic.shedThisRequest) å jobbe bedre med det. Se [Minnestatus](/docs/server-admin/additional-information#memory-status) for detaljer.
         
    * Endret: Standard for&lt;ipAddressMaxRequests&gt; i datasets.xml Økt fra 7 til 15. Det er klart at noen legitime WMS Kundene kan generere mer enn 7 samtidige forespørsler.
         

## Versjon 2.19{#version-219} 
 (utgitt 2022-09-01) 

*    **Ikke bruk v2.19. Det er feil.** Men administratorer må fortsatt gjøre TO DO-elementene som er oppført nedenfor ved oppgradering til v2.20+.
     
*    **Nye funksjoner og endringer (for brukere) :)** 
    * NEW: Det er en ny serverside-funksjon, orderBy Synskhet som virker som orderBy Men slags i synkende rekkefølge. Takk til Adam Leadbetter.
         
    * IMPROVED: Nå, grafer (Men ikke kart) vil utvide seg til å fylle ledig plass på lerretet, dvs. plass som ikke brukes av legenden. Du kan få høye grafer, firkantet grafer eller brede grafer ved å legge til og manipulere &.size=_wide_ | _høyde_parameter (der bredde og høyde angi størrelsen på lerretet, i piksler) på forespørselsadressen. (Dette er ikke et alternativ på nettsiden .graf. Du må legge den til i URL-en manuelt.) Hvis du ikke angir &.size parameter, forespørsler om .smallPng, .png, .largePng, .smallPdf, .pdf og .large.pdf har forhåndsdefinerte lerret størrelser, så grafen vil utvide seg til å fylle ledig plass, men vil vanligvis være omtrent firkantet. Takk til Bob Fleming.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Å gjøre: ERDDAP™ Nå krever Java 17 og den tilhørende Tomcat 10. Du må følge ERDDAP™ installasjonsinstruksjoner (eller tilsvarende for eksempel Docker) å installere Java 17 og Tomcat 10 og kopier din \\[ tomcat \\] /innholdskatalog fra din Tomcat 8 installasjon i den nye \\[ tomcat \\] Katalog. Det finnes ingen andre endringer som du trenger å gjøre til din ERDDAP installasjon relatert til denne endringen. Med andre ord: ERDDAP™ fungerer som før.
        
Ikke glem å lage ERDDAP -relaterte endringer i Tomcats server.xml og kontekst.xml når du oppgraderer Tomcat. Se ERDDAP 's [Tomcat installasjonsanvisninger](/docs/server-admin/deploy-install#tomcat) ..
        
Mitt inntrykk av Java 17 er at det foretrekker mer prosesskraft og minne for langvarig drift, større programmer som ERDDAP™ så det fungerer litt langsommere enn Java 8 med lav effekt datamaskiner (For eksempel 2 kjerner og minimal RAM) Fungerer litt raskere enn Java 8 med høyere strømdatamaskiner (For eksempel 4+ kjerner og rikelig RAM) .. Hvis du ser dårlig ytelse, bruk programmer som Linux [topp](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) å sjekke ressursbruk og vurdere å gi ERDDAP™ Flere ressurser, spesielt mer minne. Minne er billig&#33; De fleste telefonene har flere prosessorer og minne enn serverne som noen av dere bruker til å kjøre ERDDAP &#33;
Takk til Erin Turnbull.
         
        
    * Å gjøre: Hvis du bruker ERDDAP™ for å få tilgang til Cassandra, for Cassandra, må du fortsette å bruke versjonen av Java som du brukte til å kjøre Cassandra. Bytt til Java 17 for å kjøre Tomcat+ ERDDAP ..
         
    * Å gjøre: Anbefalt: Hvis serverens CPU har 4+ kjerner og 8+ GB RAM, bør du vurdere å endre til disse innstillingene i din datasets.xml fil:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Hvis serveren din har færre ressurser, hold deg til "1 for begge disse innstillingene.
NThreads-systemer for EDDGrid Fra Filer og EDDTable Filene ble betydelig forbedret. Disse endringene førte til en enorm forbedring av hastigheten (For eksempel 2X-hastighet når nThreads er satt til 2 eller mer) For de mest utfordrende anmodningene (Når et stort antall filer må behandles for å samle resultatene) .. Noen relaterte endringer fra Chris John vil også føre til en generell hastighet gjennom hele ERDDAP .. Koden for disse endringene var bidratt av Chris John. Takk, Chris&#33;
         
    * ADVARSEL: bindestrek i datasetID Er foreldet og ikke lenger støttet (teknisk fortsatt tillatt) .. De vil sannsynligvis ikke tillates i neste utgivelse. Hvis du bruker bindestrek, bytte til understreker nå for å unngå problemer. Hvis du gjør endringen nå, det er i egen hastighet. Hvis du venter til neste utgivelse, er du i panikk og må håndtere det den dagen.
         
    * NEW: Nå, for .htmlTable datasvar, hvis dataene i en streng celle inneholder data:image/png;base64, fulgt av et base64 kodet .png-bilde, ERDDAP™ vil vise et ikon (så brukeren kan se bildet hvis de svever over det) og knapper for å lagre teksten eller bildet til utklippstavlen. Takk til Marco Alba (som bidro koden) Bob Simons (som endret det litt) ..
         
    * NY: - ikke legg til standardnavn
Hvis du inkluderer \\ doNotAddStandardNames som en kommandolinjeparameter når du kjører generer Datasett Xml, generer Datasett Xml vil ikke legge til standard\\_name til addAttributes for andre variabler enn variabler som heter breddegrad, lengdegrad, høyde, dybde eller tid (som har åpenbar standard\\_name s) .. Dette kan være nyttig hvis du bruker utgangen fra å generere Datasett Xml direkte i ERDDAP™ uten å redigere utdata, fordi generere Datasett Xml gjetter ofte standard\\_name feil. (Merk at vi alltid anbefaler at du redigerer utdata før du bruker det i ERDDAP ..) Bruk av denne parameteren vil ha andre mindre relaterte effekter fordi gjettet standard\\_name brukes ofte til andre formål, f.eks. til å skape en ny long\\_name , og for å opprette fargelinjen innstillinger. Takk til Kevin O'Brien.
         
    * NEW: Du kan nå sette&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; i datasets.xml   (i de andre innstillingene nær toppen) å endre det maksimale antall filendringer (standard=10) som vil bli behandlet av oppdateringenEveryNMillis systemet. Et større antall (100?) kan være nyttig når det er svært viktig at datasettet alltid holdes oppdatert. Se [oppdateringMaxEvents dokumentasjon](/docs/server-admin/datasets#updatemaxevents) .. Takk til John Maurer.
         
    * Nyhet: Tilsatt støtte til global- real\\_time = sant | Falsk" Strengeattributt.
Hvis dette er falskt (standard) Hvis datasettet ikke bruker oppdatering Hver NMillis, ERDDAP™ vil cache svar på forespørsler om filtyper der hele filen må opprettes før ERDDAP™ kan begynne å sende svaret til brukeren og gjenbruke dem i opptil 15 minutter (f.eks. .nc .png) ..
Hvis dette er satt til sant eller om datasettet bruker oppdatering Hver NMillis, ERDDAP™ vil aldri lagre responsfilene og vil alltid returnere nyopprettede filer.
Takk til John Maurer.
         
    * NEW: E-poster sendes nå i en separat e-post. Dette gjør lasting av datasett og andre handlinger som genererer e-post raskere fordi lastdatasett ikke trenger å vente på at e-posten skal sendes, noe som noen ganger tar lang tid. Det nye systemet kan sende flere e-poster per e-post-sesjon, og dermed redusere antall e-post-server-innlogginger og redusere risikoen for at de svikter fordi de er for hyppige. Det er statistikk for e-postThread på status.html siden og diagnostiske meldinger i log.txt -- se etter "emailThread". Legg merke til at en tallrik av nEmailsPerSession=0 indikerer problemer, dvs. at en e-postøkt ikke klarte å sende e-post.
Takk til Bob Simons.
         
    * Endret: E-post sendes nå med litt annen kode (på grunn av Java 17 og endring til e-postThread) .. Hvis du har problemer med å sende e-post, vennligst e-post erd.data at noaa.gov ..
         
    * NEW: Abonnementshandlinger som "touch" en ekstern URL håndteres nå i en egen touchThread. Dette gjør lasting av datasett og andre handlinger som berører URL-adresser raskere fordi lastdatasett ikke trenger å vente på at berøringen skal fullføres, noe som noen ganger tar lang tid. Det er statistikk for touchThread på status.html siden og diagnostiske meldinger i log.txt -- se etter "touchThread".
Takk til Bob Simons.
         
    * NEW: På status.html-siden, i -Major LoadDatasets Time Series - det er en ny -shed - kolonne som indikerer antall forespørsler som ble kastet fordi gjeldende ERDDAP™ minnebruken var for høy. Forespørsler som blir kastet vil returnere HTTP-statuskoden 503 "Tjeneste tilgjengelig". Disse forespørselene var ikke nødvendigvis et problem. De kom akkurat på en travel tid. Dette var en del av en revidering av hvordan ERDDAP™ håndterer høy minnebruk.
         
    * NEW: På Unix/Linux datamaskiner er det nå en "OS-informasjon" linje på status.html nettsiden med gjeldende operativsysteminformasjon inkludert CPU-last og minnebruk.
         
    * IMPPROVEED: Nå, når ERDDAP™ er startet på nytt og hurtig restart=sann, EDDTableFromFiles datasett vil gjenbruke undergruppen .nc og tydelig .nc .. For noen datasett reduserer dette sterkt tiden til å laste datasettet (For eksempel fra 60 sekunder til 0,3s) .. Sammen med den nye e-posten (Se ovenfor) , dette bør øke hastigheten på nytt ERDDAP™ for mange ERDDAP™ installasjoner. Takk til Ben Adams og John Kerfoot.
         
    * Endret: Tidligere foreldreløse datasett (Datasett som bor i ERDDAP™ er ikke i datasets.xml ) ble bare notert på status. html og i log.txt etter hver større belastningDatasett. De blir automatisk fjernet fra ERDDAP™ og notert på status.html og i log.txt, og e-postet til e-post Alt til. Hvis du vil fjerne et datasett fra ERDDAP™ , nå alt du trenger å gjøre er å fjerne sin bit av xml i datasets.xml og det vil bli fjernet i neste store lastdatasett. Takk til Bob Simons.
         
    * KnowN BUG i netcdf-java v5.52 og v5.5.3: Den EDDGrid FraThredds Katalogvalg i Generer Datasett Xml som brukes til å jobbe for TREDDS kataloger som inkluderer referanser til datasett i eksterne TREDDS kataloger. Nå gjør det ikke. Jeg har rapportert problemet til netcdf-java utviklere.
         
    * BUG FIX: For Docker brukere innstilling oppsett.xml parametre via ERDDAP \\__paramName_: for inten og boolske parametere (For eksempel e-post SmtpPort) , ERDDAP™ var feilaktig på jakt etter bare _paramName_. Nå ser det etter _ ERDDAP  \\_paramName_. Takk til Alessandro De Donno.
         
    * Endring: ERDDAP™ testsystem bruker nå et automatisert system for å sjekke at nye testbilder er akkurat som forventet. Takk til Chris John for forslaget og Bob Simons for gjennomføringen.
         

## Versjon 2.18{#version-218} 
 (utgitt 2022-02-23) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * NONE
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * BUG FIX: .nc Filene ble ikke stengt under noen omstendigheter. Nå er de det. Takket være Marco Alba, Roland Schweitzer, John Maurer og andre.
         

## Versjon 2.17{#version-217} 
 (utgitt 2022-02-16) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * BUG FIX: Etter endringer i orderBy system for noen år siden, Tabledap's Make A Graph ikke riktig håndterte mange spørsmål som brukes orderBy _Xxx_. Nå gjør det det. Takk til Maurice Libes.
         
    * Endring: Tidligere, ERDDAP™ avviste forespørsler. gjennomsiktig Png er når breddegrads- og/eller lengdegradsverdiene var delvis eller helt utenfor rekkevidde. ( ERDDAP™ GitHub Issues #19, publisert av Rob Fuller -- Takk for innlegget av Rob) Nå returnerer den gjennomsiktige piksler for alle områder utenfor rekkevidde i bildet. Dette er nyttig for mange klientapplikasjoner. Koden endringer for å gjøre denne endringen ble gjort helt av Chris John. Tusen takk, Chris&#33;
         
    * Endring: Tidligere, ERDDAP™ avviste netdap-forespørsler der indeksverdiene for en gitt dimensjon var \\[ høy: lav \\] .. Nå gjør det disse forespørsler gyldige ved å bytte lave og høye verdier. Dette løser et langvarig problem for brukere og eksterne programmer som xtracto som måtte holde styr på de få datasettene som har breddegradsverdier som varierer fra høyt til lavt for å gjøre forespørsel som \\[  (50) :) (20)  \\] Forespørselen i indeksrommet var \\[ lav: høy \\] .. Se https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html En forespørsel som \\[  (20) :) (50)  \\] For et av disse datasettene tolkes automatisk som \\[  (50) :) (20)  \\] ..
         
    * Endret: .esriAscii forespørsler utløser nå en " Fil : Lagre som" dialogboks i brukerens nettleser. Takk til Joel Van Noord.
         
    * BUG FIX: Hvis lengdegradsvariabelen til et barnedatasett i et EDDGrid LonPM180 eller EDDGrid Lon0360 har en valid\\_min og/eller valid\\_max Attribut, de fjernes i EDDGrid LonPM180 eller EDDGrid Lon0360 datasett. Takk til Roy Mendelssohn.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Å gjøre: Hvis du hadde satt&lt;dataProviderFormActive&gt; å falsk til å midlertidig håndtere XSS sårbarheten, vennligst sett det tilbake til sant.
         
    * Sertifisering BUG FIX: Fast XSS sårbarhet i Dataleverandør skjema. Takk til Genaro Contreras Gutiérrez.
         
    * BUG FIX: Når en AWS S3 dirctory hadde mer enn 10000 filer, ERDDAP™ En intern feil Nå er det fikset. Takk til Andy Ziegler.
         
    * BUG FIX: EDDGrid SideBySide tillot ikke variabel sourceName I forskjellige barnedatasett er det det samme. Nå gjør det det. Takk til Joshua Stanford.
         

## Versjon 2.16{#version-216} 
 (utgitt 2021-12-17) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Endringer/BUG FIXER: Mange små endringer i oversettelsessystemet takket være forslag fra språkspesifikke redaktører. Takket være Melanie Abecasis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian og Mike Smit.
         
    * Addert en riktig fraskrivelse og tilskrivelse til Google Translate, som kreves av vilkårene i Google Translate. Også&lt;HTML&gt; tagg i HTML for hver nettside nå korrekt identifiserer ikke-engelske nettsider som har blitt maskin oversatt. Takk til Mike Smit.
         
    * BUG FIX: Påloggingsnettsidene fungerer nå riktig med ulike språkinnstillinger. Takk til Mike Smit.
         
    * Ny orderBy Sumfilter. Og nye Sjekk alle og fjern merket alle knappene på EDDGrid Data Access Form nettside. Takket være kodebidraget fra Marco Alba.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Å gjøre: Hvis du har
        &lt;spørsmålMarkImageFile&gt; QuestionMark.jpg&lt;/questionsMarkImageFile&gt;
i config.xml-filen din, du må enten fjerne hele merket (anbefales, så standardfilen brukes) eller endre det til:
        &lt;spørsmålMarkImageFile&gt; QuestionMark.png&lt;/questionsMarkImageFile&gt;
         
    * Endringer: Bare så du vet, [Adoptium](https://adoptium.net/?variant=openjdk8) har erstattet AdoptOpenJDK som hoved/anbefalt kilde til Java   (OpenJDK) ..
         
    * Endring: Loggfiler fra ERDDAP™ , Generer datasett Xml, og DasDds er nå UTF-8, ikke datamaskinens standard tegnsett. Jeg gjorde mye kontroll og gjorde noen endringer for å sikre at ERDDAP™ alltid spesifisere riktig tegnsett når du leser eller skriver alle typer filer, og ikke lenger (i flere tilfeller) stole på datamaskinens standard tegnsett. Dette korrigerte noen feil og flyttet så nært som jeg kunne til målet å bruke UTF-8 for så mange filtyper som mulig (f.eks. .log, .xml, .html, .json , .json l, .nc Topptekst) .. Merk at mange eldre filtyper kreves for å bruke ISO-8859-1 (f.eks. OPeNDAP .das, .dds, .csv .tsv , .nc 3, .nccsv .cpt) .. Jeg har tidligere forsøkt å jobbe med CF-gruppen og med Unidata å legge til støtte for UTF-8 i .nc 3 filer, begge var resistente.
         
    * NEW: Når du laster ned filer fra AWS S3, ERDDAP cache FromUrl-system i EDDGrid Fra Filer og EDDTable FraFiles bruker nå den nye AWS Transfer Manager til å laste ned filer via parallelliserte deler (Derfor veldig raskt) .. Målet gjennomstrømning er satt til 20 Gbps, per fil, så dette fungerer godt med alle AWS-instanstyper, men spesielt de som har utmerket - Networking Performance - Med denne endringen ERDDAP cache FraUrl systemet tilbyr nå sammenlignbare hastigheter til Xarrays tilnærming av parallelliserte nedlastinger av forhåndsvalgte filer, men uten behov for å konvertere kildefilene fra .nc og .hdf i bitte Xarray-filer. Faktisk, ERDDAP Systemet er bedre hvis det er en påfølgende forespørsel om å lese fra den samme filen, fordi ERDDAP™ Nå har en lokal kopi av filen. Vårt samfunn har brukt år på å standardisere .nc og .hdf Filer. Nå trenger vi ikke kaste det ut bare for å få god ytelse når vi lagrer data i AWS S3. Takk til Rich Signell.
         
    * Endring: searchEngine=Lucene er for tiden utdatert. Det er et komplekst system som ofte gir resultater som er litt forskjellig fra den mer ønskelige oppførselen til searchEngine=original. For nesten alle ERDDAP™ installasjoner, tidsbesparelser av Lucene ikke kompensere forskjellene i resultatene. Bruk searchEngine=original i stedet om mulig. Hvis det forårsaker problemer, vennligst send e-post til Bob.
         
    * Endring: Lucene-søketEngine oppfører seg nå mer som den opprinnelige søkEngine. Det er ikke lenger noen tilfeller der lucen tror en datasett kamper og originale ikke gjør det. Også, lucenes rangeringer nå lik originalens rangeringer (Fordi originalen nå alltid brukes til å beregne rangeringene) ..
         
    * BUG FIX: starter i en nylig utgivelse, ERDDAP™ Sluttet å se mer enn de første 1000 objektene i en gitt AWS S3 bøtte. Nå, ERDDAP™ Igjen ser alle objektene. Takk til Andy Ziegler.
         
    * BUG FIX: Nå EDDTableAggregate Rader fjerner actual\\_range attributt når et eller flere av barnas datasett aldri kjenner variablene \" actual\\_range   (For eksempel EDDTableFromDatabase) .. Takk til Erik Geletti.
         

## versjon 2.15{#version-215} 
 (utgitt 2021-11-19) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    *    ERDDAP™ har et nytt system for å la brukeren angi språket som skal brukes til alle nettsider. Hvis en ERDDAP™ installasjon er satt opp til å bruke den, listen over språk vil vises i øvre høyre hjørne av hver nettside. ERDDAP™ URL er fra før denne versjonen fortsetter å fungere og alltid returnere engelsk innhold, som før.
        
Ingen tekst eller alle nettsider ble oversatt. Det var tidsbegrensninger på dette prosjektet som forhindret Qi og Bob i å komme til 100%.
        
Det åpenbare spørsmålet er: Hvorfor gjorde vi så mye innsats i dette når Chrome vil oversette nettsider on-the-fly? Svaret er: På denne måten får vi mye mer kontroll over hvordan oversettelsen gjøres. Merkelig er det mange ord som ikke bør oversettes på nettsidene, for eksempel titler og sammendrag av datasett, navn på variabler, parametre, enheter og organisasjoner. Mye av oversettelsesinnsatsen var å identifisere ord og uttrykk som ikke bør oversettes. Også maskinoversettelser tendens til å mangle visse typer HTML-merking. Å administrere oversettelsen gjorde det mulig å minimere dette problemet.
        
Oversettelsesprosjektet ble utført av Qi Zeng (en Google Summer of Code intern) Bob Simons bruker Googles oversettelsesnetttjeneste. Det var et stort prosjekt. Takk, Qi&#33;
        
    * BUG FIX: ERDDAP™ Nå lar ORCID ID ha X som siste siffer. Takk til Maurice Libes.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Å gjøre:
        
        * Du må gjøre noen endringer relatert til ERDDAP Det nye systemet som lar brukerne angi språket for nettsider.
            * På den første linjen i setup.xml og datasets.xml Filer, endre til: koding="UTF-8" og endre dokumentets koding i tekstredigeringen slik at den lagres som en UTF-8-fil. Opprett datasett Xml antar nå at datasets.xml er en UTF-8-fil.
            * Programmører som samler ERDDAP :) Alle ERDDAP™ .java-filer bør behandles som UTF-8-filer som standard. Du må kanskje legge til --koder UTF- - til Javac-kommandolinjen. (Det gjorde jeg.) 
            * For å aktivere dette systemet (sterkt anbefalt) I&lt;startBodyHtml5&gt; tag som du angir i datasets.xml , endre "&amp&#33;loginInfo;" til "&amp&#33;loginInfo; | &amp&#33;språk;" slik at listen over språk vises i øvre høyre hjørne av hver ERDDAP™ Nettside.
            *    ERDDAP™ Bare bruk&lt;startBodyHtml5&gt; tag som du angir i datasets.xml å angi HTML-innholdet for banneren øverst på hver ERDDAP™ nettside uansett hvilket språk brukeren velger. Hvis du endrer etiketten til å bruke
" &EasierAccessToScientificData; " i stedet for " lettere tilgang til vitenskapelige data" og
" &BroughtToYouBy; " i stedet for "Brought til deg ERDDAP™ vil bruke oversatte versjoner av disse frasene i banneren.
            * Tilsvarende den nye standarden&lt;ShortDescriptionHtml&gt; i datasets.xml er
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
De siste 3 linjene av innhold er ting som vil bli erstattet med oversatt tekst. Hvis du konverterer noen av dem (spesielt & dette SpesialErddap;) eller alle å uttrykke teksten i datasets.xml   (som har prioritet, hvis det er) eller messages.xml, at teksten vil vises uansett hvilket språk brukeren velger. Dette er ikke perfekt, men jeg trodde at få administratorer ville ønske å redigere&lt;ShortDescriptionHtml&gt; i 35 ulike filer for å gi 35 forskjellige oversatte versjoner av det merket.
        
          
         
    * Endring: Noen feil håndteres nå litt annerledes, og så kan legges til i den høye delen av "Failed Forespørsler" på status.html og i Daily Report E-post. Disse tallene kan være noe større enn tidligere.
         
    * BUG FIX: Genererer datasett Xml for EDDGrid Lon0360 og EDDGrid LonPM180 utelukker nå kildedatasett med datasetID = ~ ".\\*\\_LonPM180" og datasetID = ~ ".\\*\\_Lon0360", henholdsvis.
         

## Versjon 2.14{#version-214} 
 (utgitt 2021-07-02) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    *    (ingen)   
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Nyhet: EDDGrid Lon0360 som gjør et rutenettet datasett med lengdeverdier &gt;=0 og&lt;=360 fra et rutenettet datasett med lengdeverdier &gt;=-180 og&lt;=180. Se [ EDDGrid Lon0360 dokumentasjon](/docs/server-admin/datasets#eddgridlon0360) .. Takk til Dale Robinson.
         
    * Nyhet: ERDDAP™ administratorer kan nå overstyre alle verdier i config.xml via en miljøvariabel kalt ERDDAP  \\_valueName_ før du kjører ERDDAP .. For eksempel bruk ERDDAP \\_baseUrl overstyrer&lt;baseUrl&gt;-verdi. Dette kan være praktisk når du distribuerer ERDDAP™ med en beholder, som du kan sette standard innstillinger i config.xml og deretter gi spesielle innstillinger via miljøvariabler. Hvis du gir hemmelig informasjon til ERDDAP™ via denne metoden, sørg for å sjekke at informasjonen vil forbli hemmelig. ERDDAP™ Bare leser miljøvariabler én gang per oppstart, i første sekund av oppstart, så én måte å bruke dette på er: sett miljøvariabler, start ERDDAP™ Vent til ERDDAP™ er i gang, og så er det ikke noe miljøvariabler. Takk til Marc Portier.
         
    * IMPROVED: Nå, hvis noen filer i en EDDTableFrom... Filer datasett med mange filer har noen svært lange strengverdier, datasettet vil laste mye raskere og svare på forespørsler mye raskere. Tidligere, ERDDAP™ vil tildele mye plass til min og max strengverdier i filene som lagres med filinformasjon for slike datasett. Den resulterende filen var enorm, noe som førte til at den ble skrevet og lest sakte. Takk til OBIS.
         
    * IMPROVED: Nå, ERDDAP™ gjør en bedre jobb med å tolke uvanlige og ugyldige tegnsekvenser i CSV-filer. Takk til OBIS.
         
    * FIX: Etter et års problemer med Cassandra, har jeg endelig installert Cassandra (v2) Igjen og så klarte å kjøre testene med Cassandra v2. Nå kan jeg si at ERDDAP™ jobber med Cassandra v2 og v3. Takk til ONC.
         

## Versjon 2.12{#version-212} 
 (utgitt 2021-05-14) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * BUG FIX: Hvis du er på abonnentet svartliste, kan du nå ikke be om en liste over abonnementene dine.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * TO DO: NEW: systemet for automatisk å begrense evnen til ondsinnede brukere og altfor aggressive legitime brukere til å gjøre et stort antall samtidige forespørsler som vil redusere systemets ytelse for andre brukere. Det er 3 nye valgfrie tags i datasets.xml som du kan / bør legge til rett etter&lt;grafBakgrunnsfarge&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

For mer informasjon, se [ipAdresseMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests) .. ERDDAP™ Også nå skriver the antall unike brukere (siden oppstart) " på status.html siden.
Takk til personen i Kina som angriper meg ERDDAP™ installasjon.
         
    * Endre til Postgresql driveradferd: Når jeg oppdaterte Postgresql-driveren, kom kolonnenavnene i tabelllisten generert av Postgresql og GenerationDatasetsXml tilbake alle store bokstavar i stedet for alle små bokstaver som tidligere. Jeg vet ikke om det vil påvirke andre ting siden databaser ofte anser disse navnene som ufølsomme. Testdatasettet mitt fungerer fortsatt riktig. Men hvis datasettet slutter å jobbe med dette ERDDAP™ Oppdatering, dette er den mulige årsaken til å forfølge først.
         
    * BUG FIX: ERDDAP™ nå også håndterer private AWS S3 filer riktig. Det var andre relaterte forbedringer av håndtering av AWS S3-filer. Takk til Michael Gangl og Dylan Pugh.
         
    * Nyhet: EDDGrid fra NcFiles og EDDGrid FraNcFiles Upakket kan nå lese data fra "strukturer" i .nc 4 og .hdf 4 filer. For å identifisere en variabel som er fra en struktur,&lt; sourceName &gt; må bruke formatet: _fullStructureName_ | _medlemsnavn, for eksempel gruppe1/myStruct | Min medlem. Takk til NRL.
         
    * Endret: Nå, hvis gjeldende minnebruk pluss denne forespørselen er enda litt høy, gittedap sett nThreads for denne forespørselen til 1. Derfor ERDDAP™ Bevarer hukommelse når minnet er lite. Takk til personen i Kina som angriper meg ERDDAP™ installasjon.
         
    * Nyt system for å overvåke antall åpne filer (som inkluderer sokkel og andre ting, ikke bare filer) i Tomcat på Linux datamaskiner. Hvis noen filer feilaktig aldri blir stengt, kan antall åpne filer øke til det overstiger maksimum tillatt og mange virkelig dårlige ting skjer. På Linux datamaskiner (Informasjonen er ikke tilgjengelig for Windows) :)
        
        * Det er en ny "Åpne filer" kolonnen til høyre for status.html nettsiden som viser prosent av max filer som er åpne. På Windows viser det bare "
        * Når ERDDAP™ genererer denne informasjonen i slutten av hver større datasett reload, den vil skrive ut til loggen. txt fil:
OpenFileCount=_current_ av max=_max_ %=_percent_
        * Hvis prosentandelen er &gt; 50%, sendes en e-post til ERDDAP™ administrator og e-post Alt E-postadresser.
        
For å finne ut mer, eller hvis du ser dette problemet på din ERDDAP™ Se [For mange åpne filer](/docs/server-admin/additional-information#too-many-open-files) ..
Takk til personen i Kina som angriper meg ERDDAP™ installasjon.
         
    * NEW: Jeg har lagt til mye kontroll og håndtering av mange åpne filer", så oppgaven bare stopper og brukeren ser feilmeldingen. Datafiler vil ikke lenger bli merket som dårlig hvis du leser dem resulterer i en "Too mange åpne filer" feil.
         
    * Ny \\[ bigParentDirectory \\] /badFilesFlag katalog:
Hvis du legger en fil i denne katalogen med en datasetID som filnavnet (filinnholdet spiller ingen rolle) , ERDDAP™ vil slette de dårlige Filene .nc fil for det datasettet (hvis noen) Last datasettet på nytt ASAP. Dette forårsaker ERDDAP™ å prøve igjen å jobbe med filene tidligere (Feilaktig?) Merket som dårlig. Takk til Marco Alba.
         
    * Endret: Ved oppstart, hvis en EDDGrid Fra... Filer eller EDDTableFra... Filer datasett opprinnelig har 0 filer i sin liste over kjente gyldige filer (For eksempel er det et nytt datasett) , så ERDDAP™ Utsetter lasting av det og setter et flagg slik at det vil bli lastet ASAP etter at de store lastdatasettene er ferdig. Dette øker oppstarten når det er nye datasett.
         
    * Endret: FileVistorDNls.testAWSS3 () og FileVisitorSubdir.testAWSS3 () Bruk nå AWS v2 (ikke v1) SDK. Så nå Git ERDDAP™ distribusjon nå inkluderer alle nødvendige filer, og du trenger ikke lenger å manuelt legge til den massive v1 AWS SDK krukkefilen.
         
    * Endret: Jeg byttet til å bruke Maven til å oppdage/samle avhengigheter (.jar-filer i /lib) .. Endringen til v2 av AWS SDK nødvendiggjorde dette. Det vil være nødvendig for andre importerte koder i fremtiden. En stor takk til Kyle Wilcox som ga pom.xml han opprettet og bruker, som løste flere problemer for meg.
         
    * Endret: Klassestiparameteren (-cp) brukes i GenerationDatasetXml, DasDds og andre små programmer som følger med ERDDAP™ , og i råd til programmerere er nå mye enklere og bør aldri endres igjen siden det refererer til katalogen, ikke de enkelte filene:
\\-cp klasser;C:\\programmer\\\_tomcat\\lib\\servlet-api.jar;lib\\\*
         (eller \":\" i stedet for \";\" for Linux og Macs) ..
         (Jeg skulle ha gjort det for mange år siden da det ble et alternativ.)   
         
    * NEW: Generer datasett Xml har et nytt verktøyalternativ: FindDuplicTime som vil søke gjennom en samling gitt .nc   (og relatert) filer å finne filer med dupliserte tidsverdier. Se [foundDuplikat Tid](/docs/server-admin/datasets#findduplicatetime)   
         
    * Nyhet: datasets.xml kan nå inkludere en&lt;paletter&gt; tag som overstyrer&lt;paletter&gt; tag verdi fra messages.xml (eller tilbake til e-post.xml-verdien hvis den er tom) .. Dette lar deg endre listen over tilgjengelige paletter mens ERDDAP™ Jeg løper. Også, hvis du har en cptfiles underkatalog i ERDDAP™ innholdskatalog, ERDDAP™ vil kopiere alle \\*.cpt-filene i den katalogen til \\[ tomcat \\] /webapps/erddap/WEB-INF/cptfiles-katalog hver gang ERDDAP™ Begynner. Sammen lar disse endringene deg legge til paletter og få endringene vedvarer når du installerer en ny versjon av ERDDAP .. Se [Palettdokumentasjon](/docs/server-admin/datasets#palettes)   
Takket være Jennifer Sevadjian, Melanie Abecassis og kanskje andre CoastWatch-folk.
         
    * Endret: [&lt;langsomDownTroubleMillis&gt;] (/docs/server-admin/datasett#slowdowntroublemillis) er nå brukt for alle mislykkede forespørsler, ikke bare noen få typer.
         
    * Endret: RunLoadDatasetts-tråden avbryter nå LoadDatasetts-tråden ved 3/4 LoadDatasett MaxMinutes så det er mer tid for LoadDatasett å legge merke til avbruddet og avslutte nådefullt. Det er også flere og bedre diagnostiske budskap til dette.
         
    * Endret fra den gamle versjonen av Lucene til v8.7.0.
         
    * Endring: E-post sendt av ERDDAP™ nå vises med en fast bredde.
         
    * Endring: EDDGrid FraFiles får nå akseverdier samt attributter fra første | LAST-fil, som spesifisert i&lt;MetadataFrom&gt;. Takk (ikke) til Ken Casey, et al.
         
    * Tilpasset støtte for de ugyldige enhetene " grad\\_Nord" og "grad\\_øst" som feilaktig brukes av de siste filene (siden 2020-10-01) i AVHRR Pathfinder versjon 5.3 L3-kollisert (L3C) SST-datasett (nceiPH53 sst d1dag og nceiPH53 sst n1dag) .. ERDDAP™ kan nå standardisere dem til gyldige enheter. Takk (ikke) til Ken Casey, et al.
         

## Versjon 2.11{#version-211} 
 (utgitt 2020-12-04) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * BUG FIX: OrderByMean kastet en NullPointerException hvis en variabel hadde bare en av \\_FillValue eller mangler\\_ Verdi definert. Nå håndterer det situasjonen riktig. Takk til Marco Alba.
         
    * BUG FIX: Det var problemer med ODV-tekstfiler som ble opprettet av ERDDAP™ i v2.10. Disse problemene er løst. Takket være Shaun Bell.
         
    * BUG FIX: Bare i ERDDAP™ v2.10: Hvis lat lon grensene var spesifisert i URLen, var grenseboksen ikke tegnet på verdenskartet. Nå er det igjen. Takk til John Maurer.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * BUG FIX: Bare i ERDDAP™ v2.10: Skriptfilene for ArkivADataset, Genererer Datasett Xml og DasDds fungerte ikke fordi de ikke hadde endringer i klassestien som ble lagt til med ERDDAP™ v2.10. Nå gjør de det. Takk til Marco Alba.
         
    * NYHET: I datasets.xml Du kan nå ha merket:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Foreløpig, hvis sant (eller hvis merket er tomt, eller hvis merket ikke er i filen) Når en brukers forespørsel fører til en NullPointerException, ERDDAP™ vil sende stabelspor til erd.data at noaa.gov   (den ERDDAP™ utviklingsteam) .. Dette bør være trygt og trygt siden ingen konfidensiell informasjon (f.eks. forespørselen) er inkludert i e-posten. Dette bør gjøre det mulig å fange eventuelle uklare, helt uventede feil som fører til NullPointerExceptions. Ellers ser brukeren unntakene, men ERDDAP™ Utviklere ikke, så vi vet ikke det er et problem som må løses.
        
Det er mulig at denne etiketten vil føre til at andre, lignende diagnostiske opplysninger blir sendt til erd.data at noaa.gov i fremtiden. E-postens innhold vil alltid være minimalt og relatert til feil, og ikke for eksempel bruksinformasjon. Takk til Marco Alba.
         
        
    * Endret: Nå, vanlige komprimerte filtyper ( .bz2 , .gz , .gzip , .tar , .tgz , .z , .zip ) er også forbudt for byte rekkeviddeforespørsler. Dette er spesifisert via&lt;utvidelserNoRangeRequests&gt; i messages.xml.
         
    * Kunnskapelig problem: Som med ERDDAP™ 2.10, .nc ml filer som prøver å endre en attributt, ikke endre attributt. Dette er en kjent feil i netcdf-java som jeg har rapportert og de sier vil bli fikset i neste utgivelse av netcdf-java.
         

## Versjon 2.10{#version-210} 
 (utgitt 2020-11-05) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Nyhet: Den nye [Interpoler](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) omformer effektivt interpolerer verdier fra et rutenettet datasetts verdier. Som sådan er det spesielt nyttig for forskere som jobber med dyrespordata. Denne omformeren tar i en tabell med breddegrad, lengdegrad og tidskolonner (og kanskje andre kolonner) og returnerer en tabell med ekstra kolonner med interpolerte verdier. Dette ligner på den populære [Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto) skript opprinnelig opprettet av Dave Foley, men tilbyr fordelen med å behandle opptil 100 poeng per forespørsel. Takk til Dave Foley og Jordan Watson ( NMFS ) ..
         
    * IMPROVED: Avansert søk er nå strengt for ikke-.html forespørsler. Det vil nå kaste unntak for forespørsler som har permanente feil (For eksempel forespørsler der minLat &gt; maxLat) eller midlertidige feil (f.eks. forespørsler om et standard\\_name Det eksisterer ikke) .. For .html-forespørsler er Advanced Search uendret: som med Google-søk gjør det sitt beste og stille løser eller ignorerer feil. Takk til Rich Signell.
         
    * IMPROVED: Kartet på Advanced Search-siden er nå større (Du trenger å skjelve, men mindre) og betydelig mer nøyaktig (Men likevel ikke perfekt) .. Takk til John Maurer.
         
    * IMPROVED: "Draw landmaske" innstilling på Make A Graph nettsider og &.land=... innstilling i URLs som ber om et kart støtter nå to flere alternativer:
"outline" trekker bare landmasken kontur, politiske grenser, innsjøer og elver.
Off - trekker ikke noe.
Se [&.land=... dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) ..
Takk til John Maurer.
         
    * IMPROVED: Grafer og kart opprettet av ERDDAP™ kan nå bruke tre nye markørtyper: Borderless Fylled Square, Borderless Fylled Circle, Borderless Fylled Up Triangle. Koden for dette ble bidratt av Marco Alba av ETT / EMODnet Physics. Takk til Marco Alba.
         
    * Nyhet: "files" Systemet støtter nå enkel Filtypesvar (.csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , eller .xhtml ..) f.eks. [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) ..
Takk til Kyle Wilcox.
         
    * IMPROVED: Nettadresser som genereres når en bruker bruker et datatilgangsskjema (.html) eller Make-A-Graph (.graph) nettsiden nå riktig prosent-kode tegnene \\[ og \\] .. Dette gjør URL-ene litt vanskeligere for mennesker å lese, men er bedre fra et web-sikkerhetsperspektiv. Administratorer har nå muligheten til å sette avslappetQueryChars= \" \\[  \\]  | \" i Tomcat server.xml-filen (Mindre sikker) eller ikke (sikrere) ..
Takket være Antoine Queric, Dominic Fuller-Rowell og andre.
         
    * NEW: Hvis en forespørsel til et EDDTable datasett inkluderer &add Variabler Hvor (_Tildeling Navn, attributt Verdi_) , ERDDAP™ vil legge til alle variabler som har _adtribut Navn=adtribut Verdi_ til listen over ønskede variabler.
Se [& Legg til Variabler Når dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) .. Takket være Aurelie Briand, et al.
         
    * Endret: ERDDAP™ nå nekter byte rekkevidde forespørsler til /filer/ .nc eller .hdf Filer. Ikke prøv å koble til fjernkontrollen .nc eller .hdf Filer som om de var lokale filer. Det er forferdelig ineffektivt og ofte forårsaker andre problemer. I stedet:
        * Bruk(OPeN)DAPklientprogramvare å koble til ERDDAP 's DAP Tjenester for dette datasettet (som har /griddap/ eller / tabledap / i URL) .. Det er det som DAP er til.
        * Bruk datasettets datatilgangsskjema til å be om en undergruppe av data.
        * Hvis du trenger hele filen eller gjentatt tilgang over lang tid, bruk curl , wget , eller nettleseren din for å laste ned hele filen, og deretter få tilgang til data fra din lokale kopi av filen.
             
    * IMPROVED: .odv Txt-utgangsalternativet er skrevet om for å støtte den nye versjonen av ODV .txt filer og å støtte riktig representasjon av baner, tidserier og profildata.
         
    * IMPROVED: Nå tolkes søkeord i doble sitater som en json-streng, slik at de kan ha \\-kodede tegn. Dette lar deg blant annet søke etter en nøyaktig match for en attributt, f.eks. NOAA  \\n " vil ikke matche et datasett med institusjon= NOAA   NMFS .. Takk til Dan Nowacki.
         
    * IMPROVED: På flere steder flytende punktnummer (Spesielt flyter konvertert til dobbel) nå opptrer som en litt mer avrundet versjon av tallet på flere steder, f.eks. en flyt som tidligere er vist som en dobbel som 32.27998779296875, kan nå vises som 32.28. Takk til Kyle Wilcox.
         
    * BUG FIX: Udefinert heltalls lydfiler ble lest litt feil. Nå leses de riktig.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * ADVARSEL: Første gang du kjører ERDDAP™ v2.10, noen datasett basert på lokale datafiler vil laste **meget** sakte fordi ERDDAP™ må gjenskape sin database av filinformasjon. Etter den langsomme første reloaden vil de lastes raskt, som før. Vær tålmodig.
         
    * Ting du må gjøre:
        * Når du først kjører v2.10, noen datasett kan ikke lastes fordi ERDDAP™ Nå er det strengere med noen metadata. Som før, ERDDAP™ vil sende deg en daglig rapport når den først lastes opp. Det vil inkludere feilmeldingene for hvert av datasettene som ikke lastet. Les feilmeldingene for å finne ut problemene. I de fleste tilfeller må du bare gjøre en liten endring i datasettets metadata for å løse problemet.
             
        * I datasets.xml , Søk etter&lt; sourceName &gt;= (Legg merke til '=' tegn, som identifiserer en [Fast verdi sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) .. For de fleste ERDDAP™ De er sjeldne. Hvis noen av verdiene etter '=' er strenger (ikke tall) Nå må du legge inn strengen i doble sitater. For eksempel
Før:&lt; sourceName &gt;=KZ401&lt;/ sourceName &gt;
Etter:&lt; sourceName &gt;="KZ401"&lt;/ sourceName &gt;
             
        * NY: Det er en ny valgfri innstilling i setup.xml,&lt;standard AccessibleViaFiles&gt;, som angir standard&lt;tilgjengeligViaFiles&gt; for hvert av datasettene. Standard for denne nye taggen er falsk, som etterlikner det forrige ERDDAP™ atferd. Denne nedre nivåinnstillingen kan overstyres av et gitt datasetts&lt;tilgjengeligViaFiles&gt; innstilling.
            
FORSLAGT (Fordi det er brukere som ønsker dette) :)
Hvis du vil lage alle EDD... FraFiles datasett som er tilgjengelige via filsystemet, deretter
            
            1. Legg denne etiketten til config.xml-filen:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Valgfritt) Fjern alle
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
i datasets.xml Siden standarden nå er sant.
                 
        * Legg til \\_FillValue-attributter:
             ERDDAP™ brukes til å ha en standard-_FillValue for alle heltallsvariabler: den maksimale verdien av datatypen (f.eks. 127 for bytevariabler) .. Nå gjør det ikke. For å unngå å ha disse verdiene vist som dataverdier (ikke manglende verdier) , må du eksplisitt oppgi disse via \\_FillValue attributter. Fra nå av, hver gang du starter ERDDAP™ , det vil sende administratoren en e-post med en .csv-tabell med en liste over heltallskildevariabler som ikke har  \\_FillValue eller missing\\_value attributter, og de foreslåtte nye -_FillValue attributter. Se [Legg til _Fyll Verdiattributter](/docs/server-admin/datasets#add-_fillvalue-attributes) For mer informasjon og instruksjoner.
             
        * Hvis du kompilerer ERDDAP™ , du må endre klassestiparameteren på javac-kommandolinjene for å legge til en referanse til disse nye krukkene: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar ..
             
    * Endret: Tomcat 9 er nå den anbefalte versjonen av Tomcat for ERDDAP .. Den nyeste versjonen av Tomcat 8.5+ er også bra for nå. Vi rengjorde ERDDAP 's [Tomcat installasjonsanvisninger](/docs/server-admin/deploy-install#tomcat) ..
        
Den siste versjonen av Java 8 (ikke Java 9, 10, 11, ...) fra [AdoptOpenJDK](https://adoptopenjdk.net/) Fortsatt den anbefalte versjonen av Java for ERDDAP .. Java 8 har Long Term Support fra AdoptOpenJDK slik at det forblir trygt å bruke, men husk å få den nyeste versjonen av det periodisk av sikkerhetsgrunner.
        
    * NEW: Scriptkildenavn/avledede variabler i tabelldatasett
EDDTableFromFiles, EDDTableFromDatabase og EDDTableFromFileNames datasett kan nå inneholde uttrykk og skript i sourceName .. Dette lar deg lage nye variabler basert på eksisterende variabler i kildefilene. Beregningen for en gitt ny variabel utføres innen en rad av resultatene, gjentatte ganger for alle rader. For eksempel, å gjøre en lengdevariabel med verdier i området -180 - 180° fra en variabel med verdier i området 0 - 360°:
        &lt; sourceName &gt;=Math2.anglePM180 (rad.kolonneDobbelt ("lon") ) &lt;/ sourceName &gt;
For detaljer, se [SkriptkildeName](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
Takk til Bob Simons (Hvem som planla dette før ERDDAP™ v1.0 og endelig fant en måte å implementere det på) Kevin O'Brien, Roland Schweitzer, John Maurer og Apache JEXL-biblioteket for å gjøre den virkelig harde delen (Og gjør det bra) ..
         
    * NEW: Usignerte heltallsdatatyper (ubyte, ushort, uint, ulong) Nå støttes det. Legg merke til at mange filtyper (f.eks. .das, .dds, .nc 3) Ikke støtte alle disse nye datatypene. Se [Data Typedokumentasjon](/docs/server-admin/datasets#data-types) For detaljer om hvordan ERDDAP™ håndtere disse forskjellene. Merkelig, siden(OPeN)DAP, spesielt .dds respons, støtter ikke signert bytes, langer eller ulongs, kan det hende du ønsker å bruke ERDDAP .das og .das som sett i http .../erddap/ **info** /_ datasetID _.html nettside (For eksempel [ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) som du også kan komme i andre filtyper eller .nccsv Metadatarespons (For eksempel [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) Begge støtter alle datatyper i alle situasjoner.
        
ADVARSEL: For datasett som påvirkes av denne endringen, er det mulig at du vil se problemer med datasettet fordi dataene som ERDDAP™ Leser fra kilden kan være annerledes (For eksempel kan variabler som tidligere ble lest som signerte heltal nå leses som udefinerte heltal.) .. De resulterende problemene inkluderer: nye filer som ikke legges til datasettet, og/eller feil når du prøver å få tilgang til dataene. Hvis et datasett har problemer, det første å prøve er å [Sett en hard Flag](/docs/server-admin/additional-information#hard-flag) for datasettet. Hvis det ikke løser problemet, må du se på logg. txt for å se feilmeldingene, dykke inn i datasets.xml for datasettet, og/eller kanskje omkjøre genererDatasets.xml for datasettet.
Takket være netcdf-java 5.x (som tvang saken) Den kommende CF 1.9.
        
    * IMPROVED: Det er nå [bedre dokumentasjon/rådgivning](/docs/server-admin/datasets#s3-buckets) for hvordan du oppretter et datasett fra filer i AWS S3 bøtter. Takk til Micah Wengren.
         
    * Endret: Det er flere endringer relatert til "files" system.
        * Koden for å håndtere dette ble omskrevet for å være brukbar av flere klasser.
             
        * NEW: Brukerforespørsler om katalogoppføringer kan nå be om at svaret er en av standard tabelltyper ved å legge til ønsket filtype: .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , eller .xhtml ). For eksempel
             [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
Takket være Kyle Wilcox og Shane St Savage.
             
        * IMPROVED: Nå, Opprett Datasett Xml vil ikke inkludere en&lt;tilgjengeligViaFiles&gt; tag i utgangen. Antakelsen er at datasettet vil stole på verdien av det nye&lt;standardAccessibleViaFiles&gt; Merke i setup.xml. Se [tilgjengelig ViaFiles](/docs/server-admin/datasets#accessibleviafiles) ..
             
        * INPROVED: Ytterligere datasetttyper støtter nå tilgjengelige ViaFiles: EDDGrid SideBySide EDDGrid Aggregate EDDGrid fraErddap, EDDTableFraErddap, EDDGrid Fra EDDTable, EDDTableFrå EDDGrid , og EDDGrid Fra Etopo. For disse vil filene fra et gitt fjern-/barndatasett bare være tilgjengelige hvis både forelderen og fjern-/barndatasettet har tilgjengelig ViaFiles satt til sant (kanskje via&lt;standardAccessibleViaFiles&gt;). Takk til Damian Smyth og Rob Fuller.
             
        * VI anbefaler at alle relevante datasett er tilgjengelige via filsystemet.&lt;standardAccessibleViaFiles&gt; til sant i setup.xml fordi det er en gruppe brukere som dette er den foretrukne måten å få dataene til. Av andre grunner: "files" systemet gjør det enkelt for brukerne å se hvilke filer som er tilgjengelige og når de sist endret, og dermed gjøre det enkelt for en bruker å opprettholde sin egen kopi av hele datasettet. Hvis du generelt ikke vil gjøre datasett tilgjengelig via filsystemet, angi&lt;standardAccessibleViaFiles&gt; til falsk. I begge tilfeller bare bruk&lt;tilgjengeligViaFiles&gt; for få datasett som er unntak fra den generelle politikken som er fastsatt av&lt;standardAccessibleViaFiles&gt; (For eksempel når datasettet bruker .nc ml filer, som ikke er veldig nyttig for brukerne) ..
             
    * IMPROVED: Nå, hvis et kildedatasett har CF-nett-_making informasjon, generere Datasett Xml for nettbaserte datasett vil legge informasjonen til globalt&lt;addAtts&gt;, og informasjonen vil bli lagt til globalt&lt;sourceAtts&gt; hver gang data leses fra filen. Informasjonen vil vises i datasettets globale attributter som et sett av attributter med prefiksnettet\\_mapping\\_.
         
    * INPROVED: Støtte for grupper ved lesing .nc 4 (og til en viss grad i .hdf 5) Filer. Generelt, en ERDDAP™ datasettet vil bli konstruert fra variabler i en av filgruppene. Også generer datasett Xml for EDDGrid fra NcFiles og EDDGrid FraNcFiles Utpakket ber nå om en gruppe (f.eks. " for for alle/alle grupper, " someGroup " " someGroup/someSubGroup", eller " \\[ rot \\] " for bare rotgruppen) .. Takk til Charles Carleton og Jessica Hausman.
         
    * IMPROVED: Generer datasett Xml for EDDGrid fra NcFiles og EDDGrid FraNcFiles Utpakket støtter nå en valgfri "DimensionsCSV" parameter som lar deg angi kildenavnene på dimensjonene som du vil at dette datasettet skal brukes. Bruk " for å få variabler som bruker de mest dimensjoner, som før. Også, en relatert liten feil som oppstod med denne filtypen er nå løst. Takk til Sujal Manandhar.
         
    * BUG FIX: Genererer datasett Xml nå riktige lister "EDDTableFraJsonlCSVFiler" (ikke "EDDTABLEFraJsonlCSV") som et av EDDType-alternativene. Takk til Andy Ziegler.
         
    * IMPROVED: EDDGrid FraNcFiles Upakka nå standardiserer " enheter" attributter til standard/"kanonisk" utenheter (samme metode som enhetsomformeren) .. For eksempel "meter per second" , "meters/second" , "m.s^-1" , og "m s-1" Alle blir "m s-1" .. Takk til Andy Ziegler.
        
ADVARSEL: Det er mulig at dette vil forårsake problemer for noen eksisterende datasett (For eksempel forårsake nye filer å bli merket " dårlig") .. Hvis så, [Sett en hard Flag](/docs/server-admin/additional-information#hard-flag) for datasettet slik at alle kildefilene vil bli gjenlest med det nye systemet.
        
    * IMPROVED: Nå, en variabel&lt; sourceName &gt; kan angi en fast verdi på =NAN og variabelen kan ha en actual\\_range attributt som angir et definisjonsområde. Dette er noen ganger nyttig slik at et datasett (spesielt et EDDTableFromFileNames datasett) kan ha dummy variabel (s)   (f.eks. breddegrad, lengdegrad, tid) med faste verdier av NaN, men med en gyldig actual\\_range   (som satt av attributten) .. Deretter kan en bruker i avansert søk søke etter datasett som har data i en bestemt breddegrad, lengdegrad, tidsintervall og dette datasettet vil kunne si at det har relevante data (Selv om alle de faktiske rekkene av data vil vise NaN) .. Se [Fast verdidokumentasjon](/docs/server-admin/datasets#fixed-value-sourcenames) ..
Takk til Mathew Biddle.
         
    * NEW: Nå, den datasets.xml bit for et EDDTableFraAsciiFiler eller EDDTableFraColumnarAsciiFiles datasett kan inneholde en tag som forteller ERDDAP™ å ignorere alle linjene øverst i filen opp til og med linjen som passer til det angitte regulære uttrykket. For eksempel
        &lt;Hopp overHeaderToRegex&gt;\\\*\\\*\\\*Ende på Header.\\*&lt;/SkipHeaderToRegex&gt;
vil ignorere alle linjer opp til og inkludert en linje som starter med -\\*\\* \\* HØJERENS END". Se [&lt;Hopp overHeaderToRegex&gt; dokumentasjon] (/docs/server-admin/datasett#skipheadertoregex) ..
Takk til Eli Hunter
         
    * NEW: Nå, den datasets.xml bit for et EDDTableFraAsciiFiler eller EDDTableFraColumnarAsciiFilesdatasett kan inneholde en tag som forteller ERDDAP™ å ignorere alle linjene i filen som samsvarer med det angitte regulære uttrykket. For eksempel
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

vil hoppe over alle linjer som starter med "#". Se [&lt;SkipLinesRegex&gt; dokumentasjon] (/docs/server-admin/datasett#skiplinesregex) ..
Takk til Eli Hunter.
         
    * Ny: The datasets.xml bit for alle EDDTable-datasett kan nå inkludere & add Variabler Hvor (_tildelingNamesCSV_) .. Hvis det gjør det, ERDDAP™ vil legge til en widget for hver av de angitte egenskapene Navn på datasettets datatilgangsskjema (.html nettside) å gjøre det enkelt for brukere å legge til og legge til Variabler Hvor (_Tildeling Navn, attributt Verdi_) til forespørselen.
Se [& Legg til Variabler Når dokumentasjon](/docs/server-admin/datasets#addvariableswhere) ..
Takket være Aurelie Briand, et al.
         
    * Ny Tredjepartsverktøy: ERDDAP -lint
         ERDDAP -lint er et program fra Rob Fuller og Adam Leadbetter fra Irish Marine Institute som du kan bruke til å forbedre metadataene til din ERDDAP™ Datasett. ERDDAP -lint-inneholder regler og en enkel statisk webapplikasjon for å kjøre noen verifikasjonstester mot din ERDDAP™ server. Alle testene kjører i nettleseren." Som [Unix/Linux lint verktøy](https://en.wikipedia.org/wiki/Lint_(software) ), kan du redigere eksisterende regler eller legge til nye regler. Se [ ERDDAP -lint](https://github.com/IrishMarineInstitute/erddap-lint) For mer informasjon.
        
Dette verktøyet er spesielt nyttig for datasett som du opprettet for en stund siden og nå ønsker å få oppdaterte metadatainnstillinger. For eksempel tidlige versjoner av Genererer Datasett Xml gjorde ingen innsats i å skape global creator\\_name , creator\\_email , skaper\\_type, eller creator\\_url Metadata. Du kan bruke ERDDAP -lent å identifisere datasett som mangler disse metadata attributtene.
        
Takk til Rob og Adam for å lage dette verktøyet og gjøre det tilgjengelig for ERDDAP™ Samfunn.
        
    * NEW: Nå er det greit hvis noen av filene i en EDDGrid FraFiles datasett har ikke alle datasettets variabler. Filene vil bli inkludert som om de hadde variabler (med alle manglende verdier) ..
Takk til Dale Robinson og Doug Latornell.
         
    * NEW: Det er ny bruksstatistikk i loggfilen og Daily Report for å hjelpe administratorer å identifisere brukerne som forårsaker minneproblemer. Statistikken heter "OutOfMemory (Vektorstørrelse) ", "OutOfMemory (For stor) ", og "OutOfMemory (Måten for stor)  ".. De viser IP-adresser til brukerne som gjorde forespørsler i disse kategoriene og antall forespørsler de gjorde. Hvis det ikke var noen problemer, vil disse statistikkene ikke vises. "OutOfMemory (Vektorstørrelse) " og OutOutMemory (Måten for stor) Forespørsler er vanligvis ikke et problem fordi forespørselene var så store at ERDDAP™ Fang dem raskt og returnerte en feilmelding. OutOfMemory (For stor) Forespørsler er farligere fordi ERDDAP™ gjorde en viss innsats før det innså at det ikke var nok minne for tiden tilgjengelig til å håndtere forespørselen (Selv om problemet kan være andre forespørsler rett før disse forespørselene) ..
        
Det er også nye statistikker som heter "Stor forespørsel, IP-adresse" som viser IP-adresser til brukerne som gjorde store forespørsler (for tiden, gitt .nc filer &gt; 1GB) ..
        
Også tidsserietabellen på status.html siden inneholder nå en "memFail" kolonne som viser antall forespørsler som mislyktes med "OutOfMemory (For stor) " feil siden de siste store lastdatasettene. Et annet tall enn 0 her er i det minste noe grunn til bekymring.
Takk til Bob Simons.
        
    * Ny versjon av Hyrax Viser kataloglister annerledes enn tidligere. ERDDAP™ kan nå lese gamle og nye kataloglister.
         
    * NEW: Datasett reloads og brukerresponser som tar &gt; 10 sekunder å avslutte (Vellykket eller mislykket) er merket med " (&gt;10s&#33;)  ".. Således kan du søke i log.txt-filen for å finne datasettene som var langsomme å laste på nytt eller forespørselsnummer på forespørsler som var langsomme å fullføre. Du kan så se høyere ut i log.txt-filen for å se hva datasett-problemet var eller hva brukerforespørselen var og hvem den var fra. Disse sakte datasett belastninger og brukerforespørsler er noen ganger skatt på ERDDAP .. Så å vite mer om disse forespørsler kan hjelpe deg å identifisere og løse problemer.
    * IMPROVED: Når du validerer et CF DSG-datasett, ERDDAP™ nå sikrer at variabler med cf-_role attributter er i den tilsvarende cdm-____variables-listen og ikke er i andre cdm-______variables-lister. For eksempel, hvis et tidsserierProfildatasett har en "station\\_id" variabel som har cf__role=timeseries\\_id-attributt, så "station\\_id" må være i cf\\_timeseries__variables-listen, men må ikke være i cf\\_profil\\_variables-listen.
Takk til Micah Wengren.
         
    * IMPROVED: 'Simplify' er nå raskere, bruker mindre minne, og kan returnere LongArray. Takk til Unidata ..
         
    * IMPROVED: Rask restart er nå betydelig raskere for EDDTableFra (nc-relatert) Filer (bortsett fra EDDTableFromNcCFFiler og EDDTableFromInvalidCRAFiler) for å lage Forventet (og et annet sted) Nå bare leser prøvefilens metadata i stedet for å lese alle dataene. Takk til Jessica Austin.
         
    * IMPROVED: Det er nå støtte for tidsstrenger med presisjon større enn to-the-milli sekund hvis de ekstra sifferene er alle 0, f.eks. "2020-05-22T01:02:03.456000000Z". Takk til Yibo Jiang.
         
    * IMPROVED: Generer DatasetsXmls EDD.suggest METOName brukes til å fjerne '(' og alt etter. Nå fjerner den (.\\*Bare hvis det er slutten på sourceName .. Nå fjerner den også \\[ ..\\* \\] Bare hvis det er slutten på sourceName .. Takk til Julien Paul.
         
    * IMPROVED: Generer datasett Xml gjør nå variabelen destinationName S unikt ved å legge til \\_2, \\_3, ..., etter behov. Takk til Julien Paul.
         
    * IMPROVED: Når Calendar2.parseDateTime tolker dd, hh eller HH, kan det første 'siffer' nå være et mellomrom.
    * Kunnskapelig problem: Begynner med ERDDAP™ 2.10, .nc ml filer som prøver å endre en attributt, ikke endre attributt. Dette er en kjent feil i netcdf-java som jeg har rapportert og de sier vil bli fikset i neste utgivelse av netcdf-java.
         
    * BROKEN LINKS FIX: Jeg har laget et riktig system for testing for ødelagte lenker i ERDDAP™ Nettsider, så det bør nå være svært få ødelagte lenker (i det minste som av hver utgivelsesdato - nye ødelagte lenker oppstår ofte) ..
         
    * BUG FIX: EDDTableFromHttpGet mislyktes med visse typer forespørsler. Nå gjør det ikke. Takk til Emma på BODC.
         
    * BUG FIX: For å håndtere noen forespørsler gjorde EDDTable en midlertidig fil for hver etterspurt variabel, med et filnavn som endte i variabelens navn. Hvis variabelens navn også var en type kompresjon (f.eks.) , ERDDAP ville prøve (og mislykkes) å dekomprimere den midlertidige filen. Nå slutter de midlertidige filnavnene i ".temp". Takk til Mathew Biddle.
         
    * BUG FIX: Genererer DatasettXml og Calendar2.convertTil Java Datotid Format er nå mye mindre sannsynlig å gjøre en feil endring når du prøver å fikse et eventuelt ugyldig datotidsformat. Merkelig nok vil ingen auto-sugget datoTidsformat endres. Takk til Mathew Biddle.
         
    * BUG FIX: Hvis det oppstod en feil under innhold fra en ekstern URL, og hvis feilStream-innholdet er komprimert, ERDDAP™ Dekomprimerer nå feilmeldingen riktig. Takk til Bob Simons.
         
    * BUG FIX:&lt;abonnentToRemoteErddapDataset&gt; ble ikke brukt når EDD... FraErddap-datasett var et barnedatasett. Nå er det det. Takk til Chris Romsos.
         
    * BUG FIX: Genererer datasett Xml tror ikke lenger et kildevariabelt navn som starter med "latin" kan være breddegrad. Takk til Vincent Luzzo.
         
    * BUG FIX: Nå, en OutOfMemoryError mens du leser en datafil mens du behandler en brukers forespørsel er ikke en grunn til å legge til en fil i BadFiles-listen. Takk til Bob Simons.
         

## Versjon 2.02{#version-202} 
 (utgitt 2019-08-21) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * NEW: Det er nå to måter å søke etter datasett på flere ERDDAP S. De fungerer litt annerledes og har ulike grensesnitt og alternativer.
        
        *    [SøkMultiple ERDDAP S.html](/SearchMultipleERDDAPs.html) fra Bob Simons/ NOAA   NMFS   SWFSC   ERD ..
        *    [ http://erddap.com ](http://erddap.com) Rob Fuller/The Marine Institute of Ireland.
        
Takk til Tylar Murray for den originale forespørselen.
         
    * IMPROVED: en forespørsel til "files" systemet for å laste ned en fil som faktisk er på et eksternt nettsted (f.eks. AWS S3) nå fører til en omdirigering, så brukeren faktisk vil laste ned data fra kilden, i stedet for å bruke ERDDAP™ Som mellommann. Takk til Andy Ziegler og NOAA ..
         
    * NEW: Som et eksempel på de nye AWS S3-relaterte funksjonene, og for å gjøre det lettere for alle å bla gjennom og laste ned filer fra offentlige AWS S3-bøtter, har vi opprettet
         [~110 prøvedatasett](https://registry.opendata.aws/) som tillater alle å se på innholdet i nesten alle
         [AWS S3 Åpne databøtter](https://registry.opendata.aws/) .. Hvis du klikker på "files" link for noen av disse prøve datasettene, kan du bla gjennom katalogtreet og filene i den S3 bøtte. På grunn av måten disse datasettene fungerer på, er disse kataloglistene alltid helt oppdaterte fordi ERDDAP™ Få dem på flugen. Hvis du klikker ned katalogtreet til et faktisk filnamn og klikker på filnamnet, ERDDAP™ vil omdirigere forespørselen din til AWS S3 slik at du kan laste ned filen direkte fra AWS. ERDDAP™ administratorer kan
         [lese veibeskrivelse for hvordan du gjør dette for andre S3 bøtter](/docs/server-admin/datasets#working-with-aws-s3-files) .. Takk til Andy Ziegler og NOAA ..
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Ting du trenger å gjøre: Ingen
         
    * IMPROVED: ERDDAP Fremgangsmåte for lagring av rekker av strenger (StringArray) Nå er mye mer minneeffektivt. Streng Arrays brukes i hele ERDDAP™ , spesielt når du leser tabell ASCII-datafiler. Andre endringer gjør også lesing CSV/TSV/SSV ASCII, kolonnear ASCII og jsonlCSV-tabelldatafiler raskere og mye mer minneeffektive. Resultatet er: for en 764 MB ASCII datatestfil (men komprimert til en 52MB .gz fil) med 3,503 266 rader og 33 kolonner, den maksimale minnebruk gikk fra 10 GB ned til 0,6 GB (på toppen) .. Tid til å lese det gikk fra ~ 7 minutter (men varierer mye med hvor mye fysisk minne som er i datamaskinen) ned til ~36 sekunder (Inkludert 10s for å forenkle () som kun brukes av Genererer Datasets Xml) .. Mange andre steder i ERDDAP™ vil dra nytte av denne økte minneeffektiviteten. Takk til Tylar Murray og Mathew Biddle.
        
Jeg har utforsket en annen løsning (lagre strenger i StringArray som UTF-8-kodede byte tabeller) .. Det reduserer minnebruken en annen ~ 33%, men til kostnaden av ~ 33% avtar. Sammenlignet med systemet som nå brukes, virket det som en dårlig handel off. Det er lettere å gi en datamaskin mer minne (Kjøp mer minne for ~ $ 200) enn å gjøre det raskere (Kjøp en helt ny datamaskin) ..
        
Hvis det er praktisk, er det fortsatt en god ide å dele store tabulær datafiler i flere mindre filer basert på noen kriterier som stationID og/eller tid. ERDDAP™ vil ofte bare måtte åpne en av de små filene som svar på en brukers forespørsel, og dermed kunne svare mye raskere.
        
    * IMPROVED: Det er nå [ ERDDAP™ AWS S3-dokumentasjon](/docs/server-admin/datasets#working-with-aws-s3-files) som beskriver hvordan man får ERDDAP™ å jobbe med datafiler i AWS S3 bøtter.
Også, ERDDAP™ Nå bruker nye funksjoner i AWS S3 Java API.
Også, ERDDAP™ Nå lar AWS S3-adresser inkludere ytterligere tegn (periode, bindestrek, understrek) I bøttenavn.
Også, ERDDAP™ nå krever at AWS S3 bøtteadresser identifiseres på en bestemt måte:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
hvor prefikset er valgfritt.
Takk til Andy Ziegler og NOAA ..
         
    * IMPROVED: Generer datasett Xml behandler nå mer vanlig missing\\_value s stand-ins som manglende verdier og det er mer sannsynlig å konvertere en kolonne til en numerisk datatype. Også, PrimitiveArray.simplify () nå logger hvilken bestemt dataverdi forårsaket det til å behandle en gitt kolonne som en kolonne av strenger. Takk til Mathew Biddle.
         
    * IMPROVED:&lt;ForespørselBlacklist&gt; støtter nå.\\*..\\*  (eller:\\*:)\\*for IPv6) i slutten av IP-adresser slik at du kan blacklist en større del av IP-adresser, for eksempel 110.52.\\*..\\*  (Kina Unicom Tianjin) .. Se dokumentasjonen for [&lt;forespørselBlacklist&gt;] (/docs/server-admin/datasett#requestblacklist) Takk til China Unicom og China Telecom.
         
    * IMPROVED: Hvis et datasetts kilde ikke angir en "institution" attributt, Generer datasett Xml og lastDataset får det nå fra en "creator\\_institution" attributt (Hvis tilgjengelig) .. Takk til Micah Wengren.
         
    * BUG FIX: standardisering Det som ikke alltid ble brukt på ASCII-datafiler.
Også EDDTable håndterte ikke riktig grenser for tidsverdier når kilden hadde strenge tidsverdier og standardisering Hva som ble brukt.
Takket være Paloma de la Vallee.
        
Jeg oppgav ikke tidligere: Du bør bare bruke standardisering Hvilke funksjoner når du faktisk trenger dem (For eksempel når ulike kildefiler lagrer tidsverdier på forskjellige måter) fordi noen forespørsler til datasett som bruker standardisering Hva vil bli behandlet litt langsommere.
        
    * BUG FIX: En feil i kode som brukes av EDDGrid FromNcFiles forårsaket at det mislykkes med .nc 4 og .hdf 5 filer som har " lang" (int64) Variabler. Nå er det fikset. Takk til Friedemann Wobus.
         
    * BUG FIX: Små endringer i ISO 19115-filer for å gjøre en annen validerer lykkelig. Takk til Chris MacDermaid og Anna Milan.
         

## Versjon 2.01{#version-201} 
 (utgitt 2019-07-02) 

*    **Nye funksjoner og endringer (for brukere) :)** 
    * Ingen.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * BUG FIX: En feil i koden som genererer datatilgangsskjemaet for tabledap datasett førte til at nettsiden var tom for noen datasett. Jeg forbedret også håndteringen av uventede feil på alle HTML-sider slik at de vil (vanligvis) Vis en feilmelding. Takk til Marco Alba.
    * IMPROVED: Generer datasett Xml skriver ikke lenger ut en lang advarsel øverst på utgangen. I stedet kan du se [Redigerer Oppretter Datasett Xml Output](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) .. Takk til Steven Baum.
    * IMPROVED: Generer datasett Xml gjør nå litt forskjellige anbefalinger i forskjellige situasjoner for&lt;OppdaterEveryNMillis&gt; for EDD...Fra...Files datasett. Også generer datasett Xml avviser nå det opprinnelige systemekstract" systemet for EDDTableFromFiles datasett.

## Versjon 2.00{#version-200} 
 (utgitt 2019-06-26) 

*    ** ERDDAP™ V2.00 er endelig her&#33; Ja&#33;**   
     
    * Vi beklager den lange forsinkelsen som trengs for å fullføre denne versjonen.
Takk for tålmodigheten.
         
    * Den gode nyheten er at den ekstra tiden ble brukt til å legge til mer av funksjonene som brukerne hadde bedt om. Den dårlige nyheten er at selv med forsinkelsen, ikke alle etterspurte funksjoner ble lagt til. Vi beklager, men det virket viktigere å få ut denne utgivelsen enn å forsinke mer (For alltid?) Legg hele tiden til nye funksjoner. Vi lover å komme tilbake til hyppigere utgivelser i fremtiden.
         
    * -Version 2? Er det store endringer og uforutsette-
Store nye funksjoner? Ja.
Store uforenlige eller endringer for administratorer eller brukere? Nei.
Vi hoppet fra v1.82 til v2.00:
        * Til dels å feire 10 år (nå 11) Siden den første offentlige utgivelsen av ERDDAP™   (v1.00 på 2008-05-06, som utover så bemerkelsesverdig ut som v2.00) .. På den tiden, ERDDAP™ har gått fra en installasjon til nesten 100 installasjoner i minst 12 land (Australia, Belgia, Canada, Frankrike, India, Irland, Italia, Sør-Afrika, Spania, Thailand, Storbritannia, USA) ..
        * delvis å markere et stort tillegg i en helt ny retning: ERDDAP™ Nå har et datainntakssystem å gå med eksisterende dataserver tjenester (se [EDDTableFraHttpGet](#eddtablefromhttpget) ) ,
        * og delvis fordi det ikke var et stort hopp fra 1,82 til 2,00 numerisk, så dette virket som riktig tid.
             
    * Den andre gode nyheten er at det nå er to andre grupper som bidrar til ERDDAP™   (I denne versjonen og med indikasjoner vil de fortsette) Rob Fuller og Adam Leadbetter fra Irlands marineinstitutt og Roland Schweitzer fra PMEL og Weathertop Consulting. Tusen takk. Det er sant at de jobber med prosjekter etter eget valg, men det er den klassiske åpen kildekodeutviklingsmodellen - grupper bidrar med kode for de funksjonene som de mest ønsker å se lagt til. Den ekstra fordelen for bidragsytere: de får bruke de nye funksjonene så snart de er ferdige; de trenger ikke å vente på neste utgivelse av ERDDAP .. Din gruppe er velkommen til å bidra også&#33; Se [ ERDDAP™ Programmers guide](/docs/contributing/programmer-guide) ..
         
    * Vi håper du liker ERDDAP™ v2.00. Vi ser frem til de neste 10 årene av ERDDAP™ utvikling og stadig mer bruk i hele verden.
         
*    **Nye funksjoner og endringer (for brukere) :)**   
     
    * Nyhet: orderByMean filter
for tabledap Datasett vil beregne midlene for de angitte gruppene. Alle sammen orderBy alternativer støtter nå en ekstra måte å definere grupper på: _numeriskVariabel \\[ /nummer \\[ timeUnites \\]  \\[ :offset \\]  \\] _, f.eks. tid/dag eller dybde/10:5. For eksempel stationID ,tid, vannTemp& orderByMean  (" stationID ,tid/dag") Ville sortere resultatene fra stationID og tid, deretter beregne og returnere gjennomsnittet av vannTemp for hver stationID For hver dag. Disse er utrolig nyttige og kraftige nye funksjoner. Den nye koden for disse funksjonene og endringene i den gamle koden ble bidratt av Rob Fuller og Adam Leadbetter fra Irlands Marine Institute og sendt via Git. Takk, Rob og Adam&#33;
         
    * NEW: utdatafiltype for tabelldatasett: [.data Tabell](https://developers.google.com/chart/interactive/docs/reference#dataparam) ,
en JSON-fil formatert til bruk med den Google Visualization klientbibliotek ( Google Charts ) .. Koden til dette ble bidratt av Roland Schweitzer og sendt inn via Git. Takk, Roland&#33;
         
    * NEW: utdatafiltype for tabelldatasett: [ .jsonlCSV1 ](https://jsonlines.org/examples/) ,
som er som den eksisterende .jsonlCSV alternativet, men med kolonnenavn på den første linjen. Takk til Eugene Burger.
         
    * NEW: Hvis administratoren aktiverer det, kan brukerne nå logge på med sine [ORCID](https://orcid.org) konto.
Det er et OAuth 2.0-autentiseringssystem, som i likhet med Google-autentisering. ORCID er mye brukt av forskere til å identifisere seg selv unikt. ORCID-kontoer er gratis og har ikke personvernproblemene som Google-kontoer har. Se ERDDAP 's [Orcid autentiseringsinstruksjoner](/docs/server-admin/additional-information#orcid) .. Takket være BCO-DMO (Adam Shepard, Danie Kinkade, etc.) ..
         
    * NEW: En ny URL-omformer konverterer utdaterte URL-adresser til oppdaterte URL-adresser.
Se .../erddap/convert/urls.html på alle ERDDAP™ installasjon, f.eks.
         [denne linken til konverteren i ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) .. Dette bør være nyttig for dataansvarlige. Dette brukes også internt av GenerationDatasetsXml. Takk til Bob Simons og Sharon Mesick.
         
    * IMPROVED: Den [Tidskonverter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) nå har alternativer til å konvertere en felles strengtid til en ISO8601 strengtid, eller konvertere en UDUNITS - som tidsenheter streng i en riktig UDUNITS tidsenhetsstreng. Dette bør også være nyttig for ERDDAP™ administratorer som trenger å vite hvilket format som skal angis for attributten " enheter" for strengtidsvariabler. Dette brukes også internt av GenerererDatasetsXml og standardisert hvilken funksjon i EDDTableFromFiles. Takk til Bob Simons.
         
    * Ny: The [Enheter Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) har en ny standardisert UD Units-alternativ.
For eksempel, "deg\\_C/m" og " grader\\_C meter1" konverteres begge til
" grader\\_C m-1". Denne funksjonen brukes også av standardize. Takk til Bob Simons.
         
    * NY: For grafer (andre enn overflategrafer) på griddaps og tabledap 's Make A Graph websider, når x-aksen ikke er en tidsakse, hvis bare en undergruppe av x-aksen variabelens område er synlig, er det nå knapper over grafen for å flytte X-aksen venstre eller høyre. Takket være Carrie Wall Bell / Hydrofone prosjektet.
         
    * NEW: For grafer kan X og/eller Y-aksen nå bruke en loggskala.
Brukere kan styre Y-akseskalaen via en ny nedtrekksmodul på rutenettet og tabledap Lag en grafisk nettsider. Se [.xRange og . yRange dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) .. Takket være Carrie Wall Bell / Hydrofone prosjektet.
         
    * IMPROVED: ERDDAP™ nå bedre bruk av ulike HTTP-feilkoder og returnerer nå en(OPeN)DAPv2.0-formatert feilmelding nyttelast. Se [detaljer](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) .. Takk til Antoine Queric og Aurelie Briand.
         
    * IMPROVED: Ikke bruk Netcdf-java/c eller andre programvareverktøy til å koble til .nc eller .hdf filer som betjenes av ERDDAP / files/ system som om de var lokale filer. ERDDAP™ Nå avviser disse forespørselene. Det er forferdelig ineffektivt og ofte forårsaker andre problemer. I stedet:
        
        * Bruk(OPeN)DAPklientprogramvare å koble til ERDDAP 's DAP Tjenester for datasettet (som har /griddap/ eller / tabledap / i URL) .. Det er det som DAP For og gjør det bra.
        * Eller bruk datasettets datatilgangsskjema for å be om en undergruppe av data.
        * Eller, hvis du trenger hele filen eller gjentatt tilgang over en lang periode, bruk curl , wget , eller nettleseren din for å laste ned hele filen, og deretter få tilgang til data fra din lokale kopi av filen.
        
          
         
    * IMPROVED: På ERDDAP™ Hjemmeside, Fulltekstsøk er nå over -Se en liste over alle datasett - siden det er det beste utgangspunktet for de fleste brukere. Takk til Didier Mallarino og Maurice Libes.
         
    * IMPROVED: På DataProviderForm3.html Det er nå nedtrekkslister av felles standard\\_name S. Takk til noen på IOOS DMAC-møtet.
         
    * IMPROVED: På / filer/ nettsider, det er nå en lenke til den nye " Hva kan jeg gjøre med disse filene?" delen av / filer/dokumentasjonen. Denne delen beskriver ulike filtyper og gir forslag til hvordan du fungerer med dem. Takk til Maurice Libes.
         
    * IMPROVED: Nesten alle forespørsler til ERDDAP™ Det bør være litt raskere og noen ganger mye raskere.
         
    * BUG FIX: Under noen omstendigheter, når et EDDTable datasett lagret data i noen typer .nc Filer, den globale "id"-attributten ble satt til filens foreslåtte navn, som inkluderer en hash for å gjøre det unikt for den forespørselen. Nå - id - er riktig igjen uendret (dersom angitt) eller satt til datasettets datasetID   (hvis ikke spesifisert) .. Takk til John Maurer.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:**   
     
    * Å gjøre: Denne utgivelsen vil ta litt tid og arbeid fra deg. Vær tålmodig og planlegg å ta noen timer for å gjøre de nødvendige endringene og noen timer til å eksperimentere med nye funksjoner.
         
    * TO DO: For sikkerhet, lage en sikkerhetskopi av gjeldende installasjon.xml og datasets.xml filer slik at du kan gå tilbake til dem i det usannsynlige tilfellet der du må gå tilbake til ERDDAP™ v1.82.
         
    * Å gjøre: Den anbefalte Java er nå AdoptOpenJDKs OpenJDK 8 (LTS) + HotSpot.
Dette er en åpen kilde variant av Java som ikke har noen restriksjoner på bruken (I motsetning til Oracle 's Java distribusjon) .. Det kommer fra Oracle 's Java på gang, med Oracle Velsignet. Av sikkerhetsgrunner er det viktig å holde Java versjon oppdatert. Se ERDDAP 's [ Java installasjonsinstruksjoner](/docs/server-admin/deploy-install#java) ..
         
    * Å gjøre: AdoptOpenJDK Java trenger et lite tillegg til Tomcat-installasjonen: se [Resources Cache instruksjoner](/docs/server-admin/deploy-install#contentxml) .. Jeg tror at dette er en erstatning for -XX:MaxPermSize innstillingen, som (Adopt) OpenJDK støtter ikke lenger.
         
    * Å gjøre: Den nye standarden og anbefaler&lt;fontFamily&gt; innstilling i config.xml er
DejaVu Sans som er bygget inn i AdoptOpenJDKs Java .. Se
         [reviderte instruksjoner for installasjon av skrift](/docs/server-admin/deploy-install#fonts) ..
         
    * TO DO: Mange tagger beveger seg fra setup.xml til datasets.xml .. Fordelen er at du kan endre deres verdier mens ERDDAP™ Kjører uten å starte på nytt ERDDAP .. Du kan enkelt endre&lt;startBodyHtml5&gt; å vise en midlertidig melding på ERDDAP™ hjemmeside (f.eks. " Sjekk ut det nye JPL MUR SST v4.1 datasettet ..." eller "Dette ERDDAP™ vil være offline for vedlikehold 2019-05-08T17:00:00 PDT gjennom 2019-05-08T20:00:00 PDT.") .. Hvis/når du endrer disse taggene i datasets.xml Endringene vil tre i kraft neste gang ERDDAP™ Leser datasets.xml ..
         
        
        1. Kopier dette innholdet til din datasets.xml fil (noen som helst i nærheten av starten av filen, etter&lt;erddapDatasett&gt;:
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

        2. En-for-en, kopier verdien (hvis noen) for hver av disse taggene fra config.xml-filen i den nye etiketten som du nettopp limt inn (over) i datasets.xml .. Hvis du hadde brukt en verdi på 30 til&lt;cacheMinutes&gt; i setup.xml, bør du kopiere den verdien til den nye&lt;cacheMinutes&gt; tag in datasets.xml   (Selv om verdien er den samme som den nye standardverdien, er det best å bare forlate merket i datasets.xml tom) ..
            
Hvis din verdi er forskjellig fra den nye foreslåtte standarden (andre enn for&lt;startBodyHtml5&gt; og&lt;ShortDescriptionHtml&gt;, som er nyttig for å tilpasse din ERDDAP™ installasjon), vennligst vurdere å bytte til de nye standardverdiene. Dette gjelder særlig&lt;DelvisRequestMaxbytes&gt; og&lt;partiellRequestMaxCells&gt;, der standard/sugget verdi har endret seg betydelig gjennom årene.
            
Når du har kopiert hver verdi, sletter du merket og dens beskrivelse fra config.xml. Det er bedre å ha disse taggene i datasets.xml .. Det er nå bedre beskrivelser i [setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) ..
            
        
En spørring av det nye systemet er at den aller første nettsiden når du starter opp ERDDAP vil være standard ERDDAP™ Nettside. Hver etterfølgende nettside vil bruke ...Html-innholdet du angir i datasets.xml ..
        
    * ADVARSEL: Første gang du kjører ERDDAP™ v2.0, datasett basert på lokale datafiler vil laste **meget** sakte fordi ERDDAP™ Må gjenskape sin database over filer i et litt annet format. Etter den langsomme første reloaden vil de lastes raskt, som før. Vær tålmodig.
         
#### EDDTableFraHttpGet{#eddtablefromhttpget} 
    *    [STOR NY FEATURE: EDDTABLEFromHttpGet](#eddtablefromhttpget)   
Inntil nå, ERDDAP™ Bare lese data og gjorde det tilgjengelig for brukerne. Nå, ERDDAP™ har et enkelt og effektivt system for å innta sanntidsdata fra sensorer. Blant andre funksjoner tilbyr dette datasettet finkornet versjon: det husker alle endringer gjort i datasettet, når det ble gjort, og av hvem. Vanligvis vil brukerne bare ha den nyeste versjonen av datasettet, med alle endringer som brukes. Men det er mulighet for brukere å be om data fra datasettet som det var til enhver tid. Dette bidrar til reproducerbar vitenskap. I motsetning til de fleste andre datasett i nær-real-tid, er disse datasettene kvalifiserte for [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) .. fordi de møter DOI krav om at datasettet ikke endres, bortsett fra ved sammenstilling. Se [EDDTableFraHttpGet](/docs/server-admin/datasets#eddtablefromhttpget) .. Takk til OOI (For lenge siden og nå) for å snakke om behovet for dette og Eugene Burger for påminnelsen om å jobbe på det som er viktig.
         
    * Stor nyfeatur: ERDDAP™ kan nå betjene data direkte fra eksternt komprimerte datafiler, inkludert .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , eller .Z. Datasett kan inneholde en blanding av eksternt komprimerte filer (Kanskje de eldre datafilene?) og ikke-eksternt komprimerte filer, og du kan komprimere/dekompressere en fil når som helst.
        
Dette fungerer bra&#33;
I de fleste tilfeller er nedgangen relatert til dekomprimering av filene mindre. Vi oppfordrer deg til å prøve dette, spesielt for datasett og/eller datafiler som ofte brukes.
        
Dette kan spare deg $ 30 000 eller mer&#33;
Dette er en av få ERDDAP™ funksjoner som kan spare deg mye penger -- hvis du komprimerer mange datafiler, trenger du langt færre RAIDs/harddisker for å lagre dataene, eller omvendt, kan du betjene langt mer data (Opptil 10x) Med RAIDs du allerede har. Hvis denne funksjonen sparer deg fra å kjøpe en annen RAID, så har det spart deg rundt $ 30 000.
        
Se [Ekstern komprimert fildokumentasjon](/docs/server-admin/datasets#externally-compressed-files) .. Takket være Benoit Perrimond og Paloma de la Vallee.
        
    * Stor nyfeatur: Alle EDDGrid FraFiler og alle EDDTableFraFiles datasett støtter en&lt;cacheFromUrl&gt; tag og a&lt;cacheSizeGB&gt; tag. Hvis cacheSizeGB ikke er spesifisert, vil dette laste ned og vedlikeholde en fullstendig kopi av et eksternt datasetts filer. Hvis cachestørrelseGB er spesifisert og er &gt;0, vil dette laste ned filer fra det eksterne datasettet, etter behov, til en lokal cache med en begrenset størrelse, som er nyttig når du jobber med skybasert (f.eks. S3) Datafiler. Se [mellomlager Fra Url dokumentasjon](/docs/server-admin/datasets#cachefromurl) for detaljer. Takk til Bob Simons og Roy Mendelssohn (som i årevis har skrevet skript til å håndtere lokale kopier av eksterne datasettfiler) , Lloyd Cotten, Eugene Burger, Conor Delaney (Da han var på Amazon Web Services) og Google Cloud Platform.
         
    * NEW: Den nye EDDTableFromJsonlCSV klasse kan lese tabelldata fra
         [JSON Linjer CSV-filer](https://jsonlines.org/examples/)   (Bedre enn CSV) .. Takk til folket på Marine Institute of Ireland for å fortelle meg om dette formatet og til Eugene Burger og PMEL for forespørselen om å støtte det som en inngangstype.
         
    * NY: Alle EDDGrid og alle EDDTableFromFiles datasett støtter en&lt;nThreads&gt; innstilling, som forteller ERDDAP™ Hvor mange tråder du skal bruke når du svarer på en forespørsel. Se [nThreads dokumentasjon](/docs/server-admin/datasets#nthreads) for detaljer. Takket være Rob Bochelek fra Axiom Data Science, Eugene Burger, Conor Delaney (Da han var på Amazon Web Services) Google Cloud Platform.
         
    * NY standardisering Hva for alle EDDTableFraFiles underklasser -
Tidligere, hvis for en gitt variabel, verdiene av viktige attributter (f.eks. scale\\_factor , add\\_offset , missing\\_value ,  \\_FillValue, enheter) var ikke konsekvent, EDDTableFromFiles ville velge én verdi for hver attributt som er " gyldig" og markere filer med andre attributtverdier som "Bad-filer". Nå er det et system å standardisere filene så snart EDDTableFromFiles leser filene. Se [EDDTableFromFiles standardisering Hva](/docs/server-admin/datasets#standardizewhat) .. En av ERDDAP Hovedmålene er å gjøre datafiler og datasett tilgjengelige på en konsekvent måte. standardisering Hva er et viktig nytt verktøy for å gjøre det til en realitet. Takket være Marco Alba, Margaret O'Brien (Andre EML-brukere) , BCO-DMO og InPort-brukere.
         
    * NYE EDDTableFromInvalidCRAFiles lar deg lage et datasett fra en samling av NetCDF   (v3 eller v4)   .nc filer som bruker en spesifikk, ugyldig variant av CF DSG Contigous Tagged Array (CRA) Filer. Prøvefiler for denne type datasett kan finnes på https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/   \\[ 2020-10-21 Denne serveren er nå ikke pålitelig tilgjengelig \\] .. Selv om ERDDAP™ støtter denne filtypen, det er en ugyldig filtype som ingen bør begynne å bruke. Grupper som for tiden bruker denne filtypen oppfordres sterkt til å bruke ERDDAP™ å generere gyldige CF DSG CRA-filer og slutte å bruke disse filene. Takk til Ajay Krishnan og Tim Boyer.
         
    * EDDTableFraTreddsFiler og EDDTableFra Hyrax Filene er nå utdatert. Bytt til EDDTableFromNcFiles (eller variant) pluss&lt;cacheFra Url&gt;. Hvis det ikke virker av en eller annen grunn, e-post erd.data at noaa.gov .. Dersom det ikke er klager før 2020, kan disse datasettstypene fjernes.
         
    * IMPROVED -- Systemet for automatisk konvertering av ikke-ISO 8601 ganger til ISO 8601 ganger (introdusert i v1.82) har blitt sterkt utvidet til å håndtere et stort antall ekstra formater. Dette påvirker GenererDatasetsXml og ERDDAP håndtering av kildemetadata.
         
    * IMPROVED -- Med sin tredje store revisjon av strengtidstolkningssystemet (Forhåpentligvis den siste) , ERDDAP™ Bruker ikke lenger Java DateTime Formater på grunn av feil som noen ganger påvirker ekstreme tider (år&lt;=000). ERDDAP™ Nå bruker sitt eget system til å tolke tidsstrenger.
         
    * ADVARSEL: Det nye String time parsing systemet er noe strengere. Hvis en av datasettene plutselig har bare manglende verdier for tidsverdier, er årsaken nesten sikkert at tidsformatstrengen er litt feil. Det bør være feilmeldinger i loggen. txt relatert til tidsverdier som ikke matcher tidsformatet - som bør hjelpe deg å fikse tidsformatstrengen for det datasettet. Hvis du trenger hjelp, bruk alternativet i ERDDAP tidskonverter som -Konverter \\[ s \\] hvilken som helst vanlig strengtid i en ISO 8601-strengtid -- det indikerer det formatet som omformeren brukte til å tolke kildestrengen.
         
    * REPUBLIKASJON: Den raskeste, enkleste og billigste måten å fremskynde ERDDAP tilgang til tabelldata er å legge datafilene på en solid State Drive (SSD) .. De fleste tabular datasett er relativt små, så en 1 eller 2 TB SSD er sannsynligvis tilstrekkelig til å holde alle datafilene for alle dine tabular datasett. SSD er til slutt slitt ut hvis du skriver data til en celle, sletter den og skriver nye data til den cellen for mange ganger. I stedet anbefaler jeg det (Så mye som mulig) Du bare bruker SSD til å skrive dataene en gang og lese dem mange ganger. Deretter bør til og med en forbruker-klasse SSD vare svært lenge, sannsynligvis mye lenger enn noen harddisk (HDD) .. Forbrukerklasse SSD er nå billig (i 2018, ~$200 for 1 TB eller ~$400 for 2 TB) Prisene faller fortsatt raskt. Når ERDDAP™ tilgang til en datafil, en SSD tilbyr begge
        
        * kortere latens (~0.1ms, versus ~3ms for en HDD, versus ~10 (?) ms for en RAID, versus ~ 55ms for Amazon S3) , og
        * høyere gjennomstrømning (~ 500 MB/S, versus ~ 75 MB/s for en HDD versus ~ 500 MB/s for en RAID) ..
        
Så du kan komme opp til en ~ 10X ytelse boost (vs en HDD) For $ 200&#33; Sammenlignet med de fleste andre mulige endringer i systemet (Ny server for $ 10.000? En ny RAID for 35 000? En ny nettbryter for 5 000 dollar? etc.) Dette er langt den beste avkastningen på investering (ROI) .. Hvis serveren ikke er lastet med minne, er ekstra minne for serveren din også en god og relativt billig måte å øke alle aspekter av ERDDAP ..
         \\[ SSD vil være bra for nettbaserte data, men de fleste nettbaserte datasett er mye større, noe som gjør SSD svært dyrt. \\]   
         
    * NEW: Alle som er logget inn får rolle= \\[ hvem som helst I \\] Selv om det ikke finnes&lt;bruker&gt; tag for dem i datasets.xml .. Hvis du setter datasett&lt;tilgjengelig til&gt; \\[ hvem som helst I \\] Alle som har logget seg på ERDDAP™   (f.eks. via sin Gmail- eller Orcid-konto) vil ha tilgang til datasettet, selv om du ikke har angitt et&lt;bruker&gt; tag for dem i datasets.xml .. Takk til Maurice Libes.
         
    * IMPROVED: Den UDUNITS /UCUM enheter konverter ble mye forbedret.
Den håndterer ugyldige enheter strenger bedre (starter med vekt på å bevare informasjon, i stedet for å håndheve gyldighet) .. Resultatene har nå en standardisert syntaks.
         
    * Ny: The UDUNITS /UCUM enheter konverter har et nytt alternativ til å standardisere en UDUNITS String.
Dette fungerer bra for gyldig UDUNITS strenger og rimelig bra for ikke-standard / ugyldig UDUNITS strenger. For eksempel: UDUNITS ="meter per sekund", "meter/sekund", "m.s^-1" , og "m s-1" alle kommer tilbake " m.s.- Dette var nødvendig for den nye standarden Det systemet som er beskrevet ovenfor. Takket være Marco Alba, Margaret O'Brien (Andre EML-brukere) , BCO-DMO og InPort-brukere.
         
    * NEW: EDDTableFromMultidimNcFiles har nå en [behandlingDimensioner](/docs/server-admin/datasets#treatdimensionsas) alternativet, som forteller ERDDAP™ å behandle visse dimensjoner (f.eks. LAT og LON) Som om de var andre dimensjoner (f.eks. TID) .. Dette er nyttig for noen feil filer som bruker ulike dimensjoner for ulike variabler når de skulle ha brukt bare én dimensjon (f.eks. TID) .. Takk til Marco Alba og Maurice Libes.
         
    * NY: Nå, alle EDDGrid Fra... Filer datasett støtter en ny spesialakse sourceName som forteller ERDDAP™ å trekke ut informasjon fra filenName (bare filename.ext) Bruk verdien til **erstatte** den eksisterende venstre lengste akseverdi. Formatet er
        \\*\\* \\* replaceFromFileName,_ dataType_,_extractRegex_,_captureGroupNumber_
Se [denne dokumentasjonen](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) .. Takket være NOAA Pathfinder Daglig sammenstillingsdatasett.
         
    * NY: Nå, alle EDDGrid Fra... Filer datasett støtter en ny spesialakse sourceName som forteller ERDDAP™ for å trekke ut informasjon fra filstienName (Kataloger + filename.ext)   
        \\*\\* \\*stiName,_dataType_,_extractRegex_,_captureGroupNumber_
For dette bruker stinavnet alltid '/' som katalogsepareringstegnet, aldri '\\'.
Se [denne dokumentasjonen](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) .. Takket være Paloma de la Vallee.
         
    * NEW: Nå, alle EDDTableFrom... Filer datasett støtter ytterligere pseudovariabel sourceName s som trekker ut informasjon fra filens filName (bare filename.ext)   (se [\\*\\* \\* filName](/docs/server-admin/datasets#filename-sourcenames) ) eller fra hele filstienName (/dir1/dir2/filename.ext)   (se [\\*\\* \\ * stiName](/docs/server-admin/datasets#pathname-sourcenames) ) .. Takket være Paloma de la Vallee.
         
    * NY: Hvis en EDDGrid Datasett har én eller flere svært store dimensjoner (For eksempel millioner av verdier) som tar mye minne, kan du sette den nye [&lt;dimensjonValuesInMemory&gt;] (/docs/server-admin/datasett#dimensjonverdierinminne) innstilling til falsk (Standarden er sann) , som får datasettet til å lagre verdiene på disken og hente dem når det er nødvendig. Takk til David Rodriguez og Rich Signell (re: EDDGrid FromAudioFiles) ..
         
    * IMPROVED: Tidligere, hvis du ombestilte dataVariable s for et EDDTableFromFiles datasett og lastet datasettet på nytt, EDDTableFromFiles ville lese alle datafilene på nytt. Nå kan det håndtere ombestillingen uten å gjenlese alle datafilene. Takk til Roland Schweitzer.
         
    * IMPPROVEED: Nå, når ERDDAP™ leser ASCII, NCCSV og JSON Lines CSV-tabelldatafiler, hvis den finner en feil på en gitt linje (f.eks. feil antall elementer) , logger en advarsel melding ( " VARNING: Hoppe over linje #"... " uventet antall elementer...") til [log.txt-fil](/docs/server-admin/additional-information#log) og fortsetter å lese resten av datafilen. Så det er ditt ansvar å se regelmessig (eller skrive et skript for å gjøre det) for den meldingen i loggen. txt slik at du kan løse problemene i datafilene. ERDDAP™ er satt opp på denne måten slik at brukerne kan fortsette å lese alle tilgjengelige gyldige data selv om noen linjer i filen har feil. Tidligere, ERDDAP™ markert filen som " dårlig" og fjernet den fra datasettet.
         
    * IMPROVED: Når nøyaktige tider (f.eks. til nærmeste andre eller millisekund) lagres ved kilden som minutter siden ... (eller større enheter) , ERDDAP™ nå runder dem til nærmeste millisekund når du leser verdiene i ERDDAP .. Ellers er flytende punkttall blåmerket og forespørsler om data til bestemte tidspunkter (f.eks. &time=2018-06-15T01:30:00) vil mislykkes. Tidligere beregnet det dem så nøyaktig som mulig (og likevel gjør hvis enhetene er f.eks. " sekunder siden ..." eller "milli sekunder siden ...") .. Det er best å unngå dette problemet ved å ikke bruke store enheter (f.eks. minutter eller timer) å lagre nøyaktige tidsverdier (f.eks. mikrosekunder) - datamaskiner gjør en dårlig jobb med å håndtere desimalsiffer. Takk til Marco Alba.
         
    * Endringer til EDDTableFra EDDGrid som gjør det mye bedre. EDDTableFra EDDGrid lar brukerne spørre nettbaserte datasett som om de var tabelldatasett ("Kvar etter verdi") ..
        
        * Den støtter nå en&lt;maxAxis0&gt; tag (standard=10) som angir det maksimale antall akser \\[ 0 \\]   (vanligvis "time" ) verdier som kan spørres samtidig. Dette hindrer naive forespørsler fra å få EDDTableFrom EDDGrid å søke gjennom et helt rutenettet datasett (som ville mislykkes med en tidsavbruddsfeil) ..
        * Opprett datasett Xml har nå et alternativ til å generere EDDTableFra EDDGrid Datasett for alle datasett i gitte datasett ERDDAP™ som matcher et spesifisert regulært regulært uttrykk (bruk .\\* for å matche alle datasett) .. Datasettene som den oppretter har ekstra informasjon i sammendragsattributten som indikerer at dette er en tabellversjon av et rutenettet datasett. Og deres datasetID er datasetID i det nettbaserte datasettet, pluss "__Asatable".
        * Det er en stor hastighet for det vanligste oppsettet: når det rutenettede datasettet er et EDDGrid FraErddap datasett som er i samme ERDDAP ..
        
Takk til James Gallagher og Ed Armstrong.
         
    * NEW: generer Datasett Xml for alle typer datasett er nå mye mer sannsynlig å legge til en \\_FillValue eller missing\\_value attributt til en numerisk variabel addAttributes .. Dette oppstår for eksempel når strengmanglende verdimarkører (f.eks., "."."." " "?" "NANANANANA " " " "NaNaNaNa ") for den variabelen i prøvefilen konverteres til ERDDAP Innfødte manglende verdier (127 i bytekolonner, 32767 i korte kolonner, 2147483647 i integrerte kolonner, 9223372036854775807 i lange kolonner og NaN i flytende og doble variabler) .. Det oppstår også for NaN-verdier i flytende og doble variabler. Også -nd - ble lagt til listen over vanlige manglende verdi markører i numeriske datakolonner som ERDDAP™ Bør se etter. Takk til Matt Biddle av BCO-DMO.
         
    * IMPROVED: ncdump-alternativet i generering Datasett Xml er nå mer som ncdump (men fortsatt bruker netcdf-java versjonen av ncdump) .. Nå skriver det ut en ny liste over alternativer. Nå, for .nc ml-filer, det skriver ncdump utgangen for resultatet av .nc ml filendringer påført de underliggende .nc eller .hdf fil.
         
    * BUG FIX: Det var en filhåndtak lekkasje (til slutt å forårsake ERDDAP™ å fryse opp) forårsaket når det opprettes noen typer utdatafiler, for eksempel .geotif, spesielt når det oppstod feil under opprettelsen. Jeg tror/håpner at dette nå er løst. Hvis du fortsatt ser problemer, vennligst fortell meg typen datasett (rutenett eller tabell) og filtypen som forårsaker problemet. Takket være Steven Beale, Lynn DeWitt, Jibei Zhao og andre.
         
    * BUG FIX: Den WMS   Leaflet demo konverterte ikke fullstendig/proporsjonelt den "dybde" akse til " eliminasjon". Nå gjør det, og de ødelagte legende forespørsler er fikset. Også alle aksealternativer i nedtrekkslistene er alltid i stigende sortert rekkefølge. Takk til Antoine Queric og Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles støtter nå riktig begrensninger på strengvariabler som ble opprettet fra tegnvariabler i datafilene. Takk til Antoine Queric og Aurelie Briand.
         
    * BUG FIX: Nå, når et datasett blir utilgjengelig, prøver datasettet å varsle (med meldingen " Dette datasettet er for tiden utilgjengelig.") sine abonnenter, listede handlinger, rss og lonPM180 datasett som er avhengige av det. Takk til Roy Mendelssohn og Bob Simons.
         
    * BUG FIX: To feil relatert til EDDTableCopy. Takk til Sam McClatchie.
         
    * IMPROVED: Antall mislykkede forespørsler vist på status.html-siden vil øke fordi flere ting regnes som feil enn tidligere.
         
    * IMPROVED: ERDDAP Status.html viser nå "Requests (mediantider i ms) " i tidsserien. Tidligere viste det mediantider forkortet til heltallsekunder.
         
    * IMPROVED: I Jsonld-utgangen kommer jsonld-navnet" nå fra datasettets "title" i ERDDAP , og Jsonld-headline - nå kommer fra datasettets datasetID " i ERDDAP .. Tidligere ble den reversert. Dette virker feil for meg fordi i normal engelsk bruk, -navn - vanligvis er en kort, (ideelt) unik identifikator som sjelden/aldri endres (For eksempel Robert Middlename Simons) , ikke en beskrivelse som ikke er unik og som enkelt og ofte kan endres (En mann som skriver programvare til NOAA " vs. " En høy fyr som skriver programvare for NOAA ") .. Gee, det ville være flott hvis skjema.org definisjonen av [Navn](https://schema.org/name) I sammenheng med et datasett var mer spesifikk. Programvareutviklere bør kunne skrive en implementering av en spesifikasjon basert på spesifikasjonen alene, uten veiledning fra eksperter. Men jeg utsetter meg til Google (spesielt Natasha Noy) , NCEI (Spesielt John Relph) Rob Fuller.
         
    * IMPROVED: I Jsonld-utgangen er de fire "spatialCoverage GeoShape-verdiene nå minLat minLon maxLon. Tidligere ble lat- og London-posisjonene snudd. Gee, det ville være flott hvis skjema.org definisjonen av [GeoShape](https://schema.org/GeoShape) angitt riktig rekkefølge. Programvareutviklere bør kunne skrive en implementering av en spesifikasjon basert på spesifikasjonen alene, uten veiledning fra eksperter. Takk til Natasha Noy og Rob Fuller.

## Versjon 1.82{#version-182} 
 (utgitt 2018-01-26) 

*    **Nye funksjoner (for brukere) :)**   
     
    * Mange subtile endringer i utseendet på ERDDAP™ nettsider.
        * IMPROVED: ERDDAP™ Nå bruker HTML 5 og gjør bedre bruk av CSS.
        * IMPROVED: Nettsidene har blitt litt modifisert for å gjøre dem renere og mindre " misbrukte". (De er fortsatt tette og det er fortsatt ting man kan klage på, men forhåpentligvis mye mindre enn tidligere.) Takk til John Kerfoot for noen kommentarer.
        * IMPROVED: Nettsidene ser nå mye bedre ut på mobiltelefoner og andre små enheter, spesielt hvis du bruker dem i landskapsorientering. De ser også bedre ut i små og veldig store vinduer i desktop nettlesere.
        * IMPROVED: For å forbedre sikkerheten og andre grunner, bruk av en utdatert Openlayers-versjon for WMS Demonstrasjonssider er erstattet av Leaflet ..
        * NEW: støtte for forhåndsvisninger av bilde, lyd og videofiler i "files" system (For eksempel [dette testdatasettet](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) og i .htmlTable svar når en celle har URL til et bilde, lyd eller videofil (For eksempel [Forespørselen](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) .. Hvis du sveve over et '?'-ikon, bør du se et bilde, lyd eller forhåndsvisning av videofiler. Du kan også klikke på fillenken for å vise filfullskjermen i nettleseren. Se [Dokumentasjon for mediefiler](/docs/server-admin/datasets#media-files) .. Merk at forskjellige nettlesere støtter ulike filtyper, så eksemplene kan ikke fungere i nettleseren din.
Takket være disse personene/links for ideer og prøvekoder for CSS-bare bildebrikker (var på https://codepen.io/electricalbah/pen/eJRLVd ) og utsett bildelasting (var på https://varvy.com/pagespeed/defer-images.html )   (Selv om koden ble endret før bruk i ERDDAP ) ..
Takket være Cara Wilson, Matthew Austin og Adam Shepherd/BCO-DMO for forespørsler om bildestøtte.
Takket være Jim Potemra, Rich Signell, OOI og Carrie Wall Bell for forespørsler om støtte for audio/hydrofon-fil.
Takk til OOI for å vise behovet for videostøtte.
        * NEW: En undergruppe av data fra alle ERDDAP™ Datasett (men vanligvis et datasett fra lydfiler) kan nå lagres i en .wav-lydfil. ( [dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) Takket være Jim Potemra, Rich Signell, OOI og Carrie Wall Bell for forespørsler om støtte for audio/hydrofon-fil.
        * IMPROVED: Formatet for Web-tilgjengelige mapper (WAF)   (For eksempel / filer/ mapper) Har blitt oppdatert til å bruke en HTML-tabell. Det nye formatet imiterer den siste versjonen av kataloglisten nettsider opprettet av nyere versjoner av Apache. Menneskene vil finne at endringene gjør informasjonen lettere å lese. Programvare som tolker disse dokumentene (For eksempel programvare som høster ISO 19115 dokumenter fra ERDDAP ) Det nye formatet må revideres, men det nye formatet vil være lettere å tolke enn det forrige formatet. (Vær oppmerksom, Anna Milan.) 
        * Ny outOfDateDatasets.html side. ( [eksempel](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) Denne nettsiden viser en tabell med alle datasettene i nær-real-tid som har en&lt; testOutOfDate &gt; tag (Se nedenfor) , rangert etter hvor utdatert datasettene er. Dette dashbordet bør være nyttig for ERDDAP™ administratorer og sluttbrukere når de vil vite hvilke datasett som er utdatert. For utdaterte datasett er det sannsynligvis et problem med datakilden, slik at ERDDAP™ Kan ikke se/hente data fra nyere tidspunkt.
Administratorer: Hvis du ikke vil ha en Out-Of-Date Datasetts nettside, legg dette til i config.xml:
            &lt;UtOfDateDatasettActive&gt;false&lt;/outOfDateDatasettActive&gt;
Det er nå testOutOfDate og ut AvDato-kolonner i allDatasets Datasett.
Takket være Bob Simons, som har ønsket dette i årevis, og til de smarte menneskene på Irlands Marine Institute som ga meg inspirasjonen via deres dedikerte bringebær Pi og skjerm som alltid viser en skjerm som dette på kontoret.
        * IMPROVED: .htmlTable og .xhtml responsen er nå bedre formatert, mer kompakt og dermed laste raskere. Takk til HTML5 og CSS.
    * Ny utgangsfiltype for netadap datasett: .timeGaps. Det viser en liste over hull i tidsverdiene som er større enn mediangapet. ( [eksempel](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) Dette er nyttig for ERDDAP™ administratorer og sluttbrukere når de vil vite om det er uventede hull i tidsverdiene for et datasett som forventes å ha regelmessige tidsverdier. Takk til Bob Simons og Roy Mendelssohn som trengte denne funksjonen.
    * IMPROVED: Standard graf for allDatasets datasett er nå et kart med x=maxLon og y=maxLat. Takket være John Kerfoot, Rich Signell og OOI-CI.
    * Nyhet: [erdapy](https://github.com/ioos/erddapy) -- er ikke en ERDDAP™ funksjon, men vil være av interesse for mange ERDDAP™ Brukere. Erdapy ( ERDDAP™ + Python ) er en Python bibliotek opprettet av Filipe Fernandes som " tar fordel av ERDDAP 's RESTful Internett-tjenester og skaper ERDDAP™ URL for enhver forespørsel som å søke etter datasett, kjøpe metadata, laste ned data etc." Takk til Filipe Fernandes.
    * Jeg burde ha nevnt tidligere: Det er en tredjeparts R pakke designet for å gjøre det lettere å jobbe med ERDDAP™ Innenfor R: [rerddap](https://github.com/ropensci/rerddap#rerddap) .. Takk til [rOpenSci](https://ropensci.org/) Roy Mendelssohn.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:**   
     
    * TO DO: I setup.xml, nedenfor&lt;adminInstitution&gt;, vennligst legg til en&lt;adminInstitutionUrl&gt; tag som spesifiserer en URL for institusjonen din (eller gruppe) ..
    * Disse 3 taggene i setup.xml brukes ikke lenger:
        &lt;Start HeadHtml&gt;,&lt;startBodyHtml &gt; og&lt;endBodyHtml&gt;. De er erstattet av
        &lt;startHeadHtml5&gt;,&lt;startBodyHtml5&gt; og&lt;endBodyHtml5&gt; som har standardverdier angitt i meldinger.xml (og vist nedenfor) ..
        
Vi anbefaler å bruke standarden&lt;startHeadHtml5&gt; og&lt;endBodyHtml5&gt;.
Vi anbefaler: Hvis du gjorde endringer i originalen&lt;startBodyHtml&gt; og/eller ønsker å tilpasse din ERDDAP™ Nå kan du kopiere det nye&lt;startBodyHtml5&gt; tag (Nedenfra) i config.xml og endre den for å tilpasse din ERDDAP™ slik at ERDDAP Nettsidene reflekterer organisasjonen din, ikke NOAA   ERD .. Spesielt, vennligst endre "Brought til deg ved" til din organisasjon (s) .. Hvis du trenger hjelp, vennligst e-post erd.data at noaa.gov .. (Hvis du ikke vil tilpasse din ERDDAP™ Nå, bruk standard&lt;startBodyHtml5&gt;.)
        
Deretter sletter du de 3 gamle taggene i setup.xml som ikke lenger brukes.

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

Det finnes flere måter du kan [tilpasse ERDDAP™ ](/docs/server-admin/deploy-install#customize) så ERDDAP Nettsidene reflekterer organisasjonen din i stedet for NOAA   ERD ..
        
    * Å gjøre:&lt; EDDGrid ...Example&gt; tags (starter med&lt; EDDGrid IdExample&gt;) og&lt;EDDTable... Eksempel &gt; tags (starter med&lt;EDDTableIdExample&gt;) i config.xml-filen brukes til å opprette eksempler i rutenettet og tabledap dokumentasjon. HTML-websider i din ERDDAP ..
        
Hvis du ikke tilpasser disse taggene, vennligst slette dem fra config.xml filen. Nå har alle standarder i meldinger.xml som refererer til datasett i Bobs ERDDAP™ på https://coastwatch.pfeg.noaa.gov/erddap/index.html .. Så du trenger ikke lenger å ha bestemte datasett i din ERDDAP .. Hvis du vil overstyre standardinnstillingene, kopiere noen eller alle disse taggene i config.xml og endre deres verdier.
Hvis du vil at eksemplene skal peke på din ERDDAP™ Den enkleste metoden er:
        
        1. Inkluder disse to datasettene i din ERDDAP™ ved å legge dette til din datasets.xml :)
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Legg til denne etiketten i setup.xml, men endre URL til din ERDDAP 's ( https ?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Hvis du har tilpasset disse taggene, la dem som det er og vennligst legg til disse 2 nye taggene til config.xml å spesifisere ERDDAP™ URL for disse datasettene, men endre URL til din ERDDAP 's ( https ?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * Å gjøre: ERDDAP™ Nå bruker en css-fil som heter erddap2.css. Hvis du gjør endringer i \\[ tomcat \\] /webapps/erddap/images/erddap.css, vurdere å gjøre lignende endringer til erddap2.css (i samme mappe) ..
    * Nyhet: ERDDAP nettsider har nå et stort antall nesten usynlige interne lenker (Teksten er svart og ikke understreket) .. Hvis du sveve over en av disse linkene (Vanligvis de første ordene i overskrifter og avsnitt) Og markøren blir en hånd. Hvis du klikker på lenken, er URL-adressen den interne lenken til den delen av dokumentet. Dette gjør det enkelt å referere til bestemte deler av dokumentasjonen. Takk til Bob Simons, som har ønsket dette i årevis.
    * Nyhet: ERDDAP™ Nå støtter [Byte Range / Accept-Ranges](https://en.wikipedia.org/wiki/Byte_serving) forespørsler om deler av / filer/ filer. Dette var nødvendig for å støtte lyd og video seere i nettlesere.
    * Å gjøre: Nå, for å forbedre sikkerheten, hvis du spesifisert&lt;baseHttpsUrl&gt; i setup.xml (og dermed støtte https ) Det anbefalte flagget Url er en https URL med et tryggere flaggKey. I så fall vil tidligere flaggUrls/flagKeys bli ugyldig. Administrasjoner: Hvis disse endringene gjelder din ERDDAP™ Hvis din ERDDAP™ har EDDGrid FraErddap og EDDTable FraErddap er den som abonnerer på fjernkontrollen ERDDAP Når du har oppdatert ERDDAP , din ERDDAP™ vil automatisk prøve å abonnere på det nye flaggetUrl, så du bør slette de gamle abonnementene og validere de nye abonnementene når du får den nye abonnementsvalideringen e-post.
    * Å gjøre: Hvis din ERDDAP™ har EDDGrid FraErddap datasett for erdVH3 datasett på Bobs coastwatch ERDDAP™ Endre dem til å referere til de nye datasettene i erdVH2018.
    * TO DO: Hvis du inkluderer noen av jplAquariusSS-prøvedatasettene i din ERDDAP™ Endre "V4" i datasetID - til V.
    * Å gjøre: actual\\_range er nå en CF standard attributt (fra CF-1,7) Og klart sier at hvis variabelen bruker add\\_offset og/eller scale\\_factor å pakke dataverdiene, deretter actual\\_range verdier bør bruke den utpakkede datatypen og pakkes ut. Dette er i konflikt med tidligere råd. Opprett datasett Xml pakker nå pakket actual\\_range verdier, men det vil ikke fikse eksisterende datasett i din datasets.xml fil.
        
Så sjekk datasettene dine: Hvis variabelens verdier er pakket og hvis actual\\_range er spesifisert som pakkede dataverdier, vennligst legg til en&lt; addAttributes &gt; actual\\_range verdi for å angi de utpakkede verdiene. Ellers vil datasettet ikke laste inn ERDDAP .. En enkel og nesten perfekt måte å gjøre dette på er å søke datasets.xml for kilde Attributer som har
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
og a scale\\_factor andre enn 1.0. Det er det actual\\_range Attribut som du kan måtte fikse.
        
For aksevariabler i EDDGrid datasett, ERDDAP™ Sett alltid actual\\_range attributt å være det faktiske spekteret av verdiene siden den kjenner disse verdiene.
        
For aksevariabler med nedadgående verdier (f.eks. noen breddegradsvariabler) , ERDDAP™ opprettet actual\\_range med \\[ 0 \\] ... \\[ siste \\] verdier som var høye... lav. Nå bruker det alltid lave verdier for å lage den nye CF-definisjonen.
        
riktigheten i actual\\_range verdier er spesielt viktige for EDDTable datasett, fordi ERDDAP™ vil raskt avvise brukerforespørsler om dataverdier som er mindre enn actual\\_range minsteverdi eller som er større enn actual\\_range maksimal verdi.
        
Relatert: den faktiske\\_min, faktisk\\_max, data\\_min og data\\_max Attributene er nå utdatert. Konverter datasettene dine til bruk actual\\_range I stedet.
        
    * Å gjøre (Valgfritt, men anbefalt) :) For hvert datasett i nærheten og værvarsel i din ERDDAP™ Legg til en [&lt; testOutOfDate &gt;] (/docs/server-admin/datasett#testoutofdate) Merke med en verdi i skjemaet now- _enheter_, f.eks. now- 2 dager. Hvis den maksimale tidsverdien for datasettet er eldre enn den verdien, regnes datasettet som utdatert og vil bli merket som slik på [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) Nettside. Dette gir en enkel måte å se når noe er galt med et datasetts kilde.
    *    [NY: Semantisk merking av datasett med Json-ld (JSON Linked Data) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ Nå bruker [Json-ld (JSON Linked Data) ](https://json-ld.org) å gjøre din datakatalog og datasett en del av [Semantisk web](https://en.wikipedia.org/wiki/Semantic_Web) , som er Tim Berners-Lees ide om å gjøre webinnhold mer maskinlesbar og maskin-forståelig - Søkemotorer ( [Google spesielt](https://developers.google.com/search/docs/data-types/datasets) ) og andre semantiske verktøy kan bruke denne strukturerte markeringen for å lette oppdagelse og indeksering. Json-ld strukturert markering vises som usynlig-til-mennesker&lt;script&gt; kode på http://.../erddap/info/index.html nettside (som er en semantisk web [DataCatalog](https://schema.org/DataCatalog) ) og på hver http://.../erddap/info/_datasetID_/index.html nettside (som er en semantisk web [Datasett](https://schema.org/Dataset) ) .. (Spesielt takket være Adam Leadbetter og Rob Fuller fra Marine Institute i Irland for å gjøre de harde delene av arbeidet for å gjøre denne delen av ERDDAP ..) 
    * NEW: Det er nye datasetttyper som kan lese data fra lydfiler:
         [ EDDGrid FromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , som behandler lyddata som gitt data.
         [EDDTableFraAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , som behandler lyddata som tabelldata. Takket være Jim Potemra, Rich Signell, OOI og Carrie Wall Bell for forespørsler om støtte for audio/hydrofon-fil.
    * Endringer i genereredatasett Xml (og relaterte endringer) :)
        * Nyhet: ERDDAP™ Nå har et system å automatisk [oppdatere utdaterte URLer](/docs/server-admin/additional-information#out-of-date-urls) begge i Generer Datasett Xml og ved lasting av datasett. Hvis du har forslag til ekstra URL-adresser som bør fanges og oppdateres, eller hvis du tror dette bør gjøres til en tjeneste (som omformerne) Vennligst e-post erd.data at noaa.gov ..
        * NEW: Nå, hvis Genererer Datasett Xml ser en CF standard\\_name   (Alt skal være smått) med en stor bokstav, det legger alle små bokstaver til&lt; addAttributes &gt;. Også når et datasett laster, hvis ERDDAP™ Ser en CF standard\\_name med en øvre bokstav, det stille endrer det til standard\\_name .. Takk til Rich Signell.
        * NEW: Nå, hvis Genererer Datasett Xml ser en egenskap med en tid som ikke er i ISO 8601-format, den legger til ISO 8601 formatert tid til&lt; addAttributes &gt;. Hvis ERDDAP™ Ikke gjenkjenner formatet, det etterlater tidsverdien uendret. Hvis du ser et format som ERDDAP™ gjenkjenner ikke og fikser, vennligst send det til erd.data at noaa.gov ..
        * IMPROVED: Den lave nivåkoden for EDDGrid FraThredds Katalogvalg i Generer Datasett Xml er nå avhengig av Unidata netcdf-java katalog crawler kode (Trodder. katalogklasser) slik at det kan håndtere alle THREDDS kataloger (som kan være overraskende komplekse) .. Takk til Roland Schweitzer for å foreslå denne endringen og takket være Unidata For koden.
        * NEW: Generer datasett Xml for EDDGrid FraDap legger nå til -, startyear-endyear - til slutten av tittelen basert på faktiske tidsakseverdier. EndYear="presentere" hvis det finnes data de siste 150 dagene.
        * NEW: Generer datasett Xml for EDDGrid Fra Dap tilføyer nå " \\[ oppløsning \\] °" til tittelen hvis datasettet er jevnt fordelt og det samme for lat og lon.
        * IMPROVED: Tidskonverteren har nå flere funksjoner, spesielt muligheten til å konvertere strengetider i et bredt utvalg av felles formater til ISO 8601-strenger eller til et UD Units-kompatibelt nummer. Alle tidligere støttede funksjoner fortsetter å fungere, uendret.
        * BUG FIX: Genererer datasett Xml og nøkkelordskonverteren inneholder nå " Earth Science &gt; " i starten av GCMD Science Nøkkelord. Når et datasett lastes inn ERDDAP™ , ERDDAP™ Nå fikser noen GCMD-nøkkelord i nøkkelord attributten som ikke starter med " Earth Science &gt; " eller som bruker noe annet enn tittel tilfelle (hvor det første bokstaven i hvert ord er kapitalisert) ..
        * IMPROVED: Når det foreslås&lt; destinationName &gt;'s, Genererer datasett Xml for EDDTableFromAsciiFiles brukte bare haleenden av sourceName S med '/'   (Noen var filnavn-lignende) .. Nå bruker den hele sourceName (f.eks. "blahblahblah (m/s)". Denne endringen vil være god for noen datasett og ikke for andre, men det er tryggere oppførsel. Takk til Maurice Libes.
        * BUG FIX: Genererer datasett Xml og datasettkonstruktørene sikrer nå at det ikke finnes dupliserte kolonnenavn. Takk til Maurice Libes.
        * BUG FIX: Genererer datasett Xml for EDDTableFra AsciiFiles skrev ikke&lt;columnSeparator&gt; til utgangen. Nå gjør det det. Takk til Maurice Libes.
    * NEW: DasDds verktøyet skriver nå ut tidsgapinformasjon (den [.timeGaps informasjon](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) Hvis datasettet er et gitt datasett.
    * NEW: Avansert søk aksepterer nå " nå_--nUnits_" tidsverdier. Takk til Rich Signell.
    * For å forbedre sikkerheten, når en e-postadresse i et datasetts metadata eller data er skrevet til en HTML-nettside, erstattes "@" med " på ". Dette fanger bare e-postadresser som er hele metadata- eller dataverdien, ikke e-postadresser som er innebygd i lengre verdier.
    * For å øke sikkerheten RSS informasjon for private datasett er nå kun tilgjengelig for brukere (og RSS Lesere) som er logget inn og autorisert til å bruke dette datasettet.
    * NEW: Nå når et datasett lastes, hvis date\\_created , date\\_issued , date\\_modified , eller dato\\_metadata\\_modifisert attributt har en tidsverdi som ikke er i ISO 8601-format, ERDDAP™ endrer det til ISO 8601 formatert tid. Hvis ERDDAP™ Ikke gjenkjenner formatet, det etterlater tidsverdien uendret. Hvis du ser et format som ERDDAP™ gjenkjenner ikke og fikser, vennligst send det til erd.data at noaa.gov ..
    * IMPROVED: .dods svar fra EDDGrid Datasett bør nå være betydelig raskere. Takk til Rich Signell.
    * Endringer relatert til ERDDAP Opprettelsen av ISO 19115 dokumenter:
        * BUG FIX: Når du oppretter ISO 19115 dokumenter, dataVariable enheter var ikke HTML-attributt kodet og prosent kodet. Nå er de det. Takket være NGDCs ISO 19115 validerer.
        * BUG FIX: Når du oppretter ISO 19115 dokumenter, date\\_created ble brukt som det er, så ofte var feil format. Nå konverteres den til ISO 8601 Z-streng. Takket være NGDCs ISO 19115 validerer.
        * BUG FIX: Når du oppretter ISO 19115 dokumenter, ERDDAP™ Nå lengre skriver datoer med år=0000 (som med klimatologidatasett) , fordi ISO 19115 skjemaet ikke tillater datoer med år = 0000. Takket være NGDCs ISO 19115 validerer.
    * NEW: Som før forespørsel til http .../erddap/versjon vil returnere bare versjonsnummer (som tekst) f.eks. ERDDAP \\_versjon=1.82".
En forespørsel til http .../erddap/version\\_streng vil returnere et tall og en valgfri suffiks av \"\\_\" pluss ASCII-tekst (ingen mellomrom eller styretegn) f.eks. ERDDAP \\_version\\_streng=1.82\\_JohnsFork". De som gjør gaffelen vil angi dette ved å endre EDStatic.erddapVersion. Denne måten å gjøre det ikke forårsake problemer for tidligere versjoner av ERDDAP .. Takket være Axiom (spesielt Kyle Wilcox) Irlands marineinstitutt (spesielt Rob Fuller) ..
    * BUG FIX: For wms versjon=1.3.0, forespørsel= GetMap , crs=EPSG:4326 (ikke CRS:84) Forespørsler: bbox bestillingen må være minLat,minLon,maxLat,maxLon. For CRS: 84 forespørsler, som tidligere, må bbox ordre være minLon,minLat,maxLon,maxLat. Dette kan fikses ved hjelp av ERDDAP 's WMS 1.3.0 Service i ArcGIS   (Takk til Paola Arce) .. Takk (ikke) til OGC For å gjøre dette så komplisert. Takk til Leaflet For å håndtere dette riktig og gi meg en måte å teste dette på.
    * IMPROVED: Forrige, foreslått link for RSS og e-postabonnementer har http URL til din ERDDAP .. Nå er det https URL, hvis det er aktivt.
    * Nyhet: EDDGrid Kopier nå støtter en valgfri tag&lt;Bare siden&gt;_someValue_&lt;/kunSiden&gt;, hvor verdien er en bestemt ISO-8601-formatert tid eller en now- nUnites (f.eks. now- 2 år) Tid. Se [Bare Siden dokumentasjon](/docs/server-admin/datasets#onlysince) .. Takk til Drew P.
    * IMPROVED: Hvis det er tilgjengelig, ERDDAP™ vil vise https URL (fra&lt;baseHttpsUrl&gt;, hvis tilgjengelig) i stedet for http URL når det forteller brukerne at URL-en skal legge til/validere/fjern/liste et abonnement.
    * BUG FIX: ERDDAP™ Nå kan en abonnementshandling begynne med https://" .. (Bob slår pannen sin.) Takk til Jennifer Sevadjian.
    * BUG FIX: .jsonlKVP Nå bruker \":\" mellom hver nøkkel og verdi, i stedet for '=' .. (Bob slår pannen sin.) Takk til Alexander Barth.
    * BUG FIX: Tidligere hvis du starter på nytt ERDDAP™ Med hurtig reload=true, og hvis, før datasettet ble lastet på nytt normalt, du ringte til et EDDTableFromFiles datasett som brukte oppdateringenEveryNMillis, og hvis en datafil nettopp hadde blitt endret, ville forespørselen mislykkes med en null pekerfeil. Nå vil forespørselen lykkes. Takk til John Kerfoot.
    * NEW: Når et datasett lastes inn ERDDAP™ , søkeordene er nå omorganisert i sortert rekkefølge og alle nylinjetegn fjernes.
    * IMPPROVED: Nå, hvis en .geoJson, .json eller .nc oJson-forespørsel har .json p parameter, responsen mime type er applikasjon / javascript. Merk at .json P støttes ikke .jsonlCSV eller .jsonlKVP Fordi det ikke ville fungere. Takk til Rob Fuller.
    * IMPROVED: MIME-typen for Json linjer filTypealternativer er nå " Application/x-jsonlines". Det var søknad/jsonl. For tiden er det ikke noe endelig riktig valg.
    * IMPROVED: Antall mislykkede forespørsler som vises på status.html-siden vil øke fordi flere ting regnes som feil enn tidligere, for eksempel ClientAbortException.
    * IMPROVED: Nå, hvis et svar fra ERDDAP™ er ikke komprimert, så vil overskriften på responsen inkludere "Content-coding"=" identitet".
    * IMPROVED: Egenskapen " lisens" var ikke nødvendig. Nå, hvis det ikke er spesifisert, standardLicense fra meldinger.xml (eller fra setup.xml hvis tilstede) brukes som standard.
    * NEW: Det er nå et valgfritt [filAccessSuffix-attributt](/docs/server-admin/datasets#fileaccessbaseurl) som kan brukes sammen med eksisterende [filAccessBaseUrl-attributt](/docs/server-admin/datasets#fileaccessbaseurl) ..
    * IMPROVED: For å øke sikkerheten, ble denne versjonen kompilert med det siste Java JDK v8u162.
    * NEW: For å øke sikkerheten, flere felles domener som tilbyr midlertidige e-postadresser (For eksempel, @mailinator.com) er nå på en permanent e-post svartliste til abonnementssystemet.
    * For å øke sikkerheten, inkluderer tallene i Daily Report nå:
SetDataset Flag IP- adresse mislyktes (Siden siste dagsrapport)   
SetDataset Flag IP- adresse mislyktes (siden oppstart)   
SetDataset Flag IP adresse lykkes (Siden siste dagsrapport)   
SetDataset Flag IP adresse lykkes (siden oppstart)   
De "favne" tallene la deg se hvem (En hacker?) Han prøver å sette et flagg, men mislykkes.
    * For å øke sikkerheten, e-postadresser i&lt;emailBlacklist&gt; i din datasets.xml Nå anses det som ufølsomt.
         

## Versjon 1.80{#version-180} 
 (utgitt 2017-08-04) 

*    **Nye funksjoner (for brukere) :)**   
     
    * Ny orderByCount  () Filteret lar deg angi hvordan resultattabellen skal sorteres (eller ikke) og bare returnerer en rad for hver sorteringsgruppe, med antall ikke-manglende verdier for hver variabel.
For eksempel orderByCount  (" stationID ") vil sortere etter stationID og returnere én rad for hver stationID , med et antall ikke-manglende verdier for hver variabel.
Hvis du bare angir orderByCount  ("") Svaret vil være bare én rad med antall ikke-manglende verdier for hver datavariabel.
Se [ orderBy ... dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Takk til Ben Adams.
    * Ny .nc oJson-fil Type alternativ for rutenett og tabell datasett. Dette alternativet gjør et NCO lvl=2 "pedantisk" JSON-fil med all informasjonen som normalt finnes i en .nc fil. Se [ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json) Takk til Charlie Zender.
    * BUG FIX: Den orderBy ... () alternativer på Make A Graph nettsiden håndteres nå riktig.
    * BUG FIX: .geoJson utdata nå ikke skriver ut rader der lat- eller lonverdier mangler. Også høydeverdier (Hvis tilgjengelig) er nå inkludert i koordinatene, ikke som dataverdier. Takk til Jonathan Wilkins.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:**   
     
    * SIKKERHETSRESSE: Protocols.js-biblioteket som brukes til OpenLayers demo på WMS sider i ERDDAP™ er utdatert og har en feil som potensielt tillater det å bli misbrukt. (Uppdatering OpenLayers og protokoller. Js er ikke lett.) Det åpner muligheten for at biblioteket kan settes opp for å tillate en sårbarhet på tvers av nettstedet. Men siden ERDDAP™ Bare bruk OpenLayers på en spesifikk måte og kun med spesifikk ERDDAP -baserte datakilder, vi tror det ikke er noen sårbarhet på tvers av steder i ERDDAP bruk av OpenLayers og protokoller.js. Men hvis du ikke tror dette, kan du nå deaktivere bruken av OpenLayers demo på WMS sider av din ERDDAP™ ved å legge til
```
        <openLayersActive>false</openLayersActive>  
```
til din config.xml fil. Standard er " sant". Takk til Charles Carleton og NCEI.
    * OPPSETINGER: Ubrukt .jar filer og duplikat .jar filer (fordi de også er i netcdfAll.jar) er fjernet fra ERDDAP™ Fordeling. Utdaterte .jar-filer har blitt oppdatert. Takk til Charles Carleton og NCEI.
    * SIKKERHETER: NetcdfAll.jar filen distribuert med ERDDAP™ er den siste versjonen (i dag 4.6.10) , men det inneholder fortsatt interne jackson .jar-filer som er kjent for å være utdatert og har sikkerhetsproblemer, spesielt Jackson-bibliotekene som kun brukes når du får tilgang til Amazon S3-datakilder. Hvis du ikke får tilgang til data via Amazon S3 (Du ville vite om du var) Disse sårbarhetene er ikke relevante.
        
Nettcdf-java-utviklerne opprettholder at disse sårbarhetene ikke er relevante på grunn av den måten som netcdf-koden bruker disse bibliotekene på, og i alle tilfeller vil kun være relevante når de får tilgang til Amazon S3. Se [ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866) .. Jeg tror dem. Hvis du fortsatt har bekymringer om dette, vennligst kontakt netcdf-java utviklerne. (Merk at hvis du ikke tror på netcdf-java utviklere og vurderer å ikke bruke ERDDAP™ På grunn av dette bør du ikke bruke TREDDS heller, fordi TREDDS bruker netcdf-java mer grunnleggende og mer omfattende enn ERDDAP ..) 
        
Detaljer: Den problematiske koden og sårbarhetens advarsler er:
NettcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høy
NettcdfAll-laterst.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høy
NettcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høy
Se https://nvd.nist.gov/vuln/detail/CVE-2016-3720 Kritisk
NettcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Se https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Høy
Se https://nvd.nist.gov/vuln/detail/CVE-2016-3720 Kritisk
" For versjon 4.6.10 trekker aws-java-sdk-core i versjon 2.6.6 av jackson-\\* gjenstander." (e-post fra netcdf-java people) ..
Takk til Charles Carleton og NCEI.
        
    * Kompilatorendringer: Hvis du rekompilerer ERDDAP™ , merk at parameteren -cp klassesti som er nødvendig for kommandolinjen er nå mye kortere enn før. Se den nye cp-innstillingen i [denne dokumentasjonen](/docs/contributing/programmer-guide#development-environment) .. Takk til Charles Carleton og NCEI.
    * Nyvalg i Generer Datasett Xml: EDDTableFromBcodmo, som er bare for intern bruk ved BCO-DMO.
Takk til Adam Shepherd og BCODMO.
    * Ny ATTRIBUTE og FEATURE: Hvis en EDDTable-kolonne har navn på tilgjengelige webfiler (f.eks. bilde, video eller lydfiler) Du kan legge til
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
å angi basisadressen (Ender med /) nødvendig for å gjøre filnavnene til komplette nettadresser. Så for .htmlTable svar, ERDDAP™ vil vise filnavnet som en lenke til den kombinerte URLen (basen Url pluss filnavnet) ..
Hvis du vil ERDDAP™ å betjene relaterte filer, lage en separat EDDTableFromFileNames datasett for disse filene (Det kan være et privat datasett) ..
Takk til Adam Shepherd og BCODMO.
    * NEW ATTRIBUTE: Hvis en EDDTable-kolonne har filnavn på web-tilgjengelige filer (f.eks. bilde, video eller lydfiler) som er tilgjengelige via et arkiv (f.eks. .zip fil) Tilgjengelig via en URL, bruk
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
for å angi URL for arkivet.
Hvis du vil ERDDAP™ for å betjene arkivfilen, lage en separat EDDTableFromFileNames datasett for den filen (Det kan være et privat datasett) ..
Takk til Adam Shepherd og BCODMO.
    * IMPROVENTER til å generere datasett Xml å fjerne årsakene til ugyldig / dårlig&lt; subsetVariables &gt; forslag og duplikat / dårlig foreslåtte variabelnavn, etc. Takket være Rich Signell, Adam Shepherd og BCO-DMO.
    * Nytt valg: Den politiske grenseinformasjonen som distribueres med ERDDAP er fra tredjepart og noe utdatert. Også det er omstridte grenser på flere steder i verden, der ulike mennesker vil ha forskjellige ideer om hva som er riktig. Vi har ingen klaim om korrektheten til de politiske boundariske opplysningene som kommer med ERDDAP .. Hvis du ikke liker den politiske grenseinformasjonen som følger med ERDDAP™ Du kan nå fortelle ERDDAP™ å aldri trekke politiske grenser ved å legge til
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
til din config.xml fil. Standard er " sant". Takk til Raju Deventer.
    * NY METADATA TAG: I datasets.xml For et datasett kan du nå angi standard antall farger Barseksjoner for en dataVariable på grafer og kart med
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (standard=-1, som sier å la ERDDAP™ bestemme) .. Se [farge Barinnstillinger](/docs/server-admin/datasets#color-bar-attributes) ..
    * INPROVED: statens grensefarge på kart var lilla (Deep Purple for deg Baby Boomers) .. Nå er det grått (mellom den nasjonale grensen grå og landet grå) ..
    * BUG FIX:&lt;iso19115File &gt; og&lt;fgdcFile &gt; in datasets.xml Ikke alltid blitt håndtert riktig. Nå er de det. Takk til BCO-DMO.

## Versjon 1.78{#version-178} 
 (utgitt 2017-05-27) 

*    **Nye funksjoner (for brukere) :)**   
     
    *    (ingen)   
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:**   
     
    * IMPROVED: Ordre av linjer i "Major LoadDatasets Time Series" på status.html siden er nå nyeste øverst til eldste nederst.
    * BUG FIX: ERDDAP™ Nå skriver .nccsv filer med tidsvariabelens actual\\_range som ISO-8601-strengtid. Det løser feilen med EDDTableFraErddap-tolkingsinformasjon fra et eksternt datasett og fra den raske restart-filen for alle EDDTableFra...Files datasett. (Tiden actual\\_range vil være feil første gang datasettet lastes i v1.78 men riktig etter at det er lastet på nytt, f.eks. hvis du flagger datasettet.) 

## Versjon 1.76{#version-176} 
 (utgitt 2017-05-12) 

*    **Nye funksjoner (for brukere) :)**   
     
    * Endring i Tomcat: For forespørsler til ERDDAP™ kommer fra annen programvare enn nettlesere (f.eks. curl , R, Matlab , Python , Java ) :)
Som med tidligere endringer i versjoner av Tomcat (den lavere programvaren som kjører ERDDAP ) siden tidlig 2016 må flere og flere tegn i spørringsdelen av forespørselsadressen være [ **Prosent kodet** ](/docs/server-admin/datasets#infourl) av sikkerhetsgrunner. Nettlesere tar seg av prosent koding for deg. Bruker ERDDAP™ i en nettleser er ikke påvirket med mindre forespørselen blir omdirigert til en annen ERDDAP ..
    * IMPROVED: Tidligere, ERDDAP™ behandling **tegnvariabler** mer som usignerte korte heltal enn tegn. Nå behandler det dem mer som 1-tegn-lang UCS-2 (Unicode) Stringer. Se [tegndokumentasjon](/docs/server-admin/datasets#char) .. Takk til Aurelie Briand og Argo-prosjektet.
    * IMPROVED: Tidligere, ERDDAP™ Tilbys lite støtte til **Unicode- tegn** Over tegn #255 i strenger. Nå internt, ERDDAP™ Fullstendig støtter 2-byte UCS-2 tegn (tegn nummer 0 til 65535) I strenger. Når strengdata er skrevet til ulike filtyper, ERDDAP™ gjør det beste det kan å støtte 2-byte chars. Et annet eksempel er .csv-filer som ERDDAP™ skriver med ISO-8859-1-kodingen (a 1-byte tegnsett) , så ERDDAP™ skriver alle tegn over tegn # 255 med JSON-lignende \\u_hhh_-syntaks. Se [Strengdata](/docs/server-admin/datasets#string) ..
    * IMPROVED: I .nc filer skrevet av ERDDAP™ , tegnvariabler som skal tolkes som strenger vil ha attributten
         **\\_Koding=ISO-8859-1**   
I .nc filer som leses av ERDDAP™ , tegnvariabler med "\\_-koding" vil bli tolket som strenger med den angitte teiknkodingen.
    * REMINDER: ERDDAP™ støttes **JSON-lignende ryggslash-encoding** av spesielle tegn når du angir begrensninger på tegn- og strengvariabler. Du kan derfor be om noe som &myString="\\u20ac" når du vil ha rekker data der myString=€ siden 20ac er den heksadesimale versjonen av kodepunktet for Euro-symbolet. Flere kilder på nettet viser kodepunktnumrene for Unicode-symboler, f.eks. [ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode) ..
    * IMPROVED: Tidligere, ERDDAP™ tilbys begrenset støtte til **langt heiltal** Variabler. Nå ERDDAP™ fullt støtter longs internt og gjør sitt beste når du skriver lange data til ulike filtyper. Se [Lang dokumentasjon](/docs/server-admin/datasets#long) .. Takket være Irlands marineinstitutt, Craig Risien, Rich Signell, Christopher Wingard og OOI.
    * NEW: utgangsfiltype for griddap og tabledap :) ** .nccsv ** som gjør en NetCDF -like, ASCII, CSV-fil som også inneholder alle metadata som ville være i en sammenlignbar .nc fil. Se [NCCSV Spesifikasjon](/docs/user/nccsv-1.00) .. Takk til Steve Hankin.
    * Nyhet: ** orderByClosest filter** kan du angi hvordan resultattabellen sorteres og et intervall (f.eks. 2 timer) .. Innenfor hver sorteringsgruppe vil kun radene nærmest intervallet holdes. For eksempel orderByClosest  (" stationID Tid, 2 timer") vil sortere etter stationID og tid, men bare returnere radene for hver stationID hvor den siste orderBy kolonne (tid) er nærmest 2 timers intervaller. Dette er det nærmeste i tabledap til trinnverdier i en netdap-forespørsel. Dette alternativet kan angis via noe tabledap Datasetts .html nettside, .graph nettside, og av alle URL som du genererer deg selv. Takk til Irlands Marine Institute og Ocean Networks Canada.
    * Nyhet: ** orderByLimit filter** kan du angi hvordan resultattabellen skal sorteres og et grensenummer (f.eks. 100) .. Innenfor hver gruppe vil bare de første \"grense\" radene holdes. For eksempel orderByMax  (" stationID , 100") vil sortere etter stationID , men bare returnere de første 100 radene for hver stationID .. Dette ligner på SQLs Klausul. Dette alternativet kan angis via noe tabledap Datasetts .html nettside, .graph nettside, og av alle URL som du genererer deg selv. Takk til Irlands Marine Institute og Ocean Networks Canada.
    * NEW: To nye responsfiltyper, ** .jsonlCSV og .jsonlKVP ** er tilgjengelige for forespørsler til nettbaserte datasett, tabelldatasett og mange andre steder i ERDDAP   (F.eks. forespørsler om informasjon om datasett) .. Filene er JSON Lines-filer ( [ https://jsonlines.org/ ](https://jsonlines.org/) ) hvor hver linje har et separat JSON-objekt. .jsonlCSV Bare har verdiene i et CSV-format. .jsonlKVP har nøkkel: Værdipar. Hver linje står på egen hånd. Linjene er ikke innesluttet i en større JSON-array eller -objekt. For eksempel, se [denne prøveanmodningen](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) .. Takket være Damian Smyth, Rob Fuller, Adam Leadbetter og Irlands Marine Institute.
    * NEW: Det finnes ny dokumentasjon som beskriver [ **Hvordan få tilgang til private datasett i ERDDAP™ via skript** ](/docs/user/AccessToPrivateDatasets) .. Takk til Lynn DeWitt.
    * IMPROVED: minste omfang av ** OpenLayers ** Kartet var 2 grader og er nå 4 datapiksler. Takk til Rusty Holleman.
    * IMPROVED: I noen vanlige tilfeller, forespørsler som inkluderer en **regulært uttrykk** Begrensning vil bli behandlet mye raskere.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:**   
     
    *    **SLOW First STARTUP:** Første gang du starter denne nye versjonen, vil det ta lang tid for ERDDAP™ for å laste alle datasettene fordi det må leses om alle kildedatafilene (Selv om bare overskriften for rutenettede datafiler) .. Hvis du ser på loggene kan du se feilmeldinger som sier - gamle/ustøttet forbedretVersion - av noen interne filer - det er greit -- ERDDAP™ vil lage de nye versjonene av de interne filene. Vær tålmodig.
    * Action: ERDDAP™ Nå bruker den nye **Java.tid** klasser (også kjent som JSR 310) I stedet for Joda å tolke String ganger i numeriske tider. Merknader:
        * Hvis ERDDAP™ plutselig har problemer med å tolke String ganger for et gitt datasett og dermed bare konverterer mest eller alle ganger til NaNs (manglende verdier) Problemet er nesten alltid med datoen Tidsformatstreng som du spesifisert som "enhetene" av variabelen. Det nye systemet trenger noen ganger en litt annen datoTid formatstreng.
        * Hvis numeriske måneder og dager i datoenTidsstrengene ikke er 0-polert (f.eks. "3/7/2016") , sørge for at formatet bare har en enkelt M og d (f.eks. "M/d/YYY", ikke "MM/dd/YYY") ..
        * Endre eventuelle fraksjonelle sekunder spesifikasjon som bruker små bokstaver (f.eks. .sss i yyyy-MM-dd 'T'H:mm:ss.ssss) Til kapital S's, (f.eks. yyyy-MM-dd 'T'HH:mm:ss.SSS) ..
        *    ERDDAP™ ikke lenger støtter strengdato Tidsformater med tosifrete år (yy) med et underforstått århundre (f.eks. 1900 eller 2000) .. Forretninger brukte milliarder dollar på å fikse dette problemet i slutten av 1990-tallet. Forskere bør ikke bruke to sifferår. Rett opp kildefilen (s) ved å konvertere til 4-sifret år, og deretter bruke yyy på datoen Tidsformat.
        * Du kan bruke YYYZ eller YYZZ (som ERDDAP™ konverterer til uuuu) å tolke 4 sifferår, inkludert negative år, f.eks. -4712 (som er 4713 BC) .. Takket være SeaDataNet, Thomas Gardner og BODC.
        * Vennligst fortsett å bruke Z innen en datoTidsformat for å få ERDDAP å tolke en tidsforsinkelse (f.eks. Z, +0200, -08, -0800, -08:30) ..
        *    **Sørg for at du bruker Java versjon 1.8.0\\_21 eller høyere.** 
        * Programmere -- Hvis du skriver Java programmer som kjører ERDDAP™ kode, du må fjerne referansen til joda-tid. krukke i klassestiparameteren.
    * Nyhet: ERDDAP 's [ArkivA Datasett verktøy](/docs/server-admin/additional-information#archiveadataset) kan nå opprette [ **BagIt-filer** ](https://en.wikipedia.org/wiki/BagIt) .. NCEI kan standardisere på dette formatet. Takk til Scott Cross og John Relph.
    * IMPROVED: Linkene til å laste ned erddap. Krig mot ERDDAP™ Nettsider peker nå på **GitHub** .. (De er offentlige lenker, så du trenger ikke å bli med GitHub.) Dette betyr mye raskere nedlastinger (opp til 12Mb/s versus 1Mb/s) Og få problemer med nedlastinger. Takket være Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney og Irlands Marine Institute.
    * IMPROVED: Den **Status.html-siden og den daglige statusrapporten e-post** nå inkluderer en "Major LoadDatasets Time Series" delen som viser statistikk om ERDDAP™ fra slutten av hvert større lastdatasett for de siste 100 store lastdatasettene. Takket være vår vanskelige RAID.
    * NEW: En ny, valgfri (men anbefalt) parameter for EDDTableFromCassandra datasett: [ ** &lt;partitionKeyCSV&gt; ** ] (/docs/server-admin/datasett#partitionkeycsv) .. Takk til Ocean Networks Canada.
    * NEW: EDDTableFromAsciiFiles støtter nå ** &lt;kolonneSeparator&gt; ** parameter. Hvis null eller - - klassen vil gjette, som før, vil det første tegnet bli brukt som kolonneseparator når du leser filene. Takk til Sky Bristol og Abigail Benson.
    * Ny: den nye datasetttypen, [ **EDDTableFraNccsvFiler** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) , kan gjøre et datasett ved å samle [NCCSV .csv filer](/docs/user/nccsv-1.00) .. Takk til Steve Hankin.
    * IMPROVED: **EDDTableFraErddap** Nå bruker .nccsv å få informasjon fra fjernkontrollen ERDDAP S og for lokalt arkiv av den metadatainformasjonen. Dette gir full støtte for tegn- og lange datatyper, og for Unicode (UCS-2) Tegnsett for tegn og strenger. Takk til Rob Fuller og Irlands Marine Institute.
    * IMPROVED: EDDTableFromErddap og EDDGrid FraErddap nå støtte ** &lt;omdirigere&gt;falske&lt;/redirect&gt; ** som forteller ERDDAP™ aldri å omdirigere forespørselen til fjernkontrollen ERDDAP .. Standard er sant. Dette er nyttig når fjernkontrollen ERDDAP™ er en privat ERDDAP .. Takket være Damian Smyth, Rob Fuller og Irlands Marine Institute.
    * IMPROVED: ERDDAP™ nå fanger **kansellert brukerforespørsler** Før. Og ERDDAP™ nå stenger ned raskere fordi lavnivåtrådene stenger raskere. Takket være vår vanskelige RAID.
    *    **Opprett datasett Xml:** 
        * NY: Den nye spesielle EDDType-ncdump-skriver en [ncdump](https://linux.die.net/man/1/ncdump) \\-lignende utskrift av hodet på en .nc fil. Du kan også skrive ut dataverdier for spesifiserte variabler (eller angi " ingenting" å ikke skrive ut dataverdier) .. Dette er nyttig fordi uten ncdump det er vanskelig å vite hva som er i en fil og dermed hvilken EDDType du bør spesifisere for GenerateDatasetsXml. Takk til Craig Risien, Rich Signell, Christopher Wingard og OOI.
        * NEW: For SeaData Nettodata:
Når det er relevant, generere datasett Xml gjør nå en bestemt semantisk konvertering ved hjelp av en ekstern SPARQL-spørsel: hvis en variabels kilde metadata inneholder en sdn\\_parameter\\_urn, f.eks. sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01", Generererer datasett Xml vil legge til den tilsvarende P02-attributten, f.eks. sdn\\_P02\\_urn = "SDN:P02::PSAL". Hvis du har datasett som bruker disse attributtene, og hvis din ERDDAP 's&lt; categoryAttributes &gt; i setup.xml inkluderer sdn\\_parameter\\_urn og sdn\\_P02__urn, vil brukerne kunne bruke ERDDAP™ Kategorisøkesystem for å søke etter datasett med bestemte verdier av disse attributtene. Takk til BoDC og Alexandra Kokkinaki.
        * IMPROVED: Generer datasett Xml endrer nå mange http:// referanser i metadata til https:// når det er hensiktsmessig.
        * IMPROVED: Generer datasett Xml forsøker nå å gjette skaperen\\_type og utgiver\\_type.
        * IMPROVED: Variabelens dataTyper foreslått av Genererer Datasett Xml vil nå bli litt bedre. Takk til Margaret O'Brien, LTER og EML.
        * IMPROVED: Generer datasett Xml er bedre å spesifisere&lt;cdm\\_data\\_type&gt;, og legger til relaterte, nødvendige attributter (f.eks.&lt;cdm-_timeseries-_variables&gt;), slik at du kan gi den informasjonen. Takk til Rich Signell.
        * IMPROVED: I Genererer datasett Xml, for EDDTable datasett, forslaget til&lt; subsetVariables Nå er det mye mer konservativt. Takk til John Kerfoot.
        * IMPROVEED: Hvis datasets.xml for datasett angir featureType men ikke cdm\\_data\\_type, den featureType vil bli brukt som cdm\\_data__type. Takk til Rich Signell.
        * BUG FIX: generer Datasett Xml foreslår nå riktig&lt;dataType&gt; for datavariabler som har scale\\_factor , add\\_offset og/eller-usignerte egenskaper.
    * INPROVED: Når ERDDAP™ Åpner en .nc fil som er **kortere** enn det skal være (For eksempel, det ble ikke fullstendig kopiert på plass) , ERDDAP™ Nå behandler filen som dårlig. Tidligere, ERDDAP™ returnerte manglende verdier for en manglende del av filen fordi det er standard atferd for netcdf-java. ERDDAP™ Nå bruker Ucar .nc 2.iosp.netcdf3.N3header.disallowFileTruncation = sant; Takket være vår vanskelige RAID og Christian Ward-Garrison.
    * IMPPROVED: ISO 19115 forfatteren bruker nå **creator-_type** Hvis tilstede.
    * IMPROVED: ERDDAP™ Nå bruker den nyeste netcdf-java v4.6.9 som kan lese flere typer **netcdf-4 filer** .. Takk til Craig Risien, Rich Signell, Christopher Wingard og OOI.
    * BUG FIX: Unngå problemer hvis ulike kildefiler har ulike datatyper for en gitt variabel. Takk til Roy Mendelssohn og Eugene Burger.
    * BUG FIX: **Konverteringer av tidsformat** er bedre beskyttet mot dårlige tidsverdier. Takk til NDBC.
    * BUG FIX: EDDGrid FraNcFiles Unpacked håndterer nå tidsverdier med **month måneder siden ..." og " år siden ..."** riktig (ved å øke måneden eller året, ikke ved å tilsette råt, f.eks. 30 dager gjentatte ganger) .. Takket være Soda3.3.1.
    * BUG FIX: bare i v1.74 **abonnement** kreves en handling (f.eks. http:// ...) som var og bør være valgfritt.
    * BUG FIX: EDDGrid Fra FlightIRFiles.lowGetSourceMetadata () Har ikke lagt til noen globale egenskaper. Nå gjør det det.
         

## Versjon 1.74{#version-174} 
 (utgitt 2016-10-07) 

*    **Nye funksjoner (for brukere) :)**   
     
    * Når en liste over datasett (Alt eller fra søk) vises på en nettside, lange titler vises på flere linjer. Tidligere ble midten av en lang tittel erstattet av .... Takk til Margaret O'Brien, LTER og EML.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:**   
     
    * TO DO: På Linux datamaskiner, endre innstillingene for tidsavbrudd for Apache slik at tidskrævende brukerforespørsler ikke tidsavbrudd (med det som ofte vises som en "Proxy" eller "Bad Gateway" feil) .. Som rotbrukere:
        
        1. Endre Apache http d.conf-fil (Vanligvis i /etc/ http d/conf/) :)
Endre eksisterende&lt;Tidsavbrudd&gt; innstilling (eller legge til en på slutten av filen) til 3600 (sekunder) i stedet for standard 60 eller 120 sekunder.
Endre eksisterende&lt;ProxyTimeout &gt; innstilling (eller legge til en på slutten av filen) til 3600 (sekunder) i stedet for standard 60 eller 120 sekunder.
        2. Start Apache på nytt: /usr/sbin/apachectl -K graciøs (Men noen ganger er det i en annen katalog) ..
        
Takk til Thomas Oliver.
         
    * Nyhet: \\[ storParentDirectory/hard Flaggkatalog
Dette fungerer som flaggkatalogen, men hardFlag-versjonen sletter også all informasjon om cachede datasett. Det er ingen nettadresser å sette et hardFlag. Dette kan bare brukes ved å legge en fil i den katalogen.
hard Flaggene er svært nyttige når du gjør noe som forårsaker en endring i hvordan ERDDAP™ leser og tolker kildedataene, for eksempel når du installerer en ny versjon av ERDDAP™ eller når du har gjort visse typer endringer i et datasetts definisjon i datasets.xml .. Se [denne dokumentasjonen](/docs/server-admin/additional-information#hard-flag) .. Takk til John Kerfoot og alle Argo-gruppene.
         
    * NEW: Generer datasett Xml har nå et EDDTableFromEML-alternativ
som leser en datasettbeskrivelse i et økologisk metadataspråk (EML) fil, laster ned den relaterte datafilen, og genererer en bit av datasets.xml slik at datasettet kan legges til ERDDAP .. Det er også en EDDTableFromEMLBatch som gjør det samme for alle EML-filene i en mappe. Dette fungerer veldig godt fordi EML gjør en utmerket jobb med å beskrive datasettet og fordi KNB og LTER gjør de faktiske datafilene tilgjengelige.
EML pluss ERDDAP™ Kan være en god kombinasjon, siden ERDDAP™ kan gi brukere mer direkte tilgang til rikdommen av KNB og LTER data og hjelpe disse prosjektene møte den amerikanske regjeringens [Offentlig tilgang til forskningsresultater (PARR) Krav](https://nosc.noaa.gov/EDMC/PD.DSP.php) Ved å gjøre data tilgjengelig via en webtjeneste.
Se [denne dokumentasjonen](/docs/server-admin/EDDTableFromEML) .. Takk til Margaret O'Brien, LTER og EML.
         
    * NEW: Generer datasett Xml har nå et EDDTableFromInPort-alternativ
som leser en datasett beskrivelse i en InPort XML-fil og prøver å generere en bit av datasets.xml slik at datasettet kan legges til ERDDAP .. Dette skaper sjelden en klar-å-bruke bit av XML for datasets.xml Men det vil skape et godt grovt utkast som er et godt utgangspunkt for redigering av et menneske.
Det ville være flott hvis folk som bruker InPort til å dokumentere sine datasett også vil bruke ERDDAP™ å gjøre de faktiske dataene tilgjengelige via ERDDAP Netttjenester og dermed møte den amerikanske regjeringens og NOAA 's [Offentlig tilgang til forskningsresultater (PARR) Krav](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) Ved å gjøre data tilgjengelig via en webtjeneste. Dette er en løsning som kan brukes akkurat nå. ( erd.data at noaa.gov er glad for å hjelpe.)   
Se [denne dokumentasjonen](/docs/server-admin/datasets#eddtablefrominport) .. Takk til Evan Howell og Melanie Abecassis.
         
    * IMPROVED: ERDDAP™ nå bruker netcdf-java 4.6.6.
Med tidligere versjoner, Netcdf-java lese noen fyllverdier (kanskje, bare i netcdf-4 filer) som 0's. Nå leser den noen av dem som netcdf standard fyllverdi: -127 for bytes, -32767 for shorts, -2147483647 for intense. Unidata Den nye oppførselen er riktig oppførsel. Hvis en variabel i et datasett begynner å vise en av disse verdiene der de brukte til å vise 0, kan du legge til f.eks.
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
til variabelens addAttributes å fortelle ERDDAP™ å behandle den verdien som en missing\\_value /\\_Fyll Værdi. Men i mange tilfeller vil det ikke gi ønsket resultat: 0. I så fall, vurdere å endre filene med NCO eller omskriving av filene. Klager? Kontakt oss Unidata ;-)
         
    * TO DO: Ny TopografiDepth palett
Jeg oppfordrer deg til å bytte alle datasett som bruker OceanDepth paletten til å bruke den nye TopographyDepth paletten, som er som Topography bortsett fra fargene flipped, slik at den er egnet for dybdeverdier (positive = ned) I stedet for høydeverdier (positive=up) .. De anbefalte innstillingene for denne paletten er:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * Ny funksjon: Streng missing\\_value og/eller-_FillValue
Hvis en streng variabel definerer en missing\\_value og/eller__Filleverdi, ERDDAP™ vil nå fjerne disse verdiene fra dataene og erstatte dem med en tom streng, slik at manglende verdier vises som tomme strenger, som med andre datasett i ERDDAP .. Takk til Margaret O'Brien, LTER og EML.
         
    * Ny funksjon: Støtte til lokal tid
tidsstempelvariabler med kildedata fra strenger kan nå angi en tidssone via a " time\\_zone " attributt som fører ERDDAP™ å konvertere lokale tidssonekildetider (Noen i standard tid, noen i dagslys Spartid) i Zulu ganger. Listen over gyldige tidssonenavn er sannsynligvis identisk med listen i TZ-kolonnen i [denne tabellen](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) .. Standarden er - Zulu  ".. Vanlige amerikanske tidssoner er: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern. For tidsstempelvariabler med numeriske kildedata, kan du angi " time\\_zone " Attribut, men verdien må være Zulu " eller "UTC". Takk til Margaret O'Brien, LTER og EML.
         
    * NYE FEATURE: EDDTableFromAsciiFiles støtter nå semikolonseparerte filer
Og er smartere om å finne ut skillet. Takk til Margaret O'Brien, LTER og EML.
         
    * Ny funksjon: Hvis det er en betydelig feil i lastdatasett (store eller mindre, f.eks. manglende eller ugyldige datasets.xml dokument) , ERDDAP™ vil nå angi det i status.html, rett nedenfor "n Datasett Mislykkes å laste" som feil: mens du behandler datasets.xml : se log.txt for detaljer.
         
    * Ny funksjon: ERDDAP™ Leter etter foreldreløse.
Når ERDDAP™ Gjør en stor belastning Datasett, det ser nå etter foreldreløse datasett (Datasett som er i ERDDAP™ Men ikke i datasets.xml ) .. Hvis funnet, er de oppført i status.html, nedenfor "n Datasett Mislykkes å laste" som feil: n Orphan Datasett (Datasett i ERDDAP™ Men ikke i datasets.xml ) =...
Hvis du vil fjerne (loss) foreldreløse fra ERDDAP™ Du må legge til
        &lt;datasett type="_anyValidType_" datasetID ="_theDatasetID_" active="false" /&gt;
til datasets.xml inntil datasettet losses under de neste store lastdatasettene.
         
    * BUG FIX: Hvis et datasett hadde en numerisk tidsstempelvariabel med andre enheter enn "seconds since 1970-01-01T00:00:00Z" og med&lt;oppdaterEveryNMillis&gt;-systemet aktivt, tidsstempelvariabelens område ble satt feil når datasettet ble oppdatert. Takk til John Kerfoot.
         
    * BUG FIX: Hvis&lt;quick Restart&gt; var sant i setup.xml og du ba om data fra en EDDTableFrom... Fildatasett som brukes&lt;oppdaterEveryNMillis&gt;, den første forespørselen til datasettet ville mislykkes, men påfølgende forespørsler ville lykkes. Første forespørsel mislykkes. Takk til John Kerfoot.
         
    * BUG FIX: Genererer DatasetsXml.sh og .bat fungerte ikke med &gt;9 parametere på kommandolinjen. Nå gjør de det. Takk til John Kerfoot.
         
    * BUG FIX: Den nye EDDTableFromMultidimNcFiles fjerner ikke konsekvent etterfølgende mellomrom fra strenger. Nå gjør det det. Dette påvirket ARGO-filer. Takk til Kevin O'Brien og Roland Schweitzer.
         
    * BUG FIX: All tilgang til fjernkontrollen DAP Tjenester initieres nå av mer moderne kode. Dette løser errortilkoblingen lukket" feil når du får tilgang til noen EDDTableFromErddap datasett. Takk til Kevin O'Brien.
         
    * BUG FIX: håndtering av orderBy ... () og tydelig () er nå tilbake til måten de var før de siste endringene: en gitt forespørsel kan ha flere orderBy ... () og/eller en distinkt () filter; ERDDAP™ vil håndtere dem i den rekkefølgen de er angitt. Takk til David Karuga.
         
    * BUG FIX: Hvis datasettet er EDDTableFromDatabase og en spørring har [sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) og/eller [sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) Da kan databasen (avhengig av innstillinger i datasets.xml ) Delvis eller fullstendig håndtak **Bare den første**   orderBy .. () eller adskilt () .. Takk til David Karuga.
         
    * BUG FIX: Den nylige ekstra prosent-kodningen forårsaket problemer med noen spørsmål til .nc CF-filer, f.eks. "HTTP-status 500 - Spørringsfeil: variabel=stasjon er oppført to ganger i resultatvariabler- Takk til Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFiles hadde problemer med å laste om et datasett når en av kolonnene var en ekte tegnkolonne. Takk til Roland Schweitzer.
         
    * BUG FIX: EDDGrid FraNcFiles Utpakket nå konverterer også missing\\_value og \\_FallValue til standardverdier slik at filer med ulike verdier kan aggregeres. På grunn av denne endringen etter at du har installert denne nye versjonen av ERDDAP™ Vennligst sett en [hard Flag](/docs/server-admin/additional-information#hard-flag) For hver EDDGrid FraNcFiles Upakket datasett i din ERDDAP ..
         
    * IMPROVED: EDDTableFromNcCFFiles kan nå håndtere filer som har flere prøver\\_dimensions. Et gitt datasett må bare bruke variabler som bruker en av prøve-_dimensioner. Takk til Ajay Krishnan.
         
    * IMPROVED: For EDDTableFra...Filer,&lt;SortFilesBySourceNames&gt; Nå tillater kommaseparert (Anbefalt) eller romdelte lister over variable kildenavn. I begge tilfeller kan individuelle variable navn være omgitt av doble sitater, f.eks. hvis navnet har et indre rom.

## Versjon 1.72{#version-172} 
 (utgitt 2016-05-12) 

*    **Nye funksjoner (for brukere) :)** Ingen.
     
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Ny EDDTableFraMultidimNcFiler [EDDTableFraMultidimNcFiler](/docs/server-admin/datasets#eddtablefrommultidimncfiles) er et nytt alternativ til EDDTableFromNcFiles. Det er utformet for å håndtere grupper av filer med flere variabler med delte dimensjoner, f.eks. var1 \\[ a \\]  \\[ b \\] , var2 \\[ a \\] , var3 \\[ b \\] SkalarVar. Takket være Argo-prosjektet, Aurélie Briand og Roland Schweitzer.
    * BUG FIX: ERDDAP™   (via FileVisitorDNLS og FileVistorSubdir klasser) Nå følger symbolske lenker på Linux. ERDDAP™ Følger fortsatt ikke .lnk på Windows.
    * BUG FIX av feil introdusert i 1.70: distinkt + orderBy Det er ikke tillatt sammen i én anmodning. Nå er de igjen. De er ikke gjensidig eksklusive/redundant. Takk til David Karuga.
    * Endre til datasets.xml svartliste over IP-adresser:
IP v4-adresser synes å ERDDAP™ som 4 periodedelte heksetall.
Jeg tror IP v6-adresser vises som 8 kolondelte heksetall.
Så ERDDAP™ nå støtter koloner i IP-adresser i den listen og :* på slutten av listen for å blokkere en rekke adresser.
    * IMPROVED: ERDDAP™ Nå bruker NetcdfFileWriter å skrive .nc filer i stedet for den utdaterte NetcdfFileWriterable. Det bør ikke være noen tydelig endring i de resulterende filene. Dette åpner muligheten til å gjøre store .nc filer som bruker .nc 3 64bit utvidelser. Hvis du ønsker det, vennligst send en forespørsel til erd.data at noaa.gov ..
    * IMPROVED: Mange av koblingene til eksterne nettsteder var utdatert. Nå er de oppdaterte og bruk https: i stedet for http Når det er mulig.
    * Mange små endringer.

## Versjon 1.70{#version-170} 
 (utgitt 2016-04-15) 

*    **Nye funksjoner (for brukere) :)** Ingen.
     
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** Nedenfor er det flere anbefalte endringer i dokumentasjonen i config.xml-filen din.
Vennligst gjør disse endringene nå.
30 minutters arbeid nå kan spare deg timer med forvirring i fremtiden.
    * Feilretting: Problemet var at forespørsler som ble omdirigert til fjerntliggende ERDDAP mislykkes med et ugyldig tegn | \"feilmelding. Dette skjedde bare med nylige versjoner av Tomcat. Takk til Rusty Holleman, Conor Delaney og Roy Mendelssohn.
    * Feilretting: ERDDAP™ bruker nå en oppdatert versjon av netcdf-java (Det er en lang historie) som inkluderer oppdatert støtte for NcML, som løser problemet med NcML LogicalReduce som ikke fungerer som forventet. Det kan være noen små endringer i metadata som ERDDAP™ Leser via netcdf-java fra .nc , .hdf , .grib, og .bufr filer. Takket være Favio Medrano.
    * Den nye [EDDTable](/docs/server-admin/datasets#eddtableaggregaterows) lar deg lage et sammenslått EDDTable-datasett fra to eller flere EDDTable-datasett som har de samme datavariabler som bruker de samme enhetene. Takk til Kevin O'Brien.
    * Nye alternativer for EDDTableFromDatabase ( [sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) og [sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) ) la deg angi om ERDDAP™ , databasen eller begge deler, håndtere distinkt og orderBy   (Alle varianter) Begrensninger. Takk til David Karuga.
    * Du kan nå gjøre et privat datasetts grafer og metadata tilgjengelige for publikum via det nye [&lt;graferTilgjengeligTil&gt;offentlig&lt;/bilderTilgang til&gt;] (/docs/server-admin/datasett) Tag. Takk til Emanuele Lombardi.
    * Nå, hvis en streng passert til Generer datasett Xml eller DasDds er omgitt av dobbel sitater, det er usitert (Som om det er en JSON-streng) .. Takk til John Kerfoot og Melanie Abecasis.
    * Opprett datasett Xml støtter nå " standard" for å få standarden og " ingenting" for å få en tom streng (De jobber med eller uten sitater) .. Dette løser noen problemer relatert til å passere tomme strenger.
    * Nå i Generer Datasett Xml, for alle EDDGrid Fra Filer og EDDTable FraFiles datasett, hvis prøven Filnavn du oppgir er " (den tomme strengen) , vil det bruke den siste matchende filenName fra katalogen + regulær + rekursiv=true.
    * Oppdatert: DisplayInBrowser-koden som brukes til å vise resultatene av GeneralDatasetsXml og DasDds på Linux-datamaskiner var utdatert og ga en merkelig melding om Netscape. Nå bruker dette et moderne Linux-verktøy: xdg-open. Takk til Melanie Abecassis.
    * Den allDatasets Datasett har nå "files" kolonne, som indikerer basisadressen til / filer-lenken (Hvis det er en) for datasettet.
    * Øk den generelle sikkerheten til din ERDDAP™ ved å endre tillatelsene knyttet til Tomcat-katalogen og den store ParentDirectory:
         (De faktiske kommandoene nedenfor er for Linux. For andre OSs gjøre analoge endringer.) 
        * Endregroupgruppen" til å være tomcat, ditt brukernavn eller navnet på en liten gruppe som inkluderer tomcat og alle administratorene til Tomcat/ ERDDAP f.eks.
chgrp -R _ din brukerName_ apache-tomcat-_8.0.23_
chgrp-R _ din BrukerName bigParentDirectory_
        * Endre tillatelser slik at tomcat og gruppen har lest, skrevet, utført privilegier, f.eks.
chmod -R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _bigParentDirectory_
        * Fjern brukerens tillatelser til å lese, skrive eller utføre:
chmod -R o-rwx apache-tomcat-_8.0.23_
chmod-R o-rwx _ bigParentDirectory_
Dette er viktig, fordi det hindrer andre brukere i å lese eventuelt sensitiv informasjon i ERDDAP™ oppsettsfiler, loggfiler og filer med informasjon om private datasett.
    * Autentiserings-/loginsystemet ble revidert. Takket være Thomas Gardner, Emanuele Lombardi og den amerikanske regjeringens nye [HTTPS-Bare standard](https://home.dotgov.gov/management/preloading/dotgovhttps/) ..
        * Autentisering=openid-alternativet ble fjernet. Det var utdatert.
        * Den nye, anbefalte, [autentisering=google](/docs/server-admin/additional-information#google) alternativet bruker Google Logg inn (basert på OAuth 2.0) å tillate alle med en Google-konto (inkludert Google-kontoer som @noaa.gov ) å logge inn.
        * Det nye, [autentisering=email](/docs/server-admin/additional-information#email) alternativet er en sikkerhetskopi for autentisering=google. Dette gjør det mulig for brukere å&lt;user&gt; tag in datasets.xml å logge på ved å sende dem en e-post med en spesiell lenke.
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

        * I setup.xml, vennligst legg til dette nedenfor&lt;autentisering&gt; Merke
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

        * Nå kan brukere som ikke er logget inn bruke http eller https URLs (hvis du har satt opp&lt;baseHttpsUrl&gt; i setup.xml). Takket være den amerikanske regjeringens nye [HTTPS-Bare standard](https://https.cio.gov/) ..
        * Nå kan du oppmuntre alle brukere til å bruke https   (ikke http ) ved å sette&lt;baseUrl&gt; å være en https URL. For å tvinge brukerne til å bruke https , må du også gjøre endringer i ditt Apache/Tomcat-oppsett for å blokkere ikke- https Tilgang. Takket være den amerikanske regjeringens nye [HTTPS-Bare standard](https://https.cio.gov/) ..
            
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
    * Spesielt når du først setter opp din ERDDAP Du kan nå fortelle ERDDAP™ Ikke prøv å abonnere på fjernkontrollen ERDDAP™ Datasett. Takk til Filipe Rocha Freire.
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
Hvis oppsettet ditt ikke bruker en sikker tilkobling til e-postserveren, vennligst gjør endringene for å gjøre det slik.
    * I din datasets.xml Legg til denne linjen i beskrivelsen av&lt;emailBlacklist&gt; i din datasets.xml :)
Du kan bruke navnet "\\*" å vise et helt domene, f.eks.\\*@example.com .
    * Siden endringen til loggføringssystemet i v1.66, er loggfilen aldri oppdatert. Det er alltid meldinger eller deler av meldinger som venter på å bli skrevet til loggfilen. Nå kan du gjøre det oppdatert (For et øyeblikk) ved å se din ERDDAP Nettsiden til status på http://_your.domain.org_/erddap/status.html ..
    * HashDigest...
    * En liten endring (til String2.kanonisk) Det bør bidra til å holde ting i bevegelse raskt når ERDDAP™ er veldig travel og bedre håndtere et stort antall datasett.
    * Sterkt Anbefalt: Slutt å bruke&lt;convertToPublicSourceUrl&gt; i datasets.xml å konvertere et IP-nummer i et datasett&lt; sourceUrl &gt; (f.eks. http://192.168.#.#/ ) i et domenenavn (f.eks. http :my.domain.org/) .. Fra nå av, nye abonnementer på http://localhost , http://127.0.0.1 , og http://192.168.#.# URLS blir ikke tillatt av sikkerhetsgrunner. Bruk alltid det offentlige domenenavnet i&lt; sourceUrl &gt; tag (om nødvendig på grunn av DNS-problemer) Du kan bruke [/etc/hosts-bordet på serveren din](https://linux.die.net/man/5/hosts) å løse problemet ved å konvertere lokale domenenavn til IP-numre uten å bruke en DNS-server. Du kan teste om et gitt domenenavn blir riktig løst ved å bruke
ping _some.domain.name_
    * I genererDatasets.xml, for eksterne datasett (f.eks. fra en TREDDS-server) , den automatisk genererte datasetID S er uendret for de fleste domener. For noen få domener, den første delen (dvs. navnet) av den automatisk genererte datasetID Det blir litt annerledes. Navn som hadde én del er mer sannsynlig å ha to deler. For eksempel datasett fra http://oos.soest.hawaii.edu Tidligere førte til datasetID det startet med hawaii\\_, men nå føre til datasetID det starter med hawaii\\_soest__. Hvis dette forårsaker problemer for deg, vennligst send meg e-post. Det kan være arbeid rundt.
    * Cassandra driveren ble oppdatert til cassandra-driver-core-3.0.0.jar og dermed Cassandra v3. EDDTableFromCassandra ikke dra nytte av noen nye funksjoner i Cassandra v3. Indekser i Cassandra kan nå være mer komplekse, men ERDDAP™ fortsatt bruker Cassandra v2 indeksmodell, som antar at en indeksert kolonne kan direkte bli queried med '=' Begrensninger. Opprett datasett Xml for EDDTableFromCassandra registrerer ikke lenger kolonner med indekser; Hvis en indeks er enkel, må du angi den i datasets.xml for hånd. Hvis du trenger støtte for mer komplekse indekser eller andre nye funksjoner, vennligst e-post erd.data at noaa.gov ..
&#33;&#33;&#33; Hvis du fortsatt bruker Cassandra 2.x, kan du fortsette å bruke ERDDAP™ v1.68 til du oppgraderer til å bruke Cassandra 3.x.
    * Jars og Classpath -- Nesten alle inkluderte tredjepart .jar-filer ble oppdatert til sine nyeste versjoner.
        * slf4j.jar ble lagt til /lib og klassestien.
        * Joid. krukke og tsik. krukken ble fjernet fra /lib og klassestien.
        * Hvis du får feilmeldinger om klasser som ikke finnes når du kompilerer eller kjører ERDDAP™ eller et av verktøyene, sammenlign kommandolinjens klassesti til ERDDAP 's [Nåværende klassesti](/docs/contributing/programmer-guide#development-environment) å finne ut hvilke .jars mangler fra klassen din.

## Versjon 1.68{#version-168} 
 (utgitt 2016-02-08) 

*    **Nye funksjoner (for brukere) :)** Ingen.
     
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    *    [ EDDGrid FraFiles Aggregation via Filnavn eller Global Metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) --
Alle variasjoner av EDDGrid FraFiles kan nå samle en gruppe filer ved å legge til en ny venstrefleste dimensjon, vanligvis tid, basert på en verdi som stammer fra hvert filnamn eller fra verdien av en global attributt som er i hver fil.
    * Vi har tidligere foreslått at du vil opprette en EDDGrid FraErddap datasett i din datasets.xml som referert til og forbeholdt jplMU RSS T datasett i vår ERDDAP .. Siden det nå er en nyere versjon av det datasettet, er det datasettet nå foreldet. Hvis du har det datasettet i din ERDDAP™ Legg til dette nye datasettet
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Hvis du vil fjerne den gamle jplMU RSS T datasett fra din ERDDAP™   (Det er ditt valg) Endre sin aktive innstilling fra "true" til "falske".
    * Feilretting: Vennligst sjekk BigParentDirectory som du spesifisert i config.xml. Hvis du ikke satte en skråstrek på slutten av&lt;bigParentDirectory&gt; navn, deretter ERDDAP™ vil ha opprettet flere kataloger ved å legge til ord direkte til det navnet du oppgav, i stedet for å opprette underkataloger. Starter med versjon 1.68, ERDDAP™ Legg til en skråstrek til slutten av mappenavnet hvis du ikke angir en. Så hvis du tidligere ikke angitt en skråstrek på slutten, så når du installerer ERDDAP™ v1.68 du må flytte og omdøpe disse mappene **etter** Du stenger den gamle ERDDAP™ og **Før** Du starter den nye ERDDAP .. For eksempel, hvis du feilaktig spesifiserte bigParentDirectory som /home/erddapBPD (ingen etterfølgende skråstrek) og ERDDAP™ har feilaktig opprettet mapper som
/hjemme/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/hjemme/erddapBPDFlag
/home/erddapBPDlogs
/hjemme/erddapBPDlucen
og en fil som heter /home/erddapBPD subscriptionsV1.txt
så må du flytte og omdøbe dem til å være
/hjemme/erddapBPD/kache
/home/erddapBPD/kopi
/hjemme/erddapBPD/datasett
/hjem/erddapBPD/flag
/home/erddapBPD/logger
/hjemme/erddapBPD/lucen
og /home/erddapBPD/subscriptionsV1.txt
    * Feilretting: Det var feil i EDDGrid LonPM180 i ERDDAP™ v1.66 som skjedde når barnedatasettet er et EDDGrid Fra Erddap.
    * Feilretting: Det var en feil i EDDGrid Fra Filer og EDDTable FraFiles in ERDDAP™ v1.66 som forårsaket&lt;oppdaterEveryNMillis&gt; for å bli ignorert første gang datasettet ble lastet inn etter en omstart.
    * Feilretting/ny funksjon: Hvis et barnedatasett i EDDGrid Aggregate EDDGrid Oppfattet. EDDGrid fra EDDTable, EDDGrid LonPM180 EDDGrid SideBySide, EDDTableCopy eller EDDTableFra EDDGrid er en ...FraErddap datasett, som forelderdatasett nå abonnerer på det underliggende ERDDAP™ Datasett. Hvis den underliggende ERDDAP™ Datasett er i det samme ERDDAP™ , abonnementet og valideringen gjøres direkte; du vil ikke få en e-post som ber deg om å validere abonnementet. Ellers, hvis abonnementssystemet for din ERDDAP™ er slått av, satt&lt;reloadEveryNMinutes&gt; innstilling for foreldredatasettet til et lite tall (60?) For å holde seg oppdatert.
    * Feilretting/ny funksjon: Hvis et barnedatasett i EDDGrid Aggregate EDDGrid Oppfattet. EDDGrid fra EDDTable, EDDGrid LonPM180 EDDGrid SideBySide, EDDTableCopy eller EDDTableFra EDDGrid har aktiv ="falsk", at barnedatasettet nå er hoppet over.

## Versjon 1.66{#version-166} 
 (utgitt 2016-01-19) 

*    **Nye funksjoner (for brukere) :)** 
    * Grafer (ikke kart) kan nå ha synkende verdier på aksene. For å få dette når du bruker en Make A Graph-webside, endrer du ny Y-akse : stigende innstilling (standard) til fallende. Eller, i en URL som ber om en graf, bruk den nye valgfrie 3. \" | 'parameteren for [&.x Område og/eller &. yRange brytere](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) som ikke kan være noe (standard) , sant eller t for å få stigende verdier, eller bruk falske eller f for å få synkende verdier. Den sanne | Falske verdier er ufølsomme. Takket være Chris Fullilove, John Kerfoot, Luke Campbell og Cara Wilson.
    * Brukere kan nå angi bakgrunnsfargen for grafer ved å legge til en &.bgColor=0x_ AARRGGBB_ bytte til URL som krever grafen. Se .bgColor i avsnittet Graphics Commands i [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) og [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) dokumentasjon. Takk til John Kerfoot og Luke Campbell.
    * For tabellbaserte datasett kan begrensninger nå referere til min (_noen variabelName_) eller max (_noen variabelName_) .. Se [min () og max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) .. Takk til John Kerfoot.
    * For tabelldatasett, tidsbegrensninger som brukes [nå](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) kan nå angi tidsenheter av millisekunder eller millis.
    * En forespørsel om et bilde av et tabelldatasett gjør nå et kart (ikke en graf) dersom x og y-variabler er lengdegradslignende og breddegradslignende variabler (kompatible enheter) .. Takk til Rich Signell.
    * Feilretting: Tidsaksemerker og flåter hadde noen ganger merkelige uregelmessigheter når du ber om flere grafer samtidig (f.eks. på en nettside) .. Problemet var en feil i SGT-grafikkbiblioteket som ERDDAP™ bruk (En variabel var statisk - det skulle ikke ha vært) .. Takk til Bradford Butman.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Det er en sikkerhetsrisiko å sette e-postpassord i en vanlig tekstfil som setup.xml. For å redusere problemet anbefaler vi sterkt at du:
        1. Sett opp en e-postkonto bare for ERDDAP Bruk, for eksempel erddap@yourInstitution.org . Dette har også andre fordeler; spesielt mer enn én ERDDAP™ administrator kan da gis tilgang til den e-postkontoen.
        2. Gjør tillatelsene til config.xml-filen rw (Les+write) for brukeren som vil kjøre Tomcat og ERDDAP™   (Bruker=tomcat?) Ingen tillatelser (Les eller skriv ikke) for gruppen og andre brukere. Takk til Filipe Rocha Freire.
    * Den nye [ArkivADataset](/docs/server-admin/additional-information#archiveadataset) verktøy forenkler å lage en .tar  .gz arkiv med en undergruppe av et datasett i et format som er egnet for arkivering (særlig ved NOAA NCEIs) .. Dette bør være nyttig for mange ERDDAP™ administratorer i mange situasjoner, men spesielt for grupper i NOAA ..
    * Den nye type datasett [ EDDGrid FraNcFilesUpakket](/docs/server-admin/datasets#eddgridfromncfilesunpacked) er en variant av EDDGrid Fra NcFiles. Forskjellen er at denne klassen pakker ut hver datafil før EDDGrid FraFiles ser på filene:
        
        * Den pakker pakkede variabler som bruker scale\\_factor og/eller add\\_offset ..
        * Det fremmer heltallsvariabler som har -_Unsigned=sanne attributter til en større heltallsdatatype slik at verdiene vises som de udefinerte verdiene. For eksempel en__Unsigned=true byte (8 bit) Variabel blir en signert kort (16 bit) Variabel.
        * Den konverterer \\_FillValue og missing\\_value Verdier som er NaNs (eller MAX-_VALUE for heltallsdatatyper) ..
        
Den store fordelen med denne klassen er at den gir en måte å håndtere ulike verdier på scale\\_factor , add\\_offset ,_FallValue, eller missing\\_value i ulike filer i en samling. Ellers må du bruke et verktøy som [NcML](/docs/server-admin/datasets#ncml-files) eller [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) å endre hver fil for å fjerne forskjellene slik at filene kan håndteres av EDDGrid Fra NcFiles. For at denne klassen skal fungere riktig, må filene følge CF-standardene for de relaterte attributtene. Takk til Philippe Makowski.
    * Den nye type datasett [ EDDGrid LonPM180](/docs/server-admin/datasets#eddgridlonpm180) lar deg endre datasett som har noen lengdeverdier større enn 180 (f.eks. området 0 til 360) i datasett med lengdegradsverdier innenfor området -180 til 180 (Longitude Plus eller Minus 180, dermed navnet) .. Den store fordelen med å tilby datasett med lengdegradsverdier i området -180 til 180 er at OGC Tjenester (f.eks. WMS ) kreve lengdeverdier i dette området. Takket være Lynne Tablewski, Fabien Guichard, Philippe Makowski og Martin Spel.
2016-01-26 Oppdater: Eek&#33; Dette har en feil som oppstår når barnedatasettet er en EDDGrid FraErddap som refererer til et datasett i det samme ERDDAP .. Denne feilen er fikset i ERDDAP™ v1.68.
    * I [Genererer DatasetsXml](/docs/server-admin/datasets#generatedatasetsxml) En ny type spesialdatasett, EDDGrid LonPM180FraErddapCatalog, lar deg generere datasets.xml for EDDGrid LonPM180 datasett fra alle EDDGrid Datasett i et ERDDAP som har noen lengdeverdier større enn 180.
    * For alle EDDGrid Datasett, i datasets.xml Du kan nå bruke valgfrie
[&lt;tilgjengelig Via WMS &gt;true | falsk&lt;/ tilgjengelig Via WMS &gt;] (/docs/server-admin/datasett#tilgjengeligeviawms)   (standard=sann) .. Å sette dette til falskt tvangsdeaktiverer WMS Tjeneste for dette datasettet. Hvis sant, kan datasettet fortsatt ikke være tilgjengelig via WMS av andre grunner (For eksempel, ingen lat eller lon akser) .. Dette er spesielt nyttig for datasett som eksisterer på egen hånd og pakket inn av EDDGrid LonPM180, slik at bare LonPM180-versjonen er tilgjengelig via WMS ..
    * I setup.xml kan du angi en annen standardfarge for bakgrunnen av grafer. Fargen er spesifisert som en 8-siffers heksadesimal verdi i form 0x_AARRGGBB_, hvor AA, RR, GG og BB er åpenhet, rød, grønn og blå komponenter, henholdsvis spesifisert som 2-sifferensielt heksadesimale tall. Legg merke til at lerretet alltid er gjennomsiktig hvitt, så a (Semi -) gjennomsiktig graf bakgrunnsfarge blandes inn i det hvite lerret. Standarden er lysblå:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Takk til John Kerfoot og Luke Campbell.
    * I setup.xml kan du nå angi maksimal størrelse for [loggfil](/docs/server-admin/additional-information#log)   (Når det endres navn på å logge. Txt. Tidligere og ny logg. txt opprettes) I Megabytes. Minimum tillatt er 1. Det maksimale tillatte er 2000. Standard er 20 (MB) .. For eksempel:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * I datasets.xml , [&lt;fgdcFile&gt;] (/docs/server-admin/datasett#fgdcfile) eller [&lt;iso19115File&gt;] (/docs/server-admin/datasett#iso19115file) kan nå være en lokal fil (som før) eller en URL (som vil bli lastet ned så det er en lokal kopi) .. Hvis ERDDAP™ kan ikke laste ned filen, lastingen av datasettet vil fortsette, men datasettet vil ikke ha en fgdc eller iso19115-fil.
    *    EDDGrid Fra Filer og EDDTable FraFiles datasett kan nå gjøre en rask restart (systemet som ERDDAP™ prøver å bruke når datasett først lastes når ERDDAP™ er omstartet) .. Denne hastigheten starter på nytt ERDDAP ..
2016-01-26 Oppdater: Eek&#33; Dette har en feil som forårsaker&lt;oppdaterEveryNMillis&gt; for å bli ignorert første gang datasettet lastes inn etter en omstart. Denne feilen er fikset i ERDDAP™ v1.68.
    * En generell forbedring av det raske restartsystemet tillater ERDDAP™ å laste datasett raskere når ERDDAP™ er omstartet.
    * Alle EDDGrid Fra Filer og EDDTable FraFiles underklasser aksepterer nå en ny&lt;pathRegex&gt; tag, vanligvis spesifisert nedenfor&lt;Kontinuerlig &gt; Hvis rekursivt er " sant", bare fulle underkatalogstier som passer til banenRegex (standard=".*") vil bli akseptert. På samme måte a&lt; sourceUrl S&gt; tag i en EDDGrid AggregateExistingDimension kan nå inneholde en stiRegex-attributt (standard=".*") ..
    * Standard for&lt;delvisRequestMaxbytes&gt; i setup.xml er nå 4900000000 (~490 MB) .. Dette unngår noen problemer/tid relatert til å få data fra TREDDS dataservere. Takk til Leslie Thorne.
    * En liten endring i loggsystemet bør tillate ERDDAP™ For å være mer responsiv når det er veldig, veldig opptatt. Informasjon er nå skrevet til loggfilen på diskstasjonen i ganske store deler. Fordelen er at dette er veldig effektivt -- ERDDAP™ Vil aldri blokkere venter på at informasjonen skal skrives til loggfilen. Ulempen er at loggen nesten alltid vil ende med en delvis melding, som ikke vil bli fullført før neste del er skrevet.
    * Feilretting knyttet til iotify og [&lt;OppdaterEveryNMillis&gt;] (/docs/server-admin/datasett) system for EDDGrid Fra Filer og EDDTable FraFiles datasett: Det er ikke lenger nødvendig å spesifisere en stor fs.inotify.max\\_user\\_watches eller fs.inotify.max\\_user\\_instances. Det er en feil i Java som forårsaker deler av Java 's inotify/WatchDirectory system for å ikke bli søppel samlet når de er finalisert; til slutt, antall zombie inotify klokker eller tilfeller ville overstige det maksimale antall angitt. ERDDAP™ Nå jobber rundt dette Java bug.
Også antall iotify tråder er oppført på status.html nettsiden, slik at du kan holde et øye med bruken. Vanligvis er det 1 inotify tråd per EDDGrid Fra Filer og EDDTable FraFiles datasett.
    * Feilretting: Mange steder, i stedet for at en feil blir kastet på nytt, ble det generert en ny feil som bare inkluderte en kort versjon av den opprinnelige feilmeldingen og uten stabelspor. Nå, når en ny feil genereres, inkluderer den riktig hele det originale unntaket for eksempel, kaste ny unntak (En ny melding", e) ;
Takk til Susan Perkins.
    * Feilrettelse: til nylig (V1.64?) Hvis en .../ datasetID URL ble bedt om, ERDDAP™ vil legge til .html til URL. I v1.64 mislyktes dette (en feil formatert URL-adresse ble generert og deretter mislyktes) .. Nå virker det igjen. Takk til Chris Fullilove.

## Versjon 1.64{#version-164} 
 (utgitt 2015-08-19) 

*    **Nye funksjoner (for brukere) :)** 
    * Det er nå veiledning for tilgang til passordbeskyttet privat ERDDAP™ Datasett ( https:// ) via curl og Python .. Se [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) og [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) instruksjoner.
Takket være Emilio Mayorga fra NANOOS og Paul Janecek fra Spyglass Technologies.
         
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    *    ERDDAP™ Nå krever Java 1.8+.
         Java 1.7 nådde sin [Ende på livet](https://www.oracle.com/technetwork/java/eol-135779.html)   (ikke flere sikkerhetsoppdateringer) i april 2015. Denne versjonen av ERDDAP™ vil ikke fungere med versjoner av Java Under 1.8. Hvis du oppdaterer fra Java 1,7x (eller tidligere) Du bør også oppdatere Tomcat. Se [ ERDDAP™ Sett opp instruksjoner](/docs/server-admin/deploy-install) for å laste ned lenker og råd.
    * Nytt skjema for dataleverandør.
Når en dataleverandør kommer til deg i håp om å legge til noen data til din ERDDAP™ Det kan være vanskelig og tidkrevende å samle inn alle de metadata som trengs for å legge til datasettet i ERDDAP .. Mange datakilder (for eksempel .csv-filer, Excel-filer, databaser) har ingen interne metadata, så ERDDAP™ har et nytt dataleverandørskjema som samler metadata fra dataleverandøren og gir dataleverandøren litt annen veiledning, inkludert omfattende veiledning for datainndatadatabaser. De innsendte opplysningene konverteres til datasets.xml format og deretter e-post til ERDDAP™ administrator (du) og skrevet (vedlagt) til bigParentDirectory/logs/dataProviderForm.log . Således, skjemaet halvautomatisk prosessen med å få et datasett inn i ERDDAP™ Men det ERDDAP™ Administratoren må fortsatt fullføre datasets.xml bit og håndtere å få datafilen (s) fra leverandøren eller tilkobling til databasen. For mer informasjon, se [Dataleverandør Beskrivelse av skjema](/docs/server-admin/datasets#data-provider-form) ..
    * Ny&lt;matchAxisNDigits&gt;
kan brukes av EDDGrid FraFiles (og dermed fra NcFiles og fra FlightIRFiles) , EDDGrid Aggregate EDDGrid Oppfattet og EDDGrid SideBySide-datasett for å angi hvor nøyaktig lik akseverdiene i ulike filer må være (Hvor mange siffer) : 0=ingen kontroll (Ikke bruk dette&#33;) , 1-18 for økende presisjon, eller 20 (standard) For nøyaktig likhet. For n=1-18, ERDDAP™ sikrer at de første n-sifferene med dobbeltverdier (eller (n+1) div 2 for flyteverdier) er like.
        &lt;matchAxisNDigits&gt; erstatter&lt;sikreAxisValuesAreEqual&gt;, som nå er foreldet. En verdi av \"true\" vil bli konvertert til matchAxisNDigits=20. En verdi av 'falsk' (Ikke gjør dette&#33;) vil bli konvertert til å matche AxisNDigits=0.
    *    EDDGrid Fra Filer og EDDTable FromFiles vil laste veldig sakte første gang du bruker denne versjonen av ERDDAP ..
         ERDDAP™ lagrer nå den interne filinformasjonen litt annerledes, så den interne filtabellen for hvert av disse datasettene må gjenoppbygges. Så ikke bekymre deg. Ingenting er galt. Det er en gang ting.
    * Fjernkildefiler
         EDDGrid FraNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles lar nå filene være eksterne filer i en katalog som er tilgjengelig av http://   (og sannsynligvis https:// og ftp://, men de er ikke testet) Hvis fjernserveren støtter [Områdeforespørsler](https://en.wikipedia.org/wiki/Byte_serving) i forespørselshodet. THREDDS og Amazon S3 støtteområde forespørsler, Hyrax Det gjør ikke. Dette systemet lar deg få tilgang til data i eksterne filer uten å laste ned filene (som er nyttig hvis fjernfilene er for voluminøse) , men tilgang til disse filene vil være langt langsommere enn tilgang til lokale filer eller til og med til en ekstern OPeNDAP kilde.
Dette inkluderer "files" i en Amazon S3 bøtte siden de er tilgjengelige via http:// .. Hvis S3-objektnavnene er som filnavn (med intern / er som et Linux katalog tre) , ERDDAP™ kan også gjøre filene tilgjengelige via ERDDAP 's "files" system. For at dette skal fungere, må S3 legitimasjon være i ~/.aws/crdentials (Linux, OS X eller Unix) , eller C:\\Brukere\\USERNAME\\.aws\\kreditiva (på Windows) på serveren med ERDDAP .. Se [Amazon SDK dokumentasjon](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) ..
    * Opprett datasett Xml har et nytt, uvanlig alternativ: EDDsFromFiles.
Dette vil gå gjennom et filsystem (selv et fjernsystem som en Amazon S3 hvis objektene har fillignende navn) og skape datasets.xml biter for en rekke datasett. Kilasjen kan variere. Dette fungerer bra hvis filene er organisert slik at alle datafilene i en gitt mappe (og underdirektørene) er egnet for ett datasett (f.eks. alle SST 1-dagers kompositter) .. Ellers (For eksempel, hvis en katalog inneholder noen SST-filer og noen Chlorophyll-a-filer) Dette virker dårlig, men kan fortsatt være nyttig.
    * Programmører: nye /lib .jar filer.
Hvis du kompilerer ERDDAP™ , vennligst merk de nye .jar-filene i classpath -cp parameteren som er oppført i ERDDAP™   [Programmers guide](/docs/contributing/programmer-guide) ..
    * hav\\_vann\\_praktisk
Hvis du bruker CF-standardnavnet sjø\\_vann\\_salinitet for enhver variabel, oppfordrer jeg deg til å bytte til sjø\\_vann\\_praktisk\\_salinitet som er tilgjengelig i [versjon 29 av CF Standard navnetabellen](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (og noen tidligere versjoner - jeg visste ikke det) .. Dette navnet indikerer at dette faktisk er en praktisk salinitetsverdi ved å bruke Practical Salinity Units   ( PSU ) I motsetning til en eldre g/kg-verdi. De kanoniske enhetene er forskjellige, men likevel utrolig uhjelpelig: 1 (Sannsynligvis antyder PSU /PSS-78) I motsetning til 1e-3 (Sannsynligvis betyr g/kg) for sjø\\_vann\\_salinitet. \\[ Hei, Unidata og CF: Vi identifiserer verdier som bruker andre skalaer, for eksempel Fahrenheit eller Celsius, via en enhetsstreng som er navnet på skalaen eller noen variasjon. Hvorfor kan vi ikke identifisere salinity enheter via deres skala, for eksempel PSS-78? Jeg vet: PSS-78 verdier er - enhetsløse - men det er en underforstått skala, ikke sant? Hvis jeg oppfinner en ny praktisk salinitetsskala der verdiene er 0,875 ganger PSS-78-verdiene, bør de kanoniske enhetene fortsatt være -- Hvordan kan en bruker fortelle dem fra hverandre? Enheter på 1e-3 og 1 er verken beskrivende eller nyttige for brukere som prøver å finne ut hva tallene indikerer. \\] 

## Versjon 1.62{#version-162} 
 (utgitt 2015-06-08) 

*    **Nye funksjoner (for brukere) :)** 
    * For EDDGrid datasett, brukere kan nå lage graftype: Overflate grafer med enhver kombinasjon av numeriske akser, ikke bare lengdegrad versus breddegrad. Dette lar deg gjøre x versus y (projisert) grafer og ulike [Hovmöller Diagram](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) f.eks. planlegging av lengdegrad versus dybde eller tid versus dybde. \\[ Merk: Hvis dybden er på Y-aksen, vil den sannsynligvis bli snudd fra det du vil. Beklager, det er ennå ikke et alternativ. \\] Takk til Cara Wilson og Lynn DeWitt.
    * Det er en ny [Oceanic/Atmospheric Akronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) som lar deg konvertere et felles oceanisk/atmosfærisk akronym til/fra et fullt navn.
    * Det er en ny [Oceanisk/atmosfærisk Variabel navn konvertering](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) som lar deg konvertere et felles oseanisk/atmosfærisk variabelnavn til/fra et fullt navn.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    *    Java Klubb
         Oracle Støtter ikke lenger (gir sikkerhetsfeilrettinger for)   Java 7. ERDDAP™ Fortsatt støtter Java 7, men gå til Java 8. Neste utgivelse av ERDDAP™ Kanskje vil kreve Java 8.
    *    valid\\_min /max/område
Tidligere og nå, hvis dataVariable hadde scale\\_factor og add\\_offset metadata, ERDDAP™ pakker ut dataverdiene og fjerner metadata. Tidligere, ERDDAP™ ikke endret / pakke noen valid\\_range , valid\\_min , valid\\_max Metadata (som vanligvis/bør inneholde pakkede verdier) av scale\\_factor og add\\_offset .. Nå gjør det det. Søk din ERDDAP™ For " gyldig\\_" og sørg for at alle variablene som har valid\\_range , valid\\_min , eller valid\\_max ha riktige verdier når datasettene vises i den nye versjonen av ERDDAP .. Se [ valid\\_range /min/max-dokumentasjon](/docs/server-admin/datasets#valid_range) ..
    * ACDD-1.3
Tidligere, ERDDAP™   (Spesielt generere datasett Xml) Brukt/anbefalt originalen (1.0) versjon av [ NetCDF Attributkonvensjon for datasett Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1) som er omtalt som Unidata Datasett Discovery v1.0" i de globale konvensjonene og Metadata\\_Conventions attributter. Nå anbefaler vi [ACDD versjon 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) som ble ratifisert i begynnelsen av 2015 og er omtalt som "ACDD-1.3". Heldigvis er ACDD-1.3 svært bakover kompatibel med versjon 1.0. Vi bekrefter at du [bytte til ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13) .. Det er ikke vanskelig.
    * Opprett datasett Xml attributter
Det var mange endringer for å forbedre&lt; addAttributes &gt; verdier foreslått av Genererer Datasett Xml for de globale konvensjonene, creator\\_name /email/url, nøkkelord, sammendrag og tittelattributter og for variabelen long\\_name attributt. Noen endringer er relatert til ny bruk av ACDD-1.3.
    * EDDTableFra SOS Datasett
med tilsetning av nye typer SOS servere og endringer i de gamle serverne, det blir vanskeligere for ERDDAP™ for å automatisk oppdage servertypen fra serverens svar. Bruk av [&lt;sosServerType&gt;] (/docs/server-admin/datasett#edtablefromsos-skeleton-xml)   (med en verdi av IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , eller whoi) Nå er det STRONGLET. Hvis noen av dine datasett av denne typen har problemer i den nye versjonen av ERDDAP , Prøv å kjøre om Genererer Datasett Xml til SOS server å generere en ny bit av datasets.xml for det datasettet. Opprett datasett Xml vil la deg prøve ut de forskjellige&lt;sosServerType&gt; alternativer til du finner den riktige for en gitt server. Hvis du fortsatt har problemer, vennligst gi meg beskjed om problemet du ser og URL-en til serveren og jeg vil prøve å hjelpe.
    * EDDTableFromFileNames datasett
Noen egenskaper som ble anbefalt addAttributes Nå er det kildeAttributes. Du trenger sannsynligvis ikke å endre noe for eksisterende datasett i din datasets.xml ..
    * Feilretting relatert til visse forespørsler til EDDTableFromNcCFFiles datasett.
Jeg tilsatte også et stort antall enhetstester til det eksisterende store antall enhetstester av de underliggende metodene. (Det er 100 scenarioer) .. Takk til Eli Hunter.
    * Feilretting/ små endringer i EDDGrid Fra Flightir.
Takk til Jonathan Lafite og Philippe Makowski
    * Feilretting: EDDGrid FraErddap fungerer nå selv om et fjerndatasett ikke har ioos\\_category variable attributter.
Takk til Kevin O'Brien.
    * Feilretting i .graf nettside for EDDGrid datasett når det kun er én aksevariabel med mer enn én verdi.
Takk til Charles Carleton.
    * Det var andre små forbedringer, endringer og feilrettinger.

## Versjon 1.60{#version-160} 
 (utgitt 2015-03-12) 

*    **Nye funksjoner (for brukere) :)** ingen
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * STRONGY REQUERED: Oppdater serverens [robots.txt](/docs/server-admin/additional-information#robotstxt) Fil å inkludere:
Avvis: /erddap/filer/
    * Inotiser problem og løsning:
På Linux datamaskiner, hvis du bruker&lt;OppdaterEveryNMillis&gt; med datasett med type= EDDGrid Fra Filer, EDDTableFra Filer, EDDGrid Kopier, EDDTableCopy eller deres underklasser, kan du se et problem der et datasett ikke lastes (Noen ganger eller konsekvent) med feilmeldingen: "IOException: Brukergrense for inotify tilfeller nådd eller for mange åpne filer". I så fall kan du løse dette problemet ved å ringe (som rot) :)
echo fs.inotify.max\\_user\\_watches=65536 | tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instrument=1024 | tee -a /etc/sysctl.conf
sysctl-p
Eller bruk høyere tall hvis problemet vedvarer. Standard for klokker er 8192. Standard for tilfeller er 128. \\[ UPDATE: Det er en feil i Java som forårsaker inotify tilfeller ikke samles inn. Dette problemet unngås i ERDDAP™ v1.66 og høyere. Så den bedre løsningen er å bytte til den nyeste versjonen av ERDDAP .. \\] 
    * NoSuchFileException Feilretting:
Det var en feil som kunne forårsake datasett av type= EDDGrid Fra Filer, EDDTableFra Filer, EDDGrid Kopier, EDDTableCopy, eller deres underklasser til ikke å laste noen ganger med feilen "NoSuchFileException: _someFileName_". Feilen er relatert til bruk av FileVisitor og ble introdusert i ERDDAP™ v1.56. Problemet er sjeldent og er mest sannsynlig å påvirke datasett med et stort antall ofte skiftende datafiler.
    * Det var små forbedringer, endringer og feilrettinger.

## Versjon 1.58{#version-158} 
 (utgitt 2015-02-25) 

*    **Nye funksjoner (for brukere) :)** 
    * Den nye [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) systemet lar deg bla gjennom et virtuelt filsystem og laste ned kildedatafiler fra mange ERDDAP™ Datasett. Den "files" Systemet er som standard aktivt, men ERDDAP™ administratorer kan deaktivere det ved å sette
```
        <filesActive>false</filesActive>  
```
i ERDDAP™ config.xml fil. Spesielt takket være Philippe Makowski, som fortsatte da jeg var langsom til å sette pris på skjønnheten i denne ideen.
    * tidsdestinasjon Max -- Tidligere hadde tidsvariabelen av EDDTable-datasett med nær sanntidsdata en destinasjonMax av NaN, som inneholdt at den maksimale tidsverdien for datasettet er nylig, men ikke nøyaktig kjent og endres ofte. Nå har destinasjonenMax en reell verdi, noe som indikerer den for tiden kjente siste gang. Mange datasett har kontinuerlig oppdatert data. ERDDAP™ støtter tilgang til de nyeste dataene, selv om det er etter den for tiden kjente siste gang. Merk at den nye [&lt;OppdaterEveryNMillis&gt;] (/docs/server-admin/datasett) støtte i EDDGrid Fra Filer og EDDTable FraFiles datasett oppdaterer tidsvariabelens destinasjonMax. En annen konsekvens av denne endringen er at datasetID = allDatasets Datasett inneholder nå den for tiden kjente siste gang i maxTime-kolonnene. Takk til John Kerfoot.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * STRONGY REQUERED: Oppdater serverens [robots.txt](/docs/server-admin/additional-information#robotstxt) Fil å inkludere:
Avvis: /filer/
Avvis: /erddap/filer/
    * Prøve datasets.xml -- I fjor anbefalte vi flere utmerkede datasett i kystklokken ERDDAP™ som du kan legge til i din ERDDAP™ Bare ved å legge til noen linjer til din datasets.xml .. Hvis du legger til erdVH-datasettene, må du bytte til de nyere erdVH2-datasettene:
        * Lag en kopi av alle erdVH-datasettene og endre kopieringen datasetID fra erdVH til erdVH2 og endre referansen sourceUrl fra ErdVH til ErdVH2....
        * Sett erdVH... datasett til aktiv="falsk".
    * Alle EDDGrid Fra Filer og EDDTable FraFiles underklasser støtter nå [&lt;tilgjengeligViaFiles&gt;] (/docs/server-admin/datasett#tilgjengelige filer) å gjøre kildedatafilene tilgjengelige via "files" systemer. Som standard er dette systemet avslått for hvert datasett. Du må legge til etiketten for å aktivere den. Takk til Philippe Makowski.
    * Alle EDDGrid Fra Filer og EDDTable FraFiles underklasser støtter nå [&lt;OppdaterEveryNMillis&gt;] (/docs/server-admin/datasett) .. Som standard er dette systemet avslått for hvert datasett. Du må legge til etiketten for å aktivere den. Takket være Dominic Fuller-Rowell og NGDC.
    * Den nye [EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames) oppretter et datasett fra informasjon om en gruppe filer i serverens filsystem, men det tjener ikke data fra inne i filene. Dette er for eksempel nyttig for å distribuere samlinger av bildefiler, lydfiler, videofiler, ordbehandlingsfiler og regnearkfiler. Dette fungerer hånd i hånd med den nye [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) system, slik at brukerne kan laste ned filene. Spesielt takket være Philippe Makowski, som fortsatte da jeg var langsom til å sette pris på skjønnheten i denne ideen.
    * Den nye [ EDDGrid FraEDDTable](/docs/server-admin/datasets#eddgridfromeddtable) lar deg konvertere en tabell datasett til et gitt datasett. Takk til Ocean Networks Canada.
    * Den nye [ EDDGrid Fra FlightIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles) aggregerer data fra en gruppe av lokale fusioner .gz Filer. EDDGrid Fra FlightIRFiles har forskjellen mellom å være den første delen av koden bidratt til ERDDAP .. Det ble gjort uten vår hjelp. Tre gleder og spesielt takket være Jonathan Lafite og Philippe Makowski fra R.Tech Engineering.
    * Det er en ny, valgfri setup.xml tag,&lt;enhetTestDataDir&gt;, som spesifiserer katalogen med enhetstestdatafiler som er tilgjengelige via et nytt GitHub-arkiv: [ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest) .. For eksempel:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Dette er ikke nyttig ennå, men er en del av trekket mot å gjøre så mange av enhetens tester som mulig. Takk til Terry Rankine.
    * Det var mange små forbedringer, endringer og feilrettinger.

## Versjon 1.56{#version-156} 
 (utgitt 2014-12-16) 

*    **Nye funksjoner (for brukere) :)**   (Ingen) 
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Du vet sikkert allerede om [ EDDGrid FraErddap](/docs/server-admin/datasets#eddfromerddap) og [EDDTableFraErddap](/docs/server-admin/datasets#eddfromerddap) som lar deg koble til datasett i andre ERDDAP og få dem til å vises i din ERDDAP .. Brukerforespørsler om faktiske data fra disse datasettene blir rutet usynlig til kilden ERDDAP™ , slik at dataene ikke strømmer gjennom systemet eller bruker båndbredden din. Det er nå en stor liste over anbefalte datasett i prøven datasets.xml i ErddapContent .zip .. Å inkludere dem i din ERDDAP™ Alt du trenger å gjøre er å kopiere og lime dem du vil inn i din datasets.xml .. Takk til Conor Delaney.
    * Hvis du kompilerer ERDDAP™ Du må legge til noe nytt. krukke filer til din [classpath-cp bryter](/docs/contributing/programmer-guide#development-environment) Javac og java.
    * Den nye [EDDTableFraCassandra](/docs/server-admin/datasets#eddtablefromcassandra) håndterer å få data fra [Cassandra](https://cassandra.apache.org/) .. Takk til Ocean Networks Canada.
    * Den nye [EDDTableFraKolumnarAsciiFiler](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) håndterer å få data fra ASCII-datafiler med faste breddekolonner. Takk til Philippe Makowski.
    * Alle EDDGrid Fra Filer og EDDTable FraFiles-underklasser bruker nå en ny metode, FileVisitor (lagt til i Java i 1,7) å samle inn informasjon om filene. Dette kan ikke ha noen fordel for den første samlingen av filinformasjon for et gitt datasett, men ser ut til å ha en stor fordel for påfølgende samlinger hvis det gjøres snart, mens OS fortsatt har informasjonen cached. Takk til NGDC.
        
Vi anbefaler fortsatt: Hvis et datasett har et stort antall filer (f.eks. &gt; 1000) , operativsystemet (og dermed EDDGrid Fra Filer og EDDTableFromFiler) vil fungere mye mer effektivt hvis du lagrer filene i en rekke underkataloger (én per år, eller en i måneden for datasett med svært hyppige filer) , slik at det aldri er et stort antall filer i en gitt katalog.
        
    * Flere små forbedringer til EDDTableFromAsciiFiles.
    * Noen forbedringer til EDDTableFromAsciiServiceNOS, spesielt for å få noen ekstra kolonner av informasjon fra kilden. Takk til Lynn DeWitt.
    * Noen små feilrettinger relatert til ISO 19115 som ERDDAP™ genererer. Takk til Anna Milan.

## Versjon 1.54{#version-154} 
 (utgitt 2014-10-24) 

*    **Nye funksjoner (for brukere) :)** 
    * Noen variabler fungerer nå med tiden med millisekunder presisjon, f.eks. 2014-10-24T16:41:22.485Z. Takk til Dominic Fuller-Rowell.
*    **Små endringer/Bug Fixes:** 
    * Feilretting: med en viss kombinasjon av omstendigheter, EDDGrid FraNcFile datasett returnerte data ved redusert presisjon (f.eks. flyter i stedet for dobbler) .. Dette kan bare påvirke dataverdier med &gt; 8 signifikante tall. Unnskyld. (Og det var en klassisk dataprogrammeringsfeil: ett feil tegn.) Takk til Dominic Fuller-Rowell.
    * Mange små endringer.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Griddap-datasett støtter nå tidsstempleaksevariabler og datavariabler (dvs. variabler med tidsverdier, men destinationName andre enn "time" ) .. Takk til Dominic Fuller-Rowell.
    *    ERDDAP™ nå riktig støtter millisekunder time\\_precision "1970-01-01T00:00:0.000Z". En intensjonell quirk: når du skriver tider til menneskelige-orienterte filer (f.eks. .tsv , .json , .xhtml ) , ERDDAP™ bruker den angitte time\\_precision Hvis det inkluderer sekunder og/eller desimale sekunder; ellers bruker det sekunder time\\_precision "1770-01-01T00:00:00Z" (for konsistens og baklengs kompatibilitet) .. Takk til Dominic Fuller-Rowell.
    *    EDDGrid FraNcFiles støtter nå lesingsstreng dataVariable S.
    *    .nc filer skrevet av griddap kan nå ha String dataVariable S.
    * Opprett datasett Xml inkluderer nå mer flush () ringer for å unngå problemet med informasjon som ikke blir skrevet til filene. Takk til Thierry Valero.
    * Dokumentasjonen for GenerationDatasetsXml ble forbedret, spesielt for å påpeke at -i-bryteren bare virker hvis du angir alle svarene på kommandolinjen (For eksempel skriptmodus) .. Og skriptmodus forklares. Takk til Thierry Valero.
    *    ERDDAP™ ikke lenger tillater to variabler i et datasett å ha det samme sourceName .. (Hvis noen gjorde det før, førte det sannsynligvis til feilmeldinger.) Som før, ERDDAP™ ikke tillater to variabler i et datasett å ha det samme destinationName ..

## Versjon 1.52{#version-152} 
 (utgitt 2014-10-03) 

*    **Nye funksjoner:**   (ingen) 
*    **Små endringer/Bug Fixes:** 
    * En annen (mindre) endring å gjøre ERDDAP™ raskere.
    * Forbedring av ISO 19115-filer som genereres av ERDDAP Legg til nylig anbefalt&lt;gmd: protocol&gt; - verdier (informasjon, søk, OPeNDAP :) OPeNDAP , ERDDAP :griddap, og ERDDAP :) tabledap ) Inne&lt;gmd:CI\\_OnlineResource&gt;. Takket være Derrick Snowden og John Maurer.
    * Mange små endringer.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Feilretting: GenerererDatasettsXml.sh og DasDds.sh var ikke i erddap.war for 1.48 og 1.50. Nå er de det. Takk til Thierry Valero.
    * Små endringer i noen hastighetstester i TestAll for å gjøre dem mindre utsatt for sjanse. Takk til Terry Rankine.

## Versjon 1.50{#version-150} 
 (utgitt 2014-09-06) 

*    **Nye funksjoner:**   (ingen) 
*    **Små endringer/Bug Fixes:** 
    * Dette ERDDAP™ Det bør være mye raskere enn nylige versjoner.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:**   (ingenting) 

## Versjon 1.48{#version-148} 
 (utgitt 2014-09-04) 

*    **Nye funksjoner:** 
    *    ERDDAP™ Nå alltid oppretter en tabell datasett, datasetID = allDatasets , som har en tabell med informasjon om alle datasett i dette ERDDAP .. Det kan spørs som alle andre tabelldatasett. Dette er et nyttig alternativ til det aktuelle systemet for å få informasjon om datasett programmatisk.
    * Det finnes to nye utgangsfiler for EDDTable og EDDGrid .csv0 og .tsv 0. De er komma- og fanedelte verdifiler som ikke har linjer med kolonnenavn eller enheter. Dataene starter på første linje. De er spesielt nyttige for skript som bare ønsker en bit informasjon fra ERDDAP ..
*    **Små endringer/Bug Fixes:** 
    * Kart kan nå gjøres til lengdegrader i området -720 til 720.
    * Den nye .nc ml responsfiltype er tilgjengelig for alle EDDGrid Datasett. Den returnerer [NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\-formatert beskrivelse av datasettet (lignende en kombinert .dds + .das) ..
    * Feilretting: Lagre tabelldata til en .nc filen var begrenset til 100.000 verdier per variabel. Nå er det bare begrenset til 2 GB total filstørrelse. Takk til Kevin O'Brien.
    * Feilretting: SaveAs Matlab Metoder sikrer nå at datasetID S konverteres til trygt Matlab Variable navn. Jeg anbefaler at du skaper datasetID s som er gyldige variable navn: starter med en bokstav og deretter bare ved hjelp av A-Z, a-z, 0-9 og \\_. Se [ datasetID ](/docs/server-admin/datasets#datasetid) .. Takk til Luke Campbell.
    * Feilretting i EDDTableFromDatabase: Med noen typer databaser, en NO-_ DATA-respons fra databasen førte til en meningsløs 30 andre forsinkelse i ERDDAP .. Takk til Greg Williams.
    * Feilretting: EDDGrid Lag en graf med graftype = linjer (eller markører eller markører og linjer) Tvinget x-aksevariabel til å være tid. Nå kan det være hvilken som helst akse. Takk til Lynn DeWitt.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * STRONGGY FORSLAG: Oppdater Java   
Denne versjonen av ERDDAP™ krever Java 7 eller høyere, men Java 7 vil nå slutten på livet i april 2015 (Snart&#33;) Nå er det god tid å bytte til Java 8. Så Java 8 er STRONGLET. Jeg tester med Java 8. Legg merke til at Java 6 nådde sitt livs slutt i februar 2013 (ikke flere sikkerhetsfeilrettinger&#33;) ..
    * STRONGLY FORSLAG: Oppdater Tomcat
Hvis du bruker Tomcat, må du bytte til den nyeste versjonen av Tomcat. Tomcat 8 er designet for å jobbe med Java 8.
    * " ERDDAP " Det er ikke lenger et akronym. Nå er det bare et navn. Jeg vil ikke at navnet skal markeres ERD .. Jeg vil ha ERDDAP™ å fremheve din institusjon og dine data.
    * PLEASE [tilpasse utseendet på din ERDDAP™ installasjon for å markere din institusjon og dine data](/docs/server-admin/deploy-install#customize) .. Med en times arbeid kan du gjøre fine forbedringer som vil vare for alltid.
    * I setup.xml, den&lt;VisDiagnosticInfo&gt; alternativet blir nå alltid ignorert og behandlet som om verdien var falsk.
KJØP: Fjern den&lt;displayDiagnosticInfo&gt; tag og relatert info fra oppsettet.xml.
    * I setup.xml, standard for&lt; drawLandMask &gt; var -over - men nå er det - under - som er en bedre generell standard (fungerer bra med alle datasett) ..
    * Generer DatasetsXml.sh og DadDds.sh Linux skriptene bruker nå bash i stedet for csh, og har utvidelsen .sh. Takk til Emilio Mayorga
    * Opprett datasett Xml og DasDds oppretter nå sine egne loggfiler (Generer DatasettsXml.log og DasDds.log) og utdatafiler (Generer DatasetsXml.out og DadDds.out) i _bigParentDirectory_/logs/, og aldri sette sine resultater på utklippstavlen.
    * Opprett datasett Xml støtter nå en -i kommandolinjeparameter som setter utdata inn i den angitte filen på et bestemt sted. Se [dokumentasjon](/docs/server-admin/datasets#generatedatasetsxml) .. Takk til Terry Rankine.
    * EDDTableFraDatabase støtter nå&lt;kolonneName&lt;/kolonneNameQuotes&gt;, med gyldige verdier " (standard) Eller ingenting. Denne karakteren (hvis noen) vil bli brukt før og etter kolonnenavn i SQL-forespørsler. Forskjellige typer databaser, satt opp på ulike måter, vil trenge ulike kolonnenavnsmerker.
    * Tabulær breddegrad og lengdegrad variabler kan nå ha tilpasset long\\_name Profilutvidelse. Tidligere kan de bare være latitude og langmodighet.
    * Fra nå av angi " standarddataQuery" og "standardGraphQuery" som attributter i datasettets globale metadata (dvs.&lt;AddAtts&gt;), ikke som separat&lt;standardDataQuery&gt; og&lt;standardGraphQuery&gt;-merker. (Hvis du fremdeles angir dem via taggene, ERDDAP™ vil automatisk opprette globale attributter med informasjonen.) 

## Versjon 1.46{#version-146} 
 (utgitt 2013-07-09) 

*    **Nye funksjoner:** 
    *    (Ingen) 
*    **Små endringer/Bug Fixes:** 
    * Feilretting: I EDDTableFromDatabase, kun i versjon 1.44, ERDDAP™ Ukorrekt sitert databasens tabellnavn i SQL uttalelser. Nå er det fikset. Takk til Kevin O'Brien.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    *    ** Hvis du ikke endrer standard meldinger i messages.xml,
slette \\[ tomcat \\] /content/erddap/messages.xml . **   
Standard messages.xml filen er nå i erddap. krigsfil, ikke erddapContent .zip .. Så, du trenger ikke lenger å manuelt oppdatere meldinger.xml .
    * Hvis du endrer meldingene i messages.xml, fra nå av, hver gang du oppdaterer ERDDAP™ , enten:
        * Gjør de samme endringene du gjorde før den nye
             \\[ tomcat \\] /webapps/erddap/WEB-INF/klasser/gov/noaa/pfel/erddap/util/messages.xml.
Denne gangen: Slett \\[ tomcat \\] /content/erddap/messages.xml .
        * Eller, finne ut hva som har endret seg i de nye meldingene.xml (via diff) , og endre din
             \\[ tomcat \\] /content/erddap/messages.xml fil tilsvarende.

## Versjon 1.44{#version-144} 
 (utgitt 2013-05-30) 

*    **Nye funksjoner:** 
    * Spørsmål til EDDTable datasett støtter nå & orderBy Min (...) og & orderByMinMax  (...)   (som returnerer to rader i hver gruppe, med minimum og maksimum av det siste orderBy verdi) .. Takk til Lynn DeWitt.
    * Det er to nye tabledap filtyper: .nc CFHeader og .nc CFMAHeader (som returnerer den ncdump-lignende overskriften til det tilsvarende .nc CF og .nc CFMA filtyper) .. Takk til Steve Hankin.
*    **Små endringer/Bug Fixes:** 
    * Feilretting: lasting av .graph og .html websider for datasett med masse tid verdier var langsom fordi ERDDAP™ var langsom når du genererer tidsbryteralternativer. Nå er det alltid raskt. Takk til Michael Barry, OOICI og Kristian Sebastian Blalid.
    * Feilretting: I noen EDDTable-datasettstyper ble ikke tidsbegrensningene alltid håndtert riktig. Nå er de det. Takk til John Maurer og Kevin O'Brien.
    * Feilrettelse: datasett vil ikke laste når alle subsetVariables var faste verdivariabler. Nå vil de det. Takk til Lynn DeWitt og John Peterson.
    * IMPROVED: Nå fungerer alle spørsmål for bare undergruppevariabler som om & fjernt () er en del av spørringen.
    * IMPROVED: nå, for spørsmål som inkluderer & .json p=_funksjonsnavn_, _funksjon Navn_ må nå være en serie på 1 eller mer (Periodedelt) Ord. Hvert ord må begynne med en ISO 8859 bokstav eller "__" og følges av 0 eller flere ISO 8859 bokstaver, siffer eller "_". Dette er mer restriktivt enn Java Skriptets krav til funksjonsnavn.
    * Tidsaksen på grafer fungerer nå godt i lengre tidsintervaller (80-10000 år) kortere tidsintervaller (0.003 - 180 sekunder) ..
    *    ERDDAP™ er nå mer tilgivende når du tolker variasjoner av ISO-8601-format tidsdata.
    * Det var mange andre små endringer og feilrettinger.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    *    **Du må oppdatere den nyeste versjonen for å være sikker.**   
         ERDDAP™ gjennomgikk en sikkerhetsrevisjon. Det var noen feil og svakheter. Versjon 1.44 inkluderer flere viktige sikkerhetsfeilrettinger og flere endringer for å øke sikkerheten og tilgjengeligheten (f.eks. for synshemmede brukere) .. Versjon 1.44 har passert oppfølgingstilsynet. Takk til alle gode mennesker på USGS og Acunitix som gjorde dette mulig. (Burde ikke NOAA Gjør du dette?) 
    * Den nye [EDDTableFra WFS Filer](/docs/server-admin/datasets#eddtablefromwfsfiles) gjør en lokal kopi av alle data fra en ArcGIS KartServer WFS server og så kan dataene lagres raskt. ERDDAP™ Brukere. Takk til Christy Caudill.
    * Den nye [EDDTableFra EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) lar deg opprette et EDDTable datasett fra et EDDGrid Datasett. Noen vanlige grunner til å gjøre dette er:
        * Dette gjør det mulig å spørre datasettet med OPeNDAP Utvalg av begrensninger (som en bruker kan ha bedt om) ..
        * Datasettet er iboende et tabellisk datasett. Takk til OOICI, Jim Potemra, Roy Mendelssohn.
    * Det variable navnet " dybden" er nå et spesielt alternativ til "altitude". Enhetene må være en variant av "meter". Dataverdiene må være positive = ned. ERDDAP™ er nå helt klar over betydningen av " dybde" og støtter den uansett hvor høyden støttes (f.eks. som en komponent i et CF DSG-cdm-_data-_type=profildatasett) .. Et datasett må ikke ha både " dype" og "verdige" variabler.
    * I din datasets.xml , vennligst fjern enhver bruk av&lt;at name="cdm\\_altitude\\_proxy"&gt;dybde&lt;/att&gt; siden dybden nå er et spesielt alternativ til høyden og så trenger ikke å være spesielt identifisert.
    * I din datasets.xml , vennligst fjern enhver bruk av&lt;høydemålerePerSourceUnite&gt;, bortsett fra EDDTable Fra SOS ..
Når verdien er 1, bare slett den.
Når verdien er -1, vurdere å endre variabelnavn til dybde.
For andre verdier, legg til i&lt; addAttributes &gt; For eksempel:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Alle datasett nå støttes
        
        *   &lt;standardDataQuery&gt; som brukes hvis .html er bedt om uten spørring.
            * Du trenger sannsynligvis sjelden å bruke dette.
            * For netdap datasett, er en vanlig bruk av dette å angi en annen standard dybde eller høyde dimensjon verdi (f.eks. \\[ 0 \\] i stedet for \\[ siste \\] ) ..
I alle tilfeller bør du alltid liste alle variabler, alltid bruke de samme dimensjonsverdiene for alle variabler, og nesten alltid bruk \\[ 0 \\] , \\[ siste \\] , eller \\[ 0:last \\] for dimensjonsverdiene.
For eksempel:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * For tabledap datasett, den vanligste bruken av dette er å angi et annet standard tidsområde (relativt til nå, f.eks. &time&gt;= now- 1 dag) ..
Husk at å be om ingen datavariabler er det samme som å spesifisere alle datavariabler, så vanligvis kan du bare angi den nye tidsbegrenselsen.
For eksempel:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;standardGraphQuery&gt; som brukes hvis .graph er bedt om uten spørring.
            * Du trenger sannsynligvis sjelden å bruke dette.
            * For datasett i rutenettet er den vanligste bruken av dette å angi en annen standard dybde- eller høydedimensjonverdi (f.eks. \\[ 0 \\] i stedet for \\[ siste \\] ) og/eller for å spesifisere at en bestemt variabel skal grafiseres.
I alle fall vil du nesten alltid bruke \\[ 0 \\] , \\[ siste \\] , eller \\[ 0:last \\] for dimensjonsverdiene.
For eksempel:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * For tabledap datasett, den vanligste bruken av dette er å angi ulike variabler som skal grafiseres, et annet standard tidsområde (relativt til nå, f.eks. &time&gt;= now- 1 dag) og/eller ulike standardgrafikkinnstillinger (For eksempel merketype) ..
For eksempel:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Husk at du trenger å XML-kode eller prosent-enkode (En, men ikke begge) standardspørsmål siden de er i et XML-dokument. For eksempel blir & amp;amp; ,&lt;blir &amp;lt; , og &gt; blir &amp;gt; .
Sjekk arbeidet. Det er lett å gjøre en feil og ikke få det du vil ha.
Takket være Charles Carleton, Kevin O'Brien, Luke Campbell og andre.
    *    EDDGrid Fra Dap, EDDGrid Fra Erddap, og EDDTableFra EDDGrid har et nytt system for å håndtere datasett som endres ofte (så ofte som omtrent hver 0,5 s) .. I motsetning til ERDDAP 's vanlige, proaktive system for fullstendig å laste hvert datasett på nytt, dette valgfrie ekstra systemet er reaktivt (utløst av en brukerforespørsel) og stegvis (Oppdaterer informasjonen som må oppdateres) .. Hvis forespørsel til en EDDGrid FraDap datasett forekommer mer enn det angitte antall millisekunder siden den siste oppdateringen, ERDDAP™ vil se om det er nye verdier til venstre (vanligvis "time" ) dimensjon og i så fall bare laste ned de nye verdiene før håndtering av brukerens forespørsel. Dette systemet er veldig bra til å holde en raskt skiftende datasett oppdatert med minimale krav til datakilden, men til kostnad av å redusere behandlingen av noen brukerforespørsler. Se [&lt;OppdaterEveryNMillis&gt;] (/docs/server-admin/datasett)   
Takk til Michael Barry og OOICI.
    *    EDDGrid FraNcFiles, EDDTableFromNcFiles og EDDTableFromNcCFFiles støtter nå [NcML .nc ml](/docs/server-admin/datasets#ncml-files) kildefiler i stedet for .nc Filer. Takk til Jose B Rodriguez Rueda.
    * For EDDGrid Aggregate ERDDAP™ støtter en ny serverType=" dodsindex" alternativet for serverType-attributten til serveren&lt; sourceUrl s&gt; tag. Dette fungerer med nettsider som har lister over filer i&lt;pre&gt;&lt;/pre&gt; og ofte under en OPeNDAP logo. Et eksempel er [ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) ..
    * For EDDTableFra SOS nå støtter en valgfri tag
```  
        <sosServerType>_serverType_</sosServerType>  
```
Du kan angi typen SOS server (så ERDDAP™ trenger ikke finne det ut) .. Gyldige verdier av&lt;_serverType_&gt; er IOOS\\_NDBC, IOOS\\_NOS, OOSTethys og whoi (en nystøttet server Type) .. Se [EDDTableFra SOS ](/docs/server-admin/datasets#eddtablefromsos) .. Takket være Derrick Snowden og Janet Fredericks.
    * Alle EDDGrid Filer, EDDTableFra...Filer, EDDGrid Kopier og EDDTable Kopier nå støtte en valgfri tag
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
som kan fortelle ERDDAP™ å beholde filen Tabell (med informasjon om hver kildedatafil) I stedet for bare på disken (standard) .. Å holde filtabellen i minnet øker forespørsler om data (spesielt hvis det er &gt; 1000 kildedatafiler) Bruker mer minne. Hvis du setter dette til sant for alle datasett, hold øye med minnet: bruker for tiden linje på _Dommen_ /erddap/status.html å sikre at ERDDAP™ Det er mye gratis minne. Takk til Fredrik Stray.
    * EDDTableFromASCIIFiles støtter nå&lt;Tegnsett&gt;. De to vanligste tegnsettene (saksfølsom&#33;) er ISO-8859-1 (standard) og UTF-8.
    * Anbefalt: i config.xml, innen&lt;startHeadHtml&gt;, vennligst endre&lt;html&gt; i
        &lt;html lang="en-USA"&gt; (Eller en annen [språkkode](https://www.w3schools.com/tags/ref_language_codes.asp) hvis du har oversatt meldinger.xml) ..
    * config.xml har nye valgfrie tags å deaktivere deler av ERDDAP :)
        *   &lt;konvertereActive&gt;falske&lt;/convertersActive&gt;&lt;-- standarden er sann --&gt;
        *   &lt;SlideSorterActive&gt;falsk&lt;/slideSorterActive&gt;&lt;-- standarden er sann --&gt;
        *   &lt;wmsActive&gt;false&lt;/wmsActive&gt;&lt;&#33;-- standarden er ekte --&gt; Generelt anbefaler vi å sette noen av disse til falsk.
    * Opprett datasett Xml skriver nå resultater til _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, ikke log.txt. Takk til Kristian Sebastian Blalid.
    * Opprett datasett Xml gir nå et godt forslag til&lt;Last om igjen Alle minuter &gt; Takket være NOAA UAF-prosjekt.
    * Mange små forbedringer til GenerationDatasetsXml. Takket være NOAA UAF-prosjekt.

## Versjon 1.42{#version-142} 
 (utgitt 2012-11-26) 

*    **Nye funksjoner:** 
    *    (Ingen nye egenskaper.) 
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Hvis du oppgraderer fra ERDDAP™ 1.38 eller 1.40, det var ingen endringer som krever at du gjør endringer i konfigurasjonsfilene dine. (men du må bruke den nye meldingene.xml-filen) ..
    *    ERDDAP™ En gang til kan løpe med Java 1.6. ( ERDDAP™ v1.40 kreves Java 1.7.) Vi anbefaler fortsatt å bruke den nyeste versjonen av Java 1.7.
    * En ny type datasett, [EDDTableFra AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles) , kan lese data fra et sett Automatisk Værstasjon (AWS) XML-datafiler. Takk til Lynn Dewitt og Exploratorium.
*    **Små endringer/Bug Fixes:** 
    * Justert til endringer i NDBC SOS kildedataservere.
    * Justert til endringer i NOS COOPS ASCII-tjenestene.
    * Lagt flere små endringer og feilrettinger.

## Versjon 1.40{#version-140} 
 (utgitt 2012-10-25) 

*    **Nye funksjoner:** 
    * Det er et nytt utdatafilformat for tabledap Datasett: .nc CFMA, som lagrer de ønskede dataene i en .nc fil som er i samsvar med CF [Diskret prøvetaking Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Flerdimensjonal Array-alternativer, og som derfor samsvarer med NODC-malene \\[ 2021: nå [NCEI-maler](https://www.ncei.noaa.gov/netcdf-templates)  \\] for å lagre denne typen data. Takk til NODC.
    *    tabledap Forespørsler kan nå omfatte tidsbegrensninger som &time&gt; now- 5 dager. Se [dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) .. Takk til James Gosling.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Hvis du oppgraderer fra ERDDAP™ 1.38, det var ingen endringer som krever at du gjør endringer i konfigurasjonsfilene (men du må bruke den nye meldingene.xml-filen) ..
    *    ERDDAP™ Offentlige utgivelser og interne milepæler er tilgjengelige via [ ERDDAP™ på GitHub](https://github.com/ERDDAP) .. For mer informasjon, se [Wiki](https://github.com/ERDDAP/erddap/wiki) for ERDDAP™ Prosjekt og mer generelt [ ERDDAP™ Programmers guide](/docs/contributing/programmer-guide) .. (Dette ble annonsert separat noen uker etter ERDDAP™ 1.38 utgivelse.) 
    * Opprett datasett Xml har blitt forbedret.
        * Skriptet ble revidert slik at det skulle fungere riktig på alle Linux-datamaskiner (Ikke bare noen få) ..
        * Det legger nå til creator\\_name , creator\\_email , og creator\\_url Når det er mulig.
        * Mange andre små forbedringer.
    * Refinert hvordan ERDDAP™ tar seg av tiden.
        * internt, ERDDAP™ nå håndterer ganger ved millisekund presisjon (ikke sekunder) ..
        * Du kan nå eventuelt angi tidsnøyaktigheten for et gitt datasett, se [ time\\_precision ](/docs/server-admin/datasets#time_precision) .. For eksempel kan du angi et datasett som viser tidsverdier med datopresisjon (f.eks. 1970-01-01) ..
        * De aktuelle datasettene vil bruke standardinnstillingene, slik at de ikke påvirkes av disse endringene og vil fortsette å vise tid med sekunder presisjon. Takk til Servet Cizmeli og Philip Goldstein.
    *    [EDDTableFraNcCFFiler](/docs/server-admin/datasets#eddtablefromnccffiles) En ny type datasett som du kan bruke i din datasets.xml fil. Det kan lese data fra noen av de mange filformatene definert av [CF Diskret prøvetaking Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Konvensjoner. Takket være NODC og spesielt takket være Kyle Wilcox for å lage prøvefiler for det store antall gyldige DSG-filformater og for å gjøre dem offentlig tilgjengelige.
*    **Små endringer/Bug Fixes:** 
    * utvidet [Rask omstart](#quick-restart) system til alle relevante EDDGrid og EDDTable underklasser.
    * Forbedret dokumentasjon, spesielt knyttet til hvordan du bruker [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) og [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) fra ulike klientprogramvare.
    * Endret avansert søk for å støtte minTime og/eller maxTime uttrykt som epokesekunder. Takk til Lynn Dewitt.
    * Endret .htmlTable utgang for å vise urls og e-postadresser som lenker.
    * Lagt "rel=" og "rev=" til relevant&lt;en href&gt; tags. Takk til Pat Cappelaere fra OGC   REST Prosjekt.
    * Forbedret beskyttelse mot urealistisk store dataforespørsler, spesielt innen tabledap Hvor det er et vanskeligere problem.
    * Flyttet flere meldinger til messages.xml.
    * Forbedring av hastigheten.
    * Fast EDDGrid FraFiles for å tillate synkende sorterte akser. Takket være Maricel Etchegaray.
    * Fjernet referanser til iGoogle siden det vil bli avbrutt.
    * Lagt flere små endringer og feilrettinger.

## Versjon 1.38{#version-138} 
 (utgitt 2012-04-21) 

*    **Nye funksjoner:** 
    * ISO 19115 og FGDC - ERDDAP™ kan automatisk generere ISO 19115 og FGDC XML metadatafiler for hvert datasett. Lenker til filene er synlige på alle lister over datasett (For eksempel fra fulltekstsøk) og også i Web Tilgjengelige mapper (WAF)   (se [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) og [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) .. Takk til Ted Habermann, Dave Neufeld og mange andre.
    * Søk etter datasett nå støtte \\-_ excludedWord _ og \\-__ekskludert frase_" . Takk til Rich Signell.
    * Søker etter datasett returnerer nå en side om gangen. Standardinnstillingen bruker parameterstrengen: side=1& itemsPerPage=1000, men du kan endre verdiene i URL-adressen til forespørselen. Takk til Steve Hankin og UAF-prosjektet.
    *    OpenSearch -- ERDDAP™ Nå støtter [ OpenSearch 1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) standard for å søke etter datasett. Dette tillater blant annet katalogaggregationsnettsteder å gjøre distribuerte søk (Sende en søkeforespørsel til hver katalog som den vet om) ..
    * Comma Separert Verdi (CSV) Filer -- ERDDAP™ Nå genererer CSV-filer med bare et komma mellom verdier (hvilken Excel foretrekker) I stedet for komma+rom. Takk til Jeff deLaBeaujardiere.
    * Million datasett -- Det ble gjort flere endringer for å støtte ERDDAP har et stort antall datasett, kanskje til og med en million. Takket være Steve Hankin og UAF prosjektet.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
#### Rask omstart{#quick-restart} 
*    [A](#quick-restart) Rask omstart av systemet tillater ERDDAP™ å starte på nytt mye raskere.
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

    * Fulltekstsøk etter datasett kan nå gjøres med søkemotoren Lucene (Selv om vi anbefaler den originale søkemotoren hvis du har færre enn 10.000 datasett) eller det opprinnelige søkesystemet.
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

    * I setup.xml kan du/bør nå legge til to nye kategorier til den kommadelte listen av&lt; categoryAttributes &gt;:
        * global: keywords (Legg til det rett etter global:institusjon) -- en ny spesialsak som tolker en kommadelt liste over nøkkelord fra den globale søkeordattributten for å gjøre en separat oppføring for hvert søkeord.
        * variabel Navn (Legg den til i slutten) En ny spesialsak som kategoriserer hver av dataVariable   destinationName S.
    * I setup.xml kan du (Men hvorfor det?) forteller ERDDAP™ ikke å tilby FGDC og/eller ISO 19115 metadata for datasett ved å inkludere
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Standardverdiene for disse innstillingene er sanne.
    * I datasets.xml Vennligst vurder å forbedre metadataene for datasettene dine. ERDDAP™ Nå genererer ISO 19115 og FGDC XML metadatafiler automatisk for hvert datasett basert på datasettets metadata.
Så, **Gode datasett metadata fører til god ERDDAP -generert ISO 19115 og FGDC metadata.**   
         **Se den nye dokumentasjonen for de mange nye [Globale attributter](/docs/server-admin/datasets#global-attributes) ..** 
    * I datasets.xml Hvis du vil fortelle ERDDAP™ å bruke en forhåndsfremstilt FGDC og/eller ISO 19115-fil som er et sted på serverens filsystem i stedet for å ha ERDDAP™ generere disse filene, bruk:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Hvis _fullFileName_==" eller filen ikke finnes, vil datasettet ikke ha FGDC og/eller ISO 19115 metadata. Så dette er også nyttig hvis du vil undertrykke FGDC og/eller ISO 19115 metadata for et bestemt datasett.
    * I datasets.xml For alle EDDGrid SidebySide og EDDGrid AggregateExistingDimension datasett, sørg for at barnedatasett har forskjellige datasetID mer enn deres foreldredatasett og enn de andre barna. (For eksempel kan du følge George Foremans enkle, men effektive system for å navngi barna sine.) Hvis noen navn i en familie er nøyaktig det samme, vil datasettet ikke kunne lastes inn (med feilmeldingen om at verdiene til den samlede aksen ikke er i sortert rekkefølge) ..
    * I datasets.xml Det var noen endringer i listen over gyldige ioos\\_category Metadataverdier:
        * PCO ble endret til CO.
        * "Physical Oceanography" ble lagt til.
        * Soils ble tilsatt.
    * I datasets.xml , ERDDAP™ ikke lenger \".\" i en datasetID .. Det var tillatt, men misfornøyd. (Beklager) 
    * I datasets.xml , setup for EDDTableFraThreddsFile og EDDTableFra Hyrax Filene har endret seg litt fordi begge klassene bare ble skrevet om for å være mer effektive (begge klasser gjør nå alltid en lokal kopi av alle eksterne datafiler) .. Se dokumentasjonen for å opprette disse klassene: [EDDTableFra Hyrax Filer](/docs/server-admin/datasets#eddtablefromhyraxfiles) og [EDDTableFraTreddsFiler](/docs/server-admin/datasets#eddtablefromthreddsfiles) .. Spesielt, se de reviderte kommentarene om&lt;filDir&gt; (Nå irrelevant) og&lt; sourceUrl &gt; (Nå viktig) .. Også bør du aldri pakke denne klassen i EDDTableCopy for effektivitet.
    * I datasets.xml Hvis du bruker EDDTableFromDatabase med en Oracle database, du bør inkludere en tilkobling Eiendom som
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
å angi hvor mange rekker data som skal hentes på en gang fordi standarden er 10, som er forferdelig ineffektiv. Se [ Oracle dokumentasjon](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) .. MySql og PostgreSQL ser ut til å ha bedre standardinnstillinger for denne innstillingen. Takk til Kevin O'Brien.
    * Hvis du bruker EDDTableFromDatabase, se den forbedrede [" Hastighet" dokumentasjon](/docs/server-admin/datasets#eddtablefromdatabase) For ytterligere forslag for å forbedre ytelsen. Takk til Kevin O'Brien.
    * I datasets.xml , for alle EDDTable... datasett, i konvensjonene og Metadata\\_Conventions Globale egenskaper, vennligst se CF-1.6 (ikke CF-1.0, 1.1, 1.2, 1.3, 1.4 eller 1,5) , siden CF-1.6 er den første versjonen til å inkludere endringene relatert til diskret samplingsgeometri.
    * Programmører som samler ERDDAP™ kode må legge lib/lucene-core.jar til listen over krukkefiler i deres javac og java kommandolinjestier.
    *    ERDDAP™ har [Ny service](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) å konvertere et CF Standard-navn til/fra et GCDD Science Keyword. Du kan finne dette nyttig når du genererer globale søkeord metadata for datasettene i din ERDDAP ..
    * Behandle Bots- Les dette rådet til [hindre bots fra å krype din ERDDAP™ På en dum måte](/docs/server-admin/additional-information#robotstxt) ..
    * Oversettelse -- Teksten på ERDDAP websider er nå for det meste i messages.xml og så egnet for oversettelse til ulike språk (For eksempel tysk, fransk) .. Meldingene bruker nå ofte Meldingsformat for formatering, også for å hjelpe til med å gjøre oversettelser. Hvis du er interessert i å gjøre en oversettelse, vennligst e-post erd dot data at noaa dot gov ..
    * Prøve datasets.xml -- Det var flere små, men betydelige feil i prøven datasets.xml .. Hvis du bruker disse datasettene, vennligst få de nyere versjonene fra den nye prøven datasets.xml i den nye erddapContent .zip fil. Takk til James Wilkinson.
    * Git- Jeg vil prøve hardt å gjøre ERDDAP™ et GitHub-prosjekt ASAP etter denne utgivelsen.
*    **Små endringer/Bug Fixes:** 
    * En ny palett, OceanDepth, er nyttig for dybdeverdier (Positivt er ned) f.eks. 0 (grunn) til 8000 (dyp) ..
    * Den .kml Utgang fra tabledap bruker et bedre markørikon (Det er ikke uklart) .. Og å sveve over en markør nå gjør det større.
    * EDDTableFromFiles -- I den siste oppgraderingen hadde det nye netcdf-java biblioteket strammere restriksjoner for variable navn i .nc Filer. Det forårsaket problemer for EDDTableFromFiles hvis en variabel er sourceName hadde visse tegn. EDDTableFromFiles er nå endret for å unngå det problemet. Takk til Thomas Holcomb.
    * .subset-siden støtter nå 0/10/100/1000/10000 i stedet for en avmerkingsboks for relaterte data. Tipsen advarer om at 10000 kan få nettleseren til å krasje. Takk til Annette DesRochers, Richard (Abe) Coughlin, og IOOS Biologisk prosjekt.
    * .../erddap/info/_ datasetID _/index.html nettsider viser nå url og e-postadresser som klikkbare lenker. Takk til Richard (Abe) Coughlin og IOOS Biologisk prosjekt.
    * Feilretting: I tabledap for datasett med høyde MetersPerSourceUnite&lt;0, spørsmål med høydebegrensninger ble håndtert feil. Takk til Kyle Wilcox.
    * Feilretting: EDDGrid AggregateFromExistingDimension støtter nå mer ulike TDS-adresser. Takk til?

## Versjon 1.36{#version-136} 
 (utgitt 2011-08-01) 

*    **Nye funksjoner:** 
    * Ingen betydelige endringer fra brukerens synspunkt.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * PmelTao-datasettet som ofte ble anvendt som prøvedatasett for tabledap   
Dokumentasjonen er ikke lenger tilgjengelig. ERDDAP™ administratorer må gjøre disse endringene:
        * I din datasets.xml Hvis du har en datasetID ="pmelTao" datasett, legg til
aktiv="falsk" rett før "&gt;" i slutten av den linjen.
        * I oppsettet.xml, hvis din&lt;EDDTableIdExample&gt; er pmelTao, så:
            * Hvis din datasets.xml har ikke noe datasett med datasetID ="erdGlobecBottle", legg til
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * I setup.xml, erstatte alle taggene fra&lt;EDDTableIdExample&gt; gjennom
                &lt;EDDTable Matlab PlotExample&gt; med
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
Spesielt kan du nå gjøre en variabel fra verdiene av en attributt av en av de opprinnelige variablene.
For eksempel i datasets.xml i en&lt; dataVariable &gt; tag, hvis du bruker
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ vil gjøre en variabel med verdiene av PI-attributten til cruise variabelen.
Takk til WOD.
*    **Endringer:** 
    * Små endringer

## Versjon 1.34{#version-134} 
 (utgitt 2011-06-15) 

*    **Endringer:** 
    * Feilretting: Fast en minnelekkasje som skjedde på noen 64-biters Java installasjoner.
    * Feilretting: ERDDAP™ Nå setter disse globale attributtene riktig når breddegradsdimensjonens verdier varierer fra høy til lav: geospatial\\_lat\\_min, geospatial\\_lat\\_max, sørligst__nording, nordligst\\_nording.
        
Merk at actual\\_range er uendret: det kan ha lave, høye verdier eller høye, lave verdier, siden det er ment å indikere området og rekkefølgen av lagring.
        
    * Små endringer.
    *    ERDDAP™ administratorer trenger ikke å gjøre noen endringer i deres config.xml eller datasets.xml ..

## Versjon 1.32{#version-132} 
 (utgitt 2011-05-20) 

*    **Endringer:** 
    * Støtte til de nylig ratifiserte CF diskrete prøvetakingsgeometriene (som dessverre ikke er tilgjengelig på nettet ennå) , som erstatter de foreslåtte CF punktobservasjonskonvensjonene.
         ERDDAP™ brukere vil se at cdm\\_feature\\_type=Station er erstattet av TimeSeries og det er små endringer i filene som opprettes for .nc CF filtype (flat\\_dimensjon kalles nå prøve\\_dimensjon) ..
         ERDDAP™ administratorer må gjøre disse endringene i datasets.xml :)
        * cdm\\_data\\_type=Station bør endres til cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile bør endres til cdm\\_data\\_type=TimeSeriesProfile.
        * cdm-_station-_variabler bør endres til cdm-_timeseries-_variables.
        * cf__role=station\\_id bør endres til cf__role=timeseries\\_id.
    * Ny ioos\\_category valg: " Farget oppløst organisk materiale", "pCO2", "strømflow " " Totalt suspendert materiale".
    * Mulig løsning på en mulig minnelekkasje på 64-bit Java .. \\[ Det fungerte ikke. \\] 
    * Små endringer.

## Versjon 1.30{#version-130} 
 (utgitt 2011-04-29) 

*    **Nye funksjoner:** 
    * Støtte til 64-bit Java .. Når den brukes med 64 bit Java , ERDDAP™ kan nå bruke mye mer haug minne og håndtere mange mer samtidige forespørsler.
    * Støtte til .nc filforespørsler opp til 2GB (Selv uten 64-bit Java ) bedre bruk av ERDDAP håndtere data i biter.
    * Mange 2X-hastighetsforbedringer i koden og 2X-hastighets ups fra Java 1.6 gjør ERDDAP™ 2X til 4X raskere enn før.
    * Forbedringer i hukommelsessparingen betydelig lavere ERDDAP grunnminnebruk.
    * For tabelldatasett, ERDDAP™ er nå fullt klar over et datasetts cdm\\_data\\_type, og hvordan datakartene til CDM-typen. Se [CF Diskret prøvetaking Geometries spesifikasjon](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) .. Kanskje en dag snart, vil den Word-filen bli konvertert til .html og erstatte gjeldende "OBSOLETE" informasjon på den siden. Takket være NOAA UAF-prosjekt.
    * For de fleste EDDTable-datasett, et nytt utgangsfiltypealternativ, .nc CF, skaper contiguous raged Array .nc filer som samsvarer med den nyeste versjonen av [CF Diskret prøvetaking Geometries konvensjoner](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) .. Disse filene er strukturert for å gjenspeile CDM-datatypen til datasettet. Siden de foreslåtte konvensjonene bare endret seg, fra denne skrivingen, støtter ikke netcdf-java-biblioteket ennå å lese filformatene opprettet av ERDDAP og tolke dem som CDM-datafiler. Det kommer sannsynligvis snart. Takket være NOAA UAF-prosjekt.
    * Visningen : Distinkt Dataalternativ på .subset-websiden er nå en nedtrekksliste som lar brukerne angi det maksimale antall rader med tydelige data som skal vises (standard = 1000) .. Denne endringen, og andre, tillater ERDDAP™ å jobbe med datasett som har svært store antall rader med forskjellige data. (Antall unike verdier for hver enkelt variabel er fortsatt et problem, men det kan være ganske høyt. (20 000?) Før .subset og andre nettsider lastes veldig sakte.) Takket være NOAA UAF-prosjekt.
    * .subset nettsider har et nytt alternativ: Vis forskjellig datatelling. Takket være GTOPP-prosjektet.
    * For å hjelpe brukere, de forskjellige verdiene (f.eks. stasjonsnavn) er nå vist på Make-A-Graph og Data Access Forms. Takket være NOAA UAF-prosjekt.
    * . gjennomsiktig Png-forespørsler støtter nå alle typer grafer og datarepresentasjoner. Det trekker bare data - ingen økser, legender, landmaske eller noe annet. Dette gjør det mulig å lage bilder som lag av gjennomsiktigePngs. Hvis &.size=_wide_ | _høyde_ er angitt i spørringen (Anbefalt) Det er æret. Standard er 360x360 piksler. Et unntak er EDDGrid &.draw=overflate, der standardinnstillingen (som før) er et bilde med ~1/piksel per datapunkt (Opp til 3000 x og y piksler) .. Takk til Fred Hochstaedter.
    * Den WMS nettsider viser nå fargelinjen for datasettets variabel (s) .. Takk til Emilio Mayorga og andre.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Denne utgivelsen innebærer mange endringer. De er alle viktige. Vær tålmodig og arbeid gjennom alle endringene som er oppført nedenfor.
    * Denne versjonen blir presset ut tidligere enn ment å håndtere noen Java sikkerhetsfeil. Dessverre flere funksjoner/rettelser beregnet på dette ERDDAP™ Versjonen er ikke i denne versjonen. Beklager. Forhåpentligvis vil neste versjon bli relativt snart (og mye lettere å oppgradere til) ..
    * For å unngå flere sikkerhetsfeil i Java 6 Oppdater 23 og nedenfor, last ned og installer den nyeste versjonen av Java   ( Java 6 Oppdater 24 eller høyere) .. Hvis du har et 64-biters operativsystem, kan du få en 64-biters versjon av Java ..
    * Hvis du bruker Tomcat 5, må du oppgradere til Tomcat 6 eller 7 (Foretrukket) .. Hvis du bruker Tomcat 6, vurdere å oppgradere til Tomcat versjon 7.
    * Følg alle instruksjonene for [Konfigurere en ny ERDDAP™ ](/docs/server-admin/deploy-install) , men hvor det er relevant, vil du kopiere filer fra din gamle installasjon til den nye installasjonen, spesielt \\[ tomcat \\] /content/erddap katalog og filer. Som en del av det, legg merke til [Nye Tomcat oppsett anbefalinger](/docs/server-admin/deploy-install#tomcat) ..
    * Standard erddap.css er nå inkludert i erddap.war-filen.
        * Hvis du vil bruke standard erddap.css, **slette** din gamle \\[ tomcat \\] /content/erddap/images/erddap.css .
        * Hvis du endrer \\[ tomcat \\] /content/erddap/images/erddap.css, og ønsker å fortsette å bruke det: Bare la det være på plass og erstatte&lt;input&gt; delen med:
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

    * I din \\[ tomcat \\] /content/erddap/setup.xml:
        * Bytt ut kommentarene og taggene relatert til&lt;DelvisRequestMaxbytes&gt; og&lt;DelvisRequestMaxCells&gt; med
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
        * Bytt ut kommentarene relatert til&lt; categoryAttributes &gt; og vurdere å endre etikettens verdi:
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

Personlig&lt; categoryAttributes &gt; som er globale attributter nå må identifiseres via prefikset globalt: (F.eks. global:institusjon) .. Andre egenskaper antas å være variable attributter (f.eks. standard\\_name ) .. Også institusjonsverdier (De eneste) ble igjen i det opprinnelige tilfellet. Nå konverteres alle kategoriverdier til små bokstavar.
    * I din \\[ tomcat \\] /innhold/erddap/ datasets.xml :)
        * Stor impprovisert: ERDDAP™ har nye krav knyttet til et tabelldatasetts CDm__data__type. Merkeligvis må hvert datasett ha riktig metadata og variabler relatert til cdm-_data-_typen. Hvis ikke, vil datasettet ikke laste og vil kaste en feil. Se dokumentasjonen for [CDm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) ..
        * FYI: Det er en ny type datasett: EDDTableFromAsciiServiceNOS.
        * FYI: Det er tre nylig tillatt ioos\\_category alternativer: Hydrologi, Kvalitet (f.eks. for kvalitetsflagg) , og statistikk (For eksempel betyr) ..
        * For EDDTableFra... Filer datasett, fjern alle&lt;nDimensions&gt; tagger. De er ikke lenger nødvendig eller brukt.
        * For variabler med destinationName =altitude, ERDDAP™ ikke lenger tvinger long\\_name Å være høy. Vennligst gå gjennom din datasets.xml og gjentatte ganger søke etter&lt; destinationName &gt;altitude og legge til i den variabelen&lt; addAttributes &gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (Eller litt annerledes long\\_name i spesielle tilfeller) ..
        * Valgfritt: Alle EDDTableFraFiles underklasser støttevariabel [ sourceName =globisk:...](/docs/server-admin/datasets#global-sourcenames) å konvertere globale metadata fra hver fil til en datavariabel. Takk til Lynn DeWitt.
    * EDDTableFromDatabase-brukere ERDDAP™ kommer med en ny JDBC 4 driver for Postgres. For andre databaser, sjekk nettet for den nyeste JDBC .jar-filen for databasen din. Siden ERDDAP™ Nå bruker Java 1.6+, JDBC 4 (ikke 3) Det er sannsynligvis anbefalt.
    * FYI
        *    EDDGrid Fra... Filer og EDDTable Fra... Filer datasett lagrer nå filtabellinformasjonen i
             \\[ bigParentDirectory \\] /datasett Info/ \\[  datasetID  \\] /\\* .nc Filer.
Også EDDTable datasett lagrer nå undergruppen informasjon i
             \\[ bigParentDirectory \\] /datasett Info/ \\[  datasetID  \\] /\\* .nc Filer. Disse filene pleide å være
             \\[ bigParentDirectory \\] /datasett Info/ \\[  datasetID  \\] .\\* .json Filer.
De gamle filene slettes automatisk når ERDDAP™ Begynner. Eller du kan slette alle filer (La de tomme underreglene) i \\[ bigParentDirectory \\] /datasettInfo/.
        * Jeg jobbet med en ny EDDTableFromNcCFFiles som ville lese data fra lokale og eksterne filer ved hjelp av de foreslåtte, nye CF Point Observation Conventions. Men det er ikke i denne utgivelsen. Det er problemer i netcdf-java biblioteker relatert til noen metoder for å lese disse filene. Og det var noen svært nylige endringer i de foreslåtte CF punktobservasjonskonvensjonene. Når netcdf-java biblioteket er fikset og oppdatert til det siste forslaget, vil jeg fortsette arbeidet med dette.
        * Running ERDDAP™ i Windows kan ha problemer: spesielt kan du se i \\[ bigParentDirectory/logs/log.txt-fil som ERDDAP™ er noen ganger ikke i stand til å slette og/eller omdøpe filer raskt. Dette skyldes antivirusprogramvare (For eksempel fra McAfee og Norton) som kontrollerer filene for virus. Hvis du løper inn i dette problemet (som kan sees av feilmeldinger i log.txt-filen som "Ukan ikke slettes ... ...) , å endre antivirusprogramvarens innstillinger kan delvis lindre problemet.
Hvis ERDDAP™ i Windows er bare en test som kjører på skrivebordet ditt, dette er bare en irritasjon.
Hvis ERDDAP™ i Windows er din offentlige ERDDAP™ Overvei å bytte til en Linux-server.
    * Sakte første oppstart -- Første gang du løper ERDDAP™ etter oppgradering, ERDDAP™ kan være langsom til å laste datasett. Veien ERDDAP™ lagrer informasjon om aggregerte filer har endret seg, så ERDDAP™ må lese litt informasjon fra alle disse filene på nytt. Det tar tid.
    * Feil ved oppstart -- Gitt endringene relatert til cdm__data__type, er det sannsynlig at noen av datasettene dine ikke vil laste og vil kaste feil. Les e-posten til Daily Report nøye at ERDDAP™ Sender deg når ERDDAP™ Er ferdig med å starte. Det vil ha en liste over datasett som ikke lastet (på toppen) grunnen til at de ikke laster (nær bunnen) ..
    * Hvis du sitter fast eller har andre spørsmål, e-post informasjonen til meg: erd.data at noaa.gov ..
    * Programmere -- Hvis du skriver Java programmer som kjører ERDDAP™ kode, du må endre noen av kommandolinjeparameterens referanser:
        * Endre joda-tid-1.6.2.jar til joda-tid. krukke
        * Endre Postgres JDBC .jar referanse til postgresql.jdbc.jar
*    **Små endringer og feilrettinger:** 
    
    * Forbedret tilkoblingshåndtering for å unngå hengde tråder.
    * Forbedret konvalutapraksis for å håndtere nesten samtidige identiske forespørsler mer effektivt.
    *    ERDDAP™ nå bruker netcdfAll-4.2.jar (omdøpt til netcdfAll-latest. krukke) .. Denne bryteren trengte flere interne endringer og forårsaket noen små eksterne endringer, for eksempel endringer i hvordan grib-filer leses og små endringer i .nc Utgang fra overskriften.
    * Ny funksjon: \\[ Erddap \\] /convert/fipscounty.html konverteringer FIPS fylkeskoder til/fra fylkesnavn.
    * På kart er statens grenser nå mørkefiolette, så de skiller seg ut bedre på alle bakgrunnsfarger.
    * Tabell .kml utgang igjen bruker et sirkulært ikon til å markere poeng (ikke flyikonet Google har nylig byttet til) ..
    * ErdCalcofi-datasettene ble omorganisert og serveres nå fra lokale filer (raskere) ..
    * Opprett datasett Xml fra Thredds Katalogen oppretter nå en resultatfil:
         \\[ tomcat \\] /webapps/erddap/WEB-INF/temp/ EDDGrid FraThreddsCatalog.xml. Takk til Kevin O'Brien.
    * Opprett datasett Xml fra Thredds Katalog prøver nå å fjerne unødvendige portnumre fra kildeadresser (f.eks.:8080 og :8081 kan noen ganger fjernes) .. Takk til NOAA sentralt sikkerhetsteam.
    * For .subset nettsider har kart over distinktdata nå et variabelt latlonområde.
    * Flere lister i ERDDAP™   (f.eks. tabellen som viser alle datasettene) ble sortert slik at A.Z sortert før a. .z .. Nå sorteres de på en ufølsom måte.
    * Små endringer i .subset nettsider, inkludert: enheter er nå angitt.
    * Opprett datasett Xml og DasDds kaster ikke lenger et unntak hvis det ikke er mulig å sette resultatene på systemutklippstavlen eller displayInBrowser. Takk til Eric Bridger og Greg Williams.
    * Feilretting: Når datasett er lastet, ERDDAP™ nå fjerner eller justerer de geospatielle globale attributtene. Takk til Charles Carleton.
    * Feilretting: String2.getClassPath () Nå korrekt prosent-dekoder klassen Sti (Spesielt på Windows, vises mellomrom i filnavnet som %20) .. Dette påvirket ERDDAP™ EDStatic call SSR.getContextDirectory () og å finne innhold/erddap. Takk til Abe Coughlin.
    * Feilretting: i EDDTableFromFiler relatert til getDataForDapQuery håndtering av distinkt () Forespørsler. Takk til Eric Bridger.
    * Feilretting: tabledap Forespørsler håndterte ikke høydebegrensninger når datasettets høyde MetersPerSourceUnit var -1. Takk til Eric Bridger.
    * Feilretting: EDDTableFra... Filer datasett nå riktig håndtere forespørsler som inkluderer =NaN og &#33; =NaN.
    
## Versjon 1.28{#version-128} 
 (utgitt 2010-08-27) 

*    **Nye funksjoner:** Ingen.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** Ingen.
*    **Feilretting:** Løs en programmeringsfeil (kun i ver 1.26) som laget ERDDAP™ Veldig sakte.
     

## Versjon 1.26{#version-126} 
 (utgitt 2010-08-25) 

*    **Nye funksjoner:** Ingen.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** 
    * Fra din \\[ tomcat \\] /content/erddap/setup.xml,
        * I&lt;lovlig på en ny linje nedenfor \\[ standard DataLicenser \\] , sett inn \\[ standardKontakt \\] .. \\[ standardKontakt \\] refererer til&lt;adminEmail&gt; spesifisert høyere i config.xml.
        * Fjern&lt;tabellCommonBGColor&gt; og&lt;tableHighlightBGColor&gt;.
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

    * Nødvendig: Til din \\[ tomcat \\] /content/erddap/images/erddap.css og erddapAlt.css, legg til i bunnen:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Feilrettinger og små endringer:** 
    
    * Feilretting: I enkelte situasjoner fungerte ikke skjemaer i noen versjoner av Internet Explorer. Takk til Greg Williams.
    * Feilretting: Knappene Make A Graph fungerte ikke hvis datasettet var fra en fjern ERDDAP ..
    * Feilretting: WMS Noen ganger fungerte ikke hvis datasettet var fra fjerntliggende ERDDAP ..
    * Mange små endringer og feilrettinger.
    

## Versjon 1.24{#version-124} 
 (utgitt 2010-08-06) 

*    **Nye funksjoner:** 
    * Ny [Subset nettsider](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) bruk facettert søk for å velge undergrupper av tabelldatasett. Takk til Post.
    * Ny [Avansert søk](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) kombinerer alle de andre søkealternativene og legger til lengdegrad, breddegrad og tidsavgrensende bokser. Takk til Ellyn Montgomery. (Beklager forsinkelsen.) 
    * Ny [Konverter tid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) nettside og tjeneste lar deg konvertere numeriske ganger til/fra ISO-strengtider.
    * Ny [Konverter enheter](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) nettside og service lar deg konvertere UDUNITS til/fra UCUM-enheter. Takk til NOAA IOOS SOS ..
    * Hvis a tabledap Forespørselen inkluderer & enheter ("UCUM") , enhetens navn vil bli konvertert fra opprinnelige navn (vanligvis UDUNITS ) til [UCUM](https://unitsofmeasure.org/ucum.html) enhetsnavn. Dette påvirker bare enheter\\*navn\\*Ikke dataverdier. Takk til NOAA IOOS SOS ..
    * Forbedringer for å lage en graf nettsider og grafer og kart:
        * Hvis grafen er et kart, er det nye Make A Graph-knapper for å zoome inn/ut og et nytt alternativ for å klikke for å endre sentrumspunktet for kartet. Takk til Post.
        * Filtrer innstillinger lagt til i nærheten av bunnen. Takk til Greg Williams.
        * Bygget i kystdatafiler ble oppdatert til GSHHS v2.0. Takk til Post.
        * Kartene inkluderer nå innsjøer og elver. Takk til Post. (Beklager, Sacramento River Delta mangler fordi verken kystdata eller innsjøen/elv datasettet håndterer det.) 
        * Den bygget i pscoast-avledede nasjonal-/stat-filer ble oppdatert. Takk til Post.
        * Topografi.cpt ble endret litt. (Beklager om dette påvirker deg negativt.) Takk til Post.
        * Hvis en bruker endrer en variabel, sendes skjemaet automatisk inn på nytt, slik at axisVariable S' showStartAndStop reflekterer alltid grafvariabler. Takk til Joaquin Trinanes.
        * For png og pdf-bildeadresser:
            * Ny &.land=_value_, der _verdi_ kan være " under" (Vis topografi) eller "over" (bare show badymetri) .. Hvis ikke spesifisert, er standard satt av [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask) i datasets.xml eller oppsett.xml. Takk til Post.
            * Ny: linjer i legenden som er for lang, blir automatisk delt i flere linjer. Takk til Post.
        * For png-bildeadresser:
            * Ny &.legend=_value_, der _verdi_ kan være " bottom" (standard) , av" eller "bare". Dette lar deg inkludere legenden, utelukke legenden eller få bare legenden. Takk til Cara Wilson.
            * Ny &.trim=_n Pixels_ etterlater en grense av nPixels (f.eks. 10) nederst på bildet. Den brukes etter .legend=Off. Takk til Cara Wilson.
            * Ny &.size=_width_ | _høyde_ lar deg angi bredde og høyde for bildet, i piksler.
    * Nye utgangsfilformater:
        * csvp og .tsv p - som .csv og .tsv Men med (_ enheter) " lagt til kolonnenavn på den første linjen.
        * .odvTxt -- gjør en .txt-fil som forenkler å få data inn i [Ocean Data Vis (ODV) ](https://odv.awi.de/) ..
        * .esriCsv -- gjør en .csv-fil egnet for import i ESRIs ArcGIS .. (kun tabellbaserte datasett) Takket være Jan Mason, Jeff de La Beaujardiere og NOAA IOOS SOS Prosjekt.
    * GUI forbedring av [Kategorize](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) nettsider. Også kategoriseringsverdiene (annet enn institusjon) Nå er alle små. Forespørsler om ikke-små tilfeller aksepteres (omdirigert) for baklengs kompatibilitet. Takk til Roy Mendelssohn.
    * Feilmeldinger er nå enda kortere og mer orientert for brukerne. Takk til Greg Williams.
    * En intern endring som reduserer ERDDAP grunnminnebruk.
    * Mange nye funksjoner som kun er relevante for POST prosjektet.
*    **Ting ERDDAP™ Administratorer trenger å vite og gjøre:** Det er mange endringer. Beklager. Men hver enkelt gir noen gode fordeler.
    * Store endringer i GenererDatasetXml -- det stiller nå ofte flere spørsmål (se relevante [Datasett Typer](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) Informasjon) og nå alltid genererer hovedsakelig klar til bruk innhold for datasets.xml .. Du er fortsatt ansvarlig for oppsettet, så du bør fortsatt se gjennom datasets.xml Innhold før bruk. En menneskelig innsats i prosjektet vil alltid gjøre bedre enn et dataprogram. Takket være UAF prosjektet.
    * REQUIRED: I setup.xml, må du revidere WMS Seksjon. Det bør nå inkludere disse taggene (Føl deg fri til å endre verdiene) :)
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

    * REQUIRED: I setup.xml kopiere og lime inn dette nye foreslått&lt;startHeadHtml&gt; for å erstatte din gamle versjon. Men du må gjerne gjøre endringer for dine preferanser.
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
    * REQUIRED: I setup.xml, i&lt;startBodyHtml&gt;, endre&lt;body&gt; tag å være&lt;kroppen&gt;, siden stilen nå er satt av erddap.css.
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
    * I setup.xml, e-postEverythingTo og e-postDailyReport For å nå kan bli kommadelte lister over e-postadresser. Den første e-posten For å være spesielt, for eksempel, bruk abonnementer på EDDXxxFromErddaps datasett den e-postadressen. Takk til John Maurer.
    * E-postfeil er nå logget på \\[ bigParentDirectory \\] /logs/emailLog Yvonne-MM-DD.txt-fil.
    * I setup.xml er det en ny, valgfri parameter for å angi e-postkontoegenskaper (vanligvis rett etter&lt;e-post
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Standard er ingenting. Takk til Rich Signell.
    * REQUIRED: Hvis du bruker EDDTableCopy eller EDDGrid Kopier, du må dele alle \\[ bigParentDirectory \\] /copy/ mapper og filer som inneholder "xh" i katalogen eller filnavnene etter å ha stoppet den gamle ERDDAP™ Før den nye ERDDAP™ Disse filene vil bli kopiert på nytt. Jeg beklager, men det var viktig å gjøre endringen og forhåpentligvis påvirker det få administratorer og få filer.
I Linux kan du finne disse filene med, cd \\[ bigParentDirectory \\] /copy
Finn.\\*xh\\*  
I Windows kan du finne disse filene med, Start | Søk
Hva vil du søke etter: Dokumenter
Alle eller deler av filnavnet: xh
Se i: Bla gjennom -&gt; \\[ bigParentDirectory \\] /copy
Klikk på «Søk»
^A å velge dem alle
Del å slette dem alle
    * REQUIRED: I datasets.xml , for EDDTableFromDatabase datasett, for dato og tidsstemplvariabler, endre dataene Skriv til dobbel og enhetene til sekunder siden 1970-01-01T00:00:00Z. Vi anbefaler at du lagrer tidsstempeldata i databasen\\*med\\*En tidssone. Uten tidssoneinformasjon, spørsmålene som ERDDAP™ Sender til databasen og resultatene som ERDDAP™ kommer fra databasen via JDBC er tvetydig og vil sannsynligvis ha feil. Vi prøvde, men fant ingen pålitelig måte å håndtere - tidsstempel uten tidssone - data. Vi mener det er god praksis uansett. Tross alt, - tidsstempel uten tidssone - data har en underforstått tidssone. Selv om det er bra at tidssonen er åpenbar for databasen admin, det er fornuftig å spesifisere det eksplisitt slik at annen programvare kan riktig samhandle med databasen din. Takk, Michael Urzen.
    * HØYTE: I datasets.xml , for å aktivere .subset websider for faceted søk av dine tabular datasett, må du legge til [&lt; subsetVariables &gt;] (/docs/server-admin/datasett#subsetvariables) til datasettets globale egenskaper.
    * FORSLAGT: I datasets.xml Hvis du har datasettet med datasetID ="pmelGtsppp", endre det til å være
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * FORSLAGT: I datasets.xml , det er nye gyldige alternativer for [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasett#cdm_data_type) global attributt, så du bør gjennomgå / endre verdien for datasettene dine.
    * I datasets.xml Den nye [&lt;kildeNødvänderUtvidetFP\\_EQ&gt;] (/docs/server-admin/datasett#kilden trenger utvidetfp_eq) er nyttig hvis kildeserveren ikke konsekvent håndterer &_variable_\\=_value_ tester riktig (på grunn av [generelle vansker med å teste likheten av flytende punkttall](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) .. UtvidetFP\\_EQ er satt til sant som standard (Den sikreste innstillingen) Du trenger ikke å gjøre endringer.
    * Ny [EDDTableFraAsciiFiler](/docs/server-admin/datasets#eddtablefromasciifiles) .. Takket være Jerry Yun Pan.
    * Ny [EDDTableFraTreddsFiler](/docs/server-admin/datasets#eddtablefromthreddsfiles) .. Takk til Roy Mendelssohn.
    * Endringer i [EDDTableFraNcFiler](/docs/server-admin/datasets#eddtablefromncfiles) lar det brukes med et bredere utvalg av filer.
    * EDDTableFromBMDE er deaktivert. Det er ikke lenger noen aktive, passende datakilder.
    * I GenererDatasetXml, den nye EDDGrid FraThredds Katalog høster en hel TREDDS katalog (eller en undergruppe) og skaper datasets.xml Innhold. Takket være UAF prosjektet.
    * Opprett datasett Xml og DasDds nå også sette sine resultater i \\[ bigParentDirectory \\] /logg/log.txt. Takket være Rich Signell og Charles Carleton.
    * Mange forbedringer av innloggingssystemet. Takk til Post.
*    **Ting ERDDAP™ Programmere Må vite og gjøre:** 
    * Det har vært endringer i /WEB-INF/lib/-katalogen. Endre innstillingene for javac og java classpath.
    * Det er en ny \\[ din Url \\] /erddap/versjon tjeneste å bestemme versjonen av en ERDDAP .. Svaret er tekst, f.eks. ERDDAP \\_versjon=1.24 Hvis du får en HTTP 404 ikke-Found-feilmelding, bør du behandle ERDDAP™ som versjon 1.22 eller lavere. Takk til Post.
*    **Små endringer og feilrettinger:** 
    
    * EDDTableFra Sos-endringer:
        * Dropt støtte for lesing av IOOS SOS XML-svar.
        * Lagt til støtte for lesing av IOOS SOS tekst/csv. (Så NOS SOS servere som for tiden ikke støttes.) 
        * Lagt mange endringer relatert til IOOS SOS serverdetaljer.
        * Lagt til støtte for BBOX-forespørsler om IOOS SOS og OOSTethys   SOS servere. Disse endringene resulterer i en stor hastighet for relevante dataforespørsler. Takk til IOOS SOS ..
    * Tekst i .mat tabelldatafiler lagres nå riktig. Takk til Roy Mendelssohn.
    *    WMS 
        *    OpenLayers Nå er pakket med ERDDAP™ til bruk på WMS nettsider. Dette løser problemet forårsaket når OpenLayers For noen måneder siden endret seg og hindrer fremtidige problemer.
        * I WMS   GetCapabilities svar,&lt;OnlineResource &gt; Verdien er nå URL til WMS Service. Takk til Charlton Galvarino.
        * En legende vises på WMS nettside for å vise fargelinjen. Takk til Emilio Mayorga.
    *    EDDGrid AggregateExistingDimensjonskonstruktøren hadde problemer hvis en aksens kilde Verdier var ikke lik destinasjonen Verdier, f.eks. hvis kildetid var noe annet enn "seconds since 1970-01-01" .. Takk til Todd Spindler.
    * I TableWriterGeoJson, overflødig '', etter bbox \\[ ... \\] er fjernet. Takk til Greg Williams.
    * Mange små endringer og feilrettinger.
    
## Versjon 1.22{#version-122} 
 (utgitt 2009-07-05) 

* SlideSorter feilen introdusert i 1.20 er fikset.
* OBIS bug introdusert i 1.20 er fikset.
* Henvisningene til Jason-datasett på siden bilder/gadgets/GoogleGadgets ble fjernet.
     
## Versjon 1.20{#version-120} 
 (utgitt 2009-07-02) 

*    ERDDAP™ administratorer, vennligst legg dette til i config.xml-filen:
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

* Nye datasettstyper [ EDDGrid Kopier](/docs/server-admin/datasets#eddgridcopy) og [EDDTableCopy](/docs/server-admin/datasets#eddtablecopy) lage og vedlikeholde en lokal kopi av en annen EDDGrid eller EDDTable datasett data og betjene data fra den lokale kopien. Disse er svært enkle å bruke og svært effektive **løsninger på noen av de største problemene med å betjene data fra eksterne datakilder:** 
    
    * Å få tilgang til data fra en ekstern datakilde kan være langsom (av ulike grunner) ..
    * Fjerndatasettet er noen ganger utilgjengelig (igjen, av mange grunner) ..
    * Relying på én kilde til dataene skalerer ikke godt (For eksempel når mange brukere og mange ERDDAP bruk den) ..
    
I tillegg er den lokale kopien en sikkerhetskopi av den originale, som er nyttig i tilfelle noe skjer med originalen.
    
Det er ikke noe nytt ved å lage en lokal kopi av et datasett. Det som er nytt her er at disse klassene gjør det\\*lett\\*å skape og\\*Vedlikehold\\*lokal kopi av data fra en\\*variant\\*Typer av eksterne datakilder og\\*Legg til metadata\\*mens du kopierer dataene.
    
Disse datasetttypene er en del av et komplett sett med funksjoner som forenkler opprettelsen av [nett/clustere/federasjoner av ERDDAP s](/docs/server-admin/scaling) å håndtere store belastninger (f.eks. i et datasenter) ..
    
* Ny type datasett [EDDTableFraDatabase](/docs/server-admin/datasets#eddtablefromdatabase) får data fra en lokal eller ekstern databasetabell.
*    ERDDAP™ nå har en [sikkerhet](/docs/server-admin/additional-information#security) system som støtter autentisering (la brukere logge på) og autorisasjon (gi dem tilgang til visse private datasett) ..
* Det er [to, nye, kommandolinjeverktøy](/docs/server-admin/datasets#tools) å hjelpe ERDDAP™ administratorer genererer XML for et nytt datasett i datasets.xml :)
    * Opprett datasett Xml kan generere et grovt utkast av datasett XML for nesten alle typer datasett.
    * DasDds hjelper deg gjentatte ganger å teste og raffinere XML for et datasett. ERDDAP Generer datasett Xml nettsider er fjernet. Av sikkerhetsgrunner støttet de bare noen få datasett typer. De nye kommandolinjene er en bedre løsning.
* Den nye [statusside](/docs/server-admin/additional-information#status-page) La alle (Men spesielt administratorer) Se status for en ERDDAP™ fra enhver nettleser ved å gå til \\[ baseUrl \\]  /erddap/status.html ..
* Tabledap støtter nå [funksjoner på serversiden](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) :)
    * & distinkt () fjerner dupliserte rader fra responstabellen,
    * & orderBy  (...) kan du angi hvordan responstabellen skal sorteres,
    * & orderByMax  (...) lar deg angi hvordan responstabellen skal sorteres og fjerner alle radene bortsett fra radene med de maksimale verdiene i den sist angitte kolonnen. Dette kan for eksempel brukes til å få de siste tilgjengelige dataene for hver stasjon.
* Tabulære datasett kan nå inneholde ytterligere datoTidsvariabler som ikke heter "time" .. Disse variabler er anerkjent av deres - enheter - metadata, som må inneholde " since "   (for numerisk dato Times) eller "y" eller "y" (for formatert String dateTimes) .. Men vær så snill å bruke destinationName   "time" For hoveddatoen Tidsvariabel.
*    ERDDAP™ Nå genererer [Sitemap.xml](/docs/server-admin/additional-information#sitemapxml) fil, som forteller søkemotorer at din ERDDAP Man trenger bare å krype hver måned. ERDDAP™ administratorer, følg [disse instruksjonene](/docs/server-admin/additional-information#sitemapxml) å varsle søkemotorene om den nye sitemap.xml-filen.
*    ERDDAP Feilmeldinger er nå mye kortere og rettet til klienter (ikke programmerere) .. Takk til Greg Williams.
* [&lt;forespørselBlacklist&gt;] (/docs/server-admin/datasett#requestblacklist) Nå støtter også IP-adresser der det siste tallet er erstattet av \\*.
* Forespørsler .json og .geoJson-filer kan nå inneholde en valgfri [Jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) Forespørsel ved å legge til "& .json p=_funksjonsnavn_" til slutten av spørringen. I utgangspunktet forteller det bare ERDDAP™ å legge til "_ funksjonName_ (til begynnelsen av svaret og) " til slutten av svaret. Hvis det opprinnelig ikke var noen forespørsel, la " &" være i spørringen. Takk til Greg Williams.
* Mange nye statistikker ble lagt til [Daglig rapport](/docs/server-admin/additional-information#daily-report) ..
* På nettsider med lister over datasett, institusjon og id er nå lengst til høyre. Dette beveger abonnement og andre mer nyttige kolonner i visning på smale dataskjermer.
* På alle nettsider, sidens tittel (basert på&lt;tittel&gt; i&lt;startHeadHtml&gt; som du definerer i setup.xml) endres for å inneholde en bedre beskrivelse av nettsiden (for eksempel ved å inkludere det aktuelle datasettets tittel og institusjon) ..
* Xmx informasjon er nå inkludert med minneinformasjonen som er skrevet ut i log.txt, Daily Report og på status.html. Takk til Ellyn Montgomery.
*    ERDDAP™ har ytterligere generell beskyttelse mot alle feil (For eksempel, OutOfMemoryError) .. Takk til Charles Carleton.
* Forbedringer til feilhåndtering dersom svaret allerede er gjort.
* IMPROVED: EDDTableFra Filer og EDDGrid FraFiles tillater nå bare&lt;MetadataFrom &gt; første eller siste. Penultimate støttes ikke lenger. Og først og sist er nå basert på filenes LastModifiedTime.
* Feilretting: i EDDTableFra SOS , ugyldig info for én stasjon kastet et unntak og førte til at hele datasettet ble avvist. Nå er disse stasjonene bare ignorert (og feilmeldingen er logget på log.txt) .. Takk til Rick Blair.
     

## Versjon 1.18{#version-118} 
 (utgitt 2009-04-08) 

* Feilretting: Å starte i 1.14, EDDTable Data Access Form og Make A Graph websiden ikke riktig håndtere sitert begrensninger.
* Feilretting: Start i 1.14, EDDTableFromDapSequence håndterte ikke tidsbegrensninger riktig hvis kildetidenhetene ikke var " sekunder siden 1970-01-01T00:00:00".
     

## Versjon 1.16{#version-116} 
 (utgitt 2009-03-26) 

*    ERDDAP™ administratorer:
    * Dette er en viktig utgivelse fordi det fikser en feil som forlot en ERDDAP™ tråd som kjører hvis du brukte Tomcat Manager til å stoppe/starte eller laste på nytt ERDDAP .. Så når du installerer 1.16, ikke bare bruk Tomcat manager til å unngå det gamle ERDDAP™ og distribuere det nye ERDDAP .. I stedet: **Utslett den gamle ERDDAP™ , Start Tomcat på nytt (eller serveren) , deretter distribuere den nye ERDDAP ..** Det er alltid en god ide å gjøre det når du installerer en ny versjon.
    * Legg til [&lt;forespørselBlacklist&gt;&lt;/forespørselBlacklist&gt;] (/docs/server-admin/datasett#requestblacklist) til din datasets.xml .. Dette kan brukes til å angi en liste over klientens IP-adresser som skal blokkeres (f.eks. for å avverge et denial av tjenesteangrep eller en altfor ivrig nettrobot) ..
* Det er nå en \\[ bigParentDirectory \\] /logger-mappen å holde ERDDAP™ Loggfiler. Når du begynner ERDDAP™ , det gjør en arkivkopi av log.txt og logg. txt.første filer med et tidsmerke. Hvis det var problemer før omstart, kan det være nyttig å analysere disse filene.
*    ERD 's ERDDAP™ Nå er abonnementssystemet slått på.
*    ERDDAP™ igjen tillater (Men likevel ikke anbefaler)  "%26" koding av  "&" i forespørselsadresser (se [relatert v1.14 endring](#percent26) ) ..
* Flere nye tillegg til Tally delen av [Daglig rapport](/docs/server-admin/additional-information#daily-report) ..
* Små feilrettinger i genererDatasetsXml.
* Noen små feilrettinger.
     

## Versjon 1.14{#version-114} 
 (utgitt 2009-03-17) 

* Endringer for brukere:
    * i forespørsler om nettdata, ERDDAP™ Nå støtter: [Last-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) hvor n er et heltallstall indekser og [ (siste-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) hvor d er en numerisk verdi (For tiden er det på sekunder) ..
    * I tabellbegrensninger krever strengbegrensninger nå [doble sitater](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) rundt verdien, for eksempel &id="NDBC40121" Dette kreves av DAP protokoll.
    * I tabelldataforespørsler, ERDDAP™ Nå krever det [alle begrensninger er riktig kodet](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) .. Nettlesere gjør dette automatisk, så dette påvirker hovedsakelig dataprogrammer/skripter som får tilgang til ERDDAP ..
#### Prosent26{#percent26} 
*    [Tidligere,](#percent26) den [embed en graf webside](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) og [ ERDDAP™ Google Gadgets nettside](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) sa å erstatte "&" i bildets URL med "%26". Fra nå av bør du erstatte "&" i bildets URL med "&amp;". Så du må erstatte alle 26" i eksisterende nettsider og Google Gadgets med "&amp;". (Beklager) 
*    ERDDAP™ administratorer, vennligst:
    * Legg følgende til i din [setup.xml](/docs/server-admin/deploy-install#setupxml) fil (og endre flagget NøkkelKey-verdi) :)
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

    * På linjen etter&lt;emailUserName&gt; i din [setup.xml](/docs/server-admin/deploy-install#setupxml) fil, legg til
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
Skriv inn ditt riktige passord.
    * Du kan endre&lt;WmsSampleBBBox&gt; i din [setup.xml](/docs/server-admin/deploy-install#setupxml) fil for å inkludere lengdegradsverdier opp til 360, f.eks.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * I din datasets.xml fil, omdøp datasetttypen EDDTableFromNc4DFiler til EDDTableFromNcFiles (som nå støtter filer med alle antall dimensjoner) .. Hvis du hadde et EDDTableFromNc4DFiles datasett:
        
        1. Du må endre til type="EDDTableFromNcFiles" i datasettene dine. XML-fil.
        2. Du må legge til en&lt;nDimensioner&gt; 4&lt;/nDimensions&gt; tag til datasettets XML.
        3. Du kan legge til det nye&lt;SortFilesBySourceNames&gt; tag for å angi den interne rekkefølgen for filene, som bestemmer den generelle rekkefølgen på dataene som returneres.
        
For detaljer, se [EDDTableFra Filer](/docs/server-admin/datasets#eddtablefromfiles) ..
    * I fortiden, for EDDTableFromDapSequence, for OPeNDAP DRDS-servere i datasets.xml Vi brukte&lt;canConstrainStringsRegex&gt; ~=&lt;/kildeCanConstrainStringRegex&gt;. Men nå ser vi at DRDS regulære støtte er mer begrenset enn ERDDAP Så vi anbefaler&lt;canConstrainStringsRegex &gt;&lt;/sourceCanConstrainStringRegex&gt; slik at regulære begrensninger ikke overføres til kilden, men i stedet håndteres av ERDDAP ..
    * Recamped håndtering av kildenCanConstrain... i datasets.xml av [EDDTableFraDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence) og (internt) alle EDDTable datasett typer. Det nye systemet er enklere og gjenspeiler bedre variasjonen i ulike datakilder. Du kan måtte endre XML for datasettene dine i datasets.xml ..
* Det er flere nye funksjoner som er nyttige for seg selv, men når de kombineres, også lette opprettelsen av [nett/clustere/federasjoner av ERDDAP s](/docs/server-admin/additional-information#grids-clusters-and-federations) ..
    * Nye datasettstyper:
        *    [ EDDGrid FraErddap](/docs/server-admin/datasets#eddfromerddap) og [EDDTableFraErddap](/docs/server-admin/datasets#eddfromerddap) som lar en ERDDAP™ Et datasett fra en annen ERDDAP™ På en veldig enkel og svært effektiv måte.
        *    [ EDDGrid FraFiles](/docs/server-admin/datasets#eddgridfromfiles)   (og dens underklasse, [ EDDGrid FraNcFiles](/docs/server-admin/datasets#eddgridfromncfiles) som kan leses NetCDF   .nc GRIB .grb, og HDF   .hdf filer) ..
        *    [EDDTableFraNcFiler](/docs/server-admin/datasets#eddtablefromncfiles) som kan leses NetCDF   .nc som har en tabelllignende struktur.
    * RunLoadDatasett og Lastedatasett ble revampet slik at ERDDAP™ er svært responsiv overfor reloading datasett basert på filer i [flagg](/docs/server-admin/additional-information#flag) katalog (ofte&lt;5 sekunder hvis hovedlastdatasett er gjort i dag).
    * Ny tjeneste for å tillate [en URL for å opprette en flaggfil](/docs/server-admin/additional-information#set-dataset-flag) for et gitt datasett, f.eks.
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
oppretter en flaggfil i flaggkatalogen for rPmelTao (Selv om flagget Nøkkelen her er feil) ..
    * Ny [abonnement](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) tjeneste slik at enhver klient kan spesifisere en handling som vil bli gjort når et bestemt datasett opprettes (Når ERDDAP™ er omstartet) og når datasettet endres på noen måte. Dette systemet kan deaktiveres via&lt;AbonnementSystemActive&gt; i din [setup.xml](/docs/server-admin/deploy-install#setupxml) fil. Den ERDDAP™   [Daglig rapport](/docs/server-admin/additional-information#daily-report) nå lister alle abonnementene og inkluderer URL-adressen som trengs for å kansellere hver enkelt, i tilfelle du føler at systemet blir misbrukt. I datasets.xml , det er en ny, valgfri [&lt;abonnement EmailBlacklist&gt;] (/docs/server-admin/datasett#subscriptionemailblacklist) Tagg slik at administratorer kan angi en kommadelt liste over e-postadresser som umiddelbart er svartelistet fra abonnementssystemet.
    * Ny [&lt;onChange&gt;] (/docs/server-admin/datasett#onchange) egenskap i datasets.xml La den ERDDAP™ administrator angir en handling som vil bli gjort når et bestemt datasett opprettes (Når ERDDAP™ er omstartet) og når datasettet endres på noen måte.
    * Forbedringer til fulltekstsøk: lagre søkestrengen for hvert datasett bruker nå 1/2 minnet. Søkealgoritmen (Boyer-Moore-lignende) Nå er 3X raskere.
    * E-post fra ERDDAP™ Nå er det alltid nødvendig å legge vekt på emnet og innholdet i \\[ Erddap Url \\] så det vil være klart hvem ERDDAP™ dette kom fra (Hvis du administrerer flere ERDDAP s) ..
    * Mer omfattende statistikksamling for [Daglig rapport](/docs/server-admin/additional-information#daily-report) e-post.
    * Ny loggfil \\[ bigParentDirectory \\] /emailLogYEAR-MM-DD.txt logger alle e-poster sendt av ERDDAP™ Hver dag. Dette er spesielt nyttig hvis din server ikke kan sende e-post -- du kan i det minste lese dem i loggen.
    *    ERDDAP™ Nå gjør jeg en \\[ bigParentDirectory \\] /cache/ ( datasetID ) Katalog for hvert datasett siden det kan være mange filer som er lagret.
* Ny [ RSS 2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) fôring for hvert datasett (Se etter den orange RSS ikoner på lister over datasett, datatilgangsskjemaer og lage en graf nettsider) ..
*    EDDGrid   .kml Svar nå bruke flislagte bilder ("superoverlays" -- dynamisk generert quadtree bilder) .. Det første bildet lastes inn i GoogleEarth mye raskere enn tidligere. Oppløsningen av kartet øker når du zoomer inn, opp til den fulle oppløsningen av datasettet. Anbefale: brukere bør be om .kml for et tidspunkt, men datasettets hele lengdegrad, breddegrad. Dessverre ble støtte for tidsintervaller fjernet (Håper det kommer tilbake) ..
*    ERDDAP™ Nå legger [Utløper og cache- kontroll max-alder overskrifter](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) til alle filer som er bedt om fra /bilder-katalogen. Dette reduserer antall statiske filforespørsler som sendes til ERDDAP og dermed øker mest ERDDAP™ page lasts. Også mange Java Script-filreferanser flyttet til bunnen av sine HTML-sider, som også øker mange ERDDAP™ page lasts. Takket være boken "High Performance Web sites" av Steve Souders og ySlow-tillegget til FireBug-tillegget i FireFox.
*    ERDDAP™ byttet fra netcdf-java 2.2.22 til netcdf-java 4.0. Dette tillater blant annet EDDGrid Fra NcFiles til å lese HDF   .hdf , samt GRIB .grb og NetCDF   .nc Filer.
*    EDDGrid Fra Dap og EDDGrid FraNcFiles støtter nå DARray (samt DGrid)   dataVariable S. Hvis en dimensjon ikke har en tilsvarende koordinatvariabel, ERDDAP™ skaper en aksevariabel med indeksverdiene (f.eks. 0, 1, 2, ..., 311, 312) .. Alle andre aspekter av EDDGrid Forbli den samme:
\\* Den tjener fortsatt alle datasett som gitter, med en aksevariabel for hver dimensjon.
\\* Spørsmål kan fortsatt be om verdier fra aksevariabler.
Takket være Charles Carleton, Thomas Im, Dorian Raymer og andre.
* Den WMS   OpenLayers sidene har nå et standard lengdegradsområde som er litt større enn datasettets rekkevidde. (ikke det nøyaktige området, så konteksten til små datasett er mer åpenbar) .. Standardområdet kan nå også være 0 til 360, som gjør det mulig å vise hele spekteret av mange datasett. Takk til Todd Spindler.
* Nye glidebrytere på noen datatilgangsskjemaer og lag en graf-websider. De forenkler (rå) Spesifikasjon av de ønskede dataene og gir god visuell tilbakemelding.
* Et nytt alternativ for&lt;datasett&gt; Tags in datasets.xml :) [Active="falsk"](/docs/server-admin/datasets#active) ..
* Henvisninger til ERD 's ERDDAP™ endret fra coastwatch.pfel (Fungerer fortsatt via proxy) til coastwatch.pfeg (Foretrukket) ..
* Ny støtte til [ data\\_min og data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) Variable metadata attributter.
* En delvis løsning på [VentTryp på nytt / Delvis resultat Unntak](/docs/server-admin/additional-information#waitthentryagain-exception) :) Nå vil noen forespørsler som tidligere mislyktes når en endring av datakilde ble oppdaget lykkes fordi ERDDAP™ vil laste datasettet på nytt og be om dataene automatisk, alle i sammenheng med den opprinnelige forespørselen.
* Feilretting: generere Datasett Xml var deaktivert i ERDDAP™ versjon 1.12. Takk til Ellyn Montgomery for å peke på dette.
* Små endringer i feilhåndtering.
* Mange forbedringer for å unngå/dealere med mulige raseforhold (Mulige problemer som oppstår på grunn av flerleset art ERDDAP ) som forårsaket små, sjeldne problemer.
* Nå, hvis en feilmelding er skrevet på et bilde, vil bildet bare bo i cache i ~5-10 minutter (ikke 60) .. Takk til Cara Wilson.
* Standardmeldingen når det ikke er noe data nå " Forespørselen din ga ingen matchende resultater." som er kortere, mer nøyaktig og matcher OPeNDAP servere.
*    EDDGrid ikke lenger tillater bundet akseverdier.
* Små endringer i .ver og .help forespørsler.
* Mange små endringer og feilrettinger.
     

## Versjon 1.12{#version-112} 
 (utgitt 2008-10-31) 

* EDDTableFra SOS Fungerer igjen med NDBC SOS og jobber med den nye NOS SOS ..
* EDDTableFromBMDE krever nå ERDDAP™ admin å angi dataVariable S.
*    EDDGrid ikke lenger krever at lat og lon er jevnt fordelt. gjennomsiktig Png eller .kml .. Takk til Todd Spindler.
* Noen små endringer.
     

## Versjon 1.10{#version-110} 
 (utgitt 2008-10-14) 

* Ny-colorBar" metadata for datavariabler i datasets.xml definerer standard fargelinjen innstillinger for grafer og kart. Se [mer informasjon](/docs/server-admin/datasets#color-bar-attributes) .. Dette er viktig fordi det forbedrer utseendet på standard grafer og kart produsert av Make A Graph og fordi standard grafer og kart nå har en konsekvent fargelinje selv når klienten endrer det etterspurte klokkeslettet eller det geografiske området. Dette var også nødvendig for WMS ..
*    ERDDAP™ Nå serverer de fleste nettdata via en WMS Service. Dette er viktig fordi det viser at i tillegg til å få data fra mange typer dataservere, ERDDAP™ kan distribuere data via ulike protokoller ( DAP , WMS Mer i fremtiden) .. Se [Kundedokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) .. Eller [dokumentasjon for administratorer](/docs/server-admin/datasets#wms) .. Eller [Prøv det ut](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) ..
* Ny støtte for lengdegradsverdier &gt; 180 i .kml Filer.
* Ny cdm\\_data\\_type: Andre .
*    ERDDAP™ nå støtter "boolean" kildedataType. Se [mer informasjon](/docs/server-admin/datasets#boolean-data) Dette vil bli nyttig for den fremtidige EDDTableFromDatabase.
* Ny EDDTableFromBMDE støtter Digir/BMDE datakilder.
* EDVGridAxis tillater nå synkende sorterte verdier. PmelOscar-datasettene trengte dette.
*    ERDDAP™ Nå returnerer HTTP-feil (f.eks. "404 for ressurs/side ikke funnet") i flere situasjoner i stedet for HTML-sider med feilmeldinger.
* Mange endringer/tillegg til ERDDAP™ dokumentasjon.
* Mange små endringer.
* Noen feilrettinger.
*    **Ting ERDDAP™ Administratorer bør gjøre for å oppgradere til denne versjonen:** 
    * I datasets.xml , for alle EDDTableFrom SOS datasett, endring " observertProperty" metadata til "kildeobservertProperty".
    * Regler for et axisVariable eller dataVariable 's destinationName er nå [strengere](/docs/server-admin/datasets#datavariable-addattributes) .. Du må sjekke at variabelnavnene dine er gyldige. Enten sjekk dem for hånd, eller løp ERDDAP™ og se på feilmeldingene i rapporten som sendes til administratoren.
    * I datasets.xml Hvis du vil at en nettdatavariabel skal være tilgjengelig via WMS , må du legge til colorBar metadata. I det minste, for eksempel&lt;Att name=" colorBarMinimum " type=" double"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Se [mer informasjon](/docs/server-admin/datasets#wms) ..
    * Legg følgende til i din [setup.xml](/docs/server-admin/deploy-install#setupxml) fil (Men tilpasse det med din informasjon) :)

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

* En ny webtjeneste i ERDDAP™ , generere Datasett Xml, hjelper ERDDAP™ administratorer ved å opprette et grovt utkast av XML som trengs for å beskrive et datasett i datasets.xml 
* Noen endringer/feilrettinger knyttet til at netdap kan sees av netcdf-java som en opendap server, inkludert: globale metadata er nå merket "NC\\_GLOBAL" (I stedet for GLOBAL) ..
* Den EDDGrid og EDDTable Data Access Forms bruker nå spørringsinformasjon i URL-en. Så, for eksempel, hvis en bruker går fra et Make A Graph-skjema til et Data Access-skjema, overføres begrensningene nå riktig.
*    tabledap Make A Graph tillater nå begrensninger på strengvariabler.
* EDDTables Make A Graph tillater nå NaN-begrensninger. Takk til Steve Hankin.
* Feilretting: EDDTable lagre AsImage gjenkjente ikke .colorbar min og max verdier. Takk til Steve Hankin
* Mange forbedringer av setupDatasetsXml. Takk til Ellyn Montgomery.
* Griddap-forespørsler tillater nå () -stil forespørsler litt utenfor det faktiske akseområdet. Dette er hensiktsmessig siden () -verdier avrundes til nærmeste faktiske verdi. Takk til Cindy Bessey
* Jeg gjorde FloatArray og DoubleArray test av erEvenlySpaced mer sofistikert. Det vil alltid være ufullstendig (fordi testen må tilpasses for hvert datasett) Men det bør være bedre. Takk til Ellyn Montgomery.
* Jeg flyttet setup.html og setupDatasett Xml.html erddaps /download katalog og hard kodet alle lenker til dem. Nå kan jeg gjøre endringer og oppdatere installasjonsinformasjonen umiddelbart.
* Mange små endringer. Noen små feilrettinger.
*    **Ting ERDDAP™ Administratorer bør gjøre for å oppgradere til denne versjonen:** 
    * Flytt&lt;kort beskrivelse Html&gt; fra meldingene.xml til din [setup.xml](/docs/server-admin/deploy-install#setupxml) fil. Den angir teksten som vises midt på venstre side av ERDDAP™ hjemmeside. Legg til&lt;h1&gt; ERDDAP &lt;/h1&gt; (eller andre overskrifter) til toppen av det. **Eller,** kopi&lt;ShortDescriptionHtml&gt; i den nye [setup.xml](/docs/server-admin/deploy-install#setupxml) fil (fra den nye erddapContent .zip ) inn i oppsettet.xml.
         

## Versjon 1.06{#version-106} 
 (utgitt 2008-06-20) 

* Ny støtte til IOOS DIF SOS Datakilder.
* Mange små endringer. Noen små feilrettinger.
     

## Versjon 1.04{#version-104} 
 (utgitt 2008-06-10) 

* Ny Slide Sorter-funksjon.
* Ny Google Gadgets-side og eksempler.
* Feilretting i EDDGrid .saveAsNc for variabel med skala og addOffset.
     

## Versjon 1.02{#version-102} 
 (utgitt 2008-05-26) 

* Ny EDDGrid SideBySide tillater forskjellige axisVariable s \\[ 0 \\] kilde Verdier.
* Alle strømmer og vinddatasett ble slått sammen til EDDGrid SideBySide datasett.
* Bilder fra bildeforespørsler er nå cached i 1 time.
     

## Versjon 1.00{#version-100} 
 (utgitt 2008-05-06) 

* Lag en grafisk nettsider og grafikkkommandoer i nettadresser.
* Støtte for flaggfiler for å tvinge til reloading av et datasett.
* Ny type datasett: EDDTableFrom4DFiler (den første underklassen av EDDTableFraFiles) ..
