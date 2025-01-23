---
title: "EDDTableFromEML" 
---
# EDDTableFromEML and EDDTableFromEMLBatch Opties in GenererenDatasets Xml

\\[Deze webpagina zal alleen interessant zijn voorERDDAP™beheerders die met EML-bestanden werken.
Dit document is oorspronkelijk gemaakt in 2016. Het werd voor het laatst bewerkt op 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)is een dataserver die gebruikers een eenvoudige, consistente manier geeft om subsets van gerasterde en tabeller wetenschappelijke datasets in gemeenschappelijke bestandsformaten te downloaden en grafieken en kaarten te maken.ERDDAP™werkt met een gegeven dataset als een groep van multidimensionale gerasterde variabelen (bv. satelliet- of modelgegevens) of als database-achtige tabel (met een kolom voor elk type informatie en een rij voor elke waarneming) .ERDDAP™is Vrije en Open Bron Software, zodat iedereen[downloaden en installerenERDDAP™](/docs/server-admin/deploy-install)om hun gegevens te dienen.

Een dataset toevoegen aan eenERDDAP™installatie, deERDDAP™beheerder moet een brok XML toevoegen die de dataset beschrijft aan een bestand genaamddatasets.xml. (Die is er.[grondige documentatie voordatasets.xml](/docs/server-admin/datasets).) Hoewel het mogelijk is om de brok XML te genereren voordatasets.xmlgeheel met de hand,ERDDAP™wordt geleverd met een hulpmiddel genaamd[ **GenererenDatasetsXml** ](/docs/server-admin/datasets#tools)die de ruwe versie van de brok XML die nodig is voor een gegeven dataset kan genereren op basis van een bron van informatie over de dataset.

Het eerste ding GenererenDatasets Xml vraagt welk type dataset u wilt maken. GenererenDatasets Xml heeft een speciale optie, **EDDTableFromEML** , die de informatie in een[Ecologische metadatataal (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML-bestand om de brok XML te genereren voordatasets.xmlom een[EDDtabelVanAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)dataset van elke gegevenstabel in een EML-bestand. Dit werkt zeer goed voor de meeste EML-bestanden, vooral omdat EML-bestanden een uitstekende taak van het opslaan van alle benodigde metadata voor een dataset in een eenvoudig te werken-met-formaat. De informatie die GenererenDatasetsXml nodig heeft om de datasets te maken is in het EML-bestand, inclusief de URL voor het gegevensbestand, die GenererenDatasetsXml downloads, parses, en vergelijkt met de beschrijving in het EML-bestand. (Veel groepen zouden er goed aan doen om over te schakelen op EML, dat is een geweldig systeem voor het documenteren van een tabeller wetenschappelijke dataset, niet alleen ecologische gegevens. En veel groepen die XML schema's maken zouden er goed aan doen om EML te gebruiken als een case studie voor XML schema die duidelijk zijn, tot op het punt, niet overdreven diep (d.w.z. te veel niveaus) , en gemakkelijk voor mensen en computers om mee te werken.) 

## Vragen{#questions} 

Hier zijn alle vragen GenererenDatasets Xml zal vragen, met opmerkingen over hoe u moet antwoorden als u slechts een EML-bestand of een batch van EML-bestanden wilt verwerken:

* Welke EDDType?
Als u slechts één bestand wilt verwerken, antwoord: EDDTableFromEML
Als u een groep bestanden wilt verwerken, antwoord dan: EDDTableFromEMLBatch
* Map om bestanden op te slaan?
Voer de naam in van de map die zal worden gebruikt om gedownloade EML- en/of gegevensbestanden op te slaan.
Als de map niet bestaat, wordt deze aangemaakt.
*    (Voor EDDTableFromEML alleen) EML URL of lokaal bestandNaam?
Voer de URL of lokale bestandsnaam van een EML-bestand in.
*    (Alleen voor EDDTableFromEMLBatch) EML dir (URL-adres of lokaal) ?
Geef de naam van de map met de EML-bestanden (een URL of een lokale map) .
Bijvoorbeeld: http://sbc.lternet.edu/data/eml/files/
 
*    (Alleen voor EDDTableFromEMLBatch) Bestandsnaam regex?
Voer de reguliere expressie in die zal worden gebruikt om de gewenste EML-bestanden in de EML-directory te identificeren.
Bijvoorbeeld: knb-lter-sbc\\.\\d+
* Lokale bestanden gebruiken indien aanwezig (waar|onwaar) ?
Voer waar in om de bestaande lokale EML-bestanden en gegevensbestanden te gebruiken, als ze bestaan.
Voer onwaar in om de EML-bestanden en/of gegevensbestanden altijd opnieuw te downloaden.
* toegankelijk Aan?
Als u wilt dat de nieuwe datasets privé datasets zijn inERDDAP, geef de naam van de groep (s) die toegang zal worden toegestaan.
Aanbevolen voor LTER-groepen: combineer "lter" plus de groep, bijvoorbeeld, lter Sbc .
Als je "null" invoert, zal er geen&lt;toegankelijk To&gt; tag in de uitvoer.
Zie[toegankelijk Aan](/docs/server-admin/datasets#accessibleto).
* lokaal Tijdzone (bv. VS/Pacific) ?
Als een tijdvariabele aangeeft dat het lokale tijdwaarden heeft, wordt deze tijdzone toegewezen.
Dit moet een waarde zijn van[TZ kolomlijst van tijdzonenamen](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Let op alle makkelijk te gebruiken "US/..." namen aan het einde van de lijst.
Als u later vindt dat dat onjuist is, kunt u detime\\_zonein het brok vandatasets.xml.

EML plusERDDAP™is een geweldige combinatie, omdatERDDAP™kan gebruikers meer directe toegang tot de rijkdom van[Kennisnetwerk voor biocomplexiteit (KNB) ](https://knb.ecoinformatics.org/)en[Ecologisch onderzoek op lange termijn (LTER) ](https://lternet.edu/)gegevens en helpen die projecten voldoen aan de Amerikaanse overheid[Toegang van het publiek tot onderzoeksresultaten (PARR) vereisten](https://nosc.noaa.gov/EDMC/PD.DSP.php)door de gegevens beschikbaar te stellen via een webservice. Ook EML plusERDDAP™lijkt me een geweldige brug tussen wetenschappers in het academische / NSF-gefinancierde rijk en wetenschappers in het federale agentschap (NOAA, NASA, USGS) Rijk.

Zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
 
## Ontwerpdetails{#design-details} 

Hier zijn de design details van de EDDTableFromEML optie in GenerateDatasetsXml.
Sommige zijn gerelateerd aan verschillen in hoe EML enERDDAP™dingen doen en hoe GenererenDatasets Xml behandelt deze problemen.

### Eén datatabel wordt éénERDDAP™Dataset{#one-datatable-becomes-one-erddap-dataset} 
Eén EML-bestand kan meerdere bestanden hebben&lt;gegevens Tabel &gt;s.ERDDAP™maakt er eenERDDAP™dataset per EML-gegevenstabel. DedatasetIDvoor de dataset:
 *EMLName* \\_t *tabelAantal*   (wanneer EMLname tekst is) of
 *systeem\\_EMLNaam* \\_t *tabelAantal*   (wanneer EMLname een getal is) .
Bijvoorbeeld, tabel #1 in het bestand knb-lter-sbc.28 wordtERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML versus CF+ACDD{#eml-versus-cfacdd} 
Bijna alle metadata in de EML-bestanden krijgt inERDDAP, maar in een ander formaat.ERDDAP™gebruikt de[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)en[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadatanormen. Het zijn complementaire metadatasystemen die sleutel=waardeparen gebruiken voor globale metadata en voor de metagegevens van elke variabele.
Ja, de EML weergave van de metadata is mooier dan de CF+ACDD weergave. Ik stel niet voor de CF+ACDD vertegenwoordiging te gebruiken als vervanging voor de EML. Zie CF+ACDD als onderdeel van de brug van de EML wereld naar deOPeNDAPCF/ACDD wereld.
     
### Kleine wijzigingen{#small-changes} 
ERDDAP™maakt veel kleine veranderingen. Bijvoorbeeld,ERDDAP™gebruikt de EML niet-DOIalternatief Identificatie plus een gegevenstabelnummer als deERDDAP™ datasetID, maar lichtjes verandert afwisselend Identifier om het een geldige variabelenaam te maken in de meeste computertalen, bijvoorbeeld knb-lter-sbc.33 gegevens Tabel #1 wordt knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook{#docbook} 
EML gebruikt DocBook's markup systeem om structuur te bieden aan blokken tekst in EML-bestanden. CF en ACDD vereisen dat metagegevens gewone tekst zijn. Dus GenererenDatasets Xml zet de gemarkeerde tekst om in platte tekst die eruit ziet als de geformatteerde versie van de tekst. De inline tags zijn gesaneerd met vierkante haakjes, bijvoorbeeld,\\[benadrukt\\], en links in de platte tekst.
     
### Gegevensbestanden{#data-files} 
Aangezien de EML dataTable bevat de URL van het werkelijke gegevensbestand, GenerateDatasets Xml zal:
1. Download het gegevensbestand.
2. Bewaar het in dezelfde map als het EML-bestand.
3. Lees de data.
4. Vergelijk de beschrijving van de gegevens in de EML met de werkelijke gegevens in het bestand.
5. Als GenererenDatasets Xml vindt verschillen, behandelt ze, of vraagt de operator of de verschillen in orde zijn, of geeft een foutmelding terug. De details staan in verschillende items hieronder.
         
### .zip'd databestanden{#zipd-data-files} 
Als het referentiegegevensbestand een.zipbestand, het moet slechts één bestand bevatten. Dat bestand zal worden gebruikt voor deERDDAP™dataset. Als er meer dan 1 bestand is.ERDDAP™zal die dataset afwijzen. Indien nodig kan dit worden gewijzigd. (In de praktijk hebben alle SBC LTER zip bestanden slechts één gegevensbestand.)   
     
### Opslagtype{#storagetype} 
Als een kolom opgeslagen is Type is niet opgegeven.ERDDAP™gebruikt zijn beste gok gebaseerd op de gegevens in het gegevensbestand. Dit werkt best goed.
     
### Eenheden{#units} 
ERDDAP™toepassingen[UDUNITSopmaak voor eenheden](https://www.unidata.ucar.edu/software/udunits/). GenererenDatasets Xml kan EML-eenheden converteren naarUDUNITSOngeveer 95% van de tijd. De resterende 5% resulteert in een leesbare beschrijving van de eenheden, bijvoorbeeld "biomassaDensityUnitPerAbundanceUnit" in EML wordt "biomassa dichtheid eenheid per abundantie eenheid" inERDDAP. Technisch gezien is dit niet toegestaan. Ik denk niet dat het zo erg is onder de omstandigheden.\\[Indien nodig, eenheden die niet gemaakt kunnen wordenUDUNITScompatibel kan worden verplaatst naar het commentaarattribuut van de variabele.\\]  
     
### EML versie 2.1.1{#eml-version-211} 
Deze ondersteuning voor EML v2.1.1 bestanden is toegevoegd aan GenerateDatasets Xml in 2016 met de hoop dat er enige acceptatie zou zijn in de EML-gemeenschap. Vanaf 2020 is dat niet gebeurd. DeERDDAP™ontwikkelaars zouden graag ondersteuning voor recentere versies van EML toevoegen, maar alleen als de nieuwe functies daadwerkelijk zullen worden gebruikt. E-mailerd.data at noaa.govals u ondersteuning wilt voor recentere versies van EML en deze functie daadwerkelijk zal gebruiken.
     

## Problemen met de EML-bestanden{#issues-with-the-eml-files} 

Er zijn een aantal problemen / problemen met de EML-bestanden die problemen veroorzaken wanneer een software client (zoals de EDDTableFromEML optie in GenerateDatasetsXML) probeert de EML-bestanden te interpreteren/verwerken.

* Hoewel er hier verschillende kwesties worden genoemd, zijn ze meestal kleine, oplosbare problemen. In het algemeen is EML een geweldig systeem en het was mij een genoegen ermee te werken.
* Deze zijn ruwweg gesorteerd van het ergste / meest voorkomende tot het minst slecht / minder vaak.
* De meeste zijn gerelateerd aan kleine problemen in specifieke EML-bestanden (die niet EML's schuld zijn) .
* De meeste kunnen worden opgelost door eenvoudige wijzigingen in het EML-bestand of het gegevensbestand.
* Gezien het feit dat LTER mensen een EML-checker bouwen om de geldigheid van EML-bestanden te testen, heb ik hieronder enkele suggesties toegevoegd met betrekking tot functies die aan de checker kunnen worden toegevoegd.

Hier zijn de kwesties:

### Aparte datum en tijd Kolommen{#separate-date-and-time-columns} 
Sommige gegevensbestanden hebben aparte kolommen voor datum en tijd, maar geen uniforme datum + tijd kolom. Momenteel, GenererenDatasets Xml maakt een dataset met deze aparte kolommen, maar het is niet ideaal omdat:

* Het is het beste als datasets inERDDAP™hebben een gecombineerde datum+tijd kolom aangeroepen"time".
* Vaak zal de dataset niet laden inERDDAP™omdat de"time"kolom heeft geen datum + tijd gegevens.

Er zijn twee mogelijke oplossingen:
1. Bewerk het brongegevensbestand om een nieuwe kolom toe te voegen in het gegevensbestand (en beschrijf het in de EML) indien de datum- en tijdkolom in één kolom zijn samengevoegd. Herstart vervolgens GenererenDatasets Xml dus het vindt de nieuwe kolom.
2. Gebruik de[Afgeleide variabelen](/docs/server-admin/datasets#script-sourcenamesderived-variables)functie inERDDAP™om een nieuwe variabele te definiëren indatasets.xmldie wordt gecreëerd door het samenvoegen van de datum en de tijd kolommen. Een van de voorbeelden gaat specifiek over deze situatie.
         
### Inconsistente kolomnamen{#inconsistent-column-names} 
De EML-bestanden tonen de kolommen van het gegevensbestand en hun namen. Helaas zijn ze vaak anders dan de kolomnamen in het eigenlijke gegevensbestand. Normaal gesproken is de kolomvolgorde in het EML-bestand dezelfde als de kolomvolgorde in het gegevensbestand, zelfs als de namen enigszins variëren, maar niet altijd. GenererenDatasets Xml probeert de kolomnamen aan te passen. Als het niet kan (wat vaak voorkomt) , het zal stoppen, tonen u de EML / data bestandsnaam paren, en vragen of ze correct zijn uitgelijnd. Als u 's' invoert om een tabel over te slaan, zal GeneratedDatasetsXml een foutmelding afdrukken en naar de volgende tabel gaan.
De oplossing is om de foutieve kolomnamen in het EML-bestand aan te passen aan de kolomnamen in het gegevensbestand.
     
### Andere kolomvolgorde{#different-column-order} 
Er zijn verschillende gevallen waarin de EML de kolommen in een andere volgorde dan ze in het gegevensbestand hebben opgegeven. GenererenDatasets Xml zal stoppen en de operator vragen of de matchups in orde zijn of of de dataset moet worden overgeslagen. Als het wordt overgeslagen, zal er een foutmelding in het resultaat bestand, bijvoorbeeld,:
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
De oplossing is om de kolomvolgorde in deze EML-bestanden te repareren zodat ze overeenkomen met de volgorde in de gegevensbestanden.

Het zou fijn zijn als de EML-controler controleerde dat de kolommen en kolomvolgorde in het bronbestand overeenkomen met de kolommen en kolomvolgorde in het EML-bestand.
    
### Onjuiste numHeaderLines{#incorrect-numheaderlines} 
Verschillende gegevens Tabellen geven ten onrechte numHeaderLines=1, bv. ...sbc.4011. Dit veroorzaaktERDDAP™om de eerste regel gegevens te lezen als de kolomnamen. Ik probeerde al deze datatabellen handmatig te SKIPen. Ze zijn duidelijk omdat de ongeëvenaarde bron col namen zijn alle data waarden. En als er bestanden zijn die foutief numHeaderLines=0 hebben, maakt mijn systeem het niet duidelijk. Hier is een voorbeeld van het SBC LTER falende bestand:
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
Dus de fout kan verschijnen alsof GenererenDatasets Xml denkt dat de eerste regel met gegevens in het bestand (b.v. met 2008-10-01T00:00 enz.) is de regel met kolomnamen (alsof 2008-10-01T00:00 een kolomnaam waren) .

Het zou leuk zijn als de EML-checker de numHeaderLines waarde zou controleren.
    
### numHeaderLines = 0{#numheaderlines--0} 
Sommige bronbestanden hebben geen kolomnamen.ERDDAP™accepteert dat als de EML hetzelfde aantal kolommen beschrijft.

Naar mijn mening lijkt dit zeer gevaarlijk. Er kunnen kolommen in een andere volgorde of met verschillende eenheden (zie hieronder) en er is geen manier om die problemen op te vangen. Het is veel beter als alle ASCII-gegevensbestanden een rij hebben met kolomnamen.
    
### DatumTijdopmaaktekens{#datetime-format-strings} 
EML heeft een standaard manier om datumtijdformaten te beschrijven. maar er is aanzienlijke variatie in het gebruik in EML-bestanden. (Ik had het eerder mis. Ik zie de EML documentatie voor formatString die lijkt te overeenkomen met de[JavaDatumTijdFormatter specificatie](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), maar dat ontbreekt aan de belangrijke richtlijnen over het gebruik ervan, met als gevolg dat formatString vaak/meestal onjuist wordt gebruikt.) Er zijn verschillende gevallen met onjuist geval, en/of onjuiste duplicatie van een brief, en/of niet-standaard opmaak. Dat legt een onredelijke last op klanten, vooral software clients zoals GenerateDatasetsXml. GenererenDatasets Xml probeert de verkeerd gedefinieerde formaten in de EML-bestanden te converteren naar
[het datum-/tijdformaat datERDDAP™vereist](/docs/server-admin/datasets#string-time-units), die bijna identiek is aan voorJava/Joda tijdformaat specificatie, maar is iets meer vergevingsgezind.

Het zou fijn zijn als de EML-checker strikte naleving van deJavaJodaERDDAPtijdeenheden specificatie en geverifieerd dat datum tijd waarden in de gegevenstabel correct kunnen worden verwerkt met het opgegeven formaat.
    
### Datumtijd Maar geen tijdzone{#datetime-but-no-time-zone} 
GenererenDatasets Xml zoekt een kolom met datum Tijd en een bepaalde tijdzone (hetzijZulu: vanaf tijdeenheden die eindigen in "Z" of een kolomnaam of attribuutdefinitie die "gmt" of "utc" omvat, of lokaal: vanaf "local" in de kolomnaam of attribuutdefinitie) . Ook aanvaardbaar is een bestand met een datum kolom maar geen tijd kolom. Ook aanvaardbaar is een bestand zonder datum- of tijdinformatie.

GenererenDatasets Xml behandelt alle "lokale" tijden als zijnde van de tijdzone die u kunt specificeren voor een bepaalde batch bestanden, bijvoorbeeld voor SBC LTER, gebruik US/Pacific. De informatie is soms in de commentaren, maar niet in een vorm die is gemakkelijk voor een computer programma uit te zoeken.

Bestanden die niet aan deze criteria voldoen worden afgewezen met het bericht "GEEN GOEDE DATUM (TIJD) VARIABELE." Vaak voorkomende problemen zijn:

* Er is een kolom met data en een kolom met tijden, maar niet datum Tijdkolom.
* Er zijn tijdeenheden, maar de tijdzone is niet gespecificeerd.

Overige opmerkingen:
Als er een goede datum+tijd is met de tijdzonekolom, zal die kolom worden genoemd"time"inERDDAP.ERDDAP™vereist dat tijd kolom gegevens begrijpelijk zijn / te converteren naarZulu/UTC/GMT tijdzone datumTijden.\\[Mijn overtuiging is: het gebruik van lokale tijden en verschillende datum/tijdformaten (2-cijferige jaren&#33; mm/dd/jj versus dd/mm/jj versus ...) in databestanden dwingt de eindgebruiker om ingewikkelde conversies te doen naarZulutijd om gegevens van de ene dataset te vergelijken met gegevens van de andere. Dus.ERDDAP™Standaardiseert alle tijdgegevens: Voor string tijden,ERDDAP™gebruikt altijd ISO 8601:2004 (E) standaardformaat, bijvoorbeeld, 1985-01-02T00:00:00Z. Voor numerieke tijden,ERDDAP™gebruikt altijd"seconds since 1970-01-01T00:00:00Z".ERDDAP™gebruikt altijd deZulu  (UTC, GMT) tijdzone om de moeilijkheden van het werken met verschillende tijdzones en standaardtijd versus dagtijd te verwijderen. Dus GenererenDatasets Xml zoekt een EML datatabel kolom met datum+tijdZulu. Dit is moeilijk omdat EML geen formele woordenschat/systeem gebruikt (zoals[Java/Joda tijdformaat](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) voor het specificeren van de gegevens Tijdformaat:
Als er een col is met numerieke tijdwaarden (bv.Matlabtijden) enZulutijdzone (of gewoon datums, zonder tijd kolommen) , het wordt gebruikt als"time".
Als er een col met datum en tijd gegevens, gebruik makend van deZulutijdzone, wordt gebruikt als"time"en elke andere datum of tijd kolom wordt verwijderd.
Anders als een col met slechts datum informatie wordt gevonden, wordt het gebruikt als de"time"variabele (zonder tijdzone) .
Als er een gegevenskolom en een tijdkolom en geen gecombineerde datum is Tijdskolom, de dataset wordt afgevuurd maar de dataset kan bruikbaar worden gemaakt door een gecombineerde datum toe te voegen Tijdskolom (bij voorkeur,Zulutijdzone) aan het gegevensbestand toe te voegen en de beschrijving ervan toe te voegen in het EML-bestand.
VOORBEELD van SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)gegevenstabel #2.

Het zou leuk zijn als EML/LTER een kolom metZulu  (UTC, GMT) tijdzonetijden in alle relevante brongegevensbestanden. Volgende best is om een systeem toe te voegen aan EML om eentime\\_zoneattribuut met standaardnamen (van de[TZ-kolom](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Ontbrekendmissing\\_value {#missing-missing_value} 
Sommige kolommen gebruiken eenmissing\\_valuemaar vermeld het niet in de EML metadata, bijvoorbeeld, neerslag\\_mm in knb-lter-sbc.5011 gebruikt -999. Als er geen ontbrekende waarde is opgegeven in de EML, GenerateDatasetsXml zoekt automatisch naar gemeenschappelijke ontbrekende waarden (b.v. 99, 99, 999, 9999, 999, enz.) en die metadata creëert. Maar andere missendemissing\\_valueZe worden niet gepakt.

Het zou fijn zijn als de EML-checker op zoek was naar vermisten.missing\\_values.
    
### Kleine problemen{#small-problems} 
Er zijn veel kleine problemen. (spelling, interpunctie) die waarschijnlijk alleen gevonden zal worden door een mens die elke dataset inspecteert.

Het zou leuk zijn als de EML-checker op zoek was naar spelling en grammaticale fouten. Dit is een moeilijk probleem omdat woorden in de wetenschap vaak gemarkeerd worden door spellingscontrole. Menselijke bewerking is waarschijnlijk nodig.
    
### Ongeldige Unicode-tekens{#invalid-unicode-characters} 
Sommige EML-inhoud bevat ongeldige Unicode-tekens. Dit zijn waarschijnlijk tekens van de Windows-tekenset die verkeerd werden gekopieerd en geplakt in de UTF-8 EML-bestanden. GenererenDatasets Xml reinigt deze tekens tot bv.\\[#128\\], dus ze zijn gemakkelijk te zoeken in deERDDAP™ datasets.xmlbestand.

Het zou leuk zijn als de EML-checker dit zou controleren. Het is gemakkelijk te vinden en gemakkelijk te repareren.
    
### Verschillende kolomeenheden] (#diverseColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Sommige EML dataTables definiëren kolommen die niet in overeenstemming zijn met de kolommen in het gegevensbestand, met name omdat ze verschillende eenheden hebben. GenererenDatasets Xml markeert deze. Het is aan de exploitant om te beslissen of de verschillen in orde zijn of niet. Deze verschijnen in het bestand fouten als "SKIPPED" dataTables. VOORBEELD in SBC LTER-foutenbestand:
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
Het zou fijn zijn als de EML-checker controleerde of de eenheden overeenkomen. Helaas is dit waarschijnlijk onmogelijk te vangen en vervolgens onmogelijk op te lossen zonder contact op te nemen met de dataset maker, aangezien het bronbestand geen eenheden bevat. De discrepantie voor het voorbeeld hierboven was alleen merkbaar omdat de eenheden waren opgenomen in de bron kolom naam en de EML kolom naam. Hoeveel andere gegevensTables hebben dit probleem maar zijn niet detecteerbaar?
    
### Verschillende versies van EML{#different-versions-of-eml} 
GenererenDatasets Xml is ontworpen om te werken met EML 2.1.1. Andere versies van EML zullen werken voor zover ze overeenkomen met 2.1.1 of dat GenerateDatasetsXml speciale code heeft om ermee om te gaan. Dit is een zeldzaam probleem. Wanneer het zich voordoet, is de oplossing om uw bestanden te converteren naar EML 2.1.1, of stuur het EML-bestand naarerd.data at noaa.gov, zodat ik wijzigingen kan maken aan GenererenDatasets Xml om de verschillen aan te pakken.

Bob toegevoegd ondersteuning voor EML-bestanden te GenererenDatasets Xml in 2016 met de hoop dat er enige acceptatie zou zijn in de EML-gemeenschap. Vanaf 2020 is dat niet gebeurd. Bob is blij om ondersteuning voor meer recente versies van EML toe te voegen, maar alleen als de nieuwe functies daadwerkelijk zullen worden gebruikt. E-mailerd.data at noaa.govals u ondersteuning wilt voor recentere versies van EML en deze functie daadwerkelijk zal gebruiken.
    
### Problemen met het ontleden van het gegevensbestand{#trouble-parsing-the-data-file} 
Zelden kan een datatabel worden afgewezen met de fout "onverwacht aantal items op regel #120 (waargenomen=52, verwacht=50) " Een foutmelding als dit betekent dat een regel in het gegevensbestand een ander aantal waarden had dan de andere regels. Het kan een probleem inERDDAP™  (bv., het bestand niet correct ontleden) of in het dossier. VOORBEELD van SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)gegevenstabel #3, zie datafile=LTER\\_maandelijk\\_bottledata\\_registred\\_stations\\_20140429.txt
