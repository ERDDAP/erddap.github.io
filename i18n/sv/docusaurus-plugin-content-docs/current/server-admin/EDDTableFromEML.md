---
title: "EDDTableFromEML" 
---
# EDDTableFromEML och EDDTableFromEMLBatch Alternativ i GenerateDatasets Xml

\\[Denna webbsida kommer endast att vara av intresse förERDDAP™administratörer som arbetar med EML-filer.
Detta dokument skapades ursprungligen 2016. Det senast redigerades 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)är en dataserver som ger användarna ett enkelt, konsekvent sätt att ladda ner delmängder av ruttna och tabell vetenskapliga datamängder i vanliga filformat och göra grafer och kartor.ERDDAP™fungerar med en viss datamängd som antingen en grupp multidimensionella rutnätsvariabler (t.ex. satellit- eller modelldata) eller som en databasliknande tabell (med en kolumn för varje typ av information och rad för varje observation) .ERDDAP™är fri och öppen programvara, så vem som helst kan[Ladda ner och installeraERDDAP™](/docs/server-admin/deploy-install)att tjäna sina data.

För att lägga till en dataset till enERDDAP™installation,ERDDAP™administratören måste lägga till en bit av XML som beskriver datamängden till en fil som kallasdatasets.xml. (Det finns[grundlig dokumentation fördatasets.xml](/docs/server-admin/datasets).) Även om det är möjligt att generera biten av XML fördatasets.xmlhelt för hand,ERDDAP™Kommer med ett verktyg som kallas[ **GenerateDatasetsXml** ](/docs/server-admin/datasets#tools)som kan generera det grova utkastet av XML-kanalen som behövs för en viss datamängd baserat på någon informationskälla om datamängden.

Det första GenerateDatasets Xml frågar är vilken typ av dataset du vill skapa. GenerateDatasets Xml har ett speciellt alternativ, **EDDTableFromEML** som använder informationen i en[Ekologisk metadataspråk (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML-fil för att generera biten av XML fördatasets.xmlatt skapa en[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)datamängd från varje datatabell i en EML-fil. Detta fungerar mycket bra för de flesta EML-filer, främst eftersom EML-filer gör ett utmärkt jobb med att lagra alla nödvändiga metadata för en datamängd i ett lättanvänt format. Den information som GenerateDatasetsXml behöver för att skapa datamängden finns i EML-filen, inklusive URL för datafilen, som GenerateDatasetsXml nedladdningar, parses och jämför med beskrivningen i EML-filen. (Många grupper skulle göra det bra att byta till EML, vilket är ett bra system för att dokumentera någon tabell vetenskaplig datamängd, inte bara ekologisk data. Och många grupper som skapar XML-scheman skulle göra bra för att använda EML som en fallstudie för XML-schema som är tydliga, till den punkten, inte alltför djupa. (dvs för många nivåer) och lätt för människor och datorer att arbeta med.) 

## Frågor{#questions} 

Här är alla frågor GenerateDatasets Xml kommer att fråga, med kommentarer om hur du ska svara om du vill behandla bara en EML-fil eller ett parti EML-filer:

* Vilken EDDType?
Om du vill behandla bara en fil, svara: EDDTableFromEML
Om du vill behandla en grupp filer, svara: EDDTableFromEMLBatch
* Katalog för att lagra filer?
Ange namnet på katalogen som kommer att användas för att lagra nedladdade EML- och/eller datafiler.
Om katalogen inte existerar kommer den att skapas.
*    (För EDDTableFromEML endast endast) EML URL eller lokal filnamn?
Ange URL- eller lokalt filnamn för en EML-fil.
*    (För EDDTableFromEMLBatch endast) EML Dir (URL eller lokal) ??
Ange namnet på katalogen med EML-filerna (En URL eller en lokal smuts) .
Till exempel: http://sbc.lternet.edu/data/eml/files/
 
*    (För EDDTableFromEMLBatch endast) Filename regex?
Ange det vanliga uttrycket som kommer att användas för att identifiera önskade EML-filer i EML-katalogen.
Till exempel: knb-lter-sbc\\.\\d+
* Använd lokala filer om det finns (sanning sant|falska lögner) ??
Ange dig för att använda de befintliga lokala EML-filerna och datafilerna, om de finns.
Ange falskt för att alltid ladda ner EML-filer och/eller datafiler.
* tillgänglig tillgänglig Till?
Om du vill att de nya datamängderna ska vara privata datamängder iERDDAPange namnet på gruppen (s) Det kommer att tillåtas åtkomst.
Rekommenderas för LTER-grupper: kombinera "lter" plus gruppen, t.ex. lter Sbc.
Om du går in i "Null", kommer det inte att finnas någon&lt;tillgänglig tillgänglig To & gt; tagga i utgången.
Se[tillgänglig tillgänglig för att](/docs/server-admin/datasets#accessibleto).
* lokalt Timezon (t.ex. US/Pacific) ??
Om en tidsvariabel indikerar att den har lokala tidsvärden kommer denna tidszon att tilldelas.
Detta måste vara ett värde från[TZ kolumn lista över tidszon namn](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Observera alla lättanvända "US / ..." namn i slutet av listan.
Om du senare upptäcker att vara felaktig kan du ändratime\\_zonei biten avdatasets.xml.

EML plusERDDAP™är en bra kombination, eftersomERDDAP™kan ge användarna mer direkt tillgång till rikedomen[Kunskapsnätverk för biokomplexitet (KNB) ](https://knb.ecoinformatics.org/)och[Långsiktig ekologisk forskning (Senare) ](https://lternet.edu/)data och hjälpa dessa projekt att möta den amerikanska regeringens[Offentlig tillgång till forskningsresultat (Parr) krav](https://nosc.noaa.gov/EDMC/PD.DSP.php)genom att göra data tillgängliga via en webbtjänst. EML plusERDDAP™verkar som en bra bro mellan forskare i den akademiska / NSF-finansierade världen och forskare i den federala byrån. (NOAANASA, USGS) Realm.

Se vår[sektion om att få ytterligare stöd](/docs/intro#support).
 
## Designdetaljer{#design-details} 

Här är designdetaljerna för alternativet EDDTableFromEML i GenerateDatasetsXml.
Vissa är relaterade till skillnader i hur EML ochERDDAP™Gör saker och hur GenerateDatasets Xml hanterar dessa problem.

### En datatabell blir enERDDAP™Dataset{#one-datatable-becomes-one-erddap-dataset} 
En EML-fil kan ha flera&lt;Datadata data Tabell & gt;s.ERDDAP™gör enERDDAP™dataset per EML dataTable. ochdatasetIDför dataset är
 *EMLName* \\_t *TableNumber*   (När EMLname är text) eller
 *System_EMLName* \\_t *TableNumber*   (När EMLname är ett nummer) .
Tabell #1 i filen knb-lter-sbc.28 blirERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML kontra CF+ACDD{#eml-versus-cfacdd} 
Nästan alla metadata i EML-filerna kommer inERDDAPMen i ett annat format.ERDDAP™Använder[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)och[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder. De är kompletterande metadatasystem som använder nyckel = värdepar för global metadata och för varje variabels metadata.
Ja, EML-representationen av metadata är trevligare än CF+ACDD-representationen. Jag föreslår inte att jag använder CF+ACDD-representationen som en ersättning för EML. Tänk på CF+ACDD som en del av bron från EML-världen tillOPeNDAP/CF/ACDD världen.
     
### Små förändringar{#small-changes} 
ERDDAP™gör många små förändringar. Till exempel,ERDDAP™använder EML icke-DOIAlternativt Identifier plus ett dataTabellnummer somERDDAP™ datasetIDMen något förändras växelvis Identifier för att göra det till ett giltigt variabelt namn på de flesta datorspråk, t.ex. knb-lter-sbc.33 data Tabell #1 blir knb\\_lter\\_sbc\\_33\\_t1.
     
### Docbook{#docbook} 
EML använder DocBooks markupsystem för att ge struktur till textblock i EML-filer. CF och ACDD kräver att metadata är vanlig text. Så GenerateDatasets Xml konverterar den markerade texten till vanlig text som ser ut som den formaterade versionen av texten. Inline-taggarna är sanerade med fyrkantiga fästen, t.ex.\\[betonas\\]och lämnas i den vanliga texten.
     
### Datafiler{#data-files} 
Eftersom EML dataTable innehåller URL för den faktiska datafilen, GenerateDatasets Xml kommer:
1. Ladda ner datafilen.
2. Lagra den i samma katalog som EML-filen.
3. Läs data.
4. Jämför beskrivningen av data i EML med de faktiska uppgifterna i filen.
5. Om GenerateDatasets Xml hittar skillnader, det handlar om dem eller frågar operatören om skillnaderna är okej eller returnerar ett felmeddelande. Detaljerna finns i olika artiklar nedan.
         
### .zipD-datafiler{#zipd-data-files} 
Om den refererade datafilen är en.zipfil, det måste innehålla bara en fil. Den filen kommer att användas förERDDAP™dataset. Om det finns mer än 1 fil.ERDDAP™kommer att avvisa detta dataset. Vid behov kan detta ändras. (I praktiken har alla SBC LTER zip-filer bara en datafil.)   
     
### StorageType{#storagetype} 
Om en kolumn lagring Typ anges inte,ERDDAP™använder sin bästa gissning baserat på data i datafilen. Detta fungerar ganska bra.
     
### Enheter{#units} 
ERDDAP™Användning[UDUNITSformatering för enheter](https://www.unidata.ucar.edu/software/udunits/). GenerateDatasets Xml kan konvertera EML-enheter tillUDUNITSRent ca 95% av tiden. De återstående 5% resultat i en läsbar beskrivning av enheterna, t.ex. "biomassDensityUnitPerAbundanceUnit" i EML blir "biomass densitet enhet per överflöd enhet" iERDDAP. Tekniskt är detta inte tillåtet. Jag tror inte att det är så dåligt under omständigheterna.\\[Om det behövs, enheter som inte kan görasUDUNITSkompatibel kan flyttas till variabelns kommentarattribut.\\]  
     
### EML version 2.1.1{#eml-version-211} 
Detta stöd för EML v2.1.1 filer lades till i GenerateDatasets Xml i 2016 med hopp om att det skulle bli lite upptag i EML-samhället. Från och med 2020 har det inte hänt. ochERDDAP™utvecklare skulle gärna lägga till stöd för nyare versioner av EML, men bara om de nya funktionerna faktiskt kommer att användas. Vänligen emailerd.data at noaa.govOm du vill ha stöd för nyare versioner av EML och faktiskt använder den här funktionen.
     

## Problem med EML-filerna{#issues-with-the-eml-files} 

Det finns några problem/problem med EML-filerna som orsakar problem när en mjukvaruklient (som alternativet EDDTableFromEML i GenerateDatasetsXML) försöker tolka/processa EML-filerna.

* Även om det finns flera frågor listade här, är de mestadels små, lösliga problem. I allmänhet är EML ett bra system och det har varit mitt nöje att arbeta med det.
* Dessa är ungefär sorterade från värsta / vanligaste till minst dåliga / mindre vanliga.
* De flesta är relaterade till små problem i specifika EML-filer (som inte är EML:s fel) .
* De flesta kan åtgärdas genom enkla ändringar i EML-filen eller datafilen.
* Med tanke på att LTER människor bygger en EML-kontroller för att testa giltigheten av EML-filer, har jag lagt till några förslag nedan om funktioner som kan läggas till i checkern.

Här är frågorna:

### Separat datum och tid kolumner{#separate-date-and-time-columns} 
Vissa datafiler har separata kolumner för datum och för tid, men ingen enhetlig datum + tid kolumn. För närvarande GenerateDatasets Xml skapar en dataset med dessa separata kolumner, men det är inte idealiskt eftersom:

* Det är bäst om datamängder iERDDAP™ha en kombinerad datum + tid kolumn kallas"time".
* Ofta kommer datamängden inte att laddas inERDDAP™för att"time"Kolumn har inte datum + tidsdata.

Det finns två möjliga lösningar:
1. Redigera källdatafilen för att lägga till en ny kolumn i datafilen (och beskriva den i EML) där datum- och tidskolumnerna slås samman i en kolumn. Sedan rerun GenerateDatasets Xml så det hittar den nya kolumnen.
2. Använda[Härledda variabler](/docs/server-admin/datasets#script-sourcenamesderived-variables)funktion iERDDAP™att definiera en ny variabel idatasets.xmlsom skapas genom att sammanfoga datum och tidskolumner. Ett exempel handlar specifikt om denna situation.
         
### Inkonsekventa kolumnnamn{#inconsistent-column-names} 
EML-filerna listar datafilens kolumner och deras namn. Tyvärr skiljer de sig ofta från kolumnnamnen i den faktiska datafilen. Normalt är kolumnordern i EML-filen densamma som kolumnordern i datafilen, även om namnen varierar något, men inte alltid. GenerateDatasets Xml försöker matcha kolumnnamnen. När det inte kan (som är vanligt) Det kommer att sluta, visa dig EML / data-filnamnpar och fråga om de är korrekt anpassade. Om du anger "s" för att hoppa över en tabell, kommer GeneratedDatasetsXml att skriva ut ett felmeddelande och gå vidare till nästa tabell.
Lösningen är att ändra felaktiga kolumnnamn i EML-filen för att matcha kolumnnamnen i datafilen.
     
### Olika kolumnorder{#different-column-order} 
Det finns flera fall där EML specificerade kolumnerna i en annan ordning än de finns i datafilen. GenerateDatasets Xml kommer att stoppa och fråga operatören om matchningarna är okej eller om datamängden ska hoppas över. Om den är hoppad kommer det att finnas ett felmeddelande i resultatfilen, t.ex.:
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
Lösningen är att fixa kolumnordningen i dessa EML-filer så att de matchar ordern i datafilerna.

Det skulle vara trevligt om EML-kontrollen kontrollerade att kolumnerna och kolumnordern i källfilen matchar kolumnerna och kolumnordern i EML-filen.
    
### Felaktigt numHeaderLines{#incorrect-numheaderlines} 
Flera data Tabeller anger felaktigt numHeaderLines=1, t.ex. ...sbc.4011. Detta orsakarERDDAP™för att läsa den första raden av data som kolumnnamnen. Jag försökte manuellt SKIP alla dessa dataTables. De är uppenbara eftersom de oöverträffade källkodsnamnen är alla datavärden. Och om det finns filer som felaktigt har numHeaderLines = 0, gör mitt system inte det självklart. Här är ett exempel från SBC LTER-felfilen:
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
Så felet kan visas som om GenerateDatasets Xml anser att den första raden med data i filen (t.ex. med 2008-10-01T00:00 etc.) är linjen med kolumnnamn (som om 2008-10-01T00:00 var ett kolumnnamn) .

Det skulle vara trevligt om EML checker kontrollerade numHeaderLines värde.
    
### NumHeaderLines = 0{#numheaderlines--0} 
Vissa källfiler har inte kolumnnamn.ERDDAP™accepterar att om EML beskriver samma antal kolumner.

Enligt min mening verkar detta mycket farligt. Det kan finnas kolumner i en annan ordning eller med olika enheter (Se nedan) Det finns inget sätt att fånga dessa problem. Det är mycket bättre om alla ASCII datafiler har en rad med kolumnnamn.
    
### DateTime Format Strings{#datetime-format-strings} 
EML har ett standard sätt att beskriva datumtidsformat. Men det finns stor variation i dess användning i EML-filer. (Jag hade tidigare fel om detta. Jag ser EML-dokumentationen för formatString som verkar matcha[JavaDateTimeFormatter specifikation](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), men som saknar de viktiga riktlinjerna om dess användning, med resultatet att formatString ofta / vanligtvis felaktigt används.) Det finns flera fall med felaktigt fall och/eller felaktig duplicering av ett brev och/eller icke-standardformatering. Det sätter en orimlig börda på kunder, särskilt mjukvaruklienter som GenerateDatasetsXml. GenerateDatasets Xml försöker konvertera felaktigt definierade format i EML-filerna till
[datum/tidsformat somERDDAP™Kraven](/docs/server-admin/datasets#string-time-units)Det är nästan identiskt med förJava/Joda tidsformat specifikation, men är något mer förlåtande.

Det skulle vara trevligt om EML-kontrollen krävde strikt anslutning tillJava/Joda/ERDDAPtidsenhetsspecifikation och verifierade datumtidsvärdena i datatabellen kan jämföras korrekt med det angivna formatet.
    
### Datum men ingen tidszon{#datetime-but-no-time-zone} 
GenerateDatasets Xml letar efter en kolumn med datum Tid och en specificerad tidszon (antingenZuluFrån tidsenheter som slutar i "Z" eller en kolumnnamn eller attributdefinition som innehåller "gmt" eller "utc", eller lokal: från "lokal" i kolumnnamn eller attributdefinition) . Också acceptabelt är en fil med en datumkolumn men ingen tidskolumn. Också acceptabel är en fil utan datum eller tidsinformation.

GenerateDatasets Xml behandlar alla "lokala" tider som från den tidszon som du kan ange för en viss sats av filer, t.ex. för SBC LTER, använd US/Pacific. Informationen är ibland i kommentarerna, men inte i ett formulär som är lätt för ett datorprogram att räkna ut.

Filer som inte uppfyller dessa kriterier avvisas med meddelandet "Inget bra datum (Tid) VARIABLE”. Vanliga problem är:

* Det finns en kolumn med datum och en kolumn med tider, men inte datum Tidskolumn.
* Det finns tidsenheter, men tidszonen är inte specificerad.

Andra kommentarer:
Om det finns ett bra datum + tid med tidszon kolumn, kommer den kolumnen att namnges."time"in iERDDAP.ERDDAP™kräver att tidskolumndata är begripliga/konvertiblaZulu/UTC / GMT tidszon datumTimes.\\[Min tro är: att använda lokala tider och olika datum/tidsformat (2-siffriga år&#33; mm/dd/yy vs dd/mm/yy vs...) i datafiler tvingar slutanvändaren att göra komplicerade konverteringar tillZulutid för att jämföra data från en datamängd med data från en annan. SåERDDAP™standardiserar alla tidsdata: för strängtider,ERDDAP™Använder alltid ISO 8601:2004 (E E E E) standardformat, till exempel 1985-01-02T00:00:00Z. För numeriska tider,ERDDAP™Använd alltid"seconds since 1970-01-01T00:00:00Z".ERDDAP™Använder alltidZulu  (UTC, GMT) tidszon för att ta bort svårigheterna med att arbeta med olika tidszoner och standardtid mot dagsljussparande tid. Så GenerateDatasets Xml söker en EML dataTable-kolumn med datum + tidZulu. Detta är svårt eftersom EML inte använder ett formellt ordförråd/system (som liknar[Java/Joda tidsformat](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) för att ange data Time format:
Om det finns en kol med numeriska tidsvärden (t.ex.,Matlabgånger) ochZuluTidszon (eller bara datum, utan tid kolumner) Den används som"time".
Om det finns en kol med datum och tidsdata, med hjälp avZulutidszon, den används som"time"och alla andra datum eller tidskolumner tas bort.
Anna om en kol med bara datuminformation hittas, används den som"time"Variabel (utan tidszon) .
Om det finns en datakolumn och en tidskolumn och inget kombinerat datum Tidskolumn, datamängden är REJECTED - men datamängden kan göras användbar genom att lägga till ett kombinerat datum Tidskolumn (helst,ZuluTidszon) till datafilen och lägga till dess beskrivning i EML-filen.
Exempel från SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)DataTable #2.

Det skulle vara trevligt om EML/LTER krävde inkludering av en kolumn medZulu  (UTC, GMT) tidszon i alla relevanta källdatafiler. Nästa bästa är att lägga till ett system till EML för att ange etttime\\_zoneattribut med standardnamn (från[TZ kolumn](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Saknarmissing\\_value {#missing-missing_value} 
Vissa kolumner använder enmissing\\_valuemen inte lista det i EML metadata, t.ex. nederbörd \\_mm i knb-lter-sbc.5011 använder -999. Om inget saknat värde anges i EML söker GenerateDatasetsXml automatiskt efter gemensamma saknade värden (t.ex. 99, -99, 999, -999, 9999, -9999, etc.) och skapar denna metadata. Men andra saknademissing\\_valueär inte fångade.

Det skulle vara trevligt om EML-kontrollen letade efter saknadmissing\\_values.
    
### Små problem{#small-problems} 
Det finns många små problem (stavning, punktering) som förmodligen bara kommer att hittas av en människa som inspekterar varje datamängd.

Det skulle vara trevligt om EML-kontrollen letade efter stavning och grammatiska fel. Detta är ett svårt problem eftersom ord i vetenskapen ofta flaggas av stavningskontroller. Mänsklig redigering behövs förmodligen.
    
### Invalid Unicode karaktärer{#invalid-unicode-characters} 
Några av EML-innehållet innehåller ogiltiga Unicode-tecken. Dessa är förmodligen tecken från Windows-karset som felaktigt kopierades och klistrade in i UTF-8 EML-filerna. GenerateDatasets Xml saniterar dessa tecken till t.ex.\\[#128\\]Så de är lätta att söka efter iERDDAP™ datasets.xmlfil.

Det skulle vara trevligt om EML checker kontrolleras för detta. Det är lätt att hitta och lätt att fixa.
    
### Olika kolumn enheter] (#differentColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Vissa EML dataTables definierar kolumner som är oförenliga med kolumnerna i datafilen, särskilt eftersom de har olika enheter. GenerateDatasets Xml flaggar dessa. Det är upp till operatören att avgöra om skillnaderna är okej eller inte. Dessa visas i felfilen som "SKIPPED" dataTables. EXAMPLE i SBC LTER-felfil:
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
Det skulle vara trevligt om EML-kontrollen kontrollerade att enheterna matchar. Tyvärr är detta förmodligen omöjligt att fånga och sedan omöjligt att lösa utan att kontakta dataset-skaparen, eftersom källfilen inte innehåller enheter. Avvikelsen för exemplet ovan var endast märkbar eftersom enheterna inkluderades i källkolumnnamnet och EML-kolumnnamnet. Hur många andra dataTables har detta problem men är odetekterbara?
    
### Olika versioner av EML{#different-versions-of-eml} 
GenerateDatasets Xml är utformad för att arbeta med EML 2.1.1. Andra versioner av EML kommer att fungera i den mån de matchar 2.1.1 eller att GenerateDatasetsXml har särskild kod för att hantera den. Detta är ett sällsynt problem. När det inträffar är lösningen att konvertera dina filer till EML 2.1.1 eller skicka EML-filen tillerd.data at noaa.govJag kan göra ändringar i GenerateDatasets Xml hanterar skillnaderna.

Bob lade till stöd för EML-filer till GenerateDatasets Xml 2016 med hoppet om att det skulle bli lite upptag i EML-samhället. Från och med 2020 har det inte hänt. Bob är glad att lägga till stöd för nyare versioner av EML, men bara om de nya funktionerna faktiskt kommer att användas. Vänligen emailerd.data at noaa.govOm du vill ha stöd för nyare versioner av EML och faktiskt använder den här funktionen.
    
### Problem Parsing the Data File{#trouble-parsing-the-data-file} 
Sällan kan en datatabell avvisas med felet "oväntat antal objekt på rad # 120 (observerad = 52, förväntad = 50) " Ett felmeddelande som detta innebär att en rad i datafilen hade ett annat antal värden än de andra raderna. Det kan vara ett problem iERDDAP™  (t.ex. inte parsing filen korrekt) eller i filen. Exempel från SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTabell #3, se datafile=LTER\\_monthly\\_bottledata\\_registered\\_stations\\_20140429.txt
