---
title: "ERDDAP™ - Working with the datasets.xml File"
---
# Arbeide meddatasets.xmlFil

\\[Denne nettsiden vil bare være av interesse forERDDAP™Administratorer.\\]

Etter at du har fulgtERDDAP™ [installasjonsinstruksjoner](/docs/server-admin/deploy-install)Du må redigeredatasets.xmlfil i *tomcat* /innhold/erddap/ å beskrive datasettene dineERDDAP™installasjon vil tjene.

- -

## [Introduksjon](#introduction) {#introduction} 

### En samling kreves{#some-assembly-required} 
Sette opp et datasett iERDDAP™er ikke bare et spørsmål om å peke på datasettets katalog eller URL. Du må skrive en bit XML fordatasets.xmlsom beskriver datasettet.

* For nettbaserte datasett, for å gjøre datasettet i samsvar medERDDAPDatastrukturen for rutenettede data, må du identifisere en undergruppe av datasettets variabler som deler de samme dimensjonene. ([Hvorfor?](#why-just-two-basic-data-structures) [Hvordan?](#dimensions)) 
* Datasettets nåværende metadata importeres automatisk. Men hvis du vil endre metadata eller legge til andre metadata, må du angi det idatasets.xml.. OgERDDAP™trenger andre metadata, inkludert[globale attributter](#global-attributes)  (sominfoUrl, institusjon,sourceUrl, sammendrag og tittel) og[variabele attributter](#variable-addattributes)  (somlong\\_nameog enheter) .. Akkurat som metadataene som er i datasettet legger til beskrivende informasjon til datasettet, spør metadataene fraERDDAP™Legg til beskrivende informasjon til datasettet. De ekstra metadataene er et godt tillegg til datasettet og hjelperERDDAP™Gjør en bedre jobb med å presentere dataene dine til brukere som ikke er kjent med det.
*   ERDDAP™trenger å gjøre spesielle ting med[lengdegrad, breddegrad, høyde (eller dybde) , og tidsvariabler](#destinationname)..

Hvis du kjøper i disse ideene og bruker innsatsen på å opprette XML fordatasets.xmlDu får alle fordelene medERDDAP™, inkludert:

* Søk etter datasett i fulltekst
* Søk etter datasett etter kategori
* Datatilgangsskjemaer ( *datasetID* .html) slik at du kan be om en undergruppe av data i mange forskjellige filformater
* Skjema for å be om grafer og kart ( *datasetID* .graph) 
* Web Map Service (WMS) for nettbaserte datasett
*   RESTfultilgang til dine data

Gjøredatasets.xmllegger stor vekt på de første datasettene, men **Det blir lettere** .. Etter det første datasettet kan du ofte gjenbruke mye av arbeidet ditt for det neste datasettet. Heldigvis,ERDDAP™Kommer med to[Verktøy](#tools)for å hjelpe deg med å opprette XML for hvert datasett idatasets.xml..
Hvis du sitter fast, se vår[Seksjon om å få ekstra støtte](/docs/intro#support)..

### Dataleverandør Form{#data-provider-form} 
Når en dataleverandør kommer til deg i håp om å legge til noen data i dinERDDAP, kan det være vanskelig og tidkrevende å samle alle metadata (Informasjon om datasettet) nødvendig å legge til datasettet iERDDAP.. Mange datakilder (for eksempel .csv-filer, Excel-filer, databaser) har ingen interne metadata, såERDDAP™har et dataleverandørskjema som samler metadata fra dataleverandøren og gir dataleverandøren annen veiledning, inkludert omfattende veiledning for[Data i databaser](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases).. De innsendte opplysningene konverteres tildatasets.xmlformat og deretter e-post tilERDDAP™administrator (du) og skrevet (Legg til) til *bigParentDirectory* /logs/dataProviderForm.log. Formen semi-automatiserer prosessen med å få et datasett iERDDAPMen detERDDAP™administratoren må fortsatt fullføredatasets.xmlbit og håndtere å få datafilen (s) fra leverandøren eller tilkobling til databasen.

Innlevering av faktiske datafiler fra eksterne kilder er en stor sikkerhetsrisiko, såERDDAP™tar seg ikke av det. Du må finne ut en løsning som fungerer for deg og dataleverandøren, for eksempel e-post (for små filer) Trekk fra skyen (For eksempel DropBox eller Google Drive) , en sftp nettsted (med passord) , eller sneaker Netto (en USB tommelfingerstasjon eller ekstern harddisk) .. Du bør sannsynligvis bare akseptere filer fra folk du kjenner. Du må skanne filene for virus og ta andre sikkerhetstiltak.

Det er ingen link iERDDAP™til dataleverandørskjemaet (For eksempel påERDDAP™hjemmeside) .. I stedet, når noen forteller deg at de ønsker å ha sine opplysninger servert av dinERDDAPDu kan sende dem en e-post som sier noe som:
Ja, vi kan få dine data inn iERDDAP.. For å komme i gang, vennligst fyll ut skjemaet på https://*yourUrl*/erddap/dataProviderForm.html   (ellerhttp://hvishttps://er ikke aktivert) ..
Når du er ferdig, kontakter jeg deg for å finne ut de siste detaljene.
Hvis du bare vil se på skjemaet (Uten å fylle den ut) Du kan se skjemaet påERD'sERDDAP:)[Introduksjon](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html),[Del 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html),[Del 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html),[Del 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html), og[Del 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html).. Disse linkene påERD ERDDAP™Send informasjon til meg, ikke deg, så ikke send informasjon med dem med mindre du faktisk vil legge til data tilERD ERDDAP..

Hvis du vil fjerne skjemaet for dataleverandør fra dinERDDAP™, sette
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
i config.xml-filen.

Fremdriften til dette varNOAA2014[Offentlig tilgang til forskningsresultater (PARR) direktiv](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf)som krever at alleNOAAmiljødata som finansieres gjennom skattepliktige dollar gjøres tilgjengelig via en datatjeneste (ikke bare filer) innen 12 måneder etter opprettelsen. Det er økt interesse for brukERDDAP™å gjøre datasett tilgjengelig via en tjeneste ASAP. Vi trengte en mer effektiv måte å håndtere et stort antall dataleverandører på.

Feedback/forslag? Dette skjemaet er nytt, så vennligst e-posterd dot data at noaa dot govHvis du har noen tilbakemeldinger eller forslag til forbedring av dette.

### Verktøy{#tools} 
ERDDAP™kommer med to kommandolinjeprogrammer som er verktøy for å hjelpe deg å opprette XML for hvert datasett som du vil ha dinERDDAP™å tjene. Når du har satt oppERDDAP™og kjøre den (minst en gang) Du kan finne og bruke disse programmene i *tomcat* /webapps/erddap/WEB-INF-katalog. Det er Linux/Unix skall skript (med utvidelsen .sh) Windows-skripter (med utvidelsen .bat) For hvert program.\\[På Linux, kjøre disse verktøyene som samme bruker (Tomcat?) Det vil kjøre Tomcat.\\]Når du kjører hvert program, vil det stille deg spørsmål. For hvert spørsmål, skriv inn et svar, trykk deretter Enter. Eller trykk ^ C for å avslutte et program når som helst.

#### Programmet vil ikke løpe?{#program-wont-run} 

* Hvis du får et ukjent program (eller lignende) feilmelding, problemet er sannsynligvis at operativsystemet ikke fantJava.. Du må finne ut hvorJavaer på datamaskinen, og deretter redigere java referanse i .bat eller .sh-filen som du prøver å bruke.
* Hvis du ikke har funnet eller ikke fant feilmelding i klassen, såJavaklarte ikke å finne en av klassene som er oppført i .bat eller .sh-filen du prøver å bruke. Løsningen er å finne ut hvor den .jar filen er, og redigere java referanse til det i .bat eller .sh fil.
* Hvis du bruker en versjon avJavasom er for gammelt for et program, programmet vil ikke kjøre og du vil se en feilmelding som
Unntak i tråd "main" java.lang.U støttetClassVersionError:
     *noen/klasse/navn* : Ustøttet major.minor versjon *noenNumber*   
Løsningen er å oppdatere den siste versjonen avJavaog sørg for at .sh eller .bat-filen for programmet bruker den.

#### Verktøyene skriver ut ulike diagnostiske meldinger:{#the-tools-print-various-diagnostic-messages} 

* Ordet \"Error\" brukes når noe gikk så galt at prosedyren ikke klarte å fullføre. Selv om det er irriterende å få en feil, tvinger feilen deg til å håndtere problemet.
* Ordet «varning» brukes når noe gikk galt, men prosedyren var i stand til å bli fullført. De er ganske sjeldne.
* Alt annet er bare en informativ melding. Du kan legge til --verbose til[Generer DatasetsXml](#generatedatasetsxml)eller[DasDds](#dasdds)kommandolinje for å få ytterligere informative meldinger, som noen ganger bidrar til å løse problemer.

De to verktøyene er en stor hjelp, men du må fortsatt lese alle disse instruksjonene nøye på denne siden og ta viktige beslutninger selv.

### Generer DatasetsXml{#generatedatasetsxml} 
*    **Generer DatasetsXml** er et kommandolinjeprogram som kan generere et grovt utkast av datasett XML for nesten alle typer datasett.
    
Vi STRONGLY REQUERER at du bruker Genererer Datasett Xml i stedet for å lage biter avdatasets.xmlFor hånd fordi:
    
    * Opprett datasett Xml fungerer i sekunder. Å gjøre dette for hånd er minst en times arbeid, selv når du vet hva du gjør.
    * Opprett datasett Xml gjør en bedre jobb. Å gjøre dette for hånd krever omfattende kunnskap om hvordanERDDAP™Fungerer. Det er usannsynlig at du vil gjøre en bedre jobb for hånd. (Bob Simons bruker alltid Genererer Datasett Xml for det første utkastet, og han skrevERDDAP..) 
    * Opprett datasett Xml genererer alltid en gyldig del avdatasets.xml.. Alle deler avdatasets.xmldu skriver vil sannsynligvis ha minst noen feil som hindrerERDDAP™fra å laste datasettet. Det tar ofte timer å diagnostisere disse problemene. Ikke kast bort tiden din. La generere Datasett Xml gjør hardt arbeid. Deretter kan du raffinere .xml for hånd hvis du vil.
    
Når du bruker Genererer Datasett Xml-programmet:
    
    * På Windows, første gang du kjører GenerererDatasetsXml, må du redigere GenerererDatasetsXml.bat-filen med en tekstredigeringseditor for å endre banen til java. exe-fil slik at Windows kan finneJava..
    * Opprett datasett Xml ber deg først om å angi EDDType (Erd Dap Dataset Type) av datasettet. Se[Liste over datasetttyper](#list-of-types-datasets)  (i dette dokumentet) å finne ut hvilken type som passer for datasettet du jobber med. I tillegg til vanlige EDDTypes er det også noen få[Spesial/Pseudo Datasett Typer](#specialpseudo-dataset-types)  (f.eks. en som kryper en TREDDS-katalog for å generere en bit avdatasets.xmlfor hvert datasett i katalogen) ..
    * Opprett datasett Xml stiller deg så en rekke spørsmål som er spesifikke for den EDDType. Spørsmålene samler informasjon som trengs forERDDAP™å få tilgang til datasettets kilde. For å forstå hvaERDDAP™se dokumentasjonen for EDDType som du spesifiserte ved å klikke på den samme datasetttypen i[Liste over datasetttyper](#list-of-types-datasets)..
        
Hvis du må skrive inn en streng med spesielle tegn (For eksempel tomme tegn i begynnelsen eller slutten, ikke-ASCII tegn) Enter a[JSON-stil streng](https://www.json.org/json-en.html)  (med spesielle tegn rømt med \\ tegn) .. For eksempel, for å skrive inn bare en fane tegn, skriv inn "\\t" (med de omgivende doble sitatene, som fortellerERDDAP™Dette er en JSON-stil-streng.
        
    * Ofte vil et av dine svar ikke være det GenerererDatasetsXml trenger. Du kan deretter prøve igjen, med reviderte svar på spørsmålene, til CreateDatasetts Xml finner og forstår kildedataene.
    * Hvis du svarer på spørsmålene riktig (eller tilstrekkelig riktig) , Opprett datasett Xml vil koble til datasettets kilde og samle inn grunnleggende informasjon (For eksempel variable navn og metadata) ..
For datasett som er fra lokalNetCDF .ncog relaterte filer, Genererer datasett Xml vil ofte skrive ut ncdump-lignende strukturen til filen etter at den først leser filen. Dette kan gi deg informasjon for å svare på spørsmålene bedre på en etterfølgende sløyfe gjennom GenerateDatasetsXml.
    * Opprett datasett Xml vil da generere et grovt utkast av datasett XML for det datasettet.
    * Diagnostisk informasjon og det grove utkastet til datasett XML vil bli skrevet til *bigParentDirectory* /logs/GreateDatasetsXml.log .
    * Det grove utkastet til datasett XML vil bli skrevet til *bigParentDirectory* /logs/GreateDatasetsXml.out .
#### "0 filer" Feilmelding{#0-files-error-message} 
Hvis du kjører Genererer Datasett Xml eller[DasDds](#dasdds), eller hvis du prøver å laste enEDDGridFra... Filer eller EDDTableFra... Filer datasett iERDDAP™, og du får en  "0 filer" feilmelding som indikerer atERDDAP™funnet 0 samsvarende filer i katalogen (når du tror det er samsvarende filer i den katalogen) :)
* Sjekk at du har angitt hele navnet på katalogen. Og hvis du oppgav prøvenavnet, sørg for at du spesifiserte filens fulle navn, inkludert hele katalognavnet.
* Sjekk at filene virkelig er i den katalogen.
* Kontroller stavingen av mappenavnet.
* Sjekk filenNameRegex. Det er virkelig, veldig enkelt å gjøre feil med regulære. For testformål, prøv regulær .\\* som bør matche alle filnavn. (Se dette[Regulatorisk dokumentasjon](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og[Regular tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)..) 
* Sjekk at brukeren som kjører programmet (For eksempel bruker=tomcat (?) for Tomcat/ERDDAP) Har \"lese\" tillatelse til disse filene.
* I noen operativsystemer (For eksempel SELinux) og avhengig av systeminnstillinger, må brukeren som kjørte programmet ha \"lese\" tillatelse til hele kjede av mapper som fører til katalogen som har filene.


* Hvis du har problemer som du ikke kan løse,[forespørselsstøtte](/docs/intro#support)Med så mye informasjon som mulig. Hvis det ser ut som den riktige EDDType for et gitt datasett ikke fungerer med det datasettet, eller hvis det ikke er riktig EDDType, vennligst fil en[Spørsmål om GitHub](https://github.com/ERDDAP/erddap/issues)Med detaljene (og en prøvefil hvis det er relevant) ..
         
#### Du må redigere utdata fra Genererer Datasett Xml for å gjøre det bedre.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* Disclaimer:
KUNKEN AVdatasets.xmlMADE BE GenerationDatasett Xml er ikke perfekt. Du må lese og eddit XML før du bruker den i en OFFENTLIGERDDAP.. Opprett datasett Xml RELIES På mye av KORRECT. Du er ansvarlig for å sørge for at XML-verdiene som du legger tilERDDAP'Sdatasets.xmlFIL.
    
     (Fun Fakta: Jeg roper ikke. Av historiske juridiske grunner må fraskrivere være skrevet i alle caps.) 
    
Utgangen av GenerationDatasetsXml er et grovt utkast.
Du trenger nesten alltid å redigere den.
Vi har gjort og fortsetter å gjøre en enorm innsats for å gjøre produksjonen så klar til å gå som mulig, men det er grenser. Ofte er nødvendig informasjon ikke tilgjengelig fra kildemetadata.
    
Et viktig problem er at vi spør et dataprogram (Generer DatasetsXml) å gjøre en oppgave der, hvis du ga samme oppgave til 100 personer, ville du få 100 forskjellige resultater. Det finnes ikke noe enkelt answer riktig" svar. Selvfølgelig kommer programmet nærmest å lese Bobs sinn (Ikke din) , men selv om det er det ikke et all-forståelig AI-program, bare en haug heuristics cobbled sammen for å gjøre en AI-lignende oppgave. (Den dagen av et all-forståelig AI-program kan komme, men det har ikke ennå. Hvis det gjør det, kan vi mennesker ha større problemer. Vær forsiktig med hva du ønsker.) 
    
* For informative formål viser utgangen den globale kildenAttributes og variabel kildeAttributes som kommentarer.ERDDAP™kombinerer kildeAttributes ogaddAttributes  (som har forrang) å gjøre den kombinerte Attribut som er vist til brukeren. (Og andre attributter legges automatisk til lengdegrad, breddegrad, høyde, dybde og tidsvariabler nårERDDAP™Faktisk gjør datasettet) ..
     
* Hvis du ikke liker en kildeAttribute, overskriv den ved å legge til en addAttribute med samme navn, men en annen verdi (eller ingen verdi, hvis du vil fjerne den) ..
     
* AlleaddAttributeser datagenererte forslag. Rediger dem&#33; Hvis du ikke liker en addAttribute, endre det.
     
* Hvis du vil legge til andreaddAttributesLegg dem til.
     
* Hvis du vil endre endestinationNameEndre det. Men ikke endresourceNameS.
     
* Du kan endre rekkefølgen pådataVariableeller fjerne noen av dem.


    * Du kan deretter bruke[DasDds](#dasdds)  (Se nedenfor) å gjentatte ganger teste XML for det datasettet for å sikre at det resulterende datasettet vises som du vil det skal iERDDAP..
    * Du kan gjerne gjøre små endringer idatasets.xmlDel som ble generert, for eksempel, gir en bedreinfoUrlSammendrag eller tittel.
#### Legg ikke til standardNames{#donotaddstandardnames} 
Hvis du har \\ doNotAddStandardNames som en kommandolinjeparameter når du kjører genererer Datasett Xml, generer Datasett Xml vil ikke legge tilstandard\\_nametiladdAttributesfor andre variabler enn variabler som heter breddegrad, lengdegrad, høyde, dybde eller tid (som har åpenbarestandard\\_names) .. Dette kan være nyttig hvis du bruker utgangen fra å generere Datasett Xml direkte iERDDAP™uten å redigere utdata, fordi generere Datasett Xml gjetter oftestandard\\_namefeil. (Merk at vi alltid anbefaler at du redigerer utdata før du bruker det iERDDAP..) Bruk av denne parameteren vil ha andre mindre relaterte effekter fordi gjettetstandard\\_namebrukes ofte til andre formål, f.eks. til å skape en nylong\\_name, og for å opprette fargelinjen innstillinger.
#### Scripting{#scripting} 
Som et alternativ til å svare på spørsmålene interaktivt på tastaturet og looping for å generere ytterligere datasett, kan du gi kommandolinjeargumenter for å svare på alle spørsmålene for å generere ett datasett. Opprett datasett Xml vil behandle disse parametrene, skrive utgangen til utdatafilen og avslutte programmet.
        
For å konfigurere dette, kan du først bruke programmet i interaktiv modus og skrive ned dine svar. Her er et delvis eksempel:
La oss si at du kjører manus: ./GreateDatasetsXml.sh
Deretter skriv inn: EDDTableFromAsciiFiles
Skriv deretter inn: /u00/data/
Deretter skriv inn: . . . . . . .
Skriv deretter inn: /u00/data/sampleFile.asc
Skriv deretter inn: ISO-8859-1
        
Hvis du vil kjøre dette på en ikke-interaktiv måte, kan du bruke denne kommandolinjen:
./GreateDatasetsXml.sh EDDTableFra AsciiFiles /u00/data/ .\\*\\.asc /u00/data/ampleFile.asc ISO-8859-1
Så i utgangspunktet, du bare liste alle svarene på kommandolinjen.
Dette bør være nyttig for datasett som endres ofte på en måte som krever omkjøring Genererer Datasett Xml (spesieltEDDGridFraThreddsCatalog) ..
        
Detaljer:

* Hvis en parameter inneholder et mellomrom eller noe spesielt tegn, så koder parameteren som en[JSON-stil streng](https://www.json.org/json-en.html)f.eks. min parameter med mellomrom og to\\nlinjer".
* Hvis du vil angi en tom streng som parameter, bruk: ingenting
* Hvis du vil angi standardverdien til en parameter, bruk: standard
             
* Opprett datasett Xml støtter en -i *Datasett XmlName* # *TaggName* kommandolinjeparameter som setter utgangen i den angittedatasets.xmlfil (Standarden er *tomcat* /innhold/erddap/datasets.xml) .. Opprett datasett Xml ser etter to linjer i datasett XmlName
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
og
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
og erstatter alt mellom disse linjene med det nye innholdet, og endrer noenDatetime.
* -i-bryteren behandles bare (og endringer idatasets.xmler bare laget) hvis du kjører Genererer Datasett Xml med kommandolinjeargumenter som angir alle svarene på alle spørsmålene for en løkke av programmet. (Se \"Skrift\" ovenfor.)   (Tenkningen er: Denne parameteren er for bruk med skript. Hvis du bruker programmet i interaktiv modus (Skrive informasjon på tastaturet) , du er sannsynlig å generere noen feil biter av XML før du generere den du vil.) 
* Hvis Start- og Sluttlinjene ikke er funnet, blir disse linjene og det nye innholdet satt inn rett før&lt;/erddapDatasett&gt;.
* Det finnes også en -I (kapital i) bryter for testformål som fungerer som -i, men oppretter en fil kaltdatasets.xml *Datotid* og gjør ikke endringer idatasets.xml..
* Ikke kjør Genererer Datasett Xml i to prosesser samtidig. Det er en sjanse for at det vil bli holdt én endring. Det kan være alvorlige problemer (For eksempel skadde filer) ..
    
Hvis du bruker -GreateDatasetsXml -verbose - vil det skrive ut mer diagnostiske meldinger enn vanlig.
    
#### Spesial/Pseudo Datasett Typer{#specialpseudo-dataset-types} 
Generelt, EDDType-alternativene i Genererer Datasett Xml-match av EDD-typene beskrevet i dette dokumentet (Se[Liste over datasetttyper](#list-of-types-datasets)) og generere endatasets.xmlbit for å opprette ett datasett fra én bestemt datakilde. Det er noen unntak og spesielle tilfeller:
    
##### EDDGridFraErddap{#eddgridfromerddap} 
Denne EDDType genererer alledatasets.xmlBiter som trengs for å lage[EDDGridFraErddap](#eddfromerddap)Datasett fra alleEDDGriddatasett i fjernkontrollenERDDAP.. Du vil ha muligheten til å holde den opprinneligedatasetIDs (som kan duplisere noendatasetIDallerede i dinERDDAP) eller å generere nye navn som vil være unike (Men vanligvis ikke som menneskeleselig) ..
     
##### EDDTableFraErddap{#eddtablefromerddap} 
Denne EDDType genererer alledatasets.xmlBiter som trengs for å lage[EDDTableFraErddap](#eddfromerddap)datasett fra alle EDDTable-datasett i en eksternERDDAP.. Du vil ha muligheten til å holde den opprinneligedatasetIDs (som kan duplisere noendatasetIDallerede i dinERDDAP) eller å generere nye navn som vil være unike (Men vanligvis ikke som menneskeleselig) ..
     
##### EDDGridFraThreddsCatalog{#eddgridfromthreddscatalog} 
Denne EDDType genererer alledatasets.xmlKnebb som trengs for alle[EDDGridFraDap](#eddgridfromdap)datasett som det kan finne ved å krype rekursivt gjennom en TREDDS (sub) Katalog. Det er mange former for THREDDS katalog-adresser. Dette alternativet REQUIRES a THREDDS .xml URL med / catalog / i det, for eksempel,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml eller
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(en relatert .html katalog er på
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html som ikke er akseptabelt forEDDGridFra ThreddsCatalog).
Hvis du har problemer medEDDGridFraThredds Katalog:
* Kontroller at URL-adressen du bruker er gyldig, inkluderer / catalog/, og slutter med / catalog.xml .
* Hvis det er mulig, bruk en offentlig IP-adresse (For eksempel https://oceanwatch.pfeg.noaa.gov ) i URLen, ikke en lokal numerisk IP-adresse (For eksempel https://12.34.56.78 ) .. Hvis THREDDS er kun tilgjengelig via den lokale numeriske IP-adressen, kan du bruke [&lt;convertToPublicSourceUrl&gt;] (#converttopublicsourceurl) såERDDAP™brukere ser offentlig adresse, selv omERDDAP™får data fra den lokale numeriske adressen.
* Hvis du har problemer som du ikke kan løse,[Sjekk feilsøking tips](#troubleshooting-tips)..
* Den lave nivåkoden for dette bruker nåUnidatanetcdf-java katalog crawler kode (treder. katalogklasser) slik at det kan håndtere alle THREDDS kataloger (som kan være overraskende komplekse) Takket væreUnidataFor den koden.
         
##### EDDGridLonPM180FraErddapKatalog{#eddgridlonpm180fromerddapcatalog} 
Denne EDDType generererdatasets.xmlå lage[EDDGridLonPM180](#eddgridlonpm180)Datasett fra alleEDDGridDatasett i etERDDAPsom har noen lengdeverdier høyere enn 180.
* Hvis det er mulig, bruk en offentlig IP-adresse (For eksempel https://oceanwatch.pfeg.noaa.gov ) i URLen, ikke en lokal numerisk IP-adresse (For eksempel https://12.34.56.78 ) .. HvisERDDAP™er kun tilgjengelig via den lokale numeriske IP-adressen, kan du bruke [&lt;convertToPublicSourceUrl&gt;] (#converttopublicsourceurl) såERDDAP™brukere ser offentlig adresse, selv omERDDAP™får data fra den lokale numeriske adressen.
         
##### EDDGridLon0360FraErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Denne EDDType generererdatasets.xmlå lage[EDDGridDreier0360](#eddgridlon0360)Datasett fra alleEDDGridDatasett i etERDDAPsom har noen lengdeverdier mindre enn 0.
* Hvis det er mulig, bruk en offentlig IP-adresse (For eksempel https://oceanwatch.pfeg.noaa.gov ) i URLen, ikke en lokal numerisk IP-adresse (For eksempel https://12.34.56.78 ) .. HvisERDDAP™er kun tilgjengelig via den lokale numeriske IP-adressen, kan du bruke [&lt;convertToPublicSourceUrl&gt;] (#converttopublicsourceurl) såERDDAP™brukere ser offentlig adresse, selv omERDDAP™får data fra den lokale numeriske adressen.
         
##### EDDsFra Filer{#eddsfromfiles} 
Gitt en startmappe, dette krysser katalogen og alle undermapper og prøver å opprette et datasett for hver gruppe av datafiler som den finner.
* Dette antar at når et datasett er funnet, inneholder datasettet alle underkataloger.
* Hvis et datasett finnes, vil lignende søskenmapper bli behandlet som separate datasett (For eksempel vil kataloger på 1990-tallet, 2000-tallet, 2010-tallet, generere separate datasett) .. De bør være enkle å kombinere for hånd - bare endre det første datasettet&lt;filDir&gt; til forelderkatalogen og slette alle de påfølgende søskendatasettene.
* Dette vil bare prøve å generere en del avdatasets.xmlfor den vanligste filtypen i en katalog (ikke teller .md5, som ignoreres) .. Så gitt en katalog med 10.ncfiler og 5 .txt-filer, en datasett genereres for.ncBare filer.
* Dette antar at alle filer i en katalog med samme utvidelse hører til i samme datasett. Hvis en katalog har noen.ncfiler med SST-data og noen.ncfiler med klorofylldata, bare én prøve.ncfilen vil bli lest (SST? Klorofyll?) og bare ett datasett vil bli opprettet for den filtypen. Det datasettet vil sannsynligvis ikke laste på grunn av komplikasjoner fra å prøve å laste to typer filer inn i det samme datasettet.
* Hvis det er færre enn 4 filer med den vanligste utvidelsen i en mappe, antar dette at de ikke er datafiler og bare hopper over katalogen.
* Hvis det er 4 eller flere filer i en katalog, men dette kan ikke generere en bit avdatasets.xmlfor filene (For eksempel en filtype som ikke støttes) Dette vil generere et[EDDTableFromFileNames](#eddtablefromfilenames)datasett for filene.
* På slutten av diagnosen som dette skriver til loggfilen, like førdatasets.xmlbunter, vil dette skrive ut en tabell med et sammendrag av informasjon samlet ved å krysse alle underkataloger. Tabellen vil liste hver underkatalog og angi den vanligste filtypen, det totale antall filer, og hvilken type datasett ble opprettet for disse filene (dersom noen) .. Hvis du står overfor en kompleks, dypt resirkulert filstruktur, vurdere å kjøre Genererer Datasett Xml med EDDType=EDDsFromFiles bare for å generere denne informasjonen,
* Dette alternativet kan ikke gjøre en god jobb å gjette den beste EDDType for en gitt gruppe datafiler, men det er raskt, enkelt og verdt et forsøk. Hvis kildefilene er egnet, fungerer det bra og er et godt første skritt i å genereredatasets.xmlfor et filsystem med mange underkataloger, hver med datafiler fra forskjellige datasett.
         
##### EDDTableFromeML og EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Disse spesielle EDDType generererdatasets.xmlå lage en[EDDTableFraAsciiFiler](#eddtablefromasciifiles)datasett fra hver av tabellene beskrevet i en[Økologisk metadataspråk](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML-fil. varianten "Batch" fungerer på alle EML-filene i en lokal eller ekstern katalog. Se den separate[dokumentasjon for EDDTableFromEML](/docs/server-admin/EDDTableFromEML)..
     
##### EDDTableFra InPort{#eddtablefrominport} 
Denne spesielle EDDType generererdatasets.xmlå lage en[EDDTableFraAsciiFiler](#eddtablefromasciifiles)Datasett fra informasjonen i et[inport-xml](https://inport.nmfs.noaa.gov/inport)fil. Hvis du kan få tilgang til kildedatafilen (inport-xml-filen bør ha spor for hvor den skal finnes) Du kan lage et arbeidsdatasett iERDDAP..

Følgende trinn omriss hvordan du bruker Genererer Datasett Xml med en inport-xml-fil for å få et fungerende datasett iERDDAP..

1. Når du har tilgang til inport-xml-filen (enten som URL eller en lokal fil) kjør Generer datasett Xml, angi EDDType=EDDTableFromInPort, angi inport-xml URL eller fullstendig filnamn, angi hvilkenChild=0, og angi den andre etterspurte informasjonen (hvis kjent) .. (På dette punktet trenger du ikke ha kildedatafilen eller angi navnet.) Den som Child=0 innstillingen forteller Genererer Datasett Xml å skrive ut informasjonen for **alle** av&lt;Entry-adtribute-informasjon &gt;&lt;enhet&gt; er i inport-xml-filen (Hvis det er noen) .. Det skriver også ut et sammendrag av bakgrunnsinformasjon, inkludert alle nedlastings-url som er oppført i inport-xml-filen.
2. Se gjennom all denne informasjonen (inkludert bakgrunnsinformasjon som genererer datasett Xml-utskrifter) og besøk nedlastningsadressen (s) for å finne kildedatafilen (s) .. Hvis du finner den (dem) Last ned den (dem) i en katalog som er tilgjengelig forERDDAP.. (Hvis du ikke finner noen kildedatafiler, er det ikke noe poeng i å fortsette.) 
3. Kjør Generer Datasett Xml igjen.
Hvis kildedatafilen tilsvarer en av inport-xml-filens&lt;Entry-adtribute-informasjon &gt;&lt;Entitet&gt;s, angi hvilken Child= *At Entity'sNumber*   (f.eks. 1, 2, 3, ...) ..ERDDAP™vil forsøke å matche kolonnenavnene i kildedatafilen til navn i enhetsinformasjonen, og be om å godta/avvise/fikse eventuelle ulikheter.
Hvis inport-xml-filen ikke har noen&lt;Entry-adtribute-informasjon &gt;&lt;Entitet&gt; er, angi hvilken Child=0.
4. I biten avdatasets.xmlsom ble laget av GenerateDatasets Xml, revidere [Global&lt;addAttributes&gt;] (#global-adtributer) etter behov/nedbrutt.
5. I biten avdatasets.xmlsom ble laget av GenerationDatasetsXml, legg til/revider [&lt;dataVariable&gt;] (#datavariable) Informasjon etter behov/avledet for å beskrive hver av variablene. Vær sikker på at du identifiserer hver variabel riktig
[&lt;sourceName&gt;] (#kildenavn)   (Som det vises i kilden) ,
[&lt;destinationName&gt;] (#destinasjonsnavn)   (som har flere begrensninger på tillatte tegn ennsourceName) ,
[&lt;enheter&gt;] (#units)   (Spesielt om det er[Tid eller tidsstempelvariabel](#timestamp-variables)hvor enhetene må angi formatet) , og
[&lt;missing\\_value&gt;] (#missing_value) ,
6. Når du er nær ferdig, bruk gjentatte ganger[DasDds](#dasdds)verktøy for å raskt se om datasett beskrivelsen er gyldig og om datasettet vises iERDDAP™Som du vil.
     

Det ville være flott hvis grupper som bruker InPort til å dokumentere sine datasett også vil brukeERDDAP™å gjøre de faktiske dataene tilgjengelige:

*   ERDDAP™er en løsning som kan brukes akkurat nå slik at du kan oppfylleNOAA's[Offentlig tilgang til forskningsresultater (PARR) Krav](https://nosc.noaa.gov/EDMC/PD.DSP.php)Akkurat nå, ikke på noe vage tidspunkt i fremtiden.
*   ERDDAP™gjør de faktiske dataene tilgjengelige for brukerne, ikke bare metadata. (Hva er bra med metadata uten data?) 
*   ERDDAP™støtter metadata (Spesielt variabler) , i motsetning til noen andre dataserver programvare blir vurdert. (Hva er bra med data uten metadata?) Å bruke programvare som ikke støtter metadata er å invitere dataene til å bli misforstått og misbrukt.
*   ERDDAP™er gratis og åpen kildekode programvare i motsetning til noen annen programvare som vurderes. Fremtidig utvikling avERDDAP™allerede betalt. Støtte tilERDDAP™Brukerne er gratis.
*   ERDDAPutseendet kan enkelt tilpasses for å reflektere og markere gruppen din (ikkeERDellerERDDAP) ..
*   ERDDAP™Tilbyr en konsekvent måte å få tilgang til alle datasett.
*   ERDDAP™kan lese data fra mange typer datafiler og fra relasjonelle databaser.
*   ERDDAP™kan håndtere store datasett, inkludert datasett der kildedataene er i mange datafiler.
*   ERDDAP™kan skrive data til mange typer datafiler, på brukerens forespørsel, inkludert vitenskapelige datafiler som netCDF, ESRI .csv, ogODV .txt..
*   ERDDAP™kan gjøre egendefinerte grafer og kart over undergrupper av dataene, basert på brukerens spesifikasjoner.
*   ERDDAP™kan håndtere ikke-data datasett som samlinger av bilder, video eller lydfiler.
*   ERDDAP™har blitt installert og brukt på[Mer enn 60 institusjoner over hele verden](/#who-uses-erddap)..
*   ERDDAP™er oppført som en av dataserverne som anbefales til bruk iNOAAi[NOAADatatilgangsdirektivet](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)I motsetning til noen annen programvare som vurderes.
*   ERDDAP™er et produkt avNMFS/NOAASå bruk den iNMFSogNOAABør være et punkt av stolthet forNMFSogNOAA..

Vennligst giERDDAP™Et forsøk. Hvis du trenger hjelp, vennligst send en melding iERDDAP™Google Group.
     
##### addFillValueAttributes{#addfillvalueattributes} 
Dette spesielle EDDType-alternativet er ikke en type datasett. Det er et verktøy som kan legge til \\_FillValue-attributter til noen variabler i noen datasett. Se[addFillValueAttributes](#add-_fillvalue-attributes)..
     
##### findDuplikat Tid{#findduplicatetime} 
Dette spesielle EDDType-alternativet er ikke en type datasett. I stedet forteller det Genererer Datasett Xml å søke gjennom en samling av rutenett.nc  (og relatert) filer for å finne og skrive ut en liste over filer med dupliserte tidsverdier. Når den ser på tidsverdiene, konverterer den dem fra de opprinnelige enhetene til"seconds since 1970-01-01"i tilfelle forskjellige filer bruker forskjellige enheter strenger. Du må oppgi startkatalogen (med eller uten etterfølgende skråstrek) , filnavnet regulært uttrykk (f.eks..nc ) Navnet på tidsvariabelen i filene.
     
##### ncdump{#ncdump} 
Dette spesielle EDDType-alternativet er ikke en type datasett. I stedet forteller det Genererer Datasett Xml å skrive ut en[ncdump](https://linux.die.net/man/1/ncdump)\\ Som å skrive ut en.nc,.ncml eller.hdffil. Den bruker faktisk netcdf-java[NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), som er et mer begrenset verktøy enn C-versjonen av NCdump. Hvis du bruker dette alternativet, vil CreateDatasetsXml be deg om å bruke en av alternativene: "-h" (overskrift) ,c " (Koordinater vars) ,  "-vall" (standard) ,  "-v var1;var2",  "-v var1 (0,0:10,0:20)  ". Dette er nyttig fordi uten ncdump det er vanskelig å vite hva som er i en.nc,.ncml eller.hdffil og dermed hvilken EDDType du bør spesifisere for Genererer Datasett Xml. For en.ncml fil, vil dette skrive ut ncdump utdata for resultatet av.ncml filendringer påført de underliggende.nceller.hdffil.
         
### DasDds{#dasdds} 
*   [ **DasDds** ](#dasdds)er et kommandolinjeprogram som du kan bruke etter at du har opprettet et første forsøk på XML for et nytt datasett idatasets.xml.. Med DasDds kan du gjentatte ganger teste og raffinere XML. Når du bruker DasDds-programmet:
    1. På Windows, første gang du kjører DasDds, må du redigere DasDds. flaggermusfil med en tekstredigering for å endre banen til java. exe-fil slik at Windows kan finneJava..
    2. DasDds ber deg omdatasetIDfor datasettet du jobber med.
    3. DasDds prøver å opprette datasettet med detdatasetID..
        * DasDds skriver alltid ut mange diagnostiske meldinger.
Hvis du bruker " DasDds -verbose", DasDds vil skrive ut mer diagnostiske meldinger enn vanlig.
        * For sikkerhet sletter DasDds alltid all datasettinformasjonen som blir lagret (filer) for datasettet før du prøver å opprette datasettet. Dette svarer til å sette en[hard flagg](/docs/server-admin/additional-information#hard-flag)Så for aggregerte datasett kan du justere filenNameRegex midlertidig for å begrense antall filer som datakonstruktøren finner.
        * Hvis datasettet ikke lastes (uansett grunn) DasDds vil stoppe og vise deg feilmeldingen for den første feilen den finner.
             **Ikke prøv å gjette hva problemet kan være. Les feilmeldingen nøye.**   
Hvis nødvendig, les de foregående diagnostiske meldingene for å finne mer spor og informasjon også.
        *    **Gjør en endring i datasettets XML for å prøve å løse problemet**   
og la DasDds prøve å opprette datasettet igjen.
        *    **Hvis du gjentatte ganger løser hvert problem, vil du til slutt løse alle problemene**   
og datasettet vil laste.
    4. Alle DasDds-utgang (diagnostikk og resultater) er skrevet på skjermen og til *bigParentDirectory* /logg/DasDds.log.
    5. Hvis DasDds kan opprette datasettet, vil DasDds vise deg det[.das (Datasett-attributtsstruktur) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das),[.dds (Datasett Descriptor Struktur) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds), og[.timeGaps (tidsforskjell) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)informasjon for datasettet på skjermen og skrive dem til *bigParentDirectory* /logg/DasDds.out.
    6. Ofte vil du gjøre noen små endringer i datasettets XML for å rydde opp datasettets metadata og kjøre om DasDds.

### Bonus Tredjepartsverktøy:ERDDAP-lint{#bonus-third-party-tool-erddap-lint} 
ERDDAP-lint er et program fra Rob Fuller og Adam Leadbetter fra Irish Marine Institute som du kan bruke til å forbedre metadataene til dinERDDAP™Datasett.ERDDAP-lint " inneholder regler og en enkel statisk webapplikasjon for å kjøre noen verifikasjonstester mot dinERDDAP™server. Alle testene kjører i nettleseren." som[Unix/Linux lint verktøy](https://en.wikipedia.org/wiki/Lint_(software)), kan du redigere eksisterende regler eller legge til nye regler. Se[ERDDAP-lint](https://github.com/IrishMarineInstitute/erddap-lint)For mer informasjon.

Dette verktøyet er spesielt nyttig for datasett som du opprettet for noen tid siden og nå ønsker å få oppdatert med dine gjeldende metadatainnstillinger. For eksempel tidlige versjoner av Genererer Datasett Xml gjorde ingen innsats for å skape globalcreator\\_name,creator\\_email, skaper\\_type, ellercreator\\_urlmetadata. Du kan brukeERDDAP-fast for å identifisere datasett som mangler disse metadata attributtene.

Takk til Rob og Adam for å lage dette verktøyet og gjøre det tilgjengelig forERDDAP™Samfunn.
 
## Grunnleggende struktur avdatasets.xmlFil{#the-basic-structure-of-the-datasetsxml-file} 
De nødvendige og valgfrie taggene er tillatt i endatasets.xmlfil (og antall ganger de kan vises) vises nedenfor. I praksis, dindatasets.xmlvil ha mye&lt;datasett&gt;s tags og bare bruk de andre taggene i&lt;ErddapDatasett &gt; etter behov.

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

Det er mulig at andre koder vil bli tillatt i fremtiden, men for nå anbefales det bare ISO-8859-1.
 
### XInclude{#xinclude} 
Nytt i versjon 2.25 er støtte for XInclude. Dette krever at du bruker SAX-tolkeren&lt;brukSaxParser&gt;true&lt;/useSaxParser&gt; i setup.xml. Dette kan la deg skrive hvert datasett i sin egen fil, og deretter inkludere dem alle i hovedsakdatasets.xml, gjenbruke deler av datasettdefinisjoner, eller begge deler. Hvis du vil se et eksempel,[EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)konfigurerer XInclude til å gjenbruke variable definisjoner.
 

- -

## Noter{#notes} 

Arbeide meddatasets.xmlFilen er et ikke-trivielt prosjekt. Les alle disse notatene nøye. Når du velger en[type datasett](#list-of-types-datasets)Les den detaljerte beskrivelsen nøye.
     
### Valg av datasetttype{#choosing-the-dataset-type} 
I de fleste tilfeller er det bare énERDDAP™datasett som er egnet for en gitt datakilde. I noen tilfeller (f.eks..ncfiler) Det er noen muligheter, men vanligvis er en av dem definitivt best. Den første og største beslutningen du må gjøre er: er det hensiktsmessig å behandle datasett som en gruppe flerdimensjonale rekker (Hvis så se[EDDGriddatasetttyper](#eddgrid)) eller som en databaselignende tabell over data (Hvis så se[EDDTable datasett](#eddtable)) ..
     
### Å tjene dataene som er{#serving-the-data-as-is} 
Vanligvis er det ikke nødvendig å endre datakilden (For eksempel konvertere filene til en annen filtype) slik atERDDAP™kan tjene det. En av antagelsene omERDDAP™er at datakilden vil bli brukt som det er. Vanligvis fungerer dette bra. Noen unntak er:
* Relasjonelle databaser og Cassandra --ERDDAP™kan betjene data direkte fra relasjonelle databaser og Cassandra. Men for sikkerhet, belastningsbalansering og ytelsesproblemer kan du velge å opprette en annen database med samme data eller lagre data tilNetCDFv3.ncfiler og harERDDAP™servere data fra den nye datakilden. Se[EDDTableFraDatabase](#eddtablefromdatabase)og[EDDTableFraCassandra](#eddtablefromcassandra)..
* Ikke støttede datakilder --ERDDAP™kan støtte et stort antall typer datakilder, men verden er fylt med 1000-tallets (Millioner?) forskjellige datakilder (spesielt datafilstrukturer) .. HvisERDDAP™Støtter ikke datakilden:
    * Hvis datakilden erNetCDF .ncfiler, du kan bruke[NcML](#ncml-files)å endre datafilene på flyet eller bruke[NCO](#netcdf-operators-nco)å permanent endre datafilene.
    * Du kan skrive data til en datakildetype somERDDAP™støtte.NetCDF-3.ncfiler er en god, generell anbefaling fordi de er binære filer somERDDAP™Kan leses veldig raskt. For tabelldata, vurdere å lagre dataene i en samling av.ncfiler som bruker[CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Tagge Array datastrukturer og så kan håndteres medERDDAP's[EDDTableFraNcCFFiler](#eddtablefromnccffiles)). Hvis de er logisk organisert (hver med data for en bit plass og tid) ,ERDDAP™kan raskt trekke ut data fra dem.
    * Du kan be om at støtte for denne datakilden legges til iERDDAP™via e-post til Chris. John på noaa.gov.
    * Du kan legge til støtte for den datakilden ved å skrive koden for å håndtere den selv. Se[denERDDAP™Programmørens veiledning](/docs/contributing/programmer-guide)
* Hastighet --ERDDAP™kan lese data fra noen datakilder mye raskere enn andre. For eksempel å leseNetCDFv3.ncfiler er raske og å lese ASCII-filer er langsommere. Hvis det er en stor (&gt; 1000) eller stor (&gt;10 000) antall kildedatafiler,ERDDAP™vil svare på noen dataforespørsler sakte. Vanligvis er forskjellen ikke merkbar for mennesker. Men hvis du trorERDDAP™er langsom for et gitt datasett, kan du velge å løse problemet ved å skrive dataene til en mer effektiv installasjon (Vanligvis: noen, velstrukturert,NetCDFv3.ncfiler) .. For tabelldata, se[Dette rådet](#millions-of-files)..
         
### Tips{#hint} 
Det er ofte enklere å generere XML for et datasett ved å gjøre en kopi av en arbeidsdatasett beskrivelse i dataset.xml og deretter endre det.
    
### Koding av spesielle tegn{#encoding-special-characters} 
Sidendatasets.xmler en XML-fil, du må[& kode](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"&", "&lt;", og "&gt;" i ethvert innhold som "&amp;", "&lt;", og "&gt;".
Feil:&lt;tittel&gt; Tid & Tider&lt;/title&gt;
Høyre:&lt;tittel&gt; Tid & amp; Tider&lt;/title&gt;
     
### XML tolererer ikke syntaksfeil{#xml-doesnt-tolerate-syntax-errors} 
Når du redigerer filen dataset.xml, er det en god ide å bekrefte at resultatet er[velformet XML](https://www.w3schools.com/xml/xml_dtd.asp)ved å lime XML-teksten inn i en XML-kontroll som[xmlvalidering](https://www.xmlvalidation.com/)..
     
### Feilsøking Tips{#troubleshooting-tips} 
*    **Andre måter å diagnostisere problemer med datasett**   
I tillegg til de to viktigste[Verktøy](#tools),
    *   [log.txt](/docs/server-admin/additional-information#log)er en loggfil med heleERDDAPDe diagnostiske meldingene.
    * Den[Daglig rapport](/docs/server-admin/additional-information#daily-report)har mer informasjon enn statussiden, inkludert en liste over datasett som ikke lastet og unntakene (feil) De genererte.
    * Den[Statusside](/docs/server-admin/additional-information#status-page)En rask måte å sjekke påERDDAPStatus fra enhver nettleser. Det inneholder en liste over datasett som ikke lastes (Men ikke de relaterte unntakene) Les statistikk (å vise fremdriften av[EDDGridKopier](#eddgridcopy)og[EDDTableCopy](#eddtablecopy)Datasett og alle[EDDGridFraFiles](#eddgridfromfiles)eller[EDDTableFra Filer](#eddtablefromfiles)Datasett som bruker[cacheFromUrl](#cachefromurl)  (Men ikke cache SizeGB) ) ..
    * Hvis du sitter fast, se vår[Seksjon om å få ekstra støtte](/docs/intro#support)..
         
### Spesialvariabler{#special-variables} 
*    **[Lengdegrad, breddegrad, høyde (eller dybde) , og tid (LLAT) variabel](#destinationname) [destinationName](#destinationname)S er spesielle.** 
    * Generelt:
        * LLAT-variabler er kjent forERDDAP™dersom aksevariabelen er (forEDDGridDatasett) eller datavariabelens (for EDDTable datasett)  [destinationName](#destinationname)er "langdide",latitude breddegrad " "alaltitude " "dybde", eller"time"..
        * Vi oppfordrer deg til å bruke disse standardnavnene på disse variablene når det er mulig. Ingen av dem er nødvendig. Hvis du ikke bruker disse spesielle variabelnavnene,ERDDAP™vil ikke gjenkjenne deres betydning. For eksempel behandles LLAT-variabler spesielt av Make A Graph ( *datasetID* .graph) : Hvis X-aksevariabelen er - lengdegrad - og Y-aksevariabelen er - breddegrad - får du et kart (ved hjelp av standardprojeksjon, og med landmaske, politiske grenser osv.) I stedet for en graf.
        *   ERDDAP™vil automatisk legge til mange metadata til LLAT-variabler (For eksempel:[ioos\\_category](#ioos_category)", "[enheter](#units)" og flere standardrelaterte attributter som "__CoordinateAxisType") ..
        *   ERDDAP™vil automatisk legge til mange globale metadata knyttet til LLAT-verdiene i den valgte datagruppen (For eksempel "geospatial\\_lon\\_min") ..
        * Kunder som støtter disse metadatastandardene, vil kunne dra nytte av de tilsatte metadataene for å plassere dataene i tid og rom.
        * Kundene finner det lettere å generere forespørsler som inkluderer LLAT-variabler fordi variabelens navn er de samme i alle relevante datasett.
    * For variabelen " lengdegrad" og breddegrad" variabelen:
        * Bruk[destinationName](#destinationname)s " lengdegrad" og " breddegrad" bare hvis[enheter](#units)er grader\\_øst og grader__nord, henholdsvis. Hvis dataene dine ikke passer til disse kravene, bruk forskjellige variabelnavn (For eksempel x, y, lonRadians, latRadians) ..
        * Hvis du har lengdegrad og breddegrad data uttrykt i forskjellige enheter og dermed med forskjelligdestinationNames, for eksempel lonRadians og latRadians, lage en graf ( *datasetID* .graph) vil lage grafer (For eksempel tidsserier) I stedet for kart.
    * For "altitude" variabel og "dybde" variabel:
        * Bruk[destinationName](#destinationname)Høyde" å identifisere dataenes avstand over havet (positive=-up-verdier) .. Valgfritt kan du bruke "altitude" for avstander under havnivå hvis verdiene er negative under havet (eller hvis du for eksempel bruker,
[&lt;navn="scale\\_factor" type="int"&gt;- 1&lt;/att&gt;] (#scale_factor) å konvertere dybdeverdier til høydeverdier.
        * BrukdestinationName"dybde" å identifisere dataenes avstand under havnivå (positive=" ned" verdier) ..
        * Et datasett kan ikke ha både "altitude" og "dybde" variabler.
        * For disse variable navnene,[enheter](#units)må være "m " "meter", eller "meter". Hvis enhetene er forskjellige (For eksempel fathoms) Du kan bruke
[&lt;navn="scale\\_factor"&gt; *Noen Verdi* &lt;/att&gt;] (#scale_factor) og&lt;Att name=" enheter"&gt; meter&lt;/att&gt;] (#units) å konvertere enhetene til meter.
        * Hvis dataene ikke passer til disse kravene, bruk en annendestinationName  (For eksempel, overGround, avstand Til Bottom) ..
        * Hvis du vet det vertikale CRS vennligst angi det i metadata, for eksempel, "EPSG:5829" (øyeblikkelig høyde over havet) ,  "EPSG:5831" (øyeblikkelig dybde under havet) , eller  "EPSG:5703" (NAVD88 høyde) ..
    * For"time"variabel:
        * Bruk[destinationName](#destinationname) "time"Bare for variabler som inkluderer hele datoen + tid (eller dato, hvis det er alt det er) .. Hvis det for eksempel er separate kolonner for dato og tidOfDay, ikke bruk variabelnavnet"time"..
        * Se[enheter](#time-units)for mer informasjon om enhetene attributt for tid og tidStamp variabler.
        * Tidsvariabelen og relatert[tid Stempelvariabler](#timestamp-variables)er unike ved at de alltid konverterer dataverdier fra kildens tidsformat (Hva det enn er) i en numerisk verdi (sekunder siden 1970-01-01T00:00:00Z) eller en strengverdi (ISO 8601:2004 (E) format) avhengig av situasjonen.
        * Når en bruker ber om tidsdata, kan de be om det ved å angi tiden som en numerisk verdi (sekunder siden 1970-01-01T00:00:00Z) eller en strengverdi (ISO 8601:2004 (E) format) ..
        *   ERDDAP™har et verktøy til[Konverter et tall Tid til/fra en strengtid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)..
        * Se[HvordanERDDAPAvtaler med tiden](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)..
            
### Hvorfor bare to grunnleggende datastrukturer?{#why-just-two-basic-data-structures} 
* Siden det er vanskelig for menneskelige klienter og datamaskinkunder å håndtere et komplekst sett av mulige datasettstrukturer,ERDDAP™bruker bare to grunnleggende datastrukturer:
    * a[Netteded datastruktur](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (For eksempel for satellittdata og modelldata) og
    * a[tabelldatastruktur](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (For eksempel, for in-situ bøy, stasjon og banedata) ..
* Selvfølgelig kan ikke alle data uttrykkes i disse strukturene, men mye av det kan. Tabellene er spesielt svært fleksible datastrukturer (Se på suksessen til relasjonelle databaseprogrammer) ..
* Dette gjør det enklere å bygge data.
* Dette gjør dataresponsene enkle, noe som gjør det lettere å betjene dataene i et bredere utvalg av standard filtyper. (som ofte bare støtter enkle datastrukturer) .. Dette er hovedårsaken til at vi opprettetERDDAP™Denne veien.
* Dette gjør det igjen veldig enkelt for oss (eller noen) å skrive klientprogramvare som fungerer med alleERDDAP™Datasett.
* Dette gjør det lettere å sammenligne data fra forskjellige kilder.
* Vi er svært klar over at hvis du er vant til å jobbe med data i andre datastrukturer kan du i utgangspunktet tro at denne tilnærmingen er enkel eller utilstrekkelig. Men alle datastrukturer har avdrag. Ingen er perfekt. Selv do-it-alle strukturer har sine ulemper: å jobbe med dem er komplekst og filene kan bare skrives eller leses med spesielle programvarebiblioteker. Hvis du godtarERDDAP's tilnærming nok til å prøve å jobbe med det, kan du finne ut at det har sine fordeler (spesielt støtte for flere filtyper som kan holde datasvarene) .. Den[ERDDAP™lysbildeshow](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (spesielt[Datastrukturer lysbilde](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) Snakker mye om disse problemene.
* Og selv om denne tilnærmingen høres merkelig ut for deg, de flesteERDDAP™klienter vil aldri merke - de vil bare se at alle datasettene har en fin enkel struktur, og de vil være takknemlige for at de kan få data fra et bredt utvalg av kilder returnert i en rekke ulike filformater.
         
### Dimensjoner{#dimensions} 
*    **Hva om rutenettvariabler i kildedatasettet DON'T deler de samme aksevariabler?**   
IEDDGriddatasett, alle datavariabler må brukes (aksje) alle aksevariabler. Så hvis et kildedatasett har noen variabler med ett sett dimensjoner, og andre variabler med et annet sett dimensjoner, må du gjøre to datasett iERDDAP.. Du kan for eksempel lage enERDDAP™Datasett entitled En tittel (på overflaten) to å holde variabler som bare bruker\\[tid\\]\\[breddegrad\\]\\[Lengdegrad\\]dimensjoner og lage en annenERDDAP™Datasett entitled En tittel (på dyp) " å holde variabler som brukes\\[tid\\]\\[høyde\\]\\[breddegrad\\]\\[Lengdegrad\\].. Eller kanskje du kan endre datakilden for å legge til en dimensjon med en enkelt verdi (For eksempel høyde=0) For å gjøre variablene konsekvente.
    
    ERDDAP™håndterer ikke mer kompliserte datasett (For eksempel modeller som bruker en mesh av trekanter) Vel. Du kan betjene disse datasettene iERDDAP™ved å opprette to eller flere datasett iERDDAP™  (slik at alle datavariabler i hvert nytt datasett deler det samme sett av aksevariabler) Men det er ikke det brukerne vil. For noen datasett kan du vurdere å lage en regelmessig nettbasert versjon av datasettet og tilby det i tillegg til originale data. Noen klient programvare kan bare håndtere et vanlig rutenett, så ved å gjøre dette, når du ytterligere kunder.
     
    
### Prosjektert Gristed Data{#projected-gridded-data} 
En del av dataene har en kompleks struktur. For eksempel satellittnivå 2 (Langt spor") Data bruker ikke en enkel projeksjon. Modeller (andre) Ofte jobber med gitte data om ulike ikke-cylindriske fremspring (For eksempel konisk, polar stereografi, tripolar) eller i ustrukturerte rutenett (En mer kompleks datastruktur) .. Noen av sluttbrukere vil ha disse dataene som er, så det er ingen tap av informasjon. For disse kundene,ERDDAP™kan tjene dataene, som det er, bare hvisERDDAP™administrator bryter det opprinnelige datasettet i noen få datasett, med hver del inkludert variabler som deler de samme aksevariabler. Ja, det virker rart for folk involvert, og det er forskjellig fra de flesteOPeNDAPservere. MenERDDAP™legger vekt på å gjøre dataene tilgjengelige i mange formater. Det er mulig fordiERDDAP™bruk / krever en mer ensartet datastruktur. Selv om det er litt vanskelig (Det vil si annerledes enn forventet) ,ERDDAP™kan distribuere de forventede dataene.

\\[Ja,ERDDAP™kan ha løsere krav til datastrukturen, men holde kravene til utgangsformatene. Men det vil føre til forvirring blant mange brukere, spesielt nybegynnere, siden mange tilsynelatende gyldige forespørsler om data med ulike strukturer ville være ugyldig fordi dataene ikke ville passe inn i filtypen. Vi kommer tilbake til dagens design.\\]

Noen sluttbrukere ønsker data i en lat-lon sylindrisk projeksjon som Equirektangulær / platekarrée eller Mercator) for enkel bruk i forskjellige situasjoner. For disse situasjonene oppfordrer viERDDAP™administrator å bruke noe annet programvare (NCO?Matlab? R? IDV? ...?) å reprosjektere dataene på et geografisk (Equirektangulær projeksjon / plate carrée) eller annen sylindrisk projeksjon og tjener den formen av dataene iERDDAP™som et annet datasett. Dette ligner på hva folk gjør når de konverterer satellittnivå 2 data til nivå 3 data. Et slikt verktøy er[NCO](https://nco.sourceforge.net/nco.html#Regridding)som tilbyr utvidelsesalternativer for omarbeiding av data.

#### GIS og reprosjektering av data{#gis-and-reprojecting-data} 
Siden GIS-verdenen ofte er kartorientert, tilbyr GIS-programmer vanligvis støtte for omprosjektering av dataene, dvs. planlegging av dataene på et kart med en annen projeksjon.

I dag,ERDDAP™har ikke verktøy for å reprosjektere data. I stedet anbefaler vi at du bruker et eksternt verktøy til å gjøre en variant av datasettet, der data er reprojisert fra det opprinnelige skjemaet på en rektangulær (lengdegrad) array egnet forERDDAP..

Vi mener CF/DAPverden er litt annerledes enn GIS-verdenen og jobber på et litt lavere nivå.ERDDAP™reflekterer det. Generelt,ERDDAP™Utformet for å jobbe hovedsakelig med data (ikke kart) og ønsker ikke å endre (f.eks. omprosjekt) De dataene. ForERDDAP™, gitte data er ofte/vanligvis/fortrinnsvis forbundet med latlonverdier og en sylindrisk projeksjon, og ikke noen projeksjons x,y-verdier. Uansett,ERDDAP™gjør ikke noe med dataenes projeksjon; det passerer bare dataene gjennom, som med sin nåværende projeksjon, på teorien om at en reprojeksjon er en betydelig endring i dataene ogERDDAP™Ønsker ikke å være involvert i viktige endringer. Også etterfølgende brukere kan naivt reprosjektere dataene igjen, noe som ikke ville være så bra som bare å gjøre en reprojeksjon. (HvisERDDAP™administrator ønsker å tilby data i en annen projeksjon, fint; bare reprojeksjon dataene offline og tilby det som et annet datasett iERDDAP.. Mange satellittbaserte datasett tilbys som det NASA kaller nivå 2 (swath) og som nivå 3 (Equirektangulær projeksjon) versjoner.) NårERDDAP™gjør kart (direkte eller viaWMSeller KML) ,ERDDAP™for tiden tilbyr bare å gjøre kart med Equirektangular / plate carrée-projeksjon som heldigvis er akseptert av de fleste kartleggingsprogrammer.

Vi oppfordrerERDDAP™administratorer å bruke noe annet programvare (NCO?Matlab? R? IDV? ...?) å reprosjektere dataene på et geografisk (Equirektangulær projeksjon / plate carrée) eller annen sylindrisk projeksjon og tjener den formen av dataene iERDDAP™som et annet datasett. Dette ligner på hva folk gjør når de konverterer satellittnivå 2 data til nivå 3 data. Et slikt verktøy er[NCO](https://nco.sourceforge.net/nco.html#Regridding)som tilbyr utvidelsesalternativer for omarbeiding av data.

Vi håper detERDDAP™vil ha innebygde verktøy for å tilby kart med andre projeksjoner i fremtiden. Vi håper også å ha bedre forbindelser til GIS verden i fremtiden (bortsett fra den nåværendeWMSservice) .. Det er forferdelig at i denne moderne verden, sammenhengene mellom CF/DAPVerden og GIS verden er fortsatt så svak. Begge disse tingene står på listen å gjøre. (Hvis du vil hjelpe, spesielt ved å koble tilERDDAP™til MapServer, vennligst e-post Chris. John på noaa.gov.) 
    
### Datatyper{#data-types} 
ERDDAP™støtter følgende datatyper
 (Navnene er sensitive;'u'prefiks står for "usignet"; antall mange av navnene i andre systemer er antall biter) :)

#### Byte{#byte} 
*    **Byte** har signert heltallsverdier med en rekke -128 til 127.
I andre systemer kalles dette ofte int8.
Dette kalles "tinyint" av SQL og Cassandra.
    ERDDAP™Konverterer[boolsk](#boolean-data)fra noen kilder (For eksempel SQL og Cassandra) i byte iERDDAP™med en verdi på 0=feil, 1=sann og 127=missing\\_value..
#### ubyte{#ubyte} 
*    **ubyte** har ubetegnede heltallsverdier med et område på 0 til 255.
I andre systemer kalles det noen ganger uint8.
#### kort{#short} 
*    **kort** har signert heltallsverdier med et område på -32768 til 32767.
I andre systemer kalles dette ofte int16.
Dette kalles «smallint» av SQL og Cassandra.
#### ushort{#ushort} 
*    **ushort** har ubestemte heltallsverdier med et område på 0 til 65535.
I andre systemer kalles dette ofte uint16.
#### Interessert{#int} 
*    **Interessert** har signert heltallsverdier med et område på -2147483648 til 2147483647.
I andre systemer kalles det noen ganger int32.
Dette kalles " Integer|tall (?) " av SQL og "int" av Cassandra.
#### uint{#uint} 
*    **uint** har ubestemte heltallsverdier med et område på 0 til 4294967295.
I andre systemer kalles dette noen ganger uint32.
#### lang{#long} 
*    **lang** har signert heltallsverdier med et område på -9223372036854775808 til 9223372036854775807.
I andre systemer kalles dette noen ganger int64.
Dette kalles - bigint|tall (?) " av SQL og "bigint" av Cassandra.
Fordi mange filtyper ikke støtter lange data, er bruken mislykket. Når det er mulig, bruk dobbelt i stedet (Se nedenfor) ..
#### ulong{#ulong} 
*    **ulong** har ubestemte heltallsverdier med et område på 0 til 18446744073709551615
I andre systemer kalles dette noen ganger uint64.
Fordi mange filtyper ikke støtter ulong data, er bruken av dem mislykket. Når det er mulig, bruk dobbelt i stedet (Se nedenfor) ..
#### flyte{#float} 
*    **flyte** er en IEEE 754 flyte med et område på omtrent +/- 3.402823466e+38.
I andre systemer kalles dette ofte float32.
Dette kalles virkelig|flyte (?) |desimal (?) |tall (?) " av SQL og "flytende" av Cassandra.
Den spesielle verdien NaN betyr Not-a-Number.
    ERDDAP™Konverterer positive og negative uendelige verdier til NaN.
#### dobbel{#double} 
*    **dobbel** er en IEEE 754 dobbel med et område på omtrent
+/- 1.7976931348623157E+308.
I andre systemer kalles dette ofte float64.
Dette kalles " dobbel presisjon|flyte (?) |desimal (?) |tall (?) " ved SQL og dobbel" av Cassandra.
Den spesielle verdien NaN betyr Not-a-Number.
    ERDDAP™Konverterer positive og negative uendelige verdier til NaN.
#### tegn{#char} 
*    **tegn** er en enkelt 2-byte (16-bits)  [Unicode UCS-2 tegn](https://en.wikipedia.org/wiki/UTF-16)fra\\u0000  (#0) gjennom\\uffff  (#65535) ..
    \\uffffDefinisjonen er ikke-a-Character, analog med en dobbel verdi av NaN.
Bruken av tegn er avslått fordi mange filtyper enten ikke støtter tegn eller bare støtter 1-byte tegn (Se nedenfor) .. Tenk å bruke streng i stedet.
Brukere kan bruke tegnvariabler for å lage grafer.ERDDAP™vil konvertere tegnene til deres Unicode kodepunktnummer, som kan brukes som numeriske data.
#### Streng{#string} 
*    **Streng** er en sekvens på 0 eller mer, 2-byte (16-bits)  [Unicode UCS-2 tegn](https://en.wikipedia.org/wiki/UTF-16)..
    ERDDAP™bruker/tolker en 0-lengdestreng som en manglende verdi.ERDDAP™støtter ikke en ekte nullstreng.
Den teoretiske maksimale strenglengde er 2147483647 tegn, men det er sannsynligvis ulike problemer på ulike steder selv med noe kortere strenger.
BrukERDDAPString for SQL tegn, varchar, tegn varierende, binær, varbinær, intervall, array, multiset, xml, og andre databasedatatyper som ikke passer rent med noen annenERDDAP™Datatype.
BrukERDDAP's String for Cassandras -tekst - og enhver annen Cassandra-datatype som ikke passer rent med andreERDDAP™Datatype.
     

FørERDDAP™v2.10,ERDDAP™støttet ikke ubetalte heltallstyper internt og tilbød begrenset støtte i sine datalesere og forfattere.
    
### Datatypebegrensning{#data-type-limitations} 
Du kan tenke påERDDAP™som et system som har virtuelle datasett, og som fungerer ved å lese data fra et datasetts kilde til en intern datamodell og skrive data til ulike tjenester (f.eks.(OPeN)DAP,WMS) og filtyper som svar på brukerforespørsler.

* Hver inputleser støtter en undergruppe av datatypene somERDDAP™støtte. Lese data inn iERDDAPInterne datastrukturer er ikke noe problem.
* Hver utgangsskribent støtter også en undergruppe av datatyper. Det er et problem fordiERDDAPmå for eksempel presse lange data til filtyper som ikke støtter lange data.
     

Nedenfor er forklaringer på begrensningene (eller ingen) ulike utgivelsesskrivere og hvordanERDDAP™tar seg av problemene. Slike komplikasjoner er en iboende del avERDDAPMålet er å gjøre forskjellige systemer interoperable.

#### ASCII{#ascii} 
* ASCII (.csv,.tsv, etc.) tekstfiler -
    * Alle numeriske data skrives via strengrepresentasjon (med manglende dataverdier som vises som 0-lengde strenger) ..
    * Selv omERDDAP™skriver lange og ulange verdier riktig til ASCII tekstfiler, mange lesere (For eksempel regnearkprogrammer) kan ikke riktig håndtere lange og ulange verdier og i stedet konvertere dem til doble verdier (med tap av presisjon i noen tilfeller) ..
    * Char and String data er skrevet via JSON Strings, som håndterer alle Unicode tegn (Spesielt de uvanlige tegnene utover ASCII #127, f.eks. vises Euro-tegnet som -\\u20ac -) ..
    
        
#### JSON{#json} 
* JSON (.json,.jsonlCSV, etc.) tekstfiler -
    * Alle numeriske data skrives via sin strengrepresentasjon.
    * Char and String data er skrevet som JSON Strings, som håndterer alle Unicode tegn (Spesielt de uvanlige tegnene utover ASCII #127, f.eks. vises Euro-tegnet som -\\u20ac -) ..
    * Manglende verdier for alle numeriske datatyper vises som null.
         
#### .nc3 filer{#nc3-files} 
*   .nc3 filer støtter ikke innfødte heltallsdatatyper. Før CF v1.9 støttet ikke CF udefinerte heltallstyper. For å håndtere dette,ERDDAP™2.10+ følger NUG-standarden og legger alltid til en "__Usignert"-attribut med en verdi av "sann" eller "falsk" for å indikere om dataene er fra en usignert eller signert variabel. Alle heltallsattributter er skrevet som signerte attributter (For eksempel byte) med signerte verdier (f.eks. en ubyteactual\\_rangeattributt med verdier 0 til 255, vises som en byte-attributt med verdier 0 til -1 (invers av de tos komplementverdi av den ut-fra-range verdien). Det er ingen enkel måte å vite hvilke (signerte) heltallsattributter som skal leses som usignerte attributter.ERDDAP™støtter egenskapen "__Usignert when når den leser.nc3 filer.
*   .nc3 filer støtter ikke lange eller avlange datatyper.ERDDAP™håndtere dette ved å midlertidig konvertere dem til å være doble variabler. Doubles kan nøyaktig representere alle verdier opp til +/- 9,007,199,254,740,992 som er 2^53. Dette er en ufullkommen løsning.Unidatanekter å gjøre en mindre oppgradering til.nc3 å håndtere dette og relaterte problemer, sitering.nc4 (En stor endring) som løsningen.
* CF-spesifikasjonen (før v1.9) den støtter en tegndatatype, men det er uklart om tegn er bare ment som byggeblokker av tegnarranger, som er effektive strenger. Spørsmål til deres postliste ga bare forvirrende svar. På grunn av disse komplikasjonene er det best å unngå karvariabler iERDDAP™og bruk strengvariabler når det er mulig.
* Tradisjonelt,.nc3 filer støttes bare strenger med ASCII-kodet (7-bit, #0 - #127) tegn. NUG (ogERDDAP) forlenge det (starter ~2017) ved å inkludere attributten "\\_koding" med en verdi av "ISO-8859-1" (En utvidelse av ASCII som definerer alle 256 verdier av hvert 8-biters tegn) eller "UTF- for å indikere hvordan strengdata er kodet. Andre koder kan være lovlige, men er motløse.
         
#### .nc4 filer{#nc4-files} 
*   .nc4 filer støtter heleERDDAPDatatypene.
    
#### NCCSV-filer{#nccsv-files} 
NCCSV 1.0 filer støtter ikke uoppklarte heltallsdatatyper.
[NCCSV 1.1+ filer](/docs/user/nccsv-1.00)støtte alle usignerte heltallsdatatyper.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII-filer, og .dods binære filer) -
    *   (OPeN)DAPhåndtere korte, ushort, inten, uint, flyte og dobbel verdier riktig.
    *   (OPeN)DAPhar en data byte" datatype som den definerer som udefinert, mens historisk, THREDDS ogERDDAP™har behandlet - byte - som signert i deres(OPeN)DAPTjenester. For å håndtere dette bedre,ERDDAP™2.10+ følger NUG-standarden og legger alltid til en "_Usignert" attributt med en verdi av "sann" eller "falsk" for å indikere om dataene er hvaERDDAP™Ring byte eller ubyte. Alle byte- og ubyte-attributter er skrevet som "byte" attributter med signerte verdier (f.eks. en ubyteactual\\_rangeattributt med verdier 0 til 255, vises som en byte-attributt med verdier 0 til -1 (invers av de tos komplementverdi av den ut-fra-range verdien). Det er ingen enkel måte å vite hvilke - byte - attributter bør leses som ubyte attributter.
    *   (OPeN)DAPikke støtte signert eller ubegrenset lengsel.ERDDAP™håndtere dette ved å midlertidig konvertere dem til å være doble variabler og attributter. Doubles kan representere alle verdier opp til 9,007,199,254,740,992 som er 2^53. Dette er en ufullkommen løsning.OPeNDAP  (organisasjonen) nekter å gjøre en mindre oppgradering tilDAP2.0 å håndtere dette og relaterte problemer, sitereDAP4 (En stor endring) som løsningen.
    * Fordi(OPeN)DAPhar ingen separat tegndatatype og teknisk bare støtter 1-byte ASCII tegn (#0 - #127) i Strenger vil tegndatavariabler vises som 1-tegn-lange strenger i(OPeN)DAP.das, .dds, og .dods svar.
    * Teknisk sett(OPeN)DAPSpesifikasjon støtter bare strenger med ASCII-kodede tegn (#0 - #127) .. NUG (ogERDDAP) forlenge det (starter ~2017) ved å inkludere attributten "\\_koding" med en verdi av "ISO-8859-1" (En utvidelse av ASCII som definerer alle 256 verdier av hvert 8-biters tegn) eller "UTF- for å indikere hvordan strengdata er kodet. Andre koder kan være lovlige, men er motløse.
         
### Datatype Kommentarer{#data-type-comments} 
* På grunn av den dårlige støtten for lange, avlange og tegndata i mange filtyper, avviser vi bruken av disse datatypene iERDDAP.. Når det er mulig, bruk doble i stedet for lange og avlange, og bruk streng i stedet for tegn.
     
* Metadata - Fordi(OPeN)DAP.das og .dds-svar støtter ikke lange eller ulange attributter eller datatyper (I stedet vise dem som dobbel) Du kan i stedet ønske å brukeERDDAPtabuar representasjon av metadata som sett ihttp.../erddap/ **info** / *datasetID* .html nettside (For eksempel[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (som du også kan komme i andre filtyper, f.eks..htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv,.xhtml) eller.nccsvMetadatarespons (For eksempel[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)selv om.nccsvMetadata er kun tilgjengelig for tabelldatasett) Begge deler støtter alle datatyper (Spesielt lang, avlang og char) ..
         
### Mediefiler{#media-files} 
Ikke alle data er tabeller med tall eller tekst. Noen datasett består av eller inkluderer mediefiler, for eksempel bilder, lyd- og videofiler.ERDDAP™har noen spesielle funksjoner for å gjøre det lettere for brukerne å få tilgang til mediefiler. Det er en to-trinns prosess:
 

1. Gjør hver fil tilgjengelig via egen URL, via et system som støtter forespørsler om byteområde.
Den enkleste måten å gjøre dette på er å sette filene i en katalog somERDDAP™Har tilgang til. (Hvis de befinner seg i en beholder som en.zipfil, unzip dem, selv om du kanskje vil tilby.zipfil til brukere også.) Gjør en[EDDTableFromFileNames](#eddtablefromfilenames)datasett som gjør disse filene tilgjengelige viaERDDAP™særlig viaERDDAP's["files"systemet](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)..
    
Alle filer som er gjort tilgjengelige via EDDTableFromFileNames ogERDDAP's"files"systemstøtte[Byte rekkevidde forespørsler](https://en.wikipedia.org/wiki/Byte_serving).. Vanligvis når en klient (For eksempel en nettleser) gjør en forespørsel til en URL, den får hele filen som respons. Men med en byteområdeforespørsel, angir forespørselen et område av byte fra filen, og serveren returnerer kun disse bytene. Dette er relevant her fordi lyd- og videospillere i nettlesere bare fungerer hvis filen kan nås via byteområdeforespørsler.
    
Valgfritt: Hvis du har mer enn ett datasett med tilhørende mediefiler, kan du gjøre bare én EDDTableFromFileNames som har en undermappe for hver gruppe filer. Fordelen er at når du vil legge til nye mediefiler for et nytt datasett, alt du trenger å gjøre er å opprette en ny mappe og legge filene i den mappen. Mappen og filene vil automatisk bli lagt til i EDDTableFromFileNames datasett.
    
2. Valgfritt: Hvis du har et datasett som inkluderer referanser til mediefiler, legger det til iERDDAP..
For eksempel kan du ha en .csv-fil med en rad hver gang noen så en hval og en kolonne som inkluderer navnet på en bildefil relatert til den seing. Hvis navnet på bildefilen er bare filnamnet, for eksempel Img20141024T192403Z, ikke en full URL, må du legge til[filAccessBase Url og/eller filAccessSuffix](#fileaccessbaseurl)attributter til metadata for detdataVariablesom angir baseURL og suffiks for disse filnavnene. Hvis du gjorde filene tilgjengelige via EDDTableFromFileNames, vil URL-adressen være i skjemaet
     *baseUrl* /erddap/filer/ *datasetID* /
For eksempel
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Hvis det finnes en.zipeller annen containerfil med alle mediefilene relatert til en datavariabel, anbefaler vi at du også gjør filen tilgjengelig for brukerne. (se trinn 1 ovenfor) og deretter identifisere det med en[filAccessArchive Url](#fileaccessarchiveurl)attributt.
    

\\[Starter iERDDAP™v1.82\\]Hvis du gjør det første steget ovenfor (eller begge trinn) Når en bruker serERDDAP™ "files"system for det datasettet (eller spør om å se en undergruppe av datasettet via en.htmlTableForespørsel om du gjorde det andre steget) ,ERDDAP™vil vise et «?»-ikon til venstre for filnamnet. Hvis brukeren sveves over ikonet, vil de se en popup som viser bildet, en lydspiller eller en videospiller. Nettlesere støtter bare et begrenset antall typer

* bilde (vanligvis .gif, .jpg, og .png) ,
* lyd (vanligvis .mp3, .ogg, og .wav) , og
* videofiler (vanligvis .mp4, .ogv, og . webm) ..

Støtten varierer med ulike versjoner av forskjellige nettlesere på ulike operativsystemer. Så hvis du har et valg av hvilken filtype å tilby, det er fornuftig å tilby disse typene.

Eller hvis en bruker klikker på filnamnet som vises på enERDDAP™Nettleseren vil vise bildet, lyd- eller videofilen som en separat nettside. Dette er for det meste nyttig å se et veldig stort bilde eller video skalert til fullskjerm i stedet for i en popup.
    
### Arbeider med AWS S3 Filer{#working-with-aws-s3-files} 
[Amazon Web Service (AWS) ](https://aws.amazon.com)er selger av[sky databehandling](https://en.wikipedia.org/wiki/Cloud_computing)Tjenester.[S3](https://aws.amazon.com/s3/)er et objektlagringssystem som tilbys av AWS. I stedet for det hierarkiske systemet med kataloger og filer av et tradisjonelt filsystem (som en harddisk i PCen) , S3 tilbyr bare "buketter" som holder " objekter" (Vi ringer dem"files") ..

For ASCII-filer (f.eks.) ,ERDDAP™kan jobbe med filene i bøtter direkte. Det eneste du trenger å gjøre er å spesifisere&lt;filDir&gt; for datasettet ved hjelp av et bestemt format for AWS-bøtte, f.eks. https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ .. Du bør ikke bruke&lt;cacheFromUrl&gt; . Se nedenfor for detaljer.

Men for binære filer (f.eks..nc, .grib, .bufr, og.hdffiler) Du trenger å bruke&lt;cacheFromUrl&gt; system beskrevet nedenfor.ERDDAP, netcdf-java (somERDDAP™bruker til å lese data fra disse filene) , og annen vitenskapelig dataprogramvare er designet for å jobbe med filer i et tradisjonelt filsystem som tilbyr[blokknivå](https://en.wikipedia.org/wiki/Block-level_storage)tilgang til filer (som tillater å lese deler av en fil) , men S3 tilbyr kun[filnivå (objekt) ](https://en.wikipedia.org/wiki/Block-level_storage)tilgang til filer (som bare tillater å lese hele filen) .. AWS tilbyr et alternativ til S3,[Elastisk blokkbutikk (EBS) ](https://aws.amazon.com/ebs/)), som støtter blokknivå tilgang til filer, men det er dyrere enn S3, så det brukes sjelden til bulk lagring av store mengder datafiler. (Når folk sier å lagre data i skyen (S3) er billig, det er vanligvis en epler til appelsiner sammenligning.) 

#### S3 Buckets{#s3-buckets} 
 **Innholdet i en bucket. Nøkkelene. Objekter.**   
Teknisk sett er S3 bøtter ikke organisert i en hierarkisk filstruktur som et filsystem på en datamaskin. I stedet inneholder bøtter kun " objekter" (filer) som alle har en nøkkel (navn) .. Et eksempel på en nøkkel i at noaa-goes17 bøtte er

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
Den tilsvarende URl for det objektet er

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS støtter litt variasjon i hvordan URL er konstruert, menERDDAP™krever dette spesifikke formatet:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
Det er vanlig å praktisere, som med dette eksempelet, å få nøkkelnavn til å se ut som en hierarkisk bane pluss et filnavn, men teknisk sett ikke. Siden det er vanlig og nyttig,ERDDAP™behandler nøkler med / er som om de er en hierarkisk sti pluss filnavn, og denne dokumentasjonen vil referere til dem som sådan. Hvis en bøttes nøkler ikke bruker /s (f.eks. en nøkkel som
ABI-Lib.2018.052.2.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575), deretterERDDAP™vil bare behandle hele nøkkelen som et langt filnamn.

Privat vs Offentlige Buckets -- Administratoren for S3 bøtte kan gjøre bøtte og dets innhold offentlig eller privat. Hvis offentlig, kan en fil i bøtte lastes ned av alle som bruker URL-adressen til filen. Amazon har en[Åpne data](https://aws.amazon.com/opendata/)program som er vert for offentlige datasett (inkludert data fraNOAANASA og USGS) gratis og ikke belaste for noen å laste ned filene fra disse bøtter. Hvis en bøtte er privat, er filer i skuffen bare tilgjengelig for autoriserte brukere og AWS tar en avgift (vanligvis betalt av eieren av bøtte) for å laste ned filer til en ikke-AWS S3 datamaskin.ERDDAP™kan jobbe med data i offentlige og private bøtter.

#### AWS-bekreftelse{#aws-credentials} 
For å gjøre det slik atERDDAP™kan lese innholdet i private bøtter, du trenger AWS-informasjon og du trenger å lagre en legitimasjonsfil på standard sted såERDDAP™finner informasjonen. Se AWS SDK forJava2.x dokumentasjon:[Sett standardinformasjon](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials).. (Muligheten til å lagre verdiene somJavakommandolinjeparametere i\\[tomcat\\]/bin/setenv.sh kan være et godt alternativ.) 
#### AWS/filer/{#aws-files} 
* /files/ system -- DenERDDAP™ [/filer/system](#accessibleviafiles)tillater brukere å laste ned kildefilene for et datasett. Vi anbefaler at du slår på dette for alle datasett med kildefiler fordi mange brukere vil laste ned de opprinnelige kildefilene.
    * Hvis filene er i en privat S3 bøtte, vil brukerens forespørsel om å laste ned en fil bli behandlet avERDDAP™, som vil lese data fra filen og deretter overføre den til brukeren, og dermed øke belastningen på dinERDDAP™, ved å bruke innkommende og utgående båndbredde, og gjøre deg (denERDDAP™administrator) Betal data egress gebyr til AWS.
    * Hvis filene er i en offentlig S3-bøtte, vil brukerens forespørsel om å laste ned en fil bli videresendt til AWS S3-adressen for den filen, slik at dataene ikke vil strømme gjennomERDDAP™, dermed redusere belastningen påERDDAP.. Og hvis filene er i en Amazon Open Data (gratis) offentlig bøtte, så du (denERDDAP™administrator) vil ikke trenge å betale noe data egress gebyr til AWS. Derfor er det en stor fordel å betjene data fra offentlig (ikke privat) S3 bøtter, og en stor fordel å betjene data fra Amazon Open Data (gratis) Bøtter.

#### ERDDAP™AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)  
Heldigvis etter mye innsats,ERDDAP™har en rekke funksjoner som tillater det å håndtere de iboende problemene med å jobbe med S3s blokknivå tilgang til filer på en rimelig effektiv måte:

*   \\[Disclaimer: Å jobbe med AWS S3 bøtter er mye ekstra arbeid. AWS er et stort økosystem av tjenester og funksjoner. Det er mye å lære. Det tar tid og innsats, men det kan gjøres. Vær tålmodig og du får ting til å fungere. Se / spør om hjelp
([AWS dokumentasjon](https://aws.amazon.com/documentation/gettingstarted/)Nettsteder som[Stack Overflow](https://stackoverflow.com/)og det vanlige
    [ERDDAP™støttealternativer](/docs/intro#support)Hvis/når du sitter fast.\\]  
     
* Det kan være vanskelig å finne ut katalogstrukturen og filnavnene på filene i en S3 bøtte.ERDDAP™har en løsning på dette problemet: EDDTableFromFileNames har en spesiell[\\*\\** fraOnTheFly](#fromonthefly)alternativet som lar deg lage et EDDTableFromFileNames datasett som lar brukerne bla gjennom innholdet i en S3-bøtte (og laste ned filer) via datasettets"files"Valg. Det er en[Eksempler på dette nedenfor](#viewing-the-contents-of-a-bucket)..
     
*   ERDDAP™Kan lese data fra[eksternt komprimerte datafiler](#externally-compressed-files), så det er fint hvis filene på S3 lagres som.gz,.gzip,.bz2, .Z eller andre typer eksterne komprimerte datafiler som kan dramatisk (2-20X) kuttet ned på fillagringskostnader. Det er ofte ingen tidsstraff for å bruke eksterne komprimerte filer, siden tiden lagret ved å overføre en mindre fil fra S3 tilERDDAPbalanserer den ekstra tiden som trengs forERDDAP™å dekomprimere filen. For å bruke denne funksjonen må du bare sørge for at datasettet er&lt;filNameRegex&gt; tillater den komprimerte filtypen (For eksempel ved å legge til (|.gz) til slutten av regulatoriet) ..
     
* I det vanligste tilfellet, hvor du har etERDDAP™installert på PC-en for test/utvikling og hvor datasettet har binære datafiler som lagres som objekter i en S3-bøtte, en tilnærming til å få datasettet iERDDAP™er:
    1. Lag en mappe på PC-en for å holde noen testdatafiler.
    2. Last ned to datafiler fra kilden til katalogen du nettopp opprettet.
    3. Bruk[Generer DatasetsXml](#generatedatasetsxml)å generere delen avdatasets.xmlfor datasettet basert på de to lokale datafiler.
    4. Sjekk at datasettet fungerer som ønsket[DasDds](#dasdds)og/eller din lokaleERDDAP..
        
         **Følgende trinn gjør en kopi av dette datasettet (som vil få data fra S3 bøtte) på offentligERDDAP..** 
        
    5. Kopier biten avdatasets.xmlfor datasettet tildatasets.xmlfor publikumERDDAP™Dette vil tjene dataene.
    6. Lag en katalog på offentlighetenERDDAPLokal harddisk for å holde en cache av midlertidige filer. Katalogen vil ikke bruke mye diskplass (se cacheSizeGB under) ..
    7. Endre verdien av datasettets&lt;filDir&gt; tag slik at det peker til katalogen du nettopp opprettet (Selv om katalogen er tom) ..
    8. Legg til en[cacheFromUrl](#cachefromurl)Tag som angir datasettets bøttenavn og valgfritt prefiks (dvs. katalog) i spesifikke[Aws S3 URL-format somERDDAP™krever](#accessing-files-in-an-aws-s3-bucket)..
    9. Legg til [&lt;cacheSizeGB&gt;] (#cachefromurl) Tagg til datasettets xml (For eksempel er 10 en god verdi for de fleste datasett.) å fortelleERDDAP™begrense størrelsen på den lokale cache (Ikke prøv å cache alle de eksterne filene) ..
    10. Se om det fungerer i publikumERDDAP.. Merk at første gangERDDAP™laster datasettet, det vil ta lang tid å laste, fordiERDDAP™må laste ned og lese alle datafilene.
        
Hvis datasettet er en enorm samling av enorme datafiler, vil dette ta svært lang tid og være upraktisk. I noen tilfeller for rutenettede datafiler,ERDDAP™kan trekke ut den nødvendige informasjonen (F.eks. tidspunktet for dataene i en gitt datafil) fra filnavnet og unngå dette problemet. Se[aggregering via Filnavn](#aggregation-via-file-names-or-global-metadata)..
        
    11. Valgfritt (men spesielt for EDDTableFromFiles datasett) Du kan legge til en[nThreds](#nthreads)Tagge til datasettet å fortelleERDDAPå bruke mer enn 1 tråd når du svarer på en brukers anmodning om data. Dette minimerer effekten av forsinkelsen som oppstår nårERDDAP™leser datafiler fra (fjernkontroll) AWS S3 bøtter i lokal cache og (Kanskje) Dekomprimere dem.

#### AWS S3 Open Data{#aws-s3-open-data} 
Som en del avNOAA's[Big Data Program](https://www.noaa.gov/nodd/about),NOAAhar partnerskap med fem organisasjoner, inkludert AWS, " for å utforske potensielle fordeler ved å lagre kopier av viktige observasjoner og modellutganger i Skyen for å tillate databehandling direkte på dataene uten å kreve ytterligere distribusjon". AWS inkluderer datasettene det kommer fraNOAAsom en del av programmet for å tilby offentlig tilgang til en stor samling[Åpne data på AWS S3](https://registry.opendata.aws/)fra alle datamaskiner, om det er en Amazon beregnende instans (en leid datamaskin) på AWS-nettverket eller din egen PC på ethvert nettverk. Eksemplet nedenfor antar at du jobber med et offentlig tilgjengelig datasett.

#### Tilgang til filer i en AWS S3 Bucket{#accessing-files-in-an-aws-s3-bucket} 
For en privat S3-databøtte må bøtteens eier gi deg tilgang til bøtten. (Se AWS-dokumentasjonen.) 

I alle tilfeller trenger du en AWS-konto fordi AWS SDK forJava  (somERDDAP™bruker til å hente informasjon om innholdet i en bøtte) krever AWS kontoinformasjon. (Mer om dette nedenfor) 

ERDDAP™kan kun få tilgang til AWS S3 bøtter hvis du angir [&lt;cacheFromUrl&gt;] (#cachefromurl) (eller&lt;filDir&gt;) i et bestemt format:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
hvor

* Bøttenavnet er den korte formen for bøttenavnet, for eksempel noaa-goes17.
* Aws-region, for eksempel us-aust-1, er fra "regionen" kolonnen i en av tabellene i[AWS Service Endepunkter](https://docs.aws.amazon.com/general/latest/gr/rande.html)Hvor bøtte er faktisk plassert.
* Prefikset er valgfritt. Hvis det er til stede, må det slutte med'/'..

For eksempel https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Dette URL-formatet er en av AWS S3-anbefalingene: se[Få tilgang til en Bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)og[denne beskrivelsen av prefiks](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html)..ERDDAP™krever at du kombinerer bucket URL og det valgfrie prefikset i en URL for å angi&lt;cacheFra Url&gt; (eller&lt;filDir&gt;) der filene er plassert.

#### Test Offentlige AWS S3 Buckets{#test-public-aws-s3-buckets} 
For offentlige bøtter kan du og bør teste buckle URL i AWS S3-katalogen i nettleseren din, f.eks.
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Hvis nettadressen er riktig og egnet forERDDAP, vil det returnere et XML-dokument som har (delvis) Liste over innholdet i den bøylen. Dessverre, hele URL (bucket URL pluss prefiks) somERDDAP™Ønsker for et gitt datasett fungerer ikke i en nettleser. AWS tilbyr ikke et system for å bla gjennom hierarkiet i en bøtte enkelt i nettleseren din. (Hvis det er feil, vennligst send en e-post til Chris. John på noaa.gov. Ellers Amazon, vennligst legg til støtte for dette&#33;) 

#### Se innholdet i en bucket{#viewing-the-contents-of-a-bucket} 
S3 bøtter inneholder ofte et par kategorier av filer, i et par pseudo underkataloger, som kan bli et par avERDDAP™Datasett. å gjøreERDDAP™datasett, må du vite startkatalogen for&lt;cacheFra Url&gt; (eller&lt;filDir&gt;) og filformatet til filnavnene som identifiserer den undergruppen av filer. Hvis du prøver å vise hele innholdet i en bøtte i en nettleser, vil S3 bare vise deg de første 1000 filene, noe som er utilstrekkelig. For øyeblikket, den beste måten for deg å se alt innholdet i en bøtte er å lage en[EDDTableFromFileNames](#eddtablefromfilenames)Datasett (på din PCsERDDAP™og/eller offentligERDDAP) , som også gir deg en enkel måte å bla gjennom katalogstrukturen og laste ned filer. Den&lt;filDir&gt; for det vil være URL du laget ovenfor, f.eks. https://noaa-goes17.s3.us-east-1.amazonaws.com ..\\[Hvorfor tilbyr ikke AWS S3 en rask og enkel måte for alle å gjøre dette uten en AWS-konto?\\]Legg merke til at når jeg gjør dette på PCen min på et ikke-Amazon-nettverk, ser det ut til at Amazon senker responsen på en trickle (Rundt 100 (?) filer per bit) etter de første bitene (1000 av filer per bit) er lastet ned. Siden bøtter kan ha et stort antall filer (noaa-goes17 har 26 millioner) , å få alt innholdet i en bøtte kan ta EDDTableFromFileNames flere timer (For eksempel 12&#33;) For å fullføre.\\[Amazon, er det sant?\\]

#### Å lage en EDD-tabell FraFileNames datasett med AWS S3 Bucket{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Hvis du har et bøndenavn, men ikke allerede har en liste over filer i S3-bøtten eller prefikset som identifiserer plasseringen av de relevante filene i bøtten, bruk instruksjonene nedenfor for å lage en EDDTableFromFileNames datasett slik at du kan bla gjennom kataloghierarkiet til S3-bøtten viaERDDAP's"files"systemet.

1. Åpne AWS-konto
    ERDDAP™bruker[AWS SDK forJava](https://docs.aws.amazon.com/sdk-for-java/index.html)å få bøtteinformasjon fra AWS, så du må[opprette og aktivere en AWS-konto](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/).. Det er en ganske stor jobb med mye å lære.
     
2. Sett dine AWS-bekreftelser derERDDAP™kan finne dem.
Følg instruksjonene på[Opprette AWS-bekreftelse og region for utvikling](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)såERDDAP™  (Spesielt AWS SDK forJava) vil kunne finne og bruke AWS-opplysningene dine. HvisERDDAP™kan ikke finne legitimasjonene, vil du se en
Java.lang. UlovligArgumentException: profilfil kan ikke være null feil iERDDAPlog.txt-fil.
    
Tips til Linux og Mac OS: legitimasjonsfilen må være i hjemmekatalogen til brukeren som kjører Tomcat (ogERDDAP)   (For dette avsnittet antar vi bruker=tomcat) i en fil som heter ~/.aws/credentials. Ikke anta at ~ er /home/tomcat -- faktisk bruke cd ~ til å finne ut hvor operativsystemet tenker ~ for user=tomcat er. Lag katalogen hvis den ikke eksisterer. Når du har satt legitimasjonsfilen på plass, må du også sørge for at brukeren og gruppen til filen er tomcat og deretter bruke chmod 400 legitimasjoner for å sikre at filen er skrivebar for bruker=tomcat.
    
3. Opprett bucket URL i[format somERDDAP™krever](#accessing-files-in-an-aws-s3-bucket)f.eks.
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com), og (For offentlige bøtter) test den i en nettleser for å sørge for at den returnerer et XML-dokument som har en delvis oppføring av innholdet i den bøtten.
     
4. Bruk[Generer DatasetsXml](#generatedatasetsxml)å skape en[EDDTableFromFileNames](#eddtablefromfilenames)datasett:
    * Bruk denne syntaksen for å starte mappen:
        \\*\\*\\ *fra OnTheFly,* dinBucketUrl*
For eksempel
        \\*\\**fraOnTheFly, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * Filnavn regulært? .\\*
    * Rekursivt? sant
    * Last på nytt Hver minute? 10080
    *   infoUrl? https://registry.opendata.aws/noaa-goes/
 
    * institusjon?NOAA
    * Sammendrag? ingenting (ERDDAP™vil opprette et anstendig sammendrag automatisk.) 
    * Tittel? ingenting (ERDDAP™vil opprette en god tittel automatisk.) Som vanlig bør du redigere den resulterende XML for å verifisere riktighet og gjøre forbedringer før biten av datasett ved hjelp av den idatasets.xml..
5. Hvis du følger instruksjonene ovenfor og laster datasettet iERDDAP, har du opprettet et EDDTableFromFiles datasett. Som et eksempel, og for å gjøre det lettere for alle å bla gjennom og laste ned filer fra AWS Open Data-bøtter, har vi opprettet EDDTableFromFileNames datasett (se listen på
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)For nesten alle[AWS S3 Åpne databøtter](https://registry.opendata.aws/)..
    \\[De få bøtter som vi ikke inkluderte enten har et stort antall filer i rotkatalogen (Mer enn kan lastes ned på rimelig tid) eller ikke tillater offentlig tilgang (Skal ikke alle være offentlige?) , eller er forespører betaler bøtter (For eksempel Sentinel) ..\\]  
Hvis du klikker på"files"lenke for et av disse datasettene, kan du bla gjennom katalogtreet og filene i den S3 bøtte. På grunn av veien\\*\\**FraOnTheFly EDDTableFraFiles fungerer, disse kataloglistene er alltid helt oppdaterte fordiERDDAP™Få dem på flyet. Hvis du klikker ned katalogtreet til et faktisk filnamn og klikker på filnamnet,ERDDAP™vil omdirigere forespørselen din til AWS S3 slik at du kan laste ned filen direkte fra AWS. Du kan så inspisere den filen.
    
Problemer?
Hvis EDDTableFromFiles ikke lastes innERDDAP™  (eller DasDds) , se i log.txt-filen for en feilmelding. Hvis du ser en
Java.lang. UlovligArgumentException: profilfilen kan ikke være null feil, problemet er at AWS SDK forJava  (Brukes avERDDAP) Finner ikke legitimasjonsfilen. Se instruksjonene ovenfor.
     

Det er uheldig at AWS ikke bare tillater folk å bruke en nettleser til å se innholdet i en offentlig bøtte.

 **Da kan du lageERDDAP™datasett som gir brukerne tilgang til dataene i filene.**   
Se instruksjonene i[ERDDAP™S3 Buckets](#erddap-and-aws-s3-buckets)  (over) ..
For prøven EDDTableFromFileNames datasett som du laget ovenfor, hvis du gjør en liten poking rundt med mappen og filnavnene i katalogtreet, blir det klart at toppnivåkatalognavnene (For eksempel ABI-L1b-RadC) svarer til hvaERDDAP™Skulle kalle separate datasett. Boksen du jobber med kan være lignende. Du kan deretter forfølge å skape separate datasett iERDDAP™for hvert av disse datasettene, f.eks.
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
som&lt;cacheFromUrl&gt;. Dessverre synes alle datasettene i bøtte å være nivå 1 eller nivå 2 datasett, somERDDAP™ [Er ikke spesielt bra på](#dimensions), fordi datasettet er en mer komplisert samling av variabler som bruker ulike dimensjoner.
     
    
### NcML-filer{#ncml-files} 
NcML-filer kan du angi endringer i en eller flere opprinnelige kilde på flyetNetCDF  (v3 eller v4)  .nc, .grib, .bufr, eller.hdf  (v4 eller v5) Filer, og deretter harERDDAP™behandle.ncml filer som kildefiler.ERDDAP™Datasett vil akseptere.ncml filer når som helst.ncFilene er forventet. NcML-filene må ha utvidelsen.ncml. Se[UnidataNcML-dokumentasjon](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html).. NcML er nyttig fordi du kan gjøre noen ting med det (For eksempel gjør forskjellige endringer i ulike filer i en samling, inkludert å legge til en dimensjon med en bestemt verdi i en fil) som du ikke kan gjøre medERDDAP'sdatasets.xml..

* Endringer i en.ncml-filens siste modifiserte tid vil føre til at filen lastes på nytt når datasettet lastes på nytt, men endringer i det underliggende.ncDatafiler vil ikke bli direkte lagt merke til.
* Tips: NcML er\\*meget\\*sensitive for rekkefølgen av noen elementer i NcML-filen. Tenk på NcML som å spesifisere en rekke instruksjoner i den angitte rekkefølgen, med hensikt å endre kildefilene (tilstanden i start/toppen av NcML-filen) i destinasjonsfilene (tilstanden på slutten/bunn av NcML-filen) ..

Et alternativ til NcML er[NetCDFOperatører (NCO) ](#netcdf-operators-nco).. Den store forskjellen er at NcML er et system for å gjøre endringer på flyet (så kildefilene er ikke endret) , mensNCOkan brukes til å gjøre endringer i (nye versjoner av) Filene. BeggeNCOOg NcML er veldig, veldig fleksibel og lar deg gjøre nesten alle endringer du kan tenke på til filene. For begge kan det være utfordrende å finne ut nøyaktig hvordan du gjør det du vil gjøre - sjekk nettet for lignende eksempler. Begge er nyttige verktøy for å forberede netCDF ogHDFfiler til bruk medERDDAPspesielt å gjøre endringer utover hvaERDDAPManipuleringssystemet kan gjøre det.

Eksempel 1: Legg til en tidsdimensjon med en enkelt verdi
Her er en.ncml fil som skaper en ny ytre dimensjon (tid, med 1 verdi: 1041379200) og legger den dimensjonen til bildevariabelen i filen kalt A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc:)
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Eksempel #2: Endre eksisterende tidsverdi
Noen ganger kilden.ncfilen har allerede en tidsdimensjon og tidsverdi, men verdien er feil (til dine formål) .. Dette.ncml fil sier: for datafilen som heter"198119810825230030-NCEI...", for dimensjonsvariabelen"time", angi enhetene attributt til å være 'sekunder siden 1970-01-01T00:00:00Z' og angi tidsverdien til å være 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDFOperatører (NCO)  {#netcdf-operators-nco} 
"NetCDF-operatørene (NCO) omfatter et dusin frittstående, kommandolinjeprogrammer som tar netCDF\\[v3 eller v4\\],HDF \\[v4 eller v5\\],\\[.grib, .bufr,\\]og/ellerDAPfiler som input, deretter operere (f.eks. utlede nye data, beregne statistikk, skrive ut, hyperslab, manipulere metadata) og skriv ut resultatene til skjerm eller filer i tekst, binære eller netCDF-formater.NCOBistandsanalyse av nettbaserte vitenskapelige data. Skal-kommando stilen tilNCOgjør det mulig for brukerne å manipulere og analysere filer interaktivt, eller med ekspressive skript som unngår noen overhead av høyere nivå programmeringsmiljøer." (fra[NCO](https://nco.sourceforge.net/)hjemmeside) ..

Et alternativ tilNCOer[NcML](#ncml-files).. Den store forskjellen er at NcML er et system for å gjøre endringer på flyet (så kildefilene er ikke endret) , mensNCOkan brukes til å gjøre endringer i (nye versjoner av) Filene. BeggeNCOOg NcML er veldig, veldig fleksibel og lar deg gjøre nesten alle endringer du kan tenke på til filene. For begge kan det være utfordrende å finne ut nøyaktig hvordan du gjør det du vil gjøre - sjekk nettet for lignende eksempler. Begge er nyttige verktøy for å forberede netCDF ogHDFfiler til bruk medERDDAPspesielt å gjøre endringer utover hvaERDDAPManipuleringssystemet kan gjøre det.

Du kan for eksempel brukeNCOå gjøre enhetene i tidsvariabelen konsekvent i en gruppe av filer der de ikke var konsekvent opprinnelig. Eller du kan brukeNCOå søkescale\\_factorogadd\\_offseti en gruppe filer hvorscale\\_factorogadd\\_offsethar forskjellige verdier i forskjellige kildefiler.
 (Eller du kan nå håndtere disse problemene iERDDAP™via[EDDGridFraNcFilesUpakket](#eddgridfromncfilesunpacked)som er en variant avEDDGridFraNcFiles som pakker ut pakkede data og standardiserer tidsverdier på et lavt nivå for å håndtere en samlingsfil som har forskjelligescale\\_factorS ogadd\\_offsetEller ulike tidsenheter.) 

NCOer gratis og åpen kilde programvare som bruker[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)lisens.

Eksempel #1: Å gjøre enheter konsekvente
EDDGridFra Filer og EDDTable Fra Filer insisterer på at enhetene for en gitt variabel er identiske i alle filene. Hvis noen av filene er trivielt (Ikke funksjonelt) forskjellig fra andre (f.eks. tidsenheter av
" sekunder siden 1970-01-01 00:00 UTC" versus
"seconds since 1970-01-01T00:00:00Z"Du kan brukeNCO's[ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor)å endre enhetene i alle filene som skal være identiske med
nco/ncatted -a units, time,o,c,'sekunder siden 1970-01-01T00:00:00Z' \\*.nc  
\\[For mange problemer som dette i... Filer datasett, du kan nå bruke[standardisering Hva](#standardizewhat)å fortelleERDDAPå standardisere kildefiler som de leses inn iERDDAP..\\]
    
### Grenser til størrelsen på et datasett{#limits-to-the-size-of-a-dataset} 
Du vil se mange referanser til "2 milliarder" under. Mer nøyaktig, det er en referanse til 2.147.483 647 (2^31-1) , som er den maksimale verdien av et 32-bits signert heiltal. På enkelte språk, for eksempelJava  (somERDDAP™er skrevet i) det er den største datatypen som kan brukes til mange datastrukturer (For eksempel størrelsen på en tabell) ..

For strengverdier (For eksempel for variable navn, attributtnavn, strenge attributtverdier og strengedataverdier) , det maksimale antall tegn per streng iERDDAP™2 milliarder. Men i nesten alle tilfeller vil det være små eller store problemer hvis en streng overstiger en rimelig størrelse (For eksempel 80 tegn for variable navn og attributtnavn, og 255 tegn for de fleste strenge attributtverdier og dataverdier) .. For eksempel vil nettsider som viser lange variable navn være vanskelig brede og lange variable navn bli avkortet hvis de overstiger grensen for responsfiltypen.

For gitte datasett:

* Det maksimale antallaxisVariableS er 2 milliarder.
Det maksimale antalldataVariableS er 2 milliarder.
Men hvis et datasett har &gt; 100 variabler, vil det være tungt for brukerne å bruke.
Og hvis et datasett har &gt; 1 million variabler, vil serveren din trenge mye fysisk minne, og det vil bli andre problemer.
* Den maksimale størrelsen på hver dimensjon (axisVariable) 2 milliarder verdier.
* Det maksimale antall celler (Produktet av alle dimensjonsstørrelser) er ubegrenset, men det kan være ~ 9e18.

For tabelldatasett:

* Det maksimale antalldataVariableS er 2 milliarder.
Men hvis et datasett har &gt; 100 variabler, vil det være tungt for brukerne å bruke.
Og hvis et datasett har &gt; 1 million variabler, vil serveren din trenge mye fysisk minne, og det vil bli andre problemer.
* Det maksimale antall kilder (For eksempel filer) Det kan aggregeres er ~ 2 milliarder.
* I noen tilfeller det maksimale antall rader fra en individuell kilde (For eksempel en fil, men ikke en database) Det er 2 milliarder rader.
* Jeg tror ikke det er andre grenser.

For både rutenetts- og tabelldatasett er det noen interne grenser for størrelsen på undergruppen som en bruker kan be om i en enkelt forespørsel. (ofte knyttet til &gt; 2 milliarder av noe eller ~ 9e18 av noe) , men det er langt mer sannsynlig at en bruker vil treffe filtype-spesifikke grenser.

*   NetCDFversjon 3.ncFilene er begrenset til 2GB byte. (Hvis dette virkelig er et problem for noen, gi meg beskjed: Jeg kan legge til støtte forNetCDFversjon 3.nc64-bits forlengelse ellerNetCDFVersjon 4, som vil øke grensen betydelig, men ikke uendelig.) 
* Nettlesere krasjer etter bare ~ 500 MB data, såERDDAP™begrenser responsen til.htmlTableForespørsler til ~ 400 MB av data.
* Mange dataanalyseprogrammer har lignende grenser (For eksempel er den maksimale størrelsen på en dimensjon ofte ~ 2 milliarder verdier) , så det er ingen grunn til å jobbe hardt for å komme rundt filtype-spesifikke grenser.
* Filtypespesifikke grenser er nyttige ved at de forhindrer naive forespørsler om virkelig store mengder data (For eksempel, gi meg alle disse datasettene" når datasettet har 20 TB data) som tar uker eller måneder å laste ned. Jo lenger nedlastingen, jo mer sannsynlig vil det mislykkes av en rekke grunner.
* Filtypespesifikke grenser er nyttige ved at de tvinger brukeren til å håndtere rimelige undergrupper (For eksempel, å håndtere et stort rutenettet datasett via filer med data fra ett tidspunkt hver) ..
         
### Bytt til ACDD-1.3{#switch-to-acdd-13} 
Vi (spesielt[Generer DatasetsXml](#generatedatasetsxml)) For tiden anbefaler[ACDD versjon 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3), som ble ratifisert i begynnelsen av 2015 og som kalles "ACDD-1.3" i den globale konvensjonen. FørERDDAP™versjon 1.62 (utgitt i juni 2015) ,ERDDAP™Brukt/anbefalt den opprinnelige, versjon 1.0 av[NetCDFAttributkonvensjon for datasett Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)som kallesUnidataDatasett Discovery v1.0" i de globale konvensjonene ogMetadata\\_Conventionsattributter.

Hvis datasettene dine bruker tidligere versjoner av ACDD, overfører vi til ACDD-1.3. Det er ikke vanskelig. ACDD-1.3 er svært bakoverkompatibel med versjon 1.0. å bytte, for alle datasett (unntattEDDGridFraErddap og EDDTable FraErddap datasett) :)

1. Fjern den nylig utdaterte globaleMetadata\\_Conventionsattributt ved å legge til (eller ved å endre eksisterendeMetadata\\_Conventionsattributt)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
til datasettets globale&lt;addAttributes&gt;.
     
2. Hvis datasettet har en konvensjon i det globale&lt;addAttributesEndre alleUnidataDatasett Discovery v1.0" referanser til "ACDD-1.3".
Hvis datasettet ikke har en konvensjon i den globale&lt;addAttributesLegg til en som refererer til ACDD-1.3. For eksempel
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Hvis datasettet har en globalstandard\\_name\\_vocabularyattributt, vennligst endre format av verdien til for eksempel,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Hvis referansen er til en eldre versjon av[CF standard navn tabell](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).. Det er nok en god ide å bytte til den aktuelle versjonen (65 som vi skriver dette) , siden nye standardnavn legges til i tabellen med påfølgende versjoner, men gamle standardnavn er sjelden foreldet og aldri fjernet.
     
4. Selv om ACDD-1.0 inkluderte globale attributter forcreator\\_name,creator\\_email,creator\\_url,[Generer DatasetsXml](#generatedatasetsxml)Legg dem ikke automatisk til før noen gang rundtERDDAP™v1.50. Dette er viktig informasjon:
        
    *   creator\\_nameLa brukerne vite / sitere skaperen av datasettet.
    *   creator\\_emailforteller brukerne den foretrukne e-postadressen for å kontakte skaperen av datasettet, for eksempel hvis de har spørsmål om datasettet.
    *   creator\\_urlGi brukere en måte å finne ut mer om skaperen.
    *   ERDDAP™bruker all denne informasjonen når du genererer FGDC og ISO 19115-2/19139 metadatadokumenter for hvert datasett. Disse dokumentene brukes ofte av eksterne søketjenester.
    
Legg til disse attributtene i datasettets globale&lt;addAttributes&gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Det er det. Jeg håper det ikke var for vanskelig.
     
### Zarr{#zarr} 
Fra versjon 2.25ERDDAP™kan lese lokalt Zarr-filer som bruker[EDDTableFraNcFiler](#eddtablefromncfiles)og[EDDGridFraNcFiles](#eddgridfromncfiles)..

 (Fra august 2019) Vi kan lett ta feil, men vi er ennå ikke overbevist om at[Zarr](https://github.com/zarr-developers/zarr-python), eller lignende systemer som bryter datafiler opp i mindre deler, er gode løsninger på problemet medERDDAP™Les data lagret i skytjenester som Amazon AWS S3. Zarr er en god teknologi som har vist sin nytte i en rekke situasjoner, vi er bare ikke sikker på atERDDAP+S3 vil være en av disse situasjonene. For det meste sier vi: Før vi skynder oss å gjøre innsatsen for å lagre all vår data i Zarrr, la oss gjøre noen tester for å se om det faktisk er en bedre løsning.

Problemene med tilgang til data i skyen er latens (Laget til å først få data) og filnivå tilgang (i stedet for tilgang på blokknivå) .. Zarr løser problem med tilgang til filnivå, men gjør ingenting med latens. Sammenlignet med bare å laste ned filen (Så det kan leses som en lokal fil med blokknivå tilgang) , kan Zarr til og med forverre latensproblemet fordi, med Zarr, å lese en fil nå innebærer en rekke flere samtaler for å lese ulike deler av filen (Hver med sitt eget lag) .. Latency problemet kan løses ved å parallellisere forespørsler, men det er en høyere nivå løsning, ikke avhengig av Zarr.

Og med Zarr (som med relasjonelle databaser) , mister vi bekvemheten av å ha en datafil er en enkel, enkelt fil som du enkelt kan verifisere integriteten til, eller gjøre/nedlaste en kopi av.

ERDDAP™  (fra v2) har et system for å opprettholde en lokal buffer av filer fra en URL-kilde (f.eks. S3) (se [&lt;cacheFra Url&gt; og&lt;cacheMaxGB&gt;] (#cachefromurl) ). og den nye&lt;nThreads&gt;] (#ntreads) bør minimere latensproblemet ved å parallelisere datainnhentingen på et høyt nivå.&lt;cacheFromUrl&gt; virker veldig bra for mange scenarier. (Vi vet ikke hvor fordelaktig&lt;nThreads&gt; er uten ytterligere tester.) Vi innrømmer vi ikke har gjort timing tester på en AWS-instans med en god nettverkstilkobling, men vi har vellykket testet med ulike eksterne URL-kilder av filer. OgERDDAP's&lt;cacheFromUrl&gt; fungerer med enhver type datafil (f.eks..nc,.hdf.csv,.jsonlCSV) Selv om eksternt komprimert (f.eks..gz) uten endringer i filene (f.eks. omskriver dem som Zarr samlinger) ..

Det er sannsynlig at ulike scenarier vil favorisere ulike løsninger, for eksempel trenger bare å lese en del av en fil én gang (Zarr vil vinne) , vs. må lese hele en fil en gang, vs. trenger å lese deler eller hele en fil gjentatte ganger (&lt;cacheFromUrl&gt; vil vinne).

For det meste sier vi: Før vi skynder oss å gjøre innsatsen for å lagre all vår data i Zarrr, la oss gjøre noen tester for å se om det faktisk er en bedre løsning.

- -
## Liste over typer datasett{#list-of-types-datasets} 
Hvis du trenger hjelp til å velge riktig type datasett, se[Valg av datasetttype](#choosing-the-dataset-type)..

Typen datasett faller i to kategorier. ([Hvorfor?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)Datasett håndterer gitte data.
    * IEDDGriddatasett, datavariabler er flerdimensjonale datagrupper.
    * Det må være en aksevariabel for hver dimensjon. Akselvariabler må spesifiseres i den rekkefølgen datavariabler bruker dem.
    * IEDDGriddatasett, alle datavariabler må brukes (aksje) alle aksevariabler.
         ([Hvorfor?](#why-just-two-basic-data-structures) [Hva om de ikke gjør det?](#dimensions)) 
    * Sorterte dimensjonsverdier - I altEDDGriddatasett, hver dimensjon må være i sortert rekkefølge (Stigende eller nedadgående) .. Hver kan være uregelmessig adskilt. Det kan ikke være noen bånd. Dette er et krav fra[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html).. Hvis dimensjonens verdier ikke er i sortert rekkefølge, vil datasettet ikke bli lastet inn ogERDDAP™vil identifisere den første usorterte verdien i loggfilen, *bigParentDirectory* /logs/log.txt .
        
Noen underklasser har ytterligere begrensninger (bemerkelsesverdigvis,EDDGridAggregateExistingDimension krever at den ytre (venstre, første) dimensjonen stiger.
        
Usorterte dimensjonsverdier indikerer nesten alltid et problem med kildedatasettet. Dette skjer oftest når en feilnavngitt eller upassende fil er inkludert i sammenslåingen, som fører til en usortert tidsdimensjon. Hvis du vil løse dette problemet, kan du se feilmeldingen iERDDAP™log.txt-fil for å finne den fornærmende tidsverdien. Så se i kildefilene for å finne den tilsvarende filen (eller før eller etter) Det tilhører ikke i sammenslåingen.
        
    * Se mer fullstendig beskrivelse av[EDDGridDatamodell](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)..
    * DenEDDGridDatasett er:
        *   [EDDGridFraAudioFiles](#eddfromaudiofiles)aggregerer data fra en gruppe av lokale lydfiler.
        *   [EDDGridFraDap](#eddgridfromdap)håndterer rutenettede data fraDAPservere.
        *   [EDDGridFra EDDTable](#eddgridfromeddtable)lar deg konvertere en tabell datasett til et gitt datasett.
        *   [EDDGridFraErddap](#eddfromerddap)håndterer rutenettede data fra en fjernkontrollERDDAP..
        *   [EDDGridFraEtopo](#eddgridfrometopo)Bare håndtere innebygd ETOPO topografi data.
        *   [EDDGridFraFiles](#eddgridfromfiles)er superklassen til alleEDDGridFra... Filer klasser.
        *   [EDDGridFra FlightIRFiles](#eddgridfrommergeirfiles)aggregerer data fra en gruppe av lokale fusioner.gzFiler.
        *   [EDDGridFraNcFiles](#eddgridfromncfiles)samler data fra en lokal gruppeNetCDF  (v3 eller v4)  .ncog relaterte filer.
        *   [EDDGridFraNcFilesUpakket](#eddgridfromncfilesunpacked)En variant hvisEDDGridFraNcFiles som også samler data fra en gruppe lokaleNetCDF  (v3 eller v4)  .ncog relaterte filer somERDDAP™pakker ut på lavt nivå.
        *   [EDDGridLonPM180](#eddgridlonpm180)modifiserer lengdegraden til et barnEDDGridså de er i området - 180 til 180.
        *   [EDDGridDreier0360](#eddgridlon0360)modifiserer lengdegraden til et barnEDDGridså de er i området 0 til 360.
        *   [EDDGridSideBySide](#eddgridsidebyside)aggregerer to eller flereEDDGridDatasett side om side.
        *   [EDDGridAggregate](#eddgridaggregateexistingdimension)aggregerer to eller flereEDDGriddatasett, som hver har et annet verdiområde for den første dimensjonen, men identiske verdier for de andre dimensjonene.
        *   [EDDGridKopier](#eddgridcopy)kan lage en lokal kopi av en annenEDDGriddata og servere data fra den lokale kopien.
             
    * AlleEDDGriddatasett støtter en nThreads innstilling, som fortellerERDDAP™Hvor mange tråder du skal bruke når du svarer på en forespørsel. Se[nThreds](#nthreads)dokumentasjon for detaljer.
         
### EDDTable{#eddtable} 
*   [ **EDDTable** ](#eddtable)datasett håndtere tabelldata.
    * Tabelldata kan representeres som en databaselignende tabell med rader og kolonner. Hver kolonne (en datavariabel) har et navn, et sett attributter og lagrer bare én type data. Hver rad har en observasjon (eller gruppe av relaterte verdier) .. Datakilden kan ha dataene i en annen datastruktur, en mer komplisert datastruktur og/eller flere datafiler, menERDDAP™må kunne flate kildedataene i en databaselignende tabell for å presentere data som et tabelldatasett til brukere avERDDAP..
    * Se mer fullstendig beskrivelse av[EDDTable-datamodell](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)..
    * EDDTable datasett er:
        *   [EDDTableFraAllDatasett](#eddtablefromalldatasets)er et datasett på høyere nivå som har informasjon om alle de andre datasettene i dinERDDAP..
        *   [EDDTableFraAsciiFiler](#eddtablefromasciifiles)aggregerer data fra komma-, fane-, semikolon- eller mellomromsdelte ASCII-datafiler.
        *   [EDDTableFraAsciiService](#eddtablefromasciiservice)er superklasse av alle EDDTableFromAsciiService... klasser.
        *   [EDDTableFraAsciiServiceNOS](#eddtablefromasciiservicenos)håndterer data fra noen avNOAANOS webtjenester.
        *   [EDDTableFraAudioFiler](#eddfromaudiofiles)aggregerer data fra en gruppe av lokale lydfiler.
        *   [EDDTableFra AwsXmlFiles](#eddtablefromawsxmlfiles)aggregerer data fra et sett av automatisk værstasjon (AWS) XML-filer.
        *   [EDDTableFraCassandra](#eddtablefromcassandra)håndterer tabelldata fra en Cassandra-tabell.
        *   [EDDTableFraColumnarAsciiFiler](#eddtablefromcolumnarasciifiles)aggregerer data fra tabell ASCII-datafiler med faste breddedatakolonner.
        *   [EDDTableFra DapSekvens](#eddtablefromdapsequence)håndtere tabelldata fraDAPsekvensservere.
        *   [EDDTableFraDatabase](#eddtablefromdatabase)håndtere tabelldata fra én databasetabell.
        *   [EDDTableFraEDDGrid](#eddtablefromeddgrid)lar deg opprette et EDDTable-datasett fra etEDDGrid- Datasett.
        *   [EDDTableFraErddap](#eddfromerddap)håndterer tabelldata fra en eksternERDDAP..
        *   [EDDTableFromFileNames](#eddtablefromfilenames)oppretter et datasett fra informasjon om en gruppe filer i serverens filsystem, men det tjener ikke data fra inne i filene.
        *   [EDDTableFra Filer](#eddtablefromfiles)er superklasse av alle EDDTableFra...Filer klasser.
        *   [EDDTableFraHttpGet](#eddtablefromhttpget)erERDDAPDet eneste systemet for import av data samt eksport av data.
        *   [EDDTableFraHyraxFiler](#eddtablefromhyraxfiles)  (Deprekert) aggregerer data fra filer med flere variabler med delte dimensjoner som betjenes av en[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server)..
        *   [EDDTableFraInvalidCRAFiler](#eddtablefrominvalidcrafiles)aggregerer data fraNetCDF  (v3 eller v4)  .ncfiler som bruker en spesifikk, ugyldig variant av CF DSG Contigous Tagged Array (CRA) Filer. Selv omERDDAP™støtter denne filtypen, det er en ugyldig filtype som ingen bør begynne å bruke. Grupper som for tiden bruker denne filtypen oppfordres sterkt til å brukeERDDAP™å generere gyldige CF DSG CRA-filer og slutte å bruke disse filene.
        *   [EDDTableFraJsonlCSVFiler](#eddtablefromjsonlcsvfiles)aggregerer data fra[JSON Linjer CSV-filer](https://jsonlines.org/examples/)..
        *   [EDDTableFraMultidimNcFiler](#eddtablefrommultidimncfiles)aggregerer data fraNetCDF  (v3 eller v4)  .ncfiler med flere variabler med delt dimensjon.
        *   [EDDTableFraNcFiler](#eddtablefromncfiles)aggregerer data fraNetCDF  (v3 eller v4)  .ncfiler med flere variabler med delt dimensjon. Det er fint å fortsette å bruke denne datasettstypen for eksisterende datasett, men for nye datasett anbefaler vi å bruke EDDTableFromMultidimNcFiles i stedet.
        *   [EDDTableFraNcCFFiler](#eddtablefromnccffiles)aggregerer data fraNetCDF  (v3 eller v4)  .ncfiler som bruker et av filformatene som er spesifisert av[CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konvensjoner. Men for filer som bruker en av de flerdimensjonale CF DSG varianter, bruk[EDDTableFraMultidimNcFiler](#eddtablefrommultidimncfiles)I stedet.
        *   [EDDTableFraNccsvFiler](#eddtablefromnccsvfiles)aggregerer data fra[NCCSV](/docs/user/nccsv-1.00)ASCII .csv-filer.
        *   [EDDTableFra NOS](#eddtablefromnos)  (Deprekert) håndterer tabelldata fra NOS XML-servere.
        *   [EDDTableFromOBIS](#eddtablefromobis)håndtere tabelldata fra OBIS-servere.
        *   [EDDTableFraParquetFiler](#eddtablefromparquetfiles)håndterer data fra[Parquet](https://parquet.apache.org/)..
        *   [EDDTableFraSOS](#eddtablefromsos)håndtere tabelldata fraSOSservere.
        *   [EDDTableFraTreddsFiler](#eddtablefromthreddsfiles)  (Deprekert) aggregerer data fra filer med flere variabler med delte dimensjoner som betjenes av en[TREDDSOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/)..
        *   [EDDTableFraWFSFiler](#eddtablefromwfsfiles)  (Deprekert) gjør en lokal kopi av alle data fra enArcGISKartServerWFSserver slik at dataene kan lagres rasktERDDAP™brukere.
        *   [EDDTable](#eddtableaggregaterows)kan lage et EDDTable-datasett fra en gruppe av EDDTable-datasett.
        *   [EDDTableCopy](#eddtablecopy)kan gjøre en lokal kopi av mange typer EDDTable datasett og deretter lagre dataene raskt fra den lokale kopien.

  
- -

## Detaljerte beskrivelser av Datasett Typer{#detailed-descriptions-of-dataset-types} 

### EDDGridFraDap{#eddgridfromdap} 
[ **EDDGridFraDap** ](#eddgridfromdap)håndterer rutenettvariabler fra[DAP](https://www.opendap.org/)servere.

* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Du kan samle inn informasjonen du trenger for å justere det eller opprette din egen XML for enEDDGridFraDap datasett ved å se på kildedatasettets DDS- og DAS-filer i nettleseren din (ved å legge til .das og .dds tilsourceUrlFor eksempel:[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) ..
     
*   EDDGridFromDap kan få data fra alle multidimensjonale variabel fra enDAPDataserver. (Tidligere,EDDGridFraDap var begrenset til variabler betegnet som "grid"s, men det er ikke lenger et krav.)   
     
* Sorterte dimensjonsverdier - Verdiene for hver dimensjon må være i sortert rekkefølge (Stigende eller nedadgående) .. Verdiene kan være uregelmessig fordelt. Det kan ikke være noen bånd. Dette er et krav fra[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html).. Hvis dimensjonens verdier ikke er i sortert rekkefølge, vil datasettet ikke bli lastet inn ogERDDAP™vil identifisere den første usorterte verdien i loggfilen, *bigParentDirectory* /logs/log.txt .
    
Usorterte dimensjonsverdier indikerer nesten alltid et problem med kildedatasettet. Dette skjer oftest når en feilnavngitt eller upassende fil er inkludert i sammenslåingen, som fører til en usortert tidsdimensjon. Hvis du vil løse dette problemet, kan du se feilmeldingen iERDDAP™log.txt-fil for å finne den fornærmende tidsverdien. Så se i kildefilene for å finne den tilsvarende filen (eller før eller etter) Det tilhører ikke i sammenslåingen.
    
#### EDDGridFraDap skjelett XML{#eddgridfromdap-skeleton-xml} 

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

     
### EDDGridFra EDDTable{#eddgridfromeddtable} 
[ **EDDGridFra EDDTable** ](#eddgridfromeddtable)lar deg konvertere et EDDTable-tabelldatasett til enEDDGridNettede datasett. Husk detERDDAP™behandler datasett som også[Nettede datasett (underklasser avEDDGrid) eller tabelldatasett (underklasser av EDDTable) ](#why-just-two-basic-data-structures)..

* Vanligvis, hvis du har rutenettet data, du bare konfigurere enEDDGridDatasett direkte. Noen ganger er dette ikke mulig, for eksempel når du har data lagret i en relasjonsdatabase somERDDAP™kan kun få tilgang via EDDTableFromDatabase.EDDGridFraEDDTabell klasse kan du løse den situasjonen.
     
* Selvfølgelig må dataene i det underliggende EDDTable datasettet være (i utgangspunktet) Nettede data, men i tabellform. For eksempel kan EDDTable datasettet ha CTD-data: målinger av østover og nordoverstrøm, på flere dybder, til flere ganger. Ettersom dybdene er de samme hver gang,EDDGridFraEDDTable kan opprette et rutenettet datasett med en tid og en dybdedimensjon som får tilgang til dataene via det underliggende EDDTable-datasettet.
     
* Opprett datasett Xml -- Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Du kan samle informasjonen du trenger for å forbedre det grove utkastet.
     
* Kildeattributter -- Som med alle andre typer datasett,EDDGridFraTable har ideen om at det er globale kilderAttributes og[globaladdAttributes](#global-attributes)  (angitt idatasets.xml) , som kombineres for å gjøre det globale kombinert Egenskaper, som er hva brukerne ser. For globale kilderAttributes,EDDGridFraEDDTable bruker den globale kombinerte Attributene til det underliggende EDDTable-datasettet. (Hvis du tenker på det et øyeblikk, er det fornuftig.) 
    
På samme måte for hveraxisVariableogdataVariable's[addAttributes](#addattributes),EDDGridFraEDDTable bruker variabelens kombinert Attribut fra det underliggende EDDTable-datasettet som denEDDGridFra EDDTable variabelens kildeAttributes. (Hvis du tenker på det et øyeblikk, er det fornuftig.) 
    
Hvis EDD-tabellen har gode metadata,EDDGridFromEDTable trenger ofte svært liteaddAttributesMetadata - bare noen få tweaks her og der.
    
*   dataVariables versusaxisVariables-- Den underliggende EDDTable har kundataVariableS. AnEDDGridFraEDDTable datasett vil ha noenaxisVariables (laget av noen av EDD-tabellendataVariables) og noendataVariables (opprettet fra den gjenværende EDDTabledataVariables) ..[Generer DatasetsXml](#generatedatasetsxml)vil gjette på hvilken EDDTabledataVariableS skal bliEDDGridFra EDDTableaxisVariableMen det er bare et gjett. Du må endre utdata fra GenerationDatasetsXml for å angi hvilketdataVariableS vil bliaxisVariableI hvilken rekkefølge.
     
* aksenValues -- Det er ingenting om den underliggende EDDTable å fortelleEDDGridFraEDDTabell de mulige verdiene tilaxisVariables i den rutenettede versjonen av datasettet, så du må gi den informasjonen for hveraxisVariablevia en av disse egenskapene:
    
    * aksenValues - kan du angi en liste over verdier. For eksempel
        &lt;Att name="akseValues"[type=" doubleList"](#attributetype)\\&gt;2, 2,5, 3, 3,5, 4&lt;/att&gt;
Legg merke til bruken av et[Datatype](#data-types)pluss ordlisten. Også typen liste (For eksempel dobbel) Må matche dataene Type variabel i EDD-tabellen ogEDDGridFraEDDtabell datasett.
    * aksenValuesStartStrideStop -- lar deg angi en sekvens av regelmessige avstandsverdier ved å angi start-, trinn- og stoppverdier. Her er et eksempel som tilsvarer aksenValues eksemplet ovenfor:
        &lt;at name="axisValuesStartStrideStop"[type=" doubleList"](#attributetype)\\&gt;2, 0,5, 4&lt;/att&gt;
Legg merke til bruken av en listedatatype. Også typen liste (For eksempel dobbel) Må matche dataene Type variabel i EDD-tabellen ogEDDGridFraEDDtabell datasett.
         
    
Oppdateringer -- Akkurat som det ikke finnes noen måte forEDDGridFra EDDTable for å bestemme akseverdiene fra EDDTable i utgangspunktet, er det heller ingen pålitelig måte forEDDGridFra EDD-tabellen for å bestemme fra EDD-tabellen når akseverdiene har endret seg (spesielt når det er nye verdier for tidsvariabelen) .. For tiden er den eneste løsningen å endre aksenValues-attributten idatasets.xmlLast datasettet på nytt. Du kan for eksempel skrive et skript til
    
    1. Søkdatasets.xmlfor
        datasetID= " *DatasetID* "
Du jobber med riktig datasett.
    2. Søkdatasets.xmlfor neste forekomst av
        <sourceName> *variablesSourceName* </sourceName>  
Du jobber med riktig variabel.
    3. Søkdatasets.xmlfor neste forekomst av
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
Du vet startposisjonen til merket.
    4. Søkdatasets.xmlfor neste forekomst av
```
        </att>  
```
Så du kjenner sluttposisjonen til akseverdiene.
    5. Bytt ut den gamle starten, strider, stoppverdier med de nye verdiene.
    6. Kontakt[flagg URL](/docs/server-admin/additional-information#set-dataset-flag)for datasett å fortelleERDDAP™Last datasettet på nytt.
    
Dette er ikke ideelt, men det fungerer.
     
* presisjon -- NårEDDGridFraEDDTable reagerer på en brukers forespørsel om data, den beveger en rekke data fra EDDTable-responstabellen i tabellenEDDGridresponsnett. For å gjøre dette må det finne ut om akseverdiene på en gitt rad i tabellen samsvarer med en kombinasjon av akseverdier i rutenettet. For heltallsdatatyper er det enkelt å bestemme om to verdier er lik. Men for flyter og dobler, dette bringer opp det forferdelige problemet med flytende punkt tall[Ikke matcher nøyaktig](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).. (for eksempel 0,2 versus 0.199999999999996) .. Til (Prøv å) håndtere dette,EDDGridFra Tabell kan du angi en presisjonsattributt for noen avaxisVariables, som angir det totale antall desimalsiffer som må være identiske.
    * For eksempel&lt;at name=" presisjon" type="int"&gt;5&lt;/att&gt;
    * For ulike typer datavariabler er det forskjellige standard presisjonsverdier. Standardene er vanligvis passende. Hvis de ikke er det, må du angi ulike verdier.
    * ForaxisVariablesom er[Tid eller tid Stempelvariabler](#timestamp-variables), standarden er full presisjon (En nøyaktig match) ..
    * ForaxisVariableS som flyter, standard presisjon er 5.
    * ForaxisVariableS som er doubles, standard presisjon er 9.
    * ForaxisVariablesom har heltallsdatatyper,EDDGridFraEDDTable ignorerer presisjonsattributten og bruker alltid full presisjon (En nøyaktig match) ..
         
    *    **ADVARSEL&#33;** Ved omdannelse av en del av tabelldata til en del av rutenettet data, dersomEDDGridFraEDDTable kan ikke matche en EDDTable " akse" verdi til en av de forventedeEDDGridFra EDD-tabellakseverdier,EDDGridFraEDDTable stille (ingen feil) Kaster dataene fra den raden i tabellen. For eksempel kan det være andre data (Ikke på nettet) i EDDTable datasett. (Og hvis strider &gt; 1 Det er ikke åpenbart åEDDGridFra tabell hvilke akseverdier som er ønsket verdier og hvilke som er de som skal hoppes på grunn av striden.) Så hvis presisjonsverdiene er for høye, vil brukeren se manglende verdier i dataresponsen når gyldige dataverdier faktisk eksisterer.
        
Hvis presisjonsverdiene er satt for lave, EDDTable-akse-verdier som ikke bør matcheEDDGridFraEDDTable-akseverdier vil (Feilaktig) match.
        
Disse potensielle problemene er forferdelige, fordi brukeren får feil data (eller manglende verdier) Når de skal få riktige data (eller i det minste en feilmelding) ..
Dette er ikke en feil iEDDGridFra tabell.EDDGridFra tabellen kan ikke løse dette problemet. Problemet er iboende i konverteringen av tabelldata til gitte data (med mindre andre antakelser kan gjøres, men de kan ikke gjøres her) ..
Det er opp til deg,ERDDAP™administrator til **test dinEDDGridFraEDDTable grundig** For å sikre at presisjonsverdiene er satt for å unngå disse potensielle problemene.
        
#### gapTreshold{#gapthreshold} 
*   [gapTreshold](#gapthreshold)-- Dette er en veldig uvanlig type datasett. Siden de typer spørsmål som kan gjøres til (Håndtert av) enEDDGridDatasett (relatert til intervaller og straider avaxisVariables) er svært forskjellig fra de typene spørsmål som kan gjøres til (Håndtert av) et EDDTable datasett (Bare relatert til intervallene til noen variabler) , ytelsen tilEDDGridFraEDDTable datasett vil variere sterkt avhengig av den nøyaktige forespørsel som er gjort og hastigheten på det underliggende EDDTable datasett. For forespørsler som har en strideverdi &gt; 1,EDDGridFraEDDTable kan be den underliggende EDDTable om en relativt stor del av data (som om stride=1) og deretter snu gjennom resultatene, holde data fra noen rader og kaste bort data fra andre. Hvis det trenger å snu gjennom mye data for å få dataene den trenger, vil forespørselen ta lengre tid å fylle ut.
    
HvisEDDGridFraEDDTabell kan fortelle at det vil være store hull (med rekker av uønskede data) mellom radene med ønsket data,EDDGridFraEDDTable kan velge å gjøre flere underspørsmål til den underliggende EDDTable i stedet for én stor forespørsel, og dermed hoppe over de uønskede rekkene av data i de store hullene. Sensitiviteten for denne beslutning styres av gapTreshold-verdien som angitt i&lt;gapTreshold&gt; tag (standard=1000 rader av kildedata) .. Å sette gapTreshold til et mindre tall vil føre til datasettet gjør (generelt) Flere spørsmål. Å sette gapTreshold til et større antall vil føre til datasettet gjør (generelt) færre underspørsmål.
    
Hvis gapTreshold er satt for lite,EDDGridFraEDDTable vil fungere sakte fordi overskuddet av flere forespørsler vil være større enn tiden lagret ved å få noen overflødige data. Hvis gapTreshold er satt for stort,EDDGridFraEDDTable vil fungere saktere fordi så mye overflødige data vil bli hentet fra EDDTable, bare for å bli kassert. (Som Goldilocks oppdaget, er midten - rett til høyre -) Overhead for ulike typer EDDTable datasett varierer mye, så den eneste måten å vite den faktiske beste innstillingen for datasettet er via eksperimentering. Men du vil ikke gå for langt feil å holde seg til standard.
    
Et enkelt eksempel er: Tenk deg enEDDGridFra Tabell med bare énaxisVariable  (tid, med en størrelse på 10000) , éndataVariable  (temperatur) , og standard gapTreshold på 1000.
    
    * Hvis en bruker ber om temperatur\\[0&#58;100&#58;5000\\], strid er 100 så gapstørrelsen er 99, som er mindre enn gapTreshold. SåEDDGridFratabell vil bare gjøre én forespørsel til EDDTable for alle data som trengs for forespørselen (Tilsvarende temperatur\\[0:5000\\]) og kast bort alle radene av data det ikke trenger.
    * Hvis en bruker ber om temperatur\\[0:2500:5000\\], det trinn er 2500 så gapstørrelsen er 2499, som er større enn gapTreshold. SåEDDGridFratabellen vil gjøre separate forespørsler til EDDTable som tilsvarer temperatur\\[0\\], temperatur\\[2500\\], temperatur\\[5000\\]..
    
Beregning av gapstørrelsen er mer komplisert når det er flere akser.
    
For hver brukerforespørsel,EDDGridFraEDDTable skriver ut diagnostiske meldinger relatert til dette i[log.txt](/docs/server-admin/additional-information#log)fil.
    
    * Hvis [&lt;loggnivå&gt;] (#loglevel) idatasets.xmler satt til info, dette skriver ut en melding som
\\* nOuterAxes=1 av 4 nOuterRequests=22
Hvis nOuterAxes=0, ble ikke gapTreshold overskredet og bare én forespørsel vil bli gjort til EDDTable.
Hvis nOuterAxes&gt;0, gapTreshold ble overskredet og nOuterRequests vil bli gjort til EDDTable, tilsvarende hver forespurt kombinasjon av de venstre nOuterAxes. For eksempel hvis datasettet har 4axisVariableS ogdataVariablesom østover\\[tid\\]\\[breddegrad\\]\\[Lengdegrad\\]\\[dybde\\]Den venstre mest (først) aksen variabel er tid.
    * Hvis&lt;logLevel&gt; idatasets.xmler satt til alle, ekstra informasjon er skrevet til log.txt-filen.
         
#### EDDGridFraEDDTable skjelett XML{#eddgridfromeddtable-skeleton-xml} 
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

### EDD*FraERDDAP {#eddfromerddap} 
 **EDDGridFraErddap** håndterer rutenettede data fra en fjernkontrollERDDAP™server.
 **EDDTableFraErddap** håndterer tabelldata fra en eksternERDDAP™server.

*   EDDGridFraErddap og EDDTableFraErddap oppfører seg annerledes enn alle andre typer datasett iERDDAP..
    * Som andre typer datasett får disse datasettene informasjon om datasettet fra kilden og holder det i minnet.
    * Som andre typer datasett, nårERDDAP™Søk etter datasett, viser datatilgangsskjemaet ( *datasetID* .html) , eller viser Make A Graph skjema ( *datasetID* .graph) ,ERDDAP™bruker informasjonen om datasettet som er i minne.
    *   EDDGridFraErddap og EDDTable FraErddap er grunnlaget for[nett/clustere/federasjoner](/docs/server-admin/scaling)avERDDAPs, som effektivt distribuerer CPU-bruk (Mest for å lage kart) , minnebruk, datasettlagring og båndbreddebruk av et stort datasenter.
#### Omdiriger{#redirect} 
* I motsetning til andre typer datasett, nårERDDAP™mottar en anmodning om data eller bilder fra disse datasettene,ERDDAP [omdirigerer](https://en.wikipedia.org/wiki/URL_redirection)Forespørselen til fjernkontrollenERDDAP™server. Resultatet er:
    * Dette er meget effektivt (CPU, minne og båndbredde) fordi ellers
        1. SammensetningenERDDAP™må sende forespørselen til den andreERDDAP™  (som tar tid) ..
        2. Den andreERDDAP™må få dataene, reformatere dem og overføre dataene til sammensetningenERDDAP..
        3. SammensetningenERDDAP™må motta dataene (bruk båndbredde) , reformatere det (bruk av CPU og minne) og overføre dataene til brukeren (bruk båndbredde) .. Ved å omdirigere forespørselen og tillate den andreERDDAP™å sende responsen direkte til brukeren, sammensetningenERDDAP™bruker i det vesentlige ingen CPU-tid, minne eller båndbredde på forespørselen.
    * Omdirigeringen er gjennomsiktig for brukeren uansett klientprogramvaren (en nettleser eller andre programvare eller kommandolinjeverktøy) ..
*   [Du kan fortelleERDDAP™](#redirect)ikke å omdirigere noen brukerforespørsler ved å sette&lt;omdirigere&gt;falske&lt;/redirect&gt;, men dette nekter de fleste fordelene med ...FraErddap datasett type (Spesielt disperger belastningen på frontenERDDAP™til avsides/backendERDDAP) ..
         
     
#### Abonnement{#subscriptions} 
Vanligvis når enEDDGridFraErddap og EDDTable FraErddap er (re) Lastet på dinERDDAP, de prøver å legge til et abonnement på fjerndatasettet via fjernkontrollenERDDAPe-post/URL abonnementssystem. På den måten, når fjerndatasettet endres, fjernkontrollenERDDAP™Kontakter[setDataset Flag URL](/docs/server-admin/additional-information#set-dataset-flag)på dinERDDAP™slik at det lokale datasettet lastes på nytt ASAP og slik at det lokale datasettet alltid er helt oppdatert og etterlikner fjerndatasettet. Så første gang dette skjer, bør du få en e-post som ber om at du validerer abonnementet. Hvis det lokaleERDDAP™kan ikke sende en e-post eller hvis fjernkontrollenERDDAPabonnementssystemet e-post/URL er ikke aktivt, du bør e-post fjernkontrollenERDDAP™administrator og be om at s/han manuelt legger til [&lt;onChange&gt;] (#onchange) ...&lt;/onChange&gt; tagger til alle relevante datasett for å ringe datasettets[setDataset Flaggadresser](/docs/server-admin/additional-information#set-dataset-flag).. Se dinERDDAP™daglig rapport for en liste over settdatasett Flag URLs, men bare sende dem forEDDGridFraErddap og EDDTableFraErddap datasett til fjernkontrollenERDDAP™administrator.
    
Fungerer ikke dette? Er dine lokale datasett ikke synkronisert med de eksterne datasettene?
Flere ting må alle fungere riktig for at dette systemet skal fungere slik at datasettene holder seg oppdaterte. Sjekk alle disse tingene i rekkefølge:
    
    1. DinERDDAP™Må kunne sende ut e-post. Se e-postinnstillingene i config.xml.
    2. Generelt (Men ikke alltid) , dinERDDAP's&lt;baseUrl&gt; og&lt;baseHttpsUrl&gt;må ikke ha et portnummer (f.eks. :8080, :8443) .. Hvis de gjør det, bruk en[proxypass](/docs/server-admin/deploy-install#proxypass)å fjerne havnen fra Url.
    3. I setup.xml,&lt;abonnentToRemoteErddapDataset&gt; må settes til sant.
    4. Når din lokale EDD... FraErddap-datasettet lastes på nytt, det bør sende en forespørsel til fjernkontrollenERDDAP™å abonnere på fjerndatasettet. Se logg.txt for å se om dette skjer.
    5. Du bør få en e-post som ber deg om å validere abonnementsforespørselen.
    6. Du må klikke på lenken i e-posten for å validere abonnementsforespørselen.
    7. FjernkontrollenERDDAP™Det bør sis at valideringen var vellykket. Når som helst kan du be om en e-post fra fjernkontrollenERDDAP™med en liste over de ventende og gyldige abonnementene dine. Se skjemaet på *avsideErddapBase Url* /erddap/subscriptions/list.html .
    8. Når fjerndatasettet endres (For eksempel får du ekstra data) , fjernkontrollenERDDAP™bør prøve å kontakte flagget URL på dinERDDAP.. Du kan ikke sjekke dette, men du kan spørre administratoren på fjernkontrollenERDDAP™for å sjekke dette.
    9. DinERDDAP™bør motta en forespørsel om å angi denne flaggadressen. Se i din log.txt for "setDatasetFlag.txt?" forespørsel (s) og se om det er en feilmelding knyttet til forespørsler.
    10. DinERDDAP™bør så prøve å laste datasettet på nytt (Kanskje ikke umiddelbart, men ASAP) ..
         
#### Oppdatert max (tid) ?{#up-to-date-maxtime} 
EDDGrid/TableFraErddap datasett bare endrer sin lagrede informasjon om hvert kildedatasett når kildedatasettet er[reload-ed](#reloadeverynminutes)Noen metadata endringer (For eksempel tidsvariabelensactual\\_range) og dermed generere et abonnementsvarsel. Hvis kildedatasettet har data som endres ofte (For eksempel nye data hvert sekund) og bruker["update"](#updateeverynmillis)system for å merke hyppige endringer i de underliggende dataene,EDDGrid/TabellFromErddap vil ikke bli varslet om disse hyppige endringene før neste datasett " reload", så denEDDGrid/TabellFraErddap vil ikke være helt oppdatert. Du kan minimere dette problemet ved å endre kildedatasettets&lt;reloadEveryNMinutes&gt; til en mindre verdi (60? 15?) slik at det er flere abonnementsvarsler å fortelleEDDGrid/TabellFraErddap å oppdatere sin informasjon om kildedatasettet.

Hvis datahåndteringssystemet vet når kildedatasettet har nye data (f.eks. via et skript som kopierer en datafil på plass) , og hvis det ikke er super hyppig (f.eks. hvert 5. minutt eller mindre hyppig) Det finnes en bedre løsning:

1. Ikke bruk&lt;oppdaterEveryNMillis&gt; for å holde kildedata satt oppdatert.
2. Angi kildedatasettets&lt;reloadEveryNMinutes&gt; til et større antall (1440?) ..
3. Ta kontakt med kildedatasettet[flagg URL](/docs/server-admin/additional-information#set-dataset-flag)rett etter det kopierer en ny datafil på plass.
     

Det vil føre til at kildedatasettet er helt oppdatert og får det til å generere et abonnementsvarsel, som vil bli sendt tilEDDGrid/TableFraErddap datasett. Det vil ledeEDDGrid/TableFraErddap datasett å være perfekt oppdatert (innen 5 sekunder etter at nye data er lagt til) .. Alt som vil bli gjort effektivt (uten unødvendige datasett) ..
     
#### NeiaddAttributes,axisVariable, ellerdataVariable {#no-addattributes-axisvariable-or-datavariable} 
I motsetning til andre typer datasett, EDDTableFromErddap ogEDDGridFraErddap-datasett tillater ikke globale&lt;addAttributes&gt;,&lt;axisVariable&gt;, eller&lt;dataVariable&gt; seksjoner idatasets.xmlFor det datasettet. Problemet er at det å la dem føre til uoverensstemmelser:
    
1. La oss si det var tillatt og du har lagt til en ny global attributt.
2. Når en bruker spør dinERDDAP™For de globale attributtene vil den nye egenskapen vises.
3. Men når en bruker spørERDDAP™for en datafil, dinERDDAP™omdirigerer forespørselen til kildenERDDAP.. DetERDDAP™er uvitende om den nye egenskapen. Så hvis det oppretter en datafil med metadata, f.eks..ncfil, metadata vil ikke ha den nye attributten.

Det er to arbeidsomganger:

1. Konvinner administratoren av kildenERDDAP™For å gjøre endringer som du vil ha metadata.
2. I stedet for EDDTableFromErddap, bruk[EDDTableFra DapSekvens](#eddtablefromdapsequence).. Eller i stedet forEDDGridFraErddap, bruk[EDDGridFraDap](#eddgridfromdap).. Disse EDD-typene lar deg koble effektivt til et datasett på en eksternERDDAP™  (uten å omdirigere dataforespørsler) De lar deg inkludere globalt&lt;addAttributes&gt;,&lt;axisVariable&gt;, eller&lt;dataVariable&gt; seksjoner idatasets.xml.. En annen forskjell: Du må manuelt abonnere på fjerndatasettet, slik at datasettet på dinERDDAP™vil bli varslet (via[flagg URL](/docs/server-admin/additional-information#set-dataset-flag)) når det er endringer i fjerndatasettet. Derfor oppretter du et nytt datasett i stedet for å koble til et fjernt datasett.
         
#### Andre notater{#other-notes} 
* Av sikkerhetsgrunner,EDDGridFraErddap og EDDTable Fra Erddap støtter ikke [&lt;tilgjengeligTil&gt;] (#accessibleto) tagg og kan ikke brukes med eksterne datasett som krever å logge inn (fordi de bruker [&lt;tilgjengeligTil&gt;] (#accessibleto) .. SeERDDAP's[sikkerhetssystem](/docs/server-admin/additional-information#security)for å begrense tilgangen til noen datasett til noen brukere.
     
* Begynner medERDDAP™v2.10,EDDGridFraErddap og EDDTableFromErddap støtter [&lt;tilgjengeligViaFiles&gt;] (#accessibleviafiles) Tag. I motsetning til andre typer datasett, er standarden sant, men datasettets filer vil være tilgjengeligeViaFiles bare hvis kildedatasettet også har&lt;tilgjengeligViaFiles&gt; satt til sant.
     
* Du kan bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å gjøredatasets.xmlbit for denne typen datasett. Men du kan gjøre disse typer datasett lett for hånd.
     
#### EDDGridFraErddap skjelett XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGridFraErddap skjelett XML-datasettet er veldig enkelt, fordi hensikten bare er å etterlikne fjerndatasettet som allerede er egnet for bruk iERDDAP:)
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

#### EDDTableFra Erddap skjelett XML{#eddtablefromerddap-skeleton-xml} 
* Skelett XML for et EDDTableFraErddap-datasett er svært enkelt, fordi hensikten bare er å etterlikne fjerndatasettet, som allerede er egnet for bruk iERDDAP:)
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

### EDDGridFraEtopo{#eddgridfrometopo} 
[ **EDDGridFraEtopo** ](#eddgridfrometopo)Bare tjener[ETOPO1 Global 1-minute grepet hevelsesdatasett](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Ice Surface, gitter registrert, binær, 2byte intensjon: etopo1\\_ice\\_g\\_i2.zip) som distribueres medERDDAP..

* Bare todatasetIDS støttes forEDDGridFra Etopo, slik at du kan få tilgang til data med lengdegradsverdier -180 til 180, eller lengdegradsverdier 0 til 360.
* Det er aldri noen undermerker, siden dataene allerede er beskrevet iERDDAP..
* Så de to alternativene forEDDGridFraEtopo datasett er (bokstavelig talt) :)
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridFraFiles{#eddgridfromfiles} 
[ **EDDGridFraFiles** ](#eddgridfromfiles)er superklassen til alleEDDGridFra... Filer klasser. Du kan ikke brukeEDDGridFra Filer direkte. Bruk i stedet en underklasseEDDGridFra Filer for å håndtere den spesifikke filtypen:

*   [EDDGridFra FlightIRFiles](#eddgridfrommergeirfiles)håndtere data fra gitt[MergeIR.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)Filer.
*   [EDDGridFraAudioFiles](#eddfromaudiofiles)aggregerer data fra en gruppe av lokale lydfiler.
*   [EDDGridFraNcFiles](#eddgridfromncfiles)håndtere data fra gitt[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)filer,[HDF  (v4 eller v5)  .hdf](https://www.hdfgroup.org/)filer,[.ncml](#ncml-files)filer, og[NetCDF  (v3 eller v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)Filer. Dette kan fungere med andre filtyper (For eksempel BUFR) , vi har ikke testet det - vennligst send oss noen prøvefiler hvis du er interessert.
*   [EDDGridFraNcFilesUpakket](#eddgridfromncfilesunpacked)En variant avEDDGridFraNcFiles som håndterer data fra rutenettetNetCDF  (v3 eller v4)  .ncog relaterte filer somERDDAP™pakker ut på lavt nivå.

For tiden støttes ingen andre filtyper. Men det er vanligvis relativt enkelt å legge til støtte for andre filtyper. Kontakt oss hvis du har en forespørsel. Eller hvis dataene dine er i et gammelt filformat som du vil flytte fra, anbefaler vi å konvertere filene til å væreNetCDFv3.ncFiler.NetCDFer et bredt støttet binærformat, gir rask tilfeldig tilgang til dataene, og er allerede støttet avERDDAP..

#### Fra fildetaljer{#from-files-details} 
Følgende opplysninger gjelder alle underklasser avEDDGridFra Filer.

##### aggregering av en eksisterende dimensjon{#aggregation-of-an-existing-dimension} 
Alle variasjoner avEDDGridFraFiles kan samle data fra lokale filer, der hver fil har 1 (eller mer) forskjellige verdier for venstre (først) dimensjon, vanligvis\\[tid\\]som vil bli aggregert. For eksempel kan dimensjonene være\\[tid\\]\\[høyde\\]\\[breddegrad\\]\\[Lengdegrad\\], og filene kan ha data for en (eller noen få) tidsverdi (s) per fil. Det resulterende datasettet vises som om alle fildataene var kombinert. De store fordelene ved sammenslåing er:

* Størrelsen på det samlede datasettet kan være mye større enn en enkelt fil kan være praktisk (~2GB) ..
* For nær-real-time data, er det enkelt å legge til en ny fil med den nyeste delen av data. Du trenger ikke å omskrive hele datasettet.

Kravene til sammenslåing er:
* De lokale filene trenger ikke ha det sammedataVariables (som definert i datasettetsdatasets.xml) .. Datasettet vil hadataVariabledefinert idatasets.xml.. Hvis en gitt fil ikke har en gittdataVariable,ERDDAP™vil legge til manglende verdier etter behov.
* AlledataVariableMå bruke det sammeaxisVariables/dimensioner (som definert i datasettetsdatasets.xml) .. Filene vil bli samlet ut fra den første (venstre-mest) dimensjon, sortert i stigende rekkefølge.
* Hver fil kan ha data for en eller flere verdier i første dimensjon, men det kan ikke være noen overlapp mellom filer. Hvis en fil har mer enn én verdi for den første dimensjonen, må verdiene sorteres i stigende rekkefølge, uten bånd.
* Alle filer må ha nøyaktig de samme verdiene for alle andre dimensjoner. Nøyaktigheten i testen bestemmes av[matchAxisNDigits](#matchaxisndigits)..
* Alle filer må ha akkurat det samme[enheter](#units)Metadata for alleaxisVariableS ogdataVariableS. Hvis dette er et problem, kan du kanskje bruke[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)å løse problemet.
         
##### aggregering via Filnavn eller Global Metadata{#aggregation-via-file-names-or-global-metadata} 
Alle variasjoner avEDDGridFromFiles kan også samle en gruppe filer ved å legge til et nytt venstre lengst (først) dimensjon, vanligvis tid, basert på en verdi avledet fra hvert filnavn eller fra verdien av en global attributt som er i hver fil. Filnavnet kan for eksempel inneholde tidsverdien for dataene i filen.ERDDAP™Da vil vi skape en ny tidsdimensjon.

I motsetning til den samme funksjonen i THREDDS,ERDDAP™Oppretter alltid enaxisVariablemed numeriske verdier (som kreves av CF) , aldri strengverdier (som ikke er tillatt av CF) .. Også,ERDDAP™vil sortere filene i samlingen basert på talleneaxisVariableverdi som tildeles hver fil, slik at aksevariabelen alltid vil ha sorterte verdier som kreves av CF. THREDDS tilnærming til å gjøre en leksikografisk sort basert på filnavnene fører til aggregeringer der akseverdiene ikke er sortert (som ikke er tillatt av CF) Når filnavnene sorteres annerledes enn avledetaxisVariableverdier.

Å etablere en av disse sammenslåingene iERDDAP™, vil du definere et nytt venstre lengst (først)  [axisVariable](#axisvariable)med en spesiell pseudo&lt;sourceName&gt; som fortellerERDDAP™hvor og hvordan du finner verdien for den nye dimensjonen fra hver fil.

* Format for pseudoensourceNamesom får verdien fra et filnavn (bare filename.ext) er
    \\*\\*\\ *filName* [Data Type](#data-types) *,* ekstraktRegex *,* catchGruppenummer*
* Format for pseudoensourceNamesom får verdien fra en fils absolutte stinavn er
    \\*\\*\\ *stiName,* [Data Type](#data-types) *,* ekstraktRegex *,* catchGruppenummer*
    \\[For dette bruker stinavnet alltid'/'som katalogsepareringstegnet, aldri \"\\\".\\]
* Format for pseudoensourceNamesom får verdien fra en global egenskap er
    \\*\\*\\ *Global:* attributt Navn *,* [Data Type](#data-types) *,* ekstraktRegex *,* catchGruppenummer*
* Denne pseudoensourceNamealternativet fungerer annerledes enn de andre: i stedet for å skape et nytt venstre mest (først)  axisVariableDette erstatter verdien av dagensaxisVariablemed en verdi ekstrahert fra filnavnet (bare filename.ext) .. Formatet er
    \\*\\*\\ *erstatte FraFileName,* [Data Type](#data-types) *,* ekstraktRegex *,* catchGruppenummer*
     

Beskrivelsene av de delene du trenger å gi er:

*    *attributt Navn* -- navnet på den globale attributten som er i hver fil og som inneholder dimensjonsverdien.
*    *Data Type* -- Dette angir datatypen som vil bli brukt til å lagre verdiene. Se standardlisten til[Data Typer](#data-types)somERDDAP™støtter, bortsett fra at streng ikke er tillatt her siden aksevariabler iERDDAP™Det kan ikke være strengvariabler.
    
Det finnes en ekstra pseudodataType, timeFormat= *streng Tidsformat* som fortellerERDDAP™at verdien er en streng timeStamp[enheter egnet for strengtider](#string-time-units).. I de fleste tilfeller vil strengTimeFormat du trenger være en variasjon av ett av disse formatene:
    
    *   yyyy-MM-dd'T'HH:mm:ss.SSSZ - som ISO 8601:2004 (E) Datotidsformat. Du kan trenge en forkortet versjon av dette, f.eks.yyyy-MM-dd'T'HH:mm:ss elleryyyy-MM-dd..
    * YYMMddHHmmss.SSS - som er den kompakte versjonen av ISO 8601 datotid format. Du kan trenge en forkortet versjon av dette, f.eks.
    * M/d/YYY H:mm:ss.SSS - som er det amerikanske klippedatoformatet. Du kan trenge en forkortet versjon av dette, f.eks. M/d/YYY.
    * YYDDDHmmssSSS - som er året pluss null-polert dag i året (f.eks. 001 = jan 1, 365 = dec 31 i et ikke-leap år; dette kalles noen ganger feilaktig den julianske datoen) .. Du kan trenge en forkortet versjon av dette, f.eks.
    
Hvis du bruker denne pseudodatatypen, legger du til dette i den nye variabelen&lt;addAttributes&gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Hvis du vil flytte alle tidsverdier, skift tidsverdien i enheter, f.eks.
1970-01-01T12:00:00Z.
*    *ekstraktRegex* -- Dette er[regulært uttrykk](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) som inkluderer en fangstgruppe (i parentes) som beskriver hvordan du uttrekker verdien fra filnavnet eller den globale attributtverdien. For eksempel gitt et filnavn som S19980011998031.L3b\\_MO\\_CHL.nc, fange gruppe #1, \\dtutorial" i det regulære uttrykket S (\\dtutorial) \\dtutorial\\.L3b.\\* vil fange de første 7 sifferene etter 'S': 1998001.
*    *catchGroupNumber* -- Dette er antall fangstgruppen (innenfor et par parenteser) i det regulære uttrykket som inneholder informasjon av interesse. Det er vanligvis 1, den første fangegruppen. Noen ganger må du bruke fangstgrupper til andre formål i regulært, så det viktige fangstgruppen nummer vil være 2 (den andre fangstgruppen) eller 3 (den tredje) , etc.

Et fullt eksempel på etaxisVariablesom gjør et samlet datasett med en ny tidsakse som får tidsverdiene fra filnavnet til hver fil er
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Når du bruker tidsformat=" pseudodata Type,ERDDAP™vil legge til 2 attributter iaxisVariableSå de ser ut til å komme fra kilden:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
I dette tilfellet,ERDDAP™vil skape en ny akse som heter"time"med doble verdier (sekunder siden 1970-01-01T00:00:00Z) ved å trekke ut 7 sifre etter \"S\" og før .L3m i filnavnet og tolke dem som tidsverdier formatert som YYDDD.

Du kan overstyre standard basistid (1970-01-01T00:00:00Z) ved å legge til en[addAttribute](#addattributes)som angir en annen enhet attributt med en annen basistid. En vanlig situasjon er: det er grupper av datafiler, hver med en 1 dag kompositt av et satellittdatasett, der du vil at tidsverdien skal være på ettermiddagen på dagen som er nevnt i filnavnet (Sentrert tid på hver dag) og ønsker variabelenslong\\_nameå være "Centered Time". Et eksempel som gjør dette er:
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
Merk timer=12 i basistiden, som legger til 12 timer i forhold til den opprinnelige basistiden 1970-01-01T00:00:00Z.

Et fullt eksempel på etaxisVariablesom gjør et samlet datasett med en ny "run" akse (med intense verdier) som får løpsverdier fra den globale egenskapen "runID" i hver fil (med verdier som "r17\\_global", der 17 er kjøringsnummeret) er
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
Legg merke til bruken av opptaksgruppens nummer 2 for å fange sifferene som oppstår etter 'r' eller 's', og før "_global". Dette eksemplet viser også hvordan du legger til ekstra attributter (f.eks.ioos\\_categoryog enheter) til aksevariabelen.
     
#### Eksternt komprimerte filer{#externally-compressed-files} 
* Datasett som er undergrupper avEDDGridFra Filer og EDDTable FromFiles kan betjene data direkte fra eksterne komprimerte datafiler, inkludert.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, og .Z-filer.
     
*    **Dette fungerer overraskende bra&#33;**   
I de fleste tilfeller er nedgangen relatert til å dekomprimere små og mellomstore datafiler mindre. Hvis du trenger å spare diskplass, oppfordrer vi sterkt til å bruke denne funksjonen, spesielt for eldre filer som sjelden er tilgjengelig.
     
*    **Spar penger&#33;**   
Dette er en av de få funksjonene iERDDAP™Det gir deg muligheten til å spare mye penger (Selv om på bekostning av noe redusert ytelse) .. Hvis kompresjonsforholdet er f.eks. 6:1 (Noen ganger vil det bli mye høyere) Da vil datasettets datafiler bare trenge 1/6 diskplassen. Så kan du komme forbi med 1 RAID (av en gitt størrelse) I stedet for 6 RAIS (av samme størrelse) .. Det er en enorm kostnadsbesparelse. Forhåpentligvis evnen til å komprimere noen filer i en samling (De eldre?) og ikke komprimer andre (De nyere?) , og for å endre det når som helst, la oss minimere nedsiden for å komprimere noen av filene (langsommere tilgang) .. Og hvis valget er mellom å lagre filene på bånd (og kun tilgjengelig etter forespørsel, etter forsinkelse) vs å lagre dem komprimert på en RAID (og tilgjengelig viaERDDAP) , så det er en stor fordel å bruke kompresjon slik at brukerne blir interaktive og (relativt) rask tilgang til dataene. Og hvis dette kan spare deg fra å kjøpe en ekstra RAID, kan denne funksjonen spare deg rundt $ 30 000.
     
* For alleEDDGridFraFiles underklasser, hvis datafilene har en utvidelse som indikerer at de er eksternt komprimerte filer (i dag:.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, eller .Z) ,ERDDAP™vil dekomprimere filene til datasettets buffermappe når det leser dem (Hvis de ikke allerede er i cache) .. Det samme gjelder for binær fil (f.eks..nc) Underklasser av EDDTableFromFiles.
     
* For EDDTableFromFiles underklasser for ikke-binære filer (f.eks.) , datafiler med en utvidelse som indikerer at de er eksternt komprimerte filer vil bli dekomprimert på flugen som filen leses.
     
* Beskriving: Hvis typen eksternt komprimert fil som brukes (f.eks..tgzeller.zip) støtter mer enn 1 fil i den komprimerte filen, den komprimerte filen må inneholde bare 1 fil.
     
* Denne funksjonen antar at innholdet i de eksterne komprimerte filene ikke endres, slik at en cached dekomprimert fil kan gjenbrukes. Hvis noen eller alle datasettets datafiler noen ganger endres, ikke komprimer disse filene. Dette er i samsvar med vanlig bruk, siden folk normalt ikke komprimere filer som de noen ganger trenger å endre.
     
*   &lt;filNameRegex&gt; For å gjøre dette arbeidet, datasettets&lt;filNameRegex&gt; må passe til navnene på komprimerte filer. Det er klart at regulære regulasjoner som.\\*vil matche alle filnavn. Hvis du angir en bestemt filtype, f.eks.\\*\\.nc, så må du endre regulært for å inkludere kompresjonsutvidelsen også, for eksempel . . . *\\.nc\\.gz(Hvis alle filene vil være* noe*.nc.gzfiler) .
     
* Det er fint hvis datasettet inneholder en blanding av komprimerte og ikke komprimerte filer. Dette kan være nyttig hvis du tror at noen filer (f.eks. eldre filer) vil bli brukt mindre ofte og derfor vil det være nyttig å spare diskplass ved å komprimere dem. For å gjøre dette arbeidet&lt;filNameRegex&gt; må matche komprimerte og ikke komprimerte filnavn, for eksempel .\\*eller.\\*\\.nc (|\\.gz) (der fangstgruppen på slutten av det angir at.gzDet er valgfritt.
     
* Det er bra hvis du komprimerer eller dekompresser spesifikke filer i samlingen når som helst.
Hvis datasettet ikke bruker [&lt;OppdaterEveryNMillis&gt;] (#updatevardenmillis) Sett datasettets[flagg](/docs/server-admin/additional-information#flag)å fortelleERDDAP™å laste datasettet på nytt og dermed legge merke til endringene. Interessant kan du bruke ulike kompresjonsalgoritmer og innstillinger for ulike filer i samme datasett (f.eks..bz2for sjelden brukte filer,.gzfor ikke ofte brukte filer, og ingen komprimering for ofte brukte filer) , bare sørg for at regulært støtter alle filendelser som er i bruk, f.eks..nc (|\\.gz|\\.bz2) ..
     
* Selvfølgelig varierer kompresjonsforholdene og hastighetene for de ulike kompresjonsalgoritmene med kildefilen og innstillingene (f.eks. kompresjonsnivå) .. Hvis du ønsker å optimalisere dette systemet for filene dine, gjør du en test av de forskjellige kompresjonsmetodene med filene dine og med en rekke kompresjonsinnstillinger. Hvis du vil ha en pålitelig god (Ikke nødvendigvis det beste) installasjon, vil vi litt anbefalegzip  (.gz) ..gzipgjør ikke den minste komprimerte filen (Det er rimelig nært) , men det komprimerer filen veldig raskt og (Viktigere forERDDAP™brukere) Dekomprimerer filen raskt. Pluss,gzipprogramvare leveres standard med hver Linux og Mac OS installasjon og er lett tilgjengelig for Windows via gratis verktøy som 7Zip og Linux tillegg som Git Bash. For eksempel for å komprimere en kildefil i.gzversjon av filen (samme filnavn, men med.gzLegg til) , bruk (i Linux, Mac OS og Git Bash)   
    gzip  *sourceName*   
å dekomprimere en.gzfil tilbake til originalen, bruk
gunzip *sourceName.gz*   
Hvis du vil komprimere hver av kildefilene i katalogen og dens undermapper, bruk rekursivt
    gzip-r *DirektørName*   
å dekomprimere hver av.gzfiler i mappen og underkatalogene , rekursivt, bruk
gunzip-r *DirektørName*   
     
* ADVARSEL: Ikke komprimer eksternt (gzip) filer som allerede er internt komprimert&#33;
Mange filer har allerede komprimert data internt. Hvis dugzipdisse filene, de resulterende filene vil ikke være mye mindre (&lt;5%) ogERDDAP™vil kaste bort tid på å presse dem når det trenger å lese dem. For eksempel:
    
    * Datafiler: f.eks..nc4 og.hdf5 filer: Noen filer bruker intern kompresjon, noen ikke. Hvordan fortelle: komprimerte variabler har "\\_ChunkSize" attributter. Også, hvis en gruppe gitt.nceller.hdffiler er alle ulike størrelser, de er sannsynligvis internt komprimert. Hvis de alle er like store, er de ikke internt komprimert.
    * bildefiler: f.eks. gif, .jpg og .png
    * lydfiler: f.eks. .mp3, og .ogg.
    * videofiler: f.eks. .mp4, .ogv og .webm.
    
        
En uheldig merkelig tilfelle: .wav lydfiler er enorme og ikke internt komprimert. Det ville vært fint å komprimere (gzip) dem, men generelt bør du ikke fordi hvis du gjør det, vil brukerne ikke kunne spille komprimerte filer i nettleseren.
     
* Test Case: komprimering (medgzip) et datasett med 1523 gitt.ncFiler.
    
    * Dataene i kildefilene var sparsomme (Mange manglende verdier) ..
    * Total diskplass gikk fra 57 GB før kompresjon til 7 GB etterpå.
    * En forespørsel om mye data fra et tidspunkt er&lt;1 s før og etter kompresjon.
    * En forespørsel om 1 datapunkt for 365 tidspunkter (den verste saken) gikk fra 4 s til 71 s.
         
    
For meg er det en rimelig avlevering for alle datasett, og absolutt for datasett som sjelden brukes.
     
* Intern versus ekstern komprimering --
Sammenlignet med den interne filkomprimering som tilbys av.nc4 og.hdf5 filer,ERDDAPTilnærmingen til eksterne komprimerte binære filer har fordeler og ulemper. Ulempen er: For en gangs lesing av en liten del av en fil, intern kompresjon er bedre fordiEDDGridFraFiles trenger bare å dekompressere noen stykker (s) av filen, ikke hele filen. MenERDDAPTilnærmingen har noen fordeler:
    
    *   ERDDAP™støtter komprimering av alle typer datafiler (binær og ikke-binær, f.eks..nc3 og csv) Ikke bare.nc4 og.hdf4.
    * Hvis hovedparten av en fil må leses mer enn én gang på kort tid, sparer det tid til å dekomprimere filen en gang og lese den mange ganger. Dette skjer iERDDAP™når en bruker bruker Make-A-Graph for datasettet og gjør en rekke små endringer i grafen.
    * Evnen til å ha komprimerte filer og ikke komprimerte filer i samme samling, tillater deg mer kontroll over hvilke filer som er komprimert og som ikke er det. Og denne ekstra kontrollen kommer uten virkelig å endre kildefilen (siden du kan komprimere en fil med f.eks..gzog deretter dekomprimere den for å få den opprinnelige filen) ..
    * Evnen til å endre når som helst om en gitt fil er komprimert og hvordan den komprimeres (forskjellige algoritmer og innstillinger) gir deg mer kontroll over systemets ytelse. Og du kan enkelt gjenopprette den originale ukomprimerte filen når som helst.
    
Mens ingen tilnærming er en vinner i alle situasjoner, er det klart atERDDAPevne til å betjene data fra eksternt komprimerte filer gjør ekstern kompresjon et rimelig alternativ til den interne kompresjon som tilbys av.nc4 og.hdf5. Det er viktig fordi intern kompresjon er en av hovedårsakene til at folk velger å bruke.nc4 og.hdf5.
     
##### Dekomprimert cache{#decompressed-cache} 
ERDDAP™gjør en dekomprimert versjon av alle komprimerte binære (f.eks..nc) datafil når den må lese filen. Dekomprimerte filene holdes i datasettets mappe i *bigParentDirectory* /dekomprimert/ . Dekomprimerte filer som ikke har blitt brukt nylig vil bli slettet for å frigjøre plass når den kumulative filstørrelsen er &gt; 10GB. Du kan endre det ved å sette&lt;dekomprimertCacheMaxGB&gt; (standard=10) i datasett Xml.xml, f.eks.
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Også dekomprimerte filer som ikke har blitt brukt i løpet av de siste 15 minuttene vil bli slettet i begynnelsen av hver større datasett reload. Du kan endre det ved å sette&lt;dekomprimertCacheMaxMinutesGamle&gt; (standard=15) i datasett Xml.xml, f.eks.
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Større tall er hyggelige, men den kumulative størrelsen på dekomprimerte filene kan forårsake *bigParentDirectory* å gå tom for diskplass, noe som forårsaker alvorlige problemer.
     
* Fordi dekomprimering av en fil kan ta en betydelig tid (0.1 til 10 sekunder) , datasett med komprimerte filer kan dra nytte av å sette datasettets [&lt;nThreads&gt;] (#ntreads) innstilling til et høyere antall (2? 3? 4?) .. Nedgangene til enda høyere tall (For eksempel 5? 6? 7?) reduserer avkastningen, og at en brukers forespørsel deretter kan bruke en høy prosentandel av systemets ressurser, og dermed betydelig bremse behandlingen av andre brukeres forespørsler. Således er det ingen ideell nThreads innstilling, bare forskjellige konsekvenser i ulike situasjoner med forskjellige innstillinger.
         
#### Sorterte dimensjonsverdier{#sorted-dimension-values} 
Verdiene for hver dimensjon må være i sortert rekkefølge (Stiger eller synker, bortsett fra den første (venstre-mest) dimensjon som må stige) .. Verdiene kan være uregelmessig fordelt. Det kan ikke være bånd. Dette er et krav fra[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html).. Hvis dimensjonens verdier ikke er i sortert rekkefølge, vil datasettet ikke bli lastet inn ogERDDAP™vil identifisere den første usorterte verdien i loggfilen, *bigParentDirectory* /logs/log.txt .
    
Usorterte dimensjonsverdier indikerer nesten alltid et problem med kildedatasettet. Dette skjer oftest når en feilnavngitt eller upassende fil er inkludert i sammenslåingen, som fører til en usortert tidsdimensjon. Hvis du vil løse dette problemet, kan du se feilmeldingen iERDDAP™log.txt-fil for å finne den fornærmende tidsverdien. Så se i kildefilene for å finne den tilsvarende filen (eller før eller etter) Det tilhører ikke i sammenslåingen.
    
#### Direktører{#directories} 
Filene kan være i én mappe, eller i en mappe og dens undermapper (Rekursivt) .. Hvis det er et stort antall filer (For eksempel &gt; 1000) , operativsystemet (og dermedEDDGridFraFiles) vil fungere mye mer effektivt hvis du lagrer filene i en rekke underkataloger (én per år, eller én i måneden for datasett med svært hyppige filer) , slik at det aldri er et stort antall filer i en gitt katalog.
     
#### &lt;cacheFromUrl&gt;{#cachefromurl} 
AlleEDDGridFra Filer og alle EDDTableFromFiles datasett støtter et sett tagger som fortellerERDDAP™å laste ned og vedlikeholde en kopi av alle eksterne datasetts filer, eller en cache av noen få filer (Last ned etter behov) .. Dette kan være utrolig nyttig. Se[cache FraUrl dokumentasjon](#cachefromurl)..
    
#### Eksterne kataloger og HTTP Range-forespørsler{#remote-directories-and-http-range-requests} 
 (AKA Byte Service, Byte Range forespørsler, aksepter-Rangeshttpoverskrift)   
EDDGridFraNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles og EDDTableFromNcCFFiles, kan *Noen ganger* servere data fra.ncfiler på eksterne servere og tilgjengelig via HTTP hvis serveren støtter[Byte servering](https://en.wikipedia.org/wiki/Byte_serving)via HTTP-områdeforespørsler (HTTP-mekanismen for byte-tjeneste) .. Dette er mulig fordi netcdf-java (somERDDAP™Bruker til å lese.ncfiler) støtter lesing av data fra fjernkontrollen.ncfiler via HTTP range forespørsler.

 **Ikke gjør dette&#33;** Det er forferdelig ineffektivt og sakte.
Bruk i stedet&lt;cacheFromUrl&gt; system] (#cachefromurl) ..

TilgangERDDAP™Datasett som filer via byteområdeforespørsler --
Flipping dette rundt, gitt at du kan (i teorien) Tenk på et datasett iERDDAP™Som en kjempe.ncfil ved å legge til ".nc" til basen OPenDAPURL til et gitt datasett (f.eks. https://myserver.org/erddap/griddap/datasetID.nc og også ved å legge til en ?query etter det for å spesifisere en undergruppe) , det er kanskje rimelig å spørre om du kan bruke netcdf-java,Ferreteller noen andreNetCDFKundeprogramvare å lese data via HTTP Range forespørsler fraERDDAP.. Svaret er nei, for det er egentlig ikke noe stort..nc- Fil. Hvis du vil gjøre dette, gjør du i stedet et av disse alternativene:

* Bruk(OPeN)DAPkundeprogramvare til å koble til netadap-tjenester som tilbys avERDDAP.. Det er det somDAP  (og dermedERDDAP) var designet for. Det er svært effektivt.
* Eller last ned kildefilen (s) fra"files"systemet (eller en undergruppefil via en.nc? spørring) til datamaskinen og bruk netcdf-java,Ferreteller noen andreNetCDFKundeprogramvare å lese (Nå) lokal fil (s) ..
         
#### Cached filinformasjon{#cached-file-information} 
Når enEDDGridFraFiles-datasettet lastes først,EDDGridFromFiles leser informasjon fra alle relevante filer og skaper tabeller (En rad for hver fil) med informasjon om hver gyldig fil og hver "bad" (forskjellige eller ugyldige) fil.
* Tabellene lagres også på disk, somNetCDFv3.ncfiler i *bigParentDirectory* /datasett/ *Last2CharsOfDatasetID* / *datasetID* / i filer som heter:
dirTable.nc  (som har en liste over unike katalognavn) ,
fil Tabell.nc  (som holder tabellen med hver gyldig fils informasjon) ,
BadFiles.nc  (som holder tabellen med hver dårlig fils informasjon) ..
* For å øke tilgangen til enEDDGridFraFiles datasett (Men på bekostning av å bruke mer minne) Du kan bruke
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
å fortelleERDDAP™å holde en kopi av filinformasjonstabellene i minnet.
* Kopiering av filinformasjonstabellene på disken er også nyttig nårERDDAP™er stengt ned og startet på nytt: det sparerEDDGridFra Filer fra å måtte lese om alle datafilene.
* Når et datasett lastes på nytt,ERDDAP™Bare trenger å lese data i nye filer og filer som har endret seg.
* Hvis en fil har en annen struktur fra de andre filene (For eksempel en annen datatype for en av variablene, eller en annen verdi for "[enheter](#units)" Attribut) ,ERDDAPLegger filen til listen over -bad - filer. Informasjon om problemet med filen vil bli skrevet til *bigParentDirectory* /logs/log.txt fil.
* Du bør aldri trenger å slette eller jobbe med disse filene. Et unntak er: Hvis du fortsatt gjør endringer i et datasettdatasets.xmlsetup, kan du kanskje slette disse filene for å tvingeERDDAP™å lese alle filene på nytt siden filene vil leses/fortolkes annerledes. Hvis du noen gang trenger å slette disse filene, kan du gjøre det nårERDDAP™Jeg løper. (Så sett en[flagg](/docs/server-admin/additional-information#set-dataset-flag)Last datasettet på nytt ASAP.) MenERDDAP™vanligvis merker atdatasets.xmlInformasjonen samsvarer ikke med filen Tabellinformasjon og sletter filtabellene automatisk.
* Hvis du ønsker å oppmuntreERDDAP™å oppdatere den lagrede datasettinformasjonen (Hvis du for eksempel nettopp har lagt til, fjernet eller endret noen filer til datasettets datakatalog) , bruk[flaggsystem](/docs/server-admin/additional-information#flag)å tvingeERDDAP™å oppdatere informasjonen om den cachede filen.
         
#### Forespørsler om håndtering{#handling-requests} 
Når en klients anmodning om data behandles,EDDGridFraFiles kan raskt se i tabellen med gyldig filinformasjon for å se hvilke filer som har de ønskede dataene.
     
#### Oppdaterer informasjon om Cached fil{#updating-the-cached-file-information} 
Når datasettet lastes på nytt, oppdateres den cachede filinformasjonen.
    
* Datasettet lastes opp regelmessig som bestemt av&lt;reloadEveryNMinutes&gt; i datasettets informasjon idatasets.xml..
* Datasettet lastes på nytt så snart som muligERDDAP™oppdager at du har lagt til, fjernet,[Touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (å endre filens siste Endret tid) eller endret en datafil.
* Datasettet lastes på nytt så snart som mulig hvis du bruker[flaggsystem](/docs/server-admin/additional-information#flag)..

Når datasettet lastes på nytt,ERDDAP™sammenligner de tilgjengelige filene med de cachede filinformasjonstabellene. Nye filer leses og legges til i den gyldige filtabellen. Filer som ikke eksisterer lenger, slippes fra den gyldige filtabellen. Filer der filtidsstemplet har endret seg leses og informasjonen oppdateres. De nye tabellene erstatter de gamle tabellene i minnet og på disken.
     
#### Dårlige filer{#bad-files} 
Tabellen over dårlige filer og grunnene til at filene ble erklært dårlige (ødelagt fil, manglende variabler osv.) e-post til e-post Alt Til e-postadresse (Kanskje du) Hver gang datasettet lastes på nytt. Du bør erstatte eller reparere disse filene så snart som mulig.
     
#### Manglende variabler{#missing-variables} 
Hvis noen av filene ikke har noen avdataVariabledefinert i datasettetsdatasets.xmlDet er ok. NårEDDGridFraFiles leser en av disse filene, vil det fungere som om filen hadde variabelen, men med alle manglende verdier.
     
#### FTP-problem/advice{#ftp-troubleadvice} 
Hvis du FTP nye datafiler tilERDDAP™server mensERDDAP™løper, det er muligheten til atERDDAP™vil laste datasettet på nytt under FTP-prosessen. Det skjer oftere enn du kanskje tror&#33; Hvis det skjer, vises filen å være gyldig (Den har et gyldig navn) , men filen er ikke gyldig ennå. HvisERDDAP™prøver å lese data fra den ugyldige filen, vil den resulterende feilen gjøre filen lagt til i tabellen over ugyldige filer. Dette er ikke bra. For å unngå dette problemet, bruk et midlertidig filnavn når FTP'ing filen, for eksempel ABC2005.nc \\_TEMP . Deretter filenNameRegex test (Se nedenfor) vil vise til at dette ikke er en relevant fil. Når FTP-prosessen er fullført, endrer du filen til riktig navn. Omdøpingsprosessen vil gjøre filen relevant på et øyeblikk.
     
#### "0 filer" Feilmelding{#0-files-error-message-1} 
Hvis du løper[Generer DatasetsXml](#generatedatasetsxml)eller[DasDds](#dasdds), eller hvis du prøver å laste enEDDGridFra... Filer datasett iERDDAP™, og du får en  "0 filer" feilmelding som indikerer atERDDAP™funnet 0 samsvarende filer i katalogen (når du tror det er samsvarende filer i den katalogen) :)
    * Sjekk at filene virkelig er i den katalogen.
    * Kontroller stavingen av mappenavnet.
    * Sjekk filenNameRegex. Det er virkelig, veldig enkelt å gjøre feil med regulære. For testformål, prøv regulær .\\* som bør matche alle filnavn. (Se dette[Regulatorisk dokumentasjon](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og[Regular tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)..) 
    * Sjekk at brukeren som kjører programmet (For eksempel bruker=tomcat (?) for Tomcat/ERDDAP) Har \"lese\" tillatelse til disse filene.
    * I noen operativsystemer (For eksempel SELinux) og avhengig av systeminnstillinger, må brukeren som kjørte programmet ha \"lese\" tillatelse til hele kjede av mapper som fører til katalogen som har filene.
         
#### EDDGridFraFiles skjelett XML{#eddgridfromfiles-skeleton-xml} 
*    **Skjelett XML** For alleEDDGridFra Files underklasser er:

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

### EDD*FraAudioFiles{#eddfromaudiofiles} 
 **EDDGridFraAudioFiles** og **EDDTableFraAudioFiler** aggregerte data fra en samling av lokale lydfiler. (Disse kom først iERDDAP™v1.82.) Forskjellen er atEDDGridFraAudioFiles behandler data som et flerdimensjonalt datasett (Vanligvis med 2 dimensjoner:\\[filstart Tid\\]og\\[utløpt Tid i en fil\\]) , mens EDDTableFraAudioFiles behandler data som tabelldata (vanligvis med kolonner for filen startTime, den forfallneTime med filen, og data fra lydkanalene) ..EDDGridFraAudioFiles krever at alle filer har samme antall prøver, så hvis det ikke er sant, må du bruke EDDTableFromAudioFiles. Ellers er valget av hvilken EDD-type å bruke helt ditt valg. En fordel med EDDTableFromAudioFiles: Du kan legge til andre variabler med annen informasjon, f.eks.stationIDstasjonType. I begge tilfeller gjør mangelen på en samlet tidsvariabel det vanskeligere å jobbe med data fra disse EDD-typene, men det var ingen god måte å sette opp en enhetlig tidsvariabel.

Se disse klassenes superklasser,[EDDGridFraFiles](#eddgridfromfiles)og[EDDTableFra Filer](#eddtablefromfiles)for generell informasjon om hvordan denne klassen fungerer og hvordan du bruker den.

Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Siden lydfiler ikke har andre metadata enn informasjon relatert til koding av lyddataene, må du redigere utdata fra Genererer Datasett Xml for å gi viktig informasjon (f.eks. tittel, sammendrag,creator\\_name, institusjon, historie) ..

Detaljer:

* Det er et stort antall lydfiler. I dag,ERDDAP™kan lese data fra de fleste .wav og .au-filer. Den kan for øyeblikket ikke lese andre typer lydfiler, for eksempel .aiff eller .mp3. Hvis du trenger støtte for andre lydfiler eller andre varianter av .wav og .au, vennligst send din forespørsel til Chris. John på noaa.gov. Eller som en løsning du kan bruke akkurat nå, kan du konvertere lydfilene til PCM\\_ SIGNED (for heltallsdata) eller PCM-_FLOAT (for flytende punktdata) .wav-filer slik atERDDAP™kan jobbe med dem.
* I dag,ERDDAP™kan lese lydfiler med hvaJavaAudioFormat-klasse kaller PCM-_FLOAT, PCM-_SIGNED, PCM-_UNSIGNED, ALAW og ULAW-kodinger.ERDDAP™konverterer PCM-_UNSIGNED-verdier (f.eks. 0 til 255) til signerte verdier (f.eks. -128 til 128) ved å omforme bitene i dataverdiene.ERDDAP™konverterer ALAW og ULAW kodet fra deres opprinnelige kodede byteformat til kort (it16) verdier. SidenJavavil ha bigEndian = ekte data,ERDDAP™omorganiserer bytene av data lagret med bigEndian=falsk (liten endian) for å lese verdiene riktig. For alle andre koder (PCM) ,ERDDAP™Lese data som det er.
* NårERDDAP™leser data fra lydfiler, det konverterer filens tilgjengelige lydmetadata til globale attributter. Dette vil alltid inkludere (med viste prøveverdier) 
    
String audioBigEndian "falsk"; // sant eller falsk
intenst lyd Kanal 1;
Streng lydkoding " PCM\\_SIGNED";
flyt lydrammeRate 96000.0; // per sekund
intenst lydrammestørrelse 2; //# databyte per ramme
flyt lydSampleRate 96000.0; // per sekund
intenst lydSampleSizeInBits 16; // # bits per kanal per prøve
    
ForERDDAPDess formål er en ramme synonymt med en prøve, som er dataene for ett punkt i tid.
Attributene iERDDAP™vil ha informasjonen som beskriver data som den var i kildefilene.ERDDAP™vil ofte ha endret dette mens du leser data, f.eks. PCM-_UNSIGNED, ALAW og ULAW-kodede data konverteres til PCM-_SIGNED, og bigEndian=falske data konverteres til bigEndian=true data (som er hvordanJavaVil lese den) .. Til slutt dataverdier iERDDAP™vil alltid være[PCM-kodet](https://en.wikipedia.org/wiki/Pulse-code_modulation)Dataverdier (dvs. enkle digitaliserte prøver av lydbølgen) ..
* NårERDDAP™leser data fra lydfiler, det leser hele filen.ERDDAP™kan lese så mange som 2 milliarder prøver per kanal. For eksempel, hvis prøvehastigheten er 44,100 prøver per sekund, oversettes 2 milliarder prøver til ca. 756 minutter lyddata per fil. Hvis du har lydfiler med mer enn denne mengden data, må du bryte opp filene i mindre deler slik atERDDAP™kan lese dem.
* FordiERDDAP™leser hele lydfiler,ERDDAP™må ha tilgang til en stor mengde minne å jobbe med store lydfiler. Se[ERDDAPminneinnstillinger](/docs/server-admin/deploy-install#memory).. Igjen, hvis dette er et problem, er en løsning som du kan bruke akkurat nå å bryte opp filene i mindre deler slik atERDDAP™Jeg kan lese dem med mindre minne.
* Noen lydfiler ble skrevet feil.ERDDAP™gjør en liten innsats for å håndtere slike tilfeller. Men generelt når det er en feil,ERDDAP™vil kaste unntak (og forkaste den filen) eller (dersom feilen ikke kan oppdages) Les dataene (Men dataene vil være feil) ..
*   ERDDAP™ikke kontrollere eller endre lydens volum. Ideelt sett skaleres heltalslyddata for å bruke hele spekteret av datatypen.
* Lydfiler og lydspillere har ikke noe system for manglende verdier (f.eks. -999 eller Float.Nan) .. Lyddata bør ikke ha noen manglende verdier. Hvis det mangler verdier (For eksempel, hvis du trenger å forlenge en lydfil) Bruk en serie på 0 som vil bli tolket som perfekt stillhet.
* NårERDDAP™leser data fra lydfiler, det oppretter alltid en kolonne som kalles utløpt Tid med tiden for hver prøve, i sekunder (lagret som doubles) i forhold til første prøve (som er tildelt utløpt Time=0.0 s) .. MedEDDGridFraAudioFiles blir dette den forløpte tidsaksevariabelen.
*   EDDGridFraAudioFiles krever at alle filer har samme antall prøver. Hvis det ikke er sant, må du bruke EDDTableFromAudioFiles.
* ForEDDGridFraAudioFiles, anbefaler vi at du setter [&lt;dimensjonValuesInMemory&gt;] (#dimensjonverdisinminne) til falsk (som anbefales av Genererer Datasets Xml) Fordi tidsdimensjonen ofte har et stort antall verdier.
* ForEDDGridFra lydfiler, bør du nesten alltid brukeEDDGridFraFiles system for[aggregering via Filnavn](#aggregation-via-file-names-or-global-metadata), nesten alltid ved å trekke opptakets startdato Tid fra filnavnene. For eksempel
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Opprett datasett Xml vil oppmuntre dette og hjelpe deg med dette.
* For EDDTableFromAudioFiles, bør du nesten alltid bruke EDDTableFromFiles systemet for[\\*\\* \\* filName pseudosourceNames](#filename-sourcenames)å hente ut informasjon fra filnavnet (Nesten alltid startdato Tid for opptak) og fremme det til å være en kolonne av data. For eksempel
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Tidsformatet skal deretter angis som enhetenes attributt:&lt;Att name=" enheter"&gt;yyMMdd'\\_'Hmmss&lt;/att&gt;
     
### EDDGridFra FlightIRFiles{#eddgridfrommergeirfiles} 
[ **EDDGridFra FlightIRFiles** ](#eddgridfrommergeirfiles)aggregerer data fra lokal,[MergeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)Filer som er fra[Tropisk regnfallsmåleroppdrag (TRMM) ](https://trmm.gsfc.nasa.gov), som er et felles oppdrag mellom NASA og Japan Aerospace Exploration Agency (JAXA) .. Slå sammen IR-filer kan lastes ned fra[NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/)..

EDDGridFra FlightIRFiles.java ble skrevet og bidratt tilERDDAP™prosjekt av Jonathan Lafite og Philippe Makowski fra R.Tech Engineering (lisens: opphavsrettslig åpen kilde) ..

EDDGridFra FlameIRFiles er litt uvanlig:

*   EDDGridFra FlightIRFiles støtter komprimerte eller ukomprimerte kildedatafiler, i alle kombinasjoner, i samme datasett. Dette gir deg for eksempel mulighet til å komprimere eldre filer som sjelden er tilkoblet, men trykk ut nye filer som ofte er tilgjengelig. Eller du kan endre typen kompresjon fra den opprinnelige. Z for eksempel,.gz..
* Hvis du har komprimert og ukomprimert versjoner av de samme datafilene i samme mappe, må du sørge for at&lt;filNameRegex&gt; for datasettet samsvarer med filnavnene du vil at det skal matche, og ikke samsvarer med filnavnene som du ikke vil at det skal matche.
* Ukomprimerte kildedatafiler må ikke ha filtype (i filnavnet) ..
* Komprimerte kildedatafiler må ha en filtype, menERDDAP™bestemme type kompresjon ved å inspisere innholdet i filen, ikke ved å se på filtypen til filen (For eksempel:) .. De støttede kompresjonstypene inkluderer "gz " "bzip2", "xz " " "lzma " "ssnappy-raw " "snappy-rammet", "pack200", og "z". NårERDDAP™Leser komprimerte filer, dekomprimerer den på flugen, uten å skrive til en midlertidig fil.
* Alle kildedatafiler må bruke det opprinnelige filnavnssystemet: dvs. merg\\_ *ÅÅÅÅMMDDH* \\_4km-piksel (hvor *ÅÅÅÅMMDDH* angi tiden som er tilknyttet dataene i filen) , pluss en filtype hvis filen er komprimert.

Se denne klassens superklasse,[EDDGridFraFiles](#eddgridfromfiles)for generell informasjon om hvordan denne klassen fungerer og hvordan du bruker den.

Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
 
### EDDGridFraNcFiles{#eddgridfromncfiles} 
[ **EDDGridFraNcFiles** ](#eddgridfromncfiles)samler data fra lokale, nettbaserte,[GRIB.grb og .grb2](https://en.wikipedia.org/wiki/GRIB)filer,[HDF  (v4 eller v5)  .hdf](https://www.hdfgroup.org/)filer,[.ncml](#ncml-files)filer,[NetCDF  (v3 eller v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)filer, og[Zarr](https://github.com/zarr-developers/zarr-python)filer (fra versjon 2.25) .. Zarr-filer har litt forskjellig oppførsel og krever enten filenNameRegex eller pathRegex å inkludere "zarr".

Dette kan fungere med andre filtyper (For eksempel BUFR) , vi har ikke testet det - vennligst send oss noen prøvefiler.

* For GRIB-filer,ERDDAP™vil gjøre en .gbx indeksfil første gang den leser hver GRIB-fil. Så GRIB-filene må være i en katalog der " brukeren" som kjørte Tomcat har lese+skrive tillatelse.
* Se denne klassens superklasse,[EDDGridFraFiles](#eddgridfromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.
* Begynner medERDDAP™v2.12,EDDGridFra NcFiles ogEDDGridFraNcFiles Upakket kan lese data fra "strukturer" i.nc4 og.hdf4 filer. For å identifisere en variabel som er fra en struktur,&lt;sourceName&gt; Må bruke formatet: *FullstrekningName* | *medlemName* , for eksempel gruppe1/myStruct|Min medlem.
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
    
#### Grupper i Gridded Nc-filer{#groups-in-gridded-nc-files} 
    [Netcdf4-filer kan inneholde grupper.](#groups-in-gridded-nc-files) ERDDAP™Bare gjør et datasett fra variablene i én gruppe og alle dens foreldregrupper. Du kan angi et bestemt gruppenavn i Genererer Datasett Xml (ut av den etterfølgende skråstrek) , eller bruk " å ha Genererer Datasett Xml søker alle grupper for variabler som bruker de fleste dimensjoner, eller bruk "\\[rot\\]" å ha GenerererDatasett bare se etter variabler i rotgruppen.
    
Det første GenererDatasetsXml gjør for denne typen datasett etter at du har svart på spørsmålene er å skrive ut den ncdump-lignende strukturen til prøvefilen. Så hvis du skriver inn noen goofy svar for den første loopen gjennom Genererer Datasett Xml, i det minste kan du se omERDDAP™kan lese filen og se hvilke dimensjoner og variabler i filen. Deretter kan du gi bedre svar for den andre løkken gjennom Genererer DatasetsXml.
    

### EDDGridFraNcFilesUpakket{#eddgridfromncfilesunpacked} 
[ **EDDGridFraNcFilesUpakket** ](#eddgridfromncfilesunpacked)En variant av[EDDGridFraNcFiles](#eddgridfromncfiles)som samler sammen data fra lokal, gittNetCDF  (v3 eller v4)  .ncog relaterte filer. Forskjellen er at denne klassen pakker ut hver datafil førEDDGridFraFiles ser på filene:

* Det pakker ut variabler som er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor)..
* Den konverterer \\_FillValue ogmissing\\_valueverdier som skal være NaNs (eller MAX\\_VALUE for heltallsdatatyper) ..
* Det konverterer tid og tidsstempelverdier til"seconds since 1970-01-01T00:00:00Z"..

Den store fordelen med denne klassen er at det gir en måte å håndtere ulike verdier påscale\\_factor,add\\_offset,  \\_FallValue,missing\\_value, eller tidsenheter i ulike kildefiler i en samling. Ellers må du bruke et verktøy som[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)å endre hver fil for å fjerne forskjellene slik at filene kan håndteres avEDDGridFra NcFiles. For at denne klassen skal fungere riktig, må filene følge CF-standardene for de relaterte attributtene.

* Hvis du prøver å lage enEDDGridFraNcFiles Utpakket fra en gruppe filer som du tidligere prøvde og ikke brukteEDDGridFraNcFiles, CD til
     *bigParentDirectory* /datasett/ *Last2Letters* / *datasetID* /
hvor *Last2Letters* De siste 2 bokstavene idatasetID,
og slette alle filene i den katalogen.
* Begynner medERDDAP™v2.12,EDDGridFra NcFiles ogEDDGridFraNcFiles Upakket kan lese data fra "strukturer" i.nc4 og.hdf4 filer. For å identifisere en variabel som er fra en struktur,&lt;sourceName&gt; Må bruke formatet: *FullstrekningName* | *medlemName* , for eksempel gruppe1/myStruct|Min medlem.
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
    
Netcdf4-filer kan inneholde grupper. Se[denne dokumentasjonen](#groups-in-gridded-nc-files)..
    
Det første Generer DatasetsXml gjør for denne typen datasett etter at du har svart på spørsmålene er å skrive ut den ncdump-lignende strukturen til prøvefilen **Før** Det er pakket ut. Så hvis du skriver inn noen goofy svar for den første loopen gjennom Genererer Datasett Xml, i det minste kan du se omERDDAP™kan lese filen og se hvilke dimensjoner og variabler i filen. Deretter kan du gi bedre svar for den andre løkken gjennom Genererer DatasetsXml.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)modifiserer lengdegraden til et barn (lukket)  EDDGriddatasett som har noen lengdeverdier større enn 180 (0 til 360) slik at de er i området -180 til 180 (Longitude Plus eller Minus 180, dermed navnet) ..

* Dette gir en måte å gjøre datasett som har lengdegradsverdier større enn 180 i/medOGCTjenester (For eksempelWMSserver iERDDAP) Siden alleOGCTjenester krever lengdeverdier innen -180 til 180.
* Å arbeide i nærheten av en utsettelse forårsaker problemer, uansett om utsettelsen er på lengdegrad 0 eller på lengdegrad 180. Denne datasetttypen lar deg unngå disse problemene for alle, ved å tilby to versjoner av samme datasett:
en med lengdeverdier i området 0 til 360 ("Pacificentric"?) ,
én med lengdegradsverdier i området -180 til 180 ("Atlanticentric"?) ..
* For barnedatasett med alle lengdeverdier større enn 180, er alle de nye lengdegradsverdiene ganske enkelt 360 grader lavere. For eksempel vil et datasett med lengdeverdier på 180 til 240 bli et datasett med lengdeverdier på -180 til -120.
* For barnedatasett som har lengdeverdier for hele verden (ca 0 til 360) , den nye lengdegradsverdien vil bli omorganisert til å være (omtrent) 180 til 180:
De originale 0 til nesten 180 verdiene er uendret.
De opprinnelige 180 til 360 verdiene konverteres til -180 til 0 og flyttes til begynnelsen av lengderetningen.
* For barnedatasett som spenner over 180, men ikke dekker verden,ERDDAP™setter inn manglende verdier etter behov for å lage et datasett som dekker verden. For eksempel vil et barnedatasett med lengdeverdi på 140 til 200 bli et datasett med lengdeverdier på -180 til 180.
Barneverdiene på 180 til 200 vil bli -180 til -160.
Nye lengdeverdier vil bli satt inn fra -160 til 140. De tilsvarende dataverdiene vil være \\_FillValues.
Barneverdiene på 140 til 180 vil være uendret.
Innsettingen av manglende verdier kan virke merkelig, men det unngår flere problemer som skyldes å ha lengdegradsverdier som hopper plutselig (f.eks. fra -160 til 140) ..
* I[Generer DatasetsXml](#generatedatasetsxml)Det er en spesiell type datasettEDDGridLonPM180FraErddapCatalog, som lar deg genereredatasets.xmlforEDDGridLonPM180 datasett fra hver avEDDGridDatasett i etERDDAPsom har noen lengdeverdier høyere enn 180. Dette gjør det lettere å tilby to versjoner av disse datasettene:
den opprinnelige, med lengdegrader i området 0 til 360,
og det nye datasettet, med lengdeverdier i området -180 til 180.
    
Barnedatasettet i hverEDDGridLonPM180 datasett vil være etEDDGridFraErddap datasett som peker på det originale datasettet.
Det nye datasettetdatasetIDvil være navnet på den opprinnelige datasett pluss "\\_LonPM180".
For eksempel
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
Legg påEDDGridLonPM180 datasett **under** opprinnelige datasett idatasets.xml.. Det unngår noen mulige problemer.
    
Alternativt kan du erstatteEDDGridFraErddap barnedatasett med det opprinnelige datasettetdatasets.xml.. Deretter vil det bare være én versjon av datasettet: den med lengdegradsverdier i -180 til 180. Vi avviser dette fordi det er tider når hver versjon av datasettet er mer praktisk.
    
* Hvis du tilbyr to versjoner av et datasett, for eksempel en med lengdegrad 0 til 360 og en med lengdegrad -180 til 180:
    * Du kan bruke valgfrie [&lt;tilgjengelig ViaWMS&gt;false&lt;/tilgjengelig ViaWMS&gt;] (#Accessibleviawms) med 0-360 datasett for å tvangsaktivereWMSTjeneste for dette datasettet. Da vil kun LonPM180 versjonen av datasettet være tilgjengelig viaWMS..
    * Det er et par måter å holde LonPM180 datasett oppdatert med endringer i det underliggende datasettet:
        * Hvis barnets datasett er etEDDGridFraErddap datasett som refererer til et datasett i det sammeERDDAP™, vil LonPM180 datasettet prøve å direkte abonnere på det underliggende datasettet slik at det alltid er oppdatert. Direkte abonnementer genererer ikke e-post som ber deg om å validere abonnementet - validering bør gjøres automatisk.
        * Hvis barnets datasett ikke er etEDDGridFraErddap datasett som er på sammeERDDAP™, vil LonPM180 datasettet prøve å bruke det vanlige abonnementssystemet til å abonnere på det underliggende datasettet. Hvis du har abonnementssystemet i dinERDDAP™Slås på, du bør få e-post be deg å validere abonnementet. Gjør det.
        * Hvis du har abonnementssystemet i dinERDDAP™Slås av, kan LonPM180-datasettet noen ganger ha utdaterte metadata til LonPM180-datasettet er lastet på nytt. Så hvis abonnementssystemet er slått av, bør du angi [&lt;Last på nytt EveryNMinutes&gt;] (#reloadvarelser) innstilling av LonPM180 datasett til et mindre antall, slik at det er mer sannsynlig å fange endringer i barnedatasettet tidligere.

#### EDDGridLonPM180 skjelett XML{#eddgridlonpm180-skeleton-xml} 

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

### EDDGridDreier0360{#eddgridlon0360} 
[ **EDDGridDreier0360** ](#eddgridlon0360)modifiserer lengdegraden til et barn (lukket)  EDDGriddatasett som har noen lengdeverdier mindre enn 0 (For eksempel -180 til 180) Slik at de er i området 0 til 360 (Derfor navnet) ..

* Å arbeide i nærheten av en utsettelse forårsaker problemer, uansett om utsettelsen er på lengdegrad 0 eller på lengdegrad 180. Denne datasetttypen lar deg unngå disse problemene for alle, ved å tilby to versjoner av samme datasett:
én med lengdegradsverdier i området -180 til 180 ("Atlanticentric"?) ..
en med lengdeverdier i området 0 til 360 ("Pacificentric"?) ,
* For barnedatasett med alle lengdeverdier mindre enn 0, er alle de nye lengdegradsverdiene bare 360 grader høyere. For eksempel vil et datasett med lengdeverdier på -180 til -120 bli et datasett med lengdeverdier på 180 til 240.
* For barnedatasett som har lengdeverdier for hele verden (ca. 180 til 180) , den nye lengdegradsverdien vil bli omorganisert til å være (omtrent) 0 til 360:
De opprinnelige -180 til 0 verdier omdannes til 180 til 360 og flyttes til slutten av lengderetningen.
De originale 0 til nesten 180 verdiene er uendret.
* For barn datasett som spenner lon=0 men ikke dekker verden,ERDDAP™setter inn manglende verdier etter behov for å lage et datasett som dekker verden. For eksempel vil et barnedatasett med lengdeverdier på -40 til 20 bli et datasett med lengdeverdier på 0 til 360.
Barneverdiene på 0 til 20 vil være uendret.
Nye lengdeverdier vil bli satt inn fra 20 til 320. De tilsvarende dataverdiene vil være \\_FillValues.
Barneverdiene på -40 til 0 vil bli 320 til 360.
Innsettingen av manglende verdier kan virke merkelig, men det unngår flere problemer som skyldes å ha lengdegradsverdier som hopper plutselig (For eksempel fra 20 til 320) ..
* I[Generer DatasetsXml](#generatedatasetsxml)Det er en spesiell type datasettEDDGridTittenfick0360 ErddapCatalog, som lar deg genereredatasets.xmlforEDDGridLon0360 datasett fra hvert avEDDGridDatasett i etERDDAPsom har noen lengdeverdier høyere enn 180. Dette gjør det lettere å tilby to versjoner av disse datasettene:
den opprinnelige, med lengdegrader i området 0 til 360,
og det nye datasettet, med lengdeverdier i området -180 til 180.
    
Barnedatasettet i hverEDDGridLon0360 datasett vil være etEDDGridFraErddap datasett som peker på det originale datasettet.
Det nye datasettetdatasetIDvil være navnet på det originale datasettet pluss "\\_Lon0360".
For eksempel
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
Legg påEDDGridLon0360 datasett **under** opprinnelige datasett idatasets.xml.. Det unngår noen mulige problemer.
    
Alternativt kan du erstatteEDDGridFraErddap barnedatasett med det opprinnelige datasettetdatasets.xml.. Deretter vil det bare være én versjon av datasettet: den med lengdegradsverdier innen 0 til 360. Vi avviser dette fordi det er tider når hver versjon av datasettet er mer praktisk.
    
* Hvis du tilbyr to versjoner av et datasett, for eksempel en med lengdegrad 0 til 360 og en med lengdegrad -180 til 180:
    * Du kan bruke valgfrie [&lt;tilgjengelig ViaWMS&gt;false&lt;/tilgjengelig ViaWMS&gt;] (#Accessibleviawms) med 0 til 360 datasett å tvangsaktivereWMSTjeneste for dette datasettet. Deretter vil bare -180 til 180 versjonen av datasettet være tilgjengelig viaWMS..
    * Det er et par måter å holde Lon0360 datasettet oppdatert med endringer i det underliggende datasettet:
        * Hvis barnets datasett er etEDDGridFraErddap datasett som refererer til et datasett i det sammeERDDAP™, vil Lon0360 datasettet prøve å direkte abonnere på det underliggende datasettet slik at det alltid er oppdatert. Direkte abonnementer genererer ikke e-post som ber deg om å validere abonnementet - validering bør gjøres automatisk.
        * Hvis barnets datasett ikke er etEDDGridFraErddap datasett som er på sammeERDDAP™, vil Lon0360 datasettet prøve å bruke det vanlige abonnementssystemet til å abonnere på det underliggende datasettet. Hvis du har abonnementssystemet i dinERDDAP™Slås på, du bør få e-post be deg å validere abonnementet. Gjør det.
        * Hvis du har abonnementssystemet i dinERDDAP™Slås av, kan Lon0360 datasettet noen ganger ha utdaterte metadata til Lon0360 datasettet er lastet på nytt. Så hvis abonnementssystemet er slått av, bør du angi [&lt;Last på nytt EveryNMinutes&gt;] (#reloadvarelser) innstilling av Lon0360 datasettet til et mindre antall, slik at det er mer sannsynlig å fange endringer i barnedatasettet tidligere.
#### EDDGridLon0360 skjelett XML{#eddgridlon0360-skeleton-xml} 
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
[ **EDDGridSideBySide** ](#eddgridsidebyside)aggregerer to eller flereEDDGridDatasett (barna) Side ved side.

* Det resulterende datasettet har alle variabler fra alle barnedatasettene.
* Foreldredatasettet og alle barnedatasettene må ha forskjelligdatasetIDS. Hvis noen navn i en familie er nøyaktig det samme, vil datasettet ikke lastes inn (med feilmeldingen om at verdiene til den samlede aksen ikke er i sortert rekkefølge) ..
* Alle barn må ha de samme kildeverdiene foraxisVariables\\[1+\\]  (for eksempel breddegrad, lengdegrad) .. Nøyaktigheten i testen bestemmes av[matchAxisNDigits](#matchaxisndigits)..
* Barn kan ha forskjellige kildeverdier foraxisVariables\\[0\\]  (For eksempel tid) Men de er vanligvis de samme.
* Foreldredatasettet vil ha alleaxisVariables\\[0\\]Kildeverdier fra alle barna.
* For eksempel lar dette deg kombinere et kildedatasett med en vektors u-komponent og et annet kildedatasett med en vektors v-komponent, slik at de kombinerte dataene kan betjenes.
* Barn som er skapt av denne metoden holdes privat. De er ikke separat tilgjengelige datasett (For eksempel etter klientdataforespørsler eller[flaggfiler](/docs/server-admin/additional-information#flag)) ..
* De globale metadataene og innstillingene for forelderen kommer fra de globale metadataene og innstillingene for det første barnet.
* Hvis det er et unntak mens du oppretter det første barnet, vil foreldrene ikke bli opprettet.
* Hvis det er et unntak mens du oppretter andre barn, sender dette en e-post til e-post (som angitt i[config.xml](/docs/server-admin/deploy-install#setupxml)) Fortsett med de andre barna.
#### EDDGridSideBySide skjelett XML{#eddgridsidebyside-skeleton-xml} 
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

### EDDGridAggregate{#eddgridaggregateexistingdimension} 
[ **EDDGridAggregate** ](#eddgridaggregateexistingdimension)aggregerer to eller flereEDDGridDatasett som hver har et annet verdiområde for den første dimensjonen, men identiske verdier for de andre dimensjonene.

* For eksempel kan ett barn datasett ha 366 verdier (for 2004) for tidsdimensjonen og et annet barn kan ha 365 verdier (for 2005) for tidsdimensjonen.
* Alle verdier for alle de andre dimensjonene (for eksempel breddegrad, lengdegrad) Må være identisk med alle barna. Nøyaktigheten i testen bestemmes av[matchAxisNDigits](#matchaxisndigits)..
* Sorterte dimensjonsverdier - Verdiene for hver dimensjon må være i sortert rekkefølge (Stigende eller nedadgående) .. Verdiene kan være uregelmessig fordelt. Det kan ikke være noen bånd. Dette er et krav fra[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html).. Hvis dimensjonens verdier ikke er i sortert rekkefølge, vil datasettet ikke bli lastet inn ogERDDAP™vil identifisere den første usorterte verdien i loggfilen, *bigParentDirectory* /logs/log.txt .
    
Usorterte dimensjonsverdier indikerer nesten alltid et problem med kildedatasettet. Dette skjer oftest når en feilnavngitt eller upassende fil er inkludert i sammenslåingen, som fører til en usortert tidsdimensjon. Hvis du vil løse dette problemet, kan du se feilmeldingen iERDDAP™log.txt-fil for å finne den fornærmende tidsverdien. Så se i kildefilene for å finne den tilsvarende filen (eller før eller etter) Det tilhører ikke i sammenslåingen.
    
* Foreldredatasett og barnedatasett må ha forskjelligdatasetIDS. Hvis noen navn i en familie er nøyaktig det samme, vil datasettet ikke lastes inn (med feilmeldingen om at verdiene til den samlede aksen ikke er i sortert rekkefølge) ..
* For tiden må barnedatasettet være etEDDGridFraDap-datasett og må ha de laveste verdiene i den samlede dimensjonen (vanligvis de eldste tidsverdiene) .. Alle de andre barna må være nesten identiske datasett (Forskjellige i verdiene for første dimensjon) og er angitt av bare deressourceUrl..
* Det samlede datasettet får metadata fra det første barnet.
* Den[Opprett datasett Xml-programmet](#generatedatasetsxml)kan lage et grovt utkast avdatasets.xmlfor enEDDGridAggregateExistingDimension basert på et sett filer som betjenes av enHyraxeller TREDDS-server. Bruk for eksempel dette innspillet for programmet ("/1988" i URL gjør eksempelet raskere) :)
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
Du kan bruke resultatet&lt;sourceUrl&gt; tagger eller slette dem og uncomment&lt;sourceUrl&gt; tag (så nye filer blir lagt merke til hver gang datasettet lastes på nytt.
#### EDDGridAggregateExistingDimensjon skjelett XML{#eddgridaggregateexistingdimension-skeleton-xml} 
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

### EDDGridKopier{#eddgridcopy} 
[ **EDDGridKopier** ](#eddgridcopy)gjør og vedlikeholder en lokal kopi av en annenEDDGriddata og servere data fra den lokale kopien.

*   EDDGridKopier (for tabelldata,[EDDTableCopy](#eddtablecopy)) En veldig enkel å bruke og en veldig effektiv
     **løsning på noen av de største problemene med å betjene data fra en fjerndatakilde:** 
    * Å få tilgang til data fra en fjerndatakilde kan være langsom.
        * Den kan være langsom fordi den iboende er langsom (For eksempel en ineffektiv type server) ,
        * Fordi det er overveldet av for mange forespørsler,
        * eller fordi serveren eller den eksterne serveren er begrenset båndbredde.
    * Fjerndatasettet er noen ganger utilgjengelig (av en rekke grunner) ..
    * Relying på én kilde for data skalerer ikke bra (For eksempel når mange brukere og mangeERDDAPbruk det) ..
         
* Hvordan det fungerer -EDDGridKopier løser disse problemene ved å automatisk lage og vedlikeholde en lokal kopi av dataene og betjene data fra den lokale kopien.ERDDAP™kan tjene data fra den lokale kopien svært raskt. Og å lage en lokal kopi lindrer byrden på den eksterne serveren. Og den lokale kopien er en sikkerhetskopi av originalen, som er nyttig i tilfelle noe skjer med originalen.
    
Det er ikke noe nytt om å lage en lokal kopi av et datasett. Det nye er at denne klassen gjør det\\*lett\\*å skape og\\*Vedlikehold\\*en lokal kopi av data fra en\\*Varietet\\*av typer eksterne datakilder og\\*Legg til metadata\\*mens du kopierer dataene.
    
* Chunks of Data -EDDGridKopier gjør den lokale kopien av dataene ved å be om biter av data fra fjernkontrollen&lt;Datasett &gt; . Det vil være en bit for hver verdi av venstre (først) aksen variabel.EDDGridKopiering er ikke avhengig av fjerndatasettets indekstall for aksen -- de kan endre seg.
    
ADVARSEL: Hvis størrelsen på en del data er så stor (&gt; 2GB) det forårsaker problemer,EDDGridKopier kan ikke brukes. (Vi håper å ha en løsning på dette problemet i fremtiden.) 
    
*   \\[Et alternativ tilEDDGridKopier -
Hvis fjerndataene er tilgjengelige via nedlastbare filer, ikke en webtjeneste, bruk[cache FraUrl alternativ tilEDDGridFraFiles](#cachefromurl), som gjør en lokal kopi av de eksterne filene og betjener data fra de lokale filene.\\]
* Lokale filer -- Hvert stykke data lagres i en separatNetCDFfil i en underkatalog av *bigParentDirectory* /kopi/ *datasetID* / (som angitt i[config.xml](/docs/server-admin/deploy-install#setupxml)) .. Filnavn opprettet fra akseverdier endres for å gjøre dem filnavn-sikre (for eksempel er bindestrek erstattet med  "x2D") Dette påvirker ikke de faktiske dataene.
     
* Nye data -- Hver gangEDDGridKopiering er lastet på nytt, den kontrollerer fjernkontrollen&lt;datasett&gt; for å se hvilke biter som er tilgjengelige. Hvis filen for en bit data ikke allerede eksisterer, legges en forespørsel om å få biten i en kø.ERDDAPOppgavenThread behandler alle kølige forespørsler om deler av data, én for én. Du kan se statistikk for oppgavenThreads aktivitet på[Statusside](/docs/server-admin/additional-information#status-page)og i[Daglig rapport](/docs/server-admin/additional-information#daily-report).. (Ja,ERDDAP™kunne tilordne flere oppgaver til denne prosessen, men det ville bruke opp mye av den eksterne datakildens båndbredde, minne og CPU-tid, og mye av den lokaleERDDAPbåndbredde, minne og CPU-tid, ingen av dem er en god ide.) 
    
MERK: Første gang enEDDGridKopiering er lastet, (Hvis alt går bra) Mye forespørsler om biter av data vil bli lagt til i oppgavenThreads kø, men ingen lokale datafiler vil ha blitt opprettet. Så konstruktøren vil mislykkes, men oppgaveThread vil fortsette å fungere og opprette lokale filer. Hvis alt går bra, vil oppgavenThread gjøre noen lokale datafiler og neste forsøk på å laste datasettet på nytt (på ~15 minutter) vil lykkes, men i utgangspunktet med en meget begrenset mengde data.
    
MERK: Etter det lokale datasettet har noen data og vises i dinERDDAPHvis fjerndatasettet er midlertidig eller permanent ikke tilgjengelig, vil det lokale datasettet fortsatt fungere.
    
ADVARSEL: Hvis fjerndatasettet er stort og/eller fjernserveren er langsom (Det er problemet, ikke sant?&#33;) Det vil ta lang tid å lage en fullstendig lokal kopi. I noen tilfeller vil den nødvendige tiden være uakseptabel. For eksempel sender 1 TB data over en T1-linje (0.15 GB/s) tar minst 60 dager under optimale forhold. I tillegg bruker den mye båndbredde, minne og CPU-tid på de eksterne og lokale datamaskinene. Løsningen er å sende en harddisk til administratoren av fjerndatasettet slik at s/han kan gjøre en kopi av datasettet og sende harddisken tilbake til deg. Bruk dataene som utgangspunkt ogEDDGridKopier vil legge til data i det. (Det er en slik[Amazons EC2 Cloud Service](https://aws.amazon.com/importexport/)håndtere problemet, selv om systemet har mye båndbredde.) 
    
ADVARSEL: Hvis en gitt verdi til venstre (først) aksevariabelen forsvinner fra fjerndatasettet,EDDGridKopiering sletter ikke den lokale kopierte filen. Hvis du vil, kan du slette det selv.
    
#### Grid Kopier sjekkKjelde Data{#grid-copy-checksourcedata} 
Dendatasets.xmlfor dette datasettet kan ha en valgfri tag
```
    <checkSourceData>true</checkSourceData>  
```
Standardverdien er sann. Hvis/når du setter den til falskt, vil datasettet aldri sjekke kildedatasettet for å se om det er ekstra data tilgjengelig.

#### Bare siden{#onlysince} 
Du kan fortelleEDDGridKopier for å lage en kopi av en undergruppe av kildedatasettet, i stedet for hele kildedatasettet, ved å legge til en tag i skjemaet&lt;Bare siden *Noen Verdi* &lt;/kun siden&gt; til datasettetsdatasets.xmlEn bit.EDDGridKopiering vil bare laste ned dataverdier relatert til verdiene i den første dimensjonen (Vanligvis tidsdimensjonen) som er større enn *Noen Verdi* .. *Noen Verdi* kan være:
    * En relativ tid spesifisert vianow- *n Enheter* ..
For eksempel&lt;Bare sidennow-2 år&lt;/kunSiden&gt; forteller datasettet å bare gjøre lokale kopier av dataene for data der den ytre dimensjonens verdier (vanligvis tidsverdier) De siste 2 årene (som revurderes hver gang datasettet lastes på nytt, noe som er når det ser etter nye data å kopiere) .. Se[now- *n Enheter* Syntaksbeskrivelse](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).. Dette er nyttig hvis den første dimensjonen har tidsdata, som det vanligvis gjør.
        
        EDDGridKopier sletter ikke lokale datafiler som har data som over tid blir eldre ennnow- *n Enheter* .. Du kan slette disse filene når som helst hvis du velger å. Hvis du gjør det, anbefaler vi sterkt at du setter en[flagg](/docs/server-admin/additional-information#flag)etter at du sletter filene for å fortelleEDDGridKopier for å oppdatere listen over cachede filer.
        
    * Et fast punkt i tiden angitt som en ISO 8601-strengyyyy-MM-ddTHH:mm:ssZ..
For eksempel&lt;kunSiden&gt;2000-01-01T00:00:00Z&lt;/kunSiden&gt; forteller datasettet bare å lage lokale kopier av data der den første dimensjonens verdi er -&gt; = 2000-01-01T00:00:00Z . Dette er nyttig hvis den første dimensjonen har tidsdata, som det vanligvis gjør.
         
    * Et flytende punktnummer.
For eksempel&lt;bare siden&gt;946684800.0&lt;Bare siden. Enhetene vil være destinasjonsenhetene i første dimensjon. For eksempel for tidsdimensjoner, enhetene iERDDAP™er alltid"seconds since 1970-01-01T00:00:00Z".. Så 946684800.0"seconds since 1970-01-01T00:00:00Z"er tilsvarende 2000-01-01T00:00:00Z. Dette er alltid et nyttig alternativ, men er spesielt nyttig når den første dimensjonen ikke har tidsdata.

#### EDDGridKopier Anbefalt bruk{#eddgridcopy-recomended-use} 
1. Opprette&lt;Datasett&gt; oppføring (den opprinnelige typen, ikkeEDDGridKopier) for fjerndatakilden.
     **Få det til å fungere riktig, inkludert alle de ønskede metadataene.** 
2. Hvis det er for sakte, legg til XML-kode for å pakke den i enEDDGridKopier datasett.
    * Bruk en annendatasetID  (Kanskje ved å endredatasetIDav den gamledatasetIDlitt) ..
    * Kopier&lt;tilgjengelig Til&gt;,&lt;reloadEveryNMinutes&gt; og&lt;onChange&gt; fra fjernkontrollenEDDGridXML tilEDDGridKopi er XML. (Deres verdier forEDDGridKopier materie; deres verdier for det indre datasettet blir irrelevant.) 
3.  ERDDAP™vil gjøre og vedlikeholde en lokal kopi av dataene.
         
* ADVARSEL:EDDGridKopier antar at dataverdiene for hver bit aldri endres. Hvis/når de gjør det, må du manuelt slette buntfilene i *bigParentDirectory* /kopi/ *datasetID* som endret seg og[flagg](/docs/server-admin/additional-information#flag)datasettet som skal lastes på nytt, slik at slettede deler vil bli erstattet. Hvis du har et e-postabonnement på datasettet, får du to e-poster: en når datasettet først lastes opp og begynner å kopiere dataene, og en annen når datasettet lastes inn igjen (automatisk) og oppdager de nye lokale datafilene.
     
* Alle akseverdier må være like.
For hver av øksene unntatt venstre (først) Alle verdiene må være like for alle barn. Nøyaktigheten i testen bestemmes av[matchAxisNDigits](#matchaxisndigits)..
     
* Innstillinger, metadata, variabler --EDDGridKopier bruker innstillinger, metadata og variabler fra det innesluttede kildedatasettet.
     
* Endre metadata -- Hvis du trenger å endre noenaddAttributeseller endre rekkefølgen på variabler knyttet til kildedatasettet:
    1. EndreaddAttributesFor kildedatasettet idatasets.xmletter behov.
    2. Slett en av kopierte filer.
    3. Sett a[flagg](/docs/server-admin/additional-information#flag)Last datasettet på nytt umiddelbart. Hvis du bruker et flagg, og du har et e-postabonnement til datasettet, får du to e-postmeldinger: én når datasettet starter på nytt og begynner å kopiere dataene, og en annen når datasettet lastes inn igjen (automatisk) og oppdager de nye lokale datafilene.
    4. Den slettede filen vil bli regenerert med de nye metadataene. Hvis kildedatasettet er utilgjengelig,EDDGridKopiere datasett vil få metadata fra den regenererte filen, siden det er den yngste filen.
#### EDDGridKopier skjelett XML{#eddgridcopy-skeleton-xml} 
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

### EDDTableFraCassandra{#eddtablefromcassandra} 
[ **EDDTableFraCassandra** ](#eddtablefromcassandra)håndtere data fra én[Cassandra](https://cassandra.apache.org/)Bord. Cassandra er en NoSQL-database.

*   ERDDAP™kan fungere med Cassandra v2 og v3 uten endringer eller forskjeller i installasjon. Vi har testet med[Cassandra v2 og v3 fra Apache](https://cassandra.apache.org/download/).. Det er sannsynlig atERDDAP™kan også jobbe med Cassandra lastet ned fra DataStax.
     
* For aug 2019 - mai 2021 hadde vi problemer med å få Cassandra til å jobbe med AdoptOpenJdkJavav8. Det kastet en EXCEPTION\\_ACCESS\\_VIOLATION). Men nå (Mai 2021) , det problemet er borte: vi kan med hell bruke Cassandra v2.1.22 og AdoptOpenJdk jdk8u292-b10.
     
#### Ett bord{#one-table} 
Cassandra støtter ikke " joins" i den måten relasjonelle databaser gjør. EnERDDAP™EDDTableFra Cassandra datasett kart til en (Kanskje en undergruppe av en) Cassandra-bordet.

#### Cassandradatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™Kommer med CassandraJavadriveren, så du trenger ikke å installere den separat.
* Les nøye all informasjon om EDDTableFromCassandra. Noen av detaljene er svært viktige.
* CassandraJavadriver er ment å jobbe med Apache Cassandra (1.2+) DataStax Enterprise (3.1+) .. Hvis du bruker Apache Cassandra 1.2.x, må du redigere cassandra.yaml-filen for hver node å sette start\\_native\\_transport: sant, deretter starte hver node.
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Du kan så redigere det for å finjustere det (spesielt [&lt;partisjon NøkkelkildeNames&gt;] (#partitionkeysourcenames) ). Du kan samle det meste av informasjonen du trenger for å opprette XML for et EDDTableFromCassandra-datasett ved å kontakte Cassandra-administratoren og ved å søke på nettet.
    
Opprett datasett Xml har to spesielle alternativer for EDDTableFra Cassandra:
    
    1. Hvis du kommer inn -&#33;&#33;&#33;&#33; (Uten sitater) for nøkkelrommet vil programmet vise en liste over nøkkelrom
    2. Hvis du skriver inn et bestemt nøkkelrom og så skriv inn -&#33;&#33;&#33;LIST&#33;&#33; - (Uten sitater) for tabellnavnet, vil programmet vise en liste over tabeller i det nøkkelrommet og kolonnene.
##### Case sensitivitet{#case-sensitivity} 
* Case-ufølsom Keyspace og tabellnavn -
Cassandra behandler nøkkelrom og tabellnavn på en ufølsom måte. Derfor må du aldri bruke et reservert ord (Men med et annet tilfelle) Som et Cassandra keyspace eller tabellnavn.
* Case-ufølsomme kolonnenavn --
Som standard behandler Cassandra kolonnenavn på en case-ufølsom måte. Hvis du bruker en av Cassandras reserverte ord som et kolonnenavn (Ikke gjør det&#33;) Du må bruke
```
        <columnNameQuotes>"<columnNameQuotes>  
```
idatasets.xmlfor dette datasettet slik at Cassandra ogERDDAP™vil behandle kolonnenavnene på en saksfølsom måte. Dette vil sannsynligvis være en massiv hodepine for deg, fordi det er vanskelig å bestemme de saksfølsomme versjonene av kolonnenavnene - Cassandra nesten alltid viser kolonnenavn som alle små bokstaver, uansett det sanne tilfellet.
* Arbeid tett med Cassandra-administratoren, som kan ha relevant erfaring. Hvis datasettet ikke lastes, leses[feilmelding](#troubleshooting-tips)nøye for å finne ut hvorfor.
         
#### Cassandra&lt;tilkobling Eiendom &gt;{#cassandra-connectionproperty} 
Cassandra har tilkoblingsegenskaper som kan spesifiseres idatasets.xml.. Mange av disse vil påvirke ytelsen til Cassandra-ERDDAP™Tilkobling. Dessverre må Cassandra eiendommer være satt programmert iJava, såERDDAP™Må ha kode for hver eiendomERDDAP™støtte. I dag,ERDDAP™støtter disse egenskapene:
 (Standard er det vi ser. Systemets standard kan være annerledes.) 

*    **Generelle alternativer**   
    &lt;tilkobling Eiendomsnavn=" **kompresjon** "&gt; *ingen|LZ4|snappy* &lt;/tilkobling Eiendom &gt; (ufølsom, standard=ingen)   
     (Generelle kompresjonsråd: bruk \"ingen\" hvis forbindelsen mellom Cassandra ogERDDAP™er lokal/rask og bruk \"LZ4\" hvis tilkoblingen er fjern/slow.)   
    &lt;tilkobling Eiendomsnavn=" **identifikasjoner** "&gt; *brukernavn/passord* &lt;/tilkobling Eiendom &gt; (Det er bokstavelig'/')   
    &lt;tilkobling Eiendomsnavn=" **Metriske** "&gt; *sant|falsk* &lt;/tilkobling Eiendom &gt; (2021-01-25 var standard=sann, nå ignorert og alltid falsk)   
    &lt;tilkobling Eiendomsnavn=" **port** "&gt; *et heltal* &lt;/tilkobling Eiendom &gt; (standard for innfødt binærprotokoll=9042)   
    &lt;tilkobling Eiendomsnavn=" **ssl** "&gt; *sant|falsk* &lt;/tilkobling Eiendom &gt; (standard=feil)   
     (Mitt raske forsøk på å bruke ssl mislykkes. Hvis du lykkes, vennligst fortell meg hvordan du gjorde det.) 
*    **Spørringsalternativer**   
    &lt;tilkobling Eiendomsnavn=" **Konsistens Nivå** "&gt; *alle|hvilken som helst|hver__quorum|lokal\\_one|lokal\\_quorum|lokal\\_serial|én|quorum|serie|3|2* &lt;/tilkobling Eiendom &gt; (ufølsom, standard=ONE)   
    &lt;tilkobling Eiendomsnavn=" **Hent størrelse** "&gt; *et heltal* &lt;/tilkobling Eiendom &gt; (standard=5000)   
     (Ikke sett innhenting Størrelse til en mindre verdi.)   
    &lt;tilkobling Eiendomsnavn=" **seriekonsistensnivå** "&gt; *alle|hvilken som helst|hver__quorum|lokal\\_one|lokal\\_quorum|lokal\\_serial|én|quorum|serie|3|2* &lt;/tilkobling Eiendom &gt; (case-insensitive, standard=SERIAL) 
*    **Socketalternativer**   
    &lt;tilkobling Eiendomsnavn=" **connectTimeoutMillis** "&gt; *et heltal* &lt;/tilkobling Eiendom &gt; (standard=5000)   
     (Ikke sett tilkobling TidsavbruddMillis til en mindre verdi.)   
    &lt;tilkobling Eiendomsnavn=" **keepAlive** "&gt; *sant|falsk* &lt;/tilkobling Eiendom &gt;
    &lt;tilkobling Eiendomsnavn=" **LesTimeoutMillis** "&gt; *et heltal* &lt;/tilkobling Eiendom &gt;
     (Cassandras standard readTimeoutMillis er 12000, menERDDAP™endrer standard til 120000. Hvis Cassandra kaster readTimeouts, øker dette kanskje ikke, fordi Cassandra noen ganger kaster dem før denne gangen. Problemet er mer sannsynlig at du lagrer for mye data per partisjon Nøkkelkombinasjon.)   
    &lt;tilkobling Eiendomsnavn=" **mottagerBufferSize** "&gt; *et heltal* &lt;/tilkobling Eiendom &gt;
     (Det er uklart hva standarden fårBufferSize er. Ikke sett dette til en liten verdi.)   
    &lt;tilkobling Eiendomsnavn=" **soLinger** "&gt; *et heltal* &lt;/tilkobling Eiendom &gt;
    &lt;tilkobling Eiendomsnavn=" **tcpNoDelay** "&gt; *sant|falsk* &lt;/tilkobling Eiendom &gt; (standard=null) 

Hvis du trenger å være i stand til å angi andre tilkoblingsegenskaper, se vår[Seksjon om å få ekstra støtte](/docs/intro#support)..

For en gitt oppstart av Tomcat, brukes tilkoblingsegenskaper bare første gang et datasett opprettes for en gitt Cassandra URL. Alle reloader av det datasettet og alle påfølgende datasett som deler samme URL vil bruke de opprinnelige tilkoblingsegenskaper.
    
#### CQL{#cql} 
Cassandra spørringsspråk (CQL) er overfladisk som SQL, spørringsspråket som brukes av tradisjonelle databaser. FordiOPeNDAPForespørsler om tabelldata ble utformet til å etterlikne SQL-tabellens dataforespørsler, det er mulig forERDDAP™å konvertere tabellbaserte dataforespørsler til CQL Bound/PreparatedStatements.ERDDAP™Logger på uttalelsen i[log.txt](/docs/server-admin/additional-information#log)som
Uttalelse som tekst: *StatementAsText*   
Versjonen av uttalelsen du ser vil være en tekstrepresentasjon av uttalelsen og vil bare ha - der begrensede verdier vil bli plassert.
       
Ikke så enkelt - Dessverre har CQL mange restriksjoner på hvilke kolonner som kan spørres med hvilke typer begrensninger, for eksempel partisjonsnøkkelkolonner kan begrenses med = og IN, såERDDAP™Sender noen restriksjoner til Cassandra og gjelder alle begrensninger etter at dataene er mottatt fra Cassandra. For å hjelpeERDDAP™håndtere effektivt med Cassandra, må du spesifisere [&lt;partisjon NøkkelkildeNames&gt;] (#partitionkeysourcenames) , [&lt;clusterColumnSourceNames&gt;] (#clustercolumnsourcenames) , og [&lt;indeksColumnSourceNames&gt;] (#indexcolumnsourcenames) idatasets.xmlFor dette datasettet. Dette er de viktigste måtene å hjelpe påERDDAP™Arbeid effektivt med Cassandra. Hvis du ikke forteller detERDDAP™denne informasjonen vil datasettet bli smertefullt sakte iERDDAP™Bruk massevis av Cassandra-ressurser.
     
#### &lt;partisjon NøkkelkildeNames&gt;{#partitionkeysourcenames} 
Fordi partisjonstastene spiller en sentral rolle i Cassandra-tabeller,ERDDAP™trenger å vite deressourceNameS og, hvis det er relevant, annen informasjon om hvordan du jobber med dem.
* Du må angi en kommaseparert liste over kolonnenavn for partisjonsnøkkel idatasets.xmlvia&lt;partisjon Nøkkelkildenavn&gt;.
Enkelt eksempel,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Mer komplekst eksempel,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp partisjonsnøkler -- Hvis en av partisjonsnøkkelkolonnen er en tidsstempelkolonne som har en grovere versjon av en annen tidsstempelkolonne, angir du dette via
     *partitionKeySourcName/otherColumnSourceName/time\\_precision*   
hvortime\\_precisioner en av[time\\_precision](#time_precision)strenger som brukes andre steder iERDDAP..
Den etterfølgende Z itime\\_precisionstreng er standard, så det spiller ingen rolle omtime\\_precisionEnder i Z eller ikke.
For eksempelERDDAP™vil tolke dato/prøvetid/1970-01-01 som "Begrenselser for dato kan bygges fra begrensninger på prøvetid ved bruk av dettetime\\_precision." Den faktiske konverteringen av begrensninger er mer komplisert, men det er oversikten.
     **Bruk dette når det er relevant.** Det muliggjørERDDAP™å jobbe effektivt med Cassandra. Hvis dette forholdet mellom kolonner eksisterer i en Cassandra-tabell, og du ikke fortellerERDDAP™Datasettet vil være smertefullt sakte iERDDAP™Bruk massevis av Cassandra-ressurser.
* Single Verdipartisjonsnøkler -- Hvis du vil ha enERDDAP™datasett som skal fungere med bare én verdi av én partisjonsnøkkel, angi *partitionKeySourceName=verdi* ..
Ikke bruk sitater for en numerisk kolonne, for eksempel ennid=1007
Bruk sitater for en strengkolonne, for eksempel stasjonid="Point Pinos"
* Datasett Standard sorteringsorden -- Ordenen på partisjonsnøkkelen&lt;dataVariable&gt; er idatasets.xmlbestemme standard rekkefølgen av resultatene fra Cassandra. Selvfølgelig kan brukere be om en annen rekkefølge for et gitt sett med resultater ved å legge til &orderBy (" *kommaseparert liste over variabler* ") til slutten av forespørselen.
* Som standard Cassandra ogERDDAP™behandle kolonnenavn på en ufølsom måte. Men hvis du setter[kolonneName](#case-sensitivity)til "ERDDAP™vil behandle Cassandra kolonnenavn a i tilfelle sensitive måte.
         
#### &lt;partisjon KeyCSV&gt;{#partitionkeycsv} 
Hvis dette er angitt,ERDDAP™vil bruke det i stedet for å spørre Cassandra om partisjonen Nøkkelinformasjon hver gang datasettet lastes på nytt. Dette gir listen over separate partisjonsnøkkelverdier i den rekkefølgen de vil bli brukt. Tidene må angis som sekunder siden 1970-01-01T00:00:00Z. Men det er også to spesielle alternative måter å spesifisere tider på (hver kodet som en streng) :)

1) tid (aISO8601 Tid)   (Kan kodes som en streng)   
2) "tider (anISO8601 StartTime, strideSeconds, stopTime) " (Må kodes som en streng)   
stopp Tiden kan være en ISO8601 Tid eller a-now-nUnites" tid (f.eks.now-3 minutter") ..
stopp Tiden trenger ikke å være en nøyaktig startkamp Tid + x trinnsekunder.
En rad med en gang () verdien blir utvidet i flere rader før hver spørring, så listen over partisjon Nøkkelene kan alltid være helt oppdaterte.
For eksempel
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
utvides i denne tabellen med partisjonsnøkkelkombinasjoner:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames&gt;{#clustercolumnsourcenames} 
Cassandra aksepterer SQL-lignende restriksjoner på klyngekolonner, som er kolonnene som danner den andre delen av den primære nøkkelen (etter partisjonsnøkkelen (s) ) .. Så det er viktig at du identifiserer disse kolonnene via&lt;clusterColumnSourceNames&gt;. Dette gjør det muligERDDAP™å jobbe effektivt med Cassandra. Hvis det er klyngekolonner og du ikke fortellerERDDAPDatasettet vil være smertefullt sakte iERDDAP™Bruk massevis av Cassandra-ressurser.
    * For eksempel&lt;clusterColumnSourceNames&gt; *myClusterColumn1, myClusterColumn2* &lt;/clusterColumnSourceNames&gt;
    * Hvis en Cassandra-tabell ikke har noen klyngekolonner, må du heller ikke angi&lt;clusterColumnSourceNames&gt;, eller angi den uten verdi.
    * Som standard Cassandra ogERDDAP™behandle kolonnenavn på en ufølsom måte. Men hvis du setter[kolonneName](#case-sensitivity)til "ERDDAP™vil behandle Cassandra kolonnenavn på en saksfølsom måte.
         
#### &lt;indeksColumnSourceNames&gt;{#indexcolumnsourcenames} 
Cassandra godtar'='restriksjoner på sekundærindekskolonner, som er kolonnene du eksplisitt har opprettet indekser for via
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Ja, parentesen er nødvendig.)   
Så det er veldig nyttig hvis du identifiserer disse søylene via&lt;indexColumnSourceNames&gt;. Dette gjør det muligERDDAP™å jobbe effektivt med Cassandra. Hvis det er indekskolonner og du ikke fortellerERDDAPNoen spørsmål vil være nødvendig, smertefullt sakte iERDDAP™Bruk massevis av Cassandra-ressurser.
* For eksempel&lt;IndeksColumnSourceNames&gt; *myIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNames&gt;
* Hvis en Cassandra-tabell ikke har noen indekskolonner, må du heller ikke angi&lt;indeksColumnSourceNames&gt;, eller angi det uten verdi.
* ADVARSEL: Cassandra indekser er ikke som databaseindekser. Cassandra indekser hjelper kun med'='Begrensninger. Og de er bare[Anbefalt](https://cassandra.apache.org/doc/latest/cql/indexes.html)For kolonner som har langt færre forskjellige verdier enn totale verdier.
* Som standard Cassandra ogERDDAP™behandle kolonnenavn på en ufølsom måte. Men hvis du setter[kolonneName](#case-sensitivity)til "ERDDAP™vil behandle Cassandra kolonnenavn på en saksfølsom måte.
         
#### &lt;maxRequestFraction&gt;{#maxrequestfraction} 
NårERDDAP™  (re) laster et datasett,ERDDAP™kommer fra Cassandra listen over forskjellige kombinasjoner av partisjonsnøkler. For et stort datasett vil antall kombinasjoner være enormt. Hvis du vil hindre brukere i å be om det meste eller alle datasettet (En forespørsel som spørERDDAP™å laste ned de fleste eller alle dataene for å filtrere dem videre.) Du kan fortelleERDDAP™Bare for å tillate forespørsler som reduserer antall kombinasjoner med noe beløp via&lt;maxRequestFraction&gt;, som er et flytende punkt nummer mellom 1e-10 (Det betyr at forespørselen ikke kan trenge mer enn én kombinasjon i en milliard.) og 1 (standarden, noe som betyr at forespørselen kan være for hele datasettet) ..
For eksempel, hvis et datasett har 10000 forskjellige kombinasjoner av partisjonstastene og maxRequestFraction er satt til 0,1,
så forespørsler som trenger data fra 1001 eller flere kombinasjoner vil generere en feilmelding,
Men forespørsler som trenger data fra 1000 eller færre kombinasjoner vil være tillatt.
    
Generelt, jo større datasett, jo lavere bør du sette&lt;maxRequestFraction&gt;. Så du kan sette det til 1 for et lite datasett, 0,1 for et mellomstort datasett, 0,01 for et stort datasett og 0,0001 for et stort datasett.
    
Denne tilnærmingen er langt fra perfekt. Det vil føre til noen rimelige forespørsler blir avvist og noen for store forespørsler er tillatt. Men det er et vanskelig problem, og denne løsningen er mye bedre enn ingenting.
    
#### CassandrasubsetVariables {#cassandra-subsetvariables} 
Som med andre EDDTable datasett kan du angi en kommadelt liste av&lt;dataVariable&gt;destinationNamei en global egenskap kalt "[subsetVariables](#subsetvariables)to å identifisere variabler som har et begrenset antall verdier. Datasettet vil deretter ha en .subset-webside og vise lister over forskjellige verdier for disse variabler i nedtrekkslister på mange nettsider.
    
Inkludert bare partisjonsnøkkelvariabler og statiske kolonner i listen er STRONGLY ENCOUraged. Cassandra vil være i stand til å generere listen over forskjellige kombinasjoner svært raskt og enkelt hver gang datasettet lastes på nytt. Ett unntak er tidsstempelpartisjonsnøkler som er grove versjoner av noen andre tidsstempelkolonne - det er sannsynligvis best å forlate disse fra listen avsubsetVariablesSiden det er et stort antall verdier og de er ikke spesielt nyttige for brukerne.
    
Hvis du inkluderer ikke-partisjonsnøkkel, ikke-statiske variabler i listen, vil det sannsynligvis være **meget** beregningskost for Cassandra hver gang datasettet lastes på nytt, fordiERDDAP™må se gjennom hver rad i datasettet for å generere informasjonen. Faktisk vil forespørselen sannsynligvis mislykkes. Så, bortsett fra svært små datasett er dette STRONGLY DISCOURAGED.
    
#### Cassandra DataTyper{#cassandra-datatypes} 
Fordi det er noe tvetydig om hvem[Cassandra-datatyper](https://cassandra.apache.org/doc/latest/cql/types.html)Kart somERDDAP™Datatyper, må du angi en [&lt;dataType&gt;] (#datatype) Tagg for hver [&lt;dataVariable&gt;] (#datavariable) å fortelleERDDAP™hvilken datatype som skal brukes. StandardenERDDAP™Data Typer (og de vanligste tilsvarende Cassandra-datatypene) er:
    
*   [boolsk](#boolean-data)  (boolsk) somERDDAP™Deretter lagres som byte
* Byte (int, hvis området er -128 til 127) 
* kort (int, hvis området er -32768 til 32767) 
* Interessert (int, teller?, varint?, hvis området er -2147483648 til 2147483647) 
* lang (bigint, teller?, varint?, hvis området er -9223372036854775808 til 9223372036854775807) 
* flyte (flyte) 
* dobbel (dobbel, desimal (med mulig tap av presisjon) , tidsstempel) 
* tegn (Axis eller tekst, hvis de aldri har mer enn 1 tegn) 
* Streng (Animation, tekst, varchar, inet, uuid, timeuuid, blob, kart, sett, liste?) 

Cassandras[tidsstempel](#cassandra-timestamp-data)Et spesielt tilfelle: brukERDDAPdobbeltdata Type.

Hvis du angir en strengdatatype iERDDAP™for et Cassandra-kart, sett eller liste, kartet, sett eller liste på hver Cassandra-rad vil bli konvertert til en enkelt streng på én rad i denERDDAP™Bord.ERDDAP™har et alternativt system for lister; se nedenfor.

 *type* Lister --ERDDAP«[&lt;dataType&gt;] (#datatype) Merke til CassandradataVariablekan inkludere det vanligeERDDAP™Data Typer (Se ovenfor) pluss flere spesielle datatyper som kan brukes til Cassandra listekolonner: boolelisten, bytelisten, ubytelisten, shortList, ushortList, intList, uintList, longList, ulongList, floatList, dobbelList, charList, StringList. Når en av disse listekolonnene er i resultatene som blir sendt tilERDDAP™Hver rad av kildedata vil bli utvidet til å liste. størrelse () rader av data iERDDAP; enkle data Typer (f.eks.) i den kildedataraden vil bli duplisert liste. størrelse () Tider. Hvis resultatene inneholder mer enn én listevariabel, må alle lister på en gitt rekke data ha samme størrelse og må være -parallel - lister, ellerERDDAP™vil generere en feilmelding. For eksempel for strømmålinger fra en ADCP,
dybde\\[0\\], uCurrent\\[0\\], vCurrent\\[0\\]og zCurrent\\[0\\]alle er relaterte, og
dybde\\[1\\], uCurrent\\[1\\], vCurrent\\[1\\]og zCurrent\\[1\\]Alle er relaterte,
Alternativt, hvis du ikke vilERDDAP™å utvide en liste til flere rader iERDDAP™tabell, angi streng somdataVariabledata Skriv så hele listen vil bli representert som én streng på en rad iERDDAP..
    
#### Cassandra TimeStamp Data{#cassandra-timestamp-data} 
Cassandras tidsstempeldata er alltid klar over tidssoner. Hvis du angir tidsstempledata uten å angi en tidssone, antar Cassandra at tidsstemplet bruker den lokale tidssonen.
    
ERDDAP™støtter tidsstempeldata og presenterer alltid data iZulu/GMT tidssone. Så hvis du skriver inn tidsstempeldata i Cassandra ved hjelp av en annen tidssone ennZulu/GMT, husk at du må gjøre alle spørsmål for tidsstempeldata iERDDAP™å brukeZulu/GMT tidssone. Så ikke bli overrasket når tidsstempelverdiene som kommer ut avERDDAPskiftes av flere timer på grunn av tidssonen bytte fra lokal til lokalZulu/GMT tid.

* IERDDAP'sdatasets.xmli&lt;dataVariable&gt; tag for en tidsstempelvariabel, sett
```
          <dataType>double</dataType>  
```
og i&lt;addAttributes&gt; sett
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Forslag: Hvis dataene er et tidsområde, er det nyttig å ha tidsstempelverdiene refererer til sentrum av det underforståtte tidsintervallet (For eksempel middag) .. For eksempel, hvis en bruker har data for 2010-03-26T13:00Z fra et annet datasett og de vil ha de nærmeste data fra dette Cassandra datasettet som har data for hver dag, deretter data for 2010-03-26T12:00Z (Representere Cassandra-data for den datoen) Det er selvfølgelig det beste (I motsetning til midnatt før eller etter, hvor det er mindre åpenbart som er best) ..
*   ERDDAP™har et verktøy til[Konverter et tall Tid til/fra en strengtid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)..
* Se[HvordanERDDAP™Avtaler med tiden](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)..
         
#### Heltal nuller{#integer-nulls} 
Cassandra støtter nuller i Cassandra (ERDDAP™Interessert) og bigint (ERDDAP™lang) kolonner, menERDDAP™Støtter ikke ekte nuller for noen heltallsdatatype.
Som standard vil Cassandra heltal nuller bli konvertert iERDDAP™til 2147483647 for intense kolonner, eller 9223372036854775807 for lange kolonner. Disse vises som "NaN" i noen typer tekstutgangsfiler (For eksempel .csv) , i andre typer tekstutgangsfiler (For eksempel.htmlTable) , og det spesifikke tallet (2147483647 for manglende intense verdier) i andre typer filer (for eksempel binære filer som.ncog matte) .. En bruker kan søke etter rader av data med denne typen manglende verdi ved å referere til "Nan", f.eks. "&windSpeed=Nan".
    
Hvis du bruker noen annen heltallsverdi til å indikere manglende verdier i Cassandra-tabellen, kan du identifisere den verdien idatasets.xml:)

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

For Cassandra flytende punkt kolonner, nuller blir konvertert til NaNs iERDDAP.. For Cassandra-datatyper som konverteres til strenger iERDDAP™, nulls blir konvertert til tomme strenger. Det burde ikke være noe problem.
    
#### " VARERING: Re-reparasjon allerede forberedt spørring"{#warning-re-preparing-already-prepared-query} 
*  " VARNING: Re-reparasjon allerede forberedt spørring" i *tomcat* /logs/catalina.out (eller en annen Tomcat loggfil)   
Cassandra-dokumentasjonen sier det er problemer hvis den samme forespørselen gjøres til en forberedet statement to ganger (eller mer) .. (Se dette[feilrapport](https://datastax-oss.atlassian.net/browse/JAVA-236)..) For å unngå å gjøre Cassandra gal,ERDDAP™caches alle forberedteStatements slik at det kan gjenbruke dem. Denne cacheen går tapt hvis/når Tomcat/ERDDAP™er startet på nytt, men jeg tror det er greit fordi de forberedte statementene er forbundet med en gitt sesjon (mellomJavaCassandra) som også er tapt. Du kan se disse meldingene. Jeg kjenner ikke til andre løsninger. Heldigvis er det en advarsel, ikke en feil (Selv om Cassandra truer med at det kan føre til ytelsesproblemer) ..
    
Cassandra hevder at forberedede uttalelser er gode for alltid, såERDDAP's cachede forberedte statementer bør aldri bli utdatert/ugyldig. Hvis det ikke er sant, og du får feil om visse ForbereddeStatements er utdatert/ugyldig, må du starte på nyttERDDAP™Å ryddeERDDAPCache av forberedte statementer.
    
#### Cassandra Security{#cassandra-security} 
Se[Sikre Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html)

Når du jobber med Cassandra, må du gjøre ting så trygt og sikkert som mulig for å unngå å tillate en skadelig bruker å skade Cassandra eller få tilgang til data de ikke bør ha tilgang til.ERDDAP™Forsøker å gjøre ting på en sikker måte.

* Vi oppfordrer deg til å sette oppERDDAP™å koble til Cassandra som Cassandra bruker som bare har tilgang til **relevant** tabell (s) Og bare har lese privilegier.
* Vi oppfordrer deg til å etablere forbindelsen fraERDDAP™til Cassandra slik at det
    * bruker alltid SSL,
    * kun tillater tilkoblinger fra én IP-adresse (eller en blokk av adresser) fra denERDDAP™bruker og
    * Bare overføre passord i deres MD5 hashed form.
*   \\[Kunn problem\\]Tilkoblingsegenskaper (Inkluderer passordet&#33;) blir lagret som vanlig tekst idatasets.xml.. Vi har ikke funnet en måte å la administratoren skrive inn Cassandra-passordet på underERDDAPoppstart i Tomcat (som forekommer uten brukerinngang) , så passordet må være tilgjengelig i en fil. For å gjøre dette sikrere:
    * Du (denERDDAP™administrator) Bør være eier avdatasets.xmlog har lese og skrive tilgang.
    * Lag en gruppe som bare inneholder bruker=tomcat. Bruk chgrp for å gjøre det gruppen tildatasets.xmlMed bare lese privilegier.
    * Bruk chmod til å tildele o-rwx-privilegier (ingen LES eller WRITE-tilgang for andre brukere) fordatasets.xml..
* Når iERDDAP™, passord og andre tilkoblingsegenskaper lagres i "privat"JavaVariabler.
* Forespørsler fra kunder tolkes og kontrolleres for gyldighet før du genererer CQL-forespørsler for Cassandra.
* Anmodninger til Cassandra er laget med CQL Bound/PreparedStatements, for å hindre CQL injeksjon. I alle tilfeller er Cassandra iboende mindre utsatt for CQL injeksjon enn tradisjonelle databaser er å[SQL injeksjon](https://en.wikipedia.org/wiki/SQL_injection)..
         
#### Cassandra Speed{#cassandra-speed} 
Cassandra kan være rask eller langsom. Det er noen ting du kan gjøre for å gjøre det raskt:
* Generelt -
CQLs natur er at spørsmål er[Deklarativ](https://en.wikipedia.org/wiki/Declarative_programming).. De angir bare hva brukeren vil. De inneholder ikke en spesifikasjon eller hint for hvordan spørringen skal håndteres eller optimaliseres. Så det er ingen måte forERDDAP™å generere spørringen på en slik måte at det hjelper Cassandra å optimalisere spørsmålet (eller på noen måte angir hvordan spørringen skal håndteres) .. Generelt er det opp til Cassandra administrator å sette opp ting (For eksempel indekser) å optimalisere visse typer spørsmål.
     
* Angi tidsstempelkolonner som er relatert til grovere presisjon tidsstempelpartisjonsnøkler via [&lt;partisjon NøkkelkildeNames&gt;] (#partitionkeysourcenames) Den viktigste måten å hjelpe påERDDAP™Arbeid effektivt med Cassandra. Hvis dette forholdet eksisterer i et Cassandra bord og du ikke fortellerERDDAP™Datasettet vil være smertefullt sakte iERDDAP™Bruk massevis av Cassandra-ressurser.
     
* Oppgi klyngekolonner via [&lt;clusterColumnSourceNames&gt;] (#clustercolumnsourcenames) Den nest viktigste måten å hjelpe påERDDAP™Arbeid effektivt med Cassandra. Hvis det er klyngekolonner og du ikke fortellerERDDAP, vil en stor undergruppe av de mulige spørsmålene om data være nødvendig, smertefullt sakte iERDDAP™Bruk massevis av Cassandra-ressurser.
     
* Lage[Indekser](https://cassandra.apache.org/doc/latest/cql/indexes.html)For vanlige begrensede variabler -
Du kan fremskynde noen spørsmål ved å opprette indekser for Cassandra-kolonner som ofte er begrenset med -= - begrensninger.
    
Cassandra kan ikke lage indekser for liste, sett eller kartkolonner.
    
* Oppgi indekskolonner via [&lt;indeksColumnSourceNames&gt;] (#indexcolumnsourcenames) En viktig måte å hjelpe påERDDAP™Arbeid effektivt med Cassandra. Hvis det er indekskolonner og du ikke fortellerERDDAPNoen spørsmål om data vil være nødvendig, smertefullt sakte iERDDAP™Bruk massevis av Cassandra-ressurser.
     
#### Cassandra Stats{#cassandra-stats} 
*   [" Cassandra statistikk" Diagnostiske meldinger](#cassandra-stats)-- For alleERDDAP™brukerforespørsel til et Cassandra datasett,ERDDAP™vil skrive ut en linje i loggfilen, *bigParentDirectory* /logs/log.txt, med noen statistikk relatert til spørringen, for eksempel,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Ved å bruke tallene i eksemplet ovenfor betyr dette:

* NårERDDAP™siste (re) lastet dette datasettet, Cassandra fortalteERDDAP™det var 10000 forskjellige kombinasjoner av partisjonsnøkler.ERDDAP™cache alle de forskjellige kombinasjonene i en fil.
* På grunn av brukerens begrensninger,ERDDAP™identifiserte 2 kombinasjoner ut av 10000 som kan ha de ønskede data. Så,ERDDAP™vil gjøre 2 samtaler til Cassandra, en for hver kombinasjon av partisjonstastene. (Det er det Cassandra krever.) Selvfølgelig er det vanskelig hvis et stort datasett har et stort antall kombinasjoner av partisjonsnøkler og en gitt forespørsel reduserer ikke det drastisk. Du kan kreve at hver forespørsel reduserer nøkkelplassen ved å angi [&lt;maxRequestFraction&gt;] (#maxrequestfraction) .. Her er 2-0000 = 2e-4, som er mindre enn maxRequestFraction (0.1) Forespørselen var derfor tillatt.
* Etter å ha brukt begrensninger på partisjonsnøkler,[klyngekolonner](#clustercolumnsourcenames), og[indekskolonner](#indexcolumnsourcenames)som ble sendt avERDDAP™, Cassandra returnerte 1200 rekker data tilERDDAP™i resultatsettet.
* Resultatene Sett må ha hatt[Data Type= *en eller annen type* Liste](#cassandra-datatypes)kolonner (Med et gjennomsnitt på 10 elementer per liste) fordiERDDAP™utvidet 1200 rader fra Cassandra til 12000 rader iERDDAP..
*   ERDDAP™Bruk alltid alle brukerens begrensninger på dataene fra Cassandra. I dette tilfellet, begrensninger som Cassandra ikke hadde håndtert redusert antall rader til 7405. Det er antall rader som sendes til brukeren.

Den viktigste bruken av disse diagnostiske meldingene er å sikre atERDDAP™Gjør det du tror det gjør. Hvis det ikke er (For eksempel, reduserer det ikke antall forskjellige kombinasjoner som forventet?) Da kan du bruke informasjonen til å prøve å finne ut hva som går galt.
 
* Forskning og eksperiment for å finne og sette bedre [&lt;tilkoblingProperty&gt;] (#cassandra-forbindelseproperty) -S.
 
* Sjekk hastigheten på nettverksforbindelsen mellom Cassandra ogERDDAP.. Hvis tilkoblingen er langsom, se om du kan forbedre den. Den beste situasjonen er nårERDDAP™kjører på en server som er knyttet til den samme (raskt) bryter som serveren som kjører Cassandra noden som du kobler til.
 
* Vær tålmodig. Les informasjonen her og i Cassandra-dokumentasjonen nøye. Eksperiment. Sjekk arbeidet ditt. Hvis Cassandra-ERDDAP™tilkoblingen er fortsatt langsommere enn du forventer, vennligst ta med Cassandra-bordets skjema og dittERDDAP™deler avdatasets.xmlse vår[Seksjon om å få ekstra støtte](/docs/intro#support)..
 
* Hvis alt annet mislykkes,
å lagre dataene i en samling avNetCDFv3.ncfiler (spesielt.ncfiler som bruker[CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Tagge Array datastrukturer og så kan håndteres medERDDAP's[EDDTableFraNcCFFiler](#eddtablefromnccffiles)) .. Hvis de er logisk organisert (hver med data for en bit plass og tid) ,ERDDAP™kan raskt trekke ut data fra dem.
         
#### EDDTableFra Cassandra skjelett XML{#eddtablefromcassandra-skeleton-xml} 
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

### EDDTableFra DapSekvens{#eddtablefromdapsequence} 
[ **EDDTableFra DapSekvens** ](#eddtablefromdapsequence)håndterer variabler innenfor 1- og 2-nivå sekvenser fra[DAP](https://www.opendap.org/)servere somDAPPER (var på https://www.pmel.noaa.gov/epic/software/dapper/ Nå avsluttet) ..

* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det. Du kan samle inn informasjonen du trenger ved å se på kildedatasettets DDS- og DAS-filer i nettleseren din (ved å legge til .das og .dds til densourceUrl(Et eksempel var https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* En variabel er i enDAPsekvens hvis .dds-responsen indikerer at datastrukturen som holder variabelen, er en "sekvens" (tilfelle ufølsom) ..
* I noen tilfeller vil du se en sekvens i en sekvens, en 2-nivå sekvens -- EDDTableFromDapSequence håndterer disse også.
#### EDDTableFra DapSekvens skjelett XML{#eddtablefromdapsequence-skeleton-xml} 
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

### EDDTableFraDatabase{#eddtablefromdatabase} 
[ **EDDTableFraDatabase** ](#eddtablefromdatabase)håndtere data fra én relasjonell databasetabell eller[visning](https://en.wikipedia.org/wiki/View_(database)).

#### Ett bord eller Vis{#one-table-or-view} 
Hvis dataene du vil betjene er i to eller flere tabeller (og dermed trenger en EKSF for å trekke ut data fra begge tabeller samtidig) Du må lage en[denormalisert](https://en.wikipedia.org/wiki/Denormalization)  (allerede sluttet) tabell eller[visning](https://en.wikipedia.org/wiki/View_(SQL)) med alle data som du vil gjøre tilgjengelig som ett datasett iERDDAP..

For store, komplekse databaser kan det være fornuftig å skille ut flere deler som denormaliserte tabeller, hver med en annen type data, som vil bli separate datasett iERDDAP..

Lage en denormalisert tabell for bruk iERDDAP™Det kan høres ut som en gal idé for deg. Stol på oss. Det er flere grunner til hvorforERDDAP™jobber med denormaliserte tabeller:

* Det er mye lettere for brukerne.
NårERDDAP™presenterer datasett som ett, enkelt, denormalisert, enkelt bord, det er veldig enkelt for alle å forstå dataene. De fleste brukere har aldri hørt om normaliserte tabeller, og svært få forstår nøkler, utenlandske nøkler eller tabellen slutter seg til, og de nesten sikkert ikke vet detaljene i de ulike typene av koblinger, eller hvordan å spesifisere SQL å gjøre en kobling (eller flere medlemmer) Riktig. Ved hjelp av en denormalisert tabell unngås alle disse problemene. Denne grunnen alene rettferdiggjør bruken av en denormalisert enkelttabell for presentasjon av et datasett tilERDDAP™brukere.
     
* Normaliserte tabeller (flere tabeller relatert til nøkkelkolonner) Det er bra å lagre data i en database.
Men selv i SQL er resultatet som returneres til brukeren en denormalisert (ble medlem) enkelt bord. Så det virker rimelig å presentere datasettet til brukerne som en enorm, denormalisert, enkelt tabell som de så kan be om undergrupper fra (For eksempel, vis meg rader i tabellen der temperaturen&gt; 30) ..
     
* Du kan gjøre endringer forERDDAP™uten å endre tabellene dine.
    ERDDAP™har noen krav som kan være forskjellig fra hvordan du har opprettet databasen din.
For eksempelERDDAP™krever at tidsstempledata lagres i «tidstemple med tidssone».
Ved å lage en separat tabell/visning forERDDAP™, kan du gjøre disse endringene når du gjør det denormaliserte tabellen forERDDAP.. Derfor trenger du ikke å gjøre noen endringer i tabellene dine.
     
*   ERDDAP™vil gjenskape noen av strukturen i normaliserte tabeller.
Du kan angi hvilke kolonner av data som kommer fra «outer»-tabellene og dermed ha et begrenset antall forskjellige verdier.ERDDAP™vil samle alle de forskjellige kombinasjonene av verdier i disse kolonnene og presentere dem for brukere på en spesiell . undergruppe nettside som hjelper brukere raskt velge undergrupper av datasettet. De forskjellige verdiene for hver kolonne er også vist i nedtrekkslistene på datasettets andre nettsider.
     
* En denormalisert tabell gjør datahånd-off fra deg tilERDDAPadministrator enkelt.
Du er ekspert for dette datasettet, så det er fornuftig at du tar beslutninger om hvilke tabeller og hvilke kolonner å bli med og hvordan du skal bli med dem. Så du trenger ikke gi oss (Eller verre, sluttbrukere) flere tabeller og detaljerte instruksjoner for hvordan du skal bli med dem, må du bare gi oss tilgang til det denormaliserte tabellen.
     
* En denormalisert tabell gir effektiv tilgang til dataene.
Den avnormaliserte formen er vanligvis raskere å få tilgang til enn den normale formen. Bli med kan være sakte. Flere sammenslutninger kan være svært langsomme.
     

For å få data fra to eller flere tabeller i databasen tilERDDAP™Det er tre alternativer:
 

* Anbefalt alternativ:
Du kan opprette en komma- eller fanedelt verdifil med data fra den denormaliserte tabellen.
Hvis datasettet er stort, så det er fornuftig å lage flere filer, hver med en kohesiv undergruppe av den avnormaliserte tabellen (For eksempel data fra et mindre tidsområde) ..
    
Den store fordelen her er atERDDAP™vil kunne håndtere brukerforespørsler om data uten ytterligere innsats fra databasen din. SåERDDAP™vil ikke være en byrde på databasen eller en sikkerhetsrisiko. Dette er det beste alternativet under nesten alle omstendigheter fordiERDDAP™kan vanligvis få data fra filer raskere enn fra en database (hvis vi konverterer .csv-filene til.ncCF-filer) .. (En del av grunnen er atERDDAP+filer er et lesebeskyttet system og trenger ikke å håndtere endringer mens du gir[ACID](https://en.wikipedia.org/wiki/ACID)  (Atomisitet, Konsistens, Isolasjon, holdbarhet) ..) Du trenger sannsynligvis ikke en egen server siden vi kan lagre dataene på en av våre RAIDer og få tilgang til det med en eksisterendeERDDAP™på en eksisterende server.
    
* Ok alternativ:
Du konfigurerer en ny database på en annen datamaskin med bare det denormaliserte tabellen.
Siden den databasen kan være en gratis og åpen kildekode-database som MariaDB, MySQL og PostgreSQL, trenger dette alternativet ikke å koste mye.
    
Den store fordelen her er atERDDAP™vil kunne håndtere brukerforespørsler om data uten ytterligere innsats fra din nåværende database. SåERDDAP™vil ikke være en byrde på din nåværende database. Dette eliminerer også mange sikkerhetsproblemer sidenERDDAP™vil ikke ha tilgang til din nåværende database.
    
* Discourated alternativ:
Vi kan koble tilERDDAP™til din nåværende database.
For å gjøre dette må du:
    
    * Opprett en separat tabell eller visning med den denormaliserte tabellen over data.
    * Opprett en bruker som kun har tilgang til den denormaliserte tabellen. (s) ..
         
    
Dette er et alternativ hvis dataene endres svært ofte og du vil giERDDAP™brukere øyeblikkelig tilgang til disse endringene; Men selv om det kan være fornuftig å bruke filalternativet ovenfor og periodisk (Hvert 30. minutt?) erstatte filen som har dagens data.
De store ulempene ved denne tilnærmingen er atERDDAP™brukerforespørsler vil sannsynligvis plassere en utholdelig stor byrde på databasen din og atERDDAP™Tilkobling er en sikkerhetsrisiko (Selv om vi kan minimere / administrere risikoen) ..

Gjør den denormaliserte tabellen eller visningen tilERDDAP™En god mulighet til å gjøre noen endringer somERDDAP™trenger, på en måte som ikke påvirker dine opprinnelige tabeller:

* Endre dato og tidsstempelfelt/kolonner for å bruke dataType som Postgres ringer[tidsstempel med tidssone](#database-date-time-data)  (eller tilsvarende i databasen din) ..
Tidsstempler uten tidssoneinformasjon fungerer ikke riktig iERDDAP..
* Lag indekser for kolonnene som brukerne ofte søker.
* Vær veldig oppmerksom på[tilfellet med felt/kolonnenavn](#quotes-for-names-and-case-sensitivity)  (For eksempel bruk alle små bokstaver) Når du skriver dem.
* Ikke bruk reserverte ord for tabellen og for felt/kolonnenavn.

Hvis du trenger hjelp med å lage den denormaliserte tabellen eller visningen, vennligst kontakt din databaseadministrator.
Hvis du ønsker å snakke om hele denne tilnærmingen eller streifere hvordan du best kan gjøre det, vennligst send en e-post til Chris. John på noaa.gov.
    
#### database idatasets.xml {#database-in-datasetsxml} 
Det er vanskelig å skape riktigdatasets.xmlopplysninger som trengs forERDDAP™å etablere en tilkobling til databasen. Vær tålmodig. Vær metodisk.
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
        
Opprett datasett Xml har tre spesialalternativer for EDDTableFromDatabase:
1. Hvis du kommer inn -&#33;&#33;&#33;&#33; (Uten sitater) for katalognavnet vil programmet vise en liste over katalognavnene.
2. Hvis du kommer inn -&#33;&#33;&#33;&#33; (Uten sitater) For skjemanavnet vil programmet vise en liste over skjemanavnene.
3. Hvis du kommer inn -&#33;&#33;&#33;&#33; (Uten sitater) for tabellnavnet, vil programmet vise en liste over tabeller og kolonner. Den første -&#33;&#33;&#33;&#33;&#33;&#33;&#33;&#33; - oppføring som du gjør er den som vil bli brukt.
* Les nøye all informasjon om EDDTableFromDatabase.
* Du kan samle det meste av informasjonen du trenger for å opprette XML for et EDDTableFromDatabase-datasett ved å kontakte databaseadministratoren og ved å søke på nettet.
* Selv om databaser ofte behandler kolonnenavn og tabellnavn på en kase-ufølsom måte, er de saksfølsomme iERDDAP.. Så hvis en feilmelding fra databasen sier at et kolonnenavn er ukjent (For eksempel "Ukjent identifikator= \" *kolonne\\_navn* '") Selv om du vet det eksisterer, prøv å bruke alle hovedsteder, for eksempel, *KOLONN\\_NAMN* , som ofte er den sanne, saksfølsomme versjonen av kolonnenavnet.
* Arbeid tett med databaseadministratoren, som kan ha relevant erfaring. Hvis datasettet ikke lastes, leses[feilmelding](#troubleshooting-tips)nøye for å finne ut hvorfor.
         
#### JDBC driver{#jdbc-driver} 
* [JDBC driver og&lt;driverName&gt;] (#jdbc-driver) -- Du må få riktig JDBC 3 eller JDBC 4 driver .jar fil for databasen din og
Legg den i *tomcat* /webapps/erddap/WEB-INF/lib etter at du har installertERDDAP.. Så i dindatasets.xmlFor dette datasettet må du angi&lt;driverName&gt; for denne driveren, som er (Dessverre) forskjellig fra navnet. Søk på nettet etter JDBC-driveren for databasen og driverenNameJavaMå bruke den.
    
    * For MariaDB, prøv[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
Den&lt;driverName&gt; å bruke idatasets.xml  (Se nedenfor) er sannsynligvis org.mariadb.jdbc. Fører.
    * For MySQL og Amazon RDS, prøv[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
Den&lt;driverName&gt; å bruke idatasets.xml  (Se nedenfor) er sannsynligvis com.mysql.jdbc. Fører.
    * ForOracle, prøve[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html)..
Den&lt;driverName&gt; å bruke idatasets.xml  (Se nedenfor) er sannsynligvis orakel.jdbc.driver.OracleFører.
    * For Postgresql fikk vi JDBC 4-driveren fra[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
Den&lt;driverName&gt; å bruke idatasets.xml  (Se nedenfor) Det er nok org.postgresql. Fører.
    * For SQL Server kan du få JTDS JDBC-driveren fra[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net)..
Den&lt;driverName&gt; å bruke idatasets.xml  (Se nedenfor) er sannsynligvis net.sourceforge.jtds.jdbc. Fører.
    
Etter at du har satt JDBC-sjåfør .jar iERDDAP™lib katalog, du må legge til en referanse til den .jar-filen i .bat og/eller .sh-skriptfiler for Genererer Datasett Xml, DasDds og ArchiveADatasett som er i *tomcat* /webapps/erddap/WEB-INF/-katalogen; ellers får du en klasseNotFoundException når du kjører disse skriptene.
    
Dessverre er JDBC noen ganger kilden til problemer. I sin rolle som mellommann mellomERDDAP™og databasen gjør det noen ganger subtile endringer i standard/generisk database SQL-forespørsel somERDDAP™skaper dermed problemer (For eksempel relatert til[øvre/små identifikatorer](#quotes-for-names-and-case-sensitivity)og relatert til[dato/tid tidssoner](#database-date-time-data)) .. Vennligst vær tålmodig, les informasjonen her nøye, sjekk arbeidet ditt og se vår[Seksjon om å få ekstra støtte](/docs/intro#support)..
    
#### Database&lt;tilkobling Eiendom &gt;{#database-connectionproperty} 
* [&lt;tilkoblingProperty&gt;] (#database-connectionproperty) -- Idatasets.xmlFor datasettet må du definere flere forbindelser Eiendomsmerker å fortelleERDDAP™Hvordan koble til databasen din (for eksempel å angi brukernavn, passord, ssl-tilkobling og[Hente størrelse](#set-the-fetch-size)) .. Dette er forskjellig for alle situasjoner og er litt vanskelig å finne ut. Søk på nettet etter eksempler på å bruke en JDBC-driver til å koble til databasen din. Den&lt;tilkoblingProperty&gt; navn (For eksempel bruker " passord", og "ssl") , og noen av tilkoblingsverdiene kan bli funnet ved å søke på nettet for "JDBC-tilkoblingsegenskaper *database Type* " (For eksempelOracle, MySQL, Amazon RDS, MariaDB, PostgreSQL) ..
     
#### Navn og saksfølsomhet{#quotes-for-names-and-case-sensitivity} 
*   [Sitater om felt/kolumnnavn; Case Sensitivity](#quotes-for-names-and-case-sensitivity)- Som standard setter EDDTableFromDatabase ANSI-SQL-standard dobbel sitater rundt felt/kolonnenavn i SELECT-uttrykk i tilfelle du har brukt et reservert ord som et felt/kolonnenavn, eller et spesielt tegn i et felt/kolonnenavn. De dobbelte sitatene hindrer også visse typer SQL injeksjonsangrep. Du kan fortelleERDDAP™å bruke " eller ingen sitater via&lt;kolonneName idatasets.xmlFor dette datasettet.
    
For mange databaser får bruk av alle typer sitater databasen til å arbeide med felt/kolonnenavn på en saksfølsom måte (i stedet for standarddatabasen tilfelle ufølsom måte) .. Databaser viser ofte fil-/kolonnenavn som alle store bokstaver, når det i virkeligheten er annerledes i tilfelle sensitiv form. IERDDAP™, vennligst alltid behandle database kolonnenavn som tilfelle sensitiv.
    
    * For Maria DB, du må kjøre databasen med[\\--sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/)..
    * For MySQL og Amazon RDS må du kjøre databasen med[\\--sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes)..
    *   Oraclestøtter ANSI-SQL-standard doble sitater[som standard](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223)..
    * PostgreSQL støtter ANSI-SQL-standard dobbel sitater som standard.
    
      
Ikke bruk et reservert ord for en database, katalog, skjema eller tabellnavn.ERDDAP™Ikke sett sitater rundt dem.
    
Hvis det er mulig, bruk alle små bokstavar for database, katalog, skjema, tabellnavn og feltnavn når du oppretter databasetabellen (eller visning) og når det refereres til felt/kolonnenavn idatasets.xmliERDDAP.. Ellers kan du få en feilmelding som sier at databasen, katalogen, skjemaet, tabellen og/eller feltet ikke ble funnet. Hvis du får den feilmeldingen, prøv å bruke den saksfølsomme versjonen, alle store tilfellers versjon og alle små bokstavars versjon av navnet iERDDAP.. En av dem kan jobbe. Hvis ikke, må du endre navnet på databasen, katalog, skjema og/eller tabell til alle små bokstaver.
    
#### Database&lt;Data Type &gt;{#database-datatype} 
*   [Database](#database-datatype)[&lt;dataType&gt;] (#datatype) Tags-- Fordi det er noe tvetydig om hvem[databasedatatyper](https://www.w3schools.com/sql/sql_datatypes_general.asp)Kart somERDDAP™Datatyper, må du angi en [&lt;dataType&gt;] (#datatype) Tagg for hver [&lt;dataVariable&gt;] (#datavariable) å fortelleERDDAP™hvilken datatype som skal brukes. En del av problemet er at ulike datasett bruker forskjellige termer for de ulike datatypene - så alltid prøver å matche definisjonene, ikke bare navnene. Se beskrivelsen av[standardERDDAP™Data Typer](#data-types), som inkluderer referanser til de tilsvarende SQL-datatypene.[Dato og tidsstempel](#database-date-time-data)er spesielle tilfeller: brukERDDAPdobbeltdata Type.
     
#### Data fra databasedato{#database-date-time-data} 
Noen databasedatotidskolonner har ingen eksplisitt tidssone. Slike kolonner er problemer forERDDAP.. Databaser støtter konseptet om en dato (Med eller uten tid) uten tidssone, som et omtrentlig tidsområde. MenJava  (og dermedERDDAP) Bare omhandler øyeblikkelig dato+tider med en tidssone. Så du kan vite at datotidsdata er basert på en lokal tidssone (med eller uten dagstid) eller GMT/Zulutidssone, menJava  (ogERDDAP) Ikke gjør det. Vi trodde vi kunne jobbe rundt dette problemet. (f.eks. ved å angi en tidssone for kolonnen) , men databasen + JDBC+JavaInteraksjoner gjorde dette til en upålitelig løsning.
* Så,ERDDAP™krever at du lagrer alle dato- og datodata i databasetabellen med en databasedatatype som tilsvarer JDBC-typen " tidsstempel med tidssone" (ideelt, som bruker GMT /ZuluTidssone) ..
* IERDDAP'sdatasets.xmli&lt;dataVariable&gt; tag for en tidsstempelvariabel, sett
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

og i&lt;addAttributes&gt; sett
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Forslag: Hvis dataene er et tidsområde, er det nyttig å ha tidsstempelverdiene refererer til sentrum av det underforståtte tidsintervallet (For eksempel middag) .. For eksempel, hvis en bruker har data for 2010-03-26T13:00Z fra et annet datasett og de vil ha de nærmeste data fra et databasedatasett som har data for hver dag, deretter databasedata for 2010-03-26T12:00Z (Representere data for den datoen) Det er selvfølgelig det beste (I motsetning til midnatt før eller etter, hvor det er mindre åpenbart som er best) ..
*   ERDDAP™har et verktøy til[Konverter et tall Tid til/fra en strengtid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)..
* Se[HvordanERDDAPAvtaler med tiden](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)..
       
#### Heltal nuller{#integer-nulls-1} 
Databaser støtter nuller i heltall (int, liten, liten) kolonner, menERDDAP™Jeg støtter ikke ekte nuller.
Databasen nuller vil bli konvertert iERDDAP™127 for bytekolonner, 255 for ubytekolonner, 32767 for korte kolonner, 65535 for ukorte kolonner, 2147483647 for int-kolonner, 4294967295 for uint-kolonner, 9,223,372,036,854,775,807 for lange kolonner, eller 184467440737091615 for ulange kolonner. Hvis du bruker disse standardene, vennligst identifisere dissemissing\\_values for datasettets brukere iERDDAP™med

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

eller

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Alternativt kan du bruke "missing\\_value" attributt i stedet for "__FillValue".
Opprett datasett Xml legger automatisk til disse \\_FillValue-attributtene når det genererer det foreslåttedatasets.xmlfor databasedatasett.

For de flytende kolonnene i databasen, blir nuller konvertert til NaNs iERDDAP..
For databasedata som konverteres til strenger iERDDAP™, nulls blir konvertert til tomme strenger.
    
#### Databasesikkerhet{#database-security} 
* Når du jobber med databaser, må du gjøre ting så sikkert og sikkert som mulig for å unngå å tillate en skadelig bruker å skade databasen eller få tilgang til data de ikke bør ha tilgang til.ERDDAP™Forsøker å gjøre ting på en sikker måte.
    * Tenk på å kopiere, på en annen datamaskin, databasen og databasetabellene med dataene du vil haERDDAP™å tjene. (Ja, for kommersielle databaser somOracleDette innebærer ytterligere lisensgebyrer. Men for open source databaser, som PostgreSQL, MySQL, Amazon RDS og MariaDB, koster dette ingenting.) Dette gir deg et høyt nivå av sikkerhet og forhindrer ogsåERDDAP™Forespørsler fra å bremse den opprinnelige databasen.
    * Vi oppfordrer deg til å sette oppERDDAP™å koble til databasen som en databasebruker som bare har tilgang til databasen **relevant** database (s) Og bare har lese privilegier.
    * Vi oppfordrer deg til å etablere forbindelsen fraERDDAP™til databasen slik at den
        * bruker alltid SSL,
        * kun tillater tilkoblinger fra én IP-adresse (eller en blokk av adresser) fra denERDDAP™bruker og
        * Bare overføre passord i deres MD5 hashed form.
    *   \\[Kunn problem\\]Tilkoblingsegenskaper (Inkluderer passordet&#33;) blir lagret som vanlig tekst idatasets.xml.. Vi har ikke funnet en måte å la administratoren skrive inn databasepassordet på underERDDAPoppstart i Tomcat (som forekommer uten brukerinngang) , så passordet må være tilgjengelig i en fil. For å gjøre dette sikrere:
        * Du (denERDDAP™administrator) Bør være eier avdatasets.xmlog har lese og skrive tilgang.
        * Lag en gruppe som bare inneholder bruker=tomcat. Bruk chgrp for å gjøre det gruppen tildatasets.xmlMed bare lese privilegier.
        * Bruk chmod til å tildele o-rwx-privilegier (ingen LES eller WRITE-tilgang for andre brukere) fordatasets.xml..
    * Når iERDDAP™, passord og andre tilkoblingsegenskaper lagres i "privat"JavaVariabler.
    * Forespørsler fra klienter tolkes og kontrolleres for gyldighet før du genererer SQL-forespørsler til databasen.
    * Forespørsler til databasen gjøres med SQL ForberedStatements, for å hindre[SQL injeksjon](https://en.wikipedia.org/wiki/SQL_injection)..
    * Forespørsler til databasen sendes med gjennomføring Søk (ikke utført) å begrense forespørsler som skal leses bare (så forsøkt SQL injeksjon for å endre databasen vil mislykkes av denne grunn også) ..
         
#### SQL{#sql} 
* FordiOPeNDAPForespørsler om tabelldata ble utformet for å etterlikne SQL tabelldataforespørsler, det er enkelt forERDDAP™å konvertere tabular dataforespørsler til enkle SQL-forbereddeStatements. For eksempelERDDAP™forespørsel
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
vil bli omgjort til SQL ForberedStatement
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™forespørsler med & distinct () og/eller &orderBy ( *Variabler* ) vil legge til DISTINCT og/eller ORDER BY *Variabler* til SQL utarbeidet uttalelse. Generelt vil dette redusere responsen fra databasen sterkt.
ERDDAP™Logger den forberedte[log.txt](/docs/server-admin/additional-information#log)som
```
    statement=*thePreparedStatement*  
```
Dette vil være en tekst representasjon av ForberedStatement, som kan være litt forskjellig fra den faktiske ForbereddeStatement. I ForberedtStatement kodes for eksempel tidspunkter på en spesiell måte. Men i teksten representasjon, de vises som ISO 8601 datotider.
     
#### Databasehastighet{#database-speed} 
* Databaser kan være sakte. Det er noen ting du kan gjøre:
    * Generelt -
SQLs natur er at spørsmål er[Deklarativ](https://en.wikipedia.org/wiki/Declarative_programming).. De angir bare hva brukeren vil. De inneholder ikke en spesifikasjon eller hint for hvordan spørringen skal håndteres eller optimaliseres. Så det er ingen måte forERDDAP™å generere spørringen på en slik måte at den hjelper databasen til å optimalisere spørringen (eller på noen måte angir hvordan spørringen skal håndteres) .. Generelt er det opp til databaseadministratoren å sette opp ting (For eksempel indekser) å optimalisere visse typer spørsmål.
##### Still inn Kjøp størrelse{#set-the-fetch-size} 
Databaser returnerer dataene tilERDDAP™I stykker. Som standard returnerer forskjellige databaser et annet antall rader i bitene. Ofte er dette tallet svært lite og så ineffektivt. For eksempel standarden forOracleer 10&#33; Les JDBC-dokumentasjonen til databasens JDBC-driver for å finne tilkoblingsegenskapen som skal angis for å øke dette, og legg til dette i datasettets beskrivelse idatasets.xml.. For eksempel
For MySQL og Amazon RDS, bruk
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
For MariaDB er det for tiden ingen måte å endre rekkestørrelsen. Men det er en ønsket funksjon, så søk på nettet for å se om dette er implementert.
ForOracle, bruk
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
For PostgreSQL, bruk
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
Men du må gjerne endre nummeret. Å sette tallet for stort vil føre tilERDDAP™å bruke mye minne og være mer sannsynlig å miste hukommelsen.
#### Tilkoblingseigenskapar{#connectionproperties} 
Hver database har andre tilkoblingsegenskaper som kan angis idatasets.xml.. Mange av disse vil påvirke ytelsen til databasenERDDAP™Tilkobling. Vennligst les dokumentasjonen for databasens JDBC-driver for å se alternativene. Hvis du finner tilkoblingsegenskaper som er nyttige, vennligst send en e-post med detaljene tilerd dot data at noaa dot gov..
* Lag et bord --
Du vil sikkert få raskere svar hvis du regelmessig (Hver dag? Når det er nye data?) Opprette en faktisk tabell (På samme måte som hvordan du genererte VIEW) og fortelleERDDAP™For å få data fra tabellen i stedet for VIEW. Siden enhver forespørsel til tabellen da kan oppfylles uten å kode en annen tabell, vil svaret bli mye raskere.
* Vakuum tabellen -
MySQL og Amazon RDS vil svare mye raskere hvis du bruker[OPTIMIZE TABLE](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html)..
Maria DB vil svare mye raskere hvis du bruker[OPTIMIZE TABLE](https://mariadb.com/kb/en/optimize-table/)..
PostgreSQL vil svare mye raskere hvis du[VACUUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)Bordet.
    Oracleikke har eller trenger en analog kommando.
* Lage[Indekser](https://en.wikipedia.org/wiki/Database_index)For vanlige begrensede variabler -
Du kan fremskynde mange/de fleste spørsmål ved å opprette indekser i databasen for variabler (hvilke databaser som ringer " kolonner") som ofte begrenses i brukerens spørsmål. Generelt er disse de samme variabler angitt av [&lt;subsetVariables&gt;] (#subsetvariables) og/eller breddegrad, lengdegrad og tidsvariabler.
##### Bruk sammenkoblingsbasseng{#use-connection-pooling} 
Vanligvis,ERDDAP™gjør en separat tilkobling til databasen for hver forespørsel. Dette er den mest pålitelige tilnærmingen. Det raskere alternativet er å bruke en DataSource som støtter sammenkobling. Hvis du vil konfigurere den, angi (For eksempel)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
rett ved siden av&lt;sourceUrl&gt;,&lt;drivernavn, og&lt;tilkobling Eiendom &gt;.
Og i *tomcat* /conf/context.xml, definere en ressurs med samme informasjon, for eksempel,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Generelt informasjon om bruk av datakilde er på[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html)..
Se[Tomcat Datakildeinformasjon](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)og[Tomcat Datakildeeksempler](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)eller søk på nettet etter eksempler på å bruke DataSources med andre programservere.
* Hvis alt annet mislykkes,
å lagre dataene i en samling avNetCDFv3.ncfiler (spesielt.ncfiler som bruker[CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Tagge Array datastrukturer og så kan håndteres medERDDAP's[EDDTableFraNcCFFiler](#eddtablefromnccffiles)) .. Hvis de er logisk organisert (hver med data for en bit plass og tid) ,ERDDAP™kan raskt trekke ut data fra dem.
         
#### EDDTableFromDatabase skjelett XML{#eddtablefromdatabase-skeleton-xml} 
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

### EDDTableFraEDDGrid {#eddtablefromeddgrid} 
[ **EDDTableFraEDDGrid** ](#eddtablefromeddgrid)lar deg opprette et EDDTable datasett fra noenEDDGrid- Datasett.

* Noen vanlige grunner til dette er:
    * Dette gjør at datasettet kan spørres medOPeNDAPvalgbegrensninger, som er en type " etter verdi" (som en bruker kan ha bedt om) ..
    * Datasettet er iboende et tabellisk datasett.
* Verdien av den globale egenskapen " maxAxis0" (Vanligvis av type=-int-) , (Standarden er 10) vil bli brukt til å begrense antall akser\\[0\\]  (Vanligvis"time"aksen) verdier i den innesluttedeEDDGriddatasett som kan nås per forespørsel om data. Hvis du ikke vil det skal være noen grense, angi en verdi på 0. Denne innstillingen er viktig fordi det ellers ville være for enkelt for en bruker å spørre EDDTableFromEDDGridå se gjennom alle dataene i datasettet. Det vil ta lang tid og vil nesten absolutt mislykkes med en tidsavbruddsfeil. Dette er innstillingen som gjør det trygt å ha EDDTableFraEDDGridDatasett i dinERDDAPuten frykt for at de vil føre til en urimelig bruk av databehandlingsressurser.
* Hvis lukketEDDGrider et[EDDGridFraErddap](#eddfromerddap)ogERDDAP™Det er det sammeERDDAP, deretter EDDTableFraEDDGridvil alltid bruke den tilgjengelige versjonen av det refererte datasettet direkte. Dette er en meget effektiv måte for EDDTableFromEDDGridtil å få tilgang til dataene.
* Denne klassen er [&lt;Last på nytt EveryNMinutes&gt;] (#reloadvarelser) Det som teller. Den innesluttedeEDDGrid's&lt;reloadEveryNMinutes&gt; ignoreres.
* Hvis en verdi for [&lt;OppdaterEveryNMillis&gt;] (#updatevardenmillis) er levert for dette datasettet, det ignoreres. Den innesluttedeEDDGrid's&lt;OppdaterEveryNMillis&gt; er det som betyr noe.
*   [Generer DatasetsXml](#generatedatasetsxml)har et alternativ for datasett type=EDDTabellFraEDDGridsom ber om URL til enERDDAP  (Vanligvis det sammeERDDAP)   (Ender i "/erddap/") og et regelmessig uttrykk. Opprett datasett Xml vil da generere XML for en EDDTableFraEDDGriddatasett for hvert nettbasert datasett iERDDAP™som hardatasetIDsom passer til det regulære uttrykket (bruk .\\* for å matche alledatasetIDs for gitte datasett) ..
    
Biten av XML som genereres av GenerationDatasetsXml for hvert datasett inkluderer:
    
    * AdatasetIDsom erEDDGrid'sdatasetIDplus "__Asatable".
    * En ny sammendrag global attributt som erEDDGridSammendrag pluss et nytt første ledd som beskriver hva dette datasettet er.
    * En ny tittel global attributt som erEDDGridtittelen Plus- (Som tabell)  ".
    * En ny maxAxis0 global attributt med en verdi på 10.
#### EDDTableFraEDDGridskjelett XML{#eddtablefromeddgrid-skeleton-xml} 
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
[ **EDDTableFromFileNames** ](#eddtablefromfilenames)oppretter et datasett fra informasjon om en gruppe filer i serverens filsystem, inkludert en URL for hver fil slik at brukerne kan laste ned filene viaERDDAP's["files"systemet](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).. I motsetning til alle[EDDTableFra Filer](#eddtablefromfiles)underklasser, denne datasetttypen tjener ikke data fra i filene.

* EDDTableFromFileNames er nyttig når:
    * Du har en gruppe filer som du vil distribuere som hele filer fordi de ikke inneholder - data - på samme måte som vanlige datafiler har data. For eksempel bildefiler, videofiler, Word-dokumenter, Excel-reknearkfiler, PowerPoint-presentasjonsfiler eller tekstfiler med ustrukturert tekst.
    * Du har en gruppe filer som har data i et format somERDDAP™Kan ikke lese ennå. For eksempel et prosjektspesifikk, tilpasset binærformat.
         
#### EDDTableFromFileNames Data{#eddtablefromfilenames-data} 
*   [Dataene i et EDDTableFromFileNames datasett](#eddtablefromfilenames-data)Et bord somERDDAP™oppretter on-the-fly med informasjon om en gruppe lokale filer. I tabellen er det en rad for hver fil. Fire spesielle egenskaper i[datasets.xmlFor dette datasettet](#eddtablefromfilenames-skeleton-xml)bestemme hvilke filer som vil bli inkludert i dette datasettet:
    
##### fil Dir{#filedir} 
    *   &lt;filDir&gt; -- Dette angir kildekatalogen i serverens filsystem med filene for dette datasettet. Filene som faktisk er plassert i serverens filsystem i&lt;filDir&gt; vil vises i url-kolonnen i dette datasettet i en virtuell katalog som heter https://*serverUrl*/erddap/files/*datasetID/* ..
For eksempel, hvisdatasetIDer jplMURSST,
og&lt;filDir&gt; er /home/data/mur/ ,
og den katalogen har en fil som heter jplMURSST201501030000.png,
da URL som vil bli vist til brukere for den filen vil være
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png ..
        
I tillegg til å bruke en lokal katalog for&lt;filDir&gt;, kan du også angi URL til en ekstern, kataloglignende nettside. Dette fungerer med:
        
        * Usamlede datasett i TREDDS, f.eks.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Denne serveren er ikke lenger pålitelig tilgjengelig.\\]
        * Usamlede datasett iHyraxf.eks.
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * De fleste Apache-lignende kataloglister, f.eks.
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### fraOnTheFly{#fromonthefly} 
[\\*\\** fraOnTheFly](#fromonthefly)-- For noen store S3 bøtter (som noaa-goes17, som har 26 millioner filer) Det kan taERDDAP™Opp til 12 timer for å laste ned all informasjonen om innholdet i skuffen (Og så er det andre problemer) .. For å komme rundt dette er det en spesiell måte å bruke på&lt;filDir&gt; i EDDTableFromFileNames for å lage et datasett med katalogen og filnavnene fra en AWS S3-bøtte. Datasettet vil ikke ha listen over alle S3 bøttes mapper og filnavn som en bruker kan søke via forespørsler til datasettet. Men datasettet vil få navn på mapper og filer på flyet hvis brukeren krysser kataloghierarkiet med datasettets"files"Valg. Dette tillater brukerne å bla gjennom S3 bøtte filhierarki og filer via datasettets"files"systemet. For å gjøre dette i stedet for å spesifisere URL-adressen for S3-bøtte som startmappen" (i Generer Datasett Xml) eller&lt;filDir&gt; (idatasets.xml) Bruk:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
For eksempel:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Se dokumentasjonen for[samarbeid med S3 Buckets iERDDAP™](#working-with-aws-s3-files), spesielt beskrivelsen av det spesifikke format som må brukes til S3 bøtte-URL. Og se
[Disse detaljene og et eksempel](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)bruk av\\*\\**Fra OnTheFly.
        
##### Rekursiv{#recursive} 
*   &lt;Rekursiv &gt; -- Filer i underkataloger av&lt;filDir&gt; med navn som passer&lt;filRegex&gt; vil vises i samme underkataloger i"files"URL hvis&lt;Rekursivt &gt; er satt til sant. Standarden er falsk.
* [&lt;pathRegex&gt;] (#pathregex) -- Hvis rekursiv=sann, bare katalognavn som passer til banenRegex (standard=".*") vil bli akseptert. Hvis rekursiv=feil, ignoreres dette. Dette brukes sjelden, men kan være svært nyttig under uvanlige omstendigheter. (Se dette[Regulatorisk dokumentasjon](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og[Regular tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)..) 
##### fileRegex{#fileregex} 
*   &lt;fileRegex&gt; -- Bare filnavnene der hele filnavnet (ikke inkludert katalognavnet) matcher&lt;fileRegex&gt; vil bli inkludert i dette datasettet. For eksempel jplMURSST.&#123;14&#125;\\.png . (Se dette[Regulatorisk dokumentasjon](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og[Regular tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)..)   
         
##### Fra filnavnstabellinnhold{#from-file-names-data-table-contents} 
I tabellen vil det være kolonner med:
* url -- URL som brukere kan bruke til å laste ned filen viaERDDAP's["files"systemet](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)..
* navn -- Filens navn (uten katalognavn) ..
* LastModifisert - Når filen sist ble endret (lagret som doubles med"seconds since 1970-01-01T00:00:00Z") .. Denne variabelen er nyttig fordi brukerne kan se om/når innholdet i en gitt fil sist endret. Denne variabelen er en[tid Stemplevariabel](#timestamp-variables), så data kan vises som numeriske verdier (sekunder siden 1970-01-01T00:00:00Z) eller en strengverdi (ISO 8601:2004 (E) format) avhengig av situasjonen.
* størrelse -- Størrelsen på filen i byte, lagret som dobbel. De lagres som dobbel fordi noen filer kan være større enn intensjoner tillater, og langer støttes ikke i noen responsfiltyper. Doubles vil gi nøyaktig størrelse, selv for svært store filer.
* tilleggskolonner definert avERDDAP™administrator med informasjon hentet fra filnavnet (For eksempel tiden tilknyttet dataene i filen) basert på to attributter som du angir i metadata for hver ekstra kolonne/dataVariable:)
    
    * ekstraktRegex -- Dette er en[regulært uttrykk](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) .. Hele regulatoriet må samsvare med hele filnavnet (ikke inkludert katalognavnet) .. Regulatoriet må inneholde minst én fangstgruppe (en del av et regulært uttrykk som er innesluttet av parenteser) somERDDAP™bruker for å bestemme hvilken del av filnavnet som skal trekkes ut for å bli data.
    * ekstrakt Gruppe -- Dette er antall fangstgruppen (#1 er den første fangstgruppen) i det regulære uttrykket. Standarden er 1. En fangegruppe er en del av et regelmessig uttrykk som er innesluttet av parenteser.
    
Her er to eksempler:
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
Hvis en fil har navnet jplMURSST201501030000.png, ekstractRegex vil matche filnavnet, ekstrakt tegnene som passer til den første fange gruppen ("201501030000") som dataType=String, deretter bruk[enheter egnet for strengtider](#string-time-units)å tolke strengene i tidsdataverdier (2015-01-03T00:00:00Z) ..

Hvis en fil har navnet jplMURSST201501030000.png, ekstractRegex vil matche filnavnet, ekstrakt tegnene som passer til den første fange gruppen ("03") som [&lt;dataType&gt;] (#datatype) \\=int, gir en dataverdi på 3.
        
#### Andre opplysninger{#other-information} 
* Nei [&lt;OppdaterEveryNMillis&gt;] (#updatevardenmillis) -- Denne typen datasett trenger ikke og kan ikke bruke&lt;oppdaterEveryNMillis&gt; tag fordi informasjonen som serveres av EDDTableFromFileNames er alltid helt oppdatert, fordiERDDAP™spør etter filsystemet for å svare på hver forespørsel om data. Selv om det er et stort antall filer, bør denne tilnærmingen fungere rimelig bra. En respons kan være langsom hvis det er et stort antall filer og datasettet har ikke blitt spurt for en stund. Men i flere minutter etter det holder operativsystemet informasjonen i en cache, så svarene bør være veldig raske.
     
* Du kan bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å gjøredatasets.xmlbit for denne typen datasett. Du kan legge til/definere flere kolonner med informasjon som er hentet fra filnavnet, som vist ovenfor.
     
#### EDDTableFromFileNames skjelett XML{#eddtablefromfilenames-skeleton-xml} 
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

### EDDTableFra Filer{#eddtablefromfiles} 
[ **EDDTableFra Filer** ](#eddtablefromfiles)er superklasse av alle EDDTableFra...Filer klasser. Du kan ikke bruke EDDTableFrom Files direkte. I stedet, bruk en underklasse av EDDTableFromFiles til å håndtere den bestemte filtypen:

*   [EDDTableFraAsciiFiler](#eddtablefromasciifiles)aggregerer data fra komma-, fane-, semikolon- eller mellomromsdelte ASCII-datafiler.
*   [EDDTableFraAudioFiler](#eddfromaudiofiles)aggregerer data fra en gruppe av lokale lydfiler.
*   [EDDTableFra AwsXmlFiles](#eddtablefromawsxmlfiles)aggregerer data fra et sett av automatisk værstasjon (AWS) XML-filer.
*   [EDDTableFraColumnarAsciiFiler](#eddtablefromcolumnarasciifiles)aggregerer data fra tabell ASCII-datafiler med faste breddedatakolonner.
*   [EDDTableFraHyraxFiler](#eddtablefromhyraxfiles)  (Deprekert) aggregerer data med flere variabler, hver med delte dimensjoner (For eksempel tid, høyde (eller dybde) , breddegrad, lengdegrad) og tjenestegjort av en[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server)..
*   [EDDTableFraInvalidCRAFiler](#eddtablefrominvalidcrafiles)aggregerer data fraNetCDF  (v3 eller v4)  .ncfiler som bruker en spesifikk, ugyldig variant av CF DSG Contigous Tagged Array (CRA) Filer. Selv omERDDAP™støtter denne filtypen, det er en ugyldig filtype som ingen bør begynne å bruke. Grupper som for tiden bruker denne filtypen oppfordres sterkt til å brukeERDDAP™å generere gyldige CF DSG CRA-filer og slutte å bruke disse filene.
*   [EDDTableFraJsonlCSVFiler](#eddtablefromjsonlcsvfiles)aggregerer data fra[JSON Linjer CSV-filer](https://jsonlines.org/examples/)..
*   [EDDTableFraMultidimNcFiler](#eddtablefrommultidimncfiles)aggregerer data fraNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer med flere variabler, hver med delt dimensjon (For eksempel tid, høyde (eller dybde) , breddegrad, lengdegrad) ..
*   [EDDTableFraNcFiler](#eddtablefromncfiles)aggregerer data fraNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer med flere variabler, hver med delt dimensjon (For eksempel tid, høyde (eller dybde) , breddegrad, lengdegrad) .. Det er fint å fortsette å bruke denne datasettstypen for eksisterende datasett, men for nye datasett anbefaler vi å bruke EDDTableFromMultidimNcFiles i stedet.
*   [EDDTableFraNcCFFiler](#eddtablefromnccffiles)aggregerer data fraNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer som bruker et av filformatene som er spesifisert av[CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konvensjoner. Men for filer som bruker en av de flerdimensjonale CF DSG varianter, bruk[EDDTableFraMultidimNcFiler](#eddtablefrommultidimncfiles)I stedet.
*   [EDDTableFraNccsvFiler](#eddtablefromnccsvfiles)aggregerer data fra[NCCSV](/docs/user/nccsv-1.00)ASCII .csv-filer.
*   [EDDTableFraParquetFiler](#eddtablefromparquetfiles)håndterer data fra[Parquet](https://parquet.apache.org/)..
*   [EDDTableFraTreddsFiler](#eddtablefromthreddsfiles)  (Deprekert) aggregerer data fra filer med flere variabler med delte dimensjoner som betjenes av en[TREDDSOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/)..
*   [EDDTableFraWFSFiler](#eddtablefromwfsfiles)  (Deprekert) gjør en lokal kopi av alle data fra enArcGISKartServerWFSserver slik at dataene kan lagres rasktERDDAP™brukere.

For tiden støttes ingen andre filtyper. Men det er vanligvis relativt enkelt å legge til støtte for andre filtyper. Kontakt oss hvis du har en forespørsel. Eller hvis dataene dine er i et gammelt filformat som du vil flytte fra, anbefaler vi å konvertere filene til å væreNetCDFv3.ncfiler (og spesielt.ncfiler med[CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Sammenhengende tagget Array datastruktur --ERDDAP™Kan raskt hente ut data fra dem) ..NetCDFer et bredt støttet binærformat, gir rask tilfeldig tilgang til dataene, og er allerede støttet avERDDAP..

#### FraFiles Detaljer{#fromfiles-details} 
Følgende opplysninger gjelder alle underklasser av EDDTableFromFiles.
##### aggregering{#aggregation} 
Denne klassen samler data fra lokale filer. Hver fil har en (relativt) liten tabell med data.
    * Det resulterende datasettet vises som om alle filtabellene var kombinert (alle rekkene av data fra filen #1, pluss alle radene fra filen #2, ...) ..
    * Filene trenger ikke alle å ha alle de angitte variabler. Hvis en gitt fil ikke har en spesifisert variabel,ERDDAP™vil legge til manglende verdier etter behov.
    * Variablene i alle filene må ha de samme verdiene for[add\\_offset](#scale_factor),[missing\\_value](#missing_value),[\\_Fyll Verdi](#missing_value),[scale\\_factor](#scale_factor), og[enheter](#units)attributter (dersom noen) ..ERDDAP™kontroller, men det er en ufullkommen test - hvis det er forskjellige verdier,ERDDAPVet ikke hva som er riktig og derfor hvilke filer som er ugyldige. Hvis dette er et problem, kan du kanskje bruke[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)å løse problemet.
         
##### komprimerte filer{#compressed-files} 
Kildedatafilene for alle EDDTableFromFiles underklasser kan komprimeres eksternt (f.eks..tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, eller .Z) .. Se[Ekstern komprimert fildokumentasjon](#externally-compressed-files)..
     
##### Cached filinformasjon{#cached-file-information-1} 
* Når et EDDTableFromFiles datasett først lastes inn, leser EDDTableFromFiles informasjon fra alle relevante filer og oppretter tabeller (En rad for hver fil) med informasjon om hver gyldig fil og hver "bad" (forskjellige eller ugyldige) fil.
    * Tabellene lagres også på disk, somNetCDFv3.ncfiler i *bigParentDirectory* /datasett/ *Last2CharsOfDatasetID* / *datasetID* / i filer som heter:
dirTable.nc  (som har en liste over unike katalognavn) ,
fil Tabell.nc  (som holder tabellen med hver gyldig fils informasjon) ,
BadFiles.nc  (som holder tabellen med hver dårlig fils informasjon) ..
    * For å fremskynde tilgangen til et EDDTableFromFiles datasett (Men på bekostning av å bruke mer minne) Du kan bruke
[&lt;filTableInMemory&gt;true&lt;/filTableInMemory&gt;] (#filetablein memory)   
å fortelleERDDAP™å holde en kopi av filinformasjonstabellene i minnet.
    * Kopiering av filinformasjonstabellene på disken er også nyttig nårERDDAP™stenges ned og omstartes: det lagrer EDDTable Fra Filer fra å måtte lese om alle datafilene.
    * Når et datasett lastes på nytt,ERDDAP™Bare trenger å lese data i nye filer og filer som har endret seg.
    * Hvis en fil har en annen struktur fra de andre filene (For eksempel en annen datatype for en av variablene, eller en annen verdi for "[enheter](#units)" Attribut) ,ERDDAPLegger filen til listen over -bad - filer. Informasjon om problemet med filen vil bli skrevet til *bigParentDirectory* /logs/log.txt fil.
    * Du bør aldri trenger å slette eller jobbe med disse filene. Et unntak er: Hvis du fortsatt gjør endringer i et datasettdatasets.xmlsetup, kan du kanskje slette disse filene for å tvingeERDDAP™å lese alle filene på nytt siden filene vil leses/fortolkes annerledes. Hvis du noen gang trenger å slette disse filene, kan du gjøre det nårERDDAP™Jeg løper. (Så sett en[flagg](/docs/server-admin/additional-information#set-dataset-flag)Last datasettet på nytt ASAP.) MenERDDAP™vanligvis merker atdatasets.xmlInformasjonen samsvarer ikke med filen Tabellinformasjon og sletter filtabellene automatisk.
    * Hvis du ønsker å oppmuntreERDDAP™å oppdatere den lagrede datasettinformasjonen (Hvis du for eksempel nettopp har lagt til, fjernet eller endret noen filer til datasettets datakatalog) , bruk[flaggsystem](/docs/server-admin/additional-information#flag)å tvingeERDDAP™å oppdatere informasjonen om den cachede filen.
         
##### Forespørsler om håndtering{#handling-requests-1} 
*   ERDDAP™tabellbaserte dataforespørsler kan sette begrensninger på enhver variabel.
    * Når en klients forespørsel om data behandles, kan EDDTableFromFiles raskt se i tabellen med gyldig filinformasjon for å se hvilke filer som kan ha relevante data. Hvis for eksempel hver kildefil har data for en fast plasseringsbue, kan EDDTableFromFiles meget effektivt bestemme hvilke filer som kan ha data innenfor et gitt lengdeområde og breddeområde.
    * Siden den gyldige filinformasjonstabellen inneholder minste og maksimale verdi av hver variabel for hver gyldig fil, kan EDDTableFromFiles ofte håndtere andre spørsmål ganske effektivt. For eksempel, hvis noen av bøyene ikke har en lufttrykksensor, og en klient ber om data for airPressure&#33; = NaN, kan EDDTableFromFiles effektivt bestemme hvilke bøyer har lufttrykkdata.
         
##### Oppdaterer informasjon om Cached fil{#updating-the-cached-file-information-1} 
Når datasettet lastes på nytt, oppdateres den cachede filinformasjonen.
    
* Datasettet lastes opp regelmessig som bestemt av&lt;reloadEveryNMinutes&gt; i datasettets informasjon idatasets.xml..
* Datasettet lastes på nytt så snart som muligERDDAP™oppdager at du har lagt til, fjernet,[Touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (å endre filens siste Endret tid) eller endret en datafil.
* Datasettet lastes på nytt så snart som mulig hvis du bruker[flaggsystem](/docs/server-admin/additional-information#flag)..

Når datasettet lastes på nytt,ERDDAP™sammenligner de tilgjengelige filene med den cachede filinformasjonstabellen. Nye filer leses og legges til i den gyldige filtabellen. Filer som ikke eksisterer lenger, slippes fra den gyldige filtabellen. Filer der filtidsstemplet har endret seg leses og informasjonen oppdateres. De nye tabellene erstatter de gamle tabellene i minnet og på disken.
     
##### Dårlige filer{#bad-files-1} 
Tabellen over dårlige filer og grunnene til at filene ble erklært dårlige (skadet fil, manglende variabler, feil akseverdier etc.) e-post til e-post Alt Til e-postadresse (Kanskje du) Hver gang datasettet lastes på nytt. Du bør erstatte eller reparere disse filene så snart som mulig.
     
##### Manglende variabler{#missing-variables-1} 
Hvis noen av filene ikke har noen avdataVariabledefinert i datasettetsdatasets.xmlDet er ok. Når EDDTableFromFiles leser en av disse filene, vil det fungere som om filen hadde variabelen, men med alle manglende verdier.
     
##### I nærheten av sanntidsdata{#near-real-time-data} 
* EDDTableFromFiles behandler forespørsler om svært nylige data som et spesielt tilfelle. Problemet: Hvis filene som utgjør datasettet oppdateres ofte, er det sannsynlig at datasettet ikke vil bli oppdatert hver gang en fil endres. Så EDDTableFromFiles vil ikke være klar over de endret filene. (Du kan bruke[flaggsystem](/docs/server-admin/additional-information#flag)Men dette kan føre tilERDDAP™Laster datasettet på nytt nesten hele tiden. I de fleste tilfeller anbefaler vi det ikke.) I stedet, EDDTableFromFiles behandler dette med følgende system: NårERDDAP™få en forespørsel om data innen de siste 20 timene (For eksempel 8 timer siden til nå) ,ERDDAP™vil søke alle filer som har data de siste 20 timene. DerforERDDAP™trenger ikke å ha helt oppdaterte data for alle filene for å finne de nyeste dataene. Du bør fortsatt sette [&lt;Last på nytt EveryNMinutes&gt;] (#reloadvarelser) til en rimelig liten verdi (For eksempel 60) Men det trenger ikke å være lite (For eksempel 3) ..
     
    *    **Ikke anbefalt** organisering av nær-real-tid data i filene: Hvis du for eksempel har et datasett som lagrer data for mange stasjoner (eller bøy eller bane,) i mange år kan du arrangere filene slik at det for eksempel er én fil per stasjon. Men hver gang nye data for en stasjon kommer, må du lese en stor gammel fil og skrive en stor ny fil. Og nårERDDAP™Laster datasettet på nytt, legger det merke til at noen filer er endret, så det leser filene helt. Det er ineffektivt.
         
    *    **Anbefalt** organisering av nær-real-tid data i filene: Lagre dataene i biter, for eksempel alle data for én stasjon/buoy/trajeksjon i ett år (eller en måned) .. Så, når et nytt datum kommer, bare filen med årets (eller månedens) Data påvirkes.
        
        * Beste: BrukNetCDFv3.ncfiler med en ubegrenset dimensjon (tid) .. For å legge til nye data kan du legge til de nye dataene uten å måtte lese og skrive hele filen på nytt. Endringen gjøres svært effektivt og i hovedsak atomisk, så filen er aldri i en ukonsistent tilstand.
        * Ellers: Hvis du ikke/kan ikke bruke.ncfiler med en ubegrenset dimensjon (tid) , så når du må legge til nye data, må du lese og omskrive hele den berørte filen (Forhåpentligvis lite fordi det bare har et års (eller månedens) Verdi av data) .. Heldigvis alle filene i tidligere år (eller måneder) For den stasjonen forblir uendret.
        
I begge tilfeller nårERDDAP™Laster datasettet på nytt, de fleste filer er uendret; bare noen få små filer har endret seg og må leses.
         
##### Direktører{#directories-1} 
Filene kan være i én mappe, eller i en katalog og dens underkataloger (Rekursivt) .. Hvis det er et stort antall filer (For eksempel &gt; 1000) , operativsystemet (og dermed EDDTableFra Filer) vil fungere mye mer effektivt hvis du lagrer filene i en rekke underkataloger (én per år, eller én i måneden for datasett med svært hyppige filer) , slik at det aldri er et stort antall filer i en gitt katalog.
     
##### Eksterne kataloger og HTTP Range-forespørsler{#remote-directories-and-http-range-requests-1} 
*    **Eksterne kataloger og HTTP Range-forespørsler**   (AKA Byte Service, Byte Range forespørsler) --
    EDDGridFraNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles og EDDTableFromNcCFFiles, kan noen ganger betjene data fra.ncfiler på eksterne servere og tilgjengelig via HTTP hvis serveren støtter[Byte servering](https://en.wikipedia.org/wiki/Byte_serving)via HTTP-områdeforespørsler (HTTP-mekanismen for byte-tjeneste) .. Dette er mulig fordi netcdf-java (somERDDAP™Bruker til å lese.ncfiler) støtter lesing av data fra fjernkontrollen.ncfiler via HTTP range forespørsler.
    
     **Ikke gjør dette&#33;**   
Bruk i stedet&lt;cacheFromUrl&gt; system] (#cachefromurl) ..
    
##### CacheFromUrl{#cachefromurl} 
* [ ** &lt;cacheFromUrl&gt; ** ] (#cachefromurl) -
AlleEDDGridFra Filer og alle EDDTableFromFiles datasett støtter et sett tagger som fortellerERDDAP™å laste ned og vedlikeholde en kopi av alle eksterne datasetts filer, eller en cache av noen få filer (Last ned etter behov) .. **Dette er en utrolig nyttig funksjon.** 
    * Den&lt;cacheFromUrl&gt; tag lar deg angi en URL med en liste over eksterne datasetts filer fra en fjernfilliste.
        
        * Usamlede datasett i TREDDS, f.eks.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Denne serveren er ikke lenger pålitelig tilgjengelig.\\]
        * Usamlede datasett iHyraxf.eks.
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * De fleste Apache-lignende kataloglister, f.eks.
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * S3 bøtter, f.eks.
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
Dette kan imidlertid kreve en AWS-konto og mer installasjon.
Se[samarbeid med S3 Buckets iERDDAP™](#working-with-aws-s3-files)..
Du trenger vanligvis ikke å bruke cache FraUrl med filer i S3 bøtter hvis filene er ASCII-filer (f.eks.) fordiERDDAP™kan effektivt lese data fra bøtte direkte via en strøm.
        
        ERDDAP™vil kopiere eller lagre disse filene i datasettet&lt;filDir&gt; mappe. Hvis du trenger støtte for en annen type fjernfilliste (f.eks. FTP) Send din forespørsel til Chris. John på noaa.gov.
        
        * Standardverdi for&lt;cacheFromUrl&gt; tag er null. Hvis du ikke angir en verdi for&lt;cacheFromUrl&gt; tag, kopi/kache-systemet vil ikke bli brukt for dette datasettet.
        * Hvis datasettets&lt;fileRegex&gt; Det er noe annet enn .**ERDDAP™vil bare laste ned filer som passer til filen Regex.
        * Hvis datasettets&lt;rekursiv&gt; innstilling er sant og fjernfilene er i undermapper,ERDDAP™vil se i eksterne underkataloger som passer til datasettet [&lt;pathRegex&gt;] (#pathregex) Opprett samme katalogstruktur lokalt, og legg de lokale filene i de samme underkatalogene.
        * I Generer Datasett Xml, hvis du angir en&lt;cacheFromUrl&gt; verdi, Genererer Datasett Xml vil skape den lokale&lt;filDir&gt; mappe og kopier 1 fjernfil i den. Opprett datasett Xml vil da genereredatasets.xmlbit basert på den prøvefilen (angi prøve Fil= Ingenting) ..
        * Hvis datakilden er fjernERDDAP™, bruk[EDDGridFraErddap](#eddfromerddap)eller[EDDTableFraErddap](#eddfromerddap)i stedet for&lt;cacheFromUrl&gt;. På den måten, din lokaleERDDAP™vil synes å ha datasettet, men trenger ikke å lagre noen av dataene lokalt. Den eneste grunnen til å bruke&lt;cacheFromUrl&gt; for å få data fra en eksternERDDAP™er når du har en annen grunn til at du vil ha en lokal kopi av datafilene. I så fall:
            * Dette datasettet vil prøve å abonnere på datasettet på fjernkontrollenERDDAPslik at endringer i det datasettet vil kalle dette datasettets flagg Url, som får dette lokale datasettet til å laste og laste ned de endret eksterne filene. Derfor vil det lokale datasettet bli oppdatert umiddelbart etter endringer i fjerndatasettet.
            * Du bør sende e-post til administratoren på fjernkontrollenERDDAP™å be omdatasets.xmlfor fjerndatasettet slik at du kan gjøre datasettet i din lokaleERDDAP™ser ut som datasettet i fjernkontrollenERDDAP..
        * Hvis datakilden er fjernERDDAP™, vil det lokale datasettet prøve å abonnere på fjerndatasettet.
            * Hvis abonnementet lykkes, når fjernkontrollenERDDAPLaster på og har nye data, det vil kontakte flagget URL for dette datasettet, noe som gjør det til å laste om og laste ned de nye og / eller endret datafiler.
            * Hvis abonnementet mislykkes (uansett grunn) eller hvis du bare vil sikre at det lokale datasettet er oppdatert, kan du sette en[flagg](/docs/server-admin/additional-information#flag)for det lokale datasettet, slik at det vil laste på nytt, så det vil sjekke for nye og/eller endret eksterne datafiler.
        * Hvis datakilden ikke er fjerntliggendeERDDAP: datasettet vil sjekke for nye og/eller endret eksterne filer når det lastes på nytt. Dette er normalt kontrollert av [&lt;Last på nytt EveryNMinutes&gt;] (#reloadvarelser) .. Men hvis du vet når det er nye fjernfiler, kan du angi en[flagg](/docs/server-admin/additional-information#flag)for det lokale datasettet, så det vil laste om og sjekke for nye og/eller endret eksterne datafiler. Hvis dette skjer rutinemessig på et bestemt tidspunkt på dagen (f.eks. på 7am) , kan du gjøre en kron jobb å brukecurlKontakt flagget Url for dette datasettet, så det vil laste om og sjekke for nye og/eller endret eksterne datafiler.
    * Den&lt;cacheSizeGB&gt;-merket angir størrelsen på den lokale bufferen. Du trenger sannsynligvis bare å bruke dette når du jobber med skylagringssystemer som[Amazon S3](https://aws.amazon.com/s3/)som er et vanlig brukt lagringssystem som er en del av[Amazon Web Services (AWS) ](https://aws.amazon.com/).. Standard er -1.
        * Hvis verdien er&lt;=0 (For eksempel standardverdien på -1) ,
            ERDDAP™vil laste ned og vedlikeholde en **komplett kopi** av alle eksterne datasetts filer i datasettets&lt;filDir&gt;.
            * Dette er innstillingen som anbefales når det er mulig.
            * Hver gang datasettet lastes på nytt, sammenligner det navn, størrelser og sisteModifiserte tider av fjernfiler og lokale filer, og laster ned alle eksterne filer som er nye eller har endret.
            * Hvis en fil som var på ekstern server forsvinner,ERDDAP™vil ikke slette den tilsvarende lokale filen (ellers, hvis noe var midlertidig galt med fjernserveren,ERDDAP™kan slette noen eller alle de lokale filene&#33;) ..
            * Med denne innstillingen vil du vanligvis sette&lt;oppdaterEveryNMillis&gt; til -1, siden datasettet er klar over når det har kopiert nye datafiler på plass.
        * Hvis verdien er &gt;0,
            ERDDAP™vil laste ned filer fra fjerndatasettet etter behov i en lokal **cache** (i datasettets&lt;filDir&gt;) med en terskelstørrelse på det angitte antallet GB.
            * Cacheen må være stor nok til å holde minst flere datafiler.
            * Generelt vil jo større cache, jo bedre, fordi den neste forespurte datafilen vil være mer sannsynlig å være i cache allerede.
            * Caching bør kun brukes nårERDDAP™kjører på en sky dataserver (For eksempel, en AWS beregnende instans) og fjernfilene i et skylagringssystem (For eksempel AWS S3) ..
            * Når diskplassen som brukes av lokale filer overstiger cache SizeGB,ERDDAP™Snart vil (Kanskje ikke umiddelbart) slette noen av de cachede filene (i dag, basert på minst brukte (LRU) algoritme) til diskplassen som brukes av de lokale filene er&lt;0.75\\* cacheSizeGB (i målet) .. Ja, det er tilfeller der LRU utfører veldig dårlig - det er ingen perfekt algoritme.
            *   ERDDAP™vil aldri prøve å slette en cached fil somERDDAP™Begynnte å bruke i de siste 10 sekunder. Dette er et ufullstendig system for å håndtere cachesystemet og datafillesersystemet er bare løst integrert. På grunn av denne regelen,ERDDAP™kan ikke være i stand til å slette nok filer til å nå sitt mål, i hvilket tilfelle det vil skrive ut en advarsel til log.txt-filen, og systemet vil kaste bort mye tid som prøver å rendre cache, og det er mulig at størrelsen på filene i cache kan mye overskride cacheSizeGB. Hvis dette noen gang skjer, bruk en større cacheSizeGB-innstilling for det datasettet.
            * I dag,ERDDAP™Kontroller aldri om den eksterne serveren har en nyere versjon av en fil som er i den lokale cache. Hvis du trenger denne funksjonen, vennligst e-post Chris. John på noaa.gov.
        * Selv om bruken av de samme merkenavnene kan bety at kopisystemet og cache-systemet bruker det samme underliggende systemet, er det ikke riktig.
            * Kopieringssystemet starter proaktivt oppgaveThread oppgaver for å laste ned nye og endret filer hver gang datasettet lastes på nytt. Bare filer som faktisk er kopiert til den lokale katalogen er tilgjengelige viaERDDAP™- Datasett.
            * Cachesystemet får fjernfillisten hver gang datasettet lastes på nytt og later som om alle disse filene er tilgjengelige viaERDDAP™- Datasett. Interessant, alle fjernfilene vises selv i datasettets / filer/ nettsider og er tilgjengelige for nedlasting (Selv om kanskje bare etter en forsinkelse mens filen først lastes ned fra den eksterne serveren til den lokale cache.) 
        * Datasett som bruker cacheSizeGB kan ha nytte av å bruke en[nThreds](#nthreads)innstilling større enn 1, fordi dette vil gjøre det mulig å laste ned mer enn 1 ekstern fil om gangen.
    * Den&lt;cachePartialPathRegex&gt; tag er en sjelden brukt tag som kan angi et alternativ for datasettets [&lt;pathRegex&gt;] (#pathregex) .. Standarden er null.
        * Bare bruk dette hvis du kopierer hele datasettet via standarden&lt;cacheSizeGB&gt; verdi på -1. Med&lt;cacheSizeGB&gt; -verdier på &gt;1, vil dette bli ignorert fordi det er ikke sensisk.
        * Se [dokumentasjonen for&lt;pathRegex&gt;] (#pathregex) For veiledning om hvordan å bygge regulær.
        * Hvis dette er angitt, vil det bli brukt hver gang datasettet lastes på nytt, bortsett fra første gang et datasett lastes på nytt i begynnelsen av en måned.
        * Dette er nyttig når fjerndatasettet lagres i en labyrint av underkataloger og når det aller fleste av disse filene sjelden, om noen gang, endres. (&lt;hoste&gt; NASA&lt;hoste&gt;) Du kan for eksempel angi en&lt;cachePartialPathRegex&gt; som bare matcher gjeldende år eller gjeldende måned. Disse regulærene er svært vanskelig å angi, fordi alle delvise og fulle banenavn må matche&lt;cachePartialPathRegex &gt; og fordi&lt;cachePartialPathRegex&gt; må fungere med eksterne URLer og lokale mapper. Et virkelig eksempel er:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
URL-adressen ovenfor har filer i undermapper basert på år (f.eks. 2018) og årets dag (f.eks. 001, 002, ..., 365 eller 366) ..
Merk at&lt;cachePartialPathRegex&gt; begynner med .\\*
deretter har en bestemt underkatalog som er vanlig for eksterne nettadresser og lokale mapper, for eksempel /v4\\.1/
så har en rekke hekkede fangstgrupper der det første alternativet er ingenting
og det andre alternativet er en bestemt verdi.
            
Eksemplet ovenfor vil bare matche kataloger for andre 10 dager i 2018, f.eks.
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Denne serveren er ikke lenger pålitelig tilgjengelig.\\]  
dag 011, 012, ..., 019.
             (Se dette[Regulatorisk dokumentasjon](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og[Regular tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)..)   
Hvis du trenger hjelp til å skape&lt;cachePartialPathRegex&gt;, vennligst e-post den&lt;cacheFra Url&gt; til Chris. John på noaa.gov.
            
        * En felles tilnærming: Hvis du vil bruke&lt;cachePartialPathRegex&gt;, ikke bruk det i utgangspunktet, fordi du vilERDDAP™å laste ned alle filene i utgangspunktet. EtterERDDAP™har lastet ned alle filene, legger den til datasettets bit avdatasets.xml..
             
##### Tusenvis av filer{#thousands-of-files} 
Hvis datasettet ditt har mange tusen filer,ERDDAP™kan være langsom til å svare på forespørsler om data fra dette datasettet. Det er to problemer her:
 

1. Antall filer per katalog.
internt,ERDDAP™fungerer med samme hastighet uavhengig av om n-filer er i én katalog eller spredt i flere kataloger.
     
Men det er et problem: Jo flere filer i en gitt katalog, jo langsommere er operativsystemet ved å returnere listen over filer i katalogen (per fil) tilERDDAP.. Svartiden kan være O (n log n) .. Det er vanskelig å si hvor mange filer i én katalog er for mange, men 10 000 er sannsynligvis for mange. Så hvis oppsettet ditt genererer massevis av filer, kan en anbefaling her være: sette filene i logisk organiserte underkataloger (f.eks. stasjon eller stasjon/år) ..
    
En annen grunn til å bruke underkataloger: hvis en bruker vil brukeERDDAP's"files"systemet for å finne navnet på den eldste filen for stasjon X, er det raskere og mer effektivt hvis filene er i stasjon / år underkataloger, fordi mye mindre informasjon må overføres.
    
2. Totalt antall filer.
For tabelldatasett,ERDDAP™holde oversikt over verdiområdet for hver variabel i hver fil. Når en bruker gjør en forespørsel,ERDDAP™må lese alle data fra alle filene som kan ha data som samsvarer med brukerens forespørsel. Hvis brukeren ber om data fra en begrenset tid (For eksempel en dag eller en måned) , såERDDAP™vil ikke trenger å åpne for mange filer i datasettet ditt. Men det er ekstreme tilfeller der nesten hver fil kan ha samsvarende data (f.eks. når vannTemperatur=13.2C) .. Siden det tarERDDAP™litt tid (delvis søketiden på HDD, delvis tiden til å lese filhodet) Bare for å åpne en gitt fil (og mer om det er mange filer i katalogen) , det er en betydelig tidsstraff hvis det totale antall filer somERDDAP™Åpent er veldig stort. Selv å åpne 1000 filer tar betydelig tid. Så det er fordeler å periodisk konsolidere de daglige filene i større deler (For eksempel 1 stasjon i 1 år) .. Jeg forstår at du kanskje ikke vil gjøre dette av forskjellige grunner, men det fører til mye raskere svar. I ekstreme tilfeller (Jeg håndterer for eksempel et GTSPP-datasett som har ~ 35 millioner kildefiler) , betjene data fra et stort antall kildefiler er upraktisk fordiERDDAPSvaret på enkle spørsmål kan ta timer og bruke tonn minne. Ved å konsolidere kildefiler til et mindre tall (for GTSPP, jeg har 720 nå, 2 per måned) ,ERDDAP™kan reagere rimelig raskt. Se[Millioner av filer](#millions-of-files)  
     

N.B. Solid State Drives er flott&#33; Den raskeste og enkleste måten å hjelpe påERDDAP™håndtere et stort antall (liten) filer er å bruke en solid tilstandsstasjon. Se[Solid State Drives er flott&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Millioner av filer{#millions-of-files} 
* Noen datasett har millioner av kildefiler.ERDDAP™kan håndtere dette, men med blandede resultater.
    
    * For forespørsler som bare involverer variabler som er oppført i [&lt;subsetVariables&gt;] (#subsetvariables) ,ERDDAP™har all nødvendig informasjon som allerede er hentet fra datafilene og lagret i én fil, slik at den kan svare svært, svært raskt.
    * For andre forespørslerERDDAP™kan skanne datasettets[cached filinformasjon](#cached-file-information)og finne ut at bare noen få av filene kan ha data som er relevant for forespørselen og dermed reagere raskt.
    * For andre forespørsler (For eksempel vannTemperatur=18 grad\\_C) der en fil kan ha relevante data,ERDDAP™må åpne et stort antall filer for å se om hver av filene har data som er relevant for forespørselen. Filene åpnes sekvensielt. På alle operativsystemer og ethvert filsystem (andre enn solide tilstandsstasjoner) Dette tar lang tid (såERDDAP™Svarer sakte) og virkelig knytter opp filsystemet (såERDDAP™svarer sakte på andre forespørsler) ..
    
Heldigvis finnes det en løsning.
    
    1. Konfigurer datasettet på en ikke-offentligERDDAP™  (Din personlige datamaskin?) ..
    2. Opprett og kjør et skript som krever en rekke.ncCF-filer, hver med en stor del av datasettet, vanligvis en tidsperiode (Alle dataene i en gitt måned) .. Velg tidsperioden slik at alle resulterende filer er mindre enn 2GB (Forhåpentligvis større enn 1 GB) .. Hvis datasettet har data i nærheten av sanntid, kjør skriptet for å regenerere filen for gjeldende tidsperiode (For eksempel denne måneden) Ofte (Hvert tiende minutt? Hver time?) .. Forespørsler tilERDDAP™for.ncCF-filer oppretter enNetCDFv3.ncfil som bruker[CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Sammenhengende raged Array datastrukturer).
    3. Sett opp en[EDDTableFraNcCFFiler](#eddtablefromnccffiles)Datasett på offentligheten dinERDDAP™som får data fra.nc (CF) Filer.ERDDAP™kan raskt trekke ut data fra disse filene. Siden det nå er dusinvis eller hundrevis (I stedet for millioner) av filer, selv omERDDAP™må åpne alle filene, det kan gjøre det raskt.
    
Ja, dette systemet tar litt tid og innsats å sette opp, men det fungerer veldig, veldig bra. De fleste forespørsler kan behandles 100 ganger raskere enn tidligere.
    \\[Bob visste at dette var en mulighet, men det var Kevin O'Brien som først gjorde dette og viste at det fungerer bra. Nå, Bob bruker dette til GTSPP-datasettet som har om lag 18 millioner kildefiler og somERDDAP™Nå tjener vi via rundt 500.nc (CF) Filer.\\]
    
N.B. Solid State Drives er flott&#33; Den raskeste og enkleste måten å hjelpe påERDDAP™håndtere et stort antall (liten) filer er å bruke en solid tilstandsstasjon. Se[Solid State Drives er flott&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### Store filer{#huge-files} 
* En enkelt enorm datafil (spesielt store ASCII-datafiler) kan forårsake en OutOfMemory feil. Hvis dette er problemet, bør det være åpenbar fordiERDDAP™vil ikke laste datasettet. Løsningen, hvis det er mulig, er å dele filen i flere filer. Ideelt sett kan du dele filen i logiske deler. Hvis filen for eksempel har 20 måneders dataverdi, kan den deles i 20 filer, hver med 1 måneds dataverdi. Men det er fordeler selv om hovedfilen er delt opp vilkårlig. Denne tilnærmingen har flere fordeler: a) Dette vil redusere minnet som trengs for å lese datafilene til 1/20, fordi bare én fil leses om gangen. b) Ofte,ERDDAP™kan håndtere forespørsler mye raskere fordi det bare må se i en eller noen få filer for å finne data for en gitt forespørsel. c) Hvis datainnsamlingen pågår, kan de eksisterende 20 filene forbli uendret, og du trenger bare å endre en, liten, ny fil for å legge til neste måneds dataverdi i datasettet.
     
##### FTP-problem/advice{#ftp-troubleadvice-1} 
* Hvis du FTP nye datafiler tilERDDAP™server mensERDDAP™løper, det er muligheten til atERDDAP™vil laste datasettet på nytt under FTP-prosessen. Det skjer oftere enn du kanskje tror&#33; Hvis det skjer, vises filen å være gyldig (Den har et gyldig navn) , men filen er ikke gyldig. HvisERDDAP™prøver å lese data fra den ugyldige filen, vil den resulterende feilen gjøre filen lagt til i tabellen over ugyldige filer. Dette er ikke bra. For å unngå dette problemet, bruk et midlertidig filnavn når FTP'ing filen, for eksempel ABC2005.nc \\_TEMP . Deretter filenNameRegex test (Se nedenfor) vil vise til at dette ikke er en relevant fil. Når FTP-prosessen er fullført, endrer du filen til riktig navn. Omdøpingsprosessen vil gjøre filen relevant på et øyeblikk.
    
##### Filnavn pakker ut{#file-name-extracts} 
\\[Denne funksjonen er utformet. Vennligst bruk[\\*\\* \\* filName pseudosourceName](#filename-sourcenames)I stedet.\\]  
EDDTableFromFiles har et system for å trekke ut en streng fra hvert filnamn og bruke det for å gjøre en pseudodatavariabel. For tiden er det ikke noe system for å tolke disse strengene som datoer/tider. Det er flere XML-merker å konfigurere dette systemet. Hvis du ikke trenger del eller hele dette systemet, må du bare ikke angi disse taggene eller bruke "verdier.

* PreExtractRegex er et[regulært uttrykk](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) brukes til å identifisere tekst som skal fjernes fra starten av filnavnet. Fjerningen skjer bare dersom regulært samsvarer. Dette starter vanligvis med å matche starten på filnavnet.
* post ExtractRegex er et regelmessig uttrykk som brukes til å identifisere tekst som skal fjernes fra slutten av filnavnet. Fjerningen skjer bare dersom regulært samsvarer. Dette slutter vanligvis med "$" for å matche slutten av filnavnet.
* ekstraktRegex Hvis det er til stede, brukes dette regulære uttrykket etter preExtractRegex og postExtractRegex for å identifisere en streng som skal ekstraheres fra filnavnet (For eksempelstationID) .. Hvis regulært regulært ikke samsvarer, brukes hele filnavnet (minus preExtract og post Pakk ut) .. Bruk ".\\* to for å matche hele filnavnet som er igjen etter preExtractRegex og postExtractRegex.
* kolonne NameForExtract er datakolonnen kildenavn for de ekstraherte strengene. AdataVariableMed dette[sourceName](#sourcename)Må være idataVariables-liste (med alle datatyper, men vanligvis streng) ..

For eksempel, hvis et datasett har filer med navn som XYZAble.nc, XYZBaker.nc, XYZCharlie.nc, ... og du vil skape en ny variabel (stationID) når hver fil leses som vil ha stasjon ID-verdier (Able, Baker, Charlie, ...) ekstrahert fra filnavnene, kan du bruke disse taggene:

*   &lt;preExtractRegex&gt;^XYZ&lt;/preExtractRegex&gt;
Den opprinnelige ^ er et regulært uttrykk spesielt tegn som tvingerERDDAP™å se etter XYZ i begynnelsen av filnavnet. Dette forårsaker at XYZ, hvis funnet i begynnelsen av filnavnet, fjernes (for eksempel filnamnet XYZAble.ncblir Able.nc) ..
*   &lt;postExtractRegex&gt;\\.nc$&lt;/postExtractRegex&gt;
$ på slutten er et regelmessig uttrykk spesielt tegn som tvingerERDDAP™å se etter.ncved slutten av filnavnet. Siden . er et regulært uttrykk spesielt tegn (som matcher ethvert tegn) Det kodes som \\. her (fordi 2E er det heksadesimale tegnnummeret i en periode) .. Dette forårsaker.ncHvis funnet i slutten av filnavnet, som skal fjernes (for eksempel det delvise filnavnet Able.ncblir Able) ..
*   &lt;ekstraktRegex&gt;.\\*&lt;/Extra Regex&gt;
.\\* regulært uttrykk passer alle gjenværende tegn (for eksempel det delvise filnavnet Able blir ekstrakt for den første filen) ..
*   &lt;kolonneNamestationID&lt;/kolonneName
Dette fortellerERDDAP™å opprette en ny kildekolonne kaltstationIDNår du leser hver fil. Hver rekke data for en gitt fil vil ha teksten hentet fra sitt filnamn (For eksempel Able) som verdien istationIDkolonne.

I de fleste tilfeller er det mange verdier for disse ekstrakt tags som vil gi de samme resultatene - vanlige uttrykk er svært fleksible. Men i noen tilfeller er det bare én måte å få ønsket resultat på.
     
##### PseudosourceNames{#pseudo-sourcenames} 
Hver variabel i alle datasett iERDDAP™har en [&lt;sourceName&gt;] (#kildenavn) som angir kildens navn for variabelen. EDDTableFromFiles støtter noen pseudosourceNamesom trekker ut en verdi fra et annet sted (For eksempel filnavnet eller verdien av en global egenskap) og fremme den verdien til å være en kolonne av konstante verdier for den delen av data (f.eks. tabellen i filens data) .. For disse variablene må du angi variabelens datatype via [&lt;dataType&gt;] (#datatype) Tag. Hvis den ekstraherte informasjonen er en datoTime-streng, angir du formatet på datoTime-strengen i[enhetsattributt](#string-time-units).. pseudoensourceNameAlternativer er:
 
###### Global:sourceNames{#global-sourcenames} 
En global metadata-attributt i hver kildedatafil kan markedsføres til å være en kolonne med data. Hvis en variabel er&lt;sourceName&gt; har formatet
```
        <sourceName>global:*attributeName*</sourceName>
```
NårERDDAP™å lese data fra en fil,ERDDAP™vil søke etter en global egenskap av dette navnet (For eksempel PI) og opprette en kolonne fylt med attributtens verdi. Dette er nyttig når attributten har forskjellige verdier i ulike kildefiler, fordi ellers ville brukerne bare se en av disse verdiene for hele datasettet. For eksempel
```
        <sourceName>global:PI</sourceName>
```
Når du fremmer en egenskap som skal være data,ERDDAP™Fjerner den tilsvarende egenskapen. Dette er hensiktsmessig fordi verdien sannsynligvis er forskjellig i hver fil; mens i det samlede datasettet iERDDAP™Den vil bare ha én verdi. Hvis du vil, kan du legge til en ny verdi for attributtet for hele datasettet ved å legge til en ny verdi for attributtet&lt;navn=" *attributt Navn* "&gt; *Ny Verdi* &lt;/att&gt; til datasettets globale [&lt;addAttributes&gt;] (#addattributes) .. Globale egenskaper somERDDAP™krever for eksempel institusjon, må du legge til en ny verdi for egenskapen.
     
###### variabel:sourceNames{#variable-sourcenames} 
En variabels metadataattributt i hver fil kan fremmes til å være en kolonne med data. Hvis en variabel er&lt;[sourceName](#sourcename)\\&gt; har format
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
NårERDDAP™å lese data fra en fil,ERDDAP™vil se etter den angitte egenskapen (For eksempel ID) den angitte variabelen (For eksempel instrumenter) og opprette en kolonne fylt med attributtens verdi. Foreldrevariabelen (For eksempel instrumenter) trenger ikke å være en avdataVariablei datasettets definisjon iERDDAP.. For eksempel
```
        <sourceName>variable:instrument:ID</sourceName>
```
Dette er nyttig når attributten har forskjellige verdier i ulike kildefiler, fordi ellers ville brukerne bare se en av disse verdiene for hele datasettet.

Når du fremmer en egenskap som skal være data,ERDDAP™Fjerner den tilsvarende egenskapen. Dette er hensiktsmessig fordi verdien sannsynligvis er forskjellig i hver fil; mens i det samlede datasettet iERDDAP™Den vil bare ha én verdi. Hvis du vil, kan du legge til en ny verdi for attributtet for hele datasettet ved å legge til en ny verdi for attributtet&lt;navn=" *attributt Navn* "&gt; *Ny Verdi* &lt;/att&gt; til variabelen [&lt;addAttributes&gt;] (#addattributes) .. For attributter somERDDAP™krever for eksempel,ioos\\_category  (avhengig av ditt oppsett) Du må legge til en ny verdi for egenskapen.
        
###### filNamesourceNames{#filename-sourcenames} 
Du kan trekke ut en del av en fils filName og promotere det for å være en kolonne med data. Format for denne pseudoen [&lt;sourceName&gt;] (#kildenavn) er
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
For eksempel
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Når EDDTableFromFiles leser dataene fra en fil, vil den sørge for at filenName (for eksempel A201807041442.slcpV1.nc) matcher det angitte regulære uttrykket ("regex") og trekk ut det angitte (I dette tilfellet den første) fangstgruppe (som er en del omgitt av parentes) , for eksempel  "201807041442". (Se dette[Regulatorisk dokumentasjon](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og[Regular tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)..) Regulatoriet kan angis som en streng med eller uten omliggende sitater. Hvis regulært regulært er angitt som en streng med omgivende sitater, må strengen være[JSON-stil streng](https://www.json.org/json-en.html)  (med spesielle tegn rømt med \\ tegn) .. Opptaksgruppens nummer er vanligvis 1 (den første fangegruppen) Men det kan være et hvilket som helst tall.
     
###### baneNamesourceNames{#pathname-sourcenames} 
Du kan trekke ut en del av en fils fulle vei Navn (/kataloger/filName.ext) og fremme det å være en kolonne av data. Format for denne pseudoen [&lt;sourceName&gt;] (#kildenavn) er
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
For eksempel
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Når EDDTableFromFiles leser dataene fra en fil, vil det sørge for at hele banenName (For eksempel /data/myDatasetID/BAY17/B201807041442.nc.. For denne testen vil katalogseparatorene alltid være'/', aldri \\ \") matcher det angitte regulære uttrykket ("regex") og trekk ut det angitte (I dette tilfellet den første) fangstgruppe (som er en del omgitt av parentes) , for eksempel  "BAY17". (Se dette[Regulatorisk dokumentasjon](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og[Regular tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)..) Regulatoriet kan angis som en streng med eller uten omliggende sitater. Hvis regulatoriet er spesifisert som en streng med omgivende sitater, må strengen være en[JSON-stil streng](https://www.json.org/json-en.html)  (med spesielle tegn rømt med \\ tegn) .. Opptaksgruppens nummer er vanligvis 1 (den første fangegruppen) Men det kan være et hvilket som helst tall.
         
##### "0 filer" Feilmelding{#0-files-error-message-2} 
* Hvis du løper[Generer DatasetsXml](#generatedatasetsxml)eller[DasDds](#dasdds), eller hvis du prøver å laste en EDDTabellFra... Filer datasett iERDDAP™, og du får en  "0 filer" feilmelding som indikerer atERDDAP™funnet 0 samsvarende filer i katalogen (når du tror det er samsvarende filer i den katalogen) :)
    * Sjekk at filene virkelig er i den katalogen.
    * Kontroller stavingen av mappenavnet.
    * Sjekk filenNameRegex. Det er virkelig, veldig enkelt å gjøre feil med regulære. For testformål, prøv regulær .\\* som bør matche alle filnavn. (Se dette[Regulatorisk dokumentasjon](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og[Regular tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)..) 
    * Sjekk at brukeren som kjører programmet (For eksempel bruker=tomcat (?) for Tomcat/ERDDAP) Har \"lese\" tillatelse til disse filene.
    * I noen operativsystemer (For eksempel SELinux) og avhengig av systeminnstillinger, må brukeren som kjørte programmet ha \"lese\" tillatelse til hele kjede av mapper som fører til katalogen som har filene.
         
##### standardisering Hva{#standardizewhat} 
* Når noen underklasse av EDDTableFromFiles samler sammen et sett kildefiler, for en gitt variabel, må alle kildefilene ha identiske attributtverdier for flere attributter:scale\\_factor,add\\_offset,  \\_Usignertmissing\\_value,_FallValue og enheter). Tenk på det: Hvis en fil har vindhastighetsenheter=knotter og en annen har vindhastighetsenheter=m/s, bør dataverdiene fra de to filene ikke inkluderes i samme samlet datasett. Så når EDDTableFromFiles først oppretter datasettet, leser den attributtverdiene fra én fil, og avviser alle filene som har forskjellige verdier for de viktige attributtene. For de fleste samlinger av filer, er dette ikke et problem fordi attributtene til alle variabler er konsekvente. Men for andre samlinger av filer, kan dette føre til 1%, 10%, 50%, 90% eller til og med 99% av filene som blir avvist som "dårlige" filer. Det er problemer.
    
EDDTableFra filer har et system som skal håndtere dette problemet: standardisere Hva? Standardisering Hvilken innstilling forteller EDDTableFromFiles å standardisere filene så snart den leser dem, før EDDTableFromFiles ser på attributtene for å se om de er konsekvente.
    
Flip-siden er: Hvis datasettet ikke har dette problemet, ikke bruk standardisering Hva? standardisering Hva har noen potensielle risikoer (diskutert nedenfor) og ineffektivitet. Hvis du ikke trenger funksjonene til å standardisere Det er ikke nødvendig å møte potensielle risikoer og ineffektivitet. Den største ineffektiviteten er: Når ulike standarder Hvilke alternativer brukes av et datasett, det innebærer at kildefilene lagrer data på betydelig forskjellige måter (For eksempel med forskjelligscale\\_factorogadd\\_offset, eller med tidsstrenger ved hjelp av ulike formater) .. For en gitt begrensning i en brukerforespørsel er det således ingen måte åERDDAP™å gjøre en enkelt kildenivå begrensning som kan brukes til alle kildefiler. SåERDDAP™Kan bare anvende de berørte restriksjonene på et høyere nivå. SåERDDAP™må lese data fra flere filer før bruk av de høyere grensene på destinasjonsnivå. Så forespørsler til datasett som bruker standardisering Det som tar lengre tid å bli behandlet.
    
Hvis du vil bruke dette systemet, må du angi
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
i[datasets.xmlFor EDD-tabellen... Fildatasett](#eddtablefromfiles-skeleton-xml)(Innenfor&lt;datasett&gt; tag).
    
Den *standardisering Hva* verdi angir hvilke endringer EDDTableFromFiles bør prøve å bruke. Endringene er summen av noen kombinasjon av:
    
1. Opppakke
Dette gjør mange vanlige og sikre operasjoner for å standardisere numeriske kolonner i filene:
    * Hvisscale\\_factorog/elleradd\\_offsetattributter er tilstede, fjerne dem og bruke dem for å pakke ut dataverdier.
    * Pakk ut pakkede attributter (f.eks. faktisk\\_min, faktisk\\_max,actual\\_range,data\\_min,data\\_max, data\\_område,valid\\_min,valid\\_max,valid\\_range) Hvis det er tilstede, hvis variabelen er pakket, og hvis attributtverdiene er pakket (Dette er vanskelig, men rimelig pålitelig) ..
    * Hvis \\_FallValue og/ellermissing\\_valueer tilstede, konvertere disse dataverdiene tilERDDAP' standard" manglende verdier: MAX\\_VALUE for heltallstyper (f.eks. 127 for byte, 32.767 for kort, og 2 147.483.647 for intensjoner, 9223372036854775807 i lang tid) og NaN for dobbler og flyter.
    * Fjern den gamle__FillValue og/ellermissing\\_valueattributter (dersom noen) , og erstatte dem med bare  \\_FillValue=\\[denERDDAP™standard manglende verdi\\]..
         
2. Standardisere numeriske tider
Hvis en numerisk kolonne har CF-stil numeriske tidsenheter (" *timeUnites* siden *baseTime* ", f.eks. "dager siden 1900-01-01") , dette konverterer datoen Tidsverdier i"seconds since 1970-01-01T00:00:00Z"verdier og endrer enhetens attributt for å indikere det.
Hvis dette er valgt og det er en sjanse for at denne variabelen harscale\\_factorelleradd\\_offset#1 må også velges.
     
3. Bruk strengmissing\\_value  
Hvis en strengkolonne har \\_FillValue og/ellermissing\\_valueattributter, dette konverterer disse verdiene til " og fjerner attributtene.
     
4. Finn tallmissing\\_value  
Hvis en numerisk kolonne ikke har -_FillValue ellermissing\\_valueattributter, dette prøver å identifisere et udefinert numeriskmissing\\_value  (f.eks. -999, 9999, 1e37f) og konvertere forekomster av det til standardverdiene (MAX\\_VALUE for heltallstyper, og NAN for dobbler og flyter) ..
     **Dette alternativet har risiko:** hvis den største eller minste gyldige dataverdien ser ut som en manglende verdi (f.eks. 999) , vil de gyldige dataverdiene bli konvertert til manglende verdier (f.eks. NaN) ..
     
5. Endre streng "N/A" til"
For hver strengkolonne, konverter flere strenger som vanligvis brukes til å indikere en manglende strengverdi til " For tiden ser dette etter ".",,,--- " " "?"?"?"?"?" " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " " "."." "." " " " " " " " " " " "." " " " "."." "."."."."."."."." " "."."." "."."."." "."." " "." " "." "."." " " " " " " "." " " "." "." " " " "." " " " " " " " " " " " " Strengsøket er case-insensitive og brukes etter at strengene er trim'd. Andre og andre er ikke spesielt på listen.
     **Dette alternativet har risiko:** Strenger som du anser som gyldige verdier kan konverteres til
     
6. Standardisere til streng ISO 8601 datotid
For hver strengkolonne, prøv å konvertere ikke-rent-numeriske streng datotider (f.eks. "2. januar 2018") til ISO 8601 StrengdatoTider ("2018-01-02") ..
     **Note** at alle dataverdier for kolonnen må bruke samme format, ellers vil dette alternativet ikke gjøre noen endringer i en gitt kolonne.
     **Dette alternativet har risiko:** Hvis det er en kolonne med strengverdier som bare ser ut som en vanlig dato Tidsformat, vil de bli konvertert til ISO 8601 Streng datoTimes.
     
7. Standardisere kompakte datotider til ISO 8601-datotider
For hver streng- eller heltallstype-kolonne, prøv å konvertere rent numeriske strengdatotider (f.eks. 20180102") til ISO 8601 StrengdatoTider ("2018-01-02") ..
     **Note** at alle dataverdier for kolonnen må bruke samme format, ellers vil dette alternativet ikke gjøre noen endringer i en gitt kolonne.
     **Dette alternativet har risiko:** Hvis det er en kolonne med verdier som ikke er kompakt dato Tider, men ser ut som kompakte dateTimes, vil de bli konvertert til ISO 8601 Streng datoTimes.
     
8. Standardisere enheter
Dette prøver å standardisere enhetsstrengen for hver variabel. For eksempel "meter i sekundet", "meter/sekunder","m.s^-1","m s-1",  "m.s-1" vil alle bli konvertert til  "m.s- Dette endrer ikke dataverdiene. Dette fungerer bra for gyldigUDUNITSenhetsstrenger, men kan ha problemer med ugyldige eller komplekse strenger. Du kan håndtere problemer ved å spesifisere spesifikke fra til par i&lt;standardiseringUnits&gt; iERDDAP's
    \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fil. Send alle endringer til Chris. John på noaa.gov slik at de kan integreres i standardmeldingene.xml.
     **Dette alternativet har risiko:** Dette kan mangle noen komplekse eller ugyldige enheter; Men du kan bruke arbeidsrunden beskrevet ovenfor til å omgå problemer hvis de oppstår.
         
    
Standardverdien av standardisering Hva er 0, som ikke gjør noe.

Hvis/når du endrer standardverdien Neste gang datasettet lastes på nytt,ERDDAP™vil lese om alle datafilene for datasettet for å gjenoppbygge mini-database med informasjon om hver fil. Hvis datasettet har mange filer, vil det ta lang tid.
    
Merknader:

* En vanskelig ting er -
Standardisering Hvilken innstilling brukes for alle kolonner i kildefilen. Så, for eksempel, ved å bruke #2048 kan vellykket konvertere en kolonne av kompakte streng datoTimes til ISO 8601 streng datoTimes, men det kan også feilaktig konvertere en kolonne med strenger som bare skjer å se ut som kompakte datotider.
     
*   datasets.xmlog generere datasett Xml-
Det er spesielt vanskelig å få innstillingene riktig idatasets.xmlå gjøre datasettet ditt fungerer som du vil det. Den beste tilnærmingen (Som alltid) er:
    1. Bruk[Generer DatasetsXml](#generatedatasetsxml)og angi verdien av standardisering Hva du vil bruke.
    2. Bruk[DasDds](#dasdds)å sikre at datasettet lastes riktig og gjenspeiler standardisering Hvilken innstilling du har angitt.
    3. Test datasettet for hånd når det er iERDDAP™For å sikre at de berørte variabler fungerer som forventet.
         
* Risiko -
Alternativer #256 og ovenfor er mer risikofylte, dvs. det er en større sjanse for atERDDAP™vil gjøre en endring som ikke bør gjøres. For eksempel kan alternativet #2048 ved et uhell konvertere en variabel med stasjon ID-strenger som alle bare tilfeldigvis ser ISO 8601 "kompakt" datoer (f.eks. 20180102) i ISO 8601"extended"datoer ("2018-01-02") ..
     
* Sakte etter en endring -
Siden verdien av standardisering Hva endrer dataverdiene som EDDTableFromFiles ser for hver datafil, hvis du endrer standardisering Hvilken innstilling, vil EDDTableFromFiles kaste bort all den cachede informasjonen om hver fil (som inkluderer min og max for hver datavariabel i hver fil) Les hver datafil på nytt. Hvis et datasett har et stort antall filer, kan dette være svært tidkrevende, så det vil ta lang tid for datasettet å laste om første gangERDDAP™Laster den på nytt etter endringen.
     
* Heuristics-
Alternativer #256 og ovenfor bruker heuristics til å gjøre sine endringer. Hvis du kommer over en situasjon der heuristikken tar en dårlig beslutning, vennligst e-post en beskrivelse av problemet til Chris. John ved noaa. gov slik at vi kan forbedre heurismen.
     
* Alternativer --
Hvis et av standardtilbudene ikke løser et problem for et gitt datasett, kan du løse problemet ved å gjøre en[.ncml-fil](#ncml-files)å parallelle hver datafil og definere endringer i ting i filene slik at filene er konsekvente. Fortell EDD-tabellen fra... Fildatasett som samles.ncml filer.
    
Eller bruk[NCO](#netcdf-operators-nco)å faktisk gjøre endringer i filene slik at filene er konsekvent.
        
##### Separate kolonner for år, måned, dato, time, minutt, andre{#separate-columns-for-year-month-date-hour-minute-second} 
Det er ganske vanlig for tabular datafiler å ha separate kolonner for år, måned, dato, time, minutt, sekund. FørERDDAP™v2.10 var den eneste løsningen å redigere datafilen for å kombinere disse søylene i en ensartet tidskolonne. MedERDDAP™2.10+ Du kan bruke
[&lt;sourceName&gt;= *uttrykk* &lt;sourceName&gt;] (#kildenavn) å fortelleERDDAP™hvordan du kombinerer kildekolonnene for å lage en samlet tidskolonne, så du trenger ikke lenger å redigere kildefilen.
##### &lt;SkipHeaderToRegex&gt;{#skipheadertoregex} 
* [&lt;Hopp overHeaderToRegex&gt;] (#Skipheadertoregex) --
Valgfritt. (For EDDTableFromAsciiFiler og EDDTableFromColumnarAsciiFiles datasett.)   
Når EDDTableFromAsciiFiles leser en datafil, vil det ignorere alle linjene opp til og inkludert linjen som passer til dette regulære uttrykket. Standard er - som ikke bruker dette alternativet. Et eksempel er
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
som vil ignorere alle linjer opp til og inkludert en linje som starter med -\\*\\* \\* HØYDERENS END

Når du bruker denne etiketten,&lt;kolonneNamesRoad&gt; og&lt;firstDataRoad&gt; fungerer som om headeren er fjernet før filen leses. Hvis kolonnenavnene er på raden rett etter overskriften vil du for eksempel bruke kolonnenavn.

Hvis du vil bruke generering Datasett Xml med et datasett som trenger denne etiketten:

1. Gjør en ny, midlertidig, prøvefil ved å kopiere en eksisterende fil og fjerne headeren.
2. Kjør generere Datasett Xml og angi den prøvefilen.
3. Legg manuelt til&lt;hopp overHeaderToRegex&gt; tag tildatasets.xmlEn bit.
4. Slett den midlertidige prøvefilen.
5. Bruk datasettet iERDDAP..
##### &lt;SkipLinesRegex&gt;{#skiplinesregex} 
Valgfritt. (For EDDTableFromAsciiFiler og EDDTableFromColumnarAsciiFiles datasett.)   
Når EDDTableFra AsciiFiles leser en datafil, vil det ignorere alle linjer som passer til dette regulære uttrykket. Standard er - som ikke bruker dette alternativet. Et eksempel er
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
som vil ignorere alle linjer som starter med "#".

Når du bruker denne etiketten,&lt;kolonneNamesRoad&gt; og&lt;firstDataRoad&gt; fungerer som om alle matchende linjer hadde blitt fjernet før filen leses. For eksempel vil du bruke kolonnenNamesRow=0 selv om det er flere linjer som starter med for eksempel "#" i starten av filen.
    
#### EDDTableFraFiles skjelett XML{#eddtablefromfiles-skeleton-xml} 
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

### EDDTableFraAsciiService{#eddtablefromasciiservice} 
[ **EDDTableFraAsciiService** ](#eddtablefromasciiservice)I hovedsak en skjermskraper. Det er ment å håndtere datakilder som har en enkel webtjeneste for å be om data. (ofte et HTML-skjema på en nettside) og som kan returnere data i noen strukturert ASCII-format (For eksempel et kommadelt verdi eller kolonne ASCII-tekstformat, ofte med annen informasjon før og/eller etter dataene) ..

EDDTableFromAsciiService er superklasse av alle EDDTableFromAsciiService... klasser. Du kan ikke bruke EDDTableFromAsciiService direkte. I stedet, bruk en underklasse av EDDTableFromAsciiService til å håndtere bestemte typer tjenester:

*   [EDDTableFraAsciiServiceNOS](#eddtablefromasciiservicenos)Få data fraNOAANOSs ASCII-tjenester.

For tiden støttes ingen andre tjenestetyper. Men det er vanligvis relativt enkelt å støtte andre tjenester hvis de jobber på lignende måte. Kontakt oss hvis du har en forespørsel.

#### Detaljer{#details} 
Følgende opplysninger gjelder alle underklasser av EDDTableFromAsciiService.

* Begrenselser --ERDDAP™tabellbaserte dataforespørsler kan sette begrensninger på enhver variabel. Den underliggende tjenesten kan eller kan ikke tillate begrensninger på alle variabler. For eksempel støtter mange tjenester bare begrensninger på stasjonsnavn, breddegrad, lengdegrad og tid. Så når en underklasse av EDDTableFromAsciiService får en forespørsel om en undergruppe av et datasett, passerer det så mange begrensninger som mulig til kildedatatjenesten og deretter gjelder de gjenværende restriksjonene til dataene som returneres av tjenesten, før dataene leveres til brukeren.
* Gyldig område -- I motsetning til mange andre datasetttyper kjenner EDDTableFromAsciiService vanligvis ikke dataområdet for hver variabel, slik at det ikke raskt kan avvise forespørsler om data utenfor gyldig område.
* Parserer ASCII-tekstresponsen -- Når EDDTableFra AsciiService får svar fra en ASCII-teksttjeneste, må det validere at responsen har forventet format og informasjon, og deretter trekke ut dataene. Du kan angi formatet ved å bruke ulike spesielle tagger i delen av XML for dette datasettet:
    *   &lt;FørData1&gt; gjennom&lt;førData10&gt; tags -- Du kan angi en rekke tekststykker (Så mange som du vil, opp til 10) som EDDTableFromAsciiService må se etter i overskriften på ASCII-teksten som returneres av tjenesten med&lt;FørData1&gt; gjennom&lt;Før Data10. Dette er for eksempel nyttig for å verifisere at responsen inkluderer de forventede variabler ved hjelp av de forventede enhetene. Den siste før Data-merket som du angir identifiserer teksten som skjer rett før dataene starter.
    *   &lt;etterdata &gt; -- Dette angir teksten som EDDTableFromAsciiService vil se etter i ASCII-teksten som returneres av tjenesten som indikerer slutten på dataene.
    *   &lt;noData&gt; -- Hvis EDDTableFromAsciiService finner denne teksten i ASCII-teksten som returneres av tjenesten, konkluderer det med at det ikke er data som samsvarer med forespørselen.
#### EDDTableFraAsciiService skjelett XML{#eddtablefromasciiservice-skeleton-xml} 
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

### EDDTableFraAsciiServiceNOS{#eddtablefromasciiservicenos} 
[ **EDDTableFraAsciiServiceNOS** ](#eddtablefromasciiservicenos)gjør EDDTable datasett fra ASCII-tekstdatatjenestene som tilbys avNOAA's[Nasjonal Ocean Service (NOS) ](https://oceanservice.noaa.gov/).. For informasjon om hvordan denne klassen fungerer og hvordan du bruker den, se denne klassens superklasse[EDDTableFraAsciiService](#eddtablefromasciiservice).. Det er usannsynlig at andre enn Bob Simons må bruke denne underklassen.

Siden dataene innenfor responsen fra en NOS-tjeneste bruker et kolonne ASCII-tekstformat, må datavariabler som ikke er breddegrad og lengdegrad, ha en spesiell egenskap som angir hvilke tegn i hver datalinje som for eksempel inneholder den variabelens data.
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFraAllDatasett{#eddtablefromalldatasets} 
[ **EDDTableFraAllDatasett** ](#eddtablefromalldatasets)er et datasett på høyere nivå som har informasjon om alle de andre datasettene som for tiden er lastet i dinERDDAP.. I motsetning til andre typer datasett, er det ingen spesifikasjon forallDatasetsDatasett idatasets.xml..ERDDAP™oppretter automatisk ett EDDTableFraAllDatasett datasett (meddatasetID=allDatasets) .. EnallDatasetsDatasett vil bli opprettet i hvertERDDAP™installasjon og vil fungere på samme måte i hverERDDAP™installasjon.

DenallDatasetsDatasett er et tabellisk datasett. Den har en rekke opplysninger for hvert datasett. Den har kolonner med informasjon om hvert datasett, for eksempeldatasetID, tilgjengelig, institusjon, tittel, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime, etc. FordiallDatasetser et tabelldatasett, kan du spørre det på samme måte som du kan spørre om andre tabelldatasett iERDDAP™, og du kan angi filtypen for svaret. Dette lar brukerne søke etter datasett av interesse på svært kraftige måter.
 
### EDDTableFraAsciiFiler{#eddtablefromasciifiles} 
[ **EDDTableFraAsciiFiler** ](#eddtablefromasciifiles)aggregerer data fra komma-, fane-, semikolon- eller mellomromsdelte ASCII-datafiler.

* Mest ofte vil filene ha kolonnenavn på første rad og data som starter på andre rad. (Her kalles den første raden i filen 1.) Men du kan bruke&lt;kolonneNamesRoad&gt; og&lt;førsteDataRoad&gt; i dindatasets.xmlfil for å angi et annet radnummer.
*   ERDDAP™tillater rekkene av data å ha ulike antall dataverdier.ERDDAP™antar at de manglende dataverdiene er de endelige kolonnene i raden.ERDDAP™tilordner standard verdiverdi som mangler for manglende dataverdier. (lagt til v1.56) 
* ASCII-filer er enkle å jobbe med, men de er ikke den mest effektive måten å lagre/hente data på. For større effektivitet, lagre filene somNetCDFv3.ncfiler (med én dimensjon, " row", delt av alle variabler) I stedet. Du kan[brukERDDAP™å generere de nye filene](#millions-of-files)..
* Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. På grunn av den totale mangelen på metadata i ASCII-filer, må du alltid redigere resultatene av GenerateDatasetsXml.
* Varsel: NårERDDAP™leser ASCII-datafiler, hvis den finner en feil på en gitt linje (For eksempel feil antall elementer) , det logger en advarselsmelding (" VARNING: Dårlig linje (s) av data" ... med en liste over dårlige linjer på påfølgende linjer) til[log.txt-fil](/docs/server-admin/additional-information#log)og fortsetter å lese resten av datafilen. Derfor er det ditt ansvar å se regelmessig (eller skrive et skript å gjøre det) For den meldingen i loggen. txt slik at du kan løse problemene i datafilene.ERDDAP™er satt opp slik at brukerne kan fortsette å lese alle tilgjengelige gyldige data selv om noen linjer i filen har feil.
     
### EDDTableFra AwsXmlFiles{#eddtablefromawsxmlfiles} 
[ **EDDTableFra AwsXmlFiles** ](#eddtablefromawsxmlfiles)aggregerer data fra et sett av automatisk værstasjon (AWS) XML datafiler ved hjelp av WeatherBug Rest XML API (som ikke lenger er aktiv) ..

* Denne filtypen er en enkel, men ineffektiv måte å lagre data på, fordi hver fil vanligvis synes å inneholde observasjonen fra bare et tidspunkt. Så det kan være et stort antall filer. Hvis du ønsker å forbedre ytelsen, bør du vurdere å konsolidere grupper av observasjoner (En uke er verdt?) iNetCDFv3.ncfiler (Beste:.ncfiler med[CF Diskret prøvetakingsgeometri (DSG) Contiguous Tagged Array format](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) og bruk[EDDTableFraMultidimNcFiler](#eddtablefrommultidimncfiles)  (eller[EDDTableFraNcCFFiler](#eddtablefromnccffiles)) Å betjene dataene. Du kan[brukERDDAP™å generere de nye filene](#millions-of-files)..
* Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.
     
### EDDTableFraColumnarAsciiFiler{#eddtablefromcolumnarasciifiles} 
[ **EDDTableFraColumnarAsciiFiler** ](#eddtablefromcolumnarasciifiles)aggregerer data fra tabell ASCII-datafiler med faste breddekolonner.

* Mest ofte vil filene ha kolonnenavn på første rad og data som starter på andre rad. Første linje/rad i filen kalles rad #1. Men du kan bruke&lt;kolonneNamesRoad&gt; og&lt;førsteDataRoad&gt; i dindatasets.xmlfil for å angi et annet radnummer.
* Den&lt;addAttributes&gt; for hver&lt;dataVariable&gt; for disse datasettene må inneholde disse to spesielle attributtene:
    
    *   &lt;at name="startColumn"&gt; *heltall* &lt;at&gt; -- angir tegnkolonnen i hver linje som er starten på denne datavariabelen.
    *   &lt;at name="stopColumn"&gt; *heltall* &lt;at&gt; -- angir tegnkolonnen i hver linje som er 1 etter slutten av denne datavariabelen.
    
Den første tegnkolonnen kalles kolonne #0.
For eksempel for denne filen som har tidsverdier som avtar temperaturverdier:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
Tidsdatavariabelen ville ha
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
Tidsdatavariabelen ville ha
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Disse attributtene må angis for alle variabler unntatt[Fast verdi](#fixed-value-sourcenames)og[file-name-source-names](#filename-sourcenames)Variabler.
* ASCII-filer er enkle å jobbe med, men de er ikke en effektiv måte å lagre/motta data på. For større effektivitet, lagre filene somNetCDFv3.ncfiler (med én dimensjon, " row", delt av alle variabler) I stedet. Du kan[brukERDDAP™å generere de nye filene](#millions-of-files)..
* Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. På grunn av vanskeligheten med å bestemme start- og sluttposisjoner for hver datakolonne og den totale mangelen på metadata i ASCII-filer, trenger du alltid å redigere resultatene fra GenereralDatasetsXml.
     
### EDDTableFraHttpGet{#eddtablefromhttpget} 
EDDTable FromHttpGet er forskjellig fra alle andre typer datasett iERDDAP™ved at det har et system der spesifikke forfattere kan legge til data, revidere data eller slette data fra datasettet regelmessigHTTP GETeller[POST](#http-post)forespørsler fra et dataprogram, et skript eller en nettleser. Datasettet kan spørres av brukerne på samme måte som alle andre EDDTable-datasett kan spørres iERDDAP.. Se beskrivelsen av denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For å lese om funksjonene som er arvet fra den superklassen.

De unike funksjonene ved EDDTableFromHttpGet er beskrevet nedenfor. Du må lese hele denne første delen og forstå det; ellers kan du ha urealistiske forventninger eller komme deg i problemer som er vanskelig å fikse.

#### Tiltenkt bruk{#intended-use} 
Dette systemet er ment for:

* Tabell (i situ) Data, ikke gitt data.
* Sanntidsdata -
Målet er å tillate en forfatter (For eksempel sensoren, et automatisert QC-skript eller et bestemt menneske) å gjøre endringer i datasettet (via en[.sett inn eller .slett kommando](#insert-and-delete)) Gjør den endringen tilgjengelig forERDDAP™brukere, alle på mindre enn 1 sekund, og muligens mye raskere. Det meste av det er nettverkstid.ERDDAP™kan behandle forespørselen i ca. 1 ms og dataene er umiddelbart tilgjengelige for brukerne. Dette er en[raskt](#httpget-speed),[robust](#robust), og[pålitelig system](#system-reliability)..
* Nesten alle frekvenser av data -
Dette systemet kan akseptere sjeldne data (For eksempel daglig) gjennom svært hyppige data (For eksempel 100 Hz-data) .. Hvis du optimaliserer systemet, kan det håndtere høyere frekvensdata (Kanskje 10 KHz data hvis du går til ekstremer) ..
* Data fra én sensor eller en samling av lignende sensorer.
*   [Utgave](#versioning)/[Reproducerbar vitenskap](https://en.wikipedia.org/wiki/Reproducibility)/DOIs--
Situasjoner der du trenger å kunne gjøre endringer i dataene (For eksempel endre et kvalitetskontrollflagg) , vite hvilken forfatter som gjorde hver endring, vite tidsstempel når forfatteren gjorde endringen, og (etter anmodning) være i stand til å se originaldata fra før endringen ble gjort. Disse datasettene er således kvalifisert til[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier).. fordi de møterDOIkrav om at datasettet ikke endres, bortsett fra ved sammenslåing. Generelt, nær sanntid datasett er ikke kvalifisert tilDOIfordi dataene ofte endres retroaktivt (For eksempel for QA/QC-formål) ..
     

Når data er i et EDDTableFromHttpGet datasett, kan enhver bruker be om data på samme måte som de ber om data fra andre EDDTable datasett.
     
#### Eksperimentelt: Vær forsiktig{#experimental-be-careful} 
Siden dette systemet er nytt og siden tapte miljødata ikke kan gjenvinnes, bør du behandle EDDTableFromHttpGet som eksperimentell. Hvis du overgang fra et annet system, kan du kjøre det gamle systemet og det nye systemet parallelt til du er sikker på at det nye systemet fungerer bra (uker eller måneder, ikke bare timer eller dager) .. I alle tilfeller, sørg for at systemet separat arkiverer .innsett og . slette URLs som sendes til EDDTableFromHttpGet datasett (Selv om bare i Apache og / eller Tomcat logger) I hvert fall for en stund. Og i alle tilfeller, sørg for at datafilene som opprettes av din EDDTableFromHttpGet datasett er rutinemessig sikkerhetskopiert til eksterne datalagringsenheter. (Merk at[rsync](https://en.wikipedia.org/wiki/Rsync). kan sikkerhetskopiere datafiler opprettet av EDDTableFramtpGet svært effektivt.)   
     
#### . Sett inn og .slett{#insert-and-delete} 

For alle datasett iERDDAP™Når du sender en forespørsel tilERDDAP™for en delgruppe av dataene i et datasett, angir du filtypen som du ønsker for svaret, for eksempel .csv,.htmlTable,.nc,.json.. EDDTableFraHttp Få utvider dette systemet til å støtte to ekstra " filtyper" som kan settes inn (eller endre) eller slette data i datasettet:

* .innsettelse
    * Forespørselen er formatert som en standard HTML skjemarespons, med key=verdi par, separert med '&'. For eksempel
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
fortellerERDDAP™å legge til eller endre data forstationID=46088 for det angitte tidspunkt.
    * Forfatteren av denne endringen er JohnSmith og nøkkelen er noenKey1.
    * URL-en må inneholde gyldige verdier (manglende verdier) for alle[httpFå nødvendige variabler](#httpgetrequiredvariables-global-attribute)
    * Hvis verdiene tilhttpFå nødvendig Variabler i anmodningen (f.eks.stationIDog tid) samsvarer med verdiene på en rad allerede i datasettet, de nye verdiene overskriver effektivt de gamle verdiene (Selv om de gamle verdiene fortsatt er tilgjengelige dersom brukeren ber om data fra en tidligere[versjon](#versioning)av datasettet) ..
    * .Insert URL må aldri inkludere &timestamp= (ERDDAP™genererer den verdien) eller & kommando= (som er spesifisert av .innsett (som er kommando=0) eller. slette (som er kommando= 1) ) ..
    * Hvis URL-adressen ikke angir verdier for andre kolonner i datasettet, antas de å være de opprinnelige manglende verdiene (MAX\\_VALUE for heltallsdatatyper, NAN for flyter og dobbler, og " for strenger) ..
             
    * . slette
        * Forespørselen er formatert som en standard HTML skjemarespons, med key=verdi par, separert med '&'. For eksempel
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
fortellerERDDAP™å slette dataene forstationID= 46088 på det angitte tidspunkt.
        * Forfatteren av denne endringen er JohnSmith og nøkkelen er noenKey1.
        * URL-en må angi[httpFå nødvendige variabler](#httpgetrequiredvariables-global-attribute)på anmodningen (f.eks.stationIDog tid) .. Hvis disse verdiene samsvarer med verdiene på en rad allerede i datasettet (som de vanligvis vil) De gamle verdiene slettes effektivt (Selv om de gamle verdiene fortsatt er tilgjengelige dersom en bruker ber om data fra en tidligere[versjon](#versioning)av datasettet) ..
        * Det er ikke nødvendig å angi verdier for ikke-HttpGet RequiredVariables, andre enn forfatter, som er nødvendig for å autentisere forespørselen.
             
    
Detaljer:
    * . Sett inn og . slette forespørsler er formatert som standard HTML skjema svar, med key=verdi par, skilt med \"&\". Verdiene må være[prosent kodet](https://en.wikipedia.org/wiki/Percent-encoding).. Således må du kode spesielle tegn i skjemaet %H, hvor HH er den 2 sifferhexademiske verdien av tegnet. Vanligvis trenger du bare å konvertere noen av tegntegnene: % til %25, og til %26, " til %22,&lt;i% 3C, = i% 3D, &gt; i% 3E, + i% 2B,|til %7C,\\[til %5B,\\]til %5D, mellomrom til %20, og konvertere alle tegn over #127 til deres UTF-8-form og deretter prosent kode hver byte av UTF-8-formen til %H-format (spør en programmerer om hjelp) ..
    * . Sett inn og . Slette forespørsler må inkludere[httpFå nødvendige variabler](#httpgetrequiredvariables-global-attribute)f.eks.stationIDOg tid. For .innsette forespørsler antas variabler som ikke er spesifisert i forespørselen å være manglende verdier (MAX\\_VALUE for heltallsvariabler, NaN for flytende og doble variabler, og en tom streng for strengvariabler) .. For å slette forespørsler, verdier for ikke-HttpGet Obligatorisk Variabler (andre enn forfatter, som kreves) blir ignorert.
    * . Sette inn og slette forespørsler må inneholde navn på forfatteren og forfatterens nøkkel via en parameter i skjemaforfatteren= *forfatter\\_nøkkel* som siste parameter i forespørselen. Forespørselen om å være siste sikrer at hele forespørselen er mottatt avERDDAP.. Bare forfatteren (Ikke nøkkelen) vil bli lagret i datafilen. Du må angi listen over tillatte *forfatter\\_nøkkel* via den globale egenskapen[httpGetKeys](#httpgetkeys)
    * .innsette og slette parametre kan være skalar (enkelt) verdier eller tabeller av enhver lengde i skjemaet\\[verdi1, verdi2, verdi3,..., verdi N\\].. For en gitt forespørsel må alle variabler med tabeller ha tabeller med samme antall verdier. (Ellers er det en feil) .. Hvis en forespørsel har skalar- og tabellverdier, blir skalarverdiene kopiert til å bli tabeller med samme lengde som de angitte tabeller, f.eks.stationID=46088 kan behandles som &stationID=\\[46088.46088\\].. Arrays er nøkkelen til[høy gjennomstrømning](#httpget-speed).. Uten tabeller, vil det være utfordrende å sette inn eller slette mer enn 8 rader data i sekundet fra en ekstern forfatter (På grunn av all overhead av nettverket) .. Med tabeller vil det være enkelt å sette inn eller slette mer enn 1000 rader data i sekundet fra en fjernsensor.
    * .innsette og slette aksept (uten feilmelding) flytende punkttall når det forventes heltal. I disse tilfellene avrunder datasettet verdiene til heltal.
    * .innsette og slette aksept (uten feilmelding) heltalls- og flytpunkttall som er utenfor rekkevidde av variabelens datatype. I disse tilfellene lagrer datasettet verdiene somERDDAPInnfødte manglende verdier for den datatypen (MAX\\_VALUE for heltallstyper og NAN for flyter og dobbler) ..
         
#### Svar{#response} 
Hvis .sett inn eller .slett URL lykkes, vil HTTP-responskoden være 200 (OK) og svaret vil være tekst med en.jsonobjekt, f.eks.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Merk at tidsstemplene har millisekund presisjon.

Hvis .Installe eller .slette URL mislykkes, vil du få en HTTP-responskode på annen måte enn 200 (Ok.) For eksempel feil 403 Forbudt hvis du sender en feil forfatter\\ nøkkelverdi.ERDDAP™Sender HTTP-responskoden (ikke, f.eks..jsonformatert feil) Fordi det er slik ting gjøres på internett og fordi feil kan oppstå hvor som helst i systemet (For eksempel i nettverket, som returnerer en HTTP-feil) .. Hvis feilen kommer fraERDDAP™Svaret kan inkludere litt tekst (ikke.json) med en mer detaljert forklaring på hva som gikk galt, men HTTP-responskoden (200= OK, alt annet er problemer) er riktig måte å sjekke om .innsett eller . slette lykkes. Hvis du sjekker HTTP-responskoden ikke er mulig eller er upåklagelig, søk etter "status"" suksess" i responsteksten som bør være en pålitelig indikasjon på suksess.
    
#### Loggfiler{#log-files} 
Når EDDTableFromHttpGet mottar .innsett og .slette kommandoer, legger den bare til informasjonen i den relevante filen i et sett loggfiler, som hver er en tabell lagret i en[JSON Linjer CSV-fil](https://jsonlines.org/examples/).. Når en bruker gjør forespørsel om data,ERDDAP™leser raskt de relevante loggfilene, bruker endringene i datasettet i den rekkefølgen de ble gjort, og filtrerer deretter forespørselen via brukerens begrensninger som alle andreERDDAP™Dataforespørsel. Partisjonen av dataene i ulike loggfiler, lagring av ulike deler informasjon (f.eks. tidsforsterkeren for kommandoen, og om kommandoen var satt inn eller slettet.) , og ulike aspekter av installasjon av datasettet, alt gjør det mulig forERDDAPå lagre data til og hente data fra dette datasettet svært raskt og effektivt.
     
#### Sikkerhet og forfatter{#security-and-author} 
Hver .sett og .slette-kommando må inkludere &author= *forfatter\\_nøkkel* som den siste parameteren, hvor forfatteren\\_key består av forfatterens identifikator (du valgte: navn, initialer, pseudonym, nummer) En understrekning og en hemmelig nøkkel. DenERDDAP™Administrator vil samarbeide med forfattere for å generere listen over gyldig forfatter\\_nøkkelverdier, som kan endres når som helst.
Når EDDTableFraHttpGet mottar en .innsett eller .slett kommando, sørger det for at forfatterenID-_key er den siste parameteren og gyldig. Fordi det er den siste parameteren, indikerer det at hele kommandolinjen nåddeERDDAP™og ble ikke avkortet. Den hemmelige nøkkelen sikrer at bare spesifikke forfattere kan sette inn eller slette data i datasettet.ERDDAP™Deretter trekker forfatter-ID og lagrer det i forfattervariabelen, slik at alle kan se hvem som var ansvarlig for en gitt endring i datasettet.
.Installere og slette kommandoer kan bare gjøres viahttps:  (Sikker)  ERDDAP™URL. Dette sikrer at informasjonen som overføres holdes hemmelig under transport.
     
#### tidsstempel{#timestamp} 
Som en del av loggsystemet legger EDDTableFromHttpGet til en tidsstempel (Tiden somERDDAPmottok forespørselen) til hver kommando som lagres i loggfiler. FordiERDDAP™genererer tidsstemplet, ikke forfatterne, det spiller ingen rolle om forskjellige forfattere gjør endringer fra datamaskiner med klokker satt til litt forskjellige tider. Tidsstempelet indikerer pålitelig tidspunktet da endringen ble gjort til datasettet.
     
#### HTTP POST{#http-post} 
*   [Hva med HTTP POST?](#http-post)  
HTTP[POST](https://en.wikipedia.org/wiki/POST_(HTTP)) er det bedre alternativet (sammenlignet medHTTP GET) for å sende informasjon fra en klient til en HTTP-server. Hvis du kan, eller om du virkelig ønsker å forbedre sikkerheten, kan du bruke POST i stedet for å sende informasjonen tilERDDAP.. POST er sikrere fordi: med GET oghttps, URL-adressen overføres på en sikker måte, men hele URL-en (inkludert parametere, inkludert forfatteren\\_key) vil bli skrevet til Apache, Tomcat, ogERDDAP™loggfiler, der noen kan lese dem hvis filene ikke er riktig sikret. Med POST overføres parametrene på en sikker måte og er ikke skrevet til loggfilene. POST er litt vanskeligere for klienter å jobbe med og støttes ikke så mye av klientprogramvare, men programmeringsspråk støtter det. Innholdet du sender til datasettet via GET eller POST vil være det samme, akkurat formatert på en annen måte.
     
#### httpFå nødvendig Variabler Global attributt{#httpgetrequiredvariables-global-attribute} 
En viktig del av det som gjør at hele systemet fungerer er den nødvendige globale egenskapenhttpFå nødvendig Variabler, som er en kommaseparert liste avdataVariablekildenavn som unikt identifiserer en rekke data. Dette bør være så minimalt som mulig og vil nesten alltid inkludere tidsvariabelen. Her er det anbefaltehttpFå nødvendig Variabler for hver av[CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (Selvfølgelig kan ID-navnene være forskjellige i datasettet ditt.) :)

* For timeserien:stationID, tid
* For Trajectory: TrajectoryID, tid
* For Profil: Tid (Forutsetningstiden er profilen\\_id) , dybde
* For TimeSeries Profil:stationID, tid (Forutsetningstiden er profilen\\_id) , dybde
* For Trajectory Profil: trajectoryID, tid (Forutsetningstiden er profilen\\_id) , dybde

    
Ta timeserien som et eksempel:
Gitt en .innsett kommando som inkludererstationID=46088 og tid=2016-06-23T19:53:00Z (og andre verdier for andre variabler) :)
* Hvis det ikke finnes noen eksisterende data for stasjonen og den tiden, vil effekten bli å legge dataene til datasettet.
* Hvis det er eksisterende data for stasjonen og den tiden, vil effekten bli å erstatte den eksisterende rekken av data med disse nye dataene. (Selvfølgelig, sidenERDDAP™Hold loggen på hver kommando den mottar, gamle data er fortsatt i loggen. Hvis en bruker ber om data fra en versjon av datasettet før denne endringen, vil de se eldre data.)   
         
#### httpGetDirectoryStructure{#httpgetdirectorystructure} 
*   [httpGetDirectory Struktur Global attributt og data (Logg) Filnavn](#httpgetdirectorystructure)  
En del av det som gjør at hele systemet fungerer effektivt er atERDDAP™skaper et sett data (Logg) filer, hver med en annen del av datasettet. Hvis disse er satt godt opp,ERDDAP™vil kunne svare raskt på de fleste forespørsler om data. Dette oppsettet er spesifisert avhttpGetDirectoryStructure global attributt, som er en streng som ser ut som et relativt filnamn, f.eks.stationID/10 år", men er faktisk en spesifikasjon for katalogstrukturen. Delene av dette indikerer hvordan mappe og filnavn for dataene (Logg) Filene vil bli konstruert.
    
    * Hvis en del er et heltall (&gt;= 1) pluss en tidPeriod (millisekund, andre, minutt, time, dato, måned, år, eller deres flertall) , for eksempel 10 år, vil EDDTableFromHttpGet datasett ta tidsverdien for rekken data (f.eks. 2016-06-23T19:53:00Z) , beregne tiden som er avkortet til den presisjonen (f.eks. 2010) , og lag en mappe eller fil fra det.
        
Målet er å få en rimelig stor del av data i hver fil, men langt mindre enn 2GB.
        
    * Ellers skal spesifikasjonens del væredataVariable'ssourceNamef.eks.stationID.. I dette tilfellet vil EDDTableFromHttpGet gjøre en mappe eller filnavn fra verdien av den variabelen for den nye rekken data (f.eks. "46088") ..
    
Fordi .innsett og .slett kommandodata lagres i bestemte data (Logg) filer, EDDTableFraHttpGet vanligvis bare trenger å åpne en eller noen få data (Logg) filer å finne data for en gitt brukerforespørsel. Og fordi hver data (Logg) filen har all relevant informasjon for sin del av datasettet, det er raskt og enkelt for EDDTableFramtHttpGet å lage en bestemt versjon (eller den aktuelle versjonen) av datasettet for dataene i den filen (og ikke trenger å generere den ønskede versjonen av hele datasettet) ..
    
Generelle retningslinjer er basert på mengden og hyppigheten av dataene. Hvis vi tar 100 byte per rad data, så ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
For eksempel hvis katalogstrukturen erstationID/ 2 måneder og du setter inn data fra to stasjoner (46088 og 46155) med tidsverdier fra desember 2015 til mai 2016, EDDTableFromHttp Få vil opprette mapper som heter 46088 og 46155 og opprette filer i hvert navn 2015-11.jsonl, 2016-01.jsonl, 2016-03.jsonl, 2016-05.jsonl (hver innehav 2 måneders dataverdi for relevant stasjon) .. Når som helst i fremtiden, hvis du bruker .innsett eller . slette for å endre eller slette dataene for eksempel stasjon 46088 ved 2016-04-05T14:45:00Z, EDDTableFromHttp Få vil legge til den kommandoen til 46088/2016-03.jsonl) relevante data (Logg) fil. Og det er klart at det er bra å legge til data for andre stasjoner når som helst i fremtiden, siden datasettet bare vil lage ytterligere mapper etter behov for å holde dataene fra de nye stasjonene.
    
#### httpGetKeys{#httpgetkeys} 
Hver EDD-tabell FraHttp Få datasett må ha en global attributthttpGetKeys som angir listen over tillatte forfattere og deres hemmelige nøkler som en kommadelt liste av *forfatter\\_nøkkel* f.eks. JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3 .
* forfatter\\_key's er case-sensitive og må være helt ASCII tegn (# 33 - #126, og uten komma, " eller ' tegn
* Nøkkelene er som passord, så de må være &gt;=8 tegn, vanskelig å gjette, og uten interne ord i ordbok. Du bør behandle dem som du vil behandle passord - holde dem private.
* Det første \"-_\"-tegnet skiller forfatteren fra nøkkelen, slik at forfatternavnet ikke kan inneholde et \"-_\"-tegn (En nøkkel kan) ..
* Enhver gitt forfatter kan ha en eller flere forfattere\\_keys, for eksempel JohnSmith\\_some Key1, JohnSmith-_noen Key7, etc.
* Du kan endre verdien av denne egenskapen når som helst. Endringene trer i kraft neste gang datasettet lastes.
* Denne informasjonen vil bli fjernet fra datasettets globale administratorer før den blir offentliggjort.
* Hver forespørsel til datasettet om å sette inn eller slette data må inneholde en &author= *forfatter\\_nøkkel* parameter. etter å ha bekreftet nøkkelens gyldighet,ERDDAP™Bare sparer forfatterdelen (Ikke nøkkelen) i datafilen.

#### Sett opp{#set-up} 

Her er de anbefalte trinnene for å sette opp et EDDTableFromHttpGet datasett:

1. Gjør hovedkatalogen til å holde dette datasettets data. For dette eksempel, la oss bruke /data/testGet/ . Brukeren kjører GenererDatasetsXml og brukeren kjørerERDDAP™må begge ha lese-skrive tilgang til denne katalogen.
     
2. Bruk en teksteditor til å lage en prøve.jsonL CSV-fil med utvidelsen.jsonI den katalogen.
Navnet er ikke viktig. Du kan for eksempel kalle det prøve.jsonl
Lag en 2 linje.jsonl CSV-fil, med kolonnenavn på første linje og dummy/typiske verdier (av riktig datatype) på den andre linjen. Her er en prøvefil som passer til en samlingfeatureType=TimeSeries data som målte luft og vanntemperatur.
    \\[ForfeatureType=Trajectory, du kan endrestationIDFor å være banebrytende.\\]  
    \\[ForfeatureType=Profil, kan du endrestationIDå være profilID og legge til en dybdevariabel.\\]
    
    \\["stationID","time",  " breddegrad  " " lengdegrad  " airTemp  " vannTemp  " timestamp  " " forfatter  " command kommando "\\]
    \\["myStation", "2018-06-25T17:00:00Z", 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, "NogleBody", 0\\]
    
Merk:
    * De faktiske dataverdiene spiller ingen rolle fordi du til slutt vil slette denne filen, men de bør være av riktig datatype. Spesielt bør tidsvariabelen bruke det samme formatet som de faktiske dataene fra kilden vil bruke.
    * For alle variabler,sourceNamevil være likdestinationName, så bruk de riktige/endelige variabelnavnene nå, inkludert tid, breddegrad, lengdegrad og noen ganger dybde eller høyde hvis variabler med denne informasjonen vil bli inkludert.
    * Det vil nesten alltid være en variabel navngitt tid som registrerer tiden observasjonen ble gjort. Det kan være dataType-streng med[enheter egnet for strengtider](#string-time-units)  (f.eks.yyyy-MM-dd'T'HH:mm:ss.SSSZ) eller data Skriv dobbel med[enheter egnet for numeriske tider](#time-units)  (f.eks. sekunder siden 1970-01-01T00:00:00Z, eller noe annet basistid) ..
    * Tre av søylene (De siste tre) Må være tidsstempel, forfatter, kommando.
    * Tidsstempelkolonnen vil bli brukt av EDDTableFraHttpGet for å legge til en tidsstempel som indikerer når den legger til en gitt datalinje i datafilen. Det vil ha dataType dobbel og enheter sekunder siden 1970-01-01T00:00:00Z.
    * Forfatterkolonnen med dataType-streng vil bli brukt til å registrere hvilken autorisert forfatter som oppgir denne linjens data. autoriserte forfattere er spesifisert av[httpGetKeys global attributt](#httpgetkeys).. Selv om nøkler er spesifisert som *forfatter\\_nøkkel* og er i "forespørsel" URL i det skjemaet, bare forfatterdelen lagres i datafilen.
    * Kommandokolonnen med dataType byte indikerer om dataene på denne linjen er en innsetting (0) eller slette (1) ..
         
3. Kjør genererte datasett Xml og fortell det
    
    1. Datasetttypen er EDDTableFraHttpGet
    2. Katalogen er (For dette eksempelet) /data/test Kjøp/
    3. Prøvefilen er (For dette eksempelet) /data/testGet/startup.jsonl
    4. DenhttpFå nødvendig Variabler er (For dette eksempelet)  stationID, tid Se beskrivelsen av[httpFå nødvendige variabler](#httpgetrequiredvariables-global-attribute)Nedenfor.
    5. Dersom data samles inn hvert 5. minutt,httpGetDirectoryStructure for dette eksempelet erstationID2 måneder. Se beskrivelsen av[httpGetDirectoryStructure](#httpgetdirectorystructure)Nedenfor.
    6. Den[httpGetKeys](#httpgetkeys)
    
Legg til utdata (delen avdatasets.xmlfor datasettet) tildatasets.xml..
     
4. Redigerdatasets.xmlbit for dette datasettet for å gjøre det riktig og komplett.
Husk å erstatte alle??? med riktig innhold.
     
5. For&lt;filTableInMemory&gt; innstilling:
    * Sett dette til sant hvis datasettet vanligvis blir hyppig .innsett og/eller . (For eksempel oftere enn én gang hvert 10. sekund.) .. Dette hjelper EDDTableFromHttpFå svar raskere på .innsett og/eller .slette forespørsler. Hvis du setter dette til sant, vil EDDTableFromHttpGet fortsatt lagre filtabellen og relatert informasjon til disk periodisk (etter behov, omtrent hvert femte sekund) ..
    * Sett dette på falsk (standard) hvis datasettet vanligvis får sjelden .innsett og/eller .slette forespørsler (For eksempel mindre enn én gang hvert 10. sekund.) ..
         
6. Merk: Man kan bruke&lt;cacheFra Url&gt; og relaterte innstillinger idatasets.xmlfor EDDTable FraHttp Få datasett som en måte å lage og vedlikeholde en lokal kopi av et eksternt EDDTableFromHttpGet datasett på en annenERDDAP.. Men i dette tilfellet vil dette lokale datasettet avvise alle .innlegg og .slette forespørsler.

#### Bruke EDDTable FraHttpGet Datasett{#using-eddtablefromhttpget-datasets} 

* Forfattere kan gjøre " spørsmål" som[sette inn data til eller slette data fra datasettet](#insert-and-delete)..
     
* Når ekte data er satt inn i datasettet, kan du og bør slette den opprinnelige prøvedatafilen.
     
* Brukere kan be om data fra datasettet som de gjør for alle andre EDDTable datasett iERDDAP.. Hvis forespørselen ikke inkluderer en begrensning på tidsstempelkolonnen, får forespørselen data fra den aktuelle versjonen av datasettet (Loggfilen etter å ha behandlet alle innsettings- og slettingskommandoer og omsortering avhttpFå nødvendige variabler) ..
     
* Brukere kan også gjøre forespørsler som er spesifikke for EDDTableFromHttpGet datasett:
    * Hvis forespørselen inkluderer&lt;eller&lt;= begrensning av tidsstempelkolonnen, deretterERDDAP™prosesserer rader av loggfilen inntil den angitte tidsstempel. I virkeligheten sletter dette midlertidig alle endringene som er gjort i datasettet siden den tidsstempelverdien. For mer informasjon, se[Utgave](#versioning)..
    * Hvis forespørselen inkluderer en &gt;, &gt;= eller = begrensning av tidsstempelkolonnen, f.eks. &timesamp&lt;=0, såERDDAP™returnerer dataene fra datafilene som er, uten å behandle kommandoene for innsetting og sletting.
* I fremtiden ser vi på at verktøy vil bli bygget (Av oss? ved deg?) å jobbe med disse datasettene. For eksempel kan det være et skript som leser råloggfilene, bruker en annen kalibreringslikning og genererer/oppdateringer et annet datasett med den avledede informasjonen. Merk at skriptet kan få de opprinnelige dataene via en forespørsel tilERDDAP™  (som får data i filformatet som er enklest for skriptet å fungere med) og generere / oppdatere det nye datasettet via .innsett " spørs tilERDDAP.. Skriptet trenger ikke direkte tilgang til datafilene; det kan være på enhver autorisert forfatters datamaskin.
     

#### Detaljert informasjon om EDDTableFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

Temaene er:

*   [Ikke endre oppsettet&#33;](#dont-change-the-setup)
*   [CRUD](#crud)
*   [Ugyldige spørsmål](#invalidrequests)
*   [Hastighet](#httpget-speed)
*   [Robust](#robust)
*   [Systempålitelighet](#system-reliability)
*   [Utgave](#versioning)
*   [Hva med HTTP PUT og DELETE?](#https-put-and-delete)
*   [Noter](#httpget-notes)
*   [Takk til CORDS for den grunnleggende ideen.](#thanks)

Her er detaljert informasjon:

##### Ikke endre oppsettet&#33;{#dont-change-the-setup} 
Når datasettet er opprettet og du har lagt til data til det:

* Ikke legg til eller fjern noendataVariableS.
* Ikke endresourceNameellerdestinationNameavdataVariableS.
* Ikke endre dataene Typen avdataVariableS. Men du kan endredataVariablemetadata.
* Ikke endrehttpFå nødvendig Variablerer global attributt.
* Ikke endrehttpGetDirectoryStructure global attributt.

Hvis du trenger å endre noe av disse tingene, gjør et nytt datasett og overføre alle dataene til det nye datasettet.
     
##### CRUD{#crud} 
I datavitenskap er de fire grunnleggende kommandoene for å jobbe med et datasett.[CREATE, LES, UPDATE, DELETE (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete).. SQL, språket for å jobbe med relasjonelle databaser, har tilsvarende i INSERT, SELECT, UPDATE og DELETE. I EDDTableFraHttpGet,

* .innsetting er en kombinasjon av CREATE og UPDATE.
* Sletting er DELETE.
* Det vanlige systemet for å søke undergrupper av data er LES.

Således støtter EDDTableFromHttpGet alle de grunnleggende kommandoene for å jobbe med et datasett.
     
* .innsette eller slette forespørsler uten feil vil returnere HTTP-statuskode=200 og et JSON-objekt, f.eks.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
De to tidsstemplingsverdiene refererer til det samme millisekund, som er det millisekund som vil bli lagret i tidsstemplevariabelen for rekkene med data som ble satt inn eller slettet.ERDDAP™vil ikke endre navn og formatering av disse nøkkelverdiparene i fremtiden.ERDDAP™kan legge til ekstra nøkkelverdipar til JSON-objektet i fremtiden.
     
##### Ugyldige spørsmål{#invalidrequests} 
Ugyldig .innlegg eller .slette forespørsler vil returnere en annen HTTP-feilstatuskode enn status=200 og ingen endring vil bli gjort til datasettet. Dette inkluderer forespørsler med feil forfatterinformasjon, feil variabelnavn, forskjellig rekkevidde for ulike variabler, manglende variabler, mangler nødvendige variabelverdier etc. Hvis forespørselen involverer mer enn én datafil, er det mulig at en del av forespørselen vil lykkes og deler vil mislykkes. Dette bør imidlertid ikke være et problem hvis sensoren som sender forespørselen behandler en feil som en fullstendig feil. For eksempel, hvis du fortellerERDDAP™å sette inn (eller slette) samme data to ganger på rad, verste tilfelle er at informasjonen lagres to ganger, tett sammen i loggfilen. Det er vanskelig å se hvordan det kan forårsake problemer.
     
##### HttpGet Speed{#httpget-speed} 
For .innsett eller .slette forespørsler (ikke tellerhttpOverhead) , ballpark figurer hastigheten på .innlegg eller . slette er
1ms per .innsett med 1 rad data
2ms per .innsett med 10 rader data i tabeller (\\[\\])   
3ms per .sett med 100 rader data i tabeller (\\[\\])   
13ms per .innsettes med 1000 rader data i tabeller (\\[\\])   
Det er tydelig at arrays er nøkkelen til[høy gjennomstrømning](#httpget-speed).. Uten tabeller, vil det være utfordrende å sette inn eller slette mer enn 8 rader data i sekundet fra en ekstern forfatter (På grunn av all overhead av nettverket) .. Med tabeller vil det være enkelt å sette inn eller slette mer enn 1000 rader data i sekundet fra en fjernsensor.

Med svært store mengder data per forespørsel, vil du treffe Tomcats grense til maksimal spørringslengde (Standard er 8KB?) , men det kan økes ved å redigere maxHttpHeaderSize-innstillingen i din *tomcat* /conf/server.xmls HTTP/1.1 Kontaktoppføring.

NårERDDAP™Leser JSON Lines CSV-data (Logg) filer, det er en liten tidsstraff i forhold til å lese binære datafiler. Vi følte at denne straffen ved lesing var en rimelig pris for å betale for systemets hastighet og robusthet når vi skrev data. (som er av primær betydning) ..

##### SSD{#ssd} 
[For større hastighet,](#ssd)bruk a[Solid State Drive (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)å lagre dataene. De har mye raskere tilgangstid (&lt;0.1ms) enn harddisker (3 - 12 ms) .. De har også raskere dataoverføringsrate (200 - 2500 MB/s) enn harddisker (~ 200 MB/s) .. Utgiftene har falt betydelig de siste årene. Selv om tidlige SSD hadde problemer etter et stort antall skriver til en gitt blokk, er dette problemet nå sterkt redusert. Hvis du bare bruker SSD til å skrive dataene en gang, les det mange ganger, selv en forbrukerklasse SSD (som er betydelig billigere enn en bedriftsklasse SSD) Det bør vare lenge.
    
##### Robust{#robust} 
Vi har prøvd å gjøre dette systemet så enkelt å jobbe med og så robust som mulig.
* Systemet er designet for å ha flere tråder (For eksempel sensoren, et automatisert QC-skript og et menneske) samtidig arbeid på samme datasett og til og med den samme filen. Mye av dette gjøres mulig ved å bruke en loggfiltilnærming til lagring av data og ved å bruke en veldig enkel filtype,[JSON Linjer CSV-filer](https://jsonlines.org/examples/)å lagre dataene.
* En annen stor fordel til JSON Lines CSV er at hvis en fil noensinne blir ødelagt (For eksempel ugyldig på grunn av en feil på en linje) , det er enkelt å åpne filen i en tekstredigering og løse problemet.
* En annen fordel er, hvis det er en feil på en linje i en fil, kan systemet fortsatt lese alle dataene på linjer før og etter feillinjen. Og systemet kan fortsatt logge ekstra .innsett og . slette informasjon.
* En stor fordel med å bruke admin-tilgjengelige standardfiler (sammenlignet med en relasjonell database eller Cassandra eller annen programvare) :) Det finnes ingen annen programvare som må vedlikeholdes og som må kjøres for å lagre eller hente data. Og det er enkelt å sikkerhetskopiere standardfiler til enhver tid og på en gradvis måte fordi dataene er i biter (Etter en stund vil bare dagens fil for hver stasjon endres) .. I motsetning til det tar betydelig innsats og systemet nede tid å gjøre eksterne sikkerhetskopifiler fra databaser og fra Cassandra.
         
##### Systempålitelighet{#system-reliability} 
Det er rimelig å forvente én server medERDDAP™å ha 99,9 % oppetid - det er ca 9 timers nedetid i året (Men du kan bruke det opp i en dårlig natt&#33;) ..
Hvis du er flittig og heldig, kan du få 99,99% oppetid (53 minutters nedetid i året) , siden bare noen få omstarter for oppdateringer vil ta så mye tid.
Du må treffe ekstreme tiltak (en separat backup-server, uforstyrrelig strømforsyning, sikkerhetskopiering air condition, 24x7x365 personale for å overvåke nettstedet, etc.) å ha en slank sjanse på 99,999% oppetid (5.25 minutters nedetid i året) .. Selv da er det svært usannsynlig at du vil oppnå 99.999% oppetid (eller 99,99%) Fordi problemer ofte er utenfor din kontroll. Amazon Web Service og Google tilbyr utrolig pålitelige webtjenester, men store deler av dem er noen ganger nede i timevis.

Ansikte det, alle ønskerERDDAP™å ha 100% oppetid, eller i det minste de vaunted-seks niere- (99.9999 % opptid er 32 sekunder nedetid i året) Men det er ingen måte å få det uansett hvor mye tid, innsats og penger du bruker.

MenERDDAP™Uptime er ikke det virkelige målet her. Målet er å bygge en pålitelig **systemet** En som ikke mister data. Dette er et løselig problem.

Løsningen er: Bygg feiltolerans i dataprogramvaren som sender dataene tilERDDAP.. Spesielt bør programvaren opprettholde en kø av data som venter på å gå tilERDDAP.. Når data legges til i køen, bør programvaren sjekke svaret fraERDDAP.. Hvis svaret ikke inkluderer data mottatt. Ingen feil., så bør programvaren legge dataene i køen. Når mer data genereres og legges til i køen, bør programvaren igjen prøve å sette inn data i køen (Kanskje med\\[\\]systemet) .. Det vil lykkes eller mislykkes. Hvis det mislykkes, vil det prøve igjen senere. Hvis du skriver programvaren til å fungere på denne måten, og hvis programvaren er forberedt på å kjøre i kø noen dager verdt data, har du faktisk en god sjanse til å laste opp 100% av sensorens data tilERDDAP.. Og du vil ha gjort det uten å gå til store anstrengelser eller kostnader.

\\[Bakgrunn: Vi tenkte ikke på dette.[Slik oppnår datanettverk pålitelighet.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) Datanettverk er upålitelig. Så når du overfører en fil fra en datamaskin til en annen, vet programvaren/ekspedisjonene at noen pakker kan gå tapt. Hvis det ikke får en riktig bekreftelse for en gitt pakke fra mottakeren, sender det den tapte pakken. Med denne tilnærmingen kan relativt enkel avsender og mottakerprogramvare bygge et pålitelig filoverføringssystem på toppen av et upålitelig nettverk.\\]
    
##### Hvorfor JSON Lines CSV-filer?&#33;{#why-json-lines-csv-files} 
EDDTableFraHttpGet bruk[JSON Linjer CSV-filer](https://jsonlines.org/examples/)for å lagre dataene. Årsakene er:

* Hovedårsaken er: Enkelheten i JSON Lines CSV-filer tilbyr en rask, enkel og pålitelig måte å tillate flere tråder å skrive til en gitt fil. (For eksempel ved å synkronisere på filnavnet) ..
* Hvis en JSON Lines CSV-fil noensinne ble ødelagt (For eksempel ugyldig på grunn av en feil på en linje) , EDDTableFromHttpGet kan fortsatt lese alle data på alle linjene før og etter feillinjen. Og .innsett og .slette systemet kan fortsette å legge til nye data i datafilen.
* Fordi JSON Lines CSV-filer er ASCII-filer, hvis en fil noensinne har blitt ødelagt, vil det være enkelt å fikse (i tekstredigering) ..
* JSON Lines CSV støtter Unicode-strenger.
* JSON Lines CSV støtter variabel lengdestrenger (Ikke begrenset til noe max lengde) ..
* JSON Lines CSV støtter 64-bit heltal (longs) ..
* Den formelle naturen og ekstra syntaksen til JSON Lines CSV (vs gammel skole CSV) gir litt ekstra forsikring om at en gitt linje ikke er ødelagt.

I utgangspunktet prøvde vi å bruke.nc3 filer med en ubegrenset dimensjon. Men det var problemer:

* Hovedproblemet var: Det er ingen pålitelig måte å tillate flere tråder å skrive til en.nc3 fil, selv om trådene samarbeider ved å gjøre skriver på en synkronisert måte.
* Hvis en.nc3 fil blir ødelagt, .install og .slette systemet kan ikke fortsette å bruke filen.
* Fordi.nc3 filer er binære, hvis en fil blir ødelagt (Som de gjør på grunn av multi-threading problem) De er svært vanskelige eller umulige å fikse. Det finnes ingen verktøy for å hjelpe med reparasjonen.
* CF har ingen måte å spesifisere koding av strenger, så det er ingen offisiell måte å støtte Unicode, f.eks. UTF-8-kodingen. Vi prøvde å få CF til å støtte en  \\_coding-attributt, men klarte ikke å gjøre noen fremgang. (Unidata, til deres kreditt, støtter  \\_coding attributt.) 
*   .nc3 filer støtter bare faste lengdestrenger. Igjen prøvde vi å få CF ogUnidataå støtte variabel lengde strenger, men klarte ikke å gjøre noen fremgang.
*   .nc3 filer støtter ikke en enkel måte å skille enkelt tegnvariabler fra strengvariabler. Igjen prøvde vi å få CF ogUnidataå støtte et system for å skille disse to datatypene, men klarte ikke å gjøre noen fremgang.
*   .nc3 filer støtter bare 8-bit tegn med en uspesifisert koding. Igjen prøvde vi å få CF ogUnidataå støtte et system for å spesifisere koding, men var ikke i stand til å gjøre noen fremgang.
*   .nc3 filer støtter ikke 64-bit heltall (longs) .. Igjen prøvde vi å få CF ogUnidataå støtte et system for lang tid, men var ikke i stand til å gjøre noe.
         
##### Utgave{#versioning} 
Fordi EDDTable FraHttp Få lagret en logg av alle endringene i datasettet med tidsstempelet og forfatteren av hver endring, kan det raskt gjenskape det datasettet fra hvilket som helst punkt i tiden. På en måte er det en versjon for ethvert punkt i tiden. Hvis brukerens forespørsel om data inkluderer en tidsstempel&lt;= begrensning, f.eks.&lt;=2016-06-23T16:32:22.128Z (eller når som helst) men ingen begrensning av forfatter eller kommando,ERDDAP™vil svare på forespørselen ved først å generere en versjon av datasettet fra det punktet i tide. Så,ERDDAP™anvende brukerens andre begrensninger, som med alle andre forespørsler om data fraERDDAP.. EDDTableFromHttpGet er satt opp slik at denne prosessen er svært rask og effektiv, selv for svært store datasett.

På samme måte kan en bruker finne ut når datasettet ble sist oppdatert ved å be om ...?timestamp&timestamp=max (tidsstempel) & fjernt () 

Og for enhver forespørsel om data, for enhver versjon av datasettet, kan brukerne se hvilken forfatter som gjorde hvilke endringer, og når de gjorde dem.

Dette versjonssystemet muliggjør[Reproducerbar vitenskap](https://en.wikipedia.org/wiki/Reproducibility)fordi alle når som helst kan be om data fra versjonen av datasettet når som helst. Denne finkornede versjonen er ikke mulig med noe annet system som vi vet om. Den underliggende mekanismen er svært effektiv, ved at det ikke er behov for ekstra lagringsplass, og behandlingsoverskuddet er virkelig minimalt.

Ikke alle har behov for denne typen finkornet versjon, men det er overveldende nyttig, kanskje nødvendig, i sammenheng med en stor datastyringsorganisasjon (For eksempel, OOI, Earth Cube, Data One, ogNOAANCEIs) hvor et datasett kan ha flere forfattere (For eksempel sensoren, et automatisert QC-skript og et menneskelig redaktør) ..

\\[Historie: Behovet for denne typen versjon kom først opp for meg (Bob) Les om og diskutere OOI i 2008. På den tiden hadde OOI et tungt, sakte, ineffektivt system for versjon basert på Git. Git er bra for det den var designet til, men ikke dette. I 2008, mens jeg deltok i en OOI-debatt, utviklet jeg et omfattende, effektivt alternativ til OOI-system for databehandling, inkludert mange av funksjonene jeg har lagt til.ERDDAP™Siden da og inkludert dette versjonssystemet. På den tiden og siden, var OOI forpliktet til deres versjonssystem og ikke interessert i alternativer. I 2016 falt andre aspekter av denne planen på plass, og jeg begynte å gjennomføre den. Fordi det var mange avbrudd å jobbe på andre prosjekter, gjorde jeg ikke ferdig før 2018. Selv nå er jeg ikke klar over noe annet vitenskapelig datasystem som gir så rask og enkel tilgang til en versjon av data fra noe tidspunkt i tiden, for ofte skiftende datasett. Enkelte filsystemer tilbyr ikke dette. Relasjonelle databaser gjør det ikke. Cassandra gjør det ikke.\\]
    
##### HTTPS Sett og Slett{#https-put-and-delete} 
*   [Hva med HTTPS PUT og DELETE?](#https-put-and-delete)  
    [Hypertekstoverføringsprotokoll (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)er grunnlaget for World Wide Web og grunnen til at websiden URLs begynner med - http://" eller https://" .. HTTPS er HTTP med et ekstra sikkerhetslag. Hver dag gjør nettlesere, skript og dataprogrammer milliarder av HTTP (S)   **Hent** Forespørsler om å få informasjon fra eksterne kilder. HTTP (S) Inkluderer også andre[verb](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)Spesielt PUT (å presse data til serveren) og DELETE (til DELETE-data fra serveren) .. Ja, PUT og DELETE er den riktige måten å sette inn data i og slette data fra, et datasett via HTTP (S) .. GET støttes av alle deler programvare som kan fungere med HTTP (S) .. Det er virkelig enkelt å jobbe med. Alle vet allerede hvordan man jobber med GET og mange vet hvordan man bruker POST (som kan brukes på i det vesentlige samme måte som GET) , så vi gjorde EDDTableFraHttpGet arbeid med GET og POST. Svært få mennesker (Selv få datamaskinprogrammerere) Har noen gang jobbet med PUT og DELETE. PUT og DELETE støttes generelt kun av dataspråk, så bruk av dem krever et dyktig program. Så PUT og DELETE er vanligvis en mye mer tung tilnærming gitt måten verktøyene har utviklet seg.
     
##### HttpGet Notes{#httpget-notes} 
*   [Noter](#httpget-notes)
    * NeidataVariablekan ha dataType=diagram. Bruk dataType=String i stedet. Hvis du virkelig trenger dataType=char, e-post Chris. John på noaa.gov.
         
##### Takk{#thanks} 
*   [Takk til CORDS for den grunnleggende ideen.](#thanks)  
Grunnleggende ide for EDDTableFramtHttpGet (dvs. ved bruk av enHTTP GETforespørsel om å legge til data i et datasett) er fra UCARs (NCARs?)  [Cloud-verte datatjenester i sanntid (KORDER) ](https://github.com/earthcubeprojects-chords)Prosjekt. Format for parametrene i anmodningen (gjentatt *navn=verdi* , separert av &) er det samme standardformatet som brukes av HTML-skjemaer på nettsider. Det er en enkel og strålende ide og enda mer fordi det mesher så perfekt medERDDAPDet eksisterende systemet for å håndtere tabelldata. Ideen er åpenbar i baksynet, men jeg (Bob) Jeg tenkte ikke på det. EDDTableFraHttp Få bruk av den grunnleggende ideen, kombinert med våre ideer om hvordan man implementerer den, for å lage et system iERDDAP™for å laste opp data. Bortsett fra den grunnleggende ideen om å bruke GET til å presse data inn i systemet, er EDDTableFromHttpGet implementasjon helt annerledes og helt uavhengig av CORDS og har ulike funksjoner (f.eks. loggfiler, biting av data, forskjellige sikkerhetssystem, CRUD-støtte, reproducerbare data) .. Vår eksponering for CORDS var bare en webinar. Vi så ikke på koden eller leste om prosjektet deres fordi vi umiddelbart visste at vi ønsket å implementere systemet på en annen måte. Men vi er takknemlige for den grunnleggende ideen. Full referanse til CORDS er
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graver, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) .. Cloud-verte datatjenester i sanntid for geovitenskapene (KORDER) programvare. UCAR/NCAR - Jordobservasjonslaboratorium.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### EDDTableFraHyraxFiler{#eddtablefromhyraxfiles} 
[ **EDDTableFraHyraxFiler** ](#eddtablefromhyraxfiles)  (Foreldet) aggregerer datafiler med flere variabler, hver med en eller flere delte dimensjoner (For eksempel tid, høyde (eller dybde) , breddegrad, lengdegrad) og tjenestegjort av en[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server)..

* Denne datasetttypen er **Deprekert** .. Den nye og mer generelle løsningen er å bruke[cache FraUrl-alternativ for EDDTable FraFiles](#cachefromurl)  (eller en variant) , som gjør en lokal kopi av de eksterne filene og betjener data fra de lokale filene. Den&lt;cacheFromUrl&gt; kan brukes med alle typer tabulær datafil. **   
Hvis du ikke kan gjøre det fungerer av en eller annen grunn, e-post til Chris. John på noaa.gov.
Hvis det ikke er noen klager før 2020, kan denne datasetttypen fjernes. ** 
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
* I de fleste tilfeller har hver fil flere verdier for venstre (først) dimensjon, for eksempel tid.
* Filene ofte (Men trenger ikke å) har én verdi for de andre dimensjonene (For eksempel høyde (eller dybde) , breddegrad, lengdegrad) ..
* Filene kan ha tegnvariabler med en ekstra dimensjon (For eksempel nCharacters) ..
*   Hyraxservere kan identifiseres av "/dods-bin/nph-dods/" eller//opendap/" i URL-en.
* Denne klassen skjermskraperHyraxwebsider med listene over filer i hver katalog. På grunn av dette er det svært spesifikt for det aktuelle formatet avHyraxnettsider. Vi vil prøve å justereERDDAP™raskt hvis/når fremtidige versjoner avHyraxEndre hvordan filene er oppført.
* Den&lt;filDir&gt; innstillingen ignoreres. Siden denne klassen laster ned og lager en lokal kopi av hver ekstern datafil,ERDDAP™tvinger filen Dir å være *bigParentDirectory* /kopi/ *datasetID* /.
* For&lt;sourceUrl&gt;, bruk URL til basiskatalogen til datasettet iHyraxserver for eksempel
    &lt;sourceUrl&gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;/sourceUrl&gt;
     (Legg den på én linje)   (Beklager at serveren ikke lenger er tilgjengelig) ..
DensourceUrlNettsiden har vanligvisOPeNDAPServerindeks av\\[mappeName\\]På toppen.
* Siden denne klassen alltid laster ned og lager en lokal kopi av hver ekstern datafil, bør du aldri pakke dette datasettet i[EDDTableCopy](#eddtablecopy)..
* Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.
* Se eksempelene 1D, 2D, 3D og 4D for[EDDTableFraNcFiler](#eddtablefromncfiles)..
     
### EDDTableFraInvalidCRAFiler{#eddtablefrominvalidcrafiles} 
[ **EDDTableFraInvalidCRAFiler** ](#eddtablefrominvalidcrafiles)aggregerer data fraNetCDF  (v3 eller v4)  .ncfiler som bruker en spesifikk, ugyldig variant av CF DSG Contigous Tagged Array (CRA) Filer. Selv omERDDAP™støtter denne filtypen, det er en ugyldig filtype som ingen bør begynne å bruke. Grupper som for tiden bruker denne filtypen oppfordres sterkt til å brukeERDDAP™å generere gyldige CF DSG CRA-filer og slutte å bruke disse filene.

Detaljer: Disse filene har flere rad-_størrelse variabler, hver med en prøve-_dimensjon attributt. Filene er ikke-CF-standardfiler fordi flere prøver (obs) dimensjoner skal dekodes og relateres til hverandre med denne ekstra regelen og lover som ikke er en del av CF DSG-spesifikasjonen: " du kan tilknytte en gitt f.eks. temperaturverdi (tempo\\_obs dimensjon) Med en gitt dybdeverdi (z__obs dimensjon, dimensjonen med flest verdier) , fordi: temperaturraden\\_size (til et gitt kast) vil være enten 0 eller lik den tilsvarende dybde-_størrelse (for det kastet)   (Det er regelen) .. Så hvis temperaturraden\\_størrelsen ikke er 0, så n temperaturverdier for den støpte relaterer direkte til n dybdeverdier for den støpte (Det er løftet) ."

Et annet problem med disse filene: Principal-_Investigator rad-_size variabelen har ikke en prøve-_dimensjon attributt og følger ikke ovennevnte regel.

Prøvefiler for denne type datasett kan finnes på https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Denne tjeneren er ikke lenger pålitelig tilgjengelig\\]..

Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.

Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.

Det første Generer Datasett Xml gjør for denne typen datasett etter at du har svart på spørsmålene er å skrive ut ncdump-lignende struktur i prøvefilen. Så hvis du skriver inn noen goofy svar for den første loopen gjennom Genererer Datasett Xml, i det minste kan du se omERDDAP™kan lese filen og se hvilke dimensjoner og variabler i filen. Deretter kan du gi bedre svar for den andre løkken gjennom Genererer DatasetsXml.
 
### EDDTableFraJsonlCSVFiler{#eddtablefromjsonlcsvfiles} 
[ **EDDTableFraJsonlCSVFiler** ](#eddtablefromjsonlcsvfiles)aggregerer data fra[JSON Linjer CSV-filer](https://jsonlines.org/examples/).. Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.

* Som jsonlines.org sier, dette formatet er " bedre enn CSV" (Og lovlig, som føderal ansatt, kan jeg ikke være enig eller uenig med dem - hvor gal er det?) .. CSV har aldri blitt formelt definert og er hemmet av den historiske bagasjen relatert til dens tilkobling til de opprinnelige regneark programmer. JSON Lines CSV er i sammenligning fullstendig definert og fordeler fra dens tilkobling til den mye brukte JSON-standarden, som i sin tur fordeler fra dens tilkobling tilJavaSkript ogJava.. Merkelig nok er det full støtte for lange heltal og for Unicode tegn i strenger, og en klar måte å inkludere andre spesielle tegn på (Spesielt faner og nye linjer) i strenger.
    
Dette formatet er spesielt bra for datasett der du må regelmessig legge til ekstra rader til slutten av en gitt datafil. Av den grunn og andre (Se ovenfor) ,[EDDTableFraHttpGet](#eddtablefromhttpget)bruker Json Lines CSV-filer for datalagring.
    
* Inndatafilene antas å være UTF-8 kodet. Men gitt \\u *ddddd* format for koding av spesielle tegn (For eksempel er \\u20ac koden for Euro tegn) , har du muligheten til å skrive filene slik at de bare inneholder 7-bit ASCII tegn ved å bruke \\u *ddddd* å kode alle tegn over #127.
     
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
    
Det første GenererDatasetsXml gjør for denne typen datasett etter at du har svart på spørsmålene er å skrive ut den ncdump-lignende strukturen til prøvefilen. Så hvis du skriver inn noen goofy svar for den første loopen gjennom Genererer Datasett Xml, i det minste kan du se omERDDAP™kan lese filen og se hvilke dimensjoner og variabler i filen. Deretter kan du gi bedre svar for den andre løkken gjennom Genererer DatasetsXml.
    
* Varsel: NårERDDAP™Leser JSON Linjer CSV-datafiler, hvis den finner en feil på en gitt linje (For eksempel feil antall elementer) , det logger en advarselsmelding (" VARNING: Dårlig linje (s) av data" ... med en liste over dårlige linjer på påfølgende linjer) til[log.txt-fil](/docs/server-admin/additional-information#log)og fortsetter å lese resten av datafilen. Derfor er det ditt ansvar å se regelmessig (eller skrive et skript å gjøre det) For den meldingen i loggen. txt slik at du kan løse problemene i datafilene.ERDDAP™er satt opp slik at brukerne kan fortsette å lese alle tilgjengelige gyldige data selv om noen linjer i filen har feil.
     
### EDDTableFraMultidimNcFiler{#eddtablefrommultidimncfiles} 
[ **EDDTableFraMultidimNcFiler** ](#eddtablefrommultidimncfiles)aggregerer data fraNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer med flere variabler, hver med en eller flere delte dimensjoner. Filene kan ha tegnvariabler med eller uten ekstra dimensjon (For eksempel STRENG14) .. Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.

* Hvis filene er flerdimensjonale CF DSG-varianter, bruk denne datasetttypen i stedet for[EDDTableFraNcCFFiler](#eddtablefromncfiles)..
     
* For nye tabelldatasett fra.ncfiler, bruk dette alternativet før du prøver eldre[EDDTableFraNcFiler](#eddtablefromncfiles).. Noen fordeler ved denne klassen er:
    * Denne klassen kan lese flere variabler fra et bredere utvalg av filstrukturer. Hvis du angir DimensionsCSV (en kommadelt liste over dimensjonsnavn) i Generer Datasett Xml (eller&lt;dimensjonerCSV&gt; idatasets.xmlinfo til et av disse datasettene, deretterERDDAP™vil bare lese variabler i kildefilene som bruker noen eller alle disse dimensjonene, pluss alle skalarvariabler. Hvis en dimensjon er i en gruppe, må du angi dets fulle navn, f.eks. *gruppeName/ dimensionName*  ".
    * Denne klassen kan ofte avvise filer svært raskt hvis de ikke samsvarer med en forespørsels begrensninger. Lese data fra store samlinger vil ofte gå mye raskere.
    * Denne klassen håndterer sanne tegnvariabler (ikke-strekning variabler) riktig.
    * Denne klassen kan trimme strengvariabler når skaperen ikke brukte Netcdf-java's writeStrings (som legger til tegn #0 for å markere slutten av strengen) ..
    * Denne klassen er bedre til å håndtere individuelle filer som mangler visse variabler eller dimensjoner.
    * Denne klassen kan fjerne blokker av rader med manglende verdier som angitt i[CF Diskret prøvetakingsgeometri (DSG) Ufullstendig flerdimensjonal Array-filer](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
    
Det første GenererDatasetsXml gjør for denne typen datasett etter at du har svart på spørsmålene er å skrive ut den ncdump-lignende strukturen til prøvefilen. Så hvis du skriver inn noen goofy svar for den første loopen gjennom Genererer Datasett Xml, i det minste kan du se omERDDAP™kan lese filen og se hvilke dimensjoner og variabler i filen. Deretter kan du gi bedre svar for den andre løkken gjennom Genererer DatasetsXml.
    
Gruppe -- Opprett datasett Xml vil be om en gruppe Du kan skrive inn " for å få det til å søke alle grupper, *Noen Gruppe* " eller " *noen gruppe/nogleSubGroup* For å få det til å søke en bestemt gruppe, eller\\[rot\\]to å få det til å søke bare rotgruppen. " Gruppen" strengen blir&lt;gruppe&gt; idatasets.xmlInformasjon om datasettet (Selv om\\[rot\\]" blir -) ..
    
DimensjonerCSV -- Opprett datasett Xml vil be om en DimensionsCSV-streng. Dette er en kommadelt verdiliste over kildenavn på et sett dimensjoner. Opprett datasett Xml vil bare lese datavariabler i prøven.ncfiler som bruker noen eller alle disse dimensjonene (Ingen andre dimensjoner) , pluss alle skalarvariabler i filen, og gjør datasettet fra disse datavariabler. Hvis en dimensjon er i en gruppe, må du angi dets fulle navn, f.eks. *gruppeName/ dimensionName*  ".
Hvis du ikke angir noe (en tom streng) , Opprett datasett Xml vil se etter variabler med de fleste dimensjoner, på teorien om at de vil være de mest interessante, men det kan være tider når du vil ønske å lage et datasett fra noen andre gruppe av datavariabler som bruker noen andre gruppe dimensjoner.
Hvis du bare angir et dimensjonsnavn som ikke eksisterer (F.eks. NO\\_MATCCH) ,ERDDAP™Finne alle skalarvariabler.
" DimensionsCSV" strengen blir&lt;dimensjonerCSV&gt; idatasets.xmlInformasjon om datasettet.
    
#### behandlingDimensioner{#treatdimensionsas} 
Det er en kategori av ugyldig.ncfiler (fordi de ikke følger CF-reglene) som har flere dimensjoner (f.eks. lat, lon, tid) Når de skulle ha brukt bare én dimensjon (f.eks. tid) For eksempel:
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
EDDTableFromMultidimNcFiles har en spesiell funksjon for å håndtere disse filene: Hvis du legger til den globale attributten "treatDimensionsAs" til datasettene globaltaddAttributesDu kan fortelleERDDAP™å behandle visse dimensjoner (f.eks. lat og lon) som om de var en annen dimensjon (f.eks. tid) .. Attributverdien må være en kommaseparert liste som spesifiserer "fra" dimensjoner og thentil" dimensjonen, f.eks.
<att name="treatDimensionsAs">lat, lon, tid</att>  
SåERDDAP™vil lese filen som om den var:
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
Selvfølgelig må den nåværende størrelsen på hver av dimensjonene i listen være den samme; ellers,ERDDAP™vil behandle filen som en "Bad File".

Merk at disse filene er ugyldige fordi de ikke følger CF-regler. Selv omERDDAP™kan lese dem, anbefaler vi sterkt at du ikke oppretter filer som dette fordi andre CF-baserte programvareverktøy ikke vil kunne lese dem riktig. Hvis du allerede har slike filer, anbefaler vi sterkt å erstatte dem med gyldige filer så snart som mulig.
    
### EDDTableFraNcFiler{#eddtablefromncfiles} 
[ **EDDTableFraNcFiler** ](#eddtablefromncfiles)aggregerer data fraNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer og[Zarr](https://github.com/zarr-developers/zarr-python)filer (fra versjon 2.25) med flere variabler, hver med én delt dimensjon (For eksempel tid) eller mer enn én delt dimensjon (For eksempel tid, høyde (eller dybde) , breddegrad, lengdegrad) .. Filene må ha samme dimensjonsnavn. En gitt fil kan ha flere verdier for hver av dimensjonene og verdiene kan være forskjellige i forskjellige kildefiler. Filene kan ha tegnvariabler med en ekstra dimensjon (For eksempel STRENG14) .. Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.

Zarr-filer har litt forskjellig oppførsel og krever enten filenNameRegex eller pathRegex å inkludere "zarr".

* Hvis.ncFiler bruker en av[CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)filformater, prøv å bruke[EDDTableFraNcCFFiler](#eddtablefromncfiles)Før du prøver dette.
     
* For nye tabelldatasett fra.ncfiler, prøv den nyere[EDDTableFraMultidimNcFiler](#eddtablefrommultidimncfiles)Først.
     
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
    
Det første GenererDatasetsXml gjør for denne typen datasett etter at du har svart på spørsmålene er å skrive ut den ncdump-lignende strukturen til prøvefilen. Så hvis du skriver inn noen goofy svar for den første loopen gjennom Genererer Datasett Xml, i det minste kan du se omERDDAP™kan lese filen og se hvilke dimensjoner og variabler i filen. Deretter kan du gi bedre svar for den andre løkken gjennom Genererer DatasetsXml.
    
DimensjonerCSV -- Opprett datasett Xml vil be om en DimensionsCSV-streng. Dette er en kommadelt verdiliste over kildenavn på et sett dimensjoner. Opprett datasett Xml vil finne datavariabler i.ncfiler som bruker noen eller alle disse dimensjonene, pluss alle skalarvariabler, og gjør datasettet fra disse datavariabler. Hvis du ikke angir noe (en tom streng) , Opprett datasett Xml vil se etter variabler med de fleste dimensjoner, på teorien om at de vil være de mest interessante, men det kan være tider når du vil ønske å lage et datasett fra noen andre gruppe av datavariabler som bruker noen andre gruppe dimensjoner.
    
* 1D Eksempel: 1D-filer er noe forskjellig fra 2D, 3D, 4D, ... filer.
    * Du kan ha et sett.ncdatafiler der hver fil har en måneds dataverdi fra en drivende bøy.
    * Hver fil vil ha 1 dimensjon, for eksempel tid (størrelse =\\[Mange\\]) ..
    * Hver fil vil ha en eller flere 1D-variabler som bruker den dimensjonen, for eksempel tid, lengdegrad, breddegrad, lufttemperatur, ....
    * Hver fil kan ha 2D-tegnvariabler, for eksempel med dimensjoner (tid,nCharacters) ..
         
* 2D Eksempel:
    * Du kan ha et sett.ncdatafiler der hver fil har en måneds dataverdi fra en drivende bøy.
    * Hver fil vil ha 2 dimensjoner, for eksempel tid (størrelse =\\[Mange\\]) og id (størrelse = 1) ..
    * Hver fil vil ha 2 1D-variabler med samme navn som dimensjonene og med samme navn-dimensjon, for eksempel tid (tid) , id (id) .. Disse 1D variablene bør inkluderes i listen over&lt;dataVariable&gt; er i datasettets XML.
    * Hver fil vil ha en eller flere 2D variabler, for eksempel lengdegrad, breddegrad, lufttemperatur, vanntemperatur, ...
    * Hver fil kan ha 3D-tegnvariabler, for eksempel med dimensjoner (tid,id,nCharacters) ..
         
* 3D Eksempel:
    * Du kan ha et sett.ncdatafiler der hver fil har én måneds dataverdi fra én stasjonær bøy.
    * Hver fil vil ha 3 dimensjoner, for eksempel tid (størrelse =\\[Mange\\]) , lat (størrelse = 1) , og lon (størrelse = 1) ..
    * Hver fil vil ha 3 1D variabler med samme navn som dimensjonene og ved bruk av samme navn dimensjon, for eksempel tid (tid) , lat (lat) , lon (lon) .. Disse 1D variablene bør inkluderes i listen over&lt;dataVariable&gt; er i datasettets XML.
    * Hver fil vil ha en eller flere 3D-variabler, for eksempel lufttemperatur, vanntemperatur, ...
    * Hver fil kan ha 4D-tegnvariabler, for eksempel med dimensjoner (tid, lat,lon,nCharacters) ..
    * Filens navn kan ha navnet på boen i filens navn.
         
* 4D Eksempel:
    * Du kan ha et sett.ncdatafiler der hver fil har én måneds dataverdi fra én stasjon. På hvert tidspunkt tar stasjonen lesing på en rekke dybder.
    * Hver fil vil ha 4 dimensjoner, for eksempel tid (størrelse =\\[Mange\\]) , dybde (størrelse =\\[Mange\\]) , lat (størrelse = 1) , og lon (størrelse = 1) ..
    * Hver fil vil ha 4 1D variabler med samme navn som dimensjonene og ved hjelp av samme navn dimensjon, for eksempel tid (tid) , dybde (dybde) , lat (lat) , lon (lon) .. Disse 1D variablene bør inkluderes i listen over&lt;dataVariable&gt; er i datasettets XML.
    * Hver fil vil ha en eller flere 4D variabler, for eksempel lufttemperatur, vanntemperatur, ...
    * Hver fil kan ha 5D-tegnvariabler, for eksempel med dimensjoner (tid, dyp, lat,lon,nCharacters) ..
    * Filens navn kan ha navnet på boen i filens navn.
         
### EDDTableFraNcCFFiler{#eddtablefromnccffiles} 
[ **EDDTableFraNcCFFiler** ](#eddtablefromnccffiles)aggregerer dataene fraNetCDF  (v3 eller v4)  .nc  (eller[.ncml](#ncml-files)) filer som bruker et av filformatene som er spesifisert av[CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konvensjoner. Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.

For filer som bruker en av de flerdimensjonale CF DSG variantene, bruk[EDDTableFraMultidimNcFiler](#eddtablefrommultidimncfiles)I stedet.

CF DSG-konvensjonene definerer dusinvis av filformater og inkluderer mange mindre variasjoner. Denne klassen omhandler alle variasjonene vi er klar over, men vi kan ha savnet en (eller mer) .. Så hvis denne klassen ikke kan lese data fra CF DSG-filer, vennligst vær så snill[Nå ut for ekstra støtte](/docs/intro#support)..

Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
 
### EDDTableFraNccsvFiler{#eddtablefromnccsvfiles} 
[ **EDDTableFraNccsvFiler** ](#eddtablefromnccsvfiles)aggregerer data fra[NCCSV](/docs/user/nccsv-1.00)ASCII .csv-filer. Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.

* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
    
Det første GenererDatasetsXml gjør for denne typen datasett etter at du har svart på spørsmålene er å skrive ut den ncdump-lignende strukturen til prøvefilen. Så hvis du skriver inn noen goofy svar for den første loopen gjennom Genererer Datasett Xml, i det minste kan du se omERDDAP™kan lese filen og se hvilke dimensjoner og variabler i filen. Deretter kan du gi bedre svar for den andre løkken gjennom Genererer DatasetsXml.
    
* Varsel: NårERDDAP™leser NCCSV-datafiler, hvis den finner en feil på en gitt linje (For eksempel feil antall elementer) , det logger en advarselsmelding (" VARNING: Dårlig linje (s) av data" ... med en liste over dårlige linjer på påfølgende linjer) til[log.txt-fil](/docs/server-admin/additional-information#log)og fortsetter å lese resten av datafilen. Derfor er det ditt ansvar å se regelmessig (eller skrive et skript å gjøre det) For den meldingen i loggen. txt slik at du kan løse problemene i datafilene.ERDDAP™er satt opp slik at brukerne kan fortsette å lese alle tilgjengelige gyldige data selv om noen linjer i filen har feil.
     
### EDDTableFra NOS{#eddtablefromnos} 
[ **EDDTableFra NOS** ](#eddtablefromnos)  (Deprekert) håndterer data fra enNOAA [NOS](https://opendap.co-ops.nos.noaa.gov/axis/)kilde, som bruker[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)for forespørsler og svar. Det er veldig spesifikk åNOAAIngens XML. Se prøven EDDTableFra NOS-datasett i datasett2.xml.
 
### EDDTableFromOBIS{#eddtablefromobis} 
[ **EDDTableFromOBIS** ](#eddtablefromobis)håndtere data fra et Ocean Biogeografisk informasjonssystem (OBIS) server (var http://www.iobis.org  ) .. Det er mulig at det ikke er mer aktive servere som bruker denne nå utdaterte typen OBIS serversystem.

* OBIS-servere forventer en XML-forespørsel og returnerer en XML-respons.
* Fordi alle OBIS-servere tjener samme variabler på samme måte (var http://iobis.org/tech/provider/questions ) , trenger du ikke å spesifisere mye for å konfigurere et OBIS-datasett iERDDAP..
* Du må inkludere a-creator\\_email" Attribut i det globaleaddAttributesSiden denne informasjonen brukes i lisensen. En egnet e-postadresse kan finnes ved å lese XML-responsen fra kildeadressen.
* Du kan eller ikke kan få den globale egenskapen [&lt;subsetVariables&gt;] (#subsetvariables) å jobbe med en gitt OBIS-server. Hvis du prøver, bare prøv en variabel (For eksempel vitenskapelig navn eller genus) ..
#### EDDTableFromOBIS skjelett XML{#eddtablefromobis-skeleton-xml} 
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

### EDDTableFraParquetFiler{#eddtablefromparquetfiles} 
[ **EDDTableFraParquetFiler** ](#eddtablefromparquetfiles)håndterer data fra[Parquet](https://parquet.apache.org/).. Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.

* Parquet er designet for å komprimere svært effektivt, slik at det kan gi deg mindre filstørrelser enn andre formater.
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
* Varsel: NårERDDAP™Leser Parquet-datafiler, hvis den finner en feil på en gitt linje (For eksempel feil antall elementer) , det logger en advarselsmelding (" VARNING: Dårlig linje (s) av data" ... med en liste over dårlige linjer på påfølgende linjer) til[log.txt-fil](/docs/server-admin/additional-information#log)og fortsetter å lese resten av datafilen. Derfor er det ditt ansvar å se regelmessig (eller skrive et skript å gjøre det) For den meldingen i loggen. txt slik at du kan løse problemene i datafilene.ERDDAP™er satt opp slik at brukerne kan fortsette å lese alle tilgjengelige gyldige data selv om noen linjer i filen har feil.
     
### EDDTableFraSOS {#eddtablefromsos} 
[ **EDDTableFraSOS** ](#eddtablefromsos)håndtere data fra en sensorobservasjonstjeneste (SWE/[SOS](https://www.ogc.org/standards/sos)) server.

* Denne datasetttypen samler data fra en gruppe stasjoner som alle betjenes av énSOSserver.
* Alle stasjonene tjener det samme settet av variabler (Selv om kilden til hver stasjon ikke trenger å betjene alle variabler) ..
*   SOSservere forventer en XML-forespørsel og returnerer en XML-respons.
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det. Det er ikke lett å generere datasett XML forSOSDatasett for hånd. For å finne den nødvendige informasjonen må du besøkesourceUrl+ "? service=SOS& Request=GetCapabilities" i en nettleser; se på XML; gjør en GetObservation for hånd; og se på XML-svar på forespørselen.
* Med tilsetning av nye typerSOSservere og endringer i gamle servere, det blir vanskeligere forERDDAP™for å automatisk oppdage servertypen fra serverens svar. Bruk av&lt;sosServerType&gt; (med en verdi av IOOS\\_NDBC, IOOS\\_NOS,OOSTethyseller WHOI) Nå er det STRONGLIG. Hvis du har problemer med datasett av denne typen, prøv å kjøre på nytt Genererer Datasett Xml tilSOSserver. Oppretter Datasett Xml vil la deg prøve ut det forskjellige&lt;sosServerType&gt; alternativer til du finner den riktige for en gitt server.
*   SOSOversikt:
    * SWE (Sensor Web Aktivering) ogSOS  (Sensorobservasjon) er[OpenGIS® standarder](https://www.ogc.org/standards).. Nettstedet har standarddokumentene.
    * DenOGCWeb Services Common Spesifikasjon Ver 1.1.0 (OGC06-121r3) dekker bygging av GET og POST-forespørsler (se § 7.2.3 og § 9) ..
    * Hvis du sender en getCapabilites xml forespørsel til enSOSserver (sourceUrl+ "?service=SOS& Request=GetCapabilities") , får du et xml resultat med en liste over stasjoner og observert Egenskaper som de har data til.
    * En observertProperty er en formel URI referanse til en eiendom. For eksempel urn:ogc:fenomenon: lengdegrad:wgs84 eller https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * En observertProperty er ikke en variabel.
    * Mer enn én variabel kan ha samme observert Eiendom (For eksempel, inneTemp og utenfor Temp kan begge ha observert Eiendom https://mmisw.org/ont/cf/parameter/air\\_temperature ) ..
    * Hvis du sender en getObservation xml forespørsel til enSOSserver, får du et xml resultat med beskrivelser av feltnavn i respons, feltenheter og data. Feltnavnene inkluderer lengdegrad, breddegrad, dybde (Kanskje) , og tid.
    * HverdataVariablefor en EDD-tabellFraSOSmå inneholde en "observertProperty"-attributt som identifiserer den observerteProperty som må be om fra serveren for å få den variabelen. Ofte fleredataVariableS vil liste den samme kompositt observertProperty.
    * Datatypen for hverdataVariablekan ikke angis av serveren. I så fall må du se på XML-datasvarene fra serveren og tildele passende [&lt;dataType&gt;s] (#datatype) iERDDAP™DatasettdataVariableDefinisjoner.
    *    (På tidspunktet for å skrive dette) NoenSOSservere svarer på getobservasjonsforespørsler for mer enn én observert Eiendom ved bare å returnere resultater for det første av de observerte eigenskapane. (Ingen feilmelding&#33;) Se forespørselen om konstruktørens parameter Observert fysiologiSærlig.
* EDDTableFraSOSLegger automatisk til
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
til datasettets globale egenskaper når datasettet opprettes.
*   SOSservere vanligvis uttrykk[enheter](#units)med[UCUM](https://unitsofmeasure.org/ucum.html)systemet. MestERDDAP™servere uttrykksenheter med[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)systemet. Hvis du trenger å konvertere mellom de to systemene, kan du bruke[ERDDAPwebtjenesten til konvertering av UCUM-enheter til/fraUDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)..
#### EDDTableFraSOSskjelett XML{#eddtablefromsos-skeleton-xml} 
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

### EDDTableFraTreddsFiler{#eddtablefromthreddsfiles} 
[ **EDDTableFraTreddsFiler** ](#eddtablefromthreddsfiles)  (Foreldet) aggregerer datafiler med flere variabler, hver med en eller flere delte dimensjoner (For eksempel tid, høyde (eller dybde) , breddegrad, lengdegrad) og tjenestegjort av en[TREDDSOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/)..

* Denne datasetttypen er **Deprekert** .. Den nye og mer generelle løsningen er å bruke[cache FraUrl-alternativ for EDDTable FraFiles](#cachefromurl)  (eller en variant) , som gjør en lokal kopi av de eksterne filene og betjener data fra de lokale filene. Den&lt;cacheFromUrl&gt; alternativet kan brukes med alle typer tabulær datafil fra enhver webbasert kilde som publiserer en kataloglignende liste over filer. **   
Hvis du ikke kan gjøre det fungerer av en eller annen grunn, e-post til Chris. John på noaa.gov.
Hvis det ikke er noen klager før 2020, kan denne datasetttypen fjernes. ** 
* Vi anbefaler å bruke[Opprett datasett Xml-programmet](#generatedatasetsxml)å lage et grovt utkast avdatasets.xmlbit for dette datasettet. Deretter kan du redigere det for å finjustere det.
* I de fleste tilfeller har hver fil flere verdier for venstre (først) dimensjon, for eksempel tid.
* Filene ofte (Men trenger ikke å) har én verdi for de andre dimensjonene (For eksempel høyde (eller dybde) , breddegrad, lengdegrad) ..
* Filene kan ha tegnvariabler med en ekstra dimensjon (For eksempel nCharacters) ..
* TREDDS-servere kan identifiseres av "/thredds/" i URL-ene. For eksempel
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* THREDDS-servere har kataloger på ulike steder. Denne klassen REQUIRES som URL inkluderer "/thredds/catalog/". Du kan vanligvis finne denne variabelen ved å starte i en nettleser i rotkatalogen, og deretter klikke gjennom til ønsket underkatalog.
* Denne klassen leser katalog.xml filer som betjenes av THREDDS med listene over&lt;katalogRefs&gt; (referanser til ytterligere katalog.xml underfiler) og&lt;Datasett&gt;s (datafiler) ..
* Den&lt;filDir&gt; innstillingen ignoreres. Siden denne klassen laster ned og lager en lokal kopi av hver ekstern datafil,ERDDAP™tvinger filen Dir å være *bigParentDirectory* /kopi/ *datasetID* /.
* For&lt;sourceUrl&gt;, bruk URL til katalog.xml-filen for datasettet i TREDDS-serveren, for eksempel: for denne URL som kan brukes i en nettleser,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Denne serveren er ikke lenger pålitelig tilgjengelig.\\],
bruk&lt;sourceUrl&gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;/sourceUrl&gt;
     (Legg den på én linje) ..
* Siden denne klassen alltid laster ned og lager en lokal kopi av hver ekstern datafil, bør du aldri pakke dette datasettet i[EDDTableCopy](#eddtablecopy)..
* Denne datasetttypen støtter en valgfri, sjelden brukt, spesiell tag,&lt;spesialMode &gt; *modus* &lt;/spesialMode&gt; som kan brukes til å spesifisere at spesielle, hardkodede regler bør brukes til å bestemme hvilke filer som skal lastes ned fra serveren. Den eneste gyldige *modus* er SAMOS som brukes med datasett fra https://tds.coaps.fsu.edu/thredds/catalog/samos å laste ned bare filene med siste versjonsnummer.
* Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles)For informasjon om hvordan denne klassen fungerer og hvordan du bruker den.
* Se eksempelene 1D, 2D, 3D og 4D for[EDDTableFraNcFiler](#eddtablefromncfiles)..
     
### EDDTableFraWFSFiler{#eddtablefromwfsfiles} 
[ **EDDTableFraWFSFiler** ](#eddtablefromwfsfiles)  (Deprekert) gjør en lokal kopi av alle data fra enArcGISKartServerWFSserver slik at dataene kan lagres rasktERDDAP™brukere.

* Du må angi en spesielt formatertsourceUrlglobal attributt å fortelleERDDAP™Hvordan be om funksjonsinformasjon fra serveren. Vennligst bruk dette eksemplet som mal:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (Legg alt på én linje) 
* Du må legge til en spesiell global attributt å fortelleERDDAP™Hvordan identifisere navnene på bitene på data som skal lastes ned. Dette vil sikkert fungere for alle EDDTableFromWFSFildatasett:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Siden denne klassen alltid laster ned og lager en lokal kopi av hver ekstern datafil, bør du aldri pakke dette datasettet i[EDDTableCopy](#eddtablecopy)..
* Se denne klassens superklasse,[EDDTableFra Filer](#eddtablefromfiles), for mer informasjon om hvordan denne klassen fungerer og hvordan du bruker den.
     
### EDDTable{#eddtableaggregaterows} 
[ **EDDTable** ](#eddtableaggregaterows)kan gjøre et EDDTable datasett fra en gruppe "barn" EDDTable datasett.

* Her er noen bruksområder for EDDTableAggregate roads:
    * Du kan gjøre et EDDTableAggregateRows datasett fra to forskjellige typer filer eller datakilder, for eksempel et datasett med data opp til slutten av forrige måned lagret i.ncCF-filer og et datasett med data for den aktuelle måneden som lagres i en relasjonsdatabase.
    * Du kan gjøre en EDDTableAggregate roads datasett for å håndtere en endring i kildefiler (For eksempel endret tidsformat eller endret variabelnavn eller data Type/scale\\_factor/add\\_offsetEndret) .. I dette tilfellet ville ett barn få data fra filer gjort før endringen og det andre barnet ville få data fra filer gjort etter endringen. Denne bruken av EDDTableAggregate roads er et alternativ til bruk[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco).. Med mindre det er en skillefunksjon i filnavnene (så du kan bruke&lt;filNameRegex&gt; for å bestemme hvilken fil som tilhører hvilket barnedatasett), må du sannsynligvis lagre filene for de to barnedatasettene i ulike mapper.
    * Du kan lage en EDDTableAggregate roads datasett som har en delt undergruppe av variabler av ett eller flere lignende, men ulike datasett, for eksempel et datasett som gjør et profildatasett fra kombinasjonen av et profildatasett, et timeSeriesProfildatasett og en baneutgaveProfildatasett (som har noen forskjellige variabler og noen variabler til felles - i så fall må du lage spesielle varianter for barn datasett, med bare de uvanlige variabler) ..
    * Du kan ha flere frittstående datasett, hver med samme type data, men fra en annen stasjon. Du kan la disse datasettene være intakte, men også opprette et EDDTableAggregateRoons datasett som har data fra alle stasjonene -- hvert av barnedatasettene kan være en enkel[EDDTableFraErddap](#eddfromerddap), som peker på et av de eksisterende stasjonsdatasettene. Hvis du gjør dette, gi hver av EDDTableFromErddap datasett en annendatasetIDenn de opprinnelige frittstående datasettene, f.eks. ved å legge til "Child" til det opprinneligedatasetID..
* Hvert barn&lt;datasett&gt; er spesifisert må være et komplett datasett, som om det var et frittstående datasett. Alle må ha det samme[dataVariables](#datavariable)I samme rekkefølge, med samme[destinationNames](#destinationname),[Data Typer](#datatype),[missing\\_values](#missing_value),[\\_Fyllverdier](#missing_value), og[enheter](#units).. Metadataene for hver variabel for datasettet EDDTableAggregateRoads kommer fra variabler i det første barnedatasettet, men EDDTableAggregateRoads vil oppdatere[actual\\_range](#actual_range)Metadata som skal være det faktiske området for alle barn.
* Anbefaling: Få hvert barn datasett fungerer som frittstående datasett. Prøv deretter å gjøre EDDTableAggregate roads datasett ved å kutte og lime inndatasets.xmlbit for hver inn i den nye EDDTableAggregate Raddatasett.
* Datasett Standard sorteringsorden -- I rekkefølgen av barnedatasettene bestemmes den generelle standard sorteringsordenen for resultatene. Selvfølgelig kan brukere be om en annen rekkefølge for et gitt sett med resultater ved å legge til &orderBy (" *kommaseparert liste over variabler* ") til slutten av forespørselen.
* Kilden"[global Egenskaper](#global-attributes)For EDDTableAggregate roads er de kombinerte globaleAttributene fra det første barnedatasettet. EDDTableAggregaten Rader kan ha en global&lt;addAttributes&gt; å tilby ytterligere globale attributter eller overstyre kilde globale attributter.
#### EDDTableAggregate Rader skjelett XML{#eddtableaggregaterows-skeleton-xml} 
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
[ **EDDTableCopy** ](#eddtablecopy)kan gjøre en lokal kopi av mange typer EDDTable datasett og deretter lagre dataene raskt fra den lokale kopien.

* EDDTableCopy (og for nettdata,[EDDGridKopier](#eddgridcopy)) En veldig enkel å bruke og en veldig effektiv **løsning på noen av de største problemene med å betjene data fra eksterne datakilder:** 
    * Å få tilgang til data fra en fjerndatakilde kan være langsom.
        * De kan være langsomme fordi de iboende er langsomme (For eksempel en ineffektiv type server) ,
        * fordi de er overveldet av for mange forespørsler,
        * eller fordi serveren eller den eksterne serveren er begrenset båndbredde.
    * Fjerndatasettet er noen ganger utilgjengelig (av en rekke grunner) ..
    * Relying på én kilde for data skalerer ikke bra (For eksempel når mange brukere og mangeERDDAPbruk det) ..
         
* Hvordan det fungerer -- EDDTableCopy løser disse problemene automatisk ved å lage og vedlikeholde en lokal kopi av dataene og betjene data fra den lokale kopien.ERDDAP™kan tjene data fra den lokale kopien svært raskt. Og å lage og bruke en lokal kopi lindrer byrden på fjernserveren. Og den lokale kopien er en sikkerhetskopi av originalen, som er nyttig i tilfelle noe skjer med originalen.
    
Det er ikke noe nytt om å lage en lokal kopi av et datasett. Det nye er at denne klassen gjør det\\*lett\\*å skape og\\*Vedlikehold\\*en lokal kopi av data fra en\\*Varietet\\*av typer eksterne datakilder og\\*Legg til metadata\\*mens du kopierer dataene.
    
#### EDDTableCopy&lt;cacheFromUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFromUrl&gt; er et alternativ til EDDTableCopy. De jobber annerledes.

* EDDTable Kopier fungerer ved å be om biter av data fra en ekstern tjeneste og lagre disse bitene i lokale filer. Således er EDDTableCopy nyttig i noen tilfeller hvor dataene er tilgjengelige via en fjerntjeneste.
* [&lt;cacheFromUrl&gt;] (#cachefromurl) Laster ned eksisterende filer oppført på en ekstern nettside.&lt;cacheFromUrl&gt; er lettere å bruke og mer pålitelig siden det enkelt kan se når det er en ny ekstern datafil eller når en ekstern datafil har endret seg og dermed må lastes ned.

Hvis det er situasjoner der EDDTableCopy eller&lt;cacheFromUrl&gt; kan brukes, brukes&lt;cacheFromUrl&gt; fordi det er enklere og mer pålitelig.
     
#### &lt;EkstraktMOD Navn &gt;{#extractdestinationnames} 
EDDTable Kopier gjør den lokale kopien av dataene ved å be om deler av data fra fjerndatasettet. EDDTable Kopier avgjør hvilke biter å be om ved å be om & distinkt () verdier for&lt;Ekstrakt MODNames&gt; (angitt idatasets.xmlSe nedenfor) , som er de mellomromsdelte destinasjonsnavnene på variabler i fjerndatasettet. For eksempel
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
kan gi tydelige verdier kombinasjoner av driver=tig17,profil=1017, driver=tig17,profil=1095, ... driver=une12,profil=1223, driver=une12,profil=1251, ....

I situasjoner der én kolonne (For eksempel profil) kan være alt som kreves for å unikt identifisere en gruppe av rader med data, dersom det er et meget stort antall, for eksempel profiler, kan det være nyttig å også spesifisere et ekstra ekstrakt Destinasjon Navn (For eksempel driver) som tjener til å underlegge profilene. Det fører til færre datafiler i en gitt katalog, noe som kan føre til raskere tilgang.
    
#### Lokale filer{#local-files} 
Hvert stykke data lagres i en separatNetCDFfil i en underkatalog av *bigParentDirectory* /kopi/ *datasetID* / (som angitt i[config.xml](/docs/server-admin/deploy-install#setupxml)) .. Det er ett underkatalognivå for alle, men det siste utdragetName For eksempel vil data for tig17+1017 bli lagret i
     *bigParentDirectory* /copy/ampleDataset/tig17/1017.nc..
For eksempel vil data for une12+1251 bli lagret i
     *bigParentDirectory* /copy/ampleDataset/une12/1251.nc..
Katalog og filnavn opprettet fra dataverdier endres for å gjøre dem filnavn-sikre (For eksempel erstattes mellomrom med "x20") Dette påvirker ikke de faktiske dataene.
     
#### Nye data{#new-data} 
Hver gang EDDTable Kopi lastes på nytt, den kontrollerer fjerndatasettet for å se hvilke separate biter som er tilgjengelige. Hvis filen for en bit data ikke allerede eksisterer, legges en forespørsel om å få biten i en kø.ERDDAPOppgavenThread behandler alle kølige forespørsler om deler av data, én for én. Du kan se statistikk for oppgavenThreads aktivitet på[Statusside](/docs/server-admin/additional-information#status-page)og i[Daglig rapport](/docs/server-admin/additional-information#daily-report).. (Ja,ERDDAP™kunne tilordne flere oppgaver til denne prosessen, men det ville bruke opp mye av den eksterne datakildens båndbredde, minne og CPU-tid, og mye av den lokaleERDDAPbåndbredde, minne og CPU-tid, ingen av dem er en god ide.) 
    
MERK: Første gang en EDDTableCopy lastes inn, (Hvis alt går bra) Mye forespørsler om biter av data vil bli lagt til i oppgavenThreads kø, men ingen lokale datafiler vil ha blitt opprettet. Så konstruktøren vil mislykkes, men oppgaveThread vil fortsette å fungere og opprette lokale filer. Hvis alt går bra, vil oppgavenThread gjøre noen lokale datafiler og neste forsøk på å laste datasettet på nytt (på ~15 minutter) vil lykkes, men i utgangspunktet med en meget begrenset mengde data.
    
MERK: Etter det lokale datasettet har noen data og vises i dinERDDAPHvis fjerndatasettet er midlertidig eller permanent ikke tilgjengelig, vil det lokale datasettet fortsatt fungere.
    
ADVARSEL: Hvis fjerndatasettet er stort og/eller fjernserveren er langsom (Det er problemet, ikke sant?&#33;) Det vil ta lang tid å lage en fullstendig lokal kopi. I noen tilfeller vil den nødvendige tiden være uakseptabel. For eksempel sender 1 TB data over en T1-linje (0.15 GB/s) tar minst 60 dager under optimale forhold. I tillegg bruker den mye båndbredde, minne og CPU-tid på de eksterne og lokale datamaskinene. Løsningen er å sende en harddisk til administratoren av fjerndatasettet slik at s/han kan gjøre en kopi av datasettet og sende harddisken tilbake til deg. Bruk dataene som utgangspunkt og EDDTableCopy vil legge til data i det. (Slik brukte Amazons EC2 Cloud Service til å håndtere problemet, selv om deres system har masse båndbredde.) 
    
ADVARSEL: Hvis en gitt kombinasjon av verdier forsvinner fra et eksternt datasett, sletter EDDTableCopy IKKE den lokale kopierte filen. Hvis du vil, kan du slette det selv.
    
#### TabellKopier&lt;checkSourceData&gt;{#tablecopy-checksourcedata} 
Dendatasets.xmlfor dette datasettet kan ha en valgfri tag
```
    <checkSourceData>true</checkSourceData>  
```
Standardverdien er sann. Hvis/når du setter den til falskt, vil datasettet aldri sjekke kildedatasettet for å se om det er ekstra data tilgjengelig.
     
#### Anbefalt bruk{#recommended-use} 
1. Opprette&lt;Datasett&gt; oppføring (den opprinnelige typen, ikke EDDTableCopy) for fjerndatakilden. **Få det til å fungere riktig, inkludert alle de ønskede metadataene.** 
2. Hvis det er for sakte, legg til XML-kode for å pakke den i et EDDTableCopy-datasett.
    * Bruk en annendatasetID  (Kanskje ved å endredatasetIDav den gamledatasetIDlitt) ..
    * Kopier&lt;tilgjengelig Til&gt;,&lt;reloadEveryNMinutes&gt; og&lt;onChange&gt; fra den eksterne EDDTables XML til EDDTableCopys XML. (Deres verdier for EDDTableCopy materie; deres verdier for det indre datasettet blir irrelevant.) 
    * Opprette&lt;Ekstrakt MÅNADNames&gt; tag (Se ovenfor) ..
    *   &lt;orderExtractBy&gt; er en OPTIONAL mellomromsseparert liste over destinasjonsvariable navn i fjerndatasettet. Når hver del av data lastes ned fra den eksterne serveren, sorteres biten etter disse variablene (med den første variabelen, så med den andre variabelen hvis den første variabelen er bundet, ...) .. I noen tilfeller,ERDDAP™vil kunne ekstrahere data raskere fra de lokale datafilene hvis den første variabelen i listen er en numerisk variabel ("time"teller som en numerisk variabel) .. Men velg disse variablene på en måte som passer for datasettet.
3.  ERDDAP™vil gjøre og vedlikeholde en lokal kopi av dataene.
         
* ADVARSEL: EDDTableCopy antar at dataverdiene for hver del aldri endres. Hvis/når de gjør det, må du manuelt slette buntfilene i *bigParentDirectory* /kopi/ *datasetID* som endret seg og[flagg](/docs/server-admin/additional-information#flag)datasettet som skal lastes på nytt, slik at slettede deler vil bli erstattet. Hvis du har et e-postabonnement på datasettet, får du to e-poster: en når datasettet først lastes opp og begynner å kopiere dataene, og en annen når datasettet lastes inn igjen (automatisk) og oppdager de nye lokale datafilene.
     
* Endre metadata -- Hvis du trenger å endre noenaddAttributeseller endre rekkefølgen på variabler knyttet til kildedatasettet:
    1. EndreaddAttributesFor kildedatasettet idatasets.xmletter behov.
    2. Slett en av kopierte filer.
    3. Sett a[flagg](/docs/server-admin/additional-information#flag)Last datasettet på nytt umiddelbart. Hvis du bruker et flagg, og du har et e-postabonnement til datasettet, får du to e-postmeldinger: én når datasettet starter på nytt og begynner å kopiere dataene, og en annen når datasettet lastes inn igjen (automatisk) og oppdager de nye lokale datafilene.
    4. Den slettede filen vil bli regenerert med de nye metadataene. Hvis kildedatasettet aldri er utilgjengelig, vil EDDTableCopy datasett få metadata fra den regenererte filen, siden det er den yngste filen.
         
*   [EDDGridKopier](#eddgridcopy)er svært lik EDDTableCopy, men fungerer med gitted datasett.
#### EDDTableCopy skjelett XML{#eddtablecopy-skeleton-xml} 
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

- -

## Detaljer{#details-1} 

Her er detaljerte beskrivelser av vanlige tagger og attributter.

### &lt;AngularDegreeUnites&gt;{#angulardegreeunits} 
* [ ** &lt;vinkelgrader ** ] (#angulære grader) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xmlsom inneholder en kommadelt liste over enhetsstrenger somERDDAP™bør behandle som vinkelgrader enheter. Hvis en variabel har en av disse enhetene,tabledap'sorderByMeanFilter vil beregne gjennomsnittet på en spesiell måte, og deretter rapportere gjennomsnittet som en verdi fra -180 til 180. SeERDDAPEDStatic.java kildekodefilen for gjeldende standardliste. Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..
### &lt;AngularDegreeTrueUnites&gt;{#angulardegreetrueunits} 
* [ ** &lt;vinkel GradTrueUnites&gt; ** ] (#angular gradtrueunits) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xmlsom inneholder en kommadelt liste over enhetsstrenger somERDDAP™bør behandle som vinkelgrader ekte enheter. Hvis en variabel har en av disse enhetene,tabledap'sorderByMeanFilter vil beregne gjennomsnittet på en spesiell måte, og deretter rapportere gjennomsnittet som en verdi fra 0 til 360. SeERDDAPEDStatic.java kildefil for gjeldende standardliste. Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..
     
### &lt;vanligStandardNames&gt;{#commonstandardnames} 
* [ ** &lt;vanligStandardNames&gt; ** ] (#vanlige standardnavn) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xmlå angi en kommaseparert liste av felles[CF standardnavn](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).. F.eks.
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Denne listen brukes i DataProviderForm3.html som en bekvemmelighet for brukerne.
Hvis du vil gi denne informasjonen idatasets.xml, start ved å kopiere gjeldende standardliste i&lt;DEFAULT\\_ commonStandardNames&gt; iERDDAP's
\\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fil.
     
### &lt;cacheMinutes&gt;{#cacheminutes} 
* [ ** &lt;cacheMinutes&gt; ** ] (#cacheminutes) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xmlå angi alderen (på minutter) der filer i bufferen skal slettes (standard=60) .. F.eks.
```
    <cacheMinutes>60</cacheMinutes>  
```
Generelt bare bildefiler (De samme bildene blir ofte bedt om flere ganger) og.ncfiler (fordi de må opprettes fullt ut før du sender til brukeren) er cached. Selv om det kan virke som en gitt forespørsel bør alltid returnere det samme svaret, er det ikke sant. For eksempel entabledapforespørsel som inkluderer tid &gt; *Noen Tid* vil endre seg når nye data kommer til datasettet. Og en forespørsel som inkluderer\\[siste\\]for tidsdimensjonen vil endre seg når nye data kommer til datasettet. Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag).. FørERDDAP™v2.00, var dette spesifisert i setup.xml, som fortsatt er tillatt, men mislykket.
     
### &lt;convertInterpolateRequestCSVExample&gt;{#convertinterpolaterequestcsvexample} 
* [ ** &lt;convertInterpolateRequestCSVExample&gt; ** ] (#convertinterpolaterequestcsvexample) er et valgfritt merke i en&lt;ErddapDatasett&gt; Merke idatasets.xml \\[Begynner medERDDAP™v2.10\\]som inneholder et eksempel som vil bli vist på Interpolate konverterens nettside. Standardverdien er: jplMURSST41/analysertsst/Bilineær/4.
### &lt;convertInterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;convertInterpolateDatasetIDVariableList&gt; ** ] (#convertinterpolatedatasetidvariablelist) er et valgfritt merke i en&lt;ErddapDatasett&gt; Merke idatasets.xml \\[Begynner medERDDAP™v2.10\\]som inneholder en CSV-listedatasetID/variable Navn eksempler som vil bli brukt som forslag fra Interpolate konverterens nettside. Standardverdien er: jplMURSST41/analysertsst..
### &lt;convertToPublicSourceUrl&gt;{#converttopublicsourceurl} 
* [ ** &lt;convertToPublicSourceUrl&gt; ** ] (#converttopublicsourceurl) er et valgfritt merke i en&lt;ErddapDatasett&gt; Merke idatasets.xmlsom inneholder en "fra" og a til" attributt som spesifiserer hvordan man konverterer en matchende lokalsourceUrl  (Vanligvis et IP-nummer) Inn i offentlighetensourceUrl  (et domenenavn)  Fra" må ha formen "\\[noe\\]//\\[noe\\]/ ". Det kan være 0 eller flere av disse taggene. For mer informasjon se [&lt;sourceUrl&gt;] (#kildeurl) .. For eksempel
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
vil forårsake en matchende lokalsourceUrl  (som https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
Inn i offentlighetensourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) ..
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..

Men av sikkerhetsgrunner og grunner knyttet til abonnementssystemet, **Ikke bruk denne taken&#33;**   
Bruk alltid det offentlige domenenavnet i&lt;sourceUrl&gt; Tagg og bruk[/etc/hosts bord](https://linux.die.net/man/5/hosts)på serveren for å konvertere lokale domenenavn til IP-numre uten å bruke en DNS-server. Du kan teste om et domenenavn er riktig konvertert til et IP-nummer ved å bruke:
Ping *a.domain.name*   
     
### data:image/png;base64,{#dataimagepngbase64} 
* Når en bruker ber om en.htmlTableSvar fraERDDAP™Hvis dataene i en streng celle inneholder data: Image/png;base64, fulgt av et base64 kodet .png-bilde,ERDDAP™vil vise et ikon (slik at brukeren kan se bildet hvis de svinger over det) og knapper for å lagre teksten eller bildet til utklippstavlen. Denne funksjonen ble lagt til iERDDAP™av Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)angir standardinnstillingen som styrer når og hvordan landmasken skal tegnes nårERDDAP™Tegner et kart. Det kan angis på tre forskjellige steder idatasets.xml  (Listet fra laveste til høyeste prioritet) :)
    
    1. HvisdrawLandMasker spesifisert i&lt;ErddapDatasett&gt; (ikke koblet til et bestemt datasett) , deretter angir den standardverdien tildrawLandMaskFor alle variabler i alle datasett. For eksempel
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAPLeserdatasets.xml..
Hvis denne etiketten ikke er til stede, er den underliggende standardverdien under.
         
    2. HvisdrawLandMasker spesifisert som en global attributt av et gitt datasett, deretter angir den standardverdien tildrawLandMaskfor alle variabler i det datasettet, overskride eventuelle lavere prioritetsinnstillinger. For eksempel
    ```
        <att name="drawLandMask">under</att>  
    ```
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Laster datasettet på nytt.
         
    3. HvisdrawLandMasker spesifisert som en variabels attributt i et gitt datasett, deretter angir den standardverdien tildrawLandMaskfor den variabelen i det datasettet, som overveier eventuelle lavere prioritetsinnstillinger. For eksempel
    ```
        <att name="drawLandMask">under</att>  
    ```
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Laster datasettet på nytt.
    
En bruker kan overstyre standarden (Hvor det er angitt) ved å velge en verdi for "Draw landmaske" fra en nedtrekksliste på datasettets Make A Graph-nettside, eller ved å inkludere &.land= *verdi* i URLen som krever et kart fraERDDAP..
    
I alle situasjoner er det 4 mulige verdier for attributten:
    
    * "under" trekker landmasken før den trekker data på kartet.
For gitte datasett vises land som en konstant lysgrå farge.
For tabelldatasett viser " under" topografidata over land og hav.
    * "over" -- -- For gitte datasett trekker landmasken etter at den trekker data på kart slik at den vil maskere data over land. For tabellbaserte datasett, -over - viser badedrakt i havet og en konstant lysgrå der det er land, begge trukket under dataene.
    * -outline - bare tegner omrisset av landmasken, politiske grenser, innsjøer og elver.
    * Off - trekker ikke noe.
### &lt;e-postDiagnosticsToErdData&gt;{#emaildiagnosticstoerddata} 
* [ ** &lt;e-postDiagnosticsToErdData&gt; ** ] (#emaildiagnosticstoerddata) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xml.. Merkes verdi kan være sant (standard) eller falsk. Hvis det er sant,ERDDAP™vil sende stabelspor til Chris. John ved noaa. Gov (denERDDAP™utviklingsteam) .. Dette bør være trygt og trygt siden ingen konfidensiell informasjon (f.eks. forespørselen) er inkludert i e-posten. Dette bør gjøre det mulig å fange noen uklare, helt uventede feil som fører til NullPointerExceptions. Ellers ser brukeren unntakene, menERDDAP™utviklingsteamet ikke (Så vi vet ikke at det er et problem som må løses) ..
     
### &lt;graphBackgroundColor&gt;{#graphbackgroundcolor} 
* [ ** &lt;grafBakgrunnsfarge&gt; ** ] (#grafBakgrunnsfarge) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xmlfor å angi standard bakgrunnsfarge på grafer. Dette påvirker nesten alle grafer. Det er noen situasjoner som ikke påvirkes. Fargen er angitt som en 8-siffers heksadesimal verdi i form 0xAARRGGBB, hvor henholdsvis AA, RR, GG og BB er åpenheten, rød, grønn og blå komponenter.  "0x" er kasusfølsom, men de heksadesimale sifferene er ikke sensitive. Et fullstendig ugjennomsiktig (ff) grønn-blå farge med rød = 22, grønn = 88, blå = ee ville være 0xff2288ee. Ugjennomsiktig hvit er 0xffffffff. Standarden er gjennomsiktig lysblå (0xffccccff) , som har fordelen av å være forskjellig fra hvit, som er en viktig farge i mange paletter som brukes til å tegne data. For eksempel
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..
### &lt;ipAdresseMaxRequests&gt;{#ipaddressmaxrequests} 
* [ ** &lt;ipAddressMaxRequests&gt; ** ] (#ipaddressmaxrequests) er en sjelden brukt valgfri tag (Første støtte medERDDAP™v2.12) i en&lt;ErddapDatasett&gt; Merke idatasets.xmlsom er en del av et system for å begrense evnen til over aggressive legitime brukere og ondsinnede brukere til å gjøre et stort antall samtidige forespørsler som vil redusere systemets ytelse for andre brukere. ipAdresse MaxRequests spesifiserer det maksimale antall samtidige forespørsler som vil bli akseptert fra en bestemt IP-adresse. Ytterligere forespørsler mottar en HTTP 429 feil: For mange forespørsler. De små, statiske filene i erddap/download/ og erddap/images/ er ikke unntakt fra dette tallet. Standarden er 15. Maksimum tillatt er 1000, som er gal høy - ikke gjør det&#33;ERDDAP™vil ikke akseptere et tall mindre enn 6 fordi mange legitime brukere (spesielt nettlesere ogWMSKunder) utgjør opp til 6 forespørsler om gangen. DenERDDAP™Daglig rapport og lignende informasjon som er skrevet til log.txt-filen med hver Major Dataset Reload, vil nå inneholde en rekke av forespørsler fra disse IP-adresser under tittelen "Requesters IP-adresse (For mange forespørsler)  ".
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..
    
"Major LoadDatasets Time Series" delen av status.html inkluderer en "for mange" kolonne som viser antall forespørsler som oversteg brukerens ipAddressMaxRequests innstilling og dermed så en "Too mange forespørsler" feil. Dette lar deg enkelt se når det er aktive over aggressive legitime brukere og ondsinnede brukere slik at du kan (Valgfritt) se i log.txt-filen og bestemme om du vil svarteliste disse brukerne.
    
Det er ikke noe spesielt galt med å sette dette til et høyere tall. Det er opp til deg. Men å gjøre det gjør det mulig for folk å sette opp systemer som bruker et stort antall tråder til å jobbe med prosjekter og så gir dem ingen tilbakemelding om at det de gjør ikke får dem noen fordel.
### &lt;ipAdresseMaxRequestsActive &gt;{#ipaddressmaxrequestsactive} 
* [ ** &lt;iPadressMaxRequestsActive &gt; ** ] (#ipaddressmaxrequestsactive) er en sjelden brukt valgfri tag (Første støtte medERDDAP™v2.12) i en&lt;ErddapDatasett&gt; Merke idatasets.xmlsom er en del av et system for å begrense evnen til over aggressive legitime brukere og ondsinnede brukere til å gjøre et stort antall samtidige forespørsler som vil redusere systemets ytelse for andre brukere. ipAdresseMaxRequestsActive spesifiserer det maksimale antallet samtidige forespørsler som vil bli aktivt behandlet fra en bestemt IP-adresse. Ytterligere forespørsler vil sitte i en kø til tidligere forespørsler er behandlet. De små, statiske filene i erddap/download/ og erddap/images/ are fritatt fra dette tallet og den relaterte trottling. Standarden er 2. Den maksimale tillatt er 100, som er gal høy - ikke gjør det&#33; Du kan angi dette til 1 å være streng, spesielt hvis du har problemer med altfor aggressive eller ondsinnede brukere. Brukere vil fortsatt raskt få alle dataene de ber om (opp til ipAdresseMaxRequests) Men de kan ikke ha systemressurser. Vi anbefaler ikke å sette dette til et større antall fordi det tillater altfor aggressive legitime brukere og skadelig brukere å dominereERDDAPBearbeidingskapasitet.
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..
     
### &lt;ipAdresseUbegrenset&gt;{#ipaddressunlimited} 
* [ ** &lt;ipAdresseUbegrenset &gt; ** ] (#ipaddressunlimited) er en sjelden brukt valgfri tag (Første støtte medERDDAP™v2.12) i en&lt;ErddapDatasett&gt; Merke idatasets.xmlsom er en del av et system for å begrense evnen til over aggressive legitime brukere og ondsinnede brukere til å gjøre et stort antall samtidige forespørsler som vil redusere systemets ytelse for andre brukere. ipAdresseUbegrenset er en kommadelt liste over IP-adresser som du vil tillate ubegrenset tilgang til dinERDDAP.. Se i loggen din. txt-fil for å se hvilket format serveren din bruker for IP-adresser. På noen servere vil IP-adresser være i formatet #.#.#.# (hvor # er et heltall fra 0 til 255) ; mens på andre det vil være i format #:#:#:#:#:#:#:#:# .. Forespørslere på denne listen er ikke underlagt enten ipAssassinMaxRequests eller ipAssassinMaxRequestsActive innstillinger. Dette kan være et sekundærtERDDAP™eller for enkelte brukere eller servere i systemet.ERDDAP™Legger alltid til " (ukjentIPAdresse) " somERDDAP™bruk når forespørerens IP-adresse ikke kan bestemmes, f.eks. for andre prosesser som kjører på samme server.
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..
    
Hvis alle brukerens forespørsler av en eller annen grunn får feilmeldingen " Uttid som venter på at dine andre forespørsler skal behandles." kan du løse problemet ved å legge til brukerens IP-adresse til ipAddressUbegrenset liste, påføring av endringen og deretter fjerne den fra listen.
    
### &lt;LastDatasetsMinMinMinutes &gt;{#loaddatasetsminminutes} 
* [ ** &lt;loadDatasettMinMinminuter &gt; ** ] (#lastdatasettminuter) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xmlå angi minstetid (på minutter) mellom stor belastning Datasett (NårERDDAP™Reprosesserdatasets.xml, inkludert å sjekke hvert datasett for å se om det må lastes på nytt i henhold til sin reload Hver NMinutes innstilling, standard=15) .. F.eks.
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Hvis en gitt kjøring av lastdatasett tar mindre enn denne tiden, ser lasteren bare gjentatte ganger på flaggkatalogen og/eller sover til den gjenværende tiden er gått. Standarden er 15 minutter, som bør være bra for nesten alle. Den eneste ulempen ved å sette dette til et mindre tall er at det vil øke frekvensen somERDDAP™retries datasett som har feil som hindrer dem i å bli lastet (For eksempel er en ekstern server nede) .. Hvis det er mange slike datasett og de er retestet ofte, kan datakilden vurdere det skadedyr / aggressiv atferd. Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag).. FørERDDAP™v2.00, var dette spesifisert i setup.xml, som fortsatt er tillatt, men mislykket.
     
### &lt;LastDatasettsMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* [ ** &lt;lastDatasetsMaxMinutes&gt; ** ] (#loaddatasettsmaxminutes) er et valgfritt merke i en&lt;ErddapDatasett&gt; Merke idatasets.xmlå angi den maksimale tiden (på minutter) en stor belastning Datasetts innsats er tillatt å ta (Før lasten Datasetts tråd behandlet som "avsatt" og avbrytes)   (standard=60) .. F.eks.
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Generelt bør dette settes til minst dobbelt så lenge du rimelig tror at reloading av alle datasettene (kumulativt) bør ta (Siden datamaskiner og nettverk noen ganger er langsommere enn forventet) Dette bør alltid være mye lengre enn lastDatasetsMinMinMinutes. Standarden er 60 minutter. Noen vil sette dette lenger. Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag).. FørERDDAP™v2.00, var dette spesifisert i setup.xml, som fortsatt er tillatt, men mislykket.
     
### &lt;logLevel&gt;{#loglevel} 
* [ ** &lt;logLevel&gt; ** ] (#loglevel) er et valgfritt merke i en&lt;ErddapDatasett&gt; Merke idatasets.xmlå spesifisere hvor mange diagnostiske meldinger som sendes til log.txt-filen. Det kan settes til å "varsle" (De færreste meldingene) , "info" (standard) , eller "alle" (de fleste meldingene) .. F.eks.
```
    <logLevel>info</logLevel>  
```
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag).. FørERDDAP™v2.00, var dette spesifisert i setup.xml, som fortsatt er tillatt, men mislykket.
     
### &lt;DelvisRequestMaxbytes&gt; og&lt;DelvisRequestMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;delvisRequestMaxbytes &gt; **] (#partialrequestmaxbytes-og-partialrequestmaxceller) og** &lt;DelvisRequestMaxCells&gt; ** ] (#partialrequestmaxbytes-og-partialrequestmaxceller) er sjelden brukt valgfrie tagger i en&lt;ErddapDatasett&gt; Merke idatasets.xml.. Når det er mulig (Og det er ikke alltid mulig) ,ERDDAP™bryter store dataforespørsler i biter for å bevare minne.
    
Med 32 bitJavai simplistisk forstand det maksimale antall samtidige *store* Forespørsler er omtrent 3/4 av hukommelsen tilgjengelig (-Xmx-verdien passert til Tomcat) Delt av bitstørrelsen (For eksempel 1200 MB / 100 MB =&gt; 12 forespørsler) .. Andre ting krever hukommelse, så det faktiske antall forespørsler vil være mindre. I praksis er biting ikke alltid mulig. Så en stor eller noen få veldig store samtidige ikke-chunkable forespørsler kan forårsake problemer på 32 bitJava..

Med 64 bitJavaXmx-verdien kan være mye større. Så hukommelsen er mye mindre sannsynlig å være en begrensning.

Du kan overstyre standardbitstørrelsen ved å definere disse taggene idatasets.xml  (med ulike verdier enn vist her) :)
For rutenett:&lt;DelvisRequestMaxbytes&gt;100000000&lt;/partialRequestMaxbytes&gt;
For tabeller:&lt;delvisRequestMaxCells&gt;10000&lt;/partialRequestMaxCells &gt;

partiellRequestMaxbytes er det foretrukne maksimale antall byter for en delvis dataforespørsel om rutenett (En del av den totale forespørselen) .. standard=10000000 (10^8) .. Større størrelser er ikke nødvendigvis bedre (og ikke gå over 500 MB fordi det er TREDDS standardgrense forDAPsvar) .. Men større størrelser kan kreve færre tilgang til tonnevis av filer (Tenk påERDSatellittdata med hvert tidspunkt punkt i en separat fil - det er bedre å få mer data fra hver fil i hver delvis forespørsel) ..

partiellRequestMaxCells er det foretrukne maksimale antall celler (nRoads \\* nColumns i datatabellen) for en delvis tabell dataforespørsel (En del av den totale forespørselen) .. Standard = 100000. Større størrelser er ikke nødvendigvis bedre. De resulterer i en lengre ventetid på den første mengden data fra kilden.

Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag).. FørERDDAP™v2.00, disse ble spesifisert i setup.xml, som fortsatt er tillatt, men mislykket.
     
### &lt;forespørselBlacklist&gt;{#requestblacklist} 
* [ ** &lt;forespørselBlacklist&gt; ** ] (#RequestBlacklist)  [er et valgfritt tag](/docs/server-admin/additional-information#frequent-crashes-or-freezes)i en&lt;ErddapDatasett&gt; Merke idatasets.xmlsom inneholder en kommadelt liste over numeriske IP-adresser som vil bli svartlistet. Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..
    * Dette kan brukes til å beskytte et[Nekting av tjenesteangrep](https://en.wikipedia.org/wiki/Denial_of_service)En altfor ivrig[web robot](https://en.wikipedia.org/wiki/Internet_bot)eller annen type problemer.
    * Problemfri bruker -- HvisERDDAP™Sakter til et kryp eller fryser/stopper, årsaken er ofte en vanskelig bruker som kjører mer enn ett skript på én gang og/eller gjør et stort antall svært store, ekstremt ineffektive eller ugyldige forespørsler, eller samtidige forespørsler. Se inn[log.txt](/docs/server-admin/additional-information#log)for å se om dette er tilfelle og for å finne den numeriske IP-adressen til den problematiske brukeren. Hvis dette er problemet, bør du sannsynligvis svarteliste den brukeren.
        
NårERDDAP™få en forespørsel fra en svartlistet IP-adresse, vil den returnere HTTP feil 403: Forbudt. Den medfølgende feilmeldingen oppfordrer brukeren til å sende deg e-post,ERDDAPadministrator, for å løse problemene. Hvis de tar seg tid til å lese feilmeldingen (Mange synes ikke) og kontakt deg, kan du deretter jobbe med dem for å få dem til å kjøre bare ett skript om gangen, gjøre mer effektive forespørsler, fikse problemene i deres skript (For eksempel, ber data fra et eksternt datasett som ikke kan svare før timing ut) Eller noe annet var kilden til problemer.
        
Brukere er ofte bare uvitende om at deres forespørsler er problemer. De er ofte uvitende om feil, grov ineffektivitet eller andre problemer med sine skript. Det tror de ofte fordi dinERDDAP™tilbyr data gratis, som de kan be om så mye data som de vil, for eksempel ved å kjøre flere skript eller ved å bruke flere tråder samtidig.
        
        * Du kan forklare dem at hverERDDAP™, nå uansett hvor store og kraftige, har finite ressurser (CPU-tid, harddisk I/O, nettverksbredde osv.) og det er ikke rettferdig hvis en bruker ber om data på en måte som samler ut andre brukere eller overbelastedeERDDAP..
        * Når en bruker vet hvordan du gjør 2 samtidige forespørsler, ser de ofte ingen grunn til ikke å gjøre 5, 10 eller 20 samtidige forespørsler, siden de ekstra forespørsler koster dem ingenting. Det er som asymmetrisk krigføring: her har offensive våpen en enorm fordel (null kostnad) over defensive våpen (En finite installasjon med reelle kostnader) ..
        * Påpek dem at det reduserer avkastningen for å gjøre mer og mer samtidige forespørsler; de ekstra forespørslene bare ytterligere blokkere andres forespørsler; de gir ikke en enorm forbedring for dem.
        * Husk at det er andre brukere (både avslappede brukere og andre brukere som kjører skript) Så det er ikke rettferdig å hylle alleERDDAPressursene.
        * Påpek at teknologikjempene har fått brukerne til å forvente uendelige ressurser fra webtjenester. Mens det er måter å sette opp[rutenett/clustere/federasjoner avERDDAPs](/docs/server-admin/scaling)å lage enERDDAP™system med flere ressurser, de flesteERDDAP™administratorene har ikke penger eller arbeidskraft til å sette opp slike systemer, og et slikt system vil fortsatt være begrenset. PåERDFor eksempel er det én person (meg) å skriveERDDAP™, administrere toERDDAPs (Med hjelp fra min sjef) , og administrere flere datakilder, alle med et årlig maskinvarebudsjett på $0 (vi er avhengige av noen ganger stipend for å betale for maskinvare) .. Dette er ikke Google, Facebook, Amazon, etc med 100 ingeniører, og millioner av dollar inntekter for å resirkulere i stadig større systemer. Og vi kan ikke bare flytte vårERDDAP™til for eksempel Amazon AWS, fordi datalagringskostnadene er store og data egress gebyrene er store og variable, mens vårt budsjett for eksterne tjenester er en fast $0.
        * Min forespørsel til brukere er: for ikke-tidsfølsomme forespørsler (som er det mest vanlige tilfellet) Systemet bør bare gjøre en forespørsel om gangen. Hvis forespørselen er tidsfølsom (f.eks. flere .pngs på en nettside, flere fliser for enWMSKunde etc.) , så kanskje 4 samtidige forespørsler bør være max (Bare for kort tid) ..
        * Hvis du forklarer situasjonen for brukeren, vil de fleste brukere forstå og være villige til å gjøre de nødvendige endringene slik at du kan fjerne sin IP-adresse fra svartelisten.
             
    * Legg til sin numeriske IP-adresse til den kommadelte listen over IP-adresser i for å bli svartliste.&lt;forespørselBlacklist&gt; i dindatasets.xmlfil. Hvis du vil finne den vanskelige brukerens IP-adresse, kan du se iERDDAP™  *bigParentDirectory* /logs/log.txt fil ( *bigParentDirectory* er spesifisert i[config.xml](/docs/server-admin/deploy-install#setupxml)) å se om dette er tilfelle og å finne den brukerens IP-adresse. IP-adressen for hver forespørsel er oppført på linjene som starter med "&#123;&#123;&#123;&#123;#" og er 4 tall separert etter perioder, for eksempel 123.45.67.8 . Å søke etter "ERROR" vil hjelpe deg med å finne problemer som ugyldige forespørsler.
    * Du kan også erstatte det siste nummeret i en IP-adresse med\\*(for eksempel 202.109.200.\\*) å blokkere en rekke IP-adresser, 0-255.
    * Du kan også erstatte de siste 2 tallene i en IP-adresse med\\*..\\*  (For eksempel 121.204.\\*..\\*) å blokkere et bredere spekter av IP-adresser, 0-255.0-255.
    * For eksempel
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Du trenger ikke å omstarteERDDAP™For endringer i&lt;ForespørselBlacklist&gt; å tre i kraft. Endringene vil bli oppdaget neste gangERDDAP™Sjekk om datasett må lastes på nytt. Eller, kan du fremskynde prosessen ved å besøke en[setDataset Flag URL](/docs/server-admin/additional-information#set-dataset-flag)for alle datasett.
    * DinERDDAP™daglig rapport inneholder en liste/tall av de mest aktive tillatte og blokkerte forespørerne.
    * Hvis du vil finne ut hvilket domene/institusjon som er relatert til en numerisk IP-adresse, kan du bruke en gratis, omvendt DNS-netttjeneste som[ https://network-tools.com/ ](https://network-tools.com/)..
    * Det kan være tider når det er fornuftig å blokkere visse brukere på et høyere nivå, for eksempel ondsinnede brukere. For eksempel kan du blokkere deres tilgang til alt på serveren din, ikke bareERDDAP.. På Linux er en slik metode å bruke[iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/).. For eksempel kan du legge til en regel som vil blokkere alt kommer fra 199.51.100.0 med kommandoen
iptables -I INPUT -s 199.51.100.0 -j DROPS
       
### &lt;LangsomDownTroubleMillis&gt;{#slowdowntroublemillis} 
* [ ** &lt;langsomDownTroubleMillis &gt; ** ] (#slowdowntroublemillis) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xmlsom inneholder et heltall som angir antall millisekunder (standard=1000) å ta pause når du svarer på alle mislykkede forespørsler, for eksempel ukjent datasett, ber om for stor bruker på svartelisten. F.eks.
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Hvis et skript gjør én forespørsel umiddelbart etter en annen, kan det raskt gjøre en dårlig forespørsel etter en annen. Med denne innstillingen kan du bremse et feilaktig skript såERDDAP™Er ikke oversvømmet av dårlige forespørsler. Hvis et menneske gjør en dårlig forespørsel, vil de ikke engang merke denne forsinkelsen. Anbefalinger:
    
    * Hvis problemet er en fordelt avslag på tjeneste (DDOS) Angrep fra 100+ angripere, sett dette til et mindre antall (100?) .. Å bremse dem alle ned i for lang tid fører til for mange aktive tråder.
    * Hvis problemet er fra 1-10 kilder, angi dette til 1000 ms (standard) Men et større antall (som 10000) Det er også rimelig. Det bremser dem så de kaster bort færre ressurser. Også, 1000 ms eller så vil ikke irritere menneskelige brukere som gjør en dårlig forespørsel.
    
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..
     
### &lt;emailBlacklist&gt;{#subscriptionemailblacklist} 
* [ ** &lt;abonnement E-postBlacklist&gt; ** ] (#subscriptionemailblacklist) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xmlsom inneholder en kommadelt liste over e-postadresser som umiddelbart er svartlistet fra[abonnementssystem](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)For eksempel
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Dette er et kaseufølsomt system. Hvis en e-postadresse legges til i denne listen, hvis e-postadressen har abonnement, vil abonnementene bli kansellert. Hvis en e-postadresse på listen prøver å abonnere, vil forespørselen bli avslått. Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..
     
### Standardtekst{#standard-text} 
*   [ **Standardtekst** ](#standard-text)-- Det er flere valgfrie etiketter (De fleste brukes sjelden) i en&lt;ErddapDatasett&gt; Merke idatasets.xmlå angi tekst som vises på ulike steder påERDDAP.. Hvis du vil endre standardteksten, kopier den eksisterende verdien fra merket med samme navn i
     *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/utili.messages.xml idatasets.xmlog deretter endre innholdet. Fordelen med å ha disse idatasets.xmler at du kan angi nye verdier når som helst, selv nårERDDAP™Jeg løper. Eventuelle endringer i disse taggenes verdier vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag).. Merkenavnene beskriver sitt formål, men se standardinnholdet i meldinger.xml for en dypere forståelse.
    
    *   &lt;standardLicense&gt;
    *   &lt;standardKontakt&gt;
    *   &lt;standardDataLicenser&gt;
    *   &lt;standardDisslammerOfEndorsement &gt;
    *   &lt;standardDislammerOfExternalLinks &gt;
    *   &lt;StandardGeneralDisclaimer&gt;
    *   &lt;standard PersonvernPolicy&gt;
    *   &lt;startHeadHtml5&gt;
    *   &lt;startBodyHtml5&gt; er en god tagg å endre for å tilpasse utseendet på toppen av hver nettside i dinERDDAP.. Merkelig kan du bruke dette til å enkelt legge til en midlertidig melding påERDDAP™hjemmeside (f.eks. " Sjekk ut det nye JPL MUR SST v4.1 datasettet ..." eller " DetteERDDAP™vil være offline for vedlikehold 2019-05-08T17:00:00 PDT gjennom 2019-05-08T20:00:00 PDT.") .. En quirk av å sette dette merket idatasets.xmler: når du starter på nyttERDDAPDen aller første forespørselen tilERDDAP™vil returnere standardstarten BodyHtml5 HTML, men hver etterfølgende forespørsel vil bruke startBodyHtml5 HTML angitt idatasets.xml..
    *   &lt;Kort beskrivelse Html&gt; er en god tag å endre for å tilpasse beskrivelsen av dinERDDAP.. Merk at du enkelt kan endre dette for å legge til en midlertidig melding på hjemmesiden (f.eks. " DetteERDDAP™vil være offline for vedlikehold 2019-05-08T17:00:00 PDT gjennom 2019-05-08T20:00:00 PDT.") ..
    *   &lt;endBodyHtml5 &gt;
    
      
FørERDDAP™v2.00, disse ble spesifisert i setup.xml, som fortsatt er tillatt, men mislykket.
     
### &lt;uvanlig Aktivitet &gt;{#unusualactivity} 
* [ ** &lt;ualmindeligAktivitet &gt; ** ] (#uvanlig aktivitet) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xmlå angi det maksimale antall forespørsler mellom to løp av Lastedatasett som anses som normale (standard=10000) .. Hvis det tallet er overskredet, sendes en e-post til e-post Alt til (som spesifisert i setup.xml) .. F.eks.
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag).. FørERDDAP™v2.00, var dette spesifisert i setup.xml, som fortsatt er tillatt, men mislykket.
     
### &lt;updateMaxEvents&gt;{#updatemaxevents} 
* [ ** &lt;OppdaterMaxEvents&gt; ** ] (#updatemaxevents) er en sjelden brukt OPTIONAL tag i en&lt;ErddapDatasett&gt; Merke idatasets.xmlfor å angi det maksimale antall filendringshendinger (standard=10) som vil bli håndtert av [&lt;OppdaterEveryNMillis&gt;] (#updatevardenmillis) system før du bytter til å laste datasettet på nytt i stedet. For eksempel
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
OppdateringenEveryNMillis-systemet er ment å kjøre veldig raskt rett før brukerens forespørsel behandles. Hvis det er mange filendringshendelser, så kan den sannsynligvis ikke kjøres raskt, så det krever i stedet at datasettet skal lastes på nytt. Hvis dinERDDAP™håndterer datasett som må holdes oppdatert selv om det er endringer i et stort antall datafiler, kan du angi dette til et større antall (100?) ..

### &lt;bruker&gt;{#user} 
* [ ** &lt;bruker&gt; ** ] (#user) er et valgfritt merke i en&lt;ErddapDatasett&gt; Merke idatasets.xmlsom identifiserer brukerens brukernavn, passord (hvis autentisering=kunde) , og roller (en kommadelt liste) .. Bruken av brukernavn og passord varierer litt basert på verdien av [&lt;autentisering&gt;] (/docs/server-admin/additionell-informasjon#autentisering) i dinERDDAPconfig.xml-fil.
    * Dette er en del avERDDAP's[sikkerhetssystem](/docs/server-admin/additional-information#security)for å begrense tilgangen til noen datasett til noen brukere.
    * Gjør en separat&lt;bruker&gt; tag for hver bruker. Valgfritt, hvis autentisering=oauth2, kan du konfigurere to&lt;bruker&gt; tagger for hver bruker: én for når brukeren logger inn via Google, en for når brukeren logger inn via Orcid, sannsynligvis med samme roller.
    * Hvis det ikke finnes&lt;bruker&gt; tag for en klient, s/han vil bare være i stand til å få tilgang til offentlige datasett, dvs. datasett som ikke har [&lt;tilgjengeligTil&gt;] (#accessibleto) Tag.
    * brukernavn
For autentisering=custom er brukernavnet vanligvis en kombinasjon av bokstaver, siffer, understrekninger og perioder.
For autentisering=email er brukernavnet brukerens e-postadresse. Det kan være enhver e-postadresse.
For autentisering=google er brukernavnet brukerens fulle e-postadresse. Dette inkluderer Google-kontrollerte kontoer som@noaa.govkontoer.
For autentisering=orcid er brukernavnet brukerens Orcid-kontonummer (Med stikker) ..
For autentisering=oauth2 er brukernavnet brukerens fulle e-postadresse eller brukerens Orcid-kontonummer (Med stikker) ..
    * passord
For autentisering=e-post, google, orcid eller oauth2, ikke angi en passordattributt.
For autentisering=tilpasset må du angi en passordattributt for hver bruker.
        * Passordene som brukeren angir er kasefølsomme og må ha 8 eller flere tegn slik at de er vanskeligere å knekke. I dag kan til og med 8 tegn sprøyes raskt og billig ved hjelp av brutekraft ved hjelp av en klynge datamaskiner på AWS.ERDDAP™bare håndhever 8-tegn minimum når brukeren prøver å logge på (ikke når&lt;bruker&gt; tagg blir behandlet, fordi den koden bare ser hash fordøyelse av passordet, ikke klartekst passord).
        * config.xml&lt;passordkoding&gt; bestemme hvordan passord lagres i&lt;bruker&gt; Tags indatasets.xml.. For å øke sikkerheten er alternativene:
            *   [MD5](https://en.wikipedia.org/wiki/MD5)  (Ikke bruk dette&#33;) -- for passordattributten, angi MD5 hash fordøyelse av brukerens passord.
            * UEPMD5 (Ikke bruk dette&#33;) -- for passordattributten, angi MD5 hash fordøyelse av *brukernavn* :)ERDDAP:) *passord* .. Brukernavn ogERDDAP" er vant til[salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) hash-verdien, noe som gjør det vanskeligere å avkode.
            *   [Tittenfick256](https://en.wikipedia.org/wiki/SHA-2)  (Ikke anbefalt) -- for passordattributten, angi SHA-256 hash fordøyelse av brukerens passord.
            * UEPSHA256 (standard, anbefalt passordkoding. Men mye bedre: bruk google, orkide eller oauth2-autentiseringsalternativer.) -- for passordattributten, angi SHA-256 hash fordøyelse av *brukernavn* :)ERDDAP:) *passord* .. Brukernavn ogERDDAP" brukes til å salte hashverdien, noe som gjør det vanskeligere å dekode.
        * På Windows kan du generere MD5 passordfordøyelsesverdier ved å laste ned et MD5-program (som[MD5](https://www.fourmilab.ch/md5/)) og bruk (For eksempel) :)
md5 -djsmith:ERDDAP:) *faktisk passord* 
        * På Linux/Unix kan du generere MD5 fordøyelsesverdier ved hjelp av innebygd md5sum-programmet (For eksempel) :)
echo-n-jsmith:ERDDAP:) *faktisk passord* "|md5sum
        * Oppbevarte klartekstpassord er sensitive. De lagrede formene av MD5 og UEPMD5 passord er ikke sensitive.
        * For eksempel (bruker UEPMD5) Hvis brukernavn="jsmith" og passord=" mitt passord",&lt;user&gt; tag er:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
der det lagrede passordet ble generert med
md5 -djsmith:ERDDAP:myPassword
        * roller er en kommadelt liste over roller som brukeren er autorisert til. Alle&lt;Datasett&gt; kan ha [&lt;tilgjengeligTil&gt;] (#accessibleto) Tag som viser rollene som får tilgang til datasettet. For en gitt bruker og et gitt datasett, hvis en av rollene i brukerens liste over roller samsvarer med en av rollene i datasettets liste over&lt;tilgjengeligTil&gt; roller, så er brukeren autorisert til å få tilgang til det datasettet.
            
Alle brukere som logger seg inn automatisk får rollen\\[Hvem som helst I\\]om det finnes en&lt;bruker&gt; tag for dem idatasets.xmleller ikke. Hvis et gitt datasett har
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
da vil enhver bruker som er logget inn ha tillatelse til å få tilgang til dette datasettet, selv om det ikke er noen&lt;bruker&gt; tag for dem idatasets.xml..
            
    * Eventuelle endringer i denne etikettens verdi vil tre i kraft neste gangERDDAP™Leserdatasets.xml, inkludert som reaksjon på et datasett[flagg](/docs/server-admin/additional-information#flag)..
         
### &lt;pathRegex&gt;{#pathregex} 
* [ ** &lt;pathRegex &gt; ** ] (#pathregex) kan du angi et regulært uttrykk som begrenser hvilke veier (hvilke underkataloger) vil bli inkludert i datasettet. Standarden er .\\*, som passer til alle stier. Dette er en sjelden brukt, sjelden nødvendig, OPTIONAL tag forEDDGridFraFiles datasett, EDDTableFromFiles datasett og noen andre datasett typer. Men når du trenger det, trenger du det virkelig.
    
For å gjøre dette arbeidet må du være veldig god med vanlige uttrykk. Se dette[Regulatorisk dokumentasjon](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og[Regular tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).. Spesielt må du vite om fangstgrupper (Noe i parentesen) , og "eller" symbolet "| ".
Sammen kan du angi antall alternativer, f.eks. (alternativ1|alternativ2|option3) ..
Noen av alternativene kan ikke være noe, f.eks. (|alternativ2|option3) ..
Du må også vite at fangstgrupper kan hekkes, dvs. ethvert alternativ i en fangstgruppe kan inneholde en annen fangstgruppe, f.eks. (|alternativ2 (|alternativ2 b|option2c) |option3) som sier at option2 kan følges av ingenting, eller option2b eller option2c.
For stiRegexes vil hvert alternativ være ett mappenavn etterfulgt av en /, f.eks. linje/ .
    
Den vanskelige delen av banenRegex er: NårERDDAP™Rekursivt senker katalogtreet, må banenRegex akseptere alle stiene det møter på vei til katalogene med data. Regexs med hekkede fangstgrupper er en god måte å håndtere dette på.
    
Et eksempel:
Anta at vi har følgende katalogstruktur:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
og den spesifiserte filDirectory er /foo/bar/, og vi vil bare.ncFiler i D\\[0-9\\]&#123;4&#125;/a/ underkataloger.
Løsningen er å sette baneRegex til /foo/bar/ (|D\\[0-9\\]&#123;4&#125;/ (|a/) )   
Det står:
Veien må begynne med /foo/bar/
Dette kan følges av ingenting eller D\\[0-9\\]&#123;4&#125;/
Dette kan følges av ingenting eller a/
    
Ja, PathRegex kan være utrolig vanskelig å formulere. Hvis du sitter fast, spør en dataprogrammerer (Den nærmeste tingen i den virkelige verden til en trollmann spouting incantations?) Send e-post til Chris. John på noaa.gov.
    
### &lt;datasett &gt;{#dataset} 
* [ ** &lt;Datasett&gt; ** ] (#datasett) er et valg (Men alltid brukt) Tagge i en&lt;ErddapDatasett&gt; Merke idatasets.xmldet (om du inkluderer all informasjon mellom&lt;Datasett&gt; og&lt;/datasett&gt;) beskriver helt ett datasett. For eksempel
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Det kan være noen datasett tags i dindatasets.xmlfil.
Tre egenskaper kan vises i en&lt;datasett&gt; tag:
     
    *    **type=" *a Type* "** er en REQUIRED-attributt i en&lt;datasett&gt; tag indatasets.xmlsom identifiserer type datasett (For eksempel, om det er etEDDGrid/gridded eller EDDTable/tabular datasett) og kilden til dataene (For eksempel en database, filer eller en eksternOPeNDAPserver) .. Se[ **Liste over datasetttyper** ](#list-of-types-datasets)..
         
#### Datasett Id{#datasetid} 
*   [ **datasetID= " *aDatasetID* "** ](#datasetid)er en REQUIRED-attributt i en&lt;datasett&gt; tag som tildeler en kort (vanligvis&lt;15 tegn), unikt, identifiserende navn til et datasett.
    * DendatasetIDS må være et brev (A-Z, a-z) etterfulgt av et antall A-Z, a-z, 0-9 og \\_ (men best hvis&lt;32 tegn totalt).
    * Datasett ID-er er kasefølsomme, men ikke opprette todatasetIDsom bare er forskjellig i øvre/små bokstaver. Det vil forårsake problemer på Windows datamaskiner (din og/eller en brukers datamaskin) ..
    * Beste praksis: Vi anbefaler å bruke[kamel Case](https://en.wikipedia.org/wiki/CamelCase)..
    * Beste praksis: Vi anbefaler at den første delen er en akronym eller forkortelse av kildeinstitusjonens navn og den andre delen er en akronym eller forkortelse av datasettets navn. Når det er mulig, oppretter vi et navn som gjenspeiler kildens navn på datasettet. For eksempel brukte vidatasetID=-erdPHssta8day" for et datasett fraNOAA NMFS SWFSCMiljøforskningsdivisjon (ERD) som utpekes av kilden til å være satellitt/PH/ssta/8 dager.
    * Hvis du endrer et datasetts navn, det gamle datasettet (Med det gamle navnet) Vil fortsatt være iERDDAP.. Dette er et \"orphan\" datasett, fordi spesifikasjonen for det idatasets.xmlNå er hun borte. Dette må behandles:
        1. ForERDDAP™v2.19 og senere trenger du ikke å gjøre noe.ERDDAP™vil automatisk fjerne disse foreldreløse datasettene.
        2. ForERDDAP™v2.18 og tidligere, må du gjøre noe for å fjerne foreldreløse datasett: Gjør et aktivt="falsk" datasett, f.eks.
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Etter neste store belastning Datasett, Du kan fjerne merket etter at det gamle datasettet er inaktivt.
                 
#### aktiv{#active} 
*   [ **aktiv= " *boolsk* "** ](#active)er en valgfri egenskap i en&lt;datasett&gt; tag indatasets.xmlsom indikerer om et datasett er aktivt (kvalifisert for bruk iERDDAP) eller ikke.
    * Gyldige verdier er sanne (standard) og falsk.
    * Siden standard er sant, trenger du ikke å bruke denne attributten før du vil midlertidig eller permanent fjerne dette datasettet fraERDDAP..
    * Hvis du bare fjerner et aktivt=" sant" datasett fradatasets.xmlDatasettet vil fortsatt være aktivt iERDDAP™Men vil aldri bli oppdatert. Et slikt datasett vil være en "orfan" og vil bli oppført som sådan på status. html nettside rett under listen over datasett som ikke ble lastet.
    * Hvis du setter aktiv="falsk",ERDDAP™vil deaktivere datasettet neste gang det prøver å oppdatere datasettet. Når du gjør dette,ERDDAP™ikke kaste ut noen informasjon det kan ha lagret om datasettet og absolutt ikke gjør noe mot de faktiske dataene.
    * For å fjerne et datasett fraERDDAP™Se[Tving datasett fjerning](/docs/server-admin/additional-information#removing-datasets)..
         

 ** Flere tagger kan vises mellom&lt;Datasett&gt; og&lt;/dataset&gt; tags. **   
Det er noen variasjon der tagger er tillatt ved hvilke typer datasett. Se dokumentasjonen for en bestemt[type datasett](#list-of-types-datasets)for detaljer.

#### &lt;tilgjengelig Til &gt;{#accessibleto} 
* [ ** &lt;tilgjengelig Til &gt; ** ] (#accessibleto) er et valgfritt tag i et&lt;datasett&gt; tag som angir en kommaseparert liste av[roller](#user)som har adgang til dette datasettet. For eksempel
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Dette er en del avERDDAP's[sikkerhetssystem](/docs/server-admin/additional-information#security)for å begrense tilgangen til noen datasett til noen brukere.
    * Hvis denne etiketten ikke er tilstede, alle brukere (Selv om de ikke har logget inn) vil ha tilgang til dette datasettet.
    * Hvis dette merket er tilstede, vil dette datasettet kun være synlig og tilgjengelig for loggede brukere som har en av de angitte rollene. Dette datasettet vil ikke være synlig for brukere som ikke er logget på.
    * Alle brukere som logger seg inn automatisk får rollen\\[Hvem som helst I\\]om det finnes en&lt;bruker&gt; tag for dem idatasets.xmleller ikke. Hvis et gitt datasett har
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
da vil enhver bruker som er logget inn ha tillatelse til å få tilgang til dette datasettet, selv om det ikke er noen&lt;bruker&gt; tag for dem idatasets.xml..
         
#### &lt;graferAccessibleTo&gt;{#graphsaccessibleto} 
* [ ** &lt;graferAccessibleTo&gt; ** ] (#graphsaccessibleto) er et valgfritt tag i et&lt;datasett&gt; tag indatasets.xmlsom bestemmer om grafikk og metadata for datasettet er tilgjengelig for publikum. Det tilbyr en måte å delvis overstyre datasettets [&lt;tilgjengeligTil&gt;] (#accessibleto) innstilling. De tillatte verdiene er:
    * auto -- Denne verdien (eller fraværet av en&lt;graferAccessibleTo&gt; tag for datasettet) gjør tilgang til grafer og metadata fra datasettet imitere datasettets&lt;tilgjengelig til&gt; innstilling.
Så hvis datasettet er privat, vil grafene og metadataene være private.
Hvis datasettet er offentlig, vil dets grafer og metadata være offentlige.
    * Offentlig -- Denne innstillingen gjør datasettets grafer og metadata tilgjengelige for alle, selv brukere som ikke er logget inn, selv om datasettet ellers er privat fordi det har en&lt;tilgjengeligTil&gt; tag.
         
#### &lt;tilgjengelig ViaFiles&gt;{#accessibleviafiles} 
* [ ** &lt;tilgjengeligViaFiles &gt; ** ] (#accessibleviafiles) er et valgfritt tag i et&lt;datasett&gt; tag indatasets.xmlfor[EDDGridAggregate](#eddgridaggregateexistingdimension),[EDDGridKopier](#eddgridcopy),[EDDGridFra EDDTable](#eddgridfromeddtable),[EDDGridFraErddap](#eddfromerddap),[EDDGridFraEtopo](#eddgridfrometopo),[EDDGridFraFiles](#eddgridfromfiles)  (Inkludert alle underklasser) ,[EDDGridSideBySide](#eddgridsidebyside),[EDDTableCopy](#eddtablecopy) [EDDTableFraErddap](#eddfromerddap),[EDDTableFraEDDGrid](#eddtablefromeddgrid), og[EDDTableFra Filer](#eddtablefromfiles)  (Inkludert alle underklasser) Datasett. Det kan ha en verdi av sant eller falskt. For eksempel
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Hvis verdien er sann,ERDDAP™vil gjøre det slik at brukerne kan bla gjennom og laste ned datasettets kildedatafiler viaERDDAP's["files"systemet](https://coastwatch.pfeg.noaa.gov/erddap/files/).. Se"files"systemets[dokumentasjon](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)For mer informasjon.
    
Standardverdien til&lt;tilgjengeligViaFiles &gt; kommer fra&lt;standardAccessibleViaFiles &gt; i[config.xml](/docs/server-admin/deploy-install#setupxml).. Den har en standardverdi av falskt, men vi anbefaler at du legger til det merket til config.xml med en verdi av sant.
    
Anbefaling -- Vi anbefaler å gjøre alle relevante datasett tilgjengelige via filsystemet ved å sette&lt;standardAccessibleViaFiles&gt; til sant i setup.xml fordi det er en gruppe brukere som dette er den foretrukne måten å få dataene til. Av andre grunner"files"systemet gjør det enkelt for brukere å se hvilke filer som er tilgjengelige og når de sist endret, og dermed gjøre det enkelt for en bruker å opprettholde sin egen kopi av hele datasettet. Hvis du vanligvis ikke vil gjøre datasett tilgjengelig via filsystemet, angi&lt;standardAccessibleViaFiles&gt; til falsk. I begge tilfeller bare bruk&lt;tilgjengeligViaFiles&gt; for få datasett som er unntak fra den generelle politikken som er fastsatt av&lt;standardAccessibleViaFiles &gt; (For eksempel når datasettet bruker[.ncml](#ncml-files)filer, som ikke er veldig nyttig for brukerne) ..
     
#### &lt;tilgjengelig ViaWMS&gt;{#accessibleviawms} 
* [ ** &lt;tilgjengelig ViaWMS&gt; ** ] (#Accessibleviawms) er et valgfritt tag i et&lt;datasett&gt; tag indatasets.xmlFor alle[EDDGrid](#eddgrid)Underklasser. Det kan ha en verdi av sant (standard) eller falsk. For eksempel
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Hvis verdien er falsk,ERDDAP'sWMSserver vil ikke være tilgjengelig for dette datasettet. Dette brukes vanligvis til datasett som har noen lengdeverdier større enn 180 (som teknisk er ugyldig forWMSTjenester) , og som du også tilbyr en variant av datasettet med lengdegradsverdier helt i området -180 til 180 via[EDDGridLonPM180](#eddgridlonpm180)..
Hvis verdien er sann,ERDDAP™vil prøve å gjøre datasettet tilgjengelig viaERDDAP'sWMSserver. Men hvis datasettet er helt uegnet tilWMS  (For eksempel er det ingen lengdegrads- eller breddegradsdata) Da vil datasettet ikke være tilgjengelig viaERDDAP'sWMSserver, uansett denne innstillingen.
     
#### &lt;Legg til Variabler Hvor &gt;{#addvariableswhere} 
* [&lt;Legg tilVariablesWhere&gt;] (#addvariableshere) er et valgfritt merke i&lt;datasett&gt; tag for alle EDDTable datasett.
    
Forespørsler til EDDTable-datasett kan inkludere &add Variabler Hvor (" *attributt Navn* "," *attributt Verdi* ") som fortellerERDDAP™å legge til alle variabler i datasettet der *attributtName=adtributeValue* Listen over etterspurte variabler. Hvis en bruker for eksempel legger til og legger til Variabler Hvor ("ioos\\_category","Wind") til et spørsmål,ERDDAPvil legge til alle variabler i datasettet som har enioos\\_category=Wind-attributt til listen over etterspurte variabler (for eksempel vindhastighet, vindDirection, vindGustSpeed) .. *attributt Navn* og *attributt Verdi* er saksfølsomme.
    
Idatasets.xmlHvis delen av datasett.xml for et datasett har
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
For eksempel
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
datatilgangsskjemaet (.html nettside) for datasettet inkluderer en widget (for hver attributtName i den kommadelte listen) rett under listen over variabler som lar brukerne angi en attributtverdi. Hvis brukeren velger en attributtverdi for ett eller flere av attributtnavnene, vil de bli lagt til forespørselen via & Legg til Variabler Hvor (" *attributt Navn* "," *attributt Verdi* ") .. Dette merket idatasets.xmllar deg angi listen over attributtnavn som vil vises i datatilgangsskjemaet for det datasettet og gjør det enkelt for brukere å legge til og legge til variabler Når funksjoner på forespørselen. Den *attributtNamesCSV* Listen er saksfølsom.
    
#### &lt;høyde MetersPerSourceUnite&gt;{#altitudemeterspersourceunit} 
* [ ** &lt;høydemålerePerSourceUnite&gt; ** ] (#altitudemeterspersourceunit) er et valgfritt merke i&lt;datasett&gt; tag i datasett. xxml for EDDTableFraSOSDatasett (Bare&#33;) som angir et tall som multipliseres med kildehøyden eller dybdeverdiene for å konvertere dem til høydeverdier (i meter over havet) .. For eksempel
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Denne taggen må brukes hvis datasettets vertikale akseverdier ikke er meter, positive = opp. Ellers er det valgfritt, siden standardverdien er 1. For eksempel
    * Hvis kilden allerede er målt i meter over havet, bruk 1 (eller ikke bruk denne etiketten, siden 1 er standardverdien) ..
    * Hvis kilden måles i meter under havnivå, bruk -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Hvis kilden måles i km over havet, bruk 0,001.
         
#### &lt;standardDataQuery&gt;{#defaultdataquery} 
* [ ** &lt;standardDataQuery&gt; ** ] (#defaultdataquery) er et valgfritt tag i et&lt;datasett&gt; tag indatasets.xmlsom fortellerERDDAP™å bruke den angitte spørringen (den delen av URL-en etter) hvis .html-filen Type (datatilgangsskjemaet) er bedt om uten spørsmål.
    * Du trenger sannsynligvis sjelden å bruke dette.
    * Du trenger XML-kode (Ikke prosent kode) standardspørsmål siden de er i et XML-dokument. For eksempel blir & amp;&lt;blir&lt;, &gt; blir &gt; .
    * Sjekk arbeidet. Det er enkelt å gjøre en feil og ikke få det du vil ha.ERDDAP™vil prøve å rydde opp feilene dine - men ikke stole på det, siden\\*Hvordan\\*Det rengjøres kan endre seg.
    * For netdap datasett, er en vanlig bruk av dette å spesifisere en annen standard dybde eller høyde dimensjonsverdi (For eksempel\\[0\\]i stedet for\\[siste\\]) ..
I alle fall bør du alltid liste alle variabler, alltid bruke de samme dimensjonsverdiene for alle variabler, og nesten alltid bruke\\[0\\],\\[siste\\], eller\\[0:sist\\]For dimensjonsverdiene.
For eksempel:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Fortabledapdatasett, hvis du ikke angir noen begrensning, vil forespørselen returnere hele datasettet, som kan være upraktisk stort avhengig av datasettet. Hvis du ikke ønsker å angi noen begrensninger, i stedet for å ha en tom&lt;standardDataQuery&gt; (som ikke angir en standard DataQuery) , må du eksplisitt vise alle variabler du vil inkludere i standardDataQuery.
    * Fortabledapdatasett, den vanligste bruken av dette er å angi et annet standard tidsområde (i forhold til max (tid) , for eksempel, &time&gt;=max (tid) -1 dag, eller i forhold til nå, for eksempel, &time&gt;=now-1 dag) ..
Husk at å be om ingen datavariabler er det samme som å spesifisere alle datavariabler, så vanligvis kan du bare spesifisere den nye tidsbegrenselsen.
For eksempel:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
eller
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;standardGraphQuery&gt;{#defaultgraphquery} 
* [ ** &lt;standardGraphQuery&gt; ** ] (#standardgrafikk) er et valgfritt tag i et&lt;datasett&gt; tag indatasets.xmlsom fortellerERDDAP™å bruke den angitte spørringen (den delen av URL-en etter) dersom .graph-filen Type (i Make A Graph Form) er bedt om uten spørsmål.
    * Du trenger sannsynligvis sjelden å bruke dette.
    * Du trenger XML-kode (Ikke prosent kode) standardspørsmål siden de er i et XML-dokument. For eksempel blir & amp;&lt;blir&lt;, &gt; blir &gt; .
    * Sjekk arbeidet. Det er enkelt å gjøre en feil og ikke få det du vil ha.ERDDAP™vil prøve å rydde opp feilene dine - men ikke stole på det, siden\\*Hvordan\\*Det rengjøres kan endre seg.
    * For datasett for netdap er den vanligste bruken av dette å angi en annen standarddybde eller høydedimensjonverdi (For eksempel\\[0\\]i stedet for\\[siste\\]) og/eller for å angi at en bestemt variabel grafiseres.
I alle tilfeller vil du nesten alltid bruke\\[0\\],\\[siste\\], eller\\[0:sist\\]For dimensjonsverdiene.
For eksempel:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (Legg alt på én linje) 
    * Fortabledapdatasett, hvis du ikke angir noen begrensning, vil forespørselen grafere hele datasettet, som kan ta lang tid, avhengig av datasettet.
    * Fortabledapdatasett, den vanligste bruken av dette er å angi et annet standard tidsområde (i forhold til max (tid) , for eksempel, &time&gt;=max (tid) -1 dag, eller i forhold til nå, for eksempel, &time&gt;=now-1 dag) ..
Husk at å be om ingen datavariabler er det samme som å spesifisere alle datavariabler, så vanligvis kan du bare spesifisere den nye tidsbegrenselsen.
For eksempel:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
eller
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensjonValuesInMemory&gt;{#dimensionvaluesinmemory} 
* [ ** &lt;dimensjon VerdierInMemory&gt; ** ] (#dimensjonverdisinminne)   (sant (standard) eller falsk) er en valgfri og sjelden brukt tag i&lt;datasett&gt; tag for alleEDDGridDatasett som fortellerERDDAP™hvor kildeverdiene til dimensjonene skal oppbevares (også kjent somaxisVariables) :)
    
    * sant = i minnet (som er raskere, men bruker mer minne) 
    * falsk = på disken (som er langsommere, men ikke bruker hukommelse) 
    
For eksempel
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Du bør bare bruke dette med ikke-standard verdi av falske hvis dinERDDAP™har mange datasett med svært store dimensjoner (For eksempel millioner av verdier, f.eks. iEDDGridFromAudioFiles datasett) ogERDDAPI bruk er minnebruk alltid for høy. Se minne: Bruker nå linje på\\[din Dame\\]/erddap/status.htmlå overvåkeERDDAP™minnebruk.
     
#### &lt;filTableInMemory&gt;{#filetableinmemory} 
* [ ** &lt;filTableInMemory&gt; ** ] (#filetablein memory)   (sant eller falsk (standard) ) er et valgfritt merke i&lt;datasett&gt; tag for alleEDDGridFra Filer og EDDTable FraFiles datasett som fortellerERDDAP™hvor filtabellen skal oppbevares (som har informasjon om hver kildedatafil) :)
    
    * sant = i minnet (som er raskere, men bruker mer minne) 
    * falsk = på disken (som er langsommere, men ikke bruker hukommelse) 
    
For eksempel
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Hvis du setter dette til sant for alle datasett, hold et øye med minnet: for tiden ved hjelp av linje på\\[din Dame\\]/erddap/status.htmlfor å sikre atERDDAP™Det er mye gratis minne.
     
#### &lt;fgdcFile&gt;{#fgdcfile} 
* [ ** &lt;fgdcFile &gt; ** ] (#fgdcfile) er et valgfritt tag i et&lt;datasett&gt; tag indatasets.xmlsom fortellerERDDAP™å bruke en forhåndsfremstilt FGDC-fil i stedet for å haERDDAP™Prøv å generere filen. Bruk:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *Full FilName* kan referere til en lokal fil (et sted på serverens filsystem) eller URL til en ekstern fil.
Hvis *Full FilName* \\="" eller filen er ikke funnet, vil datasettet ikke ha FGDC-metadata. Så dette er også nyttig hvis du vil undertrykke FGDC metadata for et bestemt datasett.
Eller du kan sette&lt;fgdcActive&gt;false&lt;/fgdcActive&gt; i setup.xml å fortelleERDDAP™Ikke å tilby FGDC metadata for noen datasett.
     
#### &lt;iso19115 Fil &gt;{#iso19115file} 
* [ ** &lt;iso19115File &gt; ** ] (#iso19115file) er et valgfritt tag i et&lt;datasett&gt; tag indatasets.xmlsom fortellerERDDAP™å bruke en forhåndsfremstilt ISO 19115-fil i stedet for å haERDDAP™Prøv å generere filen. Bruk:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *Full FilName* kan referere til en lokal fil (et sted på serverens filsystem) eller URL til en ekstern fil.
Hvis *Full FilName* " = " eller filen er ikke funnet, vil datasettet ikke ha ISO 19115 metadata. Så dette er også nyttig hvis du vil undertrykke ISO 19115 metadata for et bestemt datasett.
Eller du kan sette&lt;iso19115Aktiv&gt;falsk&lt;/iso19115Active&gt; i setup.xml å fortelleERDDAP™ikke å tilby ISO 19115 metadata for alle datasett.
     
#### &lt;matchAxis NDigits&gt;{#matchaxisndigits} 
* [ ** &lt;matchAxisNDigits&gt; ** ] (#matchaksendigitter) er et valgfritt merke i enEDDGrid &lt;datasett&gt; tag forEDDGriddatasett som er aggregeringer, f.eks. samlinger av filer. Hver gang datasettet lastes på nytt,ERDDAP™Kontrollerer at akseverdiene til hver komponent i sammenstillingen er de samme. Nøyaktigheten av testen bestemmes av[matchAxisNDigits](#matchaxisndigits), som angir det totale antall siffer som må matche ved testing av dobbel presisjonsakseverdier, 0 - 18 (standard) .. Når du tester flyteakseverdier, utføres testen med matchAxisNDigits/2-siffer. En verdi på 18 eller høyere fortellerEDDGridå gjøre en eksakt test. En verdi på 0 fortellerEDDGridikke å gjøre noen test, som ikke anbefales, bortsett fra som beskrevet nedenfor.
    
Selv omEDDGridtillater komponentene i sammenstillingen å ha litt forskjellige akseverdier, kun ett sett med akseverdier er vist for brukeren. Settet er fra samme komponent som gir datasettets kildemetadata. For eksempelEDDGridFraFiles datasett, som er spesifisert av&lt;MetadataFra&gt; innstilling (standard=sist) ..
    
Bruk av matchAxisNDigits -=0 er sterkt mislykket i de fleste tilfeller, fordi det slår av all kontroll. Selv minimal kontroll er nyttig fordi det sikrer at komponentene er egnet for aggregering. Vi antar alle at alle komponentene er egnet, men det er ikke alltid det. Dette er således en viktig sunnhetstest. Selv verdier av matchAxisNDigits1, 2, 3 eller 4 er mislykket fordi de forskjellige akseverdier ofte indikerer at komponentene ble opprettet (-Binned?) en annen måte og er dermed ikke egnet for sammenstilling.
    
Det er ett tilfelle hvor bruk av matchAxisNDigits-=0 er nyttig og anbefalt: med sammenlegginger av fjernfiler, f.eks. data i S3-bøtter. I dette tilfellet, hvis datasettet bruker cacheFromUrl, cacheSizeGB, matchAxisNDigits -=0, ogEDDGridFraFiles system for[aggregering via Filnavn](#aggregation-via-file-names-or-global-metadata), såEDDGridtrenger ikke å lese alle eksterne filer for å gjøre sammenslåingen. Dette gjør det mulig å laste datasett fra data i S3 bøtter veldig raskt (i motsetning til absurd sakte hvisEDDGridmå laste ned og lese alle filene) ..
    
#### &lt;nThreads&gt;{#nthreads} 
* Begynner medERDDAP™versjon 2.00, når noen underklasse av EDDTableFromFiler ellerEDDGridleser data fra sin kilde, det kan lese en del av data (For eksempel en kildefil) om gangen (i en tråd)   (Det er standard) Mer enn én del data (f.eks. 2+ kildefiler) om gangen (i 2 eller flere tråder) under behandlingen av hver forespørsel.
     
    * Tummelregel:
For de fleste datasett på de fleste systemer, bruk nThreads=1, standard. Hvis du har en kraftig datamaskin (Mange CPU kjerner, mye minne) , deretter vurdere innstilling nThreads til 2, 3, 4 eller høyere (Men aldri mer enn antall CPU kjerner i datamaskinen) for datasett som kan være til nytte:
        
        * De fleste EDDTableFromFiles datasett vil dra nytte av.
        * Datasett der noe forårsaker et lag før en bit data faktisk kan behandles, vil for eksempel:
            * Datasett med[eksternt komprimert (f.eks..gz) ](#externally-compressed-files)binær (f.eks..nc) filer, fordiERDDAP™må dekomprimere hele filen før den kan begynne å lese filen.
            * Datasett som bruker[cacheSizeGB](#cachefromurl)fordiERDDAP™Ofte må du laste ned filen før den kan lese den.
            * Datasett med datafiler som er lagret på et høybåndsbreddeparallelt filsystem, fordi det kan levere mer data, raskere, etterspørsel. Eksempler på parallelle filsystemer inkluderer[JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures),[pNFS](http://www.pnfs.com/),[GlusterFS](https://en.wikipedia.org/wiki/Gluster)Amazon S3, og Google Cloud Storage.
                 
        
Advarsel: Når du bruker nThreads&gt;1, hold øye medERDDAPminnebruk, trådbruk og total responsivitet (se[ERDDAPstatussiden](/docs/server-admin/additional-information#status-page)) .. Se kommentarer om disse problemene nedenfor.
         
    * For et gitt datasett kan denne nThreads-innstillingen komme fra forskjellige steder:
        
        * Hvisdatasets.xmlbit for et datasett har en&lt;nThreads&gt; tag (innenfor&lt;datasett&gt; tag, ikke som en global attributt) med en verdi &gt;= 1, den verdien av nThreads brukes. Du kan angi et annet tall for hvert datasett.
        * Ellers hvisdatasets.xmlhar en&lt;nTreads&gt; tag (for EDDTable FraFiles datasett) eller&lt;nGridThreads&gt; tag (forEDDGridDatasett) med en verdi &gt;= 1 utenfor et&lt;datasett&gt; tag, den verdien av nThreads brukes.
        * Ellers brukes 1 tråd, som er et trygt valg siden den bruker den minste mengden minne.
             
        
For[opprinneligERDDAP™installasjon](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Vi bruker
        &lt;nTabellTreads &gt; 6&lt;/nThreads &gt; (Det er en kraftig server.) Vanskelige forespørsler tar nå 30 % av forrige gang.
         
##### Overvåk ressursbruk{#monitor-resource-usage} 
Når du eksperimenterer med forskjellige nThreads-innstillinger (og kanskje gjøre vanskelige prøveforespørsler til dinERDDAP) , kan du overvåke datamaskinens ressursbruk:
* På Macs, bruk Finder : Programmer : Verktøy : Aktivitetsovervåkning
* På Linux, bruk toppen
* På Windows 10, bruk *Ctrl + Skift + Esc* å åpne oppgavehåndtering
             
##### Advarsel: Nedsatt respons{#warning-decreased-responsiveness} 
isolert,ERDDAP™vil oppfylle en forespørsel til et datasett med høyere nThreads innstilling raskere enn om nThreads=1. Men mens forespørselen behandles, vil andre forespørsler fra andre brukere bli noe overfylt og få en langsommere respons. Også nårERDDAP™Svar på en gitt forespørsel, andre databehandlingsressurser (f.eks. tilgang til diskstasjon, båndbredde) kan være begrensende, spesielt med høyere nThreads innstillinger. Så med høyere nThreads innstillinger, vil det generelle systemet responsivitet være verre når det er flere forespørsler som behandles - dette kan være veldig irriterende for brukerne&#33; På grunn av dette: Sett aldri nThreads til mer enn antall CPU kjerner i datamaskinen. nThreads=1 er den vakreste innstillingen siden hver forespørsel (blant flere samtidige forespørsler) vil få like stor andel av databehandlingsressursene. Men jo kraftigere datamaskinen, jo mindre vil dette være et problem.
         
##### Advarsel: Høyere hukommelse Bruk avEDDGridDatasett{#warning-higher-memory-use-for-eddgrid-datasets} 
Minnebruk under behandling av forespørsler er direkte proporsjonal med nThreads-innstillingen. En rimelig trygg tommelfingerregel er: du må sette[ERDDAPminneinnstillinger](/docs/server-admin/deploy-install#memory)minst 2GB + (2GB \\* nThreads) .. Noen forespørsler til noen datasett trenger mer minne enn det. For eksempel, innstilling nThreads=3 for noenEDDGriddatasett betyr at innstillingen -Xmx bør være minst -Xmx8000M. Hvis minneinnstillingen er større enn 3/4 det fysiske minnet til datamaskinen, redusere nThreads-innstillingen slik at du kan redusere minneinnstillingen.

Minnebruken av tråder som behandler forespørsler til EDDTable-datasett er nesten alltid lavere fordi filene vanligvis er mye mindre. Men hvis et gitt EDDTable datasett har stor (f.eks. &gt;=1 GB) datafiler, så kommer kommentarene ovenfor også til å gjelde disse datasettene.

Uavhengig av NThreads-innstillingen, hold et tett øye med minnebruksstatistikken på din[ERDDAPstatussiden](/docs/server-admin/additional-information#status-page).. Du bør aldri komme nær til maxing ut minnebruk iERDDAPEllers vil det være alvorlige feil og feil.
        
##### Midlertidig sett til 1{#temporarily-set-to-1} 
Hvis dagens minnebruk er litt høy,ERDDAP™vil sette nThreads for denne anmodningen til 1. DerforERDDAP™Bevarer hukommelse når minnet er lite.
         
##### Diminishing retur{#diminishing-returns} 
Det er redusert avkastning til å øke nThreads innstillingen: 2 tråder vil være mye bedre enn 1 (Hvis vi ignorerer dynamisk overklokking) .. 3 vil være bare en bit bedre enn 2. 4 vil være marginalt bedre enn 3.

I en test av en vanskelig spørring til et stort EDDTable-datasett var responstiden ved bruk av 1, 2, 3, 4, 5, 6 tråder 38, 36, 20, 18, 13, 11 sekunder. (Nå bruker vi nTableThreads=6 på den serveren.) 

nThreads=2: Selv om det ofte er en betydelig fordel å spesifisere nThreads=2 i stedet for nThreads=1, vil det ofte ikke gjøre mye forskjell i den klokketiden som kreves for å svare på en gitt brukers forespørsel. Årsaken er: med nThreads=1, mest moderne CPU vil ofte[Dynamisk overklokke](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (Turbo boost) å midlertidig øke klokkehastigheten til CPU. Således vil den ene kjernen ofte jobbe med en høyere klokkehastighet enn hver av de to kjernene hvis du bruker nThreads=2. Uansett mener vi fortsatt at det er bedre å bruke nThreads=2 i stedet for nThreads=1, siden den innstillingen vil gi bedre resultater i en bredere rekke situasjoner. Og selvfølgelig, hvis datamaskinen din har tilstrekkelige CPU kjerner, bør en enda høyere nThreads innstilling gi bedre resultater.

Som diskutert ovenfor, kan svært høye nThreads innstillinger føre til raskere svar på noen forespørsler, men risikoen for totalt redusertERDDAP™responsivitet og høy minnebruk (som nevnt ovenfor) Mens disse forespørsler behandles betyr det generelt ikke en god ide.
        
##### CPU Cores{#cpu-cores} 
Du bør aldri sette nThreads til et tall større enn antall CPU kjerner i datamaskinens CPU. I hovedsak alle moderne CPUer har flere kjerner (f.eks. 2, 4 eller 8) .. Noen datamaskiner har til og med flere CPUer (For eksempel 2 CPUer \\ * 4 kjerner/CPU = 8 CPU kjerner) .. For å finne ut hvor mange CPUer og kjerner en datamaskin har:

* På Macs, bruk *Valgnøkkel* : Apple Menu : Systeminformasjon
* På Linux, bruk katt /proc / cpuinfo
* På Windows 10, bruk *Ctrl + Skift + Esc* Å åpne Oppgaveleder: Performance (Logiske prosessorer viser det totale antall CPU-kjerner) 

Ja, de fleste prosessorer i disse dager sier at de støtter 2 tråder per kjerne (via[Hyper-treading](https://en.wikipedia.org/wiki/Hyper-threading)) , men de 2 trådene deler datamaskinressurser, så du vil ikke se dobbelt gjennomløp på en CPU under tung belastning. For eksempel kan en datamaskin med én CPU med 4 kjerner hevde å støtte inntil 8 tråder, men du bør aldri overstige nThreads=4 i detERDDAP.. Husk det:

* NThreads innstilling iERDDAP™er per forespørsel.ERDDAP™Ofte håndterer flere forespørsler samtidig.
*   ERDDAP™gjør ting annet enn prosessforespørsler, f.eks. reload datasett.
* NårERDDAP™Svar på en gitt forespørsel, andre databehandlingsressurser (f.eks. tilgang til diskstasjon, båndbredde) kan være begrensende. Jo høyere du setter nThreads, jo mer sannsynlig at disse andre ressursene vil bli maxed ut og vil bremseERDDAPgenerell respons.
* Operativsystemet gjør noe annet enn å kjøreERDDAP..

Så det er best å ikke angi nThreads innstilling til mer enn antall kjerner i datamaskinens CPU.
         
##### Mileage May Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
Resultatene av ulike nThreads innstillinger vil variere mye for ulike forespørsler til ulike datasett på ulike systemer. Hvis du virkelig vil vite effekten av forskjellige nThreads innstillinger, kjøre realistiske tester.
         
##### Hvorfor nThreads per forespørsel?{#why-nthreads-per-request} 
Jeg kan høre noen av dere tenker " hvorfor er NThreads per forespørsel? Hvis jeg kodet dette, ville jeg bruke en permanent arbeider tråd basseng og en melding kø for bedre ytelse - Problemet med å bruke et arbeidertrådbasseng og en melding kø er at en vanskelig forespørsel ville oversvømme køen med mange sakte oppgaver. Dette vil effektivt blokkereERDDAP™fra til og med å starte arbeidet med oppgaver relatert til andre forespørsler til den opprinnelige forespørselen var (i hovedsak) Ferdig. Således vil selv enkle etterfølgende forespørsler svare super sakte.ERDDAPbruk av nThreads per forespørsel fører til en mye mer rettferdig bruk av databehandlingsressurser.
         
##### nThreads vs Flere arbeidere datamaskiner{#nthreads-vs-multiple-worker-computers} 
Dessverre,ERDDAPnThreads-systemet vil aldri være like effektivt som sant parallellisering via flere arbeidsdatamaskiner, med hver arbeider på en bit data, på den måten at Hadoop eller Apache Spark vanligvis brukes. Når oppgaven virkelig er parallellisert/distribuert til flere datamaskiner, kan hver datamaskin bruke alle sine ressurser på sin del av oppgaven. MedERDDAPNThreads-systemet konkurrerer hver av trådene for samme datamaskins båndbredde, diskstasjoner, minne osv. Dessverre har de fleste av oss ikke ressurser eller midler til å opprette eller til og med leie. (på Amazon Web Services (AWS) Google Cloud Platform (GCP) ) Store nettverk av datamaskiner. I motsetning til en relasjonsdatabase som kan returnere resultatlinjene i enhver rekkefølge,ERDDAP™gjør et løfte om å returnere resultatlinjene i en konsekvent rekkefølge. Denne begrensningen gjørERDDAPNThreads implementasjon mindre effektiv. MenERDDAPNThreads er i mange tilfeller nyttig.

Men det finnes måter å gjøreERDDAP™skala til å håndtere et stort antall forespørsler raskt ved å etablere en[rutenett/cluster/føderasjon avERDDAPs](/docs/server-admin/scaling)..
         
#### &lt;paletter&gt;{#palettes} 
* Begynner medERDDAP™versjon 2.12datasets.xmlkan inkludere en&lt;paletter&gt; tag (innen&lt;erddapDatasett&gt;) som tilsidesetter&lt;paletter&gt; tag verdi fra messages.xml (eller tilbake til e-post.xml-verdien hvis merket idatasets.xmlEr tom) .. Dette lar deg endre listen over tilgjengelige paletter mensERDDAP™Jeg løper. Det lar deg også gjøre en endring og har det vedvarer når du installerer en ny versjon avERDDAP..
ADVARSEL: Paletene som er oppført idatasets.xmlmå være et supersett av palettene som er oppført i messages.xml; ellersERDDAP™vil kaste et unntak og slutte å behandledatasets.xml.. Dette sikrer at alleERDDAP™installasjonene støtter i det minste de samme kjernepalettene.
ADVARSEL:ERDDAP™sjekker at palettfilene som er angitt i messages.xml faktisk eksisterer, men det sjekker ikke palettfilene som er oppført idatasets.xml.. Det er ditt ansvar å sikre at filene er tilstede.
    
Også å begynne medERDDAP™versjon 2.12, hvis du gjør en cptfiles underkatalog iERDDAP™innholdskatalog,ERDDAP™vil kopiere alle \\*.cpt-filene i den katalogen til\\[tomcat\\]/webapps/erddap/WEB-INF/cptfiles-katalog hver gangERDDAP™Begynner. Hvis du legger egendefinerte cpt-filer i den katalogen, vil disse filene bli brukt avERDDAP™, uten ekstra innsats fra din side, selv når du installerer en ny versjon avERDDAP..
    
ADVARSEL: Hvis du legger til egendefinerte paletter i dinERDDAP™og du harEDDGridFraErddap og/eller EDDTableFromErddap-datasett i dineERDDAP™, vil brukerne se dine egendefinerte palettalternativer påERDDAP™Lage en grafisk websider, men hvis brukeren prøver å bruke dem, får de en graf med standard (Vanligvis Rainbow) palett. Dette er fordi bildet er laget av fjernkontrollenERDDAP™som ikke har egendefinert palett. De eneste løsningene nå er å e-poste fjernkontrollenERDDAP™administrator for å legge dine egendefinerte paletter til hans/hennesERDDAPEller e-post til Chris. John på noaa.gov å be om at palettene legges til standardenERDDAP™Fordeling.
    
#### &lt;onChange&gt;{#onchange} 
* [ ** &lt;onChange&gt; ** ] (#onchange) er et valgfritt tag i et&lt;datasett&gt; tag indatasets.xmlsom angir en handling som vil bli gjort når dette datasettet opprettes (NårERDDAP™på nytt) og når dette datasettet endres på noen måte.
    * For øyeblikket, forEDDGridunderklasser, alle endringer i metadata eller til en aksevariabel (For eksempel et nytt tidspunkt for data i nærheten av sanntid) anses som en endring, men en reloading av datasettet anses ikke som en endring (i seg selv) ..
    * For tiden, for EDDTable-underklasser, regnes enhver reloading av datasettet som en endring.
    * I dag er det bare to typer handlinger tillatt:
        * " http://" eller https://" -- Hvis handlingen starter med http://" eller https://" ,ERDDAP™vil sende etHTTP GETforespørsel til den angitte URL. Svaret vil bli ignorert. For eksempel kan URL-adressen fortelle noen andre webtjenester å gjøre noe.
            * Hvis URL-en har en spørringsdel (etter) Det må allerede være[prosent kodet](https://en.wikipedia.org/wiki/Percent-encoding).. Du må kode spesielle tegn i begrensningene (annet enn den opprinnelige \"&\" og den viktigste'='i begrensninger) inn i formen %HH, hvor HH er den 2-siffers heksadesimale verdien av tegnet. Vanligvis trenger du bare å konvertere noen av tegntegnene: % til %25, og til %26, " til %22,&lt;i% 3C, = i% 3D, &gt; i% 3E, + i% 2B,|til %7C,\\[til %5B,\\]til %5D, mellomrom til %20, og konvertere alle tegn over #127 til deres UTF-8-form og deretter prosent kode hver byte av UTF-8-formen til %H-format (spør en programmerer om hjelp) ..
For eksempel, &stationID&gt;=-41004"
blir &stationID%3E=%2241004%22
Prosent koding er vanligvis nødvendig når du får tilgang tilERDDAPvia annen programvare enn en nettleser. Browsere håndterer vanligvis prosent koding for deg.
I noen situasjoner, må du prosent kode alle andre tegn enn A-Za-z0-9-_-&#33;. ~ \" () \\*, men likevel ikke kode den opprinnelige '&' eller den viktigste'='i begrensninger.
Programmeringsspråk har verktøy for å gjøre dette (for eksempel seJava's[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)ogJavaScripts [encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) og det er
                [nettsteder som prosent kode/kode for deg](https://www.url-encode-decode.com/)..
            * Sidendatasets.xmler en XML-fil, du må også & kode ALL '&', '&lt;', og '&gt;' i URL som '&amp;', '&lt;', og '&gt;' etter prosent koding.
            * Eksempel: For en URL du kan skrive inn i en nettleser som:
                 https://www.company.com/webService?department=R%26D&param2=value2   
Du bør angi en&lt;onChange&gt; tag via (på én linje) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * postto: -- Hvis handlingen starter med "mailto:",ERDDAP™vil sende en e-post til den påfølgende e-postadressen som indikerer at datasettet er oppdatert/ endret.
For eksempel:&lt;onChange&gt;mailto:john.smith@company.com&lt;/onChange&gt; Hvis du har en god grunn tilERDDAP™For å støtte en annen type handling, send oss en e-post som beskriver det du vil ha.
    * Denne etiketten er valgfri. Det kan være så mange tagger som du vil. Bruk en av disse taggene for hver handling som skal utføres.
    * Dette er analogt medERDDAPe-post/URL-abonnement, men disse handlingene lagres ikke vedvarende (De lagres bare i et EDD-objekt.) ..
    * For å fjerne et abonnement, bare fjerne&lt;onChange&gt; tag. Endringen vil bli notert neste gang datasettet lastes på nytt.
         
#### &lt;reloadEveryNMinutes&gt;{#reloadeverynminutes} 
* [ ** &lt;Last på nytt Hver NMinutes &gt; ** ] (#reloadvarelser) er et valgfritt tag i et&lt;datasett&gt; tag indatasets.xmlav nesten alle datasettstyper som angir hvor ofte datasettet skal lastes på nytt. For eksempel
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Datasett som endrer seg ofte (For eksempel, få nye datafiler) Skal lastes på ofte, for eksempel hvert 60. minutt.
    * Datasett som endres sjeldent bør lastes på nytt, for eksempel hvert 1440 minutt. (daglig) 10080 minutter (ukentlig) ..
    * Denne etiketten er valgfri, men anbefalt. Standarden er 10080.
    * Et eksempel er:&lt;reloadEveryNMinutes&gt;1440&lt;/ reload Hver NMinutes &gt;
    * Når et datasett lastes på nytt, alle filer i *bigParentDirectory* /cache/ *datasetID* Katalogen slettes.
    * Uansett hva dette er satt til, vil ikke et datasett lastes oftere enn&lt;loadDatasettMinMinminuter &gt; (standard = 15) som angitt i[config.xml](/docs/server-admin/deploy-install#setupxml).. Så hvis du vil at datasett skal lastes på nytt svært ofte, må du angi både reloadEveryNMinutes og lastDatasett MinMinutes til små verdier.
    * Ikke sett reloadEveryNMinutes til samme verdi som lastdatasett MinMinutes, fordi den forløpte tiden sannsynligvis vil være (For eksempel) 14:58 eller 15:02, så datasettet vil bare bli reloadet i omtrent halvparten av de store reloads. Bruk i stedet mindre (For eksempel 10) eller større (For eksempel 20) Last på nytt Hver NMinutes verdi.
    * Uansett reloadEveryNMinutes, kan du manuelt fortelleERDDAP™å laste om et bestemt datasett så snart som mulig via en[flaggfil](/docs/server-admin/additional-information#flag)..
    * For nysgjerrige programmerere -- iERDDAP™, reloading av alle datasett håndteres av to enkelt formål tråder. En tråd starter en mindre reload hvis den finner en flaggfil eller en større reload (som kontrollerer alle datasett for å se om de må lastes på nytt) .. Den andre tråden gjør faktisk reload av datasettene en om gangen. Disse trådene fungerer i bakgrunnen som sikrer at alle datasett holdes oppdatert. Tråden som faktisk gjør reloads forbereder en ny versjon av et datasett og bytter det til plass (i hovedsak erstatte den gamle versjonen atomisk) .. Så det er svært mulig at følgende sekvens av hendelser oppstår (Det er bra.) :)
        
        1.  ERDDAP™begynner å laste om et datasett (å lage en ny versjon) i bakgrunnen.
        2. Bruker 'A' forespørsel til datasettet.ERDDAP™bruker den aktuelle versjonen av datasettet til å opprette svaret. (Det er bra. Det var ingen forsinkelse for brukeren, og den nåværende versjonen av datasettet bør aldri være veldig utholdenhet.) 
        3.  ERDDAP™fullfører å opprette den nye reloadede versjonen av datasettet og bytter ut den nye versjonen til produksjon. Alle etterfølgende nye forespørsler håndteres av den nye versjonen av datasettet. For konsistens blir brukerens A-forespørsel fortsatt fylt av den opprinnelige versjonen.
        4. Bruker \"B\" forespørsel til datasettet ogERDDAP™bruker den nye versjonen av datasettet til å lage svaret.
        5. Etter hvert er brukerens og brukerens forespørsler fullført (Kanskje A er ferdig først, kanskje B er ferdig først) ..
        
Jeg kan høre noen si: Bare to thredds&#33; Ha&#33; Det er lamt&#33; Han bør sette opp det slik at reloading av datasett bruker så mange tråder som nødvendig, slik at alt blir gjort raskere og med lite eller ingen lag." Ja og nei. Problemet er at lasting av mer enn ett datasett om gangen skaper flere harde nye problemer. Alle må løses eller håndteres. Systemet fungerer bra og har håndterbare problemer (For eksempel, potensial for lag før et flagg blir lagt merke til) .. (Hvis du trenger hjelp til å håndtere dem, se vår[Seksjon om å få ekstra støtte](/docs/intro#support)..) Den relaterte[Oppdater EveryNMillis](#updateeverynmillis). systemet fungerer i responstråder, så det kan og fører til at flere datasett oppdateres (Ikke hele reloaden) samtidig.
##### Proactive vs. Reactive{#proactive-vs-reactive} 
ERDDAPreload systemet er proaktivt - datasettene lastes på nytt kort tid etter reload Hver NMinutes-tid er på tide (Det vil si at de blir "stale", men aldri veldig utholdenhet) , om datasettet får forespørsler fra brukere eller ikke. SåERDDAP™Datasett er alltid oppdaterte og klare til bruk. Dette er i motsetning til THREDDS' reaktive tilnærming: en brukers forespørsel er det som forteller THREDDS å sjekke om et datasett er stabilt (Det kan være veldig stabilt) .. Hvis det er utholdenhet, gjør TREDDS brukeren vente (Ofte i noen minutter) mens datasettet lastes på nytt.
        
#### &lt;Oppdater EveryNMillis&gt;{#updateeverynmillis} 
* [ ** &lt;OppdaterEveryNMillis&gt; ** ] (#updatevardenmillis) er et valgfritt tag i et&lt;datasett&gt; tag indatasets.xmlnoen datasett typer som hjelperERDDAP™jobbe med datasett som endres svært ofte (så ofte som omtrent hvert sekund) .. I motsetning tilERDDAPer jevnlig, proaktiv, [&lt;Last på nytt EveryNMinutes&gt;] (#reloadvarelser) systemet for å fullstendig laste opp hvert datasett, dette valgfrie tilleggssystemet er reaktivt (utløst av en brukerforespørsel) og raskere fordi det er gradvis (Oppdatere informasjonen som må oppdateres) .. For eksempel hvis en forespørsel til enEDDGridFraDap datasett forekommer mer enn det angitte antall millisekunder siden den siste oppdateringen,ERDDAP™vil se om det er nye verdier for venstre (Først, vanligvis"time") dimensjon og i så fall bare laste ned de nye verdiene før håndtering av brukerens forespørsel. Dette systemet er veldig bra til å holde en raskt skiftende datasett oppdatert med minimale krav til datakilden, men til kostnad av å senke behandlingen av noen brukerforespørsler.
    * For å bruke dette systemet, legg til (For eksempel) :)
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
rett etter&lt;reloadEveryNMinutes &gt; Tagge til datasettet idatasets.xml.. Antall millisekunder du angir kan være så lite som 1 (For å sikre at datasettet alltid er oppdatert) .. En verdi på 0 (standard) Eller et negativt tall slår av systemet.
    * På grunn av sin gradvise natur, bør oppdateringer avsluttes veldig raskt, så brukerne bør aldri måtte vente lenge.
    * Hvis en annen forespørsel om data kommer før den forrige oppdateringen er fullført, vil den andre forespørselen ikke utløse en annen oppdatering.
    * Gjennom hele dokumentasjonen vil vi forsøke å bruke ordet " reload" for regelmessige, fulle datasett reloads og " oppdatert" for disse nye trinnvise, delvise oppdateringene.
    * For å teste, er noen diagnoser trykt for å logge.txt hvis [&lt;loggnivå&gt;] (#loglevel) idatasets.xmler satt til " alle".
    * Hvis du bruker trinnvise oppdateringer og spesielt hvis venstre (først) , for eksempel tid, aksen er stor, kan du ønske å sette&lt;reloadEveryNMinutes&gt; til et større antall (1440?) , slik at oppdateringer gjør det meste av arbeidet for å holde datasettet oppdatert, og fulle reloads gjøres sjelden.
    * Merk: Dette nye oppdateringssystemet oppdaterer metadata (For eksempel tidactual\\_range, time\\_coverage\\_end, ...) Men utløser ikke onChange (e-post eller berøringsadresse) eller endreRSSfôring (Kanskje det burde...) ..
    * For alle datasett som bruker underklasser av[EDDGridFraFiles](#eddgridfromfiles)og[EDDTableFra Filer](#eddtablefromfiles):)
        *    **ADVARSEL:** når du legger til en ny datafil i et datasett ved å kopiere den i katalogen somERDDAP™Se på, det er en fare for atERDDAP™vil legge merke til den delvis skrevete filen; prøv å lese den, men mislykkes fordi filen er ufullstendig; erklære filen å være en "bad" fil og fjerne den (midlertidig) fra datasettet.
For å unngå dette, vi **STRONGGJENNOM** som du kopierer en ny fil til katalogen med et midlertidig navn (for eksempel 20150226.ncTmp) som ikke samsvarer med datasett-filen NameRegex (\\*\\.nc) Endre navn på filen til riktig navn (for eksempel 20150226.nc) .. Hvis du bruker denne metoden,ERDDAP™vil ignorere den midlertidige filen og bare legge merke til den riktig navngitte filen når den er ferdig og klar til å brukes.
        * Hvis du endrer eksisterende datafiler på plass (for eksempel å legge til et nytt datapunkt) ,&lt;oppdaterEveryNMillis&gt; vil fungere bra hvis endringene vises atomisk (På et øyeblikk) og filen er alltid en gyldig fil. For eksempel tillater netcdf-java-biblioteket tillegg til den ubegrensede dimensjonen av en "klassisk".ncv3-fil som skal gjøres atomisk.
            &lt;OppdaterEveryNMillis&gt; vil fungere dårlig hvis filen er ugyldig mens endringene gjøres.
        *   &lt;OppdaterEveryNMillis&gt; vil fungere bra for datasett der en eller noen få filer endres på kort tid.
        *   &lt;oppdaterEveryNMillis&gt; vil fungere dårlig for datasett der et stort antall filer endres på kort tid (med mindre endringene virker atomisk) .. For disse datasettene er det bedre å ikke bruke&lt;oppdaterEveryNMillis&gt; og å sette en[flagg](/docs/server-admin/additional-information#set-dataset-flag)å fortelleERDDAP™Last datasettet på nytt.
        *   &lt;OppdaterEveryNMillis&gt; oppdaterer ikke informasjonen tilknyttet [&lt;subsetVariables&gt;] (#subsetvariables) .. Normalt er dette ikke et problem, fordisubsetVariablesHar informasjon om ting som ikke endrer seg så ofte (f.eks. listen over stasjonsnavn, breddegrader og lengdegrader) .. HvissubsetVariablesDataendringer (For eksempel, når en ny stasjon legges til datasettet) Kontakt deretter[flagg URL](/docs/server-admin/additional-information#set-dataset-flag)for datasett å fortelleERDDAP™Last datasettet på nytt. EllersERDDAP™vil ikke legge merke til den nye underdelen Variable opplysninger til neste gang datasettet lastes på nytt (&lt;reloadEveryNMinutes&gt;)
        * Vår generelle anbefaling er å bruke:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * TROUBLE? På Linux datamaskiner, hvis du bruker&lt;OppdaterEveryNMillis&gt; medEDDGridFraFiler eller EDDTableFra Filer klasser, kan du se et problem der et datasett ikke laster (Noen ganger eller konsekvent) med feilmeldingen: "IOException: Brukergrense for inotify tilfeller nådd eller for mange åpne filer". Årsaken kan være en feil iJavasom forårsaker inotify tilfeller som ikke samles inn. Dette problemet unngås iERDDAP™v1.66 og høyere. Så den beste løsningen er å bytte den nyeste versjonen avERDDAP..
Hvis det ikke løser problemet (dvs. hvis du har et veldig stort antall datasett ved hjelp av&lt;oppdaterEveryNMillis&gt;), kan du løse dette problemet ved å ringe:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Bruk høyere tall hvis problemet fortsetter. Standarden for klokker er 8192. Standarden for tilfeller er 128.
    * Du kan sette&lt;oppdateringMaxEvents&gt;10&lt;/updateMaxEvents&gt; idatasets.xml  (i de andre innstillingene nær toppen) å endre det maksimale antall filendringer (standard=10) som vil bli behandlet av oppdateringenEveryNMillis systemet. Et større antall kan være nyttig for datasett der det er svært viktig at de alltid holdes oppdatert. Se[oppdateringMaxEvents dokumentasjon](#updatemaxevents)..
    * For nysgjerrige programmerere - disse trinnvis oppdateringer, i motsetning tilERDDAPFull[reloadEveryNMinutes](#reloadeverynminutes)system, oppstår i brukerforespørsel tråder. Så kan alle datasett oppdateres samtidig. Det er kode (og en lås) for å sikre at bare én tråd fungerer på en oppdatering for et gitt datasett til enhver tid. Å tillate flere samtidige oppdateringer var enkelt; å tillate flere samtidige fulle reloads ville være vanskeligere.
         
#### &lt;sourceCanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;sourceCanConstrainStringEQNE &gt; ** ] (#sourcecanconstrainstringeqne) er et valgfritt tag i en EDDTable&lt;datasett&gt; tag indatasets.xmlsom angir om kilden kan begrense strengvariabler med = og &#33;=-operatører.
    * For EDDTableFromDapSekvens gjelder dette kun de ytre sekvensstrengvariabler. Det antas at kilden ikke kan håndtere noen begrensninger på indre sekvensvariabler.
    * Denne etiketten er valgfri. Gyldige verdier er sanne (standard) og falsk.
    * For EDDTableFromDapSequenceOPeNDAPDRDS-servere, dette bør settes til sant (standard) ..
    * For EDDTableFromDapSequence Dapper servere, dette bør settes til falsk.
    * Et eksempel er:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;canConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* [ ** &lt;canConstrainStringGTLT&gt; ** ] (#sourcecanconstrainstringgtlt) er et valgfritt tag i en EDDTable&lt;datasett&gt; tag som angir om kilden kan begrense strengvariabler med&lt;,&lt;=, &gt; og &gt;= operatører.
    * For EDDTableFromDapSekvens gjelder dette kun de ytre sekvensstrengvariabler. Det antas at kilden ikke kan håndtere noen begrensninger på indre sekvensvariabler.
    * Gyldige verdier er sanne (standard) og falsk.
    * Denne etiketten er valgfri. Standard er sant.
    * For EDDTableFromDapSequenceOPeNDAPDRDS-servere, dette bør settes til sant (standard) ..
    * For EDDTableFromDapSequence Dapper servere, dette bør settes til falsk.
    * Et eksempel er:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;canConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* [ ** &lt;sourceCanConstrainStringRegex &gt; ** ] (#sourcecanconstrainstringregex) er et valgfritt tag i en EDDTable&lt;datasett&gt; tag som spesifiserer om kilden kan begrense strengvariabler ved vanlige uttrykk, og i så fall hva operatøren er.
    * Gyldige verdier er "=~" (denDAPstandard) ,  " ~ = " (Feilaktig støttet av mangeDAPservere) , eller " (som indikerer at kilden ikke støtter regulære uttrykk) ..
    * Denne etiketten er valgfri. Standard er
    * For EDDTableFromDapSequenceOPeNDAPDRDS-servere, dette bør settes til -- (standard) ..
    * For EDDTableFromDapSequence Dapper servere, dette bør settes til -- (standard) ..
    * Et eksempel er:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sourceCanDoDistinct&gt;{#sourcecandodistinct} 
* [ ** &lt;sourceCanDoDistinct &gt; ** ] (#sourcecandodistinct) er et valgfritt merke i en EDDTableFromDatabase&lt;datasett&gt; tag som angir om kildedatabasen skal håndtere & skilt () begrensninger i brukerspørsmål.
    * Denne etiketten er valgfri. Gyldige verdier er ikke (ERDDAP™håndterer distinkt; standarden) , delvis (kilden håndterer tydelig ogERDDAP™håndterer det igjen) , og ja (kilden håndterer tydelig) ..
    * Hvis du bruker nei ogERDDAP™er ute av hukommelse når du håndterer distinkt, bruk ja.
    * Hvis du bruker ja og kildedatabasen håndterer tydelig for sakte, bruk nei.
    * delvis gir deg det verste av begge: det er langsom fordi databasen håndtering av distinkt er langsom og det kan gå tom for minne iERDDAP..
    * Databaser tolker DISTINCT som en forespørsel om bare unike rekker av resultater, mensERDDAP™tolker det som en forespørsel om en sortert liste over unike rekker av resultater. Hvis du setter dette på delvis eller ja,ERDDAP™Automatisk forteller også databasen å sortere resultatene.
    * En liten forskjell i resultatene:
uten|delvis,ERDDAP™vil sortere " i begynnelsen av resultatene (før ikke-"-strenger) ..
Med ja, kan databasen (Postgres vil) sort "" i slutten av resultatene (etter ikke-"-strenger) ..
Jeg vil tro at dette vil også påvirke sorteringen av korte ord versus lengre ord som starter med det korte ordet. For eksempelERDDAP™vil sortere "Simon" før "Simons".
    * Et eksempel er:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sourceCanOrderBy&gt;{#sourcecanorderby} 
* [ ** &lt;kilde CanOrderby&gt; ** ] (#sourcecanorderby) er et valgfritt merke i en EDDTableFromDatabase&lt;datasett&gt; tag som angir om kildedatabasen skal håndtere &orderBy (...) begrensninger i brukerspørsmål.
    * Denne etiketten er valgfri. Gyldige verdier er ikke (ERDDAP™håndtakorderBy (...) ; standard) , delvis (kildehåndtaketorderByogERDDAP™håndterer det igjen) , og ja (kildehåndtaketorderBy (...) ) ..
    * Hvis du bruker nei ogERDDAP™Er ute av hukommelse ved håndteringorderBy (...) Bruk ja.
    * Hvis du bruker ja og kildedatabasen håndtererorderBy (...) For sakte, bruk nei.
    * delvis gir deg det verste av begge: det er sakte fordi databasen håndtering avorderBy (...) er langsom og det kan gå tom for hukommelse iERDDAP..
    * En liten forskjell i resultatene:
uten|delvis,ERDDAP™vil sortere " i begynnelsen av resultatene (før ikke-"-strenger) ..
Med ja, kan databasen (Postgres vil) sort "" i slutten av resultatene (etter ikke-"-strenger) ..
Dette kan også påvirke sorteringen av korte ord mot lengre ord som starter med det korte ordet. For eksempelERDDAP™vil sortere "Simon" før "Simons", men jeg er ikke sikker på hvordan en database vil sortere dem.
    * Et eksempel er:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;KjelderUtvidetFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* [ ** &lt;kilden UtvidetFP\\_EQ&gt; ** ] (#kilden krever utvidetfp_eq) er et valgfritt tag i en EDDTable&lt;datasett&gt; tag som spesifiserer (sant (standard) eller falsk) Hvis kilden trenger hjelp med spørsmål med&lt;tall Variabel&gt;=&lt;FloatingPointValue&gt; (og &#33;=, &gt;=,&lt;=) For eksempel
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * For noen datakilder, numeriske spørsmål som involverer =, &#33; =,&lt;=, eller &gt;= kan ikke fungere som ønsket med flytende punkttall. For eksempel kan et søk etter lengdegrad = 220.2 mislykkes dersom verdien lagres som 220.200000000001.
    * Dette problemet oppstår fordi flytende punkttall er[Ikke representert nøyaktig i datamaskiner](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)..
    * Hvis kilden er utvidetFP\\_EQ er satt til sant (standard) ,ERDDAP™Endrer forespørsler sendt til datakilden for å unngå dette problemet. Det er alltid trygt og bra å la det bli sant.
         
#### &lt;sourceUrl&gt;{#sourceurl} 
* [ ** &lt;sourceUrl&gt; ** ] (#kildeurl) er en felles tagg i et datasetts globale&lt;addAttributes&gt; tag som angir URL som er kilden til dataene.
    * Et eksempel er:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (Legg alt på én linje) 
    * IERDDAP™Alle datasett vil hasourceUrl" i de kombinerte globale attributtene som er vist til brukerne.
    * For de fleste datasetttyper er denne etiketten REQUIRED. Se datasetttypens beskrivelse for å finne ut om dette er REQUIRED eller ikke.
    * For noen datasett, den separate&lt;sourceUrl&gt; Tagge er ikke tillatt. I stedet må du gi ensourceUrl"[global attributt](#global-attributes)Vanligvis i verden \\&gt;addAttributes&lt;.. Hvis det ikke finnes noen egentlig kildeadresse (For eksempel hvis dataene lagres i lokale filer) Denne egenskapen har ofte bare en plassholderverdi, for eksempel&lt;navn="navn"&gt; (lokale filer) &lt;/att&gt; .
    * For de fleste datasett er dette grunnlaget for URL-en som brukes til å be om data. For eksempelDAPservere, dette er den URL som .dods, .das, .dds eller .html kan legges til.
    * Sidendatasets.xmler en XML-fil, du må også kode '&', '&lt;', og '&gt;' i URL som '&amp;', '&lt;Og \"&gt;\".
    * For de fleste datasett typer,ERDDAP™Legger til originalensourceUrl  (" lokalkildenUrl" i kildekoden) til[globale attributter](#global-attributes)  (der det blir den "publicSourceUrl" i kildekoden) .. Når datakilden er lokale filer,ERDDAP™legger tilsourceUrl= " (lokale filer) " til de globale attributtene som sikkerhetstiltak. Når datakilden er en database,ERDDAP™legger tilsourceUrl= " (kildedatabase) " til de globale attributtene som sikkerhetstiltak. Hvis noen av datasettene dine bruker ikke-offentligsourceUrl's (Vanligvis fordi datamaskinen er i DMZ eller på en lokal LAN) Du kan bruke [&lt;convertToPublicSourceUrl&gt;] (#converttopublicsourceurl) tagger å angi hvordan du konverterer den lokalesourceUrltil offentligsourceUrlS.
    * AsourceUrlKan begynne medhttp://,https://, ftp://, og kanskje andre prefikser.httpstilkoblinger lese og sjekke kildens digitale sertifikat for å sikre at kilden er hvem de sier de er. I sjeldne tilfeller kan denne sjekken mislykkes med feilen "javax.net.ssl.SSLProtocolException: håndtrykksvarsel: ukjent\\_name". Dette skyldes sannsynligvis domenenavnet på sertifikatet som ikke samsvarer med domenenavnet du bruker. Du kan og bør lese detaljene isourceUrlsertifikat i nettleseren din, spesielt listen over "DNS-navn" i delen "subject Alternative Name".
        
I noen tilfellersourceUrldu bruker kan være et alias av domenenavnet på sertifikatet. For eksempel
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ vil kaste denne feilen, men
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , som bruker domenenavnet på sertifikatet, vil ikke. Løsningen i disse tilfellene er derfor å finne og bruke domenenavnet på sertifikatet. Hvis du ikke finner det på sertifikatet, kontakte dataleverandøren.
        
I andre tilfeller kan domenenavnet på sertifikatet være for en gruppe navn. Hvis dette skjer eller problemet er ellers uløselig, vennligst send en e-post til Chris. John på noaa.gov for å rapportere problemet.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt;addAttributes&gt; ** ] (#addattributes) er en valgbar tag for hvert datasett og for hver variabel som larERDDAPadministratorer kontrollerer metadata-attributtene knyttet til et datasett og dets variabler.
    *   ERDDAP™kombinerer attributtene fra datasettets kilde ("kildeAttributes") ogaddAttributeswhich som du definerer idatasets.xml  (som har prioritet) å gjøre " kombinertAttributes", som er hvaERDDAP™Brukere ser. Derfor kan du brukeaddAttributesfor å omdefinere verdiene til kildeAttributes, legge til nye attributter eller fjerne attributter.
    * Den&lt;addAttributes&gt; etiketter 0 eller mer ** &lt;Att&gt; ** subtags, som brukes til å spesifisere individuelle attributter.
    * Hver attributt består av et navn og en verdi (som har en bestemt datatype, for eksempel dobbelt) ..
    * Det kan bare være én attributt med et gitt navn. Hvis det er mer, har den siste prioritet.
    * Verdien kan være en enkelt verdi eller en romdelt liste over verdier.
    * Syntaks
        * Orden av&lt;Att&gt; subtags iaddAttributesDet er ikke viktig.
        * Den&lt;att&gt; undertekstformat er
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * Navnet på alle attributtene må begynne med bokstav (A-Z, a-z) og må bare inneholde tegnene A-Z, a-z, 0-9, eller \"-_\".
        * Hvis en&lt;at&gt; undertag har ingen verdi eller en verdi av null, den attributten vil bli fjernet fra de kombinerte attributtene.
For eksempel&lt;at name="rows" /&gt; vil fjerne rader fra de kombinerte attributtene.
For eksempel&lt;at name=" Koordinater"&gt; Null&lt;/att&gt; vil fjerne koordinater fra de kombinerte attributtene.
##### attributt Type{#attributetype} 
* [Den valgfrie typeverdien for&lt;Att&gt; undermerker] (#atributetype) angi datatypen for verdiene. Standardtypen er streng. Et eksempel på en streng-attributt er:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Gyldige typer for enkeltverdier er byte (8-bit heltall) , kort (16-bits signert heiltal) , int (32-bits signert heiltal) , lang (64-bits signert heiltal) , flyte (32-bit flytende punkt) , dobbel (64-bit flytende punkt) Char og String. For eksempel
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Se disse notatene om[tegndatatype](#char)..
Se disse notatene om[lang datatype](#long)..
        
    * Gyldige typer for mellomromsseparerte verdilister (eller enkeltverdier) are byteList, shortList, usignertShortList, charList, intList, longList, floatList, dobbel Liste. For eksempel
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
En usignertShortList lar deg angi en liste over usignerte shorts, men de vil bli omgjort til en liste over de tilsvarende Unicode tegnene (f.eks. "65 67 69" vil bli konvertert til "A C E".
Hvis du angir en tegnliste, koder du noen spesielle tegn (f.eks. plass, dobbel sitater, backslash,&lt;#32, eller &gt;#127) som du vil kode dem i datadelen av en NCCSV-fil (f.eks. " " " """""""""\\\\\\\\\\\\ " " " " " "\\n", "u20ac") ..
Det er ingen strengliste. Lagre strengverdier som en flerlinjestreng. For eksempel
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Globale attributter{#global-attributes} 
* [ ** Globale attributter / Global&lt;addAttributes&gt; ** ] (#global-adtributer) --
    &lt;addAttributes&gt; er et valgfritt merket i&lt;datasett&gt; tag som brukes til å endre attributter som gjelder hele datasettet.
    
    *    ** Bruk den globale&lt;addAttributes&gt; å endre datasettets globale attributter. ** ERDDAP™kombinerer de globale attributtene fra datasettets kilde (** sourceAttributes **) og det globale** addAttributes **som du definerer idatasets.xml  (som har prioritet) å gjøre det globale** kombinertAttributes ** som er hvaERDDAP™Brukere ser. Derfor kan du brukeaddAttributesfor å omdefinere verdiene til kildeAttributes, legge til nye attributter eller fjerne attributter.
    * Se [ ** &lt;addAttributes&gt; **Informasjon] (#addattributes) som gjelder globalt og variabelt** &lt;addAttributes&gt; ** ..
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)og[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadata -- Vanligvis,ERDDAP™vil automatisk generere ISO 19115-2/19139 og FGDC (FGDC-STD-001-1998) XML-metadatafiler for hvert datasett som bruker informasjon fra datasettets metadata. Så, **Gode datasett metadata fører til godERDDAP-generert ISO 19115 og FGDC metadata. Vær oppmerksom på å sette mye tid og innsats på å forbedre dine datasetts metadata (noe som er bra å gjøre uansett) ..** De fleste metadataattributter som brukes til å generere ISO 19115 og FGDC-metadata er fra[ACDD metadata standard](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)og er så kjent nedenfor.
    * Mange globale egenskaper er spesielt i detERDDAP™Se etter dem og bruk dem på ulike måter. For eksempel en lenke tilinfoUrler inkludert på nettsider med lister over datasett, og andre steder, slik at brukerne kan finne ut mer om datasettet.
    * Når en bruker velger en undergruppe av data, GlobalAttributes relatert til variabelens lengdegrad, breddegrad, høyde (eller dybde) og tidsintervaller (For eksempel Southernmost\\_Northing, Northmost\\_Northing, tid\\_coverage\\_start, tid\\_coverage\\_end) genereres eller oppdateres automatisk.
    * En enkel prøve global&lt;addAttributes&gt; er:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Den tomme cwhdf-_version-attributten forårsaker kilden cwhdf-_version-attributten (dersom noen) å bli fjernet fra den endelige, kombinerte listen over attributter.
    * Å levere denne informasjonen hjelperERDDAP™gjør en bedre jobb og hjelper brukerne å forstå datasett.
Gode metadata gjør et datasett brukbart.
Utilstrekkelig metadata gjør et datasett ubrukelig.
Ta deg tid til å gjøre en god jobb med metadata-attributter.
##### Spesielle globale egenskaper iERDDAP™
###### Bekreftelse{#acknowledgement} 
*   [ **Bekreftelse** ](#acknowledgement)og **bekjennelse**   (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er en godkjent måte å anerkjenne gruppen eller gruppene som ga støtte på (Særlig økonomisk) For prosjektet som opprettet disse dataene. For eksempel
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Legg merke til at ACDD 1.0 og 1.1 brukte stavebekreftelsen (som er den vanlige stavingen i USA.) , men ACDD 1.3 endret dette til -kunnskap - (som er den vanlige stavingen i Storbritannia.) .. Min forståelse er at endringen i det vesentlige var en ulykke, og at de absolutt ikke gjenkjente konsekvenserne av endringen. For et rot&#33; Nå er det millioner av datafiler rundt om i verden som har " bevissthet" og millioner som har " kunnskap". Dette fremhever tåpeligheten til -simple - endringer i en standard, og understreker behovet for stabilitet i standarder. Fordi ACDD 1.3 (som er den versjonen av ACDD somERDDAP™støtter) «Aknownment» says det er detERDDAP™  (spesielt Generer datasett Xml) oppmuntrer.
     
###### cdm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*   [ **cdm\\_altitude\\_proxy** ](#cdm_altitude_proxy)er bare for EDDTable datasett som ikke har en høyde eller dybde variabel, men har en variabel som er en proxy for høyde eller dybde (For eksempel trykk, sigma, flaske) Du kan bruke denne egenskapen til å identifisere denne variabelen. For eksempel
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Hvis[CDm\\_data\\_type](#cdm_data_type)er Profil eller TrajectoryProfil og det er ingen høyde eller dybde variabel, cdm-_altitude-_proxy må defineres. Hvis cdm\\_altitude\\_proxy er definert,ERDDAP™vil legge til følgende metadata i variabelen: AxisType=høyde og akse=Z.
     
###### CDm\\_data\\_type{#cdm_data_type} 
*   [ **CDm\\_data\\_type** ](#cdm_data_type)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er en global egenskap som indikererUnidata [Vanlig datamodell](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)Datatype for datasettet. For eksempel
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CDM utvikles og kan endres igjen.ERDDAP™Følger relatert og mer detaljert[Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kapittel i[CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatakonvensjoner (Tidligere kalt CF punktobservasjonskonvensjonene) ..
    * Enten datasettets globale[sourceAttributes](#global-attributes)eller dets globale&lt;addAttributes&gt; Må inkludere CDm\\_data\\_type attributt. Noen typer datasett (som EDDTable FraObis) Dette vil settes automatisk.
    * ForEDDGridDatasett, alternativene cdm\\_data__type er Grid (standarden og den aller vanligste typen forEDDGridDatasett) , MovingGrid, Andre, Punkt, Profil, RadialSweep, TimeSeries, TimeSeriesProfil, Swath, Trajectory og TrajectoryProfil. I dag,EDDGridkrever ikke at noen relaterte metadata angis, og det kontrollerer heller ikke at dataene samsvarer med cdm-_data-_typen. Dette vil sannsynligvis endre seg i den nærmeste fremtid.
    * EDDTable bruker cdm\\_data\\_type på en streng måte, etter CFs DSG-spesifikasjon i stedet for CDM, som av en eller annen grunn ikke er oppdatert for å være i samsvar med DSG. Hvis et datasetts metadata ikke er i samsvar medERDDAPCDm\\_data\\_types krav (Se nedenfor) , vil datasettet mislykkes å laste og vil generere en[feilmelding](#troubleshooting-tips).. (Det er en god ting, i den forstand at feilmeldingen vil fortelle deg hva som er galt, slik at du kan fikse det.) Og hvis datasettets data ikke samsvarer med datasettets metadataoppsett (f.eks. dersom det er mer enn én breddegradsverdi for en gitt stasjon i et tidsseriedatasett) Noen forespørsler om data vil returnere feil data i svaret. Så sørg for at du får alt dette riktig.
        
For alle disse datasettene, i konvensjonene ogMetadata\\_Conventionsglobale egenskaper, vennligst se CF-1.6 (ikke CF-1.0, 1.1, 1.2, 1.3, 1.4 eller 1,5) , siden CF-1.6 er den første versjonen som inkluderer endringene relatert til Discrete sampling Geometri (DSG) Konvensjoner.
        *   **ERDDAP™har et ikke-simpelt forhold til CF DSG** 
        *   ERDDAP™kan gjøre et gyldig DSG datasett ut av et kildedatasett som allerede er en gyldig DSG-fil (s) , eller ut av et kildedatasett som ikke er satt opp for DSG, men kan gjøres slik via endringer i metadata (Noen av dem erERDDAP-spesifikt for å gi en mer generell tilnærming til å spesifisere DSG-oppsett) ..
        *   ERDDAP™gjør mange gyldighetsprøver når det laster et datasett. Hvis datasettet som har en cdm\\_data\\_type (ellerfeatureType) attribut vellykket lastes innERDDAP™, såERDDAP™Datasettet oppfyller DSG-kravene (ellers,ERDDAP™vil kaste et unntak som forklarer det første problemet det fant) ..
ADVARSEL: Et vellykket lastet datasett ser ut til å oppfylle DSG-kravene (Den har riktig kombinasjon av attributter) , men likevel kan være feil satt opp, noe som fører til feil resultat i.ncCF og.ncCFMA-responsfiler. (Programvare er smart på noen måter og sporløst i andre.) 
        * Når du ser på datasettets metadata iERDDAP™DSG-datasettet synes å være iERDDAPinternt format (en gigantisk database-lignende tabell) .. Det er ikke i et av DSG-formatene (For eksempel er dimensjonene og metadataene ikke riktige) , men informasjonen som trengs for å behandle datasettet som et DSG-datasett er i metadata (For eksempel cdm\\_data\\_type=TimeSeries og cdm\\_timeseries\\_variables= *aCsvListOfStationRelaterteVariabler* i de globale metadataene og cf\\_role=times-_id for noen variable) ..
        * Hvis en bruker ber om en undergruppe av datasettet i en.ncCF (en.ncfil i DSGs sammenhengende Tagged Array filformat) eller.ncCFMA-fil (a.ncfil i DSGs multidimensjonal Array filformat) , den filen vil være en gyldig CF DSG-fil.
ADVARSEL: Men hvis datasettet ble satt opp feil (For at metadataene ikke skal være sanne) , vil responsfilen være teknisk gyldig, men vil være feil på noen måte.
             
###### EDDTable cdm_data_types
* For EDDTable datasett, cdm\\_data\\_type alternativer (og beslektede krav iERDDAP) er
###### Punkt{#point} 
*   [Punkt](#point)-- er for et sett målinger tatt på urelaterte tidspunkter og steder.
    * Som med alle andre cdm-_data-_typer enn andre, må punktdatasett ha lengdegrad, breddegrad og tidsvariabler.
###### Profil{#profile} 
*   [Profil](#profile)-- er et sett med målinger alle tatt på en gang, på en breddegrad lengdegrad, men på mer enn én dybde (eller høyde) .. Datasettet kan være en samling av disse profilene, for eksempel 7 profiler fra ulike steder. Denne cdm\\_data__typen betyr ikke noen logisk forbindelse mellom noen av profilene.
    
* En av variablene (For eksempel profil\\_nummer) Må ha den variable attributten cf__role=profil\\_id for å identifisere variabelen som unikt identifiserer profilene.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Hvis ingen annen variabel er egnet, bør du vurdere å bruke tidsvariabelen.
###### cdm\\_profil\\_variabler{#cdm_profile_variables} 
* Datasettet må inkludere det globale tilbudet[cdm\\_profil\\_variabler](#cdm_profile_variables), hvor verdien er en kommadelt liste over variabler som har informasjonen om hver profil. For en gitt profil må verdiene til disse variablene være konstante. For eksempel
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Listen må inkludere cf__role=profil\\_id-variabelen og alle andre variabler med informasjon om profilen, og tid, breddegrad og lengdegrad.
Listen vil aldri inkludere høyde, dybde eller observasjonsvariabler.
     

\\[Mening: CDm\\_data\\_type=Profil bør sjelden brukes. I praksis er et gitt datasett vanligvis enten en tidsserieProfil (Profiler i fast posisjon) eller en baneprofil (profiler langs en bane) Derfor bør det identifiseres på riktig måte.\\]  
###### TimeSeries{#timeseries} 
*   [TimeSeries](#timeseries)-- er en rekke målinger (For eksempel sjøvannstemperatur) tatt på én, fast, breddegrad, lengdegrad, dybde (eller høyde) Beliggenhet. (Tenk på det som "Station".) Datasettet kan være en samling av disse tidsserier, f.eks. en sekvens fra hver av 3 forskjellige steder.
    * En av variablene (for eksempel stasjon\\_id) Må ha den variable attributten cf\\_role=timeseries__id for å identifisere variabelen som unikt identifiserer stasjonene.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeserier\\_variables{#cdm_timeseries_variables} 
* Datasettet må inkludere det globale tilbudet[cdm\\_timeserier\\_variables](#cdm_timeseries_variables), der verdien er en kommaseparert liste over variabler som har informasjon om hver stasjon. For en gitt stasjon må verdiene av disse variablene være konstante. For eksempel
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
Listen må inkludere cf-_role=timeseries-_id variabel og alle andre variabler med informasjon om stasjonen, som nesten alltid inkluderer breddegrad og lengdegrad (og høyde eller dybde, hvis tilstede) ..
Listen vil aldri inkludere tid eller noen observasjonsvariabler.
* For enkelte fortøyde bøyer kan et datasett ha to sett bredde- og lengdevariabler:
    1. Ett par breddegrader og lengdegrader som er konstante (dvs. den faste plasseringen av fortøyningen) .. IERDDAP™gi disse variablerdestinationNames av breddegrad og lengdegrad, og inkludere disse variabler i listen over cdm-_timeseries-_variabler.
    2. presis breddegrad og lengdegrad verdier forbundet med hver observasjon. IERDDAP™Gi disse variablene forskjelligdestinationNames (f.eks. presiseLat og presise Lon) og ikke inkludere disse variablene i listen over cdm-_timeseries-_variables.
Begrunnelsen for dette er: fra et teoretisk perspektiv, for en DSG TimeSeries datasett, breddegrad og lengdegrad (og høyde eller dybde, hvis tilstede) Stedet til stasjonen må være konstant.
###### TimeSeriesProfil{#timeseriesprofile} 
*   [TimeSeriesProfil](#timeseriesprofile)-- er for en rekke profiler tatt på én, fast og breddegradslengde plassering. Hver profil er et sett med målinger tatt i flere høyder eller dybder. Datasettet kan være en samling av disse tidsserieprofiler, for eksempel en sekvens av profiler som tas på hver av 12 forskjellige steder.
    * En av variablene (for eksempel stasjon\\_id) Må ha den variable attributten cf\\_role=timeseries__id for å identifisere variabelen som unikt identifiserer stasjonene.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * En av variablene (For eksempel profil\\_nummer) Må ha den variable attributten cf__role=profil\\_id for å identifisere variabelen som unikt identifiserer profilene.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (En gitt profil-_id må bare være unik for en gitt tidsserie-_id.) Hvis ingen annen variabel er egnet, bør du vurdere å bruke tidsvariabelen.
    * Datasettet må inneholde den globaleAttribute cdm-_timeseries-_variables, der verdien er en kommadelt liste over variabler som har informasjonen om hver stasjon. For en gitt stasjon må verdiene av disse variablene være konstante. For eksempel
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
Listen må inneholde cf-_role=timeserie-_id variabel og alle andre variabler med informasjon om stasjonen, som nesten alltid inkluderer breddegrad og lengdegrad.
Listen vil aldri omfatte tid, høyde, dybde eller noen observasjonsvariabler.
    * Datasettet må inkludere den globaleAttribute cdm-_profile-_variables, hvor verdien er en kommaseparert liste over variabler som har informasjonen om hver profil. For en gitt profil må verdiene til disse variablene være konstante. For eksempel
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
Listen må inneholde cf__role=profile\\_id variabel og alle andre variabler med informasjon om profilen, som nesten alltid inkluderer tid.
Listen vil aldri inneholde breddegrad, lengdegrad, høyde, dybde eller observasjonsvariabler.
###### Trajectory{#trajectory} 
*   [Trajectory](#trajectory)-- er en rekke målinger tatt langs en bane (en bane gjennom rom og tid)   (f.eks. hav-_vann-temperatur tatt av et skip som det beveger seg gjennom vannet) .. Datasettet kan være en samling av disse baner, f.eks. en sekvens fra hvert av 4 forskjellige skip.
    * En av variablene (For eksempel skip\\_id) Må ha egenskapen cf-_role=trajectory-_id for å identifisere variabelen som unikt identifiserer banene.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectory\\_variables{#cdm_trajectory_variables} 
* Datasettet må inkludere det globale tilbudet[cdm\\_trajectory\\_variables](#cdm_trajectory_variables)hvor verdien er en kommaseparert liste over variabler som har informasjon om hver bane. For en gitt bane må verdiene til disse variabler være konstante. For eksempel
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Listen må omfatte cf-_role=trajectory-_id variabel og alle andre variabler med informasjon om banen.
Listen vil aldri inneholde tid, breddegrad, lengdegrad eller observasjonsvariabler.
###### TrajectoryProfil{#trajectoryprofile} 
*   [TrajectoryProfil](#trajectoryprofile)-- er en sekvens av profiler tatt langs en bane. Datasettet kan være en samling av disse TrajectoryProfiler, for eksempel en sekvens av profiler tatt av 14 forskjellige skip.
    * En av variablene (For eksempel skip\\_id) Må ha den variable egenskapen cf-_role=trajectory-_id for å identifisere variabelen som unikt identifiserer banene.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * En av variablene (For eksempel profil\\_nummer) Må ha den variable attributten cf__role=profil\\_id for å identifisere variabelen som unikt identifiserer profilene.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (En gitt profil\\_id må bare være unik for en gitt bane\\_id.) Hvis ingen annen variabel er egnet, bør du vurdere å bruke tidsvariabelen.
    * Datasettet må omfatte den globaleAttribute cdm-_trajectory-_variables, der verdien er en kommadelt liste over variabler som har informasjonen om hver bane. For en gitt bane må verdiene til disse variabler være konstante. For eksempel
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Listen må omfatte cf-_role=trajectory-_id variabel og alle andre variabler med informasjon om banen.
Listen vil aldri inneholde profilrelaterte variabler, tid, breddegrad, lengdegrad eller observasjonsvariabler.
    * Datasettet må inkludere den globaleAttribute cdm-_profile-_variables, hvor verdien er en kommaseparert liste over variabler som har informasjonen om hver profil. For en gitt profil må verdiene til disse variablene være konstante. For eksempel
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
Listen må inneholde cf__role=profile\\_id variabel og alle andre variabler med informasjon om profilen, som nesten alltid inkluderer tid, breddegrad og lengdegrad.
Listen vil aldri inkludere høyde, dybde eller observasjonsvariabler.
###### Andre{#other} 
*   [Andre](#other)Ingen krav. Bruk den hvis datasettet ikke passer til et av de andre alternativene, spesielt hvis datasettet ikke inkluderer breddegrad, lengdegrad og tidsvariabler.
     
###### Relaterte notater{#related-notes} 
* Alle EDDTable datasett med en cdm__data\\_type annet enn " Andre" må ha lengdegrad, breddegrad og tidsvariabler.
* Datasett med profiler må ha en høydevariabel, en dybdevariabel eller en[cdm\\_altitude\\_proxy](#cdm_altitude_proxy)Variabel.
* Hvis du ikke kan gjøre et datasett oppfyller alle kravene til den ideelle CDm-_data-_typen, bruk "Point" (som har få krav) eller andre (som ikke har krav) I stedet.
* Denne informasjonen brukes avERDDAP™på ulike måter, for eksempel, men mest for å gjøre.ncCF-filer (.ncfiler som er i samsvar med de sammenhengende taggede Array representasjonene tilknyttet datasettets cdm\\_data\\_type) og.ncCFMA-filer (.ncfiler som er i samsvar med de flerdimensjonale Array representasjonene tilknyttet datasettets cdm-_data-_type) som definert i[Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kapittel i[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatakonvensjoner som tidligere ble kalt "CF Point Observation Conventions".
* Tips: For disse datasettene er riktig innstilling for[subsetVariables](#subsetvariables)er vanligvis kombinasjonen av alle variabler som er oppført i cdm-____variables attributter. For eksempel, for TimeSeriesProfile, bruk cdm-_timeseries-_variables pluss cdm-_profile-_variables.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den ubegrensede måten å identifisere en person, organisasjon eller prosjekt som bidro til dette datasettet (For eksempel den opprinnelige skaperen av dataene, før det ble rebearbeidt av skaperen av dette datasettet) .. For eksempel
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Hvis kontributør ikke virkelig gjelder for et datasett, utelate denne egenskapen. Sammenlignet med[creator\\_name](#creator_name)Dette er noen ganger mer fokusert på finansieringskilden.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den ubestridte måten å identifisere rollen som[contributor\\_name](#creator_name).. For eksempel
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Hvis kontributør ikke virkelig gjelder for et datasett, utelate denne egenskapen.
###### Konvensjoner{#conventions} 
*   [ **Konvensjoner** ](#conventions)  (fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadatastandard) Det er STRONGLYKT. (Det kan være reflektert i fremtiden.) Verdien er en kommadelt liste over metadatastandarder som dette datasettet følger. For eksempel:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
De felles metadatakonvensjonene som brukes iERDDAP™er:
    
    *   [COARDSKonvensjoner](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)Forløperen til CF.
    *   [Klima og prognoser (CF) Konvensjoner](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)er kilden til mange av de anbefalte og nødvendige attributtene iERDDAP.. Den nåværende versjonen av CF er identifisert som "CF-1.6".
    * DenNetCDFAttributkonvensjon for datasett Discovery (ACDD) er kilden til mange av de anbefalte og nødvendige attributtene iERDDAP.. Den originale 1.0 versjonen av ACDD (En strålende stykke arbeid av Ethan Davis) ble identifisert som[UnidataDatasett Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)Nåværende (starter i 2015) 1.3 versjon av ACDD er identifisert som[ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3).. Hvis datasettene dine har bruktUnidataDatasett Discovery v1.0, vi oppfordrer deg til å[bytte datasett til ACDD-1.3](#switch-to-acdd-13)..
    
Hvis datasettet følger noen ytterligere metadatastandard, kan du legge til navnet i CSV-listen i konvensjonsattributten.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (fra[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadatastandard) er den ubesvarte måten å identifisere typen nettdata (iEDDGridDatasett) .. For eksempel
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
De eneste tillatte verdiene er hjelpeinformasjon, bilde, modellResultat, fysisk Måling (standard når ISO 19115 metadata genereres) , kvalitetinformasjon, referanseinformasjon og temaklassifisering. (Ikke bruk denne etiketten for EDDTable-datasett.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den ubegrensede måten å identifisere personen, organisasjonen eller prosjektet på (Hvis ikke en bestemt person eller organisasjon) Mest ansvarlig for opprettelsen (eller siste opparbeiding) av disse dataene. For eksempel
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Hvis dataene i stor grad ble behandlet på nytt (for eksempel satellittdata fra nivå 2 til nivå 3 eller 4) , deretter vanligvis reprosessoren er oppført som skaperen og den opprinnelige skaperen er oppført via[contributor\\_name](#contributor_name).. Sammenlignet med[Prosjekt](#project)Dette er mer fleksibelt, siden det kan identifisere en person, en organisasjon eller et prosjekt.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den ubesvarte måten å identifisere en e-postadresse på (riktig formatert) Dette gir en måte å kontakte skaperen på. For eksempel
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den ubesvarte måten å identifisere en URL for organisasjon som opprettet datasettet, eller en URL med skaperens informasjon om dette datasettet (Men det er mer hensikten med[infoUrl](#infourl)) .. For eksempel
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den ubegrensede måten å identifisere datoen da dataene først ble opprettet (For eksempel behandlet i denne formen) i ISO 8601-format. For eksempel
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Hvis data regelmessig legges til datasettet, er dette den første datoen som de opprinnelige dataene ble gjort tilgjengelige.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den faste måten å identifisere datoen da dataene sist ble endret (For eksempel når en feil ble løst eller når de nyeste dataene ble lagt til) i ISO 8601-format. For eksempel
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den uforutsette måten å identifisere datoen da dataene først ble gjort tilgjengelig for andre, for eksempel i ISO 8601-format 2012-03-15. For eksempel
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
For eksempel kan datasettet ha en[date\\_created](#date_created)i 2010-01-30, men ble kun gjort offentlig tilgjengelig 2010-07-30.date\\_issueder mindre vanlig enndate\\_createdogdate\\_modified.. Hvisdate\\_issueder utelatt, det antas å være det samme somdate\\_created..
###### globaldrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)-- Dette er en OPTIONAL global attributt som brukes avERDDAP™  (Ingen metadatastandarder) som angir standardverdien for "Draw Land Mask" alternativet på datasettets Make A Graph-skjema ( *datasetID* .graph) og for &.land parameteren i en URL som ber om et kart over dataene. For eksempel
    ```
    <att name="drawLandMask">over</att>  
    ```
Se[drawLandMaskOversikt](#drawlandmask)..
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadatastandard) Er iGnored og/eller rePLACED. Hvis datasettets[CDm\\_data\\_type](#cdm_data_type)er passende,ERDDAP™vil automatisk bruke den til å opprette enfeatureTypeAttribut. Så det er ikke nødvendig å legge til det.
    
Hvis du bruker[EDDTableFraNcCFFiler](#eddtablefromnccffiles)å opprette et datasett fra filer som følger[CF Diskret prøvetakingsgeometri (DSG) standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Selve filene må hafeatureTypekorrekt definert, slik atERDDAP™kan lese filene riktig. Det er en del av CF DSG-kravene til den typen fil.
     
###### historie{#history} 
*   [ **historie** ](#history)  (fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) er en flerlinjet streng global attributt med en linje for hvert behandlingstrinn som dataene har gjennomgått. For eksempel
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Ideelt sett har hver linje en ISO 8601:2004 (E) formatert dato+timeZ (For eksempel, 2011-08-05T08:55:02Z) etterfulgt av en beskrivelse av behandlingstrinnet.
    *   ERDDAP™Dette skjer om det ikke allerede eksisterer.
    * Hvis det allerede eksisterer,ERDDAP™vil legge til ny informasjon til den eksisterende informasjonen.
    * Historien er viktig fordi den gjør det mulig for klienter å backtrack til den opprinnelige kilden til dataene.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)er en REQUIRED global attributt med URL til en nettside med mer informasjon om dette datasettet (Vanligvis på kildeinstitusjonens hjemmeside) .. For eksempel
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Enten datasettets globale[sourceAttributes](#global-attributes)eller dets globale&lt;addAttributes&gt; Må inkludere denne egenskapen.
    *   infoUrler viktig fordi det gjør det mulig for kunder å finne ut mer om data fra den opprinnelige kilden.
    *   ERDDAP™Viser en lenke tilinfoUrlpå datasettets datatilgangsskjema ( *datasetID* .html) , Lag en graf nettside ( *datasetID* .graph) Andre nettsider.
    * Hvis URL-en har en spørringsdel (etter) Det må allerede være[prosent kodet](https://en.wikipedia.org/wiki/Percent-encoding).. Du må kode spesielle tegn i begrensningene (annet enn den opprinnelige \"&\" og den viktigste'='Hvis noen) inn i formen %HH, hvor HH er den 2-siffers heksadesimale verdien av tegnet. Vanligvis trenger du bare å konvertere noen av tegntegnene: % til %25, og til %26, " til %22,&lt;i% 3C, = i% 3D, &gt; i% 3E, + i% 2B,|til %7C,\\[til %5B,\\]til %5D, mellomrom til %20, og konvertere alle tegn over #127 til deres UTF-8-form og deretter prosent kode hver byte av UTF-8-formen til %H-format (spør en programmerer om hjelp) ..
For eksempel, &stationID&gt;=-41004"
blir &stationID%3E=%2241004%22
Prosent koding er vanligvis nødvendig når du får tilgang tilERDDAPvia annen programvare enn en nettleser. Browsere håndterer vanligvis prosent koding for deg.
I noen situasjoner, må du prosent kode alle andre tegn enn A-Za-z0-9-_-&#33;. ~ \" () \\*, men likevel ikke kode den opprinnelige '&' eller den viktigste'='..
Programmeringsspråk har verktøy for å gjøre dette (for eksempel seJava's[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
ogJavaScripts [encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) og det er
        [nettsteder som prosent kode/kode for deg](https://www.url-encode-decode.com/)..
    * Sidendatasets.xmler en XML-fil, du må også & kode ALL '&', '&lt;', og '&gt;' i URL som '&amp;', '&lt;', og '&gt;' etter prosent koding.
    *   infoUrlDet er unikt åERDDAP.. Det er ikke fra noen metadatastandard.
###### institusjon{#institution} 
*   [ **institusjon** ](#institution)  (fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) er en REQUIRED global attributt med den korte versjonen av navnet på institusjonen som er kilden til disse dataene (vanligvis et akronym, vanligvis&lt;20 tegn). For eksempel
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Enten datasettets globale[sourceAttributes](#global-attributes)eller dets globale&lt;addAttributes&gt; Må inkludere denne egenskapen.
    *   ERDDAP™Viser institusjonen når den viser en liste over datasett. Hvis institusjonens navn her er lengre enn 20 tegn, vil bare de første 20 tegnene være synlige i listen over datasett (men hele institusjonen kan ses ved å sette musemarkøren over tilstøtende --ikonet) ..
    * Hvis du legger til institusjon i listen over&lt;categoryAttributes&gt; iERDDAP's[config.xml](/docs/server-admin/deploy-install#setupxml)fil, brukere kan enkelt finne datasett fra samme institusjon viaERDDAPSøk etter datasett etter kategori" på hjemmesiden.
###### Nøkkelord{#keywords} 
*   [ **Nøkkelord** ](#keywords)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er en gjengitt kommadelt liste over ord og korte fraser (For eksempel[GCDD Science Nøkkelord](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) som beskriver datasettet på generell vis, og ikke antar annen kunnskap om datasettet (For eksempel for oseanografiske data, inkluderer hav) .. For eksempel
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Sidendatasets.xmler et XML- dokument, tegnene og&lt;, og &gt; i en egenskap som nøkkelord (For eksempel nøkkelordene &gt; tegnene i GCMD vitenskap) må kodes som &amp;,&lt;, og &gt;, henholdsvis.
Når et datasett lastes innERDDAP,
    
    *  " Earth Science &gt;  " er lagt til starten på alle GCMD søkeord som mangler det.
    * GCMD søkeord konverteres til Tittel Case (De første bokstavene er kapitalisert) ..
    * Nøkkelordene er omorganisert i sortert rekkefølge og alle nylinjetegn fjernes.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er en ubesvart attributt: Hvis du følger en retningslinje for ord/fraser i nøkkelordattributten din (For eksempel GCMD Science Nøkkelord) Legg navnet på denne retningslinjen her. For eksempel
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### lisens{#license} 
*   [ **lisens** ](#license)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er en STRONGLY REQUED global attributt med lisens- og/eller bruksbegrensninger. For eksempel
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Hvis\\[standard\\]" oppstår i attributtverdien, det vil bli erstattet av standardenERDDAP™lisens fra&lt;standardLicense&gt; tag inERDDAP's
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fil.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)er fra de utdaterte[ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (som ble identifisert iMetadata\\_Conventionssom-UnidataDatasett Discovery v1.0") metadatastandard. Attributverdien var en kommadelt liste over metadatakonvensjoner som ble brukt av dette datasettet.
Hvis et datasett bruker ACDD 1.0, er denne attributten STRONGLY KJØPET for eksempel,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
MenERDDAP™Nå anbefaler ACDD-1.3. Hvis du har[byttet datasett til ACDD-1.3](#switch-to-acdd-13)bruk avMetadata\\_Conventionser STRONGLY DISCOURAGED: bare bruk [&lt;Konvensjoner&gt;] (#Conventions) I stedet.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er en tekstbeskrivelse av behandlingen (For eksempel[NASAs databehandlingsnivå](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels)For eksempel nivå 3) kvalitetskontrollnivå (For eksempel vitenskapskvalitet) av dataene. For eksempel
    ```
    <att name="processing\\_level">3</att>  
    ```
###### Prosjekt{#project} 
*   [ **Prosjekt** ](#project)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er en valgfri egenskap for å identifisere prosjektet som datasettet er en del av. For eksempel
    ```
    <att name="project">GTSPP</att>  
    ```
Hvis datasettet ikke er en del av et prosjekt, ikke bruk denne egenskapen. Sammenlignet med[creator\\_name](#creator_name)Dette er fokusert på prosjektet (ikke en person eller en organisasjon som kan være involvert i flere prosjekter) ..
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den ubegrensede måten å identifisere personen, organisasjonen eller prosjektet som publiserer dette datasettet. For eksempel
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
For eksempel er du utgiver hvis en annen person eller gruppe[opprettet](#creator_name)Datasettet og du er bare å reservere det viaERDDAP.. Hvis publisher ikke virkelig gjelder et datasett, utelate denne attributten. Sammenlignet med[creator\\_name](#creator_name), utgiveren sannsynligvis ikke betydelig endret eller rebehandle dataene; utgiveren bare gjør dataene tilgjengelige på et nytt sted.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den ubesvarte måten å identifisere en e-postadresse på (riktig formatert, for eksempel john\\_smith@grand.org) Dette gir en måte å kontakte utgiveren på. For eksempel
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Hvis publisher ikke virkelig gjelder et datasett, utelate denne attributten.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er den ubesvarte måten å identifisere en URL for organisasjonen som publiserte datasettet, eller en URL med utgiverens informasjon om dette datasettet (Men det er mer hensikten med[infoUrl](#infourl)) .. For eksempel
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Hvis publisher ikke virkelig gjelder et datasett, utelate denne attributten.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)er en global streng attributt (Ikke fra noen standard) Viser om dette er en sanntidsdatasett. For eksempel
    ```
    <att name="real\\_time">true</att>  
    ```
Hvis dette er falskt (standard) ,ERDDAP™vil cache svar på forespørsler om filtyper der hele filen må opprettes førERDDAP™kan begynne å sende svaret til brukeren og gjenbruke dem i opptil ca 15 minutter (f.eks..nc.png) ..
Hvis dette er sant,ERDDAP™vil aldri lagre responsfilene og vil alltid returnere nyopprettede filer.
###### sourceUrlattributt{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)er en global attributt med URL-adressen til datakilden. For eksempel
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (Legg alt på én linje) 
    *   ERDDAP™vanligvis oppretter denne globale egenskapen automatisk. To unntak er EDDTableFromHyraxFiler og EDDTableFraThreddsFiles.
    * Hvis kilden er lokale filer og filene ble opprettet av organisasjonen din, bruk
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Hvis kilden er lokal database og dataene ble opprettet av organisasjonen din, bruk
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrler viktig fordi det gjør det mulig for klienter å backtrack til den opprinnelige kilden til dataene.
    *   sourceUrlDet er unikt åERDDAP.. Det er ikke fra noen metadatastandard.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) er en ubegrenset attributt for å identifisere navnet på det kontrollerte ordforrådet som variabelen fra[standard\\_name](#standard_name)S er tatt. For eksempel
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
For versjon 77 av[CF standard navn tabell](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html)..
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (kun for EDDTable-datasett) er en ubegrenset global attributt som lar deg angi en kommadelt liste av [&lt;dataVariable&gt;] (#datavariable)  [destinationName](#destinationname)s å identifisere variabler som har et begrenset antall verdier (angitt på en annen måte: Variabler som hver av verdiene har mange dupliserer) .. For eksempel
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Hvis denne egenskapen er til stede, vil datasettet ha en *datasetID* .subset nettside (og en lenke til det på hver datasettliste) som lar brukerne raskt og enkelt velge ulike undergrupper av dataene.
    * Hver gang et datasett lastes,ERDDAPlaster og lagrer på disk et bord med alle de forskjellige () kombinasjoner av underdelen Variabelens verdier.ERDDAP™kan lese detsubsetVariablesbord og behandle det veldig raskt (spesielt sammenlignet med å lese mange datafiler eller å få data fra en database eller annen ekstern tjeneste) ..
    * Det tillaterERDDAP™Å gjøre 3 ting:
        1. Det tillaterERDDAP™å sette en liste over mulige verdier i en nedtrekksliste på Data Access-skjemaet, Make A Graph-nettsiden og .subset-nettsidene.
        2. Det tillaterERDDAP™å tilby en .subset nettside for det datasettet. Denne siden er interessant fordi det gjør det enkelt å finne gyldige kombinasjoner av verdiene til disse variablene, som for noen datasett og noen variabler er svært, svært vanskelig (nesten umulig) .. Alle brukerforespørsler om distinkt () undergruppe Variable data vil være veldig raske.
        3. Hvis det er en brukerforespørsel som bare refererer til en undergruppe av disse variabler,ERDDAP™Kan raskt lesesubsetVariablestabell og svar på forespørselen. Dette kan spare mye tid og innsats forERDDAP..
    * Orden avdestinationNamedu angir bestemmer sorteringsordenen på *datasetID* .subset nettside, så du vil vanligvis angi de viktigste variablene først, så det minste viktig. For eksempel, for datasett med tidsseriedata for flere stasjoner, kan du for eksempel bruke,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
slik at verdiene sorteres etter stasjon -_id.
    * Det er selvfølgelig ditt valg som variabler å inkludere isubsetVariablesListe, men den foreslåtte bruken er:
        
Generelt inkluderer variabler som du vil haERDDAP™å vise en rullegardinliste over alternativer i datasettets datatilgangsskjema (.html) og Make-A-Graph (.graph) nettsider.
        
Generelt, inkludere variabler med informasjon om datasettets funksjoner (stasjoner, profiler og/eller baner, spesielt fra[cdm\\_timeserier\\_variables](#cdm_timeseries_variables),[cdm\\_profil\\_variabler](#cdm_profile_variables),[cdm\\_trajectory\\_variables](#cdm_trajectory_variables)) .. Det er bare noen få forskjellige verdier for disse variablene slik at de fungerer godt med nedtrekkslister.
        
Ikke inkludere noen datavariabler knyttet til individuelle observasjoner (f.eks. tid, temperatur, saltholdighet, strømhastighet) isubsetVariablesListe. Det er for mange forskjellige verdier for disse variablene, så en nedtrekksliste vil være langsom å laste og være vanskelig å jobbe med (eller ikke arbeid) ..
        
    * Hvis antall forskjellige kombinasjoner av disse variabler er større enn ca. 1.000.000, bør du vurdere å begrensesubsetVariablessom du angir for å redusere antall forskjellige kombinasjoner til under 1.000.000; ellers *datasetID* .subset websider kan genereres sakte. I ekstreme tilfeller kan datasettet ikke lastes innERDDAP™Fordi å generere listen over forskjellige kombinasjoner bruker for mye minne. I så fall må du fjerne noen variabler frasubsetVariablesListe.
    * Hvis antallet forskjellige verdier for en undergruppevariabel er større enn ca. 20 000, bør du ikke vurdere å inkludere den variabelen i listen oversubsetVariablesEllers tar det lang tid å overføre *datasetID* .subset, *datasetID* .graf, og *datasetID* .html nettsider. Også på en Mac er det svært vanskelig å gjøre utvalg fra en nedtrekksliste med mer enn 500 elementer på grunn av mangelen på en rullelinje. Et kompromiss er: Fjern variabler fra listen når brukerne ikke er sannsynlig å velge verdier fra en nedtrekksliste.
    * Du bør teste hvert datasett for å se omsubsetVariablesInnstillingen er ok. Hvis kildedataserveren er langsom og det tar for lang tid (eller mislykkes) å laste ned dataene, enten redusere antall variabler angitt eller fjernesubsetVariablesglobal attributt.
    * Undersett Variabler er svært nyttige. Så hvis datasettet ditt er egnet, vennligst lag ensubsetVariablesattributt.
    * EDDTableFraSOSLegger automatisk til
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
Når datasettet opprettes.
        * Mulig advarsel: hvis en bruker som bruker *datasetID* .subset-websiden velger en verdi som har en vogn Return eller nylinjetegn, *datasetID* .subset vil mislykkes.ERDDAP™kan ikke jobbe med dette problemet på grunn av noen HTML detaljer. I alle fall er det nesten alltid en god ide å fjerne vognen tilbake og nylinje tegn fra dataene. For å hjelpe deg å løse problemet, hvis EDDTable.subsetVariablesDatatabell metode iERDDAPoppdager dataverdier som vil forårsake problemer, vil det sende en advarsel med en liste over fornærmende verdier til e-posten Alt Til e-postadresser angitt i config.xml. På den måten vet du hva som må fikses.
        *    **Forhåndsgenererte undergrupper.** Vanligvis nårERDDAP™laster et datasett, det krever det forskjellige () undergruppevariabler data tabell fra datakilden, bare via en normal dataforespørsel. I noen tilfeller er disse dataene ikke tilgjengelige fra datakilden eller hente fra datakilden kan være vanskelig på datakildeserveren. I så fall kan du gi en tabell med informasjonen i en.jsoneller .csv-fil med navnet *tomcat* /innhold/erddap/subset/ *datasetID* .json  (eller csv) .. Hvis tilstede,ERDDAP™vil lese den en gang når datasettet er lastet og bruke den som kilde til undergruppedata.
            * Hvis det er en feil under lesing av den, vil datasettet ikke kunne lastes.
            * Det må ha samme kolonnenavn (For eksempel samme tilfelle) som&lt;subsetVariables&gt;, men kolonnene kan være i enhver rekkefølge.
            * Det kan ha ekstra kolonner (de vil bli fjernet og nylig overflødige rader vil bli fjernet) ..
            * Manglende verdier bør mangle verdier (ikke falske tall som -99) ..
            *   .jsonfiler kan være litt vanskeligere å lage, men håndtere Unicode tegn godt..jsonFiler er enkle å opprette hvis du oppretter dem medERDDAP..
            * .csv-filer er enkle å jobbe med, men kun egnet for ISO 8859-1 tegn. .csv-filer må ha kolonnenavn på første rad og data på følgende rader.
        * For store datasett eller når&lt;subsetVariables&gt; er feilaktig, tabellen over kombinasjoner av verdier kan være stor nok til å forårsake for mye data eller OutOfMemory feil. Løsningen er å fjerne variabler fra listen over&lt;subsetVariables&gt; som det er et stort antall verdier for, eller fjerne variabler etter behov til størrelsen på tabellen er rimelig. Uansett feil, deler avERDDAP™som brukersubsetVariablesSystemet fungerer ikke bra (For eksempel lastes nettsider svært sakte) Når det er for mange rader (For eksempel mer enn en million) i tabellen.
        *   subsetVariableshar ingenting å gjøre med å spesifisere hvilke variabler brukere kan bruke i begrensninger, dvs. hvordan brukerne kan be om undergrupper av datasettet.ERDDAP™alltid tillater begrensninger å referere til noen av variablene.
###### Tidsenheter{#time-units} 
[Tid og tid](#time-units)kolonnene skal ha ISO 8601:2004 (E) Formatert dato+tid Z-strenger (For eksempel, 1985-01-31T15:31:00Z) ..
             
###### sammendrag{#summary} 
*   [ **sammendrag** ](#summary)  (fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) er en REQUIRED global attributt med en lang beskrivelse av datasettet (vanligvis&lt;500 tegn). For eksempel
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Enten datasettets globale[sourceAttributes](#global-attributes)eller dets globale&lt;addAttributes&gt; Må inkludere denne egenskapen.
    * sammendrag er svært viktig fordi det gjør det mulig for klienter å lese en beskrivelse av datasettet som har mer informasjon enn tittelen og dermed raskt forstå hva datasettet er.
    * Råd: Vennligst skriv sammendraget slik at det vil fungere for å beskrive datasettet til en tilfeldig person du møter på gaten eller til en kollega. Husk å inkludere[Fem W og en H](https://en.wikipedia.org/wiki/Five_Ws)Hvem har laget datasettet? Hvilke opplysninger ble samlet? Når ble dataene samlet? Hvor ble den samlet? Hvorfor ble den samlet? Hvordan ble det samlet?
    *   ERDDAP™Viser sammendraget i datasettets dataakseskjema ( *datasetID* .html) , Lag en graf nettside ( *datasetID* .graph) Andre nettsider.ERDDAP™bruker sammendraget når du oppretter FGDC og ISO 19115 dokumenter.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (et valgfrittERDDAP-spesifisert global metadataattributt, ikke fra noen standard) angir, på en forenklet måte, når dataene for et datasett i nær virkelighet anses som utdatert, angitt somnow- *n Enheter* For eksempel:now-2 dager for data som vanligvis vises 24-48 timer etter tidsverdien. For prognosedata, bruk nå **+**  *n Enheter* For eksempel, nå +6 dager for prognoser som er, i det meste, 8 dager i fremtiden. (Se[now- *n Enheter* Syntaksbeskrivelse](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)..) Hvis den maksimale tidsverdien for datasettet er nyere enn den angitte tiden, anses datasettet som oppdatert. Hvis den maksimale tidsverdien er eldre enn den angitte tiden, anses datasettet som oppdatert. For utdaterte datasett er det sannsynligvis et problem med datakilden, såERDDAP™Kunne ikke få tilgang til data fra nyere tidspunkt.
    
DentestOutOfDateverdi vises som en kolonne i[allDatasetsDatasett](#eddtablefromalldatasets)i dinERDDAP.. Den brukes også til å beregne OutOfDate-indeksen, som er en annen kolonne iallDatasets- Datasett.
Hvis indeksen er&lt;1. datasettet anses oppdatert.
Hvis indeksen er&lt;=1, datasettet anses utdatert.
Hvis indeksen er&lt;=2, datasettet anses svært utdatert.
    
DentestOutOfDateVerdien brukes også avERDDAP™å generere https://*yourDomain*/erddap/outOfDateDatasets.html Nettside ([eksempel](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) som viser datasettene som har&lt;testOutOfDate&gt; tagger, med datasett rangert etter hvor utdatert de er. Hvis du endrer filtypen (fra .html til .csv,.jsonlCSV,.nc,.tsv...) , kan du få den informasjonen i ulike filformater.
    
Når det er mulig,[Generer DatasetsXml](#generatedatasetsxml)Legger til entestOutOfDatetil den globaleaddAttributesav et datasett. Denne verdien er et forslag basert på informasjonen som er tilgjengelig for CreateDatasetsXml. Hvis verdien ikke er riktig, endre den.
    
"Uten dato" her er svært forskjellig fra [&lt;Last på nytt EveryNMinutes&gt;] (#reloadvarelser) , som omhandler hvor oppdatertERDDAPkunnskap om datasettet er. Den&lt;testOutOfDate&gt; systemet antar detERDDAPInformasjonen om datasettet er oppdatert. Spørsmålet&lt;testOutOfDate&gt; Handel med er: ser det ut til å være noe galt med kilden til dataene, noe som forårsaker at nyere data ikke er tilgjengelige avERDDAP?
    
###### tittel{#title} 
*   [ **tittel** ](#title)  (fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) er en REQUIRED global attributt med kort beskrivelse av datasettet (vanligvis&lt;=95 tegn). For eksempel
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Enten datasettets globale[sourceAttributes](#global-attributes)eller dets globale&lt;addAttributes&gt; Må inkludere denne egenskapen.
    * tittel er viktig fordi hver liste over datasett presentert avERDDAP  (Andre enn søkeresultater) lister datasett i alfabetisk rekkefølge, etter tittel. Så hvis du vil angi rekkefølgen av datasett, eller har noen datasett gruppert sammen, må du opprette titler med det i tankene. Mange lister over datasett (For eksempel som svar på et kategorisøk) Vis en undergruppe av hele listen og i en annen rekkefølge. Så tittelen for hvert datasett skal stå på egen hånd.
    * Hvis tittelen inneholder ordet " (alle bokstaver) Da får datasettet en lavere rangering i søk.
             
##### &lt;axisVariable&gt;{#axisvariable} 
* [ ** &lt;axisVariable&gt; ** ] (#aksevariabel) brukes til å beskrive en dimensjon (Også kalt "akse") ..
ForEDDGridDatasett, ett eller flereaxisVariableTags er REQUIRED, og alle[dataVariables](#datavariable)Del/bruk alltid alle aksevariabler. ([Hvorfor?](#why-just-two-basic-data-structures) [Hva om de ikke gjør det?](#dimensions))   
Det må være en aksevariabel for hver dimensjon av datavariabler.
Akselvariabler må spesifiseres i den rekkefølgen datavariabler bruker dem.
(EDDTable datasett kan ikke bruke&lt;axisVariable&gt; tags.)
Et kjøttet eksempel er:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; støtter følgende undertekster:
###### &lt;sourceName\\&gt;{#sourcename} 
* [&lt;sourceName\\&gt;] (#kildenavn) - Datakildens navn på variabelen. Dette er navnet somERDDAP™vil bruke når du ber data fra datakilden. Dette er navnet somERDDAP™vil se etter når data returneres fra datakilden. Dette er sensitivt. Dette er reQUIRED.
###### &lt;destinationName\\&gt;{#destinationname} 
* [&lt;destinationName\\&gt;] (#destinasjonsnavn) er navnet på variabelen som vil bli vist og brukt avERDDAP™brukere.
    * Dette er valgfritt. Hvis fraværende,sourceNameer brukt.
    * Dette er nyttig fordi det lar deg endre en kryptisk eller merkeligsourceName..
    *   destinationNameer tilfelle følsom.
    *   destinationNameS må begynne med et brev (A-Z, a-z) og må følges av 0 eller flere tegn (A-Z, a-z, 0-9 og \\_) .. («-» ble tillatt førERDDAP™versjon 1.10.) Denne begrensningen tillater aksevariable navn å være de samme iERDDAP™i responsfilene og i all programvare der disse filene vil bli brukt, inkludert programmeringsspråk (somPython,Matlab, ogJavaSkript) der det finnes lignende begrensninger på variabelnavn.
    * IEDDGriddatasett,[lengdegrad, breddegrad, høyde, dybde og tid](#destinationname)aksevariabler er spesielle.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt;addAttributes&gt;] (#variable-addisjoner) definerer et valgfritt sett av attributter ( *Navn* = *verdi* ) som legges til kildeens attributter for en variabel, for å gjøre kombinerte attributter for en variabel.
Hvis variabelen er[sourceAttributes](#variable-addattributes)eller&lt;addAttributes&gt; Inkluderer[scale\\_factorog/elleradd\\_offset](#scale_factor)attributter, deres verdier vil bli brukt til å pakke ut data fra kilden før distribusjon til klienten
     (resultat Verdi = kilde Verdi \\*scale\\_factor+add\\_offset) .. Den upakkede variabelen vil være av samme type data (For eksempel flyte) somscale\\_factorogadd\\_offsetverdier.
         
##### &lt;dataVariable&gt;{#datavariable} 
* [ ** &lt;dataVariable&gt; ** ] (#datavariable) Er en reQUIRED (For nesten alle datasett) Merke i&lt;datasett&gt; tag som brukes til å beskrive en datavariabel. Det må være 1 eller flere tilfeller av denne etiketten. Et kjøttet eksempel er:

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

&lt;dataVariable&gt; støtter følgende undertekster:
###### &lt;sourceName&gt;{#sourcename-1} 
* [&lt;sourceName&gt;] (#kildenavn) - Datakildens navn på variabelen. Dette er navnet somERDDAP™vil bruke når du ber data fra datakilden. Dette er navnet somERDDAP™vil se etter når data returneres fra datakilden. Dette er sensitivt. Dette er reQUIRED.
###### grupper{#groups} 
CF la til støtte for grupper med CF v1.8. Starter i ~2020,NetCDFverktøy støtte å sette variabler i grupper i en.ncfil. I praksis betyr dette bare at variablene har et langt navn som identifiserer gruppen (s) og variabelnavnet, for eksempel gruppe1a/gruppe2c/varName .ERDDAP™støtter grupper ved å konvertere "/" er i variabelens&lt;sourceName&gt; til "__" er i variabelen&lt;destinationName&gt;, for eksempel gruppe1a\\_group2c\\_varName . (Når du ser det, bør du innse at grupper ikke er mye mer enn et syntaksmøte.) Når variabler er oppført iERDDAP™Alle variabler i en gruppe vil vises sammen og etterlikne den underliggende gruppe.\\[HvisERDDAP™, spesielt Generere datasett Xml, fungerer ikke så vel som det kan med kildefiler som har grupper, vennligst send en prøvefil til Chris. John på noaa.gov.\\]

EDDTableFromFiles datasett kan bruke noen spesialkodet, pseudosourceNamefor å definere nye datavariabler, f.eks. for å fremme en global attributt som er en datavariabel. Se[denne dokumentasjonen](#pseudo-sourcenames)..
###### HDFStrukturer{#hdf-structures} 
Begynner medERDDAP™v2.12,EDDGridFra NcFiles ogEDDGridFraNcFiles Upakket kan lese data fra "strukturer" i.nc4 og.hdf4 filer. For å identifisere en variabel som er fra en struktur,&lt;sourceName&gt; Må bruke formatet: *FullstrekningName* | *medlemName* , for eksempel gruppe1/myStruct|Min medlem.

###### Fast verdikildeNames{#fixed-value-sourcenames} 
I et EDDTable datasett, hvis du vil opprette en variabel (med en enkelt fast verdi) Dette er ikke i kildedatasettet, bruk:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Det opprinnelige tegnet fortellerERDDAP™som en fast Verdi vil følge.

* For numeriske variabler må den faste verdien være en enkelt finittverdi eller NaN (tilfelle ufølsom, f.eks.) ..
* For strengvariabler må den faste verdien være enkelt,[JSON-stil streng](https://www.json.org/json-en.html)  (med spesielle tegn rømt med \\ tegn) , f.eks.  \\=="""""""" \\ \\ \\
* For en tidsstempelvariabel angir du den faste verdien som et tall i"seconds since 1970-01-01T00:00:00Z"og bruk
enhet=sekund siden 1970-01-01T00:00:00Z .
    
De andre taggene til&lt;dataVariableArbeid som om dette var en vanlig variabel.
For eksempel å skape en variabel kalt høyde med en fast verdi på 0,0 (flyte) Bruk:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

For uvanlige situasjoner kan du til og med angi enactual\\_rangeAddAttribute, som vil overstyre de forventede verdiene til destinasjonMin og destinasjonMax (som ellers vil være lik den faste Verdi) ..
 
###### SkriptkildeNames/Derived Variabler{#script-sourcenamesderived-variables} 
Begynner medERDDAP™v2.10, i en[EDDTableFra Filer](#eddtablefromfiles),[EDDTableFraDatabase](#eddtablefromdatabase), eller[EDDTableFromFileNames](#eddtablefromfilenames)Datasett,&lt;sourceName&gt; kan være
Et uttrykk (en ligning som evalueres til en enkelt verdi) , å bruke formatet
```
    <sourceName>=*expression*</sourceName>  
```
eller et skript (En rekke uttalelser som returnerer en enkelt verdi) , å bruke formatet
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™avhengig av[Apache-prosjektets](https://www.apache.org/) [JavaUttrykksspråk (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (lisens:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) å evaluere uttrykkene og kjøre skriptene.
Beregningen for en gitt ny variabel gjøres innen én rad av resultatene, gjentatte ganger for alle rader.
Uttrykkene og skriptene bruker enJava- ogJavaScript-like syntaks og kan bruke noen av
[Operatører og metoder som er bygget inn i JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html)..
Manusene kan også bruke metoder (funksjoner) fra disse klassene:
*   [Kalender2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), som er en innpakning for noen av de statiske, tids- og kalenderrelaterte metodene i com.cohort.util.Calendar2 ([lisens](/acknowledgements#cohort-software)) .. For eksempel
Calendar2.parseToEpochSeconds ( *kildetid, dato Tidsformat* ) vil tolke kilden Tidsstreng via datoenTimeFormat-strengen og returnere en"seconds since 1970-01-01T00:00:00Z"  (epokesekunder) dobbel verdi.
*   [Math](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), som er en wrapper for nesten alle de statiske, matematisk-relaterte metoder i[Java.lang. Math](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html).. For eksempel Math.atan2 ( *y, x* ) tar i rektangulære koordinater (y, x) og returnere polare koordinater (En rekke dobbler med\\[r, theta\\]) ..
*   [Math2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), som er en wrapper for nesten alle de statiske, matterelaterte metoder i com.cohort.util. Math2 ([lisens](/acknowledgements#cohort-software)) .. For eksempel
Math2.roundTo ( *d, nPlaces* ) vil avrunde d til det angitte antall siffer til høyre for desimalpunktet.
* String, som gir deg tilgang til alle statiske, strengrelaterte metoder i[Java.lang. Streng](https://docs.oracle.com/javase/8/docs/api/java/lang/String).. String objekter iERDDAP™uttrykk og skript kan bruke noen av sine tilknyttedeJavametoder, som beskrevet i java.lang. Strengdokumentasjon. For eksempel String.valueOf (d) vil konvertere dobbelverdi d til en streng (Selv om du også kan bruke "+d) ..
*   [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), som er en wrapper for de fleste av de statiske, Streng- og rekkerelaterte metoder i com.cohort.util.String2 ([lisens](/acknowledgements#cohort-software)) .. For eksempel String2.zeroPad ( *nummer, nDigits* ) vil legge til 0 til venstre for tallstrengen slik at det totale antall siffer er nDigits (f.eks. String2.zeroPad ("6", 2) kommer tilbake "06") ..
*   [rad](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), som har ikke-statiske metoder for å få tilgang til dataene fra de ulike søylene i gjeldende rad i kildedatatabellen. For eksempel rad.kolonneString ( " år") leser verdien fra kolonnen " år" som en streng, mens rad.kolonne Int ( " år") Leser verdien fra "året" kolonne som et heltall.

Av sikkerhetsgrunner kan uttrykk og skript ikke bruke andre klasser enn de 6.ERDDAP™håndhever denne begrensningen ved å opprette en standard svartliste (hvilken svartliste alle klasser) Så en hvitliste (som spesielt tillater 6 klasser beskrevet ovenfor) .. Hvis du trenger andre metoder og/eller andre klasser for å gjøre arbeidet ditt, vennligst send dine forespørsler til Chris. John på noaa.gov.
    
###### Effektivitet
For EDDTableFromFiles datasett er det bare en veldig, svært minimal (sannsynligvis ikke merkbar) Nedsettelse for forespørsler om data fra disse variabler. For EDDTableFromDatabase, det er enorm hastighetsstraff for forespørsler som inkluderer begrensninger på disse variabler (f.eks. (&longitude0360&gt;30&longitude0360&lt;40) fordi begrensningene ikke kan overføres til databasen, så databasen må returnere mye mer data tilERDDAP™  (som er svært tidkrevende) slik atERDDAP™kan opprette den nye variabelen og bruke begrensningen. Å unngå det verste tilfellet (der det ikke er noen begrensninger som overføres til databasen) ,ERDDAP™kaster en feilmelding slik at databasen ikke trenger å returnere hele innholdet i tabellen. (Hvis du vil omgå dette, legger du til en begrensning i en ikke-script kolonne som alltid vil være sant, for eksempel, og tid&lt;3000-01-01.) Av denne grunn, med EDDTableFromDatabase, er det sannsynligvis alltid bedre å opprette en avledet kolonne i databasen i stedet for å brukesourceName= script inERDDAP..

###### Oversikt over hvordan et uttrykk (Eller skript) Brukes:
Som svar på en brukers forespørsel om tabelldata,ERDDAP™får data fra en rekke kildefiler. Hver kildefil vil generere en tabell med rå (Rett fra kilden) Data.ERDDAP™vil deretter gå gjennom tabellen av rådata, rad på rad og evaluere uttrykket eller skriptet én gang for hver rad, for å opprette en ny kolonne som har det uttrykket eller skriptet som ensourceName..
    
###### Generer DatasetsXml
Merk at Generer datasett Xml er helt uvitende når det er behov for å skape en variabel med&lt;sourceName&gt;= *uttrykk* &lt;/sourceName&gt;. Du må opprette variabelen idatasets.xmlfor hånd.

###### Eksempler på uttrykk:
Her er noen komplette eksempler på datavariabler som bruker et uttrykk til å opprette en ny kolonne med data. Vi forventer at disse eksemplene (og varianter av dem) vil dekke rundt 95 % av bruken av alle uttrykksavlededesourceNameS.

###### Kombinere separat " dato" og"time"kolonner i en enhetlig tidskolonne:
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
DetsourceNameUttrykk gjør et nytt"time"kolonne ved å kombinere strengverdiene fra "dato" (yyyy-MM-dd) og"time"  (HH:mm:ss) kolonner på hver rad i kildefilen, og ved å konvertere den strengen til en"seconds since 1970-01-01"  (epokesekunder) dobbel verdi.

Eller selvfølgelig, du må tilpasse tidsformatstrengen for å håndtere det spesifikke formatet i hvert datasetts kildedato og tidskolonner, se
[Tidsenhetsdokumentasjon](#string-time-units)..

Teknisk sett trenger du ikke å bruke Calendar2.parseToEpochSeconds () å konvertere den kombinerte datoen + tiden til epokesekunder. Du kan bare sende datoen + tidsstreng tilERDDAP™og angi format (f.eks.
yyyy-MM-dd'T'HH:mm:ss'Z') via enhetsattributten. Men det er betydelige fordeler å konvertere til epokeSeconds - spesielt, EDDTableFromFiles kan så enkelt holde styr på rekkevidden av tidsverdier i hver fil og så raskt bestemme om å se i en gitt fil når du svarer på en forespørsel som har tidsbegrensninger.

Et relatert problem er behovet for å opprette en samlet dato + tidskolonne fra en kilde med separat år, måned, dato, time, minutt, andre. Løsningen er veldig lik, men du trenger ofte å null-pad mange av feltene, slik at for eksempel måned (1-12) og dato (1 - 31) Har alltid to sifre. Her er et eksempel på år, måned, dato:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Et relatert problem er behovet for å opprette en enhetlig breddegrads- eller lengdegradskolonne ved å kombinere dataene i kildetabellens separate grader, minutter og sekunders kolonner, som hver er lagret som heltal. For eksempel
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Konvertere en kolonne som heter "lon" med lengdegradsverdi fra 0 - 360° til en kolonne som heter " lengdegrad" med verdier fra -180 - 180°
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
DetsourceNameuttrykk gjør en ny " lengdegrad" kolonne ved å konvertere dobbeltverdien fra "lon" kolonnen på hver rad av kildefilen (Sannsynligvis med 0 - 360 verdier) , og ved å konvertere det til en -180 til 180 dobbel verdi.

Hvis du i stedet vil konvertere kilde lengdeverdier på -180 - 180° til 0 - 360°, bruk
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Navngav de to lengdevariabler:
Hvis datasettet vil ha 2 lengdevariabler, anbefaler vi å brukedestinationName= lengdegrad for variabelen -180 - 180° ogdestinationName= lengdegrad0360 (og longName=\\"Longitude 0-360°") for 0 - 360° variabel. Dette er viktig fordi brukerne noen ganger bruker Avansert søk for å søke etter data i et bestemt lengdeområde. Dette søket vil fungere bedre hvis lengdegrad konsekvent har -180 - 180° verdier for alle datasett. Datasettets geospatielle\\_lon__min, geospatial\\_lon__max, vestligst\\_østlig og østligst\\_østlig globale attributter vil da bli satt på en konsekvent måte (med lengdegrad -180 til 180°) ;
    
###### Konvertere en kolonne som heter "tempF" med temperaturverdier i grad\\_ F i en kolonne som heter "tempC" med temperaturer i grad\\_ C:
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
DetsourceNameuttrykk gjør en ny "tempC" kolonne ved å konvertere flytegraden\\_ F-verdi fra columntempF"-kolonnen på hver rad av kildefilen i en flytende grad\\_ C-verdi.

Legg merke til at datasettet kan ha både det opprinnelige tempet F variabel og det nye tempoet C variabel ved å ha en annen variabel med
```
    <sourceName>tempF</sourceName>
```
###### Konvertere vind " hastighet" og "retning" kolonner i to kolonner med u,v-komponentene
* For å gjøre en u variabel, bruk
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* For å gjøre en v variabel, bruk
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Eller gitt u.v:
* For å gjøre en hastighetsvariabel, bruk
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* For å gjøre en retningsvariabel, bruk
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Script eksempel:
Her er et eksempel på bruk av et skript, ikke bare et uttrykk, som etsourceName.. Vi forventer at manuskripter, i motsetning til uttrykk, ikke vil bli nødvendig ofte. I dette tilfellet er målet å returnere en ikke-Nan manglende verdi (-99) for temperaturverdier utenfor et bestemt område. Legg merke til at manuset er delen etter "=".
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
###### Hard Flag
Hvis du endrer uttrykket eller skriptet definert i ensourceNameDu må sette en[hard flagg](/docs/server-admin/additional-information#hard-flag)for datasettet såERDDAP™sletter all cache-informasjon for datasettet og leser alle datafiler på nytt (å bruke det nye uttrykket eller skriptet) Neste gang den laster datasettet. Alternativt kan du bruke[DasDds](#dasdds)som gjør det samme som å sette et hardt flagg.

###### Prosent Koding
Dette er bare sjelden relevant: Fordi uttrykk og skript er skrevet idatasets.xml, som er et XML-dokument, må du ha prosent kodet noen&lt;,  \\&gt; og & tegn i uttrykk og skript som&lt;, &gt; og &amp; .

###### Vanlige problemer
Et vanlig problem er at du skaper en variabel medsourceName= *uttrykk* men den resulterende kolonnen av data har bare manglende verdier. Alternativt har noen rader i den nye kolonnen manglende verdier, og du tror de ikke bør. Det underliggende problemet er at noe er galt med uttrykket ogERDDAPer å konvertere den feilen til en manglende verdi. For å løse problemet,

* Se på uttrykket for å se hva problemet kan være.
* Se inn[log.txt](/docs/server-admin/additional-information#log), som vil vise den første feilmeldingen som genereres under opprettelsen av hver ny kolonne.

Vanlige årsaker er:

* Du brukte feil sak. Uttrykk og skript er sensitive.
* Du utelatt navnet på klassen. For eksempel må du bruke Math.abs () Ikke bare abs () ..
* Du skrev ikke konverteringer. Hvis en parameterverdi for eksempel er streng og du har en dobbel verdi, må du konvertere en dobbel til en streng via "+d.
* Kolonnenavnet i uttrykket samsvarer ikke akkurat med kolonnenavnet i filen (eller navnet kan være annerledes i noen filer) ..
* Det er en syntaksfeil i uttrykket (For eksempel mangler eller ekstra) ')

Hvis du sitter fast eller trenger hjelp,
Ta med detaljene og se våre[Seksjon om å få ekstra støtte](/docs/intro#support)..
        
###### &lt;destinationName&gt;{#destinationname-1} 
* [&lt;destinationName&gt;] (#destinasjonsnavn) - navnet på variabelen som vil bli vist til og brukt avERDDAP™brukere.
    * Dette er valgfritt. Hvis fraværende,[sourceName](#sourcename)er brukt.
    * Dette er nyttig fordi det lar deg endre en kryptisk eller merkeligsourceName..
    *   destinationNameer tilfelle følsom.
    *   destinationNameS må begynne med et brev (A-Z, a-z) og må følges av 0 eller flere tegn (A-Z, a-z, 0-9 og \\_) .. («-» ble tillatt førERDDAP™versjon 1.10.) Denne begrensningen gjør at datavariable navn kan være de samme iERDDAP™i responsfilene og i all programvare der disse filene vil bli brukt, inkludert programmeringsspråk (somPython,Matlab, ogJavaSkript) der det finnes lignende begrensninger på variabelnavn.
    * I EDDTable datasett,[lengdegrad, breddegrad, høyde (eller dybde) , og tid](#destinationname)Datavariabler er spesielle.
             
###### &lt;Data Type &gt;{#datatype} 
* [&lt;dataType&gt;] (#datatype) -- angir datatypen som kommer fra kilden. (I noen tilfeller, for eksempel når du leser data fra ASCII-filer, angir det hvordan data som kommer fra kilden skal lagres.) 
    * Dette er representert av noen datasett typer og IGnored av andre. Datasett som krever dette for deresdataVariableS er:EDDGridFraXxxFiles, EDDTableFromXxxFiles, EDDTableFromMWFS, EDDTableFra NOS, EDDTableFraSOS.. Andre datasetttyper ignorerer denne etiketten fordi de får informasjonen fra kilden.
         
    * Gyldige verdier er en av standardene[ERDDAP™Datatyper](#data-types)pluss boolsk (Se nedenfor) .. DataType-navnene er saksfølsomme.
         
###### Boolske data{#boolean-data} 
*   ["boolean"](#boolean-data)Det er et spesielt tilfelle.
    * internt,ERDDAP™støtter ikke en boolsk type, fordi booles ikke kan lagre manglende verdier, og de fleste filtyper støtter ikke boolesisk. Også,DAPstøtter ikke bobler, så det vil ikke være noen standard måte å spørre om booleske variabler.
    * Oppgi "boolean" for dataene Skriv inndatasets.xmlvil føre til at boolske verdier lagres og representeres som byte: 0=false, 1=true, 127=missing\\_value..
    * Brukere kan angi begrensninger ved å bruke numeriske verdier (For eksempel isAlive=1") ..
    *   ERDDAP™administratorer trenger noen ganger å bruke - boolean - data Skriv inndatasets.xmlå fortelleERDDAP™hvordan man samhandler med datakilden (f.eks. å lese booleske verdier fra en relasjonsdatabase og konvertere dem til 0, 1, eller 127) ..
         
* Hvis du vil endre en datavariabel fra dataType i kildefilene (For eksempel kort) i noen andre data Skriv i datasettet (f.eks.) Ikke bruk&lt;dataType&gt; for å angi hva du vil. (Det fungerer for noen typer datasett, men ikke andre.) I stedet:
    * Bruk&lt;dataType&gt; for å angi hva som er i filene (For eksempel kort) ..
    * I&lt;addAttributes&gt; for variabelen, legg til en[scale\\_factor](#scale_factor)attributt med de nye dataene Type (f.eks.) og en verdi på 1, for eksempel
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt;addAttributes&gt;] (#variable-addisjoner) -- definerer et sett attributter ( *Navn* = *verdi* ) som legges til kildeens attributter for en variabel, for å gjøre kombinerte attributter for en variabel. Dette er valgfritt.
Hvis variabelen er[sourceAttributes](#variable-addattributes)eller&lt;addAttributes&gt; Inkluderer[scale\\_factorog/elleradd\\_offset](#scale_factor)attributter, deres verdier vil bli brukt til å pakke ut data fra kilden før distribusjon til klienten. Den upakkede variabelen vil være av samme type data (For eksempel flyte) somscale\\_factorogadd\\_offsetverdier.
        
###### Variabel&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** Variable attributter / Variable&lt;addAttributes&gt; ** ] (#variable-addisjoner) --&lt;addAttributes&gt; er et valgfritt merke i en&lt;axisVariable&gt; eller&lt;dataVariable&gt; tag som brukes til å endre variabelens egenskaper.
    
    *    ** Bruk en variabel&lt;addAttributes&gt; å endre variabelens egenskaper. ** ERDDAP™kombinerer variabelens attributter fra datasettets kilde (** sourceAttributes **) og variabelen** addAttributes **som du definerer idatasets.xml  (som har prioritet) å gjøre variablen-** kombinertAttributes ** " som er hvaERDDAP™Brukere ser. Derfor kan du brukeaddAttributesfor å omdefinere verdiene til kildeAttributes, legge til nye attributter eller fjerne attributter.
    * Se [ ** &lt;addAttributes&gt; **Informasjon] (#addattributes) som gjelder globalt og variabelt** &lt;addAttributes&gt; ** ..
    *   ERDDAP™leter etter og bruker mange av disse egenskapene på ulike måter. For eksempel er colorBar-verdiene nødvendig for å gjøre en variabel tilgjengelig viaWMS, slik at kart kan gjøres med konsistente farger.
    *   [Lengdegrad, breddegrad, høyde (eller dybde) , og tidsvariabler](#destinationname)Få mye riktig metadata automatisk (For eksempel[enheter](#units)) ..
    * En prøve&lt;addAttributes&gt; for en datavariabel er:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Den tomme numberOfobservations-attributten forårsaker kildenummerOfobservations-attributten (dersom noen) å bli fjernet fra den endelige, kombinerte listen over attributter.
    * Å levere denne informasjonen hjelperERDDAP™gjør en bedre jobb og hjelper brukerne å forstå datasett.
Gode metadata gjør et datasett brukbart.
Utilstrekkelig metadata gjør et datasett ubrukelig.
Ta deg tid til å gjøre en god jobb med metadata-attributter.
    
###### Kommentarer til Variable attributter som er spesielle iERDDAP:)

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)er en OFFERT variabel attributt. For eksempel

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Denne egenskapen er fra[CDCCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)og[CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadatastandarder.
* Hvis det er tilstede, må det være en rekke to verdier av samme datatype som destinasjonsdatatypen til variabelen, og angi den faktiske (ikke teoretisk eller tillatt) minimale og maksimale verdier av dataene for den variabelen.
* Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor),actual\\_rangemå ha utpakkede verdier og være av samme datatype som de utpakkede verdiene.
* For noen datakilder (For eksempel alle EDDTabellFra... Fildatasett) ,ERDDAP™bestemmeactual\\_rangeav hver variabel og setteractual\\_rangeattributt. Med andre datakilder (For eksempel relasjonelle databaser, Cassandra,DAPPER,Hyrax) , det kan være vanskelig eller tungt for kilden å beregne området, såERDDAP™ikke ber om det. I dette tilfellet, det er best om du kan setteactual\\_range  (spesielt for lengdegrad, breddegrad, høyde, dybde og tidsvariabler) ved å legge til enactual\\_rangeattributt til hver variabels [&lt;addAttributes&gt;] (#addattributes) For dette datasettet idatasets.xmlFor eksempel:

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* For tall[Tid og tid](#time-units), de angitte verdiene bør være den relevante kilden (ikke mål) tallverdier. For eksempel, hvis kildetidene lagres som - dager siden 1985-01-01 - såactual\\_rangeskal angis idaydager siden 1985-01-01". Og hvis du vil referere til NU som den andre verdien for nær-real-tid data som oppdateres regelmessig, bør du bruke NaN. For eksempel, for å angi et dataområde på 1985-01-17 til NU, bruk

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Hvisactual\\_rangeer kjent (enten avERDDAP™beregne det eller ved å legge det til via&lt;addAttributes&gt;),ERDDAP™vil vise den til brukeren på Data Access Form ( *datasetID* .html) og lage en graf nettsider ( *datasetID* .graph) for det datasettet og bruk det når du genererer FGDC og ISO 19115 metadata. De siste 7 dageneactual\\_rangebrukes som standard tidsdeltaker.
* Hvisactual\\_rangeer kjent, brukere kan bruke[min () og max () funksjoner](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)i forespørsler, noe som ofte er veldig nyttig.
* For alle EDDTable... datasett, hvisactual\\_rangeer kjent (enten ved å si det eller vedERDDAP™Beregn det) ,ERDDAP™vil raskt kunne avvise alle forespørsler om data utenfor det området. For eksempel, hvis datasettets laveste tidsverdi tilsvarer 1985-01-17, vil en forespørsel om alle data fra 1985-01-01 til 1985-01-16 umiddelbart bli avvist med feilmeldingen " Forespørselen din ga ingen matchende resultater." Dette gjøractual\\_rangeEn veldig viktig bit metadata, som det kan spareERDDAP™mye innsats og spare brukeren mye tid. Dette understreker atactual\\_rangeverdier må ikke være smalere enn dataenes faktiske område; ellers,ERDDAP™kan feilaktig si Det er ingen matchende data" når det faktisk er relevante data.
* Når en bruker velger en undergruppe av data og ber om en filtype som inkluderer metadata (For eksempel.nc) ,ERDDAP™Endreractual\\_rangei responsfilen for å reflektere undergruppens område.
* Se også[data\\_minogdata\\_max](#data_min-and-data_max)som er en alternativ måte å spesifisereactual\\_range.. Men disse er foreldet nå somactual\\_rangedefinert av CF 1,7+.
         
###### Fargelinjen attributter{#color-bar-attributes} 
Det finnes flere valgfrie variable attributter som angir de foreslåtte standardattributtene for en fargelinje (brukes til å konvertere dataverdier til farger på bilder) For denne variabelen.
* Hvis det er tilstede, brukes denne informasjonen som standardinformasjon via netdap ogtabledapNår du ber om et bilde som bruker en fargelinje.
* Når f.eks. breddeviddegitte data blir plottet som en dekning på et kart, angir fargelinjen hvordan dataverdiene konverteres til farger.
* Å ha disse verdiene tillaterERDDAP™å opprette bilder som bruker en konsekvent fargelinje på tvers av ulike forespørsler, selv når tiden eller andre dimensjonsverdier varierer.
* Disse egenskapsnavnene ble opprettet for bruk iERDDAP.. De er ikke fra en metadatastandard.
* Attributene relatert til fargelinjen er:
    *    **colorBarMinimum** angir minsteverdi på fargelinjen. For eksempel

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor), angicolorBarMinimumSom en upakket verdi.
    * Dataverdier lavere enncolorBarMinimumrepresentert med samme farge somcolorBarMinimumverdier.
    * Attributet skal være av[type=" dobbel"](#attributetype)Uansett type datavariabel.
    * Verdien er vanligvis et fint rundnummer.
    * Beste praksis: Vi anbefaler en verdi litt høyere enn minimum dataverdi.
    * Det er ingen standardverdi.
*    **colorBarMaximum** angir høyeste verdi på fargelinjen. For eksempel

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor), angicolorBarMinimumSom en upakket verdi.
    * Dataverdier høyere enncolorBarMaximumrepresentert med samme farge somcolorBarMaximumverdier.
    * Attributet skal være av[type=" dobbel"](#attributetype)Uansett type datavariabel.
    * Verdien er vanligvis et fint rundnummer.
    * Beste praksis: Vi anbefaler en verdi litt lavere enn den maksimale dataverdien.
    * Det er ingen standardverdi.
*    **farge BarPalette** angir paletten for fargelinjen. For eksempel
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * AlleERDDAP™installasjonene støtter disse standardpalettene: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteReed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topografi, TopografiDepth\\[lagt til i v1.74\\], hvitsvart, hvitblåsvart og hvitrødsvart.
    * Hvis du har installert[ytterligere paletter](/docs/server-admin/additional-information#palettes)Du kan referere til en av dem.
    * Hvis denne egenskapen ikke er til stede, er standarden BlueWhiteRed hvis \\-1\\*colorBarMinimum=colorBarMaximumEllers er standarden regnbue.
*    **colorBarScale** angir skalaen for fargelinjen. For eksempel
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Gyldige verdier er lineær og logg.
    * Hvis verdien er logg,colorBarMinimumMå være større enn 0.
    * Hvis denne attributten ikke er til stede, er standardlinjen lineær.
*    **farge BarContinous** angir om colorBar har en kontinuerlig palett av farger, eller om colorBar har noen diskrete farger. For eksempel
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Gyldige verdier er strengene sanne og falske.
    * Hvis denne egenskapen ikke er til stede, er standarden sant.
*    **fargeBarN Seksjoner** angir standard antall seksjoner på fargelinjen. For eksempel
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Gyldige verdier er positive heltal.
    * Hvis denne egenskapen ikke er til stede, er standarden --1, som fortellerERDDAP™å velge antall seksjoner basert på spekteret av colorBar.
###### WMS {#wms} 
De viktigste kravene til at en variabel skal være tilgjengelig viaERDDAP'sWMSserver er:
* Datasettet må være etEDDGrid... datasett.
* Datavariabelen må være en gitt variabel.
* Datavariabelen må ha lengdegrad og breddegradsaksevariabler. (Andre aksevariabler er valgfrie.) 
* Det må være noen lengdeverdier mellom -180 og 180.
* DencolorBarMinimumogcolorBarMaximumAttributene må angis. (Andre fargelinjen attributter er valgfrie.) 

###### data\\_minogdata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** og **data\\_max** ](#data_min-and-data_max)-- Disse er utdaterte variabele attributter definert i World Ocean Circulation Experiment (WOCE) metadata beskrivelse. For eksempel

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Vi anbefaler at du bruker[actual\\_range](#actual_range)I stedet fordata\\_minogdata\\_maxfordiactual\\_rangeer definert av CF-spesifikasjonen.
    * Hvis det er til stede, må de være av samme type data som variabelens destinasjonsdatatype og angi den faktiske (ikke teoretisk eller tillatt) minimale og maksimale verdier av dataene for den variabelen.
    * Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor),data\\_minogdata\\_maxmå pakkes ut ved hjelp av den utpakkede datatypen.
         
###### variabeldrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)-- Dette er en valgfri variabel attributt som brukes avERDDAP™  (Ingen metadatastandarder) som angir standardverdien for "Draw Land Mask" alternativet på datasettets Make A Graph-skjema ( *datasetID* .graph) og for &.land parameteren i en URL som ber om et kart over dataene. For eksempel
    ```
        <att name="drawLandMask">under</att>  
    ```
Se[drawLandMaskOversikt](#drawlandmask)..
###### Koding{#encoding} 
*   [ ** \\_Koding** ](#encoding)
    * Denne egenskapen kan bare brukes med strengvariabler.
    * Denne egenskapen er sterkt anbefalt.
    * Denne egenskapen er fra[NetCDFBrukerveiledning (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html)..
    * Internt iERDDAP™, Stringer er en sekvens av 2-byte tegn som bruker[Unicode UCS-2 tegnsett](https://en.wikipedia.org/wiki/UTF-16)..
    * Mange filtyper støtter bare 1-byte tegn i strenger og trenger dermed denne attributten for å identifisere en tilknyttet
        [Teiknkoding (AKA-kodeside) ](https://en.wikipedia.org/wiki/Code_page)som definerer hvordan du skal kartlegge 256 mulige verdier til et sett med 256 tegn som trekkes fra UCS-2 tegnsettet og/eller kodingssystemet, f.eks.[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (som krever mellom 1 og 4 bytes per tegn) ..
    * Verdier for \\_coding er kaseufølsomme.
    * I teorien,ERDDAP™kan støtte \\_kodingsidentifikatorer fra[denne IANA-listen](https://www.iana.org/assignments/character-sets/character-sets.xhtml)Men i praksis,ERDDAP™For øyeblikket bare støtter
        * ISO-8859-1 (Legg merke til at det har stikker, ikke understreker) , som har fordelen at det er identisk med de første 256 tegnene til Unicode, og
        * UTF-8.
    * Ved lesing av kildefiler er standardverdien ISO-8859-1, med unntak av netcdf-4-filer, der standardverdien er UTF-8.
    * Dette er et problemfritt problem fordi mange kildefiler bruker tegnsett eller teiknkodinger som er forskjellig fra ISO-8859-1, men ikke identifisere tegnsettet eller koden. For eksempel har mange kildedatafiler noen metadata kopiert og limt fra Microsoft Word på Windows og dermed har fancy bindestrek og apostrofer fra en Windows-spesifikk teiknkoding i stedet for ASCII bindestrek og apostrofer. Disse tegnene vises så som merkelige tegn eller '?' iERDDAP..
         
###### filAccessBaseUrl{#fileaccessbaseurl} 
*    **[filAccessBaseUrl](#fileaccessbaseurl)og filAccessSuffix** er svært sjelden brukt egenskaper som ikke er fra noen standard. Hvis en EDDTable-kolonne har navn på tilgjengelige webfiler (f.eks. bilde, video eller lydfiler) Du kan legge til
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
å angi basisadressen (Slutter med /) nødvendig for å gjøre filnavnene til komplette URLer. I uvanlige tilfeller, for eksempel når en kolonne har referanser til .png-filer, men verdiene mangler ".png", kan du legge til
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(for eksempel,&lt;at name="filAccessSuffix"&gt;.png&lt;/a&gt;)
for å angi en suffiks som skal legges til for å gjøre filnavnene til komplette adresser. Så for.htmlTablesvar,ERDDAP™vil vise filnavnet som en lenke til hele URLen (basen Url pluss filnamnet pluss suffikset) ..

Hvis du vilERDDAP™å betjene de relaterte filene, lage en separat[EDDTableFromFileNames](#eddtablefromfilenames)datasett for disse filene (Det kan være et privat datasett) ..
    
###### filAccessArchive Url{#fileaccessarchiveurl} 
*   [ **filAccessArchive Url** ](#fileaccessarchiveurl)er en svært sjelden brukt egenskap som ikke er fra noen standard. Hvis en EDDTable-kolonne har navn på tilgjengelige webfiler (f.eks. bilde, video eller lydfiler) som er tilgjengelige via et arkiv (f.eks..zipfil) Tilgjengelig via en URL, bruk&lt;att name=" filAccessArchiveUrl"&gt; *URL* &lt;/att&gt; for å angi URL-adressen for arkivet.
    
Hvis du vilERDDAP™å betjene arkivfilen, lage en separat[EDDTableFromFileNames](#eddtablefromfilenames)datasett for den filen (Det kan være et privat datasett) ..
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)-- Dette er en REQUIRED variabel attributt hvis&lt;VariablerMustHaveIoos Categories&gt; er satt til sant (standard) i[config.xml](/docs/server-admin/deploy-install#setupxml)Ellers er det valgfritt.
For eksempel&lt;navn="ioos\\_category"&gt;Salinity&lt;/att&gt;
Kategoriene er fra[NOAAIntegrert Ocean Observation System (IOOS) ](https://ioos.noaa.gov/)..
    
    *    (Som å skrive dette) Vi er ikke klar over formelle definisjoner av disse navnene.
    * Kjernenavnene er fra Zdenka Willis '.ppt-Integrated Ocean Observation System (IOOS)  NOAAtilnærming til å bygge en initial driftsevne" og fra[US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (side 1-5) ..
    * Det er sannsynlig at denne listen vil bli revidert i fremtiden. Hvis du har forespørsler, vennligst kontakt Chris. John på noaa.gov.
    *   ERDDAP™støtter en større liste over kategorier enn IOOS gjør fordi Bob Simons la til flere navn (hovedsakelig basert på navn på vitenskapelige felt, for eksempel Biologi, Økologi, Meteorologi, Statistikk, Taxonomi) For andre typer data.
    * De gjeldende gyldige verdiene iERDDAP™Bathymetry, Biologi, Bottom Character, CO2, Farget løste organiske stoffer, Contaminanter, Strømmer, Oppløste Nutrienter, Oppløste O2, Økologi, Fiskeflod, Fiskearter, Varmefluks, Hydrologi, Isdistribusjon, Identifikator, Plassering, Meteorologi, Ocean Color, Optisk egenskaper, Andre, Patogener, Phytoplankton Arter, Pressure, Produktivitet, Kvalitet, Salinity, Havnivå, Statistikk, Strøm flyt, Overflatebølger, Taxonomi, Temperatur, Tid, Totalt suspendertned Matter, Ukjend, Vind, Zooplankton Arter og Zooplankton Abundance.
    * Det er litt overlapp og tvetydighet mellom forskjellige uttrykk - gjør ditt beste.
    * Hvis du legger tilioos\\_categorytil listen over&lt;categoryAttributes&gt; iERDDAP's[config.xml](/docs/server-admin/deploy-install#setupxml)fil, brukere kan enkelt finne datasett med lignende data viaERDDAPSøk etter datasett etter kategori" på hjemmesiden.
        [Prøv å brukeioos\\_categoryå søke etter datasett av interesse.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Det var[En diskusjon omERDDAP™ogioos\\_categoryiERDDAP™Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
Du kan bli fristet til å sette&lt;VariablerMustHaveIoosCategories&gt; til feil slik at denne egenskapen ikke kreves. (-Pfft&#33; Hva er det for meg?") Noen grunner til å la det bli sant (standard) og brukioos\\_categoryer:
    
    * Hvis oppsett.xml&lt;VariablerMustHaveIoos er satt til virkelighet,[Generer DatasetsXml](#generatedatasetsxml)Oppretter/venter alltid enioos\\_categoryattributt for hver variabel i hvert nytt datasett. Så hvorfor ikke bare legge det i?
    *   ERDDAP™lar brukerne søke etter datasett av interesse etter kategori.ioos\\_categoryer en veldig nyttig søkekategori fordi ioos\\_ Categories (For eksempel temperatur) er ganske bredt. Dette gjørioos\\_categorymye bedre til dette formålet enn for eksempel den mye finere-kornet CFstandard\\_names (som ikke er så bra til dette formålet på grunn av alle synonymer og små variasjoner, for eksempel sjø\\_overflate__temperatur versus hav\\_vann\\_temperatur) ..
(Using)ioos\\_categoryFor dette formål styres&lt;categoryAttributes&gt; i config.xml-filen.)
        [Prøv å brukeioos\\_categoryå søke etter datasett av interesse.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Disse kategoriene kommer fra[NOAAIntegrert Ocean Observation System (IOOS) ](https://ioos.noaa.gov/).. Disse kategoriene er grunnleggende for IOOSs beskrivelse av IOOSs oppdrag. Hvis du er iNOAA, støtteioos\\_categoryer en god En-NOAATing å gjøre. (Se på dette[EnNOAAvideo](https://www.youtube.com/watch?v=nBnCsMYm2yQ)og bli inspirert&#33;) Hvis du er i et annet amerikansk eller internasjonalt byrå, eller jobber med statlige byråer, eller jobber med noe annet Ocean Observation System, er det ikke en god ide å samarbeide med det amerikanske IOOS-kontoret?
    * Før eller senere vil du kanskje ha noe annetERDDAP™å koble til datasettene dine via[EDDGridFraErddap](#eddfromerddap)og[EDDTableFraErddap](#eddfromerddap).. Hvis den andreERDDAP™kreverioos\\_categoryDine datasett må haioos\\_categoryFor åEDDGridFraErddap og EDDTableFraErddap til jobb.
    * Det er psykologisk mye lettere å inkludereioos\\_categoryNår du oppretter datasettet (Det er bare en annen ting somERDDAP™krever å legge til datasettet iERDDAP) enn å legge det til etter det faktum (Hvis du bestemte deg for å bruke den i fremtiden) ..
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) er en ubegrenset variabel attributt iERDDAP.. For eksempel
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™brukerlong\\_namefor merking axler på grafer.
    * Beste praksis: kapitalisere ordene ilong\\_namesom om det var en tittel (kapitalisere det første ordet og alle ikke-artikkel ord) .. Ikke ta med enhetene ilong\\_name.. Det lange navnet bør ikke være så lenge (vanligvis&lt;20 tegn, men bør være mer beskrivende enn[destinationName](#destinationname)Det er ofte svært kortfattet.
    * Hvislong\\_name" er ikke definert i variabelens[sourceAttributes](#variable-addattributes)eller&lt;addAttributes&gt;,ERDDAP™vil generere det ved å rense opp[standard\\_name](#standard_name)  (Hvis det er tilstede) ellerdestinationName..
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)og **\\_Fyll Verdi**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)og[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) er variable attributter som beskriver et tall (for eksempel -9999) som brukes til å representere en manglende verdi. For eksempel

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

For strengvariabler er standarden for begge -- (den tomme strengen) ..
For numeriske variabler er standard for begge NaN.
*   ERDDAP™støtter begge delermissing\\_valueog \\_FallValue, siden noen datakilder tildeler litt forskjellige betydninger til dem.
* Hvis det er til stede, bør de være av samme type som variabelen.
* Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor), denmissing\\_valueog \\_FillValue-verdier bør også pakkes. På samme måte, for en kolonne med streng dato/tid verdier som bruker en lokal[time\\_zone](#time_zone), denmissing\\_valueog \\_FallValue-verdier bør bruke den lokale tidssonen.
* Hvis en variabel bruker disse spesielle verdiene,missing\\_valueog/eller \\_FillValue attributter er reQUIRED.
* For[Tid og tid](#time-units)  (om kilden er strenger eller numeriske) ,missing\\_values og__FillValues vises som " (den tomme strengen) Når tiden er skrevet som en streng og som NaN når tiden er skrevet som en dobbel. Kildeverdier formissing\\_valueog \\_FallValue vises ikke i variabelens metadata.
* For strengvariabler,ERDDAP™Konverterer alltid noemissing\\_values eller__FillValue dataverdier i " (den tomme strengen) .. Kildeverdier formissing\\_valueog \\_FallValue vises ikke i variabelens metadata.
* For tallvariabler:
Denmissing\\_valueog \\_FallValue vises i variabelens metadata.
For noen utgangsdataformater,ERDDAP™vil la disse spesielle tallene være intakte, for eksempel vil du se -9999.
For andre utdataformater (spesielt tekstlignende formater som .csv og.htmlTable) ,ERDDAP™vil erstatte disse spesielle tallene med NaN eller
* Noen datatyper har iboende manglende verdimarkører som ikke trenger å bli eksplisitt identifisert medmissing\\_valueeller \\_FallValue-attributter: flyte og doble variabler har NaN (Ikke et tall) , Strengverdier bruker den tomme strengen, og tegnverdier har tegn\\uffff  (tegn #65535, som er Unicodes verdi for Ikke et tegn) .. Heltalsdatatyper har ikke iboende manglende verdimarkører.
* Hvis en heltallsvariabel har en manglende verdi (For eksempel, en tom posisjon i en .csv-fil) ,ERDDAP™vil tolke verdien som definertmissing\\_valueeller__FallValue for den variabelen. Hvis ingen er definert,ERDDAP™vil tolke verdien som standard manglende verdi for den datatypen, som alltid er den maksimale verdien som kan holdes av den datatypen:
127 for bytevariabler, 32767 for kort, 2147483647 for intenst, 9223372036854775807 lenge,
255 for ubyte, 65535 for ushort, 4294967295 for uint, og 18446744073709551615 for ulong.
###### ADD \\_FillValue ATTRIBUTES?{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES?](#add-_fillvalue-attributes)  
Hver gangERDDAP™laster et datasett, sjekker det om variabler med heltallskildedatatyper har et definertmissing\\_valueeller \\_FallValue attributt. Hvis en variabel ikke gjør det, såERDDAP™Skriv ut en melding til loggfilen (starter med " Legg til \\_FillValue-attributt?") Anbefaler atERDDAP™Administrator legger til en Verdiattributt for denne variabelen idatasets.xml.. Det er svært nyttig for hver variabel å ha en \\_FillValue ellermissing\\_valuefordi manglende verdier alltid er mulige, f.eks. hvis en gitt fil i et datasett ikke har en gitt variabel,ERDDAP™må være i stand til å presentere denne variabelen som å ha alle manglende verdier for den variabelen. Hvis du bestemmer en variabel bør ikke ha en \\_FillValue-attributt, kan du legge til
    &lt;at names="_FillValue"&gt;Null&lt;/att&gt; i stedet, som vil undertrykke meldingen for detdatasetID+variable kombinasjon i fremtiden.
    
Hver gangERDDAP™starter opp, det samler alle disse anbefalingene i en melding som er skrevet til loggfilen (starter medADD \\_FillValue ATTRIBUTES?") e-post tilERDDAP™administrator, og skrevet til en CSV-datafil i\\[bigParentDirectory\\]/logg/ katalog. Hvis du vil, kan du bruke programmet Genererer DatasetsXml (og AddFillValueAttributes alternativet) å bruke alle forslagene i CSV-filen pådatasets.xmlfil. For noe avdatasetID/variable kombinasjoner i den filen, hvis du bestemmer deg for at det ikke er behov for å legge til tilskrevet, kan du endre attributt til&lt;at names="_FillValue"&gt;Null&lt;/att&gt; å undertrykke anbefalingen til detdatasetID+variable kombinasjon i fremtiden.
    
Dette er viktig&#33;
Som Bob ofte har sagt: det ville være dårlig (og pinlig) dersom noen av bevisene på global oppvarming skyldes uidentifiserte verdier i dataene (For eksempel temperaturverdier på 99 eller 127 grader C som skulle ha blitt merket som manglende verdier og dermed skjev gjennomsnitts- og/eller medianstatistikk høyere) ..

* \\FallValue ogmissing\\_valueverdier for en gitt variabel i forskjellige kildefiler må være konsekvente; ellers,ERDDAP™vil akseptere filer med ett sett verdier og avvise alle de andre filene som "Bad Filer". For å løse problemet,
    * Hvis filene er gitt.ncfiler, du kan bruke[EDDGridFraNcFilesUpakket](#eddgridfromncfilesunpacked)..
    * Hvis filene er tabellbaserte datafiler, kan du bruke EDDTableFrom...Filer \"[standardisering Hva](#standardizewhat)å fortelleERDDAPå standardisere kildefiler som de leses inn iERDDAP..
    * For vanskeligere problemer kan du bruke[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)å løse problemet.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (standard = 1) og **add\\_offset**   (standard = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)og[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) er valgfrie variable attributter som beskriver data som er pakket i en enklere datatype via en enkel transformasjon.
    * Hvis det er til stede, er deres datatype forskjellig fra kildedatatypen og beskriver datatypen til destinasjonsverdiene.
For eksempel kan en datakilde ha lagret flytedataverdier med ett desimaltall pakket som korte innsatser (it16) Brukerscale\\_factor= 0,1 ogadd\\_offset= 0. For eksempel

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

I dette eksemplet,ERDDAP™ville pakke ut dataene og presentere dem til brukeren som flyte dataverdier.
    * Hvis tilstede,ERDDAP™vil trekke ut verdiene fra disse attributtene, fjerne attributtene og automatisk pakke ut dataene for brukeren:
Destinasjon Verdi = kilde Verdi \\*scale\\_factor+add\\_offset  
Eller på en annen måte:
pakket verdi = pakket Verdi \\*scale\\_factor+add\\_offset
    * Denscale\\_factorogadd\\_offsetverdier for en gitt variabel i forskjellige kildefiler må være konsekvente; ellers,ERDDAP™vil akseptere filer med ett sett verdier og avvise alle de andre filene som "Bad Filer". For å løse problemet,
        * Hvis filene er gitt.ncfiler, du kan bruke[EDDGridFraNcFilesUpakket](#eddgridfromncfilesunpacked)..
        * Hvis filene er tabellbaserte datafiler, kan du bruke EDDTableFrom...Filer \"[standardisering Hva](#standardizewhat)å fortelleERDDAPå standardisere kildefiler som de leses inn iERDDAP..
        * For vanskeligere problemer kan du bruke[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)å løse problemet.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadatastandard) er en ubegrenset variabel attributt iERDDAP.. CF opprettholder listen over tillatte[CF standardnavn](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).. For eksempel
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Hvis du legger tilstandard\\_nametil variablers egenskaper og legge tilstandard\\_nametil listen over&lt;categoryAttributes&gt; iERDDAP's[config.xml](/docs/server-admin/deploy-install#setupxml)fil, brukere kan enkelt finne datasett med lignende data viaERDDAPSøk etter datasett etter kategori" på hjemmesiden.
    * Hvis du angir en CFstandard\\_nameFor en variabel trenger ikke enhetenes attributt for variabelen å være identisk med den Canoniske enhet som er angitt for standardnavnet i CF Standard Navntabellen, men enhetene må være konvertible til Canonical Units. For eksempel alle temperaturrelaterte CFstandard\\_nameS har "K" (Kelvin) som kanoniske enheter. En variabel med en temperaturrelatertstandard\\_nameMå ha enheter av K, grad-_C, grad-_F eller noen UDUits variant av disse navnene, siden de alle er inter-konvertible.
    * Beste praksis: En del av makten til[kontrollerte ordforråd](https://en.wikipedia.org/wiki/Controlled_vocabulary)kommer fra bruk av kun vilkårene i listen. Så vi anbefaler å holde seg til de vilkårene som er definert i det kontrollerte ordforrådet, og vi anbefaler å gjøre opp et uttrykk hvis det ikke er en passende i listen. Hvis du trenger ytterligere vilkår, kan du se om standardkomiteen vil legge dem til det kontrollerte ordforrådet.
    *   standard\\_nameverdier er de eneste CF-attributtsverdier som er kasusfølsomme. De er alltid små. Starter iERDDAP™v1.82. Generer Datasett vil konvertere store bokstaver til små bokstaver. Når et datasett lastes innERDDAPStore bokstaver endres stille til små bokstaver.
         
###### time\\_precision {#time_precision} 
*   time\\_precisioner en valgfri attributt som brukes avERDDAP™  (Ingen metadatastandarder) for[Tid og tid](#time-units), som kan være i gitte datasett eller tabelldatasett, og iaxisVariables ellerdataVariableS. For eksempel
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisionangir nøyaktigheten som skal brukes nårERDDAP™formaterer tidsverdiene fra den variabelen som strenger på nettsider, inkludert.htmlTableSvar. I filformater derERDDAP™formaterer ganger som strenger (for eksempel .csv og.json) ,ERDDAP™Bare bruktime\\_precision- Spesifisert format hvis det inkluderer fraksjonelle sekunder; ellers,ERDDAP™bruker 1970-01-01T00:00:00 Z-format.
* Gyldige verdier er 1970-01-01, 1970-01-01T00Z, 1970-01-01T00:00Z, 1970-01-01T00:00Z (standard) , 1970-01-01T00:00:00:00.0Z, 1970-01-01T00:00:00.00Z, 1970-01-01T00:00:0.000Z.\\[1970 er ikke et alternativ fordi det er et enkelt tall, såERDDAP™Vet ikke om det er en formatert tidsstreng (Et år) Hvis det er et antall sekunder siden 1970-01-01T00:00:00Z.\\]
* Hvistime\\_precisioner ikke spesifisert eller verdien er ikke matchet, standardverdien vil bli brukt.
* Her som i andre deler avERDDAP™Alle felt i den formaterte tiden som ikke vises, antas å ha minsteverdi. For eksempel 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z og 1985-07-01T00:00:00 Z er alle ansett som ekvivalent, selv om med forskjellige nivåer av presisjon underforstått. Dette samsvarer med[ISO 8601:2004"extended"Tidsformat Spesifikasjon](https://www.iso.org/iso/date_and_time_format)..
*    **ADVARSEL:** Du bør bare bruke en begrensettime\\_precisionhvis **alle** av dataverdiene for variabelen har bare minsteverdi for alle feltene som er skjult.
    * For eksempel kan du bruke entime\\_precisionav 1970-01-01 hvis alle dataverdier har time=0, minutt=0 og andre=0 (for eksempel 2005-03-04T00:00:00Z og 2005-03-05T00:00:00Z) ..
    * For eksempel, ikke bruk entime\\_precisionav 1970-01-01 hvis det er ikke-0 timer, minutter eller sekunder verdier, (For eksempel 2005-03-05T12:00:00Z) fordi den ikke-standard timeverdien ikke vil bli vist. Ellers, hvis en bruker ber om alle data med tid=2005-03-05, vil forespørselen mislykkes uventet.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneer en valgfri attributt som brukes avERDDAP™  (Ingen metadatastandarder) for[Tid og tid](#time-units), som kan være i nettbaserte datasett eller tabelldatasett.
    * Standarden er -Zulu" (som er den moderne tidssoneversjonen av GMT) ..
    * Bakgrunnsinformasjon: "tid forskyvninger" (f.eks. Stillehavsstandardtid, -08:00, GMT-8) er faste, spesifikke, forskyvninger i forhold tilZulu  (GMT) .. I motsetning til dette er tidssonene de mye mer komplekse tingene som påvirkes av Daylight Sparing. (f.eks. "US/Pacific") , som har hatt forskjellige regler på forskjellige steder på ulike tidspunkter. Tidssonene har alltid navn siden de ikke kan oppsummeres av en enkel offsetverdi (se  "TZ-databasenavn" kolonne i tabellen på[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) ..ERDDAP'stime\\_zoneattributt hjelper deg å håndtere lokale tidsdata fra en tidssone (f.eks. 1987-03-25T17:32:05 Stillehavet Tid) .. Hvis du har streng- eller numeriske tidsdata med en (Fast) tidsforskyvning, bør du bare justere dataene tilZulu  (som er hvaERDDAP™Ønsker) ved å spesifisere en annen basistid i enhetsattributten (f.eks. " timer siden 1970-01-01T08:00:00Z", Legg merke til T08 for å spesifisere tidsforsinkelsen) , og alltid sjekke resultatene for å sikre at du får resultatene du vil ha.
    * For tidsstempelvariabler med kildedata fra Strenger kan du angi en tidssone som førerERDDAP™å konvertere lokale tidssonekildetider (Noen i Standard tid, noen i Daylight Spar tid) iZuluganger (som alltid er i standardtid) .. Listen over gyldige tidssonenavn er sannsynligvis identisk med listen i TZ-kolonnen ved[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).. Vanlige amerikanske tidssoner er: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern.
    * For tidsstempelvariabler med numeriske kildedata kan du angi "time\\_zone" Attribut, men verdien må væreZulu" eller "UTC". Hvis du trenger støtte til andre tidssoner, vennligst e-post Chris. John på noaa.gov.
         
###### enheter{#units} 
*   [ **enheter** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandard) definerer enhetene til dataverdiene. For eksempel
    ```
        <att name="units">degree\\_C</att>
    ```
    *  " Units" er REQUIRED som enten en kildeAttribute eller en addAttribute for"time"variabler og er STRONGLY BEREGET for andre variabler når det er hensiktsmessig (som er nesten alltid) ..
    * Generelt anbefaler vi[UDUnites](https://www.unidata.ucar.edu/software/udunits/)Kompatible enheter som kreves av[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)og[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standarder.
    * En annen vanlig standard er[UCUM](https://unitsofmeasure.org/ucum.html)Samledet kode for måleenheter.[OGC](https://www.ogc.org/)Tjenester som[SOS](https://www.ogc.org/standards/sos),[WCS](https://www.ogc.org/standards/wcs), og[WMS](https://www.ogc.org/standards/wms)krever UCUM og refererer ofte til UCUM som UOM (Målenhet) ..
    * Vi anbefaler at du bruker én enhetsstandard for alle datasett i dinERDDAP.. Du bør fortelleERDDAP™hvilken standard du bruker med&lt;enheter\\_standard&gt;, i dine[config.xml](/docs/server-admin/deploy-install#setupxml)fil.
    * Enhetene for en gitt variabel i forskjellige kildefiler må være konsistente. Hvis du har en samling av datafiler der én undergruppe av filene bruker forskjellige enhetsverdier enn én eller flere andre undergrupper av filene (f.eks.
"dager siden 1985-01-01" motdaydager siden 2000-01-01",
Grade\\_Celsius" versus "deg\\_C", eller
"knotter" versus "m/s") må du finne en måte å standardisere enhetsverdiene, ellers,ERDDAP™vil bare laste én undergruppe av filene. Tenk på det: Hvis en fil har vindhastighetsenheter=knotter og en annen har vindhastighetsenheter=m/s, bør verdiene fra de to filene ikke inkluderes i samme samlet datasett.
        * Hvis filene er gitt.ncfiler i mange situasjoner du kan bruke[EDDGridFraNcFilesUpakket](#eddgridfromncfilesunpacked)..
        * Hvis filene er tabular datafiler, i mange situasjoner kan du bruke EDDTableFrom... Filer \"[standardisering Hva](#standardizewhat)å fortelleERDDAPå standardisere kildefiler som de leses inn iERDDAP..
        * For vanskeligere problemer kan du bruke[NcML](#ncml-files)eller[NCO](#netcdf-operators-nco)å løse problemet.
    * CF standard seksjon 8.1 sier at hvis en variabels data er pakket via[scale\\_factorog/elleradd\\_offset](#scale_factor)Enhetene i en variabel bør være representative for de utpakkede dataene."
    *   [For tid og tid,](#time-units)Enten variabelens[sourceAttributes](#variable-addattributes)eller&lt;addAttributes&gt; (som har forrang) Må ha[enheter](#units)som enten er
        
        * For tidsaksevariabler eller tidsdatavariabler med numeriske data:[UDUnites](https://www.unidata.ucar.edu/software/udunits/)\\-kompatibel streng (Med formatet *enheter* siden *baseTime* ) Beskrivelse av hvordan du tolker kildetidverdier (For eksempel, sekunder siden 1970-01-01T00:00:00Z) ..
            
         *enheter* kan være en hvilken som helst av:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Teknisk sett,ERDDAP™Følger ikkeUDUNITSstandard ved konvertering"years since"og"months since"tidsverdier til"seconds since".. DenUDUNITSstandard definerer et år som en fast, enkelt verdi: 3.15569259747e7 sekunder. OgUDUNITSdefinerer en måned som år/12. Dessverre, de fleste/alle datasett som vi har sett denne bruken"years since"eller"months since"Det er klart at verdiene skal være kalendermåneder eller kalendermåneder. For eksempel 3"months since 1970-01-01"er vanligvis ment å være 1970-04-01. Så,ERDDAP™Tolker"years since"og"months since"som kalenderår og måneder, og ikke strengt følgerUDUNITSStandard.
            
Den *baseTime* må være en ISO 8601:2004 (E) formatert datotidsstreng (yyyy-MM-dd'T'HH:mm:ssZ, for eksempel 1970-01-01T00:00:00Z) eller noen varianter av det (For eksempel, med deler som mangler i slutten) ..ERDDAP™forsøker å jobbe med et bredt spekter av variasjoner av det ideelle formatet, for eksempel "1970-1 0:0:0" støttes. Hvis informasjon om tidssonen mangler, antas det å væreZuluTidssone (AKA GMT) .. Selv om en annen tidsforsinkelse er angitt,ERDDAP™Bruker aldri Daylight Sparing Time. Hvis baseTime bruker noe annet format, må du bruke&lt;addAttributes&gt; å angi en ny enhetsstreng som bruker en variasjon av ISO 8601:2004 (E) format (f.eks. endre dager siden 1. januar 1985 til dager siden 1985-01-01.
        
Du kan testeERDDAPevne til å håndtere en bestemt *enheter* siden *baseTime* medERDDAP's[Tidskonverter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).. Forhåpentligvis kan du koble inn et nummer (Første gangs verdi fra datakilden?) og en enhetsstreng, klikk på Konverter, ogERDDAP™vil kunne konvertere det til en ISO 8601:2004 (E) formatert datotidsstreng. Konvertereren returnerer en feilmelding hvis enhetene ikke gjenkjennes.

###### String Time Units{#string-time-units} 
*   [For enhetsattributten for tidsstempeldatavariabler med strengdata,](#string-time-units)Du må angi en[java.time.DateTimeFormater](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)mønster (som for det meste er kompatibel med java.text. EnkelDateFormat) som beskriver hvordan man tolker strengtidene.
    
For de vanlig brukte tidsformatene som er variasjoner av ISO 8601:2004 (E) Standardformat (For eksempel, 2018-01-02T00:00:00Z) Du kan angi variasjoner avyyyy-MM-dd'T'HH:mm:ssZ, for eksempel brukyyyy-MM-ddHvis strengtiden bare har en dato. For ethvert format som starter med YY-M,ERDDAPbruker en spesiell tolke som er svært tilgivende for mindre variasjoner i formatet. Tolkeren kan håndtere tidssoner i formatet \"Z\", \"UTC\" -GMT - ±XX:XX, ± XXXX og ± XXX-formater. Hvis deler av datoen ikke er spesifisert (For eksempel minutter og sekunder) ,ERDDAP™påtar seg den laveste verdien for det feltet (Hvis sekunder ikke er angitt, antas sekunder = 0) ..
    
For alle andre strengtidsformater må du nøyaktig angi en datoTimeFormater-kompatibel tidsformatstreng. Somyyyy-MM-dd\"T'HH:mm:ssZ, disse formatstrengene er bygget fra tegn som identifiserer en bestemt type informasjon fra tidsstrengen, f.eks. m betyr minutt på timen. Hvis du gjentar formattegnet et antall ganger, vil det ytterligere avgrense betydningen, f.eks. m, betyr at verdien kan angis med et hvilket som helst antall siffer, mm betyr at verdien må angis med 2 siffer. DenJavadokumentasjon for DateTime Formater er en rå oversikt og gjør ikke disse detaljene klare. Så her er en liste over figurvariasjoner og deres mening iERDDAP™  (som noen ganger er litt forskjellig fraJavaDateTimeFormater) :)
    
    |Tegn|Eksempler|Betydning|
    |---|---|---|
    |u, y, Y|\\-4712, 0, 1, 10, 100, 2018|Et års tall, alle tall.ERDDAP™behandlinger y (år-av-era) og Y (uke-basert år, fordi dette ofte feilaktig brukes i stedet for y) som u,[astronomiske årsnummer](https://en.wikipedia.org/wiki/Astronomical_year_numbering).. Astronomiske år er positive eller negative heltal som ikke bruker BCE (BC) eller CE (AD) ea designatorer: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ...|
    |uuu, you, YYAR|\\-4712, 0000, 0001, 0010, 0100, 2018|4 siffer astronomisk år (Oversetter alle tidligere \"-\")  |
    |M|1, 01, 12|Et månedsnummer, ethvert antall siffer (1=januar)  |
    |MM|01, 12|a 2 siffer (null polstret) månedsnummer|
    |MMM|Jan, jan, JAN|en 3 bokstav engelsk måned navn, tilfelle ufølsom|
    |MMMM|jan, jan, jan, jan, januar, januar, januar, januar, januar|3 bokstaver eller full engelsk månedsnavn, tilfelle ufølsom|
    |d|1, 01, 31|et månedsnummer, et antall siffer|
    |dd|01, 31|a 2 siffer (null polstret) dag på måned. Det første \"sifferet\" kan være et rom.|
    |D|1, 001, 366|dag-av-år, ethvert antall siffer, 001=jan 1|
    |DDD|001, 366|dagtid, 3 siffer, 001=jan 1|
    |EEE|Thu, Thu|en 3 bokstavers dag i uken, verdi ignoreres når man tolker|
    |EEEE|Thursday, Thursday, Thursday, Thursday|en 3 bokstaver eller full engelsk dag i uken, tilfelle ufølsom, verdi ignoreres når man tolker|
    |H|0, 00, 23|H time på dagen (0-23) , ethvert antall siffer|
    |HH|00, 23|HH time på dagen (00-23) 2 siffer. Det første \"sifferet\" kan være et rom.|
    |a|am, AM, pm, PM|PM eller PM, case-insensitive|
    |h|12, 1, 01, 11|klokke-timer-av-am-pm (12, 1, 2, ... 11) , ethvert antall siffer|
    |hh|12, 01, 11|klokke-timer-av-am-pm (12, 1, 2, ... 11) 2 siffer. Det første \"sifferet\" kan være et rom.|
    |K|0, 1, 11|time-of-am-pm (0, 1, ...11) , ethvert antall siffer|
    |KK|00, 01, 11|time-of-am-pm, 2 siffer|
    |m|0, 00, 59|minutt på timen, antall siffer|
    |mm|00, 59|timeminutt, 2 siffer|
    |s|0, 00, 59|andre minutt, alle antall siffer|
    |ss|00, 59|andre minutt, 2 siffer|
    |S|0, 000, 9, 999|fraksjon i sekundet, som om etter et desimalpunkt, antall siffer|
    |SS|00, 99|hundredeler av et sekund, 2 siffer|
    |SSS|000, 999|tusenvis av et sekund, 3 siffer|
    |A|0, 0000, 86399999|millisecond-of-day, ethvert antall siffer|
    |AAAAAAAAA|0000000, 86399999|Millisekunder, 8 siffer|
    |N|0.00000000, 86399999999999|nano andre-dag, alle antall siffer. IERDDAP™Dette er avkortet til nMillis.|
    |NNNNNNNNNNN|0000000000, 863999999999999|Nanosecond-of-day, 14 siffer. IERDDAP™Dette er avkortet til nMillis.|
    |n|0 000000000, 59999999999|nanosekund, alle tall. IERDDAP™Dette er avkortet til nMillis.|
    |nnnnnnn|1000000000, 59999999999|Nanosekunder, 11 siffer. IERDDAP™Dette er avkortet til nMillis.|
    |XXX, ZZZ|Z, -08:00, +01:00|en tidssone med formatet «Z» eller ± (2 siffer time offset) :) (2 sifferminutt forskyvning) .. Dette behandler *plass* som + (ikke-standard) .. ZZZ som støtter \"Z\" er ikke-standard, men håndterer en vanlig brukerfeil.|
    |XX, ZZ|Z-0800, +0100|en tidssone med formatet «Z» eller ± (2 siffer time offset) :) (2 sifferminutt forskyvning) .. Dette behandler *plass* som + (ikke-standard) .. ZZ støtter \"Z\" er ikke-standard, men håndterer en vanlig brukerfeil.|
    |X, Z|Z, -08, +01|en tidssone med formatet «Z» eller ± (2 siffer time offset) :) (2 sifferminutt forskyvning) .. Dette behandler *plass* som + (ikke-standard) .. Z som støtter \"Z\" er ikke-standard, men omhandler en vanlig brukerfeil.|
    |xxx|\\-08:00, +01:00|En tidssone med formatet ± (2 siffer time offset) :) (2 sifferminutt forskyvning) .. Dette behandler *plass* som + (ikke-standard) ..|
    |xx|\\-0800, +0100|En tidssone med formatet ± (2 siffer time offset)  (2 sifferminutt forskyvning) .. Dette behandler *plass* som + (ikke-standard) ..|
    |x|\\-08, +01|En tidssone med formatet ± (2 siffer time offset) .. Dette behandler *plass* som + (ikke-standard) ..|
    |\"|'T', 'Z', 'GMT'|start og slutt på en rekke bokstavelige tegn|
    |\" \" (To enkelt sitater)  |\" \"|To enkelt sitater betegner et bokstavelig enkelt sitat|
    | \\[\\] | \\[ \\] |Starten ("\\[") og slutt ("\\]") En valgfri seksjon. Denne notasjonen støttes bare for bokstavlige tegn og i slutten av formatstrengen.|
    |#, &#123;, &#125;|#, &#123;, &#125;|reservert for fremtidig bruk|
    |G,L,Q,e,c,V,z,O,p|     |Disse formateringstegnene støttes avJavaDateTimeFormater, men støttes for tiden ikke avERDDAP.. Hvis du trenger støtte til dem, e-post Chris. John på noaa.gov.|
    
Merknader:
    
    * I en datotid med tegnsetting kan numeriske verdier ha et variabelt antall siffer (For eksempel kan i US-slash-datoformat "1/2/1985", måneden og datoen være 1 eller 2 siffer) så format må bruke 1-bokstavstegn, f.eks. M/d/YYY, som godtar et hvilket som helst antall siffer for måned og dato.
    * Hvis antall siffer for et element er konstant, f.eks. 01/02/1985, angir du antall siffer i formatet, f.eks. MM/dd/YY for 2-sifferent måned, 2-sifferent dato og 4 sifferår.
    * Disse formatene er vanskelig å jobbe med. Et gitt format kan fungere for de fleste, men ikke alle, tidsstrenger for en gitt variabel. Sjekk alltid at formatet du angir fungerer som forventet iERDDAPfor alle av en variabels tidsstrenger.
    * Når det er mulig, vil GenerererDatasetXml foreslå tidsformatstrenger.
    * Hvis du trenger hjelp til å generere en formatstreng, vennligst e-post Chris. John på noaa.gov.

Hovedtidsdatavariabelen (for tabelldatasett) og hovedtidsaksen variabel (for nettbaserte datasett) er anerkjent av[destinationName](#destinationname)Tid. Metadataene deres må være en UDUits-kompatibel enhetsstreng for numeriske tidsverdier, f.eks. "dager siden 1970-01-01" (for tabell- eller gitte datasett) , eller[enheter egnet for strengtider](#string-time-units), f.eks.  "M/d/YY" (for tabelldatasett) ..

Ulike tidsenheter i forskjellige grupper.ncFiler - Hvis du har en samling gitt.ncfiler der én del av filene for tidsvariabelen bruker forskjellige tidsenheter enn en eller flere andre undergrupper av filene, kan du bruke[EDDGridFraNcFilesUpakket](#eddgridfromncfilesunpacked).. Det konverterer tidsverdier til"seconds since 1970-01-01T00:00:00Z"på et lavere nivå, og dermed skjule forskjellene, slik at du kan gjøre ett datasett fra samling av heterogene filer.

###### TimeStamp Variabler{#timestamp-variables} 
[TimeStamp Variabler](#timestamp-variables)-- Enhver annen variabel (axisVariableellerdataVariableI enEDDGrideller EDDTable datasett) kan være en tidsstemplevariabel. Timestamp variabler er variabler som har tidsrelaterte enheter og tidsdata, men har en&lt;destinationNameAndre enn tiden. TimeStamp variabler oppfører seg som den viktigste tidsvariabelen ved at de konverterer kildens tidsformat til"seconds since 1970-01-01T00:00:00Z"og/eller ISO 8601:2004 (E) format).ERDDAP™gjenkjenner tiden Stempelvariabler av deres tidsrelaterte[enheter](#units)" metadata, som må matche dette regulære uttrykket "\\[a-zA-Z\\]+ + siden +\\[0-9\\].+" (for numerisk dato For eksempel tider,"seconds since 1970-01-01T00:00:00Z") eller være en dato Tidsformatstreng som inneholder "uuu", "yyyyYY" eller "YYYZ" (For eksempel:yyyy-MM-dd'T'HH:mm:ssZ-) .. Men vær så snill å brukedestinationName "time"for hoveddatoen Tidsvariabel.

 **Kontroller alltid arbeidet ditt for å være sikker på at tidsdataene som dukker opp iERDDAP™Det er riktige tidsdata.** Å jobbe med tidsdata er alltid vanskelig og feil utsatt.

Se[mer informasjon om tidsvariabler](#destinationname)..
ERDDAP™har et verktøy til[Konverter et tall Tid til/fra en strengtid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)..
Se[HvordanERDDAP™Avtaler med tiden](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)..
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** , eller **valid\\_min** og **valid\\_max** ](#valid_range)-- Disse er valgfrie variable attributter definert i[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatakonvensjoner. For eksempel

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

eller

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Hvis det er tilstede, bør de være av samme datatype som variabelen, og angi de gyldige minste- og maksimumsverdiene til dataene for den variabelen. Brukere bør vurdere verdier utenfor dette området å være ugyldige.
    *   ERDDAP™gjelder ikkevalid\\_range.. Sa en annen måte:ERDDAP™konverterer ikke dataverdier utenforvalid\\_rangetil \\_fylken Verdi ellermissing\\_value..ERDDAP™Bare passerer på dette metadataet og etterlater programmet opp til deg.
Hvorfor? Det er det denne metadataen er for. Hvis dataleverandøren hadde ønsket å, kunne dataleverandøren ha konvertert dataverdiene utenforvalid\\_rangeå være \\_FallValues.ERDDAP™Gir ikke dataleverandøren andre gang. Denne tilnærmingen er tryggere: hvis det senere er vist atvalid\\_rangevar for smal eller på annen måte feil,ERDDAP™Jeg vil ikke ha utgitt dataene.
    * Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor),valid\\_range,valid\\_minogvalid\\_maxbør være den pakkede datatypen og verdiene. SidenERDDAP™gjelderscale\\_factorogadd\\_offsetnår det laster datasettet,ERDDAP™vil pakke oppvalid\\_range,valid\\_minogvalid\\_maxverdier slik at destinasjonens metadata (Vist til brukere) vil indikere utpakket datatype og område.
Hvis en pakketvalid\\_rangeAttribut er tilstede, det vil bli omdøptvalid\\_rangeNårERDDAP™Laster datasettet.
##### &lt;removeMVRoads&gt;{#removemvrows} 
* [ ** &lt;fjerneMV-rader&gt; ** ] (#removemvrows) er en valgfri tagg i en etikett idatasets.xmlfor EDDTableFra Filer (Inkludert alle underklasser) datasett, men det brukes kun for EDDTableFromMultidimNcFiles. Det kan ha en verdi av sant eller falskt. For eksempel sant
Dette fjerner en hvilken som helst blokk av rader i slutten av en gruppe der alle verdiene ermissing\\_value,  \\_FillValue, eller CoHort ... Array innfødt manglende verdi (eller char=#32 for CharArrays) .. Dette er for CF DSG Multidimensional Array filtypen og lignende filer. Hvis det er sant, gjør dette den riktige testen og så alltid laster alle max dim variabler, så det kan ta ekstra tid.
Standardverdien av er falsk.
Anbefaling -- Hvis det er mulig for datasettet, anbefaler vi at du fjerner MV-rader til feil. Å sette fjerneMVRows til sanne kan betydelig bremse forespørsler, men kan være nødvendig for enkelte datasett.
