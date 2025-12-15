---
title: "NCCSV 1.00"
---

# Billeder af NCCSV
A A A A A A NetCDF -Kompatibel ASCII CSV Fil specifikation,
Version 1.00

Bob Simons og Steve Hankin
"NCCSV" af Bob Simons og Steve Hankin er licenseret under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 

##  [Introduktion](#introduction)  {#introduction} 

Dette dokument angiver et ASCII CSV tekstfilformat, der kan indeholde alle oplysninger (metadata og data) der kan findes i en NetCDF   .nc fil, der indeholder en CSV-fil-lignende tabel af data. Filudvidelse for en ASCII CSV-fil efter denne specifikation skal være .csv, så den kan læses let og korrekt i regnearksprogrammer som Excel og Google Sheets. Bob Simons vil skrive software til at konvertere en NCCSV fil til en NetCDF -3 (og måske også en NetCDF -4)   .nc fil, og omvendt, uden tab af oplysninger. Bob Simons har ændret sig [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) at understøtte læsning og skrive denne type fil.

NCCSV-formatet er designet, så regnearkssoftware som Excel og Google Sheets kan importere en NCCSV-fil som en csv-fil, med alle oplysninger i regnearkets celler klar til redigering. Eller et regneark kan oprettes fra bunden efter NCCSV konventionerne. Uanset kilden til regnearket, hvis det derefter eksporteres som en .csv-fil, vil den i overensstemmelse med NCCSV-specifikationerne, og ingen oplysninger vil blive tabt. De eneste forskelle mellem NCCSV-filer og de analoge regnearksfiler, der følger disse konventioner, er:

* NCCSV filer har værdier på en linje adskilt af kommaer.
Spreadsheets har værdier på en linje i tilstødende celler.
* Strenge i NCCSV filer er ofte omgivet af dobbelte citater.
Strenge i regneark er aldrig omgivet af dobbelte citater.
* Interne dobbelttilbud (" " " ") i Strings i NCCSV filer vises som 2 dobbelte citater.
Interne dobbelttilbud i regneark vises som 1 dobbeltværelse.

Se billederne [Olieark](#spreadsheets) Klik her for flere oplysninger.

### Streambar{#streamable} 
Ligesom CSV-filer generelt, NCCSV-filer er streambare. Således, hvis en NCSV genereres på-flyet af en dataserver som f.eks. [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , serveren kan begynde at streame data til anmodningeren, før alle data er indsamlet. Dette er en nyttig og ønskelig funktion. NetCDF filer, med kontrast, er ikke streambare.

###  ERDDAP™  {#erddap} 
Denne specifikation er designet, så NCCSV-filer og .nc filer, der kan oprettes fra dem, kan bruges af en [ ERDDAP™ Dataserver](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (via via [EDDTableFraNccsvFiles](/docs/server-admin/datasets#eddtablefromnccsvfiles) og og og [EDDTableFraNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) Datasæt typer) , men denne specifikation er ekstern til ERDDAP . ERDDAP™ har flere nødvendige globale attributter og mange anbefalede globale og variable attributter, hovedsagelig baseret på CF og ACDD attributter (se
 [/docs/server-admin / Datasets#global-attributes](/docs/server-admin/datasets#global-attributes) ).

### Balancebalance{#balance} 
Designet af NCCSV format er en balance mellem flere krav:

* Filerne skal indeholde alle de data og metadata, der ville være i en fane NetCDF fil, herunder specifikke datatyper.
* Filerne skal kunne læses ind og derefter skrives ud af et regneark uden tab af oplysninger.
* Filerne skal være nemme for mennesker at oprette, redigere, læse og forstå.
* Filerne skal være i stand til at være utvetydigt parsed af computerprogrammer.

Hvis nogle krav i dette dokument synes mærkeligt eller picky, er det sandsynligvis nødvendigt at opfylde en af disse krav.

### Andre specifikationer{#other-specifications} 
Denne specifikation henviser til flere andre specifikationer og biblioteker, som det er designet til at arbejde med, men denne specifikation er ikke en del af nogen af disse andre specifikationer, og heller ikke har brug for ændringer til dem, og heller ikke konflikten med dem. Hvis en detalje i forbindelse med en af disse standarder ikke er angivet her, se den relaterede specifikation. Det omfatter navnlig:

* Intributekonventionen for Dataset Discovery (ACDD) metadata standard:
     [https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) .
* Klima og prognoser (CF) metadata standard:
     [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) .
* The The The The The The The NetCDF Brugerguide (NUG) :
     [https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
* The The The The The The The NetCDF softwarebiblioteker som NetCDF -java og NetCDF -c:
     [https://www.unidata.ucar.edu/software/netcdf/](https://www.unidata.ucar.edu/software/netcdf/) . Disse biblioteker kan ikke læse NCCSV-filer, men de kan læse .nc filer oprettet fra NCCSV filer.
* JSON: [https://www.json.org/](https://www.json.org/) 

### Ikkeering{#notation} 
I denne specifikation, beslag, \\[   \\] , note valgfrie elementer.

##  [Filstruktur](#file-structure)  {#file-structure} 

En komplet NCCSV-fil består af to sektioner: metadata sektionen, efterfulgt af data sektionen.

NCCSV filer skal indeholde kun 7bit ASCII tegn. På grund af dette, kan tegnsættet eller kodning bruges til at skrive og læse filen være ethvert tegnsæt eller kodning, der er kompatibel med 7-bit ASCII-tegnsættet, f.eks. ISO-8859-1. ERDDAP™ Læser og skriver NCCSV-filer med ISO-8859-1 charset.

NCCSV filer kan bruge enten nyline ( \\n )   (som er fælles på Linux og Mac OS X-computere) eller vognReturn plus nyline ( \\r\\n )   (som er fælles på Windows-computere) som end-of-line markører, men ikke begge.

###  .nccsv Metadata{#nccsvmetadata} 
Når både skaberen og læseren forventer det, er det også muligt og nogle gange nyttigt at lave en variant af en NCCSV-fil, der indeholder kun metadata sektionen (herunder\\*END\\_METADATA\\*Linjelinje) . Resultatet giver en komplet beskrivelse af filens attributter, variable navne og datatyper, således at det samme formål som .das plus .dds svar fra en OPeNDAP server. ERDDAP™ vil returnere denne variation, hvis du anmoder om fil Type= .nccsv Metadata fra en ERDDAP™ Datasæt.

##  [Metadataafsnittet](#the-metadata-section)  {#the-metadata-section} 

I en NCCSV-fil bruger hver linje af metadatasektionen formatet
 [variabel variabel variabel variabel Navn](#variablename) , [attribut Navn](#attributename) , [værdi1](#value)  \\[ , værdi2 \\]  \\[ , værdi3 \\]  \\[ , værdi4 \\]  \\[ ...... \\]   
Pladser før eller efter elementer er ikke tilladt, fordi de forårsager problemer, når de importerer filen til regnearksprogrammer.

### Konventioner{#conventions} 
Den første linje af en NCCSV-fil er den første linje af metadata sektionen og skal have en [\\*GLOBAL\\*](#global) Konventioner egenskab noterer alle konventioner, der anvendes i filen som en streng, der indeholder en CSV-liste, for eksempel:
\\*GLOBAL\\*, Konventioner," COARDS , CF-1.6, ACDD-1.3, NCCSV-1.0"
En af de konventioner, der er opført, skal være NCCSV-1.0, som refererer til den aktuelle version af denne specifikation.

### END_METADATA{#end_metadata} 
Slutningen af metadatasektionen i en NCCSV-fil skal afvises af en linje med kun
\\*END\\_METADATA\\*

Det anbefales, men ikke påkrævet, at alle attributter for en given variabel vises på tilstødende linjer i metadata sektionen. Hvis en NCCSV fil bliver konverteret til en NetCDF fil, den rækkefølge, at de variablenavne først vises i metadata sektionen, vil være rækkefølgen af variablerne i afsnittet NetCDF fil.

Valgfrie tomme linjer er tilladt i metadata sektionen efter den krævede første linje med [\\*GLOBAL\\*](#global)   [Konventioner](#conventions) Oplysninger om information (se nedenfor) og før den krævede sidste linje med\\*END\\_METADATA\\*.

Hvis et regneark oprettes fra en NCCSV-fil, vises metadatadata sektionen med variable navne i kolonne A, attributnavne i kolonne B og værdier i kolonne C.

Hvis et regneark efter disse konventioner gemmes som en CSV-fil, vil der ofte være ekstra kommaer i slutningen af linjerne i metadata sektionen. Den software, der konverterer NCCSV filer til .nc filer vil ignorere de ekstra kommaer.

###  [variabel variabel variabel variabel Navn](#variablename)  {#variablename} 

 *variabel variabel variabel variabel Navn* er det tilfældefølsomme navn på en variabel i datafilen. Alle variable navne skal begynde med et 7-bit ASCII brev eller understreg og være sammensat af 7-bit ASCII breve, understregninger og 7-bit ASCII cifre.
#### GLOBAL{#global} 
Den særlige variabelnavn [\\*GLOBAL\\*](#global) bruges til at beskrive globale metadata.

###  [attribut Navn](#attributename)  {#attributename} 

 *attribut Navn* er det tilfældefølsomme navn for en attribut, der er forbundet med en variabel eller [\\*GLOBAL\\*](#global) . Alle attributnavne skal begynde med et 7-bit ASCII brev eller underscore og være sammensat af 7-bit ASCII breve, understregninger og 7-bit ASCII cifre.

#### SCALAR{#scalar} 
Den særlige egenskab Navn\\*SCALAR\\*Kan bruges til at oprette en scalar datavariabel og definere dens værdi. Datatypen af\\*SCALAR\\*definerer datatypen for variablen, så specificer ikke en\\*Oplysninger om cookies\\*egenskab for scalar variabler. Bemærk, at der ikke skal være data til den scalar variable i Data Section of te NCCSV-filen.

For eksempel for at oprette en scalar variabel opkaldt "ship" med værdien "Okeanos Explorer" og en cf\\_role attribut, brug:
Skib,\\*SCALAR\\*,"Okeanos Explorer"
Skib, jf.
Når en scalar data variabel læses ind ERDDAP™ , afskalværdien omdannes til en kolonne i datatabellen med samme værdi på hver række.

###  [værdiværdiværdiværdi](#value)  {#value} 

 *værdiværdiværdiværdi* er værdien af metadata attributten og skal være en matrix med en eller flere af enten en byte, kort, int, lang, flyt, dobbelt, streng eller char. Ingen andre datatyper understøttes. Attributter uden værdi ignoreres. Hvis der er mere end én underværdi, skal underværdierne alle være af samme datatype og adskilt af kommaer, for eksempel:
 sst , actual\\_range ,0.17f,23.58f
Hvis der er flere strenge værdier, skal du bruge en enkelt streng med \\n   (Nyline) tegn, der adskiller understrengene.

Definitionerne af attributdatatyper er:

#### byte{#byte} 
* [e] attributværdier (8-bit, underskrevet) skal skrives med suffix 'b', f.eks. -7b, 0b, 7b. Rækken af gyldige afte værdier er -128 til 127. Et tal, der ser ud som et byte, men er ugyldig (f.eks. 128b) vil generere en fejlmeddelelse.
     
#### Kort kort kort kort{#short} 
* Korte egenskabsværdier (16-bit, underskrevet) skal skrives med suffix 's', f.eks. -30000s, 0s, 30000s. Rækken af gyldige kortværdier er -32768 til 32767. Et tal, der ligner en kort, men er ugyldig (fx 32768s) vil generere en fejlmeddelelse.
     
#### int{#int} 
* int attributværdier (32-bit, underskrevet) skal skrives som JSON ints uden et decimalpunkt eller eksponent, men med suffix 'i', f.eks. -12078i, 0i, 12067978i. Rækken af gyldige værdier er -2147483648 til 2147483647. Et tal, der ser ud som et int, men er ugyldig (fx 2147483648i) vil generere en fejlmeddelelse.
     
#### længe{#long} 
* lange egenskabsværdier (64-bit, underskrevet, i øjeblikket understøttet af NUG og ERDDAP™ men endnu ikke understøttet af CF) skal skrives uden decimal punkt og med suffix 'L', f.eks. -12345678987654321L, 0L, 12345678987654321L . Hvis du bruger konverteringssoftwaren til at konvertere en NCCSV-fil med lange værdier til en NetCDF -3 fil, vil alle lange værdier blive konverteret til dobbelt værdier. Udvalget af gyldige lange værdier er -9223372036854775808 til 9223372036854775807. Et tal, der ligner en lang, men er ugyldig (f.eks. 9223372036854775808L) vil generere en fejlmeddelelse.
     
#### flyder{#float} 
* Flydende egenskabsværdier (32-bit) skal skrives med suffix 'f' og kan have et decimalpunkt og/eller en eksponent, f.eks. 0f, 1f, 12.34f, 1e12f, 1,23e+12f, 1.87E-7f. Brug NaNf til en flyt NaN (mangler) værdi. Rækkevidde er ca. +/-3.40282347E+38f (~7 væsentlige decimaltal) . Et tal, der ligner en flyt, men er ugyldig (f.eks. 1.0e39f) vil generere en fejlmeddelelse.
     
#### Dobbelt dobbelt{#double} 
* Dobbelt attributværdier (64-bit) skal skrives med suffix 'd' og kan have et decimalpunkt og/eller en eksponent, f.eks. 0d, 1d, 12.34d, 1e12d, 1.23e+12d, 1.87E-7d. Brug NaNd til en dobbelt NaN (mangler) værdi. Serien af dobbelt er ca. +/-1.79313486231570E+308d (~15 betydelige decimalcifre) . Et tal, der ligner en dobbelt, men er ugyldig (f.eks. 1.0e309d) vil generere en fejlmeddelelse.
     
#### streng streng streng{#string} 
* Strenge attributværdier er en sekvens af UCS-2 tegn (i.e., 2-byte Unicode tegn, som i Java ) , som skal skrives som 7-bit ASCII, JSON-lignende strenge, så ikke-ASCII tegn kan specificeres.
    * Dobbelte tilbud (" " " ") skal kodes som to dobbelte citater ("") . Det er, hvad regnearksprogrammer kræver, når du læser .csv-filer. Det er, hvad regnearksprogrammer skriver, når du gemmer et regneark som en .csv-fil.
    * De særlige JSON back skråkodede tegn skal kodes som i JSON (især JSON) \\n (nyline), men også \\\\ (backslash), "f (formfeed), "t (tab), "r (bilriage tilbagevenden) eller med the [« *hhhh* ](#uhhhh) Syntaksen. Brug ikke Alt Indtast for at angive en ny linje inden for en tekstcelle; i stedet skal du bruge \\n   (2 tegn: backslash og 'n '') at angive en ny linje.
#####  \\uhhh h{#uhhhh} 
    * Alle tegn mindre end tegn #32 eller større end tegn #126, og ikke på anden måde kodet, skal kodes med syntaks «u *hhhh* , hvor hhhh er det 4-cifrede hexadecimal antal tegn, f.eks. Euro-skiltet er "u20AC. Se de kodesider, der er nævnt på [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) for at finde de hæxadecimal tal, der er forbundet med specifikke Unicode-tegn, eller brug et softwarebibliotek.
    * Hvis strengen har plads i begyndelsen eller slutningen, eller omfatter " (Dobbelt citat) eller en komma, eller indeholder værdier, der ellers ville blive fortolket som nogle andre data type (f.eks. en int) , eller er ordet "null", skal hele String være lukket i dobbelt citater; ellers er det i modsætning til JSON, de kloning dobbelt citater er valgfri. Vi anbefaler: når du er i tvivl, lukkes hele String i dobbelt citater. Pladser i begyndelsen eller slutningen af en streng er stærkt diskotek.
    * For nu er brugen af tegn større end #255 diskotek. NCCSV understøtter dem. ERDDAP™ understøtter dem internt. Nogle output filtyper understøtter dem (fx, .json og og og .nccsv ) . Men mange output filtyper understøtter ikke dem. For eksempel, NetCDF -3 filer understøtter ikke sådanne tegn, fordi NetCDF filer bruger 1-byte tegn og CF i øjeblikket ikke har et system til at angive, hvordan Unicode tegn er kodet i NetCDF Strenge (f.eks. UTF-8) . Dette vil sandsynligvis forbedre sig over tid.
         
#### Billeder af char{#char} 
* Valuta attributværdier er en enkelt UCS-2 tegn (i.e., 2-byte Unicode tegn, som i Java ) , som skal skrives som 7-bit ASCII, JSON-lignende tegn, så andre tegn kan specificeres (se String-definitionen ovenfor for kodning af særlige tegn, med tilføjelse af kodning et enkelt citat som « '') . Char attributværdier skal være lukket i enkelt citat (de indre citater) og dobbelt tilbud (de ydre citater) , f.eks. "'a'", "'""" (et dobbelt citat tegn) """" (et enkelt citat tegn) , "" (en fane) , "" (Et Euro-tegn) . Dette system til brug af enkelt- og dobbelt citater er ulige og besværlige, men det er en måde at skelne char værdier fra strenge på en måde, der arbejder med regneark. En værdi, der ligner en char, men er ugyldig, vil generere en fejlmeddelelse. Som med strenge, brugen af tegn større end #255 er i øjeblikket brudt.

### Suffix{#suffix} 
Bemærk, at i attributter sektionen af en NCCSV-fil, skal alle numeriske egenskabsværdier have et suffikbrev (f.eks. "b") for at identificere den numeriske datatype (f.eks. byte) . Men i datasektionen i en NCCSV-fil skal numeriske dataværdier aldrig have disse blæk bogstaver (med undtagelse af 'L' for lange integers) — datatypen er angivet af\\*Oplysninger om cookies\\*attribut for den variable.

#### Oplysninger om DATA_TYPE{#data_type} 
Datatypen for hver ikke- [scalar](#scalar) variabel skal specificeres af en\\*Oplysninger om cookies\\*attribut, der kan have en værdi af byte, kort, int, lang, fly, dobbelt, streng eller char (Tilfælde i følsom) . For eksempel,
qc\\_flag,\\*Oplysninger om cookies\\*,byte
ADVARSEL: Angiv den korrekte\\*Oplysninger om cookies\\*er dit ansvar. Angiv den forkerte datatype (f.eks. int, når du skal have specificeret fly) vil ikke generere en fejlmeddelelse og kan forårsage oplysninger, der skal gå tabt (f.eks. vil flydeværdierne afrundes til ints) når NCCSV-filen læses af ERDDAP™ eller konverteret til en NetCDF fil.

### Char Disco{#char-discouraged} 
Brugen af velgørenhedsdataværdier er brudt, fordi de ikke er bredt understøttet i andre filtyper. Valutaværdier kan skrives i datasektionen som enkelttegn eller som strenge (Især, hvis du har brug for at skrive en speciel figur) . Hvis en streng findes, vil den første figur af String blive brugt som char's værdi. Nuværende længde Strenge og manglende værdier vil blive konverteret til karakter "uFF. Bemærk, at NetCDF filer understøtter kun single byte chars, så enhver chars større end char #255 vil blive konverteret til '?' når du skriver NetCDF filer. Medmindre en charset attribut bruges til at angive en anden charset for en variabel, vil ISO-8859-1 charset blive brugt.

### Lang Disco{#long-discouraged} 
Selv om mange filtyper (fx, NetCDF -4 og json) og og og ERDDAP™ Understøtter lange dataværdier, brugen af lange dataværdier i NCCSV-filer er i øjeblikket brudt, fordi de i øjeblikket ikke understøttes af Excel, CF og NetCDF -3 filer. Hvis du vil angive lange dataværdier i en NCCSV-fil (eller i det tilsvarende Excel-ark) , skal du bruge suffix 'L', så Excel ikke behandler tallene som flydende punktnumre med lavere præcision. I øjeblikket, hvis en NCCSV-filer konverteres til en NetCDF -3 .nc fil, lange dataværdier vil blive konverteret til dobbeltværdier, hvilket forårsager et tab af præcision for meget store værdier (mindre end -2^53 eller større end 2^53) .

### CF, ACDD og ERDDAP™ Metadata{#cf-acdd-and-erddap-metadata} 
Da det er forestillet, at de fleste NCCSV-filer eller de .nc filer oprettet fra dem, vil blive læst i ERDDAP , det anbefales stærkt, at NCCSV-filer omfatter de metadata attributter, der kræves eller anbefales af ERDDAP™ (se
 [/docs/server-admin / Datasets#global-attributes](/docs/server-admin/datasets#global-attributes) ). attributterne er næsten alle fra CF og ACDD metadata standarder og tjener til korrekt at beskrive datasættet (hvem, hvad, når, hvor, hvorfor, hvordan) til nogen, der ellers kender intet om datasættet. Af særlig betydning bør næsten alle numeriske variabler have en enheds attribut med en UDUNITS -kompatibel værdi, f.eks.
 sst ,enheder, graduer\\_C

Det er fint at inkludere ekstra attributter, som ikke er fra CF eller ACDD standarder eller fra ERDDAP .

##  [Dataafsnittet](#the-data-section)  {#the-data-section} 

###  [Strukturstruktur](#structure)  {#structure} 

Den første linje af datasektionen skal have en kassefølsom, kommanderet liste over variable navne. Alle variable på denne liste skal beskrives i metadatasektionen, og omvendt (andet end [\\*GLOBAL\\*](#global) attributter og attributter [\\*SCALAR\\*](#scalar) variabler) .

Den anden gennem datasektionens penultimate linjer skal have en kompasliste af værdier. Hver række data skal have samme antal værdier som den komparerede liste over variable navne. Pladser før eller efter værdier er ikke tilladt, fordi de forårsager problemer, når de importerer filen til regnearksprogrammer. Hver kolonne i dette afsnit skal indeholde kun værdier af\\*Oplysninger om cookies\\*angivet for denne variabel af den\\*Oplysninger om cookies\\*attribut for den variable. I modsætning til attributtersektionen skal numeriske værdier i datasektionen ikke have suffik bogstaver til at angive datatypen. I modsætning til attributtersektionen kan velgørenhedsværdierne i datasektionen udelade et enkelt citat, hvis de ikke er nødvendige for at deaktivere individuelle citater (Det skal således citeres som vist her.) . Der kan være mange af disse data rækker i en NCCSV-fil, men i øjeblikket ERDDAP™ kan kun læse NCCSV-filer med op til omkring 2 milliarder rækker. Generelt anbefales det, at du opdeler store datasæt i flere NCCSV-datafiler med færre end 1 million rækker hver.

#### Afslut data{#end-data} 
Slutningen af datasektionen skal afvises af en linje med kun
\\*END\\_DATA\\*

Hvis der er yderligere indhold i NCCSV-filen efter\\*END\\_DATA\\*linje, vil det ignoreres, når NCCSV-filen er konverteret til en .nc fil. Et sådant indhold afbrydes derfor.

I et regneark efter disse konventioner vil de variable navne og dataværdier være i flere kolonner. Se eksemplet nedenfor.

###  [Manglende værdier](#missing-values)  {#missing-values} 

Numeriske manglende værdier kan skrives som ennumerisk værdi identificeret af en missing\\_value eller \\_FillValue attribut for den variable. Du kan f.eks. se den anden værdi på denne datarække:
Bell M. Shimada,99,123.4
Dette er den anbefalede måde at håndtere manglende værdier for byte, kort, int og lange variabler.

flyde eller dobbelte NaN-værdier kan skrives som NaN. Du kan f.eks. se den anden værdi på denne datarække:
Hoteller i nærheden af Bell M. Shimada

Strenge og numeriske manglende værdier kan angives af et tomt felt. Du kan f.eks. se den anden værdi på denne datarække:
Bell M. Shimada,123.4

Til byte, kort, int, og lange variabler, NCCSV konverter værktøj og ERDDAP™ vil konvertere et tomt felt til den maksimale tilladte værdi for den pågældende datatype (f.eks. 127 for bytes) . Hvis du gør dette, skal du sørge for at tilføje en missing\\_value eller \\_FillValue attribut for den variable at identificere denne værdi, f.eks.
 *variabel variabel variabel variabel Navn* , \\_FillValue,127b
Til flyt- og dobbeltvariabler konverteres et tomt felt til NaN.

###  [Datotid værdier](#datetime-values)  {#datetime-values} 

Datotid værdier (herunder datoværdier, der ikke har en tidskomponent) kan repræsenteres som tal eller som Strings i NCCSV-filer. En given datoTime variabel kan kun have strenge værdier eller kun numeriske værdier, ikke begge. NCCSV-softwaren vil konvertere streng datoTime-værdier til numeriske dato Tidsværdier ved oprettelse .nc filer filer filer (som påkrævet af CF) . Strenge datoTime værdier har den fordel at være letlæselige af mennesker.

DatoTime værdier repræsenteret som numeriske værdier skal have en enheds attribut, der angiver " *enheder* siden siden siden *Datosdato Tidstid* " som påkrævet af CF og angivet af UDUNITS f.eks.
tid,enheder, sekunder siden 1970-01T00:00:00Z

DatoTime værdier repræsenteret som strenge værdier skal have en streng\\*Oplysninger om cookies\\*attribut og en enhed egenskab, der angiver en dato Tidsmønster som angivet af Java DateTimeFormatter klasse
 ( [https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) ) . For eksempel,
tid, enheder, yyyy-MM-dd 'T'HH:mm:ssZ
Alle datotidsværdier for en given datavariabel skal bruge det samme format.
I de fleste tilfælde, datoTime mønster, du har brug for til attributten, vil være en variation af en af disse formater:

*    yyyy-MM-dd 'T'HH:mm:ss. SSSZ — som er ISO 8601:2004 (E) Datosdato Tidsformat. Du kan bruge en afkortet version af dette, f.eks. yyyy-MM-dd 'T'HH:mm:ssZ (det eneste anbefalede format) eller eller eller yyyy-MM-dd . Hvis du ændrer formatet af dine datotidsværdier, anbefaler NCCSV kraftigt, at du ændrer dette format (måske forkortet) . Dette er det format, der er ERDDAP™ vil bruge, når det skriver NCCSV-filer.
* yyyMMddHHmmss.SSS — som er den kompakte version af ISO 8601:2004 dato Tidsformat. Du kan bruge en afkortet version af dette, f.eks. yyyMMdd.
* M/d/yyyyyy H:mm:s. SSS — der håndterer amerikansk-stil datoer og datoTimes som "3/23/2017 16:22:03.000". Du kan bruge en afkortet version af dette, f.eks. M/d/yyyyyyyyyyy.
* yyyyyDDDHHmmsSSS - som er året plus den nul-padded dag i året (f.eks. 001 = Jan 1, 365 = Dec 31 i et ikke-leapår; dette kaldes undertiden Julian dato) . Du kan bruge en afkortet version af dette, f.eks. yyyyyDDD .

#### Præcisionspræcision{#precision} 
Når et softwarebibliotek konverterer en .nc fil i en NCCSV-fil, hele dato Tidsværdierne vil blive skrevet som strenge med ISO 8601:2004 (E) Datosdato Tidsformat, f.eks. 1970-01T00:00:00Z . Du kan styre præcisionen med præcisionen ERDDAP -specifik egenskab time\\_precision . Se endnu
 [/docs/server-admin/datasæt# time\\_precision ](/docs/server-admin/datasets#time_precision) .

#### Tidszoner{#time-zone} 
Standard tidszone for dato Tidsværdierne er Zulu   (eller GMT) tidszone, som ikke har nogen dagslysbesparende tidsperioder. Hvis en datoTime variabel har datoTime værdier fra en anden tidszone, skal du angive dette med den ERDDAP -specifik egenskab time\\_zone . Dette er et krav til ERDDAP™ (se
 [/docs/server-admin/datasæt# time\\_zone ](/docs/server-admin/datasets#time_zone) ).

###  [Gradsværdi](#degree-values)  {#degree-values} 

Som krævet af CF, alle gradsværdier (f.eks. for længde og breddegrad) skal angives som decimaler dobbeltværdier, ikke som en grad °min'sec" streng eller som separate variabler i niveauer, minutter, sekunder. Den retningsdesignere N, S, E og W er ikke tilladt. Brug negative værdier for vestlige længder og for syd breddegrader.

##  [DSG Feature Typer](#dsg-feature-types)  {#dsg-feature-types} 

En NCCSV fil kan indeholde CF Discrete Sampling Geometry
 ( [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) data. Det er de attributter, der gør dette arbejde:

1. Som krævet af CF skal NCCSV-filen indeholde en linje i metadatasektionen, der identificerer det [\\*GLOBAL\\*](#global)   featureType attribut, f.eks.,
    \\*GLOBAL\\*, featureType ,
2. Til brug i ERDDAP™ , NCCSV-filen skal indeholde en linje eller linjer i metadatasektionen, der identificerer cf\\_role=...\\_id variabler, f.eks.
Skib, jf.
Dette er valgfrit til CF, men kræves i NCCSV.
3. Til brug i ERDDAP™ , NCCSV-filen skal indeholde en linje eller linjer i metadatasektionen, der identificerer, hvilke variabler der er forbundet med hver timeSeries, trajectory eller profil, der kræves af ERDDAP™ (se
     [/docs/server-admin/datasets#cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) ), f.eks.
    \\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
eller eller eller
    \\*GLOBAL\\*,cdm\\_timeseries\\_variables,"station\\_id,lat,lon"

##  [Prøvefil](#sample-file)  {#sample-file} 

Her er en prøvefil, der viser mange af funktionerne i en NCCSV-fil:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.0"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.00
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
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
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

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testLong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-9223372036854775808L,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,-1234567890123456L,
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",0L,10.7
Bell M. Shimada,2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",1234567890123456L,99
Bell M. Shimada,2017-03-23T21:45:00Z,28.0003,-132.0014,\\u00fc,9223372036854775806L,10.0
Bell M. Shimada,2017-03-23T23:45:00Z,28.0002,-132.1591,,NaN
```
Noter:

* Denne prøvefil indeholder mange vanskelige tilfælde (f.eks. char og lange variabler og vanskelige strengeværdier) . De fleste NCCSV filer vil være meget enklere.
* Licenslinjen er brudt i to linjer her, men er bare en linje i prøvefilen.
* «u20AC er kodning af Euro-karakteren og ‘u00FC er kodning af ü.
* Mange mange Strenge i eksemplet er lukket af dobbelte citater, selvom de ikke behøver at være, f.eks. mange globale attributter, herunder titlen, lon-enheder attributten, og den 3. linje af data.)
* Det ville være klarere og bedre, hvis enheds attributten for testLong variabel blev skrevet i dobbelt citater, der angiver, at det er en streng værdi. Men den nuværende repræsentation (1, uden tilbud) vil blive fortolket korrekt som en streng, ikke en heltals, fordi der ikke er 'i' suffik.
* I modsætning til andrenumeriske datatyper, har de lange værdier i datasektionen suffix ("L") der identificerer deres numeriske datatype. Det er nødvendigt at forhindre regneark i at fortolke værdierne som flydende punktnumre og dermed miste præcision.

##  [Brændeark](#spreadsheets)  {#spreadsheets} 

I et regneark, som i en NCCSV-fil:

* Skriv numeriske attributværdier som angivet for NCCSV-filer (f.eks. med et suffix-brev, f.eks. "f" til at identificere egenskabens datatype) .
* I Strings, skrive alle tegn mindre end ASCII karakter #32 eller større end tegn #126 som enten en JSON-lignende tilbage skrå figur (fx, \\n for nyline) eller som hexadecimal Unicode karakter nummer (Tilfælde i følsom) med syntaks [« *hhhh* ](#uhhhh)   (f.eks. "u20AC for Euro-skiltet) . Brug \\n   (2 tegn: backslash og 'n '') at angive en ny linje, ikke Alt Indtast.

De eneste forskelle mellem NCCSV-filer og det analoge regneark, der følger disse konventioner, er:

* NCCSV filer har værdier på en linje adskilt af kommaer.
Spreadsheets har værdier på en linje i tilstødende celler.
* Strenge i NCCSV filer er ofte omgivet af dobbelte citater.
Strenge i regneark er aldrig omgivet af dobbelte citater.
* Interne dobbelttilbud (" " " ") i Strings i NCCSV filer vises som 2 dobbelte citater.
Interne dobbelttilbud i regneark vises som 1 dobbeltværelse.

Hvis et regneark efter disse konventioner gemmes som en CSV-fil, vil der ofte være ekstra kommaer i slutningen af mange af linjerne. Den software, der konverterer NCCSV filer til .nc filer vil ignorere de ekstra kommaer.

###  [Excel Excel Excel](#excel)  {#excel} 

Sådan importeres en NCCSV-fil til Excel:

1. Vælg fil : Åbn .
2. Ændre filtype til Tekstfiler (\\*.prn;\\*.txt; \\*.csv) .
3. Søg mapperne og klik på NCCSV .csv-filen.
4. Klik på Åbn .

Sådan oprettes en NCCSV-fil fra et Excel-regneark:

1. Vælg fil : Gem som .
2. Ændre Gem som type: at være CSV (Comma afgrænset)   (\\*.csv) .
3. Klik på Ja .
4. Den resulterende .csv-fil vil have ekstra kommaer i slutningen af alle rækker andet end CSV rækker. Du kan ignorere dem.

I Excel vises prøven NCCSV-fil over som

![prøveEkscel.png](/img/sampleExcel.png)

###  [Google Sheets](#google-sheets)  {#google-sheets} 

Sådan importeres en NCCSV-fil til Google Sheets:

1. Vælg fil : Åbn .
2. Vælg for at uploade en fil og klik på Upload en fil fra din computer. Vælg filen, og klik derefter på Åbn .
      
Eller vælg My Drive og ændre filtype drop valg til alle filtyper . Vælg filen, og klik derefter på Åbn .

Sådan oprettes en NCCSV-fil fra et Google Sheets-regneark:

1. Vælg fil : Gem som .
2. Ændre Gem som type: at være CSV (Comma afgrænset)   (\\*.csv) .
3. Klik på Ja .
4. Den resulterende .csv-fil vil have ekstra kommaer i slutningen af alle rækker andet end CSV rækker. Ignorer dem.

##  [Problemer/Warnings](#problemswarnings)  {#problemswarnings} 

* Hvis du opretter en NCCSV-fil med en teksteditor, eller hvis du opretter et analogt regneark i et regnearksprogram, vil teksteditoren eller regnearksprogrammet ikke kontrollere, at du fulgte disse konventioner korrekt. Det er op til dig at følge disse konventioner korrekt.
* Omdannelsen af et regneark efter denne konvention til en csv-fil (Således en NCCSV-fil) vil føre til ekstra kommaer i slutningen af alle rækker andre end CSV data rækker. Ignorer dem. Den software derefter konvertere NCCSV filer til .nc filer vil ignorere dem.
* Hvis en NCCSV fil har overskydende kommaer i slutningen af rækker, kan du fjerne dem ved at konvertere NCCSV-filen til en NetCDF fil og derefter konvertere filen NetCDF fil tilbage i en NCCSV-fil.
* Når du forsøger at konvertere en NCCSV fil til en NetCDF fil, vil nogle fejl blive opdaget af softwaren og vil generere fejlmeddelelser, der forårsager konvertering til fejl. Andre problemer er svære eller umulige at fange og vil ikke generere fejlmeddelelser eller advarsler. Andre problemer (f.eks. overskydende kommaer i slutningen af rækker) vil blive ignoreret. Fil konverteren vil kun foretage minimal kontrol af korrekthed af resultatet NetCDF fil, f.eks. i forbindelse med CF-overensstemmelse. Det er filudviklerens og filbrugerens ansvar at kontrollere, at resultaterne af konverteringen er som ønsket og korrekt. To måder at tjekke er:
    * Udskriv indholdet af indholdet .nc fil med ncdump
         ( [https://linux.die.net/man/1/ncdump](https://linux.die.net/man/1/ncdump)  ) .
    * Se indholdet af dataene i ERDDAP .
