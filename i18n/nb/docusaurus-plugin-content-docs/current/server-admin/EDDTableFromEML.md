---
title: "EDDTableFromEML"
sidebar_position: 6
---
# EDDTableFromeML og EDDTableFromEMLBatch Alternativer i Generer Datasett Xml

 \\[ Denne nettsiden vil bare være av interesse for ERDDAP™ administratorer som jobber med EML-filer.
Dette dokumentet ble opprinnelig opprettet i 2016. Sist redigert 2020-11-30. \\] 

 [ ** ERDDAP™ ** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) er en dataserver som gir brukerne en enkel og konsistent måte å laste ned undergrupper av gitte og tabellbaserte vitenskapelige datasett i vanlige filformater og lage grafer og kart. ERDDAP™ arbeider med et gitt datasett som en gruppe av flerdimensjonale variabler (f.eks. satellitt- eller modelldata) eller som en databaselignende tabell (med en kolonne for hver type informasjon og en rad for hver observasjon) .. ERDDAP™ er fri og åpen kilde programvare, slik at alle kan [Last ned og installer ERDDAP™ ](/docs/server-admin/deploy-install) å tjene sine data.

Legg til et datasett i en ERDDAP™ installasjon, ERDDAP™ administrator må legge til en bit XML som beskriver datasettet til en fil som heter datasets.xml .. (Det er [grundig dokumentasjon for datasets.xml ](/docs/server-admin/datasets) ..) Selv om det er mulig å generere delen av XML for datasets.xml helt for hånd, ERDDAP™ kommer med et verktøy kalt [ **Generer DatasetsXml** ](/docs/server-admin/datasets#tools) som kan generere det grove utkastet til den delen av XML som er nødvendig for et gitt datasett basert på noen informasjonskild om datasettet.

Det første Generer Datasett Xml spør er hvilken type datasett du vil opprette. Opprett datasett Xml har et spesielt alternativ, **EDDTableFromEML** som bruker informasjonen i et [Økologisk metadataspråk (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) XML-fil som skal generere biten av XML for datasets.xml å skape en [EDDTableFraAsciiFiler](/docs/server-admin/datasets#eddtablefromasciifiles) datasett fra hver datatabell i en EML-fil. Dette fungerer veldig bra for de fleste EML-filer, for det meste fordi EML-filer gjør en utmerket jobb med å lagre alle de nødvendige metadataene for et datasett i et enkelt-til-arbeid-med-format. Informasjonen som GenererDatasetsXml må opprette datasettene er i EML-filen, inkludert URL-adressen for datafilen, som GenerererDatasetsXml laster ned, tolker og sammenligner med beskrivelsen i EML-filen. (Mange grupper ville gjøre det bra å bytte til EML, som er et godt system for å dokumentere alle tabeller vitenskapelige datasett, ikke bare økologiske data. Og mange grupper som oppretter XML-skjemaer ville gjøre det bra å bruke EML som en case-studie for XML-skjema som er klart, til det punktet, ikke for dypt (Det vil si for mange nivåer) , og enkelt for mennesker og datamaskiner å jobbe med.) 

## Spørsmål{#questions} 

Her er alle spørsmålene Genererer Datasett Xml vil spørre, med kommentarer om hvordan du bør svare hvis du vil behandle bare en EML-fil eller en batch med EML-filer:

* Hvilken EDDType?
Hvis du vil behandle bare én fil, svar: EDDTableFromEML
Hvis du vil behandle en gruppe filer, svarer du: EDDTableFromEMLBatch
* Katalog å lagre filer?
Skriv inn navnet på mappen som vil bli brukt til å lagre nedlastede EML- og/eller datafiler.
Hvis katalogen ikke eksisterer, vil den bli opprettet.
*    (For EDDTableFromEML Bare) EML URL eller lokal filName
Skriv inn URL-adressen eller det lokale filnamnet til en EML-fil.
*    (Kun for EDDTableFraemLBatch) EML dir (URL eller lokal) ?
Skriv inn navnet på katalogen med EML-filene (en URL eller en lokal mappe) ..
For eksempel:http://sbc.lternet.edu/data/eml/files/
*    (Kun for EDDTableFraemLBatch) Filnavn regulær?
Skriv inn det regulære uttrykket som vil bli brukt til å identifisere de ønskede EML-filene i EML-katalogen.
For eksempel: knb-lter-sbc\\.\\d+
* Bruk lokale filer hvis det finnes (sant | falsk) ?
Angi sant å bruke eksisterende lokale EML-filer og datafiler, hvis de eksisterer.
Skriv inn feil for alltid å laste ned EML-filer og/eller datafiler på nytt.
* tilgjengelig Til?
Hvis du vil at de nye datasettene skal være private datasett i ERDDAP Angi navnet på gruppen (s) Det vil være tillatt tilgang.
Anbefalt for LTER-grupper: kombinere "lter" pluss gruppen, f.eks. Sbc.
Hvis du kommer inn - null - vil det ikke være noen&lt;tilgjengelig Til &gt; tag i utgangen.
Se [tilgjengelig Til](/docs/server-admin/datasets#accessibleto) ..
* lokal TimeZone (f.eks. US/Pacific) ?
Hvis en tidsvariabel indikerer at den har lokale tidsverdier, vil denne tidssonen bli tildelt.
Det må være en verdi fra [TZ-kolonneliste over tidssonenavn](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ..
Merk alle brukernavnene i slutten av listen.
Hvis du senere finner det feil, kan du endre time\\_zone i biten av datasets.xml ..

EML pluss ERDDAP™ En god kombinasjon, siden ERDDAP™ kan gi brukere mer direkte tilgang til rikdommen til [Kunnskapsnettverk for biokompleksitet (KNB) ](https://knb.ecoinformatics.org/) og [Langtidsøkologisk forskning (LTER) ](https://lternet.edu/) Data og hjelp disse prosjektene møte den amerikanske regjeringens [Offentlig tilgang til forskningsresultater (PARR) Krav](https://nosc.noaa.gov/EDMC/PD.DSP.php) Ved å gjøre opplysningene tilgjengelige via en webtjeneste. Også EML pluss ERDDAP™ Det virker som en stor bro mellom forskere i det akademiske / NSF-finansierte riket og forskere i det føderale byrået ( NOAA , NASA, USGS) riket.

Se vår [Seksjon om å få ekstra støtte](/docs/intro#support) ..
 
## Designdetaljer{#design-details} 

Her er designdetaljene til EDDTableFromEML-alternativet i GenerateDatasetsXml.
Noen er relatert til forskjeller i hvordan EML og ERDDAP™ Gjør ting og hvordan Genererer Datasett Xml håndterer disse problemene.

### Ett datatabell blir én ERDDAP™ Datasett{#one-datatable-becomes-one-erddap-dataset} 
En EML-fil kan ha flere&lt;Data Tabell&gt;s. ERDDAP™ gjør en ERDDAP™ datasett per EML-datatabell. Den datasetID For datasettet er
 *EMLName* \\_t *tabellnummer*   (Når EMLname er tekst) eller
 *System\\_ EMLName* \\_t *tabellnummer*   (Når EMLname er et tall) ..
For eksempel, tabell #1 i filen knb-lter-sbc.28, blir ERDDAP™   datasetID =knb\\_lter\\_sbc\\_28\\_t1,
     
### EML mot CF+ACDD{#eml-versus-cfacdd} 
Nesten alle metadataene i EML-filene kommer inn ERDDAP Men i et annet format. ERDDAP™ bruker [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) og [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadatastandarder. De er komplementære metadatasystemer som bruker nøkkel=verdipar for globale metadata og for hver variabels metadata.
Ja, EML-representasjonen av metadata er finere enn CF+ACDD-representasjonen. Jeg foreslår ikke å bruke CF + ACDD-representasjonen som erstatning for EML. Vennligst tenk på CF+ACDD som en del av broen fra EML-verdenen til OPeNDAP /CF/ACDD verden.
     
### Små endringer{#small-changes} 
 ERDDAP™ Gjør mange små endringer. For eksempel ERDDAP™ bruker EML ikke- DOI alternativ Identifikator pluss et datatabellnummer som ERDDAP™   datasetID , men litt endringer alternativt Identifikator for å gjøre det til et gyldig variabelt navn på de fleste dataspråk, f.eks. knb-lter-sbc.33 data Tabell #1 blir knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook{#docbook} 
EML bruker DocBooks merkesystem for å gi struktur til blokker av tekst i EML-filer. CF og ACDD krever at metadata er vanlig tekst. Generer datasett Xml konverterer den merket teksten til vanlig tekst som ser ut som den formaterte versjonen av teksten. Inline tags er renset med firkantede parenteser, f.eks. \\[ understreket \\] , og etterlatt i vanlig tekst.
     
### Datafiler{#data-files} 
Siden EML-datatabellen inneholder URL-adressen til den faktiske datafilen, genererer du datasett Xml vil:
1. Last ned datafilen.
2. Lagre den i samme mappe som EML-filen.
3. Les dataene.
4. Sammenlign beskrivelsen av dataene i EML med de faktiske dataene i filen.
5. Hvis Generer datasett Xml finner forskjeller, den behandler dem, eller spør operatøren om forskjellene er OK, eller returnerer en feilmelding. Detaljerne er i ulike elementer nedenfor.
         
###  .zip 'd datafiler{#zipd-data-files} 
Hvis den referansede datafilen er en .zip fil, den må inneholde bare én fil. Denne filen vil bli brukt til ERDDAP™ - Datasett. Hvis det er mer enn 1 fil. ERDDAP™ vil avvise dette datasettet. Om nødvendig kan dette endres. (I praksis har alle SBC LTER zip-filer bare én datafil.)   
     
### Lagringstype{#storagetype} 
Hvis en kolonnes lagring Typen er ikke spesifisert, ERDDAP™ bruker sin beste gjetting basert på data i datafilen. Dette funker ganske bra.
     
### Enheter{#units} 
 ERDDAP™ bruk [ UDUNITS formatering for enheter](https://www.unidata.ucar.edu/software/udunits/) .. Opprett datasett Xml kan konvertere EML-enheter til UDUNITS Rent rundt 95% av tiden. De gjenværende 5 % resulterer i en leselig beskrivelse av enhetene, f.eks. -biomassTetthetUnitePerAbundanceUnite - i EML blir -biomass densitet enhet per overflod enhet - i ERDDAP .. Teknisk sett er det ikke tillatt. Jeg tror ikke det er så ille under omstendighetene. \\[ Om nødvendig, enheter som ikke kan gjøres UDUNITS Kompatibel kan flyttes til variabelens kommentarattributt. \\]   
     
### EML versjon 2.1.1{#eml-version-211} 
Denne støtte for EML v2.1.1-filer ble lagt til i Genererer Datasett Xml i 2016 med håp om at det vil bli noe opptak i EML-samfunnet. Fra 2020 har det ikke skjedd. Den ERDDAP™ utviklere vil gjerne legge til støtte for nyere versjoner av EML, men bare hvis de nye funksjonene faktisk vil bli brukt. Vennligst e-post erd.data at noaa.gov Hvis du vil ha støtte for nyere versjoner av EML og vil faktisk bruke denne funksjonen.
     

## Problemer med EML-filer{#issues-with-the-eml-files} 

Det er noen problemer med EML-filene som forårsaker problemer når en programvareklient (slik som EDDTableFromEML-alternativet i Genererer DatasettsXML) forsøker å tolke/prosessere EML-filene.

* Selv om det er flere problemer som er oppført her, er de for det meste små, løselige problemer. Generelt er EML et bra system, og det har vært min glede å jobbe med det.
* Disse er grovt sortert fra verste / vanlig til minst dårlig / mindre vanlig.
* De fleste er relatert til små problemer i bestemte EML-filer (Som ikke er EMLs feil) ..
* De fleste kan fikses ved enkle endringer i EML-filen eller datafilen.
* Siden LTER folk bygger en EML-kontrollør for å teste gyldigheten av EML-filer, har jeg lagt til noen forslag nedenfor om funksjoner som kan legges til i sjekkeren.

Her er spørsmålene:

### Separate dato- og tidskolonner{#separate-date-and-time-columns} 
Noen datafiler har separate kolonner for dato og tid, men ingen felles dato + tidskolonne. Foreløpig genererer datasett Xml oppretter et datasett med disse separate kolonner, men det er ikke ideelt fordi:

* Det er best om datasett i ERDDAP™ har en kombinert dato+tid kolonne kalt "time" ..
* Ofte vil datasettet ikke laste inn ERDDAP™ fordi "time" kolonnen har ikke dato+tidsdata.

Det er to mulige løsninger:
1. Rediger kildedatafilen for å legge til en ny kolonne i datafilen (og beskriver det i EML) der dato- og tidskolonnene slås sammen i én kolonne. Deretter kjøre Generer Datasett Xml finner den nye kolonnen.
2. Bruk [Avledede variabler](/docs/server-admin/datasets#script-sourcenamesderived-variables) Funksjon i ERDDAP™ å definere en ny variabel i datasets.xml som opprettes ved å kombinere datoen og tidskolonnene. Et av eksemplene gjelder spesielt denne situasjonen.
         
### Inkonsistente kolonnenavn{#inconsistent-column-names} 
EML-filene viser datafilens kolonner og navn. Dessverre er de ofte forskjellig fra kolonnenavnene i den faktiske datafilen. Normalt er kolonneordenen i EML-filen den samme som kolonneordenen i datafilen, selv om navnene varierer litt, men ikke alltid. Opprett datasett Xml prøver å matche kolonnenavnene. Når det ikke kan (som er vanlig) , det vil stoppe, vise deg EML/data filnavn par, og spør om de er riktig justert. Hvis du skriver inn 's' for å hoppe over en tabell, vil GenerertDatasetsXml skrive ut en feilmelding og gå videre til neste tabell.
Løsningen er å endre de feilaktige kolonnenavnene i EML-filen for å matche kolonnenavnene i datafilen.
     
### Forskjellig kolonneorden{#different-column-order} 
Det er flere tilfeller der EML angitte kolonnene i en annen rekkefølge enn de eksisterer i datafilen. Opprett datasett Xml vil stoppe og spørre operatøren om matchups er ok eller om datasettet bør hoppes over. Hvis det er hoppet over, vil det bli en feilmelding i resultatfilen, for eksempel:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
Løsningen er å fikse kolonneorden i disse EML-filene slik at de matcher rekkefølgen i datafilene.

Det ville være hyggelig hvis EML-kontrollen sjekket at kolonne- og kolonneordenen i kildefilen matcher kolonne- og kolonneorden i EML-filen.
    
### Feil numHeaderLines{#incorrect-numheaderlines} 
Flere data Tabeller feil state numHeaderLines=1, f.eks. ...sbc.4011. Dette forårsaker ERDDAP™ å lese den første linjen av data som kolonnenavn. Jeg prøvde å manuelt SKIP alle disse datatabellene. De er åpenbare fordi uovertruffen kildekolnavn er alle dataverdier. Og hvis det er filer som feilaktig har numHeaderLines=0, gjør systemet mitt ikke det åpenbare. Her er et eksempel fra SBC LTER-feilfilen:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Så feilen kan vises som om Generer datasett Xml mener at den første linjen med data i filen (f.eks. med 2008-10-01T00:00 etc.) er linjen med kolonnenavn (som om 2008-10-01T00:00 var et kolonnenavn) ..

Det ville være hyggelig hvis EML-kontrollen sjekket numHeaderLines-verdien.
    
### numHeaderLines = 0{#numheaderlines--0} 
Noen kildefiler har ikke kolonnenavn. ERDDAP™ aksepterer at hvis EML beskriver samme antall kolonner.

Etter min mening: Dette virker veldig farlig. Det kan være kolonner i en annen rekkefølge eller med ulike enheter (Se nedenfor) Og det er ingen måte å fange disse problemene på. Det er mye bedre hvis alle ASCII-datafiler har en rad med kolonnenavn.
    
### DateTime Format strenger{#datetime-format-strings} 
EML har en standard måte å beskrive dato tidsformater. Men det er betydelig variasjon i bruk i EML-filer. (Jeg tok tidligere feil i dette. Jeg ser EML-dokumentasjonen for formatString som ser ut til å matche [ Java DatoTimeFormater spesifikasjon](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html) , men som mangler de viktige retningslinjene om bruken, med det resultat at formatString ofte/vanligvis ikke brukes.) Det er flere tilfeller med feil tilfelle, og/eller feil duplisering av et bokstav, og/eller ikke-standard formatering. Det legger en urimelig byrde på klienter, spesielt programvareklienter som GenerererDatasetsXml. Opprett datasett Xml forsøker å konvertere feil definerte formater i EML-filer til
 [dato/tid-format som ERDDAP™ krever](/docs/server-admin/datasets#string-time-units) som er nesten identisk med Java /Joda tidsformat spesifikasjon, men er litt mer tilgivende.

Det vil være hyggelig hvis EML-kontrollen krever streng overholdelse av Java /Joda/ ERDDAP tidsenhetsspesifikasjon og verifisert at datoverdier i datatabellen kan tolkes korrekt med det angitte formatet.
    
### Datotid, men ingen tidssone{#datetime-but-no-time-zone} 
Opprett datasett Xml ser etter en kolonne med dato Tid og en spesifisert tidssone (eller Zulu : fra tidsenheter som slutter i «Z» eller en kolonnenavn eller attributtdefinisjon som inkluderer "gmt" eller "utc", eller lokal: fra "lokal" i kolonnenavnet eller attributtdefinisjonen) .. Også akseptabelt er en fil med en datokolonne, men ingen tidskolonne. Også akseptable er en fil uten dato eller tidsinformasjon.

Opprett datasett Xml behandler alle lokale tider som fra tidssonen som du kan spesifisere for et gitt antall filer, for eksempel for SBC LTER, bruk US/Pacific. Informasjonen er noen ganger i kommentarene, men ikke i et skjema som er enkelt for et dataprogram å finne ut.

Filer som ikke oppfyller disse kriteriene avvises med meldingen " NO Good DATE (TIME) Variabel". Vanlige problemer er:

* Det er en kolonne med datoer og en kolonne med tider, men ikke dato Tidskolonne.
* Det er tidsenheter, men tidssonen er ikke spesifisert.

Andre kommentarer:
Hvis det er en god dato + tid med tidssonekolonne, vil den kolonnen bli kalt "time" i ERDDAP .. ERDDAP™ krever at tidskolonnedata er forståelige/konvertible til Zulu /UTC/GMT tidssone datoTider. \\[ Min tro er: å bruke lokale tider og ulike dato / tidsformater (2 siffer år&#33; mm/dd/yy vs dd/mm/yy vs ...) i datafiler tvinger sluttbrukeren til å gjøre kompliserte konverteringer til Zulu Tid for å sammenligne data fra ett datasett med data fra et annet. Så ERDDAP™ standardiserer all tid data: i strenge tider, ERDDAP™ Bruker alltid ISO 8601:2004 (E) standardformat, for eksempel 1985-01-02T00:00:00Z. For numeriske tider, ERDDAP™ Bruker alltid "seconds since 1970-01-01T00:00:00Z" .. ERDDAP™ Bruker alltid Zulu   (UTC, GMT) tidssone for å fjerne vanskelighetene med å jobbe med ulike tidssoner og standardtid versus dagslys sparetid. Generer datasett Xml søker en EML-datatabellkolonne med dato+tid Zulu .. Dette er vanskelig fordi EML ikke bruker et formelt ordforråd/system (som [ Java /Joda tidsformat](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html) ) for å spesifisere dataene Tidsformat:
Hvis det er en col med numeriske tidsverdier (f.eks. Matlab ganger) og Zulu tidssone (eller bare datoer uten tidskolonner) Den brukes som "time" ..
Hvis det er et samarbeid med dato- og tidsdata, bruker Zulu Tidssonen brukes som "time" og alle andre dato- eller tidskolonner fjernes.
Elles hvis en kollega med bare datoinformasjon er funnet, brukes den som "time" variabel (Ingen tidssone) ..
Hvis det er en datakolonne og en tidskolonne og ingen kombinert dato Tidskolonnen, datasettet er REJECTED - men datasettet kan gjøres brukbare ved å legge til en kombinert dato Tidskolonne (fortrinnsvis, Zulu Tidssone) til datafilen og legger til beskrivelsen i EML-filen.
Eksempler fra SBC LTER: [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) Datatabell #2.

Det ville være fint hvis EML/LTER krevde innkludering av en kolonne med Zulu   (UTC, GMT) tidssonetider i alle relevante kildedatafiler. Neste best er å legge til et system i EML for å angi en time\\_zone attributt ved bruk av standardnavn (fra [TZ-kolonne](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) ..
    
### Manglende missing\\_value  {#missing-missing_value} 
Noen kolonner bruker en missing\\_value men ikke liste det i EML metadata, for eksempel nedbør\\_mm i knb-lter-sbc.5011 bruker -999. Hvis ingen manglende verdi er angitt i EML, kan du automatisk søke etter vanlige manglende verdier. (f.eks. 99, -99, 999, -999, 9999, -9999, etc) Dette skaper metadata. Andre savnede missing\\_value S er ikke fanget.

Det ville være hyggelig hvis EML-kontrollen lette etter manglende missing\\_value S.
    
### Små problemer{#small-problems} 
Det er mange små problemer (staving, tegnsetting) Som sannsynligvis kun vil bli funnet ved et menneske som inspiserer hvert datasett.

Det ville vært hyggelig hvis EML-kontrollen søkte etter staving og grammatiske feil. Dette er et vanskelig problem fordi ord i vitenskap ofte er flagget av stavekontrollene. Menneskelig redigering er sannsynligvis nødvendig.
    
### Ugyldige Unicode- tegn{#invalid-unicode-characters} 
Noen av EML-innholdet inneholder ugyldige Unicode-tegn. Dette er sannsynligvis tegn fra Windows tegnsett som var feil kopiert og limt inn i UTF-8 EML-filer. Opprett datasett Xml renser disse tegnene til f.eks. \\[ #128 \\] Så de er enkle å lete etter i ERDDAP™   datasets.xml fil.

Det ville vært hyggelig hvis EML-kontrollen sjekket for dette. Det er enkelt å finne og enkelt å fikse.
    
### Ulike kolonneenheter] (#DifferentColumnUnites)  {#different-column-unitsdifferentcolumnunits} 
Noen EML-datatabeller definerer kolonner som er inkonsekvente med kolonnene i datafilen, spesielt fordi de har forskjellige enheter. Opprett datasett Xml flagger disse. Det er opp til operatøren å bestemme om forskjellene er ok eller ikke. Disse vises i feilfilen som "SKIPPED" datatabeller. EKSEMPLE i SBC LTER feil fil:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Det ville være fint hvis EML sjekkeren sjekket at enhetene passer. Dessverre er dette sannsynligvis umulig å fange og så umulig å løse uten å kontakte datasettskaperen, siden kildefilen ikke inneholder enheter. Diskrepansen for eksemplet ovenfor var bare merkbar fordi enhetene var inkludert i kildekolonnenavnet og EML-kolonnenavnet. Hvor mange andre datatabeller har dette problemet, men er ugjenkjennelige?
    
### Ulike versjoner av EML{#different-versions-of-eml} 
Opprett datasett Xml er designet for å jobbe med EML Pioglitaine. Andre versjoner av EML vil fungere i den grad de passer til 1.1.1 eller som GeneraDatasetsXml har spesiell kode for å håndtere det. Dette er et sjeldent problem. Når det oppstår, er løsningen å konvertere filene dine til EML260, eller sende EML-filen til erd.data at noaa.gov , så jeg kan gjøre endringer i Genererer Datasett Xml å håndtere forskjellene.

Bob la til støtte for EML-filer til GenerererDatasett Xml i 2016 med håp om at det vil bli noe opptak i EML-samfunnet. Fra 2020 har det ikke skjedd. Bob legger gjerne til støtte for nyere versjoner av EML, men bare hvis de nye funksjonene faktisk vil bli brukt. Vennligst e-post erd.data at noaa.gov Hvis du vil ha støtte for nyere versjoner av EML og vil faktisk bruke denne funksjonen.
    
### Problem med å lagre datafilen{#trouble-parsing-the-data-file} 
Sjeldent kan en datatabell bli avvist med feilen " uventet antall elementer på linje #120 (observert = 52, forventet = 50) " En feilmelding som dette betyr at en linje i datafilen hadde et annet antall verdier enn de andre linjene. Det kan være et problem i ERDDAP™   (For eksempel, ikke tolke filen riktig) eller i filen. Eksempler fra SBC LTER:
 [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) datatabell #3, se datafil=LTER\\_månedlig\\_bottledata\\_registrerte\\_stasjoner\\_20140429.txt
