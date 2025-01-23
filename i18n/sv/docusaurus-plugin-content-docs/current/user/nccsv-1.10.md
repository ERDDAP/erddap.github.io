---
title: "NCCSV 1.10"
---

# NCCSV -
EttNetCDF-Compatible ASCII CSV File Specification,
Version 1.10

Bob Simons och Steve Hankin
"NCCSV" av Bob Simons och Steve Hankin är licensierad[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## [Introduktion](#introduction) {#introduction} 

Detta dokument anger ett ASCII CSV textfilformat som kan innehålla all information (metadata och data) som finns i enNetCDF .ncfil som innehåller en CSV-filliknande tabell över data. Filändelsen för en ASCII CSV textfil efter denna specifikation måste vara .csv så att den kan läsas enkelt och korrekt i kalkylprogram som Excel och Google Sheets. Bob Simons kommer att skriva programvara för att konvertera en NCCSV-fil till enNetCDF-3 (och kanske också enNetCDF-4)  .ncfil och det omvända, utan förlust av information. Bob Simons har ändrat[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)för att stödja läsning och skriva denna typ av fil.

NCCSV-formatet är utformat så att kalkylbladsprogram som Excel och Google Sheets kan importera en NCCSV-fil som en csv-fil, med all information i kalkylbladets celler redo för redigering. Eller kan ett kalkylblad skapas från grunden efter NCCSV-konventionerna. Oavsett källan till kalkylbladet, om det sedan exporteras som en .csv-fil, kommer det att överensstämma med NCCSV-specifikationen och ingen information kommer att gå förlorad. De enda skillnaderna mellan NCCSV-filer och analoga kalkylbladsfiler som följer dessa konventioner är:

* NCCSV-filer har värden på en linje separerad av kommatecken.
Spreadsheets har värden på en linje i angränsande celler.
* Strängar i NCCSV-filer är ofta omgivna av dubbla citat.
Strängar i kalkylblad är aldrig omgivna av dubbla citat.
* Interna dubbla citat (") I Strings i NCCSV-filer visas som 2 dubbla citat.
Interna dubbla citat i kalkylblad visas som 1 dubbel citat.

Se[Spreadsheet](#spreadsheets)sektion nedan för mer information.

### Streamable{#streamable} 
Liksom CSV-filer i allmänhet är NCCSV-filer strömbara. Således, om en NCSV genereras på flygningen av en dataserver som[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Servern kan börja strömma data till begäran innan alla data har samlats in. Detta är en användbar och önskvärd funktion.NetCDFfiler, däremot, är inte strömbara.

### ERDDAP™ {#erddap} 
Denna specifikation är utformad så att NCCSV-filer och.ncfiler som kan skapas från dem kan användas av en[ERDDAP™Dataserver](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (via[EDDTableFromNccsvFiles](/docs/server-admin/datasets#eddtablefromnccsvfiles)och[EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)Datasettyper) Men denna specifikation är extern tillERDDAP.ERDDAP™har flera erforderliga globala attribut och många rekommenderade globala och rörliga attribut, främst baserat på CF och ACDD-attribut (se
[/docs/server-admin/datasets#global-attributes](/docs/server-admin/datasets#global-attributes)).

### Balans{#balance} 
Utformningen av NCCSV-formatet är en balans mellan flera krav:

* Filerna måste innehålla alla data och metadata som skulle vara i en tabell.NetCDFfil, inklusive specifika datatyper.
* Filerna måste kunna läsas in och sedan skrivas ut ur ett kalkylblad utan förlust av information.
* Filerna måste vara lätta för människor att skapa, redigera, läsa och förstå.
* Filerna måste kunna entydigt parsed av datorprogram.

Om vissa krav i detta dokument verkar udda eller kräsna, är det förmodligen nödvändigt att uppfylla ett av dessa krav.

### Andra specifikationer{#other-specifications} 
Denna specifikation hänvisar till flera andra specifikationer och bibliotek som den är utformad för att arbeta med, men denna specifikation är inte en del av någon av dessa andra specifikationer, inte heller behöver den några ändringar av dem, och inte heller strider den mot dem. Om en detalj relaterad till en av dessa standarder inte anges här, se den relaterade specifikationen. I synnerhet inkluderar detta:

* Attributkonventionen för Dataset Discovery (ACDD) metadatastandard:
    [ https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3 ](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3).
* Klimat och prognos (CF) metadatastandard:
    [ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html).
* ochNetCDFAnvändarguide (NUG) Från:
    [ https:///docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
* ochNetCDFProgrambibliotek somNetCDF-java ochNetCDF-c:
    [ https://www.unidata.ucar.edu/software/netcdf/ ](https://www.unidata.ucar.edu/software/netcdf/). Dessa bibliotek kan inte läsa NCCSV-filer, men de kan läsa.ncfiler som skapats från NCCSV filer.
* JSON:[ https://www.json.org/ ](https://www.json.org/)

### Notation{#notation} 
I denna specifikation, fästen,\\[ \\]Beteckna valfria objekt.

## [Filstruktur](#file-structure) {#file-structure} 

En komplett NCCSV-fil består av två avsnitt: metadatasektionen, följt av datasektionen.

NCCSV-filer måste endast innehålla 7-bitars ASCII-karaktärer. På grund av detta kan teckenuppsättningen eller kodningen som används för att skriva och läsa filen vara någon teckenuppsättning eller kodning som är kompatibel med 7-bitars ASCII-karaktäruppsättningen, t.ex. ISO-8859-1.ERDDAP™Läser och skriver NCCSV-filer med ISO-8859-1-diagrammet.

NCCSV-filer kan använda antingen newline (\\n)   (som är vanligt på Linux och Mac OS X-datorer) eller vagnReturn plus newline (\\r\\n)   (som är vanligt på Windows-datorer) som end-of-line markörer, men inte båda.

### .nccsvMetadata{#nccsvmetadata} 
När både skaparen och läsaren förväntar sig det är det också möjligt och ibland användbart att göra en variant av en NCCSV-fil som bara innehåller metadatasektionen. (inklusive\\*END\\_METADATA\\*linje) . Resultatet ger en fullständig beskrivning av filens attribut, variabla namn och datatyper, vilket tjänar samma syfte som .das plus .dds svar från enOPeNDAPServer.ERDDAP™returnera denna variant om du begär fil Typ =.nccsvMetadata från enERDDAP™dataset.

## [Metadata-avsnittet](#the-metadata-section) {#the-metadata-section} 

I en NCCSV-fil använder varje rad av metadatasektionen formatet
[Variabel Namnnamn](#variablename),[attribut Namnnamn](#attributename),[värde1](#value)\\[värde2\\]\\[värde3\\]\\[värde4\\]\\[......\\]  
Utrymmen före eller efter objekt är inte tillåtna eftersom de orsakar problem när du importerar filen till kalkylprogram.

### Konventioner{#conventions} 
Den första raden av en NCCSV-fil är den första raden i metadatasektionen och måste ha en[\\*Global\\*](#global)Konventioner attribut som listar alla konventioner som används i filen som en sträng som innehåller en CSV-lista, till exempel:
\\*Global\\*"Konventioner"COARDSCF-1.6, ACDD-1.3, NCCSV-1.1
En av de konventioner som anges måste vara NCCSV-1.1, som hänvisar till den aktuella versionen av denna specifikation.

### End_METADATA{#end_metadata} 
Slutet på metadatasektionen i en NCCSV-fil måste betecknas med en linje med endast
\\*END\\_METADATA\\*

Det rekommenderas men inte krävs att alla attribut för en viss variabel visas på angränsande rader i metadatasektionen. Om en NCCSV-fil konverteras till enNetCDFfil, den ordning som variabelnNames först visas i metadata avsnittet kommer att vara ordning för variablerna iNetCDFfil.

Valfria tomma linjer är tillåtna i metadatasektionen efter den nödvändiga första raden med[\\*Global\\*](#global) [Konventioner](#conventions)Information om information (Se nedan) före den nödvändiga sista raden med\\*END\\_METADATA\\*.

Om ett kalkylblad skapas från en NCCSV-fil visas metadatasektionen med variabla namn i kolumn A, attributnamn i kolumn B och värden i kolumn C.

Om ett kalkylblad efter dessa konventioner sparas som en CSV-fil, kommer det ofta att finnas extra kommatecken i slutet av raderna i metadatasektionen. Programvaran som konverterar NCCSV-filer till.ncfiler ignorerar extra kommatecken.

### [Variabel Namnnamn](#variablename) {#variablename} 

 *Variabel Namnnamn* är det känsliga namnet på en variabel i datafilen. Alla variabla namn måste börja med ett 7-bitars ASCII-brev eller underscore och bestå av 7-bitars ASCII-brev, underscores och 7-bitars ASCII-siffror.
#### Global{#global} 
Den speciella variabeln[\\*Global\\*](#global)används för att beteckna globala metadata.

### [attribut Namnnamn](#attributename) {#attributename} 

 *attribut Namnnamn* är fallkänsliga namn på ett attribut som är associerat med en variabel eller[\\*Global\\*](#global). Alla attributnamn måste börja med ett 7-bitars ASCII-brev eller underscore och bestå av 7-bitars ASCII-brev, underlag och 7-bitars ASCII-siffror.

#### SCALAR{#scalar} 
Det speciella attributet Namnnamn\\*SCALAR\\*kan användas för att skapa en skalär datavariabel och definiera dess värde. Datatypen av\\*SCALAR\\*definierar datatypen för variabeln, så ange inte en\\*DATA\\_TYPE\\*attribut för skalära variabler. Observera att det inte får finnas data för skalävariabeln i datasektionen för NCCSV-filen.

Till exempel, för att skapa en skalär variabel som heter "skepp" med värdet "Okeanos Explorer" och en cf\\_role attribut, använd:
skepp,\\*SCALAR\\*"Okeanos Explorer"
skepp,cf\\_role,trajectory\\_id
När en skalär datavariabel läses inERDDAP™skalärvärdet omvandlas till en kolumn i datatabellen med samma värde på varje rad.

### [Värdevärde](#value) {#value} 

 *Värdevärde* är värdet av metadataattributet och måste vara en samling med en eller flera av antingen en byte, ubyte, kort, ushort, int, uint, long, ulong, float, dubbel, String eller char. Inga andra datatyper stöds. Attribut utan värde ignoreras. Om det finns mer än ett undervärde måste delvärdena alla vara av samma datatyp och separeras av kommatecken, till exempel:
sst,actual\\_range,0.17f,23.58f
Om det finns flera String-värden, använd en enda String med\\n  (Newline) tecken som skiljer substrings.

Definitionerna av attributdatatyperna är:

#### Byte{#byte} 
* byte attributvärden (8-bitars, signerad) måste skrivas med suffix "b", t.ex. -7b, 0b, 7b. Utbudet av giltiga bytesvärden är -128 till 127. Ett nummer som ser ut som en byte men är ogiltig (t.ex. 128b) konverteras till ett saknat värde eller generera ett felmeddelande.
    
#### ubyte{#ubyte} 
* ubyte attributvärden (8-bitars, osignerad) måste skrivas med suffix "ub", t.ex., 0ub, 7ub, 250ub. Utbudet av giltiga bytesvärden är 0 till 255. Ett nummer som ser ut som en ubyt men är ogiltig (t.ex. 256ub) konverteras till ett saknat värde eller generera ett felmeddelande. När det är möjligt, använd byte istället för ubyt, eftersom många system inte stöder osignerade byte (t.ex. attribut iNetCDF-3 filer) .
    
#### kort kort kort kort{#short} 
* korta attributvärden (16-bitars, signerad) måste skrivas med suffixet "s", t.ex. -30000s, 0s, 30000s. Utbudet av giltiga korta värden är -32768 till 32767. Ett nummer som ser ut som en kort men är ogiltig (32768) konverteras till ett saknat värde eller generera ett felmeddelande.
     
#### ushort{#ushort} 
* ushort attribut värden (16-bitars, osignerad) måste skrivas med suffixet "os", t.ex. 0us, 30000us, 60000us. Utbudet av giltiga korta värden är 0 till 65535. Ett nummer som ser ut som en ushort men är ogiltig (65536us) konverteras till ett saknat värde eller generera ett felmeddelande. När det är möjligt, använd kort istället för ushort, eftersom många system inte stöder osignerade byte. (t.ex. attribut iNetCDF-3 filer) .
     
#### Int{#int} 
* Int attribut värden (32-bitars, signerad) måste skrivas som JSON ints utan en decimal punkt eller exponent, men med suffix "i", t.ex. -12067978i, 0i, 12067978i. Utbudet av giltiga int värden är -2147483648 till 2147483647. Ett nummer som ser ut som en int men är ogiltig (2147483648i) konverteras till ett saknat värde eller generera ett felmeddelande.
     
#### uint{#uint} 
* Inga attributvärden (32-bitars, osignerad) måste skrivas som JSON ints utan en decimal punkt eller exponent, men med suffix "ui", t.ex. 0ui, 12067978ui, 4123456789ui. Utbudet av giltiga int värden är 0 till 4294967295. Ett nummer som ser ut som en salva men är ogiltig (t.ex. 2147483648ui) konverteras till ett saknat värde eller generera ett felmeddelande. När det är möjligt, använd int istället för salva, eftersom många system inte stöder osignerade byte (t.ex. attribut iNetCDF-3 filer) .
     
#### länge lång{#long} 
* långa attributvärden (64-bitars, undertecknad, som stöds av NUG ochERDDAP™men ännu inte stöds av CF) måste skrivas utan en decimal punkt och med suffix "L", t.ex. -12345678987654321L, 0L, 12345678987654321L. Om du använder konverteringsprogramvaran för att konvertera en NCCSV-fil med långa värden till enNetCDF-3 fil, alla långa värden konverteras till dubbla värden. Utbudet av giltiga långa värden är -9223372036854775808 till 9223372036854775807. Ett nummer som ser ut som ett långt men är ogiltigt (t.ex. 9223372036854775808L) konverteras till ett saknat värde eller generera ett felmeddelande. När det är möjligt, använd dubbla istället för ulong, eftersom många system inte stöder länge. (t.ex.,NetCDF-3 filer) .
     
#### ulong{#ulong} 
* ulong attributvärden (64-bitars, osignerad, som för närvarande stöds av NUG ochERDDAP™men ännu inte stöds av CF) måste skrivas utan en decimal punkt och med suffix "uL", t.ex. 0uL, 12345678987654321uL, 9007199254740992uL. Om du använder konverteringsprogramvaran för att konvertera en NCCSV-fil med långa värden till enNetCDF-3 fil, alla långa värden konverteras till dubbla värden. Utbudet av giltiga långa värden är 0 till 18446744073709551615. Ett nummer som ser ut som en ulong men är ogiltig (t.ex. 184467440737095516uL) konverteras till ett saknat värde eller generera ett felmeddelande. När det är möjligt, använd dubbla istället för ulong, eftersom många system inte stöder signerade eller osignerade länge. (t.ex.,NetCDF-3 filer) .
     
#### Flyta{#float} 
* Flytande attributvärden (32-bit) måste skrivas med suffixet "f" och kan ha en decimalpunkt och / eller en exponent, t.ex. 0f, 1f, 12.34f, 1e12f, 1.23e + 12f, 1.23e12f, 1.87E-7f. Använd NaNf för en flyt NaN (saknas) värde. Utbudet av flottor är ca +/-3.40282347E+38f (7 signifikanta decimala siffror) . Ett nummer som ser ut som en flyt men är ogiltig (t ex 1,0e39f) konverteras till ett saknat värde eller generera ett felmeddelande.
     
#### dubbel dubbel{#double} 
* Dubbla attributvärden (64-bit) måste skrivas med suffixet "d" och kan ha en decimalpunkt och / eller en exponent, t.ex. 0d, 1d, 12.34d, 1e12d, 1.23e + 12d, 1.23e12d, 1.87E-7d. Använd NaNd för en dubbel NaN (saknas) värde. Utbudet av dubblar är ca +/-1.79769313486231570E+308d (~15 betydande decimala siffror) . Ett nummer som ser ut som en dubbel men är ogiltig (t ex 1,0e309d) konverteras till ett saknat värde eller generera ett felmeddelande.
     
#### String{#string} 
* String attribut värden är en sekvens av UCS-2 tecken (2-byte Unicode-karaktärer, som iJava) , som måste skrivas som 7-bitars ASCII, JSON-liknande strängar så att icke-ASCII-tecken kan specificeras.
    * Dubbelcitat (") måste kodas som två dubbla citat (""") . Det är vad kalkylprogram kräver när du läser .csv-filer. Det är vad kalkylprogram skriver när du sparar ett kalkylblad som en .csv-fil.
    * De speciella JSON backslash-kodade tecknen måste kodas som i JSON (särskilt\\n(newline), men också θ (backslash), \f (formfeed), \\ t (tab), \\ r (vagnsavkastning) eller med[ðu *Hhhhh* ](#uhhhh)syntax. I ett kalkylblad, använd inte Alt Enter för att ange en ny linje i en textcell; Använd istället\\n  (2 tecken: backslash och 'n ") att ange en ny linje.
##### uhhhh {#uhhhh} 
    * ðu *hhh - Alla tecken mindre än tecken #32 eller större än karaktär #126, och inte på annat sätt kodade, måste kodas med syntaxen \\u* hhh*, där hhhh är det 4-siffriga hexadecimaltalet av karaktären, t.ex. Euro-tecknet är \\u20AC. Se de kodsidor som refereras på[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)för att hitta de hexadecimaltal som är associerade med specifika Unicode-tecken eller använda ett programbibliotek.
    * Om strängen har ett utrymme i början eller slutet, eller inkluderar " (Dubbel citat) eller ett kommatecken, eller innehåller värden som annars skulle tolkas som någon annan datatyp (t.ex. en int) , eller är ordet "null", hela strängen måste bifogas i dubbla citat; annars, till skillnad från JSON, är de inneslutande dubbla citat valfria. Vi rekommenderar: när du är osäker, omslut hela strängen i dubbla citat. Utrymmen i början eller slutet av en sträng är starkt avskräckta.
    * För närvarande är användningen av tecken större än #255 avskräckt. NCCSV stöder dem.ERDDAP™stöder dem internt. Vissa utdatafiltyper stöder dem (t.ex.,.jsonoch.nccsv) . Men många utdatafiltyper stöder dem inte. Till exempel,NetCDF3 filer stöder inte sådana tecken eftersomNetCDFfiler använder 1-byte tecken och CF för närvarande inte har ett system för att ange hur Unicode tecken är kodade iNetCDFSträngar (t.ex. UTF-8) . Detta kommer förmodligen att förbättras över tiden.
         
#### Char{#char} 
* char attribut värden är en enda UCS-2 tecken (2-byte Unicode-karaktärer, som iJava) , som måste skrivas som 7-bitars ASCII, JSON-liknande tecken så att andra tecken kan specificeras (se String definitionen ovan för kodning av speciella tecken, med tillägg av kodning ett enda citat som ") . Char attribut värden måste bifogas i enstaka citat (Inre citat) och dubbla citat (De yttre citat) t.ex. "a", """ (en dubbel citat karaktär) "\"""" (En enda citat karaktär) "\'t'" (En flik) "U20AC" (en Euro-karaktär) . Detta system med att använda enstaka och dubbla citat är udda och besvärliga, men det är ett sätt att skilja char värden från strängar på ett sätt som fungerar med kalkylblad. Ett värde som ser ut som en char men är ogiltigt kommer att generera ett felmeddelande. Som med strängar är användningen av tecken större än #255 för närvarande avskräckt.

### Suffix{#suffix} 
Observera att i attributen i en NCCSV-fil måste alla numeriska attributvärden ha ett suffixbrev (t.ex. ”b”) för att identifiera den numeriska datatypen (t.ex. byte) . Men i datasektionen av en NCCSV-fil får numeriska datavärden aldrig ha dessa suffix-brev. (Med undantag för "L" för långa heltal och "uL" för ulong integers) — datatypen specificeras av\\*DATA\\_TYPE\\*attribut för variabeln.

### DATA_TYPE{#data_type} 
Datatypen för varje icke-[Scalar](#scalar)Variabel måste specificeras av en\\*DATA\\_TYPE\\*attribut som kan ha ett värde av byte, ubyte, short, ushort, int, uint, long, ulong, float, dubbel, String eller char (fall okänslig) . Till exempel,
Qc\\_flag,\\*DATA\\_TYPE\\*Byte
VARNING: Anger rätt\\*DATA\\_TYPE\\*är ditt ansvar. Ange fel datatyp (t.ex. int när du ska ha specificerad flyt) kommer inte att generera ett felmeddelande och kan orsaka att information förloras (t.ex. flytvärden kommer att rundas till ints) När NCCSV-filen läses avERDDAP™eller omvandlas till enNetCDFfil.

### Char Discouraged{#char-discouraged} 
Användningen av char data värden avskräcks eftersom de inte allmänt stöds i andra filtyper. char värden kan skrivas i datasektionen som enskilda tecken eller som strängar (om du behöver skriva en speciell karaktär) . Om en sträng hittas kommer strängens första karaktär att användas som charens värde. Noll längd Strängar och saknade värden kommer att omvandlas till karaktär \\uFFF. Observera attNetCDFfiler stöder bara enstaka byteskar, så alla chars större än char #255 kommer att konverteras till "?" när du skriverNetCDFfiler. Om inte en charset attribut används för att ange en annan charset för en char variabel, ISO-8859-1 charset kommer att användas.

### Lång och osignerad uppmuntrad{#long-and-unsigned-discouraged} 
Även om många filtyper (t.ex.,NetCDF-4 och json) ochERDDAP™Stöd lång och osignerad (ubyte, ushort, uint, ulong) värden, användningen av långa och osignerade värden i NCCSV-filer avskräcks för närvarande eftersom de för närvarande inte stöds av Excel, CF ochNetCDF-3 filer. Om du vill ange långa eller osignerade värden i en NCCSV-fil (eller i motsvarande Excel-kalkylblad) Du måste använda suffixet "L" så att Excel inte behandlar siffrorna som flytande punktnummer med lägre precision. För närvarande, om en NCCSV-filer konverteras till enNetCDF-3.ncfil, långa och ulong datavärden kommer att omvandlas till dubbla värden, vilket orsakar en förlust av precision för mycket stora värden (mindre än -2 ^ 53 för länge, eller större än 2 ^ 53 för lång och ulong) . InomNetCDF-3.ncfiler, ubyte, ushort och uint variabler visas som byte, kort och int med \\_Unsigned=true metadata attribut. InomNetCDF-3.ncfiler, ubyte, ushort och uint attribut visas som byte, korta och inta attribut som innehåller motsvarande två-komplement värde (255ub visas som -1b) . Detta är uppenbarligen problem, så signerade datatyper ska användas istället för osignerade datatyper när det är möjligt.

### CF, ACDD ochERDDAP™Metadata{#cf-acdd-and-erddap-metadata} 
Eftersom det är tänkt att de flesta NCCSV-filer, eller.ncfiler som skapats av dem, läses inERDDAPDet rekommenderas starkt att NCCSV-filer inkluderar metadataattribut som krävs eller rekommenderas avERDDAP™(se)
[/docs/server-admin/datasets#global-attributes](/docs/server-admin/datasets#global-attributes)). attributen är nästan alla från CF- och ACDD-metadatastandarderna och tjänar till att korrekt beskriva datamängden. (vem, vad, när, var, varför, hur) till någon som annars inte vet något om datamängden. Av särskild betydelse, nästan alla numeriska variabler bör ha en enhet attribut med enUDUNITS-kompatibelt värde, t.ex.
sst,units,degree\\_C

Det är bra att inkludera ytterligare attribut som inte är från CF- eller ACDD-standarder eller frånERDDAP.

## [Dataavsnittet](#the-data-section) {#the-data-section} 

### [Struktur](#structure) {#structure} 

Den första raden i datasektionen måste ha en fallkänslig, komma-separerad lista över variabla namn. Alla variabler i denna lista måste beskrivas i metadatasektionen och vice versa (annat än[\\*Global\\*](#global)attribut och[\\*SCALAR\\*](#scalar)variabler) .

Den andra genom de penultimerade raderna i datasektionen måste ha en komma-separerad lista över värden. Varje rad av data måste ha samma antal värden som den sammanslagna listan över variabla namn. Utrymmen före eller efter värden är inte tillåtna eftersom de orsakar problem när filen importeras till kalkylprogram. Varje kolumn i detta avsnitt måste endast innehålla värden för\\*DATA\\_TYPE\\*specificerad för den variabeln genom\\*DATA\\_TYPE\\*attribut för denna variabel. Till skillnad från i avsnittet attribut får numeriska värden i dataavsnittet inte ha suffix-brev för att beteckna datatypen. Till skillnad från i avsnittet attribut kan kartvärden i dataavsnittet utelämna de inneslutande enskilda citaten om de inte behövs för disambiguation. (Således måste "," och "\" citeras som visas här) . Det kan finnas ett antal av dessa datarader i en NCCSV-fil, men för närvarandeERDDAP™kan bara läsa NCCSV-filer med upp till cirka 2 miljarder rader. I allmänhet rekommenderas att du delar stora dataset i flera NCCSV-datafiler med färre än 1 miljon rader vardera.

#### End_DATA{#end_data} 
Slutet på datasektionen måste betecknas av en linje med endast
\\*END\\_DATA\\*

Om det finns ytterligare innehåll i NCCSV-filen efter\\*END\\_DATA\\*rad, det kommer att ignoreras när NCCSV-filen konverteras till en.ncfil. Sådant innehåll avskräcks därför.

I ett kalkylblad efter dessa konventioner kommer de variabla namnen och datavärdena att finnas i flera kolumner. Se exemplet nedan.

### [Saknade värderingar](#missing-values) {#missing-values} 

Numeriska saknade värden kan skrivas som ett numeriskt värde som identifieras av ettmissing\\_valueeller \\_FillValue attribut för den där variabeln. Se till exempel det andra värdet på denna datarad:
Bell M. Shimada,99 123.4
Detta är det rekommenderade sättet att hantera saknade värden för byte, ubyte, short, ushort, int, uint, long och ulong variabler.

Flotta eller dubbla NaN-värden kan skrivas som NaN. Se till exempel det andra värdet på denna datarad:
Bell M. Shimada,NaN,123.4

String och numeriska saknade värden kan anges av ett tomt fält. Se till exempel det andra värdet på denna datarad:
Bell M. Shimada, 123.4

För byte, ubyte, short, ushort, int, uint, long och ulong variabler, NCCSV omvandlare verktyg ochERDDAP™omvandla ett tomt fält till det maximala tillåtna värdet för datatypen (t.ex. 127 för byte) . Om du gör detta, var noga med att lägga till enmissing\\_valueeller \\_FillValue-attribut för den variabeln för att identifiera detta värde, t.ex.
 *Variabel Namnnamn* FillValue,127b
För flotta och dubbla variabler konverteras ett tomt fält till NaN.

### [DateTime värderingar](#datetime-values) {#datetime-values} 

DateTime värden (inklusive datumvärden som inte har en tidskomponent) kan representeras som nummer eller som strängar i NCCSV-filer. En viss datum Tidsvariabel kan endast ha strängvärden eller endast numeriska värden, inte båda. NCCSV-programvaran kommer att konvertera String dateTime-värden till numeriskt datum Tidsvärden när man skapar.ncfiler filer (som krävs av CF) . String dateTime värden har fördelen av att lätt läsas av människor.

DateTime värden som representeras som numeriska värden måste ha en enhet attribut som anger " *enheter* sedan dess *Datum Tid* som krävs av CF och specificeras avUDUNITSt.ex.,
tid, enheter, sekunder sedan 1970-01-01T00:00:00Z

Datumtidsvärden som representeras som strängvärden måste ha en sträng\\*DATA\\_TYPE\\*attribut och en enhet attribut som anger ett datum Tidsmönster som specificeras avJavaDateTimeFormatter klass
 ([ https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html ](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)) . Till exempel,
tid, enheter,yyyy-MM-ddT'H:mm:ssZ
Alla datumTime-värden för en viss datavariabel måste använda samma format.
I de flesta fall kommer datumtidsmönstret du behöver för attributet enheter att vara en variant av ett av dessa format:

*   yyyy-MM-ddH:mm:ss. SSSZ – som är ISO 8601:2004 (E E E E) Datum Time format. Du kan behöva en förkortad version av detta, t.ex.yyyy-MM-ddT'H:mm:ssZ (Det enda rekommenderade formatet) elleryyyy-MM-dd. Om du ändrar formatet för dina datumTime-värden rekommenderar NCCSV starkt att du ändrar till detta format. (Kanske förkortas) . Detta är det format somERDDAP™Används när den skriver NCCSV-filer.
* yyyyMMddHmmss.SSS - som är den kompakta versionen av ISO 8601:2004 datum Time format. Du kan behöva en förkortad version av detta, t.ex. yyyyMMdd.
* M/d/yyy H:mm:ss. SSS - som hanterar US-stil datum och datumTimes som "3/23/2017 16:22:03.000". Du kan behöva en förkortad version av detta, t.ex. M/d/yyyy.
* yyyyDDHmmssSS – som är året plus årets nolldag (t.ex. 001 = Jan 1, 365 = Dec 31 i ett icke-skottår; detta kallas ibland felaktigt Julian datum) . Du kan behöva en förkortad version av detta, t.ex. yyyyDDD.

#### Precision{#precision} 
När ett programvarubibliotek konverterar en.ncfil i en NCCSV-fil, alla datum Tidsvärdena kommer att skrivas som strängar med ISO 8601:2004 (E E E E) Datum Tidsformat, t.ex. 1970-01-01T00:00:00Z. Du kan styra precisionen medERDDAP-specifik egenskaptime\\_precision. Se
[/docs/server-admin/datasets#time\\_precision](/docs/server-admin/datasets#time_precision).

#### Time Zone{#time-zone} 
Standardtidszonen för datum Tidsvärden ärZulu  (eller GMT) tidszon, som inte har några dagsljus spara tidsperioder. Om en dateTime-variabel har datumTime-värden från en annan tidszon måste du ange detta medERDDAP-specifik egenskaptime\\_zone. Detta är ett krav förERDDAP™(se)
[/docs/server-admin/datasets#time\\_zone](/docs/server-admin/datasets#time_zone)).

### [Degree Values](#degree-values) {#degree-values} 

Som krävs av CF, alla gradvärden (t.ex. för longitud och latitud) måste anges som decimal-graders dubbla värden, inte som en gradmin'sec "Sträng eller som separata variabler för grader, minuter, sekunder. Riktningsdesignatorerna N, S, E och W är inte tillåtna. Använd negativa värden för västerländska longitud och för sydliga breddgrader.

## [DSG Funktion Typer](#dsg-feature-types) {#dsg-feature-types} 

En NCCSV-fil kan innehålla CF diskret sampling geometri
 ([ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) data. Det är attributen som gör detta arbete:

1. Som krävs av CF måste NCCSV-filen innehålla en linje i metadatasektionen som identifierar[\\*Global\\*](#global) featureTypeattribut, t.ex.,
    \\*Global\\*,featureTypeTrajektor
2. För användning iERDDAP™NCCSV-filen måste innehålla en rad eller linjer i metadatasektionen som identifierar cf\\_role=...\\_id variabler, t.ex.
skepp,cf\\_role,trajectory\\_id
Detta är valfritt för CF, men krävs i NCCSV.
3. För användning iERDDAP™NCCSV-filen måste innehålla en rad eller linjer i metadatasektionen som identifierar vilka variabler som är associerade med varje timeSeries, bana eller profil som krävs enligtERDDAP™(se)
    [/docs/server-admin/datasets#cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)t.ex.,
    \\*Global\\*,cdm\\_trajectory\\_variables "ship"
eller
    \\*Global\\*,cdm\\_timeseries\\_variables,"station\\_id,lat,lon

## [Provfil](#sample-file) {#sample-file} 

Här är en provfil som visar många av funktionerna i en NCCSV-fil:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.1"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.10
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testByte,\\*DATA\\_TYPE\\*,byte
testByte,units,1
testUByte,\\*DATA\\_TYPE\\*,ubyte
testUByte,units,1
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
testULong,\\*DATA\\_TYPE\\*,ulong
testULong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'\\u20AC'"
sst,testStrings," a~,\\n'z""\\u20AC"
sst,testUBytes,0ub,127ub,255ub
sst,testUInts,0ui,2147483647ui,4294967295ui
sst,testULongs,0uL,9223372036854775807uL,18446744073709551615uL
sst,testUShorts,0us,32767us,65535us

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testByte,testUByte,testLong,testULong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-128, 0,-9223372036854775808L,0uL,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,0,127,-9007199254740992L,9223372036854775807uL,10.0
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",126,254,9223372036854775806L,18446744073709551614uL,99
"Bell M. Shimada",2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",127,255,9223372036854775807L,18446744073709551615uL,NaN
```
Anteckningar:

* Denna provfil innehåller många svåra fall (t.ex. char och långa variabler och svåra String-värden) . De flesta NCCSV-filer kommer att vara mycket enklare.
* Licenslinjen är uppdelad i två rader här, men är bara en linje i provfilen.
* U20AC är kodningen av Euro-karaktären och \\u00FC är kodningen av ü.
* Många många Strängar i exemplet är inneslutna av dubbla citat trots att de inte behöver vara, t.ex. många globala attribut inklusive titeln, lonenheterna attributet och den tredje raden av data.)
* Det skulle vara tydligare och bättre om enheterna attribut för testLong-variabeln skrevs i dubbla citat som indikerar att det är ett strängvärde. Men den nuvarande representationen (1 utan citat) kommer att tolkas korrekt som en sträng, inte ett heltal, eftersom det inte finns något "i" suffix.
* Till skillnad från andra numeriska datatyper har de långa värdena i datasektionen suffixet. ("L") som identifierar deras numeriska datatyp. Detta krävs för att förhindra kalkylblad från att tolka värdena som flytande punktnummer och därmed förlora precision.

## [Spreadsheets](#spreadsheets) {#spreadsheets} 

I ett kalkylblad, som i en NCCSV-fil:

* Skriv numeriska attributvärden som anges för NCCSV-filer (t.ex., med ett suffixbrev, t.ex. "f" för att identifiera attributets datatyp) .
* I Strings, skriv alla tecken mindre än ASCII tecken #32 eller större än karaktär #126 som antingen en JSON-liknande backslashed karaktär (t.ex.,\\nför newline) eller som Hexadecimal Unicode-karaktärsnumret (fall okänslig) med syntax[ðu *Hhhhh* ](#uhhhh)  (t.ex. ðu20AC för Euro-tecknet) . Användning\\n  (2 tecken: backslash och 'n ") Ange en ny linje, inte Alt Enter.

De enda skillnaderna mellan NCCSV-filer och det analoga kalkylbladet som följer dessa konventioner är:

* NCCSV-filer har värden på en linje separerad av kommatecken.
Spreadsheets har värden på en linje i angränsande celler.
* Strängar i NCCSV-filer är ofta omgivna av dubbla citat.
Strängar i kalkylblad är aldrig omgivna av dubbla citat.
* Interna dubbla citat (") I Strings i NCCSV-filer visas som 2 dubbla citat.
Interna dubbla citat i kalkylblad visas som 1 dubbel citat.

Om ett kalkylblad efter dessa konventioner sparas som en CSV-fil, kommer det ofta att finnas extra kommatecken i slutet av många av linjerna. Programvaran som konverterar NCCSV-filer till.ncfiler ignorerar extra kommatecken.

### [Excel Excel Excel](#excel) {#excel} 

För att importera en NCCSV-fil till Excel:

1. Välj fil: Open.
2. Ändra filtypen till textfiler (\\*.prn;\\*.txt; \\*.csv) .
3. Sök katalogerna och klicka på NCCSV .csv-filen.
4. Klicka på Open.

För att skapa en NCCSV-fil från ett Excel-kalkylblad:

1. Välj fil: Spara som.
2. Ändra Spara som typ: att vara CSV (Comma avgränsad)   (\\*.csv) .
3. Som svar på kompatibilitetsvarningen klickar du på Ja.
4. Den resulterande .csv-filen kommer att ha extra kommatecken i slutet av alla rader än CSV-raderna. Du kan ignorera dem.

I Excel visas provet NCCSV-filen ovan som

![ProvExcel.png](/img/sampleExcel.png)

### [Google Sheets](#google-sheets) {#google-sheets} 

För att importera en NCCSV-fil till Google Sheets:

1. Välj fil: Open.
2. Välj att ladda upp en fil och klicka på Ladda upp en fil från din dator. Välj filen och klicka sedan på Öppna.
      
Eller välj My Drive och ändra filtypen nedåt val till Alla filtyper. Välj filen och klicka sedan på Öppna.

För att skapa en NCCSV-fil från ett Google Sheets-kalkylblad:

1. Välj fil: Spara som.
2. Ändra Spara som typ: att vara CSV (Comma avgränsad)   (\\*.csv) .
3. Som svar på kompatibilitetsvarningen klickar du på Ja.
4. Den resulterande .csv-filen kommer att ha extra kommatecken i slutet av alla rader än CSV-raderna. Ignorera dem.

## [Problem/varningar](#problemswarnings) {#problemswarnings} 

* Om du skapar en NCCSV-fil med en textredigerare eller om du skapar ett analogt kalkylblad i ett kalkylbladsprogram, kommer textredigeraren eller kalkylbladsprogrammet inte att kontrollera att du följde dessa konventioner korrekt. Det är upp till dig att följa dessa konventioner korrekt.
* Konvertering av ett kalkylblad efter denna konvention i en csv-fil (Således en NCCSV-fil) kommer att leda till extra kommatecken i slutet av alla rader än CSV-dataraderna. Ignorera dem. Programvaran konverterar sedan NCCSV-filer till.ncfiler ignorerar dem.
* Om en NCCSV-fil har överskridande kommatecken i slutet av raderna kan du ta bort dem genom att konvertera NCCSV-filen till enNetCDFfil och sedan konverteraNetCDFfil tillbaka till en NCCSV-fil.
* När du försöker konvertera en NCCSV-fil till enNetCDFfil, vissa fel kommer att upptäckas av programvaran och kommer att generera felmeddelanden, vilket gör att konverteringen misslyckas. Andra problem är svåra eller omöjliga att fånga och kommer inte att generera felmeddelanden eller varningar. Andra problem (t.ex. överflödiga kommatecken i slutet av rader) kommer att ignoreras. Filomvandlaren kommer endast att göra minimal kontroll av korrektheten av resultatetNetCDFfil, t.ex. när det gäller CF-efterlevnad. Det är filskaparens och filanvändarens ansvar att kontrollera att konverteringens resultat är lika önskade och korrekta. Två sätt att kontrollera är:
    * Skriv innehållet i.ncFil med ncdump
         ([ https://linux.die.net/man/1/ncdump ](https://linux.die.net/man/1/ncdump) ) .
    * Visa innehållet i data iERDDAP.

## [Förändringar](#changes) {#changes} 

* Förändringar Introducerad i v1.10 (april 2020) Från:
    * Tillagt stöd för ubyte, ushort, uint, ulong.
