---
sidebar_position: 2
---

# Programmagids

Dit zijn dingen waar alleen een programmeur mee wil werken.ERDDAP'sJavaDe lessen moeten het weten.

###  **Ophalen van de broncode**  {#getting-the-source-code} 
   

  - Via broncode op GitHub
De broncode voor recente openbare versies en in-ontwikkeling versies is ook beschikbaar via[GitHub](https://github.com/ERDDAP). Lees alstublieft de[Wiki](https://github.com/ERDDAP/erddap/wiki)Voor dat project. Als u de broncode wilt wijzigen (en eventueel de wijzigingen in de norm hebben opgenomenERDDAP™distributie) Dit is de aanbevolen aanpak.

###  **ERDDAP™afhankelijkheden**  {#erddap-dependencies} 
ERDDAP™gebruikt Maven om code afhankelijkheden en enkele statische referentiebestanden te laden (WEB-INF/ref) . Dit wordt gedaan om het opslaan van veel grote bestanden in de repository te voorkomen.
U kunt  U kunt ook gebruik maken van het pakket van MVN om een oorlogsbestand te genereren.
U kunt de ref-bestanden handmatig downloaden:

  - [etopo1\\_ice\\_g\\_i2.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip)en rits het uit in /WEB-INF/ref/ .

  - [ref\\_files.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip)en rits het uit in /WEB-INF/ref/ .

  - [erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (versie 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, gedateerd 2024-10-14) en rits het uit in _tomcat_, aanmaken_tomcat_/content/erddap.

OPMERKING: Maven zal standaard statische referentie cache en test data archief downloads en alleen uitpakken wanneer een nieuwe versie wordt gedownload. Om het downloaden helemaal over te slaan, kunt u de  (b.v. -DskipResourceDownload pakket Wat?) . Om extractie te forceren, stel je in op "Ddownload.unpack=true

- ERDDAP™en haar subcomponenten hebben zeer liberale, open-source[licenties](/license), zodat u de broncode kunt gebruiken en wijzigen voor elk doel, voor-winst of niet-winst. Merk op datERDDAP™en veel subcomponenten hebben licenties die vereisen dat u de bron van de code die u gebruikt erkent. Zie[Kredieten](/credits). Of het nu nodig is of niet, het is gewoon een goede vorm om al deze bijdragen te erkennen.
  

-  **Gebruik de code voor andere projecten** 

Terwijl u bent welkom om delen van deERDDAP™code voor andere projecten, wees gewaarschuwd dat de code kan en zal veranderen. We beloven niet om andere toepassingen van onze code te ondersteunen. Git en GitHub zullen je belangrijkste oplossingen zijn om hiermee om te gaan -- Git laat je toe om onze wijzigingen samen te voegen in je wijzigingen.
   **Voor veel situaties waar u zou kunnen worden geneigd om delen vanERDDAP™in uw project, we denken dat u het veel gemakkelijker zal vinden om te installeren en te gebruikenERDDAP™zoals is,** en schrijf dan andere diensten die gebruik makenERDDAPDe diensten. U kunt uw eigenERDDAP™installatie ruwweg in een uur of twee. U kunt uw eigenERDDAP™installatie op een gepolijste manier in een paar dagen (afhankelijk van het aantal en de complexiteit van uw datasets) . Maar hacken delen vanERDDAP™voor uw eigen project duurt het waarschijnlijk weken (en maanden om subtiliteiten te vangen) en u verliest de mogelijkheid om wijzigingen en bug fixes van volgendeERDDAP™Loslaten. We (Natuurlijk.) denk dat er vele voordelen aan het gebruikERDDAP™zoals is en uwERDDAP™openbare installatie. Maar in sommige omstandigheden, zou u misschien niet uwERDDAP™openbare installatie. Dan kan uw service toegang krijgen tot en gebruik maken van uw privéERDDAP™en je klanten hoeven niets te weten overERDDAP™.

  ####  **Halfweg** 

Of, er is een andere aanpak die u nuttig kan vinden die halverwege tussen duiken inERDDAP's code en gebruikERDDAP™als stand-alone webservice: In de EDD klasse is er een statische methode waarmee je een instantie van een dataset kunt maken (op basis van het productdossier indatasets.xml) :
EenFromDataset Xml (Tekenreeks tDatasetID) 
Het geeft een instantie van een EDDTable terug ofEDDGriddataset. Gezien dat geval, kunt u bellen\\
Nieuw bestand makenvoorDapQuery (String userDapQuery, String dir, String fileNaam, String file Typenaam) 
 Dus, dit is een eenvoudige manier om te gebruikenERDDAP's methoden om gegevens op te vragen en krijg een bestand in reactie, net zoals een cliënt zou gebruiken deERDDAP™webapplicatie. Maar deze aanpak werkt binnen uwJavaprogramma en omzeilt de behoefte aan een applicatie server zoals Tomcat. We gebruiken deze aanpak voor veel van de eenheidstesten van EDDTable enEDDGridsubklassen, zodat je voorbeelden hiervan kunt zien in de broncode voor al die klassen.

###  **Ontwikkelingsbeleid**  {#development-environment} 

  - Er zijn configuraties voor[Jetty.](https://github.com/ERDDAP/erddap/blob/main/development/jetty)en[Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker)in GitHub, hoewel releases verwacht worden in Tomcat.

  -  **Facultatief** : InstellenERDDAP™in Tomcat\\
SindsERDDAP™is voornamelijk bedoeld om een servlet lopen in Tomcat, wij raden u aan de standaard[installatie-instructies](/docs/server-admin/deploy-install)Tomcat installeren en vervolgens installerenERDDAP™in Tomcat's webapps directory. Onder andere,ERDDAP™is ontworpen om te worden geïnstalleerd in Tomcat's directory structuur en verwacht Tomcat om een aantal .jar bestanden.

  - ERDDAP™vereist geen specifieke IDE (Chris gebruikt voornamelijk Visual Studio Code, Bob gebruikt EditPlus) . Wij gebruiken geen Eclipse, Ant, etc.; evenmin bieden wijERDDAP- de steun voor hen. Het project gebruikt Maven.

  - We gebruiken een batch bestand dat alle .class bestanden in de bronboom verwijdert om ervoor te zorgen dat we een schone compilatie hebben (met javac) .

  - Momenteel gebruiken we de javac jdk-21.0.3+9 van Adopium om gov.noaa.pfeg.coastwatch.TestAll te compileren (het heeft links naar een paar klassen die anders niet zouden worden samengesteld) En doe de testen. Om veiligheidsredenen is het bijna altijd het beste om de nieuwste versies vanJava21 en Tomcat 10.

    - Wanneer we javac of java uitvoeren, is de huidige map _tomcat_/webapps/erddap/WEB-INF .

    - Onze javac en java klaspad is
Klassen;../../../lib/servlet-api.jar;lib/

    - Dus uw javac-commandoregel zal iets zijn als\\


    - En je java commandoregel zal zoiets zijn als
Klassen voor java-cp;../../../lib/servlet-apijar;lib/* -Xmx4000M -Xms4000M Klassen/gov/noaa/pfel/coastwatch/testAll
Javaom afvalverzamelingsstatistieken af te drukken.

    - Als test Alle compilaties, allesERDDAP™De behoeften zijn samengesteld. Een paar klassen zijn samengesteld die niet nodig zijn voorERDDAP™. Als het compileren van TestAll slaagt maar geen klasse compileert, is die klasse niet nodig. (Er zijn een aantal onafgemaakte/ongebruikte klassen.) 

  - In een paar gevallen gebruiken we 3rd party broncode in plaats van .jar bestanden (met name voorDODS) en hebben ze enigszins gewijzigd om problemen compileren metJava21. We hebben vaak andere kleine wijzigingen aangebracht (met nameDODS) om andere redenen.

  - De meeste klassen hebben testmethoden in hun bijbehorende src/test bestand. U kunt de JUnit testen uitvoeren met het commando  Dit zal downloaden verschillende zip-bestanden van gegevens die de tests vertrouwen op de nieuwste release van[ERDDAP/erdap Test](https://github.com/ERDDAP/erddapTest/releases/)\\
     
OPMERKING: Maven caches downloads maar zal de gedownloade archieven van elke uitvoering, die tijd kost, uitpakken. Downloaden overslaan
en unzipping testgegevensarchieven, kunt u de naam van de eigendom van Maven te downloaden (b.v. -DskipTestResourceDownload pakket Wat?) .

###   **Belangrijke klassen**  {#important-classes} 

Als u wilt kijken naar de broncode en proberen uit te vinden hoeERDDAP™Werkt, alsjeblieft.

  - De code heeftJavaDe Voorzitter. - Het debat is gesloten.JavaDocs zijn niet gegenereerd. Voel je vrij om ze te genereren.

  - De belangrijkste klassen (met inbegrip van de hieronder genoemde) zijn binnen gov/noaa/pfel/erdap.

  - DeERDDAP™klasse heeft de hoogste niveau methoden. Het verlengt HttpServlet.

  - ERDDAP™geeft verzoeken door aan instanties van subklassen vanEDDGridof EDDTable, die individuele datasets vertegenwoordigen.

  - EDStatic heeft de meeste statische informatie en instellingen (b.v. van de setup.xml en messages.xml bestanden) en biedt statische diensten (e-mails versturen) .

  - EDDGriden EDDTable subclasses verwerken het verzoek, krijgen gegevens van subklasse-specifieke methoden, vervolgens formatteren de gegevens voor het antwoord.

  - EDDGridsubklassen push data naar GridDataAccessor (de interne gegevenscontainer voor gerasterde gegevens) .

  - EDDTable subclasses push data in TableWriter subclasses, die gegevens schrijven naar een specifiek bestandstype on-the-fly.

  - Andere klassen (b.v. lage klassen) zijn ook belangrijk, maar het is minder waarschijnlijk dat u zult werken om ze te veranderen.
     

###  **Codebijdragen**  {#code-contributions} 

- GitHub problemen
Als u wilt bijdragen maar geen project heeft, zie de lijst van[GitHub problemen](https://github.com/ERDDAP/erddap/issues), waarvan veel projecten die je zou kunnen nemen. Als u wilt werken aan een probleem, wijs het dan aan uzelf om aan anderen aan te geven dat u eraan werkt. De GitHub kwestie is de beste plek om vragen te bespreken over hoe om te gaan met het werk op dat punt.

- Als de verandering die u wilt maken is een van de onderstaande veel voorkomende gevallen, maak een[GitHub issue](https://github.com/ERDDAP/erddap/issues)het aangeven van de verandering die u van plan bent te maken. Zodra de wijziging is voltooid, doe dan een pull verzoek om de merge aan te vragen. De gemeenschappelijke veranderingen omvatten:

  - Je wilt nog een subklasse schrijven vanEDDGridof EDDTable om een ander gegevensbrontype te verwerken. Zo ja, dan raden wij u aan om de dichtstbijzijnde bestaande subklasse te vinden en die code als uitgangspunt te gebruiken.

  - U wilt een andere saveAs_FileType_ methode schrijven. Zo ja, dan raden wij u aan de dichtstbijzijnde bestaande saveAs_FileType_ methode te vinden inEDDGridof EDDTable en gebruik die code als uitgangspunt.

Die situaties hebben het voordeel dat de code die je schrijft zelf is. U hoeft niet alle details vanERDDAPDe binnenkant. En het zal gemakkelijk zijn voor ons om uw code in te voegenERDDAP. Merk op dat als u een code indient, de licentie compatibel moet zijn met deERDDAP™ [licentie](/license)  (bv.[Apache](https://www.apache.org/licenses/),[BSD](https://www.opensource.org/licenses/bsd-license.php), of[MIT-X](https://www.opensource.org/licenses/mit-license.php)) . Wij zullen uw bijdrage in de[kredieten](/credits).

- Als u een functie die niet hierboven wordt behandeld die u wilt toevoegen aanERDDAP, wordt aanbevolen om eerst een discussie thread in de[GitHub discussies](https://github.com/ERDDAP/erddap/discussions/categories/ideas). Voor significante kenmerken/wijzigingen zal de Technische Raad deze bespreken en beslissen of het toe te voegen aanERDDAP™.

###  **Beoordelen van uw codebijdragen**  {#judging-your-code-contributions} 
Als u code of andere wijzigingen wilt insturen die inERDDAPDat is geweldig. Uw bijdrage moet voldoen aan bepaalde criteria om geaccepteerd te worden. Als u de onderstaande richtlijnen volgt, verhoogt u sterk de kans dat uw bijdrage wordt geaccepteerd.
   

  - DeERDDAP™project wordt beheerd door een NATD (NOAAAangestelde technisch directeur) met input van een Technisch Bestuur.
Vanaf 2007 (het begin vanERDDAP) tot 2022, dat was Bob Simons (ook de Stichter-Leader) . Vanaf januari 2023 is dat Chris John. In principe is de NATD verantwoordelijk voorERDDAPDe Voorzitter. - Het debat is gesloten.ERDDAP™code, met name over het ontwerp en of een gegeven trekverzoek wordt aanvaard of niet. Dit moet deels om redenen van efficiëntie gebeuren. (het werkt geweldig voor Linus Torvalds en Linux) en gedeeltelijk om veiligheidsredenen: Iemand moet de IT-beveiligingsmensen vertellen dat hij verantwoordelijkheid neemt voor de veiligheid en integriteit van de code.
     

  - De NATD garandeert niet dat hij uw code zal accepteren.
Als een project gewoon niet zo goed werkt als we hadden gehoopt en als het niet kan worden gered, zal de NATD het project niet opnemen in deERDDAP™distributie. Voel je niet slecht. Soms werken projecten niet zo goed als gehoopt. Het gebeurt met alle softwareontwikkelaars. Als u de onderstaande richtlijnen volgt, verhoogt u sterk uw kansen op succes.
     

  - Het is het beste als de veranderingen van algemeen belang en nut zijn.
Als de code specifiek is voor uw organisatie, is het waarschijnlijk het beste om een aparte tak vanERDDAP™voor uw gebruik. Axiom doet dit. Gelukkig maakt Git dit makkelijk. De NATD wil een consistente visie voorERDDAP, niet toestaan dat het een keuken gootsteen project waar iedereen voegt een aangepaste functie voor hun project.
     

  - Volg deJavaCodeverdragen.
In het algemeen moet uw code goede kwaliteit en moet volgen het origineel[JavaCodeverdragen](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf): zet .class bestanden op de juiste plaats in de directory structuur, geef .class bestanden een passende naam, omvatten juisteJavaDoc commentaar, inclusief //commentaren aan het begin van elke alinea van code, inspringen met 4 spaties (geen tab) , vermijd lijnen &gt;80 tekens, enz. De conventies veranderen en de broncode is niet altijd volledig bijgewerkt. Bij twijfel, match code met de conventies en niet bestaande code.

- Gebruik beschrijvende klasse, methode en variabele namen.
Dat maakt de code makkelijker voor anderen om te lezen.
   

- Vermijd dure code.
Op de lange termijn zullen jij of andere mensen de code moeten uitzoeken om het te behouden. Dus gebruik alstublieft eenvoudige coderingsmethoden die dus gemakkelijker zijn voor anderen (inclusief u in de toekomst) Om erachter te komen. Uiteraard, als er een echt voordeel aan het gebruik van sommige chiqueJavaprogrammeren functie, gebruiken, maar uitgebreid documenteren wat je deed, waarom, en hoe het werkt.
   

- Werk met de Technische Raad voordat u begint.
Als u hoopt om uw code wijzigingen getrokken inERDDAP™, De Technische Raad zal zeker willen praten over wat je gaat doen en hoe je gaat doen voordat u wijzigingen in de code. Op die manier kunnen we voorkomen dat je veranderingen maakt die de NATD uiteindelijk niet accepteert. Wanneer u het werk doet, is de NATD en Technical Board bereid om vragen te beantwoorden om u te helpen erachter te komen de bestaande code en (Totaal) hoe u uw project aanpakt.
   

- Zelfstandig werken (zoveel mogelijk) Als je begint.
In tegenstelling tot het bovenstaande "Werk met de Technische Raad," moedigt de NATD je aan om na de start van het project zo onafhankelijk mogelijk te werken. Als de NATD je bijna alles moet vertellen en veel vragen moet beantwoorden (vooral degenen die u had kunnen beantwoorden door het lezen van de documentatie of de code) , dan zijn uw inspanningen geen tijdsbesparing voor de NATD en kan hij net zo goed zelf het werk doen. Het is de[Mythische man maand](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)probleem. Natuurlijk moeten we nog steeds communiceren. Het zou geweldig zijn om periodiek te zien uw werk in uitvoering om ervoor te zorgen dat het project op schema. Maar hoe meer je zelfstandig kunt werken (na overeenstemming van de technische raad over de onderhavige taak en de algemene oriëntatie) Hoe beter.
   

- Vermijd insecten.
Als een bug niet wordt gevangen voordat een release, het veroorzaakt problemen voor gebruikers (ten hoogste) , geeft de verkeerde informatie terug (in het ergste geval) , is een vlek opERDDAP's reputatie, en zal aanhouden op verouderdeERDDAP™installaties voor jaren. Werk heel hard om bugs te vermijden. Een deel hiervan is het schrijven van schone code (dus het is gemakkelijker om problemen te zien) . Een deel hiervan is het schrijven van eenheidstesten. Een deel hiervan is een constante houding van bug vermijding wanneer je code schrijft. Maak de NATD geen spijt van het toevoegen van uw code aanERDDAP™.
   

- Schrijf een test of test.
Voor nieuwe code moet je JUnit testen in een testbestand schrijven.
Gelieve ten minste één individuele testmethode te schrijven die de code die u schrijft grondig test en toevoegt aan het JUnit testbestand van de klasse zodat deze automatisch wordt uitgevoerd. Eenheid (en verwant) testen zijn een van de beste manieren om bugs te vangen, aanvankelijk, en op de lange termijn (als andere dingen veranderen inERDDAP™) . Zoals Bob zei: "Eenheidstests laten me 's nachts slapen."
   

- Maak het voor de NATD gemakkelijk om de wijzigingen in uw trekverzoek te begrijpen en te accepteren.
Een deel daarvan is het schrijven van een eenheidstestmethode (s) . Een deel daarvan is het beperken van uw wijzigingen tot een sectie van code (of één klasse) indien mogelijk. De NATD accepteert geen trekverzoeken met honderden wijzigingen in de code. De NATD vertelt de IT-beveiligingsmensen dat s/hij verantwoordelijkheid neemt voor de veiligheid en integriteit van de code. Als er te veel veranderingen zijn of ze zijn te moeilijk om uit te vinden, dan is het gewoon te moeilijk om te controleren of de wijzigingen correct zijn en geen bugs of beveiligingsproblemen introduceren.
   

- Hou het simpel.
Een goed algemeen thema voor uw code is: Houd het eenvoudig. Eenvoudige code is gemakkelijk voor anderen (inclusief u in de toekomst) lezen en onderhouden. Het is gemakkelijk voor de NATD om te begrijpen en dus te accepteren.
   

- Neem lange termijn verantwoordelijkheid voor uw code.
Op de lange termijn, is het het beste als u de voortdurende verantwoordelijkheid op zich neemt voor het behoud van uw code en het beantwoorden van vragen over het (b.v.ERDDAP™Google-groep) . Zoals sommige auteurs opmerken, code is zowel een verplichting als een actief. Als een bug wordt ontdekt in de toekomst, het is het beste als je het repareren, want niemand kent uw code beter dan u (ook zodat er een stimulans om te voorkomen dat bugs in de eerste plaats) . De NATD vraagt niet om een vaste verbintenis om continu onderhoud te leveren. De NATD zegt alleen dat het onderhoud zeer gewaardeerd zal worden.
