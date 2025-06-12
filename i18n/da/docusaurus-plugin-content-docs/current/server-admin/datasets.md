---
title: "ERDDAP™ - Working with the datasets.xml File"
sidebar_position: 3
---
# Arbejde med arbejdetdatasets.xmlFilen fil

\\[Denne webside vil kun være af interesse forERDDAP™Administratorer.\\]

Efter du har fulgt denERDDAP™ [installationsvejledning](/docs/server-admin/deploy-install), du skal redigeredatasets.xmlfil i *Tomcat* /content/erddap/ til at beskrive de datasæt, som dine dataERDDAP™installation vil tjene.

Du kan se et eksempel[datasets.xmlpå GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).

- - - - -

## [Introduktion](#introduction) {#introduction} 

### Nogle konting påkrævet{#some-assembly-required} 
Opsætning af et datasæt iERDDAP™er ikke bare et spørgsmål om at pege på datasættets mappe eller URL. Du skal skrive en smule XML fordatasets.xmlsom beskriver datasættet.

* For gitterede datasæt, for at gøre datasættet i overensstemmelse medERDDAP's datastruktur for gitterded data, skal du identificere en del af datasættet's variabler, der deler de samme dimensioner. ([Hvorfor?](#why-just-two-basic-data-structures) [Hvordan?](#dimensions)) 
* Datasættets aktuelle metadata importeres automatisk. Men hvis du vil ændre disse metadata eller tilføje andre metadata, skal du angive det idatasets.xml. Og og ogERDDAP™behov for andre metadata, herunder[globale attributter](#global-attributes)  (f.eks.infoUrl, institution,sourceUrl, oversigt og titel) og og og[variable egenskaber](#variable-addattributes)  (f.eks.long\\_nameog enheder) . Ligesom de metadata, der er i øjeblikket i datasættet, tilføjer beskrivende oplysninger til datasættet, de metadata, der er anmodet om afERDDAP™tilføjer beskrivende oplysninger til datasættet. Yderligere metadata er en god tilføjelse til dit datasæt og hjælperERDDAP™Gør et bedre job for at præsentere dine data for brugere, der ikke er bekendt med det.
*   ERDDAP™behov for at gøre særlige ting med[længde, bredde, højde (eller dybde) , og tidsvariabler](#destinationname).

Hvis du køber i disse idéer og fremskynder indsatsen for at oprette XML fordatasets.xml, du får alle fordelene vedERDDAP™, herunder:

* Fuld tekstsøgning for datasæt
* Søg efter datasæt efter kategori
* Data Access-formularer ( *datasetID* .html) så du kan anmode om en delsæt af data i mange forskellige filformater
* Forms til at anmode grafer og kort ( *datasetID* .ografi) 
* Web Map Service (WMS) til gitterede datasæt
*   RESTfuladgang til dine data

Gøre detdatasets.xmltager stor indsats for de første par datasæt, men **det bliver nemmere** . Efter de første datasæt, kan du ofte genbruge en masse af dit arbejde for det næste datasæt. Heldigvis,ERDDAP™leveres med to[Værktøjsværktøjer](#tools)for at hjælpe dig med at oprette XML for hver datasæt idatasets.xml.
Hvis du sidder fast, se vores[sektion om at få ekstra støtte](/docs/intro#support).

### Dataudbyder Form Form Form{#data-provider-form} 
Når en dataudbyder kommer til dig i håb om at tilføje nogle data til dine dataERDDAP, det kan være svært og tidskrævende at indsamle alle metadata (Oplysninger om datasættet) nødvendig for at tilføje datasættet tilERDDAP. Mange datakilder (for eksempel .csv-filer, Excel-filer, databaser) har ingen interne metadata, såERDDAP™har en Dataudbyder Form, der samler metadata fra dataudbyderen, og giver dataudbyderen en anden vejledning, herunder omfattende vejledning til[Data i Databaser](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). De oplysninger, der indsendes, overføres tildatasets.xmlformat og derefter e-mailet til detERDDAP™Administrator (dig du) og skrevet (tilføjet) til at til *bigParentDirectory* /logs/dataProviderForm.log . Således danner formularen halvautomatiske processen med at få et datasæt iERDDAP, men denERDDAP™Administratoren skal stadig fuldføredatasets.xmlchunk and deal med at få datafilen (s s s) fra udbyderen eller forbindelsen til databasen.

Indsendelsen af faktiske datafiler fra eksterne kilder er en enorm sikkerhedsrisiko, såERDDAP™beskæftiger ikke med det. Du skal finde ud af en løsning, der fungerer for dig og dataudbyderen, f.eks. e-mail (til små filer) , træk fra skyen (f.eks. DropBox eller Google Drive) , en sftp site (med adgangskoder) , eller sneaker Net Net Net Net (en USB tommelfinger drev eller ekstern harddisk) . Du bør sandsynligvis kun acceptere filer fra folk, du kender. Du bliver nødt til at scanne filerne for virus og tage andre sikkerhedsforanstaltninger.

Der findes ikke et link iERDDAP™til Dataudbyderen Form (f.eks. på bagsidenERDDAP™Forsideside) . I stedet, når nogen fortæller dig, at de vil have deres data serveret af dine dataERDDAP, du kan sende dem en e-mail, der siger noget som:
Ja, vi kan få dine data tilERDDAP. For at komme i gang skal du udfylde formularen på https://*yourUrl*/erddap/dataProviderForm.html   (eller eller ellerhttp://hvishttps://er ikke aktiveret) .
Når du er færdig, kontakter jeg dig for at arbejde ud af de sidste detaljer.
Hvis du bare vil se på formularen (uden at fylde det ud) , du kan se formularen påERD'sERDDAP:[Introduktion](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html),[Del 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html),[Del 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html),[Del 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html), og[Del 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). Disse links påERD ERDDAP™sende oplysninger til mig, ikke dig, så send ikke oplysninger med dem, medmindre du rent faktisk ønsker at tilføje data til deERD ERDDAP.

Hvis du vil fjerne dataudbyderens formular fra din kontoERDDAP™, sætte
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
i din opsætning.xml-fil.

Udvikleren for dette varNOAA's 2014[Offentlig adgang til forskningsresultater (PARR) Direktivdirektiv](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf), som kræver, at altNOAAmiljødata, der er finansieret via skatteydere, stilles til rådighed via en datatjeneste (Ikke bare filer) inden for 12 måneder efter skabelse. Så der er øget interesse for brugERDDAP™for at gøre datasets tilgængelige via en service ASAP. Vi havde brug for en mere effektiv måde at håndtere et stort antal dataudbydere.

Feedback/forespørgsler? Denne formular er ny, så send en mailerd dot data at noaa dot govhvis du har feedback eller forslag til forbedring af dette.

### Værktøjsværktøjer{#tools} 
ERDDAP™leveres med to kommandolinjeprogrammer, der er værktøjer til at hjælpe dig med at oprette XML for hver datasæt, som du ønsker, at dinERDDAP™at tjene. Når du har oprettetERDDAP™og køre det (mindst én gang) , du kan finde og bruge disse programmer i programmerne *Tomcat* /webapps/erddap/WEB-INF-mappen. Der er Linux/Unix shell scripts (med udvidelsen .sh) og Windows scripts (med udvidelsen .bat) for hvert program.\\[På Linux kører disse værktøjer som den samme bruger (Tomcat?) det vil køre Tomcat.\\]Når du kører hvert program, vil det spørge dig spørgsmål. Skriv et svar, og tryk derefter på Enter. Eller tryk på ^C for at afslutte et program til enhver tid.

#### Program kører ikke?{#program-wont-run} 

* Hvis du får et ukendt program (eller lignende) fejlmeddelelse, problemet er sandsynligvis, at operativsystemet ikke kunne findeJava. Du skal finde ud af, hvorJavaer på din computer, og redigere java-referencen i .bat eller .sh-filen, du forsøger at bruge.
* Hvis du får en jarfil ikke fundet eller klasse ikke fandt fejlmeddelelse, såJavakunne ikke finde en af de klasser, der er opført i .bat eller .sh-filen, du forsøger at bruge. Løsningen er at finde ud af, hvor den .jar fil er, og redigere java-referencen til det i .bat eller .sh-filen.
* Hvis du bruger en version afJavadet er for gammel for et program, programmet kører ikke, og du vil se en fejlmeddelelse som
Undtagelse i tråd "main" java.lang.UunderstøttetClassVersion Fejl:
     *nogle/klasse/navn* : Ustøttet større.minor version *nogle tal*   
Løsningen er at opdatere til den seneste version afJavaTjek den .sh eller .bat fil for programmet bruger den.

#### Værktøjerne udskriver forskellige diagnostiske meddelelser:{#the-tools-print-various-diagnostic-messages} 

* Ordet "ERROR" bruges, når noget gik så galt, at proceduren mislykkedes at fuldføre. Selvom det er irriterende at få en fejl, de fejlkræfter, du kan håndtere problemet.
* Ordet "WARNING" bruges, når noget gik galt, men proceduren var i stand til at blive afsluttet. Disse er temmelig sjældne.
* Alt andet er bare en informativ besked. Du kan tilføje \\-verbose til den[GenererDatasetsXml](#generatedatasetsxml)eller eller eller[Billeder af DasDds](#dasdds)kommandolinje for at få yderligere informative beskeder, som nogle gange hjælper med at løse problemer.

De to værktøjer er en stor hjælp, men du skal stadig læse alle disse instruktioner på denne side omhyggeligt og træffe vigtige beslutninger selv.

### GenererDatasetsXml{#generatedatasetsxml} 
*    **GenererDatasetsXml** er et kommandolinjeprogram, der kan generere et groft udkast til datasæt XML for næsten enhver type datasæt.
    
Vi STRONGLY RECOMMEND, som du bruger GenererDatasets Xml i stedet for at skabe chunks afdatasets.xmlhånd, fordi:
    
    * GenererDatasets Xml arbejder på få sekunder. At gøre dette ved hånden er mindst en times arbejde, selv når du ved, hvad du laver.
    * GenererDatasets Xml gør et bedre job. At gøre dette ved hånden kræver omfattende viden om, hvordanERDDAP™værker. Det er usandsynligt, at du vil gøre et bedre job ved hånden. (Bob Simons bruger altid GenererDatasets Xml for første udkast, og han skrevERDDAP.) 
    * GenererDatasets Xml genererer altid en gyldig klump afdatasets.xml. Alle stykker afdatasets.xmlat du skriver vil sandsynligvis have mindst et par fejl, der forhindrerERDDAP™fra at indlæse datasættet. Det tager ofte mennesker timer at diagnosticere disse problemer. Spil ikke din tid. Lad Generer Datasæt Xml gør det hårde arbejde. Så kan du forfine .xml ved hånden, hvis du ønsker det.
    
Når du bruger GenererDatasets Xml program:
    
    * På Windows, den første gang du kører GenererDatasetsetsXml, skal du redigere GenererDatasetsXml.bat-filen med en tekst editor til at ændre stien til java. exe fil, så Windows kan findeJava.
    * GenererDatasets Xml beder dig først angive EDDType (Erd Dap Dataset Type Type Type Type) af datasættet. Se billederne[Liste over datasættyper](#list-of-types-datasets)  (i dette dokument) at finde ud af, hvilken type der er egnet til den datasæt, du arbejder på. Ud over de almindelige EDDTypes er der også et par[Special/Pseudo Dataset Typer](#specialpseudo-dataset-types)  (f.eks., som crawler et THREDDS-katalog for at generere en klump afdatasets.xmlfor hver af datasæt i kataloget) .
    * GenererDatasets Xml beder dig derefter en række spørgsmål, der er specifikke for EDDType. Spørgsmålne indsamler de nødvendige oplysningerERDDAP™at få adgang til datasættets kilde. At forstå, hvadERDDAP™spørges om, se dokumentationen for den EDDType, du har angivet ved at klikke på den samme datasæt type i den[Liste over datasættyper](#list-of-types-datasets).
        
Hvis du har brug for at indtaste en streng med specielle tegn (f.eks. hvide rumtegn i begyndelsen eller slutningen, ikke-ASCII tegn) Indtast en[JSON-stilstreng](https://www.json.org/json-en.html)  (med særlige tegn flygtet med "tegn) . Hvis du f.eks. vil indtaste en fanefigur, skal du indtaste "" (med de omgivende dobbelte citater, som fortællerERDDAP™at dette er en JSON-stil streng.
        
    * Ofte vil en af dine svar ikke være, hvad GenererDatasetsXml har brug for. Du kan derefter prøve igen med reviderede svar på spørgsmålene, indtil GenererDatasets Xml kan med succes finde og forstå kildedata.
    * Hvis du besvarer spørgsmålene korrekt (eller tilstrækkeligt korrekt) , GenererDatasets Xml vil forbinde til datasættets kilde og indsamle grundlæggende oplysninger (f.eks. variable navne og metadata) .
Til datasæt, der er fra lokaleNetCDF .ncog relaterede filer, GenererDatasets Xml vil ofte udskrive ncdump-lignende struktur af filen, efter at den først læser filen. Dette kan give dig oplysninger til at besvare spørgsmål bedre på en efterfølgende sløjfe gennem GenererDatasetsXml.
    * GenererDatasets Xml vil derefter generere et groft udkast til dataset XML for den datasæt.
    * Diagnostiske oplysninger og det grove udkast til datasættet XML vil blive skrevet til *bigParentDirectory* /logs/GenerateDatasetsXml.log .
    * Det grove udkast til datasættet XML vil blive skrevet til *bigParentDirectory* /logs/GenerateDatasetsXml.out .
#### "0 filer" Fejlmeddelelse{#0-files-error-message} 
Hvis du kører GenererDatasets Xml eller[Billeder af DasDds](#dasdds), eller hvis du forsøger at indlæse enEDDGridFra...Filer eller EDDTableFra... Filer datasæt iERDDAP™, og du får en "0 filer" fejlmeddelelse, der angiver, atERDDAP™fundet 0 matchende filer i mappen (når du tror, at der er matchende filer i denne mappe) :
* Tjek, at du har angivet det fulde navn på mappen. Og hvis du angiver prøve filnavnet, skal du sørge for at angive filens fulde navn, herunder det fulde mappenavn.
* Tjek, at filerne virkelig er i denne mappe.
* Tjek stavemåden af mappenavnet.
* Tjek filenNameRegex. Det er virkelig nemt at lave fejl med regexes. Prøv regex .\\*, som skal matche alle filnavne. (Se dette[Indeks dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og og og[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
* Kontroller, at brugeren, der kører programmet (f.eks. bruger=tomcat (?) for Tomcat /ERDDAP) har 'læs' tilladelse til disse filer.
* I nogle operativsystemer (for eksempel SELinux) Afhængigt af systemindstillinger skal brugeren, der løb programmet, have "læs" tilladelse til hele kæden af mapper, der fører til den mappe, der har filerne.


* Hvis du har problemer, du ikke kan løse,[Anmod om support](/docs/intro#support)med så mange oplysninger som muligt. På samme måde, hvis det synes som den passende EDDType til et givent datasæt ikke virker med den datasæt, eller hvis der ikke er passende EDDType, skal du indsende en[emne på GitHub](https://github.com/ERDDAP/erddap/issues)med detaljerne (og en prøvefil, hvis relevant) .
         
#### Du skal redigere output fra GenererDatasets Xml for at gøre det bedre.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* Ansættelse:
Omfangetdatasets.xmlMADE BE GenererDatasets Xml ISN'T PERFECT. DU SKAL læse og EDIT te XML B, før det amerikanske IT i en PUBLICERDDAP. GenererDatasets Xml RELIES ON A LOT OF RULES-OF-THUMB WHICH AREN'T ALWAYS CORRECT. DIG er RESPONSIBLE FOR ENSURING CORRECTNESS af XML, at du kanERDDAP'S'datasets.xmlFILE.
    
     (Fun Fact: Jeg råber ikke. Af historiske juridiske årsager skal ansvarsfraskrivelserne skrives i alle caps.) 
    
Resultatet af GenererDatasetsXml er et groft udkast.
Du bliver næsten altid nødt til at redigere det.
Vi har lavet og fortsætter med at gøre en enorm indsats for at gøre output så klar til at gå så muligt, men der er grænser. Ofte er nødvendige oplysninger simpelthen ikke tilgængelige fra kilde metadata.
    
Et grundlæggende problem er, at vi spørger et computerprogram (GenererDatasetsXml) at gøre en opgave, hvor, hvis du gav den samme opgave til 100 personer, ville du få 100 forskellige resultater. Der er ingen enkelt "højre" svar. Naturligvis, programmet kommer tættest på at læse Bob's sind (ikke dine) , men selv så, er det ikke en all-understående AI-program, bare en masse hæuristiskes flettet sammen for at gøre en AI-lignende opgave. (Denne dag for et all-understående AI program kan komme, men det har endnu ikke. Hvis / når det gør, kan vi mennesker have større problemer. Vær forsigtig, hvad du ønsker.) 
    
* Til informationsmæssige formål viser outputtet den globale kildeAttributes og variable kildeAttributes som kommentarer.ERDDAP™kombinerer kildetildelinger ogaddAttributes  (som har forrang) at gøre den kombinerede Attributter, der vises til brugeren. (Og andre attributter tilføjes automatisk til længde, breddegrad, højde, dybde og tidsvariabler, nårERDDAP™faktisk gør datasættet) .
     
* Hvis du ikke kan lide en kildeAttribute, overskrive det ved at tilføje en addAttribute med det samme navn, men en anden værdi (eller ingen værdi, hvis du vil fjerne det) .
     
* Alle afaddAttributeser computergenererede forslag. Rediger dem&#33; Hvis du ikke kan lide en addAttribute, skal du ændre det.
     
* Hvis du vil tilføje andreaddAttributesTilføj dem.
     
* Hvis du vil ændre endestinationName, ændre det. Men ikke ændresourceNames.
     
* Du kan ændre rækkefølgen af ordrendataVariables eller fjerne nogen af dem.


    * Du kan derefter bruge[Billeder af DasDds](#dasdds)  (se nedenfor) til gentagne gange teste XML for den datasæt for at sikre, at den resulterende datasæt vises, som du ønsker det iERDDAP.
    * Du er velkommen til at foretage små ændringer idatasets.xmlchunk, der blev genereret, f.eks. give en bedreinfoUrl, oversigt eller titel.
#### Tilføj ikkeStandardnavne{#donotaddstandardnames} 
Hvis du indeholder \\-doNotAddStandardNames som en kommandolinjeparameter, når du kører Datasæt Xml, generere Datasæt Xml vil ikke tilføjestandard\\_nameTil højreaddAttributesfor andre variabler end variabler ved navn breddegrad, længde, højde, dybde eller tid (som har indlysendestandard\\_names s s) . Dette kan være nyttigt, hvis du bruger output fra generere Datasæt Xml direkte iERDDAP™uden at redigere output, fordi generere Datasæt Xml ofte gætterstandard\\_names forkert. (Bemærk, at vi altid anbefaler, at du redigerer output, før du bruger det iERDDAP.) Brug af denne parameter vil have andre mindre relaterede effekter, fordi gættetstandard\\_namebruges ofte til andre formål, f.eks. til at oprette en nylong\\_name, og for at oprette farveBar indstillinger.
#### scripts{#scripting} 
Som alternativ til at besvare spørgsmål interaktivt på tastaturet og looping for at generere yderligere datasæt, kan du give kommandolinje argumenter for at besvare alle spørgsmål for at generere et datasæt. GenererDatasets Xml vil behandle disse parametre, skrive output til outputfilen, og afslutte programmet.
        
Hvis du vil konfigurere dette, skal du først bruge programmet i interaktiv tilstand og skrive dine svar. Her er et delvis eksempel:
Lad os sige, at du kører scriptet: ./GenerateDatasetsXml.sh
Indtast derefter: EDDTableFraAsciiFiles
Indtast derefter: /u00/data/
Indtast derefter: .\\*".asc
Indtast derefter: /u00/data/sampleFile.asc
Indtast derefter: ISO-8859-1
        
Hvis du vil køre dette på en ikke-interaktiv måde, skal du bruge denne kommandolinje:
./GenerateDatasetsXml.sh EDDTableFraAsciiFiles /u00/data/.\\*".asc /u00/data/sampleFile.asc ISO-8859-1
Så dybest set, du bare liste alle svarene på kommandolinjen.
Dette bør være nyttigt for datasæt, der ændrer sig ofte på en måde, der necessitaterer re-running GenerDatasetsets Xml (mærkbartEDDGridFraThreddsCatalog) .
        
Detaljer:

* Hvis en parameter indeholder et rum eller nogle særlige tegn, skal du indtaste parameteren som en[JSON-stilstreng](https://www.json.org/json-en.html)f.eks. "my parameter med rum og to\\nlinjer".
* Hvis du vil angive en tom streng som parameter, skal du bruge: intet
* Hvis du vil angive standardværdien af en parameter, skal du bruge: standard
             
* GenererDatasets Xml understøtter en -i *Datasæt XmlName* # # # # *Mærkenavn* kommandolinje parameter, der indsætter outputet i det angivnedatasets.xmlfilfil (Standarden er *Tomcat* /indhold / indhold /datasets.xml) . GenererDatasets Xml ser efter to linjer i datasæt XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
og og og
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
og erstatter alt i mellem disse linjer med det nye indhold, og ændrer det tidspunkt.
* -i-kontakten behandles kun (og ændringer idatasets.xmler kun lavet) hvis du kører GenererDatasets Xml med kommandolinje argumenter, der angiver alle svarene på alle spørgsmål for en loop af programmet. (Se 'Scripting' ovenfor.)   (Tanken er: Denne parameter er til brug med scripts. Hvis du bruger programmet i interaktiv tilstand (Skriveinfo på tastaturet) , du er tilbøjelige til at generere nogle forkerte bundter af XML, før du genererer den, du ønsker.) 
* Hvis start- og slutlinjerne ikke findes, indsættes disse linjer og det nye indhold lige før&lt;/erddapDatasets&gt;.
* Der er også en -I (kapital i) skifte til testformål, der fungerer det samme som -i, men skaber en fil kaldetdatasets.xml *Datotid* og foretager ikke ændringerdatasets.xml.
* Kør ikke GenererDatasets Xml med -i i to processer på én gang. Der er en chance kun et sæt ændringer vil blive holdt. Der kan være alvorlige problemer (for eksempel beskadigede filer) .
    
Hvis du bruger "GenerateDatasetsXml -verbose", vil det udskrive flere diagnostiske meddelelser end normalt.
    
#### Special/Pseudo Dataset Typer{#specialpseudo-dataset-types} 
Generelt indstillingerne for EDDType i GenererDatasets Xml match af EDD-typer, der er beskrevet i dette dokument (Se det her[Liste over datasættyper](#list-of-types-datasets)) og generere endatasets.xmlGnid at oprette et datasæt fra en bestemt datakilde. Der er et par undtagelser og særlige tilfælde:
    
##### EDDGridFraErddap{#eddgridfromerddap} 
Denne EDDType genererer alledatasets.xmlbidder, der er nødvendige for at gøre[EDDGridFraErddap](#eddfromerddap)Datasets fra alleEDDGridDatasæt i en fjernERDDAP. Du vil have mulighed for at holde den oprindeligedatasetIDs s s (som kan duplikere nogledatasetIDs allerede i dinERDDAP) eller generere nye navne, der vil være unikke (men normalt ikke som menneskelæsbar) .
     
##### EDDTableFraErddap{#eddtablefromerddap} 
Denne EDDType genererer alledatasets.xmlbidder, der er nødvendige for at gøre[EDDTableFraErddap](#eddfromerddap)Datasæt fra alle EDDTable datasæt i en fjernbetjeningERDDAP. Du vil have mulighed for at holde den oprindeligedatasetIDs s s (som kan duplikere nogledatasetIDs allerede i dinERDDAP) eller generere nye navne, der vil være unikke (men normalt ikke som menneskelæsbar) .
     
##### EDDGridFraThreddsCatalog{#eddgridfromthreddscatalog} 
Denne EDDType genererer alledatasets.xmlbidder, der er nødvendige for alle[EDDGridFraDap](#eddgridfromdap)Datasæt, at det kan finde ved at crawle reursivt gennem aEDDS (sub) katalog. Der er mange former for THREDDS katalog URLs. Denne mulighed REQUIRES a THREDDS .xml URL med /catalog/i det f.eks.
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml eller eller eller
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(en relateret .html katalog er på
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html , som ikke er acceptabel forEDDGridFraThreddsCatalog.
Hvis du har problemer medEDDGridFromThredds Katalog:
* Sørg for, at den webadresse, du bruger, er gyldig, omfatter /catalog/ og slutter med /catalog.xml .
* Hvis det er muligt, skal du bruge en offentlig IP-adresse (for eksempel, https://oceanwatch.pfeg.noaa.gov ) i webadressen, ikke en lokalnumerisk IP-adresse (for eksempel, https://12.34.56.78 ) . Hvis du kun er tilgængelig via den lokale numeriske IP-adresse, kan du bruge [&lt;konvertereToPublicSourceUrl&gt;] (#converttopublicsourceurl) så så sådanERDDAP™Brugere ser den offentlige adresse, selvomERDDAP™Få data fra den lokale numeriske adresse.
* Hvis du har problemer, du ikke kan løse,[Tjek fejlfindingstips](#troubleshooting-tips).
* Den lave niveaukode til dette bruger nuUnidataNetcdf-java katalog crawler kode (Tømmermænd. Katalog klasser) så det kan håndtere alle THREDDS kataloger (som kan være overraskende kompleks) Tak tilUnidatafor denne kode.
         
##### EDDGridLonPM180FraErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Denne EDDType generererdatasets.xmlat gøre[EDDGridLonPM180](#eddgridlonpm180)Datasets fra alleEDDGridDatasæt i enERDDAPder har alle længdeværdier større end 180.
* Hvis det er muligt, skal du bruge en offentlig IP-adresse (for eksempel, https://oceanwatch.pfeg.noaa.gov ) i webadressen, ikke en lokalnumerisk IP-adresse (for eksempel, https://12.34.56.78 ) . Hvis det er tilfældetERDDAP™er kun tilgængelig via den lokale numeriske IP-adresse, du kan bruge [&lt;konvertereToPublicSourceUrl&gt;] (#converttopublicsourceurl) så så sådanERDDAP™Brugere ser den offentlige adresse, selvomERDDAP™Få data fra den lokale numeriske adresse.
         
##### EDDGridLon0360FraErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Denne EDDType generererdatasets.xmlat gøre[EDDGridLon0360](#eddgridlon0360)Datasets fra alleEDDGridDatasæt i enERDDAPder har alle længdeværdier mindre end 0.
* Hvis det er muligt, skal du bruge en offentlig IP-adresse (for eksempel, https://oceanwatch.pfeg.noaa.gov ) i webadressen, ikke en lokalnumerisk IP-adresse (for eksempel, https://12.34.56.78 ) . Hvis det er tilfældetERDDAP™er kun tilgængelig via den lokale numeriske IP-adresse, du kan bruge [&lt;konvertereToPublicSourceUrl&gt;] (#converttopublicsourceurl) så så sådanERDDAP™Brugere ser den offentlige adresse, selvomERDDAP™Få data fra den lokale numeriske adresse.
         
##### EDDsFraFiles{#eddsfromfiles} 
I betragtning af en startmappe, denne krydser mappen og alle undermapper og forsøger at oprette et datasæt for hver gruppe af datafiler, som den finder.
* Dette forudsætter, at når et datasæt findes, indeholder datasættet alle undermapper.
* Hvis et datasæt findes, vil lignende søskende mapper blive behandlet som separate datasæt (For eksempel vil mapper til 1990'erne generere separate datasæt) . De skal være nemme at kombinere med hånd - bare ændre de første datasæt's&lt;FileDir&gt; til forældremappen og slette alle de efterfølgende søskende datasæt.
* Dette vil kun forsøge at generere en bid afdatasets.xmlfor den mest almindelige type filudvidelse i en mappe (ikke tælle .md5, som ignoreres) . Så givet en mappe med 10.ncfiler og 5 .txt-filer, vil et datasæt blive genereret til datasættet.ncfiler kun.
* Dette forudsætter, at alle filer i en mappe med samme udvidelse tilhører i samme datasæt. Hvis en mappe har nogle.ncfiler med SST-data og nogle.ncfiler med chlorophyll data, bare en prøve.ncfil vil blive læst (SST? Hvad er klophyll?) og kun én datasæt vil blive skabt til den type fil. At datasæt sandsynligvis undlade at indlæse på grund af komplikationer fra at forsøge at indlæse to typer filer i samme datasæt.
* Hvis der er færre end 4 filer med den mest almindelige udvidelse i en mappe, antager dette, at de ikke er datafiler og bare springe over mappen.
* Hvis der er 4 eller flere filer i en mappe, men det kan ikke med succes generere en klump afdatasets.xmlfor filerne (for eksempel en ikke-understøttet filtype) , dette vil generere en[EDDTableFraFileNames](#eddtablefromfilenames)Datasæt til filerne.
* I slutningen af diagnostics, at denne skriver til logfilen, lige før logfilendatasets.xmlDet vil udskrive en tabel med en oversigt over oplysninger indsamlet ved at trække alle undermapper. Tabellen vil liste alle undermapper og angive den mest almindelige type filudvidelse, det samlede antal filer, og hvilken type datasæt blev skabt til disse filer (hvis nogen) . Hvis du står over for en kompleks, dybt indlejret filstruktur, skal du overveje at køre GenererDatasetsets Xml med EDDType=EDDsFraFiles bare for at generere disse oplysninger,
* Denne mulighed kan ikke gøre et stort job med at gætte den bedste EDDType til en given gruppe af datafiler, men det er hurtigt, nemt og værd en prøve. Hvis kildefiler er egnede, fungerer det godt og er et godt første skridt i at generere detdatasets.xmlfor et filsystem med masser af undermapper, hver med datafiler fra forskellige datasæt.
         
##### EDDTableFraEML og EDDTableFraEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Disse særlige EDDType genererer dendatasets.xmlat lave en[EDDTableFraAsciiFiles](#eddtablefromasciifiles)datasæt fra hver af de tabeller, der er beskrevet i en[Ecological Metadata Sprog](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML-fil. Den "Batch" variant arbejder på alle EML-filer i en lokal eller fjern mappe. Se venligst den separate[dokumentation for EDDTableFraEML](/docs/server-admin/EDDTableFromEML).
     
##### EDDTableFraInPort{#eddtablefrominport} 
Denne særlige EDDType genererer dendatasets.xmlat lave en[EDDTableFraAsciiFiles](#eddtablefromasciifiles)Datasæt fra oplysningerne i et[iport-xml](https://inport.nmfs.noaa.gov/inport)fil. Hvis du kan få adgang til kildedatafilen (inport-xml-filen skal have spor for, hvor man finder den) , du kan lave et arbejdsdatasæt iERDDAP.

Følgende trin beskriver, hvordan du bruger GenererDatasets Xml med en inport-xml-fil for at få et arbejdsdatasæt iERDDAP.

1. Når du har adgang til inport-xml-filen (enten som URL eller en lokal fil) : run GenererDatasets Xml, angive EDDType=EDDTableFraInPort, angive inport-xml URL eller fuld filnavn, angive, hvilkeChild=0, og angive de andre ønskede oplysninger (hvis kendt) . (På dette tidspunkt behøver du ikke at have kildedatafilen eller angive dens navn.) Den somChild=0 indstilling fortæller GenererDatasets Xml til at skrive oplysninger om **alle** af&lt;Virksomhedsoplysninger&gt;&lt;enhed&gt;'s i inport-xml-filen (hvis der er nogen) . Det udskriver også en baggrundsinformationsoversigt, herunder alle download-url's opført i inport-xml-filen.
2. Kig gennem alle disse oplysninger (herunder baggrundsoplysninger, der GenererDatasets Xml print) og besøg download-url (s s s) for at forsøge at finde kildedatafilen (s s s) . Hvis du kan finde det (dem dem dem) Hent det (dem dem dem) i en mappe, der er tilgængeligERDDAP. (Hvis du ikke kan finde nogen kildedatafiler, er der ingen point i proces.) 
3. Løber Datasæt Xml igen.
Hvis kildedatafilen svarer til en af inport-xml-filens&lt;Virksomhedsoplysninger&gt;&lt;enhed&gt;'s, angive, hvilkeChild= *Denne enheds taltal*   (f.eks. 1, 2, 3, ...) .ERDDAP™vil forsøge at matche kolonnenavnene i kildedatafilen til navne i enhedsoplysningerne og bede om at acceptere/reject/fix enhver discrepancies.
Eller hvis inport-xml-filen ikke har nogen&lt;Virksomhedsoplysninger&gt;&lt;enhed&gt;'s, angive, hvilkeChild=0.
4. I bunden afdatasets.xmldet blev lavet af GenererDatasets Xml, revidere [global&lt;addAttributes&gt;] (#global-attributes) efter behov/desired.
5. I bunden afdatasets.xmlder blev lavet af GenererDatasetsXml, tilføje / opsyn [&lt;dataVariable&gt;] (#datavariable) Oplysninger efter behov/desired til at beskrive hver af variablerne. Sørg for, at du korrekt identificerer hver variabels
[ []&lt;sourceName&gt;] (#sourcenavn)   (som det vises i kilden) ,
[ []&lt;destinationName&gt;] (# destinationnavn)   (som har flere begrænsninger på tilladte tegn endsourceName) ,
[ []&lt;enheder&gt;] (#enheder)   (især hvis det er en[tid eller timetamp variabel](#timestamp-variables)hvor enhederne skal angive formatet) , og
[ []&lt;missing\\_value&gt;] (#missing_værdi) ,
6. Når du er tæt på at afslutte, bruger gentagne gange den[Billeder af DasDds](#dasdds)værktøj til hurtigt at se, om beskrivelsen af datasæt er gyldig, og hvis datasættet vises iERDDAP™som du ønsker det.
     

Det ville være fantastisk, hvis grupper ved hjælp af InPort til at dokumentere deres datasæt ville også brugeERDDAP™at gøre de faktiske data tilgængelige:

*   ERDDAP™er en løsning, der kan bruges lige nu, så du kan opfyldeNOAA's[Offentlig adgang til forskningsresultater (PARR) krav](https://nosc.noaa.gov/EDMC/PD.DSP.php)Lige nu, ikke på en vis vryg tid i fremtiden.
*   ERDDAP™gør de faktiske data tilgængelige for brugere, ikke blot metadata. (Hvad er metadata uden data?) 
*   ERDDAP™understøtter metadata (Især enheder af variabler) , i modsætning til nogle andre dataserver software betragtes. (Hvad er data uden metadata?) At bruge software, der ikke understøtter metadata, er at invitere dataene til at blive misforstået og misbrugt.
*   ERDDAP™er gratis og open-source software i modsætning til nogle andre software betragtes. Udvikling af udvikling afERDDAP™er allerede betalt for. Support til supportERDDAP™Brugere er gratis.
*   ERDDAP's udseende kan nemt tilpasses til at reflektere og fremhæve din gruppe (Ikke ikkeERDeller eller ellerERDDAP) .
*   ERDDAP™Tilbyder en konsekvent måde at få adgang til alle datasæt.
*   ERDDAP™kan læse data fra mange typer af datafiler og fra relationelle databaser.
*   ERDDAP™kan håndtere store datasæt, herunder datasæt, hvor kildedataene er i mange datafiler.
*   ERDDAP™kan skrive data til mange typer af datafiler, på brugerens anmodning, herunder videnskabelige data filtyper som netCDF, ESRI .csv, ogODV .txt.
*   ERDDAP™kan foretage brugerdefinerede diagrammer og kort over undersæt af dataene, baseret på brugerens specifikationer.
*   ERDDAP™kan håndtere ikke-data datasæt såsom samlinger af billede, video eller lydfiler.
*   ERDDAP™er blevet installeret og brugt på[mere end 60 institutioner over hele verden](/#who-uses-erddap).
*   ERDDAP™er angivet som en af de dataservere, der anbefales til brug inden forNOAAi området[NOAADatatilpasset direktiv](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations), i modsætning til nogle andre software betragtes som.
*   ERDDAP™er et produkt afNMFS/ / / /NOAA, så brug det indenforNMFSog og ogNOAAbør være et punkt af stolthed forNMFSog og ogNOAA.

Angiv venligstERDDAP™et forsøg. Hvis du har brug for hjælp, skal du skrive en besked i meddelelsenERDDAP™Google-gruppe.
     
##### addFillValueAttributes{#addfillvalueattributes} 
Denne særlige EDDType mulighed er ikke en datasæt type. Det er et værktøj, der kan tilføje \\_FillValue attributter til nogle variabler i nogle datasæt. Se endnu[addFillValueAttributes](#add-_fillvalue-attributes).
     
##### FindDuplicate Tidstid{#findduplicatetime} 
Denne særlige EDDType mulighed er ikke en datasæt type. I stedet fortæller det GenererDatasets Xml at søge gennem en samling af gitterded.nc  (og relateret) filer til at finde og udskrive en liste over filer med duplikerede tidsværdier. Når det ser på tidsværdierne, omdanner den dem fra de oprindelige enheder til"seconds since 1970-01-01"I tilfælde af forskellige filer bruger forskellige enheder strenge. Du skal angive startmappen (med eller uden trailing slash) , filnavnet almindeligt udtryk (f.eks. .\\*.nc ) , og navnet på den tidsvariable i filerne.
     
##### ncdump{#ncdump} 
Denne særlige EDDType mulighed er ikke en datasæt type. I stedet fortæller det GenererDatasets Xml til at udskrive en[ncdump](https://linux.die.net/man/1/ncdump)\\-lignende udskrifter af en.nc,.ncml eller.hdffil. Det bruger faktisk netcdf-java's[NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), som er et mere begrænset værktøj end C-versionen af NCdump. Hvis du bruger denne mulighed, vil GenererDatasetsXml bede dig om at bruge en af mulighederne: "-h" (Sidehoved) "-c" (koordinater) , "-vall" (standard) , "-v var1;var2", "-v var1 (0,0:10,0:20) ". Dette er nyttigt, fordi uden ncdump det er svært at vide, hvad der er i en.nc,.ncml eller.hdffil og dermed, hvilken EDDType du skal angive for GenererDatasets Xml. For et.ncml fil, vil dette udskrive ncdump output for resultatet af.ncml filændringer, der anvendes på underliggende.nceller eller eller.hdffil.
         
### Billeder af DasDds{#dasdds} 
*   [ **Billeder af DasDds** ](#dasdds)er et kommandolinjeprogram, som du kan bruge, når du har oprettet et første forsøg på XML for et nyt datasæt idatasets.xml. Med DasDds kan du gentagne gange teste og tilpasse XML. Når du bruger DasDds programmet:
    1. På Windows, første gang du kører DasDds, skal du redigere DasDds. bat fil med en tekst editor til at ændre stien til java. exe fil, så Windows kan findeJava.
    2. DasDds spørger dig omdatasetIDfor det datasæt, du arbejder på.
    3. DasDds forsøger at oprette datasættet med detdatasetID.
        * DasDds udskriver altid masser af diagnostiske meddelelser.
Hvis du bruger "DasDds -verbose", vil DasDds udskrive flere diagnostiske meddelelser end normalt.
        * For sikkerhed sletter DasDds altid alle de cachelagrede datasæt oplysninger (filer filer filer) for datasættet, før du forsøger at oprette datasættet. Dette er den tilsvarende indstilling af en[hård flag](/docs/server-admin/additional-information#hard-flag)Så for aggregerede datasæt, vil du muligvis justere filenNameRegex midlertidigt for at begrænse antallet af filer databyggeren finder.
        * Hvis datasættet ikke indlæses (uanset årsag) , DasDds vil stoppe og vise dig fejlmeddelelsen for den første fejl, det finder.
             **Forsøg ikke at gætte, hvad problemet kan være. Læs ERROR-meddelelsen omhyggeligt.**   
Hvis det er nødvendigt, skal du læse de tidligere diagnostiske meddelelser for at finde flere spor og oplysninger, også.
        *    **Foretag en ændring i datasættets XML for at forsøge at løse problemet**   
og lad DasDds forsøge at oprette datasættet igen.
        *    **Hvis du gentagne gange løser hvert problem, vil du i sidste ende løse alle problemerne**   
og datasættet vil indlæse.
    4. Alle DasDds output (Diagnostik og resultater) skrives til skærmen og til *bigParentDirectory* /logs/DasDds.log .
    5. Hvis DasDds kan oprette datasættet, vil DasDds derefter vise dig de[.das (Datasæt Attribute Structure) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das),[.dds (Datasæt Descriptor Strukturstruktur) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds), og[.timeGaps (Tidsforskelle) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)Oplysninger om datasættet på skærmen og skrive dem til *bigParentDirectory* /logs/DasDds.out.
    6. Ofte vil du gerne foretage nogle små ændringer til datasættets XML for at rense datasættets metadata og rerun DasDds.

### Bonus Bonus Bonus Bonus Brugervejledning:ERDDAP-lint{#bonus-third-party-tool-erddap-lint} 
ERDDAP-lint er et program fra Rob Fuller og Adam Leadbetter of te Irish Marine Institute, som du kan bruge til at forbedre metadata på dinERDDAP™Datasets.ERDDAP-lint "fordele regler og en simpel statisk web ansøgning for at køre nogle verifikationstest mod dinERDDAP™server. Alle testne kører i webbrowseren." Ligesom[Unix/Linux lint værktøj](https://en.wikipedia.org/wiki/Lint_(software)), kan du redigere de eksisterende regler eller tilføje nye regler. Se endnu[ERDDAP-lint](https://github.com/IrishMarineInstitute/erddap-lint)for mere information.

Dette værktøj er især nyttigt for datasæt, som du har oprettet for lidt tid siden, og nu ønsker at bringe op til dato med dine aktuelle metadata præferencer. For eksempel tidlige versioner af GenererDatasets Xml gjorde ikke nogen indsats for at skabe globalcreator\\_name,creator\\_email, skaber\\_type ellercreator\\_urlmetadata. Du kan brugeERDDAP-lint til at identificere de datasæt, der mangler disse metadata attributter.

Tak til Rob og Adam for at skabe dette værktøj og gøre det tilgængeligt for denERDDAP™fællesskab.
 
## Den grundlæggende struktur afdatasets.xmlFilen fil{#the-basic-structure-of-the-datasetsxml-file} 
De krævede og valgfrie tags tilladt i etdatasets.xmlfilfil (og antallet af gange, de kan vises) vises nedenfor. I praksis, dindatasets.xmlvil have masser af&lt;Dataset&gt;s tags og kun bruge de andre tags inden for&lt;erddapDatasets&gt; efter behov.

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

Det er muligt, at andre kodninger vil blive tilladt i fremtiden, men for nu anbefales kun ISO-8859-1.
 
### XInclude{#xinclude} 
Ny i version 2.25 er understøttelse af XInclude. Dette kræver, at du bruger SAX-parser&lt;BrugSaxParser&gt;true&lt;/useSaxParser&gt; i din opsætning.xml. Dette kan give dig mulighed for at skrive hver datasæt i sin egen fil, og derefter inkludere dem alle i den vigtigstedatasets.xml, genbrug dele af datasæt definitioner eller begge. Hvis du vil se et eksempel,[EDDTestDataset.](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)Opsæt XInclude for at genbruge variable definitioner.
 

- - - - -

## Noter{#notes} 

Arbejde med arbejdetdatasets.xmlfil er et ikke-trivial projekt. Læs alle disse noter omhyggeligt. Når du har valgt en[Datasæt type](#list-of-types-datasets), læs venligst den detaljerede beskrivelse af det omhyggeligt.
     
### Valg af datasæt Type{#choosing-the-dataset-type} 
I de fleste tilfælde er der bare énERDDAP™datasæt type, der er egnet til en given datakilde. I et par tilfælde (fx,.ncfiler filer filer) , der er et par muligheder, men normalt en af dem er absolut bedste. Den første og største beslutning, du skal træffe, er det hensigtsmæssigt at behandle datasættet som en gruppe multidimensionelle arrays (hvis det er tilfældet[EDDGridDatasæt typer](#eddgrid)) eller som en databaselignende tabel af data (hvis det er tilfældet[EDDTable datasæt typer](#eddtable)) .
     
### Servicerer data som er{#serving-the-data-as-is} 
Normalt er der ingen grund til at ændre datakilden (f.eks. konvertere filer til en anden filtype) så detERDDAP™kan tjene det. En af antagelserne afERDDAP™er, at datakilden vil blive brugt som er. Normalt fungerer dette fint. Nogle undtagelser er:
* Relational Databaser og Cassandra --ERDDAP™kan tjene data direkte fra relationelle databaser og Cassandra. Men for sikkerhed, belastning balance og præstationsproblemer, kan du vælge at oprette en anden database med de samme data eller gemme dataene tilNetCDFv3.ncfiler og harERDDAP™tjene data fra den nye datakilde. Se endnu[EDDTableFraDatabase](#eddtablefromdatabase)og og og[EDDTableFraCassandra](#eddtablefromcassandra).
* Understøttede datakilder --ERDDAP™kan støtte et stort antal datakilder, men verden er fyldt med 1000's (millioner?) af forskellige datakilder (navnlig datafilstrukturer) . HvisERDDAP™understøtter ikke din datakilde:
    * Hvis datakilden erNetCDF .ncfiler, du kan bruge[NcML](#ncml-files)til at ændre datafiler på farten, eller brug[NCO](#netcdf-operators-nco)til permanent at ændre datafiler.
    * Du kan skrive oplysningerne til en datakildestype, somERDDAP™understøtter.NetCDF-3.ncfiler er en god, generel anbefaling, fordi de er binære filer, derERDDAP™kan læse meget hurtigt. For tabulære data, overveje at gemme dataene i en samling af.ncfiler, der bruger de[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array datastrukturer og så kan håndteres medERDDAP's[EDDTableFraNcCFFiles](#eddtablefromnccffiles)). Hvis de er logisk organiseret (hver med data til en smule plads og tid) ,ERDDAP™kan udtrække data fra dem meget hurtigt.
    * Du kan anmode om, at support til denne datakilde føjes tilERDDAP™via e-mailing Chris. John på noaa.gov.
    * Du kan tilføje support til den datakilde ved at skrive koden til at håndtere den selv. Se endnu[te te te teERDDAP™Programmeringsguide](/docs/contributing/programmer-guide)
* Hastighed --ERDDAP™kan læse data fra nogle datakilder meget hurtigere end andre. For eksempel læsningNetCDFv3.ncfiler er hurtigt og læsning ASCII filer er langsommere. Og hvis der er en stor (&gt;1000) eller kæmpe (&gt;0.000) antal kildedatafiler,ERDDAP™vil reagere på nogle data anmodninger langsomt. Normalt er forskellen ikke mærkbar på mennesker. Men hvis du trorERDDAP™Du kan vælge at løse problemet ved at skrive oplysningerne til en mere effektiv opsætning. (normalt: et par, velstruktureret,NetCDFv3.ncfiler filer filer) . For tabulære data, se[denne rådgivning](#millions-of-files).
         
### Hint{#hint} 
Det er ofte nemmere at generere XML til et datasæt ved at lave en kopi af en arbejdsdatasæt beskrivelse i dataset.xml og derefter ændre den.
    
### Særlige tegn{#encoding-special-characters} 
Sidendatasets.xmler en XML-fil, du SKAL være[& kode](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"&", "&lt;", og ↓" på ethvert indhold som "&amp;", "&lt;" og "&gt;".
Forkert:&lt;titel&gt; Tid og Tider&lt;/titel&gt;
Ret:&lt;titel&gt; Tid ogamp; Tider&lt;/titel&gt;
     
### XML tolererer ikke synsfejl{#xml-doesnt-tolerate-syntax-errors} 
Når du redigerer dataset.xml-filen, er det en god ide at bekræfte, at resultatet er[veldannet XML](https://www.w3schools.com/xml/xml_dtd.asp)ved at indsætte XML-teksten i en XML-tjeker som[xmlvalidation](https://www.xmlvalidation.com/).
     
### Fejlfinding af tips{#troubleshooting-tips} 
*    **Andre måder at diagnosticere problemer med datasets**   
Ud over de to vigtigste[Værktøjsværktøjer](#tools),
    *   [log.txt](/docs/server-admin/additional-information#log)er en logfil med alleERDDAP's diagnostiske meddelelser.
    * The The The The The The The[Daglig rapport](/docs/server-admin/additional-information#daily-report)har mere information end statussiden, herunder en liste over datasæt, der ikke indlæses, og undtagelserne (fejl fejl fejl) de genererede.
    * The The The The The The The[Status side](/docs/server-admin/additional-information#status-page)er en hurtig måde at tjekkeERDDAP's status fra enhver webbrowser. Det omfatter en liste over datasæt, der ikke indlæsede (selvom ikke de relaterede undtagelser) og opgaveThread statistik (at vise fremskridtene for[EDDGridKopiere Kopier](#eddgridcopy)og og og[EDDTableCopy](#eddtablecopy)Datasæt og alle[EDDGridFraFiles](#eddgridfromfiles)eller eller eller[EDDTableFraFiles](#eddtablefromfiles)Datasæt, der bruger[cacheFraUrl](#cachefromurl)  (men ikke cache Størrelse GB) ) .
    * Hvis du sidder fast, se vores[sektion om at få ekstra støtte](/docs/intro#support).
         
### Særlige variabler{#special-variables} 
*    **[Længden, breddegrad, højde (eller dybde) , og tid (LLAT) variabel variabel variabel variabel](#destinationname) [destinationName](#destinationname)s er specielle.** 
    * Generelt:
        * LLAT variabler er kendt forERDDAP™hvis aksens variable (for for forEDDGridDatasæt) eller datavariables (for EDDTable datasæt)  [destinationName](#destinationname)er "langitude", "latitude", "altitude", "dybde", eller"time".
        * Vi opfordrer dig til at bruge disse standardnavne til disse variabler, når det er muligt. Ingen af dem er påkrævet. Hvis du ikke bruger disse særlige variable navne,ERDDAP™genkender ikke deres betydning. For eksempel behandles LLAT-variabler specielt ved Make A Graph ( *datasetID* .ografi) : hvis X Axis variablen er "langitude" og Y Axis variablen er "latitude", vil du få et kort (ved hjælp af en standard projektion og med en jordmaske, politiske grænser osv.) i stedet for en graf.
        *   ERDDAP™vil automatisk tilføje masser af metadata til LLAT variabler (for eksempel "[ioos\\_category](#ioos_category)", "[enheder](#units)", og flere standarder-relaterede attributter som "\\_CoordinateAxisType") .
        *   ERDDAP™vil automatisk tilføje masser af globale metadata i forbindelse med de valgte dataundersæt (for eksempel "geospatial\\_lon\\_min") .
        * Klienter, der understøtter disse metadata standarder, vil kunne drage fordel af de tilføjede metadata for at positionere dataene i tid og rum.
        * Klienter vil finde det nemmere at generere forespørgsler, der omfatter LLAT-variabler, fordi variablens navne er den samme i alle relevante datasæt.
    * For "langitude" variabel og "latitude" variabel:
        * Brug af[destinationName](#destinationname)s "longitude" og "latitude" kun hvis den[enheder](#units)er grader\\_east og grader\\_north, henholdsvis. Hvis dine data ikke passer til disse krav, skal du bruge forskellige variable navne (for eksempel x, y, lonRadians, latRadians) .
        * Hvis du har længde- og breddegradsdata udtrykt i forskellige enheder og dermed med forskelligedestinationNames, for eksempel lonRadians og latRadians, Make A Graph ( *datasetID* .ografi) vil lave grafer (for eksempel time serier) i stedet for kort.
    * For "altitude" variabel og "dybde" variabel:
        * Brug af[destinationName](#destinationname)"altitude" for at identificere data afstanden over havet niveau (positivt arbejde" værdier) . Valgfrit kan du bruge "altitude" til afstande under havet, hvis værdierne er negativ under havet (eller hvis du bruger, f.eks.
[ []&lt;Navnligscale\\_factor"type: 1 1 1 1&lt;/att&gt;] (#skala_faktor) til at konvertere dybdeværdier til højdeværdier.
        * Brug afdestinationName"dybde" for at identificere data afstanden under havet niveau (positive værdier) .
        * Et datasæt kan ikke have både "altitude" og "dybde" variabler.
        * Til disse variable navne,[enheder](#units)skal være "m", "meter", eller "metre". Hvis enhederne er forskellige (for eksempel fedthoms) , du kan bruge
[ []&lt;Navnligscale\\_factor↓ *nogle af nogle Værdiværdi* &lt;/att&gt;] (#skala_faktor) og [&lt;ont navn&lt;/att&gt;] (#enheder) at konvertere enheder til meter.
        * Hvis dine data ikke passer til disse krav, skal du bruge en andendestinationName  (for eksempel, overGround, afstand Tolvtom) .
        * Hvis du kender de lodrette CRS, bedes du angive det i metadata, f.eks. "EPSG:5829" (øjeblikkelig højde over havets overflade) , "EPSG:5831" (øjeblikkelig dybde under havoverfladen) , eller "EPSG:5703" (NAVD88 højde) .
    * For te"time"variabel:
        * Brug af[destinationName](#destinationname) "time"kun for variabler, der omfatter hele dato+tid (eller dato, hvis det er alt der er) . Hvis der f.eks. er separate kolonner til dato og tidspunktOfDay, ikke bruger det variable navn"time".
        * Se endnu[enheder](#time-units)for flere oplysninger om attributten for tid og tidStamp variabler.
        * Tidsvariable og relaterede[tidstid Frimærkevariabler](#timestamp-variables)er unikke i, at de altid konverterer dataværdier fra kildens tidsformat (uanset hvad det er) i en numeriske værdi (sekunder siden 1970-01T00:00:00Z) eller en streng værdi (ISO 8601:2004 (E) formatformat) , afhængigt af situationen.
        * Når en bruger anmoder om tidsdata, kan de anmode den ved at angive tiden som en numeriske værdi (sekunder siden 1970-01T00:00:00Z) eller en streng værdi (ISO 8601:2004 (E) formatformat) .
        *   ERDDAP™har et værktøj til[Konverter en Numeric Tid til/fra en streng tid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        * Se endnu[Sådan kan duERDDAPTilbud med Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
            
### Hvorfor kun to grundlæggende datastrukturer?{#why-just-two-basic-data-structures} 
* Da det er svært for menneskelige klienter og computer klienter at håndtere et komplekst sæt af mulige datasæt strukturer,ERDDAP™bruger kun to grundlæggende datastrukturer:
    * a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a[gitteret datastruktur](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (for eksempel for satellitdata og modeldata) og og og
    * a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a[Ændret datastruktur](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (for eksempel til in-situ buoy, station og trajectory data) .
* Bestemt, ikke alle data kan udtrykkes i disse strukturer, men meget af det kan. Tabel, især, er meget fleksible datastrukturer (se på succesen af relationelle databaseprogrammer) .
* Dette gør dataforespørgsler lettere at konstruere.
* Dette gør datareaktioner en enkel struktur, hvilket gør det nemmere at betjene dataene i en bredere vifte af standard filtyper (som ofte bare understøtter enkle datastrukturer) . Dette er den vigtigste grund, at vi opsætterERDDAP™denne måde.
* Dette gør det meget nemt for os (eller nogen) at skrive klient software, der arbejder med alleERDDAP™Datasets.
* Det gør det nemmere at sammenligne data fra forskellige kilder.
* Vi er meget opmærksomme på, at hvis du bruges til at arbejde med data i andre datastrukturer, kan du i første omgang tro, at denne tilgang er forenklet eller utilstrækkelig. Men alle datastrukturer har tradeoffs. Ingen er perfekt. Selv de do-it-all strukturer har deres ulemper: arbejde med dem er komplekse, og filerne kan kun skrives eller læses med særlige softwarebiblioteker. Hvis du acceptererERDDAP's tilgang nok til at forsøge at arbejde med det, kan du finde, at det har sine fordele (Især støtte til flere filtyper, der kan holde dataenes svar) . The The The The The The The[ERDDAP™lysbilledshow](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (særligt[datastrukturer glide](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) taler meget om disse problemer.
* Og selvom denne tilgang lyder mærkeligt for dig, mestERDDAP™Kunderne vil aldrig bemærke -- de vil blot se, at alle datasæt har en dejlig enkel struktur, og de vil være taknemmelige, at de kan få data fra en bred vifte af kilder returneret i en bred vifte af filformater.
         
### Dimensioner Dimensioner Dimensioner{#dimensions} 
*    **Hvad hvis gittervariablerne i kildedatasættet DON'T deler de samme aksevariabler?**   
I nærheden af In In In In In In In In In In In In In InEDDGridDatasæt, alle datavariabler skal bruge (Del dele) alle aksevariabler. Så hvis en kildedatasæt har nogle variabler med et sæt dimensioner, og andre variabler med et andet sæt dimensioner, skal du lave to datasæt iERDDAP. For eksempel kan du lave enERDDAP™Datasæt med titlen "Noe Title (på overfladen) " at holde variabler, der bare bruger\\[tidstid\\]\\[breddegrad\\]\\[Længde\\]dimensioner og gøre en andenERDDAP™Datasæt med titlen "Noe Title (ved dybder) " for at holde de variable, der bruger\\[tidstid\\]\\[højdehøjde\\]\\[breddegrad\\]\\[Længde\\]. Eller måske kan du ændre datakilden til at tilføje en dimension med en enkelt værdi (for eksempel højde=0) at gøre variablerne konsekvent.
    
    ERDDAP™håndterer ikke mere komplicerede datasæt (for eksempel modeller, der bruger et mesh af trekanter) godt. Du kan tjene disse datasæt iERDDAP™ved at oprette to eller flere datasæt iERDDAP™  (så alle datavariabler i hvert nyt datasæt deler det samme sæt af aksevariabler) , men det er ikke, hvad brugerne ønsker. For nogle datasæt, kan du overveje at gøre en almindelig gitteret version af datasættet og tilbyde den i tillæg til de oprindelige data. Nogle klient software kan kun håndtere et almindeligt gitter, så ved at gøre dette, du når flere klienter.
     
    
### Projekterede Gridded Data{#projected-gridded-data} 
Nogle gitterdata har en kompleks struktur. For eksempel, satellit niveau 2 ("lang track") Data bruger ikke en simpel projektion. Modelers (og andre) arbejder ofte med gitterded data på forskellige ikke-cylindriske projektioner (for eksempel konisk, polar stereografik, tripolar) eller i ustrukturerede gitter (en mere kompleks datastruktur) . Nogle slutbrugere ønsker disse data som er, så der er ingen tab af oplysninger. Til disse klienter,ERDDAP™kan tjene dataene, som er, kun hvis dataeneERDDAP™Administrator bryder de originale datasæt i et par datasæt, med hver del herunder variabler, der deler de samme aksevariabler. Ja, det synes mærkeligt for folk involveret, og det er forskelligt fra de flesteOPeNDAPservere. Men men men men menERDDAP™understreger, at de data, der findes i mange formater. Det er muligt, fordiERDDAP™bruger/kræver en mere ensartet datastruktur. Selv om det er lidt akavet (dvs., anderledes end forventet) ,ERDDAP™kan distribuere projekterede data.

\\[Ja,ERDDAP™kunne have løst krav til datastrukturen, men holde kravene til outputformaterne. Men det ville føre til forvirring blandt mange brugere, især nybegyndere, da mange tilsyneladende gyldige anmodninger om data med forskellige strukturer ville være ugyldige, fordi dataene ikke ville passe ind i filtypen. Vi vender tilbage til det nuværende systems design.\\]

Nogle slutbrugere ønsker data i en lat lon cylindrisk projektion som Equirectangular / plade carrée eller Mercator) for nem brug i forskellige situationer. I disse situationer opfordrer vi os tilERDDAP™administrator til at bruge nogle andre software (NCO?Matlab? R?? IDV? ...???) til at omdøbe dataene på et geografisk område (Equirectangulær projektion / plade bilrée) eller anden cylindrisk projektion og tjene den form for data iERDDAP™som et andet datasæt. Dette svarer til, hvad folk gør, når de konverterer satellitniveau 2 data i niveau 3 data. Et sådant værktøj er[NCO](https://nco.sourceforge.net/nco.html#Regridding)som tilbyder udvidelsesmuligheder til regridding data.

#### GIS og Reprojektering Data{#gis-and-reprojecting-data} 
Da GIS-verdenen ofte er kortorienterede, tilbyder GIS-programmer som regel support til omprojektering af data, dvs. at plotte dataene på et kort med en anden projektion.

I øjeblikket,ERDDAP™behøver ikke værktøjer til at omdøbe data. I stedet anbefaler vi, at du bruger et eksternt værktøj til at lave en variant af datasættet, hvor data er blevet omarbejdet fra sin oprindelige form på en rektangulær (breddegrad længde) array, der passer tilERDDAP.

Efter vores mening, CF/DAPVerden er lidt anderledes end GIS-verdenen og arbejder på et lidt lavere niveau.ERDDAP™afspejler det. Generelt,ERDDAP™er designet til at arbejde primært med data (Ikke kort) og ønsker ikke at ændre (f.eks. omprojekter) disse data. For For For For ForERDDAP™, gitterded data er ofte / sædvanligvis / især forbundet med lat lon værdier og en cylindrisk projektion, og ikke nogle projektions x,y værdier. I alle tilfælde,ERDDAP™gør ikke noget med datas projektion; det passerer bare data gennem, som det er, med sin nuværende projektion, på den teori, at en omprojektering er en betydelig ændring af data ogERDDAP™ønsker ikke at være involveret i væsentlige ændringer. Derudover kan efterfølgende brugere naivt omarbejde dataene igen, som ikke ville være så godt som bare at gøre en omprojektering. (Så hvis det er tilfældetERDDAP™administrator ønsker at tilbyde data i en anden projektion, fint; bare omprojekt dataene offline og tilbyde, at som et andet datasæt iERDDAP. Masser af satellitbaserede datasæt tilbydes, da NASA kalder niveau 2 (Strækning) og som niveau 3 (Equirectangulær projektion) versioner.) Hvornår Hvornår skal man HvornårERDDAP™gør kort (direkte eller viaWMSeller KML) ,ERDDAP™i øjeblikket kun tilbyder at lave kort med Equirectangular / plade bilrée projektion, som er heldigvis accepteret af de fleste kortprogrammer.

Vi opfordrer os tilERDDAP™Administratorer til at bruge nogle andre software (NCO?Matlab? R?? IDV? ...???) til at omdøbe dataene på et geografisk område (Equirectangulær projektion / plade bilrée) eller anden cylindrisk projektion og tjene den form for data iERDDAP™som et andet datasæt. Dette svarer til, hvad folk gør, når de konverterer satellitniveau 2 data i niveau 3 data. Et sådant værktøj er[NCO](https://nco.sourceforge.net/nco.html#Regridding)som tilbyder udvidelsesmuligheder til regridding data.

Vi håber, atERDDAP™vil have indbyggede værktøjer til at tilbyde kort med andre projektioner i fremtiden. Vi håber også at have bedre forbindelser til GIS-verdenen i fremtiden (andre end den nuværendeWMSServiceservice) . Det er forfærdeligt, at i denne "moderne" verden, forbindelserne mellem CF /DAPVerden og GIS-verdenen er stadig så svag. Begge af disse ting er på listen To Do. (Hvis du ønsker at hjælpe, især med tilslutningERDDAP™Send en e-mail til MapServer. John på noaa.gov .) 
    
### Datatyper{#data-types} 
ERDDAP™understøtter følgende datatyper
 (navnene er tilfælde følsomme;'u'præfiks står for "usigned"; antallet af navne i andre systemer er antallet af bits) :

#### byte{#byte} 
*    **byte** har underskrevet talværdier med en række -128 til 127.
I andre systemer kaldes dette undertiden int8.
Dette kaldes "tinyint" af SQL og Cassandra.
    ERDDAP™Konverteringer[boolean](#boolean-data)fra nogle kilder (f.eks. SQL og Cassandra) ind i bytesERDDAP™med en værdi på 0=false, rå og 127=missing\\_value.
#### ubyte{#ubyte} 
*    **ubyte** har ikke-signede værdier med en række 0 til 255.
I andre systemer kaldes dette undertiden uint8.
#### Kort kort kort kort{#short} 
*    **Kort kort kort kort** har underskrevet talværdier med en række -32768 til 32767.
I andre systemer kaldes dette undertiden int16.
Dette kaldes "lilleint" af SQL og Cassandra.
#### Ukort{#ushort} 
*    **Ukort** har ikke-signede værdier med en række 0 til 65535.
I andre systemer kaldes dette undertiden uint16.
#### int{#int} 
*    **int** har underskrevet talværdier med en række -2147483648 til 2147483647.
I andre systemer kaldes dette undertiden int32.
Dette kaldes "integer|numerisk (?) " af SQL og "int" af Cassandra.
#### uint{#uint} 
*    **uint** har ikke-signede værdier med en række 0 til 4294967295.
I andre systemer kaldes dette nogle gange uint32.
#### længe{#long} 
*    **længe** har underskrevet mindsteværdier med en række -9223372036854775808 til 9223372036854775807.
I andre systemer kaldes dette undertiden int64.
Dette kaldes "bigint|numerisk (?) " af SQL og "bigint" af Cassandra.
Fordi mange filtyper ikke understøtter lange data, er deres brug diskotek. Brug dobbelt i stedet (se nedenfor) .
#### Ulong{#ulong} 
*    **Ulong** har ikke-signede værdier med en række 0 til 18446744073709551615
I andre systemer kaldes dette undertiden uint64.
Fordi mange filtyper ikke understøtter ulong data, deres brug er discouraged. Brug dobbelt i stedet (se nedenfor) .
#### flyder{#float} 
*    **flyder** er en IEEE 754 flyt med en række ca +/- 3.402823466e+38.
I andre systemer kaldes dette undertiden fly32.
Dette kaldes "realistisk|flyder (?) |decimal decimal decimal (?) |numerisk (?) " af SQL og "float" af Cassandra.
Den særlige værdi NaN betyder ikke-a-tal.
    ERDDAP™Konverterer positive og negative uendelighedsværdier til NaN.
#### Dobbelt dobbelt{#double} 
*    **Dobbelt dobbelt** er en IEEE 754 dobbelt med en række ca.
+/- 1.7931348623157E+308.
I andre systemer kaldes dette undertiden fly64.
Dette kaldes "dobbelt præcision|flyder (?) |decimal decimal decimal (?) |numerisk (?) " af SQL og "double" af Cassandra.
Den særlige værdi NaN betyder ikke-a-tal.
    ERDDAP™Konverterer positive og negative uendelighedsværdier til NaN.
#### Billeder af char{#char} 
*    **Billeder af char** er en enkelt, 2-byte (16-bit)  [Unicode UCS-2 tegn](https://en.wikipedia.org/wiki/UTF-16)spænder fra\\u0000  (#0) gennem gennem gennem\\uffff  (#65535) .
    \\uffff's definition er ikke-a-Character, analogt til en dobbelt værdi af NaN.
Brugen af char er discouraged, fordi mange filtyper enten ikke understøtter chars eller kun støtte 1-byte chars (se nedenfor) . Overvej at bruge String i stedet.
Brugere kan bruge char variabler til at lave grafer.ERDDAP™vil konvertere tegn til deres Unicode-kodepunktnummer, som kan bruges som numeriske data.
#### streng streng streng{#string} 
*    **streng streng streng** er en sekvens på 0 eller mere, 2-byte (16-bit)  [Unicode UCS-2 tegn](https://en.wikipedia.org/wiki/UTF-16).
    ERDDAP™Brug/fortolker en 0-længde streng som en manglende værdi.ERDDAP™understøtter ikke en ægte null streng.
Den teoretiske maksimale streng længde er 2147483647 tegn, men der er sandsynligvis forskellige problemer på forskellige steder selv med lidt kortere strenge.
BrugERDDAP's String for SQL's karakter, varchar, figur varierende, binær, var binær, interval, array, multiset, xml, og enhver anden database data type, der ikke passer rent med andre andreERDDAP™datatype.
BrugERDDAP's String for Cassandra's "tekst" og enhver anden Cassandra data type, der ikke passer rent med nogen andenERDDAP™datatype.
     

Før før førERDDAP™v2.10,ERDDAP™støttede ikke usignede integer typer internt og tilbød begrænset støtte i sine datalæsere og forfattere.
    
### Datatypebegrænsninger{#data-type-limitations} 
Du kan tænke påERDDAP™som et system, der har virtuelle datasæt, og som arbejder ved at læse data fra en datasæts kilde til en intern datamodel og skrive data til forskellige tjenester (f.eks.(OPeN)DAP,WMS) og filtyper som svar på brugeranmodninger.

* Hver inputlæser understøtter et undersæt af de datatyper, somERDDAP™understøtter. Så læsning af data tilERDDAP's interne datastrukturer er ikke et problem.
* Hver output forfatter understøtter også et undersæt af datatyper. Det er et problem, fordiERDDAPskal f.eks. trykke lange data i filtyper, der ikke understøtter lange data.
     

Nedenfor er forklaringer på begrænsningerne (eller ingen) af forskellige output forfattere og hvordanERDDAP™beskæftiger sig med problemerne. Sådanne komplikationer er en del afERDDAP's mål at gøre deparate systemer interoperable.

#### ASCII{#ascii} 
* ASCII (.csv,.tsv, osv.) tekstfiler -
    * Alle numeriske data er skrevet via sin strenge repræsentation (med manglende dataværdier som 0-længde strenge) .
    * Selv om selvomERDDAP™skriver lange og ulange værdier korrekt til ASCII tekstfiler, mange læsere (f.eks. regnearksprogrammer) kan ikke håndtere lange og ulange værdier og i stedet konvertere dem til dobbeltværdier (med tab af præcision i nogle tilfælde) .
    * Char- og strengdata er skrevet via JSON Strings, som håndterer alle Unicode-tegn (Især "uusuelle" tegn ud over ASCII #127, f.eks. Euro-karakteren vises som "u20ac") .
    
        
#### JSON{#json} 
* JSON (.json,.jsonlCSV, osv.) tekstfiler -
    * Alle numeriske data er skrevet via sin strenge repræsentation.
    * Char- og strengdata er skrevet som JSON Strings, som håndterer alle Unicode tegn (Især "uusuelle" tegn ud over ASCII #127, f.eks. Euro-karakteren vises som "u20ac") .
    * Manglende værdier for alle numeriske datatyper vises som null.
         
#### .nc3 filer{#nc3-files} 
*   .nc3 filer understøtter ikke nogen usignede iteger datatyper. Før CF v1.9 støttede CF ikke usignede iteger typer. At håndtere dette,ERDDAP™2.10+ følger NUG-standarden og tilføjer altid en "\\_Unsigned" egenskab med en værdi af "true" eller "false" for at angive, om dataene er fra en usigned eller underskrevet variabel. Alle ital attributter er skrevet som signerede attributter (f.eks. byte) med underskrevet værdier (f.eks. en ubyteactual\\_rangeattribut med værdier 0 til 255, vises som en afte attribut med værdier 0 til -1 (inderst af de tos komplementære værdi af den udestående værdi). Der er ingen nem måde at vide, hvilke (signed) integer attributter skal læses som usignede attributter.ERDDAP™understøtter attributten "\\_Unsigned", når den læser.nc3 filer.
*   .nc3 filer understøtter ikke de lange eller ulange datatyper.ERDDAP™tilbud med dette ved midlertidigt at konvertere dem til at være dobbelt variabler. Doubler kan nøjagtigt repræsentere alle værdier op til +/- 9.007,199,254,740,992 som er 2^53. Dette er en ufuldkommelig løsning.Unidatanægter at foretage en mindre opgradering til.nc3 for at håndtere dette og relaterede problemer, citere.nc4 4 (en større ændring) som løsningen.
* CF-specifikationerne (før v1.9) sagde det understøtter en char data type, men det er uklart, hvis char kun er beregnet som byggesten af char arrays, som er effektivt strenge. Spørgsmål til deres postliste gav kun forvirrende svar. På grund af disse komplikationer, er det bedst at undgå char variabler iERDDAP™og brug strenge variabler når det er muligt.
* Traditionelt,.nc3 filer kun understøttede strenge med ASCII-enkode (7-bit, #0 - 127) tegn. NUG (og og ogERDDAP) forlænge det (start ~2017) ved at inkludere attributten "\\_Encoding" med en værdi af "ISO-8859-1" (en udvidelse af ASCII, som definerer alle 256 værdier af hver 8-bit tegn) eller "UTF-8" for at angive, hvordan strenge data er kodet. Andre kodninger kan være lovlige, men er diskotek.
         
#### .nc4 filer{#nc4-files} 
*   .nc4 filer understøtter alleERDDAP's datatyper.
    
#### NCCSV filer{#nccsv-files} 
NCCSV 1.0 filer understøtter ikke nogen usignede iteger data typer.
[NCCSV 1.1+ filer](/docs/user/nccsv-1.00)Støtte alle usignede datatyper.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII filer og .dods binære filer) - - - -
    *   (OPeN)DAPhåndterer kort, ukort, int, uint, flyde og dobbelt værdier korrekt.
    *   (OPeN)DAPhar en "byte" datatype, som den definerer som usigned, mens historisk set, THREDDS ogERDDAP™har behandlet "byte" som underskrevet i deres(OPeN)DAPtjenester. At håndtere dette bedre,ERDDAP™2.10+ følger NUG-standarden og tilføjer altid en "\\_Unsigned" egenskab med en værdi af "true" eller "false" for at angive, om dataene er, hvad der erERDDAP™opkald af eller ubyte. Alle byte og ubyte attributter skrives som "byte" attributter med underskrevet værdier (f.eks. en ubyteactual\\_rangeattribut med værdier 0 til 255, vises som en afte attribut med værdier 0 til -1 (inderst af de tos komplementære værdi af den udestående værdi). Der er ingen nem måde at vide, hvilke "byte" attributter skal læses som ubyte attributter.
    *   (OPeN)DAPunderstøtter ikke signerede eller usignede lange.ERDDAP™Tilbyder dette ved midlertidigt at konvertere dem til at være dobbelt variabler og attributter. Doubler kan nøjagtigt repræsentere alle værdier op til 9.007,199,254,740,992 som er 2^53. Dette er en ufuldkommelig løsning.OPeNDAP  (organisationen) nægter at foretage en mindre opgradering tilDAP2.0 for at håndtere dette og relaterede problemer, citereDAP4 4 (en større ændring) som løsningen.
    * Fordi fordi(OPeN)DAPhar ingen separat char data type og teknisk kun understøtter 1-byte ASCII tegn (#0 - 127) i Strings, char datavariabler vises som 1-karakterer lange strenge i(OPeN)DAP.das, .dds og .dods svar.
    * Teknisk set,(OPeN)DAPspecifikation understøtter kun strenge med ASCII-enkodede tegn (#0 - 127) . NUG (og og ogERDDAP) forlænge det (start ~2017) ved at inkludere attributten "\\_Encoding" med en værdi af "ISO-8859-1" (en udvidelse af ASCII, som definerer alle 256 værdier af hver 8-bit tegn) eller "UTF-8" for at angive, hvordan strenge data er kodet. Andre kodninger kan være lovlige, men er diskotek.
         
### Data type Kommentarer{#data-type-comments} 
* På grund af den dårlige støtte i lang tid, ulong og char data i mange filtyper, vi diskourage brugen af disse data typer iERDDAP. Når det er muligt, skal du bruge dobbelt i stedet for lang og ulong og bruge String i stedet for char.
     
* Metadata - Fordi(OPeN)DAP's .das og .dds reaktioner understøtter ikke lange eller ulange attributter eller datatyper (og i stedet vise dem som fordobler) , du måske i stedet ønsker at brugeERDDAP's tabulær repræsentation af metadata som set i denhttp.../erddap/ **info info** / / / / *datasetID* .html side (for eksempel,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (som du også kan få i andre filtyper, f.eks. .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv,.xhtml) eller.nccsvMetadata (for eksempel,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)selvom.nccsvMetadata er kun tilgængelig for tabulære datasæt) , begge af hvilke understøtter alle datatyper (Især lang, ulong og char) .
         
### Mediefiler{#media-files} 
Ikke alle data er arrays af tal eller tekst. Nogle datasæt består af eller omfatter mediefiler, såsom billede, lyd og videofiler.ERDDAP™har nogle særlige funktioner til at gøre det nemmere for brugerne at få adgang til mediefiler. Det er en to trin proces:
 

1. Gør hver fil tilgængelig via sin egen URL, via et system, der understøtter byte område anmodninger.
Den nemmeste måde at gøre dette er at sætte filerne i en mappe, derERDDAP™har adgang til. (Hvis de er i en beholder som en.zipfil, uzip dem, selvom du ønsker at tilbyde den.zipfil til brugere også.) Så skal du lave en[EDDTableFraFileNames](#eddtablefromfilenames)Datasæt til at gøre disse filer tilgængelige viaERDDAP™, især viaERDDAP's["files"systemsystem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
Alle filer gjort tilgængelige via EDDTableFraFileNames ogERDDAP's"files"systemsupport[anmodninger om rækkevidde](https://en.wikipedia.org/wiki/Byte_serving). Normalt, når en klient (f.eks. en browser) gør en anmodning til en URL, det får hele filen som svar. Men med en anmodning om rækkevidde angiver anmodningen en række bytes fra filen, og serveren returnerer kun disse bytes. Dette er relevant her, fordi lyd- og videoafspillere i browsere kun fungerer, hvis filen kan tilgås via byte-forespørgsel.
    
Valgfrit: Hvis du har mere end én datasæt med tilknyttede mediefiler, kan du lave en EDDTableFraFileNames, der har en undermappe til hver gruppe filer. Fordelen er, at når du vil tilføje nye mediefiler til et nyt datasæt, alt hvad du skal gøre er at oprette en ny mappe og sætte filerne i mappen. mappen og filer vil automatisk blive tilføjet til EDDTableFraFileNames datasæt.
    
2. Valgfrit: Hvis du har et datasæt, der indeholder henvisninger til mediefiler, skal du tilføje det tilERDDAP.
Du kan f.eks. have en .csv-fil med en række for hver gang nogen så en hval og en kolonne, der indeholder navnet på en billedfil relateret til den syning. Hvis navnet på billedfilen er blot filnavnet, f.eks. Img20141024T192403Z, ikke en fuld URL, skal du tilføje[FileAccessBase Url og/eller filAccessSuffix](#fileaccessbaseurl)attributter til metadata for detdataVariablesom angiver baseURL og suffik til disse filnavne. Hvis du har gjort filerne tilgængelige via EDDTableFraFileNames, vil URL'en være i form
     *baseUrl* /erddap / filer / *datasetID* / / / /
For eksempel,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Hvis der er en.zipeller anden beholder fil med alle mediefiler relateret til en datavariabel, anbefaler vi, at du også gør den fil, der er tilgængelig for brugere (se trin 1 ovenfor) og derefter identificere det med en[FileAccessArchive Url](#fileaccessarchiveurl)attribut.
    

\\[Begyndende iERDDAP™v1.82\\]Hvis du gør det første trin ovenfor (eller begge trin) , så når en bruger ser udERDDAP™ "files"system til det datasæt (eller anmoder om at se en del af datasættet via en.htmlTableanmodning, hvis du gjorde det andet trin) ,ERDDAP™vil vise et '?' ikon til venstre for filnavnet. Hvis brugeren svæver over det ikon, vil de se en popup, der viser billedet, eller en lydafspiller eller en videoafspiller. Browserer understøtter kun et begrænset antal typer af

* billedbillede (normalt .gif, .jpg og .png) ,
* lydlyd (normalt .mp3, .ogg, og .wav) , og
* videofiler (normalt .mp4, .ogv, og . Webm) .

Support varierer med forskellige versioner af forskellige browsere på forskellige operativsystemer. Så hvis du har et valg af hvilken filtype at tilbyde, giver det mening at tilbyde disse typer.

Eller hvis en bruger klikker på filnavnet vist på enERDDAP™Websiden, deres browser vil vise billedet, lyd eller video fil som en separat webside. Dette er for det meste nyttigt at se et meget stort billede eller videoskala til fuld skærm, i stedet for i en popup.
    
### AWS S3 filer{#working-with-aws-s3-files} 
[Amazon Web Service (AWS) ](https://aws.amazon.com)er en sælger af[cloud computing](https://en.wikipedia.org/wiki/Cloud_computing)tjenester.[S3](https://aws.amazon.com/s3/)er et objekt opbevaringssystem, der tilbydes af AWS. I stedet for det hierarkiske system af mapper og filer af et traditionelt filsystem (som en harddisk i din pc) , S3 tilbyder kun "buckets", som holder "objects" (Vi kalder dem"files") .

Til ASCII-filer (f.eks. .csv) ,ERDDAP™kan arbejde med filerne i skovlne direkte. Det eneste, du skal gøre, er at angive den&lt;fileDir&gt; til datasættet ved hjælp af et bestemt format til AWS-spanden, f.eks. https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . Du bør ikke bruge&lt;cacheFraUrl&gt; . Se nedenfor for detaljer.

Men for binære filer (fx,.nc, .grib, .bufr, og.hdffiler filer filer) , du behøver at bruge den&lt;cacheFraUrl&gt; system beskrevet nedenfor.ERDDAP, netcdf-java (somERDDAP™bruger til at læse data fra disse filer) , og andre videnskabelige data software er designet til at arbejde med filer i et traditionelt filsystem, der tilbyder[blokniveau](https://en.wikipedia.org/wiki/Block-level_storage)adgang til filer (som tillader læsning af bidder af en fil) , men S3 tilbyder kun[filniveau (objektobjekt) ](https://en.wikipedia.org/wiki/Block-level_storage)adgang til filer (som kun tillader at læse hele filen) . AWS tilbyder et alternativ til S3,[Elastisk blok butik (EBS) ](https://aws.amazon.com/ebs/)), der understøtter blokniveau adgang til filer, men det er dyrere end S3, så det sjældent bruges til bulk opbevaring af store mængder af datafiler. (Så når folk siger at lagre data i skyen (S3) er billig, det er normalt en æbler til orange sammenligning.) 

#### S3 Skove{#s3-buckets} 
 **Indholdsfortegnelsen af en spand. Nøgler. Objekter. De limiters.**   
Teknisk set organiseres S3 skovle ikke i en hierarkisk filstruktur som et filsystem på en computer. I stedet indeholder skovle kun "objekter" (filer filer filer) , hver af dem har en "nøgle" (Et navn) . Et eksempel på en nøgle i den noaa-goes17 spand er

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
Den tilsvarende URl til dette objekt er

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS understøtter en lille variation i, hvordan URL er konstrueret, menERDDAP™kræver dette specifikke format:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
Det er fælles praksis, som med dette eksempel for at gøre nøglenavne ser ud som en hierarkisk sti plus et filnavn, men teknisk er de ikke. Da det er almindeligt og nyttigt,ERDDAP™Behandl nøgler med /'s som om de er en hierarkisk sti plus filnavn, og denne dokumentation vil henvise til dem som sådan. Hvis en spands nøgler ikke bruger /'s (f.eks. en nøgle som
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575), derefterERDDAP™vil bare behandle hele nøglen som et langt filnavn.

Privat vs Offentlige Skove -- Administratoren for S3 skovlen kan gøre skovlen og dens indhold offentligt eller privat. Hvis det offentlige, kan enhver fil i skovlen downloades af nogen ved hjælp af URL til filen. Amazon har en[Åbne data](https://aws.amazon.com/opendata/)program, der er vært for offentlige datasets (herunder data fraNOAA, NASA og USGS) gratis og oplader ikke for nogen at downloade filerne fra disse skovle. Hvis en spand er privat, er filer i spanden kun tilgængelige for autoriserede brugere og AWS opkræver et gebyr (normalt betalt af spandens ejer) for at downloade filer til en ikke-AWS S3 computer.ERDDAP™kan arbejde med data i offentlige og private skovle.

#### AWS legitimationsoplysninger{#aws-credentials} 
At gøre det såERDDAP™kan læse indholdet af private skovle, du har brug for AWS legitimationsoplysninger, og du skal gemme en legitimationsfil på standardstedet, såERDDAP™kan finde oplysninger. Se AWS SDK forJava2.x dokumentation:[Angiv standardoplysninger](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (Mulighed for at gemme værdierne somJavakommandolinjeparametre i\\[Tomcat\\]/bin/setenv.sh kan være en god mulighed.) 
#### AWS / filer /{#aws-files} 
* / filer / system -- The The The The The The TheERDDAP™ [/ filer / system](#accessibleviafiles)Tillad brugere at downloade kildefiler til et datasæt. Vi anbefaler, at du tænder dette for alle datasæt med kildefiler, fordi mange brugere ønsker at downloade de oprindelige kildefiler.
    * Hvis filerne er i en privat S3 spand, vil brugerens anmodning om at downloade en fil blive håndteret afERDDAP™, som vil læse dataene fra filen og derefter overføre dem til brugeren og dermed øge belastningen på dinERDDAP™, ved hjælp af indgående og udgående båndbredde og gør dig (te te te teERDDAP™Administrator) Betaling af data til AWS.
    * Hvis filerne er i en offentlig S3 spand, vil brugerens anmodning om at downloade en fil blive omdirigeret til AWS S3 URL for den fil, så dataene ikke flyder gennemERDDAP™og dermed reducere belastningen påERDDAP. Og hvis filerne er i en Amazon Open Data (Gratis gratis) offentlig spand, så du (te te te teERDDAP™Administrator) Du behøver ikke at betale dataeksploser gebyr til AWS. Der er således en stor fordel, der betjener data fra offentligheden (ikke privat) S3 skovle og en enorm fordel til at betjene data fra Amazon Open Data (Gratis gratis) skovle.

#### ERDDAP™og AWS S3 Skove{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™og AWS S3 Skove** ](#erddap-and-aws-s3-buckets)  
Heldigvis, efter meget indsats,ERDDAP™har en række funktioner, der gør det muligt at håndtere de iboende problemer med at arbejde med S3's blokniveau adgang til filer på en rimelig effektiv måde:

*   \\[Ansvarsfraskrivelse: Arbejde med AWS S3 skovle er en masse ekstra arbejde. AWS er et stort økosystem af tjenester og funktioner. Der er meget at lære. Det tager tid og indsats, men det er muligt. Vær tålmodig og du får tingene til at arbejde. Kig/ask til hjælp
(()[AWS dokumentation](https://aws.amazon.com/documentation/gettingstarted/), hjemmesider som[Stack Overflow](https://stackoverflow.com/), og regelmæssig
    [ERDDAP™Hjælpemuligheder](/docs/intro#support)) hvis/ når du sidder fast.\\]  
     
* Det kan være svært at finde ud af mappestrukturen og filnavnene på filerne i en S3 spand.ERDDAP™har en løsning på dette problem: EDDTableFraFileNames har en speciel[\\*\\*\\* fraOnTheFly](#fromonthefly)mulighed, som lader dig gøre en EDDTableFraFileNames datasæt, som giver brugerne mulighed for at gennemse indholdet af en S3 spand (og download filer) via datasættets"files"mulighed. Der er en[eksempel på dette nedenfor](#viewing-the-contents-of-a-bucket).
     
*   ERDDAP™kan læse data fra[eksternt komprimerede datafiler](#externally-compressed-files), så det er fint, hvis filerne på S3 gemmes som.gz,.gzip,.bz2, .Z eller andre typer af eksterne komprimerede datafiler, som kan dramatisk (2 - 20X) Skær ned på fillagringsomkostninger. Der er ofte ingen tid straf for brug af eksterne komprimerede filer, da det tidspunkt, der er gemt ved at overføre en mindre fil fra S3 tilERDDAPMere om balancer den ekstra tid, der er nødvendig forERDDAP™at dekomprimere filen. Hvis du vil bruge denne funktion, skal du bare sørge for, at datasættets&lt;FilenNameRegex&gt; Giver mulighed for komprimeret filtype (f.eks. ved at tilføje (|.gz) til slutningen af regex) .
     
* For det mest almindelige tilfælde, hvor du har enERDDAP™installeret på din pc til test/udvikling, og hvor datasættet har binære datafiler, der er gemt som objekter i en S3 spand, en tilgang til at få datasættet iERDDAP™er:
    1. Opret en mappe på din PC for at holde et par testdata filer.
    2. Hent to datafiler fra kilden til den mappe, du lige har oprettet.
    3. Brug[GenererDatasetsXml](#generatedatasetsxml)at generere klumpen afdatasets.xmlfor datasættet baseret på de to lokale datafiler.
    4. Kontroller, at datasæt fungerer som ønsket med[Billeder af DasDds](#dasdds)og/eller din lokaleERDDAP.
        
         **Følgende trin gør en kopi af disse datasæt (som vil få data fra S3 spand) på offentlige områderERDDAP.** 
        
    5. Kopier klumpen afdatasets.xmlfor datasættet til datasættetdatasets.xmlfor offentlighedenERDDAP™det vil tjene dataene.
    6. Opret en mappe på offentlighedenERDDAP's lokale harddisk til at holde en cache af midlertidige filer. mappen vil ikke bruge en masse diskplads (Se cachestørrelseGB nedenfor) .
    7. Ændre værdien af datasættets&lt;filDir&gt; tag, så det peger på den mappe, du lige har oprettet (selvom mappen er tomt) .
    8. Tilføj en[cacheFraUrl](#cachefromurl)tag, der angiver datasættets spandnavn og valgfri præfiks (i.e., mappe) i det specifikke[Sådan vises S3 URL-formatetERDDAP™kræver behov](#accessing-files-in-an-aws-s3-bucket).
    9. Tilføj en [&lt;cachestørrelseGB&gt;] (#cachefraurl) tag til datasættets xml (f.eks. 10 er en god værdi for de fleste datasæt) at fortælleERDDAP™for at begrænse størrelsen af den lokale cache (f.eks., prøv ikke at cache alle fjernfiler) .
    10. Se om det virker i offentlighedenERDDAP. Bemærk, at første gangERDDAP™indlæser datasættet, vil det tage lang tid at indlæse, fordiERDDAP™skal downloade og læse alle datafiler.
        
Hvis datasættet er en enorm samling af store gitterded datafiler, vil dette tage en meget lang tid og være upraktisk. I nogle tilfælde for gitterded datafiler,ERDDAP™kan udtrække de nødvendige oplysninger (f.eks. tidspunktet for dataene i en netded datafil) fra filnavnet og undgå dette problem. Se endnu[Aggregation via Filnavne](#aggregation-via-file-names-or-global-metadata).
        
    11. Valgfrit (men især for EDDTableFraFiles datasets) , du kan tilføje en[nThreads](#nthreads)tag til datasættet for at fortælleERDDAPat bruge mere end 1 tråd, når du reagerer på en brugers anmodning om data. Dette minimerer virkningerne af den forsinkelse, der opstår, nårERDDAP™Læser datafiler fra (fjernbetjening) AWS S3 skovle ind i den lokale cache og (måske måske måske måske) undertrykke dem.

#### AWS S3 Åbn data{#aws-s3-open-data} 
Som en del afNOAA's[Big Data Program](https://www.noaa.gov/nodd/about),NOAAhar partnerskaber med fem organisationer, herunder AWS, "at udforske de potentielle fordele ved at lagre kopier af vigtige observationer og modeludgange i skyen for at tillade computer direkte på dataene uden at kræve yderligere distribution". AWS indeholder de datasæt, den får fraNOAAsom en del af programmet til at tilbyde offentlig adgang til en stor samling af[Åbne data på AWS S3](https://registry.opendata.aws/)fra enhver computer, uanset om det er en Amazon-regneinstans (en lejet computer) på AWS-netværket eller din egen pc på ethvert netværk. Eksempelet nedenfor antager, at du arbejder med et offentligt tilgængeligt datasæt.

#### Adgang af filer i en AWS S3 spand{#accessing-files-in-an-aws-s3-bucket} 
Til en privat S3 data spand skal skovlens ejer give dig adgang til spanden. (Se AWS-dokumentationen.) 

I alle tilfælde skal du bruge en AWS-konto, fordi AWS SDK forJava  (somERDDAP™Brug til at hente oplysninger om indholdet af en spand) kræver AWS-konto legitimationsoplysninger. (mere på dette nedenfor) 

ERDDAP™kan kun få adgang til AWS S3 skovle, hvis du angiver [&lt;cacheFraUrl&gt;] (#cachefraurl) (eller&lt;i et bestemt format:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
hvor

* Skoven er den korte form for spandnavnet, f.eks. noaa-goes17 .
* Aws-region, f.eks. us-øst-1, er fra kolonnen "Region" i en af tabellerne i[AWS Service Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html)hvor spanden rent faktisk er placeret.
* Præfikset er valgfri. Hvis det er til stede, skal det ende med'/'.

For eksempel, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Dette URL-format er en af AWS S3 anbefalinger: se[Adgang til en spand](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)og og og[denne beskrivelse af præfikser](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html).ERDDAP™kræver, at du kombinerer skovlens URL og den valgfrie præfiks i én webadresse for at angive&lt;cacheFraUrl&gt; (eller&lt;fileDir&gt;), hvor filerne er placeret.

#### Test Offentlige AWS S3 Skove{#test-public-aws-s3-buckets} 
For offentlige skovle, kan du og skal teste skovlens URL i AWS S3-mappen i din browser, f.eks.
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Hvis skovlens URL er korrekt og egnet tilERDDAP, det vil returnere et XML-dokument, der har (delvis delvis delvis delvis) opslag af indholdet af denne spand. Desværre, den fulde URL (f.eks. spand URL plus præfiks) den, derERDDAP™ønsker for en given datasæt virker ikke i en browser. AWS tilbyder ikke et system til at gennemse hierarkiet af en spand nemt i din browser. (Hvis det er forkert, bedes du kontakte Chris. John på noaa.gov. Ellers, Amazon, skal du tilføje støtte til dette&#33;) 

#### Se Indholdsfortegnelsen af en spand{#viewing-the-contents-of-a-bucket} 
S3 skovle indeholder ofte et par kategorier af filer, i et par pseudo subdirectories, som kunne blive et par afERDDAP™Datasets. Sådan laver duERDDAP™Datasets, du skal vide startmappen for&lt;cacheFraUrl&gt; (eller&lt;fileDir&gt;) og formatet af de filnavne, der identificerer, at undersæt af filer. Hvis du forsøger at se hele indholdet af en spand i en browser, vil S3 kun vise dig de første 1000 filer, som er utilstrækkelig. I øjeblikket, den bedste måde for dig at se alt indholdet af en spand er at gøre en[EDDTableFraFileNames](#eddtablefromfilenames)Datasæt (på din pc'sERDDAP™og/eller på din offentligeERDDAP) , som også giver dig en nem måde at gennemse mappestrukturen og downloade filer. The The The The The The The&lt;fileDir&gt; for det vil være den webadresse, du har foretaget ovenfor, f.eks. https://noaa-goes17.s3.us-east-1.amazonaws.com .\\[Hvorfor tilbyder AWS S3 en hurtig og nem måde at gøre dette uden en AWS-konto?\\]Bemærk, at når jeg gør dette på min pc på et ikke-Amazon-netværk, vises det, at Amazon bremser svaret på et trickle (omkring 100 (?) filer pr. chunk) efter de første par bidder (af 1000 af filer pr. klump) downloades. Da skovle kan have et stort antal filer (noaa-goes17 har 26 millioner) , at få alt indholdet af en spand kan tage EDDTableFraFileNames flere timer (f.eks. 12&#33;) at afslutte.\\[Amazon, er det rigtige?&#33;\\]

#### At gøre en EDDTabel FraFileNames Dataset med en AWS S3 spand{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Hvis du har et spandnavn, men ikke allerede har en liste over filer i S3 spanden eller det præfiks, der identificerer placeringen af de relevante filer i spanden, skal du bruge instruktionerne herunder for at gøre en EDDTableFraFileNames dataset, så du kan gennemse katalog hierarkiet af S3 spand viaERDDAP's"files"system.

1. Åbn en AWS-konto
    ERDDAP™Brug af cookies[AWS SDK forJava](https://docs.aws.amazon.com/sdk-for-java/index.html)at få spand information fra AWS, så du skal bruge[Oprette og aktivere en AWS-konto](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). Det er et ret stort job, med masser af ting at lære.
     
2. Sæt dine AWS Credentials, hvorERDDAP™kan finde dem.
Følg instruktionerne på[Opsæt AWS Credentials og Region for Udvikling](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)så så sådanERDDAP™  (specifikt, AWS SDK forJava) vil kunne finde og bruge dine AWS-oplysninger. HvisERDDAP™kan ikke finde legitimationsoplysningerne, vil du se en
java.lang. IllegalArgumentException: profilfilen kan ikke vises fejl iERDDAP's log.txt-fil.
    
Hint for Linux og Mac OS: legitimationsfilen skal være i hjemmemappen af brugeren, der kører Tomcat (og og ogERDDAP)   (for dette afsnit, vil vi antage bruger=tomcat) i en fil kaldet ~ /.save / credentials . Må ikke antage, at ~ er /home/tomcat -- faktisk bruger cd ~ at finde ud af, hvor operativsystemet mener ~ for bruger=tomcat er. Opret mappen, hvis den ikke findes. Når du har lagt legitimationsfilen på plads, skal du sørge for, at brugeren og gruppen til filen er tomcat og derefter bruge lmmod 400 legitimationsoplysninger til at sikre, at filen er read-only for bruger=tomcat.
    
3. Opret skovl URL i skovlen[format, derERDDAP™kræver behov](#accessing-files-in-an-aws-s3-bucket)f.eks.
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com), og (til offentlige skovle) Test det i en browser for at sikre, at det returnerer et XML-dokument, som har en delvis liste indholdet af denne spand.
     
4. Brug[GenererDatasetsXml](#generatedatasetsxml)at oprette en[EDDTableFraFileNames](#eddtablefromfilenames)Datasæt:
    * For startmappen skal du bruge denne syntaks:
        \\*\\*\\ *fraOnTheFly,* Hoteller i nærheden af YourBucketUrl*
for eksempel,
        \\*\\*\\* fraOnTheFly, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * filnavn regex? .\\*
    * Reklamation? sande sande sande sande
    * reload Hvad er der? 10080
    *   infoUrl? https://registry.opendata.aws/noaa-goes/
 
    * institution?NOAA
    * oversigt? Intet (ERDDAP™vil oprette en anstændig oversigt automatisk.) 
    * titel? Intet (ERDDAP™vil oprette en anstændig titel automatisk.) Som sædvanlig bør du redigere den resulterende XML til at bekræfte korrekthed og foretage forbedringer, før mængden af datasæt bruger det idatasets.xml.
5. Hvis du følger instruktionerne ovenfor og indlæse datasættet iERDDAP, du har oprettet en EDDTableFraFiles dataset. Som et eksempel, og for at gøre det nemmere for alle at gennemse og downloade filer fra AWS Open Data skovle, har vi skabt EDDTableFraFileNames datasets (se listen på listen på
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)) for næsten alle af[AWS S3 Åbne dataskovler](https://registry.opendata.aws/).
    \\[De få skovle, som vi ikke indeholder, enten har et stort antal filer i rodmappen (mere end kan downloades i en rimelig mængde tid)  eller ikke tillade offentlig adgang (er ikke de alle skulle være offentlige?) , eller er Anmodninger Pays skovle (f.eks. Sentinel) .\\]  
Hvis du klikker på"files"link til et af disse datasæt, kan du gennemse mappetræet og filer i denne S3 spand. På grund af vejen\\*\\*\\*fraOnTheFly EDDTableFraFiles virker, disse mappelister er altid perfekt opdateret, fordiERDDAP™får dem på farten. Hvis du klikker ned på mappetræet til et egentligt filnavn og klikker på filnavnet,ERDDAP™vil omdirigere din anmodning til AWS S3, så du kan downloade filen direkte fra AWS. Du kan derefter inspicere den fil.
    
Har du lyst?
Hvis dine EDDTableFraFiles ikke indlæses iERDDAP™  (eller DasDds) , se i log.txt-filen for en fejlmeddelelse. Hvis du ser en
java.lang. IllegalArgumentException: profilfilen kan ikke være null fejl, problemet er, at AWS SDK forJava  (brugt afERDDAP) Finder ikke legitimationsfilen. Se anvisningerne ovenfor.
     

Det er uheldigt, at AWS ikke blot tillader folk at bruge en browser til at se indholdet af en offentlig spand.

 **Så kan du laveERDDAP™Datasets, der giver brugerne adgang til dataene i filerne.**   
Se anvisningerne i[ERDDAP™og S3 Skove](#erddap-and-aws-s3-buckets)  (ovenfor) .
Til prøven EDDTableFraFileNames datasæt, som du har lavet ovenfor, hvis du gør en lille pust rundt med mappen og filnavne i mappetræet, bliver det klart, at topniveaumappen navne (fx ABI-L1b-RadC) svarer til hvadERDDAP™ville kalde separate datasæt. Den spand, du arbejder med, kan være lignende. Du kan derefter forfølge at oprette separate datasæt iERDDAP™for hver af disse datasæt, ved hjælp af f.eks.
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
som det&lt;cacheFraUrl&gt;. Desværre synes datasætene i spanden alle at være niveau 1 eller niveau 2 datasæt, som alle synes at være niveau 1 eller niveau 2 datasæt.ERDDAP™ [er ikke særlig god til](#dimensions), fordi datasættet er en mere kompliceret samling af variabler, der bruger forskellige dimensioner.
     
    
### NcML filer{#ncml-files} 
NcML-filer giver dig mulighed for at angive ændringer på en eller flere oprindelige kildeNetCDF  (v3 eller v4)  .nc, .grib, .bufr eller.hdf  (v4 eller v5) filer, og derefter harERDDAP™Behandling af.ncml filer som kildefiler.ERDDAP™Datasets vil acceptere.ncml filer når.ncfiler forventes. NcML-filer SKAL have udvidelsen.ncml. Se billederne[UnidataNcML dokumentation](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). NcML er nyttig, fordi du kan gøre nogle ting med det (for eksempel at foretage forskellige ændringer i forskellige filer i en samling, herunder tilføje en dimension med en bestemt værdi til en fil) , at du ikke kan gøre medERDDAP'sdatasets.xml.

* Ændringer til en.ncml fils sidsteModified tid vil forårsage, at filen skal indlæses, når datasættet er indlæst, men ændringer i den underliggende.ncDatafiler vil ikke være direkte bemærket.
* Hint: NcML er\\*meget meget meget\\*følsom over for ordren af nogle elementer i NcML-filen. Tænk på NcML som specificerer en række instruktioner i den angivne rækkefølge, med intentionen om at ændre kildefiler (staten på start/top af NcML-filen) i destinationsfiler (staten i slutningen/bottom of te NcML-filen) .

Et alternativ til NcML er[NetCDFOperatører (NCO) ](#netcdf-operators-nco). Den store forskel er, at NcML er et system til at foretage ændringer på farten (så kildefiler ikke ændres) , mensNCOkan bruges til at foretage ændringer (eller nye versioner af) filerne. BeggeNCOog NcML er meget, meget fleksibel og giver dig mulighed for at lave næsten enhver ændring, du kan tænke på filerne. For begge kan det være svært at finde ud af præcis, hvordan man gør det, du ønsker at gøre - kontrollere nettet for lignende eksempler. Begge er nyttige værktøjer til at forberede netCDF ogHDFfiler til brug medERDDAP, navnlig for at foretage ændringer ud over, hvadERDDAP's manipulation system kan gøre.

Eksempel #1: Tilføjelse af en Time Dimension med en enkelt værdi
Her er en del.ncml fil, der skaber en ny ydre dimension (tid, med 1 værdi: 1041379200) og tilføjer denne dimension til billedvariablen i filen ved navn A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Eksempel #2: Ændring af en eksisterende tidsværdi
Nogle gange kilden.ncfil har allerede en tidsdimension og tidsværdi, men værdien er forkert (til dine formål) . Dette.ncml fil siger: for datafilen ved navn ""19810825230030-NCEI...", for dimensionen variabel"time", sæt enheds attributten til at være "andre siden 1970-01T00:00:00Z" og sæt den tid værdi, der skal være 367588800.
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
"The netCDF Operators (NCO) består af et dusin singler, kommandolinjeprogrammer, der tager netCDF\\[v3 eller v4\\],HDF \\[v4 eller v5\\],\\[.grib,.bufr,\\]og/ellerDAPfiler som input, og derefter betjene (f.eks. derivat nye data, beregningsstatistik, udskrivning, hyperslab, manipulere metadata) og output resultaterne til skærm eller filer i tekst, binære eller netCDF formater.NCOhjælpemidler til analyse af gitterded videnskabelige data. Den shell-command stil afNCOgør det muligt for brugerne at manipulere og analysere filer interaktivt, eller med udtryksfulde scripts, der undgår nogle kontraster på højere niveauer programmeringsmiljøer." (fra fra[NCO](https://nco.sourceforge.net/)hjemmeside hjemmeside hjemmeside) .

Et alternativ tilNCOer det er[NcML](#ncml-files). Den store forskel er, at NcML er et system til at foretage ændringer på farten (så kildefiler ikke ændres) , mensNCOkan bruges til at foretage ændringer (eller nye versioner af) filerne. BeggeNCOog NcML er meget, meget fleksibel og giver dig mulighed for at lave næsten enhver ændring, du kan tænke på filerne. For begge kan det være svært at finde ud af præcis, hvordan man gør det, du ønsker at gøre - kontrollere nettet for lignende eksempler. Begge er nyttige værktøjer til at forberede netCDF ogHDFfiler til brug medERDDAP, navnlig for at foretage ændringer ud over, hvadERDDAP's manipulation system kan gøre.

Du kan f.eks. brugeNCOfor at gøre enhederne i den tidsvariable konsistent i en gruppe filer, hvor de ikke var konsekvent oprindeligt. Eller du kan brugeNCOFor at ansøgescale\\_factorog og ogadd\\_offseti en gruppe filer, hvorscale\\_factorog og ogadd\\_offsethar forskellige værdier i forskellige kildefiler.
 (Eller kan du nu håndtere disse problemer iERDDAP™via[EDDGridFraNcFilesUnpakke](#eddgridfromncfilesunpacked), som er en variant afEDDGridFraNcFiles som pakker pakket data og standardiserer tidsværdier på et lavt niveau for at håndtere en samling filer, der har forskelligescale\\_factors og sadd\\_offset, eller forskellige tidsenheder.) 

NCOer gratis og open source software, der bruger den[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)licens.

Eksempel #1: Gør enheder konsekvent
EDDGridFraFiles og EDDTable Fra filer insisterer på, at enhederne til en given variabel er identisk i alle filer. Hvis nogle af filerne er trivially (ikke funktionelt) forskellige fra andre (f.eks. tid enheder af
"sekikkere siden 1970-01-07-2017 UTC" versus
"seconds since 1970-01-01T00:00:00Z", du kunne brugeNCO's[ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor). for at ændre enhederne i alle de filer, der skal være identisk med
nco/ncatted -a enheder, tid,o,c,'s sekunder siden 1970-01T00:00:00Z.nc  
\\[For mange problemer som dette i EDDTableFra... Filer datasæt, du kan nu bruge[standardiser Hvad](#standardizewhat)at fortælleERDDAPat standardisere kildefiler, da de læses indERDDAP.\\]
    
### Begrænsninger til størrelsen af et datasæt{#limits-to-the-size-of-a-dataset} 
Du vil se mange referencer til "2 milliarder" nedenfor. Mere præcist, det er en reference til 2,147,483,647 (2. verdenskrig) , som er den maksimale værdi af en 32-bit underskrevet iteger. På nogle computersprog, f.eks.Java  (somERDDAP™er skrevet i) , der er den største datatype, der kan bruges til mange datastrukturer (f.eks. størrelsen på en array) .

Til strenge værdier (for eksempel for variable navne, attributnavne, String attributværdier og String dataværdier) , det maksimale antal tegn pr streng iERDDAP™er ~2 milliarder. Men i næsten alle tilfælde vil der være små eller store problemer, hvis en streng overstiger en rimelig størrelse (f.eks. 80 tegn til variable navne og attributnavne, og 255 tegn for de fleste streng attributværdier og dataværdier) . F.eks. vil websider, der viser lange variable navne, være akavet bredt og lange variable navne, blive afkortet, hvis de overskrider grænsen for svarfilen type.

Til gitterede datasæt:

* Det maksimale antalaxisVariables er ~2 milliarder.
Det maksimale antaldataVariables er ~2 milliarder.
Men hvis et datasæt har &gt;100 variabler, vil det være besværligt for brugerne at bruge.
Og hvis et datasæt har &gt;1 millioner variabler, vil din server bruge en masse fysisk hukommelse, og der vil være andre problemer.
* Den maksimale størrelse af hver dimension (axisVariable) er ~2 milliarder værdier.
* Jeg tror det maksimale samlede antal celler (Produktet af alle dimensionstørrelser) er ubegrænset, men det kan være ~9e18.

Til tabulære datasæt:

* Det maksimale antaldataVariables er ~2 milliarder.
Men hvis et datasæt har &gt;100 variabler, vil det være besværligt for brugerne at bruge.
Og hvis et datasæt har &gt;1 millioner variabler, vil din server bruge en masse fysisk hukommelse, og der vil være andre problemer.
* Det maksimale antal kilder (f.eks. filer) der kan aggregeres er ~2 milliarder.
* I nogle tilfælde, det maksimale antal rækker fra en individuel kilde (for eksempel en fil, men ikke en database) er ~2 milliarder rækker.
* Jeg tror ikke der er andre grænser.

For både gitterede og tabulære datasæt, er der nogle interne grænser på størrelsen af undersættet, der kan anmodes af en bruger i en enkelt anmodning (ofte relateret til &gt;2 milliarder af noget eller ~9e18 af noget) , men det er langt mere sandsynligt, at en bruger vil ramme de filtypespecifikke begrænsninger.

*   NetCDFversion 3.ncfiler er begrænset til 2 GB bytes. (Hvis dette er virkelig et problem for nogen, lad mig vide: Jeg kunne tilføje støtte til denNetCDFversion 3.nc64-bit udvidelse ellerNetCDFVersion 4, som ville øge grænsen betydeligt, men ikke uendelig.) 
* Browserer nedbrud efter kun ~500 MB data, såERDDAP™begrænser reaktionen.htmlTableanmodninger om ~ 400 MB af data.
* Mange dataanalyseprogrammer har lignende grænser (For eksempel er den maksimale størrelse af en dimension ofte ~2 milliarder værdier) , så der er ingen grund til at arbejde hårdt for at komme rundt i de filtypespecifikke grænser.
* Filtypespecifikke grænser er nyttige i, at de forhindrer naive anmodninger om virkelig store mængder data (for eksempel "give mig alle disse datasæt", når datasættet har 20 TB data) , som ville tage uger eller måneder at downloade. Jo længere downloaden, desto mere sandsynligt vil det undlade en række grunde.
* De filtypespecifikke begrænsninger er nyttige i, at de tvinge brugeren til at beskæftige sig med rimelig størrelse subsets (f.eks. at håndtere et stort gitterded datasæt via filer med data fra én gang peger hver enkelt gang) .
         
### Skift til ACDD-1.3{#switch-to-acdd-13} 
Vi vi vi vi (mærkbart[GenererDatasetsXml](#generatedatasetsxml)) I øjeblikket anbefaler[ACDD version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3), som blev ratificeret i begyndelsen af 2015, og som henvises til som "ACDD-1.3" i den globale konventions attribut. Inden forERDDAP™version 1.62 (udgivet i juni 2015) ,ERDDAP™brugt/anbefalet den oprindelige version 1.0, af den[NetCDFIntributekonventionen for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)som blev omtalt som "UnidataDataset Discovery v1.0" i de globale konventioner ogMetadata\\_Conventionsattributter.

Hvis dine datasæt bruger tidligere versioner af ACDD, anbefaler vi, at du skifter til ACDD-1.3. Det er ikke svært. ACDD-1.3 er meget bagud kompatibel med version 1.0. For at skifte, for alle datasæt (undtagenEDDGridFra Erddap og EDDTable FraErddap datasæt) :

1. Fjern den nyopførte globaleMetadata\\_Conventionsattribut ved at tilføje (eller ved at ændre de eksisterendeMetadata\\_Conventionsattribut)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
til datasættets globale globale&lt;addAttributes&gt;.
     
2. Hvis datasættet har en konventions attribut i den globale&lt;addAttributes&gt;, ændre alle "UnidataDataset Discovery v1.0" referencer til "ACDD-1.3".
Hvis datasættet ikke har en konventions attribut i den globale verden&lt;addAttributes&gt;, derefter tilføje en, der henviser til ACDD-1.3. For eksempel,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Hvis datasættet har en globalstandard\\_name\\_vocabularyattribut, skal du ændre formatet af værdien for eksempel,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Hvis referencen er til en ældre version af referencen[CF standard navnebord](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Det er sandsynligvis en god ide at skifte til den aktuelle version (65, som vi skriver dette) , da nye standardnavne tilføjes til tabellen med efterfølgende versioner, men gamle standardnavne er sjældent afgrænset og aldrig fjernet.
     
4. Selvom ACDD-1.0 omfattede globale attributter forcreator\\_name,creator\\_email,creator\\_url,[GenererDatasetsXml](#generatedatasetsxml)ikke automatisk tilføje dem, indtil nogle gange omkringERDDAP™v1.50. Dette er vigtige oplysninger:
        
    *   creator\\_namelader brugerne vide/cite skaberen af datasættet.
    *   creator\\_emailfortæller brugerne den foretrukne e-mailadresse til at kontakte skaberen af datasættet, f.eks. hvis de har spørgsmål om datasættet.
    *   creator\\_urlgiver brugerne en måde at finde ud af mere om skaberen.
    *   ERDDAP™Brug alle disse oplysninger, når du genererer FGDC og ISO 19115-2/19139 metadata dokumenter for hvert datasæt. Disse dokumenter bruges ofte af eksterne søgetjenester.
    
Tilføj disse attributter til datasættets globale globale&lt;addAttributes&gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Det er det. Jeg håber, at det ikke var for hårdt.
     
### Zarrr{#zarr} 
Som version 2.25ERDDAP™kan læse lokale Zarrr filer ved hjælp af[EDDTableFraNcFiles](#eddtablefromncfiles)og og og[EDDGridFraNcFiles](#eddgridfromncfiles).

 (Af august 2019) Vi kunne nemt være forkert, men vi er endnu ikke overbevist om, at[Zarrr](https://github.com/zarr-developers/zarr-python), eller lignende systemer, der bryder datafiler op i mindre stykker, er gode løsninger på problemet medERDDAP™læsning af data gemt i cloud-tjenester som Amazon AWS S3. Zarrr er en stor teknologi, der har vist sin nytte i en række situationer, vi er bare ikke sikre på, atERDDAP+S3 vil være en af disse situationer. Oftest siger vi: før vi skynder os at gøre indsatsen for at gemme alle vores data i Zarrr, lad os gøre nogle tests for at se, om det faktisk er en bedre løsning.

Problemer med at få adgang til data i skyen er laten (forsinkelsen til først at få data) og filniveau adgang (snarere end adgang til blokniveau) . Zarrr løser fil-niveau adgang problem, men gør intet ved latency. Sammenlignet med blot at downloade filen (så det kan læses som en lokal fil med blokereniveau adgang) , Zarrr kan endda forværre lat problemet, fordi med Zarrr, læsning af en fil nu involverer en række flere opkald til at læse forskellige dele af filen (hver med sin egen forsinkelse) . Fejlproblemet kan løses ved at parallelle anmodningerne, men det er en højere opløsning, ikke afhængig af Zarrr.

Og med Zarrr (som med relationsdatabaser) , vi mister bekvemmeligheden af at have en datafil er en simpel, enkelt fil, som du nemt kan bekræfte integriteten af eller downloade en kopi af.

ERDDAP™  (af v2) har et system til at opretholde en lokal cache af filer fra en URL-kilde (fx S3) (se []&lt;cacheFraUrl&gt; og&lt;cacheMaxGB&gt;] (#cachefraurl) ). Og den nye&lt;nThreads&gt;] (#læssere) bør minimere latency problem ved at parallelle datahentning på et højt niveau.&lt;cacheFraUrl&gt; synes at arbejde meget godt for mange scenarier. (Vi er ikke sikker på, hvor gavnligt&lt;nThreads&gt; er uden yderligere test.) Vi indrømmer, at vi ikke har gennemført timing tests på en AWS-instans med en god netværksforbindelse, men vi har med succes testet med forskellige eksterne URL-kilder af filer. Og og ogERDDAP's&lt;cacheFraUrl&gt; arbejder med enhver type datafil (fx,.nc,.hdf.csv,.jsonlCSV) , selvom ekstern komprimeret (fx,.gz) , uden ændringer i filerne (f.eks. omskrive dem som Zarrr samlinger) .

Det er sandsynligt, at forskellige scenarier vil gavne forskellige løsninger, f.eks. kun nødt til at læse en del af en fil én gang (Zarrr vil vinde) , vs. skal læse alle en fil én gang, vs. skal læse del eller alle en fil gentagne gange (&lt;cacheFraUrl&gt; vil vinde).

Oftest siger vi: før vi skynder os at gøre indsatsen for at gemme alle vores data i Zarrr, lad os gøre nogle tests for at se, om det faktisk er en bedre løsning.

- - - - -
## Liste over typer datasæt{#list-of-types-datasets} 
Hvis du har brug for hjælp til at vælge den rigtige datasæt type, se[Valg af datasæt Type](#choosing-the-dataset-type).

Typerne af datasæt falder i to kategorier. ([Hvorfor?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)Datasets håndterer gitterded data.
    * I nærheden af In In In In In In In In In In In In In InEDDGridDatasæt, datavariabler er flerdimensionelle matrixer af data.
    * Der skal være en akse variabel for hver dimension. Axis variabler skal specificeres i den rækkefølge, at datavariablerne bruger dem.
    * I nærheden af In In In In In In In In In In In In In InEDDGridDatasæt, alle datavariabler skal bruge (Del dele) alle aksevariabler.
         ([Hvorfor?](#why-just-two-basic-data-structures) [Hvad hvis de ikke er?](#dimensions)) 
    * Sorteret Dimension Værdier - I alleEDDGriddatasæt, hver dimension skal være i sorteret rækkefølge (stigende eller faldende) . Hver kan være uregelmæssigt rum. Der kan ikke være nogen bånd. Dette er et krav om kravet[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Hvis nogen dimensions værdier ikke er i sorteret rækkefølge, vil datasættet ikke blive indlæst ogERDDAP™vil identificere den første usorteret værdi i logfilen, *bigParentDirectory* /logs/log.txt .
        
Et par underklasser har yderligere restriktioner (især,EDDGridAggregateExistingDimension kræver, at den yderste (venstreste, første) dimension stiger.
        
Uspecificerede dimensionværdier angiver næsten altid et problem med kildedatasættet. Dette forekommer oftest, når en forkert eller upassende fil er inkluderet i aggregationen, som fører til en usorteret tidsdimension. Hvis du vil løse dette problem, skal du se fejlmeddelelsen i meddelelsenERDDAP™log.txt-filen for at finde den fornærmende tidsværdi. Så se i kildefiler for at finde den tilsvarende fil (eller en før eller en efter) det tilhører ikke i sammenlægningen.
        
    * Se den mere fuldstændige beskrivelse af[EDDGriddatamodel](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    * The The The The The The TheEDDGridDatasættyper er:
        *   [EDDGridFraAudioFiles](#eddfromaudiofiles)aggregerer data fra en gruppe af lokale lydfiler.
        *   [EDDGridFraDap](#eddgridfromdap)håndterer gitterdata fraDAPservere.
        *   [EDDGridFraEDDTable](#eddgridfromeddtable)lader dig konvertere en faneformet datasæt til et gitteret datasæt.
        *   [EDDGridFraErddap](#eddfromerddap)håndterer netded data fra en fjernERDDAP.
        *   [EDDGridFraEtopo](#eddgridfrometopo)Bare håndterer de indbyggede ETOPO topografidata.
        *   [EDDGridFraFiles](#eddgridfromfiles)er superklassen af alleEDDGridFra...Filer klasser.
        *   [EDDGridFraMergeIRFiles](#eddgridfrommergeirfiles)aggregerer data fra en gruppe af lokale FleIR.gzfiler.
        *   [EDDGridFraNcFiles](#eddgridfromncfiles)aggregerer data fra en gruppe af lokaleNetCDF  (v3 eller v4)  .ncog relaterede filer.
        *   [EDDGridFraNcFilesUnpakke](#eddgridfromncfilesunpacked)er en variant, hvisEDDGridFraNcFiles som også aggregerer data fra en gruppe lokaleNetCDF  (v3 eller v4)  .ncog relaterede filer, somERDDAP™Pakker på et lavt niveau.
        *   [EDDGridLonPM180](#eddgridlonpm180)ændrer de længdeværdier af et barnEDDGridså de er i sortimentet -180 til 180.
        *   [EDDGridLon0360](#eddgridlon0360)ændrer de længdeværdier af et barnEDDGridså de er i området 0 til 360.
        *   [EDDGridSideforside](#eddgridsidebyside)Samler to eller flereEDDGridDatasets side af side.
        *   [EDDGridAggregateExistingDimension](#eddgridaggregateexistingdimension)Samler to eller flereEDDGridDatasets, som hver især har en række værdier for den første dimension, men identiske værdier for de andre dimensioner.
        *   [EDDGridKopiere Kopier](#eddgridcopy)kan lave en lokal kopi af en andenEDDGrid's data og tjener data fra den lokale kopi.
             
    * AlleEDDGridDatasets understøtter en nThreads indstilling, som fortællerERDDAP™hvor mange tråde skal bruge, når de reagerer på en anmodning. Se billederne[nThreads](#nthreads)dokumentation for detaljer.
         
### EDDTabel{#eddtable} 
*   [ **EDDTabel** ](#eddtable)Datasets håndterer tabulære data.
    * Tabulære data kan repræsenteres som en databaselignende tabel med rækker og kolonner. Hver kolonne (en datavariabel) har et navn, et sæt attributter, og gemmer kun en type data. Hver række har en observation (eller gruppe af relaterede værdier) . Datakilden kan have data i en anden datastruktur, en mere kompliceret datastruktur og/eller flere datafiler, menERDDAP™skal kunne fladisere kildedataene i en databaselignende tabel for at præsentere dataene som et tabulært datasæt til brugerne afERDDAP.
    * Se den mere fuldstændige beskrivelse af[Sikkerhedsdatamodel](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    * De EDDTable datasæt typer er:
        *   [EDDTableFraAllDatasets](#eddtablefromalldatasets)er et datasæt, der har oplysninger om alle de andre datasæt i dine dataERDDAP.
        *   [EDDTableFraAsciiFiles](#eddtablefromasciifiles)aggregerer data fra komma-, fane-, semikolonin- eller rum-separatede tabulære ASCII-datafiler.
        *   [EDDTableFraAsciiService](#eddtablefromasciiservice)er den superklasse af alle EDDTableFraAsciiService... klasser.
        *   [EDDTableFraAsciiServiceNOS](#eddtablefromasciiservicenos)håndterer data fra nogle afNOAANOS webtjenester.
        *   [EDDTableFraAudioFiles](#eddfromaudiofiles)aggregerer data fra en gruppe af lokale lydfiler.
        *   [EDDTableFra Billeder af AwsXmlFiles](#eddtablefromawsxmlfiles)aggregerer data fra et sæt Automatisk Vejrstation (AWS) XML-filer.
        *   [EDDTableFraCassandra](#eddtablefromcassandra)håndterer tabulære data fra en Cassandra tabel.
        *   [EDDTableFra kolonnearAsciiFiles](#eddtablefromcolumnarasciifiles)aggregerer data fra tabular ASCII datafiler med fast bredde data kolonner.
        *   [EDDTableFraDapSequence](#eddtablefromdapsequence)håndterer tabulære data fraDAPsekvensservere.
        *   [EDDTableFraDatabase](#eddtablefromdatabase)håndterer tabulære data fra en databasetabel.
        *   [EDDTableFraEDDGrid](#eddtablefromeddgrid)lader dig oprette en EDDTable datasæt fra enEDDGridDatasæt.
        *   [EDDTableFraErddap](#eddfromerddap)håndterer tabulære data fra en fjernERDDAP.
        *   [EDDTableFraFileNames](#eddtablefromfilenames)oprette et datasæt fra oplysninger om en gruppe filer i serverens filsystem, men det tjener ikke data fra filerne.
        *   [EDDTableFraFiles](#eddtablefromfiles)er den superklasse af alle EDDTableFra...Files klasser.
        *   [EDDTableFraHttpGet](#eddtablefromhttpget)er det erERDDAP's eneste system til dataimport samt dataeksport.
        *   [EDDTableFraHyraxFiler](#eddtablefromhyraxfiles)  (DEPRECATED) aggregerer data fra filer med flere variabler med delte dimensioner serveret af en[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).
        *   [EDDTableFraInvalidCRAFiles](#eddtablefrominvalidcrafiles)aggregerede data fraNetCDF  (v3 eller v4)  .ncfiler, der bruger en bestemt, ugyldig variant af CF DSG Contiguous Ragged Array (CRA) filer. Selv om selvomERDDAP™understøtter denne filtype, er det en ugyldig filtype, der ingen skal begynde at bruge. Grupper, der bruger denne filtype, opfordres til at brugeERDDAP™at generere gyldige CF DSG CRA-filer og stoppe med at bruge disse filer.
        *   [EDDTableFraJsonlCSVFiles](#eddtablefromjsonlcsvfiles)aggregerede data fra[JSON Linje CSV-filer](https://jsonlines.org/examples/).
        *   [EDDTableFraMultidimNcFiles](#eddtablefrommultidimncfiles)aggregerede data fraNetCDF  (v3 eller v4)  .ncfiler med flere variabler med delte dimensioner.
        *   [EDDTableFraNcFiles](#eddtablefromncfiles)aggregerede data fraNetCDF  (v3 eller v4)  .ncfiler med flere variabler med delte dimensioner. Det er fint at fortsætte med at bruge denne datasæt type til eksisterende datasæt, men for nye data anbefaler vi at bruge EDDTableFraMultidimNcFiles i stedet.
        *   [EDDTableFraNcCFFiles](#eddtablefromnccffiles)aggregerede data fraNetCDF  (v3 eller v4)  .ncfiler, der bruger en af de filformater, der er angivet af de[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konventioner. Men til filer ved hjælp af en af de multidimensionelle CFG-varianter, brug[EDDTableFraMultidimNcFiles](#eddtablefrommultidimncfiles)I stedet.
        *   [EDDTableFraNccsvFiles](#eddtablefromnccsvfiles)aggregerede data fra[NCCSV](/docs/user/nccsv-1.00)ASCII .csv filer.
        *   [EDDTableFraNOS](#eddtablefromnos)  (DEPRECATED) håndterer tabulære data fra NOS XML-servere.
        *   [EDDTableFraOBIS](#eddtablefromobis)håndterer tabulære data fra OBIS servere.
        *   [EDDTableFra parkFiles](#eddtablefromparquetfiles)håndterer data fra[Udsigt fra værelset](https://parquet.apache.org/).
        *   [EDDTableFraSOS](#eddtablefromsos)håndterer tabulære data fraSOSservere.
        *   [EDDTableFraThreddsFiles](#eddtablefromthreddsfiles)  (DEPRECATED) aggregerer data fra filer med flere variabler med delte dimensioner serveret af en[I nærheden afTHOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).
        *   [EDDTableFraWFSFiler](#eddtablefromwfsfiles)  (DEPRECATED) gør en lokal kopi af alle data fra enArcGISMapServerWFSserver, så dataene kan igen betjenes hurtigt tilERDDAP™Brugere.
        *   [EDDTableAggregateRows](#eddtableaggregaterows)kan gøre en EDDTable datasæt fra en gruppe EDDTable datasæt.
        *   [EDDTableCopy](#eddtablecopy)kan foretage en lokal kopi af mange typer EDDTable datasæt og derefter genbevar dataene hurtigt fra den lokale kopi.

  
- - - - -

## Detaljerede beskrivelse af Dataset Typer{#detailed-descriptions-of-dataset-types} 

### EDDGridFraDap{#eddgridfromdap} 
[ **EDDGridFraDap** ](#eddgridfromdap)håndtag gittervariabler fra[DAP](https://www.opendap.org/)servere.

* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan indsamle de oplysninger, du har brug for til at justere, eller oprette din egen XML til enEDDGridFraDap datasæt ved at se på kildedatasættets DDS og DAS-filer i din browser (ved at tilføje .das og .dds tilsourceUrlf.eks.[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) .
     
*   EDDGridFraDap kan få data fra enhver flerdimensionel variabel fra enDAPdataserver. (Tidligere,EDDGridFraDap var begrænset til variabler udpeget som "grid"'s, men det er ikke længere et krav.)   
     
* Sorteret Dimension Værdier - Værdierne for hver dimension skal være i sorteret rækkefølge (stigende eller faldende) . Værdierne kan være uregelmæssigt mellemrum. Der kan ikke være nogen bånd. Dette er et krav om kravet[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Hvis nogen dimensions værdier ikke er i sorteret rækkefølge, vil datasættet ikke blive indlæst ogERDDAP™vil identificere den første usorteret værdi i logfilen, *bigParentDirectory* /logs/log.txt .
    
Uspecificerede dimensionværdier angiver næsten altid et problem med kildedatasættet. Dette forekommer oftest, når en forkert eller upassende fil er inkluderet i aggregationen, som fører til en usorteret tidsdimension. Hvis du vil løse dette problem, skal du se fejlmeddelelsen i meddelelsenERDDAP™log.txt-filen for at finde den fornærmende tidsværdi. Så se i kildefiler for at finde den tilsvarende fil (eller en før eller en efter) det tilhører ikke i sammenlægningen.
    
#### EDDGridFra Dap skelet XML XML{#eddgridfromdap-skeleton-xml} 

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

     
### EDDGridFraEDDTable{#eddgridfromeddtable} 
[ **EDDGridFraEDDTable** ](#eddgridfromeddtable)lader dig konvertere en EDDTable tabular datasæt til etEDDGridgitteret datasæt. Husk, atERDDAP™Behandle datasæt som enten[gitterede datasæt (subklasser afEDDGrid) eller tabulære datasæt (subclasses af EDDTable) ](#why-just-two-basic-data-structures).

* Normalt, hvis du har gitterded data, skal du bare oprette enEDDGridDatasæt direkte. Nogle gange er dette ikke muligt, f.eks. når du har de data, der er gemt i en relational database, der er gemtERDDAP™kan kun få adgang via EDDTableFraDatabase.EDDGridFraEDDTable klasse lader dig afhjælpe denne situation.
     
* Naturligvis skal data i det underliggende EDDTable datasæt være (dybest set) gitterede data, men i en faneformet form. For eksempel kan EDDTable datasæt have CTD-data: målinger af øst og nordvendt strøm, på flere dybder, på flere gange. Da dybderne er de samme på hvert tidspunkt,EDDGridFraEDDTable kan oprette et gitteret datasæt med en tid og en dybdedimension, der åbner dataene via det underliggende EDDTable datasæt.
     
* GenererDatasets Xml -- Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan indsamle de oplysninger, du har brug for til at forbedre det grove udkast.
     
* Kilder -- Som med alle andre typer datasæt,EDDGridFraTable har ideen om, at der er global kildeAttributes og[globalt globalt globalt globaltaddAttributes](#global-attributes)  (angivet idatasets.xml) , som kombineres for at gøre den globale kombineret Attributter, som er, hvad brugerne ser. Til global kildeAttributes,EDDGridFraEDDTable bruger den globale kombination Intributter af den underliggende EDDTable datasæt. (Hvis du tænker på det i et minut, det giver mening.) 
    
Ligeledes for hveraxisVariable's og'dataVariable's[addAttributes](#addattributes),EDDGridFraEDDTable bruger variablens kombinerede Bidrager fra den underliggende EDDTable datasæt som denEDDGridFraEDDTable variables kildeAttributes. (Hvis du tænker på det i et minut, det giver mening.) 
    
Som konsekvens, hvis EDDTable har gode metadata, har EDDTablenEDDGridFraEDDTable ofte behøver meget lidtaddAttributesmetadata - bare et par tweaks her og der.
    
*   dataVariables versusaxisVariables -- Den underliggende EDDTable har kundataVariables. An An An An AnEDDGridFraEDDTable datasæt vil have nogleaxisVariables s s (skabt af nogle af EDDTabledataVariables s s) og nogledataVariables s s (skabt af den resterende EDDTabledataVariables s s) .[GenererDatasetsXml](#generatedatasetsxml)vil gøre et gæt, som EDDTabledataVariables skal bliveEDDGridFraEDDTableaxisVariables, men det er bare et gætte. Du skal ændre output af GenererDatasetsXml for at angive, hvilkedataVariables vil bliveaxisVariables, og i hvilken rækkefølge.
     
* -- Der er intet om den underliggende EDDTable at fortælleEDDGridFraEDDTable de mulige værdier afaxisVariables i den gitterede version af datasættet, så du SKAL give disse oplysninger for hveraxisVariablevia en af disse attributter:
    
    * axisValues -- lader dig angive en liste over værdier. For eksempel,
        &lt;ont navnene[Skrivning af dobbeltList"](#attributetype)3, 3.5, 4&lt;/att&gt;
Bemærk brug af en[Datatype](#data-types)plus ordlisten. Også, typen af liste (f.eks. dobbelt) , SKAL matche dataene Type af variablen i EDDTable ogEDDGridFraEDDTable datasæt.
    * axisValuesStartStrideStop -- lader dig angive en sekvens af regelmæssigt mellemrumsværdier ved at angive start, skridt og stoppe værdier. Her er et eksempel, der svarer til aksenValues eksempel ovenfor:
        &lt;ont navn SergeyValuesStartStrideStop"[Skrivning af dobbeltList"](#attributetype)\\NDER, 0,5, 4&lt;/att&gt;
Bemærk venligst brug af en listedatatype. Også, typen af liste (f.eks. dobbelt) , SKAL matche dataene Type af variablen i EDDTable ogEDDGridFraEDDTable datasæt.
         
    
Opdateringer -- Lige som der er ingen måde forEDDGridFraEDDTable til at bestemme akser fra EDDTable oprindeligt, er der også ingen pålidelig måde forEDDGridFraEDDTable til at afgøre fra EDDTable, når akserne har ændret sig (Især når der er nye værdier for tidsvariablen) . I øjeblikket, den eneste løsning er at ændre aksenValues attribut idatasets.xmlog opload datasættet. Du kan f.eks. skrive et script til
    
    1. Søg Søg Søgdatasets.xmlfor for for
        datasetIDSupplerende oplysninger om *DatasetID* " " " "
så du arbejder med det korrekte datasæt.
    2. Søg Søg Søgdatasets.xmlfor den næste forekomst af
        <sourceName> *Hoteller i nærheden af teVariablesSourceName* </sourceName>  
så du arbejder med den korrekte variabel.
    3. Søg Søg Søgdatasets.xmlfor den næste forekomst af
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
så du kender startpositionen af mærket.
    4. Søg Søg Søgdatasets.xmlfor den næste forekomst af
```
        </att>  
```
Så du kender slutpositionen af akseværdierne.
    5. Udskift den gamle start, skridte, stop værdier med de nye værdier.
    6. Kontakt os[flag URL](/docs/server-admin/additional-information#set-dataset-flag)for datasættet til at fortælleERDDAP™at indlæse datasættet.
    
Dette er ikke ideelt, men det virker.
     
* præcision -- Hvornår Hvornår skal man HvornårEDDGridFraEDDTable reagerer på en brugers anmodning om data, det flytter en række data fra EDDTable svartabellen tilEDDGridrespons gitter. For at gøre dette, skal det finde ud af, om "akse" værdier på en given række i tabellen matcher nogle kombination af akseværdier i gitteret. For ikkeals datatyper er det nemt at afgøre, om to værdier er lig. Men for fly og fordobler, dette bringer det forfærdelige problem med flydende punktnumre[ikke matchende nøjagtigt](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (for eksempel 0,2 versus 0,199999999996) . Sådan skal du til (Prøv at forsøge at) deal med dette,EDDGridFraTable lader dig angive en præcisionsattribut til nogen af deaxisVariables, som angiver det samlede antal decimalcifre, der skal være identisk.
    * For eksempel,&lt;ont navnene&lt;/att&gt;
    * For forskellige typer af datavariabler, er der forskellige standard præcisionsværdier. Standarderne er normalt passende. Hvis de ikke er, skal du angive forskellige værdier.
    * For For For For ForaxisVariables, der er[tid eller tid Frimærkevariabler](#timestamp-variables), standarden er fuld præcision (en præcis match) .
    * For For For For ForaxisVariables, der flyder, standardpræcisionen er 5.
    * For For For For ForaxisVariables, der er dobbelt, standardpræcisionen er 9.
    * For For For For ForaxisVariables, der har uærlige datatyper,EDDGridFraEDDTable ignorerer præcisions attributten og bruger altid fuld præcision (en præcis match) .
         
    *    **ADVARSEL&#33;** Når du foretager konvertering af en del af tabulerede data i en flok gitterded data, hvisEDDGridFraEDDTable kan ikke matche en EDDTable "akse" værdi til en af de forventedeEDDGridFraEDDTable akseværdier,EDDGridFraEDDTabel tavs (Ingen fejl) smider data fra den række af tabellen. For eksempel kan der være andre data (ikke på nettet) i EDDTable datasæt. (Og hvis du bevæger dig &gt; 1, det er ikke indlysende forEDDGridFraTable, hvilke akseværdier der er ønskede værdier, og hvilke dem er den, der skal springes over på grund af skridtet.) Så hvis præcisionsværdierne er for høje, vil brugeren se manglende værdier i dataresponsen, når gyldige dataværdier rent faktisk eksisterer.
        
Omvendt, hvis præcisionsværdierne er sat for lave, EDDTable "akse" værdier, der ikke bør matcheEDDGridFraEDDTable akseværdier vil (fejlagtigt) match.
        
Disse potentielle problemer er forfærdelige, fordi brugeren får de forkerte data (eller manglende værdier) når de skal få de rigtige data (eller mindst en fejlmeddelelse) .
Dette er ikke en fejl iEDDGridFra Table.EDDGridFraTable kan ikke løse dette problem. Problemet er i forbindelse med konvertering af tabulære data i gitterded-data (med mindre andre antagelser kan gøres, men de kan ikke gøres her) .
Det er op til dig, denERDDAP™administrator, til **Test din testEDDGridFraEDDTable grundigt** for at sikre, at præcisionsværdierne er indstillet for at undgå disse potentielle problemer.
        
#### Forhold{#gapthreshold} 
*   [Forhold](#gapthreshold)-- Dette er en meget usædvanlig type datasæt. Da de typer forespørgsler, der kan gøres til (håndteret af) En antydningEDDGridDatasæt (relateret til sortimenterne og skridtene iaxisVariables s s) er meget forskellige fra de typer forespørgsler, der kan gøres til (håndteret af) Et EDDTable datasæt (lige relateret til intervaller af nogle variabler) , præstationen afEDDGridFraEDDTable datasæt varierer meget afhængigt af den nøjagtige anmodning, der er lavet og hastigheden af det underliggende EDDTable datasæt. For anmodninger, der har en trinvis værdi &gt; 1,EDDGridFraEDDTable kan spørge den underliggende EDDTable for en relativt stor mængde data (som om skridt =) og derefter sigte gennem resultaterne, holde dataene fra nogle rækker og smide dataene fra andre. Hvis det skal undersøges gennem en masse data for at få de data, den har brug for, vil anmodningen tage længere tid til at udfylde.
    
HvisEDDGridFraEDDTable kan fortælle, at der vil være store huller (med rækker af uønskede data) mellem rækker med ønskede data,EDDGridFraEDDTable kan vælge at foretage flere underrequests til den underliggende EDDTable i stedet for en stor anmodning, og dermed springe de uønskede rækker af data i de store huller. følsomheden for denne beslutning styres af mellemrumsværdien som angivet i&lt;hulThreshold&gt; tag (standard=1000 rækker af kildedata) . Indstilling af mellemrum til et mindre nummer vil føre til datasættet, der gør (generelt generelt generelt) mere subrequest. Indstilling af mellemrum til et større tal vil føre til datasættet, der gør (generelt generelt generelt) færre underspørgsmål.
    
Hvis mellemrum er indstillet for lille,EDDGridFraEDDTable vil fungere mere langsomt, fordi overtagelsen af flere anmodninger vil være større end den tid, der er gemt ved at få nogle overskydende data. Hvis mellemrum er indstillet for stort,EDDGridFraEDDTable vil fungere mere langsomt, fordi så meget overskydende data bliver hentet fra EDDTable, kun at blive kasseret. (Da Goldilocks opdagede, er midten "kun højre".) Hovedet for forskellige typer af EDDTable datasetser varierer meget, så den eneste måde at vide den faktiske bedste indstilling for dit datasæt er via eksperimentering. Men du vil ikke gå for langt forkert sticking til standarden.
    
Et simpelt eksempel er: Forestil dig etEDDGridFraTabel med bare énaxisVariable  (tid, med en størrelse på 100000) , endataVariable  (temperaturtemperatur) , og standardgabet af 1000.
    
    * Hvis en bruger ønsker temperatur\\[0&#58;100&#58;5000\\], skridtet er 100, så hulstørrelsen er 99, som er mindre end kløften. SåEDDGridFraTable vil gøre blot én anmodning til EDDTable for alle de nødvendige data til anmodning (svarende til temperatur\\[0:5000\\]) og smide alle de rækker af data, det ikke behøver.
    * Hvis en bruger ønsker temperatur\\[0:2500:5000\\], at skridtet er 2500, så hulstørrelsen er 2499, som er større end kløften. SåEDDGridFraTable vil foretage separate anmodninger til EDDTable, som svarer til temperatur\\[0\\], temperatur\\[2500 EUR\\], temperatur\\[5000 5000\\].
    
Beregning af hulstørrelsen er mere kompliceret, når der er flere akser.
    
For hver brugerforespørgsel,EDDGridFraEDDTable print diagnostiske meddelelser relateret til dette i[log.txt](/docs/server-admin/additional-information#log)fil.
    
    * Hvis [&lt;LogLevel&gt;] (#logniveau) i in in in indatasets.xmler indstillet til info, dette udskriver en meddelelse som
\\* nOuterAxes = af 4 nOuterRequests=22
Hvis nOuterAxes=0, blev hulThreshold ikke overskredet, og kun én anmodning vil blive lavet til EDDTable.
Hvis nOuterAxes&gt;0, bliver hulThreshold overskredet, og nOuterRequests vil blive lavet til EDDTable, svarende til hver ønsket kombination af de venstreste nOuterAxes. Hvis datasættet f.eks. har 4axisVariables og sdataVariables ligesom østward\\[tidstid\\]\\[breddegrad\\]\\[Længde\\]\\[dybdedybde\\], den yderste (først først) akse variabel er tid.
    * Hvis&lt;LogLevel&gt; i in in in indatasets.xmler indstillet til alle, yderligere oplysninger er skrevet til log.txt-filen.
         
#### EDDGridFraEDDTable skelet XML XML{#eddgridfromeddtable-skeleton-xml} 
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

### EDD*ERDDAP {#eddfromerddap} 
 **EDDGridFraErddap** håndterer netded data fra en fjernERDDAP™server.
 **EDDTableFraErddap** håndterer tabulære data fra en fjernERDDAP™server.

*   EDDGridFraErddap og EDDTableFraErddap opfører sig forskelligt fra alle andre typer datasæt iERDDAP.
    * Ligesom andre typer datasæt får disse datasæt oplysninger om datasættet fra kilden og holder den i hukommelsen.
    * Ligesom andre typer af datasæt, nårERDDAP™søgninger efter datasæt, viser Data Access Form ( *datasetID* .html) , eller viser Make A Graph form ( *datasetID* .ografi) ,ERDDAP™Brug oplysningerne om det datasæt, der er i hukommelsen.
    *   EDDGridFra Erddap og EDDTable FraErddap er grundlaget for[Gitter/polster/trapper](/docs/server-admin/scaling)afERDDAPs, som effektivt distribuere CPU-forbruget (Oftest til at lave kort) , hukommelsesforbrug, datasæt opbevaring og båndbredde brug af et stort datacenter.
#### Ombytning{#redirect} 
* I modsætning til andre typer datasæt, nårERDDAP™modtager en anmodning om data eller billeder fra disse datasæt,ERDDAP [omdirigeringer](https://en.wikipedia.org/wiki/URL_redirection)anmodningen til fjernbetjeningenERDDAP™server. Resultatet er:
    * Dette er meget effektivt (CPU, hukommelse og båndbredde) , fordi ellers
        1. SammensætningenERDDAP™skal sende anmodningen til den andenERDDAP™  (som tager tid) .
        2. Den andenERDDAP™skal få dataene, omformatere dem og overføre dataene til komposittenERDDAP.
        3. SammensætningenERDDAP™skal modtage oplysningerne (ved hjælp af båndbredde) , omformatere det (Brug af CPU og hukommelse) , og transmittere data til brugeren (ved hjælp af båndbredde) . Ved at omdirigere anmodningen og tillade den andenERDDAP™at sende svaret direkte til brugeren, komposittenERDDAP™Bruger stort set ingen CPU tid, hukommelse eller båndbredde på anmodning.
    * omdirigeringen er gennemsigtig til brugeren uanset klientsoftwaren (en browser eller enhver anden software eller kommandolinjeværktøj) .
*   [Du kan fortælleERDDAP™](#redirect)ikke at omdirigere brugeranmodninger ved at indstille&lt;omdirigering&gt;false&lt;/redirect&gt;, men denne negates mest af fordelene ved...FraErddap datasæt type (Betydeligt, dispersere belastningen på frontenERDDAP™til fjernbetjeningen/backendERDDAP) .
         
     
#### Abonnementer{#subscriptions} 
Normalt, når enEDDGridFra Erddap og EDDTable FraErddap er (gen igen) indlæst på dinERDDAP, de forsøger at tilføje et abonnement til fjerndatasættet via fjernbetjeningenERDDAP's e-mail/URL abonnement system. På den måde, når fjerndatasættet ændres,ERDDAP™Kontakt kontakterne[sætDataset Flag URL](/docs/server-admin/additional-information#set-dataset-flag)på din sideERDDAP™så det lokale datasæt er genindlæst ASAP, og så at det lokale datasæt altid er perfekt up-to-date og efterligner fjerndatasættet. Så den første gang dette sker, bør du få en e-mail, der anmoder om, at du validerer abonnementet. Men hvis den lokaleERDDAP™kan ikke sende en e-mail eller hvis fjernbetjeningenERDDAP's e-mail/URL abonnement system er ikke aktivt, skal du sende fjernbetjeningenERDDAP™Administrator og anmode om, at s/he manuelt tilføje [&lt;påChange&gt;] (#onchange) ......&lt;/onChange&gt; tags til alle de relevante datasæt for at kalde dine datasæt's[sætDataset Markér webadresser](/docs/server-admin/additional-information#set-dataset-flag). Se dine billederERDDAP™daglig rapport for en liste over sætDataset Markér webadresser, men bare sende dem tilEDDGridFraErddap og EDDTableFraErddap datasæt til fjernbetjeningenERDDAP™administrator.
    
Arbejder dette ikke? Er dine lokale datasæt ikke i synkronisering med fjerndatasæt?
Flere ting skal alle arbejde korrekt for dette system til at arbejde, så dine datasæt forbliver up-to-date. Tjek hver af disse ting for at:
    
    1. Din Dine DineERDDAP™skal kunne sende e-mails ud. Se e-mailindstillingerne i din opsætning.xml.
    2. Generelt (men ikke altid) , dinERDDAP's&lt;baseUrl&gt; og&lt;baseHttpsUrl&gt;must har ikke et portnummer (f.eks. :8080, :8443) . Hvis de gør, skal du bruge en[proxypass](/docs/server-admin/deploy-install#proxypass)at fjerne havnen fra Url.
    3. I din opsætning.xml,&lt;AbonnentToRemoteErddapDataset&gt; skal være indstillet til at tro.
    4. Når din lokale EDD... FraErddap datasæt er genindlæst, det skal sende en anmodning til fjernbetjeningenERDDAP™at abonnere på fjerndatasættet. Kig i log.txt for at se, om det sker.
    5. Du skal få en e-mail, der beder dig om at bekræfte abonnementsanmodningen.
    6. Du skal klikke på linket i den e-mail for at bekræfte abonnementsanmodningen.
    7. FjernbetjeningERDDAP™bør sige, at valideringen var vellykket. Du kan til enhver tid anmode om en e-mail fra fjernbetjeningenERDDAP™med en liste over dine afhængige og gyldige abonnementer. Se formularen på *I nærheden af fjernErddapBase Url* /erddap/subscriptions/list.html .
    8. Når fjerndatasættet ændres (f.eks. får yderligere data) , fjernbetjeningenERDDAP™bør forsøge at kontakte flagURL på dinERDDAP. Du kan ikke kontrollere dette, men du kan spørge administratoren af fjernbetjeningenERDDAP™at tjekke dette.
    9. Din Dine DineERDDAP™bør modtage en anmodning om at indstille den flagURL. Kig i din log.txt for "setDatasetFlag.txt?" anmodning (s s s) og se, om der er en fejlmeddelelse forbundet med anmodninger.
    10. Din Dine DineERDDAP™Prøv derefter at indlæse datasættet (måske ikke umiddelbart, men ASAP) .
         
#### Maksimum max (tidstid) ?{#up-to-date-maxtime} 
EDDGrid/TableFraErddap-datasæt ændrer kun deres lagrede oplysninger om hver kildedatasæt, når kildedatasættet er["reload"ed](#reloadeverynminutes)og et stykke metadata ændringer (f.eks. tidsvariablens tidactual\\_range) , og dermed generere en abonnementsmeddelelse. Hvis kildedatasættet har data, der ofte ændres (for eksempel nye data hvert sekund) og brug af["update"](#updateeverynmillis)system til at bemærke hyppige ændringer i de underliggende data,EDDGrid/TableFraErddap vil ikke blive underrettet om disse hyppige ændringer, indtil næste datasæt "reload", så denEDDGrid/TableFraErddap vil ikke være perfekt opdateret. Du kan minimere dette problem ved at ændre kildedataset's&lt;reloadEveryNMinutes&gt; til en mindre værdi (60? 15?) så der er flere abonnementsmeddelelser for at fortælle deEDDGrid/TableFraErddap for at opdatere sine oplysninger om kildedatasættet.

Eller hvis dit datastyringssystem kender, når kildedatasættet har nye data (f.eks. via et script, der kopierer en datafil på plads) , og hvis det ikke er super hyppig (f.eks. hver 5 minutter eller mindre hyppig) , der er en bedre løsning:

1. Brug ikke&lt;OpdaterEveryNMillis&gt; for at holde kildedatasættet opdateret.
2. Angiv kildedatasæt's&lt;reloadEveryNMinutes&gt; til et større antal (1440?) .
3. Har scriptet kontakt kildedataset's[flag URL](/docs/server-admin/additional-information#set-dataset-flag)højre efter det kopierer en ny datafil på plads.
     

Det vil føre til, at kildedatasættet er helt up-to-date og forårsage, at den genererer en abonnementsmeddelelse, der sendes til kilden.EDDGrid/TableFraErddap datasæt. Det vil føreEDDGrid/TableFraErddap datasæt til at være perfekt opdateret (Inden for 5 sekunder tilføjes nye data) . Og alt, hvad der sker effektivt (uden unødvendige datasæt reloads) .
     
#### Ingen IngenaddAttributes,axisVariableellerdataVariable {#no-addattributes-axisvariable-or-datavariable} 
I modsætning til andre typer af datasæt, EDDTableFraErddap ogEDDGridFraErddap datasets tillader ikke globale&lt;addAttributes&gt;,&lt;axisVariableeller&lt;dataVariable&gt; sektioner idatasets.xmlfor denne datasæt. Problemet er, at de ville føre til uoverensstemmelser:
    
1. Lad os sige, at det var tilladt, og du tilføjede en ny global egenskab.
2. Når en bruger spørger dinERDDAP™for de globale attributter, vil den nye egenskab vises.
3. Men når en bruger spørger dinERDDAP™for en datafil, dinERDDAP™omdirigerer anmodning til kildenERDDAP. Det, atERDDAP™er uvidende om den nye egenskab. Så hvis den opretter en datafil med metadata, f.eks. en.ncfil, metadata har ikke den nye egenskab.

Der er to arbejdsgange:

1. Konvince administratoren af kildenERDDAP™for at foretage de ændringer, du ønsker til metadata.
2. I stedet for EDDTableFraErddap, brug[EDDTableFraDapSequence](#eddtablefromdapsequence). Eller i stedet forEDDGridFraErddap, brug[EDDGridFraDap](#eddgridfromdap). Disse EDD-typer giver dig mulighed for at forbinde effektivt til et datasæt på en fjernERDDAP™  (men uden at omdirigere dataanmodninger) og de giver dig mulighed for at inkludere global&lt;addAttributes&gt;,&lt;axisVariableeller&lt;dataVariable&gt; sektioner idatasets.xml. En anden forskel: Du skal manuelt abonnere på fjerndatasættet, så datasættet på din enhedERDDAP™vil blive underrettet (via via[flag URL](/docs/server-admin/additional-information#set-dataset-flag)) når der er ændringer i fjerndatasættet. Således opretter du et nyt datasæt, i stedet for at forbinde til et fjerndatasæt.
         
#### Andre noter{#other-notes} 
* Af sikkerhedsmæssige årsager,EDDGridFra Erddap og EDDTable FraErddap understøtter ikke [&lt;tilgængeligtil&gt;] (#accessibleto) tag og kan ikke bruges med fjerndatasæt, der kræver logning i (fordi de bruger [&lt;tilgængeligtil&gt;] (#accessibleto) )... Se endnuERDDAP's[sikkerhedssystem](/docs/server-admin/additional-information#security)for at begrænse adgang til nogle datasæt til nogle brugere.
     
* Begyndende medERDDAP™v2.10,EDDGridFraErddap og EDDTableFraErddap understøtter [&lt;tilgængeligViaFiles&gt;] (#tilbehør) tag. I modsætning til andre typer af datasæt, standarden er sandt, men datasættets filer vil være tilgængeligeViaFiles kun, hvis kildedatasættet også har&lt;tilgængeligViaFiles&gt; sæt til sand.
     
* Du kan bruge[GenererDatasets Xml program](#generatedatasetsxml)at gøre detdatasets.xmlBeskåret for denne type datasæt. Men du kan gøre disse typer af datasæt nemt ved hånden.
     
#### EDDGridFraErddap skelet XML XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGridFraErddap skelet XML datasæt er meget enkel, fordi hensigten er bare at efterligne den eksterne datasæt, som allerede er egnet til brug iERDDAP:
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

#### EDDTableFraErddap skelet XML XML{#eddtablefromerddap-skeleton-xml} 
* skeletet XML for en EDDTableFraErddap dataset er meget enkel, fordi hensigten er kun at efterligne fjerndatasættet, som allerede er egnet til brug iERDDAP:
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
[ **EDDGridFraEtopo** ](#eddgridfrometopo)bare tjener den[ETOPO1 Global 1-Minute Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Overflade, gitter registreret, binær, 2byte int: etopo1\\_ice\\_g\\_i2.zip) som distribueres medERDDAP.

* Kun todatasetIDs støttes tilEDDGridFraEtopo, så du kan få adgang til data med længdeværdier -180 til 180 eller længdeværdier 0 til 360.
* Der er aldrig nogen under tags, da dataene allerede er beskrevet inden forERDDAP.
* Så de to muligheder forEDDGridFraEtopo datasæt er (bogstaveligt talt bogstaveligt talt) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridFraFiles{#eddgridfromfiles} 
[ **EDDGridFraFiles** ](#eddgridfromfiles)er superklassen af alleEDDGridFra...Filer klasser. Du kan ikke brugeEDDGridFraFiles direkte. Brug i stedet en underklasse afEDDGridFraFiles til at håndtere den specifikke filtype:

*   [EDDGridFraMergeIRFiles](#eddgridfrommergeirfiles)håndterer data fra gitterded[Sammenfletning.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)filer.
*   [EDDGridFraAudioFiles](#eddfromaudiofiles)aggregerer data fra en gruppe af lokale lydfiler.
*   [EDDGridFraNcFiles](#eddgridfromncfiles)håndterer data fra gitterded[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)filer,[HDF  (v4 eller v5)  .hdf](https://www.hdfgroup.org/)filer,[.ncml](#ncml-files)filer, og[NetCDF  (v3 eller v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)filer. Dette kan arbejde med andre filtyper (for eksempel BUFR) , vi har ikke testet det -- send os nogle prøvefiler, hvis du er interesseret.
*   [EDDGridFraNcFilesUnpakke](#eddgridfromncfilesunpacked)er en variant afEDDGridFraNcFiles, der håndterer data fra gitterdedNetCDF  (v3 eller v4)  .ncog relaterede filer, somERDDAP™Pakker på et lavt niveau.

I øjeblikket understøttes der ingen andre filtyper. Men det er normalt relativt nemt at tilføje støtte til andre filtyper. Kontakt os, hvis du har en anmodning. Eller hvis dine data er i et gammelt filformat, som du gerne vil flytte væk fra, anbefaler vi at konvertere filerne til at væreNetCDFv3.ncfiler.NetCDFer et bredt understøttet, binært format, giver hurtig tilfældig adgang til dataene, og er allerede understøttet afERDDAP.

#### Fra filer Detaljer{#from-files-details} 
Følgende oplysninger gælder for alle underklasserneEDDGridFraFiles.

##### Aggregation af en eksisterende Dimension{#aggregation-of-an-existing-dimension} 
Alle variationer afEDDGridFraFiles kan aggregere data fra lokale filer, hvor hver fil har 1 (eller mere) forskellige værdier for den yderste (først først) dimension, normalt\\[tidstid\\], som vil blive aggregeret. For eksempel kan dimensionerne være\\[tidstid\\]\\[højdehøjde\\]\\[breddegrad\\]\\[Længde\\], og filerne kan have dataene til én (eller et par) tidsværdi (s s s) pr. fil. Det resulterende datasæt vises som om alle filers data var kombineret. De store fordele ved aggregation er:

* Størrelsen af de aggregerede datasæt kan være meget større end en enkelt fil kan være bekvemt (~2 GB) .
* Det er nemt at tilføje en ny fil med den nyeste mængde data. Du behøver ikke at skrive hele datasættet.

Kravene til sammenlægning er:
* De lokale filer har ikke den sammedataVariables s s (som defineret i datasættetsdatasets.xml) . Datasættet vil have datasættetdataVariables defineret idatasets.xml. Hvis en given fil ikke har en givendataVariable,ERDDAP™vil tilføje manglende værdier efter behov.
* Alle afdataVariables SKAL bruge den sammeaxisVariables/dimensioner (som defineret i datasættetsdatasets.xml) . Filerne vil blive aggregeret baseret på den første (venstre-næsten) dimension, sorteret i stigende rækkefølge.
* Hver fil kan have data til en eller flere værdier af den første dimension, men der kan ikke være overlap mellem filer. Hvis en fil har mere end én værdi for den første dimension, skal værdierne sorteres i stigende rækkefølge, uden nogen bånd.
* Alle filer skal have præcis de samme værdier for alle de andre dimensioner. Nøjagtigheden af testen bestemmes af[MatchAxisNDigits](#matchaxisndigits).
* Alle filer skal have præcis det samme[enheder](#units)metadata for alleaxisVariables og sdataVariables. Hvis dette er et problem, kan du muligvis bruge[NcML](#ncml-files)eller eller eller[NCO](#netcdf-operators-nco)at løse problemet.
         
##### Aggregation via filnavne eller Global Metadata{#aggregation-via-file-names-or-global-metadata} 
Alle variationer afEDDGridFraFiles kan også aggregere en gruppe filer ved at tilføje en ny venstrest (først først) dimension, normalt tid, baseret på en værdi afledt fra hvert filnavn eller fra værdien af en global egenskab, der er i hver fil. For eksempel kan filnavnet indeholde tidsværdien for dataene i filen.ERDDAP™ville derefter oprette en ny tidsdimension.

I modsætning til den lignende funktion i THREDDS,ERDDAP™altid skaber enaxisVariablemed numeriske værdier (som påkrævet af CF) , aldrig strenge værdier (som ikke er tilladt af CF) . Også,ERDDAP™vil sortere filerne i aggregation baseret på de numeriske numeriskeaxisVariableværdi, der tildeles hver fil, så aksens variable altid har sorteret værdier efter behov. TheEDDS tilgang til at gøre en lexicografisk sortering baseret på filnavnene fører til aggregationer, hvor akseværdierne ikke sorteres (som ikke er tilladt af CF) når filnavnene sorteres forskelligt end det afledteaxisVariableværdier.

At opsætte en af disse aggregationer iERDDAP™, vil du definere en ny venstreest (først først)  [axisVariable](#axisvariable)med en speciel, pseudo&lt;sourceName&gt;, som fortællerERDDAP™hvor og hvordan man finder værdien for den nye dimension fra hver fil.

* pseudosourceNamesom får værdien fra et filnavn (bare filnavn.ext) er det er
    \\*\\*\\ *filnavn,* [Datadata Type Type Type Type](#data-types) *,* ekstraktRegex *,* Anmeldelser af captureGroup
* pseudosourceNamesom får værdien fra en fils absolutte vejnavn er
    \\*\\*\\ *Vejnavn,* [Datadata Type Type Type Type](#data-types) *,* ekstraktRegex *,* Anmeldelser af captureGroup
    \\[For dette bruger stinavnet altid'/'som den mappe separator figur, aldrig "".\\]
* pseudosourceNamesom får værdien fra en global egenskab er
    \\*\\*\\ *global:* attribut Navn *,* [Datadata Type Type Type Type](#data-types) *,* ekstraktRegex *,* Anmeldelser af captureGroup
* pseudosourceNamemulighed virker forskelligt fra de andre: i stedet for at skabe en ny venstreest (først først)  axisVariable, dette erstatter værdien af den nuværendeaxisVariablemed en værdi udvundet fra filnavnet (bare filnavn.ext) . Formatet er
    \\*\\*\\ *erstatter erstatning FraFileName,* [Datadata Type Type Type Type](#data-types) *,* ekstraktRegex *,* Anmeldelser af captureGroup
     

De beskrivelser af de dele, du har brug for, er:

*    *attribut Navn* - navnet på den globale egenskab, der er i hver fil, og som indeholder dimensionværdien.
*    *Datadata Type Type Type Type* -- Dette angiver den datatype, der vil blive brugt til at gemme værdierne. Se standardlisten på[Datadata Typer](#data-types)den, derERDDAP™understøtter, medmindre String ikke er tilladt her siden aksevariabler iERDDAP™kan ikke være strenge variabler.
    
Der er en ekstra pseudo dataType, tidFormat= *streng streng TimeFormat* , som fortællerERDDAP™at værdien er en streng tidStamp[enheder, der er egnet til strenge tider](#string-time-units). I de fleste tilfælde vil strengTimeFormat du skal være en variation af en af disse formater:
    
    *   yyyy-MM-dd'T'HH:mm:ss.SSSZ -- som ISO 8601:2004 (E) dato tidsformat. Du kan bruge en afkortet version af dette, f.eks.yyyy-MM-dd'T'HH:mm:s elleryyyy-MM-dd.
    * yyyMMddHHmmss.SSS - som er den kompakte version af ISO 8601 dato format. Du kan bruge en afkortet version af dette, f.eks. yyyMMddHHmms eller yyyyyMMdd.
    * M/d/yyyyyy H:mm:ss.SSS -- som er U.S. slash dato format. Du kan bruge en afkortet version af dette, f.eks. M/d/yyyyyyyyyyy.
    * yyyyyDDDHHmmsSSS -- som er året plus nul-padded dag i året (f.eks. 001 = Jan 1, 365 = Dec 31 i et ikke-leapår; dette kaldes undertiden Julian dato) . Du kan bruge en afkortet version af dette, f.eks. yyyyyDDD .
    
Hvis du bruger denne pseudodataType, skal du tilføje dette til den nye variables&lt;addAttributes&gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Hvis du vil flytte alle tidsværdierne, skal du skifte tidsværdien i enheder, f.eks.
1970-01T12:00:00Z.
*    *ekstraktRegex* -- Dette er det[almindeligt udtryk](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) som indeholder en capture gruppe (i parentes) som beskriver, hvordan man udvinde værdien fra filnavnet eller global attributværdi. For eksempel, givet et filnavn som S19980011998031.L3b\\_MO\\_CHL.nc, fange gruppe #1, "\\dtutorial", i det regulære udtryk S (\\dtutorial) \\dtutorial«.L3b.\\* vil fange de første 7 cifre efter 'S': 1998001.
*    *captureGroup nu* -- Dette er antallet af optagelsesgruppen (inden for et par forældreheses) i det regulære udtryk, der indeholder information om interesse. Det er normalt 1, den første capture gruppe. Nogle gange skal du bruge capture grupper til andre formål i regex, så det vigtige capture gruppenummer vil være 2 (den anden optagelse gruppe) eller 3 (den tredje) , osv.

Et komplet eksempel på etaxisVariablesom gør et samlet datasæt med en ny tidsakse, der får tidens værdier fra filnavnet på hver fil, er
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Når du bruger "timeFormatONIC pseudodata Type,ERDDAP™vil tilføje 2 attributter til deaxisVariableså de kommer fra kilden:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Så i dette tilfælde,ERDDAP™vil skabe en ny akse ved navn"time"med dobbeltværdier (sekunder siden 1970-01T00:00:00Z) ved at udtrække de 7 cifre efter 'S' og før ".L3m" i filnavnet og fortolke dem som tidsværdier formateret som yyyyyyyyDDD.

Du kan tilsidesætte standardbasistiden (1970-01T00:00:00Z) ved at tilføje en[addAttribute](#addattributes)som angiver en anden enhed egenskab med en anden basetid. En fælles situation er: der er grupper af datafiler, hver med en 1 dag sammensat af et satellitdatasæt, hvor du ønsker, at tidsværdien skal være middag af den dag, der er nævnt i filnavnet (den centrerede tid på hver dag) og ønsker variablenslong\\_nameat være "Centered Time". Et eksempel, som gør det:
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
Bemærk timer=12 i basistiden, som tilføjer 12 timer i forhold til den oprindelige basetid på 1970-01T00:00:00Z.

Et komplet eksempel på etaxisVariablesom gør et samlet datasæt med en ny "run" akse (med inte værdier) som får runværdierne fra "runID" global attribut i hver fil (med værdier som "r17\\_global", hvor 17 er løbenummeret) er det er
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
Bemærk brug af optagelsesgruppens nummer 2 til at indfange de cifre, der opstår efter 'r' eller 's', og før "\\_global". Dette eksempel viser også, hvordan du tilføjer yderligere attributter (fx,ioos\\_categoryog enheder) til akse variabel.
     
#### Eksternt komprimerede filer{#externally-compressed-files} 
* Datasets, der er subsets afEDDGridFraFiles og EDDTable FraFiles kan tjene data direkte fra eksterne komprimerede datafiler, herunder.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, og .Z filer.
     
*    **Dette virker overraskende godt&#33;**   
I de fleste tilfælde er den nedsænkning relateret til at dekomprimere små og mellemstore datafiler mindre. Hvis du har brug for at spare diskplads, anbefaler vi stærkt at bruge denne funktion, især for ældre filer, der sjældent er tilgængelige.
     
*    **Gem penge&#33;**   
Dette er et af de få funktioner iERDDAP™der tilbyder dig en chance for at spare en masse penge (Selv om omkostningerne ved lidt nedsat ydelse) . Hvis kompressionsforholdet f.eks., 6:1 (nogle gange vil det være meget højere) , så dataenes datafiler kun skal bruge 1/6 diskplads. Så måske kan du få med 1 RAID (af en given størrelse) i stedet for 6 RAIDS (af samme størrelse) . Det er en enorm omkostningsbesparelse. Forhåbentlig evnen til at komprimere nogle filer i en samling (de ældre?) og ikke komprimere andre (de nyere?) , og for at ændre det til enhver tid, lad dig minimere ulempen for at komprimere nogle af filer (langsommere adgang) . Og hvis valget er mellem at gemme filerne på tape (og kun tilgængelig efter anmodning efter forsinkelse) vs opbevaring af dem komprimeret på en RAID (og tilgængelig viaERDDAP) , så er der en enorm fordel at bruge kompression, så brugerne får interaktive og (relativt relativt) hurtig adgang til dataene. Og hvis dette kan spare dig fra at købe en ekstra RAID, kan denne funktion spare dig omkring $30.000.
     
* Til alleEDDGridFraFiles subclasses, hvis datafiler har en udvidelse, der angiver, at de er eksternt komprimerede filer (i øjeblikket:.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2 eller .Z) ,ERDDAP™vil dekomprimere filerne til datasættets cachemappe, når den læser dem (hvis de ikke allerede er i cachen) . Det samme er sandt for binære filer (fx,.nc) subclasses af EDDTableFraFiles.
     
* Til EDDTableFraFiles subclasses for ikke- binære filer (f.eks. .csv) , datafiler med en udvidelse, der angiver, at de er eksterne komprimerede filer vil blive dekomprimeret på-fly, da filen læses.
     
* REQUIREMENT: Hvis typen af ekstern komprimeret fil anvendes (fx,.tgzeller eller eller.zip) understøtter mere end 1 fil i komprimeret fil, komprimeret fil skal indeholde kun 1 fil.
     
* REQUIREMENT: Denne funktion antager, at indholdet af de eksterne komprimerede filer ikke ændres, så en cached decompresset fil kan genbruges. Hvis nogle eller alle datasæts datafiler undertiden ændres, skal du ikke komprimere disse filer. Dette er i overensstemmelse med almindelig brug, da folk ikke normalt komprimerer filer, som de nogle gange har brug for at ændre.
     
*   &lt;FilenNameRegex&gt; For at gøre dette arbejde, datasættets&lt;fileNameRegex&gt; skal matche de komprimerede filers navne. Selvfølgelig, regexes ligesom .\\*vil matche alle filnavne. Hvis du angiver en bestemt filtype, f.eks. .\\*“”.nc, så skal du ændre regex for at inkludere kompressionsudvidelsen også, f.eks. .\\ *“”.nc“”.gz(hvis alle filer vil være* noget*.nc.gzfiler) .
     
* Det er fint, hvis dit datasæt indeholder en blanding af komprimerede og ikke komprimerede filer. Dette kan være nyttigt, hvis du mener, at nogle filer (f.eks. ældre filer) vil blive brugt mindre ofte, og derfor ville det være nyttigt at spare diskplads ved at komprimere dem. At gøre dette arbejde,&lt;fileNameRegex&gt; skal matche komprimeret og ikke komprimerede filers navne, f.eks.\\*eller .\\*“”.nc (|“”.gz) (hvor fangstgruppen i slutningen af det angiver, at.gzer valgfri.
     
* Det er fint, hvis du komprimerer eller undertrykker specifikke filer i samlingen til enhver tid.
Hvis datasættet ikke bruger [&lt;OpdaterEveryNMillis&gt;] (#updateeverynmillis) , sæt datasættets[flag flag flag flag](/docs/server-admin/additional-information#flag)at fortælleERDDAP™at indlæse datasættet og dermed bemærke ændringerne. Interessant, kan du bruge forskellige komprimeringsalgoritmer og indstillinger for forskellige filer i samme datasæt (fx,.bz2for sjældent brugte filer,.gzfor ikke ofte anvendte filer, og ingen kompression til ofte anvendte filer) , bare være sikker på, at regex understøtter alle de filtyper, der er i brug, f.eks..nc (|“”.gz|“”.bz2) .
     
* Selvfølgelig, kompressionsforhold og hastigheder for de forskellige kompressionsalgoritmer varierer med kildefilen og indstillingerne (f.eks. kompressionsniveau) . Hvis du vil optimere dette system til dine filer, skal du prøve de forskellige kompressionsmetoder med dine filer og med en række kompressionsindstillinger. Hvis du ønsker en pålidelig god (ikke nødvendigvis den bedste) opsætning, vi vil lidt anbefalegzip  (.gz) .gzipgør ikke den mindste komprimeret fil (det er rimeligt tæt) , men det komprimerer filen meget hurtigt og (vigtigere forERDDAP™brugere) undertrykker filen meget hurtigt. Plus,gzipsoftware kommer standard med hver Linux og Mac OS installation og er let tilgængelig for Windows via gratis værktøjer som 7Zip og Linux add-ons som Git Bash. For eksempel til at komprimere en kildefil ind i.gzversion af filen (samme filnavn, men med.gztilføjet) , brug (i Linux, Mac OS og Git Bash)   
    gzip  *sourceName*   
At decompresse en.gzfil tilbage til den oprindelige, brug
pistol *sourceName.gz*   
Hvis du vil komprimere hver af kildefilerne i mappe og dens undermapper, skal du bruge
    gzip-r *instruktørnavn*   
At dekomprimere hver af de.gzfiler i mappe og dens undermapper , reursivt, brug
Værktøjspakke -r *instruktørnavn*   
     
* ADVARSEL: Ikke eksternt komprimeret (gzip) filer, der allerede er internt komprimeret&#33;
Mange filer har allerede komprimeret data internt. Hvis dugzipdisse filer, de resulterende filer vil ikke være meget mindre (&lt;5%) ogERDDAP™vil spilde tid undertrykke dem, når det skal læse dem. For eksempel:
    
    * Datafiler: f.eks..nc4, og.hdf5 filer: Nogle filer bruger intern kompression; nogle bruger ikke. Hvordan man fortæller: komprimerede variabler har "\\_ChunkSize" attributter. Også, hvis en gruppe af gitterded.nceller eller eller.hdffiler er alle forskellige størrelser, de er sandsynligvis internt komprimeret. Hvis de er alle samme størrelse, er de ikke internt komprimeret.
    * billedfiler: f.eks. .gif, .jpg og .png
    * lydfiler: f.eks., .mp3 og .ogg.
    * videofiler: f.eks. .mp4, .ogv og .webm.
    
        
Et uheldigt tilfælde: .wav lydfiler er store og ikke internt komprimeret. Det ville være rart at komprimere (gzip) dem, men generelt bør du ikke, fordi hvis du gør, kan brugerne ikke afspille de komprimerede filer i deres browser.
     
* Test Case: komprimering (med medgzip) et datasæt med 1523 gitterded.ncfiler.
    
    * Dataene i kildefiler var sparse (masser af manglende værdier) .
    * Total diskplads gik fra 57 GB før kompression til 7 GB efter.
    * En anmodning om masser af data fra 1 gang punkt er&lt;1 s før og efter kompression.
    * En anmodning om 1 datapoint til 365-tidpoint (den værste situation) gik fra 4 s til 71 s.
         
    
Til mig, der er en rimelig handelsoff for enhver datasæt, og helt sikkert for datasæt, der er ubestridt brugt.
     
* Indvendigt mod ekstern kompression --
Sammenlignet med den interne filkomprimering, der tilbydes af.nc4 og 4.hdf5 filer,ERDDAP's tilgang til eksternt komprimeret binære filer har fordele og ulemper. ulempen er: for en gang læse af en lille del af en fil, intern kompression er bedre, fordiEDDGridFraFiles behøver kun at dekomprimere et par chunk (s s s) af filen, ikke hele filen. Men men men men menERDDAP's tilgang har nogle fordele:
    
    *   ERDDAP™understøtter kompression af alle typer datafiler (binær og ikke-aktiv, f.eks..nc3 og .csv) Ikke bare.nc4 og 4.hdf4.
    * Hvis mængden af en fil skal læses mere end én gang i en kort periode, sparer det tid til at undertrykke filen én gang og læse den mange gange. Dette sker iERDDAP™Når en bruger bruger Make-A-Graph til datasættet og gør en række små ændringer i grafen.
    * Evnen til at have komprimerede filer og ikke komprimerede filer i samme samling, giver dig mere kontrol over, hvilke filer der er komprimeret, og som ikke er. Og denne ekstra kontrol kommer uden virkelig at ændre kildefilen (siden du kan komprimere en fil med f.eks..gzog derefter undertrykke det for at få den oprindelige fil) .
    * Evnen til at ændre på ethvert tidspunkt, om en given fil er komprimeret, og hvordan den komprimeres (forskellige algoritmer og indstillinger) giver dig mere kontrol over systemets ydeevne. Og du kan nemt gendanne den oprindelige ukomprimeret fil til enhver tid.
    
Selvom hverken tilgang er en vinder i alle situationer, er det klart, atERDDAP's evne til at tjene data fra eksterne komprimerede filer gør ekstern kompression et rimeligt alternativ til den interne kompression, der tilbydes af.nc4 og 4.hdf5. Det er vigtigt, at intern kompression er en af de vigtigste grunde, folk vælger at bruge.nc4 og 4.hdf5.
     
##### Dekomprimeret cache{#decompressed-cache} 
ERDDAP™gør en dekomprimeret version af enhver komprimeret binær (fx,.nc) datafil, når det skal læse filen. Dekomprimerede filer gemmes i datasættets mappe inden *bigParentDirectory* /trykt / . Dekomprimerede filer, der ikke er blevet brugt for nylig, vil blive slettet for at frigøre plads, når den kumulative filstørrelse er &gt;10GB. Du kan ændre det ved at indstille&lt;DekomprimeretCacheMaxGB&gt; (Standard=10) i datasæt Xml.xml, f.eks.,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Også dekomprimerede filer, der ikke er blevet brugt i de sidste 15 minutter, vil blive slettet i starten af hver større datasæt reload. Du kan ændre det ved at indstille&lt;Hoteller i nærheden af dekompressedCacheMaxMinutesOld&gt; (Standard=15) i datasæt Xml.xml, f.eks.,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Større tal er rart, men den kumulative størrelse af dekomprimerede filer kan forårsage *bigParentDirectory* at køre ud af diskplads, som forårsager alvorlige problemer.
     
* Fordi dekomprimering af en fil kan tage en betydelig mængde tid (0,1 til 10 sekunder) , datasæt med komprimerede filer kan drage fordel af at indstille datasættets [&lt;nThreads&gt;] (#læssere) indstilling til et højere antal (2? 3? 4??) . Ulempen til endnu højere tal (f.eks. 5? 6? 7?) nedsætter afkast, og at en brugers anmodning kan derefter bruge en høj procentdel af systemets ressourcer, og dermed mindske behandlingen af andre brugers anmodninger. Der er således ingen ideelle nThreads indstilling, bare forskellige konsekvenser i forskellige situationer med forskellige indstillinger.
         
#### Sorteret Dimension Værdier{#sorted-dimension-values} 
Værdierne for hver dimension skal være i sorteret rækkefølge (stigende eller faldende, bortset fra den første (venstre-næsten) dimension, der skal opstiges) . Værdierne kan være uregelmæssigt mellemrum. Der kan ikke være nogen bånd. Dette er et krav om kravet[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Hvis nogen dimensions værdier ikke er i sorteret rækkefølge, vil datasættet ikke blive indlæst ogERDDAP™vil identificere den første usorteret værdi i logfilen, *bigParentDirectory* /logs/log.txt .
    
Uspecificerede dimensionværdier angiver næsten altid et problem med kildedatasættet. Dette forekommer oftest, når en forkert eller upassende fil er inkluderet i aggregationen, som fører til en usorteret tidsdimension. Hvis du vil løse dette problem, skal du se fejlmeddelelsen i meddelelsenERDDAP™log.txt-filen for at finde den fornærmende tidsværdi. Så se i kildefiler for at finde den tilsvarende fil (eller en før eller en efter) det tilhører ikke i sammenlægningen.
    
#### Direktører{#directories} 
Filerne kan være i én mappe eller i en mappe og dens undermapper (Reklamation) . Hvis der er et stort antal filer (for eksempel &gt;1.000) , operativsystemet (og dermedEDDGridFraFiles) vil fungere meget mere effektivt, hvis du gemmer filerne i en række undermapper (om året, eller en måned for datasæt med meget hyppige filer) , så der aldrig er et stort antal filer i en given mappe.
     
#### &lt;cacheFraUrl&gt;{#cachefromurl} 
AlleEDDGridFraFiles og alle EDDTableFraFiles datasets understøtter et sæt tags, der fortællerERDDAP™at downloade og vedligeholde en kopi af alle en fjerndatasæts filer eller en cache af et par filer (Hentet efter behov) . Dette kan være utrolig nyttigt. Se billederne[cache cache cache cache FraUrl dokumentation](#cachefromurl).
    
#### Fjernbetjente og HTTP Range anmodninger{#remote-directories-and-http-range-requests} 
 (AKA Byte Servicerer, Byte Range anmodninger, Accepter-RangeshttpSidehoved)   
EDDGridFraNcFiles, EDDTableFraMultidimNcFiles, EDDTableFraNcFiles og EDDTableFraNcCFFiles, kan *nogle gange nogle gange* tjene data fra.ncfiler på fjernservere og tilgås via HTTP, hvis serveren understøtter[Byte Service](https://en.wikipedia.org/wiki/Byte_serving)via HTTP-område anmodninger (HTTP-mekanismen til at betjene) . Dette er muligt, fordi netcdf-java (somERDDAP™Brug til at læse.ncfiler filer filer) Understøtter læsning af data fra fjern.ncfiler via HTTP-område anmodninger.

 **Gør ikke dette&#33;** Det er horribly ineffektiv og langsom.
Brug i stedet [&lt;cacheFraUrl&gt; system] (#cachefraurl) .

Adgang til adgangERDDAP™Datasæt som filer via byte range anmodninger --
Vend dette rundt, givet at du kan (i teori) Tænk på et datasæt iERDDAP™som en kæmpe.ncfil ved at ignorere ".nc" til basen OPenDAPURL for en given datasæt (fx, https://myserver.org/erddap/griddap/datasetID.nc og også ved at tilføje en ?query efter at angive et subset) , det er måske rimeligt at spørge om du kan bruge netcdf-java,Ferreteller nogle andreNetCDFklientsoftware til at læse data via HTTP Range anmodninger fraERDDAP. Svaret er nej, fordi der ikke er virkelig en enorm ".nc" fil. Hvis du vil gøre dette, i stedet gøre en af disse muligheder:

* Brug(OPeN)DAPklient software til at oprette forbindelse til de gitterbaserede tjenester, der tilbydes afERDDAP. Det er hvad der erDAP  (og dermedERDDAP) Designet til. Det er meget effektivt.
* Eller download kildefilen (s s s) fra fra"files"systemsystem (eller en subset fil via en.nc? forespørgsel) til din computer og brug netcdf-java,Ferreteller nogle andreNetCDFklientsoftware til at læse (nu nu nu) lokal fil (s s s) .
         
#### Oplysninger om cachen{#cached-file-information} 
Hvornår et tidspunktEDDGridFraFiles datasæt er først indlæst,EDDGridFraFiles læser oplysninger fra alle de relevante filer og skaber tabeller (en række for hver fil) med oplysninger om hver gyldig fil og hver "bad" (forskellige eller ugyldige) fil.
* Tabellerne gemmes også på disken, somNetCDFv3.ncfiler i filer i *bigParentDirectory* / Datasæt / *I nærheden af Last2CharsOfDatasetID* / / / / *datasetID* / i filer navngivet:
dirTable.nc  (som indeholder en liste over unikke mappenavne) ,
filfil Tabelbord.nc  (som holder bordet med hver gyldig fils oplysninger) ,
dårlige filer.nc  (som holder bordet med hver dårlig fils oplysninger) .
* For at fremskynde adgangen til enEDDGridFraFiles datasæt (men på bekostning af at bruge mere hukommelse) , du kan bruge
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
at fortælleERDDAP™for at gemme en kopi af fil information tabeller i hukommelsen.
* Kopier af filoplysningerne på disken er også nyttig, nårERDDAP™lukkes og genstartes: det sparerEDDGridFraFiles fra at skulle genlæse alle datafiler.
* Når et datasæt er indlæst,ERDDAP™behøver kun at læse data i nye filer og filer, der har ændret sig.
* Hvis en fil har en anden struktur fra de andre filer (f.eks. en anden datatype for en af variablerne eller en anden værdi for "[enheder](#units)" attribut) ,ERDDAPtilføjer filen til listen over "bad" filer. Oplysninger om problemet med filen vil blive skrevet til den *bigParentDirectory* /logs/log.txt-fil.
* Du bør ikke nogensinde nødt til at slette eller arbejde med disse filer. En undtagelse er: Hvis du stadig foretager ændringer i et datasætsdatasets.xmlopsætning, kan du slette disse filer for at tvingeERDDAP™at læse alle filerne, da filerne vil blive læst/fortolket anderledes. Hvis du nogensinde behøver at slette disse filer, kan du gøre det, nårERDDAP™kører. (Så sæt et sæt[flag flag flag flag](/docs/server-admin/additional-information#set-dataset-flag)at indlæse datasættet ASAP.) Men, men,ERDDAP™normalt bemærker, at dedatasets.xmloplysninger matcher ikke filen Tabeloplysninger og sletter filbordene automatisk.
* Hvis du ønsker at opfordreERDDAP™for at opdatere de lagrede datasæt-oplysninger (Hvis du f.eks. har tilføjet, fjernet eller ændret nogle filer til datasættets datakatalog) , brug af[flagsystem](/docs/server-admin/additional-information#flag)at tvingeERDDAP™for at opdatere cached-filoplysninger.
         
#### Håndtering af anmodninger{#handling-requests} 
Når en klients anmodning om data behandles,EDDGridFraFiles kan hurtigt se i tabellen med de gyldige filoplysninger for at se, hvilke filer der har de ønskede data.
     
#### Opdatering af cachen filoplysninger{#updating-the-cached-file-information} 
Når datasættet er indlæst, opdateres cachen filoplysninger.
    
* Datasættet genindlæses periodisk som fastlagt af datasættet&lt;reloadEveryNMinutes&gt; i datasættets oplysninger idatasets.xml.
* Datasættet er genindlæst så hurtigt som muligt, nårERDDAP™registrerer, at du har tilføjet, fjernet,[touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (at ændre filens sidste Modificeret tid) , eller ændret en datafil.
* Datasættet er genindlæst så hurtigt som muligt, hvis du bruger datasættet[flagsystem](/docs/server-admin/additional-information#flag).

Når datasættet er indlæst,ERDDAP™sammenligner de i øjeblikket tilgængelige filer til de cachelagrede filoplysninger tabeller. Nye filer læses og føjes til den gyldige filtabel. Filer, der ikke længere eksisterer, er faldet fra den gyldige filtabel. Filer, hvor filtampen har ændret sig, og deres oplysninger opdateres. De nye tabeller erstatter de gamle tabeller i hukommelsen og på disk.
     
#### Dårlige filer{#bad-files} 
Tabellen af dårlige filer og årsagerne til, at filerne blev erklæret dårlige (ødelagt fil, manglende variabler osv.) e-mailes til e-mail Alt alt Til e-mailadresse (sandsynligvis du) Hver gang datasættet er genindlæst. Du bør udskifte eller reparere disse filer så hurtigt som muligt.
     
#### Manglende variabler{#missing-variables} 
Hvis nogle af filerne ikke har nogle af filernedataVariables defineret i datasættetsdatasets.xmlDet er okay. Hvornår Hvornår skal man HvornårEDDGridFraFiles læser en af disse filer, vil det fungere som om filen havde variablen, men med alle manglende værdier.
     
#### FTP Trouble / rådgivning{#ftp-troubleadvice} 
Hvis du FTP nye datafiler til filerneERDDAP™server mensERDDAP™kører, der er chancen for, atERDDAP™vil indlæse datasættet under FTP-processen. Det sker oftere end du måske tror&#33; Hvis det sker, vises filen for at være gyldig (det har et gyldigt navn) , men filen er ikke endnu gyldig. HvisERDDAP™forsøger at læse data fra den ugyldige fil, vil den resulterende fejl forårsage, at filen skal føjes til tabellen af ugyldige filer. Dette er ikke godt. For at undgå dette problem skal du bruge et midlertidigt filnavn, når FTP'ing af filen f.eks. ABC2005.nc\\_TEMP . Så, filenNameRegex test (se nedenfor) vil angive, at dette ikke er en relevant fil. Når FTP-processen er færdig, skal du omdøbe filen til det korrekte navn. Afrenningsprocessen vil medføre, at filen bliver relevant i et øjeblik.
     
#### "0 filer" Fejlmeddelelse{#0-files-error-message-1} 
Hvis du kører[GenererDatasetsXml](#generatedatasetsxml)eller eller eller[Billeder af DasDds](#dasdds), eller hvis du forsøger at indlæse enEDDGridFra...Filer datasæt iERDDAP™, og du får en "0 filer" fejlmeddelelse, der angiver, atERDDAP™fundet 0 matchende filer i mappen (når du tror, at der er matchende filer i denne mappe) :
    * Tjek, at filerne virkelig er i denne mappe.
    * Tjek stavemåden af mappenavnet.
    * Tjek filenNameRegex. Det er virkelig nemt at lave fejl med regexes. Prøv regex .\\*, som skal matche alle filnavne. (Se dette[Indeks dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og og og[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Kontroller, at brugeren, der kører programmet (f.eks. bruger=tomcat (?) for Tomcat /ERDDAP) har 'læs' tilladelse til disse filer.
    * I nogle operativsystemer (for eksempel SELinux) Afhængigt af systemindstillinger skal brugeren, der løb programmet, have "læs" tilladelse til hele kæden af mapper, der fører til den mappe, der har filerne.
         
#### EDDGridFraFiles skelet XML XML{#eddgridfromfiles-skeleton-xml} 
*    **The skelet XML** for alleEDDGridFraFiles subclasses er:

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
 **EDDGridFraAudioFiles** og og og **EDDTableFraAudioFiles** aggregerede data fra en samling af lokale lydfiler. (Disse første optrådte iERDDAP™v1.82.) Forskellen er, atEDDGridFraAudioFiles behandler data som et flerdimensionelt datasæt (normalt med 2 dimensioner:\\[fil starter Tidstid\\]og og og\\[udløb Tid inden for en fil\\]) , der henviser til, at EDDTableFraAudioFiles behandler dataene som tabulære data (Normalt med kolonner til filstartTime, elapsedTime med filen, og dataene fra lydkanalerne) .EDDGridFraAudioFiles kræver, at alle filer har samme antal prøver, så hvis det ikke er sandt, skal du bruge EDDTableFraAudioFiles. Ellers valget af hvilken EDD type at bruge er helt dit valg. En fordel ved EDDTableFraAudioFiles: du kan tilføje andre variabler med andre oplysninger, f.eks.stationID, stationType. I begge tilfælde gør manglen på en samlet tidsvariabel det vanskeligere at arbejde med dataene fra disse EDD-typer, men der var ingen god måde at opsætte en samlet tidsvariabel.

Se disse klasses superklasser,[EDDGridFraFiles](#eddgridfromfiles)og og og[EDDTableFraFiles](#eddtablefromfiles), for generelle oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.

Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Da lydfiler ikke har metadata andre end oplysninger relateret til kodning af lyddata, skal du redigere output fraDatasetsetsets Xml for at give væsentlige oplysninger (f.eks. titel, oversigt,creator\\_name, institution, historie) .

Detaljer:

* Der er et stort antal lydfilformater. I øjeblikket,ERDDAP™kan læse data fra de fleste .wav og .au-filer. Det kan i øjeblikket ikke læse andre typer af lydfiler, f.eks. .aiff eller .mp3. Hvis du har brug for support til andre lydformater eller andre varianter af .wav og .au, bedes du sende din anmodning til Chris. John på noaa.gov . Eller, som om du kan bruge lige nu, kan du konvertere dine lydfiler til PCM\\_ Log ind (for indgående data) eller PCM\\_FLOAT (til flydende punktdata) .wav filer, såERDDAP™kan arbejde med dem.
* I øjeblikket,ERDDAP™kan læse lydfiler med hvadJava's AudioFormat klasse kalder PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW og ULAW kodninger.ERDDAP™Konverterer PCM\\_UNSIGNED værdier (f.eks. 0 til 255) undertegnede værdier (f.eks. -128 til 128) på bagsiden af bits i dataværdierne.ERDDAP™Konverterer ALAW og ULAW kodet fra deres oprindelige kodet byte format til kort (int16) værdier. SidenJavaønsker bigEndian=true data,ERDDAP™Omsætninger af data gemt med bigEndian=false (lille enik) for at læse værdierne korrekt. Til alle andre kodninger (PCM) ,ERDDAP™Læser dataene som er.
* Hvornår Hvornår skal man HvornårERDDAP™Læser data fra lydfiler, det konverterer filens tilgængelige lyd metadata til globale attributter. Dette vil altid inkludere (med prøveværdier vist) 
    
Streng lydBigEndian "false"; //true eller falsk
int lyd 1;
Streng lydkodning "PCM\\_SIGNED";
flyder audioFrameRate 96000.0; //per andet
int audioFrameSize 2; //# af data per ramme
flyder lydSampleRate 96000.0; //per andet
int audioSampleSizeInBits 16; //# af bits per kanal per prøve
    
For For For For ForERDDAP's formål er en ramme synonymt med en prøve, som er dataene til et tidspunkt.
De attributter iERDDAP™vil have de oplysninger, der beskriver dataene, da det var i kildefiler.ERDDAP™vil ofte have ændret dette, mens du læser dataene, f.eks. PCM\\_UNSIGNED, ALAW, og ULAW kodede data konverteres til PCM\\_SIGNED, og bigEndian=false data er konverteret til bigEndian=true data (hvad er, hvordanJavaønsker at læse det) . I sidste ende, dataværdier iERDDAP™vil altid være den[PCM-enkode](https://en.wikipedia.org/wiki/Pulse-code_modulation)dataværdier (dvs. enkle digitaliserede prøver af lydbølgen) .
* Hvornår Hvornår skal man HvornårERDDAP™Læser data fra lydfiler, det læser hele filen.ERDDAP™kan læse så mange som omkring 2 milliarder prøver pr. kanal. Hvis prøveraten er 44,100 prøver pr. sekund, oversættes 2 milliarder prøver til ca. 756 minutter af lyddata pr. fil. Hvis du har lydfiler med mere end denne mængde data, skal du bryde filerne op i mindre stykker, så atERDDAP™kan læse dem.
* Fordi fordiERDDAP™læser hele lydfiler,ERDDAP™skal have adgang til en stor mængde hukommelse til at arbejde med store lydfiler. Se endnu[ERDDAP's hukommelse indstillinger](/docs/server-admin/deploy-install#memory). Igen, hvis dette er et problem, en workaround, at du kan bruge lige nu er at bryde filerne i mindre stykker, så atERDDAP™kan læse dem med mindre hukommelse.
* Nogle lydfiler blev skrevet forkert.ERDDAP™gør en lille indsats for at håndtere sådanne tilfælde. Men generelt, når der er en fejl,ERDDAP™vil smide en Undtagelse (og afvise den fil) eller eller eller (hvis fejlen er ubestridelig) Læs oplysningerne (men dataene vil være ukorrekte) .
*   ERDDAP™Kontrollér ikke lydens volumen. Ideelt set er indgående lyddata beregnet til at bruge hele spektret af datatypen.
* Lydfiler og lydafspillere har ingen system til manglende værdier (fx -999 eller Float.NaN) . Så lyddata bør ikke have nogen manglende værdier. Hvis der mangler værdier (f.eks. hvis du har brug for at forlænge en lydfil) , brug en serie af 0'er, som vil blive fortolket som perfekt tavshed.
* Hvornår Hvornår skal man HvornårERDDAP™Læser data fra lydfiler, det skaber altid en kolonne kaldet elapsed Tid med tiden for hver prøve, på få sekunder (gemt som dobbelt) , i forhold til den første prøve (som er tildelt elapsed Time=0.0 s) . MedEDDGridFraAudioFiles bliver dette den elapsedTime akse variabel.
*   EDDGridFraAudioFiles kræver, at alle filer har samme antal prøver. Så hvis det ikke er sandt, skal du bruge EDDTableFraAudioFiles.
* For For For For ForEDDGridFraAudioFiles, anbefaler vi, at du indstiller [&lt;dimensionValuesInMemory&gt;] (#dimensionel værdisinmemory) til falsk (som anbefales af GenererDatasets Xml) , fordi tidsdimensionen ofte har et stort antal værdier.
* For For For For ForEDDGridFraAudioFiles, bør du næsten altid bruge denEDDGridFraFiles system til[Aggregation via Filnavne](#aggregation-via-file-names-or-global-metadata), næsten altid ved at udtrække optagelsens startdato Tid fra filnavnene. For eksempel,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
GenererDatasets Xml vil opfordre dette og hjælpe dig med dette.
* For EDDTableFraAudioFiles, bør du næsten altid bruge EDDTableFraFiles-systemet til[\\*\\*\\*FilName pseudosourceNames s s](#filename-sourcenames)til at udtrække oplysninger fra filens navn (næsten altid startdatoen Tid til optagelse) og fremme det til at være en kolonne af data. For eksempel,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Tidsformatet skal derefter angives som attributten enheder:&lt;ont navn&lt;/att&gt;
     
### EDDGridFraMergeIRFiles{#eddgridfrommergeirfiles} 
[ **EDDGridFraMergeIRFiles** ](#eddgridfrommergeirfiles)aggregerer data fra lokal,[Sammenfletning](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)filer, som er fra de[Hoteller i nærheden af Tropical Rainfall (TRMM) ](https://trmm.gsfc.nasa.gov), som er en fælles mission mellem NASA og Japan Aerospace Exploration Agency (Billeder af JAXA) . Sammenfletning IR-filer kan downloades fra[NASA NASA NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGridFraMergeIRFiles.java blev skrevet og bidraget til teERDDAP™projekt af Jonathan Lafite og Philippe Makowski af R.Tech Engineering (licens: ophavsretlig open source) .

EDDGridFraMergeIRFiles er lidt usædvanligt:

*   EDDGridFraMergeIRFiles understøtter komprimeret eller ukomprimeret kildedatafiler, i enhver kombination, i samme datasæt. Dette giver dig f.eks. mulighed for at komprimere ældre filer, der sjældent er tilgængelige, men undertrykke nye filer, der ofte er tilgængelige. Eller kan du ændre typen af kompression fra originalen. Z til for eksempel.gz.
* Hvis du har komprimeret og ukomprimeret versioner af de samme datafiler i samme mappe, skal du sørge for, at&lt;FileNameRegex&gt; for dine datasæt matcher de filnavne, du ønsker det til at matche, og ikke svarer til de filnavne, du ikke ønsker det til at matche.
* Ukomprimerede kildedatafiler skal have ingen filudvidelse (dvs., nej "." i filnavnet) .
* Komprimerede kildedatafiler skal have en filudvidelse, menERDDAP™bestemmer typen af kompression ved at undersøge indholdet af filen, ikke ved at se på filens filudvidelse (for eksempel ".Z") . De understøttede kompressionstyper omfatter "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200", og "z". Hvornår Hvornår skal man HvornårERDDAP™Læser komprimerede filer, det undertrykker på-the-fly, uden at skrive til en midlertidig fil.
* Alle kildedatafiler skal bruge det oprindelige filsystem: dvs. *Supplerende oplysninger om YYYYMMDDHH* \\_4km-pixel (hvor *Supplerende oplysninger om YYYYMMDDHH* angiver det tidspunkt, der er forbundet med dataene i filen) , plus en filudvidelse, hvis filen er komprimeret.

Se denne klasses superklasse,[EDDGridFraFiles](#eddgridfromfiles), for generelle oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.

Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
 
### EDDGridFraNcFiles{#eddgridfromncfiles} 
[ **EDDGridFraNcFiles** ](#eddgridfromncfiles)aggregerer data fra lokal, gitteret,[GRIB .grb og .grb2](https://en.wikipedia.org/wiki/GRIB)filer,[HDF  (v4 eller v5)  .hdf](https://www.hdfgroup.org/)filer,[.ncml](#ncml-files)filer,[NetCDF  (v3 eller v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)filer, og[Zarrr](https://github.com/zarr-developers/zarr-python)filer filer filer (som version 2.25) . Zarrr filer har lidt forskellige adfærd og kræver enten fileNameRegex eller stiRegex at inkludere "zarr".

Dette kan arbejde med andre filtyper (for eksempel BUFR) , vi har ikke testet det -- send os nogle prøvefiler.

* Til GRIB-filer,ERDDAP™vil foretage en .gbx indeks fil første gang den læser hver GRIB-fil. Så GRIB-filer skal være i en mappe, hvor "bruger", som løb Tomcat har læst +skrive tilladelse.
* Se denne klasses superklasse,[EDDGridFraFiles](#eddgridfromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.
* Begyndende medERDDAP™v2.12,EDDGridFraNcFiles ogEDDGridFraNcFiles Upakket kan læse data fra "strukturer" i.nc4 og 4.hdf4 filer. At identificere en variabel, der er fra en struktur, den&lt;sourceName&gt; &gt; &gt; &gt; skal bruge formatet: *FuldStructureName* | *Medlemsnavn* , for eksempel gruppe1/myStruct|Mit medlem.
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
    
#### Grupper i Gridded Nc filer{#groups-in-gridded-nc-files} 
    [Netcdf4 filer kan indeholde grupper.](#groups-in-gridded-nc-files) ERDDAP™Bare gør et datasæt fra variablerne i en gruppe og alle dens forældregrupper. Du kan angive et bestemt gruppenavn i GenererDatasets Xml (Billeder af omit te trailing) , eller brug "" til at have GenererDatasets Xml søger alle grupper for de variable, der bruger de mest dimensioner, eller brug "\\[rodrod\\]" at have GenererDatasets bare kigge efter variabler i rodgruppen.
    
Den første ting GenererDatasetsXml gør for denne type datasæt, når du besvarer spørgsmålene udskriver ncdump-lignende struktur af prøvefilen. Så hvis du indtaster et par goofy svar på den første sløjfe gennem GenererDatasets Xml, mindst du vil kunne se, hvisERDDAP™kan læse filen og se, hvilke dimensioner og variabler er i filen. Så kan du give bedre svar på den anden sløjfe gennem GenererDatasetsXml.
    

### EDDGridFraNcFilesUnpakke{#eddgridfromncfilesunpacked} 
[ **EDDGridFraNcFilesUnpakke** ](#eddgridfromncfilesunpacked)er en variant af[EDDGridFraNcFiles](#eddgridfromncfiles)som aggregerer data fra lokal, gitterdedNetCDF  (v3 eller v4)  .ncog relaterede filer. Forskellen er, at denne klasse pakker hver datafil førEDDGridFraFiles ser på filerne:

* Det pakker variabler, der er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor).
* Det konverterer \\_FillValue ogmissing\\_valueværdier for at være NaN's (eller MAX\\_VALUE for integer data typer) .
* Det konverterer tid og tidsstempel værdier til"seconds since 1970-01-01T00:00:00Z".

Den store fordel ved denne klasse er, at det giver en måde at håndtere forskellige værdier afscale\\_factor,add\\_offset, \\_FillValue,missing\\_value, eller tidsenheder i forskellige kildefiler i en samling. Ellers ville du nødt til at bruge et værktøj som[NcML](#ncml-files)eller eller eller[NCO](#netcdf-operators-nco)for at ændre hver fil for at fjerne forskellene, så filerne kunne håndteres afEDDGridFraNcFiles. For denne klasse at arbejde ordentligt, skal filerne følge CF standarder for de relaterede attributter.

* Hvis du forsøger at lave enEDDGridFraNcFiles Upakket fra en gruppe filer, hvor du tidligere forsøgte og mislykkedes at brugeEDDGridFraNcFiles, cd til
     *bigParentDirectory* / Datasæt / *Seneste2Letters* / / / / *datasetID* / / / /
hvor *Seneste2Letters* er de sidste 2 bogstaver afdatasetID,
og slet alle filer i mappen.
* Begyndende medERDDAP™v2.12,EDDGridFraNcFiles ogEDDGridFraNcFiles Upakket kan læse data fra "strukturer" i.nc4 og 4.hdf4 filer. At identificere en variabel, der er fra en struktur, den&lt;sourceName&gt; &gt; &gt; &gt; skal bruge formatet: *FuldStructureName* | *Medlemsnavn* , for eksempel gruppe1/myStruct|Mit medlem.
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
    
Netcdf4 filer kan indeholde grupper. Se endnu[denne dokumentation](#groups-in-gridded-nc-files).
    
Den første ting GenererDatasetsXml gør for denne type datasæt, når du besvarer spørgsmålene udskriver ncdump-lignende struktur af prøvefilen **før før** Det er ubepakket. Så hvis du indtaster et par goofy svar på den første sløjfe gennem GenererDatasets Xml, mindst du vil kunne se, hvisERDDAP™kan læse filen og se, hvilke dimensioner og variabler er i filen. Så kan du give bedre svar på den anden sløjfe gennem GenererDatasetsXml.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)ændrer de længdeværdier af et barn (lukket)  EDDGriddatasæt, der har nogle længdeværdier større end 180 (f.eks. 0 til 360) så de er i serien -180 til 180 (Langitude Plus eller Minus 180, dermed navnet) .

* Dette giver en måde at gøre datasæt, der har længdeværdier større end 180 i/medOGCtjenester (for eksempelWMSserver i serverERDDAP) , siden altOGCtjenester kræver længdeværdier inden for -180 til 180.
* At arbejde nær en diskntinuitet forårsager problemer, uanset om diskentinuiteten er i længde 0 eller i længde 180. Denne datasæt type lader dig undgå disse problemer for alle, ved at tilbyde to versioner af samme datasæt:
en med længdeværdier i interval 0 til 360 ("Pacificent"?) ,
en med længdeværdier i serien -180 til 180 ("Atlanticent"?) .
* For børnedatasæt med alle længdeværdier større end 180, er alle de nye længdeværdier simpelthen 360 grader lavere. For eksempel vil et datasæt med længdeværdier på 180 til 240 blive et datasæt med længdeværdier -180 til -120.
* Til børnedatasæt, der har længdeværdier for hele kloden (ca. 0 til 360) , den nye længdeværdi vil blive bagudrettede for at være (groft) -180 til 180:
De oprindelige 0 til næsten 180 værdier er uændret.
De oprindelige 180 til 360 værdier omdannes til -180 til 0 og skiftede til begyndelsen af længde arrayet.
* Til børnedatasæt, der spænder 180, men ikke dækker verden,ERDDAP™indsætter manglende værdier efter behov for at foretage et datasæt, der dækker verden. For eksempel ville et barns datasæt med længdeværdier på 140 til 200 blive et datasæt med længdeværdier -180 til 180.
Barnets værdier på 180 til 200 ville blive -180 til -160.
Nye længdeværdier vil blive indsat fra -160 til 140. De tilsvarende dataværdier vil være \\_FillValues.
Barnets værdier på 140 til næsten 180 ville være uændret.
Indsætning af manglende værdier kan synes mærkeligt, men det undgår flere problemer, der skyldes at have længdeværdier, der springer pludselig (f.eks. fra -160 til 140) .
* I nærheden af In In In In In In In In In In In In In In[GenererDatasetsXml](#generatedatasetsxml), der er en speciel "dataset type",EDDGridLonPM180FraErddapCatalog, der lader dig generere dendatasets.xmlfor for forEDDGridLonPM180 datasæt fra hver af deEDDGridDatasæt i enERDDAPder har alle længdeværdier større end 180. Dette letter at tilbyde to versioner af disse datasæt:
de oprindelige, med længdeværdier i rækkevidde 0 til 360,
og de nye datasæt, med længdeværdier i serien -180 til 180.
    
Barnets datasæt inden for hverEDDGridLonPM180 datasæt vil være enEDDGridFraErddap datasæt, som peger på det oprindelige datasæt.
Det nye datasætdatasetIDvil være navnet på den oprindelige datasæt plus "\\_LonPM180".
For eksempel,
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
Sæt formenEDDGridLonPM180 datasæt **nedenfor** den oprindelige datasæt idatasets.xml. Det undgår nogle mulige problemer.
    
Alternativt kan du udskifteEDDGridFraErddap børnedatasæt med det oprindelige datasætdatasets.xml. Så vil der kun være en version af datasættet: den ene med længdeværdier inden -180 til 180. Vi afviser dette, fordi der er tider, når hver version af datasættet er mere praktisk.
    
* Hvis du tilbyder to versioner af et datasæt, f.eks. en med længde 0 til 360 og en med længdegrad -180 til 180:
    * Du kan bruge den valgfrie [&lt;tilgængelig Via Via Via ViaWMS&gt;false&lt;/ utilgængelig Via Via Via ViaWMS&gt;] (#accessibleviawms) med 0-360-datasættet til at deaktivere denWMSService til denne datasæt. Så vil kun LonPM180-versionen af datasættet være tilgængelig viaWMS.
    * Der er et par måder at holde LonPM180 datasættet opdateret med ændringer i det underliggende datasæt:
        * Hvis barnets datasæt er etEDDGridFraErddap datasæt, der referencerer et datasæt i det sammeERDDAP™, LonPM180 datasættet vil forsøge at direkte abonnere på det underliggende datasæt, så det altid er opdateret. Direkte abonnementer genererer ikke e-mails, der beder dig om at validere abonnementet - validering skal udføres automatisk.
        * Hvis barnets datasæt ikke er etEDDGridFraErddap datasæt, der er på samme mådeERDDAP™, LonPM180 datasættet vil forsøge at bruge det regulære abonnementssystem til at abonnere på det underliggende datasæt. Hvis du har abonnementssystemet i dit abonnementERDDAP™tændt, skal du få e-mails, der beder dig om at bekræfte abonnementet. Venligst gør det.
        * Hvis du har abonnementssystemet i dit abonnementERDDAP™LonPM180-datasættet kan undertiden have forældede metadata, indtil LonPM180-datasættet er genindlæst. Så hvis abonnementssystemet er slukket, skal du indstille [&lt;reload Alle rettigheder&gt;] (#loadeveryn minutter) Indstilling af LonPM180 datasæt til et mindre nummer, så det er mere sandsynligt at fange ændringer i barnets datasæt hurtigere.

#### EDDGridLonPM180 skelet XML XML{#eddgridlonpm180-skeleton-xml} 

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
[ **EDDGridLon0360** ](#eddgridlon0360)ændrer de længdeværdier af et barn (lukket)  EDDGriddatasæt, der har nogle længdeværdier mindre end 0 (for eksempel -180 til 180) så de er i området 0 til 360 (Derfor navnet) .

* At arbejde nær en diskntinuitet forårsager problemer, uanset om diskentinuiteten er i længde 0 eller i længde 180. Denne datasæt type lader dig undgå disse problemer for alle, ved at tilbyde to versioner af samme datasæt:
en med længdeværdier i serien -180 til 180 ("Atlanticent"?) .
en med længdeværdier i interval 0 til 360 ("Pacificent"?) ,
* For børnedatasæt med alle længdeværdier mindre end 0, er alle de nye længdeværdier simpelthen 360 grader højere. For eksempel ville et datasæt med længdeværdier af -180 til -120 blive et datasæt med længdeværdier på 180 til 240.
* Til børnedatasæt, der har længdeværdier for hele kloden (groft -180 til 180) , den nye længdeværdi vil blive bagudrettede for at være (groft) 0 til 360:
Den oprindelige -180 til 0 værdier omdannes til 180 til 360 og skiftede til slutningen af længde arrayet.
De oprindelige 0 til næsten 180 værdier er uændret.
* Til børnedatasæt, der spænder over lon=0, men ikke dækker verden,ERDDAP™indsætter manglende værdier efter behov for at foretage et datasæt, der dækker verden. For eksempel vil et barns datasæt med længdeværdier på -40 til 20 blive et datasæt med længdeværdier på 0 til 360.
Barnets værdier på 0 til 20 ville være uændret.
Nye længdeværdier vil blive indsat fra 20 til 320. De tilsvarende dataværdier vil være \\_FillValues.
Barnets værdier af -40 til 0 ville blive 320 til 360.
Indsætning af manglende værdier kan synes mærkeligt, men det undgår flere problemer, der skyldes at have længdeværdier, der springer pludselig (fx fra 20 til 320) .
* I nærheden af In In In In In In In In In In In In In In[GenererDatasetsXml](#generatedatasetsxml), der er en speciel "dataset type",EDDGridLon0360Fra ErddapCatalog, der lader dig generere dendatasets.xmlfor for forEDDGridLon0360 datasæt fra hver af deEDDGridDatasæt i enERDDAPder har alle længdeværdier større end 180. Dette letter at tilbyde to versioner af disse datasæt:
de oprindelige, med længdeværdier i rækkevidde 0 til 360,
og de nye datasæt, med længdeværdier i serien -180 til 180.
    
Barnets datasæt inden for hverEDDGridLon0360 datasæt vil være enEDDGridFraErddap datasæt, som peger på det oprindelige datasæt.
Det nye datasætdatasetIDvil være navnet på den oprindelige datasæt plus "\\_Lon0360".
For eksempel,
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
Sæt formenEDDGridLon0360 datasæt **nedenfor** den oprindelige datasæt idatasets.xml. Det undgår nogle mulige problemer.
    
Alternativt kan du udskifteEDDGridFraErddap børnedatasæt med det oprindelige datasætdatasets.xml. Så vil der kun være en version af datasættet: den ene med længdeværdier inden for 0 til 360. Vi afviser dette, fordi der er tider, når hver version af datasættet er mere praktisk.
    
* Hvis du tilbyder to versioner af et datasæt, f.eks. en med længde 0 til 360 og en med længdegrad -180 til 180:
    * Du kan bruge den valgfrie [&lt;tilgængelig Via Via Via ViaWMS&gt;false&lt;/ utilgængelig Via Via Via ViaWMS&gt;] (#accessibleviawms) med 0 til 360 datasæt til at deaktivere denWMSService til denne datasæt. Så vil kun -180 til 180 version af datasættet være tilgængelig viaWMS.
    * Der er et par måder at holde Lon0360 datasættet opdateret med ændringer i det underliggende datasæt:
        * Hvis barnets datasæt er etEDDGridFraErddap datasæt, der referencerer et datasæt i det sammeERDDAP™, Lon0360 datasættet vil forsøge at direkte abonnere på det underliggende datasæt, så det altid er opdateret. Direkte abonnementer genererer ikke e-mails, der beder dig om at validere abonnementet - validering skal udføres automatisk.
        * Hvis barnets datasæt ikke er etEDDGridFraErddap datasæt, der er på samme mådeERDDAP™, Lon0360 datasættet vil forsøge at bruge det regulære abonnementssystem til at abonnere på det underliggende datasæt. Hvis du har abonnementssystemet i dit abonnementERDDAP™tændt, skal du få e-mails, der beder dig om at bekræfte abonnementet. Venligst gør det.
        * Hvis du har abonnementssystemet i dit abonnementERDDAP™Lon0360-datasættet kan undertiden have forældede metadata, indtil Lon0360-datasættet er genindlæst. Så hvis abonnementssystemet er slukket, skal du indstille [&lt;reload Alle rettigheder&gt;] (#loadeveryn minutter) Indstilling af Lon0360 datasæt til et mindre nummer, så det er mere sandsynligt at fange ændringer i barnets datasæt hurtigere.
#### EDDGridLon0360 skelet XML XML{#eddgridlon0360-skeleton-xml} 
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

### EDDGridSideforside{#eddgridsidebyside} 
[ **EDDGridSideforside** ](#eddgridsidebyside)Samler to eller flereEDDGridDatasæt (børn) side om side.

* Det resulterende datasæt har alle variabler fra alle barnets datasæt.
* Forældredatasættet og alle barnets datasæt skal have forskelligedatasetIDs. Hvis nogen navne i en familie er præcis det samme, vil datasættet undlade at indlæse (med fejlmeddelelsen, at værdierne af den samlede akse ikke er i sorteret rækkefølge) .
* Alle børn skal have de samme kildeværdier foraxisVariables s s\\[1+\\]  (for eksempel breddegrad, længdegrad) . Nøjagtigheden af testen bestemmes af[MatchAxisNDigits](#matchaxisndigits).
* Børnene kan have forskellige kildeværdier foraxisVariables s s\\[0\\]  (for eksempel tid) , men de er normalt det samme.
* Forældredatasættet vil blive vist for at have alle afaxisVariables s s\\[0\\]kildeværdier fra alle børn.
* For eksempel kan du kombinere et kildedatasæt med en vektors u-komponent og en anden kildedatasæt med en vektors v-komponent, så de kombinerede data kan betjenes.
* Børn skabt af denne metode holdes privat. De er ikke separat tilgængelige datasæt (f.eks. af klientdata anmodninger eller af[flagfiler](/docs/server-admin/additional-information#flag)) .
* De globale metadata og indstillinger for forælderen kommer fra de globale metadata og indstillinger for det første barn.
* Hvis der er en undtagelse, mens du opretter det første barn, oprettes forælderen ikke.
* Hvis der er en undtagelse, mens du opretter andre børn, sender dette en e-mail til e-mailEverythingTo (som angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)) og fortsætter med de andre børn.
#### EDDGridSideBySide skelet XML XML{#eddgridsidebyside-skeleton-xml} 
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
[ **EDDGridAggregateExistingDimension** ](#eddgridaggregateexistingdimension)Samler to eller flereEDDGridDatasets, som hver især har forskellige værdier for den første dimension, men identiske værdier for de andre dimensioner.

* For eksempel kan et barns datasæt have 366 værdier (for 2004) for tidens dimension og et andet barn kan have 365 værdier (for 2005) for tidens dimension.
* Alle værdier for alle de andre dimensioner (for eksempel breddegrad, længdegrad) SKAL være identisk for alle børn. Nøjagtigheden af testen bestemmes af[MatchAxisNDigits](#matchaxisndigits).
* Sorteret Dimension Værdier - Værdierne for hver dimension skal være i sorteret rækkefølge (stigende eller faldende) . Værdierne kan være uregelmæssigt mellemrum. Der kan ikke være nogen bånd. Dette er et krav om kravet[CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Hvis nogen dimensions værdier ikke er i sorteret rækkefølge, vil datasættet ikke blive indlæst ogERDDAP™vil identificere den første usorteret værdi i logfilen, *bigParentDirectory* /logs/log.txt .
    
Uspecificerede dimensionværdier angiver næsten altid et problem med kildedatasættet. Dette forekommer oftest, når en forkert eller upassende fil er inkluderet i aggregationen, som fører til en usorteret tidsdimension. Hvis du vil løse dette problem, skal du se fejlmeddelelsen i meddelelsenERDDAP™log.txt-filen for at finde den fornærmende tidsværdi. Så se i kildefiler for at finde den tilsvarende fil (eller en før eller en efter) det tilhører ikke i sammenlægningen.
    
* Forældredatasættet og barnet datasættet skal have forskelligedatasetIDs. Hvis nogen navne i en familie er præcis det samme, vil datasættet undlade at indlæse (med fejlmeddelelsen, at værdierne af den samlede akse ikke er i sorteret rækkefølge) .
* I øjeblikket, barnet datasæt skal være enEDDGridFraDap datasæt og SKAL have de laveste værdier af den aggregerede dimension (Normalt de ældste tidsværdier) . Alle de andre børn skal være næsten identiske datasæt (adskiller sig kun i værdierne for den første dimension) og er angivet af blot deressourceUrl.
* Det samlede datasæt får sine metadata fra det første barn.
* The The The The The The The[GenererDatasets Xml program](#generatedatasetsxml)kan lave et groft udkast tildatasets.xmlfor enEDDGridAggregateExistingDimension baseret på et sæt af filer tjent af enHyraxeller EDDS server. Brug f.eks. denne indgang til programmet ("/1988" i URL'en gør, at eksemplet kører hurtigere) :
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
Du kan bruge resultatet&lt;sourceUrl&gt; tags eller slette dem og undladelse af&lt;sourceUrl&gt; tag (så nye filer er bemærket hver gang datasættet er genindlæst.
#### EDDGridAggregateExistingDimension skelet XML XML{#eddgridaggregateexistingdimension-skeleton-xml} 
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

### EDDGridKopiere Kopier{#eddgridcopy} 
[ **EDDGridKopiere Kopier** ](#eddgridcopy)gør og vedligeholder en lokal kopi af en andenEDDGrid's data og tjener data fra den lokale kopi.

*   EDDGridKopiere Kopier (og til tabulære data,[EDDTableCopy](#eddtablecopy)) er en meget let at bruge og en meget effektiv
     **løsning til nogle af de største problemer med at betjene data fra en fjern datakilde:** 
    * Adgang af data fra en fjern datakilde kan være langsom.
        * Det kan være langsom, fordi det er iboende langsom (f.eks. en ineffektiv type server) ,
        * fordi det er overvældet af for mange anmodninger,
        * eller fordi din server eller fjernserveren er båndbredde begrænset.
    * Fjerndatasættet er undertiden utilgængelig (igen, af en række grunde) .
    * Omliggende på én kilde til dataene ikke skaleres godt (for eksempel, når mange brugere og mangeERDDAPs udnytte det) .
         
* Hvordan det virker --EDDGridKopier løser disse problemer ved automatisk at foretage og vedligeholde en lokal kopi af data og servere data fra den lokale kopi.ERDDAP™kan tjene data fra den lokale kopi meget, meget hurtigt. Og at lave en lokal kopi lindrer byrden på fjernserveren. Og den lokale kopi er en sikkerhedskopi af den oprindelige, som er nyttig i tilfælde af noget sker til originalen.
    
Der er ikke noget nyt om at lave en lokal kopi af et datasæt. Hvad er nyt her er, at denne klasse gør det\\*nemt og nemt\\*at oprette og oprette\\*opretholde vedligehold\\*en lokal kopi af data fra en\\*sort\\*af typer fjerndatakilder og\\*Tilføje metadata\\*mens du kopierer dataene.
    
* Indsamling af data --EDDGridKopier gør den lokale kopi af dataene ved at anmode om bundter af data fra fjernbetjeningen&lt;Datasæt&gt; . Der vil være en smule for hver værdi af den venstre største (først først) akse variabel.EDDGridKopier afhænger ikke af fjerndatasættets indeksnumre for aksen - de kan ændre.
    
ADVARSEL: Hvis størrelsen af en mængde data er så stor (&gt; &gt; &gt; &gt; 2 GB) at det forårsager problemer,EDDGridKopier kan ikke bruges. (Desværre håber vi at have en løsning til dette problem i fremtiden.) 
    
*   \\[Et alternativ tilEDDGridKopier -
Hvis fjerndata er tilgængelige via downloadbare filer, ikke en webtjeneste, brug[cache cache cache cache FraUrl mulighed forEDDGridFraFiles](#cachefromurl), som gør en lokal kopi af fjernfiler og tjener data fra de lokale filer.\\]
* Lokale filer -- Hver mængde data gemmes i en separatNetCDFfil i en undermappe af *bigParentDirectory* /copy / *datasetID* / / / / (som angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)) . filnavne, der er oprettet fra akseværdier, ændres for at gøre dem fil-name-safe (For eksempel erstattes bindestreger af "x2D") - Dette påvirker ikke de faktiske data.
     
* Nye data -- Hver gangEDDGridKopier er genindlæst, det kontrollerer fjernbetjeningen&lt;Dataset&gt; for at se, hvilke bidder der er tilgængelige. Hvis filen for en flok data ikke allerede findes, tilføjes en anmodning om at få klumpen til en kø.ERDDAP's opgaveThread processer alle de køerede anmodninger om bidder af data, en-by-one. Du kan se statistik for opgavenThreads aktivitet på opgaven[Status side](/docs/server-admin/additional-information#status-page)og i området[Daglig rapport](/docs/server-admin/additional-information#daily-report). (Ja,ERDDAP™kunne tildele flere opgaver til denne proces, men det ville bruge masser af fjerndatakildens båndbredde, hukommelse og CPU tid, og masser af den lokaleERDDAP's båndbredde, hukommelse og CPU tid, heller ikke af hvilket er en god ide.) 
    
BEMÆRK: Den første gang enEDDGridKopier er indlæst, (hvis alt går godt) masser af anmodninger om bundter af data vil blive tilføjet til opgaveThread's kø, men ingen lokale datafiler bliver oprettet. Så udvikleren vil mislykkes, men opgaveThread vil fortsætte med at arbejde og oprette lokale filer. Hvis alt går godt, vil opgaveThread gøre nogle lokale datafiler og det næste forsøg at indlæse datasættet (i ~15 minutter) vil lykkes, men i første omgang med en meget begrænset mængde data.
    
BEMÆRK: Når det lokale datasæt har nogle data og vises i dine dataERDDAP, hvis fjerndatasættet er midlertidigt eller permanent ikke tilgængelig, vil det lokale datasæt stadig arbejde.
    
ADVARSEL: Hvis fjerndatasættet er stor og/eller fjernserveren er langsom (det er problemet, er det ikke?&#33;) , vil det tage lang tid at lave en komplet lokal kopi. I nogle tilfælde vil den nødvendige tid være uacceptabel. For eksempel, overføre 1 TB data over en T1-linje (0.15 GB/s) tager mindst 60 dage under optimale betingelser. Desuden bruger den masser af båndbredde, hukommelse og CPU tid på fjern og lokale computere. Løsningen er at sende en harddisk til administratoren af fjerndatasættet, så s/he kan lave en kopi af datasættet og sende harddisken tilbage til dig. Brug disse data som udgangspunkt ogEDDGridKopier vil tilføje data til det. (Det er en måde, at[Amazon's EC2 Cloud Service](https://aws.amazon.com/importexport/)håndterer problemet, selvom deres system har masser af båndbredde.) 
    
ADVARSEL: Hvis en given værdi til venstre (først først) akse variabel forsvinder fra fjerndatasættet,EDDGridKopier sletter IKKE den lokale kopierede fil. Hvis du vil, kan du slette det selv.
    
#### Grid Copy checkSource Datadata{#grid-copy-checksourcedata} 
The The The The The The Thedatasets.xmlfor denne datasæt kan have et valgfrit tag
```
    <checkSourceData>true</checkSourceData>  
```
Standardværdien er sandt. Hvis / når du angiver det til falsk, vil datasættet ikke nogensinde kontrollere kildedatasættet for at se, om der er yderligere data tilgængelige.

#### KunSince{#onlysince} 
Du kan fortælleEDDGridKopier for at lave en kopi af et undersæt af kildedatasættet, i stedet for hele kildedatasættet, ved at tilføje et tag i formularen&lt;KunSince&gt; *nogle af nogle Værdiværdi* &lt;/kunSince&gt; til datasættetsdatasets.xmlLidt.EDDGridKopier vil kun downloade dataværdier relateret til værdierne i den første dimension (normalt tidsdimensionen) som er større end *nogle af nogle Værdiværdi* . *nogle af nogle Værdiværdi* Kan være:
    * En relativ tid angivet vianow- *nUnits* .
For eksempel,&lt;KunSince&gt;now-2 år&lt;/kunSince&gt; fortæller datasættet til kun at foretage lokale kopier af dataene til data, hvor den ydre dimensions værdier (Normalt tidsværdier) er inden for de sidste 2 år (som genfordampes hver gang datasættet er genindlæst, hvilket er, når det ser efter nye data til at kopiere) . Se billederne[now- *nUnits* Syntaksens beskrivelse](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Dette er nyttigt, hvis den første dimension har tidsdata, som det normalt gør.
        
        EDDGridCopy sletter ikke lokale datafiler, der har data, der over tid bliver ældre endnow- *nUnits* . Du kan slette disse filer enhver tid, hvis du vælger at. Hvis du gør, anbefaler vi stærkt, at du indstiller en[flag flag flag flag](/docs/server-admin/additional-information#flag)efter du sletter filerne for at fortælleEDDGridKopiér til at opdatere listen over cachelagrede filer.
        
    * Et fast punkt i tid angivet som en ISO 8601 strengyyyy-MM-ddTHH:mm:ssZ.
For eksempel,&lt;kunSince&gt;2000-01T00:00:00Z&lt;/kunSince&gt; fortæller datasættet kun til at lave lokale kopier af data, hvor den første dimensions værdi er \\&gt;=2000-01T00:00:00Z . Dette er nyttigt, hvis den første dimension har tidsdata, som det normalt gør.
         
    * Et flydende punktnummer.
For eksempel,&lt;kunSince&gt;946684800.0&lt;/kunSince&gt; . Enhederne vil være destinationsenhederne i den første dimension. For eksempel til tidsdimensioner, enhederne iERDDAP™er altid"seconds since 1970-01-01T00:00:00Z". Så 946684800.0"seconds since 1970-01-01T00:00:00Z"Det svarer til 2000-01T00:00:00Z. Dette er altid en nyttig mulighed, men er især nyttig, når den første dimension ikke har tidsdata.

#### EDDGridKopier Recomended brug{#eddgridcopy-recomended-use} 
1. Opret forbindelse&lt;Datasæt&gt; indgang (den oprindelige type, ikkeEDDGridKopiere Kopier) til fjerndatakilden.
     **Få det til at arbejde korrekt, herunder alle de ønskede metadata.** 
2. Hvis det er for langsom, skal du tilføje XML-kode til at pakke den i enEDDGridKopier datasæt.
    * Brug en andendatasetID  (måske ved at ændre dendatasetIDaf den gamledatasetIDlidt lidt lidt lidt) .
    * Kopiere den&lt;tilgængelig Til&gt;,&lt;reloadEveryNMinutes&gt; og&lt;påChange&gt; fra fjernbetjeningenEDDGrid's XML til teEDDGridCopy's XML. (Deres værdier forEDDGridKopier materie; deres værdier for det indre datasæt bliver irrelevant.) 
3.  ERDDAP™vil foretage og vedligeholde en lokal kopi af dataene.
         
* ADVARSEL:EDDGridKopier antager, at dataværdierne for hver klump ikke nogensinde ændrer sig. Hvis / når de gør, skal du manuelt slette de chunk-filer i *bigParentDirectory* /copy / *datasetID* / som ændrede og[flag flag flag flag](/docs/server-admin/additional-information#flag)de datasæt, der skal indlæses, så de slettede bidder vil blive erstattet. Hvis du har et e-mail-abonnement til datasættet, får du to e-mails: en når datasættet først genindlæsser og begynder at kopiere dataene, og en anden, når datasættet indlæses igen (automatisk automatisk automatisk) og registrerer de nye lokale datafiler.
     
* Alle akseværdier skal være lige.
Til hver af akserne bortset fra venstre yderste (først først) , alle værdier skal være lig for alle børn. Nøjagtigheden af testen bestemmes af[MatchAxisNDigits](#matchaxisndigits).
     
* Indstillinger, Metadata, Varer --EDDGridKopier bruger indstillinger, metadata og variabler fra den medfølgende kildedatasæt.
     
* Metadata -- Hvis du har brug for at ændre nogetaddAttributeseller ændre rækkefølgen af de variabler, der er forbundet med kildedatasættet:
    1. Ændre ændringenaddAttributesfor kildedatasættet idatasets.xml, efter behov.
    2. Slette en af de kopierede filer.
    3. Indstil et sæt[flag flag flag flag](/docs/server-admin/additional-information#flag)at indlæse datasættet umiddelbart. Hvis du bruger et flag, og du har et e-mail-abonnement på datasættet, får du to e-mails: en når datasættet først genindlæsser og begynder at kopiere dataene, og en anden, når datasættet indlæses igen (automatisk automatisk automatisk) og registrerer de nye lokale datafiler.
    4. Den slettede fil vil blive genskabt med de nye metadata. Hvis kildedatasættet ikke er tilgængeligt, kan kildedatasættetEDDGridKopier datasæt vil få metadata fra den regenererede fil, da det er den yngste fil.
#### EDDGridKopier skelet XML XML{#eddgridcopy-skeleton-xml} 
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
[ **EDDTableFraCassandra** ](#eddtablefromcassandra)håndterer data fra én[Cassandra](https://cassandra.apache.org/)Tabel. Cassandra er en NoSQL database.

*   ERDDAP™kan arbejde med Cassandra v2 og v3 uden ændringer eller forskelle i opsætning. Vi har testet med[Cassandra v2 og v3 fra Apache Apache](https://cassandra.apache.org/download/). Det er sandsynligt, atERDDAP™kan også arbejde med Cassandra downloadet fra DataStax.
     
* For Aug 2019 - maj 2021 havde vi problemer med at få Cassandra til at arbejde med AdoptOpenJdkJavav8. Det kastede en EXCEPTION\\_ACCESS\\_VIOLATION). Men nu (maj 2021) , det problem er gået: vi kan med succes bruge Cassandra v2.1.22 og AdoptOpenJdk jdk8u292-b10.
     
#### En tabel{#one-table} 
Cassandra understøtter ikke "forbindelser" på den måde, som relationsdatabaser gør. EnERDDAP™EDDTableFraCassandra datasæt kort til en (måske et undersæt af en) Cassandra bord.

#### Cassandradatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™Leveres med CassandraJavadriver, så du ikke behøver at installere den separat.
* Læs omhyggeligt alle disse dokumenters oplysninger om EDDTableFraCassandra. Nogle af detaljerne er meget vigtige.
* The CassandraJavadriver er beregnet til at arbejde med Apache Cassandra (1.2+) og DataStax Enterprise (3.1+) . Hvis du bruger Apache Cassandra 1.2.x, skal du redigere cassandra.yaml-filen for hver node for at indstille start\\_native\\_transport: sand, derefter genstarte hver node.
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere, at for at finjustere den (især [&lt;partition partition Klik her for at fjerne KeySourceNames&gt;] (#keypartitionnames) ). Du kan indsamle de oplysninger, du har brug for til at oprette XML til en EDDTableFraCassandra datasæt ved at kontakte Cassandra og ved at søge på internettet.
    
GenererDatasets Xml har to særlige muligheder for EDDTableFraCassandra:
    
    1. Hvis du indtaster "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (uden tilbud) for keyspace, programmet vil vise en liste over nøglerum
    2. Hvis du indtaster et bestemt nøglerum, og indtast derefter "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (uden tilbud) for tabelnavnet viser programmet en liste over tabeller i det centrale rum og deres kolonner.
##### Case følsomhed{#case-sensitivity} 
* Case-infølsomme nøglerum og tabelnavne -
Cassandra behandler nøglerum og tabelnavne i enui-infølsom måde. På grund af dette, du SKAL NEVER bruge et reserveret ord (men med en anden sag) som Cassandra nøglerum eller tabelnavn.
* Case-infølsomme kolonnenavne --
Som standard behandler Cassandra kolonnenavne i en tilfælde-infølsom måde. Hvis du bruger en af Cassandras reserverede ord som et kolonnenavn (Hej&#33;) , du SKAL bruge
```
        <columnNameQuotes>"<columnNameQuotes>  
```
i in in in indatasets.xmlfor denne datasæt, så Cassandra ogERDDAP™vil behandle kolonnenavnene i en tilfælde-følsom måde. Dette vil sandsynligvis være en massiv hovedpine for dig, fordi det er svært at bestemme de tilfældefølsomme versioner af kolonnenavne -- Cassandra viser næsten altid kolonnenavne som alle lavere-case, uanset det sande tilfælde.
* Arbejd tæt sammen med Cassandra-administratoren, der kan have relevant erfaring. Hvis datasættet ikke indlæses, skal du læse datasættet[fejlmeddelelse](#troubleshooting-tips)nøje for at finde ud af hvorfor.
         
#### Cassandra&lt;Tilslutningstilslutning Ejendom&gt;{#cassandra-connectionproperty} 
Cassandra har forbindelsesegenskaber, som kan specificeres idatasets.xml. Mange af disse vil påvirke ydeevnen af Cassandra-ERDDAP™tilslutning. Desværre, Cassandra egenskaber skal indstilles programmatisk iJava, såERDDAP™skal have kode for hver ejendomERDDAP™understøtter. I øjeblikket,ERDDAP™understøtter disse egenskaber:
 (De viste standarder er, hvad vi ser. Dit systems standarder kan være anderledes.) 

*    **Generelle indstillinger**   
    &lt;Tilslutningstilslutning Ejendomsnavn **kompressionskomprimering** ↓ *Ingen ingen ingen|LZ4|snappy* &lt;/ tilslutning Ejendom&gt; (Tilfældefølsomme, standard=none)   
     (Generel kompressionsrådgivning: Brug 'none', hvis forbindelsen mellem Cassandra ogERDDAP™er lokal/hurtig og brug 'LZ4', hvis forbindelsen er fjern/slow.)   
    &lt;Tilslutningstilslutning Ejendomsnavn **legitimationsoplysninger** ↓ *brugernavn/password* &lt;/ tilslutning Ejendom&gt; (Det er en bogstavelig'/')   
    &lt;Tilslutningstilslutning Ejendomsnavn **metrics** ↓ *sande sande sande sande|falsk* &lt;/ tilslutning Ejendom&gt; (2021-01-25 var standard=true, nu ignoreret og altid falsk)   
    &lt;Tilslutningstilslutning Ejendomsnavn **portport** ↓ *aInteger* &lt;/ tilslutning Ejendom&gt; (standard for indfødt binær protokol=9042)   
    &lt;Tilslutningstilslutning Ejendomsnavn **ssl** ↓ *sande sande sande sande|falsk* &lt;/ tilslutning Ejendom&gt; (Standard=false)   
     (Mit hurtige forsøg på at bruge ssl mislykkedes. Hvis du lykkes, så fortæl mig, hvordan du gjorde det.) 
*    **Forespørgselsindstillinger**   
    &lt;Tilslutningstilslutning Ejendomsnavn **konsistens Niveauniveau** ↓ *alle|nogen som helst|hver \\_quorum|lokal \\_one|Lokal \\_quorum|Lokal \\_serial|én|quorum|seriel serie|tre|to to to to* &lt;/ tilslutning Ejendom&gt; (Tilfældefølsomme, standard=ONE)   
    &lt;Tilslutningstilslutning Ejendomsnavn **HentSize** ↓ *aInteger* &lt;/ tilslutning Ejendom&gt; (Standard=5000)   
     (Du må ikke vælge HentSize til en mindre værdi.)   
    &lt;Tilslutningstilslutning Ejendomsnavn **seriekonsistencyLevel** ↓ *alle|nogen som helst|hver \\_quorum|lokal \\_one|Lokal \\_quorum|Lokal \\_serial|én|quorum|seriel serie|tre|to to to to* &lt;/ tilslutning Ejendom&gt; (Tilfældefølsomme, standard=SERIAL) 
*    **Stikkontakt muligheder**   
    &lt;Tilslutningstilslutning Ejendomsnavn **TilslutningstidoutMillis** ↓ *aInteger* &lt;/ tilslutning Ejendom&gt; (Standard=5000)   
     (Tilslut ikke TimeoutMillis til en mindre værdi.)   
    &lt;Tilslutningstilslutning Ejendomsnavn **HoldAlive** ↓ *sande sande sande sande|falsk* &lt;/ tilslutning Ejendom&gt;
    &lt;Tilslutningstilslutning Ejendomsnavn **læst afTimeoutMillis** ↓ *aInteger* &lt;/ tilslutning Ejendom&gt;
     (Cassandras standard readTimeoutMillis er 12000, menERDDAP™ændrer standarden til 120000. Hvis Cassandra smider læsetidouts, kan det ikke hjælpe, fordi Cassandra nogle gange smider dem før denne tid. Problemet er mere sandsynligt, at du gemmer for meget data per partition Nøglekombination.)   
    &lt;Tilslutningstilslutning Ejendomsnavn **modtageBufferSize** ↓ *aInteger* &lt;/ tilslutning Ejendom&gt;
     (Det er uklart, hvad standard modtageBufferSize er. Sæt ikke dette til en lille værdi.)   
    &lt;Tilslutningstilslutning Ejendomsnavn **soLinger** ↓ *aInteger* &lt;/ tilslutning Ejendom&gt;
    &lt;Tilslutningstilslutning Ejendomsnavn **TcpNoDelay** ↓ *sande sande sande sande|falsk* &lt;/ tilslutning Ejendom&gt; (Standard=null) 

Hvis du har brug for at kunne indstille andre forbindelsesegenskaber, se vores[sektion om at få ekstra støtte](/docs/intro#support).

For en given opstart af Tomcat anvendes forbindelsesproperties kun første gang et datasæt oprettes til en given Cassandra URL. Alle genindlæsninger af disse datasæt og alle efterfølgende datasæt, der deler den samme URL, vil bruge disse originale forbindelsespunkter.
    
#### CQL{#cql} 
Hoteller i nærheden af The Cassandra Language (CQL) er overfladisk ligesom SQL, det forespørgselssprog, der bruges af traditionelle databaser. Fordi fordiOPeNDAP's tabulære data anmodninger blev designet til at efterligne SQL-tabular-data anmodninger, det er muligt forERDDAP™til at konvertere tabulære data anmodninger til CQL Bound/PreparedStatements.ERDDAP™Skriver erklæringen i[log.txt](/docs/server-admin/additional-information#log)som
erklæring som tekst: *I nærheden af teStatementAsText*   
Versionen af den erklæring, du ser, vil være en tekst repræsentation af erklæringen, og vil kun have "?" hvor begrænsninger værdier vil blive placeret.
       
Ikke så simpelt -- Desværre har CQL mange restriktioner på, hvilke kolonner kan queriedes med hvilke typer begrænsninger, f.eks. partitionskolonner kan optages med = og IN, såERDDAP™sender nogle begrænsninger til Cassandra og gælder alle begrænsninger efter data modtages fra Cassandra. For at hjælpeERDDAP™deal effektivt med Cassandra, skal du angive [&lt;partition partition Klik her for at fjerne KeySourceNames&gt;] (#keypartitionnames) [&lt;Kolonprinsessenavne&gt;] (#clustercolumnsourcenavne) og [&lt;Indeksekontekster&gt;] (#indexcolumnsourcenavne) i in in in indatasets.xmlfor denne datasæt. Disse er de vigtigste måder at hjælpeERDDAP™arbejde effektivt med Cassandra. Hvis du ikke fortællerERDDAP™disse oplysninger, datasættet vil være smertefuldt langsom iERDDAP™Brug tonsvis af Cassandra ressourcer.
     
#### &lt;partition partition Hovedhjørnenavne&gt;{#partitionkeysourcenames} 
Fordi partitionsnøgler spiller en central rolle i Cassandra tabeller,ERDDAP™behov for at vide deressourceNames og, hvis relevant, andre oplysninger om, hvordan man arbejder med dem.
* Du skal angive en koma-separeret liste over partitionstastiske kildekolonnenavne idatasets.xmlvia&lt;partition partition KeySourceNames&gt;.
Enkel eksempel,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Mere komplekst eksempel,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp Partition Keys -- Hvis en af partitionstasten kolonner er en tidsstempel kolonne, der har en grovere version af en anden gangetamp kolonne, skal du angive dette via
     *partitionKeySourcName / anden kolonneKærksomhed /time\\_precision*   
hvortime\\_precisioner en af[time\\_precision](#time_precision)strenge brugt andre steder iERDDAP.
Ruten Z i sporettime\\_precisionstreng er standarden, så det ikke betyder noget, hvistime\\_precisionstreng ender i Z eller ej.
For eksempel,ERDDAP™tolkningsdato/samltid/1970-01 som "Constraints for dato kan konstrueres fra begrænsninger på prøvetid ved hjælp af dettetime\\_precision." Den faktiske konvertering af begrænsninger er mere kompleks, men det er oversigten.
     **Brug dette, når det er relevant.** Det muliggørERDDAP™at arbejde effektivt med Cassandra. Hvis dette forhold mellem kolonner findes i et Cassandra-bord, og du ikke fortællerERDDAP™, datasættet vil være smertefuldt langsom iERDDAP™Brug tonsvis af Cassandra ressourcer.
* Enkelt Value Partition Keys -- Hvis du ønsker enERDDAP™datasæt til at arbejde med kun én værdi af en partitionsnøgle, angive *PartitionKeySourceName=værdi* .
Brug ikke citater til en numeriske kolonne, f.eks. enhedid =007
Brug citater til en streng kolonne, for eksempel, stationid TwitchPoint Pinos"
* Datasæt Standard Sortering -- rækkefølgen af partitionstasten&lt;dataVariable&gt;'er idatasets.xmlbestemmer standardtypen af resultaterne fra Cassandra. Selvfølgelig kan brugerne anmode en anden sorteringsordre for et givet sæt af resultater ved at afvente ogorderBy (" " " " *kommanderet liste over variable* " " " ") til slutningen af deres forespørgsel.
* Som standard, Cassandra ogERDDAP™behandle kolonnenavne i en tilfælde-infølsom måde. Men hvis du indstiller[kolonnenavnQuotes](#case-sensitivity)til ",ERDDAP™vil behandle Cassandra kolonnenavne en i tilfælde-følsom måde.
         
#### &lt;partition partition KeyCSV&gt;{#partitionkeycsv} 
Hvis dette er angivet,ERDDAP™vil bruge det i stedet for at spørge Cassandra til partitionen Nøgleinformation hver gang datasættet er genindlæst. Dette giver listen over forskellige partitionsnøgleværdier, for at de vil blive brugt. Tiden skal være angivet som sekunder siden 1970-01T00:00:00Z. Men der er også to særlige alternative måder at angive gange (hver kodet som en streng) :

1) tid (ENISO8601 Tidstid)   (Kan kodes som en streng)   
2) "tiderne (aISO8601StartTime, stepeSeconds, stopTime) " " " " (SKAL være kodet som en streng)   
stop Tid kan være en ISO8601 Tid eller en "now-nUnits" tid (f.eks. "now-3 minutter") .
stop Tiden behøver ikke at være en præcis match af start Tid + x stepeSeconds.
En række med en tid () værdi bliver udvidet i flere rækker før hver forespørgsel, så listen over partition Nøgler kan altid være helt opdateret.
For eksempel,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
udvider sig i denne tabel af partitionsnøglekombinationer:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;klyngelinjeKærenavn:{#clustercolumnsourcenames} 
Cassandra accepterer SQL-lignende begrænsninger på klyngekolonner, som er de kolonner, der udgør den anden del af den primære nøgle (efter partitionstasten (s s s) ) . Så er det vigtigt, at du identificerer disse kolonner via&lt;Klyngeformet navne&gt;. Dette gør det muligtERDDAP™at arbejde effektivt med Cassandra. Hvis der er klyngekolonner, og du ikke fortællerERDDAP, datasættet vil være smertefuldt langsom iERDDAP™Brug tonsvis af Cassandra ressourcer.
    * For eksempel,&lt;Klyngeformet navne&gt; *I nærheden af myCluster Cruise1, myCluster* &lt;Klik her for at få flere oplysninger.
    * Hvis et Cassandra-bord ikke har klyngekolonner, skal du enten ikke angive&lt;klyngelinjeKildenavne&gt;, eller angive den uden værdi.
    * Som standard, Cassandra ogERDDAP™behandle kolonnenavne i en tilfælde-infølsom måde. Men hvis du indstiller[kolonnenavnQuotes](#case-sensitivity)til ",ERDDAP™vil behandle Cassandra kolonnenavne i en tilfælde-følsom måde.
         
#### &lt;indekseringsnavn:{#indexcolumnsourcenames} 
Cassandra accepterer'='begrænsninger på sekundære indekskolonner, som er de kolonner, du har eksplicit oprettet indekser til via
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Ja, forældrene er nødvendige.)   
Så er det meget nyttigt, hvis du identificerer disse kolonner via&lt;Klik her for at se vores liste. Dette gør det muligtERDDAP™at arbejde effektivt med Cassandra. Hvis der er indekskolonner, og du ikke fortællerERDDAP, nogle forespørgsler vil være nålesly, smertefuldt langsom iERDDAP™Brug tonsvis af Cassandra ressourcer.
* For eksempel,&lt;Indholdsfortegnelse *myIndex kolonne1, myIndex* &lt;/index kolonneKærenavn&gt;
* Hvis et Cassandra-bord ikke har indekskolonner, skal du enten ikke angive&lt;indekseringsnavn&gt;, eller angive den uden værdi.
* ADVARSEL: Cassandra indekser er ikke ligesom database indekser. Cassandra indekser hjælper kun med'='begrænsninger. Og de er kun[anbefalet anbefalet](https://cassandra.apache.org/doc/latest/cql/indexes.html)for kolonner, der har langt færre forskellige værdier end samlede værdier.
* Som standard, Cassandra ogERDDAP™behandle kolonnenavne i en tilfælde-infølsom måde. Men hvis du indstiller[kolonnenavnQuotes](#case-sensitivity)til ",ERDDAP™vil behandle Cassandra kolonnenavne i en tilfælde-følsom måde.
         
#### &lt;maxRequestFraction&gt;{#maxrequestfraction} 
Hvornår Hvornår skal man HvornårERDDAP™  (gen igen) indlæser et datasæt,ERDDAP™Få fra Cassandra listen over forskellige kombinationer af partitionsnøgler. For et stort datasæt, vil antallet af kombinationer være enorm. Hvis du ønsker at forhindre brugernes anmodninger fra at anmode om de fleste eller alle datasættet (eller endda en anmodning, der spørgerERDDAP™at downloade de fleste eller alle data for at filtrere dem) , du kan fortælleERDDAP™kun for at tillade anmodninger, der reducerer antallet af kombinationer ved nogle beløb via&lt;maxRequestFraction&gt;, som er et flydende punktnummer mellem 1e-10 (hvilket betyder, at anmodningen ikke behøver mere end 1 kombination i en milliard) og 1 (standarden, hvilket betyder, at anmodningen kan være for hele datasættet) .
Hvis et datasæt f.eks. har 10000 forskellige kombinationer af partitionsnøgler og maxRequestFraction er indstillet til 0,1,
derefter anmodninger, der har brug for data fra 1001 eller flere kombinationer vil generere en fejlmeddelelse,
men anmodninger, der har brug for data fra 1000 eller færre kombinationer, vil blive tilladt.
    
Generelt, jo større datasættet, den lavere bør du indstille&lt;maxRequestFraction&gt;. Så du kan indstille det til 1 for et lille datasæt, 0,1 for et mellemstort datasæt, 0,01 for et stort datasæt, og 0.0001 for et stort datasæt.
    
Denne tilgang er langt fra perfekt. Det vil føre til nogle rimelige anmodninger bliver afvist, og nogle for-store anmodninger bliver tilladt. Men det er et vanskeligt problem, og denne løsning er meget bedre end ingenting.
    
#### CassandrasubsetVariables {#cassandra-subsetvariables} 
Som med andre EDDTable datasæt, kan du angive en komma-separat liste over&lt;dataVariable&gt; &gt; &gt; &gt;destinationNames i en global egenskab kaldet "[subsetVariables](#subsetvariables)" for at identificere variabler, der har et begrænset antal værdier. Dataset vil derefter have en .subset webside og vise lister over forskellige værdier for disse variabler i rullelister på mange websider.
    
Inklusive blot partitionsnøgler og statiske kolonner på listen er STRONGLY ENCOUUDED. Cassandra vil være i stand til at generere listen over forskellige kombinationer meget hurtigt og nemt hver gang datasættet er reloaded. En undtagelse er gangetamp partition nøgler, der er grove versioner af nogle andre gangetamp kolonne - det er sandsynligvis bedst at forlade disse ud af listen oversubsetVariablesDa der er et stort antal værdier, og de er ikke meget nyttige for brugere.
    
Hvis du inkluderer ikke-partition nøgle, ikke-statiske variabler på listen, vil det sandsynligvis være **meget meget meget** Betydeligt dyrt for Cassandra hver gang datasættet er genindlæst, fordiERDDAP™skal se gennem hver række af datasættet for at generere oplysningerne. Faktisk er forespørgslen sandsynligvis ikke. Så bortset fra meget små datasæt, dette er STRONGLY DISCOURAGED.
    
#### Cassandra DataTypes{#cassandra-datatypes} 
Fordi der er nogle ambiguity om, som[Cassandra datatyper](https://cassandra.apache.org/doc/latest/cql/types.html)kort til hvilketERDDAP™datatyper, skal du angive en [&lt;DataType&gt;] (#datatype) tag for hver [&lt;dataVariable&gt;] (#datavariable) at fortælleERDDAP™som datatype til brug. StandardERDDAP™Datadata Typer (og de mest almindelige tilsvarende Cassandra datatyper) er:
    
*   [boolean](#boolean-data)  (boolean) , somERDDAP™Så gemmer sig som bytes
* byte (int, hvis serien er -128 til 127) 
* Kort kort kort kort (int, hvis rækkevidden er -32768 til 32767) 
* int (int, tæller?, varint?, hvis rækkevidden er -2147483648 til 2147483647) 
* længe (bigint, tæller?, varint?, hvis rækkevidden er -9223372036854775808 til 9223372036854775) 
* flyder (flyder) 
* Dobbelt dobbelt (Dobbelt, decimal (med mulig tab af præcision) , timetamp) 
* Billeder af char (ascii eller tekst, hvis de aldrig har mere end 1 tegn) 
* streng streng streng (ascii, tekst, varchar, inet, uuid, timeuuid, blob, kort, sæt, liste?) 

Cassandra's[gangetamp](#cassandra-timestamp-data)er en særlig sag: brugERDDAP's dobbelte data Type.

Hvis du angiver en streng dataType iERDDAP™for et Cassandra kort, sæt eller liste, kortet, sæt eller liste på hver Cassandra række vil blive konverteret til en enkelt streng på en enkelt række i rækkenERDDAP™Tabel.ERDDAP™har et alternativt system til lister; se nedenfor.

 *type type type* Lister --ERDDAP[]&lt;DataType&gt;] (#datatype) tag til CassandradataVariables kan inkludere den almindeligeERDDAP™Datadata Typer (Se ovenstående) plus flere særlige datatyper, der kan bruges til Cassandra liste kolonner: booleanList, byteList, ubyte,List, ukortList, intList, uintList, longList, ulongList, flyList, dobbeltList, charList, StringList. Når en af disse listekolonner er i resultaterne bestået tilERDDAP™, hver række kildedata vil blive udvidet til liste. størrelse størrelse størrelse størrelse størrelse størrelse () rækker af data iERDDAP; enkle data Typer (f.eks. int) i denne kildedatarække vil blive duplikeret liste. størrelse størrelse størrelse størrelse størrelse størrelse () tider. Hvis resultaterne indeholder mere end én liste variabel, alle lister på en given række data skal have samme størrelse og SKAL være "parallel" lister, ellerERDDAP™vil generere en fejlmeddelelse. For eksempel til aktuelle målinger fra en ADCP,
dybdedybde\\[0\\], uCurrent\\[0\\], vCurrent\\[0\\], og zCurrent\\[0\\]er alle relateret, og
dybdedybde\\[1 1 1 1\\], uCurrent\\[1 1 1 1\\], vCurrent\\[1 1 1 1\\], og zCurrent\\[1 1 1 1\\]er alle relaterede,...
Alternativt, hvis du ikke ønskerERDDAP™for at udvide en liste til flere rækker i rækkenERDDAP™tabel, angive String som tabellendataVariable's data Type så hele listen repræsenteres som en streng på en række iERDDAP.
    
#### Oplysninger om Cassandra TimeStamp{#cassandra-timestamp-data} 
Cassandras tidsstempeldata er altid klar over tidszoner. Hvis du indtaster timetamp data uden at angive en tidszone, antager Cassandra timettamp den lokale tidszone.
    
ERDDAP™understøtter tidsstempeldata og præsenterer altid dataene i dataeneZulu/GMT tidszone. Så hvis du indtaster timetamp data i Cassandra ved hjælp af en tidszone andet endZulu/GMT, huske, at du har brug for at gøre alle forespørgsler til tidsstempel data iERDDAP™ved hjælp afZulu/GMT tidszone. Så ikke blive overrasket, når de gangetamp værdier, der kommer ud afERDDAPskiftes af flere timer på grund af tidszonekontakten fra lokal tilZulu/GMT tid.

* I nærheden af In In In In In In In In In In In In In InERDDAP'sdatasets.xml, i den&lt;dataVariable&gt; tag til en timetamp variabel, sæt
```
          <dataType>double</dataType>  
```
og i&lt;addAttributes&gt; sæt
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Forslag til: Hvis dataene er et tidsinterval, er det nyttigt at have tidsstempelværdierne henviser til centrum af det underforståede tidsinterval (for eksempel, middag) . Hvis en bruger f.eks. har data til 2010-03-26T1Z fra et andet datasæt, og de ønsker de nærmeste data fra dette Cassandra-datasæt, der har data for hver dag, så dataene for 2010-03-26T12:00Z (repræsenterer Cassandra data for denne dato) er naturligvis det bedste (i modsætning til midnat før eller efter, hvor det er mindre indlysende, som er bedst) .
*   ERDDAP™har et værktøj til[Konverter en Numeric Tid til/fra en streng tid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Se endnu[Sådan kan duERDDAP™Tilbud med Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
#### Integer nuancer{#integer-nulls} 
Cassandra understøtter nulls i Cassandra int (ERDDAP™int) og storint (ERDDAP™længe) kolonner, menERDDAP™Støtter ikke sande tal til nogen form for tekst.
Som standard vil Cassandra iteger nulls blive konverteret iERDDAP™Flyrejser til 2147483647 for int kolonner eller 9223372036854775 for lange kolonner. Disse vises som "NaN" i nogle typer tekst output filer (for eksempel .csv) , "" i andre typer af tekst output filer (for eksempel,.htmlTable) , og det specifikke nummer (2147483647 for manglende værdier) i andre typer af filer (for eksempel, binære filer som.ncog måtte) . En bruger kan søge efter rækker af data med denne type manglende værdi ved at henvise til "NaN", f.eks. "&windSpeed=NaN".
    
Hvis du bruger en anden heltalsværdi til at angive manglende værdier i din Cassandra tabel, skal du identificere den værdi idatasets.xml:

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Til Cass flydendeandra punkt kolonner, vil nulls blive konverteret til NaNs iERDDAP. Til Cassandra datatyper, der er konverteret til strenge iERDDAP™, nulls bliver konverteret til tomme strenge. Det bør ikke være et problem.
    
#### "WARNING: Re-preparing allerede forberedt forespørgsel"{#warning-re-preparing-already-prepared-query} 
* "WARNING: Re-preparing allerede forberedt forespørgsel" i *Tomcat* /logs/catalina.out (eller andre Tomcat logfil)   
Cassandra-dokumentationen siger, at der er problemer, hvis den samme forespørgsel er lavet i en forberedetStatement to gange (eller mere) . (Se dette[fejlrapport](https://datastax-oss.atlassian.net/browse/JAVA-236).) For at undgå at gøre Cassandra gal,ERDDAP™cacher alle forberedede stater, så det kan genbruge dem. Denne cache går tabt, hvis / når Tomcat/ERDDAP™genstartes, men jeg tror, at det er okay, fordi de forberedede stater er forbundet med en given session (mellem mellem mellem mellemJavaog Cassandra) , som også er tabt. Så kan du se disse meddelelser. Jeg kender ingen anden løsning. Heldigvis er det en advarsel, ikke en fejl (selvom Cassandra truer, at det kan føre til præstationsproblemer) .
    
Cassandra hævder, at forberedende stater er gode for evigt, såERDDAP's cached ForbereddStatements bør aldrig blive forældet/ugyldige. Hvis det ikke er sandt, og du får fejl om visse forberededeStatements er forældede/ugyldige, så skal du genstarteERDDAP™at ryddeERDDAP's cache af ForbereddStatements.
    
#### Cassandra Security{#cassandra-security} 
Se endnu[Securing Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html)

Når du arbejder med Cassandra, skal du gøre tingene så sikkert og sikkert som muligt for at undgå at tillade en skadelig bruger at skade din Cassandra eller få adgang til data, de ikke bør have adgang til.ERDDAP™forsøger at gøre tingene på en sikker måde, også.

* Vi opfordrer dig til at opsætteERDDAP™at oprette forbindelse til Cassandra som en Cassandra-bruger, der kun har adgang til den **relevant** bordbord (s s s) og har kun READ privilegier.
* Vi opfordrer dig til at oprette forbindelse fraERDDAP™til Cassandra så det
    * Brug altid SSL,
    * Tillad kun forbindelser fra én IP-adresse (eller en blok af adresser) og fra den eneERDDAP™bruger og bruger
    * Overfør kun adgangskoder i deres MD5 harhed form.
*   \\[I nærheden af KNOWN PROBLEM\\]Forbindelsesproperties (herunder adgangskode&#33;) gemmes som almindelig tekst idatasets.xml. Vi har ikke fundet en måde at tillade administratoren at indtaste Cassandra-adgangskoden underERDDAP's opstart i Tomcat (som opstår uden brugerindgang) , så adgangskoden skal være tilgængelig i en fil. For at gøre dette mere sikkert:
    * Dig (te te te teERDDAP™Administrator) bør være ejeren afdatasets.xmlog har READ og WRITE adgang.
    * Lav en gruppe, der kun indeholder bruger=tomcat. Brug chgrp til at gøre den gruppe tildatasets.xml, med bare READ privilegier.
    * Brug chmod til at tildele o-rwx-rettigheder (Læs eller WRITE adgang til "andre" brugere) for for fordatasets.xml.
* Hvornår i øjeblikketERDDAP™, adgangskode og andre forbindelsesegenskaber gemmes i "private"Javavariabler.
* Anmodninger fra klienter er parsed og kontrolleret for gyldighed, før de genererer CQL anmodninger om Cassandra.
* Anmodninger til Cassandra er lavet med CQL Bound/PreparedStatements, for at forhindre CQL injektion. I alle tilfælde, Cassandra er iboende mindre modtagelige for CQL injektion end traditionelle databaser er at[SQL-indsprøjtning](https://en.wikipedia.org/wiki/SQL_injection).
         
#### Cassandra Speedandra{#cassandra-speed} 
Cassandra kan være hurtig eller langsom. Der er nogle ting du kan gøre for at gøre det hurtigt:
* Generelt -
CQLs natur er, at forespørgsler er[deklarativ](https://en.wikipedia.org/wiki/Declarative_programming). De angiver præcis, hvad brugeren ønsker. De omfatter ikke en specifikation eller hints til, hvordan forespørgslen skal håndteres eller optimeres. Så der er ingen vej tilERDDAP™at generere forespørgslen på en sådan måde, at det hjælper Cassandra med at optimere forespørgslen (eller på nogen måde angive, hvordan forespørgslen skal håndteres) . Generelt er det op til Cassandra-administratoren at sætte tingene op (f.eks. indekser) for at optimere for visse typer forespørgsler.
     
* Angiv de tidsstempel kolonner, der er relateret til grover-præcision timetamp partition nøgler via [&lt;partition partition Klik her for at fjerne KeySourceNames&gt;] (#keypartitionnames) er den vigtigste måde at hjælpeERDDAP™arbejde effektivt med Cassandra. Hvis dette forhold findes i et Cassandra-bord, og du ikke fortællerERDDAP™, datasættet vil være smertefuldt langsom iERDDAP™Brug tonsvis af Cassandra ressourcer.
     
* Angive klyngekolonnerne via [&lt;Kolonprinsessenavne&gt;] (#clustercolumnsourcenavne) er den anden vigtigste måde at hjælpeERDDAP™arbejde effektivt med Cassandra. Hvis der er klyngekolonner, og du ikke fortællerERDDAP, en stor del af de mulige forespørgsler til data vil være nålesly, smertefuldt langsom iERDDAP™Brug tonsvis af Cassandra ressourcer.
     
* Lav makeup[Indexer](https://cassandra.apache.org/doc/latest/cql/indexes.html)for fælles forbrugsstoffer --
Du kan fremskynde et par forespørgsler ved at oprette indekser til Cassandra kolonner, der ofte er omfattet af "reserve begrænsninger.
    
Cassandra kan ikke lave indekser til liste, sæt eller kort kolonner.
    
* Angiv indekskolonnerne via [&lt;Indeksekontekster&gt;] (#indexcolumnsourcenavne) er en vigtig måde at hjælpeERDDAP™arbejde effektivt med Cassandra. Hvis der er indekskolonner, og du ikke fortællerERDDAP, nogle forespørgsler til data vil være nålesly, smertefuldt langsom iERDDAP™Brug tonsvis af Cassandra ressourcer.
     
#### Cassandra statistik{#cassandra-stats} 
*   ["Cassandra statistik" Diagnosmeddelelser](#cassandra-stats)-- Til alleERDDAP™Brugerforespørgsel til et Cassandra-datasæt,ERDDAP™udskriver en linje i logfilen, *bigParentDirectory* /logs/log.txt, med nogle statistikker relateret til forespørgslen, for eksempel
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Ved hjælp af tallene i eksemplet ovenfor betyder det:

* Hvornår Hvornår skal man HvornårERDDAP™sidst (gen igen) indlæst denne datasæt, Cassandra fortalteERDDAP™at der var 10000 forskellige kombinationer af partitionsnøgler.ERDDAP™cached alle de forskellige kombinationer i en fil.
* Grundet brugerens begrænsninger,ERDDAP™identificerede 2 kombinationer ud af 10000, der kunne have de ønskede data. Så,ERDDAP™vil foretage 2 opkald til Cassandra, en for hver kombination af partitionsnøgler. (Det er hvad Cassandra kræver.) Det er klart besværlig, hvis et stort datasæt har et stort antal kombinationer af partitionsnøgler og en given anmodning ikke drastisk reducerer det. Du kan kræve, at hver anmodning reducerer nøglerummet ved at indstille [&lt;maxRequestFraction&gt;] (#maks.) . Her, 2/10000=2e-4, som er mindre end maxRequestFraktion (0,1 0,1) , så anmodningen blev tilladt.
* Efter at have anvendt begrænsningerne på partitionsnøglerne,[klynge kolonner](#clustercolumnsourcenames), og[Indeks kolonner](#indexcolumnsourcenames)som blev sendt afERDDAP™, Cassandra returnerede 1200 rækker data tilERDDAP™i resultatSet.
* Resultatet Sæt skal have haft[Datadata Type= *nogle typer* Liste](#cassandra-datatypes)kolonner kolonner (med et gennemsnit på 10 varer pr. liste) , fordiERDDAP™udvidet de 1200 rækker fra Cassandra til 12000 rækker iERDDAP.
*   ERDDAP™gælder altid alle brugerens begrænsninger for dataene fra Cassandra. I dette tilfælde, begrænsninger, som Cassandra ikke havde håndteret reduceret antallet af rækker til 7405. Det er antallet af rækker sendt til brugeren.

Den vigtigste brug af disse diagnostiske meddelelser er at sikre, atERDDAP™gør, hvad du tror, det gør. Hvis det ikke er (For eksempel er det ikke at reducere antallet af forskellige kombinationer som forventet?) , så kan du bruge oplysningerne til at prøve at finde ud af, hvad der foregår forkert.
 
* Forskning og eksperiment for at finde og sætte bedre [&lt;LinkProperty&gt;] (#cassandra-connectionproperty) 's.
 
* Kontroller hastigheden af netværksforbindelsen mellem Cassandra ogERDDAP. Hvis forbindelsen er langsom, kan du se, om du kan forbedre den. Den bedste situation er, nårERDDAP™kører på en server tilknyttet samme (hurtigt) skifte som serveren, der kører Cassandra node, som du forbinder.
 
* Vær venligst tålmodig. Læs oplysningerne her og i Cassandra-dokumentationen omhyggeligt. Eksperiment. Tjek dit arbejde. Hvis Cassandra-ERDDAP™forbindelsen er stadig langsommere, end du forventer, skal du inkludere din Cassandra bords schema og dinERDDAP™klump afdatasets.xmlog se vores[sektion om at få ekstra støtte](/docs/intro#support).
 
* Hvis alt andet fejler,
Overvej at gemme dataene i en samling afNetCDFv3.ncfiler filer filer (specielt specielt.ncfiler, der bruger de[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array datastrukturer og så kan håndteres medERDDAP's[EDDTableFraNcCFFiles](#eddtablefromnccffiles)) . Hvis de er logisk organiseret (hver med data til en smule plads og tid) ,ERDDAP™kan udtrække data fra dem meget hurtigt.
         
#### EDDTableFraCassandra skelet XML{#eddtablefromcassandra-skeleton-xml} 
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

### EDDTableFraDapSequence{#eddtablefromdapsequence} 
[ **EDDTableFraDapSequence** ](#eddtablefromdapsequence)håndterer variabler inden for 1- og 2-niveausekvenser fra[DAP](https://www.opendap.org/)servere såsomDAPPER (var på https://www.pmel.noaa.gov/epic/software/dapper/ , nu ophørt) .

* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det. Du kan indsamle de oplysninger, du har brug for ved at se på kildedatasættets DDS- og DAS-filer i din browser (ved at tilføje .das og .dds til kildedatasættets DDS- og DAS-filer i din browser (ved at tilføje .das og .dds til kildedatasættets DDS- og DAS-filer i din browser)sourceUrl(en eksempel var på https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* En variabel er i enDAPsekvensen, hvis .dds svar indikerer, at datastrukturen holder variablen er en "sequence" (Tilfælde i følsom) .
* I nogle tilfælde vil du se en sekvens inden for en sekvens, en 2-niveau sekvens -- EDDTableFraDapSequence håndterer også disse.
#### EDDTableFraDapSequence skelet XML XML{#eddtablefromdapsequence-skeleton-xml} 
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
[ **EDDTableFraDatabase** ](#eddtablefromdatabase)håndterer data fra en relationel databasetabel eller[Udsigt til udsigt](https://en.wikipedia.org/wiki/View_(database)).

#### En tabel eller visning{#one-table-or-view} 
Hvis de data, du ønsker at tjene, er i to eller flere tabeller (og dermed har brug for en JOIN til at udtrække data fra begge tabeller på én gang) , du skal gøre en[denormaliseret](https://en.wikipedia.org/wiki/Denormalization)  (I forvejen) bord eller bord[Udsigt til udsigt](https://en.wikipedia.org/wiki/View_(SQL)) med alle de data, du ønsker at gøre tilgængelige som et datasæt iERDDAP.

For store, komplekse databaser, kan det give mening at adskille flere chunks som denormaliserede tabeller, hver med en anden type data, som vil blive separate datasæt iERDDAP.

Gør et denormaliseret bord til brug iERDDAP™kan lyde som en vanvittig idé til dig. Vær venlig at stole på os. Der er flere grunde til hvorforERDDAP™arbejder med denormaliserede tabeller:

* Det er meget nemmere for brugerne.
Hvornår Hvornår skal man HvornårERDDAP™præsenterer datasættet som en, enkel, denormaliseret, enkelt tabel, er det meget nemt for alle at forstå dataene. De fleste brugere har aldrig hørt om normaliserede tabeller, og meget få forstår nøgler, udenlandske nøgler eller tabel joinforbindelser, og de ved næsten bestemt ikke detaljerne i de forskellige typer af joinforbindelser, eller hvordan man specificerer SQL for at gøre en joinforbindelse (eller flere joinforbindelser) korrekt. Ved hjælp af en denormaliseret tabel undgår alle disse problemer. Denne grund berettiger alene brugen af et denormaliseret enkeltbord til præsentationen af et datasæt tilERDDAP™Brugere.
     
* Normaliserede tabeller (flere tabeller relateret af nøglekolonner) er fantastisk til opbevaring af data i en database.
Men selv i SQL, det resultat, der returneres til brugeren, er en denormaliseret (blev medlem) Enkeltbord. Så det synes rimeligt at præsentere datasættet for brugere som en enorm, denormaliseret, enkelt tabel, hvorfra de derefter kan anmode subsets (f.eks. viser mig rækker af bordet, hvor temperaturen&gt; 30) .
     
* Du kan foretage ændringerERDDAP™uden at ændre dine tabeller.
    ERDDAP™har et par krav, der kan være forskellige fra, hvordan du har konfigureret din database.
For eksempel,ERDDAP™kræver, at tidsstempeldata gemmes i 'timestamp med tidszone' felter.
Ved at lave et separat bord/view forERDDAP™, du kan foretage disse ændringer, når du foretager den denormaliserede tabel forERDDAP. Således behøver du ikke foretage ændringer i dine tabeller.
     
*   ERDDAP™vil genskabe nogle af strukturen af de normaliserede tabeller.
Du kan angive, hvilke kolonner af data kommer fra tabellerne "outer" og derfor har et begrænset antal forskellige værdier.ERDDAP™vil indsamle alle de forskellige kombinationer af værdier i disse kolonner og præsentere dem for brugere på en speciel . subset webside, der hjælper brugerne hurtigt med at vælge undersæt af datasættet. De forskellige værdier for hver kolonne vises også i rullelisten på datasættets andre websider.
     
* En denormaliseret tabel gør dataene fra dig til denERDDAPadministrator nemt.
Du er eksperten for denne datasæt, så det giver mening, at du træffer beslutninger om, hvilke tabeller og hvilke kolonner der skal deltage, og hvordan du tilmelder dem. Så du behøver ikke at aflevere os (eller værre, slutbrugerne) flere tabeller og detaljerede instruktioner til, hvordan du deltager dem, skal du bare give os adgang til det denormaliserede bord.
     
* En denormaliseret tabel giver mulighed for effektiv adgang til dataene.
Den denormaliserede form er normalt hurtigere at få adgang til end den normaliserede form. Deltager kan være langsom. Flere joinforbindelser kan være meget langsom.
     

For at få dataene fra to eller flere tabeller i databasen tilERDDAP™, der er tre muligheder:
 

* Anbefalet mulighed:
Du kan oprette en komma- eller tab-spareret-værdifil med data fra den denormaliserede tabel.
Hvis datasættet er enorm, så giver det mening at skabe flere filer, hver med en sammenhængende delsæt af den denormaliserede tabel (f.eks. data fra et mindre tidsinterval) .
    
Den store fordel her er, atERDDAP™vil kunne håndtere brugeranmodninger for data uden yderligere indsats fra din database. SåERDDAP™vil ikke være en byrde på din database eller en sikkerhedsrisiko. Dette er den bedste mulighed under næsten alle omstændigheder, fordiERDDAP™kan normalt få data fra filer hurtigere end fra en database (hvis vi konverterer .csv-filer til.ncCF-filer) . (En del af grunden er, atERDDAP+files er et read-only system og behøver ikke at beskæftige sig med at foretage ændringer, mens du giver[ACID](https://en.wikipedia.org/wiki/ACID)  (Atomitet, Bevidsthed, Isolation, Durability) .) Desuden behøver du sandsynligvis ikke en separat server, da vi kan gemme dataene på en af vores RAID'er og få adgang til dem med en eksisterende eksisterende serverERDDAP™på en eksisterende server.
    
* Okay Option:
Du opsætter en ny database på en anden computer med blot den denormaliserede tabel.
Da databasen kan være en gratis og open source database som MariaDB, MySQL og PostgreSQL, koster denne mulighed ikke meget.
    
Den store fordel her er, atERDDAP™vil kunne håndtere brugeranmodninger for data uden yderligere indsats fra din nuværende database. SåERDDAP™Må ikke være en byrde på din nuværende database. Dette eliminerer også en masse sikkerhedsmæssige bekymringer sidenERDDAP™Har ikke adgang til din nuværende database.
    
* Nedsat Option:
Vi kan oprette forbindelseERDDAP™til din nuværende database.
For at gøre dette, skal du:
    
    * Opret en separat tabel eller se med den denormaliserede tabel af data.
    * Opret en "erddap" bruger, der har read-only adgang til kun den denormaliserede tabel (s s s) .
         
    
Dette er en mulighed, hvis dataene ændrer meget ofte, og du ønsker at giveERDDAP™Brugere øjeblikkelig adgang til disse ændringer; men selv så kan det give mening at bruge filindstillingen ovenfor og periodisk (hver 30 minutter?) erstatte den fil, der har dagens data.
De store ulemper ved denne tilgang er, atERDDAP™brugeranmodninger vil sandsynligvis placere en uudholdelig stor byrde på din database, og atERDDAP™forbindelse er en sikkerhedsrisiko (selvom vi kan minimere risikoen) .

Gør den denormaliserede tabel eller visning forERDDAP™er en god mulighed for at foretage et par ændringer, derERDDAP™behov, på en måde, der ikke påvirker dine originale tabeller:

* Ændre dato og tidsstempelfelter/kolonner for at bruge datatypen, som Postgres kalder[timetamp med tidszone](#database-date-time-data)  (eller tilsvarende i databasen) .
Timetamps uden tidszone information virker ikke korrekt iERDDAP.
* Gør indekser til de kolonner, som brugerne ofte søger.
* Vær meget opmærksom på[tilfælde af felt/kolonnenavne](#quotes-for-names-and-case-sensitivity)  (Brug f.eks. alle undermapper) når du skriver dem.
* Brug ikke reserverede ord til tabellen og for felt/kolonnenavne.

Hvis du har brug for hjælp til at lave den denormaliserede tabel eller se, bedes du kontakte din databaseadministrator.
Hvis du ønsker at tale om denne helt tilgang eller stratze, hvordan du bedst kan gøre det, bedes du kontakte Chris. John på noaa.gov .
    
#### database i databasedatasets.xml {#database-in-datasetsxml} 
Det er svært at skabe den korrektedatasets.xmlOplysninger, der er nødvendige forERDDAP™at oprette en forbindelse til databasen. Vær tålmodig. Vær metodologi.
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
        
GenererDatasets Xml har tre særlige muligheder for EDDTableFraDatabase:
1. Hvis du indtaster "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (uden tilbud) for katalognavnet, programmet vil vise en liste over katalognavne.
2. Hvis du indtaster "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (uden tilbud) for schema navnet, programmet vil vise en liste over schema navne.
3. Hvis du indtaster "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (uden tilbud) for tabelnavnet, programmet vil vise en liste over tabeller og deres kolonner. Den første "&#33;&#33;&#33;LIST&#33;&#33;&#33;" post, som du laver er den, der vil blive brugt.
* Læs omhyggeligt alle disse dokumenters oplysninger om EDDTableFraDatabase.
* Du kan indsamle de oplysninger, du har brug for til at oprette XML til en EDDTableFraDatabase datasæt ved at kontakte databaseadministratoren og ved at søge på internettet.
* Selvom databaser ofte behandler kolonnenavne og tabelnavne i en tilfælde-tilfølsom måde, er de tilfældefølsomme iERDDAP. Så hvis en fejlmeddelelse fra databasen siger, at et kolonnenavn er ukendt (for eksempel "Ukendt identifikator= '' *kolonne\\_name* "") selvom du kender det eksisterer, prøv at bruge alle hovedstæder, for eksempel, *I nærheden af COLUMN\\_NAME* , som ofte er den sande, tilfældefølsomme version af kolonnenavnet.
* Arbejd tæt sammen med databaseadministratoren, der kan have relevant erfaring. Hvis datasættet ikke indlæses, skal du læse datasættet[fejlmeddelelse](#troubleshooting-tips)nøje for at finde ud af hvorfor.
         
#### JDBC driver{#jdbc-driver} 
* [JDBC driver og&lt;Køretøj&gt;] (#jdbc-driver) -- Du skal få den relevante JDBC 3 eller JDBC 4 driver .jar fil for din database og
Sæt det i *Tomcat* /webapps/erddap/WEB-INF/lib efter installationERDDAP. Så i din kropdatasets.xmlfor denne datasæt, skal du angive den&lt;Drivernavn&gt; for denne driver, som er (desværre desværre) forskellige fra filnavnet. Søg på internettet for JDBC driver til din database og den drivernavn, derJavaskal bruge det.
    
    * For MariaDB, prøv[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
The The The The The The The&lt;Drivernavn&gt; at bruge idatasets.xml  (se nedenfor) er sandsynligvis org.mariadb.jdbc. Driver .
    * For MySQL og Amazon RDS, prøv[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
The The The The The The The&lt;Drivernavn&gt; at bruge idatasets.xml  (se nedenfor) er sandsynligvis com.mysql.jdbc. Driver .
    * For For For For ForOracle, prøv[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).
The The The The The The The&lt;Drivernavn&gt; at bruge idatasets.xml  (se nedenfor) er sandsynligvis oracle.jdbc.driver.OracleDriver .
    * For Postgresql, vi fik JDBC 4 driver fra[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
The The The The The The The&lt;Drivernavn&gt; at bruge idatasets.xml  (se nedenfor) er sandsynligvis org.postgresql. Driver .
    * Til SQL Server, kan du få JTDS JDBC driver fra[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net).
The The The The The The The&lt;Drivernavn&gt; at bruge idatasets.xml  (se nedenfor) er sandsynligvis net.sourceforge.jtds.jdbc. Driver .
    
Efter du har lagt JDBC driver .jar iERDDAP™lib-mappen, skal du tilføje en henvisning til den .jar fil i .bat og / eller .sh script filer til GenererDatasets Xml, DasDds og ArchiveADataset, som er i den *Tomcat* /webapps/erddap/WEB-INF / mappe; ellers får du en ClassNotFoundException, når du kører disse scripts.
    
Desværre er JDBC undertiden kilden til problemer. I sin rolle som mellemmand mellemERDDAP™og databasen gør det nogle gange subtile ændringer i standard/generisk database SQL-forespørgsel, atERDDAP™skabe og dermed forårsage problemer (f.eks. relateret til[Over-/sænke identifikatorer](#quotes-for-names-and-case-sensitivity)og relateret til[dato / tidszoner](#database-date-time-data)) . Vær tålmodig, læs oplysningerne her omhyggeligt, tjek dit arbejde, og se vores[sektion om at få ekstra støtte](/docs/intro#support).
    
#### Databasedatabase&lt;Tilslutningstilslutning Ejendom&gt;{#database-connectionproperty} 
* [ []&lt;LinkProperty&gt;] (#database-connectionproperty) -- In te In te In te In tedatasets.xmlfor dit datasæt, skal du definere flere forbindelse Ejendomstags til at fortælleERDDAP™Sådan opretter du forbindelse til din database (for eksempel at angive brugernavn, adgangskode, ssl forbindelse og[Hent størrelse](#set-the-fetch-size)) . Disse er forskellige for enhver situation og er lidt svært at finde ud af. Søg på internettet for eksempler på at bruge en JDBC driver til at oprette forbindelse til din database. The The The The The The The&lt;TilslutningProperty&gt; navne (for eksempel "bruger", "password", og "ssl") , og nogle af forbindelsenProperty værdier kan findes ved at søge på nettet for "JDBC forbindelsesegenskaber *databasedatabase Type Type Type Type* " " " " (for eksempel,Oracle, MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Citater til navne og sag Sensitivitet{#quotes-for-names-and-case-sensitivity} 
*   [Citater til Field/Kolonnenavne; Case Sensitivitet](#quotes-for-names-and-case-sensitivity)- Som standard sætter EDDTableFraDatabase ANSI-SQL-standard double citerer omkring felt/kolonnenavne i SELECT- udsagn, hvis du har brugt et reserveret ord som et felt/kolonnenavn, eller en særlig figur i et felt/columnnavn. De dobbelte citater thwart visse typer af SQL injektion angreb. Du kan fortælleERDDAP™at bruge "," eller ingen tilbud via&lt;kolonnenavnQuotes&gt; i in in in indatasets.xmlfor denne datasæt.
    
For mange databaser, ved hjælp af enhver form for citater forårsager databasen til at arbejde med felt/kolonnenavne i en tilfælde følsom måde (i stedet for standard database tilfælde på følsomme måde) . Databaser viser ofte fil/kolonnenavne som alle over-case, når i virkeligheden er den følsomme form anderledes. I nærheden af In In In In In In In In In In In In In InERDDAP™, venligst altid behandle database kolonnenavne som tilfælde følsomme.
    
    * For Maria DB, skal du køre databasen med[\\-sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/).
    * For MySQL og Amazon RDS, skal du køre databasen med[\\-sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes).
    *   Oracleunderstøtter ANSI-SQL-standard dobbelt tilbud[som standard](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    * PostgreSQL understøtter ANSI-SQL-standard dobbelt tilbud som standard.
    
      
Brug ikke et reserveret ord til en database, katalog, schema eller tabels navn.ERDDAP™Angiv ikke citater omkring dem.
    
Hvis det er muligt, skal du bruge alle undermapper til database, katalog, skema, tabelnavne og feltnavne, når du opretter databasetabellen (eller visning) og når de henviser til felt/kolonnenavnene idatasets.xmli in in in inERDDAP. Ellers kan du få en fejlmeddelelse, der siger databasen, kataloget, schema, tabel og/eller felt, ikke fundet. Hvis du får denne fejlmeddelelse, skal du prøve at bruge den sagfølsomme version, den all-case version og den alle lavere version af navnet iERDDAP. En af dem kan arbejde. Hvis ikke, skal du ændre navnet på database, katalog, skema og/eller tabel til alle undermapper.
    
#### Databasedatabase&lt;Datadata Type&gt;{#database-datatype} 
*   [Databasedatabase](#database-datatype)[ []&lt;DataType&gt;] (#datatype) Tags -- Fordi der er nogle ambiguity om, som[databasedatatyper](https://www.w3schools.com/sql/sql_datatypes_general.asp)kort til hvilketERDDAP™datatyper, skal du angive en [&lt;DataType&gt;] (#datatype) tag for hver [&lt;dataVariable&gt;] (#datavariable) at fortælleERDDAP™som datatype til brug. En del af problemet er, at forskellige datasæt bruger forskellige vilkår for de forskellige datatyper - så altid forsøger at matche definitionerne, ikke bare navnene. Se beskrivelsen af beskrivelsen af beskrivelsen[standard standard standardERDDAP™Datadata Typer](#data-types), som indeholder henvisninger til de tilsvarende SQL-datatyper.[Dato og tidsstempel](#database-date-time-data)er særlige tilfælde: brugERDDAP's dobbelte data Type.
     
#### Database Dato for data{#database-date-time-data} 
Nogle databasedatoskolonner har ingen eksplicit tidszone. Sådanne kolonner er problemer forERDDAP. Databaser understøtter konceptet med en dato (med eller uden en tid) uden en tidszone, som en omtrentlige vifte af tid. Men men men men menJava  (og dermedERDDAP) kun handler med øjeblikkelige dato+tid med en tidszone. Så du kan vide, at de datotidsdata er baseret på en lokal tidszone (med eller uden dagslysbesparelsestid) eller GMT/Zulutidszone, menJava  (og og ogERDDAP) Ikke. Vi troede oprindeligt, vi kunne arbejde omkring dette problem (f.eks. ved at angive en tidszone for kolonnen) , men databasen+JDBC+Javainteraktioner gjorde dette til en upålidelig løsning.
* Så,ERDDAP™kræver, at du gemmer alle dato- og datodata i databasetabellen med en databasedatatype, der svarer til JDBC-typen "timestamp med tidszone" (ideelt, der bruger GMT/Zulutidszone) .
* I nærheden af In In In In In In In In In In In In In InERDDAP'sdatasets.xml, i den&lt;dataVariable&gt; tag til en timetamp variabel, sæt
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

og i&lt;addAttributes&gt; sæt
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Forslag til: Hvis dataene er et tidsinterval, er det nyttigt at have tidsstempelværdierne henviser til centrum af det underforståede tidsinterval (for eksempel, middag) . Hvis en bruger f.eks. har data til 2010-03-26T1Z fra et andet datasæt, og de ønsker de nærmeste data fra et databasedatasæt, der har data for hver dag, så databasedataene for 2010-03-26T11:00Z (repræsenterer data for denne dato) er naturligvis det bedste (i modsætning til midnat før eller efter, hvor det er mindre indlysende, som er bedst) .
*   ERDDAP™har et værktøj til[Konverter en Numeric Tid til/fra en streng tid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Se endnu[Sådan kan duERDDAPTilbud med Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
       
#### Integer nuancer{#integer-nulls-1} 
Databaser understøtter tal (int, lilleint, lilleint) kolonner, menERDDAP™understøtter ikke ægte nulls.
Databasemøtrikker vil blive konverteret iERDDAP™127 for byte kolonner, 255 for ubyte kolonner, 32767 for korte kolonner, 65535 for ukortede kolonner, 2147483647 for int kolonner, 4294967295 for uint kolonner, 9,223,372,036,854,775,807 for lange kolonner eller 18446744073709551 for ulong kolonner. Hvis du bruger disse standarder, skal du identificere demmissing\\_values til datasættets brugere iERDDAP™med med

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

eller eller eller

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Alternativt kan du bruge "missing\\_value" attribut i stedet for "\\_FillValue".
GenererDatasets Xml tilføjer automatisk disse \\_FillValue attributter, når det genererer den foreslåededatasets.xmlfor databasedatasæt.

Til database flydende punktkolonner bliver muslinger konverteret til NaNs iERDDAP.
Til databasedatatyper, der er konverteret til strenge iERDDAP™, nulls bliver konverteret til tomme strenge.
    
#### Databasesikkerhed{#database-security} 
* Når du arbejder med databaser, skal du gøre tingene så sikkert og sikkert som muligt for at undgå at tillade en skadelig bruger at skade din database eller få adgang til data, de ikke bør have adgang til.ERDDAP™forsøger at gøre tingene på en sikker måde, også.
    * Overvej at kopiere, på en anden computer, database og database tabeller med de data, du ønskerERDDAP™at tjene. (Ja, til kommercielle databaser somOracle, dette indebærer yderligere licensgebyrer. Men for open source databaser, som PostgreSQL, MySQL, Amazon RDS og MariaDB, koster dette intet.) Dette giver dig et højt sikkerhedsniveau og forhindrer ogsåERDDAP™anmodninger fra at sænke den oprindelige database.
    * Vi opfordrer dig til at opsætteERDDAP™at oprette forbindelse til databasen som en databasebruger, der kun har adgang til databasen **relevant** databasedatabase (s s s) og har kun READ privilegier.
    * Vi opfordrer dig til at oprette forbindelse fraERDDAP™til databasen, så det
        * Brug altid SSL,
        * Tillad kun forbindelser fra én IP-adresse (eller en blok af adresser) og fra den eneERDDAP™bruger og bruger
        * Overfør kun adgangskoder i deres MD5 harhed form.
    *   \\[I nærheden af KNOWN PROBLEM\\]Forbindelsesproperties (herunder adgangskode&#33;) gemmes som almindelig tekst idatasets.xml. Vi har ikke fundet en måde at tillade administratoren at indtaste databaseadgangskoden underERDDAP's opstart i Tomcat (som opstår uden brugerindgang) , så adgangskoden skal være tilgængelig i en fil. For at gøre dette mere sikkert:
        * Dig (te te te teERDDAP™Administrator) bør være ejeren afdatasets.xmlog har READ og WRITE adgang.
        * Lav en gruppe, der kun indeholder bruger=tomcat. Brug chgrp til at gøre den gruppe tildatasets.xml, med bare READ privilegier.
        * Brug chmod til at tildele o-rwx-rettigheder (Læs eller WRITE adgang til "andre" brugere) for for fordatasets.xml.
    * Hvornår i øjeblikketERDDAP™, adgangskode og andre forbindelsesegenskaber gemmes i "private"Javavariabler.
    * Anmodninger fra klienter er parsed og kontrolleret for gyldighed, før de genererer SQL-anmodninger til databasen.
    * Anmodninger til databasen er lavet med SQL ForbereddStatements, for at forhindre[SQL-indsprøjtning](https://en.wikipedia.org/wiki/SQL_injection).
    * Anmodninger til databasen indsendes med udførelse Forespørgsel (ikke at udføreStatement) for at begrænse anmodninger til at læse kun (så forsøgt SQL-indsprøjtning til at ændre databasen vil undlade af denne grund, også) .
         
#### SQL SQL SQL{#sql} 
* Fordi fordiOPeNDAP's tabulære data anmodninger blev designet til at efterligne SQL-tabular data anmodninger, det er nemt atERDDAP™til at konvertere tabulære data anmodninger til enkle SQL ForbereddStatements. For eksempel,ERDDAP™anmodning
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
vil blive konverteret til SQL ForbereddStatementment
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™anmodninger med &distinct () og/ellerorderBy ( *variabler* ) vil tilføje DISTINCT og/eller ORDER BY *variabler* til SQL udarbejdet erklæring. Generelt vil dette i høj grad bremse reaktionen fra databasen.
ERDDAP™log ind på den forberededeStatement i[log.txt](/docs/server-admin/additional-information#log)som
```
    statement=*thePreparedStatement*  
```
Dette vil være en tekst repræsentation af ForbereddStatement, som kan være lidt anderledes end den egentlige forberededeStatement. For eksempel er tiden kodet på en særlig måde. Men i tekst repræsentationen vises de som ISO 8601 dato tider.
     
#### Databasehastighed{#database-speed} 
* Databaser kan være langsom. Der er nogle ting du kan gøre:
    * Generelt -
Den karakter af SQL er, at forespørgsler er[deklarativ](https://en.wikipedia.org/wiki/Declarative_programming). De angiver præcis, hvad brugeren ønsker. De omfatter ikke en specifikation eller hints til, hvordan forespørgslen skal håndteres eller optimeres. Så der er ingen vej tilERDDAP™at generere forespørgslen på en sådan måde, at den hjælper databasen med at optimere forespørgslen (eller på nogen måde angive, hvordan forespørgslen skal håndteres) . Generelt er det op til databaseadministratoren at opsætte tingene (f.eks. indekser) for at optimere for visse typer forespørgsler.
##### Sæt Fetch Størrelse{#set-the-fetch-size} 
Databaser returnerer dataene tilERDDAP™i bidder. Som standard returnerer forskellige databaser et andet antal rækker i bidderne. Ofte er dette nummer meget lille og så meget ineffektiv. For eksempel standarden forOracleer 10&#33; Læs JDBC-dokumentationen for din databases JDBC-driver for at finde den forbindelsesejendom til at angive for at øge dette og tilføje dette til datasættets beskrivelse idatasets.xml. For eksempel,
Til MySQL og Amazon RDS, brug
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
For MariaDB, er der i øjeblikket ingen måde at ændre hente størrelse. Men det er en ønsket funktion, så søg på nettet for at se, om dette er blevet implementeret.
For For For For ForOracle, brug
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Til PostgreSQL, brug
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
men føler sig fri til at ændre nummeret. Indstilling af nummeret for stor vil forårsageERDDAP™at bruge masser af hukommelse og være mere sandsynligt at køre ud af hukommelse.
#### ConnectionProperties{#connectionproperties} 
Hver database har andre forbindelsesegenskaber, som kan specificeres idatasets.xml. Mange af disse vil påvirke effektiviteten af databasen tilERDDAP™tilslutning. Læs dokumentationen for din databases JDBC driver for at se mulighederne. Hvis du finder forbindelsesegenskaber, der er nyttige, bedes du sende en e-mail med detaljerne tilerd dot data at noaa dot gov.
* Lav en tabel --
Du vil sandsynligvis få hurtigere svar, hvis du periodisk (hverdag? når der er nye data?) generere en egentlig tabel (lignende til, hvordan du har genereret VIEW) og fortælERDDAP™at få data fra tabellen i stedet for VIEW. Da enhver anmodning til bordet kan opfyldes uden at hæve en anden tabel, vil svaret være meget hurtigere.
* Vakuum tabellen -
MySQL og Amazon RDS vil reagere meget hurtigere, hvis du bruger[OPTIMIZE TABLE](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).
Maria Maria Maria DB vil reagere meget hurtigere, hvis du bruger[OPTIMIZE TABLE](https://mariadb.com/kb/en/optimize-table/).
PostgreSQL vil reagere meget hurtigere, hvis du[VACUUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)tabellen.
    OracleHar ikke eller har brug for en analog kommando.
* Lav makeup[Indexer](https://en.wikipedia.org/wiki/Database_index)for fælles forbrugsstoffer --
Du kan fremskynde mange / største forespørgsler ved at oprette indekser i databasen for variablerne (hvilke databaser kalder "columns") det er ofte optaget i brugerens forespørgsel. Generelt er disse de samme variabler angivet af [&lt;subsetVariables&gt;] (#subsetvariables) og/eller breddegrad, længde og tidsvariabler.
##### Brug forbindelse Pooling{#use-connection-pooling} 
Normalt,ERDDAP™gør en separat forbindelse til databasen for hver anmodning. Dette er den mest pålidelige tilgang. Det hurtigere alternativ er at bruge en DataSource, der understøtter forbindelsespooling. Hvis du vil konfigurere den, skal du angive (for eksempel)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
lige ved siden af&lt;sourceUrl&gt;,&lt;Drivernavn&gt;, og&lt;Tilslutningstilslutning Ejendom&gt;.
Og i *Tomcat* /conf/context.xml, definere en ressource med de samme oplysninger, f.eks.
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Generelle oplysninger om brug af en DataSource er på[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).
Se endnu[Oplysninger om Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)og og og[Tomcat DataSource eksempler](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)eller søg på nettet for eksempler på brug af DataSources med andre applikationsservere.
* Hvis alt andet fejler,
Overvej at gemme dataene i en samling afNetCDFv3.ncfiler filer filer (specielt specielt.ncfiler, der bruger de[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array datastrukturer og så kan håndteres medERDDAP's[EDDTableFraNcCFFiles](#eddtablefromnccffiles)) . Hvis de er logisk organiseret (hver med data til en smule plads og tid) ,ERDDAP™kan udtrække data fra dem meget hurtigt.
         
#### EDDTableFraDatabase skelet XML XML{#eddtablefromdatabase-skeleton-xml} 
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
[ **EDDTableFraEDDGrid** ](#eddtablefromeddgrid)lader dig oprette et EDDTable datasæt fra enhverEDDGridDatasæt.

* Nogle almindelige årsager til at gøre dette er:
    * Dette gør det muligt for datasættet at blive queried medOPeNDAPudvælgelsesbegrænsninger, som er en type "query efter værdi" (som en bruger kan have anmodet) .
    * Datasættet er iboende et tabulært datasæt.
* Værdien af den globale attribut "maxAxis0" (normalt af type voyeurint") , (Standarden er 10) vil blive brugt til at begrænse antallet af akse\\[0\\]  (normalt"time"akse) Værdierne af de lukkedeEDDGriddatasæt, der kan tilgås pr. anmodning om data. Hvis du ikke ønsker, at der skal være nogen grænse, skal du angive en værdi på 0. Denne indstilling er vigtig, fordi det ellers ville være for nemt for en bruger at spørge EDDTableFraEDDGridat se gennem alle de gitterded datasæts data. Det ville tage lang tid og ville næsten helt sikkert undlade med en timeout fejl. Dette er den indstilling, der gør det sikker at have EDDTableFraEDDGridDatasæt i dine dataERDDAPuden frygt for, at de vil føre til en urimelig brug af computer ressourcer.
* Hvis den er lukketEDDGrider en[EDDGridFraErddap](#eddfromerddap)ogERDDAP™er det sammeERDDAP, så EDDTableFraEDDGridvil altid bruge den aktuelt tilgængelige version af den refererede datasæt direkte. Dette er en meget effektiv måde for EDDTableFraEDDGridfor at få adgang til de gitterede data.
* Denne klasses [&lt;reload Alle rettigheder&gt;] (#loadeveryn minutter) er hvad der tæller. Den lukkedeEDDGrid's&lt;reloadEveryNMinutes&gt; ignoreres.
* Hvis en værdi for [&lt;OpdaterEveryNMillis&gt;] (#updateeverynmillis) leveres til dette datasæt, det ignoreres. Den lukkedeEDDGrid's&lt;opdateringEveryNMillis&gt; er det, der betyder noget.
*   [GenererDatasetsXml](#generatedatasetsxml)har mulighed for datasæt type=EDDTableFraEDDGridsom anmoder om en URL-adresseERDDAP  (normalt den sammeERDDAP)   (Afslut i "/erddap/") og et almindeligt udtryk. GenererDatasets Xml vil derefter generere XML til en EDDTableFraEDDGriddatasæt for hvert gitterded datasæt iERDDAP™som har endatasetIDsom matcher det regulære udtryk (Brug .\\* for at matche alledatasetIDs til gitterede datasæt) .
    
Den klump af XML, der genereres af GenererDatasetsXml for hver datasæt indeholder:
    
    * A A A A A AdatasetIDsom er detEDDGrid'sdatasetIDplus "\\_AsATable".
    * En ny sammenfattende global egenskab, der er denEDDGrid's oversigt plus et nyt første afsnit, der beskriver, hvad dette datasæt er.
    * En ny titel global attribut, som er denEDDGrid's titel plus ", (Som en tabel) ".
    * En ny maxAxis0 global attribut med en værdi på 10.
#### EDDTableFraEDDGridskelet XML{#eddtablefromeddgrid-skeleton-xml} 
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

### EDDTableFraFileNames{#eddtablefromfilenames} 
[ **EDDTableFraFileNames** ](#eddtablefromfilenames)oprette et datasæt fra oplysninger om en gruppe filer i serverens filsystem, herunder en URL for hver fil, så brugerne kan downloade filerne viaERDDAP's["files"systemsystem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). I modsætning til alle de[EDDTableFraFiles](#eddtablefromfiles)Underklasser, denne datasæt type tjener ikke data fra filerne.

* EDDTableFraFileNames er nyttige, når:
    * Du har en gruppe filer, du ønsker at distribuere som alle filer, fordi de ikke indeholder "data" på samme måde, som almindelige datafiler har data. For eksempel, billedfiler, videofiler, Word-dokumenter, Excel-regnefiler, PowerPoint-præsentation filer eller tekstfiler med ustruktureret tekst.
    * Du har en gruppe filer, der har data i et format, derERDDAP™Kan ikke endnu læse. For eksempel et projektspecifikt, brugerdefineret, binært format.
         
#### Oplysninger om EDDTableFraFileNames{#eddtablefromfilenames-data} 
*   [Dataene i en EDDTableFraFileNames datasæt](#eddtablefromfilenames-data)er en tabel, derERDDAP™skaber on-the-fly med oplysninger om en gruppe af lokale filer. I tabellen er der en række for hver fil. Fire særlige attributter i[datasets.xmlfor denne datasæt](#eddtablefromfilenames-skeleton-xml)afgøre, hvilke filer der indgår i dette datasæt:
    
##### filfil Dir{#filedir} 
    *   &lt;FileDir&gt; -- Dette angiver kildemappen i serverens filsystem med filerne til dette datasæt. De filer, der rent faktisk er placeret i serverens filsystem i&lt;FileDir&gt; vises i kolonnen url i denne datasæt i en virtuel mappe med navnet https://*serverUrl*/erddap/files/*datasetID/* .
Hvis f.eks.datasetIDer jplMURSST, T,
og&lt;fileDir&gt; er /home/data/mur/,
og den mappe har en fil med navnet jplMURSST20150103000000.png,
derefter den URL, der vil blive vist til brugere for den pågældende fil,
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
Ud over at bruge en lokal mappe til den&lt;fileDir&gt;, kan du også angive URL'en for en fjern, mappelignende webside. Dette arbejder med:
        
        * Ustrukturerede data i THREDDS, f.eks.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Denne server er ikke længere pålidelig tilgængelig.\\]
        * Usamlete datasæt iHyraxf.eks.
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * De fleste Apache-lignende fortegnelser, f.eks.,
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### fraOnTheFly{#fromonthefly} 
[\\*\\*\\* fraOnTheFly](#fromonthefly)-- Til nogle store S3 skovle (som noaa-goes17, som har 26 millioner filer) , det kan tageERDDAP™op til 12 timer for at downloade alle oplysninger om skovlens indhold (og så er der andre problemer) . For at komme omkring dette, er der en særlig måde at bruge&lt;fileDir&gt; i EDDTableFraFileNames for at lave et datasæt med mappen og filnavne fra en AWS S3 spand. Dataset har ikke listen over alle S3 skovlens mapper og filnavne, som en bruger kan søge via anmodninger til datasættet. Men datasættet vil få navnene på mapper og filer på farten, hvis brugeren krydser mappehierarkiet med datasættets"files"mulighed. Dette gør det muligt for brugerne at gennemse S3 skovlens filhierarki og filer via datasættets"files"system. For at gøre dette, i stedet for at angive URL for S3 spanden som "Starting mappe" (I GenererDatasets Xml) eller eller eller&lt;filDir&gt; (i in in in indatasets.xml) Brug:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
for eksempel:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Se dokumentationen for[Arbejde med S3 Skove iERDDAP™](#working-with-aws-s3-files)Især beskrivelsen af det specifikke format, der skal bruges til S3 spand URL. Og se
[disse detaljer og et eksempel](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)af brug af\\*\\*\\* fraOnTheFly.
        
##### Reklamation{#recursive} 
*   &lt;Reklamation&gt; -- Filer i undermapper af&lt;fileDir&gt; med navne, der matcher&lt;fileRegex&gt; vil blive vist i de samme undermapper i de samme dele"files"URL, hvis&lt;Rekursiv&gt; er indstillet til sand. Standarden er falsk.
* [ []&lt;stiRegex&gt;] (#patregex) -- Hvis reursive=true, Kun mappenavne, der matcher stiRegex (\\*") vil blive accepteret. Hvis reursive=false ignoreres dette. Dette bruges sjældent, men kan være meget nyttige i usædvanlige omstændigheder. (Se dette[Indeks dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og og og[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
##### filRegex{#fileregex} 
*   &lt;FileRegex&gt; -- Kun de filnavne, hvor hele filnavnet (ikke herunder mappenavnet) match kampen&lt;fileRegex&gt; vil blive inkluderet i denne datasæt. For eksempel jplMURSST.&#123;14&#125;\\.png . (Se dette[Indeks dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og og og[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
         
##### Fra Filnavne Datatabel Indholdsfortegnelse{#from-file-names-data-table-contents} 
I tabellen vil der være kolonner med:
* url -- Den webadresse, som brugerne kan bruge til at downloade filen viaERDDAP's["files"systemsystem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
* Navn -- Filens navn (uden et mappenavn) .
* SidsteModificeret -- Den tid, filen blev senest ændret (gemt som dobbelt med"seconds since 1970-01-01T00:00:00Z") . Denne variabel er nyttig, fordi brugerne kan se, om / når indholdet af en given fil sidst ændret. Denne variabel er en[tidstid Frimærke variabel](#timestamp-variables), så dataene kan vises som numeriske værdier (sekunder siden 1970-01T00:00:00Z) eller en streng værdi (ISO 8601:2004 (E) formatformat) , afhængigt af situationen.
* størrelse -- Størrelsen af filen i bytes, gemt som fordobler. De gemmes som doubler, fordi nogle filer kan være større end ints tillader, og lange understøttes ikke i nogle svar filtyper. Doubler vil give den nøjagtige størrelse, selv for meget store filer.
* Ud over kolonner defineret afERDDAP™Administrator med oplysninger udvundet fra filnavnet (for eksempel den tid, der er forbundet med dataene i filen) baseret på to attributter, du angiver i metadata for hver ekstra kolonne /dataVariable:
    
    * ekstraktRegex -- Dette er en[almindeligt udtryk](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) . Hele regex skal matche hele filnavnet (ikke herunder mappenavnet) . regex skal indeholde mindst én optagelse gruppe (en del af et almindeligt udtryk, der er lukket af forældreheses) somERDDAP™Brug til at afgøre, hvilken del af filnavnet til at udtrække til at blive data.
    * ekstrakt Gruppe -- Dette er antallet af optagelsesgruppen (#1 er den første optagelse gruppe) i det regulære udtryk. Standarden er 1. En optagelsesgruppe er en del af et almindeligt udtryk, der er lukket af parentes.
    
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
I tilfælde af tidsvariablen, hvis en fil har navnet jplMURSST20150103000000.png, ekstraktRegex vil matche filnavnet, udtrække de tegn, der matcher den første optagelse gruppe ("20150103000000") som dataType=String, og brug derefter[enheder, der er egnet til strenge tider](#string-time-units)for at parse strengene i tidsdataværdier (2015-01-03T00:00:00Z) .

Hvis en fil har navnet jplMURSST20150103000000.png, ekstraktRegex vil matche filnavnet, udtrække de tegn, der matcher den første optagelse gruppe ("03") som [&lt;DataType&gt;] (#datatype) \\=int giver en dataværdi på 3.
        
#### Andre oplysninger{#other-information} 
* Ingen [ikke]&lt;OpdaterEveryNMillis&gt;] (#updateeverynmillis) -- Denne type datasæt behøver ikke og kan ikke bruge den&lt;UpdateEveryNMillis&gt; tag, fordi de oplysninger, der serveres af EDDTableFraFileNames, altid er helt opdateret, fordi de oplysninger, der serveres af EDDTableFraFileNames, altid er helt up-to-date fordiERDDAP™forespørgsler filsystemet for at svare på hver anmodning om data. Selv hvis der er et stort antal filer, bør denne tilgang arbejde med rimelighed godt. Et svar kan være langsom, hvis der er et stort antal filer, og datasættet ikke er blevet rodet i et stykke tid. Men i flere minutter efter, at operativsystemet holder oplysningerne i en cache, så reaktionerne skal være meget hurtige.
     
* Du kan bruge[GenererDatasets Xml program](#generatedatasetsxml)at gøre detdatasets.xmlBeskåret for denne type datasæt. Du kan tilføje/define yderligere kolonner med oplysninger udvundet fra filnavnet, som vist ovenfor.
     
#### EDDTableFraFileNames skelet XML XML{#eddtablefromfilenames-skeleton-xml} 
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

### EDDTableFraFiles{#eddtablefromfiles} 
[ **EDDTableFraFiles** ](#eddtablefromfiles)er den superklasse af alle EDDTableFra...Files klasser. Du kan ikke bruge EDDTableFraFiles direkte. Brug i stedet en underklasse af EDDTableFraFiles til at håndtere den specifikke filtype:

*   [EDDTableFraAsciiFiles](#eddtablefromasciifiles)aggregerer data fra komma-, fane-, semikolonin- eller rum-separatede tabulære ASCII-datafiler.
*   [EDDTableFraAudioFiles](#eddfromaudiofiles)aggregerer data fra en gruppe af lokale lydfiler.
*   [EDDTableFra Billeder af AwsXmlFiles](#eddtablefromawsxmlfiles)aggregerer data fra et sæt Automatisk Vejrstation (AWS) XML-filer.
*   [EDDTableFra kolonnearAsciiFiles](#eddtablefromcolumnarasciifiles)aggregerer data fra tabular ASCII datafiler med fast bredde data kolonner.
*   [EDDTableFraHyraxFiler](#eddtablefromhyraxfiles)  (DEPRECATED) aggregerer data med flere variabler, hver med delte dimensioner (for eksempel tid, højde (eller dybde) Højde, længdegrad) , og serveret af en[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).
*   [EDDTableFraInvalidCRAFiles](#eddtablefrominvalidcrafiles)aggregerede data fraNetCDF  (v3 eller v4)  .ncfiler, der bruger en bestemt, ugyldig variant af CF DSG Contiguous Ragged Array (CRA) filer. Selv om selvomERDDAP™understøtter denne filtype, er det en ugyldig filtype, der ingen skal begynde at bruge. Grupper, der bruger denne filtype, opfordres til at brugeERDDAP™at generere gyldige CF DSG CRA-filer og stoppe med at bruge disse filer.
*   [EDDTableFraJsonlCSVFiles](#eddtablefromjsonlcsvfiles)aggregerede data fra[JSON Linje CSV-filer](https://jsonlines.org/examples/).
*   [EDDTableFraMultidimNcFiles](#eddtablefrommultidimncfiles)aggregerede data fraNetCDF  (v3 eller v4)  .nc  (eller eller eller[.ncml](#ncml-files)) filer med flere variabler, hver med delte dimensioner (for eksempel tid, højde (eller dybde) Højde, længdegrad) .
*   [EDDTableFraNcFiles](#eddtablefromncfiles)aggregerede data fraNetCDF  (v3 eller v4)  .nc  (eller eller eller[.ncml](#ncml-files)) filer med flere variabler, hver med delte dimensioner (for eksempel tid, højde (eller dybde) Højde, længdegrad) . Det er fint at fortsætte med at bruge denne datasæt type til eksisterende datasæt, men for nye data anbefaler vi at bruge EDDTableFraMultidimNcFiles i stedet.
*   [EDDTableFraNcCFFiles](#eddtablefromnccffiles)aggregerede data fraNetCDF  (v3 eller v4)  .nc  (eller eller eller[.ncml](#ncml-files)) filer, der bruger en af de filformater, der er angivet af de[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konventioner. Men til filer ved hjælp af en af de multidimensionelle CFG-varianter, brug[EDDTableFraMultidimNcFiles](#eddtablefrommultidimncfiles)I stedet.
*   [EDDTableFraNccsvFiles](#eddtablefromnccsvfiles)aggregerede data fra[NCCSV](/docs/user/nccsv-1.00)ASCII .csv filer.
*   [EDDTableFra parkFiles](#eddtablefromparquetfiles)håndterer data fra[Udsigt fra værelset](https://parquet.apache.org/).
*   [EDDTableFraThreddsFiles](#eddtablefromthreddsfiles)  (DEPRECATED) aggregerer data fra filer med flere variabler med delte dimensioner serveret af en[I nærheden afTHOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).
*   [EDDTableFraWFSFiler](#eddtablefromwfsfiles)  (DEPRECATED) gør en lokal kopi af alle data fra enArcGISMapServerWFSserver, så dataene kan igen betjenes hurtigt tilERDDAP™Brugere.

I øjeblikket understøttes der ingen andre filtyper. Men det er normalt relativt nemt at tilføje støtte til andre filtyper. Kontakt os, hvis du har en anmodning. Eller hvis dine data er i et gammelt filformat, som du gerne vil flytte væk fra, anbefaler vi at konvertere filerne til at væreNetCDFv3.ncfiler filer filer (og især.ncfiler med de[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konsekvens af Ragged Array datastruktur --ERDDAP™kan udtrække data fra dem meget hurtigt) .NetCDFer et bredt understøttet, binært format, giver hurtig tilfældig adgang til dataene, og er allerede understøttet afERDDAP.

#### FraFiles Detaljer{#fromfiles-details} 
Følgende oplysninger gælder for alle de underklasser af EDDTableFraFiles.
##### Aggregation{#aggregation} 
Denne klasse aggregerer data fra lokale filer. Hver fil har en (relativt relativt) lille tabel af data.
    * Det resulterende datasæt vises som om alle filers tabeller var kombineret (alle rækker af data fra fil #1, plus alle rækker fra fil #2,...) .
    * Filerne behøver ikke alle at have alle de angivne variabler. Hvis en given fil ikke har en bestemt variabel,ERDDAP™vil tilføje manglende værdier efter behov.
    * De variable i alle filer skal have de samme værdier for de[add\\_offset](#scale_factor),[missing\\_value](#missing_value),[\\_Fill Værdiværdi](#missing_value),[scale\\_factor](#scale_factor), og[enheder](#units)attributter attributter attributter (hvis nogen) .ERDDAP™checks, men det er en ufuldkommelig test - hvis der er forskellige værdier,ERDDAPVed ikke, hvilket er korrekt, og derfor, hvilke filer er ugyldige. Hvis dette er et problem, kan du muligvis bruge[NcML](#ncml-files)eller eller eller[NCO](#netcdf-operators-nco)at løse problemet.
         
##### Komprimerede filer{#compressed-files} 
Kildedatafiler til alle EDDTableFraFiles subclasses kan være eksternt komprimeret (fx,.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2 eller .Z) . Se billederne[Eksternt komprimeret fildokumentation](#externally-compressed-files).
     
##### Oplysninger om cachen{#cached-file-information-1} 
* Når en EDDTableFraFiles datasæt er først indlæst, læser EDDTableFraFiles oplysninger fra alle de relevante filer og skaber tabeller (en række for hver fil) med oplysninger om hver gyldig fil og hver "bad" (forskellige eller ugyldige) fil.
    * Tabellerne gemmes også på disken, somNetCDFv3.ncfiler i filer i *bigParentDirectory* / Datasæt / *I nærheden af Last2CharsOfDatasetID* / / / / *datasetID* / i filer navngivet:
dirTable.nc  (som indeholder en liste over unikke mappenavne) ,
filfil Tabelbord.nc  (som holder bordet med hver gyldig fils oplysninger) ,
dårlige filer.nc  (som holder bordet med hver dårlig fils oplysninger) .
    * At fremskynde adgangen til en EDDTableFraFiles dataset (men på bekostning af at bruge mere hukommelse) , du kan bruge
[ []&lt;fileTableInMemory&gt;true&lt;/ filTableInMemory&gt;] (#filetableinmemory)   
at fortælleERDDAP™for at gemme en kopi af fil information tabeller i hukommelsen.
    * Kopier af filoplysningerne på disken er også nyttig, nårERDDAP™lukkes og genstartes: det sparer EDDTable FraFiles fra at skulle genlæse alle datafiler.
    * Når et datasæt er indlæst,ERDDAP™behøver kun at læse data i nye filer og filer, der har ændret sig.
    * Hvis en fil har en anden struktur fra de andre filer (f.eks. en anden datatype for en af variablerne eller en anden værdi for "[enheder](#units)" attribut) ,ERDDAPtilføjer filen til listen over "bad" filer. Oplysninger om problemet med filen vil blive skrevet til den *bigParentDirectory* /logs/log.txt-fil.
    * Du bør ikke nogensinde nødt til at slette eller arbejde med disse filer. En undtagelse er: Hvis du stadig foretager ændringer i et datasætsdatasets.xmlopsætning, kan du slette disse filer for at tvingeERDDAP™at læse alle filerne, da filerne vil blive læst/fortolket anderledes. Hvis du nogensinde behøver at slette disse filer, kan du gøre det, nårERDDAP™kører. (Så sæt et sæt[flag flag flag flag](/docs/server-admin/additional-information#set-dataset-flag)at indlæse datasættet ASAP.) Men, men,ERDDAP™normalt bemærker, at dedatasets.xmloplysninger matcher ikke filen Tabeloplysninger og sletter filbordene automatisk.
    * Hvis du ønsker at opfordreERDDAP™for at opdatere de lagrede datasæt-oplysninger (Hvis du f.eks. har tilføjet, fjernet eller ændret nogle filer til datasættets datakatalog) , brug af[flagsystem](/docs/server-admin/additional-information#flag)at tvingeERDDAP™for at opdatere cached-filoplysninger.
         
##### Håndtering af anmodninger{#handling-requests-1} 
*   ERDDAP™tabulerede dataanmodninger kan lægge begrænsninger på enhver variabel.
    * Når en klients anmodning om data behandles, kan EDDTableFraFiles hurtigt se i tabellen med de gyldige filoplysninger for at se, hvilke filer der kan have relevante data. For eksempel, hvis hver kildefil har data til en fast placering buoy, kan EDDTableFraFiles meget effektivt afgøre, hvilke filer der kan have data inden for en given længde og breddegrad rækkevidde.
    * Fordi det gyldige fil informationsbord indeholder den mindste og maksimale værdi af hver variabel for hver gyldig fil, kan EDDTableFraFiles ofte håndtere andre forespørgsler helt effektivt. For eksempel, hvis nogle af buoys ikke har en lufttryk sensor, og en klient anmoder om data til luftPressure&#33;=NaN, EDDTableFraFiles kan effektivt afgøre, hvilke buoys har lufttryk data.
         
##### Opdatering af cachen filoplysninger{#updating-the-cached-file-information-1} 
Når datasættet er indlæst, opdateres cachen filoplysninger.
    
* Datasættet genindlæses periodisk som fastlagt af datasættet&lt;reloadEveryNMinutes&gt; i datasættets oplysninger idatasets.xml.
* Datasættet er genindlæst så hurtigt som muligt, nårERDDAP™registrerer, at du har tilføjet, fjernet,[touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (at ændre filens sidste Modificeret tid) , eller ændret en datafil.
* Datasættet er genindlæst så hurtigt som muligt, hvis du bruger datasættet[flagsystem](/docs/server-admin/additional-information#flag).

Når datasættet er indlæst,ERDDAP™Sammenligner de tilgængelige filer til cached-fil informationstabellen. Nye filer læses og føjes til den gyldige filtabel. Filer, der ikke længere eksisterer, er faldet fra den gyldige filtabel. Filer, hvor filtampen har ændret sig, og deres oplysninger opdateres. De nye tabeller erstatter de gamle tabeller i hukommelsen og på disk.
     
##### Dårlige filer{#bad-files-1} 
Tabellen af dårlige filer og årsagerne til, at filerne blev erklæret dårlige (ødelagt fil, manglende variabler, forkerte akseværdier osv.) e-mailes til e-mail Alt alt Til e-mailadresse (sandsynligvis du) Hver gang datasættet er genindlæst. Du bør udskifte eller reparere disse filer så hurtigt som muligt.
     
##### Manglende variabler{#missing-variables-1} 
Hvis nogle af filerne ikke har nogle af filernedataVariables defineret i datasættetsdatasets.xmlDet er okay. Når EDDTableFraFiles læser en af disse filer, vil det fungere som om filen havde variablen, men med alle manglende værdier.
     
##### I nærheden af Real Time Data{#near-real-time-data} 
* EDDTableFraFiles behandler anmodninger om meget nylige data som en særlig sag. Problemet: Hvis de filer, der udgør datasættet, opdateres ofte, er det sandsynligt, at datasættet ikke opdateres hver gang en fil ændres. Så EDDTableFraFiles vil ikke være opmærksom på de ændrede filer. (Du kan bruge den[flagsystem](/docs/server-admin/additional-information#flag), men det kan føre tilERDDAP™Genindlæs datasættet næsten konstant. Så i de fleste tilfælde anbefaler vi ikke det.) I stedet behandler EDDTableFraFiles med dette ved følgende system: Hvornår Hvornår skal man HvornårERDDAP™får en anmodning om data inden for de seneste 20 timer (for eksempel, 8 timer siden indtil nu) ,ERDDAP™vil søge alle filer, der har data i de sidste 20 timer. Således,ERDDAP™behøver ikke at have perfekt opdaterede data for alle filer for at finde de nyeste data. Du skal stadig angive [&lt;reload Alle rettigheder&gt;] (#loadeveryn minutter) til en rimelig lille værdi (for eksempel 60) , men det behøver ikke at være lille (for eksempel 3) .
     
    *    **Ikke anbefalet** organisering af nærreal-time data i filerne: Hvis du f.eks. har et datasæt, der gemmer data for mange stationer (eller buoy, eller trajectory, ...) I mange år kan du arrangere filerne, så der f.eks. er en fil pr. station. Men så, hver gang nye data til en station ankommer, skal du læse en stor gammel fil og skrive en stor ny fil. Og hvornårERDDAP™Genindlæs datasættet, det bemærker, at nogle filer er blevet ændret, så det læser disse filer helt. Det er ineffektivt.
         
    *    **Anbefalet anbefalet** organisering af nærreal-time data i filerne: Gem dataene i bidder, for eksempel alle data til en station/buoy/trajectory i et år (eller en måned) . Så når en ny datum ankommer, kun filen med dette års (eller måneds) Data påvirkes.
        
        * Bedste: BrugNetCDFv3.ncfiler med en ubegrænset dimension (tidstid) . Så for at tilføje nye data, kan du bare føje de nye data uden at skulle læse og skrive hele filen. Ændringerne er lavet meget effektivt og væsentligt atomisk, så filen ikke nogensinde er i en inkonsistent tilstand.
        * Ellers: Hvis du ikke/kan ikke bruge.ncfiler med en ubegrænset dimension (tidstid) , så, når du skal tilføje nye data, skal du læse og skrive hele den berørte fil (Forhåbentlig lille, fordi det bare har et års (eller måneds) Værdi for data) . Heldigvis, alle filer i tidligere år (eller måneder) for denne station forbliver uændret.
        
I begge tilfælde, nårERDDAP™Genindlæs datasættet, de fleste filer er uændret; kun et par, små filer har ændret og skal læses.
         
##### Direktører{#directories-1} 
Filerne kan være i én mappe eller i en mappe og dens undermapper (Reklamation) . Hvis der er et stort antal filer (for eksempel &gt;1.000) , operativsystemet (og dermed EDDTableFraFiles) vil fungere meget mere effektivt, hvis du gemmer filerne i en række undermapper (om året, eller en måned for datasæt med meget hyppige filer) , så der aldrig er et stort antal filer i en given mappe.
     
##### Fjernbetjente og HTTP Range anmodninger{#remote-directories-and-http-range-requests-1} 
*    **Fjernbetjente og HTTP Range anmodninger**   (AKA Byte Servicerer, Byte Range anmodninger) --
    EDDGridFraNcFiles, EDDTableFraMultidimNcFiles, EDDTableFraNcFiles og EDDTableFraNcCFFiles, kan undertiden tjene data fra.ncfiler på fjernservere og tilgås via HTTP, hvis serveren understøtter[Byte Service](https://en.wikipedia.org/wiki/Byte_serving)via HTTP-område anmodninger (HTTP-mekanismen til at betjene) . Dette er muligt, fordi netcdf-java (somERDDAP™Brug til at læse.ncfiler filer filer) Understøtter læsning af data fra fjern.ncfiler via HTTP-område anmodninger.
    
     **Gør ikke dette&#33;**   
Brug i stedet [&lt;cacheFraUrl&gt; system] (#cachefraurl) .
    
##### CacheFraUrl{#cachefromurl} 
* [ [] ** &lt;cacheFraUrl&gt; ** Særkegle (#cachefraurl) - - - -
AlleEDDGridFraFiles og alle EDDTableFraFiles datasets understøtter et sæt tags, der fortællerERDDAP™at downloade og vedligeholde en kopi af alle en fjerndatasæts filer eller en cache af et par filer (Hentet efter behov) . **Dette er en utrolig nyttig funktion.** 
    * The The The The The The The&lt;cacheFraUrl&gt; tag lader dig angive en URL med en liste over en fjerndatasæts filer fra en fjern filliste.
        
        * Ustrukturerede data i THREDDS, f.eks.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Denne server er ikke længere pålidelig tilgængelig.\\]
        * Usamlete datasæt iHyraxf.eks.
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * De fleste Apache-lignende fortegnelser, f.eks.,
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * S3 skovle, f.eks.
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
Dette kan dog kræve en AWS-konto og mere opsætning.
Se endnu[Arbejde med S3 Skove iERDDAP™](#working-with-aws-s3-files).
Desuden behøver du normalt ikke at bruge cache FraUrl med filer i S3 skovle, hvis filerne er ASCII-filer (f.eks. .csv) , fordiERDDAP™kan effektivt læse data fra skovlen direkte via en strøm.
        
        ERDDAP™vil kopiere eller cache disse filer i dataset's&lt;FilDir&gt; mappe. Hvis du har brug for støtte til en anden type fjern filliste (f.eks. FTP) , bedes du sende din anmodning til Chris. John på noaa.gov .
        
        * Standardværdien for standardværdien&lt;cacheFraUrl&gt; tag er null. Hvis du ikke angiver en værdi for pengene&lt;cacheFraUrl&gt; tag, kopiere / cache system vil ikke blive brugt til dette datasæt.
        * Hvis datasættets&lt;FileRegex&gt; indstilling er noget andet end .\\*,ERDDAP™vil kun downloade filer, der svarer til filenRegex.
        * Hvis datasættets&lt;reursiv&gt; indstilling er sand, og fjernfiler er i undermapper,ERDDAP™vil se i fjerntliggende undermapper, der matcher datasættets [&lt;stiRegex&gt;] (#patregex) , oprette den samme mappestruktur lokalt og sætte de lokale filer i samme undermapper.
        * I GenererDatasets Xml, hvis du angiver en&lt;cacheFraUrl&gt; værdi, Generer Datasæt Xml vil skabe den lokale&lt;FilDir&gt; mappe og kopiere 1 fjernfil ind i det. GenererDatasets Xml vil derefter genereredatasets.xmlchunk baseret på denne prøvefil (Angiv prøve Filen=nothing) .
        * Hvis datakilden er en fjernERDDAP™, brug[EDDGridFraErddap](#eddfromerddap)eller eller eller[EDDTableFraErddap](#eddfromerddap)i stedet for&lt;cacheFraUrl&gt;. På den måde, din lokaleERDDAP™vil blive vist for at have datasættet, men behøver ikke at gemme nogen af dataene lokalt. Den eneste grund til at bruge&lt;cacheFraUrl&gt; for at få data fra en fjernERDDAP™er, når du har en anden grund til, at du ønsker at have en lokal kopi af datafiler. I så fald:
            * Dette datasæt vil forsøge at abonnere på datasættet på fjernbetjeningenERDDAPså ændringer i det datasæt vil kalde denne datasæts flag Url, der forårsager dette lokale datasæt til at indlæse og downloade de ændrede fjernfiler. Således vil det lokale datasæt være opdateret meget snart efter ændringer er foretaget til fjerndatasættet.
            * Du skal sende administratoren af fjernbetjeningenERDDAP™at spørge efterdatasets.xmltil fjerndatasættet, så du kan gøre datasættet i din lokaleERDDAP™se ud som datasættet i fjernbetjeningenERDDAP.
        * Hvis datakilden er en fjernERDDAP™, den lokale datasæt vil forsøge at abonnere på fjerndatasættet.
            * Hvis abonnementet lykkes, når fjernbetjeningenERDDAPGenindlæsninger og har nye data, vil den kontakte flagURL for denne datasæt, hvilket gør det til at indlæse og downloade de nye og/eller ændrede datafiler.
            * Hvis abonnementet mislykkes (uanset årsag) eller hvis du blot ønsker at sikre, at den lokale datasæt er opdateret, kan du indstille en[flag flag flag flag](/docs/server-admin/additional-information#flag)for det lokale datasæt, så det vil indlæse, så det vil tjekke om nye og/eller ændrede fjerndatafiler.
        * Hvis datakilden ikke er en fjernbetjeningERDDAP: Datasættet vil kontrollere for nye og/eller ændrede fjernfiler, når det genindlæsser. Normalt styres dette af [&lt;reload Alle rettigheder&gt;] (#loadeveryn minutter) . Men hvis du ved, hvornår der er nye fjernfiler, kan du indstille en[flag flag flag flag](/docs/server-admin/additional-information#flag)for det lokale datasæt, så det vil indlæse og kontrollere for nye og/eller ændrede fjerndatafiler. Hvis dette sker rutinemæssigt på et bestemt tidspunkt af dagen (f.eks. ved 7am) , du kan gøre et cron job at brugecurlKontakt flaget Url til denne datasæt, så det vil indlæse og kontrollere for nye og/eller ændrede fjerndatafiler.
    * The The The The The The The&lt;cacheSizeGB&gt; tag angiver størrelsen på den lokale cache. Du skal sandsynligvis kun bruge dette, når du arbejder med cloud-lagringssystemer som[Amazon S3](https://aws.amazon.com/s3/)som er et almindeligt anvendt opbevaringssystem, der er en del af[Amazon Web Services (AWS) ](https://aws.amazon.com/). Standarden er -1.
        * Hvis værdien er&lt;=0 (f.eks. standardværdien af -1) ,
            ERDDAP™vil downloade og vedligeholde en **Komplet kopi** af alle fjerndatasættets filer i datasættets datasæt&lt;FileDir&gt;.
            * Dette er den indstilling, der anbefales, når det er muligt.
            * Hver gang datasættet er genindlæst, det sammenligner navne, størrelser og sidsteModificerede tider af fjernfiler og de lokale filer, og downloads alle fjernfiler, der er nye eller har ændret sig.
            * Hvis en fil, der var på fjernserveren forsvinder,ERDDAP™sletter ikke den tilsvarende lokale fil (ellers, hvis noget var midlertidigt forkert med fjernserveren,ERDDAP™kan slette nogle eller alle de lokale filer&#33;) .
            * Med denne indstilling vil du normalt indstille&lt;opdateringEveryNMillis&gt; til -1, da datasættet er klar over, hvornår det har kopieret nye datafiler på plads.
        * Hvis værdien er &gt;0,
            ERDDAP™vil downloade filer fra fjerndatasættet efter behov i en lokal **cache cache cache cache** (i datasættet's&lt;filDir&gt;) med en tærskelstørrelse på det angivne antal GB.
            * cachen skal være stor nok til at holde mindst flere datafiler.
            * Generelt vil den større cache, jo bedre, fordi den næste ønskede datafil vil være mere tilbøjelige til allerede at være i cachen.
            * Caching bør kun anvendes, nårERDDAP™kører i en cloud computing server (f.eks. en AWS-beregningsinstans) og fjernfiler i et cloud-lagringssystem (f.eks. AWS S3) .
            * Når det diskplads, der bruges af de lokale filer, overstiger cachen Størrelse GB,ERDDAP™snart (måske ikke umiddelbart) slette nogle af de cachelagrede filer (i øjeblikket, baseret på Least Senest Brugt (LRU) algoritme algoritme) indtil det diskplads, der bruges af de lokale filer, er&lt;0.75 \\*cacheSizeGB ("goal") . Ja, der er tilfælde, hvor LRU udfører meget dårligt -- der er ingen perfekt algoritme.
            *   ERDDAP™vil aldrig forsøge at slette en cached-fil, derERDDAP™Begynd at bruge i de seneste 10 sekunder. Dette er et ufuldkommeligt system til at håndtere cachesystemet og datafillæser systemet er kun løst integreret. På grund af denne regel,ERDDAP™muligvis ikke i stand til at slette nok filer til at nå sit mål, hvor det vil udskrive en ADVARSEL til log.txt-filen, og systemet vil spilde en masse tid på at gå i cachen, og det er muligt, at størrelsen af filerne i cachen kan meget overstige cachestørrelseGB. Hvis dette nogensinde opstår, skal du bruge en større cacheSizeGB indstilling for den datasæt.
            * I øjeblikket,ERDDAP™kontrollerer aldrig, om fjernserveren har en nyere version af en fil, der er i den lokale cache. Hvis du har brug for denne funktion, bedes du kontakte Chris. John på noaa.gov .
        * Selv om brugen af de samme mærkenavne kan betyde, at kopisystemet og cachesystemet bruger det samme underliggende system, der ikke er korrekt.
            * Kopieringssystemet starter proaktivt opgaver for at downloade nye og ændrede filer, hver gang datasættet er indlæst. Kun filer, der rent faktisk er blevet kopieret til den lokale mappe, er tilgængelige viaERDDAP™Datasæt.
            * cachesystemet får den eksterne filliste, hver gang datasættet er genindlæst og foregiver, at alle disse filer er tilgængelige via datasættetERDDAP™Datasæt. Interessant set, alle de fjerntliggende filer endda vises i datasættets /files / websider og er tilgængelige for download (Selvom det måske kun efter en forsinkelse, mens filen først downloades fra fjernserveren til den lokale cache.) 
        * Datasets, der bruger cacheSizeGB kan drage fordel af at bruge en[nThreads](#nthreads)Indstilling af større end 1, fordi dette vil gøre det muligt for datasættet at downloade mere end 1 fjernfil på et tidspunkt.
    * The The The The The The The&lt;cachePartialPathRegex&gt; tag er et sjældent brugt tag, der kan angive et alternativ til datasættets [&lt;stiRegex&gt;] (#patregex) . Standarden er null.
        * Brug kun dette, hvis du kopierer hele datasættet via standarden&lt;cacheSizeGB&gt; værdi af -1. Med&lt;cacheSizeGB&gt; værdier af &gt;1, vil dette ignoreres, fordi det ikke ersensisk.
        * Se [dokumentationen for&lt;stiRegex&gt;] (#patregex) for vejledning om, hvordan du opbygger regex.
        * Hvis dette er angivet, vil den blive brugt hver gang datasættet er genindlæst, undtagen første gang et datasæt bliver indlæst i starten af en måned.
        * Dette er nyttigt, når fjerndatasættet gemmes i en labyrint af undermapper, og når de fleste af disse filer sjældent, hvis nogensinde, ændres. (()&lt;hoste&gt; NASA NASA NASA&lt;hoste&gt;) Du kan f.eks. angive et&lt;cachePartialPathRegex&gt; som lige matcher det nuværende år eller den nuværende måned. Disse regexes er meget vanskelige at angive, fordi alle de partielle og fulde stinavne skal matche de&lt;cachePartialPathRegex&gt; og fordi cachen&lt;cachePartialPathRegex&gt; skal arbejde med de eksterne webadresser og de lokale mapper. Et rigtigt livseksempel er:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
EksempelURL'en ovenfor har filer i undermapper baseret på år (f.eks. 2018) og dag af året (f.eks. 001, 002, ..., 365 eller 366) .
Bemærk, at&lt;cachePartialPathRegex&gt; starter med .\\*,
Derefter har en bestemt undermappe, som er fælles for fjernwebadresserne og de lokale mapper, f.eks. /v4«.
Så har en række indlejrede capture grupper, hvor den første mulighed ikke er noget
og den anden mulighed er en specifik værdi.
            
eksemplet ovenfor vil kun matche mapper for de anden 10 dage af 2018, f.eks.
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Denne server er ikke længere pålidelig tilgængelig.\\]  
og dag 011, 012, ..., 019.
             (Se dette[Indeks dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og og og[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
Hvis du har brug for hjælp til at oprette&lt;cachePartialPathRegex&gt;, skriv venligst e-mailen&lt;cacheFraUrl&gt; til Chris. John på noaa.gov .
            
        * En fælles tilgang: Hvis du vil bruge&lt;cachePartialPathRegex&gt;, ikke bruge det i første omgang, fordi du ønskerERDDAP™at downloade alle filer oprindeligt. Efter efterERDDAP™har downloadet alle filer, tilføje det til datasættets chunk afdatasets.xml.
             
##### Masser af filer{#thousands-of-files} 
Hvis dit datasæt har mange tusinde filer,ERDDAP™kan være langsom til at svare på anmodninger om data fra den pågældende datasæt. Der er to spørgsmål her:
 

1. Antallet af filer pr. mappe.
Indvendigt,ERDDAP™kører på samme hastighed uanset om n-filer er i en mappe eller spredt i flere mapper.
     
Men der er et problem: Jo flere filer i en given mappe, langsommere operativsystemet er ved at returnere listen over filer i mappen (pr. fil) til at tilERDDAP. Svarstiden kan være O (n log n) . Det er svært at sige, hvor mange filer i én mappe er for mange, men 10.000 er sandsynligvis for mange. Så hvis din opsætning genererer masser af filer, kan en anbefaling her være: sætte filerne i logisk organiseret subdirectories (f.eks. station eller station/år) .
    
En anden grund til at bruge subdirectories: hvis en bruger ønsker at brugeERDDAP's"files"system til at finde navnet på den ældste fil til station X, er det hurtigere og mere effektivt, hvis filerne er i station/år subdirectories, fordi mange mindre oplysninger skal overføres.
    
2. Det samlede antal filer.
Til tabulære datasæt,ERDDAP™Hold styr på antallet af værdier for hver variabel i hver fil. Når en bruger foretager en anmodning,ERDDAP™skal læse alle data fra alle de filer, der muligvis har data, der matcher brugerens anmodning. Hvis brugeren beder om data fra en begrænset periode (f.eks. en dag eller en måned) , såERDDAP™behøver ikke at åbne for mange filer i dit datasæt. Men der er ekstreme tilfælde, hvor næsten alle filer kan have matchende data (f.eks. når vandTemperature =3.2C) . Da det tagerERDDAP™lidt tid (dels søgetiden på harddisken, dels tid til at læse filens header) bare for at åbne en given fil (og mere, hvis der er masser af filer i mappen) , der er en betydelig frist, hvis det samlede antal filer, der erERDDAP™skal åbne er meget stor. Selv åbning 1000 filer tager betydelig tid. Så der er fordele for periodisk at konsolidere de daglige filer i større stykker (f.eks. 1 station for 1 år) . Jeg forstår, at du måske ikke ønsker at gøre dette af forskellige grunde, men det fører til meget hurtigere reaktioner. I ekstreme tilfælde (f.eks. beskæftiger jeg mig med en GTS-datasæt, der har ~35 millioner kildefiler) , der betjener data fra et stort antal kildefiler er upraktisk, fordiERDDAP's svar på enkle forespørgsler kan tage timer og bruge tonsvis af hukommelse. Ved at konsolidere kildefiler i et mindre nummer (for GTS, jeg har 720 nu, 2 om måneden) ,ERDDAP™kan reagere hurtigt. Se endnu[Millioner af filer](#millions-of-files)  
     

N.B. Solid State Drives er fantastisk&#33; Den hurtigeste, nemmeste, billigste måde at hjælpeERDDAP™deal med et stort antal (lille lille lille lille lille) filer er at bruge en solid state drev. Se endnu[Solid State Drives er fantastisk&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Millioner af filer{#millions-of-files} 
* Nogle datasæt har millioner af kildefiler.ERDDAP™kan håndtere dette, men med blandede resultater.
    
    * For anmodninger, der kun involverer variabler opført i [&lt;subsetVariables&gt;] (#subsetvariables) ,ERDDAP™har alle de nødvendige oplysninger allerede udvundet fra datafilen og gemt i en fil, så det kan reagere meget hurtigt.
    * For andre anmodninger,ERDDAP™kan scanne datasættets[cached filoplysninger](#cached-file-information)og finde ud af, at kun et par af filerne kan have data, som er relevante for anmodningen og dermed reagerer hurtigt.
    * Men for andre anmodninger (for eksempel, vandTemperature=18 grad\\_C) hvor enhver fil muligvis har relevante data,ERDDAP™skal åbne et stort antal filer for at se, om hver af filerne har nogen data, der er relevante for anmodningen. Filerne åbnes sequentielt. På ethvert operativsystem og ethvert filsystem (andre end solide statsdrev) , det tager lang tid (så så sådanERDDAP™reagerer langsomt) og virkelig binder filsystemet (så så sådanERDDAP™reagerer langsomt på andre anmodninger) .
    
Heldigvis er der en løsning.
    
    1. Opsæt datasættet på en ikke-offentligERDDAP™  (din personlige computer?) .
    2. Opret og kør et script, der anmoder om en serie af.ncCF-filer, hver med en stor del af datasættet, normalt en periode (for eksempel alle data for en given måned) . Vælg den periode, så alle de resulterende filer er mindre end 2 GB (men forhåbentlig større end 1 GB) . Hvis datasættet har nær-real-time data, skal du køre scriptet til at genskabe filen i den aktuelle periode (f.eks. denne måned) Ofte ofte ofte (hver 10 minutter? hver time?) . Anmodninger tilERDDAP™for for for.ncCF-filer skaber enNetCDFv3.ncfil, der bruger den[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konguous Ragged Array data strukturer.
    3. Opsæt en[EDDTableFraNcCFFiles](#eddtablefromnccffiles)Datasæt på din offentligeERDDAP™som får data fra den.nc (CF) filer.ERDDAP™kan udtrække data fra disse filer meget hurtigt. Og da der nu er snesevis eller hundredvis (i stedet for millioner) af filer, selv hvisERDDAP™skal åbne alle filer, det kan gøre så hurtigt.
    
Ja, dette system tager noget tid og bestræbelser på at opsætte, men det virker meget, meget godt. De fleste dataanmodninger kan håndteres 100 gange hurtigere end før.
    \\[Bob vidste det var en mulighed, men det var Kevin O'Brien, der først gjorde dette og viste, at det virker godt. Nu, nu, Bob bruger dette til GTS-datasættet, som har omkring 18 millioner kildefiler, og somERDDAP™nu tjener via ca. 500.nc (CF) filer.\\]
    
N.B. Solid State Drives er fantastisk&#33; Den hurtigeste, nemmeste, billigste måde at hjælpeERDDAP™deal med et stort antal (lille lille lille lille lille) filer er at bruge en solid state drev. Se endnu[Solid State Drives er fantastisk&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### Kæmpe filer{#huge-files} 
* En enkelt enorm datafil (Især store ASCII datafiler) kan forårsage en OutOfMemory fejl. Hvis dette er problemet, bør det være indlysende, fordiERDDAP™vil ikke indlæse datasættet. Løsningen, hvis det er muligt, er at opdele filen i flere filer. Ideelt, kan du opdele filen i logiske chunks. Hvis filen f.eks. har 20 måneders værdi af data, opdele den i 20 filer, hver med 1 måneds dataværdi. Men der er fordele, selvom hovedfilen opdeles tilfældigt. Denne tilgang har flere fordele: a) Dette vil reducere den hukommelse, der er nødvendig for at læse datafiler til 1/20th, fordi kun én fil læses på et tidspunkt. b) Ofte,ERDDAP™kan håndtere anmodninger meget hurtigere, fordi det kun skal se i et eller et par filer for at finde dataene til en given anmodning. c) Hvis dataindsamling løbende, kan de eksisterende 20 filer forblive uændret, og du behøver kun at ændre en, lille, ny fil for at tilføje den næste måneds dataværdi til datasættet.
     
##### FTP Trouble / rådgivning{#ftp-troubleadvice-1} 
* Hvis du FTP nye datafiler til filerneERDDAP™server mensERDDAP™kører, der er chancen for, atERDDAP™vil indlæse datasættet under FTP-processen. Det sker oftere end du måske tror&#33; Hvis det sker, vises filen for at være gyldig (det har et gyldigt navn) , men filen er ikke gyldig. HvisERDDAP™forsøger at læse data fra den ugyldige fil, vil den resulterende fejl forårsage, at filen skal føjes til tabellen af ugyldige filer. Dette er ikke godt. For at undgå dette problem skal du bruge et midlertidigt filnavn, når FTP'ing af filen f.eks. ABC2005.nc\\_TEMP . Så, filenNameRegex test (se nedenfor) vil angive, at dette ikke er en relevant fil. Når FTP-processen er færdig, skal du omdøbe filen til det korrekte navn. Afrenningsprocessen vil medføre, at filen bliver relevant i et øjeblik.
    
##### Fil navn uddrag{#file-name-extracts} 
\\[Denne funktion er DEPRECATED. Brug venligst venligst[\\*\\*\\*FilName pseudosourceName](#filename-sourcenames)I stedet.\\]  
EDDTableFraFiles har et system til at udtrække en streng fra hvert filnavn og bruge det til at gøre en pseudo data variabel. I øjeblikket er der ingen system til at fortolke disse strenge som datoer/times. Der er flere XML-tags til at oprette dette system. Hvis du ikke har brug for del eller alt dette system, skal du blot angive disse tags eller bruge "" værdier.

* preExtractRegex er en[almindeligt udtryk](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) Bruges til at identificere tekst, der skal fjernes fra start af filnavnet. Fjernelsen sker kun, hvis regex er matchet. Dette begynder normalt med "^" for at matche starten af filnavnet.
* indlæg UddragRegex er et almindeligt udtryk, der bruges til at identificere tekst, der skal fjernes fra slutningen af filnavnet. Fjernelsen sker kun, hvis regex er matchet. Dette slutter normalt med "$" for at matche slutningen af filnavnet.
* ekstraktRegex Hvis dette almindelige udtryk anvendes efter preExtractRegex og postExtractRegex for at identificere en streng, der skal udvindes fra filnavnet (f.eks.stationID) . Hvis regex ikke matches, bruges hele filnavnet (minus forskud og indlæg Udtræk) . Brug ".\\*" til at matche hele filnavnet, der er efterladt efter preExtractRegex og postExtractRegex.
* kolonne kolonne kolonne NavnForExtract er datakolonne kildenavnet for de ekstra strenge. A A A A A AdataVariablemed dette[sourceName](#sourcename)skal være i detdataVariables liste (med enhver datatype, men normalt String) .

Hvis et datasæt f.eks. har filer med navne som XYZAble.nc, XYZBaker.nc, XYZCharlie.nc..., og du vil oprette en ny variabel (stationID) når hver fil læses, som vil have station ID-værdier (Hoteller i nærheden af Baker, Charlie, ......) udvundet af filnavne, kan du bruge disse tags:

*   &lt;Supplerende oplysninger om preExtractRegex&lt;/preExtractRegex&gt;
Den første ^ er et almindeligt udtrykskarakter, som styrkerERDDAP™at se efter XYZ i begyndelsen af filnavnet. Dette forårsager XYZ, hvis det findes i starten af filnavnet, at blive fjernet (for eksempel filnavnet XYZAble.ncbliver Able.nc) .
*   &lt;IndlægExtractRegex&gt;".nc$ $ $ $ $&lt;/postExtractRegex&gt;
$ i sidste ende er en regelmæssig udtryks speciel karakter, som styrkerERDDAP™at kigge efter.nci slutningen af filnavnet. Siden . er et almindeligt udtrykskarakter (som matcher enhver figur) , det er kodet som ". her her (fordi 2E er hexadecimal karakter nummer i en periode) . Dette årsager.nc, hvis det findes i slutningen af filnavnet, skal fjernes (for eksempel den delvise filnavn Able.ncbliver Able) .
*   &lt;ekstraktRegex&gt;.\\*&lt;/ekstruder&gt;
.\\* regulære udtryk matcher alle resterende tegn (for eksempel den delvise filnavn Able bliver ekstrakt til den første fil) .
*   &lt;kolonnenavnForExtract&gt;stationID&lt;/columnNameForExtract&gt;
Dette fortællerERDDAP™at oprette en ny kildekolonne kaldetstationIDnår du læser hver fil. Hver række data til en given fil vil have teksten udvundet fra dens filnavn (for eksempel, Able) som værdien i værdienstationIDkolonne.

I de fleste tilfælde er der mange værdier for disse ekstrakt tags, der vil give de samme resultater -- regulære udtryk er meget fleksible. Men i et par tilfælde, er der bare en måde at få de ønskede resultater.
     
##### PseudosourceNames s s{#pseudo-sourcenames} 
Hver variabel i alle datasæt iERDDAP™har en [&lt;sourceName&gt;] (#sourcenavn) som angiver kildens navn for variablen. EDDTableFraFiles understøtter et par pseudosourceNames som udtrække en værdi fra nogle andre sted (f.eks. filnavnet eller værdien af en global egenskab) og fremme den værdi, der skal være en kolonne af konstante værdier for den mængde data (f.eks. tabellen af denne fils data) . For disse variable skal du angive variablens datatype via [&lt;DataType&gt;] (#datatype) tag. Hvis de ekstra oplysninger er en datoTime streng, angiver du formatet af datoTime streng i formatet[Enheder attribut](#string-time-units). I nærheden af The pseudosourceNameValgmuligheder er:
 
###### global:sourceNames s s{#global-sourcenames} 
En global metadata egenskab i hver kildedatafil kan fremmes for at være en kolonne af data. Hvis en variabel er&lt;sourceName&gt; har formatet
```
        <sourceName>global:*attributeName*</sourceName>
```
derefter, nårERDDAP™læser dataene fra en fil,ERDDAP™vil se efter en global egenskab af dette navn (for eksempel PI) og oprette en kolonne fyldt med attributets værdi. Dette er nyttigt, når attributten har forskellige værdier i forskellige kildefiler, fordi ellers ville brugerne kun se en af disse værdier for hele datasættet. For eksempel,
```
        <sourceName>global:PI</sourceName>
```
Når du promoverer en egenskab til at være data,ERDDAP™fjerner den tilsvarende egenskab. Dette er passende, fordi værdien sandsynligvis er forskellig i alle filer; der henviser til, at i det aggregerede datasæt iERDDAP™Det vil kun have en værdi. Hvis du vil, kan du tilføje en ny værdi til attributten for hele datasættet ved at tilføje&lt;Navnlig *attribut Navn* ↓ *nyt nyt nyt Værdiværdi* &lt;/att&gt; til datasættets globale [&lt;addAttributes&gt;] (#addattributes) . Til globale attributter, derERDDAP™kræver f.eks. institution, skal du tilføje en ny værdi for attributten.
     
###### variabel:sourceNames s s{#variable-sourcenames} 
En variabels metadata egenskab i hver fil kan fremmes for at være en kolonne af data. Hvis en variabel er&lt;[sourceName](#sourcename)\\&gt; har formatet
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
derefter, nårERDDAP™læser dataene fra en fil,ERDDAP™vil se efter den angivne egenskab (f.eks. ID) af den angivne variabel (for eksempel instrument) og oprette en kolonne fyldt med attributets værdi. Den overordnede variabel (for eksempel instrument) behøver ikke være en afdataVariables inkluderet i datasættets definition iERDDAP. For eksempel,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Dette er nyttigt, når attributten har forskellige værdier i forskellige kildefiler, fordi ellers ville brugerne kun se en af disse værdier for hele datasættet.

Når du promoverer en egenskab til at være data,ERDDAP™fjerner den tilsvarende egenskab. Dette er passende, fordi værdien sandsynligvis er forskellig i alle filer; der henviser til, at i det aggregerede datasæt iERDDAP™Det vil kun have en værdi. Hvis du vil, kan du tilføje en ny værdi til attributten for hele datasættet ved at tilføje&lt;Navnlig *attribut Navn* ↓ *nyt nyt nyt Værdiværdi* &lt;/att&gt; til variablens [&lt;addAttributes&gt;] (#addattributes) . For attributter, derERDDAP™kræver for eksempelioos\\_category  (Afhængigt af din opsætning) , du SKAL tilføje en ny værdi for attributten.
        
###### filnavnsourceNames s s{#filename-sourcenames} 
Du kan udtrække en del af en fils filnavn og fremme, at være en kolonne af data. pseudo [&lt;sourceName&gt;] (#sourcenavn) er det er
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
For eksempel,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Når EDDTableFraFiles læser data fra en fil, vil det sikre, at filnavnet (for eksempel A201807041442.slcpV1.nc) matcher det angivne regulære udtryk ("regex") og udtrække det angivne (i dette tilfælde, den første) Fang gruppe (som er en del omgivet af forældreheses) , for eksempel "201807041442". (Se dette[Indeks dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og og og[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) regex kan angives som en streng med eller uden omgivende citater. Hvis regex er angivet som en streng med omgivende citater, skal strengen være[JSON-stilstreng](https://www.json.org/json-en.html)  (med særlige tegn flygtet med "tegn) . capture gruppenummeret er normalt 1 (den første optagelse gruppe) , men kan være nummer.
     
###### VejnavnsourceNames s s{#pathname-sourcenames} 
Du kan udtrække en del af en fils fulde sti Navn (/directories/filName.ext) og fremme at være en kolonne af data. pseudo [&lt;sourceName&gt;] (#sourcenavn) er det er
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
For eksempel,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Når EDDTableFraFiles læser data fra en fil, vil det sikre den fulde vejnavn (for eksempel / Data/myDatasetID/BAY17/B201807041442.nc. Til denne test, vil mappe separatorerne altid være'/', aldrig "" '') matcher det angivne regulære udtryk ("regex") og udtrække det angivne (i dette tilfælde, den første) Fang gruppe (som er en del omgivet af forældreheses) , for eksempel "BAY17". (Se dette[Indeks dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og og og[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) regex kan angives som en streng med eller uden omgivende citater. Hvis regex er angivet som en streng med omgivende citater, skal strengen være en[JSON-stilstreng](https://www.json.org/json-en.html)  (med særlige tegn flygtet med "tegn) . capture gruppenummeret er normalt 1 (den første optagelse gruppe) , men kan være nummer.
         
##### "0 filer" Fejlmeddelelse{#0-files-error-message-2} 
* Hvis du kører[GenererDatasetsXml](#generatedatasetsxml)eller eller eller[Billeder af DasDds](#dasdds), eller hvis du forsøger at indlæse en EDDTableFra... Filer datasæt iERDDAP™, og du får en "0 filer" fejlmeddelelse, der angiver, atERDDAP™fundet 0 matchende filer i mappen (når du tror, at der er matchende filer i denne mappe) :
    * Tjek, at filerne virkelig er i denne mappe.
    * Tjek stavemåden af mappenavnet.
    * Tjek filenNameRegex. Det er virkelig nemt at lave fejl med regexes. Prøv regex .\\*, som skal matche alle filnavne. (Se dette[Indeks dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og og og[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Kontroller, at brugeren, der kører programmet (f.eks. bruger=tomcat (?) for Tomcat /ERDDAP) har 'læs' tilladelse til disse filer.
    * I nogle operativsystemer (for eksempel SELinux) Afhængigt af systemindstillinger skal brugeren, der løb programmet, have "læs" tilladelse til hele kæden af mapper, der fører til den mappe, der har filerne.
         
##### standardiser Hvad{#standardizewhat} 
* Når en del af EDDTableFraFiles er at aggregere et sæt kildefiler, for en given variabel, alle kildefiler skal have identiske egenskabsværdier for flere attributter:scale\\_factor,add\\_offset, \\_Unsigned,missing\\_value, \\_FillValue og enheder. Tænk på det: Hvis en fil har vindSpeed enheder=knots og en anden har vindSpeed enheder=m/s, skal dataværdierne fra de to filer ikke inkluderes i samme aggregerede datasæt. Så når EDDTableFraFiles først opretter datasættet, læser den egenskabsværdierne fra en fil, afviser derefter alle de filer, der har forskellige værdier for disse vigtige attributter. For de fleste samlinger af filer, er dette ikke et problem, fordi attributterne af alle variabler er konsekvent. Men for andre samlinger af filer, kan dette føre til 1%, 10%, 50%, 90% eller endda 99% af filerne afvises som "dårlig" filer. Det er besvær.
    
EDDTableFra filer har et system til at håndtere dette problem: standardiser Hvad. Standardiser Hvilken indstilling fortæller EDDTableFraFiles til at standardisere filerne så snart den læser dem, før EDDTableFraFiles ser på attributterne for at se, om de er konsekvent.
    
Klipsiden er: Hvis datasættet ikke har dette problem, skal du ikke bruge standardiser Hvad. standardiser Hvad har nogle potentielle risici (diskuteret nedenfor) og mangler. Så hvis du ikke rent faktisk har brug for funktionerne i standardiser Der er ingen grund til at dække de potentielle risici og mangler. Den største effektivitet er: Når forskellige standardiser Hvilke muligheder anvendes af et datasæt, betyder det, at kildefilerne gemmer data på signifikant forskellige måder (f.eks. med forskelligescale\\_factorog og ogadd\\_offset, eller med tidsstrenge ved hjælp af forskellige formater) . Således, for en given begrænsning i en brugerkonto, er der ingen måde for en given begrænsning påERDDAP™for at gøre en enkelt kilde-niveau begrænsninger, der kan anvendes til alle kildefiler. SåERDDAP™kan kun anvende de berørte begrænsninger på et højere niveau. SåERDDAP™skal læse data fra flere filer, før du anvender de højere, destinationsbegrænsninger. Så anmodninger om datasæt, der bruger standardiser Det tager længere tid at blive behandlet.
    
For at bruge dette system skal du angive
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
i området[datasets.xmlfor EDDTableFra... Filer datasæt](#eddtablefromfiles-skeleton-xml)(inden for te)&lt;datasæt&gt; tag).
    
The The The The The The The *standardiser Hvad* værdi angiver, hvilke ændringer EDDTableFraFiles skal forsøge at anvende. Ændringerne er summen af en kombination af:
    
1. Pakke
Dette gør mange almindelige og sikre operationer til at standardisere numeriske kolonner i filerne:
    * Hvisscale\\_factorog/elleradd\\_offsetattributter er til stede, fjerne dem og anvende dem til at pakke dataværdierne.
    * Fjernpakkede attributter (f.eks. faktiske\\_min, faktiske\\_max,actual\\_range,data\\_min,data\\_max, data\\_range,valid\\_min,valid\\_max,valid\\_range) , hvis nutid, hvis variablen var pakket, og hvis attributværdierne var pakket (Dette er vanskeligt, men med rimelighed pålidelig) .
    * Hvis \\_FillValue og/ellermissing\\_valueer til stede, konvertere disse dataværdier tilERDDAP's "standard" manglende værdier: MAX\\_VALUE for heltalstyper (f.eks. 127 for bytes, 32,767 for kort og 2,147,483,647 for ints, 9223372036854775807807 for lange) og NaN til dobbelt og fly.
    * Fjern den gamle \\_FillValue og/ellermissing\\_valueattributter attributter attributter (hvis nogen) , og erstatte dem med bare \\_FillValue=\\[te te te teERDDAP™Standard mangler værdi\\].
         
2. Standardiser Numeric Times
Hvis en numeriske kolonne har CF-style numeriske tidsenheder (" " " " *tidenUnits* siden siden siden *baseTime* ", f.eks. "dage siden 1900-01") , denne konverterer datoen Tidsværdier i"seconds since 1970-01-01T00:00:00Z"værdier og ændringer af attributten enheder for at angive det.
Hvis dette er valgt, og der er en chance for, at denne variabel harscale\\_factoreller eller elleradd\\_offset, #1 skal vælges også.
     
3. Påfør strengemissing\\_value  
Hvis en streng kolonne har \\_FillValue og/ellermissing\\_valueattributter, denne konverterer disse værdier til "" og fjerner attributter.
     
4. Find Numericmissing\\_value  
Hvis en numeriske kolonne ikke har \\_FillValue ellermissing\\_valueattributter, dette forsøger at identificere en ikke-definerede numeriskemissing\\_value  (fx -999, 9999, 1e37f) og konvertere forekomster af det til "standard" værdier (MAX\\_VALUE for heltalstyper, og NAN for dobbelter og svæver) .
     **Denne mulighed har en risiko:** hvis den største eller mindste gyldige dataværdi ser ud som en manglende værdi (fx 999) , så vil disse gyldige dataværdier blive konverteret til manglende værdier (f.eks. NaN) .
     
5. Ændre strenge "N/A" til ""
For hver streng kolonne, konvertere flere strenge almindeligt anvendt til at angive en manglende streng værdi til "". I øjeblikket ser dette ud til ".", "...", "-", "?", "??", "N/A", "NA", "none", "ikke relevant", "null", "ikke kendt", "uspecificeret". Strengsøgningen er case-infølsomme og anvendt efter strengene er trimmet. "nd" og "andet" er specielt ikke på listen.
     **Denne mulighed har en risiko:** Strenge, som du overvejer at være gyldige værdier kan konverteres til "".
     
6. Standardiser til ISO 8601 DateTimes
For hver streng kolonne, prøv at konvertere ikke-purely-numerisk streng datoTimes (f.eks. "Jan 2, 2018") til ISO 8601 streng datoTimes ("2018-01-02") .
     **Bemærk&#33;** at alle dataværdier for kolonnen skal bruge samme format, ellers vil denne mulighed ikke foretage ændringer i en given kolonne.
     **Denne mulighed har en risiko:** Hvis der er en kolonne med strengværdier, der bare sker for at se ud som en fælles dato Tidsformat, vil de blive konverteret til ISO 8601 String datoTimes.
     
7. Standardisere Compact DateTimes til ISO 8601 DateTimes
For hver streng eller iteger-type kolonne, prøv at konvertere rent-numerisk streng datoTimes (f.eks. "20180102") til ISO 8601 streng datoTimes ("2018-01-02") .
     **Bemærk&#33;** at alle dataværdier for kolonnen skal bruge samme format, ellers vil denne mulighed ikke foretage ændringer i en given kolonne.
     **Denne mulighed har en risiko:** Hvis der er en kolonne med værdier, der ikke er kompakt dato Tider, men se ud som kompakte datoTimes, vil de blive konverteret til ISO 8601 String datoTimes.
     
8. Standardiser enheder
Dette forsøger at standardisere enhedsstrengen for hver variabel. For eksempel "metre pr. sekund", "meter / sekunder","m.s^-1","m s-1", "m.s-1" vil alle blive konverteret til "m.s-1". Dette ændrer ikke dataværdierne. Dette fungerer godt for gyldigtUDUNITSenheder strenge, men kan have problemer med ugyldige eller komplekse strenge. Du kan håndtere problemer ved at angive specifikke fra-to par i&lt;Standardiser Udenheder&gt; i in in in inERDDAP's
    \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil. Send dine ændringer til Chris. John på noaa.gov, så de kan indarbejdes i standardmeddelelser.xml.
     **Denne mulighed har en risiko:** Dette kan påvirke nogle komplekse eller ugyldige enheder; dog kan du bruge det arbejde, der er beskrevet ovenfor til at omgå problemer, hvis de opstår.
         
    
Standardværdien Hvad er 0, som ikke gør noget.

Hvis / når du ændrer værdien af standardiser Hvad, næste gang datasættet er reloaded,ERDDAP™vil læse alle datafiler til datasættet for at genopbygge mini-databasen med oplysninger om hver fil. Hvis datasættet har masser af filer, vil dette tage lang tid.
    
Noter:

* En vanskelig ting er -
Standardiser Hvilken indstilling bruges til alle kolonner i kildefilen. Så f.eks. ved hjælp af #2048 kan med succes konvertere en kolonne med kompakt streng datoTimes til ISO 8601 String datoTimes, men det kan også fejlagtigt konvertere en kolonne med strenge, der bare sker for at se ud som kompakte datoTimes.
     
*   datasets.xmlog GenererDatasets X ml -
Det er især vanskeligt at få indstillingerne korrekt idatasets.xmlat gøre dine datasæt arbejde på den måde, du ønsker det til. Den bedste tilgang (som altid) er:
    1. Brug[GenererDatasetsXml](#generatedatasetsxml)og angive værdien af standardiser Hvad du gerne vil bruge.
    2. Brug[Billeder af DasDds](#dasdds)for at sikre, at datasættet indlæser korrekt og afspejler standardiseren Hvilken indstilling, du har angivet.
    3. Test datasættet ved hånden, når det er iERDDAP™for at sikre, at de berørte variable fungerer som forventet.
         
* Risikoer -
Valgmuligheder #256 og derover er mere risikabelt, dvs. der er en større chance for, atERDDAP™vil foretage en ændring, der ikke skal gøres. For eksempel kan mulighed #2048 ved et uheld konvertere en variabel med station ID strenge, der alle bare sker for at se ISO 8601 "compact" datoer (fx 20180102) i ISO 8601"extended"datoer ("2018-01-02") .
     
* Langsom efter en ændring --
Da værdien af standardiser Hvad ændrer de dataværdier, som EDDTableFraFiles ser for hver datafil, hvis du ændrer standardiseren Hvilken indstilling vil EDDTableFraFiles smide alle de cachelagrede oplysninger om hver fil (som indeholder min og max for hver datavariabel i hver fil) og læs hver datafil igen. Hvis et datasæt har et stort antal filer, kan dette være meget tidskrævende, så det vil tage lang tid for datasættet at indlæse første gangERDDAP™Genindlæs det, når du foretager ændringen.
     
* Heuristiske -
Valgmuligheder #256 og over brug heuristics til at foretage deres ændringer. Hvis du kommer over en situation, hvor heuristics træffer en dårlig beslutning, bedes du sende en beskrivelse af problemet til Chris. John på noaa. gov, så vi kan forbedre de heuristiske.
     
* Alternativer --
Hvis en af standardiser Hvilke muligheder ikke løser et problem for et givent datasæt, kan du muligvis løse problemet ved at gøre et problem[.ncml fil](#ncml-files)parallelt hver datafil og definere ændringer i ting i filerne, så filerne er konsekvent. Så fortæl EDDTableFra... Filer datasæt til at aggregere.ncml filer.
    
Eller brug[NCO](#netcdf-operators-nco)at foretage ændringer i filerne, så filerne er konsekvent.
        
##### Separat kolonner for år, måned, dato, time, minut, sekunder{#separate-columns-for-year-month-date-hour-minute-second} 
Det er ret almindeligt for tabulære datafiler at have separate kolonner i år, måned, dato, time, minut, sekund. Før før førERDDAP™v2.10, den eneste løsning var at redigere datafilen for at kombinere disse kolonner i en samlet tidskolonne. MedERDDAP™2.10+, kan du bruge den
[ []&lt;sourceName&gt;= *udtryks udtryk* &lt;sourceName&gt;] (#sourcenavn) at fortælleERDDAP™hvordan du kombinerer kildekolonnerne til at lave en samlet tidskolonne, så du ikke længere skal redigere kildefilen.
##### &lt;Supplerende oplysninger om SkipHeaderToRegex&gt{#skipheadertoregex} 
* [ []&lt;I nærheden af SkipHeaderToRegex&gt;] (#skipheadertoregex) --
FORSIGTIG. (Til EDDTableFraAsciiFiles og EDDTableFra kolonnearAsciiFiles-datasæt.)   
Når EDDTableFraAsciiFiles læser en datafil, vil det ignorere alle linjerne op til og herunder den linje, der matcher dette regulære udtryk. Standarden er "", som ikke bruger denne mulighed. Et eksempel er
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
som vil ignorere alle linjer op til og herunder en linje, der starter med "\\*\\*\\* END OF HEADER".

Når du bruger dette tag,&lt;kolonnenavneRow&gt; og&lt;førstDataRow&gt; handling, som hvis header er blevet fjernet, før filen læses. Du vil f.eks. bruge kolonnenavneRow=0, hvis kolonnenavnene er på rækken lige efter sidehovedet.

Hvis du vil bruge generere Datasæt Xml med et datasæt, der har brug for dette tag:

1. Lav en ny, midlertidig, prøvefil ved at kopiere en eksisterende fil og fjerne headeren.
2. Løb generere Datasæt Xml og angive, at prøvefilen.
3. Tilføj manuelt tilføjelsen&lt;springHeaderToRegex&gt; tag tildatasets.xmlLidt.
4. Slette den midlertidige, prøvefil.
5. Brug datasættet iERDDAP.
##### &lt;KicklinesRegex&gt;{#skiplinesregex} 
FORSIGTIG. (Til EDDTableFraAsciiFiles og EDDTableFra kolonnearAsciiFiles-datasæt.)   
Når EDDTableFraAsciiFiles læser en datafil, vil det ignorere alle linjer, der matcher dette regulære udtryk. Standarden er "", som ikke bruger denne mulighed. Et eksempel er
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
som vil ignorere alle linjer, der starter med "#".

Når du bruger dette tag,&lt;kolonnenavneRow&gt; og&lt;førstDataRow&gt; handle som om alle de matchende linjer blev fjernet, før filen læses. Du vil f.eks. bruge kolonnenavnsRow=0, selvom der er flere linjer, der starter med, f.eks. "#" i starten af filen.
    
#### EDDTableFraFiles skelet XML{#eddtablefromfiles-skeleton-xml} 
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
[ **EDDTableFraAsciiService** ](#eddtablefromasciiservice)er stort set en skærm scraper. Det er beregnet til at håndtere datakilder, der har en simpel webtjeneste til at anmode om data (Oftest en HTML-formular på en webside) og som kan returnere dataene i nogle struktureret ASCII format (f.eks. et koma-separeret værdi eller kolonnear ASCII tekstformat, ofte med andre oplysninger før og/eller efter data) .

EDDTableFraAsciiService er superklasse af alle EDDTableFraAsciiService... klasser. Du kan ikke bruge EDDTableFraAsciiService direkte. Brug i stedet en del af EDDTableFraAsciiService til at håndtere specifikke typer af tjenester:

*   [EDDTableFraAsciiServiceNOS](#eddtablefromasciiservicenos)Få data fraNOAANOS's ASCII tjenester.

I øjeblikket understøttes der ingen andre servicetyper. Men det er normalt relativt nemt at støtte andre tjenester, hvis de arbejder på en lignende måde. Kontakt os, hvis du har en anmodning.

#### Detaljer Detaljer{#details} 
Følgende oplysninger gælder for alle underklasser af EDDTableFraAsciiService.

* Kontrast --ERDDAP™tabulerede dataanmodninger kan lægge begrænsninger på enhver variabel. Den underliggende tjeneste kan eller kan ikke tillade begrænsninger på alle variabler. For eksempel understøtter mange tjenester kun begrænsninger på stationnavne, breddegrad, længde og tid. Så når en underklasse af EDDTableFraAsciiService får en anmodning om en del af et datasæt, passerer den så mange begrænsninger som muligt for kildedatatjenesten og derefter anvende de resterende begrænsninger for de data, der returneres af tjenesten, før de overdrager dataene til brugeren.
* Gyldig rækkevidde -- I modsætning til mange andre datasættyper kender EDDTableFraAsciiService normalt ikke rækkevidden af data for hver variabel, så det ikke hurtigt kan afvise anmodninger om data uden for det gyldige område.
* Parsing af ASCII Text Response -- Når EDDTableFraAsciiService får et svar fra en ASCII Text Service, skal det bekræfte, at svaret har det forventede format og oplysninger, og derefter udtrække dataene. Du kan angive formatet ved at bruge forskellige særlige tags i klumpen af XML for denne datasæt:
    *   &lt;førData1&gt; gennem&lt;førData10&gt; tags --- Du kan angive en række stykker tekst (så mange som du ønsker, op til 10) at EDDTableFraAsciiService skal se efter i headeren af ASCII tekst returneret af tjenesten med&lt;førData1&gt; gennem&lt;førData10&gt;. Dette er f.eks. nyttigt for at bekræfte, at svaret indeholder de forventede variable ved hjælp af de forventede enheder. Det sidste førData-tag, som du angiver den tekst, der opstår lige før dataene starter.
    *   &lt;efterData&gt; -- Dette angiver den tekst, som EDDTableFraAsciiService vil se efter i ASCII-teksten returneret af den tjeneste, der betyder slutningen af dataene.
    *   &lt;Ingen data&gt; -- Hvis EDDTableFraAsciiService finder denne tekst i ASCII-teksten returneret af tjenesten, konkluderer det, at der ikke er data, der svarer til anmodning.
#### EDDTableFraAsciiService skelet XML{#eddtablefromasciiservice-skeleton-xml} 
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
[ **EDDTableFraAsciiServiceNOS** ](#eddtablefromasciiservicenos)gør EDDTable datasæt fra ASCII tekstdatatjenester, der tilbydes afNOAA's[National Ocean Service (NOS) ](https://oceanservice.noaa.gov/). For information om, hvordan denne klasse fungerer og hvordan man bruger den, se denne klasses superklasse[EDDTableFraAsciiService](#eddtablefromasciiservice). Det er usandsynligt, at nogen andre end Bob Simons bliver nødt til at bruge denne subclass.

Da dataene i respons fra en NOS-tjeneste bruger en kolonnear ASCII tekstformat, skal datavariabler andre end breddegrad og længdegrad have en særlig egenskab, der angiver, hvilke tegn på hver datalinje indeholder de variable data, f.eks.
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFraAllDatasets{#eddtablefromalldatasets} 
[ **EDDTableFraAllDatasets** ](#eddtablefromalldatasets)er et datasæt på højere niveau, som har oplysninger om alle de andre datasæt, der i øjeblikket er indlæst i dine dataERDDAP. I modsætning til andre typer af datasæt, er der ingen specifikation forallDatasetsDatasæt idatasets.xml.ERDDAP™Opret automatisk en EDDTableFraAllDatasets datasæt (med meddatasetID= = = = =allDatasets) . Således enallDatasetsDatasæt vil blive oprettet i hverERDDAP™installation og vil arbejde på samme måde på hverERDDAP™installation.

The The The The The The TheallDatasetsDatasæt er et tabulært datasæt. Det har en række oplysninger for hver datasæt. Det har kolonner med oplysninger om hvert datasæt, f.eks.datasetID, tilgængelig, institution, titel, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime osv. Fordi fordiallDatasetser et tabulært datasæt, kan du forespørge den samme måde, du kan forespørge andre tabulære datasæt iERDDAP™, og du kan angive filtypen for svaret. Dette lader brugerne søge efter interessedata på meget kraftige måder.
 
### EDDTableFraAsciiFiles{#eddtablefromasciifiles} 
[ **EDDTableFraAsciiFiles** ](#eddtablefromasciifiles)aggregerer data fra komma-, fane-, semikolonin- eller rum-separatede tabulære ASCII-datafiler.

* Oftest vil filerne have kolonnenavne på den første række og data, der starter på den anden række. (Her hedder den første række af filen ro nummer 1.) Men du kan bruge&lt;kolonnenavneRow&gt; og&lt;førsteDataRow&gt; i dindatasets.xmlfil for at angive et andet rækkenummer.
*   ERDDAP™Tillad rækker af data til at have forskellige dataværdier.ERDDAP™antager, at de manglende dataværdier er de endelige kolonner i rækken.ERDDAP™tildele standard manglende værdiværdier for de manglende dataværdier. (tilføjet v1.56) 
* ASCII-filer er nemme at arbejde med, men de er ikke den mest effektive måde at lagre/retrieve-data. For større effektivitet, gemme filerne somNetCDFv3.ncfiler filer filer (med en dimension, "row", delt af alle variabler) I stedet. Du kan[Brug af brugERDDAP™til at generere de nye filer](#millions-of-files).
* Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. På grund af den samlede mangel på metadata i ASCII-filer, skal du altid redigere resultaterne af GenererDatasetsXml.
* ADVARSEL: HvornårERDDAP™Læser ASCII datafiler, hvis det finder en fejl på en given linje (f.eks. forkert antal varer) , det logger en advarselsmeddelelse ("WARNING: Bad linje (s s s) af data" ... med en liste over de dårlige linjer på efterfølgende linjer) Til højre[log.txt-fil](/docs/server-admin/additional-information#log)og derefter fortsætter med at læse resten af datafilen. Det er derfor dit ansvar at se periodisk (eller skrive et script til at gøre det) for denne meddelelse i loget. txt, så du kan løse problemerne i datafiler.ERDDAP™opsættes på denne måde, så brugerne kan fortsætte med at læse alle de tilgængelige gyldige data, selvom nogle linjer af filen har fejl.
     
### EDDTableFra Billeder af AwsXmlFiles{#eddtablefromawsxmlfiles} 
[ **EDDTableFra Billeder af AwsXmlFiles** ](#eddtablefromawsxmlfiles)aggregerer data fra et sæt Automatisk Vejrstation (AWS) XML-datafiler ved hjælp af WeatherBug Rest XML API (som ikke længere er aktiv) .

* Denne type fil er en enkel, men ineffektiv måde at gemme dataene, fordi hver fil normalt synes at indeholde observationen fra blot et tidspunkt. Så der kan være et stort antal filer. Hvis du vil forbedre ydeevnen, skal du overveje at konsolidere grupper af observationer (en uges værd?) i in in in inNetCDFv3.ncfiler filer filer (bedste:.ncfiler med de[CF Diskret Sampling Geometries (DSG) Konguous Ragged Array format](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) og brug af[EDDTableFraMultidimNcFiles](#eddtablefrommultidimncfiles)  (eller eller eller[EDDTableFraNcCFFiles](#eddtablefromnccffiles)) til at tjene dataene. Du kan[Brug af brugERDDAP™til at generere de nye filer](#millions-of-files).
* Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.
     
### EDDTableFra kolonnearAsciiFiles{#eddtablefromcolumnarasciifiles} 
[ **EDDTableFra kolonnearAsciiFiles** ](#eddtablefromcolumnarasciifiles)aggregerer data fra tabular ASCII datafiler med faste bredde kolonner.

* Oftest vil filerne have kolonnenavne på den første række og data, der starter på den anden række. Den første linje/række i filen kaldes række #1. Men du kan bruge&lt;kolonnenavneRow&gt; og&lt;førsteDataRow&gt; i dindatasets.xmlfil for at angive et andet rækkenummer.
* The The The The The The The&lt;addAttributes&gt; for hver&lt;dataVariable&gt; for disse datasæt skal inkludere disse to særlige attributter:
    
    *   &lt;ont navnene *Helteger* &lt;påt&gt; - Angiv tegnkolonnen i hver linje, der er starten på denne datavariable.
    *   &lt;ont navn - Wikipedia *Helteger* &lt;påt&gt; - Angiv tegnkolonnen i hver linje, der er 1 efter afslutningen af denne data variabel.
    
Den første figurkolonne kaldes kolonne #0.
For eksempel, for denne fil, der har tidsværdier, der viser temperaturværdier :
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
tidens datavariable ville have
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
og tidens datavariable ville have
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Disse attributter skal specificeres for alle variabler undtagen[Fast værdi](#fixed-value-sourcenames)og og og[filnavne](#filename-sourcenames)variabler.
* ASCII-filer er nemme at arbejde med, men de er ikke en effektiv måde at gemme/retrieve-data. For større effektivitet, gemme filerne somNetCDFv3.ncfiler filer filer (med en dimension, "row", delt af alle variabler) I stedet. Du kan[Brug af brugERDDAP™til at generere de nye filer](#millions-of-files).
* Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. På grund af vanskeligheden ved at bestemme start- og slutpositioner for hver datakolonne og den samlede mangel på metadata i ASCII-filer, skal du altid redigere resultaterne fra GenererDatasetsXml.
     
### EDDTableFraHttpGet{#eddtablefromhttpget} 
EDDTabel FraHttpGet er forskellige fra alle andre typer datasæt iERDDAP™i det, det har et system, hvor specifikke "forfattere" kan tilføje data, revidere data eller slette data fra datasættet regelmæssigtHTTP GETeller eller eller[Tilmeld dig](#http-post)anmodninger fra et computerprogram, et script eller en browser. Datasættet er forespørges af brugere på samme måde, at alle andre EDDTable datasæt er forespørgelige iERDDAP. Se beskrivelsen af denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), at læse om de funktioner, der er arvet fra denne superklasse.

De unikke funktioner i EDDTableFraHtttpGet er beskrevet nedenfor. Du skal læse alt dette indledende afsnit og forstå det; ellers kan du have urealistiske forventninger eller få dig selv i problemer, der er svært at løse.

#### Præsenteret brug{#intended-use} 
Dette system er beregnet til:

* Tabular (i situ) data, ikke gitterede data.
* Realtime data -
Målet er at tillade en forfatter (f.eks. sensoren, et automatiseret QC-script eller et bestemt menneske) for at foretage en ændring i datasættet (via en[.insert eller .delete kommando](#insert-and-delete)) og gør denne ændring tilgængelig forERDDAP™brugere, alt i mindre end 1 sekund, og muligvis meget hurtigere. Det meste af det 1 sekund er netværkstid.ERDDAP™kan behandle anmodningen i ca. 1 ms og dataene er umiddelbart tilgængelige for brugerne. Dette er en[hurtigt](#httpget-speed),[robust robust robust robust](#robust), og[pålideligt system](#system-reliability).
* Næsten enhver hyppighed af data -
Dette system kan acceptere infrequent data (fx dagligt) gennem meget hyppig data (f.eks. 100 Hz data) . Hvis du optimerer systemet, kan det håndtere højere frekvensdata (måske 10 KHz data, hvis du går til ekstremer) .
* Data fra en sensor eller en samling af lignende sensorer.
*   [Versionering](#versioning)/ / / /[Reproducible Science](https://en.wikipedia.org/wiki/Reproducibility)/ / / /DOIs --
Situationer, hvor du skal kunne foretage ændringer i dataene (f.eks. ændre et kvalitets kontrol flag) , ved hvilken forfatter lavede hver ændring, kender tidsstempel af, hvornår forfatteren gjorde ændringen, og (efter anmodning) kunne se de originale data fra før ændringen blev foretaget. Derfor er disse datasets berettiget til at[DOIs s s](https://en.wikipedia.org/wiki/Digital_object_identifier). fordi de mødesDOIkrav om, at datasættet ikke ændrer sig, undtagen ved sammenlægning. Generelt, i nærheden af realtid datasæt er ikke berettiget til atDOIs fordi dataene ofte er retroaktivt ændret (f.eks. til QA/QC formål) .
     

Når data er i en EDDTableFraHtttpGet dataset, kan enhver bruger anmode om data på samme måde, at de anmoder om data fra andre EDDTable datasæt.
     
#### Eksperimentel: Vær forsigtig{#experimental-be-careful} 
Da dette system er nyt, og da tabte miljødata ikke kan påberåbes, bør du behandle EDDTableFraHtttpGet som eksperimentel. Hvis du går fra et andet system, skal du køre det gamle system og det nye system parallelt, indtil du er sikker på, at det nye system fungerer godt (uger eller måneder, ikke kun timer eller dage) . I alle tilfælde skal du sørge for, at dit system separat arkiverer .insert og . Slette webadresser, der sendes til EDDTableFraHttpGet dataset (selvom bare i Apache og/eller Tomcat logger) , mindst for et stykke tid. Og i alle tilfælde skal du sørge for, at de datafiler, der er oprettet af din EDDTableFraHttpGet dataset rutinemæssigt sikkerhedskopieres op til eksterne datalagringsenheder. (Bemærk, at[rsync](https://en.wikipedia.org/wiki/Rsync). kan sikkerhedskopiere de datafiler, der er oprettet af EDDTableFraHttpGet meget effektivt.)   
     
#### .insert og .delete{#insert-and-delete} 

For alle datasæt iERDDAP™, når du sender en anmodning tilERDDAP™for en del af dataene i et datasæt, angiver du den filtype, du ønsker for svaret, f.eks. .csv,.htmlTable,.nc,.json. EDDTableFraHttp Få dette system til at støtte to ekstra "filtyper", som kan indsætte (eller ændringer) eller slette data i datasættet:

* .insert
    * Anmodningen er formateret som en standard HTML form svar, med nøgle=værdipar, adskilt af '&'. For eksempel,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
fortæller omERDDAP™til at tilføje eller ændre dataene forstationID=46088 for det angivne tidspunkt.
    * Forfatteren af denne ændring er JohnSmith og nøglen er nogleKey1.
    * URL'en skal indeholde gyldige værdier (manglende værdier) for alle[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)
    * Hvis værdierne af værdiernehttpGetRequired Varer i anmodningen (fx,stationIDog tid) match værdierne på en række allerede i datasættet, de nye værdier effektivt overskrive de gamle værdier (Selvom de gamle værdier stadig er tilgængelige, hvis brugeren anmoder data fra en tidligere[version version version](#versioning)af datasættet) .
    * .insert URL skal aldrig indeholde &timestamp= (ERDDAP™genererer den værdi) eller & kommand= (der er angivet af .insert (som er kommando=0) eller . Slette (som er kommando= 1 1 1 1) ) .
    * Hvis URL'en .insert ikke angiver værdier for andre kolonner, der er i datasættet, antages de at være de oprindelige manglende værdier (MAX\\_VALUE for integer data typer, NaN for fly og doubler, og "" for strenge) .
             
    * . Slette
        * Anmodningen er formateret som en standard HTML form svar, med nøgle=værdipar, adskilt af '&'. For eksempel,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
fortæller omERDDAP™at slette dataene forstationID=46088 på det angivne tidspunkt.
        * Forfatteren af denne ændring er JohnSmith og nøglen er nogleKey1.
        * URL'en skal angive URL'en[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)på anmodning (fx,stationIDog tid) . Hvis disse værdier matcher værdierne på en række allerede i datasættet (som de normalt vil) , de gamle værdier slettes effektivt (Selvom de gamle værdier stadig er tilgængelige, hvis en bruger anmoder om data fra en tidligere[version version version](#versioning)af datasættet) .
        * Der er ingen grund til at angive værdier for ikke-HttpGetRequiredVariables, andre end forfatter, som er nødvendig for at godkende anmodningen.
             
    
Detaljer:
    * .insert og .delete anmodninger er formateret som standard HTML form svar, med nøgle=værdipar, adskilt af '&'. Værdierne skal være[procentkodet](https://en.wikipedia.org/wiki/Percent-encoding). Således skal du indtaste særlige tegn i form %HH, hvor HH er den 2 cifrede hexadecimal værdi af tegnet. Normalt skal du blot konvertere et par tegn på tegn: % i %25, og i %26, " i %22,&lt;i %3C, = i %3D, &gt; i %3E, + i %2B,|i %7C,\\[i %5B,\\]i %5D, plads til %20, og konvertere alle tegn over #127 i deres UTF-8 form og derefter encode hver af UTF-8-form ind i %HH-formatet (spørge en programmør til hjælp) .
    * .insert og .delete anmodninger skal indeholde[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)f.eks.stationIDog tid. For .insert anmodninger, variabler, der ikke er angivet i anmodningen, antages at være manglende værdier (MAX\\_VALUE for heltalsvariabler, NaN for flyt og dobbelt variabler, og en tom streng til strenge variabler) . Til . Slette anmodninger, værdier for ikke-HttpGetRequired Varer (andet end forfatter, som kræves) ignoreres.
    * .insert og .delete anmodninger skal indeholde navnet på forfatteren og forfatterens nøgle via en parameter i formforfatteren= *Forfatter\\_key* som den sidste parameter i anmodningen. At få denne til at være sidste sikrer, at hele anmodningen er modtaget afERDDAP. Kun forfatteren (Ikke nøglen) gemmes i datafilen. Du skal angive listen over tilladt *Forfatter\\_key* 's via den globale egenskab[httpGetKeys](#httpgetkeys)
    * .insert og .delete parametre kan være scalar (enkelt single) værdier eller matrixer af enhver længde i form\\[værdi1, værdi2, værdi3,..., værdiN\\]. For en given anmodning skal alle variabler med arrays have matrixer med samme antal værdier (ellers er det en fejl) . Hvis en anmodning har scalar- og matrixværdier, kopieres scalarværdierne for at blive arrays med samme længde som de angivne matrixer, f.eks.stationID=46088 kan blive behandlet som &stationID= = = = =\\[46088,46088,46088\\]. Arrays er nøglen til[høj gennemløb](#httpget-speed). Uden arrays, vil det være svært at .insert eller . Slette mere end 8 rækker data per sekund fra en fjern forfatter (på grund af alle netledningens hoved) . Med arrays, vil det være nemt at .insert eller slette mere end 1000 rækker data per sekund fra en fjern sensor.
    * .insert og .delete acceptere (uden en fejlmeddelelse) flydende punktnumre, når integers forventes. I disse tilfælde runder datasættet værdierne til integers.
    * .insert og .delete acceptere (uden en fejlmeddelelse) tal, der er uden for rækkevidde af variablens datatype. I disse tilfælde gemmer datasættet værdierne somERDDAP's oprindelige manglende værdier for denne datatype (MAX\\_VALUE for heltalstyper og NaN til fly og dobbelt) .
         
#### Svar{#response} 
Hvis .insert eller .delete URL lykkes, vil HTTP-responskoden være 200 (OK OK) og svaret vil være tekst med en.jsonobjekt, f.eks.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Bemærk, at timetamps har millimeters præcision.

Hvis .insert eller .delete URL mislykkes, vil du få en HTTP-responskode andet end 200 (Okay Okay) , f.eks. Fejl 403 Forbudt, hvis du indsender en forkert forfatter\\_key værdi.ERDDAP™sender HTTP-responskoden (ikke, f.eks..jsonformateret fejl) fordi det er, hvordan tingene sker på internettet, og fordi fejl kan forekomme overalt i systemet (f.eks. i netværket, som returnerer en HTTP-fejl) . Hvis fejlen er fraERDDAP™, svaret kan indeholde nogle tekst (Ikke ikke.json) med en mere detaljeret forklaring på, hvad der gik galt, men HTTP-responskoden (200=OK, noget andet er besvær) er den rigtige måde at kontrollere, om .insert eller .delete lykkedes. Hvis du tjekker HTTP-responskoden ikke er muligt eller er inkonvenient, skal du søge efter "status-succes" i svarteksten, som skal være en pålidelig indikation af succes.
    
#### Log filer{#log-files} 
Når EDDTableFraHttpGet modtager .insert og .delete kommandoer, føjer den blot oplysningerne til den relevante fil i et sæt logfiler, som hver er en tabel gemt i en tabel, der er gemt i en tabel, der er gemt i en[JSON Linje CSV-fil](https://jsonlines.org/examples/). Når en bruger foretager en anmodning om data,ERDDAP™Læs hurtigt de relevante logfiler, anvende ændringerne til datasættet i den rækkefølge, de blev foretaget, og derefter filtrerer anmodningen via brugerens begrænsninger som andre andre andreERDDAP™anmodning om data. Partitionering af dataene i forskellige logfiler, opbevaring af forskellige dele af information (f.eks. kommandoens tidsstempel, og om kommandoen var .insert eller .delete) , og forskellige aspekter af opsætningen af datasættet, alt gør det muligt forERDDAPtil at gemme data til og hente data fra denne datasæt meget hurtigt og meget effektivt.
     
#### Sikkerhed og forfatter{#security-and-author} 
Hver .insert og .delete kommando skal indeholde & Author= *Forfatter\\_key* som den sidste parameter, hvor forfatter\\_key består af forfatterens identifikator (du valgte: navn, initialer, pseudonym, nummer) , en understregning og en hemmelig nøgle. The The The The The The TheERDDAP™Administrator vil arbejde med forfattere for at generere listen over gyldige forfatter\\_key værdier, som kan ændres til enhver tid.
Når EDDTableFraHttpGet modtager en .insert eller .delete kommando, sikrer det, at forfatterenID\\_key er den sidste parameter og gyldig. Fordi det er den sidste parameter, indikerer det, at hele kommandolinjen nåedeERDDAP™og blev ikke afkortet. Den hemmelige nøgle sikrer, at kun specifikke forfattere kan indsætte eller slette data i datasættet.ERDDAP™Så udtrækker forfatterenID og gemmer, at i forfatteren variabel, så alle kan se, hvem der var ansvarlig for en given ændring af datasættet.
.insert og .delete kommandoer kan kun gøres viahttps:  (sikker sikkerhed)  ERDDAP™URL'er. Dette sikrer, at oplysningerne overføres, holdes hemmelig under transit.
     
#### gangetamp{#timestamp} 
Som en del af logsystemet tilføjer EDDTableFraHttpGet et tidsstempel (den tid, detERDDAPmodtaget anmodningen) til hver kommando, at det gemmer i logfiler. Fordi fordiERDDAP™genererer tidsstempel, ikke forfatterne, det er ligegyldigt, om forskellige forfattere foretager ændringer fra computere med ure indstillet til lidt forskellige gange. Timetampen angiver det tidspunkt, hvor ændringen blev foretaget til datasættet.
     
#### HTTP POST{#http-post} 
*   ["Hvad med HTTP POST?&#33;"](#http-post)  
HTTP[Tilmeld dig](https://en.wikipedia.org/wiki/POST_(HTTP)) er det bedre alternativ (sammenlignet medHTTP GET) for at sende oplysninger fra en klient til en HTTP-server. Hvis du kan, eller hvis du virkelig ønsker at forbedre sikkerheden, skal du bruge POST i stedet for GET til at sende oplysningerne tilERDDAP. POST er mere sikker, fordi: med GET oghttps, URL'en overføres på en sikker måde, men hele URL'en (herunder parametre, herunder forfatteren\\_key) vil blive skrevet til Apache, Tomcat ogERDDAP™log filer, hvor nogen kunne læse dem, hvis filerne ikke er korrekt sikret. Med POST overføres parametrene på en sikker måde og skrives ikke til logfilerne. POST er lidt sværere for klienter at arbejde med og understøttes ikke så bredt af klient software, men programmeringssprog understøtter det. Det indhold, du sender til datasættet via GET eller POST, vil være det samme, bare formateret på en anden måde.
     
#### httpGetRequired Varer Global Attribute{#httpgetrequiredvariables-global-attribute} 
En væsentlig del af, hvad der gør dette hele systemarbejde er den krævede globale egenskabhttpGetRequired Varer, som er en kommunaliseret liste overdataVariablekildenavne, der entydigt identificerer en række data. Det skal være så minimalt som muligt, og vil næsten altid inkludere tidsvariablen. For eksempel, her er den anbefaledehttpGetRequired Varer til hver af de[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (Selvfølgelig kan ID-navnene være forskellige i dit datasæt.) :

* For TimeSeries:stationID, tid
* Til Trajectory: trajectoryID, tid
* Til Profil: tid (At antage tid er profilen\\_id) , dybde
* For TimeSeries Profil:stationID, tid (At antage tid er profilen\\_id) , dybde
* Til Trajectory Profil: trajectoryID, tid (At antage tid er profilen\\_id) , dybde

    
Tager TimeSeries som et eksempel:
I betragtning af en .insert kommando, der omfatterstationID=46088 og tid=2016-06-23T19:53:00Z (og andre værdier for andre variabler) :
* Hvis der ikke er nogen eksisterende data til den pågældende station, og den tid, vil effekten være at tilføje dataene til datasættet.
* Hvis der er eksisterende data til den pågældende station, og denne gang vil effekten erstatte den eksisterende række af data med disse nye data. (Selvfølgelig, sidenERDDAP™Hold log på enhver kommando, den modtager, de gamle data er stadig i log. Hvis en bruger anmoder om data fra en version af datasættet før denne ændring, vil de se de ældre data.)   
         
#### httpHoteller i nærheden af GetDirectoryStructure{#httpgetdirectorystructure} 
*   [httpGetDirectory Struktur Global Attribute og data (Log ind) Filnavne](#httpgetdirectorystructure)  
En del af, hvad der gør dette hele systemet effektivt er, atERDDAP™skaber et sæt data (log log ind) filer, hver med en anden del af datasættet. Hvis disse er indstillet godt,ERDDAP™vil kunne reagere hurtigt på de fleste anmodninger om data. Denne opsætning er angivet afhttpGetDirectoryStructure global attribut, som er en streng, der ligner et relativt filnavn, f.eks. "stationID/10 år", men er faktisk en specifikation for mappestrukturen. De dele, der angiver, hvordan mappe og filnavne til dataene (log log ind) filer vil blive konstrueret.
    
    * Hvis en del er et heltals (&gt;= 1 1 1 1) plus en tidPeriod (millisekunder, andet, minut, time, dato, måned, år eller deres flertal) , f.eks. 10 år, så vil EDDTableFraHttpGet dataset tage tidsværdien for rækken af data (f.eks. 2016-06-23T19:53:00Z) , beregne den tid, der er afkortet til den præcision (f.eks. 2010) , og lav en mappe eller filnavn fra det.
        
Målet er at få en rimelig stor mængde data i hver fil, men langt mindre end 2 GB.
        
    * Ellers skal den del af specifikationen være endataVariable'ssourceNamef.eks.stationID. I dette tilfælde vil EDDTableFraHtttpGet lave en mappe eller filnavn fra værdien af den variable for den nye række af data (f.eks. "46088") .
    
Fordi .insert og .delete kommandodata gemmes i specifikke data (log log ind) filer, EDDTableFraHttpGet normalt kun skal åbne en eller et par data (log log ind) filer til at finde dataene til en given brugerkonto. Og fordi hver data (log log ind) Filen har alle de relevante oplysninger til sin størrelse af datasættet, det er hurtigt og nemt for EDDTableFraHtttpGet at foretage en bestemt version (eller den aktuelle version) af datasættet til dataene i den pågældende fil (og ikke skal generere den ønskede version af hele datasættet) .
    
Generelle retningslinjer baseres på datamængden og hyppigheden. Hvis vi antager 100 aftes pr. række data, så...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Hvis mappestrukturen f.eks. erstationID/2 måneder og du indsætter data fra to stationer (46088 og 46155) med tidsværdier fra Dec 2015 gennem maj 2016 EDDTableFraHtp Få vil oprette mapper ved navn 46088 og 46155 og oprette filer i hver opkaldt 2015-11.jsonl, 2016-01.jsonl, 2016-03.jsonl, 2016-05.jsonl l l l (hver holder 2 måneders værdi for den relevante station) . Til enhver tid i fremtiden, hvis du bruger .insert eller .delete til at ændre eller slette dataene for f.eks. station 46088 på 2016-04T14:45:00Z, EDDTableFraHtp Få vil føje denne kommando til 46088/2016-03.jsonl, de relevante data (log log ind) fil. Og klart, det er fint at tilføje data til andre stationer på ethvert tidspunkt i fremtiden, da datasættet simpelthen vil oprette yderligere mapper efter behov for at holde dataene fra de nye stationer.
    
#### httpGetKeys{#httpgetkeys} 
Alle EDDTable FraHttp Få datasæt skal have en global egenskabhttpGetKeys, der angiver listen over tilladte forfattere og deres hemmelige nøgler som en kommunal liste over *Forfatter\\_key* f.eks. JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3 .
* Forfatter\\_key's er tilfældefølsomme og skal være helt ASCII tegn (#33 - #126, og uden nogen komma, " eller " tegn
* Nøgler er som adgangskoder, så de SKAL være &gt;=8 tegn, svært at gætte, og uden interne ordbog ord. Du bør behandle dem, da du ville behandle adgangskoder - holde dem private.
* Den første "\\_" figur skiller forfatteren fra nøglen, så forfatternavnet ikke kan inkludere en "\\_" figur (men en nøgle kan) .
* Enhver givet forfatter kan have en eller flere forfatter\\_key's, f.eks. JohnSmith\\_some Hoteller i nærheden af JohnSmith\\_some Nøgle7, osv.
* Du kan ændre værdien af denne attribut enhver tid. Ændringerne træder i kraft næste gang datasættet er indlæst.
* Disse oplysninger vil blive fjernet fra datasættets globaleAttributes, før den offentliggøres.
* Hver anmodning til datasættet til at indsætte eller slette data skal indeholde en &forfatter= *Forfatter\\_key* parameter. Efter at have bekræftet nøglens gyldighedERDDAP™Gem kun forfatterdelen (Ikke nøglen) i datafilen.

#### Opsæt op{#set-up} 

Her er de anbefalede trin til at oprette en EDDTableFraHttpGet dataset:

1. Gør hovedmappen til at holde disse datasæts data. Lad os f.eks. bruge/data/testGet/ . Brugeren, der kører GenererDatasetsXml, og brugeren kørerERDDAP™Skal begge have adgang til denne mappe.
     
2. Brug en teksteditor til at lave en prøve.jsonl CSV-fil med udvidelsen.jsonl i denne mappe.
Navnet er ikke vigtigt. Du kan f.eks. kalde det prøve.jsonl l l l
Lav en 2 linje.jsonl CSV-fil, med kolonnenavne på den første linje og dummy/typical værdier (af den korrekte datatype) på den anden linje. Her er en prøvefil, der er egnet til en samling affeatureType=Tidligere data, der målt luft og vandtemperatur.
    \\[For For For For ForfeatureType=Trajectory, kan du ændrestationIDat være trajectoryID.\\]  
    \\[For For For For ForfeatureType=Profil, kan du ændrestationIDfor at være profilID og tilføje en dybde variabel.\\]
    
    \\[" " " "stationID",""time", "latitude", "langitude", "airTemp", "waterTemp", "timestamp", "forfatter", "command"\\]
    \\["myStation", "2018-06-25T17:00:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, "NoeBody", 0\\]
    
Bemærk:
    * De faktiske dataværdier betyder ikke, fordi du i sidste ende vil slette denne fil, men de skal være af den korrekte datatype. Især bør tidsvariablen bruge det samme format, som de faktiske data fra kilden vil bruge.
    * Til alle variable,sourceNamevil svare pådestinationName, så brug de korrekte / endelige variable navne nu, herunder tid, breddegrad, længde og undertiden dybde eller højde, hvis variabler med disse oplysninger vil blive inkluderet.
    * Der vil næsten altid være en variabel opkaldt tid, som registrerer den tid, observationen blev foretaget. Det kan være dataType String med[enheder, der er egnet til strenge tider](#string-time-units)  (fx,yyyy-MM-dd'T'HH:mm:ss.SSSZ) eller data Type dobbelt med[enheder, der er egnet til numeriske tider](#time-units)  (g., sekunder siden 1970-01T00:00:00Z eller en anden base tid) .
    * Tre af kolonnerne (Normalt de sidste tre) skal være tidsstempel, forfatter, kommando.
    * Timetamp kolonnen vil blive brugt af EDDTableFraHttpGet til at tilføje et tidsstempel, der angiver, hvornår den tilføjede en given linje af data til datafilen. Det vil have dataType dobbelt og enheder sekunder siden 1970-01T00:00:00Z.
    * Forfatterkolonnen med dataType String vil blive brugt til at registrere, hvilken autoriserede forfatter har givet denne linjes data. Forfattere er angivet af de[httpGetKeys global attribut](#httpgetkeys). Selvom tasterne er angivet som *Forfatter\\_key* og er i "request" URL i denne formular, kun forfatterdelen gemmes i datafilen.
    * Kommandokolonnen med dataType byte vil angive, om dataene på denne linje er en indsættelse (0) eller sletning (1 1 1 1) .
         
3. Løb GenererDatasets Xml og fortælle det
    
    1. Dataset type er EDDTableFraHtttpGet
    2. Skabelonen er (for dette eksempel) / Data/test Få / få /
    3. Prøvefilen er (for dette eksempel) / Data/testGet/startup.jsonl l l l
    4. The The The The The The ThehttpGetRequired Varer er (for dette eksempel)  stationID, tid Se beskrivelse af[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)nedenfor.
    5. Hvis data indsamles hvert femte minut, indsamles oplysningernehttpGetDirectoryStructure for dette eksempel erstationID/2 måneder . Se beskrivelse af[httpHoteller i nærheden af GetDirectoryStructure](#httpgetdirectorystructure)nedenfor.
    6. The The The The The The The[httpGetKeys](#httpgetkeys)
    
Tilføj output (klumpen afdatasets.xmlfor datasættet) til at tildatasets.xml.
     
4. Redigere redigeringendatasets.xmlBeskåret for denne datasæt for at gøre det korrekt og komplet.
Kan du ikke udskifte alle?? med korrekt indhold.
     
5. For te&lt;fileTableInMemory&gt; indstilling:
    * Indstil dette til sand, hvis datasættet normalt bliver hyppig .insert og/eller .delete anmodninger (f.eks. oftere end én gang hver 10 sekunder) . Dette hjælper EDDTableFraHttpGet reagerer hurtigere på .insert og/eller .delete anmodninger. Hvis du indstiller dette til sand, EDDTableFraHttpGet vil stadig gemme filenTable og relaterede oplysninger til disk periodisk (efter behov, groft hver 5 sekunder) .
    * Sæt dette til falsk (Standard) hvis datasættet normalt får infrequent .insert og/eller .delete anmodninger (f.eks. mindre end én gang hver 10 sekunder) .
         
6. Bemærk: Det er muligt at bruge&lt;cacheFraUrl&gt; og relaterede indstillinger idatasets.xmlfor EDDTable FraHttp Få datasæt som en måde at lave og vedligeholde en lokal kopi af en ekstern EDDTableFraHttpGet dataset på en anden mådeERDDAP. Men i dette tilfælde vil denne lokale datasæt afvise enhver .insert og .delete anmodninger.

#### Brug af EDDTable FraHttpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Forfattere kan gøre "requests", som[Indsæt data til eller slette data fra datasættet](#insert-and-delete).
     
* Efter rigtige data er blevet indsat i datasættet, kan du og skal slette den originale prøvedatafil.
     
* Brugere kan anmode om data fra datasættet, da de gør for andre EDDTable datasæt iERDDAP. Hvis anmodningen ikke indeholder en begrænsning på tidsstempelkolonnen, får anmodningen data fra den aktuelle version af datasættet (logfilen efter behandling af alle indsætnings- og sletningskommandoer og gensortering af logfilenhttpGetRequiredVariables) .
     
* Brugere kan også foretage anmodninger, der er specifikke for EDDTableFraHttpGet datasets:
    * Hvis anmodningen indeholder en&lt;eller eller eller&lt;= begrænsning af tidsstempelkolonnen, derefterERDDAP™processer af logfilen op, indtil den angivne timetamp. I effekt sletter dette midlertidigt alle de ændringer, der er foretaget til datasættet, da tidsstempelværdien. For mere information, se[Versionering](#versioning).
    * Hvis anmodningen indeholder en &gt;, &gt;= eller = begrænsning af tidsstempelkolonnen, f.eks. &timestamp&lt;=0, derefterERDDAP™returnerer dataene fra datafiler som er, uden at behandle indsættelse og sletning kommandoer.
* I fremtiden forestiller vi, at værktøjer vil blive bygget (af os? af dig?) for at arbejde med disse datasæt. For eksempel kunne der være et script, der læser de rå log filer, anvende en anden kalibrering ligning og genererer / opdateres et andet datasæt med den afledt information. Bemærk, at scriptet kan få de oprindelige data via en anmodning tilERDDAP™  (som får dataene i filformatet, som er nemmeste for scriptet til at arbejde med) og generere/update de nye datasæt via .insert "requests" tilERDDAP. Scriptet behøver ikke direkte adgang til datafiler; det kan være på nogen autoriseret forfatters computer.
     

#### Detaljerede oplysninger om EDDTableFraHttpGet{#detailed-information-about-eddtablefromhttpget} 

Emnerne er:

*   [DON'T ændrer opsætningen&#33;](#dont-change-the-setup)
*   [CRUD](#crud)
*   [Ugyldige citater](#invalidrequests)
*   [Hastighedshastighed](#httpget-speed)
*   [Robust](#robust)
*   [System Reliabilitet](#system-reliability)
*   [Versionering](#versioning)
*   ["Hvad med HTTP PUT og DELETE?&#33;"](#https-put-and-delete)
*   [Noter](#httpget-notes)
*   [Takket være CHORDS for den grundlæggende idé.](#thanks)

Her er de detaljerede oplysninger:

##### DON'T ændrer opsætningen&#33;{#dont-change-the-setup} 
Når datasættet er oprettet, og du har tilføjet data til det:

* DON'T add eller fjerne enhverdataVariables.
* DON'T ændrer ændringensourceNameeller eller ellerdestinationNameafdataVariables.
* DON'T ændrer dataene Type af typen afdataVariables. Men du kan ændredataVariable's metadata.
* DON'T ændrer ændringenhttpGetRequired Varer global egenskab.
* DON'T ændrer ændringenhttpFåDirectoryStructure global attribut.

Hvis du har brug for at ændre nogle af disse ting, skal du gøre et nyt datasæt og overføre alle data til det nye datasæt.
     
##### CRUD{#crud} 
I computervidenskab er de fire grundlæggende kommandoer til at arbejde med et datasæt[Læs, UPDATE, DELETE (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). SQL, sproget for at arbejde med relationelle databaser, har tilsvarende i INSERT, SELECT, UPDATE og DELETE. I EDDTableFraHttpGet,

* .insert er en kombination af CREATE og UPDATE.
* . Slette er DELETE.
* Det almindelige system til at anmode om undersæt af data er READ.

Således understøtter EDDTableFraHttpGet alle de grundlæggende kommandoer til at arbejde med et datasæt.
     
* .insert eller . Slette anmodninger med ingen fejl vil returnere HTTP-statuskode=200 og et JSON-objekt, f.eks.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
De to tidsstempelværdier henviser til den samme millisekunder, som er den millisekunder, der vil blive gemt i timetamp variable for de rækker af data, der blev indsat eller slettet.ERDDAP™ændrer ikke navnet og formateringen af disse nøgleværdipar i fremtiden.ERDDAP™kan tilføje yderligere nøgleværdipar til JSON-objektet i fremtiden.
     
##### Ugyldige citater{#invalidrequests} 
Ugyldige .insert eller .delete anmodninger vil returnere en HTTP-fejlstatuskode andet end status=200 og ingen ændringer vil blive foretaget til datasættet. Dette omfatter anmodninger med forkerte forfatteroplysninger, forkerte variable navne, forskellige arraylængder for forskellige variabler, manglende krævede variabler, manglende variable værdier osv. Hvis anmodningen involverer mere end én datafil, er det muligt, at en del af anmodningen vil lykkes, og del vil mislykkes. Men det bør ikke være et problem, hvis sensoren sender anmodningen behandler fejl som en fuldstændig fejl. Hvis du f.eks. fortællerERDDAP™til at indsætte (eller sletning) de samme data to gange i træk, det værste tilfælde er, at oplysninger gemmes to gange, tæt sammen i logfilen. Det er svært at se, hvordan det kunne forårsage problemer.
     
##### HtpGet Speed{#httpget-speed} 
For .insert eller . Slette anmodninger (tælle ikkehttpOvertræk) , boldpark figurer hastigheden af .insert eller .delete er
1 m pr. .insert med 1 række data
2ms pr. .insert med 10 rækker data i arrays (\\[\\])   
3ms pr. .insert med 100 rækker data i arrays (\\[\\])   
13ms pr. .insert med 1000 rækker data i arrays (\\[\\])   
Kendte matrixer er nøglen til[høj gennemløb](#httpget-speed). Uden arrays, vil det være svært at .insert eller . Slette mere end 8 rækker data per sekund fra en fjern forfatter (på grund af alle netledningens hoved) . Med arrays, vil det være nemt at .insert eller slette mere end 1000 rækker data per sekund fra en fjern sensor.

Med meget store mængder data pr. anmodning, vil du ramme Tomcat's limit til den maksimale forespørgsel længde (Standard er 8KB?) , men det kan øges ved at redigere den maksimale størrelse indstilling i din størrelse *Tomcat* /conf/server.xml's HTTP/1.1 Tilslutningsindgang.

Hvornår Hvornår skal man HvornårERDDAP™Læser JSON Lines CSV-data (log log ind) filer, der er en lille periode straf sammenlignet med at læse binære data filer. Vi følte, at denne gang straf, når du læser var en rimelig pris for at betale for systemets hastighed og robusthed, når du skriver data (som er af primær betydning) .

##### SSD{#ssd} 
[For større hastighed,](#ssd)Brug en bruger[Solid State Drive (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)at gemme dataene. De har en meget hurtigere filadgang tid (&lt;0,1ms) end harddiske (3 - 12 ms) . De har også en hurtigere dataoverførselshastighed (200 - 2500 MB/s) end harddiske (~200 MB/s) . Deres omkostninger er steget betydeligt i de seneste år. Selvom tidlige SSD havde problemer efter et stort antal skriver til en given blok, er dette problem nu stærkt reduceret. Hvis du bare bruger SSD til at skrive dataene en gang så læse det mange gange, selv en forbruger-grade SSD (som er betydeligt billigere end en virksomhedsgrade SSD) bør vare lang tid.
    
##### Robust{#robust} 
Vi har forsøgt at gøre dette system så nemt at arbejde med og så robust som muligt.
* Systemet er designet til at have flere tråde (f.eks. sensoren, et automatiseret QC-script og et menneske) Samtidig arbejde på samme datasæt og endda den samme fil. Meget af dette sker ved hjælp af en logfil tilgang til opbevaring af data og ved hjælp af en meget enkel filtype,[JSON Linje CSV-filer](https://jsonlines.org/examples/), for at gemme dataene.
* En anden stor fordel for JSON Lines CSV er, at hvis en fil nogensinde bliver ødelagt (f.eks. ugyldig på grund af en fejl på en linje) , det er nemt at åbne filen i en tekst editor og løse problemet.
* En anden fordel er, hvis der er en fejl på en linje i en fil, kan systemet stadig læse alle data på linjer før og efter fejllinjen. Og systemet kan stadig logge ekstra .insert og .delete information.
* En enorm fordel ved at bruge admin-accessible standardfiler (sammenlignet med en relationel database eller Cassandra eller anden software) : Der er ingen anden software, der skal vedligeholdes, og som skal køres for at gemme eller hente data. Og det er nemt at sikkerhedskopiere standardfiler til enhver tid og i en trinvis måde, fordi dataene er i bidder (efter et stykke tid vil kun den aktuelle fil for hver station ændre sig) . I modsætning hertil tager det betydelig indsats og systemet ned tid til at lave eksterne backup filer fra databaser og fra Cassandra.
         
##### System Reliabilitet{#system-reliability} 
Det er rimeligt at forvente en server medERDDAP™at have 99,9% oppetid - det er omkring 9 timers nedetid om året (Selv om du kan bruge det op i en dårlig nat&#33;) .
Hvis du er flittig og heldig, kan du få 99.99% oppetid (53 minutters nedetid om året) , da blot et par genstart for opdateringer vil tage det meget tid.
Du skal tage ekstreme foranstaltninger (en separat backup server, uinterruptible strømforsyning, backup air condition, 24x7x365 personale til at overvåge hjemmesiden, osv.) at have en slank chance på 99.999% oppetid (5.25 minutters nedetid om året) . Selv så er det meget usandsynligt, at du vil opnå 99.999% oppetid (eller endda 99.99%) fordi problemer ofte er uden for din kontrol. For eksempel tilbyder Amazon Web Service og Google forbløffende pålidelige webtjenester, men store sektioner af dem er nogle gange nede i timevis.

Ansigt det, alle ønskerERDDAP™at have 100 % oppetid, eller i det mindste "six nis" (99,9999% oppetid svarer 32 sekunders nedetid om året) , men der er ingen måde, du vil få det uanset hvor meget tid, indsats og penge du bruger.

Men men men men menERDDAP™oppetid er ikke det rigtige mål her. Målet er at opbygge en pålidelig **systemsystem** , en, der ikke mister nogen data. Dette er et sålvbart problem.

Løsningen er: opbygge fejl-tolerance i computerens software, der sender dataene tilERDDAP. Specielt, at software skal opretholde en kø af data, der venter på at gå tilERDDAP. Når data tilføjes til køen, skal softwaren kontrollere svaret fraERDDAP. Hvis svaret ikke indeholder data modtaget. Ingen fejl., så softwaren skal forlade dataene i køen. Når flere data genereres og føjes til køen, skal softwaren igen forsøge at .insert dataene i køen (måske med det\\[\\]systemsystem) . Det vil lykkes eller mislykkes. Hvis det mislykkes, vil det prøve igen senere. Hvis du skriver softwaren til at arbejde på denne måde, og hvis softwaren er klar til kø et par dages værd, har du faktisk en god chance for at uploade 100% af sensorens data tilERDDAP. Og du vil have gjort det uden at gå til stor indsats eller omkostninger.

\\[Baggrund: Vi troede ikke dette op.[Dette er, hvordan computernetværk opnår pålidelighed.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) Computernetværk er iboende upålidelige. Så når du overfører en fil fra en computer til en anden, så ved afsendelsessoftwaren at nogle pakker kan gå tabt. Hvis det ikke får en ordentlig anerkendelse for en given pakke fra modtageren, gensender den tabte pakke. Med denne tilgang kan relativt enkle afsender- og modtagersoftware opbygge et pålideligt filsystem på toppen af et upålideligt netværk.\\]
    
##### Hvorfor JSON Lines CSV-filer?&#33;{#why-json-lines-csv-files} 
EDDTableFraHttpGet bruger[JSON Linje CSV-filer](https://jsonlines.org/examples/). til opbevaring af data. Årsagerne er:

* Den vigtigste årsag er: enkelheden af JSON Lines CSV-filer tilbyder en hurtig, nem og pålidelig måde at tillade flere tråde at skrive til en given fil (f.eks. ved synkronisering på filnavnet) .
* Hvis en JSON Lines CSV-fil nogensinde blev ødelagt (f.eks. ugyldig på grund af en fejl på en linje) , EDDTableFraHttpGet kunne stadig læse alle data på alle linjer før og efter fejllinjen. Og .insert og .delete system kan fortsætte med at tilføje nye data til datafilen.
* Fordi JSON Lines CSV-filer er ASCII-filer, hvis en fil nogensinde blev ødelagt, ville det være nemt at fastsætte (i en teksteditor) .
* JSON Lines CSV understøtter Unicode strenge.
* JSON Lines CSV understøtter variable længdestrenge (ikke begrænset til nogle max længde) .
* JSON Lines CSV understøtter 64-bit integers (lange længder) .
* Den formelle natur og ekstra syntaks af JSON Lines CSV (vs gamle skole CSV) giver nogle ekstra sikkerhed, at en given linje ikke er blevet ødelagt.

Vi forsøgte oprindeligt at bruge.nc3 filer med en ubegrænset dimension. Men der var problemer:

* Det vigtigste problem var: Der er ingen pålidelig måde at tillade flere tråde at skrive til en.nc3 fil, selv hvis trådene samarbejder ved at gøre skriveren på en synkroniseret måde.
* Hvis en.nc3 fil bliver ødelagt, .insert og .delete system kan ikke fortsætte med at bruge filen.
* Fordi.nc3 filer er binære, hvis en fil bliver ødelagt (som de gør på grund af multi-threading problem) De er meget svære eller umulige at løse. Der er ingen værktøjer til at hjælpe med reparationen.
* CF har ingen måde at angive kodning af strenge, så der er ingen officiel måde at støtte Unicode, f.eks. UTF-8 kodning. Vi forsøgte at få CF til at støtte en \\_Encoding attribut, men var ikke i stand til at foretage nogen fremgang. (Unidata, til deres kredit, understøtter \\_Encoding attribut.) 
*   .nc3 filer understøtter kun faste længdestrenge. Igen forsøgte vi at få CF ogUnidataat støtte variable længdestrenge, men kunne ikke foretage fremskridt.
*   .nc3 filer understøtter ikke en nem måde at skelne enkelt figurvariabler fra String variabler. Igen forsøgte vi at få CF ogUnidataat støtte et system til at skelne disse to datatyper, men var ikke i stand til at gøre fremskridt.
*   .nc3 filer understøtter kun 8-bit tegn med en uspecificeret kodning. Igen forsøgte vi at få CF ogUnidataat støtte et system til at angive kodningen, men var ikke i stand til at foretage fremskridt.
*   .nc3 filer understøtter ikke 64-bit integers (lange længder) . Igen forsøgte vi at få CF ogUnidataat støtte et system i længere tid, men kunne ikke foretage fremskridt.
         
##### Versionering{#versioning} 
Fordi EDDTable FraHttp Få gemme en log på alle ændringerne til datasættet med tidsstempel og forfatter af hver ændring, det kan hurtigt genskabe den datasæt som ethvert tidspunkt. I en forstand er der en version til ethvert tidspunkt. Hvis en brugers anmodning om data indeholder en tidsstempel&lt;= begrænsning, f.eks. &timestamp&lt;=2016-06-23T16:32:22.128Z (eller ethvert tidspunkt punkt) , men ingen begrænsning af forfatter eller kommando,ERDDAP™vil svare på anmodning ved først at generere en version af datasættet som det tidspunkt i tide. Så, så,ERDDAP™gælder brugerens andre begrænsninger, som med andre anmodninger om data fraERDDAP. EDDTableFraHttpGet er sat op, så denne proces er meget hurtig og effektiv, selv for meget store datasæt.

På samme måde kan en bruger finde ud af, hvornår datasættet sidst blev opdateret ved at anmode...?timestamp&timestamp=max (gangetamp) & detinkt () 

Og for enhver anmodning om data, for enhver version af datasættet, kan brugerne se, hvilken forfatter der foretages, og når de gjorde dem.

Dette versionssystem gør det muligt[Reproducible Science](https://en.wikipedia.org/wiki/Reproducibility)fordi nogen, på ethvert tidspunkt, kan anmode om data fra versionen af datasættet på ethvert tidspunkt. Denne fine version er ikke mulig med andre system, som vi kender. Den underliggende mekanisme er meget effektiv, i den ingen ekstra lagerplads er nødvendig, og behandlingens overhead er virkelig minimal.

Ikke alle har brug for denne type finkornet version, men det er meget nyttigt, måske nødvendigt, i forbindelse med en stor data management organisation (f.eks. OOI, Earth Cube, Data One ogNOAA's NCEI) hvor et datasæt kan have flere forfattere (f.eks. sensoren, et automatiseret QC-script og en menneskelige editor) .

\\[Historie: Behovet for denne type versioning først kom op for mig (Billeder af Bob) når du læser om og diskuterer OOI i 2008. På det tidspunkt havde OOI et kubersome, langsom, ineffektivt system til version baseret på Git. Git er fantastisk til det, det er designet til, men ikke dette. I 2008 designede jeg en omfattende, effektiv alternativ-til-OOI-system til datastyring, herunder mange af de funktioner, jeg har føjet tilERDDAP™Siden da, og inklusiv dette versionssystem. På det tidspunkt og siden var OOI engageret i deres versionssystem og ikke interesseret i alternativer. I 2016 faldt andre aspekter af denne plan på plads, og jeg begyndte at implementere den. Fordi der var masser af afbrydelser til at arbejde på andre projekter, var jeg ikke færdig indtil 2018. Selv nu er jeg ikke klar over ethvert andet videnskabeligt datasystem, der tilbyder så hurtig og nem adgang til en version af dataene fra ethvert tidspunkt, for ofte at ændre datasæt. Simple filsystemer tilbyder ikke dette. Relational databaser ikke. Cassandra ikke.\\]
    
##### HTTPS Put and Delete{#https-put-and-delete} 
*   ["Hvad med HTTPS PUT og DELETE?&#33;"](#https-put-and-delete)  
    [Hypertekstoverførsel protokol (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)er grundlaget for World Wide Web og grunden til, at websider begynder med " http://" eller " https://" . HTTPS er HTTP med et ekstra sikkerhedslag. Hver dag gør browsere, scripts og computerprogrammer milliarder af HTTP (S S S S)   **Nå** anmodninger om at få oplysninger fra fjernkilder. HTTP (S S S S) inkluderer også andre[verber](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), især PUT (til at skubbe data til serveren) og DELETE (til DELETE-data fra serveren) . Ja, PUT og DELETE er den rette måde at indsætte data i, og slette data fra, et datasæt via HTTP (S S S S) . GET understøttes af hvert stykke software, der kan arbejde med HTTP (S S S S) . GET er virkelig let at arbejde med. Alle ved allerede, hvordan man arbejder med GET og mange ved, hvordan man bruger POST (som kan bruges i stort set samme måde som GET) , så vi gjorde EDDTableFraHtttpGet arbejde med GET og POST. Meget få mennesker (endda få computer programmører) har nogensinde arbejdet med PUT og DELETE. PUT og DELETE understøttes generelt kun af computersprog, så brug dem kræver et dygtigt program. Så PUT og DELETE er normalt en meget mere besværlig tilgang givet den måde, værktøjerne har udviklet.
     
##### HttpGet Notes{#httpget-notes} 
*   [Noter](#httpget-notes)
    * Ingen IngendataVariablekan have dataType=char. Brug dataType=String i stedet. Hvis du virkelig har brug for dataType=char, e-mail Chris. John på noaa.gov .
         
##### Tak{#thanks} 
*   [Takket være CHORDS for den grundlæggende idé.](#thanks)  
Den grundlæggende idé for EDDTableFraHtttpGet (f.eks. ved hjælp af enHTTP GETanmode om at tilføje data til et datasæt) er fra UCAR's (NCAR's?)  [Cloud-Hosted Real-time Data Services (CHORDS) ](https://github.com/earthcubeprojects-chords)projekt. Formatet for parametrene i anmodningen (gentagen gentag *Navn = værdi* , adskilt af &'s) er det samme standardformat, der bruges af HTML-formularer på websider. Det er en enkel og strålende ide og endnu mere, fordi det mesher så perfekt medERDDAP's eksisterende system til håndtering af tabulære data. Idéen er indlysende i bagværk, men jeg (Billeder af Bob) troede ikke på det. EDDTableFraHttp Få brug af den grundlæggende idé, kombineret med vores idéer til, hvordan du implementerer det, for at gøre et system iERDDAP™til at uploade data. Bortset fra den grundlæggende idé om at bruge GET til at skubbe data ind i systemet, er EDDTableFraHttpGet implementering helt forskellige og helt uafhængige af CHORDS og har forskellige funktioner (f.eks. logfiler, klumpning af data, forskellige sikkerhedssystemer, CRUD-understøttelse, reproducerbare data) . Vores eksponering for CHORDS var bare et webinar. Vi kiggede ikke på deres kode eller læs om deres projekt, fordi vi straks vidste, at vi ville implementere systemet en anden måde. Men vi er taknemmelige for dem for den grundlæggende idé. Den fulde reference til CHORDS er
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Frimærker, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014 2014) . Cloud-Hosted Real-time Data Services for Geosciences (CHORDS) software. UCAR/NCAR -- Earth Observing Laboratory.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### EDDTableFraHyraxFiler{#eddtablefromhyraxfiles} 
[ **EDDTableFraHyraxFiler** ](#eddtablefromhyraxfiles)  (deprecated) aggregerer datafiler med flere variabler, hver med en eller flere delte dimensioner (for eksempel tid, højde (eller dybde) Højde, længdegrad) , og serveret af en[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).

* Denne datasæt type er **DEPRECATED** . Den nyere og mere generelle løsning er at bruge den[cache cache cache cache FraUrl mulighed for EDDTable FraFiles](#cachefromurl)  (eller en variant) , som gør en lokal kopi af fjernfiler og tjener data fra de lokale filer. The The The The The The The&lt;cacheFraUrl&gt; mulighed kan bruges med enhver form for tabulær datafil. **   
Hvis du ikke kan gøre dette arbejde af en eller anden grund, kan du e-maile Chris. John på noaa.gov .
Hvis der ikke er klager før 2020, kan denne datasæt type fjernes. ** 
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
* I de fleste tilfælde har hver fil flere værdier for den venstre største (først først) dimension, for eksempel tid.
* Filerne ofte (men behøver ikke at være) har en enkelt værdi for de andre dimensioner (for eksempel højde (eller dybde) Højde, længdegrad) .
* Filerne kan have tegnvariabler med en ekstra dimension (for eksempel nCharacters) .
*   Hyraxservere kan identificeres af "/dods-bin/nph-dods/" eller "/opendap/" i URL.
* Denne klasse skærm-skrabereHyraxwebsider med oversigter af filer i hver mappe. På grund af dette, er det meget specifikt til det nuværende format afHyraxwebsider. Vi vil forsøge at justereERDDAP™hurtigt, hvis / når fremtidige versioner afHyraxændre, hvordan filerne er angivet.
* The The The The The The The&lt;filDir&gt; indstilling ignoreres. Da denne klasse downloader og gør en lokal kopi af hver fjerndatafil,ERDDAP™styrker filen Dir at være *bigParentDirectory* /copy / *datasetID* /.
* For For For For For&lt;sourceUrl&gt; Brug URL-adressen på basismappen af datasættet i datasættetHyraxserver, f.eks.
    &lt;sourceUrl&gt; &gt; &gt; &gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;/ / / /sourceUrl&gt; &gt; &gt; &gt;
     (men sæt den på én linje)   (beklager, at serveren ikke længere er tilgængelig) .
The The The The The The ThesourceUrlwebside har normalt "OPeNDAPServerindeks af\\[Katalognavn\\]" øverst.
* Da denne klasse altid downloader og gør en lokal kopi af hver fjerndatafil, bør du aldrig pakke denne datasæt i[EDDTableCopy](#eddtablecopy).
* Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.
* Se 1D, 2D, 3D og 4D eksempler for[EDDTableFraNcFiles](#eddtablefromncfiles).
     
### EDDTableFraInvalidCRAFiles{#eddtablefrominvalidcrafiles} 
[ **EDDTableFraInvalidCRAFiles** ](#eddtablefrominvalidcrafiles)aggregerede data fraNetCDF  (v3 eller v4)  .ncfiler, der bruger en bestemt, ugyldig variant af CF DSG Contiguous Ragged Array (CRA) filer. Selv om selvomERDDAP™understøtter denne filtype, er det en ugyldig filtype, der ingen skal begynde at bruge. Grupper, der bruger denne filtype, opfordres til at brugeERDDAP™at generere gyldige CF DSG CRA-filer og stoppe med at bruge disse filer.

Detaljer: Disse filer har flere række\\_size variabler, hver med en prøve\\_dimension egenskab. Filerne er ikke-CF-standard filer, fordi den flere prøve (obs) dimensioner skal være dekodet og relateret til hinanden med denne ekstra regel og løfte, der ikke er en del af CF DSG-specifikationerne: "du kan knytte en given f.eks. temperaturværdi (temp \\_obs dimension) med en given dybdeværdi (z\\_obs dimension, dimensionen med de mest værdier) , fordi: temperaturrække\\_size (for en given cast) vil være enten 0 eller lig den tilsvarende dybderække\\_size (for den støbte)   (det er reglen) . Så hvis temperaturrækken \\_size ikke er 0, så vedrører n-temperaturværdierne for, at kastet vedrører direkte til n dybdeværdierne for den, der caster (Det er løftet) ."

Et andet problem med disse filer: Principal\\_Investigator rækken\\_size variabel har ikke en prøve\\ dimension attribut og følger ikke ovenstående regel.

Prøve filer til denne datasæt type kan findes på https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Denne server er ikke længere pålideligt tilgængelig\\].

Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.

Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.

Den første ting GenererDatasets Xml gør for denne type datasæt, når du besvarer spørgsmålene udskrives ncdump-lignende struktur af prøvefilen. Så hvis du indtaster et par goofy svar på den første sløjfe gennem GenererDatasets Xml, mindst du vil kunne se, hvisERDDAP™kan læse filen og se, hvilke dimensioner og variabler er i filen. Så kan du give bedre svar på den anden sløjfe gennem GenererDatasetsXml.
 
### EDDTableFraJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
[ **EDDTableFraJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles)aggregerede data fra[JSON Linje CSV-filer](https://jsonlines.org/examples/). Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.

* Som jsonlines.org siger, er dette format "Bedre end CSV" (og lovligt, som en føderal medarbejder, kan jeg ikke acceptere eller være uenig med dem - hvordan crazy er det?) . CSV har aldrig været formelt defineret og bliver hæmmet af den historiske bagage relateret til dens forbindelse til de oprindelige regnearksprogrammer. JSON Lines CSV, i sammenligning, er fuldt defineret og fordele fra sin forbindelse til den vidt anvendte JSON-standard, som igen får gavn af sin forbindelse tilJavascripts og scriptsJava. Især er der fuld støtte til lange integers og for Unicode tegn i strenge og en klar måde at inkludere andre specielle tegn (Betydelige faner og nye linjer) inden for strenge.
    
Dette format er særligt godt for datasæt, hvor du har brug for periodisk at tilføje yderligere rækker til slutningen af en given datafil. Af den grund og andre (Se ovenstående) ,[EDDTableFraHttpGet](#eddtablefromhttpget)Brug Json Lines CSV-filer til datalagring.
    
* De input filer antages at være UTF-8 kodet. Men givet «u *dddd* format til kodning særlige tegn (f.eks. "u20ac er kodning for Euro karakteren) , du har mulighed for at skrive filerne, så de kun indeholder 7bit ASCII tegn ved hjælp af "u *dddd* for at kode alle tegn over #127.
     
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
    
Den første ting GenererDatasetsXml gør for denne type datasæt, når du besvarer spørgsmålene udskriver ncdump-lignende struktur af prøvefilen. Så hvis du indtaster et par goofy svar på den første sløjfe gennem GenererDatasets Xml, mindst du vil kunne se, hvisERDDAP™kan læse filen og se, hvilke dimensioner og variabler er i filen. Så kan du give bedre svar på den anden sløjfe gennem GenererDatasetsXml.
    
* ADVARSEL: HvornårERDDAP™Læser JSON Linje CSV-datafiler, hvis det finder en fejl på en given linje (f.eks. forkert antal varer) , det logger en advarselsmeddelelse ("WARNING: Bad linje (s s s) af data" ... med en liste over de dårlige linjer på efterfølgende linjer) Til højre[log.txt-fil](/docs/server-admin/additional-information#log)og derefter fortsætter med at læse resten af datafilen. Det er derfor dit ansvar at se periodisk (eller skrive et script til at gøre det) for denne meddelelse i loget. txt, så du kan løse problemerne i datafiler.ERDDAP™opsættes på denne måde, så brugerne kan fortsætte med at læse alle de tilgængelige gyldige data, selvom nogle linjer af filen har fejl.
     
### EDDTableFraMultidimNcFiles{#eddtablefrommultidimncfiles} 
[ **EDDTableFraMultidimNcFiles** ](#eddtablefrommultidimncfiles)aggregerede data fraNetCDF  (v3 eller v4)  .nc  (eller eller eller[.ncml](#ncml-files)) filer med flere variabler, hver med en eller flere delte dimensioner. Filerne kan have tegnvariabler med eller uden yderligere dimension (for eksempel, STRING14) . Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.

* Hvis filerne er flerdimensionel CF DSG-varianter, skal du bruge denne datasæt type i stedet for[EDDTableFraNcCFFiles](#eddtablefromncfiles).
     
* Til nye tabulære datasæt fra.ncfiler, brug denne mulighed, før du forsøger ældre[EDDTableFraNcFiles](#eddtablefromncfiles). Nogle fordele ved denne klasse er:
    * Denne klasse kan læse flere variabler fra en bredere vifte af filstrukturer. Hvis du angiver DimensionerCSV (en kompareret liste over dimensionnavne) I GenererDatasets Xml (eller&lt;dimensionerCSV&gt; i størrelsendatasets.xmlinfo for en af disse datasæt), såERDDAP™vil kun læse variabler i kildefiler, der bruger nogle eller alle disse dimensioner, samt alle scalar variabler. Hvis en dimension er i en gruppe, skal du angive dens fulde navn, f.eks. " *gruppenavn/dimensionnavn* ".
    * Denne klasse kan ofte afvise filer meget hurtigt, hvis de ikke matcher en anmodnings begrænsninger. Så læsning af data fra store samlinger vil ofte gå meget hurtigere.
    * Denne klasse håndterer ægte char variabler (Ikke-strengende variabler) korrekt.
    * Denne klasse kan trimme strenge variabler, når skaberen ikke brugte Netcdf-java's skriveStringe (som føjer char #0 til at markere afslutningen af strengen) .
    * Denne klasse er bedre til at håndtere individuelle filer, der mangler visse variabler eller dimensioner.
    * Denne klasse kan fjerne blokke af rækker med manglende værdier som angivet for[CF Diskret Sampling Geometries (DSG) Ufuldstændig Multidimensional Array filer](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
    
Den første ting GenererDatasetsXml gør for denne type datasæt, når du besvarer spørgsmålene udskriver ncdump-lignende struktur af prøvefilen. Så hvis du indtaster et par goofy svar på den første sløjfe gennem GenererDatasets Xml, mindst du vil kunne se, hvisERDDAP™kan læse filen og se, hvilke dimensioner og variabler er i filen. Så kan du give bedre svar på den anden sløjfe gennem GenererDatasetsXml.
    
Gruppe -- GenererDatasets Xml vil bede om en "Gruppe". Du kan indtaste "" for at få det til at søge / alle grupper, " *nogle af nogle Gruppegruppe* " eller " *nogleGroup/someSubGroup* " for at få det til at søge en bestemt gruppe eller "\\[rodrod\\]" for at få det til at søge bare rodgruppen. Den "Gruppe" streng bliver&lt;gruppe&gt; i gruppendatasets.xmlinfo for datasættet (selvom "\\[rodrod\\]" bliver "") .
    
DimensionerCSV - GenererDatasets Xml vil bede om en "DimensionsCSV" streng. Dette er en kommunalværdiliste af kildenavne af et sæt dimensioner. GenererDatasets Xml vil kun læse datavariabler i prøve.ncfiler, der bruger nogle eller alle disse dimensioner (og ingen andre dimensioner) , plus alle de scalar variabler i filen, og gøre datasættet fra disse datavariabler. Hvis en dimension er i en gruppe, skal du angive dens fulde navn, f.eks. " *gruppenavn/dimensionnavn* ".
Hvis du angiver noget (en tom streng) , GenererDatasets Xml vil se efter variablerne med de mest dimensioner, på den teori, at de vil være den mest interessante, men der kan være tider, når du vil gøre et datasæt fra en anden gruppe af datavarier, der bruger en anden gruppe dimensioner.
Hvis du blot angiver et dimensionnavn, der ikke findes (f.eks. NO\\_MATCH) ,ERDDAP™vil bare finde alle de scalar variabler.
"DimensionsCSV" streng bliver&lt;dimensionerCSV&gt; i størrelsendatasets.xmlOplysninger til datasættet.
    
#### behandleDimensionsAs{#treatdimensionsas} 
Der er en kategori af ugyldig.ncfiler filer filer (fordi de ikke følger CF-reglerne) der har flere dimensioner (f.eks. lat, lon, tid) når de skal have brugt en dimension (f.eks. tid) f.eks.:
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
EDDTableFraMultidimNcFiles har en særlig funktion til at håndtere disse filer: hvis du tilføjer den globale attribut "treatDimensionsAs" til datasets globaleaddAttributes, du kan fortælleERDDAP™at behandle visse dimensioner (f.eks. lat og lon) som om de var en anden dimension (f.eks. tid) . attributværdien skal være en koma adskilt liste, der angiver "fra" dimensioner og derefter "til" dimension, f.eks.
<att name="treatDimensionsAs">lat, lon, tid</att>  
Så så og så derefterERDDAP™vil læse filen, som om det var:
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
Selvfølgelig, den nuværende størrelse af hver af dimensionerne på listen skal være den samme; ellers,ERDDAP™vil behandle filen som en "Bad fil".

Bemærk, at disse filer er ugyldige, fordi de ikke følger CF-regler. Så selvomERDDAP™kan læse dem, vi anbefaler stærkt, at du ikke opretter filer som dette, fordi andre CF-baserede softwareværktøjer ikke vil kunne læse dem korrekt. Hvis du allerede har sådanne filer, anbefaler vi stærkt at erstatte dem med gyldige filer så hurtigt som muligt.
    
### EDDTableFraNcFiles{#eddtablefromncfiles} 
[ **EDDTableFraNcFiles** ](#eddtablefromncfiles)aggregerede data fraNetCDF  (v3 eller v4)  .nc  (eller eller eller[.ncml](#ncml-files)) filer og filer[Zarrr](https://github.com/zarr-developers/zarr-python)filer filer filer (som version 2.25) med flere variabler, hver med en delt dimension (for eksempel tid) eller mere end én delt dimensioner (for eksempel tid, højde (eller dybde) Højde, længdegrad) . Filerne skal have de samme dimensionnavne. En given fil kan have flere værdier for hver af dimensionerne, og værdierne kan være forskellige i forskellige kildefiler. Filerne kan have tegnvariabler med en ekstra dimension (for eksempel, STRING14) . Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.

Zarrr filer har lidt forskellige adfærd og kræver enten fileNameRegex eller stiRegex at inkludere "zarr".

* Hvis det er tilfældet.ncfiler bruger en af de[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)filformater, prøv at bruge[EDDTableFraNcCFFiles](#eddtablefromncfiles)før du prøver dette.
     
* Til nye tabulære datasæt fra.ncfiler, prøv de nyere[EDDTableFraMultidimNcFiles](#eddtablefrommultidimncfiles)først.
     
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
    
Den første ting GenererDatasetsXml gør for denne type datasæt, når du besvarer spørgsmålene udskriver ncdump-lignende struktur af prøvefilen. Så hvis du indtaster et par goofy svar på den første sløjfe gennem GenererDatasets Xml, mindst du vil kunne se, hvisERDDAP™kan læse filen og se, hvilke dimensioner og variabler er i filen. Så kan du give bedre svar på den anden sløjfe gennem GenererDatasetsXml.
    
DimensionerCSV - GenererDatasets Xml vil bede om en "DimensionsCSV" streng. Dette er en kommunalværdiliste af kildenavne af et sæt dimensioner. GenererDatasets Xml vil finde datavariablerne i datavariablerne.ncfiler, der bruger nogle eller alle disse dimensioner, plus alle scalar variabler og gør datasættet fra disse datavariabler. Hvis du angiver noget (en tom streng) , GenererDatasets Xml vil se efter variablerne med de mest dimensioner, på den teori, at de vil være den mest interessante, men der kan være tider, når du vil gøre et datasæt fra en anden gruppe af datavarier, der bruger en anden gruppe dimensioner.
    
* 1D Eksempel: 1D-filer er noget anderledes fra 2D, 3D, 4D,... filer.
    * Du kan have et sæt af.ncdatafiler, hvor hver fil har en måneds værdi af data fra en drivende buoy.
    * Hver fil vil have 1 dimension, for eksempel tid (størrelse =\\[mange mange mange\\]) .
    * Hver fil vil have en eller flere 1D variabler, der bruger denne dimension, f.eks. tid, længde, breddegrad, lufttemperatur, ....
    * Hver fil kan have 2D-tegnvariabler, for eksempel med dimensioner (tiden,nCharacters) .
         
* 2D Eksempel:
    * Du kan have et sæt af.ncdatafiler, hvor hver fil har en måneds værdi af data fra en drivende buoy.
    * Hver fil vil have 2 dimensioner, for eksempel tid (størrelse =\\[mange mange mange\\]) og id (størrelse = 1) .
    * Hver fil vil have 2 1D variabler med de samme navne som dimensionerne og ved hjælp af samme navn dimension, for eksempel tid (tidstid) , id (id) . Disse 1D-variabler skal inkluderes på listen&lt;dataVariable&gt; er i datasættets XML.
    * Hver fil vil have en eller flere 2D variabler, for eksempel længde, bredde, lufttemperatur, vandtemperatur,...
    * Hver fil kan have 3D-tegnvariabler, for eksempel med dimensioner (tid,id,nCharacters) .
         
* 3D Eksempel:
    * Du kan have et sæt af.ncdatafiler, hvor hver fil har en måneds værdi af data fra en stationær bøjning.
    * Hver fil vil have 3 dimensioner, for eksempel tid (størrelse =\\[mange mange mange\\]) , lat (størrelse = 1) , og lon (størrelse = 1) .
    * Hver fil vil have 3 1D variabler med de samme navne som dimensionerne og ved hjælp af samme navn dimension, for eksempel tid (tidstid) , lat (lat) , lon (Billeder af lon) . Disse 1D-variabler skal inkluderes på listen&lt;dataVariable&gt; er i datasættets XML.
    * Hver fil vil have en eller flere 3D variabler, for eksempel lufttemperatur, vandtemperatur,...
    * Hver fil kan have 4D tegnvariabler, for eksempel med dimensioner (tid,lat,lon,nCharacters) .
    * Navnet på filen kan have buoys navn i filnavnet.
         
* 4D Eksempel:
    * Du kan have et sæt af.ncdatafiler, hvor hver fil har en måneds værdi af data fra en station. På hvert tidspunkt tager stationen læsning på en række dybder.
    * Hver fil vil have 4 dimensioner, for eksempel tid (størrelse =\\[mange mange mange\\]) , dybde (størrelse =\\[mange mange mange\\]) , lat (størrelse = 1) , og lon (størrelse = 1) .
    * Hver fil vil have 4 1D variabler med de samme navne som dimensionerne og ved hjælp af samme navn dimension, for eksempel tid (tidstid) , dybde (dybdedybde) , lat (lat) , lon (Billeder af lon) . Disse 1D-variabler skal inkluderes på listen&lt;dataVariable&gt; er i datasættets XML.
    * Hver fil vil have en eller flere 4D variabler, for eksempel lufttemperatur, vandtemperatur,...
    * Hver fil kan have 5D tegnvariabler, for eksempel med dimensioner (tid, dyb,lat,lon,nCharacters) .
    * Navnet på filen kan have buoys navn i filnavnet.
         
### EDDTableFraNcCFFiles{#eddtablefromnccffiles} 
[ **EDDTableFraNcCFFiles** ](#eddtablefromnccffiles)aggregerede data aggregerer data fraNetCDF  (v3 eller v4)  .nc  (eller eller eller[.ncml](#ncml-files)) filer, der bruger en af de filformater, der er angivet af de[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konventioner. Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.

Til filer ved hjælp af en af de multidimensionelle CF DSG-varianter, brug[EDDTableFraMultidimNcFiles](#eddtablefrommultidimncfiles)I stedet.

CF DSG konventionerne definerer snesevis af filformater og indeholder mange mindre variationer. Denne klasse tilbyder alle de variationer, vi er opmærksomme på, men vi kan have savnet en (eller mere) . Så hvis denne klasse ikke kan læse data fra dine CF DSG-filer, bedes du[nå ud til ekstra støtte](/docs/intro#support).

Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
 
### EDDTableFraNccsvFiles{#eddtablefromnccsvfiles} 
[ **EDDTableFraNccsvFiles** ](#eddtablefromnccsvfiles)aggregerede data fra[NCCSV](/docs/user/nccsv-1.00)ASCII .csv filer. Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.

* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
    
Den første ting GenererDatasetsXml gør for denne type datasæt, når du besvarer spørgsmålene udskriver ncdump-lignende struktur af prøvefilen. Så hvis du indtaster et par goofy svar på den første sløjfe gennem GenererDatasets Xml, mindst du vil kunne se, hvisERDDAP™kan læse filen og se, hvilke dimensioner og variabler er i filen. Så kan du give bedre svar på den anden sløjfe gennem GenererDatasetsXml.
    
* ADVARSEL: HvornårERDDAP™læser NCCSV datafiler, hvis det finder en fejl på en given linje (f.eks. forkert antal varer) , det logger en advarselsmeddelelse ("WARNING: Bad linje (s s s) af data" ... med en liste over de dårlige linjer på efterfølgende linjer) Til højre[log.txt-fil](/docs/server-admin/additional-information#log)og derefter fortsætter med at læse resten af datafilen. Det er derfor dit ansvar at se periodisk (eller skrive et script til at gøre det) for denne meddelelse i loget. txt, så du kan løse problemerne i datafiler.ERDDAP™opsættes på denne måde, så brugerne kan fortsætte med at læse alle de tilgængelige gyldige data, selvom nogle linjer af filen har fejl.
     
### EDDTableFraNOS{#eddtablefromnos} 
[ **EDDTableFraNOS** ](#eddtablefromnos)  (DEPRECATED) håndterer data fra enNOAA [NOS](https://opendap.co-ops.nos.noaa.gov/axis/)kilde, som bruger[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)for anmodninger og svar. Det er meget specifik forNOAANOS's XML. Se prøven EDDTableFraNOS datasæt i datasets2.xml.
 
### EDDTableFraOBIS{#eddtablefromobis} 
[ **EDDTableFraOBIS** ](#eddtablefromobis)håndterer data fra et Ocean Biogeographic Information System (I nærheden af OBIS) server (Jeg var var http://www.iobis.org  ) . Det er muligt, at der ikke er flere aktive servere, der bruger dette nu forældet type OBIS server system.

* OBIS-servere forventer en XML-forespørgsel og returnerer en XML-respons.
* Fordi alle OBIS servere de samme variabler samme måde (Jeg var var http://iobis.org/tech/provider/questions ) , du behøver ikke at angive meget for at oprette et OBIS-datasæt iERDDAP.
* Du skal inkludere en "creator\\_email" attribut i den globaleaddAttributes, da disse oplysninger anvendes i licensen. En passende e-mailadresse kan findes ved at læse XML-responsen fra kildeURL.
* Du kan eller måske ikke kunne få den globale attribut [&lt;subsetVariables&gt;] (#subsetvariables) at arbejde med en given OBIS-server. Hvis du prøver, skal du blot prøve en variabel (f.eks. ScientificName eller Genus) .
#### EDDTableFraOBIS skelet XML{#eddtablefromobis-skeleton-xml} 
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

### EDDTableFra parkFiles{#eddtablefromparquetfiles} 
[ **EDDTableFra parkFiles** ](#eddtablefromparquetfiles)håndterer data fra[Udsigt fra værelset](https://parquet.apache.org/). Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.

* parket er designet til at komprimere meget effektivt, så det kan give dig mindre filstørrelser end andre formater.
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
* ADVARSEL: HvornårERDDAP™Læser park datafiler, hvis det finder en fejl på en given linje (f.eks. forkert antal varer) , det logger en advarselsmeddelelse ("WARNING: Bad linje (s s s) af data" ... med en liste over de dårlige linjer på efterfølgende linjer) Til højre[log.txt-fil](/docs/server-admin/additional-information#log)og derefter fortsætter med at læse resten af datafilen. Det er derfor dit ansvar at se periodisk (eller skrive et script til at gøre det) for denne meddelelse i loget. txt, så du kan løse problemerne i datafiler.ERDDAP™opsættes på denne måde, så brugerne kan fortsætte med at læse alle de tilgængelige gyldige data, selvom nogle linjer af filen har fejl.
     
### EDDTableFraSOS {#eddtablefromsos} 
[ **EDDTableFraSOS** ](#eddtablefromsos)håndterer data fra en Sensor observationstjeneste (Særpris[SOS](https://www.ogc.org/standards/sos)) server.

* Denne datasæt type aggregerer data fra en gruppe stationer, som alle betjenes af énSOSserver.
* Stationerne tjener alle det samme sæt variabler (selvom kilden til hver station ikke behøver at tjene alle variabler) .
*   SOSservere forventer en XML-forespørgsel og returnerer en XML-reaktion.
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det. Det er ikke nemt at generere datasættet XML forSOSDatasæt i hånden. For at finde de nødvendige oplysninger, skal du besøgesourceUrl+"? Service=SOSSøg efter:GetCapabilities" i en browser; se på XML; gøre en GetObservation anmodning ved hånden; og se på XML svar på anmodning.
* Med lejlighedsvis tilføjelse af nye typer afSOSservere og ændringer i de gamle servere, det bliver sværere forERDDAP™til automatisk at registrere servertypen fra serverens svar. Brug af&lt;SåsServerType&gt; (med en værdi af IOOS\\_NDBC, IOOS\\_NOS,OOSTethys eller WHOI) er nu STRONGLY RECOMMMENTD. Hvis du har problemer med nogen datasæt af denne type, skal du prøve re-running GenerDatasetsets Xml for teSOSserver. Generer Generer Datasæt Xml vil lade dig prøve de forskellige&lt;såsServerType&gt; muligheder, indtil du finder den rigtige til en given server.
*   SOSoversigt:
    * Særpris (Sensor Web Aktivering) og og ogSOS  (Sensorobservation Service) er de er[OpenGIS® standarder](https://www.ogc.org/standards). Denne hjemmeside har standarddokumenter.
    * The The The The The The TheOGCWeb Services Fælles specifikation ver 1.1.0 (OGC06-121r3) dækker konstruktion af GET og POST forespørgsler (Se afsnit 7.2.3 og afsnit 9) .
    * Hvis du sender en getCapabilities xml anmodning til enSOSserver (sourceUrl+ "?service=SOSSøg efter:GetCapabilities" " " ") , du får et xml-resultat med en liste over stationer og det observerede Egenskaber, som de har data til.
    * En observeretProperty er en formel URI reference til en ejendom. For eksempel urn:ogc:phenomenon:longitude:wgs84 eller https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * En observeretProperty er ikke en variabel.
    * Mere end én variabel kan have samme observeret Ejendom (f.eks. indvendigTemp og udenfor Temp kan begge have observeret Ejendom https://mmisw.org/ont/cf/parameter/air\\_temperature ) .
    * Hvis du sender en modtager xml-anmodning til enSOSserver får du et xml-resultat med beskrivelser af feltnavne i respons, feltenheder og data. Feltnavnene vil omfatte længde, breddegrad, dybde (måske måske måske måske) , og tid.
    * Hver enkelt hverdataVariablefor en EDDTableFraSOSskal indeholde en "observeretProperty" egenskab, der identificerer den observeredeProperty, der skal anmodes fra serveren for at få den variable. Ofte, fleredataVariables vil liste den samme komposit observeredeProperty.
    * DataType for hverdataVariableKan ikke angives af serveren. Hvis det er tilfældet, skal du se på XML-datareaktionerne fra serveren og tildele passende [&lt;DataType&gt;s] (#datatype) i områdetERDDAP™DatasætdataVariabledefinitioner.
    *    (På tidspunktet for at skrive dette) nogle af nogleSOSservere reagerer på at fåObservation anmodninger for mere end én observeret Ejendom ved blot at returnere resultater for den første af de observerede properties. (Ingen fejlmeddelelse&#33;) Se den konstruerende parameter anmodning ObservedPropertiesSeparately.
* EDDTableFraSOStilføjer automatisk
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
til datasættets globale attributter, når datasættet oprettes.
*   SOSservere normalt udtrykke[enheder](#units)med[UCUM](https://unitsofmeasure.org/ucum.html)system. De flesteERDDAP™servere udtrykke enheder med[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)system. Hvis du har brug for at konvertere mellem de to systemer, kan du bruge[ERDDAP's webtjeneste til at konvertere UCUM enheder til / fraUDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### EDDTableFraSOSskelet XML{#eddtablefromsos-skeleton-xml} 
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

### EDDTableFraThreddsFiles{#eddtablefromthreddsfiles} 
[ **EDDTableFraThreddsFiles** ](#eddtablefromthreddsfiles)  (deprecated) aggregerer datafiler med flere variabler, hver med en eller flere delte dimensioner (for eksempel tid, højde (eller dybde) Højde, længdegrad) , og serveret af en[I nærheden afTHOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).

* Denne datasæt type er **DEPRECATED** . Den nyere og mere generelle løsning er at bruge den[cache cache cache cache FraUrl mulighed for EDDTable FraFiles](#cachefromurl)  (eller en variant) , som gør en lokal kopi af fjernfiler og tjener data fra de lokale filer. The The The The The The The&lt;cacheFraUrl&gt; mulighed kan bruges med enhver form for tabulær datafil fra enhver webbaseret kilde, der udgiver en mappelignende liste over filer. **   
Hvis du ikke kan gøre dette arbejde af en eller anden grund, kan du e-maile Chris. John på noaa.gov .
Hvis der ikke er klager før 2020, kan denne datasæt type fjernes. ** 
* Vi anbefaler stærkt at bruge[GenererDatasets Xml program](#generatedatasetsxml)at lave et groft udkast tildatasets.xmlBeskåret for denne datasæt. Du kan derefter redigere det til at finjustere det.
* I de fleste tilfælde har hver fil flere værdier for den venstre største (først først) dimension, for eksempel tid.
* Filerne ofte (men behøver ikke at være) har en enkelt værdi for de andre dimensioner (for eksempel højde (eller dybde) Højde, længdegrad) .
* Filerne kan have tegnvariabler med en ekstra dimension (for eksempel nCharacters) .
* Disse servere kan identificeres af "/redds/" i webadresserne. For eksempel,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* THREDDS servere har kataloger på forskellige steder. Denne klasse REQUIRES, at URL'en indeholder "/redds/catalog/". Du kan normalt finde denne variabel ved at starte i en browser i rodkataloget, og derefter klikke videre til den ønskede subcatalog.
* Denne klasse læser kataloget.xml-filer serveret af THREDDS med listerne af&lt;KatalogRefs&gt; (referencer til ekstra katalog.xml sub-files) og og og&lt;Datasæt&gt;s (Datafiler) .
* The The The The The The The&lt;filDir&gt; indstilling ignoreres. Da denne klasse downloader og gør en lokal kopi af hver fjerndatafil,ERDDAP™styrker filen Dir at være *bigParentDirectory* /copy / *datasetID* /.
* For For For For For&lt;sourceUrl&gt; Brug URL-adressen på kataloget.xml-filen til datasættet i THREDDS-serveren, for eksempel: for denne URL, som kan bruges i en webbrowser,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Denne server er ikke længere pålidelig tilgængelig.\\],
Brug af brug&lt;sourceUrl&gt; &gt; &gt; &gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;/ / / /sourceUrl&gt; &gt; &gt; &gt;
     (men sæt den på én linje) .
* Da denne klasse altid downloader og gør en lokal kopi af hver fjerndatafil, bør du aldrig pakke denne datasæt i[EDDTableCopy](#eddtablecopy).
* Denne datasæt type understøtter en OPTIONAL, sjældent brugt, speciel tag,&lt;SpecialMode&gt; *tilstandstilstandstilstand* &lt;/ SpecialMode&gt;, som kan bruges til at angive, at særlige, kodede regler skal bruges til at afgøre, hvilke filer der skal downloades fra serveren. I øjeblikket, den eneste gyldige *tilstandstilstandstilstand* er SAMOS, som bruges med datasæt fra https://tds.coaps.fsu.edu/thredds/catalog/samos at downloade kun filerne med det sidste versionsnummer.
* Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.
* Se 1D, 2D, 3D og 4D eksempler for[EDDTableFraNcFiles](#eddtablefromncfiles).
     
### EDDTableFraWFSFiler{#eddtablefromwfsfiles} 
[ **EDDTableFraWFSFiler** ](#eddtablefromwfsfiles)  (DEPRECATED) gør en lokal kopi af alle data fra enArcGISMapServerWFSserver, så dataene kan igen betjenes hurtigt tilERDDAP™Brugere.

* Du skal angive en specielt formateretsourceUrlglobal egenskab at fortælleERDDAP™hvordan man anmoder om funktioner fra serveren. Brug dette eksempel som en skabelon:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (men sæt det hele på én linje) 
* Du skal tilføje en særlig global egenskab for at fortælleERDDAP™hvordan man identificerer navnene på de lagre af data, der skal downloades. Dette vil sandsynligvis arbejde for alle EDDTableFraWFSFiler datasæt:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Da denne klasse altid downloader og gør en lokal kopi af hver fjerndatafil, bør du aldrig pakke denne datasæt i[EDDTableCopy](#eddtablecopy).
* Se denne klasses superklasse,[EDDTableFraFiles](#eddtablefromfiles), for yderligere oplysninger om, hvordan denne klasse fungerer og hvordan man bruger den.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
[ **EDDTableAggregateRows** ](#eddtableaggregaterows)kan gøre en EDDTable datasæt fra en gruppe "barn" EDDTable datasæt.

* Her er nogle anvendelser for EDDTableAggregateRows:
    * Du kan foretage en EDDTableAggregateRows datasæt fra to forskellige typer filer eller datakilder, f.eks. et datasæt med data op til slutningen af sidste måned gemt i.ncCF-filer og et datasæt med data for den nuværende måned gemt i en relationel database.
    * Du kan gøre en EDDTableAggregateRows datasæt til at håndtere en ændring i kildefiler (for eksempel ændrede tidsformatet, eller et variabelt navn ændres, eller data Type/typescale\\_factor/ / / /add\\_offsetændret) . I dette tilfælde vil et barn få data fra filer foretaget før ændringen, og det andet barn ville få data fra filer foretaget efter ændringen. Denne brug af EDDTableAggregateRows er et alternativ til at bruge[NcML](#ncml-files)eller eller eller[NCO](#netcdf-operators-nco). Medmindre der er en skelnende funktion i filnavnene (så du kan bruge&lt;fileNameRegex&gt; for at afgøre, hvilken fil tilhører, hvilket barn datasæt), skal du sandsynligvis gemme filerne til de to barns datasæt i forskellige mapper.
    * Du kan lave en EDDTableAggregateRows datasæt, der har et delt undersæt af variabler af en eller flere lignende, men forskellige datasæt, f.eks. et datasæt, der gør en profildatasæt fra kombinationen af et profildatasæt, et TimeSeriesProfil datasæt, og en TrajectoryProfil datasæt (som har nogle forskellige variabler og nogle variabler til fælles - i hvilket tilfælde du skal lave specielle varianter til børnedatasæt, med blot de in-common variabler) .
    * Du kan have flere enkeltstående datasæt, hver med samme type data, men fra en anden station. Du kan efterlade disse data intakt, men også oprette en EDDTableAggregateRows datasæt, der har data fra alle stationer -- hver af barnets datasæt kan være en enkel[EDDTableFraErddap](#eddfromerddap), som peger på en af de eksisterende stationsdatasæt. Hvis du gør dette, skal du give hver af EDDTableFraErddap-datasæt en andendatasetIDend de originale enkeltstående datasæt, f.eks. ved at lade "Child" til den oprindeligedatasetID.
* Hver af barnet&lt;Dataset&gt;'s specificerede skal være et komplet datasæt, da hvis det var et stand-alone datasæt. Alle skal have det samme[dataVariables s s](#datavariable), i samme rækkefølge, med samme[destinationNames s s](#destinationname),[Datadata Typer](#datatype),[missing\\_values s s](#missing_value),[\\_FillValues](#missing_value), og[enheder](#units). metadata for hver variabel for EDDTableAggregateRows-datasættet kommer fra variabler i det første barns datasæt, men EDDTableAggregateRows vil opdatere datasættet[actual\\_range](#actual_range)metadata til at være det egentlige sortiment for alle børn.
* Anbefaling: Få hver af barnets datasæt, der arbejder som stand-alone datasæt. Så prøv at gøre EDDTableAggregateRows datasæt ved at skære og indsætte dendatasets.xmlBeskåret for hver i den nye EDDTableAggregate Rækker datasæt.
* Datasæt Standard Sortering -- Ordren af barnets datasæt bestemmer den samlede standardordre af resultaterne. Selvfølgelig kan brugerne anmode en anden sorteringsordre for et givet sæt af resultater ved at afvente ogorderBy (" " " " *kommanderet liste over variable* " " " ") til slutningen af deres forespørgsel.
* Den "kilde"[globalt globalt globalt globalt Attributter](#global-attributes)for EDDTableAggregateRows er den kombinerede globaleAttributes fra det første barns datasæt. The EDDTableAggregate Rows kan have en global&lt;addAttributes&gt; for at give yderligere globale attributter eller tilsidesætte kilde globale attributter.
#### EDDTableAggregate Rækker skelet XML{#eddtableaggregaterows-skeleton-xml} 
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
[ **EDDTableCopy** ](#eddtablecopy)kan foretage en lokal kopi af mange typer EDDTable datasæt og derefter genbevar dataene hurtigt fra den lokale kopi.

* EDDTableCopy (og for gitterdata,[EDDGridKopiere Kopier](#eddgridcopy)) er en meget let at bruge og en meget effektiv **løsning til nogle af de største problemer med at betjene data fra fjerndatakilder:** 
    * Adgang af data fra en fjern datakilde kan være langsom.
        * De kan være langsomme, fordi de er iboende langsomme (f.eks. en ineffektiv type server) ,
        * fordi de er overvældet af for mange anmodninger,
        * eller fordi din server eller fjernserveren er båndbredde begrænset.
    * Fjerndatasættet er undertiden utilgængelig (igen, af en række grunde) .
    * Omliggende på én kilde til dataene ikke skaleres godt (for eksempel, når mange brugere og mangeERDDAPs udnytte det) .
         
* Hvordan det virker -- EDDTableCopy løser disse problemer ved automatisk at foretage og vedligeholde en lokal kopi af data og betjener data fra den lokale kopi.ERDDAP™kan tjene data fra den lokale kopi meget, meget hurtigt. Og at lave og bruge en lokal kopi lindrer byrden på fjernserveren. Og den lokale kopi er en sikkerhedskopi af den oprindelige, som er nyttig i tilfælde af noget sker til originalen.
    
Der er ikke noget nyt om at lave en lokal kopi af et datasæt. Hvad er nyt her er, at denne klasse gør det\\*nemt og nemt\\*at oprette og oprette\\*opretholde vedligehold\\*en lokal kopi af data fra en\\*sort\\*af typer fjerndatakilder og\\*Tilføje metadata\\*mens du kopierer dataene.
    
#### EDDTableCopy vs&lt;cacheFraUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFraUrl&gt; er et alternativ til EDDTableCopy. De arbejder anderledes.

* EDDTabel Kopier værker ved at anmode om bundter af data fra en fjerntjeneste og gemme disse bidder i lokale filer. Således er EDDTableCopy nyttige i nogle tilfælde, hvor dataene er tilgængelige via en fjerntjeneste.
* [ []&lt;cacheFraUrl&gt;] (#cachefraurl) Download de eksisterende filer på en fjern hjemmeside.&lt;cacheFraUrl&gt; er nemmere at bruge og mere pålidelig, da det nemt kan fortælle, hvornår der er en ny fjerndatafil, eller når en fjerndatafil har ændret sig og dermed skal downloades.

Hvis der er situationer, hvor EDDTableCopy eller&lt;cacheFraUrl&gt; kunne bruges, brug&lt;cacheFraUrl&gt;, fordi det er nemmere og mere pålidelig.
     
#### &lt;Udsugning Navn og nød;{#extractdestinationnames} 
EDDTabel Kopier gør den lokale kopi af dataene ved at anmode om bundter af data fra fjerndatasættet. EDDTabel Kopier afgør, hvilke bidder der skal anmodes ved at anmode om () værdier for værdierne&lt;Udsugningsnavne&gt; (angivet i det angivnedatasets.xml, se nedenfor) , som er de pladsbebyggede destinationsnavne af variable i fjerndatasættet. For eksempel,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
kan give forskellige værdier kombinationer af driveer=tig17, profile=1017, driveer=tig17, profile=1095,... driveer=une12, Profilee =223, driveer=une12, profile=1251,...

I situationer, hvor en kolonne (for eksempel profil) kan være alt, der kræves til entydigt at identificere en gruppe af rækker af data, hvis der er et meget stort antal, for eksempel profiler, kan det være nyttigt at også angive en ekstra ekstrakt Destination Navn (f.eks. generator) som tjener til at uddele profilerne. Det fører til færre datafiler i en given mappe, som kan føre til hurtigere adgang.
    
#### Lokale filer{#local-files} 
Hver mængde data gemmes i en separatNetCDFfil i en undermappe af *bigParentDirectory* /copy / *datasetID* / / / / (som angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)) . Der er et subdirekte niveau for alle, men den sidste ekstraktDestinationName. For eksempel vil data for tig17+1017 blive gemt i
     *bigParentDirectory* /copy/sampleDataset/tig17/1017.nc.
For eksempel vil data for ue12+1251, blive gemt i
     *bigParentDirectory* /copy/sampleDataset/une12/1251.nc.
Directory og filnavne, der er oprettet fra dataværdier, ændres for at gøre dem fil-name-safe (For eksempel erstattes rum af "x20") - Dette påvirker ikke de faktiske data.
     
#### Nye data{#new-data} 
Hver gang EDDTabel Kopier er genindlæst, det kontrollerer fjerndatasættet for at se, hvilke forskellige stykker er tilgængelige. Hvis filen for en flok data ikke allerede findes, tilføjes en anmodning om at få klumpen til en kø.ERDDAP's opgaveThread processer alle de køerede anmodninger om bidder af data, en-by-one. Du kan se statistik for opgavenThreads aktivitet på opgaven[Status side](/docs/server-admin/additional-information#status-page)og i området[Daglig rapport](/docs/server-admin/additional-information#daily-report). (Ja,ERDDAP™kunne tildele flere opgaver til denne proces, men det ville bruge masser af fjerndatakildens båndbredde, hukommelse og CPU tid, og masser af den lokaleERDDAP's båndbredde, hukommelse og CPU tid, heller ikke af hvilket er en god ide.) 
    
BEMÆRK: Den første gang en EDDTableCopy er indlæst, (hvis alt går godt) masser af anmodninger om bundter af data vil blive tilføjet til opgaveThread's kø, men ingen lokale datafiler bliver oprettet. Så udvikleren vil mislykkes, men opgaveThread vil fortsætte med at arbejde og oprette lokale filer. Hvis alt går godt, vil opgaveThread gøre nogle lokale datafiler og det næste forsøg at indlæse datasættet (i ~15 minutter) vil lykkes, men i første omgang med en meget begrænset mængde data.
    
BEMÆRK: Når det lokale datasæt har nogle data og vises i dine dataERDDAP, hvis fjerndatasættet er midlertidigt eller permanent ikke tilgængelig, vil det lokale datasæt stadig arbejde.
    
ADVARSEL: Hvis fjerndatasættet er stor og/eller fjernserveren er langsom (det er problemet, er det ikke?&#33;) , vil det tage lang tid at lave en komplet lokal kopi. I nogle tilfælde vil den nødvendige tid være uacceptabel. For eksempel, overføre 1 TB data over en T1-linje (0.15 GB/s) tager mindst 60 dage under optimale betingelser. Desuden bruger den masser af båndbredde, hukommelse og CPU tid på fjern og lokale computere. Løsningen er at sende en harddisk til administratoren af fjerndatasættet, så s/he kan lave en kopi af datasættet og sende harddisken tilbage til dig. Brug disse data som udgangspunkt og EDDTableCopy vil tilføje data til det. (Det er, hvordan Amazons EC2 Cloud Service brugte til at håndtere problemet, selvom deres system har masser af båndbredde.) 
    
ADVARSEL: Hvis en given kombination af værdier forsvinder fra et fjerndatasæt, sletter EDDTableCopy IKKE den lokale kopierede fil. Hvis du vil, kan du slette det selv.
    
#### TabelCopy&lt;CheckSourceData&gt;{#tablecopy-checksourcedata} 
The The The The The The Thedatasets.xmlfor denne datasæt kan have et valgfrit tag
```
    <checkSourceData>true</checkSourceData>  
```
Standardværdien er sandt. Hvis / når du angiver det til falsk, vil datasættet ikke nogensinde kontrollere kildedatasættet for at se, om der er yderligere data tilgængelige.
     
#### Anbefalet brug{#recommended-use} 
1. Opret forbindelse&lt;Datasæt&gt; indgang (den oprindelige type, ikke EDDTableCopy) til fjerndatakilden. **Få det til at arbejde korrekt, herunder alle de ønskede metadata.** 
2. Hvis det er for langsom, skal du tilføje XML-kode til at pakke den i et EDDTableCopy-datasæt.
    * Brug en andendatasetID  (måske ved at ændre dendatasetIDaf den gamledatasetIDlidt lidt lidt lidt) .
    * Kopiere den&lt;tilgængelig Til&gt;,&lt;reloadEveryNMinutes&gt; og&lt;påChange&gt; fra fjernbetjeningen EDDTables XML til EDDTableCopys XML. (Deres værdier for EDDTableCopy materie; deres værdier for det indre datasæt bliver irrelevant.) 
    * Opret forbindelse&lt;Udsugningsnavne&gt; tag (Se ovenstående) .
    *   &lt;OrderExtractBy&gt; er en OPTIONAL-plads adskilt liste over destinationsvariable navne i fjerndatasættet. Når hver klump af data downloades fra fjernserveren, sorteres størrelsen af disse variabler (af den første variabel, derefter af den anden variabel, hvis den første variabel er bundet,...) . I nogle tilfælde,ERDDAP™vil kunne udtrække data hurtigere fra de lokale datafiler, hvis den første variabel på listen er en numeriske variabel ("time"tæller som en numeriske variabel) . Men vælg disse variabler på en måde, der er egnet til datasættet.
3.  ERDDAP™vil foretage og vedligeholde en lokal kopi af dataene.
         
* ADVARSEL: EDDTableCopy antager, at dataværdierne for hver klump ikke nogensinde ændrer sig. Hvis / når de gør, skal du manuelt slette de chunk-filer i *bigParentDirectory* /copy / *datasetID* / som ændrede og[flag flag flag flag](/docs/server-admin/additional-information#flag)de datasæt, der skal indlæses, så de slettede bidder vil blive erstattet. Hvis du har et e-mail-abonnement til datasættet, får du to e-mails: en når datasættet først genindlæsser og begynder at kopiere dataene, og en anden, når datasættet indlæses igen (automatisk automatisk automatisk) og registrerer de nye lokale datafiler.
     
* Metadata -- Hvis du har brug for at ændre nogetaddAttributeseller ændre rækkefølgen af de variabler, der er forbundet med kildedatasættet:
    1. Ændre ændringenaddAttributesfor kildedatasættet idatasets.xml, efter behov.
    2. Slette en af de kopierede filer.
    3. Indstil et sæt[flag flag flag flag](/docs/server-admin/additional-information#flag)at indlæse datasættet umiddelbart. Hvis du bruger et flag, og du har et e-mail-abonnement på datasættet, får du to e-mails: en når datasættet først genindlæsser og begynder at kopiere dataene, og en anden, når datasættet indlæses igen (automatisk automatisk automatisk) og registrerer de nye lokale datafiler.
    4. Den slettede fil vil blive genskabt med de nye metadata. Hvis kildedatasættet nogensinde er utilgængelig, vil EDDTableCopy-datasættet få metadata fra den regenererede fil, da det er den yngste fil.
         
*   [EDDGridKopiere Kopier](#eddgridcopy)er meget lig EDDTableCopy, men arbejder med gitterded datasæt.
#### EDDTableCopy skelet XML{#eddtablecopy-skeleton-xml} 
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

## Detaljer Detaljer{#details-1} 

Her er detaljerede beskrivelser af almindelige tags og attributter.

### &lt;agularDegreeUnits&gt;{#angulardegreeunits} 
* [ [] ** &lt;agularDegreeUnits&gt; ** Særkegle (#angulære enhedsenheder) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlsom indeholder en koma-separat liste over enheder strenge, der er strengeERDDAP™bør behandle som agulære graders enheder. Hvis en variabel har en af disse enheder,tabledap'sorderByMeanfilteret vil beregne midlerne på en særlig måde, og derefter rapportere den gennemsnitlige værdi fra -180 til 180. Se endnuERDDAP's EDStatic.java kildekode fil til den aktuelle standardliste. Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).
### &lt;agularDegreeTrueUnits&gt;{#angulardegreetrueunits} 
* [ [] ** &lt;agular GradTrueUnits&gt; ** Særkegle (#angulær graderstrueenheder) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlsom indeholder en koma-separat liste over enheder strenge, der er strengeERDDAP™bør behandle som agulære grader sande enheder. Hvis en variabel har en af disse enheder,tabledap'sorderByMeanfilteret vil beregne midlerne på en særlig måde, og derefter rapportere den gennemsnitlige værdi fra 0 til 360. Se endnuERDDAP's EDStatic.java kildefil til den aktuelle standardliste. Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).
     
### &lt;fælles standardnavne&gt;{#commonstandardnames} 
* [ [] ** &lt;almindelige standardnavne&gt; ** Særkegle (#fælles standardnavne) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlfor at angive en komma-separeret liste over fælles[CF standardnavne](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). E.g.,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Denne liste bruges i DataProviderForm3.html som en bekvemmelighed for brugere.
Hvis du ønsker at give disse oplysninger idatasets.xml, begynde at kopiere den aktuelle standardliste på&lt;DEFAULT\\_commonStandardnavne&gt; i in in in inERDDAP's
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil.
     
### &lt;cacheMinutes &gt;{#cacheminutes} 
* [ [] ** &lt;cacheMinutes&gt; ** Særkegle (#cache minutter) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlat angive alder (på få minutter) hvor filer i cachen skal slettes (Standard=60) . E.g.,
```
    <cacheMinutes>60</cacheMinutes>  
```
Generelt, kun billedfiler (fordi de samme billeder ofte anmodes gentagne gange) og og og.ncfiler filer filer (fordi de skal være fuldt oprettet, før de sender til brugeren) er cached. Selvom det kan synes som en given anmodning bør altid returnere den samme svar, det er ikke sandt. For eksempel ettabledapanmodning, der indeholder tid&gt; *nogle af nogle Tidstid* vil ændre, når nye data ankommer til datasættet. Og en gitteretap anmodning, der omfatter\\[sidst\\]for tidsdimensionen vil ændre, når nye data ankommer til datasættet. Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag). Før før førERDDAP™v2.00, dette blev angivet i setup.xml, som stadig er tilladt, men discouraged.

### &lt;cacheClearMinutes&gt;{#cacheclearminutes} 
* [ [] ** &lt;cacheClearMinutes&gt; ** Særkegle (#cacheclear minutter) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlfor at angive hyppigheden for at kontrollere cached-filer og fjerne gamle dem (på få minutter)   (Standard=15) . E.g.,
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Når serveren afslutter håndteringen af en anmodning, vil den kontrollere, hvor længe siden den sidste cache var klar. Hvis det var for længe siden, vil det køere en opgave på OpgaveThread for at rydde cachen. Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag). Dette kan angives i angivet i opsætning.xml, men det er diskotek.
     
### &lt;konvertereInterpolateRequestCSVExample&gt;{#convertinterpolaterequestcsvexample} 
* [ [] ** &lt;konvertereInterpolateRequestCSVExample&gt; ** Særkegle (#convertinterpolaterequestcsvexample) er en OPTIONAL tag inden for et&lt;ErddapDatasets&gt; tag i tagdatasets.xml \\[begyndende medERDDAP™v2.10\\]som indeholder et eksempel, der vil blive vist på Interpolate konverterens webside. Standardværdien er: jplMURSST41/analyseret \\_sst/Bilinear/4 .
### &lt;konvertereInterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [ [] ** &lt;konvertereInterpolateDatasetIDVariableList&gt; ** Særkegle (#konvertinterpolatedatasetidvariablelist) er en OPTIONAL tag inden for et&lt;ErddapDatasets&gt; tag i tagdatasets.xml \\[begyndende medERDDAP™v2.10\\]som indeholder en CSV liste overdatasetID/variabel Navne eksempler, der vil blive brugt som forslag fra Interpolate konverterens webside. Standardværdien er: jplMURSST41/analyseret \\_sst.
### &lt;konvertereToPublicSourceUrl&gt;{#converttopublicsourceurl} 
* [ [] ** &lt;konvertereToPublicSourceUrl&gt; ** Særkegle (#converttopublicsourceurl) er en OPTIONAL tag inden for et&lt;ErddapDatasets&gt; tag i tagdatasets.xmlsom indeholder en "fra" og en "at" egenskab, der angiver, hvordan man konverterer en matchende lokalsourceUrl  (normalt et IP-nummer) til offentlighedensourceUrl  (et domænenavn) . "fra" skal have formularen "\\[noget\\]// // //\\[noget\\]/". Der kan være 0 eller flere af disse tags. Yderligere oplysninger se [&lt;sourceUrl&gt;] (#sourceurl) . For eksempel,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
vil forårsage en matchende lokalsourceUrl  (f.eks. https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
til offentlighedensourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) .
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).

Men af sikkerhedsmæssige årsager og grunde til abonnementssystemet, **DON's brug af denne TAG&#33;**   
Brug altid det offentlige domænenavn i stedet&lt;sourceUrl&gt; tag og brug af[/etc/hosts bord](https://linux.die.net/man/5/hosts)på din server for at konvertere lokale domænenavne til IP-numre uden at bruge en DNS-server. Du kan teste, om et domænenavn er korrekt konverteret til et IP-nummer ved hjælp af:
ping *nogle.domæne.name*   
     
### data:image/png;base64,{#dataimagepngbase64} 
* Når en bruger anmoder om en bruger.htmlTablesvar fraERDDAP™, hvis dataene i en streng celle indeholder data:image/png;base64, efterfulgt af en base64 kodet .png billede,ERDDAP™vil vise et ikon (så brugeren kan se billedet, hvis de svæver over det) og knapper for at gemme teksten eller billedet til udklipsholderen. Denne funktion blev tilføjet iERDDAP™v2.19 af Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)Angiv den standardindstilling, der styrer, hvornår og hvordan landmanden skal trækkes, nårERDDAP™Træk et kort. Det kan angives i tre forskellige steder idatasets.xml  (noteret fra laveste til højeste prioritet) :
    
    1. HvisdrawLandMasker angivet inden&lt;ErddapDatasets&gt; (ikke tilsluttet nogen specifik datasæt) , så det angiver standardværdien afdrawLandMaskfor alle variabler i alle datasæt. For eksempel,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAPLæserdatasets.xml.
Hvis dette tag ikke er til stede, er den underliggende standardværdi under.
         
    2. HvisdrawLandMasker angivet som en global egenskab af et givent datasæt, og det angiver standardværdien afdrawLandMaskfor alle variabler i den datasæt, overvej enhver lavere prioritet indstilling. For eksempel,
    ```
        <att name="drawLandMask">under</att>  
    ```
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Genindlæs den datasæt.
         
    3. HvisdrawLandMasker angivet som en variabel egenskab i et givent datasæt, og det angiver standardværdien afdrawLandMaskfor denne variabel i den datasæt, overvej enhver lavere prioritet indstilling. For eksempel,
    ```
        <att name="drawLandMask">under</att>  
    ```
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Genindlæs den datasæt.
    
En bruger kan tilsidesætte standarden (uanset hvor det er angivet) ved at vælge en værdi for "Draw jordmaske" fra en rulleliste på datasættets Make A Graph-side, eller ved at inkludere &.land= *værdiværdiværdiværdi* i den URL, der anmoder om et kort fraERDDAP.
    
I alle situationer er der 4 mulige værdier for attributten:
    
    * "under" trækker landmanden, før den trækker data på kortet.
For gitterede datasæt, land vises som en konstant lys grå farve.
For tabulære datasæt, "under" viser topografi data over land og oceaner.
    * "over" -- For netded datasæt, "over" trækker jordmask, efter at det trækker data på kort, så det vil maskere alle data over land. For tabulære datasæt, "over" viser badymetry af havet og en konstant lys grå, hvor der er land, begge tegnet under dataene.
    * "outline" trækker bare omridset af landmuren, politiske grænser, søer og floder.
    * "off" trækker ikke noget.
### &lt;e-mailDiagnosticsToErdData&gt;{#emaildiagnosticstoerddata} 
* [ [] ** &lt;EmailDiagnosticsToErdData&gt; ** Særkegle (#emaildiagnosticstoerddata) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xml. Mærkets værdi kan være sandt (Standard) eller falsk. Hvis det er sandt,ERDDAP™e-mail stacksporet til Chris. John på noaa. gov (te te te teERDDAP™udviklingsteam) . Dette bør være sikkert og sikkert, da ingen fortrolige oplysninger (f.eks. anmodningenUrl) er inkluderet i emailen. Dette skal gøre det muligt at fange enhver obscure, helt uventede bugs, der fører til NullPointerExceptions. Ellers ser brugeren undtagelserne, men undtagelserneERDDAP™udviklingsteam gør ikke (så vi ved ikke der er et problem, der skal løses) .
     
### &lt;grafBackgroundColor&gt;{#graphbackgroundcolor} 
* [ [] ** &lt;grafBackgroundColor&gt; ** Særkegle (#graphbackgroundcolor) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlfor at angive standard baggrundsfarve på grafer. Dette påvirker næsten alle grafer. Der er et par situationer, der ikke påvirkes. Farven er angivet som en 8 cifret hexadecimal værdi i form 0xAARRGGBB, hvor AA, RR, GG og BB er opacity, rød, grøn og blå komponenter, henholdsvis. "0x" er tilfælde følsom, men hexadecimal cifre er ikke tilfældet følsomme. For eksempel en fuld opaque (ff) grønlig blå farve med rød=22, grøn=88, blå=ee ville være 0xff2288e. Opaque hvid er 0xffffffffffffffffffffffff. Standarden er uigennemsigtig lyseblå (0xffccff) , som har fordel af at være anderledes end hvid, som er en vigtig farve i mange paletter, der bruges til at tegne data. For eksempel,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).
### &lt;ipAddressMaxRequests&gt;{#ipaddressmaxrequests} 
* [ [] ** &lt;ipAddressMaxRequests&gt; ** Særkegle (I nærheden af #ipadressemaxrequests) er en sjældent brugt valgfri tag (først understøttet medERDDAP™v2.12) inden for et område&lt;ErddapDatasets&gt; tag i tagdatasets.xmldet er en del af et system til at begrænse muligheden for at overly aggressive legitime brugere og ondsindede brugere til at foretage et stort antal samtidige anmodninger, som ville degrade system præstation for andre brugere. I nærheden af ipAddress MaxRequests angiver det maksimale antal samtidige anmodninger, der vil blive accepteret fra enhver specifik IP-adresse. Yderligere anmodninger vil modtage en HTTP 429 fejl: Too Many Requests. De små, statiske filer i erddap/download/ og erddap/billeder/ er ikke fritaget for dette tælle. Standarden er 15. Den maksimale tilladt er 1000, som er vanvittigt høj - ikke gør det&#33;ERDDAP™Accepter ikke et nummer mindre end 6, fordi mange legitime brugere (især webbrowsere og browsereWMSklienter kunder) op til 6 anmodninger ad gangen. The The The The The The TheERDDAP™Daglig rapport og de lignende oplysninger, der er skrevet til log.txt-filen med hver Major Dataset Reload, vil nu indeholde et talligt af anmodninger fra disse IP-adresser under titlen "Requester's IP Adresse (For mange anmodninger) ".
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).
    
"Major LoadDatasets Time Series" sektionen Status.html indeholder en "tooMany" kolonne, der angiver antallet af anmodninger, der overskrider en brugers ipAddressMaxRequests indstilling og dermed så en "Too Mange anmodninger" fejl. Dette lader dig nemt se, når der er aktive overly aggressive legitime brugere og ondsindede brugere, så du kan (valgfrit) Se i log.txt-filen og beslutte, om du vil blacklist dem.
    
Der er intet specifikt galt med at indstille dette til et højere nummer. Det er op til dig. Men gør det muligt / opfordrer folk til at opsætte systemer, der bruger et stort antal tråde til at arbejde på projekter og giver dem ingen feedback om, at hvad de gør, ikke får dem nogen fordel.
### &lt;ipAddressMaxRequestsActive&gt;{#ipaddressmaxrequestsactive} 
* [ [] ** &lt;IpAddressMaxRequestsActive&gt; ** Særkegle (#ipadressemaxrequestsactive) er en sjældent brugt valgfri tag (først understøttet medERDDAP™v2.12) inden for et område&lt;ErddapDatasets&gt; tag i tagdatasets.xmldet er en del af et system til at begrænse muligheden for at overly aggressive legitime brugere og ondsindede brugere til at foretage et stort antal samtidige anmodninger, som ville degrade system præstation for andre brugere. ipAddressMaxRequestsActive angiver det maksimale antal samtidige anmodninger, der aktivt behandles fra enhver specifik IP-adresse. Yderligere anmodninger vil sidde i en kø, indtil de tidligere anmodninger er behandlet. De små, statiske filer i erddap/download/ og erddap/billeder/ er fritaget for dette tælle og den relaterede throtling. Standarden er 2. Den maksimale tilladt er 100, som er vanvittigt høj - ikke gør det&#33; Du kan indstille dette til 1 at være streng, især hvis du har problemer med overly aggressive eller ondsindede brugere. Brugere vil stadig hurtigt få alle de data, de anmoder om (op til ipAddressMaxRequests) , men de vil ikke kunne hog systemressourcer. Vi anbefaler ikke at indstille dette til et større nummer, fordi det giver mere aggressive legitime brugere og ondsindede brugere til at dominereERDDAP's behandling kapacitet.
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).
     
### &lt;ipAddressUnlimited&gt;{#ipaddressunlimited} 
* [ [] ** &lt;ipAddressUnlimited&gt; ** Særkegle (#anbegrænser) er en sjældent brugt valgfri tag (først understøttet medERDDAP™v2.12) inden for et område&lt;ErddapDatasets&gt; tag i tagdatasets.xmldet er en del af et system til at begrænse muligheden for at overly aggressive legitime brugere og ondsindede brugere til at foretage et stort antal samtidige anmodninger, som ville degrade system præstation for andre brugere. ipAddressUnlimited er en koma-separat liste over IP-adresser, du ønsker at tillade ubegrænset adgang til dinERDDAP. Kig i din log. txt-filen for at se, hvilket format din server bruger til IP-adresser. På nogle servere, vil IP-adresserne være i formatet #.#.#.#. (hvor # er et heltals fra 0 til 255) ; der henviser til, at på andre vil det være i formatet #:#:#:#:#:#:#:#:#:#:#:# . Anmodninger på denne liste er ikke underlagt enten ipAddressMaxRequests eller ipAddressMaxRequestsActive indstillinger. Dette kan være en sekundærERDDAP™eller for visse brugere eller servere i dit system.ERDDAP™tilføjer altid " (I nærheden af ukendtIPAddress) ", somERDDAP™Bruger når anmodnings IP-adressen ikke kan bestemmes, f.eks. for andre processer, der kører på samme server.
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).
    
Hvis en eller anden grund alle en brugers anmodninger får fejlmeddelelsen "Timeout venter på dine andre anmodninger om at behandle.", kan du løse problemet ved at tilføje brugerens IP-adresse til den ipAddressUnlimited liste, anvende den ændring, og fjerne det fra listen.
    
### &lt;belastningDatasetsMinutes&gt;{#loaddatasetsminminutes} 
* [ [] ** &lt;belastningDatasetsMinMinutes&gt; ** Særkegle (#loaddatasetsmin minutter) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlat angive minimumstiden (på få minutter) mellem større belastning Datasæt (når du nårERDDAP™Reprocesdatasets.xml, herunder at kontrollere hvert datasæt for at se, om det skal indlæses efter dens genindlæsning EveryNMinutes indstilling, standard=15) . E.g.,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Hvis en given køre af lastDatasets tager mindre end denne gang, ser læsseren bare gentagne gange på flagmappen og/eller sover, indtil den resterende tid er bestået. Standarden er 15 minutter, som skal være fint for næsten alle. Den eneste ulempe at sætte dette til et mindre nummer er, at det vil øge den frekvens, derERDDAP™retries datasæt, der har fejl, der forhindrer dem i at blive indlæst (f.eks. er en fjernserver nede) . Hvis der er mange af disse datasæt, og de bliver genprøvet ofte, kan datakilden overveje den plagende adfærd. Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag). Før før førERDDAP™v2.00, dette blev angivet i setup.xml, som stadig er tilladt, men discouraged.
     
### &lt;belastningDatasetsMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* [ [] ** &lt;belastningDatasetsMaxMinutes&gt; ** Særkegle (#loaddatasetsmax minutter) er en OPTIONAL tag inden for et&lt;ErddapDatasets&gt; tag i tagdatasets.xmlfor at angive den maksimale tid (på få minutter) en stor belastning Datasets indsats er tilladt at tage (før belastningen Datasets gevind behandlet som "installeret" og afbrydes)   (Standard=60) . E.g.,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Generelt skal dette være indstillet til mindst to gange så længe du med rimelighed mener, at genindlæs alle datasæt (kumulativt) bør tage (da computere og netværk undertiden er langsommere end forventet) Det bør altid være meget længere end belastningDatasetsMinMinutes. Standarden er 60 minutter. Nogle vil sætte dette i længere tid. Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag). Før før førERDDAP™v2.00, dette blev angivet i setup.xml, som stadig er tilladt, men discouraged.
     
### &lt;LogLevel&gt;{#loglevel} 
* [ [] ** &lt;LogLevel&gt; ** Særkegle (#logniveau) er en OPTIONAL tag inden for et&lt;ErddapDatasets&gt; tag i tagdatasets.xmlfor at angive, hvor mange diagnostiske meddelelser sendes til log.txt-filen. Det kan indstilles til "krig" (de fåste beskeder) , "info" (Standard) , eller "alle" (de mest meddelelser) . E.g.,
```
    <logLevel>info</logLevel>  
```
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag). Før før førERDDAP™v2.00, dette blev angivet i setup.xml, som stadig er tilladt, men discouraged.
     
### &lt;delvisRequestMaxBytes&gt; og&lt;delviseRequestMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ [] ** &lt;Oversættelse af partRequestMaxBytes&gt; **Særkegle (#partialrequestmaxbytes-og-partialrequestmaxcells) og [** &lt;Oversættelse af partRequestMaxCells&gt; ** Særkegle (#partialrequestmaxbytes-og-partialrequestmaxcells) bruges sjældent OPTIONAL-tags i en&lt;ErddapDatasets&gt; tag i tagdatasets.xml. Hvornår muligt (og det er ikke altid muligt) ,ERDDAP™bryder store data anmodninger ind i chunks for at spare hukommelse.
    
Med 32 bitJava, i en forenklet forstand, det maksimale antal samtidige *stor stor stor stor* anmodninger er omkring 3/4 af hukommelsen til rådighed (-Xmx værdi passer til Tomcat) opdelt i størrelse (f.eks. 1200 MB / 100 MB =&gt; 12 anmodninger) . Andre ting kræver hukommelse, så det faktiske antal anmodninger vil være mindre. I praksis er klumpning ikke altid muligt. Så et stort eller et par meget store samtidige ikke-kunkable anmodninger kunne forårsage problemer på 32 bitJava.

Med 64 bitJava, -Xmx værdi kan være meget større. Så hukommelse er meget mindre sandsynligt at være en begrænsning.

Du kan tilsidesætte standardstørrelsen ved at definere disse tags idatasets.xml  (med forskellige værdier end vist her) :
Til gitter:&lt;DelvisteMaxBytes&gt;100000000&lt;/ partalRequestMaxBytes&gt;
Til tabeller:&lt;partielleRequestMaxCells&gt;1000000&lt;/ partalRequestMaxCells&gt;

partRequestMaxBytes er det foretrukne maksimale antal bytes for en delvis gitter dataanmodning (en smule af den samlede anmodning) . Standard=100000000 (10^8) . Større størrelser er ikke nødvendigvis bedre (og gå ikke over 500 MB, fordi det er THREDDS's standardgrænse forDAPbesvarelser) . Men større størrelser kan kræve færre adganger af tonsvis af filer (Tænk påERD's satellitdata med hver gang punkt i en separat fil - det er bedre at få flere data fra hver fil i hver delvis anmodning) .

partRequestMaxCells er det foretrukne maksimale antal celler (\\* n-tegninger i datatabellen) for en delvis TABLE-dataforespørgsel (en smule af den samlede anmodning) . Standard = 100000. Større størrelser er ikke nødvendigvis bedre. De resulterer i en længere ventetid for den første batch af data fra kilden.

Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag). Før før førERDDAP™v2.00, disse blev angivet i setup.xml, som stadig er tilladt, men discouraged.
     
### &lt;anmodning Blacklist&gt;{#requestblacklist} 
* [ [] ** &lt;Anmod om Blacklist&gt; ** Særkegle (#requestblacklist)  [er en OPTIONAL tag](/docs/server-admin/additional-information#frequent-crashes-or-freezes)inden for et område&lt;ErddapDatasets&gt; tag i tagdatasets.xmlsom indeholder en komma-separat liste over numeriske IP-adresser, som vil blive sortlistet. Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).
    * Dette kan bruges til at afværge en[Denial of Service angreb](https://en.wikipedia.org/wiki/Denial_of_service), en mere zealous[Web robot](https://en.wikipedia.org/wiki/Internet_bot), eller enhver anden type besværlig bruger.
    * Bruger -- HvisERDDAP™langsommere til en crawl eller fryser/stop, årsagen er ofte en besværlig bruger, der kører mere end et script på én gang og/eller gør et stort antal meget store, ekstremt ineffektive eller ugyldige anmodninger eller samtidig anmodninger. Kig ind i[log.txt](/docs/server-admin/additional-information#log)for at se, om dette er tilfældet og at finde den numeriske IP-adresse af den besværlige bruger. Hvis dette er problemet, skal du sandsynligvis blacklist, som bruger.
        
Hvornår Hvornår skal man HvornårERDDAP™Få en anmodning fra en sortlistet IP-adresse, vil den returnere HTTP-fejl 403: Forbidden. Den medfølgende tekstfejlmeddelelse opfordrer brugeren til at sende dig en e-mail.ERDDAPadministrator, at arbejde ud af problemerne. Hvis de tager tid til at læse fejlmeddelelsen (mange åbenbart ikke) og kontakt dig, kan du derefter arbejde med dem for at få dem til at køre blot et script på et tidspunkt, foretage mere effektive anmodninger, løse problemerne i deres script (f.eks. anmode om data fra et fjerndatasæt, der ikke kan svare før timingen ud) , eller hvad der ellers var kilden til problemer.
        
Brugere er ofte blot uvidende om, at deres anmodninger er besværlige. De er ofte uvidende om bugs, grove mangler eller andre problemer med deres scripts. De tænker ofte på, at fordi dinERDDAP™tilbyder data gratis, at de kan bede om så mange data, som de ønsker, f.eks. ved at køre flere scripts eller ved at bruge flere tråde samtidig.
        
        * Du kan forklare dem, at hverERDDAP™, nu uanset hvor stor og kraftfuld, har begrænsede ressourcer (CPU tid, harddisk I/O, netværks båndbredde osv.) og det er under ingen omstændigheder, hvis en bruger anmoder om data på en måde, at folk udgår andre brugere ellersERDDAP.
        * Når en bruger ved, hvordan man laver 2 samtidige anmodninger, ser de ofte ingen grund til ikke at foretage 5, 10 eller 20 samtidige anmodninger, da de ekstra anmodninger koster dem ingenting. Det er ligesom asymmetrisk krigsførelse: her, de offensive våben har en enorm fordel (nulomkostninger) over de defensive våben (en endelig installation med rigtige omkostninger) .
        * Peg ud til dem, at der mindskes afkast for at gøre flere og flere samtidige anmodninger; de yderligere anmodninger bare blokere andre brugeres anmodninger; de giver ikke en enorm forbedring for dem.
        * Husk dem, at der er andre brugere (både casual brugere og andre brugere kører scripts) , så det er ikke fair for dem at hog alle afERDDAP's ressourcer.
        * Peg ud af, at techgiganterne har induceret brugere til at forvente uendelige ressourcer fra webtjenester. Mens der er måder at sætte op[gitter / clusters/federationer afERDDAPs s s](/docs/server-admin/scaling)at lave enERDDAP™system med flere ressourcer, mestERDDAP™Administratorer har ikke penge eller mandskab til at opsætte sådanne systemer, og et sådant system vil stadig være begrænset. At tage påERDFor eksempel er der en person (mig) skrivningERDDAP™, administrere toERDDAPs s s (med hjælp fra min chef) , og administration af flere datakilder, alle med et årligt hardwarebudget på $0 (Vi er afhængige af lejlighedsvise bevillinger til at betale for hardware) . Dette er ikke Google, Facebook, Amazon osv med 100's ingeniører, og millioner af dollars af indtægter til at genbruge i stadig større systemer. Og vi kan ikke bare flytte voresERDDAP™f.eks. Amazon AWS, fordi datalagringsomkostningerne er store, og de dataeksplosionsafgifter er store og variable, mens vores budget for eksterne tjenester er et fast $0.
        * Min anmodning om brugere er: for ikke-time-følsomme anmodninger (som er langt den mest almindelige sag) , deres system skal bare foretage en anmodning på et tidspunkt. Hvis anmodninger er følsomme (f.eks. flere .pngs på en webside, flere fliser for enWMSklient osv.) , så måske 4 samtidige anmodninger skal være max (og bare for en meget kort tid) .
        * Hvis du forklarer situationen til brugeren, vil de fleste brugere forstå og være villige til at foretage de nødvendige ændringer, så du kan fjerne deres IP-adresse fra blacklist.
             
    * Hvis du vil blacklist en bruger, skal du tilføje deres numeriske IP-adresse til den komposterede liste over IP-adresser i&lt;Anmod om Blacklist&gt; i dindatasets.xmlfil. Hvis du vil finde den fejlagtige brugers IP-adresse, skal du se i denERDDAP™  *bigParentDirectory* /logs/log.txt-fil ( *bigParentDirectory* er angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)) for at se, om dette er tilfældet og at finde den brugers IP-adresse. IP-adressen for hver anmodning er angivet på linjerne, der starter med "&#123;&#123;&#123;&#123; og er 4 tal adskilt af perioder, f.eks. 123.45.67.8 . Søger efter "ERROR" vil hjælpe dig med at finde problemer som ugyldige anmodninger.
    * Du kan også erstatte det sidste nummer i en IP-adresse med\\*(f.eks. 202.109.200.\\*) at blokere en række IP-adresser, 0-255.
    * Du kan også erstatte de sidste 2 tal i en IP-adresse med\\*.\\*  (for eksempel 121.204.\\*.\\*) at blokere en bredere vifte af IP-adresser, 0-255.0-255.
    * For eksempel,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Du behøver ikke at genstarteERDDAP™for ændringer i&lt;anmodning Blacklist&gt; at tage effekt. Ændringerne vil blive opdaget næste gangERDDAP™Kontroller, om alle datasæt skal indlæses. Eller du kan fremskynde processen ved at besøge en[sætDataset Flag URL](/docs/server-admin/additional-information#set-dataset-flag)for alle datasæt.
    * Din Dine DineERDDAP™daglig rapport indeholder en liste/tvist af de mest aktive tilladt og blokerede anmodninger.
    * Hvis du vil finde ud af, hvad domæne / institution er relateret til en numerisk IP-adresse, kan du bruge en gratis, omvendt DNS-webtjeneste som[ https://network-tools.com/ ](https://network-tools.com/).
    * Der kan være tider, når det giver mening at blokere visse brugere på et højere niveau, f.eks. ondsindede brugere. For eksempel kan du blokere deres adgang til alt på din server, ikke bareERDDAP. På Linux, en sådan metode er at bruge[iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). Du kan f.eks. tilføje en regel, der vil blokere alt, der kommer fra 198.51.100.0 med kommandoen
iptables -I INPUT -s 198.51.100.0 -j DROP
       
### &lt;slowDownTroubleMillis&gt;{#slowdowntroublemillis} 
* [ [] ** &lt;I nærheden af langsomDownTroubleMillis&gt; ** Særkegle (#slowdowntroublemillis) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlsom indeholder et tal, der angiver antallet af millisekunder (Standard=1000) at standse, når du reagerer på alle mislykkede anmodninger, f.eks. ukendte datasæt, anmode om for store, bruger på blacklist. E.g.,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Hvis et script laver en anmodning umiddelbart efter en anden, så kan det hurtigt foretage en dårlig anmodning efter en anden. Med denne indstilling kan du bremse et fejlløst script, såERDDAP™er ikke oversvømmet med dårlige anmodninger. Hvis et menneske gør en dårlig anmodning, vil de ikke engang bemærke denne forsinkelse. Anbefalinger:
    
    * Hvis problemet er en Distributed Denial Of Service (DDOS) angreb fra 100+ angribere, sæt dette til et mindre nummer (100?) . Træk dem alle ned for for længe fører til for mange aktive tråde.
    * Hvis problemet er fra 1-10 kilder, skal du indstille dette til 1000 ms (Standard) , men et større antal (som 10000) er også rimelig. Det bremser dem ned, så de spilder færre netværksressourcer. Også 1000 ms eller så vil ikke irritere menneskelige brugere, der gør en dårlig anmodning.
    
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).
     
### &lt;abonnementEmail Blacklist&gt;{#subscriptionemailblacklist} 
* [ [] ** &lt;Abonnement EmailBlacklist&gt; ** Særkegle (#subscriptionemailblacklist) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlsom indeholder en koma-separeret liste over e-mailadresser, der umiddelbart er blacklistet fra den[Abonnementssystem](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)f.eks.
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Dette er etui-infølsomme system. Hvis en e-mailadresse føjes til denne liste, hvis den e-mailadresse har abonnementer, vil abonnementer blive annulleret. Hvis en e-mailadresse på listen forsøger at abonnere, vil anmodningen blive afvist. Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).
     
### Standardtekst{#standard-text} 
*   [ **Standardtekst** ](#standard-text)-- Der er flere OPTIONAL tags (De fleste er sjældent brugt) inden for et område&lt;ErddapDatasets&gt; tag i tagdatasets.xmlfor at angive tekst, der vises på forskellige steder iERDDAP. Hvis du vil ændre standardteksten, skal du kopiere den eksisterende værdi fra mærket af det samme navn i
     *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml ind idatasets.xml, derefter ændre indholdet. Fordelen ved at have disse idatasets.xmler, at du kan angive nye værdier til enhver tid, selv nårERDDAP™kører. Eventuelle ændringer i disse tagss værdier vil påvirke næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag). Mærkenavnene beskriver deres formål, men se standardindholdet i meddelelser.xml for en dybere forståelse.
    
    *   &lt;StandardLicense&gt;
    *   &lt;Standard kontakt&gt;
    *   &lt;StandardDataLicenses&gt;
    *   &lt;StandardDisclaimerOfEndorsement&gt;
    *   &lt;StandardDisclaimerOfExternalLinks&gt;
    *   &lt;StandardGeneralDisclaimer&gt;
    *   &lt;standard standard standard Cookie- og privatlivspolitik
    *   &lt;StartHeadHtml5&gt;
    *   &lt;startBodyHtml5&gt; er et godt tag til at ændre for at tilpasse udseendet af toppen af hver webside i dinERDDAP. Især kan du bruge dette til nemt at tilføje en midlertidig meddelelse påERDDAP™Forsideside (f.eks. "Check out te new JPL MUR SST v4.1 datasæt..." eller "DetteERDDAP™vil være offline for vedligeholdelse 2019-05-08T17:00:00 PDT gennem 2019-05-08T20:00:00 PDT.) . En quirk af at sætte dette tag idatasets.xmler: når du genstarterERDDAP, den første anmodning tilERDDAP™vil returnere standardstart BodyHtml5 HTML, men hver efterfølgende anmodning vil bruge startBodyHtml5 HTML specificeret idatasets.xml.
    *   &lt;TheShortDescription Html&gt; er et godt tag til at ændre for at tilpasse beskrivelsen af dinERDDAP. Bemærk, at du nemt kan ændre dette for at tilføje en midlertidig meddelelse på startsiden (f.eks. "DetteERDDAP™vil være offline for vedligeholdelse 2019-05-08T17:00:00 PDT gennem 2019-05-08T20:00:00 PDT.) .
    *   &lt;I nærheden af endBodyHtml5&gt;
    
      
Før før førERDDAP™v2.00, disse blev angivet i setup.xml, som stadig er tilladt, men discouraged.
     
### &lt;usædvanligt usædvanligt usædvanligt Aktivitets&gt;{#unusualactivity} 
* [ [] ** &lt;usædvanligeAktivitet&gt; ** Særkegle (#usædvanlig aktivitet) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlfor at angive det maksimale antal anmodninger mellem to kørsler af LoadDatasets, der betragtes normalt (Standard =0000) . Hvis dette nummer overskrides, sendes en e-mail til e-mailEverythingTo (som angivet i opsætning.xml) . E.g.,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag). Før før førERDDAP™v2.00, dette blev angivet i setup.xml, som stadig er tilladt, men discouraged.
     
### &lt;OpdaterMaxEvents&gt;{#updatemaxevents} 
* [ [] ** &lt;OpdaterMaxEvents&gt; ** Særkegle (#updatemaxevents) er en sjældent brugt OPTIONAL tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xmlfor at angive det maksimale antal filændringer (Standard=10) der vil blive håndteret af [&lt;OpdaterEveryNMillis&gt;] (#updateeverynmillis) system inden du skifter til at indlæse datasættet i stedet. For eksempel,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
OpdateringEveryNMillis systemet er beregnet til at køre meget hurtigt lige før brugerens anmodning behandles. Hvis der er en masse filændring begivenheder, så kan det sandsynligvis ikke køre hurtigt, så det i stedet kræver, at datasættet skal indlæses. Hvis du vilERDDAP™tilbud med datasæt, der skal holdes opdateret, selv når der er ændringer i et stort antal datafiler, kan du indstille dette til et større nummer (100?) .

### &lt;Bruger&gt;{#user} 
* [ [] ** &lt;Bruger&gt; ** Særkegle (#brugere) er en OPTIONAL tag inden for et&lt;ErddapDatasets&gt; tag i tagdatasets.xmlder identificerer en brugers brugernavn, adgangskode (hvis godkendelse = brugerdefineret) , og roller (en kompareret liste) . Brugen af brugernavn og adgangskode varierer lidt baseret på værdien af [&lt;Godkendelse&gt;] (/docs/server-admin/additional-information#authentication) i din indbakkeERDDAP's setup.xml fil.
    * Dette er en del afERDDAP's[sikkerhedssystem](/docs/server-admin/additional-information#security)for at begrænse adgang til nogle datasæt til nogle brugere.
    * Lav en separat&lt;Bruger&gt; tag for hver bruger. Valgfrit, hvis godkendelse=oauth2, kan du oprette to&lt;Bruger&gt; tags for hver bruger: en for, hvornår brugeren logger ind via Google, for når brugeren logger ind via Orcid, sandsynligvis med de samme roller.
    * Hvis der ikke er noget&lt;Bruger&gt; tag til en klient, s/he vil kun være i stand til at få adgang til offentlige datasæt, dvs. datasæt, der ikke har en [&lt;tilgængeligtil&gt;] (#accessibleto) tag.
    * brugernavn brugernavn
For godkendelse=kunden er brugernavnet normalt en kombination af bogstaver, cifre, understregninger og perioder.
For godkendelse=email er brugernavnet brugerens e-mailadresse. Det kan være enhver e-mail adresse.
For godkendelse=google er brugernavnet brugerens fulde Google-mailadresse. Dette inkluderer Google-managed-konti som@noaa.govKontoer.
For godkendelse=orcid, brugernavnet er brugerens Orcid kontonummer (med puder) .
For godkendelse=oauth2, brugernavnet er brugerens fulde Google-mailadresse eller brugerens Orcid-kontonummer (med puder) .
    * Adgangskode adgangskode
For godkendelse=email, google ellercid, eller oauth2, skal du ikke angive en adgangskode attribut.
For godkendelse=kunde skal du angive en adgangskode attribut for hver bruger.
        * De adgangskoder, som brugerne indtaster, er tilfælde følsomme og skal have 8 eller flere tegn, så de er sværere at knække. I dag kan selv 8 tegn blive revnet hurtigt og billigt af brute force ved hjælp af en klynge af computere på AWS.ERDDAP™kun håndhæver 8-karakteristacter minimum, når brugeren forsøger at logge ind (ikke når brugeren forsøger at logge ind)&lt;Bruger&gt; tag bliver behandlet, fordi den kode kun ser hash fordøje af adgangskode, ikke almindelig tekstadgangskode.
        * opsætning.xml's&lt;Adgangskode nulstilling&gt; bestemmer, hvordan adgangskoder gemmes i&lt;Bruger&gt; tags idatasets.xml. For at øge sikkerheden er mulighederne:
            *   [I nærheden af MD5](https://en.wikipedia.org/wiki/MD5)  (Brug ikke dette&#33;) -- for adgangskode attributten, angive MD5 hash fordøje af brugerens adgangskode.
            * UEPMD5 (Brug ikke dette&#33;) -- for adgangskode attributten, angive MD5 hash fordøje af *brugernavn brugernavn* :ERDDAP: *Adgangskode adgangskode* . Brugernavn og "ERDDAP" bruges til at[salt salt salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) hash-værdien, hvilket gør det vanskeligere at dekoder.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (Ikke anbefalet) -- for adgangskode attributten, angive SHA-256 hash fordøje af brugerens adgangskode.
            * UEPSHA256 (Normalt anbefalet adgangskodeEncoding. Men meget bedre: brug google, orkidé eller oauth2 godkendelse indstillinger.) -- for adgangskode attributten, angive SHA-256 hash fordøje af *brugernavn brugernavn* :ERDDAP: *Adgangskode adgangskode* . Brugernavn og "ERDDAP" bruges til at salte hash-værdien, hvilket gør det vanskeligere at dekoder.
        * På Windows kan du generere MD5-adgangskode fordøje værdier ved at downloade et MD5-program (f.eks.[I nærheden af MD5](https://www.fourmilab.ch/md5/)) og brug af (for eksempel) :
md5 -djsmith:ERDDAP: *FaktiskePassword* 
        * På Linux/Unix kan du generere MD5 fordøjeværdier ved hjælp af det indbyggede md5sum-program (for eksempel) :
ekko -n "jsmith:ERDDAP: *FaktiskePassword* " " " "|md5sum
        * Gemte slettetekst adgangskoder er tilfælde følsomme. De lagrede former for MD5 og UEPMD5-adgangskoder er ikke tilfældet følsomme.
        * For eksempel (Brug UEPMD5) , hvis brugernavnføder" og kodeordet&lt;Bruger&gt; tag er:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
hvor den gemte adgangskode blev genereret med
md5 -djsmith:ERDDAP:myPassword
        * roller er en kommunaliseret liste over roller, som brugeren er autoriseret. Alle&lt;Dataset&gt; kan have en [&lt;tilgængeligtil&gt;] (#accessibleto) tag, som angiver de roller, der er tilladt at få adgang til den datasæt. For en given bruger og et givet datasæt, hvis en af rollerne i brugerens liste over roller matcher en af rollerne i datasættets liste over roller&lt;tilgængeligeTo&gt; roller, så brugeren er autoriseret til at få adgang til disse datasæt.
            
Hver bruger, der logger ind, får automatisk rollen\\[Log ind I nærheden af In In In In In In In In In In In In In In\\], om der er en&lt;Bruger&gt; tag for dem idatasets.xmleller ej. Så hvis et givet datasæt har
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
Så vil enhver bruger, der er logget ind, blive autoriseret til at få adgang til disse datasæt, selvom der ikke er nogen&lt;Bruger&gt; tag for dem idatasets.xml.
            
    * Eventuelle ændringer i dette tags værdi vil tage virkning næste gangERDDAP™Læserdatasets.xml, herunder svar på et datasæt[flag flag flag flag](/docs/server-admin/additional-information#flag).
         
### &lt;stiRegex&gt;{#pathregex} 
* [ [] ** &lt;stiRegex&gt; ** Særkegle (#patregex) lader dig angive et almindeligt udtryk, som begrænser hvilke stier (som undermapper) vil blive inkluderet i datasættet. Standarden er .\\*, som matcher alle stier. Dette er en sjældent brugt, sjældent nødvendig, OPTIONAL tag tilEDDGridFraFiles datasæt, EDDTableFraFiles datasæt og et par andre datasæt typer. Men når du har brug for det, har du virkelig brug for det.
    
For at gøre dette arbejde, skal du være virkelig god med regelmæssige udtryk. Se dette[Indeks dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)og og og[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). Især skal du vide om at tage grupper (noget inde i forældrene) , og "eller" symbolet "|".
Sammen kan du angive en række muligheder, f.eks. (mulighed1|mulighed2|mulighed3) .
Også, nogen af mulighederne kan være ingenting, f.eks., (|mulighed2|mulighed3) .
Du skal også vide, at optagelsesgrupper kan indlejres, dvs. enhver mulighed i en capture-gruppe kan indeholde en anden optagelse gruppe, f.eks., (|mulighed2 (|mulighed2 b|mulighed2c) |mulighed3) som siger, at mulighed2 kan følges af intet eller mulighed2b eller mulighed2c.
For stiRegexes, vil hver mulighed være et mappenavn efterfulgt af en /, f.eks. bar/ .
    
Den vanskelige del af stiRegex er: NårERDDAP™StiRegex skal acceptere alle de stier, det møder på vej til direktørerne med data. Regex's med indlejrede fangstgrupper er en god måde at håndtere dette.
    
Et eksempel:
Antag, at vi har følgende mappestruktur:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
og den angivne filDirectory er /foo/bar/, og vi ønsker bare den.ncfiler i D\\[0-9\\]&#123;4&#125;/a/undermapper.
Løsningen er at indstille stiRegex til /foo/bar/ (|D D D D\\[0-9\\]&#123;4&#125;/ (|a /) )   
Det siger:
Vejen skal starte med /foo/bar/bar
Det kan følges af intet eller D\\[0-9\\]&#123;4&#125;/
Det kan følges af intet eller en /
    
Ja, stiRegex's kan være utrolig svært at formulere. Hvis du sidder fast, skal du spørge en computer programmør (den nærmeste ting i den virkelige verden til en troldmand spouting incantationer?) eller send en e-mail til Chris. John på noaa.gov.
    
### &lt;datasæt og nød;{#dataset} 
* [ [] ** &lt;Datasæt&gt; ** Særkegle (#datasæt) er en OPTIONAL (men altid brugt) tag inden for en&lt;ErddapDatasets&gt; tag i tagdatasets.xml(hvis du indeholder alle oplysninger mellem&lt;Datasæt&gt; og&lt;/ Dataset&gt;) beskriver helt et datasæt. For eksempel,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Der kan være en række datasæt-tags i dindatasets.xmlfil.
Tre attributter kan vises i en&lt;Dataset&gt; tag:
     
    *    **Type: *a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a Type Type Type Type* " " " "** er en REQUIRED attribut i en&lt;datasæt&gt; tag idatasets.xmlsom identificerer datasættypen (for eksempel, om det er etEDDGrid/net eller EDDTable/tabulære datasæt) og kilden til dataene (f.eks. en database, filer eller en fjernOPeNDAPserver) . Se billederne[ **Liste over datasættyper** ](#list-of-types-datasets).
         
#### Datasæt Id{#datasetid} 
*   [ **datasetIDSupplerende oplysninger om *aDatasetID* " " " "** ](#datasetid)er en REQUIRED attribut i en&lt;datasæt&gt; tag, som tildeler en kort (normalt&lt;15 tegn), unikke, identificere navn til et datasæt.
    * The The The The The The ThedatasetIDs SKAL være et bogstav (A-Z, a-z) efterfulgt af et antal A-Z, a-z, 0-9 og \\_ (men bedst hvis&lt;32 tegn totalt.
    * Datasæt ID'er er tilfælde følsomme, men DON'T skaber todatasetIDs, der kun afviger i øverste/lavercase bogstaver. Det vil forårsage problemer på Windows-computere (dine og/eller en brugers computer) .
    * Bedste praksis: Vi anbefaler at bruge[Kamel kamel Case Case Case](https://en.wikipedia.org/wiki/CamelCase).
    * Bedste praksis: Vi anbefaler, at den første del er en akronym eller forkortelse af kildeinstitutionens navn og den anden del er en akronym eller forkortelse af datasets navn. Når det er muligt, opretter vi et navn, der afspejler kildens navn for datasættet. For eksempel brugte vidatasetIDSupplerende oplysninger omssta8day" for et datasæt fraNOAA NMFS SWFSCMiljøforskningsdivision (ERD) som er udpeget af kilden til at være satellit/PH/sst1/8 dag.
    * Hvis du ændrer et datasæts navn, den gamle datasæt (med det gamle navn) vil stadig være live iERDDAP. Dette er en "orphan" datasæt, fordi specifikationen for det idatasets.xmler nu væk. Dette skal behandles:
        1. For For For For ForERDDAP™v2.19 og senere behøver du ikke at gøre noget.ERDDAP™fjerner automatisk disse børnehjem.
        2. For For For For ForERDDAP™v2.18 og tidligere, skal du gøre noget for at fjerne de forældreløse datasæt: Lav en aktiv datasæt, f.eks.
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Efter den næste store belastning Datasæt, Du kan fjerne det tag efter det gamle datasæt er inaktiv.
                 
#### aktiv aktiv aktiv aktiv{#active} 
*   [ **aktivt arbejde *boolean* " " " "** ](#active)er en OPTIONAL egenskab i en&lt;datasæt&gt; tag idatasets.xmlsom angiver, om et datasæt er aktivt (berettiget til brug iERDDAP) eller ej.
    * Gyldige værdier er sande (Standard) og falsk.
    * Da standarden er sand, behøver du ikke at bruge denne attribut, indtil du vil midlertidigt eller permanent fjerne dette datasæt fraERDDAP.
    * Hvis du bare fjerner en aktiv sædvan" datasæt fradatasets.xml, datasættet vil stadig være aktiv iERDDAP™men vil aldrig blive opdateret. Sådanne datasæt vil være en "orphan" og vil blive opført som sådan på status. html-side lige under listen over datasæt, der mislykkedes at indlæse.
    * Hvis du indstiller aktivbøllelse",ERDDAP™vil deaktivere datasættet næste gang, det forsøger at opdatere datasættet. Når du gør dette,ERDDAP™smider ikke nogen oplysninger, det kan have gemt om datasættet og gør bestemt ikke noget til de faktiske data.
    * For at fjerne et datasæt fraERDDAP™, se[Force Dataset fjernelse](/docs/server-admin/additional-information#removing-datasets).
         

 ** Flere tags kan vises mellem&lt;Datasæt&gt; og&lt;/ Dataset&gt; tags. **   
Der er nogle variation, hvor tags er tilladt, af hvilke typer datasæt. Se dokumentationen for en bestemt[type datasæt](#list-of-types-datasets)for detaljer.

#### &lt;tilgængelig Til&gt;{#accessibleto} 
* [ [] ** &lt;tilgængelig Til&gt; ** Særkegle (#accessibleto) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag, der angiver en koma-separat liste over[roller](#user)som er tilladt at have adgang til denne datasæt. For eksempel,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Dette er en del afERDDAP's[sikkerhedssystem](/docs/server-admin/additional-information#security)for at begrænse adgang til nogle datasæt til nogle brugere.
    * Hvis dette tag ikke er til stede, alle brugere (selvom de ikke er logget ind) vil have adgang til denne datasæt.
    * Hvis dette tag er til stede, vil dette datasæt kun være synligt og tilgængeligt for brugere, der har en af de angivne roller. Denne datasæt vil ikke være synlig for brugere, der ikke er logget ind.
    * Hver bruger, der logger ind, får automatisk rollen\\[Log ind I nærheden af In In In In In In In In In In In In In In\\], om der er en&lt;Bruger&gt; tag for dem idatasets.xmleller ej. Så hvis et givet datasæt har
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
Så vil enhver bruger, der er logget ind, blive autoriseret til at få adgang til disse datasæt, selvom der ikke er nogen&lt;Bruger&gt; tag for dem idatasets.xml.
         
#### &lt;GraferAccessibleTo&gt;{#graphsaccessibleto} 
* [ [] ** &lt;GraferAccessibleTo&gt; ** Særkegle (#grafer utilgængelig) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag idatasets.xmlder bestemmer, om grafik og metadata til datasættet er tilgængelige for offentligheden. Det tilbyder en måde at delvist tilsidesætte datasættets [&lt;tilgængeligtil&gt;] (#accessibleto) indstilling. De tilladte værdier er:
    * Auto -- Denne værdi (eller fravær af en&lt;graferAccessibleTo&gt; tag til datasættet) gør adgang til diagrammer og metadata fra datasættet efterligne datasættets datasæt&lt;tilgængeligtil&gt; indstilling.
Så hvis datasættet er privat, vil dens diagrammer og metadata være privat.
Og hvis datasættet er offentlige, vil dens diagrammer og metadata være offentlige.
    * offentligheden -- Denne indstilling gør datasættets diagrammer og metadata tilgængelige for alle, selv brugere, der ikke er logget ind, selvom datasættet ellers er privat, fordi den har en&lt;tilgængeligTo&gt; tag.
         
#### &lt;tilgængelig ViaFiles&gt;{#accessibleviafiles} 
* [ [] ** &lt;Hoteller i nærheden afViaFiles&gt; ** Særkegle (#tilbehør) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag idatasets.xmlfor for for[EDDGridAggregateExistingDimension](#eddgridaggregateexistingdimension),[EDDGridKopiere Kopier](#eddgridcopy),[EDDGridFraEDDTable](#eddgridfromeddtable),[EDDGridFraErddap](#eddfromerddap),[EDDGridFraEtopo](#eddgridfrometopo),[EDDGridFraFiles](#eddgridfromfiles)  (herunder alle underklasser) ,[EDDGridSideforside](#eddgridsidebyside),[EDDTableCopy](#eddtablecopy) [EDDTableFraErddap](#eddfromerddap),[EDDTableFraEDDGrid](#eddtablefromeddgrid), og[EDDTableFraFiles](#eddtablefromfiles)  (herunder alle underklasser) Datasets. Det kan have en værdi af sand eller falsk. For eksempel,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Hvis værdien er sandt,ERDDAP™vil gøre det, så brugerne kan gennemse og downloade datasættets kildedatafiler viaERDDAP's["files"systemsystem](https://coastwatch.pfeg.noaa.gov/erddap/files/). Se billederne"files"systemets system[dokumentationsdokumentation](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)for mere information.
    
Standardværdien af&lt;Hoteller i nærheden afViaFiles&gt; kommer fra&lt;StandardAccessibleViaFiles&gt; i in in in in[opsætning.xml](/docs/server-admin/deploy-install#setupxml). Det har en standardværdi af falsk, men vi anbefaler, at du tilføjer, at tag til din opsætning.xml med en værdi af sand.
    
Anbefaling -- Vi anbefaler at gøre alle relevante datasæt tilgængelige via filsystemet ved at indstille&lt;StandardAccessibleViaFiles&gt; til ægte i opsætning.xml, fordi der er en gruppe brugere, som dette er den foretrukne måde at få dataene. Blandt andre årsager,"files"systemet gør det nemt for brugerne at se, hvilke filer der er tilgængelige, og når de sidste ændres, gør det nemt for en bruger at opretholde deres egen kopi af hele datasættet. Hvis du generelt ikke ønsker at gøre datasæt tilgængelige via filsystemet, skal du indstille&lt;StandardAccessibleViaFiles&gt; til falsk. I begge tilfælde, bare brug&lt;tilgængeligViaFiles&gt; for de få datasæt, der er undtagelser til den generelle politik fastsat af&lt;StandardAccessibleViaFiles&gt; (f.eks. når datasættet bruger[.ncml](#ncml-files)filer, som ikke er virkelig nyttige for brugere) .
     
#### &lt;tilgængelig Via Via Via ViaWMS&gt;{#accessibleviawms} 
* [ [] ** &lt;tilgængelig Via Via Via ViaWMS&gt; &gt; &gt; &gt; ** Særkegle (#accessibleviawms) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag idatasets.xmlfor alle[EDDGrid](#eddgrid)subclasses. Det kan have en værdi af sand (Standard) eller falsk. For eksempel,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Hvis værdien er falsk,ERDDAP'sWMSserveren vil ikke være tilgængelig for denne datasæt. Dette bruges ofte til datasæt, der har nogle længdeværdier større end 180 (som teknisk er ugyldig forWMStjenester) , og for hvilke du også tilbyder en variant af datasættet med længdeværdier helt i serien -180 til 180 via[EDDGridLonPM180](#eddgridlonpm180).
Hvis værdien er sandt,ERDDAP™vil forsøge at gøre datasættet tilgængeligt viaERDDAP'sWMSserver. Men hvis datasættet er helt uegnet tilWMS  (f.eks. er der ingen længde eller bredde data) , så vil datasættet ikke være tilgængelig viaERDDAP'sWMSserver, uanset denne indstilling.
     
#### &lt;tilføje tilføjelse Varer Hvor&gt;{#addvariableswhere} 
* [ []&lt;addVariablesHvor&gt;] (#addvariableswhere) er en OPTIONAL tag inden for&lt;Dataset&gt; tag for alle EDDTable datasets.
    
Anmodninger til enhver EDDTable datasæt kan indeholde &tilføjelse Varer Hvor (" " " " *attribut Navn* "," *attribut Værdiværdi* " " " ") , som fortællerERDDAP™at tilføje alle variablerne i datasættet, hvor *attributnavn=attributeValue* til listen over ønskede variabler. Hvis en bruger f.eks. tilføjer &add Varer Hvor (" " " "ioos\\_category","Wind") til en forespørgsel,ERDDAPvil tilføje alle variabler i datasættet, der har enioos\\_category=Wind egenskab til listen over ønskede variabler (for eksempel vindSpeed, vindDirection, vindGustSpeed) . *attribut Navn* og og og *attribut Værdiværdi* er tilfældefølsomme.
    
I nærheden af In In In In In In In In In In In In In Indatasets.xml, hvis omfanget af dataset.xml til et datasæt har
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
for eksempel,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
Data Access-formular (.html side) for datasættet vil indeholde en widget (for hver attributnavn i koma-separated liste) Lige under listen over variabler, der lader brugerne angive en attributværdi. Hvis brugeren vælger en attributværdi for en eller flere af attributnavnene, vil de blive tilføjet til anmodning via &add Varer Hvor (" " " " *attribut Navn* "," *attribut Værdiværdi* " " " ") . Således dette tag idatasets.xmllader dig angive listen over attributnavne, der vises på Data Access Form for den datasæt og gør det nemt for brugerne at tilføje &addVariables Hvor funktioner til anmodningen. The The The The The The The *attributnavneCSV* liste er case-følsomme.
    
#### &lt;HøjdeMetersPerSourceUnit&gt;{#altitudemeterspersourceunit} 
* [ [] ** &lt;HøjdeMetersPerSourceUnit&gt; ** Særkegle (#altitudemeterspersourceenhed) er en OPTIONAL tag inden for&lt;Dataset&gt; tag i datasæt. xxml til EDDTableFraSOSDatasæt (kun&#33;) der angiver et tal, der ganges med kildehøjden eller dybdeværdierne for at konvertere dem til højdeværdier (i meter over havet niveau) . For eksempel,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Dette tag skal bruges, hvis datasættets lodrette akseværdier ikke er meter, positive=up. Ellers er det OPTIONAL, da standardværdien er 1. For eksempel,
    * Hvis kilden allerede måles i meter over havets overflade, skal du bruge 1 (eller ikke bruge dette tag, da 1 er standardværdien) .
    * Hvis kilden måles i meter under havoverfladen, skal du bruge -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Hvis kilden måles i km over havets overflade, skal du bruge 0.001.
         
#### &lt;StandardDataQuery &gt;{#defaultdataquery} 
* [ [] ** &lt;StandardDataQuery&gt; ** Særkegle (#standarddataquery) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag idatasets.xmlder fortællerERDDAP™at bruge den angivne forespørgsel (den del af URL'en efter "?") hvis .html-filen Type Type Type Type (Data Access-formular) anmodes om ingen forespørgsel.
    * Du vil sandsynligvis sjældent nødt til at bruge dette.
    * Du skal bruge XML-encode (Ikke procent-encode) standardforespørgsler, da de er i et XML-dokument. For eksempel, og bliver &amp; ,&lt;bliver bliver bliver&lt;, &gt; bliver &gt; .
    * Tjek venligst dit arbejde. Det er nemt at lave en fejl og ikke få hvad du ønsker.ERDDAP™vil forsøge at rydde op i dine fejl - men ikke stole på det, da\\*hvordan\\*Det rengøres op kan ændres.
    * For gitterdatasæt, en fælles brug af dette er at angive en anden standarddybde eller højde dimensionværdi (for eksempel,\\[0\\]i stedet for\\[sidst\\]) .
I alle tilfælde bør du altid liste alle variablerne, altid bruge de samme dimensionværdier for alle variabler, og næsten altid bruge\\[0\\],\\[sidst\\]eller\\[0:last\\]for dimensionværdierne.
For eksempel:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * For For For For FortabledapDatasæt, hvis du ikke angiver nogen begrænsninger, vil anmodningen returnere hele datasættet, som kan være upraktisk stor, afhængigt af datasættet. Hvis du ikke ønsker at angive begrænsninger, snarere end at have en tom&lt;StandardDataQuery&gt; (som ikke angiver en standard Datakvalitet) , du skal udtrykkeligt liste alle de variable, du ønsker at inkludere i standardDataQuery.
    * For For For For FortabledapDatasets, den mest almindelige brug af dette er at angive en anden standard tidszone (i forhold til max (tidstid) , for eksempel &time&gt;=max (tidstid) -1 dag eller i forhold til nu, for eksempel &time&gt;=now-1 dag) .
Husk at anmode om ingen datavariabler er det samme som at angive alle datavariabler, så normalt kan du bare angive den nye tidsbegrænsning.
For eksempel:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
eller eller eller
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;StandardGraphQuery&gt;{#defaultgraphquery} 
* [ [] ** &lt;StandardGraphQuery&gt; ** Særkegle (Nr.) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag idatasets.xmlder fortællerERDDAP™at bruge den angivne forespørgsel (den del af URL'en efter "?") hvis .graph-filen Type Type Type Type (Oprette en diagramform) anmodes om ingen forespørgsel.
    * Du vil sandsynligvis sjældent nødt til at bruge dette.
    * Du skal bruge XML-encode (Ikke procent-encode) standardforespørgsler, da de er i et XML-dokument. For eksempel, og bliver &amp; ,&lt;bliver bliver bliver&lt;, &gt; bliver &gt; .
    * Tjek venligst dit arbejde. Det er nemt at lave en fejl og ikke få hvad du ønsker.ERDDAP™vil forsøge at rydde op i dine fejl - men ikke stole på det, da\\*hvordan\\*Det rengøres op kan ændres.
    * For gitterdatasæt, den mest almindelige brug af dette er at angive en anden standarddybde eller højde dimensionværdi (for eksempel,\\[0\\]i stedet for\\[sidst\\]) og/eller for at angive, at en bestemt variabel grafes.
I alle tilfælde vil du næsten altid bruge\\[0\\],\\[sidst\\]eller\\[0:last\\]for dimensionværdierne.
For eksempel:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (men sæt det hele på én linje) 
    * For For For For FortabledapDatasæt, hvis du ikke angiver nogen begrænsninger, vil anmodningen graf hele datasættet, som kan tage lang tid, afhængigt af datasættet.
    * For For For For FortabledapDatasets, den mest almindelige brug af dette er at angive en anden standard tidszone (i forhold til max (tidstid) , for eksempel &time&gt;=max (tidstid) -1 dag eller i forhold til nu, for eksempel &time&gt;=now-1 dag) .
Husk at anmode om ingen datavariabler er det samme som at angive alle datavariabler, så normalt kan du bare angive den nye tidsbegrænsning.
For eksempel:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
eller eller eller
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensionValuesInMemory&gt;{#dimensionvaluesinmemory} 
* [ [] ** &lt;dimension VærdierInMemory&gt; ** Særkegle (#dimensionel værdisinmemory)   (sande sande sande sande (Standard) eller falsk) er en OPTIONAL og sjældent brugt tag i løbet af&lt;datasæt&gt; tag for enhverEDDGriddatasæt, der fortællerERDDAP™hvor du kan holde kildeværdierne i dimensionerne (også kendt som denaxisVariables s s) :
    
    * true = i hukommelse (som er hurtigere, men bruger mere hukommelse) 
    * falsk = på disk (som er langsommere, men bruger ingen hukommelse) 
    
For eksempel,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Du bør kun bruge dette med ikke-standardværdien af falsk, hvis dinERDDAP™har en masse datasæt med meget store dimensioner (f.eks. millioner af værdier, f.eks. iEDDGridFraAudioFiles datasæt) og og ogERDDAP's I Brug hukommelse forbrug er altid for høj. Se hukommelsen: i øjeblikket ved hjælp af linje på\\[Din favorit\\]/erddap/status.htmlat overvågeERDDAP™hukommelsesbrug.
     
#### &lt;filTableInMemory&gt;{#filetableinmemory} 
* [ [] ** &lt;FileTableInMemory&gt; ** Særkegle (#filetableinmemory)   (sand eller falsk (Standard) ) er en OPTIONAL tag inden for&lt;datasæt&gt; tag for enhverEDDGridFraFiles og EDDTable FraFiles datasæt, der fortællerERDDAP™hvor du skal beholde filenTable (som har oplysninger om hver kildedatafil) :
    
    * true = i hukommelse (som er hurtigere, men bruger mere hukommelse) 
    * falsk = på disk (som er langsommere, men bruger ingen hukommelse) 
    
For eksempel,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Hvis du indstiller dette til at tro for alle datasæt, skal du holde øje med hukommelsen: i øjeblikket ved hjælp af linje på\\[Din favorit\\]/erddap/status.htmlfor at sikre, atERDDAP™stadig har masser af gratis hukommelse.
     
#### &lt;fgdcFile&gt;{#fgdcfile} 
* [ [] ** &lt;I nærheden af fgdcFile&gt; ** Særkegle (#fgdcfile) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag idatasets.xmlder fortællerERDDAP™at bruge en pre-made FGDC-fil i stedet for at haveERDDAP™Prøv at generere filen. Anvendelse:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *fuld fuld fuld fuld fuld fuld Filnavn* kan henvise til en lokal fil (et sted på serverens filsystem) eller URL-adressen på en fjernfil.
Hvis *fuld fuld fuld fuld fuld fuld Filnavn* \\Hej" eller filen findes ikke, datasættet har ingen FGDC metadata. Så dette er også nyttigt, hvis du ønsker at undertrykke FGDC-metadata for et bestemt datasæt.
Eller du kan sætte&lt;FgdcActive&gt;false&lt;/fgdcActive&gt; i opsætning.xml til at fortælleERDDAP™ikke at tilbyde FGDC metadata for ethvert datasæt.
     
#### &lt;iso19115 Fil&gt;{#iso19115file} 
* [ [] ** &lt;I nærheden af iso19115File&gt; ** Særkegle (#iso19115file) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag idatasets.xmlder fortællerERDDAP™at bruge en færdiglavet ISO 19115-fil i stedet for at haveERDDAP™Prøv at generere filen. Anvendelse:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *fuld fuld fuld fuld fuld fuld Filnavn* kan henvise til en lokal fil (et sted på serverens filsystem) eller URL-adressen på en fjernfil.
Hvis *fuld fuld fuld fuld fuld fuld Filnavn* \\Hej" eller filen findes ikke, datasættet har ingen ISO 19115 metadata. Så dette er også nyttigt, hvis du ønsker at undertrykke ISO 19115 metadata for et bestemt datasæt.
Eller du kan sætte&lt;Hoteller i nærheden af iso19115Active&gt;false&lt;/iso19115Active&gt; i opsætning.xml til at fortælleERDDAP™ikke at tilbyde ISO 19115 metadata for ethvert datasæt.
     
#### &lt;matchAxis NDigits&gt;{#matchaxisndigits} 
* [ [] ** &lt;MatchAxisNDigits&gt; ** Særkegle (#matchaksendigits) er en OPTIONAL tag inden for etEDDGrid &lt;Dataset&gt; tag tilEDDGriddatasæt, der er aggregationer, f.eks. aggregationer af filer. Hver gang datasættet er genindlæst,ERDDAP™kontrollerer, at de akseværdier af hver komponent i sammenlægningen er den samme. Nøjagtigheden af testen bestemmes af[MatchAxisNDigits](#matchaxisndigits), som angiver det samlede antal cifre, der skal matche, når de tester dobbelt præcisionsakseværdier, 0 - 18 (Standard) . Når du tester flyakseværdier, udføres testen med matchAxisNDigits/2 cifre. En værdi på 18 eller derover fortællerEDDGridat gøre en præcis test. En værdi på 0 fortællerEDDGridikke at foretage nogen test, som ikke anbefales, bortset fra som beskrevet nedenfor.
    
Selv om selvomEDDGridgiver komponenterne i aggregation til at have lidt forskellige akseværdier, kun et sæt akseværdier vises til brugeren. Sættet er fra den samme komponent, der giver datasættets kilde metadata. For eksempel, forEDDGridFraFiles datasæt, der er specificeret af&lt;Konfiguration af metadata&gt; (Standard=last) .
    
Brug af matchAxisNDigits\\=0 er stærkt afbrudt i de fleste tilfælde, fordi det slukker for alle kontrol. Selv minimal kontrol er nyttig, fordi det sikrer, at komponenterne er egnede til sammenlægning. Vi antager alle, at alle komponenterne er egnede, men det er ikke altid så. Dette er således en vigtig sanitetstest. Selv værdier af matchAxisNDigits1, 2, 3 eller 4 er brudt, fordi de forskellige akseværdier ofte indikerer, at komponenterne blev oprettet (bined?) en anden måde og er dermed ikke egnet til sammenlægning.
    
Der er et tilfælde, hvor brug af matchAxisNDigits\\=0 er nyttig og anbefales: med sammenlægninger af fjernfiler, f.eks. data i S3 skovle. I dette tilfælde, hvis datasættet bruger cacheFraUrl, cacheSizeGB, matchAxisNDigits\\=0, og theEDDGridFraFiles system til[Aggregation via Filnavne](#aggregation-via-file-names-or-global-metadata), såEDDGridbehøver ikke at læse alle de eksterne filer for at gøre sammenlægningen. Dette gør det muligt for datasæt fra data i S3 skovle at indlæse meget hurtigt (i modsætning til absurd langsomt hvisEDDGridskal downloade og læse alle filer) .
    
#### &lt;nThreads&gt;{#nthreads} 
* Begyndende medERDDAP™version 2.00, når en del af EDDTableFraFiles ellerEDDGridLæser data fra sin kilde, det kan læse en flok data (f.eks. en kildefil) på et tidspunkt (i én tråd)   (det er standarden) eller mere end én mængde data (fx, 2+ kildefiler) på et tidspunkt (i 2 eller flere tråde) under behandling af hver anmodning.
     
    * Regel af Thumb:
For de fleste datasæt på de fleste systemer, skal du bruge nThreads =, standarden. Hvis du har en kraftfuld computer (masser af CPU kerner, masser af hukommelse) , så overveje at indstille nThreads til 2, 3, 4 eller højere (men aldrig mere end antallet af CPU kerner i computeren) til datasæt, der kan gavne:
        
        * De fleste EDDTableFraFiles datasæt vil drage fordel af.
        * Datasets, hvor noget forårsager en forsinkelse, før en mængde data rent faktisk kan behandles, vil gavne for eksempel:
            * Datasæt med[Eksternt tryk (fx,.gz) ](#externally-compressed-files)Oversættelse (fx,.nc) filer, fordiERDDAP™skal dekomprimere hele filen, før det kan begynde at læse filen.
            * Datasæt, der bruger[cachestørrelse GB](#cachefromurl), fordiERDDAP™ofte skal downloade filen, før den kan læse den.
            * Datasets med datafiler gemt på et parallelt filsystem, fordi det kan levere flere data, hurtigere, når de anmodes. Eksempler på parallelle filsystemer omfatter[JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures),[PNFS](http://www.pnfs.com/),[GlusterFS](https://en.wikipedia.org/wiki/Gluster), Amazon S3 og Google Cloud Storage.
                 
        
Advarsel: Når du bruger nThreads&gt;1, skal du holde øje medERDDAP's hukommelse brug, tråd brug og generel lydhørhed (Se se[ERDDAP's statusside](/docs/server-admin/additional-information#status-page)) . Se kommentarer om disse spørgsmål nedenfor.
         
    * For et givet datasæt kan denne nThreads indstilling komme fra forskellige steder:
        
        * Hvis det er tilfældetdatasets.xmlFlettet til et datasæt har en&lt;nThreads&gt; tag (medi te&lt;datasæt&gt; tag, ikke som en global egenskab) med en værdi &gt;= 1, denne værdi af nThreads bruges. Så kan du angive et andet nummer for hvert datasæt.
        * Ellers, hvisdatasets.xmlhar en&lt;nTableThreads&gt; tag (for EDDTable FraFiles datasæt) eller&lt;nGridThreads&gt; tag (for for forEDDGridDatasæt) med en værdi &gt;= 1, uden for et&lt;Dataset&gt; tag, den værdi af nThreads bruges.
        * Ellers bruges 1 tråd, som er et sikkert valg, da det bruger den mindste mængde hukommelse.
             
        
For te[original original originalERDDAP™installation](https://coastwatch.pfeg.noaa.gov/erddap/index.html), vi bruger
        &lt;I nærheden af nTableThreads&gt; 6 6 6&lt;/nTableThreads&gt; (Det er en kraftfuld server.) Vanskelige anmodninger tager nu 30 % af tiden.
         
##### Overvåg ressourceforbrug{#monitor-resource-usage} 
Når du eksperimenterer med forskellige nThreads indstillinger (og måske foretage vanskelige prøveanmodninger til dineERDDAP) , kan du overvåge din computers ressourceforbrug:
* På Macs, brug Finder : Programmer : Utilities : Aktivitetsmåler
* På Linux, brug top
* På Windows 10 skal du bruge *Ctrl + Skift + Esc* at åbne opgave Manager
             
##### Advarsel: Formindelse{#warning-decreased-responsiveness} 
I isolering,ERDDAP™vil opfylde en anmodning til et datasæt med en højere nThreads indstilling hurtigere end hvis nThreads =. Men mens denne anmodning behandles, vil andre anmodninger fra andre brugere være noget overfyldt og få en langsommere reaktion. Også, nårERDDAP™reagerer på en given anmodning, andre computer ressourcer (f.eks. diskdrevadgang, netværks båndbredde) kan begrænses, især med højere nThreads indstillinger. Således med højere nThreads indstillinger, vil den samlede systemrespons være værre, når der er flere anmodninger, der behandles -- dette kan være meget irriterende for brugere&#33; På grund af dette: aldrig sætte nThreads til mere end antallet af CPU kerner i computeren. nThreads = er den fairste indstilling siden hver anmodning (blandt flere samtidige anmodninger) vil få en lige andel af computerressourcer. Men den mere kraftfulde computeren, desto mindre vil det være et problem.
         
##### Advarsel: Højere hukommelse Brug til at brugeEDDGridDatasæt{#warning-higher-memory-use-for-eddgrid-datasets} 
Hukommelse brug, mens behandling anmodninger er direkte proportional med nThreads indstilling. En rimelig sikker tommelfingerregel er: du skal indstille[ERDDAP's hukommelse indstillinger](/docs/server-admin/deploy-install#memory)til mindst 2 GB + (2 GB \\* nThreads) . Nogle anmodninger til nogle datasæt vil have brug for mere hukommelse end det. For eksempel skal du indstille nThreads=3 for nogenEDDGridDatasæt betyder, at indstillingen -Xmx skal være mindst -Xmx8000M. Hvis hukommelsesindstillingen er større end 3/4 computerens fysiske hukommelse, skal du reducere nThreads-indstillingen, så du kan reducere hukommelsesindstillingen.

hukommelsen brug af tråde behandling anmodninger til EDDTable datasets er næsten altid lavere, fordi filerne er normalt meget mindre. Men hvis et givet EDDTable datasæt har enorm (f.eks. &gt; = = GB) Datafiler, så kommentarerne ovenfor vil gælde for disse datasæt samt.

Uanset nThreads-indstillingen, skal du holde øje med hukommelsesforbrugets statistik på din computer[ERDDAP's statusside](/docs/server-admin/additional-information#status-page). Du bør ikke nogensinde komme tæt på at maksimere hukommelsesforbruget iERDDAP; ellers vil der være alvorlige fejl og fejl.
        
##### Sæt til 1{#temporarily-set-to-1} 
Hvis den aktuelle hukommelsesforbrug er endnu lidt høj,ERDDAP™vil indstille nThreads til denne anmodning til 1. Således,ERDDAP™sparer hukommelse, når hukommelsen er arce.
         
##### Diminishing Returnering{#diminishing-returns} 
Der mindskes afkast for at øge nThreads-indstillingen: 2 tråde vil være bedre end 1 (hvis vi ignorerer dynamisk overclocking) . Men 3 vil kun være en smule bedre end 2. Og 4 vil kun være marginalt bedre end 3.

I en test af en vanskelig forespørgsel til en stor EDDTable datasæt, responstid ved hjælp af 1, 2, 3, 4, 5, 6 tråde var 38, 36, 20, 18, 13, 11 sekunder. (Vi bruger nu nTableThreads=6 på denne server.) 

nThreads=2: Selvom der ofte er en betydelig fordel at specificere nThreads=2 i stedet for nThreads =, vil det ofte ikke gøre meget forskel i det ur tid, der er nødvendigt for at svare på en given brugers anmodning. Årsagen er: med nThreads =, de fleste moderne CPU'er vil ofte[dynamisk overclock](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (turbo boost) til midlertidigt at øge urhastigheden af CPU. Således vil den ene kerne ofte arbejde på en højere urhastighed end hver af de to kerner, hvis du brugte nThreads=2. Uanset tror vi stadig, at det er bedre at bruge nThreads=2 i stedet for nThreads = =2, da denne indstilling vil give bedre resultater i en bredere vifte af situationer. Og selvfølgelig, hvis din computer har tilstrækkelige CPU kerner, bør en endnu højere nThreads indstilling give bedre resultater.

Som nævnt ovenfor kan meget høje nThreads indstillinger føre til hurtigere svar på nogle anmodninger, men risikoen for det samlede faldERDDAP™lydhørhed og høj hukommelse brug (som nævnt ovenfor) mens disse anmodninger behandles, betyder det generelt ikke en god ide.
        
##### CPU CPU CPU CPU Cores{#cpu-cores} 
Du bør ikke nogensinde indstille nThreads til et nummer større end antallet af CPU kerner i computerens CPU. Væsentligt alle moderne CPU'er har flere kerner (f.eks. 2, 4 eller 8) . Nogle computere har endda flere CPU'er (f.eks. 2 CPU'er \\* 4 kerner/CPU = 8 CPU kerner) . At finde ud af, hvor mange CPU'er og kerner en computer har:

* På Macs, brug *Option nøgle* : Apple Menu : Systemoplysninger
* På Linux, brug kat /proc / cpuinfo
* På Windows 10 skal du bruge *Ctrl + Skift + Esc* at åbne Opgavehåndtering : Performance (Logiske processorer viser det samlede antal CPU kerner) 

Ja, de fleste processorer disse dage siger, at de understøtter 2 tråde pr. kerne (via[hyperthreading](https://en.wikipedia.org/wiki/Hyper-threading)) , men de 2 tråde deler computer ressourcer, så du ikke kan se dobbelt gennemstrømningen på en CPU under tung belastning. For eksempel kan en computer med en CPU med 4 kerner kræve at støtte op til 8 tråde, men du bør aldrig overstige nThreads=4 i detERDDAP. Husk at:

* De nThreads indstilling iERDDAP™er pr. anmodning.ERDDAP™håndterer ofte flere anmodninger samtidigt.
*   ERDDAP™gør tingene andet end procesforespørgsler, f.eks. reload datasæt.
* Hvornår Hvornår skal man HvornårERDDAP™reagerer på en given anmodning, andre computer ressourcer (f.eks. diskdrevadgang, netværks båndbredde) kan begrænses. Jo højere du indstiller nThreads, desto mere sandsynligt, at disse andre ressourcer vil blive maxed ud og vil bremseERDDAP's generel reaktionsevne.
* operativsystemet gør tingene andet end at køreERDDAP.

Så det er bedst ikke at indstille nThreads indstilling til mere end antallet af kerner i computerens CPU.
         
##### Din Mileage maj Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
Resultaterne af forskellige nThreads indstillinger vil variere meget for forskellige anmodninger til forskellige datasæt på forskellige systemer. Hvis du virkelig ønsker at vide effekten af forskellige nThreads indstillinger, køre realistiske tests.
         
##### Hvorfor nThreads pr anmodning?{#why-nthreads-per-request} 
Jeg kan høre nogle af jer der tænker "Hvorfor er nThreads per anmodning? Hvis jeg var kodning dette, ville jeg bruge en permanent arbejdstager tråd pool og en messaging kø for bedre ydeevne." Problemet med at bruge en fungerende trådpool og en messaging kø er, at en vanskelig anmodning ville oversvømme køen med mange langsomme opgaver. Det ville effektivt blokereERDDAP™fra selv at begynde arbejde på opgaver relateret til andre anmodninger, indtil den oprindelige anmodning var (væsentlige) færdig. Således vil selv enkle efterfølgende anmodninger reagere super langsomt.ERDDAP's brug af nThreads per anmodning fører til en meget fairre brug af computer ressourcer.
         
##### nThreads vs. flere arbejdscomputere{#nthreads-vs-multiple-worker-computers} 
Desværre, desværreERDDAP's nThreads system vil aldrig være så effektiv som sand parallelisering via flere arbejdscomputere, med hver der arbejder på en mængde data, på den måde, at Hadoop eller Apache Spark normalt bruges. Når opgaven er virkelig paralleliseret/distribueret til flere computere, kan hver computer bruge alle sine ressourcer på sin del af opgaven. MedERDDAP's nThreads system, hver af tråde konkurrerer for den samme computers båndbredde, disk drev, hukommelse osv. Desværre, de fleste af os ikke har ressourcer eller midler til at oprette eller endda leje (på Amazon Web Services (AWS) eller Google Cloud Platform (GCP) ) massive gitter af computere. I modsætning til en relationel database, som er tilladt at returnere resultatrækkerne i enhver rækkefølge,ERDDAP™Et løfte om at returnere resultatrækkerne i en konsekvent rækkefølge. Denne begrænsning gørERDDAP's nThreads implementering mindre effektiv. Men men men men menERDDAP's nThreads er nyttige i mange tilfælde.

Men der er måder at gøreERDDAP™skala til at håndtere et stort antal anmodninger hurtigt ved at oprette en[gitter / cluster/federation afERDDAPs s s](/docs/server-admin/scaling).
         
#### &lt;paletter&gt;{#palettes} 
* Begyndende medERDDAP™version 2.12,datasets.xmlkan inkludere en&lt;paletter&gt; tag (medin&lt;erddapDatasets&gt;), som tilsidesætter&lt;paletter&gt; tagværdi fra beskeder.xml (eller vender tilbage til meddelelser.xml værdi, hvis tagget idatasets.xmler tomt) . Dette lader dig ændre listen over tilgængelige paletter, mensERDDAP™kører. Det lader dig også foretage en ændring og har det ved at installere en ny version afERDDAP.
ADVARSEL: De paletter, der er opført idatasets.xmlskal være et superset af de paletter, der er opført i meddelelser.xml; ellersERDDAP™vil smide en undtagelse og stoppe behandlingendatasets.xml. Dette sikrer, at altERDDAP™installationer understøtter mindst de samme kernepaller.
ADVARSEL:ERDDAP™kontrollere, at paletternes filer, der er angivet i meddelelser.xml faktisk findes, men det kan ikke kontrollere de palet filer, der er anført idatasets.xml. Det er dit ansvar at sikre, at filerne er til stede.
    
Også begyndende medERDDAP™version 2.12, hvis du laver en cptfiles subdirectory i denERDDAP™indholdskatalog,ERDDAP™vil kopiere alle \\*.cpt-filer i mappen i mappen\\[Tomcat\\]/webapps/erddap/WEB-INF/cptfiles-mappen hver gangERDDAP™starter op. Således, hvis du lægger brugerdefinerede cpt-filer i denne mappe, vil disse filer blive brugt afERDDAP™, uden ekstra indsats på din del, selv når du installerer en ny version afERDDAP.
    
ADVARSEL: Hvis du tilføjer brugerdefinerede paletter til dinERDDAP™og du harEDDGridFra Erddap og/eller EDDTableFraErddap-datasæt i dinERDDAP™, så vil brugerne se dine brugerdefinerede paletindstillinger påERDDAP™Lav A Graph websider, men hvis brugeren forsøger at bruge dem, får de en graf med standarden (Normalt Rainbow) palette. Dette skyldes, at billedet er lavet af fjernbetjeningenERDDAP™som ikke har den brugerdefinerede palet. De eneste løsninger er nu til at sende fjernbetjeningenERDDAP™administrator for at tilføje dine brugerdefinerede paletter til hans / hendesERDDAPeller e-mail Chris. John på noaa.gov for at spørge, at paletterne føjes til standardenERDDAP™distribution.
    
#### &lt;påChange&gt;{#onchange} 
* [ [] ** &lt;påChange&gt; ** Særkegle (#onchange) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag idatasets.xmlder angiver en handling, der vil ske, når dette datasæt er oprettet (når du nårERDDAP™genstartes) og når disse datasæt ændres på nogen måde.
    * I øjeblikket, forEDDGridsubclasses, enhver ændring af metadata eller til en akse variabel (f.eks. et nyt tidspunktspunkt for realtidsdata) betragtes som en ændring, men en genindlæsning af datasættet betragtes ikke som en ændring (af sig selv) .
    * I øjeblikket betragtes enhver genindlæsning af datasættet som en ændring.
    * I øjeblikket er kun to typer af handlinger tilladt:
        * " " " " http://" eller " https://" -- Hvis handlingen starter med " http://" eller " https://" ,ERDDAP™Send en beskedHTTP GETanmode om den angivne webadresse. Svaret ignoreres. For eksempel kan URL fortælle nogle andre webtjeneste til at gøre noget.
            * Hvis URL-adressen har en forespørgselsdel (efter "?") , det skal være allerede[procentkodet](https://en.wikipedia.org/wiki/Percent-encoding). Du skal indtaste særlige tegn i begrænsningerne (andre end den første '&' og den vigtigste'='i begrænsninger) i form af %HH, hvor HH er den 2 cifrede hexadecimal værdi af tegnet. Normalt skal du blot konvertere et par tegn på tegn: % i %25, og i %26, " i %22,&lt;i %3C, = i %3D, &gt; i %3E, + i %2B,|i %7C,\\[i %5B,\\]i %5D, plads til %20, og konvertere alle tegn over #127 i deres UTF-8 form og derefter encode hver af UTF-8-form ind i %HH-formatet (spørge en programmør til hjælp) .
For eksempel &stationID&gt; Bondage41004"
bliver og bliverstationID%3E=%1004%22
Percent kodning er generelt påkrævet, når du får adgangERDDAPvia software andet end en browser. Browserer håndterer normalt procent kodning for dig.
I nogle situationer, skal du procentkode alle tegn andre end A-Za-z0-9\\_-&#33;.~ '' () \\*, men stadig ikke encode den indledende '&' eller den vigtigste'='i begrænsninger.
Programmering af sprog har værktøjer til at gøre dette (f.eks.Java's[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)og og ogJavascripts [encodeURIComponent()Særkegle ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) og der er
                [hjemmesider, der procent encode/decode for dig](https://www.url-encode-decode.com/).
            * Sidendatasets.xmler en XML-fil, du SKAL også &-encode ALL '&', "&lt;', og '&gt;' i URL'en som '&amp;', '&lt;" og "&gt;" efter procent kodning.
            * Eksempel: For en webadresse, som du muligvis skriver i en browser som:
                 https://www.company.com/webService?department=R%26D&param2=value2   
Du skal angive en&lt;påChange&gt; tag via (på én linje) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto: -- Hvis handlingen starter med "mailto:",ERDDAP™vil sende en e-mail til den efterfølgende e-mailadresse, der angiver, at datasættet er blevet opdateret/ændret.
For eksempel:&lt;onChange&gt;mailto:john.smith@company.com&lt;Annullering&gt; Hvis du har en god grund tilERDDAP™for at støtte en anden type handling, sende os en e-mail, der beskriver, hvad du ønsker.
    * Dette tag er OPTIONAL. Der kan være så mange af disse tags, som du ønsker. Brug et af disse tags til hver handling, der skal udføres.
    * Dette er analogt tilERDDAP's e-mail/URL abonnement system, men disse handlinger gemmes ikke permanent (f.eks. gemmes de kun i et EDD-objekt) .
    * Hvis du vil fjerne et abonnement, skal du blot fjerne markeringen&lt;påChange&gt; tag. Ændringerne vil blive bemærket næste gang datasættet er genindlæst.
         
#### &lt;reloadEveryNMinutes&gt;{#reloadeverynminutes} 
* [ [] ** &lt;reload Alle rettigheder&gt; ** Særkegle (#loadeveryn minutter) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag idatasets.xmlaf næsten alle datasættyper, der angiver, hvor ofte datasættet skal indlæses. For eksempel,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Generelt, datasæt, der ændrer ofte (f.eks. få nye datafiler) bør genoplades ofte, for eksempel hver 60 minutter.
    * Datasets, der ændrer infrequently, skal genoplades ifrequently, for eksempel hver 1440 minutter (dagligt dagligt) eller 10080 minutter (ugentlig ugentlig ugentlig ugentlig) .
    * Dette tag er OPTIONAL, men anbefales. Standarden er 10080.
    * Et eksempel er:&lt;reloadEveryNMinutes&gt;1440&lt;/ belastning Alle rettigheder&gt;
    * Når et datasæt er indlæst, alle filer i filerne *bigParentDirectory* / cache / *datasetID* mappen slettes.
    * Uanset hvad dette er indstillet til, vil et datasæt ikke indlæses oftere end&lt;belastningDatasetsMinMinutes&gt; (Standard = 15) , som angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml). Så hvis du ønsker, at datasæt skal indlæses meget ofte, skal du indstille begge reloadEveryNMinutes og indlæseDatasetsets MinMinutes til små værdier.
    * Sæt ikke reloadEveryNMinutes til samme værdi som loadDatasets MinMinutes, fordi den udløbne tid sandsynligvis er (for eksempel) 14:58 eller 15:02, så datasættet kun vil blive genindlæst i omkring halvdelen af de store belastninger. Brug i stedet en mindre (for eksempel 10) eller større (for eksempel 20) reload Hver eneste værdi.
    * Uanset reloadEveryNMinutes, kan du manuelt fortælleERDDAP™at indlæse et bestemt datasæt så hurtigt som muligt via en[flagfil](/docs/server-admin/additional-information#flag).
    * For Curious Programmer -- InERDDAP™, omladning af alle datasæt håndteres af to enkeltstående tråde. En tråd starter en mindre reload, hvis den finder en flagfil eller en stor genindlæsning (som kontrollerer alle datasæt for at se, om de skal læsses) . Den anden tråd gør den faktiske genindlæsning af datasæt en ad gangen. Disse tråde arbejder i baggrunden for, at alle datasæt holdes opdaterede. Den tråd, der rent faktisk forbereder reloads en ny version af et datasæt, så swaps den på plads (Fjern den gamle version atomisk) . Så det er meget muligt, at følgende sekvens af begivenheder opstår (Det er en god ting) :
        
        1.  ERDDAP™Begynd at indlæse et datasæt (Gør en ny version) i baggrunden.
        2. Bruger 'A' gør en anmodning til datasættet.ERDDAP™Brug den aktuelle version af datasættet til at oprette svaret. (Det er godt. Der var ingen forsinkelse for brugeren, og den nuværende version af datasættet bør aldrig være meget stale.) 
        3.  ERDDAP™Afslut med at skabe den nye genindlæste version af datasættet og swaps, der er ny version i produktionen. Alle efterfølgende nye anmodninger håndteres af den nye version af datasættet. For konsistens er brugerens anmodning stadig udfyldt af den oprindelige version.
        4. Bruger 'B' gør en anmodning til datasættet ogERDDAP™Brug den nye version af datasættet til at oprette svaret.
        5. Til sidst bruger A's og bruger B's anmodninger er afsluttet (måske måske måske måske Ens finish først, måske B's finish først) .
        
Jeg kan høre nogen, der siger: "Bare to blomstrende&#33; Ha&#33; Det er lam&#33; Han skal sætte det op, så genindlæsning af datasæt bruger så mange tråde som er nødvendige, så det hele bliver gjort hurtigere og med lidt eller ingen forsinkelse." Ja og nej. Problemet er, at indlæsning af mere end et datasæt på et tidspunkt skaber flere hårde nye problemer. De skal alle løses eller behandles. Det nuværende system fungerer godt og har styrbare problemer (for eksempel, potentiale for forsinkelse, før et flag er bemærket) . (Hvis du har brug for hjælp til at styre dem, se vores[sektion om at få ekstra støtte](/docs/intro#support).) Den relaterede[Opdater opdatering I nærheden af EveryNMillis](#updateeverynmillis). system fungerer inden for svartråde, så det kan og fører til flere datasæt opdateres (Ikke den fulde belastning) Samtidig.
##### Proactive vs. Reactive{#proactive-vs-reactive} 
ERDDAP's reload system er proaktivt -- datasets bliver genindlæst snart efter deres genindlæsning EveryNMinutes tid er op (dvs. bliver de "stale", men aldrig meget stale) , om datasættet får anmodninger fra brugere eller ej. SåERDDAP™Datasets er altid opdaterede og klar til brug. Dette er i modsætning til THREDDS' reaktiv tilgang: en brugers anmodning er hvad der fortæller THREDDS til at kontrollere, om et datasæt er stale (Det kan være meget stale) . Hvis det er stale, gør THREDDS brugeren vente (Oftest i et par minutter) mens datasættet er genindlæst.
        
#### &lt;Opdater opdatering EveryNMillis&gt;{#updateeverynmillis} 
* [ [] ** &lt;OpdaterEveryNMillis&gt; ** Særkegle (#updateeverynmillis) er en OPTIONAL tag inden for et&lt;datasæt&gt; tag idatasets.xmlaf nogle datasæt typer, der hjælperERDDAP™arbejde med datasæt, der ændrer meget ofte (så ofte som omtrent hvert sekund) . I modsætning tilERDDAP's regelmæssige, proaktive, [&lt;reload Alle rettigheder&gt;] (#loadeveryn minutter) System til fuldstændig at indlæse hvert datasæt, denne OPTIONAL ekstra system er reaktiv (udløst af en brugerkonto) og hurtigere, fordi det er trintal (bare opdatere de oplysninger, der skal opdateres) . For eksempel, hvis en anmodning til enEDDGridFraDap datasæt sker mere end det angivne antal millisekunder siden den sidste opdatering,ERDDAP™vil se, om der er nye værdier for den venstre største (først, normalt"time") dimension og, hvis det er tilfældet, skal du blot downloade de nye værdier, før du håndterer brugerens anmodning. Dette system er meget godt til at holde en hurtig ændring af datasæt up-to-date med minimale krav på datakilden, men på bekostning af lidt langsommere behandling af nogle brugeranmodninger.
    * Hvis du vil bruge dette system, skal du tilføje (for eksempel) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
lige efter&lt;Læs mere om reloadEveryNMinutes&gt; tag for datasættet idatasets.xml. Antallet af millisekunder, som du angiver, kan være så lille som 1 (for at sikre, at datasættet altid er opdaterede) . En værdi på 0 (Standard) eller et negativt nummer slukker systemet.
    * På grund af deres trinvise natur bør opdateringer afslutte meget hurtigt, så brugerne aldrig skal vente lang tid.
    * Hvis en anden anmodning ankommer før den forrige opdatering er færdig, vil den anden anmodning ikke udløse en anden opdatering.
    * Gennem dokumentationen vil vi forsøge at bruge ordet "reload" til regelmæssige, fuld datasæt reloads, og "update" for disse nye trintal, delvise opdateringer.
    * Til testformål udskrives nogle diagnoser til log.txt, hvis [&lt;LogLevel&gt;] (#logniveau) i in in in indatasets.xmler indstillet til "alle".
    * Hvis du bruger trinvise opdateringer og især hvis den yderste (først først) , for eksempel tid, akse er stor, kan du indstille&lt;reloadEveryNMinutes&gt; til et større antal (1440?) , så at opdateringer gør det meste af arbejdet for at holde datasættet opdaterede, og fuld genindlæsninger udføres uvist.
    * Bemærk: Dette nye opdateringssystem opdaterer metadata (for eksempel tidactual\\_range, tid\\_coverage\\_end,...) men udløser ikke påChange (e-mail eller touch URL) eller ændring afRSSfeed (Måske skulle det...) .
    * Til alle datasæt, der bruger underklasser af[EDDGridFraFiles](#eddgridfromfiles)og og og[EDDTableFraFiles](#eddtablefromfiles):
        *    **ADVARSEL:** når du tilføjer en ny datafil til et datasæt ved at kopiere den ind i den mappe, du har tilføjet.ERDDAP™ser på, der er en fare, derERDDAP™vil bemærke den delvist skriftlige fil; prøv at læse den, men undlade, fordi filen er ufuldstændig; erklærer filen at være en "dårlig" fil og fjerne den (midlertidigt eller permanent) fra datasættet.
For at undgå dette, vi **STRONGLY RECOMMEND** at du kopierer en ny fil i mappen med et midlertidigt navn (for eksempel 20150226.ncTmp) der ikke matcher de datasets-fil NavnRegex (\\*.nc) , og omdøb derefter filen til det korrekte navn (for eksempel 20150226.nc) . Hvis du bruger denne fremgangsmåde,ERDDAP™ignorerer den midlertidige fil og bemærker kun den korrekte navngivne fil, når den er færdig og klar til at blive brugt.
        * Hvis du ændrer eksisterende datafiler på plads (for eksempel at tilføje et nyt datapunkt) ,&lt;opdateringEveryNMillis&gt; vil fungere godt, hvis ændringerne vises atomisk (i et øjeblik) og filen er altid en gyldig fil. For eksempel, netcdf-java biblioteket giver mulighed for tilføjelser til en ubegrænset dimension af en "klassisk".ncv3 fil, der skal gøres atomisk.
            &lt;opdateringEveryNMillis&gt; vil arbejde dårligt, hvis filen er ugyldig, mens ændringerne bliver foretaget.
        *   &lt;opdateringEveryNMillis&gt; vil arbejde godt for datasæt, hvor et eller et par filer ændres i et kort tidsrum.
        *   &lt;opdateringEveryNMillis&gt; vil arbejde dårligt for datasæt, hvor et stort antal filer ændres i et kort tidsrum (medmindre ændringerne vises atomisk) . For disse datasæt er det bedre at ikke bruge&lt;OpdaterEveryNMillis&gt; og for at indstille en[flag flag flag flag](/docs/server-admin/additional-information#set-dataset-flag)at fortælleERDDAP™at indlæse datasættet.
        *   &lt;OpdaterEveryNMillis&gt; opdaterer ikke de oplysninger, der er forbundet med [&lt;subsetVariables&gt;] (#subsetvariables) . Normalt er dette ikke et problem, fordi detsubsetVariableshar oplysninger om ting, der ikke ændrer meget ofte (for eksempel listen over stationsnavne, breddegrader og længdegrader) . Hvis det er tilfældetsubsetVariablesÆndringer af data (f.eks. når en ny station tilføjes til datasættet) , og kontakt derefter[flag URL](/docs/server-admin/additional-information#set-dataset-flag)for datasættet til at fortælleERDDAP™at indlæse datasættet. Ellers,ERDDAP™bemærker ikke det nye subset Variabel information indtil næste gang datasættet er reloaded (&lt;reloadEveryNMinutes&gt;).
        * Vores generiske anbefaling er at bruge:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * Hvad er TROUBLE? På Linux-computere, hvis du bruger&lt;OpdaterEveryNMillis&gt; med medEDDGridFraFiles eller EDDTableFraFiles klasser, kan du se et problem, hvor et datasæt undlader at indlæse (lejlighedsvis eller konsekvent) med fejlmeddelelsen: "IOException: Brugergrænse af inotify tilfælde nåede eller for mange åbne filer". Årsagen kan være en fejl iJavasom forårsager inotify tilfælde til ikke at blive affald indsamlet. Dette problem undgås iERDDAP™v1.66 og højere. Så den bedste løsning er at skifte den nyeste version afERDDAP.
Hvis det ikke løser problemet (dvs. hvis du har et virkelig stort antal datasæt ved hjælp af&lt;opdateringEveryNMillis&gt;), kan du løse dette problem ved at ringe:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Eller brug højere tal, hvis problemet fortsætter. Standarden for ure er 8192. Standarden for forekomster er 128.
    * Du kan sætte&lt;OpdaterMaxEvents&gt;10&lt;/updateMaxEvents&gt; i in in in indatasets.xml  (med de andre indstillinger i nærheden af toppen) for at ændre det maksimale antal filændringer (Standard=10) der vil blive behandlet af opdateringenEveryNMillis system. Et større tal kan være nyttigt for datasæt, hvor det er meget vigtigt, at de holdes altid opdateret. Se billederne[OpdaterMaxEvents dokumentation](#updatemaxevents).
    * For Curious Programmer -- disse trinvise opdateringer, i modsætning tilERDDAP's fulde[reloadEveryNMinutes](#reloadeverynminutes)system, forekommer i brugerforespørgselstråde. Så kan enhver række datasæt opdateres samtidig. Der er kode (og lås) for at sikre, at kun én tråd arbejder på en opdatering for enhver given datasæt i ethvert givet øjeblik. Tillading af flere samtidige opdateringer var nemme, så flere samtidige fulde reloads ville være hårdere.
         
#### &lt;kildeKanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* [ [] ** &lt;kildeKanConstrainStringEQNE&gt; ** Særkegle (#sourcecanconstrainstringeqne) er et OPTIONAL-tag inden for en EDDTable&lt;datasæt&gt; tag idatasets.xmlder angiver, om kilden kan håndtere strenge variabler med = og &#33;= operatører.
    * For EDDTableFraDapSequence gælder dette kun for den ydre sekvens strenge variable. Det antages, at kilden ikke kan håndtere eventuelle begrænsninger på indvendige sekvensvariabler.
    * Dette tag er OPTIONAL. Gyldige værdier er sande (Standard) og falsk.
    * Til EDDTableFraDapSequenceOPeNDAPDRDS-servere, dette skal være indstillet til ægte (Standard) .
    * Til EDDTableFraDapSequence Dapper servere, bør dette være indstillet til falsk.
    * Et eksempel er:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;kildeKanConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* [ [] ** &lt;KildeKanConstrainStringGTLT&gt; ** Særkegle (#sourcecanconstrainstringgtlt) er et OPTIONAL-tag inden for en EDDTable&lt;datasæt&gt; tag, der angiver, om kilden kan konrøre strenge variabler med&lt;,&lt;=, &gt; og &gt;= operatører.
    * For EDDTableFraDapSequence gælder dette kun for den ydre sekvens strenge variable. Det antages, at kilden ikke kan håndtere eventuelle begrænsninger på indvendige sekvensvariabler.
    * Gyldige værdier er sande (Standard) og falsk.
    * Dette tag er OPTIONAL. Standarden er sandt.
    * Til EDDTableFraDapSequenceOPeNDAPDRDS-servere, dette skal være indstillet til ægte (Standard) .
    * Til EDDTableFraDapSequence Dapper servere, bør dette være indstillet til falsk.
    * Et eksempel er:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;kildeCanConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* [ [] ** &lt;KildeKanConstrainStringRegex&gt; ** Særkegle (#sourcecanconstrainstringregex) er et OPTIONAL-tag inden for en EDDTable&lt;datasæt&gt; tag, der angiver, om kilden kan konrøre strenge variabler ved regelmæssige udtryk, og hvis det er, hvad føreren er.
    * Gyldige værdier er "=~" (te te te teDAPstandard standard standard) , "~ "Dansk" (fejlagtigt understøttet af mangeDAPservere) , eller "" (angiver, at kilden ikke understøtter regelmæssige udtryk) .
    * Dette tag er OPTIONAL. Standarden er "".
    * Til EDDTableFraDapSequenceOPeNDAPDRDS-servere, dette skal være indstillet til "" (Standard) .
    * Til EDDTableFraDapSequence Dapper servere, bør dette være indstillet til "" (Standard) .
    * Et eksempel er:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;kildeKanDoDistinct&gt;{#sourcecandodistinct} 
* [ [] ** &lt;KildeKanDoDistinct&gt; ** Særkegle (#sourcecandodistinct) er et OPTIONAL-tag inden for en EDDTableFraDatabase&lt;datasæt&gt; tag, der angiver, om kildedatabasen skal håndtere &distinct () begrænsninger i brugerforespørgsler.
    * Dette tag er OPTIONAL. Gyldige værdier er ikke (ERDDAP™håndtag adskilt; standarden) , delvis (Kilden håndterer adskilt ogERDDAP™håndterer den igen) , og ja (kilden håndterer tydelige) .
    * Hvis du bruger ingen ogERDDAP™kører ud af hukommelse, når du håndterer særskilt, brug ja.
    * Hvis du bruger ja og kildedatabasen håndterer alt for langsomt, skal du bruge nej.
    * Del giver dig det værste af begge: det er langsom, fordi databasehåndteringen af særskilt er langsom, og det kan køre ud af hukommelsen iERDDAP.
    * Databaser tolker DISTINCT som anmodning om blot unikke rækker af resultater, mensERDDAP™fortolker det som en anmodning om en sorteret liste over unikke rækker af resultater. Hvis du indstiller dette til delvis eller ja,ERDDAP™Automatisk fortæller også databasen til at sortere resultaterne.
    * En lille forskel i resultaterne:
Med ingen|delvis, delvis,ERDDAP™vil sortere "" i starten af resultaterne (før ikke-" strenge) .
Med ja, databasen kan (Postgres vil) sortere "" i slutningen af resultaterne (efter ikke-" strenge) .
Jeg vil gætte, at dette også vil påvirke sorteringen af korte ord mod længere ord, der starter med det korte ord. For eksempel,ERDDAP™vil sortere "Simon" før "Simons".
    * Et eksempel er:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;kildeKanOrderBy&gt;{#sourcecanorderby} 
* [ [] ** &lt;kildekildekilde KanOrderBy&gt; ** Særkegle (#sourcecanorderby) er et OPTIONAL-tag inden for en EDDTableFraDatabase&lt;datasæt&gt; tag, der angiver, om kildedatabasen skal håndtere ogorderBy (......) begrænsninger i brugerforespørgsler.
    * Dette tag er OPTIONAL. Gyldige værdier er ikke (ERDDAP™håndtagorderBy (......) ; standarden) , delvis (kildehåndtagetorderByog og ogERDDAP™håndterer den igen) , og ja (kildehåndtagetorderBy (......) ) .
    * Hvis du bruger ingen ogERDDAP™kører ud af hukommelse, når håndteringen håndteresorderBy (......) , brug ja.
    * Hvis du bruger ja og kildedatabasehåndtagetorderBy (......) Brug ikke for langsomt.
    * Del giver dig det værste af begge: det er langsom, fordi databasehåndteringen aforderBy (......) er langsom, og det kan køre ud af hukommelse iERDDAP.
    * En lille forskel i resultaterne:
Med ingen|delvis, delvis,ERDDAP™vil sortere "" i starten af resultaterne (før ikke-" strenge) .
Med ja, databasen kan (Postgres vil) sortere "" i slutningen af resultaterne (efter ikke-" strenge) .
Dette kan også påvirke sorteringen af korte ord mod længere ord, der starter med det korte ord. For eksempel,ERDDAP™vil sortere "Simon" før "Simons", men jeg er ikke sikker på, hvordan en database vil sortere dem.
    * Et eksempel er:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;KildeNeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* [ [] ** &lt;KildeNeedsExpandedFP\\_EQ&gt; ** Særkegle (#sourceneedsexpandedfp_eq) er et OPTIONAL-tag inden for en EDDTable&lt;datasæt&gt; tag, der angiver (sande sande sande sande (Standard) eller falsk) hvis kilden skal hjælpe med forespørgsler med&lt;numerisk Variabel&gt;=&lt;flydendePointValue&gt; (og &#33;=, &gt;=,&lt;=). For eksempel,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * For nogle datakilder, numeriske forespørgsler, der involverer =, &#33;=,&lt;= eller &gt;= virker muligvis ikke som ønsket med flydende punktnumre. For eksempel kan en søgning efter længde=220.2 fejle, hvis værdien gemmes som 220.20000000000001.
    * Problemet opstår, fordi flydende punktnumre er[ikke repræsenteret nøjagtigt inden for computere](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    * Hvis kildeNeedsExpandedFP\\_EQ er indstillet til sand (Standard) ,ERDDAP™ændrer de forespørgsler, der sendes til datakilden for at undgå dette problem. Det er altid sikkert og fint at forlade dette sæt til sand.
         
#### &lt;sourceUrl&gt;{#sourceurl} 
* [ [] ** &lt;sourceUrl&gt; &gt; &gt; &gt; ** Særkegle (#sourceurl) er et almindeligt tag inden for et datasæts globale globale&lt;addAttributes&gt; tag, der angiver den URL, der er kilden til dataene.
    * Et eksempel er:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (men sæt det hele på én linje) 
    * I nærheden af In In In In In In In In In In In In In InERDDAP™, alle datasæt vil have en "sourceUrl" i de kombinerede globale attributter, der vises til brugerne.
    * For de fleste datasæt typer, er dette tag REQUIRED. Se datasættypens beskrivelse for at finde ud af, om dette er REQUIRED eller ej.
    * For nogle datasæt, den separate&lt;sourceUrl&gt; tag er ikke tilladt. I stedet skal du angive en "sourceUrl" " " "[global attribut](#global-attributes), normalt i den globale \\&gt;addAttributes&lt;. Hvis der ikke er nogen egentlige kildeURL (f.eks. hvis dataene gemmes i lokale filer) , denne egenskab ofte bare har en pladsholder værdi, for eksempel&lt;ont navn (lokale filer) &lt;/att&gt;.
    * For de fleste datasæt, er dette bunden af den URL, der bruges til at anmode data. For eksempel, forDAPservere, dette er den URL, som .dods, .das, .dds eller .html kan tilføjes.
    * Sidendatasets.xmler en XML-fil, du SKAL også encode '&', '&lt;', og '&gt;' i URL'en som '&amp;', '&lt;' og '&gt;'.
    * For de fleste datasæt typer,ERDDAP™tilføjer originalensourceUrl  ("localSourceUrl" i kildekoden) Til højre[globale attributter](#global-attributes)  (hvor det bliver "publicSourceUrl" i kildekoden) . Når datakilden er lokale filer,ERDDAP™tilføjersourceUrlSupplerende oplysninger om (lokale filer) " til de globale attributter som en sikkerhedsforanstaltning. Når datakilden er en database,ERDDAP™tilføjersourceUrlSupplerende oplysninger om (kildedatabase) " til de globale attributter som en sikkerhedsforanstaltning. Hvis nogle af dine datasæt ikke-offentligesourceUrl's (normalt fordi deres computer er i din DMZ eller på et lokalt LAN) Du kan bruge [&lt;konvertereToPublicSourceUrl&gt;] (#converttopublicsourceurl) tags for at angive, hvordan du konverterer de lokalesourceUrls til offentligsourceUrls.
    * A A A A A AsourceUrlKan begynde medhttp://,https://, ftp:// og måske andre præfikser.httpsForbindelser læse og kontrollere kildens digitale certifikat for at sikre, at kilden er, hvem de siger, de er. I sjældne tilfælde kan denne check fejle med fejlen "javax.net.ssl.SSLProtocolException: håndtryk alarm: ukendt\\_name". Dette skyldes sandsynligvis domænenavnet på certifikatet, der ikke matcher domænenavnet, du bruger. Du kan og skal læse detaljerne isourceUrl's certifikat i din webbrowser, især listen over "DNS Navn" i sektionen "Subject Alternative Name".
        
I nogle tilfældesourceUrlDu bruger kan være et alias for domænenavnet på certifikatet. For eksempel,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ vil smide denne fejl, men
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , som bruger domænenavnet på certifikatet, vil ikke. Løsningen i disse tilfælde er derfor at finde og bruge domænenavnet på certifikatet. Hvis du ikke kan finde det på certifikatet, skal du kontakte dataudbyderen.
        
I andre tilfælde kan domænenavnet på certifikatet være for en gruppe navne. Hvis dette sker, eller problemet er uopløseligt, bedes du kontakte Chris. John på noaa.gov for at rapportere problemet.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ [] ** &lt;addAttributes&gt; &gt; &gt; &gt; ** Særkegle (#addattributes) er et OPTIONAL-mærke for hver datasæt og for hver variabel, der laderERDDAPAdministratorer kontrollerer de metadata attributter, der er forbundet med et datasæt og dens variabler.
    *   ERDDAP™kombinerer attributterne fra datakilden ("sourceAttributes") og "addAttributes" som du definerer idatasets.xml  (som har prioritet) at gøre "kombinedAttributes", som er hvadERDDAP™Brugere ser. Således kan du brugeaddAttributesat omfine værdierne for kildeAttributes, tilføje nye attributter eller fjerne attributter.
    * The The The The The The The&lt;addAttributes&gt; tag omslutter 0 eller mere ** &lt;påt&gt; ** subtags, som bruges til at angive individuelle attributter.
    * Hver egenskab består af et navn og en værdi (som f.eks. har en bestemt datatype, dobbelt) .
    * Der kan kun være én egenskab med et givet navn. Hvis der er mere, har den sidste prioritet.
    * Værdien kan være en enkelt værdi eller en rumbestemt liste over værdier.
    * Syntaks
        * Ordren af ordren&lt;påt&gt; subtags inden foraddAttributeser ikke vigtigt.
        * The The The The The The The&lt;påt&gt; subtag format er
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * bestemmelsessteds navn skal starte med et bogstav (A-Z, a-z) og SKAL indeholde kun tegnne A-Z, a-z, 0-9 eller '\\_'.
        * Hvis en&lt;påt&gt; subtag har ingen værdi eller en værdi af null, at attributten fjernes fra de kombinerede attributter.
For eksempel,&lt;ont name Hangingrows" /&gt; vil fjerne rækker fra de kombinerede attributter.
For eksempel,&lt;ont navn&lt;/att&gt; fjerner koordinater fra de kombinerede attributter.
##### attribut Type Type Type Type{#attributetype} 
* [Den OPTIONAL-typeværdi for&lt;påt&gt; subtags] (#attributetype) angiver datatypen for værdierne. Standardtypen er String. Et eksempel på en streng attribut er:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Gyldige typer for enkeltværdier er byte (8-bit iteger) , kort (16-bit underskrevet iteger) , int (32-bit underskrevet iteger) , lang (64-bit underskrevet iteger) , flyv (32-bit flydende punkt) , dobbelt (64-bit flydende punkt) , char og String. For eksempel,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Se disse noter om[Oplysningerstype](#char).
Se disse noter om[Lang datatype](#long).
        
    * Gyldige typer til rumbebyggede lister over værdier (eller enkeltværdier) er byteList, kortList, unsignedShortList, charList, intList, longList, flyList, dobbelt Liste. For eksempel,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
En usignedShortList lader dig angive en liste over usignede shorts, men de vil blive konverteret til en liste over de tilsvarende Unicode-tegn (f.eks. "65 67 69" vil blive konverteret til "A C E".
Hvis du angiver en charList, skal du indtaste eventuelle særlige tegn (f.eks. plads, dobbelt citater, backslash,&lt;#32, eller &gt;#127) som du vil kode dem i datasektionen i en NCCSV-fil (f.eks. ", """ eller """", "\\\\", "\\n",") .
Der er ingen strengList. Opbevar strengeværdierne som en multiline streng. For eksempel,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Globale bidrag{#global-attributes} 
* [ [] ** Globale bidrag / Global&lt;addAttributes&gt; &gt; &gt; &gt; ** Særkegle (#global-attributes) --
    &lt;addAttributes&gt; er et OPTIONAL-tag inden for&lt;Dataset&gt; tag, som bruges til at ændre attributter, der gælder for hele datasættet.
    
    *    ** Brug den globale&lt;addAttributes&gt; for at ændre datasættets globale attributter. ** ERDDAP™kombinerer de globale attributter fra datasættets kilde (** Kilder **) og den globale** addAttributes **som du definerer idatasets.xml  (som har prioritet) at gøre den globale** kombinerede bidrag ** , som er hvadERDDAP™Brugere ser. Således kan du brugeaddAttributesat omfine værdierne for kildeAttributes, tilføje nye attributter eller fjerne attributter.
    * Se [ ** &lt;addAttributes&gt; &gt; &gt; &gt; **Oplysninger] (#addattributes) som gælder for globale og variable** &lt;addAttributes&gt; &gt; &gt; &gt; ** .
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)og og og[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadata -- Normalt,ERDDAP™vil automatisk generere ISO 19115-2/19139 og FGDC (FGDC-STD-001-1998) XML-datafiler til hver datasæt ved hjælp af oplysninger fra datasættets metadata. Så, **God datasæt metadata fører til gode datasætERDDAP-genererede ISO 19115 og FGDC metadata. Overvej at sætte masser af tid og bestræbelser på at forbedre dine datasets metadata (hvilket er en god ting at gøre alligevel) .** De fleste af de datasæt metadata attributter, der bruges til at generere ISO 19115 og FGDC metadata, er fra de[ACDD metadata standard](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)og er så noteret nedenfor.
    * Mange globale attributter er specielle i, atERDDAP™ser efter dem og bruger dem på forskellige måder. Et link til f.eks.infoUrler inkluderet på websider med lister over datasæt og andre steder, så brugerne kan finde ud af mere om datasættet.
    * Når en bruger vælger et undersæt af data, globalAttributes relateret til variablens længde, breddegrad, højde (eller dybde) , og tidsintervaller (f.eks. sydligste\\_Northing, Northernmost\\_Northing, tid\\_coverage\\_start, tid\\_coverage\\_end) genereres automatisk eller opdateres.
    * En simpel prøve global&lt;addAttributes&gt; er:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Den tomme cwhdf\\_version attribut forårsager kilden cwhdf\\_version attribut (hvis nogen) at blive fjernet fra den endelige, kombinerede liste over attributter.
    * At levere disse oplysninger hjælperERDDAP™Gør et bedre job og hjælper brugerne med at forstå datasæt.
Gode metadata gør en datasæt brugbar.
Utilstrækkelige metadata gør et datasæt ubrugeligt.
Tag dig tid til at gøre et godt job med metadata attributter.
##### Særlige globale attributter iERDDAP™
###### Bekendtgørelse{#acknowledgement} 
*   [ **Bekendtgørelse** ](#acknowledgement)og og og **anerkendelse**   (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er en RECOMMMENTD måde at anerkende den gruppe eller grupper, der giver støtte (navnlig økonomisk) for det projekt, der har oprettet disse data. For eksempel,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Bemærk, at ACDD 1.0 og 1.1 brugte staven "acknowledgment" (som er den sædvanlige stavemåde i USA.) , men ACDD 1.3 ændrede dette til "kendskab" (som er den sædvanlige stavemåde i U.K.) . Min forståelse er, at ændringen var stort set en ulykke, og at de bestemt ikke forstod ændringens Væstninger. Hvad et rod&#33; Nu er der millioner af datafiler over hele verden, der har "acknowledgment" og millioner, der har "acknowledgement". Dette understreger betydningen af "simple" ændringer i en standard og understreger behovet for stabilitet i standarder. Fordi ACDD 1.3 (som er versionen af ACDD, derERDDAP™understøtter) siger "acknowledgement", der er hvadERDDAP™  (Betydeligt GenererDatasets Xml) opfordrer.
     
###### CDm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*   [ **CDm\\_altitude\\_proxy** ](#cdm_altitude_proxy)er kun for EDDTable datasæt, der ikke har en højde eller dybde variabel, men har en variabel, der er en proxy til højde eller dybde (for eksempel, tryk, suma, flaske tal) , kan du bruge denne egenskab til at identificere den variable. For eksempel,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Hvis det er tilfældet[CDm\\_data\\_type](#cdm_data_type)er Profil eller TrajectoryProfil, og der er ingen højde eller dybde variabel, CDm\\_altitude\\_proxy SKAL defineres. Hvis cdm\\_altitude\\_proxy defineres,ERDDAP™vil tilføje følgende metadata til variablen: \\_Coordinate AxisType=Height og akse=Z.
     
###### CDm\\_data\\_type{#cdm_data_type} 
*   [ **CDm\\_data\\_type** ](#cdm_data_type)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er en global egenskab, der angiver denUnidata [Fælles data Model](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)datatype til datasættet. For eksempel,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CdM udvikler sig stadig og kan ændre sig igen.ERDDAP™overholder de relaterede og mere detaljerede[Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)kapitel af[CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatakonventioner (tidligere kaldet CF Point Observationskonventionen) .
    * Enten datasættets globale[Kilder](#global-attributes)eller dets globale&lt;addAttributes&gt; &gt; &gt; &gt; SKAL inkludere cdm\\_data\\_type attributten. Et par datasæt typer (som EDDTable FraObis) vil indstille dette automatisk.
    * For For For For ForEDDGridDatasæt, cdm\\_data\\_type indstillinger er Grid (standarden og langt den mest almindelige type forEDDGridDatasæt) , FlytteGrid, Andre, Point, Profil, RadialSweep, TimeSeriesProfil, Swath, Trajectory og TrajectoryProfil. I øjeblikket,EDDGridkræver ikke, at eventuelle relaterede metadata er angivet, og kontrollerer heller ikke, at dataene matcher cdm\\_data\\_type. Det vil sandsynligvis ændre sig i den nærmeste fremtid.
    * EDDTable bruger cdm\\_data\\_type på en streng måde, efter CF's DSG-specifikationer snarere end CDM, som af en eller anden grund ikke er blevet opdateret til at være i overensstemmelse med DSG. Hvis en datasæts metadata ikke overholder oplysningerneERDDAP's cdm\\_data\\_type's krav (se nedenfor) , datasættet vil undlade at indlæse og vil generere en[fejlmeddelelse](#troubleshooting-tips). (Det er en god ting, i den forstand, at fejlmeddelelsen vil fortælle dig, hvad der er forkert, så du kan løse det.) Og hvis datasættets data ikke matcher datasættets metadataopsætning (f.eks., hvis der er mere end en breddegradsværdi for en given station i en timeserie datasæt) , nogle anmodninger om data vil returnere forkerte data i svaret. Så sørg for at få alle denne ret.
        
Til alle disse datasæt i konventionen ogMetadata\\_Conventionsglobale attributter, henvises til CF-1.6 (ikke CF-1.0, 1.1, 1,2, 1.3, 1.4 eller 1,5) , da CF-1.6 er den første version til at inkludere ændringerne relateret til Discrete Sampling Geometry (DSG) konventioner.
        *   **ERDDAP™har et ikke-simple forhold til CF DSG** 
        *   ERDDAP™kan foretage en gyldig DSG-datasæt ud af et kildedatasæt, der allerede er en gyldig DSG-fil (s s s) , eller ud af et kildedatasæt, der ikke er konfigureret til DSG, men kan foretages via ændringer i metadata (nogle af dem erERDDAP-specifik for at give en mere generel tilgang til at angive DSG-opsætningen) .
        *   ERDDAP™gør en masse gyldighedstest, når det indlæser et datasæt. Hvis datasættet, der har en cdm\\_data\\_type (eller eller ellerfeatureType) attribut med succes belastninger iERDDAP™, såERDDAP™siger, at datasættet opfylder DSG-kravene (ellers,ERDDAP™vil smide en undtagelse forklare det første problem, at det fandt) .
ADVARSEL: Et medfølgende datasæt vises for at opfylde DSG-kravene (den har den rigtige kombination af attributter) , men kan stadig være forkert konfigureret, hvilket fører til forkerte resultater i.ncCF og.ncCFMA-responsfiler. (Software er smart på nogle måder og sporløs i andre.) 
        * Når du ser på datasættets metadata iERDDAP™, DSG-datasættet vises for at være iERDDAP's interne format (en kæmpe, databaselignende tabel) . Det er ikke i et af DSG-formater (f.eks. dimensioner og metadata er ikke rigtige) , men de oplysninger, der er nødvendige for at behandle datasættet som et DSG-datasæt, er i metadata (f.eks. cdm\\_data\\_type=TimeSeries og cdm\\_timeseries\\_variables= *aCsvListOfStationRelatedVarables* i de globale metadata og cf\\_role=timeseries\\_id for nogle variable) .
        * Hvis en bruger anmoder om et undersæt af datasættet i en.ncCF (En antydning.ncfil i DSG's Contiguous Ragged Array) eller eller eller.ncCFMA-fil (a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a.ncfil i DSG's Multidimensional Array-filformat) , denne fil vil være en gyldig CF DSG-fil.
ADVARSEL: Hvis datasættet er indstillet forkert (så de løfter, der er lavet af metadata, ikke er sande) , så vil responsfilen være teknisk gyldig, men vil være forkert på nogen måde.
             
###### EDDTable cdm_data_typer
* Til EDDTable datasæt, cdm\\_data\\_type indstillinger (og relaterede krav iERDDAP) er de er
###### Point Point Point{#point} 
*   [Point Point Point](#point)-- er for et sæt af målinger taget på urelaterede tider og steder.
    * Som med alle cdm\\_data\\_typer andre end andre, Point datasæt SKAL have længde, breddegrad og tidsvariabler.
###### Profilprofil{#profile} 
*   [Profilprofil](#profile)-- er et sæt målinger alle taget på én gang, på en breddegrad længde placering, men på mere end én dybde (eller højde) . Datasættet kan være en samling af disse profiler, for eksempel 7 profiler fra forskellige steder. Denne cdm\\_data\\_type betyder ikke nogen logisk forbindelse mellem nogen af profilerne.
    
* En af variablerne (for eksempel profil\\_nummer) SKAL have den variable egenskab cf\\_role= Profilee\\_id for at identificere den variable, der entydigt identificerer profiler.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Hvis ingen anden variabel er egnet, overveje at bruge tidsvariablen.
###### CDm\\_profile\\_variables{#cdm_profile_variables} 
* Datasættet skal indeholde globalAttribute[CDm\\_profile\\_variables](#cdm_profile_variables), hvor værdien er en kommunal liste over de variable, der har oplysninger om hver profil. For en given profil, skal værdierne af disse variabler være konstant. For eksempel,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Listen skal indeholde cf\\_role=profile\\_id variabel og alle andre variabler med oplysninger om profilen, og tid, breddegrad og længdegrad.
Listen vil aldrig indeholde højde, dybde eller nogen observationsvarier.
     

\\[Udtalelse: CDm\\_data\\_type=Profil skal sjældent anvendes. I praksis er et givet datasæt normalt enten en TimeSeriesProfil (profiler på en fast position) eller en TrajectoryProfil (profiler langs en trajectory) , og så skal identificeres korrekt som sådan.\\]  
###### TimeSeries{#timeseries} 
*   [TimeSeries](#timeseries)-- er en sekvens af målinger (f.eks. vandtemperatur) taget på en, fast, breddegrad, længde, dybde (eller højde) Beliggenhed. (Tænk på det som "station".) Datasættet kan være en samling af disse TimeSeries, f.eks. en sekvens fra hver af 3 forskellige lokationer.
    * En af variablerne (f.eks. station\\_id) SKAL have den variable egenskab cf\\_role=timeseries\\_id for at identificere den variable, der entydigt identificerer stationer.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### CDm\\_timeseries\\_variables{#cdm_timeseries_variables} 
* Datasættet skal indeholde globalAttribute[CDm\\_timeseries\\_variables](#cdm_timeseries_variables), hvor værdien er en kommunal liste over de variable, der har oplysninger om hver station. For en given station, skal værdierne af disse variabler være konstant. For eksempel,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
Listen skal indeholde cf\\_role=timeseries\\_id variabel og alle andre variabler med oplysninger om stationen, som næsten altid indeholder længde og længde (og højde eller dybde, hvis nutiden) .
Listen vil aldrig indeholde tid eller nogen observationsvarier.
* For nogle fortøjede buoys kan et datasæt have to sæt breddegrad og længde variabler:
    1. Et par breddegrader og længdeværdier, der er konstant (dvs. den faste placering af fortøjning) . I nærheden af In In In In In In In In In In In In In InERDDAP™, give disse variablerdestinationNamebreddegrad og længdegrad, og omfatter disse variabler på listen over cdm\\_timeseries\\_variables.
    2. Præcis breddegrad og længdeværdier forbundet med hver observation. I nærheden af In In In In In In In In In In In In In InERDDAP™, give disse variabler forskelligedestinationNames s s (f.eks. præciseLat og præcis Lon) Indeholder ikke disse variabler på listen over cdm\\_timeseries\\_variables.
Årsagen til dette er: fra et teoretisk perspektiv, for en DSG TimeSeries datasæt, breddegrad og længde (og højde eller dybde, hvis nutiden) placering af stationen skal være konstant.
###### TimeSeriesProfil{#timeseriesprofile} 
*   [TimeSeriesProfil](#timeseriesprofile)-- er for en række profiler taget på en, fast, breddegrad længde placering. Hver profil er et sæt af målinger taget i flere højder eller dybder. Datasættet kan være en samling af disse TimeSeriesProfiles, for eksempel en sekvens af profiler taget på hver af 12 forskellige steder.
    * En af variablerne (f.eks. station\\_id) SKAL have den variable egenskab cf\\_role=timeseries\\_id for at identificere den variable, der entydigt identificerer stationer.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * En af variablerne (for eksempel profil\\_nummer) SKAL have den variable egenskab cf\\_role= Profilee\\_id for at identificere den variable, der entydigt identificerer profiler.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (En given profil\\_id skal kun være unik for en given tidsserie\\_id.) Hvis ingen anden variabel er egnet, overveje at bruge tidsvariablen.
    * Datasættet skal indeholde den globaleAttribute cdm\\_timeseries\\_variables, hvor værdien er en koma-separat liste over de variable, der har oplysninger om hver station. For en given station, skal værdierne af disse variabler være konstant. For eksempel,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
Listen skal indeholde cf\\_role=timeseries\\_id variabel og alle andre variabler med oplysninger om stationen, som næsten altid indeholder længde og længde.
Listen vil aldrig indeholde tid, højde, dybde eller nogen observationsvariabler.
    * Datasættet skal indeholde den globaleAttribute cdm\\_profile\\_variables, hvor værdien er en koma-separat liste over de variable, der har oplysninger om hver profil. For en given profil, skal værdierne af disse variabler være konstant. For eksempel,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
Listen skal indeholde cf\\_role=profile\\_id variabel og alle andre variabler med oplysninger om profilen, som næsten altid indeholder tid.
Listen vil aldrig indeholde breddegrad, længde, højde, dybde eller nogen observationsvariabler.
###### Trajectory{#trajectory} 
*   [Trajectory](#trajectory)-- er en sekvens af målinger taget langs en trajectory (en vej gennem rummet og tiden)   (f.eks. hav\\_water\\_temperaturen taget af et skib, da det bevæger sig gennem vandet) . Datasættet kan være en samling af disse Trajectories, f.eks. en sekvens fra hver af 4 forskellige skibe.
    * En af variablerne (for eksempel skibet\\_id) SKAL have attributten cf\\_role=trajectory\\_id for at identificere den variable, der entydigt identificerer trajectories.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### CDm\\_trajectory\\_variables{#cdm_trajectory_variables} 
* Datasættet skal indeholde globalAttribute[CDm\\_trajectory\\_variables](#cdm_trajectory_variables), hvor værdien er en kommunal liste over de variable, der har oplysninger om hver bane. For en given trajectory, skal værdierne af disse variabler være konstant. For eksempel,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Listen skal indeholde cf\\_role=trajectory\\_id variabel og alle andre variabler med oplysninger om trajectory.
Listen vil aldrig indeholde tid, breddegrad, længde eller nogen observationsvariabler.
###### TrajectoryProfil{#trajectoryprofile} 
*   [TrajectoryProfil](#trajectoryprofile)-- er en række profiler taget langs en trajectory. Datasættet kan være en samling af disse TrajectoryProfiles, for eksempel en sekvens af profiler taget af 14 forskellige skibe.
    * En af variablerne (for eksempel skibet\\_id) SKAL have den variable egenskab cf\\_role=trajectory\\_id for at identificere den variable, der entydigt identificerer trajectories.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * En af variablerne (for eksempel profil\\_nummer) SKAL have den variable egenskab cf\\_role= Profilee\\_id for at identificere den variable, der entydigt identificerer profiler.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (En given profil\\_id skal kun være unik for en given trajectory\\_id.) Hvis ingen anden variabel er egnet, overveje at bruge tidsvariablen.
    * Datasættet skal indeholde den globaleAttribute cdm\\_trajectory\\_variables, hvor værdien er en koma-separat liste over de variable, der har oplysninger om hver trajectory. For en given trajectory, skal værdierne af disse variabler være konstant. For eksempel,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Listen skal indeholde cf\\_role=trajectory\\_id variabel og alle andre variabler med oplysninger om trajectory.
Listen vil aldrig indeholde profilrelaterede variabler, tid, breddegrad, længde eller nogen observationsvariabler.
    * Datasættet skal indeholde den globaleAttribute cdm\\_profile\\_variables, hvor værdien er en koma-separat liste over de variable, der har oplysninger om hver profil. For en given profil, skal værdierne af disse variabler være konstant. For eksempel,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
Listen skal indeholde cf\\_role=profile\\_id variabel og alle andre variabler med oplysninger om profilen, som næsten altid indeholder tid, breddegrad og længdegrad.
Listen vil aldrig indeholde højde, dybde eller nogen observationsvarier.
###### Andre andre{#other} 
*   [Andre andre](#other)-- har ingen krav. Brug den, hvis datasættet ikke passer til en af de andre muligheder, især, hvis datasættet ikke omfatter breddegrad, længdegrad og tidsvariabler.
     
###### Relaterede bemærkninger{#related-notes} 
* Alle EDDTable datasæt med en cdm\\_data\\_type andet end "Andre" SKAL have længde, bredde og tidszoner.
* Datasets med profiler skal have en højdevariabel, en dybde variabel eller en[CDm\\_altitude\\_proxy](#cdm_altitude_proxy)variabel.
* Hvis du ikke kan foretage et datasæt opfylder alle kravene til den ideelle cdm\\_data\\_type, skal du bruge "Point" (som har få krav) eller "Andre" (som ikke har krav) I stedet.
* Disse oplysninger bruges afERDDAP™på forskellige måder, for eksempel, men mest for at gøre.ncCF-filer (.ncfiler, der overholder de Contiguous Ragged Array-præsentationer, der er forbundet med datasættets cdm\\_data\\_type) og og og.ncCFMA-filer (.ncfiler, der overholder Multidimensionelle Array-præsentationer, der er forbundet med datasættets cdm\\_data\\_type) som defineret i[Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)kapitel af[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatakonventioner, som tidligere blev navngivet "CF Point observationskonventioner".
* Hint: For disse datasæt, den korrekte indstilling for[subsetVariables](#subsetvariables)er normalt kombinationen af alle de variable, der er opført i cdm\\_...\\_variables attributter. Du kan f.eks. bruge cdm\\_timeseries\\_variables plus cdm\\_profile\\_variables.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er RECOMMMENTD’s måde at identificere en person, organisation eller projekt, der bidrager til disse datasæt (f.eks. den oprindelige skaber af dataene, før den blev behandlet af skaberen af denne datasæt) . For eksempel,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Hvis "fordeler" ikke virkelig gælder for et datasæt, omit denne egenskab. Sammenlignet med[creator\\_name](#creator_name), dette er nogle gange mere fokuseret på finansieringskilden.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er RECOMMMENTD’s måde at identificere rollen som[contributor\\_name](#creator_name). For eksempel,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Hvis "fordeler" ikke virkelig gælder for et datasæt, omit denne egenskab.
###### Konventioner{#conventions} 
*   [ **Konventioner** ](#conventions)  (fra fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata standard) er STRONGLY RECOMMMENTD. (Det kan være REQUIRED i fremtiden.) Værdien er en kommunaliseret liste over metadatastandarder, som denne datasæt følger. For eksempel:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
De almindelige metadatakonventioner, der anvendes iERDDAP™er:
    
    *   [COARDSKonventioner](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)er forstaden til CF.
    *   [Klima og prognoser (CF) Konventioner](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)er kilden til mange af de anbefalede og krævede attributter iERDDAP. Den nuværende version af CF er identificeret som "CF-1.6".
    * The The The The The The TheNetCDFIntributekonventionen for Dataset Discovery (ACDD) er kilden til mange af de anbefalede og krævede attributter iERDDAP. Den oprindelige 1.0 version af ACDD (et strålende stykke arbejde af Ethan Davis) , blev identificeret som[UnidataDataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)Den aktuelle (startende i 2015) 1.3 version af ACDD er identificeret som[ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). Hvis dine datasæt er blevet brugtUnidataDataset Discovery v1.0, vi opfordrer dig til at[Skift dine datasæt til at bruge ACDD-1.3](#switch-to-acdd-13).
    
Hvis dit datasæt følger nogle yderligere metadata standard, skal du tilføje navnet på CSV-listen i egenskaben Konventioner.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (fra fra[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)metadata standard) er RECOMMMENTD-metoden til at identificere typen af gitterded-data (i in in in inEDDGridDatasæt) . For eksempel,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
De eneste tilladte værdier er hjælpeprogrammer, billede, modelResult, fysisk Måling (standarden, når ISO 19115-metadata genereres) , kvalitet Oplysninger, referenceOplysninger og tematiske Klassificering. (Brug ikke dette tag til EDDTable datasets.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er RECOMMMENTD-metoden til at identificere den person, organisation eller projekt (hvis ikke en bestemt person eller organisation) , mest ansvarlig for skabelsen (eller seneste genbehandling) af disse data. For eksempel,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Hvis dataene blev grundigt omarbejdet (for eksempel satellitdata fra niveau 2 til niveau 3 eller 4) , så normalt genprocessoren er opført som skaberen og den oprindelige skaber er opført via[contributor\\_name](#contributor_name). Sammenlignet med[projekt projekt projekt projekt projekt projekt projektprojekt](#project), dette er mere fleksibel, da det kan identificere en person, en organisation eller et projekt.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er RECOMMMENTD’s måde at identificere en e-mailadresse (korrekt formateret) Det giver en måde at kontakte skaberen. For eksempel,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er RECOMMMENTD’s måde at identificere en URL for organisation, der har oprettet datasættet eller en URL med skaberens oplysninger om denne datasæt (men det er mere formålet med[infoUrl](#infourl)) . For eksempel,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er RECOMMMENTD’s måde at identificere den dato, hvor dataene først blev oprettet (for eksempel behandlet i denne formular) , i ISO 8601 format. For eksempel,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Hvis data regelmæssigt føjes til datasættet, er dette den første dato, at de oprindelige data blev gjort tilgængelige.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er RECOMMMENTD’s måde at identificere den dato, hvor oplysningerne sidst blev ændret (for eksempel, når en fejl blev rettet, eller når de seneste data blev tilføjet) , i ISO 8601 format. For eksempel,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) RECOMMMENTD’s måde at identificere den dato, hvor dataene først blev gjort tilgængelige for andre i ISO 8601 format, f.eks. 2012-03-15. For eksempel,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
For eksempel kan datasættet have et[date\\_created](#date_created)af 2010-01-30, men blev kun offentligt tilgængelig 2010-07-30.date\\_issueder mindre almindeligt anvendt enddate\\_createdog og ogdate\\_modified. Hvisdate\\_issueder udeladet, det antages at være den samme som dendate\\_created.
###### globalt globalt globalt globaltdrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)-- Dette er en OPTIONAL global attribut, der bruges afERDDAP™  (og ingen metadatastandarder) som angiver standardværdien for indstillingen "Draw Land Mask" på datasættets Make A Graph-formular ( *datasetID* .ografi) og for parameteren &.land i en URL, der anmoder om et kort over dataene. For eksempel,
    ```
    <att name="drawLandMask">over</att>  
    ```
Se billederne[drawLandMaskoversigtsoversigt](#drawlandmask).
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (fra fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata standard) er IGNORED og/eller REPLACED. Hvis datasættets[CDm\\_data\\_type](#cdm_data_type)er passende,ERDDAP™vil automatisk bruge den til at oprette enfeatureTypeattribut. Så der er ingen grund til at tilføje det.
    
Men hvis du bruger[EDDTableFraNcCFFiles](#eddtablefromnccffiles)at oprette et datasæt fra filer, der følger[CF Diskret Sampling Geometries (DSG) standard standard standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries), filerne selv skal havefeatureTypekorrekt defineret, så atERDDAP™kan læse filerne korrekt. Det er en del af CF DSG krav til den type fil.
     
###### Historiehistoriehistorie{#history} 
*   [ **Historiehistoriehistorie** ](#history)  (fra fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og og og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) er en RECOMMMENTD multiline String global attribut med en linje for hver behandling trin, som dataene har gennemgået. For eksempel,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Ideelt set hver linje har en ISO 8601:2004 (E) formateret dato+timeZ (for eksempel 2011-08-05T08:55:02Z) efterfulgt af en beskrivelse af behandlingstrinet.
    *   ERDDAP™skaber dette, hvis det ikke allerede findes.
    * Hvis det allerede findes,ERDDAP™vil tilføje nye oplysninger til de eksisterende oplysninger.
    * Historien er vigtig, fordi det giver kunderne mulighed for at backtrack til den oprindelige kilde af dataene.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)er en REQUIRED global attribut med URL-adressen på en webside med flere oplysninger om denne datasæt (normalt på kildeinstitutionens hjemmeside) . For eksempel,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Enten datasættets globale[Kilder](#global-attributes)eller dets globale&lt;addAttributes&gt; &gt; &gt; &gt; SKAL inkludere denne egenskab.
    *   infoUrler vigtigt, fordi det giver kunderne mulighed for at finde ud af mere om dataene fra den oprindelige kilde.
    *   ERDDAP™viser et link til linketinfoUrlpå datasættets data Access-formular ( *datasetID* .html) , Make A Graph side ( *datasetID* .ografi) , og andre websider.
    * Hvis URL-adressen har en forespørgselsdel (efter "?") , det skal være allerede[procentkodet](https://en.wikipedia.org/wiki/Percent-encoding). Du skal indtaste særlige tegn i begrænsningerne (andre end den første '&' og den vigtigste'=', hvis nogen) i form af %HH, hvor HH er den 2 cifrede hexadecimal værdi af tegnet. Normalt skal du blot konvertere et par tegn på tegn: % i %25, og i %26, " i %22,&lt;i %3C, = i %3D, &gt; i %3E, + i %2B,|i %7C,\\[i %5B,\\]i %5D, plads til %20, og konvertere alle tegn over #127 i deres UTF-8 form og derefter encode hver af UTF-8-form ind i %HH-formatet (spørge en programmør til hjælp) .
For eksempel &stationID&gt; Bondage41004"
bliver og bliverstationID%3E=%1004%22
Percent kodning er generelt påkrævet, når du får adgangERDDAPvia software andet end en browser. Browserer håndterer normalt procent kodning for dig.
I nogle situationer, skal du procentkode alle tegn andre end A-Za-z0-9\\_-&#33;.~ '' () \\*, men stadig ikke encode den indledende '&' eller den vigtigste'='.
Programmering af sprog har værktøjer til at gøre dette (f.eks.Java's[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
og og ogJavascripts [encodeURIComponent()Særkegle ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) og der er
        [hjemmesider, der procent encode/decode for dig](https://www.url-encode-decode.com/).
    * Sidendatasets.xmler en XML-fil, du SKAL også &-encode ALL '&', "&lt;', og '&gt;' i URL'en som '&amp;', '&lt;" og "&gt;" efter procent kodning.
    *   infoUrler unikt forERDDAP. Det er ikke fra nogen metadata standard.
###### institution{#institution} 
*   [ **institution** ](#institution)  (fra fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og og og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) er en REQUIRED global egenskab med den korte version af navnet på den institution, der er kilden til disse data (normalt en akronym, normalt som regel&lt;20 tegn). For eksempel,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Enten datasættets globale[Kilder](#global-attributes)eller dets globale&lt;addAttributes&gt; &gt; &gt; &gt; SKAL inkludere denne egenskab.
    *   ERDDAP™viser institutionen, når det viser en liste over datasæt. Hvis en institutions navn her er længere end 20 tegn, vil kun de første 20 tegn være synlige på listen over datasæt (Men hele institutionen kan ses ved at sætte musemarkøren over det tilstødende "?" ikon) .
    * Hvis du tilføjer institution til listen over&lt;categoryAttributes&gt; &gt; &gt; &gt; i in in in inERDDAP's[opsætning.xml](/docs/server-admin/deploy-install#setupxml)fil, brugere kan nemt finde datasæt fra den samme institution viaERDDAP"Søg efter Datasets efter kategori" på startsiden.
###### nøgleord{#keywords} 
*   [ **nøgleord** ](#keywords)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er en RECOMMINGD kommuna-separatet liste over ord og korte sætninger (for eksempel,[GCMD Videnskabsord](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) der beskriver datasættet på en generel måde, og ikke at antage nogen anden viden om datasættet (for eksempel for oceanografiske data, omfatter havet) . For eksempel,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Sidendatasets.xmler et XML-dokument, tegn og,&lt;, og &gt; i en egenskab som søgeord (f.eks. &gt; tegn i GCMD science nøgleord) skal kodes som &amp;,&lt;, og &gt; henholdsvis.
Når et datasæt er indlæst iERDDAP,
    
    * "Earth Science &gt; " føjes til starten af ethvert GCMD-ord, der mangler det.
    * GCMD-ord er konverteret til Titel Case (dvs. de første bogstaver er kapitaliseret) .
    * Søgeordene er bagudrettede i sorteret rækkefølge og eventuelle nye linjer fjernes.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er en RECOMMMENTD attribut: hvis du følger en retningslinje for ordene/ordne i din søgeord attribut (f.eks. GCMD Science Søgeord) , sætte navnet på denne retningslinje her. For eksempel,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licenslicens{#license} 
*   [ **licenslicens** ](#license)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er en global attribut med licens- og/eller brugsbegrænsninger. For eksempel,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Hvis "\\[standard standard standard\\]" sker i attributværdien, vil den blive erstattet af standardenERDDAP™licens fra licensen&lt;standardLicense&gt; tag iERDDAP's
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)er fra den forældede[ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (som blev identificeret iMetadata\\_Conventionssom "UnidataDataset Discovery v1.0") metadata standard. attributværdien var en koma-separat liste over metadata konventioner, der anvendes af denne datasæt.
Hvis et datasæt bruger ACDD 1.0, er denne egenskab STRONGLY RECOMMINGD, f.eks.
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
Men men men men menERDDAP™anbefaler nu ACDD-1.3. Hvis du har[Tænd dine datasæt for at bruge ACDD-1.3](#switch-to-acdd-13), brug afMetadata\\_Conventionser STRONGLY DISCOURAGED: bare brug [&lt;Konventioner&gt;] (#konventioner) I stedet.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er en RECOMMINGD-tekstuel beskrivelse af behandlingen (for eksempel,[NASA satellitdatabehandling niveauer](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels), for eksempel Niveau 3) eller kvalitetskontrol niveau (f.eks. Science Quality) af data. For eksempel,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### projekt projekt projekt projekt projekt projekt projektprojekt{#project} 
*   [ **projekt projekt projekt projekt projekt projekt projektprojekt** ](#project)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er en OPTIONAL egenskab til at identificere det projekt, som datasættet er en del af. For eksempel,
    ```
    <att name="project">GTSPP</att>  
    ```
Hvis datasættet ikke er en del af et projekt, skal du ikke bruge denne egenskab. Sammenlignet med[creator\\_name](#creator_name), dette er fokuseret på projektet (ikke en person eller en organisation, som kan involveres i flere projekter) .
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) RECOMMMENTD’s måde at identificere den person, organisation eller projekt, der udgiver disse datasæt. For eksempel,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Du er f.eks. udgiveren, hvis en anden person eller gruppe[skabt](#creator_name)datasættet og du er bare ved at gemme dem viaERDDAP. Hvis "udgiver" ikke virkelig gælder for et datasæt, omit denne egenskab. Sammenlignet med[creator\\_name](#creator_name), forlaget sandsynligvis ikke signifikant modificerede eller ombehandlede dataene; udgiveren er bare at gøre de tilgængelige data på et nyt sted.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er RECOMMMENTD’s måde at identificere en e-mailadresse (korrekt formateret, for eksempel john\\_smith@great.org) der giver en måde at kontakte forlaget. For eksempel,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Hvis "udgiver" ikke virkelig gælder for et datasæt, omit denne egenskab.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er RECOMMMENTD’s måde at identificere en URL for den organisation, der offentliggjorde datasættet, eller en URL med udgiverens oplysninger om denne datasæt (men det er mere formålet med[infoUrl](#infourl)) . For eksempel,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Hvis "udgiver" ikke virkelig gælder for et datasæt, omit denne egenskab.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)er en global streng attribut (ikke fra nogen standard) angiver, om dette er et realtidsdatasæt. For eksempel,
    ```
    <att name="real\\_time">true</att>  
    ```
Hvis dette er falsk (Standard) ,ERDDAP™vil cache svar på anmodninger om filtyper, hvor hele filen skal oprettes førERDDAP™kan begynde at sende svar på brugeren og genbruge dem i op til omkring 15 minutter (fx,.nc.png) .
Hvis dette er indstillet til sand,ERDDAP™vil aldrig cache de svarfiler og vil altid returnere nyoprettede filer.
###### sourceUrlattribut{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)er en global egenskab med URL'en for kilden til dataene. For eksempel,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (men sæt det hele på én linje) 
    *   ERDDAP™Normalt skaber denne globale egenskab automatisk. To undtagelser er EDDTableFraHyraxFiler og EDDTableFraThreddsFiles.
    * Hvis kilden er lokale filer og filerne blev oprettet af din organisation, skal du bruge
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Hvis kilden er lokal database, og dataene blev oprettet af din organisation, skal du bruge
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrler vigtigt, fordi det giver kunderne mulighed for at backtrack til den oprindelige kilde af dataene.
    *   sourceUrler unikt forERDDAP. Det er ikke fra nogen metadata standard.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (fra fra[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) er en RECOMMMENTD egenskab at identificere navnet på det kontrollerede ordforråd, hvorfra variabel[standard\\_name](#standard_name)s tages. For eksempel,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
for version 77 af te[CF standard navnebord](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (for EDDTable datasæt kun) er en global attribut, der giver dig mulighed for at angive en komma-separat liste over [&lt;dataVariable&gt;] (#datavariable)  [destinationName](#destinationname)s til at identificere variabler, der har et begrænset antal værdier (angivet en anden måde: variabler, som hver af værdierne har mange dubler) . For eksempel,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Hvis denne egenskab er til stede, vil datasættet have en *datasetID* .subset webside (og et link til det på alle datasæt liste) som lader brugerne hurtigt og nemt vælge forskellige undersæt af dataene.
    * Hver gang et datasæt er indlæst,ERDDAPMasser og butikker på disken et bord med alle de forskellige () kombinationer af subset Variabels variable værdier.ERDDAP™kan læse, atsubsetVariablestabel og proces det meget hurtigt (især sammenlignet med at læse masser af datafiler eller få data fra en database eller anden ekstern tjeneste) .
    * Det giverERDDAP™at gøre 3 ting:
        1. Det giver mulighedERDDAP™Opret en liste over mulige værdier på en dropdown-liste på Data Access Form, Make A Graph-websiden og .subset-sider.
        2. Det giver mulighedERDDAP™at tilbyde en .subset hjemmeside til den datasæt. Denne side er interessant, fordi det gør det nemt at finde gyldige kombinationer af værdierne af disse variabler, som for nogle datasæt og nogle variabler er meget, meget hårde (næsten umuligt) . Derefter beder alle brugeren om særskilt () subset Variabel data vil være meget hurtigt.
        3. Hvis der er en brugerkonto, der kun henviser til et undersæt af disse variabler,ERDDAP™Kan hurtigt læsesubsetVariablesbord og svare på anmodning. Det kan spare en ton tid og bestræbe sig påERDDAP.
    * Ordren af ordrendestinationNames du angiver bestemmer sorteringsrækkefølgen på *datasetID* .subset-side, så du normalt vil angive de vigtigste variable først, så den mindst vigtige. For f.eks. datasæt med tidsseriedata til flere stationer, kan du bruge f.eks.
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
så værdierne sorteres efter station\\_id.
    * Det er naturligvis dit valg, som variabler skal inkludere i detsubsetVariablesliste, men den foreslåede brug er:
        
Generelt omfatter variabler, som du ønskerERDDAP™for at vise en rulleliste af muligheder på datasættets data Access-formular (.html) og Make-A-Graph (.ografi) websider.
        
Generelt omfatter variabler med oplysninger om datasættets funktioner (stationer, profiler og/eller trajectories, især fra[CDm\\_timeseries\\_variables](#cdm_timeseries_variables),[CDm\\_profile\\_variables](#cdm_profile_variables),[CDm\\_trajectory\\_variables](#cdm_trajectory_variables)) . Der er kun et par forskellige værdier for disse variabler, så de fungerer godt med rullelister.
        
Indeholder ikke nogen datavariabler, der er forbundet med individuelle observationer (f.eks. tid, temperatur, salinitet, aktuel hastighed) i områdetsubsetVariablesliste. Der er for mange forskellige værdier for disse variabler, så en rulleliste ville være langsom til at indlæse og være svært at arbejde med (eller ikke arbejde) .
        
    * Hvis antallet af forskellige kombinationer af disse variabler er større end ca. 1.000.000, bør du overveje at begrænse antallet afsubsetVariablesat du angiver for at reducere antallet af forskellige kombinationer til under 1.000.000; ellers *datasetID* .subset websider kan genereres langsomt. I ekstreme tilfælde kan datasættet ikke indlæses iERDDAP™fordi at generere listen over forskellige kombinationer bruger for meget hukommelse. Hvis det er tilfældet, skal du fjerne nogle variabler frasubsetVariablesliste.
    * Hvis antallet af forskellige værdier af en subset variabel er større end omkring 20.000, bør du overveje ikke herunder den variable på listen oversubsetVariables; ellers, det tager lang tid at transmittere *datasetID* .subset, *datasetID* .graph, og *datasetID* .html websider. Også på en Mac, er det meget svært at foretage valg fra en drop down liste med mere end 500 elementer på grund af manglen på en rullebar. Et kompromis er: fjerne variabler fra listen, når brugerne ikke sandsynligvis vil vælge værdier fra en drop down liste.
    * Du skal teste hver datasæt for at se, om densubsetVariablesindstilling er okay. Hvis kildedataserveren er langsom, og det tager for lang tid (eller fejl) at downloade dataene, enten reducere antallet af variabler, der er angivet eller fjerne densubsetVariablesglobal egenskab.
    * Subset Varer er meget nyttige. Så hvis dit datasæt er egnet, skal du oprette ensubsetVariablesattribut.
    * EDDTableFraSOStilføjer automatisk
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
når datasættet oprettes.
        * Mulig advarsel: hvis en bruger bruger bruger *datasetID* .subset webside vælger en værdi, der har en vognReturn eller ny linje karakter, *datasetID* .subset vil mislykkes.ERDDAP™kan ikke arbejde omkring dette problem på grund af nogle HTML-detaljer. I alle tilfælde er det næsten altid en god ide at fjerne vognReturn og nye linjer fra dataene. For at hjælpe dig med at løse problemet, hvis EDDTable.subsetVariablesDataTable metode iERDDAPregistrerer dataværdier, der vil forårsage problemer, vil den e-maile en advarsel med en liste over at fornærme værdier til e-mailen Alt alt Til e-mailadresser angivet i opsætning.xml. På den måde ved du, hvad der skal løses.
        *    **Præ-genererede undersæt tabeller.** Normalt, nårERDDAP™indlæser et datasæt, det anmoder om de forskellige () Undersæt variable datatabellen fra datakilden, bare via en normal dataforespørgsel. I nogle tilfælde er disse data ikke tilgængelige fra datakilden eller hentningen fra datakilden måske svært på datakildeserveren. Hvis det er tilfældet, kan du levere en tabel med oplysningerne i en.jsoneller .csv fil med navnet *Tomcat* / Indhold / indhold / *datasetID* .json  (eller .csv) . Hvis til stede,ERDDAP™Læs den, når datasættet er indlæst, og brug den som kilden til subset data.
            * Hvis der er en fejl, mens du læser det, vil datasættet ikke indlæse.
            * Det skal have nøjagtige samme kolonnenavne (for eksempel samme sag) som&lt;subsetVariables&gt;, men kolonnerne kan være i enhver rækkefølge.
            * Det kan have ekstra kolonner (de vil blive fjernet, og nyligt røde rækker vil blive fjernet) .
            * Manglende værdier skal mangle værdier (ikke falske numre som -99) .
            *   .jsonfiler kan være lidt sværere at oprette, men håndtere Unicode tegn godt..jsonfiler er nemme at oprette, hvis du opretter dem medERDDAP.
            * .csv filer er nemme at arbejde med, men egnet til ISO 8859-1 tegn kun. .csv-filer SKAL have kolonnenavne på den første række og data på efterfølgende rækker.
        * Til store datasæt eller når&lt;subsetVariables&gt; er forkert konfigureret, tabellen af kombinationer af værdier kan være stor nok til at forårsage Too Much Data eller OutOfMemory fejl. Løsningen er at fjerne variabler fra listen over&lt;subsetVariables&gt; for hvilke der er et stort antal værdier eller fjerne variabler efter behov, indtil størrelsen af tabellen er rimelig. Uanset fejlen, dele afERDDAP™der bruger densubsetVariablessystem fungerer ikke godt (f.eks., websider indlæse meget langsomt) når der er for mange rækker (f.eks. mere end en million millioner) i tabellen.
        *   subsetVariableshar intet at gøre med at angive, hvilke variable brugere kan bruge i begrænsninger, dvs. hvordan brugerne kan anmode om delsæt af datasættet.ERDDAP™Tillad altid begrænsninger for at henvise til nogen af variablerne.
###### Tidsenheder{#time-units} 
[Tid og tidsstempel](#time-units)kolonner skal have ISO 8601:2004 (E) formateret dato+tid Z strenge (f.eks. 1985-01-31T15:31:00Z) .
             
###### oversigt over oversigt{#summary} 
*   [ **oversigt over oversigt** ](#summary)  (fra fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og og og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) er en REQUIRED global egenskab med en lang beskrivelse af datasættet (normalt)&lt;500 tegn). For eksempel,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Enten datasættets globale[Kilder](#global-attributes)eller dets globale&lt;addAttributes&gt; &gt; &gt; &gt; SKAL inkludere denne egenskab.
    * Resumé er meget vigtigt, fordi det giver kunderne mulighed for at læse en beskrivelse af det datasæt, der har mere information end titlen og dermed hurtigt forstå, hvad datasættet er.
    * Rådgivning: Skriv opsummeringen, så det ville arbejde for at beskrive datasættet til en tilfældig person, du møder på gaden eller til en kollega. Husk at inkludere[Fem W's og en H](https://en.wikipedia.org/wiki/Five_Ws): Hvem har oprettet datasættet? Hvilke oplysninger blev indsamlet? Hvornår blev de indsamlede data? Hvor blev det indsamlet? Hvorfor blev det indsamlet? Hvordan blev det indsamlet?
    *   ERDDAP™viser oversigten på datasættets data Access-formular ( *datasetID* .html) , Make A Graph side ( *datasetID* .ografi) , og andre websider.ERDDAP™Brug oversigten, når du opretter FGDC og ISO 19115-dokumenter.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (Et valgfritERDDAP-specifik global metadata egenskab, ikke fra enhver standard) Angiver i en simplistisk måde, når dataene til et nærtstående datasæt betragtes som forældet, angivet somnow- *nUnits* f.eks.now-2 dage for data, der normalt vises 24-48 timer efter tidsværdien. Brug nu **+ + + +**  *nUnits* , for eksempel nu +6 dage for prognoser data, der er mest, 8 dage i fremtiden. (Se billederne[now- *nUnits* Syntaksens beskrivelse](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) Hvis den maksimale tidsværdi for datasættet er mere nylig end den angivne tid, betragtes datasættet. Hvis den maksimale tidsværdi er ældre end det angivne tidspunkt, betragtes datasættet op til dato. For forældede datasæt, er der formodentlig et problem med datakilden, såERDDAP™er ikke i stand til at få adgang til data fra nyere tid point.
    
The The The The The The ThetestOutOfDateværdi vises som en kolonne i kolonnen[allDatasetsDatasæt](#eddtablefromalldatasets)i din indbakkeERDDAP. Det bruges også til at beregne udOfDate-indekset, som er en anden kolonne i kolonnenallDatasetsDatasæt.
Hvis indekset er&lt;1, datasættet betragtes som opdateret.
Hvis indekset er&lt; = betragtes datasættet som forældet.
Hvis indekset er&lt;=2, datasættet betragtes meget forældet.
    
The The The The The The ThetestOutOfDateværdi bruges også afERDDAP™at generere https://*yourDomain*/erddap/outOfDateDatasets.html webside ([eksempel](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) som viser de datasæt, der har&lt;testOutOfDate&gt; tags, med datasæt rangeret efter, hvordan de er. Hvis du ændrer filtypen (fra .html til .csv,.jsonlCSV,.nc,.tsv...) , kan du få disse oplysninger i forskellige filformater.
    
Hvornår muligt,[GenererDatasetsXml](#generatedatasetsxml)tilføjer entestOutOfDateattribut til den globaleaddAttributesaf et datasæt. Denne værdi er et forslag baseret på de tilgængelige oplysninger til GenererDatasetsXml. Hvis værdien ikke er passende, skal du ændre den.
    
"Out-of-date" her er meget forskellig fra [&lt;reload Alle rettigheder&gt;] (#loadeveryn minutter) , der beskæftiger sig med hvordan up-to-dateERDDAP's viden om datasættet er. The The The The The The The&lt;testOutOfDate&gt; systemet antager, atERDDAP's viden om datasættet er up-to-date. Spørgsmålet&lt;testOutOfDate&gt; tilbud med er: ser der ud til at være noget forkert med kilden til dataene, hvilket forårsager flere seneste data ikke er tilgængelige afERDDAP?
    
###### titeltitel titel{#title} 
*   [ **titeltitel titel** ](#title)  (fra fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og og og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) er en REQUIRED global egenskab med kort beskrivelse af datasættet (normalt)&lt;=95 tegn). For eksempel,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Enten datasættets globale[Kilder](#global-attributes)eller dets globale&lt;addAttributes&gt; &gt; &gt; &gt; SKAL inkludere denne egenskab.
    * Title er vigtig, fordi hver liste af datasæt præsenteret afERDDAP  (andre end søgeresultater) lister datasæt i alfabetisk rækkefølge ved titel. Så hvis du vil angive rækkefølgen af datasæt, eller har nogle datasæt grupperet sammen, skal du oprette titler med det i tankerne. Mange lister over datasæt (f.eks. i svar på en kategori søgning) , vise et undersæt af den fulde liste og i en anden rækkefølge. Så titlen for hvert datasæt skal stå på egen hånd.
    * Hvis titlen indeholder ordet "DEPRECATED" (alle kapitalbreve) , så vil datasættet få en lavere rangposition i søgninger.
             
##### &lt;axisVariable&gt;{#axisvariable} 
* [ [] ** &lt;axisVariable&gt; &gt; &gt; &gt; ** Særkegle (#aksevariable) bruges til at beskrive en dimension (også kaldet "akse") .
For For For For ForEDDGridDatasæt, en eller flereaxisVariabletags er REQUIRED, og alle[dataVariables s s](#datavariable)Del altid/brug alle aksevariabler. ([Hvorfor?](#why-just-two-basic-data-structures) [Hvad hvis de ikke er?](#dimensions))   
Der skal være en akse variabel for hver dimension af datavariablerne.
Axis variabler skal specificeres i den rækkefølge, at datavariablerne bruger dem.
(EDDTable datasæt kan IKKE bruge&lt;axisVariable&gt; tags.)
Et kødet ud eksempel er:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; understøtter følgende undertags:
###### &lt;sourceName\\&gt;{#sourcename} 
* [ []&lt;sourceName\\&gt;] (#sourcenavn) -- datakildens navn for variablen. Dette er det navn, derERDDAP™vil bruge, når du anmoder om data fra datakilden. Dette er det navn, derERDDAP™vil se, hvornår data returneres fra datakilden. Dette er tilfældet følsom. Dette er REQUIRED.
###### &lt;destinationName\\&gt;{#destinationname} 
* [ []&lt;destinationName\\&gt;] (# destinationnavn) er navnet på den variable, der vil blive vist til og bruges afERDDAP™Brugere.
    * Dette er OPTIONAL. Hvis fraværende,sourceNamebruges.
    * Dette er nyttigt, fordi det giver dig mulighed for at ændre en kryptisk eller mærkeligsourceName.
    *   destinationNameer tilfældet følsom.
    *   destinationNames SKAL begynde med et bogstav (A-Z, a-z) og SKAL følges af 0 eller flere tegn (A-Z, a-z, 0-9 og \\_) . ('-' blev tilladt førERDDAP™version 1.10.) Denne begrænsning tillader aksevariable navne at være den samme iERDDAP™, i responsfiler, og i alle de software, hvor disse filer vil blive brugt, herunder programmeringssprog (kan lidePython,Matlab, ogJavaScript) hvor der er lignende restriktioner på variable navne.
    * I nærheden af In In In In In In In In In In In In In InEDDGridDatasæt, datasæt[længde, bredde, højde, dybde og tid](#destinationname)aksevariabler er specielle.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [ []&lt;addAttributes&gt;] (#variable-addattributes) definerer et OPTIONAL-sæt af attributter ( *navn* = = = = = *værdiværdiværdiværdi* ) som føjes til kildens attributter til en variabel, for at gøre de kombinerede attributter for en variabel.
Hvis variablen[Kilder](#variable-addattributes)eller eller eller&lt;addAttributes&gt; inkludere[scale\\_factorog/elleradd\\_offset](#scale_factor)attributter, deres værdier vil blive brugt til at pakke dataene fra kilden før distribution til klienten
     (resultatresultat resultatresultat Værdi = kilde Værdi \\*scale\\_factor+ + + +add\\_offset) . Den ubepakkede variabel vil være af samme datatype (f.eks. flyder) som detscale\\_factorog og ogadd\\_offsetværdier.
         
##### &lt;dataVariable&gt;{#datavariable} 
* [ [] ** &lt;dataVariable&gt; &gt; &gt; &gt; ** Særkegle (#datavariable) er en REQUIRED (for næsten alle datasæt) tag indenfor&lt;Dataset&gt; tag, som bruges til at beskrive en datavariabel. Der skal være 1 eller flere tilfælde af dette tag. Et kødet eksempel er:

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

&lt;dataVariable&gt; understøtter følgende undertags:
###### &lt;sourceName&gt;{#sourcename-1} 
* [ []&lt;sourceName&gt;] (#sourcenavn) -- datakildens navn for variablen. Dette er det navn, derERDDAP™vil bruge, når du anmoder om data fra datakilden. Dette er det navn, derERDDAP™vil se, hvornår data returneres fra datakilden. Dette er tilfældet følsom. Dette er REQUIRED.
###### Gruppegrupper{#groups} 
CF tilføjede støtte til grupper med CF v1.8. Begyndende i ~2020,NetCDFværktøjer til at sætte variabler i grupper i en.ncfil. I praksis betyder det bare, at variablerne har et langt navn, der identificerer gruppen (s s s) og det variable navn, f.eks. gruppe1a/group2c/varName ).ERDDAP™understøtter grupper ved at konvertere "/"'s i variablens&lt;sourceName&gt; ind i "\\_"'s i variablens&lt;destinationName&gt; f.eks. gruppe1a\\_group2c\\_varName . (Når du ser det, bør du indse, at grupper ikke er meget mere end en syntakskonvention.) Når variablerne er angivet iERDDAP™, alle variable i en gruppe vises sammen, efterligne den underliggende gruppe.\\[HvisERDDAP™, især GenererDatasets Xml, udfører ikke samt det kunne med kildefiler, der har grupper, bedes du sende en prøvefil til Chris. John på noaa.gov .\\]

EDDTableFraFiles datasæt kan bruge nogle specielt kodet, pseudosourceNames til at definere nye datavariabler, f.eks. for at fremme en global egenskab for at være en datavariabel. Se endnu[denne dokumentation](#pseudo-sourcenames).
###### HDFStrukturer{#hdf-structures} 
Begyndende medERDDAP™v2.12,EDDGridFraNcFiles ogEDDGridFraNcFiles Upakket kan læse data fra "strukturer" i.nc4 og 4.hdf4 filer. At identificere en variabel, der er fra en struktur, den&lt;sourceName&gt; &gt; &gt; &gt; skal bruge formatet: *FuldStructureName* | *Medlemsnavn* , for eksempel gruppe1/myStruct|Mit medlem.

###### Fast værdi Kildenavne{#fixed-value-sourcenames} 
I et EDDTable datasæt, hvis du vil oprette en variabel (med en enkelt, fast værdi) det er ikke i kildedatasættet, brug:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Det oprindelige tegn fortællerERDDAP™at en fast Værdi vil følge.

* For numeriske variabler skal den faste værdi være en enkelt begrænset værdi eller NaN (\\=NaN) .
* For strenge variabler skal den faste værdi være enkelt,[JSON-stilstreng](https://www.json.org/json-en.html)  (med særlige tegn flygtet med "tegn) , f.eks. \\Face «"Særlige "" String" .
* Angiv den faste værdi som et tal i en timetamp variabel."seconds since 1970-01-01T00:00:00Z"og brug
Enhederne = sekunder siden 1970-01T00:00:00Z.
    
De andre tags til de&lt;dataVariable&gt; arbejde som om dette var en regelmæssig variabel.
For eksempel at skabe en variabel kaldet højde med en fast værdi på 0,05 (flyder) Brug:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Til usædvanlige situationer, kan du endda angive enactual\\_rangeaddAttribute, som vil tilsidesætte de forventede værdier af destinationMin og destinationMax (som ellers ville svare på den faste Værdiværdi) .
 
###### Script SourceNames / udledte variabler{#script-sourcenamesderived-variables} 
Begyndende medERDDAP™v2.10, i en[EDDTableFraFiles](#eddtablefromfiles),[EDDTableFraDatabase](#eddtablefromdatabase)eller[EDDTableFraFileNames](#eddtablefromfilenames)datasæt, datasættet&lt;sourceName&gt; kan være
et udtryk (en ligning, der evaluerer til en enkelt værdi) , ved hjælp af formatet
```
    <sourceName>=*expression*</sourceName>  
```
eller et script (en række udsagn, der returnerer en enkelt værdi) , ved hjælp af formatet
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™afhænger af[Apache projekt's](https://www.apache.org/) [JavaForretningssprog (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licens:[Apache Apache](https://www.apache.org/licenses/LICENSE-2.0)) for at evaluere udtryk og køre scripts.
Beregningen for en given ny variabel sker inden for en række af resultaterne, gentagne gange for alle rækker.
Udtrykkene og scripts bruger enJava- ogJavaScript-lignende syntaks og kan bruge nogen af
[operatører og metoder, der er bygget i JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).
scriptsne kan også bruge metoder (funktioner) fra disse klasser:
*   [Kalender2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), som er en wrapper for nogle af de statiske, tids- og kalenderrelaterede metoder i com.cohort.util.Calendar2 ([licenslicens](/acknowledgements#cohort-software)) . For eksempel,
Kalender2.parseToEpochSeconds ( *kildetid, dato TimeFormat* ) vil parse kilden Tidsstreng via datoTimeFormat streng og returnere en"seconds since 1970-01-01T00:00:00Z"  (I nærheden af epochSeconds) dobbelt værdi.
*   [Matematik](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), som er en indpakning for næsten alle de statiske, matematiske metoder i[java.lang. Matematik](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). For eksempel Math.atan2 ( *y, x* ) tager i rektangulære koordinater (y, x) og returnere polarkoordinater (en vifte af doubler med\\[r, theta\\]) .
*   [Math2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), som er en wrapper for næsten alle de statiske, matematiske metoder i com.cohort.util. Math2 ([licenslicens](/acknowledgements#cohort-software)) . For eksempel,
Math2.roundTo ( *d, nPlaces* ) vil runde d til det angivne antal cifre til højre for decimalpunktet.
* String, som giver dig adgang til alle de statiske, strenge-relaterede metoder i[java.lang. streng streng streng](https://docs.oracle.com/javase/8/docs/api/java/lang/String). Strenge objekter iERDDAP™udtryk og scripts kan bruge nogen af deres tilknyttedeJavametoder, som beskrevet i java.lang. Streng dokumentation. For eksempel String.valueOf (d) vil konvertere den dobbelte værdi d til en streng (selvom du kan også bruge ""+d) .
*   [Streng2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), som er en wrapper for de fleste af de statiske, strenge- og array-relaterede metoder i com.cohort.util.String2 ([licenslicens](/acknowledgements#cohort-software)) . For eksempel String2.zI nærheden af eroPad ( *nummer, nDigits* ) vil tilføje 0'er til venstre for nummeret String, så det samlede antal cifre er nDigits (f.eks. String2.zI nærheden af eroPad ("6", 2) vil vende tilbage "06") .
*   [Rækkerækkerækkerækkerækkerække](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), som har ikke-statiske metoder til at få adgang til dataene fra de forskellige kolonner i den aktuelle række af kildedatatabellen. For eksempel ro.columnString ("år") Læser værdien fra kolonnen "år" som en streng, der henviser til, at ro.column Indsats ("år") Læser værdien fra kolonnen "år" som et tal.

Af sikkerhedsmæssige årsager kan udtryk og scripts ikke bruge andre klasser end dem 6.ERDDAP™håndhæver denne begrænsning ved at oprette en standard blacklist (som blacklists alle klasser) og derefter en hvidlist (som specifikt giver de 6 klasser beskrevet ovenfor) . Hvis du har brug for andre metoder og/eller andre klasser for at gøre dit arbejde, bedes du sende dine anmodninger til Chris. John på noaa.gov .
    
###### Effektivitetseffektivitet
For EDDTableFraFiles datasets, er der kun en meget, meget minimal (sandsynligvis ikke mærkbar) nedsættelse for anmodninger om data fra disse variabler. For EDDTableFraDatabase, er der stor hastighedsstraf for anmodninger, der omfatter begrænsninger på disse variabler (f.eks. (&longitude0360&gt;30&longitude036060&lt;40) fordi begrænsningerne ikke kan overføres til databasen, så databasen skal returnere meget mere data tilERDDAP™  (hvilket er meget tidskrævende) så detERDDAP™kan oprette den nye variabel og anvende begrænsningen. For at undgå det værste tilfælde (hvor der ikke overføres begrænsninger til databasen) ,ERDDAP™Løser en fejlmeddelelse, så databasen ikke behøver at returnere hele tabellens indhold. (Hvis du vil omgå dette, skal du tilføje en begrænsning på en ikke-script kolonne, der altid vil være sandt, f.eks. &time&lt;3000-01.) Af denne grund, med EDDTableFraDatabase, er det sandsynligvis altid bedre at oprette en afledt kolonne i databasen snarere end brugsourceName=script iERDDAP.

###### Oversigt over hvordan en Expression (Eller scripts) Brugt:
Som svar på en brugers anmodning om tabulære data,ERDDAP™Få data fra en række kildefiler. Hver kildefil vil generere en tabel af rå (lige fra kilden) data.ERDDAP™vil derefter gå gennem tabellen af rå data, række ved række og evaluere udtrykket eller script en gang for hver række, for at oprette en ny kolonne, der har det udtryk eller script som ensourceName.
    
###### GenererDatasetsXml
Bemærk, at GenererDatasets Xml er helt uvidende, når der er behov for at skabe en variabel med&lt;sourceName&gt;= *udtryks udtryk* &lt;/ / / /sourceName&gt;. Du skal oprette variablen idatasets.xmlhånd.

###### Ekspresning eksempler:
Her er nogle komplette eksempler på datavariabler, der bruger et udtryk for at oprette en ny kolonne af data. Vi forventer, at disse eksempler (og varianter af dem) vil dække ca. 95% af brugen af alle udtryksourceNames.

###### Kombination af separat "dato" og"time"kolonner i en samlet tidskolonne:
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
Det, atsourceNameudtryk gør et nyt"time"kolonne ved at angive strengeværdierne fra "dato" (yyyy-MM-dd) og og og"time"  (HH:mm:ss) kolonner på hver række af kildefilen, og ved at konvertere denne streng til en"seconds since 1970-01-01"  (I nærheden af epochSeconds) dobbelt værdi.

Eller selvfølgelig skal du tilpasse tidsformatstrengen til at håndtere det specifikke format i hvert datasæts kildedato og timekolonner, se tidskolonnen
[Tidsenheder dokumentation](#string-time-units).

Teknisk set behøver du ikke at bruge Kalender2.parseToEpochSeconds () at konvertere den kombinerede dato+tid til epochSeconds. Du kunne bare passere datoen+time String tilERDDAP™og angive formatet (f.eks.,
yyyy-MM-dd'T'HH:mm:s'Z') via attributten enheder. Men der er betydelige fordele for at konvertere til epochSeconds - især EDDTableFraFiles kan derefter nemt holde styr på antallet af tidsværdier i hver fil og så hurtigt beslutte, om du vil se i en given fil, når du reagerer på en anmodning, der har tidsbegrænsninger.

Et problem er behovet for at oprette en samlet dato+time kolonne fra en kilde med separat år, måned, dato, time, minut, sekund. Løsningen er meget lignende, men du vil ofte nødt til at nul-pad mange af felterne, så for eksempel måned (1 - 12) og dato (1 - 31) altid har 2 cifre. Her er et eksempel med år, måned, dato:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Et problem er behovet for at oprette en samlet breddegrad eller længdekolonne ved at kombinere dataene i kildetabellens separate grader, minutter og sekunder kolonner, hver gemt som integers. For eksempel,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Konvertering af en kolonne ved navn "lon" med længdeværdier fra 0 - 360° i en kolonne ved navn "langitude" med værdier fra -180 - 180°
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
Det, atsourceNameudtryk gør en ny "langitude" kolonne ved at konvertere dobbeltværdien fra kolonnen "lon" på hver række af kildefilen (formodentlig med 0 - 360 værdier) , og ved at konvertere det til en -180 til 180 dobbelt værdi.

Hvis du i stedet ønsker at konvertere kildelængdeværdier -180 - 180° i 0 - 360°, brug
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Naming af to længdevariabler:
Hvis datasættet vil have 2 længdevariabler, anbefaler vi at brugedestinationName= længde for -180 - 180° variabel ogdestinationName= længde0360 (og langnavn = "Langitude 0-360°") for 0 - 360° variabel. Dette er vigtigt, fordi brugerne undertiden bruger Advanced Search til at søge efter data inden for en bestemt længdeområde. Denne søgning vil arbejde bedre, hvis længde konsekvent har -180 - 180° værdier for alle datasæt. Datasets geospatial\\_lon\\_min, geospatial\\_lon\\_max, Westernmost\\_Easting and Easternmost\\_Eastings globale attributter vil derefter blive sat på en konsekvent måde (med længdeværdier -180 til 180°) ;
    
###### Konvertering af en kolonne ved navn "tempF" med temperaturværdier i grad\\_ F i en kolonne ved navn "tempC" med temperaturer i grad\\_ C:
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
Det, atsourceNameUdtrykket gør en ny "tempC" kolonne ved at konvertere den flydende grad\\_ Fværdi fra kolonnen "tempF" på hver række af kildefilen i en flyt grad\\_ C værdi.

Bemærk, at dit datasæt kan have både den oprindelige frist F variabel og den nye temp C variabel ved at have en anden variabel med
```
    <sourceName>tempF</sourceName>
```
###### Konvertering af vind "hastighed" og "direction" kolonner til to kolonner med u,v komponenter
* For at gøre en u variabel, brug
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* For at gøre en v variabel, brug
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Eller givet u,v:
* For at gøre en hastighedsvariabel, brug
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* For at gøre en retning variabel, brug
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Script Eksempel:
Her er et eksempel på at bruge et script, ikke bare et udtryk, som etsourceName. Vi forventer, at scripts, i modsætning til udtryk, ikke bliver nødvendig ofte. I dette tilfælde er målet at returnere en manglende værdi (-99) for temperaturværdier uden for et bestemt område. Bemærk, at scriptet er den del efter "Følg".
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
Hvis du ændrer udtrykket eller script, der er defineret i etsourceName, du skal angive et[hård flag](/docs/server-admin/additional-information#hard-flag)for datasættet så dataeneERDDAP™sletter alle de cachelagrede oplysninger til datasættet og genlæsser hver datafil (ved hjælp af det nye udtryk eller script) den næste gang indlæses datasættet. Alternativt kan du bruge[Billeder af DasDds](#dasdds)som svarer til at indstille et hård flag.

###### Percent Encode
Dette er kun sjældent relevant: Fordi udtryk og scripts er skrevet idatasets.xml, som er et XML-dokument, skal du procentkode alle&lt;, \\&gt; og & tegn i udtryk og scripts som&lt;, &gt; og &amp; .

###### Almindelige problemer
Et fælles problem er, at du opretter en variabel medsourceName= = = = = *udtryks udtryk* Men den resulterende kolonne af data har bare manglende værdier. Alternativt har nogle rækker af den nye kolonne manglende værdier, og du tror, at de ikke bør. Det underliggende problem er, at noget er forkert med udtrykket ogERDDAPkonverterer denne fejl til en manglende værdi. At løse problemet,

* Kig på udtrykket for at se, hvad problemet kan være.
* Kig ind i[log.txt](/docs/server-admin/additional-information#log), som vil vise den første fejlmeddelelse genereret under oprettelse af hver ny kolonne.

Almindelige årsager er:

* Du brugte det forkerte tilfælde. Ekspresioner og scripts er tilfælde følsomme.
* Du udeladede navnet på klassen. Du skal f.eks. bruge Math.abs () , ikke bare abs () .
* Du gjorde ikke typekonverteringer. Hvis en parameterværdis datatype f.eks. er String, og du har en dobbelt værdi, skal du konvertere en dobbelt til en streng via ""+d.
* kolonnenavnet i udtrykket svarer ikke nøjagtigt til kolonnenavnet i filen (eller navnet kan være anderledes i nogle filer) .
* Der er en syntaksfejl i udtrykket (f.eks. manglende eller ekstra ') ").

Hvis du sidder fast eller skal bruge hjælp,
Kontakt venligst detaljerne og se vores[sektion om at få ekstra støtte](/docs/intro#support).
        
###### &lt;destinationName&gt;{#destinationname-1} 
* [ []&lt;destinationName&gt;] (# destinationnavn) -- navnet på den variable, der vil blive vist og bruges afERDDAP™Brugere.
    * Dette er OPTIONAL. Hvis fraværende,[sourceName](#sourcename)bruges.
    * Dette er nyttigt, fordi det giver dig mulighed for at ændre en kryptisk eller mærkeligsourceName.
    *   destinationNameer tilfældet følsom.
    *   destinationNames SKAL begynde med et bogstav (A-Z, a-z) og SKAL følges af 0 eller flere tegn (A-Z, a-z, 0-9 og \\_) . ('-' blev tilladt førERDDAP™version 1.10.) Denne begrænsning gør det muligt for datavariable navne at være den samme iERDDAP™, i responsfiler, og i alle de software, hvor disse filer vil blive brugt, herunder programmeringssprog (kan lidePython,Matlab, ogJavaScript) hvor der er lignende restriktioner på variable navne.
    * I EDDTable datasæt,[længde, bredde, højde (eller dybde) , og tid](#destinationname)datavariabler er specielle.
             
###### &lt;Datadata Type&gt;{#datatype} 
* [ []&lt;DataType&gt;] (#datatype) - Angiv den datatype, der kommer fra kilden. (I nogle tilfælde, f.eks. ved læsning af data fra ASCII-filer, angiver det, hvordan de data, der kommer fra kilden, skal gemmes.) 
    * Dette er REQUIRED af nogle datasæt typer og IGNORED af andre. Datasæt typer, der kræver dette for deresdataVariables er:EDDGridFra EvelynFiles, EDDTableFraXxxFiles, EDDTableFraMWFS, EDDTableFraNOS, EDDTableFraSOS. Andre datasæt typer ignorerer dette tag, fordi de får oplysningerne fra kilden.
         
    * Gyldige værdier er en af standarden[ERDDAP™Datatyper](#data-types)plus boolean (se nedenfor) . DataType navnene er tilfældefølsomme.
         
###### Billeder af boolean{#boolean-data} 
*   ["boolean"](#boolean-data)er en særlig sag.
    * Indvendigt,ERDDAP™understøtter ikke en boolean type, fordi booleans ikke kan gemme manglende værdier og de fleste filtyper ikke understøtter booleans. Også,DAPunderstøtter ikke booleans, så der ikke ville være nogen standard måde at forespørge boolean variabler.
    * Angive "boolean" for data Type idatasets.xmlvil forårsage boolean værdier, der skal gemmes og repræsenteres som bytes: 0=false, gaffeltruck, 127=missing\\_value.
    * Brugere kan angive begrænsninger ved at bruge de numeriske værdier (for eksempel "isAlive =") .
    *   ERDDAP™Administratorer skal undertiden bruge "boolean" data Type idatasets.xmlat fortælleERDDAP™hvordan man interagerer med datakilden (f.eks. at læse boolean værdier fra en relationsdatabase og konvertere dem til 0, 1 eller 127) .
         
* Hvis du vil ændre en datavariable fra datatypen i kildefiler (for eksempel kort) i nogle andre data Type i datasættet (f.eks. int) , ikke brug&lt;DataType&gt; for at angive, hvad du ønsker. (Det virker til nogle typer af datasæt, men ikke andre.) I stedet:
    * Brug&lt;DataType&gt; for at angive, hvad der er i filerne (for eksempel kort) .
    * In te In te In te In te&lt;addAttributes&gt; til variablen, tilføj en[scale\\_factor](#scale_factor)attribut med de nye data Type Type Type Type (f.eks. int) og en værdi på 1, f.eks.
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [ []&lt;addAttributes&gt;] (#variable-addattributes) - definerer et sæt attributter ( *navn* = = = = = *værdiværdiværdiværdi* ) som føjes til kildens attributter til en variabel, for at gøre de kombinerede attributter for en variabel. Dette er OPTIONAL.
Hvis variablen[Kilder](#variable-addattributes)eller eller eller&lt;addAttributes&gt; inkludere[scale\\_factorog/elleradd\\_offset](#scale_factor)attributter, deres værdier vil blive brugt til at pakke dataene fra kilden før distribution til klienten. Den ubepakkede variabel vil være af samme datatype (f.eks. flyder) som detscale\\_factorog og ogadd\\_offsetværdier.
        
###### Variabel variabel&lt;addAttributes&gt; {#variable-addattributes} 
* [ [] ** Varer / Varer&lt;addAttributes&gt; &gt; &gt; &gt; ** Særkegle (#variable-addattributes) --&lt;addAttributes&gt; er et OPTIONAL-tag i et&lt;axisVariable&gt; eller&lt;dataVariable&gt; tag, som bruges til at ændre variablens attributter.
    
    *    ** Brug en variabels&lt;addAttributes&gt; for at ændre variablens attributter. ** ERDDAP™kombinerer en variabels attributter fra datasættets kilde (** Kilder **) og variablens** addAttributes **som du definerer idatasets.xml  (som har prioritet) at gøre variablens "** kombinerede bidrag ** ", som er hvadERDDAP™Brugere ser. Således kan du brugeaddAttributesat omfine værdierne for kildeAttributes, tilføje nye attributter eller fjerne attributter.
    * Se [ ** &lt;addAttributes&gt; &gt; &gt; &gt; **Oplysninger] (#addattributes) som gælder for globale og variable** &lt;addAttributes&gt; &gt; &gt; &gt; ** .
    *   ERDDAP™ser efter og bruger mange af disse attributter på forskellige måder. For eksempel kræves farveBar-værdierne for at gøre en variabel tilgængelig viaWMS, så kort kan laves med konsekvente farveBars.
    *   [Længden, breddegrad, højde (eller dybde) , og tidsvariabler](#destinationname)Få masser af passende metadata automatisk (for eksempel,[enheder](#units)) .
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

Det tomme nummerOfObservations attribut forårsager kildenummeretOfObservations attributten (hvis nogen) at blive fjernet fra den endelige, kombinerede liste over attributter.
    * At levere disse oplysninger hjælperERDDAP™Gør et bedre job og hjælper brugerne med at forstå datasæt.
Gode metadata gør en datasæt brugbar.
Utilstrækkelige metadata gør et datasæt ubrugeligt.
Tag dig tid til at gøre et godt job med metadata attributter.
    
###### Kommentarer om variable attributter, der er særlige iERDDAP:

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)er en RECOMMMENTD variabel egenskab. For eksempel,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Denne egenskab er fra[CDCCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)og og og[CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatastandarder.
* Hvis det er til stede, skal det være en række to værdier af samme datatype som destinationsdatatypen af variablen, angive den egentlige (ikke teoretisk eller tilladt) minimums- og maksimumværdier for den variable.
* Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor),actual\\_rangeskal have upakkede værdier og være af samme datatype som de upakkede værdier.
* For nogle datakilder (for eksempel alle EDDTableFra... Filer datasæt) ,ERDDAP™bestemmer, atactual\\_rangeaf hver variabel og angiver deactual\\_rangeattribut. Med andre datakilder (f.eks. relationsdatabaser, Cassandra,DAPPER,Hyrax) , det kan være besværlig eller byrdefuld for kilden til at beregne rækkevidden, såERDDAP™anmoder ikke det. I dette tilfælde er det bedst, hvis du kan indstilleactual\\_range  (især for længde, breddegrad, højde, dybde og tidsvariabler) ved at tilføje enactual\\_rangeattribut til hver variabel [&lt;addAttributes&gt;] (#addattributes) for denne datasæt idatasets.xmlf.eks.

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Til numeriske[tid og timetamp variabler](#time-units), de angivne værdier skal være den relevante kilde (ikke destination) numeriske værdier. Hvis kildetidens værdier f.eks. gemmes som "dage siden 1985-01", så gemmes kildetiden.actual\\_rangeskal angives i "dage siden 1985-01". Og hvis du ønsker at henvise til NU som den anden værdi for nær-real-time data, der er periodisk opdaterede, bør du bruge NaN . Hvis du f.eks. vil angive et dataområde i 1985-01-17 til NU, skal du bruge

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Hvisactual\\_rangeer kendt (enten afERDDAP™beregne den eller ved at tilføje den via&lt;addAttributes&gt;),ERDDAP™vil vise den til brugeren på Data Access-formularen ( *datasetID* .html) og Make A Graph websider ( *datasetID* .ografi) for den datasæt og brug den, når du genererer FGDC og ISO 19115 metadata. Også de sidste 7 dage af tidens tidactual\\_rangebruges som standardtid subset.
* Hvisactual\\_rangeer kendt, brugerne kan bruge[min min () og max () funktioner](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)i anmodninger, som ofte er meget nyttige.
* Til alle EDDTable... datasæt, hvisactual\\_rangeer kendt (enten ved at angive den eller vedERDDAP™beregning af det) ,ERDDAP™vil kunne hurtigt afvise anmodninger om data uden for det område. Hvis datasættets laveste tidsværdi f.eks. svarer til 1985-01-17, vil en anmodning om alle data fra 1985-01-16 straks blive afvist med fejlmeddelelsen "Din forespørgsel producerede ingen matchende resultater." Dette gøractual\\_rangeet meget vigtigt stykke metadata, da det kan gemmeERDDAP™masser af indsats og gemme brugeren meget tid. Og dette fremhæver, atactual\\_rangeværdier må ikke være smallere end datas faktiske rækkevidde; ellersERDDAP™kan fejlagtigt sige "Der er ingen matchende data", når der faktisk er relevante data.
* Når en bruger vælger et undersæt af data og anmoder om en filtype, der indeholder metadata (for eksempel,.nc) ,ERDDAP™Modificeractual\\_rangei responsfilen for at afspejle subset's rækkevidde.
* Se også[data\\_minog og ogdata\\_max](#data_min-and-data_max), som er en alternativ måde at angive denactual\\_range. Men disse er deprecated nu, atactual\\_rangedefineres af CF 1.7+.
         
###### Farve Bar Attributes{#color-bar-attributes} 
Der er flere OPTIONAL variable attributter, som angiver de foreslåede standardattributter for en farvelinje (Bruges til at konvertere dataværdier til farver på billeder) for denne variable.
* Hvis dette er tilfældet, bruges disse oplysninger som standardoplysninger af gitterdap ogtabledapnår du anmoder om et billede, der bruger en farvebar.
* For eksempel, når latitude-longitude gitterded data er plottet som en dækning på et kort, angiver farvelinjen, hvordan dataværdierne konverteres til farver.
* At have disse værdier tilladerERDDAP™at oprette billeder, der bruger en ensartet farvelinje på tværs af forskellige anmodninger, selv når tiden eller andre dimensionværdier varierer.
* Disse attributnavne blev oprettet til brug iERDDAP. De er ikke fra en metadata standard.
* attributter relateret til farvelinjen er:
    *    **colorBarMinimum** Angiv minimumsværdien på farveBaren. For eksempel,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor), angive dencolorBarMinimumsom en upakket værdi.
    * Dataværdier lavere endcolorBarMinimumrepræsenteres af samme farve somcolorBarMinimumværdier.
    * attributten skal være af[Type dobbelt"](#attributetype), uanset datavariets type.
    * Værdien er normalt et dejligt rund nummer.
    * Bedste praksis: Vi anbefaler en værdi lidt højere end minimumsdataværdien.
    * Der er ingen standardværdi.
*    **colorBarMaximum** Angiv den maksimale værdi på farveBaren. For eksempel,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor), angive dencolorBarMinimumsom en upakket værdi.
    * Dataværdier højere endcolorBarMaximumrepræsenteres af samme farve somcolorBarMaximumværdier.
    * attributten skal være af[Type dobbelt"](#attributetype), uanset datavariets type.
    * Værdien er normalt et dejligt rund nummer.
    * Bedste praksis: Vi anbefaler en værdi lidt lavere end den maksimale dataværdi.
    * Der er ingen standardværdi.
*    **farve farve farve I nærheden af BarPalette** Angiv paletten til farveBaren. For eksempel,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * AlleERDDAP™installationer understøtter disse standardpaller: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topografi, Topografi\\[tilføjet i v1.74\\], WhiteBlack, WhiteBlueBlack og WhiteRedBlack.
    * Hvis du har installeret[Yderligere paletter](/docs/server-admin/additional-information#palettes), du kan henvise til en af dem.
    * Hvis denne egenskab ikke er til stede, er standarden BlueWhiteRed, hvis \\-1\\*colorBarMinimum= = = = =colorBarMaximum; ellers er standarden Rainbow.
*    **farveBarScale** Angiv skalaen for farveBaren. For eksempel,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Gyldige værdier er lineære og Log.
    * Hvis værdien er Log,colorBarMinimumskal være større end 0.
    * Hvis denne egenskab ikke er til stede, er standarden lineær.
*    **farve farve farve BarContinuous** Angiv, om farveBaren har en kontinuerlig palet af farver, eller om farveBaren har et par diskrete farver. For eksempel,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Gyldige værdier er strengene sande og falske.
    * Hvis denne egenskab ikke er til stede, er standarden sandt.
*    **farveBarNSektioner** Angiv standardnummeret for sektioner på farveBaren. For eksempel,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Gyldige værdier er positive integers.
    * Hvis denne egenskab ikke er til stede, er standarden \\-1, som fortællerERDDAP™at vælge antallet af sektioner baseret på udvalget af farveBar.
###### WMS {#wms} 
De vigtigste krav til en variabel at være tilgængelig viaERDDAP'sWMSserveren er:
* Datasættet skal være etEDDGrid... datasæt.
* Datavariablen skal være en gitteret variabel.
* Datavariablen skal have længde og breddegrad akse variabler. (Andre aksevariabler er OPTIONAL.) 
* Der skal være nogle længdeværdier mellem -180 og 180.
* The The The The The The ThecolorBarMinimumog og ogcolorBarMaximumattributter skal specificeres. (Andre farve bar attributter er OPTIONAL.) 

###### data\\_minog og ogdata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** og og og **data\\_max** ](#data_min-and-data_max)-- Disse er deprecated variable attributter defineret i World Ocean Circulation Experiment (WOCE) metadatabeskrivelse. For eksempel,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Vi anbefaler, at du bruger[actual\\_range](#actual_range), i stedet fordata\\_minog og ogdata\\_max, fordiactual\\_rangedefineres nu af CF-specifikationerne.
    * Hvis det er til stede, skal de være af samme datatype som bestemmelsesstedsdatatypen af variablen og angive den egentlige (ikke teoretisk eller tilladt) minimums- og maksimumværdier for den variable.
    * Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor),data\\_minog og ogdata\\_maxskal være upakkede værdier ved hjælp af den pakkede datatype.
         
###### variabel variabel variabel variabeldrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)-- Dette er en OPTIONAL variabel egenskab, der bruges afERDDAP™  (og ingen metadatastandarder) som angiver standardværdien for indstillingen "Draw Land Mask" på datasættets Make A Graph-formular ( *datasetID* .ografi) og for parameteren &.land i en URL, der anmoder om et kort over dataene. For eksempel,
    ```
        <att name="drawLandMask">under</att>  
    ```
Se billederne[drawLandMaskoversigtsoversigt](#drawlandmask).
###### En kodning{#encoding} 
*   [ **\\_Encoding** ](#encoding)
    * Denne egenskab kan kun bruges med strenge variabler.
    * Denne egenskab anbefales stærkt.
    * Denne egenskab er fra[NetCDFBrugervejledning (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    * Indvendigt iERDDAP™, Strings er en sekvens af 2-byte tegn, der bruger de[Unicode UCS-2 figursæt](https://en.wikipedia.org/wiki/UTF-16).
    * Mange filtyper understøtter kun 1-byte tegn i Strings og har dermed brug for denne egenskab til at identificere en tilknyttet
        [charset (AKA kode side) ](https://en.wikipedia.org/wiki/Code_page)som definerer, hvordan du kortlægger de 256 mulige værdier til et sæt 256 tegn tegnet fra UCS-2 tegnsættet og/eller kodningssystemet, f.eks.[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (som kræver mellem 1 og 4 aftes pr karakter) .
    * Værdier for \\_Encoding er tilfælde-infølsomme.
    * I teori,ERDDAP™kunne støtte \\_Encoding-identifikatorer fra[denne IANA liste](https://www.iana.org/assignments/character-sets/character-sets.xhtml), men i praksis,ERDDAP™I øjeblikket bare understøtter
        * ISO-8859-1 (Bemærk, at det har slag, ikke understregninger) , som har den fordel, at det er identisk med de første 256 tegn på Unicode og
        * UTF-8.
    * Når du læser kildefiler, er standardværdien ISO-8859-1, bortset fra netcdf-4-filer, hvor standarden er UTF-8.
    * Dette er et løbende problem, fordi mange kildefiler bruger charsets eller kodninger, der er forskellige fra ISO-8859-1, men ikke identificerer charset eller kodning. For eksempel har mange kildedatafiler nogle metadata kopieret og tidligere fra Microsoft Word på Windows og dermed har fancy bindestreger og apostrophes fra et Windows-specifikt charset i stedet for ASCII bindestreger og apostrophes. Disse tegn vises så som mærkelige tegn eller '?' iERDDAP.
         
###### fileAccessBaseUrl{#fileaccessbaseurl} 
*    **[fileAccessBaseUrl](#fileaccessbaseurl)og filapcessSuffix** er meget sjældent brugt attributter, der ikke er fra nogen standard. Hvis en EDDTabel kolonne har filnavne af web tilgængelige filer (f.eks. billede, video eller lydfiler) , du kan tilføje
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
for at angive den grundlæggende webadresse (Afslut med /) nødvendige for at gøre filnavnene til komplette webadresser. I usædvanlige tilfælde, såsom når en kolonne har referencer til .png filer, men værdierne mangler ".png", kan du tilføje
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
f.eks.&lt;ont navn BondagefileAccessSuffik.png&lt;/a&gt;)
Hvis du vil angive et suffik, der skal føjes til at gøre filnavnene til komplette webadresser. Så for derefter.htmlTablereaktioner,ERDDAP™vil vise filnavnet som et link til den fulde URL (basen Url plus filnavnet plus suffik) .

Hvis du ønskerERDDAP™at tjene de relaterede filer, gøre en separat[EDDTableFraFileNames](#eddtablefromfilenames)Datasæt til disse filer (Det kan være et privat datasæt) .
    
###### FileAccessArchive Url{#fileaccessarchiveurl} 
*   [ **FileAccessArchive Url** ](#fileaccessarchiveurl)er en meget sjældent brugt egenskab, der ikke er fra nogen standard. Hvis en EDDTabel kolonne har filnavne af web tilgængelige filer (f.eks. billede, video eller lydfiler) som er tilgængeligt via et arkiv (fx,.zipfilfil) tilgængelig via en URL, brug&lt;ont navn *URL* &lt;/att&gt; for at angive URL for arkivet.
    
Hvis du ønskerERDDAP™at tjene arkivfilen, gøre en separat[EDDTableFraFileNames](#eddtablefromfilenames)Datasæt til den fil (Det kan være et privat datasæt) .
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)-- Dette er en REQUIRED variabel egenskab, hvis&lt;variablerMustHavIoosKategori&gt; er indstillet til sand (Standard) i in in in in[opsætning.xml](/docs/server-admin/deploy-install#setupxml); ellers er det OPTIONAL.
For eksempel,&lt;Navnligioos\\_categoryOverfølsomhed&lt;/att&gt;
kategorierne er fra[NOAA's Integreret Ocean Observing System (IOOS) ](https://ioos.noaa.gov/).
    
    *    (Som at skrive dette) Vi er ikke klar over formelle definitioner af disse navne.
    * De vigtigste navne er fra Zdenka Willis .ppt "Integrated Ocean Observing System (IOOS)  NOAA's Approach to Building a Initial Operating Capability" og fra[I nærheden af US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (side 1-5) .
    * Det er sandsynligt, at denne liste vil blive revideret i fremtiden. Hvis du har spørgsmål, bedes du kontakte Chris. John på noaa.gov.
    *   ERDDAP™understøtter en større liste over kategorier end IOOS, fordi Bob Simons tilføjede yderligere navne (hovedsageligt baseret på navnene på videnskabelige områder, f.eks. Biologi, Ecology, Meteorologi, Statistik, Taxonomy) for andre typer af data.
    * De aktuelle gyldige værdier iERDDAP™Herudover er Bathymetry, Biologi, Undertegn, CO2, Farvet Dissolved Organic Matter, Contaminants, Aktueller, Udløsede Næringsmidler, Dissolved O2, Ecology, Fish Abundance, Fish Art, Heat Flux, Hydrology, Identifier, Location, Meteorologi, Ocean Farve, Optisk, Andre,ogener, Phytopton, Tryk, Produktivitet, Salinitet, Søplan, Vandplan, Vandplan, Luftstrøm, Luft, Luft, Luftstrøm, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft, Luft
    * Der er nogle overlap og ambiguity mellem forskellige vilkår - gør dit bedste.
    * Hvis du tilføjerioos\\_categorytil listen&lt;categoryAttributes&gt; &gt; &gt; &gt; i in in in inERDDAP's[opsætning.xml](/docs/server-admin/deploy-install#setupxml)fil, brugere kan nemt finde datasæt med lignende data viaERDDAP"Søg efter Datasets efter kategori" på startsiden.
        [Prøv at brugeioos\\_categoryfor at søge efter interessedata.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Der var der[en diskussion omERDDAP™og og ogioos\\_categoryi områdetERDDAP™Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
Du kan blive fristet til at indstille&lt;variablerMustHavIoosKategori&gt; til falsk, så denne egenskab ikke er nødvendig. ("Pfft&#33; Hvad er det til mig?") Nogle grunde til at forlade det sæt til sande (Standard) og brugioos\\_categoryer:
    
    * Hvis opsætning.xml's&lt;variablerMustHavIoosKategori&gt; er sat til sand,[GenererDatasetsXml](#generatedatasetsxml)altid skaber/suggestioos\\_categoryattribut for hver variabel i hvert nyt datasæt. Så hvorfor ikke bare forlade det i?
    *   ERDDAP™lader brugerne søge efter interessedata efter kategori.ioos\\_categoryer en meget nyttig søgning kategori, fordi ioos\\_kategorier (f.eks. temperatur) er ganske bredt. Dette gørioos\\_categorymeget bedre til dette formål end f.eks. den meget finere CFstandard\\_names s s (som ikke er så godt til dette formål på grund af alle de synonymer og små variationer, for eksempel havet\\_surface\\_temperature versus Have\\_water\\_temperature) .
(Usingioos\\_categorytil dette formål styres af&lt;categoryAttributes&gt; i din opsætning.xml-fil.)
        [Prøv at brugeioos\\_categoryfor at søge efter interessedata.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Disse kategorier er fra[NOAA's Integreret Ocean Observing System (IOOS) ](https://ioos.noaa.gov/). Disse kategorier er grundlæggende for IOOS's beskrivelse af IOOS mission. Hvis du er i gangNOAA, støtteioos\\_categoryer en god En-NOAAting at gøre. (Se dette[EnNOAAvideovideo](https://www.youtube.com/watch?v=nBnCsMYm2yQ)og bliv inspireret&#33;) Hvis du er i nogle andre amerikanske eller internationale agenturer eller arbejder med statslige agenturer eller arbejder med nogle andre Ocean Observing System, er det ikke en god ide at samarbejde med USA IOOS kontor?
    * Snart eller senere, kan du ønske nogle andreERDDAP™at linke til dine datasæt via[EDDGridFraErddap](#eddfromerddap)og og og[EDDTableFraErddap](#eddfromerddap). Hvis den andenERDDAP™kræver behovioos\\_categoryDine data skal haveioos\\_categoryfor at bestilleEDDGridFra Erddap og EDDTableFraErddap til arbejde.
    * Det er psykologisk meget nemmere at inkludereioos\\_categorynår du opretter datasættet (det er bare en anden ting,ERDDAP™kræver at tilføje datasættet tilERDDAP) , end at tilføje det efter kendsgerningen (hvis du besluttede at bruge det i fremtiden) .
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og og og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadatastandarder) er en RECOMMMENTD variabel egenskab iERDDAP. For eksempel,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™Brug af cookieslong\\_nametil mærkning af akser på grafer.
    * Bedste praksis: Kapitaliser ordene i ordenelong\\_namesom om det var en titel (kapitaliser det første ord og alle ikke-artikel ord) . Indeholder ikke enheder i enhedernelong\\_name. Det lange navn bør ikke være meget lang (normalt&lt;20 tegn), men skal være mere beskrivende end de[destinationName](#destinationname), som ofte er meget præcis.
    * Hvis "long\\_name" er ikke defineret i variablens[Kilder](#variable-addattributes)eller eller eller&lt;addAttributes&gt;,ERDDAP™vil generere det ved at rense op[standard\\_name](#standard_name)  (hvis til stede) ellerdestinationName.
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)og og og **\\_Fill Værdiværdi**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)og og og[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) er variable attributter, der beskriver et nummer (for eksempel -99) som bruges til at repræsentere en manglende værdi. For eksempel,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

For strenge variabler, standarden for begge er "" (den tomme streng) .
For numeriske variabler er standarden for begge NaN.
*   ERDDAP™understøtter beggemissing\\_valueog \\_FillValue, da nogle datakilder tildeler lidt forskellige betydninger til dem.
* Hvis det er til stede, skal de være af samme datatype som variablen.
* Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor),missing\\_valueog \\_FillValue værdier skal også pakkes. På samme måde for en kolonne med streng dato/tidsværdier, der bruger en lokal[time\\_zone](#time_zone),missing\\_valueog \\_FillValue værdier skal bruge den lokale tidszone.
* Hvis en variabel bruger disse særlige værdier,missing\\_valueog/eller \\_FillValue attributter er REQUIRED.
* For For For For For[tid og timetamp variabler](#time-units)  (om kilden er strenge eller numeriske numeriske) ,missing\\_values og \\_FillValues vises som "" (den tomme streng) når tiden er skrevet som en streng og som NaN, når tiden er skrevet som en dobbelt. Kildeværdierne formissing\\_valueog \\_FillValue vises ikke i variablens metadata.
* Til strenge variabler,ERDDAP™altid konvertere nogenmissing\\_values eller \\_FillValue data værdier i "" (den tomme streng) . Kildeværdierne formissing\\_valueog \\_FillValue vises ikke i variablens metadata.
* Til numeriske variabler:
The The The The The The Themissing\\_valueog \\_FillValue vises i variablens metadata.
Til nogle output dataformater,ERDDAP™vil forlade disse særlige tal intakt, f.eks. vil du se -99.
Til andre output dataformater (Især tekstlignende formater som .csv og.htmlTable) ,ERDDAP™vil erstatte disse særlige numre med NaN eller "".
* Nogle datatyper har iboende manglende værdimarkører, der ikke behøver at blive eksplicit identificeret medmissing\\_valueeller \\_FillValue attributter: flyt og dobbelt variabler har NaN (Ikke et nummer) , Strenge værdier bruger den tomme streng, og char værdier har karakter\\uffff  (figur #65535, som er Unicodes værdi for ikke en tegn) . Integer datatyper har ikke iboende manglende værdimarkører.
* Hvis en heltalsvariabel har en manglende værdi (for eksempel en tom position i en .csv-fil) ,ERDDAP™tolke værdien som defineretmissing\\_valueeller \\_FillValue for den variable. Hvis ingen er defineret,ERDDAP™vil fortolke værdien som standard manglende værdi for denne datatype, som altid er den maksimale værdi, der kan holdes af denne datatype:
127 for byte variabler, 32767 for kort, 2147483647 for int, 9223372036854775807 længe,
255 for ubyte, 65535 for ukort, 4294967295 for uint, og 18446744073709551615 for ulong.
###### ADD \\_FillValue ATTRIBUTES?{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES?](#add-_fillvalue-attributes)  
Hver gangERDDAP™indlæser et datasæt, det kontrollerer, om variablerne med tekstkildedatatyper har et defineretmissing\\_valueeller \\_FillValue attribut. Hvis en variabel ikke gør det, såERDDAP™udskriver en meddelelse til logfilen (Begynd med "Tilføj \\_FillValue Attribute?") Sådan anbefaler du, atERDDAP™administrator tilføjer en \\_Fill Værdi attribut for denne variabel idatasets.xml. Det er meget nyttigt for alle variable at have en \\_FillValue ellermissing\\_valuefordi manglende værdier altid er muligt, f.eks. hvis en given fil i et datasæt ikke har en given variabel,ERDDAP™Skal være i stand til at præsentere den variable som at have alle manglende værdier for den variable. Hvis du beslutter, at en variabel ikke har en \\_FillValue attribut, kan du tilføje
    &lt;ont navnene&lt;/att&gt; i stedet, som vil undertrykke meddelelsen for detdatasetID+variabel kombination i fremtiden.
    
Hver gangERDDAP™starter op, det indsamler alle disse anbefalinger til en meddelelse, der er skrevet til logfilen (startende med "ADD \\_FillValue ATTRIBUTES?”) , e-mailet tilERDDAP™administrator, og skrevet til en CSV-datafil i\\[bigParentDirectory\\]/loger/mappen. Hvis du ønsker at, kan du bruge GenererDatasetsXml-programmet (og TilføjFillValueAttributes mulighed) for at anvende alle forslag i CSV-filen til dendatasets.xmlfil. Til nogen afdatasetID/variable kombinationer i den fil, hvis du beslutter, at der ikke er behov for at tilføje attributten, kan du ændre attributten til&lt;ont navnene&lt;/att&gt; for at undertrykke anbefalingen for detdatasetID+variabel kombination i fremtiden.
    
Dette er vigtigt&#33;
Som Bob har ofte sagt: det ville være dårligt (og pinligt) hvis nogle af beviserne på global opvarmning blev forårsaget af uidentificeret manglende værdier i data (f.eks. temperaturværdier på 99 eller 127 grad\\_ C, der skal have været markeret som manglende værdier og dermed skæve den gennemsnitlige og/eller mediske statistikker højere) .

* The \\_FillValue ogmissing\\_valueværdier for en given variabel i forskellige kildefiler skal være konsekvent; ellers,ERDDAP™vil acceptere filer med et sæt værdier og afvise alle de andre filer som "Bad Files". At løse problemet,
    * Hvis filerne er gitterded.ncfiler, du kan bruge[EDDGridFraNcFilesUnpakke](#eddgridfromncfilesunpacked).
    * Hvis filerne er faneformede datafiler, kan du bruge EDDTableFra...Files ''[standardiser Hvad](#standardizewhat)at fortælleERDDAPat standardisere kildefiler, da de læses indERDDAP.
    * For hårdere problemer, kan du bruge[NcML](#ncml-files)eller eller eller[NCO](#netcdf-operators-nco)at løse problemet.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (Standard = 1) og og og **add\\_offset**   (Standard = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)og og og[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) er OPTIONAL variable attributter, der beskriver data, der er pakket i en enklere datatype via en simpel transformation.
    * Hvis det er til stede, er deres datatype forskellig fra kildedatatypen og beskriver datatypen af destinationsværdierne.
En datakilde kan f.eks. have lagrede flydataværdier med en decimaleekit pakket så korte ints (int16) , ved brugscale\\_factor= 0,1 ogadd\\_offset= 0. For eksempel

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

I dette eksempel,ERDDAP™ville pakke dataene og præsentere den til brugeren som flyde dataværdier.
    * Hvis til stede,ERDDAP™vil udtrække værdierne fra disse attributter, fjerne attributter, og automatisk pakke dataene til brugeren:
destination Værdi = kilde Værdi \\*scale\\_factor+ + + +add\\_offset  
Eller angivet en anden måde:
pakket Værdi \\*scale\\_factor+ + + +add\\_offset
    * The The The The The The Thescale\\_factorog og ogadd\\_offsetværdier for en given variabel i forskellige kildefiler skal være konsekvent; ellers,ERDDAP™vil acceptere filer med et sæt værdier og afvise alle de andre filer som "Bad Files". At løse problemet,
        * Hvis filerne er gitterded.ncfiler, du kan bruge[EDDGridFraNcFilesUnpakke](#eddgridfromncfilesunpacked).
        * Hvis filerne er faneformede datafiler, kan du bruge EDDTableFra...Files ''[standardiser Hvad](#standardizewhat)at fortælleERDDAPat standardisere kildefiler, da de læses indERDDAP.
        * For hårdere problemer, kan du bruge[NcML](#ncml-files)eller eller eller[NCO](#netcdf-operators-nco)at løse problemet.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (fra fra[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata standard) er en RECOMMMENTD variabel egenskab iERDDAP. CF vedligeholder listen over tilladt[CF standardnavne](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). For eksempel,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Hvis du tilføjerstandard\\_nametil variabler' attributter og tilføjestandard\\_nametil listen&lt;categoryAttributes&gt; &gt; &gt; &gt; i in in in inERDDAP's[opsætning.xml](/docs/server-admin/deploy-install#setupxml)fil, brugere kan nemt finde datasæt med lignende data viaERDDAP"Søg efter Datasets efter kategori" på startsiden.
    * Hvis du angiver en CFstandard\\_namefor en variabel skal enheds attributten for variablen ikke være identisk med Canonical Units, der er angivet for standardnavnet i CF Standard Name-tabellen, men enhederne skal konvertere til Canonical Units. For eksempel alle temperaturrelaterede CFstandard\\_names har "K" (Billeder af Kelvin) som Canonical Units. Så en variabel med en temperaturrelateretstandard\\_nameSKAL have enheder af K, grad\\_C, grad\\_F, eller nogle UDUnits variant af disse navne, da de er alle inter-konvertible.
    * Bedste praksis: En del af strømmen af[kontrollerede vocabularies](https://en.wikipedia.org/wiki/Controlled_vocabulary)Der gælder kun vilkår på listen. Så vi anbefaler at holde fast på de vilkår, der er defineret i det kontrollerede ordforråd, og vi anbefaler mod at lave et begreb, hvis der ikke er en passende på listen. Hvis du har brug for yderligere vilkår, kan du se, om standardudvalget vil tilføje dem til det kontrollerede ordforråd.
    *   standard\\_nameværdier er de eneste CF attributværdier, der er tilfældet følsomme. De er altid alle mindre. Begyndende iERDDAP™v1.82, GenererDatasets vil konvertere øverste bogstaver til små bogstaver. Og når et datasæt er indlæst iERDDAP, øvre bogstaver er lydløst ændret til små bogstaver.
         
###### time\\_precision {#time_precision} 
*   time\\_precisioner en OPTIONAL egenskab, der bruges afERDDAP™  (og ingen metadatastandarder) for for for[tid og timetamp variabler](#time-units), som kan være i gitterded datasæt eller tabulære datasæt, og iaxisVariables eller sdataVariables. For eksempel,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisionAngiv den præcision, der skal bruges, nårERDDAP™formaterer tidsværdierne fra den variable som strenge på websider, herunder.htmlTablesvar. I filformater, hvorERDDAP™formater gange som strenge (f.eks. .csv og.json) ,ERDDAP™kun bruger dentime\\_precision-specificeret format, hvis det indeholder fraktionelle sekunder; ellers,ERDDAP™Brug af 1970-01T00:00:00T00:00:00 Z format.
* Gyldige værdier er 1970-01, 1970-01-07, 1970-01T00Z, 1970-01T00:00Z, 1970-01T00:00:00Z (Standard) , 1970-01T00:00:00.0Z, 1970-01T00:00:00.00Z, 1970-01T00:00:00.\\[1970 er ikke en mulighed, fordi det er et enkelt nummer, såERDDAP™kan ikke vide, om det er en formateret tidsstreng (Et år) eller hvis det er nogle få sekunder siden 1970-01T00:00:00Z.\\]
* Hvistime\\_precisionEr ikke angivet eller værdien ikke matches, vil standardværdien blive brugt.
* Her som i andre dele afERDDAP™, alle felter i den formaterede tid, der ikke vises, antages at have minimumsværdien. For eksempel 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z og 1985-07-01T00:00:00Z Z betragtes alle tilsvarende, selvom med forskellige niveauer af præcision underforstået. Dette matcher de[ISO 8601:2004"extended"Time Format specifikation](https://www.iso.org/iso/date_and_time_format).
*    **ADVARSEL:** Du bør kun bruge en begrænsettime\\_precisionhvis **alle** af dataværdierne for variablen har kun den mindste værdi for alle de felter, der er skjult.
    * Du kan f.eks. bruge entime\\_precisionaf 1970-01-01, hvis alle dataværdierne har time=0, minut=0, og anden=0 (for eksempel 200-28T00:00:00Z og 200-28T00:00:00Z) .
    * Brug f.eks. ikke entime\\_precisionaf 1970-01-01, hvis der ikke er 0 time, minut eller sekunder værdier, (for eksempel 200187-05T12:00:00Z) fordi den ikke-standard timeværdi ikke ville blive vist. Ellers, hvis en bruger spørger om alle data med tiden=200766-05, vil anmodningen mislykkes uventet.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneer en OPTIONAL egenskab, der bruges afERDDAP™  (og ingen metadatastandarder) for for for[tid og timetamp variabler](#time-units), som kan være i gitterded datasæt eller tabulære datasæt.
    * Standarden er "Zulu" " " " (som er den moderne tidszone version af GMT) .
    * Baggrundsoplysninger: "time offsets" (f.eks. Pacific Standard Time, -03:00, GMT-8) er fastsat, specifikke, offsetr i forhold tilZulu  (GMT GMT) . I modsætning hertil er "time zoner" de meget mere komplekse ting, der påvirkes af Daylight Saving (f.eks. "US/Pacific") , som har haft forskellige regler på forskellige steder på forskellige tidspunkter. Tidszoner har altid navne, da de ikke kan opsummeres af en simpel offsetværdi (Se kolonnen "TZ-databasenavne" i tabellen på[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .ERDDAP'stime\\_zoneattribut hjælper dig med at håndtere lokale tidsdata fra nogle tidszone (f.eks. 1987-03-25T17:32:05 Pacific Pacific Tidstid) . Hvis du har strenge eller numeriske tidsdata med en (fast fastsat) tidsforskydning, skal du blot justere dataene tilZulu  (hvad er detERDDAP™ønsker) ved at angive en anden basetid i attributten enheder (f.eks. "timer siden 1970-01T08:00:00Z", noterer T08 for at angive tidsforskydningen) , og altid kontrollere resultaterne for at sikre, at du får de resultater, du ønsker.
    * For timetamp variabler med kildedata fra Strings, denne egenskab lader dig angive en tidszone, der førerERDDAP™for at konvertere de lokale tidszone kildetider (nogle i Standard tid, nogle i Daylight Saving tid) ind iZulugange tider (som altid er i Standard tid) . Listen af gyldige tidszonenavne er sandsynligvis identisk med listen i TZ-kolonnen på[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Fælles tidszoner er: USA/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern.
    * For tidsstempel variabler med numeriske kildedata, kan du angive "time\\_zone" attribut, men værdien skal være "Zulu" eller "UTC". Hvis du har brug for støtte til andre tidszoner, bedes du kontakte Chris. John på noaa.gov .
         
###### enheder{#units} 
*   [ **enheder** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)og og og[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standard) definerer enhederne af dataværdierne. For eksempel,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "enheder" er REQUIRED som enten en kildeAttribute eller en addAttribute for"time"variabler og er STRONGLY RECOMMMENTD for andre variabler, når det er hensigtsmæssigt (som er næsten altid) .
    * Generelt anbefaler vi[UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\kompatible enheder, der kræves af[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)og og og[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standarder.
    * En anden fælles standard er[UCUM](https://unitsofmeasure.org/ucum.html)-- den Unified Code for måleenheder.[OGC](https://www.ogc.org/)tjenester såsom[SOS](https://www.ogc.org/standards/sos),[WCS](https://www.ogc.org/standards/wcs), og[WMS](https://www.ogc.org/standards/wms)kræver UCUM og henviser ofte til UCUM som UOM (Måleenheder) .
    * Vi anbefaler, at du bruger en enhed standard for alle datasæt i din enhedERDDAP. Du bør fortælleERDDAP™hvilken standard du bruger med&lt;enheder\\_standard&gt;, i din[opsætning.xml](/docs/server-admin/deploy-install#setupxml)fil.
    * Enhederne til en given variabel i forskellige kildefiler skal være i overensstemmelse. Hvis du har en samling af datafiler, hvor en delsæt af filerne bruger forskellige enheder værdier end en eller flere andre undersæt af filerne (f.eks.
"dagene siden 1985-01" versus "dage siden 2000-01",
"grader\\_Celsius" versus "deg\\_C", eller
"knot" mod "m/s") skal du finde en måde at standardisere enhedsværdierne, ellersERDDAP™vil kun indlæse en delsæt af filerne. Tænk på det: Hvis en fil har vindSpeed enheder=knots og en anden har vindSpeed enheder=m/s, bør værdierne fra de to filer ikke medtages i samme aggregerede datasæt.
        * Hvis filerne er gitterded.ncfiler, i mange situationer, du kan bruge[EDDGridFraNcFilesUnpakke](#eddgridfromncfilesunpacked).
        * Hvis filerne er faneformede datafiler, i mange situationer, kan du bruge EDDTableFra...Files ''[standardiser Hvad](#standardizewhat)at fortælleERDDAPat standardisere kildefiler, da de læses indERDDAP.
        * For hårdere problemer, kan du bruge[NcML](#ncml-files)eller eller eller[NCO](#netcdf-operators-nco)at løse problemet.
    * CF standardsektion 8.1 siger, at hvis en variabel data er pakket via[scale\\_factorog/elleradd\\_offset](#scale_factor), " Enhederne af en variabel bør være repræsentativ for de upakkede data."
    *   [Til tid og timetamp variabler,](#time-units)enten variablens variable[Kilder](#variable-addattributes)eller eller eller&lt;addAttributes&gt; &gt; &gt; &gt; (som tager forrang) SKAL have[enheder](#units)som enten
        
        * Til tidsakse variabler eller tidsdatavariabler med numeriske data:[UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-kompatibel streng (med formatet *enheder* siden siden siden *baseTime* ) beskrive, hvordan du fortolker kildetidsværdier (for eksempel, sekunder siden 1970-01T00:00:00Z) .
            
         *enheder* kan være en af:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Teknisk set,ERDDAP™følger IKKEUDUNITSstandard ved konvertering"years since"og og og"months since"Tidsværdier til"seconds since". The The The The The The TheUDUNITSstandard definerer et år som en fast, enkelt værdi: 3.15569259747e7 sekunder. Og og ogUDUNITSdefinerer en måned som år/12. Desværre, de fleste/alle datasæt, som vi har set,"years since"eller eller eller"months since"klart agter værdierne at være kalenderår eller kalendermåneder. For eksempel 3"months since 1970-01-01"er normalt beregnet til at betyde 1970-04-01. Så,ERDDAP™tolke"years since"og og og"months since"som kalenderår og måneder, og følger ikke strengtUDUNITSstandard.
            
The The The The The The The *baseTime* skal være en ISO 8601:2004 (E) formateret dato tid streng (yyyy-MM-dd'T'HH:mm:ssZ, for eksempel 1970-01T00:00:00Z) eller en variation af det (f.eks. med dele, der mangler i slutningen) .ERDDAP™forsøger at arbejde med en bred vifte af variationer af det ideelle format, for eksempel "1970-1 0:0:0" understøttes. Hvis tidszoneoplysningerne mangler, antages det at være denZulutidszone (AKA GMT) . Selv hvis en anden tidsforskydning er angivet,ERDDAP™Brug aldrig Daylight Saving Time. Hvis baseTime bruger noget andet format, skal du bruge&lt;addAttributes&gt; for at angive en ny enhed streng, der bruger en variation af ISO 8601:2004 (E) format (f.eks. skift dage siden 1. januar 1985 i dage siden 1985-01.
        
Du kan testeERDDAP's evne til at håndtere en bestemt *enheder* siden siden siden *baseTime* med medERDDAP's[Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). Forhåbentlig kan du tilslutte dig et nummer (den første tidsværdi fra datakilden?) og en enhed streng, klik på Konverter, ogERDDAP™vil kunne konvertere den til en ISO 8601:2004 (E) formateret dato tid streng. Konverteringen vil returnere en fejlmeddelelse, hvis enhedsstrengen ikke er genkendelige.

###### Strygetid enheder{#string-time-units} 
*   [Til attributten for tid eller timetamp data variabler med strenge data,](#string-time-units)Du skal angive en[java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)Mønstermønster (som primært er kompatibel med java.text. SimpleDateFormat) som beskriver, hvordan man fortolker strengetider.
    
Til de almindeligt anvendte tidsformater, der er variationer af ISO 8601:2004 (E) standardformat (for eksempel, 2018-02T00:00:00Z) , du kan angive variationer afyyyy-MM-dd'T'HH:mm:ssZ, for eksempel, brugyyyy-MM-ddhvis strengetiden kun har en dato. Til ethvert format, der starter med yyyyy-M,ERDDAPBrug en speciel parser, der er meget tilgivende for mindre variationer i formatet. Parser kan håndtere tidszoner i formatet 'Z', "UTC", "GMT", ±XX:XX, ±XXXX og ±XX formater. Hvis dele af datotiden ikke er angivet (for eksempel minutter og sekunder) ,ERDDAP™forudsætter den laveste værdi for dette felt (f.eks. hvis sekunder ikke er angivet, antages sekunder=0) .
    
For alle andre strenge tidsformater, skal du præcist angive en DateTimeFormatter-kompatibel tidsformat streng. Likeyyyy-MM-dd"T"HH:mm:ssZ, disse format strenge er bygget fra tegn, der identificerer en bestemt type oplysninger fra tidsstrengen, f.eks. m betyder minut-of-time. Hvis du gentager formatkarakteren nogle gange, tilpasser den yderligere mening, f.eks. m, at værdien kan specificeres af en række cifre, mm betyder, at værdien skal specificeres af 2 cifre. The The The The The The TheJavadokumentation for DateTimeFormatter er et råt overblik og gør ikke disse detaljer klar. Så her er en liste over format karakter variationer og deres mening inden forERDDAP™  (som nogle gange er lidt anderledes endJava's DateTimeFormatter) :
    
    |Karakterer|Eksempler|Betydning af mening|
    |---|---|---|
    |u, y, Y|\\-4712, 0, 1, 10, 100, 2018|et årsnummer, ethvert antal cifre.ERDDAP™Godbidder y (året rundt) og Y (ugebaseret år, fordi dette ofte fejlagtigt bruges i stedet for y) som u,[astronomiske år](https://en.wikipedia.org/wiki/Astronomical_year_numbering). Astronomiske år er positive eller negative integers, der ikke bruger BCE (BC BC) eller CE (AD) Era designatorer: 2018=2018CE, ..., 2=2CE, 1 =CE, 0 =BCE, -1=2BCE, -2=3BCE,...|
    |uuuu, yyyyy, I nærheden af YYYYYY|\\-4712, 0000, 0001, 0010, 0100, 2018|et 4 cifret astronomiske årnummer (Ignorer enhver forudgående '-')  |
    |M M M M|1, 01, 12|et månedsnummer, ethvert antal cifre (BrugteJanuary)  |
    |MM|01, 12|en 2 cifre (nul polstret) Månedsnummer|
    |MMM|Jan, jan, JAN|et 3 brev engelsk månedsnavn, tilfælde i følsomme|
    |MMMM|Jan, jan, JAN, januar, januar, JANUARY|et 3 brev eller fuld engelsk månedsnavn, tilfælde ifølsomme|
    |d|1, 01, 31|et dag-of-måned nummer, ethvert antal cifre|
    |dd|01, 31|en 2 cifre (nul polstret) dag-af-måned. Den første 'cifre' kan være et rum.|
    |D D D D|1, 001, 366|dag-af- år, ethvert antal cifre, 001=Jan 1|
    |DDD|001, 366|dag-af- år, 3 cifre, 001=Jan 1|
    |EEE|THU, Thu|en 3 brev dag-of-uge ignoreres værdien, når parsing|
    |EEEEEE|THU, Thu, fredag, fredag, torsdag|et 3 brev eller fuld engelsk dag-of-week, tilfælde ufølsomme, værdi ignoreres, når parsing|
    |H|0, 00, 23|H time-of-day (0-23) , ethvert antal cifre|
    |HH|00, 23|HH time-of-day (00-23) , 2 cifre. Den første 'cifre' kan være et rum.|
    |a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a|am, AM, PM|AM eller PM, kassefølsomme|
    |h|12, 1, 01, 11|døgnet rundt (12, 1, 2,... 11) , ethvert antal cifre|
    |hh|12, 01, 11|døgnet rundt (12, 1, 2,... 11) , 2 cifre. Den første 'cifre' kan være et rum.|
    |K K K K|0, 1, 11|time-of-am-pm (0, 1, ...11) , ethvert antal cifre|
    |KK|00, 01, 11|time-of-am-pm, 2 cifre|
    |m|0, 00, 59|minut-of-time, ethvert antal cifre|
    |mm mm|00, 59|minut-of-time, 2 cifre|
    |s s s|0, 00, 59|sekund-of-minutters, ethvert antal cifre|
    |ss|00, 59|2 cifre|
    |S S S S|0, 000, 9, 999|fraktionsaf-sekund, som hvis følgende et decimalpunkt, ethvert antal cifre|
    |SS SS|00, 99|hundredevis af en anden, 2 cifre|
    |SSS|000, 999|tusindvis af en anden, 3 cifre|
    |A A A A A A|0, 0000, 86399999|millisekunder-of-day, ethvert antal cifre|
    |AAAAAA|00000000, 86399999|millisekunder-of-day, 8 cifre|
    |N|0, 00000000000000, 86399999999999999|nanosekund-of-day, ethvert antal cifre. I nærheden af In In In In In In In In In In In In In InERDDAP™, dette er afkortet til nMillis.|
    |NNNNNNNNNN|00000000, 86399999999999999|nanosekund-of-day, 14 cifre. I nærheden af In In In In In In In In In In In In In InERDDAP™Dette afkortes til nMillis.|
    |n n n n|0, 00000000000, 59999999999|nanosekund-of-kunder, ethvert antal cifre. I nærheden af In In In In In In In In In In In In In InERDDAP™Dette afkortes til nMillis.|
    |I nærheden af nnnnnnnnnn|00000000000, 59999999999|nanosekund-of-kunder, 11 cifre. I nærheden af In In In In In In In In In In In In In InERDDAP™Dette afkortes til nMillis.|
    |XXX, ZZZ|Z, -03:00, +01:00|en tidszone med formatet 'Z' eller ± (2 cifre time offset) : (2 cifret minut offset) . Denne godbidder *rumplads* som + (ikke-standard) . ZZZ understøtter 'Z' er ikke-standard, men tilbyder en fælles brugerfejl.|
    |XX, ZZ|Z -0800, +0100|en tidszone med formatet 'Z' eller ± (2 cifre time offset) : (2 cifret minut offset) . Denne godbidder *rumplads* som + (ikke-standard) . ZZ understøtter 'Z' er ikke-standard, men tilbyder en fælles brugerfejl.|
    |X, Z|Z, -08, +01|en tidszone med formatet 'Z' eller ± (2 cifre time offset) : (2 cifret minut offset) . Denne godbidder *rumplads* som + (ikke-standard) . Z understøtter 'Z' er ikke-standard, men tilbyder en fælles brugerfejl.|
    |xxx|\\-08:00, +01.00|en tidszone med formatet ± (2 cifre time offset) : (2 cifret minut offset) . Denne godbidder *rumplads* som + (ikke-standard) .|
    |xx|\\-0800, +0100|en tidszone med formatet ± (2 cifre time offset)  (2 cifret minut offset) . Denne godbidder *rumplads* som + (ikke-standard) .|
    |x x x x|\\-08, +01|en tidszone med formatet ± (2 cifre time offset) . Denne godbidder *rumplads* som + (ikke-standard) .|
    |''|'T', 'Z', 'GMT'|start og slut af en serie af bogstavelige tegn|
    |'' '' (to enkelt citater)  |'' ''|to enkelt citat noterer et bogstavligt enkelt citat|
    | \\[\\] | \\[ \\] |start (" " " "\\[" " " ") og slut (" " " "\\]" " " ") af en valgfri sektion. Denne notation understøttes kun til bogstavelige tegn og i slutningen af formatstrengen.|
    |#, &#123;, &#125;|#, &#123;, &#125;|forbeholdt fremtidig brug|
    |G,L,Q,e,c,V,z,O,p|     |Disse formateringstegn understøttes afJava's DateTimeFormatter, men i øjeblikket ikke understøttet afERDDAP. Hvis du har brug for støtte til dem, kan du sende en e-mail til Chris. John på noaa.gov .|
    
Noter:
    
    * I en dato med tegnsætning kan numeriske værdier have et variabelt antal cifre (f.eks. i US slash dato format "1/2/1985", måneden og datoen kan være 1 eller 2 cifre) så formatet skal bruge 1-brev tokens, f.eks. M/d/yyyyyyyyyyyyy, som accepterer en række cifre i måned og dato.
    * Hvis antallet af cifre for et produkt er konstant, f.eks. 01/02/1985, skal du angive antallet af cifre i formatet, f.eks. MM/dd/yyyyyyyyyyyyyy for 2-cifret måned, 2-cifret dato og 4 cifret år.
    * Disse formater er vanskelige at arbejde med. Et givet format kan arbejde for de fleste, men ikke alle, tidsstrenge til en given variabel. Tjek altid, at det format, du angiver, fungerer som forventet iERDDAPfor alle en variabel tidsstrenge.
    * Når det er muligt, vil GenererDatasetXml foreslå tidsformat strenge.
    * Hvis du har brug for hjælp til at generere en formatstreng, bedes du kontakte Chris. John på noaa.gov .

De vigtigste datavariable (for tabulære datasæt) og den vigtigste tids akse variabel (til gitterede datasæt) anerkendes af[destinationName](#destinationname)tid. Deres enheds metadata skal være en UDUnits-kompatible enheder streng for numeriske tidsværdier, f.eks. "dage siden 1970-01" (for tabulerede datasæt) eller[enheder, der er egnet til strenge tider](#string-time-units), f.eks. "M/d/yyyyyyyyyyy" (for tabulære datasæt) .

Forskellige timeenheder i forskellige Gridded.ncFiler - filer - Hvis du har en samling af gitterded.ncfiler, hvor, for den tidsvariable, en del af filerne bruger forskellige tidsenheder end en eller flere andre delsæt af filerne, kan du bruge[EDDGridFraNcFilesUnpakke](#eddgridfromncfilesunpacked). Det konverterer tidsværdier til"seconds since 1970-01-01T00:00:00Z"på et lavere niveau og dermed skjule forskellene, så du kan lave et datasæt fra samlingen af hæterogenelige filer.

###### TimeStamp Varer{#timestamp-variables} 
[TimeStamp Varer](#timestamp-variables)-- Alle andre variable (axisVariableeller eller ellerdataVariable, i enEDDGrideller EDDTable datasæt) kan være en timeStamp variabel. Timestamp variabler er variabler, der har tidsrelaterede enheder og tidsdata, men har en&lt;destinationName&gt; andet end tid. TimeStamp variabler opfører sig som den vigtigste tidsvariable i, at de konverterer kildens tidsformat til"seconds since 1970-01-01T00:00:00Z"og/eller ISO 8601:2004 (E) format).ERDDAP™anerkender tid Stamp variabler af deres tidsrelaterede "[enheder](#units)" metadata, som skal matche dette regulære udtryk "\\[a-zA-Z\\]+ + +since +\\[0-9\\].+" (for numeriske dato Tider, for eksempel"seconds since 1970-01-01T00:00:00Z") eller være en dato Tidsformatstreng med "uuuu", "yyyyy" eller "YYYY" (for eksempel "yyyy-MM-dd'T'HH:mm:ssZ") . Men brug stadigdestinationName "time"for den vigtigste dato Tidsvariable.

 **Tjek altid dit arbejde for at være sikker på, at de tidsdata, der vises iERDDAP™er den korrekte tidsdata.** At arbejde med tiden data er altid vanskelig og fejlprone.

Se endnu[mere information om tidsvariabler](#destinationname).
ERDDAP™har et værktøj til[Konverter en Numeric Tid til/fra en streng tid](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
Se endnu[Sådan kan duERDDAP™Tilbud med Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** eller **valid\\_min** og og og **valid\\_max** ](#valid_range)-- Disse er OPTIONAL variable attributter defineret i[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadatakonventioner. For eksempel,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

eller eller eller

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Hvis det er til stede, skal de være af samme datatype som variablen og angive de gyldige minimums- og maksimumværdier for den variable. Brugere bør overveje værdier uden for dette område for at være ugyldig.
    *   ERDDAP™gælder ikkevalid\\_range. Sig til en anden måde:ERDDAP™konverterer ikke dataværdier uden for datavalid\\_rangetil \\_Fill Værdi eller værdimissing\\_value.ERDDAP™Bare gå på denne metadata og forlader programmet op til dig.
Hvorfor? Det er, hvad disse metadata er for. Hvis dataudbyderen havde ønsket, kunne dataudbyderen have konverteret dataværdierne uden for dataudbyderenvalid\\_rangeat være \\_FillValues.ERDDAP™Ikke andet gætte dataudbyderen. Denne tilgang er sikrere: hvis den senere vises, at denvalid\\_rangevar for smal eller forkert,ERDDAP™Har ikke forældede dataene.
    * Hvis dataene er pakket med[scale\\_factorog/elleradd\\_offset](#scale_factor),valid\\_range,valid\\_minog og ogvalid\\_maxbør være den pakkede datatype og værdier. SidenERDDAP™gælderscale\\_factorog og ogadd\\_offsetnår det indlæser datasættet,ERDDAP™vil pakke pakkenvalid\\_range,valid\\_minog og ogvalid\\_maxværdier, så destinationsmet metadata (vist til brugere) vil angive den pakkede datatype og rækkevidde.
Eller hvis en upakket\\_valid\\_rangeattribut er til stede, det vil blive omdøbtvalid\\_rangenår du nårERDDAP™indlæser datasættet.
##### &lt;Fjern MVRows&gt;{#removemvrows} 
* [ [] ** &lt;Fjern MVRows&gt; ** Særkegle (#fjerner) er en OPTIONAL tag inden for et tag idatasets.xmlfor EDDTableFraFiles (herunder alle underklasser) Datasets, selvom det kun bruges til EDDTableFraMultidimNcFiles. Det kan have en værdi af sand eller falsk. For eksempel sandt
Dette fjerner enhver blokering af rækker i slutningen af en gruppe, hvor alle værdier ermissing\\_value, \\_FillValue, eller CoHort...Array indfødte manglende værdi (eller char=#32 for CharArrays) . Dette er for CF DSG Multidimensional Array fil type og lignende filer. Hvis det er tilfældet, er det den rigtige test og så altid indlæser alle de maksimale udsving, så det kan tage ekstra tid.
Standardværdien af er falsk.
Anbefaling -- Hvis det er muligt for dine datasæt, anbefaler vi, at du indstiller fjernerMVRows til falsk. Indstilling af fjerneMVRows til sand kan betydeligt langsomme anmodninger, selvom det kan være nødvendigt for nogle datasæt.
