---
sidebar_position: 3
---
# Arbeta meddatasets.xmlFil

\\[Denna webbsida kommer endast att vara av intresse förERDDAP™administratörer.\\]

När du har följtERDDAP™ [installationsanvisningar](/docs/server-admin/deploy-install)Du måste redigeradatasets.xmlfil i *Tomcat* /innehåll/erddap/ för att beskriva de datamängder som dinaERDDAP™installationen kommer att fungera.

Du kan se ett exempel[datasets.xmlpå GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).

- - - - -

## [Introduktion](#introduction) {#introduction} 

### Vissa församlingar krävs{#some-assembly-required} 
Ställa in en dataset iERDDAP™är inte bara en fråga om att peka på datasetets katalog eller URL. Du måste skriva en bit av XML fördatasets.xmlsom beskriver dataset.

* För ruttna datamängder, för att göra datamängden överensstämma medERDDAP"S datastruktur för ruttna data, du måste identifiera en delmängd av datamängdens variabler som delar samma dimensioner. ([Varför?](#why-just-two-basic-data-structures) [Hur?](#dimensions)) 
* Datasetets aktuella metadata importeras automatiskt. Men om du vill ändra metadata eller lägga till andra metadata måste du ange den idatasets.xml. ochERDDAP™behöver andra metadata, inklusive[globala attribut](#global-attributes)  (såsominfoUrlinstitution,sourceUrlSammanfattning och titel) och[Variabla attribut](#variable-addattributes)  (såsomlong\\_nameoch enheter) . Precis som metadata som för närvarande finns i datamängden lägger till beskrivande information till datamängden lägger metadata som begärs avERDDAP™lägger till beskrivande information till datasetet. Den extra metadata är ett bra komplement till din dataset och hjälper tillERDDAP™Gör ett bättre jobb med att presentera dina data för användare som inte är bekanta med det.
*   ERDDAP™behöver du göra speciella saker med[longitud, latitud, höjd (eller djup) och tidsvariabler](#destinationname).

Om du köper in dessa idéer och spenderar ansträngningen att skapa XML för attdatasets.xmlDu får alla fördelarna medERDDAP™inklusive:

* Full textsökning för dataset
* Sök efter datamängder efter kategori
* Data Access Forms ( *datasetID* .html) så att du kan begära en delmängd av data i många olika filformat
* Formulär för att begära grafer och kartor ( *datasetID* .graph) 
* Web Map Service (WMS) för gridded datasets
*   RESTfultillgång till dina data

Göradatasets.xmlansträngning för de första datamängderna, men **Det blir lättare** . Efter den första datamängden kan du ofta återanvända mycket av ditt arbete för nästa datamängd. Som tur är,ERDDAP™Kommer med två[Verktyg](#tools)för att hjälpa dig att skapa XML för varje dataset idatasets.xml.
Om du fastnar, se vår[sektion om att få ytterligare stöd](/docs/intro#support).

### Dataleverantör Formulär{#data-provider-form} 
När en dataleverantör kommer till dig hoppas du lägga till lite data till dinERDDAPDet kan vara svårt och tidskrävande att samla alla metadata (Information om dataset) behövs för att lägga till dataset iERDDAP. Många datakällor (till exempel .csv-filer, Excel-filer, databaser) har inga interna metadata, såERDDAP™har ett dataleverantörsformulär som samlar metadata från dataleverantören och ger dataleverantören någon annan vägledning, inklusive omfattande vägledning för[Data i databaser](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). Den inlämnade informationen omvandlas tilldatasets.xmlformat och sedan skickas tillERDDAP™Administratör (Du du) och skriftlig (Appenderad) att *bigParentDirectory* /logs/dataProviderForm.log . Således formuläret halvautomatiserar processen att få en dataset in iERDDAPMen denERDDAP™Administratören måste fortfarande slutföradatasets.xmlchunk och hantera att få datafilen (s) från leverantören eller anslutning till databasen.

Inlämnandet av faktiska datafiler från externa källor är en stor säkerhetsrisk, såERDDAP™inte hantera det. Du måste räkna ut en lösning som fungerar för dig och dataleverantören, till exempel e-post (för små filer) Dra från molnet (Till exempel DropBox eller Google Drive) En sftp-webbplats (med lösenord) eller sneaker Net (en USB-tumdrift eller extern hårddisk) . Du bör förmodligen bara acceptera filer från personer du vet. Du måste skanna filerna för virus och vidta andra säkerhetsåtgärder.

Det finns inte en länk iERDDAP™till Data Provider Form (till exempel påERDDAP™Hemsidan) . Istället, när någon säger att de vill ha sina data som serveras av dinERDDAPDu kan skicka ett e-postmeddelande som säger något som:
Ja, vi kan få dina data inERDDAP. För att komma igång, vänligen fyll i formuläret på https://*yourUrl*/erddap/dataProviderForm.html   (ellerhttp://omhttps://är inte aktiverat) .
När du är klar kontaktar jag dig för att räkna ut de sista detaljerna.
Om du bara vill titta på formuläret (utan att fylla ut det) Du kan se formuläret påERD"SERDDAPFrån:[Introduktion](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html),[Del 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html),[Del 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html),[Del 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html)och[Del 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). Dessa länkar påERD ERDDAP™Skicka information till mig, inte du, så skicka inte information med dem om du inte vill lägga till data tillERD ERDDAP.

Om du vill ta bort dataleverantörsformuläret från dinERDDAP™, put
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
i din setup.xml-fil.

impulsen för detta varNOAA2014[Offentlig tillgång till forskningsresultat (Parr) Direktiv](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf)som kräver att alltNOAAmiljödata som finansieras genom skattebetalarnas dollar görs tillgängliga via en datatjänst (Inte bara filer) inom 12 månader efter skapelsen. Så det finns ökat intresse för att användaERDDAP™göra datamängder tillgängliga via en tjänst ASAP. Vi behövde ett effektivare sätt att hantera ett stort antal dataleverantörer.

Feedback/förslag? Detta formulär är nytt, så vänligen e-posterd dot data at noaa dot govom du har någon feedback eller förslag för att förbättra detta.

### Verktyg{#tools} 
ERDDAP™kommer med två kommandoradsprogram som är verktyg för att hjälpa dig att skapa XML för varje datamängd som du vill ha dinERDDAP™att tjäna. När du har ställt uppERDDAP™och springa den (minst en gång) Du kan hitta och använda dessa program i *Tomcat* /webapps/erddap/WEB-INF-katalogen. Det finns Linux/Unix Shell scripts (med förlängningen .sh) och Windows scripts (med förlängningen .bat) för varje program.\\[På Linux, kör dessa verktyg som samma användare (Tomcat?) Det kommer att driva Tomcat.\\]När du kör varje program kommer det att ställa dig frågor. För varje fråga, skriv ett svar, tryck sedan på Enter. Eller tryck på ^ C för att avsluta ett program när som helst.

#### Program kommer inte att springa?{#program-wont-run} 

* Om du får ett okänt program (eller liknande) felmeddelande, problemet är förmodligen att operativsystemet inte kunde hittaJava. Du måste räkna ut varJavaär på din dator, sedan redigera java referens i .bat eller .sh filen som du försöker använda.
* Om du får en burkfil som inte hittats eller klassen inte hittade felmeddelande, dåJavaKunde inte hitta en av de klasser som anges i .bat eller .sh-filen du försöker använda. Lösningen är att räkna ut var den .jar-filen är och redigera java-referensen till den i .bat eller .sh-filen.
* Om du använder en version avJavaDet är för gammalt för ett program, programmet kommer inte att köras och du kommer att se ett felmeddelande som
Undantag i tråd "huvud" java.lang.UnsupportedClassVersionError:
     *någon/klass/namn* Unsupported major.minor version *SomeNumber*   
Lösningen är att uppdatera till den senaste versionen avJavaoch se till att .sh eller .bat-filen för programmet använder den.

#### Verktygen skriver ut olika diagnostiska meddelanden:{#the-tools-print-various-diagnostic-messages} 

* Ordet "ERROR" används när något gick så fel att förfarandet inte slutfördes. Även om det är irriterande att få ett fel, tvingar felet dig att hantera problemet.
* Ordet "VARNING" används när något gick fel, men förfarandet kunde slutföras. Dessa är ganska sällsynta.
* Allt annat är bara ett informativt meddelande. Du kan lägga till \\-verbose till[GenerateDatasetsXml](#generatedatasetsxml)eller[DasDds](#dasdds)kommandorad för att få ytterligare informativa meddelanden, som ibland hjälper till att lösa problem.

De två verktygen är en stor hjälp, men du måste fortfarande läsa alla dessa instruktioner på denna sida noggrant och fatta viktiga beslut själv.

### GenerateDatasetsXml{#generatedatasetsxml} 
*    **GenerateDatasetsXml** är ett kommandoradsprogram som kan generera ett grovt utkast till dataset XML för nästan alla typer av dataset.
    
Vi rekommenderar starkt att du använder GenerateDatasets Xml istället för att skapa bitar avdatasets.xmlFör hand för att:
    
    * GenerateDatasets Xml fungerar på några sekunder. Att göra detta för hand är minst en timmes arbete, även när du vet vad du gör.
    * GenerateDatasets Xml gör ett bättre jobb. Att göra detta för hand kräver omfattande kunskap om hurERDDAP™fungerar. Det är osannolikt att du kommer att göra ett bättre jobb för hand. (Bob Simons använder alltid GenerateDatasets Xml för första utkastet, och han skrevERDDAP.) 
    * GenerateDatasets Xml genererar alltid en giltig bit avdatasets.xml. Alla bitar avdatasets.xmlatt du skriver kommer förmodligen att ha minst några fel som förhindrarERDDAP™från att ladda dataset. Det tar ofta människor timmar att diagnostisera dessa problem. Slösa inte din tid. Låt Generate Dataset Xml gör det hårda arbetet. Då kan du förfina .xml för hand om du vill.
    
När du använder GenerateDatasets Xml-program:
    
    * På Windows, första gången du kör GenerateDatasetsXml, måste du redigera GenerateDatasetsXml.bat-filen med en textredigerare för att ändra vägen till java. exe fil så att Windows kan hittaJava.
    * GenerateDatasets Xml frågar dig först att ange EDDType (Erd Dap Dataset Typ) av dataset. Se[Lista över datasettyper](#list-of-types-datasets)  (i detta dokument) för att räkna ut vilken typ som är lämplig för datamängden du arbetar med. Förutom de vanliga EDDTypes finns det också några[Special/Pseudo Dataset Typer](#specialpseudo-dataset-types)  (t.ex. en som kryper en THREDDS-katalog för att generera en bit avdatasets.xmlför var och en av datamängderna i katalogen) .
    * GenerateDatasets Xml ställer dig sedan en rad frågor som är specifika för EDDType. Frågorna samlar in den information som behövs förERDDAP™för att komma åt datasetets källa. För att förstå vadERDDAP™begär, se dokumentationen för EDDType som du angav genom att klicka på samma datasettyp i[Lista över datasettyper](#list-of-types-datasets).
        
Om du behöver ange en sträng med speciella tecken (t.ex. whitespace-karaktärer i början eller slutet, icke-ASCII-karaktärer) Gå in i en[JSON-stil sträng](https://www.json.org/json-en.html)  (med speciella karaktärer som rymts med tecken) . Till exempel, för att ange bara en flikkaraktär, ange "\t" (med de omgivande dubbla citat, som berättarERDDAP™Detta är en JSON-stil sträng.
        
    * Ofta kommer ett av dina svar inte vara vad GenerateDatasetsXml behöver. Du kan sedan försöka igen, med reviderade svar på frågorna, tills GenerateDatasets Xml kan framgångsrikt hitta och förstå källdata.
    * Om du svarar på frågorna korrekt (eller tillräckligt korrekt) GenerateDatasets Xml kommer att ansluta till datasetets källa och samla grundläggande information (Till exempel variabla namn och metadata) .
För datamängder som är från lokalaNetCDF .ncoch relaterade filer, GenerateDatasets Xml kommer ofta att skriva ut filens ncdump-liknande struktur efter att den först läser filen. Detta kan ge dig information för att svara på frågorna bättre på en efterföljande slinga genom GenerateDatasetsXml.
    * GenerateDatasets Xml kommer sedan att generera ett grovt utkast av dataset XML för det datasetet.
    * Diagnostisk information och det grova utkastet till dataset XML kommer att skrivas till *bigParentDirectory* /logs/GenerateDatasetsXml.log.
    * Det grova utkastet till dataset XML kommer att skrivas till *bigParentDirectory* /logs/GenerateDatasetsXml.out.
#### "0 filer" Felmeddelande{#0-files-error-message} 
Om du kör GenerateDatasets Xml eller[DasDds](#dasdds)eller om du försöker ladda enEDDGridFrån...Files or EDDTableFrom... Filer dataset iERDDAP™, och du får ett "0 filer" felmeddelande som indikerar attERDDAP™Hittade 0 matchande filer i katalogen (När du tror att det finns matchande filer i den katalogen) Från:
* Kontrollera att du har angett hela katalogens namn. Och om du angav provfilnamnet, se till att du angav filens fullständiga namn, inklusive hela katalogen namn.
* Kontrollera att filerna verkligen finns i den katalogen.
* Kontrollera stavningen av katalogen namn.
* Kolla filenNameRegex. Det är verkligen lätt att göra misstag med regex. För teständamål, prova regex . * som ska matcha alla filnamn. (Se detta[regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)och[Regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
* Kontrollera att användaren som kör programmet (t.ex. användar=tomcat (??) För Tomcat/ERDDAP) har "läst" tillstånd för dessa filer.
* I vissa operativsystem (Till exempel SELinux) Och beroende på systeminställningar måste användaren som körde programmet ha "läs" tillstånd för hela katalogkedjan som leder till katalogen som har filerna.


* Om du har problem som du inte kan lösa,[begäran om support](/docs/intro#support)med så mycket information som möjligt. På samma sätt, om det verkar som om lämplig EDDType för en viss datamängd inte fungerar med den datamängden, eller om det inte finns någon lämplig EDDType, vänligen lämna in en[Fråga om GitHub](https://github.com/ERDDAP/erddap/issues)med detaljerna (och en provfil om det är relevant) .
         
#### Du måste redigera utgången från GenerateDatasets Xml för att göra det bättre.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* Disklaimer:
CHUNK OFdatasets.xmlMADE BE GenerateDatasets Xml är inte perfekt. Du måste läsa och EDIT XML BEFORE ANVÄNDNING I en PUBLICERDDAP. GenerateDatasets Xml RELIES ON A LOT OF RULES-OF-THUMB WHICH AREN'T ALWAYS CORRECT. Du är rädd för att söka efter kärnan i XML DU TILL DU TILL DU TILL DIG TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TILL DU TIGÅ TILL DU TIGÅ TIGA TIGÅ TIGÅ TIGA TIGT TIGÅ TIGA TIGÅ TILL DU TIGT TIGT TIGÅ TILL DU TIGÅ TIGÅ TIGÅ TIGÅ TILL DU TIGÅ TIGA TILL DU TIGT TIGA TIGT TILL DU TIGÅ TILLERDDAP"Sdatasets.xmlFile.
    
     (Rolig fakta: Jag skriker inte. Av historiska juridiska skäl måste friskrivningar skrivas i alla mössor.) 
    
Utgången av GenerateDatasetsXml är ett grovt utkast.
Du kommer nästan alltid att behöva redigera den.
Vi har gjort och fortsätter att göra en stor insats för att göra produktionen så färdig att gå som möjligt, men det finns gränser. Ofta behövs information helt enkelt inte tillgänglig från källmetadata.
    
Ett grundläggande problem är att vi frågar ett datorprogram (GenerateDatasetsXml) För att göra en uppgift där du, om du gav samma uppgift till 100 personer, skulle få 100 olika resultat. Det finns inget ”rätt” svar. Självklart kommer programmet närmast att läsa Bobs sinne. (Inte din) Men även så är det inte ett all-understanding AI-program, bara ett gäng heuristik kullerade ihop för att göra en AI-liknande uppgift. (Den dagen av ett all-understanding AI-program kan komma, men det har inte ännu. Om / när det gör det, kan vi människor ha större problem. Var försiktig med vad du önskar.) 
    
* För informationsändamål visar utgången den globala källanFördelar och variabel källaFördelar som kommentarer.ERDDAP™kombinerar sourceAttributes ochaddAttributes  (som har företräde) att göra den kombinerade Innehåll som visas för användaren. (Och andra attribut läggs automatiskt till longitud, latitud, höjd, djup och tidsvariabler närERDDAP™faktiskt gör dataset) .
     
* Om du inte gillar en källaAttribute, överskriv det genom att lägga till en addAttribute med samma namn men ett annat värde (eller inget värde, om du vill ta bort det) .
     
* AllaaddAttributesär datorgenererade förslag. Redigera dem&#33; Om du inte gillar en addAttribute, ändra den.
     
* Om du vill lägga till andraaddAttributesLägg till dem.
     
* Om du vill ändra endestinationNameÄndra det. Men ändra intesourceNames.
     
* Du kan ändra ordningen pådataVariableeller ta bort någon av dem.


    * Du kan sedan använda[DasDds](#dasdds)  (Se nedan) för att upprepade gånger testa XML för den datamängden för att säkerställa att den resulterande datamängden visas som du vill att den skaERDDAP.
    * Känn dig fri att göra små förändringar idatasets.xmlbit som genererades, till exempel, ger en bättreinfoUrlSammanfattning, eller titel.
#### DoNotAddStandardNames{#donotaddstandardnames} 
Om du inkluderar \\-doNotAddStandardNames som en kommandoradsparameter när du kör generera Dataset Xml, generera Dataset Xml kommer inte att lägga tillstandard\\_nametilladdAttributesför andra variabler än variabler som heter latitud, longitud, höjd, djup eller tid (som har uppenbartstandard\\_names) . Detta kan vara användbart om du använder utgången från att generera Dataset Xml direkt iERDDAP™utan att redigera utgången, för att generera Dataset Xml gissar oftastandard\\_names felaktigt. (Observera att vi alltid rekommenderar att du redigerar utgången innan du använder den iERDDAP.) Använda denna parameter kommer att ha andra mindre relaterade effekter eftersom den gissadestandard\\_nameanvänds ofta för andra ändamål, t.ex. för att skapa en nylong\\_nameoch skapa färgBar inställningar.
#### Skriften{#scripting} 
Som ett alternativ till att svara på frågorna interaktivt på tangentbordet och looping för att generera ytterligare datamängder kan du ge kommandoradens argument för att svara på alla frågor för att generera en datamängd. GenerateDatasets Xml kommer att behandla dessa parametrar, skriva utgången till utdatafilen och avsluta programmet.
        
För att ställa in detta använder du först programmet i interaktivt läge och skriver ner dina svar. Här är ett partiellt exempel:
Låt oss säga att du kör skriptet: ./GenerateDatasetsXml.sh
Ange sedan: EDDTableFromAsciiFiles
Ange sedan: /u00/data/
Ange sedan: .\\*\\.asc
Ange sedan: /u00/data/sampleFile.asc
Ange sedan: ISO-8859-1
        
För att köra detta på ett icke-interaktivt sätt, använd denna kommandorad:
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles/u00/data/.\\*\\*.asc/u00/data/sampleFile.asc ISO-8859-1
Så i princip listar du bara alla svar på kommandoraden.
Detta bör vara användbart för datamängder som förändras ofta på ett sätt som kräver re-running GenerateDatasets Xml (i synnerhetEDDGridFrånThreddsCatalog) .
        
Detaljer:

* Om en parameter innehåller ett utrymme eller någon speciell karaktär, koda sedan parametern som en[JSON-stil sträng](https://www.json.org/json-en.html)"Min parameter med utrymmen och två\\nlinjer”.
* Om du vill ange en tom sträng som parameter, använd: ingenting
* Om du vill ange standardvärdet på en parameter, använd: standard
             
* GenerateDatasets Xml stöder en -i *Dataset XmlName* # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # *tagName* kommandoradsparameter som infogar utgången i den angivnadatasets.xmlfil (Standarden är *Tomcat* /innehåll/erddap/datasets.xml) . GenerateDatasets Xml letar efter två rader i dataset XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
och
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
och ersätter allt mellan dessa rader med det nya innehållet, och ändrar ibland.
* -i switch är bara bearbetad (och förändringar idatasets.xmlgörs endast) Om du kör GenerateDatasets Xml med kommandoradsargument som anger alla svar på alla frågor för en slinga av programmet. (Se "Scripting" ovan.)   (Tanken är: Denna parameter är för användning med skript. Om du använder programmet i interaktivt läge (Skriva info på tangentbordet) Du kommer sannolikt att generera några felaktiga bitar av XML innan du genererar den du vill ha.) 
* Om Begin and End-linjerna inte hittas, infogas dessa rader och det nya innehållet innan.&lt;/erddapDatasets&gt;.
* Det finns också en -I (kapital i) växla för teständamål som fungerar på samma sätt som -i, men skapar en fil som kallasdatasets.xml *Datumtid* och gör inte ändringardatasets.xml.
* Kör inte GenerateDatasets Xml med -i i två processer samtidigt. Det finns en chans att bara en uppsättning förändringar kommer att hållas. Det kan finnas allvarliga problem (Till exempel korrupta filer) .
    
Om du använder "GenerateDatasetsXml -verbose", kommer det att skriva ut mer diagnostiska meddelanden än vanligt.
    
#### Special/Pseudo Dataset Typer{#specialpseudo-dataset-types} 
I allmänhet EDDType alternativ i GenerateDatasets Xml-match av de EDD-typer som beskrivs i detta dokument (se[Lista över datasettyper](#list-of-types-datasets)) och generera endatasets.xmlchunk att skapa en dataset från en specifik datakälla. Det finns några undantag och särskilda fall:
    
##### EDDGridFrånErddap{#eddgridfromerddap} 
Denna EDDType genererar alladatasets.xmlbitar som behövs för att göra[EDDGridFrånErddap](#eddfromerddap)datamängder från allaEDDGridDataset i en fjärrERDDAP. Du har möjlighet att behålla originaletdatasetIDs (som kan duplicera vissadatasetIDs redan i dinERDDAP) eller skapa nya namn som kommer att vara unika (Men vanligtvis är inte så mänskligt läsbara) .
     
##### EDDTableFromErddap{#eddtablefromerddap} 
Denna EDDType genererar alladatasets.xmlbitar som behövs för att göra[EDDTableFromErddap](#eddfromerddap)datamängder från alla EDDTable datamängder i en fjärrkontrollERDDAP. Du har möjlighet att behålla originaletdatasetIDs (som kan duplicera vissadatasetIDs redan i dinERDDAP) eller skapa nya namn som kommer att vara unika (Men vanligtvis är inte så mänskligt läsbara) .
     
##### EDDGridFrånThreddsCatalog{#eddgridfromthreddscatalog} 
Denna EDDType genererar alladatasets.xmlbitar behövs för alla[EDDGridFrånDap](#eddgridfromdap)datamängder som den kan hitta genom att krypa upprepande genom en TREDD (sub) Katalog. Det finns många former av THREDDS katalog URLs. Det här alternativet REQUIRES a THREDDS .xml URL with /catalog/ in it, till exempel,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml eller
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(en relaterad .html katalog är på
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html som inte är acceptabelt förEDDGridFrånThreddsCatalog).
Om du har problem medEDDGridFrånThredds Katalog:
* Se till att webbadressen du använder är giltig, inkluderar /catalog / och slutar med /catalog.xml.
* Om möjligt, använd en offentlig IP-adress (till exempel, https://oceanwatch.pfeg.noaa.gov ) i webbadressen, inte en lokal numerisk IP-adress (till exempel, https://12.34.56.78 ) . Om TREDDDS endast är tillgänglig via den lokala numeriska IP-adressen kan du använda [&lt;konverteraToPublicSourceUrl&gt; (#converttopublicsourceurl) SåERDDAP™användare ser den offentliga adressen, även omERDDAP™får data från den lokala numeriska adressen.
* Om du har problem som du inte kan lösa,[Kontrollera felsökning tips](#troubleshooting-tips).
* Den låga nivåkoden för detta använder nuUnidatanetcdf-java katalog crawler kod (Tredds. katalog klasser) så att den kan hantera alla THREDDS-kataloger (som kan vara överraskande komplexa) Tack vareUnidataför den koden.
         
##### EDDGridLonPM180FromErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Denna EDDType genererardatasets.xmlatt göra[EDDGridLonPM180](#eddgridlonpm180)datamängder från allaEDDGridDataset i enERDDAPsom har någon longitud värden större än 180.
* Om möjligt, använd en offentlig IP-adress (till exempel, https://oceanwatch.pfeg.noaa.gov ) i webbadressen, inte en lokal numerisk IP-adress (till exempel, https://12.34.56.78 ) . OmERDDAP™är endast tillgänglig via den lokala numeriska IP-adressen, du kan använda [&lt;konverteraToPublicSourceUrl&gt; (#converttopublicsourceurl) SåERDDAP™användare ser den offentliga adressen, även omERDDAP™får data från den lokala numeriska adressen.
         
##### EDDGridLon0360 frånErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Denna EDDType genererardatasets.xmlatt göra[EDDGridLon0360](#eddgridlon0360)datamängder från allaEDDGridDataset i enERDDAPsom har någon longitud värden mindre än 0.
* Om möjligt, använd en offentlig IP-adress (till exempel, https://oceanwatch.pfeg.noaa.gov ) i webbadressen, inte en lokal numerisk IP-adress (till exempel, https://12.34.56.78 ) . OmERDDAP™är endast tillgänglig via den lokala numeriska IP-adressen, du kan använda [&lt;konverteraToPublicSourceUrl&gt; (#converttopublicsourceurl) SåERDDAP™användare ser den offentliga adressen, även omERDDAP™får data från den lokala numeriska adressen.
         
##### EDDsFromFiles{#eddsfromfiles} 
Med tanke på en startkatalog korsar detta katalogen och alla underkataloger och försöker skapa en dataset för varje grupp av datafiler som den hittar.
* Detta förutsätter att när en dataset hittas innehåller datasetet alla underkataloger.
* Om en dataset hittas kommer liknande syskonkataloger att behandlas som separata dataset (kataloger för 1990-talet, 2000-talet, 2010-talet, kommer att generera separata datamängder.) . De bör vara lätta att kombinera för hand - bara ändra den första datamängden&lt;fileDir&gt; till moderkatalogen och radera alla efterföljande syskondataset.
* Detta kommer bara att försöka generera en bit avdatasets.xmlför den vanligaste typen av filändelse i en katalog (inte räkna .md5, som ignoreras) . Så, med en katalog med 10.ncfiler och 5 .txt filer, en dataset kommer att genereras för.ncfiler endast.
* Detta förutsätter att alla filer i en katalog med samma tillägg hör hemma i samma dataset. Om en katalog har några.ncfiler med SST-data och vissa.ncfiler med klorofylldata, bara ett prov.ncFilen kommer att läsas (SST? Klorofyll?) och bara en dataset kommer att skapas för den typen av fil. Den datamängden kommer sannolikt att misslyckas med att ladda på grund av komplikationer från att försöka ladda två typer av filer i samma datamängd.
* Om det finns färre än 4 filer med den vanligaste förlängningen i en katalog, förutsätter detta att de inte är datafiler och bara hoppar över katalogen.
* Om det finns 4 eller fler filer i en katalog, men detta kan inte framgångsrikt generera en bit avdatasets.xmlför filerna (Till exempel en ostödd filtyp) Detta kommer att generera en[EDDTableFromFileNames](#eddtablefromfilenames)dataset för filerna.
* I slutet av diagnostiken som detta skriver till loggfilen, strax föredatasets.xmlbitar, detta kommer att skriva ut en tabell med en sammanfattning av information som samlas in genom att korsa alla underkataloger. Tabellen listar varje underkatalog och anger den vanligaste typen av filändelse, det totala antalet filer, och vilken typ av dataset skapades för dessa filer. (Om någon) . Om du står inför en komplex, djupt kapslad filstruktur, överväga att köra GenerateDatasets Xml med EDDType=EDDsFromFiles bara för att generera denna information,
* Det här alternativet kanske inte gör ett bra jobb med att gissa den bästa EDDType för en viss grupp datafiler, men det är snabbt, enkelt och värt ett försök. Om källfilerna är lämpliga fungerar det bra och är ett bra första steg i att generera källfilerna.datasets.xmlför ett filsystem med massor av underkataloger, var och en med datafiler från olika datamängder.
         
##### EDDTableFromEML och EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Dessa speciella EDDType genererardatasets.xmlatt göra en[EDDTableFromAsciiFiles](#eddtablefromasciifiles)datamängd från var och en av tabellerna som beskrivs i en[Ekologisk metadataspråk](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML fil. "Batch"-varianten fungerar på alla EML-filer i en lokal eller fjärrkatalog. Se separat[dokumentation för EDDTableFromEML](/docs/server-admin/EDDTableFromEML).
     
##### EDDTableFromInPort{#eddtablefrominport} 
Denna speciella EDDType genererardatasets.xmlatt göra en[EDDTableFromAsciiFiles](#eddtablefromasciifiles)Dataset från informationen i en[Inport-xml](https://inport.nmfs.noaa.gov/inport)fil. Om du kan få tillgång till källdatafilen (Inport-xml-filen ska ha ledtrådar för var den ska hitta den) Du kan göra en fungerande dataset iERDDAP.

Följande steg beskriver hur man använder GenerateDatasets Xml med en inport-xml-fil för att få en fungerande dataset iERDDAP.

1. När du har tillgång till inport-xml-filen (antingen som en URL eller en lokal fil) Kör GenerateDatasets Xml, ange EDDType=EDDTableFromInPort, ange inport-xml URL eller fullständig filnamn, ange vilkenChild=0 och ange den andra begärda informationen (om det är känt) . (Vid denna tidpunkt behöver du inte ha källdatafilen eller ange dess namn.) WhatChild=0 inställningen berättar GenerateDatasets Xml skriver ut informationen för **Alla alla** för&lt;Entity-attribute-information&gt;&lt;Entity&gt;'s in the inport-xml file (om det finns någon) . Det skriver också ut en bakgrundsinformationssammanfattning, inklusive alla nedladdnings-urls listade i inport-xml-filen.
2. Titta igenom all denna information (Bakgrundsinformation som GenerateDatasets Xml prints) och besök Download-url (s) För att försöka hitta källdatafilen (s) . Om du hittar den (dem,) ladda ner den (dem,) till en katalog som är tillgänglig förERDDAP. (Om du inte kan hitta några källdatafiler finns det ingen mening i förfarandet.) 
3. Kör Generate Dataset Xml igen.
Om källdatafilen motsvarar en av inport-xml-filens&lt;Entity-attribute-information&gt;&lt;Entity&gt;'s, specificera vilkenChild= *ThatEntity'sNumber*   (t.ex. 1, 2, 3, ...) .ERDDAP™kommer att försöka matcha kolumnnamnen i källdatafilen till namn i företagets information, och uppmana att acceptera/avvisa/fixa eventuella avvikelser.
Eller om inport-xml-filen inte har några&lt;Entity-attribute-information&gt;&lt;Entity&gt;'s, specificera vilkenChild=0.
4. I biten avdatasets.xmlDetta gjordes av GenerateDatasets Xml, revidera [global]&lt;addAttributes&gt;] (#global-attributes) efter behov/önskvärd.
5. I biten avdatasets.xmlDetta gjordes av GenerateDatasetsXml, lägg till/revidera&lt;dataVariable&gt;] (#datavariable) information som behövs/önskas för att beskriva var och en av variablerna. Se till att du korrekt identifierar varje variabels
[Och [Gud]&lt;sourceName&gt;] (#Sourname)   (som visas i källan) ,
[Och [Gud]&lt;destinationName&gt;] (#destinationnamn)   (som har fler begränsningar på tillåtna tecken änsourceName) ,
[Och [Gud]&lt;Enheter&gt;] (#units)   (Speciellt om det är en[tid eller timestamp variabel](#timestamp-variables)där enheterna behöver ange formatet) och
[Och [Gud]&lt;missing\\_value&gt;] (#missing_värde) ,
6. När du är nära att avsluta, upprepade gånger använda[DasDds](#dasdds)verktyg för att snabbt se om datasetbeskrivningen är giltig och om datasetet visas iERDDAP™Som du vill ha det till.
     

Det skulle vara bra om grupper som använder InPort för att dokumentera sina datamängder också skulle användaERDDAP™för att göra de faktiska uppgifterna tillgängliga:

*   ERDDAP™är en lösning som kan användas just nu så att du kan uppfyllaNOAA"S[Offentlig tillgång till forskningsresultat (Parr) krav](https://nosc.noaa.gov/EDMC/PD.DSP.php)Just nu, inte någon vag tid i framtiden.
*   ERDDAP™gör de faktiska uppgifterna tillgängliga för användare, inte bara metadata. (Vad bra är metadata utan data?) 
*   ERDDAP™stöder metadata (I synnerhet enheterna av variabler) Till skillnad från andra dataserverprogram som beaktas. (Vad bra är data utan metadata?) Att använda programvara som inte stöder metadata är att bjuda in data som ska missförstås och missbrukas.
*   ERDDAP™är fri och öppen programvara till skillnad från någon annan programvara som beaktas. Pågående utveckling avERDDAP™betalas redan för. Stöd förERDDAP™användare är gratis.
*   ERDDAPutseende kan lätt anpassas för att reflektera och markera din grupp (Inte inteERDellerERDDAP) .
*   ERDDAP™erbjuder ett konsekvent sätt att komma åt alla datamängder.
*   ERDDAP™kan läsa data från många typer av datafiler och från relationsdatabaser.
*   ERDDAP™kan hantera stora datamängder, inklusive datamängder där källdata finns i många datafiler.
*   ERDDAP™kan skriva data till många typer av datafiler, på användarens begäran, inklusive vetenskapliga datafiltyper som netCDF, ESRI .csv, ochODV .txt.
*   ERDDAP™kan göra anpassade grafer och kartor över delmängder av data, baserat på användarens specifikationer.
*   ERDDAP™kan hantera icke-data dataset som samlingar av bild, video eller ljudfiler.
*   ERDDAP™har installerats och använts på[mer än 60 institutioner runt om i världen](/#who-uses-erddap).
*   ERDDAP™anges som en av de dataservrar som rekommenderas för användning inomNOAAi den[NOAAData Access Procedurdirektiv](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)Till skillnad från att någon annan programvara beaktas.
*   ERDDAP™är en produkt avNMFS///NOAAså att använda den inomNMFSochNOAAbör vara en stolthet förNMFSochNOAA.

Vänligen geERDDAP™Ett försök. Om du behöver hjälp, skicka ett meddelande iERDDAP™Google grupp.
     
##### addFillValueAttributes{#addfillvalueattributes} 
Detta speciella EDDType-alternativ är inte en datasettyp. Det är ett verktyg som kan lägga till \\_FillValue attribut till vissa variabler i vissa datamängder. Se[addFillValueAttributes](#add-_fillvalue-attributes).
     
##### FindDuplicate Tid{#findduplicatetime} 
Detta speciella EDDType-alternativ är inte en datasettyp. Istället berättar det GenerateDatasets Xml att söka genom en samling rutnät.nc  (och relaterade) filer för att hitta och skriva ut en lista över filer med dubbla tidsvärden. När det ser på tidsvärdena konverterar det dem från de ursprungliga enheterna till"seconds since 1970-01-01"om olika filer använder olika enheter strängar. Du måste tillhandahålla startkatalogen (med eller utan stigande slash) filnamnet regelbundet uttryck (t.ex. .\\*\\*\\*************.nc ) och namnet på tidsvariabeln i filerna.
     
##### ncdump{#ncdump} 
Detta speciella EDDType-alternativ är inte en datasettyp. Istället berättar det GenerateDatasets Xml för att skriva ut en[ncdump](https://linux.die.net/man/1/ncdump)\\-liknande utskrift av en.nc,.ncml, eller.hdffil. Den använder faktiskt netcdf-java[NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), vilket är ett mer begränsat verktyg än C-versionen av NCdump. Om du använder det här alternativet kommer GenerateDatasetsXml att be dig att använda ett av alternativen: "-h" (header) , "-c" (koordinat varierar) "-vall" (Default) "-v var1;var2", "-v var1 (0,0:10,0:20) ". Detta är användbart eftersom det är svårt att veta vad som finns i en.nc,.ncml, eller.hdffil och därmed vilken EDDType du ska ange för GenerateDatasets Xml. För en.ncml-fil, detta kommer att skriva ut ncdump-utgången för resultatet av.ncml-filändringar som tillämpas på den underliggande.nceller.hdffil.
         
### DasDds{#dasdds} 
*   [ **DasDds** ](#dasdds)är ett kommandoradsprogram som du kan använda efter att du har skapat ett första försök på XML för en ny datamängddatasets.xml. Med DasDds kan du upprepade gånger testa och förfina XML. När du använder DasDds-programmet:
    1. På Windows, första gången du kör DasDds, måste du redigera DasDds. bat fil med en text redaktör för att ändra vägen till java. exe fil så att Windows kan hittaJava.
    2. DasDds ber dig omdatasetIDför dataset du arbetar med.
    3. DasDds försöker skapa datasetet med detdatasetID.
        * DasDds skriver alltid ut massor av diagnostiska meddelanden.
Om du använder "DasDds -verbose", kommer DasDds att skriva ut mer diagnostiska meddelanden än vanligt.
        * För säkerhet tar DasDds alltid bort all cachad dataset-information (filer filer) för datamängden innan du försöker skapa datamängden. Detta motsvarar att sätta en[hård flagga](/docs/server-admin/additional-information#hard-flag)Så för aggregerade datamängder kanske du vill justera filenNameRegex tillfälligt för att begränsa antalet filer som datakonstruktören hittar.
        * Om dataset inte laddas (oavsett anledning) DasDds kommer att stoppa och visa dig felmeddelandet för det första felet som det hittar.
             **Försök inte gissa vad problemet kan vara. Läs ERROR-meddelandet noggrant.**   
Om det behövs, läs de föregående diagnostiska meddelandena för att hitta fler ledtrådar och information också.
        *    **Gör en ändring av datamängdens XML för att försöka lösa detta problem**   
Och låt DasDds försöka skapa dataset igen.
        *    **Om du upprepade gånger löser varje problem kommer du så småningom att lösa alla problem**   
och dataset kommer att laddas.
    4. Alla DasDds output (diagnostik och resultat) är skrivna på skärmen och *bigParentDirectory* /logs/DasDds.log.
    5. Om DasDds kan skapa datamängden kommer DasDds sedan att visa dig[.das (Dataset Attribute Structure) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das),[.dds (Dataset Descriptor Struktur) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds)och[TimeGaps (Tidsluckor) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)information för datamängden på skärmen och skriv dem till *bigParentDirectory* /logs/DasDds.out.
    6. Ofta vill du göra några små ändringar i datasetets XML för att rensa datasetets metadata och köra DasDds.

### Bonus Bonus Bonus Bonus Bonus Tredjepartsverktyg:ERDDAP-Lint{#bonus-third-party-tool-erddap-lint} 
ERDDAP-lint är ett program från Rob Fuller och Adam Leadbetter från det irländska marinininstitutet som du kan använda för att förbättra metadata för dinERDDAP™dataset.ERDDAP-lint "innehåller regler och en enkel statisk webbapplikation för att köra vissa verifieringstest mot dinaERDDAP™Server. Alla tester körs i webbläsaren.” som liknar[Unix/Linux lint verktyg](https://en.wikipedia.org/wiki/Lint_(software)Du kan redigera befintliga regler eller lägga till nya regler. Se[ERDDAP-Lint](https://github.com/IrishMarineInstitute/erddap-lint)för mer information.

Detta verktyg är särskilt användbart för datamängder som du skapade för en tid sedan och vill nu uppdatera med dina aktuella metadatapreferenser. Till exempel tidiga versioner av GenerateDatasets Xml gjorde inga ansträngningar för att skapa globaltcreator\\_name,creator\\_emailcreator\\_type, ellercreator\\_urlmetadata. Du kan användaERDDAP-lätta för att identifiera de datamängder som saknar dessa metadataattribut.

Tack vare Rob och Adam för att skapa detta verktyg och göra det tillgängligt förERDDAP™gemenskap.
 
## Den grundläggande strukturen av dendatasets.xmlFil{#the-basic-structure-of-the-datasetsxml-file} 
De nödvändiga och valfria taggarna tillåtna i endatasets.xmlfil (och antalet gånger de kan visas) visas nedan. I praktiken, dindatasets.xmlkommer att ha många&lt;dataset&gt;'s tags och endast använda andra taggar inom&lt;erddapDatasets&gt; efter behov.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Det är möjligt att andra kodningar kommer att tillåtas i framtiden, men för närvarande rekommenderas endast ISO-8859-1.
 
### XInclude{#xinclude} 
Ny version 2.25 är stöd för XInclude. Detta kräver att du använder SAX parser&lt;AnvändSaxParser&gt;True&lt;/useSaxParser&gt; i din setup.xml. Detta kan låta dig skriva varje dataset i sin egen fil, sedan inkludera dem alla i huvudet.datasets.xmlåteranvända delar av dataset definitioner, eller båda. Om du vill se ett exempel,[EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)Anger XInclude för att återanvända variabla definitioner.
 

- - - - -

## Anteckningar{#notes} 

Arbeta meddatasets.xmlfilen är ett icke-trivialt projekt. Läs alla dessa anteckningar noggrant. När du väljer en[Dataset typ](#list-of-types-datasets)Läs noga den detaljerade beskrivningen av den.
     
### Välja Dataset Type{#choosing-the-dataset-type} 
I de flesta fall finns det bara enERDDAP™datasettyp som är lämplig för en viss datakälla. I några fall (t.ex.,.ncfiler filer) Det finns några möjligheter, men vanligtvis är en av dem definitivt bäst. Det första och största beslutet du måste göra är: är det lämpligt att behandla datamängden som en grupp multidimensionella arrayer. (om så ser[EDDGridDatasettyper](#eddgrid)) eller som en databasliknande tabell över data (om så ser[EDDTable dataset typer](#eddtable)) .
     
### Servera data som är{#serving-the-data-as-is} 
Vanligtvis finns det ingen anledning att ändra datakällan (t.ex. konvertera filerna till någon annan filtyp) så attERDDAP™kan tjäna den. En av antagandena omERDDAP™är att datakällan kommer att användas som den är. Vanligtvis fungerar detta bra. Vissa undantag är:
* Relationsdatabaser och Cassandra -----ERDDAP™kan tjäna data direkt från relationsdatabaser och Cassandra. Men för säkerhet, lastbalansering och prestandaproblem kan du välja att ställa in en annan databas med samma data eller spara data för attNetCDFv3.ncfiler och harERDDAP™tjäna data från den nya datakällan. Se[EDDTableFromDatabase](#eddtablefromdatabase)och[EDDTableFromCassandra](#eddtablefromcassandra).
* Inte stödda datakällor -ERDDAP™kan stödja ett stort antal typer av datakällor, men världen är fylld med 1000 (miljoner?) av olika datakällor (I synnerhet datafilstrukturer) . OmERDDAP™Stöder inte din datakälla:
    * Om datakällan ärNetCDF .ncfiler, du kan använda[NcML](#ncml-files)ändra datafilerna på flygningen, eller använda[NCO](#netcdf-operators-nco)att permanent ändra datafilerna.
    * Du kan skriva data till en datakälla typ somERDDAP™stöd.NetCDF-3.ncfiler är en bra, allmän rekommendation eftersom de är binära filer somERDDAP™kan läsa mycket snabbt. För tabelldata, överväga att lagra data i en samling av.ncfiler som använder[CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)sammanhängande Ragged Array datastrukturer och så kan hanteras medERDDAP"S[EDDTableFromNcCFFiles](#eddtablefromnccffiles)). Om de är logiskt organiserade (var och en med data för en bit av utrymme och tid) ,ERDDAP™kan utvinna data från dem mycket snabbt.
    * Du kan begära att stöd för den datakällan läggs tillERDDAP™genom att maila Chris. John på noaa.gov.
    * Du kan lägga till stöd för den datakällan genom att skriva koden för att hantera den själv. Se[ochERDDAP™Programmers guide](/docs/contributing/programmer-guide)
* Hastighet -ERDDAP™kan läsa data från vissa datakällor mycket snabbare än andra. Till exempel, läsningNetCDFv3.ncfiler är snabba och att läsa ASCII filer är långsammare. Och om det finns en stor (&gt;1000) eller stora (&gt;10 000) antal källdatafiler,ERDDAP™svarar på vissa dataförfrågningar långsamt. Vanligtvis är skillnaden inte märkbar för människor. Men om du trorERDDAP™är långsam för en viss datamängd, du kan välja att lösa problemet genom att skriva data till en mer effektiv installation (Vanligtvis: några välstrukturerade,NetCDFv3.ncfiler filer) . För tabular data, se[Detta råd](#millions-of-files).
         
### Hint{#hint} 
Det är ofta lättare att generera XML för en dataset genom att göra en kopia av en fungerande dataset beskrivning i dataset.xml och sedan ändra den.
    
### Kodning av speciella karaktärer{#encoding-special-characters} 
Sedan dessdatasets.xmlär en XML-fil, du måste[och kod](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"&", "&lt;", och "&gt;" i något innehåll som "&amp;", "&lt;och "&gt;".
Fel:&lt;Titeln &gt; Time & Tides&lt;/title&gt;
Rätt:&lt;Titeln &gt; Time &amp; Tides&lt;/title&gt;
     
### XML tolererar inte syntaxfel{#xml-doesnt-tolerate-syntax-errors} 
När du redigerar dataset.xml-filen är det en bra idé att verifiera att resultatet är[Välformad XML](https://www.w3schools.com/xml/xml_dtd.asp)genom att klistra in XML-texten i en XML-kontroll som[xmlvalidering](https://www.xmlvalidation.com/).
     
### Felsökning Tips{#troubleshooting-tips} 
*    **Andra sätt att diagnostisera problem med dataset**   
Förutom de två huvud[Verktyg](#tools),
    *   [Log.txt](/docs/server-admin/additional-information#log)är en loggfil med allaERDDAPdiagnostiska meddelanden.
    * och[Daglig rapport](/docs/server-admin/additional-information#daily-report)har mer information än statussidan, inklusive en lista över datamängder som inte laddades och undantagen (fel) De genererade.
    * och[Status Page](/docs/server-admin/additional-information#status-page)är ett snabbt sätt att kontrolleraERDDAPstatus från alla webbläsare. Den innehåller en lista över datamängder som inte laddades (Även om inte de relaterade undantagen) och uppgiftThread statistik (visa utvecklingen av[EDDGridKopiera](#eddgridcopy)och[EDDTableCopy](#eddtablecopy)Dataset och alla[EDDGridFrånFiles](#eddgridfromfiles)eller[EDDTableFromFiles](#eddtablefromfiles)datamängder som använder[CacheFromUrl](#cachefromurl)  (Men inte cache SizeGB) ) .
    * Om du fastnar, se vår[sektion om att få ytterligare stöd](/docs/intro#support).
         
### Speciella variabler{#special-variables} 
*    **[Längden, latitud, höjd (eller djup) och tid (LLAT) Variabel](#destinationname) [destinationName](#destinationname)S är speciella.** 
    * I allmänhet:
        * LLAT variabler är kända förERDDAP™Om axelvariabeln (FörEDDGridDataset) eller datavariabelns (för EDDTable dataset)  [destinationName](#destinationname)är "längd", "latitud", "höjd", "djup", eller"time".
        * Vi uppmuntrar dig starkt att använda dessa standardnamn för dessa variabler när det är möjligt. Ingen av dem krävs. Om du inte använder dessa speciella variabla namn,ERDDAP™kommer inte att känna igen deras betydelse. Till exempel, LLAT variabler behandlas speciellt genom att göra en graf ( *datasetID* .graph) Om X Axis-variabeln är "längd" och Y Axis-variabeln är "latitud", får du en karta (med hjälp av en standardprojektion och med en landmask, politiska gränser etc.) istället för ett diagram.
        *   ERDDAP™lägger automatiskt till massor av metadata till LLAT-variabler (Till exempel, "[ioos\\_category](#ioos_category)", "[enheter](#units)", och flera standardrelaterade attribut som "\\_CoordinateAxisType") .
        *   ERDDAP™automatiskt, on-the-fly, lägga till massor av globala metadata relaterade till LLAT-värdena för den valda datadelen (Till exempel "geospatial\\_lon\\_min") .
        * Kunder som stöder dessa metadatastandarder kommer att kunna utnyttja den tillsatta metadatan för att placera data i tid och rum.
        * Kunderna kommer att finna det lättare att generera frågor som inkluderar LLAT-variabler eftersom variabelns namn är desamma i alla relevanta datamängder.
    * För variabeln "längd" och "latitud":
        * Använda[destinationName](#destinationname)"Längd" och "latitud" endast om[enheter](#units)är grader \\ öster och grader \\_north, respektive. Om dina data inte passar dessa krav, använd olika variabla namn (x, y, lonRadians, latRadians) .
        * Om du har longitud- och latituddata uttryckt i olika enheter och därmed med olikadestinationNames, till exempel lonRadians och latRadians, gör en graf ( *datasetID* .graph) kommer att göra grafer (Till exempel tidsserier) istället för kartor.
    * För "höjd" variabeln och "djup" variabeln:
        * Använda[destinationName](#destinationname)"höjd" för att identifiera datans avstånd över havsnivån (positiv="up" värden) . Alternativt kan du använda "höjd" för avstånd under havsnivån om värdena är negativa under havet (eller om du använder till exempel,
[Och [Gud]&lt;Att namn="scale\\_factor"typ="int"&gt;- 1 1&lt;/att&gt;] (#scale_factor) För att omvandla djupvärdena till höjdvärden.
        * AnvändadestinationName"djup" för att identifiera datans avstånd under havsnivån (positiv="ner" värderingar) .
        * En dataset kanske inte har både "höjd" och "djup" variabler.
        * För dessa variabla namn,[enheter](#units)måste vara "m", "meter" eller "meter". Om enheterna skiljer sig (till exempel fathoms) Du kan använda
[Och [Gud]&lt;Att namn="scale\\_factor"&gt;&gt;&gt;&gt; *vissa Värde* &lt;/att&gt;] (#scale_factor) och [och]&lt;Att namn="enheter"&gt;mätare&lt;/att&gt;] (#units) att konvertera enheterna till meter.
        * Om dina data inte passar dessa krav, använd en annandestinationName  (Till exempel överGround, distans ToBottom) .
        * Om du känner till den vertikala CRS, ange den i metadata, t.ex. "EPSG:5829" (omedelbar höjd över havsnivån) "EPSG:5831" (omedelbar djup under havsnivån) eller EPSG:5703 (NAVD88 höjd) .
    * För"time"Variabel:
        * Använda[destinationName](#destinationname) "time"endast för variabler som inkluderar hela datumet+ (eller datum, om det är allt som finns) . Om det till exempel finns separata kolumner för datum och tidOfDay, använd inte variabelnamnet"time".
        * Se[enheter](#time-units)för mer information om enheterna attribut för tid och tidStamp variabler.
        * Tiden variabel och relaterad[Tid Stamp variabler](#timestamp-variables)är unika genom att de alltid konverterar datavärden från källans tidsformat (Vad det än är) till ett numeriskt värde (sekunder sedan 1970-01-01T00:00:00Z) eller ett strängvärde (ISO 8601:2004 (E E E E) format format) beroende på situationen.
        * När en användare begär tidsdata kan de begära det genom att ange tiden som ett numeriskt värde. (sekunder sedan 1970-01-01T00:00:00Z) eller ett strängvärde (ISO 8601:2004 (E E E E) format format) .
        *   ERDDAP™har ett verktyg för[Konvertera en numerisk Dags att/från en strängtid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        * Se[Hur hurERDDAPErbjudanden med tiden](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
            
### Varför bara två grundläggande datastrukturer?{#why-just-two-basic-data-structures} 
* Eftersom det är svårt för mänskliga kunder och datorklienter att hantera en komplex uppsättning möjliga datasetstrukturer,ERDDAP™använder bara två grundläggande datastrukturer:
    * en[Nätad datastruktur](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (till exempel för satellitdata och modelldata) och
    * en[Tabular datastruktur](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (till exempel för in-situ buoy, station och banor data) .
* Visst, inte alla data kan uttryckas i dessa strukturer, men mycket av det kan. Tabeller är i synnerhet mycket flexibla datastrukturer (Titta på framgången för relationella databasprogram) .
* Detta gör datafrågor lättare att konstruera.
* Detta gör datarespons har en enkel struktur, vilket gör det lättare att tjäna data i en bredare mängd olika standardfiltyper. (som ofta bara stöder enkla datastrukturer) . Detta är den främsta anledningen till att vi sätter uppERDDAP™Detta sätt.
* Detta i sin tur gör det väldigt enkelt för oss (eller någon) att skriva klientprogramvara som fungerar med allaERDDAP™dataset.
* Detta gör det lättare att jämföra data från olika källor.
* Vi är mycket medvetna om att om du är van vid att arbeta med data i andra datastrukturer kan du inledningsvis tro att detta tillvägagångssätt är förenklat eller otillräckligt. Men alla datastrukturer har avvägningar. Ingen är perfekt. Även do-it-all-strukturerna har sina nackdelar: att arbeta med dem är komplext och filerna kan bara skrivas eller läsas med speciella programbibliotek. Om du accepterarERDDAP"Tillvägagångssätt nog för att försöka arbeta med det, kan du upptäcka att det har sina fördelar. (i synnerhet stödet för flera filtyper som kan hålla dataresponserna) . och[ERDDAP™glid show](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (särskilt[Datastrukturer glider](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) pratar mycket om dessa frågor.
* Och även om detta tillvägagångssätt låter konstigt för dig, mestERDDAP™Kunder kommer aldrig att märka - de kommer helt enkelt att se att alla datamängder har en trevlig enkel struktur och de kommer att vara tacksamma för att de kan få data från en mängd olika källor som returneras i en mängd olika filformat.
         
### Dimensioner{#dimensions} 
*    **Vad händer om nätvariablerna i källdatamängden inte delar samma axelvariabler?**   
InomEDDGriddataset, alla datavariabler MÅSTE använda (aktie) alla axelvariabler. Så om en källdatamängd har vissa variabler med en uppsättning dimensioner, och andra variabler med en annan uppsättning dimensioner, måste du göra två datamängder iERDDAP. Du kan till exempel göra enERDDAP™Dataset med titeln "Some Title (vid ytan) Att hålla variabler som bara använder\\[Tid\\]\\[Latitud\\]\\[Längd\\]dimensioner och göra en annanERDDAP™Dataset med titeln "Some Title (På djupet) för att hålla de variabler som använder\\[Tid\\]\\[höjd\\]\\[Latitud\\]\\[Längd\\]. Eller kanske kan du ändra datakällan för att lägga till en dimension med ett värde (Till exempel höjd = 0) för att göra variablerna konsekventa.
    
    ERDDAP™hanterar inte mer komplicerade datamängder (Till exempel modeller som använder ett mesh av trianglar) bra. Du kan tjäna dessa datamängder iERDDAP™genom att skapa två eller flera datamängder iERDDAP™  (så att alla datavariabler i varje ny datamängd delar samma uppsättning axelvariabler) Men det är inte vad användarna vill ha. För vissa datamängder kan du överväga att göra en vanlig rutnätad version av datamängden och erbjuda det förutom originaldata. Vissa klientprogram kan bara hantera ett vanligt nät, så genom att göra detta når du ytterligare kunder.
     
    
### Projekterade Gridded Data{#projected-gridded-data} 
Vissa ruttna data har en komplex struktur. Till exempel satellitnivå 2 ("Längs spår") data använder inte en enkel projektion. Modeller (och andra) arbetar ofta med ruttna data om olika icke-cylindriska prognoser (till exempel conic, polar stereografi, tripolar) eller i ostrukturerade nät (En mer komplex datastruktur) . Vissa slutanvändare vill ha dessa data som är, så det finns ingen förlust av information. För dessa kunder,ERDDAP™kan tjäna uppgifterna, det vill säga endast omERDDAP™administratören bryter den ursprungliga datamängden i några datamängder, med varje del inklusive variabler som delar samma axelvariabler. Ja, det verkar konstigt för människor inblandade och det skiljer sig från de flestaOPeNDAPservrar. MenERDDAP™betonar att göra data tillgängliga i många format. Det är möjligt eftersomERDDAP™använder/kräver en mer enhetlig datastruktur. Även om det är lite besvärligt (det vill säga annorlunda än förväntat) ,ERDDAP™kan distribuera de projekterade data.

\\[Ja, ja,ERDDAP™kan ha lösare krav för datastrukturen, men hålla kraven för utdataformat. Men det skulle leda till förvirring bland många användare, särskilt nybörjare, eftersom många till synes giltiga förfrågningar om data med olika strukturer skulle vara ogiltiga eftersom data inte skulle passa in i filtypen. Vi fortsätter att komma tillbaka till det nuvarande systemets design.\\]

Vissa slutanvändare vill ha data i en lat lon cylindrisk projektion som Equirectangular / platta carrée eller Mercator) för användarvänlighet i olika situationer. För dessa situationer uppmuntrar viERDDAP™administratör för att använda någon annan programvara (NCO??Matlab?? R? IDV? ...??) att ompröva data på en geografisk (Equirectangular projektion/platta carrée) eller annan cylindrisk projektion och tjäna den formen av data iERDDAP™som en annan dataset. Detta liknar vad folk gör när de konverterar satellitnivå 2-data till nivå 3-data. Ett sådant verktyg är[NCO](https://nco.sourceforge.net/nco.html#Regridding)som erbjuder tilläggsalternativ för regridding data.

#### GIS och Reprojecting Data{#gis-and-reprojecting-data} 
Eftersom GIS-världen ofta är kartorienterad erbjuder GIS-program vanligtvis stöd för reprojecting av data, dvs att planera data på en karta med en annan projektion.

För närvarande,ERDDAP™inte har verktyg för att reproject data. Istället rekommenderar vi att du använder ett externt verktyg för att göra en variant av datamängden, där data har reprojected från sin ursprungliga form till en rektangulär. (Latitud longitude) array lämplig förERDDAP.

Enligt vår mening CF/DAPVärlden är lite annorlunda än GIS-världen och fungerar på en något lägre nivå.ERDDAP™reflekterar det. I allmänhet,ERDDAP™är utformad för att arbeta främst med data (Inte kartor) Och vill inte förändras (t.ex. reproject) dessa data. FörERDDAP™Graderade data är ofta/vanligtvis/helst associerade med lat lon värderingar och en cylindrisk projektion, och inte några projektions x,y värderingar. I alla fall,ERDDAP™gör ingenting med dataprojektionen; det passerar bara data genom, liksom med sin nuvarande projektion, på teorin att en reprojection är en betydande förändring av data ochERDDAP™vill inte vara involverad i betydande förändringar. Även efterföljande användare kan naivt reproject data igen, vilket inte skulle vara lika bra som att bara göra en reprojection. (Så omERDDAP™administratören vill erbjuda data i en annan projektion, böter; reproject the data offline och erbjuda det som en annan dataset iERDDAP. Många satellitbaserade datamängder erbjuds som vad NASA kallar Nivå 2 (Svära) och som nivå 3 (Equirectangular projektion) versioner.) När närERDDAP™Gör kartor (direkt eller viaWMSeller KML) ,ERDDAP™för närvarande bara erbjuder att göra kartor med Equirectangular / plattan carrée projektion som lyckligtvis accepteras av de flesta kartläggningsprogram.

Vi uppmuntrarERDDAP™administratörer att använda någon annan programvara (NCO??Matlab?? R? IDV? ...??) att ompröva data på en geografisk (Equirectangular projektion/platta carrée) eller annan cylindrisk projektion och tjäna den formen av data iERDDAP™som en annan dataset. Detta liknar vad folk gör när de konverterar satellitnivå 2-data till nivå 3-data. Ett sådant verktyg är[NCO](https://nco.sourceforge.net/nco.html#Regridding)som erbjuder tilläggsalternativ för regridding data.

Vi hoppas attERDDAP™kommer att ha inbyggda verktyg för att erbjuda kartor med andra prognoser i framtiden. Vi hoppas också ha bättre kopplingar till GIS-världen i framtiden. (annat än den nuvarandeWMSServiceservice) . Det är hemskt att i denna ”moderna” värld är länkarna mellan CF/DAPVärlden och GIS är fortfarande så svaga. Båda dessa saker finns på listan To Do. (Om du vill hjälpa, särskilt med att anslutaERDDAP™Till MapServer, vänligen mail Chris. John på noaa.gov.) 
    
### Datatyper{#data-types} 
ERDDAP™stöder följande datatyper
 (namnen är fallkänsliga;'u'prefix står för "unsigned"; antalet många av namnen i andra system är antalet bitar) Från:

#### Byte{#byte} 
*    **Byte** har tecknat heltalsvärden med en rad -128 till 127.
I andra system kallas detta ibland int8.
Detta kallas "tinyint" av SQL och Cassandra.
    ERDDAP™konverterar[Boolean](#boolean-data)från vissa källor (SQL och Cassandra) till byte iERDDAP™med ett värde på 0=false, 1=true och 127=missing\\_value.
#### ubyte{#ubyte} 
*    **ubyte** har osignerade heltalsvärden med ett intervall på 0 till 255.
I andra system kallas detta ibland uint8.
#### kort kort kort kort{#short} 
*    **kort kort kort kort** har tecknat heltalsvärden med en rad -32768 till 32767.
I andra system kallas detta ibland int16.
Detta kallas "smallint" av SQL och Cassandra.
#### ushort{#ushort} 
*    **ushort** har osignerade heltalsvärden med ett intervall på 0 till 65535.
I andra system kallas detta ibland uint16.
#### Int{#int} 
*    **Int** har tecknat heltalsvärden med en rad -2147483648 till 2147483647.
I andra system kallas detta ibland int32.
Detta kallas "integer|Numeriska (??) SQL och "int" av Cassandra.
#### uint{#uint} 
*    **uint** har osignerade heltalsvärden med ett intervall på 0 till 4294967295.
I andra system kallas detta ibland uint32.
#### länge lång{#long} 
*    **länge lång** har tecknat heltalsvärden med en rad -9223372036854775808 till 9223372036854775807.
I andra system kallas detta ibland int64.
Detta kallas "bigint|Numeriska (??) SQL och "bigint" av Cassandra.
Eftersom många filtyper inte stöder långa data, är deras användning avskräckt. När det är möjligt, använd dubbel istället (Se nedan) .
#### ulong{#ulong} 
*    **ulong** har osignerade heltalsvärden med en rad 0 till 18446744073709551615
I andra system kallas detta ibland uint64.
Eftersom många filtyper inte stöder ulong-data, är deras användning avskräckt. När det är möjligt, använd dubbel istället (Se nedan) .
#### Flyta{#float} 
*    **Flyta** är en IEEE 754 flotta med en rad ca +/- 3.402823466e+38.
I andra system kallas detta ibland float32.
Detta kallas "verkligt|Flyta (??) |Decimal (??) |Numeriska (??) SQL och "float" av Cassandra.
Det speciella värdet NaN betyder Not-a-Number.
    ERDDAP™omvandlar positiva och negativa oändlighetsvärden till NaN.
#### dubbel dubbel{#double} 
*    **dubbel dubbel** är en IEEE 754 dubbel med en räckvidd på cirka
+/- 1.7976931348623157E+308.
I andra system kallas detta ibland float64.
Detta kallas "dubbel precision|Flyta (??) |Decimal (??) |Numeriska (??) SQL och "dubbel" av Cassandra.
Det speciella värdet NaN betyder Not-a-Number.
    ERDDAP™omvandlar positiva och negativa oändlighetsvärden till NaN.
#### Char{#char} 
*    **Char** En enda, 2-byte (16-bit)  [Unicode UCS-2 karaktär](https://en.wikipedia.org/wiki/UTF-16)från\\u0000  (#0 #0) genom\\uffff  (#65535) .
    \\uffffDefinitionen är Not-a-Character, jämförbar med ett dubbelt värde av NaN.
Användningen av char är avskräckt eftersom många filtyper antingen inte stöder chars eller bara stöder 1-byte chars (Se nedan) . Överväg att använda String istället.
Användare kan använda char variabler för att göra grafer.ERDDAP™konvertera karaktärerna till deras Unicode-kodpunktnummer, som kan användas som numeriska data.
#### String{#string} 
*    **String** är en sekvens av 0 eller mer, 2-byte (16-bit)  [Unicode UCS-2 tecken](https://en.wikipedia.org/wiki/UTF-16).
    ERDDAP™använder / tolkar en 0-längdssträng som ett saknat värde.ERDDAP™Stöder inte en riktig null sträng.
Den teoretiska maximala stränglängden är 2147483647 tecken, men det finns förmodligen olika problem på olika ställen även med något kortare strängar.
AnvändningERDDAPs String för SQL: s karaktär, varchar, karaktär varierande, binär, varbinär, intervall, array, multiset, xml och någon annan data data typ som inte passar rent med någon annan databas som inte passarERDDAP™datatyp.
AnvändningERDDAPString för Cassandras "text" och någon annan Cassandra datatyp som inte passar rent med någon annanERDDAP™datatyp.
     

FöreERDDAP™v2.10,ERDDAP™stödde inte osignerade heltalstyper internt och erbjöd begränsat stöd i sina dataläsare och författare.
    
### Datatypbegränsningar{#data-type-limitations} 
Du kan tänka påERDDAP™som ett system som har virtuella datamängder och som fungerar genom att läsa data från en datamängds källa till en intern datamodell och skriva data till olika tjänster (t.ex.(OPeN)DAP,WMS) och filtyper som svar på användarförfrågningar.

* Varje ingångsläsare stöder en delmängd av de datatyper somERDDAP™stöd. Så läs data inERDDAP"S interna datastrukturer är inte ett problem.
* Varje output författare stöder också en delmängd av datatyper. Det är ett problem eftersomERDDAPmåste pressa till exempel långa data till filtyper som inte stöder långa data.
     

Nedan finns förklaringar till begränsningarna (eller ingen) av olika output författare och hurERDDAP™handlar om problemen. Sådana komplikationer är en inneboende del avERDDAP"Syftet med att göra disparata system interoperabelt.

#### ASCI{#ascii} 
* ASCI (.csv,.tsvetc.) Textfiler -
    * Alla numeriska data skrivs via sin String representation (med saknade datavärden som visas som 0-längdsträngar) .
    * Även omERDDAP™skriver långa och ulongvärden korrekt till ASCII textfiler, många läsare (t.ex. kalkylprogram) kan inte korrekt hantera långa och ulongvärden och istället konvertera dem till dubbla värden (med förlust av precision i vissa fall) .
    * Char och String data skrivs via JSON Strings, som hanterar alla Unicode tecken (I synnerhet de "ovanliga" tecknen bortom ASCII #127, t.ex. Euro-karaktären visas som "\\u20ac") .
    
        
#### JSON{#json} 
* JSON (.json,.jsonlCSVetc.) Textfiler -
    * Alla numeriska data skrivs via sin String representation.
    * Char och String data skrivs som JSON Strings, som hanterar alla Unicode tecken (I synnerhet de "ovanliga" tecknen bortom ASCII #127, t.ex. Euro-karaktären visas som "\\u20ac") .
    * Saknade värden för alla numeriska datatyper visas som null.
         
#### .nc3 filer{#nc3-files} 
*   .nc3 filer stöder inte ursprungligen några osignerade datatyper. Före CF v1.9 stödde CF inte osignerade heltalstyper. För att hantera detta,ERDDAP™2.10+ följer NUG-standarden och lägger alltid till en "\\_Unsigned"-attribut med ett värde av "sann" eller "falsk" för att ange om data är från en osignerad eller signerad variabel. Alla integer attribut är skrivna som signerade attribut (t.ex. byte) med signerade värden (t.ex. en ubytactual\\_rangeattribut med värden 0 till 255, framträder som en bytesattribut med värden 0 till -1 (omvänt av de tvås komplementvärde av out-of-range värde). Det finns inget enkelt sätt att veta vilka (signerade) integer attribut bör läsas som osignerade attribut.ERDDAP™stöder attributet "\\_Unsigned" när den läser.nc3 filer.
*   .nc3 filer stöder inte de långa eller ulong datatyperna.ERDDAP™handlar om detta genom att tillfälligt konvertera dem till att vara dubbla variabler. Dubblar kan exakt representera alla värden upp till +/- 9,007,199,254,740,992 som är 2^53. Detta är en ofullkomlig lösning.Unidatavägrar att göra en mindre uppgradering.nc3 för att hantera detta och relaterade problem, med hänvisning.nc4.4 4. (En stor förändring) som lösningen.
* CF specifikation (före v1.9) sade att det stöder en char data typ men det är oklart om char är avsedd endast som byggstenar av char arrays, som är effektivt Strings. Frågor till deras brevlista gav bara förvirrande svar. På grund av dessa komplikationer är det bäst att undvika char variabler iERDDAP™Använd String-variabler när det är möjligt.
* Traditionellt,.nc3 filer stödde endast strängar med ASCII-kodade (7-bit, #0 - #127) karaktärer. NUG (ochERDDAP) Förlänga det (Börja ~2017) genom att inkludera attributet "\\_Encoding" med ett värde av "ISO-8859-1" (en förlängning av ASCII som definierar alla 256 värden av varje 8-bitars karaktär) eller "UTF-8" för att ange hur String-data kodas. Andra kodningar kan vara lagliga men avskräcks.
         
#### .nc4 filer{#nc4-files} 
*   .nc4 filer stöder allaERDDAP"S datatyper.
    
#### NCCSV-filer{#nccsv-files} 
NCCSV 1.0-filer stöder inte några osignerade datatyper.
[NCCSV 1.1+ filer](/docs/user/nccsv-1.00)stödja alla osignerade datatyper.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII-filer och .dods binära filer) -
    *   (OPeN)DAPhanterar korta, ushort, int, uint, float och dubbla värden korrekt.
    *   (OPeN)DAPhar en "byte" datatyp som den definierar som osignerad, medan historiskt, TREDDS ochERDDAP™har behandlat "byte" som undertecknat i deras(OPeN)DAPtjänster. För att hantera detta bättre,ERDDAP™2.10+ följer NUG-standarden och lägger alltid till en "\\_Unsigned"-attribut med ett värde av "sann" eller "falsk" för att ange om data är vadERDDAP™samtal byte eller ubyte. Alla byte- och ubyte-attribut är skrivna som "byte"-attribut med signerade värden (t.ex. en ubytactual\\_rangeattribut med värden 0 till 255, framträder som en bytesattribut med värden 0 till -1 (omvänt av de tvås komplementvärde av out-of-range värde). Det finns inget enkelt sätt att veta vilka "byte" attribut bör läsas som ubyte attribut.
    *   (OPeN)DAPStöder inte signerade eller osignerade längder.ERDDAP™handlar om detta genom att tillfälligt konvertera dem till att vara dubbla variabler och attribut. Dubblar kan exakt representera alla värden upp till 9,007,199,254,740,992 som är 2^53. Detta är en ofullkomlig lösning.OPeNDAP  (organisationen) vägrar att göra en mindre uppgraderingDAP2.0 för att hantera detta och relaterade problem, med hänvisningDAP4.4 4. (En stor förändring) som lösningen.
    * För därför(OPeN)DAPhar ingen separat char datatyp och tekniskt endast stöder 1-byte ASCII-tecken (#0 - #127) i Strings, char data variabler kommer att visas som 1-karaktär långa strängar i(OPeN)DAP.das, .dds och .dods svar.
    * Tekniskt sett,(OPeN)DAPspecifikation stöder endast strängar med ASCII-kodade tecken (#0 - #127) . NUG (ochERDDAP) Förlänga det (Börja ~2017) genom att inkludera attributet "\\_Encoding" med ett värde av "ISO-8859-1" (en förlängning av ASCII som definierar alla 256 värden av varje 8-bitars karaktär) eller "UTF-8" för att ange hur String-data kodas. Andra kodningar kan vara lagliga men avskräcks.
         
### Datatyp kommentarer{#data-type-comments} 
* På grund av det dåliga stödet för långa, ulong- och chardata i många filtyper avskräcker vi användningen av dessa datatyper iERDDAP. När det är möjligt, använd dubbla istället för lång och ulong och använd String istället för char.
     
* Metadata - för(OPeN)DAP.das och .dds svar stöder inte långa eller ulong attribut eller datatyper (och istället visa dem som dubblar) Du kanske istället vill användaERDDAPtabellrepresentation av metadata som ses ihttp.../erddap/ **info info info** /// *datasetID* .html webbsida (till exempel,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (som du också kan få i andra filtyper, t.ex. .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv,.xhtml) eller.nccsvMetadatarespons (till exempel,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)Även om.nccsvMetadata är endast tillgänglig för tabular dataset) Båda stöder alla datatyper (särskilt lång, ulong och char) .
         
### Mediafiler{#media-files} 
Inte alla data är samlingar av nummer eller text. Vissa datamängder består av eller inkluderar mediafiler, till exempel bild, ljud och videofiler.ERDDAP™har några speciella funktioner för att göra det lättare för användare att få tillgång till mediefiler. Det är en två steg process:
 

1. Gör varje fil tillgänglig via sin egen URL, via ett system som stöder bytesintervallförfrågningar.
Det enklaste sättet att göra detta är att sätta filerna i en katalog somERDDAP™har tillgång till. (Om de är i en behållare som en.zipfil, unzip dem, även om du kanske vill erbjuda.zipfil till användare också.) Gör en[EDDTableFromFileNames](#eddtablefromfilenames)dataset för att göra dessa filer tillgängliga viaERDDAP™särskilt viaERDDAP"S["files"Systemsystem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
Alla filer som görs tillgängliga via EDDTableFromFileNames ochERDDAP"S"files"Systemstöd[byte range requests](https://en.wikipedia.org/wiki/Byte_serving). Normalt när en kund (t.ex. en webbläsare) Gör en begäran till en URL, det får hela filen som svar. Men med en byte range begäran anger begäran en rad byte från filen, och servern returnerar endast dessa byte. Detta är relevant här eftersom ljud- och videospelare i webbläsare bara fungerar om filen kan nås via bytesintervallförfrågningar.
    
Valfritt: Om du har mer än en dataset med tillhörande mediafiler kan du göra bara en EDDTableFromFileNames som har en undermapp för varje grupp filer. Fördelen är att när du vill lägga till nya mediefiler för en ny dataset, allt du behöver göra är att skapa en ny mapp och lägga filerna i den mappen. Mappen och filerna läggs automatiskt till i EDDTableFromFileNames dataset.
    
2. Valfritt: Om du har en dataset som innehåller referenser till mediefiler, lägg till den iERDDAP.
Du kan till exempel ha en .csv-fil med en rad för varje gång någon såg en val och en kolumn som inkluderar namnet på en bildfil relaterad till den observationen. Om namnet på bildfilen bara är filnamnet, t.ex. Img20141024T192403Z, inte en fullständig URL, måste du lägga till[filAccessBase Url och/eller fileAccessSuffix](#fileaccessbaseurl)attribut till metadata för detdataVariablesom specificerar basURL och suffix för dessa filnamn. Om du gjorde filerna tillgängliga via EDDTableFromFileNames, kommer webbadressen att vara i formuläret
     *basUrl* /erddap/files/ *datasetID* ///
Till exempel,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Om det finns en.zipeller annan behållarfil med alla mediefiler relaterade till en datavariabel rekommenderar vi att du också gör den filen tillgänglig för användare (se steg 1 ovan) och sedan identifiera den med en[filAccessArchive Url](#fileaccessarchiveurl)attribut.
    

\\[Börjar iERDDAP™v1.82\\]Om du gör det första steget ovan (eller båda stegen) När en användare serERDDAP™ "files"System för dataset (eller ber att se en delmängd av datamängden via en.htmlTableom du gjorde det andra steget) ,ERDDAP™kommer att visa en ikon till vänster om filnamnet. Om användaren hoppar över den ikonen kommer de att se en popup som visar bilden eller en ljudspelare eller en videospelare. Webbläsare stöder endast ett begränsat antal typer av

* bild bild bild bild bild (vanligtvis .gif, .jpg och .png) ,
* ljud (vanligtvis .mp3, .ogg och .wav) och
* Videofiler (vanligtvis .mp4, .ogv och . Webm) .

Stöd varierar med olika versioner av olika webbläsare på olika operativsystem. Så om du har ett val av vilken filtyp som ska erbjudas, är det vettigt att erbjuda dessa typer.

Eller om en användare klickar på filnamnet som visas på enERDDAP™Webbsidan, deras webbläsare kommer att visa bilden, ljud eller videofil som en separat webbsida. Detta är mest användbart för att se en mycket stor bild eller video skalas till full skärm, istället för i en popup.
    
### Arbeta med AWS S3-filer{#working-with-aws-s3-files} 
[Amazon Web Service (AWS) ](https://aws.amazon.com)är en säljare av[cloud computing](https://en.wikipedia.org/wiki/Cloud_computing)tjänster.[S3](https://aws.amazon.com/s3/)är ett objektlagringssystem som erbjuds av AWS. Istället för det hierarkiska systemet av kataloger och filer av ett traditionellt filsystem (Som en hårddisk i din PC) S3 erbjuder bara "buckets" som håller "objekt" (Vi kallar dem"files") .

För ASCII filer (t.ex. .csv) ,ERDDAP™kan arbeta med filerna i hinkarna direkt. Det enda du behöver göra är att ange det&lt;filDir&gt; för dataset med ett specifikt format för AWS-hinken, t.ex. https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . Du bör inte använda&lt;cacheFromUrl&gt; Se nedan för detaljer.

Men för binära filer (t.ex.,.nc.grib, .bufr, och.hdffiler filer) Du behöver använda&lt;cacheFromUrl&gt; systemet som beskrivs nedan.ERDDAPnetcdf-java (som skallERDDAP™Använder för att läsa data från dessa filer) , och andra vetenskapliga dataprogram är utformade för att arbeta med filer i ett traditionellt filsystem som erbjuder[blocknivå](https://en.wikipedia.org/wiki/Block-level_storage)tillgång till filer (som tillåter att läsa bitar av en fil) S3 erbjuder endast[filnivå (Objekt objekt) ](https://en.wikipedia.org/wiki/Block-level_storage)tillgång till filer (som endast tillåter att läsa hela filen) . AWS erbjuder ett alternativ till S3,[Elastisk blockbutik (EBS) ](https://aws.amazon.com/ebs/)), som stöder blocknivååtkomst till filer men det är dyrare än S3, så det används sällan för bulklagring av stora mängder datafiler. (När folk säger att lagra data i molnet (S3) är billigt, det är vanligtvis ett äpple till orange jämförelse.) 

#### S3 Buckets{#s3-buckets} 
 **Innehållet i en hink. Nycklar. Objekt. Delimiters.**   
Tekniskt sett är S3-hinkarna inte organiserade i en hierarkisk filstruktur som ett filsystem på en dator. Istället innehåller buckets bara "objekt" (filer filer) Var och en har en "nyckel" (Ett namn) . Ett exempel på en nyckel i den noaa-goes17 hinken är

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
motsvarande URL för det objektet är

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS stöder en liten variation i hur denna URL är konstruerad, menERDDAP™kräver detta specifika format:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
Det är vanligt att, som med detta exempel, göra nyckelnamn ser ut som en hierarkisk väg plus ett filnamn, men tekniskt sett är de inte. Eftersom det är vanligt och användbart,ERDDAP™behandlar nycklar med / som om de är en hierarkisk väg plus filnamn, och denna dokumentation kommer att hänvisa till dem som sådan. Om en hinks nycklar inte använder /'s (t.ex. en nyckel som
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s201805222475), sedanERDDAP™behandlar bara hela nyckeln som ett långt filnamn.

Privat vs offentliga hinkar ----- Administratören för S3-hinken kan göra hinken och dess innehåll offentliga eller privata. Om allmänheten kan någon fil i hinken laddas ner av någon som använder URL för filen. Amazon har en[Öppna data](https://aws.amazon.com/opendata/)Program som är värd för offentliga dataset (inklusive data frånNOAANASA och USGS) gratis och tar inte betalt för någon att ladda ner filerna från dessa hinkar. Om en hink är privat, filer i hinken är endast tillgängliga för auktoriserade användare och AWS tar ut en avgift (vanligen betalas av hinkens ägare) för att ladda ner filer till en icke-AWS S3-dator.ERDDAP™kan arbeta med data i offentliga och privata hinkar.

#### AWS Credentials{#aws-credentials} 
För att göra det så attERDDAP™kan läsa innehållet i privata hinkar, du behöver AWS-uppgifter och du måste lagra en referensfil på standardplatsen så attERDDAP™kan hitta informationen. Se AWS SDK förJava2.x dokumentation:[Sätt standard credentials](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (Alternativet att lagra värdena somJavakommandoradsparametrar i\\[Tomcat\\]/bin/setenv.sh kan vara ett bra alternativ.) 
#### AWS /files/{#aws-files} 
* /filer/system -- ochERDDAP™ [/filer/system](#accessibleviafiles)tillåter användare att ladda ner källfilerna för en dataset. Vi rekommenderar att du slår på detta för alla datamängder med källfiler eftersom många användare vill ladda ner de ursprungliga källfilerna.
    * Om filerna finns i en privat S3 hink, kommer användarens begäran att ladda ner en fil hanteras avERDDAP™, som kommer att läsa data från filen och sedan överföra den till användaren, vilket ökar belastningen på dinERDDAP™Använd inkommande och utgående bandbredd och gör dig (ochERDDAP™Administratör) betala data egress avgift till AWS.
    * Om filerna finns i en offentlig S3-hink kommer användarens begäran om att ladda ner en fil att omdirigeras till AWS S3-adressen för den filen, så data kommer inte att flöda igenomERDDAP™och därmed minska belastningen påERDDAP. Och om filerna finns i en Amazon Open Data (Gratis gratis) Offentlig hink, då du (ochERDDAP™Administratör) behöver inte betala någon data egress avgift till AWS. Således finns det en stor fördel med data från allmänheten (Inte privat) S3 hinkar och en stor fördel att servera data från Amazon Open Data (Gratis gratis) Buckets.

#### ERDDAP™och AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™och AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)  
Lyckligtvis, efter mycket ansträngning,ERDDAP™har ett antal funktioner som gör det möjligt att hantera de inneboende problemen med att arbeta med S3:s blocknivååtkomst till filer på ett rimligt effektivt sätt:

*   \\[Disclaimer: Att arbeta med AWS S3 hink är mycket extra arbete. AWS är ett stort ekosystem av tjänster och funktioner. Det finns mycket att lära sig. Det tar tid och ansträngning, men det är do-able. Var tålmodig och du får saker att fungera. Titta/be om hjälp
(b)[AWS dokumentation](https://aws.amazon.com/documentation/gettingstarted/)webbplatser som[Stack Overflow](https://stackoverflow.com/)och regelbunden
    [ERDDAP™Supportalternativ](/docs/intro#support)Om/när du fastnar.\\]  
     
* Det kan vara svårt att ens ta reda på katalogen struktur och filnamn på filerna i en S3 hink.ERDDAP™har en lösning för detta problem: EDDTableFromFileNames har en speciell[\\*\\*FrånOnTheFly](#fromonthefly)alternativet som låter dig göra en EDDTableFromFileNames dataset som gör det möjligt för användare att surfa på innehållet i en S3-hink (och ladda ner filer) via datasetets"files"Alternativ. Det finns en[Exempel på detta nedan](#viewing-the-contents-of-a-bucket).
     
*   ERDDAP™kan läsa data från[externt komprimerade datafiler](#externally-compressed-files)Så det är bra om filerna på S3 lagras som.gz,.gzip,.bz2.Z eller andra typer av externt komprimerade datafiler, som dramatiskt kan (2 - 20X) skär ner på fillagringskostnader. Det finns ofta ingen tidsstraff för att använda externt komprimerade filer, eftersom tiden sparas genom att överföra en mindre fil från S3 tillERDDAPungefär balanserar den extra tid som behövs förERDDAP™att dekomprimera filen. För att använda den här funktionen måste du bara se till att datasetets&lt;FilnamnRegex&gt; möjliggör komprimerad filtyp (t.ex. genom att lägga till (|.gz) till slutet av regex) .
     
* För det vanligaste fallet, där du har enERDDAP™installerad på din dator för test / utveckling och där datamängden har binära datafiler som lagras som objekt i en S3-hink, ett tillvägagångssätt för att få datamängden iERDDAP™är:
    1. Skapa en katalog på din dator för att hålla några testdatafiler.
    2. Ladda ner två datafiler från källan till den katalog du just skapat.
    3. Användning[GenerateDatasetsXml](#generatedatasetsxml)för att generera biten avdatasets.xmlför dataset baserat på de två lokala datafilerna.
    4. Kontrollera att dataset fungerar som önskat med[DasDds](#dasdds)och/eller din lokalaERDDAP.
        
         **Följande steg gör en kopia av dataset (som kommer att få data från S3 hink) på en offentligERDDAP.** 
        
    5. Kopiera biten avdatasets.xmlför dataset tilldatasets.xmlför allmänhetenERDDAP™Det kommer att tjäna data.
    6. Skapa en katalog på allmänhetenERDDAP"S lokal hårddisk för att hålla en cache av tillfälliga filer. Katalogen kommer inte att använda mycket diskutrymme (se cacheSizeGB nedan) .
    7. Ändra värdet av datasetets&lt;filDir&gt; tag så att den pekar på katalogen du just skapat (Även om katalogen är tom) .
    8. Lägg till en[CacheFromUrl](#cachefromurl)tagga som specificerar datasetets hinknamn och valfritt prefix (dvs. katalog) i den specifika[S3 URL-format somERDDAP™Kraven](#accessing-files-in-an-aws-s3-bucket).
    9. Lägg till en [&lt;cacheSizeGB&gt;] (#cachefromurl) tag till datasetets xml (10 är ett bra värde för de flesta dataset) Att berättaERDDAP™begränsa storleken på den lokala cache (dvs, försök inte att cache alla fjärrfiler) .
    10. Se om det fungerar offentligtERDDAP. Observera att första gångenERDDAP™laddar datamängden, det tar lång tid att ladda, eftersomERDDAP™måste ladda ner och läsa alla datafiler.
        
Om datamängden är en stor samling av stora rutnät datafiler, kommer detta att ta mycket lång tid och vara opraktiskt. I vissa fall, för ruttna datafiler,ERDDAP™kan utvinna nödvändig information (t.ex. tidspunkten för data i en rutnät datafil) från filnamnet och undvik detta problem. Se[Aggregation via Filnamn](#aggregation-via-file-names-or-global-metadata).
        
    11. Optionellt (men särskilt för EDDTableFromFiles dataset) Du kan lägga till en[nThreads](#nthreads)tagga till dataset för att berättaERDDAPatt använda mer än 1 tråd när du svarar på en användares begäran om data. Detta minimerar effekterna av fördröjningen som uppstår närERDDAP™Läser datafiler från (fjärrfjärr fjärrfjärr fjärrfjärr fjärrfjärr fjärrfjärr fjärrfjärr fjärrfjärr fjärrfjärr fjärrfjärr fjärrfjärr fjärrfjärr fjärrfjärr fjärrfjärrfjärr fjärrfjärr fjärrfjärr fjärr fjärrfjärr fjärrfjärr fjärrfjärrfjärrfjärr fjärr fjärr fjärrfjärr fjärrfjärrfjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr fjärr f) AWS S3 hinkar in i den lokala cache och (Kanske kanske kanske) dekomprimera dem.

#### AWS S3 öppna data{#aws-s3-open-data} 
Som en del avNOAA"S[Big Data Program](https://www.noaa.gov/nodd/about),NOAAhar partnerskap med fem organisationer, inklusive AWS, "för att utforska de potentiella fördelarna med att lagra kopior av viktiga observationer och modellutgångar i molnet för att möjliggöra datorer direkt på data utan att kräva ytterligare distribution". AWS innehåller de datamängder som den får frånNOAAsom en del av programmet för att erbjuda allmänheten tillgång till en stor samling av[Öppna data på AWS S3](https://registry.opendata.aws/)från vilken dator som helst, oavsett om det är en Amazon-dator (En hyrd dator) på AWS-nätverket eller din egen dator på något nätverk. Exemplet nedan förutsätter att du arbetar med en allmänt tillgänglig dataset.

#### Få tillgång till filer i en AWS S3 Bucket{#accessing-files-in-an-aws-s3-bucket} 
För en privat S3 data hink måste hinkens ägare ge dig tillgång till hinken. (Se AWS dokumentation.) 

I alla fall behöver du ett AWS-konto eftersom AWS SDK förJava  (som skallERDDAP™Använder för att hämta information om innehållet i en hink) kräver AWS-kontouppgifter. (mer på detta nedan) 

ERDDAP™Du kan bara få tillgång till AWS S3-hinkarna om du anger [&lt;cacheFromUrl&gt;] (#cachefromurl) (eller&lt;filDir&gt;) i ett specifikt format:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
där var

* BucketName är den korta formen av hinknamnet, t.ex. noaa-goes17.
* Aws-regionen, t.ex. us-east-1, är från kolumnen "Region" i en av tabellerna i[AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html)där hinken faktiskt ligger.
* Prefixet är valfritt. Om det är närvarande måste det sluta med'/'.

Till exempel, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Detta URL-format är en av AWS S3-rekommendationer: se[Tillgång till en hink](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)och[Denna beskrivning av prefix](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html).ERDDAP™kräver att du kombinerar bucket URL och valfri prefix i en URL för att ange&lt;cacheFromUrl&gt; (eller&lt;filDir&gt;) där filerna finns.

#### Test Public AWS S3 Buckets{#test-public-aws-s3-buckets} 
För offentliga hinkar kan du och bör testa bucket URL av AWS S3-katalogen i din webbläsare, t.ex.,
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Om bucket URL är korrekt och lämplig förERDDAPDet kommer att returnera ett XML-dokument som har (partiell) Lista över innehållet i den hinken. Tyvärr hela URL (Bucket URL plus prefix) attERDDAP™vill ha en viss dataset fungerar inte i en webbläsare. AWS erbjuder inte ett system för att bläddra i hierarkin av en hink lätt i din webbläsare. (Om det är felaktigt, vänligen maila Chris. John på noaa.gov. Annars, Amazon, lägg till stöd för detta&#33;) 

#### Visa innehållet i en hink{#viewing-the-contents-of-a-bucket} 
S3 hink innehåller ofta ett par kategorier av filer, i ett par pseudo underkataloger, som kan bli ett par avERDDAP™dataset. Att göraERDDAP™datamängder, du behöver veta startkatalogen för&lt;cacheFromUrl&gt; (eller&lt;filDir&gt;) och formatet för filnamnen som identifierar den delmängden av filer. Om du försöker visa hela innehållet i en hink i en webbläsare, kommer S3 bara att visa dig de första 1000 filer, vilket är otillräckligt. För närvarande är det bästa sättet för dig att se allt innehåll i en hink att göra en[EDDTableFromFileNames](#eddtablefromfilenames)Dataset (på din PCERDDAP™och/eller på din publikERDDAP) , som också ger dig ett enkelt sätt att bläddra i katalogen struktur och ladda ner filer. och&lt;filDir&gt; för det kommer att vara den URL du gjort ovan, t.ex. https://noaa-goes17.s3.us-east-1.amazonaws.com .\\[Varför erbjuder inte AWS S3 ett snabbt och enkelt sätt för alla att göra detta utan ett AWS-konto?\\]Observera att när jag gör det på min dator på ett icke-Amazon-nätverk verkar det som att Amazon saktar ner svaret på en trickle (ca 100 (??) filer per chunk) Efter de första bitarna (1000 filer per chunk) laddas ner. Eftersom buckets kan ha ett stort antal filer (Noaa-goes17 har 26 miljoner) , att få allt innehåll i en hink kan ta EDDTableFromFileNames flera timmar (t.ex. 12&#33;) För att avsluta.\\[Amazon, är det rätt?\\]

#### Gör en EDDTable FromFileNames Dataset med en AWS S3 Bucket{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Om du har ett hinknamn, men inte redan har en lista över filer i S3-hinken eller prefixet som identifierar platsen för relevanta filer i hinken, använd instruktionerna nedan för att göra en EDDTableFromFileNames dataset så att du kan bläddra i katalogen hierarki S3-hinken viaERDDAP"S"files"system.

1. Öppna ett AWS-konto
    ERDDAP™Använder[AWS SDK förJava](https://docs.aws.amazon.com/sdk-for-java/index.html)för att få bucket information från AWS, så du måste[skapa och aktivera ett AWS-konto](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). Det är ett ganska stort jobb, med massor av saker att lära sig.
     
2. Sätt dina AWS-krediter därERDDAP™kan hitta dem.
Följ instruktionerna på[Ställ in AWS Credentials och Region for Development](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)SåERDDAP™  (specifikt AWS SDK förJava) kommer att kunna hitta och använda dina AWS-uppgifter. OmERDDAP™kan inte hitta referenser, du kommer att se en
Java.lang. IllegalArgumentException: profilfilfil kan inte vara noll fel iERDDAPs log.txt-fil.
    
Tips för Linux och Mac OS: credentials-filen måste vara i hemkatalogen för användaren som kör Tomcat (ochERDDAP)   (För den här punkten antar vi användar=tomcat) i en fil som kallas ~/.aws/credentials. Anta inte att ~ är /home /tomcat - faktiskt använda cd ~ för att ta reda på var operativsystemet tänker ~ för användaren =tomcat är. Skapa katalogen om den inte existerar. Också, efter att du satte credentials-filen på plats, se till att användaren och gruppen för filen är tomcat och sedan använda chmod 400-uppgifter för att se till att filen är lätt för användaren =tomcat.
    
3. Skapa bucket URL i[format detERDDAP™Kraven](#accessing-files-in-an-aws-s3-bucket)t.ex.,
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)och (för offentliga hinkar) Testa den i en webbläsare för att se till att den returnerar ett XML-dokument som har en partiell lista innehållet i den hinken.
     
4. Användning[GenerateDatasetsXml](#generatedatasetsxml)att skapa en[EDDTableFromFileNames](#eddtablefromfilenames)Dataset:
    * För startkatalogen, använd denna syntax:
        \\*\\*O *frånOnTheFly,* YourBucketUrl*
till exempel,
        \\*\\*FrånOnTheFly, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * Filnamn regex? . \\************************************************************************************************************************************************************************************************************************************************************
    * Återkommande? sanning sant
    * Reload EveryNMinutes? 10080
    *   infoUrl?? https://registry.opendata.aws/noaa-goes/
 
    * institution?NOAA
    * Sammanfattning? ingenting ingenting (ERDDAP™Skapa en anständig sammanfattning automatiskt.) 
    * Titeln? ingenting ingenting (ERDDAP™Skapa en anständig titel automatiskt.) Som vanligt bör du redigera den resulterande XML för att verifiera korrekthet och göra förbättringar innan massan av datamängder använder den idatasets.xml.
5. Om du följer anvisningarna ovan och laddar datasetet iERDDAPDu har skapat en EDDTableFromFiles dataset. Som ett exempel, och för att göra det lättare för alla att surfa och ladda ner filer från AWS Open Data hinkarna, har vi skapat EDDTableFromFileNames dataset (se listan på
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)för nästan alla[AWS S3 Open Data-hinkarna](https://registry.opendata.aws/).
    \\[De få hinkarna som vi inte inkluderade antingen har ett stort antal filer i rotkatalogen. (mer än vad som kan laddas ner på en rimlig tid) eller inte tillåta allmänhetens tillgång (Är de inte alla tänkta att vara offentliga?) eller är Requester Pays buckets (t ex Sentinel) .\\]  
Om du klickar på"files"länk för en av dessa datamängder, du kan bläddra i katalogen träd och filer i den S3 hink. På grund av vägen\\*\\*\\*frånOnTheFly EDDTableFromFiles fungerar, dessa kataloglistor är alltid helt uppdaterade eftersomERDDAP™Får dem på flygningen. Om du klickar på katalogens träd till ett faktiskt filnamn och klickar på filnamnet,ERDDAP™omdirigera din begäran till AWS S3 så att du kan ladda ner filen direkt från AWS. Du kan sedan inspektera den filen.
    
Problem?
Om din EDDTableFromFiles inte laddas inERDDAP™  (eller DasDds) Titta i log.txt-filen för ett felmeddelande. Om du ser en
Java.lang. IllegalArgumentException: profilfilfil kan inte vara null fel, problemet är att AWS SDK förJava  (används avERDDAP) Hittar inte credentials-filen. Se referensinstruktionerna ovan.
     

Det är olyckligt att AWS inte bara tillåter människor att använda en webbläsare för att visa innehållet i en offentlig hink.

 **Då kan du göraERDDAP™datamängder som ger användarna tillgång till data i filerna.**   
Se instruktionerna i[ERDDAP™och S3 Buckets](#erddap-and-aws-s3-buckets)  (ovanför) .
För provet EDDTableFromFileNames dataset som du gjorde ovan, om du gör lite poking runt med katalogen och filnamn i katalogen träd, blir det klart att toppnivå katalogen namn (till exempel ABI-L1b-RadC) motsvarar vadERDDAP™skulle kalla separata dataset. Den hink du arbetar med kan vara liknande. Du kan sedan fortsätta skapa separata datamängder iERDDAP™för var och en av dessa datamängder, t.ex.,
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Som&lt;cacheFromUrl&gt;. Tyvärr verkar alla datamängder i hinken vara nivå 1 eller nivå 2 datamängder, somERDDAP™ [är inte särskilt bra på](#dimensions)eftersom datamängden är en mer komplicerad samling av variabler som använder olika dimensioner.
     
    
### NcML filer{#ncml-files} 
NcML-filer låter dig ange ändringar på flygningen till en eller flera ursprungliga källaNetCDF  (v3 eller v4)  .nc.grib, .bufr, eller.hdf  (v4 eller v5) filer och sedanERDDAP™behandla.ncml filer som källfiler.ERDDAP™Dataset accepterar.ncml filer när.ncfiler förväntas. NcML-filerna måste ha förlängningen.ncml. Se[UnidataNcML dokumentation](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). NcML är användbart eftersom du kan göra vissa saker med det (Till exempel göra olika ändringar i olika filer i en samling, inklusive att lägga till en dimension med ett specifikt värde till en fil) att du inte kan göra medERDDAP"Sdatasets.xml.

* Förändringar till en.ncml-filens senasteModifierade tid kommer att leda till att filen laddas om när datamängden laddas om, men ändras till den underliggande.ncdatafiler kommer inte att märkas direkt.
* Tips: NcML är\\*väldigt mycket väldigt mycket\\*känslig för order av vissa objekt i NcML-filen. Tänk på NcML som ange en serie instruktioner i den angivna ordningen, med avsikt att ändra källfilerna (staten i början/toppen av NcML-filen) i destinationsfilerna (staten i slutet/botten av NcML-filen) .

Ett alternativ till NcML är[NetCDFOperatörer (NCO) ](#netcdf-operators-nco). Den stora skillnaden är att NcML är ett system för att göra ändringar på flygningen (Så källfilerna ändras inte) , medanNCOkan användas för att göra ändringar (eller nya versioner av) filerna. Båda bådaNCONcML är mycket, mycket flexibel och låter dig göra nästan alla ändringar du kan tänka på filerna. För båda kan det vara utmanande att räkna ut exakt hur man gör vad du vill göra - kontrollera webben för liknande exempel. Båda är användbara verktyg för att förbereda netCDF ochHDFfiler för användning medERDDAPi synnerhet att göra förändringar bortom vadERDDAPManipulationssystem kan göra.

Exempel #1: Lägga till en tidsdimension med ett enda värde
Här är en.ncml-fil som skapar en ny yttre dimension (Tid, med ett värde: 1041379200) och lägger till den dimensionen till bildvariabeln i filen A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.ncFrån:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Exempel #2: Ändra ett befintligt tidsvärde
Ibland källan.ncfilen har redan en tidsdimension och tidsvärde, men värdet är felaktigt (för dina ändamål) . Detta detta.ncml-filen säger: för datafilen heter ""19810825230030-NCEI ...", för dimensionsvariabeln"time"Ange enhetsattributet som "andra sedan 1970-01-01T00:00:00Z" och ange tidsvärdet till 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDFOperatörer (NCO)  {#netcdf-operators-nco} 
netCDF-operatörer (NCO) utgör ett dussin fristående, kommandoradsprogram som tar netCDF\\[v3 eller v4\\],HDF \\[v4 eller v5\\],\\[grib, .bufr,\\]och/ellerDAPfiler som inmatning, sedan köra (t.ex. härleda nya data, beräkna statistik, tryck, hyperslab, manipulera metadata) och mata ut resultaten till skärmen eller filer i text, binära eller netCDF-format.NCOBiståndsanalys av elnätsvetenskapliga data. Shell-command stil avNCOtillåter användare att manipulera och analysera filer interaktivt, eller med uttrycksfulla skript som undviker några överskridande programmiljöer på högre nivå. (från[NCO](https://nco.sourceforge.net/)HomePage) .

Ett alternativ tillNCOär att[NcML](#ncml-files). Den stora skillnaden är att NcML är ett system för att göra ändringar på flygningen (Så källfilerna ändras inte) , medanNCOkan användas för att göra ändringar (eller nya versioner av) filerna. Båda bådaNCONcML är mycket, mycket flexibel och låter dig göra nästan alla ändringar du kan tänka på filerna. För båda kan det vara utmanande att räkna ut exakt hur man gör vad du vill göra - kontrollera webben för liknande exempel. Båda är användbara verktyg för att förbereda netCDF ochHDFfiler för användning medERDDAPi synnerhet att göra förändringar bortom vadERDDAPManipulationssystem kan göra.

Du kan till exempel användaNCOför att göra enheterna i tiden variabel konsekvent i en grupp filer där de inte var konsekvent ursprungligen. Eller du kan användaNCOAnsökanscale\\_factorochadd\\_offseti en grupp filer därscale\\_factorochadd\\_offsethar olika värden i olika källfiler.
 (Eller du kan nu hantera dessa problem iERDDAP™via via via[EDDGridFrånNcFilesUnpacked](#eddgridfromncfilesunpacked)Som är en variant avEDDGridFromNcFiles som packar upp packade data och standardiserar tidsvärden på låg nivå för att hantera en samling filer som har olikascale\\_factors ochadd\\_offseteller olika tidsenheter.) 

NCOär fri och öppen programvara som använder[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)licens.

Exempel #1: Gör enheter konsekvent
EDDGridFromFiles och EDDTable Från filer insisterar att enheterna för en viss variabel är identiska i alla filer. Om några av filerna är trivialt (inte funktionellt) skiljer sig från andra (t.ex. tidsenheter
"andar sedan 1970-01-01 00:00:00 UTC" kontra
"seconds since 1970-01-01T00:00:00Z"Du kan användaNCO"S[ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor)att ändra enheterna i alla filer för att vara identiska med
nco/ncatted -a enheter,time,o,c,'andar sedan 1970-01-01T00:00:00Z'.nc  
\\[För många problem som detta i EDDTableFrån... Filer dataset, du kan nu använda[Standardisera Vad är vad](#standardizewhat)Att berättaERDDAPStandardisera källfilerna när de läses inERDDAP.\\]
    
### Gränser till storleken på en dataset{#limits-to-the-size-of-a-dataset} 
Du kommer att se många referenser till "2 miljarder" nedan. Mer exakt, det är en hänvisning till 2,147,483,647 (2^31-1) , vilket är det maximala värdet av ett 32-bitars signerat heltal. på vissa datorspråk, till exempelJava  (som skallERDDAP™är skrivet i) Det är den största datatypen som kan användas för många datastrukturer. (Till exempel storleken på en array) .

För String värden (till exempel för variabla namn, attributnamn, String attributvärden och String datavärden) Det maximala antalet tecken per String inERDDAP™är ~2 miljarder. Men i nästan alla fall kommer det att finnas små eller stora problem om en sträng överstiger en rimlig storlek. (80 tecken för variabla namn och attributnamn och 255 tecken för de flesta String-attributvärden och datavärden) . Till exempel kommer webbsidor som visar långa variabla namn att vara besvärligt breda och långa variabla namn att trunceras om de överstiger gränsen för svarsfiltypen.

För gridded dataset:

* Det maximala antaletaxisVariables är ~2 miljarder.
Det maximala antaletdataVariables är ~2 miljarder.
Men om en dataset har &gt;100 variabler kommer det att vara besvärligt för användare att använda.
Och om en dataset har &gt;1 miljoner variabler behöver din server mycket fysiskt minne och det kommer att finnas andra problem.
* Den maximala storleken på varje dimension (axisVariable) är ~2 miljarder värden.
* Jag tror att det maximala antalet celler (Produkten av alla dimensioner) är obegränsad, men det kan vara ~ 9e18.

För tabular dataset:

* Det maximala antaletdataVariables är ~2 miljarder.
Men om en dataset har &gt;100 variabler kommer det att vara besvärligt för användare att använda.
Och om en dataset har &gt;1 miljoner variabler behöver din server mycket fysiskt minne och det kommer att finnas andra problem.
* Det maximala antalet källor (Till exempel filer) Det kan aggregeras är ~2 miljarder.
* I vissa fall det maximala antalet rader från en enskild källa (till exempel en fil, men inte en databas) är ~2 miljarder rader.
* Jag tror inte att det finns andra gränser.

För både ruttna och tabelldatamängder finns det några interna gränser för storleken på den delmängd som kan begäras av en användare i en enda begäran. (ofta relaterad till &gt;2 miljarder av något eller ~9e18 av något) , men det är mycket mer troligt att en användare kommer att träffa de filtypspecifika gränserna.

*   NetCDFversion 3.ncfiler är begränsade till 2 GB byte. (Om detta verkligen är ett problem för någon, låt mig veta: Jag kan lägga till stöd förNetCDFversion 3.nc64-bitars förlängning ellerNetCDFVersion 4, vilket skulle öka gränsen avsevärt, men inte oändligt.) 
* Webbläsare kraschar efter endast ~ 500 MB data, såERDDAP™begränsar svaret på.htmlTableFörfrågningar till ~ 400 MB data.
* Många dataanalysprogram har liknande gränser (Till exempel är den maximala storleken på en dimension ofta ~ 2 miljarder värden) Så det finns ingen anledning att arbeta hårt för att komma runt de filtypspecifika gränserna.
* Filtypspecifika gränser är användbara genom att de förhindrar naiva förfrågningar om riktigt stora mängder data. (Till exempel "ge mig all denna datamängd" när datamängden har 20TB data) som skulle ta veckor eller månader att ladda ner. Ju längre nedladdningen, desto mer sannolikt kommer det att misslyckas av olika skäl.
* Filtypspecifika gränser är användbara genom att de tvingar användaren att hantera rimligt stora undergrupper. (Till exempel, hantera en stor rutnätsdataset via filer med data från en gång punkt vardera) .
         
### Växla till ACDD-1.3{#switch-to-acdd-13} 
Vi vi (i synnerhet[GenerateDatasetsXml](#generatedatasetsxml)) För närvarande rekommenderar vi[ACDD version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)ratificerades i början av 2015 och som kallas "ACDD-1.3" i den globala konventionsattributet. FöreERDDAP™version 1.62 (släpptes i juni 2015) ,ERDDAP™används/rekommenderas originalversion 1.0, av[NetCDFAttributkonvention för Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)som kallades "UnidataDataset Discovery v1.0 i de globala konventionerna ochMetadata\\_Conventionsattribut.

Om dina datamängder använder tidigare versioner av ACDD, vi rekommenderar att du byter till ACDD-1.3. Det är inte svårt. ACDD-1.3 är mycket bakåtkompatibel med version 1.0. För att byta, för alla dataset (utomEDDGridFromErddap och EDDTable FrånErddap dataset) Från:

1. Ta bort den nyförsvunna globalaMetadata\\_Conventionsattribut genom att lägga till (eller genom att ändra det befintligaMetadata\\_Conventionsattribut)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
till datasetets globala&lt;addAttributes&gt;.
     
2. Om datamängden har en konventions attribut i den globala&lt;addAttributesÄndra alla "UnidataDataset Discovery v1.0 referenser till "ACDD-1.3".
Om datamängden inte har en konventionsattribut i den globala&lt;addAttributesLägg sedan till en som refererar till ACDD-1.3. Till exempel,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Om dataset har en globalstandard\\_name\\_vocabularyattribut, vänligen ändra formatet på värdet till exempel
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Om referensen är till en äldre version av[CF standardnamntabell](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Det är nog en bra idé att byta till den aktuella versionen. (65, som vi skriver detta) , eftersom nya standardnamn läggs till i tabellen med efterföljande versioner, men gamla standardnamn är sällan deprecated och aldrig bort.
     
4. Även om ACDD-1.0 inkluderade globala attribut förcreator\\_name,creator\\_email,creator\\_url,[GenerateDatasetsXml](#generatedatasetsxml)inte automatiskt lägga till dem förrän någon gång runtERDDAP™v1.50. Detta är viktig information:
        
    *   creator\\_nameLåt användarna veta/citera skaparen av datasetet.
    *   creator\\_emailberättar för användarna den föredragna e-postadressen för att kontakta skaparen av datamängden, till exempel om de har frågor om datamängden.
    *   creator\\_urlger användarna ett sätt att ta reda på mer om skaparen.
    *   ERDDAP™använder all denna information när du genererar FGDC och ISO 19115-2/19139 metadatadokument för varje datamängd. Dessa dokument används ofta av externa söktjänster.
    
Lägg till dessa attribut till datasetets globala&lt;addAttributes&gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Det är det. Hoppas det inte var för svårt.
     
### Zarr{#zarr} 
Från version 2.25ERDDAP™kan läsa lokalt Zarr filer med[EDDTableFromNcFiles](#eddtablefromncfiles)och[EDDGridFrånNcFiles](#eddgridfromncfiles).

 (Från och med augusti 2019) Vi kan lätt vara fel, men vi är ännu inte övertygade om att[Zarr](https://github.com/zarr-developers/zarr-python), eller liknande system som bryter datafiler upp i mindre bitar, är bra lösningar på problemet medERDDAP™Läs data som lagras i molntjänster som Amazon AWS S3. Zarr är en bra teknik som har visat dess användbarhet i olika situationer, vi är bara inte säkra på attERDDAP+S3 är en av dessa situationer. För det mesta säger vi: innan vi rusar för att försöka lagra alla våra data i Zarr, låt oss göra några tester för att se om det faktiskt är en bättre lösning.

Problemen med att komma åt data i molnet är latens (Fördröjningen att först få data) och file-level access (I stället för blocknivååtkomst) . Zarr löser fil-nivå åtkomstproblemet, men gör ingenting om latens. Jämfört med att bara ladda ner filen (Så det kan läsas som en lokal fil med blocknivååtkomst) Zarr kan även förvärra latensproblemet eftersom, med Zarr, läser en fil nu innebär en serie av flera samtal för att läsa olika delar av filen. (Var och en med sin egen lag) . Latency problemet kan lösas genom att parallellisera förfrågningarna, men det är en högre nivå lösning, inte beroende av Zarr.

Och med Zarr (som med relationsdatabaser) Vi förlorar bekvämligheten med att ha en datafil är en enkel, enda fil som du enkelt kan verifiera integriteten av, eller göra / ladda ner en kopia av.

ERDDAP™  (från v2) har ett system för att upprätthålla en lokal cache av filer från en URL-källa (t ex S3) (Se (se)&lt;cacheFromUrl&gt; och&lt;cacheMaxGB&gt;] (#cachefromurl) ). och den nya [&lt;nThreads&gt;] (#Nthreads) Minimera latensproblemet genom att parallellisera datahämtning på hög nivå.&lt;cacheFromUrl&gt; verkar fungera mycket bra för många scenarier. (Vi är inte säkra på hur fördelaktigt&lt;nThreads&gt; är utan ytterligare tester.) Vi medger att vi inte har gjort tidstest på en AWS-instans med en bra nätverksanslutning, men vi har framgångsrikt testat med olika fjärrURL-källor för filer. ochERDDAP"S&lt;cacheFromUrl&gt; fungerar med någon typ av datafil (t.ex.,.nc,.hdf.csv,.jsonlCSV) Även om externt komprimerad (t.ex.,.gz) utan ändringar i filerna (Till exempel, skriva om dem som Zarr samlingar) .

Det är troligt att olika scenarier kommer att gynna olika lösningar, t.ex. behöver du bara läsa en del av en fil en gång. (Zarr vinner) vs. måste läsa alla en fil en gång, vs. måste läsa en del eller alla en fil upprepade gånger.&lt;cacheFromUrl &gt; vinner).

För det mesta säger vi: innan vi rusar för att försöka lagra alla våra data i Zarr, låt oss göra några tester för att se om det faktiskt är en bättre lösning.

- - - - -
## Lista över Typer Datasets{#list-of-types-datasets} 
Om du behöver hjälp med att välja rätt dataset typ, se[Välja Dataset Type](#choosing-the-dataset-type).

De typer av dataset faller i två kategorier. ([Varför?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)dataset hanterar ruttna data.
    * InomEDDGriddatamängder, datavariabler är multidimensionella datamängder.
    * Det måste finnas en axelvariabel för varje dimension. Axis variabler måste anges i den ordning som datavariablerna använder dem.
    * InomEDDGriddataset, alla datavariabler MÅSTE använda (aktie) alla axelvariabler.
         ([Varför?](#why-just-two-basic-data-structures) [Tänk om de inte gör det?](#dimensions)) 
    * Sorterade dimensionsvärden - I alltEDDGriddatamängder, varje dimension måste vara i sorterad ordning (Uppstigning eller nedstigning) . Var och en kan vara oregelbundet placerad. Det kan inte finnas några band. Detta är ett krav på[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Om någon dimensions värderingar inte är i sorterad ordning kommer datamängden inte att laddas ochERDDAP™identifiera det första osorterade värdet i loggfilen, *bigParentDirectory* /logs/log.txt.
        
Några underklasser har ytterligare begränsningar (särskiltEDDGridAggregateExistingDimension kräver att den yttersta (vänstra, första) dimensionen stiger upp.
        
Osorterade dimensionsvärden indikerar nästan alltid ett problem med källdatamängden. Detta sker oftast när en felaktig eller olämplig fil ingår i aggregeringen, vilket leder till en osorterad tidsdimension. För att lösa detta problem, se felmeddelandet iERDDAP™log.txt-fil för att hitta det kränkande tidsvärdet. Titta sedan i källfilerna för att hitta motsvarande fil (eller en före eller en efter) Det hör inte hemma i aggregeringen.
        
    * Se mer fullständig beskrivning av[EDDGridDatamodell](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    * ochEDDGridDatasettyper är:
        *   [EDDGridFrån AudioFiles](#eddfromaudiofiles)aggregerar data från en grupp lokala ljudfiler.
        *   [EDDGridFrånDap](#eddgridfromdap)hanterar ruttna data frånDAPservrar.
        *   [EDDGridFrånEDDTable](#eddgridfromeddtable)låter dig konvertera en tabular dataset till en gridded dataset.
        *   [EDDGridFrånErddap](#eddfromerddap)hanterar ruttna data från en fjärrkontrollERDDAP.
        *   [EDDGridFrånEtopo](#eddgridfrometopo)hanterar bara inbyggda ETOPO topografi data.
        *   [EDDGridFrånFiles](#eddgridfromfiles)är superklassen av allaEDDGridFrån...Files klasser.
        *   [EDDGridFrånMergeIRFiles](#eddgridfrommergeirfiles)aggregerar data från en grupp lokala MergeIR.gzfiler.
        *   [EDDGridFrånNcFiles](#eddgridfromncfiles)aggregerar data från en grupp lokalaNetCDF  (v3 eller v4)  .ncoch relaterade filer.
        *   [EDDGridFrånNcFilesUnpacked](#eddgridfromncfilesunpacked)är en variant omEDDGridFromNcFiles som också samlar in data från en grupp lokalaNetCDF  (v3 eller v4)  .ncoch relaterade filer, somERDDAP™packar på låg nivå.
        *   [EDDGridLonPM180](#eddgridlonpm180)modifierar barnets longitudvärdenEDDGridså att de är i intervallet -180 till 180.
        *   [EDDGridLon0360](#eddgridlon0360)modifierar barnets longitudvärdenEDDGridså att de är i intervallet 0 till 360.
        *   [EDDGridSideBySide](#eddgridsidebyside)aggregat två eller fleraEDDGriddataset sida vid sida.
        *   [EDDGridAggregateExistingDimension](#eddgridaggregateexistingdimension)aggregat två eller fleraEDDGriddatamängder, som var och en har olika värden för den första dimensionen, men identiska värden för de andra dimensionerna.
        *   [EDDGridKopiera](#eddgridcopy)kan göra en lokal kopia av en annanEDDGrid"S data och serverar data från den lokala kopian.
             
    * Allt alltEDDGriddatamängder stöder en nThreads-inställning, som berättarERDDAP™Hur många trådar att använda när du svarar på en begäran. Se[nThreads](#nthreads)dokumentation för detaljer.
         
### EDDTable{#eddtable} 
*   [ **EDDTable** ](#eddtable)dataset hanterar tabular data.
    * Tabular data kan representeras som en databasliknande tabell med rader och kolumner. Varje kolumn (en datavariabel) har ett namn, en uppsättning attribut och lagrar bara en typ av data. Varje rad har en observation (eller grupp av relaterade värden) . Datakällan kan ha data i en annan datastruktur, en mer komplicerad datastruktur och / eller flera datafiler, menERDDAP™måste kunna platta källdata i en databasliknande tabell för att presentera data som en tabell datamängd för användare avERDDAP.
    * Se mer fullständig beskrivning av[EDDTable datamodell](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    * EDDTable dataset typer är:
        *   [EDDTableFromAllDatasets](#eddtablefromalldatasets)är en högre dataset som har information om alla andra dataset i dinERDDAP.
        *   [EDDTableFromAsciiFiles](#eddtablefromasciifiles)aggregerar data från komma-, flik-, semicolon- eller rymdseparerade tabell ASCII-datafiler.
        *   [EDDTableFromAsciiService](#eddtablefromasciiservice)är superklassen av alla EDDTableFromAsciiService... klasser.
        *   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)hanterar data från några avNOAANOS webbtjänster.
        *   [EDDTableFromAudioFiles](#eddfromaudiofiles)aggregerar data från en grupp lokala ljudfiler.
        *   [EDDTableFrån AwsXmlFiles](#eddtablefromawsxmlfiles)samlar in data från en uppsättning automatiska väderstationer (AWS) XML filer.
        *   [EDDTableFromCassandra](#eddtablefromcassandra)hanterar tabelldata från ett Cassandra-bord.
        *   [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)aggregerar data från tabular ASCII-datafiler med fasta datakolumner.
        *   [EDDTableFromDapSequence](#eddtablefromdapsequence)hanterar tabular data frånDAPsekvensservrar.
        *   [EDDTableFromDatabase](#eddtablefromdatabase)hanterar tabelldata från en databastabell.
        *   [EDDTableFrånEDDGrid](#eddtablefromeddgrid)låter dig skapa en EDDTable dataset från enEDDGriddataset.
        *   [EDDTableFromErddap](#eddfromerddap)hanterar tabular data från en fjärrERDDAP.
        *   [EDDTableFromFileNames](#eddtablefromfilenames)skapar en dataset från information om en grupp filer i serverns filsystem, men det tjänar inte data inifrån filerna.
        *   [EDDTableFromFiles](#eddtablefromfiles)är superklassen av alla EDDTableFrån...Files klasser.
        *   [EDDTableFromHttpGet](#eddtablefromhttpget)är attERDDAPEndast system för dataimport samt dataexport.
        *   [EDDTableFrånHyraxFiler](#eddtablefromhyraxfiles)  (Begränsad) aggregerar data från filer med flera variabler med delade dimensioner som serveras av en[Hyrax OPeNDAPServer server](https://www.opendap.org/software/hyrax-data-server).
        *   [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles)aggregerar data frånNetCDF  (v3 eller v4)  .ncfiler som använder en specifik, ogiltig, variant av CF DSG Contiguous Ragged Array (CRA) filer. Även omERDDAP™stöder denna filtyp, det är en ogiltig filtyp som ingen ska börja använda. Grupper som för närvarande använder denna filtyp uppmuntras starkt att användaERDDAP™för att generera giltiga CF DSG CRA-filer och sluta använda dessa filer.
        *   [EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles)aggregerar data från[JSON Lines CSV-filer](https://jsonlines.org/examples/).
        *   [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)aggregerar data frånNetCDF  (v3 eller v4)  .ncfiler med flera variabler med delade dimensioner.
        *   [EDDTableFromNcFiles](#eddtablefromncfiles)aggregerar data frånNetCDF  (v3 eller v4)  .ncfiler med flera variabler med delade dimensioner. Det är bra att fortsätta använda denna datasettyp för befintliga dataset, men för nya dataset rekommenderar vi att du använder EDDTableFromMultidimNcFiles istället.
        *   [EDDTableFromNcCFFiles](#eddtablefromnccffiles)aggregerar data frånNetCDF  (v3 eller v4)  .ncfiler som använder ett av de filformat som anges av[CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konventioner. Men för filer som använder en av de multidimensionella CF DSG-varianterna, använd[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)I stället.
        *   [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles)aggregerar data från[NCCSV](/docs/user/nccsv-1.00)ASCII .csv filer.
        *   [EDDTableFromNOS](#eddtablefromnos)  (Begränsad) hanterar tabelldata från NOS XML-servrar.
        *   [EDDTableFromOBIS](#eddtablefromobis)hanterar tabelldata från OBIS-servrar.
        *   [EDDTableFromParquetFiles](#eddtablefromparquetfiles)hanterar data från[Parquet](https://parquet.apache.org/).
        *   [EDDTableFrånSOS](#eddtablefromsos)hanterar tabular data frånSOSservrar.
        *   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)  (Begränsad) aggregerar data från filer med flera variabler med delade dimensioner som serveras av en[TröjorOPeNDAPServer server](https://www.unidata.ucar.edu/software/tds/).
        *   [EDDTableFrånWFSFiler](#eddtablefromwfsfiles)  (Begränsad) gör en lokal kopia av alla data från enArcGISMapServerWFSserver så att data sedan kan sparas snabbt tillERDDAP™användare.
        *   [EDDTableAggregateRows](#eddtableaggregaterows)kan göra en EDDTable dataset från en grupp EDDTable dataset.
        *   [EDDTableCopy](#eddtablecopy)kan göra en lokal kopia av många typer av EDDTable dataset och sedan spara data snabbt från den lokala kopian.

  
- - - - -

## Detaljerade beskrivningar av datasettyper{#detailed-descriptions-of-dataset-types} 

### EDDGridFrånDap{#eddgridfromdap} 
[ **EDDGridFrånDap** ](#eddgridfromdap)hanterar nätvariabler från[DAP](https://www.opendap.org/)servrar.

* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan samla in den information du behöver för att justera den eller skapa din egen XML för enEDDGridFromDap dataset genom att titta på källdatasetets DDS- och DAS-filer i din webbläsare (genom att lägga till .das och .dds tillsourceUrltill exempel,[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) .
     
*   EDDGridFromDap kan få data från alla multidimensionella variabler från enDAPdataserver. (Tidigare,EDDGridFromDap var begränsad till variabler som utsetts som "grid" s, men det är inte längre ett krav.)   
     
* Sorterade dimensionsvärden - Värdena för varje dimension måste vara i sorterad ordning (Uppstigning eller nedstigning) . Värdena kan vara oregelbundet placerade. Det kan inte finnas några band. Detta är ett krav på[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Om någon dimensions värderingar inte är i sorterad ordning kommer datamängden inte att laddas ochERDDAP™identifiera det första osorterade värdet i loggfilen, *bigParentDirectory* /logs/log.txt.
    
Osorterade dimensionsvärden indikerar nästan alltid ett problem med källdatamängden. Detta sker oftast när en felaktig eller olämplig fil ingår i aggregeringen, vilket leder till en osorterad tidsdimension. För att lösa detta problem, se felmeddelandet iERDDAP™log.txt-fil för att hitta det kränkande tidsvärdet. Titta sedan i källfilerna för att hitta motsvarande fil (eller en före eller en efter) Det hör inte hemma i aggregeringen.
    
#### EDDGridFrånDap skeleton XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
### EDDGridFrånEDDTable{#eddgridfromeddtable} 
[ **EDDGridFrånEDDTable** ](#eddgridfromeddtable)låter dig konvertera en EDDTable tabular dataset till enEDDGridgridded dataset. Kom ihåg attERDDAP™behandlar dataset som antingen[gridded datasets (underklasser avEDDGrid) eller tabular dataset (underklasser av EDDTable) ](#why-just-two-basic-data-structures).

* Normalt, om du har ruttna data, du bara ställa in enEDDGriddataset direkt. Ibland är det inte möjligt, till exempel när du har data som lagras i en relationsdatabas somERDDAP™kan endast komma åt via EDDTableFromDatabase.EDDGridFrånEDDTable-klassen låter dig åtgärda den situationen.
     
* Uppenbarligen måste data i den underliggande EDDTable datamängden vara (i grunden) ruttna data, men i en tabellform. Till exempel kan EDDTable datamängden ha CTD-data: mätningar av österut och norrutström, vid flera djup, vid flera tillfällen. Eftersom djupet är detsamma vid varje tidpunkt,EDDGridFromEDDTable kan skapa en rutnäterad dataset med en tid och en djupdimension som åtkomst till data via den underliggande EDDTable dataset.
     
* GenerateDatasets Xml - Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan samla in den information du behöver för att förbättra det grova utkastet.
     
* Källa Attributes - Som med alla andra typer av dataset,EDDGridFromTable har idén att det finns globala källor[Globalt globalt globalt globaltaddAttributes](#global-attributes)  (specificeras idatasets.xml) , som kombineras för att göra det globala kombinerat Attribut, som är vad användarna ser. För globala källorAttributes,EDDGridFromEDDTable använder den globala kombinerade Innehåller de underliggande EDDTable dataset. (Om du tänker på det i en minut är det meningsfullt.) 
    
På samma sätt, för varjeaxisVariables ochdataVariable"S[addAttributes](#addattributes),EDDGridFromEDDTable använder variabelns kombinerade Innehåll från den underliggande EDDTable dataset somEDDGridFrånEDDTable variabelns källaAttributes. (Om du tänker på det i en minut är det meningsfullt.) 
    
Som ett resultat, om EDDTable har bra metadata,EDDGridFrånEDDTable behöver ofta mycket liteaddAttributesmetadata - bara några tweaks här och där.
    
*   dataVariables kontraaxisVariables -- Den underliggande EDDTable har endastdataVariables. EttEDDGridFromEDDTable dataset kommer att ha någraaxisVariables (från några av EDDTabledataVariables) och vissadataVariables (skapad av den återstående EDDTabledataVariables) .[GenerateDatasetsXml](#generatedatasetsxml)kommer att göra en gissning om vilken EDDTabledataVariables bör bliEDDGridFrånEDDTableaxisVariableMen det är bara en gissning. Du måste ändra utgången av GenerateDatasetsXml för att ange vilkadataVariablekommer att bliaxisVariableoch i vilken ordning.
     
* axisValues - Det finns inget om den underliggande EDDTable att berättaEDDGridFrånEDDTable de möjliga värdena föraxisVariables i den ruttna versionen av datamängden, så du måste ange den informationen för varjeaxisVariablevia en av dessa attribut:
    
    * axisValues - låter dig ange en lista över värden. Till exempel,
        &lt;Namn = "axisValues"[Typ = "doubleList"](#attributetype)2, 2.5, 3, 3,5, 4&lt;/att&gt;
Notera användningen av en[Datatyp](#data-types)plus ordet List. Också typen av lista (Till exempel dubbel) MÅSTE matcha data Typ av variabeln i EDDTable ochEDDGridFrånEDDTable dataset.
    * axisValuesStartStrideStop - låter dig ange en sekvens av regelbundet fördelade värden genom att ange start, steg och stoppa värden. Här är ett exempel som motsvarar axisValues-exemplet ovan:
        &lt;Namn = "axisValuesStartStrideStop"[Typ = "doubleList"](#attributetype)2, 0,5, 4&lt;/att&gt;
Återigen notera användningen av en lista datatyp. Också typen av lista (Till exempel dubbel) MÅSTE matcha data Typ av variabeln i EDDTable ochEDDGridFrånEDDTable dataset.
         
    
Uppdateringar - Precis som det inte finns något sätt förEDDGridFrånEDDTable för att bestämma axisValues från EDDTable initialt finns det inte heller något tillförlitligt sätt förEDDGridFrånEDDTable för att avgöra från EDDTable när axisValues har ändrats (när det finns nya värden för tidsvariabeln) . För närvarande är den enda lösningen att ändra attributet axisValues idatasets.xmloch ladda om dataset. Du kan till exempel skriva ett manus till
    
    1. Sök efter Sökdatasets.xmlFör
        datasetID=" *TheDatasetID* "
Så du arbetar med rätt dataset.
    2. Sök efter Sökdatasets.xmlför nästa händelse
        <sourceName> *TheVariablesSourceName* </sourceName>  
Så du arbetar med rätt variabel.
    3. Sök efter Sökdatasets.xmlför nästa händelse
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
Så du vet startpositionen för taggen.
    4. Sök efter Sökdatasets.xmlför nästa händelse
```
        </att>  
```
Så du vet axelvärdets slutposition.
    5. Byt ut den gamla starten, steg, stoppa värden med de nya värdena.
    6. Kontakta oss[Flagga URL](/docs/server-admin/additional-information#set-dataset-flag)för dataset att berättaERDDAP™för att ladda om dataset.
    
Detta är inte idealiskt, men det fungerar.
     
* precision - När närEDDGridFromEDDTable svarar på en användares begäran om data, det flyttar en rad data från EDDTable svar tabellen iEDDGridsvarsnät. För att göra detta måste det räkna ut om "axeln" värden på en viss rad i tabellen matchar en kombination av axelvärden i nätet. För datatyper är det lätt att avgöra om två värden är lika. Men för flottor och dubblar, ger detta upp det hemska problemet med flytande punktnummer[Inte matcha exakt](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (till exempel 0.2 mot 0.1999999999996) . för att (försök att) hantera detta,EDDGridFromTable kan du ange en precisionsattribut för någon avaxisVariables, som specificerar det totala antalet decimala siffror som måste vara identiska.
    * Till exempel,&lt;att namn="precision" typ="int"&gt;5&lt;/att&gt;
    * För olika typer av datavariabler finns det olika standard precisionsvärden. Standarderna är vanligtvis lämpliga. Om de inte är det måste du ange olika värden.
    * FöraxisVariableS som är[tid eller tid Stamp variabler](#timestamp-variables)Standarden är full precision (en exakt match) .
    * FöraxisVariables som är flyter, standard precision är 5.
    * FöraxisVariables som är dubbel, standard precision är 9.
    * FöraxisVariables som har integer datatyper,EDDGridFromEDDTable ignorerar precisionsattributet och använder alltid full precision (en exakt match) .
         
    *    **VARNING&#33;** När du gör omvandlingen av en bit tabelldata till en bit av ruttna data, omEDDGridFromEDDTable kan inte matcha ett EDDTable "axel" -värde till ett av de förväntadeEDDGridFrånEDDTable axelvärden,EDDGridFrånEDDTable tyst (Inget fel) kastar bort data från tabellens rad. Det kan till exempel finnas andra data (Inte på nätet) i EDDTable dataset. (Och om steg &gt; 1, det är inte uppenbart attEDDGridFrånbord vilka axelvärden är önskade värden och vilka som är de som ska hoppas på grund av steget.) Så om precisionsvärdena är för höga kommer användaren att se saknade värden i dataresponsen när giltiga datavärden faktiskt existerar.
        
Omvänt, om precisionsvärdena är för låga, bör EDDTable "axel"-värden som inte bör matchaEDDGridFrånEDDTable axelvärden kommer (felaktigt) match.
        
Dessa potentiella problem är hemska, eftersom användaren får fel data (eller saknade värden) när de ska få rätt data (eller åtminstone ett felmeddelande) .
Detta är inte en brist iEDDGridFrånbord.EDDGridFromTable kan inte lösa detta problem. Problemet är inneboende i omvandlingen av tabelldata till ruttna data (om inte andra antaganden kan göras, men de kan inte göras här) .
Det är upp till dig,ERDDAP™administratör, att **Testa dittEDDGridFrånEDDTable noggrant** säkerställa att precisionsvärdena är inställda på att undvika dessa potentiella problem.
        
#### GapThreshold{#gapthreshold} 
*   [GapThreshold](#gapthreshold)----- Detta är en mycket ovanlig typ av dataset. Eftersom de typer av frågor som kan göras för att (hanteras av) enEDDGridDataset (relaterad till intervall och steg avaxisVariables) skiljer sig mycket från de typer av frågor som kan göras för att (hanteras av) En EDDTable dataset (bara relaterad till intervallen av vissa variabler) , prestanda förEDDGridFrånEDDTable datamängder varierar kraftigt beroende på den exakta begäran som görs och hastigheten på den underliggande EDDTable datamängden. För förfrågningar som har ett stegvärde &gt; 1, 1, 1, 1,EDDGridFromEDDTable kan be den underliggande EDDTable för en relativt stor del av data (som om steg=1) och sedan sikta igenom resultaten, hålla data från några rader och kasta bort data från andra. Om det måste sikta igenom en hel del data för att få de data den behöver, kommer begäran att ta längre tid att fylla.
    
OmEDDGridFromEDDTable kan berätta att det kommer att finnas stora luckor (med rader av oönskade data) mellan raderna med önskad data,EDDGridFromEDDTable kan välja att göra flera underförfrågningar till den underliggande EDDTable i stället för en stor förfrågan och därigenom hoppa över de oönskade raderna av data i de stora luckorna. Känsligheten för detta beslut styrs av gapThreshold-värdet enligt vad som anges i&lt;gapThreshold&gt; tagga (standard=1000 rader källdata) . Inställning av gapThreshold till ett mindre antal kommer att leda till att dataset gör (i allmänhet) fler subrequests. Inställning av gapThreshold till ett större antal kommer att leda till att dataset gör (i allmänhet) färre subrequests.
    
Om gapThreshold är för liten,EDDGridFromEDDTable kommer att fungera långsammare eftersom överhuvudet av flera förfrågningar kommer att vara större än den tid som sparas genom att få lite överskottsdata. Om gapThreshold är för stort,EDDGridFromEDDTable kommer att fungera långsammare eftersom så mycket överskottsdata kommer att hämtas från EDDTable, bara för att kasseras. (Som Goldilocks upptäckt, är mitten "bara rätt".) Överhuvudet för olika typer av EDDTable datamängder varierar kraftigt, så det enda sättet att veta den faktiska bästa inställningen för din datamängd är genom experiment. Men du kommer inte att gå för långt fel att hålla fast vid standarden.
    
Ett enkelt exempel är: Tänk dig enEDDGridFrånbord med bara enaxisVariable  (Tid, med en storlek på 100000) EndataVariable  (temperaturen) , och standard gapThreshold av 1000.
    
    * Om en användare begär temperatur\\[0&#58;100&#58;5000\\]Klivet är 100 så klyftan är 99, vilket är mindre än gapThreshold. SåEDDGridFromTable kommer att göra bara en begäran till EDDTable för alla data som behövs för begäran. (motsvarande temperatur\\[0:5000\\]) Och kasta bort alla rader av data det inte behöver.
    * Om en användare begär temperatur\\[0:2500:5000\\]Det steget är 2500 så klyftan är 2499, vilket är större än gapThreshold. SåEDDGridFromTable kommer att göra separata förfrågningar till EDDTable som motsvarar temperatur\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]temperatur\\[2500\\]temperatur\\[5000\\].
    
Beräkning av gapstorleken är mer komplicerad när det finns flera axlar.
    
För varje användares begäran,EDDGridFrånEDDTable prints diagnostiska meddelanden relaterade till detta i[Log.txt](/docs/server-admin/additional-information#log)fil.
    
    * Om [Om]&lt;LogLevel&gt;] (#loglevel) in idatasets.xmlär inställd på info, detta trycker ett meddelande som
\\* nOuterAxes=1 av 4 nOuterRequests=22
Om nOuterAxes=0 överskreds inte gapThreshold och endast en begäran kommer att göras till EDDTable.
Om nOuterAxes&gt;0 överskreds gapThreshold och nOuterRequests kommer att göras till EDDTable, motsvarande varje efterfrågad kombination av de vänstraste nOuterAxes. Till exempel, om datamängden har 4axisVariables ochdataVariableSom österut\\[Tid\\]\\[Latitud\\]\\[Längd\\]\\[Djup\\]vänster (Först först) Axelvariabel är tid.
    * Om&lt;LogLevel&gt; in idatasets.xmlär inställd på allt, ytterligare information skrivs till log.txt-filen.
         
#### EDDGridFrånEDDTable skelett XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD* frånERDDAP {#eddfromerddap} 
 **EDDGridFrånErddap** hanterar ruttna data från en fjärrkontrollERDDAP™Server.
 **EDDTableFromErddap** hanterar tabular data från en fjärrERDDAP™Server.

*   EDDGridFromErddap och EDDTableFromErddap beter sig annorlunda än alla andra typer av datamängder iERDDAP.
    * Liksom andra typer av datamängder får dessa datamängder information om datamängden från källan och håller den i minnet.
    * som andra typer av datamängder, närERDDAP™Sökningar efter datamängder, visar Formen Data Access ( *datasetID* .html) eller visar formuläret Make A Graph ( *datasetID* .graph) ,ERDDAP™använder informationen om dataset som är i minnet.
    *   EDDGridFromErddap och EDDTable FromErddap är grunden för[nät/kluster/federationer](/docs/server-admin/scaling)avERDDAPs, som effektivt distribuerar CPU-användningen (mestadels för att göra kartor) minnesanvändning, datasetlagring och bandbreddsanvändning av ett stort datacenter.
#### Omdirigera{#redirect} 
* Till skillnad från andra typer av datamängder, närERDDAP™får en begäran om data eller bilder från dessa datamängder,ERDDAP [omdirigeringar](https://en.wikipedia.org/wiki/URL_redirection)begäran till fjärrkontrollenERDDAP™Server. Resultatet är:
    * Detta är mycket effektivt (CPU, minne och bandbredd) för annars
        1. KompositörERDDAP™måste skicka begäran till den andraERDDAP™  (som tar tid) .
        2. Den andraERDDAP™måste få data, reformera den och överföra data till kompositenERDDAP.
        3. KompositörERDDAP™måste ta emot data (med bandbredd) Reformatera den (Använd CPU och minne) och överföra data till användaren (med bandbredd) . Genom att omdirigera begäran och tillåta den andraERDDAP™att skicka svaret direkt till användaren, kompositenERDDAP™spenderar i huvudsak ingen CPU-tid, minne eller bandbredd på begäran.
    * Omdirigeringen är transparent för användaren oavsett kundens programvara (en webbläsare eller annan programvara eller kommandorad verktyg) .
*   [Du kan berättaERDDAP™](#redirect)inte omdirigera några användarförfrågningar genom att ange&lt;omdirigering &gt; falskt&lt;/ omdirigera&gt;, men detta negerar de flesta fördelarna med ...Från Erddap dataset typ (I synnerhet sprider belastningen på framsidanERDDAP™till fjärr-/backendERDDAP) .
         
     
#### Prenumerationer{#subscriptions} 
Normalt när enEDDGridFromErddap och EDDTable FromErddap är (Retur) laddad på dinERDDAP, de försöker lägga till en prenumeration på fjärrdataset via fjärrkontrollenERDDAPe-postadress/URL-abonnemangssystem. På så sätt, när fjärrdataset ändras, fjärrkontrollenERDDAP™kontakter[setDataset Flagga URL](/docs/server-admin/additional-information#set-dataset-flag)på dinERDDAP™så att den lokala datamängden laddas om ASAP och så att den lokala datamängden alltid är helt uppdaterad och efterliknar fjärrdatamängden. Så första gången detta händer bör du få ett e-postmeddelande som begär att du validerar prenumerationen. Men om lokalenERDDAP™kan inte skicka ett e-postmeddelande eller om fjärrkontrollenERDDAPe-post / URL-abonnemangssystem är inte aktivt, du bör maila fjärrkontrollenERDDAP™administratör och begär att han manuellt lägger till [&lt;OnChange (#Ochange) ......&lt;/onChange&gt; taggar till alla relevanta datamängder för att ringa datamängdens[setDataset Flagga webbadresser](/docs/server-admin/additional-information#set-dataset-flag). Se dinERDDAP™Daglig rapport för en lista över setDataset Flagga webbadresser, men skicka bara de förEDDGridFromErddap och EDDTableFromErddap dataset till fjärrkontrollenERDDAP™administratör.
    
Fungerar det inte? Är dina lokala datamängder inte i synkroniserad med fjärrdatamängderna?
Flera saker måste alla fungera korrekt för att detta system ska fungera så att dina datamängder håller sig uppdaterade. Kontrollera var och en av dessa saker i ordning:
    
    1. Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Din Din Dina Dina Dina Dina Dina Dina Dina Dina Dina Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din DinERDDAP™måste kunna skicka ut e-post. Se e-postinställningarna i din setup.xml.
    2. I allmänhet (Men inte alltid) , dinERDDAP"S&lt;baseUrl&gt; och&lt;baseHttpsUrl &gt; behöver inte ha ett portnummer (t.ex. :8080, :8443) . Om de gör det, använd en[Proxypass](/docs/server-admin/deploy-install#proxypass)för att avlägsna hamnen från Url.
    3. I din setup.xml,&lt;PrenumereraToRemoteErddapDataset&gt; måste vara sant.
    4. När din lokala EDD... FromErddap dataset laddas om, det bör skicka en begäran till fjärrkontrollenERDDAP™att prenumerera på fjärrdataset. Titta i log.txt för att se om det händer.
    5. Du bör få ett e-postmeddelande som ber dig att validera prenumerationsförfrågan.
    6. Du måste klicka på länken i det e-postmeddelandet för att validera prenumerationsförfrågan.
    7. FjärrkontrollenERDDAP™bör säga att valideringen var framgångsrik. När som helst kan du begära ett e-postmeddelande från fjärrkontrollenERDDAP™med en lista över dina väntande och giltiga prenumerationer. Se formuläret på *avlägsnaErddapBase Url* /erddap/subscriptions/list.html.
    8. När fjärrdataset ändras (t.ex. får ytterligare data) FjärrkontrollenERDDAP™bör försöka kontakta flagurl på dinERDDAP. Du kan inte kontrollera detta, men du kan fråga administratören av fjärrkontrollenERDDAP™för att kontrollera detta.
    9. Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Din Din Dina Dina Dina Dina Dina Dina Dina Dina Dina Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din DinERDDAP™bör få en begäran om att ange flaggURL. Titta i din log.txt för "setDatasetFlag.txt?" (s) och se om det finns ett felmeddelande i samband med förfrågningarna.
    10. Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Din Din Dina Dina Dina Dina Dina Dina Dina Dina Dina Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din DinERDDAP™bör sedan försöka ladda om datasetet (Kanske inte omedelbart, men ASAP) .
         
#### Upp-to-date max (Tid) ??{#up-to-date-maxtime} 
EDDGrid/TableFromErddap dataset ändrar bara deras lagrade information om varje källdataset när källdatasetet är["Reload"](#reloadeverynminutes)och en del metadataförändringar (t.ex. tidsvariabelnsactual\\_range) och därigenom skapa en abonnemangsanmälan. Om källdatamängden har data som ändras ofta (Till exempel nya data varje sekund) och använder["Uppdatering"](#updateeverynmillis)system för att märka frekventa ändringar av de underliggande uppgifterna,EDDGrid/TableFromErddap kommer inte att meddelas om dessa frekventa ändringar tills nästa dataset "reload", såEDDGrid/TableFromErddap kommer inte att vara helt uppdaterad. Du kan minimera detta problem genom att ändra källdatasättets&lt;ReloadEveryNMinutes &gt; till ett mindre värde (60? 15?) så att det finns fler abonnemangsmeddelanden för att berätta förEDDGrid/TableFromErddap för att uppdatera sin information om källdatamängden.

Eller om ditt datahanteringssystem vet när källdatamängden har nya data (t.ex. via ett skript som kopierar en datafil på plats) Och om det inte är super frekvent (t.ex. var 5:e minut eller mindre frekvent) Det finns en bättre lösning:

1. Använd inte&lt;updateEveryNMillis&gt; för att hålla källdatauppsättningen uppdaterad.
2. Ställ in källdatasetets&lt;ReloadEveryNMinutes &gt; till ett större antal (1440?) .
3. Har manuset kontakta källdatasetets[Flagga URL](/docs/server-admin/additional-information#set-dataset-flag)strax efter det kopierar en ny datafil på plats.
     

Det kommer att leda till att källdatamängden är helt uppdaterad och orsakar att den genererar en abonnemangsmeddelande, som kommer att skickas till källdatamängden.EDDGrid/TableFromErddap dataset. Detta lederEDDGrid/TableFromErddap dataset för att vara helt uppdaterad (inom 5 sekunder efter att nya data läggs till) . Allt som kommer att göras effektivt (utan onödiga datamängder) .
     
#### IngenaddAttributes,axisVariableellerdataVariable {#no-addattributes-axisvariable-or-datavariable} 
Till skillnad från andra typer av datamängder, EDDTableFromErddap ochEDDGridFromErddap-dataset tillåter inte globalt&lt;addAttributes&gt;,&lt;axisVariableoch gt; eller&lt;dataVariable&gt; sektioner idatasets.xmlför denna dataset. Problemet är att låta dem leda till inkonsekvenser:
    
1. Låt oss säga att det var tillåtet och du lade till ett nytt globalt attribut.
2. När en användare frågar dinERDDAP™För de globala attributen kommer det nya attributet att visas.
3. När en användare frågar dinERDDAP™för en datafil, dinERDDAP™omdirigerar begäran till källanERDDAP. DettaERDDAP™är omedvetna om det nya attributet. Så om det skapar en datafil med metadata, t.ex. en.ncfil, metadata kommer inte att ha den nya attribut.

Det finns två work-arounds:

1. Övertyga källans adminERDDAP™För att göra de ändringar som du vill metadata.
2. Istället för EDDTableFromErddap, använd[EDDTableFromDapSequence](#eddtablefromdapsequence). Eller istället förEDDGridFrånErddap, använd[EDDGridFrånDap](#eddgridfromdap). Dessa EDD-typer låter dig ansluta effektivt till en dataset på en fjärrkontrollERDDAP™  (men utan att omdirigera dataförfrågningar) Och de låter dig inkludera globalt&lt;addAttributes&gt;,&lt;axisVariableoch gt; eller&lt;dataVariable&gt; sektioner idatasets.xml. En annan skillnad: du måste manuellt prenumerera på fjärrdatamängden, så att datamängden på dinERDDAP™kommer att meddelas (via[Flagga URL](/docs/server-admin/additional-information#set-dataset-flag)) När det finns ändringar i fjärrdatasetet. Således skapar du en ny dataset istället för att länka till en fjärrdataset.
         
#### Andra anteckningar{#other-notes} 
* Av säkerhetsskäl,EDDGridFromErddap och EDDTable Från Erddap stöder inte [[&lt;tillgänglig för&gt;] (#accessibleto) tagga och kan inte användas med fjärrdata som kräver inloggning (eftersom de använder&lt;tillgänglig för&gt;] (#accessibleto) ). SeERDDAP"S[Säkerhetssystem](/docs/server-admin/additional-information#security)för att begränsa åtkomsten till vissa datamängder till vissa användare.
     
* Börja medERDDAP™v2.10,EDDGridFromErddap och EDDTableFromErddap stöder [&lt;tillgängligaViaFiles&gt;] (#accessibleviafiles) tag. Till skillnad från andra typer av datamängder är standarden sant, men datamängdens filer kommer endast att vara tillgängligaViaFiles om källdatamängden också har&lt;tillgängligaViaFiles&gt; som är sanna.
     
* Du kan använda[GenerateDatasets Xml program](#generatedatasetsxml)att göradatasets.xmlchunk för denna typ av dataset. Men du kan göra dessa typer av datamängder lätt för hand.
     
#### EDDGridFrånErddap skelett XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGridFrånErddap skelett XML dataset är mycket enkelt, eftersom avsikten bara är att efterlikna fjärrdataset som redan är lämplig för användning iERDDAPFrån:
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableFromErddap skelett XML{#eddtablefromerddap-skeleton-xml} 
* Skelettet XML för en EDDTableFromErddap dataset är mycket enkelt, eftersom avsikten bara är att efterlikna fjärrdataset, som redan är lämplig för användning iERDDAPFrån:
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridFrånEtopo{#eddgridfrometopo} 
[ **EDDGridFrånEtopo** ](#eddgridfrometopo)Bara tjänar[ETOPO1 Global 1-minuters Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Ice Surface, grid registrerad, binär, 2byte int: etopo1\\_ice\\_g\\_i2.zip) som delas ut medERDDAP.

* Endast tvådatasetIDstöds förEDDGridFrånEtopo, så att du kan komma åt data med longitudvärden -180 till 180 eller longitudvärden 0 till 360.
* Det finns aldrig några deltaggar, eftersom data redan beskrivs iERDDAP.
* Så de två alternativ förEDDGridFromEtopo dataset är (bokstavligen) Från:
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridFrånFiles{#eddgridfromfiles} 
[ **EDDGridFrånFiles** ](#eddgridfromfiles)är superklassen av allaEDDGridFrån...Files klasser. Du kan inte användaEDDGridFrånFiles direkt. Använd istället en underklass avEDDGridFrånFiles för att hantera den specifika filtypen:

*   [EDDGridFrånMergeIRFiles](#eddgridfrommergeirfiles)hanterar data från gridded[MergeIR.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)filer.
*   [EDDGridFrån AudioFiles](#eddfromaudiofiles)aggregerar data från en grupp lokala ljudfiler.
*   [EDDGridFrånNcFiles](#eddgridfromncfiles)hanterar data från gridded[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)filer,[HDF  (v4 eller v5)  .hdf](https://www.hdfgroup.org/)filer,[.ncml](#ncml-files)filer och[NetCDF  (v3 eller v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)filer. Detta kan fungera med andra filtyper (Till exempel BUFR) Vi har bara inte testat det - skicka oss några provfiler om du är intresserad.
*   [EDDGridFrånNcFilesUnpacked](#eddgridfromncfilesunpacked)är en variant avEDDGridFromNcFiles som hanterar data från rutnätNetCDF  (v3 eller v4)  .ncoch relaterade filer, somERDDAP™packar på låg nivå.

För närvarande stöds inga andra filtyper. Men det är oftast relativt enkelt att lägga till stöd för andra filtyper. Kontakta oss om du har en förfrågan. Eller om dina data är i ett gammalt filformat som du vill flytta bort från rekommenderar vi att du konverterar filerna för att varaNetCDFv3.ncfiler.NetCDFär ett brett stöd, binärt format, tillåter snabb slumpmässig åtkomst till data, och stöds redan avERDDAP.

#### Från filer detaljer{#from-files-details} 
Följande information gäller alla underklasser avEDDGridFrånFiles.

##### Aggregering av en existerande dimension{#aggregation-of-an-existing-dimension} 
Alla variationer avEDDGridFromFiles kan samla data från lokala filer, där varje fil har 1 (eller mer) olika värden för vänster (Först först) dimension, vanligtvis\\[Tid\\]som kommer att aggregeras. Till exempel kan dimensionerna vara\\[Tid\\]\\[höjd\\]\\[Latitud\\]\\[Längd\\]och filerna kan ha data för en (eller några) Tidsvärde (s) per fil. Den resulterande datamängden visas som om alla filens data hade kombinerats. De stora fördelarna med aggregation är:

* Storleken på den aggregerade datauppsättningen kan vara mycket större än en enda fil kan vara bekvämt. (2GB) .
* För nästan realtidsdata är det lätt att lägga till en ny fil med den senaste biten av data. Du behöver inte skriva om hela datasetet.

Kraven på aggregering är:
* De lokala filerna behöver inte ha sammadataVariables (enligt definitionen i datasetetsdatasets.xml) . Datasetet kommer att hadataVariables definierade idatasets.xml. Om en viss fil inte har en givendataVariable,ERDDAP™kommer att lägga till saknade värden efter behov.
* AlladataVariableAnvända sammaaxisVariables/dimensioner (enligt definitionen i datasetetsdatasets.xml) . Filerna kommer att aggregeras baserat på den första (vänster-mest) dimension, sorterad i uppstigande ordning.
* Varje fil kan ha data för en eller flera värden av den första dimensionen, men det kan inte finnas någon överlappning mellan filer. Om en fil har mer än ett värde för den första dimensionen, måste värdena sorteras i stigande ordning, utan band.
* Alla filer måste ha exakt samma värden för alla andra dimensioner. Testets precision bestäms av[matchaxisNDigits](#matchaxisndigits).
* Alla filer måste ha exakt samma[enheter](#units)metadata för allaaxisVariables ochdataVariables. Om detta är ett problem kan du använda[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)för att åtgärda problemet.
         
##### Aggregering via filnamn eller global metadata{#aggregation-via-file-names-or-global-metadata} 
Alla variationer avEDDGridFromFiles kan också samla en grupp filer genom att lägga till en ny vänster (Först först) dimension, vanligtvis tid, baserat på ett värde som härrör från varje filnamn eller från värdet av ett globalt attribut som finns i varje fil. Till exempel kan filnamnet inkludera tidsvärdet för data i filen.ERDDAP™skulle då skapa en ny tidsdimension.

Till skillnad från liknande funktion i TREDDS,ERDDAP™Skapar alltid enaxisVariablemed numeriska värden (som krävs av CF) , aldrig stränga värden (som inte är tillåtna av CF) . också,ERDDAP™kommer att sortera filerna i aggregeringen baserat på den numeriskaaxisVariablevärde som tilldelas varje fil, så att axelvariabeln alltid har sorterade värden som krävs av CF. THREDDS-metoden att göra ett lexikografiskt slag baserat på filnamnen leder till aggregationer där axelvärdena inte sorteras (som inte är tillåtet av CF) när filnamnen sorteras annorlunda än de som härröraxisVariablevärden.

För att skapa en av dessa aggregationer iERDDAP™Du kommer att definiera en ny vänster (Först först)  [axisVariable](#axisvariable)med en speciell pseudo&lt;sourceName&gt;, som sägerERDDAP™var och hur man hittar värdet för den nya dimensionen från varje fil.

* Formatet för pseudosourceNamesom får värdet från ett filnamn (bara filename.ext) är att
    \\*\\*O *Filnamn,* [Datadata data Typ](#data-types) *,* ExtractRegex *,* fångaGroupNumber*
* Formatet för pseudosourceNamesom får värdet från en fils absoluta namn är
    \\*\\*O *Vägen,* [Datadata data Typ](#data-types) *,* ExtractRegex *,* fångaGroupNumber*
    \\[För detta använder sökvägsnamnet alltid'/'som katalogen separator karaktär, aldrig '\'.\\]
* Formatet för pseudosourceNamesom får värdet från ett globalt attribut är
    \\*\\*O *Global:* attribut Namnnamn *,* [Datadata data Typ](#data-types) *,* ExtractRegex *,* fångaGroupNumber*
* Denna pseudosourceNamealternativ fungerar annorlunda än de andra: istället för att skapa en ny vänster (Först först)  axisVariableDetta ersätter värdet av strömmenaxisVariablemed ett värde som extraheras från filnamnet (bara filename.ext) . Formatet är
    \\*\\*O *Ersätt ersättare FrånFileName,* [Datadata data Typ](#data-types) *,* ExtractRegex *,* fångaGroupNumber*
     

Beskrivningarna av de delar du behöver för att tillhandahålla är:

*    *attribut Namnnamn* - namnet på det globala attributet som finns i varje fil och som innehåller dimensionsvärdet.
*    *Datadata data Typ* ----- Detta specificerar datatypen som kommer att användas för att lagra värdena. Se standardlistan för[Datadata data Typer](#data-types)attERDDAP™stöd, förutom att strängen inte är tillåten här eftersom axelvariabler iERDDAP™Kan inte vara String variabler.
    
Det finns ytterligare pseudodataType, timeFormat= *Sträng TimeFormat* som sägerERDDAP™att värdet är en String TimeStamp[enheter som är lämpliga för strängtid](#string-time-units). I de flesta fall kommer stringTimeFormat du behöver vara en variant av ett av dessa format:
    
    *   yyyy-MM-dd"T'H:mm:ss.SSSZ - som ISO 8601:2004 (E E E E) datum tid format. Du kan behöva en förkortad version av detta, t.ex.yyyy-MM-ddH:mm:ss elleryyyy-MM-dd.
    * yyyyMMddHmmss.SSS - som är den kompakta versionen av ISO 8601-datumformatet. Du kan behöva en förkortad version av detta, t.ex. yyyyMMddHmmss eller yyyyMMdd.
    * M/d/yyy H:mm:ss.SSS - som är det amerikanska slash-datumformatet. Du kan behöva en förkortad version av detta, t.ex. M/d/yyyy.
    * yyyyDDDHmmssSSS - som är året plus nolldag på året (t.ex. 001 = Jan 1, 365 = Dec 31 i ett icke-skottår; detta kallas ibland felaktigt Julian datum) . Du kan behöva en förkortad version av detta, t.ex. yyyyDDD.
    
Om du använder denna pseudo dataType, lägg till detta till den nya variablen&lt;addAttributes&gt;::
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Om du vill flytta alla tidsvärden, ändra tidsvärdet i enheter, t.ex.
1970-01-01T12:00:00Z.
*    *ExtractRegex* ----- Detta är[regelbundet uttryck](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) som inkluderar en fångstgrupp (i parentes) som beskriver hur man extraherar värdet från filnamnet eller det globala attributvärdet. Till exempel, med ett filnamn som S19980011998031.L3b\\_MO\\_CHL.ncFånga grupp #1, "\\dTutoriali det vanliga uttrycket S (O\\dTutorial) O\\dTutorialL3b.* kommer att fånga de första 7 siffrorna efter "S": 1998001.
*    *fångaGroupNumber* ----- Detta är antalet fångar gruppen (inom ett par parenteser) i det ordinarie uttryck som innehåller information om intresse. Det är oftast 1 den första fångstgruppen. Ibland måste du använda fångstgrupper för andra ändamål i regex, så då blir det viktiga fångstgruppsnumret 2 (Den andra fångstgruppen) eller 3 (tredje) etc.

Ett fullständigt exempel på enaxisVariablesom gör en aggregerad dataset med en ny tidsaxel som får tidsvärdena från filnamnet för varje fil är
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
När du använder "timeFormat=" pseudodata Typ,ERDDAP™kommer att lägga till 2 attribut tillaxisVariableSå att de verkar komma från källan:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Så i detta fall,ERDDAP™Skapa en ny axel som heter"time"med dubbla värden (sekunder sedan 1970-01-01T00:00:00Z) genom att extrahera de 7 siffrorna efter "S" och före ".L3m" i filnamnet och tolka dem som tidsvärden formaterade som yyyyyDDD.

Du kan åsidosätta standardbastiden (1970-01-01T00:00:00Z) genom att lägga till en[addAttribute](#addattributes)som anger en annan enhet attribut med en annan bastid. En vanlig situation är: det finns grupper av datafiler, var och en med en 1 dags sammansatt av en satellitdatamängd, där du vill att tidsvärdet ska vara middag av den dag som nämns i filnamnet. (Den centrerade tiden för varje dag) och vill ha variabelnlong\\_nameAtt vara "Centered Time". Ett exempel som gör detta är:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Observera timmar = 12 under bastiden, vilket lägger till 12 timmar i förhållande till den ursprungliga bastiden på 1970-01-01T00:00:00Z.

Ett fullständigt exempel på enaxisVariablesom gör en aggregerad dataset med en ny "kör" axel (med int värden) som får löpvärdena från "runID" global attribut i varje fil (med värden som "r17\\_global", där 17 är löpnumret) är att
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Observera användningen av fångstgrupp nummer 2 för att fånga siffrorna som uppstår efter "r" eller "s", och före "_global". Detta exempel visar också hur man lägger till ytterligare attribut (t.ex.,ioos\\_categoryoch enheter) till axelvariabeln.
     
#### Externt komprimerade filer{#externally-compressed-files} 
* Dataset som är delmängder avEDDGridFromFiles och EDDTable FromFiles kan servera data direkt från externt komprimerade datafiler, inklusive.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, och .Z filer.
     
*    **Detta fungerar överraskande bra&#33;**   
I de flesta fall är avmattningen relaterad till att dekomprimera små och medelstora datafiler mindre. Om du behöver spara diskutrymme uppmuntrar vi starkt att använda den här funktionen, särskilt för äldre filer som sällan nås.
     
*    **Spara pengar&#33;**   
Detta är en av de få funktionerna iERDDAP™Det ger dig en chans att spara mycket pengar (även på bekostnad av något minskad prestanda) . Om komprimeringsförhållandet är t.ex. 6:1 (Ibland blir det mycket högre) , då datasetets datafiler behöver bara 1/6 diskutrymmet. Kanske kan du klara dig med 1 RAID (av en given storlek) istället för 6 RAIDS (av samma storlek) . Det är en enorm kostnadsbesparingar. Förhoppningsvis förmågan att komprimera vissa filer i en samling (De äldre?) och inte komprimera andra (De nyare?) , och att ändra det när som helst, låt oss du minimera nackdelen för att komprimera några av filerna (långsammare tillgång) . Och om valet är mellan att lagra filerna på tejpen (och endast tillgänglig på begäran, efter en fördröjning) vs lagra dem komprimerade på en RAID (och tillgänglig viaERDDAP) Då finns det en stor fördel att använda komprimering så att användarna får interaktiva och (relativt) snabb åtkomst till data. Och om detta kan spara dig från att köpa en extra RAID, kan den här funktionen spara dig cirka 30 000 dollar.
     
* För allaEDDGridFrånFiles underklasser, om datafilerna har en förlängning som indikerar att de är externt komprimerade filer (För närvarande:.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2eller .Z) ,ERDDAP™kommer att dekomprimera filerna till datasetets cache-katalog när den läser dem (Om de inte redan är i cache) . Detsamma gäller för binär fil (t.ex.,.nc) underklasser av EDDTableFromFiles.
     
* För EDDTableFromFiles underklasser för icke-binära filer (t.ex. .csv) , datafiler med en förlängning som indikerar att de är externt komprimerade filer kommer att dekomprimeras på flygningen när filen läses.
     
* REQUIREMENT: Om den typ av externt komprimerad fil som används (t.ex.,.tgzeller.zip) stöder mer än 1 fil i den komprimerade filen, den komprimerade filen måste innehålla bara 1 fil.
     
* Denna funktion förutsätter att innehållet i externt komprimerade filer inte ändras, så att en cachad dekomprimerad fil kan återanvändas. Om vissa eller alla datamängders datafiler ibland ändras, komprimera inte dessa filer. Detta är förenligt med vanlig användning, eftersom människor normalt inte komprimerar filer som de ibland behöver ändra.
     
*   &lt;FilnamnRegex&gt; För att göra detta arbete, datasetets&lt;fileNameRegex&gt; måste matcha komprimerade filers namn. Självklart regexes som.\\*kommer att matcha alla filnamn. Om du anger en specifik filtyp, t.ex.\\*Ü.nc, då måste du ändra regex för att inkludera kompressionsförlängningen också, t.ex. . *Ü.ncÜ.gz(om alla filer kommer att vara* Något *.nc.gzfiler) .
     
* Det är bra om din dataset innehåller en blandning av komprimerade och inte komprimerade filer. Detta kan vara användbart om du tror att vissa filer (t.ex. äldre filer) kommer att användas mindre ofta och därför skulle det vara användbart att spara diskutrymme genom att komprimera dem. För att göra detta arbete,&lt;fileNameRegex&gt; måste matcha komprimerade och inte komprimerade filers namn, t.ex. .\\*eller.\\*Ü.nc (|Ü.gz) (där fångstgruppen i slutet av den anger att.gzär valfritt.
     
* Det är bra om du komprimerar eller dekomprimerar specifika filer i samlingen när som helst.
Om datamängden inte använder [&lt;updateEveryNMillis &gt;] (#updateeverynmillis) Ange datasetets[flagga](/docs/server-admin/additional-information#flag)Att berättaERDDAP™för att ladda om datamängden och därmed märka ändringarna. Intressant kan du använda olika komprimeringsalgoritmer och inställningar för olika filer i samma dataset. (t.ex.,.bz2för sällan använda filer,.gzför inte ofta använda filer, och ingen komprimering för ofta använda filer) , se bara till att regexen stöder alla filtillägg som används, t.ex. . \\* \\* \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ .nc (|Ü.gz|Ü.bz2) .
     
* Naturligtvis varierar komprimeringsgrader och hastigheter för de olika komprimeringsalgoritmerna med källfilen och inställningarna. (t.ex. kompressionsnivå) . Om du vill optimera detta system för dina filer, gör ett test av de olika komprimeringsmetoderna med dina filer och med en rad komprimeringsinställningar. Om du vill ha en pålitligt bra (Inte nödvändigtvis det bästa) Vi kommer att rekommendera litegzip  (.gz) .gzipGör inte den minsta komprimerade filen (Det är rimligt nära) Men det komprimerar filen mycket snabbt och (viktigare förERDDAP™användare) dekomprimerar filen mycket snabbt. Plus,gzipprogramvara kommer standard med varje Linux och Mac OS installation och är lätt tillgänglig för Windows via gratis verktyg som 7Zip och Linux tillägg som Git Bash. Till exempel för att komprimera en källfil i.gzversion av filen (samma filnamn, men med.gzAppenderad) Använd (i Linux, Mac OS och Git Bash)   
    gzip  *sourceName*   
Att dekomprimera en.gzfil tillbaka till originalet, använd
Gunzip *sourceName.gz*   
För att komprimera var och en av källfilerna i katalogen och dess underkataloger, återkommande, använd
    gzip-R *Regissör*   
Att dekomprimera var och en av.gzfiler i katalogen och dess underkataloger, återkommande, använda
Gunzip -r *Regissör*   
     
* VARNING: Komprimera inte externt (gzip) filer som redan är internt komprimerade&#33;
Många filer har redan komprimerat data internt. Om dugzipDessa filer, de resulterande filerna kommer inte att vara mycket mindre (&lt;5%) ochERDDAP™kommer att slösa tid på att dekomprimera dem när de behöver läsa dem. Till exempel:
    
    * datafiler: t.ex..nc4 och.hdf5 filer: Vissa filer använder intern komprimering; vissa inte. Hur man berättar: komprimerade variabler har "\\_ChunkSize" attribut. Om en grupp rutnät.nceller.hdffiler är alla olika storlekar, de är sannolikt internt komprimerade. Om de är alla samma storlek komprimeras de inte internt.
    * bildfiler: t.ex., .gif, .jpg och .png
    * ljudfiler: t.ex., .mp3 och .ogg.
    * videofiler: t.ex., .mp4, .ogv och .webm.
    
        
Ett olyckligt udda fall: .wav ljudfiler är stora och inte internt komprimerade. Det skulle vara trevligt att komprimera (gzip) dem, men i allmänhet bör du inte för att om du gör det, användare kommer inte att kunna spela komprimerade filer i sin webbläsare.
     
* Testfall: komprimering (medgzip) en dataset med 1523 rutnät.ncfiler.
    
    * Data i källfilerna var glesa (massor av saknade värden) .
    * Total diskutrymme gick från 57 GB innan komprimering till 7 GB efter.
    * En begäran om massor av data från 1 tidspunkt är&lt;1 s före och efter komprimering.
    * En begäran om 1 datapunkt för 365 tidspunkter (Den värsta situationen) gick från 4 till 71 s.
         
    
För mig är det en rimlig avvägning för alla datamängder, och säkert för datamängder som sällan används.
     
* Interna kontra yttre kompression -
Jämfört med den interna filkomprimering som erbjuds av.nc4 och.hdf5 filer,ERDDAP"S tillvägagångssätt för externt komprimerade binära filer har fördelar och nackdelar. Nackdelen är: för en gång läs av en liten del av en fil är intern komprimering bättre eftersomEDDGridFrånFiles behöver bara dekomprimera några bitar (s) av filen, inte hela filen. MenERDDAP"S tillvägagångssätt har några fördelar:
    
    *   ERDDAP™stöder komprimering av alla typer av datafiler (binär och icke-binär, t.ex..nc3 och .csv) Inte bara.nc4 och.hdf4.
    * Om huvuddelen av en fil måste läsas mer än en gång på kort tid, sparar det tid att dekomprimera filen en gång och läsa den många gånger. Detta händer iERDDAP™När en användare använder Make-A-Graph för datamängden och gör en serie små ändringar i diagrammet.
    * Möjligheten att ha komprimerade filer och inte komprimerade filer i samma samling, låter dig mer kontroll över vilka filer som komprimeras och som inte är det. Och denna extra kontroll kommer utan att verkligen ändra källfilen (eftersom du kan komprimera en fil med t.ex..gzoch sedan dekomprimera den för att få den ursprungliga filen) .
    * Möjligheten att ändra när som helst om en viss fil komprimeras och hur den komprimeras (olika algoritmer och inställningar) ger dig mer kontroll över systemets prestanda. Och du kan enkelt återställa den ursprungliga okomprimerade filen när som helst.
    
Även om inget tillvägagångssätt är en vinnare i alla situationer, är det klart attERDDAPförmåga att tjäna data från externt komprimerade filer gör extern komprimering ett rimligt alternativ till den interna komprimering som erbjuds av.nc4 och.hdf5. Det är viktigt med tanke på att intern komprimering är en av de främsta anledningarna till att människor väljer att använda.nc4 och.hdf5.
     
##### Dekomprimerad Cache{#decompressed-cache} 
ERDDAP™gör en dekomprimerad version av någon komprimerad binär (t.ex.,.nc) datafil när den behöver läsa filen. De dekomprimerade filer hålls i datasetets katalog inom *bigParentDirectory* Dekomprimerad/. Dekomprimerade filer som inte har använts nyligen kommer att raderas för att frigöra utrymme när den kumulativa filstorleken är &gt;10 GB. Du kan ändra det genom att ställa in&lt;DecompressedCacheMaxGB&gt; (Standard=10) i dataset Xml.xml, t ex
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Dekomprimerade filer som inte har använts under de senaste 15 minuterna raderas också i början av varje större datamängdsreload. Du kan ändra det genom att ställa in&lt;DecompressedCacheMaxMinutesOld&gt; (Standard=15) i dataset Xml.xml, t ex
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Större siffror är trevliga, men den kumulativa storleken på de dekomprimerade filer kan orsaka *bigParentDirectory* att springa ur diskutrymme, vilket orsakar svåra problem.
     
* Eftersom dekomprimering av en fil kan ta en betydande tid (0,1 till 10 sekunder) datamängder med komprimerade filer kan dra nytta av att ställa in datamängdens [&lt;nThreads&gt;] (#Nthreads) Inställning till ett högre antal (2? 3? 4?) . Nackdelarna till ännu högre siffror (t.ex. 5? 6? 7?) minskar avkastningen och att en användares begäran sedan kan använda en hög andel av systemets resurser, vilket väsentligt minskar behandlingen av andra användares önskemål. Således finns det ingen idealisk nThreads inställning, bara olika konsekvenser i olika situationer med olika inställningar.
         
#### Sorterade dimensionsvärden{#sorted-dimension-values} 
Värdena för varje dimension måste vara i sorterad ordning (uppstigande eller nedstigande, förutom den första (vänster-mest) dimension som måste uppstiga) . Värdena kan vara oregelbundet placerade. Det kan inte finnas några band. Detta är ett krav på[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Om någon dimensions värderingar inte är i sorterad ordning kommer datamängden inte att laddas ochERDDAP™identifiera det första osorterade värdet i loggfilen, *bigParentDirectory* /logs/log.txt.
    
Osorterade dimensionsvärden indikerar nästan alltid ett problem med källdatamängden. Detta sker oftast när en felaktig eller olämplig fil ingår i aggregeringen, vilket leder till en osorterad tidsdimension. För att lösa detta problem, se felmeddelandet iERDDAP™log.txt-fil för att hitta det kränkande tidsvärdet. Titta sedan i källfilerna för att hitta motsvarande fil (eller en före eller en efter) Det hör inte hemma i aggregeringen.
    
#### Directories{#directories} 
Filerna kan finnas i en katalog eller i en katalog och dess underkataloger (Återkommande) . Om det finns ett stort antal filer (Till exempel &gt;1 000) operativsystemet (och därmedEDDGridFrånFiles) kommer att fungera mycket mer effektivt om du lagrar filerna i en serie underkataloger (en per år, eller en per månad för datamängder med mycket frekventa filer) så att det aldrig finns ett stort antal filer i en viss katalog.
     
#### &lt;cacheFromUrl&gt;{#cachefromurl} 
Allt alltEDDGridFromFiles och alla EDDTableFromFiles dataset stöder en uppsättning taggar som berättarERDDAP™för att ladda ner och behålla en kopia av alla en fjärrdatamängds filer, eller en cache av några filer (nedladdad efter behov) . Detta kan vara otroligt användbart. Se[Cache FrånUrl dokumentation](#cachefromurl).
    
#### Remote Directories och HTTP Range Requests{#remote-directories-and-http-range-requests} 
 (AKA Byte Serving, Byte Range Requests, Accept-Rangeshttpheader)   
EDDGridFromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles och EDDTableFromNcCFFiles, kan *Ibland ibland ibland* tjäna data från.ncfiler på fjärrservrar och nås via HTTP om servern stöder[Byte servering](https://en.wikipedia.org/wiki/Byte_serving)via HTTP range requests (HTTP-mekanismen för byte servering) . Detta är möjligt eftersom netcdf-java (som skallERDDAP™användning för att läsa.ncfiler filer) stöder att läsa data från fjärrkontrollen.ncfiler via HTTP-serieförfrågningar.

 **Gör inte detta&#33;** Det är fruktansvärt ineffektivt och långsamt.
Istället, använd [&lt;cacheFromUrl&gt; system (#cachefromurl) .

TillgångERDDAP™datamängder som filer via byte range requests -
Flippa detta runt, med tanke på att du kan (i teorin) Tänk på en dataset iERDDAP™Som jätte.ncFil genom att appendera ".ncTill basen OPenDAPURL för en viss dataset (t.ex., https://myserver.org/erddap/griddap/datasetID.nc och även genom att lägga till en fråga efter det för att ange en delmängd) Det är kanske rimligt att fråga om du kan använda netcdf-java.Ferreteller någon annanNetCDFklientprogramvara för att läsa data via HTTP Range Requests frånERDDAP. Svaret är nej, för det finns inte riktigt en stor ".ncfil. Om du vill göra detta, gör istället ett av dessa alternativ:

* Användning(OPeN)DAPklientprogramvara för att ansluta till griddap-tjänsterna som erbjuds avERDDAP. Det är vadDAP  (och därmedERDDAP) designades för. Det är mycket effektivt.
* Eller ladda ner källfilen (s) från"files"Systemsystem (eller en subset-fil via en.nc?? Fråga) till din dator och använd netcdf-java,Ferreteller någon annanNetCDFklientprogramvara för att läsa (Nu nu nu) lokal fil (s) .
         
#### Cached File Information{#cached-file-information} 
När enEDDGridFromFiles dataset laddas först,EDDGridFromFiles läser information från alla relevanta filer och skapar tabeller (En rad för varje fil) med information om varje giltig fil och varje "dålig" (olika eller ogiltiga) fil.
* Tabellerna lagras också på disken, somNetCDFv3.ncfiler i *bigParentDirectory* /dataset/ *Last2CharsOfDatasetID* /// *datasetID* i filer som heter:
DirTable.nc  (som innehåller en lista över unika katalognamn) ,
fil Bord.nc  (som håller tabellen med varje giltig fils information) ,
badFiles.nc  (som håller tabellen med varje dålig fils information) .
* För att påskynda åtkomsten till enEDDGridFrånFiles dataset (men på bekostnad av att använda mer minne) Du kan använda
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
Att berättaERDDAP™för att hålla en kopia av filinformationstabellerna i minnet.
* Kopieringen av filinformationstabellerna på disken är också användbar närERDDAP™stängs och startas om: det spararEDDGridFrånFiles från att behöva läsa om alla datafiler.
* När en dataset laddas om,ERDDAP™behöver bara läsa data i nya filer och filer som har ändrats.
* Om en fil har en annan struktur från andra filer (till exempel en annan datatyp för en av variablerna, eller ett annat värde för "[enheter](#units)"attribut) ,ERDDAPlägger till filen i listan över "dåliga" filer. Information om problemet med filen kommer att skrivas till *bigParentDirectory* /logs/log.txt fil.
* Du bör aldrig behöva ta bort eller arbeta med dessa filer. Ett undantag är: Om du fortfarande gör ändringar i en datasetdatasets.xmlinstallation, du kanske vill ta bort dessa filer för att tvingaERDDAP™att läsa alla filer eftersom filerna kommer att läsas / tolkas annorlunda. Om du någonsin behöver ta bort dessa filer kan du göra det när duERDDAP™kör. (Sätt sedan en[flagga](/docs/server-admin/additional-information#set-dataset-flag)för att ladda om dataset ASAP.) Men,ERDDAP™brukar märka attdatasets.xmlinformation matchar inte filen Tabellinformation och raderar filtabellerna automatiskt.
* Om du vill uppmuntraERDDAP™för att uppdatera lagrad dataset information (till exempel, om du bara har lagt till, tagit bort eller ändrat några filer till datasetets datakatalog) Använda[Flagga system](/docs/server-admin/additional-information#flag)Att tvingaERDDAP™för att uppdatera cachade filinformation.
         
#### Hanteringsförfrågningar{#handling-requests} 
När en kunds begäran om data behandlas,EDDGridFromFiles kan snabbt titta i tabellen med giltig filinformation för att se vilka filer som har begärda data.
     
#### Uppdatera Cached File Information{#updating-the-cached-file-information} 
När datamängden laddas om uppdateras den cachade filinformationen.
    
* Datamängden laddas regelbundet enligt bestämda av&lt;reloadEveryNMinutes &gt; i datasetets information idatasets.xml.
* Datasetet laddas så snart som möjligt när som helstERDDAP™upptäcker att du har lagt till, tagit bort,[touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) ) (ändra filens sista Ändrad tid) eller ändrat en datafil.
* Datasetet laddas så snart som möjligt om du använder[Flagga system](/docs/server-admin/additional-information#flag).

När datamängden laddas om,ERDDAP™jämför de tillgängliga filerna för de cachade filinformationstabellerna. Nya filer läses och läggs till i den giltiga filer tabellen. Filer som inte längre finns tappas från tabellen giltiga filer. Filer där fil timestamp har ändrats läses och deras information uppdateras. De nya tabellerna ersätter de gamla tabellerna i minnet och på disken.
     
#### Dåliga filer{#bad-files} 
Tabellen med dåliga filer och anledningarna till att filerna förklarades dåligt (korrupt fil, saknade variabler etc.) mailas till e-post Allting Allt Till e-postadress (förmodligen du) Varje gång datasetet laddas om. Du bör ersätta eller reparera dessa filer så snart som möjligt.
     
#### Saknade variabler{#missing-variables} 
Om några av filerna inte har några avdataVariables definierade i datasetetsdatasets.xmlChunk, det är okej. När närEDDGridFromFiles läser en av dessa filer, det kommer att fungera som om filen hade variabeln, men med alla saknade värden.
     
#### FTP Problem / Råd{#ftp-troubleadvice} 
Om du FTP nya datafiler tillERDDAP™server medanERDDAP™Igång, det finns chansen attERDDAP™kommer att ladda om datamängden under FTP-processen. Det händer oftare än du kanske tror&#33; Om det händer visas filen vara giltig (Den har ett giltigt namn) Men filen är ännu inte giltig. OmERDDAP™försöker läsa data från den ogiltiga filen, det resulterande felet kommer att leda till att filen läggs till i tabellen med ogiltiga filer. Detta är inte bra. För att undvika detta problem, använd ett tillfälligt filnamn när FTP-filen till exempel ABC2005.nc\\_TEMP . Sedan filenNameRegex test (Se nedan) indikerar att detta inte är en relevant fil. Efter FTP-processen är klar, byt namn på filen till rätt namn. Reneamingprocessen kommer att göra att filen blir relevant på ett ögonblick.
     
#### "0 filer" Felmeddelande{#0-files-error-message-1} 
Om du kör[GenerateDatasetsXml](#generatedatasetsxml)eller[DasDds](#dasdds)eller om du försöker ladda enEDDGridFrån...Files dataset inERDDAP™, och du får ett "0 filer" felmeddelande som indikerar attERDDAP™Hittade 0 matchande filer i katalogen (När du tror att det finns matchande filer i den katalogen) Från:
    * Kontrollera att filerna verkligen finns i den katalogen.
    * Kontrollera stavningen av katalogen namn.
    * Kolla filenNameRegex. Det är verkligen lätt att göra misstag med regex. För teständamål, prova regex . * som ska matcha alla filnamn. (Se detta[regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)och[Regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Kontrollera att användaren som kör programmet (t.ex. användar=tomcat (??) För Tomcat/ERDDAP) har "läst" tillstånd för dessa filer.
    * I vissa operativsystem (Till exempel SELinux) Och beroende på systeminställningar måste användaren som körde programmet ha "läs" tillstånd för hela katalogkedjan som leder till katalogen som har filerna.
         
#### EDDGridFrånFiles skeleton XML{#eddgridfromfiles-skeleton-xml} 
*    **Skelettet XML** för allaEDDGridFromFiles underklasser är:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*FromAudioFiles{#eddfromaudiofiles} 
 **EDDGridFrån AudioFiles** och **EDDTableFromAudioFiles** aggregerade data från en samling av lokala ljudfiler. (Dessa först dök upp iERDDAP™v1.82.) Skillnaden är attEDDGridFromAudioFiles behandlar data som en multidimensionell dataset (Vanligtvis med 2 dimensioner:\\[Fil Start Tid\\]och\\[Förfluten Tid inom en fil\\]) , medan EDDTableFromAudioFiles behandlar data som tabelldata (vanligtvis med kolumner för filen startTime, elapsedTime med filen, och data från ljudkanalerna) .EDDGridFrån AudioFiles kräver att alla filer har samma antal prover, så om det inte är sant måste du använda EDDTableFromAudioFiles. Annars är valet av vilken EDD-typ du ska använda helt ditt val. En fördel med EDDTableFromAudioFiles: du kan lägga till andra variabler med annan information, t.ex.stationIDstationType. I båda fallen gör bristen på en enhetlig tidsvariabel det svårare att arbeta med data från dessa EDD-typer, men det fanns inget bra sätt att skapa en enhetlig tidsvariabel.

Se klassens superklasser,[EDDGridFrånFiles](#eddgridfromfiles)och[EDDTableFromFiles](#eddtablefromfiles)för allmän information om hur denna klass fungerar och hur man använder den.

Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Eftersom ljudfiler inte har någon metadata än information relaterad till kodningen av ljuddata måste du redigera utgången från GenerateDatasets Xml tillhandahåller viktig information (t.ex. titel, sammanfattning,creator\\_nameInstitution, historia) .

Detaljer:

* Det finns ett stort antal ljudfilformat. För närvarande,ERDDAP™kan läsa data från de flesta .wav och .au-filer. Det kan för närvarande inte läsa andra typer av ljudfiler, t.ex., .aiff eller .mp3. Om du behöver stöd för andra ljudfilformat eller andra varianter av .wav och .au, vänligen maila din begäran till Chris. John på noaa.gov. Eller som en lösning kan du använda just nu kan du konvertera dina ljudfiler till PCM\\_ SIGNED (för integer data) eller PCM_FLOAT (för flytande punktdata) .wav filer så attERDDAP™kan arbeta med dem.
* För närvarande,ERDDAP™kan läsa ljudfiler med vadJavaAudioFormat-klassen kallar PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW och ULAW-kodningar.ERDDAP™konverterar PCMUNSIGNED-värden (t.ex. 0 till 255) i signerade värden (t.ex. -128 till 128) genom att ändra bitarna i datavärdena.ERDDAP™konverterar ALAW och ULAW kodade från deras infödda kodade byte format i korthet (Int16) värden. Sedan dessJavavill ha bigEndian=true data,ERDDAP™omordnar byte av data som lagras med bigEndian=false (Lite endian) för att läsa värdena korrekt. För alla andra kodningar (PCM) ,ERDDAP™läser data som det är.
* När närERDDAP™läser data från ljudfiler, det omvandlar filens tillgängliga ljudmetadata till globala attribut. Detta inkluderar alltid (med provvärden som visas) 
    
String audioBigEndian "falsk"; //sann eller falsk
Int ljud Kanal 1;
String audioEncoding "PCM\\_SIGNED";
float audioFrameRate 96000.0; //per sekund
int audioFrameSize 2; //# av data byte per ram
Flytande ljudSampleRate 96000.0; //per sekund
int audioSampleSizeInBits 16; //# bits per kanal per prov
    
FörERDDAP"Syfte, en ram är synonymt med ett prov, vilket är data för en punkt i tiden.
attributen iERDDAP™kommer att ha den information som beskriver data som det var i källfilerna.ERDDAP™kommer ofta att ha ändrat detta medan du läser data, t.ex. PCM\\_UNSIGNED, ALAW och ULAW-kodade data konverteras till PCM\\_SIGNED, och bigEndian=false data konverteras till bigEndian=true data (Vad är hurJavaVill läsa den) . I slutändan datavärden iERDDAP™kommer alltid att vara[PCM-kodade](https://en.wikipedia.org/wiki/Pulse-code_modulation)datavärden (dvs. enkla digitaliserade prover av ljudvågen) .
* När närERDDAP™läser data från ljudfiler, det läser hela filen.ERDDAP™kan läsa så många som cirka 2 miljarder prover per kanal. Till exempel, om provfrekvensen är 44,100 prov per sekund, översätter 2 miljarder prover till cirka 756 minuter ljuddata per fil. Om du har ljudfiler med mer än denna mängd data måste du bryta upp filerna i mindre bitar så attERDDAP™kan läsa dem.
* För därförERDDAP™läser hela ljudfiler,ERDDAP™måste ha tillgång till en stor mängd minne för att arbeta med stora ljudfiler. Se[ERDDAPMinnesinställningar](/docs/server-admin/deploy-install#memory). Återigen, om detta är ett problem, en lösning som du kan använda just nu är att bryta upp filerna i mindre bitar så attERDDAP™kan läsa dem med mindre minne.
* Vissa ljudfiler skrevs felaktigt.ERDDAP™gör en liten ansträngning att hantera sådana fall. Men i allmänhet, när det finns ett fel,ERDDAP™kommer att kasta ett undantag (och förkasta den filen) eller (om felet inte kan upptäckas) Läs data (Men data kommer att vara felaktiga) .
*   ERDDAP™inte kontrollera eller ändra ljudets volym. Helst skalas integer ljuddata för att använda hela sortimentet av datatypen.
* Ljudfiler och ljudspelare har inget system för saknade värden (t.ex. -999 eller Float.NaN) . Så ljuddata borde inte ha några saknade värden. Om det saknas värden (t.ex. om du behöver förlänga en ljudfil) Använd en serie av 0 som kommer att tolkas som perfekt tystnad.
* När närERDDAP™Läser data från ljudfiler, det skapar alltid en kolumn som kallas förfluten Tid med tiden för varje prov, på några sekunder (lagras som dubblar) i förhållande till det första provet (som tilldelas förflutet Tid=0,0 s) . MedEDDGridFrån AudioFiles blir detta den förflutna tidsaxelvariabeln.
*   EDDGridFromAudioFiles kräver att alla filer har samma antal prover. Så om det inte är sant måste du använda EDDTableFromAudioFiles.
* FörEDDGridFrån AudioFiles rekommenderar vi att du ställer in [&lt;dimensionValuesInMemory] (#Dimensionvaluesinmemory) falskt (Som rekommenderas av GenerateDatasets Xml) Eftersom tidsdimensionen ofta har ett stort antal värden.
* FörEDDGridFrån AudioFiles bör du nästan alltid användaEDDGridFrånFiles system för[Aggregation via Filnamn](#aggregation-via-file-names-or-global-metadata)nästan alltid genom att extrahera inspelningens startdatum Tid från filnamnen. Till exempel,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
GenerateDatasets Xml kommer att uppmuntra detta och hjälpa dig med detta.
* För EDDTableFromAudioFiles bör du nästan alltid använda EDDTableFromFiles-systemet för[\\*\\*FileName pseudosourceNames](#filename-sourcenames)att extrahera information från filens namn (Nästan alltid startdatum Tid för inspelningen) och främja det som en kolumn av data. Till exempel,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Tidsformatet ska sedan anges som enhetsattributet:&lt;Att namn="units"&gt;yyyMdd'\\_'Hmmss&lt;/att&gt;
     
### EDDGridFrånMergeIRFiles{#eddgridfrommergeirfiles} 
[ **EDDGridFrånMergeIRFiles** ](#eddgridfrommergeirfiles)aggregerar data från lokala,[MergeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)filer, som är från[Tropisk regn mäta uppdrag (TRMM) ](https://trmm.gsfc.nasa.gov), som är ett gemensamt uppdrag mellan NASA och Japan Aerospace Exploration Agency (JAXA) . Merge IR-filer kan laddas ner från[NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGridFromMergeIRFiles.java skrevs och bidrog tillERDDAP™projekt av Jonathan Lafite och Philippe Makowski av R.Tech Engineering (licens: upphovsrättsskyddad öppen källkod) .

EDDGridFromMergeIRFiles är lite ovanligt:

*   EDDGridFromMergeIRFiles stöder komprimerade eller okomprimerade källdatafiler, i alla kombinationer, i samma dataset. Detta gör att du till exempel kan komprimera äldre filer som sällan nås, men okomprimera nya filer som ofta nås. Eller du kan ändra typen av komprimering från originalet. Z till exempel,.gz.
* Om du har komprimerade och okomprimerade versioner av samma datafiler i samma katalog, se till att&lt;fileNameRegex&gt; för din dataset matchar filnamnen som du vill att den ska matcha och inte matcha filnamn som du inte vill att den ska matcha.
* Okomprimerade källdatafiler måste inte ha någon filändelse (d.v.s. nej. i filnamnet) .
* Komprimerade källdatafiler måste ha en filändelse, menERDDAP™bestämmer typen av komprimering genom att inspektera innehållet i filen, inte genom att titta på filens filändelse (Till exempel ".Z") . De stödda kompressionstyperna inkluderar "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200" och "z". När närERDDAP™läser komprimerade filer, det dekomprimerar on-the-fly, utan att skriva till en tillfällig fil.
* Alla källdatafiler måste använda det ursprungliga filnamnssystemet: dvs. merg\\_ *YYYMMMDDHH* 4km-pixel (där var *YYYMMMDDHH* anger den tid som är associerad med data i filen) plus en filändelse om filen komprimeras.

Se klassens superklass,[EDDGridFrånFiles](#eddgridfromfiles)för allmän information om hur denna klass fungerar och hur man använder den.

Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
 
### EDDGridFrånNcFiles{#eddgridfromncfiles} 
[ **EDDGridFrånNcFiles** ](#eddgridfromncfiles)aggregerar data från lokala, ruttna,[GRIB .grb och .grb2](https://en.wikipedia.org/wiki/GRIB)filer,[HDF  (v4 eller v5)  .hdf](https://www.hdfgroup.org/)filer,[.ncml](#ncml-files)filer,[NetCDF  (v3 eller v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)filer och[Zarr](https://github.com/zarr-developers/zarr-python)filer filer (Från och med version 2.25) . Zarr-filer har något annorlunda beteende och kräver antingen filenNameRegex eller vägenRegex för att inkludera "zarr".

Detta kan fungera med andra filtyper (Till exempel BUFR) Vi har bara inte testat det - skicka oss några provfiler.

* för GRIB filer,ERDDAP™kommer att göra en .gbx indexfil första gången den läser varje GRIB-fil. Så GRIB-filerna måste vara i en katalog där "användaren" som körde Tomcat har läst + skrivtillstånd.
* Se klassens superklass,[EDDGridFrånFiles](#eddgridfromfiles)för information om hur denna klass fungerar och hur man använder den.
* Börja medERDDAP™v2.12,EDDGridFrånNcFiles ochEDDGridFrånNcFiles Unpacked kan läsa data från "strukturer" i.nc4 och.hdf4 filer. För att identifiera en variabel som kommer från en struktur,&lt;sourceName&gt; &gt; &gt; &gt; &gt; måste använda formatet: *FullStructureName* | *medlemName* till exempel grupp1/myStruct|MyMember.
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
    
#### Grupper i Gridded Nc-filer{#groups-in-gridded-nc-files} 
    [Netcdf4 filer kan innehålla grupper.](#groups-in-gridded-nc-files) ERDDAP™gör bara en dataset från variablerna i en grupp och alla dess föräldragrupper. Du kan ange ett specifikt gruppnamn i GenerateDatasets Xml (Omit the trailing slash) eller använda "" för att ha GenerateDatasets Xml söker alla grupper för de variabler som använder flest dimensioner eller använder "\\[root\\]"Att ha GenerateDatasets letar bara efter variabler i rotgruppen.
    
Det första GenerateDatasetsXml gör för denna typ av datamängd efter att du svarat på frågorna är att skriva ut ncdump-liknande struktur av provfilen. Så om du anger några goofy svar för den första slingan genom GenerateDatasets Xml, åtminstone kan du se omERDDAP™kan läsa filen och se vilka dimensioner och variabler som finns i filen. Då kan du ge bättre svar för andra slingan genom GenerateDatasetsXml.
    

### EDDGridFrånNcFilesUnpacked{#eddgridfromncfilesunpacked} 
[ **EDDGridFrånNcFilesUnpacked** ](#eddgridfromncfilesunpacked)är en variant av[EDDGridFrånNcFiles](#eddgridfromncfiles)som samlar in data från lokala, ruttnaNetCDF  (v3 eller v4)  .ncoch relaterade filer. Skillnaden är att denna klass packar upp varje datafil innanEDDGridFromFiles tittar på filerna:

* Det packar upp variabler som är packade med[scale\\_factoroch/elleradd\\_offset](#scale_factor).
* Den konverterar \\_FillValue ochmissing\\_valueVärdena att vara NaNs (eller MAX\\_VALUE för datatyper) .
* Det omvandlar tid och tidsstämpelvärden till"seconds since 1970-01-01T00:00:00Z".

Den stora fördelen med denna klass är att den ger ett sätt att hantera olika värden avscale\\_factor,add\\_offset\\_FillValue,missing\\_value, eller tidsenheter i olika källfiler i en samling. Annars skulle du behöva använda ett verktyg som[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)ändra varje fil för att ta bort skillnaderna så att filerna kan hanteras avEDDGridFrånNcFiles. För att denna klass ska fungera korrekt måste filerna följa CF-standarderna för de relaterade attributen.

* Om du försöker göra enEDDGridFrånNcFiles Upppackad från en grupp filer som du tidigare provat och misslyckats med att användaEDDGridFrånNcFiles, cd till
     *bigParentDirectory* /dataset/ *Last2Letters* /// *datasetID* ///
där var *Last2Letters* är de två sista bokstäverna idatasetID,
och radera alla filer i den katalogen.
* Börja medERDDAP™v2.12,EDDGridFrånNcFiles ochEDDGridFrånNcFiles Unpacked kan läsa data från "strukturer" i.nc4 och.hdf4 filer. För att identifiera en variabel som kommer från en struktur,&lt;sourceName&gt; &gt; &gt; &gt; &gt; måste använda formatet: *FullStructureName* | *medlemName* till exempel grupp1/myStruct|MyMember.
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
    
Netcdf4 filer kan innehålla grupper. Se[Denna dokumentation](#groups-in-gridded-nc-files).
    
Det första GenerateDatasetsXml gör för denna typ av dataset efter att du svarat på frågorna är att skriva ut ncdump-liknande strukturen i provfilen. **före** Det är packat. Så om du anger några goofy svar för den första slingan genom GenerateDatasets Xml, åtminstone kan du se omERDDAP™kan läsa filen och se vilka dimensioner och variabler som finns i filen. Då kan du ge bättre svar för andra slingan genom GenerateDatasetsXml.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)modifierar barnets longitudvärden (innesluten)  EDDGriddatamängd som har en viss longitud värden större än 180 (Till exempel 0 till 360) så att de är i intervallet -180 till 180 (Longitude Plus eller Minus 180, alltså namnet) .

* Detta ger ett sätt att göra datamängder som har longitudvärden större än 180 kompatibla i / medOGCtjänster (till exempelWMSserver iERDDAP) Eftersom alltOGCTjänster kräver longitudvärden inom -180 till 180.
* Att arbeta nära en diskontinuitet orsakar problem, oavsett om diskontinuiteten är på längden 0 eller på längden 180. Denna datasettyp låter dig undvika dessa problem för alla, genom att erbjuda två versioner av samma dataset:
en med longitudvärden i intervallet 0 till 360 ("Pacificentric"?) ,
en med longitudvärden i intervallet -180 till 180 ("Atlanticentric"?) .
* För barndataset med alla longitudvärden som är större än 180 är alla nya longitudvärden helt enkelt 360 grader lägre. Till exempel skulle en datamängd med longitudvärden på 180 till 240 bli en datamängd med longitudvärden på -180 till -120.
* För barndatauppsättningar som har longitudvärden för hela världen (ungefär 0 till 360) Det nya longitudvärdet kommer att omordnas (grovt) -180 till 180:
De ursprungliga 0 till nästan 180 värden är oförändrade.
De ursprungliga 180 till 360 värden konverteras till -180 till 0 och flyttas till början av longitud array.
* För barndata som sträcker sig över 180 men inte täcker världen,ERDDAP™infogar saknade värden som behövs för att göra en dataset som täcker världen. Till exempel skulle en barndatamängd med longitudvärden på 140 till 200 bli en datamängd med longitudvärden på -180 till 180.
Barnvärdena på 180 till 200 skulle bli -180 till -160.
Nya longitudvärden skulle införas från -160 till 140. Motsvarande datavärden blir \\_FillValues.
Barnvärdena på 140 till nästan 180 skulle vara oförändrade.
Införandet av saknade värden kan verka udda, men det undviker flera problem som beror på att ha longitudvärden som hoppar plötsligt. (från -160 till 140) .
* Inom[GenerateDatasetsXml](#generatedatasetsxml)Det finns en speciell "dataset typ",EDDGridLonPM180FromErddapCatalog, som låter dig genereradatasets.xmlFörEDDGridLonPM180 datamängder från varjeEDDGridDataset i enERDDAPsom har någon longitud värden större än 180. Detta underlättar att erbjuda två versioner av dessa datamängder:
originalet, med longitudvärden i intervallet 0 till 360,
och den nya datamängden, med longitudvärden i intervallet -180 till 180.
    
Barnets datamängd inom varjeEDDGridLonPM180 dataset blir enEDDGridFromErddap dataset som pekar på den ursprungliga dataset.
Den nya dataset'sdatasetIDär namnet på den ursprungliga dataset plus "\\_LonPM180".
Till exempel,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Sätt påEDDGridLonPM180 dataset **nedanför** Den ursprungliga dataset idatasets.xml. Det undviker vissa möjliga problem.
    
Alternativt kan du ersättaEDDGridFromErddap barn dataset med den ursprungliga datasetdatasets.xml. Då kommer det bara att finnas en version av datamängden: den med longitudvärden inom -180 till 180. Vi motverkar detta eftersom det finns tillfällen då varje version av datamängden är bekvämare.
    
* Om du erbjuder två versioner av en dataset, till exempel en med longitud 0 till 360 och en med longitud -180 till 180:
    * Du kan använda valfri [&lt;tillgänglig tillgänglig ViaWMS&gt;Falska&lt;Tillgänglig ViaWMS&gt;] (#accessibleviawms) med datamängden 0-360 för att med våld inaktiveraWMSservice för denna dataset. Då är endast LonPM180-versionen av datasetet tillgänglig viaWMS.
    * Det finns ett par sätt att hålla LonPM180-datauppsättningen uppdaterad med ändringar av den underliggande datamängden:
        * Om barnets dataset är enEDDGridFromErddap dataset som refererar till en dataset i sammaERDDAP™LonPM180 datamängden försöker direkt prenumerera på den underliggande datamängden så att den alltid är uppdaterad. Direktabonnemang genererar inte e-postmeddelanden som ber dig att validera prenumerationen - validering bör göras automatiskt.
        * Om barnets datamängd inte är enEDDGridFromErddap dataset som är på sammaERDDAP™LonPM180 dataset kommer att försöka använda det vanliga abonnemangssystemet för att prenumerera på det underliggande datasetet. Om du har abonnemangssystemet i dittERDDAP™Påslagen, du bör få e-postmeddelanden som ber dig att validera prenumerationen. Snälla gör det.
        * Om du har abonnemangssystemet i dittERDDAP™Avstängning, LonPM180 datamängden kan ibland ha föråldrad metadata tills LonPM180 datamängden laddas om. Så om abonnemangssystemet stängs av, bör du ställa in [&lt;Reload EveryNMinutes (#reloadeveryn Minuter) Inställning av LonPM180 datamängden till ett mindre antal, så att det är mer sannolikt att fånga ändringar i barndatamängden tidigare.

#### EDDGridLonPM180 skelett XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLon0360{#eddgridlon0360} 
[ **EDDGridLon0360** ](#eddgridlon0360)modifierar barnets longitudvärden (innesluten)  EDDGriddatamängd som har vissa longitudvärden mindre än 0 (Till exempel, -180 till 180) så att de är i intervallet 0 till 360 (Därför namnet) .

* Att arbeta nära en diskontinuitet orsakar problem, oavsett om diskontinuiteten är på längden 0 eller på längden 180. Denna datasettyp låter dig undvika dessa problem för alla, genom att erbjuda två versioner av samma dataset:
en med longitudvärden i intervallet -180 till 180 ("Atlanticentric"?) .
en med longitudvärden i intervallet 0 till 360 ("Pacificentric"?) ,
* För barndataset med alla longitudvärden mindre än 0 är alla nya longitudvärden helt enkelt 360 grader högre. Till exempel skulle en datamängd med longitudvärden på -180 till -120 bli en datamängd med longitudvärden på 180 till 240.
* För barndatauppsättningar som har longitudvärden för hela världen (ungefär -180 till 180) Det nya longitudvärdet kommer att omordnas (grovt) 0 till 360:
De ursprungliga -180 till 0-värden omvandlas till 180 till 360 och flyttas till slutet av longitudarrayen.
De ursprungliga 0 till nästan 180 värden är oförändrade.
* För barndatauppsättningar som spänner över lon = 0 men inte täcker världen,ERDDAP™infogar saknade värden som behövs för att göra en dataset som täcker världen. Till exempel skulle en barndatamängd med longitudvärden på -40 till 20 bli en datamängd med longitudvärden på 0 till 360.
Barnvärdena på 0 till 20 skulle vara oförändrade.
Nya longitudvärden skulle införas från 20 till 320. Motsvarande datavärden blir \\_FillValues.
Barnvärdena på -40 till 0 skulle bli 320 till 360.
Införandet av saknade värden kan verka udda, men det undviker flera problem som beror på att ha longitudvärden som hoppar plötsligt. (t ex från 20 till 320) .
* Inom[GenerateDatasetsXml](#generatedatasetsxml)Det finns en speciell "dataset typ",EDDGridLon0360 från ErddapCatalog, som låter dig genereradatasets.xmlFörEDDGridLon0360 datamängder från varjeEDDGridDataset i enERDDAPsom har någon longitud värden större än 180. Detta underlättar att erbjuda två versioner av dessa datamängder:
originalet, med longitudvärden i intervallet 0 till 360,
och den nya datamängden, med longitudvärden i intervallet -180 till 180.
    
Barnets datamängd inom varjeEDDGridLon0360 dataset blir enEDDGridFromErddap dataset som pekar på den ursprungliga dataset.
Den nya dataset'sdatasetIDär namnet på den ursprungliga dataset plus "\\_Lon0360".
Till exempel,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Sätt påEDDGridLon0360 dataset **nedanför** Den ursprungliga dataset idatasets.xml. Det undviker vissa möjliga problem.
    
Alternativt kan du ersättaEDDGridFromErddap barn dataset med den ursprungliga datasetdatasets.xml. Då kommer det bara att finnas en version av datamängden: den med longitudvärden inom 0 till 360. Vi motverkar detta eftersom det finns tillfällen då varje version av datamängden är bekvämare.
    
* Om du erbjuder två versioner av en dataset, till exempel en med longitud 0 till 360 och en med longitud -180 till 180:
    * Du kan använda valfri [&lt;tillgänglig tillgänglig ViaWMS&gt;Falska&lt;Tillgänglig ViaWMS&gt;] (#accessibleviawms) med 0 till 360 dataset för att med våld inaktiveraWMSservice för denna dataset. Då kommer endast -180-180-versionen av datamängden att vara tillgänglig viaWMS.
    * Det finns ett par sätt att hålla Lon0360 datamängden uppdaterad med ändringar av den underliggande datamängden:
        * Om barnets dataset är enEDDGridFromErddap dataset som refererar till en dataset i sammaERDDAP™Lon0360 dataset försöker direkt prenumerera på den underliggande dataset så att den alltid är uppdaterad. Direktabonnemang genererar inte e-postmeddelanden som ber dig att validera prenumerationen - validering bör göras automatiskt.
        * Om barnets datamängd inte är enEDDGridFromErddap dataset som är på sammaERDDAP™Lon0360 dataset kommer att försöka använda det vanliga abonnemangssystemet för att prenumerera på det underliggande datasetet. Om du har abonnemangssystemet i dittERDDAP™Påslagen, du bör få e-postmeddelanden som ber dig att validera prenumerationen. Snälla gör det.
        * Om du har abonnemangssystemet i dittERDDAP™Avstängning, Lon0360 datamängden kan ibland ha föråldrad metadata tills Lon0360 datamängden laddas om. Så om abonnemangssystemet stängs av, bör du ställa in [&lt;Reload EveryNMinutes (#reloadeveryn Minuter) Inställning av datasetet Lon0360 till ett mindre antal, så att det är mer sannolikt att fånga ändringar i barndatasetet tidigare.
#### EDDGridLon0360 skelett XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridSideBySide{#eddgridsidebyside} 
[ **EDDGridSideBySide** ](#eddgridsidebyside)aggregat två eller fleraEDDGridDataset (Barnen) sida vid sida.

* Den resulterande datamängden har alla variabler från alla barndatamängder.
* Föräldradataset och alla barndatamängder måste ha olikadatasetIDs. Om några namn i en familj är exakt samma, kommer datamängden inte att laddas (med felmeddelandet att värdena på den aggregerade axeln inte är i sorterad ordning) .
* Alla barn måste ha samma källvärden föraxisVariables\\[1+\\]  (Till exempel latitud, longitud) . Testets precision bestäms av[matchaxisNDigits](#matchaxisndigits).
* Barnen kan ha olika källvärden föraxisVariables\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]  (till exempel tid) Men de är oftast i stort sett desamma.
* Föräldradataset kommer att verka ha allaaxisVariables\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]källvärden från alla barnen.
* Till exempel kan du kombinera en källdataset med en vektors u-komponent och en annan källdataset med en vektors v-komponent, så att de kombinerade data kan serveras.
* Barn som skapats genom denna metod hålls privat. De är inte separat tillgängliga dataset (till exempel genom kunddataförfrågningar eller genom[flagga filer](/docs/server-admin/additional-information#flag)) .
* De globala metadata och inställningarna för föräldern kommer från de globala metadata och inställningarna för det första barnet.
* Om det finns ett undantag när du skapar det första barnet kommer föräldern inte att skapas.
* Om det finns ett undantag när du skapar andra barn skickar detta ett e-postmeddelande till e-post (som anges i[setup.xml](/docs/server-admin/deploy-install#setupxml)) och fortsätter med de andra barnen.
#### EDDGridSideBySide skelett XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridAggregateExistingDimension{#eddgridaggregateexistingdimension} 
[ **EDDGridAggregateExistingDimension** ](#eddgridaggregateexistingdimension)aggregat två eller fleraEDDGriddatamängder var och en har ett annat sortiment av värden för den första dimensionen, men identiska värden för de andra dimensionerna.

* Ett barndataset kan till exempel ha 366 värden (för 2004) för tidsdimensionen och ett annat barn kan ha 365 värden (2005 för 2005) för tidsdimensionen.
* Alla värden för alla andra dimensioner (Till exempel latitud, longitud) Måste vara identisk för alla barnen. Testets precision bestäms av[matchaxisNDigits](#matchaxisndigits).
* Sorterade dimensionsvärden - Värdena för varje dimension måste vara i sorterad ordning (Uppstigning eller nedstigning) . Värdena kan vara oregelbundet placerade. Det kan inte finnas några band. Detta är ett krav på[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Om någon dimensions värderingar inte är i sorterad ordning kommer datamängden inte att laddas ochERDDAP™identifiera det första osorterade värdet i loggfilen, *bigParentDirectory* /logs/log.txt.
    
Osorterade dimensionsvärden indikerar nästan alltid ett problem med källdatamängden. Detta sker oftast när en felaktig eller olämplig fil ingår i aggregeringen, vilket leder till en osorterad tidsdimension. För att lösa detta problem, se felmeddelandet iERDDAP™log.txt-fil för att hitta det kränkande tidsvärdet. Titta sedan i källfilerna för att hitta motsvarande fil (eller en före eller en efter) Det hör inte hemma i aggregeringen.
    
* Föräldradataset och barndatamängden MUST har olikadatasetIDs. Om några namn i en familj är exakt samma, kommer datamängden inte att laddas (med felmeddelandet att värdena på den aggregerade axeln inte är i sorterad ordning) .
* För närvarande måste barndatasatsen vara enEDDGridFromDap dataset och MUST har de lägsta värdena av den aggregerade dimensionen (vanligtvis den äldsta tiden värderar) . Alla andra barn måste vara nästan identiska dataset (skiljer sig bara i värdena för den första dimensionen) och specificeras av endast derassourceUrl.
* Den samlade datamängden får sin metadata från det första barnet.
* och[GenerateDatasets Xml program](#generatedatasetsxml)kan göra ett grovt utkast tilldatasets.xmlför enEDDGridAggregateExistingDimension baserat på en uppsättning filer som serveras av enHyraxeller THREDDS server. Använd till exempel denna input för programmet ("/1988" i webbadressen gör att exemplet går snabbare) Från:
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Du kan använda resultatet&lt;sourceUrl&gt; taggar eller ta bort dem och kommentera&lt;sourceUrltag (så att nya filer märks varje gång datamängden laddas om.
#### EDDGridAggregateExistingDimension skelett XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridKopiera{#eddgridcopy} 
[ **EDDGridKopiera** ](#eddgridcopy)Gör och upprätthåller en lokal kopia av en annanEDDGrid"S data och serverar data från den lokala kopian.

*   EDDGridKopiera (för tabular data,[EDDTableCopy](#eddtablecopy)) är mycket lätt att använda och en mycket effektiv
     **lösning på några av de största problemen med att betjäna data från en fjärrdatakälla:** 
    * Att komma åt data från en fjärrdatakälla kan vara långsamt.
        * Det kan vara långsamt eftersom det är i sig långsamt (en ineffektiv typ av server) ,
        * eftersom det är överväldigat av för många förfrågningar,
        * eller för att din server eller fjärrservern är bandbredd begränsad.
    * Fjärrdatasetet är ibland otillgängligt (igen, av olika skäl) .
    * Att förlita sig på en källa för data skalas inte bra (när många användare och mångaERDDAPAnvänd den) .
         
* Hur det fungerar -EDDGridKopiera löser dessa problem genom att automatiskt göra och upprätthålla en lokal kopia av data och betjäna data från den lokala kopian.ERDDAP™kan tjäna data från den lokala kopian mycket, mycket snabbt. Och att göra en lokal kopia lindrar bördan på fjärrservern. Och den lokala kopian är en säkerhetskopia av originalet, vilket är användbart om något händer med originalet.
    
Det finns inget nytt om att göra en lokal kopia av en dataset. Vad som är nytt här är att denna klass gör det\\*lätt\\*att skapa och\\*upprätthålla\\*en lokal kopia av data från en\\*variation\\*av typer av fjärrdatakällor och\\*Lägg till metadata\\*medan du kopierar data.
    
* Chunks of Data -EDDGridKopiera gör den lokala kopian av data genom att begära bitar av data från fjärrkontrollen&lt;dataset&gt; . Det kommer att finnas en bit för varje värde av den vänstra (Först först) axelvariabel.EDDGridKopiera litar inte på fjärrdatasatsens indexnummer för axeln - de kan ändras.
    
VARNING: Om storleken på en bit data är så stor (&gt; &gt; &gt; &gt; &gt; 2GB) att det orsakar problem,EDDGridKopiera kan inte användas. (Tyvärr hoppas vi ha en lösning för detta problem i framtiden.) 
    
*   \\[Ett alternativ tillEDDGridKopiera -
Om fjärrdata är tillgänglig via nedladdningsbara filer, inte en webbtjänst, använd[Cache FromUrl alternativet förEDDGridFrånFiles](#cachefromurl), vilket gör en lokal kopia av fjärrfilerna och tjänar data från de lokala filerna.\\]
* Lokala filer - Varje bit data lagras i en separatNetCDFfil i en underkatalog över *bigParentDirectory* /copy/ *datasetID* /// (som anges i[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Filenamer som skapats av axelvärden ändras för att göra dem filnamnssäkra (Hyphens ersätts till exempel med "x2D") Detta påverkar inte själva data.
     
* Nya data ----- Varje gångEDDGridKopiera laddas om, det kontrollerar fjärrkontrollen&lt;dataset&gt; för att se vilka bitar som finns tillgängliga. Om filen för en bit data inte redan finns, läggs en begäran om att få biten till i en kö.ERDDAP"S uppgiftThread processer alla köförfrågningar om bitar av data, en-för-en. Du kan se statistik för uppgiftenThreads aktivitet på[Status Page](/docs/server-admin/additional-information#status-page)och i[Daglig rapport](/docs/server-admin/additional-information#daily-report). (Ja, ja,ERDDAP™kan tilldela flera uppgifter till denna process, men det skulle använda upp massor av fjärrdatakällans bandbredd, minne och CPU-tid, och massor av lokalbefolkningen.ERDDAPBandbredd, minne och CPU-tid, ingen av dem är en bra idé.) 
    
NOTERA: Första gången enEDDGridKopiera är laddad, (Om allt går bra) Många förfrågningar om bitar av data kommer att läggas till i uppgiftThreads kö, men inga lokala datafiler kommer att ha skapats. Så konstruktören kommer att misslyckas men uppgiftThread kommer att fortsätta att fungera och skapa lokala filer. Om allt går bra kommer uppgiftenThread att göra några lokala datafiler och nästa försök att ladda om datamängden. (I ~15 minuter) kommer att lyckas, men först med en mycket begränsad mängd data.
    
OBS: När den lokala datamängden har lite data och visas i dinERDDAPOm fjärrdatamängden tillfälligt eller permanent inte är tillgänglig kommer den lokala datamängden fortfarande att fungera.
    
VARNING: Om fjärrdatamängden är stor och/eller fjärrservern är långsam (Det är problemet, eller hur?&#33;) Det tar lång tid att göra en komplett lokal kopia. I vissa fall är den tid som behövs oacceptabel. Till exempel överför 1 TB data över en T1-linje (0,15 GB/s) tar minst 60 dagar, under optimala förhållanden. Dessutom använder den massor av bandbredd, minne och CPU-tid på fjärr- och lokala datorer. Lösningen är att skicka en hårddisk till administratören av fjärrdatauppsättningen så att han / hon kan göra en kopia av datamängden och skicka hårddisken tillbaka till dig. Använd dessa data som utgångspunkt ochEDDGridKopiera kommer att lägga till data till det. (Det är ett sätt som[Amazons EC2 Cloud Service](https://aws.amazon.com/importexport/)hanterar problemet, även om deras system har massor av bandbredd.) 
    
VARNING: Om ett givet värde för vänster (Först först) axelvariabeln försvinner från fjärrdatamängden,EDDGridKopiera tar inte bort den lokala kopierade filen. Om du vill kan du ta bort det själv.
    
#### Grid Copy checkSource Datadatadata data{#grid-copy-checksourcedata} 
ochdatasets.xmlför denna dataset kan ha en valfri tagg
```
    <checkSourceData>true</checkSourceData>  
```
Standardvärdet är sant. Om/när du ställer in den till falsk, kommer datamängden aldrig att kontrollera källdatamängden för att se om det finns ytterligare data tillgängliga.

#### Bara Sedan{#onlysince} 
Du kan berättaEDDGridKopiera för att göra en kopia av en delmängd av källdatamängden, i stället för hela källdatamängden, genom att lägga till en tagg i formuläret&lt;endast Synd&gt; *vissa Värde* &lt;/onlySince&gt; till datasetetsdatasets.xmlchunk.EDDGridKopiera kommer endast att ladda ner datavärden relaterade till värdena i den första dimensionen. (vanligtvis tidsdimensionen) som är större än *vissa Värde* . *vissa Värde* Kan vara:
    * En relativ tid som anges vianow- *NUnits* .
Till exempel,&lt;endast Synd&gt;now-2 år&lt;/onlySince&gt; berättar datamängden för att bara göra lokala kopior av data för data där den yttre dimensionens värden (vanligtvis tidsvärden) inom de senaste två åren (som omvärderas varje gång datamängden laddas om, vilket är när den letar efter nya data för att kopiera) . Se[now- *NUnits* syntax beskrivning](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Detta är användbart om den första dimensionen har tidsdata, vilket den vanligtvis gör.
        
        EDDGridKopiera tar inte bort lokala datafiler som har data som med tiden blir äldre ännow- *NUnits* . Du kan ta bort dessa filer när som helst om du väljer att. Om du gör det rekommenderar vi starkt att du ställer in en[flagga](/docs/server-admin/additional-information#flag)När du raderar filerna för att berättaEDDGridKopiera för att uppdatera listan över cachade filer.
        
    * En fast tidpunkt som anges som en ISO 8601-strängyyyy-MM-ddTHH:mm:ssZ.
Till exempel,&lt;endastSedan&gt;2000-01-01T00:00:00&lt;/onlySince&gt; berättar datamängden bara för att göra lokala kopior av data där den första dimensionens värde är \\&gt;=2000-01-01T00:00:00Z. Detta är användbart om den första dimensionen har tidsdata, vilket den vanligtvis gör.
         
    * Ett flytande punktnummer.
Till exempel,&lt;endastSedan&gt;946684800.0&lt;/onlySince&gt; . Enheterna kommer att vara destinationsenheterna i den första dimensionen. Till exempel för tidsdimensioner, enheterna iERDDAP™är alltid"seconds since 1970-01-01T00:00:00Z". Så 946684800.0"seconds since 1970-01-01T00:00:00Z"motsvarar 2000-01-01T00:00:00Z. Detta är alltid ett användbart alternativ, men är särskilt användbart när den första dimensionen inte har tidsdata.

#### EDDGridKopiera rekommenderad användning{#eddgridcopy-recomended-use} 
1. Skapa&lt;Dataset&gt; Inträde (den ursprungliga typen, inteEDDGridKopiera) för fjärrdatakällan.
     **Få det att fungera korrekt, inklusive alla önskade metadata.** 
2. Om det är för långsamt, lägg till XML-kod för att linda den i enEDDGridKopiera dataset.
    * Använd en annandatasetID  (Kanske genom att ändradatasetIDav den gamladatasetIDLite) .
    * Kopiera&lt;tillgänglig tillgänglig Till&gt;,&lt;reloadEveryNMinutes &gt; och&lt;onChange &gt; från fjärrkontrollenEDDGridXML tillEDDGridCopys XML. (Deras värderingar förEDDGridKopiera materia; deras värderingar för den inre datamängden blir irrelevanta.) 
3.  ERDDAP™kommer att göra och upprätthålla en lokal kopia av data.
         
* Varning:EDDGridCopy förutsätter att datavärdena för varje bit aldrig förändras. Om/när de gör det måste du manuellt ta bort bitfilerna i *bigParentDirectory* /copy/ *datasetID* / som förändrats och[flagga](/docs/server-admin/additional-information#flag)datamängden som ska laddas om så att de borttagna bitarna kommer att ersättas. Om du har ett e-postabonnemang till datamängden får du två e-postmeddelanden: en när datamängden först laddas om och börjar kopiera data och en annan när datamängden laddas igen (automatiskt automatiskt) och upptäcker de nya lokala datafilerna.
     
* Alla axelvärden måste vara lika.
För var och en av yxorna utom den vänstra (Först först) Alla värden måste vara lika för alla barn. Testets precision bestäms av[matchaxisNDigits](#matchaxisndigits).
     
* Inställningar, metadata, variabler -EDDGridCopy använder inställningar, metadata och variabler från den slutna källdatamängden.
     
* Ändra metadata ----- Om du behöver ändra någonaddAttributeseller ändra beställningen av variablerna i samband med källdatamängden:
    1. Ändra förändringenaddAttributesför källdataset indatasets.xmlSom behövs.
    2. Ta bort en av de kopierade filerna.
    3. Ställ en[flagga](/docs/server-admin/additional-information#flag)för att ladda om datasetet omedelbart. Om du använder en flagga och du har en e-postadress till datamängden får du två e-postmeddelanden: en när datamängden först laddas om och börjar kopiera data och en annan när datamängden laddas igen (automatiskt automatiskt) och upptäcker de nya lokala datafilerna.
    4. Den borttagna filen kommer att regenereras med den nya metadata. Om källdatamängden någonsin är otillgänglig,EDDGridKopiera dataset kommer att få metadata från den regenererade filen, eftersom det är den yngsta filen.
#### EDDGridKopiera skelett XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromCassandra{#eddtablefromcassandra} 
[ **EDDTableFromCassandra** ](#eddtablefromcassandra)hanterar data från en[Cassandra](https://cassandra.apache.org/)tabell. Cassandra är en NoSQL-databas.

*   ERDDAP™kan arbeta med Cassandra v2 och v3 utan ändringar eller skillnader i installationen. Vi har testat med[Cassandra v2 och v3 från Apache](https://cassandra.apache.org/download/). Det är troligt attERDDAP™kan också arbeta med Cassandra hämtat från DataStax.
     
* För augusti 2019 - maj 2021 hade vi problem med att få Cassandra att arbeta med AdoptOpenJdkJavaDet kastade en EXCEPTION\\_ACCESS\\_VIOLATION). Men nu (maj 2021) Det problemet är borta: vi kan framgångsrikt använda Cassandra v2.1.22 och AdoptOpenJdk jdk8u292-b10.
     
#### Ett bord{#one-table} 
Cassandra stöder inte "gåvor" på det sätt som relationsdatabaser gör. EnERDDAP™EDDTableFromCassandra dataset kartor till en (Kanske en delmängd av en) Cassandra bord.

#### Cassandradatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™Kommer med CassandraJavaFöraren, så du behöver inte installera den separat.
* Läs noga all denna dokumentinformation om EDDTableFromCassandra. Några av detaljerna är mycket viktiga.
* CassandraJavaFöraren är avsedd att arbeta med Apache Cassandra (1.2+) och DataStax Enterprise (3.1+) . Om du använder Apache Cassandra 1.2.x måste du redigera cassandra.yaml-filen för varje nod för att ställa in start\\_native\\_transport: true, sedan starta om varje nod.
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det (särskilt&lt;Partition KeySourceNames &gt;] (#partitionkeysourcenames) ). Du kan samla det mesta av den information du behöver för att skapa XML för en EDDTableFromCassandra dataset genom att kontakta Cassandra administratören och genom att söka på webben.
    
GenerateDatasets Xml har två specialalternativ för EDDTableFromCassandra:
    
    1. Om du går in "&#33;&#33;&#33;" (Utan citat) för keyspace, programmet kommer att visa en lista över keyspaces
    2. Om du anger ett specifikt tangentrymd och sedan anger du "&#33;&#33;&#33;" (Utan citat) för tabellnamnet kommer programmet att visa en lista över tabeller i det tangentrymden och deras kolumner.
##### Fall känslighet{#case-sensitivity} 
* Case-insensitive Keyspace och tabellnamn -
Cassandra behandlar tangentrymder och tabellnamn på ett fallskänsligt sätt. På grund av detta måste du aldrig använda ett reserverat ord (men med ett annat fall) Som ett Cassandra keyspace eller tabellnamn.
* Case-insensitive Column Names
Som standard behandlar Cassandra kolumnnamn på ett fallskänsligt sätt. Om du använder ett av Cassandras reserverade ord som kolumnnamn (Snälla don't&#33;) Du måste använda
```
        <columnNameQuotes>"<columnNameQuotes>  
```
in idatasets.xmlför denna dataset så att Cassandra ochERDDAP™kommer att behandla kolumnnamnen på ett känsligt sätt. Detta kommer sannolikt att vara en massiv huvudvärk för dig, eftersom det är svårt att bestämma fallkänsliga versioner av kolumnnamnen - Cassandra visar nästan alltid kolumnnamnen som alla lägre fall, oavsett det verkliga fallet.
* Arbeta nära Cassandra-administratören, som kan ha relevant erfarenhet. Om datamängden inte laddas, läs[felmeddelande](#troubleshooting-tips)noga för att ta reda på varför.
         
#### Cassandra&lt;anslutning Fastighet & gt;{#cassandra-connectionproperty} 
Cassandra har anslutningsegenskaper som kan specificeras idatasets.xml. Många av dessa kommer att påverka resultatet av Cassandra-ERDDAP™anslutning. Tyvärr måste Cassandra-egenskaper ställas in programmatiskt iJavaSå, såERDDAP™måste ha kod för varje fastighetERDDAP™stöd. För närvarande,ERDDAP™stöder dessa egenskaper:
 (De standarder som visas är vad vi ser. Ditt systems standarder kan vara olika.) 

*    **Allmänna alternativ**   
    &lt;anslutning Fastighetsnamn =" **kompression** "&gt;&gt;&gt;&gt; *Ingen|LZ4|Snappy* &lt;/connection Fastigheter &gt; (case-insensitive, default=none)   
     (Allmänna kompressionsråd: använd "ingen" om sambandet mellan Cassandra ochERDDAP™är lokal/snabb och använder ”LZ4” om anslutningen är avlägsen/långsam.)   
    &lt;anslutning Fastighetsnamn =" **credentials** "&gt;&gt;&gt;&gt; *användarnamn/lösenord* &lt;/connection Fastigheter &gt; (Det är en bokstavlig'/')   
    &lt;anslutning Fastighetsnamn =" **Metrics** "&gt;&gt;&gt;&gt; *sanning sant|falska lögner* &lt;/connection Fastigheter &gt; (2021-01-25 var standard=true, nu ignorerad och alltid falsk)   
    &lt;anslutning Fastighetsnamn =" **Portport** "&gt;&gt;&gt;&gt; *AnInteger* &lt;/connection Fastigheter &gt; (standard för binärt binärt protokoll = 9042)   
    &lt;anslutning Fastighetsnamn =" **SSL** "&gt;&gt;&gt;&gt; *sanning sant|falska lögner* &lt;/connection Fastigheter &gt; (Default=False)   
     (Mitt snabba försök att använda ssl misslyckades. Om du lyckas, vänligen berätta hur du gjorde det.) 
*    **Query alternativ**   
    &lt;anslutning Fastighetsnamn =" **konsekvens Nivå** "&gt;&gt;&gt;&gt; *Alla alla|Alla|varje\\_quorum|lokala_one|lokala\\_quorum|lokala_serial|en|quorum|Serial|tre tre tre|två två* &lt;/connection Fastigheter &gt; (case-insensitive, default=ONE)   
    &lt;anslutning Fastighetsnamn =" **FetchSize** "&gt;&gt;&gt;&gt; *AnInteger* &lt;/connection Fastigheter &gt; (Standard=5000)   
     (Ställ inte fetchSize till ett mindre värde.)   
    &lt;anslutning Fastighetsnamn =" **SerialConsistencyLevel** "&gt;&gt;&gt;&gt; *Alla alla|Alla|varje\\_quorum|lokala_one|lokala\\_quorum|lokala_serial|en|quorum|Serial|tre tre tre|två två* &lt;/connection Fastigheter &gt; (fall-insensitiv, standard=SERIAL) 
*    **Socket Options**   
    &lt;anslutning Fastighetsnamn =" **connectTimeoutMillis** "&gt;&gt;&gt;&gt; *AnInteger* &lt;/connection Fastigheter &gt; (Standard=5000)   
     (Ställ inte anslut TimeoutMillis till ett mindre värde.)   
    &lt;anslutning Fastighetsnamn =" **KeepAlive** "&gt;&gt;&gt;&gt; *sanning sant|falska lögner* &lt;/connection Fastigheter &gt;
    &lt;anslutning Fastighetsnamn =" **LäsTimeoutMillis** "&gt;&gt;&gt;&gt; *AnInteger* &lt;/connection Fastigheter &gt;
     (Cassandras standardläsTimeoutMillis är 12000, menERDDAP™ändra standarden till 120000. Om Cassandra kastar läsTimeouts, ökar detta kanske inte hjälp, eftersom Cassandra ibland kastar dem före denna tid. Problemet är mer sannolikt att du lagrar för mycket data per partition Key kombination.)   
    &lt;anslutning Fastighetsnamn =" **motBufferSize** "&gt;&gt;&gt;&gt; *AnInteger* &lt;/connection Fastigheter &gt;
     (Det är oklart vad standarden mottarBufferSize är. Ställ inte detta till ett litet värde.)   
    &lt;anslutning Fastighetsnamn =" **Linger** "&gt;&gt;&gt;&gt; *AnInteger* &lt;/connection Fastigheter &gt;
    &lt;anslutning Fastighetsnamn =" **TcpNoDelay** "&gt;&gt;&gt;&gt; *sanning sant|falska lögner* &lt;/connection Fastigheter &gt; (Default=null) 

Om du behöver kunna ställa in andra anslutningsegenskaper, se vår[sektion om att få ytterligare stöd](/docs/intro#support).

För en viss start av Tomcat används anslutningProperties endast första gången en dataset skapas för en viss Cassandra-URL. Alla reloads av dataset och alla efterföljande dataset som delar samma URL kommer att använda de ursprungliga anslutningarna.
    
#### CQL{#cql} 
Cassandra Query Language (CQL) är ytligt som SQL, frågespråket som används av traditionella databaser. För därförOPeNDAP"S tabular dataförfrågningar var utformade för att efterlikna SQL-tabelldataförfrågningar, det är möjligt förERDDAP™konvertera tabular dataförfrågningar till CQL Bound/PreparedStatements.ERDDAP™loggar uttalandet i[Log.txt](/docs/server-admin/additional-information#log)som
Uttalande som text: *TheStatementAsText*   
Den version av uttalandet du ser kommer att vara en textrepresentation av uttalandet och kommer bara att ha "?" där begränsningar kommer att placeras.
       
Inte så enkelt - Tyvärr har CQL många restriktioner på vilka kolumner kan vara queried med vilka typer av begränsningar, till exempel partition nyckel kolumner kan begränsas med = och IN, så attERDDAP™skickar vissa begränsningar till Cassandra och tillämpar alla begränsningar efter att uppgifterna mottagits från Cassandra. Att hjälpaERDDAP™hantera effektivt med Cassandra, du måste ange [&lt;Partition KeySourceNames &gt;] (#partitionkeysourcenames) och [så]&lt;clusterColumnSourceNames&gt;] (#clustercolumnsourcenames) och [och]&lt;indexColumnSourceNames&gt;] (#indexcolumnsourcenames) in idatasets.xmlför denna dataset. Dessa är de viktigaste sätten att hjälpaERDDAP™arbeta effektivt med Cassandra. Om du inte berättarERDDAP™Denna information, datamängden kommer att vara smärtsamt långsam iERDDAP™Använd massor av Cassandra resurser.
     
#### &lt;Partition KeySourceNames & gt;{#partitionkeysourcenames} 
Eftersom partitionsnycklar spelar en central roll i Cassandra-borden,ERDDAP™behöver veta derassourceNameoch, i förekommande fall, annan information om hur man arbetar med dem.
* Du måste ange en komma-separerad lista över partition nyckelkälla kolumnnamn idatasets.xmlvia via via&lt;Partition KeySourceNames&gt;.
Enkelt exempel,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Mer komplext exempel,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp Partition Keys - Om en av partition nyckel kolumner är en tidsstämpel kolumn som har en grov version av en annan timestamp kolumn, ange detta via
     *partitionKeySourcName/otherColumnSourceName/time\\_precision*   
där vartime\\_precisionär en av[time\\_precision](#time_precision)strängar som används någon annanstans iERDDAP.
Spårningen Z itime\\_precisionsträng är standarden, så det spelar ingen roll omtime\\_precisionSträngen slutar i Z eller inte.
Till exempel,ERDDAP™tolka datum/sampletime/1970-01-01 som Begränsningar för datum kan konstrueras från begränsningar på provtid genom att använda dettatime\\_precision.” Den faktiska omvandlingen av begränsningar är mer komplex, men det är översikten.
     **Använd detta när det är relevant.** Den möjliggörERDDAP™att arbeta effektivt med Cassandra. Om detta förhållande mellan kolumner finns i ett Cassandra-bord och du inte berättarERDDAP™datamängden kommer att vara smärtsamt långsam iERDDAP™Använd massor av Cassandra resurser.
* Single Value Partition Keys - Om du vill ha enERDDAP™datamängd för att arbeta med endast ett värde av en partitionsnyckel, ange *partitionKeySourceName=värde* .
Använd inte citat för en numerisk kolumn, till exempel enhetid = 1007
Använd citat för en strängkolumn, till exempel stationid="Point Pinos"
* Dataset Standard Sort Order - Ordern för partitionsnyckeln&lt;dataVariable&gt;'s indatasets.xmlfastställer standardordningen för resultaten från Cassandra. Naturligtvis kan användarna begära en annan sorts order för en viss uppsättning resultat genom att godkänna ochorderBy (" *Sammanslagen lista över variabler* ") till slutet av deras fråga.
* Som standard, Cassandra ochERDDAP™behandla kolumnnamn på ett fallskänsligt sätt. Men om du ställer in[KolumnNameQuotes](#case-sensitivity)till ",ERDDAP™kommer att behandla Cassandra kolumnnamn på ett omkänsligt sätt.
         
#### &lt;Partition KeyCSV&gt;{#partitionkeycsv} 
Om detta anges,ERDDAP™Använd den istället för att be Cassandra om partitionen Nyckelinformation varje gång datamängden laddas om. Detta ger listan över distinkta partitionsnyckelvärden, i den ordning de ska användas. Tiderna måste anges som sekunder sedan 1970-01-01T00:00:00Z. Men det finns också två speciella alternativa sätt att ange tider (varje kodad som en sträng) Från:

1) Tid (AISO8601 Tid)   (Måste kodas som en sträng)   
2) "tider (anISO8601StartTime, strideSeconds, stoptime) " (Måste kodas som en sträng)   
Sluta stoppa Tid kan vara en ISO8601 Tid eller en "now-nUnits" tid (t.ex. "now-3 minuter") .
Sluta stoppa Tiden behöver inte vara en exakt match av start Tid + x stegandar.
En rad med en tid () värdet expanderas till flera rader före varje fråga, så listan över partition Nycklar kan alltid vara helt uppdaterade.
Till exempel,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
expanderar till denna tabell av partition nyckelkombinationer:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames & gt;{#clustercolumnsourcenames} 
Cassandra accepterar SQL-liknande begränsningar på klusterkolumner, som är kolumnerna som utgör den andra delen av primärnyckeln (efter partition nyckel (s) ) . Så det är viktigt att du identifierar dessa kolumner via&lt;KlusterColumnSourceNames&gt;. Detta möjliggörERDDAP™att arbeta effektivt med Cassandra. Om det finns klusterkolumner och du inte berättarERDDAPdatamängden kommer att vara smärtsamt långsam iERDDAP™Använd massor av Cassandra resurser.
    * Till exempel,&lt;KlusterColumnSourceNames&gt; *myClusterColumn1, myClusterColumn2* &lt;/ColumnSourceNames&gt;
    * Om ett Cassandra-bord inte har några klusterkolumner, ange inte heller&lt;clusterColumnSourceNames&gt;, eller ange det utan värde.
    * Som standard, Cassandra ochERDDAP™behandla kolumnnamn på ett fallskänsligt sätt. Men om du ställer in[KolumnNameQuotes](#case-sensitivity)till ",ERDDAP™kommer att behandla Cassandra kolumnnamn på ett känsligt sätt.
         
#### &lt;indexColumnSourceNames & gt;{#indexcolumnsourcenames} 
Cassandra accepterar'='begränsningar på sekundära index kolumner, som är de kolumner som du uttryckligen har skapat index för via
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Ja, parentes krävs.)   
Så det är mycket användbart om du identifierar dessa kolumner via&lt;indexColumnSourceNames&gt;. Detta möjliggörERDDAP™att arbeta effektivt med Cassandra. Om det finns indexkolumner och du inte berättarERDDAPVissa frågor kommer att vara onödigt, smärtsamt långsam iERDDAP™Använd massor av Cassandra resurser.
* Till exempel,&lt;indexColumnSourceNames&gt; *myIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNames&gt;
* Om ett Cassandra-bord inte har några indexkolumner, anger du heller inte&lt;indexColumnSourceNames&gt;, eller ange det utan värde.
* VARNING: Cassandra index är inte som databasindex. Cassandra index hjälper bara till med'='begränsningar. Och de är bara[rekommenderas](https://cassandra.apache.org/doc/latest/cql/indexes.html)för kolumner som har betydligt färre olika värden än totala värden.
* Som standard, Cassandra ochERDDAP™behandla kolumnnamn på ett fallskänsligt sätt. Men om du ställer in[KolumnNameQuotes](#case-sensitivity)till ",ERDDAP™kommer att behandla Cassandra kolumnnamn på ett känsligt sätt.
         
#### &lt;maxRequestFraction & gt;{#maxrequestfraction} 
När närERDDAP™  (Retur) laddar en dataset,ERDDAP™kommer från Cassandra listan över distinkta kombinationer av partitionsnycklarna. För en stor datamängd kommer antalet kombinationer att vara stort. Om du vill förhindra användares förfrågningar från att begära de flesta eller alla datamängder (eller till och med en förfrågan som frågarERDDAP™ladda ner de flesta eller alla data för att ytterligare filtrera den) Du kan berättaERDDAP™endast tillåta förfrågningar som minskar antalet kombinationer med viss mängd via&lt;maxRequestFraction&gt;, vilket är ett flytande punktnummer mellan 1e-10 (Det innebär att begäran inte kan behöva mer än en kombination på en miljard) och 1 (Standarden, vilket innebär att begäran kan vara för hela datamängden) .
Till exempel, om en dataset har 10000 distinkta kombinationer av partitionsnycklarna och maxRequestFraction är inställd på 0,1,
begär som behöver data från 1001 eller fler kombinationer kommer att generera ett felmeddelande,
Men förfrågningar som behöver data från 1000 eller färre kombinationer kommer att tillåtas.
    
I allmänhet, ju större datamängden, desto lägre bör du ställa in&lt;MaxRequestFraction&gt;. Så du kan ställa in den till 1 för en liten datamängd, 0,1 för en medelstor datamängd, 0,01 för en stor datamängd och 0.0001 för en stor datamängd.
    
Detta tillvägagångssätt är långt ifrån perfekt. Det kommer att leda till att några rimliga förfrågningar avvisas och några alltför stora förfrågningar är tillåtna. Men det är ett svårt problem och denna lösning är mycket bättre än ingenting.
    
#### CassandrasubsetVariables {#cassandra-subsetvariables} 
Som med andra EDDTable dataset kan du ange en komma-separerad lista över&lt;dataVariable&gt; &gt; &gt; &gt; &gt;destinationNamei ett globalt attribut som kallas "[subsetVariables](#subsetvariables)för att identifiera variabler som har ett begränsat antal värden. Datasetet kommer då att ha en .subset-webbsida och visa listor över distinkta värden för de variablerna i listrutor på många webbsidor.
    
Inklusive bara partition nyckelvariabler och statiska kolumner i listan är STRONGLY ENCOURAGED. Cassandra kommer att kunna generera listan över distinkta kombinationer mycket snabbt och enkelt varje gång datamängden laddas om. Ett undantag är tidsstämpelpartitionsnycklar som är grova versioner av någon annan tidsstämpelkolumn - det är nog bäst att lämna dessa ur listan översubsetVariablesEftersom det finns ett stort antal värden och de är inte särskilt användbara för användare.
    
Om du inkluderar icke-partition nyckel, icke-statiska variabler i listan, kommer det förmodligen att vara **väldigt mycket väldigt mycket** Beräkningsmässigt dyrt för Cassandra varje gång datamängden laddas om, eftersomERDDAP™måste titta igenom varje rad av datamängden för att generera informationen. Faktum är att frågan sannolikt kommer att misslyckas. Så, med undantag för mycket små datamängder, är detta starkt nedlagt.
    
#### Cassandra DataTyper{#cassandra-datatypes} 
För det finns viss tvetydighet om vilken[Cassandra datatyper](https://cassandra.apache.org/doc/latest/cql/types.html)karta till vilkenERDDAP™datatyper, du måste ange en [&lt;DataType&gt;] (#datatype) tag för var och en&lt;dataVariable&gt;] (#datavariable) Att berättaERDDAP™vilken datatyp som ska användas. StandardenERDDAP™Datadata data Typer (och de vanligaste motsvarande Cassandra-datatyperna) är:
    
*   [Boolean](#boolean-data)  (Boolean) somERDDAP™då butiker som byte
* Byte (int, om intervallet är -128 till 127) 
* kort kort kort kort (int, om området är -32768 till 32767) 
* Int (Int, counter?, Varint?, om intervallet är -2147483648 till 2147483647) 
* länge lång (bigint, counter?, varint?, om intervallet är -9223372036854775808 till 9223372036854775807) 
* Flyta (Flyta) 
* dubbel dubbel (Dubbel, Decimal (med möjlig förlust av precision) , timestamp) 
* Char (ascii eller text, om de aldrig har mer än 1 tecken) 
* String (ascii, text, varchar, inet, uuid, timeuid, blob, map, set, list?) 

Cassandras[timestamp](#cassandra-timestamp-data)är ett speciellt fall: användningERDDAPDubbeldata Typ.

Om du anger en String dataType iERDDAP™för en Cassandra-karta, inställd eller lista, kartan, inställd eller lista på varje Cassandra-rad konverteras till en enda sträng på en enda rad i raden.ERDDAP™tabell.ERDDAP™har ett alternativt system för listor, se nedan.

 *Typtyp* Listor -ERDDAPoch [så]&lt;DataType&gt;] (#datatype) tag för CassandradataVariables kan inkludera regelbundenERDDAP™Datadata data Typer (Se ovan) plus flera speciella datatyper som kan användas för Cassandra listkolumner: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, DoubleList, charList, StringList. När en av dessa listkolumner är i resultaten som överförs tillERDDAP™Varje rad av källdata kommer att utökas till listan. storlek storlek storlek storlek storlek storlek () rader av data iERDDAP; enkla data Typer (Till exempel int) i den källdata raden kommer att dupliceras listan. storlek storlek storlek storlek storlek storlek () gånger. Om resultaten innehåller mer än en listvariabel har alla listor på en viss rad data MÅSTE ha samma storlek och MÅSTE vara "parallella" listor, ellerERDDAP™kommer att generera ett felmeddelande. Till exempel för strömmätningar från en ADCP,
Djup\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]uCurrent\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]vCurrent\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]och zCurrent\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]är alla relaterade, och
Djup\\[1 1\\]uCurrent\\[1 1\\]vCurrent\\[1 1\\]och zCurrent\\[1 1\\]är alla relaterade, ...
Alternativt, om du inte villERDDAP™expandera en lista i flera rader iERDDAP™Tabell, ange String somdataVariables data Typ så att hela listan kommer att representeras som en sträng på en rad iERDDAP.
    
#### Cassandra TimeStamp Data{#cassandra-timestamp-data} 
Cassandras tidsstämpeldata är alltid medvetna om tidszoner. Om du anger tidsstämpeldata utan att ange en tidszon, antar Cassandra tidsstämpeln använder den lokala tidszonen.
    
ERDDAP™stöder tidsstämpeldata och presenterar alltid data iZuluGMT tidszon. Så om du anger tidsstämpeldata i Cassandra med en annan tidszon änZulu/GMT, kom ihåg att du måste göra alla frågor för tidsstämpel data iERDDAP™AnvändaZuluGMT tidszon. Så bli inte förvånad när tidsstämpelvärdena som kommer ut urERDDAPflyttas med flera timmar på grund av tidszonskiftet från lokal tillZuluGMT tid.

* InomERDDAP"Sdatasets.xmli den&lt;dataVariable&gt; tag för en timestamp variabel, set
```
          <dataType>double</dataType>  
```
och in&lt;addAttributes&gt; Sätt in
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Förslag: Om data är ett tidsintervall är det användbart att ha tidsstämpelvärdena hänvisar till centrum för det underförstådda tidsintervallet. (Till exempel, middag) . Till exempel, om en användare har data för 2010-03-26T13:00Z från en annan datamängd och de vill ha närmaste data från denna Cassandra datamängd som har data för varje dag, sedan data för 2010-03-26T12:00Z (representerar Cassandra-data för det datumet) är uppenbarligen bäst (i motsats till midnatt före eller efter, där det är mindre uppenbart vilket är bäst) .
*   ERDDAP™har ett verktyg för[Konvertera en numerisk Dags att/från en strängtid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Se[Hur hurERDDAP™Erbjudanden med tiden](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
#### Integer nulls{#integer-nulls} 
Cassandra stöder nulls i Cassandra int (ERDDAP™Int) och bigint (ERDDAP™länge lång) kolumner, menERDDAP™Stöder inte riktiga nulls för någon integer datatyp.
Som standard, Cassandra integer nulls kommer att konverteras iERDDAP™till 2147483647 för int kolumner, eller 9223372036854775807 för långa kolumner. Dessa kommer att visas som "NaN" i vissa typer av textutgångsfiler (Till exempel .csv) "" i andra typer av textutgångsfiler (till exempel,.htmlTable) och det specifika numret (2147483647 för saknade värden) i andra typer av filer (Till exempel binära filer som.ncoch matta) . En användare kan söka efter rader av data med denna typ av saknad värde genom att hänvisa till "NaN", t.ex. "&windSpeed=NaN".
    
Om du använder något annat heltalsvärde för att ange saknade värden i ditt Cassandra-bord, vänligen identifiera det värdet idatasets.xmlFrån:

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

För Cassandra flytande punkt kolumner, nulls omvandlas till NaNs iERDDAP. För Cassandra datatyper som konverteras till Strings inERDDAP™Nulls blir konverterade till tomma strängar. Det borde inte vara ett problem.
    
#### "VARNING: Förberedande redan förberedd fråga"{#warning-re-preparing-already-prepared-query} 
* "VARNING: Re-preparing redan förberedd fråga" *Tomcat* /logs/catalina.out (eller någon annan Tomcat-loggfil)   
Cassandra-dokumentationen säger att det finns problem om samma fråga görs till en förberedd stat två gånger. (eller mer) . (Se detta[bug report](https://datastax-oss.atlassian.net/browse/JAVA-236).) För att undvika att göra Cassandra galen,ERDDAP™caches all PreparedStatements så att den kan återanvända dem. Denna cache förloras om/när Tomcat/ERDDAP™omstartas, men jag tror att det är okej eftersom förberedelserna är förknippade med en viss session. (mellanJavaoch Cassandra) Det är också förlorat. Så du kan se dessa meddelanden. Jag känner ingen annan lösning. Lyckligtvis är det en varning, inte ett fel (Även om Cassandra hotar att det kan leda till problem med prestanda) .
    
Cassandra hävdar att förberedda stater är bra för alltid, såERDDAP"S cached PreparedStatements bör aldrig bli out-of-date/invalid. Om det inte är sant, och du får fel om vissa PreparedStatements är out-of-date / ogiltig, måste du starta omERDDAP™att klargöraERDDAPCache of PreparedStatements.
    
#### Cassandra säkerhet{#cassandra-security} 
Se[Säkra Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html)

När du arbetar med Cassandra måste du göra saker så säkert och säkert som möjligt för att undvika att en skadlig användare kan skada din Cassandra eller få tillgång till data som de inte borde ha tillgång till.ERDDAP™försöker göra saker på ett säkert sätt också.

* Vi uppmuntrar dig att inrättaERDDAP™att ansluta till Cassandra som en Cassandra-användare som bara har tillgång till **relevant** Tabellbord (s) och endast har READ privilegier.
* Vi uppmuntrar dig att upprätta anslutningen frånERDDAP™till Cassandra så att det
    * Använd alltid SSL,
    * endast tillåter anslutningar från en IP-adress (eller ett block av adresser) och från denERDDAP™användare och
    * endast överför lösenord i deras MD5 hashed form.
*   \\[Knulla PROBLEM\\]AnslutningenProperties (inklusive lösenordet&#33;) lagras som vanlig text idatasets.xml. Vi har inte hittat ett sätt att låta administratören ange lösenordet Cassandra underERDDAPStartup i Tomcat (som sker utan användarinmatning) Så lösenordet måste vara tillgängligt i en fil. För att göra detta säkrare:
    * Du du (ochERDDAP™Administratör) bör vara ägaren tilldatasets.xmloch har READ och WRITE access.
    * Gör en grupp som bara innehåller användar=tomcat. Använd chgrp för att göra gruppen fördatasets.xmlmed bara READ privilegier.
    * Använd chmod för att tilldela o-rwx privilegier (Ingen READ eller WRITE-åtkomst för "andra" användare) Fördatasets.xml.
* När inERDDAP™lösenordet och andra anslutningsegenskaper lagras i "privat"Javavariabler.
* Begäran från kunderna är parsed och kontrolleras för giltighet innan de genererar CQL-förfrågningar för Cassandra.
* Begäran om Cassandra görs med CQL Bound/PreparedStatements, för att förhindra CQL-injektion. Cassandra är i sig mindre mottaglig för CQL-injektion än traditionella databaser.[SQL injektion](https://en.wikipedia.org/wiki/SQL_injection).
         
#### Cassandra hastighet{#cassandra-speed} 
Cassandra kan vara snabb eller långsam. Det finns några saker du kan göra för att göra det snabbt:
* I allmänhet -
CQL:s natur är att frågor är[deklarativt](https://en.wikipedia.org/wiki/Declarative_programming). De specificerar bara vad användaren vill ha. De innehåller inte en specifikation eller tips för hur frågan ska hanteras eller optimeras. Så det finns inget sätt förERDDAP™för att skapa frågan på ett sådant sätt att det hjälper Cassandra att optimera frågan (eller på något sätt specificerar hur frågan ska hanteras) . I allmänhet är det upp till Cassandra-administratören att ställa upp saker. (till exempel index) optimera för vissa typer av frågor.
     
* Anger tidsstämpelkolumner som är relaterade till grovprecisionstidstämpelpartitionsnycklar via [&lt;Partition KeySourceNames &gt;] (#partitionkeysourcenames) är det viktigaste sättet att hjälpaERDDAP™arbeta effektivt med Cassandra. Om detta förhållande finns i ett Cassandra-bord och du inte berättarERDDAP™datamängden kommer att vara smärtsamt långsam iERDDAP™Använd massor av Cassandra resurser.
     
* Ange klusterkolumnerna via [&lt;clusterColumnSourceNames&gt;] (#clustercolumnsourcenames) Det näst viktigaste sättet att hjälpaERDDAP™arbeta effektivt med Cassandra. Om det finns klusterkolumner och du inte berättarERDDAPEn stor delmängd av de möjliga frågorna för data kommer att vara onödigt, smärtsamt långsam iERDDAP™Använd massor av Cassandra resurser.
     
* Gör[Index](https://cassandra.apache.org/doc/latest/cql/indexes.html)För vanliga begränsade variabler -
Du kan påskynda några frågor genom att skapa index för Cassandra-kolumner som ofta begränsas med "=" begränsningar.
    
Cassandra kan inte göra index för lista, ställa in eller kartlägga kolumner.
    
* Ange indexkolumnerna via [&lt;indexColumnSourceNames&gt;] (#indexcolumnsourcenames) är ett viktigt sätt att hjälpaERDDAP™arbeta effektivt med Cassandra. Om det finns indexkolumner och du inte berättarERDDAPVissa frågor för data kommer att vara onödigt, smärtsamt långsam iERDDAP™Använd massor av Cassandra resurser.
     
#### Cassandra Stats{#cassandra-stats} 
*   ["Cassandra statistik" Diagnostiska meddelanden](#cassandra-stats)----- För varjeERDDAP™användarfråga till en Cassandra dataset,ERDDAP™kommer att skriva ut en linje i loggfilen, *bigParentDirectory* /logs/log.txt, med viss statistik relaterad till frågan, till exempel
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Med hjälp av siffrorna i exemplet ovan betyder detta:

* När närERDDAP™Sista sista (Retur) laddade denna dataset, berättade CassandraERDDAP™att det fanns 10000 distinkta kombinationer av partitionsnycklarna.ERDDAP™cachade alla distinkta kombinationer i en fil.
* på grund av användarens begränsningar,ERDDAP™identifiera 2 kombinationer av 10000 som kan ha önskad data. Så,ERDDAP™kommer att göra 2 samtal till Cassandra, en för varje kombination av partitionsnycklarna. (Det är vad Cassandra kräver.) Det är uppenbart att det är besvärligt om en stor datamängd har ett stort antal kombinationer av partitionsnycklarna och en viss begäran inte drastiskt minskar det. Du kan kräva att varje förfrågan minskar nyckelutrymmet genom att ange [&lt;MaxRequestFraction &gt;] (#maxrequestfraction) . Här 2/10000=2e-4, vilket är mindre än maxRequestFraction (0.1) Så begäran var tillåten.
* Efter att ha tillämpat begränsningarna på partitionsnycklarna,[Klusterkolumner](#clustercolumnsourcenames)och[index kolumner](#indexcolumnsourcenames)som sändesERDDAP™Cassandra återvände 1200 rader data tillERDDAP™i ResultSet.
* Resultatet Set måste ha haft[Datadata data Typ = *Sometype* Lista List](#cassandra-datatypes)Kolumner (med i genomsnitt 10 objekt per lista) för attERDDAP™expanderade 1200 rader från Cassandra till 12000 rader iERDDAP.
*   ERDDAP™All användarens begränsningar gäller alltid uppgifterna från Cassandra. I detta fall hade begränsningar som Cassandra inte hanterat minskat antalet rader till 7405. Det är antalet rader som skickas till användaren.

Den viktigaste användningen av dessa diagnostiska meddelanden är att se till attERDDAP™gör vad du tror att det gör. Om det inte är (Till exempel minskar det inte antalet distinkta kombinationer som förväntat?) Då kan du använda informationen för att försöka lista ut vad som går fel.
 
* Forskning och experiment för att hitta och sätta bättre&lt;anslutningProperty &gt;] (#cassandra-connectionproperty) s.
 
* Kontrollera hastigheten på nätverksanslutningen mellan Cassandra ochERDDAP. Om anslutningen är långsam, se om du kan förbättra den. Den bästa situationen är närERDDAP™körs på en server som är knuten till samma (Snabbt) växla när servern kör Cassandra-noden som du ansluter till.
 
* Var tålmodig. Läs informationen här och i Cassandra-dokumentationen noggrant. Experiment. Kontrollera ditt arbete. Om CassandraERDDAP™anslutning är fortfarande långsammare än du förväntar dig, vänligen inkludera ditt Cassandra-bords schema och dittERDDAP™chunk avdatasets.xmloch se vår[sektion om att få ytterligare stöd](/docs/intro#support).
 
* Om allt annat misslyckas,
överväga att lagra data i en samling avNetCDFv3.ncfiler filer (Särskilt speciellt.ncfiler som använder[CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)sammanhängande Ragged Array datastrukturer och så kan hanteras medERDDAP"S[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) . Om de är logiskt organiserade (var och en med data för en bit av utrymme och tid) ,ERDDAP™kan utvinna data från dem mycket snabbt.
         
#### EDDTableFromCassandra skelett XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDapSequence{#eddtablefromdapsequence} 
[ **EDDTableFromDapSequence** ](#eddtablefromdapsequence)hanterar variabler inom 1- och 2-nivåsekvenser från[DAP](https://www.opendap.org/)servrar somDAPPER (var på https://www.pmel.noaa.gov/epic/software/dapper/ Nu avbröt) .

* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det. Du kan samla den information du behöver genom att titta på källdatasetets DDS- och DAS-filer i din webbläsare (genom att lägga till .das och .dds till källdatasetetsourceUrlEtt exempel var på https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* En variabel är i enDAPsekvens om .dds-responsen indikerar att datastrukturen som håller variabeln är en "sekvens" (fall okänslig) .
* I vissa fall kommer du att se en sekvens inom en sekvens, en 2-nivå sekvens - EDDTableFromDapSequence hanterar dessa också.
#### EDDTableFromDapSequence skelett XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDatabase{#eddtablefromdatabase} 
[ **EDDTableFromDatabase** ](#eddtablefromdatabase)hanterar data från en relationsdatabastabell eller[utsikt](https://en.wikipedia.org/wiki/View_(database)).

#### En tabell eller utsikt{#one-table-or-view} 
Om data du vill tjäna finns i två eller flera tabeller (och därmed behöver en JOIN för att extrahera data från båda tabellerna samtidigt) Du måste göra en[Denormaliserad](https://en.wikipedia.org/wiki/Denormalization)  (redan gått) tabell eller[utsikt](https://en.wikipedia.org/wiki/View_(SQL)) med alla data som du vill göra tillgängliga som en dataset iERDDAP.

För stora komplexa databaser kan det vara meningsfullt att separera flera bitar som denormaliserade tabeller, var och en med en annan typ av data, som kommer att bli separata datamängder.ERDDAP.

Gör en denormaliserad tabell för användning iERDDAP™Kan låta som en galen idé för dig. Vänligen lita på oss. Det finns flera anledningar till varförERDDAP™arbetar med denormaliserade tabeller:

* Det är mycket lättare för användare.
När närERDDAP™presenterar dataset som en, enkel, denormaliserad, enstaka tabell, det är mycket lätt för alla att förstå data. De flesta användare har aldrig hört talas om normaliserade tabeller, och mycket få förstår nycklar, utländska nycklar eller tabellförening, och de vet nästan säkert inte detaljerna i de olika typerna av förening, eller hur man specificerar SQL för att göra en förening. (eller flera anslutningar) korrekt. Att använda en denormaliserad tabell undviker alla dessa problem. Detta skäl ensam motiverar användningen av en denormaliserad enstaka tabell för presentation av en datamängd för attERDDAP™användare.
     
* Normaliserade tabeller (flera tabeller relaterade till nyckelkolumner) är bra för att lagra data i en databas.
Men även i SQL är resultatet som returneras till användaren en denormaliserad (Förenade) Enstaka bord. Så det verkar rimligt att presentera datamängden för användare som en stor, denormaliserad, enstaka tabell från vilken de sedan kan begära delmängder. (t.ex. visa mig rader av bordet där temperaturen 30 30 30 30) .
     
* Du kan göra ändringar förERDDAP™utan att ändra dina tabeller.
    ERDDAP™har några krav som kan skilja sig från hur du har ställt in din databas.
Till exempel,ERDDAP™kräver att tidsstämpeldata lagras i fält med tidszon.
Genom att göra en separat tabell/vy förERDDAP™Du kan göra dessa ändringar när du gör det denormaliserade bordet förERDDAP. Därför behöver du inte göra några ändringar i dina tabeller.
     
*   ERDDAP™kommer att återskapa några av de normaliserade tabellernas struktur.
Du kan ange vilka kolumner data som kommer från tabellerna "yttre" och därför har ett begränsat antal olika värden.ERDDAP™samla alla de olika kombinationerna av värden i dessa kolumner och presentera dem för användare på en speciell. subset webbsida som hjälper användare att snabbt välja delmängder av datamängden. De distinkta värdena för varje kolumn visas också i nedgångslistor på datasetets andra webbsidor.
     
* En denormaliserad tabell gör data hand-off från dig tillERDDAPadministratör lätt.
Du är expert på denna datamängd, så det är vettigt att du fattar besluten om vilka tabeller och vilka kolumner du ska gå med och hur du går med dem. Så du behöver inte lämna oss (Eller värre, slutanvändarna) flera tabeller och detaljerade instruktioner för hur du går med dem, du behöver bara ge oss tillgång till det denormaliserade bordet.
     
* En denormaliserad tabell möjliggör effektiv åtkomst till data.
Den denormaliserade formen är oftast snabbare att komma åt än den normaliserade formen. Gå med kan vara långsam. Flera anslutningar kan vara mycket långsamma.
     

För att få data från två eller flera tabeller i databasen tillERDDAP™Det finns tre alternativ:
 

* Rekommenderat alternativ:
Du kan skapa en komma- eller flik-separerad värdefil med data från den denormaliserade tabellen.
Om datamängden är stor, är det meningsfullt att skapa flera filer, var och en med en sammanhängande delmängd av den denormaliserade tabellen. (till exempel data från ett mindre tidsintervall) .
    
Den stora fördelen här är attERDDAP™kommer att kunna hantera användarförfrågningar om data utan vidare ansträngning av databasen. SåERDDAP™Bli inte en börda i databasen eller en säkerhetsrisk. Detta är det bästa alternativet under nästan alla omständigheter eftersomERDDAP™kan vanligtvis få data från filer snabbare än från en databas (Om vi konverterar .csv-filerna till.ncCF filer) . (En del av anledningen är attERDDAP+files är ett lättläst system och behöver inte hantera ändringar när du tillhandahåller[ACID](https://en.wikipedia.org/wiki/ACID)  (Atomicitet, konsistens, isolering, hållbarhet) .) Du behöver förmodligen inte en separat server eftersom vi kan lagra data på en av våra RAID och komma åt den med en befintligERDDAP™på en befintlig server.
    
* Okej Alternativ:
Du ställer in en ny databas på en annan dator med bara det denormaliserade bordet.
Eftersom databasen kan vara en gratis och öppen källkodsdatabas som MariaDB, MySQL och PostgreSQL, behöver det här alternativet inte kosta mycket.
    
Den stora fördelen här är attERDDAP™kommer att kunna hantera användarförfrågningar om data utan vidare ansträngning av din nuvarande databas. SåERDDAP™Bli inte en börda i din nuvarande databas. Detta eliminerar också många säkerhetsproblem eftersomERDDAP™inte har tillgång till din nuvarande databas.
    
* Discouraged Option:
Vi kan anslutaERDDAP™till din nuvarande databas.
För att göra detta måste du:
    
    * Skapa en separat tabell eller visa med den denormaliserade tabellen över data.
    * Skapa en "erddap" -användare som endast har tillgång till den denormaliserade tabellen (s) .
         
    
Detta är ett alternativ om data ändras mycket ofta och du vill geERDDAP™användare omedelbar tillgång till dessa ändringar, men även så, kan det vara meningsfullt att använda filalternativet ovan och periodiskt (Var 30 minuter?) ersätta den fil som har dagens data.
De stora nackdelarna med denna strategi är attERDDAP™Användarförfrågningar kommer sannolikt att placera en outhärdligt stor börda på din databas och attERDDAP™anslutning är en säkerhetsrisk (Även om vi kan minimera/hantera risken) .

Gör den denormaliserade tabellen eller vyn förERDDAP™är ett bra tillfälle att göra några förändringar somERDDAP™behov, på ett sätt som inte påverkar dina ursprungliga tabeller:

* Ändra datum och tidsstämpelfält / kolumner för att använda datatypen som Postgres kallar[timestamp med tidszon](#database-date-time-data)  (eller motsvarande i databasen) .
Tidsstämplar utan tidszoninformation fungerar inte korrekt iERDDAP.
* Gör index för kolumnerna som användare ofta söker.
* Var mycket medveten om[fallet med fält/kolumnnamn](#quotes-for-names-and-case-sensitivity)  (Till exempel, använd alla lowcase) När du skriver dem.
* Använd inte reserverade ord för tabellen och för fält/kolumnnamnen.

Om du behöver hjälp med att göra den denormaliserade tabellen eller visa, vänligen kontakta din databasadministratör.
Om du vill prata om hela detta tillvägagångssätt eller strategisera hur du bäst kan göra det, vänligen maila Chris. John på noaa.gov.
    
#### Databas idatasets.xml {#database-in-datasetsxml} 
Det är svårt att skapa rättdatasets.xmlinformation som behövs förERDDAP™för att upprätta en anslutning till databasen. Var tålmodig. Var metodisk.
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
        
GenerateDatasets Xml har tre särskilda alternativ för EDDTableFromDatabase:
1. Om du går in "&#33;&#33;&#33;" (Utan citat) för katalognamnet kommer programmet att visa en lista över katalognamnen.
2. Om du går in "&#33;&#33;&#33;" (Utan citat) för schemanamnet kommer programmet att visa en lista över schemanamnen.
3. Om du går in "&#33;&#33;&#33;" (Utan citat) för tabellnamnet kommer programmet att visa en lista över tabeller och deras kolumner. Den första "&#33;&#33;&#33;LIST&#33;&#33;&#33;" inträde som du gör är den som kommer att användas.
* Läs noga all denna dokumentinformation om EDDTableFromDatabase.
* Du kan samla det mesta av den information du behöver för att skapa XML för en EDDTableFromDatabase dataset genom att kontakta databasadministratören och genom att söka på webben.
* Även om databaser ofta behandlar kolumnnamn och tabellnamn på ett känsligt sätt, är de känsliga i fall.ERDDAP. Om ett felmeddelande från databasen säger att ett kolumnnamn är okänt (Till exempel "Okänd identifierare = " *Kolumn\\_name* """) Även om du vet att det finns, försök att använda alla kapital, till exempel. *COLUMN NAME* , vilket ofta är den sanna, fallkänsliga versionen av kolumnnamnet.
* Arbeta nära databasadministratören, som kan ha relevant erfarenhet. Om datamängden inte laddas, läs[felmeddelande](#troubleshooting-tips)noga för att ta reda på varför.
         
#### JDBC Driver{#jdbc-driver} 
* JDBC Driver och&lt;FörareName&gt;] (#jdbc-driver) ----- Du måste få lämplig JDBC 3 eller JDBC 4-drivrutin .jar-fil för din databas och
Sätt in den *Tomcat* /webapps/erddap/WEB-INF/lib efter installationERDDAP. Sedan, i dindatasets.xmlför denna dataset måste du ange&lt;chaufförnamn&gt; för den här föraren, som är (Tyvärr) från filnamnet. Sök på webben för JDBC-drivrutinen för din databas och förarenNamn somJavamåste använda den.
    
    * För MariaDB, försök[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
och&lt;FörarenName&gt; att använda idatasets.xml  (Se nedan) är förmodligen org.mariadb.jdbc. Driver.
    * För MySQL och Amazon RDS, försök[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
och&lt;FörarenName&gt; att använda idatasets.xml  (Se nedan) är förmodligen com.mysql.jdbc. Driver.
    * FörOracleFörsök[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).
och&lt;FörarenName&gt; att använda idatasets.xml  (Se nedan) är förmodligen oracle.jdbc.driver.OracleFörare.
    * För Postgresql fick vi JDBC 4-föraren från[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
och&lt;FörarenName&gt; att använda idatasets.xml  (Se nedan) är förmodligen org.postgresql. Driver.
    * För SQL Server kan du få JTDS JDBC-drivrutinen från[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net).
och&lt;FörarenName&gt; att använda idatasets.xml  (Se nedan) är förmodligen net.sourceforge.jtds.jdbc. Driver.
    
När du har lagt JDBC-föraren .jar inERDDAP™lib katalog, du måste lägga till en referens till den .jar filen i .bat och/eller .sh script filer för GenerateDatasets Xml, DasDds och ArchiveADataset som finns i *Tomcat* /webapps/erddap/WEB-INF/-katalogen; annars får du en ClassNotFoundException när du kör dessa skript.
    
Tyvärr är JDBC ibland källan till problem. I sin roll som mellanhand mellanERDDAP™och databasen gör det ibland subtila ändringar i standard/generisk databas SQL-förfrågan.ERDDAP™skapar och därigenom orsakar problem (till exempel relaterade till[Övre/lowercase identifierare](#quotes-for-names-and-case-sensitivity)och relaterad till[datum/tidszoner](#database-date-time-data)) . Var tålmodig, läs informationen här noggrant, kontrollera ditt arbete och se vår[sektion om att få ytterligare stöd](/docs/intro#support).
    
#### Databas&lt;anslutning Fastighet & gt;{#database-connectionproperty} 
* [Och [Gud]&lt;anslutningProperty &gt;] (#database-connectionEgendom) ----- I dendatasets.xmlFör din dataset måste du definiera flera anslutningar Fastighetstaggar för att berättaERDDAP™Hur du ansluter till din databas (till exempel för att ange användarnamn, lösenord, ssl-anslutning och[Fetch storlek](#set-the-fetch-size)) . Dessa är olika för varje situation och är lite svåra att räkna ut. Sök på webben för exempel på att använda en JDBC-drivrutin för att ansluta till databasen. och&lt;anslutningProperty &gt; namn (Till exempel "användare", "lösenord" och "ssl") , och några av anslutningenProperty värden kan hittas genom att söka på webben för "JDBC anslutning egenskaper *Databasdata Typ* " (till exempel,OracleMySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Citat för namn och fall känslighet{#quotes-for-names-and-case-sensitivity} 
*   [Citat för fält / kolumnnamn; fall känslighet](#quotes-for-names-and-case-sensitivity)- Som standard, EDDTableFromDatabase sätter ANSI-SQL-standard dubbla citat runt fält / kolumnnamn i SELECT uttalanden om du har använt ett reserverat ord som ett fält / kolumnnamn eller en speciell karaktär i ett fält / kolumnnamn. De dubbla citaten hindrar också vissa typer av SQL-injektionsattacker. Du kan berättaERDDAP™att använda "," eller inga citat via&lt;kolumnNameQuotes&gt; in idatasets.xmlför denna dataset.
    
För många databaser, med någon typ av citat orsakar databasen att arbeta med fält / kolumnnamn på ett känsligt sätt (istället för standarddatabasfallet okänsligt sätt) . Databaser visar ofta fil/kolumnnamn som alla övre fall, när det i verkligheten är känslig form. InomERDDAP™Behandla alltid databas kolumnnamn som fallkänsliga.
    
    * För Maria DB, du måste köra databasen med[\\-sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/).
    * För MySQL och Amazon RDS måste du köra databasen med[\\-sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes).
    *   OracleStöder ANSI-SQL-standard dubbla citat[Som standard](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    * PostgreSQL stöder ANSI-SQL-standard dubbel citat som standard.
    
      
Använd inte ett reserverat ord för en databas, katalog, schema eller tabellens namn.ERDDAP™inte sätta citat runt dem.
    
Om möjligt, använd alla nedre fall för databas, katalog, schema, tabellnamn och fältnamn när du skapar databastabellen (eller visa) och när man hänvisar till fält/kolumnnamnen idatasets.xmlin iERDDAP. Annars kan du få ett felmeddelande som säger att databasen, katalogen, schemat, tabellen och / eller fältet inte hittades. Om du får det felmeddelandet, prova att använda den känsliga versionen, all övre fallversion och all nedre version av namnet iERDDAP. En av dem kan fungera. Om inte, måste du ändra namnet på databasen, katalogen, schemat och/eller tabellen till allt lägre fall.
    
#### Databas&lt;Datadata data Type & gt;{#database-datatype} 
*   [Databas](#database-datatype)[Och [Gud]&lt;DataType&gt;] (#datatype) Taggar - För det finns viss tvetydighet om vilken[Datatyper data](https://www.w3schools.com/sql/sql_datatypes_general.asp)karta till vilkenERDDAP™datatyper, du måste ange en [&lt;DataType&gt;] (#datatype) tag för var och en&lt;dataVariable&gt;] (#datavariable) Att berättaERDDAP™vilken datatyp som ska användas. En del av problemet är att olika datamängder använder olika termer för olika datatyper - så försök alltid att matcha definitionerna, inte bara namnen. Se beskrivningen av[standardERDDAP™Datadata data Typer](#data-types)som innehåller hänvisningar till motsvarande SQL-datatyper.[Datum och timestamp](#database-date-time-data)är speciella fall: användningERDDAPDubbeldata Typ.
     
#### Databasdatum tidsdata{#database-date-time-data} 
Vissa databas datum kolumner har ingen explicit tidszon. Sådana kolumner är problem förERDDAP. Databaser stöder begreppet ett datum (med eller utan tid) utan tidszon, som ett ungefärligt tidsintervall. MenJava  (och därmedERDDAP) Det handlar bara om omedelbara datum + tider med en tidszon. Så du kanske vet att datumtidsdata baseras på en lokal tidszon (med eller utan dagsljus spara tid) eller GMT/Zulutidszon, menJava  (ochERDDAP) Inte. Vi trodde ursprungligen att vi kunde arbeta kring detta problem (t.ex. genom att ange en tidszon för kolumnen) men databasen+JDBC+Javainteraktioner gjorde detta till en opålitlig lösning.
* Så,ERDDAP™kräver att du lagrar alla datum- och datumtidsdata i databastabellen med en datatyp som motsvarar JDBC-typen "timestamp med tidszon" (Den använder GMT/ZuluTidszon) .
* InomERDDAP"Sdatasets.xmli den&lt;dataVariable&gt; tag för en timestamp variabel, set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

och in&lt;addAttributes&gt; Sätt in
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Förslag: Om data är ett tidsintervall är det användbart att ha tidsstämpelvärdena hänvisar till centrum för det underförstådda tidsintervallet. (Till exempel, middag) . Om en användare till exempel har data för 2010-03-26T13:00Z från en annan dataset och de vill ha de närmaste data från en dataset som har data för varje dag, då databasdata för 2010-03-26T12:00Z (representera data för det datumet) är uppenbarligen bäst (i motsats till midnatt före eller efter, där det är mindre uppenbart vilket är bäst) .
*   ERDDAP™har ett verktyg för[Konvertera en numerisk Dags att/från en strängtid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Se[Hur hurERDDAPErbjudanden med tiden](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
       
#### Integer nulls{#integer-nulls-1} 
Databaser stöder nulls i heltal (Int, Smallint, tinyint) kolumner, menERDDAP™Stödjer inte riktiga nulls.
Databas nulls kommer att konverteras iERDDAP™127 för byte kolumner, 255 för ubyte kolumner, 32767 för korta kolumner, 65535 för ushort kolumner, 2147483647 för int kolumner, 4294967295 för uint kolumner, 9,223,372,036,854,775,807 för långa kolumner, eller 18446744073709551615 för ulong kolumner. Om du använder dessa standarder, vänligen identifiera demmissing\\_values för datasetets användare iERDDAP™med

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

eller

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Alternativt kan du använda "missing\\_valueattribut istället för "\\_FillValue".
GenerateDatasets Xml lägger automatiskt till dessa \\_FillValue-attribut när den genererar de föreslagnadatasets.xmlför dataset i databasen.

För databas flytande punkt kolumner, nulls konverteras till NaNs iERDDAP.
För datatyper som konverteras till Strings inERDDAP™Nulls blir konverterade till tomma strängar.
    
#### Databassäkerhet{#database-security} 
* När du arbetar med databaser måste du göra saker så säkert och säkert som möjligt för att undvika att en skadlig användare kan skada din databas eller få tillgång till data som de inte borde ha tillgång till.ERDDAP™försöker göra saker på ett säkert sätt också.
    * Överväg att replikera, på en annan dator, databasen och databastabellerna med de data som du villERDDAP™att tjäna. (Ja, för kommersiella databaser somOracleDetta innebär ytterligare licensavgifter. Men för öppna källdatabaser, som PostgreSQL, MySQL, Amazon RDS och MariaDB, kostar detta ingenting.) Detta ger dig en hög säkerhetsnivå och förhindrar ocksåERDDAP™Förfrågningar från att sakta ner den ursprungliga databasen.
    * Vi uppmuntrar dig att inrättaERDDAP™att ansluta till databasen som en databasanvändare som bara har tillgång till **relevant** Databasdata (s) och endast har READ privilegier.
    * Vi uppmuntrar dig att upprätta anslutningen frånERDDAP™till databasen så att den
        * Använd alltid SSL,
        * endast tillåter anslutningar från en IP-adress (eller ett block av adresser) och från denERDDAP™användare och
        * endast överför lösenord i deras MD5 hashed form.
    *   \\[Knulla PROBLEM\\]AnslutningenProperties (inklusive lösenordet&#33;) lagras som vanlig text idatasets.xml. Vi har inte hittat ett sätt att låta administratören ange databaslösenordet underERDDAPStartup i Tomcat (som sker utan användarinmatning) Så lösenordet måste vara tillgängligt i en fil. För att göra detta säkrare:
        * Du du (ochERDDAP™Administratör) bör vara ägaren tilldatasets.xmloch har READ och WRITE access.
        * Gör en grupp som bara innehåller användar=tomcat. Använd chgrp för att göra gruppen fördatasets.xmlmed bara READ privilegier.
        * Använd chmod för att tilldela o-rwx privilegier (Ingen READ eller WRITE-åtkomst för "andra" användare) Fördatasets.xml.
    * När inERDDAP™lösenordet och andra anslutningsegenskaper lagras i "privat"Javavariabler.
    * Begäran från klienter analyseras och kontrolleras för giltighet innan de genererar SQL-förfrågningar för databasen.
    * Förfrågningar till databasen görs med SQL PreparedStatements, för att förhindra[SQL injektion](https://en.wikipedia.org/wiki/SQL_injection).
    * Förfrågningar till databasen lämnas in med utförande Query (inte executeStatement) begränsa förfrågningar som ska läsas endast (Så försökt SQL-injektion att ändra databasen kommer också att misslyckas av denna anledning.) .
         
#### SQL{#sql} 
* För därförOPeNDAP"S tabular dataförfrågningar var utformade för att efterlikna SQL-tabelldataförfrågningar, det är lätt förERDDAP™konvertera tabular dataförfrågningar till enkla SQL PreparedStatements. Till exempel,ERDDAP™begäran om begäran
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
omvandlas till SQL PreparedStatement
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™Förfrågningar med & Distinct () och/eller &orderBy ( *variabler* ) kommer att lägga till DISTINCT och/eller ORDER BY *variabler* till SQL förberedda uttalande. I allmänhet kommer detta att sakta ner svaret från databasen.
ERDDAP™Loggar PreparedStatement in[Log.txt](/docs/server-admin/additional-information#log)som
```
    statement=*thePreparedStatement*  
```
Detta kommer att vara en textrepresentation av PreparedStatement, som kan vara något annorlunda än den faktiska PreparedStatement. Till exempel, i PreparedStatement, är tider kodade på ett speciellt sätt. Men i textrepresentationen visas de som ISO 8601-datumtider.
     
#### Databashastighet{#database-speed} 
* Databaser kan vara långsamma. Det finns några saker du kan göra:
    * I allmänhet -
SQL:s natur är att frågor är[deklarativt](https://en.wikipedia.org/wiki/Declarative_programming). De specificerar bara vad användaren vill ha. De innehåller inte en specifikation eller tips för hur frågan ska hanteras eller optimeras. Så det finns inget sätt förERDDAP™för att generera frågan på ett sådant sätt att den hjälper databasen att optimera frågan (eller på något sätt specificerar hur frågan ska hanteras) . I allmänhet är det upp till databasadministratören att ställa in saker och ting. (till exempel index) optimera för vissa typer av frågor.
##### Ställ in Fetch Size{#set-the-fetch-size} 
Databaser returnerar data tillERDDAP™i bitar. Som standard returnerar olika databaser ett annat antal rader i bitarna. Ofta är detta nummer mycket litet och så mycket ineffektivt. Till exempel standard förOracleär 10&#33; Läs JDBC-dokumentationen för databasens JDBC-drivrutin för att hitta anslutningsegenskapen för att öka detta och lägg till detta i datasetets beskrivning idatasets.xml. Till exempel,
För MySQL och Amazon RDS, använd
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
För MariaDB finns det för närvarande inget sätt att ändra fostrets storlek. Men det är en efterfrågad funktion, så sök på webben för att se om detta har genomförts.
FörOracleAnvänd
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
För PostgreSQL, använd
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
Känn dig fri att ändra numret. Ange numret för stort kommer att orsakaERDDAP™att använda massor av minne och vara mer benägna att springa ur minnet.
#### ConnectionProperties{#connectionproperties} 
Varje databas har andra anslutningsegenskaper som kan specificeras idatasets.xml. Många av dessa kommer att påverka databasens prestanda tillERDDAP™anslutning. Läs dokumentationen för din databas JDBC-drivrutin för att se alternativen. Om du hittar anslutningsegenskaper som är användbara, skicka ett e-postmeddelande med detaljerna tillerd dot data at noaa dot gov.
* Gör ett bord -
Du kommer förmodligen att få snabbare svar om du periodiskt (varje dag? När det finns nya data?) generera en verklig tabell (På samma sätt som du skapade VIEW) och berättaERDDAP™för att få data från tabellen istället för VIEW. Eftersom varje begäran till tabellen sedan kan uppfyllas utan att JOINing en annan tabell, kommer svaret att vara mycket snabbare.
* Vakuum bordet -
MySQL och Amazon RDS svarar mycket snabbare om du använder[Optimera TABLE](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).
Maria Maria Maria Maria Maria Maria Maria DB svarar mycket snabbare om du använder[Optimera TABLE](https://mariadb.com/kb/en/optimize-table/).
PostgreSQL svarar mycket snabbare om du[VACUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)tabellen.
    OracleHar inte eller behöver ett analogt kommando.
* Gör[Index](https://en.wikipedia.org/wiki/Database_index)För vanliga begränsade variabler -
Du kan påskynda många/mest frågor genom att skapa index i databasen för variablerna. (Vilka databaser kallar "kolumner") Det är ofta begränsat i användarens fråga. I allmänhet är dessa samma variabler som anges av [&lt;subsetVariables&gt;] (#subsetvariables) och/eller latitud, longitud och tidsvariabler.
##### Använd Connection Pooling{#use-connection-pooling} 
Normalt,ERDDAP™gör en separat anslutning till databasen för varje begäran. Detta är den mest tillförlitliga metoden. Det snabbare alternativet är att använda en datakälla som stöder anslutning poolning. För att ställa in det, ange (till exempel)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
precis bredvid&lt;sourceUrl&gt;,&lt;FörareName&gt;, och&lt;anslutning Fastigheter&gt;.
Och i *Tomcat* /conf/context.xml, definiera en resurs med samma information, till exempel
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Allmän information om att använda en DataSource är på[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).
Se[Tomcat DataSource information](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)och[Tomcat DataSource exempel](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)eller söka på webben för exempel på att använda DataSources med andra programservrar.
* Om allt annat misslyckas,
överväga att lagra data i en samling avNetCDFv3.ncfiler filer (Särskilt speciellt.ncfiler som använder[CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)sammanhängande Ragged Array datastrukturer och så kan hanteras medERDDAP"S[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) . Om de är logiskt organiserade (var och en med data för en bit av utrymme och tid) ,ERDDAP™kan utvinna data från dem mycket snabbt.
         
#### EDDTableFromDatabase skelett XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFrånEDDGrid {#eddtablefromeddgrid} 
[ **EDDTableFrånEDDGrid** ](#eddtablefromeddgrid)låter dig skapa en EDDTable dataset från allaEDDGriddataset.

* Några vanliga skäl för att göra detta är:
    * Detta gör det möjligt för datasetet att bli queried medOPeNDAPurvalsbegränsningar, som är en typ av "fråga efter värde" (som en användare kan ha begärt) .
    * Datasetet är i sig en tabular dataset.
* Värdet av den globala attributet "maxAxis0" (vanligtvis av typ = "int") , (Standarden är 10) Används för att begränsa antalet axlar\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]  (vanligen"time"axel) värden för den slutnaEDDGriddataset som kan nås per begäran om data. Om du inte vill att det ska finnas någon gräns, ange ett värde på 0. Denna inställning är viktig eftersom det annars skulle vara för lätt för en användare att fråga EDDTableFrånEDDGridatt titta igenom alla de ruttna datamängdens data. Det skulle ta lång tid och skulle nästan säkert misslyckas med en timeout fel. Detta är inställningen som gör det säkert att ha EDDTableFromEDDGriddatamängder i dinERDDAPutan rädsla för att de kommer att leda till en orimlig användning av datorresurser.
* Om den inneslutnaEDDGridär en[EDDGridFrånErddap](#eddfromerddap)ochERDDAP™är detsammaERDDAPEDDTableFrånEDDGridAnvänd alltid den tillgängliga versionen av den refererade dataset direkt. Detta är ett mycket effektivt sätt för EDDTableFromEDDGridför att komma åt de ruttna data.
* Den här klassen är [&lt;Reload EveryNMinutes (#reloadeveryn Minuter) är det som räknas. Den inneslutnaEDDGrid"S&lt;ReloadEveryNMinutes &gt; ignoreras.
* Om ett värde för [&lt;updateEveryNMillis &gt;] (#updateeverynmillis) levereras för denna dataset, det ignoreras. Den inneslutnaEDDGrid"S&lt;updateEveryNMillis är vad som är viktigt.
*   [GenerateDatasetsXml](#generatedatasetsxml)har ett alternativ för dataset typ=EDDTableFromEDDGridsom ber om en URLERDDAP  (vanligtvis sammaERDDAP)   (slutar i "/erddap/") och ett regelbundet uttryck. GenerateDatasets Xml kommer sedan att generera XML för en EDDTableFromEDDGriddataset för varje rutnät dataset iERDDAP™som har endatasetIDsom matchar det vanliga uttrycket (Använd . * för att matcha alladatasetIDs för gridded datasets) .
    
Den bit av XML som genereras av GenerateDatasetsXml för varje dataset inkluderar:
    
    * EttdatasetIDsom är denEDDGrid"SdatasetIDplus "AsATable".
    * En ny sammanfattande global egenskap som ärEDDGridSammanfattning plus ett nytt första stycke som beskriver vad detta dataset är.
    * En ny titel global attribut som är denEDDGridTiteln plus ", (Som ett bord) ".
    * Ett nytt maxAxis0 globalt attribut med ett värde av 10.
#### EDDTableFrånEDDGridskelett XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFileNames{#eddtablefromfilenames} 
[ **EDDTableFromFileNames** ](#eddtablefromfilenames)skapar en dataset från information om en grupp filer i serverns filsystem, inklusive en URL för varje fil så att användarna kan ladda ner filerna viaERDDAP"S["files"Systemsystem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). Till skillnad från alla[EDDTableFromFiles](#eddtablefromfiles)underklasser, denna dataset typ inte tjänar data inifrån filerna.

* EDDTableFromFileNames är användbar när:
    * Du har en grupp filer som du vill distribuera som hela filer eftersom de inte innehåller "data" på samma sätt som vanliga datafiler har data. Till exempel bildfiler, videofiler, Word-dokument, Excel-kalkylbladfiler, PowerPoint-presentationsfiler eller textfiler med ostrukturerad text.
    * Du har en grupp filer som har data i ett format somERDDAP™Kan ännu inte läsa. Till exempel ett projektspecifikt, anpassat, binärt format.
         
#### EDDTableFromFileNames Data{#eddtablefromfilenames-data} 
*   [Uppgifterna i en EDDTableFromFileNames dataset](#eddtablefromfilenames-data)är en tabell somERDDAP™skapar on-the-fly med information om en grupp lokala filer. I tabellen finns det en rad för varje fil. Fyra speciella attribut i[datasets.xmlför denna dataset](#eddtablefromfilenames-skeleton-xml)bestämma vilka filer som kommer att ingå i denna dataset:
    
##### fil Dir{#filedir} 
    *   &lt;FilDir &gt; -- Detta anger källkatalogen i serverns filsystem med filerna för denna dataset. De filer som faktiskt finns i serverns filsystem i&lt;fileDir&gt; kommer att visas i url-kolumnen för denna dataset inom en virtuell katalog som heter https://*serverUrl*/erddap/files/*datasetID/* .
Till exempel, omdatasetIDär jplMURSST,
och&lt;filDir&gt; är /home/data/mur/,
och den katalogen har en fil som heter jplMURSST20150103000000.png,
sedan URL som visas för användare för den filen kommer att visas
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
Förutom att använda en lokal katalog för&lt;filDir&gt;, du kan också ange webbadressen för en fjärr, katalog-liknande webbsida. Detta fungerar med:
        
        * Oaggregerade datamängder i THREDDS, t.ex.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Denna server är inte längre tillförlitligt tillgänglig.\\]
        * Oaggregerade datamängder iHyraxt.ex.,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * De flesta Apache-liknande kataloglistor, t.ex.
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### FrånOnTheFly{#fromonthefly} 
[\\*\\*FrånOnTheFly](#fromonthefly)----- För några stora S3 hink (som noaa-goes17, som har 26 miljoner filer) Det kan taERDDAP™upp till 12 timmar för att ladda ner all information om innehållet i hinken (och sedan finns det andra problem) . För att komma runt detta finns det ett speciellt sätt att använda&lt;fileDir&gt; i EDDTableFromFileNames för att göra en dataset med katalogen och filnamn från en AWS S3 hink. Datasetet har inte listan över alla S3-hinkens kataloger och filnamn som en användare kan söka via förfrågningar till datasetet. Men datamängden kommer att få namnen på kataloger och filer på flygningen om användaren korsar katalogen hierarki med datamängdens"files"Alternativ. Således gör det möjligt för användare att bläddra i S3-hinkens filhierarki och filer via datasetets"files"system. För att göra detta, i stället för att ange URL för S3 hinken som "Starting katalogen" (i GenerateDatasets Xml) eller&lt;FilDir&gt; (in idatasets.xml) Använd:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
Till exempel:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Se dokumentationen för[Arbeta med S3 BucketsERDDAP™](#working-with-aws-s3-files), särskilt beskrivningen av det specifika formatet som måste användas för S3 bucket URL. Och se
[Dessa detaljer och ett exempel](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)att använda\\*\\*FrånOnTheFly.
        
##### Återkommande{#recursive} 
*   &lt;Recursive &gt; - Filer i underkataloger av&lt;FilDir &gt; med namn som matchar&lt;fileRegex&gt; visas i samma underkataloger i"files"URL om&lt;Återkommande &gt; är inställd på sant. Standarden är falsk.
* [Och [Gud]&lt;PathRegex &gt;] (#pathregex) ----- Om recursive=true, endast katalognamn som matchar vägenRegex (Default="*") kommer att accepteras. Om återkommande = falskt ignoreras detta. Detta används sällan, men kan vara mycket användbart under ovanliga omständigheter. (Se detta[regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)och[Regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
##### FilRegex{#fileregex} 
*   &lt;FilRegex &gt; -- Endast de filnamn där hela filnamnet (Inte inklusive katalogen namn) matcha&lt;fileRegex&gt; kommer att ingå i denna dataset. Till exempel jplMURSST. &#123;14.png. (Se detta[regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)och[Regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
         
##### Från filnamn Data Tabell Innehåll{#from-file-names-data-table-contents} 
I tabellen finns kolumner med:
* Url - Den URL som användare kan använda för att ladda ner filen viaERDDAP"S["files"Systemsystem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
* Namn -- Filens namn (utan katalognamn) .
* LastModified - Den tid filen senast ändrades (lagras som dubblar med"seconds since 1970-01-01T00:00:00Z") . Denna variabel är användbar eftersom användare kan se om / när innehållet i en viss fil senast ändrats. Denna variabel är en[Tid Stamp variabel](#timestamp-variables)Så data kan visas som numeriska värden (sekunder sedan 1970-01-01T00:00:00Z) eller ett strängvärde (ISO 8601:2004 (E E E E) format format) beroende på situationen.
* storlek - Filens storlek i byte, lagrad som dubbel. De lagras som dubblar eftersom vissa filer kan vara större än ints tillåter och längder stöds inte i vissa responsfiltyper. Dubblar kommer att ge exakt storlek, även för mycket stora filer.
* tilläggskolumner definierade avERDDAP™administratör med information som extraheras från filnamnet (till exempel den tid som är associerad med data i filen) baserat på två attribut som du anger i metadata för varje extra kolumn/dataVariableFrån:
    
    * extraktRegex - Detta är en[regelbundet uttryck](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) . Hela regex måste matcha hela filnamnet (Inte inklusive katalogen namn) . Regex måste innehålla minst en fångstgrupp (en del av ett regelbundet uttryck som innesluts av parentes) som skallERDDAP™använder för att bestämma vilken del av filnamnet som ska extrahera för att bli data.
    * extrakt Grupp -- Detta är antalet fångar gruppen (#1 är den första fångstgruppen) i det vanliga uttrycket. Standarden är 1. En fångstgrupp är en del av ett regelbundet uttryck som innesluts av parenteser.
    
Här är två exempel:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
Vid tidsvariabel, om en fil har namnet jplMURSST20150103000000000.png, extraktRegex kommer att matcha filnamnet, extrahera de tecken som matchar den första fångstgruppen ("20150103000000") som dataType=String, använd sedan[enheter som är lämpliga för strängtid](#string-time-units)att analysera strängarna i tidsdatavärden (2015-01-03T00:00:00Z) .

När det gäller dagsvariabeln, om en fil har namnet jplMURSST20150103000000000.png, extraktRegex kommer att matcha filnamnet, extrahera de tecken som matchar den första fångstgruppen ("03") som [som]&lt;DataType&gt;] (#datatype) ¤int, ger ett datavärde på 3.
        
#### Övrig information{#other-information} 
* Nej, nej,&lt;updateEveryNMillis &gt;] (#updateeverynmillis) ----- Denna typ av dataset behöver inte och kan inte använda&lt;updateEveryNMillis&gt; taggen eftersom den information som serveras av EDDTableFromFileNames är alltid helt uppdaterad eftersomERDDAP™Frågor filsystemet för att svara på varje begäran om data. Även om det finns ett stort antal filer, bör detta tillvägagångssätt fungera ganska bra. Ett svar kan vara långsamt om det finns ett stort antal filer och datamängden inte har queried ett tag. Men i flera minuter efter det håller operativsystemet informationen i en cache, så svaren bör vara mycket snabba.
     
* Du kan använda[GenerateDatasets Xml program](#generatedatasetsxml)att göradatasets.xmlchunk för denna typ av dataset. Du kan lägga till / definiera ytterligare kolumner med information som extraheras från filnamnet, som visas ovan.
     
#### EDDTableFromFileNames skelett XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFiles{#eddtablefromfiles} 
[ **EDDTableFromFiles** ](#eddtablefromfiles)är superklassen av alla EDDTableFrån...Files klasser. Du kan inte använda EDDTableFromFiles direkt. Använd istället en underklass av EDDTableFromFiles för att hantera den specifika filtypen:

*   [EDDTableFromAsciiFiles](#eddtablefromasciifiles)aggregerar data från komma-, flik-, semicolon- eller rymdseparerade tabell ASCII-datafiler.
*   [EDDTableFromAudioFiles](#eddfromaudiofiles)aggregerar data från en grupp lokala ljudfiler.
*   [EDDTableFrån AwsXmlFiles](#eddtablefromawsxmlfiles)samlar in data från en uppsättning automatiska väderstationer (AWS) XML filer.
*   [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)aggregerar data från tabular ASCII-datafiler med fasta datakolumner.
*   [EDDTableFrånHyraxFiler](#eddtablefromhyraxfiles)  (Begränsad) aggregerar data med flera variabler, var och en med delade dimensioner (Till exempel tid, höjd (eller djup) latitud, longitud) och serveras av en[Hyrax OPeNDAPServer server](https://www.opendap.org/software/hyrax-data-server).
*   [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles)aggregerar data frånNetCDF  (v3 eller v4)  .ncfiler som använder en specifik, ogiltig, variant av CF DSG Contiguous Ragged Array (CRA) filer. Även omERDDAP™stöder denna filtyp, det är en ogiltig filtyp som ingen ska börja använda. Grupper som för närvarande använder denna filtyp uppmuntras starkt att användaERDDAP™för att generera giltiga CF DSG CRA-filer och sluta använda dessa filer.
*   [EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles)aggregerar data från[JSON Lines CSV-filer](https://jsonlines.org/examples/).
*   [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)aggregerar data frånNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer med flera variabler, var och en med delade dimensioner (Till exempel tid, höjd (eller djup) latitud, longitud) .
*   [EDDTableFromNcFiles](#eddtablefromncfiles)aggregerar data frånNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer med flera variabler, var och en med delade dimensioner (Till exempel tid, höjd (eller djup) latitud, longitud) . Det är bra att fortsätta använda denna datasettyp för befintliga dataset, men för nya dataset rekommenderar vi att du använder EDDTableFromMultidimNcFiles istället.
*   [EDDTableFromNcCFFiles](#eddtablefromnccffiles)aggregerar data frånNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer som använder ett av de filformat som anges av[CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konventioner. Men för filer som använder en av de multidimensionella CF DSG-varianterna, använd[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)I stället.
*   [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles)aggregerar data från[NCCSV](/docs/user/nccsv-1.00)ASCII .csv filer.
*   [EDDTableFromParquetFiles](#eddtablefromparquetfiles)hanterar data från[Parquet](https://parquet.apache.org/).
*   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)  (Begränsad) aggregerar data från filer med flera variabler med delade dimensioner som serveras av en[TröjorOPeNDAPServer server](https://www.unidata.ucar.edu/software/tds/).
*   [EDDTableFrånWFSFiler](#eddtablefromwfsfiles)  (Begränsad) gör en lokal kopia av alla data från enArcGISMapServerWFSserver så att data sedan kan sparas snabbt tillERDDAP™användare.

För närvarande stöds inga andra filtyper. Men det är oftast relativt enkelt att lägga till stöd för andra filtyper. Kontakta oss om du har en förfrågan. Eller om dina data är i ett gammalt filformat som du vill flytta bort från rekommenderar vi att du konverterar filerna för att varaNetCDFv3.ncfiler filer (och särskilt.ncfiler med[CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array datastruktur -ERDDAP™kan utvinna data från dem mycket snabbt) .NetCDFär ett brett stöd, binärt format, tillåter snabb slumpmässig åtkomst till data, och stöds redan avERDDAP.

#### FrånFiles detaljer{#fromfiles-details} 
Följande information gäller alla underklasser av EDDTableFromFiles.
##### Aggregation{#aggregation} 
Denna klass samlar in data från lokala filer. Varje fil har en (relativt) liten datatabell.
    * Den resulterande dataset visas som om alla filens tabeller hade kombinerats (alla rader av data från fil #1, plus alla rader från fil #2, ...) .
    * Filerna behöver inte alla de angivna variablerna. Om en viss fil inte har en specificerad variabel,ERDDAP™kommer att lägga till saknade värden efter behov.
    * Variablerna i alla filer måste ha samma värden för[add\\_offset](#scale_factor),[missing\\_value](#missing_value),[Fyll Värde](#missing_value),[scale\\_factor](#scale_factor)och[enheter](#units)attribut (Om någon) .ERDDAP™kontroller, men det är ett ofullständigt test - om det finns olika värden,ERDDAPVet inte vilket som är korrekt och därför vilka filer som är ogiltiga. Om detta är ett problem kan du använda[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)för att åtgärda problemet.
         
##### Komprimerade filer{#compressed-files} 
Källdatafiler för alla EDDTableFromFiles-underklasser kan komprimeras externt (t.ex.,.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2eller .Z) . Se[Externt komprimerad fildokumentation](#externally-compressed-files).
     
##### Cached File Information{#cached-file-information-1} 
* När en EDDTableFromFiles dataset först laddas, EDDTableFromFiles läser information från alla relevanta filer och skapar tabeller (En rad för varje fil) med information om varje giltig fil och varje "dålig" (olika eller ogiltiga) fil.
    * Tabellerna lagras också på disken, somNetCDFv3.ncfiler i *bigParentDirectory* /dataset/ *Last2CharsOfDatasetID* /// *datasetID* i filer som heter:
DirTable.nc  (som innehåller en lista över unika katalognamn) ,
fil Bord.nc  (som håller tabellen med varje giltig fils information) ,
badFiles.nc  (som håller tabellen med varje dålig fils information) .
    * För att påskynda åtkomsten till en EDDTableFromFiles dataset (men på bekostnad av att använda mer minne) Du kan använda
[Och [Gud]&lt;filTableInMemory &gt;true&lt;/fileTableInMemory&gt;] (#filetableinmemory)   
Att berättaERDDAP™för att hålla en kopia av filinformationstabellerna i minnet.
    * Kopieringen av filinformationstabellerna på disken är också användbar närERDDAP™stängs och startas om: det sparar EDDTable FromFiles från att behöva läsa om alla datafiler.
    * När en dataset laddas om,ERDDAP™behöver bara läsa data i nya filer och filer som har ändrats.
    * Om en fil har en annan struktur från andra filer (till exempel en annan datatyp för en av variablerna, eller ett annat värde för "[enheter](#units)"attribut) ,ERDDAPlägger till filen i listan över "dåliga" filer. Information om problemet med filen kommer att skrivas till *bigParentDirectory* /logs/log.txt fil.
    * Du bör aldrig behöva ta bort eller arbeta med dessa filer. Ett undantag är: Om du fortfarande gör ändringar i en datasetdatasets.xmlinstallation, du kanske vill ta bort dessa filer för att tvingaERDDAP™att läsa alla filer eftersom filerna kommer att läsas / tolkas annorlunda. Om du någonsin behöver ta bort dessa filer kan du göra det när duERDDAP™kör. (Sätt sedan en[flagga](/docs/server-admin/additional-information#set-dataset-flag)för att ladda om dataset ASAP.) Men,ERDDAP™brukar märka attdatasets.xmlinformation matchar inte filen Tabellinformation och raderar filtabellerna automatiskt.
    * Om du vill uppmuntraERDDAP™för att uppdatera lagrad dataset information (till exempel, om du bara har lagt till, tagit bort eller ändrat några filer till datasetets datakatalog) Använda[Flagga system](/docs/server-admin/additional-information#flag)Att tvingaERDDAP™för att uppdatera cachade filinformation.
         
##### Hanteringsförfrågningar{#handling-requests-1} 
*   ERDDAP™Tabular dataförfrågningar kan sätta begränsningar på någon variabel.
    * När en kunds begäran om data behandlas kan EDDTableFromFiles snabbt titta i tabellen med giltig filinformation för att se vilka filer som kan ha relevanta data. Till exempel, om varje källfil har data för en fast plats boj, kan EDDTableFromFiles mycket effektivt bestämma vilka filer som kan ha data inom ett visst longitudområde och latitudområde.
    * Eftersom den giltiga filinformationstabellen innehåller det minsta och maximala värdet av varje variabel för varje giltig fil, kan EDDTableFromFiles ofta hantera andra frågor ganska effektivt. Till exempel, om några av bojarna inte har en lufttryckssensor, och en klient begär data för airPressure&#33;=NaN, kan EDDTableFromFiles effektivt bestämma vilka bojar som har lufttrycksdata.
         
##### Uppdatera Cached File Information{#updating-the-cached-file-information-1} 
När datamängden laddas om uppdateras den cachade filinformationen.
    
* Datamängden laddas regelbundet enligt bestämda av&lt;reloadEveryNMinutes &gt; i datasetets information idatasets.xml.
* Datasetet laddas så snart som möjligt när som helstERDDAP™upptäcker att du har lagt till, tagit bort,[touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) ) (ändra filens sista Ändrad tid) eller ändrat en datafil.
* Datasetet laddas så snart som möjligt om du använder[Flagga system](/docs/server-admin/additional-information#flag).

När datamängden laddas om,ERDDAP™jämför de för närvarande tillgängliga filerna till tabellen med cachad filinformation. Nya filer läses och läggs till i den giltiga filer tabellen. Filer som inte längre finns tappas från tabellen giltiga filer. Filer där fil timestamp har ändrats läses och deras information uppdateras. De nya tabellerna ersätter de gamla tabellerna i minnet och på disken.
     
##### Dåliga filer{#bad-files-1} 
Tabellen med dåliga filer och anledningarna till att filerna förklarades dåligt (korrupt fil, saknade variabler, felaktiga axelvärden etc.) mailas till e-post Allting Allt Till e-postadress (förmodligen du) Varje gång datasetet laddas om. Du bör ersätta eller reparera dessa filer så snart som möjligt.
     
##### Saknade variabler{#missing-variables-1} 
Om några av filerna inte har några avdataVariables definierade i datasetetsdatasets.xmlChunk, det är okej. När EDDTableFromFiles läser en av dessa filer, kommer det att fungera som om filen hade variabeln, men med alla saknade värden.
     
##### Nära realtidsdata{#near-real-time-data} 
* EDDTableFromFiles behandlar förfrågningar om mycket senaste data som ett särskilt fall. Problemet: Om filerna som utgör datamängden uppdateras ofta, är det troligt att datamängden inte kommer att uppdateras varje gång en fil ändras. Så EDDTableFromFiles kommer inte att vara medveten om de ändrade filerna. (Du kan använda[Flagga system](/docs/server-admin/additional-information#flag)Men det kan leda tillERDDAP™Reloading dataset nästan kontinuerligt. I de flesta fall rekommenderar vi inte det.) Istället hanterar EDDTableFromFiles detta genom följande system: När närERDDAP™Få en begäran om data inom de senaste 20 timmarna (8 timmar sedan tills nu) ,ERDDAP™kommer att söka alla filer som har några data under de senaste 20 timmarna. Således,ERDDAP™behöver inte ha helt uppdaterad data för alla filer för att hitta de senaste data. Du bör fortfarande ställa in [&lt;Reload EveryNMinutes (#reloadeveryn Minuter) till ett rimligt litet värde (Till exempel 60) Men det behöver inte vara litet (till exempel 3) .
     
    *    **Rekommenderas inte** organisation av nästan realtidsdata i filerna: Om du till exempel har en datamängd som lagrar data för många stationer (eller boj eller bana,) I många år kan du ordna filerna så att det till exempel finns en fil per station. Men då, varje gång nya data för en station anländer, måste du läsa en stor gammal fil och skriva en stor ny fil. Och närERDDAP™reloads dataset, det märker att vissa filer har ändrats, så det läser dessa filer helt. Det är ineffektivt.
         
    *    **Rekommenderas** organisation av nästan realtidsdata i filerna: Lagra data i bitar, till exempel all data för en station/boj/bana i ett år (eller en månad) . Då, när ett nytt datum anländer, bara filen med årets (eller månadens) data påverkas.
        
        * Bäst: AnvändningNetCDFv3.ncfiler med obegränsad dimension (Tid) . För att lägga till nya data kan du bara lägga till nya data utan att behöva läsa och skriva om hela filen. Förändringen görs mycket effektivt och i huvudsak atomiskt, så filen är aldrig i ett inkonsekvent tillstånd.
        * Annars: Om du inte/kan inte använda.ncfiler med obegränsad dimension (Tid) När du behöver lägga till nya data måste du läsa och skriva om hela den drabbade filen (Förhoppningsvis litet eftersom det bara har ett år (eller månadens) värdet av data) . Lyckligtvis alla filer för tidigare år (eller månader) för den stationen förblir oförändrad.
        
I båda fallen närERDDAP™laddar om datamängden, de flesta filer är oförändrade; endast några få, små filer har ändrats och måste läsas.
         
##### Directories{#directories-1} 
Filerna kan vara i en katalog eller i en katalog och dess underkataloger (Återkommande) . Om det finns ett stort antal filer (Till exempel &gt;1 000) operativsystemet (och därmed EDDTableFromFiles) kommer att fungera mycket mer effektivt om du lagrar filerna i en serie underkataloger (en per år, eller en per månad för datamängder med mycket frekventa filer) så att det aldrig finns ett stort antal filer i en viss katalog.
     
##### Remote Directories och HTTP Range Requests{#remote-directories-and-http-range-requests-1} 
*    **Remote Directories och HTTP Range Requests**   (AKA Byte Serving, Byte Range Requests) -----
    EDDGridFrånNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles och EDDTableFromNcCFFiles, kan ibland tjäna data från.ncfiler på fjärrservrar och nås via HTTP om servern stöder[Byte servering](https://en.wikipedia.org/wiki/Byte_serving)via HTTP range requests (HTTP-mekanismen för byte servering) . Detta är möjligt eftersom netcdf-java (som skallERDDAP™användning för att läsa.ncfiler filer) stöder att läsa data från fjärrkontrollen.ncfiler via HTTP-serieförfrågningar.
    
     **Gör inte detta&#33;**   
Istället, använd [&lt;cacheFromUrl&gt; system (#cachefromurl) .
    
##### CacheFromUrl{#cachefromurl} 
* [Och [Gud] ** &lt;cacheFromUrl&gt; ** ] (#cachefromurl) -
Allt alltEDDGridFromFiles och alla EDDTableFromFiles dataset stöder en uppsättning taggar som berättarERDDAP™för att ladda ner och behålla en kopia av alla en fjärrdatamängds filer, eller en cache av några filer (nedladdad efter behov) . **Detta är en otroligt användbar funktion.** 
    * och&lt;cacheFromUrl&gt; taggen låter dig ange en URL med en lista över en fjärrdataset filer från en fjärrfil lista.
        
        * Oaggregerade datamängder i THREDDS, t.ex.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Denna server är inte längre tillförlitligt tillgänglig.\\]
        * Oaggregerade datamängder iHyraxt.ex.,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * De flesta Apache-liknande kataloglistor, t.ex.
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * S3 hink, t.ex.
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
Detta kan dock kräva ett AWS-konto och mer inställning.
Se[Arbeta med S3 BucketsERDDAP™](#working-with-aws-s3-files).
Du behöver vanligtvis inte använda cache FromUrl med filer i S3-hinkarna om filerna är ASCII-filer (t.ex. .csv) för attERDDAP™kan effektivt läsa data från hinken direkt via en ström.
        
        ERDDAP™kommer att kopiera eller cache dessa filer i datasetets&lt;FilDir&gt; katalog. Om du behöver stöd för en annan typ av fjärrfillista (Till exempel FTP) Skicka din begäran till Chris. John på noaa.gov.
        
        * Standardvärdet för&lt;cacheFromUrl&gt; tag är null. Om du inte specificerar ett värde för&lt;cacheFromUrl&gt; taggen, kopiera/cache systemet kommer inte att användas för denna dataset.
        * Om datasetets&lt;FilRegex &gt; Inställning är något annat än . \\*,ERDDAP™Kommer bara att ladda ner filer som matchar filenRegex.
        * Om datasetets&lt;recursive&gt; inställningen är sann och fjärrfilerna är i underkataloger,ERDDAP™kommer att se i fjärrstyrda underkataloger som matchar datasetets [&lt;PathRegex &gt;] (#pathregex) skapa samma katalogstruktur lokalt och placera lokala filer i samma underkataloger.
        * I GenerateDatasets Xml, om du anger en&lt;cacheFromUrl&gt; värde, Generate Dataset Xml skapar lokalen&lt;fileDir&gt; katalog och kopiera 1 fjärrfil i den. GenerateDatasets Xml kommer sedan att genereradatasets.xmlchunk baserat på den provfilen (specificera prov Fil = ingenting) .
        * Om datakällan är en fjärrkontrollERDDAP™Använd[EDDGridFrånErddap](#eddfromerddap)eller[EDDTableFromErddap](#eddfromerddap)istället för&lt;cacheFromUrl&gt;. På så sätt, din lokalaERDDAP™verkar ha dataset men behöver inte lagra någon av data lokalt. Den enda anledningen att använda&lt;cacheFromUrl&gt; för att få data från en fjärrkontrollERDDAP™är när du har någon annan anledning till att du vill ha en lokal kopia av datafilerna. I så fall:
            * Denna dataset kommer att försöka prenumerera på datasetet på fjärrkontrollenERDDAPså att ändringar i datamängden kommer att ringa denna datamängds flagga Url, orsakar denna lokala dataset att ladda om och ladda ner de ändrade fjärrfilerna. Således kommer den lokala datamängden att vara uppdaterad mycket snart efter ändringar görs till fjärrdatamängden.
            * Du bör maila administratören av fjärrkontrollenERDDAP™att be omdatasets.xmlför fjärrdataset så att du kan göra datasetet i din lokalaERDDAP™ser ut som dataset i fjärrkontrollenERDDAP.
        * Om datakällan är en fjärrkontrollERDDAP™Den lokala datamängden kommer att försöka prenumerera på fjärrdatamängden.
            * Om prenumerationen lyckas, när fjärrkontrollenERDDAPreloads och har nya data, det kommer att kontakta flagURL för denna dataset, vilket gör det att ladda om och ladda ner de nya och/eller ändrade datafilerna.
            * Om prenumerationen misslyckas (oavsett anledning) om du helt enkelt vill se till att den lokala datamängden är aktuell, kan du ställa in en[flagga](/docs/server-admin/additional-information#flag)för den lokala dataset, så det kommer att laddas om, så det kommer att kontrollera nya och/eller ändrade fjärrdatafiler.
        * Om datakällan inte är en fjärrkontrollERDDAP: datamängden kommer att kontrollera för nya och/eller ändrade fjärrfiler när den laddas om. Normalt är detta kontrollerat av [&lt;Reload EveryNMinutes (#reloadeveryn Minuter) . Men om du vet när det finns nya fjärrfiler kan du ställa in en[flagga](/docs/server-admin/additional-information#flag)för den lokala dataset, så det kommer att ladda om och kontrollera nya och/eller ändrade fjärrdatafiler. Om detta sker rutinmässigt vid en viss tid på dagen (t.ex. vid 07:00) Du kan göra ett cron jobb att användacurlför att kontakta flaggan Url för denna dataset, så det kommer att ladda om och kontrollera nya och/eller ändrade fjärrdatafiler.
    * och&lt;cacheSizeGB&gt; taggen anger storleken på den lokala cache. Du behöver förmodligen bara använda detta när du arbetar med molnlagringssystem som[Amazon S3](https://aws.amazon.com/s3/)vilket är ett vanligt lagringssystem som ingår i[Amazon Web Services (AWS) ](https://aws.amazon.com/). Standarden är -1.
        * Om värdet är&lt;=0 (t.ex. standardvärdet på -1) ,
            ERDDAP™kommer att ladda ner och underhålla en **fullständig kopia** av alla fjärrdatasetets filer i datasetets&lt;FilDir&gt;.
            * Detta är den inställning som rekommenderas när det är möjligt.
            * Varje gång datamängden laddas om, jämför den namnen, storlekarna och senasteModifierade tider av fjärrfilerna och de lokala filerna och hämtar alla fjärrfiler som är nya eller har ändrats.
            * Om en fil som fanns på fjärrservern försvinner,ERDDAP™inte radera motsvarande lokala fil (om något var tillfälligt fel med fjärrservern,ERDDAP™kan ta bort några eller alla lokala filer&#33;) .
            * Med denna inställning kommer du vanligtvis att ställa in&lt;updateEveryNMillis&gt; till -1, eftersom datamängden är medveten om när den har kopierat nya datafiler på plats.
        * Om värdet är &gt;0,
            ERDDAP™kommer att ladda ner filer från fjärrdatasetet efter behov till en lokal **Cache** (i datasetets&lt;filDir&gt;) med en tröskelstorlek på det angivna antalet GB.
            * Cache måste vara tillräckligt stor för att hålla åtminstone flera datafiler.
            * I allmänhet, ju större cache, desto bättre, eftersom nästa begärda datafil kommer att vara mer benägna att redan vara i cache.
            * Cachning bör endast användas närERDDAP™körs i en cloud computing server (t.ex. ett AWS-beräkningsinstans) och fjärrfilerna i ett molnlagringssystem (t.ex. AWS S3) .
            * När diskutrymmet som används av lokala filer överstiger cache SizeGB,ERDDAP™Snart (Kanske inte omedelbart) ta bort några av de cachade filerna (för närvarande, baserat på minsta nyligen använda (LRU) algoritm) tills diskutrymmet som används av de lokala filerna är&lt;0,75\\*cacheSizeGB (Det "mål") . Ja, det finns fall där LRU utför mycket dåligt – det finns ingen perfekt algoritm.
            *   ERDDAP™kommer aldrig att försöka ta bort en cachad fil somERDDAP™började användas under de senaste 10 sekunderna. Detta är ett ofullständigt system för att hantera cachesystemet och datafilläsarsystemet är bara löst integrerat. På grund av denna regel,ERDDAP™kanske inte kan ta bort tillräckligt med filer för att nå sitt mål, i vilket fall det kommer att skriva ut en VARNING till log.txt-filen, och systemet kommer att slösa mycket tid på att försöka beskära cache, och det är möjligt att storleken på filerna i cacheSizeGB. Om detta någonsin inträffar, använd en större cacheSizeGB-inställning för den datamängden.
            * För närvarande,ERDDAP™Kontrollera aldrig om fjärrservern har en nyare version av en fil som finns i den lokala cache. Om du behöver den här funktionen, vänligen maila Chris. John på noaa.gov.
        * Även om användningen av samma taggnamn kan innebära att kopieringssystemet och cachesystemet använder samma underliggande system, är det inte korrekt.
            * Kopieringssystemet startar proaktivt uppgiftTråda uppgifter för att ladda ner nya och ändrade filer varje gång datamängden laddas om. Endast filer som faktiskt har kopierats till den lokala katalogen finns tillgängliga viaERDDAP™dataset.
            * Cache-systemet får fjärrfillistan varje gång datamängden laddas om och låtsas att alla dessa filer är tillgängliga via denERDDAP™dataset. Intressant är att alla fjärrfiler även visas i datasetets /filer / webbsidor och är tillgängliga för nedladdning (Även om det kanske först efter en fördröjning medan filen först laddas ner från fjärrservern till den lokala cache.) 
        * Dataset som använder cacheSizeGB kan dra nytta av att använda en[nThreads](#nthreads)ange större än 1, eftersom detta gör det möjligt för dataset att ladda ner mer än 1 fjärrfil i taget.
    * och&lt;cachePartialPathRegex&gt;-taggen är en sällan använd tag som kan ange ett alternativ för datamängdens [&lt;PathRegex &gt;] (#pathregex) . Standarden är null.
        * Använd endast detta om du kopierar hela datamängden via standarden&lt;cacheSizeGB&gt; värdet av -1. med&lt;cacheSizeGB&gt; värden av &gt;1, detta kommer att ignoreras eftersom det är nonsensiskt.
        * Se [dokumentationen för&lt;PathRegex &gt;] (#pathregex) vägledning om hur man bygger regex.
        * Om detta anges kommer det att användas varje gång datamängden laddas om, förutom första gången en datamängd laddas om i början av en månad.
        * Detta är användbart när fjärrdataset lagras i en labyrint av underkataloger och när den stora majoriteten av dessa filer sällan, om någonsin, ändras. (b)&lt;Cough &gt; NASA&lt;Cough &gt;) Du kan till exempel ange en&lt;cachePartialPathRegex&gt; som bara matchar det aktuella året eller den aktuella månaden. Dessa regex är mycket knepiga att specificera, eftersom alla partiella och fullständiga namn måste matcha de.&lt;cachePartialPathRegex &gt; och eftersom&lt;cachePartialPathRegex&gt; måste arbeta med de avlägsna webbadresserna och de lokala katalogerna. Ett verkligt livsexempel är:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
Prov URL ovan har filer i underkataloger baserat på år (t.ex. 2018) och årets dag (t.ex. 001, 002, ..., 365 eller 366) .
Notera att&lt;cachePartialPathRegex Börjar med . **,
har sedan en specifik underkatalog som är vanlig för fjärrURL:erna och de lokala katalogerna, t.ex. /v4\\.1/
Sedan har en serie av inkapslade grupper där det första alternativet inte är något
Det andra alternativet är ett specifikt värde.
            
Exemplet ovan kommer endast att matcha kataloger under de andra 10 dagarna av 2018, t.ex.
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Denna server är inte längre tillförlitligt tillgänglig.\\]  
Dag 011, 012, 019.
             (Se detta[regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)och[Regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
Om du behöver hjälp med att skapa&lt;cachePartialPathRegex&gt;, vänligen maila&lt;cacheFromUrl&gt; till Chris. John på noaa.gov.
            
        * Ett vanligt tillvägagångssätt: Om du vill använda&lt;cachePartialPathRegex&gt;, använd det inte ursprungligen, eftersom du villERDDAP™för att ladda ner alla filer ursprungligen. EfterERDDAP™har laddat ner alla filer, lägg till det i datamängdens bit avdatasets.xml.
             
##### tusentals filer{#thousands-of-files} 
Om din dataset har tusentals filer,ERDDAP™kan vara långsamt att svara på förfrågningar om data från den datamängden. Det finns två frågor här:
 

1. Antalet filer per katalog.
Internt,ERDDAP™fungerar med samma hastighet oavsett om n-filer finns i en katalog eller sprids i flera kataloger.
     
Men det finns ett problem: Ju fler filer i en viss katalog, desto långsammare är operativsystemet att returnera listan över filer i katalogen (per fil) attERDDAP. Svarstiden kan vara O (n log n) . Det är svårt att säga hur många filer i en katalog är för många, men 10 000 är förmodligen för många. Så om din inställning genererar massor av filer kan en rekommendation här vara: lägg filerna i logiskt organiserade underkataloger (t.ex. station eller station/år) .
    
En annan anledning att använda underkataloger: om en användare vill användaERDDAP"S"files"system för att hitta namnet på den äldsta filen för station X, det är snabbare och effektivare om filerna är i station / år underkataloger, eftersom mycket mindre information måste överföras.
    
2. Det totala antalet filer.
för tabular dataset,ERDDAP™Håller koll på utbudet av värden för varje variabel i varje fil. När en användare gör en begäran,ERDDAP™måste läsa alla data från alla filer som kan ha data som matchar användarens begäran. Om användaren begär data från en begränsad tid (En dag eller en månad) SedanERDDAP™behöver inte öppna för många filer i din dataset. Men det finns extrema fall där nästan varje fil kan ha matchande data. (t.ex. när vattenTemperatur=13.2C) . Eftersom det tarERDDAP™Lite tid (delvis söktiden på HDD, dels tid att läsa filens rubrik) bara för att öppna en viss fil (och mer om det finns massor av filer i katalogen) Det finns en betydande tidsstraff om det totala antalet filer somERDDAP™måste öppna är mycket stort. Även öppna 1000 filer tar betydande tid. Så det finns fördelar med att regelbundet konsolidera de dagliga filerna till större bitar (t.ex. 1 station för 1 år) . Jag förstår att du kanske inte vill göra detta av olika skäl, men det leder till mycket snabbare svar. I extrema fall (Jag hanterar till exempel en GTSPP dataset som har ~ 35 miljoner källfiler) att betjäna data från ett stort antal källfiler är opraktiskt eftersomERDDAP"Svaret på enkla frågor kan ta timmar och använda massor av minne. Genom att konsolidera källfiler till ett mindre antal (För GTSPP, jag har 720 nu, 2 per månad) ,ERDDAP™kan svara rimligt snabbt. Se[Miljoner filer](#millions-of-files)  
     

Solid State Drives är bra&#33; Det snabbaste, enklaste och billigaste sättet att hjälpaERDDAP™deal med ett stort antal (Små små) filer är att använda en solid state drive. Se[Solid State Drives är bra&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Miljoner filer{#millions-of-files} 
* Vissa datamängder har miljontals källfiler.ERDDAP™kan hantera detta, men med blandade resultat.
    
    * För förfrågningar som bara involverar variabler som anges i [&lt;subsetVariables&gt;] (#subsetvariables) ,ERDDAP™har all nödvändig information som redan har extraherats från datafilerna och lagrats i en fil, så det kan svara mycket, mycket snabbt.
    * För andra förfrågningar,ERDDAP™Kan skanna datasetets[cached file information](#cached-file-information)och räkna ut att endast några av filerna kan ha data som är relevanta för begäran och därmed svara snabbt.
    * Men för andra förfrågningar (vattenTemperatur=18 grad\\_C) om någon fil kan ha relevanta uppgifter,ERDDAP™måste öppna ett stort antal filer för att se om var och en av filerna har några uppgifter som är relevanta för begäran. Filerna öppnas sekventiellt. I alla operativsystem och alla filsystem (annat än solid state drives) Detta tar lång tid (SåERDDAP™svarar långsamt) och verkligen knyter upp filsystemet (SåERDDAP™svarar långsamt på andra förfrågningar) .
    
Lyckligtvis finns en lösning.
    
    1. Ställ in datamängden på en icke-offentligERDDAP™  (Din dator?) .
    2. Skapa och köra ett manus som begär en serie av.ncCF-filer, var och en med en stor del av datamängden, vanligtvis en tidsperiod (Till exempel alla data för en viss månad) . Välj tidsperioden så att alla de resulterande filerna är mindre än 2 GB (Men förhoppningsvis större än 1 GB) . Om datamängden har nästan realtidsdata, kör manuset för att regenerera filen för den aktuella tidsperioden (t.ex. denna månad) ofta (Var tionde minut? Varje timme?) . Begäran attERDDAP™För.ncCF-filer skapar enNetCDFv3.ncfil som använder[CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)sammanhängande Ragged Array datastrukturer).
    3. Ställ in en[EDDTableFromNcCFFiles](#eddtablefromnccffiles)Dataset på din publikERDDAP™som får data från.nc (CF) filer.ERDDAP™kan extrahera data från dessa filer mycket snabbt. Och eftersom det nu finns dussintals eller hundratals (istället för miljoner) filer, även omERDDAP™måste öppna alla filer, det kan göra det snabbt.
    
Ja, detta system tar lite tid och ansträngning att ställa in, men det fungerar mycket, mycket bra. De flesta dataförfrågningar kan hanteras 100 gånger snabbare än tidigare.
    \\[Bob visste att det var en möjlighet, men det var Kevin O'Brien som först gjorde det och visade att det fungerar bra. Nu, Bob använder detta för GTSPP dataset som har cirka 18 miljoner källfiler och somERDDAP™Nu tjänar vi via ca 500.nc (CF) filer.\\]
    
Solid State Drives är bra&#33; Det snabbaste, enklaste och billigaste sättet att hjälpaERDDAP™deal med ett stort antal (Små små) filer är att använda en solid state drive. Se[Solid State Drives är bra&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### Stora filer{#huge-files} 
* En enda stor datafil (särskilt stora ASCII datafiler) kan orsaka en OutOfMemoryError. Om detta är problemet, bör det vara uppenbart eftersomERDDAP™kommer att misslyckas med att ladda datasetet. Lösningen, om möjligt, är att dela filen i flera filer. Helst kan du dela filen i logiska bitar. Om filen till exempel har 20 månaders värde av data, dela den i 20 filer, var och en med 1 månads värde av data. Men det finns fördelar även om huvudfilen delas upp godtyckligt. Detta tillvägagångssätt har flera fördelar: a) Detta kommer att minska det minne som behövs för att läsa datafilerna till 1/20: e, eftersom endast en fil läses i taget. b) b) Ofta,ERDDAP™kan hantera förfrågningar mycket snabbare eftersom det bara måste titta i en eller några filer för att hitta data för en viss begäran. c) c) Om datainsamling pågår kan de befintliga 20 filerna förbli oförändrade, och du behöver bara ändra en, liten, ny fil för att lägga till nästa månads värde av data till datamängden.
     
##### FTP Problem / Råd{#ftp-troubleadvice-1} 
* Om du FTP nya datafiler tillERDDAP™server medanERDDAP™Igång, det finns chansen attERDDAP™kommer att ladda om datamängden under FTP-processen. Det händer oftare än du kanske tror&#33; Om det händer visas filen vara giltig (Den har ett giltigt namn) Men filen är inte giltig. OmERDDAP™försöker läsa data från den ogiltiga filen, det resulterande felet kommer att leda till att filen läggs till i tabellen med ogiltiga filer. Detta är inte bra. För att undvika detta problem, använd ett tillfälligt filnamn när FTP-filen till exempel ABC2005.nc\\_TEMP . Sedan filenNameRegex test (Se nedan) indikerar att detta inte är en relevant fil. Efter FTP-processen är klar, byt namn på filen till rätt namn. Reneamingprocessen kommer att göra att filen blir relevant på ett ögonblick.
    
##### Filnamn Extracts{#file-name-extracts} 
\\[Denna funktion är DEPRECATED. Använd gärna[\\*\\*FileName pseudosourceName](#filename-sourcenames)I stället.\\]  
EDDTableFromFiles har ett system för att extrahera en String från varje filnamn och använda det för att göra en pseudo-datavariabel. För närvarande finns det inget system för att tolka dessa strängar som datum/tider. Det finns flera XML-taggar för att ställa in detta system. Om du inte behöver en del eller hela detta system, bara inte ange dessa taggar eller använda "" värden.

* PreExtractRegex är en[regelbundet uttryck](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) används för att identifiera text som ska tas bort från filnamnets start. Avlägsnandet sker endast om regexen matchas. Detta börjar vanligtvis med "^" för att matcha början av filnamnet.
* Inlägg ExtractRegex är ett vanligt uttryck som används för att identifiera text som ska tas bort från slutet av filnamnet. Avlägsnandet sker endast om regexen matchas. Detta slutar vanligtvis med "$" för att matcha slutet av filnamnet.
* ExtractRegex Om det är aktuellt används detta vanliga uttryck efter preExtractRegex och postExtractRegex för att identifiera en sträng som ska extraheras från filnamnet. (till exempel,stationID) . Om regex inte matchas används hela filnamnet (minus preExtract och post Extrakt) . Använd ".\\*" för att matcha hela filnamnet som lämnas efter preExtractRegex och postExtractRegex.
* Kolumn NameForExtract är data kolumn källnamn för extraherade strängar. EttdataVariablemed detta[sourceName](#sourcename)måste finnas idataVariables lista (med någon datatyp, men vanligtvis String) .

Till exempel, om en dataset har filer med namn som XYZAble.ncXYZBaker.ncXYZCharlie.nc... och du vill skapa en ny variabel (stationID) När varje fil läses som kommer att ha station ID-värden (Able, Baker, Charlie ......) Utdragna från filnamnen kan du använda dessa taggar:

*   &lt;PreExtractRegex&gt;^XYZ&lt;/preExtractRegex&gt;
Den första ^ är en vanlig uttryck speciell karaktär som tvingarERDDAP™att leta efter XYZ i början av filnamnet. Detta orsakar XYZ, om det finns i början av filnamnet, att tas bort. (filnamnet XYZAble.ncBlir Able.nc) .
*   &lt;PostExtractRegex&gt;.nc$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&lt;/postExtractRegex&gt;
$ i slutet är en vanlig uttryck speciell karaktär som tvingarERDDAP™Att leta efter.nci slutet av filnamnet. Eftersom . är ett vanligt uttryck specialkaraktär (som matchar någon karaktär) Den är kodad som \\. här här här (Eftersom 2E är hexadecimalt teckennummer under en period) . Detta orsakar.ncom det finns i slutet av filnamnet, för att tas bort (till exempel det partiella filnamnet Able.ncBlir Able) .
*   &lt;extraktRegex&gt;.*&lt;/extraheraRegex&gt;
Regelbundet uttryck matchar alla återstående karaktärer (till exempel det partiella filnamnet Able blir extraktet för den första filen) .
*   &lt;kolumnNameForExtract &gt;stationID&lt;/ColumnNameForExtract&gt;
Detta berättarERDDAP™skapa en ny källkolumn som kallasstationIDNär du läser varje fil. Varje rad av data för en viss fil kommer att ha texten extraherad från filnamnet (till exempel, Able) som värdet istationIDKolumn.

I de flesta fall finns det många värden för dessa extrakt taggar som kommer att ge samma resultat - vanliga uttryck är mycket flexibla. Men i några fall finns det bara ett sätt att få önskade resultat.
     
##### PseudosourceNames{#pseudo-sourcenames} 
Varje variabel i varje dataset iERDDAP™och har en&lt;sourceName&gt;] (#Sourname) som anger källans namn för variabeln. EDDTableFromFiles stöder några pseudosourceNames som extraherar ett värde från någon annan plats (t.ex. filens namn eller värdet av ett globalt attribut) och främja det värdet som en kolumn med konstanta värden för den mängd data (t.ex. tabellen över filens data) . För dessa variabler måste du ange variabelns datatyp via [&lt;DataType&gt;] (#datatype) tag. Om den extraherade informationen är en dateTime-sträng anger du formatet för datumTime-strängen i[enheter attribut](#string-time-units). PseudosourceNamealternativ är:
 
###### Global:sourceNames{#global-sourcenames} 
En global metadataattribut i varje källdatafil kan främjas som en kolumn av data. Om en variabel&lt;sourceName&gt; har formatet
```
        <sourceName>global:*attributeName*</sourceName>
```
När då närERDDAP™läser data från en fil,ERDDAP™kommer att leta efter ett globalt attribut av det namnet (Till exempel PI) skapa en kolumn fylld med attributets värde. Detta är användbart när attributet har olika värden i olika källfiler, eftersom användarna annars bara skulle se en av dessa värden för hela datamängden. Till exempel,
```
        <sourceName>global:PI</sourceName>
```
När du marknadsför ett attribut för att vara data,ERDDAP™tar bort motsvarande attribut. Detta är lämpligt eftersom värdet är antagligen annorlunda i varje fil, medan i den aggregerade datamängden.ERDDAP™Det kommer bara att ha ett värde. Om du vill kan du lägga till ett nytt värde för attributet för hela datamängden genom att lägga till&lt;Att namn=" *attribut Namnnamn* "&gt;&gt;&gt;&gt; *Ny ny Värde* &lt;/att&gt; till datasetets globala&lt;addAttributes&gt;] (#addattributes) . För globala attribut somERDDAP™kräver till exempel institution, du måste lägga till ett nytt värde för attributet.
     
###### Variabel:sourceNames{#variable-sourcenames} 
En variabels metadataattribut i varje fil kan marknadsföras för att vara en kolumn av data. Om en variabel&lt;[sourceName](#sourcename)Har formatet
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
När då närERDDAP™läser data från en fil,ERDDAP™kommer att leta efter det angivna attributet (Till exempel ID) av den angivna variabeln (till exempel instrument) skapa en kolumn fylld med attributets värde. Föräldervariabeln (till exempel instrument) behöver inte vara en avdataVariables ingår i datasetets definition iERDDAP. Till exempel,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Detta är användbart när attributet har olika värden i olika källfiler, eftersom användarna annars bara skulle se en av dessa värden för hela datamängden.

När du marknadsför ett attribut för att vara data,ERDDAP™tar bort motsvarande attribut. Detta är lämpligt eftersom värdet är antagligen annorlunda i varje fil, medan i den aggregerade datamängden.ERDDAP™Det kommer bara att ha ett värde. Om du vill kan du lägga till ett nytt värde för attributet för hela datamängden genom att lägga till&lt;Att namn=" *attribut Namnnamn* "&gt;&gt;&gt;&gt; *Ny ny Värde* &lt;till variabelns&lt;addAttributes&gt;] (#addattributes) . För attribut somERDDAP™kräver till exempelioos\\_category  (beroende på din inställning) Du måste lägga till ett nytt värde för attributet.
        
###### FilnamnsourceNames{#filename-sourcenames} 
Du kan extrahera en del av en fils filnamn och marknadsföra det för att vara en kolumn med data. Formatet för denna pseudo [&lt;sourceName&gt;] (#Sourname) är att
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Till exempel,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
När EDDTableFromFiles läser data från en fil, kommer det att se till att filnamnet (Till exempel A201807041442.slcpV1.nc) matchar det angivna regelbundna uttrycket ("Regex") och extrahera den angivna (I detta fall, den första) fånga grupp (som är en del omgiven av parentes) Till exempel "201807041442". (Se detta[regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)och[Regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Regex kan anges som en sträng med eller utan omgivande citat. Om regex anges som en sträng med omgivande citat, måste strängen vara[JSON-stil sträng](https://www.json.org/json-en.html)  (med speciella karaktärer som rymts med tecken) . Fångstgruppsnumret är vanligtvis 1 (Den första fångstgruppen) men kan vara något nummer.
     
###### VägensourceNames{#pathname-sourcenames} 
Du kan extrahera en del av en fils fulla väg Namnnamn (/ kataloger/fileName.ext) och främja det som en kolumn av data. Formatet för denna pseudo [&lt;sourceName&gt;] (#Sourname) är att
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Till exempel,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
När EDDTableFromFiles läser data från en fil, kommer det att se till att hela PathName (Till exempel, /data/myDatasetID/BAY17/B201807041442.nc. För detta test kommer katalogens separatorer alltid att vara'/'Aldrig "\" ") matchar det angivna regelbundna uttrycket ("Regex") och extrahera den angivna (I detta fall, den första) fånga grupp (som är en del omgiven av parentes) Till exempel "BAY17". (Se detta[regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)och[Regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Regex kan anges som en sträng med eller utan omgivande citat. Om regex anges som en sträng med omgivande citat, måste strängen vara en[JSON-stil sträng](https://www.json.org/json-en.html)  (med speciella karaktärer som rymts med tecken) . Fångstgruppsnumret är vanligtvis 1 (Den första fångstgruppen) men kan vara något nummer.
         
##### "0 filer" Felmeddelande{#0-files-error-message-2} 
* Om du kör[GenerateDatasetsXml](#generatedatasetsxml)eller[DasDds](#dasdds)eller om du försöker ladda en EDDTableFrån... Filer dataset iERDDAP™, och du får ett "0 filer" felmeddelande som indikerar attERDDAP™Hittade 0 matchande filer i katalogen (När du tror att det finns matchande filer i den katalogen) Från:
    * Kontrollera att filerna verkligen finns i den katalogen.
    * Kontrollera stavningen av katalogen namn.
    * Kolla filenNameRegex. Det är verkligen lätt att göra misstag med regex. För teständamål, prova regex . * som ska matcha alla filnamn. (Se detta[regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)och[Regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Kontrollera att användaren som kör programmet (t.ex. användar=tomcat (??) För Tomcat/ERDDAP) har "läst" tillstånd för dessa filer.
    * I vissa operativsystem (Till exempel SELinux) Och beroende på systeminställningar måste användaren som körde programmet ha "läs" tillstånd för hela katalogkedjan som leder till katalogen som har filerna.
         
##### Standardisera Vad är vad{#standardizewhat} 
* När någon underklass av EDDTableFromFiles aggregerar en uppsättning källfiler, för en viss variabel, har alla källfiler MUST identiska attributvärden för flera attribut:scale\\_factor,add\\_offset\\_Unsigned,missing\\_value, \\_FillValue och enheter). Tänk på det: om en fil har windSpeed-enheter = knots och en annan har windSpeed-enheter = m / s, bör datavärdena från de två filerna inte inkluderas i samma aggregerade dataset. Så när EDDTableFromFiles först skapar datamängden läser den attributvärdena från en fil, avvisar sedan alla filer som har olika värden för dessa viktiga attribut. För de flesta samlingar av filer är detta inte ett problem eftersom attributen för alla variabler är konsekventa. Men för andra samlingar av filer kan detta leda till 1%, 10%, 50%, 90% eller till och med 99% av filerna som avvisas som "dåliga" filer. Det är problem.
    
EDDTableFrån filer har ett system för att hantera detta problem: standardisera Vad. Standardisera Vilken inställning berättar EDDTableFromFiles för att standardisera filerna så snart det läser dem, innan EDDTableFromFiles tittar på attributen för att se om de är konsekventa.
    
Flipsidan är: om datamängden inte har detta problem, använd inte standardisering Vad. Standardisera Vad har vissa potentiella risker (diskuteras nedan) och ineffektivitet. Så om du inte behöver funktionerna i standardisering Vad, det finns inget behov av att möta de potentiella riskerna och ineffektiviteten. Den största ineffektiviteten är: När olika standardiserar Vilka alternativ används av en datamängd, det innebär att källfilerna lagrar data på väsentligt olika sätt (t.ex. med olikascale\\_factorochadd\\_offset, eller med tidssträngar med olika format) . Således, för en viss begränsning i en användarbegäran, finns det inget sätt förERDDAP™för att göra en enda källnivåbegränsning som kan tillämpas på alla källfiler. SåERDDAP™kan endast tillämpa de drabbade begränsningarna på en högre nivå. SåERDDAP™måste läsa data från fler filer innan du tillämpar de högre begränsningarna på destinationsnivå. Så begär till datamängder som använder standardisera Vad tar längre tid att bearbetas.
    
För att använda detta system måste du ange
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
i den[datasets.xmlFör EDDTableFrån... Filer dataset](#eddtablefromfiles-skeleton-xml)Inom&lt;dataset&gt; tagga).
    
och *Standardisera Vad är vad* värde specificerar vilka ändringar EDDTableFromFiles bör försöka tillämpa. Förändringarna är summan av någon kombination av:
    
1. Unpack
Detta gör många vanliga och säkra operationer för att standardisera numeriska kolumner i filerna:
    * Omscale\\_factoroch/elleradd\\_offsetattribut är närvarande, ta bort dem och tillämpa dem för att packa upp datavärdena.
    * Förpackade attribut (e.g. faktisk \\_min, faktisk \\_max,actual\\_range,data\\_min,data\\_maxdata_range,valid\\_min,valid\\_max,valid\\_range) Om så är fallet, om variabeln var packad, och om attributvärdena var packade (Detta är knepigt, men rimligt tillförlitligt) .
    * Om \\_FillValue och/ellermissing\\_valueär närvarande, konvertera dessa datavärden tillERDDAP"standard" saknade värden: MAX\\_VALUE för heltalstyper (t.ex. 127 för byte, 32,767 för kort och 2,147,483,647 för ints, 9223372036854775807 för longs) och NaN för dubblar och flyter.
    * Ta bort det gamla \\_FillValue och/ellermissing\\_valueattribut (Om någon) och ersätta dem med bara \\_FillValue=\\[ochERDDAP™Standard saknas värde\\].
         
2. Standardisera numeriska tider
Om en numerisk kolumn har CF-stil numeriska tid enheter (" *TimeUnits* sedan dess *bastid* t.ex. "dagar sedan 1900-01-01") Detta konverterar datumet Tidsvärden till"seconds since 1970-01-01T00:00:00Z"värden och ändrar enheterna attribut för att ange det.
Om detta väljs och det finns en chans att denna variabel harscale\\_factorelleradd\\_offset# 1 måste väljas också.
     
3. Applicera Stringmissing\\_value  
Om en strängkolumn har \\_FillValue och/ellermissing\\_valueattribut, detta konverterar dessa värden till "" och tar bort attributen.
     
4. Hitta numeriskamissing\\_value  
Om en numerisk kolumn inte har \\_FillValuemissing\\_valueattribut, detta försöker identifiera en odefinierad numeriskmissing\\_value  (t.ex. -999, 9999, 1e37f) och omvandla instanser av det till "standard" värden (MAX\\_VALUE för heltalstyper och NAN för dubblar och flyter) .
     **Detta alternativ har en risk:** Om det största eller minsta giltiga datavärdet ser ut som ett saknat värde (t.ex. 999) Dessa giltiga datavärden konverteras sedan till saknade värden (t.ex. NaN) .
     
5. Ändra String "N / A" till ""
För varje strängkolumn konverterar du flera strängar som vanligtvis används för att ange ett saknat strängvärde till ". För närvarande letar detta efter ".", "...", "", "?", "??", "N / A", "NA", "ingen", "inte tillämplig", "null", "okänt", "ospecificerat". Strängsökningen är case-insensitive och tillämpas efter strängarna är trim'd. "nd" och "andra" är specifikt inte på listan.
     **Detta alternativ har en risk:** Strängar som du anser vara giltiga värden kan omvandlas till "".
     
6. Standardisera till String ISO 8601 DateTimes
För varje String-kolumn, försök att konvertera icke-rena-numeriska String-datumTimes (t.ex. "Jan 2, 2018") till ISO 8601 String dateTimes ("2018-01-02") .
     **Note** att alla datavärden för kolumnen måste använda samma format, annars kommer detta alternativ inte att göra några ändringar i en viss kolumn.
     **Detta alternativ har en risk:** Om det finns en kolumn med strängvärden som bara råkar se ut som ett vanligt datum Tidsformat konverteras de till ISO 8601 String dateTimes.
     
7. Standardisera kompakta datum till ISO 8601 datum
För varje String eller integer-typ kolumn, försök att konvertera rent-numeriska String datumTimes (t.ex. "20180102") till ISO 8601 String dateTimes ("2018-01-02") .
     **Note** att alla datavärden för kolumnen måste använda samma format, annars kommer detta alternativ inte att göra några ändringar i en viss kolumn.
     **Detta alternativ har en risk:** Om det finns en kolumn med värden som inte är kompakta datum Tider men ser ut som kompakt datumTimes, de kommer att konverteras till ISO 8601 String dateTimes.
     
8. Standardisera enheter
Detta försöker standardisera enheterna sträng för varje variabel. Till exempel "mätare per sekund", "meter / sekund","m.s^-1","m s-1""m.s-1" kommer alla att konverteras till "m.s-1". Detta ändrar inte datavärdena. Detta fungerar bra för giltigtUDUNITSenheter strängar, men kan ha problem med ogiltiga eller komplexa strängar. Du kan hantera problem genom att ange specifika mellan par i&lt;StandardizeUdunits&gt; in iERDDAP"S
    \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil. Skicka alla ändringar du gör till Chris. John på noaa.gov så att de kan införlivas i standardmeddelandena.xml.
     **Detta alternativ har en risk:** Detta kan mangla några komplexa eller ogiltiga enheter, men du kan använda den arbetsrunda som beskrivs ovan för att kringgå problem om de uppstår.
         
    
Standardvärdet för standardisering Vad är 0, vilket inte gör någonting.

Om/när du ändrar värdet av standardisering Vad nästa gång datamängden laddas om,ERDDAP™kommer att läsa alla datafiler för datamängden för att bygga om mini-databasen med information om varje fil. Om datamängden har massor av filer, kommer detta att ta lång tid.
    
Anteckningar:

* En knepig sak är -
Standardisera Vilken inställning används för alla kolumner i källfilen. Så, till exempel, med #2048 kan framgångsrikt konvertera en kolumn med kompakt String dateTimes till ISO 8601 String dateTimes, men det kan också felaktigt konvertera en kolumn med Strings som bara råkar se ut som kompakt datumTimes.
     
*   datasets.xmloch GenerateDatasets Xml -
Det är särskilt svårt att få inställningarna rätt idatasets.xmlFör att göra din dataset fungerar som du vill att den ska. Det bästa sättet (som alltid) är:
    1. Användning[GenerateDatasetsXml](#generatedatasetsxml)och specificera värdet av standardisera Vad du vill använda.
    2. Användning[DasDds](#dasdds)säkerställa att datamängden laddas korrekt och återspeglar standardiseringen Vilken inställning som du angav.
    3. Testa datamängden för hand när den är iERDDAP™säkerställa att de berörda variablerna fungerar som förväntat.
         
* Risker -
Alternativ #256 och högre är mer riskfyllda, det vill säga det finns en större chans attERDDAP™kommer att göra en förändring som inte bör göras. Exempel #2048 kan av misstag konvertera en variabel med station ID-strängar som alla bara råkar se ISO 8601 "kompakt" datum (t.ex. 20180102) i ISO 8601"extended"Datum ("2018-01-02") .
     
* Långsamt efter en förändring -
Eftersom värdet av standardisering Vad ändrar datavärdena som EDDTableFromFiles ser för varje datafil, om du ändrar standardiseringen Vilken inställning kommer EDDTableFromFiles att kasta bort all cachad information om varje fil (som inkluderar min och max för varje datavariabel i varje fil) och läs om varje datafil. Om en dataset har ett stort antal filer, kan detta vara mycket tidskrävande, så det tar lång tid för dataset att ladda om första gången.ERDDAP™laddar den efter att du gjort förändringen.
     
* Heuristik -
Alternativ #256 och ovan använder heuristik för att göra ändringarna. Om du stöter på en situation där heuristiken fattar ett dåligt beslut, vänligen maila en beskrivning av problemet till Chris. John på noaa. Gov så att vi kan förbättra heuristiken.
     
* Alternativ -
Om en av standardiseringVilka alternativ inte löser ett problem för en viss datamängd, kan du kanske lösa problemet genom att göra en[.ncml fil](#ncml-files)Parallellt med varje datafil och definiera ändringar i filerna så att filerna är konsekventa. Berätta sedan EDDTableFrån... Filer dataset för att aggregera.ncml filer.
    
Eller använda[NCO](#netcdf-operators-nco)att faktiskt göra ändringar i filerna så att filerna är konsekventa.
        
##### Separata kolumner för år, månad, datum, timme, minut, andra{#separate-columns-for-year-month-date-hour-minute-second} 
Det är ganska vanligt att tabelldatafiler har separata kolumner för år, månad, datum, timme, minut, andra. FöreERDDAP™v2.10, den enda lösningen var att redigera datafilen för att kombinera dessa kolumner till en enhetlig tidskolumn. MedERDDAP™2.10+ kan du använda
[Och [Gud]&lt;sourceName&gt;==&gt; *Uttryck* &lt;sourceName&gt;] (#Sourname) Att berättaERDDAP™hur man kombinerar källkolumnerna för att göra en enhetlig tidskolumn, så du behöver inte längre redigera källfilen.
##### &lt;skipHeaderToRegex & gt;{#skipheadertoregex} 
* [Och [Gud]&lt;skipHeaderToRegex (#skipheadertoregex) -----
Optional. (För EDDTableFromAsciiFiles och EDDTableFromColumnarAsciiFiles dataset endast.)   
När EDDTableFromAsciiFiles läser en datafil, kommer den att ignorera alla rader upp till och med den linje som matchar detta vanliga uttryck. Standarden är "", som inte använder det här alternativet. Ett exempel är
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
som ignorerar alla linjer fram till och med en linje som börjar med "\\*\\*End Of Header.

När du använder den här taggen,&lt;kolumnNamesRow&gt; och&lt;förstaDataRow&gt; agera som om rubriken har tagits bort innan filen läses. Till exempel skulle du använda kolumnNamesRow = 0 om kolumnnamnen är på raden direkt efter rubriken.

Om du vill använda generera Dataset Xml med en dataset som behöver denna tagg:

1. Gör en ny, tillfällig provfil genom att kopiera en befintlig fil och ta bort rubriken.
2. Kör generera Dataset Xml och ange den provfilen.
3. Tillsätt manuellt&lt;skipHeaderToRegex&gt; tag tilldatasets.xmlchunk.
4. Ta bort den tillfälliga, provfilen.
5. Använd dataset iERDDAP.
##### &lt;skipLinesRegex & gt;{#skiplinesregex} 
Optional. (För EDDTableFromAsciiFiles och EDDTableFromColumnarAsciiFiles dataset endast.)   
När EDDTableFromAsciiFiles läser en datafil, kommer den att ignorera alla rader som matchar detta vanliga uttryck. Standarden är "", som inte använder det här alternativet. Ett exempel är
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
som ignorerar alla linjer som börjar med "#".

När du använder den här taggen,&lt;kolumnNamesRow&gt; och&lt;förstaDataRow&gt; agera som om alla matchningslinjer hade tagits bort innan filen läses. Till exempel skulle du använda kolumnNamesRow = 0 även om det finns flera rader som börjar med till exempel "#" i början av filen.
    
#### EDDTableFromFiles skelett XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiService{#eddtablefromasciiservice} 
[ **EDDTableFromAsciiService** ](#eddtablefromasciiservice)är i huvudsak en skärmskrapa. Den är avsedd att hantera datakällor som har en enkel webbtjänst för att begära data (ofta ett HTML-formulär på en webbsida) och som kan returnera data i vissa strukturerade ASCII-format (Exempelvis ett kommaseparerat värde eller kolumn ASCII-textformat, ofta med annan information före och/eller efter data) .

EDDTableFromAsciiService är superklassen av alla EDDTableFromAsciiService... klasser. Du kan inte använda EDDTableFromAsciiService direkt. Använd istället en underklass av EDDTableFromAsciiService för att hantera specifika typer av tjänster:

*   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)Får data frånNOAANOS ASCII-tjänster.

För närvarande stöds inga andra servicetyper. Men det är oftast relativt lätt att stödja andra tjänster om de fungerar på ett liknande sätt. Kontakta oss om du har en förfrågan.

#### Detaljer{#details} 
Följande information gäller alla underklasser av EDDTableFromAsciiService.

* Begränsningar -ERDDAP™Tabular dataförfrågningar kan sätta begränsningar på någon variabel. Den underliggande tjänsten kan eller inte tillåter begränsningar på alla variabler. Till exempel stöder många tjänster endast begränsningar på stationsnamn, latitud, longitud och tid. Så när en underklass av EDDTableFromAsciiService får en begäran om en delmängd av en datamängd, passerar den så många begränsningar som möjligt till källdatatjänsten och tillämpar sedan de återstående begränsningarna för de data som returneras av tjänsten, innan data lämnas till användaren.
* Valid Range - Till skillnad från många andra datasettyper vet EDDTableFromAsciiService vanligtvis inte omfattningen av data för varje variabel, så det kan inte snabbt avvisa förfrågningar om data utanför det giltiga intervallet.
* Parsing the ASCII Text Response När EDDTableFromAsciiService får ett svar från en ASCII Text Service måste det validera att svaret har det förväntade formatet och informationen och sedan extrahera data. Du kan ange formatet genom att använda olika speciella taggar i biten av XML för denna dataset:
    *   &lt;innanData1&gt; genom&lt;innanData10&gt; taggar -- Du kan ange en serie textstycken (Så många du vill, upp till 10) EDDTableFromAsciiService måste leta efter i rubriken på ASCII-texten som returneras av tjänsten med&lt;innanData1&gt; genom&lt;innanData10&gt;. Detta är till exempel användbart för att verifiera att svaret inkluderar de förväntade variablerna med hjälp av de förväntade enheterna. Den sista innanData-taggen som du anger identifierar texten som uppstår precis innan data börjar.
    *   &lt;AfterData &gt; ----- Detta anger den text som EDDTableFromAsciiService kommer att leta efter i ASCII-texten som returneras av tjänsten som betyder slutet på data.
    *   &lt;NoData &gt; ----- Om EDDTableFromAsciiService hittar denna text i ASCII-texten som returneras av tjänsten, drar den slutsatsen att det inte finns några data som matchar begäran.
#### EDDTableFromAsciiService skelett XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiServiceNOS{#eddtablefromasciiservicenos} 
[ **EDDTableFromAsciiServiceNOS** ](#eddtablefromasciiservicenos)gör EDDTable dataset från ASCII-textdatatjänster som erbjuds avNOAA"S[National Ocean Service (NOS) ](https://oceanservice.noaa.gov/). För information om hur denna klass fungerar och hur man använder den, se klassens superklass[EDDTableFromAsciiService](#eddtablefromasciiservice). Det är osannolikt att någon annan än Bob Simons kommer att behöva använda denna underklass.

Eftersom data inom svaret från en NOS-tjänst använder en kolumn ASCII-textformat måste andra datavariabler än latitud och longitud ha ett speciellt attribut som anger vilka tecken på varje datalinje som innehåller den variablens data, till exempel.
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllDatasets{#eddtablefromalldatasets} 
[ **EDDTableFromAllDatasets** ](#eddtablefromalldatasets)är en högre dataset som har information om alla andra dataset som för närvarande är laddade i dinERDDAP. Till skillnad från andra typer av datamängder finns det ingen specifikation förallDatasetsDataset idatasets.xml.ERDDAP™Skapar automatiskt en EDDTableFromAllDatasets dataset (meddatasetID= =allDatasets) . och enallDatasetsdataset kommer att skapas i varjeERDDAP™installation och kommer att fungera på samma sätt i varjeERDDAP™installation.

ochallDatasetsdataset är en tabular dataset. Den har en rad information för varje dataset. Den har kolumner med information om varje dataset, t.ex.datasetID, tillgänglig, institution, titel, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime, etc. För därförallDatasetsär en tabell dataset, du kan fråga det på samma sätt som du kan fråga någon annan tabell dataset iERDDAP™och du kan ange filtypen för svaret. Detta låter användare söka efter datamängder av intresse på mycket kraftfulla sätt.
 
### EDDTableFromAsciiFiles{#eddtablefromasciifiles} 
[ **EDDTableFromAsciiFiles** ](#eddtablefromasciifiles)aggregerar data från komma-, flik-, semicolon- eller rymdseparerade tabell ASCII-datafiler.

* Oftast kommer filerna att ha kolumnnamn på den första raden och data som börjar på den andra raden. (Här kallas den första raden av filen radnummer 1.) Men du kan använda&lt;kolumnNamesRow&gt; och&lt;FirstDataRow &gt; i dindatasets.xmlfil för att ange ett annat radnummer.
*   ERDDAP™tillåter raderna av data att ha olika antal datavärden.ERDDAP™förutsätter att de saknade datavärdena är de slutliga kolumnerna i raden.ERDDAP™tilldelar de standardsaknade värdena för de saknade datavärdena. (Tillsatt v1.56) 
* ASCII-filer är lätta att arbeta med, men de är inte det mest effektiva sättet att lagra / hämta data. För större effektivitet, spara filerna somNetCDFv3.ncfiler filer (med en dimension, "rad", delad av alla variabler) I stället. Du kan[AnvändningERDDAP™för att generera nya filer](#millions-of-files).
* Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. På grund av den totala bristen på metadata i ASCII-filer måste du alltid redigera resultaten av GenerateDatasetsXml.
* Varning: NärERDDAP™Läser ASCII datafiler, om det hittar ett fel på en viss linje (t.ex. felaktigt antal objekt) Den loggar ett varningsmeddelande (Varning: Dålig linje (s) av data ... med en lista över de dåliga linjerna på efterföljande rader) till[Log.txt fil](/docs/server-admin/additional-information#log)och sedan fortsätter att läsa resten av datafilen. Därför är det ditt ansvar att se periodiskt (Eller skriva ett manus för att göra det) för det budskapet i loggen. txt så att du kan åtgärda problemen i datafilerna.ERDDAP™är inställd på detta sätt så att användarna kan fortsätta att läsa alla tillgängliga giltiga data även om vissa rader av filen har brister.
     
### EDDTableFrån AwsXmlFiles{#eddtablefromawsxmlfiles} 
[ **EDDTableFrån AwsXmlFiles** ](#eddtablefromawsxmlfiles)samlar in data från en uppsättning automatiska väderstationer (AWS) XML-datafiler med WeatherBug Rest XML API (som inte längre är aktiv) .

* Denna typ av fil är ett enkelt men ineffektivt sätt att lagra data, eftersom varje fil vanligtvis verkar innehålla observationen från bara en gång. Så det kan finnas ett stort antal filer. Om du vill förbättra prestanda, överväga att konsolidera grupper av observationer (En veckas värde?) in iNetCDFv3.ncfiler filer (Bäst:.ncfiler med[CF Diskret sampling geometrier (DSG) Contiguous Ragged Array-format](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) och använda[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)  (eller[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) för att tjäna data. Du kan[AnvändningERDDAP™för att generera nya filer](#millions-of-files).
* Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.
     
### EDDTableFromColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
[ **EDDTableFromColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles)aggregerar data från tabular ASCII datafiler med fasta bredd kolumner.

* Oftast kommer filerna att ha kolumnnamn på den första raden och data som börjar på den andra raden. Den första raden/raden i filen kallas rad #1. Men du kan använda&lt;kolumnNamesRow&gt; och&lt;FirstDataRow &gt; i dindatasets.xmlfil för att ange ett annat radnummer.
* och&lt;addAttributes&gt; för varje&lt;dataVariableFör dessa datamängder måste dessa två speciella attribut:
    
    *   &lt;att namn="startColumn"&gt; *Integer* &lt;att&gt; - anger teckenkolumnen i varje rad som är början på denna datavariabel.
    *   &lt;att namn="stopColumn"&gt; *Integer* &lt;att&gt; - anger teckenkolumnen i varje rad som är 1 efter slutet av denna datavariabel.
    
Den första teckenkolumnen kallas kolumn #0.
Till exempel, för den här filen som har tidsvärden som innehåller temperaturvärden:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
Tidsdatavariabeln skulle ha
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
och tidsdatavariabeln skulle ha
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Dessa attribut måste anges för alla variabler utom[Fast-värde](#fixed-value-sourcenames)och[Filnamn-source-namn](#filename-sourcenames)variabler.
* ASCII-filer är lätta att arbeta med, men de är inte ett effektivt sätt att lagra / hämta data. För större effektivitet, spara filerna somNetCDFv3.ncfiler filer (med en dimension, "rad", delad av alla variabler) I stället. Du kan[AnvändningERDDAP™för att generera nya filer](#millions-of-files).
* Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. På grund av svårigheten att bestämma start- och slutpositionerna för varje datakolumn och den totala bristen på metadata i ASCII-filer måste du alltid redigera resultaten från GenerateDatasetsXml.
     
### EDDTableFromHttpGet{#eddtablefromhttpget} 
EDDTable FromHttpGet skiljer sig från alla andra typer av datamängder iERDDAP™genom att det har ett system där specifika "authors" kan lägga till data, revidera data eller radera data från datamängden med regelbundenHTTP GETeller[POST](#http-post)Förfrågningar från ett datorprogram, ett skript eller en webbläsare. Datamängden är sökbar av användare på samma sätt som alla andra EDDTable datamängder är sökbara iERDDAP. Se beskrivningen av denna klasss superklass,[EDDTableFromFiles](#eddtablefromfiles)att läsa om de funktioner som ärvs från den superklassen.

De unika egenskaperna hos EDDTableFromHttpGet beskrivs nedan. Du måste läsa allt detta första avsnitt och förstå det; annars kan du ha orealistiska förväntningar eller få dig i trubbel som är svårt att fixa.

#### Intended Use{#intended-use} 
Detta system är avsett för:

* Tabular (In situ) data, inte ruttna data.
* Realtidsdata -
Målet är att tillåta en författare (t.ex. sensorn, ett automatiserat QC-skript eller en specifik människa) För att göra en förändring i datasetet (via en[Infoga eller .delete kommando](#insert-and-delete)) och göra denna förändring tillgänglig förERDDAP™användare, allt på mindre än 1 sekund, och eventuellt mycket snabbare. Det mesta av den 1 sekunden är nättid.ERDDAP™kan behandla begäran på cirka 1 ms och uppgifterna är omedelbart tillgängliga för användare. Detta är en[Snabbt](#httpget-speed),[Robust](#robust)och[tillförlitligt system](#system-reliability).
* Nästan alla datafrekvenser -
Detta system kan acceptera sällsynta data (t.ex. dagligen) genom mycket frekventa data (t.ex. 100 Hz data) . Om du optimerar systemet kan det hantera högre frekvensdata (10 KHz-data om du går till extrema) .
* Data från en sensor eller en samling av liknande sensorer.
*   [Versioning](#versioning)///[Reproducerbar vetenskap](https://en.wikipedia.org/wiki/Reproducibility)///DOIs --
Situationer där du behöver kunna göra ändringar i data (t.ex. ändra en kvalitetskontrollflagga) vet vilken författare som gjorde varje förändring, vet tidsstämpeln för när författaren gjorde förändringen, och (på begäran) kunna se originaldata från innan ändringen gjordes. Således är dessa datamängder berättigade till[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). för att de möterDOIKravet på att datamängden är oföränderlig, förutom genom aggregation. I allmänhet är nära realtid datamängder inte berättigade tillDOIeftersom data ofta ändras retroaktivt (t.ex. för QA/QC ändamål) .
     

När data är i en EDDTableFromHttpGet dataset, kan alla användare begära data på samma sätt som de begär data från någon annan EDDTable dataset.
     
#### Experimentellt: Var försiktig{#experimental-be-careful} 
Eftersom detta system är nytt och eftersom förlorade miljödata inte kan förvärvas, bör du behandla EDDTableFromHttpGet som experimentell. Om du övergår från ett annat system, kör det gamla systemet och det nya systemet parallellt tills du är säker på att det nya systemet fungerar bra. (veckor eller månader, inte bara timmar eller dagar) . I alla fall, se till att ditt system separat arkiverar .insert och .delete URLs som skickas till EDDTableFromHttpGet dataset (Även om bara i Apache och/eller Tomcat loggar) Åtminstone ett tag. Och i alla fall, se till att de datafiler som skapats av din EDDTableFromHttpGet dataset rutinmässigt backas upp till externa datalagringsenheter. (Observera att[Rsync](https://en.wikipedia.org/wiki/Rsync)kan säkerhetskopiera datafiler som skapats av EDDTableFromHttpGet mycket effektivt.)   
     
#### Infoga och .delete{#insert-and-delete} 

För alla dataset iERDDAP™När du skickar en begäran tillERDDAP™för en delmängd av data i en datamängd anger du den filtyp som du vill ha för svaret, t.ex. .csv,.htmlTable,.nc,.json. EDDTableFromHttp Få utökar detta system för att stödja ytterligare två "filtyper" som kan infoga (eller förändring) eller radera data i datamängden:

* Infoga
    * Begäran är formaterad som ett standard HTML-formulärsvar, med nyckel = värdepar, separerade med "&". Till exempel,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
berättarERDDAP™lägga till eller ändra data förstationID=46088 för den angivna tiden.
    * Författaren till denna förändring är JohnSmith och nyckeln är someKey1.
    * URL:en måste innehålla giltiga värden (inte saknade värden) för alla[httpFå obligatoriska](#httpgetrequiredvariables-global-attribute)
    * Om värdena påhttpFå krävs Variabel i begäran (t.ex.,stationIDoch tid) matcha värdena på en rad redan i datamängden, de nya värdena överskriver effektivt de gamla värdena (Även om de gamla värdena fortfarande är tillgängliga om användaren begär data från en tidigare[version version version](#versioning)av dataset) .
    * .insert URL får aldrig inkludera &timestamp = (ERDDAP™genererar detta värde) eller &command= (Det specificeras av .insert (som är kommando=0) eller .delete (som är kommando= 1 1) ) .
    * Om .insert URL inte specificerar värden för andra kolumner som finns i datamängden, antas de vara de infödda saknade värdena. (MAX\\_VALUE för integer datatyper, NaN för flottor och dubblar och "" för strängar) .
             
    * .delete
        * Begäran är formaterad som ett standard HTML-formulärsvar, med nyckel = värdepar, separerade med "&". Till exempel,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
berättarERDDAP™för att radera data förstationID=46088 vid den angivna tiden.
        * Författaren till denna förändring är JohnSmith och nyckeln är someKey1.
        * Webbadressen måste ange[httpFå obligatoriska](#httpgetrequiredvariables-global-attribute)på begäran (t.ex.,stationIDoch tid) . Om dessa värden matchar värdena på en rad redan i datamängden (som de vanligtvis kommer) De gamla värdena raderas effektivt (Även om de gamla värdena fortfarande är tillgängliga om en användare begär data från en tidigare[version version version](#versioning)av dataset) .
        * Det finns ingen anledning att ange värden för icke-HttpGetRequiredVariables, annat än författare, som behövs för att autentisera begäran.
             
    
Detaljer:
    * .insert och .delete-förfrågningar är formaterade som standard HTML-formresponser, med nyckel = värdepar, separerade av "&". Värdena måste vara[procent kodade](https://en.wikipedia.org/wiki/Percent-encoding). Således måste du koda specialtecken i formen % HH, där HH är karaktärens 2-siffriga hexadecimalvärde. Vanligtvis behöver du bara konvertera några av skiljetecknen: % till %25 och till %26, ”i %22,&lt;i %3C, = %3D, &gt; till %3E, + till %2B,|i %7C,\\[i %5B,\\]i %5D, utrymme till %20 och omvandla alla tecken över #127 till deras UTF-8-formulär och sedan koda varje byte av UTF-8-formuläret till %HH-formatet (fråga en programmerare om hjälp) .
    * .infoga och .delete förfrågningar måste omfatta[httpFå obligatoriska](#httpgetrequiredvariables-global-attribute)t.ex.,stationIDoch tid. För .infoga förfrågningar, variabler som inte anges i begäran antas saknas värden (MAX\\_VALUE för heltalsvariabler, NaN för flyt och dubbla variabler och en tom sträng för strängvariabler) . För .delete-förfrågningar, värden för icke-HttpGetRequired Variables (annat än författare, som krävs) ignoreras.
    * .infoga och .delete förfrågningar måste innehålla namnet på författaren och författarens nyckel via en parameter i formförfattaren = *Författare _key* som den sista parametern på begäran. Att kräva att detta senast säkerställer att hela begäran har mottagits avERDDAP. Endast författaren (Inte nyckeln) lagras i datafilen. Du måste ange listan över tillåtna *Författare _key* s via det globala attributet[httpGetKeys](#httpgetkeys)
    * .insert och .delete parametrar kan vara skalär (singel) värden eller arrayer av någon längd i form\\[värde1, värde2, värde3,...valueN\\]. För en viss begäran måste alla variabler med arrayer ha arrayer med samma antal värden. (Det är ett fel) . Om en förfrågan har skalär- och matrisvärden replikeras skalärvärden för att bli matriser med samma längd som de angivna matriserna, t.ex., &stationID46088 kan behandlas som ochstationID= =\\[46088,46088,46088\\]. Arrays är nyckeln till[Hög genomströmning](#httpget-speed). Utan arrays kommer det att vara utmanande att infoga eller ta bort mer än 8 rader data per sekund från en fjärrförfattare. (på grund av hela nätverkets överhuvud) . Med arrays blir det lätt att infoga eller .delete mer än 1000 rader data per sekund från en fjärrsensor.
    * .insert och .delete accepterar (utan felmeddelande) flytande punktnummer när heltal förväntas. I dessa fall avrundar datamängden värdena till heltal.
    * .insert och .delete accepterar (utan felmeddelande) integer och flytande punktnummer som är out-of-range av variabelns datatyp. I dessa fall lagrar dataset värdena somERDDAPs infödda saknade värden för den datatypen (MAX\\_VALUE för heltalstyper och NaN för flottor och dubblar) .
         
#### Svar{#response} 
Om .infoga eller .delete URL lyckas kommer HTTP-responskoden att vara 200 (OK) Svaret kommer att vara text med en.jsonobjekt, t.ex.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Observera att tidsstämplarna har millisekund precision.

Om .infoga eller .delete URL misslyckas får du en HTTP-responskod som är annan än 200 (Okej) Fel 403 Förbjudet om du skickar in en felaktig författares värde.ERDDAP™Skickar HTTP-responskoden (Inte, t.ex., en.jsonformaterat fel) eftersom det är så saker görs på internet och eftersom fel kan uppstå någonstans i systemet. (t.ex. i nätverket, som returnerar ett HTTP-fel) . Om felet är frånERDDAP™Svaret kan innehålla viss text (Inte inte.json) med en mer detaljerad förklaring av vad som gick fel, men HTTP-responskoden (200=Okej, allt annat är problem) är rätt sätt att kontrollera om .insert eller .delete lyckades. Om du kontrollerar HTTP-responskoden är inte möjlig eller är obekväm, sök efter "status": "framgång" i svarstexten som bör vara en tillförlitlig indikation på framgång.
    
#### Log Files{#log-files} 
När EDDTableFromHttpGet tar emot .insert och .delete-kommandon, appenderar den helt enkelt informationen till den relevanta filen i en uppsättning loggfiler, som var och en är en tabell lagrad i en[JSON Lines CSV-fil](https://jsonlines.org/examples/). När en användare gör en begäran om data,ERDDAP™snabbt läser relevanta loggfiler, tillämpar ändringarna i datamängden i den ordning de gjordes, och filtrerar sedan begäran via användarens begränsningar som alla andraERDDAP™Databegäran. Uppdelning av data i olika loggfiler, lagring av olika bitar av information (t.ex. tidsstämpeln för kommandot, och om kommandot var .insert eller .delete) , och olika aspekter av inställningen av datamängden, alla gör det möjligt förERDDAPlagra data till och hämta data från denna datamängd mycket snabbt och mycket effektivt.
     
#### Säkerhet och författare{#security-and-author} 
Varje .insert och .delete kommando måste inkludera &author = *Författare _key* som den sista parametern, där författaren_key består av författarens identifierare (du valde: namn, initialer, pseudonym, nummer) En underscore och en hemlig nyckel. ochERDDAP™administratören kommer att arbeta med författare för att generera listan över giltiga författarn key-värden, som kan ändras när som helst.
När EDDTableFromHttpGet tar emot en .insert eller .delete kommandot, ser det till att auktorid\\_key är den sista parametern och giltig. Eftersom det är den sista parametern indikerar det att hela kommandoraden nåddeERDDAP™Och var inte truncated. Den hemliga nyckeln säkerställer att endast specifika författare kan infoga eller ta bort data i datamängden.ERDDAP™sedan extraherar auktoriteten och sparar det i författarens variabel, så att vem som helst kan se vem som var ansvarig för en given förändring av datamängden.
.infoga och .delete kommandon kan endast göras viahttps:  (Säkert)  ERDDAP™URL:er. Detta säkerställer att den information som överförs hålls hemlig under transitering.
     
#### timestamp{#timestamp} 
Som en del av logsystemet lägger EDDTableFromHttpGet till en timestamp (tiden dåERDDAPmottagna begäran) till varje kommando som den lagrar i loggfilerna. För därförERDDAP™genererar tidsstämpeln, inte författarna, det spelar ingen roll om olika författare gör ändringar från datorer med klockor inställda på något annorlunda tider. Tidsstämpeln anger tillförlitligt den tid då ändringen gjordes till datamängden.
     
#### HTTP POST{#http-post} 
*   [Vad sägs om HTTP POST?&#33;](#http-post)  
HTTP[POST](https://en.wikipedia.org/wiki/POST_(HTTP)är det bättre alternativet (jämfört medHTTP GET) för att skicka information från en klient till en HTTP-server. Om du kan, eller om du verkligen vill förbättra säkerheten, använd POST istället för att skicka informationen till dig.ERDDAP. POST är säkrare eftersom: med GET ochhttpsURL:en överförs på ett säkert sätt, men hela webbadressen (inklusive parametrar, inklusive författaren) skall skrivas till Apache, Tomcat, ochERDDAP™loggfiler, där någon kunde läsa dem om filerna inte är ordentligt säkrade. Med POST överförs parametrarna på ett säkert sätt och skrivs inte till loggfilerna. POST är lite svårare för kunder att arbeta med och stöds inte så brett av klientprogramvara, men programmeringsspråk stöder det. Innehållet som du skickar till datamängden via GET eller POST kommer att vara detsamma, bara formaterat på ett annat sätt.
     
#### httpFå krävs Variables Global Attribute{#httpgetrequiredvariables-global-attribute} 
En viktig del av vad som gör hela systemet arbete är den nödvändiga globala attributhttpFå krävs Variabler, som är en komma-separerad lista överdataVariablekällnamn som unikt identifierar en rad data. Detta bör vara så minimalt som möjligt och kommer nästan alltid att innehålla tidsvariabeln. Till exempel, här är de rekommenderadehttpFå krävs Variabel för var och en av[CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (Naturligtvis kan ID-namnen vara olika i din dataset.) Från:

* För TimeSeries:stationIDTiden
* För Trajectory: TrajectoryID, tid
* För profil: tid (Att anta tid är profilen\\_id) Djup
* För TimeSeries Profil:stationIDTiden (Att anta tid är profilen\\_id) Djup
* För Trajectory Profil: TrajectoryID, tid (Att anta tid är profilen\\_id) Djup

    
Ta TimeSeries som ett exempel:
Med tanke på ett .insert kommando som inkluderarstationID=46088 och time=2016-06-23T19:53:00Z (och andra värden för andra variabler) Från:
* Om det inte finns några befintliga data för den stationen och den tiden kommer effekten att vara att lägga till data i datamängden.
* Om det finns befintliga data för den stationen och den tiden kommer effekten att vara att ersätta den befintliga raden data med denna nya data. (Naturligtvis, sedanERDDAP™håller loggen på varje kommando den tar emot, den gamla datan är fortfarande i loggen. Om en användare begär data från en version av datamängden innan den här ändringen kommer de att se äldre data.)   
         
#### httpGetDirectoryStructure{#httpgetdirectorystructure} 
*   [httpGetDirectory Struktur Global Attribute och Data (Logga in) Filnamn](#httpgetdirectorystructure)  
En del av det som gör att hela systemet fungerar effektivt är attERDDAP™skapar en uppsättning data (Logga in) filer, var och en med en annan bit av datamängden. Om dessa är bra,ERDDAP™kommer att kunna svara snabbt på de flesta förfrågningar om data. Denna inställning specificeras avhttpGetDirectoryStructure global attribut, som är en sträng som ser ut som ett relativt filnamn, t.ex.stationID/10 år", men är faktiskt en specifikation för katalogen struktur. De delar av det indikerar hur katalog och filnamn för data (Logga in) filer kommer att byggas.
    
    * Om en del är ett heltal (&gt;==&gt; 1 1) plus en timepiod (millisekund, andra, minut, timme, datum, månad, år eller deras plurals) t.ex. 10 år, då EDDTableFromHttpGet dataset tar tidsvärdet för raden av data (t.ex. 2016-06-23T19:53:00Z) beräkna tiden trunkerad till den precisionen (t.ex. 2010) , och göra en mapp eller filnamn från det.
        
Målet är att få en ganska stor del av data i varje fil, men mycket mindre än 2 GB.
        
    * Annars måste den del av specifikationen vara endataVariable"SsourceNamet.ex.,stationID. I detta fall kommer EDDTableFromHttpGet att göra en mapp eller filnamn från värdet av den variabeln för den nya raden av data. (t.ex. "46088") .
    
Eftersom .infoga och .delete-kommandodata lagras i specifika data (Logga in) filer, EDDTableFromHttpGet behöver vanligtvis bara öppna en eller några data (Logga in) filer för att hitta data för en viss användarbegäran. Och eftersom varje data (Logga in) filen har all relevant information för sin bit av datamängden, det är snabbt och enkelt för EDDTableFromHttpGet att göra en specifik version (eller aktuell version) av dataset för data i den filen (och inte behöva generera den begärda versionen av hela datasetet) .
    
Allmänna riktlinjer baseras på mängden och frekvensen av uppgifterna. Om vi antar 100 byte per rad av data, då ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Till exempel, om katalogstrukturen ärstationID/2 månader och du infogar data från två stationer (46088 och 46155) med tidsvärden från december 2015 till maj 2016, EDDTableFromHttp Få kommer att skapa kataloger som heter 46088 och 46155 och skapa filer i varje namn 2015-11.jsonl, 2016-01.jsonl, 2016-03.jsonL, 2016-05.jsonLåg (var och en som har 2 månaders datavärde för den relevanta stationen) . När som helst i framtiden, om du använder .insert eller .delete för att ändra eller ta bort data för exempelvis station 46088 vid 2016-04-05T14:45:00Z, EDDTableFromHttp Få kommer att lämna det kommandot till 46088/2016-03.jsonl, relevanta uppgifter (Logga in) fil. Och tydligt är det bra att lägga till data för andra stationer när som helst i framtiden, eftersom datamängden helt enkelt skapar ytterligare kataloger som behövs för att hålla data från de nya stationerna.
    
#### httpGetKeys{#httpgetkeys} 
Varje EDDTable FrånHttp Få datamängd måste ha ett globalt attributhttpGetKeys som anger listan över tillåtna författare och deras hemliga nycklar som en kommaseparerad lista över *Författare _key* t.ex., JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3.
* author_key är fallkänsliga och måste vara helt ASCII-karaktärer (#33 - #126, och utan kommatecken, "eller" tecken
* Nycklar är som lösenord, så de måste vara &gt;=8 tecken, svåra att gissa och utan interna ordboksord. Du bör behandla dem som du skulle behandla lösenord - hålla dem privata.
* Den första "\\_"-karaktären skiljer författaren från nyckeln, så författarens namn kan inte inkludera en "\\_"-karaktär (Men en nyckel kan) .
* Varje författare kan ha en eller flera författare key s, t.ex. JohnSmith Key1, JohnSmith Key7, etc.
* Du kan ändra värdet av detta attribut när som helst. Ändringarna träder i kraft nästa gång datamängden laddas.
* Denna information kommer att tas bort från datasetets globala bidrag innan den offentliggörs.
* Varje begäran till datamängden för att infoga eller ta bort data måste innehålla en &author= *Författare _key* parameter. Efter att ha verifierat nyckelns giltighet,ERDDAP™endast sparar författarens del (Inte nyckeln) i datafilen.

#### Set Up{#set-up} 

Här är de rekommenderade stegen för att skapa en EDDTableFromHttpGet dataset:

1. Gör huvudkatalogen för att hålla denna dataset data. Låt oss använda/data/testGet/. Användaren som kör GenerateDatasetsXml och användaren som körERDDAP™måste båda ha läs-skriv tillgång till denna katalog.
     
2. Använd en textredigerare för att göra ett prov.jsonL CSV-fil med förlängningen.jsonL i den katalogen.
Namnet är inte viktigt. Du kan till exempel kalla det prov.jsonLåg
Gör en 2 linje.jsonL CSV-fil, med kolumnnamn på första raden och dummy/typiska värden (av rätt datatyp) på den andra raden. Här är en provfil som är lämplig för en samling avfeatureType=TimeSeries data som mätte luft och vattentemperatur.
    \\[FörfeatureType=Trajektiv, du kan ändrastationIDAtt vara TrajectoryID.\\]  
    \\[FörfeatureType=Profil, du kan ändrastationIDatt vara profilid och lägga till en djupvariabel.\\]
    
    \\["stationID","time""latitud", "longitude", "airTemp", "waterTemp", "timestamp", "författare", "kommando"\\]
    \\["myStation", "2018-06-25T17:00:00Z", 0,0, 0,0, 0,0, 0,0, 0,0, "SomeBody", 0\\]
    
Notera:
    * De faktiska datavärdena spelar ingen roll eftersom du så småningom kommer att radera den här filen, men de bör vara av rätt datatyp. I synnerhet bör tidsvariabeln använda samma format som de faktiska uppgifterna från källan kommer att använda.
    * För alla variabler,sourceNameskall jämlikadestinationName, så använd rätt / slutliga variabla namn nu, inklusive tid, latitud, longitud och ibland djup eller höjd om variabler med den informationen kommer att inkluderas.
    * Det kommer nästan alltid att finnas en variabel namngiven tid som registrerar den tid som observationen gjordes. Det kan vara dataType String med[enheter som är lämpliga för strängtid](#string-time-units)  (t.ex.,yyyy-MM-ddH:mm:ss.SSSZ) eller data Typ dubbel med[enheter som är lämpliga för numeriska tider](#time-units)  (t.ex. sekunder sedan 1970-01-01T00:00:00Z, eller någon annan bastid) .
    * Tre av kolumnerna (vanligtvis de tre sista) måste vara timestamp, författare, kommando.
    * Timestamp-kolumnen kommer att användas av EDDTableFromHttpGet för att lägga till en tidsstämpel som anger när den lade till en viss datalinje till datafilen. Det kommer att ha datatyp dubbel och enheter sekunder sedan 1970-01-01T00:00:00Z.
    * Författarkolumnen med dataType String kommer att användas för att registrera vilken auktoriserad författare som tillhandahöll denna rads data. auktoriserade författare specificeras av[httpGetKeys globala attribut](#httpgetkeys). Även om nycklarna anges som *Författare _key* och är i "förfrågan" URL i den formuläret, endast författaren del sparas i datafilen.
    * Kommandokolumnen med dataType byte kommer att ange om data på denna rad är en insättning (0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0) eller en radering (1 1) .
         
3. Kör GenerateDatasets Xml och berätta det
    
    1. Datasettypen är EDDTableFromHttpGet
    2. Katalogen är (för detta exempel) /data/test Få //
    3. Provfilen är (för detta exempel) /data/testGet/startup.jsonLåg
    4. ochhttpFå krävs Variabler är (för detta exempel)  stationIDTiden Se beskrivningen av[httpFå obligatoriska](#httpgetrequiredvariables-global-attribute)nedanför.
    5. Om data samlas in var 5:e minut,httpGetDirectoryStructure för detta exempel ärstationID/2månader. Se beskrivningen av[httpGetDirectoryStructure](#httpgetdirectorystructure)nedanför.
    6. och[httpGetKeys](#httpgetkeys)
    
Lägg till utgången (Den bit avdatasets.xmlför dataset) attdatasets.xml.
     
4. Redigeradatasets.xmlchunk för denna datamängd för att göra den korrekt och komplett.
I synnerhet ersätter alla ??? med korrekt innehåll.
     
5. För&lt;fileTableInMemory &gt; inställning:
    * Ange detta till sant om datamängden vanligtvis får frekventa .insert och/eller .delete-förfrågningar (t.ex. oftare än en gång var tionde sekund) . Detta hjälper EDDTableFromHttpGet att reagera snabbare på .insert och/eller .delete-förfrågningar. Om du ställer in detta till sant, kommer EDDTableFromHttpGet fortfarande att spara filTable och relaterad information till disken periodiskt (vid behov, ungefär var femte sekund) .
    * Ställ detta för falskt (Default) om datamängden vanligtvis får sällan .insert och/eller .delete-förfrågningar (t.ex. mindre än en gång var tionde sekund) .
         
6. Notera: Det är möjligt att använda&lt;cacheFromUrl&gt; och relaterade inställningar idatasets.xmlför EDDTable FrånHttp Få dataset som ett sätt att göra och upprätthålla en lokal kopia av en fjärr EDDTableFromHttpGet dataset på en annanERDDAP. Men i detta fall kommer denna lokala dataset att avvisa alla .insert och .delete-förfrågningar.

#### Använda EDDTable FrånHttpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Författare kan göra "förfrågningar" som[infoga data till eller ta bort data från datasetet](#insert-and-delete).
     
* Efter att riktiga data har infogats i datamängden kan du och bör ta bort den ursprungliga provdatafilen.
     
* Användare kan begära data från dataset som de gör för någon annan EDDTable dataset iERDDAP. Om begäran inte innehåller en begränsning på tidsstämpelkolumnen får begäran data från den aktuella versionen av datamängden. (loggfilen efter bearbetning av alla insättnings- och raderingskommandon och återinförande avhttpFå obligatoriska) .
     
* Användare kan också göra förfrågningar som är specifika för EDDTableFromHttpGet dataset:
    * Om begäran innehåller en&lt;eller&lt;= begränsningar av tidsstämpelkolumnen, sedanERDDAP™processer rader av loggfilen fram till den angivna tidsstämpeln. I själva verket tar detta tillfälligt bort alla ändringar som gjorts till datamängden sedan det tidsstämpelvärdet. För mer info, se[Versioning](#versioning).
    * Om begäran innehåller en &gt;, &gt;= eller = begränsning av tidsstämpelkolumnen, t.ex. &timestamp&lt;=0, dåERDDAP™returnerar data från datafilerna som är, utan att bearbeta kommandon för införande och radering.
* I framtiden ser vi att verktyg kommer att byggas (av oss? av dig?) för att arbeta med dessa datamängder. Det kan till exempel finnas ett manus som läser de råa loggfilerna, tillämpar en annan kalibreringsekvation och genererar / uppdaterar en annan datamängd med den härledda informationen. Observera att manuset kan få originaldata via en begäran om attERDDAP™  (som får data i filformatet som är lättast för manuset att arbeta med) och generera / uppdatera den nya dataset via .insert "begäran" tillERDDAP. Skriptet behöver inte direkt tillgång till datafilerna; det kan vara på någon auktoriserad författares dator.
     

#### Detaljerad information om EDDTableFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

ämnena är:

*   [Ändra inte installationen&#33;](#dont-change-the-setup)
*   [CRUD](#crud)
*   [InvalidRequests](#invalidrequests)
*   [Hastighet](#httpget-speed)
*   [Robust](#robust)
*   [Systemsäkerhet](#system-reliability)
*   [Versioning](#versioning)
*   [Vad sägs om HTTP PUT och DELETE?&#33;](#https-put-and-delete)
*   [Anteckningar](#httpget-notes)
*   [Tack vare CHORDS för den grundläggande idén.](#thanks)

Här är detaljerad information:

##### Ändra inte installationen&#33;{#dont-change-the-setup} 
När datamängden har skapats och du har lagt till data till den:

* Lägg inte till eller ta bort någondataVariables.
* Ändra intesourceNameellerdestinationNamefördataVariables.
* Inte ändra data Typ avdataVariables. Men du kan ändradataVariablemetadata.
* Ändra intehttpFå krävs Variables globala attribut.
* Ändra intehttpGetDirectoryStructure global attribut.

Om du behöver ändra något av dessa saker, gör en ny dataset och överföra alla data till den nya dataset.
     
##### CRUD{#crud} 
I datavetenskap är de fyra grundläggande kommandon för att arbeta med en dataset[CREATE, READ, UPDATE, DELETE (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). SQL, språket för att arbeta med relationella databaser, har motsvarande i INSERT, SELECT, UPDATE och DELETE. I EDDTableFromHttpGet,

* .insert är en kombination av CREATE och UPDATE.
* .delete är DELETE.
* Det vanliga systemet för att begära delmängder av data är READ.

Därför stöder EDDTableFromHttpGet alla grundläggande kommandon för att arbeta med ett dataset.
     
* .infoga eller .delete förfrågningar utan fel kommer att returnera HTTP statuskod = 200 och ett JSON-objekt, t.ex.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
De två tidsstämpelvärdena hänvisar till samma millisekund, vilket är millisekunden som kommer att lagras i tidsstämpelvariabeln för raderna av data som infogades eller raderades.ERDDAP™ändrar inte namn och formatering av dessa nyckelvärdepar i framtiden.ERDDAP™kan lägga till ytterligare nyckelvärdepar till JSON-objektet i framtiden.
     
##### InvalidRequests{#invalidrequests} 
Invalid .insert eller .delete-förfrågningar kommer att returnera en HTTP-felstatuskod som är annan än status = 200 och ingen ändring kommer att göras till datamängden. Detta inkluderar förfrågningar med felaktig författarinformation, felaktiga variabla namn, olika arraylängder för olika variabler, saknade nödvändiga variabler, saknade nödvändiga rörliga värden etc. Om begäran omfattar mer än en datafil är det möjligt att en del av begäran kommer att lyckas och en del kommer att misslyckas. Men detta bör inte vara ett problem om sensorn skickar begäran behandlar eventuella fel som ett fullständigt misslyckande. Till exempel, om du berättarERDDAP™Att infoga (eller ta bort) samma data två gånger i rad, det värsta fallet är att informationen lagras två gånger, nära varandra i loggfilen. Det är svårt att se hur det kan orsaka problem.
     
##### HttpGet hastighet{#httpget-speed} 
För .insert eller .delete förfrågningar (inte räknahttpöverhead) ballpark siffror hastigheten på .insert eller .delete är
1ms per .insert med 1 rad data
2ms per .infoga med 10 rader data i arrays (\\[\\])   
3ms per .infoga med 100 rader data i arrays (\\[\\])   
13ms per .insert med 1000 rader data i arrays (\\[\\])   
Tydligt arrays är nyckeln till[Hög genomströmning](#httpget-speed). Utan arrays kommer det att vara utmanande att infoga eller ta bort mer än 8 rader data per sekund från en fjärrförfattare. (på grund av hela nätverkets överhuvud) . Med arrays blir det lätt att infoga eller .delete mer än 1000 rader data per sekund från en fjärrsensor.

Med mycket stora mängder data per förfrågan kommer du att slå Tomcats gräns till den maximala söklängden. (standard är 8KB?) , men det kan ökas genom att redigera maxHttpHeaderSize inställningen i din *Tomcat* /conf/server.xml's HTTP/1.1 Connector inträde.

När närERDDAP™Läser JSON Lines CSV-data (Logga in) filer, det finns en liten tidsstraff jämfört med att läsa binära datafiler. Vi kände att denna gång straff när läsning var ett rimligt pris för att betala för hastighet och robusthet i systemet när du skriver data. (vilket är av primär betydelse) .

##### SSD{#ssd} 
[För större hastighet,](#ssd)Använd en[Solid State Drive (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)för att lagra data. De har en mycket snabbare filåtkomsttid (&lt;0.1ms) än hårddiskar (3 - 12 ms) . De har också en snabbare dataöverföringshastighet (200 - 2500 MB/s) än hårddiskar (~200 MB/s) . Deras kostnader har minskat betydligt de senaste åren. Även om tidiga SSD hade problem efter ett stort antal skrivningar till ett visst block, är detta problem nu kraftigt minskat. Om du bara använder SSD för att skriva data när du läser det många gånger, även en konsumentkvalitet SSD (vilket är betydligt billigare än en företagsgrad SSD) bör vara länge.
    
##### Robust{#robust} 
Vi har försökt göra detta system så lätt att arbeta med och så robust som möjligt.
* Systemet är utformat för att ha flera trådar (t.ex. sensorn, ett automatiserat QC-skript och en människa) samtidigt arbeta med samma dataset och även samma fil. Mycket av detta görs möjligt genom att använda en logfil för att lagra data och genom att använda en mycket enkel filtyp,[JSON Lines CSV-filer](https://jsonlines.org/examples/)För att lagra data.
* En annan stor fördel för JSON Lines CSV är att om en fil någonsin blir skadad. (t.ex. ogiltig på grund av ett fel på en linje) Det är lätt att öppna filen i en textredigerare och åtgärda problemet.
* En annan fördel är, om det finns ett fel på en rad i en fil, kan systemet fortfarande läsa alla data på rader före och efter fellinjen. Och systemet kan fortfarande logga ytterligare .insert och .delete information.
* En stor fördel med att använda admin-tillgängliga standardfiler (jämfört med en relationsdatabas eller Cassandra eller annan programvara) Från: Det finns ingen annan programvara som måste underhållas och som måste köras för att lagra eller hämta data. Och det är lätt att säkerhetskopiera standardfiler när som helst och på ett stegvist sätt eftersom data är i bitar. (Efter ett tag kommer endast den aktuella filen för varje station att ändras) . Däremot tar det stor ansträngning och system ner tid för att göra externa säkerhetskopieringsfiler från databaser och från Cassandra.
         
##### Systemsäkerhet{#system-reliability} 
Det är rimligt att förvänta sig en server medERDDAP™att ha 99,9% upptid - det är cirka 9 timmars driftstopp per år (Du kan använda det på en dålig natt&#33;) .
Om du är flitig och lycklig kan du få 99,99% upptid (53 minuter stillestånd per år) Eftersom bara några omstarter för uppdateringar tar så mycket tid.
Du måste vidta extrema åtgärder (en separat säkerhetskopieringsserver, oavbrutet strömförsörjning, säkerhetskopierings luftkonditionering, 24x7x365 personal för att övervaka webbplatsen, etc.) att ha en smal chans på 99,999% upptid (5,25 minuter stillestånd per år) . Även då är det extremt osannolikt att du kommer att uppnå 99,999% upptid (eller till och med 99,99%) eftersom problem ofta ligger utanför din kontroll. Amazon Web Service och Google erbjuder till exempel otroligt pålitliga webbtjänster, men stora delar av dem är ibland nere i timmar.

Face it, alla villERDDAP™att ha 100% upptid, eller åtminstone de fasta "sex nior" (99,9999% upptid motsvarar 32 sekunder av driftstopp per år) Men det finns inget sätt du kommer att få det oavsett hur mycket tid, ansträngning och pengar du spenderar.

MenERDDAP™Uptime är inte det verkliga målet här. Målet är att bygga en pålitlig **Systemsystem** En som inte förlorar några data. Detta är ett lösligt problem.

Lösningen är: bygga feltolerans i datorprogramvaran som skickar data tillERDDAP. Specifikt bör denna programvara behålla en kö av data som väntar på att gå tillERDDAP. När data läggs till i kön, bör programvaran kontrollera svaret frånERDDAP. Om svaret inte innehåller data som mottagits. Inga fel, då programvaran ska lämna data i kön. När mer data genereras och läggs till i kön, bör programvaran återigen försöka infoga data i köen. (kanske med\\[\\]Systemsystem) . Det kommer att lyckas eller misslyckas. Om det misslyckas kommer det att försöka igen senare. Om du skriver programvaran för att arbeta på detta sätt och om programvaran är beredd att köa några dagar värde av data, har du faktiskt en bra chans att ladda upp 100% av sensorns data tillERDDAP. Och du kommer att ha gjort det utan att gå till stor ansträngning eller kostnad.

\\[Bakgrund: Vi trodde inte detta.[Det är så datornätverk uppnår tillförlitlighet.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) ) Datornätverk är i sig opålitliga. Så när du överför en fil från en dator till en annan, vet sändningsprogramvaran / förväntningar på att vissa paket kan gå förlorade. Om det inte får en ordentlig bekräftelse för ett visst paket från mottagaren, det liknar det förlorade paketet. Med detta tillvägagångssätt kan relativt enkel avsändare och mottagare programvara bygga ett pålitligt filöverföringssystem ovanpå ett opålitligt nätverk.\\]
    
##### Varför JSON Lines CSV-filer?{#why-json-lines-csv-files} 
EDDTableFromHttpGet använder[JSON Lines CSV-filer](https://jsonlines.org/examples/)för att lagra data. Skälen är:

* Den främsta orsaken är: Enkelheten hos JSON Lines CSV-filer erbjuder ett snabbt, enkelt och tillförlitligt sätt att låta flera trådar skriva till en viss fil. (t.ex. genom att synkronisera på filnamnet) .
* Om en JSON Lines CSV-fil någonsin blev skadad (t.ex. ogiltig på grund av ett fel på en linje) EDDTableFromFromHttpGet kan fortfarande läsa alla data på alla rader före och efter fellinjen. Och .insert- och .delete-systemet kan fortsätta att lägga till nya data i datafilen.
* Eftersom JSON Lines CSV-filer är ASCII-filer, om en fil någonsin blivit skadad, skulle det vara lätt att åtgärda (i en textredigerare) .
* JSON Lines CSV stödjer Unicode strängar.
* JSON Lines CSV stöder rörliga längdsträngar (Inte begränsat till någon maxlängd) .
* JSON Lines CSV stöder 64-bitars heltal (långa) .
* Den formella naturen och extra syntax av JSON Lines CSV (vs old-school CSV) ger lite extra garanti för att en viss linje inte har skadats.

Vi försökte ursprungligen att använda.nc3 filer med obegränsad dimension. Men det fanns problem:

* Huvudproblemet var: Det finns inget tillförlitligt sätt att låta flera trådar skriva till en.nc3 fil, även om trådarna samarbetar genom att skriva på ett synkroniserat sätt.
* Om en.nc3 filen blir skadad, .insert och .delete systemet kan inte fortsätta att använda filen.
* För den.nc3 filer är binära, om en fil blir skadad (som de gör på grund av multi-threading problem) De är mycket svåra eller omöjliga att fixa. Det finns inga verktyg för att hjälpa till med reparationen.
* CF har inget sätt att specificera kodning av strängar, så det finns inget officiellt sätt att stödja Unicode, t.ex. UTF-8 kodning. Vi försökte få CF att stödja en \\_Encoding attribut men kunde inte göra några framsteg. (UnidataTill deras kredit stöder du attributet \\_Encoding.) 
*   .nc3 filer stöder endast fasta längdsträngar. Vi försökte få CF ochUnidataför att stödja variabla längdsträngar men kunde inte göra några framsteg.
*   .nc3 filer stöder inte ett enkelt sätt att skilja enskilda tecken variabler från String variabler. Vi försökte få CF ochUnidataatt stödja ett system för att skilja dessa två datatyper, men kunde inte göra några framsteg.
*   .nc3 filer stöder endast 8-bitars tecken med en ospecificerad kodning. Vi försökte få CF ochUnidataatt stödja ett system för att ange kodningen, men kunde inte göra några framsteg.
*   .nc3 filer stöder inte 64-bitars heltal (långa) . Vi försökte få CF ochUnidataatt stödja ett system i längder, men kunde inte göra några framsteg.
         
##### Versioning{#versioning} 
För EDDTable FrånHttp Få butiker en logg över alla ändringar i datamängden med tidsstämpeln och författaren till varje förändring, det kan snabbt återskapa den datamängden per tidpunkt. I en mening finns det en version för alla punkter i tiden. Om en användares begäran om data innehåller en timestamp&lt;= begränsningar, t.ex., &timestamp&lt;=2016-06-23T16:32:22.128Z (eller när som helst) men ingen begränsning av författare eller kommando,ERDDAP™kommer att svara på begäran genom att först generera en version av datamängden från och med den tidpunkten. Sedan,ERDDAP™tillämpa användarens andra begränsningar, som med annan begäran om data frånERDDAP. EDDTableFromHttpGet inrättas så att denna process är mycket snabb och effektiv, även för mycket stora datamängder.

På samma sätt kan en användare ta reda på när datamängden senast uppdaterades genom att begära ... tidsstämpel & timestamp=max (timestamp) och distinkt () 

Och för varje begäran om data, för någon version av datamängden, kan användarna se vilken författare som har gjort ändringar, och när de gjorde dem.

Detta versionssystem möjliggör[Reproducerbar vetenskap](https://en.wikipedia.org/wiki/Reproducibility)eftersom alla när som helst kan begära data från versionen av datamängden när som helst. Denna finkorniga version är inte möjligt med något annat system som vi känner till. Den underliggande mekanismen är mycket effektiv, eftersom inget extra lagringsutrymme behövs, och bearbetningsöverhuvudet är verkligen minimalt.

Inte alla har ett behov av denna typ av finkornig version, men det är ytterst användbart, kanske nödvändigt, i samband med en stor datahanteringsorganisation. (t.ex. OOI, Earth Cube, Data One ochNOAANCEI) där en dataset kan ha flera författare (t.ex. sensorn, ett automatiserat QC-skript och en mänsklig redaktör) .

\\[Historia: Behovet av denna typ av version först kom upp för mig (Bob) När du läser om och diskuterar OOI 2008. Vid den tiden hade OOI ett besvärligt, långsamt, ineffektivt system för versionering baserat på Git. Git är bra för vad det var utformat för, men inte detta. Under 2008, under en OOI-diskussion, utformade jag ett omfattande, effektivt alternativ-till-OOI-system för datahantering, inklusive många av de funktioner som jag har lagt till.ERDDAP™Sedan dess, och inklusive detta versionssystem. Då och då var OOI engagerad i sitt versionssystem och inte intresserad av alternativ. Under 2016 föll andra aspekter av denna plan på plats och jag började implementera den. Eftersom det fanns massor av avbrott att arbeta på andra projekt, avslutade jag inte förrän 2018. Även nu är jag inte medveten om något annat vetenskapligt datasystem som erbjuder så snabb och enkel åtkomst till en version av data från vilken tidpunkt som helst, för ofta ändrade datamängder. Enkla filsystem erbjuder inte detta. Relationella databaser gör det inte. Cassandra gör det inte.\\]
    
##### HTTPS Put och Delete{#https-put-and-delete} 
*   [Vad sägs om HTTPS PUT och DELETE?&#33;](#https-put-and-delete)  
    [Hypertextöverföringsprotokoll (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)är grunden för World Wide Web och anledningen till att webbsidor börjar med " http://" eller " https://" . HTTPS är HTTP med ett extra säkerhetslager. Varje dag gör webbläsare, skript och datorprogram miljarder HTTP (SS S)   **GET** Förfrågningar om att få information från avlägsna källor. HTTP (SS S) även andra[verb](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)Notably PUT (att driva data till servern) och DELETE (DELETE data från servern) . Ja, PUT och DELETE är rätt sätt att infoga data i och ta bort data från, en dataset via HTTP (SS S) . GET stöds av varje mjukvara som kan fungera med HTTP (SS S) . GET är verkligen lätt att arbeta med. Alla vet redan hur man arbetar med GET och många vet hur man använder POST (som kan användas i huvudsak på samma sätt som GET) Så vi gjorde EDDTableFromHttpGet arbete med GET och POST. Mycket få människor (Få datorprogrammerare) Har någonsin jobbat med PUT och DELETE. PUT och DELETE stöds i allmänhet bara av datorspråk, så att använda dem kräver ett skickligt program. Så PUT och DELETE är vanligtvis ett mycket mer besvärligt tillvägagångssätt med tanke på hur verktygen har utvecklats.
     
##### HttpGet Notes{#httpget-notes} 
*   [Anteckningar](#httpget-notes)
    * IngendataVariablekan ha dataType=char. Använd dataType=String istället. Om du verkligen behöver dataType=char, e-post Chris. John på noaa.gov.
         
##### Tack{#thanks} 
*   [Tack vare CHORDS för den grundläggande idén.](#thanks)  
Grundtanken för EDDTableFromHttpGet (dvs använda enHTTP GETbegära att lägga till data till en dataset) är från UCAR's (NCAR?)  [Cloud-Hosted Real-time Data Services (KORDS) ](https://github.com/earthcubeprojects-chords)projekt. Formatet för parametrarna på begäran (upprepad *namn=värde* Separerad av &'s) är samma standardformat som används av HTML-formulär på webbsidor. Det är en enkel och lysande idé och ännu mer eftersom den meshes så perfekt medERDDAP"Det befintliga systemet för att hantera tabelldata. Tanken är uppenbar i efterhand, men jag (Bob) Tänkte inte på det. EDDTableFromHttp Få användning av den grundläggande idén, i kombination med våra idéer om hur man implementerar den, för att göra ett system iERDDAP™för att ladda upp data. Annat än den grundläggande idén att använda GET för att driva data i systemet, är EDDTableFromHttpGet implementering helt annorlunda och helt oberoende av CHORDS och har olika funktioner. (t.ex. loggfiler, chunking av data, olika säkerhetssystem, CRUD-stöd, reproducerbara data) . Vår exponering för CHORDS var bara ett webinar. Vi tittade inte på deras kod eller läste om deras projekt eftersom vi omedelbart visste att vi ville implementera systemet på ett annat sätt. Men vi är tacksamma för dem för grundtanken. Den fullständiga referensen till CHORDS är
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014 2014 2014) . Cloud-Hosted Real-time Data Services för Geosciences (KORDS) programvara. UCAR / NCAR - Jorden observerar laboratorium.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### EDDTableFrånHyraxFiler{#eddtablefromhyraxfiles} 
[ **EDDTableFrånHyraxFiler** ](#eddtablefromhyraxfiles)  (Deprecated) aggregerar datafiler med flera variabler, var och en med en eller flera delade dimensioner (Till exempel tid, höjd (eller djup) latitud, longitud) och serveras av en[Hyrax OPeNDAPServer server](https://www.opendap.org/software/hyrax-data-server).

* Denna dataset typ är **Begränsad** . Den nyare och mer generella lösningen är att använda den[Cache FromUrl alternativet för EDDTable FrånFiles](#cachefromurl)  (eller en variant) , vilket gör en lokal kopia av fjärrfilerna och tjänar data från de lokala filerna. och&lt;cacheFromUrl&gt; alternativet kan användas med någon typ av tabular datafil. **   
Om du inte kan göra det fungerar av någon anledning, e-post Chris. John på noaa.gov.
Om det inte finns några klagomål före 2020 kan denna datatyp tas bort. ** 
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
* I de flesta fall har varje fil flera värden för vänster (Först först) dimension, till exempel tid.
* Filerna ofta (Men behöver inte) ha ett enda värde för de andra dimensionerna (Till exempel höjd (eller djup) latitud, longitud) .
* Filerna kan ha teckenvariabler med en extra dimension (till exempel nCharacters) .
*   Hyraxservrar kan identifieras med "/dods-bin/nph-dods/" eller "/opendap/" i webbadressen.
* Denna klassskärm skraparHyraxwebbsidor med listorna över filer i varje katalog. På grund av detta är det mycket specifikt för det aktuella formatet avHyraxwebbsidor. Vi kommer att försöka justeraERDDAP™snabbt om/när framtida versioner avHyraxändra hur filerna är listade.
* och&lt;filDir&gt; inställning ignoreras. Eftersom denna klass laddar ner och gör en lokal kopia av varje fjärrdatafil,ERDDAP™tvingar filen Dir att vara *bigParentDirectory* /copy/ *datasetID* /.
* För&lt;sourceUrl&gt;, använd webbadressen för baskatalogen för datamängden iHyraxserver, till exempel,
    &lt;sourceUrl&gt; &gt; &gt; &gt; &gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;///sourceUrl&gt; &gt; &gt; &gt; &gt;
     (Men lägg den på en linje)   (Förlåt att servern inte längre är tillgänglig) .
ochsourceUrlWebbplatsen har vanligtvis "OPeNDAPServer Index från\\[Regissör\\]på toppen.
* Eftersom denna klass alltid laddar ner och gör en lokal kopia av varje fjärrdatafil, bör du aldrig svepa den här datamängden i[EDDTableCopy](#eddtablecopy).
* Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.
* Se 1D, 2D, 3D och 4D-exempel för[EDDTableFromNcFiles](#eddtablefromncfiles).
     
### EDDTableFromInvalidCRAFiles{#eddtablefrominvalidcrafiles} 
[ **EDDTableFromInvalidCRAFiles** ](#eddtablefrominvalidcrafiles)aggregerar data frånNetCDF  (v3 eller v4)  .ncfiler som använder en specifik, ogiltig, variant av CF DSG Contiguous Ragged Array (CRA) filer. Även omERDDAP™stöder denna filtyp, det är en ogiltig filtyp som ingen ska börja använda. Grupper som för närvarande använder denna filtyp uppmuntras starkt att användaERDDAP™för att generera giltiga CF DSG CRA-filer och sluta använda dessa filer.

Detaljer: Dessa filer har flera row\\_size variabler, var och en med ett prov\\_dimension attribut. Filerna är icke-CF-standardfiler eftersom flera prov (Obs) Dimensioner ska avkodas och relateras till varandra med denna extra regel och löfte som inte ingår i CF DSG-specifikationen: "Du kan associera ett givet t.ex. temperaturvärde (temp\\_obs dimension) med ett givet djupvärde (z\\_obs dimension, dimensionen med de flesta värden) För: Temperaturen row\\_size (för en given gjutning) är antingen 0 eller lika med motsvarande djuprad (för den där gjuten)   (Det är regeln) . Så om temperaturraden inte är 0, relaterar n temperaturvärdena för den gjuten direkt till n-djupvärdena för den gjuten. (Det är löftet) .”

Ett annat problem med dessa filer: Principal\\_Investigator row\\_size-variabeln har inte ett prov\\_dimension-attribut och följer inte ovanstående regel.

Provfiler för denna datasettyp finns på https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Denna server är inte längre tillförlitligt tillgänglig\\].

Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.

Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.

Det första GenerateDatasets Xml gör för denna typ av dataset efter att du svarat på frågorna är att skriva ut ncdump-liknande strukturen i provfilen. Så om du anger några goofy svar för den första slingan genom GenerateDatasets Xml, åtminstone kan du se omERDDAP™kan läsa filen och se vilka dimensioner och variabler som finns i filen. Då kan du ge bättre svar för andra slingan genom GenerateDatasetsXml.
 
### EDDTableFromJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
[ **EDDTableFromJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles)aggregerar data från[JSON Lines CSV-filer](https://jsonlines.org/examples/). Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.

* Som jsonlines.org säger är detta format "Bättre än CSV" (Och lagligt, som en federal anställd, kan jag inte hålla med eller inte hålla med dem - hur galen är det?) . CSV har aldrig formellt definierats och hämmas av det historiska bagaget i samband med dess anslutning till de ursprungliga kalkylbladsprogrammen. JSON Lines CSV är i jämförelse fullt definierad och drar nytta av dess anslutning till den allmänt använda JSON-standarden, som i sin tur drar nytta av dess anslutning tillJavaScript ochJava. I synnerhet finns det fullt stöd för långa heltal och för Unicode-tecken i strängar, och ett tydligt sätt att inkludera andra specialtecken. (Notably flikar och newlines) inom strängar.
    
Detta format är särskilt bra för datamängder där du regelbundet måste lägga till ytterligare rader i slutet av en viss datafil. Av den anledningen och andra (Se ovan) ,[EDDTableFromHttpGet](#eddtablefromhttpget)använder Json Lines CSV-filer för datalagring.
    
* Inmatningsfilerna antas vara UTF-8 kodade. Med tanke på ðu *dddd* format för kodning av speciella tecken (t.ex. ðu20ac är kodningen för Euro-karaktären) Du har möjlighet att skriva filerna så att de endast innehåller 7-bitars ASCII-tecken genom att använda \\u *dddd* att koda alla tecken över #127.
     
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
    
Det första GenerateDatasetsXml gör för denna typ av datamängd efter att du svarat på frågorna är att skriva ut ncdump-liknande struktur av provfilen. Så om du anger några goofy svar för den första slingan genom GenerateDatasets Xml, åtminstone kan du se omERDDAP™kan läsa filen och se vilka dimensioner och variabler som finns i filen. Då kan du ge bättre svar för andra slingan genom GenerateDatasetsXml.
    
* Varning: NärERDDAP™Läser JSON Linjer CSV-datafiler, om det hittar ett fel på en viss linje (t.ex. felaktigt antal objekt) Den loggar ett varningsmeddelande (Varning: Dålig linje (s) av data ... med en lista över de dåliga linjerna på efterföljande rader) till[Log.txt fil](/docs/server-admin/additional-information#log)och sedan fortsätter att läsa resten av datafilen. Därför är det ditt ansvar att se periodiskt (Eller skriva ett manus för att göra det) för det budskapet i loggen. txt så att du kan åtgärda problemen i datafilerna.ERDDAP™är inställd på detta sätt så att användarna kan fortsätta att läsa alla tillgängliga giltiga data även om vissa rader av filen har brister.
     
### EDDTableFromMultidimNcFiles{#eddtablefrommultidimncfiles} 
[ **EDDTableFromMultidimNcFiles** ](#eddtablefrommultidimncfiles)aggregerar data frånNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer med flera variabler, var och en med en eller flera delade dimensioner. Filerna kan ha teckenvariabler med eller utan ytterligare dimension (till exempel, STRING14) . Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.

* Om filerna är multidimensionella CF DSG-varianter, använd denna datasettyp istället för[EDDTableFromNcCFFiles](#eddtablefromncfiles).
     
* För nya tabular dataset från.ncfiler, använd det här alternativet innan du försöker de äldre[EDDTableFromNcFiles](#eddtablefromncfiles). Några fördelar med denna klass är:
    * Denna klass kan läsa fler variabler från ett större antal filstrukturer. Om du anger DimensionsCSV (en komma-separerad lista över dimensionsnamn) i GenerateDatasets Xml (eller&lt;dimensionerCSV&gt; idatasets.xmlinfo för en av dessa datamängder), sedanERDDAP™kommer bara att läsa variabler i källfilerna som använder några eller alla dessa dimensioner, plus alla skalärvariabler. Om en dimension är i en grupp måste du ange dess fullvärdiga namn, t.ex. *gruppnamn/dimensionNamn* ".
    * Denna klass kan ofta avvisa filer mycket snabbt om de inte matchar en begäran begränsningar. Att läsa data från stora samlingar går ofta mycket snabbare.
    * Denna klass hanterar sanna char variabler (icke-String variabler) korrekt.
    * Denna klass kan trimma strängvariabler när skaparen inte använde Netcdf-javas skrivsträngar (vilket ger char #0 för att markera slutet av strängen) .
    * Denna klass är bättre på att hantera enskilda filer som saknar vissa variabler eller dimensioner.
    * Denna klass kan ta bort block av rader med saknade värden som anges för[CF Diskret sampling geometrier (DSG) Ofullständiga Multidimensionella Array-filer](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
    
Det första GenerateDatasetsXml gör för denna typ av datamängd efter att du svarat på frågorna är att skriva ut ncdump-liknande struktur av provfilen. Så om du anger några goofy svar för den första slingan genom GenerateDatasets Xml, åtminstone kan du se omERDDAP™kan läsa filen och se vilka dimensioner och variabler som finns i filen. Då kan du ge bättre svar för andra slingan genom GenerateDatasetsXml.
    
Grupp -- GenerateDatasets Xml kommer att be om en "grupp". Du kan ange "" för att få det att söka någon / alla grupper, " *vissa Gruppgrupp* "eller" *SomeGroup/someSubGroup* för att få den att söka efter en viss grupp, eller "\\[root\\]För att få det att söka bara rotgruppen. "Group"-strängen blir&lt;grupp&gt; idatasets.xmlinfo för dataset (Även om "\\[root\\]" blir") .
    
DimensionsCSV GenerateDatasets Xml kommer att be om en "DimensionsCSV"-sträng. Detta är en kommaseparerad värdelista över källnamn på en uppsättning dimensioner. GenerateDatasets Xml läser endast datavariabler i prov.ncfiler som använder vissa eller alla dessa dimensioner (och inga andra dimensioner) plus alla skalärvariabler i filen och gör datamängden från dessa datavariabler. Om en dimension är i en grupp måste du ange dess fullvärdiga namn, t.ex. *gruppnamn/dimensionNamn* ".
Om du inte specificerar ingenting (En tom sträng) GenerateDatasets Xml kommer att leta efter variablerna med de flesta dimensionerna, på teorin att de kommer att vara de mest intressanta, men det kan finnas tillfällen när du vill göra en dataset från någon annan grupp av datavariabler som använder någon annan grupp av dimensioner.
Om du bara anger ett dimensionsnamn som inte existerar (t.ex. NO\\_MATCH) ,ERDDAP™kommer bara att hitta alla skalärvariabler.
"DimensionsCSV"-strängen blir&lt;dimensionerCSV&gt; idatasets.xmlinfo för dataset.
    
#### behandlaDimensionsAs{#treatdimensionsas} 
Det finns en kategori av ogiltig.ncfiler filer (eftersom de inte följer CF-reglerna) som har flera dimensioner (t.ex. lat, lon, tid) när de borde ha använt bara en dimension (t.ex. tid) Till exempel:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableFromMultidimNcFiles har en speciell funktion för att hantera dessa filer: om du lägger till det globala attributet "treatDimensionsAs" till datamängderna globaltaddAttributesDu kan berättaERDDAP™att behandla vissa dimensioner (t.ex. lat och lon) som om de vore en annan dimension (t.ex. tid) . attributvärdet måste vara en komma separerad lista som anger de "från" dimensionerna och sedan "till" dimensionen, t.ex.,
<att name="treatDimensionsAs">lat, lon, tid</att>  
och sedanERDDAP™Läs filen som om den vore:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Naturligtvis måste den nuvarande storleken på var och en av dimensionerna i listan vara densamma; annars,ERDDAP™kommer att behandla filen som en "Bad File".

Observera att dessa filer är ogiltiga eftersom de inte följer CF regler. Även omERDDAP™Vi rekommenderar starkt att du inte skapar filer så här eftersom andra CF-baserade mjukvaruverktyg inte kan läsa dem korrekt. Om du redan har sådana filer rekommenderar vi starkt att du ersätter dem med giltiga filer så snart som möjligt.
    
### EDDTableFromNcFiles{#eddtablefromncfiles} 
[ **EDDTableFromNcFiles** ](#eddtablefromncfiles)aggregerar data frånNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer och[Zarr](https://github.com/zarr-developers/zarr-python)filer filer (Från och med version 2.25) med flera variabler, var och en med en gemensam dimension (till exempel tid) eller mer än en delade dimensioner (Till exempel tid, höjd (eller djup) latitud, longitud) . Filerna måste ha samma dimensionsnamn. En viss fil kan ha flera värden för var och en av dimensionerna och värdena kan vara olika i olika källfiler. Filerna kan ha teckenvariabler med en extra dimension (till exempel, STRING14) . Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.

Zarr-filer har något annorlunda beteende och kräver antingen filenNameRegex eller vägenRegex för att inkludera "zarr".

* Om.ncfiler använder en av[CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)filformat, försök att använda[EDDTableFromNcCFFiles](#eddtablefromncfiles)Innan du försöker detta.
     
* För nya tabular dataset från.ncfiler, prova nyare[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)Först.
     
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
    
Det första GenerateDatasetsXml gör för denna typ av datamängd efter att du svarat på frågorna är att skriva ut ncdump-liknande struktur av provfilen. Så om du anger några goofy svar för den första slingan genom GenerateDatasets Xml, åtminstone kan du se omERDDAP™kan läsa filen och se vilka dimensioner och variabler som finns i filen. Då kan du ge bättre svar för andra slingan genom GenerateDatasetsXml.
    
DimensionsCSV GenerateDatasets Xml kommer att be om en "DimensionsCSV"-sträng. Detta är en kommaseparerad värdelista över källnamn på en uppsättning dimensioner. GenerateDatasets Xml hittar datavariablerna i.ncfiler som använder några eller alla dessa dimensioner, plus alla skalärvariabler och gör datamängden från dessa datavariabler. Om du inte specificerar ingenting (En tom sträng) GenerateDatasets Xml kommer att leta efter variablerna med de flesta dimensionerna, på teorin att de kommer att vara de mest intressanta, men det kan finnas tillfällen när du vill göra en dataset från någon annan grupp av datavariabler som använder någon annan grupp av dimensioner.
    
* 1D Exempel: 1D-filer skiljer sig något från 2D, 3D, 4D, ... filer.
    * Du kanske har en uppsättning.ncdatafiler där varje fil har en månads värde av data från en drivande boj.
    * Varje fil kommer att ha en dimension, till exempel tid (storlek =\\[Många många\\]) .
    * Varje fil kommer att ha en eller flera 1D-variabler som använder den dimensionen, till exempel tid, longitud, latitud, lufttemperatur.
    * Varje fil kan ha 2D-karaktärsvariabler, till exempel med dimensioner (tid,nCharacters) .
         
* 2D Exempel:
    * Du kanske har en uppsättning.ncdatafiler där varje fil har en månads värde av data från en drivande boj.
    * Varje fil kommer att ha 2 dimensioner, till exempel tid (storlek =\\[Många många\\]) och id (storlek = 1) .
    * Varje fil kommer att ha 2 1D-variabler med samma namn som dimensionerna och använda samma namndimension, till exempel tid (Tid) Id (Id) . Dessa 1D-variabler bör ingå i listan över&lt;dataVariable&gt; är i datasetets XML.
    * Varje fil kommer att ha en eller flera 2D-variabler, till exempel longitud, latitud, lufttemperatur, vattentemperatur, ...
    * Varje fil kan ha 3D-karaktärsvariabler, till exempel med dimensioner (tid,id,nCharacters) .
         
* 3D Exempel:
    * Du kanske har en uppsättning.ncdatafiler där varje fil har en månads värde av data från en stationär boj.
    * Varje fil kommer att ha 3 dimensioner, till exempel tid (storlek =\\[Många många\\]) , lat (storlek = 1) och lon (storlek = 1) .
    * Varje fil kommer att ha 3 1D-variabler med samma namn som dimensionerna och använda samma namndimension, till exempel tid (Tid) , lat (Lat) , lon (lon) . Dessa 1D-variabler bör ingå i listan över&lt;dataVariable&gt; är i datasetets XML.
    * Varje fil kommer att ha en eller flera 3D-variabler, till exempel lufttemperatur, vattentemperatur, ...
    * Varje fil kan ha 4D-karaktärsvariabler, till exempel med dimensioner (tid,lat,lon,nCharacters) .
    * Filens namn kan ha bojens namn i filens namn.
         
* 4D Exempel:
    * Du kanske har en uppsättning.ncdatafiler där varje fil har en månads värde av data från en station. Vid varje tidpunkt tar stationen avläsningar på en rad djup.
    * Varje fil kommer att ha 4 dimensioner, till exempel tid (storlek =\\[Många många\\]) Djup (storlek =\\[Många många\\]) , lat (storlek = 1) och lon (storlek = 1) .
    * Varje fil kommer att ha 4 1D-variabler med samma namn som dimensionerna och använda samma namndimension, till exempel tid (Tid) Djup (Djup) , lat (Lat) , lon (lon) . Dessa 1D-variabler bör ingå i listan över&lt;dataVariable&gt; är i datasetets XML.
    * Varje fil kommer att ha en eller flera 4D-variabler, till exempel lufttemperatur, vattentemperatur, ...
    * Varje fil kan ha 5D-karaktärsvariabler, till exempel med dimensioner (tid, djup,lat,lon,nCharacters) .
    * Filens namn kan ha bojens namn i filens namn.
         
### EDDTableFromNcCFFiles{#eddtablefromnccffiles} 
[ **EDDTableFromNcCFFiles** ](#eddtablefromnccffiles)aggregerar data aggregerar data frånNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer som använder ett av de filformat som anges av[CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konventioner. Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.

För filer som använder en av de multidimensionella CF DSG-varianterna, använd[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)I stället.

CF DSG-konventionerna definierar dussintals filformat och innehåller många mindre variationer. Denna klass behandlar alla de variationer vi är medvetna om, men vi kanske har missat en (eller mer) . Så om denna klass inte kan läsa data från dina CF DSG-filer, vänligen[nå ut för ytterligare stöd](/docs/intro#support).

Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
 
### EDDTableFromNccsvFiles{#eddtablefromnccsvfiles} 
[ **EDDTableFromNccsvFiles** ](#eddtablefromnccsvfiles)aggregerar data från[NCCSV](/docs/user/nccsv-1.00)ASCII .csv filer. Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.

* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
    
Det första GenerateDatasetsXml gör för denna typ av datamängd efter att du svarat på frågorna är att skriva ut ncdump-liknande struktur av provfilen. Så om du anger några goofy svar för den första slingan genom GenerateDatasets Xml, åtminstone kan du se omERDDAP™kan läsa filen och se vilka dimensioner och variabler som finns i filen. Då kan du ge bättre svar för andra slingan genom GenerateDatasetsXml.
    
* Varning: NärERDDAP™Läser NCCSV-datafiler, om det hittar ett fel på en viss linje (t.ex. felaktigt antal objekt) Den loggar ett varningsmeddelande (Varning: Dålig linje (s) av data ... med en lista över de dåliga linjerna på efterföljande rader) till[Log.txt fil](/docs/server-admin/additional-information#log)och sedan fortsätter att läsa resten av datafilen. Därför är det ditt ansvar att se periodiskt (Eller skriva ett manus för att göra det) för det budskapet i loggen. txt så att du kan åtgärda problemen i datafilerna.ERDDAP™är inställd på detta sätt så att användarna kan fortsätta att läsa alla tillgängliga giltiga data även om vissa rader av filen har brister.
     
### EDDTableFromNOS{#eddtablefromnos} 
[ **EDDTableFromNOS** ](#eddtablefromnos)  (Begränsad) hanterar data från enNOAA [NOS](https://opendap.co-ops.nos.noaa.gov/axis/)källa, som använder[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)för förfrågningar och svar. Det är mycket specifikt förNOAANOS XML. Se provet EDDTableFromNOS dataset i dataset2.xml.
 
### EDDTableFromOBIS{#eddtablefromobis} 
[ **EDDTableFromOBIS** ](#eddtablefromobis)hanterar data från ett Ocean Biogeographic Information System (OBIS) Server server (var http://www.iobis.org  ) . Det är möjligt att det inte finns fler aktiva servrar som använder denna nu out-of-date typ av OBIS-serversystem.

* OBIS-servrar förväntar sig en XML-förfrågan och returnerar ett XML-svar.
* Eftersom alla OBIS-servrar tjänar samma variabler på samma sätt (var http://iobis.org/tech/provider/questions ) Du behöver inte ange mycket för att ställa in en OBIS dataset iERDDAP.
* Du måste inkludera en "creator\\_emailattribut i den globalaaddAttributesEftersom denna information används inom licensen. En lämplig e-postadress kan hittas genom att läsa XML-svaret från sourceURL.
* Du kanske eller kanske inte kan få det globala attributet&lt;subsetVariables&gt;] (#subsetvariables) att arbeta med en given OBIS-server. Om du försöker, försök bara en variabel (Till exempel ScientificName eller Genus) .
#### EDDTableFromOBIS skelett XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromParquetFiles{#eddtablefromparquetfiles} 
[ **EDDTableFromParquetFiles** ](#eddtablefromparquetfiles)hanterar data från[Parquet](https://parquet.apache.org/). Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.

* Parquet är utformad för att komprimera mycket effektivt, så det kan ge dig mindre filstorlekar än andra format.
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
* Varning: NärERDDAP™Läser Parquet-datafiler, om det hittar ett fel på en viss linje (t.ex. felaktigt antal objekt) Den loggar ett varningsmeddelande (Varning: Dålig linje (s) av data ... med en lista över de dåliga linjerna på efterföljande rader) till[Log.txt fil](/docs/server-admin/additional-information#log)och sedan fortsätter att läsa resten av datafilen. Därför är det ditt ansvar att se periodiskt (Eller skriva ett manus för att göra det) för det budskapet i loggen. txt så att du kan åtgärda problemen i datafilerna.ERDDAP™är inställd på detta sätt så att användarna kan fortsätta att läsa alla tillgängliga giltiga data även om vissa rader av filen har brister.
     
### EDDTableFrånSOS {#eddtablefromsos} 
[ **EDDTableFrånSOS** ](#eddtablefromsos)hanterar data från en Sensor Observation Service (SWE/[SOS](https://www.ogc.org/standards/sos)) Server.

* Denna datasettyp samlar in data från en grupp stationer som alla serveras av enSOSServer.
* Stationerna tjänar alla samma uppsättning variabler (Även om källan för varje station inte behöver tjäna alla variabler) .
*   SOSservrar förväntar sig en XML-förfrågan och returnerar ett XML-svar.
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det. Det är inte lätt att generera dataset XML förSOSdatamängder för hand. För att hitta den nödvändiga informationen måste du besökasourceUrl+"? service=SOS&request=GetCapabilitiesI en webbläsare; titta på XML; gör en GetObservation begäran för hand; och titta på XML svar på begäran.
* Med enstaka tillägg av nya typer avSOSservrar och ändringar i de gamla servrarna blir det svårare förERDDAP™för att automatiskt upptäcka servertypen från serverns svar. Användningen av&lt;ServerType &gt; (med ett värde av IOOS_NDBC, IOOS_NOS,OOSTethyseller WHOI) är nu starkt återkallad. Om du har problem med några datamängder av denna typ, prova att köra GenerateDatasets Xml förSOSServer. Generat Dataset Xml låter dig prova de olika&lt;ServerType&gt; alternativ tills du hittar rätt för en viss server.
*   SOSÖversikt:
    * SWE (Sensor Web Enablement) ochSOS  (Sensor Observation Service) är[OpenGIS® standarder](https://www.ogc.org/standards). Webbplatsen har standarddokumenten.
    * ochOGCWebbtjänster Vanlig specifikation ver 1.1.0 (OGC06-121r3) täcker konstruktion av GET och POST-frågor (se avsnitt 7.2.3 och avsnitt 9) .
    * Om du skickar en getCapabilities xml begäran till enSOSServer server (sourceUrl+ "?service=SOS&request=GetCapabilities") Du får ett xml-resultat med en lista över stationer och den observerade Egenskaper som de har data för.
    * En observedProperty är en formell URI-referens till en fastighet. Urn:ogc: fenomen: longitude:wgs84 eller https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * En observedProperty är inte en variabel.
    * Mer än en variabel kan ha samma observerade Fastighet (Till exempel insideTemp och utomhus Temp kan båda ha observerat Fastighet https://mmisw.org/ont/cf/parameter/air\\_temperature ) .
    * Om du skickar en getObservation xml begäran till enSOSServer, du får ett xml-resultat med beskrivningar av fältnamn i svaret, fältenheterna och data. Fältnamnen inkluderar longitud, latitud, djup (Kanske kanske kanske) och tiden.
    * VarjedataVariableför en EDDTableFromSOSmåste innehålla en "observedProperty" -attribut, som identifierar den observeradeProperty som måste begäras från servern för att få den variabeln. Ofta fleradataVariables kommer att lista samma komposit observeradeProperty.
    * DataType för varjedataVariablekan inte specificeras av servern. Om så är fallet måste du titta på XML-datasvaren från servern och tilldela lämpligt [&lt;DataType&gt;s] (#datatype) i denERDDAP™DatasetdataVariabledefinitioner.
    *    (Vid tidpunkten för att skriva detta) vissaSOSservrar svarar på GetObservation-förfrågningar för mer än en observerad Fastighet genom att bara returnera resultat för den första av de observeradeProperties. (Inget felmeddelande&#33;) Se efterfrågan på konstruktionsparameter ObservedPropertiesSeparately.
* EDDTableFrånSOSautomatiskt lägger till
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
till datamängdens globala attribut när datamängden skapas.
*   SOSservrar brukar uttrycka[enheter](#units)med[UCUM](https://unitsofmeasure.org/ucum.html)system. De flestaERDDAP™servrar uttrycker enheter med[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)system. Om du behöver konvertera mellan de två systemen kan du använda[ERDDAPwebbtjänst för att konvertera UCUM-enheter till/frånUDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### EDDTableFrånSOSskelett XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromThreddsFiles{#eddtablefromthreddsfiles} 
[ **EDDTableFromThreddsFiles** ](#eddtablefromthreddsfiles)  (Deprecated) aggregerar datafiler med flera variabler, var och en med en eller flera delade dimensioner (Till exempel tid, höjd (eller djup) latitud, longitud) och serveras av en[TröjorOPeNDAPServer server](https://www.unidata.ucar.edu/software/tds/).

* Denna dataset typ är **Begränsad** . Den nyare och mer generella lösningen är att använda den[Cache FromUrl alternativet för EDDTable FrånFiles](#cachefromurl)  (eller en variant) , vilket gör en lokal kopia av fjärrfilerna och tjänar data från de lokala filerna. och&lt;cacheFromUrl&gt; alternativet kan användas med någon typ av tabular datafil från någon webbaserad källa som publicerar en katalogliknande lista över filer. **   
Om du inte kan göra det fungerar av någon anledning, e-post Chris. John på noaa.gov.
Om det inte finns några klagomål före 2020 kan denna datatyp tas bort. ** 
* Vi rekommenderar starkt att du använder[GenerateDatasets Xml program](#generatedatasetsxml)att göra ett grovt utkast avdatasets.xmlchunk för denna dataset. Du kan sedan redigera det för att finjustera det.
* I de flesta fall har varje fil flera värden för vänster (Först först) dimension, till exempel tid.
* Filerna ofta (Men behöver inte) ha ett enda värde för de andra dimensionerna (Till exempel höjd (eller djup) latitud, longitud) .
* Filerna kan ha teckenvariabler med en extra dimension (till exempel nCharacters) .
* TREDDS-servrar kan identifieras med "/tredds/" i webbadresserna. Till exempel,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* TREDDS servrar har kataloger på olika ställen. Denna klass kräver att webbadressen inkluderar "/thredds/catalog/". Du kan vanligtvis hitta denna variabel genom att starta i en webbläsare i rotkatalogen och sedan klicka igenom till önskad underkatalog.
* Denna klass läser katalog.xml-filer som serveras av TREDDS med listorna över&lt;KatalogRefs&gt; (hänvisningar till ytterligare katalog.xml-underfiler) och&lt;Dataset&gt;s (Datafiler) .
* och&lt;filDir&gt; inställning ignoreras. Eftersom denna klass laddar ner och gör en lokal kopia av varje fjärrdatafil,ERDDAP™tvingar filen Dir att vara *bigParentDirectory* /copy/ *datasetID* /.
* För&lt;sourceUrl&gt;, använd URL-adressen för katalog.xml-filen för datamängden i THREDDS-servern, till exempel: för denna URL som kan användas i en webbläsare,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Denna server är inte längre tillförlitligt tillgänglig.\\],
Användning&lt;sourceUrl&gt; &gt; &gt; &gt; &gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;///sourceUrl&gt; &gt; &gt; &gt; &gt;
     (Men lägg den på en linje) .
* Eftersom denna klass alltid laddar ner och gör en lokal kopia av varje fjärrdatafil, bör du aldrig svepa den här datamängden i[EDDTableCopy](#eddtablecopy).
* Denna datasettyp stöder en OPTIONAL, sällan använd, speciallapp,&lt;SpecialMode &gt; *läge* &lt;/specialMode&gt; som kan användas för att ange att särskilda, hårdkodade regler bör användas för att avgöra vilka filer som ska laddas ner från servern. För närvarande är det enda giltigt *läge* är SAMOS som används med datamängder från https://tds.coaps.fsu.edu/thredds/catalog/samos för att ladda ner endast filerna med det senaste versionsnumret.
* Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för information om hur denna klass fungerar och hur man använder den.
* Se 1D, 2D, 3D och 4D-exempel för[EDDTableFromNcFiles](#eddtablefromncfiles).
     
### EDDTableFrånWFSFiler{#eddtablefromwfsfiles} 
[ **EDDTableFrånWFSFiler** ](#eddtablefromwfsfiles)  (Begränsad) gör en lokal kopia av alla data från enArcGISMapServerWFSserver så att data sedan kan sparas snabbt tillERDDAP™användare.

* Du måste ange en speciellt formateradsourceUrlGlobal attribut att berättaERDDAP™Hur man begär funktionsinformation från servern. Använd detta exempel som en mall:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (Men lägg allt på en linje) 
* Du måste lägga till ett speciellt globalt attribut för att berättaERDDAP™hur man identifierar namnen på bitarna av data som ska laddas ner. Detta kommer förmodligen att fungera för alla EDDTableFromWFSFiler dataset:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Eftersom denna klass alltid laddar ner och gör en lokal kopia av varje fjärrdatafil, bör du aldrig svepa den här datamängden i[EDDTableCopy](#eddtablecopy).
* Se klassens superklass,[EDDTableFromFiles](#eddtablefromfiles)för ytterligare information om hur denna klass fungerar och hur man använder den.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
[ **EDDTableAggregateRows** ](#eddtableaggregaterows)kan göra en EDDTable dataset från en grupp av "barn" EDDTable dataset.

* Här är några användningsområden för EDDTableAggregateRows:
    * Du kan göra en EDDTableAggregateRows datamängd från två olika typer av filer eller datakällor, till exempel en datamängd med data upp till slutet av förra månaden lagrad i.ncCF-filer och en dataset med data för den aktuella månaden som lagras i en relationsdatabas.
    * Du kan göra en EDDTableAggregateRows dataset för att hantera en förändring i källfiler (till exempel ändrade tidsformatet eller ett variabelt namn, eller data Typ/scale\\_factor///add\\_offsetändrad förändring) . I det här fallet skulle ett barn få data från filer som gjorts innan ändringen och det andra barnet skulle få data från filer som gjorts efter ändringen. Denna användning av EDDTableAggregateRows är ett alternativ till användning[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco). Om det inte finns en utmärkt funktion i filnamnen (så att du kan använda&lt;filNameRegex&gt; för att avgöra vilken fil som tillhör vilken barndatamängd), måste du förmodligen lagra filerna för de två barndatamängderna i olika kataloger.
    * Du kan göra en EDDTableAggregateRows dataset som har en delad delmängd av variabler av en eller flera liknande men olika dataset, till exempel en dataset som gör en Profil dataset från kombinationen av en Profil dataset, en TimeSeriesProfile dataset, och en TrajectoryProfil dataset (som har vissa olika variabler och vissa variabler gemensamt - i vilket fall du måste göra speciella varianter för barndatasätten, med bara de vanliga variablerna.) .
    * Du kan ha flera fristående datamängder, var och en med samma typ av data men från en annan station. Du kan lämna dessa datamängder intakt, men också skapa en EDDTableAggregateRows datamängd som har data från alla stationer - var och en av barndatamängderna kan vara en enkel[EDDTableFromErddap](#eddfromerddap)som pekar på en av de befintliga stationsdatamängderna. Om du gör detta, ge var och en av EDDTableFromErddap dataset en annandatasetIDän de ursprungliga fristående datamängderna, t.ex. genom att appendera "Barn" till originaletdatasetID.
* Var och en av barnet&lt;dataset&gt; specificerade måste vara en komplett dataset, som om det var en fristående dataset. Var och en måste ha samma[dataVariables](#datavariable)i samma ordning, med samma[destinationNames](#destinationname),[Datadata data Typer](#datatype),[missing\\_values](#missing_value),[FillValues](#missing_value)och[enheter](#units). Metadata för varje variabel för EDDTableAggregateRows dataset kommer från variabler i den första barndataset, men EDDTableAggregateRows kommer att uppdatera[actual\\_range](#actual_range)metadata är det faktiska sortimentet för alla barnen.
* Rekommendation: Få var och en av barnens datamängder som fungerar som fristående datamängder. Försök sedan göra EDDTableAggregateRows dataset genom att klippa och klistra indatasets.xmlchunk för varje in i den nya EDDTableAggregate Rows dataset.
* Dataset Standard Sort Order - Ordern för barndataset bestämmer den övergripande standardtypordningen för resultaten. Naturligtvis kan användarna begära en annan sorts order för en viss uppsättning resultat genom att godkänna ochorderBy (" *Sammanslagen lista över variabler* ") till slutet av deras fråga.
* "källan"[Globalt globalt globalt globalt Attribut](#global-attributes)för EDDTableAggregateRows är den kombinerade globalaAttributer från första barndataset. EDDTableAggregate Rows kan ha en global&lt;addAttributesAtt ge ytterligare globala attribut eller åsidosätta källkoden globala attribut.
#### EDDTableAggregate Rows skelett XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCopy{#eddtablecopy} 
[ **EDDTableCopy** ](#eddtablecopy)kan göra en lokal kopia av många typer av EDDTable dataset och sedan spara data snabbt från den lokala kopian.

* EDDTableCopy (och för nätdata,[EDDGridKopiera](#eddgridcopy)) är mycket lätt att använda och en mycket effektiv **lösning på några av de största problemen med att betjäna data från fjärrdatakällor:** 
    * Att komma åt data från en fjärrdatakälla kan vara långsamt.
        * De kan vara långsamma eftersom de är i sig långsamma (en ineffektiv typ av server) ,
        * eftersom de är överväldigade av för många förfrågningar,
        * eller för att din server eller fjärrservern är bandbredd begränsad.
    * Fjärrdatasetet är ibland otillgängligt (igen, av olika skäl) .
    * Att förlita sig på en källa för data skalas inte bra (när många användare och mångaERDDAPAnvänd den) .
         
* Hur det fungerar - EDDTableCopy löser dessa problem genom att automatiskt göra och upprätthålla en lokal kopia av data och betjäna data från den lokala kopian.ERDDAP™kan tjäna data från den lokala kopian mycket, mycket snabbt. Och att göra och använda en lokal kopia lindrar bördan på fjärrservern. Och den lokala kopian är en säkerhetskopia av originalet, vilket är användbart om något händer med originalet.
    
Det finns inget nytt om att göra en lokal kopia av en dataset. Vad som är nytt här är att denna klass gör det\\*lätt\\*att skapa och\\*upprätthålla\\*en lokal kopia av data från en\\*variation\\*av typer av fjärrdatakällor och\\*Lägg till metadata\\*medan du kopierar data.
    
#### EDDTableCopy vs&lt;cacheFromUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFromUrl&gt; är ett alternativ till EDDTableCopy. De arbetar annorlunda.

* EDDTable Kopiera fungerar genom att begära bitar av data från en fjärrtjänst och lagra dessa bitar i lokala filer. Därför är EDDTableCopy användbart i vissa fall där data är tillgänglig via en fjärrtjänst.
* [Och [Gud]&lt;cacheFromUrl&gt;] (#cachefromurl) hämtar de befintliga filerna som anges på en fjärrwebbplats.&lt;cacheFromUrl&gt; är lättare att använda och mer tillförlitlig eftersom det enkelt kan berätta när det finns en ny fjärrdatafil eller när en fjärrdatafil har ändrats och därmed måste laddas ner.

Om det finns situationer där EDDTableCopy eller&lt;cacheFromUrl&gt; kan användas, använd&lt;cacheFromUrl&gt; eftersom det är lättare och mer tillförlitligt.
     
#### &lt;ExtractDestination Namn & gt;{#extractdestinationnames} 
EDDTable Kopiera gör den lokala kopian av data genom att begära bitar av data från fjärrdatamängden. EDDTable Copy bestämmer vilka bitar att begära genom att begära & Distinct () värden för&lt;ExtractDestinationNames&gt; (specificeras idatasets.xmlSe nedan) , som är de utrymmesseparerade destinationsnamnen på variabler i fjärrdatamängden. Till exempel,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
kan ge distinkta värden kombinationer av drivmedel = tig17,profil = 1017, drivmedel = tig17,profil = 1095, ... drivkraft = o12,profil = 1223, drivkraft = o12, profil = 1251, ....

I situationer där en kolumn (Till exempel profil) kan vara allt som krävs för att unikt identifiera en grupp rader av data, om det finns ett mycket stort antal, till exempel profiler, kan det vara användbart att också ange ett extrakt. Destination Namnnamn (Till exempel drifter) som tjänar till att dela profilerna. Det leder till färre datafiler i en viss katalog, vilket kan leda till snabbare åtkomst.
    
#### Lokala filer{#local-files} 
Varje bit data lagras i en separatNetCDFfil i en underkatalog över *bigParentDirectory* /copy/ *datasetID* /// (som anges i[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Det finns en underkatalog nivå för alla utom den sista extraktDestinationName. Till exempel skulle data för tig17+1017 lagras i
     *bigParentDirectory* /copy/sampleDataset/tig17/1017.nc.
Till exempel skulle data för une12+1251 lagras i
     *bigParentDirectory* /copy/sampleDataset/une12/1251.nc.
Katalog och filnamn som skapats av datavärden ändras för att göra dem filnamnssäkra (Till exempel ersätts utrymmen med "x20") Detta påverkar inte själva data.
     
#### Nya data{#new-data} 
Varje gång EDDTable Kopiera laddas om, det kontrollerar fjärrdataset för att se vilka distinkta bitar som finns tillgängliga. Om filen för en bit data inte redan finns, läggs en begäran om att få biten till i en kö.ERDDAP"S uppgiftThread processer alla köförfrågningar om bitar av data, en-för-en. Du kan se statistik för uppgiftenThreads aktivitet på[Status Page](/docs/server-admin/additional-information#status-page)och i[Daglig rapport](/docs/server-admin/additional-information#daily-report). (Ja, ja,ERDDAP™kan tilldela flera uppgifter till denna process, men det skulle använda upp massor av fjärrdatakällans bandbredd, minne och CPU-tid, och massor av lokalbefolkningen.ERDDAPBandbredd, minne och CPU-tid, ingen av dem är en bra idé.) 
    
Första gången en EDDTableCopy laddas, (Om allt går bra) Många förfrågningar om bitar av data kommer att läggas till i uppgiftThreads kö, men inga lokala datafiler kommer att ha skapats. Så konstruktören kommer att misslyckas men uppgiftThread kommer att fortsätta att fungera och skapa lokala filer. Om allt går bra kommer uppgiftenThread att göra några lokala datafiler och nästa försök att ladda om datamängden. (I ~15 minuter) kommer att lyckas, men först med en mycket begränsad mängd data.
    
OBS: När den lokala datamängden har lite data och visas i dinERDDAPOm fjärrdatamängden tillfälligt eller permanent inte är tillgänglig kommer den lokala datamängden fortfarande att fungera.
    
VARNING: Om fjärrdatamängden är stor och/eller fjärrservern är långsam (Det är problemet, eller hur?&#33;) Det tar lång tid att göra en komplett lokal kopia. I vissa fall är den tid som behövs oacceptabel. Till exempel överför 1 TB data över en T1-linje (0,15 GB/s) tar minst 60 dagar, under optimala förhållanden. Dessutom använder den massor av bandbredd, minne och CPU-tid på fjärr- och lokala datorer. Lösningen är att skicka en hårddisk till administratören av fjärrdatauppsättningen så att han / hon kan göra en kopia av datamängden och skicka hårddisken tillbaka till dig. Använd dessa data som utgångspunkt och EDDTableCopy kommer att lägga till data. (Det är så Amazons EC2 Cloud Service brukade hantera problemet, även om deras system har massor av bandbredd.) 
    
VARNING: Om en given kombination av värden försvinner från en fjärrdatamängd tar EDDTableCopy inte bort den lokala kopierade filen. Om du vill kan du ta bort det själv.
    
#### TableCopy&lt;checkSourceData&gt;{#tablecopy-checksourcedata} 
ochdatasets.xmlför denna dataset kan ha en valfri tagg
```
    <checkSourceData>true</checkSourceData>  
```
Standardvärdet är sant. Om/när du ställer in den till falsk, kommer datamängden aldrig att kontrollera källdatamängden för att se om det finns ytterligare data tillgängliga.
     
#### Rekommenderad användning{#recommended-use} 
1. Skapa&lt;Dataset&gt; Inträde (den ursprungliga typen, inte EDDTableCopy) för fjärrdatakällan. **Få det att fungera korrekt, inklusive alla önskade metadata.** 
2. Om det är för långsamt, lägg till XML-kod för att linda den i en EDDTableCopy dataset.
    * Använd en annandatasetID  (Kanske genom att ändradatasetIDav den gamladatasetIDLite) .
    * Kopiera&lt;tillgänglig tillgänglig Till&gt;,&lt;reloadEveryNMinutes &gt; och&lt;onChange &gt; från fjärr EDDTables XML till EDDTableCopys XML. (Deras värderingar för EDDTableCopy materia; deras värderingar för inre dataset blir irrelevanta.) 
    * Skapa&lt;ExtractDestinationNames&gt; tagga (Se ovan) .
    *   &lt;orderExtractBy&gt; är en OPTIONAL utrymme separerad lista över destinationsvariabla namn i fjärrdataset. När varje bit av data laddas ner från fjärrservern sorteras biten av dessa variabler. (av den första variabeln, sedan av den andra variabeln om den första variabeln är bunden,) . I vissa fall,ERDDAP™kommer att kunna extrahera data snabbare från de lokala datafilerna om den första variabeln i listan är en numerisk variabel. ("time"räknas som en numerisk variabel) . Men välj dessa variabler på ett sätt som är lämpligt för datamängden.
3.  ERDDAP™kommer att göra och upprätthålla en lokal kopia av data.
         
* VARNING: EDDTableCopy förutsätter att datavärdena för varje bit aldrig förändras. Om/när de gör det måste du manuellt ta bort bitfilerna i *bigParentDirectory* /copy/ *datasetID* / som förändrats och[flagga](/docs/server-admin/additional-information#flag)datamängden som ska laddas om så att de borttagna bitarna kommer att ersättas. Om du har ett e-postabonnemang till datamängden får du två e-postmeddelanden: en när datamängden först laddas om och börjar kopiera data och en annan när datamängden laddas igen (automatiskt automatiskt) och upptäcker de nya lokala datafilerna.
     
* Ändra metadata ----- Om du behöver ändra någonaddAttributeseller ändra beställningen av variablerna i samband med källdatamängden:
    1. Ändra förändringenaddAttributesför källdataset indatasets.xmlSom behövs.
    2. Ta bort en av de kopierade filerna.
    3. Ställ en[flagga](/docs/server-admin/additional-information#flag)för att ladda om datasetet omedelbart. Om du använder en flagga och du har en e-postadress till datamängden får du två e-postmeddelanden: en när datamängden först laddas om och börjar kopiera data och en annan när datamängden laddas igen (automatiskt automatiskt) och upptäcker de nya lokala datafilerna.
    4. Den borttagna filen kommer att regenereras med den nya metadata. Om källdatamängden någonsin är otillgänglig kommer EDDTableCopy-datamängden att få metadata från den regenererade filen, eftersom den är den yngsta filen.
         
*   [EDDGridKopiera](#eddgridcopy)är mycket lik EDDTableCopy, men arbetar med ruttna datamängder.
#### EDDTableCopy skelett XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - - - -

## Detaljer{#details-1} 

Här är detaljerade beskrivningar av vanliga taggar och attribut.

### &lt;AngularDegreeUnits & gt;{#angulardegreeunits} 
* [Och [Gud] ** &lt;AngularDegreeUnits&gt; ** ] (#angulardegreeunits) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlsom innehåller en komma-separerad lista över enheter strängar somERDDAP™bör behandlas som agular grader enheter. Om en variabel har en av dessa enheter,tabledap"SorderByMeanfilter beräknar medelvärdet på ett speciellt sätt, sedan rapportera medelvärdet som ett värde från -180 till 180. SeERDDAPEDStatic.java-källkodsfil för den aktuella standardlistan. Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).
### &lt;AngularDegreeTrueUnits & gt;{#angulardegreetrueunits} 
* [Och [Gud] ** &lt;Angular DegreeTrueUnits&gt; ** ] (#angulardegreetrueunits) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlsom innehåller en komma-separerad lista över enheter strängar somERDDAP™bör behandlas som agular grader sanna enheter. Om en variabel har en av dessa enheter,tabledap"SorderByMeanfilter beräknar medelvärdet på ett speciellt sätt, sedan rapportera medelvärdet som ett värde från 0 till 360. SeERDDAPEDStatic.java-källfilen för den aktuella standardlistan. Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).
     
### &lt;commonStandardNames&gt;{#commonstandardnames} 
* [Och [Gud] ** &lt;gemensammaStandardNames&gt; ** ] (#common standardnamn) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlför att ange en komma-separerad lista över gemensamma[CF-standardnamn](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). t.ex.,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Denna lista används i DataProviderForm3.html som bekvämlighet för användare.
Om du vill lämna denna information idatasets.xmlBörja med att kopiera den aktuella standardlistan i&lt;Default\\_commonStandardNames&gt; in iERDDAP"S
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil.
     
### &lt;cacheminutes & gt;{#cacheminutes} 
* [Och [Gud] ** &lt;cacheminutes &gt; ** ] (#cache Minuter) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlatt ange åldern (på några minuter) där filer i cache bör raderas (Standard=60) . t.ex.,
```
    <cacheMinutes>60</cacheMinutes>  
```
I allmänhet endast bildfiler (eftersom samma bilder ofta begärs upprepade gånger) och.ncfiler filer (eftersom de måste skapas fullt ut innan de skickas till användaren) är cachade. Även om det kan verka som en viss begäran bör alltid returnera samma svar, är det inte sant. Till exempel entabledapFörfrågan som inkluderar tid&gt; *vissa Tid* ändras när nya data kommer till datasetet. Och en griddap begäran som inkluderar\\[Sista sista\\]för tidsdimensionen kommer att ändras när nya data kommer till datamängden. Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag). FöreERDDAP™v2.00, detta anges i setup.xml, som fortfarande är tillåtet men avskräckt.

### &lt;cacheClearMinutes & gt;{#cacheclearminutes} 
* [Och [Gud] ** &lt;cacheClearMinutes &gt; ** ] (#cacheclearminutes) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlför att ange frekvensen för att kontrollera cachade filer och ta bort gamla (på några minuter)   (Standard=15) . t.ex.,
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
När servern slutar hantera en förfrågan kommer den att kontrollera hur länge sedan den sista cache klar var. Om det var för länge sedan kommer det att köa en uppgift på TaskThread för att rensa cache. Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag). Detta kan anges i specificerad i setup.xml, men det är avskräckt.
     
### &lt;konverteraInterpolateRequestCSVExample&gt;{#convertinterpolaterequestcsvexample} 
* [Och [Gud] ** &lt;konverteraInterpolateRequestCSVExample &gt; ** ] (#convertinterpolaterequestcsvexample) är en optisk tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xml \\[Börja medERDDAP™v2.10\\]som innehåller ett exempel som visas på Interpolate-omvandlarens webbsida. Standardvärdet är: jplMURSST41/analyseradsst/Bilinear/4.
### &lt;konverteraInterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [Och [Gud] ** &lt;konverteraInterpolateDatasetIDVariableList&gt; ** ] (#convertinterpolatedatasetidvariablelist) är en optisk tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xml \\[Börja medERDDAP™v2.10\\]som innehåller en CSV lista överdatasetID/variabel Namn exempel som kommer att användas som förslag av Interpolate konverterarens webbsida. Standardvärdet är: jplMURSST41/analyseradsst.
### &lt;konverteraToPublicSourceUrl&gt;{#converttopublicsourceurl} 
* [Och [Gud] ** &lt;konverteraToPublicSourceUrl&gt; ** ] (#converttopublicsourceurl) är en optisk tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlsom innehåller en "från" och en "till" attribut som anger hur man konverterar en matchande lokalsourceUrl  (vanligtvis ett IP-nummer) till en offentligsourceUrl  (Ett domännamn) "från" måste ha formen "\\[Något något\\]///\\[Något något\\]/". Det kan finnas 0 eller fler av dessa taggar. För mer information se [&lt;sourceUrl&gt;] (#sourceurl) . Till exempel,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
kommer att orsaka en matchande lokalsourceUrl  (såsom https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
till en offentligsourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) .
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).

Av säkerhetsskäl och skäl som rör abonnemangssystemet, **Använd inte detta TAG&#33;**   
Använd alltid det offentliga domännamnet i&lt;sourceUrl&gt; tagga och använda[/etc/hosts table](https://linux.die.net/man/5/hosts)på din server för att konvertera lokala domännamn till IP-nummer utan att använda en DNS-server. Du kan testa om ett domännamn är korrekt konverterat till ett IP-nummer genom att använda:
Pinga *Some.domain.name*   
     
### data:bild/png;bas64,{#dataimagepngbase64} 
* När en användare begär en.htmlTablesvar frånERDDAP™om data i en strängcell innehåller data:bild/png;base64, följt av en bas64-kodad .png-bild,ERDDAP™Visa en ikon (Så användaren kan se bilden om de svävar över den) och knappar för att spara texten eller bilden till klippbordet. Denna funktion lades till iERDDAP™v2.19 av Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)specificerar standardinställningen som styr när och hur landmasken ska dras närERDDAP™drar en karta. Den kan specificeras på tre olika platser idatasets.xml  (listad från lägsta till högsta prioritet) Från:
    
    1. OmdrawLandMaskspecificeras inom&lt;ErddapDatasets&gt; (Inte ansluten till någon specifik dataset) , då specificerar den standardvärdet avdrawLandMaskför alla variabler i alla dataset. Till exempel,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAPLäserdatasets.xml.
Om denna tagg inte är närvarande är det underliggande standardvärdet under.
         
    2. OmdrawLandMaskspecificeras som en global egenskap hos en viss datamängd, då specificerar den standardvärdet avdrawLandMaskför alla variabler i den datamängden, överskridande eventuella lägre prioriteringsinställningar. Till exempel,
    ```
        <att name="drawLandMask">under</att>  
    ```
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™reloads that dataset.
         
    3. OmdrawLandMaskspecificeras som en variabels attribut i en viss dataset, då specificerar den standardvärdet pådrawLandMaskför den där variabeln i den datamängden, som överskrider någon lägre prioritetsinställning. Till exempel,
    ```
        <att name="drawLandMask">under</att>  
    ```
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™reloads that dataset.
    
En användare kan åsidosätta standarden (Varhelst den är specificerad) genom att välja ett värde för "Draw land mask" från en nedgångslista på datasetets Make A Graph-webbsida, eller genom att inkludera &.land = *Värdevärde* i webbadressen som begär en karta frånERDDAP.
    
I alla situationer finns det 4 möjliga värden för attributet:
    
    * "under" drar landmask innan den drar data på kartan.
För ruttna datamängder visas mark som en konstant ljusgrå färg.
För tabelldataset visar "under" topografidata över land och hav.
    * "over" - För ruttna datamängder drar "over" landmasken efter att den drar data på kartor så att den kommer att maskera alla data över land. För tabular dataset, "over" visar badymetri av havet och en konstant ljusgrå där det finns mark, både dras under data.
    * "outline" drar bara skissen på landmasken, politiska gränser, sjöar och floder.
    * "off" drar ingenting.
### &lt;emailDiagnosticsToErdData&gt;{#emaildiagnosticstoerddata} 
* [Och [Gud] ** &lt;emailDiagnosticsToErdData &gt; ** ] (#emaildiagnosticstoerddata) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xml. taggens värde kan vara sant (Default) eller falsk. Om det är sant,ERDDAP™kommer att maila stack spår till Chris. John på noaa. Gov (ochERDDAP™utvecklingsteam) . Detta bör vara säkert och säkert eftersom ingen konfidentiell information (t.ex. begäran) ingår i e-post. Detta bör göra det möjligt att fånga eventuella obskyra, helt oväntade buggar som leder till NullPointerExceptions. Annars ser användaren undantagen, menERDDAP™utvecklingsteamet gör inte (Vi vet inte att det finns ett problem som måste åtgärdas) .
     
### &lt;grafBackgroundColor & gt;{#graphbackgroundcolor} 
* [Och [Gud] ** &lt;grafBackgroundColor&gt; ** ] (#graphbackgroundcolor) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlför att ange standard bakgrundsfärg på grafer. Detta påverkar nästan alla grafer. Det finns några situationer som inte påverkas. Färgen anges som ett 8-siffrigt hexadecimalvärde i formen 0xAARRGGBB, där AA, RR, GG och BB är opacitet, röda, gröna och blå komponenter, respektive. "0x" är fallkänsligt, men de hexadecimala siffrorna är inte fallkänsliga. Till exempel en helt ogenomskinlig (ff) grönskblå färg med röd = 22, grön = 88, blå =ee skulle vara 0xff2288ee. Opaque white är 0xffffff. Standarden är ogenomskinlig ljusblå (0xffccff) , som har fördelen av att vara annorlunda än vit, vilket är en viktig färg i många paletter som används för att rita data. Till exempel,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).
### &lt;ipAddressMaxRequests & gt;{#ipaddressmaxrequests} 
* [Och [Gud] ** &lt;ipAddressMaxRequests &gt; ** ] (#ipaddressmaxrequests) är en sällan använda valfri tag (först stöds medERDDAP™v2.12) inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlDet är en del av ett system för att begränsa förmågan hos alltför aggressiva legitima användare och skadliga användare att göra ett stort antal samtidiga förfrågningar som skulle försämra systemets prestanda för andra användare. ipAddress MaxRequests specificerar det maximala antalet samtidiga förfrågningar som kommer att godtas från någon specifik IP-adress. Ytterligare förfrågningar kommer att få ett HTTP 429 fel: För många förfrågningar. De små, statiska filerna i erddap / nedladdning / och erddap / bilder / är inte undantagna från detta räkning. Standarden är 15. Det högsta tillåtna är 1000, vilket är galet högt - gör det inte&#33;ERDDAP™inte acceptera ett nummer mindre än 6 eftersom många legitima användare (i synnerhet webbläsare ochWMSkunder) Gör upp till 6 förfrågningar åt gången. ochERDDAP™Daily Report och liknande information som skrivs till log.txt-filen med varje Major Dataset Reload, kommer nu att innehålla en sammanfattning av förfrågningarna av dessa IP-adresser under titeln "Requesters IP-adress (För många begäran) ".
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).
    
"Major LoadDatasets Time Series" -sektionen av status.html innehåller en "toMany" -kolumn som listar antalet förfrågningar som översteg en användares ipAddressMaxRequests-inställning och såg således ett "för många förfrågningar" -fel. Detta låter dig enkelt se när det finns aktiva alltför aggressiva användare och skadliga användare så att du kan (valfritt) Titta i log.txt-filen och bestäm om du vill svartlista dessa användare.
    
Det är inget specifikt fel med att ställa in detta till ett högre antal. Det är upp till dig. Men gör det tillåter / uppmuntrar människor att ställa in system som använder ett stort antal trådar för att arbeta på projekt och sedan ger dem ingen feedback om att vad de gör inte får dem någon nytta.
### &lt;ipAddressMaxRequestsActive&gt;{#ipaddressmaxrequestsactive} 
* [Och [Gud] ** &lt;ipAddressMaxRequestsActive ** ] (#ipaddressmaxrequestsactive) är en sällan använda valfri tag (först stöds medERDDAP™v2.12) inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlDet är en del av ett system för att begränsa förmågan hos alltför aggressiva legitima användare och skadliga användare att göra ett stort antal samtidiga förfrågningar som skulle försämra systemets prestanda för andra användare. ipAddressMaxRequestsActive specificerar det maximala antalet samtidiga förfrågningar som kommer att behandlas aktivt från någon specifik IP-adress. Ytterligare förfrågningar kommer att sitta i en kö tills tidigare förfrågningar har behandlats. De små, statiska filerna i erddap / nedladdning / och erddap / bilder / är undantagna från detta räkning och den relaterade strypning. Standarden är 2. Det högsta tillåtna är 100, vilket är galet högt - gör det inte&#33; Du kan ställa in detta till 1 för att vara strikt, särskilt om du har problem med alltför aggressiva eller skadliga användare. Användare kommer fortfarande snabbt att få alla data de begär (Upp till ipAddressMaxRequests) Men de kommer inte att kunna krama systemresurser. Vi rekommenderar inte att du ställer in detta till ett större antal eftersom det tillåter alltför aggressiva legitima användare och skadliga användare att dominera.ERDDAPbearbetningskapacitet.
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).
     
### &lt;ipAddressUnlimited&gt;{#ipaddressunlimited} 
* [Och [Gud] ** &lt;ipAddressUnlimited ** ] (#ipaddressunlimited) är en sällan använda valfri tag (först stöds medERDDAP™v2.12) inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlDet är en del av ett system för att begränsa förmågan hos alltför aggressiva legitima användare och skadliga användare att göra ett stort antal samtidiga förfrågningar som skulle försämra systemets prestanda för andra användare. ipAddressUnlimited är en komma-separerad lista över IP-adresser som du vill tillåta obegränsad tillgång till dinERDDAP. Titta i din logg. txt-fil för att se vilket format din server använder för IP-adresserna. På vissa servrar kommer IP-adresserna att vara i formatet #.#.#.#. (där # är ett heltal från 0 till 255) ; på andra kommer det att finnas i formatet #:#:#:#:#:#:#:#:#:#:# . Förfrågningar på denna lista är inte föremål för antingen ipAddressMaxRequests eller ipAddressMaxRequestsActive-inställningarna. Detta kan vara en sekundärERDDAP™eller för vissa användare eller servrar i ditt system.ERDDAP™tillägger alltid " (UnknownIPAddress) SomERDDAP™använder när förfrågarens IP-adress inte kan bestämmas, t.ex. för andra processer som körs på samma server.
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).
    
Om av någon anledning alla en användares förfrågningar får felmeddelandet "Timeout väntar på dina andra förfrågningar att bearbeta.", kan du lösa problemet genom att lägga till användarens IP-adress till ipAddressUnlimited-listan, tillämpa den förändringen och sedan ta bort den från den listan.
    
### &lt;loadDatasetsMinutes & gt;{#loaddatasetsminminutes} 
* [Och [Gud] ** &lt;loadDatasetsMinutes&gt; ** ] (#loaddatasetsmin Minuter) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlför att specificera minimitiden (på några minuter) mellan stor belastning Dataset (När närERDDAP™Reprocesserdatasets.xml, inklusive att kontrollera varje datamängd för att se om den behöver laddas om enligt dess reload. EveryNMinutes inställning, standard=15) . t.ex.,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Om en viss körning av lastDatasets tar mindre än den här gången, tittar lastaren upprepade gånger på flaggkatalogen och / eller sover tills den återstående tiden har gått. Standarden är 15 minuter, vilket borde vara bra för nästan alla. Den enda nackdelen med att ställa in detta till ett mindre antal är att det kommer att öka frekvensen.ERDDAP™retries dataset som har fel som hindrar dem från att laddas (t.ex. en fjärrserver är nere) . Om det finns massor av sådana datamängder och de testas ofta, kan datakällan överväga att spänna / aggressivt beteende. Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag). FöreERDDAP™v2.00, detta anges i setup.xml, som fortfarande är tillåtet men avskräckt.
     
### &lt;loadDatasetsMaxMinutes & gt;{#loaddatasetsmaxminutes} 
* [Och [Gud] ** &lt;loadDatasetsMaxMinutes&gt; ** ] (#loaddatasetsmax minuter) är en optisk tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlför att ange den maximala tiden (på några minuter) En stor belastning Datasets ansträngning får ta (innan lasten Dataset tråd behandlas som "stalled" och avbryts)   (Standard=60) . t.ex.,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
I allmänhet bör detta ställas in till minst dubbelt så länge du rimligen tror att omladdning av alla datamängder. (kumulativt) bör ta (Eftersom datorer och nätverk ibland är långsammare än väntat) Detta bör alltid vara mycket längre än loadDatasetsMinutes. Standarden är 60 minuter. Vissa människor kommer att ställa detta till längre. Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag). FöreERDDAP™v2.00, detta anges i setup.xml, som fortfarande är tillåtet men avskräckt.
     
### &lt;logLevel&gt;{#loglevel} 
* [Och [Gud] ** &lt;LogLevel&gt; ** ] (#loglevel) är en optisk tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlför att ange hur många diagnostiska meddelanden som skickas till log.txt-filen. Det kan ställas in till "varning" (De minsta meddelandena) "Info" (Default) eller "all" (De flesta meddelanden) . t.ex.,
```
    <logLevel>info</logLevel>  
```
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag). FöreERDDAP™v2.00, detta anges i setup.xml, som fortfarande är tillåtet men avskräckt.
     
### &lt;partalRequestMaxBytes & gt; och&lt;partialRequestMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [Och [Gud] ** &lt;partialRequestMaxBytes &gt; **] (#partialrequestmaxbytes-and-partialrequestmaxcells) och [och]** &lt;partialRequestMaxCells &gt; ** ] (#partialrequestmaxbytes-and-partialrequestmaxcells) används sällan OPTIONAL-taggar inom en&lt;ErddapDatasets&gt; tagga indatasets.xml. När det är möjligt (Och det är inte alltid möjligt) ,ERDDAP™bryter stora dataförfrågningar till bitar för att spara minne.
    
Med 32 bitarJavai en förenklad mening, det maximala antalet samtidiga *stora stora* Förfrågningar är ungefär 3/4 av minnet tillgängligt (-Xmx-värdet gick till Tomcat) dividerat med chunk storlek (t.ex. 1200 MB / 100 MB =&gt; 12 förfrågningar) . Andra saker kräver minne, så det faktiska antalet förfrågningar blir mindre. I praktiken är chunking inte alltid möjligt. Så en stor eller några mycket stora samtidiga icke-juridiska förfrågningar kan orsaka problem på 32 bitar.Java.

Med 64 bitJava-Xmx-värdet kan vara mycket större. Så minnet är mycket mindre sannolikt att vara en begränsning.

Du kan åsidosätta standard bit storlek genom att definiera dessa taggar idatasets.xml  (med olika värden än vad som visas här) Från:
För nät:&lt;partialRequestMaxBytes &gt;100000000000&lt;/partialRequestMaxBytes&gt;
För tabeller:&lt;partialRequestMaxCells&gt;1000000&lt;/partialRequestMaxCells&gt;

partialRequestMaxBytes är det föredragna maximala antalet byte för en partiell nätdatabegäran (en bit av den totala begäran) . Standard=100000000000 (10^8) . Större storlekar är inte nödvändigtvis bättre (och inte gå över 500 MB eftersom det är TREDDS standardgräns förDAPsvar) . Men större storlekar kan kräva färre åtkomst till massor av filer (Tänk påERDsatellitdata med varje gång i en separat fil - det är bättre att få mer data från varje fil i varje partiell begäran) .

partialRequestMaxCells är det föredragna maximala antalet celler (nRows nColumns i datatabellen) för en partiell TABLE-databegäran (en bit av den totala begäran) . Standard = 100000. Större storlekar är inte nödvändigtvis bättre. De resulterar i en längre väntan på den första satsen av data från källan.

Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag). FöreERDDAP™v2.00, dessa specificerades i setup.xml, som fortfarande är tillåtet men avskräckt.
     
### &lt;requestBlacklist & gt;{#requestblacklist} 
* [Och [Gud] ** &lt;requestBlacklist &gt; ** ] (#requestblacklist)  [är en optisk tag](/docs/server-admin/additional-information#frequent-crashes-or-freezes)inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlsom innehåller en komma-separerad lista över numeriska IP-adresser som kommer att svartlistas. Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).
    * Detta kan användas för att avvärja en[Förnekelse av Service attack](https://en.wikipedia.org/wiki/Denial_of_service)En alltför iver[Webbrobot](https://en.wikipedia.org/wiki/Internet_bot)eller någon annan typ av besvärande användare.
    * Besvärande användare - OmERDDAP™saktar till en krypa eller fryser / stopp, orsaken är ofta en besvärande användare som kör mer än ett manus på en gång och / eller gör ett stort antal mycket stora, extremt ineffektiva eller ogiltiga förfrågningar, eller samtidiga förfrågningar. Titta in[Log.txt](/docs/server-admin/additional-information#log)se om så är fallet och hitta den numeriska IP-adressen för den besvärliga användaren. Om detta är problemet, bör du förmodligen svartlista den användaren.
        
När närERDDAP™Får en begäran från en svartlistad IP-adress, kommer den att returnera HTTP-fel 403: Förbjudet. Medföljande textfelmeddelande uppmuntrar användaren att maila dig, denERDDAPadministratör, för att lösa problemen. Om de tar sig tid att läsa felmeddelandet (Många uppenbarligen inte) och kontakta dig, du kan sedan arbeta med dem för att få dem att köra bara ett manus åt gången, göra effektivare förfrågningar, åtgärda problemen i deras manus. (Till exempel begära data från en fjärrdatamängd som inte kan svara innan du timar ut) Eller vad som helst annat var källan till problem.
        
Användare är ofta helt enkelt omedvetna om att deras förfrågningar är besvärliga. De är ofta omedvetna om buggar, bruttoineffektivitet eller andra problem med sina skript. De tror ofta att för dinERDDAP™erbjuder data gratis, som de kan begära så mycket data som de vill, t.ex. genom att köra flera skript eller genom att använda flera trådar samtidigt.
        
        * Du kan förklara för dem att varjeERDDAP™Oavsett hur stor och kraftfull, har ändliga resurser (CPU tid, hårddisk I/O, nätverk bandbredd, etc.) Och det är inte rättvist om en användare begär data på ett sätt som tränger ut andra användare eller överbelastningar.ERDDAP.
        * När en användare vet hur man gör 2 samtidiga förfrågningar, ser de ofta ingen anledning att inte göra 5, 10 eller 20 samtidiga förfrågningar, eftersom ytterligare förfrågningar kostar dem ingenting. Det är som asymmetrisk krigföring: här har offensiva vapen en enorm fördel (noll kostnad) över defensiva vapen (En finit installation med verkliga kostnader) .
        * Påpeka för dem att det finns minskande avkastning för att göra fler och fler samtidiga förfrågningar; de ytterligare förfrågningarna blockerar bara andra användares förfrågningar; de ger inte en stor förbättring för dem.
        * Påminn dem om att det finns andra användare (både tillfälliga användare och andra användare som kör skript) Så det är inte rättvist för dem att krama allaERDDAPResurser.
        * Påpeka att teknikjättarna har inducerat användare att förvänta sig oändliga resurser från webbtjänster. Medan det finns sätt att ställa in[nät/kluster/federationer avERDDAPs](/docs/server-admin/scaling)att göra enERDDAP™system med mer resurser, de flestaERDDAP™administratörer har inte pengarna eller arbetskraften för att inrätta sådana system, och ett sådant system kommer fortfarande att vara ändligt. på At at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at atERDDet finns till exempel en person (Jag mig) skrivaERDDAP™administrera tvåERDDAPs (Med hjälp av min chef) , och hantera flera datakällor, alla med en årlig hårdvara budget på $ 0 (Vi förlitar oss på tillfälliga bidrag för att betala för hårdvara) . Detta är inte Google, Facebook, Amazon, etc med 100-tals ingenjörer och miljontals dollar av intäkter för att återvinna till allt större system. Och vi kan inte bara flytta våraERDDAP™till exempel Amazon AWS, eftersom datalagringskostnaderna är stora och datautsläppsavgifterna är stora och varierande, medan vår budget för externa tjänster är en fast $ 0.
        * Min begäran till användare är: för icke-tidskänsliga förfrågningar (vilket är det överlägset vanligaste fallet) Deras system bör bara göra en begäran åt gången. Om förfrågningarna är tidskänsliga (t.ex. flera .pngs på en webbsida, flera plattor för enWMSKund, etc.) 4 samtidiga förfrågningar bör vara max (och bara för en mycket kort tid) .
        * Om du förklarar situationen för användaren kommer de flesta användare att förstå och vara villiga att göra nödvändiga ändringar så att du kan ta bort deras IP-adress från svartlistan.
             
    * För att svartlista en användare, lägg till sin numeriska IP-adress till den komma-separerade listan över IP-adresser i&lt;requestBlacklist &gt; i dindatasets.xmlfil. För att hitta den besvärliga användarens IP-adress, titta iERDDAP™  *bigParentDirectory* /logs/log.txt-fil ( *bigParentDirectory* specificeras i[setup.xml](/docs/server-admin/deploy-install#setupxml)) för att se om så är fallet och för att hitta den användarens IP-adress. IP-adressen för varje förfrågan anges på linjerna som börjar med "&#123;&#123;&#123;&#123;#" och är 4 nummer separerade med perioder, till exempel 123.45.67.8 . Söka efter "ERROR" hjälper dig att hitta problem som ogiltiga förfrågningar.
    * Du kan också ersätta det sista numret i en IP-adress med\\*202.109.200.\\*för att blockera en rad IP-adresser, 0-255.
    * Du kan också ersätta de två sista siffrorna i en IP-adress med\\*.\\*  (till exempel 121.204.\\*.\\*) för att blockera ett bredare utbud av IP-adresser, 0-255.0-255.
    * Till exempel,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Du behöver inte starta omERDDAP™För ändringarna&lt;requestBlacklist &gt; träder i kraft. Ändringarna kommer att upptäckas nästa gångERDDAP™Kontrollera om några datamängder måste laddas om. Eller du kan påskynda processen genom att besöka en[setDataset Flagga URL](/docs/server-admin/additional-information#set-dataset-flag)för alla dataset.
    * Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Din Din Dina Dina Dina Dina Dina Dina Dina Dina Dina Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din DinERDDAP™Den dagliga rapporten innehåller en lista/tal av de mest aktiva och blockerade förfrågningarna.
    * Om du vill räkna ut vilken domän / institution som är relaterad till en numerisk IP-adress kan du använda en gratis, omvänd DNS-webbtjänst som[ https://network-tools.com/ ](https://network-tools.com/).
    * Det kan finnas tillfällen då det är vettigt att blockera vissa användare på en högre nivå, till exempel skadliga användare. Du kan till exempel blockera åtkomsten till allt på din server, inte baraERDDAP. På Linux är en sådan metod att använda[Iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). Du kan till exempel lägga till en regel som blockerar allt från 198.51.100.0 med kommandot.
Iptables -I INPUT -s 198.51.100.0 -j DROP
       
### &lt;slowDownTroubleMillis & gt;{#slowdowntroublemillis} 
* [Och [Gud] ** &lt;slowDownTroubleMillis &gt; ** ] (#slowdowntroublemillis) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlsom innehåller ett heltal som specificerar antalet millisekunder (Standard=1000) pausa när du svarar på alla misslyckade förfrågningar, t.ex. okända dataset, begära för stor, användare på svartlistan. t.ex.,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Om ett manus gör en begäran omedelbart efter en annan, kan det snabbt göra en dålig begäran efter en annan. Med denna inställning kan du sakta ner ett misslyckat manus såERDDAP™Översvämmas inte med dåliga förfrågningar. Om en människa gör en dålig begäran kommer de inte ens att märka denna fördröjning. Rekommendationer:
    
    * Om problemet är en distribuerad förnekelse av service (DDOS) attacker från 100+ angripare, sätt detta till ett mindre antal (100?) . Att sakta ner dem allt för länge leder till för många aktiva trådar.
    * Om problemet är från 1-10 källor, ange detta till 1000 ms (Default) Men ett större antal (som 10000) är också rimligt. Det saktar ner dem så att de slösar färre nätverksresurser. 1000 ms eller så kommer inte irritera mänskliga användare som gör en dålig begäran.
    
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).
     
### &lt;abonnemangEmailBlacklist&gt;{#subscriptionemailblacklist} 
* [Och [Gud] ** &lt;Prenumeration EmailBlacklist &gt; ** ] (#subscriptionemailblacklist) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlsom innehåller en komma-separerad lista över e-postadresser som omedelbart svartlistas från[abonnemangssystem](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)till exempel
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Detta är ett fallkänsligt system. Om en e-postadress läggs till i den här listan, om den e-postadressen har prenumerationer, kommer prenumerationerna att annulleras. Om en e-postadress på listan försöker prenumerera kommer begäran att vägras. Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).
     
### Standardtext{#standard-text} 
*   [ **Standardtext** ](#standard-text)----- Det finns flera Optional taggar (De flesta används sällan) inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlatt ange text som visas på olika platser iERDDAP. Om du vill ändra standardtexten kopierar du det befintliga värdet från taggen med samma namn i
     *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml in idatasets.xmlÄndra sedan innehållet. Fördelen med att ha dessa idatasets.xmlär att du kan ange nya värden när som helst, även närERDDAP™är igång. Eventuella ändringar av dessa taggars värden träder i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag). Taggnamnen beskriver deras syfte, men se standardinnehållet i meddelanden.xml för en djupare förståelse.
    
    *   &lt;standardlicens&gt;
    *   &lt;StandardContact &gt;
    *   &lt;StandardDataLicenses&gt;
    *   &lt;StandardDisclaimerOfEndorsement&gt;
    *   &lt;StandardDisclaimerOfExternalLinks&gt;
    *   &lt;StandardGeneralDisclaimer &gt;
    *   &lt;standard PrivacyPolicy &gt;
    *   &lt;StartHeadHtml5&gt;
    *   &lt;StartBodyHtml5&gt; är en bra tag att ändra för att anpassa utseendet på toppen av varje webbsida i dinERDDAP. I synnerhet kan du använda detta för att enkelt lägga till ett tillfälligt meddelande påERDDAP™Hemsidan (t.ex. "Kontrollera den nya JPL MUR SST v4.1 dataset ..." eller "DettaERDDAP™kommer att vara offline för underhåll 2019-05-08T17:00:00 PDT genom 2019-05-08T20:00 PDT.") . En quirk av att sätta denna tagg idatasets.xmlNär du startar omERDDAPDen allra första begäran attERDDAP™Kommer att returnera standardstarten BodyHtml5 HTML, men varje efterföljande begäran kommer att använda startBodyHtml5 HTML specificerad idatasets.xml.
    *   &lt;TheShortDescription Html&gt; är en bra tag att ändra för att anpassa beskrivningen av dinERDDAP. Observera att du enkelt kan ändra detta för att lägga till ett tillfälligt meddelande på hemsidan (t.ex. "DettaERDDAP™kommer att vara offline för underhåll 2019-05-08T17:00:00 PDT genom 2019-05-08T20:00 PDT.") .
    *   &lt;endBodyHtml5&gt;
    
      
FöreERDDAP™v2.00, dessa specificerades i setup.xml, som fortfarande är tillåtet men avskräckt.
     
### &lt;ovanliga Aktivitet & gt;{#unusualactivity} 
* [Och [Gud] ** &lt;ovanlig aktivitet&gt; ** ] (#Ovanligaktivitet) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlange det maximala antalet förfrågningar mellan två körningar av LoadDatasets som anses normalt (Standard=10000) . Om det numret överskrids skickas ett e-postmeddelande till e-post (som anges i setup.xml) . t.ex.,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag). FöreERDDAP™v2.00, detta anges i setup.xml, som fortfarande är tillåtet men avskräckt.
     
### &lt;updateMaxEvents & gt;{#updatemaxevents} 
* [Och [Gud] ** &lt;updateMaxEvents&gt; ** ] (#updatemaxevents) är en sällan OPTIONAL tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlför att ange det maximala antalet filändringshändelser (Standard=10) som skall hanteras av&lt;updateEveryNMillis &gt;] (#updateeverynmillis) system innan du byter för att ladda om dataset istället. Till exempel,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
UppdateringEveryNMillis-systemet är avsett att köra mycket snabbt innan en användares begäran behandlas. Om det finns många filändringshändelser kan det förmodligen inte köras snabbt, så det kräver istället att datamängden laddas om. Om dinERDDAP™hantera datamängder som måste hållas uppdaterade även när det finns ändringar i ett stort antal datafiler, kan du ställa in detta till ett större antal (100?) .

### &lt;användaren & gt;{#user} 
* [Och [Gud] ** &lt;Användare&gt; ** ] (#user) är en optisk tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xmlsom identifierar användarens användarnamn, lösenord (om autentisering = anpassad) och roller (en comma-separerad lista) . Användningen av användarnamn och lösenord varierar något baserat på värdet av [&lt;autentisering &gt;] (/docs/server-admin/additional-information#authentication) i dinERDDAPs setup.xml fil.
    * Detta är en del avERDDAP"S[Säkerhetssystem](/docs/server-admin/additional-information#security)för att begränsa åtkomsten till vissa datamängder till vissa användare.
    * Gör en separat&lt;Användare&gt; tagga för varje användare. Alternativt, om autentisering = oauth2, kan du ställa in två&lt;Användare&gt; taggar för varje användare: en för när användaren loggar in via Google, en för när användaren loggar in via Orcid, förmodligen med samma roller.
    * Om det inte finns något&lt;Användare&gt; tagga för en klient, s/han kommer bara att kunna komma åt offentliga datamängder, dvs datamängder som inte har en [&lt;tillgänglig för&gt;] (#accessibleto) tag.
    * användarnamn
För autentisering = anpassad är användarnamnet vanligtvis en kombination av bokstäver, siffror, understruktioner och perioder.
För autentisering = e-post är användarnamnet användarens e-postadress. Det kan vara någon e-postadress.
För autentisering = Google är användarnamnet användarens fullständiga Google-e-postadress. Detta inkluderar Google-hanterade konton som@noaa.govkonton.
För autentisering=orcid är användarnamnet användarens Orcid-kontonummer (Med Dashes) .
För autentisering=oauth2 är användarnamnet användarens fullständiga Google-e-postadress eller användarens Orcid-kontonummer. (Med Dashes) .
    * lösenord
För autentisering = e-post, google, orcid eller oauth2, ange inte ett lösenord attribut.
För autentisering = anpassad måste du ange ett lösenord attribut för varje användare.
        * Lösenorden som användarna anger är fallet känsliga och måste ha 8 eller fler tecken så att de är svårare att knäcka. Numera kan även 8 tecken knäckas snabbt och billigt av brute force med hjälp av ett kluster av datorer på AWS.ERDDAP™endast genomdriver minst 8 tecken när användaren försöker logga in (inte när&lt;Användaren&gt; taggen behandlas, eftersom den koden bara ser hash smälta av lösenordet, inte slätttext lösenordet).
        * setup.xml's&lt;LösenordEncoding &gt; avgör hur lösenord lagras i&lt;Användare&gt; taggar indatasets.xml. För att öka säkerheten är alternativen:
            *   [MD5](https://en.wikipedia.org/wiki/MD5)  (Använd inte detta&#33;) - för lösenordsattributet, ange MD5 hash smälta av användarens lösenord.
            * UEPMD5 (Använd inte detta&#33;) - för lösenordsattributet, ange MD5 hash smälta av *användarnamn* Från:ERDDAPFrån: *lösenord* . Användarnamnet och "ERDDAPanvänds för[Salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) hashvärdet, vilket gör det svårare att avkoda.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (inte rekommenderat) - för lösenordsattributet, ange SHA-256 hash smälta av användarens lösenord.
            * UEPSHA256 (standard, rekommenderat lösenordEncoding. Men mycket bättre: använd google, orkidé eller oauth2-autentiseringsalternativ.) för lösenordsattributet, ange SHA-256 hash smälta av *användarnamn* Från:ERDDAPFrån: *lösenord* . Användarnamnet och "ERDDAP"Används för att salta hashvärdet, vilket gör det svårare att avkoda.
        * På Windows kan du generera MD5 lösenordsvärden genom att ladda ner ett MD5-program (såsom[MD5](https://www.fourmilab.ch/md5/)) och använda (till exempel) Från:
md5 -djsmith:ERDDAPFrån: *FaktaPassword* 
        * På Linux/Unix kan du generera MD5-värden genom att använda det inbyggda md5sum-programmet (till exempel) Från:
Echo -n "jsmith:ERDDAPFrån: *FaktaPassword* "|md5sum
        * Lagrade klartext lösenord är fallkänsliga. De lagrade formerna av MD5- och UEPMD5-lösenord är inte känsliga.
        * Till exempel (Använd UEPMD5) , om användarnamn = "jsmith" och lösenord = "myPassword",&lt;Användaren&gt; tag är:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
där det lagrade lösenordet genererades med
md5 -djsmith:ERDDAPMyPassword
        * roller är en komma-separerad lista över roller för vilka användaren är auktoriserad. Alla&lt;dataset&gt; kan ha en [&lt;tillgänglig för&gt;] (#accessibleto) tagga vilka listar de roller som tillåts komma åt den datamängden. För en viss användare och en viss dataset, om en av rollerna i användarens lista över roller matchar en av rollerna i datasetets lista över&lt;tillgängligaTo&gt; roller, då användaren är behörig att komma åt den dataset.
            
Varje användare som loggar in får automatiskt rollen\\[NågonLogged Inom\\]Om det finns en&lt;Användare&gt; tagga för dem idatasets.xmleller inte. Så om en viss dataset har
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
Då kommer alla användare som är inloggade att tillåtas att komma åt den datamängden, även om det inte finns någon&lt;Användare&gt; tagga för dem idatasets.xml.
            
    * Eventuella ändringar av denna tags värde kommer att träda i kraft nästa gångERDDAP™Läserdatasets.xml, inklusive som svar på en dataset[flagga](/docs/server-admin/additional-information#flag).
         
### &lt;PathRegex & gt;{#pathregex} 
* [Och [Gud] ** &lt;PathRegex &gt; ** ] (#pathregex) låter dig ange ett regelbundet uttryck som begränsar vilka vägar (vilka underkataloger) kommer att ingå i datasetet. Standarden är .*, som matchar alla vägar. Detta är en sällan används, sällan behövs, OPTIONAL-taggen förEDDGridFrånFiles dataset, EDDTableFromFiles dataset och några andra datasettyper. Men när du behöver det, behöver du verkligen det.
    
För att göra detta arbete måste du vara riktigt bra med regelbundna uttryck. Se detta[regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)och[Regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). I synnerhet måste du veta om fångstgrupper (Något inom parentes) och "eller" symbolen "|".
Tillsammans kan du ange ett antal alternativ, t.ex. (option1|option2|option3) .
Alla alternativ kan också vara ingenting, t.ex. (|option2|option3) .
Du måste också veta att fångstgrupper kan kapas, dvs. alla alternativ i en fångstgrupp kan innehålla en annan fångstgrupp, t.ex., (|option2 (|option2 B|option2c) |option3) som säger att option2 kan följas av ingenting, eller option2b eller option2c.
För pathRegexes kommer varje alternativ att vara ett mappnamn följt av en /, t.ex. bar / .
    
Den svåra delen av vägenRegex är: NärERDDAP™Återkommande faller katalogen trädet, vägenRegex måste acceptera alla de vägar som den möter på väg till katalogen med data. Regex med kapslade fångstgrupper är ett bra sätt att hantera detta.
    
Ett exempel:
Anta att vi har följande katalogstruktur:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
och den angivna filenDirectory är /foo/bar/, och vi vill bara ha.ncfiler i D\\[0-9\\]&#123;4&#125;/a/ underkataloger.
Lösningen är att ställa in pathRegex till /foo/bar/ (|D D D D D\\[0-9\\]&#123;4&#125;/ (|a/) )   
Det säger:
Vägen måste börja med /foo/bar/
Det kan följas av ingenting eller D\\[0-9\\]&#123;4&#125;/
Det kan följas av ingenting eller en/
    
Ja, pathRegex kan vara otroligt svårt att formulera. Om du fastnar, fråga en dator programmerare (Det närmaste i den verkliga världen till en trollkarl som sprutar inkatationer?) eller skicka ett e-postmeddelande till Chris. John på noaa.gov.
    
### &lt;dataset & gt;{#dataset} 
* [Och [Gud] ** &lt;Dataset&gt; ** ] (#dataset) är en optional (men alltid används) tag inom en&lt;ErddapDatasets&gt; tagga indatasets.xml(om du inkluderar all information mellan&lt;dataset&gt; och&lt;/dataset&gt;) beskriver helt en dataset. Till exempel,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Det kan finnas ett antal dataset taggar i dindatasets.xmlfil.
Tre attribut visas i en&lt;Dataset&gt; tag:
     
    *    **Typ=" *en Typ* "** är en REQUIRED attribut inom en&lt;dataset&gt; tagga indatasets.xmlsom identifierar datasettypen (till exempel om det är enEDDGridGridded eller EDDTable/tabular dataset) och källan till data (till exempel en databas, filer eller en fjärrkontrollOPeNDAPServer server) . Se[ **Lista över datasettyper** ](#list-of-types-datasets).
         
#### Dataset Id{#datasetid} 
*   [ **datasetID=" *aDatasetID* "** ](#datasetid)är en REQUIRED attribut inom en&lt;dataset&gt; tagga som tilldelar en kort (vanligtvis&lt;15 tecken), unika, identifiera namn till en dataset.
    * ochdatasetIDs måste vara ett brev (A-Z, a-z) följt av ett antal A-Z, a-z, 0-9 och \\_ (men bäst om&lt;32 tecken totalt).
    * Dataset ID är känsliga, men skapar inte tvådatasetIDs som bara skiljer sig i övre/lowercase brev. Det kommer att orsaka problem på Windows-datorer (din och/eller en användares dator) .
    * Bästa praxis: Vi rekommenderar att du använder[kameler fall](https://en.wikipedia.org/wiki/CamelCase).
    * Bästa praxis: Vi rekommenderar att den första delen är en akronym eller förkortning av källinstitutets namn och den andra delen är en akronym eller förkortning av datamängdens namn. När det är möjligt skapar vi ett namn som återspeglar källans namn för datamängden. Till exempel använde vidatasetID="erdPHssta8day för en dataset frånNOAA NMFS SWFSCMiljöforskningsavdelning (ERD) som utsetts av källan för att vara satellit/PH/sstA/8day.
    * Om du ändrar en dataset namn, den gamla dataset (med det gamla namnet) kommer fortfarande att leva iERDDAP. Detta är en "föräldralös" dataset, eftersom specifikationen för den idatasets.xmlär nu borta. Detta måste behandlas:
        1. FörERDDAP™v2.19 och senare behöver du inte göra någonting.ERDDAP™kommer automatiskt att ta bort dessa föräldralösa datamängder.
        2. FörERDDAP™v2.18 och tidigare måste du göra något för att ta bort föräldralösa datamängder: Gör en aktiv = "falsk" dataset, t.ex.
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Efter nästa stora belastning Dataset, Du kan ta bort den taggen efter att den gamla datamängden är inaktiv.
                 
#### aktiv aktiv aktiv aktiv{#active} 
*   [ **aktiv=" *Boolean* "** ](#active)är en OPTIONAL attribut inom en&lt;dataset&gt; tagga indatasets.xmlsom indikerar om en dataset är aktiv (Berättigande för användning iERDDAP) eller inte.
    * Giltiga värden är sanna (Default) och falsk.
    * Eftersom standarden är sant behöver du inte använda detta attribut förrän du vill tillfälligt eller permanent ta bort denna datamängd frånERDDAP.
    * Om du bara tar bort en aktiv = "sanna" datamängd fråndatasets.xmldatamängden kommer fortfarande att vara aktiv iERDDAP™Men kommer aldrig att uppdateras. En sådan datamängd kommer att vara en "föräldralös" och kommer att listas som sådan på status. html webbsida strax under listan över datamängder som misslyckades med att ladda.
    * Om du ställer in aktivt = "falskt",ERDDAP™inaktivera datamängden nästa gång den försöker uppdatera datamängden. När du gör detta,ERDDAP™slänger inte ut någon information som den kan ha lagrat om datamängden och gör verkligen ingenting för de faktiska uppgifterna.
    * För att ta bort en dataset frånERDDAP™Se, se[Force Dataset borttagning](/docs/server-admin/additional-information#removing-datasets).
         

 ** Flera taggar kan visas mellan&lt;dataset&gt; och&lt;/dataset&gt; taggar. **   
Det finns viss variation där taggar är tillåtna av vilka typer av datamängder. Se dokumentationen för en specifik[Typ av dataset](#list-of-types-datasets)för detaljer.

#### &lt;tillgänglig tillgänglig Till & gt;{#accessibleto} 
* [Och [Gud] ** &lt;tillgänglig tillgänglig Till&gt; ** ] (#accessibleto) är en optisk tag inom en&lt;dataset&gt; tag som anger en komma-separerad lista över[roller](#user)som tillåts ha tillgång till denna dataset. Till exempel,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Detta är en del avERDDAP"S[Säkerhetssystem](/docs/server-admin/additional-information#security)för att begränsa åtkomsten till vissa datamängder till vissa användare.
    * Om denna tagg inte är närvarande, alla användare (även om de inte har loggat in) kommer att ha tillgång till denna dataset.
    * Om denna tagg är närvarande kommer denna dataset endast att vara synlig och tillgänglig för inloggade användare som har en av de angivna rollerna. Denna dataset kommer inte att vara synlig för användare som inte är inloggade.
    * Varje användare som loggar in får automatiskt rollen\\[NågonLogged Inom\\]Om det finns en&lt;Användare&gt; tagga för dem idatasets.xmleller inte. Så om en viss dataset har
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
Då kommer alla användare som är inloggade att tillåtas att komma åt den datamängden, även om det inte finns någon&lt;Användare&gt; tagga för dem idatasets.xml.
         
#### &lt;graferAccessibleTo & gt;{#graphsaccessibleto} 
* [Och [Gud] ** &lt;graferAccessibleTo&gt; ** ] (#graphsaccessibleto) är en optisk tag inom en&lt;dataset&gt; tagga indatasets.xmlsom avgör om grafik och metadata för datamängden är tillgängliga för allmänheten. Det erbjuder ett sätt att delvis åsidosätta datasetets [&lt;tillgänglig för&gt;] (#accessibleto) Inställning. De tillåtna värdena är:
    * auto- Detta värde (eller frånvaron av en&lt;graphsAccessibleTo&gt; taggen för dataset) gör åtkomst till grafer och metadata från dataset efterliknar datasetets&lt;tillgänglig för&gt; inställning.
Så om datamängden är privat kommer dess grafer och metadata att vara privata.
Och om datamängden är offentlig, kommer dess grafer och metadata att vara offentliga.
    * offentliga offentliga ----- Denna inställning gör datasetets grafer och metadata tillgängliga för alla, även användare som inte är inloggade, även om datasetet är annars privat eftersom det har en&lt;tillgänglig för&gt; tag.
         
#### &lt;tillgänglig tillgänglig ViaFiles & gt;{#accessibleviafiles} 
* [Och [Gud] ** &lt;tillgängligaViaFiles&gt; ** ] (#accessibleviafiles) är en optisk tag inom en&lt;dataset&gt; tagga indatasets.xmlFör[EDDGridAggregateExistingDimension](#eddgridaggregateexistingdimension),[EDDGridKopiera](#eddgridcopy),[EDDGridFrånEDDTable](#eddgridfromeddtable),[EDDGridFrånErddap](#eddfromerddap),[EDDGridFrånEtopo](#eddgridfrometopo),[EDDGridFrånFiles](#eddgridfromfiles)  (inklusive alla underklasser) ,[EDDGridSideBySide](#eddgridsidebyside),[EDDTableCopy](#eddtablecopy) [EDDTableFromErddap](#eddfromerddap),[EDDTableFrånEDDGrid](#eddtablefromeddgrid)och[EDDTableFromFiles](#eddtablefromfiles)  (inklusive alla underklasser) dataset. Det kan ha ett värde av sant eller falskt. Till exempel,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Om värdet är sant,ERDDAP™kommer att göra det så att användare kan bläddra och ladda ner datasetets källdatafiler viaERDDAP"S["files"Systemsystem](https://coastwatch.pfeg.noaa.gov/erddap/files/). Se"files"Systemets[dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)för mer information.
    
Standardvärdet för&lt;tillgängligaViaFiles&gt; Från&lt;DefaultAccessibleViaFiles&gt; in i[setup.xml](/docs/server-admin/deploy-install#setupxml). Det har ett standardvärde av falskt, men vi rekommenderar att du lägger till den taggen till din setup.xml med ett värde av sant.
    
Rekommendation - Vi rekommenderar att du gör alla relevanta datamängder tillgängliga via filsystemet genom att ange&lt;defaultAccessibleViaFiles&gt; till sant i setup.xml eftersom det finns en grupp användare för vilka detta är det föredragna sättet att få data. Bland andra skäl,"files"system gör det enkelt för användare att se vilka filer som är tillgängliga och när de senast ändrats, vilket gör det enkelt för en användare att behålla sin egen kopia av hela datamängden. Om du i allmänhet inte vill göra datamängder tillgängliga via filsystemet, ange&lt;DefaultAccessibleViaFiles &gt; till false. I båda fallen, bara använda&lt;tillgängligaViaFiles&gt; för de få datamängder som är undantag från den allmänna policy som fastställs av&lt;DefaultAccessibleViaFiles&gt; (till exempel när datamängden använder[.ncml](#ncml-files)filer, som inte är riktigt användbara för användare) .
     
#### &lt;tillgänglig tillgänglig ViaWMSoch gt;{#accessibleviawms} 
* [Och [Gud] ** &lt;tillgänglig tillgänglig ViaWMS&gt; &gt; &gt; &gt; &gt; ** ] (#accessibleviawms) är en optisk tag inom en&lt;dataset&gt; tagga indatasets.xmlför alla[EDDGrid](#eddgrid)underklasser. Det kan ha ett värde av sant (Default) eller falsk. Till exempel,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Om värdet är falskt,ERDDAP"SWMSServern kommer inte att vara tillgänglig för denna dataset. Detta används vanligen för datamängder som har några longitudvärden större än 180 (som tekniskt sett är ogiltigt förWMStjänster) , och för vilken du också erbjuder en variant av datamängden med longitudvärden helt i intervallet -180 till 180 via[EDDGridLonPM180](#eddgridlonpm180).
Om värdet är sant,ERDDAP™kommer att försöka göra dataset tillgängligt viaERDDAP"SWMSServer. Men om datamängden är helt olämplig förWMS  (t.ex. finns det inga longitud- eller latituddata) Då kommer datasetet inte att vara tillgängligt viaERDDAP"SWMSserver, oavsett denna inställning.
     
#### &lt;Lägg till tillägg Variables Var & gt;{#addvariableswhere} 
* [Och [Gud]&lt;addVariablesWhere&gt;] (#addvariables någonstans) är en optisk tag inom&lt;dataset&gt; tagga för alla EDDTable dataset.
    
Förfrågningar till någon EDDTable dataset kan inkludera &add Variables Var där (" *attribut Namnnamn* "," *attribut Värde* ") som sägerERDDAP™lägga till alla variabler i dataset där *attributeName=attributeValue* till förteckningen över begärda variabler. Till exempel, om en användare lägger till &add Variables Var där ("ioos\\_category"Wind") till en fråga,ERDDAPkommer att lägga till alla variabler i datamängden som har enioos\\_category=Vind attribut till listan över begärda variabler (Till exempel, windSpeed, windDirection, windGustSpeed) . *attribut Namnnamn* och *attribut Värde* är case-sensitive.
    
Inomdatasets.xmlom biten av dataset.xml för en dataset har
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
till exempel,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
Data Access Form (.html webbsida) för dataset kommer att innehålla en widget (för varje attributNam i komma-separerade listan) höger under listan över variabler som låter användare ange ett attributvärde. Om användaren väljer ett attributvärde för ett eller flera av attributnamnen läggs de till på begäran via &add Variables Var där (" *attribut Namnnamn* "," *attribut Värde* ") . Således denna tagg idatasets.xmllåter dig ange listan över attributnamn som kommer att visas på dataåtkomstformuläret för den datamängden och gör det enkelt för användare att lägga till &addVariables Där funktioner till begäran. och *attributeNamesCSV* Listan är case-sensitive.
    
#### &lt;höjdMetersPerSourceUnit & gt;{#altitudemeterspersourceunit} 
* [Och [Gud] ** &lt;höjdMetersPerSourceUnit ** ] (#altitudemeterspersourceunit) är en optisk tag inom&lt;dataset&gt; tagga i dataset. xxml för EDDTableFromSOSDataset (Bara&#33;) som specificerar ett nummer som multipliceras med källhöjden eller djupvärdena för att omvandla dem till höjdvärden (i meter över havet) . Till exempel,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Denna tagg måste användas om datamängdens vertikala axelvärden inte är mätare, positiv = upp. Annars är det praktiskt, eftersom standardvärdet är 1. Till exempel,
    * Om källan redan mäts i meter över havet, använd 1 (eller inte använda denna tagg, eftersom 1 är standardvärdet) .
    * Om källan mäts i meter under havsnivån, använd -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Om källan mäts i km över havet, använd 0,001.
         
#### &lt;DefaultDataQuery&gt;{#defaultdataquery} 
* [Och [Gud] ** &lt;DefaultDataQuery &gt; ** ] (#defaultdataquery) är en optisk tag inom en&lt;dataset&gt; tagga indatasets.xmlDet sägerERDDAP™att använda den angivna frågan (Den del av webbadressen efter "?") Om .html-filen Typ (Data Access Form) begärs utan fråga.
    * Du kommer förmodligen sällan behöva använda detta.
    * Du måste XML-koda (Inte procent-kod) standardfrågor eftersom de är i ett XML-dokument. Till exempel, och blir &amp; ,&lt;Blir&lt;&gt; blir &gt; .
    * Vänligen kontrollera ditt arbete. Det är lätt att göra ett misstag och inte få vad du vill.ERDDAP™kommer att försöka rensa upp dina fel - men lita inte på det, eftersom\\*Hur hur hur\\*Det rengörs upp kan förändras.
    * För griddap dataset, en vanlig användning av detta är att ange ett annat standarddjup eller höjd dimension värde (till exempel,\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]istället för\\[Sista sista\\]) .
Du bör alltid lista alla variabler, alltid använda samma dimensionsvärden för alla variabler och nästan alltid använda samma dimensionsvärden.\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\],\\[Sista sista\\]eller\\[0:last\\]för dimensionsvärdena.
Till exempel:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Förtabledapdatamängder, om du inte anger några begränsningar, kommer begäran att returnera hela datamängden, som kan vara opraktiskt stor, beroende på datamängden. Om du inte vill ange några begränsningar, snarare än att ha en tom&lt;DefaultDataQuery &gt; (vilket är detsamma som att inte ange en standard DataQuery) Du måste uttryckligen lista alla variabler du vill inkludera i standardDataQuery.
    * Förtabledapdatamängder, den vanligaste användningen av detta är att ange ett annat standardtidsintervall (i förhållande till max (Tid) Till exempel, &time&gt;=max (Tid) -1day, eller i förhållande till nu, till exempel, &time&gt;=now-1 dag) .
Kom ihåg att begära inga datavariabler är detsamma som att ange alla datavariabler, så vanligtvis kan du bara ange den nya tidsbegränsningen.
Till exempel:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
eller
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;DefaultGraphQuery&gt;{#defaultgraphquery} 
* [Och [Gud] ** &lt;DefaultGraphQuery &gt; ** ] (#defaultgraphquery) är en optisk tag inom en&lt;dataset&gt; tagga indatasets.xmlDet sägerERDDAP™att använda den angivna frågan (Den del av webbadressen efter "?") Om .graph-filen Typ (Gör en Graph Form) begärs utan fråga.
    * Du kommer förmodligen sällan behöva använda detta.
    * Du måste XML-koda (Inte procent-kod) standardfrågor eftersom de är i ett XML-dokument. Till exempel, och blir &amp; ,&lt;Blir&lt;&gt; blir &gt; .
    * Vänligen kontrollera ditt arbete. Det är lätt att göra ett misstag och inte få vad du vill.ERDDAP™kommer att försöka rensa upp dina fel - men lita inte på det, eftersom\\*Hur hur hur\\*Det rengörs upp kan förändras.
    * För griddap dataset är den vanligaste användningen av detta att ange ett annat standarddjup eller höjd dimension värde (till exempel,\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\]istället för\\[Sista sista\\]) och/eller specificera att en specifik variabel graferas.
I alla fall kommer du nästan alltid att använda\\[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\\],\\[Sista sista\\]eller\\[0:last\\]för dimensionsvärdena.
Till exempel:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (Men lägg allt på en linje) 
    * Förtabledapdatamängder, om du inte anger några begränsningar, kommer begäran att diagram hela datamängden, som kan ta lång tid, beroende på datamängden.
    * Förtabledapdatamängder, den vanligaste användningen av detta är att ange ett annat standardtidsintervall (i förhållande till max (Tid) Till exempel, &time&gt;=max (Tid) -1day, eller i förhållande till nu, till exempel, &time&gt;=now-1 dag) .
Kom ihåg att begära inga datavariabler är detsamma som att ange alla datavariabler, så vanligtvis kan du bara ange den nya tidsbegränsningen.
Till exempel:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
eller
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensionValuesInMemory & gt;{#dimensionvaluesinmemory} 
* [Och [Gud] ** &lt;dimension dimension dimension dimension dimension dimension dimension dimension dimension dimension dimension dimension dimension ValuesInMemory &gt; ** ] (#Dimensionvaluesinmemory)   (sanning sant (Default) eller falskt) är en OPTIONAL och sällan används tag inom&lt;dataset&gt; tagga för allaEDDGridDataset som berättarERDDAP™var att hålla källvärdena för dimensionerna (även känd somaxisVariables) Från:
    
    * sant = i minnet (som är snabbare men använder mer minne) 
    * falsk = på disk (som är långsammare men inte använder något minne) 
    
Till exempel,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Du bör endast använda detta med icke-standardvärdet av falskt om dittERDDAP™har många datamängder med mycket stora dimensioner (t.ex. miljoner värderingar, t.ex.EDDGridFromAudioFiles dataset) ochERDDAPAnvända minnesanvändning är alltid för hög. Se minnet: för närvarande använder linje på\\[Din Domain\\]/erddap/status.htmlför att övervakaERDDAP™minnesanvändning.
     
#### &lt;filTableInMemory & gt;{#filetableinmemory} 
* [Och [Gud] ** &lt;filTableInMemory &gt; ** ] (#filetableinmemory)   (sant eller falskt (Default) ) är en optisk tag inom&lt;dataset&gt; tagga för allaEDDGridFromFiles och EDDTable FromFiles dataset som berättarERDDAP™var att hålla filenTable (som har information om varje källdatafil) Från:
    
    * sant = i minnet (som är snabbare men använder mer minne) 
    * falsk = på disk (som är långsammare men inte använder något minne) 
    
Till exempel,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Om du ställer in detta till sant för alla datamängder, håll ett öga på minnet: för närvarande använder linje på\\[Din Domain\\]/erddap/status.htmlsäkerställa attERDDAP™har fortfarande gott om fri minne.
     
#### &lt;fgdcFile & gt;{#fgdcfile} 
* [Och [Gud] ** &lt;fgdcFile &gt; ** ] (#fgdcfile) är en optisk tag inom en&lt;dataset&gt; tagga indatasets.xmlDet sägerERDDAP™att använda en pre-made FGDC-fil istället för att haERDDAP™Försök att generera filen. Användning:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *Fullständig Filename* kan hänvisa till en lokal fil (någonstans på serverns filsystem) eller URL för en fjärrfil.
Om *Fullständig Filename* "" eller filen inte hittas, datamängden kommer inte att ha någon FGDC metadata. Så detta är också användbart om du vill undertrycka FGDC-metadata för en viss datamängd.
Eller du kan sätta&lt;FgdcActive &gt; False&lt;/fgdcActive&gt; i setup.xml för att berättaERDDAP™inte erbjuda FGDC metadata för någon dataset.
     
#### &lt;iso19115 File&gt;{#iso19115file} 
* [Och [Gud] ** &lt;iso19115File ** ] (#iso19115file) är en optisk tag inom en&lt;dataset&gt; tagga indatasets.xmlDet sägerERDDAP™att använda en färdig ISO 19115-fil istället för att haERDDAP™Försök att generera filen. Användning:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *Fullständig Filename* kan hänvisa till en lokal fil (någonstans på serverns filsystem) eller URL för en fjärrfil.
Om *Fullständig Filename* "" eller filen inte hittas, datamängden kommer inte att ha någon ISO 19115 metadata. Detta är också användbart om du vill undertrycka ISO 19115-metadata för en specifik datamängd.
Eller du kan sätta&lt;iso19115Aktiv &gt;falsk&lt;/iso19115Aktiv&gt; i setup.xml för att berättaERDDAP™inte erbjuda ISO 19115 metadata för dataset.
     
#### &lt;matchaxis NDigits & gt;{#matchaxisndigits} 
* [Och [Gud] ** &lt;matchAxisNDigits &gt; ** ] (#matchaxisndigits) är en optisk tag inom enEDDGrid &lt;Dataset&gt; tag förEDDGriddatamängder som är aggregationer, t.ex. aggregationer av filer. Varje gång datasetet laddas om,ERDDAP™kontrollerar att axelvärdena för varje del av aggregeringen är desamma. Provningens precision bestäms av provningen[matchaxisNDigits](#matchaxisndigits), som specificerar det totala antalet siffror som måste matcha när du testar dubbla precisionsaxelvärden, 0-18 (Default) . Vid testning av flytaxelvärden görs testet med matchAxisNDigits/2 siffror. Ett värde på 18 eller högre berättarEDDGridatt göra ett exakt test. Ett värde på 0 berättarEDDGridinte göra någon testning, som inte rekommenderas, förutom som beskrivs nedan.
    
Även omEDDGridgör det möjligt för komponenterna i aggregeringen att ha något olika axelvärden, endast en uppsättning axelvärden visas för användaren. Setet är från samma komponent som ger datasetets källmetadata. Till exempel, förEDDGridFrånFiles dataset, som specificeras av&lt;metadataFrån &gt; inställning (Default=last) .
    
Användning av matchAxisNDigits 0 är starkt avskräckt i de flesta fall, eftersom det stänger av all kontroll. Även minimal kontroll är användbar eftersom det säkerställer att komponenterna är lämpliga för aggregering. Vi antar alla att alla komponenter är lämpliga, men det är inte alltid så. Detta är alltså ett viktigt sanitytest. Även värden av matchAxisNDigits1, 2, 3 eller 4 avskräcks eftersom de olika axelvärdena ofta indikerar att komponenterna skapades. (Binned?) ett annat sätt och är därför inte lämpliga för aggregation.
    
Det finns ett fall där du använder matchAxisNDigits 0 är användbart och rekommenderas: med aggregationer av fjärrfiler, t.ex. data i S3-hinkar. I detta fall, om datamängden använder cacheFromUrl, cacheSizeGB, matchAxisNDigits 0, ochEDDGridFrånFiles system för[Aggregation via Filnamn](#aggregation-via-file-names-or-global-metadata)SedanEDDGridbehöver inte läsa alla fjärrfiler för att göra aggregeringen. Detta möjliggör datamängder gjorda av data i S3-hinkarna för att ladda mycket snabbt (i motsats till absurt långsamt omEDDGridmåste ladda ner och läsa alla filer) .
    
#### &lt;nThreads & gt;{#nthreads} 
* Börja medERDDAP™version 2.00, när någon underklass av EDDTableFromFiles ellerEDDGridLäser data från källan, det kan läsa en bit data (t.ex. en källfil) i taget (i en tråd)   (Det är standarden) eller mer än en bit data (t.ex., 2+ källfiler) i taget (i 2 eller fler trådar) vid behandling av varje begäran.
     
    * Tumregel:
För de flesta datamängder på de flesta system, använd nThreads=1, standarden. Om du har en kraftfull dator (Många CPU-kärnor, massor av minne) överväga att ställa in nThreads till 2, 3, 4 eller högre (Men aldrig mer än antalet CPU kärnor i datorn) för dataset som kan gynna:
        
        * De flesta EDDTableFromFiles dataset kommer att gynnas.
        * Dataset där något orsakar en fördröjning innan en bit data faktiskt kan behandlas kommer att gynnas, till exempel:
            * Dataset med[externt komprimerad (t.ex.,.gz) ](#externally-compressed-files)Binära (t.ex.,.nc) filer, förERDDAP™måste dekomprimera hela filen innan den kan börja läsa filen.
            * Dataset som använder[CacheSizeGB](#cachefromurl)för attERDDAP™ofta måste ladda ner filen innan den kan läsa den.
            * Datamängder med datafiler som lagras på ett högbands parallellt filsystem, eftersom det kan leverera mer data, snabbare, när de begärs. Exempel på parallella filsystem inkluderar[JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures),[PNFS](http://www.pnfs.com/),[GlusterFS](https://en.wikipedia.org/wiki/Gluster)Amazon S3 och Google Cloud Storage.
                 
        
Varning: När du använder nThreads&gt;1, håll ett öga påERDDAPMinnesanvändning, trådanvändning och övergripande responsivitet (se[ERDDAPStatussidan](/docs/server-admin/additional-information#status-page)) . Se kommentarer om dessa frågor nedan.
         
    * För en viss dataset kan denna inställning av nThreads komma från olika platser:
        
        * Omdatasets.xmlchunk för en dataset har en&lt;nThreads&gt; tag (inom&lt;dataset&gt; tag, inte som ett globalt attribut) med ett värde &gt;= 1, det värdet av nThreads används. Så du kan ange ett annat nummer för varje dataset.
        * Annars, omdatasets.xmlhar en&lt;nTableThreads&gt; tagga (för EDDTable FrånFiles dataset) eller en&lt;nGridThreads&gt; tagga (FörEDDGridDataset) med ett värde &gt;= 1, utanför en&lt;dataset&gt; tag, det värdet av nThreads används.
        * Annars används en tråd, vilket är ett säkert val eftersom den använder minsta mängd minne.
             
        
För[original original originalERDDAP™installation](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Vi använder
        &lt;nTableThreads&gt; 6 6 6 6 6 6&lt;/nTableThreads&gt; (Det är en kraftfull server.) Svåra förfrågningar tar nu 30% av föregående tid.
         
##### Monitor Resursanvändning{#monitor-resource-usage} 
När du experimenterar med olika nThreads inställningar (och kanske göra svåra provförfrågningar till dinaERDDAP) Du kan övervaka datorns resursanvändning:
* På Mac-datorer, använd Finder: Applikationer: Verksamhetsmonitor
* På Linux, använd toppen
* På Windows 10, använd *Ctrl + Shift + Esc* öppna uppgiftshanterare
             
##### Varning: Minskad respons{#warning-decreased-responsiveness} 
I isolering,ERDDAP™kommer att uppfylla en begäran till en dataset med en högre nThreads inställning snabbare än om nThreads = 1. Men medan denna begäran behandlas kommer andra förfrågningar från andra användare att vara något trångt och få ett långsammare svar. När också närERDDAP™svarar på en viss begäran, andra datorresurser (t.ex. diskenhetsåtkomst, nätverksbandbredd) kan vara begränsande, särskilt med högre nThreads-inställningar. Således med högre nThreads-inställningar kommer det övergripande systemets lyhördhet att bli värre när det finns flera förfrågningar som behandlas - detta kan vara mycket irriterande för användarna&#33; På grund av detta: Ange aldrig nThreads till mer än antalet CPU-kärnor i datorn. nThreads=1 är den minsta inställningen eftersom varje begäran (flera samtidiga förfrågningar) kommer att få en lika stor del av datorresurser. Men ju mer kraftfulla datorn, desto mindre kommer detta att vara ett problem.
         
##### Varning: Högre minne Använd förEDDGridDataset{#warning-higher-memory-use-for-eddgrid-datasets} 
Minnesbruk medan bearbetningsförfrågningar är direkt proportionell mot inställningen nThreads. En rimligt säker tumregel är: du måste ställa in[ERDDAPMinnesinställningar](/docs/server-admin/deploy-install#memory)minst 2 GB + (2GB \\* nThreads) . Vissa förfrågningar till vissa datamängder behöver mer minne än så. Till exempel, ställa in nThreads = 3 för allaEDDGriddatamängd innebär att inställningen -Xmx ska vara minst -Xmx8000M. Om den minnesinställningen är större än 3/4 det fysiska minnet av datorn, minska nThreads-inställningen så att du kan minska minnesinställningen.

Minnesanvändningen av trådar bearbetningsförfrågningar till EDDTable datamängder är nästan alltid lägre eftersom filerna vanligtvis är mycket mindre. Men om en viss EDDTable dataset har stor (t.ex. &gt;=1 GB) datafiler, sedan kommentarerna ovan gäller även dessa datamängder.

Oavsett inställningen nThreads, håll ett öga på minnesanvändningsstatistiken på din[ERDDAPStatussidan](/docs/server-admin/additional-information#status-page). Du bör aldrig komma nära att maximera minnesanvändningen iERDDAP; annars kommer det att finnas allvarliga fel och fel.
        
##### Tillfälligt inställd på 1{#temporarily-set-to-1} 
Om nuvarande minnesanvändning är lite hög,ERDDAP™kommer att ange nThreads för denna begäran till 1. Således,ERDDAP™bevarar minnet när minnet är knappt.
         
##### Diminishing Returns{#diminishing-returns} 
Det finns minskande avkastning för att öka nThreads-inställningen: 2 trådar kommer att bli mycket bättre än 1 (Om vi ignorerar dynamisk överklockning) . Men 3 blir bara en bit bättre än 2. Och 4 kommer bara att vara marginellt bättre än 3.

I ett test av en svår fråga till en stor EDDTable dataset var svarstiden med 1, 2, 3, 4, 5, 6 trådar 38, 36, 20, 18, 13, 11 sekunder. (Vi använder nu nTableThreads=6 på den servern.) 

nThreads=2: Även om det ofta finns en betydande fördel att ange nThreads = 2 istället för nThreads = 1, kommer det ofta inte att göra stor skillnad i den klocktid som behövs för att svara på en viss användares begäran. Anledningen är: med nThreads=1, kommer de flesta moderna CPU ofta[dynamiskt överklocka](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (Turbo boost) att tillfälligt öka klockhastigheten för CPU. Således med nThreads = 1, kommer den ena kärnan ofta att arbeta med en högre klockhastighet än var och en av de två kärnorna om du använde nThreads = 2. Oavsett tror vi fortfarande att det är bättre att använda nThreads = 2 snarare än nThreads = 1, eftersom den inställningen kommer att ge bättre resultat i en bredare variation av situationer. Och naturligtvis, om din dator har tillräckliga CPU kärnor, en ännu högre nThreads inställning bör ge bättre resultat.

Som diskuterats ovan kan mycket höga nThreads-inställningar leda till snabbare svar på vissa förfrågningar, men risken för totalt minskadERDDAP™respons och hög minnesanvändning (som anges ovan) Medan dessa förfrågningar behandlas betyder det i allmänhet inte en bra idé.
        
##### CPU Cores{#cpu-cores} 
Du bör aldrig ställa in nThreads till ett nummer större än antalet CPU-kärnor i datorns CPU. I huvudsak alla moderna CPU har flera kärnor (t.ex. 2, 4 eller 8) . Vissa datorer har även flera CPU (t.ex. 2 CPUs \\* 4 cores/CPU = 8 CPU-kärnor) . För att ta reda på hur många CPU och kärnor en dator har:

* På Mac, använd *Alternativ nyckel* Apple Menu : Systeminformation
* På Linux, använd katt /proc/cpuinfo
* På Windows 10, använd *Ctrl + Shift + Esc* att öppna Task Manager: Prestanda (Logiska processorer visar det totala antalet CPU kärnor) 

Ja, de flesta processorer idag säger att de stöder 2 trådar per kärna (via via via[hyper-threading](https://en.wikipedia.org/wiki/Hyper-threading)) , men de två trådarna delar datorresurser, så du kommer inte att se två gånger genomströmningen på en CPU under tung belastning. Till exempel kan en dator med en CPU med 4 kärnor hävda att du stöder upp till 8 trådar, men du bör aldrig överstiga nThreads = 4 i det.ERDDAP. Kom ihåg det:

* nThreads inställningen iERDDAP™är per begäran.ERDDAP™hanterar ofta flera förfrågningar samtidigt.
*   ERDDAP™gör andra saker än processförfrågningar, t.ex. reload dataset.
* När närERDDAP™svarar på en viss begäran, andra datorresurser (t.ex. diskenhetsåtkomst, nätverksbandbredd) kan vara begränsande. Ju högre du sätter nThreads, desto mer sannolikt kommer dessa andra resurser att maxas ut och kommer att sakta ner.ERDDAPAllmän respons.
* Operativsystemet gör andra saker än att köraERDDAP.

Så det är bäst att inte ställa in nThreads-inställningen till mer än antalet kärnor i datorns CPU.
         
##### Din körsträcka maj Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
Resultaten av olika nThreads-inställningar varierar kraftigt för olika förfrågningar till olika datamängder på olika system. Om du verkligen vill veta effekten av olika nThreads inställningar, kör realistiska tester.
         
##### Varför nThreads per begäran?{#why-nthreads-per-request} 
Jag kan höra några av er tänka "Varför är nThreads per förfrågan? Om jag kodade detta, skulle jag använda en permanent arbetartråd pool och en meddelandekö för bättre prestanda. Problemet med att använda en arbetartrådspool och en meddelandekö är att en svår begäran skulle översvämma köen med många långsamma uppgifter. Det skulle effektivt blockeraERDDAP™från att ens påbörja arbetet med uppgifter relaterade till andra förfrågningar till dess att den ursprungliga begäran var (väsentligen) färdig. Således skulle även enkla efterföljande förfrågningar reagera långsamt.ERDDAP"S användning av nThreads per begäran leder till en mycket rättvisare användning av datorresurser.
         
##### nThreads vs. Flera arbetsdatorer{#nthreads-vs-multiple-worker-computers} 
Tyvärr,ERDDAPnThreads-systemet kommer aldrig att vara lika effektivt som sant parallelliserande via flera arbetsdatorer, med varje arbetar på en bit data, på det sätt som Hadoop eller Apache Spark vanligtvis används. När uppgiften verkligen är parallelliserad/distribuerad till flera datorer kan varje dator använda alla sina resurser på sin del av uppgiften. MedERDDAPs nThreads system, var och en av trådarna tävlar om samma dator bandbredd, diskenheter, minne etc. Tyvärr har de flesta av oss inte resurser eller medel för att ställa in eller ens hyra. (på Amazon Web Services (AWS) eller Google Cloud Platform (GCP) ) massiva nät av datorer. Till skillnad från en relationsdatabas som tillåts returnera resultatraderna i någon ordning,ERDDAP™gör ett löfte om att returnera resultatraderna i en konsekvent ordning. Denna begränsning görERDDAPnThreads implementering mindre effektiv. MenERDDAPnThreads är användbart i många fall.

Men det finns sätt att göraERDDAP™skala för att hantera ett stort antal förfrågningar snabbt genom att inrätta en[nät/kluster/federation avERDDAPs](/docs/server-admin/scaling).
         
#### &lt;paletter & gt;{#palettes} 
* Börja medERDDAP™version 2.12,datasets.xmlkan inkludera en&lt;Paletter &gt; tag (inom&lt;erddapDatasets&gt;) som åsidosätter&lt;Palettes&gt; tag value from messages.xml (eller återgå till meddelandena.xml värde om taggen idatasets.xmlär tom) . Detta låter dig ändra listan över tillgängliga paletter medanERDDAP™är igång. Det låter dig också göra en förändring och få den kvarstå när du installerar en ny version avERDDAP.
VARNING: Paletterna listade idatasets.xmlmåste vara en superset av de paletter som anges i meddelanden.xml; annarsERDDAP™kommer att kasta ett undantag och sluta bearbetningdatasets.xml. Detta säkerställer att alltERDDAP™installationer stöder åtminstone samma kärnpaletter.
Varning:ERDDAP™kontrollerar att paletter filer som anges i meddelanden.xml faktiskt finns, men det kontrollerar inte palettfiler som anges idatasets.xml. Det är ditt ansvar att se till att filerna är närvarande.
    
Börjar också medERDDAP™version 2.12, om du gör en cptfil underkatalog iERDDAP™innehållskatalog,ERDDAP™kopiera alla \\*.cpt-filer i den katalogen i\\[Tomcat\\]/webapps/erddap/WEB-INF/cptfiles katalog varje gångERDDAP™Börjar upp. Således, om du lägger anpassade cpt-filer i den katalogen, kommer dessa filer att användas avERDDAP™utan extra ansträngning från din sida, även när du installerar en ny version avERDDAP.
    
VARNING: Om du lägger till anpassade paletter till dinERDDAP™och du harEDDGridFromErddap och/eller EDDTableFromErddap dataset i dinaERDDAP™Användare kommer att se dina anpassade palettalternativ påERDDAP™Gör en Graph-webbsidor, men om användaren försöker använda dem får de en graf med standarden (Vanligtvis Rainbow) palett. Detta beror på att bilden är gjord av fjärrkontrollenERDDAP™som inte har den anpassade paletten. De enda lösningarna nu är att maila fjärrkontrollenERDDAP™administratör för att lägga till dina anpassade paletter till hans / hennesERDDAPeller e-post Chris. John på noaa.gov att be att paletterna läggs till standardenERDDAP™distribution.
    
#### &lt;onChange & gt;{#onchange} 
* [Och [Gud] ** &lt;OnChange &gt; ** ] (#Ochange) är en optisk tag inom en&lt;dataset&gt; tagga indatasets.xmlsom anger en åtgärd som kommer att göras när denna dataset skapas (När närERDDAP™Återstartas) och när denna dataset ändras på något sätt.
    * För närvarande, förEDDGridsubklasser, någon förändring av metadata eller till en axelvariabel (Till exempel en ny tidspunkt för nära realtidsdata) anses vara en förändring, men en omlastning av datamängden anses inte vara en förändring. (av sig själv) .
    * För närvarande, för EDDTable-underklasser, anses varje omlastning av datamängden vara en förändring.
    * För närvarande är endast två typer av åtgärder tillåtna:
        * " http://" eller " https://" ----- Om åtgärden börjar med " http://" eller " https://" ,ERDDAP™Skicka enHTTP GETBegäran till den angivna webbadressen. Svaret ignoreras. Till exempel kan webbadressen berätta för någon annan webbtjänst att göra något.
            * Om webbadressen har en fråga (efter "?") Det måste vara redan[procent kodade](https://en.wikipedia.org/wiki/Percent-encoding). Du måste koda speciella tecken i begränsningarna (annat än den första "&" och huvud'='i begränsningar) i formuläret % HH, där HH är karaktärens 2-siffriga hexadecimalvärde. Vanligtvis behöver du bara konvertera några av skiljetecknen: % till %25 och till %26, ”i %22,&lt;i %3C, = %3D, &gt; till %3E, + till %2B,|i %7C,\\[i %5B,\\]i %5D, utrymme till %20 och omvandla alla tecken över #127 till deras UTF-8-formulär och sedan koda varje byte av UTF-8-formuläret till %HH-formatet (fråga en programmerare om hjälp) .
Till exempel, ochstationID&gt;="41004"
Blir &stationID%3E= %2241004 %22
Procentkodning krävs vanligtvis när du får tillgång tillERDDAPvia annan programvara än en webbläsare. Webbläsare hanterar vanligtvis procent kodning för dig.
I vissa situationer måste du procent koda alla andra tecken än A-Za-z0-9\\_-&#33; " () \\*, men fortfarande inte kodar den ursprungliga "&" eller huvud'='i begränsningar.
Programspråk har verktyg för att göra detta (till exempel seJava"S[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)ochJavaSkriften ärencodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) och det finns
                [webbplatser som procent kodar/avkodar för dig](https://www.url-encode-decode.com/).
            * Sedan dessdatasets.xmlär en XML-fil, du måste också &-kod ALL '&',&lt;"och"&gt; i webbadressen som "&amp;", "&lt;"och" & gt; "efter procent kodning.
            * Exempel: För en URL som du kan skriva in i en webbläsare som:
                 https://www.company.com/webService?department=R%26D&param2=value2   
Du bör ange en&lt;onChange &gt; tag via (på en linje) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto: ----- Om åtgärden börjar med "mailto:",ERDDAP™kommer att skicka ett e-postmeddelande till den efterföljande e-postadress som indikerar att datamängden har uppdaterats/förändrats.
Till exempel:&lt;onChange&gt;mailto:john.smith@company.com&lt;/onChange&gt; Om du har en bra anledning tillERDDAP™för att stödja någon annan typ av åtgärd, skicka oss ett e-postmeddelande som beskriver vad du vill.
    * Den här taggen är praktisk. Det kan finnas så många av dessa taggar som du vill. Använd en av dessa taggar för varje åtgärd som ska utföras.
    * Detta är analogt medERDDAPe-post / URL-abonnemangssystem, men dessa åtgärder lagras inte ihållande (d.v.s. de lagras endast i ett EDD-objekt) .
    * För att ta bort ett abonnemang, ta bara bort&lt;onChange &gt; tag. Förändringen kommer att noteras nästa gång datamängden laddas om.
         
#### &lt;reloadEveryNMinutes & gt;{#reloadeverynminutes} 
* [Och [Gud] ** &lt;Reload EveryNMinutes &gt; ** ] (#reloadeveryn Minuter) är en optisk tag inom en&lt;dataset&gt; tagga indatasets.xmlav nästan alla datamängder som anger hur ofta datamängden ska laddas om. Till exempel,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Generellt datamängder som förändras ofta (Till exempel, få nya datafiler) bör laddas om ofta, till exempel var 60: e minut.
    * Datamängder som förändras sällan bör laddas in sällan, till exempel var 1440:e minut. (dagligen dagligen) eller 10080 minuter (Veckovis) .
    * Den här taggen är praktisk, men rekommenderas. Standarden är 10080.
    * Ett exempel är:&lt;ReloadEveryNMinutes &gt;1440&lt;/reload EveryNMinutes &gt;
    * När en dataset laddas om, alla filer i *bigParentDirectory* /cache/ *datasetID* Katalogen raderas.
    * Oavsett vad detta är inställt på, kommer en dataset inte att laddas oftare än&lt;loadDatasetsMinutes&gt; (Standard = 15) som anges i[setup.xml](/docs/server-admin/deploy-install#setupxml). Så om du vill att datamängder ska laddas mycket ofta måste du ställa in både reloadEveryNMinutes och loadDatasets Minuter till små värden.
    * Ställ inte reloadEveryNMinutes till samma värde som loadDatasets MinMinutes, eftersom den förflutna tiden sannolikt kommer att vara (till exempel) 14:58 eller 15:02, så datasetet kommer endast att laddas om i ungefär hälften av de stora reloads. Använd istället en mindre (Till exempel 10) eller större (Till exempel 20) Reload EveryNMinutes värde.
    * Oavsett reloadEveryNMinutes kan du manuellt berättaERDDAP™för att ladda om en specifik dataset så snart som möjligt via en[flagga fil](/docs/server-admin/additional-information#flag).
    * För nyfikna programmerare - InERDDAP™, omladdning av alla datamängder hanteras av två enstaka måltrådar. En tråd initierar en mindre reload om den hittar en flaggfil eller en stor reload (som kontrollerar alla datamängder för att se om de behöver laddas om) . Den andra tråden gör den faktiska reloaden av datamängden en i taget. Dessa trådar fungerar i bakgrunden så att alla datamängder hålls uppdaterade. Tråden som faktiskt gör reloads förbereder en ny version av en dataset sedan byter den på plats (ersätta den gamla versionen atomiskt) . Så det är mycket möjligt att följande händelsesekvens inträffar (Det är en bra sak) Från:
        
        1.  ERDDAP™Börjar ladda om en dataset (Gör en ny version) i bakgrunden.
        2. Användaren A gör en begäran till datasetet.ERDDAP™använder den aktuella versionen av dataset för att skapa svaret. (Det är bra. Det fanns ingen fördröjning för användaren, och den aktuella versionen av datamängden skulle aldrig vara mycket förföljd.) 
        3.  ERDDAP™slutar skapa den nya reloaded versionen av dataset och byter den nya versionen till produktion. Alla efterföljande nya förfrågningar hanteras av den nya versionen av datamängden. För konsekvens fylls användaren A:s begäran fortfarande av den ursprungliga versionen.
        4. Användare B gör en begäran till dataset ochERDDAP™använder den nya versionen av dataset för att skapa svaret.
        5. Så småningom slutförs användaren A och användar B:s begäran (Kanske kanske kanske A's finishes first, kanske B's finishes först) .
        
Jag kan höra någon säga: "Bara två trodda&#33; Ha&#33; Det är lame&#33; Han bör ställa upp det så att omladdning av datamängder använder så många trådar som behövs, så det blir gjort snabbare och med liten eller ingen fördröjning. Ja och nej. Problemet är att ladda mer än en dataset i taget skapar flera nya problem. Alla måste lösas eller hanteras. Det nuvarande systemet fungerar bra och har hanterbara problem (Till exempel, potential för lag innan en flagga märks) . (Om du behöver hjälp med att hantera dem, se vår[sektion om att få ytterligare stöd](/docs/intro#support).) Den relaterade[uppdatera EveryNMillis](#updateeverynmillis)system fungerar inom svarstrådar, så det kan och leder till att flera datamängder uppdateras (Inte full reload) Samtidigt.
##### Proaktiv vs. reaktiv{#proactive-vs-reactive} 
ERDDAP"S reload system är proaktiva - datamängder laddas snart efter deras reload EveryNMinutes tid är upp (d.v.s. de blir "stale", men aldrig mycket stale) om datamängden får förfrågningar från användare eller inte. SåERDDAP™datamängder är alltid aktuella och redo för användning. Detta är i motsats till THREDDS reaktiva tillvägagångssätt: en användares begäran är vad som berättar för TREDDDS att kontrollera om en datamängd är stale (Det kan vara mycket stale) . Om det är stale, TREDDS gör användaren vänta (ofta i några minuter) medan datasetet laddas om.
        
#### &lt;uppdatera EveryNMillis & gt;{#updateeverynmillis} 
* [Och [Gud] ** &lt;updateEveryNMillis &gt; ** ] (#updateeverynmillis) är en optisk tag inom en&lt;dataset&gt; tagga indatasets.xmlav vissa datasettyper som hjälperERDDAP™arbeta med datamängder som förändras mycket ofta (så ofta som ungefär varje sekund) . Till skillnad frånERDDAPRegelbunden, proaktiv,&lt;Reload EveryNMinutes (#reloadeveryn Minuter) system för att helt ladda om varje datamängd, detta OPTIONAL-system är reaktivt (utlöses av en användarbegäran) snabbare eftersom det är stegvis (bara uppdatera den information som behöver uppdateras) . Till exempel, om en begäran till enEDDGridFromDap dataset förekommer mer än det angivna antalet millisekunder sedan den senaste uppdateringen.ERDDAP™kommer att se om det finns några nya värden till vänster (Först, vanligtvis"time") dimension och i så fall bara ladda ner de nya värdena innan du hanterar användarens begäran. Detta system är mycket bra på att hålla en snabbt föränderlig datamängd uppdaterad med minimala krav på datakällan, men till kostnaden för att något sakta ner behandlingen av vissa användarförfrågningar.
    * För att använda detta system, lägg till (till exempel) Från:
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
strax efter&lt;ReloadEveryNMinutes &gt; tag för dataset idatasets.xml. Antalet millisekunder som du anger kan vara så liten som 1 (säkerställa att datamängden alltid är uppdaterad) . Ett värde på 0 (Default) eller ett negativt nummer stänger av systemet.
    * På grund av sin inkrementella natur bör uppdateringar slutföras mycket snabbt, så användarna ska aldrig behöva vänta länge.
    * Om en andra databegäran kommer innan den tidigare uppdateringen har avslutats, kommer den andra begäran inte att utlösa en annan uppdatering.
    * Under hela dokumentationen kommer vi att försöka använda ordet "reload" för regelbundna, fullständiga datamängder och "uppdatering" för dessa nya stegvisa, partiella uppdateringar.
    * För teständamål trycks vissa diagnostiker till log.txt om [&lt;LogLevel&gt;] (#loglevel) in idatasets.xmlär inställd på "all".
    * Om du använder stegvisa uppdateringar och särskilt om den vänstra (Först först) Till exempel tid, axel är stor, du kanske vill ställa in&lt;ReloadEveryNMinutes &gt; till ett större antal (1440?) , så att uppdateringar gör det mesta av arbetet för att hålla datauppsättningen uppdaterad, och fulla reloader görs sällan.
    * Obs&#33;: Detta nya uppdateringssystem uppdaterar metadata (till exempel tidactual\\_rangeTid\\_coverage\\_end, ...) Men inte utlöser onChange (e-post eller touch URL) eller ändraRSSFeed (Kanske borde det...) .
    * För alla datamängder som använder underklasser av[EDDGridFrånFiles](#eddgridfromfiles)och[EDDTableFromFiles](#eddtablefromfiles)Från:
        *    **Varning:** när du lägger till en ny datafil till en dataset genom att kopiera den till katalogen somERDDAP™Titta på, det finns en fara somERDDAP™kommer att märka den delvis skrivna filen; försök att läsa den, men misslyckas eftersom filen är ofullständig; deklarera att filen är en "dålig" fil och ta bort den. (tillfälligt) från dataset.
För att undvika detta, vi **STRONGLY RECOMMEND** att du kopierar en ny fil i katalogen med ett tillfälligt namn (Till exempel 20150226.ncTmp) Det matchar inte datasetfilen NamnRegex (\\*\\************************************************************************************************************************************************************************************************************************************************************.nc) sedan byta namn på filen till rätt namn (Till exempel 20150226.nc) . Om du använder denna metod,ERDDAP™ignorerar den tillfälliga filen och märker endast den korrekt namngivna filen när den är klar och redo att användas.
        * Om du ändrar befintliga datafiler på plats (Till exempel för att lägga till en ny datapunkt) ,&lt;updateEveryNMillis&gt; fungerar bra om ändringarna visas atomiskt (i ett ögonblick) och filen är alltid en giltig fil. Till exempel tillåter netcdf-java-biblioteket tillägg till den obegränsade dimensionen av en "klassisk".ncv3-fil som ska göras atomiskt.
            &lt;updateEveryNMillis&gt; fungerar dåligt om filen är ogiltig medan ändringarna görs.
        *   &lt;updateEveryNMillis&gt; fungerar bra för datamängder där en eller några filer ändras på kort tid.
        *   &lt;updateEveryNMillis&gt; fungerar dåligt för datamängder där ett stort antal filer ändras på kort tid (om ändringarna inte visas atomiskt) . För dessa datamängder är det bättre att inte använda&lt;updateEveryNMillis&gt; och att ställa in en[flagga](/docs/server-admin/additional-information#set-dataset-flag)Att berättaERDDAP™för att ladda om dataset.
        *   &lt;updateEveryNMillis &gt; Uppdatera inte den information som är kopplad till [&lt;subsetVariables&gt;] (#subsetvariables) . Normalt är detta inte ett problem, eftersom detsubsetVariablesha information om saker som inte förändras mycket ofta (till exempel listan över stationsnamn, breddgrader och longituds) . OmsubsetVariablesDataändringar (till exempel när en ny station läggs till i datamängden) Kontakta sedan[Flagga URL](/docs/server-admin/additional-information#set-dataset-flag)för dataset att berättaERDDAP™för att ladda om dataset. Annars,ERDDAP™kommer inte att märka den nya subset Variabel information tills nästa gång datamängden laddas om (&lt;ReloadEveryNMinutes&gt;).
        * Vår generiska rekommendation är att använda:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * Trouble? På Linux-datorer, om du använder&lt;updateEveryNMillis &gt; medEDDGridFrånFiles eller EDDTableFromFiles-klasser kan du se ett problem där en dataset inte laddas (ibland eller konsekvent) Med felmeddelandet: "IOException: Användargränsen för inotify-instanser som nåtts eller för många öppna filer". Orsaken kan vara en bugg iJavasom orsakar att inotify instanser inte samlas in sopor. Detta problem undviks iERDDAP™v1.66 och högre. Den bästa lösningen är att byta den senaste versionen avERDDAP.
Om det inte löser problemet (det vill säga om du har ett riktigt stort antal datamängder med hjälp av&lt;updateEveryNMillis&gt;), du kan åtgärda detta problem genom att ringa:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Eller använd högre siffror om problemet kvarstår. Standarden för klockor är 8192. Standarden till exempel är 128.
    * Du kan sätta&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; in idatasets.xml  (med de andra inställningarna nära toppen) ändra det maximala antalet filändringar (Standard=10) Det kommer att behandlas av uppdateringenEveryNMillis-systemet. Ett större antal kan vara användbart för dataset där det är mycket viktigt att de hålls alltid uppdaterade. Se[updateMaxEvents dokumentation](#updatemaxevents).
    * För nyfikna programmerare - dessa stegvisa uppdateringar, till skillnad frånERDDAPfull av[ReloadEveryNMinutes](#reloadeverynminutes)system, inträffa inom användarens begäran trådar. Så, ett antal datamängder kan uppdateras samtidigt. Det finns kod (och ett lås) för att säkerställa att endast en tråd arbetar med en uppdatering för en viss datamängd när som helst. Att tillåta flera samtidiga uppdateringar var lätt; att tillåta flera samtidiga fulla reloader skulle vara svårare.
         
#### &lt;sourceCanConstrainStringEQNE & gt;{#sourcecanconstrainstringeqne} 
* [Och [Gud] ** &lt;sourceCanConstrainStringEQNE ** ] (#sourcecanconstrainstringeqne) är en OPTIONAL tag inom en EDDTable&lt;dataset&gt; tagga indatasets.xmlDet specificerar om källan kan begränsa String-variablerna med = och &#33;=-operatörerna.
    * För EDDTableFromDapSequence gäller detta endast för yttre sekvens String variabler. Det antas att källan inte kan hantera några begränsningar på inre sekvensvariabler.
    * Den här taggen är praktisk. Giltiga värden är sanna (Default) och falsk.
    * För EDDTableFromDapSequenceOPeNDAPDRDS-servrar, detta bör vara sant (Default) .
    * För EDDTableFromDapSequence Dapper servrar, detta bör ställas in på falskt.
    * Ett exempel är:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sourceCanConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* [Och [Gud] ** &lt;sourceCanConstrainStringGTLT&gt; ** ] (#sourcecanconstrainstringgtlt) är en OPTIONAL tag inom en EDDTable&lt;dataset&gt; taggen som anger om källan kan begränsa strängvariabler med&lt;,&lt;=, &gt;, och &gt;= operatorer.
    * För EDDTableFromDapSequence gäller detta endast för yttre sekvens String variabler. Det antas att källan inte kan hantera några begränsningar på inre sekvensvariabler.
    * Giltiga värden är sanna (Default) och falsk.
    * Den här taggen är praktisk. Standarden är sann.
    * För EDDTableFromDapSequenceOPeNDAPDRDS-servrar, detta bör vara sant (Default) .
    * För EDDTableFromDapSequence Dapper servrar, detta bör ställas in på falskt.
    * Ett exempel är:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;sourceCanConstrainStringRegex & gt;{#sourcecanconstrainstringregex} 
* [Och [Gud] ** &lt;sourceCanConstrainStringRegex ** ] (#sourcecanconstrainstringregex) är en OPTIONAL tag inom en EDDTable&lt;dataset&gt; taggen som anger om källan kan begränsa strängvariabler med regelbundna uttryck, och i så fall vad operatören är.
    * Giltiga värden är "" (ochDAPstandard) , "för" (felaktigt stöd av mångaDAPservrar) eller "" (ange att källan inte stöder vanliga uttryck) .
    * Den här taggen är praktisk. Standarden är "".
    * För EDDTableFromDapSequenceOPeNDAPDRDS servrar, detta bör ställas in på "" (Default) .
    * För EDDTableFromDapSequence Dapper servrar, detta bör ställas in till "" (Default) .
    * Ett exempel är:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sourceCanDoDistinct & gt;{#sourcecandodistinct} 
* [Och [Gud] ** &lt;KällaCanDoDistinct&gt; ** ] (#sourcecandodistinct) är en OPTIONAL tag inom en EDDTableFromDatabase&lt;dataset&gt; taggen som anger om källdatabasen ska hantera &distinct () begränsningar i användarfrågor.
    * Den här taggen är praktisk. Giltiga värden är inga (ERDDAP™hanterar distinkt; standarden) Partiell (Källan hanterar distinkt ochERDDAP™hanterar det igen) och ja (Källan hanterar distinkt) .
    * Om du använder nej ochERDDAP™rinner ur minnet när du hanterar distinkt, använd ja.
    * Om du använder ja och källdatabasen hanterar distinkt för långsamt, använd nej.
    * partiellt ger dig det värsta av båda: det är långsamt eftersom databashanteringen av distinkt är långsam och det kan komma ur minnet.ERDDAP.
    * Databaser tolkar DISTINCT som en begäran om unika resultatrader, medanERDDAP™tolkar det som en begäran om en sorterad lista över unika rader av resultat. Om du ställer in detta till partiellt eller ja,ERDDAP™automatiskt också berättar databasen för att sortera resultaten.
    * En liten skillnad i resultaten:
utan|partiellt,ERDDAP™kommer att sortera "" i början av resultaten (före non-" strängar) .
Med ja kan databasen (Postgres kommer) sortera "" i slutet av resultaten (efter non-" strängar) .
Jag kommer att gissa att detta också kommer att påverka sorteringen av korta ord jämfört med längre ord som börjar med korta ord. Till exempel,ERDDAP™kommer att sortera "Simon" före "Simons".
    * Ett exempel är:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sourceCanOrderBy&gt;{#sourcecanorderby} 
* [Och [Gud] ** &lt;källa CanOrderBy &gt; ** ] (#sourcecanorderby) är en OPTIONAL tag inom en EDDTableFromDatabase&lt;dataset&gt; tag som anger om källdatabasen ska hantera ochorderBy (......) begränsningar i användarfrågor.
    * Den här taggen är praktisk. Giltiga värden är inga (ERDDAP™HandtagorderBy (......) ; standard) Partiell (Källan hanterarorderByochERDDAP™hanterar det igen) och ja (Källan hanterarorderBy (......) ) .
    * Om du använder nej ochERDDAP™rinner ur minnet när man hanterarorderBy (......) Använd ja.
    * Om du använder ja och källdatabasen hanterarorderBy (......) För långsamt, använd nej.
    * Delvis ger dig det värsta av båda: det är långsamt eftersom databashanteringenorderBy (......) är långsamt och det kan komma ur minnetERDDAP.
    * En liten skillnad i resultaten:
utan|partiellt,ERDDAP™kommer att sortera "" i början av resultaten (före non-" strängar) .
Med ja kan databasen (Postgres kommer) sortera "" i slutet av resultaten (efter non-" strängar) .
Detta kan också påverka sorteringen av korta ord kontra längre ord som börjar med kort ord. Till exempel,ERDDAP™Kommer att sortera "Simon" innan "Simons", men jag är inte säker på hur en databas kommer att sortera dem.
    * Ett exempel är:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceNeedsExpandedFP\\_EQ & gt;{#sourceneedsexpandedfp_eq} 
* [Och [Gud] ** &lt;sourceNeedsExpandedFP\\_EQ&gt; ** ] (#sourceneedsexpandedfp_eq) är en OPTIONAL tag inom en EDDTable&lt;dataset&gt; tag som specificerar (sanning sant (Default) eller falskt) Om källan behöver hjälp med frågor med&lt;Numeriska Variable &gt;=&lt;floatingPointValue &gt; (och &#33;=, &gt;=,&lt;=). Till exempel,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * För vissa datakällor, numeriska frågor som involverar =, &#33;=,&lt;=, eller &gt;= kanske inte fungerar som önskat med flytande punktnummer. Till exempel kan en sökning efter longitud = 220.2 misslyckas om värdet lagras som 220.200000000001.
    * Detta problem uppstår eftersom flytande punktnummer är[inte representerade exakt inom datorer](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    * Om sourceNeedsExpandedFP\\_EQ är inställd på sant (Default) ,ERDDAP™ändrar de frågor som skickas till datakällan för att undvika detta problem. Det är alltid säkert och bra att lämna denna uppsättning till sant.
         
#### &lt;sourceUrloch gt;{#sourceurl} 
* [Och [Gud] ** &lt;sourceUrl&gt; &gt; &gt; &gt; &gt; ** ] (#sourceurl) är en vanlig tag inom en dataset global&lt;addAttributes&gt; tagga som anger webbadressen som är källan till data.
    * Ett exempel är:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (Men lägg allt på en linje) 
    * InomERDDAP™Alla datamängder kommer att ha ett "sourceUrlI de kombinerade globala attributen som visas för användarna.
    * För de flesta datasettyper är denna tagg REQUIRED. Se datasettypens beskrivning för att ta reda på om detta är REQUIRED eller inte.
    * För vissa dataset, separat&lt;sourceUrltag är inte tillåtet. Istället måste du ge en "sourceUrl"[Global attribut](#global-attributes)Vanligtvis i den globala \\&gt;addAttributes&lt;. Om det inte finns någon faktisk källa URL (till exempel om data lagras i lokala filer) Denna egenskap har ofta bara ett placeholder-värde, till exempel&lt;Att namn="namn"&gt; (lokala filer) &lt;/att&gt; .
    * För de flesta datamängder är detta basen för den URL som används för att begära data. Till exempel, förDAPservrar, detta är den webbadress som .dods, .das, .dds eller .html kan läggas till.
    * Sedan dessdatasets.xmlär en XML-fil, du måste också koda "&",&lt;"och"&gt; i webbadressen som "&amp;", "&lt;och "&gt".
    * För de flesta datasettyper,ERDDAP™lägger till originaletsourceUrl  ("localSourceUrl" i källkoden) till[globala attribut](#global-attributes)  (där det blir "publicSourceUrl" i källkoden) . När datakällan är lokala filer,ERDDAP™tilläggsourceUrl=" (lokala filer) "till de globala attributen som en säkerhetsåtgärd. När datakällan är en databas,ERDDAP™tilläggsourceUrl=" (källdatabas) "till de globala attributen som en säkerhetsåtgärd. Om några av dina datamängder använder icke-offentligasourceUrl"S (vanligtvis eftersom deras dator är i din DMZ eller på en lokal LAN) Du kan använda [&lt;konverteraToPublicSourceUrl&gt; (#converttopublicsourceurl) taggar för att ange hur man konverterar den lokalasourceUrls till allmänhetensourceUrls.
    * EttsourceUrlkan börja medhttp://,https://ftp:// och kanske andra prefix.httpsanslutningar läs och kontrollera källans digitala certifikat för att säkerställa att källan är vem de säger att de är. I sällsynta fall kan denna kontroll misslyckas med felet "javax.net.ssl.SSLProtocolException: handshake alert: unrecognized\\_name". Detta beror förmodligen på domännamnet på certifikatet som inte matchar domännamnet som du använder. Du kan och bör läsa detaljerna isourceUrlIntyg i din webbläsare, särskilt listan över "DNS-namn" i avsnittet "Subject Alternative Name".
        
I vissa fall,sourceUrldu använder kan vara ett alias av domännamnet på certifikatet. Till exempel,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ kasta detta fel, men
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , som använder domännamnet på certifikatet, kommer inte. Lösningen i dessa fall är därför att hitta och använda domännamnet på certifikatet. Om du inte hittar det på certifikatet, kontakta dataleverantören.
        
I andra fall kan domännamnet på certifikatet vara för en grupp namn. Om detta inträffar eller problemet är annars olösligt, vänligen mail Chris. John på noaa.gov för att rapportera problemet.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [Och [Gud] ** &lt;addAttributes&gt; &gt; &gt; &gt; &gt; ** ] (#addattributes) är en OPTIONAL-tagg för varje dataset och för varje variabel som låterERDDAPadministratörer kontrollerar metadataattributen i samband med en dataset och dess variabler.
    *   ERDDAP™kombinerar attributen från datasetets källa ("sourceAttributes") och "addAttributessom du definierar idatasets.xml  (som har prioritet) att göra "combinedAttributes", som är vadERDDAP™användare ser. Således kan du användaaddAttributesför att omdefiniera värdena av källaAttributes, lägga till nya attribut eller ta bort attribut.
    * och&lt;addAttributestag innehåller 0 eller mer ** &lt;Att&gt; ** subtags, som används för att specificera enskilda attribut.
    * Varje attribut består av ett namn och ett värde (som har en specifik datatyp, till exempel dubbel) .
    * Det kan bara finnas ett attribut med ett givet namn. Om det finns mer, har den sista prioritet.
    * Värdet kan vara ett enskilt värde eller en rymdseparerad lista över värden.
    * Syntax
        * Ordern för&lt;att&gt; deltagarna inomaddAttributesär inte viktigt.
        * och&lt;att&gt; subtag format är
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * destinationsnamnet på alla attribut måste börja med ett brev (A-Z, a-z) och MUST innehåller endast tecknen A-Z, a-z, 0-9 eller "\\_".
        * Om en&lt;att&gt; subtag har inget värde eller ett värde av null, det attributet kommer att tas bort från de kombinerade attributen.
Till exempel,&lt;Att namn="rows"/&gt; tar bort rader från de kombinerade attributen.
Till exempel,&lt;Att namn = "koordinater"&gt;null&lt;/att&gt; tar bort koordinater från de kombinerade attributen.
##### attribut Typ{#attributetype} 
* [Optionellt typvärde för&lt;att&gt; subtags] (#attributetype) anger datatypen för värdena. Standardtypen är String. Ett exempel på en sträng attribut är:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Giltiga typer för enstaka värden är byte (8-bitars heltal) Kort (16-bitars signerad integer) Int (32-bitars signerad heltal) Långt (64-bitars signerad heltal) Flyta (32-bitars flytande punkt) Dubbel (64-bitars flytande punkt) Char och String. Till exempel,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Se dessa anteckningar om[char data typ](#char).
Se dessa anteckningar om[lång datatyp](#long).
        
    * Giltiga typer för rymdseparerade listor med värden (eller enskilda värden) är byteList, shortList, unsignedShortList, charList, intList, longList, floatList, Double Lista. Till exempel,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
En unsignedShortList låter dig ange en lista över osignerade shorts, men de kommer att omvandlas till en lista över motsvarande Unicode-tecken (t.ex. "65 67 69" kommer att omvandlas till "A C E".
Om du anger en charList, koda några speciella tecken (t.ex. utrymme, dubbla citat, backslash,&lt;#32, eller&gt;#127) som du skulle koda dem i datasektionen av en NCCSV-fil (e.g., ", "\"" eller """, "dra", "\\n"U20ac") .
Det finns ingen stringList. Lagra String värden som en multi-line String. Till exempel,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Globala attribut{#global-attributes} 
* [Och [Gud] ** Globala attribut / Globala&lt;addAttributes&gt; &gt; &gt; &gt; &gt; ** ] (#global-attributes) -----
    &lt;addAttributes&gt; är en OPTIONAL tag inom&lt;dataset&gt; tagga som används för att ändra attribut som gäller för hela dataset.
    
    *    ** Använd den globala&lt;addAttributes&gt; ändra datasetets globala attribut. ** ERDDAP™kombinerar de globala attributen från datasetets källa (** sourceAttributes **) och den globala** addAttributes **som du definierar idatasets.xml  (som har prioritet) att göra världen** Förenade bidrag ** som är vadERDDAP™användare ser. Således kan du användaaddAttributesför att omdefiniera värdena av källaAttributes, lägga till nya attribut eller ta bort attribut.
    * och se [den] ** &lt;addAttributes&gt; &gt; &gt; &gt; &gt; **information] (#addattributes) som gäller för global och variabel** &lt;addAttributes&gt; &gt; &gt; &gt; &gt; ** .
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)och[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadata ----- Normalt,ERDDAP™genererar automatiskt ISO 19115-2/19139 och FGDC (FGDC-STD-001-1998) XML metadatafiler för varje dataset med hjälp av information från datasetets metadata. Så, **Bra dataset metadata leder till braERDDAP-genererad ISO 19115 och FGDC metadata. Tänk på att lägga mycket tid och ansträngning för att förbättra dina datamängders metadata (vilket är bra att göra ändå) .** De flesta av de dataset metadata attribut som används för att generera ISO 19115 och FGDC metadata är från[ACDD metadata standard](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)och är så noterade nedan.
    * Många globala attribut är speciella i attERDDAP™letar efter dem och använder dem på olika sätt. Till exempel en länk tillinfoUrlingår på webbsidor med listor över datamängder och andra platser, så att användarna kan ta reda på mer om datamängden.
    * När en användare väljer en delmängd av data, globalAttributer relaterade till variabelns longitud, latitud, höjd (eller djup) och tidsintervall (Till exempel, Southernmost\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) genereras eller uppdateras automatiskt.
    * Ett enkelt prov globalt&lt;addAttributes&gt; är:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Den tomma cwhdf\\_version attributet orsakar källan cwhdf\\_version attribut (Om någon) tas bort från den slutliga, kombinerade förteckningen över attribut.
    * Att tillhandahålla denna information hjälperERDDAP™Gör ett bättre jobb och hjälper användarna att förstå datamängden.
Bra metadata gör en dataset användbar.
Otillräcklig metadata gör en datamängd värdelös.
Ta dig tid att göra ett bra jobb med metadataattribut.
##### Speciella globala attribut iERDDAP™
###### Erkännande{#acknowledgement} 
*   [ **Erkännande** ](#acknowledgement)och **Erkännande**   (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är ett rekommenderat sätt att erkänna gruppen eller grupperna som gav stöd (Framför allt finansiellt) för projektet som skapade denna data. Till exempel,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Observera att ACDD 1.0 och 1.1 använde stavningen "acknowledgment" (som är den vanliga stavningen i USA) ACDD 1.3 ändrade detta till "bekräftelse" (som är den vanliga stavningen i Storbritannien.) . Min förståelse är att förändringen i huvudsak var en olycka och att de verkligen inte kände igen förändringens konsekvenser. Vilken röra&#33; Nu finns det miljontals datafiler runt om i världen som har "bekräftelse" och miljontals som har "bekräftelse". Detta belyser dårskapen av "enkla" förändringar i en standard och betonar behovet av stabilitet i standarder. För ACDD 1.3 (vilket är den version av ACDD somERDDAP™stöd) säger "bekräftelse", det är vadERDDAP™  (I synnerhet GenerateDatasets Xml) uppmuntrar.
     
###### cdm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*   [ **cdm\\_altitude\\_proxy** ](#cdm_altitude_proxy)är bara för EDDTable dataset som inte har en höjd eller djupvariabel men har en variabel som är en proxy för höjd eller djup (till exempel tryck, sigma, flaskNumber) Du kan använda detta attribut för att identifiera den där variabeln. Till exempel,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Om[cdm\\_data\\_type](#cdm_data_type)är Profil eller TrajectoryProfile och det finns ingen höjd eller djupvariabel, cdm\\_altitude\\_proxy MÅSTE definieras. Om cdm\\_altitude\\_proxy definieras,ERDDAP™lägg till följande metadata till variabeln: \\_Coordinate AxisType=Höjd och axel=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*   [ **cdm\\_data\\_type** ](#cdm_data_type)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är en global egenskap som indikerarUnidata [Vanlig datamodell](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)datatyp för dataset. Till exempel,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CDM utvecklas fortfarande och kan förändras igen.ERDDAP™uppfyller de relaterade och mer detaljerade[Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)kapitel i[CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatakonventioner (tidigare kallad CF Point Observation Conventions) .
    * Antingen datamängdens globala[sourceAttributes](#global-attributes)eller dess globala&lt;addAttributes&gt; &gt; &gt; &gt; &gt; MÅSTE inkludera attributet cdm\\_data\\_type. Några datasettyper (Som EDDTable FrånObis) Ställ in detta automatiskt.
    * FörEDDGriddatamängder, cdm\\_data\\_type-alternativen är Grid (standard och i särklass den vanligaste typen förEDDGridDataset) MovingGrid, Other, Point, Profile, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory och TrajectoryProfile. För närvarande,EDDGridkräver inte att någon relaterad metadata anges, inte heller kontrollerar den att datan matchar cdm\\_data\\_type. Det kommer förmodligen att förändras inom en snar framtid.
    * EDDTable använder cdm\\_data\\_type på ett strikt sätt, efter CF: s DSG-specifikation snarare än CDM, som av någon anledning inte har uppdaterats för att överensstämma med DSG. Om en dataset metadata inte uppfyllerERDDAPcdm\\_data\\_types krav (Se nedan) datamängden kommer att misslyckas med att ladda och kommer att generera en[felmeddelande](#troubleshooting-tips). (Det är en bra sak, i den meningen att felmeddelandet kommer att berätta vad som är fel så att du kan fixa det.) Och om datamängdens data inte matchar datamängdens metadatauppställning (t.ex. om det finns mer än ett latitudvärde för en viss station i en tidsseriedataset) Vissa förfrågningar om data kommer att returnera felaktiga data i svaret. Se till att du får allt detta rätt.
        
För alla dessa datamängder, i konventionerna ochMetadata\\_Conventionsglobala attribut, hänvisa till CF-1.6 (inte CF-1.0, 1.1, 1.2, 1.3, 1.4 eller 1.5) , eftersom CF-1.6 är den första versionen som inkluderar ändringarna i Discrete Sampling Geometry. (DSG) konventioner.
        *   **ERDDAP™har en inte enkel relation till CF DSG** 
        *   ERDDAP™kan göra en giltig DSG-dataset ur en källdataset som redan är en giltig DSG-fil (s) , eller av en källdatamängd som inte är inställd på DSG men kan göras så via ändringar av metadata (Några av dem ärERDDAP-specifik för att ge en mer allmän strategi för att specificera DSG-inställningen) .
        *   ERDDAP™Gör en hel del giltighetstest när den laddar en dataset. Om datamängden som har en cdm\\_data\\_type (ellerfeatureType) attribut framgångsrikt laster iERDDAP™SedanERDDAP™säger att datamängden uppfyller DSG-kraven (annars,ERDDAP™kommer att kasta ett undantag som förklarar det första problemet som det fann) .
VARNING: En framgångsrikt laddad dataset verkar uppfylla DSG-kraven (Den har rätt kombination av attribut) , men kan fortfarande vara felaktigt inrättade, vilket leder till felaktiga resultat.ncCF och.ncCFMA svarsfiler. (Programvara är smart på vissa sätt och clueless i andra.) 
        * När du tittar på datasetets metadata iERDDAP™DSG dataset verkar vara iERDDAP"S interna format (En jätte, databaslik tabell) . Det är inte i ett av DSG-formaten (Dimensioner och metadata är inte rätt) , men den information som behövs för att behandla datamängden som en DSG datamängd är i metadata (cdm\\_data\\_type=TimeSeries och cdm\\_timeseries\\_variables= *aCsvListOfStationRelatedVarables* i den globala metadata och cf\\_role=timeseries\\_id för någon variabel) .
        * Om en användare begär en delmängd av datamängden i en.ncCF (en.ncfil i DSG: s Contiguous Ragged Array filformat) eller.ncCFMA-fil (en.ncfil i DSG: s Multidimensional Array filformat) Den filen kommer att vara en giltig CF DSG-fil.
VARNING: Men om datamängden upprättades felaktigt (så att de löften som metadata gör inte är sanna) Därefter kommer svarsfilen att vara tekniskt giltig men kommer att vara felaktig på något sätt.
             
###### EDDTable cdm_data_types
* För EDDTable dataset, cdm\\_data\\_type alternativ (och relaterade krav iERDDAP) är
###### Point Point Point Point{#point} 
*   [Point Point Point Point](#point)- är för en uppsättning mätningar som vid orelaterade tider och platser.
    * Som med alla andra cdm\\_data\\_typer än andra har Point-datamängder MUST longitud, latitud och tidsvariabler.
###### Profil{#profile} 
*   [Profil](#profile)- är en uppsättning mätningar som tas på en gång, på en latitud longitud plats, men på mer än ett djup (eller höjd) . Datasetet kan vara en samling av dessa profiler, till exempel 7 profiler från olika platser. Denna cdm\\_data\\_type innebär inte någon logisk koppling mellan någon av profilerna.
    
* En av variablerna (Till exempel pro\\_number) MÅSTE ha den variabla attributet cf\\_role=profile\\_id för att identifiera den variabel som unikt identifierar profilerna.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Om ingen annan variabel är lämplig, överväga att använda tidsvariabeln.
###### cdm\\_profile\\_variables{#cdm_profile_variables} 
* Datamängden MUST inkluderar globalAttribute[cdm\\_profile\\_variables](#cdm_profile_variables)där värdet är en komma-separerad lista över de variabler som har information om varje profil. För en viss profil måste värdena på dessa variabler vara konstanta. Till exempel,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Listan MUST inkluderar cf\\_role=profile\\_id-variabeln och alla andra variabler med information om profilen och tiden, latitud och longitud.
Listan kommer aldrig att innehålla höjd, djup eller några observationsvariabler.
     

\\[Yttrande: cdm\\_data\\_type=Profil bör sällan användas. I praktiken är en viss dataset vanligtvis antingen en TimeSeriesProfile. (profiler på en fast position) eller en banorprofil (profiler längs en bana) Det bör därför identifieras som sådana.\\]  
###### TimeSeries{#timeseries} 
*   [TimeSeries](#timeseries)är en sekvens av mätningar (t.ex. havsvattentemperatur) tas på en, fast, latitud, longitud, djup (eller höjd) plats. (Tänk på det som "Station".) Datasetet kan vara en samling av dessa TimeSeries, till exempel en sekvens från var och en av tre olika platser.
    * En av variablerna (till exempel station\\_id) MUST har den variabla attributet cf\\_role=timeseries\\_id för att identifiera den variabel som unikt identifierar stationerna.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_variables{#cdm_timeseries_variables} 
* Datamängden MUST inkluderar globalAttribute[cdm\\_timeseries\\_variables](#cdm_timeseries_variables)där värdet är en komma-separerad lista över variablerna som har information om varje station. För en given station måste värdena på dessa variabler vara konstanta. Till exempel,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
Listan MUST inkluderar cf\\_role=timeseries\\_id-variabeln och alla andra variabler med information om stationen, som nästan alltid innehåller latitud och longitud. (och höjd eller djup, om det finns) .
Listan innehåller aldrig tid eller observationsvariabler.
* För vissa förtöjda bojar kan en dataset ha två uppsättningar latitud och longitud variabler:
    1. Ett par latitud och longitud värden som är konstanta (dvs. den fasta platsen för förtöjningen) . InomERDDAP™ge dessa variabler dedestinationNames latitud och longitud, och inkludera dessa variabler i listan över cdm\\_timeseries\\_variables.
    2. Precis latitud och longitudvärden i samband med varje observation. InomERDDAP™ge dessa variabler olikadestinationNames (Exakt och exakt Lon) Och inkludera inte dessa variabler i listan över cdm\\_timeseries\\_variables.
Anledningen till detta är: från ett teoretiskt perspektiv, för en DSG TimeSeries dataset, latitud och longitud. (och höjd eller djup, om det finns) plats för stationen måste vara konstant.
###### TimeSeriesProfil{#timeseriesprofile} 
*   [TimeSeriesProfil](#timeseriesprofile)- är för en sekvens av profiler som tas på en, fast, latitud longitud plats. Varje profil är en uppsättning mätningar som tas på flera höjder eller djup. Datasetet kan vara en samling av dessa TimeSeriesProfiles, till exempel en sekvens av profiler som tagits på var och en av 12 olika platser.
    * En av variablerna (till exempel station\\_id) MUST har den variabla attributet cf\\_role=timeseries\\_id för att identifiera den variabel som unikt identifierar stationerna.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * En av variablerna (Till exempel pro\\_number) MÅSTE ha den variabla attributet cf\\_role=profile\\_id för att identifiera den variabel som unikt identifierar profilerna.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (En given profil \\_id behöver bara vara unik för en viss tidsserie \\_id.) Om ingen annan variabel är lämplig, överväga att använda tidsvariabeln.
    * Datamängden MUST inkluderar de globalaAttribute cdm\\_timeseries\\_variables, där värdet är en komma-separerad lista över variablerna som har information om varje station. För en given station måste värdena på dessa variabler vara konstanta. Till exempel,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
Listan MUST inkluderar cf\\_role=timeseries\\_id variabel och alla andra variabler med information om stationen, som nästan alltid innehåller latitud och longitud.
Listan kommer aldrig att innehålla tid, höjd, djup eller observationsvariabler.
    * Datamängden MUST inkluderar de globalaAttribute cdm\\_profile\\_variables, där värdet är en komma-separerad lista över variablerna som har information om varje profil. För en viss profil måste värdena på dessa variabler vara konstanta. Till exempel,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
Listan MUST inkluderar cf\\_role=profile\\_id-variabeln och alla andra variabler med information om profilen, som nästan alltid innehåller tid.
Listan kommer aldrig att innehålla latitud, longitud, höjd, djup eller några observationsvariabler.
###### Trajektor{#trajectory} 
*   [Trajektor](#trajectory)är en sekvens av mätningar som tagits längs en bana (En väg genom rymden och tiden)   (t.ex. havsvatten temperatur som tas av ett fartyg när det rör sig genom vattnet) . Datasetet kan vara en samling av dessa banor, till exempel en sekvens från var och en av fyra olika fartyg.
    * En av variablerna (Till exempel, skepp \\_id) MÅSTE ha attributet cf\\_role=trajectory\\_id för att identifiera den variabel som unikt identifierar banorna.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectory\\_variables{#cdm_trajectory_variables} 
* Datamängden MUST inkluderar globalAttribute[cdm\\_trajectory\\_variables](#cdm_trajectory_variables)där värdet är en komma-separerad lista över variablerna som har information om varje bana. För en given bana måste värdena på dessa variabler vara konstanta. Till exempel,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Listan MUST inkluderar cf\\_role=trajectory\\_id-variabeln och alla andra variabler med information om banan.
Listan kommer aldrig att innehålla tid, latitud, longitud eller några observationsvariabler.
###### TrajectoryProfile{#trajectoryprofile} 
*   [TrajectoryProfile](#trajectoryprofile)- är en sekvens av profiler som tagits längs en bana. Datasetet kan vara en samling av dessa TrajectoryProfiler, till exempel en sekvens av profiler som tagits av 14 olika fartyg.
    * En av variablerna (Till exempel, skepp \\_id) MÅSTE ha den variabla attributet cf\\_role=trajectory\\_id för att identifiera den variabel som unikt identifierar banorna.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * En av variablerna (Till exempel pro\\_number) MÅSTE ha den variabla attributet cf\\_role=profile\\_id för att identifiera den variabel som unikt identifierar profilerna.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (En given profil \\_id måste bara vara unik för en viss bana \\_id.) Om ingen annan variabel är lämplig, överväga att använda tidsvariabeln.
    * Datamängden MUST inkluderar de globalaAttribute cdm\\_trajectory\\_variables, där värdet är en komma-separerad lista över variablerna som har information om varje bana. För en given bana måste värdena på dessa variabler vara konstanta. Till exempel,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Listan MUST inkluderar cf\\_role=trajectory\\_id-variabeln och alla andra variabler med information om banan.
Listan kommer aldrig att innehålla profilrelaterade variabler, tid, latitud, longitud eller några observationsvariabler.
    * Datamängden MUST inkluderar de globalaAttribute cdm\\_profile\\_variables, där värdet är en komma-separerad lista över variablerna som har information om varje profil. För en viss profil måste värdena på dessa variabler vara konstanta. Till exempel,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
Listan MUST inkluderar cf\\_role=profile\\_id-variabeln och alla andra variabler med information om profilen, som nästan alltid innehåller tid, latitud och longitud.
Listan kommer aldrig att innehålla höjd, djup eller några observationsvariabler.
###### Andra{#other} 
*   [Andra](#other)Har inga krav. Använd det om datamängden inte passar ett av de andra alternativen, särskilt om datamängden inte innehåller latitud, longitud och tidsvariabler.
     
###### Relaterade anteckningar{#related-notes} 
* Alla EDDTable dataset med en cdm\\_data\\_typ annat än "Övriga" MÅSTE ha longitud, latitud och tidsvariabler.
* Dataset med profiler måste ha en höjdvariabel, en djupvariabel eller en[cdm\\_altitude\\_proxy](#cdm_altitude_proxy)Variabel.
* Om du inte kan göra en dataset uppfyller alla krav för den ideala cdm\\_data\\_typen, använd "Point" (som har få krav) Eller "Andra" (som inte har några krav) I stället.
* Denna information används avERDDAP™på olika sätt, till exempel, men mestadels för att göra.ncCF filer (.ncfiler som uppfyller de sammanhängande Ragged Array-representationerna i samband med datasetets cdm\\_data\\_type) och.ncCFMA filer (.ncfiler som uppfyller Multidimensional Array Representations associerade med datasetets cdm\\_data\\_type) enligt definitionen i[Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)kapitel i[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatakonventioner, som tidigare kallades "CF Point Observation Conventions".
* Tips: För dessa datamängder, rätt inställning för[subsetVariables](#subsetvariables)är vanligtvis kombinationen av alla variabler som anges i cdm\\_...\\_variables attribut. Till exempel, för TimeSeriesProfile, använd cdm\\_timeseries\\_variables plus cdm\\_profile\\_variables.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det rekommenderade sättet att identifiera en person, organisation eller ett projekt som bidrog till denna dataset (Till exempel, den ursprungliga skaparen av data, innan den upparbetades av skaparen av denna dataset.) . Till exempel,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Om "bidragsgivare" inte verkligen gäller för en dataset, utelämna detta attribut. jämfört med[creator\\_name](#creator_name)Detta är ibland mer fokuserat på finansieringskällan.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det återkommande sättet att identifiera rollen som[contributor\\_name](#creator_name). Till exempel,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Om "bidragsgivare" inte verkligen gäller för en dataset, utelämna detta attribut.
###### Konventioner{#conventions} 
*   [ **Konventioner** ](#conventions)  (från[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata standard) är starkt återkallad. (Det kan vara REQUIRED i framtiden.) Värdet är en komma-separerad lista över metadatastandarder som denna dataset följer. Till exempel:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
De vanliga metadatakonventionerna som används iERDDAP™är:
    
    *   [COARDSKonventioner](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)är föregångaren till CF.
    *   [Klimat och prognos (CF) Konventioner](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)är källan till många av de rekommenderade och nödvändiga attributen iERDDAP. Den nuvarande versionen av CF identifieras som "CF-1.6".
    * ochNetCDFAttributkonvention för Dataset Discovery (ACDD) är källan till många av de rekommenderade och nödvändiga attributen iERDDAP. Den ursprungliga versionen av ACDD (Ett lysande verk av Ethan Davis) identifierades som[UnidataDataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)Den nuvarande (Från och med 2015) 1.3 version av ACDD identifieras som[ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). Om dina datamängder har använtsUnidataDataset Discovery v1.0, vi uppmuntrar dig att[byta dataset för att använda ACDD-1.3](#switch-to-acdd-13).
    
Om din dataset följer ytterligare metadatastandard, lägg till namnet på CSV-listan i attributet Konventioner.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (från[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)metadata standard) är det rekommenderade sättet att identifiera typen av rutnätsdata (in iEDDGridDataset) . Till exempel,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
De enda tillåtna värdena är auxiliaryInformation, bild, modellResult, fysisk Mätning (standard när ISO 19115 metadata genereras) , kvalitetInformation, referensInformation och tematiskKlassificering. (Använd inte denna tagg för EDDTable dataset.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det rekommenderade sättet att identifiera personen, organisationen eller projektet (om inte en specifik person eller organisation) mest ansvarig för skapelsen (eller senaste reprocessing) av dessa uppgifter. Till exempel,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Om uppgifterna omarbetades i stor utsträckning (till exempel satellitdata från nivå 2 till nivå 3 eller 4) , sedan brukar reprocessorn anges som skaparen och den ursprungliga skaparen är listad via[contributor\\_name](#contributor_name). jämfört med[Projektprojekt](#project)Detta är mer flexibelt eftersom det kan identifiera en person, en organisation eller ett projekt.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det rekommenderade sättet att identifiera en e-postadress (korrekt formaterad) Det ger ett sätt att kontakta skaparen. Till exempel,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det rekommenderade sättet att identifiera en URL för organisation som skapade datamängden eller en URL med skaparens information om denna datamängd (Men det är mer syftet med[infoUrl](#infourl)) . Till exempel,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det rekommenderade sättet att identifiera det datum då data först skapades (Till exempel behandlas i denna form) I ISO 8601-format. Till exempel,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Om data regelbundet läggs till i datamängden är detta det första datumet som originaldata gjordes tillgängligt.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det rekommenderade sättet att identifiera det datum då uppgifterna senast ändrades (till exempel när ett fel har fastställts eller när de senaste uppgifterna har lagts till) I ISO 8601-format. Till exempel,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det rekommenderade sättet att identifiera det datum då data först gjordes tillgängliga för andra, i ISO 8601-format, till exempel 2012-03-15. Till exempel,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Till exempel kan datasetet ha en[date\\_created](#date_created)2010-01-30, men gjordes endast offentligt tillgängliga 2010-07-30.date\\_issuedär mindre vanligt ändate\\_createdochdate\\_modified. Omdate\\_issuedutelämnas, det antas vara detsamma somdate\\_created.
###### Globalt globalt globalt globaltdrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)----- Detta är ett globalt attribut som används avERDDAP™  (och inga metadatastandarder) som specificerar standardvärdet för "Draw Land Mask" -alternativet på datamängdens Make A Graph-formulär ( *datasetID* .graph) och för parametern i en URL som begär en karta över data. Till exempel,
    ```
    <att name="drawLandMask">over</att>  
    ```
Se[drawLandMaskÖversikt](#drawlandmask).
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (från[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata standard) IGNORED och/eller REPLACED. Om datasetets[cdm\\_data\\_type](#cdm_data_type)är lämpligt,ERDDAP™Används automatiskt för att skapa enfeatureTypeattribut. Det finns ingen anledning för dig att lägga till det.
    
Men om du använder[EDDTableFromNcCFFiles](#eddtablefromnccffiles)skapa en dataset från filer som följer[CF Diskret sampling geometrier (DSG) standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)filerna själva måste hafeatureTypekorrekt definierad, så attERDDAP™kan läsa filerna korrekt. Det är en del av CF DSG-kraven för den typen av fil.
     
###### Historiens historia{#history} 
*   [ **Historiens historia** ](#history)  (från[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)och[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) är en RECOMMENDED multi-line String global attribut med en linje för varje behandling steg som data har genomgått. Till exempel,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Idealiskt har varje rad en ISO 8601:2004 (E E E E) formaterat datum+timeZ (till exempel 2011-08-05T08:55:02Z) följt av en beskrivning av behandlingssteget.
    *   ERDDAP™skapar detta om det inte redan finns.
    * Om det redan finns,ERDDAP™kommer att lämna ny information till den befintliga informationen.
    * Historien är viktig eftersom det tillåter kunder att backa till den ursprungliga källan till data.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)är en REQUIRED global attribut med webbadressen på en webbsida med mer information om denna dataset (vanligtvis på källinstitutets webbplats) . Till exempel,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Antingen datamängdens globala[sourceAttributes](#global-attributes)eller dess globala&lt;addAttributes&gt; &gt; &gt; &gt; &gt; MÅSTE inkludera detta attribut.
    *   infoUrlär viktigt eftersom det tillåter kunder att ta reda på mer om data från den ursprungliga källan.
    *   ERDDAP™Visar en länk tillinfoUrlpå datasetets data Access Form ( *datasetID* .html) Gör en Graph webbsida ( *datasetID* .graph) och andra webbsidor.
    * Om webbadressen har en fråga (efter "?") Det måste vara redan[procent kodade](https://en.wikipedia.org/wiki/Percent-encoding). Du måste koda speciella tecken i begränsningarna (annat än den första "&" och huvud'='Om någon) i formuläret % HH, där HH är karaktärens 2-siffriga hexadecimalvärde. Vanligtvis behöver du bara konvertera några av skiljetecknen: % till %25 och till %26, ”i %22,&lt;i %3C, = %3D, &gt; till %3E, + till %2B,|i %7C,\\[i %5B,\\]i %5D, utrymme till %20 och omvandla alla tecken över #127 till deras UTF-8-formulär och sedan koda varje byte av UTF-8-formuläret till %HH-formatet (fråga en programmerare om hjälp) .
Till exempel, ochstationID&gt;="41004"
Blir &stationID%3E= %2241004 %22
Procentkodning krävs vanligtvis när du får tillgång tillERDDAPvia annan programvara än en webbläsare. Webbläsare hanterar vanligtvis procent kodning för dig.
I vissa situationer måste du procent koda alla andra tecken än A-Za-z0-9\\_-&#33; " () \\*, men fortfarande inte kodar den ursprungliga "&" eller huvud'='.
Programspråk har verktyg för att göra detta (till exempel seJava"S[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
ochJavaSkriften ärencodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) och det finns
        [webbplatser som procent kodar/avkodar för dig](https://www.url-encode-decode.com/).
    * Sedan dessdatasets.xmlär en XML-fil, du måste också &-kod ALL '&',&lt;"och"&gt; i webbadressen som "&amp;", "&lt;"och" & gt; "efter procent kodning.
    *   infoUrlär unikt förERDDAP. Det är inte från någon metadata standard.
###### institution{#institution} 
*   [ **institution** ](#institution)  (från[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)och[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) är en REQUIRED global attribut med den korta versionen av namnet på institutionen som är källan till denna data (vanligtvis en akronym, vanligtvis&lt;20 tecken). Till exempel,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Antingen datamängdens globala[sourceAttributes](#global-attributes)eller dess globala&lt;addAttributes&gt; &gt; &gt; &gt; &gt; MÅSTE inkludera detta attribut.
    *   ERDDAP™Visar institutet när det visar en lista över datamängder. Om en institutions namn här är längre än 20 tecken, kommer endast de 20 första tecknen att synas i listan över datamängder. (Men hela institutionen kan ses genom att sätta muspekaren över den intilliggande "?) .
    * Om du lägger till institution i listan över&lt;categoryAttributes&gt; &gt; &gt; &gt; &gt; in iERDDAP"S[setup.xml](/docs/server-admin/deploy-install#setupxml)fil, användare kan enkelt hitta datamängder från samma institution viaERDDAP"Sök för datamängder efter kategori" på hemsidan.
###### Nyckelord{#keywords} 
*   [ **Nyckelord** ](#keywords)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är en RECOMMENDED comma-separerad lista över ord och korta fraser (till exempel,[GCMD Vetenskapens nyckelord](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) som beskriver datamängden på ett allmänt sätt och inte antar någon annan kunskap om datamängden (Till exempel, för oceanografiska data, inkluderar havet) . Till exempel,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Sedan dessdatasets.xmlär ett XML-dokument, tecknen och,&lt;och &gt; i ett attribut som nyckelord (t.ex. &gt; tecken i GCMD-vetenskapliga sökord) måste kodas som &amp;,&lt;och &gt; respektive.
När en dataset laddas inERDDAP,
    
    * "Earth Science" läggs till i början av ett GCMD-nyckelord som saknar det.
    * GCMD nyckelord konverteras till Title Case (dvs. de första bokstäverna kapitaliseras) .
    * Nyckelorden omorganiseras till sorterad ordning och eventuella newline tecken tas bort.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är en RECOMMENDED-attribut: om du följer en riktlinje för orden/fraserna i ditt sökordsattribut (Till exempel GCMD Science Keywords) lägg namn på denna riktlinje här. Till exempel,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licens{#license} 
*   [ **licens** ](#license)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är ett starkt globalt attribut med licens- och/eller användningsbegränsningar. Till exempel,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Om "\\[standard\\]förekommer i attributvärdet, det kommer att ersättas med standardenERDDAP™Licens från&lt;standardlicens&gt; tagga inERDDAP"S
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)är från den föråldrade[ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (som identifierades iMetadata\\_ConventionsSom "UnidataDataset Discovery v1.0”) metadata standard. attributvärdet var en komma-separerad lista över metadatakonventioner som användes av denna datamängd.
Om en dataset använder ACDD 1.0, är detta attribut STRONGLY RECOMMENDED, till exempel.
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
MenERDDAP™rekommenderar nu ACDD-1.3. Om du har[Byt dataset för att använda ACDD-1.3](#switch-to-acdd-13), användning avMetadata\\_ConventionsSTRONGLY DISCOURAGED: Använd bara&lt;Konventioner&gt;] (#konventioner) I stället.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är en rekommenderad textbeskrivning av bearbetningen (till exempel,[NASA satellit databehandling nivåer](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels)Till exempel nivå 3) eller kvalitetskontrollnivå (Till exempel vetenskaplig kvalitet) av data. Till exempel,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### Projektprojekt{#project} 
*   [ **Projektprojekt** ](#project)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är ett OPTIONAL attribut för att identifiera det projekt som datamängden är en del av. Till exempel,
    ```
    <att name="project">GTSPP</att>  
    ```
Om dataset inte är en del av ett projekt, använd inte detta attribut. jämfört med[creator\\_name](#creator_name)Detta är fokuserat på projektet (inte en person eller en organisation som kan vara involverad i flera projekt) .
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det rekommenderade sättet att identifiera personen, organisationen eller projektet som publicerar denna dataset. Till exempel,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Du är till exempel förlaget om en annan person eller grupp[skapat skapat](#creator_name)dataset och du bara återservera det viaERDDAP. Om "publisher" inte verkligen gäller för en dataset, utelämna detta attribut. jämfört med[creator\\_name](#creator_name), förlaget förmodligen inte väsentligt ändra eller reparera data; förlaget gör bara data tillgängliga i en ny plats.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det rekommenderade sättet att identifiera en e-postadress (korrekt formaterad, till exempel john\\_smith@great.org) Det ger ett sätt att kontakta förlaget. Till exempel,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Om "publisher" inte verkligen gäller för en dataset, utelämna detta attribut.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är det rekommenderade sättet att identifiera en URL för den organisation som publicerade datamängden eller en URL med utgivarens information om denna datamängd (Men det är mer syftet med[infoUrl](#infourl)) . Till exempel,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Om "publisher" inte verkligen gäller för en dataset, utelämna detta attribut.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)är ett globalt String attribut (inte från någon standard) Anger om detta är en realtidsdataset. Till exempel,
    ```
    <att name="real\\_time">true</att>  
    ```
Om detta är falskt (Default) ,ERDDAP™cach svar på förfrågningar om filtyper där hela filen måste skapas innanERDDAP™kan börja skicka svaret till användaren och återanvända dem i upp till 15 minuter (t.ex.,.nc.png) .
Om detta är sant,ERDDAP™kommer aldrig att cacha svarsfilerna och kommer alltid att returnera nyskapade filer.
###### sourceUrlattribut{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)är ett globalt attribut med URL-adressen till datakällan. Till exempel,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (Men lägg allt på en linje) 
    *   ERDDAP™Skapar vanligtvis detta globala attribut automatiskt. Två undantag är EDDTableFromHyraxFiler och EDDTableFromThreddsFiles.
    * Om källan är lokala filer och filerna skapades av din organisation, använd
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Om källan är lokal databas och data skapades av din organisation, använd
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrlär viktigt eftersom det tillåter kunder att backa till den ursprungliga källan till data.
    *   sourceUrlär unikt förERDDAP. Det är inte från någon metadata standard.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (från[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) är en RECOMMENDED-attribut för att identifiera namnet på det kontrollerade ordförrådet från vilken variabel[standard\\_name](#standard_name)s tas. Till exempel,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
för version 77 av[CF standardnamntabell](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (för EDDTable dataset endast) är ett globalt attribut som låter dig ange en komma-separerad lista över&lt;dataVariable&gt;] (#datavariable)  [destinationName](#destinationname)för att identifiera variabler som har ett begränsat antal värden (ett annat sätt: variabler för vilka vart och ett av värdena har många dubbletter) . Till exempel,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Om detta attribut är närvarande kommer datamängden att ha en *datasetID* .subset webbsida (och en länk till den på varje dataset-lista) som låter användarna snabbt och enkelt välja olika delmängder av data.
    * Varje gång en dataset laddas,ERDDAPlaster och butiker på disk en tabell med alla de distinkta () kombinationer av subset Variables variabels värderingar.ERDDAP™kan läsa detsubsetVariablesTabell och bearbeta det mycket snabbt (särskilt jämfört med att läsa massor av datafiler eller få data från en databas eller annan extern tjänst) .
    * Detta tillåterERDDAP™göra 3 saker:
        1. Det tillåterERDDAP™för att sätta en lista över möjliga värden i en nedgångslista på Data Access Form, Gör en Graph-webbsida och .subset-webbsidor.
        2. Det tillåterERDDAP™att erbjuda en .subset-webbsida för det datasetet. Den sidan är intressant eftersom det gör det enkelt att hitta giltiga kombinationer av värdena på dessa variabler, vilket för vissa datamängder och vissa variabler är mycket, mycket svårt. (Nästan omöjligt) . Sedan, alla användarförfrågningar för distinkt () Subset Variabel data kommer att vara mycket snabb.
        3. Om det finns en användarbegäran som endast hänvisar till en delmängd av dessa variabler,ERDDAP™kan snabbt läsasubsetVariablestabell och svara på begäran. Det kan spara massor av tid och ansträngning förERDDAP.
    * Ordern fördestinationNames du specificerar bestämmer typordningen på *datasetID* .subset webbsida, så du brukar ange de viktigaste variablerna först, sedan minst viktiga. Till exempel, för datamängder med tidsseriedata för flera stationer, kan du använda, till exempel,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
så att värdena sorteras efter station\\_id.
    * Självklart är det ditt val som variabler att inkludera isubsetVariableslista, men den föreslagna användningen är:
        
I allmänhet inkluderar variabler för vilka du villERDDAP™för att visa en rullgardinslista över alternativ på datasetets Data Access Form (.html) och Make-A-Graph (.graph) webbsidor.
        
I allmänhet inkluderar du variabler med information om datasetets funktioner (stationer, profiler och/eller banor, särskilt från[cdm\\_timeseries\\_variables](#cdm_timeseries_variables),[cdm\\_profile\\_variables](#cdm_profile_variables),[cdm\\_trajectory\\_variables](#cdm_trajectory_variables)) . Det finns bara några olika värden för dessa variabler så att de fungerar bra med nedgångslistor.
        
Inkludera aldrig några datavariabler i samband med enskilda observationer (t.ex. tid, temperatur, salthalt, aktuell hastighet) i densubsetVariableslista. Det finns för många olika värden för dessa variabler, så en rullgardinslista skulle vara långsam att ladda och vara svår att arbeta med. (eller inte arbete) .
        
    * Om antalet distinkta kombinationer av dessa variabler är större än cirka 1 000 000, bör du överväga att begränsa antaletsubsetVariablesatt du anger för att minska antalet distinkta kombinationer till under 1 000 000; annars *datasetID* .subset webbsidor kan genereras långsamt. I extrema fall kan datamängden inte laddas iERDDAP™för att generera listan över distinkta kombinationer använder för mycket minne. Om så är fallet måste du ta bort vissa variabler frånsubsetVariableslista.
    * Om antalet distinkta värden för någon subset variabel är större än cirka 20 000, bör du överväga att inte inkludera den variabeln i listan översubsetVariables; annars tar det lång tid att överföra *datasetID* .subset, *datasetID* .graf, och *datasetID* .html webbsidor. På en Mac är det också mycket svårt att göra urval från en nedgångslista med mer än 500 objekt på grund av bristen på en rullningsbar. En kompromiss är: ta bort variabler från listan när användare inte kan välja värden från en nedgångslista.
    * Du bör testa varje dataset för att se omsubsetVariablesInställningen är okej. Om källdataservern är långsam och det tar för lång tid (eller misslyckas) för att ladda ner data, antingen minska antalet variabler som anges eller ta bortsubsetVariablesglobala attribut.
    * Subset Variables är mycket användbart. Så om din dataset är lämplig, vänligen skapa ensubsetVariablesattribut.
    * EDDTableFrånSOSautomatiskt lägger till
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
När dataset skapas.
        * Möjlig varning: om en användare använder *datasetID* .subset webbsida väljer ett värde som har en vagnReturn eller newline karaktär, *datasetID* Subset kommer att misslyckas.ERDDAP™Det kan inte fungera runt detta problem på grund av vissa HTML-detaljer. I alla fall är det nästan alltid en bra idé att ta bort vagnenReturn och newline-tecken från data. För att hjälpa dig att lösa problemet, om EDDTable.subsetVariablesDataTable metod iERDDAPupptäcker datavärden som kommer att orsaka problem, det kommer att maila en varning med en lista över kränkande värden till e-post Allting Allt Till e-postadresser som anges i setup.xml. På så sätt vet du vad som behöver fixas.
        *    **Pre-genererade subsettabeller.** Normalt närERDDAP™laddar en dataset, den begär distinkt () subset variabler datatabell från datakällan, bara via en normal dataförfrågan. I vissa fall är dessa data inte tillgängliga från datakällan eller hämta från datakällan kan vara svåra på datakällan. Om så är fallet kan du lämna en tabell med informationen i en.jsoneller .csv-fil med namnet *Tomcat* /innehåll/erddap/subset/ *datasetID* .json  (eller .csv) . Om närvarande,ERDDAP™kommer att läsa den en gång när datamängden laddas och använder den som källa till delmängdsdata.
            * Om det finns ett fel när du läser det, kommer datamängden inte att ladda.
            * Det måste ha exakt samma kolumnnamn (Exempelvis samma fall) som&lt;subsetVariables&gt;, men kolumnerna kan vara i någon ordning.
            * Det kan ha extra kolumner (De kommer att tas bort och nyligen redundant rader kommer att tas bort) .
            * Saknade värden bör saknas värden (Inte falska siffror som -99) .
            *   .jsonfiler kan vara lite svårare att skapa men hantera Unicode tecken bra..jsonfiler är lätta att skapa om du skapar dem medERDDAP.
            * .csv-filer är lätta att arbeta med, men passar endast för ISO 8859-1-karaktärer. .csv-filer måste ha kolumnnamn på den första raden och data på efterföljande rader.
        * För stora datamängder eller när&lt;subsetVariables&gt; är felkonfigurerad, kan tabellen med kombinationer av värden vara stor nog för att orsaka för mycket data eller OutOfMemory fel. Lösningen är att ta bort variabler från listan över&lt;subsetVariablesför vilka det finns ett stort antal värden, eller ta bort variabler efter behov tills storleken på tabellen är rimlig. Oavsett fel, delar avERDDAP™som användersubsetVariablesSystem fungerar inte bra (t.ex. webbsidor laddas mycket långsamt) När det finns för många rader (till exempel mer än en miljon) i den tabellen.
        *   subsetVariableshar ingenting att göra med att ange vilka variabler användarna kan använda i begränsningar, dvs hur användare kan begära delmängder av datamängden.ERDDAP™tillåter alltid begränsningar att hänvisa till någon av variablerna.
###### Time Units{#time-units} 
[Tid och timestamp](#time-units)Kolumner ska ha ISO 8601:2004 (E E E E) formaterat datum + tid Z strängar (1985-01-31T15:31:00Z) .
             
###### Sammanfattning{#summary} 
*   [ **Sammanfattning** ](#summary)  (från[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)och[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) är en REQUIRED global attribut med en lång beskrivning av datamängden (vanligtvis&lt;500 tecken). Till exempel,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Antingen datamängdens globala[sourceAttributes](#global-attributes)eller dess globala&lt;addAttributes&gt; &gt; &gt; &gt; &gt; MÅSTE inkludera detta attribut.
    * Sammanfattning är mycket viktigt eftersom det tillåter kunder att läsa en beskrivning av datamängden som har mer information än titeln och därmed snabbt förstå vad datamängden är.
    * Råd: Skriv sammanfattningen så det skulle fungera för att beskriva datamängden till någon slumpmässig person du möter på gatan eller till en kollega. Kom ihåg att inkludera[Fem W och ett H](https://en.wikipedia.org/wiki/Five_Ws)Vem skapade dataset? Vilken information samlades in? När samlades in data? Var samlades den? Varför samlades den? Hur samlades den?
    *   ERDDAP™visar sammanfattningen av datasetets data Access-formulär ( *datasetID* .html) Gör en Graph webbsida ( *datasetID* .graph) och andra webbsidor.ERDDAP™använder sammanfattningen när du skapar FGDC- och ISO 19115-dokument.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (En valfriERDDAP-specifik global metadataattribut, inte från någon standard) specificerar, på ett förenklat sätt, när data för en realtidsdataset anses vara out-of-date, specificerat somnow- *NUnits* till exempel,now-2 dagar för data som vanligtvis visas 24-48 timmar efter tidsvärdet. För prognosdata, använd nu **+ + +**  *NUnits* Till exempel, nu + 6 dagar för prognosdata som är högst 8 dagar i framtiden. (Se[now- *NUnits* syntax beskrivning](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) Om det maximala tidsvärdet för datamängden är senare än den angivna tiden anses datamängden vara aktuell. Om det maximala tidsvärdet är äldre än den angivna tiden anses datamängden vara aktuell. För aktuella datamängder finns det förmodligen ett problem med datakällan, såERDDAP™kan inte komma åt data från nyare tidspunkter.
    
ochtestOutOfDatevärdet visas som en kolumn i[allDatasetsDataset](#eddtablefromalldatasets)i dinERDDAP. Det används också för att beräkna outOfDate index, vilket är en annan kolumn iallDatasetsdataset.
Om indexet är&lt;1, dataset anses up-to-date.
Om indexet är&lt;=1, dataset anses vara out-of-date.
Om indexet är&lt;= 2, datamängden anses mycket out-of-date.
    
ochtestOutOfDatevärdet används också avERDDAP™att generera https://*yourDomain*/erddap/outOfDateDatasets.html Webbsidan ([Exempelvis](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) som visar de datamängder som har&lt;testOutOfDatetaggar, med datamängder rankade av hur out-of-date de är. Om du ändrar filtypen (från .html till .csv,.jsonlCSV,.nc,.tsv......) Du kan få den informationen i olika filformat.
    
När det är möjligt,[GenerateDatasetsXml](#generatedatasetsxml)lägger till entestOutOfDateattribut till den globalaaddAttributesav en dataset. Detta värde är ett förslag baserat på den information som finns tillgänglig för GenerateDatasetsXml. Om värdet inte är lämpligt, ändra det.
    
"Out-of-date" här är mycket annorlunda än&lt;Reload EveryNMinutes (#reloadeveryn Minuter) , som handlar om hur up-to-dateERDDAPkunskap om datamängden är. och&lt;testOutOfDatesystemet förutsätter attERDDAPkunskap om datamängden är aktuell. Frågan&lt;testOutOfDate&gt; handlar om är: verkar det vara något fel med källan till data, vilket gör att nyare data inte är tillgängliga genomERDDAP??
    
###### titel{#title} 
*   [ **titel** ](#title)  (från[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)och[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) är en REQUIRED global attribut med kort beskrivning av dataset (vanligtvis&lt;=95 tecken). Till exempel,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Antingen datamängdens globala[sourceAttributes](#global-attributes)eller dess globala&lt;addAttributes&gt; &gt; &gt; &gt; &gt; MÅSTE inkludera detta attribut.
    * Titeln är viktig eftersom varje lista över datamängder som presenteras avERDDAP  (annat än sökresultat) listar dataset i alfabetisk ordning, med titel. Så om du vill ange datamängdsordningen eller ha några datamängder grupperade tillsammans måste du skapa titlar med det i åtanke. Många listor över dataset (Som svar på en kategorisökning) Visa en delmängd av hela listan och i en annan ordning. Så titeln för varje dataset ska stå på egen hand.
    * Om titeln innehåller ordet "FÖRSTÄND" (Alla kapitalbrev) Då kommer datasetet att få en lägre rankning i sökningar.
             
##### &lt;axisVariableoch gt;{#axisvariable} 
* [Och [Gud] ** &lt;axisVariable&gt; &gt; &gt; &gt; &gt; ** ] (#axisvariable) används för att beskriva en dimension (även kallad "axis") .
FörEDDGriddatamängder, en eller fleraaxisVariabletaggar är REQUIRED, och alla[dataVariables](#datavariable)dela/använd alltid alla axelvariabler. ([Varför?](#why-just-two-basic-data-structures) [Tänk om de inte gör det?](#dimensions))   
Det måste finnas en axelvariabel för varje dimension av datavariablerna.
Axis variabler måste anges i den ordning som datavariablerna använder dem.
(EDDTable dataset kan inte använda&lt;axisVariable&gt; taggar.)
Ett kött ut exempel är:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; stöder följande deltag:
###### &lt;sourceName\\&gt;{#sourcename} 
* [Och [Gud]&lt;sourceName\\&gt;] (#Sourname) - datakällans namn för variabeln. Detta är namnet somERDDAP™Används när du begär data från datakällan. Detta är namnet somERDDAP™letar efter när data returneras från datakällan. Detta är fallet känsligt. Detta är REQUIRED.
###### &lt;destinationName\\&gt;{#destinationname} 
* [Och [Gud]&lt;destinationName\\&gt;] (#destinationnamn) är namnet på variabeln som visas och används avERDDAP™användare.
    * Detta är praktiskt. Om frånvarande,sourceNameanvänds.
    * Detta är användbart eftersom det låter dig ändra en kryptisk eller uddasourceName.
    *   destinationNameär fallet känsligt.
    *   destinationNameBörja med ett brev (A-Z, a-z) och måste följas av 0 eller fler tecken (A-Z, a-z, 0-9 och \\_) . ("-" tilläts innanERDDAP™version 1.10.) Denna begränsning tillåter axelvariabla namn att vara samma iERDDAP™i svarsfilerna och i all programvara där dessa filer kommer att användas, inklusive programmeringsspråk (som liknarPython,MatlabochJavaSkript) där det finns liknande begränsningar för variabla namn.
    * InomEDDGriddataset,[longitud, latitud, höjd, djup och tid](#destinationname)Axelvariabler är speciella.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [Och [Gud]&lt;addAttributes&gt;] (#variable-addattributes) definierar en OPTIONAL uppsättning attribut ( *Namnnamn* = = *Värdevärde* ) som läggs till källans attribut för en variabel, för att göra de kombinerade attributen för en variabel.
Om variabeln[sourceAttributes](#variable-addattributes)eller&lt;addAttributes&gt; Inkludera[scale\\_factoroch/elleradd\\_offset](#scale_factor)attribut, deras värden kommer att användas för att packa upp data från källan innan distribution till kunden
     (Resultatresultat Värde = källa Värde \\*scale\\_factor+ + +add\\_offset) . Den uppackade variabeln kommer att vara av samma datatyp (Till exempel flytande) Somscale\\_factorochadd\\_offsetvärden.
         
##### &lt;dataVariableoch gt;{#datavariable} 
* [Och [Gud] ** &lt;dataVariable&gt; &gt; &gt; &gt; &gt; ** ] (#datavariable) är en REQUIRED (för nästan alla dataset) tag inom&lt;dataset&gt; tagga som används för att beskriva en datavariabel. Det måste finnas 1 eller flera fall av denna tagg. Ett kött ut exempel är:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt;dataVariable&gt; stöder följande deltag:
###### &lt;sourceNameoch gt;{#sourcename-1} 
* [Och [Gud]&lt;sourceName&gt;] (#Sourname) - datakällans namn för variabeln. Detta är namnet somERDDAP™Används när du begär data från datakällan. Detta är namnet somERDDAP™letar efter när data returneras från datakällan. Detta är fallet känsligt. Detta är REQUIRED.
###### Grupper{#groups} 
CF lade till stöd för grupper med CF v1.8. Från och med ~2020,NetCDFverktyg stöder att sätta variabler i grupper i en.ncfil. I praktiken betyder det bara att variablerna har ett långt namn som identifierar gruppen. (s) och variabelnamnet, till exempel grupp1a/group2c/varName).ERDDAP™stöder grupper genom att konvertera "/" i variabelns&lt;sourceName&gt; i "\\_" är i variabelns&lt;destinationNameTill exempel grupp1a\\_group2c\\_varName. (När du ser det bör du inse att grupper inte är mycket mer än en syntaxkonvention.) När variablerna anges iERDDAP™Alla variabler i en grupp kommer att visas tillsammans och efterlikna den underliggande gruppen.\\[OmERDDAP™I synnerhet GenerateDatasets Xml, fungerar inte lika bra som det kan med källfiler som har grupper, vänligen maila en provfil till Chris. John på noaa.gov.\\]

EDDTableFromFiles dataset kan använda några speciellt kodade, pseudosourceNameför att definiera nya datavariabler, t.ex. för att främja ett globalt attribut som en datavariabel. Se[Denna dokumentation](#pseudo-sourcenames).
###### HDFStrukturer{#hdf-structures} 
Börja medERDDAP™v2.12,EDDGridFrånNcFiles ochEDDGridFrånNcFiles Unpacked kan läsa data från "strukturer" i.nc4 och.hdf4 filer. För att identifiera en variabel som kommer från en struktur,&lt;sourceName&gt; &gt; &gt; &gt; &gt; måste använda formatet: *FullStructureName* | *medlemName* till exempel grupp1/myStruct|MyMember.

###### Fast Value SourceNames{#fixed-value-sourcenames} 
I en EDDTable dataset, om du vill skapa en variabel (med ett enda, fast värde) Det är inte i källdatasetet, använd:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Den initiala likar tecken berättarERDDAP™att en fast Värdet kommer att följa.

* För numeriska variabler måste det fasta värdet vara ett enda ändligt värde eller NaN (fall okänslig, t.ex.,) .
* För strängvariabler måste det fasta värdet vara singel,[JSON-stil sträng](https://www.json.org/json-en.html)  (med speciella karaktärer som rymts med tecken) t.ex. "My"Special\" String
* För en tidsstämpelvariabel, ange det fasta värdet som ett nummer i"seconds since 1970-01-01T00:00:00Z"och användning
enheter = sekunder sedan 1970-01-01T00:00:00Z.
    
De andra taggarna för de&lt;dataVariableArbeta som om detta var en vanlig variabel.
Till exempel för att skapa en variabel som kallas höjd med ett fast värde på 0,0 (Flyta) Använd:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

För ovanliga situationer kan du även ange enactual\\_rangeaddAttribute, som kommer att åsidosätta de förväntade värdena för destinationMin och destinationMax (som annars skulle motsvara den fasta Värde) .
 
###### Script SourceNames/Derived Variables{#script-sourcenamesderived-variables} 
Börja medERDDAP™v2.10, i en[EDDTableFromFiles](#eddtablefromfiles),[EDDTableFromDatabase](#eddtablefromdatabase)eller[EDDTableFromFileNames](#eddtablefromfilenames)dataset,&lt;sourceName&gt; kan vara
Ett uttryck (En ekvation som utvärderar till ett enda värde) Använda formatet
```
    <sourceName>=*expression*</sourceName>  
```
Eller ett manus (En serie uttalanden som returnerar ett enda värde) Använda formatet
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™Litar på[Apache projektets](https://www.apache.org/) [JavaExpression språk (Jexl) ](https://commons.apache.org/proper/commons-jexl/)  (Licens:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) för att utvärdera uttrycken och köra skripten.
Beräkningen för en viss ny variabel görs inom en rad av resultaten, upprepade gånger för alla rader.
Uttryck och skript använder enJavaochJavaScript-liknande syntax och kan använda någon av
[operatörer och metoder som är inbyggda i JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).
Skripten kan också använda metoder (funktioner) från dessa klasser:
*   [Kalender2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), som är en wrapper för några av de statiska, tid- och kalenderrelaterade metoderna i com.cohort.util.Calendar2 ([licens](/acknowledgements#cohort-software)) . Till exempel,
Kalender2.parseToEpochSeconds ( *sourceTime, datum TimeFormat* ) kommer att parse källan Tidssträng via datumTimeFormat sträng och returnera en"seconds since 1970-01-01T00:00:00Z"  (epokandar) Dubbelvärde.
*   [Math](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), vilket är en omslag för nästan alla statiska, matematiska metoder i[Java.lang. Math](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). Till exempel Math.atan2 ( *y, x* ) tar in rektangulära koordinater (y, x) och returnerar polära koordinater (en mängd dubblar med\\[R, theta\\]) .
*   [Math2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), som är en wrapper för nästan alla statiska, matematiska metoder i com.cohort.util. Math2 ([licens](/acknowledgements#cohort-software)) . Till exempel,
Math2.round till ( *d, nPlacess* ) kommer att runda d till det angivna antalet siffror till höger om decimalpunkten.
* String, som ger dig tillgång till alla statiska, strängrelaterade metoder i[Java.lang. String](https://docs.oracle.com/javase/8/docs/api/java/lang/String). Stränga föremål iERDDAP™uttryck och skript kan använda någon av deras tillhörandeJavametoder, som beskrivs i java.lang. String dokumentation. Till exempel String.valueOf (d d d d d d) omvandla det dubbla värdet d till en sträng (även om du kan använda ""+d) .
*   [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), som är en wrapper för de flesta av de statiska, sträng- och matrisrelaterade metoderna i com.cohort.util.String2 ([licens](/acknowledgements#cohort-software)) . Till exempel String2.zEroPad ( *nummer, nDigits* ) kommer att lägga till 0 till vänster om nummersträngen så att det totala antalet siffror är nDigits (till exempel String2.zEroPad ("6", 2) Kommer tillbaka "06") .
*   [rad](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), som har icke-statiska metoder för att komma åt data från de olika kolumnerna i den aktuella raden av källdatatabellen. Till exempel row.columnString ("år") läser värdet från kolumnen "år" som en sträng, medan row.column Int ("år") läser värdet från kolumnen "år" som heltal.

Av säkerhetsskäl kan uttryck och skript inte använda andra klasser än de 6.ERDDAP™genomdriver denna begränsning genom att skapa en standard svart lista (som svartlistar alla klasser) och sedan en vit lista (som specifikt tillåter de 6 klasser som beskrivs ovan) . Om du behöver andra metoder och/eller andra klasser för att göra ditt arbete, vänligen maila dina förfrågningar till Chris. John på noaa.gov.
    
###### Effektiv
För EDDTableFromFiles dataset finns det bara en mycket, mycket minimal (förmodligen inte märkbart) avmattning för begäran om data från dessa variabler. För EDDTableFromDatabase finns det stora hastighetsstraff för förfrågningar som inkluderar begränsningar på dessa variabler (t.ex. (&longitude0360&gt;30 & longitude0360&lt;40) eftersom begränsningarna inte kan överföras till databasen, så databasen måste returnera mycket mer data tillERDDAP™  (vilket är mycket tidskrävande) så attERDDAP™kan skapa den nya variabeln och tillämpa begränsningen. För att undvika det värsta fallet (där det inte finns några begränsningar som överförs till databasen) ,ERDDAP™kastar ett felmeddelande så att databasen inte behöver returnera hela innehållet i tabellen. (Om du vill kringgå detta, lägg till en begränsning i en kolumn som alltid kommer att vara sant, t.ex., &time&lt;3000-01-01.) Av denna anledning, med EDDTableFromDatabase, är det förmodligen alltid bättre att skapa en härledd kolumn i databasen snarare än att användasourceName=script inERDDAP.

###### Översikt över hur ett uttryck (Eller Skriften) Används:
Som svar på en användares begäran om tabelldata,ERDDAP™Får data från en serie källfiler. Varje källfil kommer att generera en tabell med rå (direkt från källan) data.ERDDAP™kommer sedan att gå igenom tabellen med rådata, rad efter rad, och utvärdera uttrycket eller manuset en gång för varje rad, för att skapa en ny kolumn som har det uttrycket eller manuset som ett nytt skript som ettsourceName.
    
###### GenerateDatasetsXml
Observera att GenerateDatasets Xml är helt omedveten när det finns ett behov av att skapa en variabel med&lt;sourceName&gt;==&gt; *Uttryck* &lt;///sourceName&gt;. Du måste skapa variabeln idatasets.xmlför hand.

###### Expression Exempel:
Här är några kompletta exempel på datavariabler som använder ett uttryck för att skapa en ny kolumn med data. Vi förväntar oss att dessa exempel (och varianter av dem) täcker cirka 95% av användningen av alla uttrycksbefriadesourceNames.

###### Kombinera separat "datum" och"time"kolumner i en enhetlig tidskolumn:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
DettasourceNameuttryck gör en ny"time"kolumn genom att sammankalla String-värdena från "datumet" (yyyy-MM-dd) och"time"  (HH:mm:ss) kolumner på varje rad av källfilen, och genom att konvertera den strängen till en"seconds since 1970-01-01"  (epokandar) Dubbelvärde.

Eller kurs måste du anpassa tidsformatet sträng för att hantera det specifika formatet i varje dataset källdatum och tidskolumner, se kolumnerna
[Tidsenheter dokumentation](#string-time-units).

Tekniskt behöver du inte använda Kalender2.parseToEpochSeconds () För att konvertera den kombinerade datum + tid till epokSeconds. Du kan bara passera datum + tid String tillERDDAP™och ange formatet (t.ex.
yyyy-MM-dd"T'H:mm:ss'Z") via attributet enheter. Men det finns betydande fördelar med att konvertera till epokSeconds - särskilt EDDTableFromFiles kan sedan enkelt hålla reda på tidsintervallet i varje fil och så snabbt bestämma om du ska titta i en viss fil när du svarar på en begäran som har tidsbegränsningar.

Ett relaterat problem är behovet av att skapa en enhetlig datum + tid kolumn från en källa med separat år, månad, datum, timme, minut, andra. Lösningen är mycket liknande, men du behöver ofta nollpad många av fälten, så att till exempel månaden (1 - 12) och datum (1 - 31) Har alltid 2 siffror. Här är ett exempel med år, månad, datum:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Ett relaterat problem är behovet av att skapa en enhetlig latitud eller longitud kolumn genom att kombinera data i källbordets separata grader, minuter och sekunder kolumner, var och en lagras som heltal. Till exempel,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Konvertera en kolumn som heter "lon" med longitudvärden från 0 - 360° till en kolumn som heter "längd" med värden från -180 - 180°
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
DettasourceNameuttryck gör en ny "längd" kolumn genom att konvertera dubbelvärdet från "lon" kolumnen på varje rad av källfilen (Förmodligen med 0-360 värden) , och genom att omvandla det till en -180 till 180 dubbla värde.

Om du istället vill konvertera källlängdsvärdena på -180 - 180° till 0 - 360°, använd
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Namn på de två longitudvariablerna:
Om datamängden kommer att ha 2 longitud variabler rekommenderar vi att du använderdestinationName= longitud för -180 - 180° variabel ochdestinationName=longitude0360 (och longName "Longitude 0-360°") för 0-360°-variabeln. Detta är viktigt eftersom användare ibland använder Advanced Search för att söka efter data inom ett visst longitudområde. Sökningen fungerar bättre om longitud konsekvent har -180 - 180° värden för alla datamängder. Dessutom kommer datamängdens geospatiala\\_lon\\_min, geospatial\\_lon\\_max, västligaste\\_Easting och östligaste\\_Eastings globala attribut sedan att ställas in på ett konsekvent sätt (med longitudvärden -180 till 180°) ;
    
###### Konvertera en kolumn som heter "tempF" med temperaturvärden i grad F i en kolumn som heter "tempC" med temperaturer i grad C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
DettasourceNameuttryck gör en ny "tempC" kolumn genom att konvertera flytgraden F-värde från "tempF"-kolumnen på varje rad av källfilen i en flytgrad C värde.

Observera att din dataset kan ha både det ursprungliga tempot F variabel och det nya tempet C variabel genom att ha en annan variabel med
```
    <sourceName>tempF</sourceName>
```
###### Konvertera vind "hastighet" och "riktning" kolumner i två kolumner med u,v komponenter
* För att göra en u-variabel, använd
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* För att göra en v-variabel, använd
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Eller, givet u,v:
* För att göra en hastighetsvariabel, använd
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* För att göra en riktning variabel, använd
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Script Exempel:
Här är ett exempel på att använda ett manus, inte bara ett uttryck, som ettsourceName. Vi förväntar oss att manus, i motsats till uttryck, inte kommer att behövas ofta. I det här fallet är målet att returnera ett icke-NaN saknas värde (-99) för temperaturvärden utanför ett visst område. Observera att manuset är delen efter "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Hård flagga
Om du ändrar uttrycket eller skriptet definierat i ettsourceNameDu måste ställa in en[hård flagga](/docs/server-admin/additional-information#hard-flag)för dataset så theERDDAP™raderar all cachad information för datamängden och läser om varje datafil (använda det nya uttrycket eller skriptet) Nästa gång det laddar datasetet. Alternativt kan du använda[DasDds](#dasdds)vilket motsvarar att sätta en hård flagga.

###### Procent kod
Detta är endast sällan relevant: Eftersom uttryck och skript skrivs indatasets.xml, vilket är ett XML-dokument, måste du procent koda någon&lt;, \\&gt;, och och tecken i uttryck och skript som&lt;, &gt; och &amp; .

###### Vanliga problem
Ett vanligt problem är att du skapar en variabel medsourceName= = *Uttryck* Men den resulterande kolumnen av data har bara saknade värden. Alternativt har vissa rader av den nya kolumnen saknade värden och du tror att de inte borde. Det underliggande problemet är att något är fel med uttrycket ochERDDAPomvandla felet till ett saknat värde. För att lösa problemet,

* Titta på uttrycket för att se vad problemet kan vara.
* Titta in[Log.txt](/docs/server-admin/additional-information#log)som visar det första felmeddelandet som genereras under skapandet av varje ny kolumn.

Vanliga orsaker är:

* Du använde fel fall. Uttryck och skript är känsliga.
* Du utelämnade klassens namn. Du måste till exempel använda Math.abs () Inte bara abs () .
* Du gjorde inte typ konverteringar. Om till exempel ett parametervärdes datatyp är String och du har ett dubbelvärde måste du konvertera en dubbel till en String via ""+d.
* Kolumnnamnet i uttrycket matchar inte exakt kolumnnamnet i filen (eller namnet kan vara annorlunda i vissa filer) .
* Det finns ett syntaxfel i uttrycket (t.ex. en saknad eller extra) ).

Om du fastnar eller behöver hjälp,
Vänligen inkludera detaljerna och se våra[sektion om att få ytterligare stöd](/docs/intro#support).
        
###### &lt;destinationNameoch gt;{#destinationname-1} 
* [Och [Gud]&lt;destinationName&gt;] (#destinationnamn) Namnet på variabeln som visas och används avERDDAP™användare.
    * Detta är praktiskt. Om frånvarande,[sourceName](#sourcename)används.
    * Detta är användbart eftersom det låter dig ändra en kryptisk eller uddasourceName.
    *   destinationNameär fallet känsligt.
    *   destinationNameBörja med ett brev (A-Z, a-z) och måste följas av 0 eller fler tecken (A-Z, a-z, 0-9 och \\_) . ("-" tilläts innanERDDAP™version 1.10.) Denna begränsning gör att datavariabla namn är desamma iERDDAP™i svarsfilerna och i all programvara där dessa filer kommer att användas, inklusive programmeringsspråk (som liknarPython,MatlabochJavaSkript) där det finns liknande begränsningar för variabla namn.
    * I EDDTable dataset,[longitud, latitud, höjd (eller djup) och tid](#destinationname)Data variabler är speciella.
             
###### &lt;Datadata data Type & gt;{#datatype} 
* [Och [Gud]&lt;DataType&gt;] (#datatype) specificerar datatypen som kommer från källan. (I vissa fall, till exempel när du läser data från ASCII-filer, specificerar det hur data som kommer från källan ska lagras.) 
    * Detta är REQUIRED av vissa datasettyper och IGNORED av andra. Datasettyper som kräver detta för derasdataVariables är:EDDGridFromXxFiles, EDDTableFromXxFiles, EDDTableFromMWFSEDDTableFromNOS, EDDTableFromSOS. Andra datasettyper ignorerar denna tagg eftersom de får informationen från källan.
         
    * Giltiga värden är någon av standarden[ERDDAP™datatyper](#data-types)plus boolean (Se nedan) . Datatypnamnen är fallkänsliga.
         
###### Boolean data{#boolean-data} 
*   [Boolean](#boolean-data)är ett speciellt fall.
    * Internt,ERDDAP™Stöder inte en booleansk typ eftersom booleans inte kan lagra saknade värden och de flesta filtyper stöder inte booleans. också,DAPStöder inte booleans, så det skulle inte finnas något standard sätt att fråga booleanska variabler.
    * Anger "boolean" för data Typ idatasets.xmlkommer att orsaka att booleska värden lagras och representeras som byte: 0=false, 1=true, 127=missing\\_value.
    * Användare kan ange begränsningar genom att använda de numeriska värdena (Till exempel "isAlive=1") .
    *   ERDDAP™administratörer behöver ibland använda "booleska" data Typ idatasets.xmlAtt berättaERDDAP™Hur man interagerar med datakällan (t.ex. att läsa booleska värden från en relationsdatabas och konvertera dem till 0, 1, eller 127.) .
         
* Om du vill ändra en datavariabel från datatypen i källfilerna (Till exempel kort) i någon annan data Typ i dataset (Till exempel int) Använd inte&lt;DataType&gt; för att ange vad du vill. (Det fungerar för vissa typer av datamängder, men inte andra.) Istället:
    * Användning&lt;dataType&gt; för att ange vad som finns i filerna (Till exempel kort) .
    * I den&lt;addAttributes&gt; för variabeln, lägg till en[scale\\_factor](#scale_factor)attribut med de nya uppgifterna Typ (Till exempel int) och ett värde på 1, till exempel,
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [Och [Gud]&lt;addAttributes&gt;] (#variable-addattributes) definierar en uppsättning attribut ( *Namnnamn* = = *Värdevärde* ) som läggs till källans attribut för en variabel, för att göra de kombinerade attributen för en variabel. Detta är praktiskt.
Om variabeln[sourceAttributes](#variable-addattributes)eller&lt;addAttributes&gt; Inkludera[scale\\_factoroch/elleradd\\_offset](#scale_factor)attribut, deras värden kommer att användas för att packa upp data från källan innan distribution till kunden. Den uppackade variabeln kommer att vara av samma datatyp (Till exempel flytande) Somscale\\_factorochadd\\_offsetvärden.
        
###### Variabel&lt;addAttributes&gt; {#variable-addattributes} 
* [Och [Gud] ** Variable Attributes / Variable&lt;addAttributes&gt; &gt; &gt; &gt; &gt; ** ] (#variable-addattributes) -----&lt;addAttributes&gt; är en OPTIONAL tag inom en&lt;axisVariable&gt; eller&lt;dataVariabletagga som används för att ändra variabelns attribut.
    
    *    ** Använd en variabel&lt;addAttributesatt ändra variabelns attribut. ** ERDDAP™kombinerar en variabels attribut från datasetets källa (** sourceAttributes **) och variabelns** addAttributes **som du definierar idatasets.xml  (som har prioritet) för att göra variabelns "** Förenade bidrag ** Som är vadERDDAP™användare ser. Således kan du användaaddAttributesför att omdefiniera värdena av källaAttributes, lägga till nya attribut eller ta bort attribut.
    * och se [den] ** &lt;addAttributes&gt; &gt; &gt; &gt; &gt; **information] (#addattributes) som gäller för global och variabel** &lt;addAttributes&gt; &gt; &gt; &gt; &gt; ** .
    *   ERDDAP™söker och använder många av dessa attribut på olika sätt. Till exempel krävs färgBar-värden för att göra en variabel tillgänglig viaWMSså att kartor kan göras med konsekventa färgBars.
    *   [Längden, latitud, höjd (eller djup) och tidsvariabler](#destinationname)Få massor av lämpliga metadata automatiskt (till exempel,[enheter](#units)) .
    * Ett prov&lt;addAttributes&gt; för en datavariabel är:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Det tomma numretOfObservations attributet orsakar källnummerOfObservations attributet (Om någon) tas bort från den slutliga, kombinerade förteckningen över attribut.
    * Att tillhandahålla denna information hjälperERDDAP™Gör ett bättre jobb och hjälper användarna att förstå datamängden.
Bra metadata gör en dataset användbar.
Otillräcklig metadata gör en datamängd värdelös.
Ta dig tid att göra ett bra jobb med metadataattribut.
    
###### Kommentarer om variabla egenskaper som är speciella iERDDAPFrån:

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)är en RECOMMENDED variabel attribut. Till exempel,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Detta attribut är från[CDCCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)och[CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatastandarder.
* Om så är fallet måste det vara en rad av två värden av samma datatyp som variabelns destinationsdatatyp, vilket anger den faktiska (inte den teoretiska eller tillåtna) minsta och maximala värden för data för den variabeln.
* Om data är packad med[scale\\_factoroch/elleradd\\_offset](#scale_factor),actual\\_rangemåste ha oförpackade värden och vara av samma datatyp som de oförpackade värdena.
* För vissa datakällor (Till exempel, alla EDDTableFrån... Filer dataset) ,ERDDAP™bestämmeractual\\_rangeav varje variabel och sätteractual\\_rangeattribut. Med andra datakällor (till exempel relationsdatabaser, Cassandra,DAPPER,Hyrax) Det kan vara besvärligt eller betungande för källan att beräkna intervallet, såERDDAP™Inte begär det. I det här fallet är det bäst om du kan ställa inactual\\_range  (särskilt för longitud, latitud, höjd, djup och tidsvariabler) genom att lägga till enactual\\_rangetill varje variabels&lt;addAttributes&gt;] (#addattributes) för denna dataset indatasets.xmltill exempel,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* För Numeric[tid och timestamp variabler](#time-units)De värden som anges bör vara den relevanta källan (Inte destination) Numeriska värden. Till exempel, om källtidsvärdena lagras som "dagar sedan 1985-01-01", sedanactual\\_rangeska anges i "dagar sedan 1985-01-01". Och om du vill hänvisa till NU som det andra värdet för nästan realtidsdata som uppdateras regelbundet, bör du använda NaN. Till exempel, för att ange ett datasortiment av 1985-01-17 till NOW, använd

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Omactual\\_rangeär känd (antingenERDDAP™beräkna det eller genom att du lägger till det via&lt;addAttributes&gt;),ERDDAP™kommer att visa den för användaren på Formen Data Access ( *datasetID* .html) Gör en Graph-webbsidor ( *datasetID* .graph) för den datamängden och använd den vid framställning av metadata från FGDC och ISO 19115. De senaste 7 dagarna av tidenactual\\_rangeanvänds som standardtidssubset.
* Omactual\\_rangeär känd, användare kan använda[Min min min min min () och max () funktioner](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)på begäran, vilket ofta är mycket användbart.
* För alla EDDTable... dataset, omactual\\_rangeär känd (antingen genom att du anger det eller genom attERDDAP™beräkna den) ,ERDDAP™kan snabbt avvisa eventuella förfrågningar om data utanför det intervallet. Till exempel, om datamängdens lägsta tidsvärde motsvarar 1985-01-17, kommer en begäran om alla data från 1985-01-01 till 1985-01-16 omedelbart att avvisas med felmeddelandet "Din fråga gav inga matchande resultat." Detta göractual\\_rangeen mycket viktig bit av metadata, eftersom den kan sparaERDDAP™Mycket ansträngning och spara användaren mycket tid. Och detta belyser attactual\\_rangevärden får inte vara smalare än datans faktiska intervall; annarsERDDAP™kan felaktigt säga "Det finns inga matchande data" när det faktiskt finns relevanta data.
* När en användare väljer en delmängd av data och begär en filtyp som innehåller metadata (till exempel,.nc) ,ERDDAP™modifieraractual\\_rangei svarsfilen för att reflektera delmängdens räckvidd.
* Se även[data\\_minochdata\\_max](#data_min-and-data_max)som är ett alternativt sätt att specificeraactual\\_range. Men dessa förfaller nu näractual\\_rangedefinieras av CF 1.7+.
         
###### Färg Bar Attributes{#color-bar-attributes} 
Det finns flera OPTIONAL-variabla attribut som anger de föreslagna standardattributen för en färgbar (användas för att omvandla datavärden till färger på bilder) för denna variabel.
* I förekommande fall används denna information som standardinformation genom griddap ochtabledapNär du begär en bild som använder en färgfält.
* Till exempel, när latitudlängdsnätade data planeras som en täckning på en karta, anger färgfältet hur datavärdena omvandlas till färger.
* Att ha dessa värden tillåterERDDAP™skapa bilder som använder en konsekvent färgfält över olika förfrågningar, även när tiden eller andra dimensionsvärden varierar.
* Dessa attributnamn skapades för användning iERDDAP. De är inte från en metadatastandard.
* De attribut som är relaterade till färgfältet är:
    *    **colorBarMinimum** specificerar minimivärdet på colorBar. Till exempel,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Om data är packad med[scale\\_factoroch/elleradd\\_offset](#scale_factor)specificeracolorBarMinimumsom ett oförpackat värde.
    * Data värden lägre äncolorBarMinimumrepresenteras av samma färg somcolorBarMinimumvärden.
    * attributet bör vara av[Typ = "dubbel"](#attributetype)Oavsett datavariabelns typ.
    * Värdet är vanligtvis ett trevligt runda nummer.
    * Bästa praxis: Vi rekommenderar ett värde något högre än det minsta datavärdet.
    * Det finns inget standardvärde.
*    **colorBarMaximum** specificerar det maximala värdet på colorBar. Till exempel,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Om data är packad med[scale\\_factoroch/elleradd\\_offset](#scale_factor)specificeracolorBarMinimumsom ett oförpackat värde.
    * Data värden högre äncolorBarMaximumrepresenteras av samma färg somcolorBarMaximumvärden.
    * attributet bör vara av[Typ = "dubbel"](#attributetype)Oavsett datavariabelns typ.
    * Värdet är vanligtvis ett trevligt runda nummer.
    * Bästa praxis: Vi rekommenderar ett värde något lägre än det maximala datavärdet.
    * Det finns inget standardvärde.
*    **Färgfärg BarPalette** specificerar paletten för färgBar. Till exempel,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * Allt alltERDDAP™installationer stöder dessa standardpaletter: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topography, TopographyDepth\\[tillsatt i v1.74\\]WhiteBlack, WhiteBlueBlack och WhiteRedBlack.
    * Om du har installerat[ytterligare paletter](/docs/server-admin/additional-information#palettes)Du kan hänvisa till en av dem.
    * Om detta attribut inte är närvarande är standarden BlueWhiteRed om \\-1\\*colorBarMinimum= =colorBarMaximum; annars är standarden Rainbow.
*    **FärgBarScale** specificerar skalan för colorBar. Till exempel,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Giltiga värden är linjära och logga.
    * Om värdet är Log,colorBarMinimummåste vara större än 0.
    * Om detta attribut inte är närvarande är standarden Linjär.
*    **Färgfärg BarContinuous** specificerar om färgBar har en kontinuerlig färgpalett eller om färgBar har några diskreta färger. Till exempel,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Giltiga värden är strängarna sanna och falska.
    * Om detta attribut inte är närvarande, är standarden sant.
*    **färgBarNSections** specificerar standardnumret av sektioner på colorBar. Till exempel,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Giltiga värden är positiva heltal.
    * Om detta attribut inte är närvarande, är standarden \\-1, som berättarERDDAP™för att välja antalet sektioner baserat på utbudet av färgBar.
###### WMS {#wms} 
De viktigaste kraven för en variabel att vara tillgänglig viaERDDAP"SWMSServer är:
* Datamängden måste vara enEDDGrid... dataset.
* Datavariabeln måste vara en rutnätvariabel.
* Datavariabeln MUST har longitud och latitudaxelvariabler. (Andra axelvariabler är praktiska.) 
* Det måste finnas några longitudvärden mellan -180 och 180.
* ochcolorBarMinimumochcolorBarMaximumattribut måste anges. (Andra färg bar attribut är praktiska.) 

###### data\\_minochdata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** och **data\\_max** ](#data_min-and-data_max)----- Dessa är deprecated variabla attribut definierade i World Ocean Circulation Experiment (WOCE) metadata beskrivning. Till exempel,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Vi rekommenderar att du använder[actual\\_range](#actual_range)I stället fördata\\_minochdata\\_maxför attactual\\_rangedefinieras nu av CF specifikationen.
    * Om så är fallet måste de vara av samma datatyp som variabelns destinationsdatatyp och ange själva (inte den teoretiska eller tillåtna) minsta och maximala värden för data för den variabeln.
    * Om data är packad med[scale\\_factoroch/elleradd\\_offset](#scale_factor),data\\_minochdata\\_maxmåste vara uppackade värden med den uppackade datatypen.
         
###### VariabeldrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)----- Detta är en OPTIONAL variabel attribut som används avERDDAP™  (och inga metadatastandarder) som specificerar standardvärdet för "Draw Land Mask" -alternativet på datamängdens Make A Graph-formulär ( *datasetID* .graph) och för parametern i en URL som begär en karta över data. Till exempel,
    ```
        <att name="drawLandMask">under</att>  
    ```
Se[drawLandMaskÖversikt](#drawlandmask).
###### Encoding{#encoding} 
*   [ **\\_Encoding** ](#encoding)
    * Detta attribut kan endast användas med String variabler.
    * Detta attribut rekommenderas starkt.
    * Detta attribut är från[NetCDFAnvändarens guide (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    * Internt iERDDAP™Strings är en sekvens av 2-byte tecken som använder[Unicode UCS-2 teckenuppsättning](https://en.wikipedia.org/wiki/UTF-16).
    * Många filtyper stöder endast 1-byte tecken i strängar och behöver därför denna egenskap för att identifiera en associerad
        [Charset (AKA kod sida) ](https://en.wikipedia.org/wiki/Code_page)som definierar hur man kartlägger de 256 möjliga värdena till en uppsättning 256 tecken som dragits från UCS-2-karaktärsuppsättningen och/eller kodningssystemet, t.ex.[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (som kräver mellan 1 och 4 byte per karaktär) .
    * Värden för \\_Encoding är case-insensitive.
    * i teorin,ERDDAP™kan stödja \\_Encoding-identifierare från[Denna IANA lista](https://www.iana.org/assignments/character-sets/character-sets.xhtml)men i praktiken,ERDDAP™Just nu stöder
        * ISO-8859-1 (Observera att det har streck, inte understryker) , som har fördelen att det är identiskt med de första 256 tecknen på Unicode, och
        * UTF-8.
    * När du läser källfiler är standardvärdet ISO-8859-1, förutom netcdf-4-filer, där standarden är UTF-8.
    * Detta är ett pågående problem eftersom många källfiler använder charset eller kodningar som skiljer sig från ISO-8859-1, men inte identifierar charset eller kodning. Till exempel har många källdatafiler några metadata kopierade och klistrade från Microsoft Word på Windows och därmed har snygga hyfsar och apostroper från en Windows-specifik charset istället för ASCII-hyphens och apostroper. Dessa tecken visas sedan som udda tecken eller "? "ERDDAP.
         
###### filAccessBaseUrl{#fileaccessbaseurl} 
*    **[filAccessBaseUrl](#fileaccessbaseurl)och filAccessSuffix** är mycket sällan använda attribut som inte är från någon standard. Om en EDDTable-kolumn har filnamn på webbtillgängliga filer (t.ex. bild, video eller ljudfiler) Du kan lägga till
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
för att ange bas URL (Slutar med /) behövs för att göra filnamnen till kompletta webbadresser. I ovanliga fall, till exempel när en kolumn har referenser till .png-filer men värdena saknar ".png", kan du lägga till
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(till exempel,&lt;att namn="fileAccessSuffix"&gt;.png&lt;/a&gt;)
för att ange ett suffix som ska läggas till för att göra filnamnen till kompletta webbadresser. För.htmlTablesvar,ERDDAP™kommer att visa filnamnet som en länk till hela webbadressen (basen Url plus filnamnet plus suffix) .

Om du villERDDAP™för att tjäna de relaterade filerna, göra en separat[EDDTableFromFileNames](#eddtablefromfilenames)Dataset för dessa filer (Det kan vara en privat dataset) .
    
###### filAccessArchive Url{#fileaccessarchiveurl} 
*   [ **filAccessArchive Url** ](#fileaccessarchiveurl)är ett mycket sällan använt attribut som inte är från någon standard. Om en EDDTable-kolumn har filnamn på webbtillgängliga filer (t.ex. bild, video eller ljudfiler) som är tillgängliga via ett arkiv (t.ex.,.zipfil) tillgänglig via en URL, använd&lt;att namn="fileAccessArchiveUrl"&gt; *TheURL* &lt;/att&gt; för att ange webbadressen för arkivet.
    
Om du villERDDAP™för att tjäna arkivfilen, göra en separat[EDDTableFromFileNames](#eddtablefromfilenames)Dataset för den filen (Det kan vara en privat dataset) .
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)----- Detta är en REQUIRED variabel attribut om&lt;variablerMustHaveIoosCategory &gt; är inställd på sant (Default) in i[setup.xml](/docs/server-admin/deploy-install#setupxml)Annars är det praktiskt.
Till exempel,&lt;Att namn="ioos\\_categorySalinity&lt;/att&gt;
Kategorierna är från[NOAAIntegrerat Ocean Observing System (IOOS) ](https://ioos.noaa.gov/).
    
    *    (Från att skriva detta) Vi är inte medvetna om formella definitioner av dessa namn.
    * Kärnnamnen är från Zdenka Willis .ppt "Integrated Ocean Observing System (IOOS)  NOAA"Tillvägagångssätt för att bygga en inledande operativ förmåga" och från[US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (sida 1-5) .
    * Det är troligt att denna lista kommer att revideras i framtiden. Om du har förfrågningar, vänligen maila Chris. John på noaa.gov.
    *   ERDDAP™Stöder en större lista över kategorier än IOOS, eftersom Bob Simons lade till ytterligare namn (mestadels baserat på namnen på vetenskapliga områden, till exempel biologi, ekologi, meteorologi, statistik, taxonomi) för andra typer av data.
    * aktuella giltiga värden iERDDAP™Bathymetri, biologi, Bottom Character, CO2, färgad upplöst organisk materia, föroreningar, strömmar, upplösta näringsämnen, upplöst O2, ekologi, fisk överflöd, fiskarter, värmeflöde, hypotekslöshet, identifiering, plats, meteorologi, Ocean Color, Optical Properties, Other, Pathogens, Phytoplankton Species, Pressure, Productivity, Quality, Salinity, Sea
    * Det finns viss överlappning och tvetydighet mellan olika termer - gör ditt bästa.
    * Om du lägger tillioos\\_categorytill listan över&lt;categoryAttributes&gt; &gt; &gt; &gt; &gt; in iERDDAP"S[setup.xml](/docs/server-admin/deploy-install#setupxml)fil, användare kan enkelt hitta dataset med liknande data viaERDDAP"Sök för datamängder efter kategori" på hemsidan.
        [Försök att användaioos\\_categoryatt söka efter datamängder av intresse.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Det fanns[En diskussion omERDDAP™ochioos\\_categoryi denERDDAP™Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
Du kan frestas att ställa in&lt;variablerMustHaveIoosCategory &gt; till falska så att denna attribut inte krävs. (Pfft&#33; Vad är det för mig?") Några skäl att lämna den inställd på sant (Default) och användningioos\\_categoryär:
    
    * Om setup.xml's&lt;variablerMustHaveIoosCategory&gt; är sann,[GenerateDatasetsXml](#generatedatasetsxml)Skapar/förslag enioos\\_categoryattribut för varje variabel i varje ny dataset. Varför inte bara lämna in det?
    *   ERDDAP™Låt användarna söka efter datamängder av intresse per kategori.ioos\\_categoryär en mycket användbar sökkategori eftersom ioos\\_categories (Till exempel Temperatur) är ganska bred. Detta görioos\\_categoryMycket bättre för detta ändamål än t.ex. den mycket finare korniga CFstandard\\_names (som inte är så bra för detta ändamål på grund av alla synonymer och små variationer, till exempel have\\_surface\\_temperatur jämfört med havsvatten\\_temperatur) .
(Att användaioos\\_categoryför detta ändamål kontrolleras av&lt;categoryAttributes&gt; i din setup.xml-fil.)
        [Försök att användaioos\\_categoryatt söka efter datamängder av intresse.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Dessa kategorier kommer från[NOAAIntegrerat Ocean Observing System (IOOS) ](https://ioos.noaa.gov/). Dessa kategorier är grundläggande för IOOS beskrivning av IOOS uppdrag. Om du är iNOAAstödioos\\_categoryär en bra One-NOAASaker att göra. (Se detta[EnNOAAvideo](https://www.youtube.com/watch?v=nBnCsMYm2yQ)och bli inspirerad&#33;) Om du är i någon annan amerikansk eller internationell byrå, eller arbetar med myndigheter eller arbetar med någon annan Ocean Observing System, är det inte en bra idé att samarbeta med amerikanska IOOS-kontoret?
    * Förr eller senare kanske du vill ha någon annanERDDAP™att länka till dina dataset via[EDDGridFrånErddap](#eddfromerddap)och[EDDTableFromErddap](#eddfromerddap). Om den andraERDDAP™Kravenioos\\_categoryDina datamängder måste haioos\\_categoryFör attEDDGridFromErddap och EDDTableFromErddap till jobbet.
    * Det är psykologiskt mycket lättare att inkluderaioos\\_categoryNär du skapar dataset (Det är bara en annan sak somERDDAP™kräver att lägga till datamängden för attERDDAP) än att lägga till det efter det faktum (om du bestämde dig för att använda den i framtiden) .
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)och[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) är en RECOMMENDED variabel attribut iERDDAP. Till exempel,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™Använderlong\\_nameför märkning av axlar på grafer.
    * Bästa praxis: Kapitalisera orden ilong\\_nameSom om det vore en titel (kapitalisera det första ordet och alla icke-artikelord) . Inkludera inte enheterna ilong\\_name. Det långa namnet ska inte vara så länge (vanligtvis&lt;20 tecken), men bör vara mer beskrivande än[destinationName](#destinationname), vilket ofta är mycket koncis.
    * Om "long\\_nameinte definieras i variabelns[sourceAttributes](#variable-addattributes)eller&lt;addAttributes&gt;,ERDDAP™kommer att generera det genom att städa upp[standard\\_name](#standard_name)  (Om nuet) ellerdestinationName.
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)och **Fyll Värde**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)och[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) är variabla attribut som beskriver ett nummer (Till exempel -9999) som används för att representera ett saknat värde. Till exempel,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

För strängvariabler är standarden för båda "" (Den tomma strängen) .
För numeriska variabler är standarden för båda NaN.
*   ERDDAP™stöder bådamissing\\_valueoch \\_FillValue, eftersom vissa datakällor tilldelar något olika betydelser för dem.
* Om så är fallet bör de vara av samma datatyp som variabeln.
* Om data är packad med[scale\\_factoroch/elleradd\\_offset](#scale_factor), denmissing\\_valueoch \\_FillValue-värden bör också packas. På samma sätt, för en kolumn med String datum / tid värden som använder en lokal[time\\_zone](#time_zone), denmissing\\_valueoch \\_FillValue-värden bör använda den lokala tidszonen.
* Om en variabel använder dessa speciella värden,missing\\_valueoch/eller \\_FillValue attribut är REQUIRED.
* För[tid och timestamp variabler](#time-units)  (om källan är strängar eller numeriska) ,missing\\_values och \\_FillValues visas som "" (Den tomma strängen) När tiden är skriven som en sträng och som NaN när tiden är skriven som dubbel. Källan värden förmissing\\_valueoch \\_FillValue kommer inte att visas i variabelns metadata.
* För String variabler,ERDDAP™Konverterar alltid någonmissing\\_values eller \\_FillValue datavärden i "" (Den tomma strängen) . Källans värden förmissing\\_valueoch \\_FillValue kommer inte att visas i variabelns metadata.
* För numeriska variabler:
ochmissing\\_valueoch \\_FillValue kommer att visas i variabelns metadata.
För vissa utdataformat,ERDDAP™kommer att lämna dessa specialnummer intakt, t.ex. du kommer att se -9999.
För andra utdataformat (i synnerhet textliknande format som .csv och.htmlTable) ,ERDDAP™ersätter dessa specialnummer med NaN eller "".
* Vissa datatyper har inneboende saknade värdemarkörer som inte behöver identifieras uttryckligen medmissing\\_valueeller \\_FillValue attribut: flytande och dubbla variabler har NaN (Inte ett nummer) String värden använder den tomma strängen, och char värden har karaktär\\uffff  (karaktär #65535, som är Unicodes värde för inte en karaktär) . Integer datatyper har inte inneboende saknade värdemarkörer.
* Om en integer variabel har ett saknat värde (Till exempel en tom position i en .csv-fil) ,ERDDAP™tolka värdet som det definierademissing\\_valueeller \\_FillValue för den där variabeln. Om ingen definieras,ERDDAP™tolkar värdet som standardvärdet för datatypen, vilket alltid är det maximala värdet som kan hållas av datatypen:
127 för bytesvariabler, 32767 för kort, 2147483647 för int, 9223372036854775807 länge,
255 för ubyte, 65535 för ushort, 4294967295 för salva, och 18446744073709551615 för ulong.
###### ADD \\_FillValue ATTRIBUTES??{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES??](#add-_fillvalue-attributes)  
Varje gångERDDAP™laddar en dataset, kontrollerar den om variablerna med integerkälldatatyper har en definieradmissing\\_valueeller \\_FillValue attribut. Om en variabel inte gör det, dåERDDAP™Skriver ett meddelande till loggfilen (Börja med "Lägg till \\_FillValue Attribute?") rekommendera attERDDAP™administratören lägger till en \\_Fill Värdeattribut för denna variabel idatasets.xml. Det är mycket användbart för varje variabel att ha en \\_FillValue ellermissing\\_valueeftersom saknade värden alltid är möjliga, t.ex. om en viss fil i en datamängd inte har en viss variabel.ERDDAP™måste kunna presentera den variabeln som att ha alla saknade värden för den variabeln. Om du bestämmer en variabel ska inte ha en \\_FillValue-attribut kan du lägga till
    &lt;Att namn = "\\_FillValue"&gt;null&lt;/att&gt; I stället, som kommer att undertrycka meddelandet för detdatasetID+variabel kombination i framtiden.
    
Varje gångERDDAP™startar, det samlar alla dessa rekommendationer i ett meddelande som är skrivet till loggfilen (Börjar med "ADD \\_FillValue ATTRIBUTES?") mailade tillERDDAP™administratör och skriven till en CSV-datafil i\\[bigParentDirectory\\]/loggar/katalog. Om du vill kan du använda GenerateDatasetsXml-programmet (och alternativet AddFillValueAttributes) att tillämpa alla förslag i CSV-filen pådatasets.xmlfil. För någon avdatasetID/variabla kombinationer i den filen, om du bestämmer att det inte finns något behov av att lägga till den tilldelade, kan du ändra attributet till&lt;Att namn = "\\_FillValue"&gt;null&lt;/att&gt; för att undertrycka rekommendationen för detdatasetID+variabel kombination i framtiden.
    
Detta är viktigt&#33;
Bob har ofta sagt: det skulle vara dåligt (och pinsamt) om några av bevisen för global uppvärmning orsakades av oidentifierade saknade värden i datan (t.ex. temperaturvärden på 99 eller 127 grad C som borde ha markerats som saknade värden och därmed skevade medel- och medianstatistiken högre) .

* FillValue ochmissing\\_valuevärden för en viss variabel i olika källfiler måste vara konsekventa; annars,ERDDAP™kommer att acceptera filer med en uppsättning värden och avvisa alla andra filer som "Bad Files". För att lösa problemet,
    * Om filerna är ruttna.ncfiler, du kan använda[EDDGridFrånNcFilesUnpacked](#eddgridfromncfilesunpacked).
    * Om filerna är tabelldatafiler kan du använda EDDTableFrån...Files "[Standardisera Vad är vad](#standardizewhat)Att berättaERDDAPStandardisera källfilerna när de läses inERDDAP.
    * För svårare problem kan du använda[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)För att lösa problemet.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (Standard = 1) och **add\\_offset**   (Standard = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)och[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) är OPTIONAL-variabla attribut som beskriver data som är packade i en enklare datatyp via en enkel omvandling.
    * I förekommande fall skiljer sig deras datatyp från källdatatypen och beskriver datatypen av destinationsvärdena.
Till exempel kan en datakälla ha lagrat flytdatavärden med en decimalsiffrig fylld som korta myror. (Int16) Användascale\\_factor= 0,1 ochadd\\_offset= 0. Till exempel,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

I detta exempel,ERDDAP™skulle packa upp data och presentera den för användaren som flytande datavärden.
    * Om närvarande,ERDDAP™kommer att extrahera värdena från dessa attribut, ta bort attributen och automatiskt packa upp data för användaren:
destination destination Värde = källa Värde \\*scale\\_factor+ + +add\\_offset  
Eller en annan väg:
unpackedValue = packad Värde \\*scale\\_factor+ + +add\\_offset
    * ochscale\\_factorochadd\\_offsetvärden för en viss variabel i olika källfiler måste vara konsekventa; annars,ERDDAP™kommer att acceptera filer med en uppsättning värden och avvisa alla andra filer som "Bad Files". För att lösa problemet,
        * Om filerna är ruttna.ncfiler, du kan använda[EDDGridFrånNcFilesUnpacked](#eddgridfromncfilesunpacked).
        * Om filerna är tabelldatafiler kan du använda EDDTableFrån...Files "[Standardisera Vad är vad](#standardizewhat)Att berättaERDDAPStandardisera källfilerna när de läses inERDDAP.
        * För svårare problem kan du använda[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)För att lösa problemet.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (från[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata standard) är en RECOMMENDED variabel attribut iERDDAP. CF upprätthåller listan över tillåtna[CF-standardnamn](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Till exempel,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Om du lägger tillstandard\\_nametill variablernas attribut och lägga tillstandard\\_nametill listan över&lt;categoryAttributes&gt; &gt; &gt; &gt; &gt; in iERDDAP"S[setup.xml](/docs/server-admin/deploy-install#setupxml)fil, användare kan enkelt hitta dataset med liknande data viaERDDAP"Sök för datamängder efter kategori" på hemsidan.
    * Om du anger en CFstandard\\_nameFör en variabel behöver enheternas attribut för variabeln inte vara identisk med de kanoniska enheter som anges för standardnamnet i tabellen CF Standard Name, men enheterna måste vara konvertibla till de kanoniska enheterna. Till exempel alla temperaturrelaterade CFstandard\\_nameHar "K" (Kelvin) som kanoniska enheter. Så en variabel med en temperaturrelateradstandard\\_nameMÅSTE ha enheter av K, grad\\_C, grad\\_F, eller vissa UDUnits variant av dessa namn, eftersom de är alla interkonvertibla.
    * Bästa praxis: En del av kraften i[kontrollerade ordförråd](https://en.wikipedia.org/wiki/Controlled_vocabulary)kommer från att använda endast villkoren i listan. Så vi rekommenderar att du håller fast vid de villkor som anges i det kontrollerade ordförrådet, och vi rekommenderar att du gör en term om det inte finns en lämplig i listan. Om du behöver ytterligare villkor, se om standardkommittén lägger till dem i det kontrollerade ordförrådet.
    *   standard\\_namevärden är de enda CF-attributvärden som är fallkänsliga. De är alltid alla lägre. Börjar iERDDAP™v1.82, GenerateDatasets kommer att konvertera övre bokstäver till nedre bokstäver. Och när en dataset laddas inERDDAPÖvre bokstäver är tyst ändrade till nedre bokstäver.
         
###### time\\_precision {#time_precision} 
*   time\\_precisionär ett OPTIONAL attribut som används avERDDAP™  (och inga metadatastandarder) För[tid och timestamp variabler](#time-units), som kan vara i ruttna datamängder eller tabelldatamängder, och iaxisVariableellerdataVariables. Till exempel,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisionspecificerar den precision som ska användas när som helstERDDAP™formaterar tidsvärdena från den variabeln som strängar på webbsidor, inklusive.htmlTablesvar. I filformat därERDDAP™formatera tider som strängar (till exempel .csv och.json) ,ERDDAP™endast användertime\\_precision-specificerat format om det innehåller fraktionella sekunder; annarsERDDAP™använder 1970-01-01T00:00:00 Z-format.
* Giltiga värden är 1970-01, 1970-01-01, 1970-01-01T00Z, 1970-01-01T00:00Z, 1970-01-01T00:00:00Z (Default) 1970-01-01T00:00:00.0Z, 1970-01-01T00:00.00Z, 1970-01-01T00:00:00.000Z.\\[1970 är inte ett alternativ eftersom det är ett enda nummer, såERDDAP™Kan inte veta om det är en formaterad tidssträng (Ett år) Eller om det är några sekunder sedan 1970-01-01T00:00:00Z.\\]
* Omtime\\_precisioninte anges eller värdet inte matchas, standardvärdet kommer att användas.
* Här, som i andra delar avERDDAP™Alla fält av den formaterade tiden som inte visas antas ha minimivärdet. Till exempel 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z och 1985-07-01T00:00:00 Z anses alla vara likvärdiga, men med olika nivåer av precision underförstådd. Detta matchar[ISO 8601:2004"extended"Time Format Specifikation](https://www.iso.org/iso/date_and_time_format).
*    **Varning:** Du bör endast använda en begränsadtime\\_precisionom **Alla alla** datavärdena för variabeln har endast det minsta värdet för alla fält som är dolda.
    * Du kan till exempel använda entime\\_precision1970-01-01 om alla datavärden har timme = 0, minut = 0 och andra = 0 (till exempel 2005-03-04T00:00:00Z och 2005-03-05T00:00:00Z) .
    * Använd till exempel inte entime\\_precisionav 1970-01-01 om det finns icke-0 timmar, minut eller sekunder värden, (till exempel 2005-03-05T12:00:00Z) eftersom icke-standardtimmarsvärdet inte skulle visas. Annars, om en användare ber om all data med tid = 2005-03-05, kommer begäran att misslyckas oväntat.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneär ett OPTIONAL attribut som används avERDDAP™  (och inga metadatastandarder) För[tid och timestamp variabler](#time-units), som kan vara i ruttna datamängder eller tabelldatamängder.
    * Standarden är "Zulu" (som är den moderna tidszonversionen av GMT) .
    * Bakgrundsinformation: "time offsets" (t.ex. Pacific Standard Time, -08:00, GMT-8) är fasta, specifika, kompensationer i förhållande tillZulu  (GMT) . Däremot är "tidszoner" de mycket mer komplexa saker som påverkas av Daylight Saving. (t.ex. ”USA/Stillahavsområdet”) , som har haft olika regler på olika ställen vid olika tidpunkter. Tidszonerna har alltid namn eftersom de inte kan sammanfattas med ett enkelt kompensationsvärde. (se kolumnen "TZ-databasnamn" i tabellen vid[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .ERDDAP"Stime\\_zoneattribut hjälper dig att hantera lokala tidsdata från någon tidszon (1987-03-25T17:32:05 Stilla havet Tid) . Om du har sträng- eller numeriska tidsdata med en (Fast) tidskompensation, du bör helt enkelt justera data tillZulu  (Vilket är vadERDDAP™Önskar) genom att ange en annan bastid i attributet enheter (t.ex. "timmar sedan 1970-01-01T08:00:00Z", notera T08 för att ange tidskompensationen) och alltid kontrollera resultaten för att säkerställa att du får de resultat du vill ha.
    * För tidsstämpelvariabler med källdata från Strings, låter detta attribut dig ange en tidszon som lederERDDAP™Omvandla lokala tidszonens källtider (Några i standardtid, några i dagsljus spara tid) in iZulugånger (som alltid är i standardtid) . Listan över giltiga tidszonnamn är förmodligen identisk med listan i TZ-kolumnen på[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Vanliga amerikanska tidszoner är: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern.
    * För tidsstämpelvariabler med numeriska källdata kan du ange "time\\_zoneattribut, men värdet måste vara "Zulueller "UTC". Om du behöver stöd för andra tidszoner, vänligen maila Chris. John på noaa.gov.
         
###### enheter{#units} 
*   [ **enheter** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)och[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) definierar enheterna i datavärdena. Till exempel,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "enheter" är REQUIRED som antingen en källaAttribute eller en addAttribute för"time"variabler och är starkt rekommenderade för andra variabler när det är lämpligt (som nästan alltid är) .
    * I allmänhet rekommenderar vi[UDUnits](https://www.unidata.ucar.edu/software/udunits/)Kompatibla enheter som krävs av[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)och[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standarder.
    * En annan vanlig standard är[UCUM](https://unitsofmeasure.org/ucum.html)Den enhetliga koden för mätenheter.[OGC](https://www.ogc.org/)tjänster som[SOS](https://www.ogc.org/standards/sos),[WCS](https://www.ogc.org/standards/wcs)och[WMS](https://www.ogc.org/standards/wms)kräver UCUM och hänvisar ofta till UCUM som UOM (Enheter av Mätning) .
    * Vi rekommenderar att du använder en enhetsstandard för alla datamängder i dinERDDAP. Du bör berättaERDDAP™vilken standard du använder med&lt;enheter\\_standard&gt;, i din[setup.xml](/docs/server-admin/deploy-install#setupxml)fil.
    * Enheten för en viss variabel i olika källfiler måste vara konsekvent. Om du har en samling datafiler där en delmängd av filerna använder olika enheter värden än en eller flera andra delmängder av filerna (till exempel,
Dagar sedan 1985-01-01 kontra "dagar sedan 2000-01-01",
"degree\\_Celsius" kontra "deg\\_C", eller
"knots" jämfört med "m/s") måste du hitta ett sätt att standardisera enheternas värden, annars.ERDDAP™kommer bara att ladda en delmängd av filerna. Tänk på det: om en fil har windSpeed-enheter = knots och en annan har windSpeed-enheter = m / s, bör värdena från de två filerna inte inkluderas i samma aggregerade dataset.
        * Om filerna är ruttna.ncfiler, i många situationer du kan använda[EDDGridFrånNcFilesUnpacked](#eddgridfromncfilesunpacked).
        * Om filerna är tabelldatafiler kan du i många situationer använda EDDTableFrån...Files "[Standardisera Vad är vad](#standardizewhat)Att berättaERDDAPStandardisera källfilerna när de läses inERDDAP.
        * För svårare problem kan du använda[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)För att lösa problemet.
    * CF-standarden 8.1 säger att om en variabels data är packad via[scale\\_factoroch/elleradd\\_offset](#scale_factor)"En variabels enheter bör vara representativa för de oförpackade uppgifterna."
    *   [För tid och tidsstämpel variabler,](#time-units)antingen variabelns[sourceAttributes](#variable-addattributes)eller&lt;addAttributes&gt; &gt; &gt; &gt; &gt; (som tar företräde) Måste ha[enheter](#units)som är antingen
        
        * För tidsaxelvariabler eller tidsdatavariabler med numeriska data:[UDUnits](https://www.unidata.ucar.edu/software/udunits/)Kompatibel sträng (med formatet *enheter* sedan dess *bastid* ) beskriva hur man tolkar källtidsvärden (till exempel sekunder sedan 1970-01-01T00:00:00Z) .
            
         *enheter* Kan vara någon av:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Tekniskt,ERDDAP™Följ INTEUDUNITSstandard vid omvandling"years since"och"months since"Tidsvärden till"seconds since". ochUDUNITSstandard definierar ett år som ett fast, enskilt värde: 3.15569259747e7 sekunder. ochUDUNITSdefinierar en månad som år/12. Tyvärr, de flesta / alla datamängder som vi har sett den användningen"years since"eller"months since"tydligt avser de värden som ska vara kalenderår eller kalendermånader. Till exempel 3"months since 1970-01-01"är vanligtvis avsedd att betyda 1970-04-01. Så,ERDDAP™tolkar"years since"och"months since"som kalenderår och månader och följer inte striktUDUNITSstandard.
            
och *bastid* måste vara en ISO 8601:2004 (E E E E) formaterad datum tidssträng (yyyy-MM-dd"T'H:mm:ssZ, till exempel 1970-01-01T00:00:00Z) eller någon variant av det (till exempel med delar som saknas i slutet) .ERDDAP™försöker arbeta med ett brett spektrum av variationer i det ideala formatet, till exempel "1970-1 0:0:0" stöds. Om tidszoninformation saknas antas det varaZuluTidszon (AKA GMT) . Även om en annan tid kompenseras,ERDDAP™Använd aldrig Daylight Saving Time. Om bastid använder något annat format måste du använda&lt;addAttributesför att ange en ny enhetssträng som använder en variant av ISO 8601:2004 (E E E E) format (t.ex. bytesdagar sedan 1 januari 1985 till dagar sedan 1985-01-01.
        
Du kan testaERDDAPförmåga att hantera en specifik *enheter* sedan dess *bastid* medERDDAP"S[Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). Förhoppningsvis kan du koppla in ett tal (första gången värdet från datakällan?) och en enhet sträng, klicka på Konvertera, ochERDDAP™kommer att kunna konvertera den till en ISO 8601:2004 (E E E E) formaterad datum tidssträng. Konverteraren kommer att returnera ett felmeddelande om enhetens sträng inte är igenkännbar.

###### String Time Units{#string-time-units} 
*   [För enheterna attribut för tid eller tidsstämpel data variabler med String data,](#string-time-units)Du måste ange en[Java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)Mönster (som är mestadels kompatibel med java.text. SimpleDateFormat) som beskriver hur man tolkar strängtiderna.
    
För vanliga tidsformat som är varianter av ISO 8601:2004 (E E E E) Standardformat (till exempel 2018-01-02T00:00:00Z) Du kan ange variationer avyyyy-MM-ddT'H:mm:ssZ, till exempel, användyyyy-MM-ddom strängtiden bara har ett datum. För alla format som börjar med yyyy-M,ERDDAPanvänder en speciell parser som är mycket förlåtande av mindre variationer i formatet. Parsern kan hantera tidszoner i formatet "Z", "UTC", "GMT", ±XX:XX, ±XXX och ±XX-format. Om delar av datumtiden inte anges (Till exempel minuter och sekunder) ,ERDDAP™förutsätter det lägsta värdet för det fältet (t.ex., om sekunder inte anges, antas sekunder = 0) .
    
För alla andra strängtidsformat måste du exakt ange en DateTimeFormatter-kompatibel tidsformatsträng. som liknaryyyy-MM-dd"T'H:mm:ssZ, dessa formatsträngar är byggda av tecken som identifierar en specifik typ av information från tidssträngen, t.ex. m betyder minut-of-timme. Om du upprepar formatkaraktären ett antal gånger, förfinar den ytterligare betydelsen, t.ex., m innebär att värdet kan specificeras med ett antal siffror, mm betyder att värdet måste anges med 2 siffror. ochJavaDokumentation för DateTimeFormatter är en rå översikt och gör inte dessa detaljer tydliga. Så här är en lista över formatkaraktärsvariationer och deras mening inomERDDAP™  (som ibland är något annorlunda änJavaDateTimeFormatter) Från:
    
    |Karaktärer|Exempel|Betydelse|
    |-----|-----|-----|
    |u, y, Y|\\-4712, 0, 1, 10, 100, 2018|Ett årsnummer, ett antal siffror.ERDDAP™behandlar y (År-of-era) och Y (veckobaserat år, eftersom detta ofta felaktigt används istället för y) som u,[astronomiskt årsnummer](https://en.wikipedia.org/wiki/Astronomical_year_numbering). Astronomiska år är positiva eller negativa heltal som inte använder BCE (BC) eller CE (AD) era designatorer: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1= 2BCE, -2=3BCE, ...|
    |uuuu, yyyy, YYYY|\\-4712, 0000, 0001, 0010, 0100, 2018|ett 4-siffrigt astronomiskt årsnummer (Ignorera alla föregående "-")  |
    |M M M M M M M|1, 01, 12|ett månadsnummer, ett antal siffror (1=januari)  |
    |MM|01, 12|En 2 digit (noll vadderade) månadsnummer|
    |MMM|Jan, Jan, JAN|3 bokstäver Engelska månaden namn, fall okänslig|
    |MMMM|Jan, jan, JAN, januari, january, JANUARY|3 bokstäver eller fullständigt engelsk månad namn, fall okänslig|
    |d d d d d d|1, 01, 31|ett dag-of-month-nummer, ett antal siffror|
    |dd|01, 31|En 2 digit (noll vadderade) Dag-of-month. Den första "siffran" kan vara ett utrymme.|
    |D D D D D|1, 001, 366|dag-of-year, ett antal siffror, 001=Jan 1|
    |DDD|001, 366|dag-of-year, 3 siffror, 001=Jan 1|
    |EEE|Du, du, Thu|3 bokstäver per vecka, värde ignoreras när parsing|
    |EEEE|Du, Thu, thursday, TORSDAG, torsdag|3 bokstäver eller full engelska dag-of-week, fall okänslig, värde ignoreras när parsing|
    |Hälften H|0, 00, 23|H timme-of-day (0-23) Varje antal siffror|
    |HH HH|00, 23|HH timme-of-day (00-23) 2 siffror. Den första "siffran" kan vara ett utrymme.|
    |en|AM, pm, PM|AM eller PM, case-insensitive|
    |Höjd|12, 1, 01, 11|Klocka-timme-of-am-pm (12, 1, 2, 11) Varje antal siffror|
    |Hhhh|12, 01, 11|Klocka-timme-of-am-pm (12, 1, 2, 11) 2 siffror. Den första "siffran" kan vara ett utrymme.|
    |Källa K|0, 1, 11|Tim-of-am-pm (0, 1, ...11) Varje antal siffror|
    |KK|00, 01, 11|Tim-of-am-pm, 2 siffror|
    |m m m m|0, 00, 59|minute-of-hour, vilket antal siffror|
    |mm mm mm|00, 59|Minut-of-timme, 2 siffror|
    |s|0, 00, 59|sekund-of-minute, vilket antal siffror|
    |ss|00, 59|Andra-of-minuten, 2 siffror|
    |SS S|0, 000, 9, 999|fraktion-of-second, som om du följer en decimal punkt, ett antal siffror|
    |SS|00, 99|hundradelar av en sekund, 2 siffror|
    |SSS|000, 999|tusentals sekunder, 3 siffror|
    |Ett|0, 0000, 86399999|millisekund-of-day, alla siffror|
    |AAAAAA|000 000, 86399999|millisekund-of-day, 8 siffror|
    |N|0, 00000000000000, 86399999999999|nanosecond-of-day, vilket antal siffror. InomERDDAP™Detta är truncated till nMillis.|
    |NNNNNNNNNNNNN|000 000 000 000, 86399999999999|Nanosecond-of-day, 14 siffror. InomERDDAP™Detta är truncated till nMillis.|
    |n|0 00000000000, 59999999999|nanosecond-of-second, vilket antal siffror. InomERDDAP™Detta är truncated till nMillis.|
    |Nnnnnn|000 000 000, 59999999999|nanosecond-of-second, 11 siffror. InomERDDAP™Detta är truncated till nMillis.|
    |XXX, ZZZ|Z, -08:00, +01:00|en tidszon med formatet "Z" eller ± (2 digit hour offset) Från: (2 digital minut offset) . Detta behandlar *Utrymme* som + (icke-standard) . ZZ stöder "Z" är icke-standard men hanterar ett vanligt användarfel.|
    |XX, ZZ|Z -0800, +0100|en tidszon med formatet "Z" eller ± (2 digit hour offset) Från: (2 digital minut offset) . Detta behandlar *Utrymme* som + (icke-standard) . ZZ stöder "Z" är icke-standard men hanterar ett vanligt användarfel.|
    |X, Z|Z, -08, +01|en tidszon med formatet "Z" eller ± (2 digit hour offset) Från: (2 digital minut offset) . Detta behandlar *Utrymme* som + (icke-standard) . Z som stöder Z är icke-standard men hanterar ett vanligt användarfel.|
    |xxx|08:00, +01:00|en tidszon med formatet ± (2 digit hour offset) Från: (2 digital minut offset) . Detta behandlar *Utrymme* som + (icke-standard) .|
    |xxx|\\-0800, +0100|en tidszon med formatet ± (2 digit hour offset)  (2 digital minut offset) . Detta behandlar *Utrymme* som + (icke-standard) .|
    |x x x x x|\\-08, +01|en tidszon med formatet ± (2 digit hour offset) . Detta behandlar *Utrymme* som + (icke-standard) .|
    |"|"T", "Z", "GMT"|start och slut på en serie bokstavliga tecken|
    |" " (Två enda citat)  |" "|Två enda citat betecknar en bokstavlig enda citat|
    | \\[\\] | \\[ \\] |start ("\\[") och slut ("\\]") av ett valfritt avsnitt. Denna notation stöds endast för bokstavliga tecken och i slutet av formatsträngen.|
    |#, &#123;, &#125;|#, &#123;, &#125;|reserverad för framtida användning|
    |G,L,Q,e,c,V,z,O,p|     |Dessa formateringstecken stöds avJavaDateTimeFormatter, men för närvarande inte stöds avERDDAP. Om du behöver stöd för dem, e-post Chris. John på noaa.gov.|
    
Anteckningar:
    
    * I en datumtid med punktering kan numeriska värden ha ett varierande antal siffror (t.ex. i det amerikanska slash-datumformatet "1/2/1985", månaden och datumet kan vara 1 eller 2 siffror) formatet måste använda 1-brev tokens, t.ex. M/d/yyyy, som accepterar ett antal siffror för månad och datum.
    * Om antalet siffror för ett objekt är konstant, t.ex. 01/02/1985, ange sedan antalet siffror i formatet, t.ex. MM/dd/yyyy för 2-siffrig månad, 2-siffrigt datum och 4-siffrigt år.
    * Dessa format är svåra att arbeta med. Ett visst format kan fungera för de flesta, men inte alla, tidssträngar för en viss variabel. Kontrollera alltid att det format du anger fungerar som förväntat iERDDAPför alla en variabels tidssträngar.
    * När det är möjligt kommer GenerateDatasetXml att föreslå tidsformatsträngar.
    * Om du behöver hjälp med att skapa en formatsträng, vänligen e-post Chris. John på noaa.gov.

Huvudtidsdatavariabel (för tabular dataset) och huvudtidsaxeln variabel (för gridded datasets) erkänns av[destinationName](#destinationname)Tid. Deras enheter metadata måste vara en UDUnits-kompatibla enheter sträng för numeriska tidsvärden, t.ex. "dagar sedan 1970-01-01" (för tabular eller gridded datasets) eller[enheter som är lämpliga för strängtid](#string-time-units)t.ex. ”M/d/yyyyy” (för tabular dataset) .

Olika tidsenheter i olika Gridded.ncFiler - Om du har en samling rutnät.ncfiler där, för tidsvariabel, en delmängd av filerna använder olika tidsenheter än en eller flera andra delmängder av filerna, kan du använda[EDDGridFrånNcFilesUnpacked](#eddgridfromncfilesunpacked). Det omvandlar tidsvärden till"seconds since 1970-01-01T00:00:00Z"på lägre nivå, vilket döljer skillnaderna, så att du kan göra en datamängd från insamlingen av heterogena filer.

###### TimeStamp Variables{#timestamp-variables} 
[TimeStamp Variables](#timestamp-variables)----- Alla andra variabler (axisVariableellerdataVariablei enEDDGrideller EDDTable dataset) Kan vara en TimeStamp variabel. Timestamp variabler är variabler som har tidsrelaterade enheter och tidsdata, men har en&lt;destinationName&gt; annat än tid. TimeStamp-variabler beter sig som huvudtidsvariabeln genom att de konverterar källans tidsformat till"seconds since 1970-01-01T00:00:00Z"och/eller ISO 8601:2004 (E E E E) format).ERDDAP™erkänner tid Stamp variabler genom sin tidsrelaterade "[enheter](#units)metadata, som måste matcha detta vanliga uttryck\\[A-ZA-Z\\]+ + Since +\\[0-9\\].+” (för numeriska datum Tid, till exempel"seconds since 1970-01-01T00:00:00Z") eller vara ett datum Tidsformatsträng som innehåller "uuuu", "yyyy" eller "YYYY" (Till exempel, "yyyy-MM-dd"T'H:mm:ssZ") . Men vänligen använd fortfarandedestinationName "time"för huvuddatumet Tidsvariabel.

 **Kontrollera alltid ditt arbete för att vara säker på att tidsdata som dyker upp iERDDAP™är rätt tidsdata.** Att arbeta med tidsdata är alltid knepigt och felsökande.

Se[Mer information om tidsvariabler](#destinationname).
ERDDAP™har ett verktyg för[Konvertera en numerisk Dags att/från en strängtid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
Se[Hur hurERDDAP™Erbjudanden med tiden](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** eller **valid\\_min** och **valid\\_max** ](#valid_range)----- Dessa är OPTIONAL-variabla attribut definierade i[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatakonventioner. Till exempel,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

eller

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Om så är fallet bör de vara av samma datatyp som variabeln och ange de giltiga minimi- och maximivärdena för den variabeln. Användare bör överväga värden utanför detta intervall för att vara ogiltiga.
    *   ERDDAP™inte tillämparvalid\\_range. Sagt ett annat sätt:ERDDAP™konverterar inte datavärden utanförvalid\\_rangetill \\_Fill Värde ellermissing\\_value.ERDDAP™Bara passerar på denna metadata och lämnar programmet upp till dig.
Varför? Det är vad denna metadata är för. Om dataleverantören hade velat kunde dataleverantören ha konverterat datavärdena utanförvalid\\_rangeAtt vara \\_FillValues.ERDDAP™gissar inte dataleverantören. Detta tillvägagångssätt är säkrare: om det senare visas attvalid\\_rangevar för smal eller på annat sätt felaktig,ERDDAP™har inte utplånat data.
    * Om data är packad med[scale\\_factoroch/elleradd\\_offset](#scale_factor),valid\\_range,valid\\_minochvalid\\_maxbör vara den förpackade datatypen och värdena. Sedan dessERDDAP™gällerscale\\_factorochadd\\_offsetnär den laddar datamängden,ERDDAP™kommer att packa uppvalid\\_range,valid\\_minochvalid\\_maxvärderingar så att destinationsmetadata (visas för användare) kommer att ange den packade datatypen och intervallet.
Eller om en unpackedvalid\\_rangeattribut är närvarande, det kommer att döpas omvalid\\_rangeNär närERDDAP™laddar dataset.
##### &lt;avlägsna MVRows & gt;{#removemvrows} 
* [Och [Gud] ** &lt;avlägsna MVRows&gt; ** ] (#Removemvrows) är en OPTIONAL tag inom en tag indatasets.xmlför EDDTableFromFiles (inklusive alla underklasser) datamängder, även om det endast används för EDDTableFromMultidimNcFiles. Det kan ha ett värde av sant eller falskt. Till exempel sant
Detta tar bort alla rader i slutet av en grupp där alla värden ärmissing\\_value, \\_FillValue, eller CoHort ...Array infödda saknade värde (char=#32 för CharArrays) . Detta är för CF DSG Multidimensional Array-filtyp och liknande filer. Om det är sant, gör detta rätt test och så alltid laddar alla max dim variabler, så det kan ta extra tid.
Standardvärdet är falskt.
Rekommendation - Om det är möjligt för din dataset rekommenderar vi att du ställer in removeMVRows till falskt. Inställning av removeMVRows till sant kan avsevärt sakta ner förfrågningar, men kan behövas för vissa datamängder.
