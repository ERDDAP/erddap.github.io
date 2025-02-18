---
title: "EDDTableFromEML"
sidebar_position: 6
---
# Den EDDTableFraEML og EDDTableFraEMLBatch Valgmuligheder i GenererDatasets Xml

\\[Denne webside vil kun være af interesse forERDDAP™Administratorer, der arbejder med EML-filer.
Dette dokument blev oprindeligt oprettet i 2016. Det blev senest redigeret den 30. april 2020.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)er en dataserver, der giver brugerne en enkel, konsekvent måde at downloade subsets af gitterded og faneformede videnskabelige datasæt i almindelige filformater og lave grafer og kort.ERDDAP™arbejder med en given datasæt som enten en gruppe multidimensionelle gitterded variabler (f.eks. satellit- eller modeldata) eller som en databaselignende tabel (med en kolonne for hver type oplysninger og en række for hver observation) .ERDDAP™er gratis og Open Source Software, så alle kan[download og installationERDDAP™](/docs/server-admin/deploy-install)at tjene deres data.

Sådan tilføjer du et datasæt til etERDDAP™installation, installationERDDAP™Administrator skal tilføje en smule XML, der beskriver datasættet til en fil kaldetdatasets.xml. (Der er der[grundig dokumentation fordatasets.xml](/docs/server-admin/datasets).) Selvom det er muligt at generere klumpen af XML fordatasets.xmlhelt ved hånden,ERDDAP™leveres med et værktøj kaldet[ **GenererDatasetsXml** ](/docs/server-admin/datasets#tools)som kan generere det grove udkast til omfanget af XML nødvendig for en given datasæt baseret på nogle oplysninger om datasættet.

Den første ting GenererDatasets Xml spørger, hvilken type datasæt du ønsker at oprette. GenererDatasets Xml har en særlig mulighed, **EDDTableFraEML** , som bruger oplysningerne i en[Ecological Metadata Sprog (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML-fil til at generere klumpen af XML fordatasets.xmlat oprette en[EDDTableFraAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)datasæt fra hver datatabel i en EML-fil. Dette fungerer meget godt for de fleste EML-filer, for det meste fordi EML-filer gør et fremragende job for at gemme alle de nødvendige metadata til et datasæt i et let-til-arbejde-med format. De oplysninger, der GenererDatasetsXml skal oprette datasæt, er i EML-filen, herunder URL for datafilen, som GenererDatasetsXml downloads, parses og sammenligner til beskrivelsen i EML-filen. (Mange grupper vil gøre godt for at skifte til EML, som er et godt system til at dokumentere eventuelle tabulære videnskabelige datasæt, ikke kun økologiske data. Og mange grupper, der skaber XML schemas ville gøre godt at bruge EML som en case undersøgelse for XML schema, der er klar, til det punkt, ikke overdrevent dyb (dvs. for mange niveauer) , og let for mennesker og computere at arbejde med.) 

## Spørgsmål og svar{#questions} 

Her er alle spørgsmål GenererDatasets Xml vil spørge, med kommentarer om, hvordan du skal svare, hvis du ønsker at behandle kun en EML-fil eller en batch af EML-filer:

* Hvilken EDDType?
Hvis du ønsker at behandle en fil, skal du svare: EDDTableFraEML
Hvis du vil behandle en gruppe filer, skal du svare: EDDTableFraEMLBatch
* Directory til at gemme filer?
Indtast navnet på den mappe, der vil blive brugt til at gemme downloadede EML og/eller datafiler.
Hvis mappen ikke findes, oprettes den.
*    (Til EDDTableFraEML kun) EML URL eller lokal filnavn?
Indtast URL-adressen eller det lokale filnavn på en EML-fil.
*    (Til EDDTableFraEMLBatch kun) EML dir (URL eller lokal) ?
Indtast navnet på mappen med EML-filer (en URL eller en lokal dir) .
For eksempel: http://sbc.lternet.edu/data/eml/files/
 
*    (Til EDDTableFraEMLBatch kun) Omdøbt regex?
Indtast det regulære udtryk, der vil blive brugt til at identificere de ønskede EML-filer i EML-mappen.
For eksempel: knb-lter-sbc«.
* Brug lokale filer, hvis de er til stede (sande sande sande sande|falsk) ?
Indtast sande for at bruge de eksisterende lokale EML-filer og datafiler, hvis de findes.
Indtast falsk for altid at downloade EML-filer og / eller datafiler.
* tilgængelig Vil du?
Hvis du vil have de nye datasæt til at være private datasæt iERDDAP, angive navnet på gruppen (s s s) det vil være tilladt adgang.
Anbefalet til LTER grupper: kombinere "lter" plus gruppen, f.eks. lter Sbc .
Hvis du indtaster "null", vil der ikke være nogen&lt;tilgængelig Til&gt; tag i output.
Se endnu[tilgængelig Sådan skal du til](/docs/server-admin/datasets#accessibleto).
* lokal lokal lokal lokal lokal lokal lokale TimeZone (f.eks. US/Pacific) ?
Hvis en tidsvariabel angiver, at det har lokale tidsværdier, vil denne tidszone blive tildelt.
Dette skal være en værdi fra[TZ kolonne liste over tidszonenavne](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Bemærk alle de brugervenlige "US/..." navne i slutningen af listen.
Hvis du senere finder det, der skal være forkert, kan du ændre ændringen.time\\_zonei bunden afdatasets.xml.

EML plusERDDAP™er en stor kombination, daERDDAP™kan give brugerne mere direkte adgang til rigdom af[Vidensnet for Biocomplexity (KNB) ](https://knb.ecoinformatics.org/)og og og[Langtids Økologisk forskning (LTER) ](https://lternet.edu/)data og hjælpe dem med at møde den amerikanske regerings[Offentlig adgang til forskningsresultater (PARR) krav](https://nosc.noaa.gov/EDMC/PD.DSP.php)ved at gøre de tilgængelige data via en webtjeneste. Også, EML plusERDDAP™synes som en stor bro mellem forskere i det akademiske / NSF-funderede rige og forskere i det føderale agentur (NOAA, NASA, USGS) rige.

Se vores udvalg[sektion om at få ekstra støtte](/docs/intro#support).
 
## Designdetaljer{#design-details} 

Her er designdetaljerne for EDDTableFraEML mulighed i GenererDatasetsXml.
Nogle er relateret til forskelle i, hvordan EML ogERDDAP™gøre ting og hvordan GenererDatasets Xml behandler disse problemer.

### En dataTable Bliver enERDDAP™Datasæt{#one-datatable-becomes-one-erddap-dataset} 
En EML fil kan have flere&lt;Datadata Tabel&gt;s.ERDDAP™gør énERDDAP™Datasæt pr EML dataTable. The The The The The The ThedatasetIDfor datasættet er
 *EMLName* \\_t *tabelnummer*   (når EMLname er tekst) eller eller eller
 *System\\_EMLName* \\_t *tabelnummer*   (når EMLname er et nummer) .
For eksempel, tabel #1 i filen knb-lter-sbc.28, bliverERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML mod CF+ACDD{#eml-versus-cfacdd} 
Næsten alle metadata i EML-filer bliver iERDDAP, men i et andet format.ERDDAP™Brug af cookies[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og og og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder. De er komplementære metadatasystemer, der bruger nøgle=værdipar til globale metadata og for hver variabels metadata.
Ja, EML-præsentationen af metadata er pænere end CF+ACDD-præsentationen. Jeg foreslår ikke at bruge CF+ACDD-præsentationen som erstatning for EML. Tænk på CF+ACDD som en del af broen fra EML verden til EML verdenOPeNDAP/CF/ACDD verden.
     
### Små ændringer{#small-changes} 
ERDDAP™gør en masse små ændringer. For eksempel,ERDDAP™Brug af EML ikke-DOIalternativ alternativ Identifier plus et dataTabelt nummer somERDDAP™ datasetID, men lidt ændringer alternativ Identifier til at gøre det et gyldigt variabelt navn på de fleste computersprog, f.eks. knb-lter-sbc.33 data Tabel #1 bliver knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook{#docbook} 
EML bruger DocBooks mærkningssystem til at give struktur til blokke af tekst i EML-filer. CF og ACDD kræver, at metadata er almindelig tekst. Så GenererDatasets Xml konverterer den markerede tekst til almindelig tekst, der ligner den formaterede version af teksten. Inline tags er helliget med firkantede beslag, f.eks.\\[understregede\\], og venstre i tekst.
     
### Datafiler{#data-files} 
Da EML-dataTable indeholder URL'en for den faktiske datafil, indeholder GenererDatasetsets Xml vil:
1. Hent datafilen.
2. Gem det i samme mappe som EML-filen.
3. Læs oplysningerne.
4. Sammenlign beskrivelsen af dataene i EML med de faktiske data i filen.
5. Hvis GenererDatasets Xml finder forskelle, det beskæftiger sig med dem, eller spørger operatøren, om forskellene er okay, eller returnerer en fejlmeddelelse. Detaljerne er i forskellige emner nedenfor.
         
### .zip'd Datafiler{#zipd-data-files} 
Hvis den registrerede datafil er en.zipfil, det skal indeholde kun én fil. Denne fil vil blive brugt tilERDDAP™Datasæt. Hvis der er mere end 1 fil.ERDDAP™vil afvise, at datasæt. Hvis det er nødvendigt, kan dette ændres. (I praksis har alle SBC LTER zip-filer kun en datafil.)   
     
### Opbevaringstype{#storagetype} 
Hvis en kolonnes opbevaring Type er ikke angivet,ERDDAP™Brug dens bedste gætte baseret på dataene i datafilen. Dette virker ret godt.
     
### Enheder{#units} 
ERDDAP™Brug af anvendelser[UDUNITSformatering for enheder](https://www.unidata.ucar.edu/software/udunits/). GenererDatasets Xml er i stand til at konvertere EML enheder tilUDUNITSrent omkring 95% af tiden. De resterende 5% resulterer i en læsbar beskrivelse af enhederne, f.eks. "biomassDensityUnitPerAbundanceUnit" i EML bliver "biomasstæthed enhed pr overflod enhed" iERDDAP. Teknisk set er dette ikke tilladt. Jeg tror ikke det er så slemt under omstændighederne.\\[Hvis det er nødvendigt, kan enheder, der ikke kan gøresUDUNITSkompatible kunne flyttes til den variables kommentar attribut.\\]  
     
### EML version 2.1.1{#eml-version-211} 
Denne understøttelse af EML v2.1.1 filer blev tilføjet til GenererDatasets Xml i 2016 med håb om, at der ville være nogle optagelse i EML fællesskabet. I 2020 er det ikke sket. The The The The The The TheERDDAP™udviklere ville være glade for at tilføje støtte til flere nyeste versioner af EML, men kun hvis de nye funktioner faktisk vil blive brugt. Send en mailerd.data at noaa.govhvis du vil støtte til flere seneste versioner af EML og vil faktisk bruge denne funktion.
     

## Problemer med EML-filer{#issues-with-the-eml-files} 

Der er nogle problemer / problemer med EML-filer, der forårsager problemer, når en software klient (såsom EDDTableFraEML mulighed i GenererDatasetsXML) forsøger at fortolke / behandle EML-filer.

* Selvom der er flere spørgsmål opført her, er de mest små, sålvbare problemer. Generelt er EML et stort system, og det har været min fornøjelse at arbejde med det.
* Disse er omtrent sorteret fra værste / mest almindelige til mindst dårlige / mindre almindelige.
* De fleste er relateret til små problemer i specifikke EML-filer (som ikke er EML's fejl) .
* De fleste kan fastsættes ved enkle ændringer i EML-filen eller datafilen.
* I betragtning af at LTER mennesker bygger en EML-tjeker for at teste gyldigheden af EML-filer, har jeg tilføjet nogle forslag nedenfor om funktioner, der kan tilføjes til checkeren.

Her er problemerne:

### Separat dato og time kolonner{#separate-date-and-time-columns} 
Nogle datafiler har separate kolonner for dato og for tid, men ingen samlet dato + time kolonne. I øjeblikket, GenererDatasets Xml skaber et datasæt med disse separate kolonner, men det er ikke ideelt, fordi:

* Det er bedst, hvis datasæt iERDDAP™har en samlet dato+time kolonne kaldet"time".
* Ofte vil datasættet ikke indlæse iERDDAP™fordi"time"kolonne har ikke dato+time data.

Der er to mulige løsninger:
1. Rediger kildedatafilen for at tilføje en ny kolonne i datafilen (og beskrive det i EML) hvor dato og tidskolonner flettes i en kolonne. Så rerun GenererDatasets Xml, så det finder den nye kolonne.
2. Brug af[Afledte Varer](/docs/server-admin/datasets#script-sourcenamesderived-variables)Funktioner i trækERDDAP™at definere en ny variabel idatasets.xmlsom skabes ved at samle datoen og tidskolonnerne. En af eksemplerne omhandler især denne situation.
         
### Inconsistent kolonnenavne{#inconsistent-column-names} 
EML-filer lister datafilens kolonner og deres navne. Desværre er de ofte forskellige fra kolonnenavnene i den faktiske datafil. Normalt er kolonneordren i EML-filen den samme som kolonneordren i datafilen, selvom navnene varierer lidt, men ikke altid. GenererDatasets Xml forsøger at matche kolonnenavnene. Når det ikke kan (som er fælles) , det vil stoppe, vise dig EML / data filnavn par, og spørge om de er korrekt afstemt. Hvis du indtaster 's' for at springe et bord, vil GenererdDatasetsXml udskrive en fejlmeddelelse og gå på den næste tabel.
Løsningen er at ændre de fejlagtige kolonnenavne i EML-filen for at matche kolonnenavnene i datafilen.
     
### Forskellige kolonner Ordre{#different-column-order} 
Der er flere tilfælde, hvor EML specificerede kolonnerne i en anden rækkefølge, end de findes i datafilen. GenererDatasets Xml vil stoppe og spørge operatøren, hvis matchups er okay, eller hvis datasættet skal springes. Hvis det springes, vil der være en fejlmeddelelse i resultatfilen, f.eks.:
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
Løsningen er at fastsætte kolonneordren i disse EML-filer, så de matcher ordren i datafiler.

Det ville være rart, hvis EML-kontrollen kontrollerede, at kolonner og kolonneordre i kildefilen matcher kolonner og kolonneordre i EML-filen.
    
### Forkerte numHeaderLines{#incorrect-numheaderlines} 
Flere data Tabeller forkert tilstand numHeaderLines =, f.eks. ...sbc.4011. Dette årsagerERDDAP™at læse den første linje af data som kolonnenavne. Jeg forsøgte at manuelt SKIP alle disse dataTables. De er indlysende, fordi de uovertruffen kildenavne er alle dataværdier. Og hvis der er filer, der forkert har numHeaderLines=0, gør mit system ikke det indlysende. Her er et eksempel fra SBC LTER-fejlfilen:
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
Så fejlen kan vises som om GenererDatasets Xml mener, at den første linje med data i filen (f.eks. med 2008-10-01T00:00 osv.) er linjen med kolonnenavne (som om 2008-10-01T00:00 var et kolonnenavn) .

Det ville være rart, hvis EML checker kontrollerede numHeaderLines værdi.
    
### NumHeaderLines = 0{#numheaderlines--0} 
Nogle kildefiler har ikke kolonnenavne.ERDDAP™accepterer, at hvis EML beskriver det samme antal kolonner.

Efter min mening: dette synes meget farligt. Der kan være kolonner i en anden rækkefølge eller med forskellige enheder (se nedenfor) og der er ingen måde at fange disse problemer. Det er meget bedre, hvis alle ASCII-datafiler har en række med kolonnenavne.
    
### DateTime Format strenge{#datetime-format-strings} 
EML har en standard måde at beskrive dato tidsformater. Men der er betydelig variation i dens brug i EML-filer. (Jeg var tidligere forkert om dette. Jeg ser EML-dokumentationen til formatString, som vises for at matche[JavaDateTimeFormatter specifikation](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), men som mangler de vigtige retningslinjer for dens brug, med det resultat, at formatString ofte bruges forkert.) Der er flere forekomster med forkert sag, og/eller forkert kopiering af et brev, og/eller ikke-standard formatering. Det sætter en urimelig byrde på klienter, især softwareklienter som GenererDatasetsXml. GenererDatasets Xml forsøger at konvertere de forkert definerede formater i EML-filer til
[dato/time format, derERDDAP™kræver behov](/docs/server-admin/datasets#string-time-units), som næsten er identisk med forJava/Joda tidsformat specifikation, men er lidt mere tilgivende.

Det ville være rart, hvis EML checker krævede streng overholdelse til denJava/Joda /ERDDAPtimeenheder specifikation og verificeret, at datotidsværdierne i datatabellen kunne parres korrekt med det angivne format.
    
### Datotid men ingen tidszone{#datetime-but-no-time-zone} 
GenererDatasets Xml ser ud til en kolonne med dato Tid og en bestemt tidszone (entenZulu: fra tid enheder, der slutter i 'Z' eller et kolonnenavn eller attributdefinition, der indeholder "gmt" eller "utc", eller lokal: fra "lokal" i kolonnenavnet eller attributdefinitionen) . Også acceptabelt er en fil med en datokolonne, men ingen tidskolonne. Også acceptabelt er en fil uden dato eller tid information.

GenererDatasets Xml behandler alle "lokal" gange som værende fra tidszonen, som du kan angive for et givet batch af filer, f.eks. SBC LTER, bruge US/Pacific. Oplysningerne er nogle gange i kommentarerne, men ikke i en form, der er let for et computerprogram at finde ud af.

Filer, der ikke opfylder disse kriterier, afvises med meddelelsen "NO GOOD DATE (Tidstid) VARIABLE. Almindelige problemer er:

* Der er en kolonne med datoer og en kolonne med gange, men ikke dato Tidskolonne.
* Der er tidsenheder, men tidszonen er ikke angivet.

Andre kommentarer:
Hvis der er en god dato+time med tidszone kolonne, vil kolonnen blive opkaldt"time"i in in in inERDDAP.ERDDAP™kræver, at kolonnedata kan forstås/konvertible for atZulu/UTC/GMT tidszone datoTimes.\\[Min tro er: brug af lokale tider og forskellige dato/time formater (2-cifrede år&#33; mm/dd/yyy vs dd/mm/yyyy vs...) i datafiler styrker slutbrugeren til at gøre komplicerede konverteringer tilZulutid for at sammenligne data fra et datasæt med data fra en anden. SåERDDAP™standardiserer alle tidsdata: Til strenge tider,ERDDAP™Brug altid ISO 8601:2004 (E) standardformat, for eksempel 1985-02T00:00:00Z. Til numeriske tider,ERDDAP™Brug altid"seconds since 1970-01-01T00:00:00Z".ERDDAP™Brug altid brugerenZulu  (UTC, GMT) tidszone for at fjerne vanskelighederne ved at arbejde med forskellige tidszoner og standardtid i forhold til dagslysbesparende tid. Så GenererDatasets Xml søger en EML-dataTabel kolonne med dato+timeZulu. Dette er svært, fordi EML ikke bruger et formelt ordforråd/system (kan lide[Java/Joda tidsformat](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) for at angive data Tidsformat:
Hvis der er en col med numeriske tidsværdier (fx,Matlabgange tider) og og ogZulutidszone (eller bare datoer, uden tidskolonner) , det bruges som"time".
Hvis der er en col med dato- og klokkeslætsdata, skal du brugeZulutidszone, det bruges som"time"og enhver anden dato eller tidskolonne fjernes.
Ellers hvis en col med bare dato oplysninger findes, bruges det som den"time"variabel variabel variabel variabel (uden tidszone) .
Hvis der er en datakolonne og en tidskolonne og ingen kombinerede dato Tidskolonne, datasættet er REJECTED — men datasættet kan gøres brugbar ved at tilføje en kombineret dato Tidskolonne (helst, helstZulutidszone) til datafilen og tilføje sin beskrivelse i EML-filen.
EXAMPLE fra SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)DataTable #2.

Det ville være rart, hvis EML/LTER krævede optagelse af en kolonne medZulu  (UTC, GMT) tidszone gange i alle relevante kildedatafiler. Næste bedste er at tilføje et system til EML for at angive ettime\\_zoneattribut ved hjælp af standardnavne (fra fra[TZ kolonne](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Missingmissing\\_value {#missing-missing_value} 
Nogle kolonner bruger enmissing\\_valuemen ikke liste det i EML-metadata, f.eks. nedbør\\_mm i knb-lter-sbc.5011 anvendelser -999. Hvis ingen manglende værdi er angivet i EML, søger GenererDatasetsXml automatisk almindelige manglende værdier (f.eks. 99, -99, 999, -999, 9999, -9999, etc) og skaber disse metadata. Men andre manglermissing\\_values er ikke fanget.

Det ville være rart, hvis EML checker kiggede efter manglendemissing\\_values.
    
### Små problemer{#small-problems} 
Der er en masse små problemer (stavemåde, tegnsætning) som sandsynligvis kun vil blive fundet af et menneske, der inspicerer hvert datasæt.

Det ville være rart, hvis EML checker kiggede på stavemåde og grammatiske fejl. Dette er et vanskeligt problem, fordi ord i videnskaben ofte flages af stavekontrollen. Menneskeredigering er sandsynligvis nødvendig.
    
### Ugyldige Unicode tegn{#invalid-unicode-characters} 
Nogle af EML-indholdet indeholder ugyldige Unicode-tegn. Disse er sandsynligvis tegn fra Windows charset, der var forkert kopieret og gik ind i UTF-8 EML-filer. GenererDatasets Xml helliger disse tegn for eksempel,\\[#128\\], så de er nemme at søge efter i søgningenERDDAP™ datasets.xmlfil.

Det ville være rart, hvis EML checker tjekket for dette. Det er nemt at finde og nemt at løse.
    
### Forskellige kolonneenheder] (#forskellige kolonneUnits)  {#different-column-unitsdifferentcolumnunits} 
Nogle EML dataTables definerer kolonner, der er uforenelige med kolonnerne i datafilen, især fordi de har forskellige enheder. GenererDatasets Xml flager disse. Det er op til føreren at beslutte, om forskellene er okay eller ej. Disse vises i fejlfilen som "SKIPPED" dataTables. EXAMPLE i SBC LTER fejlfil:
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
Det ville være rart, hvis EML checker kontrollerede, at enhederne matcher. Desværre er dette sandsynligvis umuligt at fange og så umuligt at løse uden at kontakte datasættets skaber, fordi kildefilen ikke omfatter enheder. Diskrepancy for eksemplet ovenfor var kun mærkbart, fordi enhederne var inkluderet i kildekolonnenavnet og EML kolonne navn. Hvor mange andre dataTables har dette problem, men er ubestridelig?
    
### Forskellige versioner af EML{#different-versions-of-eml} 
GenererDatasets Xml er designet til at arbejde med EML 2.1.1. Andre versioner af EML vil arbejde i det omfang, de matcher 2.1.1, eller at GenererDatasetsXml har særlig kode til at håndtere det. Dette er et sjældent problem. Når det opstår, er løsningen at konvertere dine filer til EML 2.1.1, eller sende EML-filen tilerd.data at noaa.gov, så jeg kan foretage ændringer i GenererDatasets Xml til at håndtere forskellene.

Bob tilføjede understøttelse af EML-filer til GenererDatasets Xml i 2016 med håb om, at der ville være nogle optagelse i EML fællesskabet. I 2020 er det ikke sket. Bob er glad for at tilføje støtte til flere nyeste versioner af EML, men kun hvis de nye funktioner faktisk vil blive brugt. Send en mailerd.data at noaa.govhvis du vil støtte til flere seneste versioner af EML og vil faktisk bruge denne funktion.
    
### Fejlfinding af datafilen{#trouble-parsing-the-data-file} 
Sjældent kan en dataTabel afvises med fejlen "uventet antal varer på linje #120 (observeret=52, forventet=50) " " " " En fejlmeddelelse som dette betyder, at en linje i datafilen havde et andet antal værdier end de andre linjer. Det kan være et problem iERDDAP™  (f.eks. ikke parsing af filen korrekt) eller i filen. EXAMPLE fra SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)DataTable #3, se datafil=LTER\\_månedly\\_bottledata\\_registreret\\_stations\\_20140429.txt
