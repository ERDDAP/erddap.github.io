---
title: "ERDDAP™ - Working with the datasets.xml File"
sidebar_position: 3
---
# Werken met dedatasets.xmlBestand

\\[Deze webpagina zal alleen interessant zijn voorERDDAP™beheerders.\\]

Nadat u deERDDAP™ [installatie-instructies](/docs/server-admin/deploy-install), moet u dedatasets.xmlbestand in *kat* /content/erdap/ om de datasets te beschrijven die uwERDDAP™installatie zal dienen.

U kunt een voorbeeld zien[datasets.xmlop GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).

- -

## [Inleiding](#introduction) {#introduction} 

### Enkele montage vereist{#some-assembly-required} 
Een dataset instellen inERDDAP™is niet alleen een kwestie van verwijzen naar de directory of URL van de dataset. Je moet een stuk XML schrijven voordatasets.xmldie de dataset beschrijft.

* Voor gerasterde datasets, om de dataset conform te maken metERDDAP's datastructuur voor gerasterde gegevens, moet je een subset van de variabelen van de dataset identificeren die dezelfde dimensies delen. ([Waarom?](#why-just-two-basic-data-structures) [Hoe?](#dimensions)) 
* De huidige metagegevens van de dataset worden automatisch geïmporteerd. Maar als je die metadata wilt wijzigen of andere metadata wilt toevoegen, moet je het specificeren indatasets.xml. EnERDDAP™andere metagegevens nodig, waaronder[globale attributen](#global-attributes)  (zoalsinfoUrl, instelling,sourceUrl, samenvatting en titel) en[variabele attributen](#variable-addattributes)  (zoalslong\\_nameen eenheden) . Net zoals de metadata die momenteel in de dataset is toegevoegd beschrijvende informatie aan de dataset, de metadata gevraagd doorERDDAP™voegt beschrijvende informatie toe aan de dataset. De extra metadata is een goede aanvulling op uw dataset en helptERDDAP™doen een betere taak van het presenteren van uw gegevens aan gebruikers die niet bekend zijn met het.
*   ERDDAP™moet u speciale dingen te doen met de[lengtegraad, breedtegraad, hoogte (of diepte) , en tijdvariabelen](#destinationname).

Als je in deze ideeën gelooft en de moeite doet om de XML te maken voordatasets.xml, krijgt u alle voordelen vanERDDAP™, waaronder:

* Volledige tekst zoeken naar datasets
* Datasets zoeken per categorie
* Gegevenstoegangsformulieren ( *datasetID* .html) zodat u een subset van gegevens in veel verschillende bestandsformaten kunt aanvragen
* Formulieren om grafieken en kaarten aan te vragen ( *datasetID* .graph) 
* Webkaartdienst (WMS) voor gerasterde datasets
*   RESTfultoegang tot uw gegevens

Dedatasets.xmlvergt aanzienlijke inspanning voor de eerste paar datasets, maar **Het wordt makkelijker.** . Na de eerste dataset kunt u vaak veel van uw werk opnieuw gebruiken voor de volgende dataset. Gelukkig,ERDDAP™komt met twee[Hulpmiddelen](#tools)om u te helpen de XML te maken voor elke dataset indatasets.xml.
Als je vastzit, zie je onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).

### Gegevensaanbieder Formulier{#data-provider-form} 
Wanneer een data provider komt naar u in de hoop om sommige gegevens toe te voegen aan uwERDDAP, het kan moeilijk en tijdrovend zijn om alle metagegevens te verzamelen (informatie over de dataset) nodig om de dataset toe te voegen aanERDDAP. Veel gegevensbronnen (bijvoorbeeld .csv-bestanden, Excel-bestanden, databases) geen interne metadata hebben, dusERDDAP™heeft een Data Provider Form dat metadata verzamelt van de dataprovider en geeft de gegevensprovider enige andere begeleiding, waaronder uitgebreide begeleiding voor[Gegevens in databases](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). De ingediende informatie wordt omgezet in dedatasets.xmlformaat en vervolgens gemaild naar deERDDAP™beheerder (u) en geschreven (bijlage) tot *bigParentDirectory* /logs/dataProviderForm.log . Dus, de vorm semi-automatiseert het proces van het krijgen van een dataset inERDDAP, maar deERDDAP™De beheerder moet dedatasets.xmlbrok en omgaan met het verkrijgen van het gegevensbestand (s) van de aanbieder of verbinding met de database.

De indiening van actuele gegevensbestanden van externe bronnen is een enorm veiligheidsrisico, dusERDDAP™Daar gaat het niet om. Je moet een oplossing bedenken die voor jou en de dataprovider werkt, bijvoorbeeld e-mail (voor kleine bestanden) , trek uit de wolk (bijvoorbeeld DropBox of Google Drive) , een sftp site (met wachtwoorden) , of sneaker Netto (een USB-stick of externe harde schijf) . Je moet waarschijnlijk alleen bestanden accepteren van mensen die je kent. U moet de bestanden op virussen scannen en andere veiligheidsmaatregelen nemen.

Er is geen link inERDDAP™naar het formulier van de gegevensaanbieder (Ik zou de Commissie willen vragen of zij bereid is om deERDDAP™startpagina) . In plaats daarvan, wanneer iemand je vertelt dat ze willen dat hun gegevens worden bediend door uwERDDAPJe kunt ze een e-mail sturen waarin staat:
Ja, we kunnen uw gegevens inERDDAP. Om te beginnen, vul het formulier op https://*yourUrl*/erddap/dataProviderForm.html   (ofhttp://alshttps://is niet ingeschakeld) .
Als je klaar bent, neem ik contact met je op voor de laatste details.
Als je gewoon naar het formulier wilt kijken (zonder het in te vullen) , zie je het formulier opERD'sERDDAP:[Inleiding](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html),[Deel 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html),[Deel 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html),[Deel 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html)en[Deel 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). Deze links naar deERD ERDDAP™stuur informatie naar mij, niet naar jou, dus stuur geen informatie met hen, tenzij je daadwerkelijk gegevens wilt toevoegen aan deERD ERDDAP.

Als u het Data Provider Form wilt verwijderen uit uwERDDAP™, put
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
in uw setup.xml bestand.

De aanzet daartoe wasNOAA's 2014[Toegang van het publiek tot onderzoeksresultaten (PARR) richtlijn](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf), dat vereist dat alleNOAAmilieugegevens die worden gefinancierd uit belastinggeld worden beschikbaar gesteld via een datadienst (niet alleen bestanden) binnen 12 maanden na de schepping. Er is dus meer interesse in het gebruikERDDAP™datasets ASAP beschikbaar te stellen via een service. We hadden een efficiëntere manier nodig om met een groot aantal dataleveranciers om te gaan.

Feedback/Suggesties? Dit formulier is nieuw, dus e-mailerd dot data at noaa dot govals u feedback of suggesties heeft om dit te verbeteren.

### Hulpmiddelen{#tools} 
ERDDAP™wordt geleverd met twee command line programma's die tools zijn om u te helpen de XML voor elke dataset die u wiltERDDAP™Om te dienen. Als je eenmaal klaar bentERDDAP™en run het (ten minste één keer) , kunt u deze programma's vinden en gebruiken in de *kat* /webapps/erddap/WEB-INF directory. Er zijn Linux/Unix shellscripts (met de extensie .sh) en Windows-scripts (met de extensie .bat) voor elk programma.\\[Op Linux, voer deze tools uit als dezelfde gebruiker (Tomcat?) Dat zal Tomcat runnen.\\]Als je elk programma uitvoert, zal het je vragen stellen. Typ voor elke vraag een antwoord en druk op Enter. Of druk op ^C om een programma op elk moment te verlaten.

#### Het programma loopt niet?{#program-wont-run} 

* Als u een onbekend programma krijgt (of vergelijkbaar) foutmelding, het probleem is waarschijnlijk dat het besturingssysteem niet kon vindenJava. Je moet uitzoeken waarJavais op uw computer, dan bewerken van de java referentie in het .bat of .sh bestand dat u probeert te gebruiken.
* Als je een potbestand niet gevonden of klasse niet gevonden foutmelding, danJavakon niet vinden een van de klassen vermeld in het .bat of .sh bestand dat u probeert te gebruiken. De oplossing is om erachter te komen waar dat .jar bestand is, en bewerk de java verwijzing ernaar in het .bat of .sh bestand.
* Als u een versie vanJavadat is te oud voor een programma, het programma zal niet lopen en je ziet een foutmelding zoals
Uitzondering in draad "main" java.lang.Niet-ondersteunde klasseVersieFout:
     *aantal/klasse/naam* : Niet ondersteund major.minor versie *someNumber*   
De oplossing is het bijwerken van de meest recente versie vanJavaen zorg ervoor dat het .sh of .bat bestand voor het programma wordt gebruikt.

#### Het gereedschap drukt verschillende kenmerkende berichten af:{#the-tools-print-various-diagnostic-messages} 

* Het woord "ERROR" wordt gebruikt wanneer er iets zo fout ging dat de procedure niet is voltooid. Hoewel het vervelend om een fout te krijgen, de fout dwingt u om te gaan met het probleem.
* Het woord "WARNING" wordt gebruikt wanneer er iets mis ging, maar de procedure kon worden voltooid. Deze zijn vrij zeldzaam.
* Al het andere is een informatieve boodschap. U kunt toevoegen \\-verbose aan de[GenererenDatasetsXml](#generatedatasetsxml)of[DasDds](#dasdds)commandoregel om extra informatieve berichten te krijgen, die soms helpt problemen op te lossen.

De twee tools zijn een grote hulp, maar je moet nog steeds al deze instructies op deze pagina zorgvuldig lezen en zelf belangrijke beslissingen nemen.

### GenererenDatasetsXml{#generatedatasetsxml} 
*    **GenererenDatasetsXml** is een commandoregel programma dat een ruwe versie van de dataset XML kan genereren voor bijna elk type dataset.
    
Wij STRONGLY BEVESTIGEN dat u GenerateDatasets gebruikt Xml in plaats van brokken te maken vandatasets.xmlmet de hand omdat:
    
    * GenererenDatasets Xml werkt in seconden. Dit met de hand doen is minstens een uur werk, zelfs als je weet wat je doet.
    * GenererenDatasets Xml doet het beter. Dit met de hand doen vereist uitgebreide kennis van hoeERDDAP™Werkt. Het is onwaarschijnlijk dat u het beter met de hand zult doen. (Bob Simons gebruikt altijd GenerateDatasets Xml voor het eerste ontwerp, en hij schreefERDDAP.) 
    * GenererenDatasets Xml genereert altijd een geldig brok vandatasets.xml. Elke brok vandatasets.xmldie u schrijft zal waarschijnlijk hebben op zijn minst een paar fouten die voorkomenERDDAP™van het laden van de dataset. Het duurt vaak uren om deze problemen te diagnosticeren. Verspil je tijd niet. Aanmaken Datasets Xml doet het harde werk. Dan kun je de .xml met de hand verfijnen als je wilt.
    
Wanneer u de GenerateDatasets gebruikt Xml-programma:
    
    * Op Windows, de eerste keer dat je GenerateDatasetsXml draait, moet je het GenerateDatasetsXml.bat bestand bewerken met een teksteditor om het pad naar de java te wijzigen. exe-bestand zodat Windows kan vindenJava.
    * GenererenDatasets Xml vraagt u eerst het EDDType op te geven (Erd Dap Dataset Type) van de dataset. Zie[Lijst van type gegevensverzameling](#list-of-types-datasets)  (in dit document) uit te zoeken welk type geschikt is voor de dataset waaraan u werkt. Naast de reguliere EDDTypes, zijn er ook een paar[Speciale/Pseudo-datasettypes](#specialpseudo-dataset-types)  (b.v., een die een THREDDS catalogus kruipt om een brok vandatasets.xmlvoor elk van de datasets in de catalogus) .
    * GenererenDatasets Xml stelt u dan een reeks vragen specifiek voor dat EDDType. De vragen verzamelen de informatie die nodig is voorERDDAP™toegang tot de bron van de dataset. Om te begrijpen watERDDAP™vraagt, zie de documentatie voor het EDDType dat u opgegeven door te klikken op hetzelfde dataset type in de[Lijst van type gegevensverzameling](#list-of-types-datasets).
        
Als u een tekenreeks met speciale tekens moet invoeren (b.v. witruimte-tekens aan het begin of het einde, niet-ASCII-tekens) , voer een[JSON-stijl tekenreeks](https://www.json.org/json-en.html)  (met speciale tekens ontsnapt met \\ tekens) . Bijvoorbeeld, om slechts een tabteken in te voeren, voer "\\t" in (met de omliggende dubbele aanhalingstekens, dieERDDAP™Dat dit een JSON-stijl string is.
        
    * Vaak, een van uw antwoorden zal niet zijn wat GenererenDatasetsXml nodig heeft. U kunt dan opnieuw proberen, met herziene antwoorden op de vragen, tot GenerateDatasets Xml kan de brongegevens met succes vinden en begrijpen.
    * Als u de vragen correct beantwoordt (of voldoende correct) , GenererenDatasets Xml zal verbinding maken met de bron van de dataset en basisinformatie verzamelen (bijvoorbeeld variabele namen en metagegevens) .
Voor datasets die afkomstig zijn van lokaleNetCDF .ncen gerelateerde bestanden, GenererenDatasets Xml zal vaak de nudump-achtige structuur van het bestand afdrukken nadat het eerst het bestand leest. Dit kan u informatie geven om de vragen beter te beantwoorden op een volgende lus via GenerateDatasetsXml.
    * GenererenDatasets Xml zal dan een ruwe versie van de dataset XML voor die dataset genereren.
    * Diagnostische informatie en het ruwe ontwerp van de dataset XML zal worden geschreven naar *bigParentDirectory* /logs/GenerateDatasetsXml.log .
    * Het ruwe ontwerp van de dataset XML zal worden geschreven naar *bigParentDirectory* /logs/GenerateDatasetsXml.out .
#### "0 bestanden" Foutmelding{#0-files-error-message} 
Als u GenerateDatasets draait Xml of[DasDds](#dasdds), of als u probeert eenEDDGridVan...Bestanden of EDDtableVan... Bestandendataset inERDDAP™, en je krijgt een "0 bestanden" foutmelding die aangeeft datERDDAP™0 overeenkomende bestanden in de map gevonden (als je denkt dat er overeenkomende bestanden in die map zijn) :
* Controleer of u de volledige naam van de map hebt opgegeven. En als je de sample bestandsnaam hebt opgegeven, zorg ervoor dat je de volledige naam van het bestand hebt opgegeven, inclusief de volledige mapnaam.
* Controleer of de bestanden echt in die map zitten.
* Controleer de spelling van de mapnaam.
* Controleer het bestandNameRegex. Het is heel makkelijk om fouten te maken met regexes. Voor testdoeleinden, probeer de regex .\\* die moet overeenkomen met alle bestandsnamen. (Zie dit[regex documentatie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)en[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
* Controleer of de gebruiker die het programma uitvoert (bv. gebruiker=tomcat (?) voor Tomcat/ERDDAP) heeft 'lezen' toestemming voor die bestanden.
* In sommige besturingssystemen (bijvoorbeeld, SELinux) en afhankelijk van de systeeminstellingen, moet de gebruiker die het programma uitvoerde 'lezen' toestemming hebben voor de hele keten van directories die leidt naar de directory die de bestanden heeft.


* Als je problemen hebt die je niet kunt oplossen,[steun vragen](/docs/intro#support)met zoveel mogelijk informatie. Op dezelfde manier, als het lijkt dat het juiste EDDType voor een bepaalde dataset niet werkt met die dataset, of als er geen geschikte EDDType, gelieve een bestand[probleem met GitHub](https://github.com/ERDDAP/erddap/issues)met de details (en een steekproefdossier indien relevant) .
         
#### U moet de uitvoer van GenerateDatasets bewerken Xml om het beter te maken.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* DISCLAIMER:
DE CHUNK VANdatasets.xmlMADE BE GenererenDatasets Xml is niet perfect. U moet de XML lezen en redigeren voordat u het in een openbaarERDDAP. GenererenDatasets Xml Relies over veel regels die niet altijd correct zijn. U bent verantwoordelijk voor het verzekeren van de overeenstemming van de XML die u toevoegt aanERDDAP'Sdatasets.xmlBestand.
    
     (Ik schreeuw niet. Om historische juridische redenen moeten disclaimers in alle maxima worden geschreven.) 
    
De output van GenerateDatasetsXml is een ruwe versie.
Je zult het bijna altijd moeten bewerken.
We hebben en blijven ons uiterste best doen om de output zo klaar mogelijk te maken, maar er zijn grenzen. Vaak is de benodigde informatie gewoon niet beschikbaar uit de bronmetadata.
    
Een fundamenteel probleem is dat we een computerprogramma vragen (GenererenDatasetsXml) om een taak uit te voeren waarbij, als je dezelfde taak aan 100 mensen gaf, je 100 verschillende resultaten zou krijgen. Er is geen enkel "rechts" antwoord. Uiteraard komt het programma het dichtst bij het lezen van Bob's gedachten (niet de jouwe) , maar toch, het is niet een volledig begrijpend AI programma, gewoon een stelletje heuristieken samen geplaveid om een AI-achtige taak te doen. (Die dag van een volledig begrepen AI programma mag dan komen, maar dat is nog niet gebeurd. Als/wanneer het gebeurt, kunnen wij mensen grotere problemen hebben. Wees voorzichtig met wat je wenst.) 
    
* Voor informatieve doeleinden toont de output de globale bronKenmerken en variabele bronKenmerken als commentaar.ERDDAP™combineert bronKenmerken enaddAttributes  (die voorrang hebben) om de gecombineerde Attributen die aan de gebruiker worden getoond. (En andere eigenschappen worden automatisch toegevoegd aan lengtegraad, breedtegraad, hoogte, diepte en tijdvariabelen wanneerERDDAP™maakt eigenlijk de dataset) .
     
* Als je een bron niet leuk vindtAttribuut, overschrijf het door een addAttribuut met dezelfde naam toe te voegen, maar een andere waarde (of geen waarde, als u het wilt verwijderen) .
     
* AlleaddAttributeszijn computer-gegenereerde suggesties. Bewerk ze&#33; Als je geen addAttribuut wilt, verander het dan.
     
* Als u er nog een wilt toevoegenaddAttributes, voeg ze toe.
     
* Als u eendestinationNameVerander het. Maar niet veranderen.sourceNames.
     
* U kunt de volgorde van dedataVariables of verwijder een van hen.


    * U kunt dan[DasDds](#dasdds)  (zie hieronder) om herhaaldelijk te testen van de XML voor die dataset om ervoor te zorgen dat de resulterende dataset verschijnt zoals u wilt dat het inERDDAP.
    * Voel je vrij om kleine wijzigingen aan dedatasets.xmlbrok die werd gegenereerd, bijvoorbeeld, leveren een betereinfoUrl, samenvatting of titel.
#### standaardnamen niet toevoegen{#donotaddstandardnames} 
Als u \\-doNotAddStandardNames als een commandoregel parameter wanneer u genereren uitvoeren Datasets Xml genereren Datasets Xml zal niet toevoegenstandard\\_nameaan deaddAttributesvoor andere variabelen dan de met naam genoemde variabelen: breedtegraad, lengtegraad, hoogte, diepte of tijd (die duidelijk zijnstandard\\_names) . Dit kan handig zijn als u de uitvoer van genereren Datasets Xml direct inERDDAP™zonder de uitvoer te bewerken, omdat genereren Datasets Xml gok vaakstandard\\_nameNiet juist. (Merk op dat we altijd aanraden dat u de uitvoer bewerkt voordat u deze gebruikt inERDDAP.) Het gebruik van deze parameter zal andere kleine gerelateerde effecten hebben omdat de geradenstandard\\_namewordt vaak gebruikt voor andere doeleinden, bijvoorbeeld om een nieuwelong\\_name, en om de kleurenbalk instellingen te maken.
#### Scripting{#scripting} 
Als alternatief voor het beantwoorden van de vragen interactief op het toetsenbord en looping om extra datasets te genereren, kunt u commandoregelargumenten leveren om alle vragen te beantwoorden om één dataset te genereren. GenererenDatasets Xml zal deze parameters verwerken, de uitvoer naar het uitvoerbestand schrijven en het programma verlaten.
        
Om dit in te stellen, gebruik eerst het programma in interactieve modus en schrijf je antwoorden op. Hier is een gedeeltelijk voorbeeld:
Stel dat je het script uitvoert: ./GenerateDatasetsXml.sh
Voer vervolgens: EDDTableFromAsciiFiles
Voer vervolgens: /u00/data/
Voer dan in: .\\*\\.asc
Voer vervolgens: /u00/data/sampleFile.asc in
Voer vervolgens: ISO-8859-1
        
Om dit op een niet-interactieve manier uit te voeren, gebruik deze opdrachtregel:
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles /u00/data/.\\*\\.asc /u00/data/sampleFile.asc ISO-8859-1
Dus in principe geef je alle antwoorden op de commandoregel.
Dit moet nuttig zijn voor datasets die vaak veranderen op een manier die het opnieuw draaien GenererenDatasets noodzakelijk maakt Xml (met nameEDDGridVan ThredsCatalog) .
        
Bijzonderheden:

* Als een parameter een spatie of een speciaal teken bevat, codeer dan de parameter als a[JSON-stijl tekenreeks](https://www.json.org/json-en.html), bijvoorbeeld, "mijn parameter met spaties en twee\\nlijnen."
* Als je een lege tekenreeks als parameter wilt opgeven, gebruik dan: niets
* Als u de standaardwaarde van een parameter wilt opgeven, gebruik dan: standaard
             
* GenererenDatasets Xml ondersteunt een -i *datasets XmlNaam* # *tagnaam* commandoregel parameter die de uitvoer invoegt in de opgegevendatasets.xmlbestand (de standaard is *kat* /content/erdap/datasets.xml) . GenererenDatasets Xml zoekt twee regels in datasets XmlNaam:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
en
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
en vervangt alles tussen die regels door de nieuwe inhoud, en verandert de enige Datetime.
* De -i schakelaar wordt alleen verwerkt (en wijzigingen indatasets.xmlworden alleen gemaakt) als u GenerateDatasets draait Xml met commandoregelargumenten die alle antwoorden op alle vragen voor één lus van het programma specificeren. (Zie 'Schrijven' hierboven.)   (Het denken is: Deze parameter is voor gebruik met scripts. Als u het programma in interactieve modus gebruikt (info op het toetsenbord typen) , je bent waarschijnlijk om een aantal onjuiste brokken van XML te genereren voordat u de degene die u wilt genereren.) 
* Als de begin- en eindregels niet worden gevonden, dan worden deze regels en de nieuwe inhoud direct vóór ingevoegd&lt;/erddapDatasets&gt;.
* Er is ook een -I (kapitaal i) switch voor testdoeleinden die hetzelfde werkt als -i, maar een bestand aanmaakt genaamddatasets.xml *Datumtijd* en maakt geen wijzigingen aandatasets.xml.
* GenererenDatasets niet uitvoeren Xml met -i in twee processen tegelijk. Er is een kans dat er slechts één set van veranderingen zal worden gehouden. Er kunnen ernstige problemen zijn. (bijvoorbeeld, beschadigde bestanden) .
    
Als u "GenerateDatasetsXml -verbose" gebruikt, zal het meer kenmerkende berichten afdrukken dan normaal.
    
#### Speciale/Pseudo-datasettypes{#specialpseudo-dataset-types} 
In het algemeen, de EDDType opties in GenerateDatasets Xml-match van de in dit document beschreven EDD-typen (zie[Lijst van type gegevensverzameling](#list-of-types-datasets)) en een genererendatasets.xmlbrok om een dataset aan te maken van één specifieke databron. Er zijn enkele uitzonderingen en speciale gevallen:
    
##### EDDGridVanErdap{#eddgridfromerddap} 
Dit EDDType genereert alledatasets.xmlbrokken nodig om te maken[EDDGridVanErdap](#eddfromerddap)datasets van alleEDDGriddatasets op afstandERDDAP. U heeft de optie om het origineel te behoudendatasetIDs (die sommigedatasetIDis al in uwERDDAP) of nieuwe namen genereren die uniek zullen zijn (maar zijn meestal niet zo menselijk leesbaar) .
     
##### EDDtabelVanErdap{#eddtablefromerddap} 
Dit EDDType genereert alledatasets.xmlbrokken nodig om te maken[EDDtabelVanErdap](#eddfromerddap)datasets van alle EDDTable datasets in een remoteERDDAP. U heeft de optie om het origineel te behoudendatasetIDs (die sommigedatasetIDis al in uwERDDAP) of nieuwe namen genereren die uniek zullen zijn (maar zijn meestal niet zo menselijk leesbaar) .
     
##### EDDGridVan ThredsCatalog{#eddgridfromthreddscatalog} 
Dit EDDType genereert alledatasets.xmlbrokken nodig voor alle van de[EDDGridVanDap](#eddgridfromdap)datasets die het kan vinden door recursief door een THREDDS te kruipen (sub) catalogus. Er zijn vele vormen van THREDDS catalogus URL's. Deze optie vereist een THREDDS .xml URL met /catalog/ erin, bijvoorbeeld,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml of
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(een verwante .html catalogus is op
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html , die niet aanvaardbaar is voorEDDGridVan ThreddsCatalog).
Als u problemen heeft metEDDGridVan Thredds catalogus:
* Zorg ervoor dat de URL die u gebruikt geldig is, inclusief /catalog/, en eindigt met /catalog.xml .
* Gebruik indien mogelijk een openbaar IP-adres (bijvoorbeeld, https://oceanwatch.pfeg.noaa.gov ) in de URL, geen lokaal numeriek IP-adres (bijvoorbeeld, https://12.34.56.78 ) . Als de THREDDS alleen toegankelijk is via het lokale numerieke IP-adres, kunt u [&lt;converteren naar PublicSourceUrl&gt;] (#converttopublicsourceurl) dusERDDAP™gebruikers zien het publieke adres, hoewelERDDAP™krijgt gegevens van het lokale numerieke adres.
* Als je problemen hebt die je niet kunt oplossen,[controleer de tips voor probleemoplossing](#troubleshooting-tips).
* De laagdrempelige code hiervoor gebruikt nu deUnidatanetcdf-java catalogus crawler code (Thredds. catalogusklassen) zodat het alle THREDDS-catalogi kan verwerken (wat verrassend complex kan zijn) DankzijUnidatavoor die code.
         
##### EDDGridLonPM180VanErdapCatalog{#eddgridlonpm180fromerddapcatalog} 
Dit EDDType genereert dedatasets.xmlte maken[EDDGridLonPM180](#eddgridlonpm180)datasets van alleEDDGriddatasets in eenERDDAPmet een lengtegraad van meer dan 180.
* Gebruik indien mogelijk een openbaar IP-adres (bijvoorbeeld, https://oceanwatch.pfeg.noaa.gov ) in de URL, geen lokaal numeriek IP-adres (bijvoorbeeld, https://12.34.56.78 ) . Indien deERDDAP™is alleen toegankelijk via het lokale numerieke IP-adres, kunt u gebruiken [&lt;converteren naar PublicSourceUrl&gt;] (#converttopublicsourceurl) dusERDDAP™gebruikers zien het publieke adres, hoewelERDDAP™krijgt gegevens van het lokale numerieke adres.
         
##### EDDGridLon0360VanErdapCatalog{#eddgridlon0360fromerddapcatalog} 
Dit EDDType genereert dedatasets.xmlte maken[EDDGridLon0360](#eddgridlon0360)datasets van alleEDDGriddatasets in eenERDDAPmet een lengtegraad van minder dan 0.
* Gebruik indien mogelijk een openbaar IP-adres (bijvoorbeeld, https://oceanwatch.pfeg.noaa.gov ) in de URL, geen lokaal numeriek IP-adres (bijvoorbeeld, https://12.34.56.78 ) . Indien deERDDAP™is alleen toegankelijk via het lokale numerieke IP-adres, kunt u gebruiken [&lt;converteren naar PublicSourceUrl&gt;] (#converttopublicsourceurl) dusERDDAP™gebruikers zien het publieke adres, hoewelERDDAP™krijgt gegevens van het lokale numerieke adres.
         
##### EDDsFromFiles{#eddsfromfiles} 
Gegeven een start directory, dit doorkruist de directory en alle subdirectories en probeert een dataset aan te maken voor elke groep gegevensbestanden die het vindt.
* Dit veronderstelt dat wanneer een dataset wordt gevonden, de dataset alle submappen omvat.
* Als een dataset wordt gevonden, zullen soortgelijke broers-mappen als aparte datasets worden behandeld (bijvoorbeeld, directory's voor de jaren negentig, de jaren 2000, de jaren 2010, zullen afzonderlijke datasets genereren) . Ze moeten gemakkelijk met de hand te combineren zijn -- verander gewoon de eerste datasets&lt;fileDir&gt; naar de oudermap en verwijder alle volgende broer-datasets.
* Dit zal alleen proberen om een brok vandatasets.xmlvoor het meest voorkomende type bestandsextensie in een map (.md5 niet meegerekend, wat wordt genegeerd) . Dus, gegeven een map met 10.ncbestanden en 5 .txt bestanden, een dataset zal worden gegenereerd voor de.ncAlleen bestanden.
* Dit veronderstelt dat alle bestanden in een map met dezelfde extensie in dezelfde dataset thuishoren. Als een map iets heeft.ncbestanden met SST-gegevens en sommige.ncbestanden met chlorofyl gegevens, slechts één monster.ncbestand wordt gelezen (SST? chlorofyl?) en slechts één dataset wordt gemaakt voor dat type bestand. Die dataset zal waarschijnlijk niet laden vanwege complicaties van het proberen om twee soorten bestanden in dezelfde dataset te laden.
* Als er minder dan 4 bestanden zijn met de meest voorkomende extensie in een directory, dan gaat dit ervan uit dat het geen gegevensbestanden zijn en gewoon de map overslaat.
* Als er 4 of meer bestanden in een map zitten, maar dit kan geen brok vandatasets.xmlvoor de bestanden (bijvoorbeeld een niet ondersteund bestandstype) , dit zal een[EDDtableFromFileNames](#eddtablefromfilenames)dataset voor de bestanden.
* Aan het einde van de diagnostiek dat dit schrijft naar het log bestand, net voor dedatasets.xmlBrokken, dit zal een tabel afdrukken met een samenvatting van informatie verzameld door alle subdirectories te doorlopen. De tabel zal elke subdirectory en geven het meest voorkomende type bestandsextensie, het totale aantal bestanden, en welk type dataset werd gemaakt voor deze bestanden (indien) . Als u geconfronteerd wordt met een complexe, diep geneste bestandsstructuur, overwegen het uitvoeren van GenerateDatasets Xml met EDDType=EDDsFromFiles om deze informatie te genereren,
* Deze optie kan niet een geweldige job van het raden van de beste EDDType voor een bepaalde groep van gegevensbestanden, maar het is snel, gemakkelijk, en de moeite waard om te proberen. Als de bronbestanden geschikt zijn, werkt het goed en is een goede eerste stap in het genereren van dedatasets.xmlvoor een bestandssysteem met veel submappen, elk met gegevensbestanden uit verschillende datasets.
         
##### EDDTableFromEML and EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Deze speciale EDDType genereert dedatasets.xmlom een[EDDtabelVanAsciiFiles](#eddtablefromasciifiles)dataset van elk van de tabellen beschreven in een[Ecologische metadatataal](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML-bestand. De variant "Batch" werkt op alle EML-bestanden in een lokale of externe map. Zie de aparte[documentatie voor EDDTableFromEML](/docs/server-admin/EDDTableFromEML).
     
##### EDDtableFromInPort{#eddtablefrominport} 
Deze speciale EDDType genereert dedatasets.xmlom een[EDDtabelVanAsciiFiles](#eddtablefromasciifiles)dataset van de informatie in een[inport-xml](https://inport.nmfs.noaa.gov/inport)bestand. Als je toegang kunt krijgen tot het brongegevensbestand (het inport-xml bestand moet aanwijzingen hebben waar het te vinden is) , kunt u een werkende dataset inERDDAP.

De volgende stappen schetsen hoe GenerateDatasets te gebruiken Xml met een inport-xml bestand om een werkende dataset in te krijgenERDDAP.

1. Zodra u toegang hebt tot het inport-xml bestand (als URL of lokaal bestand) : run GenerateDatasets Xml, geef EDDType=EDDtableFromInPort op, geef de inport-xml URL of volledige bestandsnaam op, geef aan welkeChild=0, en geef de andere gevraagde informatie op (indien bekend) . (Op dit moment hoeft u het brongegevensbestand niet te hebben of de naam ervan op te geven.) De welke Child=0 instelling vertelt GenerateDatasets Xml om de informatie voor **alle** van de&lt;entiteit-attribuut-informatie&gt;&lt;entiteit&gt; zit in het inport-xml bestand (als er) . Het drukt ook een samenvatting van achtergrondinformatie uit, inclusief alle download-url's die in het inport-xml bestand staan.
2. Kijk door al die informatie (inclusief de achtergrondinformatie die datasets genereren Xml-afdrukken) en bezoek de download-url (s) om te proberen het brongegevensbestand te vinden (s) . Als je het kunt vinden (Zij) download het (Zij) in een map die toegankelijk is voorERDDAP. (Als u geen brongegevensbestanden kunt vinden, heeft het geen zin om verder te gaan.) 
3. Genereren uitvoeren Datasets Xml weer.
Als het brongegevensbestand overeenkomt met een van de inport-xml bestanden&lt;entiteit-attribuut-informatie&gt;&lt;entiteit&gt;'s, geef aan welk Kind= *datEntity'sNummer*   (bv. 1, 2, 3, ...) .ERDDAP™zal proberen de kolomnamen in het brongegevensbestand aan te passen aan namen in de entiteitsinformatie, en zal vragen om eventuele discrepanties te accepteren/verwerpen/fixeren.
Of, als het inport-xml bestand geen&lt;entiteit-attribuut-informatie&gt;&lt;entiteit&gt;'s, geef aan welkeChild=0.
4. In het brok vandatasets.xmldat werd gemaakt door GenerateDatasets Xml, herziening van de [global&lt;addAttributes&gt;] (#global-attributes) indien nodig/gewenst.
5. In het brok vandatasets.xmldie werd gemaakt door GenerateDatasetsXml, voeg de [&lt;dataVariable&gt;] (#datavariabele) informatie indien nodig/verzocht om elk van de variabelen te beschrijven. Zorg ervoor dat u elke variabele correct identificeert
[&lt;sourceName&gt;] (#bronnaam)   (zoals het in de bron verschijnt) ,
[&lt;destinationName&gt;] (#bestemmingsnaam)   (met meer beperkingen op toegestane tekens dansourceName) ,
[&lt;eenheden&gt;] (#eenheden)   (vooral als het een[tijd- of tijdstempelvariabele](#timestamp-variables)waar de eenheden het formaat moeten specificeren) en
[&lt;missing\\_value&gt;] (#misting_value) ,
6. Wanneer u bijna klaar bent, gebruik herhaaldelijk de[DasDds](#dasdds)hulpmiddel om snel te zien of de gegevensset beschrijving geldig is en of de dataset zal verschijnen inERDDAP™zoals je wilt.
     

Het zou geweldig zijn als groepen die InPort gebruiken om hun datasets te documenteren ook zouden gebruikenERDDAP™de feitelijke gegevens beschikbaar te stellen:

*   ERDDAP™is een oplossing die nu kan worden gebruikt, zodat u kunt vervullenNOAA's[Toegang van het publiek tot onderzoeksresultaten (PARR) vereisten](https://nosc.noaa.gov/EDMC/PD.DSP.php)Niet op een vaag moment in de toekomst.
*   ERDDAP™stelt de werkelijke gegevens beschikbaar voor gebruikers, niet alleen voor de metagegevens. (Wat hebben metadata aan zonder gegevens?) 
*   ERDDAP™ondersteunt metadata (met name de eenheden van variabelen) , in tegenstelling tot sommige andere dataserver software wordt overwogen. (Wat heb je aan gegevens zonder metagegevens?) Om software te gebruiken die geen metadata ondersteunt is om de gegevens uit te nodigen om verkeerd begrepen en misbruikt te worden.
*   ERDDAP™is vrije en open-source software in tegenstelling tot sommige andere software wordt overwogen. Ontwikkeling vanERDDAP™is al betaald. Steun voorERDDAP™gebruikers zijn vrij.
*   ERDDAP's uiterlijk kan gemakkelijk worden aangepast om te reflecteren en markeren uw groep (nietERDofERDDAP) .
*   ERDDAP™biedt een consistente manier om toegang te krijgen tot alle datasets.
*   ERDDAP™kan gegevens lezen uit vele soorten gegevensbestanden en uit relationele databases.
*   ERDDAP™kan omgaan met grote datasets, waaronder datasets waar de brongegevens in veel gegevensbestanden zitten.
*   ERDDAP™gegevens naar vele soorten gegevensbestanden kunnen schrijven, op verzoek van de gebruiker, inclusief wetenschappelijke bestandstypen zoals netCDF, ESRI .csv, enODV .txt.
*   ERDDAP™kan aangepaste grafieken en kaarten van subgroepen van de gegevens, op basis van de specificaties van de gebruiker.
*   ERDDAP™kan omgaan met niet-data datasets zoals collecties van beeld, video, of audiobestanden.
*   ERDDAP™is geïnstalleerd en gebruikt op[meer dan 60 instellingen over de hele wereld](/#who-uses-erddap).
*   ERDDAP™wordt vermeld als een van de gegevensservers aanbevolen voor gebruik binnenNOAAin de[NOAAProcedurele richtlijn gegevenstoegang](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations), in tegenstelling tot sommige andere software wordt overwogen.
*   ERDDAP™is een product vanNMFS'NOAA, dus het gebruiken binnenNMFSenNOAAmoet een punt van trots voorNMFSenNOAA.

Geef alsjeblieftERDDAP™Een poging. Als u hulp nodig hebt, plaats dan een bericht in deERDDAP™Google groep.
     
##### addFillValueAttributes{#addfillvalueattributes} 
Deze speciale EDDType optie is geen datasettype. Het is een hulpmiddel dat \\_FillValue attributen kan toevoegen aan sommige variabelen in sommige datasets. Zie[addFillValueAttributes](#add-_fillvalue-attributes).
     
##### findDuplicate Tijd{#findduplicatetime} 
Deze speciale EDDType optie is geen datasettype. In plaats daarvan vertelt het GenerateDatasets Xml om te zoeken door een verzameling van gerasterd.nc  (en verwant) bestanden om een lijst van bestanden met dubbele tijdwaarden te vinden en af te drukken. Wanneer het kijkt naar de tijd waarden, het zet ze van de oorspronkelijke eenheden naar"seconds since 1970-01-01"in het geval dat verschillende bestanden verschillende eenheden strings gebruiken. U moet de startmap opgeven (met of zonder de trailing slash) , de bestandsnaam reguliere expressie (bv., .\\*\\.nc ) , en de naam van de tijd variabele in de bestanden.
     
##### nudump{#ncdump} 
Deze speciale EDDType optie is geen datasettype. In plaats daarvan vertelt het GenerateDatasets Xml om een[nudump](https://linux.die.net/man/1/ncdump)\\-achtige afdruk van een.nc,.ncml, of.hdfbestand. Het gebruikt de netcdf-java's[NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), wat een beperkter hulpmiddel is dan de C versie van NCdump. Als u deze optie gebruikt, zal GenerateDatasetsXml u vragen een van de opties te gebruiken: "-h" (kop) , "-c" (coördinaat vars) , "-vall" (standaard) , "-v var1;var2, "-v var1 (0,0:10,0:20) " Dit is nuttig omdat, zonder nudump is het moeilijk om te weten wat er in een.nc,.ncml, of.hdfbestand en dus welk EDDType u moet specificeren voor GenerateDatasets Xml. Voor een.ncml bestand, dit zal de nudump uitvoer voor het resultaat van de.ncml bestandswijzigingen toegepast op de onderliggende.ncof.hdfbestand.
         
### DasDds{#dasdds} 
*   [ **DasDds** ](#dasdds)is een commandoregel programma dat je kunt gebruiken nadat je een eerste poging hebt gedaan om de XML voor een nieuwe dataset indatasets.xml. Met DasDds kunt u de XML herhaaldelijk testen en verfijnen. Wanneer u het DasDds programma gebruikt:
    1. Op Windows, de eerste keer dat je DasDds draait, moet je de DasDds bewerken. bat-bestand met een teksteditor om het pad naar de java te veranderen. exe-bestand zodat Windows kan vindenJava.
    2. DasDds vraagt u om dedatasetIDvoor de dataset waaraan u werkt.
    3. DasDds probeert de dataset te maken met diedatasetID.
        * DasDds drukt altijd veel kenmerkende berichten af.
Als u "DasDds -verbose" gebruikt, zal DasDds meer kenmerkende berichten afdrukken dan normaal.
        * Voor de veiligheid, DasDds verwijdert altijd alle gecachede dataset informatie (bestanden) voor de dataset alvorens de dataset aan te maken. Dit is het equivalent van a[harde vlag](/docs/server-admin/additional-information#hard-flag)Dus voor geaggregeerde datasets, kunt u het bestandNameRegex tijdelijk aanpassen om het aantal bestanden die de data constructeur vindt te beperken.
        * Als de dataset niet geladen wordt (om welke reden dan ook) , DasDds zal stoppen en u de foutmelding voor de eerste fout vindt.
             **Probeer niet te raden wat het probleem is. Lees het FOUT-bericht zorgvuldig door.**   
Lees indien nodig de voorafgaande diagnostische berichten om meer aanwijzingen en informatie te vinden.
        *    **Verander de XML van de dataset om dat probleem op te lossen**   
en laat DasDds proberen de dataset opnieuw aan te maken.
        *    **Als je herhaaldelijk elk probleem oplost, zul je uiteindelijk alle problemen oplossen.**   
en de dataset zal laden.
    4. Alle DasDds-uitvoer (diagnostiek en resultaten) zijn geschreven naar het scherm en naar *bigParentDirectory* /logs/DasDds.log .
    5. Als DasDds de dataset kan maken, zal DasDds u dan de[.das (Datasetattribuutstructuur) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das),[.dds (Datasetdescriptor Structuur) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds)en[.timeGaps (tijdsverschillen) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)informatie voor de dataset op uw scherm en schrijf ze naar *bigParentDirectory* /logs/DasDds.out .
    6. Vaak wil je een kleine verandering aanbrengen in de XML van de dataset om de metadata van de dataset op te ruimen en DasDds opnieuw te draaien.

### Bonus Hulpmiddel voor derde partijen:ERDDAP- Lint{#bonus-third-party-tool-erddap-lint} 
ERDDAP-lint is een programma van Rob Fuller en Adam Leadbetter van het Irish Marine Institute dat u kunt gebruiken om de metadata van uwERDDAP™datasets.ERDDAP-lint "bevat regels en een eenvoudige statische webapplicatie voor het uitvoeren van sommige verificatie testen tegen uwERDDAP™server. Alle tests worden uitgevoerd in de webbrowser." Zoals de[Unix/Linux-pijlgereedschap](https://en.wikipedia.org/wiki/Lint_(software)), kunt u de bestaande regels bewerken of nieuwe regels toevoegen. Zie[ERDDAP- Lint](https://github.com/IrishMarineInstitute/erddap-lint)voor meer informatie.

Deze tool is vooral nuttig voor datasets die je enige tijd geleden hebt gemaakt en wil nu up-to-date brengen met je huidige metadata voorkeuren. Bijvoorbeeld, vroege versies van GenerateDatasets Xml heeft geen moeite gedaan om wereldwijd te creërencreator\\_name,creator\\_email, maker\\_type, ofcreator\\_urlMetadata. Je zou kunnen gebruikenERDDAP-lint om de datasets te identificeren die die metadata kenmerken missen.

Met dank aan Rob en Adam voor het creëren van deze tool en het ter beschikking stellen van deERDDAP™Gemeenschap.
 
## De basisstructuur van hetdatasets.xmlBestand{#the-basic-structure-of-the-datasetsxml-file} 
De vereiste en optionele tags toegestaan in eendatasets.xmlbestand (en het aantal keren dat ze kunnen verschijnen) worden hieronder weergegeven. In de praktijkdatasets.xmlzal veel van&lt;dataset&gt;'s tags en gebruik alleen de andere tags binnen&lt;erddapDatasets&gt; indien nodig.

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

Het is mogelijk dat andere coderingen in de toekomst worden toegestaan, maar voorlopig wordt alleen ISO-8859-1 aanbevolen.
 
### XInclude{#xinclude} 
Nieuw in versie 2.25 is ondersteuning voor XInclude. Dit vereist dat u de SAX-parser gebruikt&lt;useSaxParser&gt;true&lt;/useSaxParser&gt; in uw setup.xml. Dit kan u toelaten om elke dataset te schrijven in zijn eigen bestand, dan nemen ze allemaal in de belangrijkstedatasets.xml, hergebruik delen van dataset definities, of beide. Als je een voorbeeld wilt zien,[EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)stelt XInclude in om variabele definities te hergebruiken.
 

- -

## Opmerkingen{#notes} 

Werken met dedatasets.xmlbestand is een niet-triviaal project. Lees al deze aantekeningen zorgvuldig door. Nadat u een[datasettype](#list-of-types-datasets), lees de gedetailleerde beschrijving ervan zorgvuldig.
     
### Het type gegevensverzameling kiezen{#choosing-the-dataset-type} 
In de meeste gevallen is er slechts éénERDDAP™datasettype dat geschikt is voor een bepaalde gegevensbron. In enkele gevallen (bv..ncbestanden) , er zijn een paar mogelijkheden, maar meestal een van hen is zeker het beste. De eerste en grootste beslissing die je moet nemen is: is het passend om de dataset te behandelen als een groep van multidimensionale arrays (Zo ja, zie de[EDDGriddatasets](#eddgrid)) of als database-achtige tabel van gegevens (Zo ja, zie de[EDDTable dataset types](#eddtable)) .
     
### Het serveren van de gegevens zoals is{#serving-the-data-as-is} 
Meestal is het niet nodig om de gegevensbron te wijzigen (Bijvoorbeeld, converteer de bestanden naar een ander bestandstype) zodatERDDAP™kan het dienen. Een van de veronderstellingen vanERDDAP™is dat de gegevensbron zal worden gebruikt zoals is. Meestal werkt dit prima. Enkele uitzonderingen zijn:
* Relationele databanken en Cassandra --ERDDAP™kan gegevens rechtstreeks uit relationele databases en Cassandra dienen. Maar voor beveiliging, load balancing, en prestaties problemen, kunt u ervoor kiezen om het opzetten van een andere database met dezelfde gegevens of opslaan van de gegevens opNetCDFv3.ncbestanden en hebbenERDDAP™dienen de gegevens van de nieuwe gegevensbron. Zie[EDDTableFromDatabase](#eddtablefromdatabase)en[EDDtabelVanCassandra](#eddtablefromcassandra).
* Niet ondersteunde gegevensbronnen --ERDDAP™kan een groot aantal soorten gegevensbronnen ondersteunen, maar de wereld is gevuld met 1000's (Miljoenen?) van verschillende gegevensbronnen (met name de structuren van het gegevensbestand) . AlsERDDAP™ondersteunt uw gegevensbron niet:
    * Als de gegevensbronNetCDF .ncbestanden, kunt u gebruiken[NcML](#ncml-files)om de gegevensbestanden on-the-fly te wijzigen of te gebruiken[NCO](#netcdf-operators-nco)om de gegevensbestanden permanent te wijzigen.
    * U kunt de gegevens schrijven naar een databrontype datERDDAP™steun.NetCDF-3.ncbestanden zijn een goede, algemene aanbeveling omdat het binaire bestanden dieERDDAP™kan heel snel lezen. Voor tabelgegevens, overwegen de gegevens op te slaan in een verzameling van.ncbestanden die de[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contigueuze Ragged Array data structuren en dus kan worden behandeld metERDDAP's[EDDtabelVanNcCFFiles](#eddtablefromnccffiles)). Als ze logisch georganiseerd zijn (elk met data voor een stuk ruimte en tijd) ,ERDDAP™kan gegevens uit hen zeer snel halen.
    * U kunt verzoeken dat ondersteuning voor die gegevensbron wordt toegevoegd aanERDDAP™door Chris te mailen. John bij Noaa.gov.
    * U kunt ondersteuning voor die gegevensbron toevoegen door de code zelf te schrijven. Zie[deERDDAP™Programmagids](/docs/contributing/programmer-guide)
* Snelheid --ERDDAP™kan gegevens uit sommige gegevensbronnen veel sneller lezen dan andere. Bijvoorbeeld, lezenNetCDFv3.ncbestanden is snel en het lezen van ASCII-bestanden is langzamer. En als er een grote (&gt;1000) of groot (&gt; 10.000) aantal brongegevensbestanden;ERDDAP™zal langzaam reageren op sommige gegevensverzoeken. Meestal is het verschil niet merkbaar voor mensen. Echter, als u denktERDDAP™is traag voor een gegeven dataset, kunt u ervoor kiezen om het probleem op te lossen door het schrijven van de gegevens naar een efficiëntere setup (meestal: een paar, goed gestructureerde,NetCDFv3.ncbestanden) . Voor tabelgegevens, zie[dit advies](#millions-of-files).
         
### Hint{#hint} 
Het is vaak gemakkelijker om de XML voor een dataset te genereren door een kopie te maken van een werkdatasetbeschrijving in dataset.xml en deze vervolgens aan te passen.
    
### Speciale tekens coderen{#encoding-special-characters} 
Sindsdatasets.xmlis een XML-bestand, u MOET[& Coderen](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"&," "&lt;", en "&gt;" in ongeacht welke inhoud als "&amp;," "&lt;" en "&gt;."
Fout:&lt;titel&gt; Tijd & tijd&lt;/titel&gt;
Rechts:&lt;titel&gt; Tijd &amp; Getijden&lt;/titel&gt;
     
### XML tolereert geen syntaxisfouten{#xml-doesnt-tolerate-syntax-errors} 
Nadat u de dataset.xml bestand bewerken, is het een goed idee om te controleren of het resultaat is[goed gevormde XML](https://www.w3schools.com/xml/xml_dtd.asp)door de XML-tekst in een XML-checker te plakken zoals[xmlvalidatie](https://www.xmlvalidation.com/).
     
### Tips voor het oplossen van problemen{#troubleshooting-tips} 
*    **Andere manieren om problemen met datasets diagnosticeren**   
Naast de twee belangrijkste[Hulpmiddelen](#tools),
    *   [log.txt](/docs/server-admin/additional-information#log)is een logbestand met alleERDDAPDe diagnoseberichten.
    * De[Dagelijks verslag](/docs/server-admin/additional-information#daily-report)heeft meer informatie dan de status pagina, inclusief een lijst van datasets die niet geladen en de uitzonderingen (fouten) Ze zijn gegenereerd.
    * De[Statuspagina](/docs/server-admin/additional-information#status-page)is een snelle manier om te controlerenERDDAP's status van elke webbrowser. Het bevat een lijst van datasets die niet geladen zijn (Hoewel niet de daarmee samenhangende uitzonderingen) en taakThread statistieken (waarin de voortgang van[EDDGridKopiëren](#eddgridcopy)en[EDDtabelkopie](#eddtablecopy)datasets en alle[EDDGridFromFiles](#eddgridfromfiles)of[EDDTableFromFiles](#eddtablefromfiles)datasets die gebruiken[cacheVanUrl](#cachefromurl)  (maar geen cache GrootteGB) ) .
    * Als je vastzit, zie je onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
         
### Bijzondere variabelen{#special-variables} 
*    **[Lengtegraad, breedtegraad, hoogte (of diepte) , en tijd (LLAT) variabele](#destinationname) [destinationName](#destinationname)Ze zijn speciaal.** 
    * In het algemeen:
        * LLAT variabelen worden bekend gemaakt aanERDDAP™als de asvariabele (voorEDDGriddatasets) of gegevensvariabele's (voor EDDTable datasets)  [destinationName](#destinationname)"lengtegraad," "breedte," "hoogte," "diepte," of"time".
        * Wij raden u sterk aan om deze standaardnamen waar mogelijk voor deze variabelen te gebruiken. Geen van hen is nodig. Als je deze speciale namen niet gebruikt,ERDDAP™Ze zullen hun betekenis niet herkennen. Bijvoorbeeld, LLAT variabelen worden behandeld speciaal door Make A Graph ( *datasetID* .graph) : als de X-as variabele "longitude" is en de Y-as variabele "breedte" is, krijg je een kaart (met een standaard projectie, met een landmasker, politieke grenzen, enz.) In plaats van een grafiek.
        *   ERDDAP™zal automatisch veel metadata toevoegen aan LLAT-variabelen (bijvoorbeeld "[ioos\\_category](#ioos_category)", "[eenheden](#units)", en verschillende normen-gerelateerde attributen zoals "\\_CoördinatedAxisType") .
        *   ERDDAP™zal automatisch, on-the-fly, veel globale metagegevens met betrekking tot de LLAT-waarden van de geselecteerde gegevenssubset toevoegen (bijvoorbeeld, "geospatial\\_lon\\_min") .
        * Klanten die deze metagegevensstandaarden ondersteunen, kunnen profiteren van de toegevoegde metagegevens om de gegevens in tijd en ruimte te positioneren.
        * Klanten zullen het gemakkelijker vinden om vragen te genereren die LLAT variabelen bevatten omdat de namen van de variabele hetzelfde zijn in alle relevante datasets.
    * Voor de variabele "lengtegraad" en de variabele "breedtegraad":
        * Gebruik de[destinationName](#destinationname)de "lengtegraad" en "breedtegraad" alleen indien de[eenheden](#units)zijn graden\\_oost en graden\\_Noord, respectievelijk. Als uw gegevens niet aan deze eisen voldoen, gebruik dan verschillende variabele namen (bijvoorbeeld, x, y, lonRadians, latRadians) .
        * Als u lengte- en breedtegraadgegevens hebt, uitgedrukt in verschillende eenheden en dus met verschillendedestinationNames, bijvoorbeeld, lonRadians en latRadians, Make A Graph ( *datasetID* .graph) zal grafieken maken (bijvoorbeeld, tijdreeks) In plaats van kaarten.
    * Voor de variabele "hoogte" en de variabele "diepte":
        * Gebruik de[destinationName](#destinationname)"hoogte" om de afstand van de gegevens boven zeeniveau te bepalen (positieve="up" waarden) . Optioneel kunt u "hoogte" gebruiken voor afstanden onder zeeniveau als de waarden negatief zijn onder zee (of als u bijvoorbeeld,
[&lt;att name="scale\\_factor"type="int"&gt;- 1&lt;/att&gt;] (#scale_factor) om dieptewaarden om te zetten in hoogtewaarden.
        * Gebruik dedestinationName"diepte" om de afstand van de gegevens onder zeeniveau te bepalen (positieve="down" waarden) .
        * Een dataset kan niet zowel "hoogte" als "diepte" variabelen hebben.
        * Voor deze variabele namen, de[eenheden](#units)moet "m," "meter" of "meters" zijn. Indien de eenheden verschillen (bijvoorbeeld, vadem) , kunt u gebruiken
[&lt;att name="scale\\_factor"&gt; *enkele Waarde* &lt;/att&gt;] (#scale_factor) en [&lt;att name="units"&gt;meters&lt;/att&gt;] (#eenheden) om de eenheden om te zetten in meters.
        * Als uw gegevens niet aan deze eisen voldoen, gebruik dan een anderedestinationName  (bijvoorbeeld bovenGround, afstand Onder) .
        * Als u de verticale CRS kent, geef dit dan op in de metagegevens, bijvoorbeeld "EPSG:5829" (momentane hoogte boven zeeniveau) , "EPSG:5831" (onmiddellijke diepte onder zeeniveau) , of "EPSG:5703" (NAVD88 hoogte) .
    * Voor de"time"variabele:
        * Gebruik de[destinationName](#destinationname) "time"alleen voor variabelen die de volledige datum+tijd bevatten (of datum, indien dat alles is) . Als er bijvoorbeeld aparte kolommen zijn voor datum en tijdOfDay, gebruik dan niet de variabele naam"time".
        * Zie[eenheden](#time-units)voor meer informatie over de eenheden attribuut voor tijd en tijdStamp variabelen.
        * De tijdvariabele en gerelateerde[tijd Stempelvariabelen](#timestamp-variables)zijn uniek in dat ze altijd gegevenswaarden converteren uit de bron tijdformaat (wat het ook is) in een numerieke waarde (seconden sinds 1970-01-01T00:00:00Z) of een tekenreekswaarde (ISO 8601:2004 (E) formaat) , afhankelijk van de situatie.
        * Wanneer een gebruiker tijdgegevens aanvraagt, kunnen zij deze aanvragen door de tijd te specificeren als een numerieke waarde (seconden sinds 1970-01-01T00:00:00Z) of een tekenreekswaarde (ISO 8601:2004 (E) formaat) .
        *   ERDDAP™heeft een hulpprogramma om[Een numeriek omzetten Tijd van/naar een tekenreekstijd](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        * Zie[HoeERDDAPOmgaan met tijd](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
            
### Waarom slechts twee basisgegevensstructuren?{#why-just-two-basic-data-structures} 
* Aangezien het moeilijk is voor menselijke klanten en computercliënten om te gaan met een complexe set van mogelijke datasetstructuren,ERDDAP™gebruikt slechts twee basisgegevensstructuren:
    * a[gerasterde gegevensstructuur](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (bijvoorbeeld voor satellietgegevens en modelgegevens) en
    * a[Tabelgegevensstructuur](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (bijvoorbeeld voor in-situ boei, station en trajectgegevens) .
* Zeker, niet alle gegevens kunnen worden uitgedrukt in deze structuren, maar veel ervan kan. Tabellen zijn met name zeer flexibele gegevensstructuren (kijk naar het succes van relationele database programma's) .
* Dit maakt gegevensqueries gemakkelijker te construeren.
* Dit maakt data reacties hebben een eenvoudige structuur, die het gemakkelijker maakt om de gegevens te dienen in een bredere verscheidenheid van standaard bestandstypen (die vaak alleen eenvoudige datastructuren ondersteunen) . Dit is de belangrijkste reden waarom wijERDDAP™Deze kant op.
* Dit maakt het ons op zijn beurt heel gemakkelijk. (of iemand anders) om client software te schrijven die met alles werktERDDAP™datasets.
* Dit maakt het gemakkelijker om gegevens uit verschillende bronnen te vergelijken.
* We zijn ons er zeer van bewust dat als u gewend bent om met gegevens te werken in andere datastructuren, u in eerste instantie denkt dat deze aanpak simplistisch of onvoldoende is. Maar alle datastructuren hebben tradeoffs. Geen enkele is perfect. Zelfs de do-it-all structuren hebben hun nadelen: werken met hen is complex en de bestanden kunnen alleen worden geschreven of gelezen met speciale software bibliotheken. Als u accepteertERDDAP's benadering genoeg om te proberen om te werken met het, kunt u merken dat het heeft zijn voordelen (met name de ondersteuning voor meerdere bestandstypen die de gegevensantwoorden kunnen bevatten) . De[ERDDAP™diavoorstelling](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (vooral de[dia van gegevensstructuren](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) Praat veel over deze kwesties.
* En zelfs als deze aanpak vreemd klinkt voor u, de meesteERDDAP™Klanten zullen het nooit merken -- ze zullen gewoon zien dat alle datasets een mooie eenvoudige structuur hebben en ze zullen dankbaar zijn dat ze gegevens kunnen krijgen van een grote verscheidenheid aan bronnen die in een breed scala aan bestandsformaten worden teruggegeven.
         
### Afmetingen{#dimensions} 
*    **Wat als de rastervariabelen in de bronset niet dezelfde asvariabelen delen?**   
InEDDGriddatasets, alle gegevensvariabelen MOET gebruiken (aandeel) alle asvariabelen. Dus als een brondataset een aantal variabelen heeft met één reeks dimensies, en andere variabelen met een andere reeks dimensies, moet je twee datasets maken inERDDAP. Bijvoorbeeld, je zou kunnen maken eenERDDAP™Dataset getiteld "Sommige titel (aan het oppervlak) " om variabelen vast te houden die gewoon gebruiken\\[tijd\\]\\[breedtegraad\\]\\[lengtegraad\\]afmetingen en maak een andereERDDAP™Dataset getiteld "Sommige titel (op diepten) " om de variabelen die gebruiken vast te houden\\[tijd\\]\\[Hoogte\\]\\[breedtegraad\\]\\[lengtegraad\\]. Of misschien kunt u de gegevensbron veranderen om een dimensie toe te voegen met een enkele waarde (bijvoorbeeld, hoogte=0) om de variabelen consistent te maken.
    
    ERDDAP™niet omgaan met meer ingewikkelde datasets (bijvoorbeeld modellen die een maas van driehoeken gebruiken) Goed. U kunt deze datasets inERDDAP™door twee of meer datasets aan te maken inERDDAP™  (zodat alle gegevensvariabelen in elke nieuwe dataset dezelfde reeks asvariabelen delen) , maar dat is niet wat gebruikers willen. Voor sommige datasets zou je kunnen overwegen om een reguliere gerasterde versie van de dataset te maken en dat naast de originele gegevens aan te bieden. Sommige client software kan alleen omgaan met een regelmatig raster, dus door dit te doen, bereikt u extra klanten.
     
    
### Geprojecteerde rastergegevens{#projected-gridded-data} 
Sommige gerasterde gegevens hebben een complexe structuur. Bijvoorbeeld satellietniveau 2 ("Along track") gegevens gebruiken geen eenvoudige projectie. Modellen (en andere) vaak werken met gerasterde gegevens over verschillende niet-cylindrische projecties (bijvoorbeeld, kegelsnede, polaire stereografische, tripolaire) of in ongestructureerde roosters (een complexere gegevensstructuur) . Sommige eindgebruikers willen deze gegevens zoals is, zodat er geen verlies van informatie. Voor die klanten,ERDDAP™kan de gegevens, zoals is, alleen dienen als deERDDAP™beheerder breekt de oorspronkelijke dataset in een paar datasets, waarbij elk deel variabelen bevat die dezelfde asvariabelen delen. Ja, dat lijkt vreemd voor de betrokken mensen en het is anders dan de meesteOPeNDAPservers. MaarERDDAP™benadrukt het beschikbaar stellen van de gegevens in vele formaten. Dat is mogelijk omdatERDDAP™gebruikt/vereist een meer uniforme gegevensstructuur. Hoewel het een beetje ongemakkelijk is (d.w.z. anders dan verwacht) ,ERDDAP™kan de geprojecteerde gegevens verspreiden.

\\[Ja.ERDDAP™kan lossere eisen voor de gegevensstructuur hebben, maar de eisen voor de outputformaten behouden. Maar dat zou leiden tot verwarring onder veel gebruikers, vooral nieuwkomers, omdat veel schijnbaar geldige verzoeken om gegevens met verschillende structuren ongeldig zouden zijn omdat de gegevens niet zouden passen in het bestandstype. We blijven terugkomen op het huidige systeem ontwerp.\\]

Sommige eindgebruikers willen gegevens in een lat lon cilindrische projectie zoals Equirectangular / plaatcarrée of Mercator) voor gebruiksgemak in verschillende situaties. Voor deze situaties moedigen wij deERDDAP™beheerder om andere software te gebruiken (NCO?Matlab? R? IDV? ...?) om de gegevens opnieuw te projecteren op een geografisch (Equilectangulaire projectie / plaatcarrée) of andere cilindrische projectie en dienen die vorm van de gegevens inERDDAP™als een andere dataset. Dit is vergelijkbaar met wat mensen doen wanneer ze satellietniveau 2 gegevens omzetten in niveau 3 gegevens. Een dergelijk instrument is[NCO](https://nco.sourceforge.net/nco.html#Regridding)die uitbreidingsopties biedt voor het herstellen van gegevens.

#### GIS- en herprojectiegegevens{#gis-and-reprojecting-data} 
Aangezien de GIS-wereld vaak kaartgericht is, bieden GIS-programma's meestal ondersteuning voor het opnieuw projecteren van de gegevens, d.w.z. het plotten van de gegevens op een kaart met een andere projectie.

Momenteel,ERDDAP™heeft geen instrumenten om gegevens te herprojecteren. In plaats daarvan raden wij u aan om een externe tool te gebruiken om een variant van de dataset te maken, waarbij gegevens van de oorspronkelijke vorm op een rechthoekige (lengtegraad) geschikt voorERDDAP.

Naar onze mening is het CF/DAPwereld is een beetje anders dan de GIS wereld en werkt op een iets lager niveau.ERDDAP™Dat weerspiegelt dat. In het algemeen,ERDDAP™is ontworpen om voornamelijk te werken met gegevens (geen kaarten) en wil niet veranderen (b.v. herprojecteren) Die gegevens. VoorERDDAP™, gerasterde gegevens worden vaak/meestal/bij voorkeur geassocieerd met lat lon waarden en een cilindrische projectie, en niet met de x,y waarden van een projectie. In ieder geval,ERDDAP™doet niets met de projectie van de gegevens; het geeft gewoon de gegevens door, zoals is, met zijn huidige projectie, op de theorie dat een herprojectie is een significante verandering in de gegevens enERDDAP™Wil niet betrokken zijn bij belangrijke veranderingen. Ook kunnen volgende gebruikers de gegevens naïef opnieuw projecteren, wat niet zo goed zou zijn als gewoon één herprojectie doen. (Dus, als deERDDAP™beheerder wil de gegevens bieden in een andere projectie, fijn; gewoon opnieuw projecteren van de gegevens offline en bieden dat als een andere dataset inERDDAP. Veel satellietdatasets worden aangeboden als wat NASA Niveau 2 noemt. (zwad) en als niveau 3 (Equilectangulaire projectie) versies.) WanneerERDDAP™maakt kaarten (rechtstreeks of viaWMSof KML) ,ERDDAP™Momenteel biedt alleen kaarten te maken met de Equirectangular / plaat carrée projectie die gelukkig wordt geaccepteerd door de meeste mapping programma's.

Wij moedigenERDDAP™beheerders om andere software te gebruiken (NCO?Matlab? R? IDV? ...?) om de gegevens opnieuw te projecteren op een geografisch (Equilectangulaire projectie / plaatcarrée) of andere cilindrische projectie en dienen die vorm van de gegevens inERDDAP™als een andere dataset. Dit is vergelijkbaar met wat mensen doen wanneer ze satellietniveau 2 gegevens omzetten in niveau 3 gegevens. Een dergelijk instrument is[NCO](https://nco.sourceforge.net/nco.html#Regridding)die uitbreidingsopties biedt voor het herstellen van gegevens.

Wij hopen datERDDAP™zal beschikken over ingebouwde instrumenten om kaarten met andere projecties in de toekomst aan te bieden. We hopen ook betere verbindingen te hebben met de GIS wereld in de toekomst (andere dan de stroomWMSdienst) . Het is verschrikkelijk dat in deze "moderne" wereld de banden tussen de CF/DAPDe wereld en de GIS wereld zijn nog steeds zo zwak. Beide dingen staan op de To Do lijst. (Als u wilt helpen, met name bij het verbindenERDDAP™MapServer, email Chris. John at noaa.gov .) 
    
### Gegevenstypen{#data-types} 
ERDDAP™ondersteunt de volgende gegevenstypes
 (de namen zijn hoofdlettergevoelig;'u'prefix staat voor "unsigned"; het aantal namen in andere systemen is het aantal bits) :

#### byte{#byte} 
*    **byte** heeft integer waarden getekend met een bereik van -128 tot 127.
In andere systemen wordt dit soms int8 genoemd.
Dit wordt "tinyint" genoemd door SQL en Cassandra.
    ERDDAP™converteert[booleaans](#boolean-data)uit sommige bronnen (bv. SQL en Cassandra) in bytes inERDDAP™met een waarde van 0=false, 1=true, en 127=missing\\_value.
#### ubyte{#ubyte} 
*    **ubyte** heeft ongesigneerde gehele waarden met een bereik van 0 tot 255.
In andere systemen wordt dit soms uint8 genoemd.
#### kort{#short} 
*    **kort** heeft integer waarden ondertekend met een bereik van -32768 tot 32767.
In andere systemen wordt dit soms int16 genoemd.
Dit wordt "smallint" genoemd door SQL en Cassandra.
#### ukort{#ushort} 
*    **ukort** heeft ongesigneerde gehele waarden met een bereik van 0 tot 65535.
In andere systemen wordt dit soms uint16 genoemd.
#### int{#int} 
*    **int** heeft integer waarden ondertekend met een bereik van -2147483648 tot 2147483647.
In andere systemen wordt dit soms int32 genoemd.
Dit heet "integer|numeriek (?) "door SQL en "int" door Cassandra.
#### uint{#uint} 
*    **uint** heeft ongetekende gehele waarden met een bereik van 0 tot 4294967295.
In andere systemen wordt dit soms uint32 genoemd.
#### lang{#long} 
*    **lang** heeft integerwaarden ondertekend met een bereik van -9223372036854775808 tot 9223372036854775807.
In andere systemen wordt dit soms int64 genoemd.
Dit heet "bigint|numeriek (?) " door SQL en "bigint" door Cassandra.
Omdat veel bestandstypen lange gegevens niet ondersteunen, wordt het gebruik ervan ontmoedigd. Indien mogelijk dubbel gebruiken (zie hieronder) .
#### lang{#ulong} 
*    **lang** heeft ongetekende gehele waarden met een bereik van 0 tot 18446744073709551615
In andere systemen wordt dit soms uint64 genoemd.
Omdat veel bestandstypen geen along gegevens ondersteunen, wordt het gebruik ervan ontmoedigd. Indien mogelijk dubbel gebruiken (zie hieronder) .
#### drijvend{#float} 
*    **drijvend** is een IEEE 754 float met een bereik van ongeveer +/- 3.402823466e+38.
In andere systemen wordt dit soms float32 genoemd.
Dit heet "echt|drijvend (?) |decimaal (?) |numeriek (?) "door SQL en "float" door Cassandra.
De speciale waarde NaN betekent Not-a-Number.
    ERDDAP™zet positieve en negatieve oneindigheidwaarden om in NaN.
#### dubbel{#double} 
*    **dubbel** is een IEEE 754 dubbel met een bereik van ongeveer
+/- 1,7976931348623157E +308.
In andere systemen wordt dit soms float64 genoemd.
Dit heet "dubbele precisie"|drijvend (?) |decimaal (?) |numeriek (?) "door SQL en "dubbel" door Cassandra.
De speciale waarde NaN betekent Not-a-Number.
    ERDDAP™zet positieve en negatieve oneindigheidwaarden om in NaN.
#### char{#char} 
*    **char** is een enkele, 2-byte (16-bit)  [Unicode UCS-2 teken](https://en.wikipedia.org/wiki/UTF-16)variërend van\\u0000  (#0) door\\uffff  (#65535) .
    \\uffffDe definitie is Not-a-Character, analoog aan een dubbele waarde van NaN.
Het gebruik van char wordt ontmoedigd omdat veel bestandstypen geen tekens ondersteunen of alleen 1-byte tekens ondersteunen (zie hieronder) . Overweeg in plaats daarvan String te gebruiken.
Gebruikers kunnen char variabelen gebruiken om grafieken te maken.ERDDAP™zal de tekens omzetten naar hun Unicode code punt nummer, die kan worden gebruikt als numerieke gegevens.
#### Tekenreeks{#string} 
*    **Tekenreeks** is een reeks van 0 of meer, 2-byte (16-bit)  [Unicode UCS-2 tekens](https://en.wikipedia.org/wiki/UTF-16).
    ERDDAP™gebruikt/interpreteert een 0-lengte tekenreeks als ontbrekende waarde.ERDDAP™ondersteunt geen echte null string.
De theoretische maximale lengte is 2147483647 karakters, maar er zijn waarschijnlijk verschillende problemen op verschillende plaatsen, zelfs met iets kortere Strings.
GebruikERDDAP's String for SQL's character, varchar, character variing, binary, varbinary, interval, array, multiset, xml, en elk ander databasedatatype dat niet netjes past bij andereERDDAP™gegevenstype.
GebruikERDDAP's String voor Cassandra's "tekst" en elk ander Cassandra datatype dat niet netjes past bij andereERDDAP™gegevenstype.
     

VoorERDDAP™v2.10,ERDDAP™ondersteunt niet-signed integer types intern niet en biedt beperkte ondersteuning in haar datalezers en schrijvers.
    
### Gegevenstypebeperkingen{#data-type-limitations} 
Je kunt denken aanERDDAP™als systeem met virtuele datasets, en dat werkt door gegevens van de bron van een dataset te lezen in een intern datamodel en gegevens te schrijven naar verschillende diensten (bv.(OPeN)DAP,WMS) en bestandstypen in antwoord op verzoeken van gebruikers.

* Elke invoerlezer ondersteunt een subset van de data types dieERDDAP™steun. Dus het lezen van data inERDDAPDe interne datastructuren zijn geen probleem.
* Elke uitvoerschrijver ondersteunt ook een subset van datatypes. Dat is een probleem omdatERDDAPmoet bijvoorbeeld lange gegevens in bestandstypen persen die lange gegevens niet ondersteunen.
     

Hieronder een toelichting van de beperkingen (of geen) van verschillende uitvoer schrijvers en hoeERDDAP™behandelt de problemen. Dergelijke complicaties zijn een inherent onderdeel vanERDDAPHet doel om verschillende systemen interoperabel te maken.

#### ASCII{#ascii} 
* ASCII (.csv,.tsv, enz.) tekstbestanden -
    * Alle numerieke gegevens worden geschreven via de tekenreeksweergave (met ontbrekende gegevenswaarden die verschijnen als 0-lengte tekenreeksen) .
    * HoewelERDDAP™schrijft lange en lange waarden correct naar ASCII-tekstbestanden, veel lezers (b.v. spreadsheetprogramma's) kan niet correct omgaan met lange en lange waarden en in plaats daarvan converteren naar dubbele waarden (met verlies van precisie in sommige gevallen) .
    * Char en String gegevens worden geschreven via JSON Strings, die alle Unicode tekens behandelen (met name de "ongewone" karakters buiten ASCII #127, bijvoorbeeld, de Euro karakter verschijnt als "\\u20ac") .
    
        
#### JSON{#json} 
* JSON (.json,.jsonlCSV, enz.) tekstbestanden -
    * Alle numerieke gegevens worden geschreven via de tekenreeksweergave.
    * Char en String gegevens zijn geschreven als JSON Strings, die alle Unicode tekens behandelen (met name de "ongewone" karakters buiten ASCII #127, bijvoorbeeld, de Euro karakter verschijnt als "\\u20ac") .
    * Ontbrekende waarden voor alle numerieke gegevenstypen zijn nul.
         
#### .nc3 bestanden{#nc3-files} 
*   .nc3 bestanden ondersteunen geen ongesigneerde gehele datatypes. Voor CF v1.9 ondersteunde CF geen niet-gesigneerde integertypen. Om hiermee om te gaan,ERDDAP™2.10+ volgt de NUG-standaard en voegt altijd een "\\_Unsigned" attribuut toe met een waarde van "true" of "false" om aan te geven of de gegevens afkomstig zijn van een niet ondertekende of ondertekende variabele. Alle integer attributen zijn geschreven als ondertekende attributen (bv. byte) met ondertekende waarden (bv. een ubyteactual\\_rangeattribuut met waarden 0 tot 255, verschijnt als een byte-attribuut met waarden 0 tot -1 (het omgekeerde van de complementwaarde van de twee van de waarde buiten bereik). Er is geen gemakkelijke manier om te weten welke (gesigneerde) integer attributen gelezen moeten worden als niet ondertekende attributen.ERDDAP™ondersteunt het attribuut "\\_Unsigned" wanneer het leest.ncDrie dossiers.
*   .nc3 bestanden ondersteunen de lange of langwerpige data types niet.ERDDAP™Dit gebeurt door ze tijdelijk te converteren naar dubbele variabelen. Doubles kunnen alle waarden tot +/- 9,007,199,254,740,992 weergeven Dat is 253. Dit is een onvolmaakte oplossing.Unidataweigert een kleine upgrade naar.nc3 om deze en aanverwante problemen aan te pakken,.nc4 (een grote verandering) als de oplossing.
* De CF-specificatie (vóór v1,9) zei het ondersteunt een char data type, maar het is onduidelijk of char is bedoeld alleen als de bouwstenen van char arrays, die effectief Strings. Vragen op hun mailinglijst leverden alleen verwarrende antwoorden op. Vanwege deze complicaties is het het beste om char variabelen te vermijden inERDDAP™en gebruik String variabelen waar mogelijk.
* Traditioneel,.nc3 bestanden ondersteund alleen strings met ASCII-gecodeerd (7-bit, #0 - #127) karakters. NUG (enERDDAP) verlengen (starten ~2017) door het attribuut "\\_Encoding" met een waarde van "ISO-8859-1" op te nemen (een uitbreiding van ASCII die alle 256 waarden van elke 8-bit teken definieert) of "UTF-8" om aan te geven hoe de stringgegevens gecodeerd zijn. Andere coderingen kunnen legaal zijn maar worden ontmoedigd.
         
#### .nc4 bestanden{#nc4-files} 
*   .nc4 bestanden ondersteunen alleERDDAPde gegevenstypen.
    
#### NCCSV-bestanden{#nccsv-files} 
NCCSV 1.0 bestanden ondersteunen geen ongesigneerde integer data types.
[NCCSV 1.1+ bestanden](/docs/user/nccsv-1.00)ondersteunt alle niet-gesigneerde gehele datatypes.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII-bestanden en .dods binaire bestanden) -
    *   (OPeN)DAPbehandelt korte, ushort, int, uint, float en dubbele waarden correct.
    *   (OPeN)DAPheeft een "byte" gegevenstype dat het definieert als niet ondertekend, terwijl historisch gezien THREDDS enERDDAP™hebben behandeld "byte" als ondertekend in hun(OPeN)DAPdiensten. Om dit beter aan te pakken,ERDDAP™2.10+ volgt de NUG-standaard en voegt altijd een "\\_Unsigned" attribuut toe met een waarde van "true" of "false" om aan te geven of de data is watERDDAP™belt byte of ubyte. Alle byte- en ubyte-attributen zijn geschreven als "byte" attributen met ondertekende waarden (bijv., een ubyteactual\\_rangeattribuut met waarden 0 tot 255, verschijnt als een byte-attribuut met waarden 0 tot -1 (het omgekeerde van de complementwaarde van de twee van de waarde buiten bereik). Er is geen gemakkelijke manier om te weten welke "byte" attributen gelezen moeten worden als ubyte attributen.
    *   (OPeN)DAPondersteunt niet ondertekende of niet ondertekende langen.ERDDAP™behandelt dit door ze tijdelijk te converteren naar dubbele variabelen en attributen. Doubles kunnen alle waarden tot 9,007,199,254,740,992 weergeven Dat is 253. Dit is een onvolmaakte oplossing.OPeNDAP  (de organisatie) weigert een kleine upgrade naarDAP2.0 om dit en aanverwante problemen aan te pakken,DAP4 (een grote verandering) als de oplossing.
    * Omdat(OPeN)DAPheeft geen aparte char data type en technisch alleen ondersteunt 1-byte ASCII tekens (#0 - #127) in tekenreeksen zullen chargegevensvariabelen verschijnen als 1-teken-lange tekenreeksen in(OPeN)DAP.das, .dds, en .dods reacties.
    * Technisch gezien(OPeN)DAPspecificatie ondersteunt alleen strings met ASCII-gecodeerde tekens (#0 - #127) . NUG (enERDDAP) verlengen (starten ~2017) door het attribuut "\\_Encoding" met een waarde van "ISO-8859-1" op te nemen (een uitbreiding van ASCII die alle 256 waarden van elke 8-bit teken definieert) of "UTF-8" om aan te geven hoe de stringgegevens gecodeerd zijn. Andere coderingen kunnen legaal zijn maar worden ontmoedigd.
         
### Opmerkingen over gegevenstype{#data-type-comments} 
* Vanwege de slechte ondersteuning voor lange, langwerpige en char data in vele bestandstypen, ontmoedigen we het gebruik van deze data types inERDDAP. Gebruik indien mogelijk dubbel in plaats van lang en lang, en gebruik String in plaats van char.
     
* Metadata - omdat(OPeN)DAP's .das en .dds antwoorden ondersteunen lange of langwerpige attributen of datatypes niet (en in plaats daarvan tonen ze als dubbelen) , kunt u in plaats daarvan te gebruikenERDDAP's tabel van metagegevens zoals gezien in dehttp.../erdap/ **info** ' *datasetID* .html web pagina (bijvoorbeeld,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (die u ook kunt krijgen in andere bestandstypen, bijvoorbeeld, .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv,.xhtml) of de.nccsvMetadatarespons (bijvoorbeeld,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)Hoewel.nccsvMetadata is alleen beschikbaar voor tabeldatasets) , beide ondersteunen alle data types (met name lang, lang en char) .
         
### Mediabestanden{#media-files} 
Niet alle gegevens zijn arrays van getallen of tekst. Sommige datasets bestaan uit of omvatten mediabestanden, zoals beeld-, audio- en videobestanden.ERDDAP™heeft een aantal speciale functies om het gemakkelijker te maken voor gebruikers om toegang te krijgen tot mediabestanden. Het is een proces in twee stappen:
 

1. Maak elk bestand toegankelijk via zijn eigen URL, via een systeem dat byte range verzoeken ondersteunt.
De gemakkelijkste manier om dit te doen is om de bestanden in een directory te plaatsen dieERDDAP™heeft toegang tot. (Als ze in een container zitten als een.zipbestand, unzip ze, hoewel u misschien wilt bieden de.zipbestand aan gebruikers ook.) Maak dan een[EDDtableFromFileNames](#eddtablefromfilenames)dataset om deze bestanden toegankelijk te maken viaERDDAP™, met name viaERDDAP's["files"systeem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
Alle bestanden toegankelijk gemaakt via EDDTableFromFileNames enERDDAP's"files"systeemondersteuning[bytebereikverzoeken](https://en.wikipedia.org/wiki/Byte_serving). Normaal gesproken, wanneer een klant (bv. een browser) maakt een verzoek aan een URL, het krijgt het hele bestand als antwoord. Maar met een bytebereik verzoek, het verzoek specificeert een reeks bytes uit het bestand, en de server geeft alleen die bytes. Dit is hier relevant omdat de audio- en videospelers in browsers alleen werken als het bestand kan worden geopend via byte range verzoeken.
    
Optioneel: Als u meer dan één dataset met bijbehorende mediabestanden hebt, kunt u slechts één EDDTableFromFileNames maken die een submap heeft voor elke groep bestanden. Het voordeel is dat wanneer je nieuwe mediabestanden voor een nieuwe dataset wilt toevoegen, je alleen maar een nieuwe map hoeft te maken en de bestanden in die map moet plaatsen. De map en bestanden worden automatisch toegevoegd aan de EDDTableFromFileNames-dataset.
    
2. Optioneel: Als u een dataset met verwijzingen naar mediabestanden, voeg het aanERDDAP.
Bijvoorbeeld, je kan een .csv bestand met een rij voor elke keer dat iemand zag een walvis en een kolom die de naam van een afbeelding bestand met betrekking tot die waarneming bevat. Als de naam van het imagebestand alleen de bestandsnaam is, bijvoorbeeld, Img20141024T192403Z, geen volledige URL, dan moet u toevoegen[bestandAccessBase Url en/of bestandAccessSuffix](#fileaccessbaseurl)attributen aan de metagegevens daarvoordataVariabledie de baseURL en achtervoegsel voor die bestandsnamen specificeert. Als je de bestanden toegankelijk hebt gemaakt via EDDTableFromFileNames, zal de URL in het formulier staan
     *baseUrl* /erddap/files *datasetID* '
Bijvoorbeeld,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Als er een.zipof een ander containerbestand met alle mediabestanden met betrekking tot een gegevensvariabele, raden wij u aan dat bestand ook toegankelijk te maken voor gebruikers (zie stap 1 hierboven) en dan identificeren met een[bestandAccessArchive Url](#fileaccessarchiveurl)kenmerk.
    

\\[Beginnen metERDDAP™v1,82\\]Als u de eerste stap hierboven doet (of beide stappen) , dan wanneer een gebruiker deERDDAP™ "files"systeem voor die gegevensset (of vraagt om een deelverzameling van de dataset te zien via een.htmlTableverzoek, als u de tweede stap) ,ERDDAP™zal een '?'-pictogram links van de bestandsnaam tonen. Als de gebruiker zweeft over dat pictogram, zullen ze een popup zien die de afbeelding, of een audiospeler, of een videospeler. Browsers ondersteunen slechts een beperkt aantal soorten

* afbeelding (meestal .gif, .jpg, en .png) ,
* audio (meestal .mp3, .ogg, en .wav) en
* videobestanden (Meestal .mp4, .ogv, en . webm) .

Ondersteuning varieert met verschillende versies van verschillende browsers op verschillende besturingssystemen. Dus als je een keuze hebt van welk bestandstype te bieden, is het zinvol om deze soorten aan te bieden.

Of, als een gebruiker op de bestandsnaam klikt die op eenERDDAP™Webpagina, hun browser zal de afbeelding, audio of video-bestand als een aparte webpagina tonen. Dit is meestal handig om een zeer grote afbeelding of video geschaald naar volledig scherm te zien, in plaats van in een popup.
    
### Werken met AWS S3-bestanden{#working-with-aws-s3-files} 
[Amazon Web Service (AWS) ](https://aws.amazon.com)is een verkoper van[cloud computing](https://en.wikipedia.org/wiki/Cloud_computing)diensten.[S3](https://aws.amazon.com/s3/)is een object opslag systeem aangeboden door AWS. In plaats van het hiërarchische systeem van mappen en bestanden van een traditioneel bestandssysteem (als een harde schijf in uw PC) , S3 biedt alleen "buckets" die houden "objecten" (We bellen ze."files") .

Voor ASCII-bestanden (bv. .csv) ,ERDDAP™kan werken met de bestanden in de emmers direct. Het enige wat je hoeft te doen is de&lt;fileDir&gt; voor de dataset met een specifiek formaat voor de AWS-emmer, bijvoorbeeld, https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . U dient niet te gebruiken&lt;cacheVanUrl&gt; . Zie hieronder voor details.

Maar voor binaire bestanden (bv..nc, Grib, Bufr, en.hdfbestanden) , u moet de&lt;cacheFromUrl&gt; systeem hieronder beschreven.ERDDAP, netcdf-java (dieERDDAP™gebruikt om gegevens van deze bestanden te lezen) , en andere wetenschappelijke data software zijn ontworpen om te werken met bestanden in een traditioneel bestandssysteem dat biedt[blokniveau](https://en.wikipedia.org/wiki/Block-level_storage)toegang tot bestanden (die het lezen van stukken van een bestand toestaat) , maar S3 biedt alleen[bestandsniveau (object) ](https://en.wikipedia.org/wiki/Block-level_storage)toegang tot bestanden (die alleen het lezen van het hele bestand toestaat) . AWS biedt een alternatief voor S3,[Elastische blokopslag (EBS) ](https://aws.amazon.com/ebs/)), die block level toegang tot bestanden ondersteunt, maar het is duurder dan S3, dus het wordt zelden gebruikt voor bulk opslag van grote hoeveelheden gegevensbestanden. (Dus als mensen zeggen dat het opslaan van gegevens in de cloud (S3) is goedkoop, het is meestal een appel tot sinaasappel vergelijking.) 

#### S3 Emmers{#s3-buckets} 
 **De inhoud van een emmer. Sleutels. Objecten.**   
Technisch gezien zijn S3 emmers niet georganiseerd in een hiërarchische bestandsstructuur zoals een bestandssysteem op een computer. In plaats daarvan bevatten emmers alleen "objecten" (bestanden) , elk heeft een "sleutel" (een naam) . Een voorbeeld van een sleutel in dat noaa-goes17 emmer is

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
De overeenkomstige URl voor dat object is

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS ondersteunt een kleine variatie in hoe die URL is geconstrueerd, maarERDDAP™vereist dit ene specifieke formaat:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
Het is gebruikelijk, zoals bij dit voorbeeld, om sleutelnamen eruit te laten zien als een hiërarchisch pad plus een bestandsnaam, maar technisch gezien niet. Omdat het gemeenschappelijk en nuttig is,ERDDAP™behandelt sleutels met /'s alsof ze een hiërarchisch pad plus bestandsnaam zijn, en deze documentatie zal naar hen verwijzen als zodanig. Als de sleutels van een emmer niet gebruikt /'s (bijv., een sleutel als
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575), danERDDAP™zal gewoon behandelen de hele sleutel als een lange bestandsnaam.

Privé vs Openbare Emmers -- De beheerder van de S3-emmer kan de emmer en de inhoud ervan openbaar of privé maken. Indien openbaar, kan elk bestand in de emmer worden gedownload door iedereen die de URL voor het bestand gebruikt. Amazon heeft een[Data openen](https://aws.amazon.com/opendata/)programma dat publieke datasets host (inclusief gegevens vanNOAA, NASA en USGS) gratis en rekent voor niemand om de bestanden te downloaden van die emmers. Als een emmer privé is, zijn bestanden in de emmer alleen toegankelijk voor geautoriseerde gebruikers en AWS rekent een vergoeding (meestal betaald door de eigenaar van de emmer) voor het downloaden van bestanden naar een niet-AWS S3-computer.ERDDAP™kan werken met gegevens in openbare en particuliere emmers.

#### AWS geloofsbrieven{#aws-credentials} 
Om het zo te maken datERDDAP™kunt lezen de inhoud van privé-emmers, je hebt AWS-gegevens nodig en je moet een referentiesbestand op te slaan in de standaard plaats, zodatERDDAP™kan de informatie vinden. Zie de AWS SDK voorJava2.x documentatie:[Standaardgegevens instellen](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (De optie om de waarden op te slaan alsJavacommandoregelparameters in\\[kat\\]/bin/setsv.sh kan een goede optie zijn.) 
#### AWS /files /{#aws-files} 
* /files/systeem -- DeERDDAP™ [/files/systeem](#accessibleviafiles)stelt gebruikers in staat om de bronbestanden voor een dataset te downloaden. Wij raden u aan dit aan te zetten voor alle datasets met bronbestanden omdat veel gebruikers de originele bronbestanden willen downloaden.
    * Als de bestanden in een privé S3-emmer zitten, zal het verzoek van de gebruiker om een bestand te downloaden doorERDDAP™, die de gegevens van het bestand zal lezen en vervolgens verzenden naar de gebruiker, waardoor de belasting op uwERDDAP™, met behulp van inkomende en uitgaande bandbreedte, en waardoor u (deERDDAP™beheerder) betalen van de data egress vergoeding aan AWS.
    * Als de bestanden in een openbare S3 emmer, de gebruiker het verzoek om een bestand te downloaden zal worden doorgestuurd naar de AWS S3 URL voor dat bestand, zodat de gegevens niet stroom doorERDDAP™, waardoor de belasting opERDDAP. En als de bestanden in een Amazon Open Data (vrij) openbare emmer, dan jij (deERDDAP™beheerder) zal geen data egress vergoeding betalen aan AWS. Er is dus een groot voordeel dat gegevens van het publiek worden verstrekt. (niet privé) S3 emmers, en een groot voordeel om gegevens van Amazon Open Data te dienen (vrij) emmers.

#### ERDDAP™en AWS S3 Emmers{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™en AWS S3 Emmers** ](#erddap-and-aws-s3-buckets)  
Gelukkig, na veel moeite,ERDDAP™heeft een aantal functies die het mogelijk maken om de inherente problemen van het werken met S3 blokniveau toegang tot bestanden op een redelijk efficiënte manier aan te pakken:

*   \\[Verklaring: Werken met AWS S3 emmers is veel extra werk. AWS is een enorm ecosysteem van diensten en functies. Er is veel te leren. Het kost tijd en moeite, maar het is te doen. Wees geduldig en je krijgt dingen aan de praat. Hulp zoeken/vragen
([AWS-documentatie](https://aws.amazon.com/documentation/gettingstarted/), websites zoals[Stack Overflow](https://stackoverflow.com/), en de reguliere
    [ERDDAP™ondersteuningsopties](/docs/intro#support)) als/wanneer je vastzit.\\]  
     
* Het kan moeilijk zijn om erachter te komen de directory structuur en bestandsnamen van de bestanden in een S3-emmer.ERDDAP™heeft een oplossing voor dit probleem: EDDTableFromFileNames heeft een speciale[\\*\\*\\*vanOnTheFly](#fromonthefly)optie waarmee u een EDDTableFromFileNames dataset kunt maken waarmee gebruikers de inhoud van een S3-emmer kunnen doorbladeren (en bestanden downloaden) via de dataset"files"optie. Er is een[voorbeeld hiervan hieronder](#viewing-the-contents-of-a-bucket).
     
*   ERDDAP™kan gegevens lezen van[extern gecomprimeerde gegevensbestanden](#externally-compressed-files), dus het is prima als de bestanden op S3 worden opgeslagen als.gz,.gzip,.bz2, .Z, of andere soorten extern gecomprimeerde gegevensbestanden, die dramatisch kunnen (2 - 20X) vermindering van de opslagkosten. Er is vaak geen tijd boete voor het gebruik van extern gecomprimeerde bestanden, omdat de tijd die wordt bespaard door het overbrengen van een kleiner bestand van S3 naarERDDAPongeveer balanceert de extra tijd nodig voorERDDAP™om het bestand te decomprimeren. Om deze functie te gebruiken, moet je er alleen voor zorgen dat de dataset's&lt;bestandNameRegex&gt; maakt het gecomprimeerde bestandstype mogelijk (b.v. door toevoeging (|.gz) tot het einde van de regex) .
     
* Voor de meest voorkomende zaak, waar je eenERDDAP™geïnstalleerd op uw PC voor test/ontwikkeling en waar de dataset heeft binaire gegevensbestanden die zijn opgeslagen als objecten in een S3-emmer, een benadering om de dataset inERDDAP™is:
    1. Maak een map aan op uw PC om een paar testgegevensbestanden te bewaren.
    2. Download twee gegevensbestanden van de bron naar de directory die je net hebt gemaakt.
    3. Gebruik[GenererenDatasetsXml](#generatedatasetsxml)om de brok vandatasets.xmlvoor de dataset op basis van de twee lokale gegevensbestanden.
    4. Controleer of die dataset werkt zoals gewenst met[DasDds](#dasdds)en/of uw lokaleERDDAP.
        
         **De volgende stappen maken een kopie van die dataset (die gegevens uit de S3-emmer zal krijgen) over een publiekERDDAP.** 
        
    5. Kopieer de brok vandatasets.xmlvoor de dataset naar dedatasets.xmlvoor het publiekERDDAP™dat de gegevens zal dienen.
    6. Een map aanmaken voor het publiekERDDAP's lokale harde schijf om een cache van tijdelijke bestanden te houden. De map zal niet veel schijfruimte gebruiken (zie cacheSizeGB hieronder) .
    7. De waarde van de dataset wijzigen&lt;fileDir&gt; tag zodat het wijst naar de map die je net gemaakt hebt (ook al is de map leeg) .
    8. Voeg een[cacheVanUrl](#cachefromurl)tag waarin de bucketnaam van de dataset en het facultatieve voorvoegsel worden gespecificeerd (m.a.w., directory) in het specifieke[Aws S3 URL-formaat datERDDAP™vereist](#accessing-files-in-an-aws-s3-bucket).
    9. Voeg een [&lt;cacheSizeGB&gt;] (#cachefromurl) tag naar xml van de dataset (b.v. 10 is een goede waarde voor de meeste datasets) om te vertellenERDDAP™om de grootte van de lokale cache te beperken (d.w.z. probeer niet alle bestanden op afstand te cachen) .
    10. Kijk of dat bij het publiek werkt.ERDDAP. Merk op dat de eerste keerERDDAP™laadt de dataset, het zal een lange tijd duren om te laden, omdatERDDAP™moet alle gegevensbestanden downloaden en lezen.
        
Als de dataset is een enorme verzameling van enorme gerasterde gegevensbestanden, zal dit een zeer lange tijd en onpraktisch. In sommige gevallen, voor gerasterde gegevensbestanden,ERDDAP™kan de benodigde informatie extraheren (bv. het tijdspunt voor de gegevens in een gerasterd gegevensbestand) van de bestandsnaam en vermijd dit probleem. Zie[Samenvoegen via Bestandsnamen](#aggregation-via-file-names-or-global-metadata).
        
    11. Optioneel (maar vooral voor EDDTableFromFiles datasets) , kunt u een[nThreads](#nthreads)tag naar de dataset om te vertellenERDDAPmeer dan 1 thread gebruiken bij het beantwoorden van het verzoek van een gebruiker om gegevens. Dit minimaliseert de effecten van de vertraging die optreedt wanneerERDDAP™leest gegevensbestanden van (remote) AWS S3 emmers in de lokale cache en (Misschien) Ze decomprimeren.

#### AWS S3 Open data{#aws-s3-open-data} 
Als onderdeel vanNOAA's[Big Data Programma](https://www.noaa.gov/nodd/about),NOAAheeft partnerschappen met vijf organisaties, waaronder AWS, "om de potentiële voordelen van het opslaan van kopieën van belangrijke observaties en modeluitgangen in de cloud te onderzoeken, zodat computing direct op de data zonder verdere distributie nodig is." AWS omvat de datasets die het vanNOAAals onderdeel van haar programma om het publiek toegang te bieden tot een grote collectie van[Open gegevens over AWS S3](https://registry.opendata.aws/)vanaf elke computer, of het een Amazon compute instantie is (een gehuurde computer) op het AWS netwerk of uw eigen PC op elk netwerk. Het voorbeeld hieronder gaat ervan uit dat u werkt met een openbaar toegankelijke dataset.

#### Toegang tot bestanden in een AWS S3 Emmer{#accessing-files-in-an-aws-s3-bucket} 
Voor een privé S3-gegevensemmer moet de eigenaar van de emmer u toegang geven tot de emmer. (Zie de AWS documentatie.) 

In alle gevallen hebt u een AWS-account nodig omdat de AWS SDK voorJava  (dieERDDAP™gebruikt om informatie over de inhoud van een emmer op te halen) vereist AWS-accountgegevens. (meer hierover hieronder) 

ERDDAP™kan alleen toegang krijgen tot AWS S3 emmers als u de [&lt;cacheVanUrl&gt;] (#cachefromurl) (of&lt;fileDir&gt;) in een specifiek formaat:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
waarbij

* De emmerNaam is de korte vorm van de emmernaam, bijvoorbeeld noaa-goes17 .
* De aws-regio, bv. ons-oost-1, komt uit de "Region" kolom in een van de tabellen van[AWS-eindpunten](https://docs.aws.amazon.com/general/latest/gr/rande.html)waar de emmer zich bevindt.
* Het voorvoegsel is optioneel. Indien aanwezig, moet het eindigen met'/'.

Bijvoorbeeld, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Deze URL-formaat is een van de AWS S3 aanbevelingen: zie[Toegang tot een Emmer](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)en[deze beschrijving van voorvoegsels](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html).ERDDAP™vereist dat u de emmer URL en het optionele voorvoegsel combineert in één URL om de&lt;cacheVanUrl&gt; (of&lt;fileDir&gt;) waar de bestanden zich bevinden.

#### Test publieke AWS S3 Emmers{#test-public-aws-s3-buckets} 
Voor openbare emmers kunt en moet u de emmer URL van de AWS S3 directory in uw browser testen, bijvoorbeeld,
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Als de emmer URL correct en geschikt is voorERDDAP, zal het een XML-document dat (gedeeltelijk) vermelding van de inhoud van die emmer. Helaas, de volledige URL (d.w.z. emmer-URL plus voorvoegsel) datERDDAP™wil voor een gegeven dataset werkt niet in een browser. AWS biedt geen systeem om gemakkelijk in uw browser door de hiërarchie van een emmer te bladeren. (Als dat onjuist is, stuur dan een e-mail naar Chris. John bij Noaa.gov. Anders, Amazon, voeg hiervoor alsjeblieft ondersteuning toe&#33;) 

#### De inhoud van een Emmer bekijken{#viewing-the-contents-of-a-bucket} 
S3 emmers bevatten vaak een aantal categorieën van bestanden, in een paar pseudo-submappen, die een paar vanERDDAP™datasets. Om deERDDAP™datasets, je moet de start directory kennen voor&lt;cacheVanUrl&gt; (of&lt;fileDir&gt;) en het formaat van de bestandsnamen die die subset van bestanden identificeren. Als u de volledige inhoud van een emmer in een browser probeert te bekijken, zal S3 u gewoon de eerste 1000 bestanden tonen, wat onvoldoende is. Momenteel, de beste manier voor u om alle inhoud van een emmer te bekijken is om een[EDDtableFromFileNames](#eddtablefromfilenames)dataset (op uw pc'sERDDAP™en/of op uw publiekERDDAP) , wat je ook een gemakkelijke manier geeft om door de mapstructuur te bladeren en bestanden te downloaden. De&lt;fileDir&gt; hiervoor zal de URL zijn die u hierboven hebt gemaakt, bijvoorbeeld, https://noaa-goes17.s3.us-east-1.amazonaws.com .\\[Waarom biedt AWS S3 geen snelle en gemakkelijke manier voor iedereen om dit te doen zonder een AWS-account?\\]Merk op dat wanneer ik dit doe op mijn PC op een niet-Amazon netwerk, het lijkt erop dat Amazon vertraagt de reactie op een druppel (ongeveer 100 (?) bestanden per stuk) na de eerste paar brokken (van 1000 bestanden per stuk) worden gedownload. Sinds emmers kunnen een enorm aantal bestanden (noaa-goes17 heeft 26 miljoen) , het krijgen van alle van de inhoud van een emmer kan nemen EDDtableFromFileNames enkele uren (bv. 12&#33;) Om af te maken.\\[Amazone, klopt dat?&#33;\\]

#### Een EDDtabel maken FromFileNames Dataset met een AWS S3 Emmer{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Als je een emmernaam hebt, maar nog geen lijst van bestanden in de S3-emmer of het voorvoegsel dat de locatie van de relevante bestanden in de emmer identificeert, gebruik dan de onderstaande instructies om een EDDTableFromFileNames dataset te maken zodat je de maphiërarchie van de S3-emmer kunt doorbladeren viaERDDAP's"files"systeem.

1. Een AWS-account openen
    ERDDAP™gebruikt de[AWS SDK voorJava](https://docs.aws.amazon.com/sdk-for-java/index.html)om emmer informatie te krijgen van AWS, dus je moet[een AWS-account aanmaken en activeren](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). Dat is een behoorlijk grote klus, met veel te leren.
     
2. Plaats uw AWS-redenen waarERDDAP™Ik kan ze vinden.
Volg de instructies op[Opzetten van AWS-redenen en regio voor ontwikkeling](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)dusERDDAP™  (specifiek, de AWS SDK voorJava) zal in staat zijn om uw AWS referenties te vinden en te gebruiken. AlsERDDAP™kan de referenties niet vinden, zult u een
Java.lang. IllegaleArgumentUitzondering: profielbestand kan geen nulfout zijn inERDDAP's log.txt bestand.
    
Hint voor Linux en Mac OS: het referentiebestand moet in de home directory van de gebruiker staan die Tomcat draait (enERDDAP)   (voor deze paragraaf, zullen we aannemen user=tomcat) in een bestand genaamd ~/.aws/cirtities . Ga er niet van uit dat ~ /home/tomcat -- eigenlijk cd ~ gebruikt om uit te vinden waar het besturingssysteem denkt dat ~ voor user=tomcat is. Maak de map aan als deze niet bestaat. Zorg er ook voor dat de gebruiker en de groep voor het bestand tomcat zijn en gebruik dan chmod 400 referenties om ervoor te zorgen dat het bestand alleen-lezen is voor user=tomcat.
    
3. Maak de emmer-URL aan in de[formaat datERDDAP™vereist](#accessing-files-in-an-aws-s3-bucket), bijvoorbeeld,
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)en (voor openbare emmers) test het in een browser om ervoor te zorgen dat het een XML-document met een gedeeltelijke lijst van de inhoud van die emmer.
     
4. Gebruik[GenererenDatasetsXml](#generatedatasetsxml)om een[EDDtableFromFileNames](#eddtablefromfilenames)Dataset:
    * Gebruik deze syntax voor de map Starting:
        \\*\\*\\ *van OnTheFly,* YourBucketUrl
bijvoorbeeld,
        \\*\\*\\*vanOnTheFly, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * Bestandsnaam Regex? *
    * Recursief? waar
    * herladen Elke Nminutes? 10080
    *   infoUrl? https://registry.opendata.aws/noaa-goes/
 
    * instituut?NOAA
    * Samenvatting? niets (ERDDAP™zal automatisch een fatsoenlijke samenvatting maken.) 
    * titel? niets (ERDDAP™zal automatisch een fatsoenlijke titel maken.) Zoals gewoonlijk, moet u de resulterende XML te bewerken om de juistheid te controleren en verbeteringen te maken voordat de brok van datasets gebruiken indatasets.xml.
5. Als je de instructies hierboven volgt en de dataset laadt inERDDAP, je hebt een EDDTableFromFiles dataset gemaakt. Als voorbeeld, en om het voor iedereen makkelijker te maken om bestanden te bladeren en te downloaden van de AWS Open Data emmers, hebben we EDDTableFromFileNames datasets gemaakt (zie de lijst op
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)) voor bijna alle[AWS S3 Open Data emmers](https://registry.opendata.aws/).
    \\[De weinige emmers die we niet hebben opgenomen hebben ook een groot aantal bestanden in de root directory (meer dan binnen een redelijke termijn kan worden gedownload) , of niet toestaan dat het publiek toegang (Moeten ze niet allemaal openbaar zijn?) , of zijn Verzoeker Betaalt emmers (bijvoorbeeld Sentinel) .\\]  
Als u op de"files"link voor een van deze datasets, kunt u bladeren door de directory boom en bestanden in die S3 emmer. Vanwege de weg\\*\\*\\*vanOnTheFly EDDTableFromFiles werkt, deze directory lijsten zijn altijd perfect up-to-date omdatERDDAP™Hij krijgt ze op de vlucht. Als je de mapboom naar een echte bestandsnaam klikt en op de bestandsnaam klikt,ERDDAP™zal uw verzoek omleiden naar AWS S3 zodat u het bestand rechtstreeks van AWS kunt downloaden. Dan kun je dat dossier inspecteren.
    
Problemen?
Als uw EDDtableFromFiles niet zal ladenERDDAP™  (of DasDds) , kijk in het log.txt bestand voor een foutmelding. Als u een
Java.lang. IllegaleArgumentUitzondering: profielbestand kan niet nul fout zijn, het probleem is dat de AWS SDK voorJava  (gebruikt doorERDDAP) is het niet vinden van het dossier. Zie de referenties instructies hierboven.
     

Het is jammer dat AWS niet gewoon toestaat dat mensen een browser gebruiken om de inhoud van een publieke emmer te bekijken.

 **Dan kun jeERDDAP™datasets die gebruikers toegang geven tot de gegevens in de bestanden.**   
Zie de instructies in[ERDDAP™en S3 Emmers](#erddap-and-aws-s3-buckets)  (boven) .
Voor het voorbeeld EDDTableFromFileNames dataset die je hierboven hebt gemaakt, als je een beetje rondsnuffelt met de directory en bestandsnamen in de directoryboom, wordt het duidelijk dat de mapnamen op het hoogste niveau (bv. ABI-L1b-RadC) komt overeen met watERDDAP™zou aparte datasets oproepen. De emmer waarmee u werkt kan vergelijkbaar zijn. U kunt dan zoeken naar het creëren van aparte datasets inERDDAP™voor elk van deze datasets, bijvoorbeeld:
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
als de&lt;cacheFromUrl&gt;. Helaas, voor dit specifieke voorbeeld, de datasets in de emmer lijken allemaal niveau 1 of niveau 2 datasets, dieERDDAP™ [is niet bijzonder goed in](#dimensions), omdat de dataset een ingewikkelder verzameling variabelen is die verschillende dimensies gebruiken.
     
    
### NcML-bestanden{#ncml-files} 
NcML-bestanden kunt u on-the-fly wijzigingen in een of meer originele bron specificerenNetCDF  (v3 of v4)  .nc, .grib, .bufr, of.hdf  (v4 of v5) bestanden, en dan hebbenERDDAP™de.ncml bestanden als de bronbestanden.ERDDAP™datasets accepteren.ncml bestanden wanneer.ncbestanden worden verwacht. De NcML-bestanden MOET de extensie hebben.ncml. Zie[UnidataNcML-documentatie](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). NcML is nuttig omdat je er wat dingen mee kunt doen (bijvoorbeeld verschillende wijzigingen aanbrengen in verschillende bestanden in een verzameling, inclusief het toevoegen van een dimensie met een specifieke waarde aan een bestand) , dat je niet kunt doen metERDDAP'sdatasets.xml.

* Wijzigingen in een.ncml bestand's laatste Gemodificeerde tijd zal ervoor zorgen dat het bestand wordt herladen wanneer de dataset wordt herladen, maar wijzigingen in de onderliggende.ncGegevensbestanden worden niet direct opgemerkt.
* Hint: NcML is\\*zeer\\*gevoelig voor de volgorde van sommige items in het NcML-bestand. Denk aan NcML als het specificeren van een reeks instructies in de opgegeven volgorde, met de bedoeling om de bronbestanden te wijzigen (de status aan het begin/top van het NcML-bestand) in de doelbestanden (de status aan het eind/onderkant van het NcML-bestand) .

Een alternatief voor NcML is de[NetCDFExploitanten (NCO) ](#netcdf-operators-nco). Het grote verschil is dat NcML is een systeem voor het maken van veranderingen on-the-fly (zodat de bronbestanden niet worden gewijzigd) , terwijlNCOkan worden gebruikt om wijzigingen aan te brengen (of nieuwe versies van) De dossiers. BeideNCOen NcML zijn zeer, zeer flexibel en kunt u bijna elke verandering die u kunt bedenken aan de bestanden. Voor beide kan het uitdagend zijn om precies uit te zoeken hoe je moet doen wat je wilt doen -- het web controleren op vergelijkbare voorbeelden. Beide zijn nuttige hulpmiddelen voor het voorbereiden van netCDF enHDFbestanden voor gebruik metERDDAP, met name om veranderingen aan te brengen die verder gaan dan watERDDAPHet manipulatiesysteem kan dat.

Voorbeeld #1: Een tijddimensie toevoegen met één waarde
Hier is een.ncml bestand dat een nieuwe dimensie creëert (tijd, met 1 waarde: 1041379200) en voegt die dimensie toe aan de pic variabele in het bestand A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Voorbeeld #2: Een bestaande tijdswaarde wijzigen
Soms de bron.ncbestand heeft al een tijddimensie en tijdswaarde, maar de waarde is onjuist (voor uw doeleinden) . Dit.ncml bestand zegt: voor het gegevensbestand genaamd ""19810825230030-NCEI...", voor de dimensie variabele"time", stel de eenheden attribuut zijn 'seconden sinds 1970-01-01T00:00:00Z' en stel de tijd waarde op 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDFExploitanten (NCO)  {#netcdf-operators-nco} 
"De netCDF Operators (NCO) bestaan uit een dozijn standalone, commando-line programma's die netCDF nemen\\[v3 of v4\\],HDF \\[v4 of v5\\],\\[Grib, Bufr,\\]en/ofDAPbestanden als invoer, dan werken (bv. nieuwe gegevens afleiden, statistieken berekenen, afdrukken, hyperslabs, metadata manipuleren) en voer de resultaten naar het scherm of bestanden in tekst, binaire, of netCDF-formaten.NCOHelpt analyse van gerasterde wetenschappelijke gegevens. De shell-command stijl vanNCOstelt gebruikers in staat om bestanden interactief te manipuleren en te analyseren, of met expressieve scripts die sommige overhead van hoger-niveau programmeeromgevingen vermijden." (van de[NCO](https://nco.sourceforge.net/)homepage) .

Een alternatief voorNCOis[NcML](#ncml-files). Het grote verschil is dat NcML is een systeem voor het maken van veranderingen on-the-fly (zodat de bronbestanden niet worden gewijzigd) , terwijlNCOkan worden gebruikt om wijzigingen aan te brengen (of nieuwe versies van) De dossiers. BeideNCOen NcML zijn zeer, zeer flexibel en kunt u bijna elke verandering die u kunt bedenken aan de bestanden. Voor beide kan het uitdagend zijn om precies uit te zoeken hoe je moet doen wat je wilt doen -- het web controleren op vergelijkbare voorbeelden. Beide zijn nuttige hulpmiddelen voor het voorbereiden van netCDF enHDFbestanden voor gebruik metERDDAP, met name om veranderingen aan te brengen die verder gaan dan watERDDAPHet manipulatiesysteem kan dat.

U kunt bijvoorbeeldNCOom de eenheden van de tijdvariabele consistent te maken in een groep bestanden waar ze oorspronkelijk niet consistent waren. Of, u kunt gebruikenNCOToe te passenscale\\_factorenadd\\_offsetin een groep bestanden waarinscale\\_factorenadd\\_offsethebben verschillende waarden in verschillende bronbestanden.
 (Of, je kunt nu omgaan met die problemen inERDDAP™via[EDDGridUitNcFilesUitgepakt](#eddgridfromncfilesunpacked), dat is een variant vanEDDGridFromNcFiles die verpakte gegevens uitpakt en tijdwaarden op een laag niveau standaardiseert om te gaan met een verzameling bestanden die verschillende hebbenscale\\_factors enadd\\_offset, of andere tijdeenheden.) 

NCOis Vrije en Open Bron Software die de[GPL 3,0](https://www.gnu.org/licenses/gpl-3.0.html)Rijbewijs.

Voorbeeld #1: Units consistent maken
EDDGridFromFiles en EDDTable Uit Bestanden staat erop dat de eenheden voor een bepaalde variabele identiek zijn in alle bestanden. Als sommige bestanden triviaal zijn (niet functioneel) verschillend van andere (bijv., tijdseenheden van
"seconden sinds 1970-01-01 00:00:00 UTC" versus
"seconds since 1970-01-01T00:00:00Z", je zou kunnen gebruikenNCO's[ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor). om de eenheden in alle bestanden te wijzigen die identiek zijn aan
nco/ncatted -a units,time,o,c,'seconds sinds 1970-01-01T00:00:00Z'.nc  
\\[Voor veel problemen zoals deze in EDDTableFrom... Bestanden datasets, kunt u nu gebruiken[standaardiseren Wat?](#standardizewhat)om te vertellenERDDAPom de bronbestanden te standaardiseren zoals ze worden gelezen inERDDAP.\\]
    
### Limieten voor de grootte van een dataset{#limits-to-the-size-of-a-dataset} 
Hieronder staan veel verwijzingen naar "2 miljard." Meer precies, dat is een verwijzing naar 2.147.483.647 (2^31-1) , wat de maximale waarde is van een 32-bits ondertekend geheel getal. In sommige computertalen bijvoorbeeldJava  (dieERDDAP™is geschreven in) , dat is het grootste data type dat kan worden gebruikt voor vele data structuren (bijvoorbeeld, de grootte van een array) .

Voor tekenreekswaarden (bijvoorbeeld voor variabele namen, attribuutnamen, string-attribuutwaarden en stringgegevenswaarden) , het maximum aantal tekens per tekenreeks inERDDAP™~2 miljard. Maar in bijna alle gevallen zullen er kleine of grote problemen zijn als een tekenreeks een redelijke grootte overschrijdt (bijvoorbeeld 80 tekens voor variabele namen en attribuutnamen, en 255 tekens voor de meeste string-attribuutwaarden en gegevenswaarden) . Bijvoorbeeld, webpagina's met lange variabele namen zullen onhandig breed en lange variabele namen worden ingekort als ze de limiet van het respons bestandstype overschrijden.

Voor gerasterde datasets:

* Het maximum aantalaxisVariableS is ~2 miljard.
Het maximum aantaldataVariableS is ~2 miljard.
Maar als een dataset &gt; 100 variabelen heeft, zal het lastig zijn voor gebruikers om te gebruiken.
En als een dataset meer dan 1 miljoen variabelen heeft, zal uw server veel fysiek geheugen nodig hebben en zullen er andere problemen zijn.
* De maximale grootte van elke dimensie (axisVariable) is ~2 miljard waarden.
* Ik denk dat het maximale aantal cellen (het product van alle afmetingen) is onbeperkt, maar het kan ~9e18.

Voor tabeldatasets:

* Het maximum aantaldataVariableS is ~2 miljard.
Maar als een dataset &gt; 100 variabelen heeft, zal het lastig zijn voor gebruikers om te gebruiken.
En als een dataset meer dan 1 miljoen variabelen heeft, zal uw server veel fysiek geheugen nodig hebben en zullen er andere problemen zijn.
* Het maximale aantal bronnen (bijvoorbeeld bestanden) dat kan worden samengevoegd is ~2 miljard.
* In sommige gevallen, het maximum aantal rijen van een individuele bron (bijvoorbeeld een bestand, maar geen database) is ~2 miljard rijen.
* Ik denk niet dat er andere grenzen zijn.

Voor zowel gerasterde als getabelleerde datasets zijn er enkele interne limieten voor de grootte van de subset die door een gebruiker in één verzoek kan worden aangevraagd (vaak gerelateerd aan &gt;2 miljard van iets of ~9e18 van iets) , maar het is veel waarschijnlijker dat een gebruiker de bestands-type-specifieke limieten zal raken.

*   NetCDFversie 3.ncbestanden zijn beperkt tot 2GB bytes. (Als dit echt een probleem is voor iemand, laat het me weten: Ik zou graag de steun voor deNetCDFversie 3.nc64-bit uitbreiding ofNetCDFVersie 4, die de limiet aanzienlijk zou verhogen, maar niet oneindig.) 
* Browsers crashen na slechts 500MB gegevens, dusERDDAP™beperkt de respons tot.htmlTableverzoeken om ~400MB gegevens.
* Veel data analyse programma's hebben vergelijkbare grenzen (bijvoorbeeld, de maximale grootte van een dimensie is vaak ~2 miljard waarden) Er is dus geen reden om hard te werken om de bestands-type-specifieke limieten te omzeilen.
* De bestands-type-specifieke limieten zijn nuttig in die ze naïeve verzoeken voor echt enorme hoeveelheden gegevens voorkomen (bijvoorbeeld, "geef me al deze dataset" wanneer de dataset 20TB gegevens bevat) , wat weken of maanden zou duren om te downloaden. Hoe langer de download, hoe waarschijnlijker het zal mislukken om verschillende redenen.
* De bestandstype-specifieke limieten zijn nuttig omdat ze de gebruiker dwingen om te gaan met redelijk grote subgroepen (bijvoorbeeld, omgaan met een grote gerasterde dataset via bestanden met gegevens van een tijdpunt elk) .
         
### Schakel naar ACDD-1.3{#switch-to-acdd-13} 
We (met name[GenererenDatasetsXml](#generatedatasetsxml)) momenteel aan te bevelen[ACDD versie 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3), dat begin 2015 is geratificeerd en in de algemene verdragen wordt aangeduid als "ACDD-1.3." VóórERDDAP™versie 1.62 (uitgebracht in juni 2015) ,ERDDAP™gebruikt/aanbevolen het origineel, versie 1.0, van de[NetCDFAttribuutverdrag voor gegevensverzamelingsontdekking](https://wiki.esipfed.org/ArchivalCopyOfVersion1)die werd aangeduid als "UnidataDataset Discovery v1.0" in de wereldwijde verdragen enMetadata\\_Conventionsattributen.

Als uw datasets eerdere versies van ACDD gebruiken, wij BEVESTIGEN dat u overschakelt naar ACDD-1.3. Het is niet moeilijk. ACDD-1.3 is zeer achterwaarts compatibel met versie 1.0. Om te schakelen, voor alle datasets (behalveEDDGridFromErdap and EDDTable FromErdap datasets) :

1. Verwijder de nieuw verouderde globaleMetadata\\_Conventionsattribuut door toevoegen (of door wijziging van de bestaandeMetadata\\_Conventionseigenschap)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
naar de dataset wereldwijd&lt;addAttributes&gt;.
     
2. Als de dataset een Verdragsattribuut heeft in de globale&lt;addAttributes&gt;, alles veranderenUnidataDataset Discovery v1.0" verwijst naar "ACDD-1.3."
Als de dataset geen Verdragsattribuut heeft in de globale&lt;addAttributes&gt;, voeg er dan een toe die verwijst naar ACDD-1.3. Bijvoorbeeld,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Als de dataset een globalestandard\\_name\\_vocabularyattribuut, verander het formaat van de waarde in bijvoorbeeld,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Als de verwijzing naar een oudere versie van de[CF-standaardnaamtabel](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). het is waarschijnlijk een goed idee om over te schakelen naar de huidige versie (65, terwijl we dit schrijven) , aangezien nieuwe standaardnamen aan die tabel worden toegevoegd met daarop volgende versies, maar oude standaardnamen zelden worden verouderd en nooit verwijderd.
     
4. Hoewel ACDD-1.0 globale attributen bevatte voorcreator\\_name,creator\\_email,creator\\_url,[GenererenDatasetsXml](#generatedatasetsxml)niet automatisch toegevoegd tot ergens in de buurtERDDAP™v1.50. Dit is belangrijke informatie:
        
    *   creator\\_namelaat gebruikers weten / cite de maker van de dataset.
    *   creator\\_emailvertelt gebruikers het gewenste e-mailadres om contact op te nemen met de maker van de dataset, bijvoorbeeld als ze vragen hebben over de dataset.
    *   creator\\_urlgeeft gebruikers een manier om meer te weten te komen over de maker.
    *   ERDDAP™gebruikt al deze informatie bij het genereren van FGDC en ISO 19115-2/19139 metagegevensdocumenten voor elke dataset. Deze documenten worden vaak gebruikt door externe zoekdiensten.
    
Voeg deze attributen toe aan de globale dataset&lt;addAttributes&gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Dat is het. Ik hoop dat dat niet te moeilijk was.
     
### Zarr{#zarr} 
Vanaf versie 2.25ERDDAP™kan lokaal lezen Zar bestanden gebruiken[EDDtabelVanNcFiles](#eddtablefromncfiles)en[EDDGridVanNcFiles](#eddgridfromncfiles).

 (Vanaf augustus 2019) We kunnen ons gemakkelijk vergissen, maar we zijn er nog niet van overtuigd dat[Zarr](https://github.com/zarr-developers/zarr-python), of soortgelijke systemen die bestanden in kleinere stukken breken, zijn grote oplossingen voor het probleem vanERDDAP™het lezen van gegevens opgeslagen in cloud-diensten zoals Amazon AWS S3. Zarr is een geweldige technologie die zijn nut heeft aangetoond in een verscheidenheid van situaties, we zijn gewoon niet zeker datERDDAP+S3 zal een van die situaties zijn. Meestal zeggen we: voordat we haast maken om al onze gegevens in Zarr op te slaan, laten we wat testen doen om te zien of het eigenlijk een betere oplossing is.

De problemen met toegang tot gegevens in de cloud zijn latency (de vertraging om eerst gegevens te krijgen) toegang op bestandsniveau (in plaats van toegang op blokniveau) . Zarr lost het toegangsprobleem op, maar doet niets aan latency. Vergeleken met het downloaden van het bestand (zodat het gelezen kan worden als een lokaal bestand met toegang op blokniveau) , Zarr kan zelfs verergeren het latency probleem omdat, met Zarr, het lezen van een bestand nu een reeks van verschillende oproepen om verschillende delen van het bestand te lezen (elk met zijn eigen vertraging) . Het latency probleem kan worden opgelost door de verzoeken parallel te maken, maar dat is een oplossing op hoger niveau, niet afhankelijk van Zarr.

En met Zarr (zoals bij relationele databases) , verliezen we het gemak van het hebben van een gegevensbestand zijn een eenvoudig, enkel bestand dat u gemakkelijk kunt controleren de integriteit van, of make/download een kopie van.

ERDDAP™  (vanaf v2) heeft een systeem voor het onderhouden van een lokale cache van bestanden van een URL bron (bv. S3) (zie [&lt;cacheFromUrl&gt; en&lt;cacheMaxGB&gt;] (#cachefromurl) ). En de nieuwe.&lt;nThreads&gt;] (#nthreads) moet het latency probleem te minimaliseren door parallel het ophalen van gegevens op een hoog niveau.&lt;cacheFromUrl&gt; lijkt zeer goed te werken voor veel scenario's. (We zijn niet zeker hoe gunstig&lt;nThreads&gt; is zonder verdere tests.) We geven toe dat we geen timing testen hebben gedaan op een AWS instantie met een goede netwerkverbinding, maar we hebben succesvol getest met verschillende externe URL-bronnen van bestanden. EnERDDAP's&lt;cacheFromUrl&gt; werkt met elk type gegevensbestand (bv..nc,.hdf, .csv,.jsonlCSV) , zelfs als extern gecomprimeerd (bv..gz) , zonder wijzigingen in de bestanden (b.v. herschrijven als Zarr collecties) .

Het is waarschijnlijk dat verschillende scenario's zullen voor verschillende oplossingen, bijvoorbeeld, hoeft slechts een deel van een bestand eenmaal te lezen (Zarr zal winnen.) , vs. moeten alle van een bestand één keer te lezen, vs. moeten delen of alle van een bestand herhaaldelijk lezen (&lt;cacheVanUrl&gt; wint).

Meestal zeggen we: voordat we haast maken om al onze gegevens in Zarr op te slaan, laten we wat testen doen om te zien of het eigenlijk een betere oplossing is.

- -
## Lijst van typedatasets{#list-of-types-datasets} 
Als u hulp nodig hebt bij het kiezen van de juiste dataset type, zie[Het type gegevensverzameling kiezen](#choosing-the-dataset-type).

De soorten datasets vallen in twee categorieën. ([Waarom?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)datasets verwerken gerasterde gegevens.
    * InEDDGriddatasets, gegevensvariabelen zijn multidimensionale arrays van gegevens.
    * Er MOET een asvariabele zijn voor elke dimensie. De asvariabelen moeten worden gespecificeerd in de volgorde waarin de gegevensvariabelen deze gebruiken.
    * InEDDGriddatasets, alle gegevensvariabelen MOET gebruiken (aandeel) alle asvariabelen.
         ([Waarom?](#why-just-two-basic-data-structures) [Wat als ze dat niet doen?](#dimensions)) 
    * Gesorteerde dimensiewaarden - In totaalEDDGriddatasets, elke dimensie MOET in gesorteerde volgorde zijn (oplopend of dalend) . Elk kan onregelmatig worden verdeeld. Er kunnen geen banden zijn. Dit is een vereiste van de[CF-metadatastandaard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Als de waarden van een dimensie niet in gesorteerde volgorde zijn, wordt de dataset niet geladen enERDDAP™zal de eerste ongesorteerde waarde in het logbestand identificeren; *bigParentDirectory* /logs/log.txt .
        
Enkele subklassen hebben extra beperkingen (met name:EDDGridAggregatedExistingDimension vereist dat de buitenste (linkste, eerste) dimensie oplopend is.
        
Ongesorteerde dimensiewaarden geven bijna altijd een probleem aan met de bronset. Dit gebeurt het vaakst wanneer een verkeerd genoemd of ongepast bestand is opgenomen in de aggregatie, wat leidt tot een ongesorteerde tijddimensie. Om dit probleem op te lossen, zie de foutmelding in deERDDAP™log.txt-bestand om de beledigende tijdswaarde te vinden. Kijk dan in de bronbestanden om het bijbehorende bestand te vinden (of één voor of één na) Dat hoort niet bij de aggregatie.
        
    * Zie de meer volledige beschrijving van de[EDDGridgegevensmodel](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    * DeEDDGriddatasets zijn:
        *   [EDDGridVanAudioFiles](#eddfromaudiofiles)Verzamelt gegevens van een groep lokale audiobestanden.
        *   [EDDGridVanDap](#eddgridfromdap)verwerkt gerasterde gegevens vanDAPservers.
        *   [EDDGridFromEDTable](#eddgridfromeddtable)laat je een tabelset omzetten naar een gerasterde dataset.
        *   [EDDGridVanErdap](#eddfromerddap)verwerkt gerasterde gegevens van een remoteERDDAP.
        *   [EDDGridVanEtopo](#eddgridfrometopo)alleen de ingebouwde ETOPO topografiegegevens.
        *   [EDDGridFromFiles](#eddgridfromfiles)is de superklasse van alleEDDGridVan... Files lessen.
        *   [EDDGridVanMergeIRFiles](#eddgridfrommergeirfiles)geaggregeerde gegevens van een groep lokale MergeIR.gzdossiers.
        *   [EDDGridVanNcFiles](#eddgridfromncfiles)geaggregeerde gegevens van een groep lokaleNetCDF  (v3 of v4)  .ncen aanverwante dossiers.
        *   [EDDGridUitNcFilesUitgepakt](#eddgridfromncfilesunpacked)een variant is indienEDDGridVanNcFiles die ook gegevens van een groep lokaleNetCDF  (v3 of v4)  .ncen aanverwante dossiers, dieERDDAP™Uitpakken op een laag niveau.
        *   [EDDGridLonPM180](#eddgridlonpm180)wijzigt de lengtegraad van een kindEDDGridzodat ze in het bereik -180 tot 180.
        *   [EDDGridLon0360](#eddgridlon0360)wijzigt de lengtegraad van een kindEDDGridzodat ze in het bereik 0 tot 360.
        *   [EDDGridSideBySide](#eddgridsidebyside)aggregaten twee of meerEDDGriddatasets naast elkaar.
        *   [EDDGridAlglobalExistingDimension](#eddgridaggregateexistingdimension)aggregaten twee of meerEDDGriddatasets, die elk een ander waardenbereik hebben voor de eerste dimensie, maar dezelfde waarden voor de andere dimensies.
        *   [EDDGridKopiëren](#eddgridcopy)kan een lokale kopie maken van een andereEDDGrid's data en serveert gegevens van de lokale kopie.
             
    * AllesEDDGriddatasets ondersteunen een nThreads instelling, die verteltERDDAP™hoeveel threads te gebruiken bij het beantwoorden van een verzoek. Zie[nThreads](#nthreads)documentatie voor details.
         
### EDDTabel{#eddtable} 
*   [ **EDDTabel** ](#eddtable)datasets verwerken tabelgegevens.
    * Tabulaire gegevens kunnen worden weergegeven als een database-achtige tabel met rijen en kolommen. Elke kolom (een gegevensvariabele) heeft een naam, een set attributen, en slaat slechts één type gegevens op. Elke rij heeft een observatie (of groep van gerelateerde waarden) . De gegevensbron kan de gegevens hebben in een andere gegevensstructuur, een ingewikkelder gegevensstructuur en/of meerdere gegevensbestanden, maarERDDAP™moet in staat zijn om de brongegevens in een database-achtige tabel om de gegevens te presenteren als een tabelset aan gebruikers vanERDDAP.
    * Zie de meer volledige beschrijving van de[EDDTable data model](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    * De EDDTable datasets zijn:
        *   [EDDtabelVanAllDatasets](#eddtablefromalldatasets)is een dataset op hoger niveau met informatie over alle andere datasets in uwERDDAP.
        *   [EDDtabelVanAsciiFiles](#eddtablefromasciifiles)aggregaten gegevens van komma-, tab-, semicolon-, of ruimte gescheiden tabel ASCII-gegevensbestanden.
        *   [EDDTableFromAsciiService](#eddtablefromasciiservice)is de superklasse van alle EDDTableFromAsciiService... klassen.
        *   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)behandelt gegevens van sommige van deNOAANOS-webdiensten.
        *   [EDDtableFromAudioFiles](#eddfromaudiofiles)Verzamelt gegevens van een groep lokale audiobestanden.
        *   [EDDTabelVan AwsXmlFiles](#eddtablefromawsxmlfiles)aggregaten gegevens van een set van automatische weerstation (AWS) XML-bestanden.
        *   [EDDtabelVanCassandra](#eddtablefromcassandra)verwerkt tabelgegevens uit één Cassandra-tabel.
        *   [EDDTabelVan ColumbarAsciiFiles](#eddtablefromcolumnarasciifiles)geaggregeerde gegevens van tabel ASCII-gegevensbestanden met kolommen met vaste breedte.
        *   [EDDtabelVanDapSequence](#eddtablefromdapsequence)verwerkt tabelgegevens vanDAPsequence servers.
        *   [EDDTableFromDatabase](#eddtablefromdatabase)verwerkt tabelgegevens uit één databasetabel.
        *   [EDDTabelVanEDDGrid](#eddtablefromeddgrid)kunt u een EDDTable dataset van eenEDDGriddataset.
        *   [EDDtabelVanErdap](#eddfromerddap)verwerkt tabelgegevens van een remoteERDDAP.
        *   [EDDtableFromFileNames](#eddtablefromfilenames)maakt een dataset aan van informatie over een groep bestanden in het bestandssysteem van de server, maar het dient geen gegevens uit de bestanden.
        *   [EDDTableFromFiles](#eddtablefromfiles)is de superklasse van alle EDDTableVan...Files klassen.
        *   [EDDTableFromHttpGet](#eddtablefromhttpget)isERDDAP"s enige systeem voor gegevensinvoer en gegevensexport.
        *   [EDDTabelVanHyraxBestanden](#eddtablefromhyraxfiles)  (AFGEGEVEN) aggregeert gegevens uit bestanden met verschillende variabelen met gedeelde dimensies die door een[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).
        *   [EDDTabelVan ongeldige CRAFiles](#eddtablefrominvalidcrafiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .ncbestanden die een specifieke, ongeldige variant van de CF DSG Contiguous Ragged Array gebruiken (CRA) dossiers. HoewelERDDAP™ondersteunt dit bestandstype, het is een ongeldig bestandstype dat niemand zou moeten gebruiken. Groepen die momenteel dit bestandstype gebruiken worden sterk aangemoedigd om te gebruikenERDDAP™om geldige CF DSG CRA bestanden te genereren en te stoppen met het gebruik van deze bestanden.
        *   [EDDtabelVanafJsonlCSVFiles](#eddtablefromjsonlcsvfiles)geaggregeerde gegevens van[JSON Lijnen CSV-bestanden](https://jsonlines.org/examples/).
        *   [EDDtabelVanMultidimNcFiles](#eddtablefrommultidimncfiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .ncbestanden met verschillende variabelen met gedeelde dimensies.
        *   [EDDtabelVanNcFiles](#eddtablefromncfiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .ncbestanden met verschillende variabelen met gedeelde dimensies. Het is prima om dit datasettype te blijven gebruiken voor bestaande datasets, maar voor nieuwe datasets raden we in plaats daarvan EDDTableFromMultidimNcFiles aan.
        *   [EDDtabelVanNcCFFiles](#eddtablefromnccffiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .ncbestanden die gebruik maken van een van de bestandsformaten die door de[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)conventies. Maar voor bestanden met behulp van een van de multidimensionale CF DSG varianten, gebruik[EDDtabelVanMultidimNcFiles](#eddtablefrommultidimncfiles)In plaats daarvan.
        *   [EDDtabelVanNccsvFiles](#eddtablefromnccsvfiles)geaggregeerde gegevens van[NCCSV](/docs/user/nccsv-1.00)ASCII .csv bestanden.
        *   [EDDTableFromNOS](#eddtablefromnos)  (AFGEGEVEN) verwerkt tabelgegevens van NOS XML servers.
        *   [EDDTabelFromOBIS](#eddtablefromobis)verwerkt tabelgegevens van OBIS-servers.
        *   [EDDtabelVanParquetFiles](#eddtablefromparquetfiles)verwerkt gegevens van[Parket](https://parquet.apache.org/).
        *   [EDDTabelVanSOS](#eddtablefromsos)verwerkt tabelgegevens vanSOSservers.
        *   [EDDtableFromDreddsFiles](#eddtablefromthreddsfiles)  (AFGEGEVEN) aggregeert gegevens uit bestanden met verschillende variabelen met gedeelde dimensies die door een[THREDDSOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).
        *   [EDDTabelVanWFSBestanden](#eddtablefromwfsfiles)  (AFGEGEVEN) maakt een lokale kopie van alle gegevens van eenArcGISKaartserverWFSserver zodat de gegevens dan snel kunnen worden opgeslagen naarERDDAP™gebruikers.
        *   [EDDTableAggregateRows](#eddtableaggregaterows)kan een EDDTable dataset maken van een groep EDDTable datasets.
        *   [EDDtabelkopie](#eddtablecopy)kan een lokale kopie van vele soorten EDDTable datasets maken en vervolgens de gegevens snel van de lokale kopie serveren.

  
- -

## Gedetailleerde beschrijvingen van datasettypes{#detailed-descriptions-of-dataset-types} 

### EDDGridVanDap{#eddgridfromdap} 
[ **EDDGridVanDap** ](#eddgridfromdap)behandelt rastervariabelen van[DAP](https://www.opendap.org/)servers.

* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt de informatie verzamelen die je nodig hebt om dat aan te passen of je eigen XML aan te maken voor eenEDDGridFromDap dataset door te kijken naar de DDS- en DAS-bestanden van de brondataset in uw browser (door .das en .dds toe te voegen aan desourceUrl, bijvoorbeeld,[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) .
     
*   EDDGridFromDap kan gegevens krijgen van elke multi-dimensionale variabele van eenDAPdataserver. (Wat voorafging:EDDGridFromDap was beperkt tot variabelen die als "raster" werden aangeduid, maar dat is niet langer een vereiste.)   
     
* Gesorteerde dimensiewaarden - De waarden voor elke dimensie MOET in gesorteerde volgorde zijn (oplopend of dalend) . De waarden kunnen onregelmatig worden verdeeld. Er kunnen geen banden zijn. Dit is een vereiste van de[CF-metadatastandaard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Als de waarden van een dimensie niet in gesorteerde volgorde zijn, wordt de dataset niet geladen enERDDAP™zal de eerste ongesorteerde waarde in het logbestand identificeren; *bigParentDirectory* /logs/log.txt .
    
Ongesorteerde dimensiewaarden geven bijna altijd een probleem aan met de bronset. Dit gebeurt het vaakst wanneer een verkeerd genoemd of ongepast bestand is opgenomen in de aggregatie, wat leidt tot een ongesorteerde tijddimensie. Om dit probleem op te lossen, zie de foutmelding in deERDDAP™log.txt-bestand om de beledigende tijdswaarde te vinden. Kijk dan in de bronbestanden om het bijbehorende bestand te vinden (of één voor of één na) Dat hoort niet bij de aggregatie.
    
#### EDDGridVanDap-skelet XML{#eddgridfromdap-skeleton-xml} 

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

     
### EDDGridFromEDTable{#eddgridfromeddtable} 
[ **EDDGridFromEDTable** ](#eddgridfromeddtable)kunt u een EDDTable tabel dataset omzetten in eenEDDGridGerasterde dataset. Onthoud datERDDAP™behandelt datasets als ofwel[gerasterde datasets (subklassen vanEDDGrid) of tabeldatasets (subklassen van EDDtabel) ](#why-just-two-basic-data-structures).

* Normaal gesproken, als je gerasterde gegevens, je gewoon instellen van eenEDDGridDataset direct. Soms is dit niet mogelijk, bijvoorbeeld, wanneer je de gegevens opgeslagen in een relationele database dieERDDAP™kan alleen via EDDTableFromDatabase.EDDGridVanuitEDTable klasse kunt u die situatie te verhelpen.
     
* Uiteraard moeten de gegevens in de onderliggende EDDTable dataset (In principe) Gerasterde gegevens, maar in een tabelvorm. Bijvoorbeeld, de EDDTable dataset kan CTD gegevens hebben: metingen van oostwaarts en noordwaarts stroom, op verschillende dieptes, op meerdere keren. Aangezien de dieptes op elk moment hetzelfde zijn,EDDGridVanuitEDDTable kan een gerasterde dataset met een tijd- en dieptedimensie worden gemaakt die de data via de onderliggende EDDTable dataset toegankelijk maakt.
     
* GenererenDatasets Xml -- Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt de informatie verzamelen die je nodig hebt om het ruwe ontwerp te verbeteren.
     
* Bronattributen -- Zoals bij alle andere soorten datasets,EDDGridFromTable heeft het idee dat er globale bronKenmerken en[wereldwijdaddAttributes](#global-attributes)  (gespecificeerd indatasets.xml) , die worden gecombineerd om de globale Attributen, die zijn wat gebruikers zien. Voor globale bronKenmerken,EDDGridFromEDTable maakt gebruik van de globale gecombineerde Attributen van de onderliggende EDDTable-dataset. (Als je er even over nadenkt, is het logisch.) 
    
Op dezelfde wijze, voor elkeaxisVariableendataVariable's[addAttributes](#addattributes),EDDGridFromEDDTable gebruikt de variabele gecombineerd Attributen van de onderliggende EDDTable dataset als deEDDGridFromEDTable variable's sourceKenmerken. (Als je er even over nadenkt, is het logisch.) 
    
Als gevolg daarvan, als de EDDtabel goede metagegevens heeft, deEDDGridFromEDTable heeft vaak zeer weinigaddAttributesMetadata -- een paar aanpassingen hier en daar.
    
*   dataVariableversusaxisVariables -- De onderliggende EDDtabel heeft alleendataVariables. EenEDDGridFromEDTable dataset zal een aantalaxisVariables (gemaakt van enkele van de EDDTabledataVariables) en sommigedataVariables (gemaakt uit de resterende EDDtabeldataVariables) .[GenererenDatasetsXml](#generatedatasetsxml)zal een gok maken over welke EDDTabledataVariablesEDDGridFromEDTableaxisVariableHet is maar een gok. U moet de output van GenerateDatasetsXml wijzigen om aan te geven welkedataVariablewordtaxisVariableIn welke volgorde.
     
* asValues -- Er is niets over de onderliggende EDDTable te vertellenEDDGridUitEDDTable de mogelijke waarden van deaxisVariables in de gerasterde versie van de dataset, dus je MOET die informatie voor elkeaxisVariablevia een van deze eigenschappen:
    
    * asValues -- laat je een lijst van waarden opgeven. Bijvoorbeeld,
        &lt;att name="axisValues"[type="doubleList"](#attributetype)\\&gt;2, 2.5, 3, 3.5, 4&lt;/att&gt;
Let op het gebruik van een[gegevenstype](#data-types)plus het woord List. Ook het type lijst (bijvoorbeeld, dubbel) , MOET overeenkomen met de gegevens Type variabele in de EDDtabel enEDDGridFromEDTable datasets.
    * asValuesStartStrideStop -- laat je een reeks regelmatig geafstande waarden specificeren door de start-, stap- en stopwaarden op te geven. Hier is een voorbeeld dat gelijk is aan de asValues voorbeeld hierboven:
        &lt;att name="axisValuesStartStrideStop"[type="doubleList"](#attributetype)\\&gt;2, 0,5, 4&lt;/att&gt;
Nogmaals, let op het gebruik van een lijstgegevenstype. Ook het type lijst (bijvoorbeeld, dubbel) , MOET overeenkomen met de gegevens Type variabele in de EDDtabel enEDDGridFromEDTable datasets.
         
    
Updates -- Net zoals er geen manier is voorEDDGridVanuitEDDTable om de asValues van de EDDTable aanvankelijk te bepalen, is er ook geen betrouwbare manier voorEDDGridFromEDDTable to determin from the EDDTable when the asValues have changed (met name wanneer er nieuwe waarden voor de tijdvariabele zijn) . Momenteel is de enige oplossing om de asValues attribuut te wijzigen indatasets.xmlen herlaad de dataset. Je kunt bijvoorbeeld een script schrijven naar
    
    1. Zoekendatasets.xmlvoor
        datasetID=" *deDatasetID* "
Dus je werkt met de juiste dataset.
    2. Zoekendatasets.xmlvoor het volgende optreden van
        <sourceName> *de variablesbronnaam* </sourceName>  
Dus je werkt met de juiste variabele.
    3. Zoekendatasets.xmlvoor het volgende optreden van
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
Dus je kent de startpositie van het label.
    4. Zoekendatasets.xmlvoor het volgende optreden van
```
        </att>  
```
Dus je kent de eindpositie van de aswaarden.
    5. Vervang de oude start, stap, stop waarden met de nieuwe waarden.
    6. Contactpersoon:[vlag URL](/docs/server-admin/additional-information#set-dataset-flag)voor de datasetERDDAP™de dataset opnieuw laden.
    
Dit is niet ideaal, maar het werkt.
     
* precisie -- WanneerEDDGridVanuitEDDTable reageert op het verzoek van een gebruiker om gegevens, verplaatst het een rij gegevens van de EDDTable-responstabel naar deEDDGridresponsraster. Om dit te doen, moet het uitzoeken of de "as" waarden op een gegeven rij in de tabel overeenkomen met een combinatie van aswaarden in het raster. Voor integer data types is het gemakkelijk om te bepalen of twee waarden gelijk zijn. Maar voor floats en doubles, dit brengt het vreselijke probleem van drijvende punt nummers[niet exact overeenkomen](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (bijvoorbeeld, 0,2 versus 0,199999999999996) . Aan (proberen) Regel dit.EDDGridFromTable kunt u een precisie-attribuut voor een van deaxisVariables, waarin het totale aantal decimalen wordt gespecificeerd dat identiek moet zijn.
    * Bijvoorbeeld,&lt;att name="precision" type="int"&gt;5&lt;/att&gt;
    * Voor verschillende soorten gegevensvariabelen zijn er verschillende standaardprecisiewaarden. De standaardinstellingen zijn meestal geschikt. Als dat niet zo is, moet je verschillende waarden opgeven.
    * VooraxisVariableer[tijd of tijd Stempelvariabelen](#timestamp-variables), de standaard is volledige precisie (een exacte match) .
    * VooraxisVariables die drijven, de standaardprecisie is 5.
    * VooraxisVariables die dubbel zijn, de standaardprecisie is 9.
    * VooraxisVariables die integer datatypes hebben,EDDGridFromEDTable negeert het precisieattribuut en gebruikt altijd volledige precisie (een exacte match) .
         
    *    **WAARSCHUWING&#33;** Bij de omzetting van een brok tabelgegevens in een brok gerasterde gegevens, indienEDDGridFromEDTable kan niet overeenkomen met een EDDTable "as" waarde met een van de verwachteEDDGridUitEDDTable-aswaarden,EDDGridVanuitEDDTable zwijgend (geen fout) gooit de gegevens van die rij van de tabel weg. Er kunnen bijvoorbeeld andere gegevens zijn (niet op het net) in de EDDTable-dataset. (En indien stap &gt; 1, het is niet duidelijk omEDDGridUittabel welke aswaarden de gewenste waarden zijn en welke degene is die door de pas moet worden overgeslagen.) Dus, als de precisiewaarden te hoog zijn, zal de gebruiker ontbrekende waarden zien in de data response wanneer geldige data waarden daadwerkelijk bestaan.
        
Omgekeerd, als de precisiewaarden te laag zijn ingesteld, EDDTable "as" waarden die niet moeten overeenkomenEDDGridVanuitEDDTable aswaarden zullen (foutief) match.
        
Deze potentiële problemen zijn verschrikkelijk, omdat de gebruiker krijgt de verkeerde gegevens (of ontbrekende waarden) wanneer ze de juiste gegevens moeten krijgen (of ten minste een foutmelding) .
Dit is geen fout inEDDGridVan tafel.EDDGridFromTable kan dit probleem niet oplossen. Het probleem is inherent aan de omzetting van tabelgegevens in gerasterde gegevens (Tenzij andere veronderstellingen kunnen worden gemaakt, maar ze kunnen hier niet worden gemaakt.) .
Het is aan jou, deERDDAP™Beheerder, **test uwEDDGridFromEDTable grondig** ervoor te zorgen dat de precisiewaarden worden vastgesteld om deze potentiële problemen te voorkomen.
        
#### kloof{#gapthreshold} 
*   [kloof](#gapthreshold)-- Dit is een zeer ongebruikelijk type dataset. Aangezien de soorten vragen die kunnen worden gesteld aan (behandeld door) aEDDGriddataset (met betrekking tot het bereik en de vooruitgang van deaxisVariables) zijn zeer verschillend van de soorten vragen die kunnen worden gemaakt om (behandeld door) een EDDTable dataset (gewoon gerelateerd aan het bereik van sommige variabelen) , de uitvoering vanEDDGridFromEDTable datasets zullen sterk variëren afhankelijk van het exacte verzoek dat wordt gedaan en de snelheid van de onderliggende EDDTable dataset. Voor verzoeken met een stridewaarde &gt; 1,EDDGridFromEDTable kan de onderliggende EDDTable vragen voor een relatief grote hoeveelheid gegevens (als stride=1) en dan sift door de resultaten, het houden van de gegevens van sommige rijen en het weggooien van de gegevens van anderen. Als het moet sift door veel gegevens om de gegevens die het nodig heeft, het verzoek zal langer duren om te vullen.
    
AlsEDDGridVanuitEDDTable kan zien dat er grote hiaten zullen zijn (met rijen van ongewenste gegevens) tussen de rijen met de gewenste gegevens;EDDGridFromEDTable kan ervoor kiezen om meerdere subverzoeken te doen naar de onderliggende EDDTable in plaats van een groot verzoek, waardoor de ongewenste rijen gegevens in de grote hiaten overslaan. De gevoeligheid voor dit besluit wordt beheerst door de kloofDreshold waarde zoals gespecificeerd in de&lt;gapDreshold&gt;-tag (standaard=1000 rijen brongegevens) . Het instellen van kloofDreshold naar een kleiner aantal zal leiden tot de dataset maken (algemeen) meer subverzoeken. Het instellen van kloofDreshold naar een groter aantal zal leiden tot de dataset maken (algemeen) minder subverzoeken.
    
Als de kloof te klein is,EDDGridFromEDTable zal langzamer werken omdat de overhead van meerdere verzoeken groter zal zijn dan de tijd die wordt bespaard door het verkrijgen van wat overtollige gegevens. Als de kloof te groot is,EDDGridFromEDTable zal langzamer werken omdat er zoveel overtollige gegevens uit de EDDTable worden gehaald, alleen om te worden weggegooid. (Zoals Goldilocks ontdekte, is het midden precies goed.) De overhead voor verschillende soorten EDDTable datasets varieert sterk, dus de enige manier om de eigenlijke beste instelling voor uw dataset te kennen is via experimenten. Maar je gaat niet te ver als je je aan de standaard houdt.
    
Een eenvoudig voorbeeld is: Stel je eenEDDGridFromTable met slechts éénaxisVariable  (tijd, met een grootte van 100000) , ééndataVariable  (temperatuur) , en de default gap Threshold van 1000.
    
    * Als een gebruiker temperatuur aanvraagt\\[0&#58;100&#58;5000\\], de pas is 100 dus de kloof is 99, dat is minder dan de kloof Threshold. Dus.EDDGridFromTable zal slechts één verzoek indienen bij EDDTable voor alle gegevens die nodig zijn voor het verzoek (equivalent aan temperatuur\\[0:5000\\]) en gooi alle rijen gegevens weg die het niet nodig heeft.
    * Als een gebruiker temperatuur aanvraagt\\[0:2500:5000\\], die stap is 2500 dus de kloof is 2499, die groter is dan de kloof Threshold. Dus.EDDGridFromTable zal afzonderlijke verzoeken doen naar EDDTable die gelijk zijn aan temperatuur\\[0\\], temperatuur\\[2500\\], temperatuur\\[5000\\].
    
Berekening van de kloofgrootte is ingewikkelder als er meerdere assen zijn.
    
Voor elke gebruikersaanvraag,EDDGridUitEDDTable drukt kenmerkende berichten met betrekking tot dit in de[log.txt](/docs/server-admin/additional-information#log)bestand.
    
    * Indien [&lt;logLevel&gt;] (#loglevel) indatasets.xmlis ingesteld op info, dit drukt een bericht af als
\\* nOuterAxes=1 van 4 nOuterRequests=22
Als nOuterAxes=0, gap Threshold niet werd overschreden en slechts één verzoek zal worden gedaan aan EDDTable.
Als nOuterAxes&gt;0, gap Threshold werd overschreden en nOuterRequests zal worden gemaakt naar EDDTable, overeenkomend met elke gewenste combinatie van de meest linkse nOuterAxes. Bijvoorbeeld, als de dataset 4 heeftaxisVariables endataVariableS als oostwaarts\\[tijd\\]\\[breedtegraad\\]\\[lengtegraad\\]\\[diepte\\], de meest linkse (eerst) asvariabele is tijd.
    * Als&lt;logLevel&gt; indatasets.xmlis ingesteld op alles, aanvullende informatie is geschreven naar het log.txt bestand.
         
#### EDDGridFromEDDTable skelet XML{#eddgridfromeddtable-skeleton-xml} 
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

### EDDERDDAP {#eddfromerddap} 
 **EDDGridVanErdap** verwerkt gerasterde gegevens van een remoteERDDAP™server.
 **EDDtabelVanErdap** verwerkt tabelgegevens van een remoteERDDAP™server.

*   EDDGridVanErdap en EDDtableVan Erddap gedragen zich anders dan alle andere soorten datasets inERDDAP.
    * Net als andere soorten datasets krijgen deze datasets informatie over de dataset van de bron en bewaren ze in het geheugen.
    * Zoals andere soorten datasets, wanneerERDDAP™zoekt naar datasets, toont het Data Access Formulier ( *datasetID* .html) , of toont de Make A Graph formulier ( *datasetID* .graph) ,ERDDAP™gebruikt de informatie over de dataset in het geheugen.
    *   EDDGridFromErdap and EDDTable FromErdap zijn de basis voor[rasters/clusters/feeraties](/docs/server-admin/scaling)vanERDDAPs, die het CPU-gebruik efficiënt verdelen (voornamelijk voor het maken van kaarten) , geheugengebruik, datasetopslag en bandbreedtegebruik van een groot datacenter.
#### Doorsturen{#redirect} 
* In tegenstelling tot andere soorten datasets, wanneerERDDAP™ontvangt een verzoek om gegevens of afbeeldingen van deze datasets;ERDDAP [omleidingen](https://en.wikipedia.org/wiki/URL_redirection)het verzoek naar de remoteERDDAP™server. Het resultaat is:
    * Dit is erg efficiënt. (CPU, geheugen en bandbreedte) , omdat anders
        1. De samenstellingERDDAP™moet het verzoek naar de andereERDDAP™  (wat tijd kost) .
        2. De andereERDDAP™moet de gegevens te krijgen, opnieuw te formatteren, en de gegevens te verzenden naar de samenstellingERDDAP.
        3. De samenstellingERDDAP™moet de gegevens ontvangen (gebruik van bandbreedte) , herformatteren (gebruik van CPU en geheugen) , en verzend de gegevens naar de gebruiker (gebruik van bandbreedte) . Door het verzoek door te sturen en de andereERDDAP™om het antwoord direct naar de gebruiker te sturen, de composietERDDAP™besteedt in wezen geen CPU tijd, geheugen, of bandbreedte aan het verzoek.
    * De omleiding is transparant naar de gebruiker, ongeacht de client software (een browser of een andere software of command line tool) .
*   [Je kunt zienERDDAP™](#redirect)geen gebruikersverzoeken doorsturen door instelling&lt;omleiding&gt;vals&lt;/redirect&gt;, maar dit negeert de meeste voordelen van de ...FromErdap dataset type (met name het verspreiden van de belasting aan de voorkantERDDAP™naar het remote/backendERDDAP) .
         
     
#### Abonnementen{#subscriptions} 
Normaal gesproken, wanneer eenEDDGridFromErdap and EDDTable FromErdap zijn (re) geladen op uwERDDAP, proberen ze een abonnement toe te voegen aan de externe dataset via de remoteERDDAPhet e-mail/URL-abonnementssysteem. Op die manier, wanneer de externe dataset verandert, de remoteERDDAP™contact opnemen met de[setDataset Vlag URL](/docs/server-admin/additional-information#set-dataset-flag)op uwERDDAP™zodat de lokale dataset zo snel mogelijk wordt herladen en zodat de lokale dataset altijd perfect up-to-date is en de dataset op afstand nabootst. Dus de eerste keer dat dit gebeurt, moet je een e-mail krijgen waarin wordt gevraagd dat je het abonnement valideert. In het geval dat de lokaleERDDAP™kan geen e-mail versturen of als de remoteERDDAP's e-mail/URL abonnementssysteem is niet actief, u moet de remote e-mailenERDDAP™beheerder en vraag dat s/he handmatig toevoegen [&lt;onChange&gt;] (#onchange) ...&lt;/onChange&gt; tags naar alle relevante datasets om uw dataset aan te roepen[setDataset Vlag URL's](/docs/server-admin/additional-information#set-dataset-flag). ZieERDDAP™dagelijks rapport voor een lijst van setDataset Vlag URL's, maar stuur gewoon degenen voorEDDGridVanErdap en EDDtableVanErdap datasets naar de remoteERDDAP™Beheerder.
    
Werkt dit niet? Blijft uw lokale datasets niet synchroon met de datasets op afstand?
Verschillende dingen moeten allemaal correct werken zodat dit systeem werkt zodat uw datasets up-to-date blijven. Controleer elk van deze dingen in volgorde:
    
    1. UwERDDAP™moeten e-mails kunnen versturen. Zie de e-mailinstellingen in uw setup.xml.
    2. In het algemeen (maar niet altijd) ,ERDDAP's&lt;baseUrl&gt; en&lt;baseHttpsUrl&gt;moet geen poortnummer hebben (bv.:8080,8443) . Zo ja, gebruik dan een[proxypass](/docs/server-admin/deploy-install#proxypass)om de poort uit de Url te verwijderen.
    3. In uw setup.xml,&lt;abonnerenToRemoteErdapDataset&gt; moet op waar gezet worden.
    4. Als je lokale EDD... FromErdap dataset wordt opnieuw geladen, het moet een verzoek naar de remote sturenERDDAP™te abonneren op de dataset op afstand. Kijk in log.txt om te zien of dit gebeurt.
    5. U zou een e-mail moeten krijgen waarin u wordt gevraagd het abonnementsverzoek te valideren.
    6. U moet op de link in die e-mail klikken om het abonnementsverzoek te valideren.
    7. De afstandsbedieningERDDAP™zou moeten zeggen dat de validatie succesvol was. Op elk moment kunt u een e-mail aanvragen van de remoteERDDAP™met een lijst van uw lopende en geldige abonnementen. Zie het formulier *erddapbase op afstand Url* /erddap/subscriptions/list.html .
    8. Wanneer de dataset op afstand verandert (b.v. krijgt aanvullende gegevens) , de afstandsbedieningERDDAP™moet proberen om contact op te nemen met de flagURL op uwERDDAP. U kunt dit niet controleren, maar u kunt de beheerder van de remote vragenERDDAP™Om dit te controleren.
    9. UwERDDAP™moet een verzoek ontvangen om die vlagURL in te stellen. Kijk in je log.txt voor "setDatasetFlag.txt?" verzoek (s) en zien of er een foutmelding in verband met de verzoeken.
    10. UwERDDAP™moet dan proberen om die dataset te herladen (misschien niet onmiddellijk, maar ASAP) .
         
#### max. up-to-date (tijd) ?{#up-to-date-maxtime} 
EDDGrid/TableFromErdap datasets verandert alleen hun opgeslagen informatie over elke brondataset wanneer de brondataset is["herladen"ed](#reloadeverynminutes)en een stukje metadata verandert (bv. de tijdvariabeleactual\\_range) , waardoor het genereren van een abonnement kennisgeving. Als de bronset gegevens heeft die vaak veranderen (bijvoorbeeld, nieuwe data elke seconde) en gebruikt de["Bijwerken"](#updateeverynmillis)systeem om frequente wijzigingen in de onderliggende gegevens op te merken, deEDDGrid/TableFromErdap zal niet worden geïnformeerd over deze frequente wijzigingen tot de volgende dataset "herladen," zodat deEDDGrid/TableFromErdap zal niet perfect up-to-date zijn. U kunt dit probleem minimaliseren door het wijzigen van de brondataset's&lt;herladenEveryNMinutes&gt; naar een kleinere waarde (60?) zodat er meer abonnementsnotificaties zijn om deEDDGrid/TableFromErdap om de informatie over de bronset bij te werken.

Of, als uw data management systeem weet wanneer de bron dataset nieuwe gegevens heeft (b.v. via een script dat een gegevensbestand op zijn plaats kopieert) , en als dat niet super frequent is (b.v. elke 5 minuten, of minder frequent) Er is een betere oplossing:

1. Niet gebruiken&lt;EveryNMillis&gt; bijwerken om de bronset up-to-date te houden.
2. De brondataset instellen&lt;herladenEveryNMinutes&gt; naar een groter getal (1440?) .
3. Laat het script contact opnemen met de brondataset[vlag URL](/docs/server-admin/additional-information#set-dataset-flag)Direct nadat het kopieert een nieuw gegevensbestand op zijn plaats.
     

Dat zal ertoe leiden dat de brondataset perfect up-to-date is en ervoor zorgt dat het een abonnementsmelding genereert, die naar deEDDGrid/TableFromErdap dataset. Dat zal leiden tot deEDDGrid/TableFromErdap dataset perfect up-to-date (Nou ja, binnen 5 seconden na toevoeging van nieuwe gegevens) . En dat alles zal efficiënt gebeuren. (zonder onnodige datasetherladen) .
     
#### NeeaddAttributes,axisVariable, ofdataVariable {#no-addattributes-axisvariable-or-datavariable} 
In tegenstelling tot andere soorten datasets, EDDTableFromErdap enEDDGridFromErdap datasets staan geen globale&lt;addAttributes&gt;,&lt;axisVariable&gt;, of&lt;dataVariable&gt; secties in dedatasets.xmlvoor die dataset. Het probleem is dat het toestaan van die zou leiden tot inconsistenties:
    
1. Laten we zeggen dat het was toegestaan en je voegde een nieuwe globale eigenschap.
2. Wanneer een gebruiker vraagt uwERDDAP™voor de globale attributen zal het nieuwe attribuut verschijnen.
3. Maar wanneer een gebruiker vraagt uwERDDAP™voor een gegevensbestand,ERDDAP™verwijst het verzoek door naar de bronERDDAP. DatERDDAP™is zich niet bewust van de nieuwe eigenschap. Dus als het een gegevensbestand aanmaakt met metagegevens, bijvoorbeeld een.ncbestand, de metadata zullen het nieuwe attribuut niet hebben.

Er zijn twee oplossingen:

1. Overtuig de beheerder van de bronERDDAP™om de wijzigingen aan te brengen die u wilt aanbrengen in de metadata.
2. In plaats van EDDTableFromErdap, gebruik[EDDtabelVanDapSequence](#eddtablefromdapsequence). OfEDDGridFromErdap, gebruik[EDDGridVanDap](#eddgridfromdap). Met deze EDD types kunt u efficiënt verbinding maken met een dataset op een remoteERDDAP™  (maar zonder het omleiden van gegevensverzoeken) en ze staan je toe om globale&lt;addAttributes&gt;,&lt;axisVariable&gt;, of&lt;dataVariable&gt; secties in dedatasets.xml. Een ander verschil: u moet zich handmatig abonneren op de externe dataset, zodat de dataset op uwERDDAP™zal worden aangemeld (via de[vlag URL](/docs/server-admin/additional-information#set-dataset-flag)) wanneer er wijzigingen zijn in de dataset op afstand. Zo creëer je een nieuwe dataset, in plaats van te koppelen aan een dataset op afstand.
         
#### Overige opmerkingen{#other-notes} 
* Om veiligheidsredenen,EDDGridFromErdap and EDDTable FromErdap ondersteunt de [&lt;toegankelijkTo&gt;] (#accessibleto) tag en kan niet gebruikt worden met externe datasets die ingelogd moeten worden (omdat ze [ gebruiken)&lt;toegankelijkTo&gt;] (#accessibleto) ). ZieERDDAP's[beveiligingssysteem](/docs/server-admin/additional-information#security)voor het beperken van de toegang tot bepaalde datasets tot sommige gebruikers.
     
* Beginnen metERDDAP™v2.10,EDDGridFromErdap en EDDTableFromErdap ondersteunen de [&lt;toegankelijkViaFiles&gt;] (#toegankelijkeviabestanden) Tag. In tegenstelling tot andere soorten datasets, is de standaard waar, maar de bestanden van de dataset zullen alleen toegankelijk zijnViaFiles als de bronset ook&lt;toegankelijkViaFiles&gt; op waar gezet.
     
* U kunt de[GenererenDatasets Xml-programma](#generatedatasetsxml)om dedatasets.xmlbrok voor dit type dataset. Maar je kunt dit soort datasets gemakkelijk met de hand doen.
     
#### EDDGridVan Erddap-skelet XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGridVan Erddap-skelet XML dataset is heel eenvoudig, omdat de bedoeling is om de externe dataset na te bootsen die al geschikt is voor gebruik inERDDAP:
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

#### EDDTabelVanErdapskelet XML{#eddtablefromerddap-skeleton-xml} 
* Het skelet XML voor een EDDTableFromErdap dataset is zeer eenvoudig, omdat de bedoeling is om de externe dataset na te bootsen, die al geschikt is voor gebruik inERDDAP:
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

### EDDGridVanEtopo{#eddgridfrometopo} 
[ **EDDGridVanEtopo** ](#eddgridfrometopo)alleen dient de[ETOPO1 Global 1-minute Gridded Elevation Data set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Ice Surface, raster geregistreerd, binair, 2byte int: etopo1\\_ice\\_g\\_i2.zip) die is verdeeld metERDDAP.

* Slechts tweedatasetIDs worden ondersteund voorEDDGridVanuitEtopo, zodat u toegang hebt tot de gegevens met lengtegraden -180 tot 180, of lengtegraden 0 tot 360.
* Er zijn nooit sub-tags, omdat de gegevens is al beschreven binnenERDDAP.
* Dus de twee opties voorEDDGridVan Etopo datasets zijn (letterlijk) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridFromFiles{#eddgridfromfiles} 
[ **EDDGridFromFiles** ](#eddgridfromfiles)is de superklasse van alleEDDGridVan... Files lessen. Je kunt niet gebruikenEDDGridVan Files rechtstreeks. In plaats daarvan, gebruik een subklasse vanEDDGridFromFiles om het specifieke bestandstype te verwerken:

*   [EDDGridVanMergeIRFiles](#eddgridfrommergeirfiles)verwerkt gegevens van gridded[Samenvoegen.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)dossiers.
*   [EDDGridVanAudioFiles](#eddfromaudiofiles)Verzamelt gegevens van een groep lokale audiobestanden.
*   [EDDGridVanNcFiles](#eddgridfromncfiles)verwerkt gegevens van gridded[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)bestanden,[HDF  (v4 of v5)  .hdf](https://www.hdfgroup.org/)bestanden,[.ncml](#ncml-files)bestanden, en[NetCDF  (v3 of v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)dossiers. Dit kan werken met andere bestandstypen (Bijvoorbeeld, BUFR) , we hebben het alleen nog niet getest -- stuur ons alsjeblieft wat monsterbestanden als je geïnteresseerd bent.
*   [EDDGridUitNcFilesUitgepakt](#eddgridfromncfilesunpacked)is een variant vanEDDGridFromNcFiles die gegevens van gerasterd verwerkenNetCDF  (v3 of v4)  .ncen aanverwante dossiers, dieERDDAP™Uitpakken op een laag niveau.

Momenteel worden geen andere bestandstypen ondersteund. Maar het is meestal relatief gemakkelijk om ondersteuning voor andere bestandstypen toe te voegen. Neem contact met ons op als u een verzoek heeft. Of, als uw gegevens is in een oud bestandsformaat dat u zou willen weggaan van, raden wij het omzetten van de bestanden te zijnNetCDFv3.ncdossiers.NetCDFis een breed ondersteund, binair formaat, maakt snelle willekeurige toegang tot de gegevens, en wordt al ondersteund doorERDDAP.

#### Details van bestanden{#from-files-details} 
De volgende informatie is van toepassing op alle subklassen vanEDDGridVan Files.

##### Samenvoeging van een bestaande dimensie{#aggregation-of-an-existing-dimension} 
Alle variaties vanEDDGridFromFiles kan gegevens verzamelen uit lokale bestanden, waar elk bestand 1 heeft (of meer) verschillende waarden voor het meest links (eerst) dimensie, meestal\\[tijd\\], die zal worden samengevoegd. Bijvoorbeeld, de afmetingen kunnen zijn\\[tijd\\]\\[Hoogte\\]\\[breedtegraad\\]\\[lengtegraad\\], en de bestanden kunnen de gegevens voor een (of een paar) tijdswaarde (s) per dossier. De resulterende dataset lijkt alsof alle gegevens van het bestand zijn gecombineerd. De grote voordelen van aggregatie zijn:

* De grootte van de geaggregeerde gegevensset kan veel groter zijn dan een enkel bestand kan gemakkelijk zijn (~2GB) .
* Voor bijna-real-time gegevens is het eenvoudig om een nieuw bestand met de nieuwste brok gegevens toe te voegen. Je hoeft niet de hele dataset te herschrijven.

De vereisten voor aggregatie zijn:
* De lokale bestanden hoeven niet hetzelfde te hebbendataVariables (zoals gedefinieerd in de datasetdatasets.xml) . De dataset zal dedataVariables gedefinieerd indatasets.xml. Als een gegeven bestand geen gegeven heeftdataVariable,ERDDAP™zal ontbrekende waarden toevoegen indien nodig.
* AlledataVariableMOETEN hetzelfde gebruikenaxisVariables/afmetingen (zoals gedefinieerd in de datasetdatasets.xml) . De bestanden zullen worden samengevoegd op basis van de eerste (links-meest) dimensie, gesorteerd in oplopende volgorde.
* Elk bestand kan gegevens bevatten voor één of meer waarden van de eerste dimensie, maar er kan geen overlapping zijn tussen bestanden. Als een bestand meer dan één waarde heeft voor de eerste dimensie, MOETEN de waarden gesorteerd worden in stijgende volgorde, zonder verbindingen.
* Alle bestanden MOET exact dezelfde waarden hebben voor alle andere dimensies. De nauwkeurigheid van de test wordt bepaald door[matchAxisNDigits](#matchaxisndigits).
* Alle bestanden moeten precies hetzelfde hebben[eenheden](#units)metagegevens voor alleaxisVariables endataVariables. Als dit een probleem is, kunt u[NcML](#ncml-files)of[NCO](#netcdf-operators-nco)om het probleem op te lossen.
         
##### Samenvoegen via bestandsnamen of globale metadata{#aggregation-via-file-names-or-global-metadata} 
Alle variaties vanEDDGridFromFiles kan ook een groep bestanden samenvoegen door een nieuwe linkse toe te voegen (eerst) dimensie, meestal tijd, gebaseerd op een waarde afgeleid van elke bestandsnaam of van de waarde van een globaal attribuut dat in elk bestand is. De bestandsnaam kan bijvoorbeeld de tijdswaarde voor de gegevens in het bestand bevatten.ERDDAP™zou dan een nieuwe tijddimensie creëren.

In tegenstelling tot de soortgelijke functie in THREDDS,ERDDAP™maakt altijd eenaxisVariablemet numerieke waarden (zoals vereist door CF) , nooit tekenreekswaarden (die niet door CF zijn toegestaan) . Ook,ERDDAP™zal sorteren de bestanden in de aggregatie op basis van de numeriekeaxisVariablewaarde die aan elk bestand wordt toegekend, zodat de asvariabele altijd gesorteerde waarden heeft zoals vereist door CF. De THREDDS benadering van het doen van een lexicografisch soort gebaseerd op de bestandsnamen leidt tot aggregaties waar de aswaarden niet zijn gesorteerd (die door CF niet is toegestaan) wanneer de bestandsnamen anders sorteren dan de afgeleideaxisVariablewaarden.

Het instellen van een van deze aggregaties inERDDAP™, u zult een nieuwe linkse definiëren (eerst)  [axisVariable](#axisvariable)met een speciale, pseudo&lt;sourceName&gt;, waarin staatERDDAP™waar en hoe de waarde voor de nieuwe dimensie van elk bestand te vinden.

* Het formaat voor de pseudosourceNamedie de waarde van een bestandsnaam krijgt (gewoon bestandsnaam.ext) is
    \\*\\*\\ *bestandsnaam,* [gegevens Type](#data-types) *,* extractRegex *,* captureGroupNumber*
* Het formaat voor de pseudosourceNamedie de waarde krijgt van de absolute padnaam van een bestand is
    \\*\\*\\ *padnaam,* [gegevens Type](#data-types) *,* extractRegex *,* captureGroupNumber*
    \\[Hiervoor gebruikt de padnaam altijd'/'als het map scheidingsteken, nooit '\\'.\\]
* Het formaat voor de pseudosourceNamedie de waarde krijgt van een globaal kenmerk is
    \\*\\*\\ *wereldwijd:* eigenschap Naam *,* [gegevens Type](#data-types) *,* extractRegex *,* captureGroupNumber*
* Deze pseudosourceNameoptie werkt anders dan de andere: in plaats van het maken van een nieuwe links (eerst)  axisVariable, dit vervangt de waarde van de huidigeaxisVariablemet een waarde uit de bestandsnaam (gewoon bestandsnaam.ext) . Het formaat is
    \\*\\*\\ *vervangen FromFileName,* [gegevens Type](#data-types) *,* extractRegex *,* captureGroupNumber*
     

De beschrijvingen van de onderdelen die u moet verstrekken zijn:

*    *eigenschap Naam* -- de naam van het globale attribuut dat in elk bestand zit en de dimensiewaarde bevat.
*    *gegevens Type* -- Dit geeft het gegevenstype aan dat zal worden gebruikt om de waarden op te slaan. Zie de standaardlijst van[gegevens Typen](#data-types)datERDDAP™ondersteunt, behalve dat tekenreeks is hier niet toegestaan omdat as variabelen inERDDAP™kan geen string variabelen zijn.
    
Er is een extra pseudo dataType, timeFormat= *tekenreeks TijdFormat* , die verteltERDDAP™dat de waarde een String timeStamp is[eenheden geschikt voor tekenreekstijden](#string-time-units). In de meeste gevallen zal de stringTimeFormat die u nodig hebt een variatie van een van deze formaten zijn:
    
    *   yyyy-MM-dd"T'HH:mm:ss.SSSZ -- welke ISO 8601:2004 (E) datumtijdformaat. U kunt een verkorte versie van dit, bijvoorbeeld,yyyy-MM-dd"T'HH:mm:ss ofyyyy-MM-dd.
    * jjjjMMddHHmmss.SSS -- dat is de compacte versie van het datumformaat ISO 8601. U kunt een verkorte versie hiervan nodig hebben, bijvoorbeeld jjjjMMddHmmss of jjjjMMdd.
    * M/d/jjjj H:mm:ss.SSS -- dat is het Amerikaanse slash datum formaat. U kunt een verkorte versie hiervan nodig hebben, bijvoorbeeld M/d/jjjj .
    * jjjjDDDHHmmssSSS -- dat is het jaar plus de nul-opgevulde dag van het jaar (Bijvoorbeeld, 001 = 1 januari, 365 = 31 december in een niet-leap jaar; dit wordt soms ten onrechte de Juliaanse datum genoemd) . U kunt een verkorte versie van dit, bijvoorbeeld jjjjDDD .
    
Als u deze pseudo dataType gebruikt, voeg dit toe aan de nieuwe variabele&lt;addAttributes&gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Als u alle tijdwaarden wilt verschuiven, verschuift u de tijdswaarde in eenheden, bijvoorbeeld
1970-01-01T12:00:00Z.
*    *extractRegex* -- Dit is de[reguliere expressie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([handleiding](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) waarin een vangstgroep is opgenomen (tussen haakjes) die beschrijft hoe je de waarde uit de bestandsnaam of globale attribuutwaarde haalt. Bijvoorbeeld, gegeven een bestandsnaam zoals S19980011998031.L3b\\_MO\\_CHL.nc, vangen groep #1, "\\dhandleiding", in de reguliere uitdrukking S (\\dhandleiding) \\dhandleiding\\.L3b.\\* zal de eerste 7 cijfers vastleggen na 'S': 1998001.
*    *captureGroupNumber* -- Dit is het nummer van de opnamegroep (tussen haakjes) in de reguliere uitdrukking die de informatie van belang bevat. Het is meestal 1, de eerste vangst groep. Soms moet je capture groepen gebruiken voor andere doeleinden in de regex, dus dan is het belangrijke capture groep nummer 2 (de tweede vangstgroep) of 3 (derde) , enz.

Een volledig voorbeeld van eenaxisVariabledie een geaggregeerde dataset maakt met een nieuwe tijdas die de tijdwaarden krijgt van de bestandsnaam van elk bestand is
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Wanneer u de "timeFormat=" pseudogegevens gebruikt TypeERDDAP™zal 2 attributen toevoegen aan deaxisVariablezodat ze lijken te komen van de bron:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Dus in dit geval,ERDDAP™zal een nieuwe as aanmaken"time"met dubbele waarden (seconden sinds 1970-01-01T00:00:00Z) door de 7 cijfers na "S" en vóór ".L3m" in de bestandsnaam te extraheren en deze te interpreteren als tijdwaarden die zijn geformatteerd als jjjjDDD.

U kunt de standaard basistijd overschrijven (1970-01-01T00:00:00Z) door toevoeging van een[addAttribuut](#addattributes)die een andere eenheid attribuut met een andere basistijd specificeert. Een veel voorkomende situatie is: er zijn groepen van gegevensbestanden, elk met een 1 dag composiet van een satelliet dataset, waar u wilt dat de tijd waarde middag van de dag vermeld in de bestandsnaam (de gecentreerde tijd van elke dag) en wil de variabelelong\\_nameom "Centered Time" te zijn. Een voorbeeld hiervan is:
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
Notitie uren=12 in de basistijd, die 12 uur toevoegt ten opzichte van de oorspronkelijke basistijd van 1970-01-01T00:00:00Z.

Een volledig voorbeeld van eenaxisVariabledie een geaggregeerde dataset maakt met een nieuwe "run"-as (met int-waarden) die de run waarden van het "runID" globale attribuut in elk bestand krijgt (met waarden als "r17\\_global," waarbij 17 het runnummer is) is
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
Let op het gebruik van de capture groep nummer 2 om de cijfers vast te leggen die voorkomen na 'r' of 's', en voor "\\_global." Dit voorbeeld laat ook zien hoe je extra attributen toevoegt (bv.ioos\\_categoryen eenheden) naar de variabele as.
     
#### Extern gecomprimeerde bestanden{#externally-compressed-files} 
* Datasets vanEDDGridFromFiles en EDDTable FromFiles kan gegevens rechtstreeks uit extern gecomprimeerde gegevensbestanden serveren, waaronder.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, en Z-bestanden.
     
*    **Dit werkt verrassend goed&#33;**   
In de meeste gevallen is de vertraging in verband met het decomprimeren van kleine en middelgrote gegevensbestanden gering. Als u schijfruimte moet sparen, raden we het gebruik van deze functie sterk aan, vooral voor oudere bestanden die zelden toegankelijk zijn.
     
*    **Bespaar geld.**   
Dit is een van de weinige functies inERDDAP™dat biedt u een kans om veel geld te besparen (Hoewel ten koste van een licht verminderde prestatie) . Als de compressieverhouding bijvoorbeeld 6:1 is (soms zal het veel hoger zijn) , dan hebben de gegevensbestanden van de dataset slechts 1/6 schijfruimte nodig. Dan kunt u misschien met 1 RAID (van een bepaalde grootte) in plaats van 6 RAIDS (van dezelfde grootte) . Dat is een enorme kostenbesparing. Hopelijk, de mogelijkheid om sommige bestanden te comprimeren in een collectie (De oudere?) en niet comprimeren (De nieuwere?) , en om dat te veranderen op elk moment, laten we je minimaliseren van het nadeel aan het comprimeren van sommige van de bestanden (tragere toegang) . En als de keuze is tussen het opslaan van de bestanden op tape (en alleen toegankelijk op verzoek, na een vertraging) vs ze gecomprimeerd opslaan op een RAID (en toegankelijk viaERDDAP) , dan is er een enorm voordeel aan het gebruik van compressie, zodat gebruikers krijgen interactief en (relatief) snelle toegang tot de gegevens. En als dit u kan redden van de aankoop van een extra RAID, kan deze functie u ongeveer $ 30.000 besparen.
     
* Voor iedereenEDDGridFromFiles subklassen, als de gegevensbestanden een extensie die aangeeft dat ze extern gecomprimeerde bestanden (momenteel:.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, of Z) ,ERDDAP™zal de bestanden decomprimeren naar de cache directory van de dataset wanneer het ze leest (als ze nog niet in de cache zijn) . Hetzelfde geldt voor binair bestand (bv..nc) subklassen van EDDTableFromFiles.
     
* Voor EDDtableFromFromFiles subklassen voor niet-binaire bestanden (bv. .csv) , gegevensbestanden met een extensie die aangeeft dat ze extern gecomprimeerde bestanden zullen worden gedecomprimeerd on-the-fly als het bestand wordt gelezen.
     
* VERPLICHTING: Als het type extern gecomprimeerd bestand wordt gebruikt (bv..tgzof.zip) ondersteunt meer dan 1 bestand in het gecomprimeerde bestand, het gecomprimeerde bestand moet slechts 1 bestand bevatten.
     
* VERPLICHTING: Deze functie gaat ervan uit dat de inhoud van de extern gecomprimeerde bestanden niet verandert, zodat een gecached gedecomprimeerd bestand kan worden hergebruikt. Als sommige of alle gegevensbestanden van een dataset soms worden gewijzigd, niet comprimeren die bestanden. Dit is consistent met algemeen gebruik, omdat mensen normaal gesproken niet comprimeren bestanden die ze soms nodig hebben om te veranderen.
     
*   &lt;bestandNameRegex&gt; Om dit te laten werken, is de dataset&lt;bestandNameRegex&gt; moet overeenkomen met de namen van de gecomprimeerde bestanden. Uiteraard, regexes zoals.\\*zal overeenkomen met alle bestandsnamen. Als u een specifiek bestandstype opgeeft, bijvoorbeeld .\\*\\.nc, dan moet je de regex wijzigen om ook de compressie-extensie, bijvoorbeeld, .\\ *\\.nc\\.gz(als alle bestanden* iets.nc.gzbestanden) .
     
* Het is prima als uw dataset bevat een mix van gecomprimeerde en niet gecomprimeerde bestanden. Dit kan nuttig zijn als u gelooft dat sommige bestanden (bv. oudere bestanden) wordt minder vaak gebruikt en daarom zou het nuttig zijn om schijfruimte te besparen door ze te comprimeren. Om dit te laten werken, de&lt;bestandNameRegex&gt; moet overeenkomen met de gecomprimeerde en niet gecomprimeerde namen van bestanden, bijvoorbeeld .\\*of .\\*\\.nc (|\\.gz) (wanneer de vangstgroep aan het einde van dat specificeert dat.gzis facultatief.
     
* Het is prima als u comprimeren of decomprimeren specifieke bestanden in de collectie op elk moment.
Als de dataset niet gebruikt [&lt;updateEveryNMillis&gt;] (#Updateeveryenmillis) , stel de dataset in[vlag](/docs/server-admin/additional-information#flag)om te vertellenERDDAP™de dataset opnieuw laden en zo de wijzigingen opmerken. Interessant is dat je verschillende compressiealgoritmen en instellingen kunt gebruiken voor verschillende bestanden in dezelfde dataset (bv..bz2voor zelden gebruikte bestanden,.gzvoor niet vaak gebruikte bestanden, en geen compressie voor veelgebruikte bestanden) , maar zorg ervoor dat de regex ondersteunt alle bestandsextensies die in gebruik zijn, bijvoorbeeld .\\*\\\.nc (|\\.gz|\\.bz2) .
     
* Uiteraard variëren compressieverhoudingen en snelheden voor de verschillende compressiealgoritmen met het bronbestand en de instellingen (bv. compressieniveau) . Als u dit systeem wilt optimaliseren voor uw bestanden, doe dan een test van de verschillende compressiemethoden met uw bestanden en met een reeks compressieinstellingen. Als u een betrouwbaar goed wilt (niet noodzakelijk de beste) setup, zullen we enigszins aanbevelengzip  (.gz) .gzipmaakt het kleinste gecomprimeerde bestand niet (Het is redelijk dichtbij.) , maar het comprimeert het bestand zeer snel en (belangrijker voorERDDAP™gebruikers) Decomprimeert het bestand zeer snel. Plus,gzipsoftware wordt standaard geleverd met elke Linux en Mac OS installatie en is gemakkelijk beschikbaar voor Windows via gratis tools zoals 7Zip en Linux add-ons zoals Git Bash. Bijvoorbeeld om een bronbestand te comprimeren in de.gzversie van het bestand (dezelfde bestandsnaam, maar met.gzbijlage) Gebruik (in Linux, Mac OS en Git Bash)   
    gzip  *sourceName*   
Om een te decomprimeren.gzbestand terug naar het origineel, gebruik
gunzip *sourceName.gz*   
Om elk van de bronbestanden in de map en de submappen te comprimeren, recursief gebruiken
    gzip-r *directornaam*   
Om elk van de.gzbestanden in map en haar submappen , recursief, gebruik
gunzip -r *directornaam*   
     
* WAARSCHUWING: niet extern comprimeren (gzip) bestanden die al intern gecomprimeerd zijn&#33;
Veel bestanden hebben al gecomprimeerde gegevens intern. Als ugzipdeze bestanden, de resulterende bestanden zullen niet veel kleiner (&lt;5%) enERDDAP™zal verspillen tijd decomprimeren hen wanneer het nodig is om ze te lezen. Bijvoorbeeld:
    
    * gegevensbestanden: bv..nc4, en.hdf5 bestanden: Sommige bestanden gebruiken interne compressie; sommige niet. Hoe te vertellen: gecomprimeerde variabelen hebben "\\_ChunkSize" attributen. Ook, als een groep van rasterde.ncof.hdfbestanden zijn allemaal verschillende groottes, ze zijn waarschijnlijk intern gecomprimeerd. Als ze allemaal dezelfde grootte hebben, zijn ze niet intern gecomprimeerd.
    * afbeeldingsbestanden: bv. .gif, .jpg en .png
    * audiobestanden: bv. .mp3, en .ogg.
    * videobestanden: bv. .mp4, .ogv, en .webm.
    
        
Een ongelukkig vreemd geval: .wav audiobestanden zijn enorm en niet intern gecomprimeerd. Het zou leuk zijn om te comprimeren (gzip) ze, maar over het algemeen moet je niet want als je dat doet, gebruikers zullen niet in staat zijn om de gecomprimeerde bestanden af te spelen in hun browser.
     
* Testcase: comprimeren (metgzip) een dataset met 1523 gridded.ncdossiers.
    
    * De gegevens in de bronbestanden waren schaars (veel ontbrekende waarden) .
    * De totale schijfruimte ging van 57 GB voor compressie naar 7 GB na.
    * Een verzoek voor veel gegevens vanaf 1 tijdpunt is&lt;1 s voor en na compressie.
    * Een verzoek om 1 gegevenspunt voor 365 tijdpunten (het ergste geval) ging van 4 s naar 71 s.
         
    
Voor mij is dat een redelijke afweging voor elke dataset, en zeker voor datasets die zelden worden gebruikt.
     
* Interne versus externe compressie --
Vergeleken met de interne bestand compressie aangeboden door.nc4 en.hdf5 dossiers,ERDDAP's aanpak voor extern gecomprimeerde binaire bestanden heeft voor- en nadelen. Het nadeel is: voor een eenmalige lezing van een klein deel van een bestand, interne compressie is beter omdatEDDGridFromFiles hoeft maar een paar stukjes te decomprimeren (s) van het bestand, niet het hele bestand. MaarERDDAPDe aanpak heeft enkele voordelen:
    
    *   ERDDAP™ondersteunt compressie van alle soorten gegevensbestanden (binair en niet-binair, bv..nc3 en .csv) niet alleen.nc4 en.hdf4.
    * Als het grootste deel van een bestand moet worden gelezen meer dan eens in een korte periode van tijd, dan bespaart het tijd om het bestand te decomprimeren een keer en lees het vele malen. Dit gebeurt inERDDAP™wanneer een gebruiker Make-A-Graph gebruikt voor de dataset en een reeks kleine wijzigingen maakt in de grafiek.
    * De mogelijkheid om gecomprimeerde bestanden en niet gecomprimeerde bestanden in dezelfde collectie, kunt u meer controle over welke bestanden worden gecomprimeerd en welke niet. En deze toegevoegde controle komt zonder echt het bronbestand te wijzigen (omdat je een bestand kunt comprimeren met bijvoorbeeld,.gzen vervolgens decomprimeren om het originele bestand te krijgen) .
    * De mogelijkheid om op elk moment te wijzigen of een bepaald bestand gecomprimeerd is en hoe het gecomprimeerd is (verschillende algoritmen en instellingen) geeft u meer controle over de prestaties van het systeem. En u kunt gemakkelijk het originele ongecomprimeerde bestand op elk moment herstellen.
    
Hoewel geen van beide benaderingen in alle situaties een winnaar is, is het duidelijk datERDDAP's vermogen om gegevens van extern gecomprimeerde bestanden te bedienen maakt externe compressie een redelijk alternatief voor de interne compressie aangeboden door.nc4 en.hdf5. Dat is belangrijk gezien het feit dat interne compressie is een van de belangrijkste redenen waarom mensen kiezen om te gebruiken.nc4 en.hdf5.
     
##### Gedecomprimeerde cache{#decompressed-cache} 
ERDDAP™maakt een gedecomprimeerde versie van gecomprimeerd binair (bv..nc) gegevensbestand wanneer het nodig is om het bestand te lezen. De gedecomprimeerde bestanden worden bewaard in de map van de dataset binnen *bigParentDirectory* /decompresed/ . Gedecomprimeerde bestanden die recentelijk niet zijn gebruikt worden verwijderd om ruimte vrij te maken wanneer de cumulatieve bestandsgrootte &gt;10GB is. U kunt dat wijzigen door het instellen&lt;decompressedCacheMaxGB&gt; (standaard=10) in datasets Xml.xml, bijvoorbeeld,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Ook zullen gedecomprimeerde bestanden die in de laatste 15 minuten niet zijn gebruikt worden verwijderd bij het begin van elke belangrijke dataset herladen. U kunt dat wijzigen door het instellen&lt;decompressedCacheMaxMinutesOld&gt; (standaard=15) in datasets Xml.xml, bijvoorbeeld,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Grotere getallen zijn leuk, maar de cumulatieve grootte van de gedecomprimeerde bestanden kan veroorzaken *bigParentDirectory* geen schijfruimte meer hebben, wat ernstige problemen veroorzaakt.
     
* Omdat het decomprimeren van een bestand veel tijd kan kosten (0,1 tot 10 seconden) , datasets met gecomprimeerde bestanden kunnen profiteren van het instellen van de dataset [&lt;nThreads&gt;] (#nthreads) instellen op een hoger getal (Twee? Drie? Vier?) . De nadelen van nog hogere getallen (Bijvoorbeeld, 5? Zes? 7?) het rendement afneemt en dat het verzoek van een gebruiker dan een hoog percentage van de middelen van het systeem kan gebruiken, waardoor de verwerking van verzoeken van andere gebruikers aanzienlijk wordt vertraagd. Dus, er is geen ideale nThreads instelling, gewoon verschillende gevolgen in verschillende situaties met verschillende instellingen.
         
#### Gesorteerde dimensiewaarden{#sorted-dimension-values} 
De waarden voor elke dimensie MOET in gesorteerde volgorde zijn (stijgend of dalend, met uitzondering van de eerste (links-meest) dimensie die moet stijgen) . De waarden kunnen onregelmatig worden verdeeld. Er kunnen geen banden zijn. Dit is een vereiste van de[CF-metadatastandaard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Als de waarden van een dimensie niet in gesorteerde volgorde zijn, wordt de dataset niet geladen enERDDAP™zal de eerste ongesorteerde waarde in het logbestand identificeren; *bigParentDirectory* /logs/log.txt .
    
Ongesorteerde dimensiewaarden geven bijna altijd een probleem aan met de bronset. Dit gebeurt het vaakst wanneer een verkeerd genoemd of ongepast bestand is opgenomen in de aggregatie, wat leidt tot een ongesorteerde tijddimensie. Om dit probleem op te lossen, zie de foutmelding in deERDDAP™log.txt-bestand om de beledigende tijdswaarde te vinden. Kijk dan in de bronbestanden om het bijbehorende bestand te vinden (of één voor of één na) Dat hoort niet bij de aggregatie.
    
#### Mappen{#directories} 
De bestanden MAGen zich in één directory bevinden, of in een directory en haar subdirectories (recursief) . Als er een groot aantal bestanden zijn (bijvoorbeeld, &gt; 1.000) , het besturingssysteem (en dusEDDGridFromFiles) zal werken veel efficiënter als u de bestanden op te slaan in een reeks van submappen (één per jaar, of één per maand voor datasets met zeer frequente bestanden) , zodat er nooit een groot aantal bestanden in een bepaalde directory.
     
#### &lt;cacheVanUrl&gt;{#cachefromurl} 
AllesEDDGridFromFiles en alle EDDTableFromFiles datasets ondersteunen een set van tags die vertellenERDDAP™een kopie van alle bestanden van een dataset op afstand downloaden en onderhouden, of een cache van enkele bestanden (Gedownload indien nodig) . Dit kan ongelooflijk nuttig zijn. Zie[cache FromUrl documentatie](#cachefromurl).
    
#### Mappen op afstand en HTTP-bereikverzoeken{#remote-directories-and-http-range-requests} 
 (AKA Byte Serving, Byte Range Requests, Accepteer-Rangeshttpkop)   
EDDGridFromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles en EDDTableFromNcCFFiles, can *soms* gegevens van.ncbestanden op externe servers en toegankelijk via HTTP als de server ondersteunt[Byte-server](https://en.wikipedia.org/wiki/Byte_serving)via HTTP-bereikverzoeken (het HTTP-mechanisme voor bytedienst) . Dit is mogelijk omdat netcdf-java (dieERDDAP™gebruikt om te lezen.ncbestanden) ondersteunt het lezen van gegevens op afstand.ncbestanden via HTTP bereik verzoeken.

 **Doe dit niet&#33;** Het is verschrikkelijk inefficiënt en traag.
In plaats daarvan, gebruik de [&lt;cacheFromUrl&gt; systeem] (#cachefromurl) .

ToegangERDDAP™datasets als bestanden via bytebereikverzoeken --
Dit ronddraaien, gezien het feit dat je kunt (in theorie) denk aan een dataset inERDDAP™als een reus.ncbestand door toevoegen ".nc" naar de basis OPENDAPURL voor een gegeven dataset (bv. https://myserver.org/erddap/griddap/datasetID.nc en ook door het toevoegen van een ?query daarna om een subset te specificeren) , het is misschien redelijk om te vragen of u netcdf-java kunt gebruiken,Ferret, of andereNetCDFclient software om gegevens te lezen via HTTP-bereikverzoeken vanERDDAP. Het antwoord is nee, want er is niet echt een enorme ".nc" dossier. Als je dit wilt doen, doe dan een van deze opties:

* Gebruik(OPeN)DAPclient software om verbinding te maken met de griddap diensten aangeboden doorERDDAP. Dat is watDAP  (en dusERDDAP) is ontworpen voor. Het is zeer efficiënt.
* Of download het bronbestand (s) van de"files"systeem (of een subset bestand via een.nc? query) naar uw computer en gebruik netcdf-java,Ferret, of andereNetCDFclient software om de (nu) lokaal bestand (s) .
         
#### Bestandsinformatie{#cached-file-information} 
Wanneer eenEDDGridFromFiles dataset wordt eerst geladen,EDDGridFromFiles leest informatie uit alle relevante bestanden en maakt tabellen (één rij voor elk bestand) met informatie over elk geldig bestand en elk "slecht" (verschillend of ongeldig) bestand.
* De tabellen worden ook opgeslagen op schijf, zoalsNetCDFv3.ncbestanden in *bigParentDirectory* /dataset/ *last2CharsOfDatasetID* ' *datasetID* / in bestanden met de naam:
dirtabel.nc  (die een lijst met unieke mapnamen bevat) ,
bestand Tabel.nc  (die de tabel bevat met de gegevens van elk geldig bestand) ,
badFiles.nc  (die de tabel bevat met de gegevens van elk slecht bestand) .
* Om de toegang tot eenEDDGridDataset van FromFiles (maar ten koste van meer geheugen) , kunt u gebruiken
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
om te vertellenERDDAP™een kopie van de bestandsinformatietabellen in het geheugen bewaren.
* De kopie van de bestandsinformatie tabellen op de schijf is ook nuttig wanneerERDDAP™wordt afgesloten en herstart: het slaat opEDDGridFromFiles moet alle gegevensbestanden opnieuw lezen.
* Wanneer een dataset wordt herladen,ERDDAP™hoeft alleen de gegevens te lezen in nieuwe bestanden en bestanden die zijn veranderd.
* Als een bestand een andere structuur heeft dan de andere bestanden (bijvoorbeeld een ander gegevenstype voor een van de variabelen, of een andere waarde voor de "[eenheden](#units)" attribuut) ,ERDDAPvoegt het bestand toe aan de lijst met "slechte" bestanden. Informatie over het probleem met het bestand zal worden geschreven naar de *bigParentDirectory* /logs/log.txt-bestand.
* Je zou nooit moeten verwijderen of werken met deze bestanden. Een uitzondering is: als je nog steeds wijzigingen aan een dataset aan het maken bentdatasets.xmlsetup, kunt u deze bestanden te verwijderen te forcerenERDDAP™om alle bestanden opnieuw te lezen omdat de bestanden anders gelezen/geinterpreteerd zullen worden. Als je ooit nodig hebt om deze bestanden te verwijderen, kunt u het doen wanneerERDDAP™is aan het rennen. (Stel dan een[vlag](/docs/server-admin/additional-information#set-dataset-flag)om de dataset zo snel mogelijk te herladen.) Echter,ERDDAP™In het algemeen merkt dedatasets.xmlinformatie komt niet overeen met het bestand Tabel informatie en verwijdert de bestandstabellen automatisch.
* Als u wilt aanmoedigenERDDAP™de opgeslagen gegevensverzamelingsinformatie bijwerken (bijvoorbeeld, als je een aantal bestanden hebt toegevoegd, verwijderd of gewijzigd in de datamap van de dataset) Gebruik de[vlagsysteem](/docs/server-admin/additional-information#flag)te forcerenERDDAP™om de gecachede bestandsinformatie bij te werken.
         
#### Behandeling van verzoeken{#handling-requests} 
Wanneer het verzoek van een klant om gegevens wordt verwerkt,EDDGridFromFiles kan snel kijken in de tabel met de geldige bestandsinformatie om te zien welke bestanden de gevraagde gegevens hebben.
     
#### Bijwerken van de informatie over het gecached bestand{#updating-the-cached-file-information} 
Wanneer de dataset opnieuw wordt geladen, wordt de informatie over het gecached bestand bijgewerkt.
    
* De dataset wordt periodiek opnieuw geladen zoals bepaald door de&lt;herlaadEveryNMinutes&gt; in de informatie van de dataset indatasets.xml.
* De dataset wordt zo snel mogelijk opnieuw geladen.ERDDAP™detecteert dat u hebt toegevoegd, verwijderd,[aangeraakt](https://en.wikipedia.org/wiki/Touch_(Unix)) (om het laatste bestand te wijzigen Gewijzigde tijd) , of veranderde een gegevensbestand.
* De dataset wordt zo snel mogelijk opnieuw geladen als u de[vlagsysteem](/docs/server-admin/additional-information#flag).

Wanneer de dataset opnieuw wordt geladen,ERDDAP™vergelijkt de momenteel beschikbare bestanden met de tabellen met de gegevens van het gecached bestand. Nieuwe bestanden worden gelezen en toegevoegd aan de tabel met geldige bestanden. Bestanden die niet meer bestaan, vallen uit de geldige bestandentabel. Bestanden waar het tijdstempel van het bestand is gewijzigd worden gelezen en hun informatie wordt bijgewerkt. De nieuwe tabellen vervangen de oude tabellen in geheugen en op schijf.
     
#### Slechte bestanden{#bad-files} 
De tabel met slechte bestanden en de redenen waarom de bestanden slecht werden verklaard (beschadigd bestand, ontbrekende variabelen, enz.) wordt gemaild naar de e-mail Alles Naar e-mailadres (Jij waarschijnlijk.) elke keer dat de dataset wordt herladen. U moet deze bestanden zo snel mogelijk vervangen of repareren.
     
#### Ontbrekende variabelen{#missing-variables} 
Als sommige van de bestanden niet hebben sommige van dedataVariables gedefinieerd in de datasetdatasets.xmlDat geeft niet. WanneerEDDGridFromFiles leest een van die bestanden, het zal doen alsof het bestand had de variabele, maar met alle ontbrekende waarden.
     
#### FTP Trouble/Advice{#ftp-troubleadvice} 
Als u FTP nieuwe gegevensbestanden naar deERDDAP™server terwijlERDDAP™is rennen, er is de kans datERDDAP™zal de dataset tijdens het FTP-proces opnieuw laden. Het gebeurt vaker dan je zou denken&#33; Als het gebeurt, zal het bestand geldig lijken (het heeft een geldige naam) , maar het bestand is nog niet geldig. AlsERDDAP™probeert om gegevens van dat ongeldige bestand te lezen, de resulterende fout zal leiden tot het bestand worden toegevoegd aan de tabel van ongeldige bestanden. Dit is niet goed. Om dit probleem te voorkomen, gebruik een tijdelijke bestandsnaam wanneer FTP'ing het bestand, bijvoorbeeld ABC2005.nc\\_TEMP . Vervolgens het bestandNameRegex test (zie hieronder) geeft aan dat dit geen relevant dossier is. Nadat het FTP-proces is voltooid, hernoem het bestand naar de juiste naam. Het hernoemen proces zal ervoor zorgen dat het bestand in een oogwenk relevant wordt.
     
#### "0 bestanden" Foutmelding{#0-files-error-message-1} 
Als u rent[GenererenDatasetsXml](#generatedatasetsxml)of[DasDds](#dasdds), of als u probeert eenEDDGridVan...bestanden dataset inERDDAP™, en je krijgt een "0 bestanden" foutmelding die aangeeft datERDDAP™0 overeenkomende bestanden in de map gevonden (als je denkt dat er overeenkomende bestanden in die map zijn) :
    * Controleer of de bestanden echt in die map zitten.
    * Controleer de spelling van de mapnaam.
    * Controleer het bestandNameRegex. Het is heel makkelijk om fouten te maken met regexes. Voor testdoeleinden, probeer de regex .\\* die moet overeenkomen met alle bestandsnamen. (Zie dit[regex documentatie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)en[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Controleer of de gebruiker die het programma uitvoert (bv. gebruiker=tomcat (?) voor Tomcat/ERDDAP) heeft 'lezen' toestemming voor die bestanden.
    * In sommige besturingssystemen (bijvoorbeeld, SELinux) en afhankelijk van de systeeminstellingen, moet de gebruiker die het programma uitvoerde 'lezen' toestemming hebben voor de hele keten van directories die leidt naar de directory die de bestanden heeft.
         
#### EDDGridFromFiles skelet XML{#eddgridfromfiles-skeleton-xml} 
*    **Het skelet XML** voor iedereenEDDGridFromFiles subklassen is:

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

### EDD*VanAudioFiles{#eddfromaudiofiles} 
 **EDDGridVanAudioFiles** en **EDDtableFromAudioFiles** verzamelde gegevens uit een verzameling lokale audiobestanden. (Deze verschenen voor het eerst inERDDAP™v1.82.) Het verschil is datEDDGridVan AudioFiles behandelt de gegevens als een multidimensionale dataset (meestal met 2 afmetingen:\\[bestandsstart Tijd\\]en\\[verlopen Tijd binnen een bestand\\]) , overwegende dat EDDTableFromAudioFiles de gegevens behandelt als tabelgegevens (meestal met kolommen voor het bestand startTijd, het verlopen Tijd met het bestand, en de gegevens van de audiokanalen) .EDDGridVan AudioFiles vereist dat alle bestanden hetzelfde aantal samples hebben, dus als dat niet waar is, moet je EDDTableFromAudioFiles gebruiken. Anders is de keuze van welk EDD-type u wilt gebruiken volledig aan u. Een voordeel van EDDTableFromAudioFiles: u kunt andere variabelen toevoegen met andere informatie, bijvoorbeeld,stationID, stationType. In beide gevallen maakt het ontbreken van een uniforme tijdvariabele het moeilijker om met de gegevens van deze EDD-typen te werken, maar er was geen goede manier om een uniforme tijdvariabele in te stellen.

Zie de superklassen van deze klasse,[EDDGridFromFiles](#eddgridfromfiles)en[EDDTableFromFiles](#eddtablefromfiles), voor algemene informatie over hoe deze klasse werkt en hoe deze te gebruiken.

Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Aangezien audiobestanden geen andere metadata hebben dan informatie met betrekking tot de codering van de geluidsgegevens, moet u de output van GenerateDatasets bewerken Xml om essentiële informatie te verstrekken (b.v. titel, samenvatting,creator\\_name, instelling, geschiedenis) .

Bijzonderheden:

* Er zijn een groot aantal audio-bestandsformaten. Momenteel,ERDDAP™kan gegevens lezen van de meeste .wav en .au bestanden. Het kan momenteel geen andere soorten audiobestanden lezen, bijvoorbeeld .aiff of .mp3. Als je ondersteuning nodig hebt voor andere audio bestandsformaten of andere varianten van .wav en .au, stuur dan je verzoek naar Chris. John at noaa.gov . Of, als een oplossing die u nu kunt gebruiken, kunt u uw audiobestanden converteren naar PCM\\_ ONDERTEKEND (voor gehele getallen) of PCM\\_FLAAT (voor gegevens over drijvende punten) .wav bestanden zodatERDDAP™Met hen kan werken.
* Momenteel,ERDDAP™kan audiobestanden lezen met watJava's AudioFormat klasse oproepen PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW, en ULAW coderingen.ERDDAP™zet PCM\\_UNSIGNED-waarden om (bv. 0 tot 255) in ondertekende waarden (b.v. -128 t/m 128) door de bits in de datawaarden te herschikken.ERDDAP™zet ALAW en ULAW gecodeerd van hun native gecodeerde byte formaat in het kort (int16) waarden. SindsJavawil bigEndian=true data,ERDDAP™herschikt de bytes van gegevens opgeslagen met bigEndian=false (kleine endiaan) om de waarden correct te lezen. Voor alle andere coderingen (PCM) ,ERDDAP™leest de gegevens zoals ze zijn.
* WanneerERDDAP™leest gegevens van audiobestanden, het converteert de beschikbare audio-metadata van het bestand naar globale attributen. Dit omvat altijd (met de aangegeven monsterwaarden) 
    
String audioBigEndian "false"; //true of false
int audio kanalen 1;
String audioEncoding "PCM\\_SIGNED";
float audioFrameRate 96000.0; //per seconde
int audioFrameSize 2; //# van data bytes per frame
float audioSampleRate 96000.0; //per seconde
int audioSampleSizeInBits 16; //# van bits per kanaal per sample
    
VoorERDDAP's doelen, een kader is synoniem met een monster, dat is de gegevens voor een punt in de tijd.
De attributen inERDDAP™zal de informatie die de gegevens zoals het was in de bronbestanden.ERDDAP™zal dit vaak hebben veranderd tijdens het lezen van de gegevens, bijvoorbeeld, PCM\\_UNSIGNED, ALAW, en ULAW gecodeerde gegevens worden omgezet in PCM\\_SIGNED, en bigEndian=false gegevens wordt omgezet in bigEndian=true data (en dat is hoeJavawil het lezen) . Op het einde, gegevens waarden inERDDAP™zal altijd de[PCM-gecodeerd](https://en.wikipedia.org/wiki/Pulse-code_modulation)gegevenswaarden (d.w.z. eenvoudige gedigitaliseerde monsters van de geluidsgolf) .
* WanneerERDDAP™leest gegevens van audiobestanden, het leest het hele bestand.ERDDAP™kan lezen zo veel als ongeveer 2 miljard monsters per kanaal. Bijvoorbeeld, als de sample rate 44.100 samples per seconde, 2 miljard samples vertaalt naar ongeveer 756 minuten geluidsgegevens per bestand. Als u audiobestanden met meer dan deze hoeveelheid gegevens, moet u de bestanden op te splitsen in kleinere brokken, zodatERDDAP™Ik kan ze lezen.
* OmdatERDDAP™leest volledige audiobestanden,ERDDAP™moet toegang hebben tot een grote hoeveelheid geheugen om te werken met grote audiobestanden. Zie[ERDDAP's geheugeninstellingen](/docs/server-admin/deploy-install#memory). Nogmaals, als dit een probleem is, een oplossing die je nu kunt gebruiken is om de bestanden op te splitsen in kleinere brokken, zodatERDDAP™kan ze lezen met minder geheugen.
* Sommige audiobestanden zijn verkeerd geschreven.ERDDAP™doet een kleine inspanning om dergelijke gevallen aan te pakken. Maar in het algemeen, wanneer er een fout,ERDDAP™zal een uitzondering maken (en verwerp dat dossier) of (als de fout niet detecteerbaar is) lees de gegevens (maar de gegevens zullen onjuist zijn) .
*   ERDDAP™het volume van het geluid niet controleert of wijzigt. Idealiter worden integer audiogegevens geschaald om het hele bereik van het datatype te gebruiken.
* Audiobestanden en audiospelers hebben geen systeem voor ontbrekende waarden (bv. -999 of Float.NaN) . Dus audio data mag geen ontbrekende waarden hebben. Als er waarden ontbreken (Bijvoorbeeld, als je een audiobestand moet verlengen) , gebruik een serie van 0's die zal worden geïnterpreteerd als perfecte stilte.
* WanneerERDDAP™leest gegevens van audiobestanden, het maakt altijd een kolom genaamd verlopen Tijd met de tijd voor elk monster, in seconden (opgeslagen als dubbel) , ten opzichte van het eerste monster (die is toegewezen Tijd=0,0 s) . MetEDDGridVan AudioFiles, dit wordt de verlopenTijdas variabele.
*   EDDGridVan AudioFiles vereist dat alle bestanden hetzelfde aantal monsters hebben. Dus als dat niet waar is, moet je EDDTableFromAudioFiles gebruiken.
* VoorEDDGridVan AudioFiles, raden wij u aan [&lt;dimensiewaardenInGeheugen&gt;] (#dimensiewaardeninmemory) naar onwaar (zoals aanbevolen door GenerateDatasets Xml) , omdat de tijddimensie vaak een enorm aantal waarden heeft.
* VoorEDDGridVan AudioFiles, moet je bijna altijd gebruik maken van deEDDGridFromFiles systeem voor[Samenvoegen via Bestandsnamen](#aggregation-via-file-names-or-global-metadata), bijna altijd door het uitpakken van de startdatum van de opname Tijd van de bestandsnamen. Bijvoorbeeld,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
GenererenDatasets Xml zal dit aanmoedigen en u hiermee helpen.
* Voor EDDTableFromAudioFiles moet je bijna altijd het EDDTableFromFiles systeem gebruiken voor[\\*\\*\\*fileNaam pseudosourceNames](#filename-sourcenames)om informatie uit de naam van het bestand te halen (bijna altijd de startdatum Tijd voor de opname) en bevorderen dat het een kolom van gegevens. Bijvoorbeeld,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Het tijdformaat moet dan worden gespecificeerd als het eenheidsattribuut:&lt;att name="units"&gt;yyyMMdd'\\_'Hmmss&lt;/att&gt;
     
### EDDGridVanMergeIRFiles{#eddgridfrommergeirfiles} 
[ **EDDGridVanMergeIRFiles** ](#eddgridfrommergeirfiles)geaggregeerde gegevens van lokale,[Samenvoegen](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)bestanden, die afkomstig zijn van de[Tropische regenval meetmissie (TRMM) ](https://trmm.gsfc.nasa.gov), dat is een gezamenlijke missie van NASA en het Japan Aerospace Exploration Agency (JACA) . Samenvoegen IR-bestanden kunnen worden gedownload van[NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGridVan MergeIRFiles.java werd geschreven en bijgedragen aan deERDDAP™project van Jonathan Lafite en Philippe Makowski van R.Tech Engineering (licentie: auteursrechtelijk beschermde open source) .

EDDGridVanuitMergeIRFiles is een beetje ongebruikelijk:

*   EDDGridFromMergeIRFiles ondersteunt gecomprimeerde of ongecomprimeerde brongegevensbestanden, in elke combinatie, in dezelfde dataset. Hiermee kunt u bijvoorbeeld oudere bestanden comprimeren die zelden toegankelijk zijn, maar nieuwe bestanden decomprimeren die vaak worden geopend. Of je kunt het type compressie van het origineel veranderen. Z bijvoorbeeld,.gz.
* Als u gecomprimeerde en ongecomprimeerde versies van dezelfde gegevensbestanden in dezelfde map, zorg ervoor dat de&lt;bestandNameRegex&gt; voor uw dataset komt overeen met de bestandsnamen die u wilt dat deze overeenkomen en komt niet overeen met bestandsnamen die u niet wilt dat deze overeenkomen.
* Ongecomprimeerde brongegevensbestanden moeten geen bestandsextensie hebben (i.e. geen "." in de bestandsnaam) .
* Gecomprimeerde brongegevensbestanden moeten een bestandsextensie hebben, maarERDDAP™bepaalt het type compressie door de inhoud van het bestand te inspecteren, niet door de bestandsextensie van het bestand te bekijken (bijvoorbeeld ".Z") . De ondersteunde compressietypes omvatten "gz," "bzip2," "xz," "lzma," "snappy-raw," "snappy-framed," "pack200" en "z." WanneerERDDAP™leest gecomprimeerde bestanden, het decomprimeert on-the-fly, zonder te schrijven naar een tijdelijk bestand.
* Alle brongegevensbestanden moeten het oorspronkelijke bestandsnaamsysteem gebruiken: dwz, merg\\_ *JJJJMMDDHH* \\_4km-pixel (waarbij *JJJJMMDDHH* geeft de tijd in verband met de gegevens in het bestand) , plus een bestandsextensie als het bestand gecomprimeerd is.

Zie de superklasse van deze klas,[EDDGridFromFiles](#eddgridfromfiles), voor algemene informatie over hoe deze klasse werkt en hoe deze te gebruiken.

Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
 
### EDDGridVanNcFiles{#eddgridfromncfiles} 
[ **EDDGridVanNcFiles** ](#eddgridfromncfiles)geaggregeerde gegevens van lokale, gerasterde,[GRIB .grb en .grb2](https://en.wikipedia.org/wiki/GRIB)bestanden,[HDF  (v4 of v5)  .hdf](https://www.hdfgroup.org/)bestanden,[.ncml](#ncml-files)bestanden,[NetCDF  (v3 of v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)bestanden, en[Zarr](https://github.com/zarr-developers/zarr-python)bestanden (vanaf versie 2.25) . Zarr-bestanden hebben iets anders gedrag en vereisen ofwel het bestandNameRegex of het padRegex om "zarr" op te nemen.

Dit kan werken met andere bestandstypen (Bijvoorbeeld, BUFR) We hebben het alleen nog niet getest. Stuur ons alsjeblieft wat proefdossiers.

* Voor GRIB-bestanden,ERDDAP™zal een .gbx index bestand maken de eerste keer dat het leest elk GRIB bestand. De GRIB-bestanden moeten dus in een map staan waar de "gebruiker" die Tomcat uitvoerde, toestemming heeft om te lezen+schrijven.
* Zie de superklasse van deze klas,[EDDGridFromFiles](#eddgridfromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.
* Beginnen metERDDAP™v2.12,EDDGridVanNcFiles enEDDGridVanNcFiles Uitgepakt kan gegevens lezen van "structuren" in.nc4 en.hdfVier dossiers. Om een variabele te identificeren die afkomstig is van een structuur, de&lt;sourceName&gt; moet het formaat gebruiken: *volledige structuurnaam* | *lidNaam* , bijvoorbeeld groep1/myStruct|mijn Lid .
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
    
#### Groepen in Gridded Nc-bestanden{#groups-in-gridded-nc-files} 
    [Netcdf4-bestanden kunnen groepen bevatten.](#groups-in-gridded-nc-files) ERDDAP™maakt gewoon een dataset van de variabelen in één groep en alle oudergroepen. U kunt een specifieke groepsnaam opgeven in GenerateDatasets Xml (de achterliggende schuine streep weglaten) , of gebruik "" om GenerateDatasets te hebben Xml doorzoekt alle groepen voor de variabelen die de meeste afmetingen gebruiken, of gebruikt "\\[root\\]" GenerateDatasets zoeken naar variabelen in de hoofdgroep.
    
Het eerste wat GenererenDatasetsXml doet voor dit type dataset nadat u de vragen beantwoordt is de nudump-achtige structuur van het sample bestand afdrukken. Dus als je een paar rare antwoorden invoert voor de eerste lus via GenerateDatasets Xml, je kunt tenminste zien ofERDDAP™kan het bestand lezen en zien welke afmetingen en variabelen in het bestand zitten. Dan kunt u betere antwoorden geven voor de tweede lus via GenerateDatasetsXml.
    

### EDDGridUitNcFilesUitgepakt{#eddgridfromncfilesunpacked} 
[ **EDDGridUitNcFilesUitgepakt** ](#eddgridfromncfilesunpacked)is een variant van[EDDGridVanNcFiles](#eddgridfromncfiles)die gegevens van lokale, gerasterdeNetCDF  (v3 of v4)  .ncen aanverwante dossiers. Het verschil is dat deze klasse elk gegevensbestand uitpaktEDDGridFromFiles bekijkt de bestanden:

* Het pakt variabelen uit die vol zitten met[scale\\_factoren/ofadd\\_offset](#scale_factor).
* Het zet \\_FillValue enmissing\\_valuewaarden te zijn NaN's (of MAX\\_VALUE voor gehele gegevenstypen) .
* Het zet tijd en tijdstempel waarden in"seconds since 1970-01-01T00:00:00Z".

Het grote voordeel van deze klasse is dat het biedt een manier om te gaan met verschillende waarden vanscale\\_factor,add\\_offset, \\_Volwaarde,missing\\_value, of tijdeenheden in verschillende bronbestanden in een verzameling. Anders zou je een tool als[NcML](#ncml-files)of[NCO](#netcdf-operators-nco)om elk bestand te wijzigen om de verschillen te verwijderen, zodat de bestanden kunnen worden behandeld doorEDDGridVan NcFiles. Om deze klasse goed te laten werken, moeten de bestanden de CF-standaarden voor de bijbehorende attributen volgen.

* Als u eenEDDGridVanNcFiles Uitgepakt uit een groep bestanden waarmee u eerder probeerde en niet kon gebruikenEDDGridVanNcFiles, cd naar
     *bigParentDirectory* /dataset/ *laatste2Letters* ' *datasetID* '
waarbij *laatste2Letters* is de laatste 2 letters van dedatasetID,
en verwijder alle bestanden in die map.
* Beginnen metERDDAP™v2.12,EDDGridVanNcFiles enEDDGridVanNcFiles Uitgepakt kan gegevens lezen van "structuren" in.nc4 en.hdfVier dossiers. Om een variabele te identificeren die afkomstig is van een structuur, de&lt;sourceName&gt; moet het formaat gebruiken: *volledige structuurnaam* | *lidNaam* , bijvoorbeeld groep1/myStruct|mijn Lid .
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
    
Netcdf4-bestanden kunnen groepen bevatten. Zie[deze documentatie](#groups-in-gridded-nc-files).
    
Het eerste wat GenererenDatasetsXml doet voor dit type dataset na het beantwoorden van de vragen is de nudump-achtige structuur van het sample bestand afdrukken **voor** Het is uitgepakt. Dus als je een paar rare antwoorden invoert voor de eerste lus via GenerateDatasets Xml, je kunt tenminste zien ofERDDAP™kan het bestand lezen en zien welke afmetingen en variabelen in het bestand zitten. Dan kunt u betere antwoorden geven voor de tweede lus via GenerateDatasetsXml.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)wijzigt de lengtegraad van een kind (gesloten)  EDDGriddataset met een lengtegraad van meer dan 180 (bijvoorbeeld, 0 tot 360) zodat ze in het bereik -180 tot 180 (Lengtegraad plus of min 180, vandaar de naam) .

* Dit biedt een manier om datasets met een lengtegraad van meer dan 180 conform te maken in/metOGCdiensten (bijvoorbeeld deWMSserver inERDDAP) , aangezien alleOGCdiensten vereisen lengtewaarden binnen -180 tot 180.
* Werken in de buurt van een onderbreking veroorzaakt problemen, ongeacht of de onderbreking is op lengtegraad 0 of op lengtegraad 180. Deze dataset type kunt u voorkomen dat die problemen voor iedereen, door het aanbieden van twee versies van dezelfde dataset:
één met lengtegraadswaarden tussen 0 en 360 ("Pacifisch"?) ,
één met lengtegraadswaarden in het bereik -180 tot 180 ("Atlanticentrisch"?) .
* Voor kinddatasets met alle lengtegraden groter dan 180 zijn alle nieuwe lengtegraden gewoon 360 graden lager. Een dataset met lengtewaarden van 180 tot 240 zou bijvoorbeeld een dataset worden met lengtewaarden van -180 tot -120.
* Voor kinddatasets met lengtegraden voor de hele wereld (ruwweg 0 tot 360) , zal de nieuwe lengtegraad worden herschikt om (ruw) - 180 tot 180:
De oorspronkelijke 0 tot bijna 180 waarden zijn ongewijzigd.
De oorspronkelijke 180 naar 360 waarden worden omgezet naar -180 naar 0 en verschoven naar het begin van de lengtereeks.
* Voor kind datasets die 180 maar niet de wereld bestrijken,ERDDAP™voegt ontbrekende waarden in om een dataset te maken die de wereld bestrijkt. Een kinddataset met een lengtegraad van 140 tot 200 zou bijvoorbeeld een dataset worden met een lengtegraad van -180 tot 180.
De kindwaarden van 180 tot 200 zouden 180 tot -160 worden.
Nieuwe lengtegraadwaarden worden ingevoegd van -160 tot 140. De overeenkomstige gegevenswaarden zullen \\_FillValues zijn.
De kinderwaarden van 140 tot bijna 180 zouden ongewijzigd blijven.
Het toevoegen van ontbrekende waarden lijkt misschien vreemd, maar het voorkomt verschillende problemen die voortvloeien uit het hebben van lengtegraad waarden die plotseling springen (bv. van -160 tot 140) .
* In[GenererenDatasetsXml](#generatedatasetsxml), er is een speciale "dataset type,"EDDGridLonPM180Van ErddapCatalog, waarmee u dedatasets.xmlvoorEDDGridLonPM180 datasets van elk van deEDDGriddatasets in eenERDDAPmet een lengtegraad van meer dan 180. Dit vergemakkelijkt het aanbieden van twee versies van deze datasets:
het origineel, met lengtegraadswaarden tussen 0 en 360,
en de nieuwe dataset, met lengtegraden in het bereik -180 tot 180.
    
De dochterdataset binnen elkEDDGridLonPM180 dataset zal eenEDDGridVan Erddap dataset die verwijst naar de oorspronkelijke dataset.
De nieuwe datasetdatasetIDzal de naam van de oorspronkelijke dataset plus "\\_LonPM180" zijn.
Bijvoorbeeld,
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
Zet deEDDGridLonPM180 dataset **onder** de oorspronkelijke dataset indatasets.xml. Dat voorkomt mogelijke problemen.
    
Als alternatief kunt u deEDDGridFromErdap dochterset met de originele datasetdatasets.xml. Dan zal er slechts één versie van de dataset zijn: die met lengtegraadwaarden binnen -180 tot 180. We ontmoedigen dit omdat er momenten zijn dat elke versie van de dataset handiger is.
    
* Als u twee versies van een dataset aanbiedt, bijvoorbeeld één met lengtegraad 0 tot 360 en één met lengtegraad -180 tot 180:
    * U kunt de optie gebruiken [&lt;toegankelijk ViaWMS&gt;vals&lt;/toegankelijk ViaWMS&gt;] (#accessibleviawms) met de 0-360 dataset om deWMSservice voor die dataset. Dan is alleen de LonPM180 versie van de dataset toegankelijk viaWMS.
    * Er zijn een aantal manieren om de LonPM180 dataset up-to-date te houden met wijzigingen in de onderliggende dataset:
        * Als de dochterset eenEDDGridFromErdap dataset die verwijst naar een dataset in hetzelfdeERDDAP™, de LonPM180 dataset zal proberen zich direct te abonneren op de onderliggende dataset zodat het altijd up-to-date is. Directe abonnementen genereren geen e-mails waarin u wordt gevraagd het abonnement te valideren - validatie moet automatisch gebeuren.
        * Als de dochterset geenEDDGridFromErdap dataset die op hetzelfde staatERDDAP™, de LonPM180 dataset zal proberen het reguliere abonnementssysteem te gebruiken om zich te abonneren op de onderliggende dataset. Als u het abonnementssysteem in uwERDDAP™ingeschakeld, moet u e-mails vragen om het abonnement te valideren. Doe dat alsjeblieft.
        * Als u het abonnementssysteem in uwERDDAP™uitgeschakeld, de LonPM180 dataset kan soms verouderde metadata hebben totdat de LonPM180 dataset opnieuw wordt geladen. Dus als het abonnement systeem is uitgeschakeld, moet je de [&lt;herladen EveryNminutes&gt;] (#reloadeverynminutes) instelling van de LonPM180 dataset naar een kleiner getal, zodat het waarschijnlijker is om veranderingen in de kinddataset eerder te vangen.

#### EDDGridLonPM180 skelet XML{#eddgridlonpm180-skeleton-xml} 

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
[ **EDDGridLon0360** ](#eddgridlon0360)wijzigt de lengtegraad van een kind (gesloten)  EDDGriddataset met een lengtegraad van minder dan 0 (bijvoorbeeld, -180 tot 180) zodat ze in het bereik 0 tot 360 (vandaar de naam) .

* Werken in de buurt van een onderbreking veroorzaakt problemen, ongeacht of de onderbreking is op lengtegraad 0 of op lengtegraad 180. Deze dataset type kunt u voorkomen dat die problemen voor iedereen, door het aanbieden van twee versies van dezelfde dataset:
één met lengtegraadswaarden in het bereik -180 tot 180 ("Atlanticentrisch"?) .
één met lengtegraadswaarden tussen 0 en 360 ("Pacifisch"?) ,
* Voor kinddatasets met alle lengtegraden van minder dan 0 zijn alle nieuwe lengtegraden gewoon 360 graden hoger. Een dataset met lengtewaarden van -180 tot -120 zou bijvoorbeeld een dataset worden met lengtewaarden van 180 tot 240.
* Voor kinddatasets met lengtegraden voor de hele wereld (ruwweg -180 tot 180) , zal de nieuwe lengtegraad worden herschikt om (ruw) 0 tot 360:
De originele -180 tot 0 waarden worden omgezet naar 180 tot 360 en verschoven naar het einde van de lengte array.
De oorspronkelijke 0 tot bijna 180 waarden zijn ongewijzigd.
* Voor kind datasets die lon=0 maar niet de wereld bestrijken,ERDDAP™voegt ontbrekende waarden in om een dataset te maken die de wereld bestrijkt. Een kinddataset met lengtegraden van -40 tot 20 zou bijvoorbeeld een dataset worden met lengtegraden van 0 tot 360.
De kindwaarden van 0 tot 20 zouden ongewijzigd blijven.
Nieuwe lengtegraadwaarden worden ingevoegd van 20 tot 320. De overeenkomstige gegevenswaarden zullen \\_FillValues zijn.
De kindwaarden van -40 tot 0 zouden 320 tot 360 worden.
Het toevoegen van ontbrekende waarden lijkt misschien vreemd, maar het voorkomt verschillende problemen die voortvloeien uit het hebben van lengtegraad waarden die plotseling springen (b.v. van 20 tot 320) .
* In[GenererenDatasetsXml](#generatedatasetsxml), er is een speciale "dataset type,"EDDGridLon0360Van ErddapCatalog, waarmee u dedatasets.xmlvoorEDDGridLon0360 datasets van elk van deEDDGriddatasets in eenERDDAPmet een lengtegraad van meer dan 180. Dit vergemakkelijkt het aanbieden van twee versies van deze datasets:
het origineel, met lengtegraadswaarden tussen 0 en 360,
en de nieuwe dataset, met lengtegraden in het bereik -180 tot 180.
    
De dochterdataset binnen elkEDDGridLon0360 dataset zal eenEDDGridVan Erddap dataset die verwijst naar de oorspronkelijke dataset.
De nieuwe datasetdatasetIDzal de naam zijn van de oorspronkelijke dataset plus "\\_Lon0360."
Bijvoorbeeld,
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
Zet deEDDGridLon0360 dataset **onder** de oorspronkelijke dataset indatasets.xml. Dat voorkomt mogelijke problemen.
    
Als alternatief kunt u deEDDGridFromErdap dochterset met de originele datasetdatasets.xml. Dan zal er slechts één versie van de dataset zijn: die met lengtegraadwaarden binnen 0 tot 360. We ontmoedigen dit omdat er momenten zijn dat elke versie van de dataset handiger is.
    
* Als u twee versies van een dataset aanbiedt, bijvoorbeeld één met lengtegraad 0 tot 360 en één met lengtegraad -180 tot 180:
    * U kunt de optie gebruiken [&lt;toegankelijk ViaWMS&gt;vals&lt;/toegankelijk ViaWMS&gt;] (#accessibleviawms) met de 0 tot 360 dataset om deWMSservice voor die dataset. Dan is alleen de -180 tot 180 versie van de dataset toegankelijk viaWMS.
    * Er zijn een aantal manieren om de Lon0360 dataset up-to-date te houden met wijzigingen in de onderliggende dataset:
        * Als de dochterset eenEDDGridFromErdap dataset die verwijst naar een dataset in hetzelfdeERDDAP™, de Lon0360 dataset zal proberen om zich direct in te schrijven op de onderliggende dataset zodat het altijd up-to-date is. Directe abonnementen genereren geen e-mails waarin u wordt gevraagd het abonnement te valideren - validatie moet automatisch gebeuren.
        * Als de dochterset geenEDDGridFromErdap dataset die op hetzelfde staatERDDAP™, de Lon0360 dataset zal proberen het reguliere abonnementssysteem te gebruiken om zich te abonneren op de onderliggende dataset. Als u het abonnementssysteem in uwERDDAP™ingeschakeld, moet u e-mails vragen om het abonnement te valideren. Doe dat alsjeblieft.
        * Als u het abonnementssysteem in uwERDDAP™uitgeschakeld, de Lon0360 dataset kan soms verouderde metadata hebben totdat de Lon0360 dataset opnieuw wordt geladen. Dus als het abonnement systeem is uitgeschakeld, moet je de [&lt;herladen EveryNminutes&gt;] (#reloadeverynminutes) instelling van de Lon0360 dataset naar een kleiner getal, zodat het waarschijnlijker is dat het eerder veranderingen in de kinddataset zal opvangen.
#### EDDGridLon0360 skelet XML{#eddgridlon0360-skeleton-xml} 
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
[ **EDDGridSideBySide** ](#eddgridsidebyside)aggregaten twee of meerEDDGriddatasets (de kinderen) Zij aan zij.

* De resulterende dataset bevat alle variabelen van alle kinddatasets.
* De moederdataset en alle kinddatasets MOETEN verschillend zijndatasetIDs. Als namen in een familie precies hetzelfde zijn, zal de dataset niet laden (met het foutbericht dat de waarden van de geaggregeerde as niet in gesorteerde volgorde zijn) .
* Alle kinderen MOET dezelfde bronwaarden hebben vooraxisVariables\\[1+\\]  (bijvoorbeeld breedtegraad, lengtegraad) . De nauwkeurigheid van de test wordt bepaald door[matchAxisNDigits](#matchaxisndigits).
* De kinderen kunnen verschillende bronwaarden hebben vooraxisVariables\\[0\\]  (bijvoorbeeld, tijd) , maar ze zijn meestal grotendeels hetzelfde.
* De moederdataset zal alleaxisVariables\\[0\\]bronwaarden van alle kinderen.
* Zo kun je bijvoorbeeld een brondataset combineren met een vector's u-component en een andere brondataset met een vector's v-component, zodat de gecombineerde gegevens kunnen worden geserveerd.
* Kinderen die door deze methode worden gecreëerd, worden privé gehouden. Het zijn niet afzonderlijk toegankelijke datasets. (bijvoorbeeld door verzoeken om gegevens van cliënten of door[vlagbestanden](/docs/server-admin/additional-information#flag)) .
* De globale metadata en instellingen voor de ouder zijn afkomstig van de globale metadata en instellingen voor het eerste kind.
* Als er een uitzondering is tijdens het aanmaken van het eerste kind, wordt de ouder niet aangemaakt.
* Als er een uitzondering is tijdens het aanmaken van andere kinderen, stuurt dit een e-mail naar e-mail (zoals gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml)) en gaat verder met de andere kinderen.
#### EDDGridSideBySide skelet XML{#eddgridsidebyside-skeleton-xml} 
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

### EDDGridAlglobalExistingDimension{#eddgridaggregateexistingdimension} 
[ **EDDGridAlglobalExistingDimension** ](#eddgridaggregateexistingdimension)aggregaten twee of meerEDDGriddatasets die elk een ander waardenbereik hebben voor de eerste dimensie, maar dezelfde waarden voor de andere dimensies.

* Bijvoorbeeld, één kind dataset kan 366 waarden hebben (voor 2004) voor de tijddimensie en een ander kind kan 365 waarden hebben (voor 2005) voor de tijddimensie.
* Alle waarden voor alle andere dimensies (bijvoorbeeld breedtegraad, lengtegraad) MOET identiek zijn voor alle kinderen. De nauwkeurigheid van de test wordt bepaald door[matchAxisNDigits](#matchaxisndigits).
* Gesorteerde dimensiewaarden - De waarden voor elke dimensie MOET in gesorteerde volgorde zijn (oplopend of dalend) . De waarden kunnen onregelmatig worden verdeeld. Er kunnen geen banden zijn. Dit is een vereiste van de[CF-metadatastandaard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Als de waarden van een dimensie niet in gesorteerde volgorde zijn, wordt de dataset niet geladen enERDDAP™zal de eerste ongesorteerde waarde in het logbestand identificeren; *bigParentDirectory* /logs/log.txt .
    
Ongesorteerde dimensiewaarden geven bijna altijd een probleem aan met de bronset. Dit gebeurt het vaakst wanneer een verkeerd genoemd of ongepast bestand is opgenomen in de aggregatie, wat leidt tot een ongesorteerde tijddimensie. Om dit probleem op te lossen, zie de foutmelding in deERDDAP™log.txt-bestand om de beledigende tijdswaarde te vinden. Kijk dan in de bronbestanden om het bijbehorende bestand te vinden (of één voor of één na) Dat hoort niet bij de aggregatie.
    
* De moederdataset en de dochterdataset moeten verschillend zijndatasetIDs. Als namen in een familie precies hetzelfde zijn, zal de dataset niet laden (met het foutbericht dat de waarden van de geaggregeerde as niet in gesorteerde volgorde zijn) .
* Momenteel moet de kindset eenEDDGridVanDap-dataset en MOET de laagste waarden van de geaggregeerde dimensie hebben (meestal de oudste tijd waarden) . Alle andere kinderen moeten bijna identieke datasets zijn (verschillen alleen in de waarden voor de eerste dimensie) en worden gespecificeerd door enkel hunsourceUrl.
* De geaggregeerde dataset krijgt zijn metadata van het eerste kind.
* De[GenererenDatasets Xml-programma](#generatedatasetsxml)kan een ruwe ontwerp van dedatasets.xmlvoor eenEDDGridAlgeheleBestaandeDimensie gebaseerd op een reeks bestanden die door eenHyraxof THREDDS-server. Gebruik bijvoorbeeld deze invoer voor het programma (de "/1988" in de URL maakt het voorbeeld sneller) :
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
U kunt de resulterende&lt;sourceUrl&gt; tags of verwijder ze en verwijder de commentaar&lt;sourceUrl&gt; tag (zodat nieuwe bestanden worden opgemerkt elke keer dat de dataset wordt herladen.
#### EDDGridAlgeheelbestaandDimensieskelet XML{#eddgridaggregateexistingdimension-skeleton-xml} 
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

### EDDGridKopiëren{#eddgridcopy} 
[ **EDDGridKopiëren** ](#eddgridcopy)maakt en onderhoudt een lokale kopie van een anderEDDGrid's data en serveert gegevens van de lokale kopie.

*   EDDGridKopiëren (en voor tabelgegevens,[EDDtabelkopie](#eddtablecopy)) is een zeer gemakkelijk te gebruiken en een zeer effectief
     **oplossing voor enkele van de grootste problemen met het bedienen van gegevens van een externe gegevensbron:** 
    * De toegang tot gegevens van een externe databron kan traag zijn.
        * Het kan traag zijn omdat het inherent traag is (bijvoorbeeld een inefficiënt type server) ,
        * Omdat het overweldigd wordt door te veel verzoeken,
        * of omdat uw server of de externe server beperkt is.
    * De externe dataset is soms niet beschikbaar (opnieuw, om verschillende redenen) .
    * Vertrouwen op één bron voor de gegevens niet goed schalen (bijvoorbeeld, wanneer veel gebruikers en veelERDDAPGebruik het) .
         
* Hoe het werkt --EDDGridKopiëren lost deze problemen op door automatisch een lokale kopie van de gegevens te maken en te onderhouden en gegevens van de lokale kopie te serveren.ERDDAP™kan gegevens van de lokale kopie zeer, zeer snel dienen. En het maken van een lokale kopie verlicht de last op de externe server. En de lokale kopie is een back-up van het origineel, wat nuttig is voor het geval er iets gebeurt met het origineel.
    
Er is niets nieuws aan het maken van een lokale kopie van een dataset. Wat hier nieuw is, is dat deze klas het maakt.\\*gemakkelijk\\*het creëren en\\*handhaven\\*een lokale kopie van gegevens van een\\*ras\\*van soorten externe gegevensbronnen en\\*Metadata toevoegen\\*tijdens het kopiëren van de gegevens.
    
* Chunks of Data...EDDGridKopie maakt de lokale kopie van de gegevens door brokken gegevens van de remote te vragen&lt;dataset&gt; . Er zal een brok zijn voor elke waarde van de meest linkse (eerst) asvariabele.EDDGridKopiëren is niet afhankelijk van de indexnummers van de dataset op afstand voor de as -- die kunnen veranderen.
    
WAARSCHUWING: Als de grootte van een brok gegevens zo groot is (&gt; 2GB) dat het problemen veroorzaakt,EDDGridKopie kan niet gebruikt worden. (Sorry, we hopen in de toekomst een oplossing voor dit probleem te hebben.) 
    
*   \\[Een alternatief voorEDDGridKopiëren -
Als de gegevens op afstand beschikbaar zijn via downloadbare bestanden, geen webservice, gebruik[cache FromUrl optie voorEDDGridFromFiles](#cachefromurl), dat maakt een lokale kopie van de remote bestanden en dient de gegevens van de lokale bestanden.\\]
* Lokale bestanden -- Elke brok gegevens wordt in een aparteNetCDFbestand in een submap van *bigParentDirectory* /copy/ *datasetID* ' (zoals gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Bestandsnamen gemaakt van aswaarden zijn gewijzigd om ze bestandsnaam-veilig te maken (koppeltekens worden bijvoorbeeld vervangen door "x2D") -- dit heeft geen invloed op de werkelijke gegevens.
     
* Nieuwe gegevens -- Elke keerEDDGridKopie is herladen, het controleert de afstand&lt;dataset&gt; om te zien welke brokken beschikbaar zijn. Als het bestand voor een brok gegevens nog niet bestaat, wordt een verzoek om de brok aan een wachtrij toegevoegd.ERDDAP's taakThread verwerkt alle verzoeken in de wachtrij voor brokken data, één-voor-één. U kunt statistieken voor de taakThread's activiteit op de[Statuspagina](/docs/server-admin/additional-information#status-page)en in[Dagelijks verslag](/docs/server-admin/additional-information#daily-report). (Ja.ERDDAP™kunnen meerdere taken toe te wijzen aan dit proces, maar dat zou veel van de bandbreedte, het geheugen, en CPU-tijd van de externe gegevensbron, en veel van de lokaleERDDAP's bandbreedte, geheugen, en CPU tijd, geen van beide is een goed idee.) 
    
OPMERKING: De allereerste keerEDDGridDe kopie is geladen. (als alles goed gaat) veel verzoeken voor brokken gegevens zullen worden toegevoegd aan de wachtrij van de taakThread, maar er zullen geen lokale gegevensbestanden zijn aangemaakt. Dus de constructor zal falen, maar taakThread zal blijven werken en lokale bestanden aanmaken. Als alles goed gaat, zal de taakThread enkele lokale gegevensbestanden maken en de volgende poging om de dataset te herladen (in ~15 minuten) zal slagen, maar aanvankelijk met een zeer beperkte hoeveelheid gegevens.
    
OPMERKING: Nadat de lokale dataset gegevens heeft en verschijnt in uwERDDAP, als de dataset op afstand tijdelijk of permanent niet toegankelijk is, zal de lokale dataset nog steeds werken.
    
WAARSCHUWING: Als de externe dataset groot is en/of de externe server traag is (Dat is het probleem, nietwaar?&#33;) , het zal lang duren om een volledige lokale kopie te maken. In sommige gevallen zal de benodigde tijd onaanvaardbaar zijn. Bijvoorbeeld, het verzenden van 1 TB gegevens over een T1-lijn (0,15 GB/s) duurt ten minste 60 dagen, onder optimale omstandigheden. Bovendien gebruikt het veel bandbreedte, geheugen en CPU tijd op de remote en lokale computers. De oplossing is om een harde schijf te mailen naar de beheerder van de dataset op afstand, zodat s/hij een kopie van de dataset kan maken en de harde schijf naar u terug kan sturen. Gebruik die gegevens als uitgangspunt enEDDGridKopiëren zal gegevens toevoegen. (Dat is een manier dat[Amazon's EC2 Cloud Service](https://aws.amazon.com/importexport/)lost het probleem op, ook al heeft hun systeem veel bandbreedte.) 
    
WAARSCHUWING: Als een bepaalde waarde voor de meest linkse (eerst) asvariabele verdwijnt uit de remote dataset;EDDGridKopiëren verwijdert NIET het lokale gekopieerde bestand. Als je wilt, kun je het zelf verwijderen.
    
#### Controle rasterkopieBron Gegevens{#grid-copy-checksourcedata} 
Dedatasets.xmlvoor deze dataset kan een optionele tag hebben
```
    <checkSourceData>true</checkSourceData>  
```
De standaardwaarde is waar. Als/wanneer u het op false zet, zal de dataset nooit de brondataset controleren om te zien of er aanvullende gegevens beschikbaar zijn.

#### alleenSinds{#onlysince} 
Je kunt zienEDDGridKopiëren om een kopie te maken van een subset van de bronset, in plaats van de volledige bronset, door een tag in de vorm toe te voegen&lt;alleenSinds&gt; *enkele Waarde* &lt;/onlySinds&gt; naar de datasetdatasets.xmlBrok.EDDGridKopie zal alleen gegevenswaarden downloaden die gerelateerd zijn aan de waarden van de eerste dimensie (meestal de tijddimensie) die groter zijn dan *enkele Waarde* . *enkele Waarde* kan zijn:
    * Een relatieve tijd gespecificeerd vianow- *nEenheden* .
Bijvoorbeeld,&lt;alleenSinds&gt;now-2 jaar&lt;/onlySinds&gt; vertelt de dataset om alleen lokale kopieën te maken van gegevens waar de waarden van de buitendimensie zijn (meestal tijdwaarden) zijn in de laatste 2 jaar (die telkens opnieuw wordt geëvalueerd wanneer de dataset wordt herladen, wat is wanneer het op zoek is naar nieuwe gegevens te kopiëren) . Zie[now- *nEenheden* syntaxisbeschrijving](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Dit is handig als de eerste dimensie tijdgegevens heeft, wat het meestal doet.
        
        EDDGridKopiëren verwijdert geen lokale gegevensbestanden met gegevens die na verloop van tijd ouder worden dannow- *nEenheden* . U kunt deze bestanden elk moment verwijderen als u ervoor kiest. Als u dat doet, raden wij u aan een[vlag](/docs/server-admin/additional-information#flag)nadat u de bestanden te vertellen verwijderenEDDGridKopiëren om de lijst met opgeslagen bestanden bij te werken.
        
    * Een vast punt in de tijd gespecificeerd als een ISO 8601 stringyyyy-MM-ddTHH:mm:ssZ.
Bijvoorbeeld,&lt;alleenSinds&gt;2000-01-01T00:00:00Z&lt;/onlySinds&gt; vertelt de dataset alleen om lokale kopieën te maken van gegevens waar de waarde van de eerste dimensie is \\&gt;=2000-01-01T00:00:00Z . Dit is handig als de eerste dimensie tijdgegevens heeft, wat het meestal doet.
         
    * Een drijvend puntnummer.
Bijvoorbeeld,&lt;alleenSinds&gt;946684800,0&lt;/onlySinds&gt; . De eenheden zullen de bestemmingseenheden van de eerste dimensie zijn. Bijvoorbeeld, voor tijdafmetingen, de eenheden inERDDAP™zijn altijd"seconds since 1970-01-01T00:00:00Z". Dus 946684800,0"seconds since 1970-01-01T00:00:00Z"is equivalent aan 2000-01-01T00:00:00Z. Dit is altijd een handige optie, maar is vooral handig wanneer de eerste dimensie geen tijdgegevens heeft.

#### EDDGridAanbevolen gebruik kopiëren{#eddgridcopy-recomended-use} 
1. Creëer de&lt;dataset&gt; item (het inheemse type, nietEDDGridKopiëren) voor de externe gegevensbron.
     **Zorg dat het goed werkt, inclusief alle gewenste metadata.** 
2. Als het te langzaam is, voeg XML code toe om het in eenEDDGridKopieer dataset.
    * Gebruik een anderedatasetID  (Misschien door dedatasetIDvan de oudedatasetIDlicht) .
    * Kopiëren&lt;toegankelijk Aan&gt;,&lt;herladenEveryNMinutes&gt; en&lt;onChange&gt; van de remoteEDDGrid's XML naar deEDDGridKopie XML. (Hun waarden voorEDDGridKopieer materie; hun waarden voor de innerlijke dataset worden irrelevant.) 
3.  ERDDAP™maakt en bewaart een lokale kopie van de gegevens.
         
* WAARSCHUWING:EDDGridKopie gaat ervan uit dat de datawaarden voor elke brok nooit veranderen. Als / wanneer ze dat doen, moet je handmatig verwijderen van de brok bestanden in *bigParentDirectory* /copy/ *datasetID* / die veranderde en[vlag](/docs/server-admin/additional-information#flag)de te herladen dataset zodat de verwijderde brokken worden vervangen. Als je een e-mailabonnement op de dataset hebt, krijg je twee e-mails: één wanneer de dataset voor het eerst herlaadt en de gegevens begint te kopiëren, en een andere wanneer de dataset opnieuw geladen wordt (automatisch) en detecteert de nieuwe lokale gegevensbestanden.
     
* Alle aswaarden moeten gelijk zijn.
Voor elk van de assen, met uitzondering van de linker (eerst) Alle waarden moeten voor alle kinderen gelijk zijn. De nauwkeurigheid van de test wordt bepaald door[matchAxisNDigits](#matchaxisndigits).
     
* Instellingen, Metadata, Variabelen --EDDGridKopiëren gebruikt instellingen, metadata en variabelen uit de bijgesloten bronset.
     
* Metadata wijzigen -- Als u eenaddAttributesof de volgorde van de variabelen in verband met de brondataset wijzigen:
    1. Wijzig deaddAttributesvoor de bronset indatasets.xml, indien nodig.
    2. Verwijder een van de gekopieerde bestanden.
    3. Stel een[vlag](/docs/server-admin/additional-information#flag)om de dataset onmiddellijk te herladen. Als je een vlag gebruikt en je hebt een e-mailabonnement op de dataset, krijg je twee e-mails: één wanneer de dataset voor het eerst herlaadt en begint te kopiëren van de gegevens, en een andere wanneer de dataset opnieuw laadt (automatisch) en detecteert de nieuwe lokale gegevensbestanden.
    4. Het verwijderde bestand zal worden geregenereerd met de nieuwe metadata. Als de bronset ooit niet beschikbaar is, deEDDGridKopieer dataset krijgt metadata uit het geregenereerde bestand, omdat het het jongste bestand is.
#### EDDGridGeraamte kopiëren XML{#eddgridcopy-skeleton-xml} 
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

### EDDtabelVanCassandra{#eddtablefromcassandra} 
[ **EDDtabelVanCassandra** ](#eddtablefromcassandra)gegevens van één[Cassandra](https://cassandra.apache.org/)tafel. Cassandra is een NoSQL database.

*   ERDDAP™kan werken met Cassandra v2 en v3 zonder veranderingen of verschillen in setup. We hebben getest met[Cassandra v2 en v3 van Apache](https://cassandra.apache.org/download/). Het is waarschijnlijk datERDDAP™kan ook werken met Cassandra gedownload van DataStax.
     
* Voor Aug 2019 - mei 2021 hadden we moeite om Cassandra aan het werk te krijgen met AdoptOpenJdkJavav8. Het gooide een UITZONDERING\\_ACCESS\\_VIOLATION). Maar nu (Mei 2021) , dat probleem is verdwenen: we kunnen met succes Cassandra v2.1.22 en AdoptOpenJdk jdk8u292-b10 gebruiken.
     
#### Eén tabel{#one-table} 
Cassandra ondersteunt geen "joins" zoals relationele databases dat doen. EénERDDAP™EDDtabelVanCassandra datasetkaarten naar één (misschien een subset van één) Cassandra tafel.

#### Cassandradatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™komt met de CassandraJavadriver, dus je hoeft het niet apart te installeren.
* Lees zorgvuldig alle informatie van dit document over EDDTableFromCassandra. Sommige details zijn erg belangrijk.
* De CassandraJavabestuurder is bedoeld om te werken met Apache Cassandra (1.2+) en DataStax Enterprise (3.1+) . Als u Apache Cassandra 1.2.x gebruikt, moet u het cassandra.yaml bestand bewerken voor elke node om start\\_native\\_transport in te stellen: true, herstart dan elke node.
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. U kunt dan bewerken dat om het fijn af te stemmen (vooral [&lt;partitie Sleutelbronnamen&gt;] (#partitionkeybronnamen) ). U kunt de meeste informatie verzamelen die u nodig hebt om de XML voor een EDDTableFromCassandra dataset te maken door contact op te nemen met de Cassandra beheerder en door het web te zoeken.
    
GenererenDatasets Xml heeft twee speciale opties voor EDDTableFromCassandra:
    
    1. Als je "&#33;&#33;&#33;LIJST&#33;&#33;&#33;" (zonder de citaten) voor de sleutelruimte, zal het programma een lijst met sleutelruimtes tonen
    2. Als je een bepaalde keyspace invoert en dan "&#33;&#33;LIST&#33;&#33;&#33;" (zonder de citaten) voor de tabelnaam zal het programma een lijst met tabellen in die sleutelruimte en hun kolommen weergeven.
##### Hoofdlettergevoeligheid{#case-sensitivity} 
* Hoofdletterongevoelige sleutelruimte en tabelnamen -
Cassandra behandelt sleutelruimte en tafelnamen op een ongevoelige manier. Daarom moet je NOOIT een gereserveerd woord gebruiken (maar met een ander geval) als een Cassandra sleutelruimte of tafelnaam.
* Hoofdletter-ongevoelige kolomnamen --
Standaard behandelt Cassandra kolomnamen op een ongevoelige manier. Als u één van Cassandra's gereserveerde woorden gebruikt als kolomnaam (Alsjeblieft, niet doen.) , u moet gebruiken
```
        <columnNameQuotes>"<columnNameQuotes>  
```
indatasets.xmlvoor deze dataset zodat Cassandra enERDDAP™behandelt de kolomnamen op een hoofdlettergevoelige manier. Dit zal waarschijnlijk een enorme hoofdpijn voor u zijn, want het is moeilijk om de hoofdlettergevoelige versies van de kolomnamen te bepalen - Cassandra toont bijna altijd de kolomnamen als alle kleine letters, ongeacht het ware geval.
* Werk nauw samen met de beheerder van Cassandra, die relevante ervaring kan hebben. Als de dataset niet wordt geladen, lees dan de[foutmelding](#troubleshooting-tips)zorgvuldig uitzoeken waarom.
         
#### Cassandra&lt;verbinding Eigenschap&gt;{#cassandra-connectionproperty} 
Cassandra heeft verbindingseigenschappen die gespecificeerd kunnen worden indatasets.xml. Veel van deze zullen de prestaties van de Cassandra beïnvloeden.ERDDAP™verbinding. Helaas, Cassandra eigenschappen moet worden geprogrammeerd inJava, dusERDDAP™moet code hebben voor elke eigenschapERDDAP™steun. Momenteel,ERDDAP™ondersteunt deze eigenschappen:
 (De getoonde standaardwaarden zijn wat we zien. De standaardwaarden van uw systeem kunnen anders zijn.) 

*    **Algemene opties**   
    &lt;verbinding Eigendomsnaam=" **compressie** "&gt; *geen|LZ4|snel* &lt;/Verbinding Eigenschap&gt; (hoofdletter ongevoelig, standaard=geen)   
     (Algemeen compressieadvies: gebruik 'geen' als de verbinding tussen Cassandra enERDDAP™is lokaal/snel en gebruik 'LZ4' als de verbinding op afstand/langzaam is.)   
    &lt;verbinding Eigendomsnaam=" **referenties** "&gt; *Gebruikersnaam/wachtwoord* &lt;/Verbinding Eigenschap&gt; (Dat is letterlijk.'/')   
    &lt;verbinding Eigendomsnaam=" **metrics** "&gt; *waar|onwaar* &lt;/Verbinding Eigenschap&gt; (2021-01-25 was standaard=true, nu genegeerd en altijd vals)   
    &lt;verbinding Eigendomsnaam=" **poort** "&gt; *anInteger* &lt;/Verbinding Eigenschap&gt; (standaard voor native binair protocol=9042)   
    &lt;verbinding Eigendomsnaam=" **ssl** "&gt; *waar|onwaar* &lt;/Verbinding Eigenschap&gt; (standaard=vals)   
     (Mijn snelle poging om ssl te gebruiken is mislukt. Als je slaagt, vertel me dan hoe je het gedaan hebt.) 
*    **Opties voor opvragen**   
    &lt;verbinding Eigendomsnaam=" **consistentie Niveau** "&gt; *alle|alle|elke\\_quorum|lokale\\_one|lokaal_quorum|_Lokaal|één|quorum|serieel|drie|twee* &lt;/Verbinding Eigenschap&gt; (hoofdletter ongevoelig, standaard=ONE)   
    &lt;verbinding Eigendomsnaam=" **fetchSize** "&gt; *anInteger* &lt;/Verbinding Eigenschap&gt; (standaard=5000)   
     (Stel fetchSize niet in op een kleinere waarde.)   
    &lt;verbinding Eigendomsnaam=" **serialConsistencyLevel** "&gt; *alle|alle|elke\\_quorum|lokale\\_one|lokaal_quorum|_Lokaal|één|quorum|serieel|drie|twee* &lt;/Verbinding Eigenschap&gt; (hoofdletter ongevoelig, standaard=SERIAL) 
*    **Socket-opties**   
    &lt;verbinding Eigendomsnaam=" **connectTimeoutMillis** "&gt; *anInteger* &lt;/Verbinding Eigenschap&gt; (standaard=5000)   
     (Verbinding niet instellen TimeoutMillis naar een kleinere waarde.)   
    &lt;verbinding Eigendomsnaam=" **blijven leven** "&gt; *waar|onwaar* &lt;/Verbinding Eigenschap&gt;
    &lt;verbinding Eigendomsnaam=" **readTimeoutMillis** "&gt; *anInteger* &lt;/Verbinding Eigenschap&gt;
     (Cassandra's standaard readTimeoutMillis is 12000, maarERDDAP™wijzigt de standaardwaarde in 120000. Als Cassandra readTimeouts gooit, kan dit verhogen niet helpen, omdat Cassandra ze soms voor deze tijd gooit. Het probleem is waarschijnlijker dat u te veel gegevens per partitie opslaat Sleutelcombinatie.)   
    &lt;verbinding Eigendomsnaam=" **ontvangenBuffergrootte** "&gt; *anInteger* &lt;/Verbinding Eigenschap&gt;
     (Het is onduidelijk wat de standaard ontvangBufferSize is. Stel dit niet op een kleine waarde.)   
    &lt;verbinding Eigendomsnaam=" **soLinger** "&gt; *anInteger* &lt;/Verbinding Eigenschap&gt;
    &lt;verbinding Eigendomsnaam=" **tcpNoDelay** "&gt; *waar|onwaar* &lt;/Verbinding Eigenschap&gt; (standaard=null) 

Als u andere verbindingseigenschappen wilt kunnen instellen, zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).

Voor een gegeven startup van Tomcat worden connectieEigenschappen alleen gebruikt bij de eerste keer dat een dataset wordt aangemaakt voor een gegeven Cassandra URL. Alle herladen van die dataset en alle volgende datasets die dezelfde URL delen zullen die originele connectieEigenschappen gebruiken.
    
#### CQL{#cql} 
De Cassandra Query Language (CQL) is oppervlakkig als SQL, de query taal gebruikt door traditionele databases. OmdatOPeNDAP's tabel gegevensverzoeken werden ontworpen om SQL tabel gegevens verzoeken na te bootsen, is het mogelijk voorERDDAP™het omzetten van tabelgegevensverzoeken in CQL Bound/PreparedStatements.ERDDAP™logt de verklaring in[log.txt](/docs/server-admin/additional-information#log)als
verklaring als tekst: *De verklaringAsText*   
De versie van de verklaring die u ziet zal een tekstrepresentatie van de verklaring zijn en zal alleen "?" hebben waar beperkingen waarden zullen worden geplaatst.
       
Niet zo eenvoudig... Helaas, CQL heeft veel beperkingen op welke kolommen kunnen worden gevraagd met welke soorten beperkingen, bijvoorbeeld, partitiesleutel kolommen kunnen worden beperkt met = en IN, dusERDDAP™stuurt enkele beperkingen naar Cassandra en past alle beperkingen toe nadat de gegevens van Cassandra zijn ontvangen. Om te helpenERDDAP™efficiënt omgaan met Cassandra, moet je specificeren [&lt;partitie Sleutelbronnamen&gt;] (#partitionkeybronnamen) , [&lt;clusterColumnSourceNames&gt;] (#clusterkolombronnamen) en [&lt;indexColumbSourceNames&gt;] (#indexkolombronnamen) indatasets.xmlvoor deze dataset. Dit zijn de belangrijkste manieren om te helpenERDDAP™efficiënt werken met Cassandra. Als je het niet verteltERDDAP™deze informatie, de dataset zal pijnlijk traag inERDDAP™en gebruik maken van tonnen Cassandra middelen.
     
#### &lt;partitie Sleutelbronnamen&gt;{#partitionkeysourcenames} 
Omdat partitietoetsen een centrale rol spelen in Cassandra tabellen,ERDDAP™moeten hunsourceNameen, indien relevant, andere informatie over hoe met hen te werken.
* U MOET een door komma's gescheiden lijst van partitiesleutel bron kolom namen opgeven indatasets.xmlvia&lt;partitie Sleutelbronnamen&gt;.
Een eenvoudig voorbeeld:
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Meer complex voorbeeld,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp Partition Keys -- Als een van de partitiesleutel kolommen een tijdstempel kolom is met een grovere versie van een andere tijdstempel kolom, geef dit dan via
     *partitieKeySourcNaam/andereColumnBronnaam/time\\_precision*   
waarbijtime\\_precisionis een van de[time\\_precision](#time_precision)strings gebruikt elders inERDDAP.
De volgende Z in detime\\_precisionstring is de standaard, dus het maakt niet uit of detime\\_precisionString eindigt in Z of niet.
Bijvoorbeeld,ERDDAP™zal datum/sampletime/1970-01-01 interpreteren als "De beperkingen voor de datum kunnen worden opgebouwd uit beperkingen op de bemonsteringstijd door gebruik te maken van dezetime\\_precision." De werkelijke omzetting van beperkingen is complexer, maar dat is het overzicht.
     **Gebruik dit wanneer dit relevant is.** Het maaktERDDAP™om efficiënt te werken met Cassandra. Als deze relatie tussen kolommen bestaat in een Cassandra tabel en je niet vertellenERDDAP™, de dataset zal pijnlijk traag inERDDAP™en gebruik maken van tonnen Cassandra middelen.
* Enkele Waardepartitiesleutels -- Als u eenERDDAP™dataset om te werken met slechts één waarde van één partitiesleutel, specificeren *partitieKeyBronNaam=waarde* .
Gebruik geen citaten voor een numerieke kolom, bijvoorbeeld deviceid=1007
Gebruik aanhalingstekens voor een tekenreeks, bijvoorbeeld stationid="Point Pinos"
* Standaard Sorteervolgorde -- De volgorde van de partitiesleutel&lt;dataVariable&gt;datasets.xmlbepaalt de standaardvolgorde van de resultaten van Cassandra. Uiteraard kunnen gebruikers een andere sorteervolgorde voor een bepaalde reeks resultaten aanvragen door &orderBy (" *komma-gescheiden lijst van variabelen* ") tot het einde van hun vraag.
* Bij verstek Cassandra enERDDAP™columnnamen behandelen op een hoofdletterongevoelige manier. Maar als je[kolomNameCitates](#case-sensitivity)naar ";ERDDAP™zal de naam van de Cassandra-kolom op een gevoelige manier behandelen.
         
#### &lt;partitie SleutelCSV&gt;{#partitionkeycsv} 
Als dit wordt gespecificeerd,ERDDAP™zal het gebruiken in plaats van Cassandra om de partitie te vragen Belangrijke informatie elke keer dat de dataset wordt herladen. Dit geeft de lijst van aparte partitie sleutelwaarden, in de volgorde die ze zullen worden gebruikt. Tijden moeten worden gespecificeerd als seconden sinds 1970-01-01T00:00:00Z. Maar er zijn ook twee speciale alternatieve manieren om tijden te specificeren (elk gecodeerd als een tekenreeks) :

1) tijd (aISO8601 Tijd)   (MAG worden gecodeerd als een tekenreeks)   
2) "tijden (anISO8601StartTime, strideSeconds, stopTime) " (Moet worden gecodeerd als een tekenreeks)   
stoppen Tijd kan een ISO8601 zijn Tijd of een "now-nEenhedentijd (bv. "now-3 minuten") .
stoppen Tijd hoeft geen exacte match te zijn van het begin. Tijd + x stapSeconds.
Een rij met een keer () waarde wordt uitgebreid tot meerdere rijen voor elke query, dus de lijst met partitie Sleutels kunnen altijd perfect up-to-date zijn.
Bijvoorbeeld,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
breidt uit in deze tabel van partitietoetscombinaties:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames&gt;{#clustercolumnsourcenames} 
Cassandra accepteert SQL-achtige beperkingen op cluster kolommen, die de kolommen zijn die het tweede deel van de primaire sleutel vormen (na de partitiesleutel (s) ) . Het is dus essentieel dat u deze kolommen via&lt;clusterColumbSourceNames&gt;. Dit maaktERDDAP™om efficiënt te werken met Cassandra. Als er cluster kolommen en je niet vertellenERDDAP, de dataset zal pijnlijk traag inERDDAP™en gebruik maken van tonnen Cassandra middelen.
    * Bijvoorbeeld,&lt;clusterColumnSourceNames&gt; *myClusterColumn1, myClusterColumn2* &lt;/clusterColumnSourceNames&gt;
    * Als een Cassandra tabel geen cluster kolommen heeft, geef dan ook niet op&lt;clusterColumnSourceNames&gt;, of geef het zonder waarde aan.
    * Bij verstek Cassandra enERDDAP™columnnamen behandelen op een hoofdletterongevoelige manier. Maar als je[kolomNameCitates](#case-sensitivity)naar ";ERDDAP™zal Cassandra kolomnamen behandelen op een hoofdlettergevoelige manier.
         
#### &lt;indexColumnSourceNames&gt;{#indexcolumnsourcenames} 
Cassandra accepteert'='beperkingen op secundaire index kolommen, die zijn de kolommen die u expliciet indexen hebt gemaakt voor via
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Ja, de haakjes zijn verplicht.)   
Het is dus erg handig als je deze kolommen via&lt;indexColumnSourceNames&gt;. Dit maaktERDDAP™om efficiënt te werken met Cassandra. Als er index kolommen en je niet vertellenERDDAP, sommige vragen zullen onnodig, pijnlijk traag inERDDAP™en gebruik maken van tonnen Cassandra middelen.
* Bijvoorbeeld,&lt;indexColumnSourceNames&gt; *myIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNames&gt;
* Als een Cassandra tabel geen index kolommen heeft, geef dan ook niet op&lt;indexColumnSourceNames&gt;, of geef het aan zonder waarde.
* WAARSCHUWING: Cassandra indexen zijn niet als database indexen. Cassandra indexen alleen helpen met'='beperkingen. En ze zijn alleen[aanbevolen](https://cassandra.apache.org/doc/latest/cql/indexes.html)voor kolommen met veel minder verschillende waarden dan totale waarden.
* Bij verstek Cassandra enERDDAP™columnnamen behandelen op een hoofdletterongevoelige manier. Maar als je[kolomNameCitates](#case-sensitivity)naar ";ERDDAP™zal Cassandra kolomnamen behandelen op een hoofdlettergevoelige manier.
         
#### &lt;maxRequestFraction&gt;{#maxrequestfraction} 
WanneerERDDAP™  (re) laadt een dataset,ERDDAP™krijgt van Cassandra de lijst van verschillende combinaties van de partitiesleutels. Voor een enorme dataset zal het aantal combinaties enorm zijn. Als u wilt voorkomen dat gebruikers verzoeken om de meeste of alle dataset (of zelfs een verzoek dat vraagtERDDAP™om de meeste of alle gegevens te downloaden om het verder te filteren) , kun je zienERDDAP™alleen om verzoeken toe te staan die het aantal combinaties met een bepaald bedrag verminderen via&lt;maxRequestFraction&gt;, wat een drijvend puntnummer is tussen 1e-10 (wat betekent dat het verzoek niet meer dan 1 combinatie in een miljard nodig heeft) en 1 (de standaard, wat betekent dat het verzoek voor de gehele dataset kan zijn) .
Bijvoorbeeld, als een dataset 10000 verschillende combinaties van de partitietoetsen heeft en maxRequestFraction is ingesteld op 0,1,
verzoeken die gegevens van 1001 of meer combinaties nodig hebben, zullen een foutmelding genereren;
maar verzoeken die gegevens van 1000 of minder combinaties nodig hebben, zijn toegestaan.
    
In het algemeen, hoe groter de dataset, hoe lager u moet instellen&lt;maxRequestFraction&gt;. Dus je kunt het instellen op 1 voor een kleine dataset, 0.1 voor een middelgrote dataset, 0.01 voor een grote dataset, en 0.0001 voor een enorme dataset.
    
Deze aanpak is verre van perfect. Het zal ertoe leiden dat een aantal redelijke verzoeken worden afgewezen en sommige te grote verzoeken worden toegestaan. Maar het is een moeilijk probleem en deze oplossing is veel beter dan niets.
    
#### CassandrasubsetVariables {#cassandra-subsetvariables} 
Net als bij andere EDDTable datasets, kunt u een door komma's gescheiden lijst van&lt;dataVariable&gt;destinationNames in een globaal attribuut genaamd "[subsetVariables](#subsetvariables)" variabelen met een beperkt aantal waarden te identificeren. De dataset heeft dan een .subset webpagina en toont lijsten van verschillende waarden voor die variabelen in drop-down lijsten op vele webpagina's.
    
Inclusief alleen partitie sleutel variabelen en statische kolommen in de lijst is STRONGLY ENCOVerdwenen. Cassandra zal in staat zijn om de lijst van verschillende combinaties te genereren zeer snel en gemakkelijk elke keer dat de dataset wordt herladen. Een uitzondering is timestamp partitietoetsen die grove versies zijn van een andere tijdstempel kolom -- het is waarschijnlijk het beste om deze uit de lijst vansubsetVariablesomdat er een groot aantal waarden en ze zijn niet erg nuttig voor gebruikers.
    
Als je niet-partitie sleutel, niet-statische variabelen in de lijst, het zal waarschijnlijk zijn **zeer** berekenend duur voor Cassandra elke keer dat de dataset wordt herladen, omdatERDDAP™moet door elke rij van de dataset kijken om de informatie te genereren. De vraag zal waarschijnlijk mislukken. Dus, behalve voor zeer kleine datasets, dit is STRONGLY DISCOURAGED.
    
#### Cassandra DataTypes{#cassandra-datatypes} 
Want er is enige dubbelzinnigheid over welke[Cassandra data types](https://cassandra.apache.org/doc/latest/cql/types.html)kaart waaropERDDAP™gegevenstypen, moet u een [ specificeren&lt;dataType&gt;] (#datatype) tag voor elk [&lt;dataVariable&gt;] (#datavariabele) om te vertellenERDDAP™welke dataType te gebruiken. De normERDDAP™gegevens Typen (en de meest voorkomende corresponderende Cassandra-gegevenstypes) zijn:
    
*   [booleaans](#boolean-data)  (booleaans) , dieERDDAP™dan slaat op als bytes
* byte (int, als het bereik -128 tot 127 is) 
* kort (int, als het bereik -32768 tot 32767 is) 
* int (Int, counter?, varint?, als het bereik -2147483648 tot 2147483647 is) 
* lang (bigint, counter?, varint?, als het bereik is -9223372036854775808 tot 9223372036854775807) 
* drijvend (drijvend) 
* dubbel (dubbel, decimaal (met mogelijk verlies van precisie) , tijdstempel) 
* char (ascii of tekst, indien ze nooit meer dan 1 karakter hebben) 
* Tekenreeks (Ascii, tekst, varchar, inet, uuid, timeuid, blob, map, set, list?) 

Cassandra's[tijdstempel](#cassandra-timestamp-data)is een speciaal geval: gebruikERDDAP's double data Type.

Als u een String dataType inERDDAP™voor een Cassandra kaart, set of lijst, zal de kaart, set of lijst op elke Cassandra rij worden omgezet in een enkele string op een enkele rij in deERDDAP™tafel.ERDDAP™een alternatief systeem voor lijsten heeft; zie hieronder.

 *type* Lijsten --ERDDAP's [&lt;dataType&gt;] (#datatype) tag voor CassandradataVariables kan de reguliereERDDAP™gegevens Typen (zie boven) plus verschillende speciale dataTypen die kunnen worden gebruikt voor Cassandra lijst kolommen: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. Wanneer een van deze lijst kolommen is in de resultaten worden doorgegeven aanERDDAP™, elke rij brongegevens zal worden uitgebreid naar lijst. grootte () rijen gegevens inERDDAP; eenvoudige gegevens Typen (bijvoorbeeld, int) in die brongegevens rij zal worden gedupliceerd lijst. grootte () tijden. Indien de resultaten meer dan één lijstvariabele bevatten, MOETEN alle lijsten op een gegeven gegevensrij dezelfde grootte hebben en "parallelle" lijsten zijn, ofERDDAP™zal een foutmelding genereren. Bijvoorbeeld, voor stroommetingen van een ADCP,
diepte\\[0\\], uCurrent\\[0\\], vCurrent\\[0\\], en zCurrent\\[0\\]alle verbanden hebben, en
diepte\\[1\\], uCurrent\\[1\\], vCurrent\\[1\\], en zCurrent\\[1\\]zijn allemaal gerelateerd, ...
Als alternatief, als je niet wiltERDDAP™om een lijst uit te breiden naar meerdere rijen in deERDDAP™tabel, specificeer tekenreeks als dedataVariable's data Typ zo dat de hele lijst wordt weergegeven als één tekenreeks op één rij inERDDAP.
    
#### Cassandra TimeStamp Data{#cassandra-timestamp-data} 
Cassandra's tijdstempelgegevens zijn altijd op de hoogte van tijdzones. Als u tijdstempelgegevens invoert zonder een tijdzone te specificeren, gaat Cassandra ervan uit dat de tijdstempel de lokale tijdzone gebruikt.
    
ERDDAP™ondersteunt tijdstempel gegevens en presenteert altijd de gegevens in deZuluGMT tijdzone. Dus als u tijdstempelgegevens invoert in Cassandra met behulp van een andere tijdzone danZulu/GMT, onthoud dat je alle queries moet doen voor tijdstempelgegevens inERDDAP™deZuluGMT tijdzone. Dus wees niet verbaasd als de tijdstempel waarden die uitERDDAPworden verschoven door enkele uren vanwege de tijdzone switch van lokale naarZuluGMT tijd.

* InERDDAP'sdatasets.xmlIn de&lt;dataVariable&gt; tag voor een tijdstempelvariabele, ingesteld
```
          <dataType>double</dataType>  
```
en in&lt;addAttributes&gt; ingesteld
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Suggestie: Als de gegevens een tijdsbereik zijn, is het handig om de tijdstempelwaarden naar het centrum van het impliciete tijdbereik te laten verwijzen. (bijvoorbeeld, middag) . Bijvoorbeeld, als een gebruiker gegevens heeft voor 2010-03-26T13:00Z uit een andere dataset en ze willen de dichtstbijzijnde gegevens uit deze Cassandra dataset die gegevens heeft voor elke dag, dan de gegevens voor 2010-03-26T12:00Z (die Cassandra-gegevens voor die datum vertegenwoordigen) Is duidelijk de beste (in tegenstelling tot de middernacht voor of na, waar het minder duidelijk is wat het beste is) .
*   ERDDAP™heeft een hulpprogramma om[Een numeriek omzetten Tijd van/naar een tekenreekstijd](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Zie[HoeERDDAP™Omgaan met tijd](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
#### Integer nulls{#integer-nulls} 
Cassandra ondersteunt nulls in Cassandra int (ERDDAP™int) en bigint (ERDDAP™lang) kolommen, maarERDDAP™ondersteunt geen echte nullen voor een integer datatype.
Standaard zal Cassandra integer nulls worden omgezet inERDDAP™tot en met 2147483647 voor int kolommen, of 9223372036854775807 voor lange kolommen. Deze zullen verschijnen als "NaN" in sommige soorten tekstuitvoerbestanden (bijvoorbeeld, .csv) , "" in andere soorten tekstuitvoerbestanden (bijvoorbeeld,.htmlTable) , en het specifieke nummer (2147483647 voor ontbrekende int-waarden) in andere soorten bestanden (bijvoorbeeld binaire bestanden zoals.ncen mat) . Een gebruiker kan zoeken naar rijen gegevens met dit type ontbrekende waarde door te verwijzen naar "NaN," bijvoorbeeld "&windSpeed=NaN."
    
Als u een andere integer waarde gebruikt om ontbrekende waarden aan te geven in uw Cassandra tabel, kunt u deze waarde identificeren indatasets.xml:

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Voor Cassandra drijvende punt kolommen, nuls worden omgezet in NaNs inERDDAP. Voor Cassandra data types die zijn omgezet in Strings inERDDAP™, nulls worden omgezet in lege Strings. Dat zou geen probleem moeten zijn.
    
#### "WARNING: Re-voorbereiding reeds voorbereide query"{#warning-re-preparing-already-prepared-query} 
* "WARNING: Re-preparing reeds voorbereide query" in *kat* /logs/catalina.out (of een ander Tomcat-logbestand)   
Cassandra documentatie zegt dat er problemen zijn als dezelfde vraag wordt gemaakt in een PreparedStatement tweemaal (of meer) . (Zie dit[foutrapport](https://datastax-oss.atlassian.net/browse/JAVA-236).) Om Cassandra niet kwaad te maken,ERDDAP™Caches alle PreparedStatements zodat het ze kan hergebruiken. Die cache is verloren als/wanneer Tomcat/ERDDAP™is herstart, maar ik denk dat dat goed is omdat de PreparedStatements worden geassocieerd met een bepaalde sessie (tussenJavaen Cassandra) , dat is ook verloren. Dus je kunt deze berichten zien. Ik weet geen andere oplossing. Gelukkig is het een waarschuwing, geen fout. (hoewel Cassandra dreigt dat het kan leiden tot prestatieproblemen) .
    
Cassandra beweert dat voorbereide verklaringen voor altijd goed zijn, dusERDDAP's cached PreparedStatments mag nooit verouderd/ongeldig worden. Als dat niet waar is, en je krijgt fouten over bepaalde PreparedStatements die verouderd/ongeldig zijn, dan moet je opnieuw startenERDDAP™te wissenERDDAPDe cache van PreparedStatements.
    
#### Cassandra Security{#cassandra-security} 
Zie[Cassandra beveiligen](https://cassandra.apache.org/doc/latest/operating/security.html)

Bij het werken met Cassandra, moet je dingen zo veilig en veilig mogelijk doen om te voorkomen dat een kwaadaardige gebruiker uw Cassandra te beschadigen of toegang te krijgen tot gegevens waar ze geen toegang tot zouden moeten hebben.ERDDAP™probeert ook dingen op een veilige manier te doen.

* Wij moedigen u aan om op te zettenERDDAP™om verbinding te maken met Cassandra als Cassandra gebruiker die alleen toegang heeft tot de **relevant** tabel (s) en heeft alleen READ privileges.
* Wij moedigen u aan om de verbinding vanERDDAP™naar Cassandra zodat het
    * gebruikt SSL altijd,
    * staat alleen verbindingen toe vanaf één IP-adres (of één adresblok) en van die eneERDDAP™gebruiker, en
    * alleen wachtwoorden in hun MD5 gehashte vorm.
*   \\[Bekend probleem\\]De verbindingEigenschappen (inclusief het wachtwoord&#33;) worden opgeslagen als platte tekst indatasets.xml. We hebben geen manier gevonden om de beheerder toe te staan het Cassandra wachtwoord in te voeren tijdensERDDAP's startup in Tomcat (die optreedt zonder gebruikersinvoer) , dus het wachtwoord moet toegankelijk zijn in een bestand. Om dit veiliger te maken:
    * Jij (deERDDAP™beheerder) moet de eigenaar zijn vandatasets.xmlen hebben READ en WRITE toegang.
    * Maak een groep die alleen user=tomcat omvat. Gebruik chgrp om de groep te maken voordatasets.xml, met enkel READ privileges.
    * chmod gebruiken om o-rwx-rechten toe te wijzen (geen toegang tot READ of WRITE voor "andere" gebruikers) voordatasets.xml.
* WanneerERDDAP™, het wachtwoord en andere verbindingseigenschappen worden opgeslagen in "privé"Javavariabelen.
* Verzoeken van klanten worden ontleed en gecontroleerd op geldigheid voor het genereren van de CQL verzoeken voor Cassandra.
* Verzoeken aan Cassandra worden gedaan met CQL Bound/PreparedStatements, om CQL injectie te voorkomen. In ieder geval, Cassandra is inherent minder gevoelig voor CQL injectie dan traditionele databases zijn om[SQL injectie](https://en.wikipedia.org/wiki/SQL_injection).
         
#### Cassandra Speed{#cassandra-speed} 
Cassandra kan snel of langzaam zijn. Er zijn een aantal dingen die je kunt doen om het snel te maken:
* In het algemeen
De aard van CQL is dat vragen zijn[declaratie](https://en.wikipedia.org/wiki/Declarative_programming). Ze geven alleen aan wat de gebruiker wil. Ze bevatten geen specificatie of hints voor hoe de query moet worden behandeld of geoptimaliseerd. Dus er is geen manier voorERDDAP™om de query te genereren op een zodanige manier dat het helpt Cassandra optimaliseren van de query (of op enigerlei wijze specificeert hoe de query moet worden behandeld) . In het algemeen is het aan de Cassandra om dingen op te zetten. (bijvoorbeeld indexen) om te optimaliseren voor bepaalde soorten vragen.
     
* Het specificeren van de tijdstempel kolommen die gerelateerd zijn aan grover-precisie tijdstempel partitiesleutels via [&lt;partitie Sleutelbronnamen&gt;] (#partitionkeybronnamen) is de belangrijkste manier om te helpenERDDAP™efficiënt werken met Cassandra. Als deze relatie bestaat in een Cassandra tafel en je niet vertellenERDDAP™, de dataset zal pijnlijk traag inERDDAP™en gebruik maken van tonnen Cassandra middelen.
     
* De clusterkolom specificeren via [&lt;clusterColumnSourceNames&gt;] (#clusterkolombronnamen) is de tweede belangrijkste manier om te helpenERDDAP™efficiënt werken met Cassandra. Als er cluster kolommen en je niet vertellenERDDAP, zal een grote subgroep van de mogelijke vragen voor gegevens onnodig, pijnlijk traag inERDDAP™en gebruik maken van tonnen Cassandra middelen.
     
* Merk[Indexen](https://cassandra.apache.org/doc/latest/cql/indexes.html)voor veelgebruikte variabelen --
U kunt een paar vragen versnellen door indexen te maken voor Cassandra kolommen die vaak beperkt zijn met "=" beperkingen.
    
Cassandra kan geen indexen maken voor lijst, set of map kolommen.
    
* Het specificeren van de index kolommen via [&lt;indexColumbSourceNames&gt;] (#indexkolombronnamen) is een belangrijke manier om te helpenERDDAP™efficiënt werken met Cassandra. Als er index kolommen en je niet vertellenERDDAP, sommige vragen voor gegevens zal onnodig, pijnlijk traag inERDDAP™en gebruik maken van tonnen Cassandra middelen.
     
#### Cassandra Stats{#cassandra-stats} 
*   [Kenmerkende berichten "Cassandra statistieken"](#cassandra-stats)-- Voor elkeERDDAP™gebruikersquery naar een Cassandra dataset;ERDDAP™zal een regel afdrukken in het logbestand, *bigParentDirectory* /logs/log.txt, met enkele statistieken met betrekking tot de query, bijvoorbeeld,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Met behulp van de getallen in het voorbeeld hierboven betekent dit:

* WanneerERDDAP™laatste (re) geladen deze dataset, Cassandra verteldeERDDAP™dat er 10000 verschillende combinaties van de partitietoetsen waren.ERDDAP™alle verschillende combinaties in een bestand gecached.
* Vanwege de beperkingen van de gebruiker,ERDDAP™2 combinaties van de 10000 geïdentificeerd die de gewenste gegevens zouden kunnen hebben. Dus,ERDDAP™zal 2 oproepen naar Cassandra, een voor elke combinatie van de partitiesleutels. (Dat is wat Cassandra nodig heeft.) Het is duidelijk lastig als een grote dataset een groot aantal combinaties van de partitietoetsen heeft en een gegeven verzoek dat niet drastisch vermindert. U kunt eisen dat elke aanvraag de sleutelruimte vermindert door [&lt;maxRequestFraction&gt;] (#maxrequestfractie) . Hier, 2/10000=2e-4, wat lager is dan de maxRequestFraction (0,1) , dus het verzoek was toegestaan.
* Na het toepassen van de beperkingen op de partitietoetsen,[cluster kolommen](#clustercolumnsourcenames)en[index kolommen](#indexcolumnsourcenames)die doorERDDAP™, Cassandra gaf 1200 rijen gegevens aanERDDAP™in de ResultSet.
* Het resultaat De set moet[gegevens Type= *sometype* Lijst](#cassandra-datatypes)Kolommen (met gemiddeld 10 items per lijst) , omdatERDDAP™breidde de 1200 rijen van Cassandra uit tot 12000 rijen inERDDAP.
*   ERDDAP™past altijd alle beperkingen van de gebruiker toe op de gegevens van Cassandra. In dit geval hebben beperkingen die Cassandra niet had behandeld het aantal rijen teruggebracht tot 7405. Dat is het aantal rijen dat naar de gebruiker wordt gestuurd.

Het belangrijkste gebruik van deze diagnostische berichten is om ervoor te zorgen datERDDAP™Doet wat je denkt dat het doet. Zo niet. (bijvoorbeeld, vermindert het niet het aantal verschillende combinaties zoals verwacht?) Dan kun je de informatie gebruiken om uit te zoeken wat er mis gaat.
 
* Onderzoek en experiment om beter te vinden en vast te stellen [&lt;verbindingEigenschap&gt;] (#cassandra-connectieeigendom) 's.
 
* Controleer de snelheid van de netwerkverbinding tussen Cassandra enERDDAP. Als de verbinding traag is, kijk of je het kunt verbeteren. De beste situatie is wanneerERDDAP™draait op een server die aan dezelfde server is gekoppeld (snel) schakel als de server die de Cassandra node waarmee u verbinding maakt.
 
* Wees geduldig. Lees de informatie hier en in de Cassandra documentatie zorgvuldig. Experiment. Controleer je werk. Als de Cassandra-ERDDAP™verbinding is nog steeds langzamer dan je verwacht, gelieve uw Cassandra tafel schema en uwERDDAP™brok vandatasets.xmlen zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
 
* Als al het andere faalt,
overwegen om de gegevens op te slaan in een verzameling vanNetCDFv3.ncbestanden (vooral.ncbestanden die de[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contigueuze Ragged Array data structuren en dus kan worden behandeld metERDDAP's[EDDtabelVanNcCFFiles](#eddtablefromnccffiles)) . Als ze logisch georganiseerd zijn (elk met data voor een stuk ruimte en tijd) ,ERDDAP™kan gegevens uit hen zeer snel halen.
         
#### EDDTableFromCassandra skelet XML{#eddtablefromcassandra-skeleton-xml} 
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

### EDDtabelVanDapSequence{#eddtablefromdapsequence} 
[ **EDDtabelVanDapSequence** ](#eddtablefromdapsequence)behandelt variabelen binnen 1- en 2-niveau sequenties van[DAP](https://www.opendap.org/)servers zoalsDAPPER (was op https://www.pmel.noaa.gov/epic/software/dapper/ , nu stopgezet) .

* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen. U kunt de informatie die u nodig hebt te verzamelen door te kijken naar de bron dataset DDS en DAS bestanden in uw browser (door het toevoegen van .das en .dds aan desourceUrl(een voorbeeld was: https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* Een variabele is in aDAPsequentie als de .dds respons aangeeft dat de gegevensstructuur die de variabele vasthoudt een "reeks" is (hoofdletter ongevoelig) .
* In sommige gevallen zie je een volgorde binnen een reeks, een 2-level sequentie -- EDDTableFromDapSequence behandelt deze ook.
#### EDDTabelVanDapSequence skelet XML{#eddtablefromdapsequence-skeleton-xml} 
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
[ **EDDTableFromDatabase** ](#eddtablefromdatabase)verwerkt gegevens uit één relationele databasetabel of[weergave](https://en.wikipedia.org/wiki/View_(database)).

#### Een tabel of weergave{#one-table-or-view} 
Als de gegevens die u wilt dienen in twee of meer tabellen staan (en dus een JOIN nodig heeft om gegevens uit beide tabellen tegelijk te halen) Je moet er een maken.[gedenormaliseerd](https://en.wikipedia.org/wiki/Denormalization)  (reeds verbonden) tabel of[weergave](https://en.wikipedia.org/wiki/View_(SQL)) met alle gegevens die u beschikbaar wilt stellen als één dataset inERDDAP.

Voor grote, complexe databases, kan het zinvol zijn om verschillende brokken te scheiden als gedenormaliseerde tabellen, elk met een ander type gegevens, die aparte datasets inERDDAP.

Een gedenormaliseerde tabel maken voor gebruik inERDDAP™Het klinkt misschien als een gek idee. Vertrouw ons alsjeblieft. Er zijn verschillende redenen waaromERDDAP™werkt met gedenormaliseerde tabellen:

* Het is makkelijker voor gebruikers.
WanneerERDDAP™presenteert de dataset als één, eenvoudig, gedenormaliseerd, enkele tabel, het is zeer gemakkelijk voor iedereen om de gegevens te begrijpen. De meeste gebruikers hebben nog nooit gehoord van genormaliseerde tabellen, en zeer weinigen begrijpen sleutels, buitenlandse sleutels, of tabel joins, en ze bijna zeker niet weten de details van de verschillende soorten joins, of hoe de SQL om een join doen (of meerdere joins) Juist. Het gebruik van een gedenormaliseerde tabel voorkomt al die problemen. Deze reden alleen al rechtvaardigt het gebruik van een gedenormaliseerde enkele tabel voor de presentatie van een dataset aanERDDAP™gebruikers.
     
* Genormaliseerde tabellen (Meerdere tabellen per kolommen) zijn geweldig voor het opslaan van gegevens in een database.
Maar zelfs in SQL, het resultaat dat wordt teruggegeven aan de gebruiker is een gedenormaliseerd (verbonden) enkele tafel. Dus het lijkt redelijk om de dataset aan gebruikers te presenteren als een enorme, gedenormaliseerde, enkele tabel waaruit ze vervolgens subsets kunnen aanvragen (Bijvoorbeeld, toon me rijen van de tabel waar temperatuur&gt; 30) .
     
* U kunt wijzigingen aanbrengen voorERDDAP™zonder van tafel te veranderen.
    ERDDAP™heeft een paar eisen die kunnen verschillen van hoe u uw database hebt opgezet.
Bijvoorbeeld,ERDDAP™vereist dat tijdstempelgegevens worden opgeslagen in 'tijdstempel met tijdzone' velden.
Door een aparte tabel/weergave te maken voorERDDAP™, kunt u deze wijzigingen maken wanneer u de gedenormaliseerde tabel voorERDDAP. U hoeft dus geen wijzigingen aan uw tafels aan te brengen.
     
*   ERDDAP™zal een deel van de structuur van de genormaliseerde tabellen opnieuw creëren.
U kunt aangeven welke kolommen gegevens afkomstig zijn uit de 'outer' tabellen en daarom een beperkt aantal verschillende waarden hebben.ERDDAP™zal verzamelen alle verschillende combinaties van waarden in deze kolommen en presenteren aan gebruikers op een speciale . Subset webpagina die gebruikers helpt snel subsets van de dataset te selecteren. De verschillende waarden voor elke kolom worden ook weergegeven in drop-down lijsten op de andere webpagina's van de dataset.
     
* Een gedenormaliseerde tabel maakt de gegevens van u naar deERDDAPBeheerder gemakkelijk.
Je bent de expert voor deze dataset, dus het is logisch dat je de beslissingen maakt over welke tabellen en welke kolommen je mee moet doen en hoe je ze moet aansluiten. Dus je hoeft ons niet te geven. (of erger, de eindgebruikers) verschillende tabellen en gedetailleerde instructies voor hoe je ze kunt vergezellen, je hoeft ons alleen maar toegang te geven tot de gedenormaliseerde tabel.
     
* Een gedenormaliseerde tabel zorgt voor efficiënte toegang tot de gegevens.
De gedenormaliseerde vorm is meestal sneller toegankelijk dan de genormaliseerde vorm. Joints kunnen traag zijn. Meerdere aansluitingen kunnen erg traag zijn.
     

Om de gegevens van twee of meer tabellen in de database te krijgenERDDAP™Er zijn drie opties:
 

* Aanbevolen optie:
U kunt een komma- of tab-gescheiden-waarde bestand maken met de gegevens uit de gedenormaliseerde tabel.
Als de dataset enorm is, dan is het zinvol om meerdere bestanden te maken, elk met een samenhangende subset van de gedenormaliseerde tabel (bijvoorbeeld gegevens uit een kleiner tijdbereik) .
    
Het grote voordeel hier is datERDDAP™zal in staat zijn om verzoeken van gebruikers om gegevens te behandelen zonder verdere inspanning door uw database. Dus.ERDDAP™Het zal geen last zijn voor uw database of een veiligheidsrisico. Dit is de beste optie onder bijna alle omstandigheden omdatERDDAP™kan meestal gegevens van bestanden sneller dan uit een database (als we de .csv bestanden converteren naar.ncCF-bestanden) . (Een deel van de reden is datERDDAP+files is een alleen-lezen systeem en hoeft niet om te gaan met het maken van wijzigingen tijdens het verstrekken[ZUUR](https://en.wikipedia.org/wiki/ACID)  (Atoomvermogen, consistentie, isolatie, duurzaamheid) .) Ook heb je waarschijnlijk geen aparte server nodig omdat we de gegevens op een van onze RAID's kunnen opslaan en toegang kunnen krijgen met een bestaandeERDDAP™op een bestaande server.
    
* Optie:
Je zet een nieuwe database op een andere computer met alleen de gedenormaliseerde tabel.
Aangezien die database een gratis en open source database zoals MariaDB, MySQL en PostgreSQL kan zijn, hoeft deze optie niet veel te kosten.
    
Het grote voordeel hier is datERDDAP™zal in staat zijn om gebruikers verzoeken voor gegevens te behandelen zonder verdere inspanning door uw huidige database. Dus.ERDDAP™Dat is geen last voor je huidige database. Dit elimineert ook veel veiligheidsproblemen sindsERDDAP™heeft geen toegang tot uw huidige database.
    
* Ontmoedigde optie:
We kunnen verbinding maken.ERDDAP™naar uw huidige database.
Om dit te doen, moet je:
    
    * Maak een aparte tabel of weergave met de gedenormaliseerde tabel van gegevens.
    * Maak een "erdap" gebruiker met alleen-lezen toegang tot alleen de gedenormaliseerde tabel (s) .
         
    
Dit is een optie als de gegevens zeer vaak veranderen en u wilt gevenERDDAP™gebruikers direct toegang tot deze wijzigingen; maar, zelfs zo, kan het zinvol zijn om de bestandsoptie hierboven en periodiek te gebruiken (Elke 30 minuten?) vervangen van het bestand dat de gegevens van vandaag heeft.
De enorme nadelen van deze aanpak zijn datERDDAP™gebruikersverzoeken zal waarschijnlijk een ondraaglijk grote last op uw database en dat deERDDAP™verbinding is een veiligheidsrisico (hoewel we het risico kunnen minimaliseren/beheren) .

Het maken van de gedenormaliseerde tabel of weergave voorERDDAP™is een goede gelegenheid om een paar veranderingen dieERDDAP™behoeften, op een manier die geen invloed heeft op uw originele tafels:

* Verander de datum en tijdstempelvelden/koloms om de dataType dat Postgres aanroept te gebruiken[tijdstempel met tijdzone](#database-date-time-data)  (of het equivalent in uw database) .
Tijdstempels zonder tijdzone-informatie werken niet correct inERDDAP.
* Maak indexen voor de kolommen die gebruikers vaak zoeken.
* Wees zeer bewust van[het geval van het veld/kolomnamen](#quotes-for-names-and-case-sensitivity)  (gebruik bijvoorbeeld alle kleine letters) Als je ze typt.
* Gebruik gereserveerde woorden niet voor de tabel en voor het veld/kolomnamen.

Als u hulp nodig heeft bij het maken van de gedenormaliseerde tabel of weergave, neem dan contact op met uw databasebeheerder.
Als je over deze hele aanpak wilt praten of hoe je het het beste kunt doen, stuur dan een e-mail naar Chris. John at noaa.gov .
    
#### database indatasets.xml {#database-in-datasetsxml} 
Het is moeilijk om de juistedatasets.xmlinformatie nodig voorERDDAP™een verbinding met de databank tot stand te brengen. Wees geduldig. Wees methodisch.
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
        
GenererenDatasets Xml heeft drie speciale opties voor EDDTableFromDatabase:
1. Als je "&#33;&#33;&#33;LIJST&#33;&#33;&#33;" (zonder de citaten) voor de catalogusnaam zal het programma een lijst met de catalogusnamen weergeven.
2. Als je "&#33;&#33;&#33;LIJST&#33;&#33;&#33;" (zonder de citaten) voor de schemanaam zal het programma een lijst met schemanamen weergeven.
3. Als je "&#33;&#33;&#33;LIJST&#33;&#33;&#33;" (zonder de citaten) voor de tabelnaam zal het programma een lijst met tabellen en hun kolommen weergeven. De eerste "&#33;&#33;&#33;LIST&#33;&#33;" vermelding die je maakt is degene die zal worden gebruikt.
* Lees zorgvuldig alle informatie van dit document over EDDTableFromDatabase.
* U kunt de meeste informatie verzamelen die u nodig hebt om de XML voor een EDDTableFromDatabase dataset te maken door contact op te nemen met de databasebeheerder en door het web te zoeken.
* Hoewel databases vaak kolomnamen en tabelnamen op een hoofdletter-ongevoelige manier behandelen, zijn ze hoofdlettergevoelig inERDDAP. Dus als een foutmelding uit de database zegt dat een kolomnaam onbekend is (bijvoorbeeld, "Onbekend identificatienummer= ' *kolom\\_naam* '") Ook al weet je dat het bestaat, probeer alle hoofdletters te gebruiken, bijvoorbeeld, *KOLOM\\_NAME* , wat vaak de ware, hoofdlettergevoelige versie is van de kolomnaam.
* Werk nauw samen met de databasebeheerder, die wellicht relevante ervaring heeft. Als de dataset niet wordt geladen, lees dan de[foutmelding](#troubleshooting-tips)zorgvuldig uitzoeken waarom.
         
#### JDBC stuurprogramma{#jdbc-driver} 
* [JDBC Driver en&lt;stuurprogrammaNaam&gt;] (#jdbc-driver) -- U moet de juiste JDBC 3 of JDBC 4 driver .jar bestand voor uw database en
Stop het erin. *kat* /webapps/erddap/WEB-INF/lib na installatieERDDAP. Dan, in uwdatasets.xmlvoor deze dataset moet u de&lt;stuurprogrammaNaam&gt; voor dit stuurprogramma, dat is (Helaas) verschillend van de bestandsnaam. Zoek op het web naar het JDBC stuurprogramma voor uw database en het stuurprogrammaNaam datJavamoet het gebruiken.
    
    * Voor MariaDB, probeer[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
De&lt;stuurprogrammaName&gt; te gebruiken indatasets.xml  (zie hieronder) is waarschijnlijk org.mariadb.jdbc. Chauffeur.
    * Voor MySQL en Amazon RDS, probeer[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
De&lt;stuurprogrammaName&gt; te gebruiken indatasets.xml  (zie hieronder) is waarschijnlijk com.mysql.jdc. Chauffeur.
    * VoorOracle, probeer[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).
De&lt;stuurprogrammaName&gt; te gebruiken indatasets.xml  (zie hieronder) is waarschijnlijk oracle.jdbc.driver.OracleChauffeur.
    * Voor Postgresql kregen we de JDBC 4 driver van[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
De&lt;stuurprogrammaName&gt; te gebruiken indatasets.xml  (zie hieronder) is waarschijnlijk org.postgresql. Chauffeur.
    * Voor SQL Server, kunt u de JTDS JDBC driver van[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net).
De&lt;stuurprogrammaName&gt; te gebruiken indatasets.xml  (zie hieronder) is waarschijnlijk net.sourceforge.jtds.jdbc. Chauffeur.
    
Nadat u de JDBC driver .jar inERDDAP™lib directory, je moet een verwijzing naar dat .jar bestand toevoegen in de .bat en/of .sh script bestanden voor GenerateDatasets Xml, DasDds, en ArchiveADataset die in de *kat* /webapps/erddap/WEB-INF/ directory; anders krijg je een ClassNotFoundException wanneer je deze scripts uitvoert.
    
Helaas is JDBC soms de oorzaak van problemen. In zijn rol als tussenpersoon tussenERDDAP™en de database, het maakt soms subtiele wijzigingen in de standaard/generische database SQL verzoek datERDDAP™creëert, waardoor problemen (bijvoorbeeld, gerelateerd aan[bovenste/lagere identificatiecode](#quotes-for-names-and-case-sensitivity)en gerelateerd aan[datum/tijd-tijdzones](#database-date-time-data)) . Wees geduldig, lees de informatie hier zorgvuldig, controleer uw werk, en zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
    
#### Database&lt;verbinding Eigenschap&gt;{#database-connectionproperty} 
* [&lt;verbindingEigenschap&gt;] (#database-connectieeigenschappen) -- In dedatasets.xmlvoor uw dataset moet u meerdere verbindingen definiëren Eigenschapstags om te vertellenERDDAP™hoe verbinding te maken met uw database (bijvoorbeeld om de gebruikersnaam, wachtwoord, ssl-verbinding op te geven, en[grootte ophalen](#set-the-fetch-size)) . Deze zijn verschillend voor elke situatie en zijn een beetje moeilijk te achterhalen. Zoek op het web naar voorbeelden van het gebruik van een JDBC driver om verbinding te maken met uw database. De&lt;verbindingEigenschap&gt; namen (bijvoorbeeld "gebruiker," "wachtwoord" en "ssl") , en sommige van de connectieEigenschappenwaarden kunnen gevonden worden door op het web te zoeken naar "JDBC verbindingseigenschappen *database Type* " (bijvoorbeeld,Oracle, MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Citaten voor Namen en Gevoeligheid{#quotes-for-names-and-case-sensitivity} 
*   [Quotes voor veld-/kolomnamen; geval gevoeligheid](#quotes-for-names-and-case-sensitivity)- Standaard zet EDDTableFromDatabase ANSI-SQL-standaard dubbele aanhalingstekens rond veld/kolomnamen in SELECT statements in het geval u een gereserveerd woord als veld/kolomnaam hebt gebruikt, of een speciaal teken in een veld/kolomnaam. De dubbele citaten dwarsbomen ook bepaalde soorten SQL-injectieaanvallen. Je kunt zienERDDAP™te gebruiken ", ', of geen citaten via&lt;kolomNaamCitaten&gt; indatasets.xmlvoor deze dataset.
    
Voor veel databases, het gebruik van elk type citaten zorgt ervoor dat de database werkt met veld/kolom namen op een case gevoelige manier (in plaats van de standaard database hoofdletter ongevoelige manier) . Databanken tonen vaak bestands-/kolomnamen als alle hoofdletters, wanneer in werkelijkheid de hoofdlettergevoelige vorm anders is. InERDDAP™Beschouw de naam van de kolom van de database als hoofdlettergevoelig.
    
    * Voor Maria DB, je moet de database draaien met[\\--sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/).
    * Voor MySQL en Amazon RDS moet je de database draaien met[\\--sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes).
    *   Oracleondersteunt ANSI-SQL-standaard dubbele citaten[standaard](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    * PostgreSQL ondersteunt ANSI-SQL-standaard dubbele citaten standaard.
    
      
Gebruik geen gereserveerd woord voor een database, catalogus, schema of tabelnaam.ERDDAP™Hij zet geen citaten om hen heen.
    
Gebruik indien mogelijk alle kleine letters voor database, catalogus, schema, tabelnamen en veldnamen bij het aanmaken van de databasetabel (of weergave) en bij verwijzing naar het veld/kolom namen indatasets.xmlinERDDAP. Anders krijg je een foutmelding waarin staat dat de database, catalogus, schema, tabel en/of veld niet gevonden is. Als je die foutmelding krijgt, probeer dan de hoofdlettergevoelige versie, de alle hoofdletters versie en de alle kleine letters versie van de naam inERDDAP. Een van hen kan werken. Zo niet, dan moet je de naam van database, catalogus, schema en/of tabel veranderen naar alle kleine letters.
    
#### Database&lt;gegevens Type &gt;{#database-datatype} 
*   [Database](#database-datatype)[&lt;dataType&gt;] (#datatype) Tags -- Want er is enige dubbelzinnigheid over welke[databasegegevenstypes](https://www.w3schools.com/sql/sql_datatypes_general.asp)kaart waaropERDDAP™gegevenstypen, moet u een [ specificeren&lt;dataType&gt;] (#datatype) tag voor elk [&lt;dataVariable&gt;] (#datavariabele) om te vertellenERDDAP™welke dataType te gebruiken. Een deel van het probleem is dat verschillende datasets verschillende termen gebruiken voor de verschillende datatypes -- dus probeer altijd de definities te halen, niet alleen de namen. Zie de beschrijving van de[standaardERDDAP™gegevens Typen](#data-types), met verwijzingen naar de overeenkomstige SQL-gegevenstypen.[Datum en tijdstip](#database-date-time-data)zijn speciale gevallen: gebruikERDDAP's double data Type.
     
#### Database Datum Tijd Gegevens{#database-date-time-data} 
Sommige data date kolommen hebben geen expliciete tijdzone. Dergelijke kolommen zijn problemen voorERDDAP. Databanken ondersteunen het concept van een datum (met of zonder tijd) zonder tijdzone, als een geschatte tijdspanne. MaarJava  (en dusERDDAP) heeft alleen te maken met momentane datum+tijden met een tijdzone. Dus je weet misschien dat de datum tijd data is gebaseerd op een lokale tijdzone (met of zonder lokale tijd) of de GMT/Zulutijdzone, maarJava  (enERDDAP) Niet doen. We dachten dat we dit probleem konden oplossen. (bijvoorbeeld door een tijdzone voor de kolom te specificeren) , maar de database+JDBC+Javainteracties maakte dit een onbetrouwbare oplossing.
* Dus,ERDDAP™vereist dat u alle datum- en datumtijdgegevens opslaat in de databasetabel met een databasegegevenstype dat overeenkomt met het JDBC-type "timestamp with time zone" (ideaal, dat gebruik maakt van de GMT /Zulutijdzone) .
* InERDDAP'sdatasets.xmlIn de&lt;dataVariable&gt; tag voor een tijdstempelvariabele, ingesteld
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

en in&lt;addAttributes&gt; ingesteld
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Suggestie: Als de gegevens een tijdsbereik zijn, is het handig om de tijdstempelwaarden naar het centrum van het impliciete tijdbereik te laten verwijzen. (bijvoorbeeld, middag) . Bijvoorbeeld, als een gebruiker gegevens heeft voor 2010-03-26T13:00Z uit een andere dataset en ze willen de dichtstbijzijnde gegevens uit een database dataset die gegevens heeft voor elke dag, dan de database gegevens voor 2010-03-26T12:00Z (die gegevens voor die datum vertegenwoordigen) Is duidelijk de beste (in tegenstelling tot de middernacht voor of na, waar het minder duidelijk is wat het beste is) .
*   ERDDAP™heeft een hulpprogramma om[Een numeriek omzetten Tijd van/naar een tekenreekstijd](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Zie[HoeERDDAPOmgaan met tijd](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
       
#### Integer nulls{#integer-nulls-1} 
Databanken ondersteunen nulls in geheel getal (int, smallint, kleintje) kolommen, maarERDDAP™ondersteunt geen echte nulpunten.
Database nulls zal worden omgezet inERDDAP™127 voor byte kolommen, 255 voor ubyte kolommen, 32767 voor korte kolommen, 65535 voor ukorte kolommen, 2147483647 voor int kolommen, 4294967295 voor uint kolommen, 9,223,372,036,854,775.807 voor lange kolommen, of 18446744073709551615 voor langwerpige kolommen. Als u deze standaard gebruikt, identificeer dezemissing\\_values voor gebruikers van de dataset inERDDAP™met

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

of

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Als alternatief kunt u de "missing\\_value" attribuut in plaats van "\\_FillValue."
GenererenDatasets Xml voegt automatisch deze \\_FillValue-attributen toe wanneer het de voorgesteldedatasets.xmlvoor databasedatasets.

Voor database drijvende punt kolommen, nulls worden omgezet naar NaNs inERDDAP.
Voor database data types die worden omgezet naar Strings inERDDAP™, nulls worden omgezet in lege Strings.
    
#### Databasebeveiliging{#database-security} 
* Bij het werken met databases, moet je dingen zo veilig en veilig mogelijk te doen om te voorkomen dat een kwaadaardige gebruiker om uw database te beschadigen of toegang te krijgen tot gegevens waar ze geen toegang tot zouden moeten hebben.ERDDAP™probeert ook dingen op een veilige manier te doen.
    * Overweeg repliceren, op een andere computer, de database en database tabellen met de gegevens die u wiltERDDAP™Om te dienen. (Ja, voor commerciële databases zoalsOracle, dit houdt extra licentiekosten in. Maar voor open source databases, zoals PostgreSQL, MySQL, Amazon RDS en MariaDB, kost dit niets.) Dit geeft u een hoog niveau van beveiliging en voorkomtERDDAP™verzoeken om vertraging van de oorspronkelijke database.
    * Wij moedigen u aan om op te zettenERDDAP™om te verbinden met de database als een database gebruiker die alleen toegang heeft tot de **relevant** database (s) en heeft alleen READ privileges.
    * Wij moedigen u aan om de verbinding vanERDDAP™naar de database zodat het
        * gebruikt SSL altijd,
        * staat alleen verbindingen toe vanaf één IP-adres (of één adresblok) en van die eneERDDAP™gebruiker, en
        * alleen wachtwoorden in hun MD5 gehashte vorm.
    *   \\[Bekend probleem\\]De verbindingEigenschappen (inclusief het wachtwoord&#33;) worden opgeslagen als platte tekst indatasets.xml. We hebben geen manier gevonden om de beheerder toe te staan om het database wachtwoord in te voeren tijdensERDDAP's startup in Tomcat (die optreedt zonder gebruikersinvoer) , dus het wachtwoord moet toegankelijk zijn in een bestand. Om dit veiliger te maken:
        * Jij (deERDDAP™beheerder) moet de eigenaar zijn vandatasets.xmlen hebben READ en WRITE toegang.
        * Maak een groep die alleen user=tomcat omvat. Gebruik chgrp om de groep te maken voordatasets.xml, met enkel READ privileges.
        * chmod gebruiken om o-rwx-rechten toe te wijzen (geen toegang tot READ of WRITE voor "andere" gebruikers) voordatasets.xml.
    * WanneerERDDAP™, het wachtwoord en andere verbindingseigenschappen worden opgeslagen in "privé"Javavariabelen.
    * Verzoeken van klanten worden ontleed en gecontroleerd op geldigheid voordat de SQL-verzoeken voor de database worden gegenereerd.
    * Verzoeken naar de database worden gedaan met SQL PreparedStatements, om te voorkomen[SQL injectie](https://en.wikipedia.org/wiki/SQL_injection).
    * Verzoeken naar de database worden met uitvoering ingediend Opvragen (statement niet uitvoeren) om verzoeken om alleen-lezen te beperken (Dus probeerde SQL injectie om de database te veranderen zal om deze reden ook falen) .
         
#### SQL{#sql} 
* OmdatOPeNDAP's tabel gegevens verzoeken werden ontworpen om SQL tabel gegevens verzoeken na te bootsen, het is gemakkelijk voorERDDAP™het omzetten van tabelgegevensverzoeken in eenvoudige SQL PreparedStatements. Zo is er bijvoorbeeld deERDDAP™verzoek
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
zal worden omgezet in de SQL PreparedStatement
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™verzoeken met & onderscheiden () en/of &orderBy ( *variabelen* ) zal DISTICT en/of ORDER door toevoegen *variabelen* naar de SQL voorbereide verklaring. In het algemeen zal dit de respons van de database aanzienlijk vertragen.
ERDDAP™logt de voorbereide verklaring in[log.txt](/docs/server-admin/additional-information#log)als
```
    statement=*thePreparedStatement*  
```
Dit is een tekstrepresentatie van de PreparedStatement, die enigszins kan verschillen van de feitelijke voorbereide verklaring. Bijvoorbeeld, in de PreparedStatement worden tijden op een speciale manier gecodeerd. Maar in de tekstweergave verschijnen ze als ISO 8601 datumtijden.
     
#### Databasesnelheid{#database-speed} 
* Databanken kunnen traag zijn. Er zijn een aantal dingen die je kunt doen:
    * In het algemeen
De aard van SQL is dat vragen zijn[declaratie](https://en.wikipedia.org/wiki/Declarative_programming). Ze geven alleen aan wat de gebruiker wil. Ze bevatten geen specificatie of hints voor hoe de query moet worden behandeld of geoptimaliseerd. Dus er is geen manier voorERDDAP™het genereren van de query op een zodanige manier dat het helpt de database optimaliseren van de query (of op enigerlei wijze specificeert hoe de query moet worden behandeld) . In het algemeen is het aan de databasebeheerder om dingen op te zetten (bijvoorbeeld indexen) om te optimaliseren voor bepaalde soorten vragen.
##### Ophalen instellen{#set-the-fetch-size} 
Databanken geven de gegevens terug naarERDDAP™In stukken. Standaard geven verschillende databases een ander aantal rijen terug in de brokken. Vaak is dit aantal erg klein en dus zeer inefficiënt. Bijvoorbeeld, de standaard voorOracleTien. Lees de JDBC documentatie voor de JDBC driver van uw database om de verbindingseigenschap te vinden om dit te verhogen, en voeg dit toe aan de beschrijving van de dataset indatasets.xml. Bijvoorbeeld,
Gebruik voor MySQL en Amazon RDS
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Voor MariaDB is er momenteel geen manier om de ophaalgrootte te veranderen. Maar het is een gevraagde functie, dus zoek het web om te zien of dit is geïmplementeerd.
VoorOracleGebruik
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Voor PostgreSQL gebruiken
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
maar voel je vrij om het nummer te veranderen. Het getal te groot instellen zal veroorzakenERDDAP™om veel geheugen te gebruiken en meer kans om zonder geheugen te raken.
#### Verbindingseigenschappen{#connectionproperties} 
Elke database heeft andere verbindingseigenschappen die gespecificeerd kunnen worden indatasets.xml. Veel van deze zullen de prestaties van de database beïnvloedenERDDAP™verbinding. Lees de documentatie voor de JDBC-driver van uw database om de opties te zien. Als u verbinding eigenschappen die nuttig zijn, stuur dan een e-mail met de details naarerd dot data at noaa dot gov.
* Maak een tafel...
U krijgt waarschijnlijk snellere reacties als u periodiek (Elke dag? wanneer er nieuwe gegevens zijn?) een werkelijke tabel genereren (vergelijkbaar met hoe u het VIEW gegenereerd) en vertellenERDDAP™om gegevens uit de tabel te krijgen in plaats van het VIEW. Aangezien elk verzoek aan de tabel dan kan worden voldaan zonder JOINing een andere tabel, zal het antwoord veel sneller.
* Vacuüm de tabel -
MySQL en Amazon RDS zullen veel sneller reageren als u gebruik[OPTIMIZE TABEL](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).
Maria DB zal veel sneller reageren als u[OPTIMIZE TABEL](https://mariadb.com/kb/en/optimize-table/).
PostgreSQL zal veel sneller reageren als u[VACUUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)De tafel.
    Oracleheeft geen analoog commando nodig.
* Merk[Indexen](https://en.wikipedia.org/wiki/Database_index)voor veelgebruikte variabelen --
U kunt veel/meeste vragen versnellen door indexen aan te maken in de database voor de variabelen (welke databases "koloms" noemen) die vaak beperkt zijn in de vraag van de gebruiker. In het algemeen zijn dit dezelfde variabelen die door [&lt;subsetVariables&gt;] (#subsetvariabelen) en/of de breedte-, lengte- en tijdvariabelen.
##### Verbindingspooling gebruiken{#use-connection-pooling} 
Normaal gesproken,ERDDAP™maakt voor elk verzoek een aparte verbinding met de database. Dit is de meest betrouwbare aanpak. Het snellere alternatief is het gebruik van een DataSource die verbinding pooling ondersteunt. Om het op te zetten, specificeren (bijvoorbeeld)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
naast&lt;sourceUrl&gt;,&lt;stuurprogrammanaam&gt;, en&lt;verbinding Eigendom&gt;.
En in *kat* /conf/context.xml, definieer een bron met dezelfde informatie, bijvoorbeeld,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Algemene informatie over het gebruik van een DataSource is op[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).
Zie[Tomcat DataBroninformatie](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)en[Tomcat DataBron voorbeelden](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)of zoek op het web naar voorbeelden van het gebruik van DataSources met andere applicatieservers.
* Als al het andere faalt,
overwegen om de gegevens op te slaan in een verzameling vanNetCDFv3.ncbestanden (vooral.ncbestanden die de[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contigueuze Ragged Array data structuren en dus kan worden behandeld metERDDAP's[EDDtabelVanNcCFFiles](#eddtablefromnccffiles)) . Als ze logisch georganiseerd zijn (elk met data voor een stuk ruimte en tijd) ,ERDDAP™kan gegevens uit hen zeer snel halen.
         
#### EDDTabelVanuitdatabaseskelet XML{#eddtablefromdatabase-skeleton-xml} 
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

### EDDTabelVanEDDGrid {#eddtablefromeddgrid} 
[ **EDDTabelVanEDDGrid** ](#eddtablefromeddgrid)kunt u een EDDTable dataset van elkeEDDGriddataset.

* Enkele gemeenschappelijke redenen hiervoor zijn:
    * Dit maakt het mogelijk om de dataset te vragen metOPeNDAPselectiebeperkingen, een soort "query by value" (die een gebruiker kan hebben aangevraagd) .
    * De dataset is inherent een tabelset.
* De waarde van het globale kenmerk "maxAxis0" (meestal type="int") , (de standaard is 10) zal worden gebruikt om het aantal assen te beperken\\[0\\]  (ist"time"as) waarden van de bijgevoegdeEDDGriddataset die toegankelijk is per verzoek voor gegevens. Als u geen limiet wilt, geef dan een waarde van 0. Deze instelling is belangrijk omdat het anders te gemakkelijk zou zijn voor een gebruiker om EDDTableFrom te vragenEDDGridom alle gegevens van de gerasterde dataset te bekijken. Dat zou een lange tijd duren en zou vrijwel zeker mislukken met een timeout fout. Dit is de instelling die het veilig maakt om EDDTableVanEDDGriddatasets in uwERDDAPzonder bang te zijn dat ze zullen leiden tot een onredelijk gebruik van computermiddelen.
* Indien deEDDGridis een[EDDGridVanErdap](#eddfromerddap)en deERDDAP™is hetzelfdeERDDAP, dan EDDTableVanEDDGridzal altijd de momenteel beschikbare versie van de referentiedataset direct gebruiken. Dit is een zeer efficiënte manier voor EDDTableVanEDDGridtoegang tot de gerasterde gegevens.
* Deze klas is [&lt;herladen EveryNminutes&gt;] (#reloadeverynminutes) Dat is wat telt. De geslotenEDDGrid's&lt;herladenEveryNMinutes&gt; wordt genegeerd.
* Indien een waarde voor [&lt;updateEveryNMillis&gt;] (#Updateeveryenmillis) wordt geleverd voor deze dataset, wordt genegeerd. De geslotenEDDGrid's&lt;updateEveryNMillis&gt; is wat telt.
*   [GenererenDatasetsXml](#generatedatasetsxml)heeft een optie voor dataset type=EDDtableVanEDDGriddie vraagt om de URL van eenERDDAP  (meestal hetzelfdeERDDAP)   (eindigend in "/erdap/") en een reguliere expressie. GenererenDatasets Xml zal dan de XML genereren voor een EDDTableFromEDDGriddataset voor elke gerasterde dataset in deERDDAP™die eendatasetIDdie overeenkomt met de reguliere expressie (.\\* gebruiken om alles te vergelijkendatasetIDs voor gerasterde datasets) .
    
De brok XML die wordt gegenereerd door GenerateDatasetsXml voor elke dataset bevat:
    
    * AdatasetIDdat is deEDDGrid'sdatasetIDplus "\\_AsAtable."
    * Een nieuwe algemene samenvatting die deEDDGrid's samenvatting plus een nieuwe eerste alinea die beschrijft wat deze dataset is.
    * Een nieuwe algemene titel die deEDDGridde titel plus "; (Als tabel) "
    * Een nieuwe maxAxis0 global attribuut met een waarde van 10.
#### EDDTabelVanEDDGridskelet XML{#eddtablefromeddgrid-skeleton-xml} 
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

### EDDtableFromFileNames{#eddtablefromfilenames} 
[ **EDDtableFromFileNames** ](#eddtablefromfilenames)maakt een dataset aan van informatie over een groep bestanden in het bestandssysteem van de server, inclusief een URL voor elk bestand zodat gebruikers de bestanden kunnen downloaden viaERDDAP's["files"systeem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). In tegenstelling tot alle[EDDTableFromFiles](#eddtablefromfiles)subklassen, dit datasettype dient geen gegevens uit de bestanden.

* EDDTableFromFileNames is handig wanneer:
    * U hebt een groep bestanden die u wilt verspreiden als hele bestanden omdat ze geen "gegevens" bevatten op dezelfde manier als reguliere gegevensbestanden gegevens hebben. Bijvoorbeeld beeldbestanden, videobestanden, Word-documenten, Excel-spreadsheetbestanden, PowerPoint-presentatiebestanden of tekstbestanden met ongestructureerde tekst.
    * U hebt een groep bestanden die gegevens in een formaat datERDDAP™Ik kan nog niet lezen. Bijvoorbeeld een projectspecifiek, gebruikelijk, binair formaat.
         
#### EDDtableFromFileNames Data{#eddtablefromfilenames-data} 
*   [De gegevens in een EDDTableFromFileNames dataset](#eddtablefromfilenames-data)is een tafel dieERDDAP™maakt on-the-fly met informatie over een groep lokale bestanden. In de tabel staat een rij voor elk bestand. Vier bijzondere kenmerken in de[datasets.xmlvoor deze dataset](#eddtablefromfilenames-skeleton-xml)bepalen welke bestanden in deze dataset worden opgenomen:
    
##### bestand Dir{#filedir} 
    *   &lt;fileDir&gt; -- Dit specificeert de bronmap in het bestandssysteem van de server met de bestanden voor deze dataset. De bestanden die zich in het bestandssysteem van de server bevinden&lt;fileDir&gt; verschijnt in de url-kolom van deze dataset in een virtuele map genaamd https://*serverUrl*/erddap/files/*datasetID/* .
Bijvoorbeeld, als dedatasetIDis jplMURSST,
en de&lt;bestandDir&gt; is /home/data/mur/ ,
en die map heeft een bestand met de naam jplMURSST20150103000000.png,
dan de URL die zal worden getoond aan gebruikers voor dat bestand zal zijn
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
Naast het gebruik van een lokale directory voor de&lt;fileDir&gt;, u kunt ook de URL van een externe, directory-achtige webpagina opgeven. Dit werkt met:
        
        * Niet-geaggregeerde datasets in THredDS, bv.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Deze server is niet meer betrouwbaar beschikbaar.\\]
        * Niet-geaggregeerde datasets inHyrax, bijvoorbeeld,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * De meeste Apache-achtige directory lijsten, bijvoorbeeld,
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### vanOnTheFly{#fromonthefly} 
[\\*\\*\\*vanOnTheFly](#fromonthefly)-- Voor enkele enorme S3 emmers (zoals noaa-goes17, die 26 miljoen bestanden heeft) , het kan durenERDDAP™tot 12 uur om alle informatie over de inhoud van de emmer te downloaden (en dan zijn er nog andere problemen) . Om dit te omzeilen, is er een speciale manier om te gebruiken&lt;fileDir&gt; in EDDTableFromFileNames om een dataset te maken met de map en bestandsnamen van een AWS S3-emmer. De dataset zal niet de lijst hebben van alle mappen en bestandsnamen van de S3 bucket die een gebruiker via verzoeken naar de dataset kan zoeken. Maar de dataset zal de namen van mappen en bestanden on-the-fly krijgen als de gebruiker de maphiërarchie doorkruist met de dataset"files"optie. Dit stelt gebruikers in staat om de bestandshiërarchie en bestanden van de S3-emmer te bekijken via de dataset"files"systeem. Om dit te doen, in plaats van het specificeren van de URL voor de S3 emmer als de "Start directory" (in GenererenDatasets Xml) of&lt;fileDir&gt; (indatasets.xml) Gebruik:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
bijvoorbeeld:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Zie de documentatie voor[werken met S3 Emmers inERDDAP™](#working-with-aws-s3-files), met name de beschrijving van het specifieke formaat dat moet worden gebruikt voor S3-emmer URL. En zie
[deze details en een voorbeeld](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)gebruik\\*\\*\\*vanOnTheFly.
        
##### recursief{#recursive} 
*   &lt;recursief&gt; -- Bestanden in submappen van&lt;fileDir&gt; met namen die overeenkomen&lt;bestandRegex&gt; verschijnt in dezelfde submappen in de"files"URL-adres&lt;recursief&gt; is ingesteld op waar. De standaard is onjuist.
* [&lt;padRegex&gt;] (#pathredex) -- Indien recursief=true, alleen mapnamen die overeenkomen met het padRegex (standaard=".\\*") zal worden aanvaard. Als recursief=vals wordt dit genegeerd. Dit wordt zelden gebruikt, maar kan zeer nuttig zijn in ongebruikelijke omstandigheden. (Zie dit[regex documentatie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)en[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
##### bestandRegex{#fileregex} 
*   &lt;bestandRegex&gt; -- Alleen de bestandsnamen waar de hele bestandsnaam (exclusief de mapnaam) komt overeen met de&lt;fileRegex&gt; zal in deze dataset worden opgenomen. Bijvoorbeeld, jplMURSST.&#123;14&#125;\\.png . (Zie dit[regex documentatie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)en[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
         
##### Uit Bestandsnamen Gegevenstabel Inhoud{#from-file-names-data-table-contents} 
In de tabel staan kolommen met:
* Url... De URL die gebruikers kunnen gebruiken om het bestand te downloaden viaERDDAP's["files"systeem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
* naam -- Naam van het bestand (zonder mapnaam) .
* lastModified -- De tijd dat het bestand voor het laatst is gewijzigd (opgeslagen als dubbelen met"seconds since 1970-01-01T00:00:00Z") . Deze variabele is handig omdat gebruikers kunnen zien of/wanneer de inhoud van een bepaald bestand voor het laatst is gewijzigd. Deze variabele is a[tijd Stempelvariabele](#timestamp-variables), zodat de gegevens kunnen verschijnen als numerieke waarden (seconden sinds 1970-01-01T00:00:00Z) of een tekenreekswaarde (ISO 8601:2004 (E) formaat) , afhankelijk van de situatie.
* grootte -- De grootte van het bestand in bytes, opgeslagen als dubbel. Ze worden opgeslagen als dubbel omdat sommige bestanden groter kunnen zijn dan ints toestaan en longs worden niet ondersteund in sommige respons bestandstypen. Doubles geeft de exacte grootte, zelfs voor zeer grote bestanden.
* kolommen die door deERDDAP™beheerder met informatie uit de bestandsnaam (bijvoorbeeld, de tijd in verband met de gegevens in het bestand) gebaseerd op twee attributen die u in de metagegevens voor elke extra kolom/dataVariable:
    
    * extractRegex -- Dit is een[reguliere expressie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([handleiding](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) . De gehele regex moet overeenkomen met de hele bestandsnaam (exclusief de mapnaam) . De regex moet ten minste één vangstgroep bevatten (een deel van een reguliere expressie dat door haakjes wordt omsloten) dieERDDAP™gebruikt om te bepalen welke sectie van de bestandsnaam uit te pakken om gegevens te worden.
    * extract Groep -- Dit is het nummer van de opnamegroep (#1 is de eerste vangstgroep) in de reguliere expressie. De standaard is 1. Een capture groep is een deel van een reguliere expressie dat wordt omsloten door haakjes.
    
Hier zijn twee voorbeelden:
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
In het geval van de tijdvariabele, als een bestand de naam jplMU heeftRSST20150103000000.png, het extractRegex zal overeenkomen met de bestandsnaam, extraheren de tekens die overeenkomen met de eerste opname groep ("20150103000000") als dataType=String, gebruik dan de[eenheden geschikt voor tekenreekstijden](#string-time-units)om de tekenreeksen in tijddatawaarden te verwerken (2015-01-03T00:00:00Z) .

In het geval van de dagvariabele, als een bestand de naam jplMU heeftRSST20150103000000.png, het extractRegex zal overeenkomen met de bestandsnaam, extraheren de tekens die overeenkomen met de eerste opname groep ("03") als [&lt;dataType&gt;] (#datatype) \\=int, met een datawaarde van 3.
        
#### Overige informatie{#other-information} 
* Nee [&lt;updateEveryNMillis&gt;] (#Updateeveryenmillis) -- Dit type dataset heeft geen behoefte en kan de&lt;updateEveryNMillis&gt; tag omdat de informatie van EDDTableFromFileNames altijd perfect up-to-date is omdatERDDAP™queries het bestandssysteem om te reageren op elk verzoek om gegevens. Zelfs als er een groot aantal bestanden, deze aanpak moet redelijk goed werken. Een reactie kan traag zijn als er een groot aantal bestanden en de dataset is niet gevraagd voor een tijdje. Maar enkele minuten daarna, het besturingssysteem houdt de informatie in een cache, dus antwoorden moeten zeer snel zijn.
     
* U kunt de[GenererenDatasets Xml-programma](#generatedatasetsxml)om dedatasets.xmlbrok voor dit type dataset. U kunt extra kolommen toevoegen/definieren met informatie uit de bestandsnaam, zoals hierboven weergegeven.
     
#### EDDTableFromFileNames skelet XML{#eddtablefromfilenames-skeleton-xml} 
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
[ **EDDTableFromFiles** ](#eddtablefromfiles)is de superklasse van alle EDDTableVan...Files klassen. U kunt EDDTableFromFiles niet direct gebruiken. Gebruik in plaats daarvan een subklasse van EDDTableFromFiles om het specifieke bestandstype te verwerken:

*   [EDDtabelVanAsciiFiles](#eddtablefromasciifiles)aggregaten gegevens van komma-, tab-, semicolon-, of ruimte gescheiden tabel ASCII-gegevensbestanden.
*   [EDDtableFromAudioFiles](#eddfromaudiofiles)Verzamelt gegevens van een groep lokale audiobestanden.
*   [EDDTabelVan AwsXmlFiles](#eddtablefromawsxmlfiles)aggregaten gegevens van een set van automatische weerstation (AWS) XML-bestanden.
*   [EDDTabelVan ColumbarAsciiFiles](#eddtablefromcolumnarasciifiles)geaggregeerde gegevens van tabel ASCII-gegevensbestanden met kolommen met vaste breedte.
*   [EDDTabelVanHyraxBestanden](#eddtablefromhyraxfiles)  (AFGEGEVEN) geaggregeerde gegevens met verschillende variabelen, elk met gedeelde dimensies (bijvoorbeeld, tijd, hoogte (of diepte) , breedtegraad, lengtegraad) , en bediend door een[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).
*   [EDDTabelVan ongeldige CRAFiles](#eddtablefrominvalidcrafiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .ncbestanden die een specifieke, ongeldige variant van de CF DSG Contiguous Ragged Array gebruiken (CRA) dossiers. HoewelERDDAP™ondersteunt dit bestandstype, het is een ongeldig bestandstype dat niemand zou moeten gebruiken. Groepen die momenteel dit bestandstype gebruiken worden sterk aangemoedigd om te gebruikenERDDAP™om geldige CF DSG CRA bestanden te genereren en te stoppen met het gebruik van deze bestanden.
*   [EDDtabelVanafJsonlCSVFiles](#eddtablefromjsonlcsvfiles)geaggregeerde gegevens van[JSON Lijnen CSV-bestanden](https://jsonlines.org/examples/).
*   [EDDtabelVanMultidimNcFiles](#eddtablefrommultidimncfiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .nc  (of[.ncml](#ncml-files)) bestanden met verschillende variabelen, elk met gedeelde dimensies (bijvoorbeeld, tijd, hoogte (of diepte) , breedtegraad, lengtegraad) .
*   [EDDtabelVanNcFiles](#eddtablefromncfiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .nc  (of[.ncml](#ncml-files)) bestanden met verschillende variabelen, elk met gedeelde dimensies (bijvoorbeeld, tijd, hoogte (of diepte) , breedtegraad, lengtegraad) . Het is prima om dit datasettype te blijven gebruiken voor bestaande datasets, maar voor nieuwe datasets raden we in plaats daarvan EDDTableFromMultidimNcFiles aan.
*   [EDDtabelVanNcCFFiles](#eddtablefromnccffiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .nc  (of[.ncml](#ncml-files)) bestanden die gebruik maken van een van de bestandsformaten die door de[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)conventies. Maar voor bestanden met behulp van een van de multidimensionale CF DSG varianten, gebruik[EDDtabelVanMultidimNcFiles](#eddtablefrommultidimncfiles)In plaats daarvan.
*   [EDDtabelVanNccsvFiles](#eddtablefromnccsvfiles)geaggregeerde gegevens van[NCCSV](/docs/user/nccsv-1.00)ASCII .csv bestanden.
*   [EDDtabelVanParquetFiles](#eddtablefromparquetfiles)verwerkt gegevens van[Parket](https://parquet.apache.org/).
*   [EDDtableFromDreddsFiles](#eddtablefromthreddsfiles)  (AFGEGEVEN) aggregeert gegevens uit bestanden met verschillende variabelen met gedeelde dimensies die door een[THREDDSOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).
*   [EDDTabelVanWFSBestanden](#eddtablefromwfsfiles)  (AFGEGEVEN) maakt een lokale kopie van alle gegevens van eenArcGISKaartserverWFSserver zodat de gegevens dan snel kunnen worden opgeslagen naarERDDAP™gebruikers.

Momenteel worden geen andere bestandstypen ondersteund. Maar het is meestal relatief gemakkelijk om ondersteuning voor andere bestandstypen toe te voegen. Neem contact met ons op als u een verzoek heeft. Of, als uw gegevens is in een oud bestandsformaat dat u zou willen weggaan van, raden wij het omzetten van de bestanden te zijnNetCDFv3.ncbestanden (en vooral.ncbestanden met de[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contigueuze Ragged Array data structuur --ERDDAP™kan gegevens uit hen zeer snel halen) .NetCDFis een breed ondersteund, binair formaat, maakt snelle willekeurige toegang tot de gegevens, en wordt al ondersteund doorERDDAP.

#### FromFiles Details{#fromfiles-details} 
De volgende informatie is van toepassing op alle subklassen van EDDTableFromFiles.
##### Samenvoegen{#aggregation} 
Deze klasse aggregeert gegevens uit lokale bestanden. Elk bestand bevat een (relatief) kleine tabel met gegevens.
    * De resulterende dataset lijkt alsof alle tabellen van het bestand zijn gecombineerd (alle rijen gegevens uit bestand #1, plus alle rijen uit bestand #2, ...) .
    * De bestanden hoeven niet alle opgegeven variabelen te hebben. Als een gegeven bestand geen opgegeven variabele heeft,ERDDAP™zal ontbrekende waarden toevoegen indien nodig.
    * De variabelen in alle bestanden MOETEN dezelfde waarden hebben voor de[add\\_offset](#scale_factor),[missing\\_value](#missing_value),[_Vullen Waarde](#missing_value),[scale\\_factor](#scale_factor)en[eenheden](#units)attributen (indien) .ERDDAP™controles, maar het is een onvolmaakte test -- als er verschillende waarden zijn,ERDDAPweet niet welke correct is en daarom welke bestanden ongeldig zijn. Als dit een probleem is, kunt u[NcML](#ncml-files)of[NCO](#netcdf-operators-nco)om het probleem op te lossen.
         
##### Gecomprimeerde bestanden{#compressed-files} 
De brongegevensbestanden voor alle EDDTableFromFiles subklassen kunnen extern gecomprimeerd worden (bv..tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, of Z) . Zie[Documentatie van extern gecomprimeerde bestanden](#externally-compressed-files).
     
##### Bestandsinformatie{#cached-file-information-1} 
* Wanneer een EDDTableFromFromFiles dataset voor het eerst wordt geladen, leest EDDTableFromFiles informatie uit alle relevante bestanden en maakt tabellen (één rij voor elk bestand) met informatie over elk geldig bestand en elk "slecht" (verschillend of ongeldig) bestand.
    * De tabellen worden ook opgeslagen op schijf, zoalsNetCDFv3.ncbestanden in *bigParentDirectory* /dataset/ *last2CharsOfDatasetID* ' *datasetID* / in bestanden met de naam:
dirtabel.nc  (die een lijst met unieke mapnamen bevat) ,
bestand Tabel.nc  (die de tabel bevat met de gegevens van elk geldig bestand) ,
badFiles.nc  (die de tabel bevat met de gegevens van elk slecht bestand) .
    * De toegang tot een EDDTableFromFiles-dataset versnellen (maar ten koste van meer geheugen) , kunt u gebruiken
[&lt;fileTableInMemory&gt;true&lt;/fileTableInMemory&gt;] (#filetableinmemory)   
om te vertellenERDDAP™een kopie van de bestandsinformatietabellen in het geheugen bewaren.
    * De kopie van de bestandsinformatie tabellen op de schijf is ook nuttig wanneerERDDAP™wordt afgesloten en herstart: het slaat EDDTable op FromFiles moet alle gegevensbestanden opnieuw lezen.
    * Wanneer een dataset wordt herladen,ERDDAP™hoeft alleen de gegevens te lezen in nieuwe bestanden en bestanden die zijn veranderd.
    * Als een bestand een andere structuur heeft dan de andere bestanden (bijvoorbeeld een ander gegevenstype voor een van de variabelen, of een andere waarde voor de "[eenheden](#units)" attribuut) ,ERDDAPvoegt het bestand toe aan de lijst met "slechte" bestanden. Informatie over het probleem met het bestand zal worden geschreven naar de *bigParentDirectory* /logs/log.txt-bestand.
    * Je zou nooit moeten verwijderen of werken met deze bestanden. Een uitzondering is: als je nog steeds wijzigingen aan een dataset aan het maken bentdatasets.xmlsetup, kunt u deze bestanden te verwijderen te forcerenERDDAP™om alle bestanden opnieuw te lezen omdat de bestanden anders gelezen/geinterpreteerd zullen worden. Als je ooit nodig hebt om deze bestanden te verwijderen, kunt u het doen wanneerERDDAP™is aan het rennen. (Stel dan een[vlag](/docs/server-admin/additional-information#set-dataset-flag)om de dataset zo snel mogelijk te herladen.) Echter,ERDDAP™In het algemeen merkt dedatasets.xmlinformatie komt niet overeen met het bestand Tabel informatie en verwijdert de bestandstabellen automatisch.
    * Als u wilt aanmoedigenERDDAP™de opgeslagen gegevensverzamelingsinformatie bijwerken (bijvoorbeeld, als je een aantal bestanden hebt toegevoegd, verwijderd of gewijzigd in de datamap van de dataset) Gebruik de[vlagsysteem](/docs/server-admin/additional-information#flag)te forcerenERDDAP™om de gecachede bestandsinformatie bij te werken.
         
##### Behandeling van verzoeken{#handling-requests-1} 
*   ERDDAP™De aanvragen voor tabelgegevens kunnen beperkingen opleggen aan elke variabele.
    * Wanneer het verzoek van een klant om gegevens wordt verwerkt, kan EDDTableFromFiles snel in de tabel kijken met de geldige bestandsinformatie om te zien welke bestanden relevante gegevens kunnen hebben. Bijvoorbeeld, als elk bronbestand de gegevens voor een vaste locatie boei heeft, kan EDDTableFromFiles zeer efficiënt bepalen welke bestanden gegevens binnen een bepaald lengte- en breedtebereik kunnen hebben.
    * Omdat de geldige bestandsinformatietabel de minimale en maximale waarde van elke variabele voor elk geldig bestand bevat, kan EDDTableFromFiles vaak vrij efficiënt omgaan met andere vragen. Bijvoorbeeld, als sommige boeien geen luchtdruksensor hebben, en een klant gegevens voor airPressure vraagt&#33;=NaN, EDDTableFromFiles kan efficiënt bepalen welke boeien luchtdrukgegevens hebben.
         
##### Bijwerken van de informatie over het gecached bestand{#updating-the-cached-file-information-1} 
Wanneer de dataset opnieuw wordt geladen, wordt de informatie over het gecached bestand bijgewerkt.
    
* De dataset wordt periodiek opnieuw geladen zoals bepaald door de&lt;herlaadEveryNMinutes&gt; in de informatie van de dataset indatasets.xml.
* De dataset wordt zo snel mogelijk opnieuw geladen.ERDDAP™detecteert dat u hebt toegevoegd, verwijderd,[aangeraakt](https://en.wikipedia.org/wiki/Touch_(Unix)) (om het laatste bestand te wijzigen Gewijzigde tijd) , of veranderde een gegevensbestand.
* De dataset wordt zo snel mogelijk opnieuw geladen als u de[vlagsysteem](/docs/server-admin/additional-information#flag).

Wanneer de dataset opnieuw wordt geladen,ERDDAP™vergelijkt de momenteel beschikbare bestanden met de tabel met de gegevens van het cachebestand. Nieuwe bestanden worden gelezen en toegevoegd aan de tabel met geldige bestanden. Bestanden die niet meer bestaan, vallen uit de geldige bestandentabel. Bestanden waar het tijdstempel van het bestand is gewijzigd worden gelezen en hun informatie wordt bijgewerkt. De nieuwe tabellen vervangen de oude tabellen in geheugen en op schijf.
     
##### Slechte bestanden{#bad-files-1} 
De tabel met slechte bestanden en de redenen waarom de bestanden slecht werden verklaard (beschadigd bestand, ontbrekende variabelen, onjuiste aswaarden, enz.) wordt gemaild naar de e-mail Alles Naar e-mailadres (Jij waarschijnlijk.) elke keer dat de dataset wordt herladen. U moet deze bestanden zo snel mogelijk vervangen of repareren.
     
##### Ontbrekende variabelen{#missing-variables-1} 
Als sommige van de bestanden niet hebben sommige van dedataVariables gedefinieerd in de datasetdatasets.xmlDat geeft niet. Wanneer EDDTableFromFiles leest een van die bestanden, het zal doen alsof het bestand had de variabele, maar met alle ontbrekende waarden.
     
##### Dichtbij realtimegegevens{#near-real-time-data} 
* EDDTableFromFiles behandelt verzoeken om zeer recente gegevens als een speciaal geval. Het probleem: Als de bestanden waaruit de dataset bestaat vaak worden bijgewerkt, is het waarschijnlijk dat de dataset niet elke keer wordt bijgewerkt als een bestand wordt gewijzigd. Dus EDDTableFromFiles zal zich niet bewust zijn van de gewijzigde bestanden. (Je zou de[vlagsysteem](/docs/server-admin/additional-information#flag), maar dit kan leiden totERDDAP™de dataset bijna continu opnieuw laden. Dus in de meeste gevallen raden we het niet aan.) In plaats daarvan, EDDTableFromFiles behandelt dit door het volgende systeem: WanneerERDDAP™krijgt een verzoek voor gegevens in de laatste 20 uur (bijvoorbeeld, 8 uur geleden tot Nu) ,ERDDAP™doorzoekt alle bestanden die gegevens hebben in de laatste 20 uur. Dus,ERDDAP™hoeft niet te beschikken over perfect up-to-date gegevens voor alle bestanden om de nieuwste gegevens te vinden. Jullie moeten je nog instellen.&lt;herladen EveryNminutes&gt;] (#reloadeverynminutes) tot een redelijk kleine waarde (bijvoorbeeld, 60) Maar het hoeft niet klein te zijn. (bijvoorbeeld 3) .
     
    *    **Niet aanbevolen** organisatie van bijna-real-time gegevens in de bestanden: Als je bijvoorbeeld een dataset hebt die gegevens voor tal van stations opslaat (of boei, of traject, ...) voor vele jaren, kunt u de bestanden te regelen, zodat, bijvoorbeeld, er is een bestand per station. Maar dan, telkens als er nieuwe gegevens voor een station komen, moet je een groot oud bestand lezen en een groot nieuw bestand schrijven. En wanneerERDDAP™herlaadt de dataset, het merkt dat sommige bestanden zijn gewijzigd, dus het leest die bestanden volledig. Dat is inefficiënt.
         
    *    **Aanbevolen** organisatie van bijna-real-time gegevens in de bestanden: Bewaar de gegevens in brokken, bijvoorbeeld alle gegevens voor één station/buoy/trajectory gedurende één jaar (of één maand) . Dan, als er een nieuwe datum aankomt, alleen het dossier met dit jaar (of maanden) gegevens worden beïnvloed.
        
        * Beste: GebruikNetCDFv3.ncbestanden met een onbeperkte dimensie (tijd) . Vervolgens, om nieuwe gegevens toe te voegen, kunt u gewoon de nieuwe gegevens toevoegen zonder het hele bestand te hoeven lezen en herschrijven. De verandering wordt zeer efficiënt en hoofdzakelijk atomair gemaakt, dus het bestand is nooit inconsistent.
        * Anders: Als u niet/niet kunt gebruiken.ncbestanden met een onbeperkte dimensie (tijd) , dan, als je nodig hebt om nieuwe gegevens toe te voegen, moet je het hele getroffen bestand lezen en herschrijven (Hopelijk klein, want het heeft maar een jaar (of maanden) waarde van gegevens) . Gelukkig, alle bestanden voor voorgaande jaren (maanden) voor dat station blijft ongewijzigd.
        
In beide gevallenERDDAP™herlaadt de dataset, de meeste bestanden zijn ongewijzigd; slechts een paar kleine bestanden zijn veranderd en moeten worden gelezen.
         
##### Mappen{#directories-1} 
De bestanden kunnen in één map staan, of in een map en de submappen ervan (recursief) . Als er een groot aantal bestanden zijn (bijvoorbeeld, &gt; 1.000) , het besturingssysteem (en dus EDDTableFromFiles) zal werken veel efficiënter als u de bestanden op te slaan in een reeks van submappen (één per jaar, of één per maand voor datasets met zeer frequente bestanden) , zodat er nooit een groot aantal bestanden in een bepaalde directory.
     
##### Mappen op afstand en HTTP-bereikverzoeken{#remote-directories-and-http-range-requests-1} 
*    **Mappen op afstand en HTTP-bereikverzoeken**   (AKA Byte Serving, Byte Range Requests) --
    EDDGridFromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles, and EDDTableFromNcCFFiles, kan soms gegevens van.ncbestanden op externe servers en toegankelijk via HTTP als de server ondersteunt[Byte-server](https://en.wikipedia.org/wiki/Byte_serving)via HTTP-bereikverzoeken (het HTTP-mechanisme voor bytedienst) . Dit is mogelijk omdat netcdf-java (dieERDDAP™gebruikt om te lezen.ncbestanden) ondersteunt het lezen van gegevens op afstand.ncbestanden via HTTP bereik verzoeken.
    
     **Doe dit niet&#33;**   
In plaats daarvan, gebruik de [&lt;cacheFromUrl&gt; systeem] (#cachefromurl) .
    
##### CacheFromUrl{#cachefromurl} 
* [ ** &lt;cacheVanUrl&gt; ** ] (#cachefromurl) -
AllesEDDGridFromFiles en alle EDDTableFromFiles datasets ondersteunen een set van tags die vertellenERDDAP™een kopie van alle bestanden van een dataset op afstand downloaden en onderhouden, of een cache van enkele bestanden (Gedownload indien nodig) . **Dit is een ongelooflijk nuttige functie.** 
    * De&lt;cacheVanuitUrl&gt;-tag kunt u een URL opgeven met een lijst van bestanden van een dataset op afstand uit een bestandslijst op afstand.
        
        * Niet-geaggregeerde datasets in THredDS, bv.
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Deze server is niet meer betrouwbaar beschikbaar.\\]
        * Niet-geaggregeerde datasets inHyrax, bijvoorbeeld,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * De meeste Apache-achtige directory lijsten, bijvoorbeeld,
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * S3-emmers, bv.
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
Dit kan echter een AWS-account en meer setup vereisen.
Zie[werken met S3 Emmers inERDDAP™](#working-with-aws-s3-files).
Ook hoef je meestal geen cache te gebruiken VanUrl met bestanden in S3 emmers als de bestanden ASCII-bestanden zijn (bv. .csv) , omdatERDDAP™de gegevens van de emmer rechtstreeks via een stroom kunnen lezen.
        
        ERDDAP™zal deze bestanden kopiëren of opslaan in de dataset&lt;fileDir&gt; map. Als u ondersteuning nodig hebt voor een ander type bestandslijst op afstand (b.v. FTP) Stuur uw verzoek naar Chris. John at noaa.gov .
        
        * De standaard waarde voor de&lt;cacheVanUrl&gt;-tag is null. Als u geen waarde voor de&lt;cacheVanuitUrl&gt;-tag, het kopieer/cache-systeem zal niet gebruikt worden voor deze dataset.
        * Als de dataset&lt;bestandRegex&gt; instelling is iets anders dan .\\*,ERDDAP™zal alleen bestanden downloaden die overeenkomen met het bestandRegex.
        * Als de dataset&lt;recursieve&gt; instelling is waar en de bestanden op afstand bevinden zich in submappen,ERDDAP™zal kijken in externe submappen die overeenkomen met de dataset [&lt;padRegex&gt;] (#pathredex) , maak dezelfde directory structuur lokaal, en plaats de lokale bestanden in dezelfde subdirectories.
        * In GenererenDatasets Xml, indien u een&lt;cacheVanUrl&gt; waarde, Genereren Datasets Xml zal de lokale&lt;fileDir&gt; map en kopieer 1 remote bestand erin. GenererenDatasets Xml zal dan dedatasets.xmlbrok op basis van dat monsterbestand (monster specificeren Bestand=niets) .
        * Als de gegevensbron een remote isERDDAP™Gebruik[EDDGridVanErdap](#eddfromerddap)of[EDDtabelVanErdap](#eddfromerddap)in plaats van&lt;cacheFromUrl&gt;. Op die manier, uw lokaleERDDAP™zal lijken te hebben de dataset, maar zal niet nodig om een van de gegevens lokaal op te slaan. De enige reden om te gebruiken&lt;cacheVanUrl&gt; om gegevens van een remote op te halenERDDAP™is wanneer u een andere reden waarom u een lokale kopie van de gegevensbestanden wilt hebben. In dat geval:
            * Deze dataset zal proberen zich te abonneren op de dataset op de remoteERDDAPzodat wijzigingen in die dataset de vlag van deze dataset zullen noemen Url, waardoor deze lokale dataset de gewijzigde bestanden op afstand opnieuw downloaden en downloaden. Zo zal de lokale dataset zeer snel na wijzigingen in de dataset op afstand up-to-date zijn.
            * Je moet de beheerder van de remote e-mailenERDDAP™Om dedatasets.xmlvoor de dataset op afstand zodat u de dataset kunt maken in uw lokaleERDDAP™lijkt op de dataset in de remoteERDDAP.
        * Als de gegevensbron een remote isERDDAP™, de lokale dataset zal proberen zich te abonneren op de dataset op afstand.
            * Als het abonnement slaagt, wanneer de remoteERDDAPherlaadt en heeft nieuwe gegevens, het zal contact opnemen met de flagURL voor deze dataset, waardoor het de nieuwe en/of gewijzigde gegevensbestanden herladen en downloaden.
            * Als het abonnement mislukt (om welke reden dan ook) of als u er gewoon voor wilt zorgen dat de lokale dataset up-to-date is, kunt u een[vlag](/docs/server-admin/additional-information#flag)voor de lokale dataset, dus het zal herladen, zodat het zal controleren op nieuwe en/of gewijzigde externe gegevensbestanden.
        * Als de databron geen remote isERDDAP: de dataset controleert op nieuwe en/of gewijzigde bestanden op afstand wanneer deze opnieuw geladen worden. Normaal wordt dit gecontroleerd door [&lt;herladen EveryNminutes&gt;] (#reloadeverynminutes) . Maar als je weet wanneer er nieuwe remote bestanden, kunt u een[vlag](/docs/server-admin/additional-information#flag)voor de lokale dataset, dus het zal herladen en controleren op nieuwe en/of gewijzigde externe gegevensbestanden. Als dit routinematig gebeurt op een bepaald tijdstip van de dag (b.v. om 7 uur) , kunt u een cron baan te gebruikencurlom contact op te nemen met de vlag Url voor deze dataset, dus het zal herladen en controleren op nieuwe en/of gewijzigde externe gegevensbestanden.
    * De&lt;cacheSizeGB&gt;-tag specificeert de grootte van de lokale cache. U hoeft dit waarschijnlijk alleen te gebruiken bij het werken met cloud opslag systemen zoals[Amazon S3](https://aws.amazon.com/s3/)dat een algemeen gebruikt opslagsysteem is dat deel uitmaakt van[Amazon Web Services (AWS) ](https://aws.amazon.com/). De standaard is -1.
        * Als de waarde&lt;=0 (bv. de standaardwaarde van -1) ,
            ERDDAP™zal downloaden en onderhouden van een **volledige kopie** van alle bestanden van de dataset op afstand in de dataset&lt;fileDir&gt;.
            * Dit is de instelling die wordt aanbevolen waar mogelijk.
            * Elke keer als de dataset wordt herladen, het vergelijkt de namen, maten, en laatsteGemodificeerde tijden van de remote bestanden en de lokale bestanden, en downloadt alle remote bestanden die nieuw zijn of zijn veranderd.
            * Als een bestand dat op de externe server stond verdwijnt,ERDDAP™zal het bijbehorende lokale bestand niet verwijderen (anders, als er iets tijdelijk mis was met de externe server,ERDDAP™sommige of alle lokale bestanden kunnen verwijderen&#33;) .
            * Met deze instelling zult u meestal instellen&lt;updateEveryNMillis&gt; naar -1, aangezien de dataset zich bewust is van wanneer het nieuwe gegevensbestanden heeft gekopieerd.
        * Als de waarde &gt; is,
            ERDDAP™zal bestanden downloaden van de externe dataset indien nodig naar een lokale **cache** (in de dataset)&lt;fileDir&gt;) met een drempelwaarde van het opgegeven aantal GB.
            * De cache moet groot genoeg zijn om minstens meerdere gegevensbestanden te bevatten.
            * In het algemeen, hoe groter de cache, hoe beter, want het volgende gevraagde gegevensbestand zal waarschijnlijk al in de cache.
            * Caching mag alleen worden gebruikt wanneerERDDAP™draait in een cloud computing server (b.v. een AWS-bereken instantie) en de remote bestanden in een cloudopslagsysteem (bv. AWS S3) .
            * Wanneer de schijfruimte van de lokale bestanden groter is dan de cache Grootte GB,ERDDAP™binnenkort (Misschien niet meteen.) enkele van de gecachede bestanden verwijderen (momenteel, gebaseerd op de minst recent gebruikte (LRU) algoritme) totdat de schijfruimte die door de lokale bestanden wordt gebruikt&lt;0,75\\*cacheSizeGB (de "doelstelling") . Ja, er zijn gevallen waarin LRU zeer slecht presteert -- er is geen perfect algoritme.
            *   ERDDAP™zal nooit proberen een gecached bestand te verwijderen datERDDAP™begon te gebruiken in de laatste 10 seconden. Dit is een onvolmaakt systeem om om te gaan met het cache systeem en het data bestand reader systeem wordt alleen los geïntegreerd. Vanwege deze regel,ERDDAP™kan niet in staat zijn om genoeg bestanden te verwijderen om het doel te bereiken, in welk geval het zal een WAARSCHUWING afdrukken naar het log.txt bestand, en het systeem zal veel tijd verspillen proberen om de cache te snoeien, en het is mogelijk dat de grootte van de bestanden in de cache kan aanzienlijk groter zijn dan de cacheSizeGB. Als dit ooit gebeurt, gebruik dan een grotere cacheSizeGB instelling voor die dataset.
            * Momenteel,ERDDAP™controleert nooit of de externe server een nieuwere versie heeft van een bestand in de lokale cache. Als je deze functie nodig hebt, stuur dan een e-mail naar Chris. John at noaa.gov .
        * Hoewel het gebruik van dezelfde tagnamen zou kunnen impliceren dat het kopieersysteem en het cachesysteem hetzelfde onderliggende systeem gebruiken, is dat niet juist.
            * Het kopieersysteem start proactief taakThread taken om nieuwe en gewijzigde bestanden te downloaden elke keer dat de dataset wordt herladen. Alleen bestanden die daadwerkelijk zijn gekopieerd naar de lokale map zijn beschikbaar via deERDDAP™dataset.
            * Het cache systeem krijgt de remote bestandslijst elke keer als de dataset wordt herladen en doet alsof al die bestanden beschikbaar zijn via deERDDAP™dataset. Interessant is dat alle bestanden op afstand zelfs voorkomen in de /files/webpagina's van de dataset en beschikbaar zijn om te downloaden (Hoewel misschien alleen na een vertraging terwijl het bestand eerst wordt gedownload van de externe server naar de lokale cache.) 
        * Datasets die cache gebruikenSizeGB kan profiteren van het gebruik van een[nThreads](#nthreads)instelling groter dan 1, omdat dit de dataset in staat zal stellen om meer dan 1 extern bestand tegelijk te downloaden.
    * De&lt;cachePartialPathRegex&gt; tag is een zelden gebruikte tag die een alternatief voor de dataset kan opgeven [&lt;padRegex&gt;] (#pathredex) . De standaard is nul.
        * Gebruik dit alleen als u de hele dataset kopieert via de standaard&lt;cacheSizeGB&gt; waarde van -1. met&lt;cacheSizeGB&gt; waarden van &gt;1, dit wordt genegeerd omdat het niet zintuiglijk is.
        * Zie [de documentatie voor&lt;padRegex&gt;] (#pathredex) voor begeleiding bij het construeren van de regex.
        * Als dit wordt opgegeven, zal het elke keer dat de dataset wordt herladen worden gebruikt, behalve de eerste keer dat een dataset wordt herladen aan het begin van een maand.
        * Dit is handig wanneer de dataset op afstand wordt opgeslagen in een labyrint van submappen en wanneer de overgrote meerderheid van die bestanden zelden, of nooit, verandert. (&lt;hoest&gt; NASA&lt;hoest&gt;) Je zou bijvoorbeeld een&lt;cachePartialPathRegex&gt; die gewoon overeenkomt met het huidige jaar of de huidige maand. Deze regexes zijn erg lastig te specificeren, omdat alle gedeeltelijke en volledige padnamen moeten overeenkomen met de&lt;cachePartialPathRegex&gt; en omdat de&lt;cachePartialPathRegex&gt; moet werken met de externe URL's en de lokale mappen. Een voorbeeld van het echte leven is:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
De sample URL hierboven heeft bestanden in submappen op basis van jaar (bv., 2018) en dag van het jaar (bv. 001, 002, ..., 365 of 366) .
Merk op dat de&lt;cachePartialPathRegex&gt; begint met .\\*,
dan heeft een specifieke submap die gebruikelijk is voor de externe URL's en de lokale mappen, bijvoorbeeld /v4\\.1/
dan heeft een reeks geneste vangst groepen waar de eerste optie is niets
en de tweede optie is een specifieke waarde.
            
Het voorbeeld hierboven zal alleen overeenkomen met directories voor de tweede 10 dagen van 2018, bijvoorbeeld,
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Deze server is niet meer betrouwbaar beschikbaar.\\]  
en dag 011, 012, ..., 019.
             (Zie dit[regex documentatie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)en[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
Als je hulp nodig hebt bij het aanmaken&lt;cachePartialPathRegex&gt;, e-mail de&lt;cacheVanUrl&gt; naar Chris. John at noaa.gov .
            
        * Een gemeenschappelijke aanpak: Als u wilt gebruiken&lt;cachePartialPathRegex&gt;, in eerste instantie niet gebruiken, omdat je wiltERDDAP™om alle bestanden eerst te downloaden. NaERDDAP™heeft alle bestanden gedownload, voeg het toe aan de brok van de datasetdatasets.xml.
             
##### Duizenden bestanden{#thousands-of-files} 
Als uw dataset vele duizenden bestanden heeft,ERDDAP™kan traag reageren op verzoeken om gegevens uit die dataset. Er zijn twee kwesties:
 

1. Het aantal bestanden per map.
Intern,ERDDAP™werkt met dezelfde snelheid, ongeacht of n bestanden in één directory of verspreid in verschillende mappen.
     
Maar er is een probleem: Hoe meer bestanden in een bepaalde map, hoe langzamer het besturingssysteem is bij het terugsturen van de lijst met bestanden in de map (per bestand) totERDDAP. De responstijd kan O zijn (n log n) . Het is moeilijk om te zeggen hoeveel bestanden in een directory is te veel, maar 10.000 is waarschijnlijk te veel. Dus als uw setup is het genereren van veel bestanden, een aanbeveling hier zou kunnen zijn: zet de bestanden in logisch georganiseerde submappen (bv. station of station/jaar) .
    
Een andere reden om submappen te gebruiken: als een gebruiker gebruik wil makenERDDAP's"files"systeem om de naam van de oudste bestand voor station X te vinden, het is sneller en efficiënter als de bestanden in station / jaar submappen, omdat veel minder informatie moet worden overgedragen.
    
2. Het totale aantal bestanden.
Voor tabelgegevenssets,ERDDAP™houdt het bereik van waarden voor elke variabele in elk bestand bij. Wanneer een gebruiker een verzoek indient,ERDDAP™moet alle gegevens van alle bestanden die gegevens kunnen hebben die overeenkomen met het verzoek van de gebruiker lezen. Als de gebruiker vraagt om gegevens uit een beperkte tijd (bijvoorbeeld één dag of één maand) , danERDDAP™hoeft niet te veel bestanden te openen in uw dataset. Maar er zijn extreme gevallen waar bijna elk bestand kan hebben overeenkomende gegevens (b.v. bij waterTemperatuur=13,2C) . Aangezien het duurtERDDAP™een beetje tijd (deels de zoektijd op de HDD, deels de tijd om de header van het bestand te lezen) enkel om een gegeven bestand te openen (en meer als er veel bestanden in de map) , is er een aanzienlijke tijdstraf als het totale aantal bestanden datERDDAP™moet openen is zeer groot. Zelfs het openen van 1000 bestanden kost veel tijd. Dus er zijn voordelen om periodiek consolideren van de dagelijkse bestanden in grotere stukken (bv. 1 station voor 1 jaar) . Ik begrijp dat u dit misschien niet om verschillende redenen wilt doen, maar het leidt wel tot veel snellere reacties. In extreme gevallen (Ik heb bijvoorbeeld te maken met een GTSPP dataset met ~35 miljoen bronbestanden) , het serveren van gegevens van een groot aantal bronbestanden is onpraktisch omdatERDDAP's Antwoord op eenvoudige vragen kan uren duren en tonnen geheugen gebruiken. Door bronbestanden te consolideren in een kleiner aantal (voor GTSPP, Ik heb 720 nu, 2 per maand) ,ERDDAP™kan redelijk snel reageren. Zie[Miljoenen bestanden](#millions-of-files)  
     

N.B. Solid State Drives zijn geweldig&#33; De snelste, makkelijkste, goedkoopste manier om te helpenERDDAP™de behandeling van een groot aantal (klein) bestanden is om een solid state drive te gebruiken. Zie[Solid State Drives zijn geweldig&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Miljoenen bestanden{#millions-of-files} 
* Sommige datasets hebben miljoenen bronbestanden.ERDDAP™kan dit aan, maar met gemengde resultaten.
    
    * Voor verzoeken die alleen variabelen bevatten die in [&lt;subsetVariables&gt;] (#subsetvariabelen) ,ERDDAP™beschikt over alle benodigde informatie die al uit de gegevensbestanden is gehaald en in één bestand is opgeslagen, zodat het zeer, zeer snel kan reageren.
    * Voor andere verzoeken,ERDDAP™kan de dataset scannen[cachebestandinformatie](#cached-file-information)en erachter te komen dat slechts een paar van de bestanden gegevens kunnen hebben die relevant zijn voor het verzoek en dus snel reageren.
    * Maar voor andere verzoeken (bijvoorbeeld waterTemperatuur=18 graden\\_C) wanneer een bestand over relevante gegevens kan beschikken;ERDDAP™moet een groot aantal bestanden openen om te zien of elk van de bestanden gegevens heeft die relevant zijn voor het verzoek. De bestanden worden achtereenvolgens geopend. Op elk besturingssysteem en elk bestandssysteem (andere dan vaste-stofaandrijvingen) Dit duurt lang. (dusERDDAP™reageert langzaam) en sluit het bestandssysteem echt aan (dusERDDAP™reageert langzaam op andere verzoeken) .
    
Gelukkig is er een oplossing.
    
    1. De dataset instellen op een niet-publiekERDDAP™  (Uw personal computer?) .
    2. Maak en voer een script dat een reeks van.ncCF-bestanden, elk met een grote brok van de dataset, meestal een periode (bijvoorbeeld, alle gegevens voor een bepaalde maand) . Kies de tijdsperiode zodat alle resulterende bestanden minder dan 2GB zijn (maar hopelijk groter dan 1GB) . Als de dataset bijna-real-time gegevens heeft, voer het script uit om het bestand te regenereren voor de huidige tijdsperiode (bv. deze maand) vaak (Elke 10 minuten? Elk uur?) . Verzoeken aanERDDAP™voor.ncCF-bestanden maken eenNetCDFv3.ncbestand dat de[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contigueuze Ragged Array data structuren).
    3. Stel een[EDDtabelVanNcCFFiles](#eddtablefromnccffiles)dataset op uw publiekERDDAP™die gegevens van de.nc (CF) dossiers.ERDDAP™kan gegevens uit deze bestanden zeer snel extraheren. En aangezien er nu tientallen of honderden (in plaats van miljoenen) van bestanden, zelfs alsERDDAP™moet alle bestanden te openen, het kan dat snel doen.
    
Ja, dit systeem kost wat tijd en moeite om op te zetten, maar het werkt heel, heel goed. De meeste gegevensverzoeken kunnen 100 keer sneller worden behandeld dan voorheen.
    \\[Bob wist dat dit een mogelijkheid was, maar het was Kevin O'Brien die dit deed en liet zien dat het goed werkt. Nu, Bob gebruikt dit voor de GTSPP dataset met ongeveer 18 miljoen bronbestanden en welkeERDDAP™nu dient via ongeveer 500.nc (CF) dossiers.\\]
    
N.B. Solid State Drives zijn geweldig&#33; De snelste, makkelijkste, goedkoopste manier om te helpenERDDAP™de behandeling van een groot aantal (klein) bestanden is om een solid state drive te gebruiken. Zie[Solid State Drives zijn geweldig&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### Enorme bestanden{#huge-files} 
* Eén groot gegevensbestand (met name enorme ASCII-gegevensbestanden) kan een OutOfMemoryError veroorzaken. Als dit het probleem is, moet het duidelijk zijn omdatERDDAP™zal de dataset niet laden. De oplossing, indien haalbaar, is om het bestand te splitsen in meerdere bestanden. Idealiter kun je het bestand splitsen in logische stukken. Bijvoorbeeld, als het bestand heeft 20 maand waarde aan gegevens, splitsen in 20 bestanden, elk met 1 maand waarde aan gegevens. Maar er zijn voordelen, zelfs als het hoofdbestand willekeurig wordt gesplitst. Deze aanpak heeft meerdere voordelen: a) Dit vermindert het geheugen dat nodig is om de gegevensbestanden te lezen naar 1/20th, omdat slechts één bestand tegelijk wordt gelezen. b) Vaak,ERDDAP™kan omgaan met verzoeken veel sneller omdat het hoeft te kijken in een of een paar bestanden om de gegevens voor een bepaald verzoek te vinden. c) Als de gegevensverzameling aan de gang is, dan kunnen de bestaande 20 bestanden ongewijzigd blijven en hoeft u slechts één klein nieuw bestand te wijzigen om de waarde van de gegevens van de volgende maand aan de dataset toe te voegen.
     
##### FTP Trouble/Advice{#ftp-troubleadvice-1} 
* Als u FTP nieuwe gegevensbestanden naar deERDDAP™server terwijlERDDAP™is rennen, er is de kans datERDDAP™zal de dataset tijdens het FTP-proces opnieuw laden. Het gebeurt vaker dan je zou denken&#33; Als het gebeurt, zal het bestand geldig lijken (het heeft een geldige naam) , maar het bestand is niet geldig. AlsERDDAP™probeert om gegevens van dat ongeldige bestand te lezen, de resulterende fout zal leiden tot het bestand worden toegevoegd aan de tabel van ongeldige bestanden. Dit is niet goed. Om dit probleem te voorkomen, gebruik een tijdelijke bestandsnaam wanneer FTP'ing het bestand, bijvoorbeeld ABC2005.nc\\_TEMP . Vervolgens het bestandNameRegex test (zie hieronder) geeft aan dat dit geen relevant dossier is. Nadat het FTP-proces is voltooid, hernoem het bestand naar de juiste naam. Het hernoemen proces zal ervoor zorgen dat het bestand in een oogwenk relevant wordt.
    
##### Bestandsnaam Extracten{#file-name-extracts} 
\\[Deze functie is gedepreciseerd. Gebruik[\\*\\*\\*fileNaam pseudosourceName](#filename-sourcenames)In plaats daarvan.\\]  
EDDTableFromFiles heeft een systeem voor het extraheren van een tekenreeks van elke bestandsnaam en dat gebruiken om een pseudogegevensvariabele te maken. Momenteel is er geen systeem om deze tekenreeksen te interpreteren als data/tijden. Er zijn verschillende XML-tags om dit systeem in te stellen. Als je geen deel of al dit systeem nodig hebt, geef dan deze tags niet op of gebruik "" waarden.

* preExtractRegex is a[reguliere expressie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([handleiding](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) gebruikt om tekst te identificeren die verwijderd moet worden vanaf het begin van de bestandsnaam. De verwijdering vindt alleen plaats als de regex overeenkomt. Dit begint meestal met "^" om overeen te komen met het begin van de bestandsnaam.
* post ExtractRegex is een reguliere expressie die gebruikt wordt om tekst te identificeren die verwijderd moet worden aan het einde van de bestandsnaam. De verwijdering vindt alleen plaats als de regex overeenkomt. Dit eindigt meestal met "$" om aan het einde van de bestandsnaam te komen.
* extractRegex Indien aanwezig wordt deze reguliere expressie gebruikt na preExtractRegex en postExtractRegex om een tekenreeks te identificeren die uit de bestandsnaam moet worden gehaald (Zo is hetstationID) . Als de regex niet overeenkomt, wordt de hele bestandsnaam gebruikt (min preExtract en post Uitpakken) . Gebruik ".\\*" om de volledige bestandsnaam die is overgebleven na preExtractRegex en postExtractRegex te vergelijken.
* Kolom NameForExtract is de gegevens kolom bronnaam voor de uitgepakte tekenreeksen. AdataVariablemet deze[sourceName](#sourcename)moet in dedataVariables lijst (met elk datatype, maar meestal String) .

Bijvoorbeeld, als een dataset bestanden heeft met namen zoals XYZAble.nc, XYZBaker.ncXYZCharlie.nc, ... en je wilt een nieuwe variabele maken (stationID) wanneer elk bestand wordt gelezen met stations-ID-waarden (Able, Baker, Charlie, ...) uit de bestandsnamen gehaald, kunt u deze tags gebruiken:

*   &lt;preExtractRegex&gt;^XYZ&lt;/preExtractRegex&gt;
Het initiële ^ is een reguliere expressie speciaal karakter datERDDAP™om XYZ te zoeken aan het begin van de bestandsnaam. Dit zorgt ervoor dat XYZ, indien gevonden aan het begin van de bestandsnaam, verwijderd wordt (bijvoorbeeld de bestandsnaam XYZAble.ncwordt Able.nc) .
*   &lt;postExtractRegex&gt;\\.nc$&lt;/postExtractRegex&gt;
De $ aan het einde is een reguliere expressie speciaal karakter datERDDAP™om te zoeken.ncaan het einde van de bestandsnaam. Aangezien . een reguliere expressie speciaal karakter is (die overeenkomt met elk teken) , het is gecodeerd als \\. Hier. (omdat 2E het hexadecimale karakternummer is voor een periode) . Dit veroorzaakt.nc, indien gevonden aan het einde van de bestandsnaam, te verwijderen (bijvoorbeeld, de gedeeltelijke bestandsnaam Able.ncwordt Able) .
*   &lt;extractRegex&gt;.\\*&lt;/extractRegex&gt;
De .\\* reguliere expressie komt overeen met alle resterende tekens (bijvoorbeeld de gedeeltelijke bestandsnaam Able wordt het extract voor het eerste bestand) .
*   &lt;kolomNameForExtract&gt;stationID&lt;/columnNameForExtract&gt;
Dit verteltERDDAP™om een nieuwe bronkolom aan te makenstationIDbij het lezen van elk bestand. Elke rij gegevens voor een bepaald bestand laat de tekst uit zijn bestandsnaam halen (bijvoorbeeld, Able) als de waarde in destationIDkolom.

In de meeste gevallen zijn er tal van waarden voor deze extracttags die dezelfde resultaten opleveren -- reguliere expressies zijn zeer flexibel. Maar in een paar gevallen is er maar één manier om de gewenste resultaten te behalen.
     
##### PseudosourceNames{#pseudo-sourcenames} 
Elke variabele in elke dataset inERDDAP™heeft een [&lt;sourceName&gt;] (#bronnaam) waarin de bronnaam van de variabele wordt opgegeven. EDDTableFromFiles ondersteunt een paar pseudosourceNames die een waarde uit een andere plaats halen (Bijvoorbeeld de naam van het bestand of de waarde van een globaal attribuut) en die waarde te bevorderen tot een kolom van constante waarden voor dat stuk gegevens (b.v. de tabel van de gegevens van dat bestand) . Voor deze variabelen moet u het gegevenstype van de variabele specificeren via de [&lt;dataType&gt;] (#datatype) Tag. Als de opgehaalde informatie een datumTijd string is, geeft u het formaat van de datumTijd string in de[units attribuut](#string-time-units). De pseudosourceNameopties zijn:
 
###### wereldwijd:sourceNames{#global-sourcenames} 
Een globaal metadata-attribuut in elk brongegevensbestand kan worden gepromoot als een kolom van gegevens. Als een variabele&lt;sourceName&gt; heeft het formaat
```
        <sourceName>global:*attributeName*</sourceName>
```
WanneerERDDAP™leest de gegevens uit een bestand,ERDDAP™zal zoeken naar een globaal kenmerk van die naam (bijvoorbeeld PI) en maak een kolom gevuld met de waarde van het attribuut. Dit is handig wanneer het attribuut verschillende waarden heeft in verschillende bronbestanden, omdat anders gebruikers slechts één van die waarden voor de hele dataset zouden zien. Bijvoorbeeld,
```
        <sourceName>global:PI</sourceName>
```
Wanneer u een eigenschap om gegevens te promoten,ERDDAP™verwijdert het bijbehorende attribuut. Dit is passend omdat de waarde waarschijnlijk verschillend is in elk bestand; dat in de geaggregeerde dataset inERDDAP™Het zal slechts één waarde hebben. Als u wilt, kunt u een nieuwe waarde voor het attribuut voor de hele dataset toevoegen door&lt;att name=" *eigenschap Naam* "&gt; *nieuw Waarde* &lt;/att&gt; naar de globale dataset [&lt;addAttributes&gt;] (#addattributes) . Voor globale attributen dieERDDAP™vereist, bijvoorbeeld, instelling, u MOET een nieuwe waarde voor de eigenschap toevoegen.
     
###### variabele:sourceNames{#variable-sourcenames} 
Het metadataattribuut van een variabele in elk bestand kan worden gepromoot als een kolom van gegevens. Als een variabele&lt;[sourceName](#sourcename)\\&gt; heeft het formaat
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
WanneerERDDAP™leest de gegevens uit een bestand,ERDDAP™zal zoeken naar het opgegeven kenmerk (bijvoorbeeld ID) van de gespecificeerde variabele (bijvoorbeeld, instrument) en maak een kolom gevuld met de waarde van het attribuut. De hoofdvariabele (bijvoorbeeld, instrument) hoeft niet een van dedataVariables opgenomen in de definitie van de dataset inERDDAP. Bijvoorbeeld,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Dit is handig wanneer het attribuut verschillende waarden heeft in verschillende bronbestanden, omdat anders gebruikers slechts één van die waarden voor de hele dataset zouden zien.

Wanneer u een eigenschap om gegevens te promoten,ERDDAP™verwijdert het bijbehorende attribuut. Dit is passend omdat de waarde waarschijnlijk verschillend is in elk bestand; dat in de geaggregeerde dataset inERDDAP™Het zal slechts één waarde hebben. Als u wilt, kunt u een nieuwe waarde voor het attribuut voor de hele dataset toevoegen door&lt;att name=" *eigenschap Naam* "&gt; *nieuw Waarde* &lt;/att&gt; naar de variabele [&lt;addAttributes&gt;] (#addattributes) . Voor attributen dieERDDAP™vereist, bijvoorbeeld,ioos\\_category  (afhankelijk van uw installatie) , u MOET een nieuwe waarde toevoegen voor het attribuut.
        
###### bestandsnaamsourceNames{#filename-sourcenames} 
U kunt een deel van het bestand van een bestand uitpakkenNaam en bevorderen dat een kolom van gegevens. Het formaat voor deze pseudo [&lt;sourceName&gt;] (#bronnaam) is
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Bijvoorbeeld,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Wanneer EDDTableFromFiles de gegevens van een bestand leest, zal het ervoor zorgen dat het bestandNaam (bijvoorbeeld, A201807041442.slcpV1.nc) komt overeen met de opgegeven reguliere expressie ("regex") en uitpakken van de gespecificeerde (in dit geval, de eerste) capture groep (dat een deel is omringd door haakjes) , bijvoorbeeld, "201807041442." (Zie dit[regex documentatie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)en[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) De regex kan worden gespecificeerd als een string met of zonder omliggende citaten. Als de regex wordt opgegeven als een tekenreeks met omringende aanhalingstekens, moet de tekenreeks[JSON-stijl tekenreeks](https://www.json.org/json-en.html)  (met speciale tekens ontsnapt met \\ tekens) . Het vangstgroepnummer is meestal 1 (de eerste vangstgroep) , maar kan elk nummer zijn.
     
###### padnaamsourceNames{#pathname-sourcenames} 
U kunt een deel van het volledige pad van een bestand uitpakken Naam (/mappen/fileName.ext) en bevorderen dat een kolom van gegevens. Het formaat voor deze pseudo [&lt;sourceName&gt;] (#bronnaam) is
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Bijvoorbeeld,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Wanneer EDDTableFromFiles de gegevens van een bestand leest, zal het ervoor zorgen dat het volledige padNaam (bijvoorbeeld, /data/myDatasetID/BAY17/B201807041442.nc. Voor deze test zullen de mapafscheiders altijd'/', nooit '\\ ') komt overeen met de opgegeven reguliere expressie ("regex") en uitpakken van de gespecificeerde (in dit geval, de eerste) capture groep (dat een deel is omringd door haakjes) , bijvoorbeeld, "BAY17." (Zie dit[regex documentatie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)en[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) De regex kan worden gespecificeerd als een string met of zonder omliggende citaten. Als de regex wordt opgegeven als een string met omringende citaten, moet de string een[JSON-stijl tekenreeks](https://www.json.org/json-en.html)  (met speciale tekens ontsnapt met \\ tekens) . Het vangstgroepnummer is meestal 1 (de eerste vangstgroep) , maar kan elk nummer zijn.
         
##### "0 bestanden" Foutmelding{#0-files-error-message-2} 
* Als u rent[GenererenDatasetsXml](#generatedatasetsxml)of[DasDds](#dasdds), of als u probeert om een EDDTableF... Bestandendataset inERDDAP™, en je krijgt een "0 bestanden" foutmelding die aangeeft datERDDAP™0 overeenkomende bestanden in de map gevonden (als je denkt dat er overeenkomende bestanden in die map zijn) :
    * Controleer of de bestanden echt in die map zitten.
    * Controleer de spelling van de mapnaam.
    * Controleer het bestandNameRegex. Het is heel makkelijk om fouten te maken met regexes. Voor testdoeleinden, probeer de regex .\\* die moet overeenkomen met alle bestandsnamen. (Zie dit[regex documentatie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)en[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Controleer of de gebruiker die het programma uitvoert (bv. gebruiker=tomcat (?) voor Tomcat/ERDDAP) heeft 'lezen' toestemming voor die bestanden.
    * In sommige besturingssystemen (bijvoorbeeld, SELinux) en afhankelijk van de systeeminstellingen, moet de gebruiker die het programma uitvoerde 'lezen' toestemming hebben voor de hele keten van directories die leidt naar de directory die de bestanden heeft.
         
##### standaardiseren Wat?{#standardizewhat} 
* Wanneer een subklasse van EDDTableFromFiles een verzameling bronbestanden aggregeert, moeten voor een bepaalde variabele alle bronbestanden identieke attribuutwaarden hebben voor verschillende attributen:scale\\_factor,add\\_offset, \\_Onondertekend,missing\\_value, \\_FillValue, en eenheden). Denk er eens over na: als het ene bestand windSpeed units=knopen heeft en het andere windSpeed units=m/s heeft, dan moeten de datawaarden van de twee bestanden niet in dezelfde geaggregeerde dataset worden opgenomen. Dus, wanneer EDDTableFromFromFiles eerst de dataset aanmaakt, leest het de attribuutwaarden uit één bestand, verwerpt dan alle bestanden die verschillende waarden hebben voor die belangrijke attributen. Voor de meeste bestanden is dit geen probleem omdat de attributen van alle variabelen consistent zijn. Echter, voor andere collecties van bestanden, kan dit leiden tot 1%, 10%, 50%, 90%, of zelfs 99% van de bestanden worden afgewezen als "slechte" bestanden. Dat zijn problemen.
    
EDDTableVan bestanden heeft een systeem om dit probleem aan te pakken: standaardiseren Wat? Het standaardiseren Welke instelling vertelt EDDTableFromFiles om de bestanden te standaardiseren zodra het leest, voordat EDDTableFromFiles kijkt naar de attributen om te zien of ze consistent zijn.
    
De keerzijde is: als de dataset dit probleem niet heeft, gebruik dan geen standaard Wat? standaardiseren Wat heeft een aantal potentiële risico's (hieronder besproken) en inefficiënties. Dus als je niet echt nodig hebt de functies van standaardiseren Het is niet nodig om de potentiële risico's en inefficiënties onder ogen te zien. De grootste inefficiëntie is: Wanneer verschillende normaliseren Welke opties worden gebruikt door een dataset, het impliceert dat de bronbestanden opslaan gegevens op significant verschillende manieren (b.v. met verschillendescale\\_factorenadd\\_offset, of met tijdreeksen met verschillende formaten) . Dus, voor een bepaalde beperking in een gebruiker verzoek, is er geen manier voorERDDAP™om een enkele bron-niveau beperking die kan worden toegepast op alle bronbestanden te maken. Dus.ERDDAP™kan alleen de getroffen beperkingen op een hoger niveau toepassen. Dus.ERDDAP™moet de gegevens van meer bestanden te lezen voordat de toepassing van de hogere, bestemming-niveau beperkingen. Dus vraagt naar datasets die standaardiseren Wat langer duurt om verwerkt te worden.
    
Om dit systeem te gebruiken, moet u specificeren
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
in de[datasets.xmlvoor de EDDTableFrom... Bestandenset](#eddtablefromfiles-skeleton-xml)(binnen de&lt;dataset&gt; tag).
    
De *standaardiseren Wat?* waarde specificeert welke wijzigingen EDDTableFromFiles moeten proberen toe te passen. De veranderingen zijn de som van een combinatie van:
    
1. Uitpakken
Dit doet veel gemeenschappelijke en veilige operaties om numerieke kolommen in de bestanden te standaardiseren:
    * Alsscale\\_factoren/ofadd\\_offsetattributen zijn aanwezig, verwijder ze en pas ze toe om de gegevenswaarden uit te pakken.
    * Ingepakte attributen uitpakken (bv., werkelijke\\_min, werkelijke\\_max,actual\\_range,data\\_min,data\\_max, data\\_range,valid\\_min,valid\\_max,valid\\_range) , indien aanwezig, indien de variabele is verpakt, en indien de attribuutwaarden zijn verpakt (Dit is lastig, maar redelijk betrouwbaar.) .
    * Als \\_FillValue en/ofmissing\\_valueaanwezig zijn, deze gegevenswaarden omzetten naarERDDAP's "standaard" ontbrekende waarden: MAX\\_VALUE voor gehele typen (bv. 127 voor bytes, 32.767 voor short, en 2.147.483.647 voor ints, 9223372036854775807 voor lang) En NaN voor dubbelen en drijven.
    * Verwijder de oude \\_FillValue en/ofmissing\\_valueattributen (indien) , en ze vervangen door \\_FillValue=\\[deERDDAP™standaard ontbrekende waarde\\].
         
2. Standaardiseren Numerieke tijden
Als een numerieke kolom numerieke tijdeenheden heeft in CF-stijl (" *tijdEenheden* sinds *baseTime* ", bijvoorbeeld, "dagen sinds 1900-01-01") , dit zet de datum Tijdswaarden naar"seconds since 1970-01-01T00:00:00Z"waarden en wijzigingen van de eenheden attribuut om dat aan te geven.
Als dit geselecteerd is en er een kans is dat deze variabelescale\\_factorofadd\\_offset, #1 MOET ook geselecteerd worden.
     
3. Tekenreeks toepassenmissing\\_value  
Als een tekenreeks \\_FillValue heeft en/ofmissing\\_valueattributen, dit converteert deze waarden naar "" en verwijdert de attributen.
     
4. Numeriek zoekenmissing\\_value  
Als een numerieke kolom geen \\_FillValue heeft ofmissing\\_valueattributen, dit probeert een ongedefinieerd getal te identificerenmissing\\_value  (b.v. -999, 9999, 1e37f) en omzetten van instanties van het naar de "standaard" waarden (MAX\\_VALUE voor integer types, en NAN voor dubbels en floats) .
     **Deze optie heeft een risico:** als de grootste of kleinste geldige gegevenswaarde eruit ziet als een ontbrekende waarde (bv. 999) , dan worden die geldige gegevenswaarden omgezet in ontbrekende waarden (bv., NaN) .
     
5. Verander tekenreeks "N/A" in ""
Converteer voor elke tekenreeks meerdere tekenreeksen die vaak worden gebruikt om een ontbrekende tekenreekswaarde aan te geven naar "." Momenteel is dit op zoek naar ".", "...", "," "??", "N/A," "NA," "geen," "niet van toepassing," "null," "onbekend," "niet van toepassing." De string search is hoofdletter-ongevoelig en toegepast nadat de strings zijn trim'd. "nd" en "other" staan specifiek niet op de lijst.
     **Deze optie heeft een risico:** Tekenreeksen die u als geldige waarden beschouwt, kunnen worden omgezet in "."
     
6. Standaardiseren naar string ISO 8601 DateTimes
Voor elke tekenreeks, proberen om niet-zuiver-numerieke tekenreeks datumTijden converteren (b.v. "Jan 2, 2018") naar ISO 8601 StrijkdatumTijden ("2018-01-02") .
     **Opmerking** dat alle gegevenswaarden voor de kolom hetzelfde formaat moeten gebruiken, anders zal deze optie geen wijzigingen aanbrengen in een gegeven kolom.
     **Deze optie heeft een risico:** Als er een kolom is met tekenreekswaarden die er toevallig uitzien als een gewone datum Tijdformaat, ze zullen worden omgezet naar ISO 8601 String dateTimes.
     
7. Standaardiseren Compacte datetijden naar ISO 8601 datetijden
Voor elke tekst of kolom van het gehele getal, probeer om te zetten puur-numerieke tekenreeks datumTijden (bv. "20180102") naar ISO 8601 StrijkdatumTijden ("2018-01-02") .
     **Opmerking** dat alle gegevenswaarden voor de kolom hetzelfde formaat moeten gebruiken, anders zal deze optie geen wijzigingen aanbrengen in een gegeven kolom.
     **Deze optie heeft een risico:** Als er een kolom is met waarden die geen compacte datum zijn Tijden maar zien eruit als compact dateTimes, ze zullen worden omgezet naar ISO 8601 String dateTimes.
     
8. Eenheden standaardiseren
Dit probeert de eenheid string voor elke variabele te standaardiseren. Bijvoorbeeld "meters per seconde," "meter/seconde,""m.s^-1","m s-1", "m.s-1" wordt allemaal omgezet in "m.s-1." Dit verandert de datawaarden niet. Dit werkt goed voor geldigUDUNITSunits strings, maar kan problemen hebben met ongeldige of complexe strings. U kunt omgaan met problemen door specifieke van-tot-paren in&lt;standaardiserenUdunits&gt; inERDDAP's
    \\[kat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file. E-mail alle wijzigingen die u maakt naar Chris. John op noaa.gov zodat ze kunnen worden opgenomen in de standaard berichten.xml.
     **Deze optie heeft een risico:** Dit kan een aantal complexe of ongeldige eenheden mangle; echter, u kunt de hierboven beschreven work-around gebruiken om problemen te omzeilen als ze zich voordoen.
         
    
De standaard waarde van standaardiseren Wat 0 is, wat niets doet.

Als/wanneer u de waarde van standaardiseren wijzigt Wat, de volgende keer dat de dataset wordt herladen,ERDDAP™zal alle gegevensbestanden voor de dataset opnieuw lezen om de minidatabase te herstellen met informatie over elk bestand. Als de dataset veel bestanden heeft, zal dit lang duren.
    
Opmerkingen:

* Het lastige is...
Het standaardiseren Welke instelling wordt gebruikt voor alle kolommen in het bronbestand. Dus, bijvoorbeeld, het gebruik van #2048 zou met succes een kolom van compacte String dateTijden in ISO 8601 String dateTijden, maar het kan ook ten onrechte een kolom met Strings die toevallig te zien als compact dateTimes.
     
*   datasets.xmlen GenererenDatasets Xml -
Het is vooral lastig om de instellingen correct indatasets.xmlom je dataset te laten werken zoals je wilt. De beste aanpak (zoals altijd) is:
    1. Gebruik[GenererenDatasetsXml](#generatedatasetsxml)en geef de waarde van standaardiseren Wat je wilt gebruiken.
    2. Gebruik[DasDds](#dasdds)ervoor te zorgen dat de dataset correct belast en de standaardwaarden weergeeft Welke instelling heb je opgegeven?
    3. Test de dataset met de hand wanneer deze inERDDAP™ervoor te zorgen dat de betrokken variabelen werken zoals verwacht.
         
* Risico's
Opties #256 en hoger zijn riskanter, dat wil zeggen, er is een grotere kans datERDDAP™zal een verandering maken die niet gemaakt moet worden. Bijvoorbeeld, optie #2048 kan per ongeluk een variabele converteren met station ID strings die allemaal toevallig kijken ISO 8601 "compact" data (bv., 20180102) in ISO 8601"extended"data ("2018-01-02") .
     
* Langzaam na een verandering...
Sinds de waarde van standaardiseren Wat verandert de gegevenswaarden die EDDTableFromFiles ziet voor elk gegevensbestand, als u de standaardwaarden wijzigt Welke instelling, EDDTableFromFiles zal alle gecachede informatie over elk bestand weggooien (waarin de min en max voor elke gegevensvariabele in elk bestand zijn opgenomen) en herlees elk gegevensbestand. Als een dataset een groot aantal bestanden heeft, kan dit zeer tijdrovend zijn, dus het zal lang duren voordat de dataset de eerste keer herlaadtERDDAP™herlaadt het nadat je de verandering hebt gemaakt.
     
* Heuristiek -
Opties #256 en hoger gebruiken heuristiek om hun veranderingen te maken. Als je een situatie tegenkomt waarin de heuristiek een slechte beslissing neemt, stuur dan een beschrijving van het probleem naar Chris. John at noaa. Zodat we de heuristiek kunnen verbeteren.
     
* Alternatieven --
Als een van de standaardizeWelke opties niet een probleem voor een bepaalde dataset op te lossen, kunt u in staat zijn om het probleem op te lossen door een[.ncml bestand](#ncml-files)om elk gegevensbestand parallel te maken en wijzigingen in de bestanden te definiëren zodat de bestanden consistent zijn. Zeg het dan tegen de EDDTableFrom... Bestanden dataset om de.ncml bestanden.
    
Of, gebruik[NCO](#netcdf-operators-nco)om daadwerkelijk wijzigingen aan te brengen in de bestanden zodat de bestanden consistent zijn.
        
##### Afzonderlijke kolommen voor jaar, maand, datum, uur, minuut, tweede{#separate-columns-for-year-month-date-hour-minute-second} 
Het is vrij gebruikelijk dat tabelgegevensbestanden afzonderlijke kolommen hebben voor jaar, maand, datum, uur, minuut, tweede. VoorERDDAP™v2.10, de enige oplossing was het bewerken van het gegevensbestand om deze kolommen te combineren tot een uniforme tijdkolom. MetERDDAP™2.10+, kunt u de
[&lt;sourceName&gt; *expressie* &lt;sourceName&gt;] (#bronnaam) om te vertellenERDDAP™hoe je de bron kolommen combineert om een uniforme tijdkolom te maken, zodat je het bronbestand niet meer hoeft te bewerken.
##### &lt;skipheaderToRegex&gt;{#skipheadertoregex} 
* [&lt;skipheaderToRegex&gt;] (#skipheadertoregex) --
OPTIONAL. (Voor EDDTableFromAsciiFiles and EDDTableFromColumbnarAsciiFiles datasets only.)   
Wanneer EDDTableFromAsciiFiles een gegevensbestand leest, zal het alle regels tot en met de regel die overeenkomt met deze reguliere expressie negeren. De standaard is "," die deze optie niet gebruikt. Een voorbeeld is
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
die alle lijnen tot en met een lijn die begint met negeren "\\*\\*Het einde van de header.

Als je dit label gebruikt,&lt;kolomNamesRow&gt; en&lt;eerstDataRow&gt; doen alsof de header is verwijderd voordat het bestand wordt gelezen. Bijvoorbeeld, u zou kolomNamesRow=0 gebruiken als de kolomnamen op de rij direct na de header staan.

Als u wilt genereren Datasets Xml met een dataset die deze tag nodig heeft:

1. Maak een nieuw, tijdelijk, monsterbestand door een bestaand bestand te kopiëren en de header te verwijderen.
2. Genereren uitvoeren Datasets Xml en geef dat monsterbestand op.
3. Handmatig toevoegen&lt;skipheaderToRegex&gt; tag naar dedatasets.xmlBrok.
4. Verwijder het tijdelijke, monsterbestand.
5. Gebruik de dataset inERDDAP.
##### &lt;skipLinesRegex&gt;{#skiplinesregex} 
OPTIONAL. (Voor EDDTableFromAsciiFiles and EDDTableFromColumbnarAsciiFiles datasets only.)   
Wanneer EDDTableFromAsciiFiles een gegevensbestand leest, zal het alle regels die overeenkomen met deze reguliere expressie negeren. De standaard is "," die deze optie niet gebruikt. Een voorbeeld is
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
die alle regels die beginnen met "#" negeren.

Als je dit label gebruikt,&lt;kolomNamesRow&gt; en&lt;eerstDataRow&gt; doen alsof alle bijpassende regels zijn verwijderd voordat het bestand wordt gelezen. Je zou bijvoorbeeld kolomNamesRow=0 gebruiken, zelfs als er verschillende regels zijn die beginnen met bijvoorbeeld "#" aan het begin van het bestand.
    
#### EDDTableFromFiles skelet XML{#eddtablefromfiles-skeleton-xml} 
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
[ **EDDTableFromAsciiService** ](#eddtablefromasciiservice)is in wezen een zeefschraper. Het is bedoeld om te gaan met gegevensbronnen die een eenvoudige webservice hebben voor het aanvragen van gegevens (vaak een HTML-formulier op een webpagina) en die de gegevens in een gestructureerd ASCII-formaat kunnen retourneren (bijvoorbeeld een komma-gescheiden-waarde of kolomar ASCII-tekstformaat, vaak met andere informatie voor en/of na de gegevens) .

EDDTableFromAsciiService is de superklasse van alle EDDTableFromAsciiService... klassen. U kunt EDDTableFromAsciiService niet rechtstreeks gebruiken. In plaats daarvan, gebruik een subklasse van EDDTableFromAsciiService om specifieke soorten diensten te behandelen:

*   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)krijgt gegevens vanNOAADe ASCII-diensten van NOS.

Momenteel worden geen andere servicetypes ondersteund. Maar het is meestal relatief gemakkelijk om andere diensten te ondersteunen als ze op een soortgelijke manier werken. Neem contact met ons op als u een verzoek heeft.

#### Gegevens{#details} 
De volgende informatie is van toepassing op alle subklassen van EDDTableFromAsciiService.

* Beperkingen...ERDDAP™De aanvragen voor tabelgegevens kunnen beperkingen opleggen aan elke variabele. De onderliggende dienst kan al dan niet beperkingen op alle variabelen toestaan. Bijvoorbeeld, veel diensten ondersteunen alleen beperkingen op stationsnamen, breedtegraad, lengtegraad en tijd. Dus wanneer een subklasse van EDDTableFromAsciiService een verzoek krijgt voor een subset van een dataset, geeft het zoveel mogelijk beperkingen door aan de brongegevensservice en past het vervolgens de resterende beperkingen toe op de gegevens die door de service worden geretourneerd, voordat de gegevens aan de gebruiker worden doorgegeven.
* Geldig bereik -- In tegenstelling tot vele andere datasettypes, kent EDDTableFromAsciiService meestal niet het bereik van gegevens voor elke variabele, zodat het niet snel verzoeken voor gegevens buiten het geldige bereik kan weigeren.
* De ASCII-tekstreactie ontleden... Wanneer EDDTableFromAsciiService een reactie krijgt van een ASCII Text Service, moet het valideren dat het antwoord het verwachte formaat en informatie heeft, en vervolgens de gegevens extraheren. U kunt het formaat specificeren met behulp van verschillende speciale tags in het blok XML voor deze dataset:
    *   &lt;voorData1&gt; door&lt;voorData10&gt; tags -- U kunt een reeks stukken tekst specificeren (zoveel als je wilt, tot 10) dat EDDtableFromAsciiService moet zoeken in de koptekst van de ASCII tekst die door de dienst met&lt;voorData1&gt; door&lt;voorData10&gt;. Dit is bijvoorbeeld nuttig om na te gaan of de respons de verwachte variabelen bevat met behulp van de verwachte eenheden. De laatste voorData-tag die u opgeeft, identificeert de tekst die plaatsvindt vlak voordat de gegevens beginnen.
    *   &lt;naData&gt; -- Dit specificeert de tekst die EDDTableFromAsciiService zal zoeken in de ASCII-tekst die door de dienst wordt teruggestuurd en die het einde van de gegevens aangeeft.
    *   &lt;noData&gt; -- Als EDDTableFromAsciiService deze tekst vindt in de ASCII-tekst die door de dienst wordt teruggestuurd, concludeert zij dat er geen gegevens zijn die overeenkomen met het verzoek.
#### EDDTableFromAsciiService skelet XML{#eddtablefromasciiservice-skeleton-xml} 
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
[ **EDDTableFromAsciiServiceNOS** ](#eddtablefromasciiservicenos)maakt EDDTable datasets van de ASCII-tekstgegevensdiensten aangeboden doorNOAA's[National Ocean Service (NOS) ](https://oceanservice.noaa.gov/). Voor informatie over hoe deze klasse werkt en hoe deze te gebruiken, zie de superklasse van deze klasse[EDDTableFromAsciiService](#eddtablefromasciiservice). Het is onwaarschijnlijk dat iemand anders dan Bob Simons deze subklasse zal moeten gebruiken.

Aangezien de gegevens binnen het antwoord van een NOS-dienst gebruik maken van een kolomig ASCII-tekstformaat, moeten andere gegevensvariabelen dan breedte- en lengtegraad een speciaal kenmerk hebben dat specificeert welke tekens van elke gegevenslijn de gegevens van die variabele bevatten, bijvoorbeeld:
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDtabelVanAllDatasets{#eddtablefromalldatasets} 
[ **EDDtabelVanAllDatasets** ](#eddtablefromalldatasets)is een dataset op hoger niveau met informatie over alle andere datasets die momenteel in uwERDDAP. In tegenstelling tot andere soorten datasets is er geen specificatie voor deallDatasetsdataset indatasets.xml.ERDDAP™automatisch een EDDtableFromAllDatasets-dataset aanmaken (metdatasetID=allDatasets) . ZoallDatasetsdataset zal worden aangemaakt in elkeERDDAP™installatie en zal op dezelfde manier werken in elkeERDDAP™installatie.

DeallDatasetsdataset is een tabelset. Het heeft een rij van informatie voor elke dataset. Het bevat kolommen met informatie over elke dataset, bijvoorbeeld:datasetID, toegankelijk, instelling, titel, minLongitude, maxLongitude, minBreedtegraad, maxBreedtegraad, minTijd, maxTijd, enz. OmdatallDatasetsis een tabel dataset, kunt u het op dezelfde manier waarop u kunt opvragen elke andere tabel dataset inERDDAP™, en u kunt het bestandstype voor het antwoord opgeven. Dit laat gebruikers zoeken naar datasets van belang op zeer krachtige manieren.
 
### EDDtabelVanAsciiFiles{#eddtablefromasciifiles} 
[ **EDDtabelVanAsciiFiles** ](#eddtablefromasciifiles)aggregaten gegevens van komma-, tab-, semicolon-, of ruimte gescheiden tabel ASCII-gegevensbestanden.

* Meestal hebben de bestanden kolomnamen op de eerste rij en gegevens die beginnen op de tweede rij. (Hier heet de eerste rij van het bestand rij nummer 1.) Maar je kunt gebruiken&lt;kolomNamesRow&gt; en&lt;eerstDataRow&gt; in uwdatasets.xmlbestand om een ander rijnummer op te geven.
*   ERDDAP™stelt de rijen gegevens in staat verschillende aantallen gegevenswaarden te hebben.ERDDAP™gaat ervan uit dat de ontbrekende gegevenswaarden de laatste kolommen in de rij zijn.ERDDAP™kent de standaard ontbrekende waarden toe voor de ontbrekende gegevenswaarden. (toegevoegd v1.56) 
* ASCII-bestanden zijn gemakkelijk om mee te werken, maar ze zijn niet de meest efficiënte manier om gegevens op te slaan / terughalen. Voor meer efficiëntie, sla de bestanden alsNetCDFv3.ncbestanden (met één dimensie, "rij," gedeeld door alle variabelen) In plaats daarvan. Je kunt[gebruikERDDAP™om nieuwe bestanden te genereren](#millions-of-files).
* Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Vanwege het totale gebrek aan metadata in ASCII-bestanden, moet u altijd de resultaten van GenerateDatasetsXml bewerken.
* WAARSCHUWING: WanneerERDDAP™leest ASCII-gegevensbestanden, als het een fout op een bepaalde regel vindt (bv. onjuist aantal items) , het logt een waarschuwingsbericht (Slechte lijn. (s) van gegevens" ... met een lijst van de slechte regels op de volgende regels) aan de[log.txt-bestand](/docs/server-admin/additional-information#log)en dan de rest van het gegevensbestand blijft lezen. Dus, het is uw verantwoordelijkheid om regelmatig te kijken (of schrijf een script om dit te doen) voor dat bericht in het logboek. txt zodat u de problemen in de gegevensbestanden kunt oplossen.ERDDAP™is ingesteld op deze manier zodat gebruikers kunnen blijven lezen van alle beschikbare geldige gegevens, hoewel sommige regels van het bestand gebreken hebben.
     
### EDDTabelVan AwsXmlFiles{#eddtablefromawsxmlfiles} 
[ **EDDTabelVan AwsXmlFiles** ](#eddtablefromawsxmlfiles)aggregaten gegevens van een set van automatische weerstation (AWS) XML-gegevensbestanden met behulp van de WeatherBug Rest XML API (die niet meer actief is) .

* Dit type bestand is een eenvoudige maar inefficiënte manier om de gegevens op te slaan, omdat elk bestand meestal lijkt te bevatten de observatie van slechts een keer. Er kan dus een groot aantal bestanden zijn. Als u de prestaties wilt verbeteren, overweeg dan om groepen observaties te consolideren (Een week waard?) inNetCDFv3.ncbestanden (beste:.ncbestanden met de[CF Discrete bemonsteringsgeometrie (DSG) Onvoorziene Ragged Array formaat](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) en gebruik[EDDtabelVanMultidimNcFiles](#eddtablefrommultidimncfiles)  (of[EDDtabelVanNcCFFiles](#eddtablefromnccffiles)) om de gegevens te dienen. Je kunt[gebruikERDDAP™om nieuwe bestanden te genereren](#millions-of-files).
* Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.
     
### EDDTabelVan ColumbarAsciiFiles{#eddtablefromcolumnarasciifiles} 
[ **EDDTabelVan ColumbarAsciiFiles** ](#eddtablefromcolumnarasciifiles)aggregaten gegevens uit tabel ASCII-gegevensbestanden met vaste breedte kolommen.

* Meestal hebben de bestanden kolomnamen op de eerste rij en gegevens die beginnen op de tweede rij. De eerste regel/rij in het bestand heet rij #1. Maar je kunt gebruiken&lt;kolomNamesRow&gt; en&lt;eerstDataRow&gt; in uwdatasets.xmlbestand om een ander rijnummer op te geven.
* De&lt;addAttributes&gt; voor elk&lt;dataVariable&gt; voor deze datasets MOETEN deze twee speciale attributen worden opgenomen:
    
    *   &lt;att name="startColumn"&gt; *geheel getal* &lt;att&gt; -- specificeert de tekenkolom in elke regel die het begin is van deze gegevensvariabele.
    *   &lt;att name="stopColumn"&gt; *geheel getal* &lt;att&gt; -- specificeert de tekenkolom in elke regel die de 1 is na het einde van deze gegevensvariabele.
    
De eerste tekenkolom heet kolom #0.
Bijvoorbeeld, voor dit bestand met tijdswaarden die de temperatuurwaarden verlagen:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
de tijdgegevens variabele zou hebben
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
en de tijdgegevens variabele zou hebben
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Deze eigenschappen MOETEN worden gespecificeerd voor alle variabelen behalve[vaste waarde](#fixed-value-sourcenames)en[bestandsnaam-bron-namen](#filename-sourcenames)variabelen.
* ASCII-bestanden zijn gemakkelijk om mee te werken, maar ze zijn niet een efficiënte manier om gegevens op te slaan / terughalen. Voor meer efficiëntie, sla de bestanden alsNetCDFv3.ncbestanden (met één dimensie, "rij," gedeeld door alle variabelen) In plaats daarvan. Je kunt[gebruikERDDAP™om nieuwe bestanden te genereren](#millions-of-files).
* Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Vanwege de moeilijkheid om de start- en eindposities voor elke gegevenskolom en het totale gebrek aan metagegevens in ASCII-bestanden te bepalen, moet u altijd de resultaten van GenerateDatasetsXml bewerken.
     
### EDDTableFromHttpGet{#eddtablefromhttpget} 
EDDTabel FromHttpGet is verschillend van alle andere soorten datasets inERDDAP™in dat het een systeem heeft waarbij specifieke "auteurs" gegevens kunnen toevoegen, gegevens kunnen herzien of gegevens uit de dataset kunnen verwijderen door regelmatigHTTP GETof[POST](#http-post)verzoeken van een computerprogramma, een script of een browser. De dataset is door gebruikers op dezelfde manier opgevraagd als alle andere EDDTable datasets zijn opgevraagd inERDDAP. Zie de beschrijving van de superklasse van deze klasse,[EDDTableFromFiles](#eddtablefromfiles), om te lezen over de kenmerken die zijn geërfd van die superklasse.

De unieke eigenschappen van EDDTableFromHttpGet worden hieronder beschreven. Je moet al deze eerste sectie lezen en begrijpen; anders kun je onrealistische verwachtingen hebben of jezelf in moeilijkheden brengen die moeilijk te verhelpen zijn.

#### Beoogd gebruik{#intended-use} 
Dit systeem is bedoeld voor:

* Tabel (in situ) gegevens, geen gerasterde gegevens.
* Real time gegevens -
Het doel is om een auteur (bv. de sensor, een geautomatiseerd QC-script of een specifiek menselijk) om de dataset te wijzigen (via een[.insert of .delete-opdracht](#insert-and-delete)) en die verandering toegankelijk te maken voorERDDAP™gebruikers, allemaal in minder dan 1 seconde, en mogelijk veel sneller. Het grootste deel van die 1 seconde is netwerktijd.ERDDAP™kan het verzoek in ongeveer 1 ms verwerken en de gegevens zijn direct toegankelijk voor gebruikers. Dit is een[snel](#httpget-speed),[robuust](#robust)en[betrouwbaar systeem](#system-reliability).
* Bijna elke frequentie van gegevens -
Dit systeem kan frequente gegevens accepteren (bv. dagelijks) via zeer frequente gegevens (bv. gegevens van 100 Hz) . Als u het systeem te optimaliseren, het kan omgaan met hogere frequentie gegevens (misschien 10 KHz gegevens als je gaat tot extreme) .
* Gegevens van één sensor of een verzameling van soortgelijke sensoren.
*   [Versie](#versioning)'[Reproduceerbare wetenschap](https://en.wikipedia.org/wiki/Reproducibility)'DOIs --
Situaties waarin u wijzigingen aan de gegevens moet kunnen aanbrengen (b.v. een kwaliteitsbewakingsvlag wijzigen) , weten welke auteur elke wijziging heeft aangebracht, weten wanneer de auteur de wijziging heeft aangebracht, en (op verzoek) in staat zijn om de oorspronkelijke gegevens te zien van voordat de wijziging werd gemaakt. Deze datasets komen dus in aanmerking voor[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). omdat ze deDOIvereiste dat de gegevensverzameling ongewijzigd blijft, behalve door aggregatie. In het algemeen komen bijna realtime datasets niet in aanmerking voorDOIs omdat de gegevens vaak met terugwerkende kracht veranderd zijn (Bijvoorbeeld voor QA/QC-doeleinden) .
     

Zodra de gegevens in een EDDTableFromHttpGet dataset zijn, kan elke gebruiker gegevens aanvragen op dezelfde manier als ze gegevens aanvragen uit een andere EDDTable dataset.
     
#### Experimenteel: Wees voorzichtig.{#experimental-be-careful} 
Aangezien dit systeem nieuw is en verloren milieugegevens niet opnieuw kunnen worden verkregen, moet u EDDTableFromHttpGet als experimenteel behandelen. Als u overstapt van een ander systeem, draai dan het oude systeem en het nieuwe systeem parallel totdat u er zeker van bent dat het nieuwe systeem goed werkt (weken of maanden, niet alleen uren of dagen) . In alle gevallen, zorg ervoor dat uw systeem apart archieven de .insert en .delete URL's die worden verzonden naar de EDDTableFromHttpGet dataset (zelfs als alleen in de Apache en/of Tomcat logs) , tenminste voor een tijdje. En in alle gevallen, zorg ervoor dat de gegevensbestanden gemaakt door uw EDDTableFromHttpGet dataset worden routinematig een back-up naar externe gegevensopslagapparaten. (Merk op dat[rsync](https://en.wikipedia.org/wiki/Rsync). kan een back-up van de gegevensbestanden gemaakt door EDDTableFromHttpGet zeer efficiënt.)   
     
#### .insert en .delete{#insert-and-delete} 

Voor elke dataset inERDDAP™, wanneer u een verzoek naarERDDAP™voor een deelverzameling van de gegevens in een dataset, geeft u het bestandstype aan dat u wilt voor het antwoord, bijvoorbeeld .csv,.htmlTable,.nc,.json. EDDTabelFromHttp Get breidt dit systeem uit om twee extra "bestandstypen" te ondersteunen die kunnen invoegen (of verandering) of gegevens in de dataset verwijderen:

* .invoegen
    * Het verzoek wordt geformatteerd als een standaard HTML-formulierrespons, met sleutel=waardeparen, gescheiden door '&'. Bijvoorbeeld,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
verteltERDDAP™om de gegevens voorstationID=46088 voor de opgegeven tijd.
    * De auteur van deze wijziging is JohnSmith en de sleutel is watKey1.
    * De URL moet geldige waarden bevatten (ontbrekende waarden niet) voor alle[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)
    * Indien de waarden van dehttpGetRequired Variabelen in het verzoek (bv.stationIDen tijd) overeenkomen met de waarden op een rij al in de dataset, de nieuwe waarden effectief overschrijven van de oude waarden (Hoewel de oude waarden nog steeds toegankelijk zijn als de gebruiker gegevens van een vorige[versie](#versioning)van de dataset) .
    * De .insert-URL mag nooit &timestamp= (ERDDAP™genereert die waarde) of &command= (die wordt gespecificeerd door .insert (wat commando=0 is) of .delete (wat commando = 1) ) .
    * Als de .insert URL geen waarden specificeert voor andere kolommen die in de dataset staan, worden ze verondersteld de oorspronkelijke ontbrekende waarden te zijn. (MAX\\_VALUE voor integer data types, NaN voor floats en doubles, en "" voor tekenreeksen) .
             
    * .delete
        * Het verzoek wordt geformatteerd als een standaard HTML-formulierrespons, met sleutel=waardeparen, gescheiden door '&'. Bijvoorbeeld,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
verteltERDDAP™om de gegevens voorstationID=46088 op het opgegeven tijdstip.
        * De auteur van deze wijziging is JohnSmith en de sleutel is watKey1.
        * De URL moet de[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)in het verzoek (bv.stationIDen tijd) . Als deze waarden overeenkomen met de waarden op een rij die al in de dataset staan (die ze meestal zullen) , worden de oude waarden effectief verwijderd (Hoewel de oude waarden nog steeds toegankelijk zijn als een gebruiker gegevens van een vorige[versie](#versioning)van de dataset) .
        * Er is geen behoefte om waarden voor niet-HttpGetRequiredVariables te specificeren, behalve de auteur, die nodig is om het verzoek te authenticeren.
             
    
Bijzonderheden:
    * .insert en .delete verzoeken worden geformatteerd als standaard HTML-formulierantwoorden, met sleutel=waardeparen, gescheiden door '&'. De waarden moeten[percentage gecodeerd](https://en.wikipedia.org/wiki/Percent-encoding). Zo moet je speciale tekens coderen in het formulier %HH, waar HH de hexadecimale waarde van het teken is. Normaal gesproken moet je enkel enkele leestekens omzetten: % in %25, & in %26, " in %22,&lt;in %3C, = in %3D, &gt; in %3E, + in %2B,|in %7C,\\[in %5B,\\]in %5D, ruimte in %20, en zet alle tekens boven #127 om in hun UTF-8 vorm en codeer vervolgens elke byte van de UTF-8 vorm in het %HH formaat (een programmeur om hulp vragen) .
    * .insert en .delete verzoeken moeten de[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute), bijvoorbeeld,stationIDEn tijd. Voor .invoegen verzoeken, variabelen die niet in het verzoek zijn gespecificeerd worden verondersteld ontbrekende waarden te zijn (MAX\\_VALUE voor gehele variabelen, NaN voor zwevende en dubbele variabelen en een lege tekenreeks voor tekenreeksvariabelen) . Voor .delete verzoeken, waarden voor niet-HttpGetRequired Variabelen (andere dan de auteur, die vereist is) worden genegeerd.
    * .insert en .delete verzoeken moeten de naam van de auteur en de sleutel van de auteur bevatten via een parameter in de vorm auteur= *auteur\\_toets* als laatste parameter in het verzoek. De eis dat dit laatste moet zijn zorgt ervoor dat het gehele verzoek is ontvangen doorERDDAP. Alleen de auteur (niet de sleutel) wordt opgeslagen in het gegevensbestand. U moet de lijst met toegestane *auteur\\_toets* 's via het globale kenmerk[httpSleutels ophalen](#httpgetkeys)
    * .insert en .delete parameters kunnen scalaar zijn (single) waarden of arrays van enigerlei lengte in de vorm\\[waarde1, waarde2, waarde3,..., waardeN\\]. Voor een gegeven verzoek moeten alle variabelen met arrays arrays met hetzelfde aantal waarden hebben (anders is het een fout) . Als een verzoek scalaire en arraywaarden heeft, worden de scalaire waarden gerepliceerd om arrays te worden met dezelfde lengte als de opgegeven arrays, bijvoorbeeld &stationID=46088 kan worden behandeld als &stationID=\\[46088,46088,46088\\]. Arrays zijn de sleutel tot[hoge doorvoer](#httpget-speed). Zonder arrays, zal het uitdagen om .insert of .delete meer dan 8 rijen van gegevens per seconde van een externe auteur (vanwege alle overhead van het netwerk) . Met arrays is het eenvoudig om meer dan 1000 rijen gegevens per seconde van een externe sensor in te voegen of te verwijderen.
    * .insert en .delete accepteren (zonder foutmelding) zwevende puntnummers wanneer gehele getallen worden verwacht. In deze gevallen rondt de dataset de waarden tot gehele getallen.
    * .insert en .delete accepteren (zonder foutmelding) gehele en zwevende puntnummers die buiten het bereik van het gegevenstype van de variabele liggen. In deze gevallen slaat de dataset de waarden op alsERDDAP's inheemse ontbrekende waarden voor dat gegevenstype (MAX\\_VALUE voor integer types en NaN voor floats en dubbels) .
         
#### Respons{#response} 
Als de .insert of .delete URL slaagt, zal de HTTP response code 200 zijn (OK) en het antwoord zal tekst zijn met een.jsonobject, bijvoorbeeld,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Merk op dat de tijdstempels hebben milliseconde precisie.

Als de .insert of .delete URL mislukt, krijgt u een andere HTTP-responscode dan 200 (Oké.) , bijvoorbeeld, fout 403 Verboden als u een onjuiste auteur\\_sleutel waarde instuurt.ERDDAP™stuurt de HTTP-responscode (niet, bijvoorbeeld, a.jsongeformatteerde fout) omdat dat is hoe dingen worden gedaan op het internet en omdat fouten kunnen optreden overal in het systeem (bijvoorbeeld in het netwerk, dat een HTTP-fout teruggeeft) . Als de fout vanERDDAP™, kan het antwoord enige tekst bevatten (niet.json) met een meer gedetailleerde uitleg van wat er mis ging, maar de HTTP response code (200=Oké, al het andere is problemen) is de juiste manier om te controleren of de .insert of .delete geslaagd. Als het controleren van de HTTP-responscode niet mogelijk is of niet geschikt is, zoek dan naar "status":"succes" in de responstekst die een betrouwbare indicatie van succes moet zijn.
    
#### Logbestanden{#log-files} 
Wanneer EDDTableFromHttpGet .insert en .delete commando's ontvangt, voegt het gewoon de informatie toe aan het relevante bestand in een reeks logbestanden, die elk een tabel zijn die is opgeslagen in een[JSON Lijnen CSV-bestand](https://jsonlines.org/examples/). Wanneer een gebruiker een verzoek om gegevens indient,ERDDAP™leest snel de relevante logbestanden, past de wijzigingen toe op de dataset in de volgorde die ze werden gemaakt, en filtert vervolgens het verzoek via de beperkingen van de gebruiker zoals elke andereERDDAP™gegevensverzoek. De verdeling van de gegevens in verschillende logbestanden, de opslag van verschillende stukken informatie (b.v. het tijdstempel van het commando en of het commando .insert of .delete was) , en verschillende aspecten van de setup van de dataset, alle maken het mogelijk voorERDDAPgegevens op te slaan naar en gegevens uit deze dataset zeer snel en zeer efficiënt op te halen.
     
#### Veiligheid en auteur{#security-and-author} 
Elk commando .insert en .delete moet &auteur= bevatten *auteur\\_toets* als laatste parameter, waarbij auteur\\_sleutel bestaat uit de identificatiecode van de auteur (je hebt gekozen: naam, initialen, pseudoniem, nummer) , een underscore en een geheime sleutel. DeERDDAP™beheerder zal met auteurs samenwerken om de lijst met geldige auteur\\_sleutelwaarden te genereren, die op elk moment gewijzigd kunnen worden.
Wanneer EDDTableFromHttpGet een .insert of .delete commando ontvangt, zorgt het ervoor dat de authorID\\_key de laatste parameter is en geldig. Omdat het de laatste parameter is, geeft het aan dat de gehele opdrachtregel bereikt isERDDAP™en was niet afgekapt. De geheime sleutel zorgt ervoor dat alleen specifieke auteurs gegevens mogen invoegen of verwijderen in de dataset.ERDDAP™dan haalt de authorID en slaat dat op in de auteur variabele, zodat iedereen kan zien wie verantwoordelijk was voor een bepaalde wijziging in de dataset.
.insert en .delete commando's kunnen alleen viahttps:  (veilig)  ERDDAP™Urls. Dit zorgt ervoor dat de informatie die wordt overgedragen tijdens de doorvoer geheim wordt gehouden.
     
#### tijdstempel{#timestamp} 
Als onderdeel van het logsysteem voegt EDDTableFromHttpGet een tijdstempel toe (de tijd datERDDAPontvangen van het verzoek) op elk commando dat het opslaat in de logbestanden. OmdatERDDAP™genereert de tijdstempel, niet de auteurs, het maakt niet uit of verschillende auteurs veranderingen maken van computers met klokken ingesteld op iets andere tijden. Het tijdstempel geeft op betrouwbare wijze aan wanneer de wijziging in de dataset is doorgevoerd.
     
#### HTTP POST{#http-post} 
*   ["En HTTP POST?&#33;"](#http-post)  
HTTP[POST](https://en.wikipedia.org/wiki/POST_(HTTP)) is het betere alternatief (vergeleken metHTTP GET) voor het verzenden van informatie van een client naar een HTTP-server. Als u kunt, of als je echt wilt om de beveiliging te verbeteren, gebruik POST in plaats van GET om de informatie te sturen naarERDDAP. POST is veiliger omdat: met GET enhttps, de URL wordt verzonden op een veilige manier, maar de hele URL (inclusief parameters, inclusief de auteur\\_sleutel) zal geschreven worden aan de Apache, Tomcat, enERDDAP™logbestanden, waar iemand ze kon lezen als de bestanden niet goed beveiligd zijn. Met POST worden de parameters op een veilige manier verzonden en niet naar de logbestanden geschreven. POST is een beetje moeilijker voor klanten om mee te werken en wordt niet zo breed ondersteund door client software, maar programmeertalen ondersteunen het. De inhoud die u via GET of POST naar de dataset stuurt, zal hetzelfde zijn, alleen op een andere manier geformatteerd.
     
#### httpGetRequired Variabelen Global Attribuut{#httpgetrequiredvariables-global-attribute} 
Een essentieel onderdeel van wat dit hele systeem laat werken is het vereiste globale kenmerkhttpGetRequired Variabelen, een door komma's gescheiden lijst van dedataVariablebronnamen die uniek een rij gegevens identificeren. Dit moet zo minimaal mogelijk zijn en zal vrijwel altijd de tijdsvariabele bevatten. Bijvoorbeeld, hier zijn de aanbevolenhttpGetRequired Variabelen voor elk van de[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (Uiteraard kunnen de ID namen anders zijn in uw dataset.) :

* Voor TimeSeries:stationID, tijd
* Voor Trajectory: trajectID, tijd
* Voor profiel: tijd (veronderstelde tijd is het profiel\\_id) , diepte
* Voor Tijdserie Profiel:stationID, tijd (veronderstelde tijd is het profiel\\_id) , diepte
* Voor traject Profiel: trajectID, tijd (veronderstelde tijd is het profiel\\_id) , diepte

    
Het nemen van TimeSeries als voorbeeld:
Gegeven een .insert commando dat omvatstationID2016-06-23T19:53:00Z (en andere waarden voor andere variabelen) :
* Als er geen bestaande gegevens voor dat station en die tijd, dan zal het effect zijn om de gegevens toe te voegen aan de dataset.
* Als er bestaande gegevens voor dat station en die tijd, dan zal het effect zijn om de bestaande rij van gegevens te vervangen door deze nieuwe gegevens. (Natuurlijk, sindsERDDAP™houdt het logboek bij van elk commando dat het ontvangt, de oude gegevens staan nog in het logboek. Als een gebruiker vóór deze wijziging gegevens van een versie van de dataset vraagt, zullen ze de oudere gegevens zien.)   
         
#### httpDirectoryStructure ophalen{#httpgetdirectorystructure} 
*   [httpMap ophalen Structuur Global Attribuut en Gegevens (Log) Bestandsnamen](#httpgetdirectorystructure)  
Een deel van wat dit hele systeem efficiënt laat werken is datERDDAP™een verzameling gegevens aanmaken (log) bestanden, elk met een ander stuk van de dataset. Als deze goed zijn opgezet,ERDDAP™zal snel kunnen reageren op de meeste verzoeken om gegevens. Deze setup wordt gespecificeerd door dehttpGetDirectoryStructure global attribuut, wat een tekenreeks is die lijkt op een relatieve bestandsnaam, bijvoorbeeld, "stationID10 jaar," maar is eigenlijk een specificatie voor de directory structuur. De delen daarvan geven aan hoe directory en bestandsnamen voor de gegevens (log) Er zullen bestanden worden samengesteld.
    
    * Als een deel een geheel getal is (&gt; 1) plus een tijdperiode (milliseconde, tweede, minuut, uur, datum, maand, jaar, of hun meervouden) , bijvoorbeeld, 10 jaar, dan zal de EDDTableFromHttpGet dataset de tijdswaarde voor de rij van gegevens nemen (bv., 2016-06-23T19:53:00Z) Bereken de tot die nauwkeurigheid ingekorte tijd (bv., 2010) , en maak een map of bestandnaam van dat.
        
Het doel is om een redelijk groot stuk data in elk bestand te krijgen, maar veel minder dan 2GB.
        
    * Anders moet het deel van het productdossier eendataVariable'ssourceName, bijvoorbeeld,stationID. In dit geval zal EDDTableFromHttpGet een map of bestandsnaam maken van de waarde van die variabele voor de nieuwe rij gegevens (bv. "46088") .
    
Omdat de .insert en .delete commandogegevens worden opgeslagen in specifieke gegevens (log) bestanden, EDDTableFromHttpGet meestal alleen hoeft te openen een of een paar gegevens (log) bestanden om de gegevens voor een gegeven gebruikersverzoek te vinden. En omdat elke data (log) bestand heeft alle relevante informatie voor zijn brok van de dataset, het is snel en gemakkelijk voor EDDTableFromHttpGet om een specifieke versie te maken (of de huidige versie) van de dataset voor de gegevens in dat bestand (en hoeft niet de gevraagde versie van de volledige dataset te genereren) .
    
Algemene richtsnoeren zijn gebaseerd op de hoeveelheid en frequentie van de gegevens. Als we 100 bytes per rij gegevens aannemen, dan ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Bijvoorbeeld, als de map structuur isstationID/2 maanden en je voegt gegevens van twee stations (46088 en 46155) met tijdwaarden van december 2015 tot mei 2016, EDDtableFromHttp Get zal maken mappen met de naam 46088 en 46155 en maken bestanden in elk genoemd 2015-11.jsonl, 2016-01.jsonl, 2016-03.jsonl, 2016-05.jsonl (elk bedrijf 2 maanden aan gegevens voor het desbetreffende station) . Op elk moment in de toekomst, als u .insert of .delete gebruiken om de gegevens te wijzigen of te verwijderen voor bijvoorbeeld station 46088 op 2016-04-05T14:45:00Z, EDDtableFromHttp Get zal dat commando toevoegen aan 46088/2016-03.jsonl, de relevante gegevens (log) bestand. En het is duidelijk dat het prima is om gegevens toe te voegen voor andere stations op elk moment in de toekomst, aangezien de dataset alleen maar extra directories zal creëren die nodig zijn om de gegevens van de nieuwe stations te bewaren.
    
#### httpSleutels ophalen{#httpgetkeys} 
Elke EDDtabel FromHttp Dataset ophalen moet een globaal kenmerk hebbenhttpGetKeys die de lijst van toegestane auteurs en hun geheime sleutels specificeert als een door komma's gescheiden lijst van *auteur\\_toets* , bijvoorbeeld, JohnSmith\\_someKey1, HOBOLOGGER\\_someKey2, QCScript59\\_someKey3 .
* author\\_key's zijn hoofdlettergevoelig en moeten volledig ASCII-tekens zijn (#33 - #126, en zonder enige komma, " of " karakters
* Sleutels zijn als wachtwoorden, dus ze moeten &gt;8 tekens zijn, moeilijk te raden, en zonder interne woordenboek woorden. Je moet ze behandelen zoals je wachtwoorden zou behandelen - hou ze privé.
* Het eerste '\\_'-teken scheidt de auteur van de sleutel, zodat de auteurnaam geen '\\_'-teken kan bevatten (maar een sleutel kan) .
* Een bepaalde auteur kan een of meer auteur\\_key's hebben, bijvoorbeeld JohnSmith\\_some Sleutel1, JohnSmith\\_some Sleutel7, enz.
* U kunt de waarde van dit attribuut altijd wijzigen. De wijzigingen worden van kracht de volgende keer dat de dataset wordt geladen.
* Deze informatie zal worden verwijderd uit de globale eigenschappen van de dataset voordat deze openbaar wordt gemaakt.
* Elk verzoek aan de dataset om gegevens in te voegen of te verwijderen moet een &auteur= bevatten. *auteur\\_toets* parameter. Na verificatie van de geldigheid van de sleutel,ERDDAP™alleen het auteurgedeelte opslaan (niet de sleutel) in het gegevensbestand.

#### Instellen{#set-up} 

Hier zijn de aanbevolen stappen voor het opzetten van een EDDTableFromHttpGet dataset:

1. Maak de hoofdmap om de data van deze dataset te bewaren. Voor dit voorbeeld gebruiken we /data/testGet/ . De gebruiker die GenerateDatasetsXml en de gebruiker draaitERDDAP™moeten beide lees-schrijf toegang hebben tot deze map.
     
2. Gebruik een teksteditor om een voorbeeld te maken.jsonl CSV bestand met de extensie.jsonIk zit in die map.
De naam is niet belangrijk. Bijvoorbeeld, je zou het voorbeeld kunnen noemen.jsonl
Maak een 2 lijn.jsonl CSV-bestand, met kolomnamen op de eerste regel en dummy/typische waarden (van het juiste gegevenstype) Op de tweede regel. Hier is een voorbeeldbestand dat geschikt is voor een verzameling vanfeatureType=TimeSeries gegevens die lucht en water temperatuur gemeten.
    \\[VoorfeatureType=Trajectory, je zou kunnen veranderenstationIDom trajectID te zijn.\\]  
    \\[VoorfeatureType=Profile, je zou kunnen veranderenstationIDom profielID te zijn en een dieptevariabele toe te voegen.\\]
    
    \\["stationID""time", "breedte," "lengtegraad," "airTemp," "waterTemp," "timestamp," "author," "command"\\]
    \\["myStation," "2018-06-25T17:00:00Z," 0,0, 0,0, 0,0, 0,0, 0,0, "SomeBody," 0\\]
    
Opmerking:
    * De werkelijke data waarden doen er niet toe omdat u uiteindelijk dit bestand te verwijderen, maar ze moeten van het juiste gegevenstype. Met name moet de tijdvariabele hetzelfde formaat gebruiken als de werkelijke gegevens van de bron.
    * Voor alle variabelen:sourceNamezal gelijk zijn aan dedestinationNameGebruik dus nu de juiste/laatste variabele namen, inclusief tijd, breedtegraad, lengtegraad en soms diepte of hoogte indien variabelen met die informatie worden opgenomen.
    * Er zal vrijwel altijd een variabele genaamde tijd zijn die de tijd registreert waarop de observatie werd gemaakt. Het kan dataType String met[eenheden geschikt voor tekenreekstijden](#string-time-units)  (bv.yyyy-MM-dd'T'HH:mm:ss.SSSZ) of gegevens Type dubbel met[eenheden geschikt voor numerieke tijden](#time-units)  (bijvoorbeeld, seconden sinds 1970-01-01T00:00:00Z, of een andere basistijd) .
    * Drie van de kolommen (meestal de laatste drie) moet tijdstempel zijn, auteur, commando.
    * De tijdstempel kolom zal worden gebruikt door EDDTableFromHttpGet om een tijdstempel toe te voegen die aangeeft wanneer het een gegeven regel van gegevens aan het gegevensbestand heeft toegevoegd. Het zal gegevensType dubbele en eenheden seconden sinds 1970-01-01T00:00:00Z.
    * De auteur kolom met dataType String zal worden gebruikt om te registreren welke geautoriseerde auteur verstrekte deze regel gegevens. Geautoriseerde auteurs worden gespecificeerd door de[httpGetKeys global attribuut](#httpgetkeys). Hoewel de sleutels zijn gespecificeerd als *auteur\\_toets* en zijn in de "verzoek" URL in die vorm, alleen de auteur deel wordt opgeslagen in het gegevensbestand.
    * De commandokolom met dataType byte geeft aan of de gegevens op deze regel een invoeging zijn (0) of een schrapping (1) .
         
3. GenererenDatasets uitvoeren Xml en vertel het
    
    1. Het datasettype is EDDTableFromHttpGet
    2. De map is (voor dit voorbeeld) /gegevens/test Get/
    3. Het voorbeeldbestand is (voor dit voorbeeld) /data/testGet/startup.jsonl
    4. DehttpGetRequired Variabelen zijn (voor dit voorbeeld)  stationID, tijd Zie de beschrijving van[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)beneden.
    5. Als de gegevens om de 5 minuten worden verzameld, dehttpGetDirectoryStructure voor dit voorbeeld isstationID/2 maanden . Zie de beschrijving van[httpDirectoryStructure ophalen](#httpgetdirectorystructure)beneden.
    6. De[httpSleutels ophalen](#httpgetkeys)
    
Uitvoer toevoegen (de brok vandatasets.xmlvoor de dataset) totdatasets.xml.
     
4. Bewerk dedatasets.xmlbrok voor deze dataset om het correct en compleet te maken.
Met name, vervangen alle ???? met de juiste inhoud.
     
5. Voor de&lt;fileTableInMemory&gt; instelling:
    * Stel dit in op true als de dataset gewoonlijk frequente .insert en/of .delete verzoeken krijgt (b.v. vaker dan eens per 10 seconden) . Dit helpt EDDTableFromHttpGet sneller reageren op .insert en/of .delete verzoeken. Als je dit op true zet, zal EDDTableFromHttpGet het bestandTable en gerelateerde informatie periodiek opslaan op schijf (indien nodig, ongeveer elke 5 seconden) .
    * Stel dit in op onwaar (de standaard) als de dataset gewoonlijk niet frequent .insert en/of .delete verzoeken zal krijgen (b.v. minder dan eenmaal per 10 seconden) .
         
6. Opmerking: Het is mogelijk om&lt;cacheVanUrl&gt; en gerelateerde instellingen indatasets.xmlvoor EDDtabel FromHttp Krijg datasets als een manier om een lokale kopie van een externe EDDTableFromHttpGet dataset op een andere te maken en te behoudenERDDAP. Echter, in dit geval zal deze lokale dataset verzoeken weigeren .insert en .delete.

#### EDDtabel gebruiken FromHttpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Auteurs kunnen "verzoeken" doen die[gegevens invoegen aan of gegevens verwijderen uit de dataset](#insert-and-delete).
     
* Nadat echte gegevens zijn ingevoegd in de dataset, kunt en moet u het oorspronkelijke steekproefgegevensbestand verwijderen.
     
* Gebruikers kunnen gegevens uit de dataset opvragen zoals ze dat doen voor elke andere EDDTable dataset inERDDAP. Als het verzoek geen beperking bevat op de tijdstempelkolom, dan krijgt het verzoek gegevens van de huidige versie van de dataset (het logbestand na het verwerken van alle invoegen en verwijderen commando's en opnieuw sorteren door dehttpGetRequiredVariables) .
     
* Gebruikers kunnen ook verzoeken doen die specifiek zijn voor EDDTableFromHttpGet datasets:
    * Indien het verzoek een&lt;of&lt;= beperking van de tijdstempelkolom, danERDDAP™verwerkt rijen van het logbestand tot het opgegeven tijdstempel. In feite verwijdert dit tijdelijk alle wijzigingen in de dataset sinds die tijdstempelwaarde. Voor meer informatie, zie[Versie](#versioning).
    * Indien het verzoek een &gt;, &gt;= of = beperking van de tijdstempelkolom bevat, bijvoorbeeld &timestamp&lt;=0, danERDDAP™geeft de gegevens terug van de gegevensbestanden zoals ze zijn, zonder het verwerken van de invoeg- en verwijderopdrachten.
* In de toekomst zien we dat er gereedschappen zullen worden gebouwd. (Door ons? Door jou?) voor het werken met deze datasets. Bijvoorbeeld, er kan een script zijn dat de ruwe logbestanden leest, een andere kalibratievergelijking toepast, en een andere dataset genereert/updatet met die afgeleide informatie. Merk op dat het script kan krijgen de oorspronkelijke gegevens via een verzoek omERDDAP™  (die de gegevens in het bestandsformaat krijgt die het makkelijkst is voor het script om mee te werken) en genereren/updaten van de nieuwe dataset via .insert "verzoeken"ERDDAP. Het script heeft geen directe toegang tot de gegevensbestanden nodig; het kan op een geautoriseerde auteur zijn computer.
     

#### Gedetailleerde informatie over EDDTableFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

De onderwerpen zijn:

*   [Verander de setup niet&#33;](#dont-change-the-setup)
*   [CRUD](#crud)
*   [Ongeldige verzoeken](#invalidrequests)
*   [Snelheid](#httpget-speed)
*   [Robuust](#robust)
*   [Systeembetrouwbaarheid](#system-reliability)
*   [Versie](#versioning)
*   ["En HTTP PUT en DELETE?"](#https-put-and-delete)
*   [Opmerkingen](#httpget-notes)
*   [Dankzij CH VERMELDINGEN voor het basisidee.](#thanks)

Hier is de gedetailleerde informatie:

##### Verander de setup niet&#33;{#dont-change-the-setup} 
Zodra de dataset is aangemaakt en u gegevens hebt toegevoegd:

* Niet toevoegen of verwijderendataVariables.
* Verander desourceNameofdestinationNamevan dedataVariables.
* Verander de gegevens niet SoortdataVariables. Maar je kunt dedataVariable's Metadata.
* Verander dehttpGetRequired Variabelen wereldwijd kenmerk.
* Verander dehttpGetDirectoryStructure globaal kenmerk.

Als je een van deze dingen moet veranderen, maak dan een nieuwe dataset en breng alle gegevens over naar de nieuwe dataset.
     
##### CRUD{#crud} 
In de informatica zijn de vier fundamentele commando's voor het werken met een dataset[Create, Read, Update, Delete (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). SQL, de taal voor het werken met relationele databases, heeft het equivalent in INSERT, SELECT, UPDATE en DELETE. In EDDTableFromHttpGet,

* .insert is een combinatie van CREATE en UPDATE.
* .delete is DELETE.
* Het reguliere systeem voor het aanvragen van subsets van gegevens is READ.

EDDTableFromHttpGet ondersteunt dus alle fundamentele commando's voor het werken met een dataset.
     
* .insert of .delete verzoeken zonder fouten zullen HTTP status code=200 en een JSON object, bijvoorbeeld, teruggeven,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
De twee tijdstempelwaarden verwijzen naar dezelfde milliseconde, de milliseconde die wordt opgeslagen in de tijdstempelvariabele voor de rijen gegevens die zijn ingevoegd of verwijderd.ERDDAP™zal de naam en opmaak van deze sleutel-waarde paren in de toekomst niet veranderen.ERDDAP™kan in de toekomst extra sleutelwaardeparen toevoegen aan het JSON-object.
     
##### Ongeldige verzoeken{#invalidrequests} 
Ongeldige .insert of .delete-verzoeken zullen een HTTP-foutstatuscode anders dan status=200 retourneren en er zal geen wijziging worden aangebracht in de dataset. Dit omvat verzoeken met onjuiste auteur informatie, onjuiste variabele namen, verschillende array lengtes voor verschillende variabelen, ontbrekende vereiste variabelen, ontbrekende vereiste variabele waarden, enz. Als het verzoek meer dan één gegevensbestand betreft, is het mogelijk dat een deel van het verzoek zal slagen en een deel zal mislukken. Dit zou echter geen probleem moeten zijn als de sensor die het verzoek verstuurt een storing als een complete storing behandelt. Bijvoorbeeld, als u verteltERDDAP™invoegen (of verwijderen) dezelfde gegevens twee keer op rij, het ergste geval is dat die informatie wordt opgeslagen twee keer, dicht bij elkaar in het logbestand. Het is moeilijk te zien hoe dat problemen kan veroorzaken.
     
##### HttpGet Speed{#httpget-speed} 
Voor .insert of .delete verzoeken (niet meegerekendhttpoverhead) , ballpark cijfers de snelheid van .insert of .delete zijn
1ms per .invoegen met 1 rij gegevens
2ms per .invoegen met 10 rijen gegevens in arrays (\\[\\])   
3ms per .invoegen met 100 rijen gegevens in arrays (\\[\\])   
13ms per .invoegen met 1000 rijen gegevens in arrays (\\[\\])   
Het is duidelijk dat arrays de sleutel zijn tot[hoge doorvoer](#httpget-speed). Zonder arrays, zal het uitdagen om .insert of .delete meer dan 8 rijen van gegevens per seconde van een externe auteur (vanwege alle overhead van het netwerk) . Met arrays is het eenvoudig om meer dan 1000 rijen gegevens per seconde van een externe sensor in te voegen of te verwijderen.

Met zeer grote hoeveelheden gegevens per aanvraag, zult u Tomcat's limiet op de maximale query lengte (standaard is 8KB?) , maar dat kan worden verhoogd door het bewerken van de maxHttpHeaderSize instelling in uw *kat* /conf/server.xml's HTTP/1.1 Connector ingang.

WanneerERDDAP™leest de JSON Lines CSV gegevens (log) bestanden, er is een kleine tijdstraf in vergelijking met het lezen van binaire gegevensbestanden. We vonden dat deze tijdstraf bij het lezen een redelijke prijs was om te betalen voor de snelheid en robuustheid van het systeem bij het schrijven van gegevens (die van primair belang is) .

##### SSD{#ssd} 
[Voor grotere snelheid,](#ssd)Gebruik a[Solid State Drive (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)de gegevens op te slaan. Ze hebben een veel snellere toegangstijd voor bestanden (&lt;0,1ms) dan harde schijven (3 - 12 ms) . Ze hebben ook een snellere gegevensoverdracht rate (200 - 2500 MB/s) dan harde schijven (~200 MB/s) . Hun kosten zijn de afgelopen jaren aanzienlijk gedaald. Hoewel vroege SSD's problemen hadden na een groot aantal schrijven naar een bepaald blok, is dit probleem nu sterk verminderd. Als je gewoon gebruik maken van de SSD om de gegevens een keer te schrijven dan lees het vele malen, zelfs een consument-grade SSD (die aanzienlijk minder duur is dan een SSD van bedrijfskwaliteit) Het moet lang duren.
    
##### Robuust{#robust} 
We hebben geprobeerd dit systeem zo eenvoudig en robuust mogelijk te maken.
* Het systeem is ontworpen om meerdere draden (b.v. de sensor, een geautomatiseerd QC script en een mens) tegelijkertijd werken aan dezelfde dataset en zelfs hetzelfde bestand. Veel van dit wordt mogelijk gemaakt door het gebruik van een log file benadering om de gegevens op te slaan en door het gebruik van een zeer eenvoudig bestandstype,[JSON Lijnen CSV-bestanden](https://jsonlines.org/examples/), om de gegevens op te slaan.
* Een ander groot voordeel voor JSON Lines CSV is dat als een bestand ooit beschadigd raakt (bv. ongeldig vanwege een fout op een regel) , het is gemakkelijk om het bestand te openen in een teksteditor en het probleem op te lossen.
* Een ander voordeel is, als er een fout op een regel in een bestand, het systeem kan nog steeds alle gegevens op lijnen voor en na de foutregel lezen. En het systeem kan nog steeds log extra .insert en .delete informatie.
* Een enorm voordeel van het gebruik van admin-toegankelijke standaardbestanden (vergeleken met een relationele database of Cassandra of andere software) : Er is geen andere software die moet worden onderhouden en die moet worden uitgevoerd om gegevens op te slaan of op te halen. En het is gemakkelijk om een back-up van standaard bestanden op elk moment en op een incrementele manier omdat de gegevens in stukjes (na een tijdje, zal alleen het huidige-tijd bestand voor elk station veranderen) . Het kost daarentegen veel moeite en tijd om externe back-upbestanden van databases en Cassandra te maken.
         
##### Systeembetrouwbaarheid{#system-reliability} 
Het is redelijk om één server metERDDAP™99,9% uptime -- dat is ongeveer 9 uur stilstand per jaar (Hoewel, je kunt dat gebruiken in een slechte nacht&#33;) .
Als u ijverig en gelukkig bent, kunt u krijgen 99,99% uptime (53 minuten stilstand per jaar) , aangezien slechts een paar herstarten voor updates zal duren dat veel tijd.
Je zou extreme maatregelen moeten nemen. (een aparte back-upserver, onuitwisbare voeding, airconditioning, 24x7x365 personeel om de site te bewaken, enz.) om een kleine kans te hebben op 99,999% uptime (5,25 minuten stilstand per jaar) . Zelfs dan is het zeer onwaarschijnlijk dat je 99,999% uptime zult bereiken (of zelfs 99,99%) Want problemen zijn vaak buiten je controle. Bijvoorbeeld, Amazon Web Service en Google bieden verbazingwekkend betrouwbare webservices, maar grote delen van hen zijn soms neer voor uren.

Geef toe, iedereen wilERDDAP™om 100% uptime te hebben, of tenminste de geprezen "zes negens" (99,9999% uptime is gelijk aan 32 seconden stilstand per jaar) , maar er is geen manier waarop je krijgt het ongeacht hoeveel tijd, inspanning en geld je besteedt.

MaarERDDAP™Uptime is niet het echte doel hier. Het doel is om een betrouwbare **systeem** Eentje die geen gegevens verliest. Dit is een oplosbaar probleem.

De oplossing is: bouw foutentolerantie in de computersoftware die de gegevens naarERDDAP. Specifiek, die software moet een wachtrij van gegevens te houden wachten om te gaanERDDAP. Wanneer gegevens worden toegevoegd aan de wachtrij, moet de software controleren vanERDDAP. Als het antwoord geen gegevens bevat. Geen fouten., dan moet de software de gegevens in de wachtrij. Wanneer meer gegevens worden gegenereerd en toegevoegd aan de wachtrij, moet de software opnieuw proberen om de gegevens in de wachtrij in te voeren (Misschien met de\\[\\]systeem) . Het zal slagen of mislukken. Als het mislukt, zal het later opnieuw proberen. Als je de software op deze manier schrijft en als de software bereid is om een paar dagen aan gegevens in de wachtrij te zetten, heb je eigenlijk een goede kans om 100% van de gegevens van de sensor te uploaden naarERDDAP. En je zult het gedaan hebben zonder grote inspanning of kosten.

\\[Achtergrond: We hebben dit niet bedacht.[Zo bereiken computernetwerken betrouwbaarheid.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) Computernetwerken zijn inherent onbetrouwbaar. Dus wanneer je een bestand van de ene computer naar de andere overbrengt, weet/verwacht de verzendende software dat sommige pakketten verloren kunnen gaan. Als het geen goede erkenning krijgt voor een gegeven pakket van de ontvanger, dan stuurt het het verloren pakket terug. Met deze aanpak kunnen relatief eenvoudige afzender en ontvangersoftware een betrouwbaar bestandsoverdrachtsysteem bouwen bovenop een onbetrouwbaar netwerk.\\]
    
##### Waarom JSON Lines CSV bestanden?&#33;{#why-json-lines-csv-files} 
EDDtabelFromHttpGet toepassingen[JSON Lijnen CSV-bestanden](https://jsonlines.org/examples/). voor het opslaan van de gegevens. De redenen hiervoor zijn:

* De belangrijkste reden is: De eenvoud van JSON Lines CSV-bestanden biedt een snelle, eenvoudige en betrouwbare manier om meerdere threads naar een bepaald bestand te schrijven (Bijvoorbeeld door te synchroniseren op de bestandsnaam) .
* Als een JSON Lines CSV-bestand ooit beschadigd is geraakt (bv. ongeldig vanwege een fout op een regel) , EDDTableFromFromHttpGet kon nog steeds alle gegevens lezen op alle regels voor en na de foutregel. En het .insert en .delete systeem kan doorgaan met het toevoegen van nieuwe gegevens aan het gegevensbestand.
* Omdat de JSON Lines CSV-bestanden zijn ASCII-bestanden, als een bestand ooit beschadigd, zou het gemakkelijk te repareren (in een teksteditor) .
* JSON Lines CSV ondersteunt Unicode snaren.
* JSON Lines CSV ondersteunt tekenreeksen met variabele lengte (niet beperkt tot een maximale lengte) .
* JSON Lines CSV ondersteunt 64-bit gehele getallen (longs) .
* De formele aard en extra syntaxis van JSON Lines CSV (vs old-school CSV) biedt wat extra zekerheid dat een bepaalde lijn niet is beschadigd.

We probeerden aanvankelijk.nc3 bestanden met een onbeperkte dimensie. Er waren echter problemen:

* Het belangrijkste probleem was: Er is geen betrouwbare manier om meerdere threads te laten schrijven naar een.nc3 file, zelfs als de threads samenwerken door de writes op een gesynchroniseerde manier te doen.
* Indien.nc3 bestand wordt beschadigd, het .insert en .delete systeem kan het bestand niet blijven gebruiken.
* Omdat de.nc3 bestanden zijn binair, als een bestand beschadigd raakt (wat ze doen vanwege het multi-threading probleem) ze zijn uiterst moeilijk of onmogelijk te repareren. Er zijn geen gereedschappen om te helpen met de reparatie.
* CF heeft geen manier om de codering van strings op te geven, dus er is geen officiële manier om Unicode te ondersteunen, bijvoorbeeld, de UTF-8 codering. We probeerden CF te krijgen om een \\_Encoding attribuut te ondersteunen maar konden geen vooruitgang boeken. (Unidata, om hun krediet, ondersteunt de \\_Encoding attribuut.) 
*   .nc3 bestanden ondersteunen alleen vaste lengte strings. Nogmaals, we probeerden CF te krijgen enUnidataom tekenreeksen met variabele lengte te ondersteunen maar konden geen vooruitgang boeken.
*   .nc3 bestanden ondersteunen geen eenvoudige manier om enkelvoudige karaktervariabelen te onderscheiden van stringvariabelen. Nogmaals, we probeerden CF te krijgen enUnidataondersteuning van een systeem voor het onderscheiden van deze twee gegevenstypen, maar geen vooruitgang kon boeken.
*   .nc3 bestanden ondersteunen alleen 8-bit tekens met een niet gespecificeerde codering. Nogmaals, we probeerden CF te krijgen enUnidataeen systeem voor het specificeren van de codering ondersteunen, maar geen vooruitgang hebben kunnen boeken.
*   .nc3 bestanden ondersteunen geen 64-bit gehele getallen (longs) . Nogmaals, we probeerden CF te krijgen enUnidataeen systeem van lange duur te steunen, maar geen vooruitgang te boeken.
         
##### Versie{#versioning} 
Omdat EDDTable FromHttp Krijg slaat een log op van alle wijzigingen in de dataset met de tijdstempel en de auteur van elke verandering, het kan die dataset snel opnieuw maken vanaf elk punt in de tijd. In zekere zin is er een versie voor elk moment. Als het verzoek van een gebruiker om gegevens een tijdstempel bevat&lt;= beperking, bijvoorbeeld, & tijdstempel&lt;=2016-06-23T16:32:22.128Z (of elk tijdstip) , maar geen beperking van auteur of commando,ERDDAP™zal reageren op het verzoek door eerst een versie van de dataset te genereren vanaf dat moment. Dan,ERDDAP™past de andere beperkingen van de gebruiker toe, zoals bij elk ander verzoek om gegevens vanERDDAP. EDDTableFromHttpGet is opgezet zodat dit proces zeer snel en efficiënt is, zelfs voor zeer grote datasets.

Op dezelfde manier kan een gebruiker achterhalen wanneer de dataset voor het laatst is bijgewerkt door te vragen ...?timestamp&timestamp=max (tijdstempel) &Onduidelijk () 

En voor elk verzoek om gegevens, voor elke versie van de dataset, kunnen gebruikers zien welke auteur welke wijzigingen heeft aangebracht, en wanneer zij ze hebben gemaakt.

Dit versiesysteem maakt het mogelijk[Reproduceerbare wetenschap](https://en.wikipedia.org/wiki/Reproducibility)omdat iedereen, op elk moment, gegevens kan aanvragen van de versie van de dataset op elk moment. Deze fijnkorrelige versiering is niet mogelijk met een ander systeem dat we kennen. Het onderliggende mechanisme is zeer efficiënt, omdat er geen extra opslagruimte nodig is, en de verwerking overhead is echt minimaal.

Niet iedereen heeft behoefte aan deze fijnkorrelige versiering, maar het is zeer nuttig, misschien noodzakelijk, in het kader van een grote organisatie voor gegevensbeheer. (b.v., OOI, Aardkubus, Data One, enNOAA's NCII) waar een dataset meerdere auteurs kan hebben (b.v. de sensor, een geautomatiseerd QC-script en een menselijke editor) .

\\[Geschiedenis: De behoefte aan dit type versiering kwam voor het eerst voor mij (Bob) bij het lezen en bespreken van OOI in 2008. Op dat moment had OOI een omslachtig, traag, inefficiënt systeem voor versiering op basis van Git. Git is geweldig voor waar het voor ontworpen is, maar niet dit. In 2008, tijdens een OOI-discussie, ontwierp ik een uitgebreid, efficiënt alternatief-naar-OOI-systeem voor datamanagement, waaronder veel van de functies die ik heb toegevoegd aanERDDAP™sindsdien, en inclusief dit versieringssysteem. Op dat moment en sindsdien was OOI toegewijd aan hun versieringssysteem en niet geïnteresseerd in alternatieven. In 2016 vielen andere aspecten van dit plan op zijn plaats en begon ik het uit te voeren. Omdat er veel onderbrekingen waren om aan andere projecten te werken, was ik pas in 2018 klaar. Zelfs nu ben ik me niet bewust van enig ander wetenschappelijk datasysteem dat zulke snelle en gemakkelijke toegang biedt tot een versie van de gegevens vanaf elk moment in de tijd, voor het vaak veranderen van datasets. Eenvoudige bestandssystemen bieden dit niet. Relationele databases niet. Cassandra niet.\\]
    
##### HTTPS Zet en Verwijderen{#https-put-and-delete} 
*   ["En HTTPS Put en DELETE?"](#https-put-and-delete)  
    [Hypertekstoverdrachtprotocol (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)is de basis van het World Wide Web en de reden dat webpagina URL's beginnen met " http://" of " https://" . HTTPS is HTTP met een extra beveiligingslaag. Elke dag maken browsers, scripts en computerprogramma's miljarden HTTP (S)   **Get** verzoeken om informatie van externe bronnen. HTTP (S) omvat ook andere[werkwoorden](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), met name PUT (gegevens naar de server pushen) EN DELETE (naar DELETE gegevens van de server) . Ja, PUT en DELETE zijn de juiste manier om gegevens in te voegen in, en gegevens te verwijderen van, een dataset via HTTP (S) . GET wordt ondersteund door elk stuk software dat kan werken met HTTP (S) . GET is echt makkelijk om mee te werken. Iedereen weet al hoe te werken met GET en velen weten hoe je POST moet gebruiken (die in wezen op dezelfde manier kunnen worden gebruikt als GET) , dus we maakten EDDTableFromHttpGet werk met GET en POST. Zeer weinig mensen (zelfs weinig computerprogrammeurs) ooit met PUT en DELETE hebben gewerkt. PUT en DELETE worden over het algemeen alleen ondersteund door computertalen, dus het gebruik ervan vereist een vakkundig programma. Dus PUT en DELETE zijn meestal een veel lastigere aanpak gezien de manier waarop de tools zijn geëvolueerd.
     
##### HttpGet Notes{#httpget-notes} 
*   [Opmerkingen](#httpget-notes)
    * NeedataVariablekan dataType=char hebben. Gebruik dataType=String in plaats daarvan. Als je echt dataType=char nodig hebt, mail dan Chris. John at noaa.gov .
         
##### Bedankt.{#thanks} 
*   [Dankzij CH VERMELDINGEN voor het basisidee.](#thanks)  
Het basisidee voor EDDTableFromHttpGet (d.w.z. het gebruik van eenHTTP GETverzoek om gegevens toe te voegen aan een dataset) is van UCAR's (NCAR's?)  [Cloud-Hosted Real-time Data Services (VERMELDING) ](https://github.com/earthcubeprojects-chords)project. Het formaat voor de parameters in het verzoek (herhaald *naam=waarde* , gescheiden door &'s) is hetzelfde standaard formaat dat wordt gebruikt door HTML formulieren op webpagina's. Het is een eenvoudig en briljant idee en nog meer omdat het zo perfect metERDDAPhet bestaande systeem voor het verwerken van tabelgegevens. Het idee is achteraf duidelijk, maar ik (Bob) Ik dacht er niet aan. EDDTabelFromHttp Get gebruikt dat basisidee, gecombineerd met onze ideeën over hoe het te implementeren, om een systeem te maken inERDDAP™voor het uploaden van gegevens. Anders dan het basisidee van het gebruik van GET om gegevens in het systeem te duwen, is de EDDTableFromHttpGet implementatie geheel verschillend en volledig onafhankelijk van CH VERMELDING en heeft verschillende functies (b.v., logbestanden, chunking van gegevens, verschillende beveiligingssystemen, CRUD-ondersteuning, reproduceerbaare gegevens) . Onze blootstelling aan CH VERMELDING was slechts een webinar. We keken niet naar hun code of gelezen over hun project omdat we meteen wisten dat we het systeem op een andere manier wilden implementeren. Maar we zijn hen dankbaar voor het basisidee. De volledige verwijzing naar CH VERMELDINGEN is
Daniels, M.D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D.S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) . Cloud-Hosted Real-time Data Services voor de Geowetenschappen (VERMELDING) software. UCAR/NCAR -- Earth Observing Laboratory.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### EDDTabelVanHyraxBestanden{#eddtablefromhyraxfiles} 
[ **EDDTabelVanHyraxBestanden** ](#eddtablefromhyraxfiles)  (verouderd) geaggregeerde gegevensbestanden met verschillende variabelen, elk met een of meer gedeelde dimensies (bijvoorbeeld, tijd, hoogte (of diepte) , breedtegraad, lengtegraad) , en bediend door een[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).

* Dit datasettype is **AFGEGEVEN** . De nieuwere en meer algemene oplossing is het gebruik van de[cache FromUrl optie voor EDDTable FromFiles](#cachefromurl)  (of een variant) , dat maakt een lokale kopie van de remote bestanden en dient de gegevens van de lokale bestanden. De&lt;cacheFromUrl&gt; optie kan worden gebruikt met elk type tabelgegevensbestand. **   
Als je dat niet kunt laten werken om een of andere reden, e-mail Chris. John at noaa.gov .
Indien vóór 2020 geen klachten zijn ingediend, kan dit type gegevensverzameling worden verwijderd. ** 
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
* In de meeste gevallen heeft elk bestand meerdere waarden voor de meest linkse (eerst) dimensie, bijvoorbeeld, tijd.
* De bestanden vaak (maar dat hoeft niet) een enkele waarde hebben voor de andere dimensies (bijvoorbeeld, hoogte (of diepte) , breedtegraad, lengtegraad) .
* De bestanden kunnen karaktervariabelen met een extra dimensie hebben (bijvoorbeeld nCharacters) .
*   Hyraxservers kunnen geïdentificeerd worden door de "/dads-bin/nph-dads/" of "/opendap/" in de URL.
* Deze klasse scherm-scrapes deHyraxwebpagina's met de lijsten van bestanden in elke map. Daarom is het zeer specifiek voor het huidige formaat vanHyraxWebpagina's. We zullen proberen ons aan te passen.ERDDAP™snel als/wanneer toekomstige versies vanHyraxwijzigen hoe de bestanden worden weergegeven.
* De&lt;fileDir&gt;-instelling wordt genegeerd. Sinds deze klasse downloads en maakt een lokale kopie van elk extern gegevensbestand,ERDDAP™dwingt het bestand Dir te zijn *bigParentDirectory* /copy/ *datasetID* /.
* Voor&lt;sourceUrl&gt;, gebruik de URL van de basismap van de dataset in deHyraxserver, bijvoorbeeld,
    &lt;sourceUrl&gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;'sourceUrl&gt;
     (maar zet het op één regel)   (Sorry, die server is niet meer beschikbaar) .
DesourceUrlweb pagina heeft meestal "OPeNDAPServer-index van\\[mapNaam\\]" aan de top.
* Aangezien deze klasse altijd een lokale kopie van elk bestand op afstand downloadt en maakt, moet u deze dataset nooit inpakken[EDDtabelkopie](#eddtablecopy).
* Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.
* Zie de 1D, 2D, 3D en 4D voorbeelden voor[EDDtabelVanNcFiles](#eddtablefromncfiles).
     
### EDDTabelVan ongeldige CRAFiles{#eddtablefrominvalidcrafiles} 
[ **EDDTabelVan ongeldige CRAFiles** ](#eddtablefrominvalidcrafiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .ncbestanden die een specifieke, ongeldige variant van de CF DSG Contiguous Ragged Array gebruiken (CRA) dossiers. HoewelERDDAP™ondersteunt dit bestandstype, het is een ongeldig bestandstype dat niemand zou moeten gebruiken. Groepen die momenteel dit bestandstype gebruiken worden sterk aangemoedigd om te gebruikenERDDAP™om geldige CF DSG CRA bestanden te genereren en te stoppen met het gebruik van deze bestanden.

Bijzonderheden: Deze bestanden hebben meerdere rij\\_grootte variabelen, elk met een sample\\_dimensie attribuut. De bestanden zijn niet-CF-standaard bestanden omdat de meerdere sample (obs) de afmetingen moeten gedecodeerd worden en met elkaar verbonden zijn met deze aanvullende regel en belofte die geen deel uitmaakt van de CF DSG specificatie: "Je kunt een gegeven bv. temperatuurwaarde associëren (temp\\_obs-dimensie) met een gegeven dieptewaarde (z\\_obs dimensie, de dimensie met de meeste waarden) , omdat: de temperatuur rij\\_grootte (voor een gegeven gips) zal 0 of gelijk zijn aan de corresponderende diepte rij\\_grootte (voor die cast)   (Dat is de regel.) . Dus, als de temperatuur rij\\_grootte niet 0 is, dan hebben de n temperatuur waarden voor die gegoten direct betrekking op de n diepte waarden voor die gegoten (Dat is de belofte.) ."

Nog een probleem met deze bestanden: de Principal\\_Inspector row\\_size variabele heeft geen sample\\_dimension attribuut en volgt de bovenstaande regel niet.

Voorbeeldbestanden voor dit datasettype zijn te vinden op https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Deze server is niet meer betrouwbaar beschikbaar\\].

Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.

Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.

Het eerste ding GenererenDatasets Xml doet voor dit type dataset na het beantwoorden van de vragen is de nudump-achtige structuur van het sample bestand afdrukken. Dus als je een paar rare antwoorden invoert voor de eerste lus via GenerateDatasets Xml, je kunt tenminste zien ofERDDAP™kan het bestand lezen en zien welke afmetingen en variabelen in het bestand zitten. Dan kunt u betere antwoorden geven voor de tweede lus via GenerateDatasetsXml.
 
### EDDtabelVanafJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
[ **EDDtabelVanafJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles)geaggregeerde gegevens van[JSON Lijnen CSV-bestanden](https://jsonlines.org/examples/). Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.

* Zoals jsonlines.org zegt, dit formaat is "Beter dan CSV" (En juridisch gezien, als een federale werknemer, kan ik het niet eens of oneens zijn met hen - hoe gek is dat?) . CSV is nooit formeel gedefinieerd en wordt gehinderd door de historische bagage die verband houdt met de verbinding met de oorspronkelijke spreadsheetprogramma's. JSON Lines CSV, in vergelijking, is volledig gedefinieerd en profiteert van de verbinding met de veelgebruikte JSON standaard, die op zijn beurt profiteert van zijn verbinding metJavaScript enJava. Met name is er volledige ondersteuning voor lange gehele getallen en voor Unicode karakters in strings, en een duidelijke manier om andere speciale tekens op te nemen (met name tabbladen en nieuwe regels) Binnen de touwtjes.
    
Dit formaat is vooral goed voor datasets waar u periodiek extra rijen moet toevoegen aan het einde van een gegeven gegevensbestand. Daarom en andere (zie boven) ,[EDDTableFromHttpGet](#eddtablefromhttpget)gebruikt Json Lines CSV-bestanden voor gegevensopslag.
    
* De invoerbestanden worden verondersteld te zijn UTF-8 gecodeerd. Echter, gezien de \\u *dddd* formaat voor het coderen van speciale tekens (\\u20ac is bijvoorbeeld de codering voor het Euroteken) , je hebt de optie om de bestanden te schrijven, zodat ze slechts 7-bit ASCII tekens bevatten met behulp van \\u *dddd* om alle tekens boven #127 te coderen.
     
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
    
Het eerste wat GenererenDatasetsXml doet voor dit type dataset nadat u de vragen beantwoordt is de nudump-achtige structuur van het sample bestand afdrukken. Dus als je een paar rare antwoorden invoert voor de eerste lus via GenerateDatasets Xml, je kunt tenminste zien ofERDDAP™kan het bestand lezen en zien welke afmetingen en variabelen in het bestand zitten. Dan kunt u betere antwoorden geven voor de tweede lus via GenerateDatasetsXml.
    
* WAARSCHUWING: WanneerERDDAP™leest JSON Lijnen CSV-gegevensbestanden, als het een fout op een bepaalde regel vindt (bv. onjuist aantal items) , het logt een waarschuwingsbericht (Slechte lijn. (s) van gegevens" ... met een lijst van de slechte regels op de volgende regels) aan de[log.txt-bestand](/docs/server-admin/additional-information#log)en dan de rest van het gegevensbestand blijft lezen. Dus, het is uw verantwoordelijkheid om regelmatig te kijken (of schrijf een script om dit te doen) voor dat bericht in het logboek. txt zodat u de problemen in de gegevensbestanden kunt oplossen.ERDDAP™is ingesteld op deze manier zodat gebruikers kunnen blijven lezen van alle beschikbare geldige gegevens, hoewel sommige regels van het bestand gebreken hebben.
     
### EDDtabelVanMultidimNcFiles{#eddtablefrommultidimncfiles} 
[ **EDDtabelVanMultidimNcFiles** ](#eddtablefrommultidimncfiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .nc  (of[.ncml](#ncml-files)) bestanden met verschillende variabelen, elk met een of meer gedeelde dimensies. De bestanden kunnen karaktervariabelen hebben met of zonder extra dimensie (bijvoorbeeld, STRING14) . Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.

* Als de bestanden zijn multidimensionale CF DSG varianten, gebruik dit dataset type in plaats van[EDDtabelVanNcCFFiles](#eddtablefromncfiles).
     
* Voor nieuwe tabeldatasets van.ncbestanden, gebruik deze optie voordat u de oudere probeert[EDDtabelVanNcFiles](#eddtablefromncfiles). Enkele voordelen van deze klasse zijn:
    * Deze klasse kan meer variabelen lezen uit een grotere verscheidenheid aan bestandsstructuren. Als u DimensionsCSV opgeeft (een door komma's gescheiden lijst van dimensienamen) in GenererenDatasets Xml (of&lt;afmetingenCSV&gt; in dedatasets.xmlinformatie voor een van deze datasets), danERDDAP™zal alleen variabelen lezen in de bronbestanden die sommige of al deze dimensies gebruiken, plus alle scalaire variabelen. Als een dimensie in een groep zit, moet je de volledige naam opgeven, bijvoorbeeld " *groepNaam/dimensienaam* "
    * Deze klasse kan vaak bestanden zeer snel weigeren als ze niet overeenkomen met de beperkingen van een verzoek. Dus het lezen van gegevens uit grote collecties zal vaak veel sneller gaan.
    * Deze klasse behandelt echte tekensvariabelen (niet-tekenreeksvariabelen) Juist.
    * Deze klasse kan String-variabelen trimmen wanneer de maker Netcdf-java's schrijfstrings niet heeft gebruikt (die teken #0 toevoegt om het einde van de tekenreeks te markeren) .
    * Deze klasse is beter in het omgaan met individuele bestanden die bepaalde variabelen of dimensies missen.
    * Deze klasse kan blokken rijen verwijderen met ontbrekende waarden zoals opgegeven voor[CF Discrete bemonsteringsgeometrie (DSG) Onvolledige multidimensionale bestanden](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
    
Het eerste wat GenererenDatasetsXml doet voor dit type dataset nadat u de vragen beantwoordt is de nudump-achtige structuur van het sample bestand afdrukken. Dus als je een paar rare antwoorden invoert voor de eerste lus via GenerateDatasets Xml, je kunt tenminste zien ofERDDAP™kan het bestand lezen en zien welke afmetingen en variabelen in het bestand zitten. Dan kunt u betere antwoorden geven voor de tweede lus via GenerateDatasetsXml.
    
Groep -- GenererenDatasets Xml zal om een "Groep" vragen. U kunt invoeren "" om het te laten zoeken op elke / alle groepen, " *enkele Groep* " of " *enige groep/sommigesubgroep* "om het een specifieke groep te laten doorzoeken, of "\\[root\\]" om het alleen de wortelgroep te laten doorzoeken. De tekenreeks "Groep" wordt&lt;groep&gt; in dedatasets.xmlinfo voor de dataset (hoewel "\\[root\\]"wordt "") .
    
AfmetingenCSV -- GenererenDatasets Xml vraagt om een "DimensionsCSV" string. Dit is een komma-gescheiden-waarde lijst van bronnamen van een reeks dimensies. GenererenDatasets Xml leest alleen gegevensvariabelen in monster.ncbestanden die enkele of al die dimensies gebruiken (en geen andere afmetingen) , plus alle scalaire variabelen in het bestand, en maak de dataset van die gegevensvariabelen. Als een dimensie in een groep zit, moet je de volledige naam opgeven, bijvoorbeeld " *groepNaam/dimensienaam* "
Als u niets opgeeft (een lege tekenreeks) , GenererenDatasets Xml zal zoeken naar de variabelen met de meeste dimensies, op de theorie dat ze de meest interessante zullen zijn, maar er kunnen momenten zijn waarop je een dataset wilt maken van een andere groep van gegevensvariabelen die een andere groep van dimensies gebruikt.
Als je gewoon een dimensienaam opgeeft die niet bestaat (bv. NO\\_MATCH) ,ERDDAP™zal gewoon alle scalaire variabelen vinden.
De "DimensionsCSV" string wordt&lt;afmetingenCSV&gt; in dedatasets.xmlinfo voor de dataset.
    
#### behandelde afmetingenAs{#treatdimensionsas} 
Er is een categorie ongeldig.ncbestanden (omdat ze de CF regels niet volgen) die meerdere dimensies hebben (b.v., lat, lon, time) wanneer ze maar één dimensie hadden moeten gebruiken (bv. tijd) , bijvoorbeeld:
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
EDDTableFromMultidimNcFiles heeft een speciale functie om met deze bestanden om te gaan: als u de globale eigenschap "TreatDimensionsAs" toevoegt aan de datasets globaladdAttributes, kun je zienERDDAP™om bepaalde afmetingen te behandelen (b.v. lat en lat) Alsof ze een andere dimensie hebben. (bv. tijd) . De attribuutwaarde moet een door een komma gescheiden lijst zijn die de "van" dimensies en vervolgens de "naar" dimensie, bijvoorbeeld, aangeeft,
<att name="treatDimensionsAs">lat, lon, time</att>  
DanERDDAP™leest het bestand alsof het:
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
Natuurlijk moet de huidige grootte van elk van de afmetingen in de lijst gelijk zijn; anders,ERDDAP™zal het bestand behandelen als een "Bad File."

Merk op dat deze bestanden ongeldig zijn omdat ze geen CF-regels volgen. Dus zelfs alERDDAP™kunnen ze lezen, raden we sterk aan dat u niet bestanden als deze te maken, omdat andere CF-gebaseerde software tools zal niet in staat zijn om ze correct te lezen. Als u dergelijke bestanden al hebt, raden we aan ze zo snel mogelijk te vervangen door geldige bestanden.
    
### EDDtabelVanNcFiles{#eddtablefromncfiles} 
[ **EDDtabelVanNcFiles** ](#eddtablefromncfiles)geaggregeerde gegevens vanNetCDF  (v3 of v4)  .nc  (of[.ncml](#ncml-files)) bestanden en[Zarr](https://github.com/zarr-developers/zarr-python)bestanden (vanaf versie 2.25) met verschillende variabelen, elk met één gedeelde dimensie (bijvoorbeeld, tijd) of meer dan één gedeelde dimensie (bijvoorbeeld, tijd, hoogte (of diepte) , breedtegraad, lengtegraad) . De bestanden moeten dezelfde dimensienamen hebben. Een gegeven bestand kan meerdere waarden hebben voor elk van de dimensies en de waarden kunnen verschillen in verschillende bronbestanden. De bestanden kunnen karaktervariabelen met een extra dimensie hebben (bijvoorbeeld, STRING14) . Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.

Zarr-bestanden hebben iets anders gedrag en vereisen ofwel het bestandNameRegex of het padRegex om "zarr" op te nemen.

* Indien de.ncbestanden gebruiken een van de[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)bestandsformaten, probeer het gebruik[EDDtabelVanNcCFFiles](#eddtablefromncfiles)voordat je dit probeert.
     
* Voor nieuwe tabeldatasets van.ncbestanden, probeer de nieuwere[EDDtabelVanMultidimNcFiles](#eddtablefrommultidimncfiles)Eerst.
     
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
    
Het eerste wat GenererenDatasetsXml doet voor dit type dataset nadat u de vragen beantwoordt is de nudump-achtige structuur van het sample bestand afdrukken. Dus als je een paar rare antwoorden invoert voor de eerste lus via GenerateDatasets Xml, je kunt tenminste zien ofERDDAP™kan het bestand lezen en zien welke afmetingen en variabelen in het bestand zitten. Dan kunt u betere antwoorden geven voor de tweede lus via GenerateDatasetsXml.
    
AfmetingenCSV -- GenererenDatasets Xml vraagt om een "DimensionsCSV" string. Dit is een komma-gescheiden-waarde lijst van bronnamen van een reeks dimensies. GenererenDatasets Xml zal de gegevensvariabelen vinden in de.ncbestanden die sommige of al die dimensies gebruiken, plus alle scalaire variabelen, en maak de dataset van die gegevensvariabelen. Als u niets opgeeft (een lege tekenreeks) , GenererenDatasets Xml zal zoeken naar de variabelen met de meeste dimensies, op de theorie dat ze de meest interessante zullen zijn, maar er kunnen momenten zijn waarop je een dataset wilt maken van een andere groep van gegevensvariabelen die een andere groep van dimensies gebruikt.
    
* 1D Voorbeeld: 1D bestanden zijn enigszins verschillend van 2D, 3D, 4D, ... bestanden.
    * Je hebt misschien een set van.ncgegevensbestanden waar elk bestand een maand aan gegevens heeft van één drijvende boei.
    * Elk bestand heeft 1 dimensie, bijvoorbeeld tijd (grootte =\\[veel\\]) .
    * Elk bestand heeft één of meer 1D variabelen die die dimensie gebruiken, bijvoorbeeld tijd, lengte, breedtegraad, luchttemperatuur, ....
    * Elk bestand kan 2D-tekenvariabelen hebben, bijvoorbeeld met afmetingen (time,nCharacters) .
         
* 2D voorbeeld:
    * Je hebt misschien een set van.ncgegevensbestanden waar elk bestand een maand aan gegevens heeft van één drijvende boei.
    * Elk bestand heeft 2 dimensies, bijvoorbeeld tijd (grootte =\\[veel\\]) en id (grootte = 1) .
    * Elk bestand heeft 2 1D variabelen met dezelfde namen als de dimensies en met dezelfde naam dimensie, bijvoorbeeld tijd (tijd) , id (id) . Deze 1D variabelen moeten worden opgenomen in de lijst van&lt;dataVariable&gt; zit in de XML van de dataset.
    * Elk bestand heeft een of meer 2D variabelen, bijvoorbeeld lengte, breedtegraad, luchttemperatuur, watertemperatuur, ...
    * Elk bestand kan 3D-tekenvariabelen hebben, bijvoorbeeld met afmetingen (tijd,id,nCharacters) .
         
* 3D voorbeeld:
    * Je hebt misschien een set van.ncgegevensbestanden waar elk bestand een maand aan gegevens heeft van één stationaire boei.
    * Elk bestand heeft 3 dimensies, bijvoorbeeld tijd (grootte =\\[veel\\]) , lat (grootte = 1) en (grootte = 1) .
    * Elk bestand heeft 3 1D variabelen met dezelfde namen als de dimensies en met dezelfde naam dimensie, bijvoorbeeld tijd (tijd) , lat (lat) rd (er) . Deze 1D variabelen moeten worden opgenomen in de lijst van&lt;dataVariable&gt; zit in de XML van de dataset.
    * Elk bestand heeft een of meer 3D variabelen, bijvoorbeeld luchttemperatuur, watertemperatuur, ...
    * Elk bestand kan 4D karaktervariabelen hebben, bijvoorbeeld met afmetingen (time,lat,lon,nCharacters) .
    * De naam van het bestand kan de naam van de boei bevatten.
         
* 4D voorbeeld:
    * Je hebt misschien een set van.ncgegevensbestanden waar elk bestand een maand aan gegevens van één station heeft. Op elk moment neemt het station metingen op een aantal diepten.
    * Elk bestand heeft 4 dimensies, bijvoorbeeld tijd (grootte =\\[veel\\]) , diepte (grootte =\\[veel\\]) , lat (grootte = 1) en (grootte = 1) .
    * Elk bestand heeft 4 1D variabelen met dezelfde namen als de dimensies en met dezelfde naam dimensie, bijvoorbeeld tijd (tijd) , diepte (diepte) , lat (lat) rd (er) . Deze 1D variabelen moeten worden opgenomen in de lijst van&lt;dataVariable&gt; zit in de XML van de dataset.
    * Elk bestand heeft een of meer 4D variabelen, bijvoorbeeld luchttemperatuur, watertemperatuur, ...
    * Elk bestand kan 5D karaktervariabelen hebben, bijvoorbeeld met afmetingen (time,depth,lat,lon,nCharacters) .
    * De naam van het bestand kan de naam van de boei bevatten.
         
### EDDtabelVanNcCFFiles{#eddtablefromnccffiles} 
[ **EDDtabelVanNcCFFiles** ](#eddtablefromnccffiles)gegevens over aggregatenNetCDF  (v3 of v4)  .nc  (of[.ncml](#ncml-files)) bestanden die gebruik maken van een van de bestandsformaten die door de[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)conventies. Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.

Voor bestanden met behulp van een van de multidimensionale CF DSG varianten, gebruik[EDDtabelVanMultidimNcFiles](#eddtablefrommultidimncfiles)In plaats daarvan.

De CF DSG conventies definieert tientallen bestandsformaten en bevat tal van kleine variaties. Deze klasse behandelt alle variaties die we kennen, maar we hebben er misschien één gemist. (of meer) . Dus als deze klasse geen gegevens van uw CF DSG-bestanden kan lezen, alstublieft[extra steun uit te reiken](/docs/intro#support).

Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
 
### EDDtabelVanNccsvFiles{#eddtablefromnccsvfiles} 
[ **EDDtabelVanNccsvFiles** ](#eddtablefromnccsvfiles)geaggregeerde gegevens van[NCCSV](/docs/user/nccsv-1.00)ASCII .csv bestanden. Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.

* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
    
Het eerste wat GenererenDatasetsXml doet voor dit type dataset nadat u de vragen beantwoordt is de nudump-achtige structuur van het sample bestand afdrukken. Dus als je een paar rare antwoorden invoert voor de eerste lus via GenerateDatasets Xml, je kunt tenminste zien ofERDDAP™kan het bestand lezen en zien welke afmetingen en variabelen in het bestand zitten. Dan kunt u betere antwoorden geven voor de tweede lus via GenerateDatasetsXml.
    
* WAARSCHUWING: WanneerERDDAP™leest NCCSV-gegevensbestanden, als het een fout op een bepaalde regel vindt (bv. onjuist aantal items) , het logt een waarschuwingsbericht (Slechte lijn. (s) van gegevens" ... met een lijst van de slechte regels op de volgende regels) aan de[log.txt-bestand](/docs/server-admin/additional-information#log)en dan de rest van het gegevensbestand blijft lezen. Dus, het is uw verantwoordelijkheid om regelmatig te kijken (of schrijf een script om dit te doen) voor dat bericht in het logboek. txt zodat u de problemen in de gegevensbestanden kunt oplossen.ERDDAP™is ingesteld op deze manier zodat gebruikers kunnen blijven lezen van alle beschikbare geldige gegevens, hoewel sommige regels van het bestand gebreken hebben.
     
### EDDTableFromNOS{#eddtablefromnos} 
[ **EDDTableFromNOS** ](#eddtablefromnos)  (AFGEGEVEN) verwerkt gegevens van eenNOAA [NOS](https://opendap.co-ops.nos.noaa.gov/axis/)bron, die gebruikt[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)voor verzoeken en antwoorden. Het is zeer specifiek voorNOAANOS's XML. Zie de EDDTableFromNOS dataset in datasets2.xml.
 
### EDDTabelFromOBIS{#eddtablefromobis} 
[ **EDDTabelFromOBIS** ](#eddtablefromobis)verwerkt gegevens van een Ocean Biogeografisch Informatiesysteem (OBIS) server (was http://www.iobis.org  ) . Het is mogelijk dat er geen actieve servers meer zijn die dit verouderde type OBIS-serversysteem gebruiken.

* OBIS-servers verwachten een XML-verzoek en geven een XML-antwoord terug.
* Omdat alle OBIS-servers dezelfde variabelen op dezelfde manier bedienen (was http://iobis.org/tech/provider/questions ) , je hoeft niet veel op te geven om een OBIS dataset in te stellenERDDAP.
* U MOET een "creator\\_email" attribuut in de globaleaddAttributes, aangezien die informatie binnen de licentie wordt gebruikt. Een geschikt e-mailadres kan gevonden worden door het XML antwoord van de bronURL te lezen.
* Je kan wel of niet in staat zijn om de globale eigenschap te krijgen [&lt;subsetVariables&gt;] (#subsetvariabelen) werken met een bepaalde OBIS-server. Probeer één variabele (bijvoorbeeld, ScientificName of Genus) .
#### EDDTabelFromOBIS skelet XML{#eddtablefromobis-skeleton-xml} 
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

### EDDtabelVanParquetFiles{#eddtablefromparquetfiles} 
[ **EDDtabelVanParquetFiles** ](#eddtablefromparquetfiles)verwerkt gegevens van[Parket](https://parquet.apache.org/). Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.

* Parket is ontworpen om zeer efficiënt comprimeren, dus het kan u kleinere bestandsgroottes dan andere formaten.
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
* WAARSCHUWING: WanneerERDDAP™leest Parquet-gegevensbestanden, als het vindt een fout op een bepaalde regel (bv. onjuist aantal items) , het logt een waarschuwingsbericht (Slechte lijn. (s) van gegevens" ... met een lijst van de slechte regels op de volgende regels) aan de[log.txt-bestand](/docs/server-admin/additional-information#log)en dan de rest van het gegevensbestand blijft lezen. Dus, het is uw verantwoordelijkheid om regelmatig te kijken (of schrijf een script om dit te doen) voor dat bericht in het logboek. txt zodat u de problemen in de gegevensbestanden kunt oplossen.ERDDAP™is ingesteld op deze manier zodat gebruikers kunnen blijven lezen van alle beschikbare geldige gegevens, hoewel sommige regels van het bestand gebreken hebben.
     
### EDDTabelVanSOS {#eddtablefromsos} 
[ **EDDTabelVanSOS** ](#eddtablefromsos)verwerkt gegevens van een sensorobservatiedienst (SWE/[SOS](https://www.ogc.org/standards/sos)) server.

* Dit datasettype aggregeert gegevens van een groep stations die allemaal door één worden bediendSOSserver.
* De stations dienen allemaal dezelfde set variabelen (Hoewel de bron voor elk station niet alle variabelen hoeft te dienen) .
*   SOSservers verwachten een XML-verzoek en geven een XML-antwoord terug.
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen. Het is niet eenvoudig om de dataset XML te genereren voorSOSdatasets met de hand. Om de benodigde informatie te vinden, moet u een bezoeksourceUrl+"? service=SOS&verzoek=GetCapabilities" in een browser; kijk naar de XML; maak een GetObservation verzoek met de hand; en kijk naar het XML antwoord op het verzoek.
* Met de incidentele toevoeging van nieuwe soorten vanSOSservers en wijzigingen aan de oude servers, het wordt steeds moeilijker voorERDDAP™om automatisch het servertype op te sporen van de antwoorden van de server. Het gebruik&lt;sosServerType&gt; (met een waarde van IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, of WHI) is nu sterk aanbevolen. Als u problemen heeft met een dataset van dit type, probeer het opnieuw draaien GenererenDatasets Xml voor deSOSserver. Genereren Datasets Xml laat je de verschillende testen&lt;sosServerType&gt; opties totdat u de juiste voor een bepaalde server vindt.
*   SOSoverzicht:
    * SWE (Sensor Web-enablement) enSOS  (Sensorwaarnemingsdienst) zijn[OpenGIS®-normen](https://www.ogc.org/standards). Die website heeft de standaarddocumenten.
    * DeOGCWeb Services Common Specification ver 1.1.0 (OGC06-121r3) dekt de bouw van GET en POST queries (zie rubriek 7.2.3 en rubriek 9) .
    * Als u een getCapabilities xml verzoek naar eenSOSserver (sourceUrl+ "?service=SOS&verzoek=GetCapabilities") , krijg je een xml resultaat met een lijst van stations en de waargenomen Eigenschappen waar ze gegevens voor hebben.
    * Een waargenomen Eigenschap is een formele URI verwijzing naar een eigenschap. Bijvoorbeeld, urn:ogc:fenomenon:longitude:wgs84 of https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * Een waargenomen eigendom is geen variabele.
    * Meer dan één variabele kan dezelfde waargenomen hebben Eigenschap (bijvoorbeeld binnenTemp en buiten Temp kan beide waargenomen hebben Eigenschap https://mmisw.org/ont/cf/parameter/air\\_temperature ) .
    * Als u een getObservation xml verzoek naar eenSOSserver, je krijgt een xml resultaat met beschrijvingen van veldnamen in de respons, veldeenheden, en de gegevens. De veldnamen omvatten lengte, breedtegraad, diepte (Misschien) , en tijd.
    * ElkdataVariablevoor een EDDTableVanSOSmoet een "observedProperty" attribuut bevatten, dat de waargenomenEigenschap identificeert die van de server moet worden gevraagd om die variabele te krijgen. Vaak, meerderedataVariables zal dezelfde samengestelde waargenomen Property.
    * Het gegevenstype voor elkdataVariablemag niet worden opgegeven door de server. Zo ja, dan moet je kijken naar de XML data responses van de server en passende toewijzen [&lt;dataType&gt;s] (#datatype) in deERDDAP™datasetdataVariabledefinities.
    *    (Ten tijde van het schrijven van dit) enkeleSOSservers reageren op getObservation verzoeken voor meer dan één waargenomen Eigendom door enkel het teruggeven van resultaten voor de eerste van de waargenomenEigenschappen. (Geen foutmelding&#33;) Zie het verzoek voor de constructorparameter Observeerde EigenschappenSeparaat.
* EDDTabelVanSOSautomatisch toevoegt
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
naar de globale eigenschappen van de dataset wanneer de dataset wordt aangemaakt.
*   SOSservers drukken meestal[eenheden](#units)met de[UCUM](https://unitsofmeasure.org/ucum.html)systeem. De meesteERDDAP™servers express eenheden met de[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)systeem. Als u wilt converteren tussen de twee systemen, kunt u[ERDDAP's webservice om UCUM-eenheden te converteren naar/vanUDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### EDDTabelVanSOSskelet XML{#eddtablefromsos-skeleton-xml} 
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

### EDDtableFromDreddsFiles{#eddtablefromthreddsfiles} 
[ **EDDtableFromDreddsFiles** ](#eddtablefromthreddsfiles)  (verouderd) geaggregeerde gegevensbestanden met verschillende variabelen, elk met een of meer gedeelde dimensies (bijvoorbeeld, tijd, hoogte (of diepte) , breedtegraad, lengtegraad) , en bediend door een[THREDDSOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).

* Dit datasettype is **AFGEGEVEN** . De nieuwere en meer algemene oplossing is het gebruik van de[cache FromUrl optie voor EDDTable FromFiles](#cachefromurl)  (of een variant) , dat maakt een lokale kopie van de remote bestanden en dient de gegevens van de lokale bestanden. De&lt;cacheFromUrl&gt; optie kan worden gebruikt met elk type tabelgegevensbestand van elke web-gebaseerde bron die een directory-achtige lijst van bestanden publiceert. **   
Als je dat niet kunt laten werken om een of andere reden, e-mail Chris. John at noaa.gov .
Indien vóór 2020 geen klachten zijn ingediend, kan dit type gegevensverzameling worden verwijderd. ** 
* Wij raden het gebruik van de[GenererenDatasets Xml-programma](#generatedatasetsxml)om een ruwe ontwerp van dedatasets.xmlbrok voor deze dataset. Je kunt dat dan aanpassen om het fijn af te stemmen.
* In de meeste gevallen heeft elk bestand meerdere waarden voor de meest linkse (eerst) dimensie, bijvoorbeeld, tijd.
* De bestanden vaak (maar dat hoeft niet) een enkele waarde hebben voor de andere dimensies (bijvoorbeeld, hoogte (of diepte) , breedtegraad, lengtegraad) .
* De bestanden kunnen karaktervariabelen met een extra dimensie hebben (bijvoorbeeld nCharacters) .
* THREDDS servers kunnen worden geïdentificeerd door de "/thredds/" in de URL's. Bijvoorbeeld,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* THREDDS servers hebben catalogi op verschillende plaatsen. Deze klasse vereist dat de URL "/thredds/catalog/" bevat. U kunt deze variabele meestal vinden door te beginnen in een browser in de hoofdcatalogus, en vervolgens door te klikken naar de gewenste subcatalogus.
* Deze klasse leest de catalogus.xml bestanden geserveerd door THredDS met de lijsten van&lt;catalogusRefs&gt; (verwijzingen naar extra catalogus.xml subbestanden) en&lt;dataset&gt;s (gegevensbestanden) .
* De&lt;fileDir&gt;-instelling wordt genegeerd. Sinds deze klasse downloads en maakt een lokale kopie van elk extern gegevensbestand,ERDDAP™dwingt het bestand Dir te zijn *bigParentDirectory* /copy/ *datasetID* /.
* Voor&lt;sourceUrl&gt;, gebruik de URL van het catalogus.xml bestand voor de dataset in de THREDDS server, bijvoorbeeld: voor deze URL die kan worden gebruikt in een webbrowser,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Deze server is niet meer betrouwbaar beschikbaar.\\],
gebruik&lt;sourceUrl&gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;'sourceUrl&gt;
     (maar zet het op één regel) .
* Aangezien deze klasse altijd een lokale kopie van elk bestand op afstand downloadt en maakt, moet u deze dataset nooit inpakken[EDDtabelkopie](#eddtablecopy).
* Dit datasettype ondersteunt een OPTIONAL, zelden gebruikte, speciale tag,&lt;specialMode&gt; *modus* &lt;/specialMode&gt; die kan worden gebruikt om aan te geven dat speciale, hard gecodeerde regels moeten worden gebruikt om te bepalen welke bestanden van de server moeten worden gedownload. Momenteel is de enige geldige *modus* is SAMOS dat wordt gebruikt met datasets van https://tds.coaps.fsu.edu/thredds/catalog/samos alleen de bestanden met het laatste versienummer downloaden.
* Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor informatie over hoe deze klasse werkt en hoe deze te gebruiken.
* Zie de 1D, 2D, 3D en 4D voorbeelden voor[EDDtabelVanNcFiles](#eddtablefromncfiles).
     
### EDDTabelVanWFSBestanden{#eddtablefromwfsfiles} 
[ **EDDTabelVanWFSBestanden** ](#eddtablefromwfsfiles)  (AFGEGEVEN) maakt een lokale kopie van alle gegevens van eenArcGISKaartserverWFSserver zodat de gegevens dan snel kunnen worden opgeslagen naarERDDAP™gebruikers.

* U moet een speciaal geformatteerdesourceUrlglobal attribuut te vertellenERDDAP™hoe de functie informatie van de server te vragen. Gebruik dit voorbeeld als sjabloon:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (maar zet het allemaal op één lijn) 
* U moet een speciale globale attribuut toe te voegen om te vertellenERDDAP™hoe om de namen van de brokken van gegevens die moeten worden gedownload te identificeren. Dit zal waarschijnlijk werken voor alle EDDTableVanWFSBestandsdatasets:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Aangezien deze klasse altijd een lokale kopie van elk bestand op afstand downloadt en maakt, moet u deze dataset nooit inpakken[EDDtabelkopie](#eddtablecopy).
* Zie de superklasse van deze klas,[EDDTableFromFiles](#eddtablefromfiles), voor aanvullende informatie over hoe deze klasse werkt en hoe deze te gebruiken.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
[ **EDDTableAggregateRows** ](#eddtableaggregaterows)kan een EDDTable dataset maken van een groep "kind" EDDTable datasets.

* Hier zijn enkele toepassingen voor EDDTableAggregateRows:
    * Je zou een EDDTableAggregateRows dataset kunnen maken van twee verschillende soorten bestanden of gegevensbronnen, bijvoorbeeld, een dataset met gegevens tot het einde van vorige maand opgeslagen in.ncCF-bestanden en een dataset met gegevens voor de huidige maand opgeslagen in een relationele database.
    * U kunt een EDDTableAggregateRows dataset maken om een verandering in bronbestanden te verwerken (bijvoorbeeld, het tijdsformaat veranderd, of een variabele naam veranderd, of gegevens Type/scale\\_factor'add\\_offsetgewijzigd) . In dit geval zou een kind gegevens uit bestanden die voor de wijziging en het andere kind zou krijgen gegevens uit bestanden na de wijziging. Dit gebruik van EDDTableAggregateRows is een alternatief voor het gebruik[NcML](#ncml-files)of[NCO](#netcdf-operators-nco). Tenzij er een onderscheidende eigenschap in de bestandsnamen (zodat u kunt gebruiken&lt;fileNameRegex&gt; om te bepalen tot welke kindset behoort, moet u waarschijnlijk de bestanden voor de twee kinddatasets in verschillende mappen opslaan.
    * Je zou een EDDTableAggregateRows-dataset kunnen maken met een gedeelde subset van variabelen van een of meer vergelijkbare maar verschillende datasets, bijvoorbeeld een dataset die een Profile dataset maakt van de combinatie van een Profile dataset, een TimeSeriesProfile dataset, en een TrajectoryProfile dataset (die een aantal verschillende variabelen en enkele variabelen gemeen hebben -- in dat geval moet je speciale varianten maken voor de kinddatasets, met alleen de in-common variabelen) .
    * Je zou verschillende standalone datasets kunnen hebben, elk met hetzelfde type data maar van een ander station. Je kunt die datasets intact laten, maar ook een EDDTableAggregateRows-dataset maken met gegevens van alle stations -- elk van de datasets van het kind kan eenvoudig zijn[EDDtabelVanErdap](#eddfromerddap), die verwijst naar een van de bestaande stationsdatasets. Als je dit doet, geef dan elk van de EDDTableFromErdap datasets een anderedatasetIDdan de originele standalone datasets, bijvoorbeeld door "Child" toe te voegen aan het origineeldatasetID.
* Elk kind&lt;de opgegeven dataset&gt; moet een volledige dataset zijn, alsof het een stand-alone dataset is. Elk moet hetzelfde hebben[dataVariables](#datavariable)In dezelfde volgorde[destinationNames](#destinationname),[gegevens Typen](#datatype),[missing\\_values](#missing_value),[\\_FillValues](#missing_value)en[eenheden](#units). De metadata voor elke variabele voor de EDDTableAggregateRows-dataset komt van variabelen in de eerste dochterset, maar EDDTableAggregateRows zal de update van de[actual\\_range](#actual_range)Metadata zijn het werkelijke bereik voor alle kinderen.
* Aanbeveling: Krijg elk van de kind datasets werken als stand-alone datasets. Probeer dan om de EDDTableAggregateRows dataset te maken door dedatasets.xmlbrok voor elk in de nieuwe EDDTableAggregate Rijenset.
* Standaard Sorteervolgorde -- De volgorde van de kinddatasets bepaalt de algemene standaardsorteervolgorde van de resultaten. Uiteraard kunnen gebruikers een andere sorteervolgorde voor een bepaalde reeks resultaten aanvragen door &orderBy (" *komma-gescheiden lijst van variabelen* ") tot het einde van hun vraag.
* De "bron"[wereldwijd Attributen](#global-attributes)voor de EDDTableAggregateRows is de gecombineerde globaleKenmerken uit de eerste kindset. De EDDTableAggregate Rijen kunnen een globale&lt;addAttributes&gt; om aanvullende globale attributen aan te bieden of de globale attributen van de bron te overschrijven.
#### EDDTableAggregate Rijen skelet XML{#eddtableaggregaterows-skeleton-xml} 
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

### EDDtabelkopie{#eddtablecopy} 
[ **EDDtabelkopie** ](#eddtablecopy)kan een lokale kopie van vele soorten EDDTable datasets maken en vervolgens de gegevens snel van de lokale kopie serveren.

* EDDtabelkopie (en voor rastergegevens,[EDDGridKopiëren](#eddgridcopy)) is een zeer gemakkelijk te gebruiken en een zeer effectief **oplossing voor enkele van de grootste problemen met het bedienen van gegevens uit externe gegevensbronnen:** 
    * De toegang tot gegevens van een externe databron kan traag zijn.
        * Ze kunnen traag zijn omdat ze inherent traag zijn. (bijvoorbeeld een inefficiënt type server) ,
        * Omdat zij overweldigd worden door te veel verzoeken.
        * of omdat uw server of de externe server beperkt is.
    * De externe dataset is soms niet beschikbaar (opnieuw, om verschillende redenen) .
    * Vertrouwen op één bron voor de gegevens niet goed schalen (bijvoorbeeld, wanneer veel gebruikers en veelERDDAPGebruik het) .
         
* Hoe het werkt -- EDDTableCopy lost deze problemen op door automatisch een lokale kopie van de gegevens te maken en te onderhouden en gegevens van de lokale kopie te serveren.ERDDAP™kan gegevens van de lokale kopie zeer, zeer snel dienen. En het maken en gebruiken van een lokale kopie verlicht de last op de externe server. En de lokale kopie is een back-up van het origineel, wat nuttig is voor het geval er iets gebeurt met het origineel.
    
Er is niets nieuws aan het maken van een lokale kopie van een dataset. Wat hier nieuw is, is dat deze klas het maakt.\\*gemakkelijk\\*het creëren en\\*handhaven\\*een lokale kopie van gegevens van een\\*ras\\*van soorten externe gegevensbronnen en\\*Metadata toevoegen\\*tijdens het kopiëren van de gegevens.
    
#### EDDTableCopy vs.&lt;cacheVanUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFromUrl&gt; is een alternatief voor EDDTableCopy. Ze werken anders.

* EDDTabel Kopiëren werkt door het aanvragen van stukjes data van een remote service en het opslaan van die brokken in lokale bestanden. EDDTableCopy is dus nuttig in sommige gevallen waar de gegevens toegankelijk zijn via een remote service.
* [&lt;cacheVanUrl&gt;] (#cachefromurl) Downloadt de bestaande bestanden op een externe website.&lt;cacheVanuitUrl&gt; is makkelijker te gebruiken en betrouwbaarder omdat het gemakkelijk kan zeggen wanneer er een nieuw bestand op afstand is of wanneer een bestand op afstand is gewijzigd en dus moet worden gedownload.

Als er situaties zijn waarin EDDTableCopy of&lt;cacheFromUrl&gt; kan gebruikt worden, gebruik&lt;cacheVanUrl&gt; omdat het makkelijker en betrouwbaarder is.
     
#### &lt;extractBestemming Namen&gt;{#extractdestinationnames} 
EDDTabel Kopie maakt de lokale kopie van de gegevens door brokken gegevens uit de dataset op afstand te vragen. EDDTabel Kopiëren bepaalt welke brokken moeten worden aangevraagd door het & onderscheiden () waarden voor de&lt;extractDestinationNames&gt; (gespecificeerd in dedatasets.xml, zie hieronder) , die de door ruimte gescheiden bestemmingsnamen zijn van variabelen in de dataset op afstand. Bijvoorbeeld,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
kan verschillende waarden opleveren combinaties van zwerver=tig17, profiel=1017, zwerver=tig17, profiel=1095, ... zwerver=une12, profiel=1223, zwerver=une12, profiel=1251, ....

In situaties waarin één kolom (bijvoorbeeld profiel) kan het enige zijn dat nodig is om een groep van rijen gegevens uniek te identificeren, als er een zeer groot aantal, bijvoorbeeld, profielen, kan het nuttig zijn om ook een extra extract te specificeren Bestemming Naam (bijvoorbeeld, zwerver) die dient om de profielen te verdelen. Dat leidt tot minder gegevensbestanden in een bepaalde directory, wat kan leiden tot snellere toegang.
    
#### Lokale bestanden{#local-files} 
Elke brok gegevens wordt in een aparteNetCDFbestand in een submap van *bigParentDirectory* /copy/ *datasetID* ' (zoals gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Er is één subdirectory niveau voor iedereen behalve het laatste extractDestinationName. Bijvoorbeeld, gegevens voor tig17+1017, zou worden opgeslagen in
     *bigParentDirectory* /copy/sampleDataset/tig17/1017.nc.
Bijvoorbeeld, gegevens voor une12+1251, zou worden opgeslagen in
     *bigParentDirectory* /copy/sampleDataset/une12/1251.nc.
Map en bestandsnamen gemaakt van gegevenswaarden worden gewijzigd om ze bestandsnaam-veilig te maken (spaties worden bijvoorbeeld vervangen door "x20") -- dit heeft geen invloed op de werkelijke gegevens.
     
#### Nieuwe gegevens{#new-data} 
Elke keer EDDTable Kopie wordt herladen, het controleert de externe dataset om te zien welke afzonderlijke brokken beschikbaar zijn. Als het bestand voor een brok gegevens nog niet bestaat, wordt een verzoek om de brok aan een wachtrij toegevoegd.ERDDAP's taakThread verwerkt alle verzoeken in de wachtrij voor brokken data, één-voor-één. U kunt statistieken voor de taakThread's activiteit op de[Statuspagina](/docs/server-admin/additional-information#status-page)en in[Dagelijks verslag](/docs/server-admin/additional-information#daily-report). (Ja.ERDDAP™kunnen meerdere taken toe te wijzen aan dit proces, maar dat zou veel van de bandbreedte, het geheugen, en CPU-tijd van de externe gegevensbron, en veel van de lokaleERDDAP's bandbreedte, geheugen, en CPU tijd, geen van beide is een goed idee.) 
    
OPMERKING: De allereerste keer dat een EDDTableCopy geladen wordt, (als alles goed gaat) veel verzoeken voor brokken gegevens zullen worden toegevoegd aan de wachtrij van de taakThread, maar er zullen geen lokale gegevensbestanden zijn aangemaakt. Dus de constructor zal falen, maar taakThread zal blijven werken en lokale bestanden aanmaken. Als alles goed gaat, zal de taakThread enkele lokale gegevensbestanden maken en de volgende poging om de dataset te herladen (in ~15 minuten) zal slagen, maar aanvankelijk met een zeer beperkte hoeveelheid gegevens.
    
OPMERKING: Nadat de lokale dataset gegevens heeft en verschijnt in uwERDDAP, als de dataset op afstand tijdelijk of permanent niet toegankelijk is, zal de lokale dataset nog steeds werken.
    
WAARSCHUWING: Als de externe dataset groot is en/of de externe server traag is (Dat is het probleem, nietwaar?&#33;) , het zal lang duren om een volledige lokale kopie te maken. In sommige gevallen zal de benodigde tijd onaanvaardbaar zijn. Bijvoorbeeld, het verzenden van 1 TB gegevens over een T1-lijn (0,15 GB/s) duurt ten minste 60 dagen, onder optimale omstandigheden. Bovendien gebruikt het veel bandbreedte, geheugen en CPU tijd op de remote en lokale computers. De oplossing is om een harde schijf te mailen naar de beheerder van de dataset op afstand, zodat s/hij een kopie van de dataset kan maken en de harde schijf naar u terug kan sturen. Gebruik die gegevens als startpunt en EDDTableCopy zal gegevens toevoegen. (Dat is hoe Amazon's EC2 Cloud Service gebruikt om het probleem aan te pakken, hoewel hun systeem heeft veel bandbreedte.) 
    
WAARSCHUWING: Als een bepaalde combinatie van waarden verdwijnt uit een dataset op afstand, verwijdert EDDTableCopy het lokale gekopieerde bestand NIET. Als je wilt, kun je het zelf verwijderen.
    
#### Tabelkopie&lt;checkSourceData&gt;{#tablecopy-checksourcedata} 
Dedatasets.xmlvoor deze dataset kan een optionele tag hebben
```
    <checkSourceData>true</checkSourceData>  
```
De standaardwaarde is waar. Als/wanneer u het op false zet, zal de dataset nooit de brondataset controleren om te zien of er aanvullende gegevens beschikbaar zijn.
     
#### Aanbevolen gebruik{#recommended-use} 
1. Creëer de&lt;dataset&gt; item (het inheemse type, niet EDDtableCopy) voor de externe gegevensbron. **Zorg dat het goed werkt, inclusief alle gewenste metadata.** 
2. Als het te langzaam is, voeg XML code toe om het in een EDDTableCopy dataset in te pakken.
    * Gebruik een anderedatasetID  (Misschien door dedatasetIDvan de oudedatasetIDlicht) .
    * Kopiëren&lt;toegankelijk Aan&gt;,&lt;herladenEveryNMinutes&gt; en&lt;onChange&gt; van XML van de EDDTable naar XML van de EDDTableCopy. (Hun waarden voor EDDTableCopy materie; hun waarden voor de innerlijke dataset worden irrelevant.) 
    * Creëer de&lt;extractDestinationNames&gt; tag (zie boven) .
    *   &lt;orderExtractBy&gt; is een OPTIONAL space separated lijst met namen van de bestemmingsvariabele in de dataset op afstand. Wanneer elke brok gegevens wordt gedownload van de externe server, zal de brok worden gesorteerd door deze variabelen (door de eerste variabele, dan door de tweede variabele als de eerste variabele gebonden is, ...) . In sommige gevallen,ERDDAP™kan gegevens sneller uit de lokale gegevensbestanden halen als de eerste variabele in de lijst een numerieke variabele is ("time"telt als een numerieke variabele) . Maar kies deze variabelen op een manier die geschikt is voor de dataset.
3.  ERDDAP™maakt en bewaart een lokale kopie van de gegevens.
         
* WAARSCHUWING: EDDTableCopy gaat ervan uit dat de gegevenswaarden voor elke brok nooit veranderen. Als / wanneer ze dat doen, moet je handmatig verwijderen van de brok bestanden in *bigParentDirectory* /copy/ *datasetID* / die veranderde en[vlag](/docs/server-admin/additional-information#flag)de te herladen dataset zodat de verwijderde brokken worden vervangen. Als je een e-mailabonnement op de dataset hebt, krijg je twee e-mails: één wanneer de dataset voor het eerst herlaadt en de gegevens begint te kopiëren, en een andere wanneer de dataset opnieuw geladen wordt (automatisch) en detecteert de nieuwe lokale gegevensbestanden.
     
* Metadata wijzigen -- Als u eenaddAttributesof de volgorde van de variabelen in verband met de brondataset wijzigen:
    1. Wijzig deaddAttributesvoor de bronset indatasets.xml, indien nodig.
    2. Verwijder een van de gekopieerde bestanden.
    3. Stel een[vlag](/docs/server-admin/additional-information#flag)om de dataset onmiddellijk te herladen. Als je een vlag gebruikt en je hebt een e-mailabonnement op de dataset, krijg je twee e-mails: één wanneer de dataset voor het eerst herlaadt en begint te kopiëren van de gegevens, en een andere wanneer de dataset opnieuw laadt (automatisch) en detecteert de nieuwe lokale gegevensbestanden.
    4. Het verwijderde bestand zal worden geregenereerd met de nieuwe metadata. Als de brondataset ooit niet beschikbaar is, krijgt de EDDTableCopy dataset metadata uit het geregenereerde bestand, omdat het het jongste bestand is.
         
*   [EDDGridKopiëren](#eddgridcopy)is zeer vergelijkbaar met EDDTableCopy, maar werkt met gerasterde datasets.
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

- -

## Gegevens{#details-1} 

Hier zijn gedetailleerde beschrijvingen van gemeenschappelijke tags en attributen.

### &lt;hoekDegreeUnits&gt;{#angulardegreeunits} 
* [ ** &lt;hoekigDegreeUnits&gt; ** ] (#angulargradeunits) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xmldie een door komma's gescheiden lijst bevat van eenheden tekenreeksen dieERDDAP™dient te worden behandeld als hoekige graden eenheden. Als een variabele een van deze eenheden heeft,tabledap'sorderByMeanfilter zal het gemiddelde op een speciale manier berekenen, dan het gemiddelde rapporteren als een waarde van -180 tot 180. ZieERDDAP's EDStatic.java broncodebestand voor de huidige standaardlijst. Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).
### &lt;hoekDegreeTrueUnits&gt;{#angulardegreetrueunits} 
* [ ** &lt;hoekig DegreeTrueUnits&gt; ** ] (#angulargradetrueunits) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xmldie een door komma's gescheiden lijst bevat van eenheden tekenreeksen dieERDDAP™moeten behandelen als hoekige graden echte eenheden. Als een variabele een van deze eenheden heeft,tabledap'sorderByMeanfilter zal het gemiddelde op een speciale manier berekenen, dan het gemiddelde rapporteren als een waarde van 0 tot 360. ZieERDDAP's EDStatic.java bronbestand voor de huidige standaardlijst. Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).
     
### &lt;commonStandardNames&gt;{#commonstandardnames} 
* [ ** &lt;commonStandardNames&gt; ** ] (#commonstandardnames) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xmlom een door komma's gescheiden lijst van gemeenschappelijke[CF-standaardnamen](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Bijv.
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Deze lijst wordt gebruikt in DataProviderForm3.html als een gemak voor gebruikers.
Als u deze informatie indatasets.xml, begin met het kopiëren van de huidige standaard lijst in&lt;DEFAULT\\_commonStandardNames&gt; inERDDAP's
\\[kat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
     
### &lt;cacheMinutes&gt;{#cacheminutes} 
* [ ** &lt;cacheMinuten&gt; ** ] (#cacheminuten) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xmlde leeftijd specificeren (in minuten) waarbij bestanden in de cache moeten worden verwijderd (standaard=60) . Bijv.
```
    <cacheMinutes>60</cacheMinutes>  
```
In het algemeen alleen afbeeldingsbestanden (omdat dezelfde beelden vaak herhaaldelijk worden gevraagd) en.ncbestanden (omdat ze volledig moeten worden aangemaakt voordat ze naar de gebruiker worden verzonden) zijn gecached. Hoewel het lijkt alsof een gegeven verzoek altijd hetzelfde antwoord moet geven, is dat niet waar. Bijvoorbeeld atabledapverzoek dat tijd bevat&gt; *enkele Tijd* zal veranderen wanneer nieuwe gegevens aankomen voor de dataset. En een griddap verzoek dat omvat\\[laatste\\]voor de tijddimensie zal veranderen wanneer nieuwe gegevens voor de dataset arriveren. Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag). VoorERDDAP™v2,00, dit werd gespecificeerd in setup.xml, die nog steeds is toegestaan maar ontmoedigd.
     
### &lt;convertI compostateRequestCSVexample&gt;{#convertinterpolaterequestcsvexample} 
* [ ** &lt;convertIcleateRequestCSVexample&gt; ** ] (#converti Complementate requestcsvexample) is een OPTIONAL tag binnen een&lt;erddapDatasets&gt; tag indatasets.xml \\[beginnend metERDDAP™v2.10\\]die een voorbeeld bevat dat zal worden weergegeven op de webpagina van de Interpolate converter. De standaardwaarde is: jplMURSST41/geannuleerd\\_sst/Bilineair/4 .
### &lt;convertIcleateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;convertIcleateDatasetIDVariableList&gt; ** ] (#convertipyrrolatedatasetidvariabelelijst) is een OPTIONAL tag binnen een&lt;erddapDatasets&gt; tag indatasets.xml \\[beginnend metERDDAP™v2.10\\]die een CSV-lijst bevatdatasetID/variabele Naam voorbeelden die zullen worden gebruikt als suggesties door de Interpolate converter webpagina. De standaardwaarde is: jplMURSST41/geannuleerd\\_sst.
### &lt;converterennaarPublicSourceUrl&gt;{#converttopublicsourceurl} 
* [ ** &lt;converteren naarPublicSourceUrl&gt; ** ] (#converttopublicsourceurl) is een OPTIONAL tag binnen een&lt;erddapDatasets&gt; tag indatasets.xmldie een "van" en een "naar" attribuut bevat dat aangeeft hoe een matching local moet worden omgezetsourceUrl  (meestal een IP-nummer) in een publieksourceUrl  (een domeinnaam) . "van" moet het formulier hebben "\\[iets\\]'\\[iets\\]'." Er kunnen 0 of meer van deze tags zijn. Voor meer informatie zie [&lt;sourceUrl&gt;] (#sourceurl) . Bijvoorbeeld,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
zal leiden tot een overeenkomstige lokalesourceUrl  (zoals https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
in een publieksourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) .
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).

Maar om veiligheidsredenen en redenen in verband met het abonnementssysteem, **Gebruik deze tas niet&#33;**   
Gebruik in plaats daarvan altijd de publieke domeinnaam in de&lt;sourceUrl&gt; tag en gebruik de[/etc/hosts-tabel](https://linux.die.net/man/5/hosts)op uw server om lokale domeinnamen te converteren naar IP-nummers zonder gebruik te maken van een DNS-server. U kunt testen of een domeinnaam correct is omgezet in een IP-nummer met behulp van:
ping *some.domein.naam*   
     
### gegevens: afbeelding/png;base64,{#dataimagepngbase64} 
* Wanneer een gebruiker een.htmlTablerespons vanERDDAP™, als de gegevens in een stringcel gegevens bevatten:image/png;base64, gevolgd door een base64 gecodeerde .png afbeelding,ERDDAP™zal een pictogram tonen (zodat de gebruiker de afbeelding kan zien als ze erover zweven) en knoppen om de tekst of de afbeelding op te slaan op het klembord. Deze functie is toegevoegd aanERDDAP™v2.19 door Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)geeft aan welke standaardinstelling bepaalt wanneer en hoe het landmasker getekend moet worden wanneerERDDAP™Tekent een kaart. Het kan worden gespecificeerd op drie verschillende plaatsen indatasets.xml  (gerangschikt van laagste naar hoogste prioriteit) :
    
    1. AlsdrawLandMaskis gespecificeerd binnen&lt;erddapDatasets&gt; (niet verbonden met een specifieke dataset) , dan specificeert het de standaard waarde vandrawLandMaskvoor alle variabelen in alle datasets. Bijvoorbeeld,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAPleestdatasets.xml.
Als deze tag niet aanwezig is, is de onderliggende standaard waarde onder.
         
    2. AlsdrawLandMaskwordt gespecificeerd als een globaal attribuut van een gegeven dataset, dan specificeert het de standaard waarde vandrawLandMaskvoor alle variabelen in die dataset, waarbij elke lagere prioriteit wordt bepaald. Bijvoorbeeld,
    ```
        <att name="drawLandMask">under</att>  
    ```
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™herlaadt die dataset.
         
    3. AlsdrawLandMaskwordt gespecificeerd als het attribuut van een variabele in een gegeven dataset, dan specificeert het de standaardwaarde vandrawLandMaskvoor die variabele in die gegevensset, waarbij elke instelling met lagere prioriteit wordt overschaduwd. Bijvoorbeeld,
    ```
        <att name="drawLandMask">under</att>  
    ```
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™herlaadt die dataset.
    
Een gebruiker kan de standaard overschrijven (waar het ook is gespecificeerd) door een waarde voor "Draw land mask" te selecteren uit een dropdown lijst op de webpagina Make A Graph, of door &.land= *waarde* in de URL die een kaart aanvraagt vanERDDAP.
    
In alle situaties zijn er 4 mogelijke waarden voor het attribuut:
    
    * "onder" trekt het landmasker voordat het data op de kaart tekent.
Voor gerasterde datasets verschijnt land als een constante lichtgrijze kleur.
Voor tabeldatasets toont "onder" topografiegegevens over land en oceanen.
    * "over" -- Voor gerasterde datasets trekt "over" het landmasker nadat het gegevens op kaarten tekent zodat het alle gegevens over land zal maskeren. Voor tabeldatasets, "over" toont badymetrie van de oceaan en een constante lichtgrijs waar er land, beide getekend onder de gegevens.
    * "outline" schetst gewoon de contouren van het landmasker, politieke grenzen, meren en rivieren.
    * "Uit" tekent niets.
### &lt;e-mailDiagnosticsToErdData&gt;{#emaildiagnosticstoerddata} 
* [ ** &lt;e-mailDiagnosticsToErdData&gt; ** ] (#emaildiagnosticstoerddata) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xml. De waarde van het label kan waar zijn (de standaard) of vals. Als het waar is,ERDDAP™zal de stack trace naar Chris e-mailen. John at noaa. gov (deERDDAP™ontwikkelingsteam) . Dit moet veilig en veilig zijn omdat er geen vertrouwelijke informatie is (b.v. het verzoekUrl) is opgenomen in de e-mail. Dit moet het mogelijk maken om elke obscure, totaal onverwachte bugs die leiden tot NullPointerExceptions te vangen. Anders ziet de gebruiker de uitzonderingen, maar deERDDAP™ontwikkelingsteam niet (Dus we weten niet of er een probleem is dat opgelost moet worden.) .
     
### &lt;grafAchtergrondkleur&gt;{#graphbackgroundcolor} 
* [ ** &lt;grafiekachtergrondkleur&gt; ** ] (#graphbackgroundcolor) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xmlstandaard achtergrondkleur op grafieken opgeven. Dit beïnvloedt bijna alle grafieken. Er zijn een paar situaties niet beïnvloed. De kleur is gespecificeerd als een 8-cijferige hexadecimale waarde in de vorm 0xAARRGGBB, waarbij AA, RR, GG en BB respectievelijk de opaciteit, rood, groen en blauw componenten zijn. "0x" is hoofdlettergevoelig, maar de hexadecimale cijfers zijn niet hoofdlettergevoelig. Bijvoorbeeld, een volledig ondoorzichtig (ff) groen-blauw kleur met rood=22, groen=88, blauw=ee zou 0xff2288ee. Opaak wit is 0xffffffff. De standaard is ondoorzichtig lichtblauw (0xffccccff) , dat heeft het voordeel van het verschil met wit, dat is een belangrijke kleur in veel paletten gebruikt om gegevens te tekenen. Bijvoorbeeld,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).
### &lt;ipAddressMaxRequests&gt;{#ipaddressmaxrequests} 
* [ ** &lt;ipAdresMaxverzoeken&gt; ** ] (#ipaddressmaxverzoeken) is een zelden gebruikte optionele tag (eerst ondersteund metERDDAP™v2.12) binnen een&lt;erddapDatasets&gt; tag indatasets.xmldat deel uitmaakt van een systeem om het vermogen van overmatige agressieve legitieme gebruikers en kwaadaardige gebruikers te beperken om een groot aantal gelijktijdige verzoeken te doen die de prestaties van het systeem zouden degraderen voor andere gebruikers. ipAdres MaxRequests specificeert het maximale aantal gelijktijdige verzoeken dat vanaf elk specifiek IP-adres wordt geaccepteerd. Extra verzoeken ontvangen een HTTP 429 fout: Te veel verzoeken. De kleine, statische bestanden in erddap/download/ en erddap/images/ zijn NIET vrijgesteld van deze telling. De standaard is 15. De maximaal toegestane is 1000, wat gek hoog is -- doe het niet&#33;ERDDAP™zal niet accepteren een nummer minder dan 6 omdat veel legitieme gebruikers (met name webbrowsers enWMScliënten) 6 verzoeken per keer indienen. DeERDDAP™Dagelijks rapport en de soortgelijke informatie geschreven naar het log.txt bestand met elke Major Dataset Herladen, zal nu een tal van de verzoeken van deze IP-adressen onder de titel "Request's IP Address (Te veel verzoeken) "
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).
    
De sectie "Major LoadDatasets Time Series" van status.html bevat een kolom "tooMany" met een lijst van het aantal verzoeken dat de ipAddressMaxverzoeken van een gebruiker overschreed en dus een fout "Too Many Requests" zag. Dit kunt u gemakkelijk zien wanneer er actieve overmatige agressieve legitieme gebruikers en kwaadaardige gebruikers, zodat u kunt (facultatief) kijk in het log.txt bestand en bepaal of je die gebruikers wilt zwarten.
    
Er is niets mis met het instellen van een hoger getal. Het is aan jou. Maar dit maakt het mogelijk/stimuleert mensen om systemen op te zetten die een groot aantal threads gebruiken om te werken aan projecten en geeft hen dan geen feedback dat wat ze doen hen geen voordeel geeft.
### &lt;ipAddressMaxRequestsActive&gt;{#ipaddressmaxrequestsactive} 
* [ ** &lt;ipAddressMaxRequestsActive&gt; ** ] (#ipaddressmax requestsactive) is een zelden gebruikte optionele tag (eerst ondersteund metERDDAP™v2.12) binnen een&lt;erddapDatasets&gt; tag indatasets.xmldat deel uitmaakt van een systeem om het vermogen van overmatige agressieve legitieme gebruikers en kwaadaardige gebruikers te beperken om een groot aantal gelijktijdige verzoeken te doen die de prestaties van het systeem zouden degraderen voor andere gebruikers. ipAddressMaxRequestsActive specificeert het maximale aantal gelijktijdige verzoeken dat actief zal worden verwerkt vanaf een specifiek IP-adres. Aanvullende verzoeken zullen in een wachtrij zitten totdat de eerdere verzoeken zijn verwerkt. De kleine, statische bestanden in erddap/download/ en erddap/images/ zijn vrijgesteld van deze telling en de bijbehorende throttling. De standaard is 2. De maximaal toegestane is 100, wat gek hoog is -- doe het niet&#33; U kunt dit instellen op 1 om strikt te zijn, vooral als u problemen heeft met overdreven agressieve of kwaadaardige gebruikers. Gebruikers zullen nog steeds snel krijgen alle gegevens die ze vragen (tot ipAddressMaxverzoeken) , maar ze zullen niet in staat zijn om het systeem middelen. We raden het niet aan om dit op een groter aantal omdat het laat te agressieve legitieme gebruikers en kwaadaardige gebruikers te dominerenERDDAPde verwerkingscapaciteit.
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).
     
### &lt;ipAddressUnlimited&gt;{#ipaddressunlimited} 
* [ ** &lt;ipAdresUnlimited&gt; ** ] (#ipaddressonbeperkt) is een zelden gebruikte optionele tag (eerst ondersteund metERDDAP™v2.12) binnen een&lt;erddapDatasets&gt; tag indatasets.xmldat deel uitmaakt van een systeem om het vermogen van overmatige agressieve legitieme gebruikers en kwaadaardige gebruikers te beperken om een groot aantal gelijktijdige verzoeken te doen die de prestaties van het systeem zouden degraderen voor andere gebruikers. ipAddressUnlimited is een door komma's gescheiden lijst van IP-adressen die u onbeperkt toegang tot uwERDDAP. Kijk in je logboek. txt-bestand om te zien welk formaat uw server gebruikt voor de IP-adressen. Op sommige servers zullen de IP-adressen in het formaat #.#.#.#.# staan. (waarbij # een geheel getal is van 0 tot 255) ; terwijl op anderen het in het formaat #:#:#:#:#:#:#:#:#:# . Verzoeken op deze lijst zijn niet onderworpen aan de ipAddressMaxRequests of de ipAddressMaxRequestsActive instellingen. Dit kan een secundaire zijn.ERDDAP™of voor bepaalde gebruikers of servers in uw systeem.ERDDAP™altijd voegt " (onbekend IPaddress) "dieERDDAP™gebruikt wanneer het IP-adres van de aanvrager niet kan worden bepaald, bijvoorbeeld voor andere processen die op dezelfde server draaien.
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).
    
Als om een of andere reden alle verzoeken van een gebruiker krijgen de foutmelding "Timeout wachten op uw andere verzoeken om te verwerken.", dan kunt u het probleem op te lossen door het toevoegen van het IP-adres van de gebruiker aan de ipAddressUnlimited lijst, het toepassen van die wijziging, vervolgens verwijderen van die lijst.
    
### &lt;loadDatasetsMinMinutes&gt;{#loaddatasetsminminutes} 
* [ ** &lt;loadDatasetsMinMinutes&gt; ** ] (#loaddatasetsminuten) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xmlde minimumtijd specificeren (in minuten) tussen grote belasting Datasets (wanneerERDDAP™herbewerkingendatasets.xml, inclusief het controleren van elke dataset om te zien of het moet worden herladen volgens de herladen EveryNMinutes setting, default=15) . Bijv.
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Als een bepaalde run van loadDatasets minder duurt dan deze tijd, kijkt de lader gewoon herhaaldelijk naar de vlag directory en/of slaapt totdat de resterende tijd is verstreken. De standaard is 15 minuten, wat goed zou moeten zijn voor bijna iedereen. Het enige nadeel om dit op een kleiner aantal te zetten is dat het de frequentie zal verhogen dieERDDAP™herstart datasets die fouten hebben die voorkomen dat ze geladen worden (bv. een externe server is uitgeschakeld) . Als er veel van dergelijke datasets zijn en ze vaak opnieuw worden getest, kan de gegevensbron overwegen dat ze pesten/agressief gedrag. Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag). VoorERDDAP™v2,00, dit werd gespecificeerd in setup.xml, die nog steeds is toegestaan maar ontmoedigd.
     
### &lt;loadDatasetsMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* [ ** &lt;loadDatasetsMaxMinuten&gt; ** ] (#loaddatasetsmaxminuten) is een OPTIONAL tag binnen een&lt;erddapDatasets&gt; tag indatasets.xmlde maximumtijd specificeren (in minuten) een grote belasting Datasets inspanning is toegestaan om te nemen (vóór de belasting Datasets draad behandeld als "geïnstalleerd" en wordt onderbroken)   (standaard=60) . Bijv.
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
In het algemeen moet dit worden ingesteld op ten minste twee keer zolang u redelijkerwijs denkt dat het opnieuw laden van alle datasets (cumulatief) moet nemen (omdat computers en netwerken soms langzamer zijn dan verwacht) Dit moet altijd veel langer zijn dan loadDatasetsMinMinutes. Standaard is het 60 minuten. Sommige mensen zullen dit langer zetten. Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag). VoorERDDAP™v2,00, dit werd gespecificeerd in setup.xml, die nog steeds is toegestaan maar ontmoedigd.
     
### &lt;logLevel&gt;{#loglevel} 
* [ ** &lt;logLevel&gt; ** ] (#loglevel) is een OPTIONAL tag binnen een&lt;erddapDatasets&gt; tag indatasets.xmlom aan te geven hoeveel kenmerkende berichten naar het log.txt bestand worden verzonden. Het kan worden ingesteld op "waarschuwing" (de weinigste berichten) , "info" (de standaard) , of "alle" (de meeste berichten) . Bijv.
```
    <logLevel>info</logLevel>  
```
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag). VoorERDDAP™v2,00, dit werd gespecificeerd in setup.xml, die nog steeds is toegestaan maar ontmoedigd.
     
### &lt;gedeeltelijke aanvraagMaxBytes&gt; en&lt;partialRequestMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;partialRequestMaxBytes&gt; **] (#partial requestmaxbytes-and-partial requestmaxcells) en [** &lt;partialRequestMaxCells&gt; ** ] (#partial requestmaxbytes-and-partial requestmaxcells) worden gebruikt&lt;erddapDatasets&gt; tag indatasets.xml. Indien mogelijk (en het is niet altijd mogelijk) ,ERDDAP™breekt grote data verzoeken in stukken om geheugen te behouden.
    
Met 32 bitsJava, in simplistische zin, het maximum aantal gelijktijdige *groot* verzoeken is ongeveer 3/4 van het beschikbare geheugen (de -Xmx waarde doorgegeven aan Tomcat) gedeeld door de brokgrootte (bijv. 1200 MB / 100 MB =&gt; 12 verzoeken) . Andere dingen vereisen geheugen, dus het werkelijke aantal verzoeken zal minder zijn. In de praktijk is brokken niet altijd mogelijk. Dus een grote of een paar zeer grote gelijktijdige niet-chunkable verzoeken kan problemen veroorzaken op 32 bitJava.

Met 64 bitJava, de -Xmx waarde kan veel groter zijn. Dus geheugen is veel minder waarschijnlijk een beperking.

U kunt de standaard blokgrootte overschrijven door deze tags te definiëren indatasets.xml  (met andere waarden dan hier getoond) :
Voor rasters:&lt;gedeeltelijkverzoekMaxBytes&gt;100000000&lt;/partialRequestMaxBytes&gt;
Voor tabellen:&lt;gedeeltelijkverzoekMaxCells&gt;1000000&lt;/partialRequestMaxCells&gt;

partialRequestMaxBytes is het gewenste maximum aantal bytes voor een verzoek om gedeeltelijke rastergegevens (een brok van het totale verzoek) . default=100000000 (10^8) . Grotere maten zijn niet per se beter (en ga niet meer dan 500 MB want dat is THredDS default limiet voorDAPreacties) . Maar grotere maten vereisen minder toegang tot tonnen bestanden (denk aanERD's satellietgegevens met elk tijdstip in een apart bestand - het is beter om meer gegevens uit elk bestand in elk gedeeltelijk verzoek te krijgen) .

partialRequestMaxCells is het gewenste maximum aantal cellen (nRows \\* nColumns in de gegevenstabel) voor een gedeeltelijk TABLE-gegevensverzoek (een brok van het totale verzoek) . Standaard = 100000. Grotere maten zijn niet per se beter. Ze leiden tot een langere wachttijd voor de eerste batch van gegevens van de bron.

Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag). VoorERDDAP™v2,00, deze werden gespecificeerd in setup.xml, die nog steeds is toegestaan maar ontmoedigd.
     
### &lt;verzoekBlacklist&gt;{#requestblacklist} 
* [ ** &lt;verzoekBlacklist&gt; ** ] (#Requestblacklist)  [is een OPTIONAL-tag](/docs/server-admin/additional-information#frequent-crashes-or-freezes)binnen een&lt;erddapDatasets&gt; tag indatasets.xmldie een door komma's gescheiden lijst bevat van numerieke IP-adressen die op de zwarte lijst staan. Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).
    * Dit kan worden gebruikt om een[Ontkenning van dienstaanval](https://en.wikipedia.org/wiki/Denial_of_service), een overijverig[web robot](https://en.wikipedia.org/wiki/Internet_bot), of een ander type lastige gebruiker.
    * Moeilijke gebruiker -- AlsERDDAP™De oorzaak is vaak een lastige gebruiker die meer dan één script tegelijk draait en/of een groot aantal zeer grote, uiterst inefficiënte of ongeldige verzoeken doet. Kijk in[log.txt](/docs/server-admin/additional-information#log)om te zien of dit het geval is en om het numerieke IP-adres van de lastige gebruiker te vinden. Als dit het probleem is, moet je waarschijnlijk blacklist die gebruiker.
        
WanneerERDDAP™krijgt een verzoek van een op de zwarte lijst geplaatst IP-adres, het zal HTTP Fout 403: Verboden. De begeleidende tekst foutmelding moedigt de gebruiker aan om u te e-mailen, deERDDAPBeheerder, om de problemen op te lossen. Als ze de tijd nemen om de foutmelding te lezen (Veel blijkbaar niet) en contact met u opnemen, kunt u dan werken met hen om ze te krijgen om slechts één script per keer draaien, efficiënter verzoeken, de problemen in hun script op te lossen (bijvoorbeeld, het aanvragen van gegevens van een dataset op afstand die niet kan reageren voordat de timing is verlopen) , of wat ook de oorzaak van de problemen was.
        
Gebruikers zijn vaak gewoon niet bewust dat hun verzoeken zijn lastig. Ze zijn vaak niet bewust van bugs, grove inefficiënties, of andere problemen met hun scripts. Ze denken vaak dat omdat uwERDDAP™biedt gegevens gratis, die ze kunnen vragen om zoveel gegevens als ze willen, bijvoorbeeld door het uitvoeren van meerdere scripts of door het gelijktijdig gebruik van meerdere threads.
        
        * Je kunt ze uitleggen dat elkERDDAP™, hoe groot en krachtig, heeft eindige middelen (CPU tijd, harde schijf I/O, netwerk bandbreedte, enz.) en het is niet eerlijk als een gebruiker gegevens vraagt op een manier die andere gebruikers of overlast verdringtERDDAP.
        * Zodra een gebruiker weet hoe 2 gelijktijdige verzoeken te doen, zien ze vaak geen reden om geen 5, 10 of 20 gelijktijdige verzoeken te doen, omdat de extra verzoeken hen niets kosten. Het is als asymmetrische oorlogvoering: hier hebben de offensieve wapens een enorm voordeel (nulkosten) over de verdedigingswapens (een eindige installatie met reële kosten) .
        * Erop wijzen dat er dalende rendementen zijn om steeds meer gelijktijdige verzoeken te doen; de extra verzoeken blokkeren gewoon verder de verzoeken van andere gebruikers; ze leveren geen enorme verbetering op voor hen.
        * Herinner hen eraan dat er andere gebruikers zijn (zowel casual gebruikers als andere gebruikers die scripts uitvoeren) , dus het is niet eerlijk van hen om alle vanERDDAPDe middelen.
        * Er op wijzen dat de tech reuzen hebben geleid gebruikers te verwachten oneindige middelen van webdiensten. Terwijl er manieren zijn om op te zetten[rasters/clusters/feeraties vanERDDAPs](/docs/server-admin/scaling)om eenERDDAP™systeem met meer middelen, de meesteERDDAP™Beheerders hebben niet het geld of de mankracht om dergelijke systemen op te zetten, en zo'n systeem zal nog steeds eindig zijn. OpERDbijvoorbeeld, er is één persoon (me) schrijvenERDDAP™2ERDDAPs (met hulp van mijn baas) , en het beheer van verschillende gegevensbronnen, allemaal met een jaarlijkse hardware budget van $0 (we vertrouwen op incidentele subsidies om te betalen voor hardware) . Dit is niet Google, Facebook, Amazon, etc met 100's van ingenieurs, en miljoenen dollars aan inkomsten om te recyclen in steeds grotere systemen. En we kunnen ons niet zomaar verplaatsen.ERDDAP™om, bijvoorbeeld, Amazon AWS, omdat de data opslag kosten groot zijn en de data egress kosten zijn groot en variabel, terwijl ons budget voor externe diensten is een vaste $0.
        * Mijn verzoek aan gebruikers is: voor niet-tijdgevoelige verzoeken (Wat veruit het meest voorkomende geval is) , zou hun systeem slechts één verzoek per keer moeten doen. Als de verzoeken tijdgevoelig zijn (b.v., meerdere .pngs op een webpagina, meerdere tegels voor eenWMSclient, enz.) , dan zouden misschien 4 gelijktijdige verzoeken het maximum moeten zijn (en gewoon voor een zeer korte tijd) .
        * Als u de situatie aan de gebruiker uitlegt, zullen de meeste gebruikers begrijpen en bereid zijn de nodige wijzigingen aan te brengen zodat u hun IP-adres kunt verwijderen uit de zwarte lijst.
             
    * Om een gebruiker op de zwarte lijst te zetten, voeg zijn numerieke IP-adres toe aan de door komma's gescheiden lijst van IP-adressen in&lt;aanvraagBlacklist&gt; in uwdatasets.xmlbestand. Om het IP-adres van de lastige gebruiker te vinden, kijk in deERDDAP™  *bigParentDirectory* /logs/log.txt-bestand ( *bigParentDirectory* is gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml)) om te zien of dit het geval is en om het IP-adres van die gebruiker te vinden. Het IP-adres voor elke aanvraag is vermeld op de regels die beginnen met "&#123;&#123;&#123;&#123;#" en is 4 nummers gescheiden door perioden, bijvoorbeeld 123.45.67.8 . Zoeken naar "ERROR" zal u helpen problemen zoals ongeldige verzoeken te vinden.
    * U kunt ook het laatste nummer in een IP-adres vervangen door\\*(bijvoorbeeld 202.109.200.\\*) om een reeks IP-adressen te blokkeren, 0-255.
    * U kunt ook de laatste 2 nummers in een IP-adres vervangen door\\*.\\*  (bijvoorbeeld 121.204.\\*.\\*) om een groter aantal IP-adressen te blokkeren, 0-255.0-255.
    * Bijvoorbeeld,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * U hoeft niet opnieuw te startenERDDAP™voor de wijzigingen in&lt;verzoekBlacklist&gt; in werking te stellen. De wijzigingen zullen de volgende keer worden gedetecteerdERDDAP™controleert of datasets opnieuw moeten worden geladen. Of, u kunt het proces versnellen door een bezoek aan een[setDataset Vlag URL](/docs/server-admin/additional-information#set-dataset-flag)voor elke dataset.
    * UwERDDAP™dagelijks rapport bevat een lijst/tally van de meest actieve toegestane en geblokkeerde verzoekers.
    * Als u wilt achterhalen wat domein/instelling is gerelateerd aan een numeriek IP-adres, kunt u een gratis, omgekeerde DNS webservice gebruiken zoals[ https://network-tools.com/ ](https://network-tools.com/).
    * Er kunnen momenten zijn dat het zinvol is om bepaalde gebruikers op een hoger niveau te blokkeren, bijvoorbeeld kwaadaardige gebruikers. U kunt bijvoorbeeld hun toegang tot alles op uw server blokkeren, niet alleenERDDAP. Op Linux is een dergelijke methode te gebruiken[iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). U kunt bijvoorbeeld een regel toevoegen die alles blokkeert van 198.51.100.0 met het commando
iptables -I INPUT -s 198.51.100,0 -j DROP
       
### &lt;trageDownTroubleMillis&gt;{#slowdowntroublemillis} 
* [ ** &lt;trageDownTroubleMillis&gt; ** ] (#slowdowntroublemillis) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xmlwaarin het aantal milliseconden is aangegeven (standaard=1000) om te pauzeren bij het beantwoorden van alle mislukte verzoeken, bv. onbekende dataset, te groot verzoek, gebruiker op de zwarte lijst. Bijv.
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Als een script het ene verzoek onmiddellijk na het andere doet, dan kan het snel een slecht verzoek na het andere indienen. Met deze instelling kunt u een falend script vertragen, dusERDDAP™is niet overspoeld met slechte verzoeken. Als een mens een slecht verzoek doet, merken ze deze vertraging niet eens. Aanbevelingen:
    
    * Als het probleem een Distributed Denial Of Service is (DDOS) aanval van 100+ aanvallers, zet dit op een kleiner aantal (100?) . Het vertragen van ze allemaal te lang leidt tot te veel actieve draden.
    * Als het probleem van 1-10 bronnen is, zet dit op 1000 ms (de standaard) , maar een groter aantal (zoals 10000) is ook redelijk. Dat vertraagt hen zodat ze minder netwerkbronnen verspillen. Ook, 1000 ms of zo zal niet irriteren menselijke gebruikers die een slecht verzoek.
    
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).
     
### &lt;abonnementE-mailBlacklist&gt;{#subscriptionemailblacklist} 
* [ ** &lt;abonnement E-mailBlacklist&gt; ** ] (#subscriptionemailblacklist) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xmldie een door komma's gescheiden lijst bevat van e-mailadressen die onmiddellijk op de zwarte lijst van de[abonnementssysteem](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions), bijvoorbeeld
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Dit is een hoofdlettergevoelig systeem. Als een e-mailadres aan deze lijst wordt toegevoegd, als dat e-mailadres abonnementen heeft, worden de abonnementen geannuleerd. Als een e-mailadres op de lijst probeert te abonneren, wordt het verzoek geweigerd. Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).
     
### Standaardtekst{#standard-text} 
*   [ **Standaardtekst** ](#standard-text)-- Er zijn verschillende OPTIONAL-tags (de meeste worden zelden gebruikt) binnen een&lt;erddapDatasets&gt; tag indatasets.xmlom tekst op te geven die op verschillende plaatsen inERDDAP. Als u de standaardtekst wilt wijzigen, kopieer dan de bestaande waarde van de tag met dezelfde naam in
     *kat* /webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml indatasets.xml, dan de inhoud te wijzigen. Het voordeel van dezedatasets.xmlis dat je op elk moment nieuwe waarden kunt opgeven, zelfs wanneerERDDAP™is aan het rennen. Wijzigingen in de waarden van deze tags zullen de volgende keer van kracht wordenERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag). De tag namen beschrijven hun doel, maar zie de standaard inhoud in messages.xml voor een dieper begrip.
    
    *   &lt;standaardLicentie&gt;
    *   &lt;standaardContact&gt;
    *   &lt;standaardDataLicens&gt;
    *   &lt;standaardDisclaimerOfEndorsement&gt;
    *   &lt;standaardDisclaimerOfExterneLinks&gt;
    *   &lt;standaardGeneralDisclaimer&gt;
    *   &lt;standaard Privacybeleid&gt;
    *   &lt;startHeadHtml5&gt;
    *   &lt;startBodyHtml5&gt; is een goede tag om te veranderen om het uiterlijk van de bovenkant van elke webpagina in uw aanpassenERDDAP. Met name kunt u dit gebruiken om eenvoudig een tijdelijk bericht toe te voegen aan deERDDAP™startpagina (Bijvoorbeeld: "Bekijk de nieuwe JPL MUR SST v4.1 dataset ..." of "ThisERDDAP™is offline voor onderhoud 2019-05-08T17:00:00 PDT tot 2019-05-08T20:00:00 PDT.") . Een grill van het plaatsen van deze tag indatasets.xmlis: wanneer u opnieuw startERDDAP, het allereerste verzoek omERDDAP™geeft de standaardstart terug BodyHtml5 HTML, maar elke volgende aanvraag zal gebruik maken van de startBodyHtml5 HTML gespecificeerd indatasets.xml.
    *   &lt;de korte beschrijving Html&gt; is een goede tag om te veranderen om de beschrijving van uwERDDAP. Merk op dat u dit eenvoudig kunt wijzigen om een tijdelijk bericht toe te voegen op de startpagina (b.v., "DitERDDAP™is offline voor onderhoud 2019-05-08T17:00:00 PDT tot 2019-05-08T20:00:00 PDT.") .
    *   &lt;endBodyHtml5&gt;
    
      
VoorERDDAP™v2,00, deze werden gespecificeerd in setup.xml, die nog steeds is toegestaan maar ontmoedigd.
     
### &lt;zelden Activiteit&gt;{#unusualactivity} 
* [ ** &lt;ongebruikelijkActiviteit&gt; ** ] (#ongebruikelijke activiteit) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xmlom het maximum aantal verzoeken tussen twee punten van LoadDatasets te specificeren dat als normaal wordt beschouwd (standaard=10000) . Als dat aantal wordt overschreden, wordt een e-mail naar e-mail gestuurdAlles naar (zoals gespecificeerd in setup.xml) . Bijv.
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag). VoorERDDAP™v2,00, dit werd gespecificeerd in setup.xml, die nog steeds is toegestaan maar ontmoedigd.
     
### &lt;updateMaxEvents&gt;{#updatemaxevents} 
* [ ** &lt;updateMaxEvents&gt; ** ] (#updatemaxevents) is een zelden gebruikte OPTIONAL tag&lt;erddapDatasets&gt; tag indatasets.xmlhet maximum aantal bestandsveranderingsgebeurtenissen specificeren (standaard=10) Dat zal door de&lt;updateEveryNMillis&gt;] (#Updateeveryenmillis) systeem alvorens over te schakelen naar het herladen van de dataset. Bijvoorbeeld,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
De updateEveryNMillis systeem is bedoeld om zeer snel te draaien vlak voordat het verzoek van een gebruiker wordt verwerkt. Als er veel bestandsveranderingen zijn, dan kan het waarschijnlijk niet snel draaien, dus in plaats daarvan vraagt het om herladen van de dataset. Als uERDDAP™behandelt datasets die up-to-date moeten blijven, zelfs als er veranderingen zijn in een groot aantal gegevensbestanden, kunt u dit instellen op een groter aantal (100?) .

### &lt;gebruiker&gt;{#user} 
* [ ** &lt;gebruiker&gt; ** ] (#user) is een OPTIONAL tag binnen een&lt;erddapDatasets&gt; tag indatasets.xmldie gebruikersnaam van een gebruiker identificeert, wachtwoord (if authenticatie=custom) , en rollen (een door komma's gescheiden lijst) . Het gebruik van gebruikersnaam en wachtwoord varieert enigszins op basis van de waarde van [&lt;authenticatie&gt;] (/docs/server-admin/extra-informatie#authenticatie) in uwERDDAP's setup.xml bestand.
    * Dit maakt deel uit vanERDDAP's[beveiligingssysteem](/docs/server-admin/additional-information#security)voor het beperken van de toegang tot bepaalde datasets tot sommige gebruikers.
    * Maak een aparte&lt;gebruiker&gt; tag voor elke gebruiker. Optioneel, als authenticatie=oauth2, kunt u twee&lt;gebruiker&gt; tags voor elke gebruiker: één voor wanneer de gebruiker via Google, een voor wanneer de gebruiker inlogt via Orcid, vermoedelijk met dezelfde rollen.
    * Als er geen&lt;gebruiker&gt; tag voor een client, s/he zal alleen toegang hebben tot openbare datasets, d.w.z. datasets die geen [ hebben&lt;toegankelijkTo&gt;] (#accessibleto) Tag.
    * gebruikersnaam
Voor authenticatie=custom is de gebruikersnaam meestal een combinatie van letters, cijfers, onderstrepingen en perioden.
Voor authenticatie=email is de gebruikersnaam het e-mailadres van de gebruiker. Het kan elk e-mailadres zijn.
Voor authenticatie=google is de gebruikersnaam het volledige e-mailadres van de gebruiker. Dit omvat Google-beheerde accounts zoals@noaa.govrekeningen.
Voor authenticatie=orcid is de gebruikersnaam het Orcid-accountnummer van de gebruiker (met streepjes) .
Voor authenticatie=oauth2 is de gebruikersnaam het volledige Google-e-mailadres of het Orcid-accountnummer van de gebruiker. (met streepjes) .
    * wachtwoord
Voor authenticatie=email, google, orcid, of oauth2, geen wachtwoordattribuut opgeven.
Voor authenticatie=custom moet je een wachtwoordattribuut voor elke gebruiker opgeven.
        * De wachtwoorden die gebruikers invoeren zijn hoofdlettergevoelig en moeten 8 of meer tekens hebben zodat ze moeilijker te kraken zijn. Tegenwoordig kunnen zelfs 8 tekens snel en goedkoop worden gekraakt door brute kracht met behulp van een cluster van computers op AWS.ERDDAP™verplicht alleen het minimum van 8 tekens wanneer de gebruiker probeert aan te melden (niet wanneer de&lt;user&gt; tag wordt verwerkt, omdat die code alleen de hash vertakking van het wachtwoord ziet, niet het wachtwoord in platte tekst).
        * setup.xml's&lt;wachtwoordcodering&gt; bepaalt hoe wachtwoorden worden opgeslagen in de&lt;gebruiker&gt; tags indatasets.xml. Om de veiligheid te verhogen, zijn de opties:
            *   [MD5](https://en.wikipedia.org/wiki/MD5)  (Gebruik dit niet&#33;) -- voor het wachtwoordattribuut, geef de MD5 hash-samenvatting van het wachtwoord van de gebruiker op.
            * UEPMD5 (Gebruik dit niet&#33;) -- voor het wachtwoordattribuut, de MD5 hash vert. van *gebruikersnaam* :ERDDAP: *wachtwoord* . De gebruikersnaam en "ERDDAP" worden gebruikt om[zout](https://en.wikipedia.org/wiki/Salt_(cryptography)) de hash waarde, waardoor het moeilijker te decoderen.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (niet aanbevolen) -- voor het wachtwoordattribuut, geef de SHA-256 hash vertakking van het wachtwoord van de gebruiker op.
            * UEPSHA256 (standaard, aanbevolen wachtwoordcodering. Maar veel beter: gebruik de google, orchidee, of oauth2 authenticatie opties.) -- voor het wachtwoordattribuut, geef de SHA-256 hash-samenvatting van *gebruikersnaam* :ERDDAP: *wachtwoord* . De gebruikersnaam en "ERDDAP" worden gebruikt om de hash waarde zout, waardoor het moeilijker te decoderen.
        * Op Windows kunt u MD5 wachtwoordverteringswaarden genereren door een MD5 programma te downloaden (zoals[MD5](https://www.fourmilab.ch/md5/)) en gebruik (bijvoorbeeld) :
md5 -djsmith:ERDDAP: *werkelijkwachtwoord* 
        * Op Linux/Unix kun je MD5 vertakkingswaarden genereren met behulp van het ingebouwde md5sum programma (bijvoorbeeld) :
echo -n "jsmith:ERDDAP: *werkelijkwachtwoord* "|md5sum
        * Opgeslagen wachtwoorden zijn hoofdlettergevoelig. De opgeslagen vormen van MD5 en UEPMD5 wachtwoorden zijn niet hoofdgevoelig.
        * Bijvoorbeeld (UEPMD5 gebruiken) , if username="jsmith" and password="myPassword," the&lt;gebruiker&gt; tag is:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
waar het opgeslagen wachtwoord is gegenereerd met
md5 -djsmith:ERDDAP:myPassword
        * rollen is een door komma's gescheiden lijst van rollen waarvoor de gebruiker bevoegd is. Elke&lt;dataset&gt; mag een [ hebben&lt;toegankelijkTo&gt;] (#accessibleto) tag waarin de rollen worden vermeld die toegang hebben tot die dataset. Voor een bepaalde gebruiker en een gegeven dataset, als een van de rollen in de lijst van rollen van de gebruiker overeenkomt met een van de rollen in de lijst van de dataset van&lt;toegankelijkTo&gt; rollen, dan is de gebruiker bevoegd om toegang te krijgen tot die dataset.
            
Elke gebruiker die inlogt krijgt automatisch de rol\\[iedereenlogged In\\], of er een&lt;gebruiker&gt; tag voor hen indatasets.xmlOf niet. Dus als een gegeven dataset heeft
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
dan zal elke gebruiker die is ingelogd geautoriseerd zijn om toegang te krijgen tot die dataset, zelfs als er geen&lt;gebruiker&gt; tag voor hen indatasets.xml.
            
    * Wijzigingen in de waarde van deze tag worden de volgende keer van krachtERDDAP™leestdatasets.xml, inclusief in reactie op een gegevensset[vlag](/docs/server-admin/additional-information#flag).
         
### &lt;padRegex&gt;{#pathregex} 
* [ ** &lt;padRegex&gt; ** ] (#pathredex) geeft u een reguliere expressie aan die beperkt welke paden (welke submappen) zal worden opgenomen in de dataset. De standaard is .\\*, wat overeenkomt met alle paden. Dit is een zelden gebruikt, zelden nodig, OPTIONAL label voorEDDGridFromFiles datasets, EDDTableFromFiles datasets en een paar andere datasets. Maar als je het nodig hebt, heb je het echt nodig.
    
Om dit te laten werken, moet je echt goed zijn met reguliere expressies. Zie dit[regex documentatie](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)en[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). In het bijzonder moet u weten over vangstgroepen (iets tussen haakjes) , en het "of" symbool "|"
Samen geven deze u een aantal opties aan, bijvoorbeeld: (optie1|optie2|optie3) .
Ook kunnen alle opties niets zijn, bijvoorbeeld, (|optie2|optie3) .
Ook moet je weten dat vangstgroepen genest kunnen worden, dat wil zeggen dat elke optie in een vangstgroep een andere vangstgroep kan bevatten, bijvoorbeeld: (|optie2 (|optie2 b|optie2c) |optie3) waarin staat dat optie 2 kan worden gevolgd door niets, of optie2b, of optie2c.
Voor padRegexes zal elke optie één mapnaam zijn gevolgd door een /, bijvoorbeeld, bar/ .
    
Het lastige deel van het padRegex is: WanneerERDDAP™recursief daalt de directory boom af, het padRegex moet alle paden accepteren die het tegenkomt op zijn weg naar de directory's met data. Regex's met geneste groepen zijn een goede manier om hiermee om te gaan.
    
Een voorbeeld:
Stel dat we de volgende mapstructuur hebben:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
en de opgegeven fileDirectory is /foo/bar/, en we willen alleen de.ncbestanden in de D\\[0-9\\]&#123;4&#125;/a/submappen.
De oplossing is het instellen van pathRegex naar /foo/bar/ (|D\\[0-9\\]&#123;4&#125; / (|a /) )   
Dat zegt:
Het pad moet beginnen met /foo/bar/
Dat kan worden gevolgd door niets of D\\[0-9\\]&#123;4&#125; /
Dat kan worden gevolgd door niets of a/
    
Ja, padRegex's kan ongelooflijk moeilijk te formuleren zijn. Als je vastzit, vraag het dan aan een computerprogrammeur. (Het dichtste in de echte wereld bij een tovenaar die bezweringen spuwt?) of stuur een e-mail naar Chris. John bij Noaa.gov.
    
### &lt;dataset&gt;{#dataset} 
* [ ** &lt;dataset&gt; ** ] (#dataset) is een OPTIONAL (maar altijd gebruikt) tag binnen een&lt;erddapDatasets&gt; tag indatasets.xmldat (als u alle informatie tussen&lt;dataset&gt; en&lt;/dataset&gt;) beschrijft volledig één dataset. Bijvoorbeeld,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Er kan een aantal dataset tags in uwdatasets.xmlbestand.
Binnen een&lt;dataset&gt;-tag:
     
    *    **type=" *a Type* "** is een vereist kenmerk binnen een&lt;dataset&gt; tag indatasets.xmldie het datasettype identificeert (bijvoorbeeld of het eenEDDGrid/ridded of EDDTable/tabulaire dataset) en de bron van de gegevens (bijvoorbeeld een database, bestanden of een remoteOPeNDAPserver) . Zie[ **Lijst van type gegevensverzameling** ](#list-of-types-datasets).
         
#### dataset Id{#datasetid} 
*   [ **datasetID=" *aDatasetID* "** ](#datasetid)is een vereist kenmerk binnen een&lt;dataset&gt; tag die een korte toewijzen (meestal&lt;15 tekens), unieke, identificerende naam van een dataset.
    * DedatasetIDs MOET een brief zijn (A-Z, a-z) gevolgd door een aantal A-Z, a-z, 0-9, en \\_ (maar het beste als&lt;32 tekens totaal).
    * Dataset ID's zijn hoofdlettergevoelig, maar maken geen tweedatasetIDs die alleen verschillen in bovenste/lage letters. Het zal problemen veroorzaken op Windows-computers (jouw en/of de computer van een gebruiker) .
    * Beste praktijken: Wij raden het gebruik van[kameel Zaak](https://en.wikipedia.org/wiki/CamelCase).
    * Beste praktijken: We raden aan dat het eerste deel een acroniem of afkorting is van de naam van de broninstelling en het tweede deel een acroniem of afkorting van de naam van de dataset is. Waar mogelijk maken we een naam die de naam van de bron voor de dataset weergeeft. Bijvoorbeeld, we gebruiktendatasetID="erdPHssta8day" voor een dataset uit deNOAA NMFS SWFSCAfdeling Milieuonderzoek (ERD) die door de bron wordt aangewezen als satelliet/PH/sstA/8day.
    * Als je de naam van een dataset wijzigt, de oude dataset (met de oude naam) zal nog steeds in leven zijnERDDAP. Dit is een "wees" dataset, omdat de specificatie hiervoor indatasets.xmlis nu weg. Dit moet worden geregeld:
        1. VoorERDDAP™V2.19 en later hoef je niets te doen.ERDDAP™verwijdert automatisch deze weesdatasets.
        2. VoorERDDAP™v2.18 en eerder moet je iets doen om de weesdatasets te verwijderen: Maak een actieve "valse" dataset, bijvoorbeeld,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Na de volgende grote belasting Datasets, Je kunt die tag verwijderen nadat de oude dataset inactief is.
                 
#### actief{#active} 
*   [ **actief=" *booleaans* "** ](#active)is een OPTIONAL attribuut binnen een&lt;dataset&gt; tag indatasets.xmldie aangeeft of een dataset actief is (in aanmerking komen voor gebruik inERDDAP) Of niet.
    * Geldige waarden zijn waar (de standaard) en vals.
    * Aangezien de standaard is waar, hoeft u dit attribuut niet te gebruiken totdat u deze dataset tijdelijk of permanent wilt verwijderen uitERDDAP.
    * Als je gewoon een active="true" dataset verwijdert uitdatasets.xml, de dataset zal nog steeds actief zijn inERDDAP™maar zal nooit worden bijgewerkt. Een dergelijke dataset zal een "wees" zijn en als zodanig op de status worden vermeld. html webpagina rechts onder de lijst met datasets die niet geladen konden worden.
    * Als je active="false" instelt,ERDDAP™zal de dataset deactiveren de volgende keer dat het probeert de dataset bij te werken. Als je dit doet,ERDDAP™gooit geen informatie die het kan hebben opgeslagen over de dataset en doet zeker niets met de werkelijke gegevens.
    * Om een dataset te verwijderen vanERDDAP™, zie[Dataset verwijderen forceren](/docs/server-admin/additional-information#removing-datasets).
         

 ** Verschillende tags kunnen verschijnen tussen de&lt;dataset&gt; en&lt;/dataset&gt;-tags. **   
Er is enige variatie waarbij tags zijn toegestaan door welke soorten datasets. Zie de documentatie voor een specifieke[type dataset](#list-of-types-datasets)voor details.

#### &lt;toegankelijk To&gt;{#accessibleto} 
* [ ** &lt;toegankelijk Aan&gt; ** ] (#accessibleto) is een OPTIONAL tag binnen een&lt;dataset&gt; tag die een door komma's gescheiden lijst van[rollen](#user)die toegang hebben tot deze gegevensset. Bijvoorbeeld,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Dit maakt deel uit vanERDDAP's[beveiligingssysteem](/docs/server-admin/additional-information#security)voor het beperken van de toegang tot bepaalde datasets tot sommige gebruikers.
    * Als deze tag niet aanwezig is, alle gebruikers (zelfs als ze niet ingelogd zijn) zal toegang hebben tot deze dataset.
    * Als deze tag aanwezig is, zal deze dataset alleen zichtbaar en toegankelijk zijn voor ingelogde gebruikers die een van de opgegeven rollen hebben. Deze dataset zal niet zichtbaar zijn voor gebruikers die niet zijn ingelogd.
    * Elke gebruiker die inlogt krijgt automatisch de rol\\[iedereenlogged In\\], of er een&lt;gebruiker&gt; tag voor hen indatasets.xmlOf niet. Dus als een gegeven dataset heeft
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
dan zal elke gebruiker die is ingelogd geautoriseerd zijn om toegang te krijgen tot die dataset, zelfs als er geen&lt;gebruiker&gt; tag voor hen indatasets.xml.
         
#### &lt;grafiekenAccessibleTo&gt;{#graphsaccessibleto} 
* [ ** &lt;grafiekenToebehorenTo&gt; ** ] (#graphsaccessibleto) is een OPTIONAL tag binnen een&lt;dataset&gt; tag indatasets.xmldie bepaalt of afbeeldingen en metagegevens voor de dataset beschikbaar zijn voor het publiek. Het biedt een manier om gedeeltelijk overschrijven van de dataset [&lt;toegankelijkTo&gt;] (#accessibleto) setting. De toegestane waarden zijn:
    * auto -- Deze waarde (of het ontbreken van een&lt;grafiekenAccessibleTo&gt; tag voor de dataset) maakt toegang tot grafieken en metadata van de dataset nabootsen van de dataset&lt;toegankelijkTo&gt; instelling.
Dus als de dataset privé is, zijn de grafieken en metadata privé.
En als de dataset openbaar is, zullen de grafieken en metadata openbaar zijn.
    * publiek -- Deze instelling maakt de dataset grafieken en metadata toegankelijk voor iedereen, zelfs gebruikers die niet zijn ingelogd, zelfs als de dataset is anders privé omdat het een&lt;toegankelijkTo&gt;-tag.
         
#### &lt;toegankelijk ViaFiles&gt;{#accessibleviafiles} 
* [ ** &lt;toegankelijkViaFiles&gt; ** ] (#toegankelijkeviabestanden) is een OPTIONAL tag binnen een&lt;dataset&gt; tag indatasets.xmlvoor[EDDGridAlglobalExistingDimension](#eddgridaggregateexistingdimension),[EDDGridKopiëren](#eddgridcopy),[EDDGridFromEDTable](#eddgridfromeddtable),[EDDGridVanErdap](#eddfromerddap),[EDDGridVanEtopo](#eddgridfrometopo),[EDDGridFromFiles](#eddgridfromfiles)  (inclusief alle subklassen) ,[EDDGridSideBySide](#eddgridsidebyside),[EDDtabelkopie](#eddtablecopy) [EDDtabelVanErdap](#eddfromerddap),[EDDTabelVanEDDGrid](#eddtablefromeddgrid)en[EDDTableFromFiles](#eddtablefromfiles)  (inclusief alle subklassen) datasets. Het kan een waarde hebben van waar of onwaar. Bijvoorbeeld,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Als de waarde waar is,ERDDAP™zal het zo maken dat gebruikers kunnen bladeren en downloaden van de dataset brongegevens bestanden viaERDDAP's["files"systeem](https://coastwatch.pfeg.noaa.gov/erddap/files/). Zie"files"systeem[documentatie](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)voor meer informatie.
    
De standaard waarde van&lt;toegankelijkViaFiles&gt; komt van&lt;standaardToebehorenViaFiles&gt; in[setup.xml](/docs/server-admin/deploy-install#setupxml). Het heeft een standaard waarde van vals, maar we raden je aan die tag toe te voegen aan je setup.xml met een waarde van waar.
    
Aanbeveling -- We raden aan om alle relevante datasets toegankelijk te maken via het bestandssysteem door&lt;defaultAccessibleViaFiles&gt; te true in setup.xml omdat er een groep gebruikers is voor wie dit de voorkeur is om de gegevens te krijgen. De Commissie is van mening dat de"files"systeem maakt het gemakkelijk voor gebruikers om te zien welke bestanden beschikbaar zijn en wanneer ze voor het laatst gewijzigd, waardoor het gemakkelijk voor een gebruiker om hun eigen kopie van de hele dataset te behouden. Als u over het algemeen geen datasets toegankelijk wilt maken via het bestandssysteem, stel&lt;defaultAccessibleViaFiles&gt; to false. In beide gevallen, gewoon gebruiken&lt;toegankelijkViaFiles&gt; voor de weinige datasets die uitzonderingen zijn op het algemene beleid dat door&lt;standaardToebehorenViaFiles&gt; (bijvoorbeeld, wanneer de dataset gebruikt[.ncml](#ncml-files)bestanden, die niet echt nuttig zijn voor gebruikers) .
     
#### &lt;toegankelijk ViaWMS&gt;{#accessibleviawms} 
* [ ** &lt;toegankelijk ViaWMS&gt; ** ] (#accessibleviawms) is een OPTIONAL tag binnen een&lt;dataset&gt; tag indatasets.xmlvoor iedereen[EDDGrid](#eddgrid)subklassen. Het kan een waarde van waar hebben (de standaard) of vals. Bijvoorbeeld,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Als de waarde niet klopt,ERDDAP'sWMSDe server zal niet beschikbaar zijn voor deze dataset. Dit wordt vaak gebruikt voor datasets met een lengtegraad van meer dan 180 (die technisch ongeldig is voorWMSdiensten) , en waarvoor u ook een variant van de dataset met lengtegraad waarden volledig in het bereik -180 tot 180 via[EDDGridLonPM180](#eddgridlonpm180).
Als de waarde waar is,ERDDAP™zal proberen om de dataset beschikbaar te maken viaERDDAP'sWMSserver. Maar als de dataset volledig ongeschikt is voorWMS  (Er zijn bijvoorbeeld geen lengte- of breedtegraadgegevens) , dan is de dataset niet beschikbaar viaERDDAP'sWMSserver, ongeacht deze instelling.
     
#### &lt;toevoegen Variabelen Waar &gt;{#addvariableswhere} 
* [&lt;addVariablesWaar&gt;] (#Variableswhere) is een OPTIONAL tag binnen de&lt;dataset&gt; tag voor alle EDDTable datasets.
    
Verzoeken naar een EDDTable dataset kunnen &toevoegen Variabelen waarbij (" *eigenschap Naam* "," *eigenschap Waarde* ") , die verteltERDDAP™om alle variabelen toe te voegen in de dataset waar *attribuutName=attribuutValue* naar de lijst van gevraagde variabelen. Bijvoorbeeld als een gebruiker &add toevoegt Variabelen waarbij ("ioos\\_category","Wind") op een vraag,ERDDAPzal alle variabelen in de dataset die eenioos\\_category=Windattribuut aan de lijst van gevraagde variabelen (bijvoorbeeld, windSpeed, windDirection, windGustSpeed) . *eigenschap Naam* en *eigenschap Waarde* zijn hoofdlettergevoelig.
    
Indatasets.xml, als de brok van dataset.xml voor een dataset heeft
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
bijvoorbeeld,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
het formulier voor gegevenstoegang (.html web pagina) voor de dataset bevat een widget (voor elk kenmerkNaam in de door komma's gescheiden lijst) recht onder de lijst van variabelen waarmee gebruikers een attribuutwaarde kunnen opgeven. Als de gebruiker een attribuutwaarde selecteert voor een of meer van de attribuutnamen, worden deze toegevoegd aan het verzoek via &add Variabelen waarbij (" *eigenschap Naam* "," *eigenschap Waarde* ") . Dus, dit tag indatasets.xmlkunt u de lijst van attribuutnamen die zal verschijnen op het Data Access Form voor die dataset specificeren en maakt het gemakkelijk voor gebruikers om &addVariables toe te voegen Waar het verzoek betrekking heeft. De *attribuutNamesCSV* lijst is hoofdlettergevoelig.
    
#### &lt;hoogteMetersPerSourceUnit&gt;{#altitudemeterspersourceunit} 
* [ ** &lt;hoogteMetersPerSourceUnit&gt; ** ] (#hoogtemeterspersourceunit) is een OPTIONAL tag binnen de&lt;dataset&gt;-tag in datasets. xxml voor EDDTableVanSOSdatasets (Alleen&#33;) die een getal specificeert dat wordt vermenigvuldigd met de bronhoogte of dieptewaarden om deze om te zetten in hoogtewaarden (in meters boven zeeniveau) . Bijvoorbeeld,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Deze tag MOET worden gebruikt als de verticale aswaarden van de dataset geen meters, positief=up zijn. Anders is het OPTIONAL, omdat de standaardwaarde 1. Bijvoorbeeld,
    * Als de bron al gemeten is in meters boven zeeniveau, gebruik 1 (of gebruik deze tag niet, aangezien 1 de standaard waarde is) .
    * Als de bron wordt gemeten in meter onder zeeniveau, gebruik dan -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Als de bron wordt gemeten in km boven zeeniveau, gebruik dan 0,001.
         
#### &lt;standaardDataQuery&gt;{#defaultdataquery} 
* [ ** &lt;standaardDataQuery&gt; ** ] (#defaultdataquery) is een OPTIONAL tag binnen een&lt;dataset&gt; tag indatasets.xmldat verteltERDDAP™om de opgegeven query te gebruiken (het deel van de URL na de "?") als het .html bestand Type (het formulier voor gegevenstoegang) wordt gevraagd zonder verzoek.
    * Je zult dit waarschijnlijk zelden nodig hebben.
    * U moet XML-coderen (niet procent-encode) de standaardqueries omdat ze in een XML-document zitten. Bijvoorbeeld, & wordt &amp; ,&lt;wordt&lt;, &gt; wordt &gt; .
    * Controleer alsjeblieft je werk. Het is gemakkelijk om een fout te maken en niet te krijgen wat je wilt.ERDDAP™zal proberen om uw fouten op te ruimen -- maar vertrouw daar niet op, want\\*hoe\\*Het kan veranderen.
    * Voor griddap-datasets is een algemeen gebruik van dit om een andere standaarddiepte of hoogtedimensiewaarde op te geven. (bijvoorbeeld,\\[0\\]in plaats van\\[laatste\\]) .
In ieder geval moet je altijd alle variabelen opsommen, altijd dezelfde dimensiewaarden gebruiken voor alle variabelen, en bijna altijd gebruiken\\[0\\],\\[laatste\\], of\\[0:last\\]voor de dimensiewaarden.
Bijvoorbeeld:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Voortabledapdatasets, als u geen beperkingen specificeert, zal het verzoek de gehele dataset teruggeven, die onpraktisch groot kan zijn, afhankelijk van de dataset. Als u geen beperkingen wilt specificeren, in plaats van een lege&lt;standaardDataQuery&gt; (wat hetzelfde is als het niet specificeren van een standaard DataQuery) , moet je expliciet alle variabelen die u wilt opnemen in de standaardDataQuery.
    * Voortabledapdatasets, het meest voorkomende gebruik hiervan is het specificeren van een ander standaard tijdbereik (ten opzichte van max (tijd) , bijvoorbeeld, &time&gt;=max (tijd) -1day, of relatief tot nu, bijvoorbeeld, &time&gt;=now-1 dag) .
Vergeet niet dat het vragen van geen gegevens variabelen is hetzelfde als het specificeren van alle gegevens variabelen, dus meestal kunt u gewoon de nieuwe tijd beperking.
Bijvoorbeeld:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
of
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery&gt;{#defaultgraphquery} 
* [ ** &lt;defaultGraphQuery&gt; ** ] (#defaultgraphquery) is een OPTIONAL tag binnen een&lt;dataset&gt; tag indatasets.xmldat verteltERDDAP™om de opgegeven query te gebruiken (het deel van de URL na de "?") als het .graph bestand Type (het Maak een grafiek formulier) wordt gevraagd zonder verzoek.
    * Je zult dit waarschijnlijk zelden nodig hebben.
    * U moet XML-coderen (niet procent-encode) de standaardqueries omdat ze in een XML-document zitten. Bijvoorbeeld, & wordt &amp; ,&lt;wordt&lt;, &gt; wordt &gt; .
    * Controleer alsjeblieft je werk. Het is gemakkelijk om een fout te maken en niet te krijgen wat je wilt.ERDDAP™zal proberen om uw fouten op te ruimen -- maar vertrouw daar niet op, want\\*hoe\\*Het kan veranderen.
    * Voor griddap datasets is het meest voorkomende gebruik van dit om een andere standaarddiepte- of hoogtedimensiewaarde op te geven (bijvoorbeeld,\\[0\\]in plaats van\\[laatste\\]) en/of om aan te geven dat een specifieke variabele wordt weergegeven.
In ieder geval, zult u bijna altijd gebruiken\\[0\\],\\[laatste\\], of\\[0:last\\]voor de dimensiewaarden.
Bijvoorbeeld:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (maar zet het allemaal op één lijn) 
    * Voortabledapdatasets, als je geen beperkingen opgeeft, zal het verzoek de gehele dataset graveren, wat lang kan duren, afhankelijk van de dataset.
    * Voortabledapdatasets, het meest voorkomende gebruik hiervan is het specificeren van een ander standaard tijdbereik (ten opzichte van max (tijd) , bijvoorbeeld, &time&gt;=max (tijd) -1day, of relatief tot nu, bijvoorbeeld, &time&gt;=now-1 dag) .
Vergeet niet dat het vragen van geen gegevens variabelen is hetzelfde als het specificeren van alle gegevens variabelen, dus meestal kunt u gewoon de nieuwe tijd beperking.
Bijvoorbeeld:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
of
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensiewaardenInGeheugen&gt;{#dimensionvaluesinmemory} 
* [ ** &lt;dimensie WaardenInGeheugen&gt; ** ] (#dimensiewaardeninmemory)   (waar (de standaard) of vals) is een OPTIONAL en zelden gebruikt&lt;dataset&gt; tag voor elkeEDDGriddataset die verteltERDDAP™waar de bronwaarden van de afmetingen worden bewaard (ook bekend als deaxisVariables) :
    
    * waar = in het geheugen (wat sneller is maar meer geheugen gebruikt) 
    * false = op schijf (wat langzamer is maar geen geheugen gebruikt) 
    
Bijvoorbeeld,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
U moet dit alleen gebruiken met de niet-standaard waarde van valse als uwERDDAP™heeft veel datasets met zeer grote afmetingen (b.v. miljoenen waarden, b.v. inEDDGridVan AudioFiles-datasets) enERDDAP's In Use geheugengebruik is altijd te hoog. Zie het Geheugen: momenteel met de regel op\\[uw domein\\]/erddap/status.htmlom te controlerenERDDAP™geheugengebruik.
     
#### &lt;fileTableInMemory&gt;{#filetableinmemory} 
* [ ** &lt;fileTableInMemory&gt; ** ] (#filetableinmemory)   (waar of onwaar (de standaard) ) is een OPTIONAL tag binnen de&lt;dataset&gt; tag voor elkeEDDGridFromFiles en EDDTable FromFiles dataset die verteltERDDAP™waar het bestandstabel bewaard moet worden (die informatie heeft over elk brongegevensbestand) :
    
    * waar = in het geheugen (wat sneller is maar meer geheugen gebruikt) 
    * false = op schijf (wat langzamer is maar geen geheugen gebruikt) 
    
Bijvoorbeeld,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Als je dit voor een dataset op true zet, houd dan een oogje op het Geheugen: momenteel gebruik je regel op\\[uw domein\\]/erddap/status.htmlom ervoor te zorgen datERDDAP™Heeft nog genoeg gratis geheugen.
     
#### &lt;fgdcFile&gt;{#fgdcfile} 
* [ ** &lt;fgdcBestand&gt; ** ] (#fgdcfile) is een OPTIONAL tag binnen een&lt;dataset&gt; tag indatasets.xmldat verteltERDDAP™om een vooraf gemaakt FGDC-bestand te gebruiken in plaats vanERDDAP™probeer het bestand te genereren. Gebruik:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *volledig Bestandsnaam* kan verwijzen naar een lokaal bestand (ergens op het serverbestandssysteem) of de URL van een bestand op afstand.
Als *volledig Bestandsnaam* \\="" of het bestand is niet gevonden, de dataset zal geen FGDC metadata hebben. Dus dit is ook handig als je de FGDC metadata wilt onderdrukken voor een specifieke dataset.
Of, je kunt&lt;fgdcActive&gt;false&lt;/fgdcActive&gt; in setup.xml te vertellenERDDAP™geen FGDC-metadata aan te bieden voor een dataset.
     
#### &lt;iso19115 Bestand&gt;{#iso19115file} 
* [ ** &lt;iso19115Bestand&gt; ** ] (#iso19115file) is een OPTIONAL tag binnen een&lt;dataset&gt; tag indatasets.xmldat verteltERDDAP™om een pre-made ISO 19115 bestand te gebruiken in plaats vanERDDAP™probeer het bestand te genereren. Gebruik:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *volledig Bestandsnaam* kan verwijzen naar een lokaal bestand (ergens op het serverbestandssysteem) of de URL van een bestand op afstand.
Als *volledig Bestandsnaam* \\="" of het bestand is niet gevonden, de dataset zal geen ISO 19115 metadata hebben. Dit is dus ook handig als je de ISO 19115 metadata voor een specifieke dataset wilt onderdrukken.
Of, je kunt&lt;iso19115Active&gt;false&lt;/iso19115Active&gt; in setup.xml te vertellenERDDAP™ISO 19115-metadata voor geen enkele dataset aan te bieden.
     
#### &lt;matchAxis NDigits&gt;{#matchaxisndigits} 
* [ ** &lt;MatchAxisNDigits&gt; ** ] (#matchaxisndigits) is een OPTIONAL tag binnen eenEDDGrid &lt;dataset&gt; tag voorEDDGriddatasets die aggregaties zijn, bijvoorbeeld samenvoegingen van bestanden. Elke keer als de dataset wordt herladen,ERDDAP™controleert of de aswaarden van elke component van de aggregatie gelijk zijn. De nauwkeurigheid van de test wordt bepaald door de[matchAxisNDigits](#matchaxisndigits), waarin het totale aantal cijfers wordt gespecificeerd dat moet overeenkomen bij het testen van dubbele precisieaswaarden, 0 - 18 (de standaard) . Bij het testen van float aswaarden wordt de test uitgevoerd met matchAxisNDigits/2 cijfers. Een waarde van 18 of hoger verteltEDDGridom een exacte test te doen. Een waarde van 0 verteltEDDGridgeen tests te doen die niet worden aanbevolen, behalve zoals hieronder beschreven.
    
HoewelEDDGridstaat toe dat de componenten van de aggregatie iets verschillende aswaarden hebben, slechts één asset wordt getoond aan de gebruiker. De set is van hetzelfde onderdeel dat de bronmetadata van de dataset levert. Bijvoorbeeld, voorEDDGridFromFiles datasets, die worden gespecificeerd door de&lt;metadataVan&gt; instelling (standaard=laatste) .
    
Gebruik van matchAxisNDigits\\=0 wordt in de meeste gevallen sterk ontmoedigd, omdat het alle controle uitschakelt. Zelfs minimale controle is nuttig omdat het ervoor zorgt dat de componenten geschikt zijn voor aggregating. We gaan er allemaal van uit dat alle componenten geschikt zijn, maar dat is niet altijd zo. Dit is dus een belangrijke geestelijke test. Zelfs waarden van matchAxisNDigits1, 2, 3 of 4 worden ontmoedigd omdat de verschillende aswaarden vaak aangeven dat de componenten aangemaakt zijn (Geemmerd?) een andere manier en zijn dus niet geschikt voor aggregatie.
    
Er is één geval waarin het gebruik van matchAxisNDigits\\=0 nuttig en aanbevolen is: met samenvoegingen van remote bestanden, bijvoorbeeld gegevens in S3 emmers. In dit geval, als de dataset cacheFromUrl, cacheSizeGB, matchAxisNDigits\\=0, en deEDDGridFromFiles systeem voor[Samenvoegen via Bestandsnamen](#aggregation-via-file-names-or-global-metadata), danEDDGridhoeft niet alle externe bestanden te lezen om de aggregatie te doen. Hierdoor kunnen datasets gemaakt van gegevens in S3 emmers zeer snel laden (in tegenstelling tot absurd langzaam alsEDDGridmoet alle bestanden downloaden en lezen) .
    
#### &lt;nThreads&gt;{#nthreads} 
* Beginnen metERDDAP™versie 2.00, wanneer een subklasse van EDDTableFromFiles ofEDDGridleest gegevens van de bron, het kan een stuk gegevens lezen (bv. één bronbestand) tegelijk (in één draad)   (dat is de standaard) of meer dan één stuk gegevens (bv. 2+ bronbestanden) tegelijk (in 2 of meer draden) tijdens de behandeling van elk verzoek.
     
    * Duimregel:
Voor de meeste datasets op de meeste systemen, gebruik nThreads=1, de standaard. Als je een krachtige computer hebt (veel CPU cores, veel geheugen) , dan overwegen om nThreads op 2, 3, 4 of hoger (maar nooit meer dan het aantal CPU cores in de computer) voor datasets die van nut kunnen zijn:
        
        * De meeste EDDTableFromFiles datasets zullen profiteren.
        * Datasets waar iets een vertraging veroorzaakt voordat een brok gegevens daadwerkelijk kan worden verwerkt, zullen bijvoorbeeld profiteren van:
            * Datasets met[extern gecomprimeerd (bv..gz) ](#externally-compressed-files)binair (bv..nc) bestanden, omdatERDDAP™moet het hele bestand te decomprimeren voordat het kan beginnen om het bestand te lezen.
            * Datasets die gebruikt worden[cacheSizeGB](#cachefromurl), omdatERDDAP™vaak moet het bestand te downloaden voordat het kan lezen.
            * Datasets met gegevensbestanden die zijn opgeslagen op een parallel bestandssysteem met een hoge breedte, omdat het meer gegevens kan leveren, sneller, wanneer gevraagd. Voorbeelden van parallelle bestandssystemen zijn[JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures),[pNFS](http://www.pnfs.com/),[GlusterFS](https://en.wikipedia.org/wiki/Gluster), Amazon S3, en Google Cloud Storage.
                 
        
Waarschuwing: Bij het gebruik van nThreads&gt;1, let opERDDAP's geheugengebruik, draadgebruik en algemene responsiviteit (zie[ERDDAP's statuspagina](/docs/server-admin/additional-information#status-page)) . Zie de opmerkingen over deze kwesties hieronder.
         
    * Voor een gegeven dataset kan deze nThreads-instelling van verschillende plaatsen komen:
        
        * Indien dedatasets.xmlbrok voor een dataset heeft een&lt;nThreads&gt;-tag (binnen de&lt;dataset&gt; tag, niet als een globaal attribuut) met een waarde &gt;= 1, die waarde van nThreads wordt gebruikt. Je kunt dus voor elke dataset een ander getal opgeven.
        * Anders, indiendatasets.xmlheeft een&lt;nTableThreads&gt;-tag (voor EDDtabel Datasets van FromFiles) of een&lt;nGridThreads&gt;-tag (voorEDDGriddatasets) met een waarde van &lt;= 50 V 1, buiten een&lt;dataset&gt; tag, die waarde van nThreads wordt gebruikt.
        * Anders wordt 1 draad gebruikt, wat een veilige keuze is omdat het de kleinste hoeveelheid geheugen gebruikt.
             
        
Voor de[origineelERDDAP™installatie](https://coastwatch.pfeg.noaa.gov/erddap/index.html), gebruiken we
        &lt;ntablethreads&gt; 6&lt;/ntablethreads&gt; (Het is een krachtige server.) Moeilijke verzoeken vergen nu 30% van de vorige keer.
         
##### Gebruik van hulpbronnen monitoren{#monitor-resource-usage} 
Wanneer u experimenteert met verschillende nThreads instellingen (en misschien het maken van moeilijke steekproef verzoeken aan uwERDDAP) , kunt u het gebruik van uw computer te controleren:
* Op Macs, gebruik Finder: Toepassingen: Hulpmiddelen: Activiteit Monitor
* Op Linux, gebruik top
* Op Windows 10 gebruiken *Ctrl + Shift + Esc* Taakbeheer openen
             
##### Waarschuwing: verminderde responsiviteit{#warning-decreased-responsiveness} 
In afzondering,ERDDAP™zal een verzoek om een dataset met een hogere nThreads instelling sneller vervullen dan als nThreads=1. Maar terwijl dat verzoek wordt verwerkt, andere verzoeken van andere gebruikers zal enigszins verdrongen en krijgen een langzamer antwoord. Ook wanneerERDDAP™reageert op een gegeven verzoek, andere computerbronnen (bv. toegang tot schijven, bandbreedte van het netwerk) kan beperkend zijn, vooral met hogere nThreads-instellingen. Dus met hogere nThreads-instellingen zal de algemene systeemrespons erger zijn als er meerdere verzoeken worden verwerkt -- dit kan zeer vervelend zijn voor gebruikers&#33; Hierdoor: zet nooit nThreads op meer dan het aantal CPU cores in de computer. nThreads=1 is de eerlijkste instelling sinds elke aanvraag (van meerdere gelijktijdige verzoeken) zal een gelijk aandeel van computing resources krijgen. Maar hoe krachtiger de computer, hoe minder dit een probleem zal zijn.
         
##### Waarschuwing: Hoger geheugen Gebruik voorEDDGridDatasets{#warning-higher-memory-use-for-eddgrid-datasets} 
Geheugengebruik tijdens het verwerken van verzoeken is direct evenredig met de nThreads-instelling. Een redelijk veilige vuistregel is:[ERDDAP's geheugeninstellingen](/docs/server-admin/deploy-install#memory)tot ten minste 2 GB + (2GB) . Sommige verzoeken om datasets hebben meer geheugen nodig dan dat. Bijvoorbeeld, het instellen van nThreads=3 voor elkeEDDGriddataset betekent dat de -Xmx instelling minimaal -Xmx8000M moet zijn. Als die geheugeninstelling groter is dan 3/4 het fysieke geheugen van de computer, verminder dan de instelling van nThreads zodat u de geheugeninstelling kunt verlagen.

Het geheugen gebruik van threads verwerken verzoeken naar EDDTable datasets is bijna altijd lager omdat de bestanden zijn meestal veel kleiner. Echter, als een bepaalde EDDTable dataset heeft enorme (Voor de toepassing van deze onderverdeling wordt verstaan onder:) gegevensbestanden, dan zullen bovenstaande opmerkingen ook van toepassing zijn op die datasets.

Wat de nThreads instelling ook is, let goed op de statistieken van het geheugengebruik op uw[ERDDAP's statuspagina](/docs/server-admin/additional-information#status-page). Je moet nooit in de buurt komen van het maximum van het geheugengebruik inERDDAP; anders zullen er ernstige fouten en mislukkingen.
        
##### Tijdelijk ingesteld op 1{#temporarily-set-to-1} 
Als het huidige geheugengebruik zelfs iets hoog is,ERDDAP™zal nThreads voor dit verzoek instellen op 1. Dus,ERDDAP™Bespaart geheugen wanneer geheugen schaars is.
         
##### Returns verkleinen{#diminishing-returns} 
Er zijn dalende rendementen om de nThreads instelling te verhogen: 2 threads zullen veel beter zijn dan 1 (als we dynamische overklokken negeren) . Maar 3 is slechts een stuk beter dan 2. En 4 zal slechts marginaal beter zijn dan 3.

In één test van een moeilijke vraag naar een grote EDDTable dataset was de responstijd met 1, 2, 3, 4, 5, 6 draden 38, 36, 20, 18, 13, 11 seconden. (We gebruiken nu nTableThreads=6 op die server.) 

nThreads=2: Hoewel er vaak een significant voordeel is om nThreads=2 te specificeren in plaats van nThreads=1, zal het vaak niet veel verschil maken in de kloktijd die nodig is om te reageren op het verzoek van een bepaalde gebruiker. De reden is: met nThreads=1 zullen de meeste moderne CPU's vaak[dynamisch overklok](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (turbo boost) om de kloksnelheid van de CPU tijdelijk te verhogen. Dus met nThreads=1 zal de ene kern vaak werken met een hogere kloksnelheid dan elk van de twee kernen als je nThreads=2 gebruikt. Ongeacht, we denken nog steeds dat het beter is om nThreads=2 te gebruiken in plaats van nThreads=1, omdat die instelling betere resultaten zal opleveren in een grotere verscheidenheid van situaties. En natuurlijk, als uw computer voldoende CPU cores heeft, zou een nog hogere nThreads instelling betere resultaten moeten opleveren.

Zoals hierboven besproken, zeer hoge nThreads instellingen kan leiden tot snellere antwoorden op sommige verzoeken, maar het risico van algemene dalingERDDAP™responsiviteit en hoog geheugengebruik (zoals hierboven vermeld) Terwijl die verzoeken worden verwerkt betekent het over het algemeen is niet een goed idee.
        
##### CPU Kernen{#cpu-cores} 
Je zou nooit nThreads moeten instellen op een getal groter dan het aantal CPU cores in de computer CPU. In wezen hebben alle moderne CPU's meerdere kernen (bv. 2, 4 of 8) . Sommige computers hebben zelfs meerdere CPU's (b.v. 2 CPU's \\* 4 kernen/CPU = 8 CPU-kernen) . Om erachter te komen hoeveel CPU's en cores een computer heeft:

* Gebruik op Macs *Optiesleutel* : Apple Menu: Systeeminformatie
* Gebruik op Linux cat /proc/cpuinfo
* Op Windows 10 gebruiken *Ctrl + Shift + Esc* te openen Taakbeheerder: Prestaties (Logische processors tonen het totale aantal CPU cores) 

Ja, de meeste processors zeggen dat ze 2 draden per kern ondersteunen (via[hyperthreading](https://en.wikipedia.org/wiki/Hyper-threading)) , maar de 2 threads delen computing resources, zodat je niet twee keer de doorvoer van een CPU onder zware belasting ziet. Bijvoorbeeld, een computer met een CPU met 4 kernen kan beweren te ondersteunen tot 8 threads, maar je moet nooit meer dan nThreads=4 in datERDDAP. Onthoud dat:

* De instelling van nThreads inERDDAP™is per verzoek.ERDDAP™behandelt vaak meerdere verzoeken tegelijkertijd.
*   ERDDAP™doet andere dingen dan verzoeken verwerken, bijvoorbeeld datasets herladen.
* WanneerERDDAP™reageert op een gegeven verzoek, andere computerbronnen (bv. toegang tot schijven, bandbreedte van het netwerk) kan beperkend zijn. Hoe hoger je nThreads zet, des te groter de kans dat deze andere bronnen zullen worden gemaximeerd en zal vertragenERDDAPalgemene reactie.
* Het besturingssysteem doet andere dingen dan draaienERDDAP.

Dus het is het beste niet om de instelling van nThreads op meer dan het aantal kernen in de computer CPU.
         
##### Uw Kilometerstand mei Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
De resultaten van verschillende nThreads instellingen zullen sterk variëren voor verschillende verzoeken naar verschillende datasets op verschillende systemen. Als je echt het effect van verschillende nThreads instellingen wilt weten, voer dan realistische tests uit.
         
##### Waarom nThreads per aanvraag?{#why-nthreads-per-request} 
Ik hoor sommigen van jullie denken: "Waarom is nThreads per verzoek? Als ik dit zou coderen, zou ik één vaste werker draad pool en een berichten wachtrij gebruiken voor betere prestaties." Het probleem met het gebruik van een worker thread pool en een messaging wachtrij is dat een moeilijk verzoek zou overspoelen de wachtrij met tal van trage taken. Dat zou effectief blokkerenERDDAP™vanaf het begin van de werkzaamheden met betrekking tot andere verzoeken tot het eerste verzoek (hoofdzakelijk) Klaar. Dus zelfs eenvoudige latere verzoeken zouden super langzaam reageren.ERDDAPhet gebruik van nThreads per verzoek leidt tot een veel eerlijker gebruik van computermiddelen.
         
##### nThreads vs. Multiple Worker Computers{#nthreads-vs-multiple-worker-computers} 
Helaas,ERDDAP's nThreads systeem zal nooit zo effectief zijn als echte parallelizing via meerdere werkcomputers, met elk werken aan een brok gegevens, op de manier waarop Hadoop of Apache Spark worden meestal gebruikt. Wanneer de taak werkelijk wordt geparalleld/verspreid naar meerdere computers, kan elke computer al zijn bronnen gebruiken op zijn deel van de taak. MetERDDAP's nThreads systeem, elk van de threads is concurreren om dezelfde computer bandbreedte, schijf schijven, geheugen, enz. Helaas, de meesten van ons hebben niet de middelen of fondsen om op te zetten of zelfs te huren (Amazon Web Services (AWS) of Google Cloud Platform (GCP) ) Enorme netwerken van computers. In tegenstelling tot een relationele database die de resultaatrijen in elke volgorde mag retourneren,ERDDAP™maakt een belofte om de resultaatrijen in een consistente volgorde terug te geven. Deze beperking maaktERDDAP's nThreads implementatie minder efficiënt. MaarERDDAP's nThreads is nuttig in veel gevallen.

Er zijn echter manieren omERDDAP™schaal om een groot aantal verzoeken snel te behandelen door het opzetten van een[raster/cluster/federatie vanERDDAPs](/docs/server-admin/scaling).
         
#### &lt;paletten&gt;{#palettes} 
* Beginnen metERDDAP™versie 2.12,datasets.xmlkan een&lt;paletten&gt;-tag (binnen&lt;erddapDatasets&gt;) die de&lt;paletten&gt; tag waarde van messages.xml (of keert terug naar de messages.xml waarde als de tag indatasets.xmlis leeg) . Hiermee kunt u de lijst met beschikbare paletten wijzigen terwijlERDDAP™is aan het rennen. Het laat je ook een verandering maken en laat het aanhouden wanneer je een nieuwe versie vanERDDAP.
WAARSCHUWING: De paletten indatasets.xmlmoet een superset zijn van de paletten in messages.xml; andersERDDAP™zal gooien een uitzondering en stoppen met verwerkingdatasets.xml. Dit zorgt ervoor dat alleERDDAP™installaties ondersteunen tenminste dezelfde kern paletten.
WAARSCHUWING:ERDDAP™controleert of de palettenbestanden die zijn opgegeven in messages.xml daadwerkelijk bestaan, maar het controleert niet de paletbestanden indatasets.xml. Het is uw verantwoordelijkheid om ervoor te zorgen dat de bestanden aanwezig zijn.
    
Ook beginnen metERDDAP™versie 2.12, als je een cptfiles subdirectory maakt in deERDDAP™inhoudsmap;ERDDAP™zal alle \\*.cpt bestanden in die map kopiëren naar de\\[kat\\]/webapps/erddap/WEB-INF/cptfiles directory elke keerERDDAP™begint. Dus, als je aangepaste pt bestanden in die directory, die bestanden zullen worden gebruikt doorERDDAP™, zonder extra inspanning van uw kant, zelfs wanneer u een nieuwe versie vanERDDAP.
    
WAARSCHUWING: Als u aangepaste paletten aan uwERDDAP™en je hebtEDDGridFromErdap en/of EDDTableFromErdap datasets in uwERDDAP™, dan zullen gebruikers uw aangepaste palet opties op deERDDAP™Maak een grafiek webpagina's, maar als de gebruiker probeert om ze te gebruiken, krijgen ze een grafiek met de standaard (meestal Regenboog) Palet. Dit komt omdat de afbeelding wordt gemaakt door de remoteERDDAP™die niet het aangepaste palet heeft. De enige oplossingen zijn nu om de remote emailERDDAP™beheerder om uw aangepaste paletten toe te voegen aan zijn/haarERDDAPof e-mail Chris. John op noaa.gov vragen om de paletten worden toegevoegd aan de standaardERDDAP™distributie.
    
#### &lt;onChange&gt;{#onchange} 
* [ ** &lt;onChange&gt; ** ] (#onchange) is een OPTIONAL tag binnen een&lt;dataset&gt; tag indatasets.xmldat een actie specificeert die zal worden uitgevoerd wanneer deze dataset wordt aangemaakt (wanneerERDDAP™wordt herstart) en wanneer deze dataset op enigerlei wijze verandert.
    * Momenteel, voorEDDGridsubklassen, wijzigingen in metagegevens of een asvariabele (bijvoorbeeld een nieuw tijdspunt voor bijna-real-time gegevens) wordt beschouwd als een verandering, maar een herladen van de dataset wordt niet beschouwd als een verandering (op zichzelf) .
    * Momenteel, voor EDDTable subklassen, wordt herladen van de dataset beschouwd als een verandering.
    * Momenteel zijn slechts twee soorten acties toegestaan:
        * " http://" of " https://" -- Als de actie begint met " http://" of " https://" ,ERDDAP™zal eenHTTP GETverzoek aan de opgegeven URL. Het antwoord wordt genegeerd. Bijvoorbeeld, de URL zou kunnen vertellen een andere webservice om iets te doen.
            * Als de URL een query-gedeelte heeft (na de '?) , HET MOET al zijn[percentage gecodeerd](https://en.wikipedia.org/wiki/Percent-encoding). U moet speciale tekens coderen in de beperkingen (andere dan de oorspronkelijke "&" en de belangrijkste'='in beperkingen) in de vorm %HH, waarbij HH de tweecijferige hexadecimale waarde van het teken is. Normaal gesproken moet je enkel enkele leestekens omzetten: % in %25, & in %26, " in %22,&lt;in %3C, = in %3D, &gt; in %3E, + in %2B,|in %7C,\\[in %5B,\\]in %5D, ruimte in %20, en zet alle tekens boven #127 om in hun UTF-8 vorm en codeer vervolgens elke byte van de UTF-8 vorm in het %HH formaat (een programmeur om hulp vragen) .
Bijvoorbeeld, &stationIDmet een gewicht van meer dan 200 g/m2
wordt &stationID%3E=%2241004%22
Procent codering is meestal vereist wanneer u toegang totERDDAPvia andere software dan een browser. Browsers behandelen meestal procent codering voor u.
In sommige situaties moet je alle tekens anders coderen dan A-Za-z0-9\\_-&#33;.~ ' () \\*, maar nog steeds niet coderen de eerste '&' of de belangrijkste'='met beperkingen.
Programmeertalen hebben hiervoor hulpmiddelen (zie bijvoorbeeldJava's[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)enJavaScript's [encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) en er zijn
                [websites die percentage coderen/decoderen voor u](https://www.url-encode-decode.com/).
            * Sindsdatasets.xmlis een XML-bestand, u MOET ook ALL & coderen, '&lt;", en "&gt;" in de URL als "&amp;," "&lt;', en '&gt;' na percentage codering.
            * Voorbeeld: Voor een URL die u in een browser kunt typen als:
                 https://www.company.com/webService?department=R%26D&param2=value2   
U dient een&lt;onChange&gt; tag via (op één regel) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto: -- Als de actie begint met "mailto:,"ERDDAP™stuurt een e-mail naar het volgende e-mailadres dat aangeeft dat de dataset is bijgewerkt/gewijzigd.
Bijvoorbeeld:&lt;onChange&gt;mailto:john.smith@company.com&lt;/onChange&gt; Als u een goede reden voorERDDAP™om een andere vorm van actie te ondersteunen, stuur ons een e-mail die beschrijft wat u wilt.
    * Dit label is OPTIONAL. Er kunnen zoveel tags zijn als je wilt. Gebruik één van deze tags voor elke actie die uitgevoerd moet worden.
    * Dit is analoog aanERDDAP's e-mail/URL abonnementssysteem, maar deze acties worden niet permanent opgeslagen (d.w.z. ze worden alleen opgeslagen in een EDD-object) .
    * Om een abonnement te verwijderen, verwijder gewoon de&lt;onChange&gt;-tag. De wijziging zal worden genoteerd de volgende keer dat de dataset opnieuw wordt geladen.
         
#### &lt;herladenEveryNMinutes&gt;{#reloadeverynminutes} 
* [ ** &lt;herladen EveryNminutes&gt; ** ] (#reloadeverynminutes) is een OPTIONAL tag binnen een&lt;dataset&gt; tag indatasets.xmlvan bijna alle datasets die aangeven hoe vaak de dataset opnieuw geladen moet worden. Bijvoorbeeld,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * In het algemeen veranderen datasets vaak (bijvoorbeeld, krijgen nieuwe gegevensbestanden) moeten regelmatig worden herladen, bijvoorbeeld elke 60 minuten.
    * Gegevenssets die zelden veranderen, dienen zelden om de 1440 minuten opnieuw geladen te worden. (dagelijks) of 10080 minuten (wekelijks) .
    * Dit label is OPTIONAL, maar aanbevolen. De standaard is 10080.
    * Een voorbeeld is:&lt;herladenEveryNMinutes&gt;1440&lt;/herladen EveryNminutes&gt;
    * Wanneer een dataset wordt herladen, alle bestanden in de *bigParentDirectory* /cache/ *datasetID* map worden verwijderd.
    * Het maakt niet uit waar dit op staat, een dataset wordt niet vaker geladen dan&lt;loadDatasetsMinMinutes&gt; (standaard = 15) , zoals gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml). Dus als u wilt dat datasets worden herladen zeer vaak, moet u zowel herladenEveryNMinutes en loadDatasets instellen MinMinuten naar kleine waarden.
    * Herladen niet instellenEveryNMinutes op dezelfde waarde als loadDatasets MinMinuten, omdat de verstreken tijd waarschijnlijk zal zijn (bijvoorbeeld) 14:58 of 15:02, dus de dataset wordt slechts opnieuw geladen in ongeveer de helft van de grote herladingen. In plaats daarvan, gebruik een kleinere (bijvoorbeeld, 10) of groter (bijvoorbeeld, 20) herladen Elke Nminuten waarde.
    * Ongeacht herladenEveryNMinutes, kunt u handmatig vertellenERDDAP™om een specifieke dataset zo snel mogelijk via een[vlagbestand](/docs/server-admin/additional-information#flag).
    * Voor nieuwsgierige programmeurs -- InERDDAP™, het herladen van alle datasets wordt behandeld door twee threads voor één doel. Een thread start een kleine herladen als het een vlagbestand of een grote herladen vindt (die alle datasets controleert om te zien of ze opnieuw geladen moeten worden) . De andere thread doet de werkelijke herladen van de datasets een voor een. Deze threads werken op de achtergrond zodat alle datasets up-to-date blijven. De thread die de herladingen doet bereidt een nieuwe versie van een dataset dan wisselt het op zijn plaats (in essentie de oude versie atomair vervangen) . Dus het is zeer mogelijk dat de volgende volgorde van gebeurtenissen optreedt (Het is een goede zaak.) :
        
        1.  ERDDAP™start opnieuw laden van een dataset (een nieuwe versie maken) op de achtergrond.
        2. Gebruiker 'A' doet een verzoek aan de dataset.ERDDAP™gebruikt de huidige versie van de dataset om het antwoord te maken. (Dat is goed. Er was geen vertraging voor de gebruiker, en de huidige versie van de dataset mag nooit erg oud zijn.) 
        3.  ERDDAP™maakt de nieuwe herlaadde versie van de dataset af en wisselt die nieuwe versie in productie. Alle volgende nieuwe verzoeken worden behandeld door de nieuwe versie van de dataset. Voor consistentie wordt het verzoek van gebruiker A nog steeds ingevuld door de oorspronkelijke versie.
        4. Gebruiker 'B' doet een verzoek aan de dataset enERDDAP™gebruikt de nieuwe versie van de dataset om het antwoord te maken.
        5. Uiteindelijk zijn de verzoeken van gebruiker A en gebruiker B voltooid (Misschien A's finish eerst, misschien B's finish eerst) .
        
Ik kan iemand horen zeggen: "Gewoon twee dorslappen&#33; Ha&#33; Dat is stom&#33; Hij moet dat zo instellen dat herladen van datasets zoveel threads gebruikt als nodig is, zodat het allemaal sneller en met weinig of geen vertraging gebeurt." Ja en nee. Het probleem is dat het laden van meer dan één dataset tegelijk een aantal harde nieuwe problemen veroorzaakt. Ze moeten allemaal opgelost worden of behandeld worden. Het huidige systeem werkt goed en heeft beheersbare problemen (bijvoorbeeld, potentieel voor vertraging voordat een vlag wordt opgemerkt) . (Als je hulp nodig hebt om ze te beheren, zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).) Het verband[bijwerken Elke NMillis](#updateeverynmillis). systeem werkt binnen respons threads, dus het kan en leidt tot meerdere datasets worden bijgewerkt (niet het volledige herladen) tegelijkertijd.
##### Proactief vs. Reactief{#proactive-vs-reactive} 
ERDDAP's herlaadsysteem is proactief -- datasets worden snel na het herladen opnieuw geladen Elke Nminuten tijd is voorbij (Dat wil zeggen, ze worden "verhaal" maar nooit erg oud) , of de dataset verzoeken van gebruikers krijgt of niet. Dus.ERDDAP™Datasets zijn altijd up-to-date en klaar voor gebruik. Dit is in tegenstelling tot de reactieve aanpak van THREDDS: het verzoek van een gebruiker is wat THREDDS vertelt om te controleren of een dataset oud is (Het kan erg oud zijn.) . Als het oud is, laat THredDS de gebruiker wachten (vaak enkele minuten) terwijl de dataset opnieuw geladen wordt.
        
#### &lt;bijwerken EveryNMillis&gt;{#updateeverynmillis} 
* [ ** &lt;updateEveryNMillis&gt; ** ] (#Updateeveryenmillis) is een OPTIONAL tag binnen een&lt;dataset&gt; tag indatasets.xmlvan sommige dataset types die helptERDDAP™werken met datasets die zeer vaak veranderen (zo vaak als ruwweg elke seconde) . In tegenstelling totERDDAP's regelmatig, proactief, [&lt;herladen EveryNminutes&gt;] (#reloadeverynminutes) systeem voor het volledig herladen van elke dataset, dit OPTIONAL extra systeem reageert (geactiveerd door een gebruikersverzoek) en sneller omdat het incrementele (alleen het bijwerken van de informatie die moet worden bijgewerkt) . Bijvoorbeeld, als een verzoek om eenEDDGridFromDap dataset treedt meer op dan het opgegeven aantal milliseconden sinds de laatste update,ERDDAP™zal zien of er nieuwe waarden zijn voor de meest linkse (eerst, meestal"time") dimensie en, zo ja, gewoon downloaden van die nieuwe waarden voordat de gebruiker het verzoek behandelt. Dit systeem is zeer goed in het bijhouden van een snel veranderende dataset up-to-date met minimale eisen aan de gegevensbron, maar ten koste van een lichte vertraging van de verwerking van sommige gebruikersverzoeken.
    * Om dit systeem te gebruiken, voeg (bijvoorbeeld) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
direct na de&lt;herladenEveryNMinutes&gt; label voor de dataset indatasets.xml. Het aantal milliseconden dat je opgeeft kan zo klein zijn als 1 (om ervoor te zorgen dat de dataset altijd up-to-date is) . Een waarde van 0 (de standaard) of een negatief getal schakelt het systeem uit.
    * Vanwege hun incrementele aard, updates moeten zeer snel eindigen, zodat gebruikers nooit moeten wachten een lange tijd.
    * Als een tweede gegevensverzoek aankomt voordat de vorige update is voltooid, zal het tweede verzoek geen nieuwe update veroorzaken.
    * Doorheen de documentatie zullen we proberen om het woord "herladen" te gebruiken voor regelmatige, volledige dataset herladen, en "update" voor deze nieuwe incrementele, gedeeltelijke updates.
    * Voor testdoeleinden worden sommige diagnostieken afgedrukt om log.txt te loggen als [&lt;logLevel&gt;] (#loglevel) indatasets.xmlis ingesteld op "alles."
    * Als u incrementele updates gebruikt en vooral als de meest linkse (eerst) , bijvoorbeeld, tijd, as is groot, u wilt misschien instellen&lt;herladenEveryNMinutes&gt; naar een groter getal (1440?) , zodat updates doen het grootste deel van het werk om de dataset up-to-date te houden, en volledige herladen worden gedaan zelden.
    * Opmerking: dit nieuwe updatesysteem werkt metadata bij (bijvoorbeeld, tijdactual\\_range, time\\_coverage\\_end, ...) maar veroorzaakt geen verandering (e-mail of URL aanraken) of deRSSvoer (Misschien moet het...) .
    * Voor alle datasets die subklassen van[EDDGridFromFiles](#eddgridfromfiles)en[EDDTableFromFiles](#eddtablefromfiles):
        *    **WAARSCHUWING:** wanneer u een nieuw gegevensbestand aan een dataset toevoegt door het te kopiëren in de map dieERDDAP™Kijk, er is een gevaar datERDDAP™zal het gedeeltelijk geschreven bestand opmerken; probeer het te lezen, maar faal omdat het bestand onvolledig is; verklaar het bestand als een "slecht" bestand en verwijder het (tijdelijk) uit de dataset.
Om dit te voorkomen, we **STERKE HERHALING** dat je een nieuw bestand kopieert naar de map met een tijdelijke naam (bijvoorbeeld, 20150226.ncTmp) dat niet overeenkomt met het datasetsbestand NaamRegex (\\*\\.nc) , hernoem het bestand naar de juiste naam (bijvoorbeeld, 20150226.nc) . Als je deze aanpak gebruikt,ERDDAP™zal negeren het tijdelijke bestand en alleen merken de juiste naam bestand wanneer het is voltooid en klaar om te worden gebruikt.
        * Als u bestaande gegevensbestanden wijzigt (bijvoorbeeld om een nieuw gegevenspunt toe te voegen) ,&lt;updateEveryNMillis&gt; werkt goed als de veranderingen atomair verschijnen (in een ogenblik) en het bestand is altijd een geldig bestand. Bijvoorbeeld, de netcdf-java-bibliotheek zorgt voor toevoegingen aan de onbeperkte dimensie van een "klassiek".ncv3-bestand te maken atomair.
            &lt;updateEveryNMillis&gt; werkt slecht als het bestand ongeldig is terwijl de wijzigingen worden gemaakt.
        *   &lt;updateEveryNMillis&gt; werkt goed voor datasets waar één of enkele bestanden in korte tijd veranderen.
        *   &lt;updateEveryNMillis&gt; werkt slecht voor datasets waar een groot aantal bestanden in korte tijd verandert (tenzij de veranderingen atomair lijken) . Voor deze datasets is het beter om niet te gebruiken&lt;EveryNMillis&gt; bijwerken en een[vlag](/docs/server-admin/additional-information#set-dataset-flag)om te vertellenERDDAP™de dataset opnieuw laden.
        *   &lt;updateEveryNMillis&gt; de informatie in verband met de [&lt;subsetVariables&gt;] (#subsetvariabelen) . Normaal gesproken is dit geen probleem, omdat desubsetVariablesinformatie hebben over dingen die niet vaak veranderen (bijvoorbeeld de lijst van stationsnamen, breedtegraden en lengtegraden) . Indien desubsetVariablesgegevenswijzigingen (bijvoorbeeld wanneer een nieuw station aan de dataset wordt toegevoegd) Neem dan contact op met de[vlag URL](/docs/server-admin/additional-information#set-dataset-flag)voor de datasetERDDAP™de dataset opnieuw laden. Anders,ERDDAP™zal de nieuwe subset niet opmerken Variabele informatie tot de volgende keer dat de dataset opnieuw wordt geladen (&lt;herladenEveryNMinutes&gt;).
        * Onze algemene aanbeveling is:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * Problemen? Op Linux computers, als u&lt;updateEveryNMillis&gt; metEDDGridVanuitFiles of EDDTableVanuitFiles klassen, kunt u een probleem zien waar een dataset niet laadt (soms of consequent) met de foutmelding: "IOException: Gebruikerslimiet van inotify instanties bereikt of te veel geopende bestanden." De oorzaak kan een bug inJavawaardoor gevallen niet worden verzameld. Dit probleem wordt vermeden inERDDAP™v1.66 en hoger. Dus de beste oplossing is om de nieuwste versie vanERDDAP.
Als dat het probleem niet oplost (dat is, als je een echt groot aantal datasets met behulp van&lt;updateEveryNMillis&gt;), kunt u dit probleem oplossen door te bellen naar:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Of gebruik hogere getallen als het probleem aanhoudt. De standaard voor horloges is 8192. De standaard voor instanties is 128.
    * Je kunt&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; indatasets.xml  (in met de andere instellingen aan de bovenkant) het maximum aantal bestandswijzigingen wijzigen (standaard=10) dat zal worden verwerkt door het updateEveryNMillis systeem. Een groter aantal kan nuttig zijn voor dataset waar het zeer belangrijk is dat ze altijd up-to-date worden gehouden. Zie[updateMaxEvents documentatie](#updatemaxevents).
    * Voor nieuwsgierige programmeurs -- deze incrementele updates, in tegenstelling totERDDAPVol[herladenEveryNMinutes](#reloadeverynminutes)systeem, optreden binnen gebruiker verzoek threads. Dus elk aantal datasets kan tegelijkertijd worden bijgewerkt. Er is een code (en een slot) om ervoor te zorgen dat slechts één thread werkt aan een update voor een bepaalde dataset op een bepaald moment. Het toestaan van meerdere gelijktijdige updates was gemakkelijk; het toestaan van meerdere gelijktijdige volledige herladingen zou moeilijker zijn.
         
#### &lt;bronCanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;bronCanConstrainStringEQNE&gt; ** ] (#sourcecanconstrainstringeqne) is een OPTIONAL tag binnen een EDDTabel&lt;dataset&gt; tag indatasets.xmldat aangeeft of de bron String variabelen kan beperken met de = en &#33;= operators.
    * Voor EDDTableFromDapSequence is dit alleen van toepassing op de buitenste reeks tekenreeksvariabelen. Er wordt aangenomen dat de bron geen beperkingen op innerlijke volgorde variabelen aankan.
    * Dit label is OPTIONAL. Geldige waarden zijn waar (de standaard) en vals.
    * Voor EDDTableFromDapSequenceOPeNDAPDRDS-servers, dit moet ingeschakeld zijn (de standaard) .
    * Voor EDDTableFromDapSequence Dappere servers, dit moet worden ingesteld op onjuist.
    * Een voorbeeld is:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;bronCanConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* [ ** &lt;bronCanConstrainStringGTLT&gt; ** ] (#sourcecanconstrainstringgtlt) is een OPTIONAL tag binnen een EDDTabel&lt;dataset&gt; tag die aangeeft of de bron String variabelen kan beperken met de&lt;,&lt;=, &gt;, en &lt;= operators.
    * Voor EDDTableFromDapSequence is dit alleen van toepassing op de buitenste reeks tekenreeksvariabelen. Er wordt aangenomen dat de bron geen beperkingen op innerlijke volgorde variabelen aankan.
    * Geldige waarden zijn waar (de standaard) en vals.
    * Dit label is OPTIONAL. De standaard is waar.
    * Voor EDDTableFromDapSequenceOPeNDAPDRDS-servers, dit moet ingeschakeld zijn (de standaard) .
    * Voor EDDTableFromDapSequence Dappere servers, dit moet worden ingesteld op onjuist.
    * Een voorbeeld is:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;bronCanConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* [ ** &lt;bronCanConstrainStringRegex&gt; ** ] (#sourcecanconstrainstringregex) is een OPTIONAL tag binnen een EDDTabel&lt;dataset&gt; tag die aangeeft of de bron String variabelen kan beperken door reguliere expressies, en zo ja, wat de operator is.
    * Geldige waarden zijn "=~" (deDAPstandaard) , "~=" (ten onrechte ondersteund door velenDAPservers) , of "" (geeft aan dat de bron geen reguliere expressies ondersteunt) .
    * Dit label is OPTIONAL. De standaard is "."
    * Voor EDDTableFromDapSequenceOPeNDAPDRDS-servers, dit moet worden ingesteld op "" (de standaard) .
    * Voor EDDTableFromDapSequence Dappere servers, dit moet worden ingesteld op "" (de standaard) .
    * Een voorbeeld is:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;bronCanDoDistinct&gt;{#sourcecandodistinct} 
* [ ** &lt;bronCanDoDistinct&gt; ** ] (#Broncandodistinct) is een OPTIONAL tag binnen een EDDTableFromDatabase&lt;dataset&gt;-tag die aangeeft of de brondatabase &distinct moet verwerken () beperkingen in gebruikersvragen.
    * Dit label is OPTIONAL. Geldige waarden zijn geen (ERDDAP™behandelt onderscheiden; de standaard) , gedeeltelijk (de bron zorgt voor onderscheiden enERDDAP™Handelt het opnieuw af.) en ja (de bron behandelt onderscheiden) .
    * Als u nieERDDAP™het geheugen raakt op bij de behandeling onderscheiden, gebruik ja.
    * Als u ja gebruikt en de brondatabase te langzaam onderscheidend werkt, gebruik dan nee.
    * gedeeltelijk geeft u het ergste van beide: het is traag omdat de database behandeling van onderscheiden is traag en het kan raken van het geheugen inERDDAP.
    * Databanken interpreteren DISTICT als een verzoek voor slechts unieke rijen van resultaten, terwijlERDDAP™interpreteert het als een verzoek om een gesorteerde lijst van unieke rijen van resultaten. Als u dit gedeeltelijk of ja,ERDDAP™automatisch vertelt de database ook om de resultaten te sorteren.
    * Een klein verschil in resultaten:
Zonder|gedeeltelijk,ERDDAP™zal sorteren "" aan het begin van de resultaten (voor niet-" snaren) .
Met ja, de database kan (Postgres zal) sorteer "" aan het einde van de resultaten (na niet-" snaren) .
Ik denk dat dit ook van invloed zal zijn op het sorteren van korte woorden versus langere woorden die beginnen met het korte woord. Bijvoorbeeld,ERDDAP™zal "Simon" sorteren voor "Simons."
    * Een voorbeeld is:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;bronCanOrderBy&gt;{#sourcecanorderby} 
* [ ** &lt;bron CanOrderBy&gt; ** ] (#sourcecanorderby) is een OPTIONAL tag binnen een EDDTableFromDatabase&lt;dataset&gt;-tag die aangeeft of de brondatabase &orderBy (...) beperkingen in gebruikersvragen.
    * Dit label is OPTIONAL. Geldige waarden zijn geen (ERDDAP™handvattenorderBy (...) ; de standaard) , gedeeltelijk (de bronhandvattenorderByenERDDAP™Handelt het opnieuw af.) en ja (de bronhandvattenorderBy (...) ) .
    * Als u nieERDDAP™heeft geen geheugen meer bij het verwerkenorderBy (...) Gebruik ja.
    * Als u ja gebruikt en de brondatabase verwerktorderBy (...) Te langzaam, gebruik nee.
    * gedeeltelijk geeft u het ergste van beide: het is traag omdat de database behandeling vanorderBy (...) is traag en het kan zonder geheugen inERDDAP.
    * Een klein verschil in resultaten:
Zonder|gedeeltelijk,ERDDAP™zal sorteren "" aan het begin van de resultaten (voor niet-" snaren) .
Met ja, de database kan (Postgres zal) sorteer "" aan het einde van de resultaten (na niet-" snaren) .
Dit kan ook van invloed zijn op het sorteren van korte woorden versus langere woorden die beginnen met het korte woord. Bijvoorbeeld,ERDDAP™zal "Simon" sorteren voor "Simons," maar ik weet niet zeker hoe een database ze zal sorteren.
    * Een voorbeeld is:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceNeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* [ ** &lt;sourceNeedsExpandedFP\\_EQ&gt; ** ] (#sourceneedsexpandedfp_eq) is een OPTIONAL tag binnen een EDDTabel&lt;dataset&gt; tag die specificeert (waar (de standaard) of vals) als de bron hulp nodig heeft met vragen met&lt;numeriek Variabele&gt;=&lt;floatingPointValue&gt; (en &#33;=, &gt;=&lt;=). Bijvoorbeeld,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Voor sommige gegevensbronnen, numerieke vragen met betrekking tot =, &#33;=,&lt;met variabele puntnummers mag niet naar wens werken. Bijvoorbeeld, een zoektocht naar lengtegraad=220.2 kan mislukken als de waarde wordt opgeslagen als 220.20000000000001.
    * Dit probleem doet zich voor omdat zwevende puntnummers[niet precies binnen computers vertegenwoordigd](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    * Indien sourceNeedsExpandedFP\\_EQ is ingesteld op waar (de standaard) ,ERDDAP™wijzigt de queries die naar de gegevensbron worden verzonden om dit probleem te voorkomen. Het is altijd veilig en prima om deze set te laten waar.
         
#### &lt;sourceUrl&gt;{#sourceurl} 
* [ ** &lt;sourceUrl&gt; ** ] (#sourceurl) is een veel voorkomende tag binnen de globale dataset&lt;addAttributes&gt; tag die de URL specificeert die de bron van de gegevens is.
    * Een voorbeeld is:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (maar zet het allemaal op één lijn) 
    * InERDDAP™, alle datasets zullen een "sourceUrl" in de gecombineerde globale attributen die aan de gebruikers worden getoond.
    * Voor de meeste datasets is deze tag vereist. Zie de beschrijving van het datasettype om uit te vinden of dit vereist is of niet.
    * Voor sommige datasets, de afzonderlijke&lt;sourceUrl&gt; label is niet toegestaan. In plaats daarvan moet je een "sourceUrl"[globaal kenmerk](#global-attributes), meestal in de globale \\&gt;addAttributes&lt;. Als er geen werkelijke bron-URL is (bijvoorbeeld, als de gegevens worden opgeslagen in lokale bestanden) , dit attribuut heeft vaak gewoon een plaatshouder waarde, bijvoorbeeld,&lt;att name="name"&gt; (lokale bestanden) &lt;/att&gt; .
    * Voor de meeste datasets is dit de basis van de URL die wordt gebruikt om gegevens op te vragen. Bijvoorbeeld, voorDAPservers, dit is de URL waaraan .dods, .das, .dds, of .html toegevoegd kunnen worden.
    * Sindsdatasets.xmlis een XML-bestand, u MOET ook '&' coderen, '&lt;", en "&gt;" in de URL als "&amp;," "&lt;', en '&gt;'.
    * Voor de meeste datasets,ERDDAP™voegt het origineel toesourceUrl  (de "localSourceUrl" in de broncode) aan de[globale attributen](#global-attributes)  (waar het de "publicSourceUrl" in de broncode wordt) . Wanneer de gegevensbron lokale bestanden is,ERDDAP™voegt toesourceUrl=" (lokale bestanden) " naar de mondiale eigenschappen als een veiligheidsmaatregel. Wanneer de gegevensbron een database is,ERDDAP™voegt toesourceUrl=" (brondatabase) " naar de mondiale eigenschappen als een veiligheidsmaatregel. Als sommige van uw datasets niet-openbaar zijnsourceUrl's (meestal omdat hun computer is in uw DMZ of op een lokale LAN) u kunt gebruiken [&lt;converteren naar PublicSourceUrl&gt;] (#converttopublicsourceurl) tags om aan te geven hoe de lokale converterensourceUrls voor publieksourceUrls.
    * AsourceUrlkan beginnen methttp://,https://, ftp://, en misschien andere voorvoegsels.httpsverbindingen lezen en controleer het digitale certificaat van de bron om ervoor te zorgen dat de bron is wie ze zeggen dat ze zijn. In zeldzame gevallen kan deze controle mislukken met de fout "javax.net.ssl.SSLProtocolUitzondering: handshake alert: onbekende\\_naam." Dit is waarschijnlijk te wijten aan de domeinnaam op het certificaat die niet overeenkomt met de domeinnaam die u gebruikt. U kunt en moet de details van desourceUrl's certificaat in uw webbrowser, met name de lijst met "DNS Naam"s in de sectie "Onderwerp Alternatieve Naam."
        
In sommige gevallensourceUrlu een alias van de domeinnaam op het certificaat gebruikt. Bijvoorbeeld,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ zal deze fout maken, maar
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , die de domeinnaam op het certificaat gebruikt, niet. De oplossing in deze gevallen is daarom om de domeinnaam op het certificaat te vinden en te gebruiken. Als je het niet op het certificaat kunt vinden, neem dan contact op met de dataprovider.
        
In andere gevallen kan de domeinnaam op het certificaat voor een groep namen zijn. Als dit gebeurt of het probleem is anders niet op te lossen, stuur dan een e-mail naar Chris. John bij Noaa.gov om het probleem te melden.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt;addAttributes&gt; ** ] (#addattributes) is een OPTIONAL tag voor elke dataset en voor elke variabele die laatERDDAPbeheerders controleren de metadata-attributen die zijn gekoppeld aan een dataset en de variabelen ervan.
    *   ERDDAP™combineert de attributen van de bron van de dataset ("sourceAttributes") en de "addAttributes" die u indatasets.xml  (die prioriteit hebben) de "gecombineerde eigenschappen" te maken, dieERDDAP™gebruikers zien. U kunt dusaddAttributesom de waarden van de bron te herdefiniërenKenmerken, nieuwe attributen toe te voegen of attributen te verwijderen.
    * De&lt;addAttributes&gt; tag omsluit 0 of meer ** &lt;att&gt; ** subtags, die worden gebruikt om individuele attributen te specificeren.
    * Elke eigenschap bestaat uit een naam en een waarde (die een specifiek gegevenstype heeft, bijvoorbeeld dubbel) .
    * Er kan maar één attribuut zijn met een bepaalde naam. Als er meer zijn, heeft de laatste prioriteit.
    * De waarde kan een enkele waarde of een door ruimte gescheiden lijst van waarden zijn.
    * Syntaxis
        * De volgorde van de&lt;att&gt; subtags binnenaddAttributesis niet belangrijk.
        * De&lt;att&gt; subtag formaat is
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * De bestemmingsnaam van alle eigenschappen MOET beginnen met een letter (A-Z, a-z) en MOET alleen de tekens A-Z, a-z, 0-9, of '\\_' bevatten.
        * Indien&lt;att&gt; subtag heeft geen waarde of waarde van nul, dat attribuut wordt verwijderd uit de gecombineerde attributen.
Bijvoorbeeld,&lt;att name="rows" /&gt; zal rijen verwijderen uit de gecombineerde attributen.
Bijvoorbeeld,&lt;att name="coördinaat"&gt;null&lt;/att&gt; verwijdert coördinaten uit de gecombineerde attributen.
##### eigenschap Type{#attributetype} 
* [De OPTIONAL-typewaarde voor&lt;att&gt; subtags] (#attribuuttype) geeft het gegevenstype voor de waarden aan. Het standaardtype is String. Een voorbeeld van een tekenreeksattribuut is:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Geldige typen voor enkele waarden zijn byte (8-bit integer) , kort (16-bits gesigneerd geheel getal) , int (32-bits gesigneerd geheel getal) , lang (64-bits gesigneerd geheel getal) , float (32-bits drijvend punt) , dubbel (64-bits drijvend punt) , Char, en String. Bijvoorbeeld,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Zie deze notities over de[char data type](#char).
Zie deze notities over de[lange gegevenstype](#long).
        
    * Geldige typen voor door ruimte gescheiden waardenlijsten (of enkele waarden) zijn byteList, shortList, unsignedShortList, charList, intList, longList, floatList, dubbel Lijst. Bijvoorbeeld,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Een niet-signedShortList kunt u een lijst van niet-signed shorts opgeven, maar ze zullen worden omgezet in een lijst van de overeenkomstige Unicode tekens (bijv. "65 67 69" zal worden omgezet in "A C E."
Als je een charList opgeeft, codeer dan speciale tekens (bijv., ruimte, dubbele citaten, backslash,&lt;#32, of &gt;#127) zoals je ze zou coderen in de data sectie van een NCCSV-bestand (b.v., " ", "\\" of "" "," "\\\\," "\\n", "\\u20ac") .
Er is geen stringList. Bewaar de tekenreekswaarden als een meerregelige tekenreeks. Bijvoorbeeld,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Algemene kenmerken{#global-attributes} 
* [ ** Globale attributen / globaal&lt;addAttributes&gt; ** ] (#global-attributes) --
    &lt;addAttributes&gt; is een OPTIONAL label binnen de&lt;dataset&gt; tag die wordt gebruikt om attributen te wijzigen die van toepassing zijn op de gehele dataset.
    
    *    ** Globaal gebruiken&lt;addAttributes&gt; om de globale eigenschappen van de dataset te wijzigen. ** ERDDAP™combineert de globale attributen uit de bron van de dataset (** bronKenmerken **) en de wereld** addAttributes **waarin u definieert indatasets.xml  (die prioriteit hebben) om de mondiale** gecombineerdKenmerken ** , die zijn watERDDAP™gebruikers zien. U kunt dusaddAttributesom de waarden van de bron te herdefiniërenKenmerken, nieuwe attributen toe te voegen of attributen te verwijderen.
    * Zie [ ** &lt;addAttributes&gt; **informatie] (#addattributes) die geldt voor globaal en variabel** &lt;addAttributes&gt; ** .
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)en[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadata -- Normaal gesproken,ERDDAP™automatisch ISO 19115-2/19139 en FGDC genereren (FGDC-STD-001-1998) XML-metadatabestanden voor elke dataset met behulp van informatie uit de metagegevens van de dataset. Dus, **goede datasetmetadata leidt tot goedeERDDAP- gegenereerde ISO 19115 en FGDC metadata. Overweeg om veel tijd en moeite in het verbeteren van uw datasets metadata (Wat toch goed is om te doen.) .** De meeste metadata van datasets die worden gebruikt om de ISO 19115- en FGDC-metadata te genereren, zijn afkomstig uit de[ACDD-metadatastandaard](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)en zijn zo vermeld hieronder.
    * Veel globale attributen zijn speciaal in dieERDDAP™zoekt ze en gebruikt ze op verschillende manieren. Bijvoorbeeld, een link naar deinfoUrlis opgenomen op webpagina's met lijsten van datasets, en andere plaatsen, zodat gebruikers meer te weten kunnen komen over de dataset.
    * Wanneer een gebruiker een subset van gegevens selecteert, worden globaleKenmerken gerelateerd aan de lengte, breedte en hoogte van de variabele (of diepte) , en tijdbereik (bijvoorbeeld, Southernmost\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) automatisch gegenereerd of bijgewerkt worden.
    * Een eenvoudig monster globaal&lt;addAttributes&gt; is:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Het lege cwhdf\\_version attribuut veroorzaakt de bron cwhdf\\_version attribuut (indien) uit de definitieve, gecombineerde lijst van kenmerken te verwijderen.
    * Het verstrekken van deze informatie helptERDDAP™een betere job en helpt gebruikers de datasets te begrijpen.
Goede metadata maakt een dataset bruikbaar.
Onvoldoende metadata maakt een dataset nutteloos.
Neem de tijd om goed werk te doen met metadata attributen.
##### Speciale globale attributen inERDDAP™
###### bevestiging{#acknowledgement} 
*   [ **bevestiging** ](#acknowledgement)en **bevestiging**   (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is een AANBEVOLEN manier om de groep of groepen die steun hebben verleend te erkennen (met name financiële) voor het project dat deze gegevens heeft aangemaakt. Bijvoorbeeld,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Merk op dat ACDD 1.0 en 1.1 de spelling "annulering" gebruikt (Dat is de gebruikelijke spelling in de VS.) , maar ACDD 1.3 veranderde dit in "knowledge" (Dat is de gebruikelijke spelling in het Verenigd Koninkrijk.) . Ik begrijp dat de verandering in wezen een ongeluk was en dat ze zeker de gevolgen van de verandering niet herkenden. Wat een puinhoop&#33; Nu zijn er miljoenen gegevensbestanden over de hele wereld die "anownedgment" en miljoenen die "knownedgement" hebben. Dit benadrukt de dwaasheid van "eenvoudige" veranderingen in een norm, en benadrukt de noodzaak van stabiliteit in normen. Omdat ACDD 1.3 (dat is de versie van ACDD datERDDAP™ondersteuning) Zegt "knowledgement," dat is watERDDAP™  (met name GenererenDatasets Xml) moedigt.
     
###### cdm\\_hoogte\\_proxy{#cdm_altitude_proxy} 
*   [ **cdm\\_hoogte\\_proxy** ](#cdm_altitude_proxy)is alleen voor EDDTable datasets die geen hoogte of diepte variabele hebben maar wel een variabele hebben die een proxy is voor hoogte of diepte (bijvoorbeeld druk, sigma, flesNumber) , u kunt deze eigenschap gebruiken om die variabele te identificeren. Bijvoorbeeld,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Indien de[cdm\\_data\\_type](#cdm_data_type)is Profiel of TrajectoryProfile en er is geen hoogte- of dieptevariabele, cdm\\_hoogte\\_proxy MOET worden gedefinieerd. Als cdm\\_hoogte\\_proxy is gedefinieerd,ERDDAP™zal de volgende metadata toevoegen aan de variabele: \\_Coördinaat AsType=Hoogte en as=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*   [ **cdm\\_data\\_type** ](#cdm_data_type)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is een globaal kenmerk dat deUnidata [Gemeenschappelijk gegevensmodel](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)gegevenstype voor de dataset. Bijvoorbeeld,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
Het CDM evolueert nog steeds en kan weer veranderen.ERDDAP™voldoet aan de bijbehorende en meer gedetailleerde[Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)hoofdstuk van het[CF 1,6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadataconventies (eerder genoemd de CF Point Observation Conventions) .
    * Ofwel is de dataset wereldwijd[bronKenmerken](#global-attributes)of zijn globaal&lt;addAttributes&gt; MOET het cdm\\_data\\_type attribuut bevatten. Enkele datasets (zoals EDDTable FromObis) zal dit automatisch instellen.
    * VoorEDDGriddatasets, de cdm\\_data\\_type opties zijn Raster (de standaard en veruit het meest voorkomende type voorEDDGriddatasets) , MovingGrid, Overig, Point, Profile, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory, and TrajectoryProfile. Momenteel,EDDGridvereist niet dat gerelateerde metagegevens worden gespecificeerd, noch controleert het of de gegevens overeenkomen met het cdm\\_data\\_type. Dat zal waarschijnlijk in de nabije toekomst veranderen.
    * EDDTable gebruikt cdm\\_data\\_type op een rigoureuze manier, na CF's DSG specificatie in plaats van CDM, die om een of andere reden niet is bijgewerkt om consistent te zijn met DSG. Als de metagegevens van een dataset niet voldoen aan deERDDAP's cdm\\_data\\_type eisen (zie hieronder) , de dataset zal niet laden en zal een[foutmelding](#troubleshooting-tips). (Dat is een goede zaak, in die zin dat de foutmelding je zal vertellen wat er mis is, zodat je het kunt repareren.) En als de dataset van de dataset niet overeenkomt met de metadataset van de dataset (b.v. als er voor een bepaald station meer dan één breedtegraadswaarde is in een tijdreeksset) , zullen sommige verzoeken om gegevens onjuiste gegevens in het antwoord. Dus zorg ervoor dat je dit allemaal goed doet.
        
Voor al deze datasets, in de verdragen enMetadata\\_Conventionsglobale attributen, zie CF-1.6 (niet CF-1,0, 1.1, 1.2, 1.3, 1.4 of 1.5) , aangezien CF-1.6 de eerste versie is die de veranderingen met betrekking tot Discrete Sampling Geometrie omvat (DSG) conventies.
        *   **ERDDAP™heeft een niet-eenvoudige relatie met CF DSG** 
        *   ERDDAP™kan een geldige DSG-dataset maken uit een brondataset die al een geldig DSG-bestand is (s) , of uit een brondataset die niet is ingesteld voor DSG maar kan worden gemaakt via wijzigingen in metagegevens (waarvan sommigeERDDAP-specifiek met het oog op een meer algemene benadering van de DSG-opstelling) .
        *   ERDDAP™doet veel geldigheidstests wanneer het een dataset laadt. Als de dataset een cdm\\_data\\_type heeft (offeatureType) attribuut laadt succesvol inERDDAP™, danERDDAP™zegt dat de dataset voldoet aan de DSG eisen (anders,ERDDAP™zal een uitzondering uit te leggen het eerste probleem dat het gevonden) .
WAARSCHUWING: Een succesvol geladen dataset lijkt te voldoen aan de DSG-eisen (het heeft de juiste combinatie van eigenschappen) , maar kan nog steeds verkeerd worden opgezet, wat leidt tot onjuiste resultaten in.ncCF en.ncCFMA-responsbestanden. (Software is op sommige manieren slim en onwetend in anderen.) 
        * Als je kijkt naar de metadata van de dataset inERDDAP™, de DSG dataset lijkt inERDDAPintern formaat (een reusachtige, database-achtige tabel) . Het is niet in een van de DSG formaten (Bijvoorbeeld, de afmetingen en metadata zijn niet goed) , maar de informatie die nodig is om de dataset te behandelen als een DSG dataset is in de metagegevens (bijvoorbeeld, cdm\\_data\\_type=TimeSeries en cdm\\_timeseries\\_variabelen= *aCsvListOfStationRelatedVariables* in de globale metadata en cf\\_role=timeserie\\_id voor sommige variabele) .
        * Als een gebruiker een subset van de dataset in een.ncCF (a.ncbestand in DSG's Contiguous Ragged Array bestandsformaat) of.ncCFMA-bestand (a.ncbestand in DSG's Multidimensionale Array-bestandsformaat) , dat bestand zal een geldig CF DSG bestand zijn.
WAARSCHUWING: Als de dataset echter onjuist is ingesteld (zodat de beloften van de metadata niet waar zijn) , dan zal het antwoordbestand technisch geldig zijn, maar zal in zekere zin onjuist zijn.
             
###### EDDTable cdm_data_types
* Voor EDDTable datasets, de cdm\\_data\\_type opties (en aanverwante eisen inERDDAP) zijn
###### Punt{#point} 
*   [Punt](#point)-- is voor een reeks metingen op niet-verbonden tijden en locaties.
    * Net als bij alle andere cdm\\_data\\_types dan Andere, MOETEN puntdatasets lengte-, breedte- en tijdvariabelen hebben.
###### Profiel{#profile} 
*   [Profiel](#profile)-- een reeks metingen is die allemaal tegelijk, op één lengtegraad, maar op meer dan één diepte worden verricht; (of hoogte) . De dataset kan een verzameling van deze profielen zijn, bijvoorbeeld 7 profielen van verschillende locaties. Dit cdm\\_data\\_type impliceert geen logische verbinding tussen een van de profielen.
    
* Een van de variabelen (bijvoorbeeld profiel\\_nummer) MOET het variabele attribuut cf\\_role=profile\\_id hebben om de variabele te identificeren die de profielen uniek identificeert.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Indien geen andere variabele geschikt is, overweeg dan de tijdvariabele te gebruiken.
###### cdm\\_profile\\_variabelen{#cdm_profile_variables} 
* De dataset MOET de globale eigenschap bevatten[cdm\\_profile\\_variabelen](#cdm_profile_variables), waarbij de waarde een door komma's gescheiden lijst is van de variabelen die de informatie over elk profiel hebben. Voor een bepaald profiel moeten de waarden van deze variabelen constant zijn. Bijvoorbeeld,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
De lijst MOET de cf\\_role=profile\\_id variabele en alle andere variabelen bevatten met informatie over het profiel, en tijd, breedte en lengte.
De lijst zal nooit hoogte, diepte, of enige observatie variabelen omvatten.
     

\\[Opinie: cdm\\_data\\_type=Profile moet zelden worden gebruikt. In de praktijk is een gegeven dataset meestal ofwel een TimeSeriesProfile (profielen op een vaste positie) of een TrajectoryProfile (profielen langs een traject) , en dus moeten worden geïdentificeerd als zodanig.\\]  
###### Tijdserie{#timeseries} 
*   [Tijdserie](#timeseries)-- is een reeks metingen (bv. de temperatuur van zeewater) genomen op één, vaste, breedtegraad, lengtegraad, diepte (of hoogte) locatie. (Zie het als "station.") De dataset kan een verzameling van deze TimeSeries zijn, bijvoorbeeld een reeks van elk van 3 verschillende locaties.
    * Een van de variabelen (bijvoorbeeld, station\\_id) MOET de variabele eigenschap cf\\_role=timeserie\\_id hebben om de variabele te identificeren die de stations uniek identificeert.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeserie\\_variabelen{#cdm_timeseries_variables} 
* De dataset MOET de globale eigenschap bevatten[cdm\\_timeserie\\_variabelen](#cdm_timeseries_variables), waarbij de waarde een door komma's gescheiden lijst is van de variabelen die de informatie over elk station hebben. Voor een bepaald station moeten de waarden van deze variabelen constant zijn. Bijvoorbeeld,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
De lijst MOET de cf\\_role=timeserie\\_id variabele en alle andere variabelen bevatten met informatie over het station, die bijna altijd breedte- en lengtegraad omvat (en hoogte of diepte, indien aanwezig) .
De lijst zal nooit tijd of observatievariabelen bevatten.
* Voor sommige afgemeerd boeien kan een dataset twee reeksen breedte- en lengtevariabelen hebben:
    1. Eén paar breedte- en lengtegraden die constant zijn (d.w.z. de vaste locatie van de ligplaats) . InERDDAP™Geef deze variabelendestinationNames van breedte- en lengtegraad, en neem deze variabelen op in de lijst van cdm\\_timeseries\\_variabelen.
    2. Nauwkeurige breedte- en lengtewaarden die aan elke waarneming zijn gekoppeld. InERDDAP™Geef deze variabelen andersdestinationNames (b.v., nauwkeurigLaat en nauwkeurig Lon) en neem deze variabelen niet op in de lijst van cdm\\_timeseries\\_variabelen.
De reden hiervoor is: vanuit een theoretisch perspectief, voor een DSG TimeSeries dataset, de breedte- en lengtegraad (en hoogte of diepte, indien aanwezig) De plaats van het station moet constant zijn.
###### TijdSeries-bestand{#timeseriesprofile} 
*   [TijdSeries-bestand](#timeseriesprofile)-- is voor een reeks profielen genomen op een vaste lengtegraad. Elk profiel is een reeks metingen op meerdere hoogtes of dieptes. De dataset kan een verzameling van deze TimeSeriesProfiles zijn, bijvoorbeeld een reeks profielen genomen op elk van 12 verschillende locaties.
    * Een van de variabelen (bijvoorbeeld, station\\_id) MOET de variabele eigenschap cf\\_role=timeserie\\_id hebben om de variabele te identificeren die de stations uniek identificeert.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Een van de variabelen (bijvoorbeeld profiel\\_nummer) MOET het variabele attribuut cf\\_role=profile\\_id hebben om de variabele te identificeren die de profielen uniek identificeert.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Een gegeven profiel\\_id hoeft alleen uniek te zijn voor een bepaalde tijdreeks\\_id.) Indien geen andere variabele geschikt is, overweeg dan de tijdvariabele te gebruiken.
    * De dataset MOET de globaleAttribuut cdm\\_timeseries\\_variabeles bevatten, waarbij de waarde een door komma's gescheiden lijst is van de variabelen die de informatie over elk station hebben. Voor een bepaald station moeten de waarden van deze variabelen constant zijn. Bijvoorbeeld,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
De lijst MOET de cf\\_role=timeserie\\_id variabele bevatten en alle andere variabelen met informatie over het station, die bijna altijd breedte- en lengtegraad omvat.
De lijst zal nooit tijd, hoogte, diepte, of enige observatie variabelen bevatten.
    * De dataset MOET de globaleAttribuut cdm\\_profile\\_variabeles bevatten, waarbij de waarde een door komma's gescheiden lijst is van de variabelen die de informatie over elk profiel hebben. Voor een bepaald profiel moeten de waarden van deze variabelen constant zijn. Bijvoorbeeld,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
De lijst MOET de cf\\_role=profile\\_id variabele bevatten en alle andere variabelen met informatie over het profiel, wat bijna altijd tijd omvat.
De lijst omvat nooit breedtegraad, lengtegraad, hoogte, diepte of enige observatievariabelen.
###### Traject{#trajectory} 
*   [Traject](#trajectory)-- is een reeks metingen langs een traject (een pad door ruimte en tijd)   (Bijvoorbeeld, zee\\_water\\_temperatuur genomen door een schip als het beweegt door het water) . De dataset kan een verzameling van deze Trajectories zijn, bijvoorbeeld een reeks van elk van 4 verschillende schepen.
    * Een van de variabelen (bijvoorbeeld, schip\\_id) MOET de eigenschap cf\\_role=trajectory\\_id hebben om de variabele te identificeren die de trajecten uniek identificeert.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectory\\_variabelen{#cdm_trajectory_variables} 
* De dataset MOET de globale eigenschap bevatten[cdm\\_trajectory\\_variabelen](#cdm_trajectory_variables), waarbij de waarde een door komma's gescheiden lijst is van de variabelen die de informatie over elk traject hebben. Voor een bepaald traject moeten de waarden van deze variabelen constant zijn. Bijvoorbeeld,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
De lijst MOET de cf\\_role=trajectory\\_id variabele en alle andere variabelen bevatten met informatie over het traject.
De lijst zal nooit tijd, breedtegraad, lengtegraad of observatievariabelen bevatten.
###### TrajectoryProfile{#trajectoryprofile} 
*   [TrajectoryProfile](#trajectoryprofile)-- is een reeks profielen langs een traject. De dataset kan een verzameling van deze TrajectoryProfiles zijn, bijvoorbeeld een reeks profielen genomen door 14 verschillende schepen.
    * Een van de variabelen (bijvoorbeeld, schip\\_id) MOET de variabele eigenschap cf\\_role=trajectory\\_id hebben om de variabele te identificeren die de trajecten uniek identificeert.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Een van de variabelen (bijvoorbeeld profiel\\_nummer) MOET het variabele attribuut cf\\_role=profile\\_id hebben om de variabele te identificeren die de profielen uniek identificeert.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Een gegeven profiel\\_id hoeft alleen uniek te zijn voor een gegeven traject\\_id.) Indien geen andere variabele geschikt is, overweeg dan de tijdvariabele te gebruiken.
    * De dataset MOET de globaleAttribuut cdm\\_trajectory\\_variabelen bevatten, waarbij de waarde een door komma's gescheiden lijst is van de variabelen die de informatie over elk traject hebben. Voor een bepaald traject moeten de waarden van deze variabelen constant zijn. Bijvoorbeeld,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
De lijst MOET de cf\\_role=trajectory\\_id variabele en alle andere variabelen bevatten met informatie over het traject.
De lijst zal nooit profielgerelateerde variabelen, tijd, breedtegraad, lengtegraad of enige observatievariabelen bevatten.
    * De dataset MOET de globaleAttribuut cdm\\_profile\\_variabeles bevatten, waarbij de waarde een door komma's gescheiden lijst is van de variabelen die de informatie over elk profiel hebben. Voor een bepaald profiel moeten de waarden van deze variabelen constant zijn. Bijvoorbeeld,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
De lijst MOET de cf\\_role=profile\\_id variabele bevatten en alle andere variabelen met informatie over het profiel, die bijna altijd tijd, breedte en lengte omvat.
De lijst zal nooit hoogte, diepte, of enige observatie variabelen omvatten.
###### Andere{#other} 
*   [Andere](#other)-- heeft geen vereisten. Gebruik het als de dataset niet bij één van de andere opties past, met name als de dataset geen breedte-, lengte- en tijdvariabelen bevat.
     
###### Gerelateerde opmerkingen{#related-notes} 
* Alle EDDTable datasets met een cdm\\_data\\_type anders dan "Andere" MOET lengte-, breedte- en tijdvariabelen hebben.
* Datasets met profielen MOET een hoogtevariabele, een dieptevariabele of een[cdm\\_hoogte\\_proxy](#cdm_altitude_proxy)variabele.
* Als een dataset niet aan alle eisen voor het ideale cdm\\_data\\_type voldoet, gebruik dan "Point" (die weinig eisen heeft) of "andere" (zonder vereisten) In plaats daarvan.
* Deze informatie wordt gebruikt doorERDDAP™op verschillende manieren, bijvoorbeeld, maar meestal voor het maken.ncCF-bestanden (.ncbestanden die voldoen aan de Contiguous Ragged Array Representations geassocieerd met de dataset cdm\\_data\\_type) en.ncCFMA-bestanden (.ncbestanden die voldoen aan de Multidimensionale Array Representaties geassocieerd met de dataset cdm\\_data\\_type) zoals gedefinieerd in[Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)hoofdstuk van het[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadataconventies, die voorheen "CF Point Observation Conventions" werden genoemd.
* Hint: Voor deze datasets, de juiste instelling voor[subsetVariables](#subsetvariables)is meestal de combinatie van alle variabelen vermeld in de cdm\\_...\\_variabele attributen. Bijvoorbeeld, gebruik voor TimeSeriesProfile de cdm\\_timeseries\\_variabelen plus de cdm\\_profile\\_variabelen.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) De aanbevolen manier om een persoon, organisatie of project te identificeren die aan deze dataset heeft bijgedragen (bijvoorbeeld, de oorspronkelijke maker van de gegevens, voordat het door de maker van deze dataset werd opgewerkt) . Bijvoorbeeld,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Als "contributeur" niet echt van toepassing is op een dataset, laat dit attribuut dan achterwege. Vergeleken met[creator\\_name](#creator_name)Dit is soms meer gericht op de financieringsbron.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is de AANVAARDE manier om de rol van[contributor\\_name](#creator_name). Bijvoorbeeld,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Als "contributeur" niet echt van toepassing is op een dataset, laat dit attribuut dan achterwege.
###### Overeenkomsten{#conventions} 
*   [ **Overeenkomsten** ](#conventions)  (van de[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadatastandaard) is sterk aanbevolen. (Het kan in de toekomst vereist zijn.) De waarde is een door komma's gescheiden lijst van metagegevensstandaarden die deze dataset volgt. Bijvoorbeeld:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
De in deERDDAP™zijn:
    
    *   [COARDSOvereenkomsten](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)is de voorloper van CF.
    *   [Klimaat en prognose (CF) Overeenkomsten](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)is de bron van veel van de aanbevolen en vereiste attributen inERDDAP. De huidige versie van CF is geïdentificeerd als "CF-1.6."
    * DeNetCDFAttribuutverdrag voor gegevensverzamelingsontdekking (ACDD) is de bron van veel van de aanbevolen en vereiste attributen inERDDAP. De originele 1.0 versie van ACDD (een briljant stuk werk van Ethan Davis) , werd geïdentificeerd als[UnidataDataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)De huidige (vanaf 2015) 1.3 versie van ACDD wordt geïdentificeerd als[ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). Als uw datasets hebben gebruiktUnidataDataset Discovery v1.0, wij moedigen u aan om[schakel uw datasets om ACDD-1.3 te gebruiken](#switch-to-acdd-13).
    
Als uw dataset een aantal extra metagegevensstandaarden volgt, voeg dan de naam toe aan de CSV-lijst in het attribuut Conventions.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (van de[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadatastandaard) De aanbevolen manier om het type gerasterde gegevens te identificeren (inEDDGriddatasets) . Bijvoorbeeld,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
De enige toegestane waarden zijn hulpinformatie, afbeelding, modelResult, fysiek Meting (de standaardwaarde wanneer ISO 19115 metagegevens worden gegenereerd) , kwaliteitInformatie, referentieInformatie en thematische classificatie. (Gebruik deze tag niet voor EDDTable datasets.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) De aanbevolen manier is om de persoon, organisatie of project te identificeren (indien niet een specifieke persoon of organisatie) , het meest verantwoordelijk voor de creatie (of meest recente opwerking) van deze gegevens. Bijvoorbeeld,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Indien de gegevens uitgebreid werden herwerkt (bijvoorbeeld satellietgegevens van niveau 2 tot niveau 3 of 4) , dan is meestal de reprocessor is vermeld als de maker en de oorspronkelijke maker is vermeld via[contributor\\_name](#contributor_name). Vergeleken met[project](#project), dit is flexibeler, omdat het kan identificeren een persoon, een organisatie, of een project.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) De aanbevolen manier om een e-mailadres te identificeren (correct geformatteerd) Dat biedt een manier om contact op te nemen met de schepper. Bijvoorbeeld,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is de BEVELDE manier om een URL te identificeren voor de organisatie die de dataset heeft gemaakt, of een URL met de informatie van de maker over deze dataset (Maar dat is meer het doel van[infoUrl](#infourl)) . Bijvoorbeeld,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) De aanbevolen manier om de datum te bepalen waarop de gegevens voor het eerst zijn aangemaakt (bijvoorbeeld, verwerkt in dit formulier) , in ISO 8601-formaat. Bijvoorbeeld,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Indien periodiek gegevens aan de dataset worden toegevoegd, is dit de eerste datum waarop de oorspronkelijke gegevens beschikbaar zijn gesteld.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) De aanbevolen manier om de datum te bepalen waarop de gegevens voor het laatst zijn gewijzigd (bijvoorbeeld wanneer een fout werd vastgesteld of wanneer de laatste gegevens werden toegevoegd) , in ISO 8601-formaat. Bijvoorbeeld,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) De aanbevolen manier om de datum te bepalen waarop de gegevens voor het eerst aan anderen beschikbaar zijn gesteld, bijvoorbeeld in ISO 8601-formaat 2012-03-15. Bijvoorbeeld,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Bijvoorbeeld, de dataset kan een[date\\_created](#date_created)van 2010-01-30, maar werd alleen openbaar gemaakt 2010-07-30.date\\_issuedwordt minder vaak gebruikt dandate\\_createdendate\\_modified. Alsdate\\_issuedwordt weggelaten, wordt verondersteld hetzelfde te zijn als dedate\\_created.
###### wereldwijddrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)-- Dit is een OPTIONAL globaal kenmerk gebruikt doorERDDAP™  (en geen metagegevensnormen) waarin de standaardwaarde voor de "Draw Land Mask" optie op de dataset's Make A Graph formulier wordt opgegeven ( *datasetID* .graph) en voor de &.land parameter in een URL die een kaart van de gegevens vraagt. Bijvoorbeeld,
    ```
    <att name="drawLandMask">over</att>  
    ```
Zie[drawLandMaskoverzicht](#drawlandmask).
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (van de[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadatastandaard) is VERBODEN en/of VERVANGD. Als de dataset[cdm\\_data\\_type](#cdm_data_type)is passend,ERDDAP™zal het automatisch gebruiken om eenfeatureTypekenmerk. U hoeft het dus niet toe te voegen.
    
Echter, als u[EDDtabelVanNcCFFiles](#eddtablefromnccffiles)om een dataset aan te maken van bestanden die de[CF Discrete bemonsteringsgeometrie (DSG) standaard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries), moeten de bestanden zelffeatureTypecorrect gedefinieerd, zodatERDDAP™kan de bestanden correct lezen. Dat maakt deel uit van de CF DSG eisen voor dat type bestand.
     
###### geschiedenis{#history} 
*   [ **geschiedenis** ](#history)  (van de[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)en[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatanormen) is een gerecommended multi-line String global attribuut met een regel voor elke verwerkingstap die de gegevens hebben ondergaan. Bijvoorbeeld,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Idealiter heeft elke regel een ISO 8601:2004 (E) geformatteerde datum+timeZ (bijvoorbeeld, 2011-08-05T08:55:02Z) gevolgd door een beschrijving van de verwerkingsstap.
    *   ERDDAP™creëert dit als het nog niet bestaat.
    * Als het al bestaat,ERDDAP™zal nieuwe informatie toevoegen aan de bestaande informatie.
    * geschiedenis is belangrijk omdat het clients in staat stelt om backtrack naar de oorspronkelijke bron van de gegevens.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)is een Vereist globaal attribuut met de URL van een webpagina met meer informatie over deze dataset (meestal op de website van de broninstelling) . Bijvoorbeeld,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Ofwel is de dataset wereldwijd[bronKenmerken](#global-attributes)of zijn globaal&lt;addAttributes&gt; MOET dit kenmerk bevatten.
    *   infoUrlis belangrijk omdat het klanten in staat stelt om meer te weten te komen over de gegevens van de oorspronkelijke bron.
    *   ERDDAP™toont een link naar deinfoUrlover het gegevenstoegangsformulier van de dataset ( *datasetID* .html) , Make A Graph web pagina ( *datasetID* .graph) , en andere websites.
    * Als de URL een query-gedeelte heeft (na de '?) , HET MOET al zijn[percentage gecodeerd](https://en.wikipedia.org/wiki/Percent-encoding). U moet speciale tekens coderen in de beperkingen (andere dan de oorspronkelijke "&" en de belangrijkste'='Eventuele) in de vorm %HH, waarbij HH de tweecijferige hexadecimale waarde van het teken is. Normaal gesproken moet je enkel enkele leestekens omzetten: % in %25, & in %26, " in %22,&lt;in %3C, = in %3D, &gt; in %3E, + in %2B,|in %7C,\\[in %5B,\\]in %5D, ruimte in %20, en zet alle tekens boven #127 om in hun UTF-8 vorm en codeer vervolgens elke byte van de UTF-8 vorm in het %HH formaat (een programmeur om hulp vragen) .
Bijvoorbeeld, &stationIDmet een gewicht van meer dan 200 g/m2
wordt &stationID%3E=%2241004%22
Procent codering is meestal vereist wanneer u toegang totERDDAPvia andere software dan een browser. Browsers behandelen meestal procent codering voor u.
In sommige situaties moet je alle tekens anders coderen dan A-Za-z0-9\\_-&#33;.~ ' () \\*, maar nog steeds niet coderen de eerste '&' of de belangrijkste'='.
Programmeertalen hebben hiervoor hulpmiddelen (zie bijvoorbeeldJava's[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
enJavaScript's [encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) en er zijn
        [websites die percentage coderen/decoderen voor u](https://www.url-encode-decode.com/).
    * Sindsdatasets.xmlis een XML-bestand, u MOET ook ALL & coderen, '&lt;", en "&gt;" in de URL als "&amp;," "&lt;', en '&gt;' na percentage codering.
    *   infoUrlis uniek voorERDDAP. Het is niet van enige metadata standaard.
###### instelling{#institution} 
*   [ **instelling** ](#institution)  (van de[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)en[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatanormen) is een verplicht globaal kenmerk met de korte versie van de naam van de instelling die de bron van deze gegevens is (meestal een acroniem, meestal&lt;20 tekens). Bijvoorbeeld,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Ofwel is de dataset wereldwijd[bronKenmerken](#global-attributes)of zijn globaal&lt;addAttributes&gt; MOET dit kenmerk bevatten.
    *   ERDDAP™toont de instelling wanneer zij een lijst van datasets toont. Indien de naam van een instelling hier langer is dan 20 tekens, zullen alleen de eerste 20 tekens zichtbaar zijn in de lijst van datasets (maar de hele instelling kan worden gezien door de muiscursor over het naastgelegen "?" pictogram) .
    * Als u instelling aan de lijst van&lt;categoryAttributes&gt; inERDDAP's[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand, kunnen gebruikers gemakkelijk datasets vinden van dezelfde instelling viaERDDAP'Search for Datasets by Category' op de homepage.
###### zoekwoorden{#keywords} 
*   [ **zoekwoorden** ](#keywords)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is een door komma's gescheiden lijst van woorden en korte zinnen (bijvoorbeeld,[GCMD Wetenschapstrefwoorden](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) die de dataset op een algemene manier beschrijven, en er niet van uitgaan dat er andere kennis van de dataset is (bijvoorbeeld voor oceanografische gegevens: oceaan) . Bijvoorbeeld,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Sindsdatasets.xmlis een XML-document, de tekens &,&lt;, en &gt; in een attribuut zoals trefwoorden (b.v. de &gt; tekens in GCMD wetenschappelijke zoekwoorden) moet worden gecodeerd als &amp;;,&lt;, respectievelijk &gt;.
Wanneer een dataset geladen isERDDAP,
    
    * "Earth Science &gt; " wordt toegevoegd aan het begin van een GCMD-trefwoord dat het mist.
    * GCMD trefwoorden worden omgezet in titel geval (De eerste letters zijn dus gekapitaliseerd.) .
    * De trefwoorden worden herschikt in gesorteerde volgorde en eventuele newline tekens worden verwijderd.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is een attribuut VAN HERHALING: als u een richtlijn volgt voor de woorden/zinnen in uw trefwoordenattribuut (bijvoorbeeld, GCMD Science Keywords) , zet de naam van die richtlijn hier. Bijvoorbeeld,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licentie{#license} 
*   [ **licentie** ](#license)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is een STRONGLY HERHALDE globale eigenschap met de licentie en/of gebruiksbeperkingen. Bijvoorbeeld,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Als "\\[standaard\\]" vindt plaats in de attribuutwaarde, het wordt vervangen door de standaardERDDAP™licentie van de&lt;standaardLicentie&gt; tag inERDDAP's
        \\[kat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)is van de verouderde[ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (die inMetadata\\_Conventionsals "UnidataDataset Discovery v1.0") Metadatastandaard. De attribuutwaarde was een door komma's gescheiden lijst van metadataconventies die door deze dataset worden gebruikt.
Als een dataset ACDD 1.0 gebruikt, is dit attribuut STRONGLY AANGEVALD, bijvoorbeeld,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
MaarERDDAP™beveelt nu ACDD-1.3. Als u[wisselde uw datasets om ACDD-1.3 te gebruiken](#switch-to-acdd-13), gebruikMetadata\\_Conventionsis STRONGLY DISCOURAGED: gewoon gebruiken [&lt;Overeenkomsten&gt;] (#Conventions) In plaats daarvan.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is een aanbevolen tekstuele beschrijving van de verwerking (bijvoorbeeld,[NASA-satellietgegevensverwerkingsniveaus](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels), bijvoorbeeld, niveau 3) of kwaliteitscontroleniveau (bijvoorbeeld, Science Quality) van de gegevens. Bijvoorbeeld,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### project{#project} 
*   [ **project** ](#project)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is een OPTIONAL attribuut om het project te identificeren waarvan de dataset deel uitmaakt. Bijvoorbeeld,
    ```
    <att name="project">GTSPP</att>  
    ```
Als de dataset geen deel uitmaakt van een project, gebruik dit attribuut dan niet. Vergeleken met[creator\\_name](#creator_name), dit is gericht op het project (geen persoon of organisatie, die bij meerdere projecten betrokken kan zijn) .
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) De aanbevolen manier om de persoon, organisatie of project te identificeren die deze dataset publiceert. Bijvoorbeeld,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
U bent bijvoorbeeld de uitgever als een andere persoon of groep[aangemaakt](#creator_name)de dataset en je bent gewoon reserveren viaERDDAP. Als "publisher" niet echt van toepassing is op een dataset, laat dit attribuut dan achterwege. Vergeleken met[creator\\_name](#creator_name), de uitgever heeft waarschijnlijk de gegevens niet significant gewijzigd of opnieuw verwerkt; de uitgever maakt de gegevens alleen beschikbaar op een nieuwe locatie.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) De aanbevolen manier om een e-mailadres te identificeren (correct geformatteerd, bijvoorbeeld, john\\_smith@great.org) dat een manier biedt om contact op te nemen met de uitgever. Bijvoorbeeld,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Als "publisher" niet echt van toepassing is op een dataset, laat dit attribuut dan achterwege.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is de AANBEVOLDE manier om een URL te identificeren voor de organisatie die de dataset heeft gepubliceerd, of een URL met de informatie van de uitgever over deze dataset (Maar dat is meer het doel van[infoUrl](#infourl)) . Bijvoorbeeld,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Als "publisher" niet echt van toepassing is op een dataset, laat dit attribuut dan achterwege.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)is een wereldwijd tekenreeksattribuut (niet van enige norm) aangeven of dit een real time dataset is. Bijvoorbeeld,
    ```
    <att name="real\\_time">true</att>  
    ```
Als dit niet waar is (de standaard) ,ERDDAP™zal cache antwoorden op verzoeken voor bestandstypen waar het hele bestand moet worden gemaakt voorERDDAP™kan beginnen met het sturen van de reactie naar de gebruiker en hergebruik ze voor ongeveer 15 minuten (bv..nc, .png) .
Als dit waar is,ERDDAP™zal nooit cache de response bestanden en zal altijd terugkeren nieuw aangemaakte bestanden.
###### sourceUrleigenschap{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)is een globaal kenmerk met de URL van de bron van de gegevens. Bijvoorbeeld,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (maar zet het allemaal op één lijn) 
    *   ERDDAP™meestal maakt dit globale attribuut automatisch. Twee uitzonderingen zijn EDDTableVanHyraxBestanden en EDDtableVan ThreddsFiles.
    * Als de bron is lokale bestanden en de bestanden zijn gemaakt door uw organisatie, gebruik
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Als de bron lokale database is en de gegevens zijn gemaakt door uw organisatie, gebruik
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrlis belangrijk omdat het klanten in staat stelt om backtrack naar de oorspronkelijke bron van de gegevens.
    *   sourceUrlis uniek voorERDDAP. Het is niet van enige metadata standaard.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (van de[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) is een attribuut dat wordt aanbevolen om de naam van de gecontroleerde woordenschat te identificeren waaruit variabele[standard\\_name](#standard_name)Deze zijn bezet. Bijvoorbeeld,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
voor versie 77 van de[CF-standaardnaamtabel](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (alleen voor EDDTable-datasets) is een wereldwijd attribuut waarvoor u een door komma's gescheiden lijst van [&lt;dataVariable&gt;] (#datavariabele)  [destinationName](#destinationname)s om variabelen te identificeren die een beperkt aantal waarden hebben (een andere manier: variabelen waarvoor elk van de waarden veel duplicaten heeft) . Bijvoorbeeld,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Als dit attribuut aanwezig is, zal de dataset een *datasetID* .subset web pagina (en een link naar het op elke dataset lijst) waarmee gebruikers snel en gemakkelijk verschillende subgroepen van de gegevens kunnen selecteren.
    * Elke keer dat een dataset wordt geladen,ERDDAPlaadt en slaat op schijf een tafel met alle van de onderscheiden () combinaties van de subgroep Variable's variabele waarden.ERDDAP™kan lezen datsubsetVariablestafel en proces het zeer snel (vooral in vergelijking met het lezen van veel gegevensbestanden of het verkrijgen van gegevens uit een database of andere externe dienst) .
    * Dat maakt het mogelijkERDDAP™om 3 dingen te doen:
        1. Het staatERDDAP™om een lijst van mogelijke waarden in een dropdown lijst op de Data Access Form, Make A Graph webpagina, en .subset webpagina's.
        2. Het staatERDDAP™om een .subset webpagina voor die dataset aan te bieden. Die pagina is interessant omdat het gemakkelijk om geldige combinaties van de waarden van die variabelen te vinden, die voor sommige datasets en sommige variabelen is zeer, zeer moeilijk (bijna onmogelijk) . Vervolgens, alle gebruikers verzoeken voor onderscheiden () subgroep Variabele gegevens zullen zeer snel zijn.
        3. Als er een gebruikersverzoek is dat alleen verwijst naar een subset van die variabelen,ERDDAP™kan snel lezen desubsetVariablestafel, en reageren op het verzoek. Dat kan veel tijd en moeite besparen voorERDDAP.
    * De volgorde van dedestinationNames u bepaalt de sorteervolgorde op de *datasetID* .subset webpagina, dus u zult meestal de belangrijkste variabelen eerst opgeven, dan de minst belangrijke. Bijvoorbeeld, voor datasets met tijdreeksen gegevens voor verschillende stations, zou je bijvoorbeeld,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
zodat de waarden gesorteerd worden op station\\_id.
    * Uiteraard is het uw keuze welke variabelen in desubsetVariableslijst, maar het voorgestelde gebruik is:
        
In het algemeen omvatten variabelen waarvoor u wiltERDDAP™om een drop-down lijst van opties weer te geven op het Data Access Form van de dataset (.html) en maak een grafiek (.graph) Webpagina's.
        
In het algemeen bevatten variabelen met informatie over de eigenschappen van de dataset (de stations, profielen en/of trajecten, met name van[cdm\\_timeserie\\_variabelen](#cdm_timeseries_variables),[cdm\\_profile\\_variabelen](#cdm_profile_variables),[cdm\\_trajectory\\_variabelen](#cdm_trajectory_variables)) . Er zijn slechts een paar verschillende waarden voor deze variabelen dus ze werken goed met drop-down lijsten.
        
Neem nooit gegevensvariabelen in verband met individuele waarnemingen op (bv. tijd, temperatuur, zoutgehalte, huidige snelheid) in desubsetVariableslijst. Er zijn te veel verschillende waarden voor deze variabelen, dus een drop-down lijst zou langzaam te laden en moeilijk te werken met (of niet werken) .
        
    * Als het aantal verschillende combinaties van deze variabelen groter is dan ongeveer 1.000.000, moet u overwegen desubsetVariablesdat u specificeert om het aantal verschillende combinaties te verminderen tot minder dan 1.000.000; anders, de *datasetID* .subset webpagina's kunnen langzaam worden gegenereerd. In extreme gevallen mag de dataset niet worden geladen inERDDAP™omdat het genereren van de lijst van verschillende combinaties te veel geheugen gebruikt. Zo ja, dan MOET u enkele variabelen verwijderen uit desubsetVariableslijst.
    * Als het aantal verschillende waarden van een subset variabele groter is dan ongeveer 20.000, moet u overwegen deze variabele niet op te nemen in de lijst vansubsetVariables; anders duurt het lang voordat de *datasetID* .subset *datasetID* .graph, en *datasetID* .html webpagina's. Ook, op een Mac, is het erg moeilijk om selecties te maken van een drop-down lijst met meer dan 500 items vanwege het ontbreken van een scroll bar. Een compromis is: verwijder variabelen uit de lijst wanneer gebruikers waarschijnlijk geen waarden uit een uitklaplijst zullen selecteren.
    * U moet elke dataset testen om te zien of desubsetVariablesHet instellen is oké. Als de brondataserver traag is en het duurt te lang (of mislukt) om de gegevens te downloaden, of het aantal gespecificeerde variabelen verminderen of verwijderen van desubsetVariablesglobaal kenmerk.
    * Subset Variabelen zijn erg nuttig. Dus als uw dataset geschikt is, maak dan eensubsetVariableskenmerk.
    * EDDTabelVanSOSautomatisch toevoegt
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
wanneer de dataset is aangemaakt.
        * Mogelijke waarschuwing: als een gebruiker de *datasetID* .subset webpagina selecteert een waarde die een koetsReturn of newline karakter heeft, *datasetID* .subset zal falen.ERDDAP™kan niet werken rond dit probleem vanwege een aantal HTML-details. In ieder geval is het bijna altijd een goed idee om de koetsReturn en newline karakters uit de gegevens te verwijderen. Om u te helpen het probleem op te lossen, als de EDDTable.subsetVariablesGegevenstabelERDDAPdetecteert gegevenswaarden die problemen veroorzaken, het zal een waarschuwing e-mailen met een lijst van beledigende waarden naar de e-mail Alles E-mailadressen opgegeven in setup.xml. Dan weet je wat opgelost moet worden.
        *    **Pre-generated subset tabellen.** Normaal gesproken, wanneerERDDAP™laadt een dataset, het vraagt de onderscheiden () deelvariabelen gegevenstabel van de gegevensbron, enkel via een normaal gegevensverzoek. In sommige gevallen zijn deze gegevens niet beschikbaar via de gegevensbron of kan het ophalen van de gegevensbron moeilijk zijn op de gegevensbronserver. Zo ja, kunt u een tabel met de informatie in een.jsonof .csv bestand met de naam *kat* /content/erddap/subset/ *datasetID* .json  (of .csv) . Indien aanwezig,ERDDAP™zal het één keer lezen wanneer de dataset wordt geladen en gebruiken als de bron van de subset gegevens.
            * Als er een fout optreedt tijdens het lezen, zal de dataset niet laden.
            * Het moet exact dezelfde kolom namen hebben (bijvoorbeeld, hetzelfde geval) als&lt;subsetVariables&gt;, maar de kolommen kunnen in elke volgorde zijn.
            * Het kan extra kolommen hebben (ze worden verwijderd en nieuwe redundante rijen worden verwijderd) .
            * Ontbrekende waarden moeten ontbrekende waarden zijn (niet nepnummers zoals -99) .
            *   .jsonbestanden kunnen een beetje moeilijker te maken, maar omgaan met Unicode karakters goed..jsonbestanden zijn gemakkelijk te maken als je ze maakt metERDDAP.
            * .csv-bestanden zijn eenvoudig om mee te werken, maar alleen geschikt voor ISO 8859-1 tekens. .csv-bestanden MOET kolomnamen op de eerste rij hebben en gegevens op de volgende rijen.
        * Voor enorme datasets of wanneer&lt;subsetVariables&gt; is verkeerd geconfigureerd, de tabel met combinaties van waarden kan groot genoeg zijn om te veel gegevens of OutOfMemory fouten te veroorzaken. De oplossing is het verwijderen van variabelen uit de lijst van&lt;subsetVariables&gt; waarvoor een groot aantal waarden bestaat, of indien nodig variabelen verwijderen totdat de grootte van die tabel redelijk is. Ongeacht de fout, de delen vanERDDAP™die desubsetVariablessysteem werkt niet goed (bijv. webpagina's laden zeer langzaam) wanneer er te veel rijen zijn (bv. meer dan een miljoen) in die tafel.
        *   subsetVariablesheeft niets te maken met het specificeren van welke variabelen gebruikers kunnen gebruiken in beperkingen, d.w.z. hoe gebruikers subsets van de dataset kunnen aanvragen.ERDDAP™staat altijd beperkingen toe om te verwijzen naar een van de variabelen.
###### Tijdeenheden{#time-units} 
[Tijd en tijdstempel](#time-units)De kolommen moeten ISO 8601:2004 hebben (E) geformatteerde datum+tijd Z-strings (bijvoorbeeld, 1985-01-31T15:31:00Z) .
             
###### samenvatting{#summary} 
*   [ **samenvatting** ](#summary)  (van de[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)en[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatanormen) is een verplicht globaal kenmerk met een lange beschrijving van de dataset (meestal&lt;500 tekens). Bijvoorbeeld,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Ofwel is de dataset wereldwijd[bronKenmerken](#global-attributes)of zijn globaal&lt;addAttributes&gt; MOET dit kenmerk bevatten.
    * Samenvatting is erg belangrijk omdat het clients toestaat om een beschrijving van de dataset te lezen die meer informatie heeft dan de titel en dus snel begrijpt wat de dataset is.
    * Advies: schrijf de samenvatting zodat het zou werken om de dataset te beschrijven aan een willekeurige persoon die je ontmoet op straat of aan een collega. Vergeet niet de[Vijf W's en een H](https://en.wikipedia.org/wiki/Five_Ws)Wie heeft de dataset gemaakt? Welke informatie werd verzameld? Wanneer werden de gegevens verzameld? Waar werd het verzameld? Waarom werd het verzameld? Hoe werd het verzameld?
    *   ERDDAP™toont de samenvatting op het Data Access Form van de dataset ( *datasetID* .html) , Make A Graph web pagina ( *datasetID* .graph) , en andere websites.ERDDAP™gebruikt de samenvatting bij het maken van FGDC- en ISO 19115-documenten.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (een facultatiefERDDAP-specifieke globale metadata attribuut, niet van enige standaard) geeft op simplistische wijze aan wanneer de gegevens voor een bijna-real-time dataset als verouderd worden beschouwd, gespecificeerd alsnow- *nEenheden* , bijvoorbeeld,now-2dagen voor gegevens die gewoonlijk 24-48 uur na de tijdswaarde verschijnen. Voor prognosegegevens, nu gebruiken **+**  *nEenheden* , bijvoorbeeld, nu + 6 dagen voor prognose gegevens die, ten hoogste, 8 dagen in de toekomst. (Zie[now- *nEenheden* syntaxisbeschrijving](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) Als de maximale tijdswaarde voor de dataset recenter is dan de opgegeven tijd, wordt de dataset als up-to-date beschouwd. Als de maximale tijdswaarde ouder is dan de opgegeven tijd, wordt de dataset als up-to-date beschouwd. Voor verouderde datasets is er waarschijnlijk een probleem met de gegevensbron, dusERDDAP™kan geen toegang krijgen tot gegevens vanaf recentere tijdstippen.
    
DetestOutOfDatewaarde wordt weergegeven als een kolom in de[allDatasetsdataset](#eddtablefromalldatasets)in uwERDDAP. Het wordt ook gebruikt voor het berekenen van de OutOfDate index, een andere kolom in deallDatasetsdataset.
Als de index&lt;1, de dataset wordt als actueel beschouwd.
Als de index&lt;=1, de dataset wordt als verouderd beschouwd.
Als de index&lt;=2, de dataset wordt beschouwd als zeer verouderd.
    
DetestOutOfDatewaarde wordt ook gebruikt doorERDDAP™om de https://*yourDomain*/erddap/outOfDateDatasets.html webpagina ([voorbeeld](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) waarin de datasets worden weergegeven die&lt;testOutOfDate&gt; tags, met de datasets gerangschikt naar hoe verouderd ze zijn. Als u het bestandstype wijzigt (van .html naar .csv,.jsonlCSV,.nc,.tsv, ...) , kunt u die informatie in verschillende bestandsformaten.
    
Waar mogelijk,[GenererenDatasetsXml](#generatedatasetsxml)voegt eentestOutOfDatetoe te schrijven aan de globaleaddAttributesvan een dataset. Deze waarde is een suggestie gebaseerd op de informatie die beschikbaar is voor GenerateDatasetsXml. Als de waarde niet geschikt is, verander het dan.
    
"Out-of-date" hier is heel anders dan [&lt;herladen EveryNminutes&gt;] (#reloadeverynminutes) , die gaat over hoe up-to-dateERDDAPDe kennis van de dataset wel. De&lt;testOutOfDate&gt; systeem gaat ervan uit datERDDAPDe kennis van de dataset is up-to-date. De vraag&lt;testOutOfDate&gt; behandelt: lijkt er iets mis te zijn met de bron van de gegevens, waardoor recentere gegevens niet toegankelijk zijn doorERDDAP?
    
###### titel{#title} 
*   [ **titel** ](#title)  (van de[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)en[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatanormen) is een verplicht globaal kenmerk met de korte beschrijving van de dataset (meestal&lt;= 95 tekens). Bijvoorbeeld,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Ofwel is de dataset wereldwijd[bronKenmerken](#global-attributes)of zijn globaal&lt;addAttributes&gt; MOET dit kenmerk bevatten.
    * titel is belangrijk omdat elke lijst van datasets gepresenteerd doorERDDAP  (andere dan zoekresultaten) de datasets in alfabetische volgorde op titel. Dus als je de volgorde van de datasets wilt specificeren, of enkele datasets samen wilt laten groeperen, moet je titels maken met dat in gedachten. Veel lijsten van datasets (bijvoorbeeld, in antwoord op een categorie zoeken) , toon een subset van de volledige lijst en in een andere volgorde. Dus de titel voor elke dataset moet op zichzelf staan.
    * Als de titel het woord "GEDEPREKEERD" bevat (alle hoofdletters) , dan krijgt de dataset een lagere rangschikking in zoekopdrachten.
             
##### &lt;axisVariable&gt;{#axisvariable} 
* [ ** &lt;axisVariable&gt; ** ] (#asvariabele) wordt gebruikt om een dimensie te beschrijven (ook wel "as" genoemd) .
VoorEDDGriddatasets, één of meeraxisVariabletags is vereist, en alle[dataVariables](#datavariable)altijd alle asvariabelen delen/gebruiken. ([Waarom?](#why-just-two-basic-data-structures) [Wat als ze dat niet doen?](#dimensions))   
Er MOET een asvariabele zijn voor elke dimensie van de gegevensvariabelen.
De asvariabelen moeten worden gespecificeerd in de volgorde waarin de gegevensvariabelen deze gebruiken.
(EDDTable datasets kunnen NIET gebruiken&lt;axisVariable&gt; labels.)
Een uitgewerkt voorbeeld is:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; ondersteunt de volgende subtags:
###### &lt;sourceName\\&gt;{#sourcename} 
* [&lt;sourceName\\&gt;] (#bronnaam) -- de naam van de gegevensbron voor de variabele. Dit is de naam dieERDDAP™zal gebruiken bij het aanvragen van gegevens van de gegevensbron. Dit is de naam dieERDDAP™zal zoeken wanneer gegevens worden geretourneerd van de gegevensbron. Dit is hoofdlettergevoelig. Dit is vereist.
###### &lt;destinationName\\&gt;{#destinationname} 
* [&lt;destinationName\\&gt;] (#bestemmingsnaam) is de naam voor de variabele die zal worden getoond en gebruikt doorERDDAP™gebruikers.
    * Dit is OPTIONAL. Indien afwezig,sourceNamewordt gebruikt.
    * Dit is handig omdat het u toelaat om een cryptisch of vreemd te veranderensourceName.
    *   destinationNameis hoofdlettergevoelig.
    *   destinationNames MOET beginnen met een letter (A-Z, a-z) en MOET gevolgd worden door 0 of meer tekens (A-Z, a-z, 0-9, en \\_) . ('-' was toegestaan voorERDDAP™versie 1.10.) Deze beperking staat as variabele namen toe om dezelfde inERDDAP™, in de responsbestanden en in alle software waar deze bestanden zullen worden gebruikt, inclusief programmeertalen (zoalsPython,MatlabenJavaScript) wanneer er soortgelijke beperkingen gelden voor variabele namen.
    * InEDDGriddatasets, de[lengte, breedtegraad, hoogte, diepte en tijd](#destinationname)asvariabelen zijn speciaal.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt;addAttributes&gt;] (#variable-addattributes) definieert een OPTIONAL set attributen ( *naam* = *waarde* ) die worden toegevoegd aan de eigenschappen van de bron voor een variabele, om de gecombineerde eigenschappen voor een variabele te maken.
Als de variabele[bronKenmerken](#variable-addattributes)of&lt;addAttributes&gt; omvatten[scale\\_factoren/ofadd\\_offset](#scale_factor)attributen, hun waarden zullen worden gebruikt om de gegevens uit te pakken van de bron vóór distributie aan de client
     (resultaat Waarde = bron Waardescale\\_factor+add\\_offset) . De uitgepakte variabele zal van hetzelfde gegevenstype zijn (bijvoorbeeld, zweven) als descale\\_factorenadd\\_offsetwaarden.
         
##### &lt;dataVariable&gt;{#datavariable} 
* [ ** &lt;dataVariable&gt; ** ] (#datavariabele) is een VEREIST (voor bijna alle datasets) label binnen de&lt;dataset&gt;-tag die wordt gebruikt om een gegevensvariabele te beschrijven. Er moeten 1 of meer instanties van dit label zijn. Een uitgewerkt voorbeeld is:

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

&lt;dataVariable&gt; ondersteunt de volgende subtags:
###### &lt;sourceName&gt;{#sourcename-1} 
* [&lt;sourceName&gt;] (#bronnaam) -- de naam van de gegevensbron voor de variabele. Dit is de naam dieERDDAP™zal gebruiken bij het aanvragen van gegevens van de gegevensbron. Dit is de naam dieERDDAP™zal zoeken wanneer gegevens worden geretourneerd van de gegevensbron. Dit is hoofdlettergevoelig. Dit is vereist.
###### Groepen{#groups} 
CF toegevoegd ondersteuning voor groepen met CF v1,8. Vanaf ~2020,NetCDFtools ondersteunen het plaatsen van variabelen in groepen in a.ncbestand. In de praktijk betekent dit alleen dat de variabelen een lange naam hebben die de groep identificeert (s) en de variabele naam, bijvoorbeeld, groep1a/group2c/varName ).ERDDAP™ondersteunt groepen door de "/"'s in de variabele om te zetten&lt;sourceName&gt; in "\\_'s" in de variabele&lt;destinationName&gt;, bijvoorbeeld, groep1a\\_group2c\\_varNaam . (Als je dat ziet, moet je je realiseren dat groepen niet veel meer zijn dan een syntaxis conventie.) Wanneer de variabelen inERDDAP™, zullen alle variabelen in een groep samen verschijnen, het nabootsen van de onderliggende groep.\\[AlsERDDAP™, met name GenererenDatasets Xml, werkt niet zo goed als het kon met bronbestanden die groepen hebben, stuur een voorbeeldbestand naar Chris. John at noaa.gov .\\]

EDDTableFromFiles datasets kunnen een aantal speciaal gecodeerde, pseudo-sourceNames om nieuwe gegevensvariabelen te definiëren, bijvoorbeeld om een globaal attribuut te promoten als een gegevensvariabele. Zie[deze documentatie](#pseudo-sourcenames).
###### HDFStructuur{#hdf-structures} 
Beginnen metERDDAP™v2.12,EDDGridVanNcFiles enEDDGridVanNcFiles Uitgepakt kan gegevens lezen van "structuren" in.nc4 en.hdfVier dossiers. Om een variabele te identificeren die afkomstig is van een structuur, de&lt;sourceName&gt; moet het formaat gebruiken: *volledige structuurnaam* | *lidNaam* , bijvoorbeeld groep1/myStruct|mijn Lid .

###### Bronnamen met vaste waarde{#fixed-value-sourcenames} 
In een EDDTable dataset, als je een variabele wilt aanmaken (met een enkelvoudige, vaste waarde) dat niet in de brondataset staat, gebruik:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Het beginteken geeft aanERDDAP™dat een vaste Waarde zal volgen.

* Voor numerieke variabelen moet de vaste waarde een enkele eindige waarde of NaN zijn (hoofdletter ongevoelig, bv. \\=NaN) .
* Voor tekenreeksvariabelen moet de vaste waarde afzonderlijk zijn,[JSON-stijl tekenreeks](https://www.json.org/json-en.html)  (met speciale tekens ontsnapt met \\ tekens) , bv., \\="My \\"Special\\"String" .
* Voor een tijdstempel variabele, geef de vaste waarde als een getal in"seconds since 1970-01-01T00:00:00Z"en gebruik
units=seconden sinds 1970-01-01T00:00:00Z .
    
De andere tags voor de&lt;dataVariable&gt; werk alsof dit een reguliere variabele is.
Bijvoorbeeld om een variabele genaamd hoogte te creëren met een vaste waarde van 0.0 (drijvend) Gebruik:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Voor ongebruikelijke situaties kunt u zelfs eenactual\\_rangeaddAttribuut, die de verwachte waarden van bestemming zal overschrijvenMin en destinationMax (die anders gelijk zou zijn aan de vaste Waarde) .
 
###### Script Bronnamen/Gederiveerde Variabelen{#script-sourcenamesderived-variables} 
Beginnen metERDDAP™v2.10, in een[EDDTableFromFiles](#eddtablefromfiles),[EDDTableFromDatabase](#eddtablefromdatabase), of[EDDtableFromFileNames](#eddtablefromfilenames)dataset, de&lt;sourceName&gt; kan
een uitdrukking (een vergelijking die tot één waarde evalueert) , met behulp van het formaat
```
    <sourceName>=*expression*</sourceName>  
```
of een script (een reeks verklaringen die een enkele waarde teruggeeft) , met behulp van het formaat
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™De Commissie is van mening dat de[Apache-project](https://www.apache.org/) [JavaUitdrukkingstaal (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licentie:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) om de expressies te evalueren en de scripts uit te voeren.
De berekening voor een gegeven nieuwe variabele gebeurt binnen één rij van de resultaten, herhaaldelijk voor alle rijen.
De uitdrukkingen en scripts gebruiken eenJava- enJavaScript-achtige syntax en kan een van de
[operators en methoden die zijn ingebouwd in JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).
De scripts kunnen ook methoden gebruiken (functies) van deze klassen:
*   [Agenda2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), dat is een wrapper voor sommige van de statische, tijd- en kalender-gerelateerde methoden in com.cohort.util.Calendar2 ([licentie](/acknowledgements#cohort-software)) . Bijvoorbeeld,
Agenda2.parseToEpochSeconds ( *bronTijd, datum TijdFormat* ) zal de bron ontleden Time string via de datumTimeFormat string en geef een"seconds since 1970-01-01T00:00:00Z"  (tijdperkSeconds) dubbele waarde.
*   [Wiskunde](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), dat is een wrapper voor bijna alle van de statische, wiskunde-gerelateerde methoden in[Java.lang. Wiskunde](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). Bijvoorbeeld, Math.atan2 ( *y, x* ) neemt rechthoekige coördinaten in (y, x) en geeft poolcoördinaten terug (een reeks dubbels met\\[r, theta\\]) .
*   [Wiskunde2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), dat is een wrapper voor bijna alle van de statische, wiskunde-gerelateerde methoden in com.cohort.util. Wiskunde2 ([licentie](/acknowledgements#cohort-software)) . Bijvoorbeeld,
Math2.roundTo ( *d, n Places* ) zal d tot het opgegeven aantal cijfers rechts van het decimaalpunt worden afgerond.
* String, die geeft u toegang tot alle van de statische, String-gerelateerde methoden in[Java.lang. Tekenreeks](https://docs.oracle.com/javase/8/docs/api/java/lang/String). Tekenreeksobjecten inERDDAP™expressies en scripts kunnen een van hun geassocieerde gebruikenJavamethoden, zoals beschreven in de java.lang. Tekenreeksdocumentatie. Bijvoorbeeld, String.valueOf (d) zal de dubbele waarde d omzetten in een tekenreeks (Hoewel u ook ""+d kunt gebruiken) .
*   [Tekenreeks2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), dat is een wrapper voor de meeste van de statische, String- en array-gerelateerde methoden in com.cohort.util.String2 ([licentie](/acknowledgements#cohort-software)) . Bijvoorbeeld, String2.zeropad ( *aantal, nDigits* ) zal 0's aan de linkerkant van het getal String toevoegen zodat het totale aantal cijfers nDigits is (bv. tekenreeks2.zeropad ("6," 2) geeft "06" terug) .
*   [rij](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), die beschikt over niet-statische methoden voor toegang tot de gegevens uit de verschillende kolommen in de huidige rij van de brongegevenstabel. Bijvoorbeeld, rij.kolomString ("jaar") leest de waarde uit de kolom "jaar" als een tekenreeks, terwijl, rij.kolom Int ("jaar") leest de waarde uit de kolom "jaar" als een geheel getal.

Om veiligheidsredenen kunnen expressies en scripts geen andere klassen gebruiken dan die 6.ERDDAP™verplicht deze beperking door een standaard zwarte lijst aan te maken (die alle klassen zwarte lijsten) en dan een witte lijst (die specifiek de 6 hierboven beschreven klassen toelaat) . Als u andere methoden en/of andere klassen nodig hebt om uw werk te doen, stuur dan uw verzoeken naar Chris. John at noaa.gov .
    
###### Efficiëntie
Voor EDDTableFromFiles datasets is er slechts een zeer, zeer minimaal (waarschijnlijk niet merkbaar) vertraging bij verzoeken om gegevens van deze variabelen. Voor EDDTableVanuitdatabase is er een enorme snelheidsboete voor verzoeken die beperkingen op deze variabelen omvatten (bijv., (&longitude0360&gt;30&longitude0360&lt;40) omdat de beperkingen niet kunnen worden doorgegeven aan de database, zodat de database veel meer gegevens moet terugsturen naarERDDAP™  (dat is zeer tijdrovend) zodatERDDAP™kan de nieuwe variabele maken en de beperking toepassen. Om het ergste geval te voorkomen (indien er geen beperkingen aan de databank worden doorgegeven) ,ERDDAP™gooit een foutmelding zodat de database niet de volledige inhoud van de tabel hoeft terug te geven. (Als je dit wilt omzeilen, voeg dan een beperking toe aan een niet-script kolom die altijd waar zal zijn, bijvoorbeeld, &time&lt;3000-01-01) Om deze reden, met EDDTableFromDatabase, is het waarschijnlijk altijd beter om een afgeleide kolom in de database te maken in plaats van te gebruikensourceName=script inERDDAP.

###### Overzicht van hoe een expressie (Of Script) Wordt gebruikt:
In antwoord op het verzoek van een gebruiker om tabelgegevens,ERDDAP™krijgt gegevens van een reeks bronbestanden. Elk bronbestand zal een tabel met ruwe genereren (rechtstreeks van de bron) gegevens.ERDDAP™zal dan gaan door de tabel van ruwe gegevens, rij voor rij, en evalueren van de expressie of script eenmaal voor elke rij, om een nieuwe kolom die die uitdrukking of script als eensourceName.
    
###### GenererenDatasetsXml
Merk op dat GenererenDatasets Xml is volledig onbewust wanneer er behoefte is aan een variabele met&lt;sourceName&gt; *expressie* &lt;'sourceName&gt;. Je moet de variabele aanmaken indatasets.xmlMet de hand.

###### Expressie Voorbeelden:
Hier zijn enkele complete voorbeelden van gegevensvariabelen die een expressie gebruiken om een nieuwe kolom van gegevens te maken. Wij verwachten dat deze voorbeelden (en varianten daarvan) zal ongeveer 95% van het gebruik van alle expressie-afgeleide dekkensourceNames.

###### Het combineren van afzonderlijke "datum" en"time"Kolommen in een uniforme tijdkolom:
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
DatsourceNameexpressie maakt een nieuwe"time"kolom door de tekenreekswaarden van de "datum" samen te voegen (yyyy-MM-dd) en"time"  (HH:mm:ss) kolommen op elke rij van het bronbestand, en door het omzetten van die string in een"seconds since 1970-01-01"  (tijdperkSeconds) dubbele waarde.

Of natuurlijk, moet je de tijd formaat string aanpassen om te gaan met het specifieke formaat in elke dataset bron datum en tijd kolommen, zie de
[tijdseenheden documentatie](#string-time-units).

Technisch gezien, hoef je niet te gebruiken Agenda2.parseToEpochSeconds () om de gecombineerde datum+tijd om te zetten in tijdperkSeconds. Je kunt gewoon de datum+tijd string doorgeven aanERDDAP™en het formaat specificeren (bv.
yyyy-MM-dd'T'HH:mm:ss'Z') via het eenheidsattribuut. Maar er zijn aanzienlijke voordelen aan het omzetten naar epochSeconds -- met name EDDTableFromFiles kan dan gemakkelijk bijhouden van het bereik van tijdwaarden in elk bestand en zo snel beslissen of in een bepaald bestand te kijken bij het beantwoorden van een verzoek met tijdslimieten.

Een gerelateerd probleem is de noodzaak om een uniforme datum+tijd kolom te maken van een bron met aparte jaar, maand, datum, uur, minuut, tweede. De oplossing is zeer vergelijkbaar, maar je zult vaak moeten nul-pad veel van de velden, zodat, bijvoorbeeld, maand (1 - 12) en datum (1-31) altijd 2 cijfers hebben. Hier is een voorbeeld met jaar, maand, datum:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Een gerelateerd probleem is de noodzaak om een uniforme breedte- of lengtekolom te creëren door de gegevens te combineren in de aparte graden, minuten en seconden kolommen van de brontabel, elk opgeslagen als gehele getallen. Bijvoorbeeld,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Het omzetten van een kolom met de naam "lon" met de lengtegraadwaarden van 0 - 360° in een kolom met de naam "longitude" met waarden van -180 - 180°
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
DatsourceNameexpressie maakt een nieuwe "longitude" kolom door het omzetten van de dubbele waarde van de "lon" kolom op elke rij van het bronbestand (vermoedelijk met 0 - 360 waarden) , en door dat om te zetten in een -180 naar 180 dubbele waarde.

Als u in plaats daarvan de bronlengtewaarden van -180 - 180° wilt omzetten in 0 - 360°, gebruik dan
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Het benoemen van de twee lengtegraden:
Als de dataset 2 lengte-variabelen zal hebben, raden wij het gebruik vandestinationName=lengte voor de -180 - 180° variabele endestinationName= lengtegraad0360 (en longName=\\"Longitude 0-360°") voor de 0 - 360° variabele. Dit is belangrijk omdat gebruikers soms Advanced Search gebruiken om gegevens binnen een specifiek lengtebereik te zoeken. Die zoektocht zal beter werken als de lengtegraad consequent -180 - 180° waarden heeft voor alle datasets. Ook de geospatial\\_lon\\_min, geospatial\\_lon\\_max, Westernmost\\_Easting and Easternmost\\_Eastings global attributen zullen dan op een consistente manier worden ingesteld (met lengtegraden -180 tot 180°) ;
    
###### Een kolom genaamd "tempF" omzetten met temperatuurwaarden in graden\\_ F in een kolom genaamd "tempC" met temperaturen in graden\\_ C:
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
DatsourceNameexpressie maakt een nieuwe "tempC" kolom door het omzetten van de float degree\\_ F-waarde uit de kolom "tempF" op elke rij van het bronbestand in een floatdegree\\_ C waarde.

Merk op dat uw dataset zowel de oorspronkelijke temp kan hebben F variabele en de nieuwe temperatuur C variabele door een andere variabele met
```
    <sourceName>tempF</sourceName>
```
###### Omzetten van wind "snelheid" en "richting" kolommen in twee kolommen met de u,v componenten
* Gebruik om een u variabele te maken
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Om een v variabele te maken, gebruik
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Of, gegeven u,v:
* Gebruik om een snelheidsvariabele te maken
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Om een richtingsvariabele te maken, gebruik
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Scriptvoorbeeld:
Hier is een voorbeeld van het gebruik van een script, niet alleen een expressie, als eensourceName. We verwachten dat scripts, in tegenstelling tot uitdrukkingen, niet vaak nodig zullen zijn. In dit geval is het doel een niet-NAN ontbrekende waarde terug te geven (-99) voor temperatuurwaarden buiten een bepaald bereik. Merk op dat het script is het deel na de "=".
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
###### Harde vlag
Als u de expressie of het script gedefinieerd in eensourceName, moet u een[harde vlag](/docs/server-admin/additional-information#hard-flag)voor de datasetERDDAP™verwijdert alle gecachede informatie voor de dataset en herleest elk gegevensbestand (gebruik makend van de nieuwe expressie of script) de volgende keer laadt het de dataset. Als alternatief kunt u[DasDds](#dasdds)wat overeenkomt met het instellen van een harde vlag.

###### Procent coderen
Dit is slechts zelden relevant: Omdat de uitdrukkingen en scripts zijn geschreven indatasets.xml, dat is een XML-document, je moet percentage coderen elke&lt;, \\&gt; en & tekens in de expressies en scripts als&lt;, &gt;, en &amp; .

###### Vaak voorkomende problemen
Een veel voorkomend probleem is dat je een variabele aanmaakt metsourceName= *expressie* Maar de resulterende kolom van gegevens heeft alleen ontbrekende waarden. Als alternatief, sommige rijen van de nieuwe kolom ontbreken waarden en je denkt dat ze niet moeten. Het onderliggende probleem is dat er iets mis is met de uitdrukking enERDDAPzet die fout om in een ontbrekende waarde. Om het probleem op te lossen,

* Kijk naar de uitdrukking om te zien wat het probleem zou kunnen zijn.
* Kijk in[log.txt](/docs/server-admin/additional-information#log), die zal het eerste foutmelding gegenereerd tijdens het aanmaken van elke nieuwe kolom tonen.

Gemeenschappelijke oorzaken zijn:

* Je gebruikte de verkeerde zaak. Uitdrukkingen en scripts zijn hoofdlettergevoelig.
* Je hebt de naam van de klas weggelaten. Je moet bijvoorbeeld Math.abs gebruiken () , niet alleen abs () .
* Je hebt geen conversies gedaan. Bijvoorbeeld, als het datatype van een parameterwaarde String is en je hebt een dubbele waarde, moet je een double omzetten in een String via ""+d.
* De kolomnaam in de expressie komt niet precies overeen met de kolomnaam in het bestand (of de naam kan anders zijn in sommige bestanden) .
* Er is een syntaxfout in de expressie (b.v. een ontbrekende of extra ') ').

Als je vastzit of hulp nodig hebt,
voeg de details toe en zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
        
###### &lt;destinationName&gt;{#destinationname-1} 
* [&lt;destinationName&gt;] (#bestemmingsnaam) -- de naam van de variabele die zal worden getoond en gebruikt doorERDDAP™gebruikers.
    * Dit is OPTIONAL. Indien afwezig,[sourceName](#sourcename)wordt gebruikt.
    * Dit is handig omdat het u toelaat om een cryptisch of vreemd te veranderensourceName.
    *   destinationNameis hoofdlettergevoelig.
    *   destinationNames MOET beginnen met een letter (A-Z, a-z) en MOET gevolgd worden door 0 of meer tekens (A-Z, a-z, 0-9, en \\_) . ('-' was toegestaan voorERDDAP™versie 1.10.) Deze beperking maakt het mogelijk dat gegevens variabele namen hetzelfde zijn inERDDAP™, in de responsbestanden en in alle software waar deze bestanden zullen worden gebruikt, inclusief programmeertalen (zoalsPython,MatlabenJavaScript) wanneer er soortgelijke beperkingen gelden voor variabele namen.
    * In EDDTable datasets,[lengtegraad, breedtegraad, hoogte (of diepte) , en tijd](#destinationname)gegevensvariabelen zijn speciaal.
             
###### &lt;gegevens Type &gt;{#datatype} 
* [&lt;dataType&gt;] (#datatype) -- specificeert het gegevenstype afkomstig van de bron. (In sommige gevallen, bijvoorbeeld, bij het lezen van gegevens uit ASCII-bestanden, specificeert het hoe de gegevens afkomstig van de bron moeten worden opgeslagen.) 
    * Dit wordt vereist door sommige datasets en door anderen GEVOEGD. Dataset types die dit vereisen voor hundataVariables zijn:EDDGridVan XxxFiles, EDDTableFromXxxFiles, EDDTableFromMWFS, EDDTableFromNOS, EDDTableFromSOS. Andere dataset types negeren deze tag omdat ze de informatie van de bron.
         
    * Geldige waarden zijn een van de standaardwaarden[ERDDAP™gegevenstypen](#data-types)plus booleaans (zie hieronder) . De dataType namen zijn hoofdlettergevoelig.
         
###### booleaanse gegevens{#boolean-data} 
*   [Booleaans](#boolean-data)is een speciaal geval.
    * Intern,ERDDAP™ondersteunt geen booleaans type omdat booleanen ontbrekende waarden niet kunnen opslaan en de meeste bestandstypen ondersteunen geen booleanen. Ook,DAPondersteunt geen booleanen, dus er zou geen standaard manier zijn om booleaanse variabelen te vragen.
    * "boolean" voor de gegevens specificeren Type indatasets.xmlzal leiden tot booleaanse waarden worden opgeslagen en vertegenwoordigd als bytes: 0=vals, 1=true, 127=missing\\_value.
    * Gebruikers kunnen beperkingen specificeren door de numerieke waarden te gebruiken (bijvoorbeeld "isAlive=1") .
    *   ERDDAP™beheerders moeten soms de "booleaanse" gegevens gebruiken Type indatasets.xmlom te vertellenERDDAP™hoe om te gaan met de gegevensbron (b.v. om booleaanse waarden uit een relationele database te lezen en te converteren naar 0, 1, of 127) .
         
* Als u een gegevensvariabele wilt veranderen uit het dataType in de bronbestanden (bijvoorbeeld, kort) in sommige andere gegevens Typ in de dataset (bijvoorbeeld, int) Niet gebruiken&lt;dataType&gt; om te specificeren wat u wilt. (Het werkt voor sommige soorten datasets, maar niet voor andere.) In plaats daarvan:
    * Gebruik&lt;dataType&gt; om aan te geven wat er in de bestanden zit (bijvoorbeeld, kort) .
    * In de&lt;addAttributes&gt; voor de variabele, voeg a[scale\\_factor](#scale_factor)attribuut met de nieuwe gegevens Type (bijvoorbeeld, int) en een waarde van bijvoorbeeld 1,
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt;addAttributes&gt;] (#variable-addattributes) -- definieert een reeks eigenschappen ( *naam* = *waarde* ) die worden toegevoegd aan de eigenschappen van de bron voor een variabele, om de gecombineerde eigenschappen voor een variabele te maken. Dit is OPTIONAL.
Als de variabele[bronKenmerken](#variable-addattributes)of&lt;addAttributes&gt; omvatten[scale\\_factoren/ofadd\\_offset](#scale_factor)attributen, hun waarden zullen worden gebruikt om de gegevens uit te pakken van de bron vóór distributie aan de client. De uitgepakte variabele zal van hetzelfde gegevenstype zijn (bijvoorbeeld, zweven) als descale\\_factorenadd\\_offsetwaarden.
        
###### Variabele&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** Variabele eigenschappen / Variabele&lt;addAttributes&gt; ** ] (#variable-addattributes) --&lt;addAttributes&gt; is een OPTIONAL tag binnen een&lt;axisVariable&gt; of&lt;dataVariable&gt; tag die wordt gebruikt om de eigenschappen van de variabele te wijzigen.
    
    *    ** Een variabele gebruiken&lt;addAttributes&gt; om de eigenschappen van de variabele te wijzigen. ** ERDDAP™combineert de eigenschappen van een variabele uit de bron van de dataset (** bronKenmerken **) en de variabele** addAttributes **waarin u definieert indatasets.xml  (die prioriteit hebben) om de variabele te maken "** gecombineerdKenmerken ** "en dat zijn watERDDAP™gebruikers zien. U kunt dusaddAttributesom de waarden van de bron te herdefiniërenKenmerken, nieuwe attributen toe te voegen of attributen te verwijderen.
    * Zie [ ** &lt;addAttributes&gt; **informatie] (#addattributes) die geldt voor globaal en variabel** &lt;addAttributes&gt; ** .
    *   ERDDAP™zoekt naar en gebruikt veel van deze eigenschappen op verschillende manieren. Bijvoorbeeld, de kleurBar waarden zijn vereist om een variabele beschikbaar te maken viaWMS, zodat kaarten kunnen worden gemaakt met consistente kleurBars.
    *   [Lengtegraad, breedtegraad, hoogte (of diepte) , en tijdvariabelen](#destinationname)krijgen veel geschikte metadata automatisch (bijvoorbeeld,[eenheden](#units)) .
    * Een monster&lt;addAttributes&gt; voor een gegevensvariabele:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Het lege getalOfObservations attribuut veroorzaakt het bronnummerOfObservations attribuut (indien) uit de definitieve, gecombineerde lijst van kenmerken te verwijderen.
    * Het verstrekken van deze informatie helptERDDAP™een betere job en helpt gebruikers de datasets te begrijpen.
Goede metadata maakt een dataset bruikbaar.
Onvoldoende metadata maakt een dataset nutteloos.
Neem de tijd om goed werk te doen met metadata attributen.
    
###### Opmerkingen over variabele attributen die speciaal zijn inERDDAP:

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)is een attribuut van de aanbevolen variabele. Bijvoorbeeld,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Dit kenmerk is van de[CDCCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)en[CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadatanormen.
* Indien aanwezig, MOET het een array zijn van twee waarden van hetzelfde gegevenstype als het type bestemmingsgegevens van de variabele, met vermelding van de werkelijke waarde. (niet de theoretische of de toegestane) minimum- en maximumwaarden van de gegevens voor die variabele.
* Als de gegevens zijn verpakt met[scale\\_factoren/ofadd\\_offset](#scale_factor),actual\\_rangemoeten uitgepakte waarden hebben en van hetzelfde gegevenstype zijn als de uitgepakte waarden.
* Voor sommige gegevensbronnen (bijvoorbeeld, alle EDDTableVan... Bestandsdatasets) ,ERDDAP™bepaalt deactual\\_rangevan elke variabele en stelt deactual\\_rangekenmerk. Met andere gegevensbronnen (bijvoorbeeld, relationele databases, Cassandra,DAPPER,Hyrax) , kan het lastig of belastend voor de bron om het bereik te berekenen, dusERDDAP™vraagt er niet om. In dit geval is het het beste als u kunt instellenactual\\_range  (speciaal voor de lengte-, breedte-, hoogte-, diepte- en tijdvariabelen) door toevoeging van eenactual\\_rangeattribuut aan elke variabele [&lt;addAttributes&gt;] (#addattributes) voor deze dataset indatasets.xml, bijvoorbeeld,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Voor numeriek[tijd- en tijdstempelvariabelen](#time-units), moeten de opgegeven waarden de relevante bron zijn (geen bestemming) numerieke waarden. Als bijvoorbeeld de brontijdwaarden worden opgeslagen als "dagen sinds 1985-01-01," danactual\\_rangemoeten worden gespecificeerd in "dagen sinds 1985-01-01." En als je NU wilt verwijzen naar NU als de tweede waarde voor bijna-real-time gegevens die periodiek wordt bijgewerkt, moet je NaN gebruiken. Bijvoorbeeld om een gegevensbereik van 1985-01-17 tot NOW te specificeren, gebruik

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Alsactual\\_rangeis bekend (ERDDAP™berekenen of door het toe te voegen via&lt;addAttributes&gt;),ERDDAP™wordt weergegeven aan de gebruiker op het Data Access Form ( *datasetID* .html) en maak een grafiek webpagina's ( *datasetID* .graph) voor die dataset en deze gebruiken bij het genereren van de FGDC en ISO 19115 metagegevens. Ook de laatste 7 dagen van de tijdactual\\_rangeworden gebruikt als de standaard tijd subset.
* Alsactual\\_rangeis bekend, kunnen gebruikers de[min () en max () functies](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)in verzoeken, die vaak zeer nuttig zijn.
* Voor alle EDDTable... datasets, indienactual\\_rangebekend (hetzij door het specificeren ervan of doorERDDAP™berekenen) ,ERDDAP™zal in staat zijn om verzoeken om gegevens buiten dat bereik snel te verwerpen. Als bijvoorbeeld de laagste tijdswaarde van de dataset overeenkomt met 1985-01-17, dan zal een verzoek om alle gegevens van 1985-01-01 tot 1985-01-16 onmiddellijk worden afgewezen met de foutmelding "Uw zoekopdracht leverde geen resultaten op." Dit maaktactual\\_rangeeen zeer belangrijk stuk metadata, zoals het kan opslaanERDDAP™veel moeite en bespaart de gebruiker veel tijd. En dit benadrukt dat deactual\\_rangewaarden mogen niet smaller zijn dan het werkelijke bereik van de gegevens; anders,ERDDAP™kan ten onrechte zeggen "Er zijn geen overeenkomstige gegevens" wanneer er in feite relevante gegevens zijn.
* Wanneer een gebruiker een subset van gegevens selecteert en een bestandstype vraagt dat metagegevens bevat (bijvoorbeeld,.nc) ,ERDDAP™Wijzigingenactual\\_rangein het responsbestand om het bereik van de subgroep weer te geven.
* Zie ook[data\\_minendata\\_max](#data_min-and-data_max), die een alternatieve manier zijn om deactual\\_range. Deze worden echter niet langer toegepast, nu datactual\\_rangewordt gedefinieerd door CF 1.7+.
         
###### Kleurenbalkattributen{#color-bar-attributes} 
Er zijn verschillende OPTIONAL variabele attributen die de voorgestelde standaard attributen voor een kleurbalk specificeren (gebruikt om gegevenswaarden om te zetten in kleuren op afbeeldingen) voor deze variabele.
* Indien aanwezig wordt deze informatie gebruikt als standaardinformatie door griddap entabledapwanneer u een afbeelding vraagt die een kleurbalk gebruikt.
* Bijvoorbeeld, wanneer breedtegraad-lengtegraad gerasterde gegevens worden uitgezet als een dekking op een kaart, de kleurbalk specificeert hoe de gegevenswaarden worden omgezet in kleuren.
* Met deze waarden maakt het mogelijkERDDAP™om afbeeldingen te maken die een consistente kleurbalk gebruiken voor verschillende verzoeken, zelfs wanneer de tijd of andere dimensiewaarden variëren.
* Deze attribuutnamen zijn gemaakt voor gebruik inERDDAP. Ze zijn niet van een metadata standaard.
* De attributen met betrekking tot de kleurbalk zijn:
    *    **colorBarMinimum** Geeft de minimale waarde op de kleurBar. Bijvoorbeeld,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Als de gegevens zijn verpakt met[scale\\_factoren/ofadd\\_offset](#scale_factor),colorBarMinimumals uitgepakte waarde.
    * Gegevenswaarden lager dancolorBarMinimumworden weergegeven door dezelfde kleur alscolorBarMinimumwaarden.
    * Het attribuut moet van[type="dubbel"](#attributetype), ongeacht het type gegevensvariabele.
    * De waarde is meestal een mooi rond getal.
    * Beste praktijken: We raden een waarde aan die iets hoger is dan de minimale datawaarde.
    * Er is geen standaardwaarde.
*    **colorBarMaximum** geeft de maximale waarde op de kleurBar. Bijvoorbeeld,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Als de gegevens zijn verpakt met[scale\\_factoren/ofadd\\_offset](#scale_factor),colorBarMinimumals uitgepakte waarde.
    * Gegevenswaarden hoger dancolorBarMaximumworden weergegeven door dezelfde kleur alscolorBarMaximumwaarden.
    * Het attribuut moet van[type="dubbel"](#attributetype), ongeacht het type gegevensvariabele.
    * De waarde is meestal een mooi rond getal.
    * Beste praktijken: We raden een waarde aan die iets lager is dan de maximale datawaarde.
    * Er is geen standaardwaarde.
*    **kleur BarPalette** geeft het palet aan voor de kleurBar. Bijvoorbeeld,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * AllesERDDAP™installaties ondersteunen deze standaard paletten: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topografie, TopografieDepth\\[toegevoegd aan v1.74\\]WhiteBlack, WhiteBlueBlack en WhiteRedBlack.
    * Als u hebt geïnstalleerd[extra paletten](/docs/server-admin/additional-information#palettes), kunt u verwijzen naar een van hen.
    * Als dit attribuut niet aanwezig is, is de standaard BlueWhiteRed als \\-1\\*colorBarMinimum=colorBarMaximum; anders is de standaard Rainbow.
*    **kleurBarScale** Geeft de schaal voor de kleurBar. Bijvoorbeeld,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Geldige waarden zijn Lineair en Log.
    * Als de waarde Log is,colorBarMinimummoet groter zijn dan 0.
    * Als dit attribuut niet aanwezig is, is de standaard Linear.
*    **kleur BarContinuous** Geeft aan of de kleurBar een continu palet van kleuren heeft, of dat de kleurBar een paar discrete kleuren heeft. Bijvoorbeeld,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Geldige waarden zijn de strings waar en onjuist.
    * Als dit attribuut niet aanwezig is, is de standaardwaarde waar.
*    **kleurBarNSecties** specificeert het standaard aantal secties op de kleurBar. Bijvoorbeeld,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Geldige waarden zijn positieve gehele getallen.
    * Als dit attribuut niet aanwezig is, is de standaard \\-1, wat zegtERDDAP™om het aantal secties te kiezen op basis van het bereik van de kleurBar.
###### WMS {#wms} 
De belangrijkste eisen voor een viaERDDAP'sWMSserver zijn:
* De dataset moet eenEDDGrid... dataset.
* De gegevensvariabele MOET een gerasterde variabele zijn.
* De gegevensvariabele MOET variabele lengte- en breedtegraden hebben. (Andere asvariabelen zijn OPTIONAL.) 
* Er moeten enkele lengtegraden zijn tussen -180 en 180.
* DecolorBarMinimumencolorBarMaximumDe eigenschappen moeten worden gespecificeerd. (Andere kleur bar attributen zijn OPTIONAL.) 

###### data\\_minendata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** en **data\\_max** ](#data_min-and-data_max)-- Dit zijn verouderde variabele attributen gedefinieerd in het World Ocean Circulation Experiment (WOCE) beschrijving van de metagegevens. Bijvoorbeeld,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Wij raden u aan om[actual\\_range](#actual_range), in plaats vandata\\_minendata\\_max, omdatactual\\_rangewordt nu gedefinieerd door de CF specificatie.
    * Indien aanwezig, moeten zij van hetzelfde gegevenstype zijn als het type bestemmingsgegevens van de variabele, en de werkelijke gegevens specificeren. (niet de theoretische of de toegestane) minimum- en maximumwaarden van de gegevens voor die variabele.
    * Als de gegevens zijn verpakt met[scale\\_factoren/ofadd\\_offset](#scale_factor),data\\_minendata\\_maxmoeten uitgepakte waarden zijn met behulp van het uitgepakte gegevenstype.
         
###### variabeledrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)-- Dit is een OPTIONAL variabele eigenschap gebruikt doorERDDAP™  (en geen metagegevensnormen) waarin de standaardwaarde voor de "Draw Land Mask" optie op de dataset's Make A Graph formulier wordt opgegeven ( *datasetID* .graph) en voor de &.land parameter in een URL die een kaart van de gegevens vraagt. Bijvoorbeeld,
    ```
        <att name="drawLandMask">under</att>  
    ```
Zie[drawLandMaskoverzicht](#drawlandmask).
###### Codering{#encoding} 
*   [ **\\_Codering** ](#encoding)
    * Deze eigenschap mag alleen worden gebruikt met String-variabelen .
    * Deze eigenschap wordt sterk aanbevolen.
    * Dit kenmerk is van de[NetCDFGebruikersgids (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    * InternERDDAP™, Strings zijn een reeks van 2 byte tekens die de[Unicode UCS-2 tekenset](https://en.wikipedia.org/wiki/UTF-16).
    * Veel bestandstypen ondersteunen alleen 1-byte tekens in Strings en hebben dus dit attribuut nodig om een geassocieerd te identificeren
        [tekenset (AKA code pagina) ](https://en.wikipedia.org/wiki/Code_page)waarin wordt bepaald hoe de 256 mogelijke waarden in kaart moeten worden gebracht tot een set van 256 tekens die zijn ontleend aan de UCS-2 tekenset en/of het coderingssysteem, bijvoorbeeld;[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (waarbij tussen 1 en 4 bytes per teken vereist zijn) .
    * Waarden voor \\_Encoding zijn hoofdletterongevoelig.
    * In theorie,ERDDAP™\\_Coding-identificaties van[deze IANA-lijst](https://www.iana.org/assignments/character-sets/character-sets.xhtml), maar in de praktijk,ERDDAP™momenteel alleen ondersteunt
        * ISO-8859-1 (Merk op dat het streepjes heeft, geen onderstrepingen) , die het voordeel heeft dat het identiek is aan de eerste 256 tekens van Unicode, en
        * UTF-8.
    * Bij het lezen van bronbestanden is de standaardwaarde ISO-8859-1, behalve voor netcdf-4 bestanden, waar de standaard is UTF-8.
    * Dit is een voortdurend probleem omdat veel bronbestanden tekensets of coderingen gebruiken die verschillen van ISO-8859-1, maar de tekenset of codering niet identificeren. Bijvoorbeeld, veel brongegevens bestanden hebben een aantal metadata gekopieerd en geplakt van Microsoft Word op Windows en dus hebben fancy koppeltekens en apostrofes van een Windows-specifieke tekenset in plaats van ASCII koppeltekens en apostrophes. Deze tekens verschijnen dan als vreemde tekens of '?' inERDDAP.
         
###### bestandAccessBaseUrl{#fileaccessbaseurl} 
*    **[bestandAccessBaseUrl](#fileaccessbaseurl)en bestandAccessSuffix** zeer zelden gebruikte attributen zijn die niet van enige standaard zijn. Als een EDDTable kolom bestandsnamen heeft van web toegankelijke bestanden (b.v. beeld-, video- of audiobestanden) , kunt u toevoegen
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
om de basis-URL te specificeren (eindigend op /) nodig om van de bestandsnamen volledige URL's te maken. In ongebruikelijke gevallen, zoals wanneer een kolom verwijzingen naar .png-bestanden heeft, maar de waarden ontbreken ".png," kunt u toevoegen
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(bijvoorbeeld,&lt;att name="fileAccessSuffix"&gt;.png&lt;/a&gt;)
om een achtervoegsel op te geven om de bestandsnamen tot volledige URL's te maken. Dan voor.htmlTableantwoorden;ERDDAP™zal de bestandsnaam tonen als een link naar de volledige URL (de basis Url plus de bestandsnaam plus het achtervoegsel) .

Als je wiltERDDAP™om de gerelateerde bestanden te dienen, maak een aparte[EDDtableFromFileNames](#eddtablefromfilenames)dataset voor die bestanden (het kan een particuliere dataset zijn) .
    
###### bestandAccessArchive Url{#fileaccessarchiveurl} 
*   [ **bestandAccessArchive Url** ](#fileaccessarchiveurl)is een zeer zelden gebruikt attribuut dat niet van een standaard is. Als een EDDTable kolom bestandsnamen heeft van web toegankelijke bestanden (b.v. beeld-, video- of audiobestanden) die toegankelijk zijn via een archief (bv..zipbestand) toegankelijk via een URL, gebruik&lt;att name="fileAccessArchiveUrl"&gt; *deURL* &lt;/att&gt; om de URL voor het archief te specificeren.
    
Als je wiltERDDAP™om het archiefbestand te dienen, maak een aparte[EDDtableFromFileNames](#eddtablefromfilenames)dataset voor dat bestand (het kan een particuliere dataset zijn) .
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)-- Dit is een vereist variabel kenmerk indien&lt;variabelenMustHaveIoosCategory&gt; is ingesteld op waar (de standaard) in[setup.xml](/docs/server-admin/deploy-install#setupxml)Anders is het OPTIONAL.
Bijvoorbeeld,&lt;att name="ioos\\_category"&gt;Zeiligheid&lt;/att&gt;
De categorieën zijn van[NOAA's Geïntegreerd Ocean Observing System (IOOS) ](https://ioos.noaa.gov/).
    
    *    (Vanaf het schrijven van dit) We zijn niet op de hoogte van formele definities van deze namen.
    * De kernnamen zijn van Zdenka Willis' .ppt "Integrated Ocean Observing System (IOOS)  NOAA"De aanpak van de bouw van een eerste operationele capaciteit" en van de[US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (1-5) .
    * Deze lijst zal waarschijnlijk in de toekomst worden herzien. Als je verzoeken hebt, stuur dan een e-mail naar Chris. John bij Noaa.gov.
    *   ERDDAP™ondersteunt een grotere lijst van categorieën dan IOOS omdat Bob Simons extra namen heeft toegevoegd (voornamelijk gebaseerd op de namen van wetenschappelijke velden, bijvoorbeeld, Biologie, Ecologie, Meteorologie, Statistiek, Taxonomie) voor andere soorten gegevens.
    * De huidige geldige waarden inERDDAP™Bathymetrie, Biologie, Bottom Character, CO2, Gekleurd Opgelost Organisch Matter, Contaminanten, Stroom, Opgelost Nutriënten, Opgelost O2, Ecologie, Vis Overvloed, Vis Soorten, Heat Flux, Hydrology, Ice Distribution, Identifier, Locatie, Meteorologie, Ocean Color, Optische Eigenschappen, Andere, Pathogens, Phytoplankton Soorten, Druk, Productiviteit, Kwaliteit, Saliniteit, Zeeniveau, Statistieken, Stream Flow, Oppervlakte Waves, Taxonomie, Temperatuur, Tijd, Total Suspended Matter, Onbekende, Wind, Zooplankton Soorten, en Zooplankton Overvloed.
    * Er is enige overlapping en dubbelzinnigheid tussen verschillende termen -- doe je best.
    * Als uioos\\_categorynaar de lijst van&lt;categoryAttributes&gt; inERDDAP's[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand, kunnen gebruikers gemakkelijk datasets met soortgelijke gegevens vinden viaERDDAP'Search for Datasets by Category' op de homepage.
        [Gebruikioos\\_categoryzoeken naar datasets van belang.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Er was[een discussie overERDDAP™enioos\\_categoryin deERDDAP™Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
U kunt geneigd zijn om&lt;variabelenMustHaveIoosCategorie&gt; naar fout, zodat dit attribuut niet nodig is. ("Pfft&#33; Wat gaat mij dat aan?") Enkele redenen om het te laten waar (de standaard) en gebruikioos\\_categoryzijn:
    
    * Als setup.xml's&lt;variabelenMustHaveIoosCategory&gt; is ingesteld op waar,[GenererenDatasetsXml](#generatedatasetsxml)altijd eenioos\\_categoryattribuut voor elke variabele in elke nieuwe dataset. Waarom laat je het er niet gewoon in?
    *   ERDDAP™laat gebruikers zoeken naar datasets van belang per categorie.ioos\\_categoryis een zeer nuttige zoekcategorie omdat de ioos\\_categorieën (bijvoorbeeld, Temperatuur) zijn vrij breed. Dit maaktioos\\_categoryveel beter voor dit doel dan, bijvoorbeeld, de veel fijnere-korrelige CFstandard\\_names (die niet zo goed zijn voor dit doel vanwege alle synoniemen en kleine variaties, bijvoorbeeld, zee\\_oppervlakte\\_temperatuur versus zee_water\\_temperatuur) .
(Gebruikioos\\_categoryvoor dit doel wordt gecontroleerd door&lt;categoryAttributes&gt; in uw setup.xml bestand.)
        [Gebruikioos\\_categoryzoeken naar datasets van belang.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Deze categorieën zijn van[NOAA's Geïntegreerd Ocean Observing System (IOOS) ](https://ioos.noaa.gov/). Deze categorieën zijn van fundamenteel belang voor IOOS's beschrijving van IOOS's missie. Als uNOAA, ondersteuningioos\\_categoryis een goed Eén.NOAADingen om te doen. (Let op.[EénNOAAvideo](https://www.youtube.com/watch?v=nBnCsMYm2yQ)En laat je inspireren.) Als u in een andere VS of internationaal agentschap, of werken met overheidsinstanties, of werken met een andere Ocean Observing System, is het niet een goed idee om samen te werken met de VS IOOS kantoor?
    * Vroeg of laat wil je misschien een andereERDDAP™naar uw datasets te koppelen via[EDDGridVanErdap](#eddfromerddap)en[EDDtabelVanErdap](#eddfromerddap). Als de andereERDDAP™vereistioos\\_category, uw datasets moeten hebbenioos\\_categoryomEDDGridVan Erddap en EDDTableVan Erddap naar werk.
    * Het is psychologisch veel gemakkelijker omioos\\_categorywanneer u de dataset aanmaakt (Het is gewoon iets anders datERDDAP™vereist het toevoegen van de dataset aanERDDAP) , dan toe te voegen na het feit (als u besloot om het in de toekomst te gebruiken) .
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)en[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatanormen) is een attribuut van de aanbevolen variabele inERDDAP. Bijvoorbeeld,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™gebruikt delong\\_namevoor het etiketteren van assen op grafieken.
    * Beste praktijken: Hoofdletteriseren de woorden in delong\\_namealsof het een titel was (kapitaliseer het eerste woord en alle niet-article woorden) . Neem de eenheden niet in delong\\_name. De lange naam zou niet erg lang moeten zijn (meestal&lt;20 tekens), maar moet beschrijvender zijn dan de[destinationName](#destinationname), dat is vaak zeer beknopt.
    * Als "long\\_name" is niet gedefinieerd in de variabele[bronKenmerken](#variable-addattributes)of&lt;addAttributes&gt;,ERDDAP™zal het genereren door het schoonmaken van de[standard\\_name](#standard_name)  (indien aanwezig) of dedestinationName.
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)en **_Vullen Waarde**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)en[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) zijn variabele attributen die een getal beschrijven (bijvoorbeeld -9999) die wordt gebruikt om een ontbrekende waarde te vertegenwoordigen. Bijvoorbeeld,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Voor tekenreeksvariabelen is de standaard voor beide "" (de lege tekenreeks) .
Voor numerieke variabelen is de standaard voor beide NaN.
*   ERDDAP™ondersteunt beidemissing\\_valueen \\_FillValue, aangezien sommige gegevensbronnen ze iets verschillende betekenissen toekennen.
* Indien aanwezig, moeten zij van hetzelfde gegevenstype zijn als de variabele.
* Als de gegevens zijn verpakt met[scale\\_factoren/ofadd\\_offset](#scale_factor), demissing\\_valueen \\_FillValue waarden moeten eveneens worden verpakt. Ook voor een kolom met tekenreeksdatum/tijdswaarden die een lokale[time\\_zone](#time_zone), demissing\\_valueen \\_FillValue waarden moeten de lokale tijdzone gebruiken.
* Als een variabele deze speciale waarden gebruikt, demissing\\_valueen/of \\_FillValue attributen zijn vereist.
* Voor[tijd- en tijdstempelvariabelen](#time-units)  (of de bron strings of numeriek is) ,missing\\_values en \\_FillValues verschijnen als "" (de lege tekenreeks) wanneer de tijd is geschreven als een tekenreeks en als NaN wanneer de tijd is geschreven als een dubbele. De bronwaarden voormissing\\_valueen \\_FillValue zal niet verschijnen in de metadata van de variabele.
* Voor tekenreeksvariabelen,ERDDAP™zet altijd elkemissing\\_values of \\_FillValue data waarden in "" (de lege tekenreeks) . De bronwaarden voormissing\\_valueen \\_FillValue zal niet verschijnen in de metadata van de variabele.
* Voor numerieke variabelen:
Demissing\\_valueen \\_FillValue verschijnt in de metadata van de variabele.
Voor sommige output data formaten,ERDDAP™zal deze speciale nummers intact laten, bijvoorbeeld -9999.
Voor andere uitvoergegevensformaten (met name tekst-achtige formaten zoals .csv en.htmlTable) ,ERDDAP™zal deze speciale nummers vervangen door NaN of "."
* Sommige data types hebben inherent ontbrekende waarde markers die niet expliciet moeten worden geïdentificeerd metmissing\\_valueof \\_FillValue attributen: float en dubbele variabelen hebben NaN (Geen nummer) , tekenreekswaarden gebruiken de lege tekenreeks, en tekens hebben karakter\\uffff  (teken #65535, wat de waarde van Unicode is voor Geen karakter) . Integer data types hebben geen inherent ontbrekende waarde markers.
* Als een integer variabele een ontbrekende waarde heeft (bijvoorbeeld een lege positie in een .csv-bestand) ,ERDDAP™zal de waarde interpreteren als de gedefinieerdemissing\\_valueof \\_FillValue voor die variabele. Als er geen is gedefinieerd,ERDDAP™zal de waarde interpreteren als de standaard ontbrekende waarde voor dat gegevenstype, dat altijd de maximale waarde is die door dat gegevenstype kan worden aangehouden:
127 voor bytevariabelen, 32767 voor kort, 2147483647 voor int, 9223372036854775807 lang,
255 voor ubyte, 65535 voor ushort, 4294967295 voor uint, en 18446744073709551615 voor along.
###### ADD \\_FillValue ATTRIBUTES?{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES?](#add-_fillvalue-attributes)  
Elke keerERDDAP™laadt een dataset, controleert het of de variabelen met integer brongegevenstypen een gedefinieerd hebbenmissing\\_valueof \\_FillValue kenmerk. Als een variabele dat niet doet, danERDDAP™drukt een bericht af naar het logbestand (beginnend met "Add \\_FillValue Attribuut?") tot aanbeveling van deERDDAP™beheerder voegt een \\_Vullen Waardeattribuut voor deze variabele indatasets.xml. Het is zeer nuttig voor elke variabele om een \\_FillValue ofmissing\\_valueomdat ontbrekende waarden altijd mogelijk zijn, bijvoorbeeld als een gegeven bestand in een dataset geen gegeven variabele heeft,ERDDAP™moet die variabele kunnen presenteren als alle ontbrekende waarden voor die variabele. Als u besluit dat een variabele geen \\_FillValue attribuut moet hebben, kunt u toevoegen
    &lt;att names="\\_FillValue"&gt;null&lt;/att&gt; in plaats daarvan, die het bericht voor dat zal onderdrukkendatasetID+ variabele combinatie in de toekomst.
    
Elke keerERDDAP™start op, het verzamelt al deze aanbevelingen in een bericht dat is geschreven naar het logbestand (beginnend met "ADD \\_FillValue ATTRIBUTES?") , gemaild naar deERDDAP™beheerder, en geschreven naar een CSV-gegevensbestand in de\\[bigParentDirectory\\]/logs/map. Als u wilt, kunt u het GenerateDatasetsXml programma gebruiken (en de optie AddFillValueAttributes) alle suggesties in het CSV-bestand op dedatasets.xmlbestand. Voor een van dedatasetID/variabele combinaties in dat bestand, als u besluit dat er geen noodzaak om toe te voegen de toegeschreven, kunt u het attribuut wijzigen naar&lt;att names="\\_FillValue"&gt;null&lt;/att&gt; om de aanbeveling daarvoor te onderdrukkendatasetID+ variabele combinatie in de toekomst.
    
Dit is belangrijk.
Zoals Bob vaak heeft gezegd: het zou slecht zijn (en gênant) als het bewijs van de opwarming van de aarde werd veroorzaakt door niet geïdentificeerde ontbrekende waarden in de gegevens (b.v. temperaturen van 99 of 127 graden\\_ C die als ontbrekende waarden had moeten worden gemarkeerd en dus de gemiddelde en/of mediane statistieken hoger had moeten schamen) .

* \\_FillValue enmissing\\_valuewaarden voor een gegeven variabele in verschillende bronbestanden moeten consistent zijn; anders,ERDDAP™accepteert bestanden met één reeks waarden en wijst alle andere bestanden af als "Bad Files." Om het probleem op te lossen,
    * Als de bestanden gerasterd zijn.ncbestanden, kunt u gebruiken[EDDGridUitNcFilesUitgepakt](#eddgridfromncfilesunpacked).
    * Als de bestanden tabelgegevensbestanden zijn, kunt u EDDTableFrom...Files gebruiken '[standaardiseren Wat?](#standardizewhat)om te vertellenERDDAPom de bronbestanden te standaardiseren zoals ze worden gelezen inERDDAP.
    * Voor moeilijkere problemen, kunt u gebruiken[NcML](#ncml-files)of[NCO](#netcdf-operators-nco)Om het probleem op te lossen.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (standaard = 1) en **add\\_offset**   (standaard = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)en[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) OPTIONALe variabele eigenschappen die gegevens beschrijven die zijn verpakt in een eenvoudiger datatype via een eenvoudige transformatie.
    * Indien aanwezig, is het gegevenstype verschillend van het type brongegevens en beschrijft het gegevenstype van de bestemmingswaarden.
Bijvoorbeeld, een gegevensbron zou kunnen hebben opgeslagen float data waarden met een decimaal cijfer verpakt als korte ints (int16) Gebruikscale\\_factor= 0,1 enadd\\_offset= 0. Bijvoorbeeld,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

In dit voorbeeld,ERDDAP™zou de gegevens uitpakken en presenteren aan de gebruiker als float data waarden.
    * Indien aanwezig,ERDDAP™zal de waarden uit deze attributen halen, de attributen verwijderen en automatisch de gegevens voor de gebruiker uitpakken:
bestemming Waarde = bron Waardescale\\_factor+add\\_offset  
Of anders gezegd:
unpackedValue = packed Waardescale\\_factor+add\\_offset
    * Descale\\_factorenadd\\_offsetwaarden voor een gegeven variabele in verschillende bronbestanden moeten consistent zijn; anders,ERDDAP™accepteert bestanden met één reeks waarden en wijst alle andere bestanden af als "Bad Files." Om het probleem op te lossen,
        * Als de bestanden gerasterd zijn.ncbestanden, kunt u gebruiken[EDDGridUitNcFilesUitgepakt](#eddgridfromncfilesunpacked).
        * Als de bestanden tabelgegevensbestanden zijn, kunt u EDDTableFrom...Files gebruiken '[standaardiseren Wat?](#standardizewhat)om te vertellenERDDAPom de bronbestanden te standaardiseren zoals ze worden gelezen inERDDAP.
        * Voor moeilijkere problemen, kunt u gebruiken[NcML](#ncml-files)of[NCO](#netcdf-operators-nco)Om het probleem op te lossen.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (van de[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadatastandaard) is een attribuut van de aanbevolen variabele inERDDAP. CF houdt de lijst van toegestane[CF-standaardnamen](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Bijvoorbeeld,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Als ustandard\\_nameaan eigenschappen van variabelen toevoegenstandard\\_namenaar de lijst van&lt;categoryAttributes&gt; inERDDAP's[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand, kunnen gebruikers gemakkelijk datasets met soortgelijke gegevens vinden viaERDDAP'Search for Datasets by Category' op de homepage.
    * Als u een CF opgeeftstandard\\_namevoor een variabele hoeft de eenheidsattribuut voor de variabele niet identiek te zijn aan de Canonical Units die gespecificeerd zijn voor de standaardnaam in de CF Standard Name tabel, maar de eenheden MOETEN convertibel zijn naar de Canonical Units. Bijvoorbeeld, alle temperatuur-gerelateerde CFstandard\\_nameS hebben "K" (Kelvin) als de Canonical Units. Dus een variabele met een temperatuur-gerelateerdstandard\\_nameMOET eenheden hebben van K, degree\\_C, degree\\_F, of een UDUnits variant van die namen, omdat ze allemaal inter-convertible zijn.
    * Beste praktijken: Deel van de macht van[gecontroleerde woordenlijsten](https://en.wikipedia.org/wiki/Controlled_vocabulary)komt van het gebruik van alleen de termen in de lijst. Dus we raden aan om ons te houden aan de termen die zijn gedefinieerd in de gecontroleerde woordenschat, en we raden aan om geen term te maken als er geen geschikte term in de lijst staat. Als je aanvullende voorwaarden nodig hebt, kijk dan of de normencommissie ze zal toevoegen aan de gecontroleerde woordenschat.
    *   standard\\_namewaarden zijn de enige CF-attribuutwaarden die hoofdlettergevoelig zijn. Het zijn altijd kleine letters. Beginnen metERDDAP™v1.82, GenerateDatasets zal hoofdletters omzetten naar kleine letters. En wanneer een dataset geladen isERDDAP, hoofdletters worden stil in kleine letters veranderd.
         
###### time\\_precision {#time_precision} 
*   time\\_precisionis een OPTIONAL attribuut gebruikt doorERDDAP™  (en geen metagegevensnormen) voor[tijd- en tijdstempelvariabelen](#time-units), die in gerasterde datasets of tabeldatasets kunnen worden opgenomen, en inaxisVariables ofdataVariables. Bijvoorbeeld,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisiongeeft aan welke precisie gebruikt moet worden wanneerERDDAP™formatteer de tijdwaarden van die variabele als strings op webpagina's, inclusief.htmlTablereacties. In bestandsformaten waarERDDAP™formatteer tijden als tekenreeksen (bijvoorbeeld .csv en.json) ,ERDDAP™gebruikt alleen detime\\_precision- gespecificeerd formaat indien het fractionele seconden bevat; anders,ERDDAP™gebruikt de 1970-01-01T00:00:00 Z-formaat.
* Geldige waarden zijn 1970-01, 1970-01-01, 1970-01T00Z, 1970-01-01T00:00Z, 1970-01-01T00:00:00Z (de standaard) , 1970-01-01T00:00:00.0Z, 1970-01-01T00:00:00,00Z, 1970-01-01T00:00:00.000Z.\\[1970 is geen optie omdat het een enkel getal is, dusERDDAP™kan niet weten of het een geformatteerde tijdreeks is (een jaar) of als het een aantal seconden sinds 1970-01-01T00:00:00Z.\\]
* Alstime\\_precisionis niet gespecificeerd of de waarde is niet aangepast, de standaard waarde zal worden gebruikt.
* Hier, zoals in andere delen vanERDDAP™, worden alle velden van de geformatteerde tijd die niet worden weergegeven verondersteld de minimale waarde te hebben. Bijvoorbeeld, 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z, en 1985-07-01T00:00:00 Z worden allemaal beschouwd als gelijkwaardig, hoewel met verschillende niveaus van precisie impliciet. Dit komt overeen met de[ISO 8601:2004"extended"Specificatie tijdformaat](https://www.iso.org/iso/date_and_time_format).
*    **WAARSCHUWING:** U dient slechts een beperkttime\\_precisionals **alle** van de gegevenswaarden voor de variabele hebben alleen de minimumwaarde voor alle velden die verborgen zijn.
    * U kunt bijvoorbeeld eentime\\_precisionvan 1970-01-01 als alle gegevenswaarden uur=0, minuut=0 en seconde=0 hebben (bijvoorbeeld 2005-03-04T00:00:00Z en 2005-03-05T00:00:00Z) .
    * Gebruik bijvoorbeeld geentime\\_precisionvan 1970-01-01 indien er waarden van niet-0 uur, minuut of seconden zijn, (bijvoorbeeld 2005-03-05T12:00:00Z) omdat de niet-standaard uurwaarde niet zou worden weergegeven. Anders, als een gebruiker vraagt om alle gegevens met de tijd=2005-03-05, zal het verzoek onverwacht mislukken.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneis een OPTIONAL attribuut gebruikt doorERDDAP™  (en geen metagegevensnormen) voor[tijd- en tijdstempelvariabelen](#time-units), die in gerasterde datasets of tabeldatasets kunnen zitten.
    * De standaard is "Zulu" (dat is de moderne tijdzone versie van GMT) .
    * Achtergrondinformatie: "tijdscompensaties" (bv., Pacific Standard Time, -08:00, GMT-8) zijn vaste, specifieke, offsets ten opzichte vanZulu  (GMT) . In tegenstelling, "tijdzones" zijn de veel complexer dingen die worden beïnvloed door daglicht redden (b.v. "US/Pacific") , die verschillende regels op verschillende plaatsen op verschillende tijden hebben gehad. De tijdzones hebben altijd namen omdat ze niet kunnen worden samengevat door een eenvoudige offset waarde (zie de kolom "TZ database names" in de tabel op[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .ERDDAP'stime\\_zoneattribuut helpt u omgaan met lokale tijdgegevens uit een bepaalde tijdzone (bv. 1987-03-25T17:32:05 Pacific Tijd) . Als u string of numerieke tijd gegevens met een (vast) tijd offset, moet u gewoon de gegevens aan te passenZulu  (en dat is watERDDAP™wil) door een andere basistijd in het eenheidsattribuut te specificeren (b.v., "uren sinds 1970-01-01T08:00:00Z," let op de T08 om de tijdcompensatie te specificeren) , en controleer altijd de resultaten om ervoor te zorgen dat u de resultaten die u wilt.
    * Voor tijdstempelvariabelen met brongegevens van Strings, dit attribuut kunt u een tijdzone die leidt specificerenERDDAP™om de lokale-tijd-zone brontijden te converteren (sommige in Standaard tijd, sommige in Daglicht Besparen tijd) inZulutijden (die altijd in Standaardtijd zijn) . De lijst met geldige tijdzonenamen is waarschijnlijk identiek aan de lijst in de TZ kolom op[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Gemeenschappelijke Amerikaanse tijdzones zijn: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/East.
    * Voor tijdstempelvariabelen met numerieke brongegevens kunt u de "time\\_zone" attribuut, maar de waarde moet "Zulu"of "UTC." Als je ondersteuning nodig hebt voor andere tijdzones, stuur dan een e-mail naar Chris. John at noaa.gov .
         
###### eenheden{#units} 
*   [ **eenheden** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)en[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatastandaard) definieert de eenheden van de gegevenswaarden. Bijvoorbeeld,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "eenheden" is vereist als een bronAttribuut of een addAttribuut voor"time"Variables and is STRONGLY REcommendated for other variables where appropriate (Dat is bijna altijd) .
    * In het algemeen, raden wij[UD-eenheden](https://www.unidata.ucar.edu/software/udunits/)\\-compatibele eenheden die door de[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)en[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)normen.
    * Een andere gemeenschappelijke norm is[UCUM](https://unitsofmeasure.org/ucum.html)-- de Unified Code voor meeteenheden.[OGC](https://www.ogc.org/)diensten zoals[SOS](https://www.ogc.org/standards/sos),[WCS](https://www.ogc.org/standards/wcs)en[WMS](https://www.ogc.org/standards/wms)vereisen UCUM en vaak verwijzen naar UCUM als UOM (Maatregeleenheden) .
    * Wij raden u aan één eenheid standaard te gebruiken voor alle datasets in uwERDDAP. Je moet het vertellen.ERDDAP™welke standaard u gebruikt met&lt;eenheden\\_standaard&gt;, in uw[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand.
    * De eenheden voor een gegeven variabele in verschillende bronbestanden moeten consistent zijn. Als je een verzameling van gegevensbestanden hebt waar een deel van de bestanden verschillende eenhedenwaarden gebruikt dan een of meer andere subgroepen van de bestanden (bijvoorbeeld:
"dagen sinds 1985-01-01" versus "dagen sinds 2000-01-01,"
"grade\\_Celsius" versus "deg\\_C," of
"knots" versus "m/s") moet je een manier vinden om de eenhedenwaarden te standaardiseren, anders,ERDDAP™zal slechts één deel van de bestanden laden. Denk er eens over na: als het ene bestand windSpeed units=knopen heeft en het andere windSpeed units=m/s heeft, dan moeten de waarden van de twee bestanden niet in dezelfde geaggregeerde dataset worden opgenomen.
        * Als de bestanden gerasterd zijn.ncbestanden, in veel situaties kunt u gebruiken[EDDGridUitNcFilesUitgepakt](#eddgridfromncfilesunpacked).
        * Als de bestanden tabelgegevensbestanden zijn, kunt u in veel situaties EDDTableFrom...Files gebruiken '[standaardiseren Wat?](#standardizewhat)om te vertellenERDDAPom de bronbestanden te standaardiseren zoals ze worden gelezen inERDDAP.
        * Voor moeilijkere problemen, kunt u gebruiken[NcML](#ncml-files)of[NCO](#netcdf-operators-nco)Om het probleem op te lossen.
    * De CF standaard sectie 8.1 zegt dat als een variabele gegevens is verpakt via[scale\\_factoren/ofadd\\_offset](#scale_factor), "De eenheden van een variabele moeten representatief zijn voor de niet-verpakte gegevens."
    *   [Voor tijd- en tijdstempelvariabelen,](#time-units)hetzij de variabele[bronKenmerken](#variable-addattributes)of&lt;addAttributes&gt; (die voorrang heeft) Moet[eenheden](#units)dat ofwel
        
        * Voor tijdasvariabelen of tijdgegevensvariabelen met numerieke gegevens:[UD-eenheden](https://www.unidata.ucar.edu/software/udunits/)\\-compatibele tekenreeks (met het formaat *eenheden* sinds *baseTime* ) beschrijving van de interpretatie van brontijdwaarden (bijvoorbeeld, seconden sinds 1970-01-01T00:00:00Z) .
            
         *eenheden* kan elk zijn van:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Technisch gezien,ERDDAP™volgt NIET deUDUNITSstandaard bij het converteren"years since"en"months since"tijdwaarden tot"seconds since". DeUDUNITSstandaard definieert een jaar als een vaste, enkele waarde: 3.15569259747e7 seconden. EnUDUNITSdefinieert een maand als jaar/12. Helaas, de meeste/alle datasets die we hebben gezien dat gebruik"years since"of"months since"duidelijk van plan zijn de waarden te zijn kalenderjaren of kalendermaanden. Bijvoorbeeld, 3"months since 1970-01-01"gewoonlijk bedoeld is om 1970-04-01 te betekenen. Dus,ERDDAP™interpretaties"years since"en"months since"als kalenderjaren en maanden, en niet strikt volgt deUDUNITSStandaard.
            
De *baseTime* moet een ISO 8601:2004 zijn (E) geformatteerde datum-tijdreeks (yyyy-MM-dd'T'HH:mm:ssZ, bijvoorbeeld, 1970-01-01T00:00:00Z) , of enige variatie daarvan (bijvoorbeeld, met ontbrekende onderdelen aan het einde) .ERDDAP™probeert te werken met een breed scala van variaties van dat ideale formaat, bijvoorbeeld, "1970-1-1 0:0:0" wordt ondersteund. Indien de tijdzone-informatie ontbreekt, wordt aangenomen dat de tijdzoneZulutijdzone (AKA GMT) . Zelfs als er een andere tijdsverschuiving is gespecificeerd,ERDDAP™Gebruikt nooit Daylight Saving Time. Als de baseTime een ander formaat gebruikt, moet u&lt;addAttributes&gt; een nieuwe eenheid string specificeren die een variatie van ISO 8601:2004 gebruikt (E) formaat (bv. dagen sinds 1 januari 1985 veranderen in dagen sinds 1985-01-01.
        
U kunt testenERDDAP's vermogen om te gaan met een specifieke *eenheden* sinds *baseTime* metERDDAP's[Tijdomvormer](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). Hopelijk kun je een nummer aansluiten (de eerste tijdwaarde van de gegevensbron?) en een eenheid string, klik op Converteren, enERDDAP™zal het kunnen omzetten in een ISO 8601:2004 (E) Geformatteerde datum tijd string. De converter geeft een foutmelding terug als de eenheid string niet herkenbaar is.

###### Tekenreekstijdeenheden{#string-time-units} 
*   [Voor de eenhedenattribuut voor tijd- of tijdstempelgegevensvariabelen met stringgegevens,](#string-time-units)u moet een[java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)patroon (die meestal compatibel is met java.text. SimpleDateFormat) die beschrijft hoe de tekenreekstijden te interpreteren.
    
Voor de veelgebruikte tijdformaten die variaties zijn van ISO 8601:2004 (E) standaardformaat (bijvoorbeeld, 2018-01-02T00:00:00Z) , kunt u variaties vanyyyy-MM-dd'T'HH:mm:ssZ, bijvoorbeeld gebruikenyyyy-MM-ddals de tekenreekstijd alleen een datum heeft. Voor elk formaat dat begint met jjjj-M,ERDDAPgebruikt een speciale parser die zeer vergevingsgezind is voor kleine variaties in het formaat. De parser kan tijdzones hanteren in het formaat "Z," "UTC," "GMT," ±XX:XX, ±XXXX en ±XX. Indien delen van de datumtijd niet zijn gespecificeerd (bijvoorbeeld, minuten en seconden) ,ERDDAP™neemt de laagste waarde voor dat veld over (b.v., als seconden niet gespecificeerd zijn, wordt seconden=0 verondersteld) .
    
Voor alle andere tekenreeks tijdformaten, moet u precies een DateTimeFormatter-compatibele tijdformaat string specificeren. Zoalsyyyy-MM-dd'T'HH:mm:ssZ, deze format strings zijn opgebouwd uit tekens die een specifiek type informatie van de tijd string identificeren, bijvoorbeeld, m betekent minuut-van-uur. Als je het formaatteken een aantal keren herhaalt, verfijnt het de betekenis verder, bijvoorbeeld m betekent dat de waarde kan worden opgegeven door een willekeurig aantal cijfers, mm betekent dat de waarde moet worden opgegeven door 2 cijfers. DeJavadocumentatie voor DateTimeFormatter is een grof overzicht en maakt deze details niet duidelijk. Dus hier is een lijst van format karakter variaties en hun betekenis binnenERDDAP™  (die soms iets anders is danJava's DatumtijdFormatter) :
    
    |Tekens|Voorbeelden|Betekenis|
    |---|---|---|
    |U, Y, Y|\\-4712, 0, 1, 10, 100, 2018|een jaarnummer, elk aantal cijfers.ERDDAP™behandelt y (erajaar) en Y (week-gebaseerd-jaar, omdat dit vaak per ongeluk wordt gebruikt in plaats van y) u, de[astronomisch jaarnummer](https://en.wikipedia.org/wiki/Astronomical_year_numbering). Astronomische jaren zijn positieve of negatieve gehele getallen die de BCE niet gebruiken (BC) of CE (AD) era designers: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ...|
    |uuuu, jjjj, JJJJ|\\-4712, 0000, 0001, 0010, 0100, 2018|a 4-cijferig astronomisch jaarnummer (geen voorgaande '-' negeren)  |
    |G|1, 01, 12|een maandnummer, elk aantal cijfers (1=januari)  |
    |MM|01, 12|a 2 cijfer (nul gevoerde) maandnummer|
    |MMM|Jan, Jan, JAN|een 3 letter Engelse maand naam, hoofdletter ongevoelig|
    |MMMM|Jan, jan, JAN, Januari, januari, JANUARI|een 3 letter of volledige Engelse maand naam, hoofdletter ongevoelig|
    |d|1, 01, 31|een dag-van-maand-nummer, elk aantal cijfers|
    |dd|01, 31|a 2 cijfer (nul gevoerde) Dag-van-maand. Het eerste cijfer kan een spatie zijn.|
    |D|1, 001, 366|Dag-van-jaar, elk aantal cijfers, 001=Jan 1|
    |DDD|001, 366|Dag van het jaar, 3 cijfers, 001=Jan 1|
    |EEE|Thu, THU, Thu.|een 3 letter dag-van-week, waarde wordt genegeerd bij het ontleden|
    |AEEA|thu, THU, Do, donderdag, donderdag, donderdag, donderdag|een 3 letter of volledige Engelse dag-van-week, hoofdletter ongevoelig, waarde wordt genegeerd bij het ontleden|
    |H|0, 00, 23|H uur van de dag (0-23) , elk aantal cijfers|
    |HH|00, 23|HH uur van de dag (00-23) Twee cijfers. Het eerste cijfer kan een spatie zijn.|
    |a|am, AM, PM, PM|AM of PM, hoofdletterongevoelig|
    |h|12, 1, 01, 11|klok-uur-van-am-pm (12, 1, 2, ... 11) , elk aantal cijfers|
    |hh|12, 01, 11|klok-uur-van-am-pm (12, 1, 2, ... 11) Twee cijfers. Het eerste cijfer kan een spatie zijn.|
    |K|0, 1, 11|uur-van-am-pm (0, 1, ...11) , elk aantal cijfers|
    |KK|00, 01, 11|uur-van-am-pm, 2 cijfers|
    |m|0, 00, 59|minuut-van-uur, elk aantal cijfers|
    |mm|00, 59|minuten per uur, 2 cijfers|
    |s|0, 00, 59|tweede minuut, elk aantal cijfers|
    |ss|00, 59|tweede minuut, 2 cijfers|
    |S|0, 000, 9, 999|fractie-van-seconde, alsof na een decimaal, elk aantal cijfers|
    |SS|00, 99|100ste van een seconde, 2 cijfers|
    |SSS|000, 999|duizenden van een seconde, 3 cijfers|
    |A|0, 0000, 86399999|millisecond-of-day, elk aantal cijfers|
    |AAAAAAAA|00000000, 86399999|millisecond-of-day, 8 cijfers|
    |N|0, 00000000000000, 86399999999999|nanosecond-of-day, elk aantal cijfers. InERDDAP™Dit is afgekapt naar NMillis.|
    |NNNNNNNNNNNNNN|00000000000000, 86399999999999|nanosecond-of-day, 14 cijfers. InERDDAP™Dit is afgekapt naar NMillis.|
    |n|0, 00000000000, 59999999999|nanoseconde, elk aantal cijfers. InERDDAP™Dit is afgekapt naar NMillis.|
    |Nnnnnnnnn|00000000000, 59999999999|nanoseconde, 11 cijfers. InERDDAP™Dit is afgekapt naar NMillis.|
    |XXX, ZZZ|Z, -08:00, +01:00|een tijdzone met het formaat "Z" of ± (2 digit uur offset) : (2 cijfer minuut offset) . Dit trakteert *spatie* als + (niet-standaard) . ZZZ die 'Z' ondersteunt is niet standaard, maar gaat over een veel voorkomende gebruikersfout.|
    |XX, ZZ|Z -800, +0100|een tijdzone met het formaat "Z" of ± (2 digit uur offset) : (2 cijfer minuut offset) . Dit trakteert *spatie* als + (niet-standaard) . ZZ ondersteunend 'Z' is niet standaard maar behandelt een veel voorkomende gebruikersfout.|
    |X, Z|Z, -08, +01|een tijdzone met het formaat "Z" of ± (2 digit uur offset) : (2 cijfer minuut offset) . Dit trakteert *spatie* als + (niet-standaard) . Z die 'Z' ondersteunt is niet standaard, maar behandelt een veel voorkomende gebruikersfout.|
    |xxx|\\-08:00, +01:00|een tijdzone met het formaat ± (2 digit uur offset) : (2 cijfer minuut offset) . Dit trakteert *spatie* als + (niet-standaard) .|
    |xx|\\-0800, +0100|een tijdzone met het formaat ± (2 digit uur offset)  (2 cijfer minuut offset) . Dit trakteert *spatie* als + (niet-standaard) .|
    |x|\\-08, +01|een tijdzone met het formaat ± (2 digit uur offset) . Dit trakteert *spatie* als + (niet-standaard) .|
    |'|"T," "Z," "GMT"|begin en einde van een serie letterlijke tekens|
    |' ' (twee enkele citaten)  |' '|twee enkele aanhalingstekens duiden op een letterlijke enkele aanhalingsteken|
    | \\[\\] | \\[ \\] |de start ("\\[") en eindigen ("\\]") van een facultatief gedeelte. Deze notatie wordt alleen ondersteund voor letterlijke tekens en aan het einde van de tekenreeks.|
    |#, &#123;, &#125;|#, &#123;, &#125;|gereserveerd voor toekomstig gebruik|
    |G,L,Q,e,c,V,z,O,p|     |Deze opmaak tekens worden ondersteund doorJava's DateTimeFormatter, maar momenteel niet ondersteund doorERDDAP. Als je ondersteuning voor hen nodig hebt, email Chris. John at noaa.gov .|
    
Opmerkingen:
    
    * In een datumtijd met interpunctie kunnen numerieke waarden een variabel aantal cijfers hebben (b.v. in het Amerikaanse slashdatumformaat "1/2/1985" mogen de maand en de datum 1 of 2 cijfers zijn) Het formaat moet dus 1-lettertekens gebruiken, bijvoorbeeld M/d/jjjj, die elk aantal cijfers voor maand en datum accepteren.
    * Indien het aantal cijfers voor een item constant is, bv. 01/02/1985, geef dan het aantal cijfers in het formaat aan, bv. MM/dd/jjjj voor tweecijferige maand, tweecijferige datum en viercijferig jaar.
    * Deze formaten zijn lastig om mee te werken. Een gegeven formaat kan werken voor de meeste, maar niet alle, tijdreeksen voor een bepaalde variabele. Controleer altijd of het formaat dat u opgeeft werkt zoals verwacht inERDDAPvoor alle tijdreeksen van een variabele.
    * Indien mogelijk, GenererenDatasetXml zal tijd formaat strings voorstellen.
    * Als je hulp nodig hebt bij het genereren van een format string, stuur dan een e-mail naar Chris. John at noaa.gov .

De belangrijkste tijdgegevensvariabele (voor tabeldatasets) en de belangrijkste tijdasvariabele (voor gerasterde datasets) worden erkend door de[destinationName](#destinationname)Tijd. Hun eenheden metadata moeten een UDEenheden-compatibele eenheid zijn voor numerieke tijdwaarden, bijvoorbeeld "dagen sinds 1970-01-01" (voor tabel- of gerasterde datasets) , of[eenheden geschikt voor tekenreekstijden](#string-time-units), bv. "M/d/jjjj" (voor tabeldatasets) .

Verschillende tijdseenheden in verschillend raster.ncBestanden - Als u een verzameling van gridded.ncbestanden waar, voor de tijdvariabele, een deelverzameling van de bestanden verschillende tijdeenheden gebruikt dan een of meer andere deelgroepen van de bestanden, kunt u gebruiken[EDDGridUitNcFilesUitgepakt](#eddgridfromncfilesunpacked). Het zet tijd waarden in"seconds since 1970-01-01T00:00:00Z"op een lager niveau, waardoor je de verschillen verbergt, zodat je één dataset kunt maken uit de verzameling van heterogene bestanden.

###### TimeStamp-variabelen{#timestamp-variables} 
[TimeStamp-variabelen](#timestamp-variables)-- Andere variabelen (axisVariableofdataVariable, in eenEDDGridof EDDTable dataset) kan een timeStamp variabele zijn. Tijdstempel variabelen zijn variabelen die tijd-gerelateerde eenheden en tijd gegevens, maar hebben een&lt;destinationName&gt; andere dan de tijd. TimeStamp variabelen gedragen zich als de belangrijkste tijd variabele in dat ze omzetten de bron tijd formaat in"seconds since 1970-01-01T00:00:00Z"en/of ISO 8601:2004 (E) formaat).ERDDAP™herkent tijd Stamp variabelen door hun tijd-gerelateerde "[eenheden](#units)" metagegevens, die moeten overeenkomen met deze reguliere uitdrukking "\\[a-zA-Z\\]+ +sinds +\\[0-9\\]+" (voor numerieke datum Tijden, bijvoorbeeld,"seconds since 1970-01-01T00:00:00Z") of een datum zijn Tekst op tijdformaat die "uuuu," "jjjj" of "JJJJ" bevat (bijvoorbeeld "yyyy-MM-dd'T'HH:mm:ssZ') . Maar gebruik nog steeds dedestinationName "time"voor de hoofddatum Tijdsvariabele.

 **Controleer altijd uw werk om er zeker van te zijn dat de tijd gegevens die verschijnt inERDDAP™de juiste tijdgegevens zijn.** Werken met tijdgegevens is altijd lastig en foutgevoelig.

Zie[meer informatie over tijdvariabelen](#destinationname).
ERDDAP™heeft een hulpprogramma om[Een numeriek omzetten Tijd van/naar een tekenreekstijd](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
Zie[HoeERDDAP™Omgaan met tijd](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** , of **valid\\_min** en **valid\\_max** ](#valid_range)-- Dit zijn OPTIONAL variabele eigenschappen gedefinieerd in de[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadataconventies. Bijvoorbeeld,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

of

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Indien aanwezig moeten zij van hetzelfde gegevenstype zijn als de variabele en de geldige minimum- en maximumwaarden van de gegevens voor die variabele specificeren. Gebruikers moeten waarden buiten dit bereik als ongeldig beschouwen.
    *   ERDDAP™niet van toepassingvalid\\_range. Zei een andere manier:ERDDAP™converteert geen gegevenswaarden buiten devalid\\_rangenaar de \\_Vullen Waarde ofmissing\\_value.ERDDAP™Geef gewoon deze metadata door en laat de toepassing aan u over.
Waarom? Daar is deze metadata voor. Als de dataprovider dat had gewild, had de dataprovider de gegevenswaarden buiten devalid\\_range\\_FillValues zijn.ERDDAP™raadt de dataprovider niet. Deze aanpak is veiliger: als later wordt aangetoond dat devalid\\_rangete nauw of anderszins onjuist was,ERDDAP™De gegevens zijn niet gewist.
    * Als de gegevens zijn verpakt met[scale\\_factoren/ofadd\\_offset](#scale_factor),valid\\_range,valid\\_minenvalid\\_maxmoet het verpakte gegevenstype en -waarden zijn. SindsERDDAP™van toepassingscale\\_factorenadd\\_offsetwanneer het de dataset laadt,ERDDAP™zal devalid\\_range,valid\\_minenvalid\\_maxwaarden zodat de bestemmingsmetadata (getoond aan gebruikers) zal het uitgepakte gegevenstype en -bereik aangeven.
Of, als een uitgepakte\\_valid\\_rangeattribuut is aanwezig, het zal hernoemd wordenvalid\\_rangewanneerERDDAP™laadt de dataset.
##### &lt;verwijderenMVRows&gt;{#removemvrows} 
* [ ** &lt;removeMVRows&gt; ** ] (#removemvrows) is een OPTIONAL tag binnen een tag indatasets.xmlvoor EDDTableFromFiles (inclusief alle subklassen) datasets, hoewel het alleen wordt gebruikt voor EDDTableFromMultidimNcFiles. Het kan een waarde hebben van waar of onwaar. Bijvoorbeeld, waar
Dit verwijdert elk blok van rijen aan het einde van een groep waar alle waarden zijnmissing\\_value, \\_FillValue, of de CoHort ...Array native ontbrekende waarde (of char=#32 voor CharArrays) . Dit is voor het CF DSG Multidimensionale Array bestandstype en soortgelijke bestanden. Indien waar, doet dit de juiste test en laadt dus altijd alle max dim variabelen, dus het kan extra tijd kosten.
De standaard waarde van is onjuist.
Aanbeveling -- Indien mogelijk voor uw dataset, raden wij het instellen van removeMVRows aan vals. Het instellen van removeMVRows waar kan aanzienlijk vertragen verzoeken, maar kan nodig zijn voor sommige datasets.
